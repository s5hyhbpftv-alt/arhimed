# -*- coding: utf-8 -*-
"""Волна А · комиксы классов 1–2 (ids 300–342). Пишет MVP/data/comics_12.js —
window.COMICS12 {id: объект-урок} и заменяет текстовые черновики в ARH_LESSONS.
check/tasks берутся из lessons_draft.js (единый источник)."""
import json as _json, os, re

HERE=os.path.dirname(os.path.abspath(__file__))
DRAFT=os.path.join(HERE,'..','..','MVP','data','lessons_draft.js')
OUT=os.path.join(HERE,'..','..','MVP','data','comics_12.js')

# каждая запись: id, scene, frames [{who,say,emo,cap,with,prop}]
COMICS=[
dict(id=300, scene='les', frames=[
 dict(who='arch', emo='smile', cap='Утро в лесу. Белочка Рыжик нашла орехи.',
      say='В лесу у дупла переполох: белочка Рыжик нашла целую горсть орехов, а сосчитать больше десяти не может!',
      with_=['squirrel'], prop=''),
 dict(who='squirrel', emo='sad', cap='Рыжик грустит: как же сосчитать?',
      say='В дупле уже 8 орехов, а в лапках ещё 5! Сколько всего? Я умею считать только до десяти…',
      with_=[], prop=''),
 dict(who='arch', emo='smile', cap='Дополняем 8 до десяти.',
      say='Секрет Архимеда — дополни до десяти! Восьми не хватает двух орешков до десяти. Сколько будет 8 + 2?',
      with_=['squirrel'], prop='8 + 2 = 10'),
 dict(who='squirrel', emo='wow', cap='Пятёрка делится: 5 = 2 + 3.',
      say='Ура! Заберу два орешка у пятёрки: 5 — это 2 и ещё 3!',
      with_=[], prop='5 = 2 + 3'),
 dict(who='arch', emo='think', cap='Считаем: 10 и ещё 3.',
      say='Теперь в дупле ровно 10, а в лапках осталось 3. Сколько всего орехов?',
      with_=['squirrel'], prop='10 + 3 = ?'),
 dict(who='squirrel', emo='laugh', cap='Рыжик доволен: 8 + 5 = 13!',
      say='13! Восемь и пять — это тринадцать! Теперь я умею!',
      with_=['arch'], prop='8 + 5 = 13'),
 dict(who='arch', emo='smile', cap='Проверь себя!',
      say='Молодец! А теперь проверь себя: в дупле 7 орехов, и Рыжик принесёт ещё 6. Сколько станет?',
      with_=['squirrel'], prop='7 + 6 = ?'),
]),
dict(id=301, scene='train', frames=[
 dict(who='arch', emo='smile', cap='Станция «Второй десяток».',
      say='Архимед — машинист поезда, который везёт числа второго десятка. В вагончиках пассажиры от 11 до 20!',
      with_=['kid'], prop=''),
 dict(who='kid', emo='think', cap='Вагон 17. Почему так называется?',
      say='Вагон 17! Но почему он так называется? Сем-на-дцать…',
      with_=[], prop=''),
 dict(who='arch', emo='smile', cap='17 = 10 + 7: один десяток и семь.',
      say='Каждое число от 11 до 20 — это один десяток и ещё единицы. 17 = 10 + 7 — один десяток и семь единиц!',
      with_=['kid'], prop='17 = 10 + 7'),
 dict(who='kid', emo='wow', cap='14 = 10 + 4.',
      say='Ага! 14 = 10 + 4 — один десяток и четыре единицы!',
      with_=[], prop='14 = 10 + 4'),
 dict(who='arch', emo='smile', cap='20 — это два десятка.',
      say='Верно! А 20 — это уже два десятка: 10 + 10. Больше десяти единиц не бывает!',
      with_=['kid'], prop='20 = 10 + 10'),
 dict(who='kid', emo='think', cap='16 = 10 и ещё сколько?',
      say='Теперь понятно! А 16 — это 10 и ещё 6?',
      with_=[], prop='16 = 10 + ?'),
 dict(who='arch', emo='smile', cap='Проверь себя!',
      say='Да! А теперь проверь себя: сколько десятков и единиц в числе 16?',
      with_=['kid'], prop='16 = 10 + ?'),
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
    for c in COMICS:
        L=drafts[c['id']]
        frames=[]
        for f in c['frames']:
            fr={'who':f['who'],'say':f['say'],'emo':f['emo'],'cap':f['cap']}
            if f.get('with_'): fr['with']=f['with_']
            if f.get('prop'): fr['prop']=f['prop']
            frames.append(fr)
        lesson={
          'id': c['id'], 'title': L['title'], 'ico': L['ico'], 'src': L['src'],
          'subj': 'jun', 'scene': c['scene'], 'comic': frames,
          'check': L['check'], 'tasks': L['tasks'],
        }
        obj[c['id']]=lesson
    lines=['window.COMICS12={};']
    for lid in sorted(obj):
        lines.append('window.COMICS12['+str(lid)+']='+_json.dumps(obj[lid],ensure_ascii=False)+';')
    lines.append('(function(){for(var k in window.COMICS12){var id=+k;for(var i=0;i<window.ARH_LESSONS.length;i++){if(window.ARH_LESSONS[i].id===id){window.ARH_LESSONS[i]=window.COMICS12[id];break;}}}})();')
    open(OUT,'w',encoding='utf-8').write('\n'.join(lines))
    print('комиксов:',len(obj),'->',OUT,'ids:',sorted(obj))

if __name__=='__main__':
    build()
