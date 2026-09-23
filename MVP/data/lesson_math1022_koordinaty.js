/* ====== МАТЕМАТИКА · УРОК 1022 · «КООРДИНАТНЫЙ УГОЛ: ПЕРЕДАЧА РИСУНКА» =====
   4 класс. Тема была заглушкой «готовится» в MVP/data/soon_lessons.js.

   ПОЧЕМУ ПАЛЬЦЕМ ПО СЕТКЕ. Координаты — первая тема, где от ребёнка нужен не
   ответ, а ДЕЙСТВИЕ: поставить точку туда, куда сказано. Выбор из двух
   вариантов тут врёт — по нему не видно, понял он порядок в паре или угадал.
   Поэтому главный снаряд урока — сетка, по которой он тапает пальцем, и
   рисунок, который из его же тапов собирается.

   Отсюда и второе: разбор называет СОБСТВЕННУЮ ошибку ребёнка. Не «неверно»,
   а «ты поставил (2;4), а нужно (4;2) — числа те же, а точки разные». Это
   возможно только потому, что мы знаем, куда именно он ткнул.

   Главная ошибка темы — переставить числа в паре — сделана видимой: те же
   четыре пары, прочитанные наоборот, дают лодку, вставшую на нос. Это
   запоминается лучше любого правила.

   СЮЖЕТ ПОД МИР 4 КЛАССА В «ПУТИ» («Открытое море»): два корабля идут в виду
   друг друга, кричать далеко — и рисунок передают числами, парами. Флажками
   отбивают: «четыре вправо, два вверх». На том корабле ставят точку.

   ЯЗЫК. Абсцисса и ордината названы один раз и тут же переведены: «х — сколько
   вправо, у — сколько вверх». Дальше везде по-человечески.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ: сетка 0…6 по обеим осям.
     корпус лодки: (1;1) (5;1) (4;2) (2;2) — замкнутая четырёхугольная линия
     мачта и парус: (3;2) (3;5) (5;3) (3;3)
     переставленные пары: (1;1) (1;5) (2;4) (2;2) — зеркало по диагонали
     ошибка в записи: (2;5) вместо (2;2) — на рисунке шип вверх

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md. В каждом кадре есть <animate>:
   без него Chrome не заводит таймлайн SVG, где одни animateTransform
   (поймано в уроке 819). prefers-reduced-motion выключает SMIL полностью. */
