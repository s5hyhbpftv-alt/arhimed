/* Машинная проверка предметных инвариантов заданий русского направления.
   Падает, если данных нет, — «проверить нечего» не считается успехом.
   Запуск: node qa_ru_items.js (из корня проекта) */
const noop = () => {};
const el = { style:{}, innerHTML:'', querySelectorAll:()=>[], addEventListener:noop, getBoundingClientRect:()=>({}) };
global.window = { ARH_LESSONS:[], ARH_TASKS:[], _waveCss:noop, addEventListener:noop };
global.document = { getElementById:()=>null, querySelectorAll:()=>[], createElement:()=>el, addEventListener:noop, body:el, head:el };
global.localStorage = { getItem:()=>null, setItem:noop };
global.navigator = { userAgent:'node' };
global.location = { href:'/' };

require('./MVP/data/lessons.js');
require('./MVP/data/vis_pw.js');
require('./MVP/data/vis_ru.js');

const works = Object.assign({}, window.RU_EXAM_ITEMS || {});
Object.keys(window.RU_MCKO || {}).forEach(id => { if(window.RU_MCKO[id].items) works[id] = window.RU_MCKO[id].items; });

const NEED = { 611:12, 612:12, 613:12, 614:17 };
const problems = [];
let checked = 0;
const names = { 1:'первом', 2:'втором', 3:'третьем' };
const VOWELS = /[аеёиоуыэюя]/i;

Object.keys(NEED).forEach(id => {
  const got = (works[id] || []).length;
  if(got !== NEED[id]) problems.push(`работа ${id}: заданий ${got}, ожидалось ${NEED[id]}`);
});

Object.keys(works).forEach(id => {
  works[id].forEach((it, i) => {
    const n = i + 1;
    checked++;
    const opts = it.opts || [];
    if(it.word && it.word.indexOf('_') >= 0){
      if(!it.spell){ problems.push(`работа ${id} задание ${n}: не указано правильное написание`); return; }
      const full = String(it.word).replace('_', it.ans);
      if(full.toLowerCase() !== String(it.spell).toLowerCase())
        problems.push(`работа ${id} задание ${n}: «${it.word}» + «${it.ans}» = «${full}», а верно «${it.spell}»`);
      if(opts.length && opts.indexOf(it.ans) < 0)
        problems.push(`работа ${id} задание ${n}: буквы «${it.ans}» нет среди кнопок ${JSON.stringify(opts)}`);
      opts.forEach(o => {
        if(o !== it.ans && String(it.word).replace('_', o).toLowerCase() === String(it.spell).toLowerCase())
          problems.push(`работа ${id} задание ${n}: вариант «${o}» тоже даёт верное слово`);
      });
      const m = /в (первом|втором|третьем) слоге/.exec(it.ask || '');
      if(m){
        const idx = String(it.word).indexOf('_');
        const syll = String(it.word).slice(0, idx).split(VOWELS).length;
        if(names[syll] && names[syll] !== m[1])
          problems.push(`работа ${id} задание ${n}: пропуск в ${names[syll]} слоге, а в задании написано «${m[1]}»`);
      }
    }
    if(it.kind === 'multi' && (!Array.isArray(it.correct) || !it.correct.length))
      problems.push(`работа ${id} задание ${n}: не указаны верные варианты`);
    if(it.kind === 'multi' && Array.isArray(it.correct) && opts.length && it.correct.some(k => k >= opts.length))
      problems.push(`работа ${id} задание ${n}: верный вариант вне списка`);
    if(it.kind === 'radio' && typeof it.correct !== 'number')
      problems.push(`работа ${id} задание ${n}: не указан верный вариант`);
    if(it.kind === 'radio' && opts.length && (it.correct < 0 || it.correct >= opts.length))
      problems.push(`работа ${id} задание ${n}: верный вариант вне списка`);
    if(it.kind === 'text' && (!Array.isArray(it.accept) || !it.accept.length))
      problems.push(`работа ${id} задание ${n}: нет допустимых ответов`);
  });
});

/* Тренажёры уроков проверяются прогоном интерфейса: qa_ru_trainers.py
   (разбор кнопок по тексту файла давал ложные срабатывания — убрано). */

const EXPECTED_ITEMS = 53;   /* 12 + 12 + 12 + 17 */
if(checked !== EXPECTED_ITEMS) problems.push(`проверено ${checked} заданий вместо ${EXPECTED_ITEMS} — данные загрузились не полностью`);

console.log('проверено заданий:', checked);
if(problems.length){
  console.log('НАЙДЕНО ПРОБЛЕМ: ' + problems.length);
  problems.forEach(p => console.log(' - ' + p));
  process.exit(1);
}
console.log('нарушений не найдено');
/* Данные русского направления заводят сторож кадров (setInterval 90 мс в
   RU601MOTION). В браузере это нужно, а в node процесс из-за него не завершается:
   инструмент просто висел без вывода. Поэтому выходим явно — и только после
   того, как вывод дописан (иначе длинный JSON обрезается). */
process.stdout.write('', ()=>{ process.exit(0); });
