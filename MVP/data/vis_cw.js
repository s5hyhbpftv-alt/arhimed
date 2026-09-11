/* Волна C v2: уроки 399–412 (7 класс) в формате «объясни → реши + живой виджет».
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_C[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_C = window.WAVE_C || {};
window._waveCss = window._waveCss || function(id, css){
  try{
    if(!document.getElementById(id)){
      const s=document.createElement('style');
      s.id=id;
      s.textContent=String(css).replace(/<\/?style>/gi,'');
      document.head.appendChild(s);
    }
  }catch(e){}
};


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
      'Загадка: уравнение 2x + 1 = 7 ищет одну точку. Неравенство 2x + 1 > 7 ищет все точки, где правда. Ответ — не число, а луч. Сейчас нарисуем этот луч и узнаем, когда он вдруг разворачивается.',
      'Четыре знака. > строго больше, < строго меньше, ≥ не меньше, ≤ не больше. Строгий знак границу не берёт — кружок пустой. Нестрогий берёт — кружок полный. Решить — выписать все x, для которых предложение верно.',
      'Ход как у уравнения. 2x + 1 > 7: единицу вправо с минусом, 2x > 6. Делим на плюс два — знак тот же: x > 3. Пока делишь на положительное, зеркало не нужно.',
      'Картинка: пустой кружок на 3 и луч вправо. Тройка не входит: 2·3 + 1 = 7, а нам нужно строго больше. Четвёрка входит, сотня входит, 3,1 входит. Целая половина оси.',
      'Жми числа на оси. Зелёные — правда, красные — ложь. Граница 3 красная, потому что знак строгий. Так проверяют ответ быстрее, чем алгеброй.',
      'Главный закон. Умножили или разделили обе части на отрицательное — знак переворачивается. −3x < 9 делим на −3: было «меньше», стало x > −3. Забыл перевернуть — луч уехал не туда.',
      'Почему зеркало. Возьми x = −2: −3·(−2) = 6 < 9, правда. Возьми x = −4: −3·(−4) = 12 < 9, ложь. Подходят числа больше −3, не меньше. Проба двумя точками ловит ошибку в знаке.',
      'Нажми «Перевернуть»: стрелка знака меняется местами. Это не фокус, это порядок на оси: умножение на минус разворачивает числа. Больше становится меньше.',
      'Кружок. > и < — пустой, граница снаружи. ≥ и ≤ — полный, граница внутри. x ≥ −3 включает −3: подставь, получишь верное равенство, а нестрогое это разрешает.',
      'Страховка: подставь любое число из луча в исходное, не в упрощённое. Если вышла правда — луч смотрит верно. Если ложь — ищи, где забыл минус.',
      'Счёт целых. 2x < 10 → x < 5. Положительные целые: 1, 2, 3, 4. Четыре штуки. Ноль и отрицательные тоже подходят к неравенству, но вопрос просил только положительные — читай условие.',
      'Живая ручка: двигай x, смотри 2x + 1 против семёрки. Слева от тройки полоска ниже, справа выше. Неравенство — про высоту полоски, не про одно равенство.',
      'Связка знаков. Перенос слагаемых — как в уравнении. Деление на плюс — знак тот же. Деление на минус — наоборот. Рисовать ось. Проверять точкой.',
      'Рецепт. 1) Упрости, как уравнение. 2) Смотри знак делителя. 3) Нарисуй кружок и луч. 4) Проверь точкой из луча и точкой с другой стороны. 5) Если считают целые — не забудь, входит ли граница.',
      'В карман: 2x + 1 > 7 → x > 3, кружок пустой, вправо. −3x < 9 → x > −3, знак перевернули. 2x < 10, положительных целых четыре. x + 5 > 8 → x > 3.',
      'Проверка: x + 5 > 8. Пятёрку вправо с минусом. x > 3. Не 13: это сложили. Не «меньше»: минуса в делении не было.'
    ],
    check: { q: 'Реши: x + 5 > 8', choices: ['x > 3', 'x > 13', 'x < 3', 'x > −3'], ans: 0,
      exp: 'Перенесли 5: x > 3. Делили на плюс, знак тот же.' },
    tasks: [
      { q: 'Сколько целых положительных x подходит: 2x < 10?', kind: 'unit', ans: 4, tol: 0,
        hints: ['x < 5, положительные целые.', '1, 2, 3, 4 — граница 5 не входит.'], sol: '4' },
      { q: 'Реши: −3x < 9', kind: 'choice',
        choices: ['x > −3', 'x < −3', 'x > 3', 'x < 3'], ans: 0, tol: 0,
        hints: ['Делим на −3, знак переворачивается.', 'x > −3.'], sol: 'x > −3' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l403ink{to{stroke-dashoffset:0}}
    @keyframes l403pop{0%{transform:scale(.18);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l403pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l403glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l403-ink{animation:l403ink 1.3s cubic-bezier(.2,.75,.15,1) forwards}
    .l403-dot{transform-box:fill-box;transform-origin:center;animation:l403pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l403-pulse{animation:l403pulse 1.6s ease-in-out infinite}
    .l403-glow{animation:l403glow 1.8s ease-in-out infinite}
    .l403-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l403-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l403-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-l403', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function AX(n){ return 120 + n*16; }
  function axis(bound, dir, open, hi){
    dir=dir==null?1:dir;
    const y=120;
    let t=`<line x1="18" y1="${y}" x2="222" y2="${y}" stroke="#3d5c49" stroke-width="2"/>`;
    const lo=hi?-6:-5, top=hi?6:5;
    for(let n=lo;n<=top;n++){
      const x=AX(n);
      if(x<22||x>218) continue;
      t+=`<line x1="${x}" y1="${y-6}" x2="${x}" y2="${y+6}" stroke="#3d5c49"/>`+lab(x, y+22, String(n), MUTED, 'middle', 10);
    }
    const bx=Math.max(28, Math.min(212, AX(bound)));
    const end=dir>0?216:24;
    t+=`<line x1="${bx}" y1="${y}" x2="${end}" y2="${y}" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" opacity=".85"/>`;
    t+=`<circle class="l403-glow" cx="${bx}" cy="${y}" r="8" fill="${open?'#0c1a14':GREEN}" stroke="${GREEN}" stroke-width="3"/>`;
    return t;
  }

  function visC403(el){
    try{ window._waveCss && _waveCss('css-l403', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'403';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const xv=Math.max(-4, Math.min(8, +(st.x==null?4:st.x)));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 40, open?'луч, не точка':'= ищет точку, > ищет …?', GOLD, 'middle', 14)+
          (open?axis(3,1,true):`<circle cx="120" cy="120" r="8" fill="${GOLD}"/>`+lab(120, 148, 'x = 3', MUTED))+
          lab(120, 188, '2x + 1 > 7', BLUE)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть луч'}</button>
        ${note('Не одно число','Уравнение ставит точку. Неравенство закрашивает все x, где предложение правда. Ответ рисуют лучом.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:320px">
          ${[['>','строго, пустой',RED],['<','строго, пустой',BLUE],['≥','граница внутри',GREEN],['≤','граница внутри',GOLD]].map((x,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.08}s;min-width:120px;text-align:center;border:2px solid ${x[2]};border-radius:12px;padding:8px 10px">
              <div style="font-size:22px;color:${x[2]};font-family:Georgia,serif">${x[0]}</div>
              <div style="font-size:12px;color:#e8dcc8">${x[1]}</div></div>`).join('')}
        </div>
        ${note('Четыре знака','Строгий не берёт границу. Нестрогий берёт. Путать ≥ с > — типичная ошибка на оси: кружок должен быть полным или пустым.')}
      </div>`;
    } else if(step===2){
      const show=Math.max(0, Math.min(3, st.s==null?0:+st.s));
      const rows=['2x + 1 > 7','2x > 6','делим на +2, знак тот же','x > 3'];
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,280px)">
          ${rows.map((t,i)=>`<div class="wv-pop" style="opacity:${i<=show?1:.28};border:1px solid #3d5c49;border-left:4px solid ${i===3?GREEN:GOLD};border-radius:10px;padding:8px 12px;font-size:16px;color:${i===3?GREEN:'#e8dcc8'};font-family:Georgia,serif">${t}</div>`).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].s=Math.min(3,(CHS[k].s||0)+1);chRender(0);}catch(e){}">${show>=3?'Готово':'Следующая строка'}</button>
        ${note('Как уравнение','Перенос слагаемых тот же. Делитель плюс — зеркало не трогаем. Минус появится позже.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(axis(3,1,true)+lab(120, 40, 'x > 3', GOLD)+lab(120, 188, 'тройка снаружи', MUTED))}
        ${note('Пустой кружок','2·3 + 1 = 7, равенство, а знак строгий. Граница не в ответе. Луч вправо: все, кто больше.')}
      </div>`;
    } else if(step===4){
      const pick=st.p;
      const ok=n=>n>3;
      const nums=[-1,0,2,3,4,5];
      h=`<div class="wv-col">
        ${frame(axis(3,1,true)+(pick==null?'':`<circle class="l403-dot" cx="${AX(pick)}" cy="120" r="6" fill="${ok(pick)?GREEN:RED}"/>`)+lab(120, 40, pick==null?'жми число':'x = '+pick+(ok(pick)?' правда':' ложь'), pick==null?GOLD:(ok(pick)?GREEN:RED)))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${nums.map(n=>`<button type="button" class="btn" style="border-color:${pick===n?(ok(n)?GREEN:RED):'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].p=${n};chRender(0);}catch(e){}">${n}</button>`).join('')}
        </div>
        ${note('Проба на оси','3 красная: строго. 4 зелёная. 2 красная — не в луче. Так ловят ошибку, не пересчитывая всё.')}
      </div>`;
    } else if(step===5){
      const fl=!!st.fl;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, '−3x < 9', GOLD, 'middle', 22)+
          lab(120, 104, fl?'делим на −3':'делим на минус', MUTED)+
          lab(120, 150, fl?'x > −3':'знак …?', fl?GREEN:RED, 'middle', 22)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].fl=1;chRender(0);}catch(e){}">${fl?'Перевернули':'Перевернуть знак'}</button>
        ${note('Главный закон','Минус в делителе разворачивает неравенство. Забыл — луч уехал в другую сторону, и все пробы станут красными.')}
      </div>`;
    } else if(step===6){
      const pick=st.q;
      const ok=n=>n>-3;
      h=`<div class="wv-col">
        ${frame(axis(-3,1,true,true)+(pick==null?'':`<circle class="l403-dot" cx="${AX(pick)}" cy="120" r="6" fill="${ok(pick)?GREEN:RED}"/>`)+lab(120, 40, '−3x < 9  →  x > −3', GOLD, 'middle', 13))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[-5,-4,-3,-2,0,2].map(n=>`<button type="button" class="btn" style="border-color:${pick===n?(ok(n)?GREEN:RED):'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].q=${n};chRender(0);}catch(e){}">${n}</button>`).join('')}
        </div>
        ${note('Две пробы','−2: −3·(−2)=6 < 9, правда. −4: 12 < 9, ложь. Значит луч вправо от −3, не влево. Проба ловит забытый переворот.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          lab(80, 70, 'a < b', BLUE, 'middle', 18)+
          lab(160, 70, '−a > −b', GREEN, 'middle', 18)+
          lab(120, 130, 'минус разворачивает ось', GOLD)+
          lab(120, 170, 'больше ↔ меньше', MUTED)
        )}
        ${note('Почему зеркало','Умножить на минус — как развернуть линейку. Кто был правее, стал левее. Знак неравенства обязан развернуться вместе с осью.')}
      </div>`;
    } else if(step===8){
      const full=!!st.full;
      h=`<div class="wv-col">
        ${frame(axis(-3,1,!full,true)+lab(120, 40, full?'x ≥ −3, граница внутри':'x > −3, граница снаружи', GOLD, 'middle', 13))}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].full=!CHS[k].full;chRender(0);}catch(e){}">${full?'Сделать строгим':'Закрасить кружок'}</button>
        ${note('Пустой и полный','Строгий — дырка. Нестрогий — диск. Подставь границу: если исходное стало равенством и знак нестрогий — кружок полный.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['точка из луча','должна дать правду',GREEN],
            ['точка с другой стороны','должна дать ложь',RED],
            ['граница','правда только если ≥ или ≤',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Страховка','Подставляй в исходное, не в упрощённое. Так ловят ошибку переноса и ошибку знака одним взглядом.')}
      </div>`;
    } else if(step===10){
      const on=st.ints||[];
      const good=[1,2,3,4];
      h=`<div class="wv-col">
        ${frame(axis(5,-1,true)+lab(120, 40, '2x < 10  →  x < 5', GOLD)+lab(120, 188, 'положительные целые?', MUTED))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[1,2,3,4,5,6].map(n=>{
            const sel=on.indexOf(n)>=0;
            const right=n<5;
            return `<button type="button" class="btn" style="border-color:${sel?(right?GREEN:RED):'#3d5c49'}"
              onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};const a=(CHS[k].ints||[]).slice(); if(a.indexOf(${n})<0)a.push(${n}); CHS[k].ints=a; chRender(0);}catch(e){}">${n}</button>`;
          }).join('')}
        </div>
        ${on.length?`<div class="wv-ans" style="font-size:15px">выбрано подходящих: ${on.filter(n=>n<5&&n>0).length} из 4</div>`:''}
        ${note('Читай вопрос','x < 5. Пятёрка не входит. Положительные: 1–4. Ноль тоже меньше пяти, но его не просили.')}
      </div>`;
    } else if(step===11){
      const v=2*xv+1;
      const pass=v>7;
      const hgt=Math.max(8, Math.min(140, v*8));
      h=`<div class="wv-col">
        ${frame(
          `<rect x="70" y="${180-hgt}" width="36" height="${hgt}" rx="6" fill="${pass?GREEN:RED}33" stroke="${pass?GREEN:RED}"/>`+
          `<line x1="50" y1="${180-56}" x2="190" y2="${180-56}" stroke="${GOLD}" stroke-dasharray="5 4"/>`+
          lab(170, 180-56-8, '7', GOLD)+
          lab(88, 40, '2x+1 = '+(Math.round(v*10)/10).toString().replace('.',','), pass?GREEN:RED)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">x
          <input type="range" min="-20" max="80" value="${Math.round(xv*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].x=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:28px">${xv.toString().replace('.',',')}</b>
        </label>
        ${note('Высота против семёрки','Полоска выше золотой черты — правда. Ниже — ложь. Граница x = 3, полоска ровно 7: для строгого знака ещё не хватает.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['перенос','как в уравнении',BLUE],
            ['деление на плюс','знак тот же',GREEN],
            ['деление на минус','знак наоборот',RED],
            ['ось + проба','кружок и две точки',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Связка','Алгебра даёт луч. Ось его рисует. Проба его проверяет. Без одного из трёх легко уехать не туда.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Упрости как уравнение',GOLD],
            ['2','Смотри знак делителя',RED],
            ['3','Кружок и луч на оси',GREEN],
            ['4','Проба из луча и снаружи',BLUE]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не рисуй луч, пока не решил, куда смотрит знак. Не сдавай, пока две пробы не согласны.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(axis(3,1,true)+lab(120, 40, 'x > 3  ·  пустой  ·  вправо', GOLD, 'middle', 13)+lab(120, 188, 'минус → перевернуть', RED))}
        ${note('В карман','2x+1>7 → x>3. −3x<9 → x>−3. Положительных целых у 2x<10 — четыре. x+5>8 → x>3.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(lab(120, 80, 'x + 5 > 8', GOLD, 'middle', 22)+lab(120, 130, 'x ? 3', MUTED))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">x > ?</div>
        ${note('Проверка','x > 3. Пятёрку перенесли. Не 13 и не меньше: минуса не было.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[403]=visC403;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===403){ arr[i]=L403; f=true; break; } }
    if(!f) arr.push(L403);
  })();
})();
/* ================= УРОК 404 · Признаки равенства треугольников ================= */
(function(){
  const L404 = {
    id: 404, title: 'Признаки равенства треугольников', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7: треугольники', subj: 'math',
    explain: [
      'Загадка: два треугольника. Чтобы доказать, что они равны, можно сравнивать все шесть кусков: три стороны и три угла. Геометры нашли три коротких ключа. Одного ключа хватает — если он настоящий.',
      'Равны значит: можно наложить и они совпадут. Нажми «Наложить»: правый треугольник едет на левый. Если ключ верный, контуры сливаются. Если нет — торчит угол.',
      'Первый ключ СУС: две стороны и угол между ними. Не любой угол, а тот, что зажат этими сторонами. Две палочки из одной вершины под известным углом: концы заданы, третья сторона дорисуется сама. Шевельнуть нельзя — треугольник жёсткий.',
      'Почему «между». Если угол не между данными сторонами, это уже не СУС, а ССУ — и такого признака нет. Нажми «Не тот угол»: форма прыгает, равенства нет. Ловушка номера один.',
      'Второй ключ УСУ: сторона и два прилежащих к ней угла. Сторона как полка, углы сидят по краям. Третий угол сам 180 минус сумма, дальше стороны определяются однозначно.',
      'Полка важна: углы должны прилежать к этой стороне, не быть «где-то в треугольнике». Если дан угол напротив, это уже другой разговор.',
      'Третий ключ ССС: три стороны. Углы можно не трогать. Три палочки заданной длины собираются в треугольник одним способом (с точностью до переворота). Форма заморожена.',
      'Памятка. СУС — первый. УСУ — второй. ССС — третий. Переключай ключи на чертеже: загораются нужные палочки и дуги. Остальное серое — его доказывать не надо.',
      'Не-ключ ССУ: две стороны и угол напротив одной из них. Иногда получаются два разных треугольника. Поэтому в школе этот набор не признак. Не записывай его как четвёртый.',
      'Сумма углов 180°. Зная два, третий даром. Часто УСУ получают так: дали один угол, второй нашли вычитанием, сторона общая — и ключ собрался.',
      'Общая сторона — подарок. Два треугольника с общей BC: эта сторона уже равна себе. Ищи ещё два куска. Нажми общую — она вспыхнет один раз на двоих.',
      'Как пишут доказательство. 1) Равные стороны (данные, общие, вертикальные не бывают у сторон — у углов). 2) Равные углы (данные, вертикальные, накрест). 3) Имя ключа. 4) Вывод: треугольники равны.',
      'После равенства соответствующие элементы равны. Соответствие вершин пишут в порядке: ABC = A₁B₁C₁ значит A↔A₁, сторона AB↔A₁B₁. Порядок букв — это карта, не украшение.',
      'Рецепт. Сначала общая или равные по условию. Потом углы. Собрать СУС, УСУ или ССС. Не хватает куска — не выдумывай ССУ. Проверь соответствие вершин.',
      'В карман: три ключа. СУС — угол между. УСУ — углы к стороне. ССС — три стороны. ССУ не ключ. Общая сторона считается. Сумма 180° помогает набрать углы.',
      'Проверка: две стороны и угол между ними — какой признак? Первый, СУС. Не второй: там сторона и два угла. Не третий: там три стороны.'
    ],
    check: { q: 'Равенство по двум сторонам и углу между ними — какой признак?', choices: ['первый', 'второй', 'третий', 'такого нет'], ans: 0,
      exp: 'Первый признак, СУС: две стороны и угол между ними.' },
    tasks: [
      { q: 'Сколько признаков равенства треугольников изучают?', kind: 'unit', ans: 3, tol: 0,
        hints: ['СУС, УСУ, ССС.', 'Три коротких ключа.'], sol: '3' },
      { q: 'По каким элементам проверяют третий признак?', kind: 'choice',
        choices: ['по трём сторонам', 'по двум сторонам и углу', 'по стороне и двум углам', 'по двум углам'], ans: 0, tol: 0,
        hints: ['Третий — ССС.', 'Только стороны.'], sol: 'по трём сторонам' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', PINK='#ff8ac0', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l404ink{to{stroke-dashoffset:0}}
    @keyframes l404pop{0%{transform:scale(.18);opacity:0}70%{transform:scale(1.14)}100%{transform:scale(1);opacity:1}}
    @keyframes l404pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l404glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l404-ink{animation:l404ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l404-dot{transform-box:fill-box;transform-origin:center;animation:l404pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l404-pulse{animation:l404pulse 1.6s ease-in-out infinite}
    .l404-glow{animation:l404glow 1.8s ease-in-out infinite}
    .l404-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l404-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l404-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-l404', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function hyp(ax,ay,bx,by){ return Math.hypot(bx-ax, by-ay); }
  function poly(A,B,C, col, w, anim){
    const L=hyp(A[0],A[1],B[0],B[1])+hyp(B[0],B[1],C[0],C[1])+hyp(C[0],C[1],A[0],A[1]);
    return `<polygon points="${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}" fill="${col}14" stroke="${col}" stroke-width="${w||2.4}" ${anim?ink(L,1.3,0):''}/>`;
  }
  function seg(A,B,col,w,anim){
    const L=hyp(A[0],A[1],B[0],B[1]);
    return `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${col}" stroke-width="${w||3}" ${anim?ink(L,1.15,0):''}/>`;
  }
  function arc(P, Q, R, col){
    const vx=Q[0]-P[0], vy=Q[1]-P[1], wx=R[0]-P[0], wy=R[1]-P[1];
    const nl=Math.hypot(vx,vy)||1, ml=Math.hypot(wx,wy)||1;
    const r=18;
    const x1=P[0]+vx/nl*r, y1=P[1]+vy/nl*r, x2=P[0]+wx/ml*r, y2=P[1]+wy/ml*r;
    const a1=Math.atan2(y1-P[1], x1-P[0]), a2=Math.atan2(y2-P[1], x2-P[0]);
    let d=a2-a1; while(d<=-Math.PI) d+=2*Math.PI; while(d>Math.PI) d-=2*Math.PI;
    const sweep=d>0?1:0;
    return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.6"/>`;
  }
  const Lft=[[70,36],[24,178],[118,178]];
  const Rgt=[[168,42],[128,170],[214,178]];

  function visC404(el){
    try{ window._waveCss && _waveCss('css-l404', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'404';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const t=Math.max(0, Math.min(1, +(st.t==null?0:st.t)));
    const key=st.key||'sus';
    const A=Lft[0], B=Lft[1], C=Lft[2];
    let h='';

    if(step===0){
      const mix=Rgt.map((p,i)=>[p[0]+t*(Lft[i][0]-p[0]), p[1]+t*(Lft[i][1]-p[1])]);
      h=`<div class="wv-col">
        ${frame(poly(Lft[0],Lft[1],Lft[2], BLUE, 2.4, doDraw)+poly(mix[0],mix[1],mix[2], GOLD, 2.4)+lab(120, 18, t>0.9?'совпали':'наложи два треугольника', GOLD, 'middle', 13))}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">наложить
          <input type="range" min="0" max="100" value="${Math.round(t*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;chRender(0);}catch(e){}">
        </label>
        ${note('Равны = совместить','Если контуры слились, треугольники равны. Проверять все шесть кусков долго. Дальше — три коротких ключа.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,BLUE,2.4,doDraw)+
          lab(A[0], A[1]-12, 'A', GOLD)+lab(B[0]-8, B[1]+16, 'B', GOLD)+lab(C[0]+8, C[1]+16, 'C', GOLD)+
          lab(120, 90, '3 стороны + 3 угла', MUTED)+
          lab(120, 18, 'шесть кусков — долго', GOLD)
        )}
        ${note('Зачем признаки','Равенство по определению — наложение. На бумаге наложение не сделать. Признак даёт короткое доказательство без кальки.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,BLUE,1.6)+
          seg(A,B,GOLD,3.4,doDraw)+seg(A,C,GREEN,3.4)+
          arc(A,B,C,PINK)+
          lab(120, 18, 'СУС: две стороны и угол между', GOLD, 'middle', 12)
        )}
        ${note('Первый ключ','Угол зажат данными сторонами. Не сбоку и не напротив. Палочки + угол между ними — жёсткая петля.')}
      </div>`;
    } else if(step===3){
      const rods=!!st.rods;
      h=`<div class="wv-col">
        ${frame(
          (rods?poly(A,B,C,BLUE,2):'')+
          seg(A,B,GOLD,4,doDraw)+seg(A,C,GREEN,4)+
          arc(A,B,C,PINK)+
          lab(120, 18, rods?'третья сторона сама':'две палочки из вершины', GOLD, 'middle', 13)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].rods=1;chRender(0);}catch(e){}">${rods?'Жёстко':'Дорисовать основание'}</button>
        ${note('Жёсткость','Концы палочек уже на своих местах. Основание одно. Шевельнуть угол нельзя: его длина зафиксировала раствор.')}
      </div>`;
    } else if(step===4){
      const wrong=!!st.wrong;
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,BLUE,1.6)+
          seg(A,B,GOLD,3.2)+seg(B,C,GREEN,3.2)+
          (wrong?arc(B,A,C,RED):arc(A,B,C,PINK))+
          lab(120, 18, wrong?'ССУ — не признак':'угол между — да', wrong?RED:PINK, 'middle', 13)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].wrong=!CHS[k].wrong;chRender(0);}catch(e){}">${wrong?'Вернуть угол между':'Не тот угол'}</button>
        ${note('Ловушка','Две стороны и угол не между ними — это ССУ. В школе это не ключ: иногда собираются два разных треугольника.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,GREEN,1.6)+
          seg(B,C,GOLD,3.6,doDraw)+
          arc(B,A,C,PINK)+arc(C,B,A,BLUE)+
          lab(120, 18, 'УСУ: полка и два угла по краям', GOLD, 'middle', 12)
        )}
        ${note('Второй ключ','Сторона — полка. Углы прилежат к ней, сидят на концах. Не «два любых угла», а именно соседние с этой стороной.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, '∠A + ∠B + ∠C = 180°', GOLD, 'middle', 16)+
          lab(120, 108, '60° + 70° → третий 50°', GREEN)+
          lab(120, 152, 'второй угол часто даром', MUTED)
        )}
        ${note('Сумма помогает','Зная два угла, третий вычитается. Потом смотри, прилежат ли они к данной стороне — и УСУ собирается без нового замера.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,GOLD,1.6)+
          seg(A,B,RED,3.2,doDraw)+seg(B,C,BLUE,3.2)+seg(C,A,GREEN,3.2)+
          lab(120, 18, 'ССС: три стороны', GOLD)
        )}
        ${note('Третий ключ','Углы не нужны. Три длины собирают форму одним способом (можно перевернуть, но это тот же треугольник).')}
      </div>`;
    } else if(step===8){
      const vis=key==='sus'?poly(A,B,C,BLUE,1.4)+seg(A,B,GOLD,3.4)+seg(A,C,GREEN,3.4)+arc(A,B,C,PINK)+lab(120,18,'СУС — первый',GOLD)
        :key==='usu'?poly(A,B,C,GREEN,1.4)+seg(B,C,GOLD,3.4)+arc(B,A,C,PINK)+arc(C,B,A,BLUE)+lab(120,18,'УСУ — второй',GREEN)
        :poly(A,B,C,GOLD,1.4)+seg(A,B,RED,3)+seg(B,C,BLUE,3)+seg(C,A,GREEN,3)+lab(120,18,'ССС — третий',GOLD);
      h=`<div class="wv-col">
        ${frame(vis)}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['sus','СУС',GOLD],['usu','УСУ',GREEN],['sss','ССС',BLUE]].map(x=>`<button type="button" class="btn" style="border-color:${key===x[0]?x[2]:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].key='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Три кнопки','Загорается только то, что входит в ключ. Серое доказывать не надо. Сначала назови ключ, потом ищи эти куски на чертеже.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,RED,1.6)+
          seg(A,B,GOLD,3)+seg(A,C,GREEN,3)+
          arc(B,A,C,RED)+
          lab(120, 18, 'ССУ — не ключ', RED)
        )}
        ${note('Почему нет четвёртого','Две стороны и угол напротив одной из них могут собрать два разных треугольника. Поэтому в этом курсе ССУ не пишут как признак.')}
      </div>`;
    } else if(step===10){
      const D=[118,70];
      const on=!!st.share;
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,BLUE,1.8)+poly(D,B,C,GOLD,1.8)+
          (on?seg(B,C,PINK,4):seg(B,C,MUTED,2))+
          lab(B[0]-8, B[1]+16, 'B', GOLD)+lab(C[0]+8, C[1]+16, 'C', GOLD)+
          lab(120, 18, on?'BC общая, уже равна себе':'два треугольника, одна сторона', GOLD, 'middle', 12)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].share=1;chRender(0);}catch(e){}">${on?'Общая вспыхнула':'Показать общую'}</button>
        ${note('Подарок чертежа','Общую сторону не надо измерять. Она равна себе. Ищи ещё два куска — и ключ часто собирается.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','равные стороны: данные или общая',GOLD],
            ['2','равные углы: данные, вертикальные, накрест',PINK],
            ['3','имя ключа: СУС / УСУ / ССС',GREEN],
            ['4','вывод: треугольники равны',BLUE]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Как пишут','Не начинай с вывода. Сначала куски, потом имя признака. Порядок букв в ABC = A₁B₁C₁ — это соответствие вершин.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'ABC = A₁B₁C₁', GOLD, 'middle', 20)+
          lab(120, 118, 'A↔A₁  B↔B₁  C↔C₁', GREEN)+
          lab(120, 160, 'AB ↔ A₁B₁', MUTED)
        )}
        ${note('Порядок букв','Не «просто равны», а с картой вершин. Иначе соответствующая сторона может оказаться не той.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['найди общую или равные по условию',GOLD],
            ['собери СУС, УСУ или ССС',GREEN],
            ['не выдумывай ССУ',RED],
            ['проверь порядок вершин',BLUE]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;border:1px solid #3d5c49;border-left:4px solid ${x[1]};border-radius:10px;padding:8px 12px;color:#e8dcc8;font-size:14px;text-align:left">${x[0]}</div>`).join('')}
        </div>
        ${note('Рецепт','Ключ короткий: три куска в правильном порядке. Четвёртый кусок не спасает, если набор не из списка.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          poly(A,B,C,BLUE,2)+
          lab(120, 18, 'СУС · УСУ · ССС', GOLD)+
          lab(120, 100, 'ССУ — нет', RED)
        )}
        ${note('В карман','Первый — угол между двумя сторонами. Второй — полка и два края. Третий — три стороны. Общая считается.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(poly(A,B,C,GOLD,2)+lab(120, 18, 'две стороны и угол между', GOLD, 'middle', 13))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">какой признак?</div>
        ${note('Проверка','Первый, СУС. Не второй и не «такого нет».')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[404]=visC404;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===404){ arr[i]=L404; f=true; break; } }
    if(!f) arr.push(L404);
  })();
})();
/* ================= УРОК 405 · Медианы, биссектрисы, высоты ================= */
(function(){
  const L405 = {
    id: 405, title: 'Медианы, биссектрисы, высоты', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7', subj: 'math',
    explain: [
      'Загадка: из вершины треугольника можно провести три разных отрезка к противоположной стороне. Один ищет середину, второй режет угол, третий падает отвесом. Как их не перепутать и зачем они все?',
      'Медиана — отрезок из вершины в середину противоположной стороны. Если M — середина BC, то AM — медиана и BM = MC. Слово от «средний»: цель — середина стороны, не середина угла.',
      'Биссектриса — луч из вершины, делящий угол пополам. Отрезок биссектрисы — кусок этого луча до стороны. «Бис» — дважды, «сец» — резать. Угол 80° даёт два по 40°. Теорема: биссектриса делит противоположную сторону пропорционально боковым: BD/DC = AB/AC.',
      'Высота — перпендикуляр из вершины на прямую, содержащую противоположную сторону. На чертеже — квадратик 90°. В остроугольном треугольнике основание высоты внутри стороны. В тупоугольном — на продолжении. Это не «самая длинная», это «самая отвесная».',
      'Три разных основания на одной стороне. Нажми переключатель: медиана, биссектриса и высота из одной вершины почти никогда не совпадают. Совпадение — событие, не норма.',
      'Равнобедренный треугольник — то самое событие. Медиана к основанию, высота к основанию и биссектриса угла при вершине — один отрезок. Три работы, одна линия. Нажми «Сделать равнобедренным».',
      'Три медианы пересекаются в одной точке G, центроиде. Центроид делит каждую медиану в отношении 2 : 1, считая от вершины. Две трети пути от A к середине — и ты в центре масс. Треугольник на острие в G балансирует.',
      'Нажми «Шаг к центру»: точка бежит по медиане и замирает на двух третях. Это не «примерно в середине медианы» — ровно 2 : 1. Запомни отношение, его спрашивают.',
      'Три биссектрисы тоже в одной точке — инцентре I. Это центр вписанной окружности, она касается всех трёх сторон. Из I на стороны падают равные перпендикуляры — радиусы.',
      'Три высоты встречаются в ортоцентре H. В остроугольном H внутри, в прямоугольном — в вершине прямого угла, в тупоугольном — снаружи. Не путай H с основанием высоты: основание — нога перпендикуляра, ортоцентр — встреча всех трёх.',
      'Четвёртая замечательная точка — центр описанной окружности O, пересечение серединных перпендикуляров. Через O проходит окружность всех трёх вершин. Медиана, биссектриса и высота — про чевианы из вершины; O строится иначе.',
      'Как не перепутать на чертеже. Равные чёрточки на стороне — медиана. Две дуги у угла — биссектриса. Квадратик — высота. Если значков нет, измеряй: середина, половина угла или 90°.',
      'Площадь через высоту: S = (1/2) · a · h. Высота нужна не для красоты — через неё считают площадь. Медиана делит площадь пополам: две части с равными основаниями и общей высотой.',
      'Рецепт. 1) Прочитай, что дано: середина, угол или прямой. 2) Поставь значок. 3) В равнобедренном к основанию — три в одном. 4) Медианы — центроид 2:1, биссектрисы — инцентр, высоты — ортоцентр.',
      'В карман: медиана — середина стороны. Биссектриса — половина угла и пропорция сторон. Высота — 90°. Равнобедренный — совпадают. Центроид делит медиану 2:1.',
      'Проверка: кто делит угол пополам? Биссектриса. Не медиана: та делит сторону. Не высота: та ставит прямой угол.'
    ],
    check: { q: 'Какой отрезок делит угол пополам?', choices: ['биссектриса', 'медиана', 'высота', 'хорда'], ans: 0,
      exp: 'Биссектриса режет угол на два равных. Медиана режет сторону, высота ставит 90°.' },
    tasks: [
      { q: 'Сколько медиан у треугольника?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Из каждой вершины по одной.', 'Вершин три.'], sol: '3' },
      { q: 'Медиана из вершины равнобедренного треугольника также является…', kind: 'choice',
        choices: ['высотой и биссектрисой', 'только высотой', 'только биссектрисой', 'ничем'], ans: 0, tol: 0,
        hints: ['К основанию все три совпадают.', 'Один отрезок — три имени.'], sol: 'высотой и биссектрисой' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', PINK='#ff8ac0', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l405ink{to{stroke-dashoffset:0}}
    @keyframes l405pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}}
    @keyframes l405pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l405walk{from{offset-distance:0%}to{offset-distance:67%}}
    @keyframes l405glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l405-ink{animation:l405ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l405-dot{transform-box:fill-box;transform-origin:center;animation:l405pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l405-pulse{animation:l405pulse 1.6s ease-in-out infinite}
    .l405-glow{animation:l405glow 1.8s ease-in-out infinite}
    .l405-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l405-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l405-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-l405', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function hyp(x,y){ return Math.hypot(x,y); }
  function tri(iso){
    const A=iso?[120,34]:[70,34], B=[24,186], C=iso?[216,186]:[220,186];
    const M=[(B[0]+C[0])/2, (B[1]+C[1])/2];
    const H=[A[0], B[1]];
    const c=hyp(A[0]-B[0], A[1]-B[1]), b=hyp(A[0]-C[0], A[1]-C[1]), a=hyp(C[0]-B[0], C[1]-B[1]);
    const D=[B[0]+a*c/(b+c), B[1]];
    const G=[(A[0]+B[0]+C[0])/3, (A[1]+B[1]+C[1])/3];
    const per=a+b+c;
    const I=[(a*A[0]+b*B[0]+c*C[0])/per, (a*A[1]+b*B[1]+c*C[1])/per];
    const Mb=[(A[0]+C[0])/2,(A[1]+C[1])/2], Mc=[(A[0]+B[0])/2,(A[1]+B[1])/2];
    const plen=a+b+c;
    return {A:A,B:B,C:C,M:M,H:H,D:D,G:G,I:I,Mb:Mb,Mc:Mc,plen:plen, poly:A[0]+','+A[1]+' '+B[0]+','+B[1]+' '+C[0]+','+C[1]};
  }
  function drawT(T, doDraw){
    return `<polygon points="${T.poly}" fill="${BLUE}12" stroke="${BLUE}" stroke-width="2.4" ${doDraw?ink(T.plen,1.3,0):''}/>`+
      lab(T.A[0], T.A[1]-10, 'A', GOLD)+lab(T.B[0]-10, T.B[1]+14, 'B', GOLD)+lab(T.C[0]+10, T.C[1]+14, 'C', GOLD);
  }
  function line(P,Q,col,w,anim){
    const L=hyp(P[0]-Q[0], P[1]-Q[1]);
    return `<line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="${col}" stroke-width="${w||2.6}" ${anim?ink(L,1.2, anim===true?0:anim):''}/>`;
  }
  function dot(P,col){ return `<circle class="l405-dot" cx="${P[0]}" cy="${P[1]}" r="5" fill="${col}"/>`; }

  function visC405(el){
    try{ window._waveCss && _waveCss('css-l405', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'405';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const iso=!!st.iso;
    const T=tri(iso);
    const mode=st.m||'med';
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(drawT(T, doDraw)+(open?line(T.A,T.M,GOLD,3,true)+line(T.A,T.D,PINK,3,.2)+line(T.A,T.H,GREEN,3,.35)+dot(T.M,GOLD)+dot(T.D,PINK)+dot(T.H,GREEN):'')+lab(120, 18, open?'три разных следа':'кто куда идёт?', GOLD))}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Показать три'}</button>
        ${note('Не один отрезок','Из вершины к стороне можно пойти тремя законами. Сейчас у каждого будет свой след и своя точка на BC.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.M,GOLD,3, doDraw)+dot(T.M,RED)+lab(T.M[0], T.M[1]+16, 'M середина', RED)+lab(120, 18, 'медиана AM', GOLD))}
        ${note('К середине стороны','BM = MC. Медиана не обещает равные углы и не обещает 90°. Только равные куски стороны.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.D,PINK,3, doDraw)+dot(T.D,PINK)+lab(T.D[0]+8, T.D[1]+16, 'D', PINK, 'start')+lab(120, 18, 'биссектриса, BD/DC = AB/AC', PINK, 'middle', 12))}
        ${note('Режет угол, не сторону','Дуги у угла равны. Основание D почти никогда не в середине: оно ближе к меньшей боковой. Это теорема о биссектрисе.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.H,GREEN,3, doDraw)+`<rect x="${T.H[0]}" y="${T.H[1]-12}" width="12" height="12" fill="none" stroke="${GREEN}" stroke-width="1.8"/>`+dot(T.H,GREEN)+lab(T.H[0]-8, T.H[1]+16, 'H', GREEN, 'end')+lab(120, 18, 'высота, 90°', GREEN))}
        ${note('Отвес','Квадратик — прямой угол. Высота может упасть внутрь стороны или на продолжение, если угол при основании тупой. Здесь треугольник острый — нога внутри.')}
      </div>`;
    } else if(step===4){
      const foot=mode==='med'?T.M:mode==='bis'?T.D:T.H;
      const col=mode==='med'?GOLD:mode==='bis'?PINK:GREEN;
      const name=mode==='med'?'медиана':'биссектриса';
      const nm=mode==='hgt'?'высота':name;
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,foot,col,3)+dot(foot,col)+lab(120, 18, nm+' из A', col))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['med','медиана',GOLD],['bis','биссектриса',PINK],['hgt','высота',GREEN]].map(x=>`<button type="button" class="btn" style="border-color:${st.m===x[0]||(!st.m&&x[0]==='med')?x[2]:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].m='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Три следа','Переключай. В этом треугольнике три основания разные. Совпадут только в особом случае — следующем шаге.')}
      </div>`;
    } else if(step===5){
      const TT=tri(iso);
      h=`<div class="wv-col">
        ${frame(drawT(TT,false)+line(TT.A,TT.M,GOLD,3)+ (iso?'':line(TT.A,TT.D,PINK,2)+line(TT.A,TT.H,GREEN,2))+dot(TT.M,GOLD)+lab(120, 18, iso?'три в одном':'сдвинь к равнобедренному', GOLD, 'middle', 13))}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].iso=!CHS[k].iso;chRender(0);}catch(e){}">${iso?'Вернуть разносторонний':'Сделать равнобедренным'}</button>
        ${note('Особый треугольник','Когда AB = AC, середина, нога высоты и основание биссектрисы — одна точка. Один отрезок, три имени. Не обобщай на любой треугольник.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.M,GOLD,2.4, doDraw)+line(T.B,T.Mb,GOLD,2.4,.15)+line(T.C,T.Mc,GOLD,2.4,.3)+dot(T.G,RED)+lab(T.G[0]+10, T.G[1]-6, 'G', RED, 'start')+lab(120, 18, 'три медианы → центроид', GOLD, 'middle', 13))}
        ${note('Одна точка','Не три случайных пересечения. Все медианы обязаны встретиться. G — центр масс: треугольник на иголке в G стоит.')}
      </div>`;
    } else if(step===7){
      const walk=!!st.walk;
      const gx=T.A[0]+2/3*(T.M[0]-T.A[0]), gy=T.A[1]+2/3*(T.M[1]-T.A[1]);
      const px=walk?gx:T.A[0], py=walk?gy:T.A[1];
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.M,GOLD,3)+dot(T.M,MUTED)+`<circle class="l405-glow" cx="${px}" cy="${py}" r="7" fill="${GREEN}"/>`+lab(gx+12, gy, '2 : 1', GREEN, 'start')+lab(120, 18, 'от вершины две трети', GOLD))}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].walk=1;chRender(0);}catch(e){}">${walk?'На двух третях':'Шаг к центру'}</button>
        ${note('Отношение 2 : 1','AG : GM = 2 : 1. Не середина медианы. Две части к вершине, одна к стороне. Это спрашивают отдельно от «пересекаются».')}
      </div>`;
    } else if(step===8){
      const r=Math.max(8, T.B[1]-T.I[1]);
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.D,PINK,2.6, doDraw)+`<circle cx="${T.I[0]}" cy="${T.I[1]}" r="${r}" fill="none" stroke="${PINK}" stroke-width="2" ${doDraw?ink(2*Math.PI*r,1.4,.2):''}/>`+dot(T.I,PINK)+lab(T.I[0]+12, T.I[1]-8, 'I', PINK, 'start')+lab(120, 18, 'инцентр — вписанная', PINK))}
        ${note('Биссектрисы → окружность внутри','I равноудалён от сторон. Вписанная касается BC, CA, AB. Не путай с описанной: та проходит через вершины.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.H,GREEN,2.6)+`<rect x="${T.H[0]}" y="${T.H[1]-12}" width="12" height="12" fill="none" stroke="${GREEN}"/>`+dot(T.H,GREEN)+lab(120, 18, 'ортоцентр: встреча высот', GREEN, 'middle', 13)+lab(T.H[0], 70, 'в остром — внутри', MUTED))}
        ${note('Три случая','Острый — H внутри. Прямой — H в вершине прямого угла. Тупой — H снаружи. Основание высоты и ортоцентр — разные вещи, кроме прямого угла.')}
      </div>`;
    } else if(step===10){
      const midBC=T.M, midAB=T.Mc, midAC=T.Mb;
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+
          `<line x1="${midBC[0]}" y1="60" x2="${midBC[0]}" y2="200" stroke="${BLUE}" stroke-width="1.8" stroke-dasharray="5 4"/>`+
          dot(midBC,BLUE)+dot(midAB,BLUE)+dot(midAC,BLUE)+
          lab(120, 18, 'O — серединные перпендикуляры', BLUE, 'middle', 12))}
        ${note('Четвёртая точка','Центр описанной окружности строится не из вершины, а из середин сторон. Через O проходят все три вершины. Это другой инструмент.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['чёрточки на стороне','медиана',GOLD],
            ['две дуги у угла','биссектриса',PINK],
            ['квадратик 90°','высота',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Значки на чертеже','Если значков нет — не угадывай. Измерь или построй. Совпадение трёх — только в равнобедренном к основанию.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.H,GREEN,2.4)+line(T.A,T.M,GOLD,2)+lab(120, 18, 'S = ½ · a · h', GREEN)+lab(T.M[0], 70, 'медиана делит S пополам', GOLD, 'middle', 11))}
        ${note('Зачем высота и медиана','Площадь через высоту. Медиана режет площадь на два равных куска: основания равны, высота общая. Биссектриса площадь пополам не делит, если боковые разные.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Что дано: середина, угол или 90°',GOLD],
            ['2','Поставь значок, не путай следы',BLUE],
            ['3','Равнобедренный к основанию — три в одном',PINK],
            ['4','G 2:1, I вписанная, H высоты',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала имя отрезка, потом свойство, потом точка пересечения. Не называй всё «высотой».')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+line(T.A,T.M,GOLD,2.4)+dot(T.G,RED)+lab(120, 18, 'медиана · 2:1 · три в одном', GOLD, 'middle', 12))}
        ${note('В карман','Медиана — середина. Биссектриса — угол и пропорция. Высота — 90°. Центроид 2:1. В равнобедренном к основанию совпадают.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(drawT(T,false)+lab(120, 18, 'кто делит угол?', GOLD))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">медиана? биссектриса? высота?</div>
        ${note('Проверка','Биссектриса. Медиана делит сторону, высота ставит прямой угол.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[405]=visC405;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===405){ arr[i]=L405; f=true; break; } }
    if(!f) arr.push(L405);
  })();
})();
/* ================= УРОК 406 · Параллельные прямые и углы ================= */
(function(){
  const L406 = {
    id: 406, title: 'Параллельные прямые и углы', ico: '📐',
    src: 'Математика · 7 класс · Геометрия 7: параллельные', subj: 'math',
    explain: [
      'Загадка: две прямые как рельсы — не встречаются. Третья режет обе, как шпала наискосок. Появляется восемь углов. Сколько среди них разных величин? Не восемь. Сейчас увидим, почему два.',
      'Параллельные прямые не пересекаются и лежат в одной плоскости. На чертеже отмечают стрелками «в одну сторону». Секущая — любая прямая, которая пересекает обе. Без секущей углов между рельсами не сравнить.',
      'Восемь углов: по четыре у каждого пересечения. У одной точки крест: два острых и два тупых, если секущая не перпендикуляр. Вертикальные (через крест) равны. Смежные (соседи на прямой) в сумме 180°.',
      'Накрест лежащие внутренние: оба внутри полосы, по разные стороны секущей. Рисунок как буква Z. При параллельных они равны. Это главное свойство, из него выводятся остальные.',
      'Соответственные: в одинаковых «углах дома» у двух пересечений — оба справа-сверху или оба слева-снизу. Рисунок как F. При параллельных равны. Сдвинь нижний крест вверх — углы лягут друг на друга.',
      'Односторонние внутренние: оба внутри полосы, по одну сторону секущей. Рисунок как C или U. При параллельных сумма 180°. Это развёрнутый угол, разрезанный рельсом.',
      'Подвинь данный угол. Все восемь пересчитываются сами: острые равны ему, тупые — дополнение до 180°. Восемь углов, две величины. Не больше.',
      'Пример: дали 70°. Накрест и соответственные — 70°. Смежный и односторонний — 110°. Вертикальный к 70° снова 70°. Один замер — вся схема.',
      'Признаки — свойства наоборот. Если накрест лежащие равны, прямые параллельны. Если соответственные равны — тоже. Если односторонние в сумме 180° — тоже. Так доказывают «эти двое не встретятся».',
      'Перпендикуляр к одной из параллельных перпендикулярен и другой. Угол 90° на верхнем рельсе даёт 90° на нижнем: соответственный прямой. Это частный случай, не новый закон.',
      'Нажми пару: Z — накрест, F — соответственные, C — односторонние. Три буквы — три правила. Их хватает, чтобы закрыть любой номер с рельсами.',
      'Ловушка: «накрест» без слова «внутренние» иногда путают с вертикальными. Вертикальные равны всегда, даже если прямые не параллельны. Накрест лежащие равны именно из-за параллельности.',
      'Ещё ловушка: односторонние не равны, они в сумме 180°. Написать «равны» — типичная ошибка. Равны накрест и соответственные. Односторонние — соседи по полосе.',
      'Рецепт. 1) Найди две параллельные и секущую. 2) Определи пару: Z, F или C. 3) Равны или 180°. 4) Добери остальные через вертикальные и смежные. 5) Для доказательства параллельности включи признак.',
      'В карман: параллельные + секущая = 8 углов = 2 величины. Z равны, F равны, C сумма 180°. Обратные — признаки. 70° тянет за собой 110°.',
      'Проверка: накрест лежащие при параллельных… равны. Не 180°: это односторонние.'
    ],
    check: { q: 'Накрест лежащие углы при параллельных прямых…', choices: ['равны', 'в сумме дают 180°', 'всегда разные', 'прямые'], ans: 0,
      exp: 'Накрест лежащие (буква Z) равны. Сумма 180° — у односторонних.' },
    tasks: [
      { q: 'Чему равна сумма односторонних углов при параллельных прямых?', kind: 'unit', ans: 180, tol: 0,
        hints: ['Буква C: внутри по одну сторону.', 'Дополняют до развёрнутого.'], sol: '180°' },
      { q: 'Если соответственные углы равны, то прямые…', kind: 'choice',
        choices: ['параллельны', 'перпендикулярны', 'обязательно пересекаются', 'неизвестно'], ans: 0, tol: 0,
        hints: ['Это признак, свойство наоборот.', 'Равные соответственные ⇒ параллельны.'], sol: 'параллельны' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', PINK='#ff8ac0', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l406ink{to{stroke-dashoffset:0}}
    @keyframes l406pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.14)}100%{transform:scale(1);opacity:1}}
    @keyframes l406pulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes l406glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l406-ink{animation:l406ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l406-dot{transform-box:fill-box;transform-origin:center;animation:l406pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l406-pulse{animation:l406pulse 1.5s ease-in-out infinite}
    .l406-glow{animation:l406glow 1.8s ease-in-out infinite}
    .l406-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l406-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l406-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-l406', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  const Y1=56, Y2=150, X0=70, Y0=18, DX=0.52;
  function Xat(y){ return X0 + (y-Y0)*DX; }
  function rails(doDraw, sleepers){
    let d=`<line x1="18" y1="${Y1}" x2="222" y2="${Y1}" stroke="${GREEN}" stroke-width="3.2" ${doDraw?ink(204,1.1,0):''}/>`+
      `<line x1="18" y1="${Y2}" x2="222" y2="${Y2}" stroke="${GREEN}" stroke-width="3.2" ${doDraw?ink(204,1.1,.12):''}/>`;
    if(sleepers){
      for(let i=0;i<6;i++){
        const x=36+i*32;
        d+=`<line x1="${x}" y1="${Y1}" x2="${x+8}" y2="${Y2}" stroke="#2a4a3a" stroke-width="3"/>`;
      }
    }
    d+=`<line x1="${Xat(12)}" y1="12" x2="${Xat(196)}" y2="196" stroke="${GOLD}" stroke-width="2.6" ${doDraw?ink(220,1.2,.2):''}/>`;
    return d;
  }
  function wedge(cx, cy, a0, a1, col){
    const r=22, to=Math.PI/180;
    const x1=cx+r*Math.cos(a0*to), y1=cy+r*Math.sin(a0*to);
    const x2=cx+r*Math.cos(a1*to), y2=cy+r*Math.sin(a1*to);
    const large=Math.abs(a1-a0)>180?1:0;
    return `<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${col}" opacity=".55"/>`;
  }

  function visC406(el){
    try{ window._waveCss && _waveCss('css-l406', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'406';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const ang=Math.max(40, Math.min(80, +(st.ang==null?70:st.ang)));
    const obt=180-ang;
    const pair=st.pair||'z';
    const T=[Xat(Y1), Y1], B=[Xat(Y2), Y2];
    const secAng=Math.atan(1/DX)*180/Math.PI;
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(rails(doDraw, !open)+lab(120, 36, open?'8 углов, 2 величины':'рельсы и косая', GOLD)+lab(40, Y1-8, '∥', GREEN, 'middle', 14)+lab(40, Y2-8, '∥', GREEN, 'middle', 14))}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Пустить секущую'}</button>
        ${note('Не встречаются','Параллельные — рельсы. Секущая режет оба. Появляются восемь углов. Разных чисел среди них всего два.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(rails(doDraw,true)+lab(36, Y1-10, 'стрелки ∥', GREEN, 'start', 11)+lab(36, Y2-10, 'стрелки ∥', GREEN, 'start', 11)+lab(120, 36, 'секущая', GOLD))}
        ${note('Три прямые','Две с меткой параллельности, третья — секущая. Без секущей сравнивать нечего: углов «между рельсами» нет, пока их не разрезали.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          wedge(T[0], T[1], 20, 70, PINK)+
          wedge(T[0], T[1], 200, 250, BLUE)+
          lab(T[0]+28, T[1]-16, 'верт.', PINK, 'start', 11)+
          lab(120, 36, 'крест: вертикальные равны', GOLD, 'middle', 12)
        )}
        ${note('Всегда, не только при ∥','Вертикальные равны на любом кресте. Смежные на прямой дают 180°. Это свойства пересечения, параллельность ещё не нужна.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          wedge(T[0], T[1], 10, 70, PINK)+
          wedge(B[0], B[1], 190, 250, PINK)+
          lab(120, 36, 'Z — накрест, равны', PINK)+
          lab(T[0]-28, T[1]+22, ang+'°', PINK)+lab(B[0]+22, B[1]+18, ang+'°', PINK, 'start')
        )}
        ${note('Внутри и накрест','Оба угла в полосе между рельсами, по разные стороны секущей. Как перекладины буквы Z. При параллельных равны — главный закон урока.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          wedge(T[0], T[1], 10, 70, BLUE)+
          wedge(B[0], B[1], 10, 70, BLUE)+
          lab(120, 36, 'F — соответственные, равны', BLUE, 'middle', 13)+
          lab(T[0]+22, T[1]-14, ang+'°', BLUE, 'start')+lab(B[0]+22, B[1]-14, ang+'°', BLUE, 'start')
        )}
        ${note('Одинаковое место','Оба справа-сверху от креста. Сдвинь нижнее пересечение вверх по секущей — углы совпадут. Поэтому равны.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          wedge(T[0], T[1], 110, 170, GREEN)+
          wedge(B[0], B[1], 10, 70, GREEN)+
          lab(120, 36, 'C — односторонние, 180°', GREEN, 'middle', 13)+
          lab(T[0]-30, T[1]+8, obt+'°', GREEN)+lab(B[0]+22, B[1]-14, ang+'°', GREEN, 'start')
        )}
        ${note('По одну сторону полосы','Не равны. Складываются в развёрнутый. 70 + 110 = 180. Типичная ошибка — написать, что они равны.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          lab(T[0]+24, T[1]-12, ang+'°', GOLD, 'start')+
          lab(T[0]-28, T[1]+20, obt+'°', BLUE)+
          lab(B[0]+24, B[1]-12, ang+'°', GOLD, 'start')+
          lab(B[0]-28, B[1]+20, obt+'°', BLUE)+
          lab(120, 36, '8 углов = '+ang+'° и '+obt+'°', GOLD, 'middle', 13)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">угол
          <input type="range" min="40" max="80" value="${ang}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].ang=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:36px">${ang}°</b>
        </label>
        ${note('Две кучки','Крути. Острые все равны данному, тупые — добор до 180°. Восемь мест, два числа. Это вся арифметика схемы.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['дали 70°','старт',GOLD],
            ['накрест и F','тоже 70°',PINK],
            ['смежный и C','110°',GREEN],
            ['вертикальный','снова 70°',BLUE]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Один замер','Не считай восемь раз. Зацепи один угол и раскидай по Z, F, C, вертикали и смежным.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          rails(false,false)+
          lab(120, 36, 'признаки: наоборот', GOLD)+
          lab(120, 100, 'Z равны ⇒ ∥', PINK)+
          lab(120, 132, 'F равны ⇒ ∥', BLUE)+
          lab(120, 164, 'C сумма 180° ⇒ ∥', GREEN)
        )}
        ${note('Доказать, что не встретятся','Свойство: если уже параллельны, углы такие. Признак: если углы такие, значит параллельны. На олимпиаде чаще признак.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          `<line x1="18" y1="${Y1}" x2="222" y2="${Y1}" stroke="${GREEN}" stroke-width="3"/>`+
          `<line x1="18" y1="${Y2}" x2="222" y2="${Y2}" stroke="${GREEN}" stroke-width="3"/>`+
          `<line x1="120" y1="20" x2="120" y2="190" stroke="${GOLD}" stroke-width="2.6" ${doDraw?ink(170,1.2,0):''}/>`+
          `<rect x="120" y="${Y1}" width="12" height="12" fill="none" stroke="${GOLD}"/>`+
          `<rect x="120" y="${Y2-12}" width="12" height="12" fill="none" stroke="${GOLD}"/>`+
          lab(150, 40, '90° и 90°', GOLD)
        )}
        ${note('Перпендикуляр к параллельным','Если секущая перпендикулярна одному рельсу, она перпендикулярна и другому. Частный случай соответственных прямых углов.')}
      </div>`;
    } else if(step===10){
      const vis=pair==='z'?rails(false,false)+wedge(T[0],T[1],10,70,PINK)+wedge(B[0],B[1],190,250,PINK)+lab(120,36,'Z накрест',PINK)
        :pair==='f'?rails(false,false)+wedge(T[0],T[1],10,70,BLUE)+wedge(B[0],B[1],10,70,BLUE)+lab(120,36,'F соответственные',BLUE)
        :rails(false,false)+wedge(T[0],T[1],110,170,GREEN)+wedge(B[0],B[1],10,70,GREEN)+lab(120,36,'C односторонние',GREEN);
      h=`<div class="wv-col">
        ${frame(vis)}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['z','Z накрест',PINK],['f','F соответств.',BLUE],['c','C одностор.',GREEN]].map(x=>`<button type="button" class="btn" style="border-color:${pair===x[0]?x[2]:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].pair='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Три буквы','Z равны, F равны, C в сумме 180°. Жми и смотри, какие два сектора загораются. Этого хватает на любой чертёж с рельсами.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${frame(rails(false,false)+wedge(T[0],T[1],20,70,GOLD)+wedge(T[0],T[1],200,250,GOLD)+lab(120,36,'вертикальные — всегда', GOLD, 'middle', 13))}
        ${note('Не путай с Z','Вертикальные равны даже у случайных прямых. Накрест лежащие равны только если рельсы параллельны. Сначала спроси: это крест в одной точке или два угла в полосе?')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['накрест Z','равны',PINK],
            ['соответственные F','равны',BLUE],
            ['односторонние C','сумма 180°, не равны',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Главная ошибка','Написать, что односторонние равны. Нет: они дополнительные. Равны Z и F.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Найди ∥ и секущую',GOLD],
            ['2','Пара: Z, F или C',PINK],
            ['3','Равны или 180°',BLUE],
            ['4','Остальные через крест',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не нумеруй все восемь сразу. Зацепи пару, добери соседей. Для доказательства ∥ включи признак, не свойство.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(rails(false,false)+lab(120, 36, 'Z =  ·  F =  ·  C = 180°', GOLD, 'middle', 13)+lab(120, 100, ang+'° и '+obt+'°', GREEN))}
        ${note('В карман','Восемь углов, две величины. Z и F равны. C сумма 180°. Обратные утверждения — признаки параллельности.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(rails(false,false)+lab(120, 36, 'накрест лежащие…', GOLD))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">равны или 180°?</div>
        ${note('Проверка','Равны. Сумма 180° — у односторонних, буква C.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[406]=visC406;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===406){ arr[i]=L406; f=true; break; } }
    if(!f) arr.push(L406);
  })();
})();
/* ================= УРОК 407 · Модуль и уравнения с модулем ================= */
(function(){
  const L407 = {
    id: 407, title: 'Модуль и уравнения с модулем', ico: '🧮',
    src: 'Математика · 7 класс · Олимп-7: модуль', subj: 'math',
    explain: [
      'Загадка: два числа, 5 и −5. Они разные, но до нуля им одинаково далеко. Как назвать это «одинаково далеко» одним знаком? Модуль: |5| = |−5| = 5. Модуль — расстояние, а расстояние не бывает минусовым.',
      'Определение. |x| — расстояние от x до нуля на оси. Поэтому |x| ≥ 0 всегда. Геометрия здесь важнее формулы: точка не может быть «на минус три шага» от нуля.',
      'Кусочное правило, его и пишут в учебнике. Если x ≥ 0, то |x| = x. Если x < 0, то |x| = −x. Минус перед отрицательным даёт плюс: |−7| = −(−7) = 7. Модуль не «увеличивает», он снимает знак.',
      'Проверь на оси: |7| = 7, |−7| = 7, |0| = 0. Ноль — единственное число, чей модуль ноль. Это пригодится в уравнениях.',
      'Уравнение |x| = 4. Вопрос геометрический: какие точки лежат на расстоянии 4 от нуля? Две: 4 справа и −4 слева. Два корня — главная привычка модуля. Не пиши только плюс.',
      'Три калибра правой части. Если a > 0, у |x| = a два корня ±a. Если a = 0, один корень x = 0. Если a < 0, корней нет: расстояние не бывает отрицательным. |x| = −3 — пустое множество, не «ошибка в знаке».',
      'Сдвиг центра. |x − 3| = 2 читается: расстояние от x до тройки равно двум. Шагни от 3 влево на 2 — в 1, вправо на 2 — в 5. Корни x = 1 и x = 5.',
      'Общая формула. |x − a| = b при b > 0 даёт x = a + b или x = a − b. Здесь a — центр, b — радиус. Уравнение с модулем — окружность на прямой: две точки на заданном расстоянии.',
      'Раскрытие по определению. |A| = B при B ≥ 0 равносильно двум обычным: A = B или A = −B. Так решают |2x − 1| = 5: 2x − 1 = 5 или 2x − 1 = −5 → x = 3 или x = −2. Сначала проверь, что справа не минус.',
      'Неравенства коротко. |x| < 3 — все точки ближе трёх к нулю, интервал −3 < x < 3. |x| > 3 — две лучи: x < −3 или x > 3. |x| ≤ 3 — отрезок с концами. Равенство — точки, неравенство — куски оси.',
      'Свойства, которые стоит знать. |xy| = |x| · |y|. |x/y| = |x|/|y| при y ≠ 0. |x + y| ≤ |x| + |y| — неравенство треугольника: обход через ноль не короче прямой. |x| = |y| значит x = y или x = −y.',
      'Подвинь центр a и радиус b. Две точки едут симметрично. Поймай b = 0 — точки слиплись. Поймай b < 0 — ось пустая. Это вся теория уравнения в одной картинке.',
      'В жизни модуль — когда знак не важен: насколько ошиблись, на сколько градусов скакнула температура, расстояние между домами на прямой улице. |+5 − (−3)| = 8, не 2.',
      'Рецепт уравнения. 1) Смотри правую часть: минус — пусто, ноль — одна точка. 2) Переведи на язык расстояния. 3) Два направления от центра. 4) Или раскрой: внутри равно плюс или минус правой части. 5) Проверь подстановкой оба корня.',
      'В карман: модуль — расстояние, всегда ≥ 0. |x| = 4 → ±4. |x − 3| = 2 → 1 и 5. |x| = −3 пусто. |x| = 0 только ноль. Формула x = a ± b.',
      'Проверка: |x| = 4. Два направления от нуля. x = 4 или x = −4. Не один плюс.'
    ],
    check: { q: 'Реши: |x| = 4', choices: ['x = 4 или x = −4', 'x = 4', 'x = −4', 'решений нет'], ans: 0,
      exp: 'Расстояние до нуля равно 4: две точки, 4 и −4.' },
    tasks: [
      { q: 'Сколько решений у уравнения |x| = 0?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Расстояние 0 только у самого нуля.', 'Один корень: x = 0.'], sol: '1' },
      { q: 'Чему равно |−7|?', kind: 'choice',
        choices: ['7', '−7', '0', '14'], ans: 0, tol: 0,
        hints: ['Модуль снимает знак.', '|−7| = 7.'], sol: '7' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l407ink{to{stroke-dashoffset:0}}
    @keyframes l407pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l407pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l407glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l407-ink{animation:l407ink 1.3s cubic-bezier(.2,.75,.15,1) forwards}
    .l407-dot{transform-box:fill-box;transform-origin:center;animation:l407pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l407-pulse{animation:l407pulse 1.6s ease-in-out infinite}
    .l407-glow{animation:l407glow 1.8s ease-in-out infinite}
    .l407-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l407-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l407-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l407', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function AX(n){ return 120 + n*16; }
  function axis(opts){
    opts=opts||{};
    let t=`<line x1="18" y1="120" x2="222" y2="120" stroke="#3d5c49" stroke-width="2"/>`;
    const lo=opts.lo==null?-6:opts.lo, hi=opts.hi==null?6:opts.hi;
    for(let n=lo;n<=hi;n++){
      const x=AX(n);
      if(x<22||x>218) continue;
      t+=`<line x1="${x}" y1="114" x2="${x}" y2="126" stroke="#3d5c49"/>`+lab(x, 142, String(n), MUTED, 'middle', 10);
    }
    (opts.pts||[]).forEach(p=>{
      const x=Math.max(24, Math.min(216, AX(p.n)));
      t+=`<circle class="l407-dot" cx="${x}" cy="120" r="${p.r||7}" fill="${p.c}"/>`;
      if(p.lab) t+=lab(x, p.up?96:148, p.lab, p.c);
    });
    if(opts.seg){
      const x1=Math.max(24, Math.min(216, AX(opts.seg[0])));
      const x2=Math.max(24, Math.min(216, AX(opts.seg[1])));
      t+=`<line x1="${x1}" y1="120" x2="${x2}" y2="120" stroke="${GOLD}" stroke-width="6" opacity=".45"/>`;
    }
    return t;
  }

  function visC407(el){
    try{ window._waveCss && _waveCss('css-l407', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'407';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const a=+(st.a==null?3:st.a);
    const b=+(st.b==null?2:st.b);
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          axis({pts: open
            ? [{n:-5,c:BLUE,lab:'|−5|=5',up:1},{n:0,c:RED,lab:'0',up:0},{n:5,c:GREEN,lab:'|5|=5',up:1}]
            : [{n:0,c:RED,lab:'0',up:1}]})+
          lab(120, 40, open?'одинаково далеко':'5 и −5 — кто ближе к нулю?', GOLD, 'middle', 13)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Расстояние','Модуль — не «сделать плюс из минуса ради красоты». Это длина отрезка до нуля. Длина не бывает отрицательной.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, '|x| ≥ 0  всегда', GOLD, 'middle', 20)+
          lab(120, 100, 'геометрия, не фокус', MUTED)+
          axis({pts:[{n:0,c:RED,lab:'старт',up:1}]})
        )}
        ${note('Почему не минус','Точка на оси не может быть на «минус три шага». Шаги считают без направления. Знак живёт у самой точки, не у расстояния.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['если x ≥ 0','|x| = x',GREEN],
            ['если x < 0','|x| = −x',BLUE],
            ['пример','|−7| = −(−7) = 7',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]};font-family:Georgia,serif">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Кусочное определение','Минус перед отрицательным — это плюс. Модуль не прибавляет, он снимает знак. |0| = 0 по первой строке.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          axis({pts:[{n:-5,c:BLUE,lab:'|−5|=5',up:1},{n:0,c:RED},{n:5,c:GREEN,lab:'|5|=5',up:1}]})+
          lab(120, 40, 'минус отрезается', GOLD)
        )}
        ${note('Три пробы','Плюс остаётся плюсом, минус становится плюсом, ноль остаётся нулём. Это вся таблица для числа без буквы.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          axis({pts:[{n:-4,c:BLUE,lab:'−4',up:1},{n:0,c:RED,lab:'0'},{n:4,c:GREEN,lab:'4',up:1}]})+
          lab(120, 40, '|x| = 4  →  два корня', GOLD)
        )}
        ${note('Два направления','От нуля влево и вправо одинаково далеко. Поэтому у |x| = a при a > 0 всегда пара ±a. Писать один плюс — ошибка.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['a > 0','два корня  ±a',GREEN],
            ['a = 0','один корень  x = 0',GOLD],
            ['a < 0','пусто, расстояние не минус',RED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <b style="color:${x[2]}">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Сначала правая часть','|x| = −3 не решают «как будто плюс». Модуль ≥ 0, справа минус — сразу пусто. Это теория, не каприз.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          axis({pts:[{n:1,c:BLUE,lab:'1',up:1},{n:3,c:RED,lab:'центр 3'},{n:5,c:GREEN,lab:'5',up:1}]})+
          lab(120, 40, '|x − 3| = 2', GOLD)
        )}
        ${note('Новый центр','Модуль |x − a| — расстояние до точки a, не до нуля. От тройки на 2 шага: 1 и 5. Нуль здесь ни при чём.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, '|x − a| = b', GOLD, 'middle', 22)+
          lab(120, 100, 'x = a + b  или  a − b', GREEN, 'middle', 15)+
          lab(120, 144, 'центр a, радиус b', MUTED)
        )}
        ${note('Окружность на прямой','В плоскости окружность — бесконечно точек. На прямой — ровно две. Формула a ± b это и есть.')}
      </div>`;
    } else if(step===8){
      const show=!!st.unf;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 48, '|2x − 1| = 5', GOLD, 'middle', 18)+
          lab(120, 90, show?'2x − 1 = 5  или  2x − 1 = −5':'раскрой: внутри = ± справа', show?BLUE:MUTED, 'middle', 12)+
          lab(120, 140, show?'x = 3  или  x = −2':'', show?GREEN:'transparent', 'middle', 18)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].unf=1;chRender(0);}catch(e){}">${show?'Раскрыли':'Раскрыть'}</button>
        ${note('Два обычных уравнения','|A| = B при B ≥ 0 есть A = B или A = −B. Потом решай линейные, как без модуля. Подставь оба корня.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          axis({seg:[-3,3], pts:[{n:-3,c:GOLD,lab:'−3',up:1},{n:3,c:GOLD,lab:'3',up:1}]})+
          lab(120, 40, '|x| < 3  →  −3 < x < 3', GOLD, 'middle', 13)
        )}
        ${note('Равенство и неравенство','Равенство — точки. Строго меньше — дырка внутри, без концов. Нестрого ≤ — отрезок с концами. Больше — две лучи наружу.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['|xy| = |x|·|y|','произведение',GREEN],
            ['|x + y| ≤ |x| + |y|','треугольник',BLUE],
            ['|x| = |y|','x = y или x = −y',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <b style="color:${x[2]};font-family:Georgia,serif">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Свойства в карман','Треугольник: короткий путь не длиннее обхода. Равные модули — числа равны или противоположны. Произведение модулей — модуль произведения.')}
      </div>`;
    } else if(step===11){
      const bb=b;
      const kind=bb<0?'none':(bb===0?'one':'two');
      const pts=[{n:a,c:RED,lab:'a='+a, up:0}];
      if(kind==='two'){ pts.push({n:a-bb,c:BLUE,lab:String(a-bb),up:1},{n:a+bb,c:GREEN,lab:String(a+bb),up:1}); }
      if(kind==='one') pts[0].c=GOLD;
      h=`<div class="wv-col">
        ${frame(axis({pts:pts})+lab(120, 40, '|x − a| = b'+(kind==='none'?'  пусто':''), kind==='none'?RED:GOLD, 'middle', 14))}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">a
            <input type="range" min="-4" max="4" value="${a}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GOLD};min-width:20px">${a}</b></label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">b
            <input type="range" min="-2" max="5" value="${bb}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].b=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE};min-width:20px">${bb}</b></label>
        </div>
        ${note('Живой радиус','Крути a — центр едет. Крути b — точки разъезжаются. Ноль — слиплись. Минус — пусто. Вся теория уравнения в двух ручках.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, '|+5 − (−3)| = 8', GOLD, 'middle', 18)+
          lab(120, 120, 'не 2, а 8', GREEN)+
          lab(120, 164, 'величина без знака', MUTED)
        )}
        ${note('Зачем в жизни','Ошибка измерения, скачок температуры, расстояние по улице. Знак говорит «куда», модуль — «насколько».')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Правая часть: минус — пусто, ноль — одна точка',RED],
            ['2','Переведи: расстояние до центра',GOLD],
            ['3','Два направления или раскрой ±',BLUE],
            ['4','Подставь оба корня',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не начинай с «снимем модуль». Сначала калибр правой части, потом геометрия, потом алгебра.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          axis({pts:[{n:-4,c:BLUE,lab:'−4',up:1},{n:4,c:GREEN,lab:'4',up:1}]})+
          lab(120, 40, '|x| = 4  ·  |x−3|=2 → 1 и 5', GOLD, 'middle', 12)
        )}
        ${note('В карман','Модуль ≥ 0. Два корня, если справа плюс. Центр a, радиус b. Раскрытие: внутри = ± справа.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(axis({pts:[{n:0,c:RED,lab:'0',up:1}]})+lab(120, 40, '|x| = 4', GOLD))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">x = ? или x = ?</div>
        ${note('Проверка','4 и −4. Два направления. Не один плюс.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[407]=visC407;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===407){ arr[i]=L407; f=true; break; } }
    if(!f) arr.push(L407);
  })();
})();
/* ================= УРОК 408 · Сравнения по модулю ================= */
(function(){
  const L408 = {
    id: 408, title: 'Сравнения по модулю: введение', ico: '➗',
    src: 'Математика · 7 класс · Олимп-7: сравнения', subj: 'math',
    explain: [
      'Загадка: 17 и 2. Разные числа, но при делении на 5 у обоих остаток 2. Как записать «они одного остатка»? Сравнение: 17 ≡ 2 (mod 5). Читается: семнадцать сравнимо с двумя по модулю пять.',
      'Сначала деление с остатком. 17 = 3 · 5 + 2. Частное 3, остаток 2. Теорема: для любых целых a и m > 0 найдутся единственные q и r, что a = q·m + r и 0 ≤ r < m. Остаток всегда меньше модуля и не отрицательный.',
      'Определение. a ≡ b (mod m) значит: a и b дают один остаток при делении на m. Равносильная проверка, её любят на олимпиадах: a − b делится на m, пишут a − b ⋮ m. Для 17 и 2: 17 − 2 = 15, 15 ⋮ 5.',
      'Почему два определения одно? Если остатки равны, a = q₁m + r, b = q₂m + r, разность (q₁ − q₂)m — кратна m. Наоборот: если разность кратна m, остатки не могут разойтись. Запоминай оба: «одинаковый остаток» и «разность делится».',
      'Часы с m делениями. Числа бегут по кругу и возвращаются. 2, 7, 12, 17 — одна точка на циферблате mod 5. Класс остатка 2 — все числа вида 5k + 2. Их бесконечно много, точка одна.',
      'Как найти остаток. 23 (mod 4): самое большое кратное 4, не больше 23, это 20 = 5·4. Остаток 23 − 20 = 3. Значит 23 ≡ 3 (mod 4). Не путай остаток с неполным частным.',
      'Проверка разностью. 29 ≡ 5 (mod 6)? 29 − 5 = 24, 24 : 6 = 4, делится — да. Если разность не делится, сравнение ложно. Оба способа равносильны, бери удобный.',
      'Остаток 0 — особое имя: «делится». a ≡ 0 (mod m) значит a ⋮ m. Чётность — это mod 2: чётные ≡ 0, нечётные ≡ 1. Последняя цифра — это mod 10.',
      'Складывать остатки можно. Если a ≡ a₁ (mod m) и b ≡ b₁ (mod m), то a + b ≡ a₁ + b₁ (mod m). Пример: 17 ≡ 2, 23 ≡ 3 (mod 5) → 40 ≡ 5 ≡ 0 (mod 5). Сумма огромных чисел проверяется на пальцах.',
      'Умножать тоже. a · b ≡ a₁ · b₁ (mod m). 17 · 23 ≡ 2 · 3 = 6 ≡ 1 (mod 5). Так считают последнюю цифру степени, не выписывая миллион цифр. Делить остатки так просто нельзя: 6 ≡ 2 (mod 4), поделили на 2 — 3 ≡ 1 (mod 4)? Ложь. Деление требует аккуратности.',
      'Сравнение — отношение эквивалентности. Рефлексивно: a ≡ a. Симметрично: если a ≡ b, то b ≡ a. Транзитивно: a ≡ b и b ≡ c влекут a ≡ c. Поэтому можно заменять число его остатком в любой сумме и произведении.',
      'Подвинь число n на часах mod 5. Стрелка прыгает по остатку. 0, 5, 10, 15 — в нуле. 2, 7, 12, 17 — на двойке. Это и есть классы.',
      'Где работает. Доказать, что число не делится на 7. Последняя цифра 7ⁿ. День недели через 100 дней — mod 7. Квадрат по mod 4 бывает только 0 или 1, никогда 3 — отсюда «не сумма двух квадратов».',
      'Рецепт. 1) Запиши a = q m + r, 0 ≤ r < m. 2) Сравнение проверяй разностью. 3) В суммах и произведениях меняй на маленькие остатки. 4) Остаток 0 = делится. 5) Не дели остатки без проверки.',
      'В карман: 17 ≡ 2 (mod 5). Остаток меньше модуля. Разность ⋮ m. Складывать и умножать можно. 23 ≡ 3 (mod 4). 29 ≡ 5 (mod 6).',
      'Проверка: остаток 17 при делении на 5. 17 = 3·5 + 2. Это 2, не 7: семёрка уже больше модуля.'
    ],
    check: { q: 'Чему равен остаток 17 при делении на 5?', choices: ['2', '7', '1', '0'], ans: 0,
      exp: '17 = 3·5 + 2. Остаток 2, то есть 17 ≡ 2 (mod 5).' },
    tasks: [
      { q: 'Найди остаток от деления 23 на 4.', kind: 'unit', ans: 3, tol: 0,
        hints: ['20 = 5·4, 23 − 20 = 3.', 'Остаток всегда меньше 4.'], sol: '3' },
      { q: 'Запиши остаток: 29 ≡ … (mod 6)', kind: 'choice',
        choices: ['5', '6', '1', '3'], ans: 0, tol: 0,
        hints: ['24 = 4·6, 29 − 24 = 5.', 'Остаток 5, не 6: шестёрка уже модуль.'], sol: '5' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l408ink{to{stroke-dashoffset:0}}
    @keyframes l408pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l408pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l408glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l408-ink{animation:l408ink 1.3s cubic-bezier(.2,.75,.15,1) forwards}
    .l408-dot{transform-box:fill-box;transform-origin:center;animation:l408pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l408-pulse{animation:l408pulse 1.6s ease-in-out infinite}
    .l408-glow{animation:l408glow 1.8s ease-in-out infinite}
    .l408-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l408-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l408-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l408', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function clock(m, lit, doDraw){
    const cx=120, cy=118, R=72;
    let d=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#3d5c49" stroke-width="2" ${doDraw?ink(2*Math.PI*R,1.3,0):''}/>`;
    for(let i=0;i<m;i++){
      const ang=-Math.PI/2 + i*(2*Math.PI/m);
      const x1=cx+(R-4)*Math.cos(ang), y1=cy+(R-4)*Math.sin(ang);
      const x2=cx+(R-14)*Math.cos(ang), y2=cy+(R-14)*Math.sin(ang);
      const lx=cx+(R-26)*Math.cos(ang), ly=cy+(R-26)*Math.sin(ang)+4;
      const on=i===((lit%m)+m)%m;
      d+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${on?GOLD:'#3d5c49'}" stroke-width="${on?4:2}"/>`;
      d+=lab(lx, ly, String(i), on?GOLD:MUTED, 'middle', 13);
      if(on) d+=`<circle class="l408-glow" cx="${(cx+(R-8)*Math.cos(ang)).toFixed(1)}" cy="${(cy+(R-8)*Math.sin(ang)).toFixed(1)}" r="6" fill="${GOLD}"/>`;
    }
    return d;
  }

  function visC408(el){
    try{ window._waveCss && _waveCss('css-l408', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'408';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const n=Math.max(0, Math.min(24, +(st.n==null?17:st.n)));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, open?'17 ≡ 2 (mod 5)':'17 и 2 — родственники?', GOLD, 'middle', 18)+
          lab(120, 100, open?'один остаток 2':'разные числа', open?GREEN:MUTED, 'middle', 14)+
          lab(120, 150, '17 = 3·5 + 2', BLUE)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Один остаток','Сравнение — способ сказать: при делении на m эти числа ведут себя одинаково. Не «равны», а «равны с точностью до кругов».')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, 'a = q·m + r', GOLD, 'middle', 22)+
          lab(120, 104, '0 ≤ r < m', GREEN)+
          lab(120, 150, '17 = 3·5 + 2', BLUE)+
          lab(120, 186, 'остаток меньше модуля', MUTED, 'middle', 12)
        )}
        ${note('Единственность','Частное и остаток для пары (a, m) одни. Остаток не бывает равен модулю: 5 при делении на 5 — это уже 1·5 + 0, остаток 0, не 5.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, 'a ≡ b (mod m)', GOLD, 'middle', 20)+
          lab(120, 96, 'один остаток', GREEN)+
          lab(120, 140, '⟺  a − b  ⋮  m', BLUE, 'middle', 16)
        )}
        ${note('Два языка','«Одинаковый остаток» удобно в голове. «Разность делится» удобно на бумаге: одно вычитание и проверка.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 48, '17 − 2 = 15  ⋮  5', GOLD, 'middle', 16)+
          lab(120, 96, '17 = 3·5 + 2', BLUE)+
          lab(120, 140, '2 = 0·5 + 2', GREEN)+
          lab(120, 180, 'остаток тот же', MUTED)
        )}
        ${note('Почему равносильно','Вычли два представления с одним r — остался кусок, кратный m. Если остатки разные, разность не кратна m.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          clock(5, 2, doDraw)+
          lab(120, 28, '2, 7, 12, 17 — одна точка', GOLD, 'middle', 13)
        )}
        ${note('Класс остатка','Все числа 5k + 2 живут в одной точке циферблата. Их бесконечно, точка одна. Это и есть «сравнимы по модулю 5».')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[
            ['кратное 4 ≤ 23','20 = 5·4',BLUE],
            ['вычли','23 − 20 = 3',GREEN],
            ['сравнение','23 ≡ 3 (mod 4)',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:15px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Как считают остаток','Ищи ближайшее кратное снизу. Не деление «в столбик до запятой»: остаток целый и меньше модуля.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 60, '29 ≡ 5 (mod 6)?', GOLD, 'middle', 18)+
          lab(120, 110, '29 − 5 = 24', BLUE)+
          lab(120, 154, '24 : 6 = 4  →  да', GREEN)
        )}
        ${note('Проверка в одну строку','Не обязательно делить оба числа. Вычти и посмотри, делится ли. Если нет — сравнение ложно.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['a ≡ 0 (mod m)','a делится на m',GREEN],
            ['mod 2','чёт / нечет',BLUE],
            ['mod 10','последняя цифра',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <b style="color:${x[2]}">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Остаток ноль','Это не «ничего», это «делится нацело». Чётность и последняя цифра — сравнения, которые ты уже знаешь.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 48, '17 ≡ 2,  23 ≡ 3', GOLD, 'middle', 16)+
          lab(120, 96, 'сумма 40 ≡ 5 ≡ 0', GREEN, 'middle', 16)+
          lab(120, 144, '(mod 5)', MUTED)
        )}
        ${note('Сложение остатков','Меняй огромные числа на маленькие остатки, складывай, если вылезло за m — снова остаток. 2+3=5≡0.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 48, '17 · 23 ≡ 2 · 3', GOLD, 'middle', 16)+
          lab(120, 96, '6 ≡ 1 (mod 5)', GREEN, 'middle', 18)+
          lab(120, 144, 'делить так нельзя', RED, 'middle', 14)
        )}
        ${note('Умножение да, деление нет','Произведение остатков — остаток произведения. А вот 6 ≡ 2 (mod 4) после деления на 2 врёт: 3 ненужно сравнимо с 1 по mod 4.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, 'a ≡ a', GOLD)+
          lab(120, 100, 'a ≡ b  ⇒  b ≡ a', BLUE)+
          lab(120, 144, 'a ≡ b ≡ c  ⇒  a ≡ c', GREEN)
        )}
        ${note('Эквивалентность','Можно заменять число остатком где угодно в суммах и произведениях. Цепочка сравнений не рвётся.')}
      </div>`;
    } else if(step===11){
      const r=((n%5)+5)%5;
      h=`<div class="wv-col">
        ${frame(clock(5, r, doDraw)+lab(120, 28, n+' ≡ '+r+' (mod 5)', GOLD))}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">n
          <input type="range" min="0" max="24" value="${n}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].n=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:24px">${n}</b>
        </label>
        ${note('Крути число','Стрелка прыгает только по пяти точкам. 0, 5, 10, 15, 20 — в нуле. 2, 7, 12, 17, 22 — на двойке.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['не делится на 7','остаток не 0',RED],
            ['последняя цифра 7ⁿ','mod 10',GOLD],
            ['день недели через 100 дней','mod 7',BLUE],
            ['квадрат по mod 4','только 0 или 1',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Зачем олимпиаде','Большое число не трогают. Смотрят остаток. Если остаток «неправильный» — исходного числа не бывает.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','a = q m + r,  0 ≤ r < m',GOLD],
            ['2','Проверка: разность ⋮ m',BLUE],
            ['3','В суммах и произведениях — маленькие остатки',GREEN],
            ['4','Не дели остатки бездумно',RED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала остаток в диапазоне. Потом сравнение разностью. Потом арифметика остатков. Деление — отдельный разговор.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          clock(5, 2, false)+
          lab(120, 28, '17 ≡ 2 (mod 5)', GOLD)
        )}
        ${note('В карман','Остаток меньше модуля. Разность делится. Складывать и умножать можно. 23 ≡ 3 (mod 4), 29 ≡ 5 (mod 6).')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(lab(120, 90, '17  :  5', GOLD, 'middle', 24)+lab(120, 140, 'остаток ?', MUTED))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">? (mod 5)</div>
        ${note('Проверка','2. Не 7: семёрка уже больше пяти, это не остаток.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[408]=visC408;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===408){ arr[i]=L408; f=true; break; } }
    if(!f) arr.push(L408);
  })();
})();
/* ================= УРОК 409 · Параметры: линейные уравнения ================= */
(function(){
  const L409 = {
    id: 409, title: 'Параметры: линейные уравнения', ico: '⚙️',
    src: 'Математика · 7 класс · Олимп-7: параметры', subj: 'math',
    explain: [
      'Загадка: уравнение ax = 6. Если a = 3, x = 2. А если a = 0? А если справа тоже ноль? Одна буква a — ручка. Крутишь ручку — меняется весь ответ. Это параметр.',
      'Параметр — число, которое ещё не выбрали. x ищем, a настраиваем. Задача: описать x для каждого a. Не одно число, а таблица случаев.',
      'Случай 1: a не ноль. Делим на a: x = b/a. Одно решение. Подвинь a: точка на оси едет. При a = 3 и b = 6 точка на 2.',
      'Пример: 3x = 6 → x = 2. Ручка зафиксировалась, уравнение стало обычным. Параметр «превратился» в тройку.',
      'Случай 2: a = 0 и b = 0. Получается 0 · x = 0, то есть 0 = 0. Это правда при любом x. На оси загорается вся прямая. Решений бесконечно много.',
      'Случай 3: a = 0 и b не ноль. 0 · x = 5 — слева всегда ноль, справа пять. Ноль не равен пяти. На оси пусто. Решений нет.',
      'Три карточки. a ≠ 0 — одно. Оба нуля — все x. Только a ноль — никого. Запомни вид ax = b: сначала упрости, потом смотри на a и b.',
      'Не готовое: ax + 1 = 5. Перенеси 1: ax = 4. Теперь видно: a ≠ 0 → x = 4/a; a = 0 → 0 = 4, решений нет.',
      'Олимпиадный вопрос: при каком a уравнение ax = 6 не имеет решений? Справа 6 ≠ 0, значит только когда a = 0. Не путай с 0 · x = 0 — там наоборот бесконечно много.',
      'Подвинь две ручки a и b. Подпись скажет случай и решение. Поймай «одно», «все» и «пусто». Три мира на одной оси.',
      'Картинка: одна точка, вся прямая или ничего. Это и есть ответ с параметром — не число, а описание.',
      'Особый случай ax = 0. Если a ≠ 0, то x = 0. Если a = 0, то 0 = 0, все x. Ноль справа дружит с нулём слева.',
      'Рецепт: сведи к ax = b. Смотри a. Не ноль — дели. Ноль — смотри b. b ноль — все, b не ноль — никто.',
      'Фраза «при каком a» почти всегда просит один из трёх случаев. Сначала упрости, потом ручка.',
      'В карман: ax = b. a ≠ 0 → x = b/a. a = b = 0 → все. a = 0, b ≠ 0 → пусто. Для ax = 6 при a = 3 получается 2.',
      'Проверка: ax = 6, a = 3. Делим 6 на 3. x = 2. Не 3 и не 18.'
    ],
    check: { q: 'Уравнение ax = 6. При a = 3 чему равен x?', choices: ['2', '3', '6', '18'], ans: 0,
      exp: 'a ≠ 0, значит x = 6/3 = 2.' },
    tasks: [
      { q: 'При каком a уравнение ax = 0 имеет бесконечно много решений?', kind: 'unit', ans: 0, tol: 0,
        hints: ['0 · x = 0 верно при любом x.', 'Это когда a = 0.'], sol: '0' },
      { q: 'Сколько решений у уравнения 0·x = 5?', kind: 'choice',
        choices: ['ни одного', 'x = 5', 'бесконечно много', 'x = 0'], ans: 0, tol: 0,
        hints: ['Слева 0, справа 5.', '0 ≠ 5, решений нет.'], sol: 'ни одного' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l409ink{to{stroke-dashoffset:0}}
    @keyframes l409pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l409pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l409glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l409-ink{animation:l409ink 1.3s cubic-bezier(.2,.75,.15,1) forwards}
    .l409-dot{transform-box:fill-box;transform-origin:center;animation:l409pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l409-pulse{animation:l409pulse 1.6s ease-in-out infinite}
    .l409-glow{animation:l409glow 1.8s ease-in-out infinite}
    .l409-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l409-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l409-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l409', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function AX(x){ return 120 + x*16; }
  function axis(kind, xv){
    let t=`<line x1="20" y1="120" x2="220" y2="120" stroke="#3d5c49" stroke-width="2" ${kind==='all'?'stroke="'+GREEN+'" stroke-width="6"':''}/>`;
    for(let n=-5;n<=5;n++) t+=`<line x1="${AX(n)}" y1="114" x2="${AX(n)}" y2="126" stroke="#3d5c49"/>`+lab(AX(n), 142, String(n), MUTED, 'middle', 10);
    if(kind==='one' && xv!=null && isFinite(xv)){
      const px=Math.max(24, Math.min(216, AX(xv)));
      t+=`<circle class="l409-glow" cx="${px}" cy="120" r="7" fill="${GOLD}"/>`+lab(px, 96, 'x='+ (Math.round(xv*100)/100).toString().replace('.',','), GOLD);
    }
    if(kind==='none') t+=lab(120, 88, 'пусто', RED);
    if(kind==='all') t+=lab(120, 88, 'все x', GREEN);
    return t;
  }

  function visC409(el){
    try{ window._waveCss && _waveCss('css-l409', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'409';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const a=+(st.a==null?3:st.a);
    const b=+(st.b==null?6:st.b);
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, 'ax = 6', GOLD, 'middle', 24)+
          lab(120, 100, open?'ручка a меняет ответ':'что будет при a = 0?', open?GREEN:MUTED, 'middle', 14)+
          lab(120, 150, open?'три случая':'одна буква — секрет', MUTED)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Ручка настройки','x ищем, a ещё не выбрали. Ответ — не одно число, а описание: при таком a вот такой x.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          lab(70, 80, 'a ручка', BLUE)+lab(170, 80, 'x ищем', GOLD)+
          lab(120, 130, 'ax = b', GREEN, 'middle', 20)+
          lab(120, 176, 'b — данное число', MUTED)
        )}
        ${note('Три роли','Параметр настраивают. Неизвестное ищут. Свободный член дан. Не путай a и x местами.')}
      </div>`;
    } else if(step===2){
      const aa=a===0?0.5:a;
      const xv=6/aa;
      h=`<div class="wv-col">
        ${frame(axis('one', xv)+lab(120, 40, 'a ≠ 0  →  x = 6/a', GOLD))}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">a
          <input type="range" min="-40" max="40" value="${Math.round(aa*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=this.value/10; if(+this.value===0) CHS[k].a=0.5; chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:32px">${aa.toString().replace('.',',')}</b>
        </label>
        ${note('Одно решение','Пока a не ноль, делим. Точка едет по оси. Чем a меньше, тем x дальше.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 60, '3x = 6', GOLD, 'middle', 22)+
          lab(120, 110, 'x = 2', GREEN, 'middle', 22)+
          axis('one', 2)
        , '0 0 240 200')}
        ${note('Ручка зафиксировалась','a стало 3, уравнение обычное. Параметр умеет превращаться в число — тогда решаем как всегда.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 40, '0 · x = 0', GOLD, 'middle', 20)+
          axis('all')+
          lab(120, 176, '5, 100, −7 — все годятся', MUTED, 'middle', 12)
        )}
        ${note('Вся прямая','Ноль равен нулю всегда. Это не «x = 0», это «какой хочешь x». Бесконечно много решений.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 40, '0 · x = 5', RED, 'middle', 20)+
          axis('none')+
          lab(120, 176, '0 ≠ 5 никогда', MUTED)
        )}
        ${note('Пусто','Слева ноль при любом x, справа пять. Противоречие. Решений нет — и это тоже ответ.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['a ≠ 0','x = b/a  · одно',GREEN],
            ['a = 0, b = 0','все x',BLUE],
            ['a = 0, b ≠ 0','пусто',RED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <b style="color:${x[2]}">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Три карточки','Сначала упрости до ax = b. Потом только смотри на a и b. Не прыгай к x, пока не понял случай.')}
      </div>`;
    } else if(step===7){
      const show=!!st.red;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, 'ax + 1 = 5', GOLD, 'middle', 20)+
          lab(120, 100, show?'↓ перенесли 1': '', MUTED)+
          lab(120, 140, show?'ax = 4': 'упрости', show?GREEN:MUTED, 'middle', 18)+
          lab(120, 180, show?'a ≠ 0 → x = 4/a': '', BLUE, 'middle', 13)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].red=1;chRender(0);}catch(e){}">${show?'Свели':'Свести к ax = b'}</button>
        ${note('Сначала алгебра','Параметр не мешает переносить слагаемые. Когда вид ax = b готов, включается шпаргалка из трёх строк.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'ax = 6  без решений?', GOLD, 'middle', 16)+
          lab(120, 120, 'справа 6 ≠ 0', MUTED)+
          lab(120, 164, 'только a = 0', RED, 'middle', 20)
        )}
        ${note('Ловушка','Не путай с 0 · x = 0. Там решений полно. Здесь справа не ноль — ноль слева даёт ложь.')}
      </div>`;
    } else if(step===9){
      const aa=a, bb=b;
      let kind='one', xv=null, msg='';
      if(aa===0 && bb===0){ kind='all'; msg='все x'; }
      else if(aa===0){ kind='none'; msg='пусто'; }
      else { xv=bb/aa; msg='x = '+(Math.round(xv*100)/100).toString().replace('.',','); }
      h=`<div class="wv-col">
        ${frame(axis(kind, xv)+lab(120, 40, 'a='+aa.toString().replace('.',',')+'  b='+bb.toString().replace('.',',')+'  →  '+msg, kind==='none'?RED:kind==='all'?GREEN:GOLD, 'middle', 13))}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">a
            <input type="range" min="-40" max="40" value="${Math.round(aa*10)}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=this.value/10;chRender(0);}catch(e){}">
            <b style="color:${GOLD};min-width:32px">${aa.toString().replace('.',',')}</b></label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">b
            <input type="range" min="-60" max="60" value="${Math.round(bb*10)}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].b=this.value/10;chRender(0);}catch(e){}">
            <b style="color:${BLUE};min-width:32px">${bb.toString().replace('.',',')}</b></label>
        </div>
        ${note('Поймай три мира','Поставь a = 0 и b = 0 — вся ось. a = 0 и b = 5 — пусто. a = 3 и b = 6 — точка на 2.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          lab(50, 50, 'точка', GOLD)+`<circle cx="50" cy="100" r="7" fill="${GOLD}"/>`+
          lab(120, 50, 'прямая', GREEN)+`<line x1="80" y1="100" x2="160" y2="100" stroke="${GREEN}" stroke-width="6"/>`+
          lab(190, 50, 'пусто', RED)+lab(190, 104, '∅', RED, 'middle', 22)
        , '0 0 240 160')}
        ${note('Три картинки','Ответ с параметром рисуют так: точка, вся прямая или пустое множество. Не одно число.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, 'ax = 0', GOLD, 'middle', 22)+
          lab(120, 110, 'a ≠ 0 → x = 0', GREEN)+
          lab(120, 150, 'a = 0 → все x', BLUE)
        )}
        ${note('Ноль справа','Он дружит с нулём слева. Поэтому ax = 0 при a = 0 — не пусто, а наоборот все.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Сведи к ax = b',GOLD],
            ['2','a ≠ 0? Дели, одно решение',GREEN],
            ['3','a = 0? Смотри b',BLUE],
            ['4','b = 0 — все, иначе пусто',RED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не начинай с «x = …». Сначала вид, потом случай, потом формула.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, '«при каком a …»', GOLD, 'middle', 18)+
          lab(120, 120, 'это вопрос про случай', MUTED)+
          lab(120, 164, 'упрости → смотри ручку', GREEN, 'middle', 14)
        )}
        ${note('Олимпиадная фраза','Почти всегда ждут: при таких a одно, при таких все, при таких нет. Три куска ответа.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'ax = b', GOLD, 'middle', 22)+
          lab(120, 120, 'одно / все / пусто', GREEN)+
          lab(120, 164, 'a=3, b=6 → x=2', BLUE)
        )}
        ${note('В карман','Три случая. ax = 6 при тройке даёт двойку. ax = 0 при a = 0 — все x.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(lab(120, 80, 'ax = 6,  a = 3', GOLD, 'middle', 20)+lab(120, 130, 'x = ?', MUTED))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:20px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">x = ?</div>
        ${note('Проверка','2. Шесть на три. Не 18 — это умножили, а надо делить.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[409]=visC409;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===409){ arr[i]=L409; f=true; break; } }
    if(!f) arr.push(L409);
  })();
})();
/* ================= УРОК 410 · Средние: неравенство о средних ================= */
(function(){
  const L410 = {
    id: 410, title: 'Средние: неравенство о средних', ico: '📊',
    src: 'Математика · 7 класс · Олимп-7: средние', subj: 'math',
    explain: [
      'Загадка: два числа 4 и 9. Можно сложить и разделить на два — получится 6,5. Можно перемножить и взять корень — получится 6. Какое «среднее» честнее и какое всегда не меньше?',
      'Среднее арифметическое: (a + b)/2. Сложили, пополам. Для 4 и 9 это 13/2 = 6,5. Как середина отрезка на прямой.',
      'Среднее геометрическое: √(a · b). Для положительных. 4 · 9 = 36, корень 6. Как сторона квадрата той же площади, что прямоугольник 4 на 9.',
      'Великое неравенство: (a + b)/2 ≥ √(a · b) для положительных a, b. Арифметическое никогда не меньше геометрического. 6,5 ≥ 6 — видно.',
      'Равенство только когда a = b. Два одинаковых: (9+9)/2 = 9 и √81 = 9. Чем числа разнее, тем арифметическое сильнее отрывается.',
      'Почему верно: (√a − √b)² ≥ 0 всегда. Раскрой: a − 2√(ab) + b ≥ 0, значит a + b ≥ 2√(ab). Раздели на 2 — готово. Нажми «Раскрыть».',
      'Прямоугольник 4×9 и квадрат площади 36. Периметр прямоугольника 26, периметр квадрата 24. При той же площади квадрат «экономнее». Это то же неравенство.',
      'Задача: минимум x + 4/x при x > 0. Произведение кусков равно 4, корень 2, сумма не меньше 4. Минимум 4.',
      'Подвинь x. Сумма x + 4/x живая. Дно чаши — 4, в точке x = 2. Слева и справа сумма больше. Равенство, когда x = 4/x.',
      'Проверка: x = 2 → 2 + 2 = 4. x = 1 → 1 + 4 = 5, уже больше. x = 4 → 4 + 1 = 5. Симметрия.',
      'Ещё пара: 8 и 12. Арифметическое 10, геометрическое √96 ≈ 9,8. Снова 10 ≥ 9,8.',
      'Классика: x + 1/x ≥ 2 при x > 0. Произведение 1, корень 1, сумма ≥ 2. Равенство при x = 1.',
      'Где работает: наименьшая сумма при данном произведении, оценка стороны, «докажи что не меньше». Один инструмент — куча номеров.',
      'Рецепт: узнай произведение двух положительных кусков. Корень — геометрическое. Сумма не меньше удвоенного. Равенство, когда куски равны.',
      'В карман: AM ≥ GM. Равенство при a = b. Для 4 и 9 это 6,5 ≥ 6. Минимум x + 4/x равен 4 при x = 2. При равных девятках средние равны.',
      'Проверка: a = b = 9. Что больше — (a+b)/2 или √(ab)? Ничто: оба 9. Равенство в неравенстве.'
    ],
    check: { q: 'Что больше при a = b = 9: (a+b)/2 или √(ab)?', choices: ['они равны', 'среднее арифметическое', 'среднее геометрическое', 'нельзя сравнить'], ans: 0,
      exp: '(9+9)/2 = 9 и √81 = 9. Равенство, потому что числа равны.' },
    tasks: [
      { q: 'Найди среднее арифметическое чисел 8 и 12.', kind: 'unit', ans: 10, tol: 0,
        hints: ['Сложи и раздели на 2.', '(8+12)/2 = 10.'], sol: '10' },
      { q: 'Для положительных a и b всегда верно…', kind: 'choice',
        choices: ['(a+b)/2 ≥ √(ab)', '(a+b)/2 < √(ab)', '(a+b)/2 = √(ab) всегда', 'сравнить нельзя'], ans: 0, tol: 0,
        hints: ['Арифметическое не меньше геометрического.', 'Равенство только при a = b.'], sol: '(a+b)/2 ≥ √(ab)' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l410ink{to{stroke-dashoffset:0}}
    @keyframes l410pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l410pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l410glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l410-ink{animation:l410ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l410-dot{transform-box:fill-box;transform-origin:center;animation:l410pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l410-pulse{animation:l410pulse 1.6s ease-in-out infinite}
    .l410-glow{animation:l410glow 1.8s ease-in-out infinite}
    .l410-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l410-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l410-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l410', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function bar(x, h, col, name, val){
    const y=170-h;
    return `<rect x="${x}" y="${y}" width="28" height="${h}" rx="5" fill="${col}33" stroke="${col}" stroke-width="2"/>`+
      lab(x+14, y-8, val, col)+lab(x+14, 188, name, MUTED, 'middle', 11);
  }

  function visC410(el){
    try{ window._waveCss && _waveCss('css-l410', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'410';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const xv=Math.max(0.5, Math.min(8, +(st.x==null?2:st.x)));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          bar(50, 80, BLUE, '4', '4')+
          bar(100, 140, GREEN, '9', '9')+
          lab(180, 80, open?'AM 6,5':'два средних?', GOLD, 'middle', 13)+
          lab(180, 110, open?'GM 6':'', GREEN, 'middle', 13)+
          lab(120, 28, '4 и 9', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Два способа усреднить','Сложить пополам или корень из произведения. Какое не меньше? Сейчас увидим и докажем.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          `<line x1="30" y1="120" x2="210" y2="120" stroke="#3d5c49" stroke-width="2"/>`+
          `<circle cx="50" cy="120" r="6" fill="${BLUE}"/>`+lab(50, 144, '4', BLUE)+
          `<circle cx="190" cy="120" r="6" fill="${GREEN}"/>`+lab(190, 144, '9', GREEN)+
          `<circle class="l410-glow" cx="120" cy="120" r="7" fill="${GOLD}"/>`+lab(120, 96, '6,5', GOLD)+
          lab(120, 40, '(a + b)/2', GOLD, 'middle', 16)
        )}
        ${note('Середина отрезка','Арифметическое — точка ровно посередине между 4 и 9. Никакой площади, просто прямая.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="30" y="70" width="48" height="108" fill="${BLUE}22" stroke="${BLUE}" stroke-width="2" ${doDraw?ink(312,1.2,0):''}/>`+
          lab(54, 60, '4×9', BLUE)+
          `<rect x="120" y="70" width="72" height="72" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(288,1.2,.15):''}/>`+
          lab(156, 60, '√36 = 6', GOLD)+
          lab(120, 200, 'одна площадь 36', MUTED)
        )}
        ${note('Квадрат той же площади','Геометрическое — сторона квадрата. Прямоугольник 4 на 9 и квадрат 6 на 6 — площадь одна.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, '(a + b)/2  ≥  √(a·b)', GOLD, 'middle', 16)+
          lab(120, 120, '6,5  ≥  6', GREEN, 'middle', 22)+
          lab(120, 164, 'для положительных a, b', MUTED)
        )}
        ${note('Арифметическое сверху','Никогда не меньше геометрического. Это закон, не пример. Примеры только проверяют.')}
      </div>`;
    } else if(step===4){
      const t=Math.max(0, Math.min(1, st.t==null?0.4:+st.t));
      const a=4+5*t, b=9-5*t;
      const am=(a+b)/2, gm=Math.sqrt(a*b);
      h=`<div class="wv-col">
        ${frame(
          bar(60, a*8, BLUE, 'a', (Math.round(a*10)/10).toString().replace('.',','))+
          bar(150, b*8, GREEN, 'b', (Math.round(b*10)/10).toString().replace('.',','))+
          lab(120, 28, 'AM '+ (Math.round(am*10)/10).toString().replace('.',',') +'  GM '+(Math.round(gm*10)/10).toString().replace('.',','), GOLD, 'middle', 13)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">сблизь
          <input type="range" min="0" max="100" value="${Math.round(t*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;chRender(0);}catch(e){}">
        </label>
        ${note('Равенство при a = b','Сдвинь ползунок вправо: числа встречаются в 6,5, столбики равны, AM = GM. Разные числа — щель.')}
      </div>`;
    } else if(step===5){
      const show=!!st.prf;
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,330px)">
          ${[
            ['(√a − √b)² ≥ 0',GOLD],
            [show?'a − 2√(ab) + b ≥ 0':'раскрой квадрат',BLUE],
            [show?'a + b ≥ 2√(ab)':'…',GREEN],
            [show?'(a+b)/2 ≥ √(ab)':'…',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;border:1px solid #3d5c49;border-left:4px solid ${x[1]};border-radius:10px;padding:8px 12px;color:${x[1]};font-size:15px;font-family:Georgia,serif">${x[0]}</div>`).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].prf=1;chRender(0);}catch(e){}">${show?'Доказано':'Раскрыть'}</button>
        ${note('Квадрат неотрицателен','Одна строка (√a − √b)² ≥ 0 тянет всё неравенство. Равенство, когда корень из a равен корню из b, то есть a = b.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="24" y="70" width="40" height="90" fill="${BLUE}22" stroke="${BLUE}" stroke-width="2"/>`+
          lab(44, 60, 'P=26', BLUE)+
          `<rect x="100" y="70" width="72" height="72" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2"/>`+
          lab(136, 60, 'P=24', GOLD)+
          lab(120, 196, 'площадь 36 у обоих', MUTED)
        )}
        ${note('Квадрат экономнее','При одной площади периметр квадрата меньше. Это AM ≥ GM в картинке: полусумма сторон ≥ сторона квадрата.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, 'x + 4/x', GOLD, 'middle', 22)+
          lab(120, 100, 'произведение = 4', BLUE)+
          lab(120, 140, 'сумма ≥ 2·√4 = 4', GREEN, 'middle', 16)+
          lab(120, 180, 'минимум 4', GOLD)
        )}
        ${note('Два куска','x и 4/x. Их произведение всегда 4, если x > 0. Неравенство сразу даёт пол: сумма не ниже 4.')}
      </div>`;
    } else if(step===8){
      const sum=xv+4/xv;
      const pts=[];
      for(let t=0.5;t<=8.01;t+=0.12){
        const px=28+t*24, py=170-Math.min(12, t+4/t)*12;
        if(px<=220 && py>=36) pts.push([px,py]);
      }
      let plen=0; for(let i=1;i<pts.length;i++) plen+=Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
      const d='M '+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L ');
      const px=Math.max(28, Math.min(220, 28+xv*24));
      const py=Math.max(36, Math.min(190, 170-Math.min(12,sum)*12));
      h=`<div class="wv-col">
        ${frame(
          `<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="2.4" ${doDraw?ink(plen,1.4,0):''}/>`+
          `<circle class="l410-glow" cx="${px}" cy="${py}" r="6" fill="${GREEN}"/>`+
          lab(120, 28, 'x + 4/x = '+(Math.round(sum*100)/100).toString().replace('.',','), GOLD)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">x
          <input type="range" min="5" max="80" value="${Math.round(xv*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].x=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:28px">${xv.toString().replace('.',',')}</b>
        </label>
        ${note('Дно чаши','Крути x. Самая низкая точка — 4, около x = 2. Слева и справа сумма больше. Это и есть минимум.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, 'x = 4/x', GOLD, 'middle', 18)+
          lab(120, 96, 'x² = 4,  x = 2', GREEN, 'middle', 18)+
          lab(120, 140, '2 + 4/2 = 4', BLUE, 'middle', 18)
        )}
        ${note('Когда дно','Равенство в AM-GM, когда куски равны. x = 4/x, x > 0 → x = 2. Подстановка подтверждает: 4.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          bar(50, 80, BLUE, '8', '8')+
          bar(100, 120, GREEN, '12', '12')+
          lab(180, 90, 'AM 10', GOLD)+
          lab(180, 120, 'GM ≈ 9,8', GREEN)+
          lab(120, 28, '10 ≥ 9,8', GOLD)
        )}
        ${note('Ещё одна пара','Не только 4 и 9. Любые положительные. Щель тем больше, чем числа разнее.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'x + 1/x ≥ 2', GOLD, 'middle', 22)+
          lab(120, 120, 'x > 0', MUTED)+
          lab(120, 160, 'равенство при x = 1', GREEN)
        )}
        ${note('Классика','Произведение кусков 1, корень 1, удвоенный корень 2. Одна строка вместо кучи преобразований.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['сумма при данном произведении','минимум',GOLD],
            ['x + 1/x','≥ 2',BLUE],
            ['площадь при периметре','квадрат лучший',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]==='минимум'||i===0?GOLD:x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${GOLD}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Один инструмент','Олимпиада любит «найди наименьшее». Если видишь сумму и произведение — это оно.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Два положительных куска',GOLD],
            ['2','Их произведение → корень GM',BLUE],
            ['3','Сумма ≥ 2 · GM',GREEN],
            ['4','Равенство, когда куски равны',MUTED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не зубри 6,5 ≥ 6. Зубри ход: произведение, корень, удвоить, сравнить с суммой.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'AM ≥ GM', GOLD, 'middle', 22)+
          lab(120, 120, '4 и 9 → 6,5 ≥ 6', GREEN)+
          lab(120, 160, 'x + 4/x ≥ 4', BLUE)
        )}
        ${note('В карман','Равенство при a = b. Минимум x + 4/x равен 4 при x = 2. Две девятки — средние равны.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(lab(120, 80, 'a = b = 9', GOLD, 'middle', 20)+lab(120, 130, 'что больше?', MUTED))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">что больше?</div>
        ${note('Проверка','Они равны. Оба 9. Равенство в неравенстве, потому что числа одинаковые.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[410]=visC410;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===410){ arr[i]=L410; f=true; break; } }
    if(!f) arr.push(L410);
  })();
})();
/* ================= УРОК 411 · Принцип крайнего ================= */
(function(){
  const L411 = {
    id: 411, title: 'Принцип крайнего', ico: '🌟',
    src: 'Математика · 7 класс · Олимп-7: крайний элемент', subj: 'math',
    explain: [
      'Загадка: в очереди пятеро разного роста. Кого спросить, чтобы понять про всех сразу? Не среднего — крайнего: самого высокого или самого низкого. Этот ход и есть принцип крайнего.',
      'Крайний — самый большой, самый маленький, самый левый, самый близкий. Его свойства жёсткие: дальше уже некуда. Поэтому из него часто следует вся задача.',
      'Три целых числа и две «коробки»: чёт и нечет. Нажми числа — они сядут в коробки. Когда третий сядет, в одной коробке окажутся двое. Это принцип Дирихле: клеток меньше, чем жильцов.',
      'Не «может быть», а «обязательно». Три кролика, две клетки — хотя бы в одной двое. Так доказывают «найдутся два одной чётности», не перебирая все тройки.',
      'Остатки при делении на 3: 0, 1, 2. Ровно три коробки. Четыре числа — снова Дирихле: какие-то два с одним остатком. Нажми число — оно само найдёт коробку.',
      'Если остатки равны, разность делится на 3. 7 и 4 оба дают остаток 1, 7 − 4 = 3. Это уже готовый инструмент: «возьми на одно больше, чем остатков».',
      'Другой край: наименьший делитель d > 1 числа n. Нажми делители 12. Самый маленький больше единицы — двойка. Она простая. Так всегда.',
      'Почему простой? Если у d есть делитель меньше, он делит и n — нашёлся делитель ещё меньше. А мы брали самый маленький. Противоречие. Значит, d простое.',
      'Метод наименьшего контрпримера: предположи, что утверждение ложно, возьми самый маленький контрпример и построй из него ещё меньше. Этого не бывает — значит, контрпримеров нет.',
      'Нажми ступени: «есть контрпример» → «самый маленький» → «ещё меньше» → тупик. Крайний снова работает, только теперь это край среди плохих примеров.',
      'В геометрии крайний — самый большой угол, самая длинная сторона. В числах — минимум или максимум. Вопрос один: кто тут на краю и что из этого следует?',
      'Когда применять: надо доказать, что «что-то есть»; ищешь максимум или минимум; прямое доказательство зашло в тупик. Тогда зови крайнего.',
      'Живой Дирихле: дырок n, голубей n+1. Подвинь ползунок. Как только голубей больше, чем дырок, кто-то делит квартиру. Это и есть гарантия, не вероятность.',
      'Рецепт: найди край. Спроси, почему он крайний. Выведи следствие. Для Дирихле сравни «сколько мест» и «сколько жильцов».',
      'В карман: крайний — минимум или максимум. Три числа — два одной чётности. m+1 чисел — два с одним остатком по модулю m. Наименьший делитель > 1 — простой.',
      'Проверка: что выбирают? Не случайный и не средний. Самый маленький или самый большой — крайний элемент.'
    ],
    check: { q: 'Что выбирают, применяя принцип крайнего?', choices: ['наименьший или наибольший элемент', 'случайный элемент', 'средний элемент', 'все элементы сразу'], ans: 0,
      exp: 'Смотрят на экстремальный элемент: самый большой или самый маленький.' },
    tasks: [
      { q: 'Сколько существует остатков при делении на 2 (чётностей)?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Чёт и нечет.', 'Остатки 0 и 1 — два штуки.'], sol: '2' },
      { q: 'Среди 4 целых чисел гарантированно найдутся два…', kind: 'choice',
        choices: ['с одинаковым остатком при делении на 3', 'с разными остатками', 'нечётных', 'чётных'], ans: 0, tol: 0,
        hints: ['Остатков по модулю 3 ровно три.', '4 жильца, 3 комнаты — двое в одной.'], sol: 'с одинаковым остатком по mod 3' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f', PINK='#ff8ac0';
  const CSS=`<style>
    @keyframes l411ink{to{stroke-dashoffset:0}}
    @keyframes l411pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l411pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l411glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l411-ink{animation:l411ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l411-dot{transform-box:fill-box;transform-origin:center;animation:l411pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l411-pulse{animation:l411pulse 1.6s ease-in-out infinite}
    .l411-glow{animation:l411glow 1.8s ease-in-out infinite}
    .l411-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l411-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(16, Math.min(224, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l411-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l411', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }

  function visC411(el){
    try{ window._waveCss && _waveCss('css-l411', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'411';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const holes=Math.max(2, Math.min(5, +(st.h==null?3:st.h)));
    let h='';

    if(step===0){
      const open=!!st.open;
      const hs=[72,100,128,90,110];
      h=`<div class="wv-col">
        ${frame(
          hs.map((hh,i)=>{
            const x=32+i*42;
            const ext=i===0||i===4;
            return `<rect x="${x}" y="${160-hh}" width="28" height="${hh}" rx="6" fill="${ext&&open?GOLD:BLUE}33" stroke="${ext&&open?GOLD:BLUE}" stroke-width="${ext&&open?3:1.6}" ${doDraw?ink(2*(28+hh),1.1,i*.08):''}/>`+
              lab(x+14, 176, ['Аня','Боря','Вика','Дима','Егор'][i], ext&&open?GOLD:MUTED, 'middle', 10);
          }).join('')+
          lab(120, 28, open?'крайние: Аня и Егор':'кого спросить?', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Не среднего','Самый высокий и самый низкий — жёсткие края. Из их свойств часто следует вся задача. Это принцип крайнего.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:340px">
          ${[['самый большой',GREEN],['самый маленький',BLUE],['самый близкий',GOLD],['самый левый',PINK]].map((x,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.08}s;border:2px solid ${x[1]};border-radius:12px;padding:8px 12px;color:${x[1]};font-size:14px">${x[0]}</div>`).join('')}
        </div>
        ${note('Дальше некуда','Крайний тем и хорош, что его нельзя сдвинуть ещё дальше. Любое «а вдруг есть больше» уже отрезано.')}
      </div>`;
    } else if(step===2){
      const placed=st.par||[];
      const nums=[4,7,9];
      const even=placed.filter(n=>n%2===0);
      const odd=placed.filter(n=>n%2);
      h=`<div class="wv-col">
        ${frame(
          `<rect x="20" y="50" width="90" height="120" rx="12" fill="${BLUE}14" stroke="${BLUE}" ${doDraw?ink(420,1.1,0):''}/>`+
          lab(65, 42, 'чёт', BLUE)+
          even.map((n,i)=>lab(65, 80+i*28, String(n), GOLD, 'middle', 16)).join('')+
          `<rect x="130" y="50" width="90" height="120" rx="12" fill="${GREEN}14" stroke="${GREEN}" ${doDraw?ink(420,1.1,.1):''}/>`+
          lab(175, 42, 'нечет', GREEN)+
          odd.map((n,i)=>lab(175, 80+i*28, String(n), GOLD, 'middle', 16)).join('')
        )}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${nums.map(n=>`<button type="button" class="btn" ${placed.indexOf(n)>=0?'disabled':''} style="opacity:${placed.indexOf(n)>=0?.4:1}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].par=(CHS[k].par||[]).concat([${n}]);chRender(0);}catch(e){}">${n}</button>`).join('')}
        </div>
        ${placed.length>=3?`<div class="wv-ans" style="font-size:15px">трое сели → в одной коробке двое</div>`:''}
        ${note('Три жильца, две комнаты','Неважно, какие числа: третий обязан сесть к кому-то. Два одной чётности — не случайность, а закон.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, '3 кролика', GOLD, 'middle', 18)+
          lab(120, 90, '2 клетки', BLUE, 'middle', 18)+
          lab(120, 140, '⇒ двое вместе', GREEN, 'middle', 16)+
          lab(120, 180, 'Дирихле', MUTED)
        )}
        ${note('Не «может», а «обязано»','Принцип Дирихле — родственник крайнего: смотришь не на среднее, а на переполненную клетку. Она-то и крайняя.')}
      </div>`;
    } else if(step===4){
      const nums=[4,5,7,9];
      const placed=st.mod||[];
      const bins=[[],[],[]];
      placed.forEach(n=>bins[n%3].push(n));
      h=`<div class="wv-col">
        ${frame(
          [0,1,2].map((r,i)=>{
            const x=22+i*72;
            const full=bins[r].length>=2;
            return `<rect x="${x}" y="48" width="64" height="130" rx="10" fill="${full?GOLD:BLUE}18" stroke="${full?GOLD:BLUE}"/>`+
              lab(x+32, 40, 'ост. '+r, full?GOLD:MUTED)+
              bins[r].map((n,j)=>lab(x+32, 80+j*28, String(n), GOLD, 'middle', 15)).join('');
          }).join('')
        )}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${nums.map(n=>`<button type="button" class="btn" style="opacity:${placed.indexOf(n)>=0?.4:1}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};if((CHS[k].mod||[]).indexOf(${n})<0){CHS[k].mod=(CHS[k].mod||[]).concat([${n}]);}chRender(0);}catch(e){}">${n}</button>`).join('')}
        </div>
        ${placed.length>=4?`<div class="wv-ans" style="font-size:15px">4 числа, 3 остатка — двое совпали</div>`:''}
        ${note('Модуль 3','Коробок ровно три. Четвёртое число повторит остаток. Жми по одному — увидишь, какая коробка переполнится.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 56, '7 и 4', GOLD, 'middle', 20)+
          lab(120, 96, 'оба остаток 1', BLUE)+
          lab(120, 140, '7 − 4 = 3', GREEN, 'middle', 18)+
          lab(120, 176, 'разность ⋮ 3', MUTED)
        )}
        ${note('Готовый инструмент','Взял на одно число больше, чем остатков — получил пару с равным остатком и разность, которая делится на m.')}
      </div>`;
    } else if(step===6){
      const divs=[1,2,3,4,6,12];
      const on=st.div||[];
      const mini=on.filter(x=>x>1).sort((a,b)=>a-b)[0];
      h=`<div class="wv-col">
        ${frame(
          lab(120, 36, 'делители 12', GOLD)+
          divs.map((d,i)=>{
            const x=28+(i%3)*70, y=70+Math.floor(i/3)*70;
            const sel=on.indexOf(d)>=0;
            const star=mini===d;
            return `<rect x="${x}" y="${y}" width="56" height="48" rx="10" fill="${star?GOLD:sel?GREEN:BLUE}22" stroke="${star?GOLD:sel?GREEN:'#3d5c49'}"/>`+
              lab(x+28, y+30, String(d), star?GOLD:sel?GREEN:MUTED, 'middle', 16);
          }).join('')
        )}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${divs.map(d=>`<button type="button" class="btn" style="padding:8px 10px;border-color:${on.indexOf(d)>=0?GOLD:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};const a=CHS[k].div||[];if(a.indexOf(${d})<0)a.push(${d});CHS[k].div=a;chRender(0);}catch(e){}">${d}</button>`).join('')}
        </div>
        ${mini?`<div class="wv-ans" style="font-size:15px">наименьший > 1 — это ${mini}, он простой</div>`:''}
        ${note('Собери делители','Жми все делители 12. Крайний среди тех, что больше 1 — двойка. Она простая. Так у любого n > 1.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['взяли наименьший d > 1',GOLD],
            ['если d составной — есть делитель меньше',BLUE],
            ['он делил бы и n',MUTED],
            ['противоречие → d простой',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[1]};border-radius:10px;padding:8px 12px;color:#e8dcc8;font-size:14px;text-align:left">${x[0]}</div>`).join('')}
        </div>
        ${note('Край запрещает составное','Именно потому, что d самый маленький, он не может разложиться. Крайний сам себя защищает.')}
      </div>`;
    } else if(step===8){
      const k=Math.max(0, Math.min(3, st.k==null?0:+st.k));
      const steps=['есть контрпример','возьми наименьший','построй ещё меньше','тупик: такого не бывает'];
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${steps.map((t,i)=>`<div class="wv-pop" style="opacity:${i<=k?1:.3};animation-delay:${i*.08}s;border:1px solid #3d5c49;border-left:4px solid ${i===3?GREEN:GOLD};border-radius:10px;padding:8px 12px;color:#e8dcc8;font-size:14px;text-align:left">${i+1}. ${t}</div>`).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].k=Math.min(3,(CHS[k].k||0)+1);chRender(0);}catch(e){}">${k>=3?'Цепочка замкнулась':'Следующий шаг'}</button>
        ${note('Наименьший плохой','Если из самого маленького контрпримера делается ещё меньше, край ломается. Значит, плохих примеров нет.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 50, 'числа → min / max', GOLD)+
          lab(120, 100, 'фигуры → длинная сторона', BLUE)+
          lab(120, 150, 'Дирихле → полная клетка', GREEN)
        )}
        ${note('Один вопрос','Кто тут на краю? Что из этого следует? Если ответ находится — принцип сработал.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['доказать, что «что-то есть»','крайний элемент',BLUE],
            ['найти максимум или минимум','изучи край',GREEN],
            ['прямое доказательство в тупике','попробуй крайнего',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Три случая','Не на каждый номер. Когда задача про существование или про «самый-самый» — это его поле.')}
      </div>`;
    } else if(step===11){
      const pigeons=holes+1;
      h=`<div class="wv-col">
        ${frame(
          Array.from({length:holes},(_,i)=>{
            const x=24+i*(200/holes);
            const w=200/holes-8;
            return `<rect x="${x}" y="70" width="${w}" height="90" rx="8" fill="${BLUE}18" stroke="${BLUE}"/>`+lab(x+w/2, 160, 'дыра', MUTED, 'middle', 10);
          }).join('')+
          lab(120, 40, holes+' дыр, '+(pigeons)+' голубей', GOLD)+
          lab(120, 200, 'кто-то не один', GREEN)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">дырок
          <input type="range" min="2" max="5" value="${holes}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${holes}</b>
        </label>
        ${note('Живой Дирихле','Голубей на одного больше. Гарантия: хотя бы одна дыра с двумя. Не «может», а «обязана».')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Найди край: min, max, полная клетка',GOLD],
            ['2','Спроси, почему он крайний',BLUE],
            ['3','Выведи следствие',GREEN],
            ['4','Для Дирихле: места vs жильцы',MUTED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[0]==='1'?GOLD:BLUE};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала край, потом свойство, потом вывод. Не начинай со среднего — там свободы слишком много.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 70, 'край = min или max', GOLD, 'middle', 16)+
          lab(120, 114, '3 числа → одна чётность в паре', BLUE, 'middle', 13)+
          lab(120, 154, 'наименьший делитель > 1 простой', GREEN, 'middle', 13)
        )}
        ${note('Связка','Дирихле — про переполненную клетку. Крайний делитель — про простое. Контрпример — про самый маленький плохой.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 80, 'кто на краю?', GOLD, 'middle', 22)+
          lab(120, 130, 'что из этого следует?', MUTED)
        )}
        ${note('В карман','Бери минимум или максимум. Три числа — два одной чётности. Четыре числа — два с одним остатком по модулю 3.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(lab(120, 100, 'кого выбирают?', GOLD, 'middle', 18)+lab(120, 140, 'средний? случайный? крайний?', MUTED, 'middle', 13))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">самый большой или …?</div>
        ${note('Проверка','Наименьший или наибольший. Не средний и не все сразу.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[411]=visC411;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===411){ arr[i]=L411; f=true; break; } }
    if(!f) arr.push(L411);
  })();
})();
/* ================= УРОК 412 · Игры и раскраски: уровень 7 ================= */
(function(){
  const L412 = {
    id: 412, title: 'Игры и раскраски: уровень 7', ico: '🎨',
    src: 'Математика · 7 класс · Олимп-7: игры', subj: 'math',
    explain: [
      'Загадка: доска 7 на 7, плитки домино 1 на 2. Можно ли закрыть всё без дырок и наложений? Не рисуй сто вариантов — сосчитай.',
      'Клеток 7 · 7 = 49. Нечётное число. Каждое домино закрывает две клетки. 49 на 2 не делится — хотя бы одна клетка останется. Уже ответ: нельзя.',
      'Нажми «Считать»: клетки загораются по одной до 49. Нечёт виден глазами. Для замощения нужен чётный счёт.',
      'Раскрась в шахматку. Соседние клетки разного цвета. Домино всегда ложится на одну тёмную и одну светлую — оно покрывает ребро между соседями.',
      'На доске 7×7 тёмных 25, светлых 24. Углы одного цвета, сторона нечётная — тёмных на одну больше. Плитки забирали бы поровну. Поровну нет — замостить нельзя.',
      'Нажми «Класть домино»: плитки закрывают пары, в конце остаётся одна клетка. Сколько ни клади, одна лишняя. Это та самая 25-я тёмная.',
      'Раскраска сильнее голого счёта. На 8×8 клеток 64, чётно, домино влезает. Вырежи два противоположных угла — оба одного цвета, останется 30 и 32. Чётно, а замостить всё равно нельзя.',
      'Вторая задача: двое по очереди красят по клетке 7×7. Кто не может сходить — проиграл. Ходов будет ровно 49, по числу клеток.',
      'Жми клетки. Первый — золото, второй — голубой. Когда доска полная, последний ход за первым: 1, 3, 5, …, 49 — нечётные номера.',
      'Нечётное число ходов → последний ход у того, кто начал. Первый выигрывает, если оба играют до конца. Стратегия тут простая: ходы не кончаются раньше.',
      'На 8×8 клеток 64, чётно. Последний ход — 64-й, у второго. Сменилась чётность — сменился победитель. Рецепт игр: посчитай ходы.',
      'Связка: нечёт доски бьёт домино. Неравные цвета бьют домино даже на чётной доске с вырезами. Нечёт ходов отдаёт последний ход первому.',
      'Подвинь размер n. Смотри, чётно ли n² и равны ли цвета. На нечётном n тёмных больше на 1. На чётном — поровну, и домино проходит.',
      'Рецепт: раскрась. Посчитай цвета. Посмотри, что забирает ход или плитка. Несостыковка — доказал «нельзя». Для игр — чёт или нечет числа ходов.',
      'В карман: 7×7 = 49, нечётно. Домино по 2. Цвета 25 и 24. Игра в клетки — первый берёт 49-й ход и выигрывает.',
      'Проверка: можно ли замостить 7×7 домино? Нет. Не из-за «не получилось руками», а потому что 49 нечётно и цвета не равны.'
    ],
    check: { q: 'Можно ли замостить домино доску 7×7?', choices: ['нет', 'да', 'да, если перевернуть', 'нельзя узнать'], ans: 0,
      exp: '49 клеток нечётно, домино покрывает 2. Плюс цвета 25 и 24.' },
    tasks: [
      { q: 'Сколько клеток в доске 7×7?', kind: 'unit', ans: 49, tol: 0,
        hints: ['7 · 7.', '49.'], sol: '49' },
      { q: 'На доске 7×7 красят по одной клетке, проигрывает не сумевший сходить. Кто выигрывает?', kind: 'choice',
        choices: ['первый', 'второй', 'ничья', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Ходов 49, число нечётное.', 'Последнюю клетку красит первый.'], sol: 'первый' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l412ink{to{stroke-dashoffset:0}}
    @keyframes l412pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.12)}100%{transform:scale(1);opacity:1}}
    @keyframes l412pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l412glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 7px ${GOLD})}}
    .l412-ink{animation:l412ink 1.3s cubic-bezier(.2,.75,.15,1) forwards}
    .l412-dot{transform-box:fill-box;transform-origin:center;animation:l412pop .35s cubic-bezier(.2,1.4,.4,1) both}
    .l412-pulse{animation:l412pulse 1.6s ease-in-out infinite}
    .l412-glow{animation:l412glow 1.8s ease-in-out infinite}
    .l412-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.2px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l412-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(14, Math.min(226, +x)), yy=Math.max(16, Math.min(208, +y));
    return `<text class="l412-lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||11}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l412', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  const N=7, CS=22, OX=24, OY=34;
  function cell(r,c){ return [OX+c*CS, OY+r*CS]; }
  function isDark(r,c){ return (r+c)%2===0; }
  function board(opts){
    opts=opts||{};
    const paint=opts.paint||[];
    const cover=opts.cover||[];
    const lit=opts.lit==null?49:opts.lit;
    const showColor=!!opts.color;
    const leftover=opts.leftover;
    let d='';
    let k=0;
    for(let r=0;r<N;r++) for(let c=0;c<N;c++){
      const [x,y]=cell(r,c);
      const idx=r*N+c;
      const on=k<lit; k++;
      const dark=isDark(r,c);
      let fill='#1e3328';
      if(on && showColor) fill=dark?'rgba(255,215,106,.35)':'rgba(127,209,255,.28)';
      else if(on) fill='rgba(127,209,255,.16)';
      const pv=paint[idx];
      if(pv===1) fill=GOLD;
      if(pv===2) fill=BLUE;
      if(cover[idx]) fill=GREEN;
      if(leftover && leftover[0]===r && leftover[1]===c) fill=RED;
      d+=`<rect x="${x}" y="${y}" width="${CS-1.2}" height="${CS-1.2}" rx="3" fill="${fill}" stroke="#0c1a14" stroke-width="0.6"/>`;
    }
    return d;
  }
  function counts(n){
    const tot=n*n, dark=(tot+1)>>1, light=tot-dark;
    return {tot:tot, dark:dark, light:light, odd:tot%2===1};
  }

  function visC412(el){
    try{ window._waveCss && _waveCss('css-l412', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'412';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const lit=Math.max(0, Math.min(49, st.lit==null?0:+st.lit));
    const dom=Math.max(0, Math.min(24, st.dom==null?0:+st.dom));
    const nn=Math.max(4, Math.min(8, +(st.n==null?7:st.n)));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true})+
          lab(120, 22, open?'49 клеток, нечётно':'закроем домино?', GOLD, 'middle', 13)+
          lab(120, 204, open?'нельзя':'7 × 7', MUTED)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Не рисуй сто вариантов','Доска нечётная, плитка чётная. Сейчас это увидим счётом и раскраской, а не перебором.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          board({lit:lit||49, color:false})+
          lab(120, 22, '7 · 7 = 49', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].lit=Math.min(49,(CHS[k].lit||0)+7);chRender(0);}catch(e){}">${lit>=49?'Все 49':'Ещё ряд'}</button>
        ${note('Нечётное','Каждый ряд по 7, рядов 7. Нечёт на нечет даёт нечет. Для домино это уже плохой знак.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="70" y="80" width="40" height="20" rx="4" fill="${GREEN}" ${doDraw?ink(120,1.1,0):''}/>`+
          `<rect x="112" y="80" width="40" height="20" rx="4" fill="${BLUE}"/>`+
          lab(120, 50, 'домино = 2 клетки', GOLD)+
          lab(120, 140, '49 : 2 = 24 остаток 1', RED)+
          lab(120, 176, 'одна клетка лишняя', MUTED)
        )}
        ${note('Деление на два','24 плитки закрыли бы 48 клеток. 49-я некуда. Это доказательство: не «мне не удалось», а «невозможно».')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true})+
          lab(120, 22, 'шахматка', GOLD)+
          lab(120, 204, 'соседи разного цвета', MUTED)
        )}
        ${note('Ребро доски','Домино кладётся на двух соседей. Соседи в шахматке всегда разного цвета. Каждая плитка: один тёмный + один светлый.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true})+
          lab(70, 22, 'тёмных 25', GOLD, 'middle', 12)+
          lab(170, 22, 'светлых 24', BLUE, 'middle', 12)+
          lab(120, 204, 'не поровну', RED)
        )}
        ${note('Сторона нечётная','Углы одного цвета. На нечётной доске этот цвет встречается 25 раз, другой — 24. Плитки не могут забрать лишнюю тёмную.')}
      </div>`;
    } else if(step===5){
      const cover={};
      const leftover=[6,6];
      let placed=0;
      for(let r=0;r<7 && placed<dom;r++){
        for(let c=0;c<6 && placed<dom;c+=2){
          cover[r*7+c]=1; cover[r*7+c+1]=1; placed++;
        }
      }
      for(let r=0;r<6 && placed<dom;r+=2){
        cover[r*7+6]=1; cover[(r+1)*7+6]=1; placed++;
      }
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true, cover:cover, leftover:dom>=24?leftover:null})+
          lab(120, 22, dom+' домино'+(dom>=24?' · одна лишняя':''), dom>=24?RED:GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].dom=Math.min(24,(CHS[k].dom||0)+3);chRender(0);}catch(e){}">${dom>=24?'Осталась одна':'Класть домино'}</button>
        ${note('Клади, не поможет','24 плитки, 48 клеток, красная последняя. Раскраска обещала это заранее: лишняя — тёмная.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 44, '8×8 без двух углов', GOLD)+
          Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>{
            const s=16, x=44+c*s, y=60+r*s;
            const cut=(r===0&&c===0)||(r===7&&c===7);
            const dark=(r+c)%2===0;
            return `<rect x="${x}" y="${y}" width="${s-1}" height="${s-1}" fill="${cut?RED:(dark?'rgba(255,215,106,.35)':'rgba(127,209,255,.28)')}"/>`;
          }).join('')).join('')+
          lab(120, 204, '30 и 32, чётно — и всё равно нельзя', MUTED, 'middle', 11)
        )}
        ${note('Голый счёт слабже','64 − 2 = 62, делится на 2. Но оба угла одного цвета. Цвета 30 и 32. Домино снова бессильно. Раскраска видит то, чего деление не видит.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true})+
          lab(120, 22, 'игра: крась клетку', GOLD)+
          lab(120, 204, 'кто не сходит — проиграл', MUTED, 'middle', 11)
        )}
        ${note('49 ходов','Клеток 49, ход — одна клетка. Партия длится ровно 49 ходов. Ничья ходами не кончится: доска конечная.')}
      </div>`;
    } else if(step===8){
      const paint=st.paint||[];
      const next=paint.filter(Boolean).length;
      const who=next%2===0?1:2;
      const full=next>=49;
      let cells='';
      for(let r=0;r<7;r++) for(let c=0;c<7;c++){
        const [x,y]=cell(r,c);
        const idx=r*7+c;
        const pv=paint[idx];
        const fill=pv===1?GOLD:(pv===2?BLUE:'rgba(127,209,255,.14)');
        cells+=`<rect x="${x}" y="${y}" width="${CS-1.2}" height="${CS-1.2}" rx="3" fill="${fill}" stroke="#0c1a14" style="cursor:pointer"
          onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};const p=(CHS[k].paint||[]).slice(); if(p[${idx}]) return; p[${idx}]=((p.filter(Boolean).length)%2===0)?1:2; CHS[k].paint=p; chRender(0);}catch(e){}"/>`;
      }
      h=`<div class="wv-col">
        ${frame(cells+lab(120, 22, full?'первый сделал 49-й':'ход '+(next+1)+' · '+(who===1?'первый':'второй'), full?GREEN:GOLD)+lab(120, 204, 'золото — первый, голубой — второй', MUTED, 'middle', 11))}
        ${note('Жми клетку на доске','Первый — золото. Второй — голубой. Когда закроешь всё, последний цвет золотой: 49 нечётно.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          lab(120, 60, 'ходы 1, 3, 5, …, 49', GOLD, 'middle', 16)+
          lab(120, 110, 'все нечётные — первый', GREEN)+
          lab(120, 154, 'последний ход выигрывает', BLUE)
        )}
        ${note('Чётность партии','Нечёт ходов отдаёт финал тому, кто начал. Стратегия не нужна: доска не кончится раньше 49.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          lab(80, 80, '7×7', GOLD)+lab(80, 110, '49 нечет', GREEN)+lab(80, 140, 'первый', GOLD)+
          lab(170, 80, '8×8', BLUE)+lab(170, 110, '64 чёт', GREEN)+lab(170, 140, 'второй', BLUE)
        )}
        ${note('Сменилась чётность','На 8×8 последний ход 64-й — у второго. Одно правило: посчитай ходы, посмотри чётность.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['нечёт доски','бьёт домино',RED],
            ['цвета 25 и 24','бьют домино',GOLD],
            ['вырезы одного цвета','бьют даже чётную',BLUE],
            ['нечёт ходов','последний ход первому',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Связка','Счёт, раскраска, чётность ходов — три линейки. Ими меряют «можно / нельзя» и «кто выиграет».')}
      </div>`;
    } else if(step===12){
      const C=counts(nn);
      const s=Math.min(18, Math.floor(154/nn));
      const ox=24, oy=40;
      let brd='';
      for(let r=0;r<nn;r++) for(let c=0;c<nn;c++){
        const dark=(r+c)%2===0;
        brd+=`<rect x="${ox+c*s}" y="${oy+r*s}" width="${s-1}" height="${s-1}" fill="${dark?'rgba(255,215,106,.35)':'rgba(127,209,255,.28)'}"/>`;
      }
      h=`<div class="wv-col">
        ${frame(
          brd+
          lab(120, 22, nn+'×'+nn+' = '+C.tot+(C.odd?' нечет':' чёт'), GOLD)+
          lab(120, 204, 'тёмных '+C.dark+' · светлых '+C.light, MUTED, 'middle', 11)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">n
          <input type="range" min="4" max="8" value="${nn}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].n=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${nn}</b>
        </label>
        ${note('Крути размер','Нечётное n: тёмных на 1 больше, домино нельзя. Чётное n: цвета равны, домино можно. 7 — как раз нельзя.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Раскрась шахматно',GOLD],
            ['2','Посчитай цвета и чётность',BLUE],
            ['3','Что забирает плитка или ход?',GREEN],
            ['4','Несостыковка → «нельзя» / победитель',MUTED]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Не перебирай замощения. Не играй партию до конца, если ходы считаются. Сначала линейка, потом вывод.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          board({lit:49, color:true})+
          lab(120, 22, '49 · 25 против 24 · первый', GOLD, 'middle', 12)
        )}
        ${note('В карман','7×7 нельзя домино. Цвета не равны. В игре на клетки первый берёт последний ход.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(board({lit:49, color:true})+lab(120, 22, 'домино на 7×7?', GOLD)+lab(120, 204, 'да / нет', MUTED))}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">можно?</div>
        ${note('Проверка','Нет. 49 нечётно, цвета 25 и 24. Переворот плитки не поможет.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_C[412]=visC412;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===412){ arr[i]=L412; f=true; break; } }
    if(!f) arr.push(L412);
  })();
})();
