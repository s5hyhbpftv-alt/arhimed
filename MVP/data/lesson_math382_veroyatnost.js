/* ====== МАТЕМАТИКА · УРОК 382 · «ВЕРОЯТНОСТЬ И ДИАГРАММЫ: НАЧАЛО» ==================
   5–6 класс. Переделан с нуля по эталону 1022 (deploy/ЭТАЛОН_УРОКА.md), рисунки —
   сцена из сюжета. Прежние версии (vis_wk.js visW382 — 21 кадр текста,
   vis_bw.js) остаются в общих файлах; этот файл регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Вероятность = благоприятные исходы : все РАВНОВОЗМОЖНЫЕ
   исходы, от 0 (невозможно) до 1 (достоверно). Частота в опыте колеблется, но
   при многих опытах приближается к вероятности — так проверяют кость.
   Диаграмма показывает числа, но может и обмануть: смотри, откуда начинается ось.

   СЮЖЕТ. «Кости оракула». В храме на Ортигии поселился оракул Демарат: за
   золотую монету он бросает кость и «читает волю богов». Шестёрка — удача, и
   у богатых покупателей она почему-то выпадает часто. Архимед подозревает
   подпиленную кость. Ученик проверяет урну жребиев, испытывает кость сотней
   бросков и разоблачает хвастливую диаграмму оракула.

   РУКАМИ: испытание кости кнопками «+10», «+30» бросков — столбчатая
   диаграмма растёт, пунктир показывает, сколько было бы у честной кости;
   переключатель «ось с нуля» у обманной диаграммы.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     урна 2 красных и 3 синих: P(красный) = 2/5 (не 2/3 — это красные к синим);
     кубик: чётных 3 из 6 = 1/2; шестёрка 1/6 — ближе к 0;
     две монеты: ОО, ОР, РО, РР — 4 исхода, «разные» 2/4 = 1/2 (не 1/3);
     кость оракула — генератор mulberry32, зерно 2, P(6) = 0,3, остальные по
       0,14: после 10 бросков 2,2,1,2,1,2 (ничего не видно), после 30 —
       4,3,4,4,5,10, после 60 — 5,8,7,10,11,19, после 120 — 16,16,15,18,20,35
       (честной было бы по 20);
     честная монета — зерно 56: орлов после 10 бросков 6, после 20 — 14,
       после 50 — 28, после 100 — 50: частота 0,6 → 0,7 → 0,56 → 0,5;
     пожертвования 100 и 110 драхм: на обманной оси (от 90) столбики 10 и 20 —
       «вдвое», на честной — рост на 10%;
     урна 40 жребиев, красные — половина круга: 20 штук, P = 1/2 > 2/5.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 382;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', ФИАЛ='#b89cf0';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'жребий',    имя:'Проверить урну жребиев',  итог:'2/5'},
    {ключ:'кость',     имя:'Испытать кость оракула',  итог:'подпилена'},
    {ключ:'диаграмма', имя:'Разоблачить диаграмму',   итог:'+10%'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* ---- опыты: одни и те же при каждом открытии ---- */
  const генератор = (a) => () => { a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a);
    t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
  const БРОСКИ = (()=>{ const r=генератор(2), a=[];
    for(let i=0;i<120;i++){ const u=r(); a.push(u<0.3 ? 6 : 1+Math.floor((u-0.3)/0.14)); } return a; })();
  const МОНЕТА = (()=>{ const r=генератор(56), a=[]; for(let i=0;i<100;i++) a.push(r()<0.5?1:0); return a; })();
  const счёт = (n) => { const c=[0,0,0,0,0,0]; БРОСКИ.slice(0,n).forEach(v=>c[v-1]++); return c; };

  const CSS=`
  #lvis .s6.l382{gap:14px}
  #lvis .s6.l382 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l382 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l382 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l382 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l382 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l382 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l382 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l382 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l382 .карт .текст b{color:${GOLD}}
  #lvis .s6.l382 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l382 .правило b{color:${GOLD}}
  #lvis .s6.l382 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(184,156,240,.16),rgba(184,156,240,.04));
    border:1.5px solid rgba(184,156,240,.55);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l382 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l382 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ФИАЛ}}
  #lvis .s6.l382 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l382 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l382 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l382 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l382 .лист li.есть{color:${ИНК}}
  #lvis .s6.l382 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l382 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l382 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l382 .ряд{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l382 .ряд.два{grid-template-columns:repeat(2,1fr)}
  #lvis .s6.l382 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-weight:700;
    border:1.5px solid rgba(184,156,240,.55);background:rgba(184,156,240,.13);color:${ИНК};padding:6px 4px;
    font-variant-numeric:tabular-nums;white-space:nowrap;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l382 .ряд button:active{transform:translateY(2px);background:rgba(184,156,240,.28)}
  #lvis .s6.l382 .ряд button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l382 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.18)}
  #lvis .s6.l382 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l382 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l382 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l382 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l382 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l382 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l382 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:17px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l382 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l382 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l382 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l382 .уровни .точка.сейчас{background:${GOLD};animation:l382dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l382dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l382 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l382{-webkit-text-size-adjust:100%}
  #lvis .s6.l382 [data-anim]{animation:l382rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l382rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l382 [data-anim]{animation:none!important}
    #lvis .s6.l382 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l382 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l382-style');
      if(!s){ s=document.createElement('style'); s.id='l382-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Кости оракула</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Дело оракула</span><b class="${всё?'готово':''}">${
        всё?'оракул разоблачён':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}
           <span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };
  const дробь = (x) => String(Math.round(x*100)/100).replace('.',',');

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const КРИВАЯ = '0.23 1 0.32 1';
  const сплайны = (n) => Array.from({length:n},()=>КРИВАЯ).join(';');
  const анК = (имя,значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
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
  const вырасти = (длит,доля) => анК('opacity','0.2;0.2;1;1',длит,'0;'+кт(доля)+';'+кт(доля+0.06)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c382-храм" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0e0c1c"/><stop offset="0.6" stop-color="#1e1830"/><stop offset="1" stop-color="#2e2236"/>
      </linearGradient>
      <linearGradient id="c382-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a1030"/><stop offset="1" stop-color="#2a2a5a"/>
      </linearGradient>
      <linearGradient id="c382-мрамор" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6a6070"/><stop offset="0.45" stop-color="#b8aec0"/><stop offset="1" stop-color="#4a4250"/>
      </linearGradient>
      <linearGradient id="c382-пол" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2e30"/><stop offset="1" stop-color="#1a1418"/>
      </linearGradient>
      <radialGradient id="c382-огонь" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff0b0" stop-opacity=".95"/><stop offset="0.35" stop-color="#ff9a40" stop-opacity=".5"/><stop offset="1" stop-color="#ff5020" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c382-пламя" cx="0.5" cy="0.75" r="0.6">
        <stop offset="0" stop-color="#fffae0"/><stop offset="0.45" stop-color="#ffb040"/><stop offset="1" stop-color="#d04010"/>
      </radialGradient>
      <radialGradient id="c382-дым" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#c8b8e0" stop-opacity=".35"/><stop offset="1" stop-color="#c8b8e0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c382-кость-верх" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#ece0c8"/>
      </linearGradient>
      <linearGradient id="c382-кость-лев" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#d8c8a8"/><stop offset="1" stop-color="#e8dcc0"/>
      </linearGradient>
      <linearGradient id="c382-кость-пр" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b8a482"/><stop offset="1" stop-color="#9a8664"/>
      </linearGradient>
      <radialGradient id="c382-серебро" cx="0.38" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#c8ced8"/><stop offset="1" stop-color="#6a7280"/>
      </radialGradient>
      <radialGradient id="c382-золото" cx="0.38" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff4c0"/><stop offset="0.5" stop-color="#e0b040"/><stop offset="1" stop-color="#7a5410"/>
      </radialGradient>
      <linearGradient id="c382-урна" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#1a0e08"/><stop offset="0.3" stop-color="#5a3018"/><stop offset="0.55" stop-color="#8a4a22"/><stop offset="1" stop-color="#2a140a"/>
      </linearGradient>
      <linearGradient id="c382-шкала" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#5a6a90"/><stop offset="0.5" stop-color="#b89cf0"/><stop offset="1" stop-color="#ffd76a"/>
      </linearGradient>
      <linearGradient id="c382-столб" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7a64c0"/><stop offset="0.5" stop-color="#b89cf0"/><stop offset="1" stop-color="#6a54b0"/>
      </linearGradient>
      <linearGradient id="c382-столб6" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#c04a3a"/><stop offset="0.5" stop-color="#ff8a78"/><stop offset="1" stop-color="#a03a2a"/>
      </linearGradient>
      <filter id="c382-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".55"/>
      </filter>
      <filter id="c382-свечение" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c382-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* храм ночью: колонны, жаровни, дым */
  const храм = (Н) => `
    <rect x="0" y="0" width="336" height="${Н}" fill="url(#c382-храм)"/>
    ${[18,82,254,318].map(x=>`<rect x="${x-9}" y="20" width="18" height="${Н-60}" fill="url(#c382-мрамор)" opacity=".55" data-декор="1"/>
      <rect x="${x-12}" y="16" width="24" height="7" fill="#8a8090" opacity=".55" data-декор="1"/>`).join('')}
    <rect x="0" y="${Н-44}" width="336" height="44" fill="url(#c382-пол)"/>
    ${Array.from({length:8},(_,i)=>`<line x1="${i*48}" y1="${Н-44}" x2="${i*48-30}" y2="${Н}" stroke="#4a3a40" stroke-width=".8"/>`).join('')}
    ${[50,286].map((x,i)=>`<g>
      <circle cx="${x}" cy="${Н-92}" r="44" fill="url(#c382-огонь)" data-декор="1">${анЛин('r','40;48;42;46;40',(1.6+i*0.4).toFixed(1)+'s')}</circle>
      <path d="M${x-14} ${Н-78} h28 l-5 12 h-18 z" fill="#6a4a2a"/><line x1="${x}" y1="${Н-66}" x2="${x}" y2="${Н-44}" stroke="#4a3018" stroke-width="3"/>
      <path d="M${x} ${Н-106} q-10 14 -6 26 q6 6 12 0 q4 -12 -6 -26 z" fill="url(#c382-пламя)">${анЛин('d',
        `M${x} ${Н-106} q-10 14 -6 26 q6 6 12 0 q4 -12 -6 -26 z;M${x} ${Н-110} q-8 16 -6 30 q6 6 12 0 q2 -14 -6 -30 z;M${x} ${Н-106} q-10 14 -6 26 q6 6 12 0 q4 -12 -6 -26 z`,(0.9+i*0.3).toFixed(1)+'s')}</path></g>`).join('')}
    <ellipse cx="168" cy="60" rx="90" ry="40" fill="url(#c382-дым)" data-декор="1">${анЛин('cy','66;52;66','9s')}</ellipse>`;
  const доска = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="rgba(10,8,18,.82)" stroke="rgba(184,156,240,.25)"/>`;

  /* изометрическая кость: B — нижняя передняя вершина, s — ребро */
  const ТОЧКИ_ГРАНИ = {1:[[.5,.5]],2:[[.27,.27],[.73,.73]],3:[[.25,.25],[.5,.5],[.75,.75]],
    4:[[.27,.27],[.73,.27],[.27,.73],[.73,.73]],5:[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]],
    6:[[.27,.22],[.27,.5],[.27,.78],[.73,.22],[.73,.5],[.73,.78]]};
  const грань = (O,U,V,значение,заливка,цвет) => {
    const м = `matrix(${U[0].toFixed(2)} ${U[1].toFixed(2)} ${V[0].toFixed(2)} ${V[1].toFixed(2)} ${O[0].toFixed(2)} ${O[1].toFixed(2)})`;
    return `<g transform="${м}"><rect x="0" y="0" width="1" height="1" rx=".12" fill="${заливка}" stroke="#6a5a40" stroke-width="1" vector-effect="non-scaling-stroke"/>
      ${(ТОЧКИ_ГРАНИ[значение]||[]).map(([u,v])=>`<circle cx="${u}" cy="${v}" r=".09" fill="${цвет||'#1a1210'}"/>`).join('')}</g>`;
  };
  /* боковые грани, совместимые с верхней (противоположные в сумме дают 7) */
  const бока = (n) => { const л=[1,2,3,4,5,6].find(v=>v!==n&&v!==7-n); const п=[1,2,3,4,5,6].find(v=>v!==n&&v!==7-n&&v!==л&&v!==7-л); return [л,п]; };
  const кость = (x,y,s,верх,лево,право,цвет) => {
    const ex=[0.866*s,-0.5*s], ey=[-0.866*s,-0.5*s], ez=[0,-s], B=[x,y];
    const add=(a,b)=>[a[0]+b[0],a[1]+b[1]];
    const T=add(B,ez);
    return `<g filter="url(#c382-тень)">
      ${грань(T,ey,[-ez[0],-ez[1]],лево,'url(#c382-кость-лев)',цвет)}
      ${грань(T,ex,[-ez[0],-ez[1]],право,'url(#c382-кость-пр)',цвет)}
      ${грань(T,ex,ey,верх,'url(#c382-кость-верх)',цвет)}</g>`;
  };
  /* сиракузская монета: голова Аретусы с дельфинами / колесо колесницы */
  const монета = (x,y,r,сторона,мат,безПодписи) => `<g filter="url(#c382-тень)">
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c382-${мат||'серебро'})" stroke="#5a6070" stroke-width="1"/>
    <circle cx="${x}" cy="${y}" r="${r*0.84}" fill="none" stroke="#7a8090" stroke-width=".8" stroke-dasharray="1.5 2"/>
    ${сторона==='О'
      ? `<path d="M${x+r*0.1} ${y-r*0.5} q${-r*0.45} ${r*0.05} ${-r*0.35} ${r*0.45} q${-r*0.08} ${r*0.12} ${r*0.02} ${r*0.18} q${r*0.05} ${r*0.25} ${r*0.3} ${r*0.25} q${r*0.25} ${-r*0.35} ${r*0.1} ${-r*0.88} z" fill="#8a909c"/>
         ${[0,1,2,3].map(i=>{ const a=i*Math.PI/2+Math.PI/4, dx=x+Math.cos(a)*r*0.66, dy=y+Math.sin(a)*r*0.66;
           return `<path d="M${(dx-r*0.1).toFixed(1)} ${dy.toFixed(1)} q${(r*0.1).toFixed(1)} ${(-r*0.12).toFixed(1)} ${(r*0.2).toFixed(1)} 0" fill="none" stroke="#6a707c" stroke-width="1.2"/>`; }).join('')}`
      : `<circle cx="${x}" cy="${y}" r="${r*0.42}" fill="none" stroke="#6a707c" stroke-width="1.6"/>
         ${[0,1,2,3].map(i=>`<line x1="${x}" y1="${y}" x2="${(x+Math.cos(i*Math.PI/4)*r*0.42).toFixed(1)}" y2="${(y+Math.sin(i*Math.PI/4)*r*0.42).toFixed(1)}" stroke="#6a707c" stroke-width="1.2"/>
           <line x1="${x}" y1="${y}" x2="${(x-Math.cos(i*Math.PI/4)*r*0.42).toFixed(1)}" y2="${(y-Math.sin(i*Math.PI/4)*r*0.42).toFixed(1)}" stroke="#6a707c" stroke-width="1.2"/>`).join('')}`}
    ${безПодписи?'':т(x,y+r+14,сторона==='О'?'орёл':'решка',11,МУТ,true)}</g>`;
  /* оракул в капюшоне над треножником */
  const оракул = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c382-тень)">
    <path d="M-26 70 q0 -52 26 -62 q26 10 26 62 z" fill="#3a1a4a"/>
    <path d="M-16 20 q16 -34 32 0 q-4 -8 -16 -8 q-12 0 -16 8 z" fill="#4a2a5a"/>
    <ellipse cx="0" cy="18" rx="10" ry="11" fill="#1a0e14"/>
    <circle cx="-4" cy="17" r="1.8" fill="${GOLD}">${анЛин('opacity','1;0.2;1','3s')}</circle><circle cx="4" cy="17" r="1.8" fill="${GOLD}">${анЛин('opacity','1;0.2;1','3s')}</circle>
    <path d="M-22 44 q-14 6 -12 20" stroke="#4a2a5a" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M22 44 q16 -2 20 -14" stroke="#4a2a5a" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  const треножник = (x,y) => `<g filter="url(#c382-тень)">
    <path d="M${x-26} ${y} q26 16 52 0 z" fill="url(#c382-золото)"/>
    ${[-18,0,18].map(d=>`<line x1="${x+d*0.7}" y1="${y+6}" x2="${x+d*1.4}" y2="${y+40}" stroke="#8a6a2a" stroke-width="3"/>`).join('')}
    <ellipse cx="${x}" cy="${y}" rx="26" ry="5" fill="#ffb040" opacity=".8">${анЛин('opacity','0.8;0.5;0.8','1.4s')}</ellipse></g>`;
  /* урна с жребиями */
  const урна = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c382-тень)">
    <path d="M-14 -62 h28 l-2 10 q30 10 30 44 q0 34 -26 48 h-32 q-26 -14 -26 -48 q0 -34 30 -44 z" fill="url(#c382-урна)" stroke="${ОБВОД}" stroke-width="1"/>
    <path d="M-30 -20 q30 10 60 0" stroke="#e0a060" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M-28 6 q28 9 56 0" stroke="#e0a060" stroke-width="2" fill="none" opacity=".7"/>
    <ellipse cx="0" cy="-62" rx="16" ry="4" fill="#2a140a"/></g>`;
  const жребий = (x,y,цвет,поворот) => `<g transform="translate(${x} ${y}) rotate(${поворот||0})" filter="url(#c382-тень)">
    <rect x="-7" y="-11" width="14" height="22" rx="3" fill="${цвет}" stroke="${ОБВОД}" stroke-width=".6"/>
    <line x1="-3" y1="-5" x2="3" y2="-5" stroke="rgba(0,0,0,.35)" stroke-width="1"/><line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(0,0,0,.35)" stroke-width="1"/></g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Оракул */
  function F1(s){
    const Н=300, в=s.ответ1;
    return ЛИСТ(s) +
      ЗАДАЧА('В храме на Ортигии поселился оракул <b>Демарат</b>. За золотую монету он бросает кость на треножник и «читает волю богов»: шестёрка — удача. Странно, но у тех, кто платит больше, шестёрка выпадает чаще. Архимед хмурится: «Боги тут ни при чём. Проверим <b>вероятностью</b>».') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${оракул(168,110,1.1)}
        ${треножник(168,206)}
        <g>${анСдвиг('0 0;0 -26;0 0;0 0','2.6s','0;0.3;0.6;1')}${кость(142,196,20,6,3,5)}</g>
        <g>${анСдвиг('0 0;0 -18;0 0;0 0','2.6s','0;0.35;0.7;1')}${кость(196,200,16,6,2,4)}</g>
        ${монета(96,Н-60,13,'О','золото')}${монета(244,Н-58,11,'Р','золото')}
        ${подпись(168,30, в===1?'выпадет 7 — невозможно':'три вида событий', в===1?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Три вида событий','<b>Достоверное</b> случится обязательно (на кости выпадет число от 1 до 6). <b>Невозможное</b> не случится никогда. <b>Случайное</b> может случиться, а может и нет — например, «выпадет шестёрка».') +
      ОТВЕТЫ('три',['случайное','невозможное','достоверное'],1,в,'r382Отв1') +
      (в==null ? СКАЗ('Вопрос','Демарат обещает богачу: «Для тебя боги выбросят <b>семёрку</b>!» Какое это событие?') :
        РАЗБОР(в===1, ['Случайное может и выпасть, и нет. А семёрки на кости нет вовсе — событие <b>невозможное</b>.','На кости только 1–6: семёрка <b>невозможна</b>. Оракул обещает то, чего не будет никогда.','Достоверное случается всегда. Семёрка не выпадет никогда — она <b>невозможна</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Вероятность невозможного — <b>0</b>, достоверного — <b>1</b>, случайного — между ними.') : '');
  }

  /* 2. Шкала 0–1 */
  function F2(s){
    const Н=250, в=s.ответ2;
    const x0=58, x1=278, px=(p)=>x0+(x1-x0)*p;
    const МЕТКИ=[[0,'семёрка','0'],[1/6,'шестёрка',в===1?'1/6':'?'],[0.5,'орёл','1/2'],[1,'рассвет','1']];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед чертит на полу храма <b>шкалу</b> от 0 до 1. На ноль — «выпадет семёрка», на единицу — «завтра взойдёт солнце», посередине — «монета упадёт орлом». Куда поставить «выпадет <b>шестёрка</b>»?') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,50,308,Н-104)}
        <rect x="${x0}" y="120" width="${x1-x0}" height="14" rx="7" fill="url(#c382-шкала)"/>
        ${МЕТКИ.map(([p,имя,зн],i)=>{ const x=px(p), вверх=i%2===0, шест=i===1;
          return `<g>${вырасти('7s',0.04+i*0.15)}
            <circle cx="${x.toFixed(1)}" cy="127" r="${шест?9:7}" fill="${шест?(в===1?GREEN:GOLD):'#f4efe4'}" stroke="${ОБВОД}" stroke-width="1">
              ${шест&&в!==1?анЛин('r','8;11;8','1.2s'):''}</circle>
            ${т(x.toFixed(1),вверх?100:162,имя,13,шест?GOLD:ИНК,true,undefined,'#0a0812')}
            ${т(x.toFixed(1),вверх?82:180,зн,13,МУТ,true,undefined,'#0a0812')}</g>`; }).join('')}
        ${подпись(168,Н-12, в===1?'1/6 — ближе к нулю, но не ноль':'где на шкале 1 из 6?', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Посередине — «или выпадет, или нет»','Ближе к нулю: 1 шанс из 6','Ближе к единице — оракул же обещал'],1,в,'r382Отв2') +
      (в==null ? СКАЗ('Вопрос','Где на шкале шестёрка?') : РАЗБОР(в===1, ['«Или да, или нет» — не значит «пополам». У кости 6 граней, шестёрка — одна: <b>1/6</b>, ближе к нулю.','Одна грань из шести: <b>1/6</b> — меньше половины, ближе к нулю. Выпадает редко, но возможно.','Обещание оракула кость не меняет. У честной кости шестёрка — 1/6, ближе к нулю.'][в])) +
      (в===1 ? ПРАВИЛО('Любая вероятность — число <b>от 0 до 1</b>. Чем ближе к 1, тем чаще событие случается.') : '');
  }

  /* 3. Урна жребиев */
  function F3(s){
    const Н=280, в=s.ответ3;
    const ЛОТЫ=[['#e0503a',-14],['#4a7ae0',8],['#e0503a',-4],['#4a7ae0',14],['#4a7ae0',-10]];
    return ЛИСТ(s) +
      ЗАДАЧА('Прежде чем бросать кость, Демарат тянет жребий из урны: <b>красный</b> — «боги слушают», <b>синий</b> — «уходи». Ученик заглядывает в урну: <b>2 красных</b> и <b>3 синих</b> жребия, все одинаковые на ощупь. Какова вероятность вытянуть красный?') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        <ellipse cx="100" cy="${Н-58}" rx="48" ry="7" fill="#000" opacity=".4"/>${урна(100,Н-92,1.05)}
        ${ЛОТЫ.map(([цв,пов],i)=>`<g>${анСдвиг('0 0;0 -6;0 0',(2+i*0.3).toFixed(1)+'s','0;0.5;1')}${жребий(202+i*22,142+(i%2)*14,цв,пов)}</g>`).join('')}
        ${т(246,112,'всего 5',14,ИНК,true,undefined,'#0a0812')}
        ${т(246,196,в===1?'2 из 5':'красных 2',15,в===1?GREEN:'#ff9a8a',true,undefined,'#0a0812')}
        ${подпись(168,Н-10, в===1?'благоприятные : все = 2/5':'благоприятные — красные; все — это все', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2/3','2/5','3/5'],1,в,'r382Отв3') +
      (в==null ? СКАЗ('Вопрос','P(красный) = ?') : РАЗБОР(в===1, ['2/3 — это красные к синим. А делить надо на <b>все</b> жребии: 2 из 5 = <b>2/5</b>.','Благоприятных исходов 2 (красные), всех равновозможных — 5. Вероятность <b>2/5</b>, меньше половины.','3/5 — вероятность синего. Красный — 2 из 5 = <b>2/5</b>. Вместе 2/5 + 3/5 = 1.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Вероятность = благоприятные исходы : все равновозможные исходы</b>.') : '');
  }

  /* 4. Кубик: чётное */
  function F4(s){
    const Н=240, в=s.ответ4;
    return ЛИСТ(s) +
      ЗАДАЧА('Демарат меняет правила: «Чётное число — удача!» Бедняк спрашивает: «А какой у меня шанс?» Оракул: «Три к одному против тебя». Посчитай сам: вероятность, что на честной кости выпадет <b>чётное</b>.') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,40,308,Н-84)}
        ${[1,2,3,4,5,6].map((n,i)=>{ const x=58+(i%3)*110, y=i<3?118:178, чёт=n%2===0;
          return `<g>${вырасти('6s',0.04+i*0.1)}${кость(x,y,22,n,...бока(n))}
            ${чёт?`<circle cx="${x}" cy="${y-22}" r="30" fill="none" stroke="${GREEN}" stroke-width="2" stroke-dasharray="5 4">${анЛин('stroke-dashoffset','0;-18','1.4s')}</circle>`:''}</g>`; }).join('')}
        ${подпись(168,Н-12, в===1?'3 из 6 = 1/2 — поровну':'чётные: 2, 4, 6', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1/6','1/2','3'],1,в,'r382Отв4') +
      (в==null ? СКАЗ('Вопрос','P(чётное) = ?') : РАЗБОР(в===1, ['1/6 — это одна грань. Чётных граней три: 2, 4, 6 — <b>3/6 = 1/2</b>.','Три благоприятных из шести: <b>1/2</b>. Никаких «три к одному» — шансы равны.','3 — число благоприятных исходов, а вероятность — дробь: 3 из 6 = <b>1/2</b>. Больше 1 она не бывает.'][в])) +
      (в===1 ? ПРАВИЛО('Благоприятных исходов может быть <b>несколько</b> — считай их все.') : '');
  }

  /* 5. Две монеты */
  function F5(s){
    const Н=280, в=s.ответ5;
    const ЛИСТЬЯ=[['О','О'],['О','Р'],['Р','О'],['Р','Р']];
    return ЛИСТ(s) +
      ЗАДАЧА('Новая игра оракула: бросает две сиракузские монеты. «Выпадут <b>разные</b> — ты выиграл. Исходов три: два орла, две решки или разные — значит, у тебя <b>1 шанс из 3</b>». Так ли это?') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,36,308,Н-78)}
        ${т(168,58,'первая',12,МУТ,true)}
        ${[0,1].map(i=>{ const x=100+i*136; return `<line x1="168" y1="66" x2="${x}" y2="92" stroke="${ФИАЛ}" stroke-width="1.6"/>${монета(x,104,12,i?'Р':'О')}`; }).join('')}
        ${ЛИСТЬЯ.map(([a,b],i)=>{ const x=52+i*77, px=100+(i>1?136:0), разн=a!==b;
          return `<g>${вырасти('7s',0.1+i*0.12)}<line x1="${px}" y1="132" x2="${x}" y2="160" stroke="${ФИАЛ}" stroke-width="1.4"/>
            ${монета(x,176,11,b,'серебро',true)}
            <rect x="${x-26}" y="198" width="52" height="24" rx="8" fill="${разн?'rgba(143,224,176,.2)':'rgba(255,255,255,.06)'}" stroke="${разн?GREEN:'#6a6080'}"/>
            ${т(x,215,a+b,14,разн?GREEN:ИНК,true)}</g>`; }).join('')}
        ${подпись(168,Н-10, в===1?'4 исхода, разные — 2: вероятность 1/2':'а ОР и РО — это один исход?', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1/3','1/2','1/4'],1,в,'r382Отв5') +
      (в==null ? СКАЗ('Вопрос','Вероятность, что монеты выпадут разными?') : РАЗБОР(в===1, ['Три исхода оракула <b>не равновозможны</b>: «разные» бывают двумя способами — ОР и РО. Всего исходов 4, разных 2: <b>1/2</b>.','Дерево даёт 2 · 2 = 4 равновозможных исхода, разные — ОР и РО: <b>2/4 = 1/2</b>. Оракул занизил шанс вдвое.','1/4 — вероятность одного исхода, например ОР. Но подходит и РО: 2/4 = <b>1/2</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Считай только <b>равновозможные</b> исходы. Дерево вариантов помогает их не потерять.') : '');
  }

  /* 6. Испытание кости */
  function F6(s){
    const Н=310, n=s.n6||0, в=s.ответ6;
    const c=счёт(n), ож=n/6, макс=Math.max(4,...c,ож);
    const база=Н-66, верх=86, к=(база-верх)/макс, w=34, x0=34;
    const столбы = c.map((v,i)=>{ const x=x0+i*(w+12), h=v*к, h0=s.pv6!=null?счёт(s.pv6)[i]*к:h;
      return `<g><rect x="${x}" y="${(база-h).toFixed(1)}" width="${w}" height="${h.toFixed(1)}" rx="4" fill="url(#c382-столб${i===5?'6':''})" filter="url(#c382-тень)">
          ${h0!==h?анРаз('y',(база-h0).toFixed(1),(база-h).toFixed(1),'0.6s')+анРаз('height',h0.toFixed(1),h.toFixed(1),'0.6s'):''}</rect>
        ${т(x+w/2,(база-h-6).toFixed(1),String(v),13,i===5?RED:ИНК,true,undefined,'#0a0812')}
        ${т(x+w/2,база+18,String(i+1),14,МУТ,true)}</g>`; }).join('');
    const вывод = n>=60 ? 'шестёрок '+c[5]+' — честной было бы около '+Math.round(ож) : (n?'пока мало бросков — рано судить':'жми «+10» или «+30»');
    return ЛИСТ(s) +
      ЗАДАЧА('Ночью ученик выкрадывает кость оракула. Если она честная, каждая грань выпадает примерно в <b>1/6</b> бросков. Бросай и следи за столбиками: пунктир — сколько было бы у честной кости. Нужно <b>не меньше 60</b> бросков.') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,36,308,Н-78)}
        ${т(24,56,'бросков: '+n,13,ИНК,true,'start')}
        ${n?т(312,56,'частота 6: '+c[5]+'/'+n,13,c[5]/n>0.25?RED:ИНК,true,'end'):''}
        ${столбы}
        ${n?`<line x1="26" y1="${(база-ож*к).toFixed(1)}" x2="310" y2="${(база-ож*к).toFixed(1)}" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="6 5">${анЛин('stroke-dashoffset','0;-22','1.4s')}</line>`:''}
        <line x1="26" y1="${база}" x2="310" y2="${база}" stroke="#8a80a0" stroke-width="1.2"/>
        ${n===0?`<g>${анСдвиг('0 0;0 -12;0 0','1.6s','0;0.4;1')}${кость(168,170,26,6,3,5)}</g>`:''}
        ${подпись(168,Н-10, вывод, n>=60?RED:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${BTN(3,'','+10',"r382Бросок(10)",n>=120)}${BTN(3,'','+30',"r382Бросок(30)",n>=120)}${BTN(3,'','сначала',"r382Бросок(0)",n===0)}</div>` +
      (n>=60
        ? ОТВЕТЫ('',['Кость честная: у каждой грани бывают удачные серии','Шестёрка выпадает почти вдвое чаще, чем должна: кость подпилена'],1,в,'r382Отв6') +
          (в==null ? СКАЗ('Вопрос','Что скажешь о кости?') : РАЗБОР(в===1, ['Разброс бывает, но не такой: за '+n+' бросков шестёрок '+c[5]+', а у честной кости было бы около '+Math.round(ож)+'. Столбик 6 стоит особняком — кость <b>подпилена</b>.','Частота шестёрки '+c[5]+'/'+n+' — около '+дробь(c[5]/n)+', а должна быть около 1/6 ≈ 0,17. Внутри кости, скорее всего, свинец.'][в]))
        : (n>0&&n<60 ? СКАЗ('Смотри','После 10 бросков все столбики похожи — по малому числу опытов ничего не понять. Бросай дальше.') : '')) +
      (в===1&&n>=60 ? ПРАВИЛО('<b>Частота</b> — сколько раз случилось из всех опытов. При многих опытах она близка к вероятности.') : '');
  }

  /* 7. Частота и вероятность — линейная диаграмма */
  function F7(s){
    const Н=280, в=s.ответ7;
    const x0=40, x1=312, y0=210, y1=64, px=(i)=>x0+(x1-x0)*i/100, py=(p)=>y0-(y0-y1)*p;
    let орлы=0; const точки=МОНЕТА.map((v,i)=>{ орлы+=v; return [px(i+1),py(орлы/(i+1))]; });
    const путь='M'+точки.map(([x,y])=>x.toFixed(1)+' '+y.toFixed(1)).join(' L');
    const [x10,y10]=точки[9];
    return ЛИСТ(s) +
      ЗАДАЧА('Демарат защищается: «Я бросил честную монету 10 раз — орёл выпал <b>6</b> раз. Значит, вероятность орла — 6/10, и мои кости тоже не обязаны давать 1/6!» Архимед бросает монету ещё 90 раз и рисует <b>линейную диаграмму</b> частоты.') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,40,308,Н-82)}
        ${[0,0.5,1].map(p=>`<line x1="${x0}" y1="${py(p)}" x2="${x1}" y2="${py(p)}" stroke="${p===0.5?GOLD:'#5a5070'}" stroke-width="${p===0.5?1.6:0.8}" ${p===0.5?'stroke-dasharray="6 5"':''}/>${т(x0-6,py(p)+4,p===0.5?'0,5':String(p),11,p===0.5?GOLD:МУТ,true,'end')}`).join('')}
        ${[10,50,100].map(i=>т(px(i),y0+16,String(i),11,МУТ,true)).join('')}
        <path d="${путь}" fill="none" stroke="${ЛАЗУРЬ}" stroke-width="2" stroke-linejoin="round" stroke-dasharray="1200" stroke-dashoffset="0">
          ${анК('stroke-dashoffset','1200;0;0','6s','0;0.7;1')}</path>
        <circle cx="${x10.toFixed(1)}" cy="${y10.toFixed(1)}" r="5" fill="${RED}">${анЛин('r','4;7;4','1.2s')}</circle>
        <line x1="${x10.toFixed(1)}" y1="${y10.toFixed(1)}" x2="150" y2="${py(0.86)}" stroke="${RED}" stroke-width="1"/>${т(154,py(0.86)+4,'10 бросков: 0,6',12,RED,true,'start','#0a0812')}
        ${т(x0,54,'частота орла',12,МУТ,true,'start')}${т(x1,54,'бросков: 100',12,МУТ,true,'end')}
        ${подпись(168,Н-10, в===1?'после 100 бросков — ровно 0,5':'частота прыгает, а потом…', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Да, по 10 броскам вероятность орла — 6/10','Нет: частота колеблется, но с числом бросков подходит к 1/2'],1,в,'r382Отв7') +
      (в==null ? СКАЗ('Вопрос','Прав ли оракул?') : РАЗБОР(в===1, ['10 бросков — слишком мало: после 20 частота была даже 0,7, а после 100 — 0,5. Частота — результат опыта, вероятность — свойство монеты.','Частота прыгала: 0,6 → 0,7 → 0,56 → <b>0,5</b>. Чем больше бросков, тем ближе частота к вероятности. А кость оракула и за 120 бросков держалась около 0,3.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Линейная диаграмма</b> показывает, как величина меняется: здесь — частота с ростом числа бросков.') : '');
  }

  /* 8. Обманная диаграмма */
  function F8(s){
    const Н=280, в=s.ответ8, честно=!!s.ось8;
    const A1=100, A2=110, дно=честно?0:90, верх=120, база=Н-70, вершина=92, к=(база-вершина)/(верх-дно);
    const столб = (x,v,подп,цвет,доля) => { const h=(v-дно)*к;
      return `<g>${вырасти('5s',доля)}<rect x="${x}" y="${(база-h).toFixed(1)}" width="64" height="${h.toFixed(1)}" rx="5" fill="${цвет}" filter="url(#c382-тень)"/>
        ${т(x+32,(база-h-8).toFixed(1),String(v),15,'#3a2410',true)}${т(x+32,база+18,подп,12,'#5a4a3a',true)}</g>`; };
    const деления = честно?[0,30,60,90,120]:[90,100,110,120];
    return ЛИСТ(s) +
      ЗАДАЧА('Демарат приносит царю Гиерону свиток: «С тех пор как я в храме, пожертвования выросли <b>вдвое</b>!» На свитке — столбчатая диаграмма: столбик «после» вдвое выше. Ученик смотрит на подписи: <b>100</b> и <b>110</b> драхм. Переключи ось.') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        <rect x="18" y="40" width="300" height="${Н-84}" rx="6" fill="#e8dcc0"/>
        <rect x="12" y="36" width="12" height="${Н-76}" rx="6" fill="#8a6a3a"/><rect x="312" y="36" width="12" height="${Н-76}" rx="6" fill="#8a6a3a"/>
        ${деления.map(v=>{ const y=база-(v-дно)*к; return `<line x1="64" y1="${y.toFixed(1)}" x2="292" y2="${y.toFixed(1)}" stroke="#b8a888" stroke-width=".8"/>${т(58,(y+4).toFixed(1),String(v),11,'#6a4a2a',true,'end')}`; }).join('')}
        ${столб(96,A1,'до оракула','#8a7ab0',0.05)}
        ${столб(196,A2,'после',честно?'#8a7ab0':'#b04a3a',0.25)}
        ${!честно?`<g>${анЛин('opacity','1;0.35;1','1.2s')}<circle cx="58" cy="${база-4}" r="14" fill="none" stroke="${RED}" stroke-width="2"/></g>`:''}
        ${т(168,60,честно?'ось с нуля: разница 10 из 100':'ось начинается с 90!',13,честно?'#1a6a3a':'#a02a1a',true)}
        ${подпись(168,Н-10, в===1?'рост на 10%, а не вдвое':'сравни числа, а не высоту', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд два">${BTN(3,честно?'':'вкл','ось оракула',"r382Ось(0)")}${BTN(3,честно?'вкл':'','ось с нуля',"r382Ось(1)")}</div>` +
      ОТВЕТЫ('три',['вдвое','на 10%','на 20%'],1,в,'r382Отв8') +
      (в==null ? СКАЗ('Вопрос','На сколько на самом деле выросли пожертвования?') : РАЗБОР(в===1, ['Вдвое выше только <b>столбик</b>: ось начинается с 90, и мы видим лишь 10 и 20 над ней. Числа 100 и 110 — рост на <b>10%</b>.','110 − 100 = 10, это 10% от 100. Высоту удвоила <b>обрезанная ось</b>: она начинается с 90, а не с нуля.','20 — это высота столбика над отметкой 90, а не прибавка. Прибавка 10 драхм из 100: <b>10%</b>.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Столбчатая диаграмма</b> сравнивает величины. Сначала посмотри, <b>с чего начинается ось</b>.') : '');
  }

  /* 9. Круговая диаграмма */
  function F9(s){
    const Н=280, в=s.ответ9;
    const cx=120, cy=150, R=78;
    const сектор = (a0,a1,цвет,сдвиг) => { const p=(a)=>[cx+R*Math.cos(a),cy+R*Math.sin(a)];
      const [x0,y0]=p(a0),[x1,y1]=p(a1), большая=a1-a0>Math.PI?1:0, am=(a0+a1)/2;
      const dx=Math.cos(am)*8, dy=Math.sin(am)*8;
      return `<g>${сдвиг?анСдвиг('0 0;'+dx.toFixed(1)+' '+dy.toFixed(1)+';0 0','2.4s','0;0.5;1'):''}
        <path d="M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 ${большая} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${цвет}" stroke="#0a0812" stroke-width="1.5" filter="url(#c382-тень)"/></g>`; };
    const П=Math.PI;
    return ЛИСТ(s) +
      ЗАДАЧА('В тайнике оракула находят вторую урну — «для богачей» — и его записку с <b>круговой диаграммой</b>: в урне <b>40 жребиев</b>, красные — «удача», синие и белые — «беда». Сколько в ней красных жребиев — и кому оракул давал эту урну?') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        ${доска(14,40,308,Н-84)}
        <ellipse cx="${cx}" cy="${cy+10}" rx="${R}" ry="${R*0.95}" fill="#000" opacity=".25"/>
        ${сектор(-П/2,П/2,'#e0503a',true)}
        ${сектор(П/2,П,'#e8e4dc',false)}
        ${сектор(П,1.5*П,'#4a7ae0',false)}
        ${[['#e0503a','красные','?'],['#4a7ae0','синие','четверть'],['#e8e4dc','белые','четверть']].map(([цв,имя,доля],i)=>`
          <rect x="218" y="${92+i*42}" width="16" height="16" rx="3" fill="${цв}"/>
          ${т(242,105+i*42,имя,13,ИНК,true,'start')}${т(242,122+i*42,i===0&&в===1?'половина = 20':доля,11,i===0&&в===1?GREEN:МУТ,true,'start')}`).join('')}
        ${подпись(168,Н-12, в===1?'½ круга → 20 из 40, P = 1/2':'весь круг — все 40 жребиев', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2','20','50'],1,в,'r382Отв9') +
      (в==null ? СКАЗ('Вопрос','Сколько красных?') : РАЗБОР(в===1, ['2 — это не доля. Красный сектор — <b>половина</b> круга: 40 : 2 = <b>20</b>.','Красный сектор — половина круга: 40 : 2 = <b>20</b>. Вероятность удачи 1/2 — больше, чем 2/5 в урне для всех. Эту урну оракул ставил <b>богачам</b>.','50 — это «50 процентов», половина. Жребиев: 40 · 1/2 = <b>20</b>.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Круговая диаграмма</b> показывает доли: весь круг — целое, сектор — его часть.') : '');
  }

  /* 10. Оракул разоблачён */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=290;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Перед царём Гиероном ученик кладёт урну, свиток и кость. Архимед распиливает кость: у грани с единицей — <b>свинцовая вставка</b>, и шестёрка тянется вверх. Демарата выводят из храма. Гиерон велит: «Пусть каждый мальчишка в Сиракузах умеет считать шансы».'
        : 'Не все улики собраны — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        ${храм(Н)}
        <g filter="url(#c382-тень)">
          ${кость(118,176,34,6,3,5)}
          <g>${анСдвиг('0 0;22 10;22 10;0 0','6s','0;0.3;0.8;1')}
            <path d="M150 130 l30 18 l0 40 l-30 -18 z" fill="#e8dcc0" stroke="#6a5a40"/>
            <rect x="158" y="150" width="14" height="14" fill="#6a6e78" stroke="#3a3e48"/>
            </g></g>${т(176,216,'свинец внутри!',12,RED,true,undefined,'#0a0812')}
        ${монета(274,140,16,'О','золото')}
        <g>${проявить('9s',0.1,0.2)}${подпись(168,30,'вероятность = благоприятные : все',GOLD,12)}</g>
        <g>${проявить('9s',0.3,0.4)}${подпись(168,58,'частота → вероятность при многих опытах',GOLD,12)}</g>
        <g>${проявить('9s',0.5,0.6)}${подпись(168,Н-12,'у диаграммы смотри на ось',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Вероятность = благоприятные : все <b>равновозможные</b> исходы, от 0 до 1. Частота — результат опыта; при многих опытах она близка к вероятности. Столбчатая диаграмма сравнивает, круговая показывает доли, линейная — изменение. И всегда смотри, откуда начинается ось.') +
      ПРАВИЛО('<b>Не верь обещаниям — считай исходы.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'В мешке 4 белых и 1 чёрный шар. Вероятность вытащить чёрный?', варианты:[{т:'1/5',ок:true},{т:'1/4',ок:false}], разбор:'1 из 5 — делим на все шары.' },
    { вопрос:'Какое событие достоверное?', варианты:[{т:'на кости выпадет не больше 6',ок:true},{т:'на кости выпадет 6',ок:false}], разбор:'Не больше 6 — всегда.' },
    { вопрос:'Вероятность, что на кости выпадет число больше 4?', варианты:[{т:'1/3',ок:true},{т:'1/2',ок:false}], разбор:'5 и 6 — 2 из 6 = 1/3.' },
    { вопрос:'Вероятность дождя 0,3. Вероятность, что дождя не будет?', варианты:[{т:'0,3',ок:false},{т:'0,7',ок:true}], разбор:'Вместе 1: 1 − 0,3.' },
    { вопрос:'На круговой диаграмме сектор «кошки» — половина круга, всего 30 питомцев. Кошек?', варианты:[{т:'15',ок:true},{т:'50',ок:false}], разбор:'Половина от 30.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r382Reset()")}</div>` +
        ПРАВИЛО('<b>Благоприятные : все.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r382Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Посчитай вероятность', задания:[
    {q:'3 красных и 7 синих шаров. P(красный)?', в:1, варианты:['3/7','3/10'], раз:'Делим на все 10.'},
    {q:'Кость: P(выпадет 1 или 2)?', в:0, варианты:['1/3','1/2'], раз:'2 из 6.'},
    {q:'Две монеты: P(два орла)?', в:1, варианты:['1/3','1/4'], раз:'Один исход из четырёх.'},
    {q:'В классе 12 девочек и 13 мальчиков, выбирают одного. P(девочка)?', в:0, варианты:['12/25','12/13'], раз:'Всего 25.'}
  ]};
  const Т2 = { имя:'События', задания:[
    {q:'«Из мешка с белыми шарами вынут белый» — это…', в:0, варианты:['достоверное','случайное'], раз:'Других нет.'},
    {q:'«После понедельника будет вторник» — вероятность…', в:1, варианты:['1/2','1'], раз:'Достоверное.'},
    {q:'Может ли вероятность быть 1,2?', в:1, варианты:['да','нет'], раз:'Только от 0 до 1.'},
    {q:'P(событие) = 0,25. P(не случится)?', в:0, варианты:['0,75','0,25'], раз:'1 − 0,25.'}
  ]};
  const Т3 = { имя:'Диаграммы', задания:[
    {q:'Какая диаграмма лучше покажет доли целого?', в:1, варианты:['линейная','круговая'], раз:'Весь круг — целое.'},
    {q:'Как показать, как менялась температура за неделю?', в:0, варианты:['линейной','круговой'], раз:'Изменение во времени.'},
    {q:'Сектор — треть круга, всего 60. Сколько в секторе?', в:0, варианты:['20','30'], раз:'60 : 3.'},
    {q:'Ось начинается с 50, столбики 55 и 60. «Вдвое больше»?', в:1, варианты:['да','нет — примерно на 9%'], раз:'5 из 55 ≈ 9%.'}
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
        в, "r382T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r382TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L382 = {
    id: ID,
    title: 'Вероятность и диаграммы: начало',
    ico: '🎲',
    src: 'Математика · 5–6 класс · Вероятность',
    subj: 'math',
    explain: [
      'Оракул Демарат в храме на Ортигии «читает волю богов» по кости. События бывают достоверные, невозможные и случайные; семёрка на кости невозможна.',
      'Вероятность — число от 0 до 1: 0 у невозможного, 1 у достоверного. Шестёрка — 1/6, ближе к нулю.',
      'Урна: 2 красных и 3 синих жребия. Вероятность красного = благоприятные : все = 2/5.',
      'Кубик: чётных граней 3 из 6, вероятность 1/2.',
      'Две монеты дают 4 равновозможных исхода: ОО, ОР, РО, РР. Разные — 2 из 4 = 1/2, а не 1/3.',
      'Испытание кости: у честной каждая грань около 1/6 бросков. У кости оракула шестёрок почти вдвое больше — она подпилена.',
      'Частота колеблется, но с ростом числа опытов приближается к вероятности; это видно на линейной диаграмме.',
      'Столбчатая диаграмма сравнивает величины. Если ось начинается не с нуля, рост 100 → 110 выглядит как «вдвое».',
      'Круговая диаграмма показывает доли: половина круга из 40 жребиев — 20; богачам оракул давал урну с шансом 1/2 вместо 2/5.',
      'Итог: благоприятные : все равновозможные, частота и вероятность, три вида диаграмм и честная ось.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: посчитай вероятность.',
      'Тренажёр 2: события.',
      'Тренажёр 3: диаграммы.'
    ],
    check: {
      q: 'В мешке 2 красных и 3 синих шара. Вероятность вытащить красный?',
      choices: ['2/3','2/5','3/5','1/2'],
      ans: 1,
      exp: 'Благоприятных 2, всего 5 → 2/5.'
    },
    tasks: [
      { q:'В коробке 4 белых и 1 чёрный шар. Сколько всего шаров?', kind:'unit', ans:5, tol:0,
        hints:['4 + 1.','Всего 5 шаров.'], sol:'5' },
      { q:'Бросают две монеты. Вероятность, что выпадут разные стороны?', kind:'choice', choices:['1/3','1/2'], ans:1,
        hints:['Исходы: ОО, ОР, РО, РР.','Разные — два из четырёх.'], sol:'1/2' },
      { q:'Круговая диаграмма: сектор — четверть круга, всего 40. Сколько в секторе?', kind:'unit', ans:10, tol:0,
        hints:['Четверть — это 1/4.','40 : 4.'], sol:'10' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L382.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Оракул Демарат',2:'Шкала шансов',3:'Урна жребиев',4:'Чётное на кости',5:'Две монеты',
      6:'Испытание кости',7:'Частота и вероятность',8:'Свиток оракула',9:'Урна для богачей',10:'Оракул разоблачён',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l382" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Вероятность'}</h2>${сцена}</div>`;
    s.pv6 = null;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r382Отв1=(к)=>{ S().ответ1=к; chRender(0); };
  window.r382Отв2=(к)=>{ S().ответ2=к; chRender(0); };
  window.r382Отв3=(к)=>{ const s=S(); s.ответ3=к; if(к===1) s.дело_жребий=true; chRender(0); };
  window.r382Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r382Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r382Бросок=(д)=>{ const s=S(), n=s.n6||0; s.pv6=n; s.n6 = д===0 ? 0 : Math.min(120,n+д);
    if(д===0) s.ответ6=null; chRender(0); };
  window.r382Отв6=(к)=>{ const s=S(); s.ответ6=к; if(к===1) s.дело_кость=true; chRender(0); };
  window.r382Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r382Ось=(в)=>{ S().ось8=!!в; chRender(0); };
  window.r382Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===1) s.дело_диаграмма=true; chRender(0); };
  window.r382Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r382Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r382Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r382T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r382TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L382; else arr.push(L382); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA382={render:render, L:L382};
})();
