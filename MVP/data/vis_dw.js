/* Волна D v2: уроки 413–426 (8 класс) в формате «объясни → реши + живой виджет».
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_D[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_D = window.WAVE_D || {};
window._waveCss = function(id, css){
  try{
    if(!document.getElementById(id)){
      const s=document.createElement('style');
      s.id=id;
      s.textContent=String(css).replace(/<\/?style>/gi,'');
      document.head.appendChild(s);
    }
  }catch(e){}
};


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
      'Загадка: четыре стороны, четыре угла. Кто из них «собрал всё» — и равные стороны, и прямые углы? Сейчас разложим семейство по полочкам и увидим, кто чей родственник.',
      'Четырёхугольник — замкнутая ломаная из четырёх отрезков. Вершины A, B, C, D по кругу, без пересечений. Нажми «Обвести» — стороны дорисуются по очереди.',
      'Проведи одну диагональ. Получилось два треугольника. У каждого сумма углов 180°, вместе 360°. Это верно для любого выпуклого четырёхугольника — квадрата, «кривого» параллелограмма, трапеции.',
      'Параллелограмм: противоположные стороны параллельны. Как рельсы. Тогда они ещё и равны, противоположные углы равны, диагонали делят друг друга пополам. Один факт тянет остальные.',
      'Нажми середину: диагонали встречаются в одной точке и режутся пополам. Это быстрый признак: если диагонали делятся пополам — перед тобой параллелограмм.',
      'Прямоугольник — параллелограмм, у которого все углы 90°. Квадратики в углах. Бонус: диагонали равны. Подвинь ползунок — «скошенный» становится прямым, диагонали выравниваются.',
      'Ромб — параллелограмм, у которого все стороны равны. Как квадрат, который наклонили. Диагонали перпендикулярны и делят углы пополам. Крест внутри — всегда прямой.',
      'Квадрат — и прямоугольник, и ромб сразу. Все стороны равны, все углы 90°, диагонали равны, перпендикулярны и режут углы. Он на вершине семейства.',
      'Семейное дерево: четырёхугольник → параллелограмм → прямоугольник и ромб → квадрат. Квадрат наследует всё. Трапеция стоит рядом: у неё только одна пара параллельных сторон.',
      'Трапеция: две стороны параллельны — это основания, две другие — боковые. Не параллелограмм, потому что параллельна только одна пара.',
      'Равнобедренная трапеция: боковые равны, углы при каждом основании равны, диагонали равны. Как ворота: симметрия по средней линии.',
      'Подвинь ползунок «скос». Слева — параллелограмм, справа — прямоугольник. Смотри, как углы становятся прямыми, а диагонали — одинаковыми.',
      'Шпаргалка по диагоналям: параллелограмм — делятся пополам; прямоугольник — ещё и равны; ромб — ещё и перпендикулярны; квадрат — всё сразу.',
      'Рецепт: сначала спроси, сколько пар параллельных сторон. Две — параллелограмм и его дети. Одна — трапеция. Ноль — просто четырёхугольник. Потом смотри углы и стороны.',
      'В карман: сумма углов 360°. Параллелограмм — противоположные равны. Прямоугольник — 90° и равные диагонали. Ромб — равные стороны и крест. Квадрат — всё вместе.',
      'Проверка: все стороны равны и все углы прямые. Это квадрат. Прямоугольник без равных сторон — не он. Ромб без прямых углов — тоже не он.'
    ],
    check: { q: 'У какой фигуры все стороны равны и все углы прямые?', choices: ['квадрат', 'прямоугольник', 'ромб', 'параллелограмм'], ans: 0,
      exp: 'Квадрат — и прямоугольник, и ромб: стороны равны, углы 90°.' },
    tasks: [
      { q: 'Чему равна сумма углов четырёхугольника?', kind: 'unit', ans: 360, tol: 0,
        hints: ['Разрежь диагональю на два треугольника.', '180° + 180° = 360°.'], sol: '360°' },
      { q: 'У параллелограмма противоположные стороны…', kind: 'choice',
        choices: ['равны', 'перпендикулярны', 'всегда разные', 'являются диагоналями'], ans: 0, tol: 0,
        hints: ['Они ещё и параллельны.', 'Параллельны и равны.'], sol: 'равны' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', PINK='#ff8ac0', ORANGE='#e8a05a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l417ink{to{stroke-dashoffset:0}}
    @keyframes l417pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l417pulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes l417glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l417-ink{animation:l417ink 1.4s cubic-bezier(.2,.75,.15,1) forwards}
    .l417-dot{transform-box:fill-box;transform-origin:center;animation:l417pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l417-pulse{animation:l417pulse 1.6s ease-in-out infinite}
    .l417-glow{animation:l417glow 1.8s ease-in-out infinite}
    .l417-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l417-ink" style="animation-duration:${dur||1.35}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l417-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l417', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function mid(a,b){ return [(a[0]+b[0])/2, (a[1]+b[1])/2]; }
  function dist(a,b){ return Math.hypot(b[0]-a[0], b[1]-a[1]); }
  function poly(pts, fill, stroke, draw){
    const d=pts.map((p,i)=>(i?'L':'M')+p[0]+','+p[1]).join(' ')+' Z';
    let per=0; for(let i=0;i<pts.length;i++) per+=dist(pts[i], pts[(i+1)%pts.length]);
    return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="2.6" ${draw?ink(per,1.4,0):''}/>`;
  }
  function sqMark(A,B,C,col){
    const u=[B[0]-A[0], B[1]-A[1]], v=[C[0]-A[0], C[1]-A[1]];
    const lu=Math.hypot(u[0],u[1])||1, lv=Math.hypot(v[0],v[1])||1;
    const s=11, uu=[u[0]/lu*s, u[1]/lu*s], vv=[v[0]/lv*s, v[1]/lv*s];
    const p1=[A[0]+uu[0], A[1]+uu[1]], p2=[A[0]+uu[0]+vv[0], A[1]+uu[1]+vv[1]], p3=[A[0]+vv[0], A[1]+vv[1]];
    return `<path d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} L ${p3[0].toFixed(1)} ${p3[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="1.6"/>`;
  }
  function dots(pts, names, cols){
    return pts.map((p,i)=>`<circle class="l417-dot" style="animation-delay:${i*.06}s" cx="${p[0]}" cy="${p[1]}" r="5" fill="${cols[i]||GOLD}"/>`+lab(p[0], p[1]-11, names[i], cols[i]||GOLD)).join('');
  }
  const PAR=[[48,72],[188,72],[164,168],[24,168]];
  const REC=[[40,64],[200,64],[200,168],[40,168]];
  const ROM=[[120,36],[196,110],[120,184],[44,110]];
  const SQ=[[64,48],[176,48],[176,160],[64,160]];
  const TR=[[36,168],[72,56],[188,56],[164,168]];
  const ITR=[[48,168],[72,56],[168,56],[192,168]];

  function visD417(el){
    try{ window._waveCss && _waveCss('css-l417', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'417';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const t=Math.max(0, Math.min(1, st.t==null?0.35:+st.t));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          poly(SQ, 'rgba(255,215,106,.12)', GOLD, doDraw)+
          lab(120, 28, open?'квадрат':'кто собрал всё?', GOLD, 'middle', 15)+
          lab(120, 204, open?'стороны равны, углы 90°':'4 стороны, 4 угла', MUTED)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Семейство','Квадрат, прямоугольник, ромб, параллелограмм, трапеция. Сейчас нарисуем каждого и посмотрим, кто чей родственник.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          poly(PAR, 'rgba(127,209,255,.1)', BLUE, doDraw)+
          dots(PAR, ['A','B','C','D'], [GOLD,GOLD,GOLD,GOLD])+
          lab(120, 28, 'четырёхугольник ABCD', BLUE)
        )}
        ${note('Четыре вершины','Вершины по кругу, стороны не пересекаются. Это выпуклый четырёхугольник — все наши фигуры такие.')}
      </div>`;
    } else if(step===2){
      const show=st.cut!==false;
      h=`<div class="wv-col">
        ${frame(
          poly(PAR, 'rgba(127,209,255,.08)', BLUE, false)+
          (show?`<line x1="${PAR[0][0]}" y1="${PAR[0][1]}" x2="${PAR[2][0]}" y2="${PAR[2][1]}" stroke="${GOLD}" stroke-width="2.4" ${doDraw?ink(dist(PAR[0],PAR[2]),1.2,0):''}/>`:'')+
          dots(PAR, ['A','B','C','D'], [GOLD,GOLD,GOLD,GOLD])+
          lab(88, 108, '180°', GREEN)+lab(148, 128, '180°', GREEN)+
          lab(120, 28, '180° + 180° = 360°', GOLD)
        )}
        ${note('Два треугольника','Одна диагональ режет фигуру пополам. У каждого треугольника 180°, вместе 360°. Для любого выпуклого четырёхугольника.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${frame(
          poly(PAR, 'rgba(127,209,255,.1)', BLUE, doDraw)+
          lab(mid(PAR[0],PAR[1])[0], PAR[0][1]-12, 'a', GOLD)+
          lab(mid(PAR[3],PAR[2])[0], PAR[2][1]+16, 'a', GOLD)+
          lab(PAR[0][0]-12, mid(PAR[0],PAR[3])[1], 'b', GREEN, 'end')+
          lab(PAR[1][0]+12, mid(PAR[1],PAR[2])[1], 'b', GREEN, 'start')+
          lab(120, 28, 'параллелограмм', BLUE)
        )}
        ${note('Рельсы','Противоположные стороны параллельны и равны. Противоположные углы равны. Это «родитель» прямоугольника и ромба.')}
      </div>`;
    } else if(step===4){
      const M=mid(PAR[0], PAR[2]);
      const show=!!st.mid;
      h=`<div class="wv-col">
        ${frame(
          poly(PAR, 'rgba(127,209,255,.08)', BLUE, false)+
          `<line x1="${PAR[0][0]}" y1="${PAR[0][1]}" x2="${PAR[2][0]}" y2="${PAR[2][1]}" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(dist(PAR[0],PAR[2]),1.1,0):''}/>`+
          `<line x1="${PAR[1][0]}" y1="${PAR[1][1]}" x2="${PAR[3][0]}" y2="${PAR[3][1]}" stroke="${GREEN}" stroke-width="2" ${doDraw?ink(dist(PAR[1],PAR[3]),1.1,.15):''}/>`+
          (show?`<circle class="l417-glow" cx="${M[0]}" cy="${M[1]}" r="6" fill="${GOLD}"/>`+lab(M[0]+12, M[1]-8, 'середина', GOLD, 'start', 11):'')+
          lab(120, 28, 'диагонали делятся пополам', GOLD, 'middle', 13)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].mid=!CHS[k].mid;chRender(0);}catch(e){}">${show?'Скрыть точку':'Показать середину'}</button>
        ${note('Признак','Если диагонали режутся пополам — это параллелограмм. Быстрая проверка на чертеже.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          poly(REC, 'rgba(143,209,168,.1)', GREEN, doDraw)+
          sqMark(REC[0], REC[1], REC[3], GREEN)+
          sqMark(REC[1], REC[2], REC[0], GREEN)+
          sqMark(REC[2], REC[1], REC[3], GREEN)+
          sqMark(REC[3], REC[0], REC[2], GREEN)+
          `<line x1="${REC[0][0]}" y1="${REC[0][1]}" x2="${REC[2][0]}" y2="${REC[2][1]}" stroke="${GOLD}" stroke-width="1.8"/>`+
          `<line x1="${REC[1][0]}" y1="${REC[1][1]}" x2="${REC[3][0]}" y2="${REC[3][1]}" stroke="${GOLD}" stroke-width="1.8"/>`+
          lab(120, 28, 'прямоугольник · диагонали равны', GREEN, 'middle', 13)
        )}
        ${note('Прямые углы','Параллелограмм + все углы 90°. Диагонали становятся равными. Две оси симметрии через середины сторон.')}
      </div>`;
    } else if(step===6){
      const M=mid(ROM[0], ROM[2]);
      h=`<div class="wv-col">
        ${frame(
          poly(ROM, 'rgba(255,138,192,.1)', PINK, doDraw)+
          `<line x1="${ROM[0][0]}" y1="${ROM[0][1]}" x2="${ROM[2][0]}" y2="${ROM[2][1]}" stroke="${GOLD}" stroke-width="2"/>`+
          `<line x1="${ROM[1][0]}" y1="${ROM[1][1]}" x2="${ROM[3][0]}" y2="${ROM[3][1]}" stroke="${GOLD}" stroke-width="2"/>`+
          sqMark(M, ROM[0], ROM[1], GOLD)+
          lab(120, 22, 'ромб · диагонали ⊥', PINK)+
          lab(120, 208, 'все стороны равны', MUTED)
        )}
        ${note('Наклонный квадрат','Все стороны равны. Диагонали крестом: перпендикулярны и делят углы пополам. Оси симметрии — сами диагонали.')}
      </div>`;
    } else if(step===7){
      const M=mid(SQ[0], SQ[2]);
      h=`<div class="wv-col">
        ${frame(
          poly(SQ, 'rgba(255,215,106,.12)', GOLD, doDraw)+
          sqMark(SQ[0], SQ[1], SQ[3], GREEN)+
          `<line x1="${SQ[0][0]}" y1="${SQ[0][1]}" x2="${SQ[2][0]}" y2="${SQ[2][1]}" stroke="${BLUE}" stroke-width="1.8"/>`+
          `<line x1="${SQ[1][0]}" y1="${SQ[1][1]}" x2="${SQ[3][0]}" y2="${SQ[3][1]}" stroke="${BLUE}" stroke-width="1.8"/>`+
          sqMark(M, SQ[0], SQ[1], BLUE)+
          lab(120, 28, 'квадрат — всё сразу', GOLD)+
          lab(120, 204, 'стороны =  углы 90°  диагонали ⊥ и =', MUTED, 'middle', 11)
        )}
        ${note('Вершина семьи','И прямоугольник, и ромб. Наследует все свойства: равные стороны, прямые углы, равные и перпендикулярные диагонали.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="70" y="18" width="100" height="28" rx="8" fill="${BLUE}22" stroke="${BLUE}"/>`+lab(120, 37, 'четырёхугольник', BLUE, 'middle', 11)+
          `<line x1="120" y1="46" x2="120" y2="62" stroke="${MUTED}"/>`+
          `<rect x="62" y="62" width="116" height="28" rx="8" fill="${GREEN}22" stroke="${GREEN}"/>`+lab(120, 81, 'параллелограмм', GREEN, 'middle', 11)+
          `<line x1="120" y1="90" x2="70" y2="108" stroke="${MUTED}"/><line x1="120" y1="90" x2="170" y2="108" stroke="${MUTED}"/>`+
          `<rect x="16" y="108" width="100" height="28" rx="8" fill="${GREEN}22" stroke="${GREEN}"/>`+lab(66, 127, 'прямоугольник', GREEN, 'middle', 11)+
          `<rect x="124" y="108" width="100" height="28" rx="8" fill="${PINK}22" stroke="${PINK}"/>`+lab(174, 127, 'ромб', PINK, 'middle', 11)+
          `<line x1="66" y1="136" x2="120" y2="154" stroke="${MUTED}"/><line x1="174" y1="136" x2="120" y2="154" stroke="${MUTED}"/>`+
          `<rect x="70" y="154" width="100" height="28" rx="8" fill="${GOLD}22" stroke="${GOLD}"/>`+lab(120, 173, 'квадрат', GOLD, 'middle', 12)+
          lab(120, 208, 'трапеция рядом: одна пара //', ORANGE)
        , '0 0 240 220')}
        ${note('Дерево','Сверху вниз свойства копятся. Квадрат внизу — у него всё. Трапеция не в этой ветке: у неё только одна пара параллельных.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${frame(
          poly(TR, 'rgba(232,160,90,.1)', ORANGE, doDraw)+
          `<line x1="${TR[1][0]}" y1="${TR[1][1]}" x2="${TR[2][0]}" y2="${TR[2][1]}" stroke="${GOLD}" stroke-width="3"/>`+
          `<line x1="${TR[0][0]}" y1="${TR[0][1]}" x2="${TR[3][0]}" y2="${TR[3][1]}" stroke="${GOLD}" stroke-width="3"/>`+
          lab(120, 44, 'основания', GOLD)+
          lab(120, 204, 'трапеция · одна пара //', ORANGE)
        )}
        ${note('Одна пара рельс','Две стороны параллельны — основания. Другие две — боковые, они не параллельны. Это уже не параллелограмм.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          poly(ITR, 'rgba(232,160,90,.1)', ORANGE, doDraw)+
          lab(mid(ITR[0],ITR[1])[0]-8, mid(ITR[0],ITR[1])[1], 'c', GREEN, 'end')+
          lab(mid(ITR[2],ITR[3])[0]+8, mid(ITR[2],ITR[3])[1], 'c', GREEN, 'start')+
          `<line x1="${ITR[0][0]}" y1="${ITR[0][1]}" x2="${ITR[2][0]}" y2="${ITR[2][1]}" stroke="${BLUE}" stroke-width="1.6"/>`+
          `<line x1="${ITR[1][0]}" y1="${ITR[1][1]}" x2="${ITR[3][0]}" y2="${ITR[3][1]}" stroke="${BLUE}" stroke-width="1.6"/>`+
          lab(120, 28, 'равнобедренная', GOLD)+
          lab(120, 204, 'боковые равны, диагонали равны', MUTED, 'middle', 11)
        )}
        ${note('Ворота','Боковые стороны равны, углы при каждом основании равны, диагонали равны. Есть ось симметрии посередине.')}
      </div>`;
    } else if(step===11){
      const skew=40*(1-t);
      const P=[[40+skew,64],[200,64],[200-skew,168],[40,168]];
      h=`<div class="wv-col">
        ${frame(
          poly(P, 'rgba(127,209,255,.1)', t>0.92?GREEN:BLUE, false)+
          (t>0.92?sqMark(P[0], P[1], P[3], GREEN):'')+
          `<line x1="${P[0][0]}" y1="${P[0][1]}" x2="${P[2][0]}" y2="${P[2][1]}" stroke="${GOLD}" stroke-width="1.7"/>`+
          `<line x1="${P[1][0]}" y1="${P[1][1]}" x2="${P[3][0]}" y2="${P[3][1]}" stroke="${GOLD}" stroke-width="1.7"/>`+
          lab(120, 28, t>0.92?'прямоугольник':'параллелограмм', t>0.92?GREEN:BLUE)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">скос
          <input type="range" min="0" max="100" value="${Math.round(t*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;chRender(0);}catch(e){}">
        </label>
        ${note('Живой скос','Влево — параллелограмм, диагонали разные. Вправо — углы 90°, диагонали сравниваются. Один ползунок, два родственника.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['параллелограмм','делятся пополам',BLUE],
            ['прямоугольник','+ равны',GREEN],
            ['ромб','+ перпендикулярны',PINK],
            ['квадрат','всё сразу',GOLD]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Диагонали','Один столбик свойств. Каждая ступенька добавляет одно. Квадрат собирает колонку целиком.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Сколько пар параллельных сторон?',GOLD],
            ['2','Две → параллелограмм и дети',BLUE],
            ['3','Одна → трапеция',ORANGE],
            ['4','Углы 90°? Стороны равны?',GREEN]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала параллельность, потом углы и стороны. Не начинай с названия — начни с свойств.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          poly(SQ, 'rgba(255,215,106,.12)', GOLD, doDraw)+
          lab(120, 28, 'квадрат', GOLD)+
          lab(120, 204, '360° · // · 90° · стороны =', MUTED, 'middle', 11)
        )}
        ${note('В карман','Сумма 360°. Параллелограмм — противоположные равны. Прямоугольник — 90°. Ромб — стороны равны. Квадрат — всё.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(
          poly(SQ, 'rgba(255,215,106,.12)', GOLD, doDraw)+
          lab(120, 28, 'стороны равны, углы 90°', GOLD, 'middle', 14)+
          lab(120, 204, 'кто это?', MUTED)
        )}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">?</div>
        ${note('Проверка','Квадрат. Прямоугольник без равных сторон — нет. Ромб без прямых углов — нет.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[417]=visD417;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===417){ arr[i]=L417; f=true; break; } }
    if(!f) arr.push(L417);
  })();
})();
/* ================= УРОК 418 · Подобие треугольников ================= */
(function(){
  const L418 = {
    id: 418, title: 'Подобие треугольников', ico: '🔺',
    src: 'Математика · 8 класс · Геометрия 8: подобие', subj: 'math',
    explain: [
      'Загадка: фотография и её увеличение. Углы те же, стороны выросли. Как назвать такие треугольники и как найти неизвестную сторону, не измеряя её линейкой?',
      'Подобные треугольники — одинаковая форма, разный размер. Пишут △ABC ∼ △A′B′C′. Углы равны, стороны пропорциональны. Не путай с равными: равные — ещё и одного размера.',
      'Коэффициент k — во сколько раз стороны одного больше сторон другого. k = 2 значит каждая сторона второго в два раза длиннее. Подвинь ползунок — маленький треугольник растёт, форма не ломается.',
      'Три признака, мягче чем равенство. Два угла равны — уже подобны. Две стороны пропорциональны и угол между ними равен. Три стороны пропорциональны. Чаще всего хватает двух углов.',
      'Нажми признак: загорятся нужные элементы. Для задач почти всегда ищи два равных угла — вертикальные, накрест лежащие, общие.',
      'Неизвестная сторона: если подобны и k = 3, сторона 4 переходит в 12. Пиши пропорцию: a/a′ = b/b′ = k. Крест-накрест и готово.',
      'Средняя линия соединяет середины двух сторон. Она параллельна третьей и равна её половине. Нажми середины — линия ляжет ровно посередине.',
      'Средняя линия отсекает маленький подобный треугольник с k = 1/2. Большой и маленький смотрят в одну сторону, углы общие — вот и подобие.',
      'Площади относятся как k². Не как k. Если стороны ×2, площадь ×4. Почему: и основание, и высота выросли в k, произведение — k².',
      'Посмотри два квадрата: сторона 1 и сторона 2. Площади 1 и 4. Тот же квадрат коэффициента. Для треугольников правило то же.',
      'Подвинь k. Подпись показывает k и k². Поймай k = 2 — площадь в 4 раза. Поймай k = 3 — в 9. Это самая частая ловушка в тесте.',
      'Тень дерева. Человек и дерево, солнце одно — треугольники подобны. Измерил себя и свою тень, измерил тень дерева — нашёл высоту, не залезая наверх.',
      'Карта и местность — тоже подобие. Масштаб 1:10000 значит k = 10000. 1 см на карте — 100 м в поле. Те же углы, другие стороны.',
      'Рецепт: найди два равных угла → подобны. Напиши k. Перенеси его на нужную сторону или на площадь как k². Не забудь, что площадь — квадрат.',
      'В карман: ∼ значит форма одна. k — стороны. k² — площади. Средняя линия — k = 1/2. Тень и карта — те же треугольники.',
      'Проверка: k = 2, площадь второго во сколько раз больше? Не в 2 — в 4. Стороны удвоились, площадь учетверилась.'
    ],
    check: { q: 'Треугольники подобны с коэффициентом 2. Во сколько раз площадь второго больше?', choices: ['в 4 раза', 'в 2 раза', 'в 8 раз', 'в √2 раз'], ans: 0,
      exp: 'Площади относятся как k². 2² = 4.' },
    tasks: [
      { q: 'Коэффициент подобия 3. Во сколько раз стороны одного больше другого?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Стороны пропорциональны k.', 'k = 3 — стороны в 3 раза.'], sol: '3' },
      { q: 'Средняя линия треугольника соединяет…', kind: 'choice',
        choices: ['середины двух сторон', 'вершину с серединой стороны', 'две вершины', 'центр с вершиной'], ans: 0, tol: 0,
        hints: ['Это не медиана.', 'Середины двух сторон, параллельна третьей.'], sol: 'середины двух сторон' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', PINK='#ff8ac0', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l418ink{to{stroke-dashoffset:0}}
    @keyframes l418pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l418pulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes l418glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l418-ink{animation:l418ink 1.4s cubic-bezier(.2,.75,.15,1) forwards}
    .l418-dot{transform-box:fill-box;transform-origin:center;animation:l418pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l418-pulse{animation:l418pulse 1.6s ease-in-out infinite}
    .l418-glow{animation:l418glow 1.8s ease-in-out infinite}
    .l418-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+18);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l418-ink" style="animation-duration:${dur||1.35}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l418-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l418', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 220'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function mid(a,b){ return [(a[0]+b[0])/2,(a[1]+b[1])/2]; }
  function dist(a,b){ return Math.hypot(b[0]-a[0], b[1]-a[1]); }
  function tri(pts, fill, stroke, draw){
    const d='M'+pts.map(p=>p[0]+','+p[1]).join(' L')+' Z';
    const per=dist(pts[0],pts[1])+dist(pts[1],pts[2])+dist(pts[2],pts[0]);
    return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" ${draw?ink(per,1.35,0):''}/>`;
  }
  function ang(A,B,C,col,txt){
    const n=(V)=>{const L=Math.hypot(V[0],V[1])||1; return [V[0]/L,V[1]/L];};
    const u=n([A[0]-B[0],A[1]-B[1]]), w=n([C[0]-B[0],C[1]-B[1]]);
    const s=16, p1=[B[0]+u[0]*s,B[1]+u[1]*s], p2=[B[0]+w[0]*s,B[1]+w[1]*s];
    const bx=u[0]+w[0], by=u[1]+w[1], bL=Math.hypot(bx,by)||1;
    const lp=[B[0]+(bx/bL)*28, B[1]+(by/bL)*28];
    const lx=Math.max(18, Math.min(222, lp[0])), ly=Math.max(18, Math.min(206, lp[1]));
    return `<path d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q ${lp[0].toFixed(1)} ${lp[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="${col}33" stroke="${col}" stroke-width="1.5"/>`+
      (txt?lab(lx, ly+4, txt, col, 'middle', 11):'');
  }
  const S=[[48,168],[96,48],[144,168]];
  const B=[[40,196],[120,28],[200,196]];

  function visD418(el){
    try{ window._waveCss && _waveCss('css-l418', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'418';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const k=Math.max(1, Math.min(3, +(st.k==null?2:st.k)));
    const feat=st.feat==null?0:+st.feat;
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          tri([[36,176],[70,80],[104,176]], 'rgba(127,209,255,.12)', BLUE, doDraw)+
          tri([[118,196],[168,36],[218,196]], 'rgba(255,215,106,.1)', GOLD, doDraw)+
          lab(70, 64, 'фото', BLUE)+lab(168, 24, open?'увеличение':'?', GOLD)+
          lab(120, 212, open?'одна форма, разный размер':'чем похожи?', MUTED)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Фото и увеличение','Углы те же, стороны выросли. Такие треугольники называют подобными. Сейчас научимся находить сторону, не измеряя её.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          tri(S, 'rgba(127,209,255,.12)', BLUE, doDraw)+
          tri([[130,176],[178,72],[226,176]], 'rgba(255,215,106,.1)', GOLD, false)+
          lab(96, 36, '△ABC', BLUE)+lab(178, 60, "△A′B′C′", GOLD)+
          lab(120, 208, 'ABC ∼ A′B′C′', GOLD)
        )}
        ${note('Знак ∼','Тильда — «похожи». Углы равны, стороны пропорциональны. Равные треугольники — частный случай, когда k = 1.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          tri(S, 'rgba(127,209,255,.1)', BLUE, false)+
          tri([[132,176],[180,72],[228,176]], 'rgba(255,215,106,.1)', GOLD, false)+
          ang(S[1], S[0], S[2], GREEN, 'α')+
          ang([180,72],[132,176],[228,176], GREEN, 'α')+
          ang(S[0], S[1], S[2], GOLD, 'β')+
          ang([132,176],[180,72],[228,176], GOLD, 'β')+
          lab(120, 28, 'углы попарно равны', GOLD)
        )}
        ${note('Форма держится углами','Если углы совпали, форма одна. Стороны могут быть любыми — лишь бы пропорция одна.')}
      </div>`;
    } else if(step===3){
      const base=[[40,188],[40+50*k,188],[40+25*k,188-70*k/2]];
      const ok=base[1][0]<228 && base[2][1]>28;
      const T=ok?base:[[40,188],[190,188],[115,48]];
      h=`<div class="wv-col">
        ${frame(
          tri([[40,188],[90,188],[65,118]], 'rgba(127,209,255,.14)', BLUE, false)+
          tri(T, 'rgba(255,215,106,.1)', GOLD, doDraw)+
          lab(120, 28, 'k = '+k.toString().replace('.',','), GOLD, 'middle', 16)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">k
          <input type="range" min="10" max="30" value="${Math.round(k*10)}" style="flex:1"
            oninput="try{const k2=lidKey(LV.id);CHS[k2]=CHS[k2]||{};CHS[k2].k=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:28px">${k.toString().replace('.',',')}</b>
        </label>
        ${note('Расти, не ломаясь','Ползунок множит все стороны. Углы не двигаются. Это и есть подобие: форма заморожена, размер живой.')}
      </div>`;
    } else if(step===4){
      const items=[['два угла','AA',BLUE],['две стороны и угол','SAS',GREEN],['три стороны','SSS',GOLD]];
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${items.map((x,i)=>`<button type="button" class="btn" style="justify-content:space-between;border-color:${feat===i?x[2]:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].feat=${i};chRender(0);}catch(e){}"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></button>`).join('')}
        </div>
        ${frame(
          tri(B, 'rgba(127,209,255,.1)', BLUE, false)+
          (feat===0? ang(B[1],B[0],B[2],GOLD,'α')+ang(B[0],B[1],B[2],GREEN,'β') : '')+
          (feat===1? `<line x1="${B[0][0]}" y1="${B[0][1]}" x2="${B[1][0]}" y2="${B[1][1]}" stroke="${GOLD}" stroke-width="4"/>`+
            `<line x1="${B[1][0]}" y1="${B[1][1]}" x2="${B[2][0]}" y2="${B[2][1]}" stroke="${GOLD}" stroke-width="4"/>`+ang(B[0],B[1],B[2],GREEN,'∠') : '')+
          (feat===2? `<path d="M ${B[0][0]} ${B[0][1]} L ${B[1][0]} ${B[1][1]} L ${B[2][0]} ${B[2][1]} Z" fill="none" stroke="${GOLD}" stroke-width="4"/>` : '')+
          lab(120, 208, items[feat][0], GOLD)
        )}
        ${note('Три двери','Чаще всего хватает двух углов. В задачах ищи вертикальные, накрест лежащие или общий угол.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          tri([[32,176],[80,88],[128,176]], 'rgba(127,209,255,.12)', BLUE, doDraw)+
          lab(80, 188, '4', BLUE)+
          tri([[140,188],[186,40],[232,188]], 'rgba(255,215,106,.1)', GOLD, false)+
          lab(186, 204, '?', GOLD)+
          lab(120, 28, 'k = 3  →  4·3 = 12', GOLD)
        )}
        <div class="wv-ans" style="font-size:16px">a / a′ = 4 / x = 1 / 3</div>
        ${note('Пропорция','Известную сторону умножь на k. Или пиши крест-накрест. Не складывай стороны — только умножай.')}
      </div>`;
    } else if(step===6){
      const show=!!st.mid;
      const M1=mid(B[0], B[1]), M2=mid(B[1], B[2]);
      h=`<div class="wv-col">
        ${frame(
          tri(B, 'rgba(127,209,255,.08)', BLUE, false)+
          (show?`<line x1="${M1[0]}" y1="${M1[1]}" x2="${M2[0]}" y2="${M2[1]}" stroke="${GOLD}" stroke-width="3" ${doDraw?ink(dist(M1,M2),1.2,0):''}/>`+
            `<circle class="l418-dot" cx="${M1[0]}" cy="${M1[1]}" r="5" fill="${GOLD}"/>`+
            `<circle class="l418-dot" cx="${M2[0]}" cy="${M2[1]}" r="5" fill="${GOLD}"/>`+
            lab(120, 120, '∥ и = ½', GOLD):'')+
          lab(120, 28, 'средняя линия', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].mid=!CHS[k].mid;chRender(0);}catch(e){}">${show?'Скрыть':'Показать середины'}</button>
        ${note('Середины двух сторон','Не путай с медианой: медиана идёт из вершины. Средняя линия — от середины к середине, параллельна третьей, вдвое короче.')}
      </div>`;
    } else if(step===7){
      const M1=mid(B[0], B[1]), M2=mid(B[1], B[2]);
      h=`<div class="wv-col">
        ${frame(
          tri(B, 'rgba(127,209,255,.08)', BLUE, false)+
          tri([M1, B[1], M2], 'rgba(255,215,106,.16)', GOLD, doDraw)+
          lab(120, 28, 'k = 1/2', GOLD)+
          lab(120, 208, 'маленький ∼ большому', MUTED)
        )}
        ${note('Отсекли подобный','Верхний треугольник смотрит туда же. Угол у вершины общий, средняя линия параллельна основанию — углы равны. k = 1/2.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="28" y="88" width="48" height="48" fill="${BLUE}33" stroke="${BLUE}" stroke-width="2" ${doDraw?ink(192,1.1,0):''}/>`+
          lab(52, 80, 'k=1', BLUE)+lab(52, 152, 'S=1', MUTED)+
          `<rect x="108" y="40" width="96" height="96" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(384,1.3,.1):''}/>`+
          lab(156, 32, 'k=2', GOLD)+lab(156, 152, 'S=4', MUTED)+
          lab(120, 204, 'площади как k²', GOLD)
        )}
        ${note('Не в k раз','Сторона ×2, площадь ×4. Сторона ×3, площадь ×9. Ловушка теста: отвечают «в 2 раза» — это про стороны, не про площадь.')}
      </div>`;
    } else if(step===9){
      const s=36*k;
      const x=120-s/2, y=120-s/2;
      h=`<div class="wv-col">
        ${frame(
          `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2.4"/>`+
          lab(120, 28, 'k = '+k.toString().replace('.',',')+'   S × '+(Math.round(k*k*10)/10).toString().replace('.',','), GOLD, 'middle', 14)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">k
          <input type="range" min="10" max="30" value="${Math.round(k*10)}" style="flex:1"
            oninput="try{const k2=lidKey(LV.id);CHS[k2]=CHS[k2]||{};CHS[k2].k=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${k.toString().replace('.',',')}</b>
        </label>
        ${note('Крути k','Подпись сверху — коэффициент и во сколько раз площадь. Поймай 2 и 4, поймай 3 и 9.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${frame(
          `<line x1="20" y1="188" x2="220" y2="188" stroke="#3d5c49" stroke-width="3"/>`+
          `<line x1="48" y1="188" x2="48" y2="132" stroke="${BLUE}" stroke-width="4"/>`+
          `<line x1="48" y1="132" x2="88" y2="188" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(70,1.1,0):''}/>`+
          `<line x1="130" y1="188" x2="130" y2="48" stroke="${GREEN}" stroke-width="5"/>`+
          `<line x1="130" y1="48" x2="210" y2="188" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(160,1.3,.15):''}/>`+
          lab(48, 122, 'чел.', BLUE)+lab(130, 38, 'дерево', GREEN)+
          lab(120, 208, 'одно солнце → подобны', MUTED, 'middle', 11)
        )}
        ${note('Тень','Солнце одно, лучи параллельны — треугольники подобны. Измерил себя и тень, измерил тень дерева — высота дерева находится пропорцией.')}
      </div>`;
    } else if(step===11){
      const kk=Math.min(2.4, k);
      const side=4*kk;
      h=`<div class="wv-col">
        ${frame(
          tri([[28,188],[28+40,188],[28+20,188-56]], 'rgba(127,209,255,.14)', BLUE, false)+
          lab(48, 204, '4', BLUE)+
          tri([[110,188],[110+40*kk,188],[110+20*kk,188-56*kk]], 'rgba(255,215,106,.12)', GOLD, false)+
          lab(Math.min(220,110+20*kk), 204, (Math.round(side*10)/10).toString().replace('.',','), GOLD)+
          lab(120, 28, 'стороны ×'+kk.toString().replace('.',',')+'  площадь ×'+(Math.round(kk*kk*10)/10).toString().replace('.',','), GOLD, 'middle', 12)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">k
          <input type="range" min="10" max="24" value="${Math.round(kk*10)}" style="flex:1"
            oninput="try{const k2=lidKey(LV.id);CHS[k2]=CHS[k2]||{};CHS[k2].k=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${kk.toString().replace('.',',')}</b>
        </label>
        ${note('Сторона и площадь рядом','Следи за двумя числами сразу. Стороны — k, площадь — k². Их путают чаще всего.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${frame(
          `<rect x="36" y="48" width="80" height="56" rx="6" fill="${BLUE}22" stroke="${BLUE}"/>`+
          lab(76, 80, 'карта', BLUE)+
          `<rect x="140" y="36" width="72" height="80" rx="6" fill="${GOLD}22" stroke="${GOLD}"/>`+
          lab(176, 80, 'поле', GOLD)+
          lab(120, 160, '1 : 10 000', GOLD)+
          lab(120, 188, '1 см → 100 м', MUTED)
        )}
        ${note('Масштаб','Карта — маленький подобный чертёж местности. k огромный, углы те же. Линейка на карте превращается в расстояние в поле.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Найди два равных угла → ∼',BLUE],
            ['2','Запиши k по сторонам',GOLD],
            ['3','Неизвестная сторона = известная · k',GREEN],
            ['4','Площадь — это k², не k',PINK]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала подобие, потом коэффициент, потом что просят: сторону или площадь. Не прыгай сразу к числам.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          tri(S, 'rgba(127,209,255,.12)', BLUE, doDraw)+
          lab(96, 36, '∼', GOLD, 'middle', 22)+
          lab(120, 204, 'k — стороны,  k² — площадь', MUTED, 'middle', 12)
        )}
        ${note('В карман','∼ — форма. k — стороны. k² — площади. Средняя линия — половина. Тень и карта — те же треугольники.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(
          tri([[40,176],[80,88],[120,176]], 'rgba(127,209,255,.12)', BLUE, doDraw)+
          tri([[128,188],[176,48],[224,188]], 'rgba(255,215,106,.1)', GOLD, false)+
          lab(120, 28, 'k = 2  ·  площадь × ?', GOLD)
        )}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">в ? раз</div>
        ${note('Проверка','Не в 2 — в 4. Стороны удвоились, площадь учетверилась. k² = 4.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[418]=visD418;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===418){ arr[i]=L418; f=true; break; } }
    if(!f) arr.push(L418);
  })();
})();
/* ================= УРОК 419 · Окружность: касательная и углы ================= */
(function(){
  const L419 = {
    id: 419, title: 'Окружность: касательная и углы', ico: '⭕',
    src: 'Математика · 8 класс · Геометрия 8: окружность', subj: 'math',
    explain: [
      'Загадка: колесо стоит на дороге. В скольких точках оно касается асфальта? На глаз кажется «полоской», на самом деле — одна точка. Эта прямая и есть касательная.',
      'Касательная — прямая, у которой с окружностью ровно одна общая точка. Секущая протыкает круг дважды. Сдвинь прямую — увидишь, как две точки сливаются в одну.',
      'Проведи радиус в точку касания. Он стоит к дороге как спица к асфальту: прямой угол 90°. Это главное свойство: радиус ⊥ касательная. На рисунке квадратик в точке касания.',
      'Из точки снаружи к окружности идут две касательные. Отрезки от этой точки до точек касания равны. Как два одинаковых ремня. Нажми «Показать» — длины загорятся.',
      'Почему равны? Два радиуса в точки касания, два прямых угла, общая гипотенуза — два прямоугольных треугольника равны. Значит, катеты-касательные равны.',
      'Теперь углы. Вписанный угол сидит вершиной на окружности, стороны — хорды. Как зритель на трибуне смотрит на дугу-сцену. Он берёт половину этой дуги.',
      'Дуга 80° — вписанный угол 40°. Дуга 180° (диаметр) — угол 90°. Нажми точку на окружности: дуга загорится, угол покажет половину.',
      'Центральный угол сидит в центре. Он равен самой дуге, не половине. Один и тот же спектакль: из центра видишь 80°, с края — 40°.',
      'Подвинь ползунок дуги. Жёлтый — центральный, он совпадает с дугой. Голубой — вписанный, всегда ровно половина. Это одна теорема на двоих.',
      'Следствие Фалеса: угол, который опирается на диаметр, прямой. Диаметр — дуга 180°, половина — 90°. Посади точку P на полуокружность — угол в P всегда 90°.',
      'Нажми «Оживить»: P бежит по дуге, прямоугольный треугольник дышит, прямой угол не ломается. Так доказывают «треугольник с гипотенузой-диаметром — прямоугольный».',
      'Два вписанных угла на одну дугу равны. Два зрителя одного спектакля. Не важно, где сидишь на свободной дуге — угол один.',
      'Связка в карман: касательная ⊥ радиус. Две касательные из точки равны. Вписанный = дуга/2. Центральный = дуга. На диаметре — 90°.',
      'Типичная задача: касательная и хорда. Угол между ними равен вписанному, который смотрит на ту же дугу. Касательная «подменяет» сторону угла.',
      'Рецепт: сначала спроси — касательная или угол? Касательная — ищи 90° и равные отрезки. Угол — спроси, вписанный он или центральный, и возьми дугу.',
      'Проверка: касательная и радиус в точке касания. Это спица к дороге. Какой угол?'
    ],
    check: { q: 'Касательная и радиус в точке касания…', choices: ['перпендикулярны', 'параллельны', 'равны', 'образуют угол 45°'], ans: 0,
      exp: 'Радиус в точку касания перпендикулярен касательной — как спица колеса к дороге.' },
    tasks: [
      { q: 'Вписанный угол опирается на дугу 100°. Чему равен угол?', kind: 'unit', ans: 50, tol: 0,
        hints: ['Вписанный угол — половина дуги.', '100 : 2 = 50.'], sol: '50°' },
      { q: 'Из одной точки к окружности проведены две касательные. Их отрезки…', kind: 'choice',
        choices: ['равны', 'разные', 'перпендикулярны', 'в сумме равны диаметру'], ans: 0, tol: 0,
        hints: ['Два прямоугольных треугольника с общей гипотенузой.', 'Катеты-касательные равны.'], sol: 'равны' }
    ]
  };

  const CX=120, CY=108, R=72, GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l419ink{to{stroke-dashoffset:0}}
    @keyframes l419pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l419pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l419glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l419-ink{animation:l419ink 1.4s cubic-bezier(.2,.75,.15,1) forwards}
    .l419-dot{transform-box:fill-box;transform-origin:center;animation:l419pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l419-pulse{animation:l419pulse 1.6s ease-in-out infinite}
    .l419-glow{animation:l419glow 1.8s ease-in-out infinite}
    .l419-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.2px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+16);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l419-ink" style="animation-duration:${dur||1.35}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l419-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function P(deg){ const a=deg*Math.PI/180; return [CX+R*Math.cos(a), CY+R*Math.sin(a)]; }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-l419', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 216" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="rgba(127,209,255,.06)" stroke="#3d6a7a" stroke-width="1.5"/>${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function sq(A,B,col){
    const vx=A[0]-B[0], vy=A[1]-B[1], L=Math.hypot(vx,vy)||1;
    const ux=-vy/L*10, uy=vx/L*10;
    const px=B[0]+(A[0]-B[0])/L*10, py=B[1]+(A[1]-B[1])/L*10;
    return `<path d="M ${px.toFixed(1)} ${py.toFixed(1)} L ${(px+ux).toFixed(1)} ${(py+uy).toFixed(1)} L ${(B[0]+ux).toFixed(1)} ${(B[1]+uy).toFixed(1)}" fill="none" stroke="${col}" stroke-width="1.6"/>`;
  }
  function ang(A,B,C,col,txt){
    const n=(V)=>{const L=Math.hypot(V[0],V[1])||1; return [V[0]/L,V[1]/L];};
    const u=n([A[0]-B[0],A[1]-B[1]]), w=n([C[0]-B[0],C[1]-B[1]]);
    const s=16, p1=[B[0]+u[0]*s,B[1]+u[1]*s], p2=[B[0]+w[0]*s,B[1]+w[1]*s];
    const bx=u[0]+w[0], by=u[1]+w[1], bL=Math.hypot(bx,by)||1;
    const lp=[B[0]+(bx/bL)*30, B[1]+(by/bL)*30];
    return `<path d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Q ${lp[0].toFixed(1)} ${lp[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="${col}33" stroke="${col}" stroke-width="1.5"/>`+
      (txt?lab(lp[0], lp[1]+4, txt, col, 'middle', 11):'');
  }
  function arcP(a1,a2,r){
    let d=a2-a1; while(d<=0) d+=360;
    const t1=a1*Math.PI/180, t2=a2*Math.PI/180;
    const x1=CX+r*Math.cos(t1), y1=CY+r*Math.sin(t1), x2=CX+r*Math.cos(t2), y2=CY+r*Math.sin(t2);
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${d>180?1:0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  function visD419(el){
    try{ window._waveCss && _waveCss('css-l419', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'419';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const T=P(40), C=[CX,CY];
    const arc=Math.max(40, Math.min(160, +(st.arc==null?80:st.arc)));
    const tP=Math.max(0, Math.min(1, st.t==null?0.35:+st.t));
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          `<line x1="18" y1="188" x2="222" y2="188" stroke="${GOLD}" stroke-width="6" ${doDraw?ink(204,1.1,0):''}/>`+
          `<circle cx="${CX}" cy="${188-R}" r="${R}" fill="rgba(127,209,255,.08)" stroke="${BLUE}" stroke-width="2.4" ${doDraw?ink(2*Math.PI*R,1.3,.1):''}/>`+
          `<circle class="l419-dot" cx="${CX}" cy="188" r="6" fill="${GOLD}"/>`+
          lab(CX, 40, open?'1 точка касания':'сколько точек?', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Колесо и дорога','Кажется, колесо лежит на полоске. На чертеже — одна точка. Прямая, которая цепляет окружность один раз, называется касательной.')}
      </div>`;
    } else if(step===1){
      const k=1.6;
      const vx=T[0]-C[0], vy=T[1]-C[1];
      const tx=-vy, ty=vx;
      const A=[T[0]-tx*k, T[1]-ty*k], B=[T[0]+tx*k, T[1]+ty*k];
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${GOLD}" stroke-width="3" ${doDraw?ink(Math.hypot(B[0]-A[0],B[1]-A[1]),1.2,0):''}/>`+
          `<circle class="l419-dot" cx="${T[0]}" cy="${T[1]}" r="6" fill="${GOLD}"/>`+
          lab(T[0]+14, T[1]-8, 'касание', GOLD, 'start')
        )}
        ${note('Одна общая точка','Секущая входит и выходит. Касательная только целует окружность. Если сдвинуть прямую ближе к центру — точек станет две.')}
      </div>`;
    } else if(step===2){
      const vx=T[0]-C[0], vy=T[1]-C[1];
      const tx=-vy, ty=vx, k=1.5;
      const A=[T[0]-tx*k, T[1]-ty*k], B=[T[0]+tx*k, T[1]+ty*k];
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="${GOLD}" stroke-width="3"/>`+
          `<line x1="${C[0]}" y1="${C[1]}" x2="${T[0]}" y2="${T[1]}" stroke="${GREEN}" stroke-width="2.6" class="l419-glow" ${doDraw?ink(R,1.1,0):''}/>`+
          sq(C,T,GREEN)+
          `<circle cx="${C[0]}" cy="${C[1]}" r="4" fill="${BLUE}"/>`+
          `<circle class="l419-dot" cx="${T[0]}" cy="${T[1]}" r="6" fill="${GOLD}"/>`+
          lab(C[0]-10, C[1]+16, 'O', BLUE)+lab(T[0]+12, T[1]+4, '90°', GREEN, 'start')
        )}
        ${note('Спица к дороге','Радиус в точку касания всегда перпендикулярен касательной. Запомни квадратик 90° — его спрашивают почти в каждой задаче.')}
      </div>`;
    } else if(step===3){
      const S=[36, 36], T1=P(200), T2=P(320);
      const show=!!st.eq;
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${S[0]}" y1="${S[1]}" x2="${T1[0]}" y2="${T1[1]}" stroke="${GOLD}" stroke-width="2.4" ${doDraw?ink(Math.hypot(T1[0]-S[0],T1[1]-S[1]),1.1,0):''}/>`+
          `<line x1="${S[0]}" y1="${S[1]}" x2="${T2[0]}" y2="${T2[1]}" stroke="${GOLD}" stroke-width="2.4" ${doDraw?ink(Math.hypot(T2[0]-S[0],T2[1]-S[1]),1.1,.15):''}/>`+
          (show?`<line x1="${C[0]}" y1="${C[1]}" x2="${T1[0]}" y2="${T1[1]}" stroke="${GREEN}" stroke-width="1.6"/>`+
            `<line x1="${C[0]}" y1="${C[1]}" x2="${T2[0]}" y2="${T2[1]}" stroke="${GREEN}" stroke-width="1.6"/>`+sq(C,T1,GREEN)+sq(C,T2,GREEN):'')+
          `<circle class="l419-dot" cx="${S[0]}" cy="${S[1]}" r="6" fill="${BLUE}"/>`+
          lab(S[0]-8, S[1]-8, 'P', BLUE)+
          (show?lab((S[0]+T1[0])/2-8,(S[1]+T1[1])/2, 'a', GOLD)+lab((S[0]+T2[0])/2+10,(S[1]+T2[1])/2+8, 'a', GOLD):'')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].eq=!CHS[k].eq;chRender(0);}catch(e){}">${show?'Скрыть радиусы':'Показать, почему равны'}</button>
        ${note('Две касательные','Отрезки от внешней точки до точек касания равны. Два прямоугольных треугольника с общей гипотенузой OP — близнецы.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[['OP общая','гипотенуза',BLUE],['два угла 90°','радиус ⊥ касательная',GREEN],['треугольники равны','катеты-касательные = ',GOLD]].map((r,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${r[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><span>${r[0]}</span><b style="color:${r[2]}">${r[1]}</b></div>`).join('')}
        </div>
        ${note('Не зубри «равны»','Нарисуй два радиуса, два квадратика, общую гипотенузу. Равенство треугольников само скажет, что отрезки равны.')}
      </div>`;
    } else if(step===5){
      const A=P(200), B=P(40), V=P(130);
      h=`<div class="wv-col">
        ${frame(
          `<path d="${arcP(200,40,R)}" fill="none" stroke="${GOLD}" stroke-width="6" opacity=".8" ${doDraw?ink(R*Math.PI*200/180,1.3,0):''}/>`+
          `<path d="M ${A[0]} ${A[1]} L ${V[0]} ${V[1]} L ${B[0]} ${B[1]}" fill="none" stroke="${BLUE}" stroke-width="2.2"/>`+
          ang(A,V,B,GOLD,'вписанный')+
          `<circle class="l419-dot" cx="${V[0]}" cy="${V[1]}" r="6" fill="${BLUE}"/>`+
          lab(V[0]+10, V[1]+14, 'вершина на окружности', MUTED, 'start', 10)
        )}
        ${note('Зритель на трибуне','Вершина на ободе, стороны — хорды. Угол смотрит на дугу между концами сторон. Он берёт половину этой дуги.')}
      </div>`;
    } else if(step===6){
      const A=P(220), B=P(40), V=P(120);
      h=`<div class="wv-col">
        ${frame(
          `<path d="${arcP(220,40,R)}" fill="none" stroke="${GOLD}" stroke-width="7"/>`+
          `<path d="M ${A[0]} ${A[1]} L ${V[0]} ${V[1]} L ${B[0]} ${B[1]}" fill="none" stroke="${BLUE}" stroke-width="2.2"/>`+
          ang(A,V,B,BLUE,'40°')+
          lab(CX, CY-R-8, 'дуга 80°', GOLD)
        )}
        ${note('Половина дуги','Дуга 80° → угол 40°. Запомни фразу: вписанный берёт половину. Не саму дугу, не двойную — половину.')}
      </div>`;
    } else if(step===7){
      const A=P(220), B=P(40);
      h=`<div class="wv-col">
        ${frame(
          `<path d="${arcP(220,40,R)}" fill="none" stroke="${GOLD}" stroke-width="7"/>`+
          `<line x1="${CX}" y1="${CY}" x2="${A[0]}" y2="${A[1]}" stroke="${GOLD}" stroke-width="2.2"/>`+
          `<line x1="${CX}" y1="${CY}" x2="${B[0]}" y2="${B[1]}" stroke="${GOLD}" stroke-width="2.2"/>`+
          ang(A,C,B,GOLD,'80°')+
          `<circle cx="${CX}" cy="${CY}" r="5" fill="${GOLD}" class="l419-glow"/>`+
          lab(CX, CY+18, 'центр', MUTED)
        )}
        ${note('Из центра — вся дуга','Центральный угол равен дуге. Тот же кусок окружности: из центра 80°, с края 40°. Половина — потому что зритель дальше.')}
      </div>`;
    } else if(step===8){
      const a1=220, a2=220+arc;
      const A=P(a1), B=P(a2%360), V=P((a1+arc/2+180)%360);
      h=`<div class="wv-col">
        ${frame(
          `<path d="${arcP(a1,a2,R)}" fill="none" stroke="${GOLD}" stroke-width="7"/>`+
          `<line x1="${CX}" y1="${CY}" x2="${A[0]}" y2="${A[1]}" stroke="${GOLD}" stroke-width="1.8"/>`+
          `<line x1="${CX}" y1="${CY}" x2="${B[0]}" y2="${B[1]}" stroke="${GOLD}" stroke-width="1.8"/>`+
          `<path d="M ${A[0]} ${A[1]} L ${V[0]} ${V[1]} L ${B[0]} ${B[1]}" fill="none" stroke="${BLUE}" stroke-width="2"/>`+
          ang(A,C,B,GOLD, Math.round(arc)+'°')+
          ang(A,V,B,BLUE, Math.round(arc/2)+'°')
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">дуга
          <input type="range" min="40" max="160" value="${arc}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].arc=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${Math.round(arc)}°</b>
        </label>
        ${note('Крути дугу','Жёлтый всегда равен дуге. Голубой — всегда половина. Теорема живая: её видно, а не только заучивают.')}
      </div>`;
    } else if(step===9){
      const Lft=P(180), Rgt=P(0), Pd=P(250);
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${Lft[0]}" y1="${Lft[1]}" x2="${Rgt[0]}" y2="${Rgt[1]}" stroke="${BLUE}" stroke-width="2.6" class="l419-glow"/>`+
          `<polygon points="${Lft[0]},${Lft[1]} ${Pd[0]},${Pd[1]} ${Rgt[0]},${Rgt[1]}" fill="rgba(255,215,106,.14)" stroke="${GOLD}" stroke-width="2"/>`+
          ang(Lft,Pd,Rgt,GOLD,'90°')+
          lab((Lft[0]+Rgt[0])/2, Lft[1]+16, 'диаметр = дуга 180°', BLUE)
        )}
        ${note('Фалес','Диаметр высекает дугу 180°. Вписанный берёт половину — 90°. Любая точка на окружности (кроме концов диаметра) даёт прямой угол.')}
      </div>`;
    } else if(step===10){
      if(st.play && !window._l419iv){
        window._l419iv=setInterval(()=>{
          try{
            const k=lidKey(LV.id); CHS[k]=CHS[k]||{}; const s=CHS[k];
            s.dir=s.dir||1; s.t=(s.t==null?0.2:s.t)+0.012*s.dir;
            if(s.t>=1){ s.t=1; s.dir=-1; } if(s.t<=0){ s.t=0; s.dir=1; }
            if(LV.id===419 && LV.step===10 && s.play) chRender(0);
            else { clearInterval(window._l419iv); window._l419iv=null; }
          }catch(e){ clearInterval(window._l419iv); window._l419iv=null; }
        }, 40);
      }
      if(!st.play && window._l419iv){ clearInterval(window._l419iv); window._l419iv=null; }
      const angP=12+tP*156;
      const Pd=P(180-angP), Lft=P(180), Rgt=P(0);
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${Lft[0]}" y1="${Lft[1]}" x2="${Rgt[0]}" y2="${Rgt[1]}" stroke="${BLUE}" stroke-width="2.4"/>`+
          `<polygon points="${Lft[0]},${Lft[1]} ${Pd[0]},${Pd[1]} ${Rgt[0]},${Rgt[1]}" fill="rgba(255,215,106,.14)" stroke="${GOLD}" stroke-width="2"/>`+
          ang(Lft,Pd,Rgt,GOLD,'90°')+
          `<circle class="l419-glow" cx="${Pd[0]}" cy="${Pd[1]}" r="6" fill="${GOLD}"/>`+
          lab(Pd[0], Pd[1]-12, 'P', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].play=!CHS[k].play;chRender(0);}catch(e){}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
        ${note('Угол не ломается','P бежит, стороны качаются, 90° остаётся. Это и есть теорема: гипотенуза — диаметр ⇔ угол прямой.')}
      </div>`;
    } else if(step===11){
      const A=P(210), B=P(30), V1=P(120), V2=P(160);
      h=`<div class="wv-col">
        ${frame(
          `<path d="${arcP(210,30,R)}" fill="none" stroke="${GOLD}" stroke-width="6"/>`+
          `<path d="M ${A[0]} ${A[1]} L ${V1[0]} ${V1[1]} L ${B[0]} ${B[1]}" fill="none" stroke="${BLUE}" stroke-width="2"/>`+
          `<path d="M ${A[0]} ${A[1]} L ${V2[0]} ${V2[1]} L ${B[0]} ${B[1]}" fill="none" stroke="${GREEN}" stroke-width="2"/>`+
          ang(A,V1,B,BLUE,'α')+ang(A,V2,B,GREEN,'α')
        )}
        ${note('Один спектакль','Оба угла смотрят на одну дугу — они равны. Где бы ни сел зритель на свободной дуге, градус один.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['касательная ⊥ радиус','квадратик 90°',GREEN],
             ['две касательные из точки','отрезки равны',GOLD],
             ['вписанный = дуга / 2','зритель на ободе',BLUE],
             ['центральный = дуга','вершина в центре',GOLD],
             ['на диаметре — 90°','Фалес',GREEN]].map((x,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Связка','Пять фраз. Начни с вопроса: это касательная или угол? Потом бери нужную строчку.')}
      </div>`;
    } else if(step===13){
      const S=[40,40], T1=P(200), T2=P(330), A=P(40);
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${S[0]}" y1="${S[1]}" x2="${T1[0]}" y2="${T1[1]}" stroke="${GOLD}" stroke-width="2.3"/>`+
          `<line x1="${T1[0]}" y1="${T1[1]}" x2="${A[0]}" y2="${A[1]}" stroke="${BLUE}" stroke-width="2"/>`+
          ang(S,T1,A,GOLD,'= вписанному')+
          lab(CX, 28, 'касательная + хорда', GOLD)
        )}
        ${note('Касательная и хорда','Угол между касательной и хордой равен вписанному, который смотрит на ту же дугу. Касательная подменяет одну сторону угла.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','Это касательная? Ищи 90° и равные отрезки',GREEN],
             ['2','Это угол? Вписанный или центральный?',BLUE],
             ['3','Возьми дугу: половина или вся',GOLD],
             ['4','Диаметр → сразу 90°',MUTED]].map((x,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left">
              <b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('В карман','Дальше вопрос: касательная и радиус. Спица к дороге — какой угол?')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(
          `<line x1="30" y1="176" x2="220" y2="70" stroke="${GOLD}" stroke-width="3"/>`+
          `<line x1="${CX}" y1="${CY}" x2="${T[0]}" y2="${T[1]}" stroke="${GREEN}" stroke-width="2.4"/>`+
          sq(C,T,GREEN)+lab(T[0]+10, T[1]+16, '?', GOLD, 'start', 18)
        )}
        <div class="wv-sml">касательная и радиус в точке касания</div>
        ${note('Проверка','Перпендикулярны. Квадратик 90°. Не параллельны и не 45°.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[419]=visD419;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===419){ arr[i]=L419; f=true; break; } }
    if(!f) arr.push(L419);
  })();
})();
/* ================= УРОК 420 · Векторы: начало ================= */
(function(){
  const L420 = {
    id: 420, title: 'Векторы: начало', ico: '➡️',
    src: 'Математика · 8 класс · Геометрия 8: векторы', subj: 'math',
    explain: [
      'Загадка: чем стрелка на карте отличается от обычного отрезка? Отрезок знает только длину. Стрелка знает ещё и куда. Это и есть вектор: длина плюс направление.',
      'Вектор из A в B пишут AB⃗. A — начало, B — конец, на конце стрелка. Длина |AB⃗| — сколько километров шага. Направление — куда смотрит нос стрелки.',
      'Нажми «Оживить»: точка бежит из A в B. Это перемещение. «5 км на север» — вектор: и 5 км, и север. Скорость ветра, сила, сдвиг фигуры — всё векторы.',
      'Сложение — правило треугольника. Сделай первый шаг, от его конца второй. Сумма — стрелка из самого начала в самый конец. Как два перегона одной дороги.',
      'Подвинь ползунок: второй вектор пристраивается к концу первого, золотая диагональ растёт. Это a + b. Порядок шагов можно менять — придёшь туда же.',
      'Правило параллелограмма: приложи оба вектора к одной точке и дострой параллелограмм. Диагональ из общего начала — та же сумма. Два рисунка, один ответ.',
      'Противоположный вектор −a той же длины, но нос смотрит назад. Нажми кнопку: стрелка разворачивается. Шаг вперёд и шаг назад — ты дома.',
      'Сумма a + (−a) = 0. Нулевой вектор: длина 0, стрелки нет. На клетчатке это точка, которая никуда не ушла.',
      'Равные векторы: одна длина и одно направление. Их можно переносить параллельно — стрелка не меняется. Коллинеарные — лежат на параллельных прямых, направление может быть и назад.',
      'Координаты: из (0;0) в (x; y) пишут {x; y}. {3; 4} — шаг 3 вправо и 4 вверх. Нажми клетку или подвинь ползунки — стрелка живая.',
      'Длина по Пифагору: |a| = √(x² + y²). Для {3; 4} это √(9+16) = 5. Тот же египетский треугольник, только со стрелкой.',
      'Подвинь x и y. Число под стрелкой — длина. Когда катеты 3 и 4, длина ровно 5. Когда 6 и 8 — 10. Масштаб тот же.',
      'Перенос: равный вектор можно посадить в любую точку. Начало другое, стрелка та же. Поэтому в задачах вектор «живёт сам», без привязки к точке, если не просят.',
      'Рецепт: стрелка = длина + направление. Сумма — треугольник или параллелограмм. Минус — разворот. Координаты {x; y}, длина √(x²+y²).',
      'В карман: AB⃗ — из A в B. |AB⃗| — сколько. a + (−a) = 0. {3; 4} длиной 5. Дальше вопрос: как обозначить вектор из A в B?',
      'Ответ проверки: AB⃗. Не |AB| (это длина без направления) и не A + B.'
    ],
    check: { q: 'Как обозначают вектор из точки A в точку B?', choices: ['AB⃗', '|AB|', 'A + B', 'AB²'], ans: 0,
      exp: 'Вектор с началом A и концом B пишут AB⃗. |AB| — только длина, без направления.' },
    tasks: [
      { q: 'Чему равна сумма вектора a и противоположного ему вектора −a?', kind: 'unit', ans: 0, tol: 0,
        hints: ['Шаг вперёд и шаг назад.', 'Нулевой вектор, длина 0.'], sol: '0' },
      { q: 'Длина вектора — это…', kind: 'choice',
        choices: ['расстояние между его концами', 'его направление', 'координата x', 'удвоенная длина отрезка'], ans: 0, tol: 0,
        hints: ['Её называют модулем.', 'Сколько километров шага, без «куда».'], sol: 'расстояние между концами' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes l420ink{to{stroke-dashoffset:0}}
    @keyframes l420pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l420pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l420glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l420-ink{animation:l420ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l420-dot{transform-box:fill-box;transform-origin:center;animation:l420pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l420-pulse{animation:l420pulse 1.6s ease-in-out infinite}
    .l420-glow{animation:l420glow 1.8s ease-in-out infinite}
    .l420-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.2px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+16);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l420-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l420-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l420', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 180'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function arrow(x1,y1,x2,y2,col,w,draw){
    const dx=x2-x1, dy=y2-y1, L=Math.hypot(dx,dy)||1;
    const ux=dx/L, uy=dy/L, px=-uy, py=ux, s=9;
    const bx=x2-ux*s, by=y2-uy*s;
    const pts=`${x2},${y2} ${bx+px*5},${by+py*5} ${bx-px*5},${by-py*5}`;
    return `<line x1="${x1}" y1="${y1}" x2="${(x2-ux*6).toFixed(1)}" y2="${(y2-uy*6).toFixed(1)}" stroke="${col}" stroke-width="${w||3}" ${draw?ink(L,1.15,0):''}/>`+
      `<polygon points="${pts}" fill="${col}"/>`;
  }
  function lerp(a,b,t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]; }

  function visD420(el){
    try{ window._waveCss && _waveCss('css-l420', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'420';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw=st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const t=Math.max(0, Math.min(1, st.t==null?0.55:+st.t));
    const vx=Math.max(-6, Math.min(6, +(st.vx==null?3:st.vx)));
    const vy=Math.max(-6, Math.min(6, +(st.vy==null?4:st.vy)));
    const A=[40,130], B=[190,50];
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          `<line x1="30" y1="90" x2="110" y2="90" stroke="${BLUE}" stroke-width="3"/>`+
          lab(70, 78, 'отрезок', BLUE)+
          arrow(130,110,210,50,GOLD,3.2,doDraw)+
          lab(180, 36, open?'вектор':'?', GOLD)+
          lab(120, 160, open?'длина + направление':'чем отличаются?', MUTED)
        , '0 0 240 170')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Стрелка против отрезка','Отрезок знает только «сколько». Вектор знает ещё «куда». На карте это стрелка ветра, на чертеже — AB⃗.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          arrow(A[0],A[1],B[0],B[1],GOLD,3.4,doDraw)+
          `<circle class="l420-dot" cx="${A[0]}" cy="${A[1]}" r="6" fill="${GREEN}"/>`+
          `<circle class="l420-dot" style="animation-delay:.15s" cx="${B[0]}" cy="${B[1]}" r="6" fill="${GOLD}"/>`+
          lab(A[0]-10, A[1]+18, 'A', GREEN)+lab(B[0]+10, B[1]-8, 'B', GOLD)+
          lab(120, 28, 'AB⃗', GOLD, 'middle', 18)
        )}
        ${note('Имя вектора','Из A в B — AB⃗. Начало там, где нет стрелки. Конец — наконечник. Не перепутай: BA⃗ — это уже назад.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          arrow(A[0],A[1],B[0],B[1],GOLD,3.2,false)+
          lab(A[0], A[1]+20, 'начало', GREEN)+lab(B[0], B[1]-14, 'конец', GOLD)+
          lab(120, 100, '|AB⃗| длина', BLUE)
        )}
        <div class="wv-row" style="gap:8px;flex-wrap:wrap;justify-content:center">
          ${[['A начало',GREEN],['B конец',GOLD],['|AB⃗| модуль',BLUE]].map(x=>`<span class="wv-chip" style="border-color:${x[1]};color:${x[1]}">${x[0]}</span>`).join('')}
        </div>
        ${note('Три слова','Начало, конец, длина. Длина — сколько клеток шага. Направление — куда смотрит нос.')}
      </div>`;
    } else if(step===3){
      if(st.play && !window._l420iv){
        window._l420iv=setInterval(()=>{
          try{
            const k=lidKey(LV.id); CHS[k]=CHS[k]||{}; const s=CHS[k];
            s.w=(s.w==null?0:s.w)+0.02; if(s.w>1) s.w=0;
            if(LV.id===420 && LV.step===3 && s.play) chRender(0);
            else { clearInterval(window._l420iv); window._l420iv=null; }
          }catch(e){ clearInterval(window._l420iv); window._l420iv=null; }
        }, 40);
      }
      if(!st.play && window._l420iv){ clearInterval(window._l420iv); window._l420iv=null; }
      const w=st.w==null?0.2:+st.w;
      const P=lerp(A,B,w);
      h=`<div class="wv-col">
        ${frame(
          arrow(A[0],A[1],B[0],B[1],GOLD,3,false)+
          `<circle class="l420-glow" cx="${P[0]}" cy="${P[1]}" r="7" fill="${BLUE}"/>`+
          lab(A[0], A[1]+18, 'A', GREEN)+lab(B[0]+8, B[1]-8, 'B', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].play=!CHS[k].play;chRender(0);}catch(e){}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
        ${note('Перемещение','Точка едет по стрелке. «5 км на север» — ровно это: сколько и куда. Ветер, сила, сдвиг фигуры — те же стрелки.')}
      </div>`;
    } else if(step===4){
      const C=[A[0]+(B[0]-A[0])*t, A[1]+40];
      const D=[C[0]+(B[0]-A[0])*0.7, C[1]+(B[1]-A[1])*0.55];
      h=`<div class="wv-col">
        ${frame(
          arrow(A[0],A[1],C[0],C[1],BLUE,3,doDraw)+
          arrow(C[0],C[1],D[0],D[1],GREEN,3,false)+
          arrow(A[0],A[1],D[0],D[1],GOLD,3.2,false)+
          lab(A[0]-8, A[1]+16, 'старт', MUTED)+lab((A[0]+D[0])/2, (A[1]+D[1])/2-10, 'a+b', GOLD)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">шаг
          <input type="range" min="20" max="90" value="${Math.round(t*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;chRender(0);}catch(e){}">
        </label>
        ${note('Правило треугольника','Конец первого — начало второго. Сумма — из самого старта в самый финиш. Два перегона, одна дорога.')}
      </div>`;
    } else if(step===5){
      const O=[50,140], a=[110,-20], b=[40,-70];
      const P1=[O[0]+a[0], O[1]+a[1]], P2=[O[0]+b[0], O[1]+b[1]], P3=[O[0]+a[0]+b[0], O[1]+a[1]+b[1]];
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${O[0]},${O[1]} ${P1[0]},${P1[1]} ${P3[0]},${P3[1]} ${P2[0]},${P2[1]}" fill="rgba(255,215,106,.1)" stroke="#3d5c49" stroke-width="1.4"/>`+
          arrow(O[0],O[1],P1[0],P1[1],BLUE,3,doDraw)+
          arrow(O[0],O[1],P2[0],P2[1],GREEN,3,false)+
          arrow(O[0],O[1],P3[0],P3[1],GOLD,3.4,false)+
          lab(P3[0]+8, P3[1], 'a+b', GOLD, 'start')
        )}
        ${note('Параллелограмм','Те же два вектора из одной точки. Диагональ — сумма. Совпадает с правилом треугольника: два рисунка, один ответ.')}
      </div>`;
    } else if(step===6){
      const flip=!!st.flip;
      const P1=[50,90], P2=flip?[50+(-140),90-(-40)]:[190,50];
      h=`<div class="wv-col">
        ${frame(
          arrow(P1[0],P1[1], flip? (P1[0]-140):(190), flip?(P1[1]+40):50, flip?RED:GOLD, 3.2, doDraw)+
          lab(120, 28, flip?'−a':'a', flip?RED:GOLD, 'middle', 18)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].flip=!CHS[k].flip;chRender(0);}catch(e){}">${flip?'Вернуть a':'Показать −a'}</button>
        ${note('Разворот','Противоположный вектор той же длины, но нос назад. Как развернуться на месте и пройти тот же путь обратно.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${frame(
          arrow(40,90,190,50,GOLD,3,doDraw)+
          arrow(190,50,40,90,RED,3,false)+
          `<circle class="l420-glow" cx="40" cy="90" r="8" fill="${GREEN}"/>`+
          lab(120, 28, 'a + (−a) = 0', GOLD, 'middle', 16)
        )}
        ${note('Домой','Шаг вперёд и шаг назад. Осталась точка. Нулевой вектор: длина 0, направления нет.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${frame(
          arrow(30,50,120,30,GOLD,2.8,doDraw)+
          arrow(50,140,140,120,GOLD,2.8,false)+
          arrow(160,70,160,150,BLUE,2.8,false)+
          lab(80, 18, 'равные', GOLD)+lab(178, 110, 'коллинеарные', BLUE, 'start', 11)
        )}
        ${note('Равные и коллинеарные','Равные — одна длина и одно направление, можно переносить. Коллинеарные — на параллельных прямых, можно и в разные стороны.')}
      </div>`;
    } else if(step===9){
      const O=[50,150], S=14;
      const Q=[O[0]+vx*S, O[1]-vy*S];
      let grid='';
      for(let i=0;i<=8;i++) grid+=`<line x1="${O[0]+i*S}" y1="${O[1]-8*S}" x2="${O[0]+i*S}" y2="${O[1]}" stroke="#1e3328"/>`+
        `<line x1="${O[0]}" y1="${O[1]-i*S}" x2="${O[0]+8*S}" y2="${O[1]-i*S}" stroke="#1e3328"/>`;
      h=`<div class="wv-col">
        ${frame(
          grid+
          arrow(O[0],O[1],Q[0],Q[1],GOLD,3,doDraw)+
          lab(Q[0]+8, Q[1], '{'+vx+'; '+vy+'}', GOLD, 'start')
        )}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">x
            <input type="range" min="-6" max="6" value="${vx}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].vx=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE}">${vx}</b></label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">y
            <input type="range" min="-6" max="6" value="${vy}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].vy=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GREEN}">${vy}</b></label>
        </div>
        ${note('Координаты','{x; y} — шаг по клеткам вправо и вверх. Минус — влево и вниз. Стрелка растёт из начала координат.')}
      </div>`;
    } else if(step===10){
      const O=[50,150], S=14;
      const Q=[O[0]+Math.abs(vx)*S, O[1]-Math.abs(vy)*S];
      const len=Math.sqrt(vx*vx+vy*vy);
      h=`<div class="wv-col">
        ${frame(
          arrow(O[0],O[1],Q[0],Q[1],GOLD,3.2,doDraw)+
          `<line x1="${O[0]}" y1="${O[1]}" x2="${Q[0]}" y2="${O[1]}" stroke="${BLUE}" stroke-width="2" stroke-dasharray="5 4"/>`+
          `<line x1="${Q[0]}" y1="${O[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="${GREEN}" stroke-width="2" stroke-dasharray="5 4"/>`+
          lab((O[0]+Q[0])/2, O[1]+16, '|x|='+Math.abs(vx), BLUE)+
          lab(Q[0]+10, (O[1]+Q[1])/2, '|y|='+Math.abs(vy), GREEN, 'start')+
          lab(120, 28, '|a|=√('+vx+'²+'+vy+'²)='+(Math.round(len*100)/100).toString().replace('.',','), GOLD)
        )}
        ${note('Пифагор со стрелкой','Катеты — координаты, гипотенуза — длина. {3; 4} даёт 5. Тот же треугольник, который уже знаком.')}
      </div>`;
    } else if(step===11){
      const O=[50,150], S=14;
      const Q=[O[0]+Math.abs(vx)*S, O[1]-Math.abs(vy)*S];
      const len=Math.sqrt(vx*vx+vy*vy);
      h=`<div class="wv-col">
        ${frame(
          arrow(O[0],O[1],Q[0],Q[1],GOLD,3,doDraw)+
          `<line x1="${O[0]}" y1="${O[1]}" x2="${Q[0]}" y2="${O[1]}" stroke="${BLUE}" stroke-width="2" stroke-dasharray="4 3"/>`+
          `<line x1="${Q[0]}" y1="${O[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="${GREEN}" stroke-width="2" stroke-dasharray="4 3"/>`+
          lab(Q[0]+8, Q[1], '{'+vx+'; '+vy+'}', GOLD, 'start')+
          lab(120, 28, '|a| = '+(Math.round(len*100)/100).toString().replace('.',','), GREEN, 'middle', 16)
        )}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">x
            <input type="range" min="-6" max="6" value="${vx}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].vx=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE}">${vx}</b></label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">y
            <input type="range" min="-6" max="6" value="${vy}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].vy=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GREEN}">${vy}</b></label>
        </div>
        <div class="wv-ans" style="font-size:15px">|{${vx}; ${vy}}| = ${(Math.round(Math.sqrt(vx*vx+vy*vy)*100)/100).toString().replace('.',',')}</div>
        ${note('Крути катеты','Длина меняется сразу. Поймай 3 и 4 — снова 5. Поймай 6 и 8 — 10. Масштаб тот же.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${frame(
          arrow(30,50,110,30,GOLD,2.8,doDraw)+
          arrow(80,130,160,110,GOLD,2.8,false)+
          arrow(140,70,220,50,GOLD,2.8,false)+
          lab(120, 160, 'равные: переноси куда хочешь', MUTED)
        )}
        ${note('Свободный вектор','Начало можно посадить в любую точку. Стрелка не меняется. Поэтому в задачах часто рисуют вектор «сам по себе».')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','Стрелка = длина + направление',GOLD],
             ['2','Сумма: треугольник или параллелограмм',BLUE],
             ['3','Минус — разверни нос',RED],
             ['4','{x; y} и √(x²+y²)',GREEN]].map((x,i)=>
            `<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
              <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала нарисуй стрелку, потом решай. Координаты — если есть сетка. Сумма — если два перемещения подряд.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${frame(
          arrow(40,120,190,50,GOLD,3.4,doDraw)+
          lab(40, 140, 'A', GREEN)+lab(198, 44, 'B', GOLD)+
          lab(120, 28, 'AB⃗', GOLD, 'middle', 22)
        )}
        ${note('В карман','Из A в B — AB⃗. Длина — |AB⃗|. Сумма с противоположным — ноль. {3; 4} длиной 5.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${frame(
          arrow(40,110,190,50,GOLD,3.4,doDraw)+
          lab(40, 130, 'A', GREEN)+lab(198, 44, 'B', GOLD)+
          lab(120, 28, 'как назвать?', MUTED)
        )}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">? ⃗</div>
        ${note('Проверка','AB⃗. Не |AB| — это только длина. Не A+B — точки не складывают как векторы без стрелок.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[420]=visD420;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===420){ arr[i]=L420; f=true; break; } }
    if(!f) arr.push(L420);
  })();
})();
/* ================= УРОК 421 · Уравнения в целых числах ================= */
(function(){
  const L421 = {
    id: 421, title: 'Уравнения в целых числах', ico: '🔢',
    src: 'Математика · 8 класс · Олимп-8: уравнения в целых', subj: 'math',
    explain: [
      'Загадка: найди все пары целых чисел, которые в произведении дают 6. Не любые числа — только целые: … −2, −1, 0, 1, 2 … Сейчас разложим шестёрку по кирпичикам.',
      'Целое число — это точка на прямой без дырок между «минус два» и «два». Дроби вроде 1,5 сюда не входят. Если x и y оба целые, пару (x; y) можно поставить на клетчатую бумагу.',
      'Шестёрку можно сложить прямоугольником из клеточек: 1×6, 2×3, 3×2, 6×1. Каждый прямоугольник — пара (x; y). Порядок важен: (2; 3) и (3; 2) — разные решения.',
      'Нажми «Следующая пара»: положительные решения выходят по одному. Их четыре. Больше положительных делителей у 6 нет — перебор короткий, ничего не забыли.',
      'Минус на минус даёт плюс. Значит (−1)·(−6) = 6 тоже подходит. Ещё четыре пары: все знаки минус. Ноль не годится: 0 · что-то = 0, а нам нужно 6.',
      'Все восемь точек на клетчатке: четыре в первом квадранте, четыре в третьем. Во втором и четвёртом произведение отрицательное — там xy = 6 не живёт.',
      'Правило: xy = n → бери все делители n. У 6 делители ±1, ±2, ±3, ±6. Нажми делитель — он станет x, а y = 6/x посчитается сам. Так перебирают все решения, не гадая.',
      'Подвигай x ползунком. Пока x — делитель шестёрки, точка сидит на клетке и y целый. Если x = 4, y = 1,5 — уже не целое, эта пара нам не нужна.',
      'Другое уравнение: xy = 0. Произведение ноль — значит хотя бы один множитель ноль. Целые решения: вся ось x (y = 0) и вся ось y (x = 0). Крест на клетчатке, точек бесконечно.',
      'Линейное: x + 2y = 5. Выразим x = 5 − 2y. Берём любое целое y — x получается целым. y = 0 → x = 5; y = 1 → x = 3; y = 2 → x = 1; y = −1 → x = 7.',
      'Подвигай y. Точка прыгает по прямой с клетки на клетку. Прямая не кончается — решений столько, сколько целых чисел. Это уже не восемь, а бесконечность.',
      'Почему у xy = 6 решений мало, а у x + 2y = 5 много? Произведение фиксирует площадь — прямоугольников с площадью 6 из целых сторон мало. Сумма — это прямая, она пересекает бесконечно много клеток.',
      'На олимпиаде пишут «найди все целые решения». Три ящика: произведение равно числу — делители; произведение ноль — крест осей; линейное — вырази одну букву через другую и беги по целым.',
      'Бонус: x² + y² = 25. Это окружность радиуса 5. Целые точки на ней: (±3; ±4), (±4; ±3), (±5; 0), (0; ±5) — и все комбинации знаков. Снова перебор, но уже по клеткам круга.',
      'Рецепт в карман: целое = клетка. xy = n — делители. xy = 0 — ноль в одном из множителей. x + by = c — любое целое для одной буквы. Дальше проверка: сколько положительных пар у xy = 6?',
      'Ответ, который ждёт проверка: четыре положительные пары. (1;6), (2;3), (3;2), (6;1). Отрицательные — отдельно, их тоже четыре, всего восемь.'
    ],
    check: { q: 'Сколько положительных целых пар (x; y) с xy = 6?', choices: ['4', '2', '6', '3'], ans: 0,
      exp: '(1;6), (2;3), (3;2), (6;1) — четыре пары. Отрицательные не считаем: вопрос про положительные.' },
    tasks: [
      { q: 'Целое решение x + 2y = 5 при y = 1: чему равен x?', kind: 'unit', ans: 3, tol: 0,
        hints: ['x = 5 − 2y.', 'Подставь y = 1: 5 − 2 = 3.'], sol: 'x = 5 − 2·1 = 3' },
      { q: 'Уравнение xy = 0 в целых числах означает…', kind: 'choice',
        choices: ['x = 0 или y = 0', 'x = y = 1', 'x + y = 0', 'решений нет'], ans: 0, tol: 0,
        hints: ['Ноль в произведении.', 'Хотя бы один множитель равен нулю.'], sol: 'x = 0 или y = 0' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f', PINK='#ff8ac0';
  const CSS = `<style>
    @keyframes l421ink{to{stroke-dashoffset:0}}
    @keyframes l421pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}}
    @keyframes l421pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l421glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    .l421-ink{animation:l421ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l421-dot{transform-box:fill-box;transform-origin:center;animation:l421pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l421-pulse{animation:l421pulse 1.6s ease-in-out infinite}
    .l421-glow{animation:l421glow 1.8s ease-in-out infinite}
    .l421-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.2px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+16);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l421-ink" style="animation-duration:${dur||1.3}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l421-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||11}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    try{ window._waveCss && _waveCss('css-l421', CSS); }catch(e){}
    return `${CSS}<svg viewBox="${vb||'0 0 240 200'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  const POS=[[1,6],[2,3],[3,2],[6,1]];
  const NEG=[[-1,-6],[-2,-3],[-3,-2],[-6,-1]];
  function G(x,y){ return [120+x*14, 100-y*12]; }
  function grid(xmin,xmax,ymin,ymax){
    let d='';
    for(let x=xmin;x<=xmax;x++){ const a=G(x,ymin), b=G(x,ymax); d+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#1e3328" stroke-width="1"/>`; }
    for(let y=ymin;y<=ymax;y++){ const a=G(xmin,y), b=G(xmax,y); d+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#1e3328" stroke-width="1"/>`; }
    const o=G(0,0), L=G(xmin,0), R=G(xmax,0), Dn=G(0,ymin), Up=G(0,ymax);
    d+=`<line x1="${L[0]}" y1="${L[1]}" x2="${R[0]}" y2="${R[1]}" stroke="#3d5c49" stroke-width="1.6"/>`;
    d+=`<line x1="${Dn[0]}" y1="${Dn[1]}" x2="${Up[0]}" y2="${Up[1]}" stroke="#3d5c49" stroke-width="1.6"/>`;
    d+=lab(R[0]+10, R[1]+4, 'x', MUTED, 'start', 11)+lab(Up[0]+8, Up[1]+4, 'y', MUTED, 'start', 11);
    return d;
  }
  function pt(x,y,col,name,delay,pop){
    const p=G(x,y);
    return `<g>
      <circle ${pop?'class="l421-dot"':''} style="animation-delay:${delay||0}s" cx="${p[0]}" cy="${p[1]}" r="6" fill="${col}" class="l421-glow"/>
      ${name?lab(p[0], p[1]-10, name, col, 'middle', 10):''}
    </g>`;
  }
  function rectCells(w,h,x0,y0,col,draw){
    const s=12;
    return `<g>
      <rect x="${x0}" y="${y0}" width="${w*s}" height="${h*s}" fill="${col}22" stroke="${col}" stroke-width="2" ${draw?ink(2*(w+h)*s,1.1,0):''}/>
      ${lab(x0+w*s/2, y0-6, w+' × '+h, col)}
    </g>`;
  }

  function visD421(el){
    try{ window._waveCss && _waveCss('css-l421', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'421';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw = st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const shown=Math.max(0, Math.min(4, st.n==null?0:+st.n));
    const xv=Math.max(-8, Math.min(8, +(st.x==null?2:st.x)));
    const yv=Math.max(-1, Math.min(4, +(st.y==null?1:st.y)));
    const pick=st.pick;
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          lab(120, 36, 'xy = 6', GOLD, 'middle', 22)+
          `<rect x="40" y="58" width="160" height="70" rx="10" fill="${BLUE}18" stroke="${BLUE}" stroke-width="2" ${doDraw?ink(460,1.2,0):''}/>`+
          lab(120, 90, open?'8 целых пар':'сколько пар?', open?GREEN:GOLD, 'middle', 16)+
          lab(120, 112, open?'4 плюс и 4 минус':'x, y — целые', MUTED)+
          lab(120, 170, 'не любые числа — только клетки', MUTED)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Загадка','Нужны пары целых, которые в произведении дают 6. Дроби не берём. Сейчас разложим шестёрку по прямоугольникам и расставим точки на клетчатке.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          `<line x1="24" y1="100" x2="216" y2="100" stroke="#3d5c49" stroke-width="2"/>`+
          [-4,-3,-2,-1,0,1,2,3,4].map((n,i)=>{
            const x=120+n*22;
            return `<circle class="l421-dot" style="animation-delay:${i*.05}s" cx="${x}" cy="100" r="${n===0?5:4}" fill="${n===0?GOLD:BLUE}"/>`+lab(x, 122, String(n), n===0?GOLD:MUTED);
          }).join('')+
          lab(120, 50, 'целые — точки без дырок', GOLD)
        )}
        ${note('Что такое целое','Между −2 и −1 нет других целых. 1,5 на эту прямую не садится. Поэтому решений «на глаз» мало: только клетки тетради.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${frame(
          rectCells(1,6,16,28,BLUE,doDraw)+
          rectCells(2,3,40,64,GREEN,doDraw)+
          rectCells(3,2,78,88,GOLD,doDraw)+
          rectCells(6,1,128,118,PINK,doDraw)
        , '0 0 240 160')}
        ${note('Прямоугольники площади 6','Каждый прямоугольник из целых сторон — пара (ширина; высота). 2×3 и 3×2 разные: x и y поменялись местами. Уже четыре картинки.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:340px">
          ${POS.map((p,i)=> i<shown
            ? `<div class="wv-pop" style="text-align:center;background:rgba(127,209,255,.1);border:2px solid ${BLUE};border-radius:10px;padding:8px 12px;min-width:72px">
                <div style="font-size:18px;color:${GOLD};font-family:Georgia,serif">(${p[0]}; ${p[1]})</div>
                <div class="wv-sml">${p[0]} · ${p[1]} = 6</div>
              </div>`
            : `<div style="min-width:72px;height:58px;border:1px dashed #3d5c49;border-radius:10px"></div>`
          ).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].n=Math.min(4,(CHS[k].n||0)+1);chRender(0);}catch(e){}">${shown>=4?'Все четыре':'Следующая пара'}</button>
        ${note('Положительные','Делители 6 справа: 1, 2, 3, 6. Каждому x свой y = 6/x. Больше положительных нет — перебор кончился.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          grid(-7,7,-7,7)+
          NEG.map((p,i)=>pt(p[0], p[1], PINK, '('+p[0]+';'+p[1]+')', i*.08, doDraw)).join('')
        )}
        ${note('Минус на минус','(−2)·(−3) = 6. Знаки одинаковые — произведение плюс. Ноль не подходит: 0 · y = 0, а нам нужно 6. Ещё четыре точки, уже в третьем квадранте.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(
          grid(-7,7,-7,7)+
          POS.map((p,i)=>pt(p[0], p[1], BLUE, '', i*.06, doDraw)).join('')+
          NEG.map((p,i)=>pt(p[0], p[1], PINK, '', .2+i*.06, doDraw)).join('')+
          lab(168, 36, '8 точек', GOLD)
        )}
        ${note('Карта всех решений','Сверху справа — плюс на плюс. Снизу слева — минус на минус. Смешанные знаки дают отрицательное произведение, их нет.')}
      </div>`;
    } else if(step===6){
      const divs=[-6,-3,-2,-1,1,2,3,6];
      const cur=divs.indexOf(pick)>=0?pick:null;
      const yy=cur!=null?6/cur:null;
      h=`<div class="wv-col">
        ${frame(
          grid(-7,7,-7,7)+
          (cur!=null?pt(cur, yy, GOLD, '('+cur+'; '+yy+')', 0, true):'')
        )}
        <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:center;max-width:340px">
          ${divs.map(d=>`<button type="button" class="btn" style="padding:8px 10px;border:2px solid ${cur===d?GOLD:'#3d5c49'}"
            onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].pick=${d};chRender(0);}catch(e){}">${d}</button>`).join('')}
        </div>
        ${note('Жми делитель','x — это кнопка, y = 6/x считается сам. Так на олимпиаде и пишут: «переберём делители n». Не забудь минусы.')}
      </div>`;
    } else if(step===7){
      const ok=[-6,-3,-2,-1,1,2,3,6].indexOf(xv)>=0;
      const yy=ok?6/xv:6/xv;
      h=`<div class="wv-col">
        ${frame(
          grid(-8,8,-8,8)+
          pt(xv, Math.max(-8, Math.min(8, yy)), ok?GOLD:RED, ok?('y='+yy):'y не целое', 0, false)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">x
          <input type="range" min="-8" max="8" value="${xv}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].x=+this.value;chRender(0);}catch(e){}">
          <b style="color:${ok?GOLD:RED};min-width:18px">${xv}</b>
        </label>
        <div class="wv-ans" style="font-size:15px">${xv} · y = 6  →  y = ${ok?yy: (Math.round(yy*100)/100).toString().replace('.',',')} ${ok?'✔ целое':' — не целое'}</div>
        ${note('Фильтр','Ползунок бежит по всем целым x. Зелёный — делитель, точка на клетке. Красный — y дробный, пару выкидываем.')}
      </div>`;
    } else if(step===8){
      const o=G(0,0), L=G(-8,0), R=G(8,0), Dn=G(0,-8), Up=G(0,8);
      h=`<div class="wv-col">
        ${frame(
          grid(-8,8,-8,8)+
          `<line x1="${L[0]}" y1="${L[1]}" x2="${R[0]}" y2="${R[1]}" stroke="${GOLD}" stroke-width="5" opacity=".85" ${doDraw?ink(224,1.2,0):''}/>`+
          `<line x1="${Dn[0]}" y1="${Dn[1]}" x2="${Up[0]}" y2="${Up[1]}" stroke="${GREEN}" stroke-width="5" opacity=".85" ${doDraw?ink(192,1.2,.15):''}/>`+
          `<circle cx="${o[0]}" cy="${o[1]}" r="7" fill="${BLUE}" class="l421-glow"/>`+
          lab(200, 108, 'y = 0', GOLD, 'start')+lab(128, 18, 'x = 0', GREEN)
        )}
        ${note('Произведение ноль','xy = 0 — крест. Любая точка на осях. Бесконечно много решений, потому что ось — это бесконечная линейка клеток.')}
      </div>`;
    } else if(step===9){
      const ys=[-1,0,1,2];
      h=`<div class="wv-col">
        <div class="wv-ans" style="font-size:18px">x + 2y = 5  →  x = 5 − 2y</div>
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${ys.map((y,i)=>{
            const x=5-2*y;
            return `<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${BLUE};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
              <span>y = ${y}</span><b style="color:${GOLD}">x = ${x}</b>
            </div>`;
          }).join('')}
        </div>
        ${note('Выразили x','Одно целое выбрал сам — второе посчиталось. Никакого разложения на множители. Это другой ящик приёмов.')}
      </div>`;
    } else if(step===10){
      const xx=5-2*yv;
      const p1=G(-7, (5-(-7))/2), p2=G(7, (5-7)/2);
      h=`<div class="wv-col">
        ${frame(
          grid(-8,8,-4,6)+
          `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(220,1.3,0):''}/>`+
          [-1,0,1,2,3].map(y=>pt(5-2*y, y, BLUE, '', 0, false)).join('')+
          pt(xx, yv, GOLD, '('+xx+'; '+yv+')', 0, true)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">y
          <input type="range" min="-1" max="4" value="${yv}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].y=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD};min-width:18px">${yv}</b>
        </label>
        <div class="wv-ans" style="font-size:15px">x = 5 − 2·${yv} = ${xx}</div>
        ${note('Прыжок по прямой','Точка не сходит с золотой прямой и всегда на клетке. Крути y — решений не кончится.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${frame(
          grid(-8,8,-7,7)+
          POS.map(p=>pt(p[0], p[1], BLUE, '', 0, doDraw)).join('')+
          NEG.map(p=>pt(p[0], p[1], PINK, '', .1, doDraw)).join('')+
          lab(170, 28, 'xy=6 · 8 точек', BLUE)+
          [-1,0,1,2,3].map(y=>pt(5-2*y, y, GOLD, '', .2, doDraw)).join('')
        )}
        ${note('Мало против много','Синие и розовые — площадь 6, их восемь. Золотые — сумма, их бесконечно (на рисунке шесть, остальные за кадром). Разные уравнения — разная геометрия.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['xy = n','перебери делители n','#7fd1ff'],
            ['xy = 0','крест: x=0 или y=0','#8fd1a8'],
            ['x + by = c','вырази и беги по целым','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8">
            <b style="color:${x[2]};font-family:Georgia,serif">${x[0]}</b><span>${x[1]}</span>
          </div>`).join('')}
        </div>
        ${note('Три ящика','Сначала узнай тип. Потом один приём. Не смешивай: для произведения не нужна прямая, для линейного не нужны делители.')}
      </div>`;
    } else if(step===13){
      const circ=[[5,0],[-5,0],[0,5],[0,-5],[3,4],[3,-4],[-3,4],[-3,-4],[4,3],[4,-3],[-4,3],[-4,-3]];
      h=`<div class="wv-col">
        ${frame(
          grid(-6,6,-6,6)+
          `<circle cx="120" cy="100" r="${5*14}" fill="none" stroke="${GOLD}" stroke-width="1.8" ${doDraw?ink(5*14*2*Math.PI,1.5,0):''}/>`+
          circ.map((p,i)=>pt(p[0], p[1], BLUE, '', i*.04, doDraw)).join('')
        )}
        ${note('Круг на клетках','x² + y² = 25 — окружность радиуса 5. Целые точки: оси и «египетский» 3-4-5. Снова перебор, только по кругу.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Целое = клетка тетради','#7fd1ff'],
            ['2','Произведение → делители','#8fd1a8'],
            ['3','Ноль в произведении → крест','#ffd76a'],
            ['4','Линейное → вырази и шагай','#ff8ac0']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span>
          </div>`).join('')}
        </div>
        ${note('В карман','Дальше короткий вопрос: сколько положительных пар у xy = 6? Четыре прямоугольника — четыре пары.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div style="font-size:22px;color:${GOLD};font-family:Georgia,serif">xy = 6,  x>0, y>0</div>
        <div class="wv-sml">прямоугольники 1×6, 2×3, 3×2, 6×1</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">сколько пар?</div>
        ${note('Проверка','Положительные делители 6 — четыре штуки. Каждому x свой y. Отрицательные вопрос не просит.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[421]=visD421;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===421){ arr[i]=L421; f=true; break; } }
    if(!f) arr.push(L421);
  })();
})();
/* ================= УРОК 422 · Неравенство Коши и средние ================= */
(function(){
  const L422 = {
    id: 422, title: 'Неравенство Коши и средние', ico: '⚖️',
    src: 'Математика · 8 класс · Олимп-8: Коши', subj: 'math',
    explain: [
      'Загадка: два числа, 4 и 9. Какое «среднее» между ними честнее — середина отрезка или сторона квадрата той же площади, что прямоугольник 4 на 9? Сейчас оба средних появятся на рисунке.',
      'Среднее арифметическое — как уравнять две кучки. Сложи 4 и 9, раздели пополам: (4+9)/2 = 6,5. Это середина отрезка от 4 до 9. Обычная «середина».',
      'Среднее геометрическое — сторона квадрата с той же площадью, что прямоугольник 4×9. Площадь 36, сторона √36 = 6. Клеточки те же, форма другая.',
      'Сравни: 6,5 и 6. Арифметическое не меньше геометрического. Для 4 и 9 разрыв маленький, но он есть. Это и есть неравенство Коши: (a+b)/2 ≥ √(ab).',
      'Подвигай ползунки. Две полоски — AM сверху, GM снизу. Чем сильнее числа разъезжаются, тем выше верхняя полоска относительно нижней. Сблизь их — полоски сравняются.',
      'Равенство только когда a = b. Поставь оба ползунка на 7: (7+7)/2 = 7 и √49 = 7. Два одинаковых числа — два одинаковых средних. Квадрат совпадает с «прямоугольником».',
      'Картинка: прямоугольник a×b и квадрат со стороной (a+b)/2. У квадрата площадь больше (или равна). Поэтому среднее арифметическое «умеет» больше площади, чем произведение a·b.',
      'Почему так? Квадрат не бывает отрицательным: (√a − √b)² ≥ 0. Это площадь маленького квадратика со стороной |√a−√b|. Она либо ноль, либо плюс. Никогда минус.',
      'Раскроем: a − 2√(ab) + b ≥ 0. Перенесём: a + b ≥ 2√(ab). Поделим на 2 — получим (a+b)/2 ≥ √(ab). Одна картинка, три строчки, и теорема готова.',
      'Зачем это на олимпиаде. Минимум x + 4/x при x > 0. Возьми a = x, b = 4/x. Произведение всегда 4. По Коши сумма ≥ 2√4 = 4. Пол — число 4, ниже не прыгнуть.',
      'Подвигай x. Кривая x + 4/x никогда не опускается ниже жёлтой прямой «4». Самая нижняя точка — когда x = 4/x, то есть x = 2. Проверка: 2 + 4/2 = 4.',
      'Ещё короче: x + 1/x ≥ 2 при x > 0. Произведение = 1, два корня из единицы — это 2. Равенство при x = 1. Это любимая олимпиадная заготовка.',
      'Правило равенства: два слагаемых должны быть равны. Для x + 4/x это x = 4/x. Для x + 1/x это x = 1. Не забудь проверить, что x > 0.',
      'Если чисел больше двух, Коши тоже работает: (a+b+c)/3 ≥ ∛(abc). Идея та же: среднее арифметическое не меньше геометрического. На олимпиаде чаще всего хватает двух чисел.',
      'Рецепт: разрежь выражение на два положительных куска → перемножь их → сумма ≥ 2√(произведение) → равенство, когда куски равны. Дальше проверка: минимум x + 4/x?',
      'В карман: AM ≥ GM, равенство при a = b. Для x + c/x пол равен 2√c. У x + 4/x это 4. Сейчас короткий вопрос и две задачи.'
    ],
    check: { q: 'Чему равен минимум x + 4/x при x > 0?', choices: ['4', '2', '8', '1'], ans: 0,
      exp: 'x · (4/x) = 4, поэтому x + 4/x ≥ 2√4 = 4. Равенство при x = 2.' },
    tasks: [
      { q: 'Найди среднее геометрическое чисел 4 и 9.', kind: 'unit', ans: 6, tol: 0,
        hints: ['Это √(4 · 9).', '√36 = 6.'], sol: '√(4·9) = √36 = 6' },
      { q: 'Когда (a + b)/2 = √(ab)?', kind: 'choice',
        choices: ['когда a = b', 'когда a > b', 'когда a < b', 'никогда'], ans: 0, tol: 0,
        hints: ['Квадрат (√a−√b)² равен нулю.', 'Это бывает только при a = b.'], sol: 'когда a = b' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS = `<style>
    @keyframes l422ink{to{stroke-dashoffset:0}}
    @keyframes l422pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.14)}100%{transform:scale(1);opacity:1}}
    @keyframes l422pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l422glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    @keyframes l422grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes l422rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    .l422-ink{animation:l422ink 1.4s cubic-bezier(.2,.75,.15,1) forwards}
    .l422-dot{transform-box:fill-box;transform-origin:center;animation:l422pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l422-pulse{animation:l422pulse 1.6s ease-in-out infinite}
    .l422-glow{animation:l422glow 1.8s ease-in-out infinite}
    .l422-grow{transform-origin:left center;animation:l422grow .7s cubic-bezier(.2,.8,.2,1) both}
    .l422-rise{transform-origin:center bottom;animation:l422rise .7s cubic-bezier(.2,.8,.2,1) both}
    .l422-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+14);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l422-ink" style="animation-duration:${dur||1.35}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l422-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    return `${CSS}<svg viewBox="${vb||'0 0 240 200'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  function fmt(n){ return (Math.round(n*100)/100)%1 ? n.toFixed(2).replace('.',',') : String(Math.round(n)); }
  function AM(a,b){ return (a+b)/2; }
  function GM(a,b){ return Math.sqrt(Math.max(0,a*b)); }

  function visD422(el){
    try{ window._waveCss('css-l422', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'422';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw = st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const a = Math.max(1, Math.min(12, +(st.a==null?4:st.a)));
    const b = Math.max(1, Math.min(12, +(st.b==null?9:st.b)));
    const x = Math.max(0.5, Math.min(8, +(st.x==null?2:st.x)));
    const am=AM(a,b), gm=GM(a,b);
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          `<rect x="28" y="40" width="80" height="36" rx="6" fill="${BLUE}22" stroke="${BLUE}" stroke-width="2" ${doDraw?ink(232,1.1,0):''}/>`+
          lab(68, 64, open?'4 и 9':'?', GOLD, 'middle', 16)+
          lab(68, 92, 'два числа', MUTED)+
          `<rect x="132" y="30" width="72" height="72" rx="6" fill="${GREEN}22" stroke="${GREEN}" stroke-width="2" ${doDraw?ink(288,1.2,.15):''}/>`+
          lab(168, 70, open?'6':'?', GREEN, 'middle', 16)+
          lab(168, 112, 'сторона квадрата', MUTED)+
          lab(120, 170, open?'середина 6,5  ≥  сторона 6': 'какое среднее честнее?', GOLD)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть'}</button>
        ${note('Загадка','Одно и то же «между 4 и 9» считается двумя способами. Середина отрезка — 6,5. Квадрат площади 36 — сторона 6. Сейчас поймём, почему первое всегда не меньше второго.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          `<line x1="24" y1="110" x2="216" y2="110" stroke="#3d5c49" stroke-width="1.6"/>`+
          `<circle class="l422-dot" cx="48" cy="110" r="7" fill="${BLUE}"/>`+
          `<circle class="l422-dot" style="animation-delay:.15s" cx="192" cy="110" r="7" fill="${GREEN}"/>`+
          `<circle class="l422-dot" style="animation-delay:.3s" cx="120" cy="110" r="8" fill="${GOLD}"/>`+
          lab(48, 132, '4', BLUE)+lab(192, 132, '9', GREEN)+lab(120, 88, '6,5', GOLD)+
          `<line x1="48" y1="70" x2="192" y2="70" stroke="${GOLD}" stroke-width="5" stroke-linecap="round" class="l422-grow"/>`+
          lab(120, 58, '(4+9)/2 = 6,5', GOLD)
        )}
        ${note('Середина отрезка','Сложи и раздели пополам. Это среднее арифметическое. На прямой оно сидит ровно посередине между числами. Никакой площади пока нет — только длина.')}
      </div>`;
    } else if(step===2){
      const u=8;
      h=`<div class="wv-col">
        ${frame(
          `<g class="l422-rise"><rect x="18" y="36" width="${4*u}" height="${9*u}" fill="${BLUE}33" stroke="${BLUE}" stroke-width="2"/></g>`+
          lab(18+2*u, 28, '4 × 9 = 36', BLUE)+
          `<g class="l422-rise" style="animation-delay:.2s"><rect x="140" y="${36+(9*u-6*u)}" width="${6*u}" height="${6*u}" fill="${GREEN}33" stroke="${GREEN}" stroke-width="2"/></g>`+
          lab(140+3*u, 28, '6 × 6 = 36', GREEN)
        , '0 0 240 180')}
        ${note('Та же площадь','Прямоугольник 4 на 9 и квадрат 6 на 6 содержат по 36 клеточек. Сторона квадрата — среднее геометрическое √(4·9). Форма другая, площадь одна.')}
      </div>`;
    } else if(step===3){
      const wAM=6.5*18, wGM=6*18;
      h=`<div class="wv-col">
        ${frame(
          lab(24, 50, 'AM  6,5', BLUE, 'start')+
          `<rect x="24" y="58" width="${wAM}" height="22" rx="6" fill="${BLUE}" class="l422-grow"/>`+
          lab(24, 110, 'GM  6', GREEN, 'start')+
          `<rect x="24" y="118" width="${wGM}" height="22" rx="6" fill="${GREEN}" class="l422-grow" style="animation-delay:.15s"/>`+
          lab(120, 176, '6,5  ≥  6', GOLD)
        )}
        ${note('Коши одной картинкой','Верхняя полоска — арифметическое, нижняя — геометрическое. Верхняя не короче. Для любых положительных a и b так и будет: (a+b)/2 ≥ √(ab).')}
      </div>`;
    } else if(step===4){
      const maxv=12, scale=14;
      h=`<div class="wv-col">
        ${frame(
          lab(24, 40, 'AM  '+fmt(am), BLUE, 'start')+
          `<rect x="24" y="48" width="${am*scale}" height="20" rx="6" fill="${BLUE}"/>`+
          lab(24, 92, 'GM  '+fmt(gm), GREEN, 'start')+
          `<rect x="24" y="100" width="${gm*scale}" height="20" rx="6" fill="${GREEN}"/>`+
          lab(120, 150, fmt(am)+'  ≥  '+fmt(gm)+(Math.abs(am-gm)<0.01?'  · равны!':''), GOLD)
        )}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">a
            <input type="range" min="1" max="12" value="${a}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE};min-width:18px">${a}</b>
          </label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">b
            <input type="range" min="1" max="12" value="${b}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].b=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GREEN};min-width:18px">${b}</b>
          </label>
        </div>
        ${note('Подвигай','Разведи числа — верхняя полоска уезжает вперёд. Сведи вместе — догоняют друг друга. Неравенство живое: его видно, а не только написано.')}
      </div>`;
    } else if(step===5){
      const eq = a===b;
      const s=Math.min(10, 88/Math.max(a,b,1));
      const aw=a*s, bw=b*s;
      h=`<div class="wv-col">
        ${frame(
          `<rect x="40" y="36" width="${aw}" height="${aw}" rx="6" fill="${BLUE}33" stroke="${BLUE}" stroke-width="2"/>`+
          `<rect x="${130}" y="36" width="${bw}" height="${bw}" rx="6" fill="${GREEN}33" stroke="${GREEN}" stroke-width="2"/>`+
          lab(40+aw/2, 28, 'a='+a, BLUE)+lab(130+bw/2, 28, 'b='+b, GREEN)+
          lab(120, 176, eq?'a = b  →  AM = GM':'a ≠ b  →  AM > GM', eq?GREEN:GOLD)
        )}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">a
            <input type="range" min="1" max="12" value="${a}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE}">${a}</b>
          </label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">b
            <input type="range" min="1" max="12" value="${b}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].b=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GREEN}">${b}</b>
          </label>
        </div>
        ${note('Когда равно','Поставь оба на одно число. Квадраты совпадут, средние совпадут. Это единственный случай равенства. Запомни: Коши «равно» значит «числа одинаковые».')}
      </div>`;
    } else if(step===6){
      const s=8, aw=4*s, ah=9*s, side=AM(4,9)*s;
      h=`<div class="wv-col">
        ${frame(
          `<rect x="16" y="30" width="${aw}" height="${ah}" fill="${BLUE}28" stroke="${BLUE}" stroke-width="2" ${doDraw?ink(2*(aw+ah),1.2,0):''}/>`+
          lab(16+aw/2, 22, 'прямоугольник', BLUE)+
          `<rect x="120" y="${30+ah-side}" width="${side}" height="${side}" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2" ${doDraw?ink(4*side,1.2,.2):''}/>`+
          lab(120+side/2, 22, 'квадрат AM', GOLD)
        , '0 0 240 180')}
        ${note('Площадь квадрата больше','Сторона квадрата — среднее арифметическое 6,5. Его площадь 6,5² = 42,25 > 36. Поэтому AM «умеет» больше площади, чем произведение. Отсюда AM ≥ GM.')}
      </div>`;
    } else if(step===7){
      const side=70;
      h=`<div class="wv-col">
        ${frame(
          `<rect x="85" y="40" width="${side}" height="${side}" fill="${GOLD}22" stroke="${GOLD}" stroke-width="2.4" class="l422-glow" ${doDraw?ink(4*side,1.3,0):''}/>`+
          lab(120, 78, '(√a − √b)²', GOLD, 'middle', 14)+
          lab(120, 130, '≥ 0', GREEN, 'middle', 18)+
          lab(120, 170, 'площадь не бывает отрицательной', MUTED)
        )}
        ${note('Квадрат неотрицателен','Сторона |√a − √b|. Если a и b разные — квадратик живой. Если одинаковые — схлопывается в точку, площадь 0. Минуса не существует. Это весь секрет доказательства.')}
      </div>`;
    } else if(step===8){
      const show=Math.max(0, Math.min(4, st.pr==null?0:+st.pr));
      const rows=[
        ['(√a − √b)² ≥ 0','квадрат ≥ 0',GOLD],
        ['a − 2√(ab) + b ≥ 0','раскрыли скобки',BLUE],
        ['a + b ≥ 2√(ab)','перенесли','#8fd1a8'],
        ['(a+b)/2 ≥ √(ab)','разделили на 2',GOLD]
      ];
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${rows.map((r,i)=> i<show
            ? `<div class="wv-pop" style="display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${r[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8;text-align:left"><b style="color:${r[2]};font-family:Georgia,serif">${r[0]}</b><span>${r[1]}</span></div>`
            : `<div style="height:42px;border:1px dashed #3d5c49;border-radius:10px"></div>`
          ).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].pr=Math.min(4,(CHS[k].pr||0)+1);chRender(0);}catch(e){}">${show>=4?'Готово':'Следующая строка'}</button>
        ${note('Три хода','Не зубри формулу. Нарисуй квадрат, раскрой, перенеси, раздели. На олимпиаде это пишут за 20 секунд.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        <div style="font-size:22px;color:${GOLD};font-family:Georgia,serif">(a + b)/2  ≥  √(ab)</div>
        <div class="wv-sml">для a > 0, b > 0 · равенство ⇔ a = b</div>
        ${note('Формула','Слева — обычная середина. Справа — сторона квадрата той же площади. Слева никогда не меньше. Если нужно, подставь 4 и 9: 6,5 ≥ 6.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        <div class="wv-ans" style="font-size:18px">x + 4/x ,  x > 0</div>
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[
            ['a = x,  b = 4/x','два куска',BLUE],
            ['a · b = 4','произведение всегда 4',GREEN],
            ['x + 4/x ≥ 2√4 = 4','пол минимума',GOLD]
          ].map((r,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${r[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><span>${r[0]}</span><b style="color:${r[2]}">${r[1]}</b></div>`).join('')}
        </div>
        ${note('Олимпиадный ход','Не бери производную. Разрежь на два положительных куска с постоянным произведением — Коши сразу даёт пол. Здесь пол = 4.')}
      </div>`;
    } else if(step===11){
      const val=x+4/x;
      const pts=[];
      for(let t=0.5;t<=8.01;t+=0.12){
        const px=20+t*24, py=170-Math.min(12, t+4/t)*18;
        pts.push([px,py]);
      }
      let plen=0; for(let i=1;i<pts.length;i++) plen+=Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
      const d='M '+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L ');
      const px=20+x*24, py=170-Math.min(12,val)*18;
      const y4=170-4*18;
      h=`<div class="wv-col">
        ${frame(
          `<line x1="20" y1="${y4}" x2="220" y2="${y4}" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="5 4"/>`+
          lab(226, y4+4, '4', GOLD, 'start')+
          `<path d="${d}" fill="none" stroke="${BLUE}" stroke-width="2.4" ${doDraw?ink(plen,1.6,0):''}/>`+
          `<circle cx="${px}" cy="${py}" r="6.5" fill="${GOLD}" class="l422-glow"/>`+
          lab(px, py-12, fmt(val), GOLD)+
          lab(20, 188, '0', MUTED)+lab(212, 188, 'x', MUTED)
        )}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">x
          <input type="range" min="5" max="80" value="${Math.round(x*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].x=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${BLUE}">${fmt(x)}</b>
        </label>
        <div class="wv-ans" style="font-size:15px">x + 4/x = ${fmt(val)}  ≥  4</div>
        ${note('Кривая не пробивает пол','Жёлтая пунктир — минимум 4. Точка ездит по кривой и никогда не падает ниже. В самом низу x = 2.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px);font-family:Georgia,serif">
          ${[
            ['x = 4/x','куски равны'],
            ['x² = 4','x > 0'],
            ['x = 2','единственная точка'],
            ['2 + 4/2 = 4','минимум пойман']
          ].map((r,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px;font-size:15px;color:#e8dcc8"><span>${r[0]}</span><b style="color:${GOLD}">${r[1]}</b></div>`).join('')}
        </div>
        ${note('Где равенство','Коши даёт пол. Равенство говорит, в какой точке пол достигается. Без этой проверки знаешь только «не меньше 4», но не знаешь «бывает ли 4».')}
      </div>`;
    } else if(step===13){
      const val=x+1/x;
      h=`<div class="wv-col">
        <div class="wv-ans" style="font-size:20px">x + 1/x  ≥  2</div>
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">x
          <input type="range" min="5" max="80" value="${Math.round(x*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].x=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${BLUE}">${fmt(x)}</b>
        </label>
        <div class="wv-sml">${fmt(x)} + 1/${fmt(x)} = ${fmt(val)}  ≥  2 ${Math.abs(val-2)<0.05?' · равенство!':''}</div>
        ${note('Заготовка','Произведение x · (1/x) = 1. Два корня из 1 — это 2. Равенство при x = 1. Эту строчку на олимпиаде пишут, не думая.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Разрежь на два положительных куска','#7fd1ff'],
            ['2','Перемножь — часто получается константа','#8fd1a8'],
            ['3','Сумма ≥ 2√(произведение)','#ffd76a'],
            ['4','Равенство, когда куски равны','#e86a5a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span>
          </div>`).join('')}
        </div>
        ${note('Три числа','Если вдруг три слагаемых: (a+b+c)/3 ≥ ∛(abc). Та же музыка, другой корень. Для восьмого класса почти всегда хватает двух.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div style="font-size:22px;color:${GOLD};font-family:Georgia,serif">x + 4/x ≥ ?</div>
        <div class="wv-sml">произведение = 4 ·  2√4 = …</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">минимум = ?</div>
        ${note('В карман','AM ≥ GM. Для x + c/x пол равен 2√c. Здесь c = 4, пол = 4. Дальше проверка и две задачи.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[422]=visD422;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===422){ arr[i]=L422; f=true; break; } }
    if(!f) arr.push(L422);
  })();
})();
/* ================= УРОК 423 · Теорема Виета на олимпиадах ================= */
(function(){
  const L423 = {
    id: 423, title: 'Теорема Виета на олимпиадах', ico: '🌿',
    src: 'Математика · 8 класс · Олимп-8: Виета', subj: 'math',
    explain: [
      'Загадка: два числа. Если их сложить — 5, если перемножить — 6. Какие это числа? Не решай уравнение, просто подбери. Сейчас увидим, зачем эта пара живёт внутри квадратного уравнения.',
      'Отметим оба числа на прямой. От нуля до первого — один отрезок, дальше до второго — другой. Вместе они дают 5. Сумма — это просто «сколько шагов всего».',
      'Произведение удобно видеть как площадь. Прямоугольник 2 на 3: внутри ровно 6 клеточек. Сумма живёт на прямой, произведение — в прямоугольнике. Два взгляда на одну пару.',
      'Если x равен одному из чисел, скобка (x − 2) становится нулём. То же для (x − 3). Произведение скобок равно нулю как раз в корнях. Это и есть уравнение (x − 2)(x − 3) = 0.',
      'Раскроем скобки по клеткам: x·x = x², x·(−3) = −3x, (−2)·x = −2x, (−2)·(−3) = +6. Складываем средние: −3x − 2x = −5x. Получилось x² − 5x + 6 = 0.',
      'Смотри связь: коэффициент при x — это сумма корней с минусом, свободный член — произведение. Для x² + px + q = 0: x₁ + x₂ = −p, x₁ · x₂ = q. Это теорема Виета.',
      'Подвигай корни ползунками. Парабола сама перестроится, уравнение перепишется. Сумма и произведение всегда совпадают с коэффициентами. Формулу не надо зубрить — она на экране.',
      'Проверка: подставь 2 в x² − 5x + 6. 4 − 10 + 6 = 0. Подставь 3: 9 − 15 + 6 = 0. Оба корня подходят. Виета нашла их без дискриминанта.',
      'Ещё одно: x² − 4x + 3. Сумма должна быть 4, произведение 3. Какие два числа? 1 и 3. Нажми «Показать» — корни встанут на ось, парабола дорисуется.',
      'Наоборот: известны корни 2 и 5. Сумма 7, произведение 10. Уравнение пишется сразу: x² − (сумма)x + произведение = 0, то есть x² − 7x + 10 = 0.',
      'Корни бывают отрицательные. У x² + 3x + 2 сумма равна −3, произведение 2. Пара −1 и −2: (−1)+(−2)=−3, (−1)·(−2)=+2. Минусы не страшны.',
      'Хитрость: если корни целые, они — делители свободного члена q. Для q = 2 кандидаты ±1 и ±2. Кликай пары: какая даст нужную сумму?',
      'Откуда минус у суммы? Из раскрытия (x − a)(x − b) = x² − (a+b)x + ab. Перед суммой всегда стоит минус. Поэтому в формуле x₁ + x₂ = −p, а не p.',
      'Если целых корней нет, Виета всё равно верна: сумма и произведение такие, какие сказали коэффициенты. Просто подбирать «на глаз» уже не выйдет — тогда помогает дискриминант.',
      'На олимпиаде Виета экономит время: угадать корни, собрать уравнение по корням, проверить чужое решение. Три движения — и без длинной арифметики.',
      'Рецепт: выпиши p и q → сумма = −p, произведение = q → подбери пару (часто среди делителей q) → проверь подстановкой. Дальше короткий вопрос: чему равна сумма корней у x² − 5x + 6?'
    ],
    check: { q: 'У x² − 5x + 6 чему равна сумма корней?', choices: ['5', '−5', '6', '−6'], ans: 0,
      exp: 'p = −5, сумма корней = −p = 5. Это 2 + 3.' },
    tasks: [
      { q: 'Чему равно произведение корней x² + 3x + 2?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Свободный член q — это и есть произведение.', 'q = 2.'], sol: 'Произведение корней = q = 2. Корни −1 и −2, (−1)·(−2)=2.' },
      { q: 'Подбери корни x² − 4x + 3 = 0 по Виете.', kind: 'choice',
        choices: ['1 и 3', '2 и 2', '−1 и 3', '3 и 4'], ans: 0, tol: 0,
        hints: ['Сумма должна быть 4, произведение 3.', '1+3=4 и 1·3=3.'], sol: '1 и 3' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const CSS = `<style>
    @keyframes l423ink{to{stroke-dashoffset:0}}
    @keyframes l423pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l423pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l423glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    @keyframes l423rise{from{transform:scaleY(0);opacity:0}to{transform:scaleY(1);opacity:1}}
    @keyframes l423slide{from{transform:translateX(-12px);opacity:0}to{transform:none;opacity:1}}
    .l423-ink{animation:l423ink 1.55s cubic-bezier(.2,.75,.15,1) forwards}
    .l423-dot{transform-box:fill-box;transform-origin:center;animation:l423pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l423-pulse{animation:l423pulse 1.6s ease-in-out infinite}
    .l423-glow{animation:l423glow 1.8s ease-in-out infinite}
    .l423-rise{transform-origin:center bottom;animation:l423rise .8s cubic-bezier(.2,.8,.2,1) both}
    .l423-slide{animation:l423slide .55s ease both}
    .l423-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;

  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+14);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l423-ink" style="animation-duration:${dur||1.4}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor,fs){
    return `<text class="l423-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner, vb){
    return `${CSS}<svg viewBox="${vb||'0 0 240 200'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">
      <defs>
        <linearGradient id="l423g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7fd1ff33"/><stop offset="100%" stop-color="#ffd76a22"/></linearGradient>
      </defs>${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  function card(top,bot,c){
    return `<div class="wv-pop" style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c};border-radius:12px;padding:8px 12px;min-width:88px">
      <div style="font-size:18px;color:${c};font-family:Georgia,serif">${top}</div>
      <div style="font-size:11px;color:${MUTED};margin-top:2px">${bot}</div>
    </div>`;
  }
  function X(x){ return 28 + (x+1)*30; }
  function Y(y){ return 142 - y*36; }
  function axis(xmin,xmax){
    const x1=X(xmin), x2=X(xmax), y=142;
    let ticks='';
    for(let i=Math.ceil(xmin);i<=xmax;i++){
      const px=X(i);
      ticks += `<line x1="${px}" y1="${y-4}" x2="${px}" y2="${y+4}" stroke="${MUTED}" stroke-width="1"/>`+lab(px,y+16, String(i), MUTED);
    }
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#3d5c49" stroke-width="1.6"/>
      <polygon points="${x2},${y} ${x2-7},${y-4} ${x2-7},${y+4}" fill="#3d5c49"/>${ticks}`;
  }
  function para(r1,r2,xmin,xmax){
    const pts=[];
    for(let x=xmin;x<=xmax+1e-9;x+=0.1){
      const y=(x-r1)*(x-r2);
      pts.push([X(x), Y(Math.max(-1.6, Math.min(3.2,y)))]);
    }
    let len=0;
    for(let i=1;i<pts.length;i++) len+=Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
    const d='M '+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' L ');
    return {d,len};
  }
  function rootDot(r,col,name,delay,pop){
    const px=X(r), py=142;
    return `<g>
      <line x1="${px}" y1="${py}" x2="${px}" y2="${Y(0)-28}" stroke="${col}" stroke-width="1.4" stroke-dasharray="4 3"/>
      <circle ${pop?'class="l423-dot"':''} style="animation-delay:${delay||0}s" cx="${px}" cy="${py}" r="6.5" fill="${col}"/>
      ${lab(px, py+28, name, col)}
    </g>`;
  }

  function visD423(el){
    try{ window._waveCss('css-l423', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'423';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw = st.seen!==step;
    if(st.seen!==step) st.seen=step;
    const r1 = Math.max(-4, Math.min(6, +(st.r1==null?2:st.r1)));
    const r2 = Math.max(-4, Math.min(6, +(st.r2==null?3:st.r2)));
    const sum=r1+r2, prod=r1*r2;
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${frame(
          axis(-1,6)+
          (open
            ? rootDot(2,BLUE,'2',0,true)+rootDot(3,GREEN,'3',.15,true)+
              `<rect x="${X(0)}" y="78" width="${X(5)-X(0)}" height="10" rx="5" fill="${GOLD}44" stroke="${GOLD}" class="l423-rise"/>`+
              lab((X(0)+X(5))/2, 72, 'сумма 5', GOLD)
            : `<g class="l423-pulse">${lab(X(2),120,'?',GOLD,'middle',28)}${lab(X(3.5),120,'?',BLUE,'middle',28)}</g>`
          )
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=!CHS[k].open;chRender(0);}catch(e){}">${open?'Скрыть':'Открыть числа'}</button>
        ${note('Загадка','Сложи — 5, перемножь — 6. Нажми кнопку: на прямой появятся 2 и 3. Именно эта пара сидит в уравнении x² − 5x + 6 = 0.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${frame(
          axis(-1,6)+
          `<line x1="${X(0)}" y1="90" x2="${X(2)}" y2="90" stroke="${BLUE}" stroke-width="6" stroke-linecap="round" ${doDraw?ink(X(2)-X(0),1,0):''}/>`+
          `<line x1="${X(2)}" y1="90" x2="${X(5)}" y2="90" stroke="${GREEN}" stroke-width="6" stroke-linecap="round" ${doDraw?ink(X(5)-X(2),1,.25):''}/>`+
          lab((X(0)+X(2))/2, 78, '2', BLUE)+
          lab((X(2)+X(5))/2, 78, '3', GREEN)+
          lab(X(2.5), 58, '2 + 3 = 5', GOLD)+
          rootDot(2,BLUE,'2',.1,doDraw)+rootDot(3,GREEN,'3',.25,doDraw)
        )}
        ${note('Сумма на прямой','Голубой кусок — первое число, зелёный — второе. Вместе ровно до 5. Сумма корней — это длина двух отрезков, поставленных встык.')}
      </div>`;
    } else if(step===2){
      const cell=18, cols=3, rows=2, ox=78, oy=46;
      let grid='';
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
        const dly=(r*cols+c)*0.08;
        grid += `<rect class="l423-dot" style="animation-delay:${dly}s" x="${ox+c*cell}" y="${oy+r*cell}" width="${cell-3}" height="${cell-3}" rx="3" fill="${GOLD}33" stroke="${GOLD}" stroke-width="1.4"/>`;
      }
      h=`<div class="wv-col">
        ${frame(
          grid+
          lab(ox-14, oy+cell, '2', BLUE)+
          lab(ox+cols*cell/2, oy+rows*cell+20, '3', GREEN)+
          lab(120, 28, '2 × 3 = 6', GOLD)
        , '0 0 240 150')}
        ${note('Произведение — площадь','Прямоугольник 2 на 3. Клеточек шесть — столько же, сколько произведение. Когда говорят «произведение корней равно q», представляют именно такую площадку.')}
      </div>`;
    } else if(step===3){
      const P=para(2,3,-0.4,5.6);
      h=`<div class="wv-col">
        ${frame(
          axis(-1,6)+
          `<path d="${P.d}" fill="none" stroke="${GOLD}" stroke-width="2.4" class="l423-glow" ${doDraw?ink(P.len,1.6,0):''}/>`+
          rootDot(2,BLUE,'2',.2,doDraw)+rootDot(3,GREEN,'3',.35,doDraw)
        )}
        <div class="wv-ans" style="font-size:16px">(x − 2)(x − 3) = 0</div>
        ${note('Откуда уравнение','Скобка обнуляется, когда x равен корню. Произведение скобок равно нулю ровно в этих двух точках — там парабола пересекает ось. Корни — это «дыры» на прямой.')}
      </div>`;
    } else if(step===4){
      const cells=[
        ['x · x','x²',GOLD],
        ['x · (−3)','−3x',BLUE],
        ['(−2) · x','−2x',GREEN],
        ['(−2)·(−3)','+6',RED]
      ];
      const show=Math.max(0, Math.min(4, st.exp==null?0:+st.exp));
      h=`<div class="wv-col">
        <div class="wv-ans" style="font-size:16px">(x − 2)(x − 3)</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:min(100%,300px)">
          ${cells.map((c,i)=> i<show
            ? `<div class="wv-pop" style="animation-delay:${i*.08}s;background:rgba(255,255,255,.04);border:2px solid ${c[2]};border-radius:10px;padding:8px;text-align:center">
                <div style="font-size:12px;color:${MUTED}">${c[0]}</div>
                <div style="font-size:20px;color:${c[2]};font-family:Georgia,serif">${c[1]}</div>
              </div>`
            : `<div style="background:rgba(255,255,255,.03);border:1px dashed #3d5c49;border-radius:10px;padding:8px;min-height:56px"></div>`
          ).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].exp=Math.min(4,(CHS[k].exp||0)+1);chRender(0);}catch(e){}">${show>=4?'Все четыре клетки':'Следующая клетка'}</button>
        <div class="wv-ans" style="font-size:15px">${show>=4?'x² + (−3x−2x) + 6 = x² − 5x + 6': show>=3? 'средние сложатся в −5x' : 'раскрываем по одной клетке'}</div>
        ${note('Четыре произведения','Как таблица умножения: каждый кусок левой скобки на каждый кусок правой. Средние два — это и есть «минус сумма корней».')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div style="font-size:20px;color:${GOLD};font-family:Georgia,serif">x² + p x + q = 0</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${card('x₁ + x₂ = −p','сумма','#7fd1ff')}
          ${card('x₁ · x₂ = q','произведение','#8fd1a8')}
        </div>
        <div class="wv-sml">для x² − 5x + 6: p = −5, q = 6 → сумма 5, произведение 6</div>
        ${note('Теорема одной фразой','Не решай — прочитай коэффициенты. Сумма корней прячется в среднем с минусом, произведение стоит в конце. Это и есть Виета.')}
      </div>`;
    } else if(step===6){
      const P=para(r1,r2, Math.min(r1,r2)-1.2, Math.max(r1,r2)+1.2);
      const xmin=Math.min(-1, r1-1, r2-1), xmax=Math.max(6, r1+1, r2+1);
      const pCoef=-(sum);
      const eq = `x² ${pCoef>=0?'+': '−'} ${Math.abs(pCoef)%1?Math.abs(pCoef).toFixed(1):Math.abs(pCoef)}x ${prod>=0?'+':'−'} ${Math.abs(prod)%1?Math.abs(prod).toFixed(1):Math.abs(prod)} = 0`;
      h=`<div class="wv-col">
        ${frame(
          axis(Math.max(-2,xmin), Math.min(7,xmax))+
          `<path d="${P.d}" fill="none" stroke="${GOLD}" stroke-width="2.4"/>`+
          rootDot(r1,BLUE, String(r1),0,false)+rootDot(r2,GREEN, String(r2),0,false)
        )}
        <div class="wv-ans" style="font-size:15px">${eq}</div>
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">корень x₁
            <input type="range" min="-4" max="6" step="1" value="${r1}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].r1=+this.value;chRender(0);}catch(e){}">
            <b style="color:${BLUE};min-width:16px">${r1}</b>
          </label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">корень x₂
            <input type="range" min="-4" max="6" step="1" value="${r2}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].r2=+this.value;chRender(0);}catch(e){}">
            <b style="color:${GREEN};min-width:16px">${r2}</b>
          </label>
        </div>
        <div class="wv-sml">сумма ${sum} · произведение ${prod%1?prod.toFixed(1):prod}</div>
        ${note('Живая Виета','Двигай корни. Средний коэффициент — всегда минус сумма, свободный член — всегда произведение. Парабола пересекает ось ровно там, куда ты поставил точки.')}
      </div>`;
    } else if(step===7){
      const stage=Math.max(0,Math.min(2, st.sub==null?0:+st.sub));
      h=`<div class="wv-col">
        <div style="font-size:18px;color:${GOLD};font-family:Georgia,serif">x² − 5x + 6</div>
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[
            ['x = 2','4 − 10 + 6 = 0','#7fd1ff'],
            ['x = 3','9 − 15 + 6 = 0','#8fd1a8']
          ].map((row,i)=>`<div class="wv-pop" style="display:${i<stage?'flex':'none'};justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${row[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><span>${row[0]}</span><b style="color:${row[2]}">${row[1]}</b></div>`).join('')}
        </div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sub=Math.min(2,(CHS[k].sub||0)+1);chRender(0);}catch(e){}">${stage>=2?'Оба корня на месте':'Подставить корень'}</button>
        ${note('Проверка','Виета предлагает пару. Подстановка подтверждает: оба числа обнуляют многочлен. Сначала подбери, потом проверь — и дискриминант не нужен.')}
      </div>`;
    } else if(step===8){
      const show=!!st.show13;
      const P=para(1,3,-0.4,5.2);
      h=`<div class="wv-col">
        ${frame(
          axis(-1,6)+
          (show? `<path d="${P.d}" fill="none" stroke="${GOLD}" stroke-width="2.4" ${doDraw||st.drew13?ink(P.len,1.5,0):ink(P.len,1.5,0)}/>`+
            rootDot(1,BLUE,'1',.1,true)+rootDot(3,GREEN,'3',.25,true) : '')
        )}
        <div class="wv-ans" style="font-size:15px">x² − 4x + 3 = 0 · сумма 4 · произведение 3</div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].show13=true;CHS[k].drew13=true;chRender(0);}catch(e){}">${show?'Корни 1 и 3':'Показать корни'}</button>
        ${note('Подбери пару','Ищем два числа с суммой 4 и произведением 3. 1 и 3 подходят сразу. Парабола дорисуется до оси в этих точках.')}
      </div>`;
    } else if(step===9){
      const stage=Math.max(0,Math.min(3, st.build==null?0:+st.build));
      h=`<div class="wv-col">
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${card('2 и 5','корни','#ffd76a')}
          ${stage>=1?card('2+5=7','сумма','#7fd1ff'):''}
          ${stage>=2?card('2·5=10','произведение','#8fd1a8'):''}
        </div>
        ${stage>=3?`<div class="wv-ans" style="font-size:20px;color:${GOLD}">x² − 7x + 10 = 0</div>`:''}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].build=Math.min(3,(CHS[k].build||0)+1);chRender(0);}catch(e){}">${['Сложить корни','Перемножить','Собрать уравнение','Готово'][Math.min(stage,3)]}</button>
        ${note('Собрать уравнение','Коэффициенты — это сумма и произведение. Перед суммой ставим минус: x² − 7x + 10. Обратная Виета — как сложить разборный конструктор.')}
      </div>`;
    } else if(step===10){
      const P=para(-1,-2,-3.2,2.2);
      h=`<div class="wv-col">
        ${frame(
          axis(-3.5,2.5)+
          `<path d="${P.d}" fill="none" stroke="${GOLD}" stroke-width="2.4" ${doDraw?ink(P.len,1.5,0):''}/>`+
          rootDot(-2,RED,'−2',.1,doDraw)+rootDot(-1,BLUE,'−1',.25,doDraw)
        )}
        <div class="wv-ans" style="font-size:15px">x² + 3x + 2 = 0</div>
        <div class="wv-sml">(−1)+(−2)=−3 = −p · (−1)·(−2)=+2 = q</div>
        ${note('Отрицательные корни','Минус на минус даёт плюс в произведении, поэтому q положительный, а средний коэффициент тоже плюс: сумма отрицательная, −p > 0. Картинка та же, только слева от нуля.')}
      </div>`;
    } else if(step===11){
      const pairs=[[1,2],[-1,-2],[1,-2],[-1,2],[2,1]];
      const pick = st.pick==null? -1:+st.pick;
      const good = pick>=0 && pairs[pick][0]+pairs[pick][1]===-3 && pairs[pick][0]*pairs[pick][1]===2;
      h=`<div class="wv-col">
        <div class="wv-ans" style="font-size:15px">x² + 3x + 2 · нужно сумму −3 и произведение 2</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;max-width:320px">
          ${[['1 и 2'],['−1 и −2'],['1 и −2'],['−1 и 2']].map((lab_,i)=>`<button type="button" class="btn" style="border-color:${pick===i?(good&&i===1?GREEN:RED):'#3d5c49'}" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].pick=${i};chRender(0);}catch(e){}">${lab_[0]}</button>`).join('')}
        </div>
        <div class="wv-sml">${pick<0?'Кликни пару делителей q': good?'Да: сумма −3, произведение 2':'Сумма или произведение не те'}</div>
        ${note('Делители q','Целый корень обязан делить свободный член. Перебрал делители — проверил сумму — готово. Это самый быстрый олимпиадный ход.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px);text-align:left">
          ${[
            ['(x − a)(x − b)', 'две скобки','#7fd1ff'],
            ['x² − (a+b)x + ab', 'минус перед суммой','#ffd76a'],
            ['p = −(a+b), q = ab', 'поэтому x₁+x₂ = −p','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]};font-family:Georgia,serif">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Откуда минус','Каждая скобка даёт «минус корень». Два минуса в середине складываются. Поэтому в уравнении x² − (сумма)x + произведение. Формула −p — это просто этот минус.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['целые корни есть','подбирай делители q','#8fd1a8'],
            ['целых нет, Виета всё равно верна','сумма и произведение те же','#7fd1ff'],
            ['нужны точные значения','тогда дискриминант','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:13.5px;color:#e8dcc8;text-align:left"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Не только целые','Виета не про «удобные числа». Она всегда связывает коэффициенты и корни. Подбор — бонус, когда корни целые. Иначе считай дискриминант, а проверку всё равно делай через сумму и произведение.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['угадать корни','без дискриминанта','#7fd1ff'],
            ['собрать уравнение','по известным корням','#8fd1a8'],
            ['проверить решение','сумма и произведение','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Зачем на олимпиаде','Три коротких движения. Не разворачивай длинный дискриминант, если пара чисел видна сразу. Виета — это чтение коэффициентов вслух.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[
            ['1','Выпиши p и q','#7fd1ff'],
            ['2','Сумма = −p, произведение = q','#8fd1a8'],
            ['3','Подбери пару (делители q)','#ffd76a'],
            ['4','Проверь подстановкой','#e86a5a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span>
          </div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">x² − 5x + 6 → сумма корней = ?</div>
        ${note('В карман','Сумма прячется в среднем коэффициенте с минусом. У x² − 5x + 6 это 5. Дальше проверка и две задачи.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[423]=visD423;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===423){ arr[i]=L423; f=true; break; } }
    if(!f) arr.push(L423);
  })();
})();
/* ================= УРОК 424 · Двудольные графы и раскраски ================= */
(function(){
  const L424 = {
    id: 424, title: 'Двудольные графы и раскраски', ico: '🕸️',
    src: 'Математика · 8 класс · Олимп-8: графы', subj: 'math',
    explain: [
      'Шесть ребят: Аня дружит с Борей и Геной, Боря — с Дашей, Гена — с Дашей и Евой, Вася — с Евой. Можно ли рассадить их в два ряда так, чтобы друзья сидели только напротив, а не рядом в своём ряду?',
      'Чтобы не запутаться, рисуем схему. Точка — человек. Это вершина графа. Точки появляются по одной, как бусины. Имена стоят снаружи, чтобы ничего не наезжало на рисунок.',
      'Линия между точками значит «эти двое дружат». Такую линию называют ребром. Ребро без стрелки: дружба в обе стороны. Смотри, как каждая линия дорисовывается до конца — не обрывается на полпути.',
      'Разложим точки на две кучки: слева и справа. Правило простое: линия идёт только из одной кучки в другую. Внутри кучки линий нет. Кликни точку слева — загорятся те, с кем ей «можно» дружить.',
      'Как на танцах: мальчики слева, девочки справа. Пара — это ребро. Мальчик с мальчиком не танцует. Если все пары так рисуются — граф двудольный. «Две доли» — две группы.',
      'Как проверить любой граф? Раскрась точки в два цвета. Соседи по ребру должны быть разного цвета. Нажми «Раскрасить»: цвет побежит волной от первой точки к соседям, потом к их соседям.',
      'Звезда: одна точка в центре, остальные вокруг, линии только к центру. Центр — красный, все лучи — синие. Конфликта нет. Звезда всегда двудольная: центр — одна доля, листья — другая.',
      'Цепочка (путь) тоже всегда двудольная. Иди по ней: красный, синий, красный, синий. Нажми «Оживить» и смотри, как шарик бежит и на каждой следующей точке меняет цвет.',
      'Квадрат — цикл из четырёх вершин. Чётное число точек по кругу. Обходим: красный-синий-красный-синий — вернулись, и цвета сошлись. Чётный цикл двудольный.',
      'Шестиугольник — тот же фокус. Шесть — чётное. Волна обходит круг и смыкается без ссоры. Запомни картинку: чётный обруч всегда раскрашивается в два цвета.',
      'Треугольник — три точки, все попарно соединены. Три — нечётное. Красим две — третья соседствует и с красной, и с синей. Куда ни покрась — спор. Нечётный цикл ломает двудольность.',
      'Теперь сам. Пятиугольник: кликай точки и крась красным или синим. Если соседи одного цвета — ребро вспыхнет тревогой. У пяти точек по кругу конфликт неизбежен: это нечётный цикл.',
      'Главное правило одним предложением: граф двудольный тогда и только тогда, когда в нём нет циклов нечётной длины. Нет треугольников, пятиугольников и прочих «нечётных обручей».',
      'Бонус: паросочетание. Это набор рёбер без общих вершин — как посадить максимум пар. В двудольном графе пары искать удобно: берём рёбра слева направо так, чтобы вершины не повторялись.',
      'Где это в жизни. Расписание: ученики ↔ кружки. Задачи: люди ↔ работы. Сеть: кабели только между двумя типами узлов. Везде две доли и рёбра только между ними.',
      'Рецепт: нарисуй точки и линии → попробуй два цвета → если два соседа одного цвета, ищи нечётный цикл. Если цвета легли — граф двудольный. Дальше проверка: как называется такой граф?'
    ],
    check: { q: 'Граф, где рёбра соединяют только вершины из разных групп, называется…', choices: ['двудольным', 'полным', 'деревом', 'циклом'], ans: 0,
      exp: 'Две группы (доли), рёбра только между ними — это двудольный граф. Его всегда можно раскрасить в два цвета.' },
    tasks: [
      { q: 'Сколько цветов достаточно для раскраски двудольного графа?', kind: 'unit', ans: 2, tol: 0,
        hints: ['По одному цвету на каждую долю.', 'Соседи разного цвета — значит цветов ровно два.'], sol: '2 — по цвету на группу.' },
      { q: 'Является ли «звезда» (центр и листья) двудольным графом?', kind: 'choice',
        choices: ['да', 'нет', 'только с 3 листьями', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Центр — одна доля, все листья — другая.', 'Листьев сколько угодно: между ними рёбер нет.'], sol: 'да: центр в одной группе, листья — в другой.' }
    ]
  };

  const RED='#e86a5a', BLUE='#7fd1ff', GOLD='#ffd76a', GREEN='#8fd1a8', MUTED='#8fa08f';
  const CSS = `<style>
    @keyframes l424ink{to{stroke-dashoffset:0}}
    @keyframes l424pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}}
    @keyframes l424pulse{0%,100%{opacity:.4}50%{opacity:1}}
    @keyframes l424glow{0%,100%{filter:drop-shadow(0 0 1px ${GOLD})}50%{filter:drop-shadow(0 0 8px ${GOLD})}}
    @keyframes l424shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
    @keyframes l424spin{to{transform:rotate(360deg)}}
    .l424-ink{animation:l424ink 1.35s cubic-bezier(.2,.75,.15,1) forwards}
    .l424-dot{transform-box:fill-box;transform-origin:center;animation:l424pop .42s cubic-bezier(.2,1.4,.4,1) both}
    .l424-pulse{animation:l424pulse 1.6s ease-in-out infinite}
    .l424-glow{animation:l424glow 1.7s ease-in-out infinite}
    .l424-bad{animation:l424shake .45s ease-in-out infinite}
    .l424-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
    .l424-orbit{transform-origin:120px 100px;animation:l424spin 10s linear infinite}
  </style>`;

  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+14);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l424-ink" style="animation-duration:${dur||1.25}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor){
    return `<text class="l424-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="12" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function dist(a,b){ return Math.hypot(b[0]-a[0], b[1]-a[1]); }
  function frame(inner, vb){
    return `${CSS}<svg viewBox="${vb||'0 0 240 210'}" style="width:min(100%,280px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">
      <defs>
        <linearGradient id="l424g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e86a5a22"/><stop offset="100%" stop-color="#7fd1ff22"/></linearGradient>
        <filter id="l424b"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>${inner}</svg>`;
  }
  function note(title, text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  function edge(a,b,col,w,delay,doDraw,cls,onClick){
    const L=dist(a,b);
    const extra = onClick?`style="cursor:pointer" onclick="${onClick}"`:"";
    return `<line ${extra} x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" fill="none" stroke="${col}" stroke-width="${w||2.2}" class="${cls||''}" ${doDraw?ink(L,1.05,delay):''}/>`;
  }
  function node(p,name,col,on,delay,pop,click,out){
    const fill = (!col || col===MUTED) ? '#1a2e24' : col;
    const stroke = col||MUTED;
    const [lx,ly] = out||[p[0], p[1]-14];
    const clk = click?`style="cursor:pointer" onclick="${click}"`:'';
    return `<g ${clk}>
      ${on?`<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="${stroke}33" class="l424-pulse"/>`:''}
      <circle ${pop?'class="l424-dot"':''} style="animation-delay:${delay||0}s" cx="${p[0]}" cy="${p[1]}" r="${on?7.5:6}" fill="${fill}" stroke="${stroke}" stroke-width="2.2"/>
      ${name?lab(lx,ly,name,stroke):''}
    </g>`;
  }
  function poly(n,cx,cy,r,rot){
    const o=rot|| -90;
    return Array.from({length:n},(_,i)=>{
      const a=(o+i*360/n)*Math.PI/180;
      return [cx+r*Math.cos(a), cy+r*Math.sin(a)];
    });
  }
  function outRad(cx,cy,p,d){
    const dx=p[0]-cx, dy=p[1]-cy, L=Math.hypot(dx,dy)||1;
    return [p[0]+dx/L*(d||16), p[1]+dy/L*(d||16)+4];
  }
  function lerp(a,b,t){ return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]; }
  function walkPt(pts, t, closed){
    const n = closed ? pts.length : Math.max(1, pts.length-1);
    const x = ((t % n)+n)%n;
    const i = Math.floor(x);
    const f = x-i;
    return lerp(pts[i], pts[(i+1)%pts.length], f);
  }
  function setPlay(flag){
    return `try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].play=${flag};chRender(0);}catch(e){}`;
  }
  function tickWalk(key, nPts){
    if(!window._l424iv){
      window._l424iv=setInterval(()=>{
        try{
          const k=lidKey(LV.id); CHS[k]=CHS[k]||{};
          const s=CHS[k];
          if(!s.play || LV.id!==424){ clearInterval(window._l424iv); window._l424iv=null; return; }
          s.t=(s.t||0)+0.012;
          if(s.t>=nPts) s.t-=nPts;
          if(LV.step===s.walkStep) chRender(0);
          else { clearInterval(window._l424iv); window._l424iv=null; }
        }catch(e){ clearInterval(window._l424iv); window._l424iv=null; }
      }, 40);
    }
  }

  const FRIEND = {
    A:[40,42], D:[40,105], E:[40,168],
    B:[200,42], G:[200,105], V:[200,168]
  };
  const FEDGE = [['A','B'],['A','G'],['B','D'],['G','D'],['G','E'],['V','E']];
  const FCOL = {A:RED,D:RED,E:RED,B:BLUE,G:BLUE,V:BLUE};
  const FOUT = {A:[22,42],D:[22,105],E:[22,172],B:[222,42],G:[222,109],V:[222,172]};

  function visD424(el){
    try{ window._waveCss('css-l424', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'424';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw = st.seen!==step;
    if(st.seen!==step){ st.seen=step; st.play=false; if(window._l424iv){ clearInterval(window._l424iv); window._l424iv=null; } }
    const clickN = (name)=>`try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sel='${name}';chRender(0);}catch(e){}`;
    let h='';

    if(step===0){
      h=`<div class="wv-col">
        ${frame(
          FEDGE.map((e,i)=>edge(FRIEND[e[0]],FRIEND[e[1]],GREEN,2.3,.12*i,doDraw,'')).join('')+
          Object.keys(FRIEND).map((k,i)=>node(FRIEND[k],k, FCOL[k], false, .08*i, doDraw, '', FOUT[k])).join('')
        )}
        ${note('Загадка','Друзья должны сидеть напротив, не рядом в своём ряду. Слева красные, справа синие: все шесть дружб идут только между рядами. Значит, рассадить можно.')}
      </div>`;
    } else if(step===1){
      const pts=[[70,50],[170,50],[70,150],[170,150],[120,100]];
      const names=['A','B','C','D','E'];
      h=`<div class="wv-col">
        ${frame(pts.map((p,i)=>node(p,names[i], GOLD, false, .18*i, true, '', [p[0], p[1]<90?p[1]-14:p[1]+20])).join('')+
          lab(120,198,'вершины — это точки','#e8dcc8'))}
        ${note('Вершина','Не линия, не область — именно точка. Человек, город, задача, урок: всё, что потом с чем-то соединится. Пять бусин уже на столе, рёбер пока нет.')}
      </div>`;
    } else if(step===2){
      const pts={A:[70,50],B:[170,50],C:[70,150],D:[170,150]};
      const all=[['A','B'],['A','C'],['B','D'],['C','D']];
      const shown = st.nE==null?0:Math.min(all.length, +st.nE);
      h=`<div class="wv-col">
        ${frame(
          all.slice(0,shown).map((e,i)=>edge(pts[e[0]],pts[e[1]],GREEN,2.4,.05, true,'l424-glow')).join('')+
          Object.keys(pts).map((k,i)=>node(pts[k],k,GOLD,false,.08*i,doDraw,'',[pts[k][0], pts[k][1]<90?pts[k][1]-14:pts[k][1]+20])).join('')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].nE=Math.min(4,(CHS[k].nE||0)+1);chRender(0);}catch(e){}">${shown>=4?'Все рёбра на месте':'Дорисовать ребро'}</button>
        ${note('Ребро','Нажми кнопку: очередная линия дорисуется до конца. Ребро — это «связь». Пока линия не дошла до второй точки, связи ещё нет.')}
      </div>`;
    } else if(step===3){
      const Lft=[[50,48],[50,105],[50,162]], Rgt=[[190,48],[190,105],[190,162]];
      const sel=st.sel==null?0:+st.sel;
      const pairs=[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]];
      h=`<div class="wv-col">
        ${frame(
          pairs.map((p,i)=>edge(Lft[p[0]],Rgt[p[1]], p[0]===sel?GOLD:GREEN, p[0]===sel?3:1.8, .08*i, doDraw, p[0]===sel?'l424-glow':'')).join('')+
          Lft.map((p,i)=>node(p,'L'+(i+1),RED, sel===i, .08*i, doDraw, `try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sel=${i};chRender(0);}catch(e){}`, [28,p[1]+4])).join('')+
          Rgt.map((p,i)=>node(p,'R'+(i+1),BLUE, pairs.some(x=>x[0]===sel&&x[1]===i), .08*i, doDraw, '', [214,p[1]+4])).join('')+
          lab(50,196,'доля A','#e86a5a')+lab(190,196,'доля B','#7fd1ff')
        )}
        ${note('Две доли','Кликни красную точку. Жёлтым загорятся только синие соседи — внутри своей доли дружить нельзя. Так устроен двудольный граф.')}
      </div>`;
    } else if(step===4){
      const boys=[[48,50],[48,110],[48,170]], girls=[[192,50],[192,110],[192,170]];
      const pr=[[0,0],[1,0],[1,1],[2,1],[2,2]];
      h=`<div class="wv-col">
        ${frame(
          pr.map((p,i)=>edge(boys[p[0]],girls[p[1]],GOLD,2.3,.14*i,doDraw,'')).join('')+
          boys.map((p,i)=>node(p,['Б1','Б2','Б3'][i],RED,false,.1*i,doDraw,'',[26,p[1]+4])).join('')+
          girls.map((p,i)=>node(p,['Д1','Д2','Д3'][i],BLUE,false,.1*i,doDraw,'',[216,p[1]+4])).join('')
        )}
        ${note('Танцы','Каждое ребро — пара «мальчик — девочка». Внутри ряда линий нет. Если мир так устроен, граф двудольный: две доли, рёбра только между ними.')}
      </div>`;
    } else if(step===5){
      const pts=[[50,50],[190,50],[50,150],[190,150],[120,100]];
      const names=['A','B','C','D','E'];
      const eds=[[0,1],[0,2],[0,4],[1,3],[2,3],[3,4]];
      const wave = Math.max(0, Math.min(3, st.wave==null?0:+st.wave));
      const colOf = (i)=>{
        if(wave===0) return MUTED;
        if(i===0) return RED;
        if(wave===1) return [1,2,4].includes(i)?BLUE:MUTED;
        if(i===3) return RED;
        return [1,2,4].includes(i)?BLUE:RED;
      };
      h=`<div class="wv-col">
        ${frame(
          eds.map((e,i)=>edge(pts[e[0]],pts[e[1]],GREEN,2,.08*i,doDraw,'')).join('')+
          pts.map((p,i)=>node(p,names[i], colOf(i), wave>0 && colOf(i)!==MUTED, .08*i, doDraw, '', [p[0], p[1]<80?p[1]-14:p[1]+20])).join('')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].wave=((CHS[k].wave||0)+1)%4;chRender(0);}catch(e){}">${['Начать с A','Покрасить соседей','Докрасить остальных','Сначала'][wave]}</button>
        <div class="wv-ans" style="font-size:14px">${['Возьмём A красной','Соседи A — синие','Сосед синих, который ещё белый, — красный','Конфликта нет: граф двудольный'][wave]}</div>
        ${note('Волна цвета','Соседи обязаны быть другого цвета. Если на каком-то шаге два соседа выходят одного цвета — граф не двудольный. Здесь волна прошла до конца.')}
      </div>`;
    } else if(step===6){
      const c=[120,100], leaves=poly(5,120,100,70,-90);
      h=`<div class="wv-col">
        ${frame(
          `<g class="l424-orbit"><circle cx="${c[0]+70}" cy="${c[1]}" r="2.4" fill="${GOLD}"/></g>`+
          leaves.map((p,i)=>edge(c,p,GREEN,2.3,.1*i,doDraw,'')).join('')+
          node(c,'центр',RED,true,0,doDraw,'',[120,78])+
          leaves.map((p,i)=>{const o=outRad(120,100,p,18); return node(p,'',BLUE,false,.1*i,doDraw,'',o);}).join('')
        )}
        ${note('Звезда','Все линии идут к центру, листья между собой не дружат. Одна доля — центр, вторая — все остальные. Сколько ни добавь лучей, звезда останется двудольной.')}
      </div>`;
    } else if(step===7){
      st.walkStep=7;
      const pts=[[36,110],[84,50],[132,110],[180,50],[228,110]];
      const names=['1','2','3','4','5'];
      if(st.play) tickWalk('path', pts.length-1);
      const t=st.t||0;
      const idx=Math.min(pts.length-1, Math.round(t));
      const wp=walkPt(pts, t, false);
      h=`<div class="wv-col">
        ${frame(
          pts.slice(0,-1).map((p,i)=>edge(p,pts[i+1],GREEN,2.4,.12*i,doDraw,'')).join('')+
          pts.map((p,i)=>node(p,names[i], i%2===0?RED:BLUE, i===idx, .08*i, doDraw,'',[p[0], p[1]<80?p[1]-14:p[1]+20])).join('')+
          `<circle cx="${wp[0].toFixed(1)}" cy="${wp[1].toFixed(1)}" r="6" fill="${GOLD}" class="l424-glow"/>`
        )}
        <button type="button" class="btn" onclick="${st.play?setPlay('false'):setPlay('true')}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
        ${note('Путь','Шарик бежит по цепочке. На нечётной вершине красный, на чётной синий. Ссоры не будет: у пути нет циклов вообще.')}
      </div>`;
    } else if(step===8){
      st.walkStep=8;
      const pts=[[70,46],[178,46],[178,154],[70,154]];
      const names=['A','B','C','D'];
      if(st.play) tickWalk('c4', 4);
      const t=(st.t||0)%4;
      const wp=walkPt(pts, t, true);
      const idx=Math.floor(t)%4;
      h=`<div class="wv-col">
        ${frame(
          pts.map((p,i)=>edge(p,pts[(i+1)%4],GREEN,2.5,.1*i,doDraw,'')).join('')+
          pts.map((p,i)=>node(p,names[i], i%2===0?RED:BLUE, i===idx, .08*i, doDraw,'',[p[0]+(p[0]<120?-18:18), p[1]+(p[1]<100?-12:20)])).join('')+
          `<circle cx="${wp[0].toFixed(1)}" cy="${wp[1].toFixed(1)}" r="6.5" fill="${GOLD}" class="l424-glow"/>`
        )}
        <button type="button" class="btn" onclick="${st.play?setPlay('false'):setPlay('true')}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
        <div class="wv-ans" style="font-size:14px">C₄ · 4 вершины · чётный цикл</div>
        ${note('Чётный обруч','Вернулись в A — она снова красная, как в начале. Цвета сомкнулись. Любой цикл чётной длины раскрашивается в два цвета.')}
      </div>`;
    } else if(step===9){
      st.walkStep=9;
      const pts=poly(6,120,105,72,-90);
      const names=['1','2','3','4','5','6'];
      if(st.play) tickWalk('c6', 6);
      const t=(st.t||0)%6;
      const wp=walkPt(pts, t, true);
      const idx=Math.floor(t)%6;
      h=`<div class="wv-col">
        ${frame(
          pts.map((p,i)=>edge(p,pts[(i+1)%6],GREEN,2.3,.08*i,doDraw,'')).join('')+
          pts.map((p,i)=>{const o=outRad(120,105,p,18); return node(p,names[i], i%2===0?RED:BLUE, i===idx, .07*i, doDraw,'',o);}).join('')+
          `<circle cx="${wp[0].toFixed(1)}" cy="${wp[1].toFixed(1)}" r="6.5" fill="${GOLD}" class="l424-glow"/>`
        )}
        <button type="button" class="btn" onclick="${st.play?setPlay('false'):setPlay('true')}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
        <div class="wv-ans" style="font-size:14px">C₆ · шесть — чётное · двудольный</div>
        ${note('Ещё один чётный','Шесть точек по кругу. Красный-синий чередуется и сходится. Запомни: чётное число вершин в цикле — двудольность жива.')}
      </div>`;
    } else if(step===10){
      const pts=[[120,40],[50,160],[190,160]];
      const names=['A','B','C'];
      const stage=Math.max(0,Math.min(3, st.tri==null?0:+st.tri));
      const col=['', RED, BLUE, RED][Math.min(stage,3)];
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="${stage>=3?'rgba(232,106,90,.18)':'none'}" stroke="${stage>=3?RED:GREEN}" stroke-width="2.5" ${doDraw?ink(dist(pts[0],pts[1])+dist(pts[1],pts[2])+dist(pts[2],pts[0]),1.4,0):''} class="${stage>=3?'l424-bad':''}"/>`+
          pts.map((p,i)=>{
            const c = i===0&&stage>=1?RED : i===1&&stage>=2?BLUE : i===2&&stage>=3?GOLD : MUTED;
            return node(p,names[i],c,stage>=3&&i===2, .1*i, doDraw,'',[p[0], p[1]<80?p[1]-14:p[1]+20]);
          }).join('')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].tri=((CHS[k].tri||0)+1)%4;chRender(0);}catch(e){}">${['Покрасить A','Покрасить B','Покрасить C','Сначала'][stage]}</button>
        <div class="wv-ans" style="font-size:14px">${['A красная','B синяя — сосед A','C сосед и красной, и синей — конфликт','Треугольник не двудольный'][stage]}</div>
        ${note('Нечётный цикл','Три — нечётное. Третьей вершине некуда деться: оба цвета уже заняты соседями. Любой нечётный цикл ломает двудольность.')}
      </div>`;
    } else if(step===11){
      const pts=poly(5,120,108,72,-90);
      const names=['A','B','C','D','E'];
      const cols=st.cols||{};
      const pal={r:RED,b:BLUE};
      const bad=[];
      for(let i=0;i<5;i++){
        const a=cols[i], b=cols[(i+1)%5];
        if(a&&b&&a===b) bad.push(i);
      }
      const all=Object.keys(cols).filter(k=>cols[k]).length;
      h=`<div class="wv-col">
        ${frame(
          pts.map((p,i)=>{
            const clash=bad.includes(i);
            return edge(p,pts[(i+1)%5], clash?RED:GREEN, clash?3.2:2.2, .08*i, doDraw, clash?'l424-bad l424-pulse':'');
          }).join('')+
          pts.map((p,i)=>{
            const o=outRad(120,108,p,18);
            const c=pal[cols[i]]||MUTED;
            return node(p,names[i],c,!!cols[i],.07*i,doDraw,
              `try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].cols=CHS[k].cols||{};const v=CHS[k].cols[${i}];CHS[k].cols[${i}]=v==='r'?'b':(v==='b'?null:'r');chRender(0);}catch(e){}`, o);
          }).join('')
        )}
        <div class="wv-ans" style="font-size:14px">${bad.length? 'Соседи одного цвета — конфликт!' : all===5? 'Пять точек по кругу не сходятся' : 'Кликай вершины: красный → синий → сброс'}</div>
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].cols={};chRender(0);}catch(e){}">Сбросить</button>
        ${note('Попробуй сам','C₅ — нечётный цикл. Как ни крась, одно ребро останется «своих с своими». Это и есть доказательство руками: пятиугольник не двудольный.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[
            ['нет нечётных циклов','граф двудольный','#8fd1a8'],
            ['есть треугольник / C₅ / C₇…','не двудольный','#e86a5a'],
            ['чётный цикл C₄, C₆, C₈','двудольный','#7fd1ff'],
            ['дерево и путь','всегда двудольные','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:13.5px;color:#e8dcc8;text-align:left"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Одно правило','Двудольный ⟺ можно раскрасить в 2 цвета ⟺ нет цикла нечётной длины. Три фразы про одно и то же. Проверяй любой из способов — как удобнее.')}
      </div>`;
    } else if(step===13){
      const Lft=[[50,48],[50,105],[50,162]], Rgt=[[190,48],[190,105],[190,162]];
      const all=[[0,0],[0,1],[1,1],[1,2],[2,0],[2,2]];
      const match=[[0,1],[1,2],[2,0]];
      const show=!!st.match;
      h=`<div class="wv-col">
        ${frame(
          all.map((p,i)=>edge(Lft[p[0]],Rgt[p[1]], '#3d5c49',1.4,.05*i,doDraw,'')).join('')+
          (show?match.map((p,i)=>edge(Lft[p[0]],Rgt[p[1]],GOLD,3.1,.12*i,true,'l424-glow')).join(''):'')+
          Lft.map((p,i)=>node(p,'L'+(i+1),RED,false,.08*i,doDraw,'',[28,p[1]+4])).join('')+
          Rgt.map((p,i)=>node(p,'R'+(i+1),BLUE,false,.08*i,doDraw,'',[214,p[1]+4])).join('')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].match=!CHS[k].match;chRender(0);}catch(e){}">${show?'Скрыть пары':'Показать паросочетание'}</button>
        <div class="wv-ans" style="font-size:14px">${show?'3 ребра, вершины не делятся — максимум':'серые — все дружбы, жёлтые — выбранные пары'}</div>
        ${note('Паросочетание','Хотим как можно больше пар, но один человек — в одной паре. В двудольном графе такие наборы искать легче: доли уже разделены.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[
            ['танцы и знакомства','мальчики ↔ девочки','#e86a5a'],
            ['расписание кружков','ученики ↔ занятия','#7fd1ff'],
            ['работы и исполнители','люди ↔ задачи','#8fd1a8'],
            ['кабели в сети','два типа узлов','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:13.5px;color:#e8dcc8;text-align:left"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Зачем это','Как только мир делится на два сорта вещей, а связи идут только между сортами — перед тобой двудольный граф. Дальше работает раскраска и паросочетание.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[
            ['1','Нарисуй вершины и рёбра','#7fd1ff'],
            ['2','Раскрась соседей в разные цвета','#8fd1a8'],
            ['3','Конфликт → ищи нечётный цикл','#e86a5a'],
            ['4','Цвета легли → граф двудольный','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;align-items:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[2]};font-size:18px">${x[0]}</b><span style="color:#e8dcc8;font-size:14px">${x[1]}</span>
          </div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif;margin-top:4px" class="wv-pulse">рёбра только между группами — это…?</div>
        ${note('В карман','Две доли. Два цвета. Никаких нечётных циклов. Дальше короткая проверка и две задачи.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[424]=visD424;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===424){ arr[i]=L424; f=true; break; } }
    if(!f) arr.push(L424);
  })();
})();
/* ================= УРОК 425 · Метод площадей ================= */
(function(){
  const L425 = {
    id: 425, title: 'Метод площадей', ico: '📐',
    src: 'Математика · 8 класс · Олимп-8: метод площадей', subj: 'math',
    explain: [
      'Загадка: у треугольника основание 10, площадь 30. Высоту линейкой не достать — как её найти? Секрет не в сторонах, а в площади. Сейчас научимся считать фигуру «двумя руками».',
      'Возьми два одинаковых треугольника. Приложи их основаниями — получится параллелограмм, а если опустить высоту — прямоугольник. Треугольник занимает ровно половину. Поэтому в формуле появляется ½.',
      'Формула простая: S = ½ · основание · высота. Основание — любая сторона, высота — перпендикуляр к ней из противоположной вершины. Подвигай ползунки: площадь растёт вместе с основанием и высотой.',
      'В прямоугольном треугольнике катеты уже стоят друг к другу под прямым углом. Значит, один катет — основание, второй — высота. Не надо ничего опускать: S = ½ · 3 · 4 = 6.',
      'Главный приём олимпиад: посчитай ОДНУ площадь двумя способами и приравняй. Получится уравнение — и неизвестная длина сама вылезет. Нажми кнопку: те же 30, но через другую сторону.',
      'Из каждой вершины можно опустить свою высоту. Площадь одна, поэтому ½·a·hₐ = ½·b·h_b, то есть a·hₐ = b·h_b. Кликни A, B или C: высота дорисуется до основания, числа сойдутся.',
      'Если у двух треугольников одинаковое основание, площади относятся как высоты. Почему? В формуле ½ и a одни и те же, остаётся только h. Подвигай вторую вершину вверх — отношение S₁:S₂ повторит h₁:h₂.',
      'Ещё сильнее: если треугольники с общей вершиной стоят на одной прямой, площади относятся как основания. Двигай точку M по стороне: S слева / S справа = BM / MC. На середине — медианы режут площадь пополам.',
      'Рецепт в карман. 1) Найди площадь удобным способом. 2) Найди её же иначе. 3) Приравняй — получишь уравнение. 4) Реши. Площадь — мост между сторонами, высотами и отрезками.',
      'Проверь себя. Основание 10, высота 6. Вспомни половину. Если забыл — вернись к ползункам: там формула живая.'
    ],
    check: { q: 'Площадь треугольника с основанием 10 и высотой 6?', choices: ['30', '60', '15', '16'], ans: 0,
      exp: 'Треугольник — половина прямоугольника 10×6. Поэтому S = ½ · 10 · 6 = 30.' },
    tasks: [
      { q: 'Площадь прямоугольного треугольника с катетами 3 и 4?', kind: 'unit', ans: 6, tol: 0,
        hints: ['Катеты уже стоят под прямым углом: один — основание, второй — высота.', 'S = ½ · 3 · 4.', 'Половина от 12 — это 6.'], sol: 'S = ½ · 3 · 4 = 6' },
      { q: 'У треугольников равные основания. Тогда площади относятся как…', kind: 'choice',
        choices: ['высоты', 'углы', 'стороны', 'периметры'], ans: 0, tol: 0,
        hints: ['S = ½ · a · h, а основание a у обоих одно.', '½ и a сокращаются — остаётся отношение высот.'], sol: 'высоты: S₁/S₂ = h₁/h₂' }
    ]
  };

  const CSS = `<style>
    @keyframes l425ink{to{stroke-dashoffset:0}}
    @keyframes l425pulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes l425pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.16)}100%{transform:scale(1);opacity:1}}
    @keyframes l425flip{from{transform:rotate(0)}to{transform:rotate(180deg)}}
    @keyframes l425grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes l425glow{0%,100%{filter:drop-shadow(0 0 1px #ffd76a)}50%{filter:drop-shadow(0 0 7px #ffd76a)}}
    @keyframes l425fill{from{fill-opacity:0}to{fill-opacity:1}}
    .l425-ink{animation:l425ink 1.45s cubic-bezier(.2,.75,.15,1) forwards}
    .l425-pulse{animation:l425pulse 1.8s ease-in-out infinite}
    .l425-dotc{transform-box:fill-box;transform-origin:center;animation:l425pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l425-flip{transform-origin:110px 148px;animation:l425flip 1.35s .2s cubic-bezier(.2,.7,.2,1) both}
    .l425-grow{transform-origin:110px 168px;animation:l425grow .9s cubic-bezier(.2,.8,.2,1) both}
    .l425-glow{animation:l425glow 1.8s ease-in-out infinite}
    .l425-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.4px;stroke-linejoin:round}
    .l425-fill{animation:l425fill .7s .35s both}
  </style>`;

  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+16);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l425-ink" style="animation-duration:${dur||1.35}s;animation-delay:${delay||0}s"`;
  }
  function lab(x,y,t,col,anchor){
    return `<text class="l425-lab" x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="12" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function dist(A,B){ return Math.hypot(B[0]-A[0], B[1]-A[1]); }
  function foot(P,A,B){
    const vx=B[0]-A[0], vy=B[1]-A[1];
    const t=((P[0]-A[0])*vx+(P[1]-A[1])*vy)/((vx*vx+vy*vy)||1);
    return [A[0]+t*vx, A[1]+t*vy];
  }
  function polyLen(arr){
    let s=0; for(let i=0;i<arr.length;i++){ const a=arr[i], b=arr[(i+1)%arr.length]; s+=dist(a,b); } return s;
  }
  function sqMark(F,P,col){
    const vx=P[0]-F[0], vy=P[1]-F[1], L=Math.hypot(vx,vy)||1;
    const ux=vx/L, uy=vy/L, px=-uy, py=ux, s=8;
    const a=[F[0]+ux*s, F[1]+uy*s], b=[a[0]+px*s, a[1]+py*s], c=[F[0]+px*s, F[1]+py*s];
    return `<path d="M ${a[0].toFixed(1)} ${a[1].toFixed(1)} L ${b[0].toFixed(1)} ${b[1].toFixed(1)} L ${c[0].toFixed(1)} ${c[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="1.5"/>`;
  }
  function frame(inner, vb){
    const box=vb||'0 0 220 200';
    return `${CSS}<svg viewBox="${box}" style="width:min(100%,270px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">
      <defs>
        <linearGradient id="l425g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7fd1ff33"/><stop offset="100%" stop-color="#ffd76a22"/></linearGradient>
      </defs>
      ${inner}
    </svg>`;
  }
  function note(title, text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:#ffd76a;font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  function vtx(pt,name,col,on,delay,pop){
    const ly = pt[1]<70 ? pt[1]-12 : pt[1]+18;
    return `<g style="cursor:pointer" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sel='${name}';chRender(0);}catch(e){}">
      ${on?`<circle cx="${pt[0]}" cy="${pt[1]}" r="11" fill="${col}33"><animate attributeName="r" values="8;13;8" dur="1.5s" repeatCount="indefinite"/></circle>`:''}
      <circle ${pop?'class="l425-dotc"':''} style="animation-delay:${delay||0}s" cx="${pt[0]}" cy="${pt[1]}" r="${on?6.5:5}" fill="${on?col:'#1a2e24'}" stroke="${col}" stroke-width="2"/>
      ${lab(pt[0], ly, name, col)}
    </g>`;
  }

  const A0=[110,28], B0=[28,148], C0=[192,148];

  function visD425(el){
    try{ window._waveCss('css-l425', CSS); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'425';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const doDraw = st.seen!==step;
    if(st.seen!==step){ st.seen=step; st.selDrawn=null; }
    const aN = Math.max(6, Math.min(16, +(st.a==null?10:st.a)));
    const hN = Math.max(4, Math.min(12, +(st.h==null?6:st.h)));
    const tM = Math.max(0.08, Math.min(0.92, st.t==null?0.35:+st.t));
    const sel = st.sel||'A';
    const S = 0.5*aN*hN;
    let h='';

    if(step===0){
      const tri=`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]}`;
      const H=[110,148];
      h=`<div class="wv-col">
        ${frame(
          (doDraw
            ? `<polygon points="${tri}" fill="url(#l425g)" stroke="#7fd1ff" stroke-width="2.4" ${ink(polyLen([A0,B0,C0]),1.4,0)}/>`
            : `<polygon points="${tri}" fill="url(#l425g)" stroke="#7fd1ff" stroke-width="2.4"/>`)+
          `<line x1="${A0[0]}" y1="${A0[1]}" x2="${H[0]}" y2="${H[1]}" stroke="#ffd76a" stroke-width="2.2" class="l425-glow" ${doDraw?ink(dist(A0,H)+8,1,.35):''}/>`+
          sqMark(H,A0,'#ffd76a')+
          lab(110,178,'a = 10','#8fd1a8')+
          lab(128,92,'h = ?','#ffd76a')+
          `<g class="l425-dotc"><rect x="6" y="6" width="64" height="20" rx="8" fill="#13251c" stroke="#ffd76a"/>
           ${lab(38,21,'S = 30','#ffd76a')}</g>`+
          vtx(A0,'A','#ffd76a',false,0,doDraw)+vtx(B0,'B','#7fd1ff',false,.1,doDraw)+vtx(C0,'C','#8fd1a8',false,.2,doDraw)
        )}
        ${note('Загадка','Линейкой высоту не достать. Зато известны площадь и основание. Если площадь — половина «основание × высота», то высоту можно вычислить, а не мерить.')}
      </div>`;
    } else if(step===1){
      const top=`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]}`;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${top}" fill="rgba(127,209,255,.22)" stroke="#7fd1ff" stroke-width="2.3" ${doDraw?ink(polyLen([A0,B0,C0]),1.2,0):''}/>`+
          `<g class="l425-flip"><polygon points="${top}" fill="rgba(255,215,106,.22)" stroke="#ffd76a" stroke-width="2.3"/></g>`+
          lab(110,168,'основание a','#8fd1a8')
        , '0 0 220 280')}
        ${note('Почему появляется ½?','Жёлтый треугольник переворачивается вокруг основания. Два одинаковых треугольника складываются в параллелограмм. Один занимает ровно половину — поэтому в формуле стоит ½.')}
      </div>`;
    } else if(step===2){
      const base=80+aN*6;
      const ht=36+hN*7;
      const Bx=110-base/2, Cx=110+base/2, By=168, Ay=168-ht;
      const tri=`${110},${Ay} ${Bx},${By} ${Cx},${By}`;
      const rect=`${Bx},${Ay} ${Cx},${Ay} ${Cx},${By} ${Bx},${By}`;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${rect}" fill="rgba(143,209,168,.08)" stroke="#3d5c49" stroke-width="1.2" stroke-dasharray="4 3"/>`+
          `<polygon class="l425-fill" points="${tri}" fill="rgba(127,209,255,.28)" stroke="#7fd1ff" stroke-width="2.4"/>`+
          `<line class="l425-grow" x1="110" y1="${Ay}" x2="110" y2="${By}" stroke="#ffd76a" stroke-width="2.2"/>`+
          sqMark([110,By],[110,Ay],'#ffd76a')+
          lab(110,186,'a = '+aN,'#8fd1a8')+
          lab(124,(Ay+By)/2,'h = '+hN,'#ffd76a','start')+
          lab(110,Ay-12,'S = '+(S%1?S.toFixed(1):S),'#ffd76a')
        , '0 0 220 200')}
        <div class="wv-ans" style="font-size:16px">S = ½ · ${aN} · ${hN} = ${S%1?S.toFixed(1):S}</div>
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,300px)">
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">основание a
            <input type="range" min="6" max="16" value="${aN}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=+this.value;chRender(0);}catch(e){}">
            <b style="color:#8fd1a8;min-width:18px">${aN}</b>
          </label>
          <label class="wv-sml" style="display:flex;align-items:center;gap:8px">высота h
            <input type="range" min="4" max="12" value="${hN}" style="flex:1"
              oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h=+this.value;chRender(0);}catch(e){}">
            <b style="color:#ffd76a;min-width:18px">${hN}</b>
          </label>
        </div>
        ${note('Простыми словами','Пунктирный прямоугольник — это основание × высота. Треугольник занимает его половину. Поэтому в формуле всегда стоит ½. Подвигай ползунки и смотри, как растёт S.')}
      </div>`;
    } else if(step===3){
      const B=[36,158], C=[176,158], A=[36,38];
      const legs = st.leg==='ac';
      const tri=`${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}`;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${tri}" fill="rgba(143,209,168,.18)" stroke="#8fd1a8" stroke-width="2.5" ${doDraw?ink(polyLen([A,B,C]),1.3,0):''}/>`+
          `<rect x="36" y="146" width="12" height="12" fill="none" stroke="#ffd76a" stroke-width="1.8"/>`+
          (legs
            ? `<line x1="${A[0]}" y1="${A[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#ffd76a" stroke-width="3" class="l425-glow"/>`+
              lab(18,100,'катет 4','#7fd1ff')+lab(110,184,'гипотенуза','#ffd76a')
            : `<line x1="${B[0]}" y1="${B[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#ffd76a" stroke-width="3.2" class="l425-glow"/>`+
              `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="#7fd1ff" stroke-width="3.2" class="l425-glow"/>`+
              lab(18,100,'катет 4','#7fd1ff')+lab(110,184,'катет 3','#ffd76a'))+
          vtx(A,'A','#ffd76a',false,0,doDraw)+vtx(B,'B','#7fd1ff',false,.1,doDraw)+vtx(C,'C','#8fd1a8',false,.2,doDraw)
        )}
        <button type="button" class="btn" style="margin-top:4px" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].leg=CHS[k].leg==='ac'?'ab':'ac';chRender(0);}catch(e){}">${legs?'Катеты как основание и высота':'Гипотенуза как основание'}</button>
        <div class="wv-ans" style="font-size:16px">S = ½ · 3 · 4 = 6</div>
        ${note('Прямой угол уже есть','Катеты сами стоят буквой Г. Один — основание, второй — высота, ничего опускать не нужно. ½·3·4 = 6. Кнопка показывает: можно взять и гипотенузу, но тогда высота другая — площадь та же.')}
      </div>`;
    } else if(step===4){
      const way=!!st.way;
      const H=[110,148];
      const F=foot(C0,A0,B0);
      const tri=`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]}`;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${tri}" fill="rgba(127,209,255,.16)" stroke="#7fd1ff" stroke-width="2.3" ${doDraw?ink(polyLen([A0,B0,C0]),1.2,0):''}/>`+
          (way
            ? `<line x1="${C0[0]}" y1="${C0[1]}" x2="${F[0].toFixed(1)}" y2="${F[1].toFixed(1)}" stroke="#ffd76a" stroke-width="2.2" ${ink(dist(C0,F)+8,1,.1)}/>`+
              sqMark(F,C0,'#ffd76a')+
              lab((A0[0]+B0[0])/2-6,(A0[1]+B0[1])/2-8,'b = 8','#8fd1a8')+
              lab(F[0]+16,(F[1]+C0[1])/2,'h = 7.5','#ffd76a')
            : `<line x1="${A0[0]}" y1="${A0[1]}" x2="${H[0]}" y2="${H[1]}" stroke="#ffd76a" stroke-width="2.2" ${doDraw?ink(dist(A0,H)+8,1,.15):''}/>`+
              sqMark(H,A0,'#ffd76a')+
              lab(110,178,'a = 10','#8fd1a8')+
              lab(128,92,'h = 6','#ffd76a'))+
          vtx(A0,'A','#ffd76a',!way,0,doDraw)+vtx(B0,'B','#7fd1ff',false,.1,doDraw)+vtx(C0,'C','#8fd1a8',way,.2,doDraw)
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].way=!CHS[k].way;chRender(0);}catch(e){}">${way?'Способ 1: основание 10':'Способ 2: другая сторона'}</button>
        <div class="wv-ans" style="font-size:15px">${way?'½ · 8 · 7.5 = 30':'½ · 10 · 6 = 30'}</div>
        ${note('Одна площадь — два счёта','Фигура не меняется, значит оба ответа равны: ½·10·6 = ½·8·7.5. Приравниваем — и можно найти неизвестную сторону или высоту. Это и есть метод площадей.')}
      </div>`;
    } else if(step===5){
      const map={
        A:{P:A0, base:[B0,C0], col:'#ffd76a'},
        B:{P:B0, base:[A0,C0], col:'#7fd1ff'},
        C:{P:C0, base:[A0,B0], col:'#8fd1a8'}
      };
      const m=map[sel]||map.A;
      const F=foot(m.P, m.base[0], m.base[1]);
      const tri=`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]}`;
      const drawH = doDraw || st.selDrawn!==sel;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${tri}" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.2"/>`+
          `<line x1="${m.base[0][0]}" y1="${m.base[0][1]}" x2="${m.base[1][0]}" y2="${m.base[1][1]}" stroke="${m.col}" stroke-width="3"/>`+
          (drawH
            ? `<line x1="${m.P[0]}" y1="${m.P[1]}" x2="${F[0].toFixed(1)}" y2="${F[1].toFixed(1)}" stroke="${m.col}" stroke-width="2.2" ${ink(dist(m.P,F)+10,1.1,0)}/>`
            : `<line x1="${m.P[0]}" y1="${m.P[1]}" x2="${F[0].toFixed(1)}" y2="${F[1].toFixed(1)}" stroke="${m.col}" stroke-width="2.2"/>`)+
          sqMark(F,m.P,m.col)+
          vtx(A0,'A','#ffd76a',sel==='A',0,doDraw)+vtx(B0,'B','#7fd1ff',sel==='B',.08,doDraw)+vtx(C0,'C','#8fd1a8',sel==='C',.16,doDraw)
        )}
        <div class="wv-ans" style="font-size:15px">a · hₐ = b · h_b = c · h_c</div>
        ${note('Кликни вершину','Площадь одна, поэтому произведение стороны и высоты к ней всегда одно и то же. Высота дорисуется до прямой стороны. Нажми A, потом B, потом C — увидишь три пары с одним произведением.')}
      </div>`;
      st.selDrawn=sel;
    } else if(step===6){
      const h2 = Math.max(3, Math.min(12, +(st.h2==null?8:st.h2)));
      const h1=4;
      const B=[24,168], C=[108,168], E=[132,168], F=[216,168];
      const A=[66,168-h1*10], D=[174,168-h2*10];
      const s1=0.5*8*h1, s2=0.5*8*h2;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${A[0]},${A[1]} ${B[0]},${B[1]} ${C[0]},${C[1]}" fill="rgba(127,209,255,.28)" stroke="#7fd1ff" stroke-width="2"/>`+
          `<polygon points="${D[0]},${D[1]} ${E[0]},${E[1]} ${F[0]},${F[1]}" fill="rgba(255,215,106,.28)" stroke="#ffd76a" stroke-width="2"/>`+
          `<line x1="66" y1="${A[1]}" x2="66" y2="168" stroke="#7fd1ff" stroke-width="1.6" stroke-dasharray="4 3"/>`+
          `<line x1="174" y1="${D[1]}" x2="174" y2="168" stroke="#ffd76a" stroke-width="1.6" stroke-dasharray="4 3"/>`+
          lab(66,188,'a','#8fd1a8')+lab(174,188,'a','#8fd1a8')+
          lab(80,(A[1]+168)/2,'h₁='+h1,'#7fd1ff','start')+
          lab(188,(D[1]+168)/2,'h₂='+h2,'#ffd76a','start')+
          lab(66,A[1]-10,'S₁='+s1,'#7fd1ff')+
          lab(174,D[1]-10,'S₂='+s2,'#ffd76a')
        , '0 0 240 204')}
        <div class="wv-ans" style="font-size:15px">S₁ : S₂ = ${h1} : ${h2}  →  ${s1} : ${s2}</div>
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">высота справа
          <input type="range" min="3" max="12" value="${h2}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h2=+this.value;chRender(0);}catch(e){}">
          <b style="color:#ffd76a">${h2}</b>
        </label>
        ${note('Одинаковые основания','У обоих основание одно и то же. В формуле ½·a сокращается — остаётся отношение высот. Подними жёлтую вершину: площадь растёт ровно так же, как высота.')}
      </div>`;
    } else if(step===7){
      const B=[24,160], C=[196,160], A=[110,28];
      const Mx=B[0]+tM*(C[0]-B[0]), M=[Mx,160];
      const left=`${A[0]},${A[1]} ${B[0]},${B[1]} ${M[0]},${M[1]}`;
      const right=`${A[0]},${A[1]} ${M[0]},${M[1]} ${C[0]},${C[1]}`;
      const bm=Math.max(1, Math.round(tM*10)), mc=Math.max(1, 10-bm);
      const mid=Math.abs(tM-0.5)<0.03;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${left}" fill="rgba(127,209,255,.32)" stroke="#7fd1ff" stroke-width="2"/>`+
          `<polygon points="${right}" fill="rgba(255,215,106,.32)" stroke="#ffd76a" stroke-width="2"/>`+
          `<line x1="${A[0]}" y1="${A[1]}" x2="${M[0]}" y2="${M[1]}" stroke="#8fd1a8" stroke-width="1.8" stroke-dasharray="5 3"/>`+
          `<circle cx="${M[0]}" cy="${M[1]}" r="6.5" fill="#8fd1a8"/>`+
          lab(M[0], M[1]+18, 'M', '#8fd1a8')+
          lab(A[0], A[1]-10, 'A', '#ffd76a')+
          lab(B[0]-2, B[1]+18, 'B', '#7fd1ff')+
          lab(C[0]+2, C[1]+18, 'C', '#ffd76a')+
          lab((B[0]+M[0])/2, 188, 'BM='+bm, '#7fd1ff')+
          lab((M[0]+C[0])/2, 188, 'MC='+mc, '#ffd76a')
        , '0 0 220 204')}
        <div class="wv-ans" style="font-size:15px">S слева : S справа = BM : MC${mid?'  ·  пополам!':''}</div>
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">точка M
          <input type="range" min="8" max="92" value="${Math.round(tM*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;chRender(0);}catch(e){}">
        </label>
        ${note('Общая вершина','Голубой и жёлтый треугольники имеют одну высоту из A. Значит площади относятся как основания BM и MC. Поставь M на середину — медианы делят площадь пополам. Это частый олимпиадный ход.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[
            ['1','Найди площадь удобно','через ½·a·h или как половину прямоугольника','#7fd1ff'],
            ['2','Найди её же иначе','другая сторона, другая высота, другой разрез','#8fd1a8'],
            ['3','Приравняй оба выражения','площадь одна — значит это уравнение','#ffd76a'],
            ['4','Реши и проверь','неизвестная сторона, высота или отношение','#ff8ac0']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.12}s;display:flex;gap:10px;align-items:flex-start;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[3]};border-radius:10px;padding:8px 12px;text-align:left">
            <b style="color:${x[3]};font-size:18px;min-width:18px">${x[0]}</b>
            <span><div style="color:#e8dcc8;font-size:14px">${x[1]}</div><div class="wv-sml" style="margin-top:2px">${x[2]}</div></span>
          </div>`).join('')}
        </div>
        ${note('Площадь — мост','Не обязательно гоняться за длинами. Посчитай «сколько места занимает фигура» двумя путями — и отрезки сами найдутся.')}
      </div>`;
    } else {
      const H=[110,148];
      const tri=`${A0[0]},${A0[1]} ${B0[0]},${B0[1]} ${C0[0]},${C0[1]}`;
      h=`<div class="wv-col">
        ${frame(
          `<polygon points="${tri}" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="2.4" ${doDraw?ink(polyLen([A0,B0,C0]),1.2,0):''}/>`+
          `<line x1="${A0[0]}" y1="${A0[1]}" x2="${H[0]}" y2="${H[1]}" stroke="#ffd76a" stroke-width="2.2" ${doDraw?ink(dist(A0,H)+8,1,.2):''}/>`+
          sqMark(H,A0,'#ffd76a')+
          lab(110,178,'a = 10','#8fd1a8')+
          lab(128,92,'h = 6','#ffd76a')+
          vtx(A0,'A','#ffd76a',false,0,doDraw)+vtx(B0,'B','#7fd1ff',false,.1,doDraw)+vtx(C0,'C','#8fd1a8',false,.2,doDraw)
        )}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">½ · 10 · 6 = ?</div>
        ${note('В карман','Треугольник — половина прямоугольника. Основание 10, высота 6 → половина от 60. Дальше проверка и две задачи.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[425]=visD425;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===425){ arr[i]=L425; f=true; break; } }
    if(!f) arr.push(L425);
  })();
})();
/* ================= УРОК 426 · Вписанные углы и четырёхугольники ================= */
(function(){
  const L426 = {
    id: 426, title: 'Вписанные углы и четырёхугольники', ico: '⭕',
    src: 'Математика · 8 класс · Олимп-8: вписанные углы', subj: 'math',
    explain: [
      'Смотри: четыре точки A, B, C, D. Вопрос простой — можно ли через них провести одну окружность, как обруч? На глаз не угадаешь. Правило спрятано в углах. Сейчас его откроем шаг за шагом.',
      'Вписанный угол сидит на окружности: вершина на ободе, две стороны идут хордами к двум другим точкам. Как будто ты стоишь на краю круглого озера и смотришь на берег между двумя деревьями.',
      'Главное правило: такой угол равен половине дуги, на которую смотрит. Дуга 80° — угол 40°. Дуга 180° (это диаметр) — угол 90°. Нажми на точку A, B, C или D: дуга загорится целиком, угол покажет «половину».',
      'Если несколько углов смотрят на одну и ту же дугу — они равны. Как два зрителя одного спектакля: видят одно и то же. На рисунке ∠A и ∠P оба смотрят на дугу BD, поэтому ∠A = ∠P.',
      'Когда все четыре вершины лежат на окружности, четырёхугольник называют вписанным. У него особое свойство: сложи противоположные углы — получится ровно 180°. То есть ∠A + ∠C = 180° и ∠B + ∠D = 180°.',
      'Почему 180°? Угол A смотрит на одну дугу, угол C — на другую. Эти две дуги вместе — вся окружность, 360°. Каждый угол берёт половину своей дуги. Половина плюс половина = 180°. Вот и всё.',
      'И наоборот: если в четырёхугольнике противоположные углы в сумме дают 180°, через вершины точно можно провести окружность. Не надо чертить наугад — сложи углы через одну.',
      'Некоторые фигуры вписаны всегда. Прямоугольник: все углы по 90°, а 90+90=180. Квадрат — тоже. Равнобедренная трапеция — тоже, потому что углы при основании равны.',
      'Ещё одна картинка: нарисуй диаметр. Это дуга 180°. Любая точка P на окружности даёт прямой угол: ∠APB = 90°. Это теорема Фалеса. Нажми «Оживить» и смотри: P бежит до конца дуги, угол не меняется.',
      'Запомни три фразы. Вписанный угол — половина дуги. Противоположные углы вписанного четырёхугольника — 180°. Угол на диаметре — 90°. Теперь проверь себя и реши две задачи.'
    ],
    check: { q: 'Сумма противоположных углов вписанного четырёхугольника?', choices: ['180°', '90°', '360°', '270°'], ans: 0,
      exp: 'Две дуги вместе — вся окружность 360°. Каждый угол берёт половину своей дуги, поэтому сумма 180°.' },
    tasks: [
      { q: 'Чему равен вписанный угол, опирающийся на диаметр? (в градусах)', kind: 'unit', ans: 90, tol: 0,
        hints: ['Диаметр высекает дугу 180° — половину окружности.', 'Вписанный угол всегда равен половине дуги, на которую смотрит.', 'Половина от 180 — это 90.'], sol: '90° — угол в полуокружности прямой. Это теорема Фалеса.' },
      { q: 'Вписанный угол равен…', kind: 'choice',
        choices: ['половине дуги, на которую опирается', 'самой дуге', 'удвоенной дуге', 'четверти дуги'], ans: 0, tol: 0,
        hints: ['Вершина угла сидит на окружности, стороны — хорды.', 'Он «берёт» половину той дуги, на которую смотрит.'], sol: 'половине дуги, на которую опирается' }
    ]
  };

  const CX=110, CY=108, R=76;
  const CIRC=2*Math.PI*R+12;
  const CSS = `<style>
    @keyframes l426spin{to{transform:rotate(360deg)}}
    @keyframes l426pulse{0%,100%{opacity:.45}50%{opacity:1}}
    @keyframes l426pop{0%{transform:scale(0)}70%{transform:scale(1.18)}100%{transform:scale(1)}}
    @keyframes l426glow{0%,100%{filter:drop-shadow(0 0 1px #ffd76a)}50%{filter:drop-shadow(0 0 8px #ffd76a)}}
    @keyframes l426ink{to{stroke-dashoffset:0}}
    .l426-orbit{transform-origin:${CX}px ${CY}px;animation:l426spin 8s linear infinite}
    .l426-orbit2{transform-origin:${CX}px ${CY}px;animation:l426spin 12s linear infinite reverse}
    .l426-arc{animation:l426pulse 1.8s ease-in-out infinite}
    .l426-dotc{transform-box:fill-box;transform-origin:center;animation:l426pop .4s cubic-bezier(.2,1.4,.4,1) both}
    .l426-glow{animation:l426glow 1.8s ease-in-out infinite}
    .l426-lab{paint-order:stroke fill;stroke:#0c1a14;stroke-width:3.2px;stroke-linejoin:round}
    .l426-ink{animation:l426ink 1.55s cubic-bezier(.2,.75,.15,1) forwards}
  </style>`;

  function P(deg){
    const a=deg*Math.PI/180;
    return [CX+R*Math.cos(a), CY+R*Math.sin(a)];
  }
  function outLabel(pt){
    const dx=pt[0]-CX, dy=pt[1]-CY, L=Math.hypot(dx,dy)||1;
    const k=20/L;
    return [pt[0]+dx*k, pt[1]+dy*k];
  }
  function arcSweep(a1,a2){
    let d=a2-a1; while(d<=0) d+=360; while(d>360) d-=360; return d;
  }
  function arcPath(a1,a2,r){
    const to=(d)=>{const t=d*Math.PI/180; return [CX+r*Math.cos(t), CY+r*Math.sin(t)];};
    const d=arcSweep(a1,a2);
    const large=d>180?1:0;
    const [x1,y1]=to(a1), [x2,y2]=to(a2);
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  function arcLen(a1,a2,r){ return arcSweep(a1,a2)/360*2*Math.PI*r+10; }
  function polyLen(arr){
    let s=0;
    for(let i=0;i<arr.length;i++){
      const a=arr[i], b=arr[(i+1)%arr.length];
      s+=Math.hypot(b[0]-a[0], b[1]-a[1]);
    }
    return s+10;
  }
  function ink(len,dur,delay){
    const L=Math.ceil((len||1)+16);
    return `stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}" class="l426-ink" style="animation-duration:${dur||1.45}s;animation-delay:${delay||0}s"`;
  }
  function pieWedge(r,a1,a2,fill){
    const to=(d)=>{const t=d*Math.PI/180; return [CX+r*Math.cos(t), CY+r*Math.sin(t)];};
    const d=arcSweep(a1,a2);
    const large=d>180?1:0;
    const [x1,y1]=to(a1), [x2,y2]=to(a2);
    return `<path d="M ${CX} ${CY} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${fill}"/>`;
  }
  function angMark(A,B,C,col,lab){
    const v=(X,Y)=>[X[0]-Y[0], X[1]-Y[1]];
    const n=(V)=>{const L=Math.hypot(V[0],V[1])||1; return [V[0]/L, V[1]/L];};
    const u=n(v(A,B)), w=n(v(C,B));
    const s=16;
    const p1=[B[0]+u[0]*s, B[1]+u[1]*s], p2=[B[0]+w[0]*s, B[1]+w[1]*s];
    const bx=u[0]+w[0], by=u[1]+w[1], bL=Math.hypot(bx,by)||1;
    const labPt=[B[0]+(bx/bL)*32, B[1]+(by/bL)*32];
    const q1=[B[0]+u[0]*s*0.7, B[1]+u[1]*s*0.7], q2=[B[0]+w[0]*s*0.7, B[1]+w[1]*s*0.7];
    const labTxt = lab
      ? `<text class="l426-lab" x="${labPt[0].toFixed(1)}" y="${(labPt[1]+4).toFixed(1)}" text-anchor="middle" font-size="11" fill="${col}" font-family="Georgia,serif">${lab}</text>`
      : '';
    return `<path d="M ${q1[0].toFixed(1)} ${q1[1].toFixed(1)} Q ${labPt[0].toFixed(1)} ${labPt[1].toFixed(1)} ${q2[0].toFixed(1)} ${q2[1].toFixed(1)}" fill="${col}33" stroke="${col}" stroke-width="1.4"/>
      <path class="l426-glow" d="M ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L ${B[0].toFixed(1)} ${B[1].toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>
      ${labTxt}`;
  }
  function dot(pt,name,col,on,delay,pop){
    const L=outLabel(pt);
    return `<g style="cursor:pointer" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sel='${name}';chRender(0);}catch(e){}">
      ${on?`<circle cx="${pt[0]}" cy="${pt[1]}" r="11" fill="${col}30"><animate attributeName="r" values="9;14;9" dur="1.4s" repeatCount="indefinite"/></circle>`:''}
      <circle ${pop?'class="l426-dotc"':''} style="animation-delay:${delay||0}s" cx="${pt[0]}" cy="${pt[1]}" r="${on?7:5.5}" fill="${on?col:'#1a2e24'}" stroke="${col}" stroke-width="2"/>
      <text class="l426-lab" x="${L[0].toFixed(1)}" y="${(L[1]+4).toFixed(1)}" text-anchor="middle" font-size="13" fill="${col}" font-family="Georgia,serif">${name}</text>
    </g>`;
  }
  function sparks(){
    return `<g class="l426-orbit"><circle cx="${CX+R}" cy="${CY}" r="2.6" fill="#ffd76a"/></g>
      <g class="l426-orbit2"><circle cx="${CX-R}" cy="${CY}" r="2" fill="#7fd1ff"/></g>`;
  }
  function frame(inner){
    return `${CSS}<svg viewBox="-12 -12 244 244" style="width:min(100%,270px);height:auto;background:#0c1a14;border-radius:14px;display:block;margin:0 auto;overflow:visible">
      <defs>
        <radialGradient id="l426g" cx="50%" cy="50%"><stop offset="0%" stop-color="#7fd1ff22"/><stop offset="100%" stop-color="#101f1800"/></radialGradient>
        <filter id="l426b"><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#l426g)" stroke="#3d6a7a" stroke-width="1.4"/>
      ${sparks()}
      ${inner}
    </svg>`;
  }
  function note(title, text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:#ffd76a;font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }

  const AN = { A:-50, B:35, C:145, D:215 };
  const pts = ()=>({A:P(AN.A), B:P(AN.B), C:P(AN.C), D:P(AN.D)});

  function visD426(el){
    try{ window._waveCss('css-l426', CSS); }catch(e){}
    const step=LV.step||0;
    const lk= (typeof lidKey==='function') ? lidKey(LV.id) : '426';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const playing=!!st.play && step===7;
    const doDraw = (st.seen!==step) && !playing;
    if(st.seen!==step){ st.seen=step; st.selDrawn=null; }
    const Q=pts();
    const arr=[Q.A,Q.B,Q.C,Q.D];
    const ptsStr=`${Q.A[0]},${Q.A[1]} ${Q.B[0]},${Q.B[1]} ${Q.C[0]},${Q.C[1]} ${Q.D[0]},${Q.D[1]}`;
    const poly = doDraw
      ? `<polygon points="${ptsStr}" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2" ${ink(polyLen(arr),1.35,.18)}/>`
      : `<polygon points="${ptsStr}" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2"/>`;
    const allDots=(sel)=>dot(Q.A,'A','#ffd76a',sel==='A',0,doDraw)+dot(Q.B,'B','#7fd1ff',sel==='B',.08,doDraw)+dot(Q.C,'C','#8fd1a8',sel==='C',.16,doDraw)+dot(Q.D,'D','#ff8ac0',sel==='D',.24,doDraw);
    const ring=(col,w,d,delay)=> doDraw
      ? `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${col}" stroke-width="${w}" ${ink(CIRC,d,delay)}/>`
      : `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
    const glowArc=(a1,a2,r,col,w)=>{
      const d=arcPath(a1,a2,r), L=arcLen(a1,a2,r);
      const draw = (st.selDrawn!==st.sel) || doDraw;
      return `<path class="l426-arc" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" opacity=".35" filter="url(#l426b)"/>`
        + (draw
          ? `<path d="${d}" fill="none" stroke="${col}" stroke-width="${Math.max(2.4,w-5)}" ${ink(L,1.35,0)}/>`
          : `<path d="${d}" fill="none" stroke="${col}" stroke-width="${Math.max(2.4,w-5)}"/>`);
    };
    let h='';

    if(step===0){
      h=`<div class="wv-col">
        ${frame(ring('#ffd76a',2.6,1.5,0)+poly+allDots(st.sel))}
        ${note('Что это значит?','Представь обруч. Если он проходит через все четыре точки — четырёхугольник вписанный. Сейчас научимся проверять это по углам, без циркуля.')}
      </div>`;
    } else if(step===1){
      const sel=st.sel||'A';
      const map={
        A:{from:AN.B, to:AN.D, lab:'∠A = ½ дуги BCD', col:'#ffd76a', a:Q.B, b:Q.A, c:Q.D},
        B:{from:AN.C, to:AN.A, lab:'∠B = ½ дуги CDA', col:'#7fd1ff', a:Q.C, b:Q.B, c:Q.A},
        C:{from:AN.D, to:AN.B, lab:'∠C = ½ дуги DAB', col:'#8fd1a8', a:Q.D, b:Q.C, c:Q.B},
        D:{from:AN.A, to:AN.C, lab:'∠D = ½ дуги ABC', col:'#ff8ac0', a:Q.A, b:Q.D, c:Q.C}
      };
      const m=map[sel];
      const chord=`M ${m.a[0]} ${m.a[1]} L ${m.b[0]} ${m.b[1]} L ${m.c[0]} ${m.c[1]}`;
      const cLen=Math.hypot(m.b[0]-m.a[0],m.b[1]-m.a[1])+Math.hypot(m.c[0]-m.b[0],m.c[1]-m.b[1])+8;
      const drawChord = doDraw || st.selDrawn!==sel;
      h=`<div class="wv-col">
        ${frame(
          glowArc(m.from,m.to,R,m.col,9)+
          (drawChord?`<path d="${chord}" fill="none" stroke="${m.col}" stroke-width="1.8" ${ink(cLen,.9,.12)}/>`:`<path d="${chord}" fill="none" stroke="${m.col}" stroke-width="1.8"/>`)+
          poly+angMark(m.a,m.b,m.c,m.col,'½')+allDots(sel)
        )}
        <div class="wv-ans" style="font-size:15px">${m.lab}</div>
        ${note('Простыми словами','Вписанный угол стоит на окружности и смотрит на дугу. Сколько градусов у дуги — у угла ровно половина. Нажми другую букву: дуга дорисуется до конца.')}
      </div>`;
      st.selDrawn=sel;
    } else if(step===2){
      const P2=P(105);
      const Lp=outLabel(P2);
      const pPath=`M ${Q.B[0]} ${Q.B[1]} L ${P2[0]} ${P2[1]} L ${Q.D[0]} ${Q.D[1]}`;
      const pLen=Math.hypot(P2[0]-Q.B[0],P2[1]-Q.B[1])+Math.hypot(Q.D[0]-P2[0],Q.D[1]-P2[1])+8;
      h=`<div class="wv-col">
        ${frame(
          glowArc(AN.B, AN.D, R, '#ffd76a', 9)+
          poly+
          angMark(Q.B,Q.A,Q.D,'#ffd76a','α')+
          (doDraw?`<path d="${pPath}" fill="none" stroke="#7fd1ff" stroke-width="1.8" ${ink(pLen,1,.15)}/>`:`<path d="${pPath}" fill="none" stroke="#7fd1ff" stroke-width="1.8"/>`)+
          angMark(Q.B,P2,Q.D,'#7fd1ff','α')+
          `<circle cx="${P2[0]}" cy="${P2[1]}" r="6" fill="#7fd1ff"/>
           <text class="l426-lab" x="${Lp[0].toFixed(1)}" y="${(Lp[1]+4).toFixed(1)}" text-anchor="middle" fill="#7fd1ff" font-size="13">P</text>`
        )}
        ${note('Одна дуга — один угол','A и P смотрят на одну жёлтую дугу BD. Поэтому их углы одинаковые: оба α. Где ни встань на окружности, если смотришь на ту же дугу — угол тот же.')}
      </div>`;
      st.selDrawn=st.sel;
    } else if(step===3){
      const showC=!!st.selC;
      h=`<div class="wv-col">
        ${frame(
          pieWedge(36, AN.B, AN.D, '#ffd76a33')+
          (showC?pieWedge(26, AN.D, AN.B, '#8fd1a833'):'')+
          poly+
          angMark(Q.B,Q.A,Q.D,'#ffd76a','')+
          (showC?angMark(Q.D,Q.C,Q.B,'#8fd1a8',''):'')+
          allDots(showC?'C':'A')
        )}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].selC=!CHS[k].selC;chRender(0);}catch(e){}" style="margin-top:4px">${showC?'Скрыть угол C':'Показать угол C'}</button>
        <div class="wv-ans">∠A + ∠C = 180°</div>
        ${note('Против друг друга','Возьми углы через один: A с C, B с D. У вписанного четырёхугольника эта сумма всегда 180° — как развёрнутая линейка. Нажми кнопку и сравни A и C.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${frame(
          glowArc(AN.B, AN.D, R-4, '#ffd76a', 10)+
          (function(){
            const d=arcPath(AN.D, AN.B, R-14), L=arcLen(AN.D, AN.B, R-14);
            return `<path class="l426-arc" d="${d}" fill="none" stroke="#8fd1a8" stroke-width="10" opacity=".35"/>`
              +(doDraw?`<path d="${d}" fill="none" stroke="#8fd1a8" stroke-width="5" ${ink(L,1.4,.2)}/>`:`<path d="${d}" fill="none" stroke="#8fd1a8" stroke-width="5"/>`);
          })()+
          poly+allDots('')
        )}
        ${note('Откуда берётся 180°','Жёлтая дуга и зелёная дуга вместе — целый круг, 360°. Угол A берёт половину жёлтой, угол C — половину зелёной. Половина круга = 180°. Поэтому сумма углов 180°.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${frame(poly+allDots('')+ring('#8fd1a8',2.6,1.5,.12))}
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[['если ∠A+∠C = 180°','окружность надеть можно','#8fd1a8'],
             ['если сумма не 180°','окружность не выйдет','#ff9a8a']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.12}s;display:flex;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Проверка без циркуля','Не угадывай на глаз. Сложи противоположные углы. Вышло 180° — обруч надевается. Не вышло — точки не на одной окружности.')}
      </div>`;
    } else if(step===6){
      const ell=2*Math.PI*Math.sqrt((50*50+32*32)/2)+10;
      const cir=2*Math.PI*32+10;
      h=`<div class="wv-col">
        <div class="wv-row" style="gap:10px;flex-wrap:wrap;justify-content:center">
          <div style="text-align:center">
            <svg viewBox="0 0 120 78" style="width:128px;background:#0c1a14;border-radius:10px;display:block">
              ${CSS}
              <ellipse cx="60" cy="39" rx="50" ry="32" fill="none" stroke="#7fd1ff" stroke-width="1.8" ${doDraw?ink(ell,1.4,0):''}/>
              <rect x="22" y="16" width="76" height="46" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
            </svg>
            <div class="wv-sml" style="margin-top:4px">прямоугольник</div>
          </div>
          <div style="text-align:center">
            <svg viewBox="0 0 120 78" style="width:128px;background:#0c1a14;border-radius:10px;display:block">
              ${CSS}
              <circle cx="60" cy="39" r="32" fill="none" stroke="#7fd1ff" stroke-width="1.8" ${doDraw?ink(cir,1.4,.08):''}/>
              <rect x="32" y="11" width="56" height="56" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2"/>
            </svg>
            <div class="wv-sml" style="margin-top:4px">квадрат</div>
          </div>
        </div>
        ${note('Кто всегда вписан?','Прямоугольник и квадрат: каждый угол 90°, а 90+90=180. Равнобедренная трапеция тоже: углы при основании равны, сумма противоположных снова 180°.')}
      </div>`;
    } else if(step===7){
      if(st.play && !window._l426iv){
        window._l426iv=setInterval(()=>{
          try{
            const k=lidKey(LV.id); CHS[k]=CHS[k]||{};
            const s=CHS[k];
            s.dir = s.dir||1;
            s.t = (s.t==null?0.15:s.t) + 0.01*s.dir;
            if(s.t>=1){ s.t=1; s.dir=-1; }
            if(s.t<=0){ s.t=0; s.dir=1; }
            if(LV.id===426 && LV.step===7 && s.play) chRender(0);
            else { clearInterval(window._l426iv); window._l426iv=null; }
          }catch(e){ clearInterval(window._l426iv); window._l426iv=null; }
        }, 40);
      }
      if(!st.play && window._l426iv){ clearInterval(window._l426iv); window._l426iv=null; }
      const t = (st.t==null)? 0.22 : +st.t;
      const ang = 6 + t*168;
      const Pd=P(180-ang);
      const Lp=outLabel(Pd);
      const Lft=P(180), Rgt=P(0);
      const tri=`${Lft[0]},${Lft[1]} ${Pd[0]},${Pd[1]} ${Rgt[0]},${Rgt[1]}`;
      h=`<div class="wv-col">
        ${frame(
          `<line x1="${Lft[0]}" y1="${Lft[1]}" x2="${Rgt[0]}" y2="${Rgt[1]}" stroke="#7fd1ff" stroke-width="2.4" class="l426-glow"/>
           <polygon points="${tri}" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="2"/>`+
          angMark(Lft,Pd,Rgt,'#ffd76a','90°')+
          `<circle cx="${Lft[0]}" cy="${Lft[1]}" r="5" fill="#7fd1ff"/><circle cx="${Rgt[0]}" cy="${Rgt[1]}" r="5" fill="#7fd1ff"/>
           <text class="l426-lab" x="${Lft[0]-14}" y="${Lft[1]+4}" fill="#7fd1ff" font-size="12">A</text>
           <text class="l426-lab" x="${Rgt[0]+14}" y="${Rgt[1]+4}" text-anchor="middle" fill="#7fd1ff" font-size="12">B</text>
           <circle cx="${Pd[0]}" cy="${Pd[1]}" r="10" fill="#ffd76a33"/>
           <circle cx="${Pd[0]}" cy="${Pd[1]}" r="6.5" fill="#ffd76a"/>
           <text class="l426-lab" x="${Lp[0].toFixed(1)}" y="${(Lp[1]+4).toFixed(1)}" text-anchor="middle" fill="#ffd76a" font-size="13">P</text>`
        )}
        <div style="display:flex;align-items:center;gap:8px;width:min(100%,300px);flex-wrap:wrap">
          <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].play=!CHS[k].play;chRender(0);}catch(e){}">${st.play?'⏸ Стоп':'▶ Оживить'}</button>
          <input type="range" min="0" max="100" value="${Math.round(t*100)}"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=this.value/100;CHS[k].play=false;chRender(0);}catch(e){}"
            style="flex:1;min-width:140px">
        </div>
        ${note('Теорема Фалеса','AB — диаметр, это половина окружности, 180°. Точка P бежит по ободу до конца и обратно. Угол при P всегда прямой: 180 ÷ 2 = 90.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div style="display:flex;flex-direction:column;gap:6px;width:100%;max-width:340px">
          ${[['вписанный угол','половина дуги','#ffd76a'],
             ['против. углы вписанного 4-угольника','всегда 180°','#8fd1a8'],
             ['угол на диаметре','всегда 90°','#7fd1ff']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${frame(poly+allDots(''))}
        ${note('В карман','Три фразы — и можно решать задачи. Дальше проверка: чему равна сумма противоположных углов во вписанном четырёхугольнике?')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_D[426]=visD426;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===426){ arr[i]=L426; f=true; break; } }
    if(!f) arr.push(L426);
  })();
})();



