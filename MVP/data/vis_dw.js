/* Волна D v2: уроки 413–426 (8 класс) в формате «объясни → реши + живой виджет».
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_D[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_D = window.WAVE_D || {};

/* ================= УРОК 413 · Рациональные дроби ================= */
(function(){
  const L413 = {
    id: 413, title: 'Рациональные дроби', ico: '🧮',
    src: 'Математика · 8 класс · Алгебра 8: дроби', subj: 'math',
    explain: [
      'Рациональная дробь — это отношение двух многочленов: (x + 1)/(x − 2). Числитель — сверху, знаменатель — снизу. Как обычная дробь, только вместо чисел стоят выражения с буквой x!',
      'Самое главное правило: НА НОЛЬ ДЕЛИТЬ НЕЛЬЗЯ! Значит, знаменатель не может быть нулём. У дроби (x + 1)/(x − 2) знаменатель x − 2: он равен нулю при x = 2. Пишут: ОДЗ: x ≠ 2.',
      'ОДЗ — область допустимых значений. Это все x, при которых дробь ИМЕЕТ СМЫСЛ. У дроби 3/(x − 5) знаменатель x − 5 = 0 при x = 5 → дробь не определена при x = 5.',
      'Сокращение дробей: можно сокращать общие множители числителя и знаменателя. Пример: (x² − 4)/(x − 2). Заметим: x² − 4 = (x − 2)(x + 2) — разность квадратов! Сокращаем (x − 2): получаем x + 2 (при x ≠ 2).',
      'Почему «при x ≠ 2»? Мы сократили множитель (x − 2), но при x = 2 исходная дробь была не определена (знаменатель ноль). После сокращения выражение x + 2 определено, но РАВЕНСТВО верно только при x ≠ 2!',
      'Найди значение (x² − 9)/(x − 3) при x = 5. Сначала сократим: x² − 9 = (x − 3)(x + 3) → сокращаем (x − 3) → x + 3. Теперь подставляем 5: 5 + 3 = 8.',
      'Сложение дробей: приводим к общему знаменателю, как с обычными дробями. 1/x + 1/(x+1): общий знаменатель x(x+1). Первая дробь: (x+1)/(x(x+1)), вторая: x/(x(x+1)). Складываем числители: (2x+1)/(x(x+1)).',
      'Запомни: сначала ОДЗ (знаменатель ≠ 0), потом сокращение по формулам (разность квадратов!), потом подстановка. Такой порядок спасает от ошибок!',
      'Теперь проверь себя: при каком x не определена дробь 3/(x − 5)? Вспомни: знаменатель не может быть нулём!'
    ],
    check: { q: 'При каком x не определена дробь 3/(x − 5)?', choices: ['x = 5', 'x = 0', 'x = 3', 'всегда определена'], ans: 0,
      exp: 'На ноль делить нельзя: x − 5 = 0 → x = 5.' },
    tasks: [
      { q: 'Найди значение (x² − 9)/(x − 3) при x = 5.', kind: 'unit', ans: 8, tol: 0,
        hints: ['(25 − 9) : (5 − 3).', '16 : 2 = 8.'], sol: '8' },
      { q: 'ОДЗ дроби (x + 1)/(x + 4): x ≠ …', kind: 'choice', choices: ['−4', '4', '−1', '0'], ans: 0, tol: 0,
        hints: ['Знаменатель не равен нулю.', 'x + 4 ≠ 0 → x ≠ −4.'], sol: '−4' }
    ]
  };
  const frac=(top,bot,size)=>`<div style="display:flex;flex-direction:column;align-items:center;margin:0 4px">
    <div style="font-size:${size||26}px;color:#ffd76a;font-family:Georgia,serif;padding:0 6px">${top}</div>
    <div style="border-top:2px solid #8fa08f;width:100%;margin-top:2px;padding-top:2px;font-size:${size||26}px;color:#ffd76a;font-family:Georgia,serif;text-align:center">${bot}</div>
  </div>`;
  function visD413(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Что такое рациональная дробь?</div>
        <div style="display:flex;align-items:center;gap:6px;justify-content:center">
          ${frac('x + 1','x − 2',30)}
          <span style="font-size:24px;color:#8fa08f">=</span>
          <span style="font-size:40px">🍕</span>
        </div>
        <div class="wv-sml">числитель сверху · знаменатель снизу · вместо чисел — выражения!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">На ноль делить нельзя!</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          ${frac('x + 1','x − 2',30)}
        </div>
        <div class="wv-sml">x − 2 = 0 при x = 2 → знаменатель ноль!</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:17px;color:#ffcfc2;font-weight:bold" class="wv-ans">ОДЗ: x ≠ 2</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">ОДЗ — область допустимых значений</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          ${frac('3','x − 5',30)}
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">x − 5 = 0 → x = 5</div>
          <div class="wv-pop2" style="color:#ff9a8a;font-weight:bold">дробь не определена при x = 5!</div>
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сокращение дробей</div>
        <div style="display:flex;align-items:center;gap:6px;justify-content:center">
          ${frac('x² − 4','x − 2',24)}
          <span style="font-size:24px;color:#8fa08f">=</span>
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:10px;padding:4px 10px;font-size:19px;color:#7fd1ff;font-family:Georgia,serif">x²−4=(x−2)(x+2)</div>
        </div>
        <div class="wv-ans" style="font-size:22px;color:#8fd1a8">сокращаем (x−2) → x + 2</div>
        <div class="wv-sml">разность квадратов — лучший друг сокращения!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему «при x ≠ 2»?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">при x = 2 исходная дробь не определена (знаменатель 0). Сокращённое x + 2 определено, но равенство верно только при <b style="color:#ffd76a">x ≠ 2</b>!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем значение</div>
        <div class="wv-sml">(x² − 9)/(x − 3) при x = 5</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:17px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">x² − 9 = (x − 3)(x + 3)</div>
          <div class="wv-pop2">сокращаем → x + 3</div>
          <div class="wv-pop3" style="font-size:24px;color:#ffd76a;font-weight:bold">5 + 3 = 8 ✔</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Сложение дробей</div>
        <div style="display:flex;align-items:center;gap:6px;justify-content:center;flex-wrap:wrap">
          ${frac('1','x',20)}<span style="color:#8fa08f">+</span>${frac('1','x + 1',20)}<span style="color:#8fa08f">=</span>${frac('2x + 1','x(x + 1)',20)}
        </div>
        <div class="wv-sml">общий знаменатель x(x+1) — как с обычными дробями!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Порядок действий</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['1️⃣','ОДЗ: знаменатель ≠ 0','#ff9a8a'],
            ['2️⃣','сокращай по формулам','#7fd1ff'],
            ['3️⃣','только потом подставляй x','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;justify-content:center">${frac('3','x − 5',26)}</div>
        <div class="wv-sml">при каком x дробь не определена?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">x = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[413]=visD413;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===413){ window.ARH_LESSONS[i]=L413; break; } } })();
})();
/* ================= УРОК 414 · Степень с целым показателем ================= */
(function(){
  const L414 = {
    id: 414, title: 'Степень с целым показателем', ico: '🔢',
    src: 'Математика · 8 класс · Алгебра 8: степени', subj: 'math',
    explain: [
      'Ты уже знаешь степени с натуральным показателем: 2³ = 2·2·2 = 8. Сегодня узнаешь, что значат степени с НУЛЕВЫМ и ОТРИЦАТЕЛЬНЫМ показателем: 2⁰, 2⁻³. Математики договорились об этом очень удобно!',
      'Отрицательная степень: a⁻ⁿ = 1/aⁿ. Проще говоря, минус в показателе «переворачивает» дробь. Пример: 2⁻³ = 1/2³ = 1/8. Двойка «ушла в знаменатель»!',
      'Проверим на примере: 3⁻¹ = 1/3. И 10⁻² = 1/10² = 1/100 = 0,01. Смотри: 10⁻² — это просто запись числа 0,01 через степень! Очень удобно для маленьких чисел.',
      'Нулевая степень: a⁰ = 1 при a ≠ 0. Любое ненулевое число в нулевой степени равно единице: 5⁰ = 1, (−7)⁰ = 1. А вот 0⁰ не определяют — это особый случай!',
      'Почему a⁰ = 1? Смотри на закономерность: 2³ = 8, 2² = 4, 2¹ = 2, 2⁰ = 1. Каждый шаг вниз — делим на 2! Значит, 2⁰ = 1. Логично, правда?',
      'Теперь свойства. При умножении степеней с ОДИНАКОВЫМ основанием показатели складываются: aᵐ · aⁿ = aᵐ⁺ⁿ. Пример: 2³ · 2² = 2⁵ = 32. Проверь: 8·4 = 32!',
      'При возведении степени в степень показатели перемножаются: (aᵐ)ⁿ = aᵐⁿ. Пример: (2²)³ = 2⁶ = 64. А при делении показатели вычитаются: aᵐ : aⁿ = aᵐ⁻ⁿ. 2⁵:2³ = 2² = 4.',
      'Соберём всё вместе: 2⁻³ · 2⁵ = 2² = 4 (показатели −3+5 = 2). Видишь, отрицательные показатели работают в тех же правилах! Минус — это просто «обратная дробь».',
      'Теперь проверь себя: чему равно 2⁻³? Вспомни: a⁻ⁿ = 1/aⁿ!'
    ],
    check: { q: 'Чему равно 2⁻³?', choices: ['1/8', '−8', '1/6', '8'], ans: 0,
      exp: 'a⁻ⁿ = 1/aⁿ → 2⁻³ = 1/8.' },
    tasks: [
      { q: 'Чему равно 5⁰?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Любое ненулевое число в нулевой степени — 1.', '5⁰ = 1.'], sol: '1' },
      { q: 'Чему равно 3⁻¹?', kind: 'choice', choices: ['1/3', '−3', '3', '1/9'], ans: 0, tol: 0,
        hints: ['a⁻¹ = 1/a.', '3⁻¹ = 1/3.'], sol: '1/3' }
    ]
  };
  const pow=(b,e,res,c)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c||'#3d5c49'};border-radius:12px;padding:7px 10px;min-width:64px"><div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">${b}<sup style="font-size:13px">${e}</sup></div><div style="font-size:12px;color:${c||'#8fa08f'}">= ${res}</div></div>`;
  function visD414(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Новые степени</div>
        <div class="wv-row" style="gap:8px">${pow('2','3','8','#8fd1a8')}${pow('2','0','?','#ffd76a')}${pow('2','−3','?','#7fd1ff')}</div>
        <div class="wv-sml">что значат нулевой и отрицательный показатели?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Отрицательная степень</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;font-size:22px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">a⁻ⁿ = 1/aⁿ</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:4px">${pow('2','−3','1/8','#8fd1a8')}</div>
        <div class="wv-sml">минус «переворачивает» дробь!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Примеры</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${pow('3','−1','1/3','#8fd1a8')}${pow('10','−2','0,01','#7fd1ff')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #7fd1ff;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">10⁻² = 1/100 = 0,01 — удобная запись маленьких чисел!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Нулевая степень</div>
        <div style="background:rgba(143,209,168,.12);border:2px solid #8fd1a8;border-radius:14px;padding:10px 14px;font-size:22px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">a⁰ = 1 (a ≠ 0)</div>
        <div class="wv-row" style="gap:8px;margin-top:4px">${pow('5','0','1','#8fd1a8')}${pow('−7','0','1','#7fd1ff')}</div>
        <div class="wv-sml">0⁰ не определяют — особый случай!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему a⁰ = 1?</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:200px;width:100%;font-size:20px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">2³ = 8</div>
          <div class="wv-pop2">2² = 4 <span style="font-size:12px;color:#8fa08f">(:2)</span></div>
          <div class="wv-pop2">2¹ = 2</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">2⁰ = 1 ← делим на 2!</div>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Умножение: aᵐ·aⁿ = aᵐ⁺ⁿ</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">2³ · 2² = 2⁵ = 32</div>
        <div class="wv-sml">показатели складываются: 3 + 2 = 5 · проверка: 8·4 = 32 ✔</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Степень в степени и деление</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['(aᵐ)ⁿ = aᵐⁿ','(2²)³ = 2⁶ = 64','#7fd1ff'],
            ['aᵐ : aⁿ = aᵐ⁻ⁿ','2⁵ : 2³ = 2² = 4','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]};font-family:Georgia,serif">${x[0]}</b><span style="font-size:12.5px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Всё вместе</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;font-size:22px;color:#e8dcc8;font-family:Georgia,serif">
          <span>2⁻³ · 2⁵ =</span><b style="color:#ffd76a">2² = 4</b>
        </div>
        <div class="wv-sml">показатели −3 + 5 = 2 — минус работает в тех же правилах!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${pow('2','−3','?','#ffd76a')}
        <div class="wv-sml">a⁻ⁿ = 1/aⁿ → 2⁻³ = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">1 / ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[414]=visD414;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===414){ window.ARH_LESSONS[i]=L414; break; } } })();
})();
/* ================= УРОК 415 · Квадратичная функция ================= */
(function(){
  const L415 = {
    id: 415, title: 'Квадратичная функция y = ax² + bx + c', ico: '📈',
    src: 'Математика · 8 класс · Алгебра 8: функции', subj: 'math',
    explain: [
      'Квадратичная функция — это y = ax² + bx + c, где a ≠ 0. Самая простая — y = x². Её график — знаменитая ПАРАБОЛА, похожая на чашу или горку!',
      'Направление ветвей решает коэффициент a. Если a > 0 — ветви вверх, парабола как чаша. Если a < 0 — ветви вниз, как горка. У y = x² коэффициент a = 1 > 0 → ветви вверх!',
      'У параболы есть вершина — самая нижняя (или верхняя) точка. Её координата x считается по формуле x₀ = −b/(2a). Для y = x²: b = 0 → x₀ = 0 — вершина в начале координат.',
      'Найдём вершину y = x² − 6x. Здесь a = 1, b = −6. Считаем: x₀ = −(−6)/(2·1) = 6/2 = 3. Вершина в точке x = 3. Подставим: y = 9 − 18 = −9. Вершина (3; −9).',
      'Зачем нужна вершина? Она делит параболу на две симметричные половинки — ось симметрии проходит через x₀. Парабола симметрична: точки слева и справа от x₀ на одинаковом расстоянии дают одинаковый y.',
      'Как построить график? 1) найди вершину (x₀; y₀); 2) отметь её; 3) возьми пару точек слева и справа (x₀±1, x₀±2); 4) соедини плавной линией — параболой!',
      'Нули функции — где парабола пересекает ось x, то есть y = 0: ax² + bx + c = 0. Это квадратное уравнение! Сколько корней — столько пересечений: 2, 1 или 0.',
      'Квадратичная функция в жизни: траектория мяча, прыжки, арки мостов, фонтан — всё это параболы! Брошенный мяч летит по параболе — красиво и математично.',
      'Теперь проверь себя: у параболы y = x² ветви направлены… Вспомни: a = 1 > 0!'
    ],
    check: { q: 'У параболы y = x² ветви направлены…', choices: ['вверх', 'вниз', 'влево', 'вправо'], ans: 0,
      exp: 'a = 1 > 0 → ветви вверх.' },
    tasks: [
      { q: 'Вершина y = x² − 6x: чему равен x₀ = −b/(2a)?', kind: 'unit', ans: 3, tol: 0,
        hints: ['b = −6, a = 1.', 'x₀ = −(−6)/(2·1) = 3.'], sol: '3' },
      { q: 'При каком a парабола y = ax² открыта вниз?', kind: 'choice', choices: ['a < 0', 'a > 0', 'a = 0', 'a = 1'], ans: 0, tol: 0,
        hints: ['Ветви вниз при отрицательном a.', 'a < 0.'], sol: 'a < 0' }
    ]
  };
  const par=(dir,vertexX)=>`<svg viewBox="0 0 240 200" style="width:210px;height:175px;background:#101f18;border-radius:12px">
    <line x1="10" y1="160" x2="230" y2="160" stroke="#cfe0cf" stroke-width="2"/>
    <line x1="120" y1="12" x2="120" y2="190" stroke="#cfe0cf" stroke-width="2"/>
    ${dir==='up'?`<path d="M30 100 Q120 ${vertexX===3?40:10} 210 100" fill="none" stroke="#ffd76a" stroke-width="3.5"/>`:
      `<path d="M30 60 Q120 ${vertexX===3?120:150} 210 60" fill="none" stroke="#e86a5a" stroke-width="3.5"/>`}
    <circle cx="120" cy="${vertexX===3?100:160}" r="5" fill="#8fd1a8"/>
  </svg>`;
  function visD415(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Квадратичная функция</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">y = ax² + bx + c</div>
        <div style="font-size:44px" class="wv-swing">⛲</div>
        <div class="wv-sml">график — парабола, как фонтан или чаша!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Ветви: a решает!</div>
        <div class="wv-row" style="gap:12px;align-items:flex-end">
          <div style="text-align:center"><svg viewBox="0 0 120 100" style="width:90px;height:75px"><path d="M15 80 Q60 5 105 80" fill="none" stroke="#8fd1a8" stroke-width="3.5"/></svg><div style="font-size:12px;color:#8fd1a8">a > 0 — вверх</div></div>
          <div style="text-align:center"><svg viewBox="0 0 120 100" style="width:90px;height:75px"><path d="M15 20 Q60 95 105 20" fill="none" stroke="#e86a5a" stroke-width="3.5"/></svg><div style="font-size:12px;color:#ff9a8a">a < 0 — вниз</div></div>
        </div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Вершина</div>
        ${par('up',0)}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:17px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">x₀ = −b/(2a)</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Вершина y = x² − 6x</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-size:18px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">a = 1, b = −6</div>
          <div class="wv-pop2">x₀ = −(−6)/(2·1) = 6/2 = <b style="color:#ffd76a">3</b></div>
          <div class="wv-pop3">y = 9 − 18 = <b style="color:#8fd1a8">−9</b></div>
        </div>
        <div class="wv-sml">вершина (3; −9)</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ось симметрии</div>
        ${par('up',3)}
        <div class="wv-sml">парабола симметрична: слева и справа от x₀ — одинаковый y!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Как построить параболу</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['1️⃣','найди вершину (x₀; y₀)','#ffd76a'],
            ['2️⃣','отметь точки x₀±1, x₀±2','#7fd1ff'],
            ['3️⃣','соедини плавной линией','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Нули функции</div>
        <div style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif">y = 0 → ax² + bx + c = 0</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${[['2 корня','2 пересечения','#8fd1a8'],['1 корень','касание','#ffd76a'],['0 корней','нет встречи','#ff9a8a']].map(x=>`<span class="wv-chip" style="border-color:${x[2]};color:${x[2]}">${x[0]} — ${x[1]}</span>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Параболы в жизни</div>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          ${['⚽','🏀','🌉','⛲'].map((e,i)=>`<span style="font-size:40px" class="wv-pop" style="animation-delay:${i*0.1}s">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">мяч, арки мостов, фонтаны — всё летит по параболе!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">y = x²</div>
        <div class="wv-sml">a = 1 — ветви куда?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">вверх / вниз</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[415]=visD415;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===415){ window.ARH_LESSONS[i]=L415; break; } } })();
})();
/* ================= УРОК 416 · Квадратные неравенства: метод интервалов ================= */
(function(){
  const L416 = {
    id: 416, title: 'Квадратные неравенства: метод интервалов', ico: '📊',
    src: 'Математика · 8 класс · Алгебра 8: неравенства', subj: 'math',
    explain: [
      'Квадратное неравенство — это неравенство с x², например x² − 4 > 0. Решить его — найти все x, при которых оно верно. Мощный способ — метод интервалов!',
      'Шаг 1: решаем уравнение x² − 4 = 0. x² = 4 → x = 2 или x = −2. Эти корни разбивают числовую ось на три интервала: (−∞; −2), (−2; 2), (2; +∞).',
      'Шаг 2: берём пробную точку из каждого интервала и смотрим знак выражения. Из левого возьмём x = −3: (−3)² − 4 = 9 − 4 = 5 > 0 — плюс! Из среднего x = 0: 0 − 4 = −4 < 0 — минус! Из правого x = 3: 9 − 4 = 5 > 0 — плюс!',
      'Шаг 3: нам нужно x² − 4 > 0, то есть знак «+». Плюсы на крайних интервалах → ответ: x < −2 или x > 2. Готово!',
      'Почему знак не меняется внутри интервала? Выражение x² − 4 непрерывно и меняет знак только в корнях. Внутри интервала между корнями знак постоянный — достаточно проверить одну точку!',
      'Что если неравенство нестрогое, x² − 4 ≥ 0? Тогда корни ВКЛЮЧАЕМ: x ≤ −2 или x ≥ 2. Кружки на оси закрашиваем!',
      'А если x² − 4 < 0? Нужен знак «−», он в среднем интервале: −2 < x < 2. Красиво: парабола y = x² − 4 ниже оси x ровно между корнями!',
      'Связь с параболой: неравенство x² − 4 > 0 — это «где парабола выше оси x». Ветви вверх → снаружи корней плюс, внутри минус. Запомни эту картинку — и метод интервалов станет наглядным!',
      'Теперь проверь себя: реши x² − 4 > 0. Вспомни: корни ±2, плюсы снаружи!'
    ],
    check: { q: 'Реши: x² − 4 > 0', choices: ['x < −2 или x > 2', '−2 < x < 2', 'x > 2', 'x < 2'], ans: 0,
      exp: 'Произведение положительно вне отрезка [−2; 2].' },
    tasks: [
      { q: 'Какие корни у уравнения x² − 9 = 0? Введи положительный корень.', kind: 'unit', ans: 3, tol: 0,
        hints: ['x² = 9.', 'x = ±3 → положительный 3.'], sol: '3' },
      { q: 'Методом интервалов обычно решают…', kind: 'choice', choices: ['неравенства', 'уравнения с модулем', 'системы сложением', 'дроби'], ans: 0, tol: 0,
        hints: ['Расстановка знаков по интервалам.', 'Квадратные и дробные неравенства.'], sol: 'неравенства' }
    ]
  };
  const axisIntervals=()=>`<svg viewBox="0 0 260 80" style="width:230px;height:71px;background:#101f18;border-radius:10px">
    <line x1="10" y1="42" x2="250" y2="42" stroke="#cfe0cf" stroke-width="2.5"/>
    ${[-3,-2,-1,0,1,2,3].map(n=>`<text x="${130+n*26}" y="64" text-anchor="middle" font-size="12" fill="#8fa08f">${n}</text>`).join('')}
    <circle cx="${130-2*26}" cy="42" r="7" fill="none" stroke="#ffd76a" stroke-width="3"/>
    <circle cx="${130+2*26}" cy="42" r="7" fill="none" stroke="#ffd76a" stroke-width="3"/>
    <line x1="10" y1="42" x2="${130-2*26-8}" y2="42" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
    <line x1="${130+2*26+8}" y1="42" x2="250" y2="42" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
    <line x1="${130-2*26+8}" y1="42" x2="${130+2*26-8}" y2="42" stroke="#ff9a8a" stroke-width="5" stroke-linecap="round"/>
  </svg>`;
  function visD416(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:15px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Квадратное неравенство</div>
        <div style="font-size:28px;color:#ffd76a;font-family:Georgia,serif">x² − 4 > 0</div>
        <div class="wv-sml">найти все x, при которых верно — метод интервалов!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 1: корни уравнения</div>
        <div style="font-size:24px;color:#e8dcc8;font-family:Georgia,serif">x² − 4 = 0</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-top:4px">
          ${chip('x = 2','#8fd1a8')}${chip('x = −2','#7fd1ff')}
        </div>
        <div class="wv-sml">корни разбивают ось на три интервала!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 2: пробные точки</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['x = −3','(−3)² − 4 = 5 > 0 → +','#8fd1a8'],
            ['x = 0','0 − 4 = −4 < 0 → −','#ff9a8a'],
            ['x = 3','9 − 4 = 5 > 0 → +','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:13.5px;color:#e8dcc8"><b>${x[0]}</b><span style="font-size:12px;color:${x[2]}">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 3: ответ</div>
        ${axisIntervals()}
        <div class="wv-sml">зелёный — плюс (нужен нам) · красный — минус</div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:18px;color:#8fd1a8;font-weight:bold" class="wv-ans">x < −2 или x > 2</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему знак не меняется?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">выражение меняет знак <b style="color:#ffd76a">только в корнях</b>. Внутри интервала знак постоянный → проверь одну точку!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Нестрогое ≥</div>
        <div class="wv-sml">x² − 4 ≥ 0 → корни включаем!</div>
        <div style="font-size:20px;color:#8fd1a8;font-family:Georgia,serif">x ≤ −2 или x ≥ 2</div>
        <div class="wv-sml">кружки на оси закрашиваем</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">А если < 0?</div>
        <div class="wv-sml">x² − 4 < 0 → нужен минус — он в середине!</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">−2 < x < 2</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Связь с параболой</div>
        <div style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif">x² − 4 > 0 ⟺ парабола выше оси x</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('ветви вверх','#8fd1a8')}${chip('снаружи — плюс','#8fd1a8')}${chip('внутри — минус','#ff9a8a')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${axisIntervals()}
        <div class="wv-sml">x² − 4 > 0 → ответ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">x < −2 или x > ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[416]=visD416;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===416){ window.ARH_LESSONS[i]=L416; break; } } })();
})();
/* ================= УРОК 417 · Четырёхугольники ================= */
(function(){
  const L417 = {
    id: 417, title: 'Четырёхугольники', ico: '▰',
    src: 'Математика · 8 класс · Геометрия 8: четырёхугольники', subj: 'math',
    explain: [
      'Четырёхугольник — фигура с четырьмя сторонами и четырьмя углами. Самые известные: квадрат, прямоугольник, ромб, параллелограмм, трапеция. У каждого свои особые свойства!',
      'Сумма углов любого четырёхугольника равна 360°. Почему? Разрежь его диагональю на два треугольника — у каждого сумма 180°, вместе 360°!',
      'Параллелограмм — четырёхугольник, у которого противоположные стороны параллельны. Свойства: противоположные стороны РАВНЫ, противоположные углы равны, диагонали делятся пополам.',
      'Прямоугольник — параллелограмм с прямыми углами. У него, кроме свойств параллелограмма, диагонали РАВНЫ. А оси симметрии — две, через середины сторон.',
      'Ромб — параллелограмм с равными сторонами. У ромба диагонали ПЕРПЕНДИКУЛЯРНЫ и делят углы пополам. Оси симметрии — его диагонали.',
      'Квадрат — одновременно прямоугольник и ромб: все стороны равны и все углы прямые. Он вобрал свойства всех! Диагонали равны, перпендикулярны и делят углы пополам.',
      'Трапеция — четырёхугольник, у которого только одна пара противоположных сторон параллельна. Эти стороны — основания. Равнобедренная трапеция имеет равные боковые стороны и углы при основании.',
      'Как не запутаться? Параллелограмм — «родитель»: прямоугольник и ромб — его «дети», а квадрат — «внук», сочетающий всё. Схема-дерево поможет запомнить!',
      'Теперь проверь себя: у какой фигуры все стороны равны и все углы прямые? Это квадрат — наследник прямоугольника и ромба!'
    ],
    check: { q: 'У какой фигуры все стороны равны и все углы прямые?', choices: ['квадрат', 'прямоугольник', 'ромб', 'параллелограмм'], ans: 0,
      exp: 'Квадрат сочетает свойства прямоугольника и ромба.' },
    tasks: [
      { q: 'Чему равна сумма углов четырёхугольника?', kind: 'unit', ans: 360, tol: 0,
        hints: ['(4 − 2) · 180°.', '360°.'], sol: '360°' },
      { q: 'У параллелограмма противоположные стороны…', kind: 'choice', choices: ['равны', 'перпендикулярны', 'всегда разные', 'являются диагоналями'], ans: 0, tol: 0,
        hints: ['Свойство параллелограмма.', 'Противоположные стороны равны.'], sol: 'равны' }
    ]
  };
  const shape=(kind)=>`<svg viewBox="0 0 140 110" style="width:${kind==='tr'?150:130}px;height:110px">
    ${kind==='par'?`<polygon points="20,30 120,30 100,90 10,90" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>`:
    kind==='rec'?`<rect x="15" y="25" width="110" height="65" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="3"/>`:
    kind==='rom'?`<polygon points="70,12 120,55 70,98 20,55" fill="rgba(255,138,192,.12)" stroke="#ff8ac0" stroke-width="3"/>`:
    kind==='sq'?`<rect x="25" y="20" width="80" height="80" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="3"/>`:
    `<polygon points="15,85 50,20 125,20 95,85" fill="rgba(232,160,90,.12)" stroke="#e8a05a" stroke-width="3"/>`}
  </svg>`;
  function visD417(el){
    const step=LV.step||0;
    const card=(name,desc,color,svg)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:14px;padding:8px 10px;min-width:130px">${svg}<b style="font-size:14px;color:${color}">${name}</b><div style="font-size:10.5px;color:#8fa08f;margin-top:2px">${desc}</div></div>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Четырёхугольники</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${card('квадрат','всё равное','#ffd76a',shape('sq'))}
          ${card('прямоугольник','углы 90°','#8fd1a8',shape('rec'))}
        </div>
        <div class="wv-sml">четыре стороны, четыре угла — и куча свойств!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма углов 360°</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          ${shape('par')}<span style="font-size:22px;color:#8fa08f">= 2 Δ</span>
        </div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">2 · 180° = 360°</div>
        <div class="wv-sml">диагональ делит на два треугольника!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Параллелограмм</div>
        ${shape('par')}
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:14px;color:#e8dcc8">
          <div class="wv-pop">✔ противоположные стороны равны и параллельны</div>
          <div class="wv-pop2">✔ противоположные углы равны</div>
          <div class="wv-pop2">✔ диагонали делятся пополам</div>
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольник</div>
        ${shape('rec')}
        <div class="wv-sml">параллелограмм с прямыми углами</div>
        <div style="background:rgba(143,209,168,.12);border:1px solid #4c8a5a;border-radius:9px;padding:6px 12px;max-width:330px;font-size:14px;color:#8fd1a8">особое: диагонали РАВНЫ!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ромб</div>
        ${shape('rom')}
        <div class="wv-sml">параллелограмм с равными сторонами</div>
        <div style="background:rgba(255,138,192,.1);border:1px solid rgba(255,138,192,.4);border-radius:9px;padding:6px 12px;max-width:330px;font-size:14px;color:#ff8ac0">особое: диагонали ПЕРПЕНДИКУЛЯРНЫ и делят углы!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат — всё сразу!</div>
        ${shape('sq')}
        <div class="wv-row" style="gap:5px;flex-wrap:wrap">
          ${[['стороны равны','#ffd76a'],['углы 90°','#8fd1a8'],['диагонали равны','#7fd1ff'],['диагонали ⊥','#ff8ac0']].map(x=>`<span class="wv-chip" style="border-color:${x[1]};color:${x[1]}">${x[0]}</span>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Трапеция</div>
        ${shape('tr')}
        <div class="wv-sml">одна пара параллельных сторон — основания</div>
        <div class="wv-sml">равнобедренная: боковые стороны равны, углы при основании равны</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Дерево семейства</div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;font-size:14px;color:#e8dcc8">
          <div class="wv-chip" style="border-color:#7fd1ff;color:#7fd1ff">параллелограмм</div>
          <div style="display:flex;gap:20px;margin-top:4px">
            <div class="wv-chip" style="border-color:#8fd1a8;color:#8fd1a8">прямоугольник</div>
            <div class="wv-chip" style="border-color:#ff8ac0;color:#ff8ac0">ромб</div>
          </div>
          <div class="wv-chip" style="border-color:#ffd76a;color:#ffd76a;margin-top:4px">квадрат = их сын!</div>
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${shape('sq')}
        <div class="wv-sml">все стороны равны И все углы прямые — кто это?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? </div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[417]=visD417;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===417){ window.ARH_LESSONS[i]=L417; break; } } })();
})();
/* ================= УРОК 418 · Подобие треугольников ================= */
(function(){
  const L418 = {
    id: 418, title: 'Подобие треугольников', ico: '🔺',
    src: 'Математика · 8 класс · Геометрия 8: подобие', subj: 'math',
    explain: [
      'Два треугольника подобны, если они «одинаковые по форме, но разные по размеру» — как фотография и её увеличение. У подобных треугольников углы равны, а стороны пропорциональны.',
      'Коэффициент подобия k — во сколько раз стороны одного треугольника больше сторон другого. Если k = 2, каждая сторона второго в 2 раза больше соответствующей стороны первого.',
      'Признаки подобия как у равенства, только мягче: 1) два угла равны; 2) две стороны пропорциональны и угол между ними равен; 3) три стороны пропорциональны. Для подобия достаточно двух равных углов!',
      'Зачем это нужно? Подобие позволяет найти НЕИЗВЕСТНУЮ сторону: если треугольники подобны с k = 3, а сторона первого равна 4, то сторона второго = 4·3 = 12. Пропорция решает!',
      'Средняя линия треугольника — отрезок, соединяющий середины двух сторон. Она ПАРАЛЛЕЛЬНА третьей стороне и равна её половине. Средняя линия отсекает подобный треугольник с k = 1/2!',
      'Площади подобных треугольников относятся как k². Если k = 2, площадь второго в 4 раза больше! Почему? Площадь = (основание·высоту)/2, а обе величины выросли в k раз: k·k = k².',
      'Проверим: k = 2 → стороны ×2 → площадь ×4. k = 3 → площадь ×9. Запомни: площади растут КВАДРАТИЧНО от коэффициента!',
      'Подобие в жизни: карта и местность, модель и настоящий корабль, тень человека и тень дерева. Измерив тень, находим высоту дерева — через подобие треугольников!',
      'Теперь проверь себя: треугольники подобны с k = 2. Во сколько раз площадь второго больше? Вспомни: площади относятся как k²!'
    ],
    check: { q: 'Треугольники подобны с коэффициентом 2. Во сколько раз площадь второго больше?', choices: ['в 4 раза', 'в 2 раза', 'в 8 раз', 'в √2 раз'], ans: 0,
      exp: 'Площади относятся как k² = 4.' },
    tasks: [
      { q: 'Коэффициент подобия 3. Во сколько раз стороны одного больше другого?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Стороны пропорциональны k.', 'В 3 раза.'], sol: '3' },
      { q: 'Средняя линия треугольника соединяет…', kind: 'choice', choices: ['середины двух сторон', 'вершину с серединой стороны', 'две вершины', 'центр с вершиной'], ans: 0, tol: 0,
        hints: ['Средняя линия.', 'Середины двух сторон; она параллельна третьей стороне.'], sol: 'середины двух сторон' }
    ]
  };
  const triSmall=()=>`<svg viewBox="0 0 140 120" style="width:120px;height:103px"><polygon points="70,10 15,110 125,110" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/></svg>`;
  const triBig=()=>`<svg viewBox="0 0 190 170" style="width:170px;height:152px"><polygon points="95,10 10,160 180,160" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="3"/></svg>`;
  function visD418(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Подобные треугольники</div>
        <div style="display:flex;align-items:center;gap:10px;justify-content:center">
          ${triSmall()}<span style="font-size:22px;color:#8fa08f">≈</span>${triBig()}
        </div>
        <div class="wv-sml">одинаковая форма, разный размер · углы равны, стороны пропорциональны</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Коэффициент подобия k</div>
        <div style="display:flex;align-items:center;gap:10px;justify-content:center">
          ${triSmall()}<span style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">×2</span>${triBig()}
        </div>
        <div class="wv-sml">k = 2: каждая сторона второго в 2 раза больше!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Признаки подобия</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['1️⃣','два угла равны','#8fd1a8'],
            ['2️⃣','2 стороны пропорциональны + угол между ними','#7fd1ff'],
            ['3️⃣','3 стороны пропорциональны','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:13px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
        <div class="wv-sml">для подобия достаточно ДВУХ равных углов!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Находим сторону</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-size:17px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">k = 3, сторона первого = 4</div>
          <div class="wv-pop2">сторона второго = 4 · 3 = <b style="color:#ffd76a">12</b></div>
        </div>
        <div class="wv-sml">пропорция решает!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Средняя линия</div>
        <svg viewBox="0 0 180 140" style="width:170px;height:132px">
          <polygon points="90,12 20,128 160,128" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="2.5"/>
          <line x1="55" y1="70" x2="125" y2="70" stroke="#ffd76a" stroke-width="4"/>
          <circle cx="55" cy="70" r="5" fill="#ff9a8a"/><circle cx="125" cy="70" r="5" fill="#ff9a8a"/>
          <text x="62" y="64" font-size="11" fill="#ff9a8a">середины</text>
        </svg>
        <div class="wv-sml">средняя линия ∥ третьей стороне и = её половине!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Площади: как k²!</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;font-size:19px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">площади относятся как k²</div>
        <div class="wv-sml">площадь = (основание·высота)/2 — оба выросли в k раз!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${[['k = 2','площадь ×4','#8fd1a8'],['k = 3','площадь ×9','#7fd1ff'],['k = 5','площадь ×25','#ffd76a']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:7px 12px"><b style="font-size:17px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">площади растут квадратично!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Подобие в жизни</div>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          ${['🗺️','🚢','🌳'].map((e,i)=>`<span style="font-size:42px" class="wv-pop" style="animation-delay:${i*0.1}s">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">карта, модель корабля, тень дерева — всюду подобие!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${triSmall()}
        <div class="wv-sml">k = 2 — площадь второго во сколько раз больше?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">в ? раз (k²)</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[418]=visD418;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===418){ window.ARH_LESSONS[i]=L418; break; } } })();
})();
/* ================= УРОК 419 · Окружность: касательная и углы ================= */
(function(){
  const L419 = {
    id: 419, title: 'Окружность: касательная и углы', ico: '⭕',
    src: 'Математика · 8 класс · Геометрия 8: окружность', subj: 'math',
    explain: [
      'Касательная — прямая, которая касается окружности ровно в одной точке. Как колесо касается дороги! У касательной есть удивительное свойство с радиусом.',
      'Главное свойство: радиус, проведённый в точку касания, ПЕРПЕНДИКУЛЯРЕН касательной. Они образуют прямой угол 90°. Это как спица колеса, перпендикулярная дороге!',
      'Из одной точки к окружности можно провести две касательные. Их отрезки от точки до точек касания РАВНЫ! Это свойство часто используется в задачах.',
      'Теперь про углы. Вписанный угол — угол с вершиной НА окружности, стороны которого пересекают окружность. Он «опирается» на дугу между своими сторонами.',
      'Теорема о вписанном угле: вписанный угол равен ПОЛОВИНЕ дуги, на которую он опирается. Если дуга 100°, вписанный угол = 50°. Вдвое меньше!',
      'А центральный угол (вершина в центре окружности) равен самой дуге. Значит, вписанный угол — половина центрального, опирающегося на ту же дугу. Это связывает оба угла!',
      'Следствие: вписанный угол, опирающийся на ДИАМЕТР (дуга 180°), равен 90° — он прямой! Это помогает доказывать прямоугольные треугольники в окружности.',
      'Запомни связку: дуга = центральный угол · вписанный = половина дуги = половина центрального. Вписанный на диаметре — всегда 90°!',
      'Теперь проверь себя: касательная и радиус в точке касания… Вспомни про прямой угол!'
    ],
    check: { q: 'Касательная и радиус в точке касания…', choices: ['перпендикулярны', 'параллельны', 'равны', 'образуют угол 45°'], ans: 0,
      exp: 'Радиус ⊥ касательной в точке касания.' },
    tasks: [
      { q: 'Вписанный угол опирается на дугу 100°. Чему равен угол?', kind: 'unit', ans: 50, tol: 0,
        hints: ['Вписанный — половина дуги.', '100 : 2 = 50°.'], sol: '50°' },
      { q: 'Из одной точки к окружности проведены две касательные. Их отрезки…', kind: 'choice', choices: ['равны', 'разные', 'перпендикулярны', 'в сумме равны диаметру'], ans: 0, tol: 0,
        hints: ['Свойство касательных.', 'Отрезки касательных из одной точки равны.'], sol: 'равны' }
    ]
  };
  const circle=(mode)=>`<svg viewBox="0 0 220 200" style="width:190px;height:173px;background:#101f18;border-radius:12px">
    <circle cx="110" cy="100" r="70" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="3"/>
    ${mode==='tan'?`<line x1="20" y1="170" x2="210" y2="60" stroke="#ffd76a" stroke-width="4"/>
      <line x1="110" y1="100" x2="150" y2="83" stroke="#8fd1a8" stroke-width="3"/>
      <rect x="138" y="78" width="14" height="14" fill="none" stroke="#8fd1a8" stroke-width="2"/>`:
    mode==='ins'?`<path d="M110 100 L45 60 A70 70 0 0 1 165 55 Z" fill="rgba(255,215,106,.15)"/>
      <text x="70" y="52" font-size="13" fill="#ffd76a">α</text>`:
    mode==='cent'?`<path d="M110 100 L45 60 A70 70 0 0 1 165 55 Z" fill="rgba(255,138,192,.1)"/>
      <line x1="110" y1="100" x2="45" y2="60" stroke="#ffd76a" stroke-width="3"/>
      <text x="92" y="90" font-size="13" fill="#ffd76a">β</text>`:''}
  </svg>`;
  function visD419(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Касательная</div>
        <div style="font-size:44px" class="wv-swing">🛞</div>
        <div class="wv-sml">прямая касается окружности ровно в одной точке — как колесо дороги!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Радиус ⊥ касательной</div>
        ${circle('tan')}
        <div style="background:rgba(143,209,168,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:16px;color:#8fd1a8;font-weight:bold" class="wv-ans">прямой угол 90°!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Две касательные из точки</div>
        <svg viewBox="0 0 220 200" style="width:190px;height:173px;background:#101f18;border-radius:12px">
          <circle cx="130" cy="110" r="60" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="3"/>
          <line x1="40" y1="180" x2="150" y2="82" stroke="#ffd76a" stroke-width="3.5"/>
          <line x1="40" y1="180" x2="190" y2="120" stroke="#8fd1a8" stroke-width="3.5"/>
          <text x="20" y="195" font-size="13" fill="#ffd76a">A</text>
        </svg>
        <div class="wv-sml">отрезки касательных из одной точки РАВНЫ!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Вписанный угол</div>
        ${circle('ins')}
        <div class="wv-sml">вершина НА окружности, стороны пересекают её</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема о вписанном угле</div>
        ${circle('ins')}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">угол = половина дуги!</div>
        <div class="wv-sml">дуга 100° → угол 50°</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Центральный угол</div>
        ${circle('cent')}
        <div class="wv-sml">центральный = дуге · вписанный = половина центрального</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Угол на диаметре = 90°</div>
        <svg viewBox="0 0 220 200" style="width:190px;height:173px;background:#101f18;border-radius:12px">
          <circle cx="110" cy="100" r="70" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="3"/>
          <line x1="40" y1="100" x2="180" y2="100" stroke="#8fd1a8" stroke-width="3"/>
          <polygon points="110,100 40,100 158,46" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2"/>
          <rect x="96" y="86" width="12" height="12" fill="none" stroke="#ffd76a" stroke-width="2"/>
        </svg>
        <div class="wv-sml">дуга 180° → вписанный угол 90° — всегда прямой!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('дуга = центральный','#ff8ac0')}${chip('вписанный = дуга/2','#ffd76a')}${chip('на диаметре — 90°','#8fd1a8')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${circle('tan')}
        <div class="wv-sml">касательная и радиус в точке касания — что?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:15px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">⊥ или ∥?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[419]=visD419;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===419){ window.ARH_LESSONS[i]=L419; break; } } })();
})();
/* ================= УРОК 420 · Векторы: начало ================= */
(function(){
  const L420 = {
    id: 420, title: 'Векторы: начало', ico: '➡️',
    src: 'Математика · 8 класс · Геометрия 8: векторы', subj: 'math',
    explain: [
      'Вектор — это отрезок со стрелкой: у него есть НАПРАВЛЕНИЕ и ДЛИНА. Вектор из точки A в точку B обозначают AB⃗. Вектор показывает не только «сколько», но и «куда»!',
      'У вектора есть начало (A) и конец (B). Длина вектора (её называют модулем) — это расстояние между A и B, записывают |AB⃗|. Как у отрезка, только со стрелкой!',
      'Зачем векторы? Они описывают движение: скорость ветра, силу, перемещение. «5 км на север» — это вектор: и величина (5 км), и направление (север)!',
      'Векторы можно СКЛАДЫВАТЬ. Правило треугольника: приставь начало второго вектора к концу первого — сумма идёт от начала первого к концу второго. Как шаги по дороге!',
      'Правило параллелограмма — другой способ: приложи векторы к одной точке и дострой параллелограмм — его диагональ и есть сумма. Оба правила дают один результат!',
      'Противоположный вектор −a — такой же по длине, но направлен наоборот. Сумма a + (−a) = 0 — нулевой вектор: вернулись в начало!',
      'Векторы бывают коллинеарными (лежат на параллельных прямых) и равными (одинаковая длина И одинаковое направление). Равные векторы можно переносить параллельно!',
      'Координаты вектора: если вектор идёт из (0;0) в (x; y), его записывают {x; y}. Длина по теореме Пифагора: |a| = √(x² + y²). Например, {3; 4} имеет длину 5.',
      'Теперь проверь себя: как обозначают вектор из точки A в точку B? Вспомни — AB со стрелкой!'
    ],
    check: { q: 'Как обозначают вектор из точки A в точку B?', choices: ['AB⃗', '|AB|', 'A + B', 'AB²'], ans: 0,
      exp: 'Вектор с началом A и концом B — AB⃗.' },
    tasks: [
      { q: 'Чему равна сумма вектора a и противоположного ему вектора −a?', kind: 'unit', ans: 0, tol: 0,
        hints: ['Они гасят друг друга.', 'Нулевой вектор: 0.'], sol: '0' },
      { q: 'Длина вектора — это…', kind: 'choice', choices: ['расстояние между его концами', 'его направление', 'координата x', 'удвоенная длина отрезка'], ans: 0, tol: 0,
        hints: ['Модуль вектора.', 'Длина вектора = расстояние между концами.'], sol: 'расстояние между концами' }
    ]
  };
  function visD420(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Что такое вектор?</div>
        <svg viewBox="0 0 220 100" style="width:200px;height:91px;background:#101f18;border-radius:12px">
          <line x1="30" y1="60" x2="180" y2="40" stroke="#ffd76a" stroke-width="4"/>
          <polygon points="180,40 168,38 174,50" fill="#ffd76a"/>
          <circle cx="30" cy="60" r="6" fill="#8fd1a8"/><text x="18" y="80" font-size="13" fill="#8fd1a8">A</text>
          <text x="176" y="32" font-size="13" fill="#ffd76a">B</text>
        </svg>
        <div class="wv-sml">направление + длина · «сколько» и «куда»!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Начало, конец, длина</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('A — начало','#8fd1a8')}${chip('B — конец','#ffd76a')}${chip('|AB⃗| — длина (модуль)','#7fd1ff')}
        </div>
        <div class="wv-sml">длина = расстояние между A и B</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Векторы в жизни</div>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          ${['💨','💪','🚶'].map((e,i)=>`<span style="font-size:40px" class="wv-pop" style="animation-delay:${i*0.1}s">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">ветер, сила, перемещение — «5 км на север» это вектор!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сложение: правило треугольника</div>
        <svg viewBox="0 0 220 130" style="width:200px;height:118px;background:#101f18;border-radius:12px">
          <line x1="30" y1="100" x2="110" y2="60" stroke="#8fd1a8" stroke-width="4"/>
          <polygon points="110,60 98,58 106,70" fill="#8fd1a8"/>
          <line x1="110" y1="60" x2="190" y2="30" stroke="#ff8ac0" stroke-width="4"/>
          <polygon points="190,30 178,28 186,40" fill="#ff8ac0"/>
          <line x1="30" y1="100" x2="190" y2="30" stroke="#ffd76a" stroke-width="4" stroke-dasharray="6 4"/>
        </svg>
        <div class="wv-sml">приставь конец к началу · сумма = из начала в конец!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Правило параллелограмма</div>
        <svg viewBox="0 0 220 140" style="width:200px;height:127px;background:#101f18;border-radius:12px">
          <polygon points="30,100 110,60 190,100 110,140" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line x1="30" y1="100" x2="110" y2="60" stroke="#8fd1a8" stroke-width="4"/><polygon points="110,60 98,58 106,70" fill="#8fd1a8"/>
          <line x1="30" y1="100" x2="110" y2="140" stroke="#ff8ac0" stroke-width="4"/><polygon points="110,140 108,128 120,136" fill="#ff8ac0"/>
          <line x1="30" y1="100" x2="190" y2="100" stroke="#ffd76a" stroke-width="4"/><polygon points="190,100 178,96 178,104" fill="#ffd76a"/>
        </svg>
        <div class="wv-sml">диагональ параллелограмма = сумма!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Противоположный вектор</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          <svg viewBox="0 0 90 40" style="width:80px;height:36px"><line x1="10" y1="20" x2="80" y2="20" stroke="#8fd1a8" stroke-width="3.5"/><polygon points="80,20 71,16 71,24" fill="#8fd1a8"/></svg>
          <svg viewBox="0 0 90 40" style="width:80px;height:36px"><line x1="80" y1="20" x2="10" y2="20" stroke="#ff8ac0" stroke-width="3.5"/><polygon points="10,20 19,16 19,24" fill="#ff8ac0"/></svg>
        </div>
        <div class="wv-sml">a + (−a) = 0 — нулевой вектор, вернулись!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Коллинеарные и равные</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['коллинеарные','лежат на параллельных прямых','#7fd1ff'],
            ['равные','одинаковая длина И направление','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Координаты и длина</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">вектор {3; 4}</div>
          <div class="wv-pop2">длина = √(3² + 4²) = <b style="color:#ffd76a">5</b></div>
        </div>
        <div class="wv-sml">теорема Пифагора — лучший друг длины вектора!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <svg viewBox="0 0 220 100" style="width:180px;height:82px;background:#101f18;border-radius:12px">
          <line x1="30" y1="60" x2="180" y2="40" stroke="#ffd76a" stroke-width="4"/>
          <polygon points="180,40 168,38 174,50" fill="#ffd76a"/>
          <circle cx="30" cy="60" r="6" fill="#8fd1a8"/><text x="18" y="80" font-size="13" fill="#8fd1a8">A</text>
          <text x="176" y="32" font-size="13" fill="#ffd76a">B</text>
        </svg>
        <div class="wv-sml">как обозначить вектор из A в B?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? ⃗</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[420]=visD420;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===420){ window.ARH_LESSONS[i]=L420; break; } } })();
})();
/* ================= УРОК 421 · Уравнения в целых числах ================= */
(function(){
  const L421 = {
    id: 421, title: 'Уравнения в целых числах', ico: '🔢',
    src: 'Математика · 8 класс · Олимп-8: уравнения в целых', subj: 'math',
    explain: [
      'Уравнение в целых числах — это уравнение, где x и y должны быть ЦЕЛЫМИ числами (…, −2, −1, 0, 1, 2, …). Пример: xy = 6. Сколько целых решений? Перебор маленький — найдём все!',
      'Разложим 6 на множители: 6 = 1·6 = 2·3. Положительные пары (x; y): (1;6), (2;3), (3;2), (6;1). Уже четыре! Порядок важен — x и y разные роли.',
      'А если разрешить отрицательные? (−1)·(−6) = 6 тоже! Минус на минус даёт плюс. Добавляются (−1;−6), (−2;−3), (−3;−2), (−6;−1) — ещё четыре. Всего 8 решений!',
      'Главный приём для xy = n: разложи n на множители и перебери все пары (делители). У 6 делители: ±1, ±2, ±3, ±6. Каждая пара множителей — решение!',
      'Произведение равно нулю: xy = 0 означает, что x = 0 ИЛИ y = 0. Это ключевой приём! Если произведение равно нулю — хотя бы один множитель ноль.',
      'Линейное уравнение: x + 2y = 5. Если зафиксировать y, x выражается: x = 5 − 2y. При y = 0 → x = 5, при y = 1 → x = 3, при y = 2 → x = 1. Бесконечно много решений!',
      'Почему бесконечно? Берём любое целое y — и получаем целое x. Все пары (5−2y; y) — решения. Например, y = −1 → x = 7. Сколько хочешь — столько и решений!',
      'На олимпиадах часто спрашивают «найди все целые решения». План: 1) если xy = n — перебирай делители n; 2) если xy = 0 — один множитель ноль; 3) если линейное — выражай одну переменную через другую.',
      'Теперь проверь себя: сколько положительных целых пар (x; y) с xy = 6? Вспомни делители шестёрки!'
    ],
    check: { q: 'Сколько положительных целых пар (x; y) с xy = 6?', choices: ['4', '2', '6', '3'], ans: 0,
      exp: '(1,6), (2,3), (3,2), (6,1) — четыре пары.' },
    tasks: [
      { q: 'Целое решение x + 2y = 5 при y = 1: чему равен x?', kind: 'unit', ans: 3, tol: 0,
        hints: ['x = 5 − 2.', 'x = 3.'], sol: '3' },
      { q: 'Уравнение xy = 0 в целых числах означает…', kind: 'choice', choices: ['x = 0 или y = 0', 'x = y = 1', 'x + y = 0', 'решений нет'], ans: 0, tol: 0,
        hints: ['Произведение равно нулю.', 'Один из множителей равен нулю.'], sol: 'x = 0 или y = 0' }
    ]
  };
  function visD421(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 10px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Уравнение в целых числах</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">xy = 6</div>
        <div class="wv-sml">x и y — целые: …, −2, −1, 0, 1, 2, …</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Разложим 6</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['1','6'],['2','3'],['3','2'],['6','1']].map(p=>`<div class="wv-pop" style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:10px;padding:6px 10px;min-width:64px"><div style="font-size:17px;color:#ffd76a;font-family:Georgia,serif">(${p[0]}; ${p[1]})</div></div>`).join('')}
        </div>
        <div class="wv-sml">порядок важен — четыре пары!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Отрицательные тоже!</div>
        <div class="wv-row" style="gap:5px;flex-wrap:wrap">
          ${[['−1','−6'],['−2','−3'],['−3','−2'],['−6','−1']].map(p=>`<span class="wv-chip" style="border-color:#ff8ac0;color:#ff8ac0">(${p[0]}; ${p[1]})</span>`).join('')}
        </div>
        <div class="wv-sml">минус на минус = плюс → ещё 4 решения, всего 8!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Главный приём</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.6">xy = n → разложи n и перебери пары делителей. Делители 6: <b style="color:#ffd76a">±1, ±2, ±3, ±6</b></div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Произведение = 0</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">xy = 0</div>
        <div style="background:rgba(143,209,168,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:16px;color:#8fd1a8;font-weight:bold" class="wv-ans">x = 0 или y = 0!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Линейное: x + 2y = 5</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:16px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">x = 5 − 2y</div>
          <div class="wv-pop2">y=0 → x=5 · y=1 → x=3 · y=2 → x=1</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Бесконечно много!</div>
        <div class="wv-row" style="gap:5px;flex-wrap:wrap">
          ${[['y=−1','x=7'],['y=0','x=5'],['y=1','x=3'],['y=2','x=1']].map(p=>`<span class="wv-chip" style="border-color:#7fd1ff;color:#7fd1ff">${p[0]} → ${p[1]}</span>`).join('')}
        </div>
        <div class="wv-sml">любое целое y даёт целое x — решений сколько хочешь!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">План решения</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['xy = n','перебирай делители','#7fd1ff'],
            ['xy = 0','один множитель ноль','#8fd1a8'],
            ['линейное','вырази одну переменную','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="font-family:Georgia,serif;color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">xy = 6</div>
        <div class="wv-sml">положительные целые пары — сколько?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? пары</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[421]=visD421;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===421){ window.ARH_LESSONS[i]=L421; break; } } })();
})();
