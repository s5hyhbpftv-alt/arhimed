/* ====== МАТЕМАТИКА · УРОК 385 · «ПЕРЕЛИВАНИЯ: ОПТИМУМ» ============================
   5–6 класс, олимпиадная тема «переливания». Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (vis_wk.js visW385, vis_bw.js visB385) остаются в общих файлах; этот файл
   регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Переливание — это цепочка СОСТОЯНИЙ (сколько воды в каждом
   сосуде). Шаг — одно из трёх действий: наполнить, вылить, перелить (пока один
   не опустеет или другой не наполнится). Ответ ищут перебором путей, а
   «оптимум» — самый короткий путь; часто стоит попробовать начать с другого
   сосуда. Отмерить можно только объём, кратный НОД ёмкостей.

   СЮЖЕТ. Осада Сиракуз. Римляне перекрыли акведук. Под Ортигией — древний
   шлюз к источнику Аретусы: он открывается, только если на медную чашу налить
   ровно отмеренную воду. Наверху ходит римский часовой — каждое переливание
   плещет, лишний шум опасен. Ученик Архимеда проходит три шлюза.

   РУКАМИ: три головоломки на одном движке — кувшины 5 и 3 (4 л), дележ вина
   8-5-3 пополам, кувшины 7 и 3 (1 л). Счётчик действий и часовой, который
   настораживается, когда путь длиннее лучшего.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ (перебором в ширину):
     5 и 3 → 4 л в большом: лучший путь 6 действий — (5,0) (2,3) (2,0) (0,2)
       (5,2) (4,3); с малого — 8 действий: (0,3) (3,0) (3,3) (5,1) (0,1) (1,0)
       (1,3) (4,0); записи 5 + 5 − 3 − 3 = 4 и 3 + 3 + 3 − 5 = 4;
     6 и 4 → 3 л: нельзя, любой объём чётный (НОД = 2);
     8, 5, 3, вино пополам 4 + 4: лучший путь 7 действий — (3,5,0) (3,2,3)
       (6,2,0) (6,0,2) (1,5,2) (1,4,3) (4,4,0);
     7 и 3 → 1 л в большом: 4 действия — (7,0) (4,3) (4,0) (1,3); 7 − 3 − 3 = 1;
     наклон цилиндрического кувшина: поверхность от края горлышка до края дна
       — ровно половина (3 л → 1,5 л).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 385;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', БРОНЗА='#e0a050';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'шлюз', имя:'Открыть первый шлюз',  итог:'4 л'},
    {ключ:'вино', имя:'Поделить вино пополам', итог:'4 + 4'},
    {ключ:'мера', имя:'Отмерить 1 л лекарю',   итог:'1 л'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* три головоломки на одном движке */
  const ЗАДАЧИ = {
    2: {ёмк:[5,3], старт:[0,0], лучший:6, дело:'шлюз', цель:(v)=>v[0]===4, цельТекст:'4 л в большом',
        жидк:'вода', уровень:[4,null]},
    6: {ёмк:[8,5,3], старт:[8,0,0], лучший:7, дело:'вино', цель:(v)=>v[0]===4&&v[1]===4, цельТекст:'4 + 4',
        жидк:'вино', уровень:[4,4,null], безВоды:true},
    9: {ёмк:[7,3], старт:[0,0], лучший:4, дело:'мера', цель:(v)=>v[0]===1, цельТекст:'1 л в большом',
        жидк:'вода', уровень:[1,null]}
  };

  const CSS=`
  #lvis .s6.l385{gap:14px}
  #lvis .s6.l385 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l385 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l385 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l385 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l385 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l385 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l385 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l385 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l385 .карт .текст b{color:${GOLD}}
  #lvis .s6.l385 .карт .путь{font-size:16px;line-height:1.6;color:var(--ink);font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
  #lvis .s6.l385 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l385 .правило b{color:${GOLD}}
  #lvis .s6.l385 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(143,208,240,.14),rgba(143,208,240,.04));
    border:1.5px solid rgba(143,208,240,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l385 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l385 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ЛАЗУРЬ}}
  #lvis .s6.l385 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l385 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l385 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l385 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l385 .лист li.есть{color:${ИНК}}
  #lvis .s6.l385 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l385 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l385 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l385 .ряд{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l385 .ряд button,#lvis .s6.l385 .сброс button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-weight:700;
    border:1.5px solid rgba(143,208,240,.5);background:rgba(143,208,240,.12);color:${ИНК};padding:6px 4px;
    font-variant-numeric:tabular-nums;white-space:nowrap;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l385 .ряд button:active,#lvis .s6.l385 .сброс button:active{transform:translateY(2px);background:rgba(143,208,240,.26)}
  #lvis .s6.l385 .ряд button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l385 .сброс{display:flex;width:100%}
  #lvis .s6.l385 .сброс button{flex:1 1 100%;border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.05)}
  #lvis .s6.l385 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l385 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l385 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l385 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l385 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l385 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l385 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:17px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l385 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l385 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l385 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l385 .уровни .точка.сейчас{background:${GOLD};animation:l385dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l385dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l385 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l385{-webkit-text-size-adjust:100%}
  #lvis .s6.l385 [data-anim]{animation:l385rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l385rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l385 [data-anim]{animation:none!important}
    #lvis .s6.l385 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l385 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l385-style');
      if(!s){ s=document.createElement('style'); s.id='l385-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Шлюзы Аретусы</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Шлюзы</span><b class="${всё?'готово':''}">${
        всё?'вода в городе':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  /* один раз, с остановкой на последнем значении */
  const анРаз = (имя,от,до,длит) =>
    ДВИЖ ? `<animate attributeName="${имя}" from="${от}" to="${до}" dur="${длит}" fill="freeze"
              calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';
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
      <linearGradient id="c385-свод" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a1612"/><stop offset="0.6" stop-color="#2c241c"/><stop offset="1" stop-color="#3a2e22"/>
      </linearGradient>
      <linearGradient id="c385-камень" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a4c3c"/><stop offset="1" stop-color="#3a3026"/>
      </linearGradient>
      <linearGradient id="c385-вода" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9fe6ff"/><stop offset="0.3" stop-color="#3fa6d8"/><stop offset="1" stop-color="#145a8a"/>
      </linearGradient>
      <linearGradient id="c385-вино" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e07aa0"/><stop offset="0.3" stop-color="#9a2a50"/><stop offset="1" stop-color="#4a0c24"/>
      </linearGradient>
      <linearGradient id="c385-стекло" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(255,236,200,.18)"/><stop offset="0.3" stop-color="rgba(255,236,200,.05)"/><stop offset="1" stop-color="rgba(255,236,200,.14)"/>
      </linearGradient>
      <linearGradient id="c385-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d392"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <linearGradient id="c385-глина" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7a3a1c"/><stop offset="0.35" stop-color="#d0804c"/><stop offset="0.65" stop-color="#b0602e"/><stop offset="1" stop-color="#5a2610"/>
      </linearGradient>
      <linearGradient id="c385-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0c1230"/><stop offset="1" stop-color="#26305a"/>
      </linearGradient>
      <radialGradient id="c385-факел" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff2c0" stop-opacity=".9"/><stop offset="0.35" stop-color="#ffb050" stop-opacity=".45"/><stop offset="1" stop-color="#ff7030" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c385-родник" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#bff4ff" stop-opacity=".9"/><stop offset="0.5" stop-color="#3fa6d8" stop-opacity=".5"/><stop offset="1" stop-color="#0c2a44" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c385-пламя" cx="0.5" cy="0.7" r="0.6">
        <stop offset="0" stop-color="#fff8d0"/><stop offset="0.5" stop-color="#ffb040"/><stop offset="1" stop-color="#e05020"/>
      </radialGradient>
      <filter id="c385-тень" x="-30%" y="-30%" width="160%" height="170%">
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
    return `<g filter="url(#c385-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* подземелье: свод, кладка, два факела */
  const подземелье = (в) => `
    <rect x="0" y="0" width="336" height="${в}" fill="url(#c385-свод)"/>
    ${Array.from({length:Math.ceil(в/22)},(_,r)=>Array.from({length:9},(_,c)=>
      `<rect x="${(c*42-(r%2)*21).toFixed(0)}" y="${r*22}" width="40" height="20" rx="2" fill="#2e261e" opacity=".55" data-декор="1"/>`).join('')).join('')}
    ${[26,310].map((x,i)=>`<g>
      <circle cx="${x}" cy="70" r="46" fill="url(#c385-факел)" data-декор="1">${анЛин('r','42;50;44;48;42',(1.7+i*0.3).toFixed(1)+'s')}</circle>
      <rect x="${x-3}" y="74" width="6" height="30" rx="2" fill="#5a3a1a"/>
      <path d="M${x} 52 q-9 12 -5 20 q5 5 10 0 q4 -8 -5 -20 z" fill="url(#c385-пламя)">${анЛин('d',
        `M${x} 52 q-9 12 -5 20 q5 5 10 0 q4 -8 -5 -20 z;M${x} 50 q-7 12 -5 22 q5 5 10 0 q2 -10 -5 -22 z;M${x} 52 q-9 12 -5 20 q5 5 10 0 q4 -8 -5 -20 z`,(0.9+i*0.2).toFixed(1)+'s')}</path></g>`).join('')}`;

  /* сосуд с делениями: x — левый край, низ — дно, hl — высота одного литра */
  const сосуд = (x,низ,w,hl,ёмк,v,pv,жидк,номер,цель) => {
    const верх=низ-ёмк*hl, id='c385-в'+номер, yv=низ-v*hl, ypv=низ-(pv==null?v:pv)*hl;
    const двиг = ДВИЖ && pv!=null && pv!==v;
    return `<g filter="url(#c385-тень)">
      <clipPath id="${id}"><rect x="${x+2}" y="${верх-2}" width="${w-4}" height="${ёмк*hl}" rx="7"/></clipPath>
      <rect x="${x}" y="${верх}" width="${w}" height="${ёмк*hl}" rx="9" fill="url(#c385-стекло)" stroke="#e8d6b0" stroke-width="2"/>
      <g clip-path="url(#${id})">
        <rect x="${x}" y="${двиг?ypv:yv}" width="${w}" height="${Math.max(0,низ-(двиг?ypv:yv)+2)}" fill="url(#c385-${жидк})">
          ${двиг?анРаз('y',ypv,yv,'0.7s')+анРаз('height',Math.max(0,низ-ypv+2),Math.max(0,низ-yv+2),'0.7s'):''}</rect>
        ${v>0?`<path d="M${x-10} ${yv+2} q8 -3 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" fill="none" stroke="#e8f8ff" stroke-width="1.4" opacity=".7" stroke-dasharray="10 6">
          ${анЛин('stroke-dashoffset','0;-16','1.6s')}</path>`:''}
      </g>
      ${Array.from({length:ёмк-1},(_,к)=>`<line x1="${x+2}" y1="${низ-(к+1)*hl}" x2="${x+10}" y2="${низ-(к+1)*hl}" stroke="#e8d6b0" stroke-width="1.2" opacity=".75"/>`).join('')}
      ${цель!=null?`<line x1="${x-6}" y1="${низ-цель*hl}" x2="${x+w+6}" y2="${низ-цель*hl}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 4">${анЛин('opacity','1;0.45;1','1.4s')}</line>`:''}
      <rect x="${x-4}" y="${верх-5}" width="${w+8}" height="7" rx="3" fill="url(#c385-бронза)"/>
      ${т(x+w/2,верх-12,ёмк+' л',13,МУТ,true)}
      ${т(x+w/2,низ+22,v+' л',18,цель!=null&&v===цель?GREEN:GOLD,true)}</g>`;
  };
  /* струя при переливании — один раз */
  const струя = (x1,y1,x2,y2,жидк) => ДВИЖ ? `<path d="M${x1} ${y1} C${x1+10} ${y1-18}, ${x2-10} ${y2-30}, ${x2} ${y2}" fill="none"
      stroke="url(#c385-${жидк})" stroke-width="5" stroke-linecap="round" opacity="0">
      <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.1;0.7;1" dur="0.9s" fill="freeze"/></path>` : '';
  /* часовой наверху: чем больше лишних шагов, тем тревожнее */
  const часовой = (шаги,лучший) => {
    const тревога = Math.max(0, шаги-лучший);
    return `<g>
      <rect x="0" y="0" width="336" height="36" fill="url(#c385-ночь)"/>
      <rect x="0" y="34" width="336" height="4" fill="#4a3e30"/>
      <g>${анСдвиг('0 0;150 0;150 0;0 0;0 0','14s','0;0.4;0.5;0.9;1')}
        <g transform="translate(70 34)">
          <rect x="-4" y="-22" width="8" height="14" rx="2" fill="#8a2a1a"/>
          <circle cx="0" cy="-26" r="5" fill="#d8a878"/>
          <path d="M-6 -28 q6 -9 12 0 z" fill="url(#c385-бронза)"/><path d="M-1 -35 q1 -5 5 -4" stroke="#c0302a" stroke-width="3" fill="none"/>
          <line x1="-2" y1="-8" x2="-3" y2="0" stroke="#3a2a1a" stroke-width="2"/><line x1="2" y1="-8" x2="3" y2="0" stroke="#3a2a1a" stroke-width="2"/>
          <line x1="7" y1="-34" x2="7" y2="0" stroke="#8a7a5a" stroke-width="1.5"/>
          ${тревога>0?`<g>${анЛин('opacity','1;0.3;1','0.8s')}${т(12,-14,'!'.repeat(Math.min(3,тревога)),14,RED,true,'start')}</g>`:''}
        </g></g>
      ${т(326,24,'действий: '+шаги,13,тревога>0?RED:ИНК,true,'end')}
    </g>`;
  };

  /* ================= ДВИЖОК ПЕРЕЛИВАНИЙ ================= */
  const состояние = (s,f) => {
    const з=ЗАДАЧИ[f];
    if(!Array.isArray(s['v'+f])) s['v'+f]=з.старт.slice();
    if(!Array.isArray(s['п'+f])) s['п'+f]=[з.старт.join('|')];
    return s['v'+f];
  };
  const расставить = (ёмк) => {
    /* ширина пропорциональна ёмкости, но не меньше 46 */
    const ш = ёмк.map(c=>Math.max(46, 26+c*7)), зазор=26;
    const всего = ш.reduce((a,b)=>a+b,0)+зазор*(ёмк.length-1);
    let x = (336-всего)/2;
    return ш.map(w=>{ const r=x; x+=w+зазор; return r; }).map((x,i)=>({x, w:ш[i]}));
  };
  function сценаДвижка(s,f,Н){
    const з=ЗАДАЧИ[f], v=состояние(s,f), pv=s['pv'+f], д=s['д'+f];
    const шаги=s['п'+f].length-1, низ=Н-58;
    const hl = Math.min(24, Math.floor((низ-70)/Math.max(...з.ёмк)));
    const места = расставить(з.ёмк);
    const готово = з.цель(v);
    let поток='';
    if(д && д[0]==='п'){ const i=+д[1], j=+д[2]; const a=места[i], b=места[j];
      поток = струя(a.x+a.w/2+(i<j?a.w/2-4:-a.w/2+4), низ-з.ёмк[i]*hl-4, b.x+b.w/2, низ-з.ёмк[j]*hl+6, з.жидк); }
    return подземелье(Н) + часовой(шаги,з.лучший) +
      места.map((м,i)=>сосуд(м.x,низ,м.w,hl,з.ёмк[i],v[i],pv?pv[i]:null,з.жидк,f+'-'+i,з.уровень[i])).join('') +
      поток +
      подпись(168,Н-8, готово ? (шаги<=з.лучший?'идеально: '+действий(шаги):'готово за '+шаги+', можно за '+з.лучший) : 'цель: '+з.цельТекст,
        готово?(шаги<=з.лучший?GREEN:GOLD):ИНК,13) + рамка(Н);
  }
  function кнопкиДвижка(s,f){
    const з=ЗАДАЧИ[f], v=состояние(s,f), готово=з.цель(v), к=з.ёмк;
    const Б = (i,надпись,код,нельзя) => BTN(3,'',надпись,"r385Шаг("+f+",'"+код+"')",готово||нельзя);
    const пер = (i,j) => Б(0, к[i]+' → '+к[j], 'п'+i+j, v[i]===0||v[j]===к[j]);
    let ряды;
    if(к.length===2){
      ряды = `<div class="ряд">${Б(0,'налить '+к[0],'н0',v[0]===к[0])}${пер(0,1)}${Б(0,'вылить '+к[0],'в0',v[0]===0)}</div>
              <div class="ряд">${Б(0,'налить '+к[1],'н1',v[1]===к[1])}${пер(1,0)}${Б(0,'вылить '+к[1],'в1',v[1]===0)}</div>`;
    } else {
      ряды = `<div class="ряд">${пер(0,1)}${пер(0,2)}${пер(1,2)}</div><div class="ряд">${пер(1,0)}${пер(2,0)}${пер(2,1)}</div>`;
    }
    return ряды + `<div class="сброс">${BTN(4,'','↺ заново',"r385Заново("+f+")")}</div>`;
  }
  const путьТекст = (s,f) => s['п'+f].join(' → ');
  const действий = (n) => { const д=n%10, с=n%100;
    return n+' '+(д===1&&с!==11?'действие':(д>=2&&д<=4&&(с<12||с>14)?'действия':'действий')); };

  /* ================= КАДРЫ ================= */

  /* 1. Акведук перекрыт */
  function F1(s){
    const Н=280;
    return ЛИСТ(s) +
      ЗАДАЧА('Осада. Римляне перекрыли акведук — в Сиракузах кончается вода. Под Ортигией есть древний <b>шлюз к источнику Аретусы</b>: он открывается, только если на медную чашу налить воду <b>ровно</b> нужной меры. Мерных сосудов нет — только кувшины. А наверху ходит <b>римский часовой</b>: каждое переливание плещет.') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        ${часовой(0,99)}
        <g filter="url(#c385-тень)">
          <rect x="120" y="70" width="96" height="120" rx="6" fill="#0c2a44" stroke="url(#c385-бронза)" stroke-width="4"/>
          <ellipse cx="168" cy="150" rx="44" ry="36" fill="url(#c385-родник)">${анЛин('ry','32;40;32','3s')}</ellipse>
          ${[0,1,2,3].map(i=>`<path d="M124 ${100+i*22} q11 -5 22 0 t22 0 t22 0 t22 0" fill="none" stroke="#bfefff" stroke-width="1.4" opacity=".6" stroke-dasharray="12 8">${анЛин('stroke-dashoffset','0;-40',(2+i*0.4).toFixed(1)+'s')}</path>`).join('')}
          ${[0,1,2,3].map(i=>`<line x1="${136+i*21}" y1="72" x2="${136+i*21}" y2="188" stroke="url(#c385-бронза)" stroke-width="5"/>`).join('')}
          <path d="M110 200 h116 l-12 16 h-92 z" fill="url(#c385-бронза)"/>
          <ellipse cx="168" cy="200" rx="58" ry="7" fill="#6a4515"/>
          <ellipse cx="168" cy="200" rx="50" ry="5" fill="url(#c385-вода)">${анЛин('ry','4;6;4','2.4s')}</ellipse></g>
        ${[[56,236,1],[280,236,0.8]].map(([x,y,м])=>`<g transform="translate(${x} ${y}) scale(${м})" filter="url(#c385-тень)">
          <path d="M-8 -52 h16 l2 8 q16 6 16 26 q0 22 -14 30 h-24 q-14 -8 -14 -30 q0 -20 16 -26 z" fill="url(#c385-глина)" stroke="${ОБВОД}" stroke-width=".8"/>
          <path d="M12 -44 q14 2 10 18" fill="none" stroke="#7a3a1c" stroke-width="4"/></g>`).join('')}
        ${т(56,262,'5 л',14,ИНК,true)}${т(280,262,'3 л',14,ИНК,true)}
        ${подпись(168,60,'шлюз: ровно 4 л',GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Три действия','<b>Наполнить</b> кувшин до краёв, <b>вылить</b> его целиком, <b>перелить</b> из одного в другой — пока первый не опустеет или второй не наполнится. Больше ничего: делений на кувшинах нет.') +
      ПРАВИЛО('Записывай <b>состояние</b> после каждого действия: сколько литров в каждом кувшине.');
  }

  /* 2, 6, 9. Головоломка на движке */
  function FДвижок(s,f,текст,Н){
    const з=ЗАДАЧИ[f], v=состояние(s,f), готово=з.цель(v), шаги=s['п'+f].length-1;
    return ЛИСТ(s) + ЗАДАЧА(текст) +
      `<div class="pic">${свг(сценаДвижка(s,f,Н),Н)}</div>` +
      кнопкиДвижка(s,f) +
      A(8,'карт','<span class="метка">Путь · '+действий(шаги)+'</span><div class="путь">'+путьТекст(s,f)+'</div>') +
      (готово
        ? (шаги<=з.лучший
            ? РАЗБОР(true,'Ровно '+действий(з.лучший)+' — короче не бывает: часовой ничего не услышал.')
            : A(9,'карт задача','<span class="метка">Получилось, но шумно</span><div class="текст">Цель достигнута: '+действий(шаги)+'. Самый тихий путь — <b>'+з.лучший+'</b>. Нажми «заново» и попробуй начать с другого кувшина.</div>'))
        : '');
  }
  const F2 = (s) => FДвижок(s,2,'Первый шлюз: нужно ровно <b>4 л</b> в большом кувшине. Есть кувшины на <b>5 л</b> и <b>3 л</b> и сколько угодно воды из цистерны. Жми действия — и следи за часовым: чем меньше действий, тем тише.',300) +
    (ЗАДАЧИ[2].цель(состояние(S(),2)) ? ПРАВИЛО('Состояние — это пара чисел. Путь — цепочка состояний от <b>0 | 0</b> до цели.') : '');

  /* 3. Два пути */
  function F3(s){
    const Н=300, в=s.ответ3;
    const БОЛ=['0|0','5|0','2|3','2|0','0|2','5|2','4|3'], МАЛ=['0|0','0|3','3|0','3|3','5|1','0|1','1|0','1|3','4|0'];
    const колонка = (x,путь,цв,имя) => `${т(x,56,имя,13,цв,true)}` + путь.map((п,i)=>`<g>${анК('opacity','0.25;0.25;1;1','9s','0;'+кт(0.03+i*0.09)+';'+кт(0.07+i*0.09)+';1')}
        <rect x="${x-34}" y="${64+i*20}" width="68" height="17" rx="8" fill="${i===путь.length-1?'rgba(143,224,176,.25)':'rgba(255,255,255,.07)'}" stroke="${цв}" stroke-width="${i===путь.length-1?1.6:0.8}"/>
        ${т(x,77+i*20,п,12,ИНК,true)}</g>`).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед чертит на стене два пути к 4 л. Один начинает с <b>большого</b> кувшина, другой — с <b>малого</b>. Оба верные. Какой тише?') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        <rect x="18" y="38" width="300" height="${Н-68}" rx="10" fill="rgba(12,10,8,.72)"/>
        ${колонка(96,БОЛ,GREEN,'с большого')}
        ${колонка(240,МАЛ,ЛАЗУРЬ,'с малого')}
        ${т(168,30,'5 л | 3 л',14,GOLD,true)}
        ${подпись(168,Н-10, в===1?'6 действий против 8':'сосчитай стрелки в каждом пути', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['8','6','4'],1,в,'r385Отв3') +
      (в==null ? СКАЗ('Вопрос','Сколько действий в самом тихом пути?') : РАЗБОР(в===1, ['8 — это путь «с малого». Путь «с большого» короче: <b>6 действий</b>.','Путь «с большого»: 6 действий, «с малого»: 8. Оба доходят, но один на два всплеска тише.','За 4 действия до 4 л не дойти: из 5 и 3 за четыре шага в большом бывает только 0, 2, 3 или 5.'][в])) +
      (в===1 ? ПРАВИЛО('Ищешь <b>оптимум</b> — пробуй начать с каждого сосуда и сравни длину путей.') : '');
  }

  /* 4. Запись пути */
  function F4(s){
    const Н=230, в=s.ответ4;
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед: «Любой путь можно записать примером. Наливаем 5 — плюс пять, выливаем 3 — минус три». Какая запись у пути <b>с малого</b> (8 действий: трижды наливали 3 л и один раз вылили полный большой)?') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        <g filter="url(#c385-тень)"><rect x="30" y="44" width="276" height="120" rx="8" fill="#e8dcc0"/></g>
        ${т(168,84,'с большого: 5 + 5 − 3 − 3 = 4',16,'#3a2410',true)}
        ${т(148,124,'с малого:',16,'#3a2410',true)}${т(214,125,'?',18,'#a02a1a',true)}
        <g>${анЛин('opacity','1;0.4;1','1.3s')}<rect x="198" y="102" width="32" height="30" rx="5" fill="none" stroke="${RED}" stroke-width="2"/></g>
        ${подпись(168,Н-12, в===2?'3 + 3 + 3 − 5 = 4':'плюс — налили, минус — вылили', в===2?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['5 − 3 + 2 = 4','3 + 3 − 5 + 3 = 4 — но это другой порядок','3 + 3 + 3 − 5 = 4'],2,в,'r385Отв4') +
      (в==null ? СКАЗ('Вопрос','Выбери запись.') : РАЗБОР(в===2, ['Слагаемое «2» не наливали ни разу: у нас только кувшины 5 и 3. Трижды налили 3 и один раз вылили 5: <b>3 + 3 + 3 − 5 = 4</b>.','Сумма та же, но запись пути считает, сколько раз что делали: три раза по 3 и один раз минус 5 — <b>3 + 3 + 3 − 5</b>.','Три раза налили по 3, один раз вылили полный большой: 9 − 5 = 4. Чем меньше чисел в записи — тем короче путь.'][в])) +
      (в===2 ? ПРАВИЛО('Путь = пример из ёмкостей со знаками. Ищи <b>короткий пример</b> — он и даст короткий путь.') : '');
  }

  /* 5. Невозможный шлюз */
  function F5(s){
    const Н=240, в=s.ответ5;
    return ЛИСТ(s) +
      ЗАДАЧА('На боковом шлюзе надпись: «<b>3 л</b>». Рядом — кувшины на <b>6 л</b> и <b>4 л</b>. Юный жрец уже час переливает туда-сюда. Архимед смотрит на кувшины и говорит: «Брось. Этого не сделать никогда». Почему?') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        ${[0,2,4,6].map((n,i)=>`<g>${анК('opacity','0.3;0.3;1;1','6s','0;'+кт(0.05+i*0.15)+';'+кт(0.1+i*0.15)+';1')}
          <circle cx="${66+i*68}" cy="100" r="24" fill="rgba(143,208,240,.18)" stroke="${ЛАЗУРЬ}" stroke-width="2"/>${т(66+i*68,107,n+' л',16,ИНК,true)}</g>`).join('')}
        <g>${анЛин('opacity','1;0.45;1','1.3s')}<circle cx="168" cy="164" r="22" fill="none" stroke="${RED}" stroke-width="2.4"/>
          <line x1="152" y1="180" x2="184" y2="148" stroke="${RED}" stroke-width="2.4"/></g>
        ${т(168,170,'3',18,RED,true)}
        ${т(168,58,'можно получить:',13,МУТ)}
        ${подпись(168,Н-12, в===0?'6 и 4 — чётные, всё будет чётным':'из 6 и 4 выходят только эти', в===0?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['6 и 4 чётные — после любого действия в кувшинах чётное число литров','Нужно больше действий','Надо начать с малого кувшина'],0,в,'r385Отв5') +
      (в==null ? СКАЗ('Вопрос','Почему 3 л не получить?') : РАЗБОР(в===0, ['Наливаем 6 или 4, выливаем, переливаем разность — всё <b>чётное</b>. Нечётное 3 не появится никогда. Общий делитель 6 и 4 — это 2: мерить можно только кратное 2.','Сколько ни переливай — все объёмы чётные: 6 и 4 делятся на 2, их суммы и разности тоже. 3 недостижимо.','Начало не спасёт: хоть с малого, хоть с большого — в кувшинах только 0, 2, 4, 6.'][в])) +
      (в===0 ? ПРАВИЛО('Отмерить можно только объём, <b>кратный НОД</b> ёмкостей (и не больше большого сосуда).') : '');
  }

  /* 6. Вино пополам */
  const F6 = (s) => FДвижок(s,6,'Смотрители цистерны — два брата — просят плату: <b>8 л вина</b> в амфоре, поровну, по <b>4 л</b> каждому. Кроме амфоры — кувшины <b>5 л</b> и <b>3 л</b>. Вино выливать нельзя, воды не добавить — только переливать.',300) +
    (ЗАДАЧИ[6].цель(состояние(S(),6)) ? ПРАВИЛО('Когда выливать нельзя, <b>большой сосуд работает как запас</b>: в него сливают лишнее.') : '');

  /* 7. Таблица состояний */
  function F7(s){
    const Н=260, в=s.ответ7;
    const РЯДЫ=[['','0','0'],['налить 5','5','0'],['5 → 3','2','3'],['вылить 3','2','0'],['5 → 3','?','?']];
    return ЛИСТ(s) +
      ЗАДАЧА('Старший брат проверяет, не путаешь ли ты шаги. Он записал путь к 4 л в таблицу — и спрятал пятую строку. Что будет в кувшинах после действия «<b>5 → 3</b>»?') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        <g filter="url(#c385-тень)"><rect x="34" y="30" width="268" height="${РЯДЫ.length*32+34}" rx="8" fill="#e8dcc0"/></g>
        ${т(110,54,'действие',13,'#6a4a2a',true)}${т(214,54,'5 л',13,'#6a4a2a',true)}${т(268,54,'3 л',13,'#6a4a2a',true)}
        ${РЯДЫ.map((р,i)=>`<g>${анК('opacity','0.3;0.3;1;1','7s','0;'+кт(0.04+i*0.12)+';'+кт(0.09+i*0.12)+';1')}
          <line x1="40" y1="${62+i*32}" x2="296" y2="${62+i*32}" stroke="#b8a888"/>
          ${т(110,84+i*32,р[0],14,'#3a2410')}${т(214,84+i*32,в===1&&i===4?'0':р[1],17,i===4?(в===1?'#1a7a4a':'#a02a1a'):'#3a2410',true)}${т(268,84+i*32,в===1&&i===4?'2':р[2],17,i===4?(в===1?'#1a7a4a':'#a02a1a'):'#3a2410',true)}</g>`).join('')}
        ${подпись(168,Н-10, в===1?'2 литра целиком ушли в пустой малый':'до пустого или до полного', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2 | 2','0 | 2','0 | 3'],1,в,'r385Отв7') +
      (в==null ? СКАЗ('Вопрос','Новое состояние?') : РАЗБОР(в===1, ['Вода не копируется: сколько ушло из большого, столько пришло в малый. Было 2 | 0 — стало <b>0 | 2</b>.','В большом 2 л, малый пуст и вмещает 3 — все 2 л переходят целиком: <b>0 | 2</b>.','В малый уместилось бы 3 л, но в большом было только 2. Большой опустел раньше: <b>0 | 2</b>.'][в])) +
      (в===1 ? ПРАВИЛО('При переливании <b>сумма не меняется</b>: переливаем, пока первый не опустеет или второй не наполнится.') : '');
  }

  /* 8. Наклон кувшина */
  function F8(s){
    const Н=250, в=s.ответ8;
    return ЛИСТ(s) +
      ЗАДАЧА('Лекарю нужна <b>половина</b> 3-литрового цилиндрического кувшина. Второго сосуда нет! Архимед наклоняет полный кувшин и сливает воду, пока её поверхность не дойдёт <b>от края горлышка ровно до края дна</b>. Сколько осталось?') +
      `<div class="pic">${свг(`
        ${подземелье(Н)}
        <g transform="rotate(60 168 140)" filter="url(#c385-тень)">
          <clipPath id="c385-наклон"><rect x="128" y="70" width="80" height="140" rx="6"/></clipPath>
          <rect x="128" y="70" width="80" height="140" rx="6" fill="url(#c385-стекло)" stroke="#e8d6b0" stroke-width="2"/>
          <path d="M128 210 L208 70 L208 210 Z" fill="url(#c385-вода)" clip-path="url(#c385-наклон)" opacity=".92"/>
          <line x1="128" y1="210" x2="208" y2="70" stroke="#e8f8ff" stroke-width="2" stroke-dasharray="6 4">${анЛин('stroke-dashoffset','0;-20','1.2s')}</line>
          <rect x="124" y="64" width="88" height="7" rx="3" fill="url(#c385-бронза)"/></g>
        <path d="M252 142 q10 16 8 62" fill="none" stroke="#6fc6f0" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 8">${анЛин('stroke-dashoffset','0;-32','0.8s')}</path>
        <ellipse cx="262" cy="212" rx="22" ry="5" fill="#3fa6d8" opacity=".6">${анЛин('rx','18;24;18','1.6s')}</ellipse>
        <line x1="70" y1="140" x2="112" y2="140" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="4 4"/>${т(62,136,'уровень',11,GOLD,true,'end')}
        ${подпись(168,Н-12, в===1?'диагональ режет цилиндр пополам: 1,5 л':'поверхность — от края до края', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1 л','1,5 л','2 л'],1,в,'r385Отв8') +
      (в==null ? СКАЗ('Вопрос','Сколько воды осталось?') : РАЗБОР(в===1, ['Плоскость от края горлышка до края дна делит цилиндр на две <b>одинаковые</b> половинки: осталось 1,5 л.','Поверхность проходит через центр кувшина — вода и воздух одинаковой формы, поровну: <b>1,5 л</b>.','Две одинаковые половинки: 3 : 2 = 1,5 л, а не 2.'][в])) +
      (в===1 ? ПРАВИЛО('Иногда помогает не перебор, а <b>симметрия</b>: наклонённый цилиндр делит воду пополам.') : '');
  }

  /* 9. Лекарю 1 л */
  const F9 = (s) => FДвижок(s,9,'Последний шлюз — к больнице. Лекарю нужен ровно <b>1 л</b> чистой воды в большом кувшине. Кувшины — <b>7 л</b> и <b>3 л</b>. Подсказка Архимеда: «7 − 3 − 3». Попробуй за <b>4</b> действия.',300) +
    (ЗАДАЧИ[9].цель(состояние(S(),9)) ? ПРАВИЛО('7 = 3 · 2 + 1: «откусывай» малым от большого, пока не останется <b>остаток</b>.') : '');

  /* 10. Вода в городе */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=260;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Три шлюза открыты — ни один всплеск не выдал ход. Вода Аретусы бежит по подземным трубам к фонтанам Ортигии. Римляне стоят у перекрытого акведука и не понимают, почему город не сдаётся.'
        : 'Не все шлюзы открыты — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c385-ночь)"/>
        <rect x="0" y="150" width="336" height="${Н-150}" fill="url(#c385-камень)"/>
        ${[40,110,226,296].map(x=>`<rect x="${x-8}" y="80" width="16" height="70" fill="#d8ccb0"/><rect x="${x-12}" y="74" width="24" height="8" fill="#e8dcc0"/>`).join('')}
        <g filter="url(#c385-тень)"><ellipse cx="168" cy="200" rx="70" ry="16" fill="#8a7a60"/><ellipse cx="168" cy="196" rx="60" ry="11" fill="url(#c385-вода)"/>
          <rect x="162" y="140" width="12" height="56" fill="#b8a888"/><ellipse cx="168" cy="140" rx="18" ry="5" fill="#d8ccb0"/></g>
        ${[-1,1].map(с=>`<path d="M168 136 q${с*24} -30 ${с*48} 56" fill="none" stroke="#9fe6ff" stroke-width="3" stroke-dasharray="7 6">${анЛин('stroke-dashoffset','0;-26','0.9s')}</path>`).join('')}
        <g>${проявить('8s',0.1,0.2)}${подпись(168,30,'состояние после каждого шага',GOLD,12)}</g>
        <g>${проявить('8s',0.3,0.4)}${подпись(168,58,'пробуй начать с каждого сосуда',GOLD,12)}</g>
        <g>${проявить('8s',0.5,0.6)}${подпись(168,Н-12,'мерить можно только кратное НОД',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Переливание — цепочка <b>состояний</b>. Действия: наполнить, вылить, перелить до конца. Самый короткий путь ищут, начиная с каждого сосуда. Путь можно записать примером: 5 + 5 − 3 − 3 = 4. Мерить можно только кратное НОД ёмкостей.') +
      ПРАВИЛО('<b>Меньше чисел в примере — меньше всплесков.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Кувшины 5 л и 3 л. В большом 5, малый пуст. Перелили 5 → 3. Что стало?', варианты:[{т:'2 | 3',ок:true},{т:'0 | 5',ок:false}], разбор:'В малый входит только 3 л, в большом остаётся 2.' },
    { вопрос:'Кувшины 9 л и 6 л. Можно ли отмерить 4 л?', варианты:[{т:'можно',ок:false},{т:'нельзя',ок:true}], разбор:'НОД(9, 6) = 3, а 4 на 3 не делится.' },
    { вопрос:'Кувшины 7 л и 4 л. Сколько останется в большом после «налить 7, 7 → 4»?', варианты:[{т:'3 л',ок:true},{т:'4 л',ок:false}], разбор:'7 − 4 = 3.' },
    { вопрос:'Кувшины 5 л и 2 л. Какая запись даёт 1 л?', варианты:[{т:'5 − 2 − 2',ок:true},{т:'2 + 2 − 5',ок:false}], разбор:'Налили 5, дважды отлили по 2: 1 л. «2 + 2 − 5» меньше нуля.' },
    { вопрос:'Полный 3-литровый цилиндр наклонили до края дна. Сколько осталось?', варианты:[{т:'1,5 л',ок:true},{т:'1 л',ок:false}], разбор:'Поверхность режет цилиндр пополам.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r385Reset()")}</div>` +
        ПРАВИЛО('<b>Считай состояния, а не надейся на глаз.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r385Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Один шаг', задания:[
    {q:'Кувшины 5 и 3. Было 5 | 2. Действие 5 → 3. Стало?', в:1, варианты:['3 | 3','4 | 3'], раз:'В малый поместился только 1 л.'},
    {q:'Кувшины 8 и 5. Было 8 | 0. Действие 8 → 5. Стало?', в:0, варианты:['3 | 5','0 | 8'], раз:'В малый входит 5.'},
    {q:'Кувшины 7 и 3. Было 1 | 3. Действие «вылить 3». Стало?', в:1, варианты:['1 | 2','1 | 0'], раз:'Вылили целиком.'},
    {q:'Кувшины 4 и 3. Было 0 | 3. Действие 3 → 4. Стало?', в:0, варианты:['3 | 0','4 | 0'], раз:'Все 3 л поместились.'}
  ]};
  const Т2 = { имя:'Можно или нельзя', задания:[
    {q:'Кувшины 10 и 4. Отмерить 5 л?', в:1, варианты:['можно','нельзя'], раз:'НОД = 2, 5 нечётное.'},
    {q:'Кувшины 9 и 4. Отмерить 1 л?', в:0, варианты:['можно','нельзя'], раз:'9 − 4 − 4 = 1.'},
    {q:'Кувшины 12 и 8. Отмерить 6 л?', в:1, варианты:['можно','нельзя'], раз:'НОД = 4, 6 на 4 не делится.'},
    {q:'Кувшины 5 и 3. Отмерить 1 л?', в:0, варианты:['можно','нельзя'], раз:'Например, 3 + 3 − 5 = 1.'}
  ]};
  const Т3 = { имя:'Короткий путь', задания:[
    {q:'Кувшины 7 и 3. Сколько действий, чтобы в большом осталось 4 л?', в:0, варианты:['2','4'], раз:'Налить 7, 7 → 3: остаётся 4.'},
    {q:'Кувшины 5 и 3. Пример для 2 л в большом?', в:1, варианты:['3 + 3 − 5','5 − 3'], раз:'Налить 5, 5 → 3: два действия.'},
    {q:'Кувшины 9 и 4. Пример для 1 л?', в:0, варианты:['9 − 4 − 4','4 + 4 − 9'], раз:'Второй меньше нуля.'},
    {q:'Кувшины 5 и 3. Сколько действий нужно для 1 л в малом?', в:1, варианты:['2','4'], раз:'Налить 3, 3 → 5, налить 3, 3 → 5: в малом 1 л.'}
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
        в, "r385T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r385TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L385 = {
    id: ID,
    title: 'Переливания: оптимум',
    ico: '🫗',
    src: 'Математика · 5–6 класс · Олимп-5: переливания',
    subj: 'math',
    explain: [
      'Осада: римляне перекрыли акведук. Древний шлюз к источнику Аретусы открывается, только если налить ровно отмеренную воду. Действия: наполнить, вылить, перелить до конца. После каждого записываем состояние.',
      'Первый шлюз: 4 л кувшинами 5 и 3. Самый тихий путь — 6 действий.',
      'Два пути к 4 л: с большого — 6 действий, с малого — 8. Для оптимума пробуем начать с каждого сосуда.',
      'Путь записывается примером: 5 + 5 − 3 − 3 = 4 и 3 + 3 + 3 − 5 = 4. Короче пример — короче путь.',
      'Кувшинами 6 и 4 нельзя отмерить 3 л: все объёмы чётные. Мерить можно только кратное НОД ёмкостей.',
      'Вино 8 л пополам кувшинами 5 и 3, без выливания — 7 переливаний.',
      'Таблица состояний: при переливании сумма не меняется, переливаем до пустоты одного или полноты другого.',
      'Наклонённый цилиндр, когда поверхность идёт от края горлышка до края дна, делит воду пополам.',
      '1 л кувшинами 7 и 3 — четыре действия: 7 − 3 − 3 = 1.',
      'Итог: состояния, перебор путей с разных сосудов, запись примером и НОД.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: один шаг.',
      'Тренажёр 2: можно или нельзя.',
      'Тренажёр 3: короткий путь.'
    ],
    check: {
      q: 'Ведро 7 л и банка 3 л: наполнили 7 л и отлили в банку 3 л. Сколько осталось в ведре?',
      choices: ['1 л','4 л','3 л','2 л'],
      ans: 1,
      exp: '7 − 3 = 4 л.'
    },
    tasks: [
      { q:'После этого банку вылили и снова отлили из ведра 3 л. Сколько осталось в ведре?', kind:'unit', ans:1, tol:0,
        hints:['Было 4 л.','4 − 3.'], sol:'1 л' },
      { q:'Кувшины 6 л и 4 л. Можно ли отмерить 3 л?', kind:'choice', choices:['нет','да'], ans:0,
        hints:['Посмотри на чётность.','Все объёмы чётные.'], sol:'Нет: НОД(6, 4) = 2.' },
      { q:'За сколько действий можно получить 4 л кувшинами 5 и 3?', kind:'unit', ans:6, tol:0,
        hints:['Начни с большого.','5 + 5 − 3 − 3.'], sol:'6.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L385.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Акведук перекрыт',2:'Первый шлюз',3:'Два пути',4:'Путь примером',5:'Невозможный шлюз',
      6:'Вино пополам',7:'Таблица состояний',8:'Наклон кувшина',9:'Литр для лекаря',10:'Вода в городе',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l385" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Переливания'}</h2>${сцена}</div>`;
    /* анимация шага проиграна — дальше рисуем без неё */
    [2,6,9].forEach(k=>{ s['pv'+k]=null; s['д'+k]=null; });
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r385Шаг=(f,код)=>{ const s=S(), з=ЗАДАЧИ[f]; const v=состояние(s,f).slice(), к=з.ёмк;
    if(з.цель(v)) return;
    const пред=v.slice();
    if(код[0]==='н'){ if(з.безВоды) return; v[+код[1]]=к[+код[1]]; }
    else if(код[0]==='в'){ if(з.безВоды) return; v[+код[1]]=0; }
    else { const i=+код[1], j=+код[2], м=Math.min(v[i],к[j]-v[j]); v[i]-=м; v[j]+=м; }
    if(v.join('|')===пред.join('|')) return;
    s['v'+f]=v; s['pv'+f]=пред; s['д'+f]=код; s['п'+f].push(v.join('|'));
    if(з.цель(v)) s['дело_'+з.дело]=true;
    chRender(0); };
  window.r385Заново=(f)=>{ const s=S(); s['v'+f]=ЗАДАЧИ[f].старт.slice(); s['п'+f]=[ЗАДАЧИ[f].старт.join('|')]; s['pv'+f]=null; s['д'+f]=null; chRender(0); };
  window.r385Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r385Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r385Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r385Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r385Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r385Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r385Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r385T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r385TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L385; else arr.push(L385); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA385={render:render, L:L385};
})();
