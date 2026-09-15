#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Быстрая геометрическая проверка кадра: «не налезает ли что-то на что-то».

Зачем отдельный инструмент. Прежний гейт раскладки (qa_layout.py) пропускал мимо
себя ЛЮБОЙ элемент с transform или filter:

    if (rotated || softer || deco) { …; return; }

То есть все анимированные и светящиеся элементы — а именно их и рисуют правки —
не проверялись вообще. Из-за этого знак вопроса, который уехал вправо на 20 px и
налезал на букву «л», гейт честно показывал как «проблемных шагов 0».

Здесь проверяются ЧЕРНИЛА, а не блоки: берутся прямоугольники текстовых узлов
(Range.getClientRects), фигур SVG (getBoundingClientRect листьев) и картинок.
Считаются настоящие наложения, выход за края кадра и положение абсолютно
позиционированных элементов относительно их якоря.

Запуск:
    PYTHONPATH=.py-libs python3 qa_frame.py 611            # все кадры урока
    PYTHONPATH=.py-libs python3 qa_frame.py 611 1 2        # только кадры 1 и 2
    QA_W=390,320 PYTHONPATH=.py-libs python3 qa_frame.py 611

Требует локального сервера: (cd MVP && python3 -m http.server 8123 &)
"""
import os
import re
import sys

from playwright.sync_api import sync_playwright

EXE = os.environ.get(
    "QA_CHROME",
    "/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/"
    "chrome-headless-shell-mac-arm64/chrome-headless-shell",
)
URL = os.environ.get("QA_URL", "http://127.0.0.1:8123/")
SHOTS = os.environ.get("QA_SHOTS", "/tmp/qa-frame")

JS = r"""()=>{
  const host=document.getElementById('lvis'); if(!host) return {err:'нет #lvis'};
  const hb=host.getBoundingClientRect();
  /* чистая декорация: блики, зерно, лоза, световые пятна. Её считаем нарочно
     широкой, поэтому из проверки наложений исключаем — но только её. */
  const DECO='.rk-sheen,.rk-dust,.grain,.vine,.halo,.haloGlow,.spark,.l96-sun,.l96-ray,.l96-ecl,.l96-orb,.l96-glow,.rv-glow,.glow,.confetti,.fly';
  const name=(e)=>{
    if(!e||!e.tagName) return '?';
    let s=e.tagName.toLowerCase();
    if(e.className && typeof e.className==='string') s+='.'+e.className.trim().split(/\s+/).slice(0,2).join('.');
    if(e.id) s+='#'+e.id;
    return s;
  };
  const path=(e)=>{ const out=[]; let n=e;
    while(n && n!==document.body && out.length<4){ out.unshift(name(n)); n=n.parentElement; }
    return out.join(' > '); };
  const ink=[];                       /* {x,y,w,h,t,p} — чернила */
  const seen=new Set();
  const push=(r,t,e)=>{
    if(!r || r.width<1.5 || r.height<1.5) return;
    if(r.bottom<0 || r.top>1e5) return;
    const st=getComputedStyle(e);
    if(st.display==='none'||st.visibility==='hidden'||parseFloat(st.opacity||'1')<0.06) return;
    if(e.closest(DECO)) return;
    if(parseFloat(st.fontSize||'0')===0 && e.tagName!=='SVG' && !e.closest('svg')) {
      /* нулевой кегль — служебная обёртка, её геометрию не судим */
    }
    const key=Math.round(r.left)+':'+Math.round(r.top)+':'+Math.round(r.width)+':'+Math.round(r.height)+':'+t;
    if(seen.has(key)) return; seen.add(key);
    ink.push({x:r.left, y:r.top, w:r.width, h:r.height, t:String(t||'').slice(0,24), p:path(e), el:e});
  };
  /* 1. текст — по настоящим строкам, а не по блоку родителя */
  const walker=document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    const txt=(node.textContent||'').replace(/\s+/g,' ').trim();
    if(txt.length<2) continue;
    const el=node.parentElement; if(!el) continue;
    const rng=document.createRange(); rng.selectNodeContents(node);
    for(const r of rng.getClientRects()) push(r, txt, el);
  }
  /* 2. фигуры SVG и картинки */
  host.querySelectorAll('svg *, img, input, textarea, button').forEach(e=>{
    if(e.closest('svg') && !/^(path|circle|rect|ellipse|polygon|polyline|line|text|image|g)$/i.test(e.tagName)) return;
    if(e.tagName==='g' && e.children.length>1) return;      /* группы мерим по листьям */
    push(e.getBoundingClientRect(), e.tagName==='IMG' ? (e.alt||'картинка') : '', e);
  });
  const issues=[];
  /* A. наложение настоящих чернил */
  const inter=(a,b)=>{ const w=Math.max(0,Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x));
                       const h=Math.max(0,Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)); return w*h; };
  for(let i=0;i<ink.length;i++) for(let j=i+1;j<ink.length;j++){
    const A=ink[i], B=ink[j];
    if(A.el===B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;   /* один и тот же элемент или вложенный */
    /* Фигуры ОДНОГО рисунка налезают друг на друга по построению (столбики на
       оси, контуры карты, лучи). Судим только наложения МЕЖДУ разными вещами:
       текст ↔ знак, соседние буквы, текст ↔ картинка. */
    const sa=A.el.closest('svg'), sb=B.el.closest('svg');
    if(sa && sa===sb) continue;
    const ov=inter(A,B); if(ov<=0) continue;
    const small=Math.min(A.w*A.h, B.w*B.h); if(!small) continue;
    /* мелкие наложения (буквы в строке) не считаем: порог по площади и по px */
    if(ov/small < 0.12 || ov < 24) continue;
    issues.push({k:'наложение', a:A.t+' ('+A.p+')', b:B.t+' ('+B.p+')', ov:Math.round(ov)});
  }
  /* B. чернила за краями кадра */
  ink.forEach(A=>{
    if(A.x < hb.left-2 || A.x+A.w > hb.right+2) issues.push({k:'за краем', t:A.t, p:A.p,
      x:Math.round(A.x)+'…'+Math.round(A.x+A.w)+' рамка '+Math.round(hb.left)+'…'+Math.round(hb.right)});
  });
  /* C. абсолютно позиционированное внутри якоря: центр не должен уезжать */
  const anchor=[];
  host.querySelectorAll('*').forEach(e=>{
    const st=getComputedStyle(e);
    if(st.position!=='absolute' || e.closest(DECO)) return;
    const r=e.getBoundingClientRect(); if(r.width<6||r.height<6) return;
    const par=e.offsetParent; if(!par || par===document.body || par===document.documentElement) return;
    const pb=par.getBoundingClientRect(); if(pb.width<6) return;
    /* если элемент шире якоря (нарочно выступает) — сравниваем центры */
    const dx=Math.round((r.left+r.width/2)-(pb.left+pb.width/2));
    const dy=Math.round((r.top+r.height/2)-(pb.top+pb.height/2));
    /* Якорь может быть схлопнутым по высоте (пустая прорезь в слове — это
       точка на базовой линии): тогда проверяем только центровку по горизонтали,
       потому что знак по построению стоит ВЫШЕ линии. */
    const collapsedY = pb.height < 6;
    if(Math.abs(dx)>Math.max(3, pb.width*0.35) || (!collapsedY && Math.abs(dy)>Math.max(4, pb.height*0.9)))
      anchor.push({k:'сдвиг от якоря', t:name(e), p:path(e), dx, dy,
                   якорь:name(par)});
  });
  anchor.slice(0,4).forEach(a=>issues.push(a));
  return {issues:issues.slice(0,12), ink:ink.length, w:Math.round(hb.width)};
}"""


def steps_of(pg, lid):
    return pg.evaluate("(l)=>{const L=lessonById(l); return L?((L.explain||[]).length||(L.comic||[]).length):0;}", lid)


# Ждём сами анимации вместо сна вслепую: продолжаем, как только каскад
# доиграл. Вечные (пульсация, свечение) из ожидания выброшены, сверху — тот
# же потолок, что был сном, так что медленнее прежнего стать не может.
ОСЕЛО = r"""(cap)=>new Promise(res=>{
  const готово=()=>res(1);
  const t=setTimeout(готово,cap);
  requestAnimationFrame(()=>{
    const живые=(document.getAnimations?document.getAnimations():[]).filter(a=>{
      const ct=a.effect&&a.effect.getComputedTiming&&a.effect.getComputedTiming();
      return ct && ct.iterations!==Infinity;
    });
    Promise.all(живые.map(a=>a.finished.catch(()=>{}))).then(()=>{
      clearTimeout(t);
      requestAnimationFrame(()=>requestAnimationFrame(готово));
    });
  });
})"""


def осело(pg, потолок=650):
    try:
        pg.evaluate(ОСЕЛО, потолок)
    except Exception:
        pg.wait_for_timeout(потолок)


def run(lid, only=None):
    os.makedirs(SHOTS, exist_ok=True)
    widths = [int(x) for x in os.environ.get("QA_W", "390,320").split(",")]
    bad_total = 0
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=EXE, args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"])
        for W in widths:
            pg = b.new_page(viewport={"width": W, "height": 1400}, device_scale_factor=2)
            errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
            pg.goto(URL, wait_until="load", timeout=45000)
            for _ in range(40):
                pg.wait_for_timeout(250)
                if pg.evaluate("()=>typeof openLessonView==='function'"):
                    break
            pg.evaluate("()=>{DB.profile=Object.assign({},DB.profile||{},{klass:'6',name:'Проверка'});}")
            n = steps_of(pg, lid)
            plan = only or list(range(n))
            # Идём вперёд, как ходит ребёнок. Раньше ради кадра i урок
            # открывали заново и щёлкали «дальше» i раз — n(n+1)/2 шагов
            # вместо n. Старый обход остался под QA_SLOW=1: он нужен, чтобы
            # сверять оба пути, а не для работы.
            медленно = bool(os.environ.get("QA_SLOW"))
            пришли = None
            for i in plan:
                if медленно or пришли is None or i != пришли + 1:
                    pg.evaluate("(l)=>{CHS[lidKey(l)]=CHS[lidKey(l)]||{}; openLessonView(l);}", lid)
                    осело(pg, 200)
                    for _ in range(i):
                        pg.evaluate("()=>lvStep(1)")
                        pg.wait_for_timeout(55) if медленно else осело(pg, 200)
                else:
                    pg.evaluate("()=>lvStep(1)")
                    осело(pg, 200)
                пришли = i
                осело(pg, 650)
                r = pg.evaluate(JS)
                iss = r.get("issues") or []
                # снимок делаем только там, где есть замечание, или если попросили
                # все (QA_SHOTS_ALL=1): 56 снимков на урок — это половина времени
                shot = "-"
                if iss or os.environ.get("QA_SHOTS_ALL"):
                    shot = f"{SHOTS}/{lid}_{W}_{i:02d}.png"
                    try:
                        pg.locator("#lvis").screenshot(path=shot)
                    except Exception:
                        shot = "-"
                if r.get("err"):
                    print(f"урок {lid} @{W} кадр {i}: ОШИБКА {r['err']}")
                    continue
                bad_total += len(iss)
                mark = "OK  " if not iss else "ПЛОХО"
                print(f"  {mark} урок {lid} @{W} кадр {i}: чернил {r['ink']}" + (f", замечаний {len(iss)}" if iss else ""))
                for x in iss:
                    if x["k"] == "наложение":
                        print(f"        наложение {x['ov']}px²: «{x['a']}» ↔ «{x['b']}»")
                    elif x["k"] == "за краем":
                        print(f"        за краем: «{x['t']}» [{x['p']}] {x['x']}")
                    else:
                        print(f"        {x['k']}: {x['t']} ({x['p']}) dx={x['dx']} dy={x['dy']} якорь {x['якорь']} → {shot}")
            print(f"урок {lid} @{W}: ошибок консоли {len(errs)}" + (f" — {errs[:2]}" if errs else ""))
            pg.close()
        b.close()
    print(("ИТОГ: замечаний нет" if not bad_total else f"ИТОГ: замечаний {bad_total} — смотри строки ПЛОХО выше"))
    return 1 if bad_total else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    lid = int(sys.argv[1])
    ids = [int(x) for x in sys.argv[2:]] or None
    sys.exit(run(lid, ids))
