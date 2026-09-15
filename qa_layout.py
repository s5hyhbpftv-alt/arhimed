# -*- coding: utf-8 -*-
"""QA раскладки уроков: наложения текста, обрезка за контейнер, центровка.
Запуск: PYTHONPATH=.py-libs python3 qa_layout.py 51 96 252
"""
import sys, re
from playwright.sync_api import sync_playwright
import os
EXE=os.environ.get("QA_CHROME","/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell")
URL=os.environ.get("QA_URL","http://127.0.0.1:8123/")
JS = r"""()=>{
  const host=document.getElementById('lvis'); if(!host) return {err:'нет #lvis'};
  const hb=host.getBoundingClientRect();
  /* Декоративные слои: блики, зерно бумаги, лоза, световое пятно, пыль, искры.
     Их не судим ни на обрезку, ни на сдвиг центра: они нарисованы шире кадра и
     обрезаны рамкой по построению. Раньше в списке были только слои прежних
     сцен, и русские кадры ловили ложные отметки: у 614 центр уводил блик
     .rk-sheen, у рукописного 611 — лоза .vine и подчёркивание .underline. */
  const DECO='.l96-scene,.l96-ecl,.l96-ground,.q-pot,.l96-orb,.l96-sun,.l96-ray,.l96-mirror,.l96-sh,.l96-trunk,.l96-crown,'+
    '.rk-sheen,.rk-dust,.grain,.vine,.halo,.haloGlow,.spark,.amb,.rv-glow,.glow';
  const out=[]; const texts=[];
  const isText=(e)=>{ if(!e.childNodes) return false;
    for(const n of e.childNodes) if(n.nodeType===3 && n.textContent.trim().length>1) return true; return false; };
  host.querySelectorAll('*').forEach(e=>{
    const st=getComputedStyle(e);
    if(st.display==='none'||st.visibility==='hidden'||parseFloat(st.opacity||'1')<0.05) return;
    const b=e.getBoundingClientRect();
    if(b.width<2||b.height<2) return;
    /* Раньше здесь стояло `if(rotated||softer||deco) … return;` — и ЛЮБОЙ элемент
       с transform или filter выпадал из проверки целиком: ни обрезки, ни выхода
       за край для него не считалось. Именно поэтому знак вопроса, который уехал
       вправо на 21 px и налезал на букву, давал «проблемных шагов 0»: у знака и
       фильтр, и анимация. Теперь исключаем только настоящую декорацию; элементу
       с transform/filter считаем обрезку и выход за край (но не сдвиг центра —
       иначе блики уводят центр кадра). Наложения таких элементов между собой
       проверяет отдельный быстрый инструмент qa_frame.py: там сравниваются
       чернила (текстовые узлы и фигуры), а фигуры одного рисунка исключены. */
    const deco=e.closest(DECO);
    const animated=(st.transform&&st.transform!=='none')||(st.filter&&st.filter!=='none');
    if(deco) { if(isText(e)) texts.push({t:e.textContent.trim().slice(0,20), b, el:e}); return; }
    if(animated) { if(isText(e)) texts.push({t:e.textContent.trim().slice(0,20), b, el:e});
      if(b.left<hb.left-2||b.right>hb.right+2||b.bottom>hb.bottom+2)
        out.push({k:'анимированное за краем', t:(e.textContent||e.className||'').toString().trim().slice(0,18), c:Math.round(b.left)+'…'+Math.round(b.right)});
      return; }
    // обрезка: элемент вылезает за #lvis или за контейнер с overflow hidden.
    // Полноэкранные кадры (.rk-scene) и их контейнеры намеренно шире #lvis — их не судим,
    // у них своя проверка: содержимое не должно выходить за края экрана.
    const inScene=!!(e.closest&&e.closest('.rk-scene, .s6, .ms, .rk, .rl-wrap, .th-wrap'));
    const hasScene=!!(e.querySelector&&e.querySelector('.rk-scene'));
    if(inScene||hasScene){
      if(isText(e)) texts.push({t:e.textContent.trim().slice(0,20), b, el:e});
      if(inScene && (b.left<-2||b.right>window.innerWidth+2)) out.push({k:'за краем экрана', t:(e.textContent||'').trim().slice(0,18), c:'rk'});
      return;
    }
    let p=e.parentElement, clipped=false, anc=null;
    while(p && p!==document.body){
      const ps=getComputedStyle(p);
      if(ps.overflow!=='visible'||ps.overflowX!=='visible'||ps.overflowY!=='visible'){
        const pb=p.getBoundingClientRect();
        if(b.left<pb.left-1||b.top<pb.top-1||b.right>pb.right+1||b.bottom>pb.bottom+1){ clipped=true; anc=p.className||p.tagName; break; }
      }
      p=p.parentElement;
    }
    if(b.left<hb.left-1||b.right>hb.right+1||b.bottom>hb.bottom+1) clipped=true;
    if(clipped) out.push({k:'обрезано', t:(e.textContent||'').trim().slice(0,18), c:String(anc).slice(0,24)});
    if(isText(e)) texts.push({t:e.textContent.trim().slice(0,20), b, el:e});
  });
  /* Многострочный inline-элемент (например <b> внутри абзаца, перенесённый на
     две строки) получает рамку на обе строки целиком — по ней наложение считать
     нельзя, это ложная отметка. Такую рамку из проверки убираем. */
  const oneLine=(x)=>{ const st=getComputedStyle(x.el); const fs=parseFloat(st.fontSize)||16;
    return x.b.height <= fs*1.8; };
  for(let i=0;i<texts.length;i++) for(let j=i+1;j<texts.length;j++){
    if(texts[i].el.contains(texts[j].el)||texts[j].el.contains(texts[i].el)) continue; /* вложенный текст */
    if(!oneLine(texts[i])||!oneLine(texts[j])) continue;   /* многострочные inline не судим */
    const A=texts[i].b, B=texts[j].b;
    const w=Math.max(0,Math.min(A.right,B.right)-Math.max(A.left,B.left));
    const h=Math.max(0,Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top));
    const ov=w*h, small=Math.min(A.width*A.height,B.width*B.height);
    if(ov>0 && small>0 && ov/small>0.12) out.push({k:'наложение', t:texts[i].t+' / '+texts[j].t});
  }
  // центровка: центр содержимого против центра #lvis
  // anyContent отдельно от leaves: полноширинный блок в центр не идёт, но кадр
  // с полем ввода и кнопкой «Проверить» — не пустой. Раньше такие кадры
  // (развёрнутый ответ на листах 616–618) гейт называл пустой сценой.
  let L=1e9,R=-1e9,leaves=0,anyContent=false;
  host.querySelectorAll('*').forEach(e=>{ const st=getComputedStyle(e);
    if(st.display==='none'||parseFloat(st.opacity||'1')<0.05) return;
    if(e.children.length) return;                 /* контейнеры и служебный CSS не меряем — только листья */
    if(e.tagName==='STYLE'||e.tagName==='DEFS'||e.tagName==='LINEARGRADIENT') return;
    if(e.closest(DECO)) return;                   /* декоративные слои центр не уводят */
    const b=e.getBoundingClientRect(); if(b.width<4||b.height<4) return;
    const tag=e.tagName;
    if(tag==='TEXTAREA'||tag==='INPUT'||tag==='BUTTON'||tag==='SELECT') anyContent=true;
    if(b.width>hb.width-4){ if((e.innerText||'').trim().length>2) anyContent=true; return; }
    leaves++;
    L=Math.min(L,b.left); R=Math.max(R,b.right); });
  const dev=Math.round(((L+R)/2)-((hb.left+hb.right)/2));
  host.querySelectorAll('.l96-scene,.l96-ecl,[class*=scene]').forEach(e=>{
    const b=e.getBoundingClientRect();
    if(b.width<8||b.height<8) out.push({k:'сцена схлопнута', t:(e.className||'').slice(0,20), c:Math.round(b.width)+'x'+Math.round(b.height)});
  });
  if(!leaves && !anyContent) out.push({k:'пустая сцена', t:(host.innerText||'').trim().slice(0,20)||'нет содержимого'});
  return {issues:out, dev:leaves?dev:0, leaves:leaves, texts:texts.length};
}"""
# ─────────────────────────────────────────────────────────────────────────
# Как этот гейт ходит по кадрам
#
# Раньше кадр i показывался так: открыть урок заново и щёлкнуть «дальше» i раз.
# То есть за урок из n кадров — n(n+1)/2 шагов вместо n, и на каждом свой сон.
# Для урока из 16 кадров это 136 шагов там, где хватает 16.
#
# Теперь идём вперёд, как ходит ребёнок: открыли урок один раз и шагаем.
# Старый обход остался под QA_SLOW=1 — он нужен, чтобы сверять оба пути между
# собой; расхождение вердиктов означало бы, что состояние кадра зависит от
# того, как в него пришли, и это была бы находка, а не помеха.
#
# Второе: вместо сна «1300 мс, пусть каскад доиграет» ждём сами анимации и
# продолжаем, как только они кончились. Вечные (пульсация, свечение) из
# ожидания выброшены — иначе ждали бы до конца света; сверху стоит тот же
# потолок, что был сном, так что медленнее прежнего стать не может.
# ─────────────────────────────────────────────────────────────────────────
ОСЕЛО = r"""(cap)=>new Promise(res=>{
  const готово=()=>res(1);
  const t=setTimeout(готово,cap);
  requestAnimationFrame(()=>{
    const живые=(document.getAnimations?document.getAnimations():[]).filter(a=>{
      const ct=a.effect&&a.effect.getComputedTiming&&a.effect.getComputedTiming();
      return ct && ct.iterations!==Infinity;      /* вечные не ждём */
    });
    Promise.all(живые.map(a=>a.finished.catch(()=>{}))).then(()=>{
      clearTimeout(t);
      requestAnimationFrame(()=>requestAnimationFrame(готово));
    });
  });
})"""

