# -*- coding: utf-8 -*-
"""Решаемость бумажных листов (RUPAPER) через настоящий интерфейс.

Зачем отдельный гейт. `qa_ru_trainers.py` проходит тренажёры 601–610, но у
листов Мишутки (615–618, 621, 622, 623) другой движок, и до сих пор их никто
не решал машинно: проверялось, что кадр нарисован, а не что ответ принимается.
Дыра не теоретическая — этим прогоном найден кадр, где два пункта задания на
порядок различались одним словом и один был концом другого.

Что делает. Для каждого кадра жмёт те же кнопки, что ребёнок, и читает вердикт
из DOM (`.mark.ok` / `.mark.no`), а не из внутренностей движка — он закрыт в
замыкании, и лезть туда значило бы проверять не то, что видит ребёнок.

Проверяет три вещи:
  · верный ответ принимается;
  · все запасные записи краткого ответа принимаются («2», «два», «2 взвешивания»);
  · неверный отклоняется — а для «выбери все» ещё и неполный,
    для «расставь по порядку» — перепутанный.

Запуск:  PYTHONPATH=.py-libs python3 qa_ru_paper.py [623 622 …]
Без аргументов берёт все листы, какие найдёт. Нужен локальный сервер на 8123.
Код возврата 1 — есть проблемы.
"""
import json
import os
import subprocess
import sys

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
EXE = os.environ.get("QA_CHROME", os.path.join(
    ROOT, "браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"))
URL = os.environ.get("QA_URL", "http://127.0.0.1:8123/")
ДАННЫЕ = os.path.join(ROOT, "MVP", "data")

# Ключи достаём из самих файлов листов: движок держит реестр в замыкании, и
# из страницы до него не добраться. Подсовываем заглушку RUPAPER и ловим cfg.
СНЯТЬ = r"""
const путь = process.argv[1];
const листы = [];
global.window = {ARH_LESSONS: [], WAVE_B: {}, RUPAPER: {mount: c => листы.push(c)}};
require(путь);
console.log(JSON.stringify(листы.map(c => ({
  id: c.id, title: c.title,
  кадры: (c.data || []).map(it => ({
    t: it.type || 'single', ans: it.ans, alts: it.alts || [],
    opts: it.opts || [], title: it.t
  }))
}))));
"""

РЕШИТЬ = r"""([lid,i,к,ответ])=>{
  CHS[lidKey(lid)]={ans:{},ok:{}};
  openLessonView(lid); LV.step=i; chRender(0);
  const норм=s=>String(s).replace(/\s+/g,' ').trim();
  /* Берём текст пункта — последний span, — а не innerText всей кнопки: там
     ещё значок позиции, и «набрать большой» нашлось бы внутри «снова
     набрать большой». На этом тест уже один раз соврал. */
  const текстКнопки=b=>{ const ss=b.querySelectorAll('span'); return ss.length?норм(ss[ss.length-1].textContent):норм(b.innerText); };
  const жать=(т)=>{
    const b=[...document.querySelectorAll('#lvis .opt, #lvis .fr')].find(x=>текстКнопки(x)===норм(т));
    if(!b) return 'нет кнопки «'+String(т).slice(0,40)+'»';
    b.click(); return null;
  };
  const сбои=[];
  if(к.t==='fragment'){
    const б=[...document.querySelectorAll('#lvis .fr')];
    if(!б[ответ]) сбои.push('нет фрагмента № '+ответ); else б[ответ].click();
  }
  else if(к.t==='multi' || к.t==='order') (ответ||[]).forEach(o=>{ const e=жать(o); if(e) сбои.push(e); });
  else if(к.t==='short' || к.t==='open'){
    const поле=document.querySelector('#lvis .short input, #lvis .open textarea');
    if(!поле) сбои.push('нет поля ввода');
    else { поле.value=ответ; поле.dispatchEvent(new Event('input',{bubbles:true})); }
  }
  else { const e=жать(ответ); if(e) сбои.push(e); }
  if(сбои.length) return {сбои:сбои};
  const пров=document.querySelector('#lvis .check');
  if(пров) пров.click();
  const м=document.querySelector('#lvis .mark'), сам=document.querySelector('#lvis .self');
  return {верно: м ? м.classList.contains('ok') : (сам ? true : null)};
}"""


def листы_из_файлов():
    """Все листы RUPAPER, какие есть в MVP/data."""
    найдено = []
    for имя in sorted(os.listdir(ДАННЫЕ)):
        if not имя.endswith(".js"):
            continue
        путь = os.path.join(ДАННЫЕ, имя)
        with open(путь, encoding="utf-8") as f:
            if "RUPAPER.mount" not in f.read():
                continue
        п = subprocess.run(["node", "-e", СНЯТЬ, путь], capture_output=True, text=True, cwd=ROOT)
        if п.returncode or not п.stdout.strip():
            print(f"  (не прочитать {имя}: {(п.stderr or '')[:120]})")
            continue
        найдено += json.loads(п.stdout)
    return найдено


def main():
    хотим = {int(x) for x in sys.argv[1:]}
    листы = [л for л in листы_из_файлов() if not хотим or л["id"] in хотим]
    if not листы:
        print("листов не найдено"); return 1

    беда, проб = [], 0
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=EXE,
                              args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        pg = b.new_page(viewport={"width": 390, "height": 1400})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:140]))
        pg.goto(URL, wait_until="load", timeout=45000)
        for _ in range(40):
            pg.wait_for_timeout(120)
            if pg.evaluate("()=>typeof openLessonView==='function'"): break
        pg.evaluate("()=>{DB.profile=Object.assign({},DB.profile,{klass:'6',name:'Проверка'});}")

        for л in листы:
            свои = []
            for i, к in enumerate(л["кадры"]):
                def проба(ответ, ждём, что):
                    nonlocal проб
                    r = pg.evaluate(РЕШИТЬ, [л["id"], i, к, ответ]); проб += 1
                    if r.get("сбои"): свои.extend([f"кадр {i}: {x}" for x in r["сбои"]])
                    elif r.get("верно") is not ждём: свои.append(f"кадр {i} «{(к['title'] or '')[:34]}»: {что}")

                проба("моё правило" if к["t"] == "open" else к["ans"], True, "верный ответ НЕ засчитан")
                for a in к["alts"]:
                    проба(a, True, f"запись «{a}» не принята")
                if к["t"] == "single":
                    for не in [o for o in к["opts"] if o != к["ans"]]:
                        проба(не, False, f"неверный «{не[:28]}» ЗАСЧИТАН")
                if к["t"] == "fragment" and isinstance(к["ans"], int):
                    проба(к["ans"] + 1, False, "не тот фрагмент ЗАСЧИТАН")
                if к["t"] == "multi" and len(к["ans"] or []) > 1:
                    проба(к["ans"][:1], False, "неполный выбор засчитан как верный")
                if к["t"] == "order" and len(к["ans"] or []) > 1:
                    проба(list(reversed(к["ans"])), False, "обратный порядок засчитан")

            метка = "OK   " if not свои else "ПЛОХО"
            print(f"  {метка} лист {л['id']} «{л['title'][:40]}»: кадров {len(л['кадры'])}"
                  + (f", проблем {len(свои)}" if свои else ""))
            for x in свои[:6]:
                print("        ·", x)
            беда += свои
        if errs:
            print("  ошибки консоли:", errs[:2])
        b.close()

    print(f"\nИТОГ: листов {len(листы)}, проб через интерфейс {проб}, проблем {len(беда)}")
    return 1 if беда else 0


if __name__ == "__main__":
    sys.exit(main())
