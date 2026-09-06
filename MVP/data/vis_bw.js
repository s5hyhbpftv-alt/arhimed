/* Волна B v2: уроки 377–398 в формате «объясни → реши + живой виджет» (как visL13/21).
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_B[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_B = window.WAVE_B || {};

/* ================= УРОК 377 · Признаки делимости на 3 и на 9 ================= */
(function(){
  const L377 = {
    id: 377, title: 'Признаки делимости на 3 и на 9', ico: '➗',
    src: 'Математика · 5–6 класс · Признаки делимости', subj: 'math',
    explain: [
      'Начнём с истории. Пекарь Архимед испёк 12 крендельков и хочет разложить их поровну в коробки по 3 штуки. Получится ровно 4 коробки — ничего не останется. Говорят: 12 делится на 3. А если крендельков 14 — три коробки по 3, и 2 кренделька лишние. 14 на 3 не делится.',
      'Делить каждый раз долго. Математики нашли короткий путь — признаки делимости. Признак делимости на 3: сложи все цифры числа. Если сумма цифр делится на 3, то и само число делится на 3. Проверим: у числа 123 сумма цифр 1+2+3 = 6, а 6 делится на 3. Значит, и 123 делится на 3!',
      'Разберём по шагам, как применять признак. Берём число 234. Шаг 1: складываем цифры — 2 + 3 + 4 = 9. Шаг 2: проверяем сумму 9 — она делится на 3 (9 : 3 = 3). Шаг 3: делаем вывод — число 234 делится на 3. Проверим делением: 234 : 3 = 78. Всё сошлось!',
      'А теперь признак делимости на 9. Он похож на признак для 3: сложи цифры числа. Если сумма цифр делится на 9, то и само число делится на 9. У числа 234 сумма цифр 2+3+4 = 9, а 9 делится на 9. Значит, 234 делится и на 9! Проверим: 234 : 9 = 26.',
      'Посмотрим на число 7236. Складываем цифры: 7 + 2 + 3 + 6 = 18. Сумма 18 делится на 9 (18 : 9 = 2), значит, и 7236 делится на 9. Проверим делением: 7236 : 9 = 804. А ещё 18 делится и на 3 — значит, 7236 делится и на 3.',
      'Заметь закономерность: если число делится на 9, то оно обязательно делится и на 3. Почему? Потому что 9 = 3 · 3 — в девятке спрятана тройка. Если крендельки разложились по коробкам по 9, их всегда можно переложить в коробки по 3!',
      'А вот наоборот — не всегда. Например, 15 делится на 3 (15 : 3 = 5), но на 9 не делится: 15 : 9 = 1 и остаток 6. Запомни: делимость на 9 — это более «сильное» условие, чем делимость на 3.',
      'Почему признак вообще работает? Секрет в числах 10, 100, 1000. Ведь 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1. Возьмём число 234: это 2 сотни + 3 десятка + 4 единицы. Части 99, 9 всегда делятся на 9, и остаётся только сумма цифр 2 + 3 + 4. Вот и весь секрет!',
      'Потренируемся: делится ли 258 на 3? Сумма цифр 2 + 5 + 8 = 15, а 15 делится на 3 → да! А на 9? Сумма 15 на 9 не делится → нет. Один и тот же подсчёт цифр ответил сразу на оба вопроса. Теперь ты готов к проверке!'
    ],
    check: { q: 'Делится ли 7236 на 9?', choices: ['да', 'нет'], ans: 0,
      exp: '7 + 2 + 3 + 6 = 18, а 18 делится на 9 → да.' },
    tasks: [
      { q: 'Чему равна сумма цифр числа 258? (проверь делимость на 3)', kind: 'unit', ans: 15, tol: 0,
        hints: ['2 + 5 + 8.', '15 — делится на 3, значит 258 делится на 3.'], sol: '15' },
      { q: 'Какое число делится и на 3, и на 9?', kind: 'choice', choices: ['333', '99', '55', '26'], ans: 1, tol: 0,
        hints: ['Считаем сумму цифр.', '99 → 9 + 9 = 18, делится на 9 (и на 3).'], sol: '99' }
    ]
  };

  function visB377(el){
    const step = LV.step || 0;
    const digits = (num, big) => {
      const cols = { 2:'#7fd1ff', 3:'#8fd1a8', 4:'#ffd76a', 5:'#e8a0d8', 6:'#ffb0a0',
                     7:'#ffd76a', 8:'#8fd1a8', 1:'#7fd1ff', 9:'#ffd76a', 0:'#8fa7c8' };
      return String(num).split('').map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.1}s;display:inline-flex;align-items:center;justify-content:center;width:${big?52:44}px;height:${big?58:50}px;border-radius:12px;background:rgba(255,255,255,.05);border:2px solid ${cols[d]};font-size:${big?30:25}px;color:${cols[d]};font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
    };
    const sumRow = (parts, total, okColor) => `<div class="wv-row" style="gap:6px;margin:8px 0">
      ${parts.map((p,i)=>`<span class="wv-pop" style="animation-delay:${(i+0.2)*0.15}s;display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;border-radius:50%;background:rgba(217,164,65,.14);border:1.5px solid rgba(217,164,65,.6);font-size:20px;color:#ffd76a;font-weight:bold">${p}</span>`).join('<span style="color:#8fa08f;font-size:20px">+</span>')}
      <span style="color:#8fa08f;font-size:22px">=</span>
      <span class="wv-ans" style="display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:44px;border-radius:50%;background:${okColor||'#d9a441'};font-size:22px;color:#0d1a13;font-weight:bold">${total}</span>
    </div>`;
    let h = '';
    if (step === 0){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Пекарня Архимеда</div>
        <div style="font-size:52px" class="wv-swing">🥨</div>
        <div class="wv-big">12 крендельков по 3 — ровно 4 коробки!</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:330px">
          ${Array.from({length:12},(_,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.06).toFixed(2)}s;font-size:22px">🥨</span>`).join('')}
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-top:4px">
          ${Array.from({length:4},(_,i)=>`<div class="wv-pop2" style="border:1.5px dashed #3d7a55;border-radius:10px;padding:3px 10px;font-size:13px;color:#8fd1a8">коробка ${i+1}: 3 шт</div>`).join('')}
        </div>
        <div class="wv-sml">12 ⋮ 3 — делится! Ничего не осталось. А 14 : 3 = 4 и остаток 2 — не делится.</div>
      </div>`;
    } else if (step === 1){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Правило</div>
        <div class="wv-big">Признак делимости на 3</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8">число делится на <b style="color:#7fd1a0">3</b>, если сумма его цифр делится на <b style="color:#7fd1a0">3</b></div>
        </div>
        <div class="wv-row" style="gap:4px">${digits(123)}</div>
        ${sumRow([1,2,3], 6, '#4c8a5a')}
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8;font-weight:bold">6 ⋮ 3 → значит, 123 ⋮ 3 ✔</div>
        <div class="wv-sml">не делим само число — только складываем цифры!</div>
      </div>`;
    } else if (step === 2){
      h = `<div class="wv-col">
        <div class="wv-big">Шаги признака: число 234</div>
        <div class="wv-row" style="gap:4px">${digits(234)}</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;margin-top:4px">
          ${[
            ['1️⃣ Складываем цифры', '2 + 3 + 4 = 9', '#7fd1ff'],
            ['2️⃣ Сумма 9 делится на 3?', '9 : 3 = 3 — да!', '#8fd1a8'],
            ['3️⃣ Вывод', '234 делится на 3', '#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.2}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span style="font-size:16px">${x[0]}</span><b style="color:${x[2]};margin-left:auto;white-space:nowrap">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">проверка: 234 : 3 = 78 ✔</div>
      </div>`;
    } else if (step === 3){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Правило</div>
        <div class="wv-big">Признак делимости на 9</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8">число делится на <b style="color:#ffd76a">9</b>, если сумма его цифр делится на <b style="color:#ffd76a">9</b></div>
        </div>
        <div class="wv-row" style="gap:4px">${digits(234)}</div>
        ${sumRow([2,3,4], 9, '#d9a441')}
        <div class="wv-ans" style="font-size:17px;color:#ffd76a;font-weight:bold">9 ⋮ 9 → значит, 234 ⋮ 9 ✔</div>
        <div class="wv-sml">234 : 9 = 26 — деление без остатка</div>
      </div>`;
    } else if (step === 4){
      h = `<div class="wv-col">
        <div class="wv-big">Число 7236 — пробуем признак</div>
        <div class="wv-row" style="gap:4px">${digits(7236)}</div>
        ${sumRow([7,2,3,6], 18, '#d9a441')}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['18 делится на 9?', '18 : 9 = 2 — да → 7236 ⋮ 9', '#ffd76a'],
            ['18 делится и на 3?', '18 : 3 = 6 — да → 7236 ⋮ 3', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.25}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[1].indexOf('да')>=0?'#4c8a5a':'#b0635a'};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8">${x[0]} → <b style="color:${x[1].indexOf('да')>=0?'#8fd1a8':'#ff9a8a'}">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">7236 : 9 = 804 ✔</div>
      </div>`;
    } else if (step === 5){
      h = `<div class="wv-col">
        <div class="wv-big">Делится на 9 → делится и на 3</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;margin:6px 0">
          <div style="background:rgba(255,215,106,.16);border:2px solid #ffd76a;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">9</div>
          <span style="font-size:26px;color:#8fa08f">=</span>
          <div style="background:rgba(127,209,160,.14);border:2px solid #8fd1a8;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">3</div>
          <span style="font-size:22px;color:#8fa08f">·</span>
          <div style="background:rgba(127,209,160,.14);border:2px solid #8fd1a8;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">3</div>
        </div>
        <div class="wv-sml" style="max-width:320px">в девятке «спрятана» тройка: 9 = 3 · 3. Разложил по 9 — легко переложить по 3!</div>
      </div>`;
    } else if (step === 6){
      h = `<div class="wv-col">
        <div class="wv-big">А наоборот — не всегда!</div>
        <div class="wv-row" style="gap:8px;margin:6px 0">
          <div style="text-align:center;background:rgba(127,209,160,.1);border:2px solid #4c8a5a;border-radius:14px;padding:10px 14px;min-width:110px">
            <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">15</div>
            <div style="font-size:13px;color:#8fd1a8">15 : 3 = 5 ✔ делится</div>
          </div>
          <div style="text-align:center;background:rgba(232,106,90,.1);border:2px solid #b0635a;border-radius:14px;padding:10px 14px;min-width:110px">
            <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">15</div>
            <div style="font-size:13px;color:#ff9a8a">15 : 9 = 1 (ост. 6) ✘ нет</div>
          </div>
        </div>
        <div class="wv-sml">сумма цифр 15 делится на 3, но не на 9 → и число так же!</div>
      </div>`;
    } else if (step === 7){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Секрет признака</div>
        <div class="wv-big">Почему сумма цифр решает?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['10 = 9 + 1', 'десяток = девятка + единица'],
            ['100 = 99 + 1', 'сотня = 99 + единица'],
            ['1000 = 999 + 1', 'тысяча = 999 + единица']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.18}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;text-align:left"><b style="color:#7fd1ff;min-width:96px;font-size:14px">${x[0]}</b><span style="font-size:12.5px;color:#9ec0a8">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.07);border:1px dashed #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">234 = 2·100 + 3·10 + 4 = 2·(99+1) + 3·(9+1) + 4. Кусочки с 99 и 9 делятся на 9 — <b style="color:#ffd76a">остаётся 2+3+4!</b></div>
        <div class="wv-sml">вот откуда берётся «сумма цифр» — она и есть остаток!</div>
      </div>`;
    } else {
      h = `<div class="wv-col">
        <div class="wv-big">Проверяем 258</div>
        <div class="wv-row" style="gap:4px">${digits(258)}</div>
        ${sumRow([2,5,8], 15, '#d9a441')}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['15 делится на 3?', 'да → 258 ⋮ 3', '#8fd1a8', true],
            ['15 делится на 9?', 'нет → 258 не ⋮ 9', '#ff9a8a', false]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.2}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[3]?'#4c8a5a':'#b0635a'};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8">${x[0]} → <b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">один подсчёт цифр ответил на оба вопроса!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[377] = visB377;

  // замена записи урока в ARH_LESSONS
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===377){ window.ARH_LESSONS[i]=L377; break; } } })();
})();
/* ================= УРОК 378 · Простые и составные: решето ================= */
(function(){
  const L378 = {
    id: 378, title: 'Простые и составные числа: решето', ico: '🔢',
    src: 'Математика · 5–6 класс · Простые числа', subj: 'math',
    explain: [
      'Познакомься с важными «кирпичиками» математики — простыми числами. Простое число делится только на 1 и на само себя: 2, 3, 5, 7, 11, 13… Их нельзя разбить на меньшие множители. А составное число, например 12, делится на много чисел: 1, 2, 3, 4, 6, 12. Оно «собрано» из простых: 12 = 2 · 2 · 3!',
      'Проверим делители. У числа 2 делители: 1 и 2 — больше нет! Значит, 2 — простое. У числа 6 делители: 1, 2, 3, 6 — четыре штуки. Раз делителей больше двух, 6 — составное. Так и различаем: два делителя = простое, больше двух = составное.',
      'А что с числом 1? У него только один делитель — оно само. Поэтому единицу НЕ считают ни простым, ни составным. Это особое число — начало отсчёта. Запомни: простые числа начинаются с двойки!',
      'Как найти все простые числа, например до 30? Древнегреческий учёный Эратосфен придумал гениальный способ — «решето». Выписываем числа подряд и «просеиваем»: вычёркиваем всё, что делится на 2, потом на 3, потом на 5… Что останется — то и простые!',
      'Первый проход: вычёркиваем все числа, делящиеся на 2, — 4, 6, 8, 10… Только сама двойка остаётся: она простое число, вычёркивать её нельзя. После этого шага в таблице остались только нечётные числа (и сама двойка).',
      'Второй проход: вычёркиваем числа, делящиеся на 3, — 9, 15, 21, 27… Сама тройка остаётся. Заметь: 6 и 12 мы вычеркнули ещё на первом проходе как чётные. Решето работает по слоям — каждый следующий проход убирает новые числа.',
      'Третий проход: вычёркиваем числа, делящиеся на 5. Из оставшихся до 30 это только 25. Дальше можно не проверять: у любого составного числа до 30 есть множитель не больше 5 (ведь 7·7 = 49 уже больше 30).',
      'Вот они, простые числа от 1 до 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — ровно десять «золотых» самородков! Все остальные числа до 30 — составные: их можно разложить на простые множители.',
      'Теперь ты умеешь отличать простые числа от составных! Проверь себя: какое из чисел простое — 9, 15, 17 или 21? Вспомни: простое число делится только на 1 и на само себя.'
    ],
    check: { q: 'Какое число простое?', choices: ['9', '15', '17', '21'], ans: 2,
      exp: '17 делится только на 1 и 17.' },
    tasks: [
      { q: 'Сколько простых чисел от 1 до 10?', kind: 'unit', ans: 4, tol: 0,
        hints: ['Выпиши: 2, 3, 5, 7.', 'Их четыре.'], sol: '4' },
      { q: 'Является ли 1 простым числом?', kind: 'choice', choices: ['нет', 'да', 'зависит от задачи', 'иногда'], ans: 0, tol: 0,
        hints: ['У 1 только один делитель.', '1 не простое и не составное.'], sol: 'нет' }
    ]
  };

  function sieveCell(n, mode, delay){
    // mode: 'p' простое(золото) | 'c' вычеркнуто | 'n' обычное | 'one' единица
    const styles = {
      p:'background:rgba(217,164,65,.3);border:2px solid #d9a441;color:#ffd76a;font-weight:bold',
      c:'background:rgba(232,106,90,.14);border:2px solid rgba(232,106,90,.5);color:#8f5a50;text-decoration:line-through',
      n:'background:rgba(255,255,255,.05);border:2px solid #3d5c49;color:#cfe0cf',
      one:'background:rgba(255,255,255,.05);border:2px solid #3d5c49;color:#8fa08f'
    };
    return `<span class="wv-pop" style="animation-delay:${delay}s;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:9px;font-size:16px;font-family:Georgia,serif;${styles[mode]}">${n}</span>`;
  }
  function sieveGrid(state){
    // state: {cut2, cut3, cut5, final}
    let cells = '';
    const P = new Set([2,3,5,7,11,13,17,19,23,29]);
    for(let n=1;n<=30;n++){
      const mode = state.final ? (P.has(n)?'p':'c') : n===1 ? 'one' :
        (state.cut5 && (n%5===0 && n!==5)) ? 'c' :
        (state.cut3 && (n%3===0 && n!==3)) ? 'c' :
        (state.cut2 && (n%2===0 && n!==2)) ? 'c' : (P.has(n)?'p':'n');
      cells += sieveCell(n, mode, (n*0.012).toFixed(3));
    }
    return `<div style="display:grid;grid-template-columns:repeat(6,40px);gap:4px;justify-content:center;background:#101f18;padding:10px;border-radius:12px">${cells}</div>`;
  }
  function visB378(el){
    const step = LV.step || 0;
    const chip=(t,c)=>`<span style="display:inline-block;padding:3px 11px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:14px;color:#d8ecff;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Кирпичики чисел</div>
        <div class="wv-row" style="gap:10px;margin:4px 0">
          <div style="text-align:center;background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:14px;padding:8px 12px">
            <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">2</div>
            <div style="font-size:12px;color:#e8dcc8;margin-top:2px">делители: 1 и 2</div>
            <div style="font-size:12px;color:#8fd1a8;font-weight:bold">простое!</div>
          </div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:14px;padding:8px 12px">
            <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">12</div>
            <div style="font-size:12px;color:#e8dcc8;margin-top:2px">делители: 1,2,3,4,6,12</div>
            <div style="font-size:12px;color:#ff9a8a;font-weight:bold">составное</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">12 = 2·2·3 — составное собрано из <b style="color:#ffd76a">простых кирпичиков!</b></div>
        <div class="wv-sml">простые: 2, 3, 5, 7, 11, 13… · составные: 12, 15, 21…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем делители</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['6', '1, 2, 3, 6', '4 делителя — составное', '#ff9a8a'],
            ['7', '1, 7', '2 делителя — простое!', '#8fd1a8'],
            ['11', '1, 11', '2 делителя — простое!', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${x[3]};border-radius:10px;padding:7px 12px;text-align:left">
            <b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif;min-width:34px">${x[0]}</b>
            <span style="font-size:13px;color:#cfe0cf">делители: ${x[1]}</span>
            <b style="margin-left:auto;font-size:13px;color:${x[3]}">${x[2]}</b>
          </div>`).join('')}
        </div>
        <div class="wv-sml">делителей два → простое · больше двух → составное</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Особое число 1</div>
        <div style="display:flex;align-items:center;gap:12px;margin:4px 0">
          <div style="font-size:64px" class="wv-glow">1️⃣</div>
          <div style="text-align:left;max-width:230px;font-size:14px;color:#e8dcc8;line-height:1.5">у единицы всего <b style="color:#ffd76a">один</b> делитель — она сама</div>
        </div>
        <div style="background:rgba(232,106,90,.08);border:2px solid rgba(232,106,90,.4);border-radius:12px;padding:8px 14px;max-width:320px;font-size:14.5px;color:#ffcfc2">1 — <b>не простое и не составное</b></div>
        <div class="wv-sml">простые числа начинаются с двойки!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Решето Эратосфена</div>
        <div style="font-size:40px" class="wv-swing">⏳</div>
        <div class="wv-sml" style="max-width:320px">выписываем числа 1–30 и будем «просеивать»: вычёркивать всё, что делится на 2, потом на 3, потом на 5…</div>
        ${sieveGrid({cut2:false,cut3:false,cut5:false})}
        <div class="wv-sml">что останется — простые «самородки»!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 1: вычёркиваем чётные</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('делятся на 2','rgba(232,106,90,.6)')}${chip('кроме самой 2','#d9a441')}</div>
        ${sieveGrid({cut2:true,cut3:false,cut5:false})}
        <div class="wv-ans" style="font-size:15px;color:#8fd1a8">остались двойка и нечётные числа</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 2: вычёркиваем кратные 3</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('9, 15, 21, 27…','rgba(232,106,90,.6)')}${chip('тройка остаётся','#d9a441')}</div>
        ${sieveGrid({cut2:true,cut3:true,cut5:false})}
        <div class="wv-sml">6 и 12 вычеркнули раньше (чётные) — решето работает по слоям!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 3: кратные 5 — и стоп!</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('осталось только 25','rgba(232,106,90,.6)')}</div>
        ${sieveGrid({cut2:true,cut3:true,cut5:true})}
        <div style="background:rgba(127,209,160,.08);border:1px solid #4c8a5a;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13px;color:#b8e0c4">дальше можно не проверять: у составного числа до 30 есть множитель ≤ 5</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Золотые самородки: простые до 30</div>
        ${sieveGrid({final:true})}
        <div class="wv-ans" style="font-size:15px;color:#ffd76a;font-weight:bold">2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — ровно 10</div>
        <div class="wv-sml">все остальные числа до 30 — составные</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Какое число простое?</div>
        <div class="wv-row" style="gap:8px;margin:6px 0">
          ${['9','15','17','21'].map((n,i)=>{ const prime=n==='17';
            return `<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center;background:${prime?'rgba(217,164,65,.12)':'rgba(255,255,255,.03)'};border:2px solid ${prime?'#d9a441':'#3d5c49'};border-radius:14px;padding:10px 14px;min-width:64px"><div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">${n}</div><div style="font-size:11px;color:${prime?'#8fd1a8':'#8fa08f'};margin-top:2px">${prime?'простое!':'делится ещё'}</div></div>`; }).join('')}
        </div>
        <div class="wv-sml">17 делится только на 1 и на 17!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[378] = visB378;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===378){ window.ARH_LESSONS[i]=L378; break; } } })();
})();
/* ================= УРОК 379 · НОД: алгоритм Евклида ================= */
(function(){
  const L379 = {
    id: 379, title: 'НОД: алгоритм Евклида', ico: '🔗',
    src: 'Математика · 5–6 класс · НОД', subj: 'math',
    explain: [
      'Представь: Архимед хочет выложить прямоугольную мозаику 48 на 30 одинаковыми квадратами, да так, чтобы квадраты были как можно крупнее. Нужно найти самое большое число, на которое делятся и 48, и 30. Это число называется НОД — наибольший общий делитель.',
      'Сначала вспомним, что такое делитель. Делители числа 30: 1, 2, 3, 5, 6, 10, 15, 30 — все числа, на которые 30 делится без остатка. Делители числа 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.',
      'Найдём ОБЩИЕ делители — те, что есть и у 30, и у 48: 1, 2, 3, 6. Самый большой из них — 6. Значит, НОД(48, 30) = 6. Квадраты со стороной 6 — самые крупные, которыми можно выложить мозаику 48 на 30: ровно 8 на 5 квадратов!',
      'Перебирать все делители у больших чисел — долго. Древнегреческий математик Евклид придумал быстрый способ. Главная идея: если 48 = 30·1 + 18, то любой общий делитель чисел 48 и 30 делит и остаток 18. Значит, можно перейти к меньшей паре (30, 18)!',
      'Шаг 1. Делим большее число на меньшее: 48 : 30 = 1 и остаток 18. Записываем так: 48 = 30·1 + 18. Теперь ищем НОД пары (30, 18) — числа стали меньше, а НОД не изменился!',
      'Шаг 2. Делим 30 на 18: 30 = 18·1 + 12. Переходим к паре (18, 12). Шаг 3. Делим 18 на 12: 18 = 12·1 + 6. Переходим к паре (12, 6). Числа всё время уменьшаются!',
      'Шаг 4. Делим 12 на 6: 12 = 6·2 + 0. Остаток стал нулём — процесс закончен! Последний НЕНУЛЕВОЙ остаток — это 6. Он и есть НОД(48, 30). Проверка: 48 : 6 = 8 и 30 : 6 = 5 — оба делятся нацело.',
      'Запомни схему алгоритма Евклида: 1) дели большее на меньшее; 2) потом дели меньшее на остаток; 3) повторяй, пока остаток не станет 0; 4) последний ненулевой остаток — это НОД. Быстро и без перебора всех делителей!',
      'Теперь ты готов! Найди НОД(48, 30) по алгоритму Евклида. Подсказка: последовательность остатков 18, 12, 6, 0 — какой остаток последний ненулевой?'
    ],
    check: { q: 'Найди НОД(48, 30).', choices: ['6', '3', '18', '12'], ans: 0,
      exp: 'Алгоритм Евклида: последний ненулевой остаток 6.' },
    tasks: [
      { q: 'Найди НОД(36, 24).', kind: 'unit', ans: 12, tol: 0,
        hints: ['36 = 24·1 + 12.', '24 : 12 = 2 (остаток 0) → НОД = 12.'], sol: '12' },
      { q: 'Что повторяем в алгоритме Евклида?', kind: 'choice', choices: ['деление с остатком', 'сложение', 'умножение', 'вычитание единицы'], ans: 0, tol: 0,
        hints: ['Пока остаток не станет 0.', 'Деление большего на меньшее с остатком.'], sol: 'деление с остатком' }
    ]
  };

  const mosaic = (w,h,side) => { // картинка мозаики w×h из квадратов side
    let out='';
    for(let row=0;row<h/side;row++){
      for(let col=0;col<w/side;col++){
        const hue = (row+col)%2 ? 'rgba(217,164,65,.55)' : 'rgba(217,164,65,.85)';
        out+=`<span style="display:inline-block;width:${side}px;height:${side}px;background:${hue};border:1px solid #8a6d1e;border-radius:2px"></span>`;
      }
    }
    return `<div style="display:grid;grid-template-columns:repeat(${w/side},${side}px);gap:1px;justify-content:center;background:#3a2f14;padding:5px;border-radius:8px">${out}</div>`;
  };
  function visB379(el){
    const step = LV.step||0;
    const eq=(a,b,label,c)=>`<div class="wv-pop" style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${c||'#d9a441'};border-radius:10px;padding:7px 12px;max-width:330px;width:100%"><b style="font-size:16px;color:#ffd76a;font-family:Georgia,serif;letter-spacing:.3px">${a}</b><span style="font-size:12.5px;color:${c||'#8fd1a8'};font-weight:bold;white-space:nowrap">${label}</span></div>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Мозаика 48 на 30</div>
        <div style="transform:scale(.92)">${mosaic(48,30,6)}</div>
        <div class="wv-sml" style="max-width:330px">нужно самое большое число, на которое делятся <b style="color:#ffd76a">и 48, и 30</b> — это НОД</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Делители числа</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['30', '1, 2, 3, 5, 6, 10, 15, 30', '#7fd1ff'],
            ['48', '1, 2, 3, 4, 6, 8, 12, 16, 24, 48', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><b style="color:${x[2]};font-size:19px;margin-right:8px;font-family:Georgia,serif">${x[0]}</b>${x[1]}</div>`).join('')}
        </div>
        <div class="wv-sml">делитель — число, на которое делится без остатка</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Общие делители 48 и 30</div>
        <div class="wv-row" style="gap:6px;margin:6px 0">
          ${['1','2','3','6'].map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.12}s;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:rgba(217,164,65,.18);border:2px solid #d9a441;font-size:20px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('')}
        </div>
        <div style="background:rgba(127,209,160,.1);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;max-width:330px;font-size:17px;color:#8fd1a8;font-weight:bold">НОД(48, 30) = 6 — самый большой!</div>
        <div class="wv-sml">мозаика: 48:6 = 8 и 30:6 = 5 квадратов</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Идея Евклида</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">48</b><div style="font-size:11px;color:#8fa08f">делится на 6</div></div>
          <span style="font-size:24px;color:#8fa08f">=</span>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#7fd1ff;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#8fa08f">· 1</div></div>
          <span style="font-size:24px;color:#8fa08f">+</span>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#ff9a8a;font-family:Georgia,serif">18</b><div style="font-size:11px;color:#8fa08f">остаток</div></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ff9a8a;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">общий делитель 48 и 30 делит и <b style="color:#ff9a8a">остаток 18</b> → ищем НОД пары поменьше: (30, 18)</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 1</div>
        ${eq('48 = 30 · 1 + 18','остаток 18','#ff9a8a')}
        <div class="wv-ans" style="font-size:14px;color:#8fd1a8">переходим к паре (30, 18) — НОД тот же!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Шаги 2 и 3</div>
        ${eq('30 = 18 · 1 + 12','остаток 12','#ff9a8a')}
        ${eq('18 = 12 · 1 + 6','остаток 6','#ff9a8a')}
        <div class="wv-sml">числа уменьшаются: 48 → 30 → 18 → 12 → 6</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Финал: остаток 0</div>
        ${eq('12 = 6 · 2 + 0','остаток 0 → стоп!','#8fd1a8')}
        <div style="background:rgba(217,164,65,.12);border:2px solid #d9a441;border-radius:12px;padding:9px 14px;max-width:330px;font-size:18px;color:#ffd76a;font-weight:bold">НОД(48, 30) = 6 — последний ненулевой остаток</div>
        <div class="wv-sml">проверка: 48:6 = 8 ✔ · 30:6 = 5 ✔</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Схема алгоритма</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣', 'дели большее на меньшее'],
            ['2️⃣', 'дели меньшее на остаток'],
            ['3️⃣', 'повторяй, пока остаток не 0'],
            ['4️⃣', 'последний ненулевой остаток = НОД']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;text-align:left;font-size:14.5px;color:#e8dcc8"><span style="font-size:17px">${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
        <div class="wv-sml">быстро и без перебора всех делителей!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${['48 = 30·1 + 18','30 = 18·1 + 12','18 = 12·1 + 6','12 = 6·2 + 0'].map((e,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;text-align:center;font-size:15px;color:#e8dcc8;font-family:Georgia,serif">${e}</div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:19px;color:#ffd76a">НОД(48, 30) = ?</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[379] = visB379;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===379){ window.ARH_LESSONS[i]=L379; break; } } })();
})();
/* ================= УРОК 380 · Координатная плоскость ================= */
(function(){
  const L380 = {
    id: 380, title: 'Координатная плоскость', ico: '🗺️',
    src: 'Математика · 5–6 класс · Координаты', subj: 'math',
    explain: [
      'Архимед спрятал клад и нарисовал карту! Чтобы указать место, нужны ДВЕ координаты: сколько шагов вправо (x) и сколько шагов вверх (y). Так работает координатная плоскость — как карта города с улицами.',
      'На плоскости две оси: горизонтальная — ось x, и вертикальная — ось y. Они пересекаются в точке (0; 0) — начале координат. Это как перекрёсток двух главных улиц, от которого считают все шаги.',
      'Координаты точки записывают в скобках через точку с запятой: (x; y). ВАЖНО: сначала всегда пишут x (вправо-влево), потом y (вверх-вниз). Перепутаешь порядок — попадёшь совсем в другое место!',
      'Точка (3; 2) — это 3 шага вправо от начала и 2 шага вверх. Считаем так: первое число 3 — идём по оси x вправо, второе число 2 — поднимаемся вверх на 2 клетки. Точка найдена!',
      'А если число отрицательное? Точка (−3; 2): минус у x значит, что идём ВЛЕВО 3 шага (по отрицательной части оси x), потом вверх 2. Минус перед x — влево, минус перед y — вниз.',
      'Четверти плоскости: вправо-вверх — I четверть (x > 0, y > 0); влево-вверх — II (x < 0, y > 0); влево-вниз — III; вправо-вниз — IV. Знаки координат подсказывают, где точка!',
      'Точки на осях: если y = 0, точка лежит на оси x (например (5; 0)). Если x = 0 — на оси y (например (0; −3)). А начало (0; 0) лежит сразу на обеих осях.',
      'Как проверить себя? Возьми точку (3; 4): сначала 3 шага вправо по оси x, потом 4 шага вверх. Запиши (3; 4) — x первый, y второй. Порядок — половина успеха!',
      'Теперь ты умеешь читать карту Архимеда! Точка: 3 по оси x и 4 по оси y. Как записать её координаты? Вспомни: сначала x, потом y.'
    ],
    check: { q: 'Точка: 3 по оси x и 4 по оси y. Как её записать?', choices: ['(3; 4)', '(4; 3)', '(3, 4)', '(34)'], ans: 0,
      exp: 'Сначала x, потом y: (3; 4).' },
    tasks: [
      { q: 'Назови координату x точки (7; 3).', kind: 'unit', ans: 7, tol: 0,
        hints: ['Первая координата — x.', 'x = 7.'], sol: '7' },
      { q: 'Куда идём от начала, чтобы попасть в точку (−3; 2)?', kind: 'choice', choices: ['влево 3, вверх 2', 'вправо 3, вверх 2', 'влево 3, вниз 2', 'вправо 3, вниз 2'], ans: 0, tol: 0,
        hints: ['Отрицательный x — влево.', 'x = −3 → влево 3; y = 2 → вверх 2.'], sol: 'влево 3, вверх 2' }
    ]
  };

  function planeSVG(pt, showAxes){
    // SVG-плоскость 220x220 с осями, сеткой; pt=[x,y] (по 1 клетке = 18px, центр 110)
    const cx=110, cy=110, sc=18;
    let grid='';
    for(let i=-4;i<=4;i++){
      grid+=`<line x1="${cx+i*sc}" y1="10" x2="${cx+i*sc}" y2="210" stroke="rgba(255,255,255,.06)"/>`;
      grid+=`<line x1="10" y1="${cy+i*sc}" x2="210" y2="${cy+i*sc}" stroke="rgba(255,255,255,.06)"/>`;
    }
    let labels='';
    for(let i=-4;i<=4;i++){ if(i===0) continue;
      labels+=`<text x="${cx+i*sc-6}" y="${cy+16}" font-size="9" fill="#7f9a8c">${i}</text>`;
      labels+=`<text x="${cx+8}" y="${cy-i*sc+3}" font-size="9" fill="#7f9a8c">${i}</text>`;
    }
    let ptDot='', arrows='';
    if(pt){
      const px=cx+pt[0]*sc, py=cy-pt[1]*sc;
      ptDot=`<circle cx="${px}" cy="${py}" r="6" fill="#ffd76a"/><circle cx="${px}" cy="${py}" r="9" fill="none" stroke="#ffd76a" opacity=".6"/>`;
      arrows = showAxes ? `
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${cy}" stroke="#7fd1ff" stroke-width="2" stroke-dasharray="4 3"/>
        <line x1="${px}" y1="${cy}" x2="${px}" y2="${py}" stroke="#8fd1a8" stroke-width="2" stroke-dasharray="4 3"/>` : '';
    }
    return `<svg viewBox="0 0 220 220" style="width:230px;height:230px;background:#101f18;border-radius:12px">
      ${grid}
      <line x1="10" y1="${cy}" x2="210" y2="${cy}" stroke="#cfe0cf" stroke-width="2"/>
      <line x1="${cx}" y1="10" x2="${cx}" y2="210" stroke="#cfe0cf" stroke-width="2"/>
      <polygon points="210,${cy} 202,${cy-5} 202,${cy+5}" fill="#cfe0cf"/>
      <polygon points="${cx},10 ${cx-5},18 ${cx+5},18" fill="#cfe0cf"/>
      <text x="206" y="${cy+13}" font-size="10" fill="#cfe0cf">x</text>
      <text x="${cx+8}" y="16" font-size="10" fill="#cfe0cf">y</text>
      ${labels}
      <circle cx="${cx}" cy="${cy}" r="3" fill="#ff9a8a"/>
      ${arrows}${ptDot}
    </svg>`;
  }
  function visB380(el){
    const step=LV.step||0;
    const coord=(x,y)=>`<b style="color:#ffd76a;font-family:Georgia,serif">(${x}; ${y})</b>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Карта сокровищ</div>
        <div style="font-size:54px" class="wv-swing">🗺️</div>
        <div class="wv-sml" style="max-width:330px">чтобы найти клад, нужны <b style="color:#ffd76a">два числа</b>: шаги вправо и шаги вверх — это и есть координаты!</div>
        <div class="wv-row" style="gap:8px">${[['x','вправо-влево','#7fd1ff'],['y','вверх-вниз','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:6px 12px"><b style="font-size:20px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Две оси</div>
        ${planeSVG(null)}
        <div class="wv-sml">ось x — горизонтальная · ось y — вертикальная · начало (0; 0)</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Порядок важен: (x; y)</div>
        <div style="display:flex;gap:8px;align-items:center;margin:4px 0">
          <span class="wv-pop" style="background:rgba(127,209,255,.14);border:2px solid #7fd1ff;border-radius:10px;padding:6px 14px;font-size:22px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">x</span>
          <span style="color:#8fa08f;font-size:20px">→</span>
          <span class="wv-pop2" style="background:rgba(143,209,168,.14);border:2px solid #8fd1a8;border-radius:10px;padding:6px 14px;font-size:22px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">y</span>
        </div>
        <div style="background:rgba(232,106,90,.08);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#ffcfc2">перепутаешь (2; 3) и (3; 2) — попадёшь в другое место!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Точка ${coord(3,2)}</div>
        ${planeSVG([3,2], true)}
        <div class="wv-sml">3 шага вправо (синяя стрелка) → 2 шага вверх (зелёная) → золотая точка!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Отрицательные координаты</div>
        ${planeSVG([-3,2], true)}
        <div class="wv-sml">${coord(-3,2)}: минус у x → влево 3, потом вверх 2</div>
        <div class="wv-sml">минус перед x — влево · минус перед y — вниз</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Четверти плоскости</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:300px;width:100%">
          ${[['I','x > 0, y > 0','#8fd1a8'],['II','x < 0, y > 0','#7fd1ff'],['III','x < 0, y < 0','#e8a0d8'],['IV','x > 0, y < 0','#ffb0a0']].map((q,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:10px;padding:8px;text-align:center"><b style="font-size:18px;color:${q[2]};font-family:Georgia,serif">${q[0]}</b><div style="font-size:11px;color:#8fa08f">${q[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">знаки координат говорят, в какой четверти точка!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Точки на осях</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          ${[['(5; 0)','на оси x','#7fd1ff'],['(0; −3)','на оси y','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:19px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">y = 0 → точка на оси x · x = 0 → точка на оси y</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Точка ${coord(3,4)}</div>
        ${planeSVG([3,4], true)}
        <div class="wv-ans" style="font-size:15px;color:#8fd1a8">сначала 3 вправо (x), потом 4 вверх (y) — порядок решает!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">3 по оси x и 4 по оси y — как записать?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 20px;font-size:26px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">( ? ; ? )</div>
        <div class="wv-sml">сначала x, потом y!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[380] = visB380;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===380){ window.ARH_LESSONS[i]=L380; break; } } })();
})();
/* ================= УРОК 381 · Осевая и центральная симметрия ================= */
(function(){
  const L381 = {
    id: 381, title: 'Осевая и центральная симметрия', ico: '🦋',
    src: 'Математика · 5–6 класс · Симметрия', subj: 'math',
    explain: [
      'Посмотри на бабочку! Левая и правая половинки её крыльев одинаковые, как в зеркале. Это и есть симметрия — когда одна часть фигуры является зеркальным отражением другой. Симметрия повсюду: в природе, архитектуре, буквах!',
      'Осевая симметрия — отражение относительно ПРЯМОЙ, которую называют осью симметрии. Представь, что вдоль фигуры поставили зеркало. Отражение фигуры в зеркале — её симметричная копия. Бабочка, снежинка, кленовый лист — всё это осевая симметрия.',
      'Как построить отражение точки? Через точку проводим перпендикуляр к оси и откладываем такое же расстояние по другую сторону. Точка A и её отражение A′ находятся на одинаковом расстоянии от оси, но по разные стороны.',
      'У фигур бывает несколько осей. У прямоугольника (не квадрата) — две оси: через середины противоположных сторон. У квадрата — целых четыре! А у круга осей бесконечно много — через любой диаметр.',
      'Центральная симметрия — другой вид симметрии. Фигуру поворачивают на 180° вокруг точки O (центра). Точка A переходит в A′ так, что O — середина отрезка AA′. Фигура как будто «переворачивается вверх ногами».',
      'Как отличить? Осевая симметрия — отражение в зеркале (прямая-ось). Центральная — поворот на 180° вокруг точки. У буквы А есть вертикальная ось (сложи пополам — половинки совпадут), а у буквы S — центральная симметрия (поверни на 180° — та же буква).',
      'Буквы с вертикальной осью: А, М, Т, П, Ш. С горизонтальной осью: В (верх и низ похожи), Е, Ж. С центральной: S, Z, N. Проверь: сложи букву или поверни её — и посмотри, совпала ли!',
      'Симметрия в жизни: отражение в озере, узоры на коврах, фасады зданий, снежинки. Художники и архитекторы используют симметрию, чтобы работы выглядели гармонично и красиво.',
      'Теперь проверь себя: при центральной симметрии фигура поворачивается на сколько градусов? Вспомни — это «переворот вверх ногами».'
    ],
    check: { q: 'При центральной симметрии фигура поворачивается на…', choices: ['180°', '90°', '360°', '45°'], ans: 0,
      exp: 'Центральная симметрия — поворот на 180°.' },
    tasks: [
      { q: 'Сколько осей симметрии у прямоугольника, который не является квадратом?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Через середины противоположных сторон.', 'Две оси.'], sol: '2' },
      { q: 'Какая буква имеет горизонтальную ось симметрии?', kind: 'choice', choices: ['В', 'Р', 'Г', 'Я'], ans: 0, tol: 0,
        hints: ['Сложи букву пополам по горизонтали.', 'У В верх и низ симметричны.'], sol: 'В' }
    ]
  };

  const mirr = (letter, axis) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:14px;background:rgba(217,164,65,.12);border:2px solid #d9a441;font-size:38px;color:#ffd76a;font-family:Georgia,serif">${letter}</span>`;
  function visB381(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Бабочка — это симметрия!</div>
        <div style="font-size:80px" class="wv-glow">🦋</div>
        <div class="wv-sml" style="max-width:330px">левая и правая половинки крыльев одинаковы — как в зеркале</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${['❄️','🍁','🏛️'].map(e=>`<span style="font-size:34px" class="wv-pop">${e}</span>`).join('')}</div>
        <div class="wv-sml">симметрия в природе и архитектуре — повсюду!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Осевая симметрия — зеркало</div>
        <div style="display:flex;align-items:center;gap:2px">
          <div style="font-size:60px;transform:scaleX(-1)">🔺</div>
          <div style="width:3px;height:76px;background:linear-gradient(#ffd76a,#d9a441);border-radius:2px;box-shadow:0 0 8px rgba(217,164,65,.7)"></div>
          <div style="font-size:60px">🔺</div>
        </div>
        <div class="wv-sml">вдоль фигуры — ось-«зеркало»: слева оригинал, справа отражение</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Отражение точки</div>
        <div style="position:relative;width:240px;height:120px;background:#101f18;border-radius:12px;display:flex;align-items:center;justify-content:center">
          <div style="position:absolute;left:50%;top:8px;bottom:8px;width:2px;background:linear-gradient(#ffd76a,#d9a441)"></div>
          <div style="position:absolute;left:22%;top:22px;width:52px;height:52px;border-radius:50%;background:rgba(127,209,255,.2);border:2px solid #7fd1ff;display:flex;align-items:center;justify-content:center;font-size:20px;color:#7fd1ff;font-weight:bold">A</div>
          <div style="position:absolute;right:22%;top:22px;width:52px;height:52px;border-radius:50%;background:rgba(143,209,168,.2);border:2px solid #8fd1a8;display:flex;align-items:center;justify-content:center;font-size:20px;color:#8fd1a8;font-weight:bold">A′</div>
          <div style="position:absolute;left:calc(50% - 40px);top:38px;width:80px;height:20px;border-top:2px dashed rgba(255,255,255,.25)"></div>
          <div style="position:absolute;bottom:6px;width:100%;text-align:center;font-size:10px;color:#7f9a8c">равные расстояния до оси</div>
        </div>
        <div class="wv-sml">перпендикуляр к оси + то же расстояние по другую сторону</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сколько осей?</div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
          ${[
            ['▭','2 оси','прямоугольник'],
            ['⬜','4 оси','квадрат'],
            ['⬤','∞ осей','круг']
          ].map((s,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center"><div style="font-size:52px;color:#ffd76a">${s[0]}</div><div style="font-size:13px;color:#8fd1a8;font-weight:bold">${s[1]}</div><div style="font-size:11px;color:#8fa08f">${s[2]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">больше «правильности» — больше осей!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Центральная симметрия — поворот 180°</div>
        <div style="display:flex;align-items:center;gap:14px">
          <div style="font-size:60px">🚀</div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:2px;height:44px;background:rgba(255,255,255,.2)"></div>
            <div style="width:16px;height:16px;border-radius:50%;background:#ffd76a;box-shadow:0 0 10px rgba(255,215,106,.8)"></div>
            <div style="width:2px;height:44px;background:rgba(255,255,255,.2)"></div>
          </div>
          <div style="font-size:60px;transform:rotate(180deg)">🚀</div>
        </div>
        <div class="wv-sml">вокруг точки O на 180° — фигура «встаёт на голову»</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Два вида симметрии</div>
        <div style="display:flex;flex-direction:column;gap:7px;max-width:330px;width:100%">
          ${[
            ['Осевая', 'отражение в зеркале (прямая-ось)', '🪞', '#7fd1ff'],
            ['Центральная', 'поворот на 180° вокруг точки', '🔄', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${x[3]};border-radius:10px;padding:8px 12px;text-align:left"><span style="font-size:26px">${x[2]}</span><span style="font-size:14px;color:#e8dcc8"><b style="color:${x[3]}">${x[0]}</b> — ${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">А — осевая (ось вертикаль) · S — центральная (поворот 180°)</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Симметрия букв</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center">
          ${['А','М','Т','П','Ш'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#7fd1ff;margin-top:2px">вертикальная ось</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-top:6px">
          ${['В','Е','Ж'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#8fd1a8">горизонтальная ось</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-top:6px">
          ${['S','Z','N'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#e8a0d8;margin-top:2px">центральная (180°)</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Симметрия вокруг нас</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin:6px 0">
          ${['🏔️','🦋','❄️','🏰'].map((e,i)=>`<span class="wv-pop" style="animation-delay:${i*0.12}s;font-size:44px">${e}</span>`).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">горы в озере, крылья бабочки, снежинки, дворцы — симметрия делает мир <b style="color:#ffd76a">гармоничным</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;align-items:center;gap:12px;margin:4px 0">
          <div style="font-size:56px">🔄</div>
          <div class="wv-sml" style="max-width:230px">центральная симметрия — поворот вокруг точки на …?</div>
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 20px;font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? °</div>
        <div class="wv-sml">это «переворот вверх ногами»!</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[381]=visB381;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===381){ window.ARH_LESSONS[i]=L381; break; } } })();
})();
/* ================= УРОК 382 · Вероятность и диаграммы ================= */
(function(){
  const L382 = {
    id: 382, title: 'Вероятность и диаграммы: начало', ico: '🎲',
    src: 'Математика · 5–6 класс · Вероятность', subj: 'math',
    explain: [
      'Архимед положил в мешок 2 красных и 3 синих шара и предлагает сыграть: если вытащишь красный — получишь приз! Стоит ли играть? Чтобы ответить, математики придумали вероятность — число, показывающее, насколько событие вероятно.',
      'Сначала посчитаем ВСЕ возможные исходы. В мешке 5 шаров, и каждый можно вытащить с одинаковой вероятностью — они не отличаются на ощупь. Значит, всего равновозможных исходов 5.',
      'Теперь посчитаем БЛАГОПРИЯТНЫЕ исходы — те, что ведут к нашей победе. Нам нужен красный шар, а красных в мешке 2. Значит, благоприятных исходов 2.',
      'Вероятность = число благоприятных исходов : число всех исходов. Для красного шара: 2 : 5 = 2/5. Вероятность вытащить красный шар — две пятых. Играть можно, но синий шар выпадает чаще!',
      'Ту же информацию покажет диаграмма. Нарисуем два столбика: красные — высота 2, синие — высота 3. Диаграмма сразу видна: синих больше, значит, и вероятность синего шара больше (3/5).',
      'Ещё пример — монета. У неё две стороны: орёл и решка. Всего исходов 2, благоприятный (орёл) — 1. Вероятность орла = 1/2. Это половина — как и ожидаешь, монетка честная!',
      'Кубик — шесть граней. Вероятность выпасть шестёрке = 1/6. А вероятность выпасть чётному числу (2, 4 или 6) = 3/6 = 1/2. Больше благоприятных исходов — больше вероятность!',
      'Запомни главное: вероятность всегда от 0 до 1. Если событие невозможно — вероятность 0. Если оно происходит всегда — вероятность 1. Чем ближе к 1, тем событие вероятнее.',
      'Теперь проверь себя: в мешке 2 красных и 3 синих шара. Какова вероятность вытащить красный шар? Вспомни формулу: благоприятные делим на все.'
    ],
    check: { q: 'В мешке 2 красных и 3 синих шара. Вероятность вытащить красный?', choices: ['2/5', '3/5', '2/3', '1/2'], ans: 0,
      exp: 'Благоприятных 2, всего 5 → 2/5.' },
    tasks: [
      { q: 'В коробке 4 белых и 1 чёрный шар. Сколько всего шаров?', kind: 'unit', ans: 5, tol: 0,
        hints: ['4 + 1.', 'Всего 5 шаров.'], sol: '5' },
      { q: 'Вероятность выпадения орла при подбрасывании монеты?', kind: 'choice', choices: ['1/2', '1/3', '1', '1/4'], ans: 0, tol: 0,
        hints: ['У монеты 2 стороны.', 'Орёл — 1 из 2 → 1/2.'], sol: '1/2' }
    ]
  };
  function visB382(el){
    const step=LV.step||0;
    const balls=(r,b,shake)=>`<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;background:#101f18;border:2px solid #3d5c49;border-radius:14px;padding:12px;max-width:300px;width:100%">
      ${Array.from({length:r},(_,i)=>`<span class="${shake?'wv-shake':''}" style="font-size:30px">🔴</span>`).join('')}
      ${Array.from({length:b},(_,i)=>`<span class="${shake?'wv-shake':''}" style="font-size:30px">🔵</span>`).join('')}
    </div>`;
    const bars=(r,b)=>{ const mx=3; const rh=Math.round(r/mx*70), bh=Math.round(b/mx*70);
      return `<div style="display:flex;align-items:flex-end;gap:18px;justify-content:center;height:100px;padding:6px 12px;background:#101f18;border-radius:12px">
        <div style="display:flex;flex-direction:column;align-items:center"><div style="width:34px;height:${rh}px;background:#e86a5a;border-radius:4px 4px 0 0;transition:height .5s"></div><span style="font-size:12px;color:#ffb0a0;margin-top:3px">красные ${r}</span></div>
        <div style="display:flex;flex-direction:column;align-items:center"><div style="width:34px;height:${bh}px;background:#4a93d0;border-radius:4px 4px 0 0;transition:height .5s"></div><span style="font-size:12px;color:#7fb8e0;margin-top:3px">синие ${b}</span></div>
      </div>`;
    };
    const frac=(a,b,label)=>{ let txt='';
      return `<div style="display:flex;align-items:center;gap:10px;justify-content:center">
        <div style="text-align:center;background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:10px;padding:4px 14px"><div style="font-size:17px;color:#ffd76a;font-weight:bold">${a}</div><div style="border-top:1.5px solid rgba(255,255,255,.3);font-size:17px;color:#ffd76a;font-weight:bold;padding-top:2px">${b}</div></div>
        <span style="font-size:14px;color:#e8dcc8;max-width:150px;text-align:left">${label}</span>
      </div>`;
    };
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Игра Архимеда</div>
        <div style="font-size:46px" class="wv-swing">🎁</div>
        ${balls(2,3,true)}
        <div class="wv-sml" style="max-width:320px">вытащишь <b style="color:#ffb0a0">красный</b> — приз! Стоит ли играть? Посчитаем вероятность!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Все исходы</div>
        ${balls(2,3)}
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">всего шаров: 2 + 3 = 5</div>
        <div class="wv-sml">каждый шар можно вытащить одинаково легко — 5 равновозможных исходов</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Благоприятные исходы</div>
        <div style="font-size:40px">🔴🔴</div>
        <div class="wv-ans" style="font-size:19px;color:#ffb0a0">нужных (красных): 2</div>
        <div class="wv-sml">нам подходят только красные шары</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула вероятности</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15px;line-height:1.5;color:#e8dcc8;text-align:center">P = благоприятные исходы : <b style="color:#ffd76a">все</b> исходы</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:26px;color:#e8dcc8">2 <span style="color:#8fa08f">:</span> 5 <span style="color:#8fa08f">=</span> <b style="color:#ffd76a;font-family:Georgia,serif">2/5</b></div>
        <div class="wv-sml">вероятность красного шара — 2/5</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Диаграмма — глазами видно!</div>
        ${bars(2,3)}
        <div class="wv-row" style="gap:8px;margin:2px 0">
          ${frac(2,5,'красный — 2/5')}
          ${frac(3,5,'синий — 3/5')}
        </div>
        <div class="wv-sml">синих больше → синий шар выпадает чаще!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Монета</div>
        <div style="display:flex;gap:18px;justify-content:center;align-items:center">
          <div style="text-align:center"><div style="font-size:44px" class="wv-flick">🪙</div><div style="font-size:12px;color:#8fa08f">орёл</div></div>
          <div style="font-size:26px;color:#8fa08f">или</div>
          <div style="text-align:center"><div style="font-size:44px;transform:rotate(180deg)" class="wv-flick">🪙</div><div style="font-size:12px;color:#8fa08f">решка</div></div>
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">P(орёл) = 1/2</div>
        <div class="wv-sml">2 стороны, 1 нужная — половина!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Кубик</div>
        <div style="display:flex;gap:8px;justify-content:center">
          ${[1,2,3,4,5,6].map(n=>`<div style="width:38px;height:38px;border-radius:8px;background:${n%2===0?'rgba(143,209,168,.16)':'rgba(255,255,255,.05)'};border:1.5px solid ${n%2===0?'#8fd1a8':'#3d5c49'};display:flex;align-items:center;justify-content:center;font-size:17px;color:${n%2===0?'#8fd1a8':'#e8dcc8'};font-weight:bold">${n}</div>`).join('')}
        </div>
        <div class="wv-row" style="gap:8px">${frac(1,6,'шестёрка')}${frac(3,6,'чётное число')}</div>
        <div class="wv-sml">3/6 = 1/2 — больше удачных исходов, больше шансов!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Шкала вероятности</div>
        <div style="width:100%;max-width:330px">
          <div style="height:16px;border-radius:8px;background:linear-gradient(90deg,#e86a5a,#d9a441,#4c8a5a);opacity:.9;margin-bottom:4px"></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#8fa08f"><span>0 — невозможно</span><span>1/2</span><span>1 — всегда</span></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">вероятность всегда от 0 до 1 · чем ближе к 1, тем событие <b style="color:#ffd76a">вероятнее</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${balls(2,3)}
        <div class="wv-sml">вероятность вытащить красный шар?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 20px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? / 5</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[382]=visB382;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===382){ window.ARH_LESSONS[i]=L382; break; } } })();
})();
/* ================= УРОК 383 · Оценка + пример ================= */
(function(){
  const L383 = {
    id: 383, title: 'Оценка + пример: уровень 2', ico: '⚖️',
    src: 'Математика · 5–6 класс · Оценка и пример', subj: 'math',
    explain: [
      'В олимпиадных задачах часто спрашивают: «Какое самое маленькое?», «Какое самое большое?» Для таких задач есть золотая схема из двух шагов: сначала докажи, что меньше (или больше) НЕЛЬЗЯ — это оценка, а потом покажи пример, где это получается.',
      'Разберём на задаче: какое наименьшее двузначное число имеет сумму цифр 10? Сначала ОЦЕНКА: если число меньше 19, то оно начинается с 1 и имеет вид 1?. Чтобы сумма была 10, нужна цифра 9: 19. Числа 10–18 дают сумму меньше 10. Значит, меньше 19 — никак!',
      'Теперь ПРИМЕР: число 19 имеет сумму цифр 1 + 9 = 10 — условие выполняется. Раз меньше нельзя, а 19 подходит, то ответ — 19. Оценка + пример = точное решение без перебора!',
      'Ещё одна задача из учебника: задумали число, умножили на 3 и получили 24. Какое число задумали? Двигаемся ОБРАТНО: было умножение на 3 — значит, делим 24 на 3. 24 : 3 = 8. Проверка: 8 · 3 = 24. Всё сходится!',
      'Приём «обратный ход»: чтобы найти исходное число, выполняем действия в обратном порядке. Умножали — делим, прибавляли — вычитаем. Как будто перематываем запись задачи назад!',
      'Задача посложнее: сумма двух чисел 50, а их разность 10. Найди большее число. Ключевая идея: если к сумме прибавить разность, получится удвоенное большее число: (50 + 10) : 2 = 30. Проверка: 30 + 20 = 50 и 30 − 20 = 10.',
      'Почему так? Пусть a — большее число, b — меньшее. Тогда a + b = 50 и a − b = 10. Сложим уравнения: (a + b) + (a − b) = 50 + 10 → 2a = 60 → a = 30. Вот и формула: большее = (сумма + разность) : 2!',
      'Запомни схему «оценка + пример»: 1) докажи границу (меньше/больше нельзя); 2) приведи пример, который её достигает. А для задач «задумали число» — иди обратным ходом, и всё получится!',
      'Теперь проверь себя: какое наименьшее двузначное число имеет сумму цифр 10? Вспомни схему: сначала оценка (меньше 19 нельзя), потом пример (19 подходит).'
    ],
    check: { q: 'Какое наименьшее двузначное число имеет сумму цифр 10?', choices: ['19', '28', '37', '91'], ans: 0,
      exp: 'Меньше 19 нельзя: числа 10–18 дают сумму меньше 10. А 19: 1+9=10.' },
    tasks: [
      { q: 'Задумали число, умножили на 3 и получили 24. Какое число задумали?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Действуем обратно: делим.', '24 : 3 = 8.'], sol: '8' },
      { q: 'Сумма двух чисел 50, а разность 10. Чему равно большее число?', kind: 'choice', choices: ['30', '20', '25', '40'], ans: 0, tol: 0,
        hints: ['(50 + 10) : 2.', '60 : 2 = 30.'], sol: '30' }
    ]
  };
  function visB383(el){
    const step=LV.step||0;
    const numTiles=(num)=>String(num).split('').map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.08}s;display:inline-flex;align-items:center;justify-content:center;width:40px;height:44px;border-radius:9px;background:rgba(217,164,65,.14);border:2px solid #d9a441;font-size:24px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Схема «оценка + пример»</div>
        <div style="display:flex;gap:10px;align-items:stretch;max-width:330px;width:100%">
          <div style="flex:1;background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:12px;padding:10px;text-align:center">
            <div style="font-size:22px">1️⃣</div><b style="font-size:13.5px;color:#7fd1ff">ОЦЕНКА</b>
            <div style="font-size:11.5px;color:#9ec0a8;margin-top:4px">докажи, что меньше нельзя</div>
          </div>
          <div style="flex:1;background:rgba(143,209,168,.08);border:2px solid #8fd1a8;border-radius:12px;padding:10px;text-align:center">
            <div style="font-size:22px">2️⃣</div><b style="font-size:13.5px;color:#8fd1a8">ПРИМЕР</b>
            <div style="font-size:11.5px;color:#9ec0a8;margin-top:4px">покажи, что это получается</div>
          </div>
        </div>
        <div class="wv-sml">оценка + пример = точный ответ без перебора!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Оценка: меньше 19 нельзя</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:330px">
          ${Array.from({length:10},(_,i)=>{const n=10+i; const sum=1+i;
            return `<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:7px;background:rgba(232,106,90,.08);border:1px solid rgba(232,106,90,.35);font-size:12px;color:#8f5a50;margin:1px">${n}</span>`;}).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #7fd1ff;border-radius:9px;padding:6px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">числа 10–18: сумма цифр 1+? меньше 10 → <b style="color:#7fd1ff">не подходят!</b></div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Пример: 19 подходит!</div>
        ${numTiles(19)}
        <div style="display:flex;align-items:center;gap:6px;margin:6px 0;font-size:20px;color:#e8dcc8">1 + 9 = <b style="color:#ffd76a;font-family:Georgia,serif">10</b></div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:17px;color:#8fd1a8;font-weight:bold">меньше нельзя + пример есть → ответ 19!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Задумали число</div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:center">
          <div class="wv-row" style="gap:8px"><span style="background:#101f18;border:1px solid #3d5c49;border-radius:9px;padding:4px 12px;font-size:20px;color:#8fa08f">?</span><b style="color:#ffd76a;font-size:22px">×3</b><span style="background:#101f18;border:1px solid #3d5c49;border-radius:9px;padding:4px 12px;font-size:20px;color:#8fa08f">?</span><b style="color:#ffd76a;font-size:22px">=</b><span style="background:rgba(217,164,65,.14);border:2px solid #d9a441;border-radius:9px;padding:4px 12px;font-size:20px;color:#ffd76a;font-weight:bold">24</span></div>
          <div style="font-size:15px;color:#8fa08f">ищем ? — идём обратно</div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:6px 12px;max-width:330px;font-size:14px;color:#e8dcc8">было умножение → делаем деление: <b style="color:#8fd1a8">24 : 3 = 8</b></div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Обратный ход</div>
        <div style="display:flex;flex-direction:column;gap:4px;align-items:center;font-size:18px;color:#e8dcc8">
          <div>задумали <b style="color:#ffd76a">8</b> → ×3 → 24</div>
          <div style="color:#8fa08f;font-size:14px">↑ проверка: 8·3 = 24 ✔</div>
          <div style="margin-top:6px">найти 24 → :3 → <b style="color:#8fd1a8">8</b></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:6px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">умножали — делим · прибавляли — вычитаем: как перемотка назад!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма 50, разность 10</div>
        <div class="wv-row" style="gap:10px">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 14px"><b style="font-size:24px;color:#7fd1ff;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#8fd1a8">большее</div></div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 14px"><b style="font-size:24px;color:#8fd1a8;font-family:Georgia,serif">20</b><div style="font-size:11px;color:#8fa08f">меньшее</div></div>
        </div>
        <div class="wv-row" style="gap:12px;font-size:15px;color:#e8dcc8"><span>30+20=<b style="color:#ffd76a">50</b></span><span>30−20=<b style="color:#ffd76a">10</b></span></div>
        <div class="wv-sml">большее = (сумма + разность) : 2 = (50+10):2 = 30</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так работает</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;font-size:15px;color:#e8dcc8;font-family:Georgia,serif">
          <div class="wv-pop">a + b = 50 &nbsp;·&nbsp; a − b = 10</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">сложим оба уравнения:</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">2a = 60 → a = 30</div>
        </div>
        <div class="wv-sml">удвоенное большее = сумма + разность!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','докажи границу (оценка)','#7fd1ff'],
            ['2️⃣','приведи пример','#8fd1a8'],
            ['3️⃣','задумали число → обратный ход','#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">наименьшее двузначное с суммой цифр 10?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 20px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? ?</div>
        <div class="wv-sml">подсказка: число 19 — 1 + 9 = 10</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[383]=visB383;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===383){ window.ARH_LESSONS[i]=L383; break; } } })();
})();
/* ================= УРОК 384 · Средняя скорость ================= */
(function(){
  const L384 = {
    id: 384, title: 'Средняя скорость: путь и время', ico: '🚌',
    src: 'Математика · 5–6 класс · Средняя скорость', subj: 'math',
    explain: [
      'Автобус Архимеда едет в соседний город. Первые 2 часа — со скоростью 40 км/ч, а потом 1 час — со скоростью 70 км/ч. Какова СРЕДНЯЯ скорость? Это не среднее арифметическое 40 и 70! Сейчас разберёмся, как считать правильно.',
      'Сначала вспомним главную формулу пути: путь = скорость · время. Если ехать 2 часа по 40 км/ч, проедешь 40 · 2 = 80 км. Обрати внимание: умножаем скорость на время, а не просто берём скорость!',
      'Теперь второй участок: 1 час по 70 км/ч — это 70 · 1 = 70 км. Весь путь: 80 + 70 = 150 км. А всё время движения: 2 + 1 = 3 часа. Запишем это — скоро понадобится.',
      'Средняя скорость = весь путь : всё время. Делим 150 км на 3 часа: 150 : 3 = 50 км/ч. Вот правильный ответ! Средняя скорость автобуса — 50 км/ч.',
      'Почему нельзя просто взять (40 + 70) : 2 = 55? Потому что на скорости 40 км/ч автобус ехал ДОЛЬШЕ (2 часа), чем на 70 км/ч (1 час). Быстрая езда «весит» меньше в общем времени!',
      'Запомни формулу: средняя скорость = весь путь : всё время. Не усредняй скорости напрямую — сначала найди весь путь и всё время!',
      'Проверим на простом примере: весь путь 120 км, время 3 часа. Средняя скорость = 120 : 3 = 40 км/ч. Всё просто, когда известны путь и время!',
      'А если ехать одинаковое время на разных скоростях — тогда средняя скорость и есть среднее арифметическое. Но в нашей задаче времена разные — поэтому считаем через путь!',
      'Теперь проверь себя: автобус ехал 2 часа по 40 км/ч и 1 час по 70 км/ч. Какова средняя скорость? Вспомни: весь путь 150 км, всё время 3 часа.'
    ],
    check: { q: '2 часа по 40 км/ч и 1 час по 70 км/ч. Средняя скорость?', choices: ['50 км/ч', '55 км/ч', '45 км/ч', '60 км/ч'], ans: 0,
      exp: 'Путь 40·2 + 70 = 150 км, время 3 ч → 150:3 = 50 км/ч.' },
    tasks: [
      { q: 'Весь путь 120 км, время 3 часа. Средняя скорость?', kind: 'unit', ans: 40, tol: 0,
        hints: ['Средняя = путь : время.', '120 : 3 = 40 км/ч.'], sol: '40' },
      { q: 'Почему нельзя просто усреднить 40 и 70?', kind: 'choice', choices: ['времена движения разные', 'числа слишком большие', 'дорога кривая', 'можно усреднять'], ans: 0, tol: 0,
        hints: ['Средняя — это путь, делённый на время.', 'Времена разные → берём весь путь и всё время.'], sol: 'времена разные' }
    ]
  };
  const road=(k1,h1,k2,h2)=>`<div style="position:relative;width:100%;max-width:340px;height:56px;background:linear-gradient(180deg,#3a3f45,#23272c);border-radius:10px;overflow:hidden">
    <div style="position:absolute;top:24px;left:0;right:0;height:3px;background:repeating-linear-gradient(90deg,rgba(255,208,90,.7) 0 14px,transparent 14px 28px)"></div>
    <div style="position:absolute;left:6px;top:20px;font-size:22px" class="wv-drive" style="--dx:${Math.round((k1*h1+k2*h2)/10)}px">🚌</div>
  </div>`;
  function visB384(el){
    const step=LV.step||0;
    const card=(k,t,color)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:12px;padding:8px 12px;min-width:92px"><b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">${k}</b><div style="font-size:12px;color:${color};margin-top:2px">${t}</div></div>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Поездка автобуса</div>
        <div style="font-size:52px" class="wv-swing">🚌</div>
        <div class="wv-sml" style="max-width:330px">2 часа по <b style="color:#7fd1ff">40 км/ч</b>, потом 1 час по <b style="color:#8fd1a8">70 км/ч</b>. Какая средняя скорость?</div>
        <div style="background:rgba(232,106,90,.1);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#ffcfc2">это НЕ среднее арифметическое 40 и 70!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Формула пути</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 16px">
          <div style="font-size:19px;color:#e8dcc8">путь = скорость <b style="color:#ffd76a">·</b> время</div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${card('40 км/ч','· 2 часа = 80 км','#7fd1ff')}
          ${card('70 км/ч','· 1 час = 70 км','#8fd1a8')}
        </div>
        <div class="wv-sml">скорость умножаем на время!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Весь путь и всё время</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['путь 1', '40 · 2 = 80 км', '#7fd1ff'],
            ['путь 2', '70 · 1 = 70 км', '#8fd1a8'],
            ['весь путь', '80 + 70 = 150 км', '#ffd76a'],
            ['всё время', '2 + 1 = 3 часа', '#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Делим: 150 : 3</div>
        <div style="display:flex;align-items:center;gap:8px;font-size:24px;color:#e8dcc8;margin:6px 0">
          <b style="color:#ffd76a;font-family:Georgia,serif;font-size:30px">150</b>
          <span style="color:#8fa08f">км :</span>
          <b style="color:#ffd76a;font-family:Georgia,serif;font-size:30px">3</b>
          <span style="color:#8fa08f">ч =</span>
          <b style="color:#8fd1a8;font-family:Georgia,serif;font-size:34px" class="wv-ans">50</b>
        </div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:17px;color:#8fd1a8;font-weight:bold">средняя скорость = 50 км/ч</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ловушка: (40+70):2 = 55 ✘</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center"><div style="font-size:15px;color:#e86a5a;text-decoration:line-through">55 км/ч</div><div style="font-size:11px;color:#8f5a50">неправильно!</div></div>
          <div style="text-align:center"><div style="font-size:15px;color:#8fd1a8;font-weight:bold">50 км/ч ✔</div><div style="font-size:11px;color:#8fa08f">правильно</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="display:inline-block;width:54px;height:16px;background:#7fd1ff;border-radius:3px"></span><span style="color:#8fa08f;font-size:12px">2 часа по 40</span>
          <span style="display:inline-block;width:27px;height:16px;background:#8fd1a8;border-radius:3px"></span><span style="color:#8fa08f;font-size:12px">1 час по 70</span>
        </div>
        <div class="wv-sml">полоски разной длины: медленная езда длилась дольше!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Главная формула</div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #ffd76a;border-radius:14px;padding:10px 16px;max-width:330px;width:100%">
          <div style="font-size:17px;color:#ffd76a;font-weight:bold;text-align:center">средняя скорость = весь путь : всё время</div>
        </div>
        <div class="wv-sml">не усредняй скорости — считай путь и время!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Простой пример</div>
        <div style="display:flex;gap:10px;justify-content:center;margin:4px 0">
          ${card('120 км','весь путь','#ffd76a')}
          ${card('3 часа','всё время','#7fd1ff')}
        </div>
        <div style="font-size:22px;color:#e8dcc8">120 : 3 = <b style="color:#8fd1a8;font-family:Georgia,serif" class="wv-ans">40 км/ч</b></div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Когда можно усреднять?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">если ехать <b style="color:#8fd1a8">одинаковое время</b> — средняя = среднее арифметическое скоростей. У нас времена разные → через путь!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml" style="max-width:320px">2 часа по 40 км/ч и 1 час по 70 км/ч — средняя скорость?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? км/ч</div>
        <div class="wv-sml">подсказка: 150 : 3</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[384]=visB384;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===384){ window.ARH_LESSONS[i]=L384; break; } } })();
})();
/* ================= УРОК 385 · Переливания ================= */
(function(){
  const L385 = {
    id: 385, title: 'Переливания: оптимум', ico: '🪣',
    src: 'Математика · 5–6 класс · Переливания', subj: 'math',
    explain: [
      'Классическая задача! У Архимеда есть полное ведро на 7 литров и пустая банка на 3 литра. Нужно отмерить ровно 1 литр воды. Других ёмкостей нет. Как это сделать? Звучит невозможно, но всего за несколько переливаний — получится!',
      'Шаг 1. В ведре 7 литров. Отливаем из ведра воду в банку (3 литра) до краёв. Теперь в ведре осталось 7 − 3 = 4 литра, а банка полная — 3 литра.',
      'Шаг 2. Выливаем банку полностью (например, в раковину). Банка снова пустая, а в ведре по-прежнему 4 литра.',
      'Шаг 3. Снова отливаем из ведра в банку 3 литра. В ведре осталось 4 − 3 = 1 литр! Вот он, заветный литр — задача решена!',
      'Секрет в записи: 7 − 3 − 3 = 1. Мы дважды «отняли» по 3 литра от полного ведра. Переливания — это просто вычитание объёмов, только с правилом: банка не больше ведра и льём до краёв.',
      'Общий приём: чтобы отмерить маленький объём, отнимай от большого маленький несколько раз, каждый раз выливая накопившееся. Как будто «вычитаем по частям».',
      'Проверим другой пример: ведро 5 л и банка 2 л. Можно ли отмерить 1 л? Конечно! 5 − 2 = 3 (в ведре 3 л), выливаем банку, снова отливаем 2 л: 3 − 2 = 1. Получился 1 литр!',
      'Запомни: задачи на переливания решаются аккуратной последовательностью шагов. Не торопись, следи, сколько воды в каждой ёмкости после каждого действия, — и ответ найдётся!',
      'Теперь проверь себя: в ведре 7 л, отлили в банку 3 л. Сколько литров осталось в ведре?'
    ],
    check: { q: 'Ведро 7 л и банка 3 л: наполнили 7 л и отлили в банку 3 л. Сколько осталось в ведре?', choices: ['4 л', '3 л', '1 л', '5 л'], ans: 0,
      exp: '7 − 3 = 4 л.' },
    tasks: [
      { q: 'После этого банку вылили и снова отлили из ведра 3 л. Сколько осталось в ведре?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Было 4 л.', '4 − 3 = 1 л.'], sol: '1 л' },
      { q: 'Ведро 5 л и банка 2 л. Можно ли отмерить 1 л?', kind: 'choice', choices: ['да', 'нет', 'только 3 л', 'только чётные объёмы'], ans: 0, tol: 0,
        hints: ['5 − 2 − 2 = 1.', 'Отлили 2 л (осталось 3), вылили, отлили ещё 2 → 1 л.'], sol: 'да' }
    ]
  };
  const bucket=(liters,full,label,color)=>{ const h=Math.round(full/liters*90);
    return `<div style="display:flex;flex-direction:column;align-items:center">
      <div style="position:relative;width:52px;height:100px;border:3px solid ${color};border-top:none;border-radius:0 0 8px 8px;background:rgba(255,255,255,.02);overflow:hidden">
        <div style="position:absolute;bottom:0;left:0;right:0;height:${h}px;background:linear-gradient(180deg,rgba(127,209,255,.55),rgba(79,141,255,.65));transition:height .5s"></div>
        <div style="position:absolute;top:${100-h-4}px;left:-3px;right:-3px;height:3px;background:rgba(200,235,255,.8)"></div>
      </div>
      <div style="font-size:12px;color:${color};margin-top:4px">${label}</div>
      <div style="font-size:16px;color:#ffd76a;font-weight:bold">${full} л</div>
    </div>`;
  };
  function visB385(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Задача Архимеда</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end;margin:4px 0">
          ${bucket(7,7,'ведро 7 л','#7fd1ff')}
          ${bucket(3,0,'банка 3 л','#8fd1a8')}
        </div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:12px;padding:8px 14px;max-width:330px;font-size:14px;color:#e8dcc8">нужно отмерить ровно <b style="color:#ffd76a">1 литр</b>! Других ёмкостей нет…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 1: отливаем 3 л</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,4,'в ведре 4 л','#7fd1ff')}
          ${bucket(3,3,'банка полная','#8fd1a8')}
        </div>
        <div class="wv-ans" style="font-size:18px;color:#ffd76a">7 − 3 = 4 л осталось в ведре</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 2: выливаем банку</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,4,'в ведре 4 л','#7fd1ff')}
          ${bucket(3,0,'банка пустая','#8fd1a8')}
        </div>
        <div class="wv-sml">банку вылили — она готова снова набирать!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 3: ещё раз отливаем 3 л!</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,1,'в ведре 1 л!','#ffd76a')}
          ${bucket(3,3,'банка полная','#8fd1a8')}
        </div>
        <div style="background:rgba(127,209,160,.14);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:18px;color:#8fd1a8;font-weight:bold" class="wv-ans">4 − 3 = 1 л — готово!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет в записи</div>
        <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">7 − 3 − 3 = 1</div>
        <div class="wv-sml">дважды отняли по 3 л от полного ведра</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">переливание = <b style="color:#ffd76a">вычитание объёмов</b> · льём до краёв и выливаем лишнее</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Общий приём</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','от большого объёма отнимай маленький'],
            ['2️⃣','накопившееся в банке — выливай'],
            ['3️⃣','повторяй, пока не получится нужный объём']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример: 5 л и 2 л</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(5,5,'ведро 5 л','#7fd1ff')}
          ${bucket(2,0,'банка 2 л','#8fd1a8')}
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:330px;width:100%;font-size:14px;color:#e8dcc8">
          <div class="wv-pop">5 − 2 = 3 л в ведре</div>
          <div class="wv-pop2">вылили банку → снова отливаем 2 л</div>
          <div class="wv-pop2" style="color:#8fd1a8;font-weight:bold">3 − 2 = 1 л — получилось!</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Совет Архимеда</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">не торопись! После каждого действия записывай, сколько воды в каждой ёмкости. Аккуратная цепочка шагов приведёт к ответу!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${bucket(7,4,'ведро','#7fd1ff')}
        <div class="wv-sml">было 7 л, отлили в банку 3 л — сколько осталось?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? л</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[385]=visB385;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===385){ window.ARH_LESSONS[i]=L385; break; } } })();
})();
/* ================= УРОК 386 · Деление с остатком ================= */
(function(){
  const L386 = {
    id: 386, title: 'Деление с остатком: задачи', ico: '🍬',
    src: 'Математика · 5–6 класс · Деление с остатком', subj: 'math',
    explain: [
      'Архимед раскладывает 48 конфет в коробочки по 5 штук. Сколько коробочек получится и сколько конфет останется? Это деление с остатком — когда разделить нацело не получается.',
      'Ищем самое большое число, кратное 5, но не большее 48. Кратные 5: 5, 10, 15… 45. Дальше идёт 50 — уже больше 48. Значит, берём 45. Сколько это коробочек? 45 : 5 = 9.',
      'Теперь считаем остаток: 48 − 45 = 3 конфеты. Итог: 48 : 5 = 9 (остаток 3). Коротко записывают: 48 = 9·5 + 3. Девять полных коробочек и 3 конфеты лишние!',
      'Главное правило деления с остатком: ОСТАТОК ВСЕГДА МЕНЬШЕ ДЕЛИТЕЛЯ! При делении на 5 остаток может быть только 0, 1, 2, 3 или 4. Остаток 5 невозможен — ведь 5 снова уместилось бы в коробочку!',
      'Проверка всегда спасает: частное · делитель + остаток = исходное число. Для 48 : 5: 9 · 5 + 3 = 45 + 3 = 48. Всё сходится! Всегда проверяй себя такой формулой.',
      'Обратная задача: какое наименьшее число при делении на 7 даёт остаток 4? Берём самое маленькое частное — 1: 7·1 + 4 = 11. Проверка: 11 : 7 = 1 (остаток 4). Меньше 11 уже нельзя — 4 само по себе меньше 7!',
      'Ещё пример: найдём наименьшее число, которое при делении на 5 даёт остаток 3. Это 5·1 + 3 = 8. Проверка: 8 : 5 = 1 (остаток 3). Заметь: 3 — это и есть остаток, а 8 = 5 + 3.',
      'В задачах «на остаток» всегда начинай с самого маленького частного (обычно 1) и прибавляй остаток. А если нужны все такие числа — прибавляй делитель: 8, 13, 18…',
      'Теперь проверь себя: чему равны частное и остаток при делении 48 на 5? Вспомни: 48 = 9·5 + 3.'
    ],
    check: { q: 'Чему равны частное и остаток: 48 : 5?', choices: ['9 и 3', '8 и 8', '9 и 5', '10 и 2'], ans: 0,
      exp: '48 = 9·5 + 3 → частное 9, остаток 3.' },
    tasks: [
      { q: 'Какое наименьшее натуральное число при делении на 7 даёт остаток 4?', kind: 'unit', ans: 11, tol: 0,
        hints: ['7·1 + 4.', '11.'], sol: '11' },
      { q: 'Может ли остаток при делении на 5 быть равен 5?', kind: 'choice', choices: ['нет', 'да', 'если число большое', 'иногда'], ans: 0, tol: 0,
        hints: ['Остаток меньше делителя.', 'Остаток всегда меньше 5.'], sol: 'нет' }
    ]
  };
  const candies=(n)=>{ let out='';
    for(let i=0;i<n;i++) out+=`<span style="font-size:15px">🍬</span>`;
    return `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1px;max-width:340px">${out}</div>`;
  };
  const boxRow=(full,rest)=>{ let s=`<div class="wv-row" style="gap:4px;flex-wrap:wrap;margin:6px 0">`;
    for(let i=0;i<full;i++) s+=`<div style="border:1.5px solid #8a6d1e;border-radius:8px;padding:2px 6px;background:rgba(217,164,65,.08);display:flex;gap:1px">${Array.from({length:5},()=>'🍬').join('')}</div>`;
    if(rest>0) s+=`<div style="border:1.5px dashed #e86a5a;border-radius:8px;padding:2px 6px;display:flex;gap:1px">${Array.from({length:rest},()=>'🍬').join('')}</div>`;
    s+=`</div>`; return s;
  };
  function visB386(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">48 конфет по 5 в коробке</div>
        ${candies(48)}
        <div class="wv-sml">сколько коробочек и сколько конфет останется?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Ищем кратное 5</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:340px">
          ${[5,10,15,20,25,30,35,40,45,50].map((n,i)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:34px;border-radius:8px;background:${n<=45?'rgba(143,209,168,.14)':'rgba(232,106,90,.12)'};border:2px solid ${n<=45?'#4c8a5a':'#b0635a'};font-size:15px;color:${n<=45?'#8fd1a8':'#ff9a8a'};font-weight:bold">${n}</span>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">45 — самое большое кратное 5, не большее 48 · 45 : 5 = 9</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Девять коробочек + остаток</div>
        ${boxRow(9,3)}
        <div style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">48 = 9 · 5 + 3</div>
        <div class="wv-sml">9 коробочек по 5 и 3 конфеты лишние</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Главное правило</div>
        <div style="background:rgba(232,106,90,.1);border:2px solid rgba(232,106,90,.5);border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:16px;color:#ffcfc2;text-align:center">остаток <b>всегда меньше делителя</b>!</div>
        </div>
        <div class="wv-sml">делим на 5 → остатки: 0, 1, 2, 3, 4 · остаток 5 невозможен!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка</div>
        <div style="font-size:24px;color:#e8dcc8;font-family:Georgia,serif">9·5 + 3 = 45 + 3 = <b style="color:#8fd1a8" class="wv-ans">48</b></div>
        <div style="background:rgba(127,209,160,.1);border:1px solid #4c8a5a;border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#b8e0c4">частное · делитель + остаток = исходное число — всегда проверяй!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Обратная задача</div>
        <div class="wv-sml">наименьшее число, которое при делении на 7 даёт остаток 4</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">7·1 + 4 = <b class="wv-ans" style="color:#8fd1a8">11</b></div>
        <div class="wv-sml">проверка: 11 : 7 = 1 (остаток 4) ✔</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример</div>
        <div class="wv-sml">наименьшее число с остатком 3 при делении на 5</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">5·1 + 3 = <b class="wv-ans" style="color:#8fd1a8">8</b></div>
        <div class="wv-row" style="gap:4px;margin:4px 0">${[8,13,18,23].map(n=>`<span style="border:1px solid #3d5c49;border-radius:8px;padding:3px 9px;font-size:15px;color:#cfe0cf">${n}</span>`).join('')}</div>
        <div class="wv-sml">дальше прибавляем делитель 5: 8, 13, 18…</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','найди кратное делителя, не большее числа','#7fd1ff'],
            ['2️⃣','частное = сколько раз уместилось','#8fd1a8'],
            ['3️⃣','остаток = число минус это кратное','#ffd76a'],
            ['4️⃣','проверка: частное·делитель + остаток','#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${boxRow(9,3)}
        <div class="wv-sml">48 : 5 — частное и остаток?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? и ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[386]=visB386;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===386){ window.ARH_LESSONS[i]=L386; break; } } })();
})();
/* ================= УРОК 387 · Проценты ================= */
(function(){
  const L387 = {
    id: 387, title: 'Проценты: олимпиадные задачи', ico: '🏷️',
    src: 'Математика · 5–6 класс · Проценты', subj: 'math',
    explain: [
      'В магазине Архимеда цена товара 100 рублей. Сначала цену повысили на 10%, а потом — внимание! — понизили на 10%. Вернулась ли цена к 100 рублям? Интуиция говорит «да», но математика удивит!',
      'Сначала повышение. 10% от 100 рублей — это 10 рублей (ведь 10% = 0,1, а 100·0,1 = 10). Новая цена: 100 + 10 = 110 рублей. Пока всё просто.',
      'Теперь понижение на 10% — но от какой цены? От НОВОЙ, то есть от 110 рублей! 10% от 110 = 110·0,1 = 11 рублей. Новая цена: 110 − 11 = 99 рублей!',
      'Смотри, что получилось: 100 → 110 → 99. Итоговая цена 99 рублей — МЕНЬШЕ исходных 100! Вот это поворот! Проценты считались от разных чисел: повышение от 100, а понижение от 110.',
      'Запомни главное правило: проценты всегда считаются от ТЕКУЩЕЙ величины. После повышения база изменилась, и следующее понижение считается уже от новой цены.',
      'Потренируемся со скидкой: товар стоил 200 рублей, скидка 20%. Сколько стоит теперь? 20% от 200 = 200·0,2 = 40 рублей. Новая цена: 200 − 40 = 160 рублей.',
      'А увеличение на 50%? Увеличить число на 50% — значит прибавить половину, то есть умножить на 1,5. 100 → 150. Запомни: +50% это ×1,5, +25% это ×1,25, +100% это ×2!',
      'Быстрый способ: чтобы найти цену после скидки p%, умножь на (100 − p)/100. После скидки 20%: ×0,8. 200·0,8 = 160. Проверь: 200 − 40 = 160 — сходится!',
      'Теперь проверь себя: цена 100 руб. выросла на 10%, затем упала на 10%. Какая итоговая цена? Вспомни: сначала 110, потом минус 10% от 110.'
    ],
    check: { q: 'Цена 100 руб. выросла на 10%, затем упала на 10%. Итоговая цена?', choices: ['99 руб.', '100 руб.', '110 руб.', '90 руб.'], ans: 0,
      exp: '100+10=110, затем 110−11=99.' },
    tasks: [
      { q: 'Товар стоил 200 руб., скидка 20%. Новая цена?', kind: 'unit', ans: 160, tol: 0,
        hints: ['20% от 200 = 40 руб.', '200 − 40 = 160 руб.'], sol: '160' },
      { q: 'Число увеличили на 50%. Во сколько раз оно выросло?', kind: 'choice', choices: ['в 1,5 раза', 'в 2 раза', 'в 5 раз', 'в 0,5 раза'], ans: 0, tol: 0,
        hints: ['+50% = ×1,5.', '100 → 150 — в 1,5 раза.'], sol: 'в 1,5 раза' }
    ]
  };
  const tag=(price,label,color)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:14px;padding:10px 14px;min-width:86px"><div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">${price}</div><div style="font-size:11px;color:${color}">${label}</div></div>`;
  function visB387(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Загадка магазина</div>
        <div style="display:flex;gap:10px;justify-content:center;align-items:center">
          ${tag('100 ₽','было','#8fd1a8')}
          <span style="font-size:20px;color:#8fa08f">+10% → −10% → ?</span>
        </div>
        <div style="background:rgba(232,106,90,.1);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#ffcfc2">вернётся ли цена к 100 рублям? Сейчас удивимся!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Повышение на 10%</div>
        <div class="wv-row" style="gap:8px">${tag('100 ₽','было','#8fd1a8')}<span style="font-size:20px;color:#8fa08f">+10</span>${tag('110 ₽','стало','#ffd76a')}</div>
        <div class="wv-sml">10% от 100 = 100·0,1 = 10 ₽ · 100 + 10 = 110</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Понижение — от НОВОЙ цены!</div>
        <div class="wv-row" style="gap:8px">${tag('110 ₽','новая база','#ffd76a')}<span style="font-size:20px;color:#8fa08f">−11</span>${tag('99 ₽','итог','#e86a5a')}</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;max-width:330px;font-size:14px;color:#ffcfc2">10% теперь от 110: 110·0,1 = 11 ₽! Не от 100!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сюрприз: 100 → 99</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center">
          ${tag('100 ₽','','#8fd1a8')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('110 ₽','','#ffd76a')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('99 ₽','','#e86a5a')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:12px;padding:8px 12px;max-width:330px;font-size:15px;color:#ffd76a;font-weight:bold" class="wv-ans">99 < 100 — цена упала!</div>
        <div class="wv-sml">проценты считались от разных чисел!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Главное правило</div>
        <div style="background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8;text-align:center">проценты всегда считаются от <b style="color:#7fd1ff">текущей</b> величины</div>
        </div>
        <div class="wv-sml">после повышения база изменилась — дальше считаем от новой!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Скидка 20%</div>
        <div class="wv-row" style="gap:8px">${tag('200 ₽','было','#8fd1a8')}<span style="font-size:20px;color:#8fa08f">−40</span>${tag('160 ₽','стало','#ffd76a')}</div>
        <div class="wv-sml">20% от 200 = 40 ₽ · 200 − 40 = 160</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Увеличение = умножение</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['+50%','×1,5','100 → 150'],
            ['+25%','×1,25','100 → 125'],
            ['+100%','×2','100 → 200']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b><span style="color:#8fa08f;font-size:12.5px">${x[2]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Быстрый способ со скидкой</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">цена после скидки p% = цена <b style="color:#ffd76a">× (100 − p) : 100</b></div>
        </div>
        <div class="wv-row" style="gap:8px">${tag('200 ₽','×0,8','#8fd1a8')}${tag('160 ₽','= 200·0,8','#ffd76a')}</div>
        <div class="wv-sml">скидка 20% → множитель 0,8!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">100 ₽ → +10% → −10% → ?</div>
        <div style="display:flex;align-items:center;gap:6px;justify-content:center">
          ${tag('100 ₽','','#8fd1a8')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('110 ₽','','#ffd76a')}<span style="font-size:18px;color:#8fa08f">→</span><span style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:14px;padding:8px 12px;font-size:22px;color:#ffd76a" class="wv-pulse">? ₽</span>
        </div>
        <div class="wv-sml">минус 10% от 110!</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[387]=visB387;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===387){ window.ARH_LESSONS[i]=L387; break; } } })();
})();
/* ================= УРОК 388 · Разрезания и площади ================= */
(function(){
  const L388 = {
    id: 388, title: 'Разрезания и площади', ico: '✂️',
    src: 'Математика · 5–6 класс · Площади', subj: 'math',
    explain: [
      'Архимед склеил прямоугольник 6 на 4 из бумажных клеток и хочет разрезать его на одинаковые квадраты 2×2. Сколько квадратов получится? Считать по одному долго — посчитаем площадью!',
      'Сначала найдём площадь прямоугольника. Площадь = длина × ширина = 6 · 4 = 24 клетки. Это как посчитать все клетки внутри — их ровно 24.',
      'Теперь площадь одного квадрата 2×2: 2 · 2 = 4 клетки. Каждый такой квадрат занимает 4 клетки.',
      'Делим площадь прямоугольника на площадь квадрата: 24 : 4 = 6. Значит, из прямоугольника 6×4 получится ровно 6 квадратов 2×2! Проверь глазами на картинке.',
      'Почему так? Разрезание не теряет и не создаёт площадь: сумма площадей частей равна площади целого. Поэтому делим общую площадь на площадь одной части — и готово!',
      'Потренируемся со «счётом полосками»: фигура — это 3 полоски по 5 клеток. Площадь = 3 · 5 = 15 клеток. Умножение вместо пересчёта каждой клетки!',
      'А квадрат 5×5: площадь 5 · 5 = 25 клеток. Квадрат — это прямоугольник, у которого стороны равны, поэтому площадь = сторона · сторона.',
      'Запомни формулы: площадь прямоугольника = длина × ширина; площадь квадрата = сторона × сторона. А при разрезании: число частей = площадь целого : площадь части.',
      'Теперь проверь себя: прямоугольник 6×4 разрезали на квадраты 2×2. Сколько квадратов получится? Вспомни: 24 : 4.'
    ],
    check: { q: 'Прямоугольник 6×4 разрезали на квадраты 2×2. Сколько квадратов?', choices: ['6', '8', '12', '24'], ans: 0,
      exp: 'Площадь 6·4=24, квадрат 2·2=4 → 24:4=6.' },
    tasks: [
      { q: 'Площадь фигуры из 3 полосок по 5 клеток?', kind: 'unit', ans: 15, tol: 0,
        hints: ['3 · 5.', '15 клеток.'], sol: '15' },
      { q: 'Сколько квадратиков 1×1 в квадрате 5×5?', kind: 'choice', choices: ['25', '20', '10', '5'], ans: 0, tol: 0,
        hints: ['5 · 5.', '25 квадратиков.'], sol: '25' }
    ]
  };
  const rectCells=(w,h,cell,offX,offY)=>{ let out='';
    for(let r=0;r<h;r++){ for(let c=0;c<w;c++){
      const x=(offX||0)+c*cell, y=(offY||0)+r*cell;
      out+=`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${(r+c)%2?'rgba(127,209,160,.5)':'rgba(127,209,160,.25)'}" stroke="#2c4a38" stroke-width="1"/>`;
    }}
    return out;
  };
  function visB388(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольник 6×4 из клеток</div>
        <svg viewBox="0 0 200 140" style="width:220px;height:154px;background:#101f18;border-radius:10px">${rectCells(6,4,20)}</svg>
        <div class="wv-sml">разрежем на квадраты 2×2 — сколько выйдет?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Площадь прямоугольника</div>
        <svg viewBox="0 0 200 140" style="width:200px;height:140px;background:#101f18;border-radius:10px">
          <rect x="5" y="5" width="120" height="80" fill="rgba(127,209,160,.15)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="65" y="50" text-anchor="middle" font-size="15" fill="#ffd76a">6</text>
          <text x="70" y="112" text-anchor="middle" font-size="15" fill="#ffd76a">4</text>
          <line x1="5" y1="45" x2="125" y2="45" stroke="#8fd1a8" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line x1="68" y1="5" x2="68" y2="85" stroke="#8fd1a8" stroke-width="1.5" stroke-dasharray="4 3"/>
        </svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">площадь = 6 · 4 = 24 клетки</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат 2×2</div>
        <svg viewBox="0 0 100 100" style="width:110px;height:110px;background:#101f18;border-radius:10px">
          <rect x="10" y="10" width="80" height="80" fill="rgba(217,164,65,.2)" stroke="#d9a441" stroke-width="2"/>
          <line x1="10" y1="50" x2="90" y2="50" stroke="#d9a441" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#d9a441" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="50" y="48" text-anchor="middle" font-size="13" fill="#ffd76a">2</text>
          <text x="72" y="96" text-anchor="middle" font-size="13" fill="#ffd76a">2</text>
        </svg>
        <div class="wv-sml">площадь квадрата = 2 · 2 = 4 клетки</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Делим: 24 : 4</div>
        <svg viewBox="0 0 200 140" style="width:220px;height:154px;background:#101f18;border-radius:10px">
          ${rectCells(6,4,20)}
          <g stroke="#ffd76a" stroke-width="3">
            <line x1="40" y1="0" x2="40" y2="80"/><line x1="80" y1="0" x2="80" y2="80"/><line x1="120" y1="0" x2="120" y2="80"/>
            <line x1="0" y1="40" x2="160" y2="40"/>
          </g>
        </svg>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">24 : 4 = 6 квадратов!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет: площадь сохраняется</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.55">разрезание <b style="color:#ffd76a">не теряет и не создаёт</b> площадь: сумма площадей частей = площадь целого</div>
        <div class="wv-sml">поэтому: число частей = площадь целого : площадь части</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем полосками</div>
        <svg viewBox="0 0 200 140" style="width:200px;height:140px;background:#101f18;border-radius:10px">
          <rect x="5" y="5" width="160" height="20" fill="rgba(127,209,160,.3)" stroke="#8fd1a8" stroke-width="1.5"/>
          <rect x="5" y="27" width="160" height="20" fill="rgba(127,209,160,.5)" stroke="#8fd1a8" stroke-width="1.5"/>
          <rect x="5" y="49" width="160" height="20" fill="rgba(127,209,160,.3)" stroke="#8fd1a8" stroke-width="1.5"/>
          <text x="85" y="20" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
          <text x="85" y="42" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
          <text x="85" y="64" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
        </svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">3 полоски по 5 = 3 · 5 = 15</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат 5×5</div>
        <svg viewBox="0 0 130 130" style="width:130px;height:130px;background:#101f18;border-radius:10px">${rectCells(5,5,20,5,5)}</svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">5 · 5 = 25 квадратиков</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка формул</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['площадь прямоугольника','длина × ширина','▭','#8fd1a8'],
            ['площадь квадрата','сторона × сторона','⬜','#7fd1ff'],
            ['число частей при разрезании','площадь целого : площадь части','✂️','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[3]};border-radius:9px;padding:7px 12px;text-align:left;font-size:13.5px;color:#e8dcc8"><span style="font-size:20px">${x[2]}</span><span><b style="color:${x[3]}">${x[0]}</b> = ${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">прямоугольник 6×4 → квадраты 2×2 — сколько?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">24 : 4 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[388]=visB388;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===388){ window.ARH_LESSONS[i]=L388; break; } } })();
})();
/* ================= УРОК 389 · Углы и треугольники ================= */
(function(){
  const L389 = {
    id: 389, title: 'Углы и треугольники: приёмы', ico: '📐',
    src: 'Математика · 5–6 класс · Треугольники', subj: 'math',
    explain: [
      'Архимед строит шалаш треугольной формы. Один угол — 40° у вершины. А какие углы у основания, если шалаш симметричный (равнобедренный)? Чтобы ответить, нужно знать главный секрет треугольников!',
      'Главный секрет: сумма углов ЛЮБОГО треугольника равна 180 градусам. Это как развёрнутый угол — половина полного круга. Проверь на любом треугольнике: сложи все три угла — всегда получишь 180°!',
      'Почему так? Отрежь углы треугольника и сложи их вместе — они составят ровно развёрнутый угол 180°. Можно проверить на бумаге: вырежи треугольник, оторви уголки и приложи друг к другу!',
      'Если знаешь два угла, третий находим вычитанием: третий = 180° − первый − второй. Например, углы 90° и 45°: третий = 180 − 90 − 45 = 45°. Вот и всё!',
      'Вернёмся к шалашу. Он равнобедренный: две стороны равны. А у равнобедренного треугольника углы при ОСНОВАНИИ тоже равны! Это очень удобное свойство.',
      'Итак, угол при вершине 40°. Сумма двух углов при основании: 180 − 40 = 140°. А раз они равны, каждый = 140 : 2 = 70°. Углы шалаша при основании — по 70 градусов!',
      'Равносторонний треугольник — ещё проще: все три стороны равны, значит, и все углы равны. Каждый угол = 180 : 3 = 60°. Поэтому равносторонний называют ещё «правильным».',
      'Прямоугольный треугольник: один угол 90°. Тогда два других в сумме дают 90° (ведь 180 − 90 = 90). Если один из них 45°, то и второй 45° — такой треугольник равнобедренный!',
      'Теперь проверь себя: чему равна сумма углов любого треугольника? Вспомни главный секрет — 180 градусов!'
    ],
    check: { q: 'Чему равна сумма углов треугольника?', choices: ['180°', '90°', '360°', '100°'], ans: 0,
      exp: 'Сумма углов любого треугольника — 180°.' },
    tasks: [
      { q: 'У равнобедренного треугольника угол при вершине 40°. Чему равен угол при основании?', kind: 'unit', ans: 70, tol: 0,
        hints: ['(180 − 40) : 2.', '140 : 2 = 70°.'], sol: '70°' },
      { q: 'Углы треугольника 90° и 45°. Чему равен третий?', kind: 'choice', choices: ['45°', '90°', '135°', '55°'], ans: 0, tol: 0,
        hints: ['180 − 90 − 45.', '45°.'], sol: '45°' }
    ]
  };
  const triSVG=(top,left,right,cls)=>`<svg viewBox="0 0 180 150" style="width:${cls==='big'?210:170}px;height:${cls==='big'?175:141}px">
    <polygon points="90,10 20,140 160,140" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.5"/>
    <path d="M90 10 L112 40 A 44 44 0 0 1 84 42 Z" fill="rgba(255,215,106,.4)"/>
    <text x="96" y="22" font-size="13" fill="#ffd76a">${top}°</text>
    <text x="38" y="130" font-size="13" fill="#8fd1a8">${left}°</text>
    <text x="140" y="130" font-size="13" fill="#8fd1a8">${right}°</text>
  </svg>`;
  function visB389(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Шалаш Архимеда</div>
        <div style="font-size:60px" class="wv-swing">⛺</div>
        <div class="wv-sml" style="max-width:330px">симметричный шалаш = <b style="color:#ffd76a">равнобедренный треугольник</b>: две стороны равны. Угол наверху 40° — какие углы внизу?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Главный секрет: 180°</div>
        ${triSVG(50,60,70,'')}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:9px 14px;font-size:18px;color:#ffd76a;font-weight:bold">50° + 60° + 70° = 180°</div>
        <div class="wv-sml">сумма углов любого треугольника — 180°!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так? Оторви уголки!</div>
        <div style="display:flex;gap:10px;justify-content:center;align-items:center">
          <div style="font-size:44px" class="wv-flick">✂️</div>
          <div style="display:flex;gap:2px">
            <span style="width:44px;height:44px;background:rgba(127,209,255,.5);clip-path:polygon(0 0,100% 100%,0 100%);display:inline-block"></span>
            <span style="width:44px;height:44px;background:rgba(143,209,168,.5);clip-path:polygon(0 0,100% 0,100% 100%);display:inline-block"></span>
            <span style="width:44px;height:44px;background:rgba(232,106,90,.5);clip-path:polygon(100% 0,100% 100%,0 100%);display:inline-block"></span>
          </div>
        </div>
        <div class="wv-sml">оторванные уголки вместе дают ровно развёрнутый угол — 180°</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Находим третий угол</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">третий = 180° − первый − второй</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['углы 90° и 45°', '180 − 90 − 45 = 45°', '#8fd1a8'],
            ['углы 70° и 50°', '180 − 70 − 50 = 60°', '#7fd1ff']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Равнобедренный треугольник</div>
        <div style="display:flex;align-items:center;gap:12px">
          <svg viewBox="0 0 150 140" style="width:150px;height:140px">
            <polygon points="75,10 20,130 130,130" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.5"/>
            <line x1="20" y1="130" x2="130" y2="130" stroke="#ffd76a" stroke-width="3"/>
            <text x="45" y="140" font-size="12" fill="#8fd1a8">равные</text>
            <text x="112" y="140" font-size="12" fill="#8fd1a8">стороны</text>
          </svg>
          <div style="text-align:left;font-size:14px;color:#e8dcc8;max-width:190px;line-height:1.55">у равнобедренного треугольника <b style="color:#8fd1a8">углы при основании равны</b></div>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем шалаш: вершина 40°</div>
        <svg viewBox="0 0 180 150" style="width:180px;height:150px">
          <polygon points="90,10 20,140 160,140" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.5"/>
          <text x="96" y="26" font-size="15" fill="#ffd76a">40°</text>
          <text x="70" y="135" font-size="15" fill="#8fd1a8">?°</text>
          <text x="150" y="135" font-size="15" fill="#8fd1a8">?°</text>
        </svg>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;font-size:15px;color:#e8dcc8">
          <div class="wv-pop">180 − 40 = 140° — на два угла вместе</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">140 : 2 = 70° каждый</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Равносторонний — «правильный»</div>
        <div style="display:flex;gap:10px;align-items:center;justify-content:center">
          <svg viewBox="0 0 140 130" style="width:150px;height:139px">
            <polygon points="70,10 10,125 130,125" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.5"/>
            <text x="70" y="28" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
            <text x="34" y="118" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
            <text x="106" y="118" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
          </svg>
        </div>
        <div class="wv-sml">все стороны равны → все углы по 180:3 = 60°</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольный треугольник</div>
        <div style="display:flex;gap:8px;justify-content:center">
          <svg viewBox="0 0 150 130" style="width:160px;height:139px">
            <polygon points="20,115 130,115 20,20" fill="rgba(232,106,90,.1)" stroke="#e86a5a" stroke-width="2.5"/>
            <path d="M20 115 L32 115 L32 103 Z" fill="#e86a5a"/>
            <text x="90" y="130" font-size="13" fill="#e86a5a">90°</text>
            <text x="26" y="40" font-size="13" fill="#ffd76a">45°</text>
            <text x="120" y="105" font-size="13" fill="#8fd1a8">45°</text>
          </svg>
        </div>
        <div class="wv-sml">90° + 45° + 45° = 180° · острые углы в сумме 90°</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;gap:10px;justify-content:center">
          ${['🔺','📐','⛺'].map(e=>`<span style="font-size:40px" class="wv-pulse">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">сумма углов любого треугольника?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? °</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[389]=visB389;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===389){ window.ARH_LESSONS[i]=L389; break; } } })();
})();
/* ================= УРОК 390 · Правило произведения ================= */
(function(){
  const L390 = {
    id: 390, title: 'Правило произведения: задачи', ico: '👔',
    src: 'Математика · 5–6 класс · Комбинаторика', subj: 'math',
    explain: [
      'Архимед собирается на праздник. У него 4 рубашки и 3 галстука. Сколько разных комплектов «рубашка + галстук» можно собрать? Перебирать долго — комбинаторика даёт быстрый ответ!',
      'Представь дерево выбора. Из каждой рубашки выходят 3 веточки — по одной на каждый галстук. Рубашек 4, значит, веточек всего 4 · 3 = 12. Каждая веточка — свой комплект!',
      'Это и есть ПРАВИЛО ПРОИЗВЕДЕНИЯ: если первый выбор можно сделать m способами, а второй — n способами, то вместе m · n способов. Выборы независимы — перемножаем!',
      'Теперь задача с цифрами. Сколько двузначных чисел начинается с цифры 5? Первая цифра уже выбрана — это 5 (1 способ). Вторая цифра — любая из десяти: 0, 1, 2, …, 9 (10 способов). Итого 1 · 10 = 10 чисел: 50, 51, …, 59.',
      'Сложнее: из города А в город Б ведут 3 дороги, из Б в В — 2 дороги, из В в Г — 4 дороги. Сколько маршрутов из А в Г? Каждый участок выбираем независимо: 3 · 2 · 4 = 24 маршрута!',
      'Правило работает для ЛЮБОГО числа шагов: перемножай количества вариантов на каждом шаге. 3 шага → три множителя: 3 · 2 · 4. Десять шагов → десять множителей!',
      'Проверим на меню: 3 супа, 4 вторых, 2 десерта. Комплексный обед (суп + второе + десерт): 3 · 4 · 2 = 24 варианта! Каждый день можно есть новый — почти месяц!',
      'Запомни: правило произведения применяется, когда выборы НЕЗАВИСИМЫ — результат первого выбора не влияет на число вариантов второго. Тогда просто перемножай!',
      'Теперь проверь себя: 4 рубашки и 3 галстука — сколько комплектов? Вспомни: 4 · 3.'
    ],
    check: { q: '4 рубашки и 3 галстука. Сколько комплектов «рубашка + галстук»?', choices: ['12', '7', '34', '43'], ans: 0,
      exp: '4 · 3 = 12.' },
    tasks: [
      { q: 'Сколько двузначных чисел начинается с цифры 5?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Вторая цифра — любая из 10.', '50…59 — 10 чисел.'], sol: '10' },
      { q: 'Из А в Б 3 дороги, из Б в В 2, из В в Г 4. Сколько маршрутов А→Г?', kind: 'choice', choices: ['24', '9', '12', '6'], ans: 0, tol: 0,
        hints: ['Перемножаем.', '3 · 2 · 4 = 24.'], sol: '24' }
    ]
  };
  const treeSVG=(branches)=>`<svg viewBox="0 0 200 160" style="width:${branches===4?230:200}px">
    <circle cx="100" cy="16" r="13" fill="#e86a5a"/><text x="100" y="21" text-anchor="middle" font-size="11" fill="#fff">👕</text>
    <g stroke="#d9a441" stroke-width="2.5">
      ${Array.from({length:branches},(_,i)=>{const x1=70+i*20,y1=40,x2=40+i*40,y2=120;
        return `<line x1="100" y1="29" x2="${x1+20}" y2="${y1}" />`;}).join('')}
    </g>
    <g font-size="16">
      ${Array.from({length:branches},(_,i)=>{const x=40+i*40,y=130; return `<text x="${x}" y="${y}">👔</text>`;}).join('')}
    </g>
  </svg>`;
  function visB390(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Гардероб Архимеда</div>
        <div style="font-size:52px" class="wv-swing">👔</div>
        <div class="wv-sml">4 рубашки и 3 галстука — сколько комплектов?</div>
        <div class="wv-row" style="gap:4px;margin:4px 0">${['👕','👕','👕','👕'].join('')}</div>
        <div class="wv-row" style="gap:4px">${['👔','👔','👔'].join('')}</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Дерево выбора</div>
        ${treeSVG(3)}
        <div class="wv-sml">каждая рубашка сочетается с каждым галстуком</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Правило произведения</div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15px;line-height:1.55;color:#e8dcc8;text-align:center">первый выбор — <b style="color:#7fd1ff">m</b> способов, второй — <b style="color:#8fd1a8">n</b> → вместе <b style="color:#ffd76a">m · n</b></div>
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">4 · 3 = 12 комплектов</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Двузначные с цифры 5</div>
        <div class="wv-row" style="gap:6px;margin:4px 0">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:44px;border-radius:9px;background:rgba(217,164,65,.2);border:2px solid #d9a441;font-size:22px;color:#ffd76a;font-weight:bold">5</span>
          <span style="font-size:22px;color:#8fa08f">+</span>
          <span style="display:inline-flex;align-items:center;justify-content:center;width:46px;height:44px;border-radius:9px;background:rgba(127,209,255,.14);border:2px solid #7fd1ff;font-size:20px;color:#7fd1ff;font-weight:bold">0–9</span>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">1 · 10 = 10 чисел: 50, 51, …, 59</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Маршруты А → Б → В → Г</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:26px">
          <span style="background:rgba(127,209,255,.14);border:2px solid #7fd1ff;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#7fd1ff">А</span>
          <b style="color:#ffd76a">3</b>
          <span style="background:rgba(143,209,168,.14);border:2px solid #8fd1a8;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#8fd1a8">Б</span>
          <b style="color:#ffd76a">2</b>
          <span style="background:rgba(255,215,106,.14);border:2px solid #ffd76a;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#ffd76a">В</span>
          <b style="color:#ffd76a">4</b>
          <span style="background:rgba(232,160,90,.14);border:2px solid #e8a05a;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#e8a05a">Г</span>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#ffd76a">3 · 2 · 4 = 24 маршрута</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Сколько шагов — столько множителей</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['2 шага', 'm · n'],
            ['3 шага', 'm · n · k'],
            ['10 шагов', 'десять множителей!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#ffd76a">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Комплексный обед</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          ${[['🍲','3 супа'],['🍗','4 вторых'],['🍰','2 десерта']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px"><div style="font-size:26px">${x[0]}</div><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">3 · 4 · 2 = 24 обеда!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Когда применять</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">правило работает, когда выборы <b style="color:#8fd1a8">независимы</b>: первый выбор не меняет число вариантов второго → просто <b style="color:#ffd76a">перемножай!</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:4px">${['👕','👕','👕','👕'].join('')}</div>
        <div class="wv-row" style="gap:4px">${['👔','👔','👔'].join('')}</div>
        <div class="wv-sml">сколько комплектов рубашка + галстук?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">4 · 3 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[390]=visB390;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===390){ window.ARH_LESSONS[i]=L390; break; } } })();
})();
/* ================= УРОК 391 · Игры и стратегии ================= */
(function(){
  const L391 = {
    id: 391, title: 'Игры и стратегии: анализ с конца', ico: '🎯',
    src: 'Математика · 5–6 класс · Игры', subj: 'math',
    explain: [
      'На столе 20 предметов. Двое по очереди берут от 1 до 3 предметов. Выигрывает тот, кто взял последний предмет. Можно ли гарантировать победу? Да — есть хитрая стратегия!',
      'Секрет — анализировать игру С КОНЦА. Спроси себя: какую позицию выгодно оставить противнику перед его ходом, чтобы он точно проиграл?',
      'Ловушка: если оставить противнику ровно 4 предмета, он обречён! Что бы он ни взял (1, 2 или 3), ты забираешь все оставшиеся: 4−1=3, 4−2=2, 4−3=1. Последний предмет — твой!',
      'Раз 4 — ловушка, то и 8, 12, 16, 20 — тоже ловушки! Ведь если противник оставляет тебе 8, ты берёшь столько, чтобы оставить ему 4, и так далее. Все позиции, кратные 4, — выигрышные для тебя.',
      'В нашей игре 20 предметов. 20 = 4 · 5 — это позиция-ловушка для ТОГО, кто ходит первым! Значит, при правильной игре выигрывает ВТОРОЙ игрок.',
      'Стратегия второго: что бы ни взял первый (1, 2 или 3), второй дополняет ход до 4. Взял 1 — дополни до 4 (возьми 3). Взял 2 — возьми 2. Взял 3 — возьми 1. После каждой пары ходов уходит ровно 4 предмета!',
      'Проверим: 20 → первый берёт 2 → осталось 18. Второй берёт 2 (2+2=4) → 16. Первый берёт 3 → 13. Второй берёт 1 → 12. И так далее… последние 4 предмета останутся первому — и он проиграет!',
      'Запомни рецепт: 1) найди «ловушку» — позицию, с которой противник обречён (4); 2) все кратные ловушки тоже выигрышные; 3) в каждом своём ходе дополняй ход противника до ловушки.',
      'Теперь проверь себя: 20 предметов, берут 1–3, выигрывает взявший последний. Кто выиграет при правильной игре? Подсказка: 20 кратно 4!'
    ],
    check: { q: '20 предметов, за ход берут 1–3, выигрывает взявший последний. Кто выиграет при правильной игре?', choices: ['второй', 'первый', 'ничья', 'нельзя узнать'], ans: 0,
      exp: '20 кратно 4 — ловушка для первого → выигрывает второй.' },
    tasks: [
      { q: 'В игре «берут 1–3, дополняй до 4» сколько предметов выгодно оставить противнику?', kind: 'unit', ans: 4, tol: 0,
        hints: ['Это «ловушка».', 'Позиция, кратная 4: 4 предмета.'], sol: '4' },
      { q: 'Противник оставил 4 предмета и взял 2. Сколько взять, чтобы выиграть?', kind: 'choice', choices: ['2', '1', '3', '4'], ans: 0, tol: 0,
        hints: ['4 − 2 = 2.', 'Забираем 2 — последние предметы.'], sol: '2' }
    ]
  };
  const dotsRow=(n,highlight)=>`<div class="wv-row" style="gap:4px;margin:6px 0">${Array.from({length:n},(_,i)=>`<span style="width:13px;height:13px;border-radius:50%;background:${highlight===i?'#ffd76a':'rgba(127,209,160,.55)'};box-shadow:${highlight===i?'0 0 8px rgba(255,215,106,.8)':'none'};display:inline-block"></span>`).join('')}</div>`;
  function visB391(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Игра: 20 предметов</div>
        ${dotsRow(20)}
        <div class="wv-sml">берут от 1 до 3 · кто взял последний — победил!</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">можно ли гарантировать победу? Да! Анализируем с конца…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Анализ с конца</div>
        <div style="font-size:40px" class="wv-swing">🔍</div>
        <div class="wv-sml" style="max-width:330px">не смотри на начало игры — спроси: какую позицию выгодно <b style="color:#ffd76a">оставить противнику</b> перед его ходом?</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Ловушка: 4 предмета</div>
        ${dotsRow(4,3)}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['противник взял 1', 'ты забираешь 3 — победа!'],
            ['противник взял 2', 'ты забираешь 2 — победа!'],
            ['противник взял 3', 'ты забираешь 1 — победа!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i===2?'#4c8a5a':'#d9a441'};border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b></div>`).join('')}
        </div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:7px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">4 — смертельная ловушка!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Кратные 4 — тоже ловушки</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[4,8,12,16,20].map((n,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:5px 12px"><b style="font-size:19px;color:#ffd76a;font-family:Georgia,serif">${n}</b><span style="font-size:12px;color:#8fa08f">= ${n/4}·4 — ловушка</span></div>`).join('')}
        </div>
        <div class="wv-sml">оставь противнику 4 → потом 8 → потом 12…</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">20 = 4 · 5</div>
        ${dotsRow(20)}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:9px 12px;font-size:16px;color:#ffd76a;font-weight:bold" class="wv-ans">20 кратно 4 → ловушка для ПЕРВОГО → выигрывает ВТОРОЙ!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Стратегия второго</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['первый взял 1','второй берёт 3','1+3=4'],
            ['первый взял 2','второй берёт 2','2+2=4'],
            ['первый взял 3','второй берёт 1','3+1=4']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b><span style="color:#ffd76a">${x[2]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">каждая пара ходов забирает ровно 4 предмета — «дополняй до 4»!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем на числах</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">20 → первый −2 → 18</div>
          <div class="wv-pop2" style="color:#8fd1a8">второй −2 → 16 (2+2=4)</div>
          <div class="wv-pop">16 → первый −3 → 13</div>
          <div class="wv-pop2" style="color:#8fd1a8">второй −1 → 12 (3+1=4)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">… последние 4 — первому → он проиграл!</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Рецепт победы</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','найди «ловушку» — обречённую позицию (4)','#7fd1ff'],
            ['2️⃣','все кратные ловушки — выигрышные','#8fd1a8'],
            ['3️⃣','дополняй ход противника до ловушки','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${dotsRow(20)}
        <div class="wv-sml">20 предметов, берут 1–3, выигрывает взявший последний. Кто победит?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">первый или второй?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[391]=visB391;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===391){ window.ARH_LESSONS[i]=L391; break; } } })();
})();
/* ================= УРОК 392 · Эйлеровы пути ================= */
(function(){
  const L392 = {
    id: 392, title: 'Эйлеровы пути: одним росчерком', ico: '✏️',
    src: 'Математика · 5–6 класс · Графы', subj: 'math',
    explain: [
      'Можно ли нарисовать фигуру одним росчерком — не отрывая карандаша и не проходя по одной линии дважды? Архимед любит такие головоломки! Оказывается, ответ даёт красивое правило, найденное Эйлером.',
      'Назовём точки, где сходятся линии, ВЕРШИНАМИ. Степень вершины — сколько линий из неё выходит. Например, у квадрата каждая вершина соединяет 2 линии — степень 2 (чётная).',
      'Теперь главное правило Эйлера: фигуру можно нарисовать одним росчерком, если в ней 0 или 2 вершины НЕЧЁТНОЙ степени. Если нечётных вершин больше двух — одним росчерком не выйдет!',
      'Почему? Входя в вершину и выходя из неё, мы «тратим» по 2 линии. Остаться «неиспользованной» может только линия в начале и в конце пути — значит, нечётных вершин максимум две.',
      'Проверим на квадрате с диагональю. Без диагонали все степени 2. Диагональ добавляет по одному ребру двум вершинам — их степени становятся 3 (нечётные). Нечётных вершин ровно 2 → нарисовать можно!',
      'С чего начать? Если нечётных вершин две — начинай с одной из них и закончишь в другой. Если нечётных нет — можно начинать с любой вершины и вернёшься в неё же.',
      'А теперь «плюс» — 4 луча из центра. Центр имеет степень 4 (чётная), а четыре конца лучей — степень 1 (нечётная). Нечётных вершин четыре! Правило говорит: одним росчерком НЕ получится.',
      'Проверь сам: конверт (прямоугольник с двумя диагоналями «X») — у него 4 вершины степени 3 (нечётные) → одним росчерком нельзя. А «домик» без крыши-перекладины — можно!',
      'Теперь проверь себя: сколько вершин нечётной степени может иметь фигура, которую рисуют одним росчерком? Вспомни правило Эйлера: 0 или 2!'
    ],
    check: { q: 'Сколько вершин нечётной степени может иметь граф, который рисуется одним росчерком?', choices: ['0 или 2', 'только 2', 'только 0', 'сколько угодно'], ans: 0,
      exp: 'Правило Эйлера: 0 или 2 нечётные вершины.' },
    tasks: [
      { q: 'Сколько нечётных вершин у квадрата с одной диагональю?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Диагональ добавляет ребро двум вершинам.', 'У двух вершин степень 3 → две нечётные.'], sol: '2' },
      { q: 'Можно ли нарисовать «плюс» (4 луча из центра) одним росчерком?', kind: 'choice', choices: ['нет', 'да', 'только за 2 прохода', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['4 нечётные вершины.', '4 > 2 → одним росчерком нельзя.'], sol: 'нет' }
    ]
  };
  const figSVG=(kind)=>`<svg viewBox="0 0 190 150" style="width:200px;height:158px;background:#101f18;border-radius:12px">
    ${kind==='sq'?`<rect x="30" y="30" width="120" height="90" fill="none" stroke="#8fd1a8" stroke-width="3"/>
      <circle cx="30" cy="30" r="5" fill="#7fd1ff"/><circle cx="150" cy="30" r="5" fill="#7fd1ff"/>
      <circle cx="30" cy="120" r="5" fill="#7fd1ff"/><circle cx="150" cy="120" r="5" fill="#7fd1ff"/>`:
    kind==='sqd'?`<rect x="30" y="30" width="120" height="90" fill="none" stroke="#8fd1a8" stroke-width="3"/>
      <line x1="30" y1="30" x2="150" y2="120" stroke="#ffd76a" stroke-width="3"/>
      <circle cx="30" cy="30" r="6" fill="#ff9a8a"/><circle cx="150" cy="120" r="6" fill="#ff9a8a"/>
      <circle cx="150" cy="30" r="5" fill="#7fd1ff"/><circle cx="30" cy="120" r="5" fill="#7fd1ff"/>`:
    kind==='plus'?`<line x1="95" y1="20" x2="95" y2="130" stroke="#8fd1a8" stroke-width="5"/><line x1="40" y1="75" x2="150" y2="75" stroke="#8fd1a8" stroke-width="5"/>
      <circle cx="95" cy="20" r="6" fill="#ff9a8a"/><circle cx="95" cy="130" r="6" fill="#ff9a8a"/><circle cx="40" cy="75" r="6" fill="#ff9a8a"/><circle cx="150" cy="75" r="6" fill="#ff9a8a"/>`:''}
  </svg>`;
  function visB392(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Одним росчерком?</div>
        <div style="font-size:50px" class="wv-swing">✏️</div>
        <div class="wv-sml" style="max-width:330px">нарисовать фигуру, не отрывая карандаша и не проводя линию дважды — можно? Эйлер нашёл правило!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Вершины и степени</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['квадрат','4 вершины по 2 линии — степень 2','#8fd1a8'],['квадрат с диагональю','2 вершины по 3 линии — степень 3','#ff9a8a']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:10px;padding:6px 10px;max-width:150px"><b style="font-size:12.5px;color:${x[2]}">${x[0]}</b><div style="font-size:10.5px;color:#8fa08f;margin-top:2px">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">степень вершины = сколько линий из неё выходит</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Правило Эйлера</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">одним росчерком можно, если нечётных вершин <b style="color:#ffd76a">0 или 2</b></div>
        </div>
        <div class="wv-sml">больше двух нечётных → нельзя!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">входя в вершину и выходя из неё, мы тратим <b style="color:#8fd1a8">по 2 линии</b>. «Неиспользованной» остаётся линия только в начале и в конце пути → нечётных вершин <b style="color:#ffd76a">не больше двух</b>.</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат с диагональю</div>
        ${figSVG('sqd')}
        <div class="wv-sml">диагональ добавила по ребру двум вершинам → степени 3 (красные)</div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">нечётных ровно 2 → нарисовать МОЖНО!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">С чего начать?</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['2 нечётные', 'начинай с одной — закончишь в другой'],
            ['0 нечётных', 'начинай с любой — вернёшься в неё же']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i?'#7fd1ff':'#8fd1a8'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${i?'#7fd1ff':'#8fd1a8'}">${x[0]}</b><span style="max-width:220px;text-align:right">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">«Плюс» — не получится!</div>
        ${figSVG('plus')}
        <div class="wv-sml">центр — степень 4 (чётная), но 4 конца лучей — степень 1</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">4 нечётные > 2 → одним росчерком НЕЛЬЗЯ</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Тренируемся</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['конверт (2 диагонали X)','4 вершины степени 3 → нельзя','#e86a5a'],
            ['домик без перекладины','0 нечётных → можно!','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">сколько нечётных вершин допускает росчерк?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">0 или ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[392]=visB392;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===392){ window.ARH_LESSONS[i]=L392; break; } } })();
})();
/* ================= УРОК 393 · Формула Пика ================= */
(function(){
  const L393 = {
    id: 393, title: 'Формула Пика', ico: '📏',
    src: 'Математика · 5–6 класс · Формула Пика', subj: 'math',
    explain: [
      'На клетчатой бумаге нарисована фигура с вершинами в узлах сетки. Как найти её площадь, если считать клетки неудобно? Есть волшебная формула Пика — она считает площадь по точкам-узлам!',
      'Что такое узлы? Это точки пересечения линий сетки. Они бывают двух видов: В — узлы ВНУТРИ фигуры, и Г — узлы на ГРАНИЦЕ фигуры. Именно их количество и нужно посчитать.',
      'Считаем В — узлы внутри. На нашей фигуре внутри 5 узлов: В = 5. Считаем Г — узлы на границе (по контуру): Г = 4. Запомни эти два числа.',
      'Формула Пика: площадь S = В + Г/2 − 1. Подставляем: S = 5 + 4/2 − 1 = 5 + 2 − 1 = 6. Площадь равна 6 клеткам! Проверь подсчётом клеток — сойдётся!',
      'Почему в формуле −1? Математики доказали: если у фигуры нет дырок и вершины в узлах, то «половинки» граничных узлов и целые внутренние складываются так, что остаётся минус одна клетка. Формула работает всегда!',
      'Ещё пример: В = 3, Г = 4. Считаем: S = 3 + 4/2 − 1 = 3 + 2 − 1 = 4. Площадь 4 клетки. Попробуй нарисовать такую фигуру и проверить!',
      'А если В = 0, Г = 4? Это треугольник без внутренних узлов: S = 0 + 2 − 1 = 1. Прямоугольный треугольник на 2 клетки? Нет — это треугольник площадью 1, например с вершинами (0,0), (1,0), (0,2)... проверь!',
      'Запомни формулу Пика навсегда: S = В + Г/2 − 1. В — узлы внутри, Г — узлы на границе. Она спасает на олимпиадах, когда фигура кривая, а считать надо точно!',
      'Теперь проверь себя: В = 3, Г = 4. Чему равна площадь по формуле Пика? Подставь в формулу: 3 + 4/2 − 1.'
    ],
    check: { q: 'В = 3, Г = 4. Чему равна площадь по формуле Пика?', choices: ['4', '5', '6', '7'], ans: 0,
      exp: '3 + 4/2 − 1 = 3 + 2 − 1 = 4.' },
    tasks: [
      { q: 'В = 5, Г = 4. Площадь?', kind: 'unit', ans: 6, tol: 0,
        hints: ['5 + 2 − 1.', '6.'], sol: '6' },
      { q: 'Что обозначает В в формуле Пика?', kind: 'choice', choices: ['узлы сетки внутри фигуры', 'узлы на границе', 'клетки внутри', 'стороны фигуры'], ans: 0, tol: 0,
        hints: ['В — внутри (внутренние).', 'Внутренние узлы.'], sol: 'узлы внутри' }
    ]
  };
  const pickFig=(shape)=>`<svg viewBox="0 0 200 160" style="width:220px;height:176px;background:#eef3e2;border-radius:10px">
    ${(()=>{ let g=''; for(let i=0;i<=9;i++){ g+=`<line x1="${10+i*18}" y1="8" x2="${10+i*18}" y2="152" stroke="#c9d4b8" stroke-width="1"/>`; g+=`<line x1="8" y1="${10+i*18}" x2="182" y2="${10+i*18}" stroke="#c9d4b8" stroke-width="1"/>`; } return g; })()}
    ${shape==='hex'?`<polygon points="64,28 118,28 146,82 118,136 64,136 36,82" fill="rgba(127,209,255,.22)" stroke="#2f6f9f" stroke-width="2.5"/>`:
      shape==='tri'?`<polygon points="46,118 100,46 154,118" fill="rgba(143,209,168,.25)" stroke="#2f7a4a" stroke-width="2.5"/>`:''}
  </svg>`;
  function visB393(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Площадь на клетчатой бумаге</div>
        <div style="font-size:50px" class="wv-swing">📏</div>
        <div class="wv-sml" style="max-width:330px">фигура с вершинами в узлах сетки — как найти площадь? Формула Пика считает по точкам!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Узлы: В и Г</div>
        ${pickFig('hex')}
        <div class="wv-row" style="gap:8px">
          <span class="wv-chip" style="border-color:#2f6f9f;color:#7fd1ff">В — внутри</span>
          <span class="wv-chip" style="border-color:#2f7a4a;color:#8fd1a8">Г — на границе</span>
        </div>
        <div class="wv-sml">узлы = точки пересечения линий сетки</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем В и Г</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 16px"><b style="font-size:28px;color:#7fd1ff;font-family:Georgia,serif">В = 5</b><div style="font-size:11px;color:#9ec0a8">узлов внутри</div></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 16px"><b style="font-size:28px;color:#8fd1a8;font-family:Georgia,serif">Г = 4</b><div style="font-size:11px;color:#9ec0a8">узлов на границе</div></div>
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула Пика</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 16px;font-size:21px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">S = В + Г/2 − 1</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:330px;width:100%;font-size:16px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">5 + 4/2 − 1</div>
          <div class="wv-pop2">= 5 + 2 − 1 = <b style="color:#8fd1a8">6</b></div>
        </div>
        <div class="wv-sml">площадь 6 клеток — проверь подсчётом!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему −1?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">граничные узлы дают «половинки», внутренние — целые клетки. Учёный Пик доказал: для фигуры без дырок получается ровно <b style="color:#ffd76a">минус одна клетка</b> — формула работает всегда!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Пример: В = 3, Г = 4</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S = 3 + 4/2 − 1 = 3 + 2 − 1 = <b style="color:#8fd1a8" class="wv-ans">4</b></div>
        <div class="wv-sml">нарисуй такую фигуру и проверь клетками!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Особый случай: В = 0</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S = 0 + 4/2 − 1 = <b style="color:#8fd1a8">1</b></div>
        <div class="wv-sml">треугольник без внутренних узлов — площадь 1</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#7fd1ff;font-family:Georgia,serif">В</b><div style="font-size:10.5px;color:#9ec0a8">узлы внутри</div></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#8fd1a8;font-family:Georgia,serif">Г</b><div style="font-size:10.5px;color:#9ec0a8">узлы на границе</div></div>
          <div style="text-align:center;background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S=В+Г/2−1</b><div style="font-size:10.5px;color:#cbb89a">формула Пика</div></div>
        </div>
        <div class="wv-sml">спасает на олимпиадах при «кривых» фигурах!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">В = 3, Г = 4 → S = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">3 + 2 − 1 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[393]=visB393;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===393){ window.ARH_LESSONS[i]=L393; break; } } })();
})();
/* ================= УРОК 394 · Делимость и десятичная запись ================= */
(function(){
  const L394 = {
    id: 394, title: 'Делимость и десятичная запись', ico: '🔢',
    src: 'Математика · 5–6 класс · Делимость', subj: 'math',
    explain: [
      'Архимед рассматривает число 124 и хочет узнать, делится ли оно на 4. Делить не обязательно — есть признак по последним двум цифрам! Сегодня изучим признаки делимости по записи числа.',
      'Признак делимости на 4: число делится на 4, если делятся его ПОСЛЕДНИЕ ДВЕ ЦИФРЫ. У числа 124 последние две цифры — 24, а 24 делится на 4 (24 : 4 = 6). Значит, и 124 делится на 4! Проверь: 124 : 4 = 31.',
      'Почему так? Ведь 100 делится на 4 (100 : 4 = 25). Любое число — это «сотни + последние две цифры». Сотни всегда делятся на 4, остаются только последние две цифры. Вот и весь секрет!',
      'Признак на 2 и на 5: смотрим на ПОСЛЕДНЮЮ цифру. На 2 делятся числа, кончающиеся на 0, 2, 4, 6, 8. На 5 — кончающиеся на 0 или 5. На 10 — только на 0.',
      'Признак на 3 и на 9: складываем ВСЕ цифры. Если сумма делится на 3 — число делится на 3. Если на 9 — делится на 9. Помнишь этот признак из урока про делимость?',
      'Теперь про НОК — наименьшее общее кратное. НОК(6, 8) — самое маленькое число, которое делится и на 6, и на 8. Перебираем кратные 8: 8, 16, 24… 24 делится на 6! Значит, НОК(6, 8) = 24.',
      'Как найти НОК перебором? Выписывай кратные большего числа (8, 16, 24…) и проверяй, делятся ли они на меньшее (6). Первое подходящее и есть НОК. Для 6 и 8: 8 нет, 16 нет, 24 — да!',
      'Проверим наименьшее двузначное число, кратное 7: 7·1 = 7 (однозначное), 7·2 = 14 — двузначное! Значит, ответ 14. Кратные 7: 7, 14, 21, 28…',
      'Теперь проверь себя: чему равно НОК(6, 8)? Вспомни: кратные 8 — 8, 16, 24… Какое первое делится на 6?'
    ],
    check: { q: 'Чему равно НОК(6, 8)?', choices: ['24', '48', '12', '16'], ans: 0,
      exp: '24 делится и на 6, и на 8 — самое маленькое такое.' },
    tasks: [
      { q: 'Какое наименьшее двузначное число кратно 7?', kind: 'unit', ans: 14, tol: 0,
        hints: ['7 · 2.', '14.'], sol: '14' },
      { q: 'Число делится на 4, если…', kind: 'choice', choices: ['делятся его последние две цифры', 'последняя цифра чётная', 'сумма цифр делится на 4', 'последняя цифра 4'], ans: 0, tol: 0,
        hints: ['Проверяем по последним двум цифрам.', '124 → 24 делится на 4 → 124 делится на 4.'], sol: 'делятся его последние две цифры' }
    ]
  };
  const digitsOf=(num)=>String(num).split('').map((d,i,arr)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:38px;border-radius:8px;background:${i>=arr.length-2?'rgba(127,209,255,.2)':'rgba(255,255,255,.04)'};border:2px solid ${i>=arr.length-2?'#7fd1ff':'#3d5c49'};font-size:19px;color:${i>=arr.length-2?'#7fd1ff':'#e8dcc8'};font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
  function visB394(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Делится ли 124 на 4?</div>
        <div style="display:flex;gap:4px;justify-content:center;margin:6px 0">${digitsOf(124)}</div>
        <div class="wv-sml">голубые — последние две цифры: 24</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">24 : 4 = 6 — делится! А само число 124?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Признак на 4</div>
        <div style="background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">число ⋮ 4 ⟺ делятся <b style="color:#7fd1ff">последние две цифры</b></div>
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">124: 24 ⋮ 4 → 124 ⋮ 4 (124:4=31) ✔</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Почему последние две?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['100 ⋮ 4', '100 : 4 = 25 — сотни делятся всегда!'],
            ['124 = 100 + 24', 'сотни ⋮ 4 + последние 24 ⋮ 4']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i?'#ffd76a':'#7fd1ff'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${i?'#ffd76a':'#7fd1ff'}">${x[0]}</b><span style="max-width:200px;text-align:right;font-size:12.5px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Последняя цифра: 2, 5, 10</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['⋮ 2', 'последняя цифра 0, 2, 4, 6, 8', '#8fd1a8'],
            ['⋮ 5', 'последняя цифра 0 или 5', '#7fd1ff'],
            ['⋮ 10', 'последняя цифра 0', '#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:13px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма цифр: 3 и 9</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['⋮ 3', 'сумма всех цифр ⋮ 3', '#8fd1a8'],
            ['⋮ 9', 'сумма всех цифр ⋮ 9', '#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:13px">${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">пример: 258 → 2+5+8=15 ⋮ 3 → 258 ⋮ 3</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">НОК — что это?</div>
        <div style="display:flex;gap:8px;justify-content:center">
          ${[['6','6, 12, 18, 24…'],['8','8, 16, 24…']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 12px"><b style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">НОК — самое маленькое число, кратное обоим</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ищем НОК(6, 8)</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['8', '8 : 6 — нет'],
            ['16', '16 : 6 — нет'],
            ['24', '24 : 6 = 4 — ДА!', true]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:${x[2]?'rgba(127,209,160,.12)':'rgba(255,255,255,.03)'};border:1px solid #3d5c49;border-left:4px solid ${x[2]?'#4c8a5a':'#3d5c49'};border-radius:9px;padding:7px 12px;font-size:15px;color:#e8dcc8"><b style="color:${x[2]?'#8fd1a8':'#e8dcc8'};font-family:Georgia,serif">кратное ${x[0]}</b><span style="font-size:13px;color:${x[2]?'#8fd1a8':'#8f9a8f'}">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:18px;color:#ffd76a;font-weight:bold" class="wv-ans">НОК(6, 8) = 24</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Кратное 7 — двузначное</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:340px">
          ${['7','14','21','28'].map((n,i)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:36px;border-radius:8px;background:${i===1?'rgba(143,209,168,.2)':'rgba(255,255,255,.04)'};border:2px solid ${i===1?'#8fd1a8':'#3d5c49'};font-size:17px;color:${i===1?'#8fd1a8':'#e8dcc8'};font-weight:bold">${n}</span>`).join('')}
        </div>
        <div class="wv-sml">7·1 = 7 (однозначное) · 7·2 = <b style="color:#8fd1a8">14</b> — первое двузначное!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">НОК(6, 8) = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? </div>
        <div class="wv-sml">кратные 8: 8, 16, 24…</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[394]=visB394;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===394){ window.ARH_LESSONS[i]=L394; break; } } })();
})();
/* ================= УРОК 395 · Сочетания ================= */
(function(){
  const L395 = {
    id: 395, title: 'Сочетания: начало', ico: '🤝',
    src: 'Математика · 5–6 класс · Сочетания', subj: 'math',
    explain: [
      'Архимед положил на стол 4 фрукта: яблоко, грушу, виноград и вишню. Сколькими способами можно выбрать 2 фрукта? Порядок не важен — «яблоко и груша» это то же самое, что «груша и яблоко». Такие выборы называют сочетаниями.',
      'Сначала перечислим все пары вручную: яблоко-груша (ЯГ), яблоко-виноград (ЯВ), яблоко-вишня (ЯЧ), груша-виноград (ГВ), груша-вишня (ГЧ), виноград-вишня (ВЧ). Всего 6 пар!',
      'Как посчитать без перечисления? Если бы порядок был важен, пар было бы 4 · 3 = 12 (первый фрукт — 4 способа, второй — 3). Но каждая пара посчитана дважды: ЯГ и ГЯ — одно и то же! Поэтому делим на 2: 12 : 2 = 6.',
      'Формула сочетаний: выбрать 2 предмета из n можно n · (n−1) : 2 способами. Для 4 фруктов: 4 · 3 : 2 = 6. Проверь на списке пар — ровно 6!',
      'Выбрать 2 из 5: 5 · 4 : 2 = 10 способов. Представь 5 друзей: каждый пожимает руку каждому. Сколько всего рукопожатий? Каждое рукопожатие — это выбор пары: 5 · 4 : 2 = 10 рукопожатий!',
      'Почему делим на 2? В паре порядок неважен: «А и Б» = «Б и А». При подсчёте 5 · 4 каждая пара встретилась дважды (АБ и БА), поэтому делим пополам.',
      'Рукопожатия — классика: 4 человека жмут друг другу руки. Это выбор 2 из 4: 4 · 3 : 2 = 6 рукопожатий. Проверь: каждый из 4 жмёт руку 3 другим, но каждое рукопожатие считаем один раз.',
      'Запомни: правило произведения (4·3) считает УПОРЯДОЧЕННЫЕ пары, а сочетания (4·3:2) — НЕупорядоченные. Если порядок неважен — дели на 2!',
      'Теперь проверь себя: сколькими способами можно выбрать 2 предмета из 4? Вспомни формулу: 4 · 3 : 2.'
    ],
    check: { q: 'Сколькими способами можно выбрать 2 предмета из 4?', choices: ['6', '12', '4', '8'], ans: 0,
      exp: '4·3:2 = 6.' },
    tasks: [
      { q: 'Сколькими способами выбрать 2 из 5?', kind: 'unit', ans: 10, tol: 0,
        hints: ['5 · 4 : 2.', '10 способов.'], sol: '10' },
      { q: 'Сколько рукопожатий сделают 4 человека (каждый с каждым)?', kind: 'choice', choices: ['6', '4', '8', '12'], ans: 0, tol: 0,
        hints: ['Это выбор 2 из 4.', '4·3:2 = 6 рукопожатий.'], sol: '6' }
    ]
  };
  const fruits=['🍎','🍐','🍇','🍒'];
  function visB395(el){
    const step=LV.step||0;
    const emoRow=()=>`<div class="wv-row" style="gap:6px">${fruits.map((f,i)=>`<span class="wv-pop" style="animation-delay:${i*0.08}s;font-size:36px">${f}</span>`).join('')}</div>`;
    const pairs=[['🍎🍐','ЯГ'],['🍎🍇','ЯВ'],['🍎🍒','ЯЧ'],['🍐🍇','ГВ'],['🍐🍒','ГЧ'],['🍇🍒','ВЧ']];
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Выбираем 2 фрукта из 4</div>
        ${emoRow()}
        <div class="wv-sml" style="max-width:330px">порядок неважен: «яблоко и груша» = «груша и яблоко». Такие выборы — <b style="color:#ffd76a">сочетания</b>!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Все пары вручную</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:330px;width:100%">
          ${pairs.map((p,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:6px 8px;display:flex;align-items:center;gap:6px;justify-content:center;font-size:20px">${p[0]}<span style="font-size:11px;color:#8fa08f">${p[1]}</span></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">всего 6 пар!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем умно: 4 · 3 : 2</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['с порядком: 4 · 3 = 12','первый 4 способа, второй 3'],
            ['каждая пара посчитана 2 раза','ЯГ и ГЯ — одно и то же'],
            ['делим: 12 : 2 = 6','вот ответ!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i===2?'#4c8a5a':'#d9a441'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${i===2?'#8fd1a8':'#9ec0a8'};font-size:12px;max-width:140px;text-align:right">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула сочетаний</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:16px;color:#ffd76a;text-align:center;font-weight:bold;font-family:Georgia,serif">выбрать 2 из n = n·(n−1) : 2</div>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">для 4: 4·3:2 = 6 ✔</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Рукопожатия!</div>
        <div style="font-size:44px" class="wv-swing">🤝</div>
        <div class="wv-sml">5 человек жмут руки друг другу — сколько рукопожатий?</div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">5 · 4 : 2 = 10 рукопожатий</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Почему делим на 2?</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:17px;color:#7fd1ff">А → Б</b><div style="font-size:10px;color:#8fa08f">одна пара</div></div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:17px;color:#8fd1a8">Б → А</b><div style="font-size:10px;color:#8fa08f">та же пара!</div></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">5·4 посчитал каждую пару дважды (АБ и БА) → <b style="color:#ffd76a">делим пополам</b></div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">4 человека — 6 рукопожатий</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;max-width:300px;width:100%">
          ${[['1-2','1-3','1-4','2-3','2-4','3-4']].flat().map((p,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s;background:rgba(127,209,160,.08);border:1px solid #4c8a5a;border-radius:8px;padding:4px;font-size:13px;color:#8fd1a8;text-align:center">🤝 ${p}</div>`).join('')}
        </div>
        <div class="wv-sml">это выбор 2 из 4 = 4·3:2 = 6</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Запомни разницу</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['4 · 3', 'упорядоченные пары (порядок важен)','#7fd1ff'],
            ['4 · 3 : 2', 'сочетания (порядок не важен)','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="max-width:200px;text-align:right;font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${emoRow()}
        <div class="wv-sml">выбрать 2 фрукта из 4 — сколько способов?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">4 · 3 : 2 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[395]=visB395;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===395){ window.ARH_LESSONS[i]=L395; break; } } })();
})();
/* ================= УРОК 396 · Принцип Дирихле ================= */
(function(){
  const L396 = {
    id: 396, title: 'Усиленный принцип Дирихле', ico: '📦',
    src: 'Математика · 5–6 класс · Дирихле', subj: 'math',
    explain: [
      'У Архимеда 100 шаров и 9 коробок. Он раскладывает шары как хочет. Утверждение: в КАКОЙ-ТО коробке обязательно окажется минимум 12 шаров. Почему? Это знаменитый принцип Дирихле!',
      'Простой принцип Дирихле: если 10 кроликов рассадить в 9 клеток, в какой-то клетке окажется минимум 2 кролика. Ведь если бы в каждой было не больше 1, кроликов было бы не больше 9!',
      'Усиленный принцип: если n предметов разложить в k мест, найдётся место минимум с ⌈n/k⌉ предметами (округляем вверх). Для 100 шаров и 9 коробок: 100 : 9 = 11 и остаток 1.',
      'Считаем: 11 шаров в каждой коробке — это 9 · 11 = 99 шаров. У нас 100 шаров! Один лишний шар обязательно попадёт в какую-то коробку → в ней станет 11 + 1 = 12 шаров.',
      'Запишем красиво: 100 = 9 · 11 + 1. Частное 11, остаток 1. Значит, минимум ⌈100/9⌉ = 12 шаров в какой-то коробке. Округлили 11,11… вверх — получили 12!',
      'Проверим максимум: ровно по 11 шаров в 9 коробках — это 99 шаров. Больше 99 шаров без «переполнения» не разложить: сотый шар уже требует коробку с 12!',
      'Другой пример — носки. В ящике носки двух цветов. Сколько носков нужно достать, чтобы ГАРАНТИРОВАННО была пара одного цвета? Достаём 3: даже если первые два разных, третий совпадёт с одним из них!',
      'Запомни формулу: если n предметов в k мест, то где-то ≥ ⌈n/k⌉ предметов. А для «пары из цветов»: цветов 2 → нужно 2 + 1 = 3 предмета. Принцип Дирихле — король задач «докажи, что найдётся»!',
      'Теперь проверь себя: 100 шаров в 9 коробках — сколько шаров минимум в какой-то коробке? Вспомни: 100 = 9·11 + 1 → 11 + 1.'
    ],
    check: { q: '100 шаров разложили в 9 коробок. Сколько шаров минимум в какой-то коробке?', choices: ['12', '11', '10', '13'], ans: 0,
      exp: '100 = 9·11 + 1 → в какой-то коробке ≥ 12.' },
    tasks: [
      { q: 'Сколько шаров максимум можно разложить в 9 коробок поровну (не больше 100)?', kind: 'unit', ans: 99, tol: 0,
        hints: ['9 · 11.', '99 шаров.'], sol: '99' },
      { q: 'Сколько носков нужно взять (2 цвета), чтобы гарантированно достать пару одного цвета?', kind: 'choice', choices: ['3', '2', '4', '1'], ans: 0, tol: 0,
        hints: ['Цветов 2.', '3 носка: два окажутся одного цвета.'], sol: '3' }
    ]
  };
  const ballsRow=(n)=>`<div class="wv-row" style="gap:3px;max-width:340px">${Array.from({length:n},(_,i)=>`<span style="font-size:13px">⚪</span>`).join('')}</div>`;
  function visB396(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">100 шаров, 9 коробок</div>
        <div style="font-size:44px" class="wv-swing">📦</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#e8dcc8">докажем: в какой-то коробке точно есть <b style="color:#ffd76a">минимум 12 шаров</b>!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Простой принцип: кролики</div>
        <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">${Array.from({length:10},()=>'🐰').join('')}</div>
        <div class="wv-sml">10 кроликов в 9 клетках → где-то 2 кролика!</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">если бы в каждой клетке было ≤ 1, кроликов было бы ≤ 9 — противоречие!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Усиленный принцип</div>
        <div style="background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">n предметов в k мест → где-то ≥ <b style="color:#7fd1ff">⌈n/k⌉</b> (вверх)</div>
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">100 : 9 = 11 и остаток 1</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Один лишний шар</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:14.5px;color:#e8dcc8">
          <div class="wv-pop">9 коробок по 11 = 9 · 11 = <b style="color:#8fd1a8">99 шаров</b></div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">у нас 100 — один лишний!</div>
          <div class="wv-pop2">лишний попадёт в коробку → там <b style="color:#ffd76a">11 + 1 = 12</b></div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Красивая запись</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">100 = 9 · 11 + 1</div>
        <div class="wv-sml">частное 11, остаток 1 → ⌈100/9⌉ = 12</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-weight:bold" class="wv-ans">где-то минимум 12 шаров!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка максимума</div>
        ${ballsRow(99)}
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">ровно по 11 в 9 коробках = 99 — больше нельзя!</div>
        <div class="wv-sml">сотый шар уже требует коробку с 12</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Носки двух цветов</div>
        <div style="display:flex;gap:6px;justify-content:center;font-size:30px">
          <span>🧦</span><span style="opacity:.5">🧦</span>
        </div>
        <div class="wv-sml">достаём 3 носка: даже если первые два разные, третий совпадёт с одним!</div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">2 цвета → нужно 3 носка</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['n в k мест','где-то ≥ ⌈n/k⌉ предметов','#7fd1ff'],
            ['2 цвета носков','нужно 2+1 = 3','#8fd1a8'],
            ['задачи «докажи, что найдётся»','принцип Дирихле — король!','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]};max-width:200px;text-align:right">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">100 шаров в 9 коробках — минимум в какой-то?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">11 + 1 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[396]=visB396;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===396){ window.ARH_LESSONS[i]=L396; break; } } })();
})();
/* ================= УРОК 397 · Домино и раскраски ================= */
(function(){
  const L397 = {
    id: 397, title: 'Домино и раскраски', ico: '🁫',
    src: 'Математика · 5–6 класс · Раскраски', subj: 'math',
    explain: [
      'Архимед взял шахматную доску 8×8 и плитки-домино размером 1×2. Можно ли замостить доску домино? Конечно — 64 клетки делятся на 2! Но что если убрать две угловые клетки? Вот тут начинается магия!',
      'Сначала раскрасим доску в шахматном порядке: 32 белые и 32 чёрные клетки. Каждая плитка домино накрывает ровно одну белую и одну чёрную клетку — они всегда соседние!',
      'Запомни ключевой факт: любое домино накрывает 1 белую + 1 чёрную клетку. Значит, если белых и чёрных клеток поровну — замостить можно, а если нет — нельзя!',
      'Уберём две УГЛОВЫЕ клетки. Углы шахматной доски одного цвета — обе белые! Белых стало 32 − 2 = 30, а чёрных осталось 32.',
      'Теперь смотри: белых 30, чёрных 32. Но каждое домино накрывает поровну — по одной клетке каждого цвета! Раз цветов не поровну, замостить доску НЕЛЬЗЯ.',
      'Раскраска превратила геометрическую задачу в простой подсчёт. Не нужно перебирать варианты — достаточно сравнить количество клеток разных цветов!',
      'Как это запомнить? Домино = «белая + чёрная» пара. Если цвета не в балансе — задача неразрешима. Этот приём работает в сотнях олимпиадных задач!',
      'Попробуем другой пример: доска 7×7 (49 клеток). Домино накрывает 2 клетки, а 49 нечётно → замостить нельзя! И не нужно рисовать — просто подели 49 на 2.',
      'Теперь проверь себя: с доски 8×8 убрали две белые угловые клетки. Сколько стало белых и чёрных? Вспомни: белых было 32, убрали 2.'
    ],
    check: { q: 'С доски 8×8 убрали две белые угловые клетки. Сколько белых и чёрных клеток осталось?', choices: ['30 белых, 32 чёрных', '32 белых, 30 чёрных', '31 и 31', '30 и 30'], ans: 0,
      exp: '32−2 = 30 белых, чёрных 32.' },
    tasks: [
      { q: 'Сколько клеток накрывает одно домино?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Домино — прямоугольник 1×2.', '2 клетки.'], sol: '2' },
      { q: 'Можно ли покрыть домино доску, где белых 30, а чёрных 32?', kind: 'choice', choices: ['нет', 'да', 'да, если повернуть', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Домино накрывает поровну.', 'Клеток разное число → нельзя.'], sol: 'нет' }
    ]
  };
  const board8=(cutCorners)=>`<svg viewBox="0 0 200 200" style="width:200px;height:200px">
    ${(()=>{ let out=''; for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const isCorner=(r===0&&c===0)||(r===0&&c===7)||(r===7&&c===0)||(r===7&&c===7);
      const cut=cutCorners&&isCorner;
      const col = ((r+c)%2===0) ? '#efe9d0' : '#3f4a42';
      out+=`<rect x="${5+c*24}" y="${5+r*24}" width="24" height="24" fill="${cut?'rgba(232,106,90,.25)':col}" stroke="#0f1a24" stroke-width="1"/>`;
      if(cut) out+=`<text x="${5+c*24+12}" y="${5+r*24+16}" text-anchor="middle" font-size="10" fill="#ff9a8a">✂</text>`;
    } return out; })()}
  </svg>`;
  function visB397(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Доска 8×8 и домино</div>
        <div style="font-size:44px" class="wv-swing">🁫</div>
        <div class="wv-sml" style="max-width:330px">замостить доску домино 1×2 — легко: 64 : 2 = 32 плитки. А если убрать две угловые клетки?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Раскрашиваем в шахматном порядке</div>
        ${board8(false)}
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">32 белых + 32 чёрных</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Домино = белая + чёрная</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="display:inline-block;width:36px;height:36px;background:#efe9d0;border:1px solid #3f4a42"></span>
          <span style="display:inline-block;width:36px;height:36px;background:#3f4a42;border:1px solid #0f1a24"></span>
          <span style="font-size:13px;color:#8fd1a8;max-width:150px;text-align:left">одна плитка = 1 белая + 1 чёрная</span>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">цветов поровну → можно · не поровну → <b style="color:#ff9a8a">нельзя!</b></div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Убираем два угла</div>
        ${board8(true)}
        <div class="wv-sml">углы одного цвета — оба белые!</div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">белых: 32 − 2 = 30 · чёрных: 32</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">30 ≠ 32 → нельзя!</div>
        <div style="display:flex;gap:12px;justify-content:center">
          <div style="text-align:center;background:rgba(239,233,208,.1);border:2px solid #efe9d0;border-radius:12px;padding:8px 16px"><b style="font-size:26px;color:#efe9d0;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#9ec0a8">белых</div></div>
          <div style="text-align:center;background:rgba(63,74,66,.4);border:2px solid #3f4a42;border-radius:12px;padding:8px 16px"><b style="font-size:26px;color:#cfe0cf;font-family:Georgia,serif">32</b><div style="font-size:11px;color:#9ec0a8">чёрных</div></div>
        </div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">каждое домино берёт поровну → замостить НЕЛЬЗЯ!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Раскраска = простой подсчёт</div>
        <div style="background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15px;color:#e8dcc8;text-align:center;line-height:1.5">раскраска превращает геометрию в <b style="color:#7fd1ff">сравнение количеств цветов</b></div>
        </div>
        <div class="wv-sml">не перебирай варианты — просто сравни клетки!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример: 7×7</div>
        <div style="display:grid;grid-template-columns:repeat(7,20px);gap:2px;justify-content:center;background:#101f18;padding:8px;border-radius:10px">
          ${Array.from({length:49},(_,i)=>`<span style="width:20px;height:20px;background:${i%2?'#3f4a42':'#efe9d0'};border-radius:2px"></span>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">49 клеток — нечётно! 49 : 2 не делится → нельзя!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','раскрась доску (шахматно)','#7fd1ff'],
            ['2️⃣','посчитай клетки каждого цвета','#8fd1a8'],
            ['3️⃣','домино берёт поровну → сравни!','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${board8(true)}
        <div class="wv-sml">убрали 2 белых угла: сколько белых и чёрных?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? белых · ? чёрных</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[397]=visB397;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===397){ window.ARH_LESSONS[i]=L397; break; } } })();
})();
/* ================= УРОК 398 · Полуинварианты ================= */
(function(){
  const L398 = {
    id: 398, title: 'Полуинварианты: процессы', ico: '♻️',
    src: 'Математика · 5–6 класс · Полуинварианты', subj: 'math',
    explain: [
      'На доске записаны числа 1, 2, 3, 4. Каждый ход стирают два числа a и b и записывают вместо них их разность a − b. Так делают, пока не останется одно число. Можно ли заранее узнать, каким оно будет — чётным или нечётным?',
      'Попробуем на примере. Возьмём 1 и 2: 1 − 2 = −1. Числа стали: −1, 3, 4. Теперь 3 и 4: 3 − 4 = −1. Остались −1, −1. Наконец, −1 − (−1) = 0. Итог: 0 — чётное!',
      'Совпадение? Проверим другим порядком. 1 и 3: 1 − 3 = −2 → −2, 2, 4. Потом 2 и 4: 2 − 4 = −2 → −2, −2. Наконец −2 − (−2) = 0. Опять 0! Похоже, итог всегда одинаковый…',
      'Секрет в том, что при замене a и b на a − b что-то НЕ меняется. Смотрим: сумма a + b и разность a − b имеют ОДИНАКОВУЮ чётность! Ведь a+b и a−b отличаются на 2b — чётное число.',
      'Раз a + b и a − b одной чётности, то замена не меняет ЧЁТНОСТЬ общей суммы всех чисел на доске! Это и есть полуинвариант — величина, которая сохраняется в процессе.',
      'Посчитаем начальную сумму: 1 + 2 + 3 + 4 = 10. Десять — чётное число! Чётность суммы не меняется ни на одном шаге, значит, и финальное единственное число будет чётным.',
      'Проверим наш эксперимент: итог был 0 — чётное! Удивительно: мы не знаем, какие именно числа стирали, но точно знаем чётность ответа. Вот сила полуинварианта!',
      'Запомни приём: в задачах «повторяй операцию, пока не останется одно число» ищи величину, которая сохраняется или меняется предсказуемо. Сумма, разность, чётность, произведение — частые кандидаты!',
      'Теперь проверь себя: из чисел 1, 2, 3, 4 операцией «заменить пару на разность» останется одно число. Каким оно будет по чётности? Вспомни: сумма 10 чётная и сохраняется!'
    ],
    check: { q: 'Стирают a и b, записывают a − b. Что сохраняется?', choices: ['чётность суммы', 'сама сумма', 'число чисел', 'произведение'], ans: 0,
      exp: 'a+b и a−b одной чётности → чётность суммы сохраняется.' },
    tasks: [
      { q: 'Чему равна сумма 1 + 2 + 3 + 4?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Сложи по порядку.', '10.'], sol: '10' },
      { q: 'Из чисел 1, 2, 3, 4 операцией «разность» останется одно число. Каким оно будет по чётности?', kind: 'choice', choices: ['чётным', 'нечётным', 'любым', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Сумма 10 чётна.', 'Чётность сохраняется → итог чётный.'], sol: 'чётным' }
    ]
  };
  const numChip=(n,state)=>{ const col=state==='rem'?'#8f5a50':(state==='new'?'#ffd76a':'#cfe0cf');
    return `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,.05);border:2px solid ${col};font-size:18px;color:${col};font-weight:bold;font-family:Georgia,serif;margin:2px">${n}</span>`; };
  function visB398(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Процесс с числами</div>
        <div class="wv-row" style="gap:4px">${[1,2,3,4].map(n=>numChip(n)).join('')}</div>
        <div class="wv-sml" style="max-width:330px">каждый ход: стираем a и b, пишем <b style="color:#ffd76a">a − b</b> — пока не останется одно число</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">можно ли заранее узнать чётность итога?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Пробуем: порядок 1</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          <div class="wv-pop">${numChip(1)} ${numChip(2)} ${numChip(3)} ${numChip(4)}</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">1 − 2 = −1</div>
          <div class="wv-pop2">${numChip(-1,'new')} ${numChip(3)} ${numChip(4)}</div>
          <div class="wv-pop3" style="color:#8fa08f;font-size:13px">3 − 4 = −1</div>
          <div class="wv-pop3">${numChip(-1)} ${numChip(-1,'new')}</div>
          <div class="wv-pop3" style="color:#8fa08f;font-size:13px">−1 − (−1) = 0</div>
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">итог 0 — чётное!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Другой порядок</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          <div class="wv-pop">${numChip(1)} ${numChip(3)} → ${numChip(-2,'new')}</div>
          <div class="wv-pop2">${numChip(-2)} ${numChip(2)} ${numChip(4)}</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">2 − 4 = −2</div>
          <div class="wv-pop3">${numChip(-2)} ${numChip(-2,'new')} → ${numChip(0,'new')}</div>
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">опять 0 — чётное! Не совпадение!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет: a+b и a−b</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['a + b','разность на 2b меньше'],['a − b','(a+b) − (a−b) = 2b']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;text-align:center;background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#7fd1ff;font-family:Georgia,serif">${x[0]}</b><div style="font-size:10.5px;color:#9ec0a8;max-width:120px;margin-top:2px">${x[1]}</div></div>`).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">числа отличаются на <b style="color:#ffd76a">2b</b> — чётное → <b style="color:#8fd1a8">одной чётности!</b></div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Что сохраняется?</div>
        <div style="background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center;line-height:1.5">замена пары на разность <b style="color:#8fd1a8">не меняет чётность суммы</b> всех чисел!</div>
        </div>
        <div class="wv-sml">это полуинвариант — величина, которая сохраняется в процессе</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем начальную сумму</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">1 + 2 + 3 + 4 = <b style="color:#8fd1a8" class="wv-ans">10</b></div>
        <div class="wv-sml">10 — чётное!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Вывод</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:16px;color:#ffd76a;font-weight:bold;text-align:center">сумма чётная и сохраняется → итог чётный!</div>
        </div>
        <div class="wv-sml">мы не знаем, какие числа стирали, но чётность ответа — знаем!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">в задачах «повторяй операцию, пока не останется одно» ищи, что <b style="color:#8fd1a8">сохраняется</b>: сумма, чётность, произведение, разность… Это и есть ключ!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:4px">${[1,2,3,4].map(n=>numChip(n)).join('')}</div>
        <div class="wv-sml">сумма = 10 (чётная). Итог будет …?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">чётным или нечётным?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[398]=visB398;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===398){ window.ARH_LESSONS[i]=L398; break; } } })();
})();
