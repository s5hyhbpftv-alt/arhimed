/* ====== МАТЕМАТИКА · УРОК 384 · «СРЕДНЯЯ СКОРОСТЬ: ПУТЬ И ВРЕМЯ» =================
   5–6 класс, олимпиадная тема «движение». Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (vis_wk.js visW384, vis_bw.js) остаются в общих файлах; этот файл
   регистрируется поверх.

   ГЛАВНАЯ ОШИБКА ТЕМЫ — усреднить скорости: (40 + 70) : 2 = 55 вместо 50. Она
   сделана видимой: на ипподроме две колесницы — настоящая (2 часа по 40,
   1 час по 70) и «призрак» с постоянной скоростью, которую ребёнок подбирает
   кнопками. При 55 призрак финиширует РАНЬШЕ, при 50 — вместе. Средняя
   скорость — это скорость призрака, который приходит одновременно.

   СЮЖЕТ. Ипподром Сиракуз, гонка колесниц. Соперник — карфагенский возница
   Магон. Ученик Архимеда считает для колесницы Гиерона: где разогнаться, что
   даёт стоянка у водопоя, почему «туда быстро, обратно медленно» — не
   половина на половину. Ход квеста — три дела.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     2 ч по 40 + 1 ч по 70: путь 80 + 70 = 150 км, время 3 ч, средняя 50
       (ловушка 55); в анимации 3 ч = 6 с, призрак со скоростью v финиширует
       через 6 · 50 : v секунд;
     Сиракузы — Катана 60 км: туда 60 км/ч (1 ч), обратно 40 км/ч (1,5 ч),
       путь 120 км, время 2,5 ч, средняя 48 (ловушка 50);
     1 ч по 40 и 1 ч по 70 — средняя 55 (равные времена — простое среднее);
     2 ч по 30 и 1 ч стоянки: 60 : 3 = 20;
     60 км, первая половина (30 км) по 30 км/ч — уже 1 ч; средняя 60 требует
       всего 1 ч на 60 км — на вторую половину времени не остаётся: невозможно;
     гонка 12 км: наша 6 км по 20 (18 мин) + 6 км по 40 (9 мин) = 27 мин,
       средняя 26⅔; Магон 12 км по 30 — 24 мин. Выигрывает Магон.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>,
   сдвиги и вращения колёс animateTransform — с невидимым «заводом». Без
   движения — положения в момент финиша настоящей колесницы. */
