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