ПОКАЗАТЬ = "()=>{const b=[...document.querySelectorAll('.wk-btn')].find(x=>/показать/.test(x.innerText)); if(b)b.click();}"


def осело(pg, потолок=1300):
    try:
        pg.evaluate(ОСЕЛО, потолок)
    except Exception:
        pg.wait_for_timeout(потолок)


def одна_ширина(W, ids, медленно=False):
    """Один проход по урокам на одной ширине. Возвращает готовые строки отчёта."""
    строки = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=EXE,
                              args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        pg = b.new_page(viewport={"width": W, "height": 1400})
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:90]))
        pg.goto(URL, wait_until="load", timeout=45000)
        for _ in range(40):
            pg.wait_for_timeout(120)
            if pg.evaluate("()=>typeof openLessonView==='function'"): break
        pg.evaluate("()=>{DB.profile=Object.assign({},DB.profile,{klass:'6'});}")
        for lid in ids:
            pg.evaluate(f"()=>openLessonView({lid})"); осело(pg, 400)
            n = pg.evaluate(f"()=>{{const L=lessonById({lid}); return L?(L.explain?L.explain.length:(L.comic?L.comic.length:0)):0;}}")
            bad = []; devs = []
            for i in range(n):
                if медленно:
                    pg.evaluate(f"()=>openLessonView({lid})"); pg.wait_for_timeout(90)
                    for _ in range(i):
                        pg.evaluate("()=>lvStep(1)"); pg.wait_for_timeout(60)
                else:
                    if i == 0: pg.evaluate(f"()=>openLessonView({lid})")
                    else:      pg.evaluate("()=>lvStep(1)")
                    осело(pg, 300)
                pg.evaluate(ПОКАЗАТЬ)
                осело(pg, 1300)
                r = pg.evaluate(JS)
                if r.get('issues'): bad.append((i, r['issues'][:3]))
                devs.append(abs(r.get('dev', 0)))
            строки.append(f"урок {lid} @{W}: шагов {n} | проблемных шагов {len(bad)} | "
                          f"макс.сдвиг центра {max(devs) if devs else 0}px | ошибок {len(errs)}")
            for i, iss in bad[:6]:
                строки.append(f"    шаг {i}: {iss}")
        pg.close(); b.close()
    return строки


def run(ids, ширины=(390, 320)):
    медленно = bool(os.environ.get("QA_SLOW"))
    # Ширины независимы друг от друга, поэтому идут разом: каждая в своём
    # потоке со своим playwright (общие объекты между потоками не переживают).
    # Один поток — это прежнее поведение, оно остаётся под QA_JOBS=1.
    потоков = int(os.environ.get("QA_JOBS", "2"))
    if потоков > 1 and len(ширины) > 1 and not медленно:
        from concurrent.futures import ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=min(потоков, len(ширины))) as пул:
            пачки = list(пул.map(lambda W: одна_ширина(W, ids), ширины))
    else:
        пачки = [одна_ширина(W, ids, медленно) for W in ширины]
    for пачка in пачки:
        for строка in пачка:
            print(строка)


if __name__=="__main__":
    run([int(x) for x in sys.argv[1:]] or [51])
