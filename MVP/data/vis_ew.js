/* Волна E v2: уроки 427–440 (9 класс) в формате «объясни → реши + живой виджет».
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_E[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_E = window.WAVE_E || {};

/* ================= УРОК 427 · Корень n-й степени ================= */
(function(){
  const L427 = {
    id: 427, title: 'Корень n-й степени и степени', ico: '√',
    src: 'Математика · 9 класс · Алгебра 9: степени', subj: 'math',
    explain: [
      'Ты знаешь квадратный корень: √16 = 4, ведь 4² = 16. А что если число нужно «собрать» из трёх одинаковых множителей? Это кубический корень: ∛8 = 2, ведь 2³ = 2·2·2 = 8!',
      'Корень n-й степени — обратная операция к степени n. Запись ⁿ√a = b означает: bⁿ = a. Кубический корень (n = 3): ∛27 = 3, ведь 3³ = 27. Корень четвёртой степени: ⁴√16 = 2, ведь 2⁴ = 16!',
      'Проверяем: 2·2·2·2 = 16 → ⁴√16 = 2. А ⁴√81 = 3, ведь 3⁴ = 3·3·3·3 = 81. Чем больше степень, тем «меньше» корень для больших чисел — проверяй умножением!',
      'Степени с дробным показателем: a^(1/n) — это то же самое, что корень n-й степени! 25^(1/2) = √25 = 5. 8^(1/3) = ∛8 = 2. Дробный показатель = корень!',
      'Почему так? (a^(1/2))² = a^(1/2 · 2) = a¹ = a. Значит, a^(1/2) — это число, квадрат которого равен a, то есть √a! Свойства степеней работают для любых показателей.',
      'Обобщим: a^(m/n) = ⁿ√(aᵐ). Например, 27^(2/3) = ∛(27²) = ∛729 = 9. А можно иначе: (∛27)² = 3² = 9. Оба пути дают 9!',
      'Свойства корней как у степеней: ⁿ√(a·b) = ⁿ√a · ⁿ√b. Пример: √(4·9) = √36 = 6, и √4·√9 = 2·3 = 6. Корень из произведения = произведение корней!',
      'Запомни связку: ⁿ√a ⟺ a^(1/n) ⟺ «число, которое в степени n даёт a». Дробный показатель m/n = корень степени n из степени m. Всё связано!',
      'Теперь проверь себя: чему равен кубический корень из 8? Вспомни: какое число в кубе даёт 8?'
    ],
    check: { q: 'Чему равен кубический корень из 8?', choices: ['2', '3', '4', '√8'], ans: 0,
      exp: '2³ = 8.' },
    tasks: [
      { q: 'Чему равен ⁴√16?', kind: 'unit', ans: 2, tol: 0,
        hints: ['2 · 2 · 2 · 2 = 16.', '⁴√16 = 2.'], sol: '2' },
      { q: 'Чему равно 25^(1/2)?', kind: 'choice', choices: ['5', '25', '2,5', '√5'], ans: 0, tol: 0,
        hints: ['Это √25.', '25^(1/2) = 5.'], sol: '5' }
    ]
  };
  const powBox=(b,n,res,c)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c||'#3d5c49'};border-radius:12px;padding:8px 12px;min-width:80px"><div style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">${b}<sup style="font-size:12px">${n}</sup></div><div style="font-size:13px;color:${c||'#8fa08f'}">= ${res}</div></div>`;
  const rootBox=(n,a,res,c)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c||'#3d5c49'};border-radius:12px;padding:8px 12px;min-width:80px"><div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">${n===''?'√':'∛'}${a}</div><div style="font-size:13px;color:${c||'#8fa08f'}">= ${res}</div></div>`;
  function visE427(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">От квадратного к кубическому</div>
        <div class="wv-row" style="gap:10px">${rootBox('',16,4,'#8fd1a8')}${rootBox('',8,'?','#7fd1ff')}</div>
        <div class="wv-sml">√16 = 4 (4²=16) · ∛8 = ? (что в кубе = 8?)</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Корень n-й степени</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px;font-size:19px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">ⁿ√a = b ⟺ bⁿ = a</div>
        <div class="wv-row" style="gap:8px;margin-top:4px">
          ${rootBox('',27,3,'#8fd1a8')}${rootBox('',16,2,'#7fd1ff')}
        </div>
        <div class="wv-sml">3³=27 · 2⁴=16</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем умножением</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['⁴√16 = 2','2·2·2·2 = 16','#8fd1a8'],['⁴√81 = 3','3·3·3·3 = 81','#7fd1ff']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:8px 10px;min-width:120px"><b style="font-size:18px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Дробный показатель = корень!</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 14px;font-size:18px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">a^(1/n) = ⁿ√a</div>
        <div class="wv-row" style="gap:8px;margin-top:4px">
          ${chip('25^(1/2) = 5','#8fd1a8')}${chip('8^(1/3) = 2','#ffd76a')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">(a^(1/2))² = a^(1/2·2) = a¹ = a</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">a^(1/2) — число, квадрат которого a → √a!</div>
        </div>
        <div class="wv-sml">свойства степеней работают для любых показателей</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Общий случай: a^(m/n)</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">27^(2/3) = ∛(27²) = ∛729 = 9</div>
        <div class="wv-sml">или (∛27)² = 3² = 9 — оба пути дают 9!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Корень из произведения</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          ${[['√(4·9) = √36 = 6','√4·√9 = 2·3 = 6','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:8px 12px"><b style="font-size:17px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:12px;color:#8fa08f;margin-top:2px">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">ⁿ√(a·b) = ⁿ√a · ⁿ√b — корень из произведения!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Всё связано</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${chip('ⁿ√a','#8fd1a8')}${chip('= a^(1/n)','#7fd1ff')}${chip('= «в степени n даёт a»','#ffd76a')}
        </div>
        <div class="wv-sml">a^(m/n) = ⁿ√(aᵐ) — корень и степень едины!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">∛8 = ?</div>
        <div class="wv-sml">какое число в кубе даёт 8?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">2³ = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[427]=visE427;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===427){ window.ARH_LESSONS[i]=L427; break; } } })();
})();
/* ================= УРОК 428 · Тригонометрия ================= */
(function(){
  const L428 = {
    id: 428, title: 'Тригонометрия: синус, косинус, тангенс', ico: '📐',
    src: 'Математика · 9 класс · Алгебра 9: тригонометрия', subj: 'math',
    explain: [
      'В прямоугольном треугольнике есть острые углы, а у каждого острого угла — два катета: ПРОТИВОЛЕЖАЩИЙ (напротив угла) и ПРИЛЕЖАЩИЙ (рядом с углом). Их отношения с гипотенузой получили имена!',
      'Синус угла: sin α = противолежащий катет : гипотенуза. Представь угол α в треугольнике — катет напротив него делим на самую длинную сторону. Это отношение всегда меньше 1!',
      'Косинус угла: cos α = прилежащий катет : гипотенуза. Берём катет, который «прилегает» к углу, и делим на гипотенузу. Синус и косинус — два «соседа»!',
      'Тангенс угла: tg α = противолежащий катет : прилежащий катет. Это отношение двух катетов. Его можно получить и так: tg α = sin α / cos α.',
      'Как запомнить? Синус — противолежащий на гипотенузу (С-П-Г). Косинус — прилежащий на гипотенузу (К-П-Г). Тангенс — противолежащий на прилежащий (Т-П-П). «Синус смотрит на противолежащий!»',
      'Табличные значения запомни: sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2. Косинусы наоборот: cos 30° = √3/2, cos 45° = √2/2, cos 60° = 1/2.',
      'Тангенсы: tg 30° = √3/3 ≈ 0,58, tg 45° = 1, tg 60° = √3 ≈ 1,73. tg 45° = 1 — равнобедренный треугольник, катеты равны!',
      'Зачем это нужно? По одному углу и одной стороне можно найти все стороны треугольника! Если sin α = 0,6 и гипотенуза 10, то противолежащий катет = 0,6·10 = 6. Тригонометрия — ключ к треугольникам!',
      'Теперь проверь себя: синус острого угла — это отношение…? Вспомни: противолежащий катет к гипотенузе!'
    ],
    check: { q: 'Синус острого угла — это отношение…', choices: ['противолежащего катета к гипотенузе', 'прилежащего катета к гипотенузе', 'противолежащего к прилежащему', 'гипотенузы к катету'], ans: 0,
      exp: 'sin = противолежащий : гипотенуза.' },
    tasks: [
      { q: 'Чему равен tg 45°?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Табличное значение.', 'tg 45° = 1.'], sol: '1' },
      { q: 'Чему равен cos 60°?', kind: 'choice', choices: ['1/2', '√3/2', '1', '0'], ans: 0, tol: 0,
        hints: ['Табличное значение.', 'cos 60° = 1/2.'], sol: '1/2' }
    ]
  };
  const triAngle=(angle,mark)=>`<svg viewBox="0 0 220 160" style="width:200px;height:145px;background:#101f18;border-radius:12px">
    <polygon points="30,130 180,130 30,30" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="3"/>
    <path d="M30 130 L44 130 L44 116 Z" fill="#e86a5a"/>
    <path d="M30 130 L48 112 A 26 26 0 0 1 46 128 Z" fill="rgba(255,215,106,.6)"/>
    <text x="18" y="115" font-size="14" fill="#ffd76a">α</text>
    <text x="105" y="146" text-anchor="middle" font-size="12" fill="#8fd1a8">гипотенуза</text>
    <text x="34" y="60" font-size="12" fill="#ff9a8a">противолежащий</text>
    <text x="120" y="125" font-size="12" fill="#7fd1ff">прилежащий</text>
  </svg>`;
  function visE428(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольный треугольник</div>
        ${triAngle(30)}
        <div class="wv-sml">два катета у острого угла: противолежащий и прилежащий</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Синус</div>
        ${triAngle(30)}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:17px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">sin α = противолежащий : гипотенуза</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Косинус</div>
        ${triAngle(30)}
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px;font-size:17px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">cos α = прилежащий : гипотенуза</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Тангенс</div>
        ${triAngle(30)}
        <div style="background:rgba(255,138,192,.12);border:2px solid #ff8ac0;border-radius:12px;padding:8px 12px;font-size:17px;color:#ff8ac0;font-weight:bold;font-family:Georgia,serif">tg α = противолежащий : прилежащий</div>
        <div class="wv-sml">tg α = sin α / cos α!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Как запомнить</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['С-П-Г','синус — противолежащий на гипотенузу','#ff9a8a'],
            ['К-П-Г','косинус — прилежащий на гипотенузу','#7fd1ff'],
            ['Т-П-П','тангенс — противолежащий на прилежащий','#ff8ac0']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Таблица: синусы и косинусы</div>
        <div style="overflow-x:auto;width:100%;max-width:340px">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <tr style="color:#8fa08f"><th style="padding:4px;border:1px solid #3d5c49">угол</th><th style="padding:4px;border:1px solid #3d5c49">30°</th><th style="padding:4px;border:1px solid #3d5c49">45°</th><th style="padding:4px;border:1px solid #3d5c49">60°</th></tr>
            <tr style="color:#ff9a8a"><td style="padding:4px;border:1px solid #3d5c49">sin</td><td style="padding:4px;border:1px solid #3d5c49">1/2</td><td style="padding:4px;border:1px solid #3d5c49">√2/2</td><td style="padding:4px;border:1px solid #3d5c49">√3/2</td></tr>
            <tr style="color:#7fd1ff"><td style="padding:4px;border:1px solid #3d5c49">cos</td><td style="padding:4px;border:1px solid #3d5c49">√3/2</td><td style="padding:4px;border:1px solid #3d5c49">√2/2</td><td style="padding:4px;border:1px solid #3d5c49">1/2</td></tr>
          </table>
        </div>
        <div class="wv-sml">синусы и косинусы «перевёрнуты»!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Тангенсы</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${[['tg 30°','√3/3 ≈ 0,58','#8fd1a8'],['tg 45°','1','#ffd76a'],['tg 60°','√3 ≈ 1,73','#7fd1ff']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:7px 10px;min-width:90px"><b style="font-size:16px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">tg 45° = 1 — катеты равны!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Зачем это нужно</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.6">sin α = 0,6 и гипотенуза 10 → противолежащий катет = 0,6·10 = <b style="color:#8fd1a8">6</b>. По углу и стороне находим всё!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${triAngle(30)}
        <div class="wv-sml">синус — это отношение?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:15px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">противолежащий : ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[428]=visE428;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===428){ window.ARH_LESSONS[i]=L428; break; } } })();
})();
/* ================= УРОК 429 · Теоремы синусов и косинусов ================= */
(function(){
  const L429 = {
    id: 429, title: 'Теоремы синусов и косинусов', ico: '📐',
    src: 'Математика · 9 класс · Алгебра 9: треугольники', subj: 'math',
    explain: [
      'Для ЛЮБОГО треугольника (не только прямоугольного!) есть две великие теоремы: синусов и косинусов. Они позволяют находить стороны и углы, зная лишь некоторые из них.',
      'Теорема синусов: отношение стороны к синусу ПРОТИВОЛЕЖАЩЕГО угла одинаково для всех сторон: a/sin A = b/sin B = c/sin C. Это отношение равно диаметру описанной окружности!',
      'Проверим смысл: чем больше сторона, тем больше синус её противолежащего угла. Большой стороне — большой угол! Теорема синусов связывает стороны и углы попарно.',
      'Как применять? Зная два угла и одну сторону, находим остальные. Если A = 30°, B = 60°, a = 5, то из a/sin A = b/sin B: 5/0,5 = b/(√3/2) → b = 5·√3 ≈ 8,66.',
      'Теорема косинусов — обобщение Пифагора: c² = a² + b² − 2ab·cos C. Если угол C = 90°, то cos 90° = 0, и формула превращается в c² = a² + b² — теорему Пифагора!',
      'Почему так? Теорема косинусов — это «Пифагор с поправкой»: если угол острый, поправка −2ab·cos C уменьшает c², если тупой — увеличивает. Красиво!',
      'Теорема косинусов позволяет найти сторону по двум сторонам и углу между ними, а также угол по трём сторонам. Например, при a = 5, b = 7, C = 60°: c² = 25 + 49 − 2·5·7·0,5 = 74 − 35 = 39 → c = √39.',
      'Запомни пару: теорема синусов — для углов и сторон «напротив», теорема косинусов — для нахождения стороны по двум другим и углу. Вместе они решают любой треугольник!',
      'Теперь проверь себя: по теореме синусов a/sin A равно чему? Вспомни — b/sin B!'
    ],
    check: { q: 'По теореме синусов a/sin A равно…', choices: ['b/sin B', 'a/cos A', 'b·sin B', 'sin A/a'], ans: 0,
      exp: 'Отношение стороны к синусу противолежащего угла постоянно.' },
    tasks: [
      { q: 'Чему равен cos 90°?', kind: 'unit', ans: 0, tol: 0,
        hints: ['Табличное значение.', 'cos 90° = 0.'], sol: '0' },
      { q: 'Теорема косинусов для стороны c:', kind: 'choice', choices: ['c² = a² + b² − 2ab·cos C', 'c = a + b', 'c² = a² + b² всегда', 'c² = a² − b²'], ans: 0, tol: 0,
        hints: ['Обобщение Пифагора.', 'c² = a² + b² − 2ab·cos C.'], sol: 'c² = a² + b² − 2ab·cos C' }
    ]
  };
  const anyTri=()=>`<svg viewBox="0 0 220 150" style="width:200px;height:136px;background:#101f18;border-radius:12px">
    <polygon points="30,130 190,130 100,20" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="3"/>
    <text x="100" y="16" text-anchor="middle" font-size="13" fill="#ffd76a">A</text>
    <text x="22" y="145" font-size="13" fill="#8fd1a8">B</text>
    <text x="196" y="145" font-size="13" fill="#e8a0d8">C</text>
    <text x="70" y="80" font-size="12" fill="#ff9a8a">a</text>
    <text x="150" y="120" font-size="12" fill="#7fd1ff">b</text>
    <text x="110" y="145" font-size="12" fill="#ffd76a">c</text>
  </svg>`;
  function visE429(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Любой треугольник</div>
        ${anyTri()}
        <div class="wv-sml">не только прямоугольный! Две великие теоремы — синусов и косинусов</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема синусов</div>
        ${anyTri()}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">a/sin A = b/sin B = c/sin C</div>
        <div class="wv-sml">равно диаметру описанной окружности!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Смысл</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('большая сторона','#ff9a8a')}${chip('→ большой угол','#ffd76a')}${chip('большой угол','#8fd1a8')}${chip('→ большой синус','#7fd1ff')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Применяем</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">A=30°, B=60°, a=5</div>
          <div class="wv-pop2">5/0,5 = b/(√3/2)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">b = 5·√3 ≈ 8,66</div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема косинусов</div>
        ${anyTri()}
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px;font-size:16px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">c² = a² + b² − 2ab·cos C</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Пифагор — частный случай!</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">C = 90° → cos 90° = 0</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">c² = a² + b² − 0 = a² + b²!</div>
        </div>
        <div class="wv-sml">теорема Пифагора — случай C = 90°!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем сторону</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">a=5, b=7, C=60°</div>
          <div class="wv-pop2">c² = 25 + 49 − 2·5·7·0,5 = 74 − 35 = 39</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">c = √39</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Когда какую</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['теорема синусов','стороны ↔ противолежащие углы','#ffd76a'],
            ['теорема косинусов','сторона по двум сторонам и углу','#7fd1ff']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${anyTri()}
        <div class="wv-sml">a/sin A = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? / sin ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[429]=visE429;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===429){ window.ARH_LESSONS[i]=L429; break; } } })();
})();
/* ================= УРОК 430 · Геометрическая прогрессия ================= */
(function(){
  const L430 = {
    id: 430, title: 'Геометрическая прогрессия', ico: '📈',
    src: 'Математика · 9 класс · Алгебра 9: прогрессии', subj: 'math',
    explain: [
      'Геометрическая прогрессия — последовательность, где каждый следующий член получается умножением на ОДНО И ТО ЖЕ число q. Пример: 2, 6, 18, 54… Каждый раз умножаем на 3!',
      'Число q называют знаменателем прогрессии. Его находят делением: q = b₂/b₁. Для 2, 6, 18: q = 6 : 2 = 3. Проверяем: 6·3 = 18 — да, знаменатель 3!',
      'Формула n-го члена: bₙ = b₁ · q^(n−1). Для 2, 6, 18 (b₁ = 2, q = 3): b₃ = 2·3² = 2·9 = 18. Верно! Через формулу находим любой член без перебора.',
      'Продолжи прогрессию 3, 6, 12: q = 6:3 = 2. Следующий член: 12·2 = 24. А дальше 48, 96… Члены растут всё быстрее — вот сила умножения!',
      'Если |q| < 1, прогрессия УБЫВАЕТ: 100, 50, 25, 12,5… (q = 1/2). Члены уменьшаются, но никогда не достигают нуля — только стремятся к нему!',
      'Сумма первых n членов: Sₙ = b₁·(qⁿ − 1)/(q − 1). Для 2, 6, 18 (n = 3): S = 2·(27−1)/(3−1) = 2·26/2 = 26. Проверка: 2+6+18 = 26 ✔!',
      'Геометрическая прогрессия в жизни — сложный процент! Вклад 1000 руб. под 10% годовых: через год 1000·1,1 = 1100, через два 1100·1,1 = 1210. Это умножение на 1,1 каждый год!',
      'Заметь разницу: арифметическая прогрессия прибавляет (2, 4, 6, 8…), геометрическая — умножает (2, 4, 8, 16…). Умножение растёт гораздо быстрее сложения!',
      'Теперь проверь себя: в прогрессии 2, 6, 18 чему равен знаменатель q? Вспомни: раздели 6 на 2!'
    ],
    check: { q: 'В прогрессии 2, 6, 18 чему равен знаменатель q?', choices: ['3', '4', '6', '2'], ans: 0,
      exp: '6 : 2 = 3.' },
    tasks: [
      { q: 'Продолжи прогрессию 3, 6, 12: чему равен следующий член?', kind: 'unit', ans: 24, tol: 0,
        hints: ['q = 2.', '12 · 2 = 24.'], sol: '24' },
      { q: 'Вклад 1000 руб. под 10% годовых (сложный процент). Сколько через 2 года?', kind: 'choice', choices: ['1210 руб.', '1200 руб.', '1100 руб.', '2000 руб.'], ans: 0, tol: 0,
        hints: ['1000·1,1·1,1.', '1000 · 1,1 · 1,1 = 1210 руб.'], sol: '1210 руб.' }
    ]
  };
  const term=(n,c,big)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c};border-radius:12px;padding:${big?'10px 14px':'6px 10px'};min-width:${big?70:54}px"><b style="font-size:${big?24:18}px;color:${c};font-family:Georgia,serif">${n}</b></div>`;
  function visE430(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Умножаем каждый раз!</div>
        <div class="wv-row" style="gap:6px">${[2,6,18,54].map(n=>term(n,'#ffd76a')).join('<span style="color:#8fa08f;font-size:20px">×3</span>')}</div>
        <div class="wv-sml">каждый член = предыдущий · 3</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Знаменатель q</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          ${term(2,'#7fd1ff')}<span style="color:#8fa08f;font-size:22px">→</span>${term(6,'#8fd1a8')}<span style="color:#8fa08f;font-size:22px">→</span>${term(18,'#ffd76a')}
        </div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">q = 6 : 2 = 3</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Формула n-го члена</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px;font-size:19px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">bₙ = b₁ · q^(n−1)</div>
        <div class="wv-sml">b₃ = 2 · 3² = 18 — без перебора!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Продолжаем 3, 6, 12</div>
        <div class="wv-row" style="gap:6px">${[3,6,12].map(n=>term(n,'#7fd1ff')).join('<span style="color:#8fa08f;font-size:18px">×2</span>')}<span style="color:#8fa08f;font-size:22px">→</span>${term(24,'#ffd76a',true)}</div>
        <div class="wv-sml">q = 2 · 12·2 = 24 · дальше 48, 96 — всё быстрее!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Убывающая прогрессия</div>
        <div class="wv-row" style="gap:6px">${[100,50,25,'12,5'].map(n=>term(n,'#8fd1a8')).join('<span style="color:#8fa08f;font-size:16px">×½</span>')}</div>
        <div class="wv-sml">|q| < 1 → члены убывают, стремясь к нулю!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма n членов</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 14px;font-size:17px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">Sₙ = b₁·(qⁿ − 1)/(q − 1)</div>
        <div style="display:flex;flex-direction:column;gap:4px;font-size:15px;color:#e8dcc8;text-align:center;margin-top:4px">
          <div class="wv-pop">S₃ = 2·(27−1)/2 = 26</div>
          <div class="wv-pop2" style="color:#8fd1a8">проверка: 2+6+18 = 26 ✔</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Сложный процент</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center">
          ${term('1000 ₽','#8fd1a8')}<span style="color:#8fa08f;font-size:18px">×1,1</span>${term('1100 ₽','#7fd1ff')}<span style="color:#8fa08f;font-size:18px">×1,1</span>${term('1210 ₽','#ffd76a')}
        </div>
        <div class="wv-sml">10% годовых = умножение на 1,1 каждый год!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Арифметическая vs геометрическая</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:15px;color:#7fd1ff">арифметическая +</b><div style="font-size:12px;color:#9ec0a8">2, 4, 6, 8…</div></div>
          <div style="text-align:center;background:rgba(255,215,106,.08);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px"><b style="font-size:15px;color:#ffd76a">геометрическая ×</b><div style="font-size:12px;color:#cbb89a">2, 4, 8, 16…</div></div>
        </div>
        <div class="wv-sml">умножение растёт быстрее сложения!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:6px">${[2,6,18].map(n=>term(n,'#ffd76a')).join('<span style="color:#8fa08f;font-size:18px">?</span>')}</div>
        <div class="wv-sml">q = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">6 : 2 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[430]=visE430;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===430){ window.ARH_LESSONS[i]=L430; break; } } })();
})();
/* ================= УРОК 431 · Функции: свойства и обратная функция ================= */
(function(){
  const L431 = {
    id: 431, title: 'Функции: свойства и обратная функция', ico: '🔁',
    src: 'Математика · 9 класс · Алгебра 9: функции', subj: 'math',
    explain: [
      'Функция — это правило: каждому x соответствует ровно одно y. Запись y = f(x) читается «у равно эф от икс». Функции описывают, как одна величина зависит от другой!',
      'Значение функции: f(3) для f(x) = 2x + 1 — это подстановка x = 3: f(3) = 2·3 + 1 = 7. «Подставь и посчитай» — главное действие с функциями!',
      'Чётность: функция ЧЁТНАЯ, если f(−x) = f(x). У y = x²: (−x)² = x² — график симметричен относительно оси y. Нечётная: f(−x) = −f(x), как y = x³ — симметрия через начало координат.',
      'Проверь: f(x) = x². Берём x = 2: f(2) = 4. Берём x = −2: f(−2) = 4. Одинаково! Значит, функция чётная. Её график — парабола, симметричная относительно оси y.',
      'Область определения — все x, при которых функция имеет смысл. У y = 1/x нельзя x = 0! Область значений — какие y получаются. У y = x² значения ≥ 0.',
      'Обратная функция: если y = 2x, то обратная «разворачивает»: x = y/2, то есть обратная функция y = x/2. Применили 2x, потом x/2 — вернулись к исходному x!',
      'Как найти обратную? 1) поменяй местами x и y; 2) вырази y. Для y = 3x − 1: меняем x = 3y − 1 → 3y = x + 1 → y = (x+1)/3. Готово!',
      'Графики прямой и обратной функций симметричны относительно прямой y = x (биссектрисы). Как отражение в зеркале, стоящем под 45°!',
      'Теперь проверь себя: функция y = x² по чётности — какая? Вспомни: (−x)² = x²!'
    ],
    check: { q: 'Функция y = x² по чётности…', choices: ['чётная', 'нечётная', 'ни то ни другое', 'периодическая'], ans: 0,
      exp: '(−x)² = x² → чётная.' },
    tasks: [
      { q: 'f(x) = 2x + 1. Чему равно f(3)?', kind: 'unit', ans: 7, tol: 0,
        hints: ['2·3 + 1.', '7.'], sol: '7' },
      { q: 'Какая функция обратна y = 2x?', kind: 'choice', choices: ['y = x/2', 'y = 2/x', 'y = 2x', 'y = x²'], ans: 0, tol: 0,
        hints: ['Выражаем x.', 'x = y/2 → y = x/2.'], sol: 'y = x/2' }
    ]
  };
  function visE431(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Функция — правило</div>
        <div style="display:flex;align-items:center;gap:10px;justify-content:center">
          <div style="text-align:center"><div style="font-size:20px;color:#7fd1ff;font-family:Georgia,serif">x</div><div style="font-size:11px;color:#8fa08f">вход</div></div>
          <span style="font-size:24px;color:#ffd76a">→</span>
          <div style="text-align:center"><div style="font-size:16px;color:#8fd1a8;font-family:Georgia,serif">y = f(x)</div><div style="font-size:11px;color:#8fa08f">правило</div></div>
          <span style="font-size:24px;color:#ffd76a">→</span>
          <div style="text-align:center"><div style="font-size:20px;color:#e8a0d8;font-family:Georgia,serif">y</div><div style="font-size:11px;color:#8fa08f">выход</div></div>
        </div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Подставляем: f(3)</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">f(x) = 2x + 1</div>
        <div style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif">f(3) = 2·3 + 1 = <b style="color:#8fd1a8" class="wv-ans">7</b></div>
        <div class="wv-sml">«подставь и посчитай»!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Чётность</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px;font-size:17px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">чётная: f(−x) = f(x)</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap;margin-top:4px">
          ${chip('y = x² — чётная','#8fd1a8')}${chip('y = x³ — нечётная','#7fd1ff')}${chip('f(−x) = −f(x)','#ff8ac0')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем x²</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:18px;color:#7fd1ff;font-family:Georgia,serif">f(2) = 4</b></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px"><b style="font-size:18px;color:#8fd1a8;font-family:Georgia,serif">f(−2) = 4</b></div>
        </div>
        <div style="background:rgba(255,215,106,.12);border:2px solid #ffd76a;border-radius:12px;padding:7px 12px;font-size:15px;color:#ffd76a;font-weight:bold" class="wv-ans">одинаково → чётная!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Области</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['определения','все x, где функция есть (y=1/x: x≠0)','#7fd1ff'],
            ['значений','какие y получаются (y=x²: y≥0)','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:11.5px;max-width:210px;text-align:right">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Обратная функция</div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center;flex-wrap:wrap">
          <span style="font-size:22px;color:#8fd1a8;font-family:Georgia,serif">y = 2x</span>
          <span style="font-size:22px;color:#8fa08f">⇄</span>
          <span style="font-size:22px;color:#7fd1ff;font-family:Georgia,serif">y = x/2</span>
        </div>
        <div class="wv-sml">применили 2x, потом x/2 — вернулись к исходному x!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Как найти обратную</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">y = 3x − 1</div>
          <div class="wv-pop2">1️⃣ меняем: x = 3y − 1</div>
          <div class="wv-pop2">2️⃣ выражаем: 3y = x + 1</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">y = (x+1)/3</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Симметрия графиков</div>
        <svg viewBox="0 0 220 200" style="width:190px;height:173px;background:#101f18;border-radius:12px">
          <line x1="10" y1="180" x2="210" y2="180" stroke="#cfe0cf" stroke-width="2"/>
          <line x1="110" y1="10" x2="110" y2="190" stroke="#cfe0cf" stroke-width="2"/>
          <line x1="30" y1="160" x2="190" y2="20" stroke="#ff8ac0" stroke-width="2" stroke-dasharray="5 4"/>
          <line x1="40" y1="160" x2="160" y2="60" stroke="#8fd1a8" stroke-width="3"/>
          <line x1="60" y1="160" x2="160" y2="100" stroke="#7fd1ff" stroke-width="3"/>
          <text x="150" y="52" font-size="11" fill="#8fd1a8">f</text>
          <text x="130" y="108" font-size="11" fill="#7fd1ff">f⁻¹</text>
        </svg>
        <div class="wv-sml">графики симметричны относительно y = x!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">y = x²</div>
        <div class="wv-sml">(−x)² = x² → функция какая?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">чётная / нечётная</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[431]=visE431;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===431){ window.ARH_LESSONS[i]=L431; break; } } })();
})();
/* ================= УРОК 432 · Векторы: метод координат ================= */
(function(){
  const L432 = {
    id: 432, title: 'Векторы: метод координат', ico: '➡️',
    src: 'Математика · 9 класс · Алгебра 9: векторы', subj: 'math',
    explain: [
      'Вектор можно задать координатами: вектор {x; y} означает «x шагов вправо и y шагов вверх». Это как инструкция для движения! Вектор из точки (0;0) в точку (3;4) — это {3; 4}.',
      'Длина вектора по координатам — теорема Пифагора: |a| = √(x² + y²). Для {3; 4}: √(9 + 16) = √25 = 5. Вектор длины 5 — знаменитая «египетская» тройка!',
      'Сложение векторов в координатах: складываем координаты! {1; 2} + {2; −1} = {1+2; 2+(−1)} = {3; 1}. Просто и быстро — без правил треугольника!',
      'Умножение вектора на число: умножаем обе координаты. 2·{1; 3} = {2; 6}. Вектор растянулся вдвое, направление то же! На −1 — развернулся.',
      'Скалярное произведение: a·b = x₁·x₂ + y₁·y₂. Для {1; 2} и {2; −1}: 1·2 + 2·(−1) = 2 − 2 = 0. Это число, не вектор!',
      'Волшебное свойство: если скалярное произведение равно НУЛЮ, векторы ПЕРПЕНДИКУЛЯРНЫ! Проверили {1;2} и {2;−1}: произведение 0 → они ⊥. Нарисуй и убедись!',
      'Скалярное произведение ещё и так: a·b = |a|·|b|·cos(угол между ними). Если векторы перпендикулярны, cos 90° = 0 → произведение 0. Всё сходится!',
      'Зачем метод координат? Он превращает геометрию в АЛГЕБРУ: доказывать перпендикулярность — просто посчитать произведение и проверить, что оно 0. Никаких сложных чертежей!',
      'Теперь проверь себя: чему равна длина вектора {3; 4}? Вспомни: √(9 + 16)!'
    ],
    check: { q: 'Чему равна длина вектора (3; 4)?', choices: ['5', '7', '12', '25'], ans: 0,
      exp: '√(9 + 16) = 5.' },
    tasks: [
      { q: 'Найди скалярное произведение (1; 2)·(2; −1).', kind: 'unit', ans: 0, tol: 0,
        hints: ['1·2 + 2·(−1).', '2 − 2 = 0.'], sol: '0' },
      { q: 'Если скалярное произведение векторов равно 0, векторы…', kind: 'choice', choices: ['перпендикулярны', 'параллельны', 'равны', 'противоположны'], ans: 0, tol: 0,
        hints: ['Признак перпендикулярности.', 'a·b = 0 → a ⊥ b.'], sol: 'перпендикулярны' }
    ]
  };
  const vecPic=(v,label,c)=>`<svg viewBox="0 0 130 130" style="width:110px;height:110px;background:#101f18;border-radius:10px">
    <line x1="10" y1="110" x2="120" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="1.5"/>
    <line x1="15" y1="115" x2="15" y2="10" stroke="rgba(255,255,255,.2)" stroke-width="1.5"/>
    <line x1="15" y1="110" x2="${15+v[0]*20}" y2="${110-v[1]*20}" stroke="${c}" stroke-width="4"/>
    <polygon points="${15+v[0]*20},${110-v[1]*20} ${15+v[0]*20-8*(v[0]!==0?Math.sign(v[0]):0)},${110-v[1]*20+6} ${15+v[0]*20+6},${110-v[1]*20-8}" fill="${c}" transform="rotate(${v[0]===0?(v[1]>0?-90:90):0} ${15+v[0]*20} ${110-v[1]*20})"/>
  </svg>`;
  function visE432(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Вектор координатами</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">{x; y} = «x вправо, y вверх»</div>
        <div class="wv-sml">{3; 4} — 3 шага вправо и 4 вверх!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Длина вектора</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">|a| = √(x² + y²)</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">√(9+16) = √25 = 5</div>
        <div class="wv-sml">Пифагор — лучший друг длины!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Сложение координатами</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">{1; 2} + {2; −1}</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">= {3; 1}</div>
        <div class="wv-sml">складываем координаты: 1+2, 2+(−1)!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Умножение на число</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">2·{1; 3} = {2; 6}</div>
        <div class="wv-sml">вектор растянулся вдвое · на −1 — развернулся!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Скалярное произведение</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px;font-size:18px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">a·b = x₁·x₂ + y₁·y₂</div>
        <div style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif;margin-top:4px">1·2 + 2·(−1) = 0</div>
        <div class="wv-sml">результат — ЧИСЛО, не вектор!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Ноль = перпендикулярно!</div>
        <div style="display:flex;gap:8px;justify-content:center;align-items:flex-end">
          ${vecPic([1,2],'a','#8fd1a8')}${vecPic([2,-1],'b','#7fd1ff')}
        </div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 12px;font-size:16px;color:#8fd1a8;font-weight:bold" class="wv-ans">a·b = 0 → a ⊥ b!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.6">a·b = |a|·|b|·cos(угол). При 90°: cos 90° = <b style="color:#ffd76a">0</b> → произведение 0!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Метод координат — сила!</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.6">геометрия → алгебра: перпендикулярность = простое вычисление! <b style="color:#8fd1a8">Никаких сложных чертежей</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">|{3; 4}| = ?</div>
        <div class="wv-sml">√(3² + 4²)</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:18px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">√25 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[432]=visE432;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===432){ window.ARH_LESSONS[i]=L432; break; } } })();
})();
/* ================= УРОК 433 · Стереометрия: тела вращения ================= */
(function(){
  const L433 = {
    id: 433, title: 'Стереометрия: тела вращения', ico: '🔄',
    src: 'Математика · 9 класс · Алгебра 9: тела вращения', subj: 'math',
    explain: [
      'Тела вращения получаются, когда плоскую фигуру вращают вокруг оси. Вращаем прямоугольник — получаем ЦИЛИНДР, треугольник — КОНУС, полукруг — ШАР! Как гончар на круге!',
      'Цилиндр: вращение прямоугольника. У него два основания-круга (радиус r) и высота h. Объём цилиндра: V = πr²h. Площадь круга πr² умножаем на высоту!',
      'Проверим: цилиндр с r = 2 и h = 3: V = π·4·3 = 12π ≈ 37,7. Площадь основания πr² = 4π «накрывает» высоту 3 — как стопка блинов!',
      'Конус: вращение прямоугольного треугольника. У него одно основание-круг и вершина. Объём конуса: V = ⅓πr²h — ровно треть цилиндра с теми же r и h!',
      'Почему треть? Три одинаковых конуса заполняют цилиндр! Это легко проверить с водой: налей конус в цилиндр три раза — заполнится доверху.',
      'Шар: вращение полукруга. Объём шара: V = 4/3·πr³. Для r = 1: V = 4π/3 ≈ 4,19. Формула с кубом — радиус в третьей степени!',
      'Площадь поверхности: у цилиндра S = 2πrh + 2πr² (боковая + два основания). Боковая поверхность цилиндра — это прямоугольник: разверни банку — получишь прямоугольник 2πr на h!',
      'Тела вращения вокруг нас: банки и трубы (цилиндр), мороженое-рожок и пирамидки (конус), мячи и планеты (шар). Гончарный круг — живая иллюстрация вращения!',
      'Теперь проверь себя: чему равен объём цилиндра с радиусом r и высотой h? Вспомни: площадь круга × высоту!'
    ],
    check: { q: 'Чему равен объём цилиндра (радиус r, высота h)?', choices: ['πr²h', '2πrh', 'πr²', '4πr²'], ans: 0,
      exp: 'V = πr²h.' },
    tasks: [
      { q: 'Сколько граней у куба?', kind: 'unit', ans: 6, tol: 0,
        hints: ['Как у игрального кубика.', '6 граней.'], sol: '6' },
      { q: 'Какая фигура является телом вращения?', kind: 'choice', choices: ['конус', 'призма', 'пирамида', 'куб'], ans: 0, tol: 0,
        hints: ['Получается вращением плоской фигуры.', 'Конус — вращением прямоугольного треугольника.'], sol: 'конус' }
    ]
  };
  function visE433(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Тела вращения</div>
        <div style="display:flex;gap:14px;justify-content:center;align-items:flex-end">
          ${[['🥫','цилиндр'],['🍦','конус'],['⚽','шар']].map(x=>`<div style="text-align:center"><div style="font-size:44px" class="wv-swing">${x[0]}</div><div style="font-size:12px;color:#8fd1a8">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">вращаем плоскую фигуру — получаем тело!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Цилиндр</div>
        <svg viewBox="0 0 160 150" style="width:140px;height:131px">
          <ellipse cx="80" cy="30" rx="55" ry="16" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="3"/>
          <ellipse cx="80" cy="120" rx="55" ry="16" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3"/>
          <rect x="25" y="30" width="110" height="90" fill="rgba(127,209,255,.05)"/>
          <text x="80" y="78" text-anchor="middle" font-size="12" fill="#ffd76a">h</text>
          <text x="112" y="26" font-size="12" fill="#8fd1a8">r</text>
        </svg>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:18px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">V = πr²h</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем цилиндр</div>
        <div style="display:flex;flex-direction:column;gap:4px;font-family:Georgia,serif;font-size:18px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">r = 2, h = 3</div>
          <div class="wv-pop2">V = π·4·3 = 12π ≈ 37,7</div>
        </div>
        <div class="wv-sml">площадь круга «накрывает» высоту — как стопка блинов!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Конус — треть цилиндра!</div>
        <svg viewBox="0 0 160 150" style="width:140px;height:131px">
          <ellipse cx="80" cy="120" rx="55" ry="16" fill="rgba(255,138,192,.1)" stroke="#ff8ac0" stroke-width="3"/>
          <polygon points="80,15 25,120 135,120" fill="rgba(255,138,192,.05)"/>
          <text x="80" y="75" text-anchor="middle" font-size="12" fill="#ffd76a">h</text>
        </svg>
        <div style="background:rgba(255,138,192,.12);border:2px solid #ff8ac0;border-radius:12px;padding:8px 12px;font-size:18px;color:#ff8ac0;font-weight:bold;font-family:Georgia,serif">V = ⅓πr²h</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему треть?</div>
        <div class="wv-sml">три конуса заполняют цилиндр — проверь водой!</div>
        <div style="display:flex;gap:10px;justify-content:center;align-items:flex-end">
          ${[1,2,3].map(()=>'<svg viewBox="0 0 60 100" style="width:44px;height:74px"><ellipse cx="30" cy="88" rx="22" ry="7" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="2"/><polygon points="30,8 8,88 52,88" fill="rgba(127,209,255,.08)"/></svg>').join('')}
          <span style="font-size:20px;color:#8fa08f">=</span>
          <svg viewBox="0 0 70 100" style="width:52px;height:74px"><ellipse cx="35" cy="20" rx="26" ry="7" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="2"/><ellipse cx="35" cy="88" rx="26" ry="7" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2"/><rect x="9" y="20" width="52" height="68" fill="rgba(127,209,255,.05)"/></svg>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Шар</div>
        <div style="font-size:60px" class="wv-glow">⚽</div>
        <div style="background:rgba(143,209,168,.12);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px;font-size:18px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">V = 4/3·πr³</div>
        <div class="wv-sml">r в кубе! r = 1 → V = 4π/3 ≈ 4,19</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Площадь поверхности цилиндра</div>
        <div style="font-size:19px;color:#ffd76a;font-family:Georgia,serif">S = 2πrh + 2πr²</div>
        <div class="wv-sml">разверни банку — боковая = прямоугольник 2πr на h!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Вокруг нас</div>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
          ${['🥫','🍦','⚽','🏺'].map((e,i)=>`<span style="font-size:40px" class="wv-pop" style="animation-delay:${i*0.1}s">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">банки, рожки, мячи, амфоры — гончарный круг в жизни!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <svg viewBox="0 0 160 150" style="width:130px;height:122px">
          <ellipse cx="80" cy="30" rx="55" ry="16" fill="rgba(127,209,255,.2)" stroke="#7fd1ff" stroke-width="3"/>
          <ellipse cx="80" cy="120" rx="55" ry="16" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3"/>
          <rect x="25" y="30" width="110" height="90" fill="rgba(127,209,255,.05)"/>
        </svg>
        <div class="wv-sml">V цилиндра = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:17px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">π?²h</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[433]=visE433;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===433){ window.ARH_LESSONS[i]=L433; break; } } })();
})();
/* ================= УРОК 434 · Комбинаторика: включение–исключение ================= */
(function(){
  const L434 = {
    id: 434, title: 'Комбинаторика: включение–исключение', ico: '🔀',
    src: 'Математика · 9 класс · Алгебра 9: комбинаторика', subj: 'math',
    explain: [
      'В классе 20 человек любят математику, 15 — физику, а 10 любят ОБА предмета. Сколько человек любят хотя бы один? Если просто сложить 20 + 15 = 35, тех, кто любит оба, посчитаем ДВАЖДЫ!',
      'Принцип включения-исключения: сначала складываем (включаем), потом вычитаем то, что посчитали дважды (исключаем): |A ∪ B| = |A| + |B| − |A ∩ B|.',
      'Считаем: 20 + 15 − 10 = 25. Ровно 25 человек любят хотя бы один предмет! Десять «общих» были посчитаны дважды — один раз убрали.',
      'Представь два круга Эйлера: математики (20) и физики (15), пересечение — любители обоих (10). Общая область: |A∪B| = сумма площадей минус пересечение!',
      'Ещё пример: 15 ходят на математику, 12 — на информатику, 7 — на обе. Хотя бы на одну: 15 + 12 − 7 = 20. Дважды посчитанных семерых вычитаем!',
      'А сколько НЕ ходят никуда? В классе 25, хотя бы на один кружок ходят 20. Не ходящих: 25 − 20 = 5. Вычитаем из всего класса тех, кто ходит!',
      'Для трёх множеств формула сложнее: |A∪B∪C| = |A|+|B|+|C| − |A∩B| − |A∩C| − |B∩C| + |A∩B∩C|. Плюс тройное пересечение возвращается!',
      'Как решать? 1) нарисуй круги Эйлера; 2) подпиши каждую область; 3) начни с самого «внутреннего» пересечения и двигайся наружу. Круги делают задачу наглядной!',
      'Теперь проверь себя: 20 и 15 любят предметы, общих 10. Сколько любят хотя бы один? Вспомни: сложи и вычти общих!'
    ],
    check: { q: '20 и 15 учеников любят предметы, общих 10. Сколько любят хотя бы один?', choices: ['25', '35', '45', '15'], ans: 0,
      exp: '20 + 15 − 10 = 25.' },
    tasks: [
      { q: '15 ходят на математику, 12 — на информатику, 7 — на обе. Сколько ходят хотя бы на одну?', kind: 'unit', ans: 20, tol: 0,
        hints: ['15 + 12 − 7.', '20.'], sol: '20' },
      { q: 'В классе 25, хотя бы на один кружок ходят 20. Сколько не ходят никуда?', kind: 'choice', choices: ['5', '20', '25', '45'], ans: 0, tol: 0,
        hints: ['25 − 20.', '5.'], sol: '5' }
    ]
  };
  const venn=(a,b,inter)=>`<div style="position:relative;width:230px;height:150px;margin:0 auto">
    <div style="position:absolute;left:20px;top:25px;width:120px;height:100px;border-radius:50%;background:rgba(127,209,255,.18);border:3px solid #7fd1ff"></div>
    <div style="position:absolute;right:20px;top:25px;width:120px;height:100px;border-radius:50%;background:rgba(255,138,192,.15);border:3px solid #ff8ac0"></div>
    <div style="position:absolute;left:38px;top:70px;width:60px;text-align:center;font-size:15px;color:#7fd1ff;font-weight:bold">${a}</div>
    <div style="position:absolute;right:38px;top:70px;width:60px;text-align:center;font-size:15px;color:#ff8ac0;font-weight:bold">${b}</div>
    <div style="position:absolute;left:92px;top:70px;width:46px;text-align:center;font-size:14px;color:#ffd76a;font-weight:bold">${inter}</div>
  </div>`;
  function visE434(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Дважды посчитали!</div>
        ${venn(20,15,10)}
        <div class="wv-sml">20 + 15 = 35, но 10 любителей обоих — в обоих кругах!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Включение–исключение</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:17px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">|A∪B| = |A| + |B| − |A∩B|</div>
        <div class="wv-sml">сложили (включили) → вычли дважды посчитанных!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем</div>
        ${venn(20,15,10)}
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">20 + 15 − 10 = 25</div>
        <div class="wv-sml">25 человек любят хотя бы один предмет!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Круги Эйлера</div>
        ${venn('математики','физики','оба')}
        <div class="wv-sml">сумма площадей минус пересечение — наглядно!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример</div>
        ${venn(15,12,7)}
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">15 + 12 − 7 = 20</div>
        <div class="wv-sml">ходят хотя бы на один кружок: 20</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Кто не ходит?</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 12px"><b style="font-size:20px;color:#e8dcc8;font-family:Georgia,serif">25</b><div style="font-size:10px;color:#8fa08f">в классе</div></div>
          <div style="text-align:center;background:rgba(127,209,160,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px"><b style="font-size:20px;color:#8fd1a8;font-family:Georgia,serif">20</b><div style="font-size:10px;color:#9ec0a8">ходят</div></div>
        </div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">25 − 20 = 5 не ходят!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Три множества</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #7fd1ff;border-radius:9px;padding:8px 12px;max-width:340px;font-size:12.5px;color:#e8dcc8;line-height:1.7">|A∪B∪C| = |A|+|B|+|C| − пары пересечений + <b style="color:#ffd76a">тройное пересечение</b></div>
        <div class="wv-sml">плюс тройное возвращается!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Рецепт</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['1️⃣','нарисуй круги Эйлера','#7fd1ff'],
            ['2️⃣','начни с самого внутреннего','#8fd1a8'],
            ['3️⃣','двигайся наружу','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${venn(20,15,10)}
        <div class="wv-sml">хотя бы один любят?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:17px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">20 + 15 − 10 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[434]=visE434;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===434){ window.ARH_LESSONS[i]=L434; break; } } })();
})();
/* ================= УРОК 435 · Метод математической индукции ================= */
(function(){
  const L435 = {
    id: 435, title: 'Метод математической индукции', ico: '🪜',
    src: 'Математика · 9 класс · Алгебра 9: индукция', subj: 'math',
    explain: [
      'Метод математической индукции — способ доказать утверждение для ВСЕХ натуральных чисел. Идея как у лестницы: если умеешь встать на первую ступеньку и с каждой ступеньки можешь подняться на следующую — доберёшься до любой!',
      'Классический пример: сумма 1 + 2 + 3 + … + n = n(n+1)/2. Докажем это для всех n! Сначала проверим маленькие: n = 1: 1 = 1·2/2 = 1 ✔. n = 2: 3 = 2·3/2 = 3 ✔. Работает!',
      'База индукции: проверяем утверждение для n = 1. Это «первая ступенька». Для суммы: 1 = 1·2/2 — верно! База есть.',
      'Шаг индукции: ПРЕДПОЛОЖИМ, что формула верна для n (гипотеза), и ДОКАЖЕМ её для n+1. Если получится — лестница работает: с каждой ступеньки поднимаемся на следующую!',
      'Делаем шаг: пусть 1+2+…+n = n(n+1)/2. Прибавим n+1: 1+2+…+n+(n+1) = n(n+1)/2 + (n+1) = (n+1)(n/2 + 1) = (n+1)(n+2)/2. А это формула для n+1! Шаг доказан!',
      'Раз база есть и шаг работает — утверждение верно для ВСЕХ n! Проверим для n = 100: 100·101/2 = 5050. Знаменитая сумма Гаусса!',
      'Заметь: маленький Гаусс нашёл это в 7 лет: 1+100 = 101, 2+99 = 101… таких пар 50 → 50·101 = 5050. Тот же ответ, другой путь!',
      'Метод индукции в двух шагах: 1) база — проверь n = 1; 2) шаг — из верности для n выведи верность для n+1. Оба есть → доказано для всех!',
      'Теперь проверь себя: чему равна сумма 1 + 2 + … + 100? Вспомни формулу n(n+1)/2!'
    ],
    check: { q: 'Чему равна сумма 1 + 2 + 3 + … + 100?', choices: ['5050', '5000', '505', '10000'], ans: 0,
      exp: '100·101/2 = 5050.' },
    tasks: [
      { q: 'Чему равно 1 + 2 + 3 = 3·4/2 = …?', kind: 'unit', ans: 6, tol: 0,
        hints: ['3 · 4 : 2.', '6.'], sol: '6' },
      { q: 'База индукции для утверждения о натуральных n — проверка при…', kind: 'choice', choices: ['n = 1', 'n = 100', 'всех n сразу', 'n = 0'], ans: 0, tol: 0,
        hints: ['Начинаем с наименьшего.', 'Проверяем n = 1.'], sol: 'n = 1' }
    ]
  };
  const sumEq=(n,res,c)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${c};border-radius:12px;padding:7px 12px;font-size:16px;color:#e8dcc8;font-family:Georgia,serif">1+2+…+${n} = ${res}</div>`;
  function visE435(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Лестница индукции</div>
        <div style="font-size:52px" class="wv-swing">🪜</div>
        <div class="wv-sml" style="max-width:330px">умеешь на первую ступеньку + поднимаешься с любой → доберёшься до любой!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем маленькие n</div>
        <div style="display:flex;gap:8px;flex-direction:column;max-width:340px;width:100%">
          ${sumEq(1,'1·2/2 = 1 ✔','#8fd1a8')}
          ${sumEq(2,'2·3/2 = 3 ✔','#8fd1a8')}
        </div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">База: n = 1</div>
        ${sumEq(1,'1 = 1·2/2 — верно!','#ffd76a')}
        <div class="wv-sml">первая ступенька — на ней стоим!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг индукции</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:15px;color:#e8dcc8;font-family:Georgia,serif">верно для n → докажем для n+1</div>
        <div class="wv-sml">«с этой ступеньки поднимемся на следующую»</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Делаем шаг</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">1+…+n = n(n+1)/2 (гипотеза)</div>
          <div class="wv-pop2">+ (n+1): n(n+1)/2 + (n+1)</div>
          <div class="wv-pop2">= (n+1)(n/2 + 1)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">= (n+1)(n+2)/2 — формула для n+1!</div>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Доказано для всех!</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('база есть','#8fd1a8')}${chip('шаг работает','#7fd1ff')}${chip('→ верно для всех n','#ffd76a')}
        </div>
        <div style="font-size:20px;color:#ffd76a;font-family:Georgia,serif;margin-top:4px">1+2+…+100 = 100·101/2 = 5050</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Способ Гаусса</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.7">1+100 = 101, 2+99 = 101… <b style="color:#8fd1a8">50 пар</b> → 50·101 = 5050. Гаусс нашёл это в 7 лет!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Два шага индукции</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['1️⃣','база: проверь n = 1','#8fd1a8'],
            ['2️⃣','шаг: из n выведи n+1','#7fd1ff']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">1 + 2 + … + 100 = ?</div>
        <div class="wv-sml">формула n(n+1)/2 при n = 100</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:17px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">100·101/2 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[435]=visE435;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===435){ window.ARH_LESSONS[i]=L435; break; } } })();
})();
/* ================= УРОК 436 · Малая теорема Ферма и функция Эйлера ================= */
(function(){
  const L436 = {
    id: 436, title: 'Малая теорема Ферма и функция Эйлера', ico: '🎩',
    src: 'Математика · 9 класс · Олимп-9: теория чисел', subj: 'math',
    explain: [
      'Малая теорема Ферма — жемчужина теории чисел: если p ПРОСТОЕ и a не делится на p, то a^(p−1) ≡ 1 (mod p). Проверим на p = 5, a = 2: 2⁴ = 16, а 16 при делении на 5 даёт остаток 1!',
      'Разберём: 2⁴ = 16, а 16 = 3·5 + 1 → 16 ≡ 1 (mod 5). Теорема говорит: для простого 5 и любого a, не кратного 5, a⁴ даёт остаток 1 при делении на 5. Удивительно!',
      'Проверим ещё: p = 7, a = 3. По теореме 3⁶ ≡ 1 (mod 7). Считаем: 3² = 9 ≡ 2, 3³ ≡ 6, 3⁶ = (3³)² ≡ 36 ≡ 1 (mod 7). Верно!',
      'Почему это полезно? Огромные степени становятся простыми: 2^100 (mod 7): 7 простое, 2⁶ ≡ 1, а 100 = 16·6 + 4 → 2^100 ≡ 2⁴ = 16 ≡ 2 (mod 7). Мгновенно!',
      'Функция Эйлера φ(n) — сколько чисел от 1 до n взаимно просты с n (не имеют общих делителей, кроме 1). Для простого p: φ(p) = p − 1, ведь все числа 1…p−1 взаимно просты с p!',
      'Считаем: φ(7) = 6 (числа 1,2,3,4,5,6 — все взаимно просты с 7). φ(5) = 4. Для простого числа всё просто: минус один!',
      'Обобщение Ферма — теорема Эйлера: если a взаимно просто с n, то a^φ(n) ≡ 1 (mod n). При n = p (простом) φ(p) = p−1 — получаем малую теорему Ферма!',
      'Запомни связку: Ферма — частный случай Эйлера для простых. Обе позволяют «схлопывать» огромные степени по модулю — главный инструмент олимпиадной теории чисел!',
      'Теперь проверь себя: чему равно 2⁴ mod 5? Вспомни: 2⁴ = 16, какой остаток при делении на 5?'
    ],
    check: { q: 'Чему равно 2⁴ mod 5?', choices: ['1', '2', '4', '0'], ans: 0,
      exp: '2⁴ = 16, а 16 ≡ 1 (mod 5).' },
    tasks: [
      { q: 'Чему равна φ(7) для простого 7?', kind: 'unit', ans: 6, tol: 0,
        hints: ['φ(p) = p − 1.', '6.'], sol: '6' },
      { q: 'Малая теорема Ферма верна, когда p…', kind: 'choice', choices: ['простое и a не кратно p', 'любое число', 'чётное', 'a кратно p'], ans: 0, tol: 0,
        hints: ['Условие теоремы.', 'p простое, a не делится на p.'], sol: 'простое и a не кратно p' }
    ]
  };
  const modChip=(a,p,res)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 14px;font-size:18px;color:#e8dcc8;font-family:Georgia,serif">${a} ≡ ${res} <span style="font-size:12px;color:#8fa08f">(mod ${p})</span></div>`;
  function visE436(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Малая теорема Ферма</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">p простое, a не ⋮ p → a^(p−1) ≡ 1 (mod p)</div>
        <div class="wv-row" style="gap:6px;margin-top:4px">${chip('p = 5, a = 2','#8fd1a8')}${chip('2⁴ = 16 ≡ 1 (mod 5)','#7fd1ff')}</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Разбираем</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">2⁴ = 16</div>
          <div class="wv-pop2">16 = 3·5 + 1</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">16 ≡ 1 (mod 5)</div>
        </div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё проверка: p = 7, a = 3</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">3² = 9 ≡ 2</div>
          <div class="wv-pop2">3³ ≡ 6, 3⁶ ≡ 36 ≡ 1 ✔</div>
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Огромные степени — легко!</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">2^100 (mod 7): 2⁶ ≡ 1</div>
          <div class="wv-pop2">100 = 16·6 + 4</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">2^100 ≡ 2⁴ = 16 ≡ 2 (mod 7)</div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Функция Эйлера φ(n)</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px;font-size:15px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">φ(n) = сколько чисел 1…n взаимно просты с n</div>
        <div class="wv-sml">для простого p: φ(p) = p − 1</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${[['φ(7)','6','все 1..6 взаимно просты'],['φ(5)','4','1,2,3,4']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#ffd76a;font-family:Georgia,serif">${x[0]} = ${x[1]}</b><div style="font-size:10px;color:#8fa08f">${x[2]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">для простого — просто минус один!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема Эйлера — обобщение</div>
        <div style="background:rgba(143,209,168,.12);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px;font-size:15px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">a^φ(n) ≡ 1 (mod n), если a взаимно просто с n</div>
        <div class="wv-sml">при n = p: φ(p) = p−1 → теорема Ферма!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Связка</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['Ферма','p простое: a^(p−1) ≡ 1','#ffd76a'],
            ['Эйлер','любое n: a^φ(n) ≡ 1','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">схлопывают огромные степени по модулю!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">2⁴ mod 5 = ?</div>
        <div class="wv-sml">2⁴ = 16 · остаток при делении на 5?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:17px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[436]=visE436;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===436){ window.ARH_LESSONS[i]=L436; break; } } })();
})();
/* ================= УРОК 437 · Пифагоровы тройки ================= */
(function(){
  const L437 = {
    id: 437, title: 'Пифагоровы тройки', ico: '📐',
    src: 'Математика · 9 класс · Олимп-9: Пифагоровы тройки', subj: 'math',
    explain: [
      'Пифагорова тройка — три целых числа, которые могут быть сторонами прямоугольного треугольника: a² + b² = c². Самая знаменитая: 3, 4, 5! Проверь: 9 + 16 = 25.',
      'Проверяем: 3² = 9, 4² = 16, 5² = 25. 9 + 16 = 25 — равенство выполнено! Треугольник со сторонами 3, 4, 5 — прямоугольный. Это самая первая и главная тройка!',
      'Ещё тройки: 5, 12, 13: 25 + 144 = 169 ✔. И 6, 8, 10: 36 + 64 = 100 ✔ (это 3, 4, 5, умноженная на 2!). Тройки можно умножать на любое число — снова тройка!',
      'Если тройку умножить на 2, получим 6, 8, 10 — тоже пифагорова! Умножение на k: (ka)² + (kb)² = k²(a² + b²) = k²c². Любая тройка «размножается» умножением!',
      'Как находить тройки? Формулы: a = m² − n², b = 2mn, c = m² + n² (при m > n). Возьмём m = 2, n = 1: a = 4 − 1 = 3, b = 4, c = 5 — получили 3, 4, 5!',
      'Проверим m = 3, n = 1: a = 9 − 1 = 8, b = 2·3·1 = 6, c = 9 + 1 = 10. Тройка 6, 8, 10! Опять работает. Формулы дают все тройки!',
      'А m = 3, n = 2: a = 9 − 4 = 5, b = 12, c = 13 → тройка 5, 12, 13! Видишь, как формулы рождают все знакомые тройки?',
      'Зачем это на олимпиадах? Если в задаче прямоугольный треугольник с целыми сторонами — ищи пифагорову тройку! Зная один катет, угадываешь всю тройку: катет 12 → тройка 5, 12, 13!',
      'Теперь проверь себя: какая тройка пифагорова — 5, 12, 13 или 2, 3, 4? Проверь: 25 + 144 = 169?'
    ],
    check: { q: 'Какая тройка пифагорова?', choices: ['5, 12, 13', '2, 3, 4', '4, 5, 6', '1, 2, 3'], ans: 0,
      exp: '25 + 144 = 169.' },
    tasks: [
      { q: 'Чему равна гипотенуза тройки 6, 8, …?', kind: 'unit', ans: 10, tol: 0,
        hints: ['6² + 8² = 100.', '√100 = 10.'], sol: '10' },
      { q: 'Формулы m = 2, n = 1 дают тройку…', kind: 'choice', choices: ['3, 4, 5', '5, 12, 13', '6, 8, 10', '1, 2, 3'], ans: 0, tol: 0,
        hints: ['a = m² − n² и т.д.', 'a = 3, b = 4, c = 5.'], sol: '3, 4, 5' }
    ]
  };
  const tri=(a,b,c,big)=>`<svg viewBox="0 0 200 130" style="width:${big?190:150}px;height:124px">
    <polygon points="20,115 175,115 20,25" fill="rgba(127,209,255,.06)" stroke="#7fd1ff" stroke-width="3"/>
    <path d="M20 115 L32 115 L32 103 Z" fill="#7fd1ff"/>
    <text x="96" y="128" text-anchor="middle" font-size="13" fill="#8fd1a8">${a}</text>
    <text x="24" y="70" font-size="13" fill="#ffd76a">${b}</text>
    <text x="110" y="78" font-size="14" fill="#ff8ac0">${c}</text>
  </svg>`;
  function visE437(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Пифагорова тройка</div>
        ${tri(3,4,5,true)}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:18px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">3² + 4² = 5² · 9 + 16 = 25!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем 3, 4, 5</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          ${[['3² = 9','#7fd1ff'],['4² = 16','#8fd1a8'],['5² = 25','#ffd76a']].map(x=>`<span class="wv-chip" style="border-color:${x[1]};color:${x[1]};font-size:16px">${x[0]}</span>`).join('')}
        </div>
        <div style="font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-ans">9 + 16 = 25 ✔</div>
        <div class="wv-sml">прямоугольный треугольник!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё тройки</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${[['5, 12, 13','25+144=169','#8fd1a8'],['6, 8, 10','36+64=100','#7fd1ff']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:8px 12px"><b style="font-size:18px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Тройки размножаются!</div>
        <div class="wv-row" style="gap:8px;justify-content:center;flex-wrap:wrap">
          ${chip('3, 4, 5','#8fd1a8')}<span style="font-size:20px;color:#8fa08f">×2</span>${chip('6, 8, 10','#ffd76a')}
        </div>
        <div class="wv-sml">умножь тройку на k — снова тройка: (ka)²+(kb)² = k²c²!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Формулы троек</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px;font-size:16px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">a=m²−n² · b=2mn · c=m²+n²</div>
        <div class="wv-sml">m = 2, n = 1: a = 3, b = 4, c = 5!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем формулы</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-size:16px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">m=3, n=1: a = 8, b = 6, c = 10</div>
          <div class="wv-pop2" style="color:#8fd1a8">6, 8, 10 — работает!</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё: m = 3, n = 2</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-size:16px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">a = 9−4 = 5, b = 12, c = 13</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">тройка 5, 12, 13!</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">На олимпиадах</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.6">прямоугольный треугольник с целыми сторонами → ищи тройку! Катет 12 → тройка <b style="color:#8fd1a8">5, 12, 13</b>!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${[['5, 12, 13','25+144=169 ✔','#8fd1a8'],['2, 3, 4','4+9=13 ≠ 16 ✘','#ff9a8a']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${x[2]};border-radius:12px;padding:8px 12px"><b style="font-size:17px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:10px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">какая тройка пифагорова?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[437]=visE437;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===437){ window.ARH_LESSONS[i]=L437; break; } } })();
})();
/* ================= УРОК 438 · Неравенство Коши–Буняковского ================= */
(function(){
  const L438 = {
    id: 438, title: 'Неравенство Коши–Буняковского', ico: '⚡',
    src: 'Математика · 9 класс · Олимп-9: КБШ', subj: 'math',
    explain: [
      'Неравенство Коши–Буняковского–Шварца (КБШ) — могучее оружие олимпиад. Одна из форм: (a² + b²)(c² + d²) ≥ (ac + bd)². Произведение сумм квадратов ≥ квадрата суммы произведений!',
      'Проверим на числах: a=1, b=1, c=x, d=y. Получаем (1+1)(x²+y²) ≥ (x+y)², то есть 2(x²+y²) ≥ (x+y)². Именно это применяется чаще всего!',
      'Почему так? Это следует из «квадрат неотрицателен»: (ay − bx)² ≥ 0. Раскрываем и преобразуем — получаем КБШ. Всё из одного простого факта!',
      'Применяем: докажи, что (x + y)² ≤ 2(x² + y²). По КБШ с a=1, b=1: (1+1)(x²+y²) ≥ (1·x + 1·y)² = (x+y)². Готово — неравенство доказано!',
      'Когда равенство? Когда векторы пропорциональны: для нашей формы при x = y. Проверь: (x+x)² = 4x² и 2(x²+x²) = 4x² — равны!',
      'КБШ в геометрии — это «скалярное произведение не больше произведения длин»: |a·b| ≤ |a|·|b|. Отсюда и cos между векторами ∈ [−1; 1]!',
      'Задача: найди минимум x + 9/x при x > 0. Это уже неравенство о средних: x + 9/x ≥ 2√(x·9/x) = 2·3 = 6. Равенство при x = 3. Минимум 6!',
      'Запомни: КБШ связывает суммы квадратов и квадраты сумм. На олимпиадах он «выдаёт» оценки вида «≥ (что-то)²», когда нужно доказать неравенство с двумя переменными.',
      'Теперь проверь себя: по КБШ, чему не превосходит (x + y)²? Вспомни формулу с двойкой!'
    ],
    check: { q: 'По КБШ: (x + y)² ≤ …', choices: ['2(x² + y²)', 'x² + y²', '4(x² + y²)', 'x² − y²'], ans: 0,
      exp: '(1·x + 1·y)² ≤ (1+1)(x²+y²) = 2(x²+y²).' },
    tasks: [
      { q: 'Чему равен минимум x + 9/x при x > 0?', kind: 'unit', ans: 6, tol: 0,
        hints: ['2√(x·9/x).', '2·3 = 6.'], sol: '6' },
      { q: 'Неравенство (a² + b²)(c² + d²) ≥ (ac + bd)² — это…', kind: 'choice', choices: ['КБШ', 'неравенство о средних', 'Бернулли', 'неравенство треугольника'], ans: 0, tol: 0,
        hints: ['Стандартная форма.', 'Это неравенство Коши–Буняковского–Шварца.'], sol: 'КБШ' }
    ]
  };
  function visE438(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:13.5px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Неравенство КБШ</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 10px;font-size:15px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">(a²+b²)(c²+d²) ≥ (ac+bd)²</div>
        <div class="wv-sml">произведение сумм квадратов ≥ квадрата суммы!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Частный случай</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">a=1, b=1, c=x, d=y</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">2(x² + y²) ≥ (x + y)²</div>
        </div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Откуда берётся</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:13.5px;color:#e8dcc8;line-height:1.7">(ay − bx)² ≥ 0 — квадрат неотрицателен! Раскрой и преобразуй → КБШ. Всё из одного факта!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Доказываем</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">по КБШ: (1+1)(x²+y²) ≥ (x+y)²</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">2(x²+y²) ≥ (x+y)² ✔</div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Равенство при x = y</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">x = y: (2x)² = 4x²</div>
          <div class="wv-pop2">2(x²+x²) = 4x²</div>
          <div class="wv-pop3" style="color:#8fd1a8;font-weight:bold">равны — равенство!</div>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Геометрический смысл</div>
        <div class="wv-row" style="gap:6px;flex-wrap:wrap">
          ${chip('|a·b| ≤ |a|·|b|','#8fd1a8')}${chip('→ cos между векторами ∈ [−1; 1]','#7fd1ff')}
        </div>
        <div class="wv-sml">скалярное произведение ≤ произведения длин!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Минимум x + 9/x</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">произведение x·(9/x) = 9</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">x + 9/x ≥ 2√9 = 6</div>
          <div class="wv-pop3" style="color:#8fd1a8">равенство при x = 3</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Где применяется</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%">
          ${[
            ['оценка (x+y)²','через 2(x²+y²)','#7fd1ff'],
            ['связь с cos','|a·b| ≤ |a||b|','#8fd1a8'],
            ['доказательства','с двумя переменными','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:13px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">(x + y)² ≤ ?</div>
        <div class="wv-sml">по КБШ с a=1, b=1</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">?(x² + y²)</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[438]=visE438;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===438){ window.ARH_LESSONS[i]=L438; break; } } })();
})();
/* ================= УРОК 439 · Теоремы Менелая и Чевы ================= */
(function(){
  const L439 = {
    id: 439, title: 'Теоремы Менелая и Чевы', ico: '📐',
    src: 'Математика · 9 класс · Олимп-9: геометрия', subj: 'math',
    explain: [
      'Две великие теоремы о треугольнике: Менелая и Чевы. Они позволяют доказывать, что точки лежат на одной прямой или что отрезки пересекаются в одной точке — не рисуя ничего сложного!',
      'Чевиана — отрезок из вершины треугольника к точке на противоположной стороне (или её продолжении). Медианы, биссектрисы, высоты — всё это чевианы!',
      'Теорема Чевы: три чевианы (из вершин A, B, C к точкам на сторонах) пересекаются в ОДНОЙ точке тогда и только тогда, когда выполняется равенство произведений отношений отрезков.',
      'Запишем Чевы: (AF/FB)·(BD/DC)·(CE/EA) = 1, где F, D, E — точки на сторонах. Произведение трёх отношений равно единице — и чевианы сошлись в одной точке!',
      'Проверка на медианах: каждая медиана делит сторону пополам, значит, каждое отношение = 1. Произведение 1·1·1 = 1 → медианы пересекаются в одной точке! Мы это уже знали — теперь доказали формулой!',
      'Теорема Менелая: если прямая пересекает стороны (или продолжения) треугольника в точках F, D, E, то произведение отношений равно −1 (с учётом знаков): (AF/FB)·(BD/DC)·(CE/EA) = −1.',
      'Менелай отвечает на вопрос «лежат ли три точки на одной прямой?»: если произведение отношений равно −1 — лежат! Это как «Чева для прямой вместо точки».',
      'Запомни пару: Чева — про пересечение в одной точке (произведение = 1), Менелай — про точки на одной прямой (произведение = −1). Два инструмента — два вопроса!',
      'Теперь проверь себя: теорема Чевы связывает чевианы, которые… Вспомни: пересекаются в одной точке!'
    ],
    check: { q: 'Теорема Чевы связывает чевианы, которые…', choices: ['пересекаются в одной точке', 'попарно параллельны', 'лежат на сторонах', 'не пересекаются'], ans: 0,
      exp: 'Условие пересечения чевиан в одной точке.' },
    tasks: [
      { q: 'Сколько вершин у треугольника?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Три.', '3 вершины.'], sol: '3' },
      { q: 'В теореме Менелая рассматривают…', kind: 'choice', choices: ['секущую, пересекающую стороны', 'только высоты', 'только медианы', 'окружность'], ans: 0, tol: 0,
        hints: ['Секущая прямая.', 'Прямая, пересекающая стороны (или продолжения).'], sol: 'секущую' }
    ]
  };
  const ceva=()=>`<svg viewBox="0 0 200 170" style="width:180px;height:153px;background:#101f18;border-radius:12px">
    <polygon points="100,15 20,150 180,150" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="2.5"/>
    <line x1="100" y1="15" x2="70" y2="150" stroke="#ffd76a" stroke-width="2.5"/>
    <line x1="20" y1="150" x2="150" y2="60" stroke="#8fd1a8" stroke-width="2.5"/>
    <line x1="180" y1="150" x2="55" y2="60" stroke="#ff8ac0" stroke-width="2.5"/>
    <circle cx="92" cy="85" r="6" fill="#fff"/>
    <text x="100" y="12" text-anchor="middle" font-size="12" fill="#ffd76a">A</text>
    <text x="14" y="155" font-size="12" fill="#8fd1a8">B</text>
    <text x="186" y="155" font-size="12" fill="#e8a0d8">C</text>
  </svg>`;
  function visE439(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:13.5px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Две великие теоремы</div>
        <div class="wv-row" style="gap:8px;flex-wrap:wrap">
          ${chip('Чева — пересечение в точке','#ffd76a')}${chip('Менелай — точки на прямой','#8fd1a8')}
        </div>
        <div class="wv-sml">доказывают без сложных чертежей!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Чевиана</div>
        ${ceva()}
        <div class="wv-sml">отрезок из вершины к точке на противоположной стороне</div>
        <div class="wv-sml">медианы, биссектрисы, высоты — всё чевианы!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема Чевы</div>
        ${ceva()}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:15px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">чевианы в одной точке ⟺ произведение отношений = 1</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула Чевы</div>
        <div style="background:rgba(127,209,255,.12);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px;font-size:16px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">(AF/FB)·(BD/DC)·(CE/EA) = 1</div>
        <div class="wv-sml">произведение трёх отношений равно единице!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка на медианах</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:16px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">каждое отношение = 1 (половины)</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">1·1·1 = 1 → медианы в одной точке!</div>
        </div>
        <div class="wv-sml">мы знали — теперь доказали формулой!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Теорема Менелая</div>
        <svg viewBox="0 0 200 170" style="width:180px;height:153px;background:#101f18;border-radius:12px">
          <polygon points="100,15 20,150 180,150" fill="rgba(127,209,255,.05)" stroke="#7fd1ff" stroke-width="2.5"/>
          <line x1="40" y1="30" x2="180" y2="160" stroke="#e86a5a" stroke-width="2.5" stroke-dasharray="6 4"/>
        </svg>
        <div style="background:rgba(143,209,168,.12);border:2px solid #8fd1a8;border-radius:12px;padding:8px 12px;font-size:14.5px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">секущая пересекает стороны → произведение = −1</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Менелай — для прямой</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.7">лежат ли три точки на одной прямой? Произведение = −1 → <b style="color:#8fd1a8">лежат!</b> Как «Чева для прямой»</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Пара</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          ${[
            ['Чева','пересечение в точке · = 1','#ffd76a'],
            ['Менелай','точки на прямой · = −1','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${ceva()}
        <div class="wv-sml">Чева связывает чевианы, которые…?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:15px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">пересекаются в ? точке</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[439]=visE439;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===439){ window.ARH_LESSONS[i]=L439; break; } } })();
})();
/* ================= УРОК 440 · Планарность: формула Эйлера ================= */
(function(){
  const L440 = {
    id: 440, title: 'Планарность: формула Эйлера', ico: '🕸️',
    src: 'Математика · 9 класс · Олимп-9: графы', subj: 'math',
    explain: [
      'Планарный граф — такой, который можно нарисовать на плоскости БЕЗ пересечения рёбер. Как схема метро без наложений! Не все графы планарны — некоторые не рисуются без пересечений.',
      'Формула Эйлера для планарного графа: В − Р + Г = 2. В — вершины, Р — рёбра, Г — грани (области, на которые граф делит плоскость). Проверим на простых примерах!',
      'Проверка: один треугольник. В = 3, Р = 3. Сколько граней? Внутренняя + внешняя (вся остальная плоскость) = 2. Считаем: 3 − 3 + 2 = 2 ✔!',
      'Квадрат с диагональю: В = 4, Р = 5. Грани: два внутренних треугольника + внешняя = 3. Проверка: 4 − 5 + 3 = 2 ✔! Работает!',
      'Почему всегда 2? Нарисуй граф по шагам: добавление вершины и ребра сохраняет В − Р + Г. В конце «стяни» всё к одному — получится 2. Инвариант!',
      'Применяем: в планарном графе В = 4, Р = 6. Найдём Г: 4 − 6 + Г = 2 → Г = 4. Формула находит неизвестное!',
      'Есть графы, которые НЕ планарны! Самый известный — K₅ (пять вершин, каждая соединена с каждой, всего 10 рёбер). Попробуй нарисовать без пересечений — не получится!',
      'Почему K₅ не планарен? Если бы был, для него В = 5, Р = 10. По формуле Эйлера Г = 7. Но каждая грань K₅ имеет минимум 3 ребра, а это даёт противоречие с подсчётом рёбер. Формула ловит невозможное!',
      'Теперь проверь себя: формула Эйлера для планарного графа — какая? Вспомни: В − Р + Г = 2!'
    ],
    check: { q: 'Формула Эйлера для планарного графа:', choices: ['В − Р + Г = 2', 'В + Р = Г', 'В − Р = 2', 'В + Г = 2'], ans: 0,
      exp: 'Вершины − рёбра + грани = 2.' },
    tasks: [
      { q: 'В планарном графе В = 4, Р = 6. Чему равно Г?', kind: 'unit', ans: 4, tol: 0,
        hints: ['4 − 6 + Г = 2.', 'Г = 4.'], sol: '4' },
      { q: 'Какой граф НЕ является планарным?', kind: 'choice', choices: ['K₅', 'дерево', 'цикл', 'звезда'], ans: 0, tol: 0,
        hints: ['K₅ не рисуется без пересечений.', 'K₅ — не планарен.'], sol: 'K₅' }
    ]
  };
  const graph=(kind)=>`<svg viewBox="0 0 200 150" style="width:170px;height:128px;background:#101f18;border-radius:12px">
    ${kind==='tri'?`<polygon points="100,20 30,125 170,125" fill="none" stroke="#7fd1ff" stroke-width="3"/>`:
    kind==='sq'?`<polygon points="40,40 160,40 160,115 40,115" fill="none" stroke="#7fd1ff" stroke-width="3"/><line x1="40" y1="40" x2="160" y2="115" stroke="#ffd76a" stroke-width="2.5"/>`:
    kind==='k5'?`<g stroke="#ff8ac0" stroke-width="2">${[0,1,2,3,4].map((a,i)=>[1,2,3,4].slice(i+1).map(b=>{const x1=100+55*Math.cos((a-2)*1.26), y1=75+55*Math.sin((a-2)*1.26); const x2=100+55*Math.cos((b-2)*1.26), y2=75+55*Math.sin((b-2)*1.26); return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;}).join('')).join('')}</g>${[0,1,2,3,4].map(i=>{const x=100+55*Math.cos((i-2)*1.26),y=75+55*Math.sin((i-2)*1.26);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#ff8ac0"/>`;}).join('')}`:''}
  </svg>`;
  function visE440(el){
    const step=LV.step||0;
    const chip=(t,c)=>`<span style="display:inline-flex;align-items:center;padding:5px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:2px solid ${c};font-size:14px;color:${c};font-weight:bold;font-family:Georgia,serif;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Планарный граф</div>
        <div style="font-size:44px" class="wv-swing">🗺️</div>
        <div class="wv-sml">можно нарисовать без пересечения рёбер — как схема метро!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Формула Эйлера</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px;font-size:19px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">В − Р + Г = 2</div>
        <div class="wv-sml">вершины − рёбра + грани = 2</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка: треугольник</div>
        ${graph('tri')}
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['В = 3','вершины','#8fd1a8'],['Р = 3','рёбра','#7fd1ff'],['Г = 2','внутр. + внешняя','#ffd76a']].map(x=>`<span class="wv-chip" style="border-color:${x[2]};color:${x[2]}">${x[0]} — ${x[1]}</span>`).join('')}
        </div>
        <div style="font-size:17px;color:#8fd1a8;font-family:Georgia,serif">3 − 3 + 2 = 2 ✔</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат с диагональю</div>
        ${graph('sq')}
        <div style="font-size:17px;color:#8fd1a8;font-family:Georgia,serif">4 − 5 + 3 = 2 ✔</div>
        <div class="wv-sml">В=4, Р=5, Г=3 (2 внутренних + внешняя)</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему всегда 2?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:340px;font-size:14px;color:#e8dcc8;line-height:1.7">добавление вершины с ребром сохраняет В − Р + Г. В конце «стяни» всё → 2. <b style="color:#8fd1a8">Инвариант!</b></div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Находим неизвестное</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:17px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">В = 4, Р = 6</div>
          <div class="wv-pop2">4 − 6 + Г = 2</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">Г = 4</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">K₅ — НЕ планарный!</div>
        ${graph('k5')}
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">5 вершин, 10 рёбер — не нарисовать без пересечений!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Формула ловит невозможное</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:340px;font-size:13.5px;color:#e8dcc8;line-height:1.7">если бы K₅ был планарным: В=5, Р=10 → Г=7. Но каждая грань ≥ 3 рёбер — <b style="color:#ffd76a">противоречие!</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${graph('sq')}
        <div class="wv-sml">формула Эйлера?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 12px;font-size:16px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">В − Р + Г = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_E[440]=visE440;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===440){ window.ARH_LESSONS[i]=L440; break; } } })();
})();
