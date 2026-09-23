/* ====== МАТЕМАТИКА · УРОК 389 · «УГЛЫ И ТРЕУГОЛЬНИКИ: ПРИЁМЫ» ====================
   5–6 класс, олимпиадная геометрия. Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (vis_wk.js visW389, vis_bw.js) остаются в общих файлах; этот файл
   регистрируется поверх.

   СЮЖЕТ. Легенда о зеркалах Архимеда: римские галеры у стен, и солнечные
   зайчики бронзовых зеркал слепят кормчих. Чтобы навести луч, надо считать
   углы. Ход квеста — три дела: сложить углы треугольника, навести луч на
   галеру, найти сумму углов звезды.

   ПРИЁМЫ (от простого к олимпиадному):
     сумма углов треугольника 180° — три угла, сложенные вместе, дают прямую;
     равнобедренный: углы при основании равны, (180 − вершина) : 2;
     внешний угол = сумма двух внутренних, не смежных с ним;
     зеркало: угол падения равен углу отражения (руками — поворот зеркала);
     «угловая охота» в треугольнике 36°–72°–72° с биссектрисой;
     пятиконечная звезда: сумма углов при вершинах 180°;
     часы 3:30 — 75°, а не 90° (часовая стрелка тоже ушла);
     сумма углов n-угольника (n − 2) · 180°.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     вершина 40° → (180 − 40) : 2 = 70°; вершина 100° → 40°;
     A = 50°, B = 60° → C = 70°, внешний при C = 110° = 50° + 60°;
     зеркало: солнце (30;40), зеркало в точке (90;200), галера (278;134);
       при повороте зеркала на 25° отражённый луч r = 2(d·m)m − d идёт в
       галеру (промах при 20° и 30° — около 35 единиц мимо, допуск 16);
     36°–72°–72°, биссектриса угла 72° делит его на 36° и 36°: угол BDC =
       180 − 36 − 72 = 72°;
     звезда: пять углов по 36° = 180°;
     3:30 — минутная на 180°, часовая на 90 + 15 = 105°: 75°;
     шестиугольник: 4 треугольника — 720°.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. */
