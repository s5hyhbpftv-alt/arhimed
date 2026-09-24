/* ====== МАТЕМАТИКА · УРОК 24 · «ЦЕПОЧКИ СРАВНЕНИЙ» ====================================
   5 класс. Переделан с нуля по эталону 1022 (deploy/ЭТАЛОН_УРОКА.md), рисунки —
   сцена из сюжета. Активная прежняя версия (vis_24_44.js VISKW[24]) и
   lessons.js / vis_wk.js остаются; этот файл подключается позже и
   регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. Сравнения склеиваются в цепочку: если A > B и B > C, то
   A > C — третье взвешивание не нужно. Цепочку можно читать с обоих концов.
   Если звена не хватает (A > B и C > B), про A и C сказать нечего.
   Двойное неравенство — коридор; ≥ пускает равенство; сравнивают в одних
   единицах; из отрицательных меньше то, что дальше от нуля.

   СЮЖЕТ. «Золото Гиерона». Ювелир подменил один из царских слитков
   подделкой — она легче. Гирь в сокровищнице нет, только весы с двумя
   чашами. Ученик Архимеда находит подделку цепочкой сравнений, считает
   возможный вес, ныряльщики ищут выброшенную ювелиром корону.

   РУКАМИ: весы — кнопки «A и B», «B и C», «A и C»: чаши наклоняются,
   взвешивания записываются в журнал, из двух звеньев собирается цепочка.

   ВСЕ ОТВЕТЫ ПРОВЕРЕНЫ:
     слитки A = 7, B = 5, C = 3 мины: A > B, B > C → A > B > C, C — подделка;
     X < Y < Z → тяжелее всех Z; A > B и C > B → про A и C неизвестно;
     472 > 427 (десятки 7 > 2); 3 < x < 7, x натуральное → 4, 5, 6 (три);
     5 ≥ 5 — верно; 5 мин 30 драхм = 530 драхм < 540 драхм;
     −7 < −3 (левее на луче, глубже).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 24;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', ЯНТАРЬ='#f0b050';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'весы',    имя:'Найти подделку весами',  итог:'A > B > C'},
    {ключ:'звено',   имя:'Не поверить догадке',    итог:'нет звена'},
    {ключ:'коридор', имя:'Узнать вес подделки',    итог:'4, 5 или 6'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];
  const ВЕС = {A:7, B:5, C:3};
  const ПАРЫ = [['A','B'],['B','C'],['A','C']];

  const CSS=`
  #lvis .s6.l24{gap:14px}
  #lvis .s6.l24 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l24 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l24 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l24 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l24 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l24 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l24 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l24 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l24 .карт .текст b{color:${GOLD}}
  #lvis .s6.l24 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l24 .правило b{color:${GOLD}}
  #lvis .s6.l24 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(240,176,80,.16),rgba(240,176,80,.04));
    border:1.5px solid rgba(240,176,80,.55);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l24 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l24 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ЯНТАРЬ}}
  #lvis .s6.l24 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l24 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l24 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l24 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l24 .лист li.есть{color:${ИНК}}
  #lvis .s6.l24 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l24 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l24 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l24 .ряд{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l24 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:17px;font-weight:700;
    border:1.5px solid rgba(240,176,80,.55);background:rgba(240,176,80,.13);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l24 .ряд button:active{transform:translateY(2px);background:rgba(240,176,80,.28)}
  #lvis .s6.l24 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.2)}
  #lvis .s6.l24 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l24 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l24 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l24 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l24 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l24 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l24 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l24 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l24 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l24 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l24 .уровни .точка.сейчас{background:${GOLD};animation:l24dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l24dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l24 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l24{-webkit-text-size-adjust:100%}
  #lvis .s6.l24 [data-anim]{animation:l24rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l24rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l24 [data-anim]{animation:none!important}
    #lvis .s6.l24 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l24 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l24-style');
      if(!s){ s=document.createElement('style'); s.id='l24-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Золото Гиерона</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Дело ювелира</span><b class="${всё?'готово':''}">${
        всё?'золото спасено':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <linearGradient id="c24-казна" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a120c"/><stop offset="0.6" stop-color="#2e2014"/><stop offset="1" stop-color="#3e2c1a"/>
      </linearGradient>
      <radialGradient id="c24-сияние" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ffb040" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c24-факел" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff0b0" stop-opacity=".9"/><stop offset="0.4" stop-color="#ffa040" stop-opacity=".35"/><stop offset="1" stop-color="#ff7020" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c24-колонна" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#5a4a38"/><stop offset="0.45" stop-color="#a8967a"/><stop offset="1" stop-color="#4a3c2c"/>
      </linearGradient>
      <linearGradient id="c24-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffe6a8"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </linearGradient>
      <linearGradient id="c24-золото" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff6c8"/><stop offset="0.35" stop-color="#ffd24a"/><stop offset="0.7" stop-color="#d89a20"/><stop offset="1" stop-color="#8a5a08"/>
      </linearGradient>
      <linearGradient id="c24-золото-бок" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c88a18"/><stop offset="1" stop-color="#6a4204"/>
      </linearGradient>
      <linearGradient id="c24-подделка" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff0c8"/><stop offset="0.4" stop-color="#e0c070"/><stop offset="0.75" stop-color="#b8a070"/><stop offset="1" stop-color="#6a5a3a"/>
      </linearGradient>
      <linearGradient id="c24-сундук" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a5a2a"/><stop offset="1" stop-color="#3a2210"/>
      </linearGradient>
      <linearGradient id="c24-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6ead0"/><stop offset="1" stop-color="#d8bf8a"/>
      </linearGradient>
      <linearGradient id="c24-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5ab0e0"/><stop offset="0.4" stop-color="#2a6aa8"/><stop offset="1" stop-color="#0a2448"/>
      </linearGradient>
      <linearGradient id="c24-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a88d0"/><stop offset="1" stop-color="#c8e2f4"/>
      </linearGradient>
      <radialGradient id="c24-монета" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff4c0"/><stop offset="0.5" stop-color="#e0b040"/><stop offset="1" stop-color="#7a5410"/>
      </radialGradient>
      <filter id="c24-тень" x="-30%" y="-30%" width="160%" height="170%">
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
    return `<g filter="url(#c24-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* сокровищница: колонны, факелы, сундуки с монетами */
  const казна = (Н) => `<rect x="0" y="0" width="336" height="${Н}" fill="url(#c24-казна)"/>
    ${[22,314].map((x,i)=>`<rect x="${x-10}" y="0" width="20" height="${Н}" fill="url(#c24-колонна)" data-декор="1"/>
      <circle cx="${x+(i?-24:24)}" cy="60" r="40" fill="url(#c24-факел)" data-декор="1">${анЛин('r','36;44;38;42;36',(1.7+i*0.4).toFixed(1)+'s')}</circle>
      <path d="M${x+(i?-24:24)} 50 q-7 10 -4 18 q4 4 8 0 q3 -8 -4 -18 z" fill="#ffc060">${анЛин('opacity','1;0.6;1','0.8s')}</path>
      <rect x="${x+(i?-27:21)}" y="68" width="6" height="18" fill="#4a3018"/>`).join('')}
    <rect x="0" y="${Н-34}" width="336" height="34" fill="#2a1c10"/>
    ${[60,276].map(x=>`<g filter="url(#c24-тень)"><rect x="${x-22}" y="${Н-58}" width="44" height="26" rx="3" fill="url(#c24-сундук)"/>
      <path d="M${x-24} ${Н-58} q24 -16 48 0 z" fill="url(#c24-сундук)"/>
      ${[0,1,2,3].map(k=>`<circle cx="${x-12+k*8}" cy="${Н-62-(k%2)*3}" r="4" fill="url(#c24-монета)"/>`).join('')}</g>`).join('')}`;
  /* слиток: трапеция с гранью и бликом */
  const слиток = (x,y,буква,м,поддел) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c24-тень)">
    <path d="M-22 8 L-16 -8 H16 L22 8 Z" fill="url(#c24-${поддел?'подделка':'золото'})" stroke="#5a3a04" stroke-width=".8"/>
    <path d="M-22 8 H22 L20 12 H-20 Z" fill="url(#c24-золото-бок)"/>
    <path d="M-12 -5 H6" stroke="#fffae0" stroke-width="1.6" opacity=".8" stroke-linecap="round">${анЛин('opacity','0.8;0.2;0.8','2.6s')}</path>
    ${буква?т(0,5,буква,12,'#4a2a04',true):''}</g>`;
  /* весы: стойка, коромысло под углом, чаши висят вертикально; левая тяжелее → угол < 0 */
  function весы(cx,top,груз1,груз2,угол,подп1,подп2,поддел1,поддел2){
    const L=92, р=угол*Math.PI/180;
    /* угол < 0 — левая чаша опускается */
    const ly2=top-L*Math.sin(р), ry2=top+L*Math.sin(р);
    const чаша=(x,y,груз,подп,поддел)=>`<g filter="url(#c24-тень)">
      <line x1="${x}" y1="${y}" x2="${x-26}" y2="${y+50}" stroke="#8a6a2a" stroke-width="1.2"/><line x1="${x}" y1="${y}" x2="${x+26}" y2="${y+50}" stroke="#8a6a2a" stroke-width="1.2"/>
      <path d="M${x-32} ${y+50} q32 18 64 0 z" fill="url(#c24-бронза)" stroke="#5a3a10"/>
      ${груз?слиток(x,y+40,груз,1,поддел):''}
      ${подп?т(x,y+84,подп,13,ИНК,true,undefined,'#1a120c'):''}</g>`;
    return `<g filter="url(#c24-тень)">
      <path d="M${cx-34} ${top+172} h68 l-10 -12 h-48 z" fill="url(#c24-бронза)"/>
      <rect x="${cx-5}" y="${top}" width="10" height="${162}" fill="url(#c24-бронза)"/>
      <path d="M${cx-8} ${top-10} L${cx} ${top-26} L${cx+8} ${top-10} Z" fill="url(#c24-бронза)"/></g>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${top};${угол?(угол>0?-0.8:0.8):1} ${cx} ${top};0 ${cx} ${top}" dur="3s" repeatCount="indefinite" additive="sum"/>${ЗАВОД}`:''}
        <line x1="${(cx-L*Math.cos(р)).toFixed(1)}" y1="${ly2.toFixed(1)}" x2="${(cx+L*Math.cos(р)).toFixed(1)}" y2="${ry2.toFixed(1)}" stroke="#c98f3e" stroke-width="6" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${top}" r="7" fill="url(#c24-бронза)" stroke="#5a3a10"/>
        ${чаша((cx-L*Math.cos(р)).toFixed(1)*1,ly2,груз1,подп1,поддел1)}${чаша((cx+L*Math.cos(р)).toFixed(1)*1,ry2,груз2,подп2,поддел2)}
        <path d="M${cx} ${top+4} v18" stroke="#5a3a10" stroke-width="2"/></g>`;
  }
  /* числовой луч */
  const луч = (x0,x1,y,от,до,опц) => { const о=опц||{}, px=(v)=>x0+(x1-x0)*(v-от)/(до-от);
    let s=`<line x1="${x0-6}" y1="${y}" x2="${x1+10}" y2="${y}" stroke="${ИНК}" stroke-width="2"/><path d="M${x1+12} ${y} l-8 -4 v8 z" fill="${ИНК}"/>`;
    for(let v=от; v<=до; v++){ s+=`<line x1="${px(v)}" y1="${y-5}" x2="${px(v)}" y2="${y+5}" stroke="${ИНК}" stroke-width="1.4"/>`+
      т(px(v),y+22,String(v).replace('-','−'),12,о.цвет&&о.цвет(v)||МУТ,true); }
    return {s, px}; };

  /* ================= КАДРЫ ================= */

  /* 1. Сокровищница */
  function F1(s){
    const Н=320, в=s.ответ1;
    return ЛИСТ(s) +
      ЗАДАЧА('Царь Гиерон заподозрил ювелира: один из трёх золотых слитков <b>подменён</b> — внутри серебро, и он <b>легче</b> настоящих. Гирь в сокровищнице нет, только старые бронзовые весы. Архимед: «Весы не скажут, сколько весит слиток. Они скажут, <b>какой тяжелее</b>. Этого хватит».') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        <circle cx="168" cy="130" r="120" fill="url(#c24-сияние)" data-декор="1"/>
        ${весы(168,70,'5','3',-12,'5 мин','3 мины')}
        ${т(168,Н-44,в===1?'5 > 3':'5 ? 3',24,GOLD,true,undefined,'#1a120c')}
        ${подпись(168,30, в===1?'клювик смотрит на меньшее':'какой знак поставить?', в===1?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['5 < 3','5 > 3','5 = 3'],1,в,'r24Отв1') +
      (в==null ? СКАЗ('Вопрос','Чаша с пятью минами опустилась. Какую запись сделать в журнале?') :
        РАЗБОР(в===1, ['«5 < 3» читается «пять меньше трёх» — это неправда. Острый клювик — к <b>меньшему</b>: 5 > 3.','<b>5 > 3</b> — «пять больше трёх». Раскрытая сторона знака — к большему, острая — к меньшему.','Знак «=» — когда чаши на одном уровне. Здесь одна опустилась: 5 > 3.'][в])) +
      (в===1 ? ПРАВИЛО('Знак раскрыт к <b>большему</b> и смотрит остриём на <b>меньшее</b>: 5 > 3, 3 < 5.') : '');
  }

  /* 2. Весы: найти подделку */
  function F2(s){
    const Н=330, в=s.ответ2, взв=Array.isArray(s.взв2)?s.взв2:[], посл=взв[взв.length-1];
    let угол=0, л='', п='';
    if(посл!=null){ const [a,b]=ПАРЫ[посл]; л=a; п=b; угол = ВЕС[a]>ВЕС[b] ? -12 : 12; }
    const записи = взв.map(i=>{ const [a,b]=ПАРЫ[i]; return ВЕС[a]>ВЕС[b]?a+' > '+b:a+' < '+b; });
    const есть=(i)=>взв.includes(i), цепь = есть(0)&&есть(1);
    return ЛИСТ(s) +
      ЗАДАЧА('Три слитка: <b>A</b>, <b>B</b> и <b>C</b>. Кладём на весы по два. Каждое взвешивание — одна запись в журнале. Архимеду жаль времени: «Найди подделку за <b>два</b> взвешивания».') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${посл!=null ? весы(168,64,л,п,угол,'','') : весы(168,64,'','',0,'','')}
        ${посл==null?['A','B','C'].map((b,i)=>слиток(100+i*68,Н-76,b,1,false)).join(''):''}
        <g filter="url(#c24-тень)"><rect x="40" y="${Н-44}" width="256" height="32" rx="6" fill="url(#c24-пергамент)"/></g>
        ${т(168,Н-22, цепь ? 'A > B > C' : (записи.length?записи.join(' · '):'журнал пуст'),16,цепь?'#1a6a3a':'#3a2410',true)}
        ${подпись(168,28, цепь ? 'цепочка собрана: C — легче всех' : 'взвешено: '+взв.length, цепь?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${ПАРЫ.map(([a,b],i)=>BTN(3,посл===i?'вкл':'',a+' и '+b,"r24Взвесить("+i+")")).join('')}</div>` +
      (цепь ?
        ОТВЕТЫ('',['Да: без этого про A и C ничего не известно','Нет: A > B и B > C — значит, A > C'],1,в,'r24Отв2') +
        (в==null ? СКАЗ('Вопрос','Нужно ли ещё взвешивать A и C, чтобы узнать, что C легче A?') : РАЗБОР(в===1, ['Известно! A тяжелее B, а B тяжелее C — значит, A тяжелее C. Звенья склеиваются в цепочку <b>A > B > C</b>. Подделка — <b>C</b>.','Два звена склеились: <b>A > B > C</b>. Третье взвешивание не нужно — C легче всех, это и есть подделка.'][в]))
        : СКАЗ('Подсказка','Взвесь сначала <b>A и B</b>, потом <b>B и C</b> — и посмотри в журнал.')) +
      (в===1&&цепь ? ПРАВИЛО('Если <b>A > B</b> и <b>B > C</b>, то <b>A > C</b>. Сравнения склеиваются в цепочку A > B > C.') : '');
  }

  /* 3. Прочитать с другого конца */
  function F3(s){
    const Н=260, в=s.ответ3;
    return ЛИСТ(s) +
      ЗАДАЧА('Помощник ювелира на допросе путается: «Слиток <b>X легче Y</b>, а <b>Y легче Z</b>». Какой из этих слитков <b>тяжелее всех</b> — его и спрятал ювелир?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${[['X',0.8],['Y',1],['Z',1.25]].map(([b,м],i)=>`<g>${вырасти('7s',0.05+i*0.18)}${слиток(80+i*88,120,b,м,false)}</g>`).join('')}
        ${т(124,124,'<',26,GOLD,true)}${т(212,124,'<',26,GOLD,true)}
        <g filter="url(#c24-тень)"><rect x="34" y="160" width="268" height="40" rx="6" fill="url(#c24-пергамент)"/></g>
        ${т(168,186,в===2?'X < Y < Z — то же, что Z > Y > X':'X < Y < Z',в===2?14:17,'#3a2410',true)}
        ${подпись(168,Н-12, в===2?'справа в цепочке с «<» — самый тяжёлый':'читай цепочку с конца', в===2?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['X','Y','Z'],2,в,'r24Отв3') +
      (в==null ? СКАЗ('Вопрос','Кто тяжелее всех?') : РАЗБОР(в===2, ['X — самый лёгкий: он стоит в начале цепочки X < Y < Z. Тяжелее всех — <b>Z</b>.','Y посередине: тяжелее X, но легче Z. Тяжелее всех — <b>Z</b>.','X < Y < Z — это то же, что Z > Y > X. <b>Z</b> — тяжелее всех.'][в])) +
      (в===2 ? ПРАВИЛО('Цепочку можно <b>перевернуть</b> вместе со знаками: X < Y < Z — то же, что Z > Y > X.') : '');
  }

  /* 4. Нет звена */
  function F4(s){
    const Н=280, в=s.ответ4;
    return ЛИСТ(s) +
      ЗАДАЧА('Стражник докладывает о двух других слитках: «<b>A тяжелее B</b>, и <b>C тоже тяжелее B</b>. Значит, A тяжелее C!» Можно ли так сказать?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${слиток(168,190,'B',0.9,false)}
        ${слиток(90,110,'A',1.1,false)}${слиток(246,110,'C',1.1,false)}
        <line x1="104" y1="124" x2="154" y2="178" stroke="${GOLD}" stroke-width="2"/>${т(118,160,'>',18,GOLD,true)}
        <line x1="232" y1="124" x2="182" y2="178" stroke="${GOLD}" stroke-width="2"/>${т(218,160,'>',18,GOLD,true)}
        <g>${анЛин('opacity','1;0.3;1','1.2s')}<line x1="120" y1="110" x2="216" y2="110" stroke="${RED}" stroke-width="2.4" stroke-dasharray="6 5"/>${т(168,100,'?',24,RED,true)}</g>
        ${подпись(168,Н-12, в===2?'между A и C нет звена':'а есть ли звено между A и C?', в===2?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['A','C','нельзя сказать'],2,в,'r24Отв4') +
      (в==null ? СКАЗ('Вопрос','Кто тяжелее — A или C?') : РАЗБОР(в===2, ['Оба тяжелее B — и только. A может быть тяжелее C, а может и легче. <b>Звена нет</b>.','Про C известно лишь, что он тяжелее B. С A его никто не сравнивал: <b>нельзя сказать</b>.','Верно: обе стрелки ведут к B, цепочки A — C не получается. Нужно ещё одно взвешивание.'][в])) +
      (в===2 ? ПРАВИЛО('Цепочка склеивается, только если звенья <b>смотрят в одну сторону</b> и соединяются: A > B > C. «A > B и C > B» — не цепочка.') : '');
  }

  /* 5. Сравнение чисел */
  function F5(s){
    const Н=260, в=s.ответ5;
    const разряды=(x,y,ч,выд)=>[...ч].map((ц,i)=>`<g filter="url(#c24-тень)"><rect x="${x+i*34}" y="${y}" width="30" height="40" rx="5" fill="${i===выд?'rgba(255,215,106,.3)':'rgba(255,255,255,.08)'}" stroke="${i===выд?GOLD:'#6a5a44'}"/>
      ${т(x+i*34+15,y+28,ц,22,i===выд?GOLD:ИНК,true)}</g>`).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('В описи казны записаны два сосуда: один весит <b>472</b> драхмы, другой — <b>427</b>. Ювелир клянётся, что они одинаковые — «цифры-то те же!». Какой тяжелее?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${разряды(70,70,'472',в===1?1:-1)}${разряды(70,130,'427',в===1?1:-1)}
        ${т(214,98,'сотни: 4 = 4',13,МУТ,true,'start')}${т(214,158,'десятки: 7 > 2',13,в===1?GREEN:МУТ,true,'start')}
        ${подпись(168,Н-12, в===1?'472 > 427 — решили десятки':'сравнивай слева направо', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['427 > 472','472 > 427','равны'],1,в,'r24Отв5') +
      (в==null ? СКАЗ('Вопрос','Какая запись верна?') : РАЗБОР(в===1, ['Сотни равны (4 и 4), дальше десятки: 7 больше 2. Значит, <b>472 > 427</b>.','Цифр поровну — идём слева направо. Сотни равны, десятки 7 > 2: <b>472 > 427</b>. Единицы уже не важны.','Цифры те же, но стоят в разных разрядах: 7 десятков против 2 десятков. Не равны: 472 > 427.'][в])) +
      (в===1 ? ПРАВИЛО('Больше цифр — больше число. Цифр поровну — сравнивай <b>слева направо</b>, до первой разной цифры.') : '');
  }

  /* 6. Коридор */
  function F6(s){
    const Н=260, в=s.ответ6;
    const {s:ли, px} = луч(40,296,150,0,10,{цвет:v=>в===1&&v>3&&v<7?GREEN:null});
    return ЛИСТ(s) +
      ЗАДАЧА('Ювелир признался только наполовину: «Подделка весит <b>больше 3</b> мин и <b>меньше 7</b> мин — целое число мин». Это двойное неравенство <b>3 < x < 7</b>. Сколько вариантов веса?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        <rect x="${px(3)}" y="112" width="${px(7)-px(3)}" height="38" fill="rgba(143,224,176,.14)"/>
        ${ли}
        ${[3,7].map(v=>`<g filter="url(#c24-тень)"><path d="M${px(v)-12} 150 v-42 a12 12 0 0 1 24 0 v42" fill="none" stroke="url(#c24-бронза)" stroke-width="4"/>
          <circle cx="${px(v)}" cy="150" r="5" fill="#1a120c" stroke="${RED}" stroke-width="2"/></g>`).join('')}
        ${[4,5,6].map((v,i)=>`<g>${в===1?вырасти('6s',0.05+i*0.15):''}<circle cx="${px(v)}" cy="150" r="7" fill="${в===1?GREEN:GOLD}" opacity="${в===1?1:0.35}"/></g>`).join('')}
        ${т(168,86,'3 < x < 7',22,GOLD,true,undefined,'#1a120c')}
        ${подпись(168,Н-12, в===1?'4, 5, 6 — двери 3 и 7 закрыты':'знаки строгие: 3 и 7 не входят', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['5','3','4'],1,в,'r24Отв6') +
      (в==null ? СКАЗ('Вопрос','Сколько целых значений у x?') : РАЗБОР(в===1, ['5 — это если бы 3 и 7 тоже входили. Знаки строгие: остаются <b>4, 5, 6</b> — три.','Внутри коридора 4, 5 и 6: <b>три</b> варианта. 3 и 7 стоят на пороге и внутрь не входят.','4 — это 7 − 3. Но считаем числа между: 4, 5, 6 — <b>три</b>.'][в])) +
      (в===1 ? ПРАВИЛО('<b>3 < x < 7</b> — «коридор»: x больше 3 и меньше 7 одновременно. Строгий знак не пускает саму границу.') : '');
  }

  /* 7. Не меньше */
  function F7(s){
    const Н=300, в=s.ответ7;
    return ЛИСТ(s) +
      ЗАДАЧА('Закон Сиракуз: царский слиток должен весить <b>не меньше 5 мин</b>: x ≥ 5. Слиток B весит <b>ровно 5 мин</b>. Годится ли он?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${весы(168,52,'B','5',0,'слиток B','гиря 5')}
        ${подпись(168,206,'x ≥ 5: x > 5 или x = 5',GOLD,14)}
        ${подпись(168,Н-10, в===1?'чёрточка под знаком пускает равенство':'чаши на одном уровне', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Нет: нужно больше 5','Да: 5 ≥ 5 — верно'],1,в,'r24Отв7') +
      (в==null ? СКАЗ('Вопрос','Годится ли слиток B?') : РАЗБОР(в===1, ['«Не меньше 5» — это «больше или равно». 5 = 5, значит, <b>5 ≥ 5</b> — верно. Годится.','«≥» читается «не меньше»: больше <b>или столько же</b>. 5 ≥ 5 — правда, а вот 5 > 5 — неправда.'][в])) +
      (в===1 ? ПРАВИЛО('<b>≥</b> — «не меньше» (больше или равно), <b>≤</b> — «не больше». Строгие <b>></b> и <b><</b> равенство не пускают.') : '');
  }

  /* 8. Единицы */
  function F8(s){
    const Н=260, в=s.ответ8;
    return ЛИСТ(s) +
      ЗАДАЧА('Ювелир оставил две записки: «чаша — <b>5 мин 30 драхм</b>», «кувшин — <b>540 драхм</b>». В одной мине <b>100 драхм</b>. Что тяжелее?') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        ${[['5 мин 30 драхм',в===0?'= 530 драхм':''],['540 драхм','']].map(([a,b],i)=>`<g filter="url(#c24-тень)"><rect x="${30+i*146}" y="70" width="130" height="80" rx="5" fill="url(#c24-пергамент)" transform="rotate(${i?3:-3} ${95+i*146} 110)"/></g>
          ${т(95+i*146,104,a,14,'#3a2410',true)}${b?т(95+i*146,128,b,13,'#1a6a3a',true):''}`).join('')}
        ${т(168,188,'1 мина = 100 драхм',15,GOLD,true,undefined,'#1a120c')}
        ${подпись(168,Н-12, в===0?'530 < 540 — кувшин тяжелее':'сначала переведи в драхмы', в===0?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Кувшин (540 драхм)','Чаша (5 мин 30 драхм)','Одинаково'],0,в,'r24Отв8') +
      (в==null ? СКАЗ('Вопрос','Что тяжелее?') : РАЗБОР(в===0, ['5 мин 30 драхм = 500 + 30 = <b>530</b> драхм. 530 < 540 — <b>кувшин</b> тяжелее.','Пять больше, чем ноль мин у кувшина? Нельзя сравнивать мины с драхмами. 5 мин 30 драхм = 530 драхм, а 530 < 540: тяжелее кувшин.','530 и 540 — не одно и то же: кувшин тяжелее на 10 драхм.'][в])) +
      (в===0 ? ПРАВИЛО('Сравнивают <b>в одних единицах</b>: сначала переведи, потом ставь знак.') : '');
  }

  /* 9. Ныряльщики */
  function F9(s){
    const Н=324, в=s.ответ9;
    const y0=90, м=22, py=(v)=>y0-v*м;
    const ныряльщик=(x,v,имя)=>`<g transform="translate(${x} ${py(v)})" filter="url(#c24-тень)">
      <ellipse cx="0" cy="0" rx="16" ry="6" fill="#c89068"/><circle cx="16" cy="-2" r="6" fill="#c89068"/>
      <path d="M-16 0 l-10 -6 M-16 0 l-10 6" stroke="#c89068" stroke-width="3"/>
      ${[0,1,2].map(k=>`<circle cx="${22+k*3}" cy="${-10-k*10}" r="${2+k*0.6}" fill="none" stroke="#dff2ff" stroke-width="1">${анЛин('cy',`${-10-k*10};${-40-k*10}`,(2+k*0.5).toFixed(1)+'s')}</circle>`).join('')}
      ${т(0,24,имя,12,ИНК,true,undefined,'#0a2448')}</g>`;
    return ЛИСТ(s) +
      ЗАДАЧА('Пойманный ювелир успел выбросить в гавань настоящую корону. Два ныряльщика ищут её: <b>Клеон</b> на глубине <b>−3</b> м, <b>Дион</b> — на <b>−7</b> м (минус — ниже уровня моря). Корона лежит глубже обоих. Какое число <b>меньше</b>?') +
      `<div class="pic">${свг(`
        <g><rect x="0" y="0" width="336" height="${y0}" fill="url(#c24-небо)"/></g>
        <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c24-море)"/>
        <path d="M0 ${y0} q20 -4 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="#fff" stroke-width="1.4" opacity=".6"/>
        <path d="M40 ${y0-4} q30 10 60 0 l-8 -14 h-44 z" fill="#6a4020"/><line x1="70" y1="${y0-18}" x2="70" y2="${y0-50}" stroke="#4a2a10" stroke-width="2"/>
        ${Array.from({length:9},(_,i)=>{ const v=-i; return `<line x1="306" y1="${py(v)}" x2="318" y2="${py(v)}" stroke="#fff" stroke-width="1.2"/>${т(302,py(v)+4,String(v).replace('-','−'),11,'#fff',true,'end')}`; }).join('')}
        <line x1="312" y1="${py(0)}" x2="312" y2="${py(-8)}" stroke="#fff" stroke-width="1.2"/>
        ${ныряльщик(120,-3,'Клеон −3')}${ныряльщик(200,-7,'Дион −7')}
        <g transform="translate(262 ${py(-8)+4})" filter="url(#c24-тень)"><path d="M-14 6 l3 -12 l6 7 l5 -10 l5 10 l6 -7 l3 12 z" fill="url(#c24-золото)"/>${ДВИЖ?`<animate attributeName="opacity" values="1;0.6;1" dur="1.6s" repeatCount="indefinite"/>`:''}</g>
        ${подпись(150,Н-10, в===1?'−7 < −3: глубже — значит, меньше':'ниже — меньше', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['−3','−7','равны'],1,в,'r24Отв9') +
      (в==null ? СКАЗ('Вопрос','Какое число меньше: −3 или −7?') : РАЗБОР(в===1, ['−3 ближе к поверхности (к нулю). Ниже — значит, меньше: <b>−7 < −3</b>.','Дион глубже, его число ниже на шкале: <b>−7 < −3</b>. Из двух отрицательных меньше то, что дальше от нуля.','Глубины разные: 7 метров и 3 метра. −7 < −3.'][в])) +
      (в===1 ? ПРАВИЛО('На шкале <b>ниже (левее) — меньше</b>: −7 < −3 < 0. Из отрицательных меньше то, что дальше от нуля.') : '');
  }

  /* 10. Золото спасено */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=300;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Два взвешивания выдали подделку C, коридор 3 < x < 7 сошёлся с её настоящим весом — 3 мины серебра и позолота. Дион поднимает со дна корону. Гиерон говорит ювелиру: «Ты думал, без гирь никто не узнает. Но цепочку сравнений не обманешь».'
        : 'Дело ещё не раскрыто — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        ${казна(Н)}
        <circle cx="168" cy="120" r="110" fill="url(#c24-сияние)" data-декор="1"/>
        ${[['A',1.2,false],['B',1.05,false],['C',0.85,true]].map(([b,м,п],i)=>`<g>${вырасти('8s',0.05+i*0.15)}${слиток(86+i*82,150,b,м,п)}</g>`).join('')}
        ${т(127,156,'>',22,GOLD,true)}${т(209,156,'>',22,GOLD,true)}
        <g transform="translate(168 212)" filter="url(#c24-тень)"><path d="M-22 10 l5 -18 l9 10 l8 -16 l8 16 l9 -10 l5 18 z" fill="url(#c24-золото)" stroke="#6a4a08"/>
          ${[-12,0,12].map(d=>`<circle cx="${d}" cy="4" r="2.4" fill="#c03a2a"/>`).join('')}</g>
        <g>${проявить('9s',0.1,0.2)}${подпись(168,30,'A > B и B > C → A > B > C',GOLD,12)}</g>
        <g>${проявить('9s',0.3,0.4)}${подпись(168,58,'нет звена — нет вывода',GOLD,12)}</g>
        <g>${проявить('9s',0.5,0.6)}${подпись(168,Н-12,'сравнивай в одних единицах',GREEN,13)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Знак раскрыт к большему. Сравнения склеиваются в цепочку: <b>A > B, B > C → A > B > C</b>, и её можно читать с конца. Если звена не хватает — вывода нет. Двойное неравенство — коридор; ≥ пускает равенство. Числа сравнивают по разрядам слева направо, величины — в одних единицах, из отрицательных меньше то, что дальше от нуля.') +
      ПРАВИЛО('<b>Два звена — одна цепочка.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какой знак: 1004 … 998?', варианты:[{т:'>',ок:true},{т:'<',ок:false}], разбор:'Четыре цифры против трёх.' },
    { вопрос:'Петя выше Коли, Коля выше Мити. Кто ниже всех?', варианты:[{т:'Петя',ок:false},{т:'Митя',ок:true}], разбор:'Петя > Коля > Митя.' },
    { вопрос:'Сколько натуральных x: 2 < x < 6?', варианты:[{т:'3',ок:true},{т:'4',ок:false}], разбор:'3, 4, 5.' },
    { вопрос:'Верно ли 8 ≤ 8?', варианты:[{т:'верно',ок:true},{т:'неверно',ок:false}], разбор:'«Не больше» пускает равенство.' },
    { вопрос:'Какое число меньше: −2 или −9?', варианты:[{т:'−2',ок:false},{т:'−9',ок:true}], разбор:'−9 дальше от нуля влево.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r24Reset()")}</div>` +
        ПРАВИЛО('<b>Два звена — одна цепочка.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r24Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Цепочки', задания:[
    {q:'A > B, B > C, C > D. Кто больше всех?', в:1, варианты:['D','A'], раз:'A > B > C > D.'},
    {q:'X < Y, Y < Z. Верно ли X < Z?', в:0, варианты:['верно','неизвестно'], раз:'Цепочка X < Y < Z.'},
    {q:'A > B и A > C. Что больше: B или C?', в:1, варианты:['B','неизвестно'], раз:'Оба меньше A — и только.'},
    {q:'Цепочка K < L < M. Как её прочитать с конца?', в:0, варианты:['M > L > K','M < L < K'], раз:'Переворачиваем и знаки.'}
  ]};
  const Т2 = { имя:'Числа и знаки', задания:[
    {q:'356 … 365?', в:1, варианты:['>','<'], раз:'Десятки: 5 < 6.'},
    {q:'Сколько натуральных x: 10 < x < 15?', в:0, варианты:['4','5'], раз:'11, 12, 13, 14.'},
    {q:'Какие x подходят под x ≥ 3, x < 5 (натуральные)?', в:1, варианты:['4','3 и 4'], раз:'3 входит, 5 — нет.'},
    {q:'−1 … −10?', в:0, варианты:['>','<'], раз:'−1 ближе к нулю.'}
  ]};
  const Т3 = { имя:'Величины', задания:[
    {q:'3 м 5 см и 350 см — что длиннее?', в:1, варианты:['3 м 5 см','350 см'], раз:'3 м 5 см = 305 см.'},
    {q:'2 кг 50 г и 2050 г?', в:0, варианты:['равны','2 кг 50 г больше'], раз:'2000 + 50 = 2050.'},
    {q:'1 ч 10 мин и 75 мин — что дольше?', в:1, варианты:['1 ч 10 мин','75 мин'], раз:'1 ч 10 мин = 70 мин.'},
    {q:'Температура −5° и −12°. Где холоднее?', в:1, варианты:['−5°','−12°'], раз:'−12 < −5.'}
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
        в, "r24T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r24TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L24 = {
    id: ID,
    title: 'Цепочки сравнений',
    ico: '📏',
    src: 'Математика · 5 класс · Сравнение и неравенства',
    subj: 'math',
    explain: [
      'Ювелир подменил один из слитков Гиерона лёгкой подделкой. Весы показывают, какой слиток тяжелее: 5 > 3. Знак раскрыт к большему, остриём к меньшему.',
      'Два взвешивания: A > B и B > C склеиваются в цепочку A > B > C. Третье не нужно — подделка C.',
      'Цепочку можно читать с конца: X < Y < Z — то же, что Z > Y > X. Тяжелее всех Z.',
      'A > B и C > B — не цепочка: про A и C сказать ничего нельзя.',
      'Числа сравнивают по длине, а при равной длине — слева направо по разрядам: 472 > 427.',
      'Двойное неравенство 3 < x < 7 — коридор: натуральных x три — 4, 5, 6.',
      'Знак ≥ — «не меньше»: 5 ≥ 5 верно.',
      'Величины сравнивают в одних единицах: 5 мин 30 драхм = 530 драхм < 540 драхм.',
      'Из отрицательных меньше то, что дальше от нуля: −7 < −3.',
      'Итог: знаки, цепочки, недостающее звено, коридор, ≥, единицы и отрицательные.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: цепочки.',
      'Тренажёр 2: числа и знаки.',
      'Тренажёр 3: величины.'
    ],
    check: {
      q: 'X легче Y, а Y легче Z. Кто тяжелее всех?',
      choices: ['X','Y','Z'],
      ans: 2,
      exp: 'X < Y < Z — тяжелее всех Z.'
    },
    tasks: [
      { q:'A выше B, B выше C. Кто выше всех?', kind:'choice', choices:['B','A','C'], ans:1, tol:0,
        hints:['Цепочка: A > B > C.'], sol:'A > B > C — выше всех A.' },
      { q:'A выше B, B выше C, C выше D. Кто ниже всех?', kind:'choice', choices:['A','B','C','D'], ans:3, tol:0,
        hints:['Цепочка: A > B > C > D.','Ниже всех — последний.'], sol:'A > B > C > D — ниже всех D.' },
      { q:'Сколько натуральных чисел x удовлетворяют 3 < x < 7?', kind:'unit', ans:3, tol:0,
        hints:['Строгие знаки: 3 и 7 не входят.','4, 5, 6.'], sol:'3.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L24.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Сокровищница',2:'Два взвешивания',3:'С другого конца',4:'Нет звена',5:'Опись казны',
      6:'Коридор',7:'Не меньше',8:'Мины и драхмы',9:'Ныряльщики',10:'Золото спасено',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l24" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Сравнения'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r24Отв1=(к)=>{ S().ответ1=к; chRender(0); };
  window.r24Взвесить=(i)=>{ const s=S(); const взв=Array.isArray(s.взв2)?s.взв2.filter(x=>x!==i):[]; взв.push(i); s.взв2=взв; chRender(0); };
  window.r24Отв2=(к)=>{ const s=S(); s.ответ2=к; if(к===1) s.дело_весы=true; chRender(0); };
  window.r24Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r24Отв4=(к)=>{ const s=S(); s.ответ4=к; if(к===2) s.дело_звено=true; chRender(0); };
  window.r24Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r24Отв6=(к)=>{ const s=S(); s.ответ6=к; if(к===1) s.дело_коридор=true; chRender(0); };
  window.r24Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r24Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r24Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r24Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r24Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r24T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r24TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L24; else arr.push(L24); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA24={render:render, L:L24};
})();
