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
