/* ====== ИНФОРМАТИКА · УРОК 536 · «И, ИЛИ, НЕ: ВОДЯНАЯ МАШИНА АРХИМЕДА» =====================
   5–6 класс, курс «С нуля» (500–535) — следующая тема. В курсе уже есть биты,
   двоичные числа, условия и устройство компьютера, но нет главного моста между
   ними: как из выключателей получается машина, которая решает и считает.

   ГЛАВНАЯ МЫСЛЬ. Кран — это бит. Краны друг за другом — И, рядом — ИЛИ,
   поплавок — НЕ. Каждый новый кран удваивает число положений. Из И, ИЛИ, НЕ
   собирают любое правило — и даже сумматор: 1 + 1 = 10. Процессор сделан из
   тех же «кранов», только электрических: транзисторов.

   СЮЖЕТ. Сиракузы в осаде. Архимед строит в башне машину, которая «думает
   водой»: поднимает решётку ворот своим, бьёт в гонг, когда дозорный увидел
   врага, глушит фонтан на площади, сторожит казну — и складывает камешки.

   РУКАМИ: краны на рисунке и переключатели под ним. Вода бежит по трубам
   только туда, куда её пускают открытые краны; журнал испытаний сам
   заполняется строками, которые ученик проверил.

   ВСЕ ОТВЕТЫ ПРОВЕРЕНЫ:
     у крана 2 положения; A И B = 1 только в строке 11;
     A ИЛИ B = 1 в трёх строках из четырёх (01, 10, 11); НЕ 1 = 0;
     3 крана → 2·2·2 = 8 строк; ворота = A И НЕ B: при A = 1, B = 1 → 0;
     1 ИЛИ 1 = 1; сумматор 1 + 1 → двойки 1, единицы 0 → 10₂ = 2;
     замок A И B И НЕ C открывает одно положение из восьми (110). */
