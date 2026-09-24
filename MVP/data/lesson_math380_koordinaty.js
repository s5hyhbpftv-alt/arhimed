/* ====== МАТЕМАТИКА · УРОК 380 · «КООРДИНАТНАЯ ПЛОСКОСТЬ» ============================
   5–6 класс. Переделан с нуля по эталону 1022 (deploy/ЭТАЛОН_УРОКА.md), рисунки —
   сцена из сюжета. Прежние версии (vis_wk.js visW380, vis_bw.js) остаются в
   общих файлах; этот файл регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Точку на плоскости задают ДВА числа (x; y): сначала шаги по
   горизонтали (x: вправо +, влево −), потом по вертикали (y: вверх +, вниз −)
   от начала (0; 0). Порядок важен: (3; 2) и (2; 3) — разные точки.

   СЮЖЕТ. «Коготь Архимеда». 212 год до н. э., римский флот Марцелла идёт на
   Сиракузы. Архимед расчертил гавань невидимой сеткой: начало — маяк, оси —
   мол и береговая стена. Дозорные на башне выкрикивают координаты, ученик
   наводит катапульту и «Коготь» — железную лапу, которая поднимает корабли.

   РУКАМИ: катапульта — касание узла сетки 44 × 44 (цели (3; 2), (−2; −3),
   (−3; 0)); снаряд летит по дуге, промах даёт всплеск и разбор ошибки
   («перепутал порядок», «минус — это влево/вниз»).

   ВСЕ ОТВЕТЫ ПРОВЕРЕНЫ:
     запись «3 вправо, 4 вверх» — (3; 4);
     флагман в точке (−3; 1); четверть с двумя минусами — III;
     (−2; 1) и (3; 1): одна высота, расстояние 3 − (−2) = 5 клеток;
     зона Когтя: −2 ≤ x ≤ 2, −1 ≤ y ≤ 2 → из (3; 1), (1; −2), (−1; 1) внутри
       только (−1; 1);
     квадрат (1; 1), (1; −2), (−2; −2) → четвёртая вершина (−2; 1).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 380;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', ОГОНЬ='#ffa050';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'катапульта', имя:'Три точных выстрела',   итог:'3 из 3'},
    {ключ:'сигнал',     имя:'Найти флагман Марцелла', итог:'(−3; 1)'},
    {ключ:'коготь',     имя:'Поднять корабль Когтем', итог:'(−1; 1)'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* цели катапульты по кадрам */
  const ЦЕЛИ = { 2:[3,2], 3:[-2,-3], 4:[-3,0] };

  const CSS=`
  #lvis .s6.l380{gap:14px}
  #lvis .s6.l380 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l380 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l380 .pic svg .узел{cursor:pointer}
  #lvis .s6.l380 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l380 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l380 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l380 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l380 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l380 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l380 .карт .текст b{color:${GOLD}}
  #lvis .s6.l380 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l380 .правило b{color:${GOLD}}
  #lvis .s6.l380 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(255,160,80,.16),rgba(255,160,80,.04));
    border:1.5px solid rgba(255,160,80,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l380 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l380 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ОГОНЬ}}
  #lvis .s6.l380 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l380 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l380 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l380 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l380 .лист li.есть{color:${ИНК}}
  #lvis .s6.l380 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l380 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l380 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l380 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l380 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l380 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l380 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l380 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l380 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l380 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:17px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l380 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l380 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l380 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l380 .уровни .точка.сейчас{background:${GOLD};animation:l380dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l380dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l380 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l380{-webkit-text-size-adjust:100%}
  #lvis .s6.l380 [data-anim]{animation:l380rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l380rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l380 [data-anim]{animation:none!important}
    #lvis .s6.l380 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l380 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l380-style');
      if(!s){ s=document.createElement('style'); s.id='l380-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Коготь Архимеда</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Оборона гавани</span><b class="${всё?'готово':''}">${
        всё?'флот отбит':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}
           <span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };
  const коорд = (x,y) => '('+String(x).replace('-','−')+'; '+String(y).replace('-','−')+')';

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
  const анКач = (значения,длит) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="rotate" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="${сплайны(2)}" additive="sum"/>${ЗАВОД}` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const вырасти = (длит,доля) => анК('opacity','0.15;0.15;1;1',длит,'0;'+кт(доля)+';'+кт(доля+0.06)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c380-закат" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c1438"/><stop offset="0.35" stop-color="#6a2a4a"/><stop offset="0.7" stop-color="#d8603a"/><stop offset="1" stop-color="#ffb060"/>
      </linearGradient>
      <linearGradient id="c380-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a5a88"/><stop offset="0.25" stop-color="#1e3e6a"/><stop offset="1" stop-color="#0a1a36"/>
      </linearGradient>
      <linearGradient id="c380-вода" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1e4a78"/><stop offset="1" stop-color="#0c2448"/>
      </linearGradient>
      <radialGradient id="c380-блик" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd090" stop-opacity=".55"/><stop offset="1" stop-color="#ffd090" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c380-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff4d0"/><stop offset="0.3" stop-color="#ffc070" stop-opacity=".9"/><stop offset="1" stop-color="#ff7040" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c380-камень" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c8b08a"/><stop offset="0.5" stop-color="#9a8260"/><stop offset="1" stop-color="#5a4a36"/>
      </linearGradient>
      <linearGradient id="c380-камень-т" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6a5840"/><stop offset="0.4" stop-color="#b09a74"/><stop offset="1" stop-color="#5a4a36"/>
      </linearGradient>
      <linearGradient id="c380-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a06a3a"/><stop offset="0.5" stop-color="#6a4020"/><stop offset="1" stop-color="#3a2010"/>
      </linearGradient>
      <linearGradient id="c380-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a3a22"/><stop offset="0.45" stop-color="#4a2012"/><stop offset="1" stop-color="#1a0a06"/>
      </linearGradient>
      <linearGradient id="c380-парус" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#d8c8a8"/><stop offset="0.5" stop-color="#f6ecd6"/><stop offset="1" stop-color="#c0ae8a"/>
      </linearGradient>
      <linearGradient id="c380-парус-з" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#c89a30"/><stop offset="0.5" stop-color="#ffe08a"/><stop offset="1" stop-color="#b08420"/>
      </linearGradient>
      <linearGradient id="c380-железо" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#c8ccd4"/><stop offset="0.5" stop-color="#6a7080"/><stop offset="1" stop-color="#2a2e38"/>
      </linearGradient>
      <radialGradient id="c380-взрыв" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffae0"/><stop offset="0.3" stop-color="#ffc040"/><stop offset="0.7" stop-color="#ff5a20" stop-opacity=".7"/><stop offset="1" stop-color="#ff3010" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c380-дым" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#4a3a40" stop-opacity=".75"/><stop offset="1" stop-color="#4a3a40" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c380-туман" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#c8d4e8" stop-opacity=".55"/><stop offset="1" stop-color="#c8d4e8" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c380-ядро" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#d8d0c0"/><stop offset="1" stop-color="#4a4238"/>
      </radialGradient>
      <filter id="c380-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".55"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c380-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* римская пентера: корпус с тараном и глазом, два ряда вёсел, парус с полосой */
  const корабль = (x,y,м,опц) => { const о=опц||{};
    const весла = Array.from({length:7},(_,i)=>{ const вx=-24+i*8;
      return `<line x1="${вx}" y1="4" x2="${вx-4}" y2="14" stroke="#2a1608" stroke-width="1.3">
        ${анЛин('x2',`${вx-6};${вx+2};${вx-6}`,'1.4s','begin="'+(i*0.08).toFixed(2)+'s"')}</line>`; }).join('');
    return `<g transform="translate(${x} ${y}) scale(${м||1})${о.зеркало?' scale(-1 1)':''}" filter="url(#c380-тень)">
      ${весла}
      <path d="M-36 -2 q2 10 12 12 h40 q12 -2 18 -12 l6 -2 l-6 -2 h-70 z" fill="url(#c380-корпус)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-38 -4 q-4 -8 2 -14" fill="none" stroke="#4a2012" stroke-width="3"/>
      <path d="M40 -2 l10 3 l-10 2 z" fill="url(#c380-железо)"/>
      <circle cx="30" cy="0" r="2.4" fill="#f4efe4"/><circle cx="30.6" cy="0" r="1.2" fill="#1a0a06"/>
      <line x1="-30" y1="-2" x2="34" y2="-2" stroke="#c89a50" stroke-width="1"/>
      <line x1="2" y1="-2" x2="2" y2="-40" stroke="#3a2010" stroke-width="2"/>
      <path d="M-14 -38 q16 4 32 0 v26 q-16 4 -32 0 z" fill="url(#c380-парус${о.флагман?'-з':''})" stroke="#8a7a5a" stroke-width=".6">
        ${анЛин('d','M-14 -38 q16 4 32 0 v26 q-16 4 -32 0 z;M-14 -38 q16 7 32 0 v26 q-16 7 -32 0 z;M-14 -38 q16 4 32 0 v26 q-16 4 -32 0 z','3s')}</path>
      <rect x="-14" y="-28" width="32" height="5" fill="${о.флагман?'#8a1a1a':'#b02a20'}" opacity=".9"/>
      ${о.флагман?`<path d="M2 -40 l12 -4 l-12 -4 z" fill="#b02a20"/>`:''}</g>`;
  };
  /* маленький кораблик-метка для сетки */
  const кораблик = (x,y,опц) => { const о=опц||{};
    return `<g transform="translate(${x} ${y})" filter="url(#c380-тень)">
      <path d="M-15 2 q2 6 8 7 h16 q6 -1 8 -7 z" fill="url(#c380-корпус)"/>
      <path d="M17 2 l5 1 l-5 1 z" fill="#8a909c"/>
      <line x1="0" y1="2" x2="0" y2="-18" stroke="#3a2010" stroke-width="1.6"/>
      <path d="M-8 -17 q8 2 16 0 v12 q-8 2 -16 0 z" fill="url(#c380-парус${о.флагман?'-з':''})"/>
      <rect x="-8" y="-12" width="16" height="3" fill="#b02a20"/>
      ${о.горит?`<circle cx="0" cy="-6" r="10" fill="url(#c380-взрыв)">${анЛин('r','8;13;8','0.8s')}</circle>`:''}</g>`;
  };
  /* стена Сиракуз с башнями */
  const стена = (x0,y,ш,в) => `<g filter="url(#c380-тень)">
    <rect x="${x0}" y="${y}" width="${ш}" height="${в}" fill="url(#c380-камень)"/>
    ${Array.from({length:Math.floor(ш/12)},(_,i)=>`<rect x="${x0+i*12}" y="${y-6}" width="7" height="7" fill="url(#c380-камень)"/>`).join('')}
    ${Array.from({length:Math.floor(в/10)},(_,r)=>`<line x1="${x0}" y1="${y+r*10}" x2="${x0+ш}" y2="${y+r*10}" stroke="#6a5840" stroke-width=".6" opacity=".6"/>`).join('')}</g>`;
  const башня = (x,y,ш,в) => `<g filter="url(#c380-тень)">
    <rect x="${x-ш/2}" y="${y-в}" width="${ш}" height="${в}" fill="url(#c380-камень-т)"/>
    ${[0,1,2].map(i=>`<rect x="${x-ш/2+i*(ш/3)+1}" y="${y-в-7}" width="${ш/3-3}" height="8" fill="url(#c380-камень-т)"/>`).join('')}
    <rect x="${x-3}" y="${y-в+10}" width="6" height="10" rx="3" fill="#2a1a10"/>
    <circle cx="${x}" cy="${y-в+15}" r="6" fill="#ffb040" opacity=".35">${анЛин('opacity','0.2;0.5;0.2','1.6s')}</circle></g>`;
  /* Коготь Архимеда: кран на стене, цепь и железная лапа */
  const коготь = (x,y,м,длина) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c380-тень)">
    <rect x="-6" y="-8" width="12" height="16" fill="url(#c380-дерево)"/>
    <g>${анКач('-4;6;-4','5s')}
      <path d="M0 -4 L${длина} -${длина*0.55}" stroke="url(#c380-дерево)" stroke-width="7" stroke-linecap="round"/>
      <path d="M0 -4 L${длина} -${длина*0.55}" stroke="#3a2010" stroke-width="1" stroke-dasharray="3 5"/>
      <line x1="${длина}" y1="-${длина*0.55}" x2="${длина}" y2="${-длина*0.55+44}" stroke="#4a4e58" stroke-width="2" stroke-dasharray="3 1.5"/>
      <g transform="translate(${длина} ${-длина*0.55+46})">
        <path d="M0 0 q-10 4 -10 14 q2 -6 6 -8 M0 0 q10 4 10 14 q-2 -6 -6 -8 M0 0 v16" fill="none" stroke="url(#c380-железо)" stroke-width="3.2" stroke-linecap="round"/></g></g></g>`;
  const дым = (x,y,r,задерж) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#c380-дым)" data-декор="1">
    ${анЛин('cy',`${y};${y-30};${y}`,(6+задерж).toFixed(1)+'s')}${анЛин('r',`${r};${r*1.5};${r}`,(6+задерж).toFixed(1)+'s')}</circle>`;

  /* ---- координатная сетка гавани: −3..3, клетка 44 ---- */
  const К=44, ОX=168, ОY=198;
  const px = (x) => ОX + x*К, py = (y) => ОY - y*К;
  const сетка = (опц) => { const о=опц||{};
    let s = `<rect x="${ОX-3.5*К}" y="${ОY-3.5*К}" width="${7*К}" height="${7*К}" rx="10" fill="url(#c380-вода)"/>
      ${[0,1,2,3,4].map(i=>`<path d="M${ОX-3.5*К} ${ОY-3*К+i*К*1.4} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#9fc8ff" stroke-width="1" opacity=".18" stroke-dasharray="12 16">${анЛин('stroke-dashoffset','0;-28',(3+i*0.5).toFixed(1)+'s')}</path>`).join('')}`;
    for(let i=-3;i<=3;i++){
      s += `<line x1="${px(i)}" y1="${py(3.4)}" x2="${px(i)}" y2="${py(-3.4)}" stroke="#6a8ac0" stroke-width=".7" opacity=".55"/>`;
      s += `<line x1="${px(-3.4)}" y1="${py(i)}" x2="${px(3.4)}" y2="${py(i)}" stroke="#6a8ac0" stroke-width=".7" opacity=".55"/>`;
    }
    s += `<line x1="${px(-3.45)}" y1="${ОY}" x2="${px(3.45)}" y2="${ОY}" stroke="${GOLD}" stroke-width="2"/>
      <path d="M${px(3.45)} ${ОY} l-8 -4 v8 z" fill="${GOLD}"/>
      <line x1="${ОX}" y1="${py(-3.45)}" x2="${ОX}" y2="${py(3.45)}" stroke="${GOLD}" stroke-width="2"/>
      <path d="M${ОX} ${py(3.45)} l-4 8 h8 z" fill="${GOLD}"/>
      ${т(px(3.45)-4,ОY-8,'x',14,GOLD,true,'end','#0a1a36')}${т(ОX+8,py(3.45)+12,'y',14,GOLD,true,'start','#0a1a36')}`;
    if(!о.безЧисел){
      for(let i=-3;i<=3;i++){ if(!i) continue;
        s += т(px(i),ОY+15,String(i).replace('-','−'),11,МУТ,true,undefined,'#0a1a36');
        s += т(ОX-8,py(i)+4,String(i).replace('-','−'),11,МУТ,true,'end','#0a1a36'); }
      s += т(ОX-8,ОY+15,'0',11,МУТ,true,'end','#0a1a36');
    }
    /* маяк в начале координат */
    s += `<g filter="url(#c380-тень)"><rect x="${ОX-4}" y="${ОY-14}" width="8" height="14" fill="#e8dcc0"/>
      <circle cx="${ОX}" cy="${ОY-16}" r="9" fill="url(#c380-взрыв)" opacity=".7">${анЛин('r','6;11;6','1.4s')}</circle></g>`;
    return s;
  };
  const узлы = (f) => { let s=''; for(let x=-3;x<=3;x++) for(let y=-3;y<=3;y++)
      s+=`<rect class="узел" x="${px(x)-К/2}" y="${py(y)-К/2}" width="${К}" height="${К}" fill="rgba(255,255,255,.001)" onclick="r380Выстрел(${f},${x},${y})"/>`;
    return s; };
  /* выстрел: дуга от катапульты (левый нижний угол) до узла, один раз */
  const выстрел = (x,y,попал) => { const x0=18, y0=ОY+3.5*К+6, x1=px(x), y1=py(y), вершина=Math.min(y1,y0)-70;
    const путь=`M${x0} ${y0} Q${(x0+x1)/2} ${вершина} ${x1} ${y1}`;
    return `<path d="${путь}" fill="none" stroke="${ОГОНЬ}" stroke-width="1.6" stroke-dasharray="4 5" opacity=".7"/>
      ${ДВИЖ?`<circle r="5" fill="url(#c380-ядро)"><animateMotion dur="0.8s" fill="freeze" path="${путь}" calcMode="spline" keyTimes="0;1" keyPoints="0;1" keySplines="0.4 0 0.6 1"/></circle>`:''}
      ${попал
        ? `<circle cx="${x1}" cy="${y1-6}" r="4" fill="url(#c380-взрыв)" opacity="0">
             <animate attributeName="r" values="4;26;20" keyTimes="0;0.5;1" dur="0.9s" begin="${ДВИЖ?'0.75s':'0s'}" fill="freeze"/>
             <animate attributeName="opacity" values="0;1;0.85" keyTimes="0;0.2;1" dur="0.9s" begin="${ДВИЖ?'0.75s':'0s'}" fill="freeze"/></circle>`
        : `<circle cx="${x1}" cy="${y1}" r="4" fill="none" stroke="#dff2ff" stroke-width="2" opacity="0">
             <animate attributeName="r" values="4;18" dur="0.8s" begin="${ДВИЖ?'0.75s':'0s'}" fill="freeze"/>
             <animate attributeName="opacity" values="0;1;0.4" keyTimes="0;0.2;1" dur="0.8s" begin="${ДВИЖ?'0.75s':'0s'}" fill="freeze"/></circle>
           <path d="M${x1-6} ${y1} q6 -20 12 0" fill="#dff2ff" opacity=".7"/>`}`;
  };
  const катапульта = () => `<g transform="translate(18 ${ОY+3.5*К+6})" filter="url(#c380-тень)">
    <rect x="-12" y="-4" width="26" height="8" fill="url(#c380-дерево)"/><circle cx="-8" cy="5" r="4" fill="#3a2010"/><circle cx="10" cy="5" r="4" fill="#3a2010"/>
    <line x1="0" y1="-2" x2="14" y2="-18" stroke="#6a4020" stroke-width="3"/></g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Флот Марцелла */
  function F1(s){
    const Н=320, в=s.ответ1;
    return ЛИСТ(s) +
      ЗАДАЧА('212 год до н. э. На горизонте — шестьдесят римских пентер Марцелла. Архимед поднимается на стену: «Гавань — это <b>плоскость</b>. Маяк — <b>начало</b>, мол — ось <b>x</b>, береговая стена — ось <b>y</b>. Каждый корабль — это два числа». Дозорные будут кричать числа, а ты — наводить катапульты и Коготь.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c380-закат)"/>
        <circle cx="236" cy="118" r="60" fill="url(#c380-солнце)"/>
        ${дым(70,80,26,0)}${дым(120,60,20,1.5)}${дым(270,70,30,0.8)}
        <rect x="0" y="130" width="336" height="${Н-130}" fill="url(#c380-море)"/>
        <ellipse cx="236" cy="140" rx="70" ry="6" fill="url(#c380-блик)" data-декор="1">${анЛин('rx','60;78;60','4s')}</ellipse>
        ${[0,1,2,3].map(i=>`<path d="M${-20+i*13} ${150+i*22} q30 -4 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#ffc890" stroke-width="1" opacity="${(0.4-i*0.08).toFixed(2)}" stroke-dasharray="16 22">${анЛин('stroke-dashoffset','0;-38',(3+i*0.5).toFixed(1)+'s')}</path>`).join('')}
        <g>${анСдвиг('0 0;-10 2;0 0','9s','0;0.5;1')}${корабль(250,150,0.55)}${корабль(300,160,0.5)}${корабль(200,168,0.6,{флагман:true})}</g>
        ${стена(0,214,150,Н-214)}
        ${башня(26,216,34,56)}${башня(126,216,30,44)}
        <g>${анСдвиг('0 0;0 -8;0 0','4s','0;0.5;1')}<g transform="translate(236 226) rotate(-22)">${корабль(0,0,1.15)}</g>
          <ellipse cx="206" cy="238" rx="30" ry="6" fill="#dff2ff" opacity=".5">${анЛин('rx','24;34;24','2s')}</ellipse></g>
        ${коготь(96,214,1,120)}
        <g>${анСдвиг('0 0;0 0;150 -100;150 -100','3s','0;0.2;0.8;1')}${ДВИЖ?`<circle cx="120" cy="206" r="5" fill="url(#c380-ядро)"/>`:''}</g>
        ${подпись(168,30, в===1?'сначала x, потом y: (3; 4)':'каждый корабль — два числа', в===1?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Координаты','Две оси пересекаются в <b>начале</b> (0; 0). Точку записывают парой <b>(x; y)</b>: x — сколько шагов по горизонтали, y — по вертикали. <b>Сначала x, потом y.</b>') +
      ОТВЕТЫ('три',['(4; 3)','(3; 4)','(34)'],1,в,'r380Отв1') +
      (в==null ? СКАЗ('Вопрос','Дозорный видит лодку: <b>3</b> шага вправо от маяка и <b>4</b> вверх. Как записать её место?') :
        РАЗБОР(в===1, ['(4; 3) — это 4 вправо и 3 вверх, совсем другая точка. Сначала пишут x: <b>(3; 4)</b>.','3 шага по x, 4 по y: <b>(3; 4)</b>. Точка с запятой разделяет числа.','«34» — это одно число, тридцать четыре. Нужна пара в скобках: <b>(3; 4)</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Точку задают <b>пара чисел (x; y)</b>, и порядок важен.') : '');
  }

  /* 2–4. Катапульта */
  function FКатапульта(s,f,текст,разборПопал,правило){
    const Н=374, цель=ЦЕЛИ[f], выстр=s['в'+f], попал=!!s['попал'+f];
    const [tx,ty]=цель;
    let разбор='';
    if(выстр && !попал){
      const [x,y]=выстр;
      if(x===ty && y===tx) разбор='Ты выстрелил в '+коорд(x,y)+' — числа <b>переставлены</b>. Первое число — x (по горизонтали), второе — y (по вертикали).';
      else if(x===-tx && y===ty) разбор='Всплеск в '+коорд(x,y)+'. Знак у x перепутан: <b>минус — влево</b>, плюс — вправо.';
      else if(x===tx && y===-ty) разбор='Всплеск в '+коорд(x,y)+'. Знак у y перепутан: <b>минус — вниз</b>, плюс — вверх.';
      else if(x===-tx && y===-ty) разбор='Всплеск в '+коорд(x,y)+' — перепутаны оба знака.';
      else разбор='Всплеск в '+коорд(x,y)+'. Считай шаги от маяка: сначала по x, потом по y.';
    }
    return ЛИСТ(s) + ЗАДАЧА(текст) +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка()}
        ${попал?кораблик(px(tx),py(ty),{горит:true}):''}
        ${[[-2,2,70],[2,-1,80],[-1,-2,64],[1,2,60],[3,1,50]].map(([x,y,r],i)=>`<ellipse cx="${px(x)}" cy="${py(y)}" rx="${r}" ry="${r*0.45}" fill="url(#c380-туман)" data-декор="1">${анЛин('cx',`${px(x)};${px(x)+18};${px(x)}`,(7+i).toFixed(0)+'s')}</ellipse>`).join('')}
        ${катапульта()}
        ${выстр?выстрел(выстр[0],выстр[1],попал):''}
        ${узлы(f)}
        ${подпись(168,24, 'дозорный: «'+коорд(tx,ty)+'!»', GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (попал ? РАЗБОР(true,разборПопал) + ПРАВИЛО(правило)
             : (выстр ? РАЗБОР(false,разбор+' Коснись другой точки.') : СКАЗ('Как стрелять','Коснись узла сетки, где стоит корабль '+коорд(tx,ty)+'. Числа на осях — шаги от маяка.')));
  }
  const F2 = (s) => FКатапульта(s,2,'Над гаванью туман — кораблей не видно, только дозорный на башне слышит вёсла. Он кричит: «<b>(3; 2)</b>!» Коснись узла сетки — туда полетит камень катапульты.',
    'Три шага вправо по x, два вверх по y — <b>(3; 2)</b>. Пентера горит!','Идём от начала: <b>сначала по оси x</b> (вправо — плюс), <b>потом по оси y</b> (вверх — плюс).');
  const F3 = (s) => FКатапульта(s,3,'Второй корабль заходит с юго-запада. «<b>(−2; −3)</b>!» Минус — значит, в обратную сторону от маяка.',
    'Два шага <b>влево</b> (x = −2) и три <b>вниз</b> (y = −3). Попадание!','Отрицательный <b>x — влево</b>, отрицательный <b>y — вниз</b>.');
  const F4 = (s) => FКатапульта(s,4,'Третий корабль прижался прямо к молу. «<b>(−3; 0)</b>!» Что значит ноль?',
    'y = 0 — ни шагу вверх или вниз: корабль стоит <b>на оси x</b>, три шага влево. Точно в цель!','Если <b>y = 0</b>, точка лежит на оси x; если <b>x = 0</b> — на оси y.');

  /* 5. Флагман */
  function F5(s){
    const Н=374, в=s.ответ5;
    const корабли=[[2,-1,false],[-3,1,true],[1,3,false],[3,-3,false]];
    return ЛИСТ(s) +
      ЗАДАЧА('Среди пентер — <b>флагман Марцелла</b> с золотым парусом. Если его поджечь, флот повернёт. Дозорный охрип — теперь ты кричишь координаты начальнику Когтя. Где флагман?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка()}
        ${корабли.map(([x,y,ф],i)=>`<g>${анСдвиг('0 0;0 -2;0 0',(2+i*0.3).toFixed(1)+'s','0;0.5;1')}${кораблик(px(x),py(y),{флагман:ф})}</g>`).join('')}
        ${в===1?`<line x1="${ОX}" y1="${ОY}" x2="${px(-3)}" y2="${ОY}" stroke="${GREEN}" stroke-width="3"/><line x1="${px(-3)}" y1="${ОY}" x2="${px(-3)}" y2="${py(1)}" stroke="${GREEN}" stroke-width="3"/>`:''}
        ${подпись(168,24, в===1?'3 влево, 1 вверх: (−3; 1)':'где золотой парус?', в===1?GREEN:GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['(1; −3)','(−3; 1)','(3; 1)'],1,в,'r380Отв5') +
      (в==null ? СКАЗ('Вопрос','Координаты флагмана?') : РАЗБОР(в===1, ['(1; −3) — числа переставлены: это 1 вправо и 3 вниз. Флагман: 3 <b>влево</b>, 1 вверх — <b>(−3; 1)</b>.','От маяка 3 шага влево — x = −3, 1 шаг вверх — y = 1: <b>(−3; 1)</b>. Коготь разворачивается!','(3; 1) — это вправо. Флагман слева от оси y, поэтому x отрицательный: <b>(−3; 1)</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Чтобы прочитать координаты, опусти перпендикуляры на оси: <b>x — с горизонтальной, y — с вертикальной</b>.') : '');
  }

  /* 6. Четверти */
  function F6(s){
    const Н=374, в=s.ответ6;
    const ЧЕТВ=[['I','(+; +)',1,1],['II','(−; +)',-1,1],['III','(−; −)',-1,-1],['IV','(+; −)',1,-1]];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед делит гавань осями на <b>четыре четверти</b> и ставит в каждую свой отряд. Римляне высаживаются там, где у точек <b>оба числа отрицательные</b>. Куда послать отряд?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка({безЧисел:true})}
        ${ЧЕТВ.map(([н,зн,sx,sy],i)=>{ const x=ОX+sx*1.75*К, y=ОY-sy*1.75*К, цель=н==='III';
          return `<g>${вырасти('8s',0.04+i*0.14)}
            <rect x="${ОX+(sx>0?4:-3.4*К)}" y="${ОY+(sy>0?-3.4*К:4)}" width="${3.4*К-4}" height="${3.4*К-4}" rx="8" fill="${цель&&в===2?'rgba(143,224,176,.18)':'rgba(255,255,255,.04)'}"/>
            ${т(x,y-4,н,26,цель&&в===2?GREEN:GOLD,true,undefined,'#0a1a36')}
            ${т(x,y+20,зн,14,ИНК,true,undefined,'#0a1a36')}</g>`; }).join('')}
        ${подпись(168,24, в===2?'III четверть: x < 0 и y < 0':'знаки x и y в каждой четверти', в===2?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['I','II','III'],2,в,'r380Отв6') +
      (в==null ? СКАЗ('Вопрос','В какой четверти оба числа отрицательны?') : РАЗБОР(в===2, ['В I четверти оба числа <b>положительны</b>: вправо и вверх. Оба минуса — влево и вниз: <b>III</b>.','Во II четверти x отрицательный, а y положительный — влево и вверх. Оба минуса — <b>III</b>.','Влево — x < 0, вниз — y < 0: <b>III четверть</b>, левая нижняя. Отряд уже бежит!'][в])) +
      (в===2 ? ПРАВИЛО('Четверти считают <b>против часовой стрелки</b> от правой верхней: I (+; +), II (−; +), III (−; −), IV (+; −).') : '');
  }

  /* 7. Расстояние по сетке */
  function F7(s){
    const Н=374, в=s.ответ7;
    const A1=[-2,1], B1=[3,1];
    return ЛИСТ(s) +
      ЗАДАЧА('Два римских корабля стоят на одной линии: в <b>(−2; 1)</b> и в <b>(3; 1)</b>. Между ними хотят натянуть цепь с огнём. Сколько клеток сетки должна покрыть цепь?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка()}
        ${кораблик(px(A1[0]),py(A1[1]))}${кораблик(px(B1[0]),py(B1[1]))}
        <path d="M${px(-2)} ${py(1)+10} Q${ОX+К/2} ${py(1)+26} ${px(3)} ${py(1)+10}" fill="none" stroke="${ОГОНЬ}" stroke-width="3" stroke-dasharray="6 4">${анЛин('stroke-dashoffset','0;-20','0.8s')}</path>
        ${в===0?Array.from({length:5},(_,i)=>т(px(-2)+К/2+i*К,py(1)-8,String(i+1),14,GREEN,true,undefined,'#0a1a36')).join(''):''}
        ${подпись(168,24, в===0?'3 − (−2) = 5 клеток':'одна высота y = 1 — считай по x', в===0?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['5','1','3'],0,в,'r380Отв7') +
      (в==null ? СКАЗ('Вопрос','Сколько клеток?') : РАЗБОР(в===0, ['От −2 до 0 — две клетки, от 0 до 3 — три: <b>5</b>. Это 3 − (−2).','1 = 3 − 2 — знак минуса у −2 потерян. От −2 до 3 через ноль: 2 + 3 = <b>5</b>.','3 — это только от маяка до правого корабля. Левый ещё на 2 клетки левее: <b>5</b>.'][в])) +
      (в===0 ? ПРАВИЛО('Если y одинаковые, расстояние — это <b>разность x</b>: большее минус меньшее.') : '');
  }

  /* 8. Зона Когтя */
  function F8(s){
    const Н=374, в=s.ответ8;
    const КОРАБЛИ=[[3,1],[1,-2],[-1,1]];
    return ЛИСТ(s) +
      ЗАДАЧА('<b>Коготь Архимеда</b> дотягивается до прямоугольника гавани: от x = −2 до x = 2 и от y = −1 до y = 2. Какой из трёх кораблей он может поднять за нос и перевернуть?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка()}
        <rect x="${px(-2)}" y="${py(2)}" width="${4*К}" height="${3*К}" fill="rgba(255,160,80,.16)" stroke="${ОГОНЬ}" stroke-width="2.2" stroke-dasharray="8 5" data-декор="1">
          ${анЛин('stroke-dashoffset','0;-26','1.4s')}</rect>
        ${КОРАБЛИ.map(([x,y],i)=>`<g>${в===2&&i===2?анСдвиг('0 0;0 -22;0 -22;0 0','3s','0;0.4;0.7;1'):''}${кораблик(px(x),py(y))}</g>
          ${т(px(x),py(y)+22,String(i+1),12,GOLD,true,undefined,'#0a1a36')}`).join('')}
        ${подпись(168,24, в===2?'(−1; 1): −2 ≤ −1 ≤ 2 и −1 ≤ 1 ≤ 2':'проверь и x, и y', в===2?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['(3; 1)','(1; −2)','(−1; 1)'],2,в,'r380Отв8') +
      (в==null ? СКАЗ('Вопрос','Какой корабль в зоне Когтя?') : РАЗБОР(в===2, ['y = 1 подходит, но x = 3 больше 2 — корабль правее зоны. Внутри только <b>(−1; 1)</b>.','x = 1 подходит, но y = −2 меньше −1 — корабль ниже зоны. Внутри — <b>(−1; 1)</b>.','x = −1 между −2 и 2, y = 1 между −1 и 2 — <b>обе</b> координаты в зоне. Коготь поднимает пентеру!'][в])) +
      (в===2 ? ПРАВИЛО('Точка внутри прямоугольника, если <b>и x, и y</b> лежат в своих границах.') : '');
  }

  /* 9. Четвёртая вершина */
  function F9(s){
    const Н=374, в=s.ответ9;
    const В3=[[1,1],[1,-2],[-2,-2]], ОТВ=[-2,1];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед ставит на воде четыре горящих бочки — вершины квадрата-ловушки. Три уже плывут: <b>(1; 1)</b>, <b>(1; −2)</b>, <b>(−2; −2)</b>. Где поставить четвёртую?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#0a1226"/>
        ${сетка()}
        <path d="M${px(1)} ${py(1)} L${px(1)} ${py(-2)} L${px(-2)} ${py(-2)}" fill="none" stroke="${ОГОНЬ}" stroke-width="2.4"/>
        <path d="M${px(-2)} ${py(-2)} L${px(-2)} ${py(1)} L${px(1)} ${py(1)}" fill="none" stroke="${в===1?GREEN:GOLD}" stroke-width="2" stroke-dasharray="6 5">${анЛин('stroke-dashoffset','0;-22','1.2s')}</path>
        ${В3.map(([x,y])=>`<g filter="url(#c380-тень)"><rect x="${px(x)-7}" y="${py(y)-9}" width="14" height="18" rx="4" fill="url(#c380-дерево)"/>
          <circle cx="${px(x)}" cy="${py(y)-12}" r="8" fill="url(#c380-взрыв)">${анЛин('r','6;10;6','0.9s')}</circle></g>`).join('')}
        <g>${анЛин('opacity','1;0.4;1','1.2s')}<circle cx="${px(ОТВ[0])}" cy="${py(ОТВ[1])}" r="10" fill="none" stroke="${в===1?GREEN:GOLD}" stroke-width="2"/></g>
        ${подпись(168,24, в===1?'x как у (−2; −2), y как у (1; 1)':'стороны квадрата — по линиям сетки', в===1?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['(1; −2)','(−2; 1)','(2; −1)'],1,в,'r380Отв9') +
      (в==null ? СКАЗ('Вопрос','Координаты четвёртой бочки?') : РАЗБОР(в===1, ['(1; −2) уже занята — это вторая бочка. Четвёртая: x = −2 (над третьей), y = 1 (на высоте первой): <b>(−2; 1)</b>.','Четвёртая вершина стоит над (−2; −2) на высоте (1; 1): <b>(−2; 1)</b>. Сторона квадрата — 3 клетки.','(2; −1) — числа из «−2 и 1» переставлены и знаки сбиты. Нужно <b>(−2; 1)</b>.'][в])) +
      (в===1 ? ПРАВИЛО('У точек на одной вертикали <b>одинаковый x</b>, на одной горизонтали — <b>одинаковый y</b>.') : '');
  }

  /* 10. Флот отбит */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=320;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Флагман горит, Коготь переворачивает пентеры одну за другой. Марцелл отводит флот и, говорят, шутит: «Архимед черпает нашими кораблями воду из моря, как ковшом». Сиракузы выстояли — благодаря двум числам в скобках.'
        : 'Оборона ещё не готова — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c380-закат)"/>
        <circle cx="236" cy="118" r="60" fill="url(#c380-солнце)"/>
        ${дым(210,90,30,0)}${дым(260,70,24,1)}
        <rect x="0" y="130" width="336" height="${Н-130}" fill="url(#c380-море)"/>
        <g>${анСдвиг('0 0;60 -6;60 -6','9s','0;0.8;1')}${корабль(250,156,0.5,{зеркало:true})}${корабль(290,166,0.45,{зеркало:true})}</g>
        <g transform="translate(206 180) rotate(-24)">${корабль(0,0,0.7,{флагман:true})}</g>
        <circle cx="206" cy="160" r="22" fill="url(#c380-взрыв)">${анЛин('r','18;26;18','0.9s')}</circle>
        ${стена(0,214,150,Н-214)}
        ${башня(26,216,34,56)}${башня(126,216,30,44)}
        ${коготь(96,214,1,72)}
        <g>${проявить('9s',0.1,0.2)}${подпись(168,30,'точка — пара чисел (x; y)',GOLD,12)}</g>
        <g>${проявить('9s',0.3,0.4)}${подпись(168,58,'минус x — влево, минус y — вниз',GOLD,12)}</g>
        <g>${проявить('9s',0.5,0.6)}${подпись(168,Н-12,'сначала x, потом y',GREEN,13)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Координатная плоскость — две оси с общим <b>началом</b> (0; 0). Точку задают парой <b>(x; y)</b>: сначала x — по горизонтали (вправо +, влево −), потом y — по вертикали (вверх +, вниз −). Оси делят плоскость на четыре четверти. На одной горизонтали у точек одинаковый y, на одной вертикали — одинаковый x.') +
      ПРАВИЛО('<b>Сначала x, потом y — и не теряй минус.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какая координата у точки (7; 3) первая?', варианты:[{т:'x = 7',ок:true},{т:'y = 7',ок:false}], разбор:'Сначала пишут x.' },
    { вопрос:'Куда идти от начала в точку (−3; 2)?', варианты:[{т:'вправо 3, вверх 2',ок:false},{т:'влево 3, вверх 2',ок:true}], разбор:'Минус у x — влево.' },
    { вопрос:'Где лежит точка (0; −4)?', варианты:[{т:'на оси y',ок:true},{т:'на оси x',ок:false}], разбор:'x = 0 — ни шагу по горизонтали.' },
    { вопрос:'В какой четверти точка (5; −1)?', варианты:[{т:'IV',ок:true},{т:'II',ок:false}], разбор:'Вправо и вниз — IV.' },
    { вопрос:'Расстояние между (−1; 4) и (−1; −2)?', варианты:[{т:'2',ок:false},{т:'6',ок:true}], разбор:'Один x, по y: 4 − (−2) = 6.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r380Reset()")}</div>` +
        ПРАВИЛО('<b>(x; y): сначала x, потом y.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r380Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Прочитай точку', задания:[
    {q:'4 вправо и 1 вниз от начала — это…', в:1, варианты:['(1; −4)','(4; −1)'], раз:'Сначала x = 4, потом y = −1.'},
    {q:'2 влево и 5 вверх — это…', в:0, варианты:['(−2; 5)','(5; −2)'], раз:'x = −2, y = 5.'},
    {q:'Точка на оси x в 3 шагах влево — это…', в:1, варианты:['(0; −3)','(−3; 0)'], раз:'На оси x y = 0.'},
    {q:'Начало координат — это…', в:0, варианты:['(0; 0)','(1; 1)'], раз:'Ноль шагов.'}
  ]};
  const Т2 = { имя:'Четверти и оси', задания:[
    {q:'Точка (−4; −4) — в какой четверти?', в:1, варианты:['I','III'], раз:'Оба минуса.'},
    {q:'Точка (−2; 6) — в какой четверти?', в:0, варианты:['II','IV'], раз:'Влево и вверх.'},
    {q:'Точка (0; 5) лежит…', в:1, варианты:['на оси x','на оси y'], раз:'x = 0.'},
    {q:'У точек на оси x вторая координата…', в:0, варианты:['0','1'], раз:'Ни вверх, ни вниз.'}
  ]};
  const Т3 = { имя:'Олимпиадные', задания:[
    {q:'Прямоугольник (0; 0), (4; 0), (4; 3), (0; 3). Его площадь?', в:1, варианты:['7','12'], раз:'4 · 3.'},
    {q:'Середина отрезка от (−4; 2) до (2; 2)?', в:0, варианты:['(−1; 2)','(−2; 2)'], раз:'(−4 + 2) : 2 = −1.'},
    {q:'Точку (2; 5) отразили относительно оси x. Получилось…', в:1, варианты:['(−2; 5)','(2; −5)'], раз:'Меняется знак y.'},
    {q:'Сколько узлов сетки с целыми координатами на отрезке от (0; 0) до (5; 0)?', в:0, варианты:['6','5'], раз:'0, 1, 2, 3, 4, 5.'}
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
        в, "r380T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r380TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L380 = {
    id: ID,
    title: 'Координатная плоскость',
    ico: '🗺️',
    src: 'Математика · 5–6 класс · Координаты',
    subj: 'math',
    explain: [
      'Римский флот идёт на Сиракузы. Архимед расчертил гавань: маяк — начало (0; 0), две оси — x и y. Точку задают парой (x; y): сначала x, потом y.',
      'Катапульта: (3; 2) — три шага вправо по x и два вверх по y.',
      'Отрицательные координаты: (−2; −3) — два шага влево и три вниз.',
      'Ноль в координате: (−3; 0) лежит на оси x; точка с x = 0 — на оси y.',
      'Чтобы прочитать координаты корабля, опускают перпендикуляры на оси: флагман — (−3; 1).',
      'Оси делят плоскость на четыре четверти; в III четверти оба числа отрицательны.',
      'У точек (−2; 1) и (3; 1) одинаковый y, расстояние между ними — 3 − (−2) = 5 клеток.',
      'Точка внутри прямоугольника, если и x, и y лежат в своих границах: в зоне Когтя — (−1; 1).',
      'Четвёртая вершина квадрата (1; 1), (1; −2), (−2; −2) — это (−2; 1): на одной вертикали одинаковый x, на одной горизонтали — y.',
      'Итог: пара (x; y), знаки и направления, оси и четверти.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: прочитай точку.',
      'Тренажёр 2: четверти и оси.',
      'Тренажёр 3: олимпиадные задачи.'
    ],
    check: {
      q: 'Точка: 3 по оси x и 4 по оси y. Как её записать?',
      choices: ['(4; 3)','(3; 4)','(3, 4)','(34)'],
      ans: 1,
      exp: 'Сначала x, потом y: (3; 4).'
    },
    tasks: [
      { q:'Назови координату x точки (7; 3).', kind:'unit', ans:7, tol:0,
        hints:['Первая координата — x.','x = 7.'], sol:'7' },
      { q:'Куда идём от начала, чтобы попасть в точку (−3; 2)?', kind:'choice', choices:['вправо 3, вверх 2','влево 3, вверх 2','влево 3, вниз 2','вправо 3, вниз 2'], ans:1,
        hints:['Отрицательный x — влево.','y = 2 — вверх.'], sol:'влево 3, вверх 2' },
      { q:'Сколько клеток между точками (−2; 1) и (3; 1)?', kind:'unit', ans:5, tol:0,
        hints:['y одинаковые — считай по x.','3 − (−2).'], sol:'5' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L380.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Флот Марцелла',2:'Первый выстрел',3:'Минус — назад',4:'Корабль на оси',5:'Флагман',
      6:'Четыре четверти',7:'Огненная цепь',8:'Зона Когтя',9:'Квадрат-ловушка',10:'Флот отбит',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l380" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Координаты'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r380Отв1=(к)=>{ S().ответ1=к; chRender(0); };
  window.r380Выстрел=(f,x,y)=>{ const s=S(); if(s['попал'+f]) return;
    const [tx,ty]=ЦЕЛИ[f]; s['в'+f]=[x,y];
    if(x===tx && y===ty){ s['попал'+f]=true; if(s.попал2&&s.попал3&&s.попал4) s.дело_катапульта=true; }
    chRender(0); };
  window.r380Отв5=(к)=>{ const s=S(); s.ответ5=к; if(к===1) s.дело_сигнал=true; chRender(0); };
  window.r380Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r380Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r380Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===2) s.дело_коготь=true; chRender(0); };
  window.r380Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r380Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r380Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r380T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r380TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L380; else arr.push(L380); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA380={render:render, L:L380};
})();
