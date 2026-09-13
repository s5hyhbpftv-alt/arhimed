#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Снимки кадров русского урока: каждый шаг сохраняется отдельной картинкой.
Запуск: PYTHONPATH=.py-libs python3 deploy/615/shot.py 615 [куда]
"""
import sys, os
from playwright.sync_api import sync_playwright
EXE="/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
BASE=os.environ.get("QA_URL","http://127.0.0.1:8123/")

def main():
    lid=int(sys.argv[1]) if len(sys.argv)>1 else 615
    out=sys.argv[2] if len(sys.argv)>2 else f"/tmp/arh{lid}"
    W=int(os.environ.get("QA_W","390"))
    os.makedirs(out, exist_ok=True)
    with sync_playwright() as p:
        b=p.chromium.launch(executable_path=EXE,args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
        pg=b.new_page(viewport={"width":W,"height":2000})
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
        pg.goto(BASE,wait_until="load",timeout=45000)
        for _ in range(40):
            pg.wait_for_timeout(250)
            if pg.evaluate("()=>typeof DB==='object' && typeof openLessonView==='function'"): break
        pg.evaluate("()=>{DB.profile={name:'Вика',klass:'6',color:'#d9a441',gender:'girl'};save();}")
        pg.evaluate("(l)=>{openLessonView(l);}", lid); pg.wait_for_timeout(400)
        n=pg.evaluate(f"()=>{{const L=lessonById({lid}); return L?(L.explain?L.explain.length:0):0;}}")
        print('кадров', n)
        for i in range(n):
            pg.evaluate(f"()=>openLessonView({lid})"); pg.wait_for_timeout(120)
            for _ in range(i): pg.evaluate("()=>lvStep(1)"); pg.wait_for_timeout(60)
            pg.evaluate("()=>{const b=[...document.querySelectorAll('.wk-btn')].find(x=>/показать/.test(x.innerText)); if(b)b.click();}"); pg.wait_for_timeout(150)
            pg.wait_for_timeout(1200)
            pg.locator("#lvis").screenshot(path=f"{out}/f{i:02d}.png")
            t=pg.evaluate("()=>{const h=document.querySelector('#lvis h2'); return h?h.innerText.slice(0,40):'';}")
            print(f'  кадр {i:2d}: {t}')
        print('ошибок консоли:', len(errs))
        for e in errs[:5]: print('   ', e)
        b.close()
if __name__=="__main__": main()
