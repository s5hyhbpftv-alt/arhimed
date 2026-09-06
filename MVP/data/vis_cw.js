/* Волна C v2: уроки 399–412 (7 класс) в формате «объясни → реши + живой виджет».
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_C[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_C = window.WAVE_C || {};

/* ================= УРОК 399 · Многочлены: сложение и умножение ================= */
(function(){
  const L399 = {
    id: 399, title: 'Многочлены: сложение и умножение', ico: '🧮',
    src: 'Математика · 7 класс · Алгебра 7: многочлены', subj: 'math',
    explain: [
      'Познакомься с «кирпичиками» алгебры — одночленами и многочленами. Одночлен — это произведение числа и переменных: 3x, 5x², −2ab. Число впереди называют коэффициентом, а буквы — буквенной частью.',
      'Многочлен — это сумма нескольких одночленов, например 2x + 3x² − 1. Каждый кусочек до знака + или − — это член многочлена. У 2x + 3x² − 1 три члена: 2x, 3x² и −1.',
      'Важное понятие — подобные слагаемые. Подобны члены с ОДИНАКОВОЙ буквенной частью: 3x и 5x подобны (у обоих буква x), а 3x и 3x² — нет: x и x² это как яблоко и корзина яблок. Складывать можно только подобные!',
      'Как складывать подобные? Складываем коэффициенты, а буквенную часть не трогаем: 3x + 5x = (3+5)x = 8x. Привести подобные — значит собрать все похожие члены вместе. Пример: 4x − 2x + 6 = 2x + 6.',
      'Если перед скобками минус, он меняет знак каждого члена внутри: −(2x + 3) = −2x − 3. Это как вычесть всю «коробку»: плюсы становятся минусами. Будь внимателен с минусами — тут частая ошибка!',
      'Умножение многочлена на одночлен: умножаем одночлен на КАЖДЫЙ член скобки. 2x·(x + 3) = 2x·x + 2x·3 = 2x² + 6x. Главное — не пропустить ни одного члена!',
      'Умножение скобки на скобку: каждый член первой скобки умножаем на каждый член второй. (x+1)(x+2) = x·x + x·2 + 1·x + 1·2 = x² + 2x + x + 2.',
      'После раскрытия скобок приводим подобные: x² + 2x + x + 2 = x² + 3x + 2. Вот и ответ! Способ «каждый с каждым» — основа всего дальнейшего курса алгебры.',
      'Теперь проверь себя: приведи подобные 3x + 5x. Вспомни: складываем коэффициенты, букву не трогаем!'
    ],
    check: { q: 'Приведи подобные: 3x + 5x', choices: ['8x', '8x²', '15x', 'x'], ans: 0,
      exp: '3 + 5 = 8 → 8x.' },
    tasks: [
      { q: 'Чему равен коэффициент в выражении 2x · 4?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Умножаем числа.', '2·4 = 8 → 8x.'], sol: '8' },
      { q: 'Раскрой скобки: (x + 1)(x + 2)', kind: 'choice', choices: ['x² + 3x + 2', 'x² + 2', '2x + 3', 'x² + 3x + 3'], ans: 0, tol: 0,
        hints: ['Перемножь каждое с каждым.', 'x² + 2x + x + 2 = x² + 3x + 2.'], sol: 'x² + 3x + 2' }
    ]
  };
  const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:44px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:19px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
  function visC399(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Одночлены — коробочки</div>
        <div class="wv-row" style="gap:6px">
          ${chip('3x','#7fd1ff')}${chip('5x²','#8fd1a8')}${chip('−2ab','#e8a0d8')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #7fd1ff;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">число — <b style="color:#7fd1ff">коэффициент</b> · буквы — <b style="color:#8fd1a8">буквенная часть</b>: 3x = три коробочки с x</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Многочлен — сумма одночленов</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">2x + 3x² − 1</div>
        <div class="wv-row" style="gap:5px">
          ${chip('2x','#7fd1ff')}${chip('3x²','#8fd1a8')}${chip('−1','#e8a0d8')}
        </div>
        <div class="wv-sml">три члена: каждый до знака + или −</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Подобные слагаемые</div>
        <div class="wv-row" style="gap:6px">
          <span class="wv-chip" style="border-color:#4c8a5a;color:#8fd1a8">3x и 5x — подобны ✔</span>
          <span class="wv-chip" style="border-color:#b0635a;color:#ff9a8a">3x и 3x² — нет ✘</span>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">одинаковая буквенная часть → подобны. x и x² — разные «сорта», как яблоко и корзина яблок!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Приводим подобные</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:24px;font-family:Georgia,serif;color:#e8dcc8;flex-wrap:wrap;justify-content:center">
          <b style="color:#7fd1ff">3x</b> + <b style="color:#8fd1a8">5x</b> =
        </div>
        <div style="font-size:28px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">(3+5)x = 8x</div>
        <div class="wv-sml">складываем коэффициенты, букву не трогаем!</div>
        <div style="font-size:18px;color:#8fd1a8;font-family:Georgia,serif">4x − 2x + 6 = 2x + 6</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Минус перед скобкой</div>
        <div style="display:flex;align-items:center;gap:8px;font-size:24px;font-family:Georgia,serif;color:#e8dcc8;flex-wrap:wrap;justify-content:center">
          <span style="color:#ff9a8a">−</span>(2x + 3) =
        </div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">−2x − 3</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #e86a5a;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">минус меняет знак каждого члена: +2x → −2x, +3 → −3</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Умножение на одночлен</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">2x·(x + 3)</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:17px;font-family:Georgia,serif;color:#e8dcc8;text-align:center">
          <div class="wv-pop">2x·x = <b style="color:#7fd1ff">2x²</b></div>
          <div class="wv-pop2">2x·3 = <b style="color:#8fd1a8">6x</b></div>
        </div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">2x² + 6x</div>
        <div class="wv-sml">умножаем на каждый член скобки — не пропускай!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Скобку на скобку</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">(x + 1)(x + 2)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;max-width:300px;width:100%">
          ${[['x·x','x²','#7fd1ff'],['x·2','2x','#8fd1a8'],['1·x','x','#e8a0d8'],['1·2','2','#ffd76a']].map((c,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;background:rgba(255,255,255,.04);border:1px solid ${c[2]};border-radius:10px;padding:7px;text-align:center"><div style="font-size:13px;color:#9ec0a8">${c[0]}</div><b style="font-size:17px;color:${c[2]};font-family:Georgia,serif">${c[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">каждый с каждым — четыре произведения!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Собираем ответ</div>
        <div style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif">x² + 2x + x + 2</div>
        <div style="font-size:14px;color:#8fa08f">2x и x — подобные → 3x</div>
        <div style="font-size:28px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">x² + 3x + 2</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;gap:6px;justify-content:center">${chip('3x','#7fd1ff')}<span style="font-size:22px;color:#e8dcc8">+</span>${chip('5x','#8fd1a8')}</div>
        <div class="wv-sml">сложи коэффициенты, x не трогай!</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? x</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[399]=visC399;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===399){ window.ARH_LESSONS[i]=L399; break; } } })();
})();
/* ================= УРОК 400 · Разложение на множители ================= */
(function(){
  const L400 = {
    id: 400, title: 'Разложение на множители', ico: '🧩',
    src: 'Математика · 7 класс · Алгебра 7: разложение', subj: 'math',
    explain: [
      'Разложить выражение на множители — значит записать его как произведение. С числами ты это умеешь: 12 = 3 · 4. С выражениями так же: 6x + 12 можно записать как 6(x + 2). Это как разобрать полку на отдельные детали!',
      'Первый приём — вынесение общего множителя за скобку. У членов 6x и 12 есть общее: оба делятся на 6. Делим каждый член на 6: 6x : 6 = x, 12 : 6 = 2. Записываем 6 перед скобкой: 6(x + 2).',
      'Проверка — обратный ход. Раскроем скобки: 6(x + 2) = 6·x + 6·2 = 6x + 12. Получили исходное выражение — значит, разложили верно! Проверка умножением — лучший друг при разложении.',
      'Вторая великая формула — разность квадратов: a² − b² = (a − b)(a + b). Например, x² − 16 — это x² − 4², значит, x² − 16 = (x − 4)(x + 4). Запомни: разность квадратов раскладывается, а сумма квадратов — нет!',
      'Почему формула работает? Раскроем (x − 4)(x + 4) = x² + 4x − 4x − 16. Средние члены 4x и −4x взаимно уничтожаются, остаётся x² − 16. Вот и весь секрет!',
      'Третья формула — квадрат суммы: (a + b)² = a² + 2ab + b². Проверь: (a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b². Двойка перед ab — потому что ab встречается дважды!',
      'Формулы экономят время: найди (x − 3)(x + 3) при x = 5. Это разность квадратов: x² − 9. Подставляем 5: 25 − 9 = 16. Без формулы пришлось бы долго перемножать!',
      'Итак, два главных приёма: 1) вынести общий множитель: 6x + 12 = 6(x + 2); 2) применить формулу разности квадратов: x² − 16 = (x − 4)(x + 4). Оба превращают сумму в произведение!',
      'Теперь проверь себя: разложи на множители x² − 16. Вспомни формулу a² − b² = (a − b)(a + b).'
    ],
    check: { q: 'Разложи на множители: x² − 16', choices: ['(x − 4)(x + 4)', '(x − 8)(x + 2)', '(x − 4)²', 'x(x − 16)'], ans: 0,
      exp: 'Разность квадратов: (x − 4)(x + 4).' },
    tasks: [
      { q: 'Найди значение (x − 3)(x + 3) при x = 5.', kind: 'unit', ans: 16, tol: 0,
        hints: ['Разность квадратов: x² − 9.', '25 − 9 = 16.'], sol: '16' },
      { q: 'Вынеси общий множитель: 6x + 12', kind: 'choice', choices: ['6(x + 2)', '6(x + 12)', '3(2x + 12)', '2(3x + 12)'], ans: 0, tol: 0,
        hints: ['Общий множитель 6.', '6x + 12 = 6(x + 2).'], sol: '6(x + 2)' }
    ]
  };
  function visC400(el){
    const step=LV.step||0;
    const chip=(t,c,fs)=>`<span style="display:inline-flex;align-items:center;justify-content:center;padding:6px 14px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:${fs||19}px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Разобрать на детали</div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center">
          ${chip('12','#8fd1a8')}<span style="font-size:22px;color:#e8dcc8">=</span>${chip('3','#7fd1ff')}${chip('·','#8fa08f')}${chip('4','#e8a0d8')}
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;margin-top:4px">
          ${chip('6x + 12','#ffd76a')}<span style="font-size:22px;color:#e8dcc8">=</span>${chip('6','#7fd1ff')}${chip('(x + 2)','#8fd1a8')}
        </div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Общий множитель 6</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-size:17px;font-family:Georgia,serif;color:#e8dcc8;text-align:center">
          <div class="wv-pop">6x : 6 = <b style="color:#7fd1ff">x</b></div>
          <div class="wv-pop2">12 : 6 = <b style="color:#8fd1a8">2</b></div>
        </div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">6(x + 2)</div>
        <div class="wv-sml">делим каждый член на общий множитель</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка умножением</div>
        <div style="font-size:22px;font-family:Georgia,serif;color:#e8dcc8">6(x + 2) = 6x + 12</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${chip('6·x','#7fd1ff',16)}${chip('+','#8fa08f',16)}${chip('6·2','#8fd1a8',16)}
        </div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:16px;color:#8fd1a8;font-weight:bold" class="wv-ans">сошлось с исходным — верно!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Разность квадратов</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;font-size:20px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">a² − b² = (a − b)(a + b)</div>
        <div style="font-size:24px;color:#e8dcc8;font-family:Georgia,serif;margin-top:4px">x² − 16 = x² − 4²</div>
        <div style="font-size:26px;color:#8fd1a8;font-family:Georgia,serif" class="wv-ans">(x − 4)(x + 4)</div>
        <div class="wv-sml">сумма квадратов x² + 16 так НЕ раскладывается!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему формула работает?</div>
        <div style="font-size:19px;color:#e8dcc8;font-family:Georgia,serif">(x−4)(x+4) = x² + 4x − 4x − 16</div>
        <div style="font-size:15px;color:#8fa08f">4x и −4x взаимно уничтожаются!</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">x² − 16 ✔</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат суммы</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">(a + b)² = a² + 2ab + b²</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;max-width:300px;width:100%">
          ${[['a·a','a²','#7fd1ff'],['a·b','ab','#8fd1a8'],['b·a','ab','#8fd1a8'],['b·b','b²','#ffd76a']].map((c,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;background:rgba(255,255,255,.04);border:1px solid ${c[2]};border-radius:10px;padding:6px;text-align:center"><div style="font-size:13px;color:#9ec0a8">${c[0]}</div><b style="font-size:16px;color:${c[2]};font-family:Georgia,serif">${c[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">ab встречается дважды → 2ab!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем быстро</div>
        <div class="wv-sml">(x − 3)(x + 3) при x = 5</div>
        <div style="font-size:22px;color:#8fd1a8;font-family:Georgia,serif">x² − 9 → 5² − 9 = 25 − 9 = <b style="color:#ffd76a" class="wv-ans">16</b></div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Два главных приёма</div>
        <div style="display:flex;flex-direction:column;gap:7px;max-width:340px;width:100%">
          ${[
            ['1️⃣ вынос общего множителя','6x + 12 = 6(x + 2)','#7fd1ff'],
            ['2️⃣ разность квадратов','x² − 16 = (x − 4)(x + 4)','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]};font-family:Georgia,serif;white-space:nowrap">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">x² − 16 = ?</div>
        <div class="wv-sml">это разность квадратов: x² − 4²</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">(x − ?)(x + ?)</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[400]=visC400;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===400){ window.ARH_LESSONS[i]=L400; break; } } })();
})();
/* ================= УРОК 401 · Системы линейных уравнений ================= */
(function(){
  const L401 = {
    id: 401, title: 'Системы линейных уравнений', ico: '⚖️',
    src: 'Математика · 7 класс · Алгебра 7: системы', subj: 'math',
    explain: [
      'Архимед загадал два числа x и y. Их сумма равна 10, а разность — 4. Что это за числа? У нас ДВА условия про одну пару чисел — это и есть система уравнений. Нужна пара (x; y), подходящая в оба уравнения сразу!',
      'Систему записывают фигурной скобкой: {x + y = 10; x − y = 4}. Смотри: в первом уравнении y со знаком «+», во втором — со знаком «−». Это подсказка для красивого способа решения!',
      'Метод сложения. Если сложить оба уравнения, y исчезнет: +y и −y дают ноль! Складываем левые части: x + x = 2x, y + (−y) = 0. Правые: 10 + 4 = 14. Получаем простое уравнение 2x = 14.',
      'Решаем: 2x = 14 → x = 7. Первая половина ответа готова! Теперь подставим x = 7 в первое уравнение: 7 + y = 10 → y = 10 − 7 = 3.',
      'Решение системы — пара чисел (x; y) = (7; 3). Обязательно делаем проверку в ОБОИХ уравнениях: 7 + 3 = 10 ✔ и 7 − 3 = 4 ✔. Всё сошлось — ответ верный!',
      'Есть второй способ — подстановка. Из первого уравнения выражаем y = 10 − x и подставляем во второе: x − (10 − x) = 4 → 2x − 10 = 4 → x = 7. Потом y = 10 − 7 = 3. Тот же ответ!',
      'Когда какой метод? Если коэффициенты позволяют сложением убрать переменную — бери метод сложения. Если одна буква легко выражается — метод подстановки. Оба дают один и тот же ответ.',
      'Зачем системы? Они решают задачи «на два условия»: возраст двух братьев (один старше на 4, вместе 10), длина и ширина участка, цена ручки и тетради. Два условия — это система!',
      'Теперь проверь себя: в системе {x + y = 10; x − y = 4} мы нашли x = 7. Чему равен y? Подставь x в первое уравнение!'
    ],
    check: { q: 'Реши систему {x + y = 10; x − y = 4}. Чему равен x?', choices: ['7', '3', '6', '5'], ans: 0,
      exp: 'Складываем: 2x = 14 → x = 7.' },
    tasks: [
      { q: 'Если x = 7, чему равен y из уравнения x + y = 10?', kind: 'unit', ans: 3, tol: 0,
        hints: ['10 − 7.', 'y = 3.'], sol: '3' },
      { q: 'Что делают при методе сложения с уравнениями {x + y = 10; x − y = 4}?', kind: 'choice', choices: ['складывают уравнения', 'вычитают x из y', 'делят уравнения', 'умножают на y'], ans: 0, tol: 0,
        hints: ['Чтобы убрать y.', 'x + x = 2x, y − y = 0 → 2x = 14.'], sol: 'складывают' }
    ]
  };
  const eq=(txt,c)=>`<div style="font-size:20px;font-family:Georgia,serif;color:${c};padding:3px 10px">${txt}</div>`;
  function visC401(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Загадка Архимеда</div>
        <div style="font-size:44px" class="wv-swing">🤔</div>
        <div class="wv-sml" style="max-width:330px">два числа: <b style="color:#7fd1ff">сумма 10</b>, <b style="color:#8fd1a8">разность 4</b> — что за числа? Два условия про одну пару!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Записываем систему</div>
        <div style="display:flex;gap:4px;align-items:center">
          <span style="font-size:34px;color:#d9a441">⎨</span>
          <div style="text-align:left">
            ${eq('x + y = 10','#7fd1ff')}
            ${eq('x − y = 4','#ff9a8a')}
          </div>
        </div>
        <div class="wv-sml">в 1-м y с «+», во 2-м с «−» — это подсказка!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Метод сложения</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${eq('x + x = 2x','#7fd1ff')}
          ${eq('y + (−y) = 0','#8fd1a8')}
          ${eq('10 + 4 = 14','#ffd76a')}
        </div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">2x = 14</div>
        <div class="wv-sml">y исчез! Осталось одно уравнение</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Находим x и y</div>
        <div style="font-size:22px;font-family:Georgia,serif;color:#e8dcc8">2x = 14 → <b style="color:#7fd1ff">x = 7</b></div>
        <div style="font-size:16px;color:#8fa08f">подставляем в 1-е: 7 + y = 10</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">y = 3</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ответ (7; 3) — проверяем!</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${[['7 + 3 = 10','✔ первое','#7fd1ff'],['7 − 3 = 4','✔ второе','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:8px 14px"><b style="font-size:19px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:17px;color:#8fd1a8;font-weight:bold" class="wv-ans">оба условия сошлись!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Второй способ: подстановка</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">из 1-го: y = <b style="color:#7fd1ff">10 − x</b></div>
          <div class="wv-pop2">подставляем: x − (10 − x) = 4</div>
          <div class="wv-pop2">2x − 10 = 4 → <b style="color:#ffd76a">x = 7</b></div>
        </div>
        <div class="wv-sml">ответ тот же: y = 3</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Когда какой метод?</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['метод сложения','если сложение убирает переменную','#7fd1ff'],
            ['метод подстановки','если буква легко выражается','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="max-width:200px;text-align:right">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Где встречаются системы</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['👬','возраст братьев'],['📏','участок'],['✏️','ручка и тетрадь']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px"><div style="font-size:26px">${x[0]}</div><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">два условия — это система!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;gap:4px;align-items:center;justify-content:center">
          <span style="font-size:28px;color:#d9a441">⎨</span>
          <div style="text-align:left">${eq('x + y = 10','#7fd1ff')}${eq('x − y = 4','#ff9a8a')}</div>
        </div>
        <div class="wv-sml">x = 7 — чему равен y?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">y = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[401]=visC401;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===401){ window.ARH_LESSONS[i]=L401; break; } } })();
})();
/* ================= УРОК 402 · Линейная функция y = kx + b ================= */
(function(){
  const L402 = {
    id: 402, title: 'Линейная функция y = kx + b', ico: '📈',
    src: 'Математика · 7 класс · Алгебра 7: функции', subj: 'math',
    explain: [
      'Линейная функция — это правило, по которому каждому числу x сопоставляется число y = kx + b. Пример: y = 2x + 1. Подставили x = 3 — получили y = 7. Самое удивительное: график такой функции — всегда ПРЯМАЯ линия!',
      'Число k — угловой коэффициент. Он отвечает за НАКЛОН прямой. Если k > 0, прямая поднимается слева направо, как дорога в горку. Если k < 0 — опускается, как с горки. Чем больше |k|, тем круче прямая.',
      'Число b — свободный член. Он показывает, где прямая пересекает ось y. Ведь при x = 0: y = k·0 + b = b. Значит, точка (0; b) всегда лежит на прямой. У y = 2x + 1 это точка (0; 1).',
      'Как построить график? Прямая определяется ДВУМЯ точками! Берём y = 2x + 1: при x = 0 → y = 1 (точка (0;1)), при x = 1 → y = 3 (точка (1;3)). Отмечаем обе и проводим прямую.',
      'Удобно заполнять таблицу значений. Для y = 2x + 1: x = 0 → 1, x = 1 → 3, x = 2 → 5. Видишь? При росте x на 1 значение y растёт на 2 — это и есть k = 2!',
      'Пример из жизни: тариф такси. Посадка 70 рублей, каждый километр 30 рублей: цена y = 30x + 70, где x — километры. Здесь k = 30 (цена за км), b = 70 (посадка). График — прямая!',
      'Если b = 0, прямая проходит через начало координат (0; 0): y = kx. Это пропорциональность — чем больше x, тем больше y, ровно во столько же раз.',
      'Запомни: k — наклон (как быстро растёт), b — точка (0; b) на оси y. Двух точек достаточно, чтобы нарисовать прямую — и весь график готов!',
      'Теперь проверь себя: у функции y = 2x + 1 найди y при x = 3. Просто подставь: 2·3 + 1.'
    ],
    check: { q: 'У функции y = 2x + 1 чему равно y при x = 3?', choices: ['7', '6', '5', '8'], ans: 0,
      exp: '2·3 + 1 = 7.' },
    tasks: [
      { q: 'Где прямая y = 3x − 2 пересекает ось y? Подставь x = 0: y = ?', kind: 'unit', ans: -2, tol: 0,
        hints: ['x = 0.', 'y = 3·0 − 2 = −2.'], sol: '−2' },
      { q: 'Какая из функций задаёт прямую?', kind: 'choice', choices: ['y = 2x + 1', 'y = x²', 'y = 1/x', 'y = |x|'], ans: 0, tol: 0,
        hints: ['Линейная функция.', 'y = 2x + 1 — линейная, график прямая.'], sol: 'y = 2x + 1' }
    ]
  };
  function plane(pt,line){
    const sc=24, cx=130, cy=105;
    let g='';
    for(let i=-4;i<=4;i++){ g+=`<line x1="${cx+i*sc}" y1="8" x2="${cx+i*sc}" y2="202" stroke="rgba(255,255,255,.05)"/>`;
      g+=`<line x1="8" y1="${cy-i*sc}" x2="252" y2="${cy-i*sc}" stroke="rgba(255,255,255,.05)"/>`; }
    let dots='',lineEl='';
    if(line){ const x1=-2,x2=5; const y1=cy-(line[0]*x1+line[1])*sc/2, y2=cy-(line[0]*x2+line[1])*sc/2;
      lineEl=`<line x1="${cx+x1*sc/2}" y1="${y1}" x2="${cx+x2*sc/2}" y2="${y2}" stroke="#ffd76a" stroke-width="3.5"/>`; }
    if(pt){ const px=cx+pt[0]*sc/2, py=cy-pt[1]*sc/2;
      dots=`<circle cx="${px}" cy="${py}" r="6" fill="#8fd1a8"/><circle cx="${px}" cy="${py}" r="10" fill="none" stroke="#8fd1a8" opacity=".6"/>`; }
    return `<svg viewBox="0 0 260 210" style="width:230px;height:186px;background:#101f18;border-radius:12px">
      ${g}
      <line x1="8" y1="${cy}" x2="252" y2="${cy}" stroke="#cfe0cf" stroke-width="2"/>
      <line x1="${cx}" y1="8" x2="${cx}" y2="202" stroke="#cfe0cf" stroke-width="2"/>
      ${lineEl}${dots}
      <text x="248" y="${cy+14}" font-size="11" fill="#cfe0cf">x</text><text x="${cx+8}" y="14" font-size="11" fill="#cfe0cf">y</text>
    </svg>`;
  }
  function visC402(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;justify-content:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:16px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Что такое линейная функция?</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">y = 2x + 1</div>
        <div class="wv-sml">подставили x = 3 → y = 7 · график — <b style="color:#8fd1a8">прямая!</b></div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">k — наклон прямой</div>
        ${plane(null,[1,0])}
        <div class="wv-sml">k > 0 — в горку · k < 0 — с горки</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">b — пересечение с осью y</div>
        ${plane([0,1],[2,1])}
        <div class="wv-sml">при x = 0: y = b → точка (0; 1)</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Строим по двум точкам</div>
        ${plane([1,3],[2,1])}
        <div class="wv-sml">(0; 1) и (1; 3) → проводим прямую!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Таблица значений y = 2x + 1</div>
        <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
          ${[[0,1],[1,3],[2,5]].map((p,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:6px 10px"><div style="font-size:12px;color:#8fa08f">x=${p[0]}</div><b style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">y=${p[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">x +1 → y +2 — это и есть k = 2!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Такси: y = 30x + 70</div>
        <div style="font-size:40px" class="wv-swing">🚕</div>
        <div class="wv-sml">k = 30 (₽ за км) · b = 70 (₽ посадка)</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">график — прямая: чем дальше едешь, тем дороже!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Если b = 0: y = kx</div>
        ${plane(null,[1,0])}
        <div class="wv-sml">прямая проходит через начало (0; 0) — пропорциональность</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${chip('k — наклон','#7fd1ff')}${chip('b — точка (0; b)','#8fd1a8')}${chip('2 точки = прямая','#ffd76a')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">y = 2x + 1, x = 3</div>
        <div class="wv-sml">подставь: 2·3 + 1 = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">y = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[402]=visC402;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===402){ window.ARH_LESSONS[i]=L402; break; } } })();
})();
/* ================= УРОК 403 · Линейные неравенства ================= */
(function(){
  const L403 = {
    id: 403, title: 'Линейные неравенства', ico: '📊',
    src: 'Математика · 7 класс · Алгебра 7: неравенства', subj: 'math',
    explain: [
      'Неравенство отличается от уравнения только знаком: вместо «=» стоят «>», «<», «≥» или «≤». Например, 2x + 1 > 7. Решить неравенство — значит найти ВСЕ числа x, при которых оно верно.',
      'Решаем как уравнение: переносим числа, упрощаем. 2x + 1 > 7 → переносим 1 вправо с минусом: 2x > 6. Теперь делим обе части на 2 — число ПОЛОЖИТЕЛЬНОЕ, знак не меняется: x > 3.',
      'Ответ x > 3 изображают на числовой оси: пустой кружок на 3 (само число 3 не подходит) и луч вправо. Все числа больше 3 подходят: 4, 5, 100…',
      'А теперь САМОЕ ВАЖНОЕ правило! Если умножить или разделить обе части неравенства на ОТРИЦАТЕЛЬНОЕ число, знак ПЕРЕВОРАЧИВАЕТСЯ. −3x < 9 делим на −3 → x > −3. Был «<», стал «>»!',
      'Проверим, почему так. Возьмём x = −2: −3·(−2) = 6, а 6 < 9 — верно, −2 подходит. Возьмём x = −4: −3·(−4) = 12, а 12 < 9 — неверно! Значит, подходят числа БОЛЬШЕ −3 → x > −3.',
      'Кружок: для строгого знака > или < — пустой (число на границе не подходит). Для нестрогого ≥ или ≤ — закрашенный (число подходит). x ≥ −3 включает само −3.',
      'Всегда проверяй ответ! Подставь одно число из твоего промежутка в исходное неравенство — если получилась правда, ответ верный.',
      'Запомни раз и навсегда: 1) делишь на положительное — знак тот же; 2) делишь на отрицательное — знак наоборот. Проверка числом — лучшая страховка!',
      'Теперь проверь себя: реши −3x < 9. Вспомни про деление на отрицательное число!'
    ],
    check: { q: 'Реши: x + 5 > 8', choices: ['x > 3', 'x > 13', 'x < 3', 'x > −3'], ans: 0,
      exp: 'x > 8 − 5 = 3.' },
    tasks: [
      { q: 'Сколько целых положительных x подходит: 2x < 10?', kind: 'unit', ans: 4, tol: 0,
        hints: ['x < 5.', '1, 2, 3, 4 — четыре.'], sol: '4' },
      { q: 'Реши: −3x < 9', kind: 'choice', choices: ['x > −3', 'x < −3', 'x > 3', 'x < 3'], ans: 0, tol: 0,
        hints: ['Делим на −3 → знак меняется.', 'x > −3.'], sol: 'x > −3' }
    ]
  };
  const axis=(val,open)=>`<svg viewBox="0 0 260 80" style="width:230px;height:71px;background:#101f18;border-radius:10px">
    <line x1="10" y1="44" x2="250" y2="44" stroke="#cfe0cf" stroke-width="2"/>
    ${[-3,-2,-1,0,1,2,3,4,5].map(n=>`<text x="${130+(n)*18}" y="60" text-anchor="middle" font-size="11" fill="#8fa08f">${n}</text>`).join('')}
    <circle cx="${130+(val)*18}" cy="44" r="7" fill="${open?'none':'#8fd1a8'}" stroke="#8fd1a8" stroke-width="3"/>
    <line x1="${130+(val)*18+8}" y1="44" x2="248" y2="44" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  function visC403(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:16px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Неравенство — почти уравнение</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">2x + 1 > 7</div>
        <div class="wv-row" style="gap:5px">${chip('>','#ff9a8a')}${chip('<','#7fd1ff')}${chip('≥','#8fd1a8')}${chip('≤','#e8a0d8')}</div>
        <div class="wv-sml">найти ВСЕ x, при которых верно</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Решаем как уравнение</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:19px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">2x + 1 > 7</div>
          <div class="wv-pop2">2x > 7 − 1</div>
          <div class="wv-pop2">2x > 6 | :2</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold;font-size:24px">x > 3</div>
        </div>
        <div class="wv-sml">делим на ПОЛОЖИТЕЛЬНОЕ 2 — знак тот же!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Ответ на оси: x > 3</div>
        ${axis(3,true)}
        <div class="wv-sml">пустой кружок — само 3 не подходит · луч вправо</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">ГЛАВНОЕ: делим на минус!</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:20px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">−3x < 9 | :(−3)</div>
          <div class="wv-pop2" style="color:#ff9a8a">было «<»</div>
          <div class="wv-pop3" style="color:#8fd1a8;font-size:26px;font-weight:bold">x > −3 — стало «>»!</div>
        </div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:7px 12px;font-size:14px;color:#ffcfc2;font-weight:bold" class="wv-ans">знак перевернулся — как зеркало!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем на числах</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['x = −2','−3·(−2) = 6 < 9 — верно ✔','#8fd1a8'],
            ['x = −4','−3·(−4) = 12 < 9 — НЕВЕРНО ✘','#ff9a8a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12.5px">${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">значит, x > −3 — подтвердилось!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Строгий и нестрогий знак</div>
        ${axis(-3,false)}
        <div class="wv-sml">x ≥ −3 — кружок ЗАКРАШЕН: само −3 подходит!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка — лучшая страховка</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">подставь число из ответа в исходное неравенство: 0 > −3 → −3·0 = 0 < 9 ✔ — правда!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Правило на всю жизнь</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['делишь на плюс','знак тот же','#8fd1a8'],
            ['делишь на минус','знак наоборот!','#ff9a8a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">−3x < 9</div>
        <div class="wv-sml">делим на −3 — не забудь перевернуть знак!</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">x ? −3</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[403]=visC403;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===403){ window.ARH_LESSONS[i]=L403; break; } } })();
})();
/* ================= УРОК 404 · Признаки равенства треугольников ================= */
(function(){
  const L404 = {
    id: 404, title: 'Признаки равенства треугольников', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7: треугольники', subj: 'math',
    explain: [
      'Два треугольника равны, если их можно совместить наложением: все стороны и углы совпали. Проверять все шесть элементов долго. Геометры нашли три КОРОТКИХ признака — по ним равенство проверяется быстро!',
      'Первый признак: если две стороны одного треугольника равны двум сторонам другого И угол МЕЖДУ ними равен — треугольники равны. Сравниваем «палочки» у угла: длина слева, угол, длина справа.',
      'Почему хватает двух сторон и угла? Треугольник — жёсткая конструкция. Две палочки выходят из вершины под известным углом: их концы заданы длинами, и третья сторона «дорисуется» сама. Шевельнуть нельзя!',
      'Второй признак: если сторона одного треугольника равна стороне другого и два угла, ПРИЛЕЖАЩИЕ к этой стороне, равны — треугольники равны. Сторона — как «полка», на которой лежат два угла по краям.',
      'Третий признак — самый простой: если все три стороны одного треугольника равны трём сторонам другого — треугольники равны. Углы даже сравнивать не нужно: стороны определяют форму полностью!',
      'Как запомнить? Первый: сторона — угол — сторона (СУС). Второй: угол — сторона — угол (УСУ). Третий: сторона — сторона — сторона (ССС). По первым буквам легко вспомнить!',
      'Помни про сумму углов: она всегда 180°. Зная два угла, третий находим вычитанием: 60° + 70° = 130°, третий = 180 − 130 = 50°. Это часто помогает в задачах на признаки.',
      'В задачах «докажи, что треугольники равны»: 1) ищи равные стороны (часто — общая сторона!); 2) ищи равные углы (вертикальные или данные); 3) выбери подходящий признак и запиши вывод.',
      'Теперь проверь себя: равенство по двум сторонам и углу между ними — какой это признак?'
    ],
    check: { q: 'Равенство по двум сторонам и углу между ними — какой признак?', choices: ['первый', 'второй', 'третий', 'такого нет'], ans: 0,
      exp: 'Это первый признак равенства.' },
    tasks: [
      { q: 'Сколько признаков равенства треугольников изучают?', kind: 'unit', ans: 3, tol: 0,
        hints: ['По сторонам и углам.', 'Три признака.'], sol: '3' },
      { q: 'По каким элементам проверяют третий признак?', kind: 'choice', choices: ['по трём сторонам', 'по двум сторонам и углу', 'по стороне и двум углам', 'по двум углам'], ans: 0, tol: 0,
        hints: ['Третий признак.', 'Три стороны.'], sol: 'по трём сторонам' }
    ]
  };
  const tri=(kind)=>`<svg viewBox="0 0 150 120" style="width:${kind==='sss'?160:150}px;height:120px">
    ${kind==='sus'?`<polygon points="75,12 15,108 135,108" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3"/>
      <line x1="75" y1="12" x2="15" y2="108" stroke="#ffd76a" stroke-width="4"/><line x1="75" y1="12" x2="135" y2="108" stroke="#8fd1a8" stroke-width="4"/>
      <path d="M75 12 L62 32 A 24 24 0 0 1 87 29 Z" fill="rgba(255,138,192,.5)"/>`:
    kind==='usu'?`<polygon points="20,108 130,108 75,12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="3"/>
      <line x1="20" y1="108" x2="130" y2="108" stroke="#ffd76a" stroke-width="4"/>
      <path d="M75 12 L62 32 A 24 24 0 0 1 87 29 Z" fill="rgba(255,138,192,.5)"/>
      <path d="M20 108 L44 88 A 26 26 0 0 0 22 92 Z" fill="rgba(127,209,255,.5)"/>`:
    `<polygon points="75,12 15,108 135,108" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="3"/>
      <line x1="75" y1="12" x2="15" y2="108" stroke="#ff9a8a" stroke-width="4"/><line x1="15" y1="108" x2="135" y2="108" stroke="#7fd1ff" stroke-width="4"/><line x1="135" y1="108" x2="75" y2="12" stroke="#8fd1a8" stroke-width="4"/>`}
  </svg>`;
  function visC404(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Равные треугольники</div>
        <div style="display:flex;gap:8px;justify-content:center">${tri('sss')}${tri('sss')}</div>
        <div class="wv-sml">можно наложить — всё совпало! Как проверить быстро?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">1-й признак: СУС</div>
        ${tri('sus')}
        <div class="wv-sml">две стороны + угол <b style="color:#ff8ac0">между ними</b></div>
        <div class="wv-sml">золотая и зелёная стороны + розовый угол</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Жёсткость треугольника</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">две «палочки» из вершины под углом: их концы заданы → третья сторона <b style="color:#ffd76a">дорисуется сама</b>! Шевельнуть нельзя.</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">2-й признак: УСУ</div>
        ${tri('usu')}
        <div class="wv-sml">сторона + два <b style="color:#ff8ac0">прилежащих</b> угла</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">3-й признак: ССС</div>
        ${tri('sss')}
        <div class="wv-sml">три стороны — углы проверять не нужно!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Как запомнить</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('СУС — 1-й','#7fd1ff')}${chip('УСУ — 2-й','#8fd1a8')}${chip('ССС — 3-й','#ffd76a')}
        </div>
        <div class="wv-sml">по первым буквам легко вспомнить!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма углов 180°</div>
        <div style="display:flex;gap:8px;justify-content:center;align-items:center">
          <span class="wv-chip">60°</span><span class="wv-chip">70°</span><span style="color:#ffd76a;font-size:22px">= 130°</span>
        </div>
        <div style="font-size:20px;color:#8fd1a8;font-family:Georgia,serif">третий = 180 − 130 = <b class="wv-ans">50°</b></div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Рецепт решения</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['1️⃣','ищи равные стороны (общая сторона!)','#7fd1ff'],
            ['2️⃣','ищи равные углы (вертикальные)','#8fd1a8'],
            ['3️⃣','выбери признак и запиши вывод','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${tri('sus')}
        <div class="wv-sml">две стороны и угол между ними — какой признак?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">первый? второй? третий?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[404]=visC404;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===404){ window.ARH_LESSONS[i]=L404; break; } } })();
})();
/* ================= УРОК 405 · Медианы, биссектрисы, высоты ================= */
(function(){
  const L405 = {
    id: 405, title: 'Медианы, биссектрисы, высоты', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7', subj: 'math',
    explain: [
      'У каждого треугольника есть три замечательных отрезка: медиана, биссектриса и высота. Все они выходят из вершины и тянутся к противоположной стороне. Чем они отличаются? Сейчас разберёмся!',
      'Медиана — отрезок из вершины к СЕРЕДИНЕ противоположной стороны. Она делит сторону BC пополам: BM = MC. Слово похоже на «средний» — она идёт в середину!',
      'Биссектриса — отрезок из вершины, который делит УГОЛ пополам. Угол A = 80° → биссектриса делит его на два по 40°. «Бис» — дважды, «сектриса» — режет: режет угол на два равных.',
      'Высота — отрезок из вершины, опущенный на противоположную сторону ПОД ПРЯМЫМ УГЛОМ (90°). Представь отвес строителя, падающий из вершины. Прямой угол на чертеже помечают квадратиком.',
      'В равнобедренном треугольнике (две стороны равны) медиана из вершины к основанию ОДНОВРЕМЕННО является и высотой, и биссектрисой! Один отрезок выполняет сразу три работы.',
      'Все три медианы пересекаются в ОДНОЙ точке — центроиде. Она делит каждую медиану в отношении 2:1 от вершины. Если поставить треугольник на эту точку, он будет балансировать!',
      'Как не перепутать? Медиана идёт к СЕРЕДИНЕ (равные отрезки на стороне). Биссектриса делит УГОЛ (равные углы). Высота — под 90° (квадратик прямого угла). На рисунке всегда есть подсказка!',
      'Биссектрисы тоже пересекаются в одной точке — центре вписанной окружности. А высоты — в ортоцентре. У каждого треугольника есть целый «ансамбль» замечательных точек!',
      'Теперь проверь себя: какой отрезок делит угол пополам — медиана, биссектриса или высота?'
    ],
    check: { q: 'Какой отрезок делит угол пополам?', choices: ['биссектриса', 'медиана', 'высота', 'хорда'], ans: 0,
      exp: 'Биссектриса делит угол пополам.' },
    tasks: [
      { q: 'Сколько медиан у треугольника?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Из каждой вершины.', 'Три медианы.'], sol: '3' },
      { q: 'Медиана из вершины равнобедренного треугольника также является…', kind: 'choice', choices: ['высотой и биссектрисой', 'только высотой', 'только биссектрисой', 'ничем'], ans: 0, tol: 0,
        hints: ['Свойство равнобедренного.', 'Медиана, высота и биссектриса совпадают.'], sol: 'высотой и биссектрисой' }
    ]
  };
  const triPic=(kind)=>`<svg viewBox="0 0 180 140" style="width:190px;height:148px">
    <polygon points="90,12 20,128 160,128" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="3"/>
    ${kind==='med'?`<line x1="90" y1="12" x2="90" y2="128" stroke="#ffd76a" stroke-width="4"/>
      <circle cx="90" cy="128" r="6" fill="#e86a5a"/><text x="98" y="122" font-size="11" fill="#e86a5a">середина</text>
      <text x="30" y="140" font-size="10" fill="#ffd76a">BM = MC</text>`:
    kind==='bis'?`<line x1="90" y1="12" x2="90" y2="112" stroke="#ff8ac0" stroke-width="4"/>
      <path d="M90 12 L74 34 A 22 22 0 0 1 104 30 Z" fill="rgba(255,138,192,.5)"/>
      <text x="60" y="36" font-size="10" fill="#ff8ac0">∠1=∠2</text>`:
    kind==='hgt'?`<line x1="120" y1="46" x2="160" y2="128" stroke="#7fd1ff" stroke-width="2" stroke-dasharray="5 4" opacity=".4"/>
      <line x1="120" y1="46" x2="120" y2="128" stroke="#7fd1ff" stroke-width="4"/>
      <rect x="112" y="112" width="16" height="16" fill="none" stroke="#7fd1ff" stroke-width="2"/>`:''}
  </svg>`;
  function visC405(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Три замечательных отрезка</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['медиана','к середине','#ffd76a'],['биссектриса','делит угол','#ff8ac0'],['высота','под 90°','#7fd1ff']].map(x=>`<span class="wv-chip" style="border-color:${x[2]};color:${x[2]}">${x[0]} — ${x[1]}</span>`).join('')}
        </div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col"><div class="wv-big">Медиана: в середину</div>${triPic('med')}<div class="wv-sml">делит сторону пополам: BM = MC</div></div>`;
    } else if(step===2){
      h=`<div class="wv-col"><div class="wv-big">Биссектриса: угол пополам</div>${triPic('bis')}<div class="wv-sml">∠1 = ∠2 — «режет» угол на два равных</div></div>`;
    } else if(step===3){
      h=`<div class="wv-col"><div class="wv-big">Высота: под 90°</div>${triPic('hgt')}<div class="wv-sml">перпендикуляр к стороне — квадратик прямого угла</div></div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Равнобедренный: всё в одном!</div>
        <svg viewBox="0 0 180 140" style="width:180px;height:140px">
          <polygon points="90,12 30,128 150,128" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="3"/>
          <line x1="90" y1="12" x2="90" y2="128" stroke="#ffd76a" stroke-width="4"/>
        </svg>
        <div style="background:rgba(255,215,106,.12);border:2px solid #ffd76a;border-radius:12px;padding:7px 12px;font-size:14.5px;color:#ffd76a;font-weight:bold" class="wv-ans">медиана = высота = биссектриса!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Точка пересечения медиан</div>
        <svg viewBox="0 0 180 140" style="width:180px;height:140px">
          <polygon points="90,12 30,128 150,128" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="2.5"/>
          <line x1="90" y1="12" x2="110" y2="128" stroke="#ffd76a" stroke-width="2.5" opacity=".7"/>
          <line x1="30" y1="128" x2="140" y2="58" stroke="#8fd1a8" stroke-width="2.5" opacity=".7"/>
          <line x1="150" y1="128" x2="60" y2="58" stroke="#e8a0d8" stroke-width="2.5" opacity=".7"/>
          <circle cx="90" cy="78" r="7" fill="#ffd76a"/>
        </svg>
        <div class="wv-sml">центроид: делит медиану в отношении 2:1 · точка баланса!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Как не перепутать</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['медиана','к СЕРЕДИНЕ → равные отрезки','#ffd76a'],
            ['биссектриса','делит УГОЛ → равные углы','#ff8ac0'],
            ['высота','под 90° → квадратик','#7fd1ff']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Ансамбль точек</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${[['центроид','медианы'],['инцентр','биссектрисы'],['ортоцентр','высоты']].map(x=>`<span class="wv-chip" style="border-color:#3d5c49;color:#cfe0cf">${x[0]} — ${x[1]}</span>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${triPic('bis')}
        <div class="wv-sml">кто делит угол пополам?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:17px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">медиана / биссектриса / высота</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[405]=visC405;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===405){ window.ARH_LESSONS[i]=L405; break; } } })();
})();
/* ================= УРОК 406 · Параллельные прямые и углы ================= */
(function(){
  const L406 = {
    id: 406, title: 'Параллельные прямые и углы', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7: параллельные', subj: 'math',
    explain: [
      'Параллельные прямые никогда не пересекаются — как рельсы или строчки в тетради. Если третья прямая (секущая) пересекает обе параллельные, образуются 8 углов. И у этих углов есть удивительные закономерности!',
      'Накрест лежащие углы лежат ВНУТРИ полосы между прямыми и по разные стороны от секущей — «накрест» друг от друга. При параллельных прямых они РАВНЫ. Это главное свойство!',
      'Соответственные углы лежат в «одинаковых местах» у пересечений — оба, например, справа от секущей. Они тоже РАВНЫ. Представь: сдвинь нижнее пересечение вверх — углы совпадут!',
      'Односторонние углы лежат ВНУТРИ полосы по одну сторону от секущей. Их сумма равна 180°. Это как два угла, которые вместе образуют развёрнутый угол.',
      'Кроме того, при каждом пересечении есть вертикальные углы — они стоят «крест-накрест» и равны. А соседние углы при пересечении дают в сумме 180°. Зная один угол, вычисляешь все остальные!',
      'Всё работает и НАОБОРОТ — это признаки параллельности: если накрест лежащие углы равны (или соответственные равны, или сумма односторонних 180°), то прямые ПАРАЛЛЕЛЬНЫ. Так доказывают параллельность!',
      'Практика: на рисунке один угол 70°. Накрест лежащий — тоже 70°. Соседний с ним на прямой: 180 − 70 = 110°. И все углы чередуются: 70°, 110°, 70°, 110°… Один угол — и вся картинка решена!',
      'Секрет в том, что 8 углов на самом деле принимают всего ДВА значения: 70° и 110°. Остальные — либо равны им (накрест лежащие, соответственные, вертикальные), либо дополняют до 180° (односторонние, соседние).',
      'Теперь проверь себя: накрест лежащие углы при параллельных прямых… Что с ними происходит?'
    ],
    check: { q: 'Накрест лежащие углы при параллельных прямых…', choices: ['равны', 'в сумме дают 180°', 'всегда разные', 'прямые'], ans: 0,
      exp: 'Накрест лежащие углы равны.' },
    tasks: [
      { q: 'Чему равна сумма односторонних углов при параллельных прямых?', kind: 'unit', ans: 180, tol: 0,
        hints: ['Свойство параллельных.', '180°.'], sol: '180°' },
      { q: 'Если соответственные углы равны, то прямые…', kind: 'choice', choices: ['параллельны', 'перпендикулярны', 'обязательно пересекаются', 'неизвестно'], ans: 0, tol: 0,
        hints: ['Признак параллельности.', 'Прямые параллельны.'], sol: 'параллельны' }
    ]
  };
  const parPic=(mode,angle)=>`<svg viewBox="0 0 260 170" style="width:230px;height:150px;background:#101f18;border-radius:12px">
    <line x1="20" y1="52" x2="240" y2="52" stroke="#8fd1a8" stroke-width="4"/>
    <line x1="20" y1="118" x2="240" y2="118" stroke="#8fd1a8" stroke-width="4"/>
    <line x1="90" y1="10" x2="180" y2="160" stroke="#ffd76a" stroke-width="3.5"/>
    ${mode==='nkl'?`<path d="M104 30 A 26 26 0 0 0 96 50 Z" fill="rgba(255,138,192,.6)"/><path d="M166 132 A 26 26 0 0 0 174 112 Z" fill="rgba(255,138,192,.6)"/>`:
    mode==='sot'?`<path d="M104 30 A 26 26 0 0 0 96 50 Z" fill="rgba(127,209,255,.6)"/><path d="M180 132 A 26 26 0 0 1 174 112 Z" fill="rgba(127,209,255,.6)"/>`:
    mode==='odn'?`<path d="M104 30 A 26 26 0 0 0 96 50 Z" fill="rgba(143,209,168,.6)"/><path d="M150 132 A 26 26 0 0 0 144 112 Z" fill="rgba(143,209,168,.6)"/>`:''}
    <text x="86" y="${angle===70?28:44}" font-size="12" fill="#fff">${angle}°</text>
    <text x="160" y="150" font-size="12" fill="#fff">${mode==='nkl'?'=?':mode==='sot'?'=?':'=?°'}</text>
  </svg>`;
  function visC406(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Параллельные и секущая</div>
        ${parPic('nkl',70)}
        <div class="wv-sml">две параллельные + секущая = 8 углов с секретами!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Накрест лежащие — равны</div>
        ${parPic('nkl',70)}
        <div style="background:rgba(255,138,192,.12);border:2px solid rgba(255,138,192,.5);border-radius:12px;padding:7px 12px;font-size:15px;color:#ff8ac0;font-weight:bold" class="wv-ans">∠1 = ∠2 — «накрест» внутри!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Соответственные — равны</div>
        ${parPic('sot',70)}
        <div class="wv-sml">в «одинаковых местах» у пересечений → равны</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Односторонние — сумма 180°</div>
        ${parPic('odn',70)}
        <div class="wv-sml">внутри, по одну сторону → ∠1 + ∠2 = 180°</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Вертикальные и соседние</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${[['вертикальные','равны','#ff8ac0'],['соседние','в сумме 180°','#8fd1a8']].map(x=>`<span class="wv-chip" style="border-color:${x[2]};color:${x[2]}">${x[0]} — ${x[1]}</span>`).join('')}
        </div>
        <div class="wv-sml">зная один угол, вычисляешь все остальные!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Признаки параллельности</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 12px;max-width:340px;width:100%">
          <div style="font-size:14.5px;color:#e8dcc8;text-align:center;line-height:1.6">накрест лежащие равны <b style="color:#ffd76a">или</b> соответственные равны <b style="color:#ffd76a">или</b> односторонние дают 180° → прямые <b style="color:#ffd76a">параллельны</b></div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем: угол 70°</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          ${[['70°','накрест лежащий'],['110°','соседний: 180−70'],['70°','соответственный'],['110°','вертикальный к 110°']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center;background:rgba(255,255,255,.04);border:1px solid ${i%2?'#3d5c49':'#5c6b8a'};border-radius:10px;padding:6px 10px"><b style="font-size:19px;color:#ffd76a;font-family:Georgia,serif">${x[0]}</b><div style="font-size:10px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">один угол — и вся картинка решена!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет: всего два значения</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">8 углов принимают всего <b style="color:#ffd76a">два значения</b>: 70° и 110°! Остальные равны им или дополняют до 180°.</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${parPic('nkl',70)}
        <div class="wv-sml">накрест лежащие при параллельных — что?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">равны? или 180°?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[406]=visC406;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===406){ window.ARH_LESSONS[i]=L406; break; } } })();
})();
/* ================= УРОК 407 · Модуль и уравнения с модулем ================= */
(function(){
  const L407 = {
    id: 407, title: 'Модуль и уравнения с модулем', ico: '🧮',
    src: 'Математика · 7 класс · Олимп-7: модуль', subj: 'math',
    explain: [
      'Модуль числа x, запись |x|, — это расстояние от числа до нуля на числовой оси. Расстояние не бывает отрицательным, поэтому модуль всегда ≥ 0. |5| = 5 и |−5| = 5: оба числа на расстоянии 5 от нуля!',
      'Простейшее правило: модуль положительного числа — само число (|7| = 7), модуль отрицательного — число без минуса (|−7| = 7). Модуль «отрезает» знак минус!',
      'Уравнение |x| = 4. Вопрос: какие числа находятся на расстоянии 4 от нуля? Слева — число −4, справа — 4. Значит, ДВА решения: x = 4 и x = −4. Вот главная ловушка: у уравнений с модулем обычно два ответа!',
      'Особый случай |x| = 0: расстояние равно нулю только у самого нуля → x = 0, единственное решение. А |x| = −3 решений не имеет: модуль никогда не бывает отрицательным!',
      'Усложним: |x − 3| = 2. Это расстояние от x до точки 3 равно 2. Отходим от тройки на 2 влево — в 1, на 2 вправо — в 5. Ответ: x = 5 или x = 1.',
      'Запомни общее правило: |x − a| = b → x = a + b или x = a − b. Здесь a — центр, b — радиус. Уравнение с модулем — это «найди точки на расстоянии b от точки a»!',
      'Модуль в жизни: разница температур |+5° − (−3°)| = 8°, расстояние между точками, погрешность измерений. Везде, где важна только величина без знака!',
      'В олимпиадных задачах модуль — способ сказать «расстояние» одним символом. |x| = a имеет два решения при a > 0, одно при a = 0 и ни одного при a < 0.',
      'Теперь проверь себя: реши |x| = 4. Вспомни про два направления — влево и вправо от нуля!'
    ],
    check: { q: 'Реши: |x| = 4', choices: ['x = 4 или x = −4', 'x = 4', 'x = −4', 'решений нет'], ans: 0,
      exp: 'Расстояние до нуля 4 → x = ±4.' },
    tasks: [
      { q: 'Сколько решений у уравнения |x| = 0?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Только x = 0.', 'Одно решение.'], sol: '1' },
      { q: 'Чему равно |−7|?', kind: 'choice', choices: ['7', '−7', '0', '14'], ans: 0, tol: 0,
        hints: ['Модуль — расстояние.', '|−7| = 7.'], sol: '7' }
    ]
  };
  const numAxis=(marks,highlights)=>`<svg viewBox="0 0 260 90" style="width:240px;height:83px;background:#101f18;border-radius:10px">
    <line x1="12" y1="50" x2="248" y2="50" stroke="#cfe0cf" stroke-width="2.5"/>
    <polygon points="248,50 240,45 240,55" fill="#cfe0cf"/>
    <circle cx="130" cy="50" r="4" fill="#e86a5a"/>
    ${marks.map(n=>`<text x="${130+n*16}" y="72" text-anchor="middle" font-size="12" fill="#8fa08f">${n}</text>`).join('')}
    ${(highlights||[]).map(p=>`<circle cx="${130+p.n*16}" cy="50" r="8" fill="${p.c}" opacity=".9"/>
      <text x="${130+p.n*16}" y="54" text-anchor="middle" font-size="10" fill="#0d1a13" font-weight="bold">${p.n}</text>`).join('')}
  </svg>`;
  function visC407(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:16px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Модуль — расстояние</div>
        ${numAxis([-5,-4,-3,-2,-1,0,1,2,3,4,5],[])}
        <div class="wv-sml">|−5| = 5 и |5| = 5 — оба на расстоянии 5 от нуля</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Минус «отрезается»</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${chip('|7| = 7','#8fd1a8')}${chip('|−7| = 7','#7fd1ff')}${chip('|0| = 0','#e8a0d8')}
        </div>
        <div class="wv-sml">модуль не «делает больше» — он убирает знак!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">|x| = 4 — два решения!</div>
        ${numAxis([-5,-4,-3,-2,-1,0,1,2,3,4,5],[{n:-4,c:'#7fd1ff'},{n:4,c:'#8fd1a8'}])}
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">x = 4 или x = −4</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Особые случаи</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['|x| = 0','x = 0 — одно решение','#8fd1a8'],
            ['|x| = −3','решений нет!','#ff9a8a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14.5px;color:#e8dcc8"><b style="font-family:Georgia,serif">${x[0]}</b><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">|x − 3| = 2</div>
        ${numAxis([-1,0,1,2,3,4,5,6],[{n:3,c:'#e86a5a'},{n:1,c:'#7fd1ff'},{n:5,c:'#8fd1a8'}])}
        <div class="wv-sml">расстояние от x до 3 равно 2 → x = 5 или x = 1</div>
        <div class="wv-ans" style="font-size:19px;color:#ffd76a">|x − a| = b → x = a ± b</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Общее правило</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:16px;color:#ffd76a;font-weight:bold;text-align:center;font-family:Georgia,serif">|x − a| = b → x = a + b или x = a − b</div>
        </div>
        <div class="wv-sml">a — центр, b — радиус: найди точки на расстоянии b от a!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Модуль в жизни</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['🌡️','|+5°−(−3°)| = 8°'],['📏','расстояние'],['🎯','погрешность']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:7px 10px"><div style="font-size:24px">${x[0]}</div><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Сколько решений?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['a > 0','два решения','#8fd1a8'],
            ['a = 0','одно решение','#7fd1ff'],
            ['a < 0','ни одного','#ff9a8a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><b style="font-family:Georgia,serif">|x| = a, ${x[0]}</b><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${numAxis([-5,-4,-3,-2,-1,0,1,2,3,4,5],[])}
        <div class="wv-sml">|x| = 4 — какие x?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">x = ? или x = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[407]=visC407;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===407){ window.ARH_LESSONS[i]=L407; break; } } })();
})();
/* ================= УРОК 408 · Сравнения по модулю ================= */
(function(){
  const L408 = {
    id: 408, title: 'Сравнения по модулю: введение', ico: '➗',
    src: 'Математика · 7 класс · Олимп-7: сравнения', subj: 'math',
    explain: [
      'Начнём с простого: разделим 17 на 5 с остатком. 17 = 3·5 + 2 — частное 3, остаток 2. Запомни этот пример — он станет главным героем урока! Остаток всегда меньше делителя: 2 < 5.',
      'Запись a ≡ b (mod m) читается «a сравнимо с b по модулю m» и означает: у a и b ОДИНАКОВЫЕ остатки при делении на m. Проверка: a − b должно делиться на m. Пример: 17 ≡ 2 (mod 5), ведь 17 − 2 = 15, а 15 делится на 5!',
      'Наглядная модель — часы с m делениями. Числа «заворачиваются» по кругу: 2, 7, 12, 17 при делении на 5 дают остаток 2 — все они «одна и та же точка» на циферблате mod 5!',
      'Находим остаток: сколько будет 23 (mod 4)? Ищем самое большое кратное 4, не большее 23: это 20 = 5·4. Остаток 23 − 20 = 3. Ответ: 23 ≡ 3 (mod 4).',
      'Проверка через разность: верно ли, что 29 ≡ 5 (mod 6)? Считаем 29 − 5 = 24, а 24 делится на 6 (24 : 6 = 4). Значит, сравнение верное! Оба способа — «остаток» и «разность делится» — равносильны.',
      'Магия сравнений: остатки можно СКЛАДЫВАТЬ! 17 ≡ 2 (mod 5) и 23 ≡ 3 (mod 5), значит, 17 + 23 ≡ 2 + 3 = 5 ≡ 0 (mod 5). То есть 17 + 23 = 40 делится на 5 — проверь: 40 : 5 = 8!',
      'Остатки можно и УМНОЖАТЬ: 17 ≡ 2 (mod 5), 23 ≡ 3 (mod 5) → 17·23 ≡ 2·3 = 6 ≡ 1 (mod 5). Огромные вычисления превращаются в маленькие — вот сила сравнений!',
      'Зачем это на олимпиадах? Доказать, что число не делится на 7, найти последнюю цифру степени, узнать день недели через 100 дней — всё через остатки. Запомни: a ≡ b (mod m) ⟺ a − b ⋮ m.',
      'Теперь проверь себя: чему равен остаток 17 при делении на 5? Вспомни: 17 = 3·5 + 2.'
    ],
    check: { q: 'Чему равен остаток 17 при делении на 5?', choices: ['2', '7', '1', '0'], ans: 0,
      exp: '17 = 3·5 + 2 → остаток 2, т.е. 17 ≡ 2 (mod 5).' },
    tasks: [
      { q: 'Найди остаток от деления 23 на 4.', kind: 'unit', ans: 3, tol: 0,
        hints: ['23 = 5·4 + 3.', 'Остаток 3.'], sol: '3' },
      { q: 'Запиши остаток: 29 ≡ … (mod 6)', kind: 'choice', choices: ['5', '6', '1', '3'], ans: 0, tol: 0,
        hints: ['29 = 4·6 + 5.', '29 ≡ 5 (mod 6).'], sol: '5' }
    ]
  };
  const clock=(m)=>`<svg viewBox="0 0 160 160" style="width:150px;height:150px;background:#101f18;border-radius:50%">
    ${Array.from({length:m},(_,i)=>{ const a=-90+i*(360/m); const x1=80+62*Math.cos(a*Math.PI/180), y1=80+62*Math.sin(a*Math.PI/180);
      const x2=80+52*Math.cos(a*Math.PI/180), y2=80+52*Math.sin(a*Math.PI/180);
      const lx=80+44*Math.cos(a*Math.PI/180), ly=80+44*Math.sin(a*Math.PI/180);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#3d5c49" stroke-width="3"/>
      <text x="${lx.toFixed(1)}" y="${(ly+5).toFixed(1)}" text-anchor="middle" font-size="13" fill="#cfe0cf">${i}</text>`; }).join('')}
    <circle cx="80" cy="80" r="70" fill="none" stroke="#5c8a6a" stroke-width="3"/>
  </svg>`;
  function visC408(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">17 : 5 с остатком</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">17 = 3·5 + 2</div>
        <div class="wv-row" style="gap:6px">${chip('частное 3','#7fd1ff')}${chip('остаток 2','#8fd1a8')}</div>
        <div class="wv-sml">остаток всегда меньше делителя: 2 < 5</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Запись a ≡ b (mod m)</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">17 ≡ 2 (mod 5)</div>
        <div style="font-size:17px;color:#8fd1a8;font-family:Georgia,serif">17 − 2 = 15, а 15 ⋮ 5</div>
        <div class="wv-sml">одинаковые остатки ⟺ разность делится на m</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">«Часы» mod 5</div>
        ${clock(5)}
        <div class="wv-sml">2, 7, 12, 17 — «одна и та же точка» по модулю 5!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">23 (mod 4)</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:19px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">кратное 4, не большее 23 → 20 = 5·4</div>
          <div class="wv-pop2">23 − 20 = 3</div>
          <div class="wv-pop3" style="font-size:24px;color:#ffd76a;font-weight:bold">23 ≡ 3 (mod 4)</div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка через разность</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">29 ≡ 5 (mod 6)?</div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:18px;color:#8fd1a8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">29 − 5 = 24</div>
          <div class="wv-pop2">24 : 6 = 4 — делится! ✔</div>
        </div>
        <div class="wv-sml">29 = 4·6 + 5 → остаток 5</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Складываем остатки!</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:18px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">17 ≡ 2 (mod 5) · 23 ≡ 3 (mod 5)</div>
          <div class="wv-pop2">17 + 23 ≡ 2 + 3 = <b style="color:#8fd1a8">5 ≡ 0</b></div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">40 : 5 = 8 — делится! ✔</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Умножаем остатки</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:18px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">17 ≡ 2, 23 ≡ 3 (mod 5)</div>
          <div class="wv-pop2">17·23 ≡ 2·3 = 6 ≡ <b style="color:#ffd76a">1</b> (mod 5)</div>
        </div>
        <div class="wv-sml">огромные вычисления → маленькие остатки!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Зачем это нужно</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['доказать, что число не ⋮ 7','проверь остаток','#7fd1ff'],
            ['последняя цифра степени','степень по mod 10','#8fd1a8'],
            ['день недели через 100 дней','mod 7!','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">17 = 3·5 + 2</div>
        <div class="wv-sml">остаток 17 при делении на 5?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? (mod 5)</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[408]=visC408;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===408){ window.ARH_LESSONS[i]=L408; break; } } })();
})();
/* ================= УРОК 409 · Параметры: линейные уравнения ================= */
(function(){
  const L409 = {
    id: 409, title: 'Параметры: линейные уравнения', ico: '⚙️',
    src: 'Математика · 7 класс · Олимп-7: параметры', subj: 'math',
    explain: [
      'Уравнение с параметром выглядит как обычное: ax = b. Но a и b — это БУКВЫ, за которыми прячутся числа. Параметр a — как «ручка настройки»: крутишь её — уравнение меняется. Наша задача — понять, как ответ зависит от ручки!',
      'Случай 1: a ≠ 0. Всё просто — делим обе части на a: x = b/a. Например, 3x = 6 → x = 2. При a ≠ 0 уравнение всегда имеет РОВНО ОДНО решение.',
      'Случай 2: a = 0 и b = 0. Уравнение превращается в 0·x = 0, то есть 0 = 0 — верно при ЛЮБОМ x! Подставь 5, 100, −7 — всё подойдёт. Решений бесконечно много.',
      'Случай 3: a = 0 и b ≠ 0, например 0·x = 5. Слева всегда 0, а справа 5. Ноль не равен пяти никогда! Значит, уравнение НЕ имеет решений.',
      'Сводим к виду ax = b. В задачах уравнение дают не готовым: ax + 1 = 5. Упрощаем как обычно: переносим 1 вправо с минусом: ax = 4. Теперь видно: при a ≠ 0 → x = 4/a, при a = 0 решений нет (4 ≠ 0).',
      'Олимпиадный пример: при каком a уравнение ax = 6 не имеет решений? По правилу: решений нет, когда a = 0 (0·x = 6 — ложь). А при a = 0 и b = 0 (0·x = 0) решений, наоборот, бесконечно много.',
      'Запомни три строки-шпаргалку: 1) a ≠ 0 → x = b/a (одно решение); 2) a = 0, b = 0 → бесконечно много; 3) a = 0, b ≠ 0 → ни одного. Сведи к виду ax = b — и смотри на a и b!',
      'Параметры — это «уравнения с секретом»: ответ зависит от буквы. На олимпиадах любят спрашивать: «при каком значении параметра…» — теперь ты знаешь все три случая!',
      'Теперь проверь себя: реши ax = 6 при a = 3. Просто раздели 6 на 3 — параметр «превратился» в обычное число!'
    ],
    check: { q: 'Уравнение ax = 6. При a = 3 чему равен x?', choices: ['2', '3', '6', '18'], ans: 0,
      exp: 'x = 6 : 3 = 2.' },
    tasks: [
      { q: 'При каком a уравнение ax = 0 имеет бесконечно много решений?', kind: 'unit', ans: 0, tol: 0,
        hints: ['0·x = 0 верно при любом x.', 'a = 0.'], sol: '0' },
      { q: 'Сколько решений у уравнения 0·x = 5?', kind: 'choice', choices: ['ни одного', 'x = 5', 'бесконечно много', 'x = 0'], ans: 0, tol: 0,
        hints: ['0 ≠ 5.', 'Решений нет.'], sol: 'ни одного' }
    ]
  };
  const caseCard=(title,body,color,ok)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:14px;padding:10px 12px;max-width:320px;width:100%">
    <b style="font-size:15px;color:${color}">${title}</b>
    <div style="font-family:Georgia,serif;font-size:19px;color:#e8dcc8;margin-top:4px">${body}</div>
    <div style="font-size:13px;color:${ok?'#8fd1a8':'#ff9a8a'};font-weight:bold;margin-top:3px">${ok?'✔ одно решение':'✘ решений нет'}</div>
  </div>`;
  function visC409(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Уравнение с параметром</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">ax = b</div>
        <div class="wv-row" style="gap:5px;flex-wrap:wrap">
          ${chip('a — «ручка настройки»','#7fd1ff')}${chip('b — число','#8fd1a8')}${chip('x — неизвестное','#ffd76a')}
        </div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Случай 1: a ≠ 0</div>
        ${caseCard('a ≠ 0', 'x = b/a', '#8fd1a8', true)}
        <div class="wv-sml" style="color:#8fd1a8">пример: 3x = 6 → x = 2</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Случай 2: a = 0, b = 0</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">0·x = 0 → 0 = 0</div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:16px;color:#8fd1a8;font-weight:bold" class="wv-ans">бесконечно много решений!</div>
        <div class="wv-sml">подставь 5, 100, −7 — всё подойдёт</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Случай 3: a = 0, b ≠ 0</div>
        <div style="font-size:24px;color:#ff9a8a;font-family:Georgia,serif">0·x = 5</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:16px;color:#ffcfc2;font-weight:bold" class="wv-ans">0 = 5 — ложь → решений НЕТ</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Сводим к виду ax = b</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:19px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">ax + 1 = 5</div>
          <div class="wv-pop2">ax = 5 − 1 = <b style="color:#ffd76a">4</b></div>
        </div>
        <div class="wv-sml">a ≠ 0 → x = 4/a · a = 0 → решений нет (4 ≠ 0)</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Олимпиадный пример</div>
        <div class="wv-sml">при каком a уравнение ax = 6 не имеет решений?</div>
        <div style="background:rgba(232,106,90,.1);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:17px;color:#ffcfc2;font-weight:bold" class="wv-ans">a = 0: 0·x = 6 — решений нет!</div>
        <div class="wv-sml">а при a = 0, b = 0 — бесконечно много</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Шпаргалка: три случая</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['a ≠ 0','x = b/a — одно решение','#8fd1a8'],
            ['a = 0, b = 0','0 = 0 — ∞ решений','#7fd1ff'],
            ['a = 0, b ≠ 0','0 = b — нет решений','#ff9a8a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]};font-family:Georgia,serif">${x[0]}</b><span style="font-size:12.5px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Что такое параметры</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">«уравнения с секретом»: ответ зависит от буквы a. На олимпиадах спрашивают «при каком значении параметра…» — теперь знаешь все случаи!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">3x = 6</div>
        <div class="wv-sml">a = 3 — делим: x = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">x = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[409]=visC409;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===409){ window.ARH_LESSONS[i]=L409; break; } } })();
})();
/* ================= УРОК 410 · Средние: неравенство о средних ================= */
(function(){
  const L410 = {
    id: 410, title: 'Средние: неравенство о средних', ico: '📊',
    src: 'Математика · 7 класс · Олимп-7: средние', subj: 'math',
    explain: [
      'Для двух чисел a и b есть два знаменитых средних. Среднее арифметическое: (a + b)/2 — складываем и делим на 2. Среднее геометрическое: √(a·b) — перемножаем и извлекаем корень. Для 4 и 9: (4+9)/2 = 6,5, а √(4·9) = √36 = 6.',
      'Великое неравенство о средних: для положительных a и b всегда (a + b)/2 ≥ √(a·b). Среднее арифметическое НЕ МЕНЬШЕ среднего геометрического! Проверим на 4 и 9: 6,5 ≥ 6 — верно.',
      'Когда достигается равенство? Только когда a = b! Например, при a = b = 9: (9+9)/2 = 9 и √81 = 9 — оба средних равны. Разница между ними показывает, насколько числа отличаются.',
      'Почему неравенство верно? Квадрат любого числа неотрицателен: (√a − √b)² ≥ 0. Раскрываем: a − 2√(ab) + b ≥ 0 → a + b ≥ 2√(ab). Делим на 2 — получаем наше неравенство!',
      'Применяем: найди минимум x + 4/x при x > 0. Это сумма двух чисел: x и 4/x. Их произведение: x·(4/x) = 4. По неравенству сумма ≥ 2·√4 = 4. Минимум равен 4!',
      'Когда достигается минимум? Равенство при a = b, то есть x = 4/x → x² = 4 → x = 2 (x > 0). Проверяем: 2 + 4/2 = 2 + 2 = 4. Минимум достигнут при x = 2!',
      'Ещё проверка: среднее арифметическое 8 и 12: (8+12)/2 = 10. Среднее геометрическое: √(8·12) = √96 ≈ 9,8. Видим: 10 ≥ 9,8 — неравенство снова работает!',
      'Где применяется на олимпиадах: доказать x + 1/x ≥ 2 при x > 0, найти наименьшее a + b при заданном произведении, оценить площадь при данном периметре. Главный инструмент задач на минимум и максимум!',
      'Теперь проверь себя: что больше при a = b = 9 — (a+b)/2 или √(ab)? Вспомни: при равных числах средние равны!'
    ],
    check: { q: 'Что больше при a = b = 9: (a+b)/2 или √(ab)?', choices: ['они равны', 'среднее арифметическое', 'среднее геометрическое', 'нельзя сравнить'], ans: 0,
      exp: '(9+9)/2 = 9 и √81 = 9 — равны.' },
    tasks: [
      { q: 'Найди среднее арифметическое чисел 8 и 12.', kind: 'unit', ans: 10, tol: 0,
        hints: ['(8 + 12) : 2.', '10.'], sol: '10' },
      { q: 'Для положительных a и b всегда верно…', kind: 'choice', choices: ['(a+b)/2 ≥ √(ab)', '(a+b)/2 < √(ab)', '(a+b)/2 = √(ab) всегда', 'сравнить нельзя'], ans: 0, tol: 0,
        hints: ['Неравенство о средних.', 'Среднее арифметическое ≥ среднего геометрического.'], sol: '(a+b)/2 ≥ √(ab)' }
    ]
  };
  const bar2=(a,b,labelA,labelB)=>`<div style="display:flex;align-items:flex-end;gap:14px;justify-content:center;height:110px;padding:6px 10px;background:#101f18;border-radius:12px">
    <div style="display:flex;flex-direction:column;align-items:center"><div style="width:36px;height:${a*2}px;background:linear-gradient(#7fd1ff,#4a93d0);border-radius:4px 4px 0 0"></div><span style="font-size:12px;color:#7fd1ff;margin-top:2px">${labelA||a}</span></div>
    <div style="display:flex;flex-direction:column;align-items:center"><div style="width:36px;height:${b*2}px;background:linear-gradient(#8fd1a8,#4c8a5a);border-radius:4px 4px 0 0"></div><span style="font-size:12px;color:#8fd1a8;margin-top:2px">${labelB||b}</span></div>
  </div>`;
  function visC410(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Два средних</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${chip('(a+b)/2 — арифметическое','#7fd1ff')}${chip('√(a·b) — геометрическое','#8fd1a8')}
        </div>
        <div class="wv-sml">для 4 и 9: (4+9)/2 = 6,5 · √36 = 6</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Неравенство о средних</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:19px;color:#ffd76a;font-weight:bold;text-align:center;font-family:Georgia,serif">(a+b)/2 ≥ √(a·b)</div>
        </div>
        <div class="wv-sml">для положительных a и b · проверка: 6,5 ≥ 6 ✔</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Равенство при a = b</div>
        <div class="wv-row" style="gap:8px">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#7fd1ff;font-family:Georgia,serif">(9+9)/2 = 9</b><div style="font-size:10px;color:#9ec0a8">арифметическое</div></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#8fd1a8;font-family:Georgia,serif">√81 = 9</b><div style="font-size:10px;color:#9ec0a8">геометрическое</div></div>
        </div>
        <div class="wv-sml">при a = b средние равны!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Почему это правда?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">(√a − √b)² ≥ 0</div>
          <div class="wv-pop2">a − 2√(ab) + b ≥ 0</div>
          <div class="wv-pop2">a + b ≥ 2√(ab)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">делим на 2 — готово!</div>
        </div>
        <div class="wv-sml">квадрат числа не бывает отрицательным!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Минимум x + 4/x</div>
        <div class="wv-sml">x и 4/x — сумма двух чисел, произведение = x·(4/x) = 4</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">x + 4/x ≥ 2·√4 = <b style="color:#8fd1a8" class="wv-ans">4</b></div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Когда минимум?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:18px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">равенство при x = 4/x</div>
          <div class="wv-pop2">x² = 4 → x = 2 (x > 0)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">2 + 4/2 = 4 ✔ минимум!</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка: 8 и 12</div>
        ${bar2(10,9.8,'(8+12)/2 = 10','√96 ≈ 9,8')}
        <div class="wv-sml">10 ≥ 9,8 — неравенство работает!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Где применяется</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['x + 1/x ≥ 2','при x > 0','#7fd1ff'],
            ['минимум a + b','при a·b = const','#8fd1a8'],
            ['оценка площади','при данном периметре','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">главный инструмент задач на минимум и максимум!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">a = b = 9: (a+b)/2 или √(ab)?</div>
        <div class="wv-row" style="gap:8px">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#7fd1ff;font-family:Georgia,serif">(9+9)/2 = 9</b></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#8fd1a8;font-family:Georgia,serif">√81 = 9</b></div>
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">что больше?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[410]=visC410;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===410){ window.ARH_LESSONS[i]=L410; break; } } })();
})();
