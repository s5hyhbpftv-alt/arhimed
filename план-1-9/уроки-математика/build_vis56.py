# -*- coding: utf-8 -*-
"""Волна B · визуальные уроки классов 5–6 (ids 377–398). Пишет MVP/data/vis56.js —
window.VIS56 {id: урок mode='steps'} и заменяет текстовые черновики в ARH_LESSONS.
check/tasks берутся из lessons_draft.js; кадры: {t, say, prop}."""
import json as _json, os
HERE=os.path.dirname(os.path.abspath(__file__))
DRAFT=os.path.join(HERE,'..','..','MVP','data','lessons_draft.js')
OUT=os.path.join(HERE,'..','..','MVP','data','vis56.js')

VIS=[
dict(id=377, scene='div39', frames=[
 dict(t='Правило: смотрим на сумму цифр', say='Число делится на 3, если сумма его цифр делится на 3. Число делится на 9, если сумма цифр делится на 9. Запомни этот признак — он главный!', prop='3 → сумма ⋮ 3 · 9 → сумма ⋮ 9'),
 dict(t='Проверяем число 234', say='Складываем цифры: 2 + 3 + 4 = 9. Сумма делится на 9 → значит, и 234 делится на 9 (и на 3).', prop='234: 2+3+4 = 9 ⋮ 9 ✔'),
 dict(t='Число 414', say='4 + 1 + 4 = 9 → делится на 3. Проверка умножением: 414 : 3 = 138.', prop='414: 4+1+4 = 9 → ⋮ 3'),
 dict(t='А теперь 7236', say='7 + 2 + 3 + 6 = 18. 18 делится на 9 → 7236 делится на 9. Делим: 7236 : 9 = 804.', prop='7236: 7+2+3+6 = 18 ⋮ 9 ✔'),
 dict(t='Важное следствие', say='Если число делится на 9, оно делится и на 3 (ведь 9 кратно 3). А наоборот — не всегда: 15 делится на 3, но не на 9.', prop='делится на 9 → делится на 3'),
 dict(t='Проверь себя', say='Делится ли 7236 на 9? Посчитай сумму цифр — и ответь!', prop='7236 ⋮ 9 ?'),
]),
dict(id=378, scene='sieve', frames=[
 dict(t='Простые и составные числа', say='Простое число делится только на 1 и на само себя: 2, 3, 5, 7, 11… Составное число имеет больше двух делителей, например 12.', prop='простые: 2 3 5 7 11…'),
 dict(t='Идея решета Эратосфена', say='Выпишем числа по порядку и будем вычёркивать кратные 2, потом кратные 3, потом 5… То, что останется, — простые числа!', prop='вычёркиваем кратные'),
 dict(t='Шаг 1: кратные 2', say='Вычёркиваем 4, 6, 8, 10, 12… — все чётные числа, кроме самой двойки. Двойка остаётся!', prop='×2'),
 dict(t='Шаг 2: кратные 3', say='Вычёркиваем 9, 15, 21, 27… — кратные трём, кроме самой тройки.', prop='×3'),
 dict(t='Смотрим на таблицу', say='Простых от 1 до 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. А число 1 — не простое и не составное: у него один делитель.', prop='1 — особое число'),
 dict(t='Проверь себя', say='Какое число простое: 9, 15, 17 или 21?', prop='?'),
]),
]

def load_drafts():
    raw=open(DRAFT,encoding='utf-8').read()
    dec=_json.JSONDecoder()
    k=raw.index('concat(')+len('concat(')
    arr,_=dec.raw_decode(raw[k:])
    return {l['id']:l for l in arr}

def build():
    drafts=load_drafts()
    obj={}
    for v in VIS:
        L=drafts[v['id']]
        frames=[]
        for f in v['frames']:
            fr={'t':f['t'],'say':f['say']}
            if f.get('prop'): fr['prop']=f['prop']
            frames.append(fr)
        lesson={
          'id': v['id'], 'title': L['title'], 'ico': L['ico'], 'src': L['src'],
          'subj': L['subj'], 'mode':'steps', 'scene': v['scene'], 'comic': frames,
          'check': L['check'], 'tasks': L['tasks'],
        }
        obj[v['id']]=lesson
    lines=['window.VIS56={};']
    for lid in sorted(obj):
        lines.append('window.VIS56['+str(lid)+']='+_json.dumps(obj[lid],ensure_ascii=False)+';')
    lines.append('(function(){for(var k in window.VIS56){var id=+k;for(var i=0;i<window.ARH_LESSONS.length;i++){if(window.ARH_LESSONS[i].id===id){window.ARH_LESSONS[i]=window.VIS56[id];break;}}}})();')
    open(OUT,'w',encoding='utf-8').write('\n'.join(lines))
    print('визуальных уроков волны B:',len(obj),'->',OUT,'ids:',sorted(obj))

if __name__=='__main__':
    build()