(function(){
  'use strict';

  const ID = 384;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', ПУРПУР='#c07ab8';
  const ИНК='#f5efe2', МУТ='#c9c1b0', ЛИНИЯ='#6a6048', ОБВОД='#140f08';

  const ДЕЛА = [
    {ключ:'призрак', имя:'Догнать призрака',         итог:'50 км/ч'},
    {ключ:'катана',  имя:'Гонец в Катану и обратно', итог:'48 км/ч'},
    {ключ:'гонка',   имя:'Предсказать победителя',   итог:'Магон, увы'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l384{gap:14px}
  #lvis .s6.l384 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l384 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l384 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#2c2a22,#1b1912);border:1.5px solid var(--line)}
  #lvis .s6.l384 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l384 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l384 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l384 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l384 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l384 .карт .текст b{color:${GOLD}}
  #lvis .s6.l384 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l384 .правило b{color:${GOLD}}
  #lvis .s6.l384 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(143,208,240,.14),rgba(143,208,240,.04));
    border:1.5px solid rgba(143,208,240,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l384 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l384 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ЛАЗУРЬ}}
  #lvis .s6.l384 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l384 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l384 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l384 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l384 .лист li.есть{color:${ИНК}}
  #lvis .s6.l384 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l384 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l384 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l384 .рычаг{display:grid;grid-template-columns:64px 1fr 64px;gap:8px;align-items:center;width:100%}
  #lvis .s6.l384 .рычаг button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:24px;font-weight:700;
    border:1.5px solid rgba(143,208,240,.55);background:rgba(143,208,240,.13);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l384 .рычаг button:active{transform:translateY(2px);background:rgba(143,208,240,.26)}
  #lvis .s6.l384 .рычаг button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l384 .рычаг b{text-align:center;font-size:20px;color:${GOLD};font-variant-numeric:tabular-nums}
  #lvis .s6.l384 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l384 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l384 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l384 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l384 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l384 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l384 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l384 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l384 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l384 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l384 .уровни .точка.сейчас{background:${GOLD};animation:l384dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l384dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l384 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l384{-webkit-text-size-adjust:100%}
  #lvis .s6.l384 [data-anim]{animation:l384rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l384rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l384 [data-anim]{animation:none!important}
    #lvis .s6.l384 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l384 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l384-style');
      if(!s){ s=document.createElement('style'); s.id='l384-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Ипподром</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Расчёты возницы</span><b class="${всё?'готово':''}">${
        всё?'все готовы':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  /* ровный бег (calcMode linear): скорость на участке постоянная — как в задаче */
  const анБег = (значения,длит,keyTimes) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              repeatCount="indefinite" calcMode="linear" keyTimes="${keyTimes}"/>${ЗАВОД}` : '';
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
      <linearGradient id="c384-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4b82c4"/><stop offset="0.6" stop-color="#a4cbe8"/><stop offset="1" stop-color="#f4dcae"/>
      </linearGradient>
      <radialGradient id="c384-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffbe0"/><stop offset="0.4" stop-color="#ffe89a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe89a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c384-трибуна" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d8c8a4"/><stop offset="1" stop-color="#9a8a68"/>
      </linearGradient>
      <linearGradient id="c384-дорожка" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d9b47a"/><stop offset="1" stop-color="#a8804a"/>
      </linearGradient>
      <linearGradient id="c384-мрамор" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b8ad9a"/><stop offset="0.45" stop-color="#f6f0e2"/><stop offset="1" stop-color="#a99d88"/>
      </linearGradient>
      <linearGradient id="c384-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d392"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <linearGradient id="c384-конь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a5a34"/><stop offset="1" stop-color="#4a2c16"/>
      </linearGradient>
      <linearGradient id="c384-конь-б" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4efe4"/><stop offset="1" stop-color="#b8b0a0"/>
      </linearGradient>
      <linearGradient id="c384-пурпур" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#c25aa0"/><stop offset="1" stop-color="#5e1a4a"/>
      </linearGradient>
      <linearGradient id="c384-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a7ab0"/><stop offset="1" stop-color="#15385e"/>
      </linearGradient>
      <linearGradient id="c384-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4e6c6"/><stop offset="1" stop-color="#d8bf8a"/>
      </linearGradient>
      <linearGradient id="c384-вечер" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#262a48"/><stop offset="1" stop-color="#433636"/>
      </linearGradient>
      <filter id="c384-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".45"/>
      </filter>
      <filter id="c384-пыль" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c384-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(20,15,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* ипподром: небо, трибуны с толпой, флажки, дорожки */
  const ипподром = (в,верх) => {
    const y0=верх||96;
    let толпа='';
    for(let r=0;r<3;r++) for(let i=0;i<22;i++){ const x=10+i*15+(r%2)*7, y=y0-44+r*12;
      толпа+=`<circle cx="${x}" cy="${y}" r="3.4" fill="${['#c8683e','#e8b84a','#5f9be8','#f4efe4','#8a3a6a'][(i+r*3)%5]}"/>`; }
    return `<rect x="0" y="0" width="336" height="${в}" fill="url(#c384-небо)"/>
      <circle cx="292" cy="30" r="30" fill="url(#c384-солнце)">${анЛин('r','28;34;28','6s')}</circle>
      <rect x="0" y="${y0-56}" width="336" height="48" fill="url(#c384-трибуна)"/>
      ${толпа}
      <rect x="0" y="${y0-10}" width="336" height="6" fill="url(#c384-мрамор)"/>
      ${[0,1,2,3,4,5,6,7].map(i=>`<g><line x1="${20+i*42}" y1="${y0-56}" x2="${20+i*42}" y2="${y0-74}" stroke="#6a4515" stroke-width="1.4"/>
        <path d="M${20+i*42} ${y0-74} l12 3 l-12 4 z" fill="${i%2?'#9a2c46':'#e8b84a'}">${анЛин('d',`M${20+i*42} ${y0-74} l12 3 l-12 4 z;M${20+i*42} ${y0-74} l11 6 l-11 1 z;M${20+i*42} ${y0-74} l12 3 l-12 4 z`,(1.1+i*0.13).toFixed(2)+'s')}</path></g>`).join('')}
      <rect x="0" y="${y0-4}" width="336" height="${в-y0+4}" fill="url(#c384-дорожка)"/>`;
  };
  /* колесница с конём; колесо вращается, ноги коня бегут */
  const колесница = (x,y,конь,плащ,м,бег) => {
    const мм=м||1;
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <ellipse cx="-4" cy="14" rx="44" ry="4" fill="#000" opacity=".22"/>
      ${бег?`<ellipse cx="-38" cy="8" rx="14" ry="6" fill="#e8d0a0" opacity=".6" filter="url(#c384-пыль)">${анЛин('rx','10;16;10','0.5s')}</ellipse>`:''}
      <g>
        ${/* конь: корпус, шея, голова с мордой и ухом, грива, хвост, четыре ноги в галопе */''}
        <path d="M6 -8 q-9 1 -12 12" fill="none" stroke="${конь}" stroke-width="3" stroke-linecap="round">${бег&&ДВИЖ?анЛин('d','M6 -8 q-9 1 -12 12;M6 -8 q-11 -2 -13 8;M6 -8 q-9 1 -12 12','0.5s'):''}</path>
        <ellipse cx="18" cy="-4" rx="14" ry="7.5" fill="${конь}" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M27 -8 q4 -10 10 -16 l6 3 q-3 9 -9 15 z" fill="${конь}" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M37 -24 q5 -3 11 2 q2 3 -1 5 l-8 0 z" fill="${конь}" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M38 -24 l1 -5 l3 4" fill="${конь}" stroke="${ОБВОД}" stroke-width=".6"/>
        <circle cx="42" cy="-21" r=".9" fill="#1a0c04"/>
        <path d="M29 -9 q3 -9 9 -15" fill="none" stroke="#2a1a0c" stroke-width="2.4" stroke-linecap="round"/>
        ${[[8,-1],[13,1],[24,1],[29,-1]].map(([lx,фаза],i)=>`<path d="M${lx} 1 l${фаза*3} 7 l${-фаза*2} 7" fill="none" stroke="${конь}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
          ${бег&&ДВИЖ?анЛин('d',`M${lx} 1 l3 7 l-2 7;M${lx} 1 l-3 7 l2 7;M${lx} 1 l3 7 l-2 7`,(0.34+i*0.03).toFixed(2)+'s',i%2?'begin="0.17s"':''):''}</path>`).join('')}
      </g>
      <line x1="6" y1="-2" x2="-14" y2="0" stroke="#6a4515" stroke-width="1.6"/>
      <path d="M-30 -10 h16 v14 h-18 z" fill="url(#c384-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="-24" cy="-16" r="4.6" fill="#e3b98f"/>
      <path d="M-28 -12 q4 -2 8 0 l2 8 h-12 z" fill="${плащ}"/>
      <path d="M-20 -12 q12 -4 26 6" fill="none" stroke="#2a1a0c" stroke-width=".8"/>
      <g>${бег&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" from="0 -22 6" to="360 -22 6" dur="0.6s" repeatCount="indefinite"/>${ЗАВОД}`:''}
        <circle cx="-22" cy="6" r="8" fill="none" stroke="#4a2c16" stroke-width="2"/>
        ${[0,1,2,3].map(i=>{ const a=i*Math.PI/4; return `<line x1="${(-22-8*Math.cos(a)).toFixed(1)}" y1="${(6-8*Math.sin(a)).toFixed(1)}" x2="${(-22+8*Math.cos(a)).toFixed(1)}" y2="${(6+8*Math.sin(a)).toFixed(1)}" stroke="#4a2c16" stroke-width="1.2"/>`; }).join('')}</g>
    </g>`;
  };

  /* ================= КАДРЫ ================= */

  /* 1. Ипподром */
  function F1(s){
    const Н=284;
    return ЛИСТ(s) +
      ЗАДАЧА('Праздник в Сиракузах: на ипподроме гонка колесниц. Царь Гиерон выставил своих белых коней, а карфагенский возница <b>Магон</b> — вороных. Архимед поручил тебе расчёты: «В гонке побеждает не тот, кто быстрее всех на одном участке, а тот, у кого лучше <b>средняя скорость</b>».') +
      `<div class="pic">${свг(`
        ${ипподром(Н,120)}
        ${[0,1].map(i=>`<line x1="0" y1="${170+i*50}" x2="336" y2="${170+i*50}" stroke="#f4e6c6" stroke-width="1.2" opacity=".6"/>`).join('')}
        <g>${анБег('-20 0;80 0;-20 0','7s','0;0.5;1')}${колесница(150,160,'url(#c384-конь-б)','url(#c384-пурпур)',1.1,true)}</g>
        <g>${анБег('10 0;60 0;10 0','6s','0;0.5;1')}${колесница(150,212,'url(#c384-конь)','#2a4a8a',1.1,true)}</g>
        ${подпись(168,28,'Ипподром Сиракуз',GOLD,16)}
        ${подпись(168,Н-12,'средняя = весь путь : всё время',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Главное правило','<b>Средняя скорость</b> — это весь путь, делённый на всё время движения. Не среднее от скоростей, а <b>путь : время</b>.') +
      ПРАВИЛО('<b>v средняя = весь путь : всё время</b>.');
  }

  /* 2. Призрак: подбери постоянную скорость */
  const L=236, X0=30;
  function F2(s){
    const Н=300, v=s.v2||40, в=s.ответ2;
    const T=9, реал=6;                         /* в анимации: 1 ч = 2 с, настоящая финиширует на 6-й секунде */
    const tг = 6*50/v;                          /* призрак финиширует через 6·50/v секунд */
    const вместе = v===50;
    const х80 = (80/150*L).toFixed(1);
    /* без движения — момент, когда первая из двух пересекает финиш:
       так видно, кто впереди (1 ч = 2 с, путь в км → доля дистанции 150 км) */
    const t0 = Math.min(реал, tг);
    const путьРеал = t0<=4 ? 40*t0/2 : 80+70*(t0-4)/2;
    const гдеРеал = L*путьРеал/150, где = L*Math.min(150, v*t0/2)/150;
    const реалЗн = ДВИЖ ? `0 0;${х80} 0;${L} 0;${L} 0` : '';
    const призрЗн = ДВИЖ ? `0 0;${L} 0;${L} 0` : '';
    const разборы = ['55 — среднее от 40 и 70. Но по 40 колесница ехала <b>2 часа</b>, а по 70 — только час: медленного участка «больше», и средняя ниже 55. Посмотри: при 55 призрак финиширует раньше.',
      'Путь 2 · 40 + 1 · 70 = <b>150 км</b>, время <b>3 ч</b>, средняя 150 : 3 = <b>50 км/ч</b>. Призрак на 50 финиширует ровно вместе с колесницей.',
      '40 — это скорость только первого участка. На втором колесница ехала 70, так что в среднем быстрее 40.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Колесница Гиерона на длинной дистанции: <b>2 часа по 40 км/ч</b>, потом <b>1 час по 70</b>. Рядом бежит <b>призрак</b> — с одной и той же скоростью всю дорогу. Подбирай скорость призрака кнопками, пока они не придут к финишу <b>вместе</b>.') +
      `<div class="pic">${свг(`
        ${ипподром(Н,110)}
        <line x1="${X0+L+22}" y1="110" x2="${X0+L+22}" y2="240" stroke="#fff" stroke-width="4" stroke-dasharray="6 6"/>
        <line x1="${X0+L+22}" y1="110" x2="${X0+L+22}" y2="240" stroke="#1a140a" stroke-width="4" stroke-dasharray="6 6" stroke-dashoffset="6"/>
        <line x1="${X0+22}" y1="110" x2="${X0+22}" y2="240" stroke="#f4e6c6" stroke-width="2"/>
        ${т(X0+22,256,'старт',12,'#3a2410',true)}${т(X0+L+22,256,'финиш',12,'#3a2410',true)}
        <line x1="${X0+22+(+х80)}" y1="140" x2="${X0+22+(+х80)}" y2="180" stroke="#6a4515" stroke-width="1.6" stroke-dasharray="3 3"/>
        ${т(X0+22+(+х80),134,'смена',11,'#3a2410',true)}
        <g ${ДВИЖ?'':`transform="translate(${гдеРеал.toFixed(1)} 0)"`}>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="${реалЗн}" keyTimes="0;${(4/T).toFixed(3)};${(реал/T).toFixed(3)};1" dur="${T}s" repeatCount="indefinite" calcMode="linear"/>${ЗАВОД}`:''}
          ${колесница(X0,164,'url(#c384-конь-б)','url(#c384-пурпур)',1,true)}</g>
        <g opacity=".6" ${ДВИЖ?'':`transform="translate(${где.toFixed(1)} 0)"`}>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="${призрЗн}" keyTimes="0;${Math.min(1,tг/T).toFixed(3)};1" dur="${T}s" repeatCount="indefinite" calcMode="linear"/>${ЗАВОД}`:''}
          ${колесница(X0,220,'#b8d8f0','#8fd0f0',1,true)}</g>
        ${т(20,168,'Гиерон',11,'#3a2410',true,'start')}${т(20,224,'призрак',11,'#2a4f8a',true,'start')}
        ${подпись(168,Н-12, вместе ? 'призрак 50 км/ч — финиш вместе!' : (v>50?'призрак '+v+' — финиширует раньше':'призрак '+v+' — опаздывает'), вместе?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r384V(-5)",v<=35)}<b>призрак: ${v} км/ч</b>${BTN(3,'','+',"r384V(5)",v>=70)}</div>` +
      ОТВЕТЫ('три',['55','50','40'],1,в,'r384Отв2') +
      (в==null ? СКАЗ('Вопрос','Какова средняя скорость колесницы?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Средняя скорость — скорость <b>призрака</b>, который приходит одновременно: <b>весь путь : всё время</b>.') : '');
  }

  /* 3. Гонец в Катану */
  function F3(s){
    const Н=276, в=s.ответ3;
    const ш1=96, ш2=144, x0=40;
    const разборы = ['50 — среднее от 60 и 40, но обратно гонец ехал <b>дольше</b> (1,5 ч против 1 ч). Весь путь 120 км, всё время 2,5 ч: 120 : 2,5 = <b>48</b>.',
      'Туда 60 : 60 = 1 ч, обратно 60 : 40 = 1,5 ч. Путь 120 км, время 2,5 ч: <b>120 : 2,5 = 48 км/ч</b> — меньше 50, потому что на медленную дорогу ушло больше времени.',
      '45 — слишком мало. Путь 120 км, время 2,5 ч: 120 : 2,5 = 48.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Перед гонкой Гиерон шлёт гонца в <b>Катану</b> за лучшим возницей — 60 км по берегу. Туда гонец скачет <b>60 км/ч</b>, обратно, с седоком, — <b>40 км/ч</b>. Какая у него средняя скорость на всём пути?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-небо)"/>
        <path d="M0 110 q80 -20 168 0 t168 0 V${Н} H0 Z" fill="url(#c384-море)"/>
        <path d="M0 60 q60 30 130 20 q70 -10 140 20 q30 10 66 0 V120 H0 Z" fill="#c9b07a"/>
        <path d="M24 78 q130 -20 288 12" fill="none" stroke="#8a6a3a" stroke-width="3" stroke-dasharray="7 5"/>
        <g filter="url(#c384-тень)"><rect x="14" y="58" width="22" height="20" fill="url(#c384-мрамор)"/><path d="M12 58 l13 -10 l13 10 z" fill="#8a3a2a"/></g>
        <g filter="url(#c384-тень)"><rect x="300" y="72" width="22" height="20" fill="url(#c384-мрамор)"/><path d="M298 72 l13 -10 l13 10 z" fill="#8a3a2a"/></g>
        ${т(30,100,'Сиракузы',11,'#3a2410',true,'start')}${т(310,114,'Катана',11,'#3a2410',true)}
        <g>${анБег('0 0;260 0;260 0;0 0;0 0','5s','0;0.4;0.42;1;1')}<circle cx="30" cy="80" r="6" fill="#c8683e" stroke="${ОБВОД}"/></g>
        <g filter="url(#c384-тень)"><rect x="${x0}" y="168" width="${ш1}" height="30" rx="6" fill="#6fbf7f"/><rect x="${x0+ш1}" y="168" width="${ш2}" height="30" rx="6" fill="#e0a050"/></g>
        ${т(x0+ш1/2,188,'туда 1 ч',13,'#10240f',true)}${т(x0+ш1+ш2/2,188,'обратно 1,5 ч',13,'#3a2410',true)}
        ${т(x0,160,'0',12,ИНК,true)}${т(x0+ш1+ш2,160,'2,5 ч',12,ИНК,true)}
        ${подпись(168,Н-12, в===1?'120 км : 2,5 ч = 48 км/ч':'время — полоска: медленная длиннее', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['50','48','45'],1,в,'r384Отв3') +
      (в==null ? СКАЗ('Вопрос','Средняя скорость гонца туда и обратно?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Равные <b>пути</b> — ещё не равные <b>времена</b>: на медленном участке проводишь дольше, и средняя тянется к медленной скорости.') : '');
  }

  /* 4. Когда простое среднее всё-таки работает */
  function F4(s){
    const Н=250, в=s.ответ4;
    const гиря = (x,y,ч,подп,цвет) => `<g filter="url(#c384-тень)"><path d="M${x-14} ${y} h28 l6 ${ч*14} h-40 z" fill="${цвет}"/>${т(x,y+ч*14-6,подп,12,'#1a140a',true)}</g>`;
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед берёт весы: «Каждая скорость весит столько, сколько по ней ехали <b>времени</b>. 2 часа по 40 тянут вдвое сильнее, чем 1 час по 70 — вот средняя и 50, ближе к 40. А если бы по каждой скорости ехали <b>по часу</b>?»') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-вечер)"/>
        <g>
          <line x1="168" y1="40" x2="168" y2="90" stroke="#c98f3e" stroke-width="5"/>
          <g transform="rotate(-8 168 90)"><line x1="68" y1="90" x2="268" y2="90" stroke="#c98f3e" stroke-width="5" stroke-linecap="round"/><circle cx="168" cy="90" r="6" fill="#8a5f1c"/>
            <line x1="80" y1="90" x2="80" y2="120" stroke="#8a6a3a"/><line x1="256" y1="90" x2="256" y2="120" stroke="#8a6a3a"/>
            ${гиря(80,120,2,'40 · 2 ч','#6fbf7f')}${гиря(256,120,1,'70 · 1 ч','#e0a050')}</g></g>
        <path d="M156 206 h24 l-6 -110 h-12 z" fill="url(#c384-мрамор)"/><rect x="140" y="204" width="56" height="8" rx="3" fill="url(#c384-мрамор)"/>
        <g>${проявить('5s',0.2,0.35)}${т(168,236,в===0?'1 ч и 1 ч → (40 + 70) : 2 = 55':'2 ч и 1 ч → 150 : 3 = 50',14,в===0?GREEN:GOLD,true)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['55','50'],0,в,'r384Отв4') +
      (в==null ? СКАЗ('Вопрос','1 час по 40 и 1 час по 70. Средняя скорость?') : РАЗБОР(в===0, ['Путь 40 + 70 = 110 км, время 2 ч: 110 : 2 = <b>55</b>. Когда <b>времена равны</b>, средняя скорость — обычное среднее скоростей.','50 было при 2 ч и 1 ч. Сейчас времена равны: путь 110 км за 2 ч — 55.'][в])) +
      (в===0 ? ПРАВИЛО('Простое среднее скоростей верно, <b>только если времена равны</b>.') : '');
  }

  /* 5. Стоянка у водопоя */
  function F5(s){
    const Н=250, в=s.ответ5;
    return ЛИСТ(s) +
      ЗАДАЧА('Возница Магона хвастает: «Мы шли 2 часа по <b>30 км/ч</b>, потом <b>час поили коней</b>. Средняя скорость — 30!»') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-небо)"/>
        <rect x="0" y="130" width="336" height="${Н-130}" fill="url(#c384-дорожка)"/>
        <g filter="url(#c384-тень)"><ellipse cx="248" cy="160" rx="46" ry="14" fill="#5f9be8"/><ellipse cx="248" cy="156" rx="40" ry="9" fill="#8fc0f0">${анЛин('rx','40;36;40','2s')}</ellipse></g>
        ${колесница(168,150,'url(#c384-конь)','#2a4a8a',1.1,false)}
        <g filter="url(#c384-тень)"><rect x="30" y="196" width="180" height="26" rx="6" fill="#6fbf7f"/><rect x="210" y="196" width="90" height="26" rx="6" fill="#8a8a8a"/></g>
        ${т(120,214,'едут 2 ч · 60 км',12,'#10240f',true)}${т(255,214,'стоят 1 ч',12,'#f4efe4',true)}
        ${подпись(168,28, в===1?'60 км : 3 ч = 20 км/ч':'стоянка — тоже время пути', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['30','20','15'],1,в,'r384Отв5') +
      (в==null ? СКАЗ('Вопрос','Какова средняя скорость Магона за всё время?') : РАЗБОР(в===1, ['30 — скорость только пока ехали. Средняя считается за <b>всё</b> время, и час у водопоя тоже идёт в счёт: 60 : 3 = 20.','Путь 60 км, всё время 2 + 1 = 3 ч: <b>60 : 3 = 20 км/ч</b>. Стоянка не добавляет пути, но добавляет времени.','Путь 2 · 30 = 60 км, а не 45: 60 : 3 = 20.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Всё время</b> — вместе со стоянками.') : '');
  }

  /* 6. Невозможная средняя */
  function F6(s){
    const Н=240, в=s.ответ6;
    return ЛИСТ(s) +
      ЗАДАЧА('Магон усмехается: «Первую половину пути в 60 км я нарочно проеду медленно — <b>30 км/ч</b>. А на второй разгонюсь так, что средняя выйдет <b>60</b>!» С какой скоростью ему надо ехать вторую половину?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-вечер)"/>
        <g filter="url(#c384-тень)"><rect x="30" y="70" width="276" height="60" rx="10" fill="url(#c384-пергамент)"/></g>
        ${т(168,94,'средняя 60 на 60 км → всего 1 ч',14,'#3a2410',true)}
        ${т(168,118,'первые 30 км по 30 км/ч → уже 1 ч',14,'#8a2e1a',true)}
        <g>${анЛин('opacity','1;0.3;1','1.4s')}${т(168,168,'на вторую половину — 0 минут!',16,RED,true)}</g>
        ${подпись(168,Н-14, в===2?'нужна бесконечная скорость':'сколько времени осталось?', в===2?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['90','120','невозможно'],2,в,'r384Отв6') +
      (в==null ? СКАЗ('Вопрос','С какой скоростью ехать вторую половину?') : РАЗБОР(в===2, ['90 — ловушка «среднее скоростей»: (30 + 90) : 2 = 60. Но первая половина уже съела весь час.','При 120 на вторую половину уйдёт 15 минут, всего 1 ч 15 мин — средняя 48, а не 60.','Средняя 60 на 60 км — это ровно <b>1 час</b> на всё. А первые 30 км по 30 км/ч уже заняли этот час. На вторую половину не осталось ни минуты — <b>невозможно</b>, сколько ни разгоняйся.'][в])) +
      (в===2 ? ПРАВИЛО('Проверяй по <b>времени</b>: сколько его нужно на весь путь и сколько уже потрачено.') : '');
  }

  /* 7. Равные времена или равные пути */
  function F7(s){
    const Н=224, в=s.ответ7;
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед подводит итог ловушкам: «Иногда можно просто сложить две скорости и поделить на два. Когда?»') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-вечер)"/>
        <g>${проявить('7s',0.1,0.2)}<rect x="20" y="40" width="296" height="54" rx="10" fill="rgba(143,224,176,.12)" stroke="${GREEN}"/>
          ${т(168,64,'равные ВРЕМЕНА: 1 ч по 40, 1 ч по 70',14,GREEN,true)}${т(168,84,'средняя 55 = (40 + 70) : 2',12,ИНК)}</g>
        <g>${проявить('7s',0.4,0.5)}<rect x="20" y="110" width="296" height="54" rx="10" fill="rgba(255,138,120,.12)" stroke="${RED}"/>
          ${т(168,134,'равные ПУТИ: туда 60, обратно 40',14,RED,true)}${т(168,154,'средняя 48, а не 50',12,ИНК)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['равные пути','равные времена'],1,в,'r384Отв7') +
      (в==null ? СКАЗ('Вопрос','Когда средняя скорость равна среднему от двух скоростей?') : РАЗБОР(в===1, ['При равных путях — нет: на медленном участке едут дольше, и средняя меньше обычного среднего (48 < 50).','Только при равных <b>временах</b>: каждая скорость тогда «весит» одинаково.'][в])) +
      (в===1 ? ПРАВИЛО('Сомневаешься — <b>всегда</b> считай путь : время.') : '');
  }

  /* 8. Финальная гонка: кто победит */
  function F8(s){
    const Н=290, в=s.ответ8;
    const T=9, наша_ок=27, магон=24;
    const разборы = ['(20 + 40) : 2 = 30 — это ловушка. Половины <b>пути</b> равны, а времена — нет: 6 км по 20 — 18 мин, 6 км по 40 — 9 мин. Всего 27 мин, у Магона 24. Наша средняя 12 : 27 мин ≈ 26,7 км/ч — меньше 30.',
      'Наша: 6 км по 20 км/ч — 18 минут, 6 км по 40 — 9 минут, итого <b>27 минут</b>. Магон: 12 км по 30 — <b>24 минуты</b>. Магон приходит первым. Медленная половина «съела» больше времени.'];
    const х = (L*0.5).toFixed(1);
    return ЛИСТ(s) +
      ЗАДАЧА('Решающий заезд, 12 км. Кони Гиерона полдистанции идут тяжело — <b>20 км/ч</b>, вторую половину летят — <b>40 км/ч</b>. Кони Магона идут ровно — <b>30 км/ч</b>. Возничий Гиерона уверен: «(20 + 40) : 2 = 30 — ничья, а на финише мы рванём!» Кто придёт первым?') +
      `<div class="pic">${свг(`
        ${ипподром(Н,110)}
        <line x1="${X0+L+22}" y1="110" x2="${X0+L+22}" y2="240" stroke="#fff" stroke-width="4" stroke-dasharray="6 6"/>
        <line x1="${X0+22+(+х)}" y1="140" x2="${X0+22+(+х)}" y2="180" stroke="#6a4515" stroke-width="1.6" stroke-dasharray="3 3"/>
        ${т(X0+22+(+х),134,'половина',11,'#3a2410',true)}
        ${в!=null?`<g ${ДВИЖ?'':`transform="translate(${L} 0)"`}>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${х} 0;${L} 0;${L} 0" keyTimes="0;${(18/27*6/T).toFixed(3)};${(6/T).toFixed(3)};1" dur="${T}s" repeatCount="indefinite" calcMode="linear"/>${ЗАВОД}`:''}
            ${колесница(X0,164,'url(#c384-конь-б)','url(#c384-пурпур)',1,true)}</g>
          <g ${ДВИЖ?'':`transform="translate(${L} 0)"`}>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${L} 0;${L} 0" keyTimes="0;${(6*магон/наша_ок/T).toFixed(3)};1" dur="${T}s" repeatCount="indefinite" calcMode="linear"/>${ЗАВОД}`:''}
            ${колесница(X0,220,'url(#c384-конь)','#2a4a8a',1,true)}</g>`
          :`${колесница(X0,164,'url(#c384-конь-б)','url(#c384-пурпур)',1,false)}${колесница(X0,220,'url(#c384-конь)','#2a4a8a',1,false)}`}
        ${т(20,168,'Гиерон',11,'#3a2410',true,'start')}${т(20,224,'Магон',11,'#2a2a4a',true,'start')}
        ${подпись(168,Н-12, в===1?'27 мин против 24 — Магон первый':'сравни ВРЕМЕНА, а не скорости', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Ничья: в среднем обе по 30','Магон: наша потратит 27 минут, он — 24'],1,в,'r384Отв8') +
      (в==null ? СКАЗ('Вопрос','Кто победит?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Половина <b>пути</b> медленно тянет среднюю вниз сильнее, чем половина пути быстро — вверх.') : '');
  }

  /* 9. Как тренировать коней: совет Архимеда */
  function F9(s){
    const Н=230, в=s.ответ9;
    return ЛИСТ(s) +
      ЗАДАЧА('Гиерон огорчён и спрашивает Архимеда: «Что тренировать к следующим играм — разгон на второй половине до <b>60</b>, или ровный ход без провала на первой — <b>30</b> всю дорогу?» Сравни времена на 12 км.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c384-вечер)"/>
        <g filter="url(#c384-тень)">
          <rect x="30" y="54" width="${18*6}" height="28" rx="6" fill="#e0a050"/><rect x="${30+18*6}" y="54" width="${6*6}" height="28" rx="6" fill="#6fbf7f"/>
          <rect x="30" y="124" width="${24*6}" height="28" rx="6" fill="#5f9be8"/></g>
        ${т(30,48,'20, потом 60: 18 + 6 = 24 мин',12,ИНК,true,'start')}
        ${т(30,118,'ровно 30: 24 мин',12,ИНК,true,'start')}
        ${подпись(168,Н-14, в===0?'одинаково — 24 минуты':'сравни длину полосок', в===0?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['Одинаково','Разгон до 60 лучше'],0,в,'r384Отв9') +
      (в==null ? СКАЗ('Вопрос','Что лучше?') : РАЗБОР(в===0, ['6 км по 20 — 18 минут, 6 км по 60 — 6 минут: 24 минуты. Ровно 30 — тоже 24. Одинаково! Чтобы при провале до 20 догнать «ровные 30», вторую половину нужно лететь аж <b>60</b>.','Посчитай: 18 + 6 = 24 минуты — ровно столько же, сколько 12 км по 30. Разгон до 60 лишь отыгрывает провал.'][в])) +
      (в===0 ? ПРАВИЛО('Медленный участок стоит дорого: чтобы его отыграть, нужна скорость <b>намного</b> больше средней.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=276;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Магон выиграл заезд — но Гиерон знает, почему, и как выиграть следующий. Архимед улыбается: «Скорость у финиша всех восхищает. А побеждает время».'
        : 'Расчёты ещё не закончены — вернись к делам в списке. Вот что запомнить.') +
      `<div class="pic">${свг(`
        ${ипподром(Н,120)}
        <g>${анБег('0 0;40 0;0 0','4s','0;0.5;1')}${колесница(120,176,'url(#c384-конь-б)','url(#c384-пурпур)',1.2,true)}</g>
        <g>${проявить('8s',0.1,0.2)}${подпись(168,212,'средняя = весь путь : всё время',GOLD,12)}</g>
        <g>${проявить('8s',0.35,0.45)}${подпись(168,238,'не среднее скоростей!',RED,12)}</g>
        <g>${проявить('8s',0.6,0.7)}${подпись(168,Н-12,'стоянки — тоже время',ИНК,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Средняя скорость — это <b>весь путь : всё время</b>, вместе со стоянками. Складывать скорости и делить пополам можно только при <b>равных временах</b>. При равных путях медленный участок тянет среднюю вниз.') +
      ПРАВИЛО('Считай <b>путь</b> и <b>время</b> отдельно — и только потом дели.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Весь путь 120 км, всё время 3 ч. Средняя скорость?', варианты:[{т:'40 км/ч',ок:true},{т:'360 км/ч',ок:false}], разбор:'120 : 3 = 40.' },
    { вопрос:'1 ч по 50 и 1 ч по 70. Средняя?', варианты:[{т:'65',ок:false},{т:'60',ок:true}], разбор:'Равные времена: (50 + 70) : 2 = 60. Или 120 : 2.' },
    { вопрос:'30 км туда по 30 км/ч, обратно по 15 км/ч. Средняя?', варианты:[{т:'20',ок:true},{т:'22,5',ок:false}], разбор:'Время 1 + 2 = 3 ч, путь 60 км: 60 : 3 = 20.' },
    { вопрос:'Ехал 3 ч по 40 км/ч и стоял 1 ч. Средняя за всё время?', варианты:[{т:'40',ок:false},{т:'30',ок:true}], разбор:'120 км : 4 ч = 30.' },
    { вопрос:'Средняя 50 км/ч на 100 км. Сколько всего времени?', варианты:[{т:'2 ч',ок:true},{т:'5 ч',ок:false}], разбор:'100 : 50 = 2 ч.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r384Reset()")}</div>` +
        ПРАВИЛО('<b>Весь путь : всё время.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r384Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Путь и время', задания:[
    {q:'2 ч по 60 и 1 ч по 30. Весь путь?', в:1, варианты:['90 км','150 км'], раз:'120 + 30 = 150 км.'},
    {q:'2 ч по 60 и 1 ч по 30. Средняя?', в:0, варианты:['50','45'], раз:'150 : 3 = 50.'},
    {q:'Весь путь 200 км за 4 ч. Средняя?', в:1, варианты:['800','50'], раз:'200 : 4 = 50.'},
    {q:'Средняя 40, время 3 ч. Путь?', в:0, варианты:['120 км','43 км'], раз:'40 · 3 = 120.'}
  ]};
  const Т2 = { имя:'Ловушки', задания:[
    {q:'Туда 40, обратно 60 (равные пути). Средняя…', в:1, варианты:['50','48'], раз:'Как в задаче о Катане: 48 — меньше 50.'},
    {q:'1 ч по 20 и 1 ч по 80. Средняя…', в:0, варианты:['50','40'], раз:'Равные времена: (20 + 80) : 2 = 50.'},
    {q:'Стоянка в средней скорости…', в:1, варианты:['не считается','считается'], раз:'Время стоянки входит во всё время.'},
    {q:'Полпути по 10 км/ч. Можно ли набрать среднюю 20?', в:0, варианты:['нет','да, если ехать 30'], раз:'Первая половина уже съела всё время, отведённое на путь со средней 20.'}
  ]};
  const Т3 = { имя:'Гонки', задания:[
    {q:'12 км: полпути 20, полпути 40. Время?', в:1, варианты:['24 мин','27 мин'], раз:'18 + 9 = 27 минут.'},
    {q:'12 км ровно по 30. Время?', в:0, варианты:['24 мин','20 мин'], раз:'12 : 30 = 0,4 ч = 24 мин.'},
    {q:'Кто быстрее: «полпути 20, полпути 40» или «всё по 30»?', в:1, варианты:['первый','второй'], раз:'27 мин против 24 — второй.'},
    {q:'Средняя скорость ближе к…', в:0, варианты:['той, по которой ехали дольше','большей из скоростей'], раз:'Скорость «весит» столько, сколько по ней ехали времени.'}
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
        в, "r384T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r384TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L384 = {
    id: ID,
    title: 'Средняя скорость: путь и время',
    ico: '🚴',
    src: 'Математика · 5–6 класс · Олимп-5: движение',
    subj: 'math',
    explain: [
      'Ипподром Сиракуз, гонка колесниц Гиерона и карфагенянина Магона. Средняя скорость — весь путь, делённый на всё время, а не среднее от скоростей.',
      'Колесница: 2 часа по 40 км/ч и 1 час по 70. Призрак с постоянной скоростью приходит вместе с ней только при 50 км/ч: путь 150 км, время 3 ч. Ловушка 55 — среднее скоростей.',
      'Гонец в Катану: 60 км туда по 60 км/ч — час, обратно по 40 км/ч — полтора часа. Путь 120 км, время 2,5 ч, средняя 48, а не 50.',
      'Скорость «весит» столько, сколько по ней ехали времени. Простое среднее скоростей верно только при равных временах: 1 ч по 40 и 1 ч по 70 — средняя 55.',
      'Стоянка — тоже время пути: 2 ч по 30 и час у водопоя — средняя 60 : 3 = 20.',
      'Первую половину 60 км проехали по 30 км/ч — это уже час. Для средней 60 на весь путь нужен всего час, на вторую половину времени не остаётся: невозможно.',
      'Равные времена — можно брать среднее скоростей; равные пути — нельзя, средняя получается меньше.',
      'Заезд 12 км: полпути по 20 и полпути по 40 — 27 минут; ровно по 30 — 24 минуты. Побеждает ровный ход.',
      'Чтобы отыграть полпути по 20 и догнать ровные 30, вторую половину нужно ехать 60.',
      'Итог: весь путь : всё время, вместе со стоянками. Среднее скоростей — только при равных временах.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: путь и время.',
      'Тренажёр 2: ловушки.',
      'Тренажёр 3: гонки.'
    ],
    check: {
      q: '2 часа по 40 км/ч и 1 час по 70 км/ч. Средняя скорость?',
      choices: ['55 км/ч','50 км/ч','45 км/ч','60 км/ч'],
      ans: 1,
      exp: 'Путь 150 км, время 3 ч: 150 : 3 = 50 км/ч.'
    },
    tasks: [
      { q:'Весь путь 120 км, время 3 часа. Средняя скорость?', kind:'unit', ans:40, tol:0,
        hints:['Средняя = путь : время.','120 : 3.'], sol:'40 км/ч.' },
      { q:'60 км туда по 60 км/ч и обратно по 40 км/ч. Средняя скорость?', kind:'unit', ans:48, tol:0,
        hints:['Время туда 1 ч, обратно 1,5 ч.','120 : 2,5.'], sol:'48 км/ч.' },
      { q:'Почему нельзя просто усреднить 40 и 70, если ехали 2 ч и 1 ч?', kind:'choice',
        choices:['времена движения разные','числа слишком большие'], ans:0,
        hints:['Скорость «весит» столько, сколько по ней ехали.','Времена разные.'], sol:'Времена разные.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L384.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Ипподром',2:'Призрак',3:'Гонец в Катану',4:'Весы времени',5:'Стоянка',
      6:'Невозможная средняя',7:'Когда можно усреднять',8:'Решающий заезд',9:'Совет Архимеда',10:'После гонки',
      11:'Практика',12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l384" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Средняя скорость'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r384V=(д)=>{ const s=S(); s.v2=Math.max(35,Math.min(70,(s.v2||40)+д)); chRender(0); };
  window.r384Отв2=(к)=>{ const s=S(); s.ответ2=к; if(к===1) s.дело_призрак=true; chRender(0); };
  window.r384Отв3=(к)=>{ const s=S(); s.ответ3=к; if(к===1) s.дело_катана=true; chRender(0); };
  window.r384Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r384Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r384Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r384Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r384Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===1) s.дело_гонка=true; chRender(0); };
  window.r384Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r384Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r384Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r384T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r384TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L384; else arr.push(L384); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA384={render:render, L:L384};
})();
