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
