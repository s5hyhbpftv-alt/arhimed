#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Единая проверка русского направления АРХИМЕД.

Что проверяет:
  1) данные уроков 601–614 (vis_ru.js): число кадров, наличие сцены и задания на каждом шаге,
     у проверочных работ — баллы и корректность ключей;
  2) банк задач (tasks_ru.js): уникальность id, остров, класс в теме, правило, три подсказки,
     ответ внутри вариантов, наличие решения и разбора ошибки;
  3) раскладку каждого кадра через qa_layout.py (для уроков с рисованными сценами).

Запуск: PYTHONPATH=.py-libs python3 qa_ru.py
Требует запущенного локального сервера: (cd MVP && python3 -m http.server 8123 &)
"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
LESSONS_MAP = {
    601: 9, 602: 9, 603: 9, 604: 9, 605: 9, 606: 9, 607: 9, 608: 9, 609: 9, 610: 9,
    611: 17, 612: 17, 613: 17, 614: 22, 615: 13, 616: 6, 617: 10, 618: 7,
}
ok, bad = [], []


def check(name, cond, detail=''):
    (ok if cond else bad).append(name)
    print(('  OK   ' if cond else '  ПЛОХО') + ' ' + name + ((' → ' + str(detail)[:150]) if detail else ''))


def node(code):
    """Выполняет JS в node с подключёнными данными урока/задач."""
    src = """
    const noop = () => {};
    const stubEl = { style:{}, innerHTML:'', classList:{add:noop,remove:noop}, appendChild:noop, setAttribute:noop,
                     querySelectorAll:()=>[], querySelector:()=>null, addEventListener:noop, getBoundingClientRect:()=>({width:0,height:0,left:0,top:0,right:0,bottom:0}) };
    global.window = { ARH_LESSONS: [], ARH_TASKS: [], _waveCss: noop, addEventListener: noop, matchMedia: ()=>({matches:false}) };
    global.document = { getElementById: ()=>null, querySelectorAll: ()=>[], querySelector: ()=>null,
                        createElement: ()=>stubEl, addEventListener: noop, body: stubEl, head: stubEl,
                        documentElement: stubEl, cookie:'' };
    global.localStorage = { getItem: ()=>null, setItem: noop, removeItem: noop };
    global.navigator = { userAgent:'node', language:'ru' };
    global.location = { href:'http://localhost/', search:'', pathname:'/' };
    global.requestAnimationFrame = (f)=>setTimeout(f,0);
    require('%s/MVP/data/tasks.js');
    require('%s/MVP/data/lessons.js');
    require('%s/MVP/data/tasks_ru.js');
    require('%s/MVP/data/vis_pw.js');
    require('%s/MVP/data/vis_ru.js');
    try{ require('%s/MVP/data/lessons_fg6.js'); }catch(e){}
    %s
    """ % (ROOT, ROOT, ROOT, ROOT, ROOT, ROOT, code)
    # в vis_ru.js при загрузке стартует сторож кадров (setInterval), из-за него
    # node не завершается сам: выходим явно и всё равно ограничиваем время
    src += "\nprocess.stdout.write('', ()=>{ process.exit(0); });\n"
    p = subprocess.run(['node', '-e', src], capture_output=True, text=True, timeout=180)
    if p.returncode:
        raise RuntimeError(p.stderr[-400:])
    return p.stdout.strip()


print('=== 1. Уроки и работы русского направления ===')
data = json.loads(node("""
  const out=[];
  (window.ARH_LESSONS||[]).filter(L=>L.subj==='rus').sort((a,b)=>a.id-b.id).forEach(L=>{
    out.push({id:L.id, title:L.title, src:L.src, steps:(L.explain||[]).length, tasks:(L.tasks||[]).length,
              check:!!(L.check&&L.check.q), scene:typeof window.WAVE_B[L.id]==='function'});
  });
  console.log(JSON.stringify(out));
"""))
got_ids = [L['id'] for L in data]
check('уроков и работ в направлении ровно 18', len(data) == 18, got_ids)
check('номера уроков 601…618 без пропусков', got_ids == list(range(601, 619)), got_ids)
for L in data:
    exp = LESSONS_MAP.get(L['id'])
    check('урок %d: %d кадров и своя сцена' % (L['id'], exp), L['steps'] == exp and L['scene'],
          'кадров %s, сцена %s' % (L['steps'], L['scene']))
    check('урок %d: есть итоговый вопрос и задачи' % L['id'], L['check'] and L['tasks'] >= 2,
          'вопрос %s, задач %s' % (L['check'], L['tasks']))
    check('урок %d: класс указан в подписи' % L['id'], re.search(r'\d\s*(?:–|-)?\s*\d?\s*класс', L['src'] or '') is not None, L['src'])

print('\n=== 2. Банк задач ===')
ts = json.loads(node("""
  const T=(window.ARH_TASKS||[]).filter(t=>t.island==='Русский язык');
  console.log(JSON.stringify(T));
"""))
check('задач на острове не меньше 70', len(ts) >= 70, len(ts))
ids = set()
for t in ts:
    tid = t.get('id', '?')
    if tid in ids:
        check('задача %s: уникальный id' % tid, False, 'дубль')
    ids.add(tid)
    if not t.get('rule'):
        check('задача %s: есть правило' % tid, False)
    if not isinstance(t.get('hints'), list) or len(t['hints']) < 3:
        check('задача %s: три подсказки' % tid, False)
    if not t.get('sol') or not t.get('trap'):
        check('задача %s: есть решение и разбор ошибки' % tid, False)
    if t.get('type') == 'choice':
        if not isinstance(t.get('answer'), int) or not (0 <= t['answer'] < len(t.get('choices') or [])):
            check('задача %s: ответ внутри вариантов' % tid, False, t.get('answer'))
    elif t.get('type') == 'unit':
        if not isinstance(t.get('answer'), (int, float)):
            check('задача %s: числовой ответ' % tid, False, t.get('answer'))
    else:
        check('задача %s: известный тип' % tid, False, t.get('type'))
    if not re.match(r'^\d{1,2}\s*(?:[-–—]\s*\d{1,2})?\s*(?:класс|кл)', t.get('theme') or ''):
        check('задача %s: класс в теме' % tid, False, t.get('theme'))
