/* Волна B v2: уроки 377–398 в формате «объясни → реши + живой виджет» (как visL13/21).
   Заменяет записи ARH_LESSONS на обычные уроки с explain; WAVE_B[id] рисует
   уникальный интерактивный виджет в #lvis по шагу LV.step. */
window.WAVE_B = window.WAVE_B || {};
window.physShot=function(file, meter){
  const src='img/phys/'+file;
  const isVid=/\.mp4$/i.test(file);
  const poster=isVid?src.replace(/\.mp4$/,'.jpg'):'';
  const media=isVid
    ? `<video autoplay muted loop playsinline poster="${poster}" src="${src}" style="display:block;width:100%;aspect-ratio:4/3;object-fit:cover"></video>`
    : `<img src="${src}" alt="" style="display:block;width:100%;aspect-ratio:4/3;object-fit:cover;animation:physKen 10s ease-in-out infinite alternate">`;
  return `<div style="width:min(100%,340px);border-radius:16px;overflow:hidden;border:1px solid #3d5c49;background:#071018;position:relative">
    ${media}
    ${meter?`<div style="position:absolute;left:10px;bottom:10px;max-width:86%;background:rgba(7,16,24,.78);border:1px solid rgba(217,164,65,.5);border-radius:10px;padding:6px 10px;color:#ffd76a;font-size:13px;font-family:Georgia,serif">${meter}</div>`:''}
  </div>`;
};
window.physKenCss=function(){
  try{ window._waveCss && _waveCss('css-physken', `@keyframes physKen{from{transform:scale(1.07)}to{transform:scale(1)}}`); }catch(e){}
};
window.physChart=function(series, xMark, yMark, xl, yl, uid, unit){
  const GOLD='#ffd76a', BLUE='#7fd1ff', MUTED='#8fa08f';
  const CSS=`<style>
    @keyframes a6draw{to{stroke-dashoffset:0}}
    @keyframes a6fade{from{opacity:0}to{opacity:1}}
    @keyframes a6halo{0%{transform:scale(.45);opacity:.85}100%{transform:scale(2.4);opacity:0}}
    @keyframes a6dot{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
    .a6line{stroke-dasharray:520;stroke-dashoffset:520;animation:a6draw 1.25s cubic-bezier(.2,.85,.2,1) forwards}
    .a6fill{opacity:0;animation:a6fade .7s .25s ease forwards}
    .a6halo{transform-box:fill-box;transform-origin:center;animation:a6halo 1.7s ease-out infinite}
    .a6dot{transform-box:fill-box;transform-origin:center;animation:a6dot 1.6s ease-in-out infinite}
  </style>`;
  try{ window._waveCss && _waveCss('css-a6v1', CSS); }catch(e){}
  const W=340, H=220, ox=58, oy=28, pw=258, ph=138;
  const all=series.flatMap(s=>s.pts);
  const x1=Math.max(...all.map(p=>p[0]), 1e-6);
  const y1=Math.max(...all.map(p=>p[1]), 1);
  const xy=(x,y)=>[ox+x/x1*pw, oy+ph-y/y1*ph];
  const gid=uid||'pc';
  const u=unit||'';
  const tick=function(x,y,t,anchor){
    return `<text x="${x}" y="${y}" text-anchor="${anchor||'end'}" font-size="10" fill="${MUTED}" font-family="Georgia,serif">${t}</text>`;
  };
  const lab=function(x,y,t,col,anchor,fs){
    const xx=Math.max(14,Math.min(326,+x)), yy=Math.max(16,Math.min(210,+y));
    return `<text x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif" style="paint-order:stroke fill;stroke:#071018;stroke-width:3.2px">${t}</text>`;
  };
  const grid=[0,0.25,0.5,0.75,1].map(f=>{
    const y=oy+ph-f*ph;
    return `<line x1="${ox}" y1="${y}" x2="${ox+pw}" y2="${y}" stroke="#1e3a32" stroke-width="${f===0?1.4:1}"/>`+
      tick(ox-8, y+3, String(Math.round(y1*f)).replace('.',','));
  }).join('');
  const xt=[0,0.5,1].map(f=>{
    const x=ox+f*pw;
    const v=x1*f;
    const txt=String(+(v.toFixed(v>=100?0:v>=10?1:2))).replace('.',',');
    return `<line x1="${x}" y1="${oy+ph}" x2="${x}" y2="${oy+ph+5}" stroke="#4a6a58"/>`+
      tick(x, oy+ph+16, txt, 'middle');
  }).join('');
  const paths=series.map((s,i)=>{
    const d=s.pts.map((p,j)=>{const q=xy(p[0],p[1]); return (j?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
    const last=xy(s.pts[s.pts.length-1][0], 0), first=xy(s.pts[0][0], 0);
    const area=d+` L ${last[0].toFixed(1)} ${last[1].toFixed(1)} L ${first[0].toFixed(1)} ${first[1].toFixed(1)} Z`;
    return `<path class="a6fill" d="${area}" fill="url(#${gid}f${i})" />
      <path class="a6line" d="${d}" fill="none" stroke="url(#${gid}s${i})" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#${gid}glow)"/>`;
  }).join('');
  let mark='';
  if(xMark!=null && yMark!=null){
    const q=xy(xMark, yMark);
    const pill=(String(Math.round(yMark*10)/10).replace('.',','))+(u?(' '+u):'');
    mark=`<circle class="a6halo" cx="${q[0]}" cy="${q[1]}" r="8" fill="none" stroke="${GOLD}" stroke-width="1.2"/>
      <circle class="a6dot" cx="${q[0]}" cy="${q[1]}" r="5.2" fill="${GOLD}" stroke="#fff6c8" stroke-width="1"/>
      <rect x="${Math.min(Math.max(q[0]+10, ox+8), ox+pw-96)}" y="${Math.max(q[1]-30, oy+4)}" width="96" height="22" rx="8" fill="rgba(7,16,24,.88)" stroke="rgba(217,164,65,.5)"/>
      ${lab(Math.min(Math.max(q[0]+58, ox+56), ox+pw-48), Math.max(q[1]-14, oy+20), pill, GOLD, 'middle', 11)}`;
  }
  /* легенда — вертикальным столбиком: длинные названия серий больше не наезжают друг на друга */
  const legend=series.map((s,i)=>`<g>
    <rect x="${ox}" y="${178+i*13}" width="9" height="9" rx="2" fill="${s.col}"/>
    ${lab(ox+13, 186+i*13, s.name, MUTED, 'start', 10.5)}
  </g>`).join('');
  const defs=series.map((s,i)=>`
    <linearGradient id="${gid}s${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${s.col}"/><stop offset="1" stop-color="#fff3c0"/></linearGradient>
    <linearGradient id="${gid}f${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${s.col}" stop-opacity="0"/><stop offset="1" stop-color="${s.col}" stop-opacity=".32"/></linearGradient>`).join('');
  return `${CSS}<svg viewBox="0 0 ${W} ${H}" style="width:min(100%,340px);height:auto;background:radial-gradient(120% 80% at 50% 0%,#163028 0%,#071018 70%);border-radius:16px;display:block;margin:0 auto;border:1px solid #3d5c49">
    <defs>
      <filter id="${gid}glow"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${defs}
    </defs>
    <rect x="8" y="8" width="${W-16}" height="${H-16}" rx="12" fill="rgba(7,16,24,.25)"/>
    ${grid}${xt}
    <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+ph}" stroke="#7fd1ff" stroke-opacity=".35" stroke-width="1.4"/>
    <line x1="${ox}" y1="${oy+ph}" x2="${ox+pw}" y2="${oy+ph}" stroke="#7fd1ff" stroke-opacity=".35" stroke-width="1.4"/>
    ${paths}${mark}${legend}
    ${lab(ox+pw/2, 16, yl, GOLD, 'middle', 12)}
    ${lab(ox+pw/2, H-6, xl, MUTED, 'middle', 11)}
  </svg>`;
};

/* ================= УРОК 377 · Признаки делимости на 3 и на 9 ================= */
(function(){
  const L377 = {
    id: 377, title: 'Признаки делимости на 3 и на 9', ico: '➗',
    src: 'Математика · 5–6 класс · Признаки делимости', subj: 'math',
    explain: [
      'Начнём с истории. Пекарь Архимед испёк 12 крендельков и хочет разложить их поровну в коробки по 3 штуки. Получится ровно 4 коробки — ничего не останется. Говорят: 12 делится на 3. А если крендельков 14 — три коробки по 3, и 2 кренделька лишние. 14 на 3 не делится.',
      'Делить каждый раз долго. Математики нашли короткий путь — признаки делимости. Признак делимости на 3: сложи все цифры числа. Если сумма цифр делится на 3, то и само число делится на 3. Проверим: у числа 123 сумма цифр 1+2+3 = 6, а 6 делится на 3. Значит, и 123 делится на 3!',
      'Разберём по шагам, как применять признак. Берём число 234. Шаг 1: складываем цифры — 2 + 3 + 4 = 9. Шаг 2: проверяем сумму 9 — она делится на 3 (9 : 3 = 3). Шаг 3: делаем вывод — число 234 делится на 3. Проверим делением: 234 : 3 = 78. Всё сошлось!',
      'А теперь признак делимости на 9. Он похож на признак для 3: сложи цифры числа. Если сумма цифр делится на 9, то и само число делится на 9. У числа 234 сумма цифр 2+3+4 = 9, а 9 делится на 9. Значит, 234 делится и на 9! Проверим: 234 : 9 = 26.',
      'Посмотрим на число 7236. Складываем цифры: 7 + 2 + 3 + 6 = 18. Сумма 18 делится на 9 (18 : 9 = 2), значит, и 7236 делится на 9. Проверим делением: 7236 : 9 = 804. А ещё 18 делится и на 3 — значит, 7236 делится и на 3.',
      'Заметь закономерность: если число делится на 9, то оно обязательно делится и на 3. Почему? Потому что 9 = 3 · 3 — в девятке спрятана тройка. Если крендельки разложились по коробкам по 9, их всегда можно переложить в коробки по 3!',
      'А вот наоборот — не всегда. Например, 15 делится на 3 (15 : 3 = 5), но на 9 не делится: 15 : 9 = 1 и остаток 6. Запомни: делимость на 9 — это более «сильное» условие, чем делимость на 3.',
      'Почему признак вообще работает? Секрет в числах 10, 100, 1000. Ведь 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1. Возьмём число 234: это 2 сотни + 3 десятка + 4 единицы. Части 99, 9 всегда делятся на 9, и остаётся только сумма цифр 2 + 3 + 4. Вот и весь секрет!',
      'Потренируемся: делится ли 258 на 3? Сумма цифр 2 + 5 + 8 = 15, а 15 делится на 3 → да! А на 9? Сумма 15 на 9 не делится → нет. Один и тот же подсчёт цифр ответил сразу на оба вопроса. Теперь ты готов к проверке!'
    ],
    check: { q: 'Делится ли 7236 на 9?', choices: ['да', 'нет'], ans: 0,
      exp: '7 + 2 + 3 + 6 = 18, а 18 делится на 9 → да.' },
    tasks: [
      { q: 'Чему равна сумма цифр числа 258? (проверь делимость на 3)', kind: 'unit', ans: 15, tol: 0,
        hints: ['2 + 5 + 8.', '15 — делится на 3, значит 258 делится на 3.'], sol: '15' },
      { q: 'Какое число делится и на 3, и на 9?', kind: 'choice', choices: ['333', '99', '55', '26'], ans: 1, tol: 0,
        hints: ['Считаем сумму цифр.', '99 → 9 + 9 = 18, делится на 9 (и на 3).'], sol: '99' }
    ]
  };

  function visB377(el){
    const step = LV.step || 0;
    const digits = (num, big) => {
      const cols = { 2:'#7fd1ff', 3:'#8fd1a8', 4:'#ffd76a', 5:'#e8a0d8', 6:'#ffb0a0',
                     7:'#ffd76a', 8:'#8fd1a8', 1:'#7fd1ff', 9:'#ffd76a', 0:'#8fa7c8' };
      return String(num).split('').map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.1}s;display:inline-flex;align-items:center;justify-content:center;width:${big?52:44}px;height:${big?58:50}px;border-radius:12px;background:rgba(255,255,255,.05);border:2px solid ${cols[d]};font-size:${big?30:25}px;color:${cols[d]};font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
    };
    const sumRow = (parts, total, okColor) => `<div class="wv-row" style="gap:6px;margin:8px 0">
      ${parts.map((p,i)=>`<span class="wv-pop" style="animation-delay:${(i+0.2)*0.15}s;display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;border-radius:50%;background:rgba(217,164,65,.14);border:1.5px solid rgba(217,164,65,.6);font-size:20px;color:#ffd76a;font-weight:bold">${p}</span>`).join('<span style="color:#8fa08f;font-size:20px">+</span>')}
      <span style="color:#8fa08f;font-size:22px">=</span>
      <span class="wv-ans" style="display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:44px;border-radius:50%;background:${okColor||'#d9a441'};font-size:22px;color:#0d1a13;font-weight:bold">${total}</span>
    </div>`;
    let h = '';
    if (step === 0){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Пекарня Архимеда</div>
        <div style="font-size:52px" class="wv-swing">🥨</div>
        <div class="wv-big">12 крендельков по 3 — ровно 4 коробки!</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:330px">
          ${Array.from({length:12},(_,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.06).toFixed(2)}s;font-size:22px">🥨</span>`).join('')}
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;margin-top:4px">
          ${Array.from({length:4},(_,i)=>`<div class="wv-pop2" style="border:1.5px dashed #3d7a55;border-radius:10px;padding:3px 10px;font-size:13px;color:#8fd1a8">коробка ${i+1}: 3 шт</div>`).join('')}
        </div>
        <div class="wv-sml">12 ⋮ 3 — делится! Ничего не осталось. А 14 : 3 = 4 и остаток 2 — не делится.</div>
      </div>`;
    } else if (step === 1){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Правило</div>
        <div class="wv-big">Признак делимости на 3</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8">число делится на <b style="color:#7fd1a0">3</b>, если сумма его цифр делится на <b style="color:#7fd1a0">3</b></div>
        </div>
        <div class="wv-row" style="gap:4px">${digits(123)}</div>
        ${sumRow([1,2,3], 6, '#4c8a5a')}
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8;font-weight:bold">6 ⋮ 3 → значит, 123 ⋮ 3 ✔</div>
        <div class="wv-sml">не делим само число — только складываем цифры!</div>
      </div>`;
    } else if (step === 2){
      h = `<div class="wv-col">
        <div class="wv-big">Шаги признака: число 234</div>
        <div class="wv-row" style="gap:4px">${digits(234)}</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;margin-top:4px">
          ${[
            ['1️⃣ Складываем цифры', '2 + 3 + 4 = 9', '#7fd1ff'],
            ['2️⃣ Сумма 9 делится на 3?', '9 : 3 = 3 — да!', '#8fd1a8'],
            ['3️⃣ Вывод', '234 делится на 3', '#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.2}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span style="font-size:16px">${x[0]}</span><b style="color:${x[2]};margin-left:auto;white-space:nowrap">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">проверка: 234 : 3 = 78 ✔</div>
      </div>`;
    } else if (step === 3){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Правило</div>
        <div class="wv-big">Признак делимости на 9</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8">число делится на <b style="color:#ffd76a">9</b>, если сумма его цифр делится на <b style="color:#ffd76a">9</b></div>
        </div>
        <div class="wv-row" style="gap:4px">${digits(234)}</div>
        ${sumRow([2,3,4], 9, '#d9a441')}
        <div class="wv-ans" style="font-size:17px;color:#ffd76a;font-weight:bold">9 ⋮ 9 → значит, 234 ⋮ 9 ✔</div>
        <div class="wv-sml">234 : 9 = 26 — деление без остатка</div>
      </div>`;
    } else if (step === 4){
      h = `<div class="wv-col">
        <div class="wv-big">Число 7236 — пробуем признак</div>
        <div class="wv-row" style="gap:4px">${digits(7236)}</div>
        ${sumRow([7,2,3,6], 18, '#d9a441')}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['18 делится на 9?', '18 : 9 = 2 — да → 7236 ⋮ 9', '#ffd76a'],
            ['18 делится и на 3?', '18 : 3 = 6 — да → 7236 ⋮ 3', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.25}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[1].indexOf('да')>=0?'#4c8a5a':'#b0635a'};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8">${x[0]} → <b style="color:${x[1].indexOf('да')>=0?'#8fd1a8':'#ff9a8a'}">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">7236 : 9 = 804 ✔</div>
      </div>`;
    } else if (step === 5){
      h = `<div class="wv-col">
        <div class="wv-big">Делится на 9 → делится и на 3</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;margin:6px 0">
          <div style="background:rgba(255,215,106,.16);border:2px solid #ffd76a;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">9</div>
          <span style="font-size:26px;color:#8fa08f">=</span>
          <div style="background:rgba(127,209,160,.14);border:2px solid #8fd1a8;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">3</div>
          <span style="font-size:22px;color:#8fa08f">·</span>
          <div style="background:rgba(127,209,160,.14);border:2px solid #8fd1a8;border-radius:12px;width:76px;height:76px;display:flex;align-items:center;justify-content:center;font-size:30px">3</div>
        </div>
        <div class="wv-sml" style="max-width:320px">в девятке «спрятана» тройка: 9 = 3 · 3. Разложил по 9 — легко переложить по 3!</div>
      </div>`;
    } else if (step === 6){
      h = `<div class="wv-col">
        <div class="wv-big">А наоборот — не всегда!</div>
        <div class="wv-row" style="gap:8px;margin:6px 0">
          <div style="text-align:center;background:rgba(127,209,160,.1);border:2px solid #4c8a5a;border-radius:14px;padding:10px 14px;min-width:110px">
            <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">15</div>
            <div style="font-size:13px;color:#8fd1a8">15 : 3 = 5 ✔ делится</div>
          </div>
          <div style="text-align:center;background:rgba(232,106,90,.1);border:2px solid #b0635a;border-radius:14px;padding:10px 14px;min-width:110px">
            <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">15</div>
            <div style="font-size:13px;color:#ff9a8a">15 : 9 = 1 (ост. 6) ✘ нет</div>
          </div>
        </div>
        <div class="wv-sml">сумма цифр 15 делится на 3, но не на 9 → и число так же!</div>
      </div>`;
    } else if (step === 7){
      h = `<div class="wv-col">
        <div style="font-size:12px;letter-spacing:.12em;color:#8fd1a8;text-transform:uppercase">Секрет признака</div>
        <div class="wv-big">Почему сумма цифр решает?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['10 = 9 + 1', 'десяток = девятка + единица'],
            ['100 = 99 + 1', 'сотня = 99 + единица'],
            ['1000 = 999 + 1', 'тысяча = 999 + единица']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.18}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;text-align:left"><b style="color:#7fd1ff;min-width:96px;font-size:14px">${x[0]}</b><span style="font-size:12.5px;color:#9ec0a8">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.07);border:1px dashed #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">234 = 2·100 + 3·10 + 4 = 2·(99+1) + 3·(9+1) + 4. Кусочки с 99 и 9 делятся на 9 — <b style="color:#ffd76a">остаётся 2+3+4!</b></div>
        <div class="wv-sml">вот откуда берётся «сумма цифр» — она и есть остаток!</div>
      </div>`;
    } else {
      h = `<div class="wv-col">
        <div class="wv-big">Проверяем 258</div>
        <div class="wv-row" style="gap:4px">${digits(258)}</div>
        ${sumRow([2,5,8], 15, '#d9a441')}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['15 делится на 3?', 'да → 258 ⋮ 3', '#8fd1a8', true],
            ['15 делится на 9?', 'нет → 258 не ⋮ 9', '#ff9a8a', false]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.2}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[3]?'#4c8a5a':'#b0635a'};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8">${x[0]} → <b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        <div class="wv-sml">один подсчёт цифр ответил на оба вопроса!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[377] = visB377;

  // замена записи урока в ARH_LESSONS
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===377){ window.ARH_LESSONS[i]=L377; break; } } })();
})();
/* ================= УРОК 378 · Простые и составные: решето ================= */
(function(){
  const L378 = {
    id: 378, title: 'Простые и составные числа: решето', ico: '🔢',
    src: 'Математика · 5–6 класс · Простые числа', subj: 'math',
    explain: [
      'Познакомься с важными «кирпичиками» математики — простыми числами. Простое число делится только на 1 и на само себя: 2, 3, 5, 7, 11, 13… Их нельзя разбить на меньшие множители. А составное число, например 12, делится на много чисел: 1, 2, 3, 4, 6, 12. Оно «собрано» из простых: 12 = 2 · 2 · 3!',
      'Проверим делители. У числа 2 делители: 1 и 2 — больше нет! Значит, 2 — простое. У числа 6 делители: 1, 2, 3, 6 — четыре штуки. Раз делителей больше двух, 6 — составное. Так и различаем: два делителя = простое, больше двух = составное.',
      'А что с числом 1? У него только один делитель — оно само. Поэтому единицу НЕ считают ни простым, ни составным. Это особое число — начало отсчёта. Запомни: простые числа начинаются с двойки!',
      'Как найти все простые числа, например до 30? Древнегреческий учёный Эратосфен придумал гениальный способ — «решето». Выписываем числа подряд и «просеиваем»: вычёркиваем всё, что делится на 2, потом на 3, потом на 5… Что останется — то и простые!',
      'Первый проход: вычёркиваем все числа, делящиеся на 2, — 4, 6, 8, 10… Только сама двойка остаётся: она простое число, вычёркивать её нельзя. После этого шага в таблице остались только нечётные числа (и сама двойка).',
      'Второй проход: вычёркиваем числа, делящиеся на 3, — 9, 15, 21, 27… Сама тройка остаётся. Заметь: 6 и 12 мы вычеркнули ещё на первом проходе как чётные. Решето работает по слоям — каждый следующий проход убирает новые числа.',
      'Третий проход: вычёркиваем числа, делящиеся на 5. Из оставшихся до 30 это только 25. Дальше можно не проверять: у любого составного числа до 30 есть множитель не больше 5 (ведь 7·7 = 49 уже больше 30).',
      'Вот они, простые числа от 1 до 30: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — ровно десять «золотых» самородков! Все остальные числа до 30 — составные: их можно разложить на простые множители.',
      'Теперь ты умеешь отличать простые числа от составных! Проверь себя: какое из чисел простое — 9, 15, 17 или 21? Вспомни: простое число делится только на 1 и на само себя.'
    ],
    check: { q: 'Какое число простое?', choices: ['9', '15', '17', '21'], ans: 2,
      exp: '17 делится только на 1 и 17.' },
    tasks: [
      { q: 'Сколько простых чисел от 1 до 10?', kind: 'unit', ans: 4, tol: 0,
        hints: ['Выпиши: 2, 3, 5, 7.', 'Их четыре.'], sol: '4' },
      { q: 'Является ли 1 простым числом?', kind: 'choice', choices: ['нет', 'да', 'зависит от задачи', 'иногда'], ans: 0, tol: 0,
        hints: ['У 1 только один делитель.', '1 не простое и не составное.'], sol: 'нет' }
    ]
  };

  function sieveCell(n, mode, delay){
    // mode: 'p' простое(золото) | 'c' вычеркнуто | 'n' обычное | 'one' единица
    const styles = {
      p:'background:rgba(217,164,65,.3);border:2px solid #d9a441;color:#ffd76a;font-weight:bold',
      c:'background:rgba(232,106,90,.14);border:2px solid rgba(232,106,90,.5);color:#8f5a50;text-decoration:line-through',
      n:'background:rgba(255,255,255,.05);border:2px solid #3d5c49;color:#cfe0cf',
      one:'background:rgba(255,255,255,.05);border:2px solid #3d5c49;color:#8fa08f'
    };
    return `<span class="wv-pop" style="animation-delay:${delay}s;display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:9px;font-size:16px;font-family:Georgia,serif;${styles[mode]}">${n}</span>`;
  }
  function sieveGrid(state){
    // state: {cut2, cut3, cut5, final}
    let cells = '';
    const P = new Set([2,3,5,7,11,13,17,19,23,29]);
    for(let n=1;n<=30;n++){
      const mode = state.final ? (P.has(n)?'p':'c') : n===1 ? 'one' :
        (state.cut5 && (n%5===0 && n!==5)) ? 'c' :
        (state.cut3 && (n%3===0 && n!==3)) ? 'c' :
        (state.cut2 && (n%2===0 && n!==2)) ? 'c' : (P.has(n)?'p':'n');
      cells += sieveCell(n, mode, (n*0.012).toFixed(3));
    }
    return `<div style="display:grid;grid-template-columns:repeat(6,40px);gap:4px;justify-content:center;background:#101f18;padding:10px;border-radius:12px">${cells}</div>`;
  }
  function visB378(el){
    const step = LV.step || 0;
    const chip=(t,c)=>`<span style="display:inline-block;padding:3px 11px;border-radius:9px;background:rgba(127,209,255,.07);border:1px solid ${c||'rgba(127,184,160,.5)'};font-size:14px;color:#d8ecff;margin:2px">${t}</span>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Кирпичики чисел</div>
        <div class="wv-row" style="gap:10px;margin:4px 0">
          <div style="text-align:center;background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:14px;padding:8px 12px">
            <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">2</div>
            <div style="font-size:12px;color:#e8dcc8;margin-top:2px">делители: 1 и 2</div>
            <div style="font-size:12px;color:#8fd1a8;font-weight:bold">простое!</div>
          </div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:14px;padding:8px 12px">
            <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">12</div>
            <div style="font-size:12px;color:#e8dcc8;margin-top:2px">делители: 1,2,3,4,6,12</div>
            <div style="font-size:12px;color:#ff9a8a;font-weight:bold">составное</div>
          </div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">12 = 2·2·3 — составное собрано из <b style="color:#ffd76a">простых кирпичиков!</b></div>
        <div class="wv-sml">простые: 2, 3, 5, 7, 11, 13… · составные: 12, 15, 21…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем делители</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['6', '1, 2, 3, 6', '4 делителя — составное', '#ff9a8a'],
            ['7', '1, 7', '2 делителя — простое!', '#8fd1a8'],
            ['11', '1, 11', '2 делителя — простое!', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${x[3]};border-radius:10px;padding:7px 12px;text-align:left">
            <b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif;min-width:34px">${x[0]}</b>
            <span style="font-size:13px;color:#cfe0cf">делители: ${x[1]}</span>
            <b style="margin-left:auto;font-size:13px;color:${x[3]}">${x[2]}</b>
          </div>`).join('')}
        </div>
        <div class="wv-sml">делителей два → простое · больше двух → составное</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Особое число 1</div>
        <div style="display:flex;align-items:center;gap:12px;margin:4px 0">
          <div style="font-size:64px" class="wv-glow">1️⃣</div>
          <div style="text-align:left;max-width:230px;font-size:14px;color:#e8dcc8;line-height:1.5">у единицы всего <b style="color:#ffd76a">один</b> делитель — она сама</div>
        </div>
        <div style="background:rgba(232,106,90,.08);border:2px solid rgba(232,106,90,.4);border-radius:12px;padding:8px 14px;max-width:320px;font-size:14.5px;color:#ffcfc2">1 — <b>не простое и не составное</b></div>
        <div class="wv-sml">простые числа начинаются с двойки!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Решето Эратосфена</div>
        <div style="font-size:40px" class="wv-swing">⏳</div>
        <div class="wv-sml" style="max-width:320px">выписываем числа 1–30 и будем «просеивать»: вычёркивать всё, что делится на 2, потом на 3, потом на 5…</div>
        ${sieveGrid({cut2:false,cut3:false,cut5:false})}
        <div class="wv-sml">что останется — простые «самородки»!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 1: вычёркиваем чётные</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('делятся на 2','rgba(232,106,90,.6)')}${chip('кроме самой 2','#d9a441')}</div>
        ${sieveGrid({cut2:true,cut3:false,cut5:false})}
        <div class="wv-ans" style="font-size:15px;color:#8fd1a8">остались двойка и нечётные числа</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 2: вычёркиваем кратные 3</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('9, 15, 21, 27…','rgba(232,106,90,.6)')}${chip('тройка остаётся','#d9a441')}</div>
        ${sieveGrid({cut2:true,cut3:true,cut5:false})}
        <div class="wv-sml">6 и 12 вычеркнули раньше (чётные) — решето работает по слоям!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проход 3: кратные 5 — и стоп!</div>
        <div class="wv-row" style="gap:5px;margin:2px 0">${chip('осталось только 25','rgba(232,106,90,.6)')}</div>
        ${sieveGrid({cut2:true,cut3:true,cut5:true})}
        <div style="background:rgba(127,209,160,.08);border:1px solid #4c8a5a;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13px;color:#b8e0c4">дальше можно не проверять: у составного числа до 30 есть множитель ≤ 5</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Золотые самородки: простые до 30</div>
        ${sieveGrid({final:true})}
        <div class="wv-ans" style="font-size:15px;color:#ffd76a;font-weight:bold">2, 3, 5, 7, 11, 13, 17, 19, 23, 29 — ровно 10</div>
        <div class="wv-sml">все остальные числа до 30 — составные</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Какое число простое?</div>
        <div class="wv-row" style="gap:8px;margin:6px 0">
          ${['9','15','17','21'].map((n,i)=>{ const prime=n==='17';
            return `<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center;background:${prime?'rgba(217,164,65,.12)':'rgba(255,255,255,.03)'};border:2px solid ${prime?'#d9a441':'#3d5c49'};border-radius:14px;padding:10px 14px;min-width:64px"><div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">${n}</div><div style="font-size:11px;color:${prime?'#8fd1a8':'#8fa08f'};margin-top:2px">${prime?'простое!':'делится ещё'}</div></div>`; }).join('')}
        </div>
        <div class="wv-sml">17 делится только на 1 и на 17!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[378] = visB378;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===378){ window.ARH_LESSONS[i]=L378; break; } } })();
})();
/* ================= УРОК 379 · НОД: алгоритм Евклида ================= */
(function(){
  const L379 = {
    id: 379, title: 'НОД: алгоритм Евклида', ico: '🔗',
    src: 'Математика · 5–6 класс · НОД', subj: 'math',
    explain: [
      'Представь: Архимед хочет выложить прямоугольную мозаику 48 на 30 одинаковыми квадратами, да так, чтобы квадраты были как можно крупнее. Нужно найти самое большое число, на которое делятся и 48, и 30. Это число называется НОД — наибольший общий делитель.',
      'Сначала вспомним, что такое делитель. Делители числа 30: 1, 2, 3, 5, 6, 10, 15, 30 — все числа, на которые 30 делится без остатка. Делители числа 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48.',
      'Найдём ОБЩИЕ делители — те, что есть и у 30, и у 48: 1, 2, 3, 6. Самый большой из них — 6. Значит, НОД(48, 30) = 6. Квадраты со стороной 6 — самые крупные, которыми можно выложить мозаику 48 на 30: ровно 8 на 5 квадратов!',
      'Перебирать все делители у больших чисел — долго. Древнегреческий математик Евклид придумал быстрый способ. Главная идея: если 48 = 30·1 + 18, то любой общий делитель чисел 48 и 30 делит и остаток 18. Значит, можно перейти к меньшей паре (30, 18)!',
      'Шаг 1. Делим большее число на меньшее: 48 : 30 = 1 и остаток 18. Записываем так: 48 = 30·1 + 18. Теперь ищем НОД пары (30, 18) — числа стали меньше, а НОД не изменился!',
      'Шаг 2. Делим 30 на 18: 30 = 18·1 + 12. Переходим к паре (18, 12). Шаг 3. Делим 18 на 12: 18 = 12·1 + 6. Переходим к паре (12, 6). Числа всё время уменьшаются!',
      'Шаг 4. Делим 12 на 6: 12 = 6·2 + 0. Остаток стал нулём — процесс закончен! Последний НЕНУЛЕВОЙ остаток — это 6. Он и есть НОД(48, 30). Проверка: 48 : 6 = 8 и 30 : 6 = 5 — оба делятся нацело.',
      'Запомни схему алгоритма Евклида: 1) дели большее на меньшее; 2) потом дели меньшее на остаток; 3) повторяй, пока остаток не станет 0; 4) последний ненулевой остаток — это НОД. Быстро и без перебора всех делителей!',
      'Теперь ты готов! Найди НОД(48, 30) по алгоритму Евклида. Подсказка: последовательность остатков 18, 12, 6, 0 — какой остаток последний ненулевой?'
    ],
    check: { q: 'Найди НОД(48, 30).', choices: ['6', '3', '18', '12'], ans: 0,
      exp: 'Алгоритм Евклида: последний ненулевой остаток 6.' },
    tasks: [
      { q: 'Найди НОД(36, 24).', kind: 'unit', ans: 12, tol: 0,
        hints: ['36 = 24·1 + 12.', '24 : 12 = 2 (остаток 0) → НОД = 12.'], sol: '12' },
      { q: 'Что повторяем в алгоритме Евклида?', kind: 'choice', choices: ['деление с остатком', 'сложение', 'умножение', 'вычитание единицы'], ans: 0, tol: 0,
        hints: ['Пока остаток не станет 0.', 'Деление большего на меньшее с остатком.'], sol: 'деление с остатком' }
    ]
  };

  const mosaic = (w,h,side) => { // картинка мозаики w×h из квадратов side
    let out='';
    for(let row=0;row<h/side;row++){
      for(let col=0;col<w/side;col++){
        const hue = (row+col)%2 ? 'rgba(217,164,65,.55)' : 'rgba(217,164,65,.85)';
        out+=`<span style="display:inline-block;width:${side}px;height:${side}px;background:${hue};border:1px solid #8a6d1e;border-radius:2px"></span>`;
      }
    }
    return `<div style="display:grid;grid-template-columns:repeat(${w/side},${side}px);gap:1px;justify-content:center;background:#3a2f14;padding:5px;border-radius:8px">${out}</div>`;
  };
  function visB379(el){
    const step = LV.step||0;
    const eq=(a,b,label,c)=>`<div class="wv-pop" style="display:flex;align-items:center;justify-content:space-between;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${c||'#d9a441'};border-radius:10px;padding:7px 12px;max-width:330px;width:100%"><b style="font-size:16px;color:#ffd76a;font-family:Georgia,serif;letter-spacing:.3px">${a}</b><span style="font-size:12.5px;color:${c||'#8fd1a8'};font-weight:bold;white-space:nowrap">${label}</span></div>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Мозаика 48 на 30</div>
        <div style="transform:scale(.92)">${mosaic(48,30,6)}</div>
        <div class="wv-sml" style="max-width:330px">нужно самое большое число, на которое делятся <b style="color:#ffd76a">и 48, и 30</b> — это НОД</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Делители числа</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['30', '1, 2, 3, 5, 6, 10, 15, 30', '#7fd1ff'],
            ['48', '1, 2, 3, 4, 6, 8, 12, 16, 24, 48', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><b style="color:${x[2]};font-size:19px;margin-right:8px;font-family:Georgia,serif">${x[0]}</b>${x[1]}</div>`).join('')}
        </div>
        <div class="wv-sml">делитель — число, на которое делится без остатка</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Общие делители 48 и 30</div>
        <div class="wv-row" style="gap:6px;margin:6px 0">
          ${['1','2','3','6'].map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.12}s;display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:rgba(217,164,65,.18);border:2px solid #d9a441;font-size:20px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('')}
        </div>
        <div style="background:rgba(127,209,160,.1);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;max-width:330px;font-size:17px;color:#8fd1a8;font-weight:bold">НОД(48, 30) = 6 — самый большой!</div>
        <div class="wv-sml">мозаика: 48:6 = 8 и 30:6 = 5 квадратов</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Идея Евклида</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">48</b><div style="font-size:11px;color:#8fa08f">делится на 6</div></div>
          <span style="font-size:24px;color:#8fa08f">=</span>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#7fd1ff;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#8fa08f">· 1</div></div>
          <span style="font-size:24px;color:#8fa08f">+</span>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px;min-width:70px"><b style="font-size:20px;color:#ff9a8a;font-family:Georgia,serif">18</b><div style="font-size:11px;color:#8fa08f">остаток</div></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ff9a8a;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">общий делитель 48 и 30 делит и <b style="color:#ff9a8a">остаток 18</b> → ищем НОД пары поменьше: (30, 18)</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 1</div>
        ${eq('48 = 30 · 1 + 18','остаток 18','#ff9a8a')}
        <div class="wv-ans" style="font-size:14px;color:#8fd1a8">переходим к паре (30, 18) — НОД тот же!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Шаги 2 и 3</div>
        ${eq('30 = 18 · 1 + 12','остаток 12','#ff9a8a')}
        ${eq('18 = 12 · 1 + 6','остаток 6','#ff9a8a')}
        <div class="wv-sml">числа уменьшаются: 48 → 30 → 18 → 12 → 6</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Финал: остаток 0</div>
        ${eq('12 = 6 · 2 + 0','остаток 0 → стоп!','#8fd1a8')}
        <div style="background:rgba(217,164,65,.12);border:2px solid #d9a441;border-radius:12px;padding:9px 14px;max-width:330px;font-size:18px;color:#ffd76a;font-weight:bold">НОД(48, 30) = 6 — последний ненулевой остаток</div>
        <div class="wv-sml">проверка: 48:6 = 8 ✔ · 30:6 = 5 ✔</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Схема алгоритма</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣', 'дели большее на меньшее'],
            ['2️⃣', 'дели меньшее на остаток'],
            ['3️⃣', 'повторяй, пока остаток не 0'],
            ['4️⃣', 'последний ненулевой остаток = НОД']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;text-align:left;font-size:14.5px;color:#e8dcc8"><span style="font-size:17px">${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
        <div class="wv-sml">быстро и без перебора всех делителей!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${['48 = 30·1 + 18','30 = 18·1 + 12','18 = 12·1 + 6','12 = 6·2 + 0'].map((e,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;text-align:center;font-size:15px;color:#e8dcc8;font-family:Georgia,serif">${e}</div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:19px;color:#ffd76a">НОД(48, 30) = ?</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[379] = visB379;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===379){ window.ARH_LESSONS[i]=L379; break; } } })();
})();
/* ================= УРОК 380 · Координатная плоскость ================= */
(function(){
  const L380 = {
    id: 380, title: 'Координатная плоскость', ico: '🗺️',
    src: 'Математика · 5–6 класс · Координаты', subj: 'math',
    explain: [
      'Архимед спрятал клад и нарисовал карту! Чтобы указать место, нужны ДВЕ координаты: сколько шагов вправо (x) и сколько шагов вверх (y). Так работает координатная плоскость — как карта города с улицами.',
      'На плоскости две оси: горизонтальная — ось x, и вертикальная — ось y. Они пересекаются в точке (0; 0) — начале координат. Это как перекрёсток двух главных улиц, от которого считают все шаги.',
      'Координаты точки записывают в скобках через точку с запятой: (x; y). ВАЖНО: сначала всегда пишут x (вправо-влево), потом y (вверх-вниз). Перепутаешь порядок — попадёшь совсем в другое место!',
      'Точка (3; 2) — это 3 шага вправо от начала и 2 шага вверх. Считаем так: первое число 3 — идём по оси x вправо, второе число 2 — поднимаемся вверх на 2 клетки. Точка найдена!',
      'А если число отрицательное? Точка (−3; 2): минус у x значит, что идём ВЛЕВО 3 шага (по отрицательной части оси x), потом вверх 2. Минус перед x — влево, минус перед y — вниз.',
      'Четверти плоскости: вправо-вверх — I четверть (x > 0, y > 0); влево-вверх — II (x < 0, y > 0); влево-вниз — III; вправо-вниз — IV. Знаки координат подсказывают, где точка!',
      'Точки на осях: если y = 0, точка лежит на оси x (например (5; 0)). Если x = 0 — на оси y (например (0; −3)). А начало (0; 0) лежит сразу на обеих осях.',
      'Как проверить себя? Возьми точку (3; 4): сначала 3 шага вправо по оси x, потом 4 шага вверх. Запиши (3; 4) — x первый, y второй. Порядок — половина успеха!',
      'Теперь ты умеешь читать карту Архимеда! Точка: 3 по оси x и 4 по оси y. Как записать её координаты? Вспомни: сначала x, потом y.'
    ],
    check: { q: 'Точка: 3 по оси x и 4 по оси y. Как её записать?', choices: ['(3; 4)', '(4; 3)', '(3, 4)', '(34)'], ans: 0,
      exp: 'Сначала x, потом y: (3; 4).' },
    tasks: [
      { q: 'Назови координату x точки (7; 3).', kind: 'unit', ans: 7, tol: 0,
        hints: ['Первая координата — x.', 'x = 7.'], sol: '7' },
      { q: 'Куда идём от начала, чтобы попасть в точку (−3; 2)?', kind: 'choice', choices: ['влево 3, вверх 2', 'вправо 3, вверх 2', 'влево 3, вниз 2', 'вправо 3, вниз 2'], ans: 0, tol: 0,
        hints: ['Отрицательный x — влево.', 'x = −3 → влево 3; y = 2 → вверх 2.'], sol: 'влево 3, вверх 2' }
    ]
  };

  function planeSVG(pt, showAxes){
    // SVG-плоскость 220x220 с осями, сеткой; pt=[x,y] (по 1 клетке = 18px, центр 110)
    const cx=110, cy=110, sc=18;
    let grid='';
    for(let i=-4;i<=4;i++){
      grid+=`<line x1="${cx+i*sc}" y1="10" x2="${cx+i*sc}" y2="210" stroke="rgba(255,255,255,.06)"/>`;
      grid+=`<line x1="10" y1="${cy+i*sc}" x2="210" y2="${cy+i*sc}" stroke="rgba(255,255,255,.06)"/>`;
    }
    let labels='';
    for(let i=-4;i<=4;i++){ if(i===0) continue;
      labels+=`<text x="${cx+i*sc-6}" y="${cy+16}" font-size="9" fill="#7f9a8c">${i}</text>`;
      labels+=`<text x="${cx+8}" y="${cy-i*sc+3}" font-size="9" fill="#7f9a8c">${i}</text>`;
    }
    let ptDot='', arrows='';
    if(pt){
      const px=cx+pt[0]*sc, py=cy-pt[1]*sc;
      ptDot=`<circle cx="${px}" cy="${py}" r="6" fill="#ffd76a"/><circle cx="${px}" cy="${py}" r="9" fill="none" stroke="#ffd76a" opacity=".6"/>`;
      arrows = showAxes ? `
        <line x1="${cx}" y1="${cy}" x2="${px}" y2="${cy}" stroke="#7fd1ff" stroke-width="2" stroke-dasharray="4 3"/>
        <line x1="${px}" y1="${cy}" x2="${px}" y2="${py}" stroke="#8fd1a8" stroke-width="2" stroke-dasharray="4 3"/>` : '';
    }
    return `<svg viewBox="0 0 220 220" style="width:230px;height:230px;background:#101f18;border-radius:12px">
      ${grid}
      <line x1="10" y1="${cy}" x2="210" y2="${cy}" stroke="#cfe0cf" stroke-width="2"/>
      <line x1="${cx}" y1="10" x2="${cx}" y2="210" stroke="#cfe0cf" stroke-width="2"/>
      <polygon points="210,${cy} 202,${cy-5} 202,${cy+5}" fill="#cfe0cf"/>
      <polygon points="${cx},10 ${cx-5},18 ${cx+5},18" fill="#cfe0cf"/>
      <text x="206" y="${cy+13}" font-size="10" fill="#cfe0cf">x</text>
      <text x="${cx+8}" y="16" font-size="10" fill="#cfe0cf">y</text>
      ${labels}
      <circle cx="${cx}" cy="${cy}" r="3" fill="#ff9a8a"/>
      ${arrows}${ptDot}
    </svg>`;
  }
  function visB380(el){
    const step=LV.step||0;
    const coord=(x,y)=>`<b style="color:#ffd76a;font-family:Georgia,serif">(${x}; ${y})</b>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Карта сокровищ</div>
        <div style="font-size:54px" class="wv-swing">🗺️</div>
        <div class="wv-sml" style="max-width:330px">чтобы найти клад, нужны <b style="color:#ffd76a">два числа</b>: шаги вправо и шаги вверх — это и есть координаты!</div>
        <div class="wv-row" style="gap:8px">${[['x','вправо-влево','#7fd1ff'],['y','вверх-вниз','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:6px 12px"><b style="font-size:20px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Две оси</div>
        ${planeSVG(null)}
        <div class="wv-sml">ось x — горизонтальная · ось y — вертикальная · начало (0; 0)</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Порядок важен: (x; y)</div>
        <div style="display:flex;gap:8px;align-items:center;margin:4px 0">
          <span class="wv-pop" style="background:rgba(127,209,255,.14);border:2px solid #7fd1ff;border-radius:10px;padding:6px 14px;font-size:22px;color:#7fd1ff;font-weight:bold;font-family:Georgia,serif">x</span>
          <span style="color:#8fa08f;font-size:20px">→</span>
          <span class="wv-pop2" style="background:rgba(143,209,168,.14);border:2px solid #8fd1a8;border-radius:10px;padding:6px 14px;font-size:22px;color:#8fd1a8;font-weight:bold;font-family:Georgia,serif">y</span>
        </div>
        <div style="background:rgba(232,106,90,.08);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#ffcfc2">перепутаешь (2; 3) и (3; 2) — попадёшь в другое место!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Точка ${coord(3,2)}</div>
        ${planeSVG([3,2], true)}
        <div class="wv-sml">3 шага вправо (синяя стрелка) → 2 шага вверх (зелёная) → золотая точка!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Отрицательные координаты</div>
        ${planeSVG([-3,2], true)}
        <div class="wv-sml">${coord(-3,2)}: минус у x → влево 3, потом вверх 2</div>
        <div class="wv-sml">минус перед x — влево · минус перед y — вниз</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Четверти плоскости</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:300px;width:100%">
          ${[['I','x > 0, y > 0','#8fd1a8'],['II','x < 0, y > 0','#7fd1ff'],['III','x < 0, y < 0','#e8a0d8'],['IV','x > 0, y < 0','#ffb0a0']].map((q,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:10px;padding:8px;text-align:center"><b style="font-size:18px;color:${q[2]};font-family:Georgia,serif">${q[0]}</b><div style="font-size:11px;color:#8fa08f">${q[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">знаки координат говорят, в какой четверти точка!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Точки на осях</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          ${[['(5; 0)','на оси x','#7fd1ff'],['(0; −3)','на оси y','#8fd1a8']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:19px;color:${x[2]};font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">y = 0 → точка на оси x · x = 0 → точка на оси y</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Точка ${coord(3,4)}</div>
        ${planeSVG([3,4], true)}
        <div class="wv-ans" style="font-size:15px;color:#8fd1a8">сначала 3 вправо (x), потом 4 вверх (y) — порядок решает!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">3 по оси x и 4 по оси y — как записать?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 20px;font-size:26px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">( ? ; ? )</div>
        <div class="wv-sml">сначала x, потом y!</div>
      </div>`;
    }
    el.innerHTML = `<div class="wv">${h}</div>`;
  }
  window.WAVE_B[380] = visB380;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===380){ window.ARH_LESSONS[i]=L380; break; } } })();
})();
/* ================= УРОК 381 · Осевая и центральная симметрия ================= */
(function(){
  const L381 = {
    id: 381, title: 'Осевая и центральная симметрия', ico: '🦋',
    src: 'Математика · 5–6 класс · Симметрия', subj: 'math',
    explain: [
      'Посмотри на бабочку! Левая и правая половинки её крыльев одинаковые, как в зеркале. Это и есть симметрия — когда одна часть фигуры является зеркальным отражением другой. Симметрия повсюду: в природе, архитектуре, буквах!',
      'Осевая симметрия — отражение относительно ПРЯМОЙ, которую называют осью симметрии. Представь, что вдоль фигуры поставили зеркало. Отражение фигуры в зеркале — её симметричная копия. Бабочка, снежинка, кленовый лист — всё это осевая симметрия.',
      'Как построить отражение точки? Через точку проводим перпендикуляр к оси и откладываем такое же расстояние по другую сторону. Точка A и её отражение A′ находятся на одинаковом расстоянии от оси, но по разные стороны.',
      'У фигур бывает несколько осей. У прямоугольника (не квадрата) — две оси: через середины противоположных сторон. У квадрата — целых четыре! А у круга осей бесконечно много — через любой диаметр.',
      'Центральная симметрия — другой вид симметрии. Фигуру поворачивают на 180° вокруг точки O (центра). Точка A переходит в A′ так, что O — середина отрезка AA′. Фигура как будто «переворачивается вверх ногами».',
      'Как отличить? Осевая симметрия — отражение в зеркале (прямая-ось). Центральная — поворот на 180° вокруг точки. У буквы А есть вертикальная ось (сложи пополам — половинки совпадут), а у буквы S — центральная симметрия (поверни на 180° — та же буква).',
      'Буквы с вертикальной осью: А, М, Т, П, Ш. С горизонтальной осью: В (верх и низ похожи), Е, Ж. С центральной: S, Z, N. Проверь: сложи букву или поверни её — и посмотри, совпала ли!',
      'Симметрия в жизни: отражение в озере, узоры на коврах, фасады зданий, снежинки. Художники и архитекторы используют симметрию, чтобы работы выглядели гармонично и красиво.',
      'Теперь проверь себя: при центральной симметрии фигура поворачивается на сколько градусов? Вспомни — это «переворот вверх ногами».'
    ],
    check: { q: 'При центральной симметрии фигура поворачивается на…', choices: ['180°', '90°', '360°', '45°'], ans: 0,
      exp: 'Центральная симметрия — поворот на 180°.' },
    tasks: [
      { q: 'Сколько осей симметрии у прямоугольника, который не является квадратом?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Через середины противоположных сторон.', 'Две оси.'], sol: '2' },
      { q: 'Какая буква имеет горизонтальную ось симметрии?', kind: 'choice', choices: ['В', 'Р', 'Г', 'Я'], ans: 0, tol: 0,
        hints: ['Сложи букву пополам по горизонтали.', 'У В верх и низ симметричны.'], sol: 'В' }
    ]
  };

  const mirr = (letter, axis) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:14px;background:rgba(217,164,65,.12);border:2px solid #d9a441;font-size:38px;color:#ffd76a;font-family:Georgia,serif">${letter}</span>`;
  function visB381(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Бабочка — это симметрия!</div>
        <div style="font-size:80px" class="wv-glow">🦋</div>
        <div class="wv-sml" style="max-width:330px">левая и правая половинки крыльев одинаковы — как в зеркале</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${['❄️','🍁','🏛️'].map(e=>`<span style="font-size:34px" class="wv-pop">${e}</span>`).join('')}</div>
        <div class="wv-sml">симметрия в природе и архитектуре — повсюду!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Осевая симметрия — зеркало</div>
        <div style="display:flex;align-items:center;gap:2px">
          <div style="font-size:60px;transform:scaleX(-1)">🔺</div>
          <div style="width:3px;height:76px;background:linear-gradient(#ffd76a,#d9a441);border-radius:2px;box-shadow:0 0 8px rgba(217,164,65,.7)"></div>
          <div style="font-size:60px">🔺</div>
        </div>
        <div class="wv-sml">вдоль фигуры — ось-«зеркало»: слева оригинал, справа отражение</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Отражение точки</div>
        <div style="position:relative;width:240px;height:120px;background:#101f18;border-radius:12px;display:flex;align-items:center;justify-content:center">
          <div style="position:absolute;left:50%;top:8px;bottom:8px;width:2px;background:linear-gradient(#ffd76a,#d9a441)"></div>
          <div style="position:absolute;left:22%;top:22px;width:52px;height:52px;border-radius:50%;background:rgba(127,209,255,.2);border:2px solid #7fd1ff;display:flex;align-items:center;justify-content:center;font-size:20px;color:#7fd1ff;font-weight:bold">A</div>
          <div style="position:absolute;right:22%;top:22px;width:52px;height:52px;border-radius:50%;background:rgba(143,209,168,.2);border:2px solid #8fd1a8;display:flex;align-items:center;justify-content:center;font-size:20px;color:#8fd1a8;font-weight:bold">A′</div>
          <div style="position:absolute;left:calc(50% - 40px);top:38px;width:80px;height:20px;border-top:2px dashed rgba(255,255,255,.25)"></div>
          <div style="position:absolute;bottom:6px;width:100%;text-align:center;font-size:10px;color:#7f9a8c">равные расстояния до оси</div>
        </div>
        <div class="wv-sml">перпендикуляр к оси + то же расстояние по другую сторону</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сколько осей?</div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
          ${[
            ['▭','2 оси','прямоугольник'],
            ['⬜','4 оси','квадрат'],
            ['⬤','∞ осей','круг']
          ].map((s,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center"><div style="font-size:52px;color:#ffd76a">${s[0]}</div><div style="font-size:13px;color:#8fd1a8;font-weight:bold">${s[1]}</div><div style="font-size:11px;color:#8fa08f">${s[2]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">больше «правильности» — больше осей!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Центральная симметрия — поворот 180°</div>
        <div style="display:flex;align-items:center;gap:14px">
          <div style="font-size:60px">🚀</div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:2px;height:44px;background:rgba(255,255,255,.2)"></div>
            <div style="width:16px;height:16px;border-radius:50%;background:#ffd76a;box-shadow:0 0 10px rgba(255,215,106,.8)"></div>
            <div style="width:2px;height:44px;background:rgba(255,255,255,.2)"></div>
          </div>
          <div style="font-size:60px;transform:rotate(180deg)">🚀</div>
        </div>
        <div class="wv-sml">вокруг точки O на 180° — фигура «встаёт на голову»</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Два вида симметрии</div>
        <div style="display:flex;flex-direction:column;gap:7px;max-width:330px;width:100%">
          ${[
            ['Осевая', 'отражение в зеркале (прямая-ось)', '🪞', '#7fd1ff'],
            ['Центральная', 'поворот на 180° вокруг точки', '🔄', '#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:5px solid ${x[3]};border-radius:10px;padding:8px 12px;text-align:left"><span style="font-size:26px">${x[2]}</span><span style="font-size:14px;color:#e8dcc8"><b style="color:${x[3]}">${x[0]}</b> — ${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">А — осевая (ось вертикаль) · S — центральная (поворот 180°)</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Симметрия букв</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center">
          ${['А','М','Т','П','Ш'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#7fd1ff;margin-top:2px">вертикальная ось</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-top:6px">
          ${['В','Е','Ж'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#8fd1a8">горизонтальная ось</div>
        <div style="display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin-top:6px">
          ${['S','Z','N'].map((b,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s">${mirr(b)}</div>`).join('')}
        </div>
        <div style="font-size:12px;color:#e8a0d8;margin-top:2px">центральная (180°)</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Симметрия вокруг нас</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin:6px 0">
          ${['🏔️','🦋','❄️','🏰'].map((e,i)=>`<span class="wv-pop" style="animation-delay:${i*0.12}s;font-size:44px">${e}</span>`).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">горы в озере, крылья бабочки, снежинки, дворцы — симметрия делает мир <b style="color:#ffd76a">гармоничным</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;align-items:center;gap:12px;margin:4px 0">
          <div style="font-size:56px">🔄</div>
          <div class="wv-sml" style="max-width:230px">центральная симметрия — поворот вокруг точки на …?</div>
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 20px;font-size:24px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? °</div>
        <div class="wv-sml">это «переворот вверх ногами»!</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[381]=visB381;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===381){ window.ARH_LESSONS[i]=L381; break; } } })();
})();
/* ================= УРОК 382 · Вероятность и диаграммы ================= */
(function(){
  const L382 = {
    id: 382, title: 'Вероятность и диаграммы: начало', ico: '🎲',
    src: 'Математика · 5–6 класс · Вероятность', subj: 'math',
    explain: [
      'Архимед положил в мешок 2 красных и 3 синих шара и предлагает сыграть: если вытащишь красный — получишь приз! Стоит ли играть? Чтобы ответить, математики придумали вероятность — число, показывающее, насколько событие вероятно.',
      'Сначала посчитаем ВСЕ возможные исходы. В мешке 5 шаров, и каждый можно вытащить с одинаковой вероятностью — они не отличаются на ощупь. Значит, всего равновозможных исходов 5.',
      'Теперь посчитаем БЛАГОПРИЯТНЫЕ исходы — те, что ведут к нашей победе. Нам нужен красный шар, а красных в мешке 2. Значит, благоприятных исходов 2.',
      'Вероятность = число благоприятных исходов : число всех исходов. Для красного шара: 2 : 5 = 2/5. Вероятность вытащить красный шар — две пятых. Играть можно, но синий шар выпадает чаще!',
      'Ту же информацию покажет диаграмма. Нарисуем два столбика: красные — высота 2, синие — высота 3. Диаграмма сразу видна: синих больше, значит, и вероятность синего шара больше (3/5).',
      'Ещё пример — монета. У неё две стороны: орёл и решка. Всего исходов 2, благоприятный (орёл) — 1. Вероятность орла = 1/2. Это половина — как и ожидаешь, монетка честная!',
      'Кубик — шесть граней. Вероятность выпасть шестёрке = 1/6. А вероятность выпасть чётному числу (2, 4 или 6) = 3/6 = 1/2. Больше благоприятных исходов — больше вероятность!',
      'Запомни главное: вероятность всегда от 0 до 1. Если событие невозможно — вероятность 0. Если оно происходит всегда — вероятность 1. Чем ближе к 1, тем событие вероятнее.',
      'Теперь проверь себя: в мешке 2 красных и 3 синих шара. Какова вероятность вытащить красный шар? Вспомни формулу: благоприятные делим на все.'
    ],
    check: { q: 'В мешке 2 красных и 3 синих шара. Вероятность вытащить красный?', choices: ['2/5', '3/5', '2/3', '1/2'], ans: 0,
      exp: 'Благоприятных 2, всего 5 → 2/5.' },
    tasks: [
      { q: 'В коробке 4 белых и 1 чёрный шар. Сколько всего шаров?', kind: 'unit', ans: 5, tol: 0,
        hints: ['4 + 1.', 'Всего 5 шаров.'], sol: '5' },
      { q: 'Вероятность выпадения орла при подбрасывании монеты?', kind: 'choice', choices: ['1/2', '1/3', '1', '1/4'], ans: 0, tol: 0,
        hints: ['У монеты 2 стороны.', 'Орёл — 1 из 2 → 1/2.'], sol: '1/2' }
    ]
  };
  function visB382(el){
    const step=LV.step||0;
    const balls=(r,b,shake)=>`<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;background:#101f18;border:2px solid #3d5c49;border-radius:14px;padding:12px;max-width:300px;width:100%">
      ${Array.from({length:r},(_,i)=>`<span class="${shake?'wv-shake':''}" style="font-size:30px">🔴</span>`).join('')}
      ${Array.from({length:b},(_,i)=>`<span class="${shake?'wv-shake':''}" style="font-size:30px">🔵</span>`).join('')}
    </div>`;
    const bars=(r,b)=>{ const mx=3; const rh=Math.round(r/mx*70), bh=Math.round(b/mx*70);
      return `<div style="display:flex;align-items:flex-end;gap:18px;justify-content:center;height:100px;padding:6px 12px;background:#101f18;border-radius:12px">
        <div style="display:flex;flex-direction:column;align-items:center"><div style="width:34px;height:${rh}px;background:#e86a5a;border-radius:4px 4px 0 0;transition:height .5s"></div><span style="font-size:12px;color:#ffb0a0;margin-top:3px">красные ${r}</span></div>
        <div style="display:flex;flex-direction:column;align-items:center"><div style="width:34px;height:${bh}px;background:#4a93d0;border-radius:4px 4px 0 0;transition:height .5s"></div><span style="font-size:12px;color:#7fb8e0;margin-top:3px">синие ${b}</span></div>
      </div>`;
    };
    const frac=(a,b,label)=>{ let txt='';
      return `<div style="display:flex;align-items:center;gap:10px;justify-content:center">
        <div style="text-align:center;background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:10px;padding:4px 14px"><div style="font-size:17px;color:#ffd76a;font-weight:bold">${a}</div><div style="border-top:1.5px solid rgba(255,255,255,.3);font-size:17px;color:#ffd76a;font-weight:bold;padding-top:2px">${b}</div></div>
        <span style="font-size:14px;color:#e8dcc8;max-width:150px;text-align:left">${label}</span>
      </div>`;
    };
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Игра Архимеда</div>
        <div style="font-size:46px" class="wv-swing">🎁</div>
        ${balls(2,3,true)}
        <div class="wv-sml" style="max-width:320px">вытащишь <b style="color:#ffb0a0">красный</b> — приз! Стоит ли играть? Посчитаем вероятность!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Все исходы</div>
        ${balls(2,3)}
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">всего шаров: 2 + 3 = 5</div>
        <div class="wv-sml">каждый шар можно вытащить одинаково легко — 5 равновозможных исходов</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Благоприятные исходы</div>
        <div style="font-size:40px">🔴🔴</div>
        <div class="wv-ans" style="font-size:19px;color:#ffb0a0">нужных (красных): 2</div>
        <div class="wv-sml">нам подходят только красные шары</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула вероятности</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15px;line-height:1.5;color:#e8dcc8;text-align:center">P = благоприятные исходы : <b style="color:#ffd76a">все</b> исходы</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;font-size:26px;color:#e8dcc8">2 <span style="color:#8fa08f">:</span> 5 <span style="color:#8fa08f">=</span> <b style="color:#ffd76a;font-family:Georgia,serif">2/5</b></div>
        <div class="wv-sml">вероятность красного шара — 2/5</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Диаграмма — глазами видно!</div>
        ${bars(2,3)}
        <div class="wv-row" style="gap:8px;margin:2px 0">
          ${frac(2,5,'красный — 2/5')}
          ${frac(3,5,'синий — 3/5')}
        </div>
        <div class="wv-sml">синих больше → синий шар выпадает чаще!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Монета</div>
        <div style="display:flex;gap:18px;justify-content:center;align-items:center">
          <div style="text-align:center"><div style="font-size:44px" class="wv-flick">🪙</div><div style="font-size:12px;color:#8fa08f">орёл</div></div>
          <div style="font-size:26px;color:#8fa08f">или</div>
          <div style="text-align:center"><div style="font-size:44px;transform:rotate(180deg)" class="wv-flick">🪙</div><div style="font-size:12px;color:#8fa08f">решка</div></div>
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">P(орёл) = 1/2</div>
        <div class="wv-sml">2 стороны, 1 нужная — половина!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Кубик</div>
        <div style="display:flex;gap:8px;justify-content:center">
          ${[1,2,3,4,5,6].map(n=>`<div style="width:38px;height:38px;border-radius:8px;background:${n%2===0?'rgba(143,209,168,.16)':'rgba(255,255,255,.05)'};border:1.5px solid ${n%2===0?'#8fd1a8':'#3d5c49'};display:flex;align-items:center;justify-content:center;font-size:17px;color:${n%2===0?'#8fd1a8':'#e8dcc8'};font-weight:bold">${n}</div>`).join('')}
        </div>
        <div class="wv-row" style="gap:8px">${frac(1,6,'шестёрка')}${frac(3,6,'чётное число')}</div>
        <div class="wv-sml">3/6 = 1/2 — больше удачных исходов, больше шансов!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Шкала вероятности</div>
        <div style="width:100%;max-width:330px">
          <div style="height:16px;border-radius:8px;background:linear-gradient(90deg,#e86a5a,#d9a441,#4c8a5a);opacity:.9;margin-bottom:4px"></div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:#8fa08f"><span>0 — невозможно</span><span>1/2</span><span>1 — всегда</span></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">вероятность всегда от 0 до 1 · чем ближе к 1, тем событие <b style="color:#ffd76a">вероятнее</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${balls(2,3)}
        <div class="wv-sml">вероятность вытащить красный шар?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 20px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? / 5</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[382]=visB382;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===382){ window.ARH_LESSONS[i]=L382; break; } } })();
})();
/* ================= УРОК 383 · Оценка + пример ================= */
(function(){
  const L383 = {
    id: 383, title: 'Оценка + пример: уровень 2', ico: '⚖️',
    src: 'Математика · 5–6 класс · Оценка и пример', subj: 'math',
    explain: [
      'В олимпиадных задачах часто спрашивают: «Какое самое маленькое?», «Какое самое большое?» Для таких задач есть золотая схема из двух шагов: сначала докажи, что меньше (или больше) НЕЛЬЗЯ — это оценка, а потом покажи пример, где это получается.',
      'Разберём на задаче: какое наименьшее двузначное число имеет сумму цифр 10? Сначала ОЦЕНКА: если число меньше 19, то оно начинается с 1 и имеет вид 1?. Чтобы сумма была 10, нужна цифра 9: 19. Числа 10–18 дают сумму меньше 10. Значит, меньше 19 — никак!',
      'Теперь ПРИМЕР: число 19 имеет сумму цифр 1 + 9 = 10 — условие выполняется. Раз меньше нельзя, а 19 подходит, то ответ — 19. Оценка + пример = точное решение без перебора!',
      'Ещё одна задача из учебника: задумали число, умножили на 3 и получили 24. Какое число задумали? Двигаемся ОБРАТНО: было умножение на 3 — значит, делим 24 на 3. 24 : 3 = 8. Проверка: 8 · 3 = 24. Всё сходится!',
      'Приём «обратный ход»: чтобы найти исходное число, выполняем действия в обратном порядке. Умножали — делим, прибавляли — вычитаем. Как будто перематываем запись задачи назад!',
      'Задача посложнее: сумма двух чисел 50, а их разность 10. Найди большее число. Ключевая идея: если к сумме прибавить разность, получится удвоенное большее число: (50 + 10) : 2 = 30. Проверка: 30 + 20 = 50 и 30 − 20 = 10.',
      'Почему так? Пусть a — большее число, b — меньшее. Тогда a + b = 50 и a − b = 10. Сложим уравнения: (a + b) + (a − b) = 50 + 10 → 2a = 60 → a = 30. Вот и формула: большее = (сумма + разность) : 2!',
      'Запомни схему «оценка + пример»: 1) докажи границу (меньше/больше нельзя); 2) приведи пример, который её достигает. А для задач «задумали число» — иди обратным ходом, и всё получится!',
      'Теперь проверь себя: какое наименьшее двузначное число имеет сумму цифр 10? Вспомни схему: сначала оценка (меньше 19 нельзя), потом пример (19 подходит).'
    ],
    check: { q: 'Какое наименьшее двузначное число имеет сумму цифр 10?', choices: ['19', '28', '37', '91'], ans: 0,
      exp: 'Меньше 19 нельзя: числа 10–18 дают сумму меньше 10. А 19: 1+9=10.' },
    tasks: [
      { q: 'Задумали число, умножили на 3 и получили 24. Какое число задумали?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Действуем обратно: делим.', '24 : 3 = 8.'], sol: '8' },
      { q: 'Сумма двух чисел 50, а разность 10. Чему равно большее число?', kind: 'choice', choices: ['30', '20', '25', '40'], ans: 0, tol: 0,
        hints: ['(50 + 10) : 2.', '60 : 2 = 30.'], sol: '30' }
    ]
  };
  function visB383(el){
    const step=LV.step||0;
    const numTiles=(num)=>String(num).split('').map((d,i)=>`<span class="wv-pop" style="animation-delay:${i*0.08}s;display:inline-flex;align-items:center;justify-content:center;width:40px;height:44px;border-radius:9px;background:rgba(217,164,65,.14);border:2px solid #d9a441;font-size:24px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Схема «оценка + пример»</div>
        <div style="display:flex;gap:10px;align-items:stretch;max-width:330px;width:100%">
          <div style="flex:1;background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:12px;padding:10px;text-align:center">
            <div style="font-size:22px">1️⃣</div><b style="font-size:13.5px;color:#7fd1ff">ОЦЕНКА</b>
            <div style="font-size:11.5px;color:#9ec0a8;margin-top:4px">докажи, что меньше нельзя</div>
          </div>
          <div style="flex:1;background:rgba(143,209,168,.08);border:2px solid #8fd1a8;border-radius:12px;padding:10px;text-align:center">
            <div style="font-size:22px">2️⃣</div><b style="font-size:13.5px;color:#8fd1a8">ПРИМЕР</b>
            <div style="font-size:11.5px;color:#9ec0a8;margin-top:4px">покажи, что это получается</div>
          </div>
        </div>
        <div class="wv-sml">оценка + пример = точный ответ без перебора!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Оценка: меньше 19 нельзя</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:330px">
          ${Array.from({length:10},(_,i)=>{const n=10+i; const sum=1+i;
            return `<span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:7px;background:rgba(232,106,90,.08);border:1px solid rgba(232,106,90,.35);font-size:12px;color:#8f5a50;margin:1px">${n}</span>`;}).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #7fd1ff;border-radius:9px;padding:6px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">числа 10–18: сумма цифр 1+? меньше 10 → <b style="color:#7fd1ff">не подходят!</b></div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Пример: 19 подходит!</div>
        ${numTiles(19)}
        <div style="display:flex;align-items:center;gap:6px;margin:6px 0;font-size:20px;color:#e8dcc8">1 + 9 = <b style="color:#ffd76a;font-family:Georgia,serif">10</b></div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:17px;color:#8fd1a8;font-weight:bold">меньше нельзя + пример есть → ответ 19!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Задумали число</div>
        <div style="display:flex;flex-direction:column;gap:6px;align-items:center">
          <div class="wv-row" style="gap:8px"><span style="background:#101f18;border:1px solid #3d5c49;border-radius:9px;padding:4px 12px;font-size:20px;color:#8fa08f">?</span><b style="color:#ffd76a;font-size:22px">×3</b><span style="background:#101f18;border:1px solid #3d5c49;border-radius:9px;padding:4px 12px;font-size:20px;color:#8fa08f">?</span><b style="color:#ffd76a;font-size:22px">=</b><span style="background:rgba(217,164,65,.14);border:2px solid #d9a441;border-radius:9px;padding:4px 12px;font-size:20px;color:#ffd76a;font-weight:bold">24</span></div>
          <div style="font-size:15px;color:#8fa08f">ищем ? — идём обратно</div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:6px 12px;max-width:330px;font-size:14px;color:#e8dcc8">было умножение → делаем деление: <b style="color:#8fd1a8">24 : 3 = 8</b></div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Обратный ход</div>
        <div style="display:flex;flex-direction:column;gap:4px;align-items:center;font-size:18px;color:#e8dcc8">
          <div>задумали <b style="color:#ffd76a">8</b> → ×3 → 24</div>
          <div style="color:#8fa08f;font-size:14px">↑ проверка: 8·3 = 24 ✔</div>
          <div style="margin-top:6px">найти 24 → :3 → <b style="color:#8fd1a8">8</b></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:6px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">умножали — делим · прибавляли — вычитаем: как перемотка назад!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма 50, разность 10</div>
        <div class="wv-row" style="gap:10px">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 14px"><b style="font-size:24px;color:#7fd1ff;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#8fd1a8">большее</div></div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 14px"><b style="font-size:24px;color:#8fd1a8;font-family:Georgia,serif">20</b><div style="font-size:11px;color:#8fa08f">меньшее</div></div>
        </div>
        <div class="wv-row" style="gap:12px;font-size:15px;color:#e8dcc8"><span>30+20=<b style="color:#ffd76a">50</b></span><span>30−20=<b style="color:#ffd76a">10</b></span></div>
        <div class="wv-sml">большее = (сумма + разность) : 2 = (50+10):2 = 30</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так работает</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;font-size:15px;color:#e8dcc8;font-family:Georgia,serif">
          <div class="wv-pop">a + b = 50 &nbsp;·&nbsp; a − b = 10</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">сложим оба уравнения:</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">2a = 60 → a = 30</div>
        </div>
        <div class="wv-sml">удвоенное большее = сумма + разность!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','докажи границу (оценка)','#7fd1ff'],
            ['2️⃣','приведи пример','#8fd1a8'],
            ['3️⃣','задумали число → обратный ход','#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">наименьшее двузначное с суммой цифр 10?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 20px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? ?</div>
        <div class="wv-sml">подсказка: число 19 — 1 + 9 = 10</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[383]=visB383;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===383){ window.ARH_LESSONS[i]=L383; break; } } })();
})();
/* ================= УРОК 384 · Средняя скорость ================= */
(function(){
  const L384 = {
    id: 384, title: 'Средняя скорость: путь и время', ico: '🚌',
    src: 'Математика · 5–6 класс · Средняя скорость', subj: 'math',
    explain: [
      'Автобус Архимеда едет в соседний город. Первые 2 часа — со скоростью 40 км/ч, а потом 1 час — со скоростью 70 км/ч. Какова СРЕДНЯЯ скорость? Это не среднее арифметическое 40 и 70! Сейчас разберёмся, как считать правильно.',
      'Сначала вспомним главную формулу пути: путь = скорость · время. Если ехать 2 часа по 40 км/ч, проедешь 40 · 2 = 80 км. Обрати внимание: умножаем скорость на время, а не просто берём скорость!',
      'Теперь второй участок: 1 час по 70 км/ч — это 70 · 1 = 70 км. Весь путь: 80 + 70 = 150 км. А всё время движения: 2 + 1 = 3 часа. Запишем это — скоро понадобится.',
      'Средняя скорость = весь путь : всё время. Делим 150 км на 3 часа: 150 : 3 = 50 км/ч. Вот правильный ответ! Средняя скорость автобуса — 50 км/ч.',
      'Почему нельзя просто взять (40 + 70) : 2 = 55? Потому что на скорости 40 км/ч автобус ехал ДОЛЬШЕ (2 часа), чем на 70 км/ч (1 час). Быстрая езда «весит» меньше в общем времени!',
      'Запомни формулу: средняя скорость = весь путь : всё время. Не усредняй скорости напрямую — сначала найди весь путь и всё время!',
      'Проверим на простом примере: весь путь 120 км, время 3 часа. Средняя скорость = 120 : 3 = 40 км/ч. Всё просто, когда известны путь и время!',
      'А если ехать одинаковое время на разных скоростях — тогда средняя скорость и есть среднее арифметическое. Но в нашей задаче времена разные — поэтому считаем через путь!',
      'Теперь проверь себя: автобус ехал 2 часа по 40 км/ч и 1 час по 70 км/ч. Какова средняя скорость? Вспомни: весь путь 150 км, всё время 3 часа.'
    ],
    check: { q: '2 часа по 40 км/ч и 1 час по 70 км/ч. Средняя скорость?', choices: ['50 км/ч', '55 км/ч', '45 км/ч', '60 км/ч'], ans: 0,
      exp: 'Путь 40·2 + 70 = 150 км, время 3 ч → 150:3 = 50 км/ч.' },
    tasks: [
      { q: 'Весь путь 120 км, время 3 часа. Средняя скорость?', kind: 'unit', ans: 40, tol: 0,
        hints: ['Средняя = путь : время.', '120 : 3 = 40 км/ч.'], sol: '40' },
      { q: 'Почему нельзя просто усреднить 40 и 70?', kind: 'choice', choices: ['времена движения разные', 'числа слишком большие', 'дорога кривая', 'можно усреднять'], ans: 0, tol: 0,
        hints: ['Средняя — это путь, делённый на время.', 'Времена разные → берём весь путь и всё время.'], sol: 'времена разные' }
    ]
  };
  const road=(k1,h1,k2,h2)=>`<div style="position:relative;width:100%;max-width:340px;height:56px;background:linear-gradient(180deg,#3a3f45,#23272c);border-radius:10px;overflow:hidden">
    <div style="position:absolute;top:24px;left:0;right:0;height:3px;background:repeating-linear-gradient(90deg,rgba(255,208,90,.7) 0 14px,transparent 14px 28px)"></div>
    <div style="position:absolute;left:6px;top:20px;font-size:22px" class="wv-drive" style="--dx:${Math.round((k1*h1+k2*h2)/10)}px">🚌</div>
  </div>`;
  function visB384(el){
    const step=LV.step||0;
    const card=(k,t,color)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:12px;padding:8px 12px;min-width:92px"><b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">${k}</b><div style="font-size:12px;color:${color};margin-top:2px">${t}</div></div>`;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Поездка автобуса</div>
        <div style="font-size:52px" class="wv-swing">🚌</div>
        <div class="wv-sml" style="max-width:330px">2 часа по <b style="color:#7fd1ff">40 км/ч</b>, потом 1 час по <b style="color:#8fd1a8">70 км/ч</b>. Какая средняя скорость?</div>
        <div style="background:rgba(232,106,90,.1);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#ffcfc2">это НЕ среднее арифметическое 40 и 70!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Формула пути</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 16px">
          <div style="font-size:19px;color:#e8dcc8">путь = скорость <b style="color:#ffd76a">·</b> время</div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
          ${card('40 км/ч','· 2 часа = 80 км','#7fd1ff')}
          ${card('70 км/ч','· 1 час = 70 км','#8fd1a8')}
        </div>
        <div class="wv-sml">скорость умножаем на время!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Весь путь и всё время</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['путь 1', '40 · 2 = 80 км', '#7fd1ff'],
            ['путь 2', '70 · 1 = 70 км', '#8fd1a8'],
            ['весь путь', '80 + 70 = 150 км', '#ffd76a'],
            ['всё время', '2 + 1 = 3 часа', '#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Делим: 150 : 3</div>
        <div style="display:flex;align-items:center;gap:8px;font-size:24px;color:#e8dcc8;margin:6px 0">
          <b style="color:#ffd76a;font-family:Georgia,serif;font-size:30px">150</b>
          <span style="color:#8fa08f">км :</span>
          <b style="color:#ffd76a;font-family:Georgia,serif;font-size:30px">3</b>
          <span style="color:#8fa08f">ч =</span>
          <b style="color:#8fd1a8;font-family:Georgia,serif;font-size:34px" class="wv-ans">50</b>
        </div>
        <div style="background:rgba(127,209,160,.12);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:17px;color:#8fd1a8;font-weight:bold">средняя скорость = 50 км/ч</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Ловушка: (40+70):2 = 55 ✘</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center"><div style="font-size:15px;color:#e86a5a;text-decoration:line-through">55 км/ч</div><div style="font-size:11px;color:#8f5a50">неправильно!</div></div>
          <div style="text-align:center"><div style="font-size:15px;color:#8fd1a8;font-weight:bold">50 км/ч ✔</div><div style="font-size:11px;color:#8fa08f">правильно</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="display:inline-block;width:54px;height:16px;background:#7fd1ff;border-radius:3px"></span><span style="color:#8fa08f;font-size:12px">2 часа по 40</span>
          <span style="display:inline-block;width:27px;height:16px;background:#8fd1a8;border-radius:3px"></span><span style="color:#8fa08f;font-size:12px">1 час по 70</span>
        </div>
        <div class="wv-sml">полоски разной длины: медленная езда длилась дольше!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Главная формула</div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #ffd76a;border-radius:14px;padding:10px 16px;max-width:330px;width:100%">
          <div style="font-size:17px;color:#ffd76a;font-weight:bold;text-align:center">средняя скорость = весь путь : всё время</div>
        </div>
        <div class="wv-sml">не усредняй скорости — считай путь и время!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Простой пример</div>
        <div style="display:flex;gap:10px;justify-content:center;margin:4px 0">
          ${card('120 км','весь путь','#ffd76a')}
          ${card('3 часа','всё время','#7fd1ff')}
        </div>
        <div style="font-size:22px;color:#e8dcc8">120 : 3 = <b style="color:#8fd1a8;font-family:Georgia,serif" class="wv-ans">40 км/ч</b></div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Когда можно усреднять?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">если ехать <b style="color:#8fd1a8">одинаковое время</b> — средняя = среднее арифметическое скоростей. У нас времена разные → через путь!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml" style="max-width:320px">2 часа по 40 км/ч и 1 час по 70 км/ч — средняя скорость?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? км/ч</div>
        <div class="wv-sml">подсказка: 150 : 3</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[384]=visB384;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===384){ window.ARH_LESSONS[i]=L384; break; } } })();
})();
/* ================= УРОК 385 · Переливания ================= */
(function(){
  const L385 = {
    id: 385, title: 'Переливания: оптимум', ico: '🪣',
    src: 'Математика · 5–6 класс · Переливания', subj: 'math',
    explain: [
      'Классическая задача! У Архимеда есть полное ведро на 7 литров и пустая банка на 3 литра. Нужно отмерить ровно 1 литр воды. Других ёмкостей нет. Как это сделать? Звучит невозможно, но всего за несколько переливаний — получится!',
      'Шаг 1. В ведре 7 литров. Отливаем из ведра воду в банку (3 литра) до краёв. Теперь в ведре осталось 7 − 3 = 4 литра, а банка полная — 3 литра.',
      'Шаг 2. Выливаем банку полностью (например, в раковину). Банка снова пустая, а в ведре по-прежнему 4 литра.',
      'Шаг 3. Снова отливаем из ведра в банку 3 литра. В ведре осталось 4 − 3 = 1 литр! Вот он, заветный литр — задача решена!',
      'Секрет в записи: 7 − 3 − 3 = 1. Мы дважды «отняли» по 3 литра от полного ведра. Переливания — это просто вычитание объёмов, только с правилом: банка не больше ведра и льём до краёв.',
      'Общий приём: чтобы отмерить маленький объём, отнимай от большого маленький несколько раз, каждый раз выливая накопившееся. Как будто «вычитаем по частям».',
      'Проверим другой пример: ведро 5 л и банка 2 л. Можно ли отмерить 1 л? Конечно! 5 − 2 = 3 (в ведре 3 л), выливаем банку, снова отливаем 2 л: 3 − 2 = 1. Получился 1 литр!',
      'Запомни: задачи на переливания решаются аккуратной последовательностью шагов. Не торопись, следи, сколько воды в каждой ёмкости после каждого действия, — и ответ найдётся!',
      'Теперь проверь себя: в ведре 7 л, отлили в банку 3 л. Сколько литров осталось в ведре?'
    ],
    check: { q: 'Ведро 7 л и банка 3 л: наполнили 7 л и отлили в банку 3 л. Сколько осталось в ведре?', choices: ['4 л', '3 л', '1 л', '5 л'], ans: 0,
      exp: '7 − 3 = 4 л.' },
    tasks: [
      { q: 'После этого банку вылили и снова отлили из ведра 3 л. Сколько осталось в ведре?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Было 4 л.', '4 − 3 = 1 л.'], sol: '1 л' },
      { q: 'Ведро 5 л и банка 2 л. Можно ли отмерить 1 л?', kind: 'choice', choices: ['да', 'нет', 'только 3 л', 'только чётные объёмы'], ans: 0, tol: 0,
        hints: ['5 − 2 − 2 = 1.', 'Отлили 2 л (осталось 3), вылили, отлили ещё 2 → 1 л.'], sol: 'да' }
    ]
  };
  const bucket=(liters,full,label,color)=>{ const h=Math.round(full/liters*90);
    return `<div style="display:flex;flex-direction:column;align-items:center">
      <div style="position:relative;width:52px;height:100px;border:3px solid ${color};border-top:none;border-radius:0 0 8px 8px;background:rgba(255,255,255,.02);overflow:hidden">
        <div style="position:absolute;bottom:0;left:0;right:0;height:${h}px;background:linear-gradient(180deg,rgba(127,209,255,.55),rgba(79,141,255,.65));transition:height .5s"></div>
        <div style="position:absolute;top:${100-h-4}px;left:-3px;right:-3px;height:3px;background:rgba(200,235,255,.8)"></div>
      </div>
      <div style="font-size:12px;color:${color};margin-top:4px">${label}</div>
      <div style="font-size:16px;color:#ffd76a;font-weight:bold">${full} л</div>
    </div>`;
  };
  function visB385(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Задача Архимеда</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end;margin:4px 0">
          ${bucket(7,7,'ведро 7 л','#7fd1ff')}
          ${bucket(3,0,'банка 3 л','#8fd1a8')}
        </div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:12px;padding:8px 14px;max-width:330px;font-size:14px;color:#e8dcc8">нужно отмерить ровно <b style="color:#ffd76a">1 литр</b>! Других ёмкостей нет…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 1: отливаем 3 л</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,4,'в ведре 4 л','#7fd1ff')}
          ${bucket(3,3,'банка полная','#8fd1a8')}
        </div>
        <div class="wv-ans" style="font-size:18px;color:#ffd76a">7 − 3 = 4 л осталось в ведре</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 2: выливаем банку</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,4,'в ведре 4 л','#7fd1ff')}
          ${bucket(3,0,'банка пустая','#8fd1a8')}
        </div>
        <div class="wv-sml">банку вылили — она готова снова набирать!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Шаг 3: ещё раз отливаем 3 л!</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(7,1,'в ведре 1 л!','#ffd76a')}
          ${bucket(3,3,'банка полная','#8fd1a8')}
        </div>
        <div style="background:rgba(127,209,160,.14);border:2px solid #4c8a5a;border-radius:12px;padding:8px 14px;font-size:18px;color:#8fd1a8;font-weight:bold" class="wv-ans">4 − 3 = 1 л — готово!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет в записи</div>
        <div style="font-size:30px;color:#ffd76a;font-family:Georgia,serif">7 − 3 − 3 = 1</div>
        <div class="wv-sml">дважды отняли по 3 л от полного ведра</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.5">переливание = <b style="color:#ffd76a">вычитание объёмов</b> · льём до краёв и выливаем лишнее</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Общий приём</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','от большого объёма отнимай маленький'],
            ['2️⃣','накопившееся в банке — выливай'],
            ['3️⃣','повторяй, пока не получится нужный объём']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример: 5 л и 2 л</div>
        <div style="display:flex;gap:20px;justify-content:center;align-items:flex-end">
          ${bucket(5,5,'ведро 5 л','#7fd1ff')}
          ${bucket(2,0,'банка 2 л','#8fd1a8')}
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:330px;width:100%;font-size:14px;color:#e8dcc8">
          <div class="wv-pop">5 − 2 = 3 л в ведре</div>
          <div class="wv-pop2">вылили банку → снова отливаем 2 л</div>
          <div class="wv-pop2" style="color:#8fd1a8;font-weight:bold">3 − 2 = 1 л — получилось!</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Совет Архимеда</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #ffd76a;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">не торопись! После каждого действия записывай, сколько воды в каждой ёмкости. Аккуратная цепочка шагов приведёт к ответу!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${bucket(7,4,'ведро','#7fd1ff')}
        <div class="wv-sml">было 7 л, отлили в банку 3 л — сколько осталось?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? л</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[385]=visB385;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===385){ window.ARH_LESSONS[i]=L385; break; } } })();
})();
/* ================= УРОК 386 · Деление с остатком ================= */
(function(){
  const L386 = {
    id: 386, title: 'Деление с остатком: задачи', ico: '🍬',
    src: 'Математика · 5–6 класс · Деление с остатком', subj: 'math',
    explain: [
      'Архимед раскладывает 48 конфет в коробочки по 5 штук. Сколько коробочек получится и сколько конфет останется? Это деление с остатком — когда разделить нацело не получается.',
      'Ищем самое большое число, кратное 5, но не большее 48. Кратные 5: 5, 10, 15… 45. Дальше идёт 50 — уже больше 48. Значит, берём 45. Сколько это коробочек? 45 : 5 = 9.',
      'Теперь считаем остаток: 48 − 45 = 3 конфеты. Итог: 48 : 5 = 9 (остаток 3). Коротко записывают: 48 = 9·5 + 3. Девять полных коробочек и 3 конфеты лишние!',
      'Главное правило деления с остатком: ОСТАТОК ВСЕГДА МЕНЬШЕ ДЕЛИТЕЛЯ! При делении на 5 остаток может быть только 0, 1, 2, 3 или 4. Остаток 5 невозможен — ведь 5 снова уместилось бы в коробочку!',
      'Проверка всегда спасает: частное · делитель + остаток = исходное число. Для 48 : 5: 9 · 5 + 3 = 45 + 3 = 48. Всё сходится! Всегда проверяй себя такой формулой.',
      'Обратная задача: какое наименьшее число при делении на 7 даёт остаток 4? Берём самое маленькое частное — 1: 7·1 + 4 = 11. Проверка: 11 : 7 = 1 (остаток 4). Меньше 11 уже нельзя — 4 само по себе меньше 7!',
      'Ещё пример: найдём наименьшее число, которое при делении на 5 даёт остаток 3. Это 5·1 + 3 = 8. Проверка: 8 : 5 = 1 (остаток 3). Заметь: 3 — это и есть остаток, а 8 = 5 + 3.',
      'В задачах «на остаток» всегда начинай с самого маленького частного (обычно 1) и прибавляй остаток. А если нужны все такие числа — прибавляй делитель: 8, 13, 18…',
      'Теперь проверь себя: чему равны частное и остаток при делении 48 на 5? Вспомни: 48 = 9·5 + 3.'
    ],
    check: { q: 'Чему равны частное и остаток: 48 : 5?', choices: ['9 и 3', '8 и 8', '9 и 5', '10 и 2'], ans: 0,
      exp: '48 = 9·5 + 3 → частное 9, остаток 3.' },
    tasks: [
      { q: 'Какое наименьшее натуральное число при делении на 7 даёт остаток 4?', kind: 'unit', ans: 11, tol: 0,
        hints: ['7·1 + 4.', '11.'], sol: '11' },
      { q: 'Может ли остаток при делении на 5 быть равен 5?', kind: 'choice', choices: ['нет', 'да', 'если число большое', 'иногда'], ans: 0, tol: 0,
        hints: ['Остаток меньше делителя.', 'Остаток всегда меньше 5.'], sol: 'нет' }
    ]
  };
  const candies=(n)=>{ let out='';
    for(let i=0;i<n;i++) out+=`<span style="font-size:15px">🍬</span>`;
    return `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1px;max-width:340px">${out}</div>`;
  };
  const boxRow=(full,rest)=>{ let s=`<div class="wv-row" style="gap:4px;flex-wrap:wrap;margin:6px 0">`;
    for(let i=0;i<full;i++) s+=`<div style="border:1.5px solid #8a6d1e;border-radius:8px;padding:2px 6px;background:rgba(217,164,65,.08);display:flex;gap:1px">${Array.from({length:5},()=>'🍬').join('')}</div>`;
    if(rest>0) s+=`<div style="border:1.5px dashed #e86a5a;border-radius:8px;padding:2px 6px;display:flex;gap:1px">${Array.from({length:rest},()=>'🍬').join('')}</div>`;
    s+=`</div>`; return s;
  };
  function visB386(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">48 конфет по 5 в коробке</div>
        ${candies(48)}
        <div class="wv-sml">сколько коробочек и сколько конфет останется?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Ищем кратное 5</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:340px">
          ${[5,10,15,20,25,30,35,40,45,50].map((n,i)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:34px;border-radius:8px;background:${n<=45?'rgba(143,209,168,.14)':'rgba(232,106,90,.12)'};border:2px solid ${n<=45?'#4c8a5a':'#b0635a'};font-size:15px;color:${n<=45?'#8fd1a8':'#ff9a8a'};font-weight:bold">${n}</span>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">45 — самое большое кратное 5, не большее 48 · 45 : 5 = 9</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Девять коробочек + остаток</div>
        ${boxRow(9,3)}
        <div style="font-size:20px;color:#ffd76a;font-family:Georgia,serif">48 = 9 · 5 + 3</div>
        <div class="wv-sml">9 коробочек по 5 и 3 конфеты лишние</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Главное правило</div>
        <div style="background:rgba(232,106,90,.1);border:2px solid rgba(232,106,90,.5);border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:16px;color:#ffcfc2;text-align:center">остаток <b>всегда меньше делителя</b>!</div>
        </div>
        <div class="wv-sml">делим на 5 → остатки: 0, 1, 2, 3, 4 · остаток 5 невозможен!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка</div>
        <div style="font-size:24px;color:#e8dcc8;font-family:Georgia,serif">9·5 + 3 = 45 + 3 = <b style="color:#8fd1a8" class="wv-ans">48</b></div>
        <div style="background:rgba(127,209,160,.1);border:1px solid #4c8a5a;border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#b8e0c4">частное · делитель + остаток = исходное число — всегда проверяй!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Обратная задача</div>
        <div class="wv-sml">наименьшее число, которое при делении на 7 даёт остаток 4</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">7·1 + 4 = <b class="wv-ans" style="color:#8fd1a8">11</b></div>
        <div class="wv-sml">проверка: 11 : 7 = 1 (остаток 4) ✔</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример</div>
        <div class="wv-sml">наименьшее число с остатком 3 при делении на 5</div>
        <div style="font-size:26px;color:#ffd76a;font-family:Georgia,serif">5·1 + 3 = <b class="wv-ans" style="color:#8fd1a8">8</b></div>
        <div class="wv-row" style="gap:4px;margin:4px 0">${[8,13,18,23].map(n=>`<span style="border:1px solid #3d5c49;border-radius:8px;padding:3px 9px;font-size:15px;color:#cfe0cf">${n}</span>`).join('')}</div>
        <div class="wv-sml">дальше прибавляем делитель 5: 8, 13, 18…</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','найди кратное делителя, не большее числа','#7fd1ff'],
            ['2️⃣','частное = сколько раз уместилось','#8fd1a8'],
            ['3️⃣','остаток = число минус это кратное','#ffd76a'],
            ['4️⃣','проверка: частное·делитель + остаток','#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:6px 12px;text-align:left;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${boxRow(9,3)}
        <div class="wv-sml">48 : 5 — частное и остаток?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? и ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[386]=visB386;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===386){ window.ARH_LESSONS[i]=L386; break; } } })();
})();
/* ================= УРОК 387 · Проценты ================= */
(function(){
  const L387 = {
    id: 387, title: 'Проценты: олимпиадные задачи', ico: '🏷️',
    src: 'Математика · 5–6 класс · Проценты', subj: 'math',
    explain: [
      'В магазине Архимеда цена товара 100 рублей. Сначала цену повысили на 10%, а потом — внимание! — понизили на 10%. Вернулась ли цена к 100 рублям? Интуиция говорит «да», но математика удивит!',
      'Сначала повышение. 10% от 100 рублей — это 10 рублей (ведь 10% = 0,1, а 100·0,1 = 10). Новая цена: 100 + 10 = 110 рублей. Пока всё просто.',
      'Теперь понижение на 10% — но от какой цены? От НОВОЙ, то есть от 110 рублей! 10% от 110 = 110·0,1 = 11 рублей. Новая цена: 110 − 11 = 99 рублей!',
      'Смотри, что получилось: 100 → 110 → 99. Итоговая цена 99 рублей — МЕНЬШЕ исходных 100! Вот это поворот! Проценты считались от разных чисел: повышение от 100, а понижение от 110.',
      'Запомни главное правило: проценты всегда считаются от ТЕКУЩЕЙ величины. После повышения база изменилась, и следующее понижение считается уже от новой цены.',
      'Потренируемся со скидкой: товар стоил 200 рублей, скидка 20%. Сколько стоит теперь? 20% от 200 = 200·0,2 = 40 рублей. Новая цена: 200 − 40 = 160 рублей.',
      'А увеличение на 50%? Увеличить число на 50% — значит прибавить половину, то есть умножить на 1,5. 100 → 150. Запомни: +50% это ×1,5, +25% это ×1,25, +100% это ×2!',
      'Быстрый способ: чтобы найти цену после скидки p%, умножь на (100 − p)/100. После скидки 20%: ×0,8. 200·0,8 = 160. Проверь: 200 − 40 = 160 — сходится!',
      'Теперь проверь себя: цена 100 руб. выросла на 10%, затем упала на 10%. Какая итоговая цена? Вспомни: сначала 110, потом минус 10% от 110.'
    ],
    check: { q: 'Цена 100 руб. выросла на 10%, затем упала на 10%. Итоговая цена?', choices: ['99 руб.', '100 руб.', '110 руб.', '90 руб.'], ans: 0,
      exp: '100+10=110, затем 110−11=99.' },
    tasks: [
      { q: 'Товар стоил 200 руб., скидка 20%. Новая цена?', kind: 'unit', ans: 160, tol: 0,
        hints: ['20% от 200 = 40 руб.', '200 − 40 = 160 руб.'], sol: '160' },
      { q: 'Число увеличили на 50%. Во сколько раз оно выросло?', kind: 'choice', choices: ['в 1,5 раза', 'в 2 раза', 'в 5 раз', 'в 0,5 раза'], ans: 0, tol: 0,
        hints: ['+50% = ×1,5.', '100 → 150 — в 1,5 раза.'], sol: 'в 1,5 раза' }
    ]
  };
  const tag=(price,label,color)=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid ${color};border-radius:14px;padding:10px 14px;min-width:86px"><div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">${price}</div><div style="font-size:11px;color:${color}">${label}</div></div>`;
  function visB387(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Загадка магазина</div>
        <div style="display:flex;gap:10px;justify-content:center;align-items:center">
          ${tag('100 ₽','было','#8fd1a8')}
          <span style="font-size:20px;color:#8fa08f">+10% → −10% → ?</span>
        </div>
        <div style="background:rgba(232,106,90,.1);border:1px solid rgba(232,106,90,.4);border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#ffcfc2">вернётся ли цена к 100 рублям? Сейчас удивимся!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Повышение на 10%</div>
        <div class="wv-row" style="gap:8px">${tag('100 ₽','было','#8fd1a8')}<span style="font-size:20px;color:#8fa08f">+10</span>${tag('110 ₽','стало','#ffd76a')}</div>
        <div class="wv-sml">10% от 100 = 100·0,1 = 10 ₽ · 100 + 10 = 110</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Понижение — от НОВОЙ цены!</div>
        <div class="wv-row" style="gap:8px">${tag('110 ₽','новая база','#ffd76a')}<span style="font-size:20px;color:#8fa08f">−11</span>${tag('99 ₽','итог','#e86a5a')}</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;max-width:330px;font-size:14px;color:#ffcfc2">10% теперь от 110: 110·0,1 = 11 ₽! Не от 100!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Сюрприз: 100 → 99</div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center">
          ${tag('100 ₽','','#8fd1a8')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('110 ₽','','#ffd76a')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('99 ₽','','#e86a5a')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #d9a441;border-radius:12px;padding:8px 12px;max-width:330px;font-size:15px;color:#ffd76a;font-weight:bold" class="wv-ans">99 < 100 — цена упала!</div>
        <div class="wv-sml">проценты считались от разных чисел!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Главное правило</div>
        <div style="background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;line-height:1.5;color:#e8dcc8;text-align:center">проценты всегда считаются от <b style="color:#7fd1ff">текущей</b> величины</div>
        </div>
        <div class="wv-sml">после повышения база изменилась — дальше считаем от новой!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Скидка 20%</div>
        <div class="wv-row" style="gap:8px">${tag('200 ₽','было','#8fd1a8')}<span style="font-size:20px;color:#8fa08f">−40</span>${tag('160 ₽','стало','#ffd76a')}</div>
        <div class="wv-sml">20% от 200 = 40 ₽ · 200 − 40 = 160</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Увеличение = умножение</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['+50%','×1,5','100 → 150'],
            ['+25%','×1,25','100 → 125'],
            ['+100%','×2','100 → 200']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b><span style="color:#8fa08f;font-size:12.5px">${x[2]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Быстрый способ со скидкой</div>
        <div style="background:rgba(217,164,65,.09);border:2px solid #d9a441;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">цена после скидки p% = цена <b style="color:#ffd76a">× (100 − p) : 100</b></div>
        </div>
        <div class="wv-row" style="gap:8px">${tag('200 ₽','×0,8','#8fd1a8')}${tag('160 ₽','= 200·0,8','#ffd76a')}</div>
        <div class="wv-sml">скидка 20% → множитель 0,8!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">100 ₽ → +10% → −10% → ?</div>
        <div style="display:flex;align-items:center;gap:6px;justify-content:center">
          ${tag('100 ₽','','#8fd1a8')}<span style="font-size:18px;color:#8fa08f">→</span>${tag('110 ₽','','#ffd76a')}<span style="font-size:18px;color:#8fa08f">→</span><span style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:14px;padding:8px 12px;font-size:22px;color:#ffd76a" class="wv-pulse">? ₽</span>
        </div>
        <div class="wv-sml">минус 10% от 110!</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[387]=visB387;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===387){ window.ARH_LESSONS[i]=L387; break; } } })();
})();
/* ================= УРОК 388 · Разрезания и площади ================= */
(function(){
  const L388 = {
    id: 388, title: 'Разрезания и площади', ico: '✂️',
    src: 'Математика · 5–6 класс · Площади', subj: 'math',
    explain: [
      'Архимед склеил прямоугольник 6 на 4 из бумажных клеток и хочет разрезать его на одинаковые квадраты 2×2. Сколько квадратов получится? Считать по одному долго — посчитаем площадью!',
      'Сначала найдём площадь прямоугольника. Площадь = длина × ширина = 6 · 4 = 24 клетки. Это как посчитать все клетки внутри — их ровно 24.',
      'Теперь площадь одного квадрата 2×2: 2 · 2 = 4 клетки. Каждый такой квадрат занимает 4 клетки.',
      'Делим площадь прямоугольника на площадь квадрата: 24 : 4 = 6. Значит, из прямоугольника 6×4 получится ровно 6 квадратов 2×2! Проверь глазами на картинке.',
      'Почему так? Разрезание не теряет и не создаёт площадь: сумма площадей частей равна площади целого. Поэтому делим общую площадь на площадь одной части — и готово!',
      'Потренируемся со «счётом полосками»: фигура — это 3 полоски по 5 клеток. Площадь = 3 · 5 = 15 клеток. Умножение вместо пересчёта каждой клетки!',
      'А квадрат 5×5: площадь 5 · 5 = 25 клеток. Квадрат — это прямоугольник, у которого стороны равны, поэтому площадь = сторона · сторона.',
      'Запомни формулы: площадь прямоугольника = длина × ширина; площадь квадрата = сторона × сторона. А при разрезании: число частей = площадь целого : площадь части.',
      'Теперь проверь себя: прямоугольник 6×4 разрезали на квадраты 2×2. Сколько квадратов получится? Вспомни: 24 : 4.'
    ],
    check: { q: 'Прямоугольник 6×4 разрезали на квадраты 2×2. Сколько квадратов?', choices: ['6', '8', '12', '24'], ans: 0,
      exp: 'Площадь 6·4=24, квадрат 2·2=4 → 24:4=6.' },
    tasks: [
      { q: 'Площадь фигуры из 3 полосок по 5 клеток?', kind: 'unit', ans: 15, tol: 0,
        hints: ['3 · 5.', '15 клеток.'], sol: '15' },
      { q: 'Сколько квадратиков 1×1 в квадрате 5×5?', kind: 'choice', choices: ['25', '20', '10', '5'], ans: 0, tol: 0,
        hints: ['5 · 5.', '25 квадратиков.'], sol: '25' }
    ]
  };
  const rectCells=(w,h,cell,offX,offY)=>{ let out='';
    for(let r=0;r<h;r++){ for(let c=0;c<w;c++){
      const x=(offX||0)+c*cell, y=(offY||0)+r*cell;
      out+=`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${(r+c)%2?'rgba(127,209,160,.5)':'rgba(127,209,160,.25)'}" stroke="#2c4a38" stroke-width="1"/>`;
    }}
    return out;
  };
  function visB388(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольник 6×4 из клеток</div>
        <svg viewBox="0 0 200 140" style="width:220px;height:154px;background:#101f18;border-radius:10px">${rectCells(6,4,20)}</svg>
        <div class="wv-sml">разрежем на квадраты 2×2 — сколько выйдет?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Площадь прямоугольника</div>
        <svg viewBox="0 0 200 140" style="width:200px;height:140px;background:#101f18;border-radius:10px">
          <rect x="5" y="5" width="120" height="80" fill="rgba(127,209,160,.15)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="65" y="50" text-anchor="middle" font-size="15" fill="#ffd76a">6</text>
          <text x="70" y="112" text-anchor="middle" font-size="15" fill="#ffd76a">4</text>
          <line x1="5" y1="45" x2="125" y2="45" stroke="#8fd1a8" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line x1="68" y1="5" x2="68" y2="85" stroke="#8fd1a8" stroke-width="1.5" stroke-dasharray="4 3"/>
        </svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">площадь = 6 · 4 = 24 клетки</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат 2×2</div>
        <svg viewBox="0 0 100 100" style="width:110px;height:110px;background:#101f18;border-radius:10px">
          <rect x="10" y="10" width="80" height="80" fill="rgba(217,164,65,.2)" stroke="#d9a441" stroke-width="2"/>
          <line x1="10" y1="50" x2="90" y2="50" stroke="#d9a441" stroke-width="1" stroke-dasharray="3 2"/>
          <line x1="50" y1="10" x2="50" y2="90" stroke="#d9a441" stroke-width="1" stroke-dasharray="3 2"/>
          <text x="50" y="48" text-anchor="middle" font-size="13" fill="#ffd76a">2</text>
          <text x="72" y="96" text-anchor="middle" font-size="13" fill="#ffd76a">2</text>
        </svg>
        <div class="wv-sml">площадь квадрата = 2 · 2 = 4 клетки</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Делим: 24 : 4</div>
        <svg viewBox="0 0 200 140" style="width:220px;height:154px;background:#101f18;border-radius:10px">
          ${rectCells(6,4,20)}
          <g stroke="#ffd76a" stroke-width="3">
            <line x1="40" y1="0" x2="40" y2="80"/><line x1="80" y1="0" x2="80" y2="80"/><line x1="120" y1="0" x2="120" y2="80"/>
            <line x1="0" y1="40" x2="160" y2="40"/>
          </g>
        </svg>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">24 : 4 = 6 квадратов!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет: площадь сохраняется</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.55">разрезание <b style="color:#ffd76a">не теряет и не создаёт</b> площадь: сумма площадей частей = площадь целого</div>
        <div class="wv-sml">поэтому: число частей = площадь целого : площадь части</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем полосками</div>
        <svg viewBox="0 0 200 140" style="width:200px;height:140px;background:#101f18;border-radius:10px">
          <rect x="5" y="5" width="160" height="20" fill="rgba(127,209,160,.3)" stroke="#8fd1a8" stroke-width="1.5"/>
          <rect x="5" y="27" width="160" height="20" fill="rgba(127,209,160,.5)" stroke="#8fd1a8" stroke-width="1.5"/>
          <rect x="5" y="49" width="160" height="20" fill="rgba(127,209,160,.3)" stroke="#8fd1a8" stroke-width="1.5"/>
          <text x="85" y="20" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
          <text x="85" y="42" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
          <text x="85" y="64" text-anchor="middle" font-size="10" fill="#0d1a13">1 2 3 4 5</text>
        </svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">3 полоски по 5 = 3 · 5 = 15</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат 5×5</div>
        <svg viewBox="0 0 130 130" style="width:130px;height:130px;background:#101f18;border-radius:10px">${rectCells(5,5,20,5,5)}</svg>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">5 · 5 = 25 квадратиков</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка формул</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['площадь прямоугольника','длина × ширина','▭','#8fd1a8'],
            ['площадь квадрата','сторона × сторона','⬜','#7fd1ff'],
            ['число частей при разрезании','площадь целого : площадь части','✂️','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[3]};border-radius:9px;padding:7px 12px;text-align:left;font-size:13.5px;color:#e8dcc8"><span style="font-size:20px">${x[2]}</span><span><b style="color:${x[3]}">${x[0]}</b> = ${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">прямоугольник 6×4 → квадраты 2×2 — сколько?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">24 : 4 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[388]=visB388;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===388){ window.ARH_LESSONS[i]=L388; break; } } })();
})();
/* ================= УРОК 389 · Углы и треугольники ================= */
(function(){
  const L389 = {
    id: 389, title: 'Углы и треугольники: приёмы', ico: '📐',
    src: 'Математика · 5–6 класс · Треугольники', subj: 'math',
    explain: [
      'Архимед строит шалаш треугольной формы. Один угол — 40° у вершины. А какие углы у основания, если шалаш симметричный (равнобедренный)? Чтобы ответить, нужно знать главный секрет треугольников!',
      'Главный секрет: сумма углов ЛЮБОГО треугольника равна 180 градусам. Это как развёрнутый угол — половина полного круга. Проверь на любом треугольнике: сложи все три угла — всегда получишь 180°!',
      'Почему так? Отрежь углы треугольника и сложи их вместе — они составят ровно развёрнутый угол 180°. Можно проверить на бумаге: вырежи треугольник, оторви уголки и приложи друг к другу!',
      'Если знаешь два угла, третий находим вычитанием: третий = 180° − первый − второй. Например, углы 90° и 45°: третий = 180 − 90 − 45 = 45°. Вот и всё!',
      'Вернёмся к шалашу. Он равнобедренный: две стороны равны. А у равнобедренного треугольника углы при ОСНОВАНИИ тоже равны! Это очень удобное свойство.',
      'Итак, угол при вершине 40°. Сумма двух углов при основании: 180 − 40 = 140°. А раз они равны, каждый = 140 : 2 = 70°. Углы шалаша при основании — по 70 градусов!',
      'Равносторонний треугольник — ещё проще: все три стороны равны, значит, и все углы равны. Каждый угол = 180 : 3 = 60°. Поэтому равносторонний называют ещё «правильным».',
      'Прямоугольный треугольник: один угол 90°. Тогда два других в сумме дают 90° (ведь 180 − 90 = 90). Если один из них 45°, то и второй 45° — такой треугольник равнобедренный!',
      'Теперь проверь себя: чему равна сумма углов любого треугольника? Вспомни главный секрет — 180 градусов!'
    ],
    check: { q: 'Чему равна сумма углов треугольника?', choices: ['180°', '90°', '360°', '100°'], ans: 0,
      exp: 'Сумма углов любого треугольника — 180°.' },
    tasks: [
      { q: 'У равнобедренного треугольника угол при вершине 40°. Чему равен угол при основании?', kind: 'unit', ans: 70, tol: 0,
        hints: ['(180 − 40) : 2.', '140 : 2 = 70°.'], sol: '70°' },
      { q: 'Углы треугольника 90° и 45°. Чему равен третий?', kind: 'choice', choices: ['45°', '90°', '135°', '55°'], ans: 0, tol: 0,
        hints: ['180 − 90 − 45.', '45°.'], sol: '45°' }
    ]
  };
  const triSVG=(top,left,right,cls)=>`<svg viewBox="0 0 180 150" style="width:${cls==='big'?210:170}px;height:${cls==='big'?175:141}px">
    <polygon points="90,10 20,140 160,140" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.5"/>
    <path d="M90 10 L112 40 A 44 44 0 0 1 84 42 Z" fill="rgba(255,215,106,.4)"/>
    <text x="96" y="22" font-size="13" fill="#ffd76a">${top}°</text>
    <text x="38" y="130" font-size="13" fill="#8fd1a8">${left}°</text>
    <text x="140" y="130" font-size="13" fill="#8fd1a8">${right}°</text>
  </svg>`;
  function visB389(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Шалаш Архимеда</div>
        <div style="font-size:60px" class="wv-swing">⛺</div>
        <div class="wv-sml" style="max-width:330px">симметричный шалаш = <b style="color:#ffd76a">равнобедренный треугольник</b>: две стороны равны. Угол наверху 40° — какие углы внизу?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Главный секрет: 180°</div>
        ${triSVG(50,60,70,'')}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:9px 14px;font-size:18px;color:#ffd76a;font-weight:bold">50° + 60° + 70° = 180°</div>
        <div class="wv-sml">сумма углов любого треугольника — 180°!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так? Оторви уголки!</div>
        <div style="display:flex;gap:10px;justify-content:center;align-items:center">
          <div style="font-size:44px" class="wv-flick">✂️</div>
          <div style="display:flex;gap:2px">
            <span style="width:44px;height:44px;background:rgba(127,209,255,.5);clip-path:polygon(0 0,100% 100%,0 100%);display:inline-block"></span>
            <span style="width:44px;height:44px;background:rgba(143,209,168,.5);clip-path:polygon(0 0,100% 0,100% 100%);display:inline-block"></span>
            <span style="width:44px;height:44px;background:rgba(232,106,90,.5);clip-path:polygon(100% 0,100% 100%,0 100%);display:inline-block"></span>
          </div>
        </div>
        <div class="wv-sml">оторванные уголки вместе дают ровно развёрнутый угол — 180°</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Находим третий угол</div>
        <div style="font-size:22px;color:#e8dcc8;font-family:Georgia,serif">третий = 180° − первый − второй</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['углы 90° и 45°', '180 − 90 − 45 = 45°', '#8fd1a8'],
            ['углы 70° и 50°', '180 − 70 − 50 = 60°', '#7fd1ff']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Равнобедренный треугольник</div>
        <div style="display:flex;align-items:center;gap:12px">
          <svg viewBox="0 0 150 140" style="width:150px;height:140px">
            <polygon points="75,10 20,130 130,130" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.5"/>
            <line x1="20" y1="130" x2="130" y2="130" stroke="#ffd76a" stroke-width="3"/>
            <text x="45" y="140" font-size="12" fill="#8fd1a8">равные</text>
            <text x="112" y="140" font-size="12" fill="#8fd1a8">стороны</text>
          </svg>
          <div style="text-align:left;font-size:14px;color:#e8dcc8;max-width:190px;line-height:1.55">у равнобедренного треугольника <b style="color:#8fd1a8">углы при основании равны</b></div>
        </div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем шалаш: вершина 40°</div>
        <svg viewBox="0 0 180 150" style="width:180px;height:150px">
          <polygon points="90,10 20,140 160,140" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.5"/>
          <text x="96" y="26" font-size="15" fill="#ffd76a">40°</text>
          <text x="70" y="135" font-size="15" fill="#8fd1a8">?°</text>
          <text x="150" y="135" font-size="15" fill="#8fd1a8">?°</text>
        </svg>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%;font-size:15px;color:#e8dcc8">
          <div class="wv-pop">180 − 40 = 140° — на два угла вместе</div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">140 : 2 = 70° каждый</div>
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Равносторонний — «правильный»</div>
        <div style="display:flex;gap:10px;align-items:center;justify-content:center">
          <svg viewBox="0 0 140 130" style="width:150px;height:139px">
            <polygon points="70,10 10,125 130,125" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.5"/>
            <text x="70" y="28" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
            <text x="34" y="118" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
            <text x="106" y="118" text-anchor="middle" font-size="13" fill="#ffd76a">60°</text>
          </svg>
        </div>
        <div class="wv-sml">все стороны равны → все углы по 180:3 = 60°</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Прямоугольный треугольник</div>
        <div style="display:flex;gap:8px;justify-content:center">
          <svg viewBox="0 0 150 130" style="width:160px;height:139px">
            <polygon points="20,115 130,115 20,20" fill="rgba(232,106,90,.1)" stroke="#e86a5a" stroke-width="2.5"/>
            <path d="M20 115 L32 115 L32 103 Z" fill="#e86a5a"/>
            <text x="90" y="130" font-size="13" fill="#e86a5a">90°</text>
            <text x="26" y="40" font-size="13" fill="#ffd76a">45°</text>
            <text x="120" y="105" font-size="13" fill="#8fd1a8">45°</text>
          </svg>
        </div>
        <div class="wv-sml">90° + 45° + 45° = 180° · острые углы в сумме 90°</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div style="display:flex;gap:10px;justify-content:center">
          ${['🔺','📐','⛺'].map(e=>`<span style="font-size:40px" class="wv-pulse">${e}</span>`).join('')}
        </div>
        <div class="wv-sml">сумма углов любого треугольника?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? °</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[389]=visB389;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===389){ window.ARH_LESSONS[i]=L389; break; } } })();
})();
/* ================= УРОК 390 · Правило произведения ================= */
(function(){
  const L390 = {
    id: 390, title: 'Правило произведения: задачи', ico: '👔',
    src: 'Математика · 5–6 класс · Комбинаторика', subj: 'math',
    explain: [
      'Архимед собирается на праздник. У него 4 рубашки и 3 галстука. Сколько разных комплектов «рубашка + галстук» можно собрать? Перебирать долго — комбинаторика даёт быстрый ответ!',
      'Представь дерево выбора. Из каждой рубашки выходят 3 веточки — по одной на каждый галстук. Рубашек 4, значит, веточек всего 4 · 3 = 12. Каждая веточка — свой комплект!',
      'Это и есть ПРАВИЛО ПРОИЗВЕДЕНИЯ: если первый выбор можно сделать m способами, а второй — n способами, то вместе m · n способов. Выборы независимы — перемножаем!',
      'Теперь задача с цифрами. Сколько двузначных чисел начинается с цифры 5? Первая цифра уже выбрана — это 5 (1 способ). Вторая цифра — любая из десяти: 0, 1, 2, …, 9 (10 способов). Итого 1 · 10 = 10 чисел: 50, 51, …, 59.',
      'Сложнее: из города А в город Б ведут 3 дороги, из Б в В — 2 дороги, из В в Г — 4 дороги. Сколько маршрутов из А в Г? Каждый участок выбираем независимо: 3 · 2 · 4 = 24 маршрута!',
      'Правило работает для ЛЮБОГО числа шагов: перемножай количества вариантов на каждом шаге. 3 шага → три множителя: 3 · 2 · 4. Десять шагов → десять множителей!',
      'Проверим на меню: 3 супа, 4 вторых, 2 десерта. Комплексный обед (суп + второе + десерт): 3 · 4 · 2 = 24 варианта! Каждый день можно есть новый — почти месяц!',
      'Запомни: правило произведения применяется, когда выборы НЕЗАВИСИМЫ — результат первого выбора не влияет на число вариантов второго. Тогда просто перемножай!',
      'Теперь проверь себя: 4 рубашки и 3 галстука — сколько комплектов? Вспомни: 4 · 3.'
    ],
    check: { q: '4 рубашки и 3 галстука. Сколько комплектов «рубашка + галстук»?', choices: ['12', '7', '34', '43'], ans: 0,
      exp: '4 · 3 = 12.' },
    tasks: [
      { q: 'Сколько двузначных чисел начинается с цифры 5?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Вторая цифра — любая из 10.', '50…59 — 10 чисел.'], sol: '10' },
      { q: 'Из А в Б 3 дороги, из Б в В 2, из В в Г 4. Сколько маршрутов А→Г?', kind: 'choice', choices: ['24', '9', '12', '6'], ans: 0, tol: 0,
        hints: ['Перемножаем.', '3 · 2 · 4 = 24.'], sol: '24' }
    ]
  };
  const treeSVG=(branches)=>`<svg viewBox="0 0 200 160" style="width:${branches===4?230:200}px">
    <circle cx="100" cy="16" r="13" fill="#e86a5a"/><text x="100" y="21" text-anchor="middle" font-size="11" fill="#fff">👕</text>
    <g stroke="#d9a441" stroke-width="2.5">
      ${Array.from({length:branches},(_,i)=>{const x1=70+i*20,y1=40,x2=40+i*40,y2=120;
        return `<line x1="100" y1="29" x2="${x1+20}" y2="${y1}" />`;}).join('')}
    </g>
    <g font-size="16">
      ${Array.from({length:branches},(_,i)=>{const x=40+i*40,y=130; return `<text x="${x}" y="${y}">👔</text>`;}).join('')}
    </g>
  </svg>`;
  function visB390(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Гардероб Архимеда</div>
        <div style="font-size:52px" class="wv-swing">👔</div>
        <div class="wv-sml">4 рубашки и 3 галстука — сколько комплектов?</div>
        <div class="wv-row" style="gap:4px;margin:4px 0">${['👕','👕','👕','👕'].join('')}</div>
        <div class="wv-row" style="gap:4px">${['👔','👔','👔'].join('')}</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Дерево выбора</div>
        ${treeSVG(3)}
        <div class="wv-sml">каждая рубашка сочетается с каждым галстуком</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Правило произведения</div>
        <div style="background:rgba(217,164,65,.1);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:330px;width:100%">
          <div style="font-size:15px;line-height:1.55;color:#e8dcc8;text-align:center">первый выбор — <b style="color:#7fd1ff">m</b> способов, второй — <b style="color:#8fd1a8">n</b> → вместе <b style="color:#ffd76a">m · n</b></div>
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">4 · 3 = 12 комплектов</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Двузначные с цифры 5</div>
        <div class="wv-row" style="gap:6px;margin:4px 0">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:44px;border-radius:9px;background:rgba(217,164,65,.2);border:2px solid #d9a441;font-size:22px;color:#ffd76a;font-weight:bold">5</span>
          <span style="font-size:22px;color:#8fa08f">+</span>
          <span style="display:inline-flex;align-items:center;justify-content:center;width:46px;height:44px;border-radius:9px;background:rgba(127,209,255,.14);border:2px solid #7fd1ff;font-size:20px;color:#7fd1ff;font-weight:bold">0–9</span>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">1 · 10 = 10 чисел: 50, 51, …, 59</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Маршруты А → Б → В → Г</div>
        <div style="display:flex;align-items:center;gap:6px;font-size:26px">
          <span style="background:rgba(127,209,255,.14);border:2px solid #7fd1ff;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#7fd1ff">А</span>
          <b style="color:#ffd76a">3</b>
          <span style="background:rgba(143,209,168,.14);border:2px solid #8fd1a8;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#8fd1a8">Б</span>
          <b style="color:#ffd76a">2</b>
          <span style="background:rgba(255,215,106,.14);border:2px solid #ffd76a;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#ffd76a">В</span>
          <b style="color:#ffd76a">4</b>
          <span style="background:rgba(232,160,90,.14);border:2px solid #e8a05a;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:13px;color:#e8a05a">Г</span>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#ffd76a">3 · 2 · 4 = 24 маршрута</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Сколько шагов — столько множителей</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['2 шага', 'm · n'],
            ['3 шага', 'm · n · k'],
            ['10 шагов', 'десять множителей!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#ffd76a">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Комплексный обед</div>
        <div class="wv-row" style="gap:8px;margin:4px 0">
          ${[['🍲','3 супа'],['🍗','4 вторых'],['🍰','2 десерта']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 10px"><div style="font-size:26px">${x[0]}</div><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">3 · 4 · 2 = 24 обеда!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Когда применять</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">правило работает, когда выборы <b style="color:#8fd1a8">независимы</b>: первый выбор не меняет число вариантов второго → просто <b style="color:#ffd76a">перемножай!</b></div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:4px">${['👕','👕','👕','👕'].join('')}</div>
        <div class="wv-row" style="gap:4px">${['👔','👔','👔'].join('')}</div>
        <div class="wv-sml">сколько комплектов рубашка + галстук?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">4 · 3 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[390]=visB390;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===390){ window.ARH_LESSONS[i]=L390; break; } } })();
})();
/* ================= УРОК 391 · Игры и стратегии ================= */
(function(){
  const L391 = {
    id: 391, title: 'Игры и стратегии: анализ с конца', ico: '🎯',
    src: 'Математика · 5–6 класс · Игры', subj: 'math',
    explain: [
      'На столе 20 предметов. Двое по очереди берут от 1 до 3 предметов. Выигрывает тот, кто взял последний предмет. Можно ли гарантировать победу? Да — есть хитрая стратегия!',
      'Секрет — анализировать игру С КОНЦА. Спроси себя: какую позицию выгодно оставить противнику перед его ходом, чтобы он точно проиграл?',
      'Ловушка: если оставить противнику ровно 4 предмета, он обречён! Что бы он ни взял (1, 2 или 3), ты забираешь все оставшиеся: 4−1=3, 4−2=2, 4−3=1. Последний предмет — твой!',
      'Раз 4 — ловушка, то и 8, 12, 16, 20 — тоже ловушки! Ведь если противник оставляет тебе 8, ты берёшь столько, чтобы оставить ему 4, и так далее. Все позиции, кратные 4, — выигрышные для тебя.',
      'В нашей игре 20 предметов. 20 = 4 · 5 — это позиция-ловушка для ТОГО, кто ходит первым! Значит, при правильной игре выигрывает ВТОРОЙ игрок.',
      'Стратегия второго: что бы ни взял первый (1, 2 или 3), второй дополняет ход до 4. Взял 1 — дополни до 4 (возьми 3). Взял 2 — возьми 2. Взял 3 — возьми 1. После каждой пары ходов уходит ровно 4 предмета!',
      'Проверим: 20 → первый берёт 2 → осталось 18. Второй берёт 2 (2+2=4) → 16. Первый берёт 3 → 13. Второй берёт 1 → 12. И так далее… последние 4 предмета останутся первому — и он проиграет!',
      'Запомни рецепт: 1) найди «ловушку» — позицию, с которой противник обречён (4); 2) все кратные ловушки тоже выигрышные; 3) в каждом своём ходе дополняй ход противника до ловушки.',
      'Теперь проверь себя: 20 предметов, берут 1–3, выигрывает взявший последний. Кто выиграет при правильной игре? Подсказка: 20 кратно 4!'
    ],
    check: { q: '20 предметов, за ход берут 1–3, выигрывает взявший последний. Кто выиграет при правильной игре?', choices: ['второй', 'первый', 'ничья', 'нельзя узнать'], ans: 0,
      exp: '20 кратно 4 — ловушка для первого → выигрывает второй.' },
    tasks: [
      { q: 'В игре «берут 1–3, дополняй до 4» сколько предметов выгодно оставить противнику?', kind: 'unit', ans: 4, tol: 0,
        hints: ['Это «ловушка».', 'Позиция, кратная 4: 4 предмета.'], sol: '4' },
      { q: 'Противник оставил 4 предмета и взял 2. Сколько взять, чтобы выиграть?', kind: 'choice', choices: ['2', '1', '3', '4'], ans: 0, tol: 0,
        hints: ['4 − 2 = 2.', 'Забираем 2 — последние предметы.'], sol: '2' }
    ]
  };
  const dotsRow=(n,highlight)=>`<div class="wv-row" style="gap:4px;margin:6px 0">${Array.from({length:n},(_,i)=>`<span style="width:13px;height:13px;border-radius:50%;background:${highlight===i?'#ffd76a':'rgba(127,209,160,.55)'};box-shadow:${highlight===i?'0 0 8px rgba(255,215,106,.8)':'none'};display:inline-block"></span>`).join('')}</div>`;
  function visB391(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Игра: 20 предметов</div>
        ${dotsRow(20)}
        <div class="wv-sml">берут от 1 до 3 · кто взял последний — победил!</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">можно ли гарантировать победу? Да! Анализируем с конца…</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Анализ с конца</div>
        <div style="font-size:40px" class="wv-swing">🔍</div>
        <div class="wv-sml" style="max-width:330px">не смотри на начало игры — спроси: какую позицию выгодно <b style="color:#ffd76a">оставить противнику</b> перед его ходом?</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Ловушка: 4 предмета</div>
        ${dotsRow(4,3)}
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['противник взял 1', 'ты забираешь 3 — победа!'],
            ['противник взял 2', 'ты забираешь 2 — победа!'],
            ['противник взял 3', 'ты забираешь 1 — победа!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i===2?'#4c8a5a':'#d9a441'};border-radius:9px;padding:6px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b></div>`).join('')}
        </div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:7px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">4 — смертельная ловушка!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Кратные 4 — тоже ловушки</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[4,8,12,16,20].map((n,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:5px 12px"><b style="font-size:19px;color:#ffd76a;font-family:Georgia,serif">${n}</b><span style="font-size:12px;color:#8fa08f">= ${n/4}·4 — ловушка</span></div>`).join('')}
        </div>
        <div class="wv-sml">оставь противнику 4 → потом 8 → потом 12…</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">20 = 4 · 5</div>
        ${dotsRow(20)}
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:9px 12px;font-size:16px;color:#ffd76a;font-weight:bold" class="wv-ans">20 кратно 4 → ловушка для ПЕРВОГО → выигрывает ВТОРОЙ!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Стратегия второго</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['первый взял 1','второй берёт 3','1+3=4'],
            ['первый взял 2','второй берёт 2','2+2=4'],
            ['первый взял 3','второй берёт 1','3+1=4']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:9px;padding:6px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:#8fd1a8">${x[1]}</b><span style="color:#ffd76a">${x[2]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">каждая пара ходов забирает ровно 4 предмета — «дополняй до 4»!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Проверяем на числах</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-family:Georgia,serif;font-size:15px;color:#e8dcc8;text-align:center">
          <div class="wv-pop">20 → первый −2 → 18</div>
          <div class="wv-pop2" style="color:#8fd1a8">второй −2 → 16 (2+2=4)</div>
          <div class="wv-pop">16 → первый −3 → 13</div>
          <div class="wv-pop2" style="color:#8fd1a8">второй −1 → 12 (3+1=4)</div>
          <div class="wv-pop3" style="color:#ffd76a;font-weight:bold">… последние 4 — первому → он проиграл!</div>
        </div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Рецепт победы</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','найди «ловушку» — обречённую позицию (4)','#7fd1ff'],
            ['2️⃣','все кратные ловушки — выигрышные','#8fd1a8'],
            ['3️⃣','дополняй ход противника до ловушки','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${dotsRow(20)}
        <div class="wv-sml">20 предметов, берут 1–3, выигрывает взявший последний. Кто победит?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 18px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">первый или второй?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[391]=visB391;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===391){ window.ARH_LESSONS[i]=L391; break; } } })();
})();
/* ================= УРОК 392 · Эйлеровы пути ================= */
(function(){
  const L392 = {
    id: 392, title: 'Эйлеровы пути: одним росчерком', ico: '✏️',
    src: 'Математика · 5–6 класс · Графы', subj: 'math',
    explain: [
      'Можно ли нарисовать фигуру одним росчерком — не отрывая карандаша и не проходя по одной линии дважды? Архимед любит такие головоломки! Оказывается, ответ даёт красивое правило, найденное Эйлером.',
      'Назовём точки, где сходятся линии, ВЕРШИНАМИ. Степень вершины — сколько линий из неё выходит. Например, у квадрата каждая вершина соединяет 2 линии — степень 2 (чётная).',
      'Теперь главное правило Эйлера: фигуру можно нарисовать одним росчерком, если в ней 0 или 2 вершины НЕЧЁТНОЙ степени. Если нечётных вершин больше двух — одним росчерком не выйдет!',
      'Почему? Входя в вершину и выходя из неё, мы «тратим» по 2 линии. Остаться «неиспользованной» может только линия в начале и в конце пути — значит, нечётных вершин максимум две.',
      'Проверим на квадрате с диагональю. Без диагонали все степени 2. Диагональ добавляет по одному ребру двум вершинам — их степени становятся 3 (нечётные). Нечётных вершин ровно 2 → нарисовать можно!',
      'С чего начать? Если нечётных вершин две — начинай с одной из них и закончишь в другой. Если нечётных нет — можно начинать с любой вершины и вернёшься в неё же.',
      'А теперь «плюс» — 4 луча из центра. Центр имеет степень 4 (чётная), а четыре конца лучей — степень 1 (нечётная). Нечётных вершин четыре! Правило говорит: одним росчерком НЕ получится.',
      'Проверь сам: конверт (прямоугольник с двумя диагоналями «X») — у него 4 вершины степени 3 (нечётные) → одним росчерком нельзя. А «домик» без крыши-перекладины — можно!',
      'Теперь проверь себя: сколько вершин нечётной степени может иметь фигура, которую рисуют одним росчерком? Вспомни правило Эйлера: 0 или 2!'
    ],
    check: { q: 'Сколько вершин нечётной степени может иметь граф, который рисуется одним росчерком?', choices: ['0 или 2', 'только 2', 'только 0', 'сколько угодно'], ans: 0,
      exp: 'Правило Эйлера: 0 или 2 нечётные вершины.' },
    tasks: [
      { q: 'Сколько нечётных вершин у квадрата с одной диагональю?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Диагональ добавляет ребро двум вершинам.', 'У двух вершин степень 3 → две нечётные.'], sol: '2' },
      { q: 'Можно ли нарисовать «плюс» (4 луча из центра) одним росчерком?', kind: 'choice', choices: ['нет', 'да', 'только за 2 прохода', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['4 нечётные вершины.', '4 > 2 → одним росчерком нельзя.'], sol: 'нет' }
    ]
  };
  const figSVG=(kind)=>`<svg viewBox="0 0 190 150" style="width:200px;height:158px;background:#101f18;border-radius:12px">
    ${kind==='sq'?`<rect x="30" y="30" width="120" height="90" fill="none" stroke="#8fd1a8" stroke-width="3"/>
      <circle cx="30" cy="30" r="5" fill="#7fd1ff"/><circle cx="150" cy="30" r="5" fill="#7fd1ff"/>
      <circle cx="30" cy="120" r="5" fill="#7fd1ff"/><circle cx="150" cy="120" r="5" fill="#7fd1ff"/>`:
    kind==='sqd'?`<rect x="30" y="30" width="120" height="90" fill="none" stroke="#8fd1a8" stroke-width="3"/>
      <line x1="30" y1="30" x2="150" y2="120" stroke="#ffd76a" stroke-width="3"/>
      <circle cx="30" cy="30" r="6" fill="#ff9a8a"/><circle cx="150" cy="120" r="6" fill="#ff9a8a"/>
      <circle cx="150" cy="30" r="5" fill="#7fd1ff"/><circle cx="30" cy="120" r="5" fill="#7fd1ff"/>`:
    kind==='plus'?`<line x1="95" y1="20" x2="95" y2="130" stroke="#8fd1a8" stroke-width="5"/><line x1="40" y1="75" x2="150" y2="75" stroke="#8fd1a8" stroke-width="5"/>
      <circle cx="95" cy="20" r="6" fill="#ff9a8a"/><circle cx="95" cy="130" r="6" fill="#ff9a8a"/><circle cx="40" cy="75" r="6" fill="#ff9a8a"/><circle cx="150" cy="75" r="6" fill="#ff9a8a"/>`:''}
  </svg>`;
  function visB392(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Одним росчерком?</div>
        <div style="font-size:50px" class="wv-swing">✏️</div>
        <div class="wv-sml" style="max-width:330px">нарисовать фигуру, не отрывая карандаша и не проводя линию дважды — можно? Эйлер нашёл правило!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Вершины и степени</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['квадрат','4 вершины по 2 линии — степень 2','#8fd1a8'],['квадрат с диагональю','2 вершины по 3 линии — степень 3','#ff9a8a']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;text-align:center;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-radius:10px;padding:6px 10px;max-width:150px"><b style="font-size:12.5px;color:${x[2]}">${x[0]}</b><div style="font-size:10.5px;color:#8fa08f;margin-top:2px">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">степень вершины = сколько линий из неё выходит</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Правило Эйлера</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">одним росчерком можно, если нечётных вершин <b style="color:#ffd76a">0 или 2</b></div>
        </div>
        <div class="wv-sml">больше двух нечётных → нельзя!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Почему так?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">входя в вершину и выходя из неё, мы тратим <b style="color:#8fd1a8">по 2 линии</b>. «Неиспользованной» остаётся линия только в начале и в конце пути → нечётных вершин <b style="color:#ffd76a">не больше двух</b>.</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Квадрат с диагональю</div>
        ${figSVG('sqd')}
        <div class="wv-sml">диагональ добавила по ребру двум вершинам → степени 3 (красные)</div>
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">нечётных ровно 2 → нарисовать МОЖНО!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">С чего начать?</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['2 нечётные', 'начинай с одной — закончишь в другой'],
            ['0 нечётных', 'начинай с любой — вернёшься в неё же']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i?'#7fd1ff':'#8fd1a8'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${i?'#7fd1ff':'#8fd1a8'}">${x[0]}</b><span style="max-width:220px;text-align:right">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">«Плюс» — не получится!</div>
        ${figSVG('plus')}
        <div class="wv-sml">центр — степень 4 (чётная), но 4 конца лучей — степень 1</div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">4 нечётные > 2 → одним росчерком НЕЛЬЗЯ</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Тренируемся</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['конверт (2 диагонали X)','4 вершины степени 3 → нельзя','#e86a5a'],
            ['домик без перекладины','0 нечётных → можно!','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">сколько нечётных вершин допускает росчерк?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">0 или ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[392]=visB392;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===392){ window.ARH_LESSONS[i]=L392; break; } } })();
})();
/* ================= УРОК 393 · Формула Пика ================= */
(function(){
  const L393 = {
    id: 393, title: 'Формула Пика', ico: '📏',
    src: 'Математика · 5–6 класс · Формула Пика', subj: 'math',
    explain: [
      'На клетчатой бумаге нарисована фигура с вершинами в узлах сетки. Как найти её площадь, если считать клетки неудобно? Есть волшебная формула Пика — она считает площадь по точкам-узлам!',
      'Что такое узлы? Это точки пересечения линий сетки. Они бывают двух видов: В — узлы ВНУТРИ фигуры, и Г — узлы на ГРАНИЦЕ фигуры. Именно их количество и нужно посчитать.',
      'Считаем В — узлы внутри. На нашей фигуре внутри 5 узлов: В = 5. Считаем Г — узлы на границе (по контуру): Г = 4. Запомни эти два числа.',
      'Формула Пика: площадь S = В + Г/2 − 1. Подставляем: S = 5 + 4/2 − 1 = 5 + 2 − 1 = 6. Площадь равна 6 клеткам! Проверь подсчётом клеток — сойдётся!',
      'Почему в формуле −1? Математики доказали: если у фигуры нет дырок и вершины в узлах, то «половинки» граничных узлов и целые внутренние складываются так, что остаётся минус одна клетка. Формула работает всегда!',
      'Ещё пример: В = 3, Г = 4. Считаем: S = 3 + 4/2 − 1 = 3 + 2 − 1 = 4. Площадь 4 клетки. Попробуй нарисовать такую фигуру и проверить!',
      'А если В = 0, Г = 4? Это треугольник без внутренних узлов: S = 0 + 2 − 1 = 1. Прямоугольный треугольник на 2 клетки? Нет — это треугольник площадью 1, например с вершинами (0,0), (1,0), (0,2)... проверь!',
      'Запомни формулу Пика навсегда: S = В + Г/2 − 1. В — узлы внутри, Г — узлы на границе. Она спасает на олимпиадах, когда фигура кривая, а считать надо точно!',
      'Теперь проверь себя: В = 3, Г = 4. Чему равна площадь по формуле Пика? Подставь в формулу: 3 + 4/2 − 1.'
    ],
    check: { q: 'В = 3, Г = 4. Чему равна площадь по формуле Пика?', choices: ['4', '5', '6', '7'], ans: 0,
      exp: '3 + 4/2 − 1 = 3 + 2 − 1 = 4.' },
    tasks: [
      { q: 'В = 5, Г = 4. Площадь?', kind: 'unit', ans: 6, tol: 0,
        hints: ['5 + 2 − 1.', '6.'], sol: '6' },
      { q: 'Что обозначает В в формуле Пика?', kind: 'choice', choices: ['узлы сетки внутри фигуры', 'узлы на границе', 'клетки внутри', 'стороны фигуры'], ans: 0, tol: 0,
        hints: ['В — внутри (внутренние).', 'Внутренние узлы.'], sol: 'узлы внутри' }
    ]
  };
  const pickFig=(shape)=>`<svg viewBox="0 0 200 160" style="width:220px;height:176px;background:#eef3e2;border-radius:10px">
    ${(()=>{ let g=''; for(let i=0;i<=9;i++){ g+=`<line x1="${10+i*18}" y1="8" x2="${10+i*18}" y2="152" stroke="#c9d4b8" stroke-width="1"/>`; g+=`<line x1="8" y1="${10+i*18}" x2="182" y2="${10+i*18}" stroke="#c9d4b8" stroke-width="1"/>`; } return g; })()}
    ${shape==='hex'?`<polygon points="64,28 118,28 146,82 118,136 64,136 36,82" fill="rgba(127,209,255,.22)" stroke="#2f6f9f" stroke-width="2.5"/>`:
      shape==='tri'?`<polygon points="46,118 100,46 154,118" fill="rgba(143,209,168,.25)" stroke="#2f7a4a" stroke-width="2.5"/>`:''}
  </svg>`;
  function visB393(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Площадь на клетчатой бумаге</div>
        <div style="font-size:50px" class="wv-swing">📏</div>
        <div class="wv-sml" style="max-width:330px">фигура с вершинами в узлах сетки — как найти площадь? Формула Пика считает по точкам!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Узлы: В и Г</div>
        ${pickFig('hex')}
        <div class="wv-row" style="gap:8px">
          <span class="wv-chip" style="border-color:#2f6f9f;color:#7fd1ff">В — внутри</span>
          <span class="wv-chip" style="border-color:#2f7a4a;color:#8fd1a8">Г — на границе</span>
        </div>
        <div class="wv-sml">узлы = точки пересечения линий сетки</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем В и Г</div>
        <div style="display:flex;gap:10px;justify-content:center">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 16px"><b style="font-size:28px;color:#7fd1ff;font-family:Georgia,serif">В = 5</b><div style="font-size:11px;color:#9ec0a8">узлов внутри</div></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 16px"><b style="font-size:28px;color:#8fd1a8;font-family:Georgia,serif">Г = 4</b><div style="font-size:11px;color:#9ec0a8">узлов на границе</div></div>
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула Пика</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 16px;font-size:21px;color:#ffd76a;font-weight:bold;font-family:Georgia,serif">S = В + Г/2 − 1</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:330px;width:100%;font-size:16px;color:#e8dcc8;text-align:center;font-family:Georgia,serif">
          <div class="wv-pop">5 + 4/2 − 1</div>
          <div class="wv-pop2">= 5 + 2 − 1 = <b style="color:#8fd1a8">6</b></div>
        </div>
        <div class="wv-sml">площадь 6 клеток — проверь подсчётом!</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Почему −1?</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:8px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8;line-height:1.6">граничные узлы дают «половинки», внутренние — целые клетки. Учёный Пик доказал: для фигуры без дырок получается ровно <b style="color:#ffd76a">минус одна клетка</b> — формула работает всегда!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Пример: В = 3, Г = 4</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S = 3 + 4/2 − 1 = 3 + 2 − 1 = <b style="color:#8fd1a8" class="wv-ans">4</b></div>
        <div class="wv-sml">нарисуй такую фигуру и проверь клетками!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Особый случай: В = 0</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S = 0 + 4/2 − 1 = <b style="color:#8fd1a8">1</b></div>
        <div class="wv-sml">треугольник без внутренних узлов — площадь 1</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#7fd1ff;font-family:Georgia,serif">В</b><div style="font-size:10.5px;color:#9ec0a8">узлы внутри</div></div>
          <div style="text-align:center;background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#8fd1a8;font-family:Georgia,serif">Г</b><div style="font-size:10.5px;color:#9ec0a8">узлы на границе</div></div>
          <div style="text-align:center;background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 14px"><b style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">S=В+Г/2−1</b><div style="font-size:10.5px;color:#cbb89a">формула Пика</div></div>
        </div>
        <div class="wv-sml">спасает на олимпиадах при «кривых» фигурах!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">В = 3, Г = 4 → S = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">3 + 2 − 1 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[393]=visB393;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===393){ window.ARH_LESSONS[i]=L393; break; } } })();
})();
/* ================= УРОК 394 · Делимость и десятичная запись ================= */
(function(){
  const L394 = {
    id: 394, title: 'Делимость и десятичная запись', ico: '🔢',
    src: 'Математика · 5–6 класс · Делимость', subj: 'math',
    explain: [
      'Архимед рассматривает число 124 и хочет узнать, делится ли оно на 4. Делить не обязательно — есть признак по последним двум цифрам! Сегодня изучим признаки делимости по записи числа.',
      'Признак делимости на 4: число делится на 4, если делятся его ПОСЛЕДНИЕ ДВЕ ЦИФРЫ. У числа 124 последние две цифры — 24, а 24 делится на 4 (24 : 4 = 6). Значит, и 124 делится на 4! Проверь: 124 : 4 = 31.',
      'Почему так? Ведь 100 делится на 4 (100 : 4 = 25). Любое число — это «сотни + последние две цифры». Сотни всегда делятся на 4, остаются только последние две цифры. Вот и весь секрет!',
      'Признак на 2 и на 5: смотрим на ПОСЛЕДНЮЮ цифру. На 2 делятся числа, кончающиеся на 0, 2, 4, 6, 8. На 5 — кончающиеся на 0 или 5. На 10 — только на 0.',
      'Признак на 3 и на 9: складываем ВСЕ цифры. Если сумма делится на 3 — число делится на 3. Если на 9 — делится на 9. Помнишь этот признак из урока про делимость?',
      'Теперь про НОК — наименьшее общее кратное. НОК(6, 8) — самое маленькое число, которое делится и на 6, и на 8. Перебираем кратные 8: 8, 16, 24… 24 делится на 6! Значит, НОК(6, 8) = 24.',
      'Как найти НОК перебором? Выписывай кратные большего числа (8, 16, 24…) и проверяй, делятся ли они на меньшее (6). Первое подходящее и есть НОК. Для 6 и 8: 8 нет, 16 нет, 24 — да!',
      'Проверим наименьшее двузначное число, кратное 7: 7·1 = 7 (однозначное), 7·2 = 14 — двузначное! Значит, ответ 14. Кратные 7: 7, 14, 21, 28…',
      'Теперь проверь себя: чему равно НОК(6, 8)? Вспомни: кратные 8 — 8, 16, 24… Какое первое делится на 6?'
    ],
    check: { q: 'Чему равно НОК(6, 8)?', choices: ['24', '48', '12', '16'], ans: 0,
      exp: '24 делится и на 6, и на 8 — самое маленькое такое.' },
    tasks: [
      { q: 'Какое наименьшее двузначное число кратно 7?', kind: 'unit', ans: 14, tol: 0,
        hints: ['7 · 2.', '14.'], sol: '14' },
      { q: 'Число делится на 4, если…', kind: 'choice', choices: ['делятся его последние две цифры', 'последняя цифра чётная', 'сумма цифр делится на 4', 'последняя цифра 4'], ans: 0, tol: 0,
        hints: ['Проверяем по последним двум цифрам.', '124 → 24 делится на 4 → 124 делится на 4.'], sol: 'делятся его последние две цифры' }
    ]
  };
  const digitsOf=(num)=>String(num).split('').map((d,i,arr)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:38px;border-radius:8px;background:${i>=arr.length-2?'rgba(127,209,255,.2)':'rgba(255,255,255,.04)'};border:2px solid ${i>=arr.length-2?'#7fd1ff':'#3d5c49'};font-size:19px;color:${i>=arr.length-2?'#7fd1ff':'#e8dcc8'};font-weight:bold;font-family:Georgia,serif">${d}</span>`).join('');
  function visB394(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Делится ли 124 на 4?</div>
        <div style="display:flex;gap:4px;justify-content:center;margin:6px 0">${digitsOf(124)}</div>
        <div class="wv-sml">голубые — последние две цифры: 24</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">24 : 4 = 6 — делится! А само число 124?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Признак на 4</div>
        <div style="background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">число ⋮ 4 ⟺ делятся <b style="color:#7fd1ff">последние две цифры</b></div>
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">124: 24 ⋮ 4 → 124 ⋮ 4 (124:4=31) ✔</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Почему последние две?</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['100 ⋮ 4', '100 : 4 = 25 — сотни делятся всегда!'],
            ['124 = 100 + 24', 'сотни ⋮ 4 + последние 24 ⋮ 4']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i?'#ffd76a':'#7fd1ff'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${i?'#ffd76a':'#7fd1ff'}">${x[0]}</b><span style="max-width:200px;text-align:right;font-size:12.5px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Последняя цифра: 2, 5, 10</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['⋮ 2', 'последняя цифра 0, 2, 4, 6, 8', '#8fd1a8'],
            ['⋮ 5', 'последняя цифра 0 или 5', '#7fd1ff'],
            ['⋮ 10', 'последняя цифра 0', '#e8a0d8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:13px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Сумма цифр: 3 и 9</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['⋮ 3', 'сумма всех цифр ⋮ 3', '#8fd1a8'],
            ['⋮ 9', 'сумма всех цифр ⋮ 9', '#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="font-size:13px">${x[1]}</span></div>`).join('')}
        </div>
        <div class="wv-sml">пример: 258 → 2+5+8=15 ⋮ 3 → 258 ⋮ 3</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">НОК — что это?</div>
        <div style="display:flex;gap:8px;justify-content:center">
          ${[['6','6, 12, 18, 24…'],['8','8, 16, 24…']].map(x=>`<div style="text-align:center;background:rgba(255,255,255,.04);border:2px solid #3d5c49;border-radius:12px;padding:8px 12px"><b style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">${x[0]}</b><div style="font-size:11px;color:#8fa08f">${x[1]}</div></div>`).join('')}
        </div>
        <div class="wv-sml">НОК — самое маленькое число, кратное обоим</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ищем НОК(6, 8)</div>
        <div style="display:flex;flex-direction:column;gap:5px;max-width:330px;width:100%">
          ${[
            ['8', '8 : 6 — нет'],
            ['16', '16 : 6 — нет'],
            ['24', '24 : 6 = 4 — ДА!', true]
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:${x[2]?'rgba(127,209,160,.12)':'rgba(255,255,255,.03)'};border:1px solid #3d5c49;border-left:4px solid ${x[2]?'#4c8a5a':'#3d5c49'};border-radius:9px;padding:7px 12px;font-size:15px;color:#e8dcc8"><b style="color:${x[2]?'#8fd1a8':'#e8dcc8'};font-family:Georgia,serif">кратное ${x[0]}</b><span style="font-size:13px;color:${x[2]?'#8fd1a8':'#8f9a8f'}">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:18px;color:#ffd76a;font-weight:bold" class="wv-ans">НОК(6, 8) = 24</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Кратное 7 — двузначное</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;max-width:340px">
          ${['7','14','21','28'].map((n,i)=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:36px;border-radius:8px;background:${i===1?'rgba(143,209,168,.2)':'rgba(255,255,255,.04)'};border:2px solid ${i===1?'#8fd1a8':'#3d5c49'};font-size:17px;color:${i===1?'#8fd1a8':'#e8dcc8'};font-weight:bold">${n}</span>`).join('')}
        </div>
        <div class="wv-sml">7·1 = 7 (однозначное) · 7·2 = <b style="color:#8fd1a8">14</b> — первое двузначное!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">НОК(6, 8) = ?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? </div>
        <div class="wv-sml">кратные 8: 8, 16, 24…</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[394]=visB394;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===394){ window.ARH_LESSONS[i]=L394; break; } } })();
})();
/* ================= УРОК 395 · Сочетания ================= */
(function(){
  const L395 = {
    id: 395, title: 'Сочетания: начало', ico: '🤝',
    src: 'Математика · 5–6 класс · Сочетания', subj: 'math',
    explain: [
      'Архимед положил на стол 4 фрукта: яблоко, грушу, виноград и вишню. Сколькими способами можно выбрать 2 фрукта? Порядок не важен — «яблоко и груша» это то же самое, что «груша и яблоко». Такие выборы называют сочетаниями.',
      'Сначала перечислим все пары вручную: яблоко-груша (ЯГ), яблоко-виноград (ЯВ), яблоко-вишня (ЯЧ), груша-виноград (ГВ), груша-вишня (ГЧ), виноград-вишня (ВЧ). Всего 6 пар!',
      'Как посчитать без перечисления? Если бы порядок был важен, пар было бы 4 · 3 = 12 (первый фрукт — 4 способа, второй — 3). Но каждая пара посчитана дважды: ЯГ и ГЯ — одно и то же! Поэтому делим на 2: 12 : 2 = 6.',
      'Формула сочетаний: выбрать 2 предмета из n можно n · (n−1) : 2 способами. Для 4 фруктов: 4 · 3 : 2 = 6. Проверь на списке пар — ровно 6!',
      'Выбрать 2 из 5: 5 · 4 : 2 = 10 способов. Представь 5 друзей: каждый пожимает руку каждому. Сколько всего рукопожатий? Каждое рукопожатие — это выбор пары: 5 · 4 : 2 = 10 рукопожатий!',
      'Почему делим на 2? В паре порядок неважен: «А и Б» = «Б и А». При подсчёте 5 · 4 каждая пара встретилась дважды (АБ и БА), поэтому делим пополам.',
      'Рукопожатия — классика: 4 человека жмут друг другу руки. Это выбор 2 из 4: 4 · 3 : 2 = 6 рукопожатий. Проверь: каждый из 4 жмёт руку 3 другим, но каждое рукопожатие считаем один раз.',
      'Запомни: правило произведения (4·3) считает УПОРЯДОЧЕННЫЕ пары, а сочетания (4·3:2) — НЕупорядоченные. Если порядок неважен — дели на 2!',
      'Теперь проверь себя: сколькими способами можно выбрать 2 предмета из 4? Вспомни формулу: 4 · 3 : 2.'
    ],
    check: { q: 'Сколькими способами можно выбрать 2 предмета из 4?', choices: ['6', '12', '4', '8'], ans: 0,
      exp: '4·3:2 = 6.' },
    tasks: [
      { q: 'Сколькими способами выбрать 2 из 5?', kind: 'unit', ans: 10, tol: 0,
        hints: ['5 · 4 : 2.', '10 способов.'], sol: '10' },
      { q: 'Сколько рукопожатий сделают 4 человека (каждый с каждым)?', kind: 'choice', choices: ['6', '4', '8', '12'], ans: 0, tol: 0,
        hints: ['Это выбор 2 из 4.', '4·3:2 = 6 рукопожатий.'], sol: '6' }
    ]
  };
  const fruits=['🍎','🍐','🍇','🍒'];
  function visB395(el){
    const step=LV.step||0;
    const emoRow=()=>`<div class="wv-row" style="gap:6px">${fruits.map((f,i)=>`<span class="wv-pop" style="animation-delay:${i*0.08}s;font-size:36px">${f}</span>`).join('')}</div>`;
    const pairs=[['🍎🍐','ЯГ'],['🍎🍇','ЯВ'],['🍎🍒','ЯЧ'],['🍐🍇','ГВ'],['🍐🍒','ГЧ'],['🍇🍒','ВЧ']];
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Выбираем 2 фрукта из 4</div>
        ${emoRow()}
        <div class="wv-sml" style="max-width:330px">порядок неважен: «яблоко и груша» = «груша и яблоко». Такие выборы — <b style="color:#ffd76a">сочетания</b>!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Все пары вручную</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:330px;width:100%">
          ${pairs.map((p,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:6px 8px;display:flex;align-items:center;gap:6px;justify-content:center;font-size:20px">${p[0]}<span style="font-size:11px;color:#8fa08f">${p[1]}</span></div>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">всего 6 пар!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем умно: 4 · 3 : 2</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['с порядком: 4 · 3 = 12','первый 4 способа, второй 3'],
            ['каждая пара посчитана 2 раза','ЯГ и ГЯ — одно и то же'],
            ['делим: 12 : 2 = 6','вот ответ!']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.15}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${i===2?'#4c8a5a':'#d9a441'};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${i===2?'#8fd1a8':'#9ec0a8'};font-size:12px;max-width:140px;text-align:right">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Формула сочетаний</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:16px;color:#ffd76a;text-align:center;font-weight:bold;font-family:Georgia,serif">выбрать 2 из n = n·(n−1) : 2</div>
        </div>
        <div class="wv-ans" style="font-size:19px;color:#8fd1a8">для 4: 4·3:2 = 6 ✔</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Рукопожатия!</div>
        <div style="font-size:44px" class="wv-swing">🤝</div>
        <div class="wv-sml">5 человек жмут руки друг другу — сколько рукопожатий?</div>
        <div class="wv-ans" style="font-size:20px;color:#ffd76a">5 · 4 : 2 = 10 рукопожатий</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Почему делим на 2?</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:17px;color:#7fd1ff">А → Б</b><div style="font-size:10px;color:#8fa08f">одна пара</div></div>
          <div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid #3d5c49;border-radius:10px;padding:8px 12px"><b style="font-size:17px;color:#8fd1a8">Б → А</b><div style="font-size:10px;color:#8fa08f">та же пара!</div></div>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">5·4 посчитал каждую пару дважды (АБ и БА) → <b style="color:#ffd76a">делим пополам</b></div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">4 человека — 6 рукопожатий</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;max-width:300px;width:100%">
          ${[['1-2','1-3','1-4','2-3','2-4','3-4']].flat().map((p,i)=>`<div class="wv-pop" style="animation-delay:${i*0.08}s;background:rgba(127,209,160,.08);border:1px solid #4c8a5a;border-radius:8px;padding:4px;font-size:13px;color:#8fd1a8;text-align:center">🤝 ${p}</div>`).join('')}
        </div>
        <div class="wv-sml">это выбор 2 из 4 = 4·3:2 = 6</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Запомни разницу</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['4 · 3', 'упорядоченные пары (порядок важен)','#7fd1ff'],
            ['4 · 3 : 2', 'сочетания (порядок не важен)','#8fd1a8']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:14px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span style="max-width:200px;text-align:right;font-size:12px">${x[1]}</span></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${emoRow()}
        <div class="wv-sml">выбрать 2 фрукта из 4 — сколько способов?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">4 · 3 : 2 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[395]=visB395;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===395){ window.ARH_LESSONS[i]=L395; break; } } })();
})();
/* ================= УРОК 396 · Принцип Дирихле ================= */
(function(){
  const L396 = {
    id: 396, title: 'Усиленный принцип Дирихле', ico: '📦',
    src: 'Математика · 5–6 класс · Дирихле', subj: 'math',
    explain: [
      'У Архимеда 100 шаров и 9 коробок. Он раскладывает шары как хочет. Утверждение: в КАКОЙ-ТО коробке обязательно окажется минимум 12 шаров. Почему? Это знаменитый принцип Дирихле!',
      'Простой принцип Дирихле: если 10 кроликов рассадить в 9 клеток, в какой-то клетке окажется минимум 2 кролика. Ведь если бы в каждой было не больше 1, кроликов было бы не больше 9!',
      'Усиленный принцип: если n предметов разложить в k мест, найдётся место минимум с ⌈n/k⌉ предметами (округляем вверх). Для 100 шаров и 9 коробок: 100 : 9 = 11 и остаток 1.',
      'Считаем: 11 шаров в каждой коробке — это 9 · 11 = 99 шаров. У нас 100 шаров! Один лишний шар обязательно попадёт в какую-то коробку → в ней станет 11 + 1 = 12 шаров.',
      'Запишем красиво: 100 = 9 · 11 + 1. Частное 11, остаток 1. Значит, минимум ⌈100/9⌉ = 12 шаров в какой-то коробке. Округлили 11,11… вверх — получили 12!',
      'Проверим максимум: ровно по 11 шаров в 9 коробках — это 99 шаров. Больше 99 шаров без «переполнения» не разложить: сотый шар уже требует коробку с 12!',
      'Другой пример — носки. В ящике носки двух цветов. Сколько носков нужно достать, чтобы ГАРАНТИРОВАННО была пара одного цвета? Достаём 3: даже если первые два разных, третий совпадёт с одним из них!',
      'Запомни формулу: если n предметов в k мест, то где-то ≥ ⌈n/k⌉ предметов. А для «пары из цветов»: цветов 2 → нужно 2 + 1 = 3 предмета. Принцип Дирихле — король задач «докажи, что найдётся»!',
      'Теперь проверь себя: 100 шаров в 9 коробках — сколько шаров минимум в какой-то коробке? Вспомни: 100 = 9·11 + 1 → 11 + 1.'
    ],
    check: { q: '100 шаров разложили в 9 коробок. Сколько шаров минимум в какой-то коробке?', choices: ['12', '11', '10', '13'], ans: 0,
      exp: '100 = 9·11 + 1 → в какой-то коробке ≥ 12.' },
    tasks: [
      { q: 'Сколько шаров максимум можно разложить в 9 коробок поровну (не больше 100)?', kind: 'unit', ans: 99, tol: 0,
        hints: ['9 · 11.', '99 шаров.'], sol: '99' },
      { q: 'Сколько носков нужно взять (2 цвета), чтобы гарантированно достать пару одного цвета?', kind: 'choice', choices: ['3', '2', '4', '1'], ans: 0, tol: 0,
        hints: ['Цветов 2.', '3 носка: два окажутся одного цвета.'], sol: '3' }
    ]
  };
  const ballsRow=(n)=>`<div class="wv-row" style="gap:3px;max-width:340px">${Array.from({length:n},(_,i)=>`<span style="font-size:13px">⚪</span>`).join('')}</div>`;
  function visB396(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">100 шаров, 9 коробок</div>
        <div style="font-size:44px" class="wv-swing">📦</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:7px 12px;max-width:330px;font-size:14px;color:#e8dcc8">докажем: в какой-то коробке точно есть <b style="color:#ffd76a">минимум 12 шаров</b>!</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Простой принцип: кролики</div>
        <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap">${Array.from({length:10},()=>'🐰').join('')}</div>
        <div class="wv-sml">10 кроликов в 9 клетках → где-то 2 кролика!</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">если бы в каждой клетке было ≤ 1, кроликов было бы ≤ 9 — противоречие!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Усиленный принцип</div>
        <div style="background:rgba(127,209,255,.1);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center">n предметов в k мест → где-то ≥ <b style="color:#7fd1ff">⌈n/k⌉</b> (вверх)</div>
        </div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">100 : 9 = 11 и остаток 1</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Один лишний шар</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:340px;width:100%;font-size:14.5px;color:#e8dcc8">
          <div class="wv-pop">9 коробок по 11 = 9 · 11 = <b style="color:#8fd1a8">99 шаров</b></div>
          <div class="wv-pop2" style="color:#ffd76a;font-weight:bold">у нас 100 — один лишний!</div>
          <div class="wv-pop2">лишний попадёт в коробку → там <b style="color:#ffd76a">11 + 1 = 12</b></div>
        </div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Красивая запись</div>
        <div style="font-size:22px;color:#ffd76a;font-family:Georgia,serif">100 = 9 · 11 + 1</div>
        <div class="wv-sml">частное 11, остаток 1 → ⌈100/9⌉ = 12</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:12px;padding:8px 12px;font-size:16px;color:#ffd76a;font-weight:bold" class="wv-ans">где-то минимум 12 шаров!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Проверка максимума</div>
        ${ballsRow(99)}
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">ровно по 11 в 9 коробках = 99 — больше нельзя!</div>
        <div class="wv-sml">сотый шар уже требует коробку с 12</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Носки двух цветов</div>
        <div style="display:flex;gap:6px;justify-content:center;font-size:30px">
          <span>🧦</span><span style="opacity:.5">🧦</span>
        </div>
        <div class="wv-sml">достаём 3 носка: даже если первые два разные, третий совпадёт с одним!</div>
        <div class="wv-ans" style="font-size:18px;color:#8fd1a8">2 цвета → нужно 3 носка</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['n в k мест','где-то ≥ ⌈n/k⌉ предметов','#7fd1ff'],
            ['2 цвета носков','нужно 2+1 = 3','#8fd1a8'],
            ['задачи «докажи, что найдётся»','принцип Дирихле — король!','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;font-size:13.5px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]};max-width:200px;text-align:right">${x[1]}</b></div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-sml">100 шаров в 9 коробках — минимум в какой-то?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:22px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">11 + 1 = ?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[396]=visB396;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===396){ window.ARH_LESSONS[i]=L396; break; } } })();
})();
/* ================= УРОК 397 · Домино и раскраски ================= */
(function(){
  const L397 = {
    id: 397, title: 'Домино и раскраски', ico: '🁫',
    src: 'Математика · 5–6 класс · Раскраски', subj: 'math',
    explain: [
      'Архимед взял шахматную доску 8×8 и плитки-домино размером 1×2. Можно ли замостить доску домино? Конечно — 64 клетки делятся на 2! Но что если убрать две угловые клетки? Вот тут начинается магия!',
      'Сначала раскрасим доску в шахматном порядке: 32 белые и 32 чёрные клетки. Каждая плитка домино накрывает ровно одну белую и одну чёрную клетку — они всегда соседние!',
      'Запомни ключевой факт: любое домино накрывает 1 белую + 1 чёрную клетку. Значит, если белых и чёрных клеток поровну — замостить можно, а если нет — нельзя!',
      'Уберём две УГЛОВЫЕ клетки. Углы шахматной доски одного цвета — обе белые! Белых стало 32 − 2 = 30, а чёрных осталось 32.',
      'Теперь смотри: белых 30, чёрных 32. Но каждое домино накрывает поровну — по одной клетке каждого цвета! Раз цветов не поровну, замостить доску НЕЛЬЗЯ.',
      'Раскраска превратила геометрическую задачу в простой подсчёт. Не нужно перебирать варианты — достаточно сравнить количество клеток разных цветов!',
      'Как это запомнить? Домино = «белая + чёрная» пара. Если цвета не в балансе — задача неразрешима. Этот приём работает в сотнях олимпиадных задач!',
      'Попробуем другой пример: доска 7×7 (49 клеток). Домино накрывает 2 клетки, а 49 нечётно → замостить нельзя! И не нужно рисовать — просто подели 49 на 2.',
      'Теперь проверь себя: с доски 8×8 убрали две белые угловые клетки. Сколько стало белых и чёрных? Вспомни: белых было 32, убрали 2.'
    ],
    check: { q: 'С доски 8×8 убрали две белые угловые клетки. Сколько белых и чёрных клеток осталось?', choices: ['30 белых, 32 чёрных', '32 белых, 30 чёрных', '31 и 31', '30 и 30'], ans: 0,
      exp: '32−2 = 30 белых, чёрных 32.' },
    tasks: [
      { q: 'Сколько клеток накрывает одно домино?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Домино — прямоугольник 1×2.', '2 клетки.'], sol: '2' },
      { q: 'Можно ли покрыть домино доску, где белых 30, а чёрных 32?', kind: 'choice', choices: ['нет', 'да', 'да, если повернуть', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Домино накрывает поровну.', 'Клеток разное число → нельзя.'], sol: 'нет' }
    ]
  };
  const board8=(cutCorners)=>`<svg viewBox="0 0 200 200" style="width:200px;height:200px">
    ${(()=>{ let out=''; for(let r=0;r<8;r++) for(let c=0;c<8;c++){
      const isCorner=(r===0&&c===0)||(r===0&&c===7)||(r===7&&c===0)||(r===7&&c===7);
      const cut=cutCorners&&isCorner;
      const col = ((r+c)%2===0) ? '#efe9d0' : '#3f4a42';
      out+=`<rect x="${5+c*24}" y="${5+r*24}" width="24" height="24" fill="${cut?'rgba(232,106,90,.25)':col}" stroke="#0f1a24" stroke-width="1"/>`;
      if(cut) out+=`<text x="${5+c*24+12}" y="${5+r*24+16}" text-anchor="middle" font-size="10" fill="#ff9a8a">✂</text>`;
    } return out; })()}
  </svg>`;
  function visB397(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Доска 8×8 и домино</div>
        <div style="font-size:44px" class="wv-swing">🁫</div>
        <div class="wv-sml" style="max-width:330px">замостить доску домино 1×2 — легко: 64 : 2 = 32 плитки. А если убрать две угловые клетки?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Раскрашиваем в шахматном порядке</div>
        ${board8(false)}
        <div class="wv-ans" style="font-size:16px;color:#8fd1a8">32 белых + 32 чёрных</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Домино = белая + чёрная</div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="display:inline-block;width:36px;height:36px;background:#efe9d0;border:1px solid #3f4a42"></span>
          <span style="display:inline-block;width:36px;height:36px;background:#3f4a42;border:1px solid #0f1a24"></span>
          <span style="font-size:13px;color:#8fd1a8;max-width:150px;text-align:left">одна плитка = 1 белая + 1 чёрная</span>
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">цветов поровну → можно · не поровну → <b style="color:#ff9a8a">нельзя!</b></div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Убираем два угла</div>
        ${board8(true)}
        <div class="wv-sml">углы одного цвета — оба белые!</div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">белых: 32 − 2 = 30 · чёрных: 32</div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">30 ≠ 32 → нельзя!</div>
        <div style="display:flex;gap:12px;justify-content:center">
          <div style="text-align:center;background:rgba(239,233,208,.1);border:2px solid #efe9d0;border-radius:12px;padding:8px 16px"><b style="font-size:26px;color:#efe9d0;font-family:Georgia,serif">30</b><div style="font-size:11px;color:#9ec0a8">белых</div></div>
          <div style="text-align:center;background:rgba(63,74,66,.4);border:2px solid #3f4a42;border-radius:12px;padding:8px 16px"><b style="font-size:26px;color:#cfe0cf;font-family:Georgia,serif">32</b><div style="font-size:11px;color:#9ec0a8">чёрных</div></div>
        </div>
        <div style="background:rgba(232,106,90,.12);border:2px solid rgba(232,106,90,.5);border-radius:12px;padding:8px 12px;font-size:15px;color:#ffcfc2;font-weight:bold" class="wv-ans">каждое домино берёт поровну → замостить НЕЛЬЗЯ!</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Раскраска = простой подсчёт</div>
        <div style="background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15px;color:#e8dcc8;text-align:center;line-height:1.5">раскраска превращает геометрию в <b style="color:#7fd1ff">сравнение количеств цветов</b></div>
        </div>
        <div class="wv-sml">не перебирай варианты — просто сравни клетки!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Ещё пример: 7×7</div>
        <div style="display:grid;grid-template-columns:repeat(7,20px);gap:2px;justify-content:center;background:#101f18;padding:8px;border-radius:10px">
          ${Array.from({length:49},(_,i)=>`<span style="width:20px;height:20px;background:${i%2?'#3f4a42':'#efe9d0'};border-radius:2px"></span>`).join('')}
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">49 клеток — нечётно! 49 : 2 не делится → нельзя!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:330px;width:100%">
          ${[
            ['1️⃣','раскрась доску (шахматно)','#7fd1ff'],
            ['2️⃣','посчитай клетки каждого цвета','#8fd1a8'],
            ['3️⃣','домино берёт поровну → сравни!','#ffd76a']
          ].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.12}s;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:9px;padding:7px 12px;text-align:left;font-size:14px;color:#e8dcc8"><span>${x[0]}</span>${x[1]}</div>`).join('')}
        </div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        ${board8(true)}
        <div class="wv-sml">убрали 2 белых угла: сколько белых и чёрных?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 14px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">? белых · ? чёрных</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[397]=visB397;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===397){ window.ARH_LESSONS[i]=L397; break; } } })();
})();
/* ================= УРОК 398 · Полуинварианты ================= */
(function(){
  const L398 = {
    id: 398, title: 'Полуинварианты: процессы', ico: '♻️',
    src: 'Математика · 5–6 класс · Полуинварианты', subj: 'math',
    explain: [
      'На доске записаны числа 1, 2, 3, 4. Каждый ход стирают два числа a и b и записывают вместо них их разность a − b. Так делают, пока не останется одно число. Можно ли заранее узнать, каким оно будет — чётным или нечётным?',
      'Попробуем на примере. Возьмём 1 и 2: 1 − 2 = −1. Числа стали: −1, 3, 4. Теперь 3 и 4: 3 − 4 = −1. Остались −1, −1. Наконец, −1 − (−1) = 0. Итог: 0 — чётное!',
      'Совпадение? Проверим другим порядком. 1 и 3: 1 − 3 = −2 → −2, 2, 4. Потом 2 и 4: 2 − 4 = −2 → −2, −2. Наконец −2 − (−2) = 0. Опять 0! Похоже, итог всегда одинаковый…',
      'Секрет в том, что при замене a и b на a − b что-то НЕ меняется. Смотрим: сумма a + b и разность a − b имеют ОДИНАКОВУЮ чётность! Ведь a+b и a−b отличаются на 2b — чётное число.',
      'Раз a + b и a − b одной чётности, то замена не меняет ЧЁТНОСТЬ общей суммы всех чисел на доске! Это и есть полуинвариант — величина, которая сохраняется в процессе.',
      'Посчитаем начальную сумму: 1 + 2 + 3 + 4 = 10. Десять — чётное число! Чётность суммы не меняется ни на одном шаге, значит, и финальное единственное число будет чётным.',
      'Проверим наш эксперимент: итог был 0 — чётное! Удивительно: мы не знаем, какие именно числа стирали, но точно знаем чётность ответа. Вот сила полуинварианта!',
      'Запомни приём: в задачах «повторяй операцию, пока не останется одно число» ищи величину, которая сохраняется или меняется предсказуемо. Сумма, разность, чётность, произведение — частые кандидаты!',
      'Теперь проверь себя: из чисел 1, 2, 3, 4 операцией «заменить пару на разность» останется одно число. Каким оно будет по чётности? Вспомни: сумма 10 чётная и сохраняется!'
    ],
    check: { q: 'Стирают a и b, записывают a − b. Что сохраняется?', choices: ['чётность суммы', 'сама сумма', 'число чисел', 'произведение'], ans: 0,
      exp: 'a+b и a−b одной чётности → чётность суммы сохраняется.' },
    tasks: [
      { q: 'Чему равна сумма 1 + 2 + 3 + 4?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Сложи по порядку.', '10.'], sol: '10' },
      { q: 'Из чисел 1, 2, 3, 4 операцией «разность» останется одно число. Каким оно будет по чётности?', kind: 'choice', choices: ['чётным', 'нечётным', 'любым', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Сумма 10 чётна.', 'Чётность сохраняется → итог чётный.'], sol: 'чётным' }
    ]
  };
  const numChip=(n,state)=>{ const col=state==='rem'?'#8f5a50':(state==='new'?'#ffd76a':'#cfe0cf');
    return `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;border-radius:9px;background:rgba(255,255,255,.05);border:2px solid ${col};font-size:18px;color:${col};font-weight:bold;font-family:Georgia,serif;margin:2px">${n}</span>`; };
  function visB398(el){
    const step=LV.step||0;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        <div class="wv-big">Процесс с числами</div>
        <div class="wv-row" style="gap:4px">${[1,2,3,4].map(n=>numChip(n)).join('')}</div>
        <div class="wv-sml" style="max-width:330px">каждый ход: стираем a и b, пишем <b style="color:#ffd76a">a − b</b> — пока не останется одно число</div>
        <div style="background:rgba(217,164,65,.09);border:1px solid #d9a441;border-radius:10px;padding:6px 12px;max-width:320px;font-size:13.5px;color:#e8dcc8">можно ли заранее узнать чётность итога?</div>
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        <div class="wv-big">Пробуем: порядок 1</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          <div class="wv-pop">${numChip(1)} ${numChip(2)} ${numChip(3)} ${numChip(4)}</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">1 − 2 = −1</div>
          <div class="wv-pop2">${numChip(-1,'new')} ${numChip(3)} ${numChip(4)}</div>
          <div class="wv-pop3" style="color:#8fa08f;font-size:13px">3 − 4 = −1</div>
          <div class="wv-pop3">${numChip(-1)} ${numChip(-1,'new')}</div>
          <div class="wv-pop3" style="color:#8fa08f;font-size:13px">−1 − (−1) = 0</div>
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">итог 0 — чётное!</div>
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        <div class="wv-big">Другой порядок</div>
        <div style="display:flex;flex-direction:column;gap:6px;max-width:340px;width:100%">
          <div class="wv-pop">${numChip(1)} ${numChip(3)} → ${numChip(-2,'new')}</div>
          <div class="wv-pop2">${numChip(-2)} ${numChip(2)} ${numChip(4)}</div>
          <div class="wv-pop2" style="color:#8fa08f;font-size:13px">2 − 4 = −2</div>
          <div class="wv-pop3">${numChip(-2)} ${numChip(-2,'new')} → ${numChip(0,'new')}</div>
        </div>
        <div class="wv-ans" style="font-size:17px;color:#8fd1a8">опять 0 — чётное! Не совпадение!</div>
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        <div class="wv-big">Секрет: a+b и a−b</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
          ${[['a + b','разность на 2b меньше'],['a − b','(a+b) − (a−b) = 2b']].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*0.1}s;text-align:center;background:rgba(127,209,255,.08);border:2px solid #7fd1ff;border-radius:12px;padding:8px 12px"><b style="font-size:19px;color:#7fd1ff;font-family:Georgia,serif">${x[0]}</b><div style="font-size:10.5px;color:#9ec0a8;max-width:120px;margin-top:2px">${x[1]}</div></div>`).join('')}
        </div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #d9a441;border-radius:9px;padding:7px 12px;max-width:330px;font-size:13.5px;color:#e8dcc8">числа отличаются на <b style="color:#ffd76a">2b</b> — чётное → <b style="color:#8fd1a8">одной чётности!</b></div>
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        <div class="wv-big">Что сохраняется?</div>
        <div style="background:rgba(143,209,168,.1);border:2px solid #8fd1a8;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:15.5px;color:#e8dcc8;text-align:center;line-height:1.5">замена пары на разность <b style="color:#8fd1a8">не меняет чётность суммы</b> всех чисел!</div>
        </div>
        <div class="wv-sml">это полуинвариант — величина, которая сохраняется в процессе</div>
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        <div class="wv-big">Считаем начальную сумму</div>
        <div style="font-size:24px;color:#ffd76a;font-family:Georgia,serif">1 + 2 + 3 + 4 = <b style="color:#8fd1a8" class="wv-ans">10</b></div>
        <div class="wv-sml">10 — чётное!</div>
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        <div class="wv-big">Вывод</div>
        <div style="background:rgba(217,164,65,.12);border:2px solid #ffd76a;border-radius:14px;padding:10px 14px;max-width:340px;width:100%">
          <div style="font-size:16px;color:#ffd76a;font-weight:bold;text-align:center">сумма чётная и сохраняется → итог чётный!</div>
        </div>
        <div class="wv-sml">мы не знаем, какие числа стирали, но чётность ответа — знаем!</div>
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        <div class="wv-big">Памятка</div>
        <div style="background:rgba(255,255,255,.03);border:1px solid #3d5c49;border-left:4px solid #8fd1a8;border-radius:9px;padding:8px 12px;max-width:330px;font-size:14px;color:#e8dcc8;line-height:1.6">в задачах «повторяй операцию, пока не останется одно» ищи, что <b style="color:#8fd1a8">сохраняется</b>: сумма, чётность, произведение, разность… Это и есть ключ!</div>
      </div>`;
    } else {
      h=`<div class="wv-col">
        <div class="wv-big">Проверь себя</div>
        <div class="wv-row" style="gap:4px">${[1,2,3,4].map(n=>numChip(n)).join('')}</div>
        <div class="wv-sml">сумма = 10 (чётная). Итог будет …?</div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:6px 16px;font-size:20px;color:#ffd76a;font-family:Georgia,serif" class="wv-pulse">чётным или нечётным?</div>
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[398]=visB398;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===398){ window.ARH_LESSONS[i]=L398; break; } } })();
})();
/* ================= УРОК 100 · Плотность ================= */
(function(){
  const L100 = {
    id: 100, title: 'Плотность', ico: '🧊',
    src: 'Физика · 7 класс · Плотность', subj: 'phys',
    explain: [
      'Загадка весов: два кубика одного размера. Один чашу едва качает, другой рвёт вниз. Размер один — масса разная. Что спрятано внутри? Паспорт вещества — плотность.',
      'Плотность говорит, сколько вещества уместилось в одном кубике объёма. В 1 см³ дерева около 0,7 г, в 1 см³ железа — 7,8 г. Не «тяжелее потому что больше», а «гуще упаковано».',
      'Обозначают ρ. Формула: ρ = m / V. Масса на объём. В задачнике — г/см³. Вода: 1 г/см³ = 1000 кг/м³. Числа разные, вещество одно.',
      'Счёт из лаборатории: m = 6 г, V = 3 см³ → ρ = 2 г/см³. Делишь массу на объём. Если перевернёшь — получится 0,5, чужой ответ.',
      'Треугольник: m наверху, внизу ρ и V. Закрой неизвестное. Видны ρ и V — умножай. Видны m и ρ — дели, получишь объём.',
      'Найти массу: ρ = 2, V = 5 → m = 10 г. Найти объём: m = 10, ρ = 2 → V = 5. Пять кубиков по 2 г.',
      'Таблица (г/см³): пробка 0,25 · лёд 0,9 · вода 1 · стекло 2,5 · железо 7,8 · золото 19,3. Вода — линейка.',
      'Предскажи: лёд в воде. ρ = 0,9 < 1 — должен плавать, часть над водой. Симуляция считает долю погружения: ρ / ρ_воды.',
      'Ползунок плотности: чем ближе к 1, тем глубже сидит. График из расчёта: доля погружения растёт линейно, пока ρ < 1, потом тело на дне.',
      'Железо 7,8 > 1 — сплошной кубик тонет. Корабль из стали плавает, потому что средняя плотность (сталь + воздух) меньше 1.',
      'Добавь воздух: объём растёт, масса почти та же, среднее ρ падает. Это и есть корпус корабля.',
      '1 см³ воды — 1 г. 1 см³ золота — 19,3 г. Поддельный слиток того же размера легче — весы выдают обман.',
      'Однородное тело: плотность везде одна. Корабль, пористый камень — средняя. Формула та же.',
      'Плавает, если среднее ρ меньше жидкости. Тонет, если больше. Висит, если равны.',
      'Рецепт. 1) ρ, m или V. 2) Треугольник. 3) Единицы не мешай. 4) Для плавания сравни с водой. 5) Для полого — средний объём.',
      'Проверка: 6 г и 3 см³ → 2 г/см³. Не 0,5 и не 18.'
    ],
    check: { q: 'Масса тела 6 г, объём 3 см³. Какова плотность? (в г/см³)', choices: ['0,5', '2', '18'], ans: 1,
      exp: 'ρ = m / V = 6 / 3 = 2 г/см³.' },
    tasks: [
      { q: 'Тело объёмом 3 см³ имеет массу 15 г. Плотность? (в г/см³)', kind: 'unit', ans: 5, tol: 0,
        hints: ['ρ = m / V.', '15 / 3 = ?'], sol: '5 г/см³' },
      { q: 'Плотность вещества 4 г/см³, объём 5 см³. Найди массу. (в г)', kind: 'choice',
        choices: ['20', '1,25', '5'], ans: 0, hints: ['m = ρ · V.', '4 · 5 = ?'], sol: '20 г' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const P=()=>window.PHYS||{density:(m,V)=>({rho:m/V,floats:m/V<1,sinks:m/V>1}),floatState:(r,l)=>({frac:r>=(l||1)?1:r/(l||1),sink:r>=(l||1),note:r>=(l||1)?'тонет':(r<(l||1)?'плавает':'висит')}),T:{density:{frac:[[0.2,0.2,0],[0.9,0.9,0],[1,1,0],[1.6,1,1]]}}};
  const CSS=`<style>
    @keyframes d4rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes d4drop{0%{transform:translateY(-40px);opacity:0}72%{transform:translateY(5px)}100%{transform:translateY(0);opacity:1}}
    @keyframes d4bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes d4draw{to{stroke-dashoffset:0}}
    @keyframes d4pack{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
    @keyframes d4wave{0%{d:path('M 78 94 Q 110 88 140 94 T 202 94')}50%{d:path('M 78 94 Q 110 100 140 94 T 202 94')}100%{d:path('M 78 94 Q 110 88 140 94 T 202 94')}}
    @keyframes d4dust{0%{opacity:.15;transform:translateY(0)}100%{opacity:0;transform:translateY(-24px)}}
    .d4f{transform-origin:50% 100%;transform-box:fill-box;animation:d4rise .95s cubic-bezier(.2,.85,.2,1) both}
    .d4drop{transform-box:fill-box;transform-origin:center;animation:d4drop .8s cubic-bezier(.2,1.15,.25,1) both}
    .d4bob{animation:d4bob 2.4s ease-in-out infinite}
    .d4line{stroke-dasharray:280;stroke-dashoffset:280;animation:d4draw 1.05s ease forwards}
    .d4pack{transform-box:fill-box;transform-origin:center;animation:d4pack 1.5s ease-in-out infinite}
    .d4lab{paint-order:stroke fill;stroke:#140c08;stroke-width:3.6px;stroke-linejoin:round}
  </style>`;
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(12,Math.min(228,+x)), yy=Math.max(14,Math.min(212,+y));
    return `<text class="d4lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-d4v1', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,340px);height:auto;background:#0b1418;border-radius:16px;display:block;margin:0 auto;overflow:visible;pointer-events:auto">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function defs(){
    return `<defs>
      <linearGradient id="d4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1c12"/><stop offset=".45" stop-color="#1a140e"/><stop offset="1" stop-color="#0a0806"/></linearGradient>
      <radialGradient id="d4lamp" cx="50%" cy="8%" r="70%"><stop offset="0" stop-color="#ffd18a" stop-opacity=".35"/><stop offset="1" stop-color="#0a0806" stop-opacity="0"/></radialGradient>
      <linearGradient id="d4woodT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6ddb0"/><stop offset="1" stop-color="#c89658"/></linearGradient>
      <linearGradient id="d4woodL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c48a44"/><stop offset="1" stop-color="#7a4a22"/></linearGradient>
      <linearGradient id="d4woodR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a06832"/><stop offset="1" stop-color="#5a3014"/></linearGradient>
      <linearGradient id="d4ironT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2f6fa"/><stop offset="1" stop-color="#9aafbc"/></linearGradient>
      <linearGradient id="d4ironL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9eac"/><stop offset="1" stop-color="#3a4c58"/></linearGradient>
      <linearGradient id="d4ironR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a8090"/><stop offset="1" stop-color="#243038"/></linearGradient>
      <linearGradient id="d4iceT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b8dcee"/></linearGradient>
      <linearGradient id="d4w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ad8ff" stop-opacity=".55"/><stop offset="1" stop-color="#123a58" stop-opacity=".96"/></linearGradient>
      <linearGradient id="d4desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4020"/><stop offset="1" stop-color="#2a160c"/></linearGradient>
      <filter id="d4soft"><feGaussianBlur stdDeviation="1.1"/></filter>
    </defs>`;
  }
  function desk(){
    return `<rect width="240" height="220" fill="url(#d4sky)"/>
      <ellipse cx="120" cy="18" rx="110" ry="40" fill="url(#d4lamp)"/>
      <path d="M 8 178 L 232 178 L 218 206 L 22 206 Z" fill="url(#d4desk)"/>
      <path d="M 14 180 L 226 180" stroke="#c49658" stroke-width="1.6" opacity=".55"/>
      <path d="M 48 178 L 58 206" stroke="#1a0c06" opacity=".35"/>
      <path d="M 120 178 L 128 206" stroke="#1a0c06" opacity=".28"/>
      <path d="M 186 178 L 194 206" stroke="#1a0c06" opacity=".3"/>
      <circle class="d4drop" cx="36" cy="70" r="1.2" fill="#ffd18a" opacity=".35"/>
      <circle cx="200" cy="54" r="1" fill="#ffd18a" opacity=".25"/>`;
  }
  function isoCube(ox,oy,s,kind,n){
    const hx=s*0.82, hy=s*0.46, h=s*0.9;
    const T={wood:'url(#d4woodT)',iron:'url(#d4ironT)',ice:'url(#d4iceT)',gold:'#ffe08a'}[kind]||'#ccc';
    const L={wood:'url(#d4woodL)',iron:'url(#d4ironL)',ice:'#8eb8d0',gold:'#d4a43a'}[kind];
    const R={wood:'url(#d4woodR)',iron:'url(#d4ironR)',ice:'#5a88a4',gold:'#a06e16'}[kind];
    let extra='';
    if(kind==='wood'){
      extra=`<path d="M ${ox+5} ${oy+h*.28} l ${hx-8} ${hy-3}" stroke="#5a3014" stroke-width="1.1" fill="none" opacity=".55"/>
        <path d="M ${ox+7} ${oy+h*.52} l ${hx-10} ${hy-4}" stroke="#5a3014" stroke-width="1" fill="none" opacity=".4"/>
        <ellipse cx="${ox+hx*.42}" cy="${oy+h*.58}" rx="4.2" ry="2.8" fill="#4a2410" opacity=".5"/>`;
    } else if(kind==='iron'){
      extra=`<path d="M ${ox+hx*1.05} ${oy+hy-8} l ${hx*.55} ${-hy*.45}" stroke="#fff" stroke-width="1.5" opacity=".4" fill="none"/>
        <circle cx="${ox+hx*.38}" cy="${oy+h*.38}" r="2.1" fill="#e8f0f6" opacity=".7"/>
        <circle cx="${ox+hx*1.42}" cy="${oy+hy+h*.22}" r="2.1" fill="#c8d4de" opacity=".45"/>`;
    } else if(kind==='ice'){
      extra=`<path d="M ${ox+hx*.35} ${oy-1} l 7 16 l -11 5" stroke="#fff" stroke-width="1.3" fill="none" opacity=".75"/>
        <path d="M ${ox+hx*1.25} ${oy+2} l 5 20" stroke="#fff" stroke-width="1" opacity=".5" fill="none"/>`;
    }
    let mol='';
    for(let i=0;i<(n||0);i++){
      const u=(i%4)/3, v=Math.floor(i/4)/4;
      mol+=`<circle class="d4pack" cx="${(ox+hx*.28+u*hx*1.12).toFixed(1)}" cy="${(oy+hy*.18+v*h).toFixed(1)}" r="2.1" fill="${GOLD}" style="animation-delay:${i*.07}s"/>`;
    }
    return `<g class="d4drop">
      <path d="M ${ox} ${oy} l ${hx} ${-hy} l ${hx} ${hy} l ${-hx} ${hy} Z" fill="${T}" stroke="#1a1008" stroke-width="1.05"/>
      <path d="M ${ox} ${oy} l ${hx} ${hy} l 0 ${h} l ${-hx} ${-hy} Z" fill="${L}" stroke="#1a1008" stroke-width="1.05"/>
      <path d="M ${ox+hx} ${oy+hy} l ${hx} ${-hy} l 0 ${h} l ${-hx} ${hy} Z" fill="${R}" stroke="#1a1008" stroke-width="1.05"/>
      ${extra}${mol}</g>`;
  }
  function scale(tilt){
    const a=tilt*16;
    return `${desk()}
      <polygon points="120,132 106,156 134,156" fill="#c4a060" stroke="#2a1808"/>
      <rect x="114" y="108" width="12" height="26" rx="2" fill="#e0c080" stroke="#5a3a14"/>
      <g transform="rotate(${a} 120 112)">
        <rect x="38" y="107" width="164" height="10" rx="4" fill="#edd6a0" stroke="#6a4418"/>
        <circle cx="46" cy="112" r="4.5" fill="#8a6230"/>
        <circle cx="194" cy="112" r="4.5" fill="#8a6230"/>
        <line x1="50" y1="117" x2="50" y2="138" stroke="#c9b07a" stroke-width="1.6"/>
        <line x1="46" y1="117" x2="46" y2="138" stroke="#c9b07a" stroke-width="1.2"/>
        <line x1="54" y1="117" x2="54" y2="138" stroke="#c9b07a" stroke-width="1.2"/>
        <line x1="190" y1="117" x2="190" y2="138" stroke="#c9b07a" stroke-width="1.6"/>
        <line x1="186" y1="117" x2="186" y2="138" stroke="#c9b07a" stroke-width="1.2"/>
        <line x1="194" y1="117" x2="194" y2="138" stroke="#c9b07a" stroke-width="1.2"/>
        <ellipse cx="50" cy="142" rx="24" ry="5.5" fill="#b89050" stroke="#5a3a14"/>
        <ellipse cx="190" cy="142" rx="24" ry="5.5" fill="#b89050" stroke="#5a3a14"/>
        ${isoCube(28, 118, 24, 'wood', 0)}
        ${isoCube(168, 118, 24, 'iron', 0)}
      </g>`;
  }
  function plot(pts, hx, hy, xl, yl){
    const ox=36, oy=28, W=168, H=140;
    const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
    const x0=Math.min(...xs), x1=Math.max(...xs)||1;
    const y0=0, y1=Math.max(...ys, 1);
    const xy=(x,y)=>[ox+(x-x0)/(x1-x0)*W, oy+H-(y-y0)/(y1-y0)*H];
    const d=pts.map((p,i)=>{const q=xy(p[0],p[1]); return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
    let mark='';
    if(hx!=null){ const q=xy(hx, hy==null?pts.reduce((a,p)=>Math.abs(p[0]-hx)<Math.abs(a[0]-hx)?p:a,[99,0])[1]:hy); mark=`<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="${GOLD}"/><circle cx="${q[0]}" cy="${q[1]}" r="9" fill="none" stroke="${GOLD}" opacity=".4"/>`; }
    return `<g>
      <rect x="0" y="0" width="240" height="220" fill="url(#d4sky)"/>
      <rect x="${ox-8}" y="${oy-8}" width="${W+28}" height="${H+28}" rx="10" fill="#0c1418" opacity=".55"/>
      <line x1="${ox}" y1="${oy+H}" x2="${ox+W}" y2="${oy+H}" stroke="#4a6a58"/>
      <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+H}" stroke="#4a6a58"/>
      <path class="d4line" d="${d}" fill="none" stroke="${BLUE}" stroke-width="2.8"/>
      ${mark}
      ${lab(ox+W/2, 214, xl, MUTED,'middle',11)}
      ${lab(18, oy+H/2, yl, MUTED,'middle',11)}
    </g>`;
  }
  function tank(rho, kind){
    const st=P().floatState(rho,1);
    const surf=92, bot=188, H=26;
    const y = st.sink ? bot-H-6 : surf-(1-st.frac)*H;
    const k=kind|| (st.sink?'iron':'ice');
    return `${desk().replace('178','208')}
      <rect x="70" y="58" width="100" height="138" rx="6" fill="#0a2030" stroke="#8ec8e0" stroke-width="3"/>
      <rect x="73" y="61" width="8" height="132" rx="2" fill="#fff" opacity=".12"/>
      <rect class="d4f" x="74" y="${surf}" width="92" height="${bot-surf}" fill="url(#d4w)"/>
      <path d="M 74 ${surf} Q 96 ${surf-6} 120 ${surf} T 166 ${surf}" fill="none" stroke="#e8f8ff" stroke-width="1.8" opacity=".7"/>
      <ellipse cx="120" cy="186" rx="40" ry="6" fill="#3a2a18" opacity=".55"/>
      <g class="${st.sink?'d4drop':'d4bob'}">${isoCube(96, y-6, 22, k, 0)}</g>
      ${lab(120, 24, 'ρ = '+String(rho).replace('.',',')+(st.sink?' · на дне':' · '+Math.round(st.frac*100)+'% в воде'), GOLD, 'middle', 12)}`;
  }
  function pred(st, key, q, opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }

  function visB100(el){
    try{ window._waveCss && _waveCss('css-d4v1', CSS); }catch(e){}
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'100';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const rho=Math.max(0.2, Math.min(1.8, +(st.rho==null?0.7:st.rho)));
    const m=+(st.m==null?6:st.m), V=+(st.V==null?3:st.V);
    const D=P().density(m,V);
    let h='';

    if(step===0){
      const tilt=st.p0==='iron'||st.p0==='wood';
      h=`<div class="wv-col">
        ${physShot(tilt?'scale_tilt.mp4':'scale_empty.mp4', tilt?'железо рвёт чашу вниз':'положи кубики на весы')}
        ${pred(st,'p0','Одинаковый размер. Кто сорвёт чашу весов?',[{k:'wood',t:'дерево'},{k:'iron',t:'железо'},{k:'same',t:'одинаково'}])}
        ${st.p0?note('После выбора','Одинаковый объём, разная масса. Железо гуще упаковано — весы наклоняются.'):note('Сначала предскажи','Сначала карточка, потом смотри весы. Как в настоящей лаборатории.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('cubes.mp4','объём один · масса разная')}
        ${note('Не размер','Кубики одного размера. Масса разная. Дело не в «больше-меньше», а в том, сколько вещества в одном кубике.')}
      </div>`;
    } else if(step===2){
      const pack=st.pack||'iron';
      h=`<div class="wv-col">
        ${physShot(pack==='wood'?'wood_cut.mp4':'iron_cut.mp4', pack==='wood'?'дерево · внутри воздух':'железо · частицы густо')}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['wood','разрезать дерево'],['iron','разрезать железо']].map(x=>`<button type="button" class="btn" style="border-color:${pack===x[0]?GOLD:'#3d5c49'}" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].pack='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Невидимое','Разрезали куб. В дереве воздух и редкие волокна. В железе зёрна металла стоят плотно. Гуще упаковка — больше масса при том же объёме. Это и есть плотность.')}
      </div>`;
    } else if(step===3){
      const d=P().density(6,3);
      h=`<div class="wv-col">
        ${physShot('lab.jpg','ρ = m / V  ·  6 / 3 = '+d.rho)}
        ${note('Лаборатория посчитала','Гири и стакан — масса и объём. Делишь массу на объём: 6 г и 3 см³ → 2. Перевернёшь дробь — 0,5, чужой ответ.')}
      </div>`;
    } else if(step===4){
      const hid=st.hid||'';
      const map={m:'m = ρ · V', rho:'ρ = m / V', V:'V = m / ρ'};
      h=`<div class="wv-col">
        ${physShot('tri.jpg', hid?map[hid]:'закрой неизвестное')}
        ${frame(defs()+`<polygon points="120,44 48,164 192,164" fill="${GOLD}18" stroke="${GOLD}" stroke-width="2"/>`+
          lab(120,76,hid==='m'?'?':'m', hid==='m'?RED:GOLD,'middle',22)+
          lab(72,154,hid==='rho'?'?':'ρ', hid==='rho'?RED:BLUE,'middle',20)+
          lab(168,154,hid==='V'?'?':'V', hid==='V'?RED:GREEN,'middle',20)+
          lab(120,208,hid?map[hid]:'m наверху', GOLD,'middle',12))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['m','закрыть m'],['rho','закрыть ρ'],['V','закрыть V']].map(x=>`<button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].hid='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Треугольник','m наверху. Ищешь плотность — дели массу на объём. Ищешь массу — умножай.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('lab.jpg','m = '+m+' г  ·  V = '+V+' см³  ·  ρ = '+String(D.rho).replace('.',','))}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">m
          <input type="range" min="1" max="20" value="${m}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].m=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${m} г</b>
        </label>
        ${note('Одна ручка','Меняй только массу. Объём заморожен. Плотность считает та же модель, что и лабораторный скрипт.')}
      </div>`;
    } else if(step===6){
      const tab=(P().T&&P().T.density&&P().T.density.table)||[['лёд',0.9],['вода',1],['железо',7.8]];
      h=`<div class="wv-col">
        ${physShot('samples.jpg','пробка · лёд · вода · стекло · железо · золото')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${tab.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.06}s;display:flex;justify-content:space-between;border:1px solid #3d5c49;border-left:4px solid ${+x[1]<1?GREEN:+x[1]===1?BLUE:GOLD};border-radius:10px;padding:7px 12px;color:#e8dcc8"><span>${x[0]}</span><b>${String(x[1]).replace('.',',')} г/см³</b></div>`).join('')}
        </div>
        ${note('Вода — линейка','Меньше 1 — в воде всплывает. Больше 1 — тонет, если сплошное.')}
      </div>`;
    } else if(step===7){
      const show=st.p7&&st.go7;
      h=`<div class="wv-col">
        ${physShot(show?'ice.mp4':'ice.jpg', show?'лёд: ~90% в воде':'кубик льда · брось в бак')}
        ${pred(st,'p7','Лёд в воде. Что сделает?',[{k:'float',t:'всплывёт'},{k:'sink',t:'утонет'},{k:'hang',t:'повиснет'}])}
        ${st.p7?`<button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].go7=1;chRender(0);}catch(e){}">Бросить в бак</button>`:''}
        ${show?note('Расчёт','ρ = 0,9. Доля погружения = 0,9 / 1 = 90%. Верх торчит. Ты '+(st.p7==='float'?'угадал':'думал иначе — смотри бак')):note('Предскажи до опыта','Не смотри ответ глазами. Сначала жми карточку.')}
      </div>`;
    } else if(step===8){
      const pts=((P().T&&P().T.density&&P().T.density.frac)||[]).map(p=>[p[0], p[1]]);
      const fs=P().floatState(rho,1);
      const clip=rho<0.4?'cork.jpg':rho<1?'ice.mp4':'iron.mp4';
      const cap=fs.sink?'ρ = '+String(rho).replace('.',',')+' · на дне':'ρ = '+String(rho).replace('.',',')+' · '+Math.round(fs.frac*100)+'% в воде';
      h=`<div class="wv-col">
        ${physShot(clip, cap)}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">ρ
          <input type="range" min="20" max="180" value="${Math.round(rho*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].rho=this.value/100;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(rho).replace('.',',')}</b>
        </label>
        ${frame(plot(pts, rho, fs.frac, 'ρ', 'доля'))}
        ${note('График из модели','Пока ρ < 1, доля = ρ. После 1 линия упирается в 1: тело на дне. Одна ручка — плотность.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('iron.mp4','железо 7,8 · на дне')}
        ${pred(st,'p9','Сплошное железо в воде?',[{k:'sink',t:'тонет'},{k:'float',t:'плывёт'}])}
        ${st.p9?note('Почему корабль тогда плывёт','Сплошной кубик тонет. Корабль не сплошной: внутри воздух, среднее ρ < 1.'):note('Предскажи','Сплошной куб и корабль — не одно и то же.')}
      </div>`;
    } else if(step===10){
      const air=!!st.air;
      h=`<div class="wv-col">
        ${physShot(air?'boat.mp4':'iron.mp4', air?'среднее ρ = 0,6 · плывёт':'сталь без воздуха · тонет')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].air=1;chRender(0);}catch(e){}">${air?'Плывёт':'Добавить воздух'}</button>
        ${note('Средняя плотность','Масса почти та же, объём вырос. ρ = m / V_всего. Упало ниже воды — корпус всплыл.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('gold.mp4','вода 1 г · золото 19,3 г · один кубик')}
        ${physShot('fake.jpg','настоящее золото тяжелее подделки')}
        ${note('Одинаковый объём','Золото в двадцать раз гуще воды. Медный слиток того же размера легче настоящего — весы выдают обман.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('ship.mp4','однородное vs среднее ρ')}
        ${note('Смысл','Для льдины ρ — паспорт вещества. Для корабля — средний паспорт корпуса с воздухом. Формула та же: m / V.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('three.mp4','плавает · висит · тонет')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['ρ < 1','плавает',GREEN],['ρ = 1','висит',BLUE],['ρ > 1','тонет, если сплошное',RED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;color:#e8dcc8"><b style="color:${x[2]}">${x[0]}</b><span>${x[1]}</span></div>`).join('')}
        </div>
        ${note('Правило бака','Сравни среднее ρ тела с ρ жидкости. Не «тяжёлое тонет» — тонет более плотное.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('iceberg.mp4','айсберг: 90% под водой')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','Что ищут: ρ, m или V',GOLD],['2','Треугольник',BLUE],['3','Единицы не мешать',GREEN],['4','Плавание: сравни с водой',MUTED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Рецепт','Сначала буква, потом формула, потом число. Айсберг торчит, потому что ρ льда 0,9.')}
      </div>`;
    } else {
      const d=P().density(6,3);
      h=`<div class="wv-col">
        ${physShot('lab.jpg','6 г · 3 см³ · ρ = ?')}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">плотность?</div>
        ${note('Проверка','Модель считает '+d.rho+' г/см³. Деление, не переворот и не произведение.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[100]=visB100;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===100){ arr[i]=L100; f=true; break; } }
    if(!f) arr.push(L100);
  })();
})();
/* ================= УРОК 104 · Закон Паскаля и давление жидкости ================= */
(function(){
  const L104 = {
    id: 104, title: 'Закон Паскаля и давление жидкости', ico: '🌊',
    src: 'Физика · 8–9 класс · Закон Паскаля и давление жидкости', subj: 'phys',
    explain: [
      'Загадка столба: на берегу уши спокойны, на двух метрах закладывает. Вода давит всегда. Чем выше столб, тем сильнее. Это ещё не Паскаль — это столб ρgh.',
      'Жидкость давит во все стороны: на дно, на стенки и снизу вверх. Давление в точке — скаляр, не «стрелка вниз».',
      'p = ρ · g · h. Вода: 1 м → 10 кПа. h — вертикаль, не длина шланга. Форма сосуда в формулу не входит.',
      'Полное p = p₀ + ρgh. p₀ ≈ 100 кПа. В задачниках часто считают только столб — избыточное.',
      'График p(h) — прямая. Удвоил глубину — удвоил давление. Масло 900 легче воды 1000: тот же метр даёт меньше паскалей.',
      '10 м воды ≈ одна атмосфера. 2 м → 20, 5 м → 50, 10 м → 100 кПа.',
      'Закон Паскаля — про другое. Добавка давления в закрытой жидкости уходит во все точки одинаково. Надавил поршнем — разошлось по всему объёму.',
      'Шприц: толкнул узкий — широкий выезжает. Жидкость почти несжимаема, давление передалось, не «побежало вниз».',
      'Шар Паскаля: равные струйки из всех дырок. Если бы любило низ, нижние были бы длиннее. Они равны — это и есть закон.',
      'p = F / S. Одно и то же давление на малом и большом поршне. Большая площадь — большая сила: F₂ = F₁ · (S₂ / S₁).',
      'Домкрат: жмёшь слабо на малый, большой поднимает машину. Тормоза — тот же приём: нога на педаль, колодки к барабану.',
      'Выигрыш в силе, проигрыш в пути. S₂ = 10 S₁ → F₂ = 10 F₁, но большой поршень едет в 10 раз меньше.',
      'Газ тоже подчиняется Паскалю: мяч и шина давят на стенки равно. Сдулся — держаться нечем.',
      'Не путай два закона. Столб ρgh считает глубину в открытом баке. Паскаль считает, как поршень разнёс добавку в закрытой жидкости.',
      'Сообщающиеся сосуды — следствие давления: однородная жидкость — один уровень. Чайник, шлюз, гидрозатвор.',
      'Рецепт. Столб: p = ρgh. Паскаль: p одно, F = pS. Гидравлика: F₂/F₁ = S₂/S₁. КПа = Па/1000.'
    ],
    check: { q: 'Каково давление воды на глубине 5 м? (в кПа, ρ = 1000 кг/м³, g = 10)', choices: ['5', '50', '500'], ans: 1,
      exp: 'p = 1000 · 10 · 5 = 50 000 Па = 50 кПа.' },
    tasks: [
      { q: 'Давление воды на глубине 3 м? (в кПа, ρ = 1000 кг/м³, g = 10)', kind: 'unit', ans: 30, tol: 0,
        hints: ['p = ρ · g · h.', '1000 · 10 · 3 = 30 000 Па.', '30 кПа.'], sol: '30 кПа' },
      { q: 'В сосуде масло плотностью 900 кг/м³ налито до глубины 2 м. Каково давление на дно? (в кПа, g = 10)', kind: 'choice',
        choices: ['18', '1,8', '180'], ans: 0,
        hints: ['Плотность масла, не воды.', '900 · 10 · 2 = 18 000 Па.'], sol: '18 кПа' },
      { q: 'Вода на глубине 8 м. Давление столба? (в кПа, ρ = 1000, g = 10)', kind: 'unit', ans: 80, tol: 0,
        hints: ['p = ρgh.', '1000 · 10 · 8 = 80 000 Па.'], sol: '80 кПа' },
      { q: 'В сообщающихся сосудах однородная вода. Уровни?', kind: 'choice',
        choices: ['одинаковые', 'в узком выше', 'в широком выше'], ans: 0,
        hints: ['Давление в соединении должно совпасть.', 'Одна жидкость — одна высота.'], sol: 'одинаковые' },
      { q: 'Домкрат: S₂ = 10 S₁, F₁ = 20 Н. Сила на большом поршне? (в Н)', kind: 'unit', ans: 200, tol: 0,
        hints: ['F₁/S₁ = F₂/S₂.', 'F₂ = 20 · 10.'], sol: '200 Н' },
      { q: 'Давление в жидкости 50 кПа, площадь поршня 0,02 м². Сила? (в Н)', kind: 'unit', ans: 1000, tol: 0,
        hints: ['F = p · S. 50 кПа = 50 000 Па.', '50 000 · 0,02 = 1000.'], sol: '1000 Н' },
      { q: 'Шар Паскаля. Струйки из дырок?', kind: 'choice',
        choices: ['равные во все стороны', 'длиннее снизу', 'только вниз'], ans: 0,
        hints: ['Закон Паскаля: добавка одинакова.', 'Не путай со столбом ρgh.'], sol: 'равные во все стороны' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const P=()=>window.PHYS||{pascal:(rho,h)=>({kPa:rho*10*h/1000,Pa:rho*10*h}),jet:(f,y)=>{const d=f-y,v=Math.sqrt(2*9.81*Math.max(0,d));return {v,range:v*Math.sqrt(2*0.04/9.81),pts:[]};},T:{pascal:{water:[[0,0],[5,50],[10,100]],oil:[[0,0],[2,18],[10,90]],jets:[]}}};
  const CSS=`<style>
    @keyframes p4rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes p4sink{0%{transform:translateY(-48px);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes p4bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes p4bub{0%{transform:translateY(0) scale(1);opacity:.85}100%{transform:translateY(-90px) scale(.4);opacity:0}}
    @keyframes p4draw{to{stroke-dashoffset:0}}
    @keyframes p4spray{to{stroke-dashoffset:-24}}
    @keyframes p4out{0%{transform:scale(.15);opacity:0}100%{transform:scale(1);opacity:.95}}
    @keyframes p4ring{0%{transform:scale(.28);opacity:.9}100%{transform:scale(2.3);opacity:0}}
    @keyframes p4caust{0%,100%{opacity:.35}50%{opacity:.7}}
    .p4f{transform-origin:50% 100%;transform-box:fill-box;animation:p4rise 1s cubic-bezier(.2,.85,.2,1) both}
    .p4diver{animation:p4sink .85s cubic-bezier(.2,1.2,.25,1) both, p4bob 2.4s ease-in-out .85s infinite}
    .p4bub{animation:p4bub 2.2s ease-out infinite}
    .p4line{stroke-dasharray:280;stroke-dashoffset:280;animation:p4draw 1s ease forwards}
    .p4jet{stroke-dasharray:7 8;animation:p4spray .45s linear infinite}
    .p4out{transform-box:fill-box;transform-origin:center;animation:p4out .55s cubic-bezier(.2,1.3,.25,1) both}
    .p4ring{transform-box:fill-box;transform-origin:center;animation:p4ring 1.8s ease-out infinite}
    .p4lab{paint-order:stroke fill;stroke:#041018;stroke-width:3.5px;stroke-linejoin:round}
  </style>`;
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(12,Math.min(228,+x)), yy=Math.max(14,Math.min(210,+y));
    return `<text class="p4lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-p4v1', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,340px);height:auto;background:#0b1418;border-radius:16px;display:block;margin:0 auto;overflow:visible;pointer-events:auto">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function defs(){
    return `<defs>
      <linearGradient id="p4sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16344c"/><stop offset=".4" stop-color="#0c1c28"/><stop offset="1" stop-color="#071018"/></linearGradient>
      <linearGradient id="p4w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ee8ff" stop-opacity=".42"/><stop offset="1" stop-color="#0a3050" stop-opacity=".96"/></linearGradient>
      <linearGradient id="p4o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d890" stop-opacity=".5"/><stop offset="1" stop-color="#4a3010" stop-opacity=".95"/></linearGradient>
      <linearGradient id="p4glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8e8f8" stop-opacity=".25"/><stop offset=".15" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#8ec8e0" stop-opacity=".12"/></linearGradient>
      <radialGradient id="p4glow" cx="50%" cy="12%" r="70%"><stop offset="0" stop-color="#7ec8ff" stop-opacity=".3"/><stop offset="1" stop-color="#071018" stop-opacity="0"/></radialGradient>
    </defs>`;
  }
  function plot(pts, hx, hy, xl){
    const ox=36, oy=30, W=168, H=136;
    const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
    const x0=0, x1=Math.max(...xs,1), y0=0, y1=Math.max(...ys,1);
    const xy=(x,y)=>[ox+x/x1*W, oy+H-y/y1*H];
    const d=pts.map((p,i)=>{const q=xy(p[0],p[1]); return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
    let mark='';
    if(hx!=null){ const q=xy(hx, hy); mark=`<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="${GOLD}"/><circle cx="${q[0]}" cy="${q[1]}" r="9" fill="none" stroke="${GOLD}" opacity=".4"/>`; }
    return `<g>
      <rect width="240" height="220" fill="url(#p4sky)"/>
      <rect x="${ox-8}" y="${oy-8}" width="${W+28}" height="${H+28}" rx="10" fill="#06141c" opacity=".55"/>
      <line x1="${ox}" y1="${oy+H}" x2="${ox+W}" y2="${oy+H}" stroke="#3d5c49"/>
      <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+H}" stroke="#3d5c49"/>
      <path class="p4line" d="${d}" fill="none" stroke="${BLUE}" stroke-width="2.7"/>
      ${mark}${lab(ox+W/2, 214, xl, MUTED,'middle',11)}${lab(16, oy+H/2, 'кПа', MUTED)}
    </g>`;
  }
  function diver(cx, cy){
    return `<g class="p4diver">
      <ellipse cx="${cx}" cy="${cy+18}" rx="8" ry="12" fill="#1a5a78"/>
      <circle cx="${cx}" cy="${cy}" r="9" fill="#ffd2a8"/>
      <ellipse cx="${cx}" cy="${cy+1}" rx="8" ry="5.5" fill="#1a3040" opacity=".85"/>
      <ellipse cx="${cx-3.2}" cy="${cy+1}" rx="2.4" ry="2.1" fill="#9ee8ff"/>
      <ellipse cx="${cx+3.2}" cy="${cy+1}" rx="2.4" ry="2.1" fill="#9ee8ff"/>
      <rect x="${cx-7}" y="${cy-2}" width="4" height="10" rx="2" fill="#3a6a80"/>
      <rect x="${cx+3}" y="${cy-2}" width="4" height="10" rx="2" fill="#3a6a80"/>
      <path d="M ${cx-6} ${cy+28} q -8 8 -2 12" stroke="#1a5a78" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M ${cx+6} ${cy+28} q 8 8 2 12" stroke="#1a5a78" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    </g>`;
  }
  function column(h, rho){
    const kPa=P().pascal(rho,h).kPa;
    const top=46, bot=196, fill=Math.max(0.06, Math.min(1,h/10));
    const ySurf=bot-fill*(bot-top);
    const yDiv=Math.min(bot-22, Math.max(ySurf+16, ySurf+(bot-ySurf)*0.42));
    const oil=rho<1000;
    return `<g>
      <rect width="240" height="220" fill="url(#p4sky)"/>
      <ellipse cx="120" cy="18" rx="110" ry="36" fill="url(#p4glow)"/>
      <rect x="72" y="${top}" width="96" height="${bot-top}" rx="8" fill="#071820"/>
      <rect class="p4f" x="76" y="${ySurf}" width="88" height="${bot-ySurf-4}" fill="${oil?'url(#p4o)':'url(#p4w)'}"/>
      <rect x="72" y="${top}" width="96" height="${bot-top}" rx="8" fill="url(#p4glass)" stroke="#9ed4ea" stroke-width="2.6"/>
      <rect x="76" y="${top+6}" width="7" height="${bot-top-16}" rx="3" fill="#fff" opacity=".14"/>
      <ellipse cx="120" cy="${bot-6}" rx="38" ry="6" fill="#3a2a14" opacity=".5"/>
      <path d="M 86 ${bot-8} q 6 -16 4 -28" stroke="#2a6a48" stroke-width="3" fill="none"/>
      <path d="M 154 ${bot-8} q -5 -18 2 -32" stroke="#1e5a3a" stroke-width="2.5" fill="none"/>
      <path d="M 76 ${ySurf} Q 98 ${ySurf-7} 120 ${ySurf} T 164 ${ySurf}" fill="none" stroke="#e8f8ff" stroke-width="1.7" opacity=".75"/>
      ${diver(120, yDiv)}
      ${[0,1,2,3].map(i=>`<circle class="p4bub" cx="${108+i*7}" cy="${Math.min(bot-10,yDiv+16)}" r="${1.6+i%2}" fill="#d8f6ff" style="animation-delay:${i*.28}s"/>`).join('')}
      ${lab(120, 24, h<1.2 ? 'у поверхности' : ('глубина '+String(h).replace('.',',')+' м · '+Math.round(kPa)+' кПа'), GOLD, 'middle', 13)}
    </g>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }

  function visB104(el){
    try{ window._waveCss && _waveCss('css-p4v1', CSS); }catch(e){}
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'104';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const hM=Math.max(0.5, Math.min(10, +(st.h==null?2:st.h)));
    const rho=+(st.rho==null?1000:st.rho);
    let h='';

    if(step===0){
      const open=!!st.open;
      h=`<div class="wv-col">
        ${physShot(open?'diver_deep.mp4':'diver.mp4', open?'глубина 8 м · уши закладывает':'у поверхности')}
        ${pred(st,'p0','Нырнёшь глубже. Давление?',[{k:'up',t:'вырастет'},{k:'same',t:'то же'},{k:'down',t:'упадёт'}])}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].open=1;chRender(0);}catch(e){}">Нырнуть</button>
        ${open?note('Столб','Выросло. Не удар волны — выше столб воды над головой. 8 м воды ≈ 80 кПа только от столба.'):note('Предскажи','Сначала карточка, потом ныряй.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('pascal.jpg','давит во все стороны')}
        ${pred(st,'p1','Давит только вниз?',[{k:'no',t:'во все стороны'},{k:'yes',t:'только вниз'}])}
        ${st.p1?note('Скаляр','На дно, на стенки и снизу вверх. Архимед как раз от давления снизу. Ловушка: «вода давит вниз».'):note('Предскажи','Типичная ловушка 7 класса.')}
      </div>`;
    } else if(step===2){
      const s=P().pascal(1000,2);
      h=`<div class="wv-col">
        ${physShot('tank.jpg','p = ρ · g · h  ·  2 м → '+s.kPa+' кПа')}
        ${note('Столб','Сначала ρ·g, потом ·h. Вода: 1 м → 10 кПа. h — вертикаль, не длина шланга.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('diver_deep.mp4','p = p₀ + ρgh')}
        ${note('Атмосфера сверху','p₀ ≈ 100 кПа — воздух над водой. В задачниках часто просят только столб ρgh — избыточное давление. Полное больше на одну атмосферу.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('oil.mp4','вода 1000 · масло 900')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[['вода','1000 кг/м³',BLUE],['масло','900 кг/м³',GOLD],['керосин','800 кг/м³',MUTED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;justify-content:space-between;border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;color:#e8dcc8"><span>${x[0]}</span><b style="color:${x[2]}">${x[1]}</b></div>`).join('')}
        </div>
        ${note('Легче столб','Кубометр воды — тонна. Масло легче: тот же метр даёт меньше паскалей.')}
      </div>`;
    } else if(step===5){
      const s=P().pascal(1000,hM);
      const water=Array.from({length:11},(_,i)=>[i, i*10]);
      const oil=Array.from({length:11},(_,i)=>[i, i*9]);
      h=`<div class="wv-col">
        ${physShot(hM>5?'diver_deep.mp4':'diver.mp4', Math.round(s.kPa)+' кПа на '+String(hM).replace('.',',')+' м')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">h
          <input type="range" min="5" max="100" value="${Math.round(hM*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(hM).replace('.',',')} м</b>
        </label>
        ${physChart([{pts:water,col:BLUE,name:'вода'},{pts:oil,col:GOLD,name:'масло'}], hM, s.kPa, 'h, м', 'давление столба', 'ph', 'кПа')}
        ${note('Прямая','Удвоил h — удвоил p. Масло ниже: легче столб. Это ещё не Паскаль — это глубина.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('diver_deep.mp4','10 м воды ≈ 1 атмосфера')}
        ${physChart([{pts:[[0,0],[2,20],[5,50],[10,100]], col:BLUE, name:'вода'}], 10, 100, 'h, м', 'кПа', 'atm', 'кПа')}
        ${note('Десять метров','100 кПа столба — как воздух над тобой. Поэтому 10 м — круглая граница.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('syringe.mp4','толкнул узкий — широкий выехал')}
        ${pred(st,'p7','Давление ушло только вниз?',[{k:'all',t:'во все точки одинаково'},{k:'down',t:'только вниз'},{k:'near',t:'только рядом с поршнем'}])}
        ${st.p7?note('Паскаль','Добавка не «любит низ». В закрытой жидкости она одна и та же везде. Шприц — закон руками.'):note('Предскажи','Это уже не столб ρgh.')}
      </div>`;
    } else if(step===8){
      const on=!!st.ball;
      h=`<div class="wv-col">
        ${physShot(on?'pascal.mp4':'pascal.jpg', on?'равные струйки':'шар Паскаля')}
        ${pred(st,'p8','Надавишь. Струйки?',[{k:'eq',t:'одинаковые'},{k:'low',t:'длиннее снизу'},{k:'up',t:'длиннее сверху'}])}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].ball=1;chRender(0);}catch(e){}">Надавить</button>
        ${on?note('Одинаково','Если бы любило низ, нижние были бы длиннее. Они равны. '+(st.p8==='eq'?'Угадал.':'Смотри шар, не бутылку с дырками.')):note('Предскажи','Не путай с Торричелли: там открытый столб, тут закрытый шар.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('press.jpg','p = F / S  ·  одно на обоих поршнях')}
        ${note('Определение','Давление — сила на площадь. Паскаль говорит: это p одно и то же в жидкости. Значит F₂ / S₂ = F₁ / S₁.')}
      </div>`;
    } else if(step===10){
      const k=Math.max(2, Math.min(12, +(st.k==null?5:st.k)));
      const F1=20, F2=F1*k;
      const pts=Array.from({length:11},(_,i)=>[i+2, F1*(i+2)]);
      h=`<div class="wv-col">
        ${physShot('press.mp4', 'F₁ = 20 Н  ·  S₂/S₁ = '+k+'  ·  F₂ = '+F2+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">S₂/S₁
          <input type="range" min="2" max="12" value="${k}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].k=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">×${k}</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'F₂ при F₁ = 20 Н'}], k, F2, 'S₂ / S₁', 'сила на большом', 'fk', 'Н')}
        ${note('Гидравлика','Площадь вдвое — сила вдвое. Одна ручка — отношение площадей. p одно, F = pS.')}
      </div>`;
    } else if(step===11){
      const lift=!!st.lift;
      h=`<div class="wv-col">
        ${physShot(lift?'jack.mp4':'jack.jpg', lift?'большая площадь — большая сила':'домкрат · жать малый поршень')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].lift=1;chRender(0);}catch(e){}">${lift?'Подняли':'Жать малый'}</button>
        ${note('Машина','S₂ = 10 S₁, F₁ = 20 Н → F₂ = 200 Н. Жмёшь слабо — большой поршень держит вес.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('press.jpg','выигрыш в силе · проигрыш в пути')}
        ${note('Путь','Что выиграл в силе, отдал в расстоянии. Большой поршень едет в k раз меньше. Работа почти та же: F₁s₁ ≈ F₂s₂.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('brakes.mp4','педаль → жидкость → колодки')}
        ${note('Тормоза','Малый цилиндр у педали, большие у колёс. Паскаль разносит давление по трубкам одинаково на все колёса.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('tire.jpg','газ тоже: мяч и шина')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','Столб: p = ρgh',GOLD],['2','Паскаль: добавка одинакова',BLUE],['3','Гидравлика: F₂/F₁ = S₂/S₁',GREEN],['4','Не путай шар и бутылку',MUTED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.1}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')}
        </div>
        ${note('Два закона','Столб считает глубину. Паскаль считает передачу. Шар — Паскаль. Дырки в открытой бутылке — Торричелли, не он.')}
      </div>`;
    } else {
      const s=P().pascal(1000,5);
      h=`<div class="wv-col">
        ${physShot('diver_deep.mp4','5 м воды · модель: '+Math.round(s.kPa)+' кПа')}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">давление в кПа?</div>
        ${note('Проверка','50 кПа. Столб ρgh. Паскаль спросит про домкрат в задачках.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[104]=visB104;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===104){ arr[i]=L104; f=true; break; } }
    if(!f) arr.push(L104);
  })();
})();
/* ================= УРОК 105 · Закон Ома: ток и напряжение ================= */
(function(){
  const L105 = {
    id: 105, title: 'Закон Ома: ток и напряжение', ico: '🔋',
    src: 'Физика · 8–9 класс · Закон Ома', subj: 'phys',
    explain: [
      'Загадка цепи: одна лампа поёт, другая едва дышит. Батарейка та же. Что душит ток? Георг Ом связал три числа одной дробью.',
      'I — амперы, поток заряда. U — вольты, напор. R — омы, помеха. Без всех трёх цепь не прочитать.',
      'Водопровод — карта, не «вода в проводе». Насос сильнее — поток больше. Труба уже — поток меньше. Узкое сопло — быстрее струя, как в шланге.',
      'I = U / R. Прямо к напряжению, обратно к сопротивлению. Считает та же модель, что лабораторный Python.',
      'Треугольник: U наверху. Закрой неизвестное. Ищешь ток — дели. Ищешь U — умножай I·R.',
      'Одна ручка U, R заморожен. График I(U) — прямая. Лампа ярче, когда ток вырос.',
      'Проверка: 15 В и 5 Ом → 3 А. Не 10 и не 0,3.',
      'U вдвое — I вдвое. 6 В → 1 А, 12 В → 2 А, 24 В → 4 А при 6 Ом. Это и есть «прямо пропорционально».',
      'Одна ручка R. График I(R) — гипербола. Больше помеха — меньше ток. Реостат так и работает.',
      'Ищем R: 20 В и 4 А → 5 Ом. Ищем U: 3 А и 7 Ом → 21 В. Сначала буква.',
      'Ампер, вольт, ом. Фонарик ~0,3 А, чайник ~10 А. Число без единицы — не ответ. Измеряют амперметром в разрыв и вольтметром параллельно.',
      'R зависит от длины, сечения и материала. Медь почти не мешает. Нихром мешает сильно — поэтому спираль чайника греет.',
      'Реостат меняет длину куска. Больше R — меньше I — темнее нить. Ползунок яркости — это закон Ома руками.',
      'Последовательно: R = R₁ + R₂. Ток один, напряжения складываются. Две лампы в гирлянде делят напор.',
      '0,001 А щекотка. 0,01 сводит. 0,1 смертельно. Учебную цепь считают. Розетку руками не щупают.',
      'Рецепт. I, U или R. Треугольник. Проверка: I · R = U. Яркость — про ток. Последовательно — складывай R.'
    ],
    check: { q: 'Напряжение 15 В, сопротивление 5 Ом. Сила тока? (в А)', choices: ['3', '10', '0,3'], ans: 0,
      exp: 'I = U / R = 15 / 5 = 3 А.' },
    tasks: [
      { q: 'Напряжение 20 В, сила тока 4 А. Сопротивление? (в Ом)', kind: 'unit', ans: 5, tol: 0,
        hints: ['R = U / I.', '20 / 4 = ?'], sol: '5 Ом' },
      { q: 'Сила тока 3 А, сопротивление 7 Ом. Напряжение? (в В)', kind: 'choice',
        choices: ['4', '10', '21'], ans: 2, hints: ['U = I · R.', '3 · 7 = ?'], sol: '21 В' },
      { q: '24 В и 8 Ом. Сила тока? (в А)', kind: 'unit', ans: 3, tol: 0,
        hints: ['I = U / R.', '24 / 8 = ?'], sol: '3 А' },
      { q: 'Два резистора 4 Ом и 2 Ом последовательно, 12 В. Ток в цепи? (в А)', kind: 'choice',
        choices: ['2', '3', '6'], ans: 0,
        hints: ['Последовательно R = R₁ + R₂ = 6 Ом.', 'I = 12 / 6.'], sol: '2 А' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const P=()=>window.PHYS||{ohm:(U,R)=>({I:U/R,period:Math.max(.28,Math.min(2.4,2/Math.max(.25,U/R)))}),T:{ohm:{iu_R6:[[0,0],[12,2],[24,4]],ir_U12:[[3,4],[6,2],[12,1]]}}};
  const CSS=`<style>
    @keyframes o4run{to{offset-distance:100%}}
    @keyframes o4flow{to{stroke-dashoffset:-24}}
    @keyframes o4glow{0%,100%{filter:drop-shadow(0 0 3px #ffd36a)}40%{filter:drop-shadow(0 0 18px #fff3b0)}70%{filter:drop-shadow(0 0 8px #ffc84a)}}
    @keyframes o4halo{0%{transform:scale(.5);opacity:.75}100%{transform:scale(1.85);opacity:0}}
    @keyframes o4draw{to{stroke-dashoffset:0}}
    @keyframes o4volt{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
    @keyframes o4bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes o4fil{0%,100%{opacity:.75}50%{opacity:1}}
    .o4e{offset-path:path('M 42 148 C 42 148, 120 148, 168 148 C 176 148, 176 78, 132 64');animation:o4run 1.3s linear infinite}
    .o4wire{stroke-dasharray:9 7;animation:o4flow .7s linear infinite}
    .o4lamp{transform-box:fill-box;transform-origin:center;animation:o4glow 1.15s ease-in-out infinite}
    .o4halo{transform-box:fill-box;transform-origin:center;animation:o4halo 1.55s ease-out infinite}
    .o4line{stroke-dasharray:280;stroke-dashoffset:280;animation:o4draw 1s ease forwards}
    .o4volt{transform-box:fill-box;transform-origin:center;animation:o4volt 1.6s ease-in-out infinite}
    .o4bar{transform-origin:50% 100%;transform-box:fill-box;animation:o4bar .7s cubic-bezier(.2,.85,.2,1) both}
    .o4fil{animation:o4fil .7s ease-in-out infinite}
    .o4lab{paint-order:stroke fill;stroke:#100810;stroke-width:3.5px;stroke-linejoin:round}
  </style>`;
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(12,Math.min(228,+x)), yy=Math.max(14,Math.min(210,+y));
    return `<text class="o4lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function frame(inner){
    try{ window._waveCss && _waveCss('css-o4v1', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 240 220" style="width:min(100%,340px);height:auto;background:#120814;border-radius:16px;display:block;margin:0 auto;overflow:visible;pointer-events:auto">${inner}</svg>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function plot(pts, hx, hy, xl, yl){
    const ox=36, oy=30, W=168, H=136;
    const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]);
    const x1=Math.max(...xs,1), y1=Math.max(...ys,1);
    const xy=(x,y)=>[ox+x/x1*W, oy+H-y/y1*H];
    const d=pts.map((p,i)=>{const q=xy(p[0],p[1]); return (i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
    let mark='';
    if(hx!=null){ const q=xy(hx,hy); mark=`<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="${GOLD}"/><circle cx="${q[0]}" cy="${q[1]}" r="9" fill="none" stroke="${GOLD}" opacity=".4"/>`; }
    return `<g>
      <rect width="240" height="220" fill="#120814"/>
      <rect x="${ox-8}" y="${oy-8}" width="${W+28}" height="${H+28}" rx="10" fill="#0c0814" opacity=".55"/>
      <line x1="${ox}" y1="${oy+H}" x2="${ox+W}" y2="${oy+H}" stroke="#3d5c49"/>
      <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+H}" stroke="#3d5c49"/>
      <path class="o4line" d="${d}" fill="none" stroke="${GOLD}" stroke-width="2.6"/>
      ${mark}${lab(ox+W/2,214,xl,MUTED,'middle',11)}${lab(16,oy+H/2,yl,MUTED)}
    </g>`;
  }
  function desk(){
    return `<rect width="240" height="220" fill="#120814"/>
      <ellipse cx="132" cy="58" rx="70" ry="46" fill="#ffd36a" opacity=".08"/>
      <path d="M 6 176 L 234 176 L 220 208 L 20 208 Z" fill="#3a2418"/>
      <path d="M 12 178 L 228 178" stroke="#c49658" stroke-width="1.4" opacity=".45"/>
      <path d="M 54 176 L 62 208" stroke="#1a0c08" opacity=".3"/>
      <path d="M 160 176 L 168 208" stroke="#1a0c08" opacity=".28"/>`;
  }
  function batt(){
    return `<g class="o4volt">
      <rect x="22" y="118" width="36" height="58" rx="6" fill="#c8ccd0" stroke="#3a4044"/>
      <rect x="22" y="118" width="36" height="16" rx="6" fill="#d9783a"/>
      <rect x="34" y="112" width="12" height="8" rx="2" fill="#e8c878"/>
      <text x="40" y="156" text-anchor="middle" font-size="11" fill="#2a2e32" font-family="Georgia,serif">+</text>
    </g>`;
  }
  function lamp(I){
    const on=I>0.2, g=Math.max(0.12, Math.min(1, I/4));
    const glow=on?`rgba(255,220,120,${0.28+g*.7})`:'#2a2418';
    return `<g>
      ${on?`<ellipse class="o4halo" cx="132" cy="64" rx="${28+g*14}" ry="${32+g*10}" fill="none" stroke="${GOLD}" stroke-width="1.2"/>`:''}
      ${on?`<ellipse cx="132" cy="64" rx="${36+g*10}" ry="${40+g*8}" fill="#ffd36a" opacity="${0.12+g*.22}"/>`:''}
      <ellipse class="${on?'o4lamp':''}" cx="132" cy="62" rx="22" ry="28" fill="${glow}" stroke="#e8d8a8" stroke-width="1.6"/>
      <path d="M 118 82 Q 132 94 146 82" fill="#d8c898" stroke="#8a7a48"/>
      <rect x="124" y="90" width="16" height="10" rx="2" fill="#8a8870"/>
      <rect x="126" y="100" width="12" height="8" rx="1" fill="#6a6858"/>
      ${on?`<path class="o4fil" d="M 124 68 q 4 -8 8 0 t 8 0" fill="none" stroke="#fff6c8" stroke-width="1.6"/>`:''}
    </g>`;
  }
  function wire(){
    return `<path class="o4wire" d="M 58 148 H 168 C 180 148 180 90 148 78" fill="none" stroke="#c47a3a" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M 40 176 V 148 H 58" fill="none" stroke="#c47a3a" stroke-width="3.2" stroke-linecap="round"/>`;
  }
  function electrons(n, period){
    return Array.from({length:n},(_,i)=>`<circle class="o4e" r="3.6" fill="${GOLD}" style="animation-duration:${period}s;animation-delay:${(i/n)*period}s"/>`).join('');
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function scene(I, extra){
    return desk()+batt()+wire()+electrons(I>0.3?Math.max(4,Math.min(12,Math.round(I*3))):2, Math.max(.35, Math.min(2.2, 2/Math.max(.25,I))))+lamp(I)+(extra||'');
  }

  function visB105(el){
    try{ window._waveCss && _waveCss('css-o4v1', CSS); }catch(e){}
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'105';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const U=Math.max(1, Math.min(24, +(st.U==null?12:st.U)));
    const R=Math.max(1, Math.min(24, +(st.R==null?6:st.R)));
    const S=P().ohm(U,R);
    const hid=st.hid||'';
    let h='';

    if(step===0){
      const on=!!st.on;
      h=`<div class="wv-col">
        ${physShot(on?'lamp_on.mp4':'lamp_off.mp4', on?'лампа поёт · ток пошёл':'кто душит ток?')}
        ${pred(st,'p0','Замкнёшь цепь. Нить?',[{k:'on',t:'разгорится'},{k:'off',t:'не изменится'}])}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].on=1;chRender(0);}catch(e){}">Замкнуть</button>
        ${on?note('Ток пошёл','Заряды побежали, нить задышала. Яркость — про ток, не про «сильную батарейку» в отрыве от R.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('meters.mp4','I · U · R')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[['I ток','амперы, поток заряда',GOLD],['U напряжение','вольты, напор',BLUE],['R сопротивление','омы, помеха',GREEN]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]}">${x[0]}</b><div style="color:#e8dcc8;font-size:13px">${x[1]}</div></div>`).join('')}
        </div>
        ${note('Три жителя','Амперметр в разрыв цепи, вольтметр — параллельно. Без всех трёх цепь не прочитать.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('pump.mp4','насос U · труба R · поток I')}
        ${note('Карта','Напор больше — поток больше. Труба уже — поток меньше. Узкое сопло быстрее, как палец на шланге. Это карта, не «вода в проводе».')}
      </div>`;
    } else if(step===3){
      const s=P().ohm(12,6);
      h=`<div class="wv-col">
        ${physShot('meters.jpg','I = U / R  ·  12 / 6 = '+s.I+' А')}
        ${note('Закон','Ток — частное. Прямо к U, обратно к R. Модель та же, что Python-лаборатория.')}
      </div>`;
    } else if(step===4){
      const map={U:'U = I · R', I:'I = U / R', R:'R = U / I'};
      h=`<div class="wv-col">
        ${physShot('tri.jpg', hid?map[hid]:'U наверху')}
        ${frame(`<polygon points="120,36 40,176 200,176" fill="${GOLD}14" stroke="${GOLD}" stroke-width="2"/>`+
          lab(120,70,hid==='U'?'?':'U',hid==='U'?RED:GOLD,'middle',22)+
          lab(70,164,hid==='I'?'?':'I',hid==='I'?RED:BLUE,'middle',20)+
          lab(170,164,hid==='R'?'?':'R',hid==='R'?RED:GREEN,'middle',20)+
          lab(120,208,hid?map[hid]:'закрой неизвестное',GOLD,'middle',12))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['U','закрыть U'],['I','закрыть I'],['R','закрыть R']].map(x=>`<button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].hid='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Треугольник','U наверху. Ищешь ток — дели. Ищешь вольты — умножай.')}
      </div>`;
    } else if(step===5){
      const pts=(P().T&&P().T.ohm&&P().T.ohm.iu_R6)||[[0,0],[24,4]];
      const s=P().ohm(U,6);
      h=`<div class="wv-col">
        ${physShot(s.I>0.4?'lamp_on.mp4':'lamp_off.mp4','R = 6 Ом · I = '+String(s.I).replace('.',',')+' А')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">U
          <input type="range" min="1" max="24" value="${U}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].U=+this.value;CHS[k].R=6;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${U} В</b>
        </label>
        ${frame(plot(pts, U, s.I, 'U, В', 'I'))}
        ${note('Одна ручка','Сопротивление заморожено. График — прямая. Больше напор — ярче нить.')}
      </div>`;
    } else if(step===6){
      const s=P().ohm(15,5);
      h=`<div class="wv-col">
        ${physShot('meters.jpg','15 / 5 = '+s.I+' А')}
        ${note('Проверка','Деление. Сложение и переворот — чужие ответы.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('lamp_on.mp4','U вдвое — I вдвое')}
        ${frame([[6,1],[12,2],[24,4]].map((x,i)=>`<rect class="o4bar" x="${40+i*62}" y="${176-x[1]*28}" width="48" height="${x[1]*28}" rx="7" fill="${GOLD}" opacity="${.45+i*.18}" style="animation-delay:${i*.12}s"/>`+lab(64+i*62,34,x[0]+' В',GOLD)+lab(64+i*62,54,x[1]+' А',GREEN)).join(''))}
        ${note('Прямо к U','R = 6. Напор вдвое — ток вдвое. Это и есть прямая пропорциональность.')}
      </div>`;
    } else if(step===8){
      const pts=(P().T&&P().T.ohm&&P().T.ohm.ir_U12)||[[3,4],[12,1]];
      const s=P().ohm(12,R);
      h=`<div class="wv-col">
        ${physShot(s.I>1?'rheostat.mp4':'lamp_off.mp4','U = 12 В · I = '+String(s.I).replace('.',',')+' А')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">R
          <input type="range" min="1" max="24" value="${R}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].R=+this.value;CHS[k].U=12;chRender(0);}catch(e){}">
          <b style="color:${GREEN}">${R} Ом</b>
        </label>
        ${frame(plot(pts, R, s.I, 'R, Ом', 'I'))}
        ${note('Одна ручка','Напряжение заморожено. График — гипербола: больше R, меньше I.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('meters.jpg','R = U/I · U = I·R')}
        ${note('Две стороны','Ищешь омы — дели вольты на амперы. Ищешь вольты — умножай. Сначала имя неизвестного.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('meters.mp4','ампер · вольт · ом')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,320px)">
          ${[['А ампер','~0,3 фонарик · ~10 чайник',GOLD],['В вольт','напор источника',BLUE],['Ом','насколько мешает участок',GREEN]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;border:1px solid #3d5c49;border-left:4px solid ${x[2]};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]}">${x[0]}</b><div style="color:#e8dcc8;font-size:13px">${x[1]}</div></div>`).join('')}
        </div>
        ${note('Имена','Число без единицы — не ответ.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('nichrome.mp4','медь почти не мешает · нихром греет')}
        ${note('Три ручки R','Длина, сечение, материал. Спираль чайника длинная и нихромовая — чтобы греть, а не чтобы «просто провести».')}
      </div>`;
    } else if(step===12){
      const s=P().ohm(12,R);
      h=`<div class="wv-col">
        ${physShot('rheostat.mp4','реостат · I = '+String(s.I).replace('.',',')+' А')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">R
          <input type="range" min="1" max="24" value="${R}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].R=+this.value;CHS[k].U=12;chRender(0);}catch(e){}">
          <b style="color:${GREEN}">${R} Ом</b>
        </label>
        ${note('Ползунок яркости','Двигаешь контакт — меняется длина куска проволоки. Нить из той же модели I = U/R.')}
      </div>`;
    } else if(step===13){
      const r1=4, r2=2, rt=r1+r2, i=P().ohm(12,rt).I;
      h=`<div class="wv-col">
        ${physShot('meters.mp4','последовательно R = R₁ + R₂')}
        ${pred(st,'p13','4 Ом и 2 Ом в гирлянде, 12 В. Ток?',[{k:'2',t:'2 А'},{k:'3',t:'3 А'},{k:'6',t:'6 А'}])}
        ${st.p13?note('Один ток','R = 6 Ом, I = 12/6 = '+i+' А. Ток один на всю гирлянду, напряжения складываются. '+(st.p13==='2'?'Угадал.':'Складывай R, потом дели.')):note('Предскажи','Не два отдельных тока — одна цепочка.')}
      </div>`;
    } else if(step===14){
      const POOL=[['I',15,5],['I',12,6],['R',20,4],['U',3,7],['I',24,8],['I',12,6]];
      if(st.i==null) st.i=0;
      const e=POOL[st.i%POOL.length];
      let desc, formula, ans;
      if(e[0]==='I'){ const s=P().ohm(e[1],e[2]); desc='U = '+e[1]+' В, R = '+e[2]+' Ом'; formula='I = U / R'; ans=s.I+' А'; }
      else if(e[0]==='R'){ desc='U = '+e[1]+' В, I = '+e[2]+' А'; formula='R = U / I'; ans=(e[1]/e[2])+' Ом'; }
      else { desc='I = '+e[1]+' А, R = '+e[2]+' Ом'; formula='U = I · R'; ans=(e[1]*e[2])+' В'; }
      h=`<div class="wv-col">
        ${physShot('lamp_on.mp4', desc)}
        ${frame(lab(120,56,desc,GOLD,'middle',14)+lab(120,100,formula,BLUE,'middle',16)+lab(120,148,st.s2?ans:'?',GREEN,'middle',22))}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].s2=1;chRender(0);}catch(e){}">Ответ</button>
          <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].i=(CHS[k].i||0)+1;CHS[k].s2=0;chRender(0);}catch(e){}">Другая</button>
        </div>
        ${note('Тренажёр','Буква, треугольник, число из модели. 0,1 А — уже опасно, розетку не щупают.')}
      </div>`;
    } else {
      const s=P().ohm(15,5);
      h=`<div class="wv-col">
        ${physShot('lamp_on.mp4','15 В и 5 Ом')}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">ток ? А</div>
        ${note('Проверка','Модель: '+s.I+' А. Деление.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[105]=visB105;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===105){ arr[i]=L105; f=true; break; } }
    if(!f) arr.push(L105);
  })();
})();
/* ================= УРОК 106 · Сила Архимеда ================= */
(function(){
  const L106 = {
    id: 106, title: 'Сила Архимеда', ico: '⛵',
    src: 'Физика · 8–9 класс · Сила Архимеда', subj: 'phys',
    explain: [
      'Загадка ванны: сел — вода полезла через край. Объём вытесненной воды равен объёму погружённого тела. Архимед закричал «Эврика!».',
      'На любое тело в жидкости действует выталкивающая сила вверх. В бассейне друга поднять легко: вода уже толкает.',
      'Сила Архимеда — вес вытесненной жидкости. Не вес тела. Не «вода любит вверх». Разница давлений: снизу сильнее, чем сверху.',
      'F_A = ρ_ж · g · V_погр. ρ — плотность жидкости, g ≈ 10, V — объём погружённой части. Вода 1000 кг/м³.',
      'Треугольник: F наверху, внизу ρ, g и V. Ищешь силу — умножай три числа. Ищешь объём — дели силу на ρg.',
      '0,2 м³ в воде: 1000 · 10 · 0,2 = 2000 Н. Сначала ρ·g, потом ·V.',
      'Одна ручка — объём. График F(V) — прямая из начала. Удвоил объём — удвоил силу.',
      'Керосин 800, вода 1000, море 1030, Мёртвое море ≈ 1240. Плотнее жидкость — сильнее толкает при том же V.',
      'То же тело 0,5 м³: в керосине 4000 Н, в воде 5000 Н. Предскажи до числа.',
      'В Мёртвом море человек не тонет: соль подняла ρ жидкости выше средней плотности тела.',
      'Кажущийся вес = mg − F_A. Весы в воде показывают меньше. Если F_A > mg — всплывает.',
      'Сплошная сталь тонет: ρ = 7800 > 1000. Корабль полый: среднее ρ меньше воды, V огромный — F_A держит.',
      'Рыба надувает пузырь — объём больше, F_A выросла, всплывает. Лодка травит цистерны — то же.',
      'Воздух тоже жидкость по Архимеду: F_A = ρ_возд · g · V. ρ ≈ 1,3 кг/м³. Шар с гелием легче окружающего воздуха — поднимается.',
      'Плавает, если среднее ρ тела меньше жидкости. Тонет, если больше. Висит, если равны. Сравни не «тяжёлое», а плотности.',
      'Рецепт. 1) ρ жидкости. 2) V погружённый. 3) F = ρgV. 4) Сравни с весом. 5) Для корабля — средний объём с воздухом.'
    ],
    check: { q: 'Тело объёмом 0,2 м³ полностью погружено в воду (ρ = 1000 кг/м³). Сила Архимеда? (в Н, g = 10)', choices: ['200','2000','20000'], ans: 1,
      exp: 'F = ρ · g · V = 1000 · 10 · 0,2 = 2000 Н.' },
    tasks: [
      { q: 'Тело объёмом 0,5 м³ полностью погружено в воду (ρ = 1000 кг/м³). Сила Архимеда? (в Н, g = 10)', kind: 'unit', ans: 5000, tol: 0,
        hints: ['F = ρ · g · V.', '1000 · 10 · 0,5 = ?'], sol: '5000 Н' },
      { q: 'Тело объёмом 0,5 м³ погружено в керосин (ρ = 800 кг/м³). Сила Архимеда? (в Н, g = 10)', kind: 'choice',
        choices: ['400','4000','40000'], ans: 1, hints: ['Плотность керосина 800.', '800 · 10 · 0,5 = 4000.'], sol: '4000 Н' },
      { q: 'Тело 0,3 м³ в морской воде (ρ = 1030 кг/м³). F_A? (в Н, g = 10)', kind: 'unit', ans: 3090, tol: 0,
        hints: ['F = 1030 · 10 · 0,3.', '10300 · 0,3 = 3090.'], sol: '3090 Н' },
      { q: 'Вес тела 6000 Н, F_A = 5000 Н. Тело?', kind: 'choice',
        choices: ['всплывёт','повиснет','пойдёт на дно'], ans: 2,
        hints: ['Сравни вес и выталкивание.', 'Вес больше — равнодействующая вниз.'], sol: 'пойдёт на дно' }
    ]
  };

  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const P=()=>window.PHYS||{};
  const FA=(rho,V)=>Math.round((+rho)*10*(+V)*1000)/1000;
  const CSS=`<style>
    @keyframes a6draw{to{stroke-dashoffset:0}}
    @keyframes a6fade{from{opacity:0}to{opacity:1}}
    @keyframes a6halo{0%{transform:scale(.45);opacity:.85}100%{transform:scale(2.4);opacity:0}}
    @keyframes a6dot{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
    @keyframes a6rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    .a6line{stroke-dasharray:520;stroke-dashoffset:520;animation:a6draw 1.25s cubic-bezier(.2,.85,.2,1) forwards}
    .a6fill{opacity:0;animation:a6fade .7s .25s ease forwards}
    .a6halo{transform-box:fill-box;transform-origin:center;animation:a6halo 1.7s ease-out infinite}
    .a6dot{transform-box:fill-box;transform-origin:center;animation:a6dot 1.6s ease-in-out infinite}
    .a6bar{transform-origin:50% 100%;transform-box:fill-box;animation:a6rise .85s cubic-bezier(.2,.85,.2,1) both}
    .a6lab{paint-order:stroke fill;stroke:#071018;stroke-width:3.4px;stroke-linejoin:round}
  </style>`;
  function lab(x,y,t,col,anchor,fs){
    const xx=Math.max(14,Math.min(326,+x)), yy=Math.max(16,Math.min(210,+y));
    return `<text class="a6lab" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${anchor||'middle'}" font-size="${fs||12}" fill="${col}" font-family="Georgia,serif">${t}</text>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function chart(series, xMark, yMark, xl, yl, uid){
    const W=340, H=220, ox=58, oy=28, pw=258, ph=138;
    const all=series.flatMap(s=>s.pts);
    const x1=Math.max(...all.map(p=>p[0]), 1e-6);
    const y1=Math.max(...all.map(p=>p[1]), 1);
    const xy=(x,y)=>[ox+x/x1*pw, oy+ph-y/y1*ph];
    const gid=uid||'a6';
    const tick=function(x,y,t,anchor){
      return `<text x="${x}" y="${y}" text-anchor="${anchor||'end'}" font-size="10" fill="${MUTED}" font-family="Georgia,serif">${t}</text>`;
    };
    const grid=[0,0.25,0.5,0.75,1].map(f=>{
      const y=oy+ph-f*ph;
      return `<line x1="${ox}" y1="${y}" x2="${ox+pw}" y2="${y}" stroke="#1e3a32" stroke-width="${f===0?1.4:1}"/>`+
        tick(ox-8, y+3, String(Math.round(y1*f)).replace('.',','));
    }).join('');
    const xt=[0,0.5,1].map(f=>{
      const x=ox+f*pw;
      return `<line x1="${x}" y1="${oy+ph}" x2="${x}" y2="${oy+ph+5}" stroke="#4a6a58"/>`+
        tick(x, oy+ph+16, String(+(x1*f).toFixed(x1>=100?0:1)).replace('.',','), 'middle');
    }).join('');
    const paths=series.map((s,i)=>{
      const d=s.pts.map((p,j)=>{const q=xy(p[0],p[1]); return (j?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1);}).join(' ');
      const last=xy(s.pts[s.pts.length-1][0], 0), first=xy(s.pts[0][0], 0);
      const area=d+` L ${last[0].toFixed(1)} ${last[1].toFixed(1)} L ${first[0].toFixed(1)} ${first[1].toFixed(1)} Z`;
      return `<path class="a6fill" d="${area}" fill="url(#${gid}f${i})" />
        <path class="a6line" d="${d}" fill="none" stroke="url(#${gid}s${i})" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" filter="url(#${gid}glow)"/>`;
    }).join('');
    let mark='';
    if(xMark!=null && yMark!=null){
      const q=xy(xMark, yMark);
      mark=`<circle class="a6halo" cx="${q[0]}" cy="${q[1]}" r="8" fill="none" stroke="${GOLD}" stroke-width="1.2"/>
        <circle class="a6dot" cx="${q[0]}" cy="${q[1]}" r="5.2" fill="${GOLD}" stroke="#fff6c8" stroke-width="1"/>
        <rect x="${Math.min(Math.max(q[0]+10, ox+8), ox+pw-90)}" y="${Math.max(q[1]-30, oy+4)}" width="88" height="22" rx="8" fill="rgba(7,16,24,.88)" stroke="rgba(217,164,65,.5)"/>
        ${lab(Math.min(Math.max(q[0]+54, ox+52), ox+pw-46), Math.max(q[1]-14, oy+20), String(yMark).replace('.',',')+' Н', GOLD, 'middle', 11)}`;
    }
    const legend=series.map((s,i)=>`<g>
      <rect x="${ox+i*110}" y="198" width="10" height="10" rx="2" fill="${s.col}"/>
      ${lab(ox+16+i*110, 208, s.name, MUTED, 'start', 11)}
    </g>`).join('');
    const defs=series.map((s,i)=>`
      <linearGradient id="${gid}s${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${s.col}"/><stop offset="1" stop-color="#fff3c0"/></linearGradient>
      <linearGradient id="${gid}f${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${s.col}" stop-opacity="0"/><stop offset="1" stop-color="${s.col}" stop-opacity=".32"/></linearGradient>`).join('');
    try{ window._waveCss && _waveCss('css-a6v1', CSS); }catch(e){}
    return `${CSS}<svg viewBox="0 0 ${W} ${H}" style="width:min(100%,340px);height:auto;background:radial-gradient(120% 80% at 50% 0%,#163028 0%,#071018 70%);border-radius:16px;display:block;margin:0 auto;border:1px solid #3d5c49">
      <defs>
        <filter id="${gid}glow"><feGaussianBlur stdDeviation="1.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        ${defs}
      </defs>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" rx="12" fill="rgba(7,16,24,.25)"/>
      ${grid}${xt}
      <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy+ph}" stroke="#7fd1ff" stroke-opacity=".35" stroke-width="1.4"/>
      <line x1="${ox}" y1="${oy+ph}" x2="${ox+pw}" y2="${oy+ph}" stroke="#7fd1ff" stroke-opacity=".35" stroke-width="1.4"/>
      ${paths}${mark}${legend}
      ${lab(ox+pw/2, 16, yl, GOLD, 'middle', 12)}
      ${lab(ox+pw/2, H-6, xl, MUTED, 'middle', 11)}
    </svg>`;
  }

  function visB106(el){
    try{ window._waveCss && _waveCss('css-a6v1', CSS); }catch(e){}
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'106';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const V=Math.max(0.05, Math.min(1, +(st.V==null?0.2:st.V)));
    const rho=+(st.rho==null?1000:st.rho);
    const F=FA(rho,V);
    const Fw=FA(1000,V);
    let h='';

    if(step===0){
      h=`<div class="wv-col">
        ${physShot('eureka.mp4','вода полезла через край')}
        ${pred(st,'p0','Почему вылезла вода?',[{k:'vol',t:'тело заняло место'},{k:'w',t:'потому что тяжёлое'},{k:'heat',t:'вода нагрелась'}])}
        ${st.p0?note('Эврика','Объём вытесненной воды равен объёму погружённой части. Не масса — объём. Корона и ванна.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('pool.mp4','в воде поднимать легче')}
        ${pred(st,'p1','Куда толкает вода?',[{k:'up',t:'вверх'},{k:'down',t:'вниз'},{k:'side',t:'в стороны и всё'}])}
        ${st.p1?note('Вверх','Сила Архимеда против тяжести. Давление снизу больше, чем сверху — равнодействующая вверх.'):note('Предскажи','Не путай со давлением «во все стороны».')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('overflow.mp4','вытесненный объём = погружённый')}
        ${note('Вес жидкости','F_A равна весу той воды, что вылилась в стакан. Не весу кубика.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('scale_w.mp4','F_A = ρ_ж · g · V')}
        ${note('Три множителя','ρ жидкости, не тела. g ≈ 10. V — только погружённая часть. Вода: 1000 · 10 · V.')}
      </div>`;
    } else if(step===4){
      const hid=st.hid||'';
      const map={F:'F = ρ · g · V', V:'V = F / (ρ · g)', rho:'ρ = F / (g · V)'};
      h=`<div class="wv-col">
        ${physShot('tri.jpg', hid?map[hid]:'F наверху')}
        <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center">
          ${[['F','закрыть F'],['V','закрыть V'],['rho','закрыть ρ']].map(x=>`<button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].hid='${x[0]}';chRender(0);}catch(e){}">${x[1]}</button>`).join('')}
        </div>
        ${note('Треугольник','Ищешь силу — умножай. Ищешь объём — дели F на ρg.')}
      </div>`;
    } else if(step===5){
      const pts=Array.from({length:11},(_,i)=>[i/10, FA(1000,i/10)]);
      h=`<div class="wv-col">
        ${physShot(V>0.6?'iron.mp4':'scale_w.mp4', 'V = '+String(V).replace('.',',')+' м³  ·  F = '+F+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">V
          <input type="range" min="5" max="100" value="${Math.round(V*100)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].V=this.value/100;CHS[k].rho=1000;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(V).replace('.',',')} м³</b>
        </label>
        ${chart([{pts, col:GOLD, name:'F_A в воде'}], V, Fw, 'V, м³', 'сила Архимеда', 'fv')}
        ${note('Прямая','Удвоил объём — удвоил силу. График из той же модели F = 1000·10·V.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('scale_w.jpg','0,2 м³ · 2000 Н')}
        ${note('Проверка','1000 · 10 · 0,2 = 2000 Н. Не 200 и не 20000.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('overflow.jpg','больше V — сильнее толкает')}
        ${chart([{pts:[[0.1,1000],[0.2,2000],[0.5,5000],[1,10000]], col:BLUE, name:'F_A'}], 0.5, 5000, 'V, м³', 'Н', 'bars')}
        ${note('Четыре точки','0,1 → 1000 Н; 0,2 → 2000; 0,5 → 5000; 1 → 10 000. Объём стоит прямо в формуле.')}
      </div>`;
    } else if(step===8){
      const pts=[[800,4000],[900,4500],[1000,5000],[1030,5150],[1240,6200]];
      const F5=FA(rho,0.5);
      h=`<div class="wv-col">
        ${physShot(rho>1100?'deadsea.mp4':'oil.mp4', 'ρ = '+rho+'  ·  V = 0,5 м³  ·  F = '+F5+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">ρ
          <input type="range" min="800" max="1240" step="10" value="${rho}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].rho=+this.value;CHS[k].V=0.5;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${rho}</b>
        </label>
        ${chart([{pts, col:GREEN, name:'F_A при V = 0,5'}], rho, F5, 'ρ жидкости', 'сила Архимеда', 'fr')}
        ${note('Плотнее жидкость','Керосин 800, вода 1000, море 1030, Мёртвое море 1240. Одна ручка — ρ жидкости.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${pred(st,'p9','0,5 м³ в керосине против воды. F_A в керосине?',[{k:'less',t:'меньше'},{k:'same',t:'такая же'},{k:'more',t:'больше'}])}
        ${st.p9?physShot('oil.mp4','керосин 4000 Н · вода 5000 Н'):''}
        ${st.p9?note('Легче жидкость','800 · 10 · 0,5 = 4000 Н. '+(st.p9==='less'?'Угадал.':'Смотри ρ жидкости, не тела.')):note('Предскажи','Такой же объём, другая жидкость.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('deadsea.mp4','ρ ≈ 1240 · человек легче рассола')}
        ${note('Мёртвое море','Соль подняла плотность жидкости выше средней плотности тела. F_A > mg — не тонет.')}
      </div>`;
    } else if(step===11){
      const mg=10000, fa=5000;
      const ptsW=[[0,0],[1,mg]], ptsA=[[0,0],[1,fa]];
      h=`<div class="wv-col">
        ${physShot('scales.mp4','кажущийся вес = mg − F_A')}
        ${chart([{pts:ptsW, col:RED, name:'вес mg'},{pts:ptsA, col:GOLD, name:'F_A воды'}], 1, fa, 'погружение', 'силы', 'ww')}
        ${note('Две линии','Красная — вес. Золотая — выталкивание. Если красная выше — тонет. Весы в воде показывают разность.')}
      </div>`;
    } else if(step===12){
      const air=!!st.air;
      h=`<div class="wv-col">
        ${physShot(air?'boat.mp4':'iron.mp4', air?'среднее ρ < 1 · F_A держит':'сплошная сталь · тонет')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].air=1;chRender(0);}catch(e){}">${air?'Плывёт':'Сделать корпус'}</button>
        ${note('Полый объём','Сталь 7800, но внутри воздух. V огромный — F_A = ρgV_корпуса больше веса.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot(st.sub?'sub.mp4':'fish.mp4', st.sub?'цистерны · среднее ρ':'пузырь · объём')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].sub=1;chRender(0);}catch(e){}">${st.sub?'Лодка':'Как рыба'}</button>
        ${note('Управление объёмом','Надула пузырь — V больше — F_A выросла — всплыла. Лодка травит воду в цистерны — среднее ρ растёт — тонет.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('balloon.mp4','воздух тоже выталкивает')}
        ${note('Аэростатика','F_A = ρ_возд · g · V, ρ ≈ 1,3 кг/м³. Гелий или тёплый воздух легче окружающего — шар идёт вверх. Без тяжести Архимед не работает.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('scale_w.mp4','0,2 м³ в воде · F_A = ?')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','ρ жидкости, не тела',GOLD],['2','V погружённый',BLUE],['3','F = ρgV',GREEN],['4','сравни с весом mg',MUTED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">сила в ньютонах?</div>
        ${note('Проверка','2000 Н. Дело в вытесненной воде, не в «тяжёлом железе».')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[106]=visB106;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===106){ arr[i]=L106; f=true; break; } }
    if(!f) arr.push(L106);
  })();
})();
/* ================= УРОК 107 · Механическая энергия ================= */
(function(){
  const L107 = {
    id: 107, title: 'Механическая энергия', ico: '🎢',
    src: 'Физика · 8–9 класс · Механическая энергия', subj: 'phys',
    explain: [
      'Загадка горки: вагончик подняли наверх — и он сам летит вниз. Топливо не бензин. Это энергия: запас, из которого можно сделать работу.',
      'Работа A = F · s. Поднял груз — совершил работу, запасся потенциальной энергией. Единица — джоуль.',
      'Два вида. Eп — энергия положения: камень на обрыве, лук, вагончик наверху. Eк — энергия движения: летящий мяч, едущая машина.',
      'Eк = m v² / 2. Секрет — скорость в квадрате. Удвоил v — энергия в 4 раза. Поэтому авария на большой скорости так тяжёлая.',
      'Одна ручка — скорость. График Eк(v) — парабола, не прямая. m = 2 кг: v = 2 → 4 Дж, v = 4 → 16 Дж.',
      'Eп = m g h. g ≈ 10. Выше или тяжелее — запас больше. 2 кг на 5 м → 100 Дж.',
      'Проверка: 3 кг на 2 м → 60 Дж. Не 30 и не 12.',
      'Пружина тоже: Eп = k x² / 2. Лук, рогатка, батут. Сильнее сжал — x², запас растёт быстро.',
      'Маятник: в крайней точке вся энергия потенциальная, внизу вся кинетическая. На горке высота меняется на скорость.',
      'Закон сохранения: без трения Eп + Eк = const. Наверху 100 и 0, в середине 40 и 60, внизу 0 и 100. Сумма одна.',
      'Трение съедает механическую: рельсы греются. Энергия не исчезла — ушла во внутреннюю. Полный закон всеобщий.',
      'Считаем Eк: 4 кг, 3 м/с. Сначала v² = 9, потом 4 · 9 / 2 = 18 Дж.',
      'Ищем высоту: Eп = 150 Дж, m = 5 кг → h = 150 / (5 · 10) = 3 м. Сначала буква.',
      'ГЭС: вода на плотине — Eп. Падая — Eк. Турбина — электричество. Ветер, маятник часов — те же превращения.',
      'Мощность N = A / t. Ватт — джоуль в секунду. Лампочка 60 Вт, человек ~500 Вт.',
      'Рецепт. Движение — Eк = mv²/2. Высота — Eп = mgh. Пружина — kx²/2. Сумма без трения постоянна.'
    ],
    check: { q: 'Потенциальная энергия груза массой 3 кг на высоте 2 м? (в Дж, g = 10)', choices: ['30','60','12'], ans: 1,
      exp: 'E = m · g · h = 3 · 10 · 2 = 60 Дж.' },
    tasks: [
      { q: 'Кинетическая энергия тела массой 4 кг, движущегося со скоростью 3 м/с? (в Дж)', kind: 'unit', ans: 18, tol: 0,
        hints: ['Сначала v² = 9.', 'E = 4 · 9 / 2.'], sol: '18 Дж' },
      { q: 'Груз массой 5 кг, Eп = 150 Дж. Высота? (в м, g = 10)', kind: 'choice',
        choices: ['3','30','0,3'], ans: 0, hints: ['h = E / (m g).', '150 / 50 = 3.'], sol: '3 м' },
      { q: 'm = 2 кг, v = 4 м/с. Eк? (в Дж)', kind: 'unit', ans: 16, tol: 0,
        hints: ['Eк = m v² / 2.', 'v² = 16, 2·16/2 = 16.'], sol: '16 Дж' },
      { q: 'Наверху Eп = 100 Дж, Eк = 0. Внизу без трения Eк?', kind: 'choice',
        choices: ['0','50','100'], ans: 2, hints: ['Сумма постоянна.', 'Внизу вся кинетическая.'], sol: '100 Дж' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const EK=(m,v)=>Math.round(0.5*m*v*v*1000)/1000;
  const EP=(m,h)=>Math.round(m*10*h*1000)/1000;
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function visB107(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'107';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const v=Math.max(0.5, Math.min(8, +(st.v==null?2:st.v)));
    const hh=Math.max(0.5, Math.min(5, +(st.h==null?5:st.h)));
    const m=2;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('e_top.mp4','наверху запас')}
        ${pred(st,'p0','Откуда разгон вниз?',[{k:'e',t:'из энергии высоты'},{k:'eng',t:'из мотора'},{k:'air',t:'из ветра'}])}
        ${st.p0?note('Запас','Подняли — совершили работу. Этот запас и есть потенциальная энергия. Мотор на спуске не нужен.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('e_winch.mp4','A = F · s')}
        ${note('Работа','Сила на путь. Поднял цилиндр — запасся. Джоуль — единица работы и энергии: одно имя, потому что работа меняет энергию.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('e_kinds.mp4','положение и движение')}
        ${pred(st,'p2','Камень на обрыве. Какая энергия?',[{k:'p',t:'потенциальная'},{k:'k',t:'кинетическая'},{k:'none',t:'никакая, он стоит'}])}
        ${st.p2?note('Два вида','Стоит на высоте — Eп. Летящий мяч — Eк. «Стоит» не значит «нуль»: есть запас высоты.'):note('Предскажи','Не путай покой и ноль энергии.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('e_car.mp4','Eк = m v² / 2')}
        ${note('Квадрат','Сначала v², потом · m / 2. Удвоил скорость — не вдвое, а вчетверо. Это не опечатка.')}
      </div>`;
    } else if(step===4){
      const ek=EK(m,v);
      const pts=Array.from({length:17},(_,i)=>{const x=i/2; return [x, EK(m,x)];});
      h=`<div class="wv-col">
        ${physShot(v>4?'e_crash.mp4':'e_car.mp4', 'm = 2 кг  ·  v = '+String(v).replace('.',',')+' м/с  ·  Eк = '+ek+' Дж')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">v
          <input type="range" min="5" max="80" value="${Math.round(v*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].v=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(v).replace('.',',')} м/с</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'Eк при m = 2'}], v, ek, 'v, м/с', 'кинетическая', 'ek', 'Дж')}
        ${note('Парабола','Не прямая. v = 2 → 4 Дж, v = 4 → 16 Дж. Четыре скорости — шестнадцать энергий.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('e_crash.mp4','v в квадрате')}
        ${physChart([{pts:[[1,1],[2,4],[3,9],[4,16]], col:RED, name:'Eк, m = 2 кг'}], 4, 16, 'v, м/с', 'джоули', 'sq', 'Дж')}
        ${note('Почему опасно','4 м/с против 1 м/с — не в 4 раза, а в 16. Энергия удара растёт с квадратом.')}
      </div>`;
    } else if(step===6){
      const ep=EP(m,hh);
      const pts=Array.from({length:11},(_,i)=>[i*0.5, EP(m,i*0.5)]);
      h=`<div class="wv-col">
        ${physShot(hh>2.5?'e_cliff.mp4':'e_low.mp4', 'm = 2 кг  ·  h = '+String(hh).replace('.',',')+' м  ·  Eп = '+ep+' Дж')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">h
          <input type="range" min="5" max="50" value="${Math.round(hh*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(hh).replace('.',',')} м</b>
        </label>
        ${physChart([{pts, col:BLUE, name:'Eп при m = 2'}], hh, ep, 'h, м', 'потенциальная', 'ep', 'Дж')}
        ${note('Прямая','Eп = m g h. Удвоил высоту — удвоил запас. Не квадрат: высота входит в первой степени.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('e_mass.mp4','3 кг · 2 м · Eп = ?')}
        ${note('Проверка','3 · 10 · 2 = 60 Дж. Не 30 (забыл g) и не 12 (перепутал с кинетической).')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('e_bow.mp4','лук: Eп = k x² / 2')}
        ${note('Упругая','Сжал сильнее — x². Как у скорости: квадрат. Рогатка, батут, пружина часов — тот же запас.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('e_tramp.mp4','батут вернул запас')}
        ${note('Туда-сюда','Полотно сжато — Eп упругости. Распрямилось — стало Eк. Потом снова высота. Энергия перетекает, не исчезает.')}
      </div>`;
    } else if(step===10){
      const lo=!!st.lo;
      h=`<div class="wv-col">
        ${physShot(lo?'e_pendlo.mp4':'e_pend.mp4', lo?'внизу вся кинетическая':'в крайней — вся потенциальная')}
        <button type="button" class="btn" onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].lo=1;chRender(0);}catch(e){}">${lo?'Внизу':'Отпустить'}</button>
        ${note('Маятник','Край: v = 0, вся Eп. Низ: h минимальна, вся Eк. Сумма одна, если нет трения оси.')}
      </div>`;
    } else if(step===11){
      const ep=EP(m,hh), tot=EP(m,5), ek=Math.max(0, tot-ep);
      const pEp=Array.from({length:11},(_,i)=>{const x=i*0.5; return [x, EP(m,x)];});
      const pEk=Array.from({length:11},(_,i)=>{const x=i*0.5; return [x, tot-EP(m,x)];});
      h=`<div class="wv-col">
        ${physShot(hh>3?'e_top.mp4':(hh>1.5?'e_drop.mp4':'e_bot.mp4'), 'Eп = '+ep+'  ·  Eк = '+ek+'  ·  сумма '+tot+' Дж')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">h
          <input type="range" min="0" max="50" value="${Math.round(hh*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].h=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(hh).replace('.',',')} м</b>
        </label>
        ${physChart([{pts:pEp,col:BLUE,name:'Eп'},{pts:pEk,col:GOLD,name:'Eк'}], hh, ep, 'h, м', 'сохранение, 100 Дж', 'cons', 'Дж')}
        ${note('Две линии','Синяя падает, золотая растёт. Сумма 100 Дж на любой высоте. Без трения.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('e_fric.mp4','трение греет')}
        ${pred(st,'p12','Куда делась энергия?',[{k:'heat',t:'в тепло'},{k:'gone',t:'исчезла'},{k:'sound',t:'только в звук'}])}
        ${st.p12?note('Не исчезла','Механическая уменьшилась, внутренняя выросла. Полный закон всеобщий: виды меняются, сумма мира нет.'):note('Предскажи','Вагончик внизу чуть медленнее идеального.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('e_car.mp4','4 кг · 3 м/с')}
        ${note('Счёт','v² = 9. 4 · 9 = 36. 36 / 2 = 18 Дж. Сначала квадрат, потом половина произведения.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('e_dam.mp4','Eп воды → Eк → ток')}
        ${note('ГЭС','Вода на плотине — высота. Падая — скорость. Турбина и генератор. Ветер, маятник часов — те же превращения.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('e_bot.mp4','3 кг · 2 м · Eп = ?')}
        <div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">
          ${[['1','движение: mv²/2',GOLD],['2','высота: mgh',BLUE],['3','пружина: kx²/2',GREEN],['4','сумма без трения const',MUTED]].map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${GOLD};font-size:18px">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')}
        </div>
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">энергия в джоулях?</div>
        ${note('Проверка','60 Дж. Потенциальная, не кинетическая.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[107]=visB107;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===107){ arr[i]=L107; f=true; break; } }
    if(!f) arr.push(L107);
  })();
})();
/* ================= УРОК 108 · Химия вокруг нас ================= */
(function(){
  const L108 = {
    id: 108, title: 'Химия вокруг нас: вещества и опыты', ico: '⚗️',
    src: 'Химия · 5–6 класс · Введение в химию', subj: 'chem',
    explain: [
      'Загадка гвоздя: один блестит, другой рыжий. Это уже не то же железо. Химия отвечает: из чего состоит, какими свойствами и во что превращается.',
      'Тело — предмет формы: стакан, линза, окно. Вещество — материал: стекло. Из одного вещества делают разные тела.',
      'Вещество узнают по свойствам: цвет, блеск, твёрдость, плотность, температура плавления, растворимость, проводимость. Не пробуй на вкус.',
      'Три состояния. Лёд, вода, пар — одно вещество. Нагрели — плавится и кипит. Охладили — обратно. Состояние меняется, вещество нет.',
      'Химия — наука опыта. Сначала наблюдают: цвет, газ, осадок. Потом ставят опыт, записывают условия, делают вывод.',
      'Посуда: пробирка — мало, стакан — раствор, колба — реакция, цилиндр — объём. Стекло прозрачное — видно цвет и пузырьки.',
      'Нагревают на спиртовке. Пробирку в держателе, сначала всю, потом у дна. Отверстие — в сторону от себя и соседей.',
      'Растворение: соль исчезает в воде — прозрачный раствор. Частицы смешались на уровне молекул. Отстаиванием не разделишь.',
      'Фильтрование: воронка с бумагой задерживает песок, вода проходит. Делит неоднородную смесь.',
      'Выпаривание: вода уходит паром, на дне кристаллы. Так добывают соль из моря.',
      'Признаки реакции: цвет, газ, осадок, тепло, запах. Если признаков нет — скорее физическое явление.',
      'Физическое: лёд тает, стекло разбилось — вещество то же. Химическое: ржавеет, горит — появились новые вещества.',
      'Смеси: однородные (раствор, воздух) и неоднородные (песок в воде, дым). Делят отстаиванием, фильтром, выпариванием, магнитом.',
      'Магнит вынимает железные опилки из серы. Способ физический: вещества не изменились.',
      'Измеряют: массу — весы, объём — цилиндр, температуру — термометр. Без записи опыт нельзя повторить.',
      'Безопасность: халат, не пробуй на вкус, нюхай ладонью, кислоты без указания учителя не смешивай. При ожоге — холодная вода.'
    ],
    check: { q: 'Что такое ВЕЩЕСТВО?', choices: ['то, из чего состоит тело','предмет определённой формы','любой прибор','смесь воды и песка'], ans: 0,
      exp: 'Тело — предмет (гвоздь, стакан), вещество — материал, из которого тело сделано (железо, стекло).' },
    tasks: [
      { q: 'Сколько агрегатных состояний у воды в опыте: лёд, вода, пар? Напиши число.', kind: 'unit', ans: 3, tol: 0,
        hints: ['Посчитай: лёд, жидкость, пар.'], sol: '3' },
      { q: 'Каким способом из мутной воды с песком получили прозрачную воду? Напиши 1 — фильтрование, 2 — выпаривание.', kind: 'unit', ans: 1, tol: 0,
        hints: ['Через воронку с бумагой — фильтрование.'], sol: '1' },
      { q: 'Признак химической реакции: выпал осадок? Напиши 1 — да, 2 — нет.', kind: 'unit', ans: 1, tol: 0,
        hints: ['Осадок — один из главных признаков.'], sol: '1' },
      { q: 'Таяние льда — химическая реакция?', kind: 'choice',
        choices: ['да, вещество новое','нет, вода осталась водой','да, потому что тепло'], ans: 1,
        hints: ['Вещество то же — H₂O.', 'Меняется только состояние.'], sol: 'нет, вода осталась водой' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB108(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'108';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('c_nails.mp4','один блестит · другой рыжий')}
        ${pred(st,'p0','Ржавый гвоздь — всё ещё то же железо?',[{k:'no',t:'уже другое вещество'},{k:'yes',t:'то же, только цвет'}])}
        ${st.p0?note('Химия','Ржавчина — новое вещество. Химия как раз про такие превращения: из чего, какими свойствами, во что стало.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('c_glass.mp4','стакан · линза · стекло')}
        ${pred(st,'p1','Стакан — это?',[{k:'body',t:'тело'},{k:'sub',t:'вещество'}])}
        ${st.p1?note('Два слова','Тело — предмет формы. Вещество — материал. Стакан, линза и окно — разные тела из одного вещества: стекла.'):note('Предскажи','Не путай предмет и материал.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('c_copper.mp4','медь: лист, порошок, проволока')}
        ${cards([['цвет и блеск','узнают с первого взгляда',GOLD],['плотность, t плавления','числа в таблице',BLUE],['растворимость, ток','как ведёт себя',GREEN]])}
        ${note('Паспорт','Свойства отличают вещества. На вкус в лаборатории не пробуют — никогда.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('c_states.mp4','лёд · вода · пар')}
        ${pred(st,'p3','Сколько веществ на столе?',[{k:'1',t:'одно — вода'},{k:'3',t:'три разных'}])}
        ${st.p3?note('Состояния','Лёд, жидкость и пар — одно вещество в трёх агрегатных состояниях. Нагрел — туда, охладил — обратно.'):note('Предскажи','Считай вещества, не сосуды.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('c_ware.mp4','пробирка · стакан · колба · цилиндр')}
        ${cards([['пробирка','мало вещества',GOLD],['стакан','растворы',BLUE],['колба','реакции',GREEN],['цилиндр','объём',MUTED]])}
        ${note('Стекло','Прозрачное — видно цвет, осадок и пузырьки. Без наблюдения опыт слепой.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('c_heat.mp4','спиртовка · держатель')}
        ${note('Нагрев','Сначала всю пробирку, потом у дна. Отверстие — в сторону от себя и соседей. Иначе брызги при кипении.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('c_salt.mp4','соль исчезает · раствор')}
        ${pred(st,'p6','Соль в воде. Это смесь?',[{k:'one',t:'однородная'},{k:'two',t:'неоднородная, крупинки видны'}])}
        ${st.p6?note('Раствор','Частицы смешались на уровне молекул. Отстаиванием не разделишь. Песок в воде — другое дело.'):note('Предскажи','Видно ли крупинки после размешивания?')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('c_filter.mp4','песок остаётся · вода проходит')}
        ${note('Фильтр','Воронка с бумагой делит неоднородную смесь. Раствор соли так не разделишь — частицы слишком малы.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('c_evap.mp4','вода — пар · соль — кристаллы')}
        ${note('Выпаривание','Из раствора сухое вещество. Так добывают соль из моря. Вода ушла, вещество на дне.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('c_bub.mp4','пузырьки · признак реакции')}
        ${cards([['газ','пузырьки, шипение',GOLD],['осадок','муть на дне',BLUE],['цвет','стал другим',GREEN],['тепло, запах','ощутил',RED]])}
        ${note('Признаки','Если ничего из списка нет — скорее всего, явление физическое.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('c_ppt.mp4','выпал жёлтый осадок')}
        ${pred(st,'p10','Осадок в пробирке. Это?',[{k:'chem',t:'признак реакции'},{k:'phys',t:'просто отстоялось'}])}
        ${st.p10?note('Новое вещество','Осадок — одно из главных доказательств: появилось то, чего не было. Не путай с песком, который насыпали.'):note('Предскажи','Появилось ли новое?')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('c_vs.mp4','лёд тает · железо ржавеет')}
        ${pred(st,'p11','Таяние льда — реакция?',[{k:'no',t:'нет, вода та же'},{k:'yes',t:'да, потому что тепло'}])}
        ${st.p11?note('Две полки','Физическое меняет форму или состояние. Химическое рождает новые вещества. Ржавчина — химия. Лёд — нет.'):note('Предскажи','Вещество то же или новое?')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('c_sand.mp4','песок оседает')}
        ${note('Неоднородная','Песок и вода видны по отдельности. Отстаивание — первый способ. Потом фильтр, если нужно быстрее.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('c_mag.mp4','железо к магниту · сера остаётся')}
        ${note('Магнит','Физический способ: вещества не изменились, только разъехались. Опилки — железо, жёлтый порошок — сера.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('c_scale.mp4','масса · температура · объём')}
        ${note('Измеряют','Весы — граммы. Цилиндр — миллилитры. Термометр — градусы. Без записи опыт нельзя повторить.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('c_safe.mp4','халат · очки · не пробуй')}
        ${cards([['1','тело ≠ вещество',GOLD],['2','три состояния воды',BLUE],['3','фильтр / выпаривание / магнит',GREEN],['4','газ, осадок, цвет — реакция',MUTED]])}
        ${note('Итог','Вещество узнают по свойствам. Реакцию — по признакам. В лаборатории измеряют, наблюдают и не нюхают из горла колбы.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[108]=visB108;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===108){ arr[i]=L108; f=true; break; } }
    if(!f) arr.push(L108);
  })();
})();
/* ================= УРОК 109 · Смеси и их разделение ================= */
(function(){
  const L109 = {
    id: 109, title: 'Смеси и их разделение', ico: '🍵',
    src: 'Химия · 5–6 класс · Смеси', subj: 'chem',
    explain: [
      'Речная вода мутная. Как получить чистую? Смесь разделяют, используя различия в свойствах веществ — они в смеси свои свойства не теряют.',
      'Неоднородная: компоненты видны (песок в воде, масло на воде). Однородная: раствор соли, воздух — на глаз одно.',
      'Правило: найди, чем вещества отличаются, — и бери метод. Плотность, размер частиц, магнитность, температура кипения, смачивание.',
      'Отстаивание: тяжёлое оседает, лёгкое всплывает. Песок на дно, масло вверх. Декантация — слили верхний слой.',
      'Фильтрование: пористый фильтр пропускает жидкость, задерживает твёрдые частицы. Осадок на бумаге, фильтрат в колбе.',
      'Соль фильтр не остановит: частицы слишком малы. Сначала фильтр от песка, потом выпаривание — соль на дне.',
      'Магнит: железо тянется, сера и песок нет. Физический способ — вещества не изменились.',
      'Выпаривание: растворитель уходит паром, твёрдое остаётся. Кристаллизация — если охладить насыщенный раствор.',
      'Перегонка (дистилляция): кипит — пар — охладили — снова жидкость. Так получают дистиллированную воду. Другая t кипения — другой компонент.',
      'Хроматография: вещества бегут по бумаге с разной скоростью. Чернила распадаются на цвета. Цветки — на пигменты.',
      'Адсорбция: уголь держит запах и краску. Фильтр кувшина, противогаз — тот же принцип.',
      'Масса не пропадает: 10 г песка + 90 г воды = 100 г смеси. Сложили части — получили целое.',
      'Неоднородные: отстаивание, фильтр, магнит, флотация. Однородные: выпаривание, перегонка, хроматография.',
      'Выбирай метод по различию, не наугад. Песок и вода — фильтр. Соль и вода — выпаривание. Железо и сера — магнит.',
      'В жизни: очистка воды, соль из моря, бензин на заводе, анализ чернил. Везде — свойства.',
      'Рецепт. Видно компоненты — неоднородная. Не видно — однородная. Потом: плотность / размер / магнит / кипение.'
    ],
    check: { q: 'Как отделить песок от воды?', choices: ['Выпариванием','Фильтрованием','Магнитом','Нагреванием'], ans: 1,
      exp: 'Песчинки останутся на фильтре, а вода пройдёт сквозь него.' },
    tasks: [
      { q: 'Как вернуть соль из солёной воды?', kind: 'choice',
        choices: ['Фильтрованием','Выпариванием','Магнитом','Отстаиванием'], ans: 1,
        hints: ['Соль растворена — она прошла бы через фильтр.','Воду нужно испарить.'], sol: 'При выпаривании вода уходит, соль остаётся.' },
      { q: 'На фильтре 10 г песка, сквозь фильтр прошло 90 г воды. Масса смеси? (в г)', kind: 'unit', ans: 100, tol: 0,
        hints: ['Масса смеси = песок + вода.','10 + 90 = 100.'], sol: '100 г' },
      { q: 'Железные опилки и сера. Чем разделить?', kind: 'choice',
        choices: ['фильтром с водой','магнитом','выпариванием'], ans: 1,
        hints: ['Железо магнитное, сера нет.'], sol: 'магнитом' },
      { q: 'Дистиллированную воду получают', kind: 'choice',
        choices: ['фильтрованием','перегонкой','магнитом'], ans: 1,
        hints: ['Пар охладили — снова жидкость, без примесей.'], sol: 'перегонкой' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB109(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'109';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('s_mud.mp4','мутная речная вода')}
        ${pred(st,'p0','Как получить чистую?',[{k:'wait',t:'просто подождать'},{k:'prop',t:'использовать свойства'}])}
        ${st.p0?note('Ключ','В смеси вещества свои свойства не теряют. Песок тяжёлый и крупный — его можно осадить и отфильтровать.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('s_two.mp4','слева раствор · справа взвесь')}
        ${pred(st,'p1','Правый стакан — смесь?',[{k:'het',t:'неоднородная'},{k:'hom',t:'однородная'}])}
        ${st.p1?note('Два типа','Видно крупинки — неоднородная. Соль исчезла — однородная. Методы у них разные.'):note('Предскажи','Видно ли компоненты?')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('s_piles.mp4','песок · соль · железо')}
        ${cards([['плотность','отстаивание',GOLD],['размер частиц','фильтр',BLUE],['магнитность','магнит',GREEN],['t кипения','перегонка',MUTED]])}
        ${note('Правило','Найди, чем отличаются — и бери метод. Не наугад.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('s_settle.mp4','песок на дне')}
        ${note('Отстаивание','Тяжёлое оседает, лёгкое всплывает. Потом декантация: осторожно слили верх. Медленно, но без приборов.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('s_oil.mp4','масло сверху')}
        ${pred(st,'p4','Почему масло не тонет?',[{k:'d',t:'плотность меньше'},{k:'m',t:'магнитное'}])}
        ${st.p4?note('Две жидкости','Масло легче воды — слой сверху. Делят отстаиванием или делительной воронкой. Не фильтром: оба жидкие.'):note('Предскажи','Что отличается?')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('s_filter.mp4','осадок на бумаге · фильтрат в колбе')}
        ${note('Фильтр','Поры пропускают жидкость, задерживают твёрдые. Песок остаётся, вода проходит. Раствор соли так не остановишь.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('s_mix.mp4','песок + соль')}
        ${pred(st,'p6','Сначала какой шаг?',[{k:'f',t:'фильтр с водой'},{k:'e',t:'сразу выпарить'},{k:'m',t:'магнит'}])}
        ${st.p6?note('Два шага','Вода растворит соль. Фильтр заберёт песок. Потом выпаривание — соль на дне. Один метод не справится.'):note('Предскажи','Одно отличие или два?')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('s_mag.mp4','железо к магниту · сера остаётся')}
        ${note('Магнит','Железо магнитное, сера нет. Вещества не изменились — только разъехались. Физический способ.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('s_evap.mp4','вода — пар · соль — корка')}
        ${pred(st,'p8','Соль из раствора. Чем?',[{k:'e',t:'выпариванием'},{k:'f',t:'фильтром'},{k:'s',t:'отстаиванием'}])}
        ${st.p8?note('Выпаривание','Растворитель уходит, твёрдое остаётся. Фильтр бесполезен: соль уже прошла сквозь бумагу вместе с водой.'):note('Предскажи','Частицы соли видны?')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('s_xtal.mp4','кристаллы выросли')}
        ${note('Кристаллизация','Насыщенный раствор охладили — вещество выпало красивыми кристаллами. Тот же принцип: растворитель и растворённое ведут себя по-разному.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('s_still.mp4','пар → холодильник → чистая вода')}
        ${note('Перегонка','Кипит — пар — охладили — снова жидкость. Примеси остаются. Так получают дистиллированную воду и разделяют жидкости с разной t кипения.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('s_chrom.mp4','чернила распались на цвета')}
        ${note('Хроматография','Вещества бегут по бумаге с разной скоростью: кто сильнее держится — отстаёт. Чернила, пигменты листа, анализ смеси.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('s_char.mp4','уголь держит краску')}
        ${note('Адсорбция','Поверхность угля ловит молекулы запаха и цвета. Фильтр кувшина, противогаз. Не путай с фильтрованием песка: тут ловят растворённое.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('s_mass.mp4','10 г + 90 г')}
        ${note('Масса','Смесь = сумма частей. 10 г песка + 90 г воды = 100 г. Разделили — массы сложи обратно. Ничего не исчезло.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('s_tools.mp4','метод по различию')}
        ${pred(st,'p14','Песок и вода. Чем?',[{k:'f',t:'фильтр'},{k:'e',t:'выпаривание'},{k:'m',t:'магнит'}])}
        ${st.p14?note('Выбор','Песок крупный и нерастворим — фильтр. Соль растворена — выпаривание. Железо — магнит. Смотри на свойство.'):note('Предскажи','Какое свойство отличается?')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('s_water.mp4','чистая вода')}
        ${cards([['1','неоднородная: фильтр, отстой, магнит',GOLD],['2','однородная: выпаривание, перегонка',BLUE],['3','хроматография — разные скорости',GREEN],['4','масса смеси = сумма частей',MUTED]])}
        ${note('Итог','Вещества в смеси свойства сохраняют. Найди различие — выбери метод.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[109]=visB109;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===109){ arr[i]=L109; f=true; break; } }
    if(!f) arr.push(L109);
  })();
})();
/* ================= УРОК 101 · Сила тяжести и вес ================= */
(function(){
  const L101 = {
    id: 101, title: 'Сила тяжести и вес тела', ico: '🏋️',
    src: 'Физика · 7 класс · Сила тяжести и вес', subj: 'phys',
    explain: [
      'Яблоко падает вниз, не вверх. Земля притягивает все тела — это сила тяжести. Направлена к центру Земли.',
      'F = m · g. m — килограммы, g — сколько ньютонов на каждый килограмм. На Земле g ≈ 10 Н/кг.',
      '1 кг → 10 Н, 2 кг → 20 Н, 3 кг → 30 Н. Массу умножили на десять — получили силу.',
      'Проверка: 4 кг → 40 Н. Не 4 и не 400: g = 10, не 1 и не 100.',
      'Наоборот: m = F : g. 120 Н → 12 кг. Силу делим на десять.',
      'Динамометр — пружина со шкалой. Чем сильнее тянет, тем длиннее пружина. Единица силы — ньютон.',
      'Вес P — сила, с которой тело давит на опору или тянет подвес. Стоишь — давишь на пол своим весом.',
      'В покое P = m g. Но это разные силы: тяжесть приложена к телу, вес — к опоре или шнуру.',
      'На Луне g ≈ 1,6 Н/кг — примерно в 6 раз меньше. 6 кг там тянет всего ~10 Н.',
      'Масса не меняется: 6 кг и на Земле, и на Луне. Меняется только сила тяжести.',
      'На орбите опора исчезает — невесомость. Вес ноль, а сила тяжести всё ещё есть: без неё станция улетела бы по прямой.',
      'Лифт разгоняется вверх — вес растёт, «прижимает». Тормозит — вес падает. Масса одна и та же.',
      '7 кг → 70 Н. 5 кг → 50 Н. 20 кг → 200 Н. Всегда × 10.',
      '60 Н → 6 кг, 100 Н → 10 кг. Всегда : 10.',
      'g точнее 9,8 Н/кг, в задачах 7 класса берут 10. Ньютон — в честь Исаака Ньютона.',
      'Рецепт. F = m g. Покой: P = F. Масса — свойство тела. Вес — про опору. Невесомость — нет опоры, не нет тяжести.'
    ],
    check: { q: 'Сила тяжести, действующая на тело массой 4 кг? (в Н, g = 10)', choices: ['4','40','400'], ans: 1,
      exp: 'F = m · g = 4 · 10 = 40 Н.' },
    tasks: [
      { q: 'Сила тяжести на тело массой 7 кг? (в Н, g = 10)', kind: 'unit', ans: 70, tol: 0,
        hints: ['F = m · g.','7 · 10 = ?'], sol: '70 Н' },
      { q: 'Масса тела, если сила тяжести 120 Н? (в кг, g = 10)', kind: 'choice',
        choices: ['12','1,2','1200'], ans: 0, hints: ['m = F : g.','120 : 10 = ?'], sol: '12 кг' },
      { q: '5 кг. Сила тяжести? (в Н, g = 10)', kind: 'unit', ans: 50, tol: 0,
        hints: ['Умножь массу на 10.'], sol: '50 Н' },
      { q: 'На Луне g ≈ 1,6 Н/кг. Сила тяжести на 10 кг? (в Н)', kind: 'unit', ans: 16, tol: 0,
        hints: ['F = m · g.','10 · 1,6 = 16.'], sol: '16 Н' },
      { q: 'Космонавт на орбите. Его вес?', kind: 'choice',
        choices: ['равен силе тяжести','равен нулю','масса стала нулём'], ans: 1,
        hints: ['Опоры нет — вес ноль.','Масса и тяжесть никуда не делись.'], sol: 'равен нулю' },
      { q: 'Лифт разгоняется вверх. Вес пассажира?', kind: 'choice',
        choices: ['растёт','падает','масса растёт'], ans: 0,
        hints: ['Прижимает к полу — вес больше.','Масса не меняется.'], sol: 'растёт' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const Fg=(m,g)=>Math.round(m*g*10)/10;
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB101(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'101';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const m=Math.max(1, Math.min(12, +(st.m==null?4:st.m)));
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('g_fall.mp4','падает вниз, не вверх')}
        ${pred(st,'p0','Почему вниз?',[{k:'e',t:'Земля притягивает'},{k:'air',t:'воздух толкает'},{k:'w',t:'яблоко устало'}])}
        ${st.p0?note('Тяжесть','Земля тянет все тела к своему центру. Это сила тяжести. Ньютон описал её как всемирное тяготение.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('g_globe.mp4','к центру Земли')}
        ${note('Направление','Всегда вниз, к центру. На другом конце планеты «вниз» — тоже к центру, не «под нас».')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('g_stack.mp4','F = m · g')}
        ${cards([['m','масса, кг',GOLD],['g','≈ 10 Н/кг на Земле',BLUE],['F','сила, ньютоны',GREEN]])}
        ${note('g','Сколько ньютонов на каждый килограмм. 1 кг → 10 Н, 3 кг → 30 Н. Умножили массу на десять.')}
      </div>`;
    } else if(step===3){
      const F=Fg(m,10);
      const pts=Array.from({length:13},(_,i)=>[i, i*10]);
      h=`<div class="wv-col">
        ${physShot(m>=7?'g_seven.mp4':(m>=4?'g_four.mp4':'g_stack.mp4'), 'm = '+m+' кг  ·  F = '+F+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">m
          <input type="range" min="1" max="12" value="${m}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].m=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${m} кг</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'F = 10 · m'}], m, F, 'm, кг', 'сила тяжести', 'fg', 'Н')}
        ${note('Прямая','Удвоил массу — удвоил силу. Не квадрат: g постоянна, F растёт линейно.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('g_four.mp4','4 кг · F = ?')}
        ${note('Проверка','4 · 10 = 40 Н. Не 4 (забыл g) и не 400 (g не 100).')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('g_twelve.mp4','120 Н → m = ?')}
        ${pred(st,'p5','120 Н. Масса?',[{k:'12',t:'12 кг'},{k:'1200',t:'1200 кг'},{k:'1',t:'1,2 кг'}])}
        ${st.p5?note('Наоборот','m = F : g = 120 : 10 = 12 кг. Силу делим на десять.'):note('Предскажи','g = 10.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('g_dyn.mp4','пружина тянется')}
        ${note('Динамометр','Пружина со шкалой. Чем сильнее сила — тем длиннее пружина. Ньютон — единица силы, в честь Исаака Ньютона.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('g_scale.mp4','давишь на опору')}
        ${pred(st,'p7','Вес — это сила на?',[{k:'sup',t:'опору или подвес'},{k:'body',t:'само тело'},{k:'air',t:'воздух'}])}
        ${st.p7?note('Вес P','Тело давит на пол или тянет шнур. Это вес. Тяжесть приложена к телу, вес — к опоре. В покое числа равны, точки приложения разные.'):note('Предскажи','Куда приложена сила?')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('g_hang.mp4','вес на шнуре')}
        ${note('Покой','P = m g. Шнур тянет вверх с той же силой, с какой Земля тянет вниз. Равновесие. Две силы, одно число.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('g_moon.mp4','g ≈ 1,6 Н/кг')}
        ${note('Луна','Притяжение слабее примерно в 6 раз. 6 кг там → около 10 Н. На Земле те же 6 кг → 60 Н.')}
      </div>`;
    } else if(step===10){
      const Fe=Fg(m,10), Fm=Fg(m,1.6);
      const pE=Array.from({length:13},(_,i)=>[i, i*10]);
      const pM=Array.from({length:13},(_,i)=>[i, Math.round(i*1.6*10)/10]);
      h=`<div class="wv-col">
        ${physShot('g_split.mp4', 'm = '+m+' кг  ·  Земля '+Fe+' Н  ·  Луна '+Fm+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">m
          <input type="range" min="1" max="12" value="${m}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].m=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${m} кг</b>
        </label>
        ${physChart([{pts:pE,col:GOLD,name:'Земля, g = 10'},{pts:pM,col:BLUE,name:'Луна, g = 1,6'}], m, Fe, 'm, кг', 'сила тяжести', 'gm', 'Н')}
        ${note('Масса одна','Ползунок не меняет массу — меняет только две силы. 6 кг есть 6 кг везде.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('g_astro.mp4','опора исчезла')}
        ${pred(st,'p11','На орбите вес?',[{k:'0',t:'ноль'},{k:'g',t:'как на Земле'},{k:'m0',t:'масса стала нулём'}])}
        ${st.p11?note('Невесомость','Вес — про опору. Опоры нет — вес ноль. Сила тяжести есть: без неё станция улетела бы по прямой. Масса та же.'):note('Предскажи','Вес и тяжесть — не одно и то же.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('g_lift.mp4','лифт')}
        ${pred(st,'p12','Разгон вверх. Вес?',[{k:'up',t:'растёт'},{k:'dn',t:'падает'},{k:'m',t:'растёт масса'}])}
        ${st.p12?note('Перегрузка','Разгон вверх — пол давит сильнее, вес растёт. Торможение — «отпускает». Масса не менялась ни на грамм.'):note('Предскажи','Что чувствуешь в лифте?')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('g_seven.mp4','7 кг · F = ?')}
        ${note('Счёт','7 · 10 = 70 Н. 5 кг → 50 Н, 20 кг → 200 Н. Всегда × 10.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('g_twelve.mp4','120 Н · m = ?')}
        ${note('Обратно','120 : 10 = 12 кг. 60 Н → 6 кг, 100 Н → 10 кг. Всегда : 10.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('g_still.mp4','4 кг · F = ?')}
        ${cards([['1','F = m g, g ≈ 10',GOLD],['2','вес — на опору',BLUE],['3','масса не от планеты',GREEN],['4','невесомость ≠ нет тяжести',MUTED]])}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">сила в ньютонах?</div>
        ${note('Проверка','40 Н. Тяжесть 4 кг на Земле.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[101]=visB101;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===101){ arr[i]=L101; f=true; break; } }
    if(!f) arr.push(L101);
  })();
})();
/* ================= УРОК 252 · Мощность ================= */
(function(){
  const L252 = {
    id: 252, title: 'Мощность: кто быстрее делает работу', ico: '🏗️',
    src: 'Физика · 7 класс · Работа и мощность', subj: 'phys',
    explain: [
      'Два крана поднимают одинаковый блок на один этаж. Работа одна: груз и высота те же. Первый — 20 с, второй — 5 с. Разница не в работе, а в быстроте.',
      'Эта быстрота — мощность N. Сколько работы за одну секунду. N = A : t. A — джоули, t — секунды.',
      'Единица — ватт: 1 Вт = 1 Дж за 1 с. Поднять яблоко на метр за секунду — примерно 1 Вт. Это мало.',
      'Медленный кран: 800 Дж за 20 с → 800 : 20 = 40 Вт.',
      'Быстрый: та же 800 Дж за 5 с → 160 Вт. Время в 4 раза меньше — мощность в 4 раза больше.',
      'График N(t) при той же работе — гипербола: чем дольше, тем меньше мощность. Не прямая.',
      'Треугольник: сверху A, снизу N · t. Закрой неизвестное: N = A:t, A = N·t, t = A:N.',
      'Обратно. Мотор 500 Вт работал 6 с → A = 500 · 6 = 3000 Дж.',
      'Время: 1200 Дж при 300 Вт → t = 1200 : 300 = 4 с.',
      'Как сделана работа — не важно. Медленный и быстрый подъём одной плиты: работа одна, мощность разная.',
      '1 кВт = 1000 Вт, 1 МВт = 1 000 000 Вт. Лампа 60 Вт, чайник 2000 Вт, автомобиль ~100 кВт.',
      'Лошадиная сила ≈ 735 Вт. Чайник — примерно 2,7 «лошади». Старая единица, до ватта.',
      'Счётчик считает энергию. 1 кВт за 1 час = 1 кВт·ч. Мощный прибор крутит диск быстрее.',
      'Чайник 2000 Вт кипит 3 минуты, лампа 20 Вт горит 5 часов. Энергии может уйти поровну, мощность разная в 100 раз.',
      'Шаги: выпиши A и t, время в секундах, N = A : t, в кВт — раздели на 1000. Пример: 1500 Дж за 5 с → 300 Вт.',
      'Рецепт. N = A : t. Ватт — джоуль в секунду. Быстрее та же работа — больше мощность.'
    ],
    check: { q: 'Работа 2400 Дж выполнена за 8 с. Какова мощность?',
      choices: ['300 Вт','19200 Вт','2408 Вт','8 Вт'], ans: 0,
      exp: 'N = A : t = 2400 : 8 = 300 Вт.' },
    tasks: [
      { q: 'Кран: работа 3600 Дж за 12 с. Мощность (Вт)?', kind: 'unit', ans: 300, tol: 0,
        hints: ['N = A : t.','3600 : 12 = 300.'], sol: '300 Вт' },
      { q: 'Мотор 800 Вт работал 5 с. Работа (Дж)?', kind: 'unit', ans: 4000, tol: 0,
        hints: ['A = N · t.','800 · 5 = 4000.'], sol: '4000 Дж' },
      { q: 'Работа 6000 Дж, мощность 1500 Вт. Время (с)?', kind: 'unit', ans: 4, tol: 0,
        hints: ['t = A : N.','6000 : 1500 = 4.'], sol: '4 с' },
      { q: '800 Дж за 20 с. Мощность (Вт)?', kind: 'unit', ans: 40, tol: 0,
        hints: ['800 : 20.'], sol: '40 Вт' },
      { q: 'Та же 800 Дж за 5 с. Мощность (Вт)?', kind: 'unit', ans: 160, tol: 0,
        hints: ['Время в 4 раза меньше — мощность в 4 раза больше.'], sol: '160 Вт' },
      { q: '1 кВт — это сколько ватт?', kind: 'choice',
        choices: ['100','1000','1000000'], ans: 1,
        hints: ['кило — тысяча.'], sol: '1000 Вт' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB252(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'252';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const t=Math.max(4, Math.min(40, +(st.t==null?20:st.t)));
    const A=800;
    const N=Math.round((A/t)*10)/10;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('n_two.mp4','один этаж · разное время')}
        ${pred(st,'p0','Работа у кранов?',[{k:'same',t:'одинаковая'},{k:'fast',t:'у быстрого больше'}])}
        ${st.p0?note('Ключ','Груз и высота те же — работа одна. Разница в быстроте. Эту быстроту и назовём мощностью.'):note('Предскажи','Что одинаково, что нет?')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('n_crane.mp4','N = A : t')}
        ${cards([['A','работа, джоули',GOLD],['t','время, секунды',BLUE],['N','мощность, ватты',GREEN]])}
        ${note('Формула','Работу делим на время. Сколько джоулей успели за одну секунду.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('n_apple.mp4','1 Вт ≈ яблоко на метр за секунду')}
        ${note('Ватт','1 Вт = 1 Дж / 1 с. Это мало. Лампочка — десятки ватт, чайник — тысячи, машина — сотни тысяч.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('n_slow.mp4','800 Дж · 20 с')}
        ${note('Медленный','800 : 20 = 40 Вт. Работу делим на время. Не умножаем: 800 · 20 было бы 16000, это не мощность.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('n_fast.mp4','800 Дж · 5 с')}
        ${pred(st,'p4','Мощность быстрого?',[{k:'160',t:'160 Вт'},{k:'40',t:'тоже 40'},{k:'4',t:'4 Вт'}])}
        ${st.p4?note('В четыре раза','Время в 4 раза меньше — мощность в 4 раза больше. 800 : 5 = 160 Вт. Быстрее та же работа — мощнее.'):note('Предскажи','800 : 5.')}
      </div>`;
    } else if(step===5){
      const pts=[[4,200],[5,160],[8,100],[10,80],[16,50],[20,40],[25,32],[32,25],[40,20]];
      h=`<div class="wv-col">
        ${physShot(t<=8?'n_fast.mp4':'n_slow.mp4', 'A = 800 Дж  ·  t = '+t+' с  ·  N = '+N+' Вт')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">t
          <input type="range" min="4" max="40" value="${t}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].t=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${t} с</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'N = 800 / t'}], t, N, 't, с', 'мощность', 'hyp', 'Вт')}
        ${note('Гипербола','Не прямая. Дольше — меньше мощность. Та же работа размазана по времени.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('n_watch.mp4','треугольник A, N, t')}
        ${cards([['N = A : t','мощность',GOLD],['A = N · t','работа',BLUE],['t = A : N','время',GREEN]])}
        ${note('Палец','Сверху A, снизу N · t. Закрой неизвестное — получишь формулу.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('n_motor.mp4','500 Вт · 6 с')}
        ${note('Работа','A = N · t = 500 · 6 = 3000 Дж. Мощность на время. Не делить.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('n_watch.mp4','1200 Дж · 300 Вт')}
        ${pred(st,'p8','Сколько секунд?',[{k:'4',t:'4 с'},{k:'360',t:'360 с'},{k:'0',t:'0,25 с'}])}
        ${st.p8?note('Время','t = A : N = 1200 : 300 = 4 с. Работу делим на мощность.'):note('Предскажи','Закрой t в треугольнике.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('n_slab.mp4','плита та же · время разное')}
        ${note('Работа одна','Медленно или быстро — плита на этаже. Работа от пути и силы, не от часов. Мощность — как раз про часы.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('n_fil.mp4','лампа десятки ватт')}
        ${cards([['лампа','10–60 Вт',GOLD],['чайник','2000 Вт',BLUE],['авто','~100 кВт',GREEN],['1 кВт','1000 Вт',MUTED]])}
        ${note('Шкала','кило — тысяча, мега — миллион. Машина мощнее чайника в 50 раз, чайник мощнее лампы в 30.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('n_horse.mp4','1 л.с. ≈ 735 Вт')}
        ${note('Лошадиная сила','Старая единица, до ватта. Чайник 2000 Вт ≈ 2,7 л.с. Джеймс Уатт как раз сравнивал машины с лошадьми.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('n_meter.mp4','счётчик считает энергию')}
        ${note('кВт·ч','1 киловатт за 1 час = 1 кВт·ч. Мощность — быстрота, энергия — сколько накрутили. Мощный прибор крутит диск быстрее.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('n_boil.mp4','чайник 3 мин · лампа 5 ч')}
        ${pred(st,'p13','У кого больше мощность?',[{k:'k',t:'у чайника'},{k:'l',t:'у лампы'},{k:'eq',t:'одинаковая'}])}
        ${st.p13?note('Разные вещи','Чайник мощнее в 100 раз, но работает минуты. Лампа слабая, но часами. Энергии может уйти поровну.'):note('Предскажи','Мощность или энергия?')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('n_block.mp4','1500 Дж · 5 с')}
        ${note('Пример','1) A = 1500, t = 5. 2) время уже в секундах. 3) N = 1500 : 5 = 300 Вт. 4) 0,3 кВт, если нужно.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('n_still.mp4','2400 Дж · 8 с · N = ?')}
        ${cards([['1','N = A : t',GOLD],['2','ватт = джоуль в секунду',BLUE],['3','быстрее — мощнее',GREEN],['4','1000 Вт = 1 кВт',MUTED]])}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">мощность в ваттах?</div>
        ${note('Проверка','300 Вт. 2400 : 8. Не умножать.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[252]=visB252;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===252){ arr[i]=L252; f=true; break; } }
    if(!f) arr.push(L252);
  })();
})();
/* ================= УРОК 103 · Сила трения ================= */
(function(){
  const L103 = {
    id: 103, title: 'Сила трения', ico: '🧤',
    src: 'Физика · 7 класс · Сила трения', subj: 'phys',
    explain: [
      'Коньки скользят, машина на льду буксует. Невидимая сила то помогает, то мешает — сила трения. Возникает при соприкосновении, направлена против движения.',
      'Измерить можно динамометром: тяни брусок равномерно — стрелка покажет ньютоны.',
      'Под микроскопом даже полированный металл — бугорки и ямки. Выступы цепляются, как липучки.',
      'Три вида: покоя (шкаф стоит, и ходить можно), скольжения (санки), качения (колёса, подшипник).',
      'Катить легче, чем тащить: качение в 5–10 раз меньше скольжения. Поэтому у машин колёса, не полозья.',
      'Шершавость: лёд и полировка — мало зацепок. Резина и песок — много. Гладко → меньше, шершаво → больше.',
      'Сила прижатия: прижал сильнее — бугорки глубже — трение больше. Пропорционально. Удвоил массу — удвоил трение.',
      'Сюрприз: от площади соприкосновения трение почти не зависит. Узкий брусок и широкий — при той же массе сила одна.',
      '2 кг → 4 Н. Положили ещё 2 кг → 8 Н. Прижатие вдвое — трение вдвое.',
      'Друг: без трения покоя нельзя ходить, гвоздь не держится, спичка не зажигается, карандаш не пишет.',
      'Враг: детали снашиваются, греются, машина ест лишнее топливо. Потри ладони — жар.',
      'Увеличить: песок на льду, протектор, канифоль, мел скалолаза. Уменьшить: масло, подшипники, полировка.',
      'Лёд скользкий: лезвие давит сильно — тонкая плёнка воды. Подошва давит слабо — лёд не тает, трение больше.',
      'Тормоза — трение колодок о диск. Мокрая дорога — вода как смазка, путь длиннее.',
      'Сухой стакан в руке держится крепче мокрого. Геккон держится на стекле волосками.',
      'Рецепт. Зависит от шершавости и прижатия, не от площади. Качение < скольжения. Масло уменьшает, песок увеличивает.'
    ],
    check: { q: 'Что увеличивает силу трения?',
      choices: ['Гладкая отполированная поверхность','Шершавая поверхность','Смазка (масло)'], ans: 1,
      exp: 'Шершавые поверхности цепляются друг за друга сильнее — трение больше.' },
    tasks: [
      { q: 'Что уменьшает силу трения?', kind: 'choice',
        choices: ['Песок на дороге','Шершавые поверхности','Смазка (масло)'], ans: 2,
        hints: ['Смазка заполняет неровности.'], sol: 'смазка' },
      { q: 'Груз 2 кг, трение 4 Н. Положили ещё 2 кг. Трение (Н)?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Прижатие вдвое.','4 · 2 = 8.'], sol: '8 Н' },
      { q: 'Трение качения по сравнению со скольжением?', kind: 'choice',
        choices: ['больше','в 5–10 раз меньше','равно'], ans: 1,
        hints: ['Катить легче, чем тащить.'], sol: 'в 5–10 раз меньше' },
      { q: 'От площади соприкосновения трение зависит?', kind: 'choice',
        choices: ['да, больше площадь — больше трение','почти нет','только на льду'], ans: 1,
        hints: ['Сюрприз 7 класса: не зависит.'], sol: 'почти нет' },
      { q: 'Без какого трения нельзя ходить?', kind: 'choice',
        choices: ['качения','покоя','скольжения'], ans: 1,
        hints: ['Нога не должна скользить назад.'], sol: 'покоя' },
      { q: '3 кг давали 6 Н. Масса стала 9 кг. Трение (Н)?', kind: 'unit', ans: 18, tol: 0,
        hints: ['Масса втрое.','6 · 3 = 18.'], sol: '18 Н' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB103(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'103';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const m=Math.max(1, Math.min(8, +(st.m==null?2:st.m)));
    const F=2*m;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('f_ice.mp4','коньки едут · машина буксует')}
        ${pred(st,'p0','Что мешает и помогает?',[{k:'fr',t:'трение'},{k:'g',t:'тяжесть'},{k:'air',t:'ветер'}])}
        ${st.p0?note('Невидимая','Возникает при соприкосновении, направлена против движения. То друг, то враг.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('f_pull.mp4','тяни равномерно')}
        ${note('Динамометр','Брусок едет ровно — стрелка показывает силу трения в ньютонах. Лабораторная работа 7 класса.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('f_bump.mp4','бугорки даже на «гладком»')}
        ${note('Липучки','Под микроскопом полированный металл — гребни. Выступы заходят в ямки. Чем шершавее, тем крепче зацеп.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('f_cab.mp4','шкаф стоит — трение покоя')}
        ${cards([['покой','держит, помогает ходить',GOLD],['скольжение','санки, брусок',BLUE],['качение','колёса, шарики',GREEN]])}
        ${note('Три вида','Покой — пока не сдвинул. Скольжение — уже едет. Качение — крутится.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('f_roll.mp4','шарики vs полозья')}
        ${pred(st,'p4','Что легче?',[{k:'roll',t:'катить'},{k:'slide',t:'тащить'}])}
        ${st.p4?note('В 5–10 раз','Качение меньше скольжения. Поэтому у машин колёса, а не полозья, и в узлах — подшипники.'):note('Предскажи','Полозья или шарики?')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('f_sand.mp4','шершавое vs гладкое')}
        ${note('Шершавость','Лёд и полировка — мало зацепок. Резина, песок, наждак — много. Гладко → меньше трение.')}
      </div>`;
    } else if(step===6){
      const pts=Array.from({length:9},(_,i)=>[i, 2*i]);
      h=`<div class="wv-col">
        ${physShot('f_mass.mp4', 'm = '+m+' кг  ·  Fтр = '+F+' Н')}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">m
          <input type="range" min="1" max="8" value="${m}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].m=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${m} кг</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'Fтр = 2 · m'}], m, F, 'm, кг', 'сила трения', 'fr', 'Н')}
        ${note('Прямая','Удвоил массу — удвоил прижатие — удвоил трение. 2 кг → 4 Н, 4 кг → 8 Н.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('f_area.mp4','узкий и широкий')}
        ${pred(st,'p7','Площадь больше. Трение?',[{k:'no',t:'почти то же'},{k:'yes',t:'больше'},{k:'less',t:'меньше'}])}
        ${st.p7?note('Сюрприз','При той же массе сила почти не зависит от площади. Узкий и широкий брусок тянут одинаково.'):note('Предскажи','Не путай с давлением.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('f_mass.mp4','2 кг → 4 Н · ещё 2 кг?')}
        ${note('Счёт','Прижатие вдвое → трение вдвое: 4 · 2 = 8 Н. 3 кг давали 6 Н, стало 9 кг → 18 Н.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('f_match.mp4','без трения спичка не вспыхнет')}
        ${cards([['ходить','покой держит ногу',GOLD],['гвоздь','не выскальзывает',BLUE],['карандаш','оставляет след',GREEN],['спичка','зажигается',RED]])}
        ${note('Друг','Без трения покоя мир разъехался бы.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('f_wear.mp4','шестерни стираются')}
        ${note('Враг','Снашивание, нагрев, лишнее топливо. Потри ладони — жар. Часть механической энергии ушла в тепло.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('f_grit.mp4','песок на льду')}
        ${note('Увеличить','Песок, протектор, канифоль, мел скалолаза. Делаем поверхность шершавее — зацепок больше.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('f_oil.mp4','масло между бугорками')}
        ${pred(st,'p12','Масло делает трение?',[{k:'dn',t:'меньше'},{k:'up',t:'больше'}])}
        ${st.p12?note('Уменьшить','Смазка заполняет ямки — поверхности не цепляются. Подшипники меняют скольжение на качение. Полировка сглаживает бугорки.'):note('Предскажи','Зацепки или плёнка?')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('f_blade.mp4','плёнка воды под лезвием')}
        ${note('Лёд','Лезвие давит сильно — лёд подплавляется, конёк едет по воде. Подошва давит слабо — не тает, трение больше. Поэтому на коньках, не босиком.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('f_brake.mp4','колодки жмут диск')}
        ${note('Тормоза','Трение специально включают. Мокрая дорога — вода как смазка, путь длиннее. Сухой стакан в руке держится крепче мокрого.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('f_still.mp4','что увеличивает трение?')}
        ${cards([['1','шершавость ↑ → трение ↑',GOLD],['2','прижатие ↑ → трение ↑',BLUE],['3','площадь почти ни при чём',GREEN],['4','качение < скольжения, масло уменьшает',MUTED]])}
        ${note('Проверка','Шершавая поверхность. Не масло и не полировка.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[103]=visB103;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===103){ arr[i]=L103; f=true; break; } }
    if(!f) arr.push(L103);
  })();
})();
/* ================= УРОК 10 · Средняя скорость ================= */
(function(){
  const L10 = {
    id: 10, title: 'Средняя скорость', ico: '🚴',
    src: 'Физика · движение · средняя скорость', subj: 'phys',
    explain: [
      'В школу 30 км/ч, обратно 20. Многие считают (30+20):2 = 25. Не торопись — проверь на числах.',
      'Путь туда 60 км и обратно 60. Весь путь 120 км. Половинки равные — это важно.',
      'Туда: t₁ = 60 : 30 = 2 ч. Быстро — времени мало.',
      'Обратно: t₂ = 60 : 20 = 3 ч. Медленно — на час дольше.',
      '120 км за 2+3 = 5 ч. v = 120 : 5 = 24 км/ч. Не 25.',
      'Медленный участок занял 3 часа из пяти. Он «весит» в средней больше и тянет её вниз.',
      'Формула для двух равных путей: v = 2 v₁ v₂ / (v₁ + v₂). Это гармоническое среднее.',
      'Подставим: 2·30·20 / (30+20) = 1200 / 50 = 24. Совпало.',
      'Всегда меньше полусуммы (30+20):2 = 25. Если вышло больше — ошибся.',
      'Полпути 12 и полпути 6: 2·12·6 / 18 = 8. Не 9.',
      'Равные пути → гармоническое. Равные времена → обычное среднее (30+20):2 = 25. Не путай.',
      '40 и 60: 2·40·60 / 100 = 48. Не 50.',
      'Средняя скорость — весь путь на всё время. Не среднее скоростей, если равны пути.',
      'Единицы: км/ч или м/с. 1 м/с = 3,6 км/ч. Сначала приведи к одним.',
      'Ловушка: (v₁+v₂):2 только если равны времена, не пути.',
      'Рецепт. Равные пути: 2ab/(a+b). Равные времена: (a+b)/2. Честно: S : t.'
    ],
    check: { q: 'Половину пути ехали 12 км/ч, половину — 6 км/ч. Средняя скорость?',
      choices: ['8','9','12','18'], ans: 0,
      exp: '2·12·6/(12+6) = 144/18 = 8 км/ч.' },
    tasks: [
      { q: 'Половину пути 30 км/ч, половину 20 км/ч. Средняя?', kind: 'unit', ans: 24, tol: 0.05,
        hints: ['v = 2·v₁·v₂/(v₁+v₂).','1200 : 50 = 24.'], sol: '24 км/ч' },
      { q: 'Половину пути 40 км/ч, половину 60 км/ч. Средняя?', kind: 'unit', ans: 48, tol: 0.05,
        hints: ['2·40·60 = 4800; 40+60 = 100.'], sol: '48 км/ч' },
      { q: 'Полпути 12 км/ч и полпути 6 км/ч. Средняя?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Не 9. Это гармоническое.'], sol: '8 км/ч' },
      { q: 'Час ехали 30, час — 20. Средняя?', kind: 'choice',
        choices: ['24','25','20'], ans: 1,
        hints: ['Равны времена, не пути.','(30+20):2.'], sol: '25 км/ч' },
      { q: 'Полусумма 30 и 20. Чему равна?', kind: 'unit', ans: 25, tol: 0,
        hints: ['Это ловушка для равных путей.'], sol: '25, но средняя по пути 24' },
      { q: '60 км за 2 ч и 60 км за 3 ч. Средняя (км/ч)?', kind: 'unit', ans: 24, tol: 0,
        hints: ['120 : 5.'], sol: '24 км/ч' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  const harm=(a,b)=>Math.round(2000*a*b/(a+b))/1000;
  const arith=(a,b)=>Math.round((a+b)*5)/10;
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function visB10(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'10';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const a=Math.max(6, Math.min(60, +(st.a==null?30:st.a)));
    const b=Math.max(6, Math.min(60, +(st.b==null?20:st.b)));
    const vh=harm(a,b), va=arith(a,b);
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('v_dawn.mp4','туда 30 · обратно 20')}
        ${pred(st,'p0','Средняя?',[{k:'25',t:'25 км/ч'},{k:'24',t:'надо считать путь и время'}])}
        ${st.p0?note('Не торопись','Полусумма 25 кажется очевидной. Проверим на километрах и часах.'):note('Предскажи','Сначала карточка.')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('v_road.mp4','60 км туда · 60 км обратно')}
        ${note('Равные пути','Весь путь 120 км. Половинки равные — это условие гармонического среднего. Не равные времена.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('v_fast.mp4','60 : 30 = 2 ч')}
        ${note('Быстрый участок','t = S : v. Едем быстро — часов мало. 2 часа на первую половину.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('v_slow.mp4','60 : 20 = 3 ч')}
        ${note('Медленный','Та же 60 км, скорость меньше — времени больше. 3 часа. Уже видно: медленный «весит» дольше.')}
      </div>`;
    } else if(step===4){
      h=`<div class="wv-col">
        ${physShot('v_watch.mp4','120 км · 5 ч')}
        ${pred(st,'p4','Средняя?',[{k:'24',t:'24 км/ч'},{k:'25',t:'25 км/ч'}])}
        ${st.p4?note('Честно','v = S : t = 120 : 5 = 24 км/ч. Не 25. Средняя — путь на время, не среднее скоростей.'):note('Предскажи','120 : 5.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('v_split.mp4','3 часа медленно · 2 быстро')}
        ${note('Почему вниз','Медленный участок занял 3 часа из пяти. Он тянет среднюю вниз. Поэтому 24, а не 25.')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('v_gauge.mp4','v = 2 v₁ v₂ / (v₁ + v₂)')}
        ${cards([['1','две половины пути равны',GOLD],['2','сложить времена S/v₁ + S/v₂',BLUE],['3','весь путь 2S на сумму времён',GREEN]])}
        ${note('Гармоническое','Не путай с (v₁+v₂):2. Эта формула — только для равных путей.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('v_comp.mp4','2 · 30 · 20 / 50')}
        ${note('Подставили','1200 : 50 = 24. Совпало с 120 : 5. Формула — сокращённый честный счёт.')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('v_pair.mp4','всегда меньше полусуммы')}
        ${note('Проверка','(30+20):2 = 25. Гармоническое всегда ниже, пока скорости разные. Если получил 26 — ошибся.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('v_rain.mp4','12 и 6')}
        ${pred(st,'p9','Полпути 12 и 6. Средняя?',[{k:'8',t:'8'},{k:'9',t:'9'}])}
        ${st.p9?note('Не 9','2·12·6 / 18 = 8. Полусумма 9 — ловушка. Медленные 6 км/ч заняли вдвое больше времени.'):note('Предскажи','Не полусумма.')}
      </div>`;
    } else if(step===10){
      const pH=Array.from({length:12},(_,i)=>{const x=6+i*5; return [x, harm(a,x)];});
      const pA=Array.from({length:12},(_,i)=>{const x=6+i*5; return [x, arith(a,x)];});
      h=`<div class="wv-col">
        ${physShot(b<a?'v_slow.mp4':'v_fast.mp4', 'v₁ = '+a+'  ·  v₂ = '+b+'  ·  гармонич. '+vh+'  ·  полусумма '+va)}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">v₁
          <input type="range" min="6" max="60" value="${a}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].a=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${a}</b>
        </label>
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">v₂
          <input type="range" min="6" max="60" value="${b}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].b=+this.value;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${b}</b>
        </label>
        ${physChart([{pts:pH,col:GOLD,name:'гармоническое'},{pts:pA,col:BLUE,name:'полусумма'}], b, vh, 'v₂', 'средняя', 'hm', '')}
        ${note('Две линии','Золотая всегда ниже синей, пока v₁ ≠ v₂. Крути — увидишь, как медленный тянет вниз.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('v_hour.mp4','равные времена')}
        ${pred(st,'p11','Час на 30 и час на 20. Средняя?',[{k:'25',t:'25'},{k:'24',t:'24'}])}
        ${st.p11?note('Другой случай','Равны времена — среднее арифметическое: (30+20):2 = 25. Формула 2ab/(a+b) здесь не нужна.'):note('Предскажи','Пути или часы равны?')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('v_high.mp4','40 и 60')}
        ${note('Счёт','2·40·60 / 100 = 48. Не 50. Снова ниже полусуммы.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('v_mile.mp4','v = S : t')}
        ${note('Определение','Средняя скорость — весь путь на всё время. Формулы — сокращения. Если сомневаешься, сложи пути и часы.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('v_map.mp4','ловушка полусуммы')}
        ${cards([['равные пути','2ab / (a+b)',GOLD],['равные времена','(a+b) / 2',BLUE],['вообще','S : t',GREEN]])}
        ${note('Не путай','Задача почти всегда про равные пути. Полусумма — самая частая ошибка.')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('v_still.mp4','12 и 6 · средняя?')}
        ${cards([['1','весь путь : всё время',GOLD],['2','равные пути → гармоническое',BLUE],['3','всегда ниже полусуммы',GREEN],['4','равные времена → (a+b)/2',MUTED]])}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">скорость?</div>
        ${note('Проверка','8 км/ч. Не 9.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[10]=visB10;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===10){ arr[i]=L10; f=true; break; } }
    if(!f) arr.push(L10);
  })();
})();
/* ================= УРОК 102 · Давление твёрдых тел ================= */
(function(){
  const L102 = {
    id: 102, title: 'Давление твёрдых тел: сила и площадь', ico: '🎿',
    src: 'Физика · 7 класс · Давление твёрдых тел', subj: 'phys',
    explain: [
      'На лыжах не проваливаешься, босиком — да. Сила та же, вес тот же. Меняется площадь. Давление — сила на единицу площади.',
      'p = F : S. F в ньютонах, S в квадратных метрах. Чем больше площадь, тем меньше давление при той же силе.',
      'Единица — паскаль: 1 Па = 1 Н / 1 м². В честь Блеза Паскаля. Килопаскаль — тысяча паскалей.',
      '60 Н на 3 м² → 60 : 3 = 20 Па. Силу делим на площадь, не умножаем.',
      'Та же 60 Н на 1 м² — 60 Па, на 3 м² — 20 Па. Площадь втрое — давление втрое меньше.',
      'Нож режет, потому что кромка тонкая. Та же сила руки на крошечной площади — огромное давление.',
      'Лыжи наоборот: широкая площадь, маленькое давление, снег держит. Чем шире — тем мягче.',
      'Проверка: 80 Н на 4 м² → 20 Па. Не 320 (это умножили) и не 84 (сложили).',
      'Треугольник: сверху F, снизу p · S. F = p S, p = F : S, S = F : p.',
      '40 Па на 5 м² → F = 40 · 5 = 200 Н. 100 Н при 20 Па → S = 5 м².',
      'Гвоздь и кнопка: остриё крошечное — давление огромное, входит легко.',
      'Танк не проваливается: гусеницы — огромная площадь. Фундамент дома широкий — та же идея.',
      'Иголка шприца острая, шины широкие, лыжи, коньки — везде меняют площадь, не силу.',
      '100 Н на 2 м² → 50 Па. Давление падает, когда площадь растёт.',
      'График p(S) при постоянной F — гипербола: больше S — меньше p.',
      'Рецепт. p = F : S. Площадь ↑ давление ↓. Остриё ↑ давление ↑. Не умножать силу на площадь, если ищешь p.'
    ],
    check: { q: 'Сила 80 Н действует на площадь 4 м². Каково давление? (в Па)',
      choices: ['320','20','84'], ans: 1, exp: 'p = F : S = 80 : 4 = 20 Па.' },
    tasks: [
      { q: 'Сила 100 Н, площадь 2 м². Давление (Па)?', kind: 'unit', ans: 50, tol: 0,
        hints: ['p = F : S.','100 : 2.'], sol: '50 Па' },
      { q: 'Давление 40 Па, площадь 5 м². Сила (Н)?', kind: 'choice',
        choices: ['8','200','45'], ans: 1, hints: ['F = p · S.','40 · 5.'], sol: '200 Н' },
      { q: '60 Н на 3 м². Давление (Па)?', kind: 'unit', ans: 20, tol: 0,
        hints: ['60 : 3.'], sol: '20 Па' },
      { q: 'Сила 100 Н, давление 20 Па. Площадь (м²)?', kind: 'unit', ans: 5, tol: 0,
        hints: ['S = F : p.','100 : 20.'], sol: '5 м²' },
      { q: 'Площадь выросла в 3 раза, сила та же. Давление?', kind: 'choice',
        choices: ['выросло в 3 раза','упало в 3 раза','не изменилось'], ans: 1,
        hints: ['p = F : S. S в знаменателе.'], sol: 'упало в 3 раза' },
      { q: 'Почему нож режет?', kind: 'choice',
        choices: ['сила руки огромная','площадь кромки крошечная','нож лёгкий'], ans: 1,
        hints: ['Та же сила на малой площади.'], sol: 'площадь кромки крошечная' }
    ]
  };
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f';
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:#e8dcc8;font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st,key,q,opts){
    const cur=st[key];
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px">${q}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?GOLD:'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="wv-sml" style="margin-top:6px;color:#e8dcc8">ты выбрал: ${opts.filter(o=>o.k===cur).map(o=>o.t)[0]||cur}</div>`:''}
    </div>`;
  }
  function cards(rows){
    return `<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">`+
      rows.map((x,i)=>`<div class="wv-pop" style="animation-delay:${i*.08}s;display:flex;gap:10px;border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:10px;padding:8px 12px;text-align:left"><b style="color:${x[2]||GOLD}">${x[0]}</b><span style="color:#e8dcc8">${x[1]}</span></div>`).join('')+
      `</div>`;
  }
  function pPad(S){
    const pad=50+S*36, sink=Math.max(8, 46-S*5), cx=170, y=138;
    const x0=cx-pad/2, top=y-sink-44;
    return `<svg viewBox="0 0 340 180" width="340" height="180" style="max-width:100%;display:block">
      <defs>
        <linearGradient id="sn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c8d8d0"/><stop offset="100%" stop-color="#6a8a80"/></linearGradient>
        <linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c4a07a"/><stop offset="100%" stop-color="#6a4a32"/></linearGradient>
      </defs>
      <rect x="0" y="${y}" width="340" height="42" fill="url(#sn)"/>
      <path d="M${x0},${y} Q${cx},${y+sink} ${x0+pad},${y}" fill="#8aa89e" opacity=".7"/>
      <rect x="${x0}" y="${y-8}" width="${pad}" height="10" rx="4" fill="url(#wd)"/>
      <rect x="${cx-22}" y="${top}" width="44" height="44" rx="6" fill="#c9a45a"/>
      <circle cx="${cx}" cy="${top+18}" r="10" fill="#ffd76a"/>
      <text x="${cx}" y="24" text-anchor="middle" fill="#ffd76a" font-size="13" font-family="Georgia,serif">S = ${String(S).replace('.',',')} м² · снег ${sink>24?'проседает':'держит'}</text>
    </svg>`;
  }
  function visB102(el){
    try{ window.physKenCss && physKenCss(); }catch(e){}
    const step=LV.step||0;
    const lk=(typeof lidKey==='function')?lidKey(LV.id):'102';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    const S=Math.max(1, Math.min(8, +(st.S==null?3:st.S)));
    const F=60, p=Math.round((F/S)*10)/10;
    let h='';
    if(step===0){
      h=`<div class="wv-col">
        ${physShot('f_ice.mp4','лыжи держат · ботинок тонет')}
        ${pred(st,'p0','Почему лыжи не тонут?',[{k:'s',t:'площадь больше'},{k:'f',t:'сила меньше'},{k:'m',t:'масса меньше'}])}
        ${st.p0?note('Ключ','Вес тот же. Меняется площадь. Давление — сила на каждый квадратный метр.'):note('Предскажи','Сила или площадь?')}
      </div>`;
    } else if(step===1){
      h=`<div class="wv-col">
        ${physShot('g_scale.mp4','p = F : S')}
        ${cards([['F','сила, ньютоны',GOLD],['S','площадь, м²',BLUE],['p','давление, паскали',GREEN]])}
        ${note('Формула','Силу делим на площадь. Не умножаем: F · S было бы не давление.')}
      </div>`;
    } else if(step===2){
      h=`<div class="wv-col">
        ${physShot('g_stack.mp4','1 Па = 1 Н / 1 м²')}
        ${note('Паскаль','В честь Блеза Паскаля. 1 Па — очень мало: яблоко на столе даёт сотни паскалей. Часто пишут кПа: 1 кПа = 1000 Па.')}
      </div>`;
    } else if(step===3){
      h=`<div class="wv-col">
        ${physShot('f_area.mp4','60 Н · 3 м²')}
        ${note('Счёт','60 : 3 = 20 Па. Силу делим на площадь. 60 · 3 = 180 — это уже не давление.')}
      </div>`;
    } else if(step===4){
      const pts=Array.from({length:15},(_,i)=>{const s=0.5+i*0.5; return [s, Math.round(60/s*10)/10];});
      h=`<div class="wv-col">
        ${physShot('f_area.mp4', 'F = 60 Н  ·  S = '+String(S).replace('.',',')+' м²  ·  p = '+p+' Па')}
        ${pPad(S)}
        <label class="wv-sml" style="display:flex;align-items:center;gap:8px;width:min(100%,300px)">S
          <input type="range" min="10" max="80" value="${Math.round(S*10)}" style="flex:1"
            oninput="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k].S=this.value/10;chRender(0);}catch(e){}">
          <b style="color:${GOLD}">${String(S).replace('.',',')} м²</b>
        </label>
        ${physChart([{pts, col:GOLD, name:'p = 60 / S'}], S, p, 'S, м²', 'давление', 'ps', 'Па')}
        ${note('Гипербола','Площадь втрое — давление втрое меньше. Не прямая: S в знаменателе.')}
      </div>`;
    } else if(step===5){
      h=`<div class="wv-col">
        ${physShot('f_blade.mp4','кромка крошечная')}
        ${pred(st,'p5','Нож режет, потому что?',[{k:'s',t:'площадь мала'},{k:'f',t:'сила огромна'}])}
        ${st.p5?note('Остриё','Та же рука. Площадь кромки крошечная — давление огромное. Тупой нож не режет: площадь больше.'):note('Предскажи','Сила или площадь?')}
      </div>`;
    } else if(step===6){
      h=`<div class="wv-col">
        ${physShot('p_wide.jpg','широкие лыжи')}
        ${note('Наоборот','Большая площадь → маленькое давление → снег держит. Чем шире лыжи, тем мягче.')}
      </div>`;
    } else if(step===7){
      h=`<div class="wv-col">
        ${physShot('g_four.mp4','80 Н · 4 м² · p = ?')}
        ${note('Проверка','80 : 4 = 20 Па. Не 320 (умножили) и не 84 (сложили).')}
      </div>`;
    } else if(step===8){
      h=`<div class="wv-col">
        ${physShot('g_still.mp4','треугольник F, p, S')}
        ${cards([['p = F : S','давление',GOLD],['F = p · S','сила',BLUE],['S = F : p','площадь',GREEN]])}
        ${note('Палец','Сверху F, снизу p · S. Закрой неизвестное.')}
      </div>`;
    } else if(step===9){
      h=`<div class="wv-col">
        ${physShot('n_block.mp4','40 Па · 5 м²')}
        ${pred(st,'p9','Сила?',[{k:'200',t:'200 Н'},{k:'8',t:'8 Н'},{k:'45',t:'45 Н'}])}
        ${st.p9?note('Обратно','F = p · S = 40 · 5 = 200 Н. Умножаем, когда ищем силу.'):note('Предскажи','Закрой F.')}
      </div>`;
    } else if(step===10){
      h=`<div class="wv-col">
        ${physShot('p_nail.jpg','остриё входит')}
        ${note('Гвоздь','Площадь острия крошечная — давление огромное. Шляпка широкая: молоток не продавливает палец так, как остриё — доску.')}
      </div>`;
    } else if(step===11){
      h=`<div class="wv-col">
        ${physShot('n_eng.mp4','гусеницы — большая площадь')}
        ${note('Танк и трактор','Весят тонны, не проваливаются: гусеница размазывает силу по огромной площади. Давление на грунт маленькое.')}
      </div>`;
    } else if(step===12){
      h=`<div class="wv-col">
        ${physShot('n_slab.mp4','широкий фундамент')}
        ${note('Дом','Стены тяжёлые. Фундамент шире стен — площадь больше, давление на грунт меньше. Иначе дом уйдёт в землю.')}
      </div>`;
    } else if(step===13){
      h=`<div class="wv-col">
        ${physShot('n_still.mp4','везде меняют площадь')}
        ${cards([['нож, иголка','площадь ↓ давление ↑',GOLD],['лыжи, шины','площадь ↑ давление ↓',BLUE],['гусеницы, фундамент','тоже площадь ↑',GREEN]])}
        ${note('Приём','Силу часто не можем изменить. Площадь — можем.')}
      </div>`;
    } else if(step===14){
      h=`<div class="wv-col">
        ${physShot('e_mass.mp4','100 Н · 2 м²')}
        ${note('Счёт','100 : 2 = 50 Па. 100 Н при 20 Па → S = 100 : 20 = 5 м².')}
      </div>`;
    } else {
      h=`<div class="wv-col">
        ${physShot('f_still.mp4','80 Н · 4 м² · p = ?')}
        ${cards([['1','p = F : S',GOLD],['2','площадь ↑ давление ↓',BLUE],['3','остриё ↑ давление ↑',GREEN],['4','не умножать, если ищешь p',MUTED]])}
        <div style="background:rgba(217,164,65,.1);border:2px dashed #d9a441;border-radius:12px;padding:8px 12px;font-size:18px;color:${GOLD};font-family:Georgia,serif" class="wv-pulse">давление в паскалях?</div>
        ${note('Проверка','20 Па. 80 : 4.')}
      </div>`;
    }
    el.innerHTML=`<div class="wv">${h}</div>`;
  }
  window.WAVE_B[102]=visB102;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===102){ arr[i]=L102; f=true; break; } }
    if(!f) arr.push(L102);
  })();
})();