(function(){
  'use strict';

  const ID = 389;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', СОЛНЦЕ='#fff1b0';
  const ИНК='#f5efe2', МУТ='#c2bccf', ЛИНИЯ='#4d5a80', ОБВОД='#0f0c08';
  const УГ1='#e8705a', УГ2='#5f9be8', УГ3='#6fbf7f';

  const ДЕЛА = [
    {ключ:'сумма',   имя:'Сложить углы треугольника', итог:'180°'},
    {ключ:'зеркало', имя:'Навести луч на галеру',      итог:'попадание'},
    {ключ:'звезда',  имя:'Сумма углов звезды',         итог:'180°'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l389{gap:14px}
  #lvis .s6.l389 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l389 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l389 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l389 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l389 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l389 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l389 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l389 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l389 .карт .текст b{color:${GOLD}}
  #lvis .s6.l389 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l389 .правило b{color:${GOLD}}
  #lvis .s6.l389 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.04));
    border:1.5px solid rgba(255,215,106,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l389 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l389 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${GOLD}}
  #lvis .s6.l389 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l389 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l389 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l389 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l389 .лист li.есть{color:${ИНК}}
  #lvis .s6.l389 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l389 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l389 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l389 .рычаг{display:grid;grid-template-columns:64px 1fr 64px;gap:8px;align-items:center;width:100%}
  #lvis .s6.l389 .рычаг button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:22px;font-weight:700;
    border:1.5px solid rgba(255,215,106,.55);background:rgba(255,215,106,.12);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l389 .рычаг button:active{transform:translateY(2px);background:rgba(255,215,106,.26)}
  #lvis .s6.l389 .рычаг button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l389 .рычаг b{text-align:center;font-size:18px;color:${GOLD};font-variant-numeric:tabular-nums}
  #lvis .s6.l389 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l389 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l389 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l389 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l389 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l389 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l389 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:20px}
  #lvis .s6.l389 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l389 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l389 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l389 .уровни .точка.сейчас{background:${GOLD};animation:l389dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l389dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l389 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l389{-webkit-text-size-adjust:100%}
  #lvis .s6.l389 [data-anim]{animation:l389rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l389rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l389 [data-anim]{animation:none!important}
    #lvis .s6.l389 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l389 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l389-style');
      if(!s){ s=document.createElement('style'); s.id='l389-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Зеркала Архимеда</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Оборона стены</span><b class="${всё?'готово':''}">${
        всё?'флот ослеплён':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <linearGradient id="c389-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3f7cc4"/><stop offset="0.6" stop-color="#9fcaea"/><stop offset="1" stop-color="#f6e0b0"/>
      </linearGradient>
      <radialGradient id="c389-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.3" stop-color="#fff1b0" stop-opacity=".95"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c389-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3f86b8"/><stop offset="1" stop-color="#153e66"/>
      </linearGradient>
      <linearGradient id="c389-стена" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d8c8a4"/><stop offset="1" stop-color="#9a8a68"/>
      </linearGradient>
      <radialGradient id="c389-зеркало" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#fffbe8"/><stop offset="0.5" stop-color="#e8c56a"/><stop offset="1" stop-color="#8a5f1c"/>
      </radialGradient>
      <linearGradient id="c389-луч" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity=".35"/>
      </linearGradient>
      <linearGradient id="c389-галера" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a2e22"/><stop offset="1" stop-color="#2a120e"/>
      </linearGradient>
      <linearGradient id="c389-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6ead0"/><stop offset="1" stop-color="#dcc697"/>
      </linearGradient>
      <linearGradient id="c389-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d392"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <linearGradient id="c389-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2246"/><stop offset="1" stop-color="#0d1024"/>
      </linearGradient>
      <filter id="c389-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".45"/>
      </filter>
      <filter id="c389-сияние" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c389-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,14,24,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  const море = (y,в) => `<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c389-море)"/>
    ${[0,1,2,3].map(i=>`<path d="M${-30+i*17} ${y+10+i*12} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none"
      stroke="#e0f0ff" stroke-width="1.1" opacity="${(0.45-i*0.08).toFixed(2)}" stroke-dasharray="16 20">
      ${анЛин('stroke-dashoffset','0;-36',(3.2+i*0.5).toFixed(1)+'s')}</path>`).join('')}`;
  const галера = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c389-тень)">
    <path d="M-40 0 q8 10 40 10 q30 0 40 -8 l6 -8 q-6 2 -10 6 z" fill="url(#c389-галера)" stroke="${ОБВОД}" stroke-width="1"/>
    ${[-28,-18,-8,2,12,22].map(ox=>`<line x1="${ox}" y1="7" x2="${ox-7}" y2="18" stroke="#2a120e" stroke-width="1.4"/>`).join('')}
    <line x1="0" y1="0" x2="0" y2="-32" stroke="#2a120e" stroke-width="2"/>
    <path d="M-16 -28 h32 v18 h-32 z" fill="#8a2e26" stroke="${ОБВОД}" stroke-width=".7"/>
    <path d="M-5 -24 l5 5 l5 -5 M-5 -16 l5 5 l5 -5" fill="none" stroke="#e8b84a" stroke-width="1.2"/></g>`;
  const стена = (y,в) => {
    let s=`<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c389-стена)"/>`;
    for(let x=0;x<336;x+=18) s+=`<rect x="${x}" y="${y-9}" width="12" height="10" fill="url(#c389-стена)"/>`;
    for(let r=0;r<3;r++) for(let x=(r%2)*14;x<336;x+=28) s+=`<rect x="${x}" y="${y+6+r*14}" width="27" height="13" fill="none" stroke="#8a7a58" stroke-width=".8" opacity=".6"/>`;
    return s;
  };
  const дуга = (cx,cy,r,a1,a2,цвет,подп,кегль) => { /* угол от a1 до a2 (градусы, против часовой в экранных координатах y вниз → берём -a) */
    const p=(a)=>[cx+r*Math.cos(-a*Math.PI/180), cy+r*Math.sin(-a*Math.PI/180)];
    const [x1,y1]=p(a1), [x2,y2]=p(a2), большой = Math.abs(a2-a1)>180?1:0;
    const ср=(a1+a2)/2, [tx,ty]=[cx+(r+14)*Math.cos(-ср*Math.PI/180), cy+(r+14)*Math.sin(-ср*Math.PI/180)];
    return `<path d="M${cx} ${cy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${большой} 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${цвет}" opacity=".55"/>
      ${подп?т(tx.toFixed(1),(ty+4).toFixed(1),подп,кегль||13,цвет,true,undefined,'#0d1024'):''}`;
  };

  /* ================= КАДРЫ ================= */

  /* 1. Флот у стен */
  function F1(s){
    const Н=286;
    return ЛИСТ(s) +
      ЗАДАЧА('Полдень. К стенам Сиракуз идут римские галеры. На стене — бронзовые зеркала Архимеда: говорят, их солнечные зайчики слепили кормчих, и корабли бились о скалы. Архимед даёт тебе зеркало: «Луч летит по прямой, а отражается по правилу <b>углов</b>. Не умеешь считать углы — не попадёшь».') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-небо)"/>
        <circle cx="46" cy="44" r="40" fill="url(#c389-солнце)">${анЛин('r','38;46;38','4s')}</circle>
        ${море(120,Н)}
        <g>${анСдвиг('0 0;-12 2;0 0','9s','0;0.5;1')}${галера(250,150,1)}</g>
        <g>${анСдвиг('0 0;10 -2;0 0','11s','0;0.5;1')}${галера(186,172,0.7)}</g>
        ${стена(222,Н)}
        <g filter="url(#c389-тень)"><line x1="100" y1="222" x2="100" y2="190" stroke="#6a4515" stroke-width="3"/>
          <ellipse cx="100" cy="182" rx="16" ry="12" fill="url(#c389-зеркало)" stroke="#6a4515" stroke-width="1.6" transform="rotate(-25 100 182)"/></g>
        <path d="M60 60 L100 182 L250 146" fill="none" stroke="${СОЛНЦЕ}" stroke-width="3" opacity=".85" stroke-dasharray="10 6">${анЛин('stroke-dashoffset','0;-32','0.8s')}</path>
        <circle cx="250" cy="138" r="18" fill="${СОЛНЦЕ}" opacity=".5" filter="url(#c389-сияние)">${анЛин('opacity','0.5;0.9;0.5','0.6s')}</circle>
        ${подпись(168,28,'Зеркала Архимеда',GOLD,16)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Три слова','<b>Угол</b> — две линии из одной точки. <b>Острый</b> меньше 90°, <b>прямой</b> — ровно 90°, <b>тупой</b> — больше 90°. <b>Развёрнутый</b> угол — прямая линия: 180°.') +
      ПРАВИЛО('Луч от зеркала отражается так, что <b>угол падения равен углу отражения</b>.');
  }

  /* 2. Сумма углов треугольника */
  function F2(s){
    const Н=290, сложено=!!s.сложено2, в=s.ответ2;
    const A_=[60,190], B_=[276,190], C_=[128,60];
    const ug=(p,q,r)=>{ const a=Math.atan2(-(q[1]-p[1]),q[0]-p[0])*180/Math.PI, b=Math.atan2(-(r[1]-p[1]),r[0]-p[0])*180/Math.PI; return [a,b]; };
    const [aA1,aA2]=ug(A_,B_,C_), [bB1,bB2]=ug(B_,C_,A_), [cC1,cC2]=ug(C_,A_,B_);
    const уA=Math.round(aA2-aA1), уB=Math.round(bB2-bB1<0?bB2-bB1+360:bB2-bB1), уC=180-уA-уB;
    /* сложенные вместе углы — веером на прямой снизу */
    const О=[168,262];
    const веер = сложено ? `<g>${проявить('6s',0.1,0.3)}
      <line x1="40" y1="${О[1]}" x2="296" y2="${О[1]}" stroke="${ИНК}" stroke-width="2"/>
      ${дуга(О[0],О[1],40,0,уA,УГ1,уA+'°')}${дуга(О[0],О[1],40,уA,уA+уC,УГ3,уC+'°')}${дуга(О[0],О[1],40,уA+уC,180,УГ2,уB+'°')}
      ${т(О[0],О[1]+18,'вместе — прямая: 180°',13,GOLD,true)}</g>` : '';
    return ЛИСТ(s) +
      ЗАДАЧА('Первое дело. Архимед вырезает из папируса треугольник, отрывает три уголка и прикладывает их вершинами друг к другу. <b>Сложи углы</b> и посмотри, что выйдет.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><path d="M${A_} L${B_} L${C_} Z" fill="url(#c389-пергамент)" stroke="#8a6a3a" stroke-width="1.6"/></g>
        ${дуга(A_[0],A_[1],26,aA1,aA2,УГ1,уA+'°')}
        ${дуга(B_[0],B_[1],26,bB1,bB2<bB1?bB2+360:bB2,УГ2,уB+'°')}
        ${дуга(C_[0],C_[1],22,cC1<cC2?cC1:cC1,cC2<cC1?cC2+360:cC2,УГ3,уC+'°',12)}
        ${веер}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask">${BTN(3,'',сложено?'Разложить обратно':'Сложить углы',"r389Сложить()")}</div>` +
      (сложено ? ОТВЕТЫ('три',['90°','180°','360°'],1,в,'r389Отв2') + (в==null ? СКАЗ('Вопрос','Чему равна сумма углов треугольника?')
        : РАЗБОР(в===1, ['90° — один прямой угол. А три уголка вместе легли в <b>прямую линию</b> — это развёрнутый угол.','Три угла легли в прямую линию — это развёрнутый угол, <b>180°</b>. Так у любого треугольника, какой ни вырежи.','360° — полный круг. Три угла треугольника дают только его половину — прямую.'][в])) : '') +
      (в===1 ? ПРАВИЛО('<b>Сумма углов любого треугольника — 180°.</b> Два угла знаешь — третий = 180° − их сумма.') : '');
  }

  /* 3. Равнобедренный треугольник */
  function F3(s){
    const Н=270, вер=s.вершина3||40, в=s.ответ3;
    const ℓ=150, a=вер/2*Math.PI/180, b=ℓ*Math.sin(a), h=ℓ*Math.cos(a);
    const C_=[168,40], A_=[168-b,40+h], B_=[168+b,40+h];
    const осн=(180-вер)/2;
    const угА=Math.atan2(-(C_[1]-A_[1]),C_[0]-A_[0])*180/Math.PI;
    return ЛИСТ(s) +
      ЗАДАЧА('Щит для зеркала делают <b>равнобедренным</b> треугольником: две боковые стороны равны, и углы при основании тоже равны. Меняй угол при вершине и смотри, что происходит с углами при основании.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><path d="M${C_} L${A_.map(v=>v.toFixed(1))} L${B_.map(v=>v.toFixed(1))} Z" fill="url(#c389-бронза)" stroke="#6a4515" stroke-width="1.6"/></g>
        ${[[C_,A_],[C_,B_]].map(([p,q])=>{ const mx=(p[0]+q[0])/2, my=(p[1]+q[1])/2; return `<line x1="${mx-5}" y1="${my-4}" x2="${mx+5}" y2="${my+4}" stroke="#1a140a" stroke-width="2"/>`; }).join('')}
        ${дуга(C_[0],C_[1],24,-90-вер/2,-90+вер/2,УГ3,вер+'°')}
        ${дуга(A_[0],A_[1],24,0,угА,УГ1,осн+'°')}
        ${дуга(B_[0],B_[1],24,180-угА,180,УГ1,осн+'°')}
        <g>${анЛин('opacity','1;0.6;1','2s')}${т(168,Н-14,'(180 − '+вер+') : 2 = '+осн+'°',16,GOLD,true)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r389Вер(-10)",вер<=20)}<b>вершина: ${вер}°</b>${BTN(3,'','+',"r389Вер(10)",вер>=140)}</div>` +
      ОТВЕТЫ('три',['40°','70°','140°'],1,в,'r389Отв3') +
      (в==null ? СКАЗ('Вопрос','Вершина 40°. Чему равен угол при основании?') : РАЗБОР(в===1, ['40° — это вершина. На два угла при основании остаётся 180 − 40 = 140°, по 70° каждому.','180 − 40 = 140° на два равных угла: по <b>70°</b>.','140° — это сумма двух углов при основании, а каждый — половина: 70°.'][в])) +
      (в===1 ? ПРАВИЛО('Угол при основании равнобедренного = <b>(180° − вершина) : 2</b>.') : '');
  }

  /* 4. Внешний угол */
  function F4(s){
    const Н=250, в=s.ответ4;
    const A_=[40,190], B_=[190,190];
    const C_=[A_[0]+150*Math.sin(60*Math.PI/180)/Math.sin(70*Math.PI/180)*Math.cos(50*Math.PI/180), A_[1]-150*Math.sin(60*Math.PI/180)/Math.sin(70*Math.PI/180)*Math.sin(50*Math.PI/180)];
    const Cx=C_[0].toFixed(1), Cy=C_[1].toFixed(1);
    /* продолжение стороны AC за точку C */
    const ех=[C_[0]+(C_[0]-A_[0])*0.5, C_[1]+(C_[1]-A_[1])*0.5];
    const угCB = Math.atan2(-(B_[1]-C_[1]),B_[0]-C_[0])*180/Math.PI, угAC=Math.atan2(-(C_[1]-A_[1]),C_[0]-A_[0])*180/Math.PI;
    return ЛИСТ(s) +
      ЗАДАЧА('Стена зубца — треугольник с углами <b>50°</b> и <b>60°</b>. Архимеду нужен угол <b>снаружи</b> третьей вершины — между продолжением стороны и соседней стороной. Это <b>внешний угол</b>.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><path d="M${A_} L${B_} L${Cx} ${Cy} Z" fill="url(#c389-пергамент)" stroke="#8a6a3a" stroke-width="1.6"/></g>
        <line x1="${Cx}" y1="${Cy}" x2="${ех[0].toFixed(1)}" y2="${ех[1].toFixed(1)}" stroke="${ИНК}" stroke-width="2" stroke-dasharray="6 5"/>
        ${дуга(A_[0],A_[1],28,0,50,УГ1,'50°')}
        ${дуга(B_[0],B_[1],28,120,180,УГ2,'60°')}
        <g>${анК('opacity','0.3;0.3;1;1','5s','0;0.3;0.45;1')}${дуга(C_[0],C_[1],24,угCB,угAC,GOLD,в===1?'110°':'?')}</g>
        ${подпись(168,Н-12, в===1?'внешний = 50° + 60° = 110°':'внешний угол у третьей вершины', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['70°','110°','130°'],1,в,'r389Отв4') +
      (в==null ? СКАЗ('Вопрос','Чему равен внешний угол?') : РАЗБОР(в===1, ['70° — это внутренний угол третьей вершины (180 − 50 − 60). Внешний вместе с ним даёт прямую: 180 − 70 = 110°.','Внутренний угол третьей вершины 180 − 50 − 60 = 70°, а внешний дополняет его до прямой: 110°. Короче: внешний = <b>50 + 60</b> — сумма двух других углов.','130° не выходит ни из одного правила. Внешний = сумма двух внутренних, не соседних с ним: 50 + 60 = 110°.'][в])) +
      (в===1 ? ПРАВИЛО('<b>Внешний угол треугольника = сумма двух внутренних, не смежных с ним.</b>') : '');
  }

  /* 5. Зеркало: навести луч на галеру */
  const СОЛН=[30,40], П=[90,200], ГАЛ=[278,134];
  function отражение(θ){
    const d=[П[0]-СОЛН[0],П[1]-СОЛН[1]], L=Math.hypot(d[0],d[1]); const du=[d[0]/L,d[1]/L];
    const m=[Math.cos(θ*Math.PI/180), -Math.sin(θ*Math.PI/180)];   /* θ — наклон зеркала, положительный — против часовой */
    const dm=du[0]*m[0]+du[1]*m[1];
    const r=[2*dm*m[0]-du[0], 2*dm*m[1]-du[1]];
    return {du,m,r};
  }
  function F5(s){
    const Н=300, θ=s.θ5==null?10:s.θ5;
    const {du,m,r}=отражение(-θ);
    /* расстояние от галеры до отражённого луча */
    const w=[ГАЛ[0]-П[0],ГАЛ[1]-П[1]], вдоль=w[0]*r[0]+w[1]*r[1], поперёк=w[0]*r[1]-w[1]*r[0];
    const попал = вдоль>0 && Math.abs(поперёк)<16;
    const конец=[П[0]+r[0]*300, П[1]+r[1]*300];
    const уг = Math.round(Math.acos(Math.abs(du[0]*m[0]+du[1]*m[1]))*180/Math.PI);
    const зм=[П[0]-m[0]*26,П[1]-m[1]*26], зм2=[П[0]+m[0]*26,П[1]+m[1]*26];
    return ЛИСТ(s) +
      ЗАДАЧА('Твоё зеркало на стене. Солнечный луч падает на него сверху слева. <b>Поворачивай зеркало</b> кнопками: луч отражается так, что угол между лучом и зеркалом <b>одинаковый</b> до и после. Наведи зайчик на римскую галеру!') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-небо)"/>
        <circle cx="${СОЛН[0]}" cy="${СОЛН[1]}" r="30" fill="url(#c389-солнце)">${анЛин('r','28;34;28','3s')}</circle>
        ${море(110,Н)}
        <g>${попал?анЛин('opacity','1;0.4;1','0.5s'):''}${галера(ГАЛ[0],ГАЛ[1]+10,0.9)}</g>
        ${стена(214,Н)}
        <line x1="${СОЛН[0]}" y1="${СОЛН[1]}" x2="${П[0]}" y2="${П[1]}" stroke="${СОЛНЦЕ}" stroke-width="3.4" stroke-dasharray="10 6">${анЛин('stroke-dashoffset','0;-32','0.8s')}</line>
        <line x1="${П[0]}" y1="${П[1]}" x2="${конец[0].toFixed(1)}" y2="${конец[1].toFixed(1)}" stroke="${попал?GOLD:СОЛНЦЕ}" stroke-width="${попал?4:3}" stroke-dasharray="10 6" opacity=".9">${анЛин('stroke-dashoffset','0;-32','0.8s')}</line>
        ${попал?`<circle cx="${ГАЛ[0]}" cy="${ГАЛ[1]}" r="24" fill="${СОЛНЦЕ}" opacity=".6" filter="url(#c389-сияние)">${анЛин('r','18;28;18','0.6s')}</circle>`:''}
        <g filter="url(#c389-тень)"><line x1="${П[0]}" y1="${П[1]+10}" x2="${П[0]}" y2="214" stroke="#6a4515" stroke-width="3"/>
          <line x1="${зм[0].toFixed(1)}" y1="${зм[1].toFixed(1)}" x2="${зм2[0].toFixed(1)}" y2="${зм2[1].toFixed(1)}" stroke="url(#c389-бронза)" stroke-width="8" stroke-linecap="round"/>
          <line x1="${зм[0].toFixed(1)}" y1="${зм[1].toFixed(1)}" x2="${зм2[0].toFixed(1)}" y2="${зм2[1].toFixed(1)}" stroke="#fffbe8" stroke-width="2" stroke-linecap="round" opacity=".8"/></g>
        ${т(П[0]-44,П[1]+4,уг+'°',13,GOLD,true,undefined,'#153e66')}${т(П[0]+46,П[1]+22,уг+'°',13,GOLD,true,undefined,'#153e66')}
        ${подпись(168,28, попал?'попал! кормчий ослеплён':'зеркало повёрнуто на '+θ+'°', попал?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','↺',"r389Зерк(5)",θ>=45)}<b>поворот: ${θ}°</b>${BTN(3,'','↻',"r389Зерк(-5)",θ<=-20)}</div>` +
      (попал
        ? РАЗБОР(true,'Луч упал на зеркало под углом '+уг+'° и под тем же углом '+уг+'° ушёл — прямо в галеру. <b>Угол падения равен углу отражения</b>.')
        : СКАЗ('Куда ушёл луч', поперёк>0 ? 'Зайчик прошёл <b>выше</b> галеры — поверни зеркало, чтобы луч опустился.' : 'Зайчик прошёл <b>ниже</b> галеры — поверни зеркало в другую сторону.')) +
      (попал ? ПРАВИЛО('Повернёшь зеркало на 5° — отражённый луч повернётся на <b>10°</b>: изменятся оба угла.') : '');
  }

  /* 6. Угловая охота: 36–72–72 */
  function F6(s){
    const Н=276, в=s.ответ6;
    const Вер=[168,36], Л=[108,220], Пр=[228,220];
    /* биссектриса из Пр (правый угол основания, 72°) до стороны Вер–Л */
    const t_=Math.sin(36*Math.PI/180)/(Math.sin(36*Math.PI/180)+Math.sin(72*Math.PI/180));
    const D=[Л[0]+(Вер[0]-Л[0])*(1-t_*0), Л[1]]; /* заглушка, пересчитаем ниже */
    /* точка D на стороне Л–Вер, BD — биссектриса из Пр: |ЛD| : |DВер| = |ЛПр| : |ПрВер| */
    const lc=Math.hypot(Пр[0]-Л[0],Пр[1]-Л[1]), lb=Math.hypot(Пр[0]-Вер[0],Пр[1]-Вер[1]), k=lc/(lc+lb);
    const Dx=Л[0]+(Вер[0]-Л[0])*k, Dy=Л[1]+(Вер[1]-Л[1])*k;
    return ЛИСТ(s) +
      ЗАДАЧА('Задача с олимпиады для механиков. Треугольник-клин: угол при вершине <b>36°</b>, стороны от вершины равны. Из правого угла основания проведена <b>биссектриса</b> — она делит угол пополам. Найди угол при точке D у левой стороны (золотой).') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><path d="M${Вер} L${Л} L${Пр} Z" fill="url(#c389-пергамент)" stroke="#8a6a3a" stroke-width="1.6"/></g>
        <line x1="${Пр[0]}" y1="${Пр[1]}" x2="${Dx.toFixed(1)}" y2="${Dy.toFixed(1)}" stroke="#8a2e1a" stroke-width="2.4"/>
        ${т(Вер[0],Вер[1]-8,'36°',14,УГ3,true)}
        ${т(Л[0]-22,Л[1]+4,'72°',14,УГ1,true)}
        ${т(Пр[0]+8,Пр[1]-22,'36° + 36°',12,УГ2,true,'start')}
        <circle cx="${Dx.toFixed(1)}" cy="${Dy.toFixed(1)}" r="4" fill="${GOLD}"/>${т(Dx-12,Dy-4,'D',14,GOLD,true)}
        <g>${анК('opacity','0.3;0.3;1;1','5s','0;0.3;0.45;1')}${т(Dx+22,Dy+22,в===0?'72°':'?',16,GOLD,true)}</g>
        ${в===0?`<g>${проявить('6s',0.2,0.35)}${т(168,Н-12,'180 − 36 − 72 = 72° — снова равнобедренный',12,GREEN,true)}</g>`:''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['72°','36°','54°'],0,в,'r389Отв6') +
      (в==null ? СКАЗ('Вопрос','Чему равен золотой угол при D?') : РАЗБОР(в===0, ['Углы основания: (180 − 36) : 2 = 72°. Биссектриса делит правый пополам — по 36°. В маленьком треугольнике у основания: 36° и 72°, значит, при D — <b>180 − 36 − 72 = 72°</b>. Он тоже равнобедренный!','36° — это половинка угла, срезанная биссектрисой. А при D: 180 − 36 − 72 = 72°.','54° — это (180 − 72) : 2, такого угла тут нет. Считай в маленьком треугольнике: 180 − 36 − 72 = 72°.'][в])) +
      (в===0 ? ПРАВИЛО('<b>Угловая охота</b>: подписывай каждый найденный угол прямо на чертеже и ищи треугольник, где известны два.') : '');
  }

  /* 7. Пятиконечная звезда */
  function F7(s){
    const Н=280, в=s.ответ7;
    const cx=168, cy=146, R=104;
    const P=(i)=>[cx+R*Math.cos(-Math.PI/2+i*2*Math.PI/5), cy+R*Math.sin(-Math.PI/2+i*2*Math.PI/5)];
    const пор=[0,2,4,1,3];
    const d=пор.map((i,k)=>(k?'L':'M')+P(i).map(v=>v.toFixed(1)).join(' ')).join(' ')+' Z';
    const кончики = [0,1,2,3,4].map(i=>{ const [x,y]=P(i); const a=-90+i*72; /* кончик смотрит наружу, угол 36° */
      return дуга(x,y,20,-(a+180)-18,-(a+180)+18,[УГ1,УГ2,УГ3,GOLD,'#c08ad8'][i],'36°',12); }).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('На щите Архимеда — пятиконечная звезда, начерченная одним росчерком. Солнце играет на её острых кончиках. Чему равна <b>сумма пяти углов</b> при кончиках звезды?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><circle cx="${cx}" cy="${cy}" r="${R+20}" fill="url(#c389-бронза)"/><circle cx="${cx}" cy="${cy}" r="${R+12}" fill="none" stroke="#6a4515" stroke-width="2"/></g>
        <path d="${d}" fill="rgba(255,241,176,.25)" stroke="#fff6d8" stroke-width="3" stroke-linejoin="round">${анЛин('stroke-opacity','1;0.6;1','2s')}</path>
        ${кончики}
        ${в===0?`<g>${проявить('5s',0.2,0.35)}${подпись(168,Н-10,'5 · 36° = 180°',GREEN,14)}</g>`:''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['180°','360°','540°'],0,в,'r389Отв7') +
      (в==null ? СКАЗ('Вопрос','Сумма углов при пяти кончиках звезды?') : РАЗБОР(в===0, ['Каждый кончик правильной звезды — 36°, пять кончиков — <b>180°</b>. И это верно для <b>любой</b> пятиконечной звезды: её углы складываются, как углы одного треугольника (через внешние углы).','360° — сумма углов четырёхугольника или полный круг. Кончики звезды острые, по 36°: 5 · 36 = 180°.','540° — сумма углов пятиугольника внутри звезды, а кончики гораздо острее: 5 · 36 = 180°.'][в])) +
      (в===0 ? ПРАВИЛО('Сложные фигуры разбирай на <b>треугольники</b> и <b>внешние углы</b>.') : '');
  }

  /* 8. Часы 3:30 */
  function F8(s){
    const Н=260, в=s.ответ8;
    const cx=168, cy=132, R=90;
    const мин=180, час=90+15; /* от 12 по часовой */
    const точка=(угол,r)=>[cx+r*Math.sin(угол*Math.PI/180), cy-r*Math.cos(угол*Math.PI/180)];
    const [mx,my]=точка(мин,72), [hx,hy]=точка(час,50);
    return ЛИСТ(s) +
      ЗАДАЧА('Штурм назначен на половину четвёртого. Центурион спрашивает соглядатая: «Какой угол между стрелками водяных часов в 3:30?» Тот уверенно: «90°!» Прав ли он?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><circle cx="${cx}" cy="${cy}" r="${R+10}" fill="url(#c389-бронза)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#c389-пергамент)"/></g>
        ${Array.from({length:12},(_,i)=>{ const [x,y]=точка(i*30,R-12); return т(x.toFixed(1),(y+5).toFixed(1),String(i||12),13,'#3a2410',true); }).join('')}
        ${дуга(cx,cy,34,90-мин,90-час,GOLD,в===1?'75°':'?',14)}
        <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#2a1a0c" stroke-width="3" stroke-linecap="round"/>
        <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#8a2e1a" stroke-width="5" stroke-linecap="round">
          ${ДВИЖ?`<animate attributeName="x2" values="${(cx+50).toFixed(1)};${hx.toFixed(1)};${hx.toFixed(1)}" dur="4s" repeatCount="indefinite" keyTimes="0;0.5;1"/><animate attributeName="y2" values="${cy};${hy.toFixed(1)};${hy.toFixed(1)}" dur="4s" repeatCount="indefinite" keyTimes="0;0.5;1"/>`:''}</line>
        <circle cx="${cx}" cy="${cy}" r="5" fill="#2a1a0c"/>
        ${подпись(168,Н-10,'часовая за полчаса проходит 15°',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['90°','75°','60°'],1,в,'r389Отв8') +
      (в==null ? СКАЗ('Вопрос','Какой угол между стрелками в 3:30?') : РАЗБОР(в===1, ['90° было бы в 3:00. За полчаса часовая стрелка ушла от 3 к 4 — на половину из 30°, то есть на 15°. Угол: 90 + 15 = 105° у часовой, минутная на 180°: <b>75°</b>.','Минутная на 6 — это 180° от 12. Часовая прошла 3 деления (90°) и ещё половину деления (15°): 105°. Разница <b>180 − 105 = 75°</b>.','60° не выходит: 180 − 105 = 75°.'][в])) +
      (в===1 ? ПРАВИЛО('Деление циферблата — <b>30°</b>. Часовая стрелка за минуту проходит <b>0,5°</b>.') : '');
  }

  /* 9. Сумма углов многоугольника */
  function F9(s){
    const Н=260, в=s.ответ9;
    const n=6, cx=168, cy=128, R=96;
    const P=(i)=>[cx+R*Math.cos(Math.PI+i*2*Math.PI/n), cy+R*Math.sin(Math.PI+i*2*Math.PI/n)];
    const контур=Array.from({length:n},(_,i)=>(i?'L':'M')+P(i).map(v=>v.toFixed(1)).join(' ')).join(' ')+' Z';
    const треуг=[1,2,3,4].map((i,k)=>{ const a=P(0),b=P(i),c=P(i+1);
      return `<path d="M${a.map(v=>v.toFixed(1))} L${b.map(v=>v.toFixed(1))} L${c.map(v=>v.toFixed(1))} Z" fill="${[УГ1,УГ2,УГ3,GOLD][k]}" opacity=".45">
        ${анК('opacity','0.1;0.1;0.5;0.5','8s','0;'+кт(0.08+k*0.18)+';'+кт(0.16+k*0.18)+';1')}</path>`; }).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('Главная башня Сиракуз — шестиугольная. Каменщик спрашивает: «Сколько градусов во всех углах основания вместе?» Архимед проводит из одного угла все диагонали — и башня режется на <b>треугольники</b>.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-ночь)"/>
        <g filter="url(#c389-тень)"><path d="${контур}" fill="url(#c389-пергамент)" stroke="#8a6a3a" stroke-width="2"/></g>
        ${треуг}
        ${[2,3,4].map(i=>{ const a=P(0),b=P(i); return `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#3a2410" stroke-width="1.6" stroke-dasharray="5 4"/>`; }).join('')}
        ${подпись(168,Н-10, в===1?'4 треугольника · 180° = 720°':'сколько вышло треугольников?', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['1080°','720°','360°'],1,в,'r389Отв9') +
      (в==null ? СКАЗ('Вопрос','Сумма углов шестиугольника?') : РАЗБОР(в===1, ['1080° = 6 · 180 — так было бы, если бы треугольников было шесть (из центра). Но тогда в сумму попали бы и 360° вокруг центра: 1080 − 360 = 720.','Диагонали из одного угла режут шестиугольник на <b>4 треугольника</b> (на 2 меньше, чем углов): 4 · 180 = <b>720°</b>.','360° — сумма углов четырёхугольника. У шестиугольника треугольников 4: 720°.'][в])) +
      (в===1 ? ПРАВИЛО('Сумма углов n-угольника <b>(n − 2) · 180°</b>.') : '');
  }

  /* 10. Флот ослеплён */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=290;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Десятки зеркал вспыхнули разом. Кормчие римских галер закрывают глаза, вёсла путаются, и флот отходит от стен. Архимед опускает зеркало: «Свет послушен тому, кто знает углы».'
        : 'Оборона ещё не готова — вернись к делам в списке. А вот что пригодится.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c389-небо)"/>
        <circle cx="46" cy="44" r="40" fill="url(#c389-солнце)">${анЛин('r','38;46;38','4s')}</circle>
        ${море(116,Н)}
        <g>${анСдвиг('0 0;50 0;50 0','8s','0;0.8;1')}${галера(236,150,0.9)}</g>
        ${[0,1,2,3].map(i=>`<path d="M${60+i*20} ${60+i*6} L${80+i*30} 210 L${236+i*4} ${144+i*6}" fill="none" stroke="${СОЛНЦЕ}" stroke-width="2" opacity=".6" stroke-dasharray="8 6">${анЛин('stroke-dashoffset','0;-28',(0.7+i*0.1).toFixed(1)+'s')}</path>`).join('')}
        ${стена(214,Н)}
        <g>${проявить('8s',0.1,0.2)}${подпись(168,244,'в треугольнике — 180°',GOLD,12)}</g>
        <g>${проявить('8s',0.35,0.45)}${подпись(168,272,'зеркало: падение = отражение',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Сумма углов треугольника — <b>180°</b>. Равнобедренный: углы при основании равны. Внешний угол = сумма двух внутренних, не смежных с ним. n-угольник: <b>(n − 2) · 180°</b>. Зеркало: угол падения = углу отражения. И главный приём — <b>подписывай углы на чертеже</b>, пока не найдёшь нужный.') +
      ПРАВИЛО('<b>Нашёл угол — сразу подпиши.</b> Ищи треугольник, где известны два.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Два угла треугольника 45° и 75°. Третий?', варианты:[{т:'60°',ок:true},{т:'120°',ок:false}], разбор:'180 − 45 − 75 = 60°.' },
    { вопрос:'Равнобедренный, вершина 100°. Угол при основании?', варианты:[{т:'80°',ок:false},{т:'40°',ок:true}], разбор:'(180 − 100) : 2 = 40°.' },
    { вопрос:'Внутренние углы 30° и 80°. Внешний у третьей вершины?', варианты:[{т:'110°',ок:true},{т:'70°',ок:false}], разбор:'30 + 80 = 110°.' },
    { вопрос:'Угол между стрелками в 2:00?', варианты:[{т:'45°',ок:false},{т:'60°',ок:true}], разбор:'Два деления по 30°.' },
    { вопрос:'Сумма углов пятиугольника?', варианты:[{т:'540°',ок:true},{т:'900°',ок:false}], разбор:'(5 − 2) · 180 = 540°.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r389Reset()")}</div>` +
        ПРАВИЛО('<b>180° в треугольнике.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r389Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Треугольник', задания:[
    {q:'Углы 90° и 35°. Третий?', в:1, варианты:['65°','55°'], раз:'180 − 90 − 35 = 55°.'},
    {q:'Равнобедренный, угол при основании 50°. Вершина?', в:0, варианты:['80°','50°'], раз:'180 − 50 − 50 = 80°.'},
    {q:'Может ли в треугольнике быть два тупых угла?', в:1, варианты:['может','нет'], раз:'Два тупых уже больше 180°.'},
    {q:'Все углы равны. Каждый?', в:0, варианты:['60°','90°'], раз:'180 : 3 = 60°.'}
  ]};
  const Т2 = { имя:'Внешние и часы', задания:[
    {q:'Внешний угол 120°, один не смежный 70°. Другой?', в:1, варианты:['60°','50°'], раз:'120 − 70 = 50°.'},
    {q:'Угол между стрелками в 6:00?', в:0, варианты:['180°','90°'], раз:'Шесть делений по 30°.'},
    {q:'Угол между стрелками в 9:30?', в:1, варианты:['90°','105°'], раз:'Минутная 180°, часовая 270 + 15 = 285°: 105°.'},
    {q:'На сколько градусов поворачивается часовая за час?', в:0, варианты:['30°','60°'], раз:'360 : 12 = 30°.'}
  ]};
  const Т3 = { имя:'Многоугольники и зеркала', задания:[
    {q:'Сумма углов восьмиугольника?', в:1, варианты:['1440°','1080°'], раз:'(8 − 2) · 180 = 1080°.'},
    {q:'Сумма углов четырёхугольника?', в:0, варианты:['360°','180°'], раз:'Два треугольника: 360°.'},
    {q:'Луч падает на зеркало под 40°. Под каким отразится?', в:1, варианты:['50°','40°'], раз:'Угол падения = углу отражения.'},
    {q:'Сумма углов при кончиках пятиконечной звезды?', в:0, варианты:['180°','360°'], раз:'Как у треугольника: 180°.'}
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
        в, "r389T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r389TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L389 = {
    id: ID,
    title: 'Углы и треугольники: приёмы',
    ico: '📐',
    src: 'Математика · 5–6 класс · Олимп-5: геометрия',
    subj: 'math',
    explain: [
      'Римские галеры у стен Сиракуз, и зеркала Архимеда слепят кормчих. Луч отражается по правилу углов: угол падения равен углу отражения. Угол — две линии из одной точки; развёрнутый угол — прямая, 180°.',
      'Три уголка треугольника, приложенные вершинами друг к другу, ложатся в прямую линию. Сумма углов любого треугольника — 180°.',
      'В равнобедренном треугольнике углы при основании равны. Вершина 40° — на два угла при основании остаётся 140°, по 70° каждому.',
      'Внешний угол треугольника равен сумме двух внутренних, не смежных с ним: при углах 50° и 60° внешний у третьей вершины — 110°.',
      'Поворачивая зеркало, наводим солнечный зайчик на галеру: луч уходит от зеркала под тем же углом, под каким пришёл.',
      'Угловая охота: треугольник 36°–72°–72°, биссектриса делит угол 72° пополам. В маленьком треугольнике 36° и 72° — третий угол 72°, он тоже равнобедренный.',
      'Сумма углов при кончиках пятиконечной звезды — 180°: пять углов по 36°.',
      'В 3:30 угол между стрелками — не 90°, а 75°: часовая стрелка за полчаса уходит ещё на 15°.',
      'Диагонали из одного угла режут шестиугольник на 4 треугольника: сумма углов 720°. Для n-угольника — (n − 2) · 180°.',
      'Итог: 180° в треугольнике, равные углы при основании равнобедренного, внешний угол — сумма двух, (n − 2) · 180° для многоугольника. Подписывай найденные углы прямо на чертеже.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: треугольник.',
      'Тренажёр 2: внешние углы и часы.',
      'Тренажёр 3: многоугольники и зеркала.'
    ],
    check: {
      q: 'Чему равна сумма углов треугольника?',
      choices: ['90°','180°','360°','270°'],
      ans: 1,
      exp: 'Три угла, приложенные вместе, дают прямую — 180°.'
    },
    tasks: [
      { q:'Равнобедренный треугольник, угол при вершине 40°. Угол при основании?', kind:'unit', ans:70, tol:0,
        hints:['На два равных угла остаётся 180 − 40.','140 : 2.'], sol:'70°.' },
      { q:'Два угла треугольника 50° и 60°. Чему равен внешний угол у третьей вершины?', kind:'unit', ans:110, tol:0,
        hints:['Внешний = сумма двух не смежных.','50 + 60.'], sol:'110°.' },
      { q:'Сумма углов шестиугольника?', kind:'choice', choices:['720°','1080°'], ans:0,
        hints:['Режь на треугольники из одного угла.','Их 6 − 2 = 4.'], sol:'720°.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L389.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Зеркала Архимеда',2:'Сумма углов',3:'Равнобедренный',4:'Внешний угол',5:'Навести луч',
      6:'Угловая охота',7:'Звезда на щите',8:'Часы штурма',9:'Шестиугольная башня',10:'Флот ослеплён',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l389" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Углы и треугольники'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r389Сложить=()=>{ const s=S(); s.сложено2=!s.сложено2; chRender(0); };
  window.r389Отв2=(к)=>{ const s=S(); s.ответ2=к; if(к===1) s.дело_сумма=true; chRender(0); };
  window.r389Вер=(д)=>{ const s=S(); s.вершина3=Math.max(20,Math.min(140,(s.вершина3||40)+д)); chRender(0); };
  window.r389Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r389Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r389Зерк=(д)=>{ const s=S(); s.θ5=Math.max(-20,Math.min(45,(s.θ5==null?10:s.θ5)+д));
    const {r}=отражение(-s.θ5); const w=[ГАЛ[0]-П[0],ГАЛ[1]-П[1]];
    if(w[0]*r[0]+w[1]*r[1]>0 && Math.abs(w[0]*r[1]-w[1]*r[0])<16) s.дело_зеркало=true;
    chRender(0); };
  window.r389Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r389Отв7=(к)=>{ const s=S(); s.ответ7=к; if(к===0) s.дело_звезда=true; chRender(0); };
  window.r389Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r389Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r389Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r389Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r389T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r389TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L389; else arr.push(L389); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA389={render:render, L:L389};
})();
