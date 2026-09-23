/* ====== МАТЕМАТИКА · УРОК 386 · «ДЕЛЕНИЕ С ОСТАТКОМ: ЗАДАЧИ» =====================
   5–6 класс, олимпиадная тема «остатки». Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (vis_wk.js visW386 — 24 кадра текста про конфеты, vis_bw.js) остаются в общих
   файлах; этот файл регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Остаток — это «то, что не вошло целиком», и он всегда
   МЕНЬШЕ делителя. А ещё остаток — это место на КРУГЕ: вахты, дни недели,
   буквы шифра повторяются, и важно только, сколько шагов «сверх полных кругов».

   СЮЖЕТ. Пираты Тирренского моря захватили корабль с сицилийским зерном и
   прислали Архимеду письмо, написанное шифром. Ученик Архимеда собирает
   лодки для выкупа, вычисляет, чья пиратская вахта выпадет на сотую ночь,
   разгадывает шифр на бронзовом диске и открывает сундук кодом. Ход квеста
   — три дела.

   РУКАМИ: вместимость лодки кнопками (полные лодки и остаток амфор на
   пристани), ночи вахты кнопками «+1» и «+7», шифровальный диск кнопками
   поворота.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     48 амфор по 5 в лодку: 48 = 5 · 9 + 3 — 9 полных лодок, 3 амфоры на
       пристани, лодок нужно 10; по 4 — 12 ровно, по 6 — 8 ровно, по 7 — 6 и 6,
       по 8 — 6 ровно, по 9 — 5 и 3;
     7, 6, 5: делимое 7 · 6 + 5 = 47;
     вахта из 7 пиратов по кругу: ночь n — пират ((n − 1) остаток 7) + 1;
       ночь 100 → 100 = 7 · 14 + 2 → второй пират; вторник + 100 дней → четверг;
     шифр: алфавит из 32 букв (без Ё), «ЗЕРНО» со сдвигом 3 → «КИУРС»
       (З7→К10, Е5→И8, Р16→У19, Н13→Р16, О14→С17); сдвиг 35 = 32 + 3 — тот же;
     наименьшее двузначное с остатком 4 от 7 — 11 (4 = 7 · 0 + 4 — однозначное);
     код сундука: остаток 1 от 2, 3, 4, 5, 6 → число на 1 больше общего
       кратного, НОК = 60 → 61 (31 : 4 = 7 ост. 3 — не годится; 121 — годится,
       но не наименьшее).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 386;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', БРОНЗА='#e0a050';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';
  const АЛФАВИТ = 'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const ШИФР = 'КИУРС', ОТВЕТ = 'ЗЕРНО';

  const ДЕЛА = [
    {ключ:'лодки',  имя:'Собрать лодки для выкупа', итог:'10 лодок'},
    {ключ:'шифр',   имя:'Разгадать шифр пиратов',   итог:'«ЗЕРНО»'},
    {ключ:'сундук', имя:'Открыть сундук кодом',     итог:'61'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l386{gap:14px}
  #lvis .s6.l386 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l386 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l386 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l386 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l386 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l386 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l386 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l386 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l386 .карт .текст b{color:${GOLD}}
  #lvis .s6.l386 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l386 .правило b{color:${GOLD}}
  #lvis .s6.l386 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(224,160,80,.16),rgba(224,160,80,.04));
    border:1.5px solid rgba(224,160,80,.55);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l386 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l386 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${БРОНЗА}}
  #lvis .s6.l386 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l386 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l386 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l386 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l386 .лист li.есть{color:${ИНК}}
  #lvis .s6.l386 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l386 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l386 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l386 .рычаг{display:grid;grid-template-columns:64px 1fr 64px;gap:8px;align-items:center;width:100%}
  #lvis .s6.l386 .рычаг button,#lvis .s6.l386 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:700;
    border:1.5px solid rgba(224,160,80,.55);background:rgba(224,160,80,.13);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l386 .рычаг button:active,#lvis .s6.l386 .ряд button:active{transform:translateY(2px);background:rgba(224,160,80,.26)}
  #lvis .s6.l386 .рычаг button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l386 .рычаг b{text-align:center;font-size:18px;color:${GOLD};font-variant-numeric:tabular-nums}
  #lvis .s6.l386 .ряд{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l386 .ряд button{font-size:16px}
  #lvis .s6.l386 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l386 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l386 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l386 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l386 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l386 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l386 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:17px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l386 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l386 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l386 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l386 .уровни .точка.сейчас{background:${GOLD};animation:l386dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l386dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l386 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l386{-webkit-text-size-adjust:100%}
  #lvis .s6.l386 [data-anim]{animation:l386rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l386rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l386 [data-anim]{animation:none!important}
    #lvis .s6.l386 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l386 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l386-style');
      if(!s){ s=document.createElement('style'); s.id='l386-style'; document.head.appendChild(s); }
      if(s.textContent!==CSS) s.textContent=CSS;
    }catch(e){}
  }
  const S = () => {
    const lk = (typeof lidKey==='function') ? lidKey(ID) : String(ID);
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    return CHS[lk];
  };
  const A = (i,cls,html) => `<div data-anim style="--i:${i}" class="${cls||''}">${html}</div>`;
  const BTN = (i,cls,html,on,выкл) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" onclick="${on}"${выкл?' disabled':''}>${html}</button>`;
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Выкуп у пиратов</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,обр) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, обр+"("+к+")")).join('')}</div>`;
  const ЛИСТ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'лист',
      `<div class="шапка"><span>Письмо пиратам</span><b class="${всё?'готово':''}">${
        всё?'зерно вернули':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}
           <span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const КРИВАЯ = '0.23 1 0.32 1';
  const сплайны = (n) => Array.from({length:n},()=>КРИВАЯ).join(';');
  const анК = (имя,значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const ЗАВОД = `<rect width="0" height="0" fill="none"><animate attributeName="x" values="0;0" dur="1s" repeatCount="indefinite"/></rect>`;
  const анСдвиг = (значения,длит,keyTimes) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              repeatCount="indefinite" calcMode="spline" keyTimes="${keyTimes}"
              keySplines="${сплайны(keyTimes.split(';').length-1)}"/>${ЗАВОД}` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c386-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e2a50"/><stop offset="0.55" stop-color="#5a4a6a"/><stop offset="1" stop-color="#d88a5a"/>
      </linearGradient>
      <linearGradient id="c386-день" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4b86c8"/><stop offset="0.65" stop-color="#a6cce8"/><stop offset="1" stop-color="#f4dcae"/>
      </linearGradient>
      <linearGradient id="c386-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0c1230"/><stop offset="1" stop-color="#1c2452"/>
      </linearGradient>
      <linearGradient id="c386-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2d5c8a"/><stop offset="1" stop-color="#0c2440"/>
      </linearGradient>
      <radialGradient id="c386-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff4d0"/><stop offset="0.4" stop-color="#ffc07a" stop-opacity=".85"/><stop offset="1" stop-color="#ff9a5c" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c386-луна" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#aeb9e6"/>
      </radialGradient>
      <linearGradient id="c386-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9a6536"/><stop offset="0.5" stop-color="#6d4322"/><stop offset="1" stop-color="#3f2410"/>
      </linearGradient>
      <linearGradient id="c386-чёрный" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a3036"/><stop offset="1" stop-color="#151012"/>
      </linearGradient>
      <linearGradient id="c386-амфора" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8e3f22"/><stop offset="0.35" stop-color="#e08a5a"/><stop offset="0.6" stop-color="#c2653a"/><stop offset="1" stop-color="#6e2e17"/>
      </linearGradient>
      <linearGradient id="c386-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d392"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <radialGradient id="c386-бронза-р" cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffe6ac"/><stop offset="0.5" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </radialGradient>
      <linearGradient id="c386-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4e6c6"/><stop offset="1" stop-color="#d8bf8a"/>
      </linearGradient>
      <radialGradient id="c386-пламя" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0" stop-color="#fff6c8"/><stop offset="0.4" stop-color="#ffb35c"/><stop offset="1" stop-color="#ff6a3c" stop-opacity="0"/>
      </radialGradient>
      <filter id="c386-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".5"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c386-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  const море = (y,в) => `<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c386-море)"/>
    ${[0,1,2,3].map(i=>`<path d="M${-30+i*17} ${y+10+i*12} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none"
      stroke="#cfe8ff" stroke-width="1.1" opacity="${(0.4-i*0.07).toFixed(2)}" stroke-dasharray="16 20">
      ${анЛин('stroke-dashoffset','0;-36',(3.2+i*0.5).toFixed(1)+'s')}</path>`).join('')}`;
  /* пиратский корабль: чёрные паруса, череп из костей-чисел */
  const пираты = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c386-тень)">
    <path d="M-50 0 q10 14 50 14 q40 0 50 -12 l8 -12 q-8 2 -12 8 z" fill="url(#c386-чёрный)" stroke="${ОБВОД}" stroke-width="1"/>
    ${[-36,-24,-12,0,12,24].map(ox=>`<line x1="${ox}" y1="10" x2="${ox-8}" y2="22" stroke="#1a1012" stroke-width="1.6"/>`).join('')}
    <line x1="-8" y1="0" x2="-8" y2="-58" stroke="#2a1a14" stroke-width="2.6"/>
    <path d="M-38 -52 q30 8 60 0 l-4 36 q-26 6 -52 0 z" fill="#1c1418" stroke="#3a2a2a" stroke-width="1"/>
    <circle cx="-8" cy="-36" r="7" fill="#e8e0cc"/><circle cx="-10.5" cy="-37" r="1.6" fill="#1c1418"/><circle cx="-5.5" cy="-37" r="1.6" fill="#1c1418"/>
    <path d="M-16 -26 l16 -6 M-16 -32 l16 6" stroke="#e8e0cc" stroke-width="2"/>
    <path d="M-8 -58 l16 4 l-16 5 z" fill="#8a1a1a">${анЛин('d','M-8 -58 l16 4 l-16 5 z;M-8 -58 l14 7 l-14 2 z;M-8 -58 l16 4 l-16 5 z','1.3s')}</path></g>`;
  const лодка = (x,y,м,груз) => `<g transform="translate(${x} ${y}) scale(${м||1})">
    <path d="M-18 0 q4 8 18 8 q14 0 18 -8 z" fill="url(#c386-дерево)" stroke="${ОБВОД}" stroke-width=".7"/>
    ${Array.from({length:груз||0},(_,i)=>амфора((i-(груз-1)/2)*Math.min(7,30/Math.max(1,груз)),-4,0.5)).join('')}</g>`;
  const амфора = (x,y,м,цв) => `<g transform="translate(${x} ${y}) scale(${м||1})">
    <path d="M-3 -14 h6 l1 3 q5 2 5 8 q0 8 -5 12 l-2 3 h-4 l-2 -3 q-5 -4 -5 -12 q0 -6 5 -8 z" fill="${цв||'url(#c386-амфора)'}" stroke="${ОБВОД}" stroke-width=".6"/></g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Письмо пиратов */
  function F1(s){
    const Н=284;
    return ЛИСТ(s) +
      ЗАДАЧА('Беда! Пираты Тирренского моря захватили корабль с сицилийским зерном. В гавань приплыла стрела с запиской: «Выкуп — <b>48 амфор масла</b>. А куда везти — прочтёшь, если хватит ума». Записка зашифрована. Архимед разворачивает её: «Здесь всё держится на <b>делении с остатком</b>».') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-небо)"/>
        <circle cx="260" cy="120" r="46" fill="url(#c386-солнце)">${анЛин('r','44;50;44','6s')}</circle>
        ${море(140,Н)}
        <g>${анСдвиг('0 0;-8 3;0 0','6s','0;0.5;1')}${пираты(236,168,1)}</g>
        <g filter="url(#c386-тень)" transform="rotate(-3 98 206)">
          <rect x="30" y="158" width="136" height="100" rx="4" fill="url(#c386-пергамент)"/>
          <rect x="26" y="154" width="8" height="108" rx="4" fill="url(#c386-дерево)"/><rect x="162" y="154" width="8" height="108" rx="4" fill="url(#c386-дерево)"/>
          ${т(98,188,'КИУРС',20,'#6a1a10',true)}${т(98,218,'сдвиг 35',14,'#3a2410',true)}${т(98,244,'выкуп: 48',12,'#3a2410')}</g>
        ${подпись(168,28,'Записка пиратов',GOLD,16)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Слова','В записи <b>48 : 5 = 9 (ост. 3)</b>: 48 — <b>делимое</b>, 5 — <b>делитель</b>, 9 — <b>неполное частное</b>, 3 — <b>остаток</b>. Остаток — то, что не вошло целиком.') +
      ПРАВИЛО('<b>Делимое = делитель · частное + остаток</b>, и остаток <b>меньше делителя</b>.');
  }

  /* 2. Лодки для выкупа */
  function F2(s){
    const Н=300, d=s.d2||5, в=s.ответ2;
    const q=Math.floor(48/d), r=48%d;
    const cols=4, ш=76;
    const лодки = Array.from({length:q},(_,i)=>{ const x=44+(i%cols)*ш, y=140+Math.floor(i/cols)*34;
      return `<g>${анК('opacity','0.2;0.2;1;1','5s','0;'+кт(0.03+i*0.05)+';'+кт(0.07+i*0.05)+';1')}${лодка(x,y,1,d)}</g>`; }).join('');
    const пристань = `<g filter="url(#c386-тень)"><rect x="0" y="92" width="336" height="16" fill="url(#c386-дерево)"/></g>
      ${Array.from({length:r},(_,i)=>`<g>${анЛин('opacity','1;0.45;1','1.2s')}${амфора(40+i*20,84,1,'#c0392b')}</g>`).join('')}`;
    const разборы = ['9 — это только полные лодки. Но 3 амфоры остались на пристани, и им нужна <b>ещё одна лодка</b>: всего 10.',
      '48 : 5 = 9 (ост. 3). Девять лодок полные, а для трёх оставшихся амфор нужна десятая. <b>Остаток не ноль — лодок на одну больше</b>.',
      '48 : 5 = 9,6 — но лодок не бывает 9,6. Полных 9, и одна для остатка: 10.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Выкуп — <b>48 амфор</b>. Их повезут на лодках, в каждую влезает одинаково. Меняй вместимость лодки кнопками и смотри: сколько лодок полные и сколько амфор <b>остаётся на пристани</b> (красные).') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-день)"/>
        ${море(108,Н)}
        ${пристань}
        ${лодки}
        ${т(168,40,'48 : '+d+' = '+q+(r?' (ост. '+r+')':''),20,'#1a2a4a',true,undefined,'#f4dcae')}
        ${т(168,64,'48 = '+d+' · '+q+' + '+r,14,'#1a2a4a',true,undefined,'#f4dcae')}
        ${подпись(168,Н-12, r ? 'на пристани '+r+' — нужна ещё лодка' : 'все поместились без остатка', r?RED:GREEN,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r386D(-1)",d<=4)}<b>в лодку по ${d}</b>${BTN(3,'','+',"r386D(1)",d>=9)}</div>` +
      ОТВЕТЫ('три',['9','10','9,6'],1,в,'r386Отв2') +
      (в==null ? СКАЗ('Вопрос','Если в лодку влезает 5 амфор — сколько лодок нужно для всех 48?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Если остаток не ноль, <b>вместилищ нужно на одно больше</b>, чем неполное частное.') : '');
  }

  /* 3. Остаток меньше делителя */
  function F3(s){
    const Н=240, в=s.ответ3;
    return ЛИСТ(s) +
      ЗАДАЧА('Пиратский казначей пишет в счёте: «48 амфор по 5 — <b>8 лодок и 8 амфор остатка</b>». Архимед смеётся: «Этот счёт выдаёт вора». Почему?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-ночь)"/>
        <g filter="url(#c386-тень)"><rect x="40" y="40" width="256" height="116" rx="8" fill="url(#c386-пергамент)"/></g>
        ${т(168,76,'48 : 5 = 8 (ост. 8)',20,'#3a2410',true)}
        <g>${анЛин('opacity','1;0.35;1','1.2s')}<ellipse cx="226" cy="70" rx="44" ry="17" fill="none" stroke="${RED}" stroke-width="2.6"/></g>
        ${т(168,110,'из 8 амфор остатка',14,'#3a2410')}${т(168,132,'можно набить ещё лодку!',14,'#8a2e1a',true)}
        ${подпись(168,Н-14, в===0?'остаток всегда меньше делителя':'8 больше 5 — подозрительно', в===0?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Остаток 8 больше делителя 5 — из него выйдет ещё лодка','Всё верно, просто лодки маленькие'],0,в,'r386Отв3') +
      (в==null ? СКАЗ('Вопрос','Что не так в счёте?') : РАЗБОР(в===0, ['Если остаток <b>не меньше</b> делителя, из него можно набрать ещё одну лодку. 8 = 5 + 3: частное 9, остаток 3. Казначей спрятал одну полную лодку!','Счёт неверен: остаток 8 больше делителя 5 — значит, в него помещается ещё одна лодка. Правильно: 9 (ост. 3).'][в])) +
      (в===0 ? ПРАВИЛО('При делении на 5 остатков всего <b>пять</b>: 0, 1, 2, 3, 4.') : '');
  }

  /* 4. Найти делимое */
  function F4(s){
    const Н=234, в=s.ответ4;
    return ЛИСТ(s) +
      ЗАДАЧА('Пираты увели и часть отары: ягнят разделили по <b>7</b> в загон, вышло <b>6 полных загонов</b> и <b>5 ягнят остатка</b>. Сколько всего ягнят украли?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-день)"/>
        <rect x="0" y="120" width="336" height="${Н-120}" fill="#8fae6a"/>
        ${Array.from({length:6},(_,i)=>`<g filter="url(#c386-тень)"><rect x="${16+i*52}" y="60" width="46" height="46" rx="4" fill="none" stroke="#6a4515" stroke-width="3"/>
          ${Array.from({length:7},(_,j)=>`<circle cx="${24+i*52+(j%3)*14}" cy="${72+Math.floor(j/3)*12}" r="5" fill="#f4efe4" stroke="#8a8070"/>`).join('')}</g>`).join('')}
        ${Array.from({length:5},(_,j)=>`<g>${анЛин('opacity','1;0.5;1','1.4s')}<circle cx="${110+j*24}" cy="146" r="7" fill="#f4efe4" stroke="#8a8070"/></g>`).join('')}
        ${т(168,40,'7 · 6 + 5 = ?',18,'#1a2a4a',true,undefined,'#f4dcae')}
        ${подпись(168,Н-12, в===1?'7 · 6 + 5 = 47':'делимое = делитель · частное + остаток', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['42','47','18'],1,в,'r386Отв4') +
      (в==null ? СКАЗ('Вопрос','Сколько ягнят было всего?') : РАЗБОР(в===1, ['42 = 7 · 6 — это только те, что в загонах. Прибавь 5 оставшихся: 47.','<b>7 · 6 + 5 = 47</b>. Проверка: 47 : 7 = 6 (ост. 5).','18 = 7 + 6 + 5 — сложили всё подряд. Загонов шесть, в каждом по 7: 42, и ещё 5 — 47.'][в])) +
      (в===1 ? ПРАВИЛО('Проверка деления с остатком: <b>делитель · частное + остаток = делимое</b>.') : '');
  }

  /* 5. Вахты по кругу */
  function F5(s){
    const Н=300, n=s.ночь5||1, в=s.ответ5;
    const cx=168, cy=150, R=100, k=((n-1)%7)+1;
    const пират = (i) => { const a=-Math.PI/2+(i-1)*2*Math.PI/7, x=cx+R*Math.cos(a), y=cy+R*Math.sin(a), на=i===k;
      return `<g filter="url(#c386-тень)">
        ${на?`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26" fill="url(#c386-пламя)" opacity=".7">${анЛин('r','24;30;24','1.2s')}</circle>`:''}
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="18" fill="${на?'url(#c386-бронза-р)':'#2a2233'}" stroke="${на?GOLD:'#6a6080'}" stroke-width="2"/>
        <circle cx="${x.toFixed(1)}" cy="${(y-4).toFixed(1)}" r="6" fill="#d8a878"/>
        <path d="M${(x-7).toFixed(1)} ${(y-7).toFixed(1)} q7 -8 14 0 z" fill="#8a1a1a"/>
        ${т(x.toFixed(1),(y+13).toFixed(1),String(i),11,на?'#3a2410':ИНК,true)}</g>`; };
    const стрелка = (() => { const a=-Math.PI/2+(k-1)*2*Math.PI/7; return `<line x1="${(cx+44*Math.cos(a)).toFixed(1)}" y1="${(cy+44*Math.sin(a)).toFixed(1)}" x2="${(cx+(R-26)*Math.cos(a)).toFixed(1)}" y2="${(cy+(R-26)*Math.sin(a)).toFixed(1)}" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>`; })();
    const разборы = ['Семь ночей — полный круг, и всё повторяется. 100 = 7 · 14 + 2: четырнадцать полных кругов и ещё <b>2</b> ночи — вахта у <b>второго</b> пирата.',
      'Верно: 100 : 7 = 14 (ост. 2). После 14 полных кругов дежурит второй. Остаток и есть место на круге.',
      'Седьмой дежурит в ночи 7, 14, 21… — кратные 7. А 100 на 7 не делится: 100 = 98 + 2 — второй.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Лазутчик доносит: у пиратов <b>7</b> вахтенных, они дежурят по кругу — первый, второй, …, седьмой, и снова первый. Выкуп привезут в <b>сотую ночь</b>. Кто тогда будет на вахте? Листай ночи кнопками.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-ночь)"/>
        <circle cx="290" cy="40" r="14" fill="url(#c386-луна)"/>
        <g filter="url(#c386-тень)"><circle cx="${cx}" cy="${cy}" r="${R+26}" fill="url(#c386-дерево)" opacity=".85"/><circle cx="${cx}" cy="${cy}" r="${R-30}" fill="#1c1418"/></g>
        ${стрелка}
        ${[1,2,3,4,5,6,7].map(пират).join('')}
        ${т(cx,cy-16,'ночь',12,МУТ)}${т(cx,cy+18,String(n),22,GOLD,true)}
        ${подпись(168,Н-12, n+' = 7 · '+Math.floor(n/7)+' + '+(n%7)+' → вахта '+k, GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${BTN(3,'','+1 ночь',"r386Ночь(1)")}${BTN(3,'','+7 ночей',"r386Ночь(7)")}${BTN(3,'','сначала',"r386Ночь(0)")}</div>` +
      ОТВЕТЫ('три',['первый','второй','седьмой'],1,в,'r386Отв5') +
      (в==null ? СКАЗ('Вопрос','Кто на вахте в сотую ночь? Заметь: +7 ночей возвращает к тому же пирату.') : РАЗБОР(в===1, [разборы[0],разборы[1],разборы[2]][в])) +
      (в===1 ? ПРАВИЛО('Всё, что повторяется по кругу из n шагов, решается <b>остатком от деления на n</b>: дни недели, вахты, часы.') : '');
  }

  /* 6. Шифровальный диск */
  function F6(s){
    const Н=330, k=((s.сдвиг6||0)%32+32)%32, в=s.ответ6;
    const cx=168, cy=156, R1=132, R2=100;
    const внешн = [...АЛФАВИТ].map((б,i)=>{ const a=-Math.PI/2+i*2*Math.PI/32;
      return т((cx+R1*Math.cos(a)).toFixed(1),(cy+R1*Math.sin(a)+4).toFixed(1),б,12,'#3a2410',true); }).join('');
    /* внутреннее кольцо: под буквой шифра стоит исходная — сдвиг на k назад */
    const внутр = [...АЛФАВИТ].map((б,i)=>{ const a=-Math.PI/2+i*2*Math.PI/32, исх=АЛФАВИТ[(i-k+32)%32];
      return т((cx+R2*Math.cos(a)).toFixed(1),(cy+R2*Math.sin(a)+4).toFixed(1),исх,11,'#f4e6c6',true); }).join('');
    const расшифр = [...ШИФР].map(б=>АЛФАВИТ[(АЛФАВИТ.indexOf(б)-k+32)%32]).join('');
    const верно = расшифр===ОТВЕТ;
    const разборы = ['35 = 32 + 3: полный оборот диска — это 32 буквы, и он ничего не меняет. Сдвиг 35 — то же самое, что <b>сдвиг 3</b>.',
      'Верно: 35 : 32 = 1 (ост. 3). Лишний оборот диска ничего не даёт — важен только остаток. Пираты надеялись, что никто не догадается.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Записка: «<b>КИУРС</b> · сдвиг 35». Это шифр: каждую букву сдвигают по кругу алфавита. Архимед даёт бронзовый диск — наружное кольцо: буквы шифра, внутреннее: настоящие. <b>Поворачивай внутреннее кольцо</b>, пока слово не станет понятным.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-ночь)"/>
        <g filter="url(#c386-тень)"><circle cx="${cx}" cy="${cy}" r="${R1+16}" fill="url(#c386-пергамент)"/>
          <circle cx="${cx}" cy="${cy}" r="${R2+14}" fill="url(#c386-бронза-р)" stroke="#6a4515" stroke-width="2"/>
          <circle cx="${cx}" cy="${cy}" r="${R2-16}" fill="#2a1a0c"/></g>
        ${внешн}${внутр}
        ${т(cx,cy-34,'сдвиг',12,МУТ)}${т(cx,cy-4,String(k),24,GOLD,true)}
        ${т(cx,cy+30,расшифр,18,верно?GREEN:'#f4e6c6',true)}
        ${подпись(168,Н-10, верно?'КИУРС → ЗЕРНО!':'КИУРС → '+расшифр, верно?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r386Сдвиг(-1)")}<b>сдвиг: ${k}</b>${BTN(3,'','+',"r386Сдвиг(1)")}</div>` +
      (верно
        ? ОТВЕТЫ('пара',['Пираты ошиблись','35 — это 3 плюс полный оборот'],1,в,'r386Отв6') + (в==null ? СКАЗ('Вопрос','В записке «сдвиг 35», а слово открылось при сдвиге 3. Почему?') : РАЗБОР(в===1, разборы[в]))
        : СКАЗ('Подсказка','В алфавите 32 буквы (без Ё). Сдвиг 35 — это больше полного круга…')) +
      (в===1 ? ПРАВИЛО('Сдвиг по кругу из 32 букв = <b>остаток от деления на 32</b>.') : '');
  }

  /* 7. Наименьшее двузначное */
  function F7(s){
    const Н=230, в=s.ответ7;
    return ЛИСТ(s) +
      ЗАДАЧА('Сокровище пиратов спрятано в пещере под номером — «<b>наименьшее двузначное число</b>, дающее при делении на <b>7</b> остаток <b>4</b>». Какой номер?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-день)"/>
        <path d="M0 ${Н} V90 q60 -40 120 -20 q60 -30 120 0 q50 -10 96 10 V${Н} Z" fill="#9a8a68"/>
        ${[4,11,18,25,32].map((n,i)=>`<g>${анК('opacity','0.3;0.3;1;1','7s','0;'+кт(0.05+i*0.15)+';'+кт(0.1+i*0.15)+';1')}
          <path d="M${28+i*62} 186 q0 -52 22 -56 q22 4 22 56 z" fill="#2a1a0c"/>${т(50+i*62,176,String(n),16,n===11?GOLD:ИНК,true)}</g>`).join('')}
        ${т(168,50,'4, 11, 18, 25, … — шаг 7',14,'#1a2a4a',true,undefined,'#f4dcae')}
        ${подпись(168,Н-10, в===0?'11 = 7 · 1 + 4':'остаток 4 — числа идут через 7', в===0?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['11','14','4'],0,в,'r386Отв7') +
      (в==null ? СКАЗ('Вопрос','Номер пещеры?') : РАЗБОР(в===0, ['Числа с остатком 4 от 7: 4, 11, 18, … Двузначные начинаются с <b>11</b> = 7 · 1 + 4.','14 делится на 7 без остатка.','4 : 7 = 0 (ост. 4) — остаток верный, но 4 однозначное. Следующее — 11.'][в])) +
      (в===0 ? ПРАВИЛО('Числа с одинаковым остатком от n идут <b>через n</b>.') : '');
  }

  /* 8. Код сундука */
  function F8(s){
    const Н=260, в=s.ответ8;
    return ЛИСТ(s) +
      ЗАДАЧА('В пещере — сундук с зерном и золотом пиратов. На крышке: «Код — наименьшее число больше 1, которое при делении на <b>2, 3, 4, 5 и 6</b> даёт остаток <b>1</b>». Архимед подсказывает: «Отними единицу — что станет с остатками?»') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1a1410"/>
        <circle cx="168" cy="40" r="80" fill="url(#c386-пламя)" opacity=".25">${анЛин('opacity','0.25;0.35;0.25','2s')}</circle>
        <g filter="url(#c386-тень)">
          <path d="M70 120 q0 -46 98 -50 q98 4 98 50 z" fill="url(#c386-дерево)"/>
          <rect x="70" y="120" width="196" height="96" rx="6" fill="url(#c386-дерево)"/>
          <rect x="70" y="116" width="196" height="10" fill="url(#c386-бронза)"/><rect x="70" y="208" width="196" height="10" fill="url(#c386-бронза)"/>
          ${[0,1].map(i=>`<rect x="${142+i*34}" y="140" width="28" height="44" rx="6" fill="url(#c386-бронза)"/>`).join('')}</g>
        ${[[40,214],[54,220],[30,222],[282,216],[298,222],[288,208]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="4" fill="url(#c386-бронза)" stroke="#6a4515" stroke-width=".6">${анЛин('opacity','1;0.6;1',(1.4+i*0.3).toFixed(1)+'s')}</ellipse>`).join('')}
        ${[36,300].map(x=>`<g filter="url(#c386-тень)"><path d="M${x-14} 206 q-4 -24 6 -30 l-3 -6 h22 l-3 6 q10 6 6 30 z" fill="#c8b07a" stroke="#6a5530"/>${т(x,200,'зерно',8,'#4a3a20',true)}</g>`).join('')}
        ${т(156,172,в===0?'6':'?',22,'#3a2410',true)}${т(190,172,в===0?'1':'?',22,'#3a2410',true)}
        ${т(168,240,'на 1 меньше — делится на 2, 3, 4, 5, 6',12,ИНК,true)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['61','31','121'],0,в,'r386Отв8') +
      (в==null ? СКАЗ('Вопрос','Код сундука?') : РАЗБОР(в===0, ['Число на 1 меньше делится на 2, 3, 4, 5 и 6 — значит, оно общее кратное. Наименьшее общее кратное — <b>60</b>, код — <b>61</b>.','31 : 4 = 7 (ост. 3) — не годится. Нужно число, у которого число на 1 меньше делится и на 4: 60 → 61.','121 подходит (120 делится на все), но не наименьшее: 60 + 1 = 61 меньше.'][в])) +
      (в===0 ? ПРАВИЛО('Одинаковый остаток от нескольких чисел — ищи <b>общее кратное</b> и прибавь остаток.') : '');
  }

  /* 9. Дни недели */
  function F9(s){
    const Н=230, в=s.ответ9;
    const ДНИ=['пн','вт','ср','чт','пт','сб','вс'];
    return ЛИСТ(s) +
      ЗАДАЧА('Пираты назначили обмен «через <b>100 дней</b> от сегодняшнего». Сегодня <b>вторник</b>. В какой день недели плыть?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-ночь)"/>
        ${ДНИ.map((д,i)=>{ const x=12+i*45, вт=i===1, чт=i===3;
          return `<g filter="url(#c386-тень)"><rect x="${x}" y="70" width="42" height="52" rx="8" fill="${чт&&в===1?'url(#c386-бронза)':(вт?'rgba(143,208,240,.35)':'url(#c386-пергамент)')}" stroke="${чт&&в===1?GOLD:'#8a6a3a'}"/>
            ${т(x+21,102,д,15,'#3a2410',true)}</g>`; }).join('')}
        <path d="M78 136 q45 22 90 0" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-dasharray="6 5">${анЛин('stroke-dashoffset','0;-22','0.9s')}</path>
        ${т(123,166,'+2',16,GOLD,true)}
        ${подпись(168,Н-12, в===1?'100 = 7 · 14 + 2 → четверг':'14 полных недель ничего не меняют', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['вторник','четверг','среда'],1,в,'r386Отв9') +
      (в==null ? СКАЗ('Вопрос','День обмена?') : РАЗБОР(в===1, ['Вторник будет через 98 дней (14 недель). А 100 — это ещё 2 дня: четверг.','<b>100 = 7 · 14 + 2</b>: 14 недель возвращают ко вторнику, ещё 2 дня — <b>четверг</b>.','Среда — это +1. А остаток от 100 : 7 равен 2: четверг.'][в])) +
      (в===1 ? ПРАВИЛО('Полные круги отбрасываем — смотрим на <b>остаток</b>.') : '');
  }

  /* 10. Зерно вернулось */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=284;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Десять лодок подходят к пиратскому кораблю ровно во вторую вахту — когда дежурит самый сонный. Шифр прочитан, сундук открыт кодом 61: зерно возвращается в Сиракузы без боя. Архимед: «Остатки — мелочь? Мелочь, которая решает всё».'
        : 'До обмена ещё не всё готово — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c386-небо)"/>
        <circle cx="80" cy="110" r="46" fill="url(#c386-солнце)">${анЛин('r','44;50;44','6s')}</circle>
        ${море(130,Н)}
        <g>${анСдвиг('0 0;60 0;60 0','8s','0;0.8;1')}${пираты(250,160,0.8)}</g>
        ${[0,1,2,3,4].map(i=>`<g>${анСдвиг('0 0;-40 0;-40 0',(6+i*0.3).toFixed(1)+'s','0;0.7;1')}${лодка(120+i*26,190+(i%2)*14,1,3)}</g>`).join('')}
        <g>${проявить('8s',0.1,0.2)}${подпись(168,30,'остаток меньше делителя',GOLD,12)}</g>
        <g>${проявить('8s',0.3,0.4)}${подпись(168,58,'остаток — место на круге',GOLD,12)}</g>
        <g>${проявить('8s',0.5,0.6)}${подпись(168,Н-12,'делимое = делитель · частное + остаток',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Остаток — то, что не вошло целиком, и он всегда <b>меньше делителя</b>. Проверка: делитель · частное + остаток = делимое. Если остаток не ноль — вместилищ нужно на одно больше. А всё, что идёт <b>по кругу</b> (дни, вахты, буквы), решается остатком.') +
      ПРАВИЛО('<b>Полные круги отбрось — остаток покажет место.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'67 : 8 = ?', варианты:[{т:'8 (ост. 3)',ок:true},{т:'7 (ост. 11)',ок:false}], разбор:'8 · 8 = 64, 67 − 64 = 3. Остаток 11 больше 8 — так не бывает.' },
    { вопрос:'50 человек, в лодку по 6. Сколько лодок нужно?', варианты:[{т:'8',ок:false},{т:'9',ок:true}], разбор:'50 = 6 · 8 + 2 — восемь полных и одна для двоих: 9.' },
    { вопрос:'Какие остатки бывают при делении на 4?', варианты:[{т:'0, 1, 2, 3',ок:true},{т:'1, 2, 3, 4',ок:false}], разбор:'Остаток меньше 4: от 0 до 3.' },
    { вопрос:'Сегодня пятница. Какой день будет через 30 дней?', варианты:[{т:'пятница',ок:false},{т:'воскресенье',ок:true}], разбор:'30 = 7 · 4 + 2: пятница + 2 — воскресенье.' },
    { вопрос:'Делитель 9, частное 5, остаток 7. Делимое?', варианты:[{т:'52',ок:true},{т:'45',ок:false}], разбор:'9 · 5 + 7 = 52.' }
  ];
  function F11(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r386Reset()")}</div>` +
        ПРАВИЛО('<b>Остаток меньше делителя.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r386Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Частное и остаток', задания:[
    {q:'38 : 6 = ?', в:1, варианты:['5 (ост. 8)','6 (ост. 2)'], раз:'6 · 6 = 36, остаток 2.'},
    {q:'Может ли при делении на 7 получиться остаток 7?', в:0, варианты:['нет','да'], раз:'Остаток меньше делителя.'},
    {q:'Делитель 4, частное 9, остаток 3. Делимое?', в:1, варианты:['36','39'], раз:'4 · 9 + 3 = 39.'},
    {q:'Сколько разных остатков при делении на 10?', в:0, варианты:['10','9'], раз:'От 0 до 9 — десять.'}
  ]};
  const Т2 = { имя:'По кругу', задания:[
    {q:'Сегодня среда. Через 15 дней?', в:1, варианты:['среда','четверг'], раз:'15 = 14 + 1: среда + 1.'},
    {q:'Вахта из 5 человек. Кто дежурит в 23-ю ночь?', в:0, варианты:['третий','четвёртый'], раз:'23 = 5 · 4 + 3: третий.'},
    {q:'Часы показывают 10. Сколько будет через 50 часов (на 12-часовом циферблате)?', в:1, варианты:['10','12'], раз:'50 = 12 · 4 + 2: 10 + 2 = 12.'},
    {q:'Сдвиг 40 на круге из 32 букв — то же, что сдвиг…', в:0, варианты:['8','40'], раз:'40 = 32 + 8.'}
  ]};
  const Т3 = { имя:'Олимпиадные', задания:[
    {q:'Наименьшее двузначное с остатком 2 от 5?', в:1, варианты:['17','12'], раз:'2, 7, 12 — двузначное 12.'},
    {q:'Наименьшее число больше 1 с остатком 1 от 2, 3 и 4?', в:0, варианты:['13','25'], раз:'НОК(2, 3, 4) = 12, код 13.'},
    {q:'30 учеников, в автобус по 8. Сколько автобусов?', в:1, варианты:['3','4'], раз:'30 = 8 · 3 + 6: нужен ещё один.'},
    {q:'Остаток от деления 348 на 10?', в:0, варианты:['8','4'], раз:'Остаток от 10 — последняя цифра.'}
  ]};
  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask пара">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r386T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r386TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L386 = {
    id: ID,
    title: 'Деление с остатком: задачи',
    ico: '🧮',
    src: 'Математика · 5–6 класс · Олимп-5: остатки',
    subj: 'math',
    explain: [
      'Пираты захватили корабль с зерном и прислали шифрованную записку. В записи 48 : 5 = 9 (ост. 3): делимое, делитель, неполное частное и остаток. Делимое = делитель · частное + остаток, и остаток меньше делителя.',
      '48 амфор по 5 в лодку: 9 полных лодок и 3 амфоры на пристани. Лодок нужно 10 — если остаток не ноль, вместилищ на одно больше.',
      'Счёт «48 : 5 = 8 (ост. 8)» неверен: из 8 амфор остатка можно набрать ещё лодку. Остаток всегда меньше делителя.',
      'По 7 ягнят в загон — 6 загонов и 5 ягнят остатка: всего 7 · 6 + 5 = 47.',
      'Семь вахтенных дежурят по кругу. 100 = 7 · 14 + 2, поэтому в сотую ночь дежурит второй. Остаток — место на круге.',
      'Шифр сдвигает буквы по кругу алфавита из 32 букв. Сдвиг 35 — это полный оборот и ещё 3: важен только остаток. «КИУРС» со сдвигом 3 — «ЗЕРНО».',
      'Числа с остатком 4 при делении на 7 идут через 7: 4, 11, 18… Наименьшее двузначное — 11.',
      'Код: остаток 1 при делении на 2, 3, 4, 5 и 6. Число на единицу меньше делится на все, наименьшее такое — 60, код 61.',
      'Через 100 дней от вторника: 100 = 7 · 14 + 2 — четверг.',
      'Итог: остаток меньше делителя, проверка умножением, лишнее вместилище для остатка, и всё круговое решается остатком.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: частное и остаток.',
      'Тренажёр 2: по кругу.',
      'Тренажёр 3: олимпиадные задачи.'
    ],
    check: {
      q: 'Чему равны частное и остаток: 48 : 5?',
      choices: ['8 и 8','9 и 3','10 и 2','9 и 4'],
      ans: 1,
      exp: '48 = 5 · 9 + 3: частное 9, остаток 3 — меньше делителя.'
    },
    tasks: [
      { q:'Какой остаток даёт 48 при делении на 5?', kind:'unit', ans:3, tol:0,
        hints:['5 · 9 = 45.','48 − 45.'], sol:'3.' },
      { q:'48 амфор, в лодку по 5. Сколько лодок нужно?', kind:'unit', ans:10, tol:0,
        hints:['Полных лодок 9.','Для остатка нужна ещё одна.'], sol:'10.' },
      { q:'Сегодня вторник. Какой день недели будет через 100 дней?', kind:'choice', choices:['четверг','вторник'], ans:0,
        hints:['100 : 7 — какой остаток?','Остаток 2.'], sol:'Четверг.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L386.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Записка пиратов',2:'Лодки для выкупа',3:'Счёт казначея',4:'Украденные ягнята',5:'Вахты по кругу',
      6:'Шифровальный диск',7:'Номер пещеры',8:'Код сундука',9:'День обмена',10:'Зерно вернулось',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l386" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Деление с остатком'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r386D=(д)=>{ const s=S(); s.d2=Math.max(4,Math.min(9,(s.d2||5)+д)); chRender(0); };
  window.r386Отв2=(к)=>{ const s=S(); s.ответ2=к; if(к===1) s.дело_лодки=true; chRender(0); };
  window.r386Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r386Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r386Ночь=(д)=>{ const s=S(); s.ночь5 = д===0 ? 1 : Math.min(200,(s.ночь5||1)+д); chRender(0); };
  window.r386Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r386Сдвиг=(д)=>{ const s=S(); s.сдвиг6=(((s.сдвиг6||0)+д)%32+32)%32; chRender(0); };
  window.r386Отв6=(к)=>{ const s=S(); s.ответ6=к; if(к===1) s.дело_шифр=true; chRender(0); };
  window.r386Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r386Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===0) s.дело_сундук=true; chRender(0); };
  window.r386Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r386Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r386Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r386T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r386TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L386; else arr.push(L386); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA386={render:render, L:L386};
})();
