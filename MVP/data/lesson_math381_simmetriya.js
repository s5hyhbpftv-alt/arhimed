/* ====== МАТЕМАТИКА · УРОК 381 · «ОСЕВАЯ И ЦЕНТРАЛЬНАЯ СИММЕТРИЯ» ====================
   5–6 класс. Переделан с нуля по эталону 1022 (deploy/ЭТАЛОН_УРОКА.md), рисунки —
   сцена из сюжета. Прежние версии (vis_wk.js visW381 — 25 кадров текста,
   vis_bw.js) остаются в общих файлах; этот файл регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Осевая симметрия — зеркало: точка и её отражение на одном
   перпендикуляре к оси и на равных расстояниях от неё. Центральная симметрия —
   поворот на 180° вокруг точки: точка и образ на одной прямой с центром, на
   равных расстояниях. У фигуры может быть ось, центр, то и другое или ничего.

   СЮЖЕТ. «Шпион в гавани». Осада. Римский лазутчик пробрался в Сиракузы под
   видом гонца. Архимед готовит ловушку: ночью цепь-бон перегородит гавань.
   Ученик восстанавливает по уцелевшей половине тайную карту скал (она
   симметрична), читает зеркальное письмо Архимеда и узнаёт шпиона по щиту:
   у настоящих гонцов знак совпадает сам с собой при повороте на 180°.

   РУКАМИ: карта — клетки правой половины включаются касанием, счётчик
   «совпало»; зеркало над письмом кнопкой; поворот щитов на 180° кнопкой.

   ВСЕ ОТВЕТЫ ПРОВЕРЕНЫ:
     отражение точки: тот же перпендикуляр, то же расстояние (вариант 2);
     карта: левые клетки (кол, ряд) (0,1) (1,0) (1,2) (2,3) (0,4) (2,4),
       зеркало кол → 5 − кол: (5,1) (4,0) (4,2) (3,3) (5,4) (3,4);
     прямоугольник — 2 оси (диагонали не оси);
     «ЦЕПЬ В ПОЛНОЧЬ»: левая половина — отражение правой относительно
       вертикали x = 168 (порядок букв тоже обратный); не меняются П, О, Н;
     центр O, A = O + (2; 1) → A′ = O − (2; 1) (вариант 3);
     щиты: молния (−14,−16)(14,−16)(−14,16)(14,16) и пара дельфинов (вторая —
       первая, повёрнутая на 180°) переходят в себя; якорь — только ось: шпион;
     правильный шестиугольник — 6 осей; параллелограмм — центр есть, осей нет.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 381;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', БИРЮЗА='#6fd8c8';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'карта',  имя:'Восстановить карту скал', итог:'6 из 6'},
    {ключ:'письмо', имя:'Прочитать зеркальное письмо', итог:'в полночь'},
    {ключ:'шпион',  имя:'Узнать шпиона по щиту', итог:'пойман'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* карта: 6 колонок × 5 рядов, ось между 2-й и 3-й колонкой */
  const ЛЕВЫЕ = [[0,1],[1,0],[1,2],[2,3],[0,4],[2,4]];
  const НУЖНО = ЛЕВЫЕ.map(([к,р])=>(5-к)+','+р);

  const CSS=`
  #lvis .s6.l381{gap:14px}
  #lvis .s6.l381 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l381 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l381 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l381 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l381 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l381 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l381 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l381 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l381 .карт .текст b{color:${GOLD}}
  #lvis .s6.l381 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l381 .правило b{color:${GOLD}}
  #lvis .s6.l381 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(111,216,200,.14),rgba(111,216,200,.04));
    border:1.5px solid rgba(111,216,200,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l381 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l381 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${БИРЮЗА}}
  #lvis .s6.l381 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l381 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l381 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l381 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l381 .лист li.есть{color:${ИНК}}
  #lvis .s6.l381 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l381 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l381 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l381 .ряд{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l381 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-weight:700;
    border:1.5px solid rgba(111,216,200,.5);background:rgba(111,216,200,.12);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l381 .ряд button:active{transform:translateY(2px);background:rgba(111,216,200,.26)}
  #lvis .s6.l381 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.18)}
  #lvis .s6.l381 .pic svg .клетка{cursor:pointer}
  #lvis .s6.l381 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l381 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l381 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l381 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l381 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l381 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l381 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:17px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l381 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l381 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l381 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l381 .уровни .точка.сейчас{background:${GOLD};animation:l381dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l381dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l381 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l381{-webkit-text-size-adjust:100%}
  #lvis .s6.l381 [data-anim]{animation:l381rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l381rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l381 [data-anim]{animation:none!important}
    #lvis .s6.l381 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l381 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l381-style');
      if(!s){ s=document.createElement('style'); s.id='l381-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Шпион в гавани</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Ловушка Архимеда</span><b class="${всё?'готово':''}">${
        всё?'шпион пойман':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  /* поворот один раз, с остановкой; без движения — сразу конечное положение */
  const поворотРаз = (от,до,cx,cy,длит) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="rotate" from="${от} ${cx} ${cy}" to="${до} ${cx} ${cy}" dur="${длит}"
              fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>${ЗАВОД}` : '';
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
      <linearGradient id="c381-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#070b24"/><stop offset="0.6" stop-color="#18224a"/><stop offset="1" stop-color="#2a3460"/>
      </linearGradient>
      <linearGradient id="c381-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c3a66"/><stop offset="1" stop-color="#081a30"/>
      </linearGradient>
      <linearGradient id="c381-стена" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a7a62"/><stop offset="1" stop-color="#4a3e30"/>
      </linearGradient>
      <radialGradient id="c381-луна" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#b8c4ee"/>
      </radialGradient>
      <radialGradient id="c381-ореол" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#dfe6ff" stop-opacity=".45"/><stop offset="1" stop-color="#dfe6ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c381-факел" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff0b0" stop-opacity=".9"/><stop offset="0.4" stop-color="#ff9a40" stop-opacity=".4"/><stop offset="1" stop-color="#ff5020" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c381-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffe4a8"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </linearGradient>
      <radialGradient id="c381-щит" cx="0.38" cy="0.35" r="0.75">
        <stop offset="0" stop-color="#ffe8b0"/><stop offset="0.5" stop-color="#c98f3e"/><stop offset="1" stop-color="#4a2e0a"/>
      </radialGradient>
      <linearGradient id="c381-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4e6c6"/><stop offset="1" stop-color="#d4ba86"/>
      </linearGradient>
      <linearGradient id="c381-зеркало" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8a96b0"/><stop offset="0.3" stop-color="#e8f0ff"/><stop offset="0.6" stop-color="#b8c4dc"/><stop offset="1" stop-color="#6a7690"/>
      </linearGradient>
      <radialGradient id="c381-скала" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#a8a090"/><stop offset="0.6" stop-color="#6a6258"/><stop offset="1" stop-color="#2e2a26"/>
      </radialGradient>
      <radialGradient id="c381-скала-н" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#b8f0d8"/><stop offset="0.6" stop-color="#4aa088"/><stop offset="1" stop-color="#1a4a3a"/>
      </radialGradient>
      <filter id="c381-тень" x="-30%" y="-30%" width="160%" height="170%">
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
    return `<g filter="url(#c381-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* ночная гавань: луна, стены Ортигии, звёзды, вода */
  const гавань = (Н,стены) => `
    <rect x="0" y="0" width="336" height="${Н}" fill="url(#c381-ночь)"/>
    ${[[30,22],[80,40],[140,18],[210,34],[250,14],[300,44],[118,56],[186,62]].map(([x,y],i)=>
      `<circle cx="${x}" cy="${y}" r="1.2" fill="#fff">${анЛин('opacity','1;0.3;1',(2+i*0.37).toFixed(1)+'s')}</circle>`).join('')}
    <circle cx="282" cy="46" r="40" fill="url(#c381-ореол)" data-декор="1"/>
    <circle cx="282" cy="46" r="15" fill="url(#c381-луна)"/>
    ${стены!==false?`<path d="M0 ${Н*0.46} h40 v-14 h10 v6 h10 v-6 h10 v14 h60 v-22 h14 v8 h12 v-8 h14 v22 h60 v-12 h10 v6 h10 v-6 h10 v12 h56 V${Н*0.58} H0 Z" fill="url(#c381-стена)" opacity=".85"/>
      ${[56,150,262].map((x,i)=>`<circle cx="${x}" cy="${Н*0.46-18}" r="16" fill="url(#c381-факел)" data-декор="1">${анЛин('r','14;19;14',(1.5+i*0.3).toFixed(1)+'s')}</circle>`).join('')}`:''}
    <rect x="0" y="${Н*0.58}" width="336" height="${Н*0.42}" fill="url(#c381-море)"/>
    ${[0,1,2].map(i=>`<path d="M${-20+i*14} ${Н*0.64+i*16} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none"
      stroke="#9fc8ff" stroke-width="1" opacity="${(0.35-i*0.08).toFixed(2)}" stroke-dasharray="14 18">${анЛин('stroke-dashoffset','0;-32',(3+i*0.6).toFixed(1)+'s')}</path>`).join('')}`;
  const доска = (x,y,w,h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="rgba(8,12,30,.84)" stroke="rgba(111,216,200,.28)"/>`;
  /* клетчатая сетка */
  const сетка = (x0,y0,кол,ряд,ш,цвет) => {
    let s='';
    for(let i=0;i<=кол;i++) s+=`<line x1="${x0+i*ш}" y1="${y0}" x2="${x0+i*ш}" y2="${y0+ряд*ш}" stroke="${цвет||'#3a4a70'}" stroke-width=".8"/>`;
    for(let j=0;j<=ряд;j++) s+=`<line x1="${x0}" y1="${y0+j*ш}" x2="${x0+кол*ш}" y2="${y0+j*ш}" stroke="${цвет||'#3a4a70'}" stroke-width=".8"/>`;
    return s;
  };
  const ось = (x1,y1,x2,y2,цвет) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${цвет||GOLD}" stroke-width="2.2" stroke-dasharray="8 6">
    ${анЛин('stroke-dashoffset','0;-28','1.6s')}</line>`;
  const точка = (x,y,имя,цвет,r) => `<g filter="url(#c381-тень)"><circle cx="${x}" cy="${y}" r="${r||7}" fill="${цвет}" stroke="${ОБВОД}" stroke-width="1"/>
    ${имя?т(x+12,y-10,имя,14,цвет,true,'start','#070b24'):''}</g>`;
  /* гонец с круглым щитом; эмблема рисуется отдельно */
  const гонец = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c381-тень)">
    <path d="M-16 64 q0 -40 16 -46 q16 6 16 46 z" fill="#6a2a2a"/>
    <circle cx="0" cy="8" r="10" fill="#c89068"/>
    <path d="M-12 6 q12 -22 24 0 q-2 -6 -12 -6 q-10 0 -12 6 z" fill="url(#c381-бронза)"/>
    <path d="M0 -12 q10 -6 14 4" stroke="#c0302a" stroke-width="4" fill="none"/>
    <line x1="-6" y1="64" x2="-7" y2="80" stroke="#3a2a1a" stroke-width="3"/><line x1="6" y1="64" x2="7" y2="80" stroke="#3a2a1a" stroke-width="3"/></g>`;
  const ЭМБЛЕМЫ = {
    молния: `<path d="M-14 -16 L14 -16 L-14 16 L14 16" fill="none" stroke="#2a1606" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`,
    якорь: `<g fill="none" stroke="#2a1606" stroke-width="4" stroke-linecap="round"><circle cx="0" cy="-15" r="4"/><line x1="0" y1="-11" x2="0" y2="15"/>
      <line x1="-9" y1="-5" x2="9" y2="-5"/><path d="M-15 5 q5 12 15 10 q10 2 15 -10"/></g>`,
    дельфины: `<g fill="#2a1606">${[0,180].map(a=>
      `<path transform="rotate(${a})" d="M-18 -2 q4 -16 22 -12 q-4 2 -5 6 q-8 -2 -12 4 q-2 3 -5 2 z"/>`).join('')}</g>`
  };
  const щит = (x,y,r,эмблема,повёрнут,играть) => {
    const угол = повёрнут?180:0;
    return `<g filter="url(#c381-тень)">
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c381-щит)" stroke="#3a2406" stroke-width="2"/>
      <circle cx="${x}" cy="${y}" r="${r-5}" fill="none" stroke="#7a5418" stroke-width="1.2"/>
      <g transform="rotate(${угол} ${x} ${y})">${играть?поворотРаз(0,180,x,y,'1.2s'):''}
        <g transform="translate(${x} ${y}) scale(${(r/26).toFixed(2)})">${ЭМБЛЕМЫ[эмблема]}</g></g></g>`;
  };

  /* ================= КАДРЫ ================= */

  /* 1. Лазутчик */
  function F1(s){
    const Н=300;
    return ЛИСТ(s) +
      ЗАДАЧА('Осада Сиракуз. Ночью в город вошли три гонца от союзников — и один из них <b>римский шпион</b>. Архимед готовит ловушку: в полночь поперёк гавани натянут цепь, и римские лодки разобьются о скалы. Но карта скал наполовину сгорела, письмо Архимеда написано зеркально, а шпион пока неизвестен. Ключ ко всему — <b>симметрия</b>.') +
      `<div class="pic">${свг(`
        ${гавань(Н)}
        <rect x="0" y="${Н*0.58+56}" width="336" height="22" fill="url(#c381-стена)"/><rect x="0" y="${Н*0.58+56}" width="336" height="3" fill="#b8a888"/>
        ${[70,168,266].map((x,i)=>`<g>${анСдвиг('0 0;0 -3;0 0',(2.2+i*0.4).toFixed(1)+'s','0;0.5;1')}${гонец(x,Н*0.58+6,0.9)}
          ${щит(x+22,Н*0.58+48,17,['молния','якорь','дельфины'][i],false,false)}</g>`).join('')}
        ${т(168,Н-14,'кто из троих — шпион?',14,GOLD,true,undefined,'#070b24')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Две симметрии','<b>Осевая</b> — как зеркало: фигура отражается относительно прямой (оси). <b>Центральная</b> — поворот на <b>180°</b> вокруг точки (центра). Бабочка симметрична относительно оси, а знак ☯ — относительно центра.') +
      ПРАВИЛО('Ось — <b>зеркало</b>. Центр — <b>поворот на 180°</b>.');
  }

  /* 2. Отражение точки */
  function F2(s){
    const Н=280, в=s.ответ2, ш=30, ox=168, y0=56;
    const A=[ox-2*ш, y0+3*ш], Вар=[[ox+2*ш,y0+2*ш],[ox+2*ш,y0+3*ш],[ox+1*ш,y0+4*ш]];
    return ЛИСТ(s) +
      ЗАДАЧА('Разведчик отметил на восточном берегу башню <b>A</b>. Вдоль гавани тянется прямой мол — это <b>ось</b>. На западном берегу стоит такая же башня, симметричная A относительно мола. Где она — 1, 2 или 3?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        ${доска(14,40,308,Н-84)}
        ${сетка(ox-4*ш,y0,8,5,ш)}
        ${ось(ox,y0-10,ox,y0+5*ш+10)}
        ${т(ox,y0-14,'мол — ось',12,GOLD,true)}
        ${в===1?`<line x1="${A[0]}" y1="${A[1]}" x2="${Вар[1][0]}" y2="${Вар[1][1]}" stroke="${GREEN}" stroke-width="2"/>
          ${т(ox-ш,A[1]+18,'2',13,GREEN,true)}${т(ox+ш,A[1]+18,'2',13,GREEN,true)}
          <rect x="${ox-6}" y="${A[1]-6}" width="12" height="12" fill="none" stroke="${GREEN}" stroke-width="1.4"/>`:''}
        ${точка(A[0],A[1],'A',RED,8)}
        ${Вар.map(([x,y],i)=>`<g>${в==null?анЛин('opacity','1;0.5;1',(1.2+i*0.2).toFixed(1)+'s'):''}${точка(x,y,'',в===i?(i===1?GREEN:RED):ЛАЗУРЬ,8)}${т(x,y+4,String(i+1),11,'#070b24',true)}</g>`).join('')}
        ${подпись(168,Н-10, в===1?'тот же перпендикуляр, то же расстояние':'сосчитай клетки до оси', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1','2','3'],1,в,'r381Отв2') +
      (в==null ? СКАЗ('Вопрос','Какая точка симметрична A?') : РАЗБОР(в===1, ['Точка 1 на верном расстоянии, но выше: отрезок A1 не перпендикулярен оси. Отражение — на <b>той же высоте</b>: точка 2.','A на 2 клетки левее оси — отражение на 2 клетки правее, на той же горизонтали: <b>точка 2</b>.','Точка 3 ближе к оси (1 клетка) и ниже. Расстояние должно быть тем же: 2 клетки, на той же высоте — точка 2.'][в])) +
      (в===1 ? ПРАВИЛО('Симметричные точки лежат на одном <b>перпендикуляре к оси</b> и на <b>равных расстояниях</b> от неё.') : '');
  }

  /* 3. Карта скал */
  function F3(s){
    const Н=330, ш=46, x0=30, y0=56;
    const стоит = new Set(s.карта3||[]);
    const верных = НУЖНО.filter(к=>стоит.has(к)).length, лишних=[...стоит].filter(к=>!НУЖНО.includes(к)).length;
    const готово = верных===6 && лишних===0;
    const скала = (к,р,нов,ок) => { const cx=x0+к*ш+ш/2, cy=y0+р*ш+ш/2;
      return `<g filter="url(#c381-тень)"><path d="M${cx-17} ${cy+12} q-2 -16 8 -22 q10 -8 18 0 q10 6 8 22 z" fill="url(#c381-скала${нов?'-н':''})" stroke="${нов&&!ок?RED:ОБВОД}" stroke-width="${нов&&!ок?2:1}"/>
        <path d="M${cx-8} ${cy-6} q5 -4 10 0" stroke="rgba(255,255,255,.4)" stroke-width="1.4" fill="none"/></g>`; };
    const цели = [];
    for(let к=3;к<6;к++) for(let р=0;р<5;р++)
      цели.push(`<rect class="клетка" x="${x0+к*ш}" y="${y0+р*ш}" width="${ш}" height="${ш}" fill="rgba(255,255,255,.001)" onclick="r381Клетка(${к},${р})"/>`);
    return ЛИСТ(s) +
      ЗАДАЧА('Уцелела только западная половина карты скал. Архимед знает: скалы у входа в гавань лежат <b>симметрично</b> относительно фарватера. Касайся клеток восточной половины, чтобы поставить скалы. Цепь натянут там, куда лодки не свернут.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c381-море)"/>
        ${[0,1,2,3].map(i=>`<path d="M${-20+i*10} ${70+i*62} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#9fc8ff" stroke-width="1" opacity=".25" stroke-dasharray="14 18">${анЛин('stroke-dashoffset','0;-32',(3+i*0.5).toFixed(1)+'s')}</path>`).join('')}
        <rect x="${x0}" y="${y0}" width="${3*ш}" height="${5*ш}" fill="rgba(216,190,134,.12)"/>
        ${сетка(x0,y0,6,5,ш,'#5a7aa8')}
        ${ось(x0+3*ш,y0-12,x0+3*ш,y0+5*ш+12)}
        ${т(x0+1.5*ш,y0-12,'уцелело',12,МУТ,true)}${т(x0+4.5*ш,y0-12,'восстанови',12,GOLD,true)}
        ${ЛЕВЫЕ.map(([к,р])=>скала(к,р,false,true)).join('')}
        ${[...стоит].map(ключ=>{ const [к,р]=ключ.split(',').map(Number); return скала(к,р,true,НУЖНО.includes(ключ)); }).join('')}
        ${цели.join('')}
        ${подпись(168,Н-10, готово?'карта восстановлена!':'совпало '+верных+' из 6'+(лишних?', лишних '+лишних:''), готово?GREEN:(лишних?RED:ИНК),13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (готово
        ? РАЗБОР(true,'Каждая скала отражена: на той же строке и на том же расстоянии от фарватера. Проход между скалами — ровно по оси: туда и натянут цепь.') +
          ПРАВИЛО('Чтобы отразить фигуру, отражают <b>каждую её точку</b>.')
        : СКАЗ('Подсказка','Считай клетки от оси: скала в первой клетке слева — ставь в первую справа. Лишнюю скалу убирают повторным касанием.'));
  }

  /* 4. Оси прямоугольника */
  function F4(s){
    const Н=260, в=s.ответ4;
    const x=88, y=70, w=160, h=100, cx=x+w/2, cy=y+h/2;
    /* уголок (x; y+h), сложенный по диагонали */
    const dx=w, dy=h, px=0, py=h, t0=(px*dx+py*dy)/(dx*dx+dy*dy), угx=x+2*t0*dx-px, угy=y+2*t0*dy-py;
    return ЛИСТ(s) +
      ЗАДАЧА('Цепь крепят к прямоугольному каменному блоку. Мастер хочет вырубить на нём <b>все оси симметрии</b> — по ним будут сверлить отверстия. Подмастерье сразу проводит четыре линии: две через середины сторон и две диагонали. Сколько осей на самом деле?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        ${доска(14,40,308,Н-84)}
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#c381-стена)" stroke="#2a2218" stroke-width="2" filter="url(#c381-тень)"/>
        ${ось(cx,y-12,cx,y+h+12,GREEN)}${ось(x-12,cy,x+w+12,cy,GREEN)}
        <line x1="${x}" y1="${y}" x2="${x+w}" y2="${y+h}" stroke="${RED}" stroke-width="1.6" stroke-dasharray="4 4"/>
        <g>${анК('opacity','0;0;0.85;0.85;0','5s','0;0.3;0.45;0.8;1')}
          <path d="M${x} ${y} L${x+w} ${y+h} L${x} ${y+h} Z" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
          <path d="M${x} ${y} L${x+w} ${y+h} L${угx.toFixed(1)} ${угy.toFixed(1)} Z" fill="rgba(255,138,120,.35)" stroke="${RED}" stroke-width="1.4"/></g>
        ${в===1?т(168,y+h+34,'диагональ: сгиб не совпадает',12,RED,true):т(168,y+h+34,'сложи по диагонали…',12,МУТ,true)}
        ${подпись(168,Н-10, в===1?'2 оси: через середины сторон':'проверь каждую линию сгибом', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['4','2','1'],1,в,'r381Отв4') +
      (в==null ? СКАЗ('Вопрос','Сколько осей симметрии у прямоугольника, который не квадрат?') : РАЗБОР(в===1, ['Четыре — у квадрата. Сложи прямоугольник по диагонали: уголок вылезет за край. Осей <b>две</b> — через середины противоположных сторон.','Сгиб по диагонали не совмещает половинки — угол торчит. Остаются <b>две оси</b>: через середины противоположных сторон.','Одна — у равнобедренного треугольника. У прямоугольника и вертикальная, и горизонтальная линии через середины — оси: <b>две</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Ось фигуры — линия сгиба, при котором половинки <b>совпадают</b>. Диагональ прямоугольника — не ось.') : '');
  }

  /* 5. Зеркальное письмо */
  function F5(s){
    const Н=240, в=s.ответ5, зерк=!!s.зеркало5;
    const СТРОКИ=['ЦЕПЬ В','ПОЛНОЧЬ'], шаг=17;
    /* правая половина — обычный текст; левая — его отражение относительно оси x = 168 */
    const буквы = (зеркально,цвет) => СТРОКИ.map((стр,р)=>[...стр].map((б,i)=>{
        const xr=196+i*шаг, x=зеркально?336-xr:xr, y=96+р*40, сим='ПОН'.includes(б)&&в===1;
        return `<g transform="translate(${x} ${y}) scale(${зеркально?-1:1} 1)">${т(0,0,б,19,сим?'#1a8a5a':цвет,true)}</g>`; }).join('')).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед пишет приказ начальнику цепи <b>зеркально</b> — чтобы шпион, заглянув через плечо, ничего не понял. Прочесть можно, только поставив рядом бронзовое зеркало: его край — <b>ось симметрии</b>. Поставь зеркало кнопкой. Какие буквы в зеркале <b>не изменились</b>?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        <g filter="url(#c381-тень)"><rect x="18" y="52" width="140" height="120" rx="4" fill="url(#c381-пергамент)"/>
          <rect x="12" y="48" width="10" height="128" rx="5" fill="#8a6a3a"/></g>
        ${буквы(true,'#3a2410')}
        ${зерк?`<g filter="url(#c381-тень)"><rect x="178" y="52" width="140" height="120" rx="6" fill="url(#c381-зеркало)" stroke="url(#c381-бронза)" stroke-width="4"/>
            <rect x="178" y="52" width="140" height="120" rx="6" fill="rgba(255,255,255,.12)">${анЛин('opacity','0.2;0.6;0.2','3s')}</rect></g>
          ${буквы(false,'#1a2440')}`
          :`<g>${анЛин('opacity','1;0.45;1','1.4s')}<rect x="178" y="52" width="140" height="120" rx="6" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="8 6"/></g>${т(248,108,'место',13,GOLD,true)}${т(248,126,'для зеркала',13,GOLD,true)}`}
        ${ось(168,40,168,186,БИРЮЗА)}
        ${т(168,34,'ось',12,БИРЮЗА,true)}
        ${подпись(168,Н-10, в===1?'П, О, Н: ось внутри буквы':'зеркало меняет левое и правое', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${BTN(3,зерк?'':'вкл','убрать зеркало',"r381Зеркало(0)")}${BTN(3,зерк?'вкл':'','поставить зеркало',"r381Зеркало(1)")}</div>` +
      ОТВЕТЫ('три',['Е, В, Ь','П, О, Н','Ц, Ч, Л'],1,в,'r381Отв5') +
      (в==null ? СКАЗ('Вопрос','Какие буквы выглядят одинаково на свитке и в зеркале?') : РАЗБОР(в===1, ['Е, В и Ь повёрнуты «лицом» в одну сторону — в зеркале они развернутся. А у <b>П, О, Н</b> есть вертикальная ось: отражение совпадает с буквой.','У П, О и Н есть <b>вертикальная ось</b> симметрии — зеркало переводит их в себя. Приказ: «Цепь в полночь».','У Ц хвостик справа, у Ч перекладина слева — отражение их меняет. Не меняются <b>П, О, Н</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Зеркало меняет <b>левое и правое</b>: и буквы, и их порядок. Неизменными остаются фигуры с вертикальной осью.') : '');
  }

  /* 6. Поворот на 180° */
  function F6(s){
    const Н=280, в=s.ответ6, ш=30, O=[168,150];
    const A=[O[0]+2*ш,O[1]-ш], Вар=[[O[0]-2*ш,O[1]-ш],[O[0]+2*ш,O[1]+ш],[O[0]-2*ш,O[1]+ш]];
    return ЛИСТ(s) +
      ЗАДАЧА('У входа в гавань — маяк <b>O</b>. Архимед велит поставить две лодки с цепью так, чтобы одна была <b>симметрична другой относительно маяка</b> — поворотом на 180° вокруг O. Первая лодка — в точке <b>A</b>. Где вторая?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        ${доска(14,40,308,Н-84)}
        ${сетка(O[0]-4*ш,O[1]-3*ш,8,6,ш)}
        ${в===2?`<line x1="${A[0]}" y1="${A[1]}" x2="${Вар[2][0]}" y2="${Вар[2][1]}" stroke="${GREEN}" stroke-width="2"/>`:''}
        <g>${ДВИЖ&&в==null?`<path d="M${A[0]} ${A[1]} A67 67 0 0 0 ${O[0]-2*ш} ${O[1]+ш}" fill="none" stroke="${GOLD}" stroke-width="1.4" stroke-dasharray="4 5" opacity=".7">${анЛин('stroke-dashoffset','0;-18','1.2s')}</path>`:''}</g>
        <g filter="url(#c381-тень)"><rect x="${O[0]-6}" y="${O[1]-14}" width="12" height="20" fill="#e8dcc0"/><circle cx="${O[0]}" cy="${O[1]-16}" r="8" fill="url(#c381-факел)">${анЛин('r','6;10;6','1.2s')}</circle></g>
        ${т(O[0]+12,O[1]+18,'O',14,GOLD,true,'start','#070b24')}
        ${точка(A[0],A[1],'A',RED,8)}
        ${Вар.map(([x,y],i)=>`<g>${в==null?анЛин('opacity','1;0.5;1',(1.2+i*0.2).toFixed(1)+'s'):''}${точка(x,y,'',в===i?(i===2?GREEN:RED):ЛАЗУРЬ,8)}${т(x,y+4,String(i+1),11,'#070b24',true)}</g>`).join('')}
        ${подпись(168,Н-10, в===2?'A, O и A′ на одной прямой, OA = OA′':'поверни A на 180° вокруг O', в===2?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1','2','3'],2,в,'r381Отв6') +
      (в==null ? СКАЗ('Вопрос','Где вторая лодка?') : РАЗБОР(в===2, ['Точка 1 — зеркало относительно <b>вертикальной оси</b>, а не поворот. При повороте на 180° A уходит на 2 левее и на 1 <b>ниже</b> O: точка 3.','Точка 2 — зеркало относительно горизонтали. Поворот на 180° меняет обе стороны: 2 вправо → 2 влево, 1 вверх → 1 вниз: <b>точка 3</b>.','A на 2 правее и 1 выше O — образ на 2 левее и 1 ниже: <b>точка 3</b>. Отрезок AA′ проходит через центр и делится им пополам.'][в])) +
      (в===2 ? ПРАВИЛО('При центральной симметрии точка и образ лежат на одной прямой с центром и на <b>равных расстояниях</b> от него.') : '');
  }

  /* 7. Щиты гонцов */
  function F7(s){
    const Н=290, в=s.ответ7, пов=!!s.пов7, играть=!!s.играть7;
    const ЩИТЫ=[['молния','Никий'],['якорь','Каллий'],['дельфины','Дион']];
    return ЛИСТ(s) +
      ЗАДАЧА('Пароль союзников: знак на щите настоящего гонца <b>совпадает сам с собой при повороте на 180°</b>. Шпион о пароле не знает — его знак красивый, но «не тот». Поверни все три щита кнопкой. Кто из гонцов <b>шпион</b>?') +
      `<div class="pic">${свг(`
        ${гавань(Н)}
        ${ЩИТЫ.map(([э,имя],i)=>{ const x=62+i*106, y=Н*0.58+30;
          return `<g>${щит(x,y-4,34,э,пов,играть)}
            <circle cx="${x}" cy="${y-4}" r="3" fill="${GOLD}"/>
            ${т(x,y+50,имя,14,ИНК,true,undefined,'#070b24')}
            ${пов?т(x,y+68,э==='якорь'?'вверх ногами!':'совпал',12,э==='якорь'?RED:GREEN,true,undefined,'#070b24'):''}</g>`; }).join('')}
        ${подпись(168,34, пов?'повёрнуто на 180°':'щиты как есть', пов?GOLD:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${BTN(3,пов?'':'вкл','как есть',"r381Щиты(0)")}${BTN(3,пов?'вкл':'','повернуть на 180°',"r381Щиты(1)")}</div>` +
      ОТВЕТЫ('три',['Никий','Каллий','Дион'],1,в,'r381Отв7') +
      (в==null ? СКАЗ('Вопрос','Кто шпион?') : РАЗБОР(в===1, ['Молния Никия после поворота на 180° совпала сама с собой — у неё есть центр симметрии. Шпион — <b>Каллий</b>: его якорь вверх ногами.','Якорь симметричен относительно вертикальной <b>оси</b>, но центра симметрии у него нет: после поворота на 180° он вверх ногами. <b>Каллий</b> — шпион.','Дельфины Диона после поворота поменялись местами и совпали — знак верный. Шпион — <b>Каллий</b> с якорем.'][в])) +
      (в===1 ? ПРАВИЛО('Фигура имеет <b>центр симметрии</b>, если при повороте на 180° вокруг него совпадает сама с собой.') : '');
  }

  /* 8. Шестиугольная башня */
  function F8(s){
    const Н=260, в=s.ответ8, cx=168, cy=138, R=76;
    const вершины = Array.from({length:6},(_,i)=>{ const a=Math.PI/6+i*Math.PI/3; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; });
    const оси = Array.from({length:6},(_,i)=>{ const a=i*Math.PI/6; return [cx+(R+18)*Math.cos(a), cy+(R+18)*Math.sin(a), cx-(R+18)*Math.cos(a), cy-(R+18)*Math.sin(a)]; });
    return ЛИСТ(s) +
      ЗАДАЧА('Цепь наматывают на ворот в <b>шестиугольной</b> башне (основание — правильный шестиугольник). Чтобы ворот не перекосило, опоры ставят на все оси симметрии основания. Сколько их?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        ${доска(14,40,308,Н-84)}
        <path d="M${вершины.map(([x,y])=>x.toFixed(1)+' '+y.toFixed(1)).join(' L')} Z" fill="url(#c381-стена)" stroke="#2a2218" stroke-width="2" filter="url(#c381-тень)"/>
        ${оси.map(([x1,y1,x2,y2],i)=>`<g>${вырасти('9s',0.04+i*0.12)}<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i%2?БИРЮЗА:GOLD}" stroke-width="1.8" stroke-dasharray="6 5"/></g>`).join('')}
        <circle cx="${cx}" cy="${cy}" r="5" fill="${GOLD}"/>
        ${подпись(168,Н-10, в===1?'3 через вершины + 3 через середины сторон':'через вершины и через середины сторон', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['3','6','12'],1,в,'r381Отв8') +
      (в==null ? СКАЗ('Вопрос','Сколько осей у правильного шестиугольника?') : РАЗБОР(в===1, ['Три — только через противоположные вершины. Ещё три идут через середины противоположных сторон: всего <b>6</b>.','Через противоположные вершины — 3, через середины противоположных сторон — 3: <b>6 осей</b>. У правильного n-угольника осей n.','12 — это если каждую ось считать дважды. Линий всего <b>6</b>.'][в])) +
      (в===1 ? ПРАВИЛО('У правильного многоугольника с n сторонами — <b>n осей</b>. У квадрата 4, у равностороннего треугольника 3.') : '');
  }

  /* 9. Парус-параллелограмм */
  function F9(s){
    const Н=270, в=s.ответ9;
    const P=[[98,90],[258,90],[238,190],[78,190]], cx=168, cy=140;
    const путь=(пп)=>'M'+пп.map(([x,y])=>x+' '+y).join(' L')+' Z';
    return ЛИСТ(s) +
      ЗАДАЧА('Для ловушки нужен косой парус, который выглядит одинаково, как его ни переверни «вверх ногами», но у которого <b>нет ни одной оси</b> — тогда римляне не поймут, куда плывёт лодка. Какая фигура подойдёт?') +
      `<div class="pic">${свг(`
        ${гавань(Н,false)}
        ${доска(14,40,308,Н-84)}
        <path d="${путь(P)}" fill="#e8dcc0" stroke="#6a5a40" stroke-width="2" filter="url(#c381-тень)"/>
        ${[0,1,2,3].map(i=>`<line x1="${98+i*40-20*0}" y1="90" x2="${78+i*40}" y2="190" stroke="#c8b898" stroke-width="1"/>`).join('')}
        <g>${анК('opacity','0;0;0.9;0.9;0','6s','0;0.2;0.35;0.8;1')}
          <path d="${путь(P.map(([x,y])=>[2*cx-x,y]))}" fill="none" stroke="${RED}" stroke-width="2" stroke-dasharray="6 5"/></g>
        <g>${анК('opacity','0;0;0;0.9;0.9','6s','0;0.5;0.6;0.75;1')}
          <path d="${путь(P.map(([x,y])=>[2*cx-x,2*cy-y]))}" fill="none" stroke="${GREEN}" stroke-width="2.4" stroke-dasharray="6 5"/></g>
        <circle cx="${cx}" cy="${cy}" r="5" fill="${GOLD}"/>
        ${т(80,224,'отражение — мимо',12,RED,true)}${т(250,224,'поворот — совпал',12,GREEN,true)}
        ${подпись(168,Н-10, в===1?'параллелограмм: центр есть, осей нет':'проверь: отрази и поверни', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Равнобедренный треугольник','Параллелограмм (не прямоугольник и не ромб)','Квадрат'],1,в,'r381Отв9') +
      (в==null ? СКАЗ('Вопрос','Какая фигура: центр симметрии есть, осей нет?') : РАЗБОР(в===1, ['У равнобедренного треугольника есть ось, а центра нет — вверх ногами он другой.','Параллелограмм при повороте на 180° вокруг точки пересечения диагоналей совпадает с собой, а сгиб по любой линии не совмещает половинки: <b>центр есть, осей нет</b>.','У квадрата есть и центр, и целых 4 оси — римляне сразу поймут.'][в])) +
      (в===1 ? ПРАВИЛО('Ось и центр — <b>разные</b> свойства: у фигуры может быть одно без другого.') : '');
  }

  /* 10. Ловушка захлопнулась */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=290;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Полночь. Каллий, настоящий шпион, пытается подать римлянам сигнал фонарём — его хватают у стены: его якорь «не пережил» поворота на 180°. Цепь натянута ровно по оси между скалами. Римские лодки идут по фарватеру и одна за другой разбиваются. Архимед улыбается: «Симметрия — лучший часовой».'
        : 'Ловушка ещё не готова — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        ${гавань(Н)}
        <path d="M0 ${Н*0.72} Q168 ${Н*0.78} 336 ${Н*0.72}" fill="none" stroke="url(#c381-бронза)" stroke-width="4" stroke-dasharray="8 3">${анЛин('stroke-dashoffset','0;-22','1.2s')}</path>
        ${[60,276].map(x=>`<path d="M${x-22} ${Н*0.74} q-2 -18 10 -26 q12 -8 22 0 q12 8 10 26 z" fill="url(#c381-скала)" filter="url(#c381-тень)"/>`).join('')}
        <g>${анСдвиг('0 0;40 0;40 6','7s','0;0.8;1')}<g transform="translate(120 ${Н*0.68})" filter="url(#c381-тень)">
          <path d="M-26 0 q6 10 26 10 q20 0 26 -10 z" fill="#3a2016"/><line x1="0" y1="0" x2="0" y2="-26" stroke="#2a1606" stroke-width="2"/>
          <path d="M0 -24 q14 10 0 20 z" fill="#b03020"/></g></g>
        <g>${проявить('9s',0.1,0.2)}${подпись(168,30,'ось — зеркало, расстояния равны',GOLD,12)}</g>
        <g>${проявить('9s',0.3,0.4)}${подпись(168,58,'центр — поворот на 180°',GOLD,12)}</g>
        <g>${проявить('9s',0.5,0.6)}${подпись(168,Н-12,'ось и центр — разные свойства',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Осевая</b> симметрия — отражение: точки на одном перпендикуляре к оси, на равных расстояниях. <b>Центральная</b> — поворот на 180°: точки на одной прямой с центром, на равных расстояниях. У прямоугольника 2 оси, у квадрата 4, у правильного шестиугольника 6; у параллелограмма центр есть, а осей нет.') +
      ПРАВИЛО('<b>Сомневаешься — сложи или поверни.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Сколько осей симметрии у квадрата?', варианты:[{т:'4',ок:true},{т:'2',ок:false}], разбор:'Две через середины сторон и две по диагоналям.' },
    { вопрос:'Точка на 3 клетки левее оси. Где её отражение?', варианты:[{т:'на 6 клеток правее оси',ок:false},{т:'на 3 клетки правее оси',ок:true}], разбор:'Расстояние до оси то же.' },
    { вопрос:'Есть ли центр симметрии у равностороннего треугольника?', варианты:[{т:'нет',ок:true},{т:'да',ок:false}], разбор:'Вверх ногами он другой; совпадает только при повороте на 120°.' },
    { вопрос:'У какой буквы горизонтальная ось?', варианты:[{т:'Г',ок:false},{т:'В',ок:true}], разбор:'Верх и низ В совпадают при сгибе.' },
    { вопрос:'Центр O, точка A на 5 см правее. Где A′?', варианты:[{т:'на 5 см левее O',ок:true},{т:'на 10 см левее O',ок:false}], разбор:'OA′ = OA.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r381Reset()")}</div>` +
        ПРАВИЛО('<b>Ось — зеркало, центр — поворот на 180°.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r381Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Оси', задания:[
    {q:'Сколько осей у равнобедренного треугольника?', в:1, варианты:['3','1'], раз:'Только через вершину и середину основания.'},
    {q:'Сколько осей у круга?', в:0, варианты:['бесконечно много','2'], раз:'Любая прямая через центр.'},
    {q:'Сколько осей у буквы Н?', в:1, варианты:['1','2'], раз:'Вертикальная и горизонтальная.'},
    {q:'Сколько осей у равностороннего треугольника?', в:0, варианты:['3','1'], раз:'Через каждую вершину.'}
  ]};
  const Т2 = { имя:'Центр', задания:[
    {q:'Есть ли центр симметрии у отрезка?', в:0, варианты:['да, его середина','нет'], раз:'Поворот на 180° вокруг середины.'},
    {q:'Есть ли центр симметрии у буквы И?', в:1, варианты:['нет','да'], раз:'Вверх ногами И остаётся И.'},
    {q:'Центральная симметрия — это поворот на…', в:0, варианты:['180°','90°'], раз:'Пол-оборота.'},
    {q:'Есть ли центр у равнобедренной трапеции?', в:1, варианты:['да','нет'], раз:'Вверх ногами широкое основание окажется сверху.'}
  ]};
  const Т3 = { имя:'Координаты и зеркала', задания:[
    {q:'Точка (3; 2). Симметричная относительно оси y?', в:1, варианты:['(3; −2)','(−3; 2)'], раз:'Меняется знак первой координаты.'},
    {q:'Точка (3; 2). Симметричная относительно начала координат?', в:0, варианты:['(−3; −2)','(−3; 2)'], раз:'Меняются оба знака.'},
    {q:'В зеркале часы без цифр показывают 3:00. Сколько на самом деле?', в:1, варианты:['3:00','9:00'], раз:'Зеркало меняет правое и левое.'},
    {q:'Точка (−1; 4). Симметричная относительно оси x?', в:0, варианты:['(−1; −4)','(1; 4)'], раз:'Меняется знак второй координаты.'}
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
        в, "r381T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r381TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L381 = {
    id: ID,
    title: 'Осевая и центральная симметрия',
    ico: '🦋',
    src: 'Математика · 5–6 класс · Симметрия',
    subj: 'math',
    explain: [
      'Осада: среди трёх гонцов — римский шпион, Архимед готовит ловушку с цепью. Осевая симметрия — отражение относительно прямой, центральная — поворот на 180° вокруг точки.',
      'Точка, симметричная относительно оси, лежит на том же перпендикуляре к оси и на том же расстоянии от неё.',
      'Карту скал восстанавливают отражением: каждую скалу переносят на ту же строку и то же расстояние по другую сторону оси.',
      'У прямоугольника, который не квадрат, две оси — через середины противоположных сторон; диагонали не оси.',
      'Зеркало меняет левое и правое. Не меняются буквы с вертикальной осью: П, О, Н.',
      'При центральной симметрии точка и её образ лежат на одной прямой с центром и на равных расстояниях от него.',
      'Фигура имеет центр симметрии, если совпадает сама с собой при повороте на 180°. Молния и пара дельфинов — да, якорь — нет: у него только ось.',
      'У правильного шестиугольника 6 осей: 3 через вершины и 3 через середины сторон.',
      'У параллелограмма есть центр симметрии, но нет осей: ось и центр — разные свойства.',
      'Итог: ось — зеркало, центр — поворот на 180°; оси у фигур и центр симметрии.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: оси.',
      'Тренажёр 2: центр.',
      'Тренажёр 3: координаты и зеркала.'
    ],
    check: {
      q: 'При центральной симметрии фигура поворачивается на…',
      choices: ['90°','180°','360°','45°'],
      ans: 1,
      exp: 'Центральная симметрия — поворот на 180°.'
    },
    tasks: [
      { q:'Сколько осей симметрии у прямоугольника, который не является квадратом?', kind:'unit', ans:2, tol:0,
        hints:['Через середины противоположных сторон.','Диагонали — не оси.'], sol:'2' },
      { q:'Какая буква имеет горизонтальную ось симметрии?', kind:'choice', choices:['Р','В','Г','Я'], ans:1,
        hints:['Сложи букву пополам по горизонтали.','У В верх и низ совпадают.'], sol:'В' },
      { q:'Сколько осей симметрии у правильного шестиугольника?', kind:'unit', ans:6, tol:0,
        hints:['Через противоположные вершины — 3.','И через середины сторон — ещё 3.'], sol:'6' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L381.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Шпион в гавани',2:'Башня за молом',3:'Карта скал',4:'Блок для цепи',5:'Зеркальное письмо',
      6:'Лодки и маяк',7:'Щиты гонцов',8:'Шестиугольная башня',9:'Косой парус',10:'Ловушка захлопнулась',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l381" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Симметрия'}</h2>${сцена}</div>`;
    s.играть7 = false;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r381Отв2=(к)=>{ S().ответ2=к; chRender(0); };
  window.r381Клетка=(к,р)=>{ const s=S(); const набор=new Set(s.карта3||[]), ключ=к+','+р;
    if(набор.has(ключ)) набор.delete(ключ); else набор.add(ключ);
    s.карта3=[...набор];
    if(НУЖНО.every(x=>набор.has(x)) && набор.size===НУЖНО.length) s.дело_карта=true;
    chRender(0); };
  window.r381Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r381Зеркало=(в)=>{ S().зеркало5=!!в; chRender(0); };
  window.r381Отв5=(к)=>{ const s=S(); s.ответ5=к; if(к===1) s.дело_письмо=true; chRender(0); };
  window.r381Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r381Щиты=(в)=>{ const s=S(); const было=!!s.пов7; s.пов7=!!в; s.играть7 = !было && !!в; chRender(0); };
  window.r381Отв7=(к)=>{ const s=S(); s.ответ7=к; if(к===1) s.дело_шпион=true; chRender(0); };
  window.r381Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r381Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r381Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r381Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r381T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r381TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L381; else arr.push(L381); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA381={render:render, L:L381};
})();
