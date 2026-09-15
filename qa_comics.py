# -*- coding: utf-8 -*-
"""QA комиксов: облачко речи целиком, подпись кадра, цель касания, ошибки JS.

Запуск: PYTHONPATH=.py-libs python3 qa_comics.py [390] [320]
        QA_URL=http://127.0.0.1:8125/MVP/ QA_ONLY=63,67 python3 qa_comics.py

Зачем этот гейт. Облачко речи в комиксах позиционировалось «на глаз»: ширина
бралась как доля сцены, а высота не измерялась. Реплика в 20 слов не влезала,
облачко вылезало за верх сцены, а сцена обрезает по overflow:hidden — хвост
реплики пропадал, и ребёнок не дочитывал условие задачи. Ни один прежний гейт
этого не видел: qa_layout судит кадры листов и тренажёров, qa_ui — контраст и
кегли, qa_feedback — отклик. Здесь проверяется ровно то, что ломалось:
текст реплики целиком внутри облачка, облачко целиком внутри сцены,
подпись кадра не обрезана, кнопка закрытия не меньше нормы касания.
"""
import os
import sys

from playwright.sync_api import sync_playwright

EXE = os.environ.get("QA_CHROME", "/Users/mihaildrozdov/Documents/DPsek/браузеры/"
                     "chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell")
URL = os.environ.get("QA_URL", "http://127.0.0.1:8125/MVP/")
ТОЛЬКО = [int(x) for x in os.environ.get("QA_ONLY", "").split(",") if x.strip()]

# Проверка одного кадра комикса. Возвращает список замечаний.
JS = r"""()=>{
  const ov=document.querySelector('.comic-ov');
  if(!ov) return {беда:'оверлей комикса не открылся'};
  const stage=ov.querySelector('.c2-stage');
  if(!stage) return {беда:'нет сцены'};
  const sr=stage.getBoundingClientRect();
  const беды=[];

  /* 1. Облачко речи: текст целиком внутри облачка и облачко целиком в сцене. */
  const talk=ov.querySelector('.c2-talk');
  if(talk){
    const tr=talk.getBoundingClientRect();
    const скажи=talk.querySelector('.c2-say');
    const стиль=getComputedStyle(talk);
    const рамкаПоБокам=parseFloat(стиль.paddingLeft)+parseFloat(стиль.paddingRight)
      +parseFloat(стиль.borderLeftWidth)+parseFloat(стиль.borderRightWidth);
    /* высота строки текста против свободного места внутри облачка */
    if(скажи){
      const нужно=скажи.getBoundingClientRect().height
        + parseFloat(стиль.paddingTop)+parseFloat(стиль.paddingBottom)
        + parseFloat(стиль.borderTopWidth)+parseFloat(стиль.borderBottomWidth);
      if(нужно>tr.height+1.5)
        беды.push({к:'текст не влез в облачко', нужно:Math.round(нужно), есть:Math.round(tr.height)});
      if(скажи.scrollWidth>скажи.clientWidth+1.5)
        беды.push({к:'текст шире облачка', ширина:скажи.scrollWidth, место:скажи.clientWidth});
    }
    if(tr.top<sr.top-1) беды.push({к:'облачко вылезло вверх', на:Math.round(sr.top-tr.top)});
    if(tr.bottom>sr.bottom+1) беды.push({к:'облачко вылезло вниз', на:Math.round(tr.bottom-sr.bottom)});
    if(tr.left<sr.left-1) беды.push({к:'облачко вылезло влево', на:Math.round(sr.left-tr.left)});
    if(tr.right>sr.right+1) беды.push({к:'облачко вылезло вправо', на:Math.round(tr.right-sr.right)});
  } else {
    беды.push({к:'нет облачка речи'});
  }

  /* 2. Подпись кадра: строка не должна быть обрезана по высоте. */
  const cap=ov.querySelector('.c2-capbar');
  if(cap){
    const внут=cap.querySelector('.c2cap-in');
    const стиль=getComputedStyle(cap);
    const место=cap.clientHeight-parseFloat(стиль.paddingTop)-parseFloat(стиль.paddingBottom);
    const нужно=внут? внут.getBoundingClientRect().height : 0;
    if(нужно>место+1.5)
      беды.push({к:'подпись кадра не влезла', нужно:Math.round(нужно), место:Math.round(место)});
    if(внут && внут.scrollHeight>внут.clientHeight+1.5)
      беды.push({к:'подпись кадра обрезана'});
  }

  /* 3. Кнопка закрытия: норма касания (у неё расширенная цель через ::after). */
  const крест=ov.querySelector('.ct-x');
  if(крест){
    const b=крест.getBoundingClientRect();
    const цель=getComputedStyle(крест,'::after');
    const ширина=parseFloat(цель.width)||b.width, высота=parseFloat(цель.height)||b.height;
    if(Math.min(ширина,высота)<44)
      беды.push({к:'кнопка закрытия меньше нормы касания', цель:[Math.round(ширина),Math.round(высота)]});
  }

  /* 4. Навигация не должна уезжать за экран. */
  ov.querySelectorAll('.comic-nav button').forEach(e=>{
    const b=e.getBoundingClientRect();
    if(b.height<44) беды.push({к:'кнопка навигации меньше 44 px', текст:e.innerText.trim().slice(0,14), в:Math.round(b.height)});
  });
  return {беды, есть_рисунок:!!stage.querySelector('svg')};
}"""


