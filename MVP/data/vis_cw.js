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
