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