(function(){
  'use strict';

  const ID = 536;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЯНТАРЬ='#f0b050';
  const ИНК='#f2f5f8', МУТ='#aab6c6', ЛИНИЯ='#46566e';
  const ВОДА='#5cc8ff', ВОДАС='#e4f8ff';

  const ДЕТАЛИ = [
    {ключ:'и',   знак:'И',    имя:'ворота'},
    {ключ:'или', знак:'ИЛИ',  имя:'гонг'},
    {ключ:'не',  знак:'НЕ',   имя:'фонтан'},
    {ключ:'сум', знак:'1+1',  имя:'сумматор'}
  ];
  const сделано = (s,к) => !!s['деталь_'+к];

  const CSS=`
  #lvis .s6.l536{gap:14px}
  #lvis .s6.l536 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l536 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l536 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1c2636,#121926);border:1.5px solid var(--line)}
  #lvis .s6.l536 .карт.задача{border-color:${ВОДА}}
  #lvis .s6.l536 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l536 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l536 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l536 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l536 .карт .текст b{color:${GOLD}}
  #lvis .s6.l536 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l536 .правило b{color:${GOLD}}
  #lvis .s6.l536 .чертёж{width:100%;padding:12px 12px 10px;border-radius:16px;border:1.5px solid #4f86c0;
    background-color:#0e2a48;
    background-image:linear-gradient(rgba(140,190,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(140,190,255,.09) 1px,transparent 1px);
    background-size:14px 14px;display:flex;flex-direction:column;gap:8px}
  #lvis .s6.l536 .чертёж .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#a8c8ec}
  #lvis .s6.l536 .чертёж .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#dcecff}
  #lvis .s6.l536 .чертёж .шапка b.готово{color:${GREEN}}
  #lvis .s6.l536 .чертёж .узлы{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
  #lvis .s6.l536 .чертёж .узел{border:1.5px dashed rgba(168,200,236,.35);border-radius:10px;padding:6px 2px;
    display:flex;flex-direction:column;align-items:center;gap:2px;color:rgba(168,200,236,.55)}
  #lvis .s6.l536 .чертёж .узел b{font-size:18px;font-family:Georgia,serif;line-height:1.1}
  #lvis .s6.l536 .чертёж .узел span{font-size:12px}
  #lvis .s6.l536 .чертёж .узел.есть{border-style:solid;border-color:#dcecff;color:#fff;background:rgba(220,236,255,.1)}
  #lvis .s6.l536 .чертёж .узел.есть span{color:${GREEN}}
  #lvis .s6.l536 .пульт{display:grid;gap:8px;width:100%}
  #lvis .s6.l536 .пульт button{min-height:58px;border-radius:14px;cursor:pointer;font:inherit;padding:6px 4px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
    border:1.5px solid rgba(255,138,120,.55);background:rgba(255,138,120,.1);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms cubic-bezier(.23,1,.32,1),border-color 160ms}
  #lvis .s6.l536 .пульт button b{font-size:17px}
  #lvis .s6.l536 .пульт button span{font-size:14px;color:${RED};font-variant-numeric:tabular-nums}
  #lvis .s6.l536 .пульт button.вкл{border-color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l536 .пульт button.вкл span{color:${GREEN}}
  #lvis .s6.l536 .пульт button:active{transform:translateY(2px)}
  #lvis .s6.l536 .журнал{width:100%;border-radius:14px;padding:10px 12px;background:#231c14;border:1.5px solid #8a6434}
  #lvis .s6.l536 .журнал .шапка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#d8b888;
    display:flex;justify-content:space-between}
  #lvis .s6.l536 .журнал table{width:100%;border-collapse:separate;border-spacing:0 4px;font-variant-numeric:tabular-nums}
  #lvis .s6.l536 .журнал th{font-size:14px;color:#c8a878;font-weight:600;padding:2px 0}
  #lvis .s6.l536 .журнал td{text-align:center;font-size:19px;font-family:Georgia,serif;padding:4px 0;color:#f3e6cc;
    background:rgba(255,240,210,.05)}
  #lvis .s6.l536 .журнал td.вых{font-weight:700}
  #lvis .s6.l536 .журнал td.один{color:${GREEN}}
  #lvis .s6.l536 .журнал td.ноль{color:#e8a090}
  #lvis .s6.l536 .журнал td.нет{color:rgba(243,230,204,.3)}
  #lvis .s6.l536 .журнал tr.сейчас td{background:rgba(92,200,255,.16)}
  #lvis .s6.l536 .журнал tr td:first-child{border-radius:8px 0 0 8px}
  #lvis .s6.l536 .журнал tr td:last-child{border-radius:0 8px 8px 0}
  #lvis .s6.l536 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l536 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l536 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l536 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l536 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l536 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l536 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l536 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l536 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l536 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l536 .уровни .точка.сейчас{background:${ВОДА};animation:l536dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l536dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l536 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l536{-webkit-text-size-adjust:100%}
  #lvis .s6.l536 [data-anim]{animation:l536rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l536rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l536 [data-anim]{animation:none!important}
    #lvis .s6.l536 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l536 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l536-style');
      if(!s){ s=document.createElement('style'); s.id='l536-style'; document.head.appendChild(s); }
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
  const BTN = (i,cls,html,on) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" onclick="${on}">${html}</button>`;
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Водяная машина</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,f) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r536Отв('+f+','+к+')')).join('')}</div>`;
  const ЧЕРТЁЖ = (s) => {
    const n = ДЕТАЛИ.filter(д=>сделано(s,д.ключ)).length;
    return A(0,'чертёж',
      `<div class="шапка"><span>Чертёж машины</span><b class="${n===4?'готово':''}">${n===4?'машина собрана':n+' из 4 деталей'}</b></div>
       <div class="узлы">${ДЕТАЛИ.map(д=>`<div class="узел ${сделано(s,д.ключ)?'есть':''}"><b>${д.знак}</b><span>${сделано(s,д.ключ)?'✓ '+д.имя:д.имя}</span></div>`).join('')}</div>`);
  };
  /* переключатели под рисунком */
  const ПУЛЬТ = (f,краны,сост,подписи) =>
    `<div class="пульт" style="grid-template-columns:repeat(${краны.length},1fr)">${краны.map((б,i)=>
      BTN(3+i, сост[б]?'вкл':'', `<b>Кран ${б}${подписи&&подписи[i]?' · '+подписи[i]:''}</b><span>${сост[б]?'открыт · 1':'закрыт · 0'}</span>`,
        "r536Кран("+f+",'"+б+"')")).join('')}</div>`;
  /* журнал испытаний: строки — все положения, выход виден в испытанных */
  const ЖУРНАЛ = (имена,имяВых,вых,испытано,сейчас) => {
    const n=имена.length, строки=[];
    for(let k=0;k<(1<<n);k++){ строки.push(Array.from({length:n},(_,i)=>(k>>(n-1-i))&1)); }
    const ключ=(р)=>р.join('');
    const всего=строки.filter(р=>испытано[ключ(р)]).length;
    return A(12,'журнал',
      `<div class="шапка"><span>Журнал испытаний</span><span>${всего} из ${строки.length}</span></div>
       <table><tr>${имена.map(и=>`<th>${и}</th>`).join('')}<th>${имяВых}</th></tr>${строки.map(р=>{
         const есть=!!испытано[ключ(р)], v=вых(р);
         return `<tr class="${ключ(р)===сейчас?'сейчас':''}">${р.map(b=>`<td>${b}</td>`).join('')}<td class="вых ${есть?(v?'один':'ноль'):'нет'}">${есть?v:'?'}</td></tr>`;
       }).join('')}</table>`);
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
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.45;0.45;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const вырасти = (длит,доля) => анК('opacity','0.15;0.15;1;1',длит,'0;'+кт(доля)+';'+кт(доля+0.06)+';1');
  /* один раз: сдвиг из «было» в «стало» */
  const сдвигРаз = (из,в,длит,задержка) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" from="${из}" to="${в}" dur="${длит}" begin="${задержка||0}s"
       fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c536-стена" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1e2838"/><stop offset="1" stop-color="#101722"/>
      </linearGradient>
      <radialGradient id="c536-бронза" cx="0.35" cy="0.32" r="0.75">
        <stop offset="0" stop-color="#ffe6a8"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </radialGradient>
      <linearGradient id="c536-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d8a860"/><stop offset="0.5" stop-color="#9a6a30"/><stop offset="1" stop-color="#5a3a14"/>
      </linearGradient>
      <linearGradient id="c536-вода" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fe0ff"/><stop offset="1" stop-color="#1f6fb8"/>
      </linearGradient>
      <linearGradient id="c536-снаружи" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4c890"/><stop offset="0.55" stop-color="#e0a060"/><stop offset="0.56" stop-color="#8a7050"/><stop offset="1" stop-color="#5a4830"/>
      </linearGradient>
      <radialGradient id="c536-гонг" cx="0.38" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff0b8"/><stop offset="0.35" stop-color="#e0a840"/><stop offset="0.8" stop-color="#8a5a18"/><stop offset="1" stop-color="#4a2e08"/>
      </radialGradient>
      <radialGradient id="c536-сияние" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffe7a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffb040" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c536-голубое" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#8fe0ff" stop-opacity=".45"/><stop offset="1" stop-color="#5cc8ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c536-монета" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff4c0"/><stop offset="0.5" stop-color="#e0b040"/><stop offset="1" stop-color="#7a5410"/>
      </radialGradient>
      <linearGradient id="c536-чип" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3a4658"/><stop offset="1" stop-color="#1a2230"/>
      </linearGradient>
      <clipPath id="c536-проём"><path d="M232 290 V190 A40 40 0 0 1 312 190 V290 Z"/></clipPath>
      <filter id="c536-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".55"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  /* стена башни: камень с кладкой */
  const башня = (Н) => {
    let шов='';
    for(let y=26,р=0; y<Н; y+=26,р++){
      шов+=`M0 ${y} H336 `;
      for(let x=(р%2?0:28); x<336; x+=56) шов+=`M${x} ${y-26} V${y} `;
    }
    return `<rect x="0" y="0" width="336" height="${Н}" fill="url(#c536-стена)"/>
      <path d="${шов}" stroke="rgba(255,255,255,.045)" stroke-width="1" fill="none" data-декор="1"/>`;
  };
  const пол = (Н,в) => `<g><rect x="0" y="${Н-в}" width="336" height="${в}" fill="#1a130c"/>
      <line x1="0" y1="${Н-в}" x2="336" y2="${Н-в}" stroke="#4a3620" stroke-width="2"/></g>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||13, ш=String(текст).length*к*0.62+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c536-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(8,12,18,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* значок крана «A = 1» */
  const знак = (x,y,буква,бит) => подпись(x,y+8,буква+' = '+бит, бит?GREEN:RED, 13);
  /* бак с водой */
  const бак = (x,y,ш,в) => `<g filter="url(#c536-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="5" fill="#2a2e38" stroke="#6a7384" stroke-width="2"/>
      <rect x="${x+4}" y="${y+10}" width="${ш-8}" height="${в-14}" rx="3" fill="url(#c536-вода)"/>
      <path d="M${x+4} ${y+12} q${(ш-8)/4} -4 ${(ш-8)/2} 0 t${(ш-8)/2} 0" fill="none" stroke="${ВОДАС}" stroke-width="1.4" opacity=".8">
        ${анСдвигЛин('0 0;0 1.5;0 0','2.4s')}</path>
      ${т(x+ш/2,y+в-8,'бак',11,'#e8f6ff',true,undefined,'#1f6fb8')}</g>`;
  function анСдвигЛин(знач,длит){ return ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="${знач}" dur="${длит}" repeatCount="indefinite"/>${ЗАВОД}`:''; }

  /* трубы: корпус из бронзы, внутри — вода. Новая вода бежит от бака к выходу
     один раз; трубы, где вода уже была, не мигают заново. */
  function трубы(s,f,список,волна){
    const было = s['мок'+f]||{}, теперь={};
    const новые = список.filter(р=>р.мок && !было[р.id]);
    const мин = новые.length ? Math.min.apply(null,новые.map(р=>р.пор)) : 0;
    const ст = 'fill="none" stroke-linejoin="round" stroke-linecap="round"';
    let корпус='', вода='';
    список.forEach(р=>{
      корпус += `<path d="${р.d}" ${ст} stroke="#2a1a0a" stroke-width="15"/>`+
                `<path d="${р.d}" ${ст} stroke="#a06c34" stroke-width="11.5"/>`+
                `<path d="${р.d}" ${ст} stroke="#1a120a" stroke-width="6.5"/>`;
      if(!р.мок) return;
      теперь[р.id]=1;
      const нов = волна && ДВИЖ && !было[р.id];
      const зад = нов ? (р.пор-мин)*0.3 : 0;
      вода += `<path d="${р.d}" ${ст} stroke="${ВОДА}" stroke-width="6.5"${нов?' pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"':''}>${
        нов?`<animate attributeName="stroke-dashoffset" from="1" to="0" dur="0.3s" begin="${зад.toFixed(2)}s" fill="freeze"/>`:''}</path>`;
      if(ДВИЖ) вода += `<path d="${р.d}" fill="none" stroke="${ВОДАС}" stroke-width="1.8" stroke-dasharray="3 11"${нов?' opacity="0"':''}>${
        нов?`<set attributeName="opacity" to="1" begin="${(зад+0.3).toFixed(2)}s" fill="freeze"/>`:''}<animate attributeName="stroke-dashoffset" values="14;0" dur="0.6s" repeatCount="indefinite"/></path>`;
    });
    s['мок'+f]=теперь;
    return корпус+вода;
  }
  /* кран: ручка вдоль трубы — открыт, поперёк — закрыт */
  function кран(x,y,буква,открыт,f,вертик,повернул,звать){
    const уг = открыт ? (вертик?90:0) : (вертик?0:90);
    const было = открыт ? (вертик?0:90) : (вертик?90:0);
    const поворот = повернул && ДВИЖ ?
      `<animateTransform attributeName="transform" type="rotate" from="${было}" to="${уг}" dur="0.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';
    const обр = f ? `onclick="r536Кран(${f},'${буква}')" style="cursor:pointer"` : '';
    return `<g ${обр}>
      ${f?`<circle cx="${x}" cy="${y}" r="26" fill="transparent"/>`:''}
      ${звать&&ДВИЖ?`<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="${GOLD}" stroke-width="2">${анЛин('r','18;28;18','1.6s')}${анЛин('opacity','0.9;0;0.9','1.6s')}</circle>`:''}
      <circle cx="${x}" cy="${y}" r="17" fill="rgba(8,12,18,.6)" stroke="${открыт?GREEN:RED}" stroke-width="2.4"/>
      <circle cx="${x}" cy="${y}" r="12" fill="url(#c536-бронза)" stroke="#4a2a08"/>
      <g transform="translate(${x} ${y})"><g transform="rotate(${уг})">${поворот}
        <rect x="-18" y="-3.5" width="36" height="7" rx="3.5" fill="#d0503a" stroke="#5a1a10"/>
        <circle cx="-18" cy="0" r="4.5" fill="#e8765a"/><circle cx="18" cy="0" r="4.5" fill="#e8765a"/></g></g>
      <circle cx="${x}" cy="${y}" r="3.5" fill="#ffe7a8"/>
    </g>`;
  }
  /* водяное колесо на каменной полке */
  function колесо(x,y,r,крутится){
    const лопасти = Array.from({length:8},(_,k)=>{
      const a=k*Math.PI/4;
      return `<line x1="${x}" y1="${y}" x2="${(x+(r-3)*Math.cos(a)).toFixed(1)}" y2="${(y+(r-3)*Math.sin(a)).toFixed(1)}" stroke="#8a5a2a" stroke-width="2.6"/>
        <rect x="-5" y="${-r-3}" width="10" height="12" rx="1.5" fill="#c98f3e" stroke="#5a3a10" stroke-width=".8" transform="translate(${x} ${y}) rotate(${k*45+22.5})"/>`;
    }).join('');
    return `<g filter="url(#c536-тень)">
      <line x1="${x}" y1="${y}" x2="${x-r*0.75}" y2="${y+r+10}" stroke="#5a4a38" stroke-width="5"/>
      <line x1="${x}" y1="${y}" x2="${x+r*0.75}" y2="${y+r+10}" stroke="#5a4a38" stroke-width="5"/>
      <rect x="${x-r-6}" y="${y+r+8}" width="${2*r+12}" height="8" rx="2" fill="#4a4a52"/>
      ${крутится?`<circle cx="${x}" cy="${y}" r="${r+14}" fill="url(#c536-голубое)" data-декор="1"/>`:''}
      <g>${крутится&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="360 ${x} ${y}" dur="2.4s" repeatCount="indefinite"/>`:''}
        <circle cx="${x}" cy="${y}" r="${r-3}" fill="none" stroke="#b07a3a" stroke-width="3.5"/>${лопасти}</g>
      <circle cx="${x}" cy="${y}" r="6" fill="url(#c536-бронза)" stroke="#4a2a08"/></g>`;
  }
  /* струйка из конца трубы */
  const струя = (x,y1,y2,есть) => есть ? `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${ВОДА}" stroke-width="4" stroke-linecap="round"/>
    ${ДВИЖ?`<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${ВОДАС}" stroke-width="1.4" stroke-dasharray="2 5">${анЛин('stroke-dashoffset','7;0','0.4s')}</line>`:''}` : '';

  /* ворота: стена с аркой, решётка на верёвке; открыты — решётка поднята */
  function ворота(открыты,анимировать){
    const сдв = открыты ? -100 : 0, было = открыты ? 0 : -100;
    let клад='';
    for(let y=46; y<290; y+=24) клад+=`M222 ${y} H336 `;
    const прутья = [240,252,264,276,288,300].map(x=>`<line x1="${x}" y1="150" x2="${x}" y2="296" stroke="#2a2a30" stroke-width="4"/><path d="M${x-3} 294 l3 8 l3 -8 z" fill="#2a2a30"/>`).join('')+
      [172,212,252].map(y=>`<line x1="234" y1="${y}" x2="310" y2="${y}" stroke="#2a2a30" stroke-width="3.5"/>`).join('');
    const анРеш = анимировать ? сдвигРаз('0 '+было,'0 '+сдв,'0.9s',0.5) : '';
    return `<g>
      <rect x="222" y="22" width="114" height="268" fill="#3c404c"/>
      <path d="${клад}" stroke="rgba(0,0,0,.28)" stroke-width="1.2" fill="none" data-декор="1"/>
      <path d="M232 290 V190 A40 40 0 0 1 312 190 V290 Z" fill="url(#c536-снаружи)"/>
      ${открыты?`<circle cx="272" cy="230" r="46" fill="url(#c536-сияние)" data-декор="1"/>`:''}
      <g clip-path="url(#c536-проём)"><g transform="translate(0 ${сдв})">${анРеш}${прутья}</g></g>
      <path d="M232 290 V190 A40 40 0 0 1 312 190 V290" fill="none" stroke="#6a6e7a" stroke-width="3"/>
      <line x1="272" y1="47" x2="272" y2="${150+сдв}" stroke="#c8b48a" stroke-width="2">${анимировать&&ДВИЖ?`<animate attributeName="y2" from="${150+было}" to="${150+сдв}" dur="0.9s" begin="0.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>`:''}</line>
      <circle cx="272" cy="40" r="8" fill="url(#c536-бронза)" stroke="#4a2a08"/></g>`;
  }
  /* гонг на раме и молот от колеса */
  function гонг(x,y,r,бьёт){
    const тряска = бьёт&&ДВИЖ ? `<animateTransform attributeName="transform" type="rotate" values="0 ${x} ${y-r-12};-5 ${x} ${y-r-12};4 ${x} ${y-r-12};0 ${x} ${y-r-12}" dur="0.5s" repeatCount="indefinite"/>` : '';
    return `<g filter="url(#c536-тень)">
      <line x1="${x-r-12}" y1="${y-r-18}" x2="${x-r-12}" y2="${y+r+16}" stroke="#5a4a38" stroke-width="5"/>
      <line x1="${x+r+12}" y1="${y-r-18}" x2="${x+r+12}" y2="${y+r+16}" stroke="#5a4a38" stroke-width="5"/>
      <line x1="${x-r-16}" y1="${y-r-18}" x2="${x+r+16}" y2="${y-r-18}" stroke="#6a5842" stroke-width="6"/>
      <g>${тряска}
        <line x1="${x-8}" y1="${y-r-16}" x2="${x-6}" y2="${y-r+2}" stroke="#c8b48a" stroke-width="1.6"/>
        <line x1="${x+8}" y1="${y-r-16}" x2="${x+6}" y2="${y-r+2}" stroke="#c8b48a" stroke-width="1.6"/>
        <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c536-гонг)" stroke="#4a2e08" stroke-width="1.5"/>
        <circle cx="${x}" cy="${y}" r="${r*0.62}" fill="none" stroke="rgba(90,50,10,.55)" stroke-width="1.4"/>
        <circle cx="${x}" cy="${y}" r="${r*0.3}" fill="rgba(255,240,190,.35)"/></g>
      ${бьёт?[0,1,2].map(k=>`<path d="M${x+r+18+k*8} ${y-12-k*5} q${8+k*2} ${12+k*5} 0 ${24+k*10}" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" opacity="${ДВИЖ?0:0.8}">${анК('opacity','0;0.9;0',(0.9).toFixed(1)+'s','0;0.3;1','begin="'+(k*0.15).toFixed(2)+'s"')}</path>`).join(''):''}
    </g>`;
  }

  /* ================= КАДРЫ ================= */
  const сост = (s,f,краны) => { const к='к'+f; if(!s[к]) s[к]={}; краны.forEach(б=>{ if(s[к][б]==null) s[к][б]=0; }); return s[к]; };
  const отметить = (s,f,код) => { const к='ж'+f; if(!s[к]) s[к]={}; s[к][код]=1; return s[к]; };
  const испытано = (s,f) => Object.keys(s['ж'+f]||{}).length;
  const звать = (s,f) => !s['тр'+f];

  /* 1. Кран — это бит */
  function F1(s,в){
    const Н=300, к=сост(s,1,['A']), a=к.A; отметить(s,1,''+a);
    const готов = испытано(s,1)>=2, отв=s.ответ1;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Сиракузы, 212 год до нашей эры. У стен римский флот. Архимед зовёт тебя в башню: «Стражники устают и путаются. Построим машину, которая <b>сама</b> решает — открывать ли ворота, бить ли тревогу. Думать она будет <b>водой</b>». Первая деталь — кран. Покрути его.') +
      `<div class="pic">${свг(`
        ${башня(Н)}${пол(Н,24)}
        ${бак(128,16,80,42)}
        ${трубы(s,1,[{id:'a',d:'M168 58 V130',мок:1,пор:0},{id:'b',d:'M168 130 V198',мок:a,пор:1}],в.волна)}
        ${струя(168,198,212,a)}
        ${колесо(168,240,32,a)}
        ${кран(168,130,'A',a,1,true,в.пов==='A',звать(s,1))}
        ${знак(96,130,'A',a)}
        ${подпись(262,244,'колесо: '+a,a?GREEN:RED,13)}
        ${т(96,166,a?'открыт':'закрыт',12,МУТ,true)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(1,['A'],к) +
      (!готов ? СКАЗ('Попробуй','Коснись крана на рисунке или переключателя под ним. Посмотри, что делает колесо.') :
        ОТВЕТЫ('',['3 положения: ещё «наполовину»','2 положения: открыт или закрыт','1 положение'],1,отв,1) +
        (отв==null ? СКАЗ('Вопрос','Сколько разных положений у крана в машине Архимеда?') :
          РАЗБОР(отв===1,['Наполовину открытый кран машину запутает: колесо то ли крутится, то ли нет. Архимед делает краны ровно с <b>двумя</b> положениями.',
            'Открыт или закрыт — ровно <b>два</b> положения. Как у бита: <b>1</b> или <b>0</b>.',
            'Ты сам видел два положения: вода идёт — колесо крутится, вода стоит — колесо стоит. Их <b>два</b>.'][отв]))) +
      (отв===1 ? ПРАВИЛО('Кран — это <b>бит</b>: открыт — <b>1</b>, закрыт — <b>0</b>. Колесо отвечает тоже битом: крутится — 1, стоит — 0.') : '');
  }

  /* 2. И: краны друг за другом */
  function F2(s,в){
    const Н=320, к=сост(s,2,['A','B']), a=к.A, b=к.B, вых=a&b, код=''+a+b; отметить(s,2,код);
    const было = s.вых2, анимировать = в.волна && было!=null && было!==вых; s.вых2=вых;
    const готов = испытано(s,2)>=4, отв=s.ответ2;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Ночью ворота открывают только своим. Ключи от двух кранов — у двух стражников, <b>A</b> и <b>B</b>. Краны стоят <b>друг за другом</b> на одной трубе. Испытай все положения: когда поднимается решётка?') +
      `<div class="pic">${свг(`
        ${башня(Н)}
        ${ворота(вых,анимировать)}
        ${пол(Н,30)}
        ${бак(12,34,56,58)}
        <line x1="204" y1="140" x2="266" y2="38" stroke="#c8b48a" stroke-width="2"/>
        ${трубы(s,2,[{id:'0',d:'M68 62 H104',мок:1,пор:0},{id:'1',d:'M104 62 H164',мок:a,пор:1},{id:'2',d:'M164 62 H196 V102',мок:a&&b,пор:2}],в.волна)}
        ${струя(196,102,114,вых)}
        ${колесо(196,146,32,вых)}
        ${кран(104,62,'A',a,2,false,в.пов==='A',звать(s,2))}${кран(164,62,'B',b,2,false,в.пов==='B',звать(s,2))}
        ${знак(96,24,'A',a)}${знак(172,24,'B',b)}
        ${т(100,104,'страж A',11,МУТ,true)}${т(166,104,'страж B',11,МУТ,true)}
        ${подпись(168,Н-8, вых?'решётка поднята: A = 1 и B = 1':'решётка опущена', вых?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(2,['A','B'],к) +
      ЖУРНАЛ(['A','B'],'ворота',р=>р[0]&р[1],s.ж2,код) +
      (!готов ? СКАЗ('Испытай','Переключай краны, пока в журнале не будут все четыре строки.') :
        ОТВЕТЫ('',['Когда открыт хотя бы один кран','Только когда открыты оба крана','Когда открыт кран A'],1,отв,2) +
        (отв==null ? СКАЗ('Вопрос','Посмотри в журнал. Когда поднимается решётка?') :
          РАЗБОР(отв===1,['Открой только A — вода упрётся в закрытый B, и колесо будет стоять. Одного крана мало: нужны <b>оба</b>.',
            'Вода проходит, только если открыты <b>оба</b> крана: A <b>и</b> B. Один стражник ворота не откроет — даже подкупленный.',
            'В журнале есть строка A = 1, B = 0 — решётка внизу. Одного A мало, нужны <b>оба</b>.'][отв]))) +
      (отв===1 ? ПРАВИЛО('<b>A И B</b> = 1, только когда A = 1 <b>и</b> B = 1. Краны друг за другом на одной трубе — это <b>И</b>.') : '');
  }

  /* рисунок тревоги: две трубы рядом (ИЛИ) */
  function сценаИЛИ(s,f,a,b,в,живой){
    const Н=320, вых=a|b;
    return `<div class="pic">${свг(`
        ${башня(Н)}${пол(Н,24)}
        ${бак(128,14,80,42)}
        ${трубы(s,f,[{id:'0',d:'M168 56 V84 H96 V140',мок:1,пор:0},{id:'1',d:'M168 84 H240 V140',мок:1,пор:0},
          {id:'a',d:'M96 140 V200 H130',мок:a,пор:1},{id:'b',d:'M240 140 V200 H130',мок:b,пор:1},{id:'o',d:'M130 200 V230',мок:вых,пор:2}],в.волна)}
        ${струя(130,230,238,вых)}
        ${колесо(130,264,26,вых)}
        <g>${вых&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 130 264;-14 130 264;0 130 264" dur="0.5s" repeatCount="indefinite"/>`:''}
          <line x1="130" y1="264" x2="200" y2="258" stroke="#6a4a22" stroke-width="4" stroke-linecap="round"/>
          <rect x="196" y="248" width="10" height="20" rx="2" fill="#8a5a2a" stroke="#3a2210"/></g>
        ${гонг(242,258,28,вых)}
        ${кран(96,140,'A',a,живой?f:0,true,в.пов==='A',живой&&звать(s,f))}${кран(240,140,'B',b,живой?f:0,true,в.пов==='B',живой&&звать(s,f))}
        ${знак(48,132,'A',a)}${знак(288,132,'B',b)}
        ${т(48,166,'у моря',11,МУТ,true)}${т(288,166,'у стены',11,МУТ,true)}
        ${подпись(168,Н-10, вых?'гонг бьёт: тревога!':'гонг молчит', вых?GOLD:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>`;
  }

  /* 3. ИЛИ: трубы рядом */
  function F3(s,в){
    const к=сост(s,3,['A','B']), a=к.A, b=к.B, код=''+a+b; отметить(s,3,код);
    const готов = испытано(s,3)>=4, отв=s.ответ3;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Два дозорных: <b>A</b> — у моря, <b>B</b> — у стены. Кто заметит врага, открывает свой кран. Их трубы идут <b>рядом</b> и сливаются в одну — у гонга. Испытай все положения: когда бьёт гонг?') +
      сценаИЛИ(s,3,a,b,в,true) +
      ПУЛЬТ(3,['A','B'],к) +
      ЖУРНАЛ(['A','B'],'гонг',р=>р[0]|р[1],s.ж3,код) +
      (!готов ? СКАЗ('Испытай','Переключай краны, пока в журнале не будут все четыре строки.') :
        ОТВЕТЫ('три',['1','3','2'],1,отв,3) +
        (отв==null ? СКАЗ('Вопрос','В скольких строках журнала из четырёх гонг бьёт?') :
          РАЗБОР(отв===1,['Одна строка — это если бы гонг бил, только когда открыты оба. Но вода находит дорогу через <b>любую</b> открытую трубу: 01, 10 и 11 — <b>три</b> строки.',
            'Гонг молчит только в строке 00. В остальных <b>трёх</b> вода проходит хотя бы по одной трубе.',
            'Ты пропустил строку 11? Когда открыты оба крана, вода течёт по двум трубам сразу — гонг, конечно, бьёт. Строк <b>три</b>.'][отв]))) +
      (отв===1 ? ПРАВИЛО('<b>A ИЛИ B</b> = 1, когда хотя бы один из них равен 1. Трубы рядом — это <b>ИЛИ</b>. Ноль бывает только при 0 и 0.') : '');
  }

  /* 4. НЕ: поплавок */
  function F4(s,в){
    const Н=320, к=сост(s,4,['A']), a=к.A, вых=a?0:1; отметить(s,4,''+a);
    const готов = испытано(s,4)>=2, отв=s.ответ4;
    const поплавок = a ? [250,131] : [264,166];
    const было = s.поп4, двинуть = в.волна && было!=null && было!==a; s.поп4=a;
    const изП = a ? [264,166] : [250,131];
    const фонтан = вых ? [-1,1].map(с=>`<path d="M250 222 q${с*26} -46 ${с*52} 58" fill="none" stroke="${ВОДА}" stroke-width="3.5" stroke-linecap="round"/>
        ${ДВИЖ?`<path d="M250 222 q${с*26} -46 ${с*52} 58" fill="none" stroke="${ВОДАС}" stroke-width="1.6" stroke-dasharray="3 9">${анЛин('stroke-dashoffset','12;0','0.5s')}</path>`:''}`).join('')+
        `<path d="M250 222 V196" stroke="${ВОДА}" stroke-width="3" stroke-linecap="round"/>
         <circle cx="250" cy="194" r="3" fill="${ВОДАС}">${анЛин('cy','196;186;196','0.8s')}</circle>` :
      `<circle cx="250" cy="226" r="2" fill="${ВОДА}" opacity=".7"/>`;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('На площади бьёт фонтан — знак горожанам: «всё спокойно». Если дозорный открывает кран <b>A</b>, вода из него поднимает <b>поплавок</b>, и поплавок затыкает трубу фонтана. Попробуй.') +
      `<div class="pic">${свг(`
        ${башня(Н)}${пол(Н,26)}
        ${бак(12,24,60,64)}
        ${трубы(s,4,[{id:'m',d:'M72 46 H250 V116',мок:1,пор:0},{id:'c0',d:'M42 88 V160 H120',мок:1,пор:0},
          {id:'c1',d:'M120 160 H222',мок:a,пор:1},{id:'o',d:'M250 180 V222',мок:вых,пор:1}],в.волна)}
        <g filter="url(#c536-тень)"><rect x="222" y="112" width="56" height="70" rx="6" fill="#1a2230" stroke="url(#c536-латунь)" stroke-width="4"/></g>
        ${a?`<rect x="226" y="118" width="48" height="60" rx="3" fill="${ВОДА}" opacity=".55"/>`:`<line x1="250" y1="116" x2="250" y2="180" stroke="${ВОДА}" stroke-width="5"/>`}
        <g transform="translate(${поплавок[0]} ${поплавок[1]})">${двинуть?сдвигРаз(изП[0]+' '+изП[1],поплавок[0]+' '+поплавок[1],'0.6s',0.3):''}
          <circle cx="0" cy="0" r="12" fill="url(#c536-бронза)" stroke="#4a2a08"/><path d="M-7 -3 q7 -6 14 0" stroke="#fff4c8" stroke-width="1.6" fill="none" opacity=".7"/></g>
        ${т(214,142,'поплавок',11,МУТ,true,'end')}
        <g filter="url(#c536-тень)"><path d="M190 280 q60 26 120 0 v14 q-60 16 -120 0 z" fill="#8a8e98"/><ellipse cx="250" cy="280" rx="60" ry="9" fill="${вых?'#5cb8e8':'#3a4a5a'}"/></g>
        <rect x="244" y="222" width="12" height="58" fill="#8a8e98"/>
        ${фонтан}
        ${кран(120,160,'A',a,4,false,в.пов==='A',звать(s,4))}
        ${знак(120,196,'A',a)}${т(120,228,'дозорный',11,МУТ,true)}
        ${подпись(96,Н-10,'фонтан: '+вых,вых?GREEN:RED,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(4,['A'],к) +
      ЖУРНАЛ(['A'],'фонтан',р=>1-р[0],s.ж4,''+a) +
      (!готов ? СКАЗ('Попробуй','Открой и закрой кран A. Следи за поплавком.') :
        ОТВЕТЫ('пара',['бьёт — это 1','молчит — это 0'],1,отв,4) +
        (отв==null ? СКАЗ('Вопрос','Кран A открыт: A = 1. Что с фонтаном?') :
          РАЗБОР(отв===1,['Смотри на поплавок: вода из A подняла его, и он заткнул трубу. Фонтан <b>молчит</b>: A = 1 → фонтан 0.',
            'Поплавок <b>переворачивает</b> сигнал: A = 1 → фонтан 0, A = 0 → фонтан 1.'][отв]))) +
      (отв===1 ? ПРАВИЛО('<b>НЕ</b> переворачивает бит: НЕ 1 = 0, НЕ 0 = 1. В машине Архимеда НЕ — это <b>поплавок</b>.') : '');
  }

  /* 5. Сколько строк в журнале */
  function F5(s){
    const Н=300, отв=s.ответ5, видно = отв===1;
    const узел=(x,y,б,бит,поздн)=>`<g>${поздн?вырасти('7s',поздн):''}<rect x="${x-17}" y="${y-11}" width="34" height="22" rx="11" fill="${бит?'rgba(143,224,176,.25)':'rgba(255,138,120,.18)'}" stroke="${бит?GREEN:RED}" stroke-width="1.4"/>
      ${т(x,y+4,б+'='+бит,11,ИНК,true)}</g>`;
    const ребро=(x1,y1,x2,y2,пунктир)=>`<line x1="${x1}" y1="${y1+11}" x2="${x2}" y2="${y2-11}" stroke="${пунктир?'rgba(255,255,255,.25)':'#8aa0b8'}" stroke-width="1.6"${пунктир?' stroke-dasharray="4 4"':''}/>`;
    const L1=[84,252], L2=[42,126,210,294], L3=Array.from({length:8},(_,k)=>21+k*42);
    let т1='', т2='', т3='', листья='';
    L1.forEach((x,i)=>{ т1+=ребро(168,34,x,92)+узел(x,92,'A',i); });
    L2.forEach((x,i)=>{ т2+=ребро(L1[i>>1],92,x,156)+узел(x,156,'B',i&1); });
    L3.forEach((x,i)=>{
      const показ = видно || i<2;
      т3+=ребро(L2[i>>1],156,x,220,!показ)+(показ?узел(x,220,'C',i&1,видно?0.05+i*0.08:0):`<g>${т(x,225,'?',15,МУТ,true)}</g>`);
      if(видно) листья+=`<g>${вырасти('7s',0.1+i*0.08)}${т(x,250,(i>>2)+''+((i>>1)&1)+(i&1),11,GOLD,true)}</g>`;
    });
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Архимед хочет поставить на ворота <b>третий</b> кран, C. «Машину надо испытать во <b>всех</b> положениях — иначе римляне найдут дыру. Сколько строк будет в журнале?»') +
      `<div class="pic">${свг(`
        ${башня(Н)}
        <g filter="url(#c536-тень)"><rect x="140" y="22" width="56" height="24" rx="12" fill="#2a3446" stroke="${ВОДА}"/></g>${т(168,39,'начало',11,ВОДА,true)}
        ${т1}${т2}${т3}${листья}
        ${подпись(168,Н-10, видно?'1 кран — 2, 2 крана — 4, 3 крана — 8':'1 кран — 2 строки, 2 крана — 4, а 3?', видно?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['6','8','9'],1,отв,5) +
      (отв==null ? СКАЗ('Вопрос','Сколько строк в журнале для трёх кранов A, B и C?') :
        РАЗБОР(отв===1,['6 — это 2 + 2 + 2. Но положения кранов не складываются, а <b>умножаются</b>: каждую из 4 строк для A и B повторяем с C = 0 и с C = 1 — выходит <b>8</b>.',
          'Каждый новый кран <b>удваивает</b> журнал: 2 → 4 → 8. У каждого из 4 положений A и B два продолжения: C = 0 и C = 1.',
          '9 = 3 · 3 — так было бы у кранов с тремя положениями. Но их два: 2 · 2 · 2 = <b>8</b>.'][отв])) +
      (отв===1 ? ПРАВИЛО('Каждый кран <b>удваивает</b> число строк: 1 кран — 2, 2 — 4, 3 — 8, 4 — 16. Это те же биты: 3 бита дают 8 вариантов.') : '');
  }

  /* 6. И + НЕ: ворота для своих */
  function F6(s,в){
    const Н=320, к=сост(s,6,['A','B']), a=к.A, b=к.B, вых=a&(1-b), код=''+a+b; отметить(s,6,код);
    const было = s.вых6, анимировать = в.волна && было!=null && было!==вых; s.вых6=вых;
    if(вых) s.открыл6=true;
    const отв=s.ответ6;
    const пБыло = s.поп6, двинуть = в.волна && пБыло!=null && пБыло!==b; s.поп6=b;
    const поп = b ? 52 : 68;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Новый приказ царя Гиерона: «Гонцу с паролем ворота открывать. Но если бьёт тревога — <b>никому</b>!» Архимед соединил И с поплавком. Кран <b>A</b> открывают, если гонец назвал пароль. Кран <b>B</b> открывают при тревоге. Впусти гонца.') +
      `<div class="pic">${свг(`
        ${башня(Н)}
        ${ворота(вых,анимировать)}
        ${пол(Н,30)}
        ${бак(12,30,56,56)}
        <line x1="204" y1="140" x2="266" y2="38" stroke="#c8b48a" stroke-width="2"/>
        ${трубы(s,6,[{id:'0',d:'M68 50 H104',мок:1,пор:0},{id:'1',d:'M104 50 H140',мок:a,пор:1},{id:'2',d:'M180 50 H196 V102',мок:вых,пор:3},
          {id:'c0',d:'M40 86 V128 H100',мок:1,пор:0},{id:'c1',d:'M100 128 H160 V80',мок:b,пор:1}],в.волна)}
        <g filter="url(#c536-тень)"><rect x="140" y="28" width="40" height="52" rx="5" fill="#1a2230" stroke="url(#c536-латунь)" stroke-width="3.5"/></g>
        ${b?`<rect x="144" y="54" width="32" height="22" rx="2" fill="${ВОДА}" opacity=".55"/>`:''}
        ${a?`<line x1="140" y1="50" x2="${b?150:180}" y2="50" stroke="${ВОДА}" stroke-width="5"/>`:''}
        <g transform="translate(0 ${поп})">${двинуть?сдвигРаз('0 '+(b?68:52),'0 '+поп,'0.6s',0.3):''}<circle cx="160" cy="0" r="9" fill="url(#c536-бронза)" stroke="#4a2a08"/></g>
        ${струя(196,102,114,вых)}
        ${колесо(196,146,32,вых)}
        ${кран(104,50,'A',a,6,false,в.пов==='A',звать(s,6))}${кран(100,128,'B',b,6,false,в.пов==='B',звать(s,6))}
        ${знак(104,80,'A',a)}${знак(100,160,'B',b)}
        ${т(100,192,'тревога',11,МУТ,true)}
        ${подпись(168,Н-8, вых?'гонец входит: A = 1, B = 0':'ворота закрыты', вых?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(6,['A','B'],к,['пароль','тревога']) +
      ЖУРНАЛ(['A','B'],'ворота',р=>р[0]&(1-р[1]),s.ж6,код) +
      (!s.открыл6 ? СКАЗ('Задание','Найди положение кранов, при котором решётка поднимется.') :
        ОТВЕТЫ('',['Пройдёт: пароль-то верный','Не пройдёт: НЕ B = 0, а 1 И 0 = 0'],1,отв,6) +
        (отв==null ? СКАЗ('Вопрос','Пароль верный (A = 1), но бьёт тревога (B = 1). Гонец пройдёт?') :
          РАЗБОР(отв===1,['Открой оба крана: вода из B поднимает поплавок, и он перекрывает главную трубу. Ворота = A <b>И НЕ</b> B = 1 И 0 = <b>0</b>.',
            'При тревоге НЕ B = 0, а И с нулём даёт 0 — какой бы ни был пароль.'][отв]))) +
      (отв===1 ? ПРАВИЛО('Ворота = <b>A И НЕ B</b>. Из трёх деталей — И, ИЛИ, НЕ — можно собрать <b>любое</b> правило.') : '');
  }

  /* 7. Ловушка слова «или» */
  function F7(s,в){
    const отв=s.ответ7;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Утро. Римские корабли идут сразу с двух сторон — оба дозорных открыли краны. Молодой стражник спорит: «Гонг не должен бить! Правило ведь „A <b>или</b> B“, а тут и A, и B».') +
      сценаИЛИ(s,7,1,1,в,false) +
      ОТВЕТЫ('',['Стражник: «или» — только один из двух','Гонг: ИЛИ = 1, когда хотя бы один равен 1'],1,отв,7) +
      (отв==null ? СКАЗ('Вопрос','Кто прав?') :
        РАЗБОР(отв===1,['В разговоре «или» иногда значит «одно из двух». Но вода рассуждает проще: труба A открыта — значит, вода уже у гонга. ИЛИ даёт 1 и когда <b>оба</b> равны 1.',
          'Да: <b>1 ИЛИ 1 = 1</b>. Иначе город проспал бы нападение с двух сторон.'][отв])) +
      (отв===1 ? ПРАВИЛО('Логическое <b>ИЛИ</b> не запрещает «оба сразу». «Одно из двух, но не оба» — другая деталь. Она понадобится в сумматоре.') : '');
  }

  /* 8. Сумматор */
  function F8(s,в){
    const Н=340, к=сост(s,8,['A','B']), a=к.A, b=к.B, дв=a&b, ед=a^b, код=''+a+b; отметить(s,8,код);
    const готов = испытано(s,8)>=4, отв=s.ответ8;
    const уровень=(a+b);
    const табличка=(x,имя,бит)=>`<g filter="url(#c536-тень)"><rect x="${x-40}" y="252" width="80" height="56" rx="8" fill="${бит?'#3a3012':'#1e222c'}" stroke="${бит?GOLD:'#5a6070'}" stroke-width="2"/></g>
      ${бит?`<rect x="${x-40}" y="252" width="80" height="56" rx="8" fill="url(#c536-сияние)" data-декор="1"/>`:''}
      ${т(x,268,имя,11,МУТ,true)}${т(x,301,String(бит),28,бит?GOLD:'#6a7080',true)}`;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Самая хитрая деталь. Архимед: «Машина умеет отвечать „да“ и „нет“. Научим её <b>складывать</b>». Открытый кран — один камешек, закрытый — ноль. Левая табличка считает <b>двойки</b>, правая — <b>единицы</b>. Испытай все четыре сложения.') +
      `<div class="pic">${свг(`
        ${башня(Н)}${пол(Н,26)}
        ${бак(118,10,100,38)}
        ${трубы(s,8,[{id:'a0',d:'M140 48 V64 H84 V100',мок:1,пор:0},{id:'b0',d:'M196 48 V64 H252 V100',мок:1,пор:0},
          {id:'b2',d:'M252 154 H122 V170',мок:b,пор:2},{id:'a1',d:'M84 100 V170',мок:a,пор:1},{id:'a2',d:'M84 130 H214 V170',мок:a,пор:2},
          {id:'b1',d:'M252 100 V170',мок:b,пор:1},{id:'и',d:'M92 218 V252',мок:дв,пор:3},{id:'х',d:'M244 218 V252',мок:ед,пор:3}],в.волна)}
        <g filter="url(#c536-тень)"><rect x="44" y="168" width="96" height="52" rx="6" fill="#1a2230" stroke="url(#c536-латунь)" stroke-width="3.5"/>
          <rect x="196" y="168" width="96" height="52" rx="6" fill="#1a2230" stroke="url(#c536-латунь)" stroke-width="3.5"/></g>
        ${уровень?`<rect x="48" y="${216-уровень*11}" width="88" height="${уровень*11}" rx="2" fill="${ВОДА}" opacity=".5"/>`:''}
        ${ед||уровень===2?`<rect x="200" y="${216-уровень*11}" width="88" height="${уровень*11}" rx="2" fill="${ВОДА}" opacity=".5"/>`:''}
        ${т(92,199,'И',22,ИНК,true,undefined,'#1a2230')}
        ${т(244,190,'ИЛИ,',12,ИНК,true,undefined,'#1a2230')}${т(240,206,'но не оба',11,ИНК,true,undefined,'#1a2230')}
        ${уровень===2?`<circle cx="283" cy="209" r="6" fill="url(#c536-бронза)" stroke="#4a2a08"/>`:''}
        ${табличка(92,'двойки',дв)}${табличка(244,'единицы',ед)}
        ${т(168,288,'= '+(a+b),20,ИНК,true)}
        ${кран(84,100,'A',a,8,true,в.пов==='A',звать(s,8))}${кран(252,100,'B',b,8,true,в.пов==='B',звать(s,8))}
        ${знак(36,92,'A',a)}${знак(300,92,'B',b)}
        ${подпись(168,Н-10, a+' + '+b+' = '+дв+ед+' (это '+(a+b)+')', дв?GOLD:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(8,['A','B'],к) +
      ЖУРНАЛ(['A','B'],'сумма',р=>''+(р[0]&р[1])+(р[0]^р[1]),s.ж8,код) +
      (!готов ? СКАЗ('Испытай','Сложи 0 + 0, 0 + 1, 1 + 0 и 1 + 1 — все четыре строки журнала.') :
        ОТВЕТЫ('три',['11','10','02'],1,отв,8) +
        (отв==null ? СКАЗ('Вопрос','Открыты оба крана: 1 + 1. Что показывают таблички — двойки и единицы?') :
          РАЗБОР(отв===1,['11 — это три: двойка и ещё единица. А камешков два: единиц не остаётся (ИЛИ, но не оба = 0), а в двойки уходит 1 (A И B = 1). Таблички: <b>10</b>.',
            '<b>10</b> — это два в двоичной записи: одна двойка и ноль единиц. Как 9 + 1 = 10 в обычном счёте: разряд переполнился — единица ушла в соседний.',
            'В табличке машины помещается только бит: 0 или 1. Цифры 2 у воды нет — поэтому двойка уходит в соседнюю табличку: <b>10</b>.'][отв]))) +
      (отв===1 ? ПРАВИЛО('Сумматор: <b>единицы = A ИЛИ B, но не оба</b>, <b>двойки = A И B</b>. 1 + 1 = 10 — так складывает и процессор.') : '');
  }

  /* 9. Замок казны: три крана */
  function F9(s,в){
    const Н=320, к=сост(s,9,['A','B','C']), a=к.A, b=к.B, c=к.C, вых=a&b&(1-c), код=''+a+b+c; отметить(s,9,код);
    const было=s.вых9, анимировать = в.волна && было!=null && было!==вых; s.вых9=вых;
    if(вых) s.открыл9=true;
    const отв=s.ответ9, n=испытано(s,9);
    const пБыло=s.поп9, двинуть = в.волна && пБыло!=null && пБыло!==c; s.поп9=c;
    const поп = c ? 52 : 68;
    const дверь = `<g transform="translate(0 ${вых?96:0})">${анимировать?сдвигРаз('0 '+(вых?0:96),'0 '+(вых?96:0),'0.9s',0.6):''}
        <g filter="url(#c536-тень)"><circle cx="266" cy="206" r="50" fill="url(#c536-гонг)" stroke="#3a2408" stroke-width="3"/>
        <circle cx="266" cy="206" r="36" fill="none" stroke="rgba(60,34,6,.6)" stroke-width="2"/>
        ${[0,1,2,3,4,5].map(k=>`<line x1="266" y1="206" x2="${(266+30*Math.cos(k*Math.PI/3)).toFixed(1)}" y2="${(206+30*Math.sin(k*Math.PI/3)).toFixed(1)}" stroke="#6a4410" stroke-width="3"/>`).join('')}
        <circle cx="266" cy="206" r="9" fill="#ffe7a8" stroke="#6a4410"/></g></g>`;
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА('Казна Сиракуз. Архимед ставит на дверь замок из трёх кранов: дверь откроется только при <b>A И B И НЕ C</b>. Римский лазутчик правила не знает и крутит краны наугад. Открой дверь сам.') +
      `<div class="pic">${свг(`
        ${башня(Н)}
        <g filter="url(#c536-тень)"><circle cx="266" cy="206" r="54" fill="#0c0a08" stroke="#4a4a52" stroke-width="6"/></g>
        <circle cx="266" cy="206" r="46" fill="url(#c536-сияние)" data-декор="1"/>
        ${[[-18,14],[0,20],[18,14],[-9,-4],[9,-4],[0,-18]].map(([dx,dy])=>`<circle cx="${266+dx}" cy="${206+dy}" r="8" fill="url(#c536-монета)" stroke="#6a4a08" stroke-width=".8"/>`).join('')}
        ${дверь}${пол(Н,30)}
        ${бак(12,30,54,56)}
        ${трубы(s,9,[{id:'0',d:'M66 50 H92',мок:1,пор:0},{id:'1',d:'M92 50 H140',мок:a,пор:1},{id:'2',d:'M140 50 H176',мок:a&&b,пор:2},
          {id:'3',d:'M212 50 H250 V96',мок:вых,пор:4},{id:'c0',d:'M38 86 V124 H120',мок:1,пор:0},{id:'c1',d:'M120 124 H194 V80',мок:c,пор:1}],в.волна)}
        <g filter="url(#c536-тень)"><rect x="176" y="28" width="36" height="52" rx="5" fill="#1a2230" stroke="url(#c536-латунь)" stroke-width="3.5"/></g>
        ${c?`<rect x="180" y="54" width="28" height="22" rx="2" fill="${ВОДА}" opacity=".55"/>`:''}
        ${a&&b?`<line x1="176" y1="50" x2="${c?186:212}" y2="50" stroke="${ВОДА}" stroke-width="5"/>`:''}
        <g transform="translate(0 ${поп})">${двинуть?сдвигРаз('0 '+(c?68:52),'0 '+поп,'0.6s',0.3):''}<circle cx="194" cy="0" r="8" fill="url(#c536-бронза)" stroke="#4a2a08"/></g>
        ${струя(250,96,104,вых)}
        ${колесо(250,122,16,вых)}
        ${кран(92,50,'A',a,9,false,в.пов==='A',звать(s,9))}${кран(140,50,'B',b,9,false,в.пов==='B',звать(s,9))}${кран(120,124,'C',c,9,false,в.пов==='C',звать(s,9))}
        ${знак(92,82,'A',a)}${знак(148,82,'B',b)}${знак(120,158,'C',c)}
        ${подпись(120,Н-8, вых?'дверь открыта: 1, 1, 0':'испытано '+n+' из 8', вых?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ПУЛЬТ(9,['A','B','C'],к) +
      (!s.открыл9 ? СКАЗ('Задание','Правило: A И B И НЕ C. Поставь краны так, чтобы дверь отъехала.') :
        ОТВЕТЫ('три',['1','3','2'],0,отв,9) +
        (отв==null ? СКАЗ('Вопрос','Сколько положений из восьми открывают дверь?') :
          РАЗБОР(отв===0,['Только одно: A = 1, B = 1, C = 0. Лазутчику придётся перебирать до восьми положений — и часовой успеет его заметить.',
            '3 — это число кранов, а не положений. Правило требует A = 1, B = 1, C = 0 — это <b>одна</b> строка из восьми.',
            'Проверь: C должен быть закрыт, A и B — открыты. Другого варианта нет: подходит <b>одно</b> положение.'][отв]))) +
      (отв===0 ? ПРАВИЛО('Замок из 3 кранов — 8 положений, из 10 кранов — 1024. Нужное одно, поэтому <b>длинный</b> пароль из битов подобрать трудно.') : '');
  }

  /* 10. Машина собрана */
  function F10(s){
    const всё = ДЕТАЛИ.every(д=>сделано(s,д.ключ)), Н=300;
    const ножки = Array.from({length:6},(_,k)=>`<line x1="${214+k*16}" y1="62" x2="${214+k*16}" y2="72" stroke="#c0c8d4" stroke-width="3"/><line x1="${214+k*16}" y1="168" x2="${214+k*16}" y2="178" stroke="#c0c8d4" stroke-width="3"/>`).join('');
    let сетка=''; for(let i=0;i<8;i++) for(let j=0;j<8;j++) сетка+=`<rect x="${218+i*10}" y="${80+j*10}" width="6" height="6" rx="1" fill="${(i*3+j*5)%7<3?'#8fe0ff':'#3a4a60'}"/>`;
    const итоги=[['И — нужны оба',ВОДА],['ИЛИ — хватит одного',ВОДА],['НЕ — наоборот',ВОДА],['1 + 1 = 10',GOLD]];
    return ЧЕРТЁЖ(s) +
      ЗАДАЧА(всё
        ? 'Машина собрана. Всю осаду она поднимала решётку своим, била в гонг и глушила фонтан, а стражники больше не путались. Прошло две тысячи лет. Вместо воды по машинам побежал ток, вместо кранов встали <b>транзисторы</b>. В процессоре телефона их миллиарды — и каждый делает то же, что твой кран: 1 или 0.'
        : 'Машина ещё не собрана — вернись к деталям на чертеже. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${башня(Н)}
        ${кран(70,110,'A',1,0,false,false,false)}
        <path d="M20 110 H52 M88 110 H120" stroke="#a06c34" stroke-width="11" stroke-linecap="round"/>
        <path d="M20 110 H52 M88 110 H120" stroke="${ВОДА}" stroke-width="5" stroke-linecap="round"/>
        ${т(70,152,'кран',12,МУТ,true)}${т(70,168,'вода',11,МУТ,false)}
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;6 0;0 0" dur="1.6s" repeatCount="indefinite"/>${ЗАВОД}`:''}
          <path d="M136 120 H182 M174 112 l10 8 l-10 8" stroke="${GOLD}" stroke-width="3" fill="none" stroke-linecap="round"/></g>
        ${т(160,104,'2000 лет',11,GOLD,true)}
        <g filter="url(#c536-тень)"><rect x="206" y="70" width="98" height="100" rx="8" fill="url(#c536-чип)" stroke="#8a96a8" stroke-width="1.5"/></g>
        ${ножки}${сетка}
        ${т(255,196,'процессор',12,МУТ,true)}${т(255,212,'транзисторы',11,МУТ,false)}
        ${итоги.map(([t,ц],i)=>`<g>${проявить('10s',0.08+i*0.14,0.14+i*0.14)}${подпись(i%2?248:88,248+Math.floor(i/2)*32,t,ц,12)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Кран — это бит. Краны друг за другом — <b>И</b>: нужны оба. Трубы рядом — <b>ИЛИ</b>: хватит одного, и оба тоже годятся. Поплавок — <b>НЕ</b>: переворачивает бит. Каждый новый кран удваивает журнал: 2, 4, 8. Из И, ИЛИ, НЕ собирают любое правило и даже сумматор: 1 + 1 = 10.') +
      ПРАВИЛО('<b>Компьютер думает так же, как водяная машина: тысячи И, ИЛИ и НЕ.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'1 И 0 = ?', варианты:[{т:'1',ок:false},{т:'0',ок:true}], разбор:'И требует обе единицы.' },
    { вопрос:'1 ИЛИ 0 = ?', варианты:[{т:'1',ок:true},{т:'0',ок:false}], разбор:'ИЛИ хватает одной единицы.' },
    { вопрос:'НЕ 1 = ?', варианты:[{т:'1',ок:false},{т:'0',ок:true}], разбор:'НЕ переворачивает бит.' },
    { вопрос:'Сколько строк в журнале для 4 кранов?', варианты:[{т:'8',ок:false},{т:'16',ок:true}], разбор:'2 · 2 · 2 · 2 = 16.' },
    { вопрос:'Сумматор складывает 1 + 1. Что на табличках?', варианты:[{т:'двойки 1, единицы 0',ок:true},{т:'двойки 1, единицы 1',ок:false}], разбор:'1 + 1 = 10: одна двойка, ноль единиц.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r536Reset()")}</div>` +
        ПРАВИЛО('<b>И — оба, ИЛИ — хоть один, НЕ — наоборот.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r536Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'И, ИЛИ, НЕ', задания:[
    {q:'A = 1, B = 1. Чему равно A И B?', в:0, варианты:['1','0'], раз:'Обе единицы — И даёт 1.'},
    {q:'A = 0, B = 1. Чему равно A ИЛИ B?', в:1, варианты:['0','1'], раз:'Хватает одной единицы.'},
    {q:'A = 0. Чему равно НЕ A?', в:0, варианты:['1','0'], раз:'НЕ 0 = 1.'},
    {q:'A = 1, B = 0. Чему равно A И НЕ B?', в:1, варианты:['0','1'], раз:'НЕ B = 1, а 1 И 1 = 1.'}
  ]};
  const Т2 = { имя:'Правила из жизни', задания:[
    {q:'«Идём гулять, если нет дождя И уроки сделаны». Дождя нет, уроки не сделаны. Идём?', в:0, варианты:['нет','да'], раз:'Для И нужны оба условия, а уроки не сделаны.'},
    {q:'«Бери зонт, если идёт дождь ИЛИ снег». Идёт снег. Брать зонт?', в:1, варианты:['нет','да'], раз:'Для ИЛИ хватает одного условия.'},
    {q:'«Каникулы — это НЕ учебные дни». Сегодня учебный день. Каникулы?', в:1, варианты:['да','нет'], раз:'НЕ переворачивает: учебный → не каникулы.'},
    {q:'«Приз получит тот, кто решил задачу 1 ИЛИ задачу 2». Петя решил обе. Получит?', в:0, варианты:['да','нет: нужна одна'], раз:'1 ИЛИ 1 = 1.'}
  ]};
  const Т3 = { имя:'Журнал и сумматор', задания:[
    {q:'Сколько строк в журнале для двух кранов?', в:0, варианты:['4','3'], раз:'00, 01, 10, 11.'},
    {q:'В скольких строках из четырёх A И B = 1?', в:1, варианты:['2','1'], раз:'Только в строке 11.'},
    {q:'В скольких строках из четырёх A ИЛИ B = 1?', в:0, варианты:['3','2'], раз:'01, 10 и 11.'},
    {q:'Сумматор: A = 1, B = 0. Что на табличках (двойки, единицы)?', в:1, варианты:['10','01'], раз:'1 + 0 = 1: двоек нет, одна единица.'}
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
        в, "r536T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r536TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L536 = {
    id: ID,
    title: 'И, ИЛИ, НЕ: водяная машина Архимеда',
    ico: '🚰',
    src: 'Информатика · 5–6 класс · С нуля: логика',
    subj: 'inf',
    explain: [
      'Архимед строит машину, которая думает водой. Кран — это бит: открыт — 1, закрыт — 0.',
      'Краны друг за другом на одной трубе — это И: решётка поднимается, только когда открыты оба.',
      'Трубы рядом — это ИЛИ: гонг бьёт, если открыт хотя бы один кран. Молчит только при 0 и 0.',
      'Поплавок — это НЕ: он переворачивает бит. A = 1 — фонтан молчит, A = 0 — фонтан бьёт.',
      'Каждый новый кран удваивает число строк в журнале: 2, 4, 8.',
      'Ворота = A И НЕ B: гонец с паролем входит, но при тревоге — никто.',
      'Логическое ИЛИ не запрещает «оба сразу»: 1 ИЛИ 1 = 1.',
      'Сумматор: единицы = «ИЛИ, но не оба», двойки = И. 1 + 1 = 10.',
      'Замок A И B И НЕ C открывает одно положение из восьми.',
      'Итог: из И, ИЛИ, НЕ собирают любое правило. Процессор — миллиарды таких кранов.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: И, ИЛИ, НЕ.',
      'Тренажёр 2: правила из жизни.',
      'Тренажёр 3: журнал и сумматор.'
    ],
    check: {
      q: 'A = 1, B = 0. Чему равно A ИЛИ B?',
      choices: ['0','1'],
      ans: 1,
      exp: 'Для ИЛИ хватает одной единицы: 1 ИЛИ 0 = 1.'
    },
    tasks: [
      { q:'A = 1, B = 0. Чему равно A И B?', kind:'choice', choices:['1','0'], ans:1, tol:0,
        hints:['И требует, чтобы обе были единицами.'], sol:'1 И 0 = 0.' },
      { q:'A = 0. Чему равно НЕ A?', kind:'choice', choices:['0','1'], ans:1, tol:0,
        hints:['НЕ переворачивает бит.'], sol:'НЕ 0 = 1.' },
      { q:'Сколько строк в журнале испытаний для трёх кранов?', kind:'unit', ans:8, tol:0,
        hints:['Каждый кран удваивает число строк.','2 · 2 · 2.'], sol:'8.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L536.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const в = { волна: s.волна===f, пов: s.повернул && s.повернул.f===f ? s.повернул.б : null };
    let сцена='';
    if(f===1) сцена=F1(s,в); else if(f===2) сцена=F2(s,в); else if(f===3) сцена=F3(s,в);
    else if(f===4) сцена=F4(s,в); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s,в);
    else if(f===7) сцена=F7(s,в); else if(f===8) сцена=F8(s,в); else if(f===9) сцена=F9(s,в);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    s.волна=null; s.повернул=null;
    const ЗАГОЛОВКИ={1:'Кран — это бит',2:'Ворота: И',3:'Гонг: ИЛИ',4:'Фонтан: НЕ',5:'Сколько строк',
      6:'Ворота для своих',7:'Ловушка слова «или»',8:'Сумматор',9:'Замок казны',10:'Машина собрана',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l536" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Логика'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  const ДЕТАЛЬ_КАДРА = {2:['и',1], 3:['или',1], 4:['не',1], 8:['сум',1]};
  window.r536Кран=(f,б)=>{ const s=S(); const к='к'+f; if(!s[к]) s[к]={};
    s[к][б] = s[к][б] ? 0 : 1; s['тр'+f]=true; s.волна=f; s.повернул={f:f,б:б}; chRender(0); };
  window.r536Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к;
    const д=ДЕТАЛЬ_КАДРА[f]; if(д && к===д[1]) s['деталь_'+д[0]]=true; chRender(0); };
  window.r536Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r536Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r536T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r536TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L536; else arr.push(L536); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.IN536={render:render, L:L536};
})();
