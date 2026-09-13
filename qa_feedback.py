#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Гейт против шаблонного отклика: после ответа в кадре обязан появиться
анимированный отклик (печать/волна/оттиск) с ненулевой анимацией, а не голая
строка текста.

Проверяются все уроки русского направления, у которых есть тренажёр:
601–610 (кадр 8) и работа 611. По каждому уроку делается два ответа — так
проверяются обе ветки отклика: верная (печать с волной) и ошибочная
(чернильный оттиск).

Запуск: PYTHONPATH=.py-libs python3 qa_feedback.py [адрес]
Падает, если отклик — только текст или если анимация отсутствует."""
import sys
from playwright.sync_api import sync_playwright
EXE="/Users/mihaildrozdov/Documents/DPsek/браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell"
BASE=sys.argv[1] if len(sys.argv)>1 else "http://127.0.0.1:8123/"
LESSONS=[(601,"части речи"),(602,"состав слова"),(603,"вставка буквы"),(604,"парные согласные"),
         (605,"слитно или раздельно"),(606,"род существительного"),(607,"падежи"),
         (608,"время глагола"),(609,"-тся и -ться"),(610,"однородные члены")]
ok=[]
def check(n,c,d=''):
    ok.append(c); print(('  OK   ' if c else '  ПЛОХО')+' '+n+((' → '+str(d)[:110]) if d else ''))
JS="""()=>{const fb=document.querySelector('#lvis .fb');
  const stamp=document.querySelector('#lvis .fb .stamp, #lvis .fb .ring, #lvis .fb .blot');
  const anims=fb?fb.getAnimations({subtree:true}).filter(a=>a.playState!=='finished').length:0;
  const cls=fb?fb.className:'';
  return {fb:!!fb, stamp:!!stamp, anims:anims, cls:cls, text:fb?fb.innerText.replace(/\\s+/g,' ').slice(0,44):''};}"""
# кнопка тренажёра: у 601 — s6Sort, у 603 и 604 — data-key, у остальных — ru###Game
# выбор кнопки по ветке: right — верный ответ, wrong — ошибочный.
# ключ верного ответа берём из данных тренажёра (RUGAME для 601–610,
# RULETTER.data для 603 и 604), а не наугад.
PICK="""([id,want])=>{const btns=[...document.querySelectorAll('#lvis button')]
   .filter(x=>/Sort\\(|Game\\(|Pick\\(/.test(x.getAttribute('onclick')||''));
  const arg=b=>{const m=/['"]([^'"]+)['"]\\s*\\)\\s*$/.exec(b.getAttribute('onclick')||''); return m?m[1]:null;};
  if(!btns.length) return null;
  let G=(window.RUGAME||{})[id];
  if(!G&&window.RULETTER&&window.RULETTER.data) G=window.RULETTER.data[id];
  if(!G) { btns[0].click(); return arg(btns[0]); }
  const st=((window.CHS||{})[lidKey(id)])||{};
  const it=G[(st.gIdx||0)%G.length];
  const right=String((id===601)?it[2]:it[1]);
  const b=(want==='right')?btns.find(x=>arg(x)===right):btns.find(x=>arg(x)!==right);
  if(!b) return null;
  b.click(); return arg(b);}"""
STEP8="(l)=>{try{CHS[lidKey(l)]={};}catch(e){} openLessonView(l);}"
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=EXE,args=["--use-gl=swiftshader","--enable-unsafe-swiftshader"])
    pg=b.new_page(viewport={"width":390,"height":1000})
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:120]))
    pg.goto(BASE,wait_until="load",timeout=45000)
    for _ in range(40):
        pg.wait_for_timeout(250)
        if pg.evaluate("()=>typeof DB==='object' && typeof openLessonView==='function'"): break
    pg.evaluate("()=>{DB.profile={name:'Вика',klass:'6',color:'#d9a441',gender:'girl'};save();}")
    for lid,label in LESSONS:
        pg.evaluate(STEP8, int(lid)); pg.wait_for_timeout(200)
        for _ in range(8): pg.evaluate("()=>lvStep(1)"); pg.wait_for_timeout(45)
        pg.wait_for_timeout(350)
        marks=[]
        for n,want in enumerate(('wrong','right')):
            if n:                                  # первый ответ уже дан: этот клик листает слово
                pg.evaluate(PICK, [int(lid),want]); pg.wait_for_timeout(120)
            what=pg.evaluate(PICK, [int(lid),want])
            pg.wait_for_timeout(140)
            r=pg.evaluate(JS)
            kind='верный' if 'ok' in r['cls'].split() else ('ошибочный' if 'no' in r['cls'].split() else '?')
            marks.append((what,kind,r))
        good=all(m[2]['fb'] and m[2]['stamp'] and m[2]['anims']>0 for m in marks)
        det=' · '.join(f"{m[1]}: анимаций {m[2]['anims']}, «{m[2]['text'][:24]}»" for m in marks)
        check(f'урок {lid} ({label}): анимированный отклик на оба ответа', good, det)
        kinds={m[1] for m in marks}
        if kinds!={'верный','ошибочный'}:
            check(f'урок {lid}: проверены обе ветки отклика', False, f'ветки: {kinds}')
    # ---- работа 611: кадр с первым вопросом
    pg.evaluate("()=>{CHS[lidKey(611)]={}; openLessonView(611);}"); pg.wait_for_timeout(250)
    idx=pg.evaluate("()=>{const L=ARH_LESSONS.find(x=>x.id===611); return L.explain.findIndex(t=>/^Вопрос 1 /.test(t));}")
    for _ in range(idx): pg.evaluate("()=>lvStep(1)"); pg.wait_for_timeout(50)
    pg.wait_for_timeout(300)
    ans=pg.evaluate("()=>window.RU_EXAM_ITEMS[611][0].ans")
    pg.evaluate("(v)=>{const b=[...document.querySelectorAll('#lvis .rk .opt, #lvis .ms .seal')].find(x=>x.textContent.trim()===v); if(b)b.click();}", ans)
    pg.wait_for_timeout(140)
    r=pg.evaluate(JS)
    check(f'работа 611: отклик не текст, а компонент ({r["cls"]})', r['fb'], r)
    check('работа 611: есть анимированный знак (печать/волна/оттиск)', r['stamp'], r)
    check('работа 611: анимация отклика реально идёт', r['anims']>0, r['anims'])
    if errs: check('ошибок консоли нет', False, errs[:2])
    else: check('ошибок консоли нет', True)
    b.close()
print('ИТОГ:', sum(ok), '/', len(ok))
sys.exit(0 if all(ok) else 1)
