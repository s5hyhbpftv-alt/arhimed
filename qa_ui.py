#!/usr/bin/env python3
"""Аудит интерфейса по стандарту .agents/skills/ui-typography-usability.
Проверяет на каждом экране: контраст текста (WCAG AA), кегли по модульной шкале,
цели касания, масштабирование текста анимацией, поддержку reduced-motion,
переполнение раскладки на 390 / 768 / 1200 px. Печатает таблицу находок."""
import sys, json
from playwright.sync_api import sync_playwright
EXE="/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
BASE=sys.argv[1] if len(sys.argv)>1 else "http://127.0.0.1:8123/"
SCALE={12,14,16,20,24,32,48,64,72}
JS = r"""()=>{
  /* Что считать русским направлением. Раньше в списке были только контейнеры
     прежних сцен, и находки новых русских кадров (.s6 у 601–610, .pp у листов
     615–618, .ms у рукописного 611) попадали в раздел оболочки приложения —
     то есть «в русском направлении нарушений нет» было не доказательством,
     а следствием того, что мы просто не смотрели. */
  const RU=e=>!!e.closest('.r1,.rl-wrap,.th-wrap,.rk-scene,.rk-note,.wv-col,.s6,.pp,.ms,.rk,.ru-note,.ru-pred,.fb');
  const lum=c=>{const [r,g,b]=c.map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)});return .2126*r+.7152*g+.0722*b;};
  const parse=s=>{const m=/rgba?\(([^)]+)\)/.exec(s||''); if(!m) return null; const p=m[1].split(',').map(x=>parseFloat(x)); return {c:p.slice(0,3), a:p.length>3?p[3]:1};};
  const bgOf=el=>{let e=el; while(e&&e!==document.body){const b=parse(getComputedStyle(e).backgroundColor); if(b&&b.a>0.5) return b.c; e=e.parentElement;} return [22,36,29];};
  const ratio=(a,b)=>{const l1=lum(a),l2=lum(b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);};
  const out={contrast:[],scale:[],targets:[],scaled:0};
  document.querySelectorAll('#screen *, #lvis *').forEach(e=>{
    if(e.offsetParent===null) return;
    const st=getComputedStyle(e);
    if(e.children.length===0 && e.innerText && e.innerText.trim().length>1){
      const col=parse(st.color); const fs=Math.round(parseFloat(st.fontSize));
      /* Фон кнопки часто задан градиентом: у самой кнопки backgroundColor
         прозрачный, а текст лежит во вложенном элементе. Тогда проверка
         контраста считала фоном тёмный фон страницы и ругалась на золотую
         кнопку (тёмный текст на золоте — 8:1). Смотрим градиент и у предков. */
      const gradUp=(x)=>{ let n=0; while(x&&x!==document.body&&n<4){
        if((getComputedStyle(x).backgroundImage||'').includes('gradient')) return true; x=x.parentElement; n++; } return false; };
      const grad=(getComputedStyle(e).backgroundImage||'').includes('gradient') || gradUp(e);
      if(col && !grad){ const r=ratio(col.c,bgOf(e)); if(r<4.5 && fs<24) out.contrast.push({t:e.innerText.trim().slice(0,16), r:Math.round(r*10)/10, fs, ru:RU(e)});
        else if(r<3 && fs>=24) out.contrast.push({t:e.innerText.trim().slice(0,16), r:Math.round(r*10)/10, fs, ru:RU(e)}); }
      if(![12,14,16,20,24,32,48,64,72].includes(fs) && fs>=13 && fs<=30) out.scale.push({t:e.innerText.trim().slice(0,16), fs, ru:RU(e)});
      const tr=st.transform;
      if(tr && tr!=='none' && tr.includes('scale')) out.scaled++;
    }});
  out.tgt=[...document.querySelectorAll('#screen button, #screen a, #lvis button, #lvis .th-crate, #lvis .rl-cell, #lvis .chip')]
    .filter(e=>e.offsetParent!==null).map(e=>{const b=e.getBoundingClientRect(); return Math.round(Math.min(b.width,b.height));});
  out.targets=out.tgt; delete out.tgt;
  out.reduced=[...document.querySelectorAll('style')].map(s=>s.textContent).join('').includes('prefers-reduced-motion');
  out.overflow=document.documentElement.scrollWidth>window.innerWidth+1;
  return out;
}"""
def run(pg,label):
    r=pg.evaluate(JS)
    return {"экран":label, "контраст":r['contrast'], "вне шкалы":r['scale'],
            "цели<44":sorted([t for t in r['targets'] if t<44]), "масштаб текста":r['scaled'],
            "переполнение":r['overflow'], "reduced-motion":r['reduced']}