check('у всех задач есть правило, подсказки, ответ в границах и класс в теме',
      not [x for x in bad if x.startswith('задача')], 'проблем: %d' % len([x for x in bad if x.startswith('задача')]))

print('\n=== 3. Проверочные работы: баллы и ключи ===')
works = json.loads(node("""
  const src=require('fs').readFileSync('%s/MVP/data/vis_ru.js','utf8');
  const m=[...src.matchAll(/kind:'(radio|multi|text)',\\s*points:(\\d)/g)].map(x=>({kind:x[1],points:+x[2]}));
  console.log(JSON.stringify(m));
""" % ROOT))
check('в работе МЦКО 17 заданий', len(works) == 17, len(works))
total = sum(w['points'] for w in works)
check('сумма баллов работы МЦКО = 24 (как в спецификации)', total == 24, total)
check('есть все три типа заданий МЦКО',
      {w['kind'] for w in works} == {'radio', 'multi', 'text'}, sorted({w['kind'] for w in works}))

print('\n=== 4. Раскладка кадров ===')
try:
    p = subprocess.run([sys.executable, os.path.join(ROOT, 'qa_layout.py')] + [str(i) for i in range(601, 615)],
                       capture_output=True, text=True, cwd=ROOT,
                       env=dict(os.environ, PYTHONPATH=os.path.join(ROOT, '.py-libs')))
    out = p.stdout
    probs = [l for l in out.splitlines() if 'проблемных шагов' in l]
    check('гейт раскладки прогнан по всем 14 урокам', len(probs) == 28, len(probs))
    bads = [l for l in probs if not re.search(r'проблемных шагов 0', l)]
    check('во всех кадрах нет наложений, обрезания и пустых сцен', not bads, bads[:2])
except Exception as e:
    check('раскладка проверена', False, str(e)[:120])


print('\n=== 5. Чек-лист совета: ключи тренажёров и позиции ответов ===')
train = json.loads(node("""
  const bad=[];
  const src=require('fs').readFileSync('%s/MVP/data/vis_ru.js','utf8');
  /* в тренажёрах ключ должен лежать во втором поле, а не в третьем */
  const games=[...src.matchAll(/window\.ru(\d+)Game=function\(k\)\{[\s\S]{0,400}?st\.gRes=\(it\[(\d)\]/g)];
  games.forEach(m=>{ if(m[2]!=='1') bad.push({lesson:+m[1], field:+m[2]}); });
  const games2=[...src.matchAll(/window\.ru(\d+)Game=function\(k\)\{[\s\S]{0,400}?st\.gRes=\((\w+)\)/g)];
  console.log(JSON.stringify(bad));
""" % ROOT))
check('в тренажёрах верный ответ сравнивается с ключом (не с подсказкой)', not train, train)

dist = json.loads(node("""
  const T=(window.ARH_TASKS||[]).filter(t=>t.island===\'Русский язык\'&&t.type===\'choice\');
  const pos={}; T.forEach(t=>pos[t.answer]=(pos[t.answer]||0)+1);
  console.log(JSON.stringify({pos:pos, total:T.length}));
"""))
mx = max(dist['pos'].values()) if dist['pos'] else 0
check('позиция верного ответа распределена (≤50 % на одну позицию)',
      dist['total'] and mx / dist['total'] <= 0.5, dist)

mangled = json.loads(node("""
  const bad=[];
  (window.ARH_TASKS||[]).filter(t=>t.island===\'Русский язык\').forEach(t=>{
    (t.choices||[]).forEach(c=>{
      if(c == null || c.trim().length < 1) bad.push(t.id+': пустой вариант');
      if((c.match(/[а-яa-z]{4,}\s+[а-яa-z]{4,}/gi)||[]).length>1 && /оба|вариант/i.test(c)) bad.push(t.id+': склейка вариантов');
    });
  });
  console.log(JSON.stringify(bad.slice(0,5)));
"""))
check('в вариантах нет пустых кнопок и склеек', not mangled, mangled)


print('\n=== 6. Машинные проверки предметных инвариантов (новая команда) ===')
p1 = subprocess.run(['node', 'qa_ru_items.js'], cwd=ROOT, capture_output=True, text=True)
check('инварианты всех заданий работ и тренажёров', p1.returncode == 0,
      (p1.stdout or p1.stderr).strip().splitlines()[-1] if (p1.stdout or p1.stderr) else 'нет вывода')
p2 = subprocess.run([sys.executable, 'qa_ru_trainers.py'], cwd=ROOT,
                    env=dict(os.environ, PYTHONPATH=os.path.join(ROOT, '.py-libs')),
                    capture_output=True, text=True)
check('каждый пункт тренажёров 601–610 решаем через интерфейс', p2.returncode == 0,
      (p2.stdout or '').strip().splitlines()[-1] if p2.stdout else 'нет вывода')

print('\n================ ИТОГ ================')
print('проверок: %d, успешно: %d, проблем: %d' % (len(ok) + len(bad), len(ok), len(bad)))
for x in bad[:12]:
    print(' - ' + x)
