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
