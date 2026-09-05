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
dict(id=302, scene='workshop', frames=[
 dict(who='arch', emo='smile', cap='Мастерская Архимеда: коробочка с буквой x.',
      say='В мастерской собирают чудо-механизм. Детальки кладут в коробочки, а на одной коробочке вместо числа нарисована буква x — это окошко!',
      with_=['kid'], prop=''),
 dict(who='kid', emo='think', cap='Что значит «x + 3»?',
      say='Коробочка x + 3? Как понять, сколько деталек нужно положить?',
      with_=[], prop='x + 3'),
 dict(who='arch', emo='smile', cap='Буква — это окошко для числа.',
      say='Буква — это окошко: положи в него любое число. Если x = 5, то x + 3 = 5 + 3 = 8!',
      with_=['kid'], prop='x = 5 → 5 + 3 = 8'),
 dict(who='kid', emo='wow', cap='Одно выражение — много ответов!',
      say='А если положить x = 7? Тогда x + 3 = 10! Одно выражение — много разных ответов!',
      with_=[], prop='x = 7 → 7 + 3 = 10'),
 dict(who='arch', emo='smile', cap='Подставляем число вместо буквы.',
      say='Именно! Подставляем число вместо буквы и считаем. А теперь проверь себя: найди a + 2, если a = 6.',
      with_=['kid'], prop='a = 6 → a + 2 = ?'),
]),
dict(id=303, scene='kitchen', frames=[
 dict(who='granny', emo='think', cap='Кухня: кексы с начинками.',
      say='Бабушка испекла кексы к празднику: часть с изюмом, часть с шоколадом. Всего 8 кексов, с изюмом — 3. Сколько с шоколадом?',
      with_=['arch'], prop='x + 3 = 8'),
 dict(who='arch', emo='smile', cap='Целое — это части вместе.',
      say='Правило Архимеда: целое — это части, взятые вместе. Ищем часть: из целого вычитаем известную часть! x = 8 − 3 = 5.',
      with_=['granny'], prop='x = 8 − 3 = 5'),
 dict(who='granny', emo='smile', cap='Проверка: 5 + 3 = 8 ✔',
      say='Проверим: 5 кексов с шоколадом и 3 с изюмом — всего 5 + 3 = 8. Сошлось!',
      with_=[], prop='5 + 3 = 8 ✔'),
 dict(who='arch', emo='think', cap='Теперь ищем съеденную часть.',
      say='Задача посложнее: на тарелке было 8 кексов, несколько съели, осталось 3. Сколько кексов съели?',
      with_=['kid'], prop='8 − x = 3'),
 dict(who='kid', emo='wow', cap='Съеденные кексы — тоже часть!',
      say='Съеденные кексы — это тоже часть! x = 8 − 3 = 5. Съели 5 кексов!',
      with_=[], prop='x = 5'),
 dict(who='granny', emo='smile', cap='Проверь себя!',
      say='А теперь проверь себя: на тарелке было 9 кексов, несколько съели, осталось 4. Сколько съели?',
      with_=['kid'], prop='9 − x = ?'),
]),
dict(id=304, scene='beach', frames=[
 dict(who='arch', emo='smile', cap='Пляж: лаборатория мер.',
      say='На пляже Архимед устроил лабораторию мер. Пятачок собирает ракушки, а мы будем всё измерять!',
      with_=['pig'], prop=''),
 dict(who='pig', emo='think', cap='9 см или 1 дм — что длиннее?',
      say='У меня ракушка длиной 9 сантиметров, а у Архимеда палочка в 1 дециметр. Что же длиннее?',
      with_=[], prop='9 см или 1 дм?'),
 dict(who='arch', emo='smile', cap='1 дм = 10 см.',
      say='В дециметре 10 сантиметров: 1 дм = 10 см. Значит, палочка длиннее ракушки!',
      with_=['pig'], prop='1 дм = 10 см'),
 dict(who='pig', emo='wow', cap='Литрами меряют жидкость.',
      say='А в моё ведёрко влезает ровно 1 литр воды! Литрами меряют жидкость.',
      with_=[], prop='💧 1 литр'),
 dict(who='arch', emo='think', cap='Масса — в килограммах.',
      say='А мешок с песком весит 3 килограмма — это масса. Что тяжелее: 1 кг песка или 500 граммов?',
      with_=['pig'], prop='1 кг или 500 г?'),
 dict(who='pig', emo='smile', cap='1 кг = 1000 г.',
      say='1 килограмм — это 1000 граммов! Значит, 1 кг песка тяжелее, чем 500 граммов.',
      with_=[], prop='1 кг = 1000 г'),
 dict(who='arch', emo='smile', cap='Проверь себя!',
      say='Молодец! Проверь себя: сколько сантиметров в одном дециметре?',
      with_=['pig'], prop='1 дм = ? см'),
]),
dict(id=305, scene='cosmos', frames=[
 dict(who='arch', emo='smile', cap='Звёздное небо: линии.',
      say='В космосе Архимед показывает дороги звёздного неба: прямые, отрезки и ломаные линии!',
      with_=['kid'], prop=''),
 dict(who='kid', emo='think', cap='Прямая бесконечна.',
      say='Прямая — это линия без начала и конца? Её можно вести и вести бесконечно!',
      with_=[], prop='——— прямая'),
 dict(who='arch', emo='smile', cap='Луч между звёздами — отрезок.',
      say='Верно! А если между двумя звёздами натянуть лазерный луч — получится отрезок: у него есть начало и конец.',
      with_=['kid'], prop='●——● отрезок'),
 dict(who='kid', emo='wow', cap='Путь ракеты — ломаная.',
      say='А путь ракеты: звезда → планета → Луна — это ломаная линия из трёх отрезков!',
      with_=[], prop='ломаная из 3 отрезков'),
 dict(who='arch', emo='smile', cap='Проверь себя!',
      say='Молодец! Проверь себя: какая линия не имеет ни начала, ни конца?',
      with_=['kid'], prop='?'),
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