(function(){
  'use strict';

  const ID = 1022;
  const GOLD='#ffd76a', GREEN='#8fd1a8', RED='#e86a5a', СИНЬ='#9db7ff',
        ТОЧКА='#7fd1ff', ФЛАГ='#ff9f6b';
  const ИНК='#eef2ff', МУТ='#a9b6da', ЛИНИЯ='#46568f', ОБВОД='#0d1226';

  /* ---------- СЕТКА И ФИГУРЫ ---------- */
  const N = 6;                       /* сетка 0…6 */
  const КОРПУС = [[1,1],[5,1],[4,2],[2,2]];
  const ПАРУС  = [[3,2],[3,5],[5,3],[3,3]];
  const ПЕРЕВЁРНУТЫЙ = КОРПУС.map(п=>[п[1],п[0]]);
  const С_ОШИБКОЙ = [[1,1],[5,1],[4,2],[2,5]];   /* четвёртая врёт: надо (2;2) */
  const ОШИБОЧНАЯ = 3;
  const пара = (п) => '('+п[0]+';'+п[1]+')';

  /* ---------- ЛИСТ ПЕРЕДАЧИ: ход квеста ---------- */
  const ДЕЛА = [
    {ключ:'точка',  имя:'Поставить точку по паре', итог:'(4;2)'},
    {ключ:'приём',  имя:'Принять рисунок',         итог:'корпус'},
    {ключ:'ошибка', имя:'Найти ошибку в записи',   итог:'4-я пара'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l1022{gap:14px}
  #lvis .s6.l1022 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l1022 .pic svg{display:block;width:100%;height:auto}
  #lvis .s6.l1022 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1e2646,#141930);border:1.5px solid var(--line)}
  #lvis .s6.l1022 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l1022 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l1022 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l1022 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l1022 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l1022 .карт .текст b{color:${GOLD}}
  #lvis .s6.l1022 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l1022 .правило b{color:${GOLD}}

  #lvis .s6.l1022 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(157,183,255,.12),rgba(157,183,255,.03));
    border:1.5px solid rgba(157,183,255,.45);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l1022 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l1022 .лист .шапка b{font-size:24px;letter-spacing:0;text-transform:none;color:${СИНЬ};
    font-variant-numeric:tabular-nums}
  #lvis .s6.l1022 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l1022 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l1022 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l1022 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l1022 .лист li.есть{color:${ИНК}}
  #lvis .s6.l1022 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,209,168,.14)}
  #lvis .s6.l1022 .лист li span{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--mut);font-size:16px}
  #lvis .s6.l1022 .лист li.есть span{color:${GREEN}}

  /* ── крестовина: четыре кнопки хода точки ── */
  #lvis .s6.l1022 .крест{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;
    max-width:260px;margin:0 auto}
  #lvis .s6.l1022 .крест button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:24px;
    border:1px solid rgba(127,209,255,.5);background:rgba(127,209,255,.14);color:${ТОЧКА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1022 .крест button:active{transform:translateY(2px);background:rgba(127,209,255,.26)}
  #lvis .s6.l1022 .крест button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l1022 .крест .пара{grid-column:2;display:flex;align-items:center;justify-content:center;
    font-size:24px;color:${GOLD};font-variant-numeric:tabular-nums;font-weight:700}
  #lvis .s6.l1022 .крест .пусто{visibility:hidden}

  /* ── строки записи: тапаем ту, что врёт ── */
  #lvis .s6.l1022 .запись{display:flex;flex-direction:column;gap:8px;width:100%}
  #lvis .s6.l1022 .запись button{display:flex;align-items:center;gap:12px;width:100%;min-height:52px;
    padding:11px 14px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;text-align:left;
    color:${ИНК};background:rgba(157,183,255,.1);border:1.5px solid rgba(157,183,255,.38);
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),border-color 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1022 .запись button:active{transform:translateY(2px)}
  #lvis .s6.l1022 .запись button b{font-variant-numeric:tabular-nums;font-size:20px;color:${GOLD};flex:0 0 auto}
  #lvis .s6.l1022 .запись button em{margin-left:auto;font-style:normal;font-size:14px;color:var(--mut)}
  #lvis .s6.l1022 .запись button.нашёл{border-color:${GREEN};background:rgba(143,209,168,.14)}
  #lvis .s6.l1022 .запись button.мимо{border-color:${RED}}

  #lvis .s6.l1022 .дело{width:100%;min-height:60px;padding:16px;border-radius:16px;cursor:pointer;
    font:inherit;font-size:20px;line-height:1.25;text-align:center;color:#14192c;
    border:0;background:linear-gradient(180deg,${GOLD},#c8912f);
    box-shadow:0 3px 0 rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.4);
    transition:transform 120ms ease, box-shadow 180ms ease}
  #lvis .s6.l1022 .дело:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.42)}
  #lvis .s6.l1022 .дело.сделано{background:rgba(143,209,168,.16);color:${GREEN};
    box-shadow:none;border:1.5px solid ${GREEN}}

  #lvis .s6.l1022 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l1022 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1022 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l1022 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l1022 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l1022 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;
    font-variant-numeric:tabular-nums;font-size:20px}

  #lvis .s6.l1022 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l1022 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1022 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l1022 .уровни .точка.сейчас{background:${GOLD};animation:l1022dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l1022dot{0%,100%{opacity:1}50%{opacity:.45}}
  #lvis .s6.l1022 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l1022{-webkit-text-size-adjust:100%}
  #lvis .s6.l1022 [data-anim]{animation:l1022rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l1022rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  /* ── цепочка переданных пар: какая сейчас, какие уже стоят ── */
  #lvis .s6.l1022 .пары{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%}
  #lvis .s6.l1022 .пары span{min-width:66px;padding:8px 10px;border-radius:12px;text-align:center;
    font-size:20px;font-variant-numeric:tabular-nums;border:1.5px solid rgba(157,183,255,.35);color:var(--mut)}
  #lvis .s6.l1022 .пары span.сейчас{border-color:${GOLD};color:${GOLD};background:rgba(255,215,106,.12);font-weight:700}
  #lvis .s6.l1022 .пары span.есть{border-color:${GREEN};color:${GREEN}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l1022 [data-anim]{animation:none!important}
    #lvis .s6.l1022 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l1022 .ask button,#lvis .s6.l1022 .крест button,#lvis .s6.l1022 .дело,
    #lvis .s6.l1022 .запись button{transition:none}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l1022-style');
      if(!s){ s=document.createElement('style'); s.id='l1022-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Передача</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ДЕЛО = (текст,on,готово) =>
    `<button type="button" data-anim style="--i:3" class="дело${готово?' сделано':''}" onclick="${on}">${текст}</button>`;

  const ЛИСТ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'лист',
      `<div class="шапка"><span>Связь с кораблём</span><b class="${всё?'готово':''}">${
        всё?'рисунок передан':'сетка 0…6'}</b></div>
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
  const анРаз = (имя,значения,длит,задержка) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" fill="freeze"
              ${задержка?'begin="'+задержка+'"':''}
              calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const очередь = (номер,всего,длит) => {
    if(!ДВИЖ) return '';
    const д = 1/(всего+1), a = кт(номер*д), b = кт(номер*д+д*0.5), c = кт(номер*д+д*0.9);
    return анК('opacity','0.6;0.6;1;1;0.6',длит,'0;'+a+';'+b+';'+c+';1');
  };
  const кольцо = (x,y,r,цвет,длит,доля) => ДВИЖ ? `<circle cx="${x}" cy="${y}" r="${r}" fill="none"
      stroke="${цвет||GOLD}" stroke-width="2.2" opacity="0">
      ${анК('opacity','0;0;0.95;0',длит,'0;'+кт(доля)+';'+кт(доля+0.1)+';1')}
      ${анК('r',r+';'+r+';'+(r+9)+';'+(r+9),длит,'0;'+кт(доля)+';'+кт(доля+0.16)+';1')}
    </circle>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;

  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c1022-фон" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#232c52"/><stop offset="0.55" stop-color="#171d38"/>
        <stop offset="1" stop-color="#0e1224"/>
      </linearGradient>
      <linearGradient id="c1022-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a72a8"/><stop offset="1" stop-color="#16264a"/>
      </linearGradient>
      <radialGradient id="c1022-точка" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#d9f2ff"/><stop offset="1" stop-color="#3f9ad1"/>
      </radialGradient>
      <linearGradient id="c1022-дуб" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c79a5a"/><stop offset="1" stop-color="#6d4a22"/>
      </linearGradient>
    </defs>`;

  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота||348}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;

  const фон = (высота) =>
    `<rect x="0" y="0" width="336" height="${высота}" fill="url(#c1022-фон)"/>
     <rect x="0" y="0" width="336" height="${высота}" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;

  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.6+16, в=к+10;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g>
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+3).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(8,11,24,.9)" stroke="${цвет||GOLD}" stroke-width="1.2"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* ---------------- КООРДИНАТНЫЙ УГОЛ ---------------------------------------
     Клетка 44 — это 46 экранных пикселей на телефоне, то есть палец попадает
     (норма 44). Узлов 7 × 7 = 49, у каждого свой невидимый круг-мишень. */
  const КЛ = 44, OX = 54, OY = 310;
  const кx = (a) => OX + КЛ*a;
  const кy = (b) => OY - КЛ*b;

  const сетка = (пп) => {
    const о = пп || {};
    const линииСетки = Array.from({length:N+1},(_,i)=>
      `<line x1="${кx(0)}" y1="${кy(i)}" x2="${кx(N)}" y2="${кy(i)}"
         stroke="rgba(157,183,255,.16)" stroke-width="1"/>
       <line x1="${кx(i)}" y1="${кy(0)}" x2="${кx(i)}" y2="${кy(N)}"
         stroke="rgba(157,183,255,.16)" stroke-width="1"/>`).join('');
    const оси = `
      <line x1="${кx(0)}" y1="${OY}" x2="330" y2="${OY}" stroke="${МУТ}" stroke-width="2"/>
      <path d="M336 ${OY} l-9 -5 v10 z" fill="${МУТ}"/>
      <line x1="${OX}" y1="${OY}" x2="${OX}" y2="34" stroke="${МУТ}" stroke-width="2"/>
      <path d="M${OX} 28 l-5 9 h10 z" fill="${МУТ}"/>
      ${т(322,298,'х',16,МУТ,true)}
      ${т(70,42,'у',16,МУТ,true)}`;
    const цифры = Array.from({length:N+1},(_,i)=>
      (i? т(кx(i),332,String(i),14,МУТ) : '') +
      (i? т(38,кy(i)+5,String(i),14,МУТ) : '')).join('')
      + т(40,332,'0',14,МУТ,true);
    /* Узлы-мишени: каждый узел владеет квадратом клетки вокруг себя.
       Квадраты кладутся плиткой без щелей и без нахлёста, поэтому любой тап
       по сетке попадает в ближайший узел. Круг r=21 давал 43,5 px на экране —
       на полпикселя меньше нормы 44 (поймано замером живого тапа). */
    const узлы = о.тап ? Array.from({length:(N+1)*(N+1)},(_,i)=>{
      const a=i%(N+1), b=Math.floor(i/(N+1));
      return `<rect x="${кx(a)-КЛ/2}" y="${кy(b)-КЛ/2}" width="${КЛ}" height="${КЛ}"
        fill="rgba(157,183,255,.001)" style="cursor:pointer" onclick="${о.тап}(${a},${b})"/>`;
    }).join('') : '';
    const крапины = Array.from({length:(N+1)*(N+1)},(_,i)=>{
      const a=i%(N+1), b=Math.floor(i/(N+1));
      return `<circle cx="${кx(a)}" cy="${кy(b)}" r="${о.тап?2.6:1.8}"
        fill="rgba(157,183,255,${о.тап?'.5':'.3'})"/>`;
    }).join('');
    const линии = (о.линии||[]).map(л=>{
      const d = л.точки.map((п,i)=>(i?'L':'M')+кx(п[0])+' '+кy(п[1])).join(' ') + (л.замкнуто?' Z':'');
      return `<path d="${d}" fill="${л.залив||'none'}" stroke="${л.цвет||GOLD}" stroke-width="${л.ширина||3}"
        stroke-linejoin="round" stroke-linecap="round" opacity="${л.тускло?0.55:1}"/>`;
    }).join('');
    const точки = (о.точки||[]).map(т_=>`<g>
      <circle cx="${кx(т_.п[0])}" cy="${кy(т_.п[1])}" r="${т_.r||7}" fill="${т_.цвет||'url(#c1022-точка)'}"
        stroke="${ОБВОД}" stroke-width="1.2"/>
      ${т_.подпись?подпись(кx(т_.п[0])+ (т_.п[0]>=N-1?-40:40), кy(т_.п[1])-10, т_.подпись, т_.цветП||GOLD, 14):''}
    </g>`).join('');
    /* Порядок слоёв важен. Мишени — САМЫЙ ВЕРХНИЙ слой, а всё, что нарисовано,
       прозрачно для пальца. Иначе подсказка-путь, появившаяся после двух
       промахов, ложилась поверх мишеней и глотала тап ровно в тот узел, на
       который показывала (поймано живым тапом на проде, в центр узла). */
    return `<g><g pointer-events="none">${линииСетки}${оси}${цифры}${крапины}${линии}${точки}${о.поверх||''}</g>${узлы}</g>`;
  };

  /* след «сначала вправо, потом вверх» — по нему и читается порядок в паре */
  const след = (a,b,цвет) => `<g>
    ${a>0?`<line x1="${кx(0)}" y1="${OY}" x2="${кx(a)}" y2="${OY}" stroke="${цвет||GOLD}"
      stroke-width="6" stroke-linecap="round"/>`:''}
    ${b>0?`<line x1="${кx(a)}" y1="${OY}" x2="${кx(a)}" y2="${кy(b)}" stroke="${цвет||ТОЧКА}"
      stroke-width="4" stroke-dasharray="7 5" stroke-linecap="round"/>`:''}
  </g>`;

  /* ---------------- СИГНАЛЬНЫЕ ФЛАЖКИ ---------------------------------------
     Чем именно «передают» числа: мачта, два флажка и пара под ними. */
  /* флажки висят на мачте корабля: x, y — верхушка мачты */
  const флажки = (x,y,цвет) => `<g>
    <path d="M${x+1} ${y+2} l16 6 l-16 6 z" fill="${цвет||ФЛАГ}" stroke="${ОБВОД}" stroke-width="0.9">
      ${анК('opacity','1;0.6;1','3.2s','0;0.5;1')}
    </path>
    <path d="M${x+1} ${y+16} l14 5 l-14 5 z" fill="${GOLD}" stroke="${ОБВОД}" stroke-width="0.9">
      ${анК('opacity','0.6;1;0.6','3.2s','0;0.5;1')}
    </path>
  </g>`;

  const корабль = (x,y,м) => {
    const мм=м||1;
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <path d="M-28 0 q5 12 28 12 q23 0 28 -12 z" fill="url(#c1022-дуб)" stroke="${ОБВОД}" stroke-width="${(1.3/мм).toFixed(2)}"/>
      <rect x="-29" y="-4" width="58" height="4" rx="2" fill="#8a5f30" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
      <line x1="0" y1="-4" x2="0" y2="-40" stroke="${ОБВОД}" stroke-width="${(2/мм).toFixed(2)}"/>
      <path d="M3 -38 q17 13 0 26 z" fill="#f2eee0" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
    </g>`;
  };

  /* ================= РАЗБОР ТАПА ================================================
     Главная новинка урока: мы знаем, куда именно ткнул ребёнок, и называем его
     собственную ошибку. Четыре разных промаха — четыре разных разбора. */
  const назвать = (тап, цель) => {
    if(тап[0]===цель[1] && тап[1]===цель[0] && тап[0]!==тап[1])
      return 'Ты поставил <b>'+пара(тап)+'</b> — числа те же, но переставлены. Первое число — <b>сколько вправо</b>, второе — <b>сколько вверх</b>.';
    if(тап[0]===цель[0])
      return 'Вправо попал верно — на '+цель[0]+'. А вверх нужно на <b>'+цель[1]+'</b>, у тебя '+тап[1]+'.';
    if(тап[1]===цель[1])
      return 'Вверх попал верно — на '+цель[1]+'. А вправо нужно на <b>'+цель[0]+'</b>, у тебя '+тап[0]+'.';
    return 'Ты поставил '+пара(тап)+'. Нужно '+пара(цель)+': сначала <b>'+цель[0]+' вправо</b>, потом <b>'+цель[1]+' вверх</b>.';
  };
  /* после двух промахов подсказка рисуется прямо на сетке: путь к цели */
  const ПОДСКАЗКА_ПОСЛЕ = 2;

  /* откуда потянется следующий отрезок: последняя точка, а до первой — угол */
  const откуда = (взяты) => {
    const п = взяты.length ? взяты[взяты.length-1] : [0,0];
    return `<circle cx="${кx(п[0])}" cy="${кy(п[1])}" r="7" fill="none" stroke="${GOLD}" stroke-width="2">
      ${анК('r','7;7;13;7','3s','0;0.4;0.7;1')}${анК('opacity','1;1;0.4;1','3s','0;0.4;0.7;1')}</circle>`;
  };
  const ПАРЫ = (список, сейчас) => A(3,'пары', список.map((п,i)=>
    `<span class="${i<сейчас?'есть':(i===сейчас?'сейчас':'')}">${i<сейчас?'✓ ':''}${пара(п)}</span>`).join(''));

  /* ================= КАДРЫ ================= */

  /* 1. Связь через воду */
  function F1(s){
    const мини = (x0,y0,к,точки) => `<g>
      <rect x="${x0-6}" y="${y0-к*6-6}" width="${к*6+12}" height="${к*6+12}" rx="6"
        fill="rgba(8,11,24,.75)" stroke="${ЛИНИЯ}" stroke-width="1.2"/>
      ${Array.from({length:7},(_,i)=>`<line x1="${x0}" y1="${y0-к*i}" x2="${x0+к*6}" y2="${y0-к*i}"
        stroke="rgba(157,183,255,.18)" stroke-width="0.8"/><line x1="${x0+к*i}" y1="${y0}" x2="${x0+к*i}" y2="${y0-к*6}"
        stroke="rgba(157,183,255,.18)" stroke-width="0.8"/>`).join('')}
      ${точки}
    </g>`;
    return ЛИСТ(s) +
      ЗАДАЧА('Два корабля идут рядом, но до соседа далеко — не докричишься. Как передать ему рисунок? Числами: у обоих на палубе одинаковая сетка, и каждую точку называют <b>парой чисел</b>. Флажками отбивают: «четыре вправо, два вверх» — и там ставят точку.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="250" fill="url(#c1022-фон)"/>
        <rect x="0" y="150" width="336" height="100" fill="url(#c1022-море)"/>
        <rect x="0" y="0" width="336" height="250" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>
        ${корабль(62,168,1.1)}
        ${корабль(270,168,1.1)}
        ${флажки(62,124,ФЛАГ)}
        ${подпись(168,132,'(4;2)',ФЛАГ,20)}
        <path d="M108 104 Q168 70 232 104" fill="none" stroke="${GOLD}" stroke-width="2"
          stroke-dasharray="5 7" opacity=".85">
          ${ДВИЖ?`<animate attributeName="stroke-dashoffset" values="0;-24" dur="1.2s" repeatCount="indefinite"/>`:''}
        </path>
        ${мини(238,92,11, `<circle cx="${238+11*4}" cy="${92-11*2}" r="4.4" fill="url(#c1022-точка)" stroke="${ОБВОД}" stroke-width="1">
          ${анК('r','3;3;5.5;4.4','3s','0;0.5;0.7;1')}</circle>`)}
        ${подпись(168,26,'Связь через воду',GOLD,16)}
        ${подпись(168,232,'рисунок передают парами чисел',МУТ,14)}
      `,250)}</div>` +
      СКАЗ('Два слова','Сетка начинается в углу — в точке <b>(0;0)</b>. Первое число в паре — <b>сколько шагов вправо</b>, его называют <b>х</b> (абсцисса). Второе — <b>сколько вверх</b>, это <b>у</b> (ордината).') +
      ПРАВИЛО('Пару читают так: <b>сначала вправо, потом вверх</b>.');
  }

  /* 2. Песочница: веди точку сам */
  function F2(s){
    const [a,b] = s.тчк || [2,1];
    return ЛИСТ(s) +
      ЗАДАЧА('Поводи точку кнопками и смотри на пару чисел. Жёлтый путь — сколько шагов вправо, голубой — сколько вверх.') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({поверх: `<g>${проявить('6s',0.42,0.6)}${след(a,b)}</g>
          <circle cx="${кx(a)}" cy="${кy(b)}" r="9" fill="url(#c1022-точка)" stroke="${ОБВОД}" stroke-width="1.4"/>
          ${кольцо(кx(a),кy(b),13,GOLD,'6s',0.66)}`})}
        ${подпись(250,26,пара([a,b]),GOLD,20)}
      `,348)}</div>` +
      A(3,'крест',
        `<span class="пусто">·</span>
         <button type="button" onclick="r1022Ход(0,1)" ${b<N?'':'disabled'} aria-label="вверх">↑</button>
         <span class="пусто">·</span>
         <button type="button" onclick="r1022Ход(-1,0)" ${a>0?'':'disabled'} aria-label="влево">←</button>
         <span class="пара">${пара([a,b])}</span>
         <button type="button" onclick="r1022Ход(1,0)" ${a<N?'':'disabled'} aria-label="вправо">→</button>
         <span class="пусто">·</span>
         <button type="button" onclick="r1022Ход(0,-1)" ${b>0?'':'disabled'} aria-label="вниз">↓</button>
         <span class="пусто">·</span>`) +
      СКАЗ('Смотри', (a===0&&b===0)
        ? 'Точка в самом углу — это <b>(0;0)</b>, начало. Отсюда и считают все шаги.'
        : 'Точка <b>'+пара([a,b])+'</b>: '+(a?a+' '+(a===1?'шаг':a<5?'шага':'шагов')+' вправо':'вправо не шли')+', '+
          (b?b+' '+(b===1?'шаг':b<5?'шага':'шагов')+' вверх':'вверх не шли')+'. Кнопки «вправо-влево» меняют <b>первое</b> число, «вверх-вниз» — <b>второе</b>.') +
      ПРАВИЛО('Первое число — <b>по горизонтали</b>, второе — <b>по вертикали</b>. Никогда наоборот.');
  }

  /* 3. Поставь точку сам */
  function F3(s){
    const цель=[4,2], тап=s.тап3, попал = !!s.дело_точка;
    const подсказка = !попал && (s.промахов3||0) >= ПОДСКАЗКА_ПОСЛЕ;
    return ЛИСТ(s) +
      ЗАДАЧА('Первый сигнал с соседнего корабля: <b>(4;2)</b>. Ткни пальцем в сетку — туда, где должна стоять точка.') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          тап: попал ? null : 'r1022Тап3',
          точки: тап ? [{п:тап, цвет: попал?GREEN:RED, r:9}] : [],
          поверх: (подсказка ? `<g>${проявить('5s',0.3,0.5)}${след(4,2)}</g>` : '') +
                  (попал ? кольцо(кx(4),кy(2),14,GREEN,'5s',0.2)
                         : `<circle cx="${кx(0)}" cy="${кy(0)}" r="6" fill="none" stroke="${GOLD}" stroke-width="2">
                              ${анК('r','6;6;11;6','3s','0;0.4;0.7;1')}</circle>`)})}
        ${подпись(250,26, попал?'точка (4;2) стоит':'поставь (4;2)', попал?GREEN:GOLD, 16)}
      `,348)}</div>` +
      (тап==null ? СКАЗ('Как','Начни от угла <b>(0;0)</b> — он мигает. Отсчитай 4 шага вправо, потом 2 вверх и ткни в узел сетки.')
        : РАЗБОР(попал, попал
            ? 'Точно в цель: 4 шага вправо и 2 вверх. Сосед увидит ровно то, что ты передал.'
            : назвать(тап, цель) + (подсказка ? ' На сетке показан путь — пройди по нему.' : ' Попробуй ещё раз — ткни в другой узел.'))) +
      ПРАВИЛО('Точку ставят в <b>узел</b> сетки, где сходятся линии, а не в клетку.');
  }

  /* 4. Принимаем рисунок: четыре пары по очереди */
  function F4(s){
    const к = s.принято||0, всё = к>=КОРПУС.length, мимо = s.мимо4;
    const подсказка = !всё && (s.промахов4||0) >= ПОДСКАЗКА_ПОСЛЕ;
    const взяты = КОРПУС.slice(0,к);
    return ЛИСТ(s) +
      ЗАДАЧА('Пришла целая передача — четыре пары подряд. Ставь их по очереди, пальцем по сетке. Каждая следующая соединится с прошлой — и увидим, что передали.') +
      ПАРЫ(КОРПУС, к) +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          тап: всё ? null : 'r1022Тап4',
          линии: всё ? [{точки:КОРПУС, замкнуто:true, цвет:GOLD, залив:'rgba(255,215,106,.18)'}]
                     : (к>1 ? [{точки:взяты, цвет:GOLD}] : []),
          точки: взяты.map(п=>({п, r:7})).concat(мимо&&!всё ? [{п:мимо, цвет:RED, r:8}] : []),
          поверх: (подсказка ? `<g>${проявить('5s',0.3,0.5)}${след(КОРПУС[к][0],КОРПУС[к][1])}</g>` : '') +
                  (всё ? '' : откуда(взяты)) +
                  (всё ? `<g>${анК('opacity','0.7;1;0.7','4s','0;0.5;1')}
                      ${т(кx(3),кy(3)+10,'это корпус лодки',16,GOLD,true)}</g>` : '')})}
        ${подпись(250,26, всё?'принято 4 из 4':('принято '+к+' из 4'), всё?GREEN:GOLD, 16)}
      `,348)}</div>` +
      (всё
        ? РАЗБОР(true,'Все четыре точки на месте, и линия замкнулась — это <b>корпус лодки</b>. Сосед передал рисунок, не сказав ни слова, одними числами.')
        : (мимо
            ? РАЗБОР(false, назвать(мимо, КОРПУС[к]) + (подсказка?' Путь показан на сетке.':''))
            : СКАЗ('Сейчас', 'Ставь точку <b>'+пара(КОРПУС[к])+'</b>'+(к?' — она соединится с '+пара(КОРПУС[к-1])+'.':'.')))) +
      ПРАВИЛО('Рисунок передают <b>точками по порядку</b>: каждую соединяют с предыдущей.');
  }

  /* 5. Ловушка: пары переставили — лодка встала на нос */
  function F5(s){
    const в = s.о1, верно = в==='ok';
    return ЛИСТ(s) +
      ЗАДАЧА('А вот что вышло у юнги, который читал пары наоборот — сначала вверх, потом вправо. Те же самые четыре пары! Что случилось с лодкой?') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          линии: [{точки:КОРПУС, замкнуто:true, цвет:GOLD, залив:'rgba(255,215,106,.12)', тускло:true},
                  {точки:ПЕРЕВЁРНУТЫЙ, замкнуто:true, цвет:RED, залив:'rgba(232,106,90,.18)'}],
          поверх: `<g>${проявить('6s',0.4,0.58)}<line x1="${кx(0)}" y1="${кy(0)}" x2="${кx(N)}" y2="${кy(N)}"
              stroke="${МУТ}" stroke-width="1.6" stroke-dasharray="4 6"/></g>` })}
        ${подпись(250,26,'те же пары наоборот',RED,14)}
      `,348)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), 'Отразилась по диагонали — встала на нос', "r1022О1('ok')")}
        ${BTN(5, в==='no'?'miss':'', 'Ничего: числа ведь те же', "r1022О1('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно. Числа те же, но каждая точка переехала: (5;1) стала (1;5), (4;2) — (2;4). Вся лодка отразилась через пунктир-диагональ и встала на нос. Сосед получил бы совсем не тот рисунок.'
              : 'Нет — посмотри на красную фигуру. Числа те же, а точки разные: (5;1) и (1;5) — это разные места сетки. Порядок в паре и есть смысл.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ПРАВИЛО('<b>(5;1) и (1;5) — разные точки.</b> Переставишь числа — переставишь весь рисунок.');
  }

  /* 6. Обратно: прочитать координаты */
  function F6(s){
    const в = s.о2, верно = в==='ok', цель=[4,5];
    return ЛИСТ(s) +
      ЗАДАЧА('Теперь наоборот: на сетке уже стоит точка. Какую пару отбить флажками, чтобы сосед поставил её в то же место?') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          точки:[{п:цель, r:9}],
          поверх: (верно ? `<g>${проявить('6s',0.3,0.46)}${след(4,5)}</g>` : '') +
                  кольцо(кx(4),кy(5),14,GOLD,'4s',0.2)})}
        ${подпись(250,26, верно?'это (4;5)':'какая пара?', верно?GREEN:GOLD, 16)}
      `,348)}</div>` +
      `<div class="ask пара">
        ${BTN(4, верно?'hit':(в?'miss':''), '(4;5)', "r1022О2('ok')")}
        ${BTN(5, в==='no'?'miss':'', '(5;4)', "r1022О2('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: от угла 4 шага вправо — это х, потом 5 вверх — это у. Путь показан на сетке.'
              : 'Нет: (5;4) — это 5 вправо и 4 вверх, соседняя точка по диагонали. Считай от угла: вправо 4, вверх 5, значит (4;5).')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ПРАВИЛО('Читая точку, иди тем же путём: <b>сначала вниз к оси х, потом влево к оси у</b>.');
  }

  /* 7. Найди ошибку в записи */
  function F7(s){
    const i = s.строка, нашёл = !!s.дело_ошибка;
    const верная = [[1,1],[5,1],[4,2],[2,2]];
    return ЛИСТ(s) +
      ЗАДАЧА('Юнга записал корпус лодки, но одна пара врёт — на рисунке торчит шип. Ткни в строку с ошибкой.') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          линии: нашёл ? [{точки:С_ОШИБКОЙ, замкнуто:true, цвет:RED, тускло:true},
                          {точки:верная, замкнуто:true, цвет:GREEN, залив:'rgba(143,209,168,.18)'}]
                       : [{точки:С_ОШИБКОЙ, замкнуто:true, цвет:GOLD, залив:'rgba(255,215,106,.12)'}],
          точки: [{п:[2,5], цвет: нашёл?RED:GOLD, r:8}],
          поверх: нашёл ? `<g>${проявить('6s',0.3,0.5)}<circle cx="${кx(2)}" cy="${кy(2)}" r="8"
                      fill="${GREEN}" stroke="${ОБВОД}" stroke-width="1.2"/></g>`
                        : кольцо(кx(2),кy(5),14,RED,'4s',0.2)})}
        ${подпись(250,26, нашёл?'шип убран':'откуда шип?', нашёл?GREEN:GOLD, 16)}
      `,348)}</div>` +
      A(3,'запись', С_ОШИБКОЙ.map((п,к)=>
        `<button type="button" class="${i===к?(к===ОШИБОЧНАЯ?'нашёл':'мимо'):''}" onclick="r1022Строка(${к})">
           <b>${пара(п)}</b>точка ${к+1}<em>${i===к?(к===ОШИБОЧНАЯ?'вот она':'эта верная'):''}</em></button>`).join('')) +
      (i==null ? СКАЗ('Подсказка','Шип указывает на точку, которая вылезла из ряда. Найди её пару в записи.')
        : РАЗБОР(i===ОШИБОЧНАЯ, i===ОШИБОЧНАЯ
            ? 'Нашёл. Записано (2;5), а корпус лежит на высоте 2 — должно быть <b>(2;2)</b>. Одна неверная цифра — и вместо ровного борта острый шип.'
            : 'Пара '+пара(С_ОШИБКОЙ[i])+' верная: она лежит на корпусе. Ищи ту, что уходит вверх, к шипу.')) +
      ПРАВИЛО('Сомневаешься в передаче — <b>проверь каждую пару по рисунку</b>.');
  }

  /* 8. Передай свой рисунок: мачта и парус */
  function F8(s){
    const к = s.свой||0, всё = к>=ПАРУС.length, мимо = s.мимо8;
    const подсказка = !всё && (s.промахов8||0) >= ПОДСКАЗКА_ПОСЛЕ;
    const взяты = ПАРУС.slice(0,к);
    return ЛИСТ(s) +
      ЗАДАЧА('Корпус есть — теперь дорисуй лодке мачту и парус. Сосед передал ещё четыре пары. Ставь их по очереди.') +
      ПАРЫ(ПАРУС, к) +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          тап: всё ? null : 'r1022Тап8',
          линии: [{точки:КОРПУС, замкнуто:true, цвет:GOLD, залив:'rgba(255,215,106,.18)'}]
            .concat(всё ? [{точки:[[3,2],[3,5]], цвет:ИНК, ширина:3.4},
                           {точки:[[3,5],[5,3],[3,3]], замкнуто:true, цвет:ТОЧКА, залив:'rgba(127,209,255,.28)'}]
                        : (к>1 ? [{точки:взяты, цвет:ТОЧКА}] : [])),
          точки: взяты.map(п=>({п, r:6})).concat(мимо&&!всё ? [{п:мимо, цвет:RED, r:8}] : []),
          поверх: (подсказка ? `<g>${проявить('5s',0.3,0.5)}${след(ПАРУС[к][0],ПАРУС[к][1])}</g>` : '') +
                  (всё ? `<g>${проявить('5s',0.3,0.5)}<path d="M${кx(3)} ${кy(5)} L${кx(5)} ${кy(3)} L${кx(3)} ${кy(3)} Z"
                        fill="rgba(127,209,255,.35)" stroke="${GREEN}" stroke-width="2.4"/></g>`
                       : откуда(к ? взяты : [[3,2]]))})}
        ${подпись(250,26, всё?'кораблик готов':('поставлено '+к+' из 4'), всё?GREEN:GOLD, 16)}
      `,348)}</div>` +
      (всё
        ? РАЗБОР(true,'Кораблик целиком: корпус, мачта и парус. Восемь пар чисел — и рисунок перелетел с корабля на корабль.')
        : (мимо
            ? РАЗБОР(false, назвать(мимо, ПАРУС[к]) + (подсказка?' Путь показан на сетке.':''))
            : СКАЗ('Сейчас','Ставь точку <b>'+пара(ПАРУС[к])+'</b>.'))) +
      ПРАВИЛО('Любой рисунок из отрезков можно передать <b>списком пар</b>.');
  }

  /* 9. Точки на осях */
  function F9(s){
    const в = s.о3, верно = в==='ok';
    return ЛИСТ(s) +
      ЗАДАЧА('Если одно из чисел — ноль, точка ложится прямо на ось. Посмотри на три точки. Где будет точка <b>(0;4)</b>?') +
      `<div class="pic">${свг(`
        ${фон(348)}
        ${сетка({
          точки:[{п:[3,0], подпись:'(3;0)', r:8},{п:[0,3], подпись:'(0;3)', r:8},{п:[0,0], подпись:'(0;0)', r:8, цветП:СИНЬ}]
            .concat(верно ? [{п:[0,4], цвет:GREEN, r:9, подпись:'(0;4)', цветП:GREEN}] : []),
          поверх: `<g>${очередь(0,3,'8s')}<line x1="${кx(0)}" y1="${OY}" x2="${кx(N)}" y2="${OY}" stroke="${GOLD}" stroke-width="4" opacity=".5"/></g>
                   <g>${очередь(1,3,'8s')}<line x1="${OX}" y1="${кy(0)}" x2="${OX}" y2="${кy(N)}" stroke="${ТОЧКА}" stroke-width="4" opacity=".5"/></g>`})}
        ${подпись(250,26,'ноль — значит на оси',GOLD,14)}
      `,348)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), 'На вертикальной оси у, в четырёх шагах вверх', "r1022О3('ok')")}
        ${BTN(5, в==='no'?'miss':'', 'На горизонтальной оси х, в четырёх шагах вправо', "r1022О3('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: вправо идём 0 шагов — значит, остаёмся на вертикальной оси. Потом 4 вверх.'
              : 'Нет: 4 вправо — это (4;0). А в паре (0;4) вправо ноль шагов, значит, точка на вертикальной оси у.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ПРАВИЛО('Первое число ноль — точка <b>на оси у</b>. Второе ноль — <b>на оси х</b>.');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    const к = 8, x0=226, y0=150;
    const мини = [...КОРПУС,КОРПУС[0]].map((п,i)=>(i?'L':'M')+(x0+к*п[0])+' '+(y0-к*п[1])).join(' ');
    const парус = [[3,5],[5,3],[3,3]].map((п,i)=>(i?'L':'M')+(x0+к*п[0])+' '+(y0-к*п[1])).join(' ')+' Z';
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Связь налажена: точка поставлена, рисунок принят, ошибка найдена. Теперь ты можешь передать любой рисунок из отрезков.'
        : 'В листе связи отмечено не всё — вернись и добей. А пока посмотри, что получилось у соседа.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="250" fill="url(#c1022-фон)"/>
        <rect x="0" y="160" width="336" height="90" fill="url(#c1022-море)"/>
        <rect x="0" y="0" width="336" height="250" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>
        ${корабль(70,178,1.1)}
        ${флажки(70,134,ФЛАГ)}
        ${подпись(162,142,'(3;5)',ФЛАГ,20)}
        <rect x="${x0-8}" y="${y0-к*6-8}" width="${к*6+16}" height="${к*6+16}" rx="8"
          fill="rgba(8,11,24,.8)" stroke="${ЛИНИЯ}" stroke-width="1.2"/>
        <g>${проявить('6s',0.3,0.5)}
          <path d="${мини}" fill="rgba(255,215,106,.25)" stroke="${GOLD}" stroke-width="2"/>
          <line x1="${x0+к*3}" y1="${y0-к*2}" x2="${x0+к*3}" y2="${y0-к*5}" stroke="${ИНК}" stroke-width="2"/>
          <path d="${парус}" fill="rgba(127,209,255,.35)" stroke="${ТОЧКА}" stroke-width="2"/></g>
        <path d="M112 112 Q170 80 214 112" fill="none" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 7" opacity=".85">
          ${ДВИЖ?`<animate attributeName="stroke-dashoffset" values="0;-24" dur="1.2s" repeatCount="indefinite"/>`:''}
        </path>
        ${подпись(168,26,'Рисунок дошёл',GOLD,16)}
        ${подпись(168,232,'восемь пар — один кораблик',GREEN,14)}
      `,250)}</div>` +
      СКАЗ('Итог','Сетка, начало в углу и пара чисел — этого хватает, чтобы передать рисунок без единого слова. Главное — <b>порядок в паре</b>: сначала вправо, потом вверх.') +
      ПРАВИЛО('<b>(х;у): х — сколько вправо, у — сколько вверх.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Точка стоит на 4 шага вправо от угла и на 1 шаг вверх. Как её записать?',
      варианты:[{т:'(4;1)',ок:true},{т:'(1;4)',ок:false}],
      разбор:'Первое число — сколько вправо, второе — сколько вверх: (4;1).' },
    { вопрос:'Передали пару (0;5). Где точка?',
      варианты:[{т:'На вертикальной оси у, в пяти шагах вверх',ок:true},{т:'На горизонтальной оси х, в пяти шагах вправо',ок:false}],
      разбор:'Вправо ноль шагов — остаёмся на оси у. Потом 5 вверх.' },
    { вопрос:'(3;6) и (6;3) — это одна и та же точка?',
      варианты:[{т:'Нет, это разные точки',ок:true},{т:'Да, числа же одинаковые',ок:false}],
      разбор:'(3;6) — 3 вправо и 6 вверх, (6;3) — 6 вправо и 3 вверх. Разные места сетки.' },
    { вопрос:'Какая пара у самого угла сетки, откуда считают все шаги?',
      варианты:[{т:'(0;0)',ок:true},{т:'(1;1)',ок:false}],
      разбор:'Из угла не сделано ни одного шага — ни вправо, ни вверх. Это начало, (0;0).' },
    { вопрос:'Всю передачу прочитали наоборот: вместо (х;у) — (у;х). Что стало с рисунком?',
      варианты:[{т:'Отразился по диагонали',ок:true},{т:'Стал в два раза больше',ок:false}],
      разбор:'Каждая точка переехала на своё отражение через диагональ, и весь рисунок встал наоборот.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r1022Reset()")}</div>` +
        ПРАВИЛО('<b>Сначала вправо, потом вверх.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к,
        выбран===к ? (в.ок?'hit':'miss') : '',
        в.т, "r1022Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Записать пару', задания:[
    {q:'2 шага вправо, 5 вверх. Какая пара?', в:0, варианты:['(2;5)','(5;2)'], раз:'Сначала вправо: 2. Потом вверх: 5.'},
    {q:'6 шагов вправо, вверх не шли. Какая пара?', в:1, варианты:['(0;6)','(6;0)'], раз:'Вправо 6, вверх 0: (6;0), точка на оси х.'},
    {q:'Вправо не шли, 4 шага вверх. Какая пара?', в:0, варианты:['(0;4)','(4;0)'], раз:'Вправо 0, вверх 4: (0;4), точка на оси у.'},
    {q:'Какое число в паре пишут первым?', в:1, варианты:['Сколько вверх','Сколько вправо'], раз:'Первым — х, сколько вправо. Вторым — у, сколько вверх.'}
  ]};
  const Т2 = { имя:'Найти место', задания:[
    {q:'Точка (5;2). Сколько шагов вправо от угла?', в:0, варианты:['5','2'], раз:'Первое число — вправо: 5.'},
    {q:'Точка (5;2). Сколько шагов вверх?', в:1, варианты:['5','2'], раз:'Второе число — вверх: 2.'},
    {q:'Точка (3;0). Где она?', в:0, варианты:['На оси х','На оси у'], раз:'Вверх ноль шагов — точка лежит на горизонтальной оси х.'},
    {q:'Точка (0;0). Где она?', в:1, варианты:['На середине сетки','В углу, в начале'], раз:'Ни одного шага — это начало, угол сетки.'}
  ]};
  const Т3 = { имя:'Ошибки передачи', задания:[
    {q:'Передали (1;4), а приняли (4;1). Это одна точка?', в:1, варианты:['Да','Нет'], раз:'Числа те же, но переставлены — точки разные.'},
    {q:'Сетка от 0 до 6. Передали (2;7). Что не так?', в:0, варианты:['Семь вверх — за краем сетки','Всё в порядке'], раз:'Вверх можно не больше чем на 6 — точка (2;7) за сеткой.'},
    {q:'Рисунок пришёл отражённым по диагонали. Что перепутали?', в:1, варианты:['Сетку','Порядок чисел в парах'], раз:'Если читать (у;х) вместо (х;у), рисунок отражается через диагональ.'},
    {q:'Точка (0;2). На какой она оси?', в:0, варианты:['На оси у','На оси х'], раз:'Вправо ноль — точка на вертикальной оси у.'}
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
        в, "r1022T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r1022TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L1022 = {
    id: ID,
    title: 'Координатный угол: передача рисунка',
    ico: '📍',
    src: 'Начальная школа · 4 класс · Координатный угол',
    subj: 'jun',
    explain: [
      'Два корабля далеко друг от друга, не докричишься. Рисунок передают парами чисел: у обоих одинаковая сетка, и каждую точку называют парой — сначала сколько вправо, потом сколько вверх.',
      'Поводи точку кнопками: «вправо-влево» меняют первое число пары, «вверх-вниз» — второе. Жёлтый путь — шаги вправо, голубой — вверх.',
      'Поставь точку (4;2) сам — пальцем по сетке. От угла 4 шага вправо и 2 вверх.',
      'Приём рисунка: четыре пары подряд, каждая соединяется с прошлой. Получается корпус лодки.',
      'Ловушка: те же пары, прочитанные наоборот, дают лодку, вставшую на нос. (5;1) и (1;5) — разные точки.',
      'Обратная задача: точка уже стоит — прочитай её пару. Сначала шаги вправо, потом вверх: (4;5).',
      'Найди ошибку в записи: одна пара врёт, и на рисунке шип. Записано (2;5), а надо (2;2).',
      'Дорисуй лодке мачту и парус — ещё четыре пары. Восемь пар чисел, и рисунок перелетел с корабля на корабль.',
      'Если одно число ноль, точка на оси: (0;4) — на вертикальной оси у, (4;0) — на горизонтальной оси х, (0;0) — в углу.',
      'Итог: сетка, начало в углу и пара чисел. Главное — порядок: сначала вправо, потом вверх.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: записать пару.',
      'Тренажёр 2: найти место.',
      'Тренажёр 3: ошибки передачи.'
    ],
    check: {
      q: 'Точка стоит на 4 шага вправо от угла сетки и на 1 шаг вверх. Как её записать?',
      choices: ['(4;1)','(1;4)','(4+1)'],
      ans: 0,
      exp: 'Первое число — сколько вправо, второе — сколько вверх: (4;1).'
    },
    tasks: [
      { q:'Точка на 4 шага вправо и 1 вверх. Какая пара?', kind:'choice',
        choices:['(4;1)','(1;4)'], ans:0,
        hints:['Первое число — сколько вправо.','Второе — сколько вверх.'],
        sol:'(4;1).' },
      { q:'Передали пару (0;5). Где точка?', kind:'choice',
        choices:['На оси у','На оси х'], ans:0,
        hints:['Вправо ноль шагов.','Значит, остаёмся на вертикальной оси.'],
        sol:'На вертикальной оси у, в пяти шагах вверх.' },
      { q:'Передали (2;3), а нарисовали (3;2). Это та же точка?', kind:'choice',
        choices:['Нет, другая','Да, та же'], ans:0,
        hints:['Числа те же, но в каком порядке?','Порядок в паре и есть смысл.'],
        sol:'Нет: переставили числа — получили другую точку.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L1022.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s);
    else if(f===2) сцена=F2(s);
    else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s);
    else if(f===5) сцена=F5(s);
    else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s);
    else if(f===8) сцена=F8(s);
    else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s);
    else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1);
    else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);

    const ЗАГОЛОВКИ={
      1:'Связь через воду', 2:'Как читается пара', 3:'Поставь точку', 4:'Приём рисунка',
      5:'Ловушка', 6:'Прочитай пару', 7:'Найди ошибку', 8:'Дорисуй парус',
      9:'Точки на осях', 10:'Рисунок дошёл', 11:'Практика',
      12:'Тренажёр 1', 13:'Тренажёр 2', 14:'Тренажёр 3'
    };
    el.innerHTML = `<div class="s6 l1022" data-frame="${f}">
        <h2>${ЗАГОЛОВКИ[f]||'Координатный угол'}</h2>
        ${сцена}
      </div>`;
  }

  const вСетке = (v) => Math.max(0, Math.min(N, v));
  window.r1022Ход  =(dx,dy)=>{ const s=S(); const [a,b]=s.тчк||[2,1];
    s.тчк=[вСетке(a+dx), вСетке(b+dy)]; chRender(0); };
  window.r1022Тап3 =(a,b)=>{ const s=S(); if(s.дело_точка) return;
    s.тап3=[a,b];
    if(a===4 && b===2) s.дело_точка=true; else s.промахов3=(s.промахов3||0)+1;
    chRender(0); };
  /* общий приём для «ставь пары по очереди»: верный узел двигает дальше,
     неверный запоминается, чтобы назвать ошибку, и копит промахи для подсказки */
  const поочерёдно = (s,список,ключ,мимо,промахи,готово) => (a,b) => {
    const к = s[ключ]||0; if(к>=список.length) return;
    const ц = список[к];
    if(a===ц[0] && b===ц[1]){
      s[ключ]=к+1; s[мимо]=null; s[промахи]=0;
      if(s[ключ]===список.length && готово) s[готово]=true;
    } else { s[мимо]=[a,b]; s[промахи]=(s[промахи]||0)+1; }
  };
  window.r1022Тап4 =(a,b)=>{ const s=S(); поочерёдно(s,КОРПУС,'принято','мимо4','промахов4','дело_приём')(a,b); chRender(0); };
  window.r1022Тап8 =(a,b)=>{ const s=S(); поочерёдно(s,ПАРУС,'свой','мимо8','промахов8',null)(a,b); chRender(0); };
  window.r1022Строка=(i)=>{ const s=S(); s.строка=i; if(i===ОШИБОЧНАЯ) s.дело_ошибка=true; chRender(0); };
  window.r1022О1  =(к)=>{ S().о1=к; chRender(0); };
  window.r1022О2  =(к)=>{ S().о2=к; chRender(0); };
  window.r1022О3  =(к)=>{ S().о3=к; chRender(0); };
  window.r1022Pick=(уровень,вариант)=>{
    const s=S();
    s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1;
    chRender(0);
  };
  window.r1022Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r1022T=(ключ,вариант)=>{
    const s=S();
    if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const шаг=(s[ключ+'Шаг']||0)%набор.задания.length;
    const з=набор.задания[шаг];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0);
  };
  window.r1022TNext=(ключ)=>{
    const s=S();
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length;
    s[ключ+'Ответ']=null;
    chRender(0);
  };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){
        const место=arr.findIndex(L=>L && L.id===ID);
        if(место>=0) arr[место]=L1022; else arr.push(L1022);
      }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA1022={render:render, L:L1022};
})();