if __name__=="__main__":
    rows=[]
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path=EXE,args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
        for W in (390,768,1200):
            pg=b.new_page(viewport={"width":W,"height":950})
            pg.goto(BASE,wait_until="load",timeout=45000)
            for _ in range(40):
                pg.wait_for_timeout(250)
                if pg.evaluate("()=>typeof DB==='object' && typeof openLessonView==='function'"): break
            pg.evaluate("()=>{DB.profile={name:'Вика',klass:'6',color:'#d9a441',gender:'girl'};save();}")
            # Смотрим не только 601 и 611: 602 — переложенный урок в новом каркасе
            # (.s6), 617 — бумажный лист с форматами ответов (.pp), 619 — урок
            # словарных слов младшей школы с кадром-списком (.rw). Раньше эти
            # поверхности аудит не открывал вовсе.
            for kind,lid in (("урок 601","601"),("урок 602","602"),("урок 607","607"),
                             ("работа 611","611"),("лист 617","617"),("слова 619","619")):
                pg.evaluate("(l)=>{openLessonView(l);}", int(lid)); pg.wait_for_timeout(700)
                for _ in range(4): pg.evaluate("()=>lvStep(1)"); pg.wait_for_timeout(60)
                pg.wait_for_timeout(400)
                rows.append(run(pg,f"{kind} @{W}"))
            pg.evaluate("()=>go('task-rus1')"); pg.wait_for_timeout(600); rows.append(run(pg,f"задача @{W}"))
            pg.evaluate("()=>go('path')"); pg.wait_for_timeout(500); rows.append(run(pg,f"Путь @{W}"))
            pg.close()
        b.close()
    print(f"{'экран':<18}{'контраст':<10}{'вне шкалы':<11}{'цели<44':<10}{'масштаб':<9}{'переполн':<10}rm")
    bad=0
    for r in rows:
        flag = 'НЕТ' if not r['контраст'] else f"{len(r['контраст'])}"
        sc   = 'нет' if not r['вне шкалы'] else f"{len(r['вне шкалы'])}"
        tg   = 'ок' if not r['цели<44'] else f"{len(r['цели<44'])}"
        print(f"{r['экран']:<18}{flag:<10}{sc:<11}{tg:<10}{r['масштаб текста']:<9}{'ДА' if r['переполнение'] else 'нет':<10}{'есть' if r['reduced-motion'] else 'НЕТ'}")
        if r['контраст'] or r['вне шкалы'] or r['цели<44'] or r['переполнение'] or not r['reduced-motion']: bad+=1
    print()
    print("НАХОДКИ В РУССКОМ НАПРАВЛЕНИИ (правим):")
    any_ru=False
    for r in rows:
        for c in [x for x in r['контраст'] if x.get('ru')][:3]: print(f"  · {r['экран']}: контраст {c['r']}:1 у «{c['t']}» ({c['fs']} px)"); any_ru=True
        for s in [x for x in r['вне шкалы'] if x.get('ru')][:3]: print(f"  · {r['экран']}: кегль {s['fs']} px вне шкалы у «{s['t']}»"); any_ru=True
    if not any_ru: print("  · нарушений нет")
    print("НАХОДКИ В ОБОЛОЧКЕ ПРИЛОЖЕНИЯ (справочно, вне области правок):")
    shell={}
    for r in rows:
        for c in [x for x in r['контраст'] if not x.get('ru')]: shell.setdefault(('контраст',c['fs']),0); shell[('контраст',c['fs'])]+=1
        for s in [x for x in r['вне шкалы'] if not x.get('ru')]: shell.setdefault(('кегль',s['fs']),0); shell[('кегль',s['fs'])]+=1
        if r['цели<44']: shell.setdefault(('цели касания',0),0); shell[('цели касания',0)]+=1
    for (k,v),n in sorted(shell.items()): print(f"  · {k}" + (f" {v} px" if v else "") + f": {n} случаев")
    print(f"ИТОГ: экранов {len(rows)}, с находками {bad}")
