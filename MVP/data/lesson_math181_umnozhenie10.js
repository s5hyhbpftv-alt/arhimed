/* ====== МАТЕМАТИКА · УРОК 181 · «УМНОЖЕНИЕ ДЕСЯТИЧНЫХ ДРОБЕЙ НА 10 И 100» ==============
   5 класс. Переделан с нуля по эталону 1022 (deploy/ЭТАЛОН_УРОКА.md), рисунки —
   сцена из сюжета. Прежняя версия (vis_wk.js visW181) остаётся в общем файле;
   этот файл регистрируется поверх.

   ГЛАВНАЯ МЫСЛЬ. При умножении на 10 каждая цифра переходит в соседний,
   в 10 раз больший разряд: единицы — в десятки, десятые — в единицы. На
   записи это выглядит так: запятая сдвигается вправо на столько цифр,
   сколько нулей в 10, 100, 1000. Не хватает цифр — дописываем нули.
   Приписать ноль справа к дроби (3,25 → 3,250) — НЕ умножить.

   СЮЖЕТ. «Модель Сиракосии». Архимед строит для Гиерона самый большой
   корабль древности. Сначала он сделал маленькую модель; баркас будет в
   10 раз больше модели, а сам корабль — в 100 раз. Ученик на верфи
   переводит размеры модели в настоящие — ошибка в запятой, и мачта не
   влезет в гнездо.

   РУКАМИ: разрядная доска с глиняными фишками — кнопки «× 10», «× 100»:
   фишки съезжают влево на разряд, дописанный ноль подсвечен.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     3,25 · 10 = 32,5; 3,25 · 100 = 325; 0,4 · 100 = 40;
     5 сотых · 10 = 5 десятых; 2,4 · 10 = 24 (не 2,40);
     0,35 · 1000 = 350; 0,25 · 100 = 25; 3,7 · 100 = 370.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 181;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', ОХРА='#e0a060';
  const ИНК='#f5efe2', МУТ='#b8bfcf', ЛИНИЯ='#4d5a80', ОБВОД='#0c0a08';

  const ДЕЛА = [
    {ключ:'баркас', имя:'Мачта для баркаса',  итог:'32,5'},
    {ключ:'весло',  имя:'Весло Сиракосии',     итог:'40'},
    {ключ:'гвозди', имя:'Счёт за гвозди',       итог:'25 драхм'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* доска разрядов: значения храним в сотых (3,25 → 325) */
  const ДОСКИ = {
    2: {старт:325, множ:[10],     имя:'мачта модели'},
    3: {старт:325, множ:[100],    имя:'мачта модели'},
    4: {старт:40,  множ:[100],    имя:'весло модели'}
  };
  const РАЗРЯДЫ = [3,2,1,0,-1,-2];              /* показатель степени 10 */
  const ПОДПИСИ = ['1000','100','10','1','0,1','0,01'];

  const CSS=`
  #lvis .s6.l181{gap:14px}
  #lvis .s6.l181 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l181 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l181 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l181 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l181 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l181 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l181 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l181 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l181 .карт .текст b{color:${GOLD}}
  #lvis .s6.l181 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l181 .правило b{color:${GOLD}}
  #lvis .s6.l181 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(224,160,96,.16),rgba(224,160,96,.04));
    border:1.5px solid rgba(224,160,96,.55);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l181 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l181 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ОХРА}}
  #lvis .s6.l181 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l181 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l181 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l181 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l181 .лист li.есть{color:${ИНК}}
  #lvis .s6.l181 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l181 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l181 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l181 .ряд{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l181 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(224,160,96,.55);background:rgba(224,160,96,.13);color:${ИНК};padding:6px 4px;
    font-variant-numeric:tabular-nums;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l181 .ряд button:active{transform:translateY(2px);background:rgba(224,160,96,.28)}
  #lvis .s6.l181 .ряд button:disabled{opacity:.35;cursor:not-allowed}
  #lvis .s6.l181 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l181 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l181 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l181 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l181 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l181 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l181 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l181 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l181 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l181 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l181 .уровни .точка.сейчас{background:${GOLD};animation:l181dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l181dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l181 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l181{-webkit-text-size-adjust:100%}
  #lvis .s6.l181 [data-anim]{animation:l181rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l181rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l181 [data-anim]{animation:none!important}
    #lvis .s6.l181 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l181 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l181-style');
      if(!s){ s=document.createElement('style'); s.id='l181-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Верфь Сиракуз</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Заказ Гиерона</span><b class="${всё?'готово':''}">${
        всё?'корабль на воде':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}
           <span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };
  /* число из сотых в запись с запятой */
  const запись = (V) => { const ц=Math.floor(V/100), д=V%100;
    if(!д) return String(ц);
    return ц+','+(д<10?'0'+д:String(д)).replace(/0$/,''); };

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
  /* сдвиг один раз, с остановкой */
  const сдвигРаз = (от,до,длит) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" from="${от}" to="${до}" dur="${длит}"
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
      <linearGradient id="c181-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a6ab8"/><stop offset="0.6" stop-color="#9cc8ea"/><stop offset="1" stop-color="#f4e2bc"/>
      </linearGradient>
      <linearGradient id="c181-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a88b8"/><stop offset="1" stop-color="#1a4a78"/>
      </linearGradient>
      <radialGradient id="c181-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffae8"/><stop offset="0.4" stop-color="#ffe4a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c181-мастерская" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a1e16"/><stop offset="1" stop-color="#1a120c"/>
      </linearGradient>
      <linearGradient id="c181-доска" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9a6a3a"/><stop offset="0.5" stop-color="#7a4e28"/><stop offset="1" stop-color="#4a2c14"/>
      </linearGradient>
      <linearGradient id="c181-желоб" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2210"/><stop offset="1" stop-color="#5a3a1c"/>
      </linearGradient>
      <linearGradient id="c181-глина" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f0a870"/><stop offset="0.5" stop-color="#c8703e"/><stop offset="1" stop-color="#7a3a18"/>
      </linearGradient>
      <linearGradient id="c181-дерево" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6a4020"/><stop offset="0.45" stop-color="#b07a44"/><stop offset="1" stop-color="#5a3418"/>
      </linearGradient>
      <linearGradient id="c181-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b0743e"/><stop offset="0.5" stop-color="#7a4a22"/><stop offset="1" stop-color="#3a200c"/>
      </linearGradient>
      <linearGradient id="c181-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffe6a8"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </linearGradient>
      <radialGradient id="c181-серебро" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#c8ced8"/><stop offset="1" stop-color="#6a7280"/>
      </radialGradient>
      <radialGradient id="c181-медь" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffd0a8"/><stop offset="0.5" stop-color="#c0703a"/><stop offset="1" stop-color="#5a2a10"/>
      </radialGradient>
      <radialGradient id="c181-латунь" cx="0.35" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#fff0b0"/><stop offset="0.5" stop-color="#d8a840"/><stop offset="1" stop-color="#6a4a10"/>
      </radialGradient>
      <linearGradient id="c181-парус" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#e0d4b8"/><stop offset="0.5" stop-color="#faf4e4"/><stop offset="1" stop-color="#d0c2a0"/>
      </linearGradient>
      <radialGradient id="c181-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff0b0" stop-opacity=".8"/><stop offset="0.4" stop-color="#ffa040" stop-opacity=".3"/><stop offset="1" stop-color="#ff7020" stop-opacity="0"/>
      </radialGradient>
      <filter id="c181-тень" x="-30%" y="-30%" width="160%" height="170%">
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
    return `<g filter="url(#c181-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,10,8,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* мастерская: доски стен, балки, масляная лампа */
  const мастерская = (Н) => `<rect x="0" y="0" width="336" height="${Н}" fill="url(#c181-мастерская)"/>
    ${Array.from({length:9},(_,i)=>`<rect x="${i*38}" y="0" width="36" height="${Н}" fill="#2e2016" opacity=".6" data-декор="1"/>`).join('')}
    <rect x="0" y="18" width="336" height="10" fill="#4a3020"/>
    <circle cx="300" cy="44" r="46" fill="url(#c181-лампа)" data-декор="1">${анЛин('r','42;50;44;48;42','2.2s')}</circle>
    <path d="M292 50 q8 -6 16 0 l-2 6 h-12 z" fill="url(#c181-бронза)"/>
    <path d="M300 44 q-4 -6 0 -12 q4 6 0 12 z" fill="#ffd070">${анЛин('d','M300 44 q-4 -6 0 -12 q4 6 0 12 z;M300 44 q-3 -8 0 -14 q3 8 0 14 z;M300 44 q-4 -6 0 -12 q4 6 0 12 z','0.8s')}</path>`;
  /* корабль-модель: корпус, мачта, парус, вёсла */
  const корабль = (x,y,м,опц) => { const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c181-тень)">
      ${Array.from({length:9},(_,i)=>`<line x1="${-40+i*9}" y1="4" x2="${-44+i*9}" y2="16" stroke="#3a2010" stroke-width="1.2"/>`).join('')}
      <path d="M-56 -6 q4 16 20 18 h60 q16 -2 26 -18 l8 -2 l-8 -2 h-102 z" fill="url(#c181-корпус)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-58 -8 q-6 -10 2 -18" fill="none" stroke="#6a3a18" stroke-width="3.6"/>
      <line x1="-50" y1="-4" x2="56" y2="-4" stroke="#e0b060" stroke-width="1.2"/>
      <line x1="-50" y1="2" x2="56" y2="2" stroke="#e0b060" stroke-width=".8" opacity=".7"/>
      <circle cx="46" cy="-2" r="2.6" fill="#f4efe4"/><circle cx="46.6" cy="-2" r="1.2" fill="#1a0a06"/>
      <line x1="0" y1="-6" x2="0" y2="${-о.мачта||-58}" stroke="#4a2a10" stroke-width="2.6"/>
      <line x1="-22" y1="${-(о.мачта||58)+6}" x2="22" y2="${-(о.мачта||58)+6}" stroke="#4a2a10" stroke-width="1.6"/>
      <path d="M-20 ${-(о.мачта||58)+7} q20 6 40 0 v30 q-20 6 -40 0 z" fill="url(#c181-парус)" stroke="#a89878" stroke-width=".6">
        ${анЛин('d',`M-20 ${-(о.мачта||58)+7} q20 6 40 0 v30 q-20 6 -40 0 z;M-20 ${-(о.мачта||58)+7} q20 10 40 0 v30 q-20 10 -40 0 z;M-20 ${-(о.мачта||58)+7} q20 6 40 0 v30 q-20 6 -40 0 z`,'3s')}</path>
      <rect x="-20" y="${-(о.мачта||58)+18}" width="40" height="5" fill="#b03a28" opacity=".85"/>
      ${[-12,0,12].map(d=>`<line x1="0" y1="${-(о.мачта||58)}" x2="${d*4}" y2="-6" stroke="#6a5a40" stroke-width=".5"/>`).join('')}</g>`;
  };
  /* глиняная фишка с цифрой */
  const фишка = (x,y,цифра,опц) => { const о=опц||{};
    return `<g filter="url(#c181-тень)">
      <rect x="${x-18}" y="${y-22}" width="36" height="44" rx="8" fill="url(#c181-глина)" stroke="${о.новый?GOLD:'#5a2a10'}" stroke-width="${о.новый?2.6:1}"/>
      <rect x="${x-13}" y="${y-17}" width="26" height="34" rx="5" fill="none" stroke="rgba(255,230,200,.35)" stroke-width="1"/>
      ${т(x,y+9,String(цифра),24,о.новый?'#fff4d0':'#3a1606',true)}</g>`;
  };

  /* ================= ДОСКА РАЗРЯДОВ ================= */
  const ШК = 46, X0 = 30;                          /* ширина колонки, левый край */
  const колонка = (j) => X0 + РАЗРЯДЫ.indexOf(j)*ШК + ШК/2;
  const цифры = (V) => { /* V в сотых → {показатель: цифра}, только значащий диапазон */
    const res={}; const str=String(V); const высший=str.length-1-2;
    let низший=-2; while(низший<0 && Math.floor(V/Math.pow(10,низший+2))%10===0 && V>0) низший++;
    const от=Math.max(высший,0), до=Math.min(низший,0);
    for(let j=от;j>=до;j--) res[j]=Math.floor(V/Math.pow(10,j+2))%10;
    return res; };
  function доскаРазрядов(V, пред, шаг, Н, y){
    const сейчас=цифры(V), было=пред!=null?цифры(пред):null;
    const новые=new Set(); if(было && шаг){ Object.keys(сейчас).map(Number).forEach(j=>{ if(!(j-шаг in было)) новые.add(j); }); }
    const сдвиг = шаг ? шаг*ШК : 0;
    return `<g filter="url(#c181-тень)"><rect x="${X0-10}" y="${y-44}" width="${РАЗРЯДЫ.length*ШК+20}" height="112" rx="10" fill="url(#c181-доска)"/></g>
      ${РАЗРЯДЫ.map((j,i)=>`<rect x="${X0+i*ШК+4}" y="${y-28}" width="${ШК-8}" height="56" rx="6" fill="url(#c181-желоб)"/>
        ${т(X0+i*ШК+ШК/2,y-32,ПОДПИСИ[i],11,'#f4dcae',true)}`).join('')}
      <g filter="url(#c181-тень)"><circle cx="${X0+4*ШК}" cy="${y+18}" r="6" fill="url(#c181-латунь)" stroke="#5a3a10"/>
        <path d="M${X0+4*ШК-2} ${y+22} q-2 8 -6 10" stroke="#8a6a20" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      <g>${шаг?сдвигРаз(сдвиг+' 0','0 0','0.8s'):''}
        ${Object.entries(сейчас).map(([j,ц])=>фишка(колонка(+j),y,ц,{новый:новые.has(+j)})).join('')}</g>
      ${т(168,y+54,'на доске: '+запись(V),16,'#fff0c8',true,undefined,'#3a2210')}
      ${новые.size?т(168,y+74,'ноль дописали',12,GOLD,true,undefined,'#1a120c'):''}`;
  }

  /* ================= КАДРЫ ================= */

  /* 1. Верфь */
  function F1(s){
    const Н=320, в=s.ответ1;
    return ЛИСТ(s) +
      ЗАДАЧА('Царь Гиерон заказал Архимеду <b>самый большой корабль</b> на свете — «Сиракосию». Архимед начал с маленькой модели: её мачта — <b>3,25 локтя</b>. Настоящий корабль будет в <b>100 раз</b> больше модели, а баркас для него — в <b>10 раз</b>. Ученик отвечает за мерки: одна ошибка в запятой — и мачта не встанет в гнездо.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c181-небо)"/>
        <circle cx="60" cy="50" r="44" fill="url(#c181-солнце)"/>
        <rect x="0" y="150" width="336" height="60" fill="url(#c181-море)"/>
        ${[0,1].map(i=>`<path d="M${-20+i*14} ${162+i*16} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#dff2ff" stroke-width="1" opacity=".5" stroke-dasharray="14 18">${анЛин('stroke-dashoffset','0;-32',(3+i*0.6).toFixed(1)+'s')}</path>`).join('')}
        <g filter="url(#c181-тень)">
          <path d="M120 170 L320 170 L330 150 L112 150 Z" fill="#8a7050"/>
          <path d="M140 150 q80 30 180 0" fill="none" stroke="#6a4020" stroke-width="4"/>
          <path d="M136 146 q90 22 184 -2" fill="none" stroke="#4a2a10" stroke-width="5"/>
          ${Array.from({length:10},(_,i)=>{ const x=146+i*18, h=52+Math.sin(i/9*Math.PI)*10; return `<path d="M${x} ${148+Math.sin(i/9*Math.PI)*4} q${i<5?-6:6} ${-h*0.5} 0 ${-h}" fill="none" stroke="url(#c181-дерево)" stroke-width="3.4" stroke-linecap="round"/>`; }).join('')}
          ${[104,118].map(y=>`<path d="M142 ${y} q88 10 176 0" fill="none" stroke="#8a5a2a" stroke-width="1.6" opacity=".8"/>`).join('')}
          <line x1="144" y1="92" x2="316" y2="92" stroke="#6a4020" stroke-width="3"/>
          <line x1="300" y1="20" x2="300" y2="150" stroke="#5a3418" stroke-width="4"/><line x1="300" y1="24" x2="230" y2="40" stroke="#5a3418" stroke-width="3"/>
          <line x1="236" y1="38" x2="236" y2="76" stroke="#3a3a3a" stroke-width="1.2" stroke-dasharray="2 1.5"/>
          <g>${анСдвиг('0 0;0 -14;0 0','4s','0;0.5;1')}<rect x="226" y="76" width="22" height="10" fill="url(#c181-дерево)"/></g></g>
        ${[[170,140],[270,140]].map(([x,y],i)=>`<g filter="url(#c181-тень)"><circle cx="${x}" cy="${y-18}" r="4" fill="#c89068"/><path d="M${x-5} ${y} q0 -12 5 -14 q5 2 5 14 z" fill="${i?'#4a6a8a':'#8a3a2a'}"/></g>`).join('')}
        <rect x="0" y="206" width="336" height="${Н-206}" fill="#6a4a2a"/>
        <g filter="url(#c181-тень)"><rect x="20" y="236" width="296" height="16" rx="3" fill="url(#c181-дерево)"/>
          <rect x="30" y="252" width="10" height="${Н-262}" fill="#4a2a10"/><rect x="296" y="252" width="10" height="${Н-262}" fill="#4a2a10"/></g>
        ${корабль(112,226,0.62,{мачта:74})}
        <g filter="url(#c181-тень)"><rect x="206" y="222" width="100" height="12" fill="#e8d4a0" stroke="#8a6a3a"/>
          ${Array.from({length:21},(_,i)=>`<line x1="${208+i*4.8}" y1="222" x2="${208+i*4.8}" y2="${i%5?227:230}" stroke="#5a3a18" stroke-width=".8"/>`).join('')}</g>
        ${т(256,216,'мачта: 3,25',13,'#fff4d0',true,undefined,'#3a2410')}
        ${подпись(168,30, в===1?'2 — это десятые':'3,25 = 3 целых 25 сотых', в===1?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['3','2','5'],1,в,'r181Отв1') +
      (в==null ? СКАЗ('Вопрос','Какая цифра в числе 3,25 стоит в разряде <b>десятых</b>?') :
        РАЗБОР(в===1, ['3 стоит до запятой — это <b>единицы</b>. Десятые — первая цифра после запятой: <b>2</b>.','Сразу после запятой — <b>десятые</b> (2), дальше — сотые (5). До запятой — целые (3).','5 — вторая после запятой, это <b>сотые</b>. Десятые — 2.'][в])) +
      (в===1 ? ПРАВИЛО('После запятой идут <b>десятые</b>, потом <b>сотые</b>. Каждый разряд в 10 раз меньше соседа слева.') : '');
  }

  /* 2–4. Доска разрядов */
  function FДоска(s,f,текст,вопрос,варианты,верный,разборы,правило,дело){
    const д=ДОСКИ[f], V=s['V'+f]||д.старт, пред=s['пред'+f], шаг=s['шаг'+f]||0, в=s['ответ'+f];
    const Н=250, y=128, сделан = V!==д.старт;
    return ЛИСТ(s) + ЗАДАЧА(текст) +
      `<div class="pic">${свг(`
        ${мастерская(Н)}
        ${доскаРазрядов(V,пред,шаг,Н,y)}
        ${т(168,58,д.имя+': '+запись(д.старт),14,'#f4dcae',true)}
        ${подпись(168,Н-12, сделан ? запись(д.старт)+' · '+(V/д.старт)+' = '+запись(V) : 'нажми кнопку — следи за фишками', сделан?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд">${д.множ.map(m=>BTN(3,'','× '+m,"r181Множ("+f+","+m+")",сделан)).join('')}${BTN(3,'','↺ сначала',"r181Сначала("+f+")",!сделан)}</div>` +
      ОТВЕТЫ('три',варианты,верный,в,'r181ОтвД'+f) +
      (в==null ? СКАЗ('Вопрос',вопрос) : РАЗБОР(в===верный, разборы[в])) +
      (в===верный ? ПРАВИЛО(правило) : '');
  }
  const F2 = (s) => FДоска(s,2,
    'Первый заказ — <b>баркас</b>: он в <b>10 раз</b> больше модели. Мачта модели — 3,25 локтя. Ученик раскладывает цифры на доске разрядов: каждая глиняная фишка стоит в своём желобке. Что будет, если всё умножить на 10?',
    'Предскажи: 3,25 · 10 = ?', ['3,250','32,5','325'],1,
    ['3,250 — это то же 3,25: ноль справа ничего не меняет. При · 10 каждая цифра уходит в <b>старший</b> разряд: <b>32,5</b>.','3 единицы стали 3 десятками, 2 десятых — 2 единицами, 5 сотых — 5 десятыми: <b>32,5</b>. Запятая как бы шагнула на одну цифру вправо.','325 — это · 100, два шага. При · 10 — один шаг: <b>32,5</b>.'],
    '<b>· 10</b> — каждая цифра переходит в соседний, в 10 раз больший разряд: запятая сдвигается <b>на одну цифру вправо</b>.');
  const F3 = (s) => FДоска(s,3,
    'Теперь сама <b>Сиракосия</b> — в <b>100 раз</b> больше модели. Та же мачта 3,25 локтя. На сколько разрядов поедут фишки?',
    'Предскажи: 3,25 · 100 = ?', ['32,5','325','3250'],1,
    ['32,5 — это один шаг (· 10). В 100 два нуля — <b>два шага</b>: 325.','Два нуля — два шага влево для цифр: 3 → сотни, 2 → десятки, 5 → единицы. <b>325</b> — и запятая в конце уже не нужна.','3250 — три шага, это · 1000. В сотне два нуля: <b>325</b>.'],
    '<b>· 100</b> — два шага, <b>· 1000</b> — три. Сколько нулей в множителе, на столько цифр сдвигается запятая.');
  const F4 = (s) => FДоска(s,4,
    'Весло модели — <b>0,4</b> локтя. Весло Сиракосии в <b>100 раз</b> длиннее. Но после запятой всего одна цифра, а шагов нужно два…',
    'Предскажи: 0,4 · 100 = ?', ['4','40','0,400'],1,
    ['4 — это 0,4 · 10, один шаг. Для второго шага цифр не хватило — <b>дописываем ноль</b>: 40.','4 десятых · 100 = 40 целых. Второй шаг «в пустоту» — там появляется <b>ноль</b>: <b>40</b>.','0,400 — это всё то же 0,4: нули справа от дроби ничего не меняют. Нужно 40.'],
    'Не хватает цифр для шагов — <b>дописывай нули</b> справа.');

  /* 5. Почему — монеты */
  function F5(s){
    const Н=280, в=s.ответ5;
    const монета = (x,y,r,мат,подп) => `<g filter="url(#c181-тень)"><circle cx="${x}" cy="${y}" r="${r}" fill="url(#c181-${мат})" stroke="rgba(0,0,0,.35)" stroke-width=".8"/>
      <circle cx="${x}" cy="${y}" r="${r*0.78}" fill="none" stroke="rgba(0,0,0,.2)" stroke-width=".6" stroke-dasharray="1.2 1.6"/>${подп?т(x,y+4,подп,r>10?11:9,'#2a1606',true):''}</g>`;
    const ряд = (y,набор,ярл) => `${т(20,y+5,ярл,13,МУТ,true,'start')}` + набор.map(([n,r,мат,подп],i)=>
      Array.from({length:n},(_,k)=>монета(96+i*80+(k%3)*18, y-6+Math.floor(k/3)*16, r, мат, подп)).join('')).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('Мастер Никон не понимает, почему «запятая едет». Ученик высыпает на верстак монеты: большая серебряная — <b>1</b> драхма, бронзовая — <b>0,1</b>, медная — <b>0,01</b>. 3,25 драхмы — это 3 серебряных, 2 бронзовых и 5 медных. Если каждую монету заменить на ту, что в <b>10 раз</b> дороже, во что превратятся 5 медных?') +
      `<div class="pic">${свг(`
        ${мастерская(Н)}
        <rect x="10" y="50" width="316" height="${Н-94}" rx="10" fill="url(#c181-доска)" filter="url(#c181-тень)"/>
        ${т(116,72,'по 1 драхме',11,'#f4dcae',true)}${т(196,72,'по 0,1',11,'#f4dcae',true)}${т(276,72,'по 0,01',11,'#f4dcae',true)}
        ${ряд(104,[[3,13,'серебро','1'],[2,10,'латунь','0,1'],[5,7,'медь','']],'было')}
        <g>${вырасти('6s',0.3)}${т(20,176,'· 10',13,GOLD,true,'start')}
          ${монета(44,212,15,'серебро','')}${т(44,216,'10',10,'#2a1606',true)}${т(64,216,'×3',12,'#f4dcae',true,'start')}
          ${ряд(196,[[2,13,'серебро','1'],[5,10,'латунь','0,1'],[0,7,'медь','']],'')}</g>
        ${подпись(168,Н-12, в===1?'5 сотых · 10 = 5 десятых':'каждая монета — в 10 раз дороже', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['5 единиц','5 десятых','5 тысячных'],1,в,'r181Отв5') +
      (в==null ? СКАЗ('Вопрос','Во что превратятся 5 сотых при · 10?') : РАЗБОР(в===1, ['До единиц далеко: сотая в 10 раз меньше десятой. 5 сотых · 10 = <b>5 десятых</b>.','Медная (0,01) · 10 = бронзовая (0,1). 5 сотых → <b>5 десятых</b>, 2 десятых → 2 единицы, 3 единицы → 3 десятка: 32,5.','Тысячные — это умножение наоборот, деление. · 10 даёт <b>5 десятых</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Запятая стоит на месте — это <b>цифры переезжают</b> в разряд в 10 раз больше. На письме кажется, что запятая шагнула вправо.') : '');
  }

  /* 6. Ошибка подмастерья */
  function F6(s){
    const Н=240, в=s.ответ6;
    return ЛИСТ(s) +
      ЗАДАЧА('Подмастерье Дексий считает доски для палубы: одна доска модели — <b>2,4</b> пяди, у баркаса в <b>10 раз</b> больше. Он пишет: «2,4 · 10 = <b>2,40</b>» — «ведь умножить на 10 — значит приписать ноль!» Сколько на самом деле?') +
      `<div class="pic">${свг(`
        ${мастерская(Н)}
        <g filter="url(#c181-тень)"><rect x="40" y="56" width="256" height="104" rx="4" fill="#e8d8b0"/>
          ${Array.from({length:5},(_,i)=>`<line x1="48" y1="${76+i*18}" x2="288" y2="${76+i*18}" stroke="#c8b488" stroke-width=".6"/>`).join('')}</g>
        ${т(168,98,'2,4 · 10 = 2,40',22,'#3a2410',true)}
        <g>${анЛин('opacity','1;0.35;1','1.2s')}<ellipse cx="250" cy="91" rx="32" ry="17" fill="none" stroke="${RED}" stroke-width="2.6"/></g>
        ${т(168,136,в===1?'2,4 · 10 = 24':'2,40 = 2,4 — то же самое число!',15,в===1?'#1a6a3a':'#a02a1a',true)}
        ${подпись(168,Н-12, в===1?'ноль приписывают к целым, а не к дробям':'ноль справа у дроби ничего не меняет', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2,40','24','240'],1,в,'r181Отв6') +
      (в==null ? СКАЗ('Вопрос','Сколько на самом деле 2,4 · 10?') : РАЗБОР(в===1, ['2,40 и 2,4 — одно и то же число: 4 десятых = 40 сотых. Число не выросло. Правильно — <b>24</b>.','Один шаг вправо: 2,4 → <b>24</b>. «Приписать ноль» работает только для <b>целых</b> чисел: 24 · 10 = 240.','240 — это два шага, · 100. Для · 10 — один: <b>24</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Приписать ноль к <b>дроби</b> — не умножить: 3,25 = 3,250. У дробей двигаем <b>запятую</b>.') : '');
  }

  /* 7. Якорная цепь × 1000 */
  function F7(s){
    const Н=260, в=s.ответ7;
    return ЛИСТ(s) +
      ЗАДАЧА('Для якоря Сиракосии куют цепь из <b>1000</b> звеньев, каждое длиной <b>0,35</b> локтя. Какой длины будет вся цепь?') +
      `<div class="pic">${свг(`
        ${мастерская(Н)}
        <g filter="url(#c181-тень)">
          <path d="M60 196 h80 l-8 20 h-64 z" fill="#3a3a40"/><rect x="92" y="150" width="16" height="46" fill="#4a4a52"/>
          <circle cx="100" cy="150" r="14" fill="url(#c181-лампа)" opacity=".7">${анЛин('r','10;18;10','1s')}</circle></g>
        ${Array.from({length:9},(_,i)=>{ const x=150+i*18, y=120+Math.sin(i*0.9)*18;
          return `<ellipse cx="${x}" cy="${y.toFixed(1)}" rx="10" ry="6" fill="none" stroke="#8a909c" stroke-width="3.2" transform="rotate(${i%2?70:0} ${x} ${y.toFixed(1)})"/>`; }).join('')}
        <g filter="url(#c181-тень)" transform="translate(300 176)">
          <path d="M0 -40 v50 M-16 -26 h32 M-20 0 q20 26 40 0" fill="none" stroke="#6a707c" stroke-width="5" stroke-linecap="round"/>
          <circle cx="0" cy="-44" r="5" fill="none" stroke="#6a707c" stroke-width="3"/></g>
        ${т(168,62,'0,35 · 1000 = ?',18,GOLD,true,undefined,'#1a120c')}
        ${подпись(168,Н-12, в===1?'три шага: 0,35 → 3,5 → 35 → 350':'в 1000 три нуля', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['35','350','3500'],1,в,'r181Отв7') +
      (в==null ? СКАЗ('Вопрос','Длина цепи в локтях?') : РАЗБОР(в===1, ['35 — это · 100, два шага. В тысяче три нуля — три шага: <b>350</b>.','Три шага: 0,35 → 3,5 → 35 → <b>350</b> (третий шаг — дописанный ноль).','3500 — четыре шага, · 10 000. Для · 1000 — три: <b>350</b>.'][в])) +
      (в===1 ? ПРАВИЛО('<b>· 1000</b> — запятая на <b>три</b> цифры вправо; не хватает цифр — нули.') : '');
  }

  /* 8. Гвозди */
  function F8(s){
    const Н=240, в=s.ответ8;
    return ЛИСТ(s) +
      ЗАДАЧА('Кузнец приносит счёт: бронзовый гвоздь стоит <b>0,25</b> драхмы, для обшивки куплено <b>100</b> гвоздей. Кузнец требует 250 драхм. Сколько нужно заплатить на самом деле?') +
      `<div class="pic">${свг(`
        ${мастерская(Н)}
        ${Array.from({length:30},(_,i)=>{ const x=40+(i%10)*26, y=90+Math.floor(i/10)*30;
          return `<g transform="translate(${x} ${y}) rotate(${(i*37)%40-20})" filter="url(#c181-тень)"><rect x="-1.6" y="-10" width="3.2" height="18" fill="url(#c181-бронза)"/><rect x="-4" y="-12" width="8" height="3" rx="1" fill="url(#c181-бронза)"/></g>`; }).join('')}
        ${т(168,62,'100 гвоздей по 0,25',16,'#f4dcae',true)}
        ${т(168,Н-44,'кузнец: «250 драхм!»',14,RED,true)}
        ${подпись(168,Н-12, в===1?'0,25 · 100 = 25 драхм':'сколько шагов для · 100?', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2,5','25','250'],1,в,'r181Отв8') +
      (в==null ? СКАЗ('Вопрос','Сколько драхм заплатить?') : РАЗБОР(в===1, ['2,5 — это · 10, один шаг. Для 100 гвоздей — два шага: <b>25</b>.','0,25 · 100: два шага вправо — <b>25</b> драхм. Кузнец сдвинул запятую на три шага и хотел взять в 10 раз больше!','250 — три шага (· 1000). Кузнец ошибся — или схитрил. Правильно: <b>25</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Цена одной · 100 штук = цена со сдвинутой на <b>две</b> цифры запятой.') : '');
  }

  /* 9. Обратная задача */
  function F9(s){
    const Н=250, в=s.ответ9;
    return ЛИСТ(s) +
      ЗАДАЧА('Ширина палубы модели — <b>3,7</b> локтя, а у настоящего корабля — <b>370</b> локтей. Во сколько раз корабль больше модели?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c181-небо)"/>
        <rect x="0" y="140" width="336" height="${Н-140}" fill="url(#c181-море)"/>
        ${корабль(90,150,0.4,{мачта:70})}${корабль(230,170,1.1,{мачта:80})}
        ${т(90,196,'3,7',16,'#fff4d0',true,undefined,'#1a2a4a')}${т(230,214,'370',18,'#fff4d0',true,undefined,'#1a2a4a')}
        <path d="M110 196 q50 -30 90 0" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 4">${анЛин('stroke-dashoffset','0;-18','1s')}</path>
        ${т(155,176,'× ?',16,GOLD,true,undefined,'#1a2a4a')}
        ${подпись(168,Н-10, в===1?'3,7 → 37 → 370: два шага — · 100':'сколько шагов сделала запятая?', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['в 10 раз','в 100 раз','в 1000 раз'],1,в,'r181Отв9') +
      (в==null ? СКАЗ('Вопрос','Во сколько раз больше?') : РАЗБОР(в===1, ['· 10 дало бы 37. До 370 нужен ещё шаг: всего два — <b>в 100 раз</b>.','3,7 → 37 → 370: запятая шагнула на две цифры (второй раз — с дописанным нулём). <b>В 100 раз</b>.','· 1000 дало бы 3700. Шагов два: <b>в 100 раз</b>.'][в])) +
      (в===1 ? ПРАВИЛО('Сосчитай шаги запятой — узнаешь, сколько нулей в множителе.') : '');
  }

  /* 10. Спуск на воду */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=300;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Мачта встала в гнездо точно, вёсла ровно легли в уключины, счёт кузнеца исправлен. Корабль так велик, что столкнуть его в море не могут сотни людей — тогда Архимед ставит блоки с воротом, и Гиерон один поворачивает рукоять. «Сиракосия» скользит в воду. Царь говорит: «Отныне Архимеду верить во всём».'
        : 'Заказ ещё не готов — вернись к делам в списке. Вот главное.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c181-небо)"/>
        <circle cx="280" cy="50" r="44" fill="url(#c181-солнце)"/>
        <rect x="0" y="170" width="336" height="${Н-170}" fill="url(#c181-море)"/>
        ${[0,1,2].map(i=>`<path d="M${-20+i*14} ${184+i*18} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none" stroke="#dff2ff" stroke-width="1" opacity=".5" stroke-dasharray="14 18">${анЛин('stroke-dashoffset','0;-32',(3+i*0.6).toFixed(1)+'s')}</path>`).join('')}
        <g>${анСдвиг('-40 -12;30 0;30 0','8s','0;0.7;1')}${корабль(150,186,1.9,{мачта:80})}</g>
        <path d="M0 150 L96 176 L96 ${Н} L0 ${Н} Z" fill="#8a7050"/>
        <g>${проявить('9s',0.1,0.2)}${подпись(168,30,'· 10 — на одну цифру вправо',GOLD,12)}</g>
        <g>${проявить('9s',0.3,0.4)}${подпись(168,58,'· 100 — на две, · 1000 — на три',GOLD,12)}</g>
        <g>${проявить('9s',0.5,0.6)}${подпись(168,Н-12,'не хватает цифр — пиши нули',GREEN,13)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','При умножении на 10, 100, 1000 каждая цифра переходит в разряд в 10, 100, 1000 раз больше. На записи запятая сдвигается <b>вправо</b> на столько цифр, сколько нулей в множителе. Не хватает цифр — дописываем нули. Запятая в конце числа пропадает. Приписать ноль к дроби — <b>не</b> умножить.') +
      ПРАВИЛО('<b>Сколько нулей — столько шагов вправо.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'4,7 · 10 = ?', варианты:[{т:'47',ок:true},{т:'4,70',ок:false}], разбор:'Один шаг вправо.' },
    { вопрос:'0,06 · 100 = ?', варианты:[{т:'0,6',ок:false},{т:'6',ок:true}], разбор:'Два шага: 0,06 → 0,6 → 6.' },
    { вопрос:'1,2 · 100 = ?', варианты:[{т:'120',ок:true},{т:'12',ок:false}], разбор:'Второй шаг — дописать ноль.' },
    { вопрос:'5,125 · 1000 = ?', варианты:[{т:'512,5',ок:false},{т:'5125',ок:true}], разбор:'Три шага.' },
    { вопрос:'Тетрадь стоит 0,8 драхмы. Сколько стоят 10 тетрадей?', варианты:[{т:'8',ок:true},{т:'0,80',ок:false}], разбор:'0,8 · 10 = 8.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r181Reset()")}</div>` +
        ПРАВИЛО('<b>Сколько нулей — столько шагов.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r181Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'· 10', задания:[
    {q:'6,3 · 10 = ?', в:1, варианты:['6,30','63'], раз:'Один шаг.'},
    {q:'0,9 · 10 = ?', в:0, варианты:['9','90'], раз:'Один шаг: 9.'},
    {q:'12,05 · 10 = ?', в:1, варианты:['12,50','120,5'], раз:'Один шаг: 120,5.'},
    {q:'0,07 · 10 = ?', в:0, варианты:['0,7','7'], раз:'Один шаг: 0,7.'}
  ]};
  const Т2 = { имя:'· 100 и · 1000', задания:[
    {q:'2,5 · 100 = ?', в:1, варианты:['25','250'], раз:'Два шага, ноль дописали.'},
    {q:'0,015 · 1000 = ?', в:0, варианты:['15','1,5'], раз:'Три шага.'},
    {q:'7 · 100 = ?', в:1, варианты:['7,00','700'], раз:'У целого — два нуля.'},
    {q:'0,3 · 1000 = ?', в:0, варианты:['300','30'], раз:'Три шага, два нуля дописали.'}
  ]};
  const Т3 = { имя:'Задачи', задания:[
    {q:'Карандаш весит 5,4 г. Сколько весят 100 карандашей?', в:1, варианты:['54 г','540 г'], раз:'5,4 · 100 = 540.'},
    {q:'На сколько цифр сдвинуть запятую при · 10 000?', в:0, варианты:['на 4','на 5'], раз:'Четыре нуля.'},
    {q:'0,48 · ? = 48', в:1, варианты:['10','100'], раз:'Два шага.'},
    {q:'Верно ли: 3,6 · 10 = 3,60?', в:1, варианты:['да','нет'], раз:'3,6 · 10 = 36.'}
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
        в, "r181T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r181TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L181 = {
    id: ID,
    title: 'Умножение десятичных дробей на 10 и 100',
    ico: '🔟',
    src: 'Математика · 5 класс · Десятичные дроби',
    subj: 'math',
    explain: [
      'Архимед строит «Сиракосию» по маленькой модели. Мачта модели — 3,25 локтя: 3 единицы, 2 десятых, 5 сотых.',
      'Баркас в 10 раз больше модели: 3,25 · 10 = 32,5. Каждая цифра ушла в соседний, в 10 раз больший разряд — запятая сдвинулась на одну цифру вправо.',
      'Корабль в 100 раз больше: 3,25 · 100 = 325 — два шага, сколько нулей в 100.',
      'Весло 0,4 · 100 = 40: цифр для второго шага не хватило — дописали ноль.',
      'Почему так: 5 сотых · 10 = 5 десятых, 2 десятых · 10 = 2 единицы, 3 единицы · 10 = 3 десятка.',
      'Приписать ноль к дроби — не умножить: 2,4 · 10 = 24, а 2,40 — то же, что 2,4.',
      '0,35 · 1000 = 350: три шага, третий — с дописанным нулём.',
      '100 гвоздей по 0,25 драхмы — 25 драхм, а не 250.',
      'Обратная задача: 3,7 → 370 — запятая шагнула на две цифры, значит, умножили на 100.',
      'Итог: сколько нулей в множителе, на столько цифр вправо сдвигается запятая; не хватает цифр — дописываем нули.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: умножение на 10.',
      'Тренажёр 2: умножение на 100 и 1000.',
      'Тренажёр 3: задачи.'
    ],
    check: {
      q: 'Чему равно 3,25 · 10?',
      choices: ['3,250','32,5','0,325'],
      ans: 1,
      exp: 'Один ноль — один шаг вправо: 3,25 · 10 = 32,5. Не 3,250 и не 0,325.'
    },
    tasks: [
      { q:'Чему равно 0,4 · 100?', kind:'unit', ans:40, tol:0,
        hints:['На сколько цифр перенести запятую при · 100?','На две: 0,4 → 4 → 40 (дописали ноль).'], sol:'0,4 · 100 = 40.' },
      { q:'Чему равно 1,05 · 10?', kind:'choice', choices:['1,050','10,5','105'], ans:1,
        hints:['Перенеси запятую на одну цифру вправо.','1,05 → 10,5.'], sol:'1,05 · 10 = 10,5.' },
      { q:'Гвоздь стоит 0,25 драхмы. Сколько драхм стоят 100 гвоздей?', kind:'unit', ans:25, tol:0,
        hints:['0,25 · 100.','Два шага вправо.'], sol:'25.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L181.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Верфь Сиракуз',2:'Баркас: · 10',3:'Корабль: · 100',4:'Весло: не хватает цифр',5:'Почему едет запятая',
      6:'Ошибка подмастерья',7:'Якорная цепь',8:'Счёт кузнеца',9:'Во сколько раз',10:'Спуск на воду',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l181" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Десятичные дроби'}</h2>${сцена}</div>`;
    /* сдвиг проигран — дальше рисуем без анимации */
    [2,3,4].forEach(k=>{ s['шаг'+k]=0; });
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r181Отв1=(к)=>{ S().ответ1=к; chRender(0); };
  window.r181Множ=(f,m)=>{ const s=S(), д=ДОСКИ[f], V=s['V'+f]||д.старт;
    s['пред'+f]=V; s['V'+f]=V*m; s['шаг'+f]=String(m).length-1; chRender(0); };
  window.r181Сначала=(f)=>{ const s=S(); s['V'+f]=ДОСКИ[f].старт; s['пред'+f]=null; s['шаг'+f]=0; chRender(0); };
  [2,3,4].forEach(f=>{ window['r181ОтвД'+f]=(к)=>{ const s=S(); s['ответ'+f]=к;
    if(к===1 && f===2) s.дело_баркас=true; if(к===1 && f===4) s.дело_весло=true; chRender(0); }; });
  window.r181Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r181Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r181Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r181Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===1) s.дело_гвозди=true; chRender(0); };
  window.r181Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r181Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r181Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r181T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r181TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L181; else arr.push(L181); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA181={render:render, L:L181};
})();
