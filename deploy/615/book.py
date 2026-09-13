#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Снимки вкладки «Учебники»: проверяем полку «Путь Мишутки» на разных ширинах.
Запуск: PYTHONPATH=.py-libs python3 deploy/615/book.py [куда]
"""
import sys, os
from playwright.sync_api import sync_playwright
EXE="/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
BASE=os.environ.get("QA_URL","http://127.0.0.1:8123/")
WIDTHS=[int(x) for x in os.environ.get("QA_W","320,390,768").split(",")]

def main():
    out=sys.argv[1] if len(sys.argv)>1 else "/tmp/arh-book"
    os.makedirs(out, exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path=EXE,args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
        for W in WIDTHS:
            pg=b.new_page(viewport={"width":W,"height":1400})
            errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
            pg.goto(BASE,wait_until="load",timeout=45000)
            for _ in range(40):
                pg.wait_for_timeout(250)
                if pg.evaluate("()=>typeof DB==='object' && typeof renderBookList==='function'"): break
            pg.evaluate("()=>{DB.profile={name:'Вика',klass:'6',color:'#d9a441',gender:'girl'};DB.openWorld=true;save();}")
            # 1) вкладка «Путь Мишутки»
            pg.evaluate("()=>{BK.subj='mish';renderBookList();}")
            pg.wait_for_timeout(300)
            pg.screenshot(path=f"{out}/mish-{W}.png", full_page=True)
            # 2) общий список «Все» — там секция тоже должна быть
            pg.evaluate("()=>{BK.subj='all';renderBookList();}")
            pg.wait_for_timeout(300)
            pg.screenshot(path=f"{out}/all-{W}.png", full_page=True)
            info=pg.evaluate("""()=>{
              const tabs=[...document.querySelectorAll('.btab')].map(t=>t.innerText.replace(/\\n/g,'/'));
              const mish=document.querySelector('.btab .subj-img');
              const links=[...document.querySelectorAll('.lesson-row')].filter(r=>/Мишутки|МЦКО|лист|Демо/.test(r.innerText)).length;
              return {tabs, mishImg: mish? [mish.getBoundingClientRect().width, mish.naturalWidth]:null,
                      miscRows: links, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth};
            }""")
            print(f"W={W}: табы {info['tabs']}")
            print(f"      картинка-значок {info['mishImg']}, overflow {info['scrollW']} vs {info['clientW']}, ошибок {len(errs)}")
            for e in errs[:4]: print('   ', e)
            pg.close()
        b.close()
if __name__=="__main__": main()
