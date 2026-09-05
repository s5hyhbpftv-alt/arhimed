# -*- coding: utf-8 -*-
"""Универсальная проверка слайд-презентаций на всех устройствах.
Использование: python3 проверка_слайдов.py <URL> <outdir> [снимать ли скриншоты: 1/0]
Проверяет: число слайдов, JS-ошибки, горизонтальные переполнения на 360/768/1024/1440.
"""
import os, sys
from playwright.sync_api import sync_playwright
EXE="/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
URL=sys.argv[1]; OUT=sys.argv[2]; SHOT=len(sys.argv)>3 and sys.argv[3]=='1'
os.makedirs(OUT, exist_ok=True)
WIDTHS=[360,768,1024,1440]
with sync_playwright() as p:
  b=p.chromium.launch(executable_path=EXE,args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
  for w in WIDTHS:
    pg=b.new_context(viewport={"width":w,"height":820}).new_page()
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:150]))
    pg.goto(URL,wait_until="load",timeout=60000); pg.wait_for_timeout(600)
    n=pg.evaluate("()=>SLIDES.length")
    def go(i):
        cur=pg.evaluate("()=>[...document.querySelectorAll('.slide')].findIndex(e=>e.classList.contains('on'))")
        for _ in range(i-cur):
            pg.evaluate("()=>mv(1)"); pg.wait_for_timeout(110)
    worst=0
    for i in range(n):
        go(i); pg.wait_for_timeout(60)
        m=pg.evaluate("()=>{const el=document.querySelector('.slide.on');const r=el.getBoundingClientRect();return {sw:document.documentElement.scrollWidth,iw:window.innerWidth,right:Math.round(r.right),left:Math.round(r.left)}}")
        worst=max(worst, m['sw']-m['iw'], m['right']-m['iw'], -m['left'])
        if SHOT and w==1024: pg.locator('#s%d'%i).screenshot(path=f"{OUT}/d_s{i:02d}.png")
        if SHOT and w==360: pg.locator('#s%d'%i).screenshot(path=f"{OUT}/m_s{i:02d}.png")
    print(f"w{w}: slides={n} overflow={worst}px errors={errs[:2]}", flush=True)
    pg.close()
  b.close()
print("DONE")