def прогон(ширина, ids_ожидаемые=None):
    строки, замечаний = [], 0
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=EXE, args=["--no-sandbox"])
        ctx = b.new_context(viewport={"width": ширина, "height": 900}, service_workers="block")
        pg = ctx.new_page()
        ошибки = []
        pg.on("pageerror", lambda e: ошибки.append(str(e)[:100]))
        pg.goto(URL, wait_until="load", timeout=60000)
        for _ in range(60):
            pg.wait_for_timeout(120)
            if pg.evaluate("()=>typeof openLessonView==='function'"):
                break
        ids = ids_ожидаемые or pg.evaluate(
            "()=>window.ARH_LESSONS.filter(x=>x.comic).map(x=>x.id)")
        всего_кадров = 0
        for lid in ids:
            pg.evaluate(f"()=>openLessonView({lid})")
            pg.wait_for_timeout(320)
            n = pg.evaluate("()=>COMIC.isOpen()? lessonById(%d).comic.length : 0" % lid)
            if not n:
                строки.append(f"  {lid}: комикс не открылся")
                замечаний += 1
                continue
            беды_урока = []
            for i in range(n):
                if i:
                    pg.evaluate("()=>COMIC.next()")
                pg.wait_for_timeout(200)
                r = pg.evaluate(JS)
                всего_кадров += 1
                if r.get("беда"):
                    беды_урока.append((i, r["беда"]))
                else:
                    if r.get("беды"):
                        беды_урока.append((i, r["беды"]))
                    if not r.get("есть_рисунок"):
                        беды_урока.append((i, "кадр без рисунка"))
            pg.evaluate("()=>COMIC.close()")
            if беды_урока:
                замечаний += len(беды_урока)
                строки.append(f"  урок {lid}: кадров {n}, замечаний {len(беды_урока)}")
                for i, x in беды_урока[:4]:
                    строки.append(f"      кадр {i}: {x}")
        строки.insert(0, f"@{ширина}: комиксов {len(ids)}, кадров {всего_кадров}, "
                         f"замечаний {замечаний}, ошибок JS {len(ошибки)}")
        if ошибки:
            for e in ошибки[:4]:
                строки.append(f"  ошибка JS: {e}")
        pg.close()
        ctx.close()
        b.close()
    return строки, замечаний


def main():
    ширины = [int(x) for x in sys.argv[1:]] or [390, 320]
    всего = 0
    for ш in ширины:
        строки, з = прогон(ш, ТОЛЬКО or None)
        print("\n".join(строки))
        всего += з
    print("ИТОГ:", "замечаний нет" if всего == 0 else f"проблемных отметок {всего}")
    return 1 if всего else 0


if __name__ == "__main__":
    sys.exit(main())
