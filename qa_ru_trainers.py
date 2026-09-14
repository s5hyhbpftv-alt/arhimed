#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Прогон тренажёров уроков 601–610 в реальном интерфейсе.

Для каждого пункта тренажёра перебираются все кнопки: если верный ответ не
засчитывается ни одной кнопкой — пункт нерешаем (это ловит и «верный ответ — ошибка»,
как было в 603–605, и пункт без нужной кнопки, как было в 609).

Запуск: PYTHONPATH=.py-libs python3 qa_ru_trainers.py
Требует локального сервера: (cd MVP && python3 -m http.server 8123 &)
"""
import sys
from playwright.sync_api import sync_playwright

EXE = "/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
IDS = list(range(601, 611))


def trainer_step(pg, lid):
    """Номер кадра с тренажёром: кадр последний, но у 603 и 604 кадров стало
    больше — первым идёт список словарных слов, поэтому считаем по уроку."""
    n = pg.evaluate("(id)=>(((lessonById(id)||{}).explain)||[]).length", lid)
    return max(0, (n or 9) - 1)


def main():
    ok, bad = 0, []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=EXE, args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        pg = b.new_page(viewport={"width": 390, "height": 900})
        pg.goto("http://127.0.0.1:8123/", wait_until="load", timeout=60000)
        for _ in range(40):
            pg.wait_for_timeout(250)
            if pg.evaluate("()=>typeof DB==='object' && typeof openLessonView==='function'"):
                break
        pg.evaluate("()=>{DB.profile={name:'Вика',klass:'6',color:'#d9a441',gender:'girl'};save();}")
        # свои интерактивы: 601 — ящики, 610 — запятые
        for lid in (601, 610):
            pg.evaluate("(id)=>{ CHS[lidKey(id)]={}; openLessonView(id); }", lid)
            pg.wait_for_timeout(150)
            for _ in range(trainer_step(pg, lid)):
                pg.evaluate("()=>lvStep(1)")
                pg.wait_for_timeout(30)
            pg.wait_for_timeout(300)
            has = pg.evaluate("()=>document.querySelectorAll('#lvis .th-crate, #lvis .s6 .crate').length")
            if lid == 601 and has < 3:
                bad.append(lid); print(f"  ПЛОХО урок 601: ящики не отрисованы ({has})"); continue
            bad_items = 0
            for _ in range(12):
                st = pg.evaluate("()=>{const lk=lidKey(LV.id); const s=CHS[lk]||{}; return {res:s.gRes, idx:s.gIdx||0, ok:s.gOk||0, ok610:s.gOk610||0, bad:s.gBad||0};}")
                if lid == 601:
                    key = pg.evaluate("(i)=>{const d=window.RUTHEME_DATA[601]; return d[i%d.length][1];}", st['idx'])
                    pg.evaluate("(k)=>window.s6Sort?window.s6Sort(k):window.thSort(k)", key)
                    pg.wait_for_timeout(160)
                    after = pg.evaluate("()=>{const s=CHS[lidKey(601)]||{}; return s.gOk||0;}")
                    pg.evaluate("()=>(window.s6Sort||window.thSort)('н')")     # сброс: перейти к следующему
                    pg.wait_for_timeout(120)
                    if after <= st['ok']:
                        bad_items += 1
                else:
                    need = pg.evaluate("(i)=>{const d=window.RUTHEME_DATA[610]; return d[i%d.length][1];}", st['idx'])
                    pg.evaluate("()=>{const s=CHS[lidKey(610)]||{}; s.gSet=[];}")
                    for k in need:
                        pg.evaluate("(k)=>window.thSlot(k)", k); pg.wait_for_timeout(60)
                    pg.evaluate("()=>window.thCheck()"); pg.wait_for_timeout(160)
                    after = pg.evaluate("()=>{const s=CHS[lidKey(610)]||{}; return s.gOk610||0;}")
                    pg.evaluate("()=>window.thNext()"); pg.wait_for_timeout(120)
                    if after <= st['ok610']:
                        bad_items += 1
            if bad_items:
                bad.append(lid)
                print(f"  ПЛОХО урок {lid}: свой интерактив не засчитывает верный ответ ({bad_items} пунктов)")
            else:
                ok += 1
                print(f"  OK   урок {lid}: свой интерактив работает по всей серии")

        for lid in [x for x in IDS if x not in (601, 610)]:   # у 601 и 610 свой интерактив — их проверяет блок выше
            pg.evaluate("(id)=>{ CHS[lidKey(id)]={}; openLessonView(id); }", lid)
            pg.wait_for_timeout(150)
            for _ in range(trainer_step(pg, lid)):
                pg.evaluate("()=>lvStep(1)")
                pg.wait_for_timeout(30)
            pg.wait_for_timeout(250)
            total, unanswerable = 0, 0
            for _ in range(40):                      # идём по пунктам тренажёра
                state = pg.evaluate("""()=>{
                  const lk=lidKey(LV.id); const st=CHS[lk]||{};
                  const btns=[...document.querySelectorAll('#lvis button')].map(x=>x.innerText.trim());
                  return {done: st.gRes!=null, ok: st.gOk||0, bad: st.gBad||0, idx: st.gIdx||0, btns: btns};
                }""")
                if len(state['btns']) < 2 or len(state['btns']) > 10:
                    break
                if state['done']:                    # переходим к следующему пункту
                    total += 1
                    clicked = False
                    for label in state['btns']:
                        pg.evaluate("(l)=>{const b=[...document.querySelectorAll('#lvis button')].find(x=>x.innerText.trim()===l); if(b)b.click();}", label)
                        pg.wait_for_timeout(120)
                        after = pg.evaluate("()=>{const st=CHS[lidKey(LV.id)]||{}; return {ok:st.gOk||0, done:st.gRes!=null};}")
                        if not after['done']:        # нажатие перевело к следующему пункту
                            clicked = True
                            break
                    if not clicked:
                        break
                    continue
                # пункт без ответа: перебираем кнопки и ищем ту, что засчитывает верный ответ
                found = False
                for label in state['btns']:
                    pg.evaluate("""(l)=>{const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].gRes=null;
                      const b=[...document.querySelectorAll('#lvis button')].find(x=>x.innerText.trim()===l); if(b)b.click();}""", label)
                    pg.wait_for_timeout(130)
                    res = pg.evaluate("()=>{const st=CHS[lidKey(LV.id)]||{}; return {ok:st.gOk||0, bad:st.gBad||0, done:st.gRes!=null};}")
                    if res['ok'] > state['ok']:
                        found = True
                        break
                    if res['bad'] > state['bad']:
                        # ошибочный ответ — возвращаем пункт в исходное состояние
                        pg.evaluate("""()=>{const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].gRes=null; CHS[lk].gBad=Math.max(0,(CHS[lk].gBad||0)-1); chRender(0);}""")
                        pg.wait_for_timeout(80)
                if not found:
                    unanswerable += 1
                    print(f"  ПЛОХО урок {lid}: пункт {state['idx']+1} нерешаем (кнопки {state['btns']})")
                    pg.evaluate("""()=>{const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].gRes=null; CHS[lk].gIdx=(CHS[lk].gIdx||0)+1; chRender(0);}""")
                    pg.wait_for_timeout(80)
                total += 1
                if total >= 12:
                    break
            if total == 0:
                unanswerable += 1
                print(f"  ПЛОХО урок {lid}: тренажёр не найден — проверять было нечего")
            if unanswerable:
                bad.append(lid)
            else:
                ok += 1
                print(f"  OK   урок {lid}: все пункты тренажёра решаемы ({total})")
        b.close()
    print(f"\nИТОГ: уроков проверено {len(IDS)}, без проблем {ok}, с проблемами {len(bad)} {bad if bad else ''}")
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())
