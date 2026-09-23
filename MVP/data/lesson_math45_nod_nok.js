/* ====== МАТЕМАТИКА · УРОК 45 · «НОД И НОК» =======================================
   6 класс, делимость. Ключевой урок темы. Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (data/lessons.js — 5 кадров, vis_wk.js visW45 — 18 кадров текста) остаются;
   этот файл регистрируется поверх.

   ОБЪЯСНЕНИЕ — ОТ СМЫСЛА К СПОСОБУ. Каждое понятие сначала дано вещью:
     делитель — на сколько ящиков 12 амфор ложатся поровну (руками, с остатком
       на виду);
     НОД — наибольшее число одинаковых подарков из 12 амфор и 18 мешков;
     кратное и НОК — когда снова совпадут метки на шестернях и удары барабанов;
   и только потом способ: «кирпичики» — простые множители. НОД — общие
   кирпичики, НОК — все кирпичики без повторов. Связь НОД · НОК = a · b и
   применение к дробям — в конце.

   СЮЖЕТ — ИЗ ИСТОРИИ. «Сиракосия» — самый большой корабль древности, его
   строили под надзором Архимеда, и царь Гиерон II отправил его в дар
   египетскому царю Птолемею. Ученик Архимеда ведёт счёт в походе: делит
   дары, налаживает лебёдку, держит ритм гребцов, причаливает у Фароса.
   Ход квеста — судовой журнал из трёх дел.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     делители 12: 1, 2, 3, 4, 6, 12 (5 ящиков — остаток 2, 7 — остаток 5…);
     дары: 12 амфор и 18 мешков; подарков 6 → по 2 амфоры и 3 мешка;
       4 подарка — 18 : 4 = 4 и 2 в остатке; 3 подарка — поровну, но не
       наибольшее; делители 18: 1, 2, 3, 6, 9, 18; общие 1, 2, 3, 6 → НОД 6;
     барабаны: удар каждые 4 и 6 тактов — вместе на 12, 24, … → НОК 12;
     шестерни 6 и 8 зубьев: метки сходятся через 24 зуба (малая — 4
       оборота, большая — 3); 48 = 6 · 8 — общее, не наименьшее; 14 = 6 + 8;
       в анимации малая шестерня делает оборот за 3 с, большая за 4 с —
       метки совпадают каждые 12 с;
     кирпичики: 12 = 2 · 2 · 3, 18 = 2 · 3 · 3; НОД = 2 · 3 = 6;
       НОК = 2 · 2 · 3 · 3 = 36; 6 · 36 = 216 = 12 · 18;
     дроби: 12/18 = 2/3 (делим на 6); 1/6 + 1/8 = 4/24 + 3/24 = 7/24.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>,
   вращения animateTransform — с невидимым «заводом». Без движения —
   конечное состояние. */
(function(){
  'use strict';

  const ID = 45;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛАЗУРЬ='#8fd0f0', БРОНЗА='#e0a050';
  const ИНК='#f5efe2', МУТ='#bcc3d2', ЛИНИЯ='#4d5a80', ОБВОД='#0f0c08';
  const СИН='#5f9be8', КРАСН='#e8705a', ЗЕЛ='#6fbf7f';

  const ДЕЛА = [
    {ключ:'дары',     имя:'Разделить дары поровну',    итог:'6 подарков'},
    {ключ:'шестерни', имя:'Наладить лебёдку',          итог:'24 зуба'},
    {ключ:'фарос',    имя:'Причалить у Фароса',        итог:'НОД и НОК'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l45{gap:14px}
  #lvis .s6.l45 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l45 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l45 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#1f2a44,#131a2e);border:1.5px solid var(--line)}
  #lvis .s6.l45 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l45 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l45 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l45 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l45 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l45 .карт .текст b{color:${GOLD}}
  #lvis .s6.l45 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l45 .правило b{color:${GOLD}}
  #lvis .s6.l45 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(143,208,240,.14),rgba(143,208,240,.04));
    border:1.5px solid rgba(143,208,240,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l45 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l45 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ЛАЗУРЬ}}
  #lvis .s6.l45 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l45 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l45 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l45 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l45 .лист li.есть{color:${ИНК}}
  #lvis .s6.l45 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l45 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l45 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l45 .рычаг{display:grid;grid-template-columns:64px 1fr 64px;gap:8px;align-items:center;width:100%}
  #lvis .s6.l45 .рычаг button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:24px;font-weight:700;
    border:1.5px solid rgba(143,208,240,.55);background:rgba(143,208,240,.13);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l45 .рычаг button:active{transform:translateY(2px);background:rgba(143,208,240,.26)}
  #lvis .s6.l45 .рычаг button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l45 .рычаг b{text-align:center;font-size:20px;color:${GOLD};font-variant-numeric:tabular-nums}
  #lvis .s6.l45 .найдено{display:flex;flex-wrap:wrap;gap:6px;width:100%}
  #lvis .s6.l45 .найдено span{min-width:40px;text-align:center;padding:6px 10px;border-radius:10px;font-size:16px;font-weight:700;
    border:1.5px solid ${GREEN};color:${GREEN};background:rgba(143,224,176,.1);font-variant-numeric:tabular-nums}
  #lvis .s6.l45 .найдено span.нет{border-color:rgba(255,255,255,.18);color:var(--mut);background:none}
  #lvis .s6.l45 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l45 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l45 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l45 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l45 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l45 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l45 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:20px}
  #lvis .s6.l45 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l45 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l45 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l45 .уровни .точка.сейчас{background:${GOLD};animation:l45dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l45dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l45 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l45{-webkit-text-size-adjust:100%}
  #lvis .s6.l45 [data-anim]{animation:l45rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l45rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l45 [data-anim]{animation:none!important}
    #lvis .s6.l45 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l45 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l45-style');
      if(!s){ s=document.createElement('style'); s.id='l45-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">«Сиракосия»</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,обр) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(4+к, в===к?(к===верный?'hit':'miss'):'', v, обр+"("+к+")")).join('')}</div>`;
  const ЛИСТ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'лист',
      `<div class="шапка"><span>Судовой журнал</span><b class="${всё?'готово':''}">${
        всё?'поход завершён':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  const анРаз = (имя,значения,длит) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" fill="freeze"
              calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';
  const ЗАВОД = `<rect width="0" height="0" fill="none"><animate attributeName="x" values="0;0" dur="1s" repeatCount="indefinite"/></rect>`;
  const анСдвиг = (значения,длит,keyTimes) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              repeatCount="indefinite" calcMode="spline" keyTimes="${keyTimes}"
              keySplines="${сплайны(keyTimes.split(';').length-1)}"/>${ЗАВОД}` : '';
  const анВращ = (от,до,cx,cy,длит) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="rotate" from="${от} ${cx} ${cy}" to="${до} ${cx} ${cy}" dur="${длит}" repeatCount="indefinite"/>${ЗАВОД}` : '';
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
      <linearGradient id="c45-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b6fb0"/><stop offset="0.55" stop-color="#8fbde0"/><stop offset="1" stop-color="#f4d9a8"/>
      </linearGradient>
      <linearGradient id="c45-закат" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a2f63"/><stop offset="0.55" stop-color="#b8607a"/><stop offset="1" stop-color="#ffc07a"/>
      </linearGradient>
      <linearGradient id="c45-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2f6a9a"/><stop offset="1" stop-color="#0f2f52"/>
      </linearGradient>
      <linearGradient id="c45-трюм" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2a1c"/><stop offset="1" stop-color="#1c140c"/>
      </linearGradient>
      <radialGradient id="c45-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffbe0"/><stop offset="0.4" stop-color="#ffe0a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffc07a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c45-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffe9b0" stop-opacity=".45"/><stop offset="1" stop-color="#ffe9b0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c45-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9a6536"/><stop offset="0.5" stop-color="#6d4322"/><stop offset="1" stop-color="#3f2410"/>
      </linearGradient>
      <linearGradient id="c45-парус" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#e8dcc0"/><stop offset="0.5" stop-color="#fbf5e6"/><stop offset="1" stop-color="#d8c8a4"/>
      </linearGradient>
      <linearGradient id="c45-пурпур" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#b04a8c"/><stop offset="1" stop-color="#5e1a4a"/>
      </linearGradient>
      <linearGradient id="c45-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a0703f"/><stop offset="0.5" stop-color="#7a4f28"/><stop offset="1" stop-color="#4f3016"/>
      </linearGradient>
      <linearGradient id="c45-амфора" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8e3f22"/><stop offset="0.35" stop-color="#e08a5a"/><stop offset="0.6" stop-color="#c2653a"/><stop offset="1" stop-color="#6e2e17"/>
      </linearGradient>
      <linearGradient id="c45-мешок" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f0dcae"/><stop offset="1" stop-color="#a88652"/>
      </linearGradient>
      <linearGradient id="c45-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f6d392"/><stop offset="0.45" stop-color="#c98f3e"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <radialGradient id="c45-бронза-р" cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffe6ac"/><stop offset="0.5" stop-color="#c98f3e"/><stop offset="1" stop-color="#5a3a10"/>
      </radialGradient>
      <linearGradient id="c45-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6ead0"/><stop offset="1" stop-color="#dcc697"/>
      </linearGradient>
      <linearGradient id="c45-кирпич-с" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8ccff"/><stop offset="1" stop-color="#3f74c0"/>
      </linearGradient>
      <linearGradient id="c45-кирпич-к" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffc0a8"/><stop offset="1" stop-color="#c04a30"/>
      </linearGradient>
      <linearGradient id="c45-мрамор" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b8ad9a"/><stop offset="0.45" stop-color="#f6f0e2"/><stop offset="1" stop-color="#a99d88"/>
      </linearGradient>
      <radialGradient id="c45-пламя" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0" stop-color="#fff6c8"/><stop offset="0.4" stop-color="#ffb35c"/><stop offset="1" stop-color="#ff6a3c" stop-opacity="0"/>
      </radialGradient>
      <filter id="c45-тень" x="-30%" y="-30%" width="160%" height="170%">
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
    return `<g filter="url(#c45-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,14,24,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  const море = (y,в) => `<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c45-море)"/>
    ${[0,1,2,3].map(i=>`<path d="M${-30+i*17} ${y+10+i*12} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none"
      stroke="#cfe8ff" stroke-width="1.1" opacity="${(0.45-i*0.08).toFixed(2)}" stroke-dasharray="16 20">
      ${анЛин('stroke-dashoffset','0;-36',(3.2+i*0.5).toFixed(1)+'s')}</path>`).join('')}`;
  const трюм = (в) => `<rect x="0" y="0" width="336" height="${в}" fill="url(#c45-трюм)"/>
    ${[0,1,2,3,4,5,6,7].map(i=>`<line x1="0" y1="${i*в/8}" x2="336" y2="${i*в/8+6}" stroke="#4a3624" stroke-width="1" opacity=".5"/>`).join('')}
    <circle cx="168" cy="20" r="80" fill="url(#c45-лампа)">${анЛин('opacity','1;0.8;1','3s')}</circle>`;

  /* «Сиракосия»: огромный корпус, три мачты, башенки, ряды вёсел */
  const сиракосия = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c45-тень)">
    <path d="M-140 0 q18 40 140 40 q122 0 140 -40 l10 -20 q-12 6 -20 10 z" fill="url(#c45-корпус)" stroke="${ОБВОД}" stroke-width="1.2"/>
    <path d="M-132 8 q20 24 132 24 q112 0 132 -24" fill="none" stroke="#e0b060" stroke-width="2"/>
    ${Array.from({length:14},(_,i)=>`<line x1="${-112+i*17}" y1="24" x2="${-120+i*17}" y2="46" stroke="#3f2410" stroke-width="1.8"/>`).join('')}
    ${[-100,-40,20,80].map(bx=>`<g><rect x="${bx}" y="-18" width="22" height="18" fill="url(#c45-мрамор)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M${bx-2} -18 l13 -10 l13 10 z" fill="#8a3a2a"/></g>`).join('')}
    ${[-70,0,70].map((mx,i)=>`<g><line x1="${mx}" y1="0" x2="${mx}" y2="${-96+i*8}" stroke="#3f2410" stroke-width="3"/>
      <path d="M${mx-34} ${-88+i*8} Q${mx} ${-76+i*8} ${mx+34} ${-88+i*8} L${mx+30} ${-30} Q${mx} ${-24} ${mx-30} ${-30} Z" fill="url(#c45-парус)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="${mx}" cy="${-58+i*4}" r="9" fill="url(#c45-пурпур)" opacity=".85"/>
      <path d="M${mx} ${-96+i*8} l14 4 l-14 4 z" fill="#b04a8c">${анЛин('d',`M${mx} ${-96+i*8} l14 4 l-14 4 z;M${mx} ${-96+i*8} l12 7 l-12 1 z;M${mx} ${-96+i*8} l14 4 l-14 4 z`,(1.4+i*0.3).toFixed(1)+'s')}</path></g>`).join('')}
  </g>`;
  const амфора = (x,y,м,цв) => `<g transform="translate(${x} ${y}) scale(${м||1})">
    <path d="M-3 -14 h6 l1 3 q5 2 5 8 q0 8 -5 12 l-2 3 h-4 l-2 -3 q-5 -4 -5 -12 q0 -6 5 -8 z" fill="${цв||'url(#c45-амфора)'}" stroke="${ОБВОД}" stroke-width=".6"/>
    <path d="M-3 -12 q-4 1 -4 5 M3 -12 q4 1 4 5" fill="none" stroke="#6e2e17" stroke-width="1.2"/></g>`;
  const мешок = (x,y,м,цв) => `<g transform="translate(${x} ${y}) scale(${м||1})">
    <path d="M-7 8 q-2 -11 4 -15 l-2 -3 h10 l-2 3 q6 4 4 15 z" fill="${цв||'url(#c45-мешок)'}" stroke="${ОБВОД}" stroke-width=".6"/>
    <path d="M-4 -7 q4 2 8 0" fill="none" stroke="#6d4a22" stroke-width="1.2"/></g>`;

  /* раскладка по ящикам: k ящиков, в каждом поровну; что не легло — на палубе красным */
  function ящики(k,товары,y0,высота){
    const cols=Math.min(k,4), rows=Math.ceil(k/4), ш=(304-(cols-1)*8)/cols, в=Math.min(76,(высота-(rows-1)*8)/rows);
    let r='';
    for(let н=0;н<k;н++){
      const cx=16+(н%cols)*(ш+8), cy=y0+Math.floor(н/cols)*(в+8);
      r+=`<g filter="url(#c45-тень)"><rect x="${cx}" y="${cy}" width="${ш}" height="${в}" rx="6" fill="url(#c45-дерево)" stroke="${ОБВОД}" stroke-width="1"/>
        <rect x="${cx+3}" y="${cy+3}" width="${ш-6}" height="${в-6}" rx="4" fill="rgba(20,12,4,.35)"/></g>`;
      товары.forEach((т_,ряд)=>{
        const в_ящ = Math.floor(т_.n/k), шаг=Math.min(т_.шаг, (ш-10)/Math.max(1,в_ящ));
        const yy = cy + (товары.length===1 ? в/2+6 : 22+ряд*(в-30));
        for(let j=0;j<в_ящ;j++) r+= т_.рис(cx+ш/2+(j-(в_ящ-1)/2)*шаг, yy, т_.м);
      });
    }
    /* остаток */
    let ост='', ox=16;
    товары.forEach(т_=>{ const о=т_.n%k; for(let j=0;j<о;j++){ ост+=`<g>${анЛин('opacity','1;0.45;1','1.2s')}${т_.рис(ox+10,y0+высота+18,т_.м,'#c0392b')}</g>`; ox+=т_.шаг; } ox+=8; });
    return {рис:r+ост, остаток:товары.map(т_=>т_.n%k)};
  }

  /* шестерня: n зубьев, радиус по числу зубьев, метка — золотой зуб */
  const шестерня = (cx,cy,n,R,цвет,знак,угол) => {
    const h=7; let d='';
    for(let i=0;i<n;i++){
      const сд=(угол||0)*Math.PI/180-0.375/n*2*Math.PI;
      const a0=сд+i/n*2*Math.PI, a1=сд+(i+0.25)/n*2*Math.PI, a2=сд+(i+0.5)/n*2*Math.PI, a3=сд+(i+0.75)/n*2*Math.PI;
      const p=(a,r)=>(cx+r*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);
      d+=(i?'L':'M')+p(a0,R)+' L'+p(a1,R+h)+' L'+p(a2,R+h)+' L'+p(a3,R);
    }
    /* метка — на зубе, смотрящем в точку зацепления (угол в градусах) */
    const ум=(угол||0)*Math.PI/180, мx=cx+(R+h-2)*Math.cos(ум), мy=cy+(R+h-2)*Math.sin(ум);
    return `<path d="${d} Z" fill="${цвет}" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="${cx}" cy="${cy}" r="${R*0.62}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="2"/>
      ${Array.from({length:4},(_,i)=>{ const a=i*Math.PI/2; return `<line x1="${cx}" y1="${cy}" x2="${(cx+R*0.6*Math.cos(a)).toFixed(1)}" y2="${(cy+R*0.6*Math.sin(a)).toFixed(1)}" stroke="rgba(0,0,0,.35)" stroke-width="3"/>`; }).join('')}
      <circle cx="${cx}" cy="${cy}" r="6" fill="#3a2410"/>
      <circle cx="${мx.toFixed(1)}" cy="${мy.toFixed(1)}" r="5" fill="${знак||GOLD}" stroke="${ОБВОД}" stroke-width=".8"/>`;
  };

  /* кирпичик простого множителя */
  const кирпич = (x,y,p,вкл,тускло) => `<g opacity="${тускло?0.35:1}" filter="url(#c45-тень)">
    <rect x="${x-20}" y="${y-13}" width="40" height="26" rx="5" fill="url(#c45-кирпич-${p===2?'с':'к'})" stroke="${вкл?GOLD:ОБВОД}" stroke-width="${вкл?2.4:1}"/>
    <rect x="${x-16}" y="${y-10}" width="32" height="4" rx="2" fill="rgba(255,255,255,.35)"/>
    ${т(x,y+6,String(p),16,'#101828',true)}</g>`;

  /* ================= КАДРЫ ================= */

  /* 1. «Сиракосия» */
  function F1(s){
    const Н=280;
    return ЛИСТ(s) +
      ЗАДАЧА('Сиракузы, гавань. На воде — <b>«Сиракосия»</b>, самый большой корабль древнего мира: три мачты, башни на палубе, сотни гребцов. Строили её под надзором Архимеда, и царь Гиерон дарит её египетскому царю Птолемею. Архимед отправляет тебя в поход: «Будешь считать. А считать придётся <b>делители и кратные</b>».') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c45-небо)"/>
        <circle cx="60" cy="54" r="40" fill="url(#c45-солнце)">${анЛин('r','38;44;38','6s')}</circle>
        ${[[240,40],[290,60],[196,30]].map((ч,i)=>`<g>${анСдвиг('0 0;'+(8+i*3)+' -3;0 0',(5+i)+'s','0;0.5;1')}<path d="M${ч[0]} ${ч[1]} q5 -4 10 0 q5 -4 10 0" fill="none" stroke="#2a3050" stroke-width="1.4"/></g>`).join('')}
        ${море(176,Н)}
        <g>${анСдвиг('0 0;0 -3;0 0','5s','0;0.5;1')}${сиракосия(168,196,0.95)}</g>
        ${подпись(168,28,'«Сиракосия» — дар Египту',GOLD,16)}
        ${подпись(168,Н-12,'самый большой корабль древности',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Два слова','<b>Делитель</b> числа — число, на которое оно делится без остатка. <b>Кратное</b> — число, которое делится на данное без остатка. 12 делится на 3 — значит, 3 делитель 12, а 12 кратно 3.') +
      ПРАВИЛО('<b>Делитель</b> — на что делится. <b>Кратное</b> — что делится.');
  }

  /* 2. Делители: 12 амфор по ящикам */
  function F2(s){
    const Н=300, k=s.k2||5, найдены=s.делители2||[];
    const р = ящики(k,[{n:12,рис:амфора,м:1,шаг:20}],44,200);
    const поровну = р.остаток[0]===0;
    return ЛИСТ(s) +
      ЗАДАЧА('Первое дело в трюме: <b>12 амфор с маслом</b> надо разложить по ящикам <b>поровну</b>. Меняй число ящиков и смотри: где все ложатся ровно, а где остаются лишние (они красные). Найди <b>все</b> подходящие числа.') +
      `<div class="pic">${свг(`
        ${трюм(Н)}
        ${т(168,28,'12 амфор в '+k+' ящ'+(k===1?'ик':(k<5?'ика':'иков')),16,GOLD,true)}
        ${р.рис}
        ${подпись(168,Н-12, поровну ? '12 : '+k+' = '+(12/k)+' — '+k+' делитель 12' : '12 : '+k+' = '+Math.floor(12/k)+' и '+(12%k)+' в остатке', поровну?GREEN:RED,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r45K2(-1)",k<=1)}<b>ящиков: ${k}</b>${BTN(3,'','+',"r45K2(1)",k>=12)}</div>` +
      A(4,'найдено',Array.from({length:12},(_,i)=>i+1).map(д=>`<span class="${найдены.includes(д)?'':'нет'}">${найдены.includes(д)?д:'·'}</span>`).join('')) +
      (найдены.length===6
        ? РАЗБОР(true,'Все делители 12: <b>1, 2, 3, 4, 6, 12</b>. Заметь — они ходят парами: 1 и 12, 2 и 6, 3 и 4 (в произведении 12).')
        : СКАЗ('Как искать','Найдено '+найдены.length+' из 6. Делители всегда найдутся парами: если 12 делится на 3, то и на 12 : 3 = 4.')) +
      (найдены.length===6 ? ПРАВИЛО('<b>Делители</b> — числа, на которые делится без остатка. У 12 их шесть.') : '');
  }

  /* 3. НОД: дары поровну */
  function F3(s){
    const Н=316, k=s.k3||4, в=s.ответ3;
    const р = ящики(k,[{n:12,рис:амфора,м:0.95,шаг:19},{n:18,рис:мешок,м:0.95,шаг:15}],50,200);
    const ок = р.остаток[0]===0 && р.остаток[1]===0;
    const разборы = ['3 подарка — поровну (по 4 амфоры и 6 мешков), но можно <b>больше</b>: попробуй дальше.',
      '<b>6</b> — самое большое число, на которое делятся и 12, и 18: по 2 амфоры и 3 мешка. Это и есть <b>наибольший общий делитель</b>: НОД(12, 18) = 6.',
      '9 подарков: мешков хватает (18 : 9 = 2), а амфор нет — 12 : 9 = 1 и 3 в остатке.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Дары для городов Египта: <b>12 амфор масла</b> и <b>18 мешков зерна</b>. Каждый подарок должен быть <b>одинаковым</b>, и ничего не должно остаться. Царь хочет порадовать как можно <b>больше</b> городов. Сколько подарков собрать?') +
      `<div class="pic">${свг(`
        ${трюм(Н)}
        ${т(168,30,k+' подар'+(k===1?'ок':(k<5?'ка':'ков'))+' · в каждом '+Math.floor(12/k)+' амф. и '+Math.floor(18/k)+' меш.',14,GOLD,true)}
        ${р.рис}
        ${подпись(168,Н-12, ок ? 'поровну! 12 и 18 делятся на '+k : 'лишние: амфор '+р.остаток[0]+', мешков '+р.остаток[1], ок?GREEN:RED,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="рычаг">${BTN(3,'','−',"r45K3(-1)",k<=1)}<b>подарков: ${k}</b>${BTN(3,'','+',"r45K3(1)",k>=9)}</div>` +
      ОТВЕТЫ('три',['3','6','9'],1,в,'r45Отв3') +
      (в==null ? СКАЗ('Вопрос','Какое наибольшее число одинаковых подарков?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОД</b> — наибольший общий делитель: самое большое число, на которое делятся <b>оба</b>.') : '');
  }

  /* 4. Общие делители: два круга */
  function F4(s){
    const Н=268, в=s.ответ4;
    const только12=[4,12], только18=[9,18], общие=[1,2,3,6];
    const числа = (список,x0,y0,цвет,н0) => список.map((ч,i)=>`<g>${анК('opacity','0.2;0.2;1;1','7s','0;'+кт(0.05+(н0+i)*0.07)+';'+кт(0.1+(н0+i)*0.07)+';1')}
      ${т(x0,y0+i*30,String(ч),20,цвет,true)}</g>`).join('');
    return ЛИСТ(s) +
      ЗАДАЧА('Штурман чертит на пергаменте два круга: слева — делители 12, справа — делители 18. В середине, где круги перекрываются, — <b>общие</b> делители.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1a1530"/>
        <g filter="url(#c45-тень)"><rect x="10" y="12" width="316" height="${Н-44}" rx="10" fill="url(#c45-пергамент)"/></g>
        <circle cx="128" cy="124" r="90" fill="rgba(95,155,232,.2)" stroke="${СИН}" stroke-width="2.4"/>
        <circle cx="208" cy="124" r="90" fill="rgba(232,112,90,.2)" stroke="${КРАСН}" stroke-width="2.4"/>
        ${т(78,36,'делители 12',12,'#2a4f8a',true)}${т(258,36,'делители 18',12,'#8a2e1a',true)}
        ${числа(только12,80,110,'#2a4f8a',0)}${числа(только18,256,110,'#8a2e1a',2)}
        ${числа(общие,168,78,'#3a2410',4)}
        <circle cx="168" cy="${78+3*30-6}" r="17" fill="none" stroke="${в===1?'#2e8b57':'#c9a34a'}" stroke-width="2.4">${анЛин('r','16;20;16','1.6s')}</circle>
        ${подпись(168,Н-10, в===1?'НОД(12, 18) = 6':'общие: 1, 2, 3, 6', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['3','6','18'],1,в,'r45Отв4') +
      (в==null ? СКАЗ('Вопрос','Какой из общих делителей — наибольший?')
       : РАЗБОР(в===1, ['3 — общий делитель, но не наибольший: 6 тоже общий и больше.','Общие делители 1, 2, 3, 6 — наибольший <b>6</b>. Так НОД ищут перебором: выписать делители обоих чисел и взять самый большой общий.','18 — делитель 18, но не 12: 12 : 18 не делится.'][в])) +
      (в===1 ? ПРАВИЛО('НОД перебором: <b>делители каждого → общие → наибольший</b>.') : '');
  }

  /* 5. Кратные: барабаны гребцов */
  function F5(s){
    const Н=276, в=s.ответ5;
    const x0=24, x1=312, к=(x1-x0)/24, y=206;
    let шкала=`<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${МУТ}" stroke-width="1.6"/>`;
    for(let t_=0;t_<=24;t_++) шкала+=`<line x1="${x0+t_*к}" y1="${y-3}" x2="${x0+t_*к}" y2="${y+3}" stroke="${МУТ}" stroke-width="1"/>`;
    for(let t_=4;t_<=24;t_+=4) шкала+=`<circle cx="${x0+t_*к}" cy="${y-12}" r="5" fill="${СИН}"/>`;
    for(let t_=6;t_<=24;t_+=6) шкала+=`<circle cx="${x0+t_*к}" cy="${y+12}" r="5" fill="${КРАСН}"/>`;
    [12,24].forEach(t_=>{ шкала+=`<circle cx="${x0+t_*к}" cy="${y}" r="14" fill="none" stroke="${GOLD}" stroke-width="2">${анЛин('r','12;16;12','1.4s')}</circle>`+т(x0+t_*к,y+36,String(t_),12,GOLD,true); });
    шкала+=т(x0,y+36,'0',12,МУТ);
    const барабан = (x,цвет,период) => `<g filter="url(#c45-тень)">
      <ellipse cx="${x}" cy="118" rx="30" ry="10" fill="${цвет}"/>
      <rect x="${x-30}" y="118" width="60" height="36" fill="url(#c45-дерево)"/>
      <ellipse cx="${x}" cy="154" rx="30" ry="10" fill="#4f3016"/>
      <ellipse cx="${x}" cy="118" rx="30" ry="10" fill="url(#c45-пергамент)" stroke="${ОБВОД}" stroke-width=".8">
        ${анЛин('ry','10;7;10;10',период,'keyTimes="0;0.08;0.2;1"')}</ellipse>
      <line x1="${x-10}" y1="92" x2="${x}" y2="116" stroke="#4a2c15" stroke-width="3" stroke-linecap="round">${анЛин('y1','86;110;86;86',период,'keyTimes="0;0.08;0.2;1"')}</line></g>`;
    const разборы = ['24 — тоже общий удар, но не первый: барабаны уже совпали на 12-м такте.',
      '<b>12</b> делится и на 4, и на 6 — и меньше него такого нет. Это <b>наименьшее общее кратное</b>: НОК(4, 6) = 12.',
      '10 = 4 + 6, но на 10-м такте не бьёт ни один барабан: 10 не делится ни на 4, ни на 6.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Вышли в море. На нижней палубе два барабанщика задают ритм: <b>левый</b> бьёт каждые <b>4</b> такта, <b>правый</b> — каждые <b>6</b>. Когда они ударят <b>вместе</b>, гребцы делают рывок. На каком такте первый рывок?') +
      `<div class="pic">${свг(`
        ${трюм(Н)}
        ${барабан(96,СИН,'1.6s')}${барабан(240,КРАСН,'2.4s')}
        ${т(96,78,'каждые 4',14,СИН,true)}${т(240,78,'каждые 6',14,КРАСН,true)}
        ${шкала}
        ${подпись(168,32, в===1?'НОК(4, 6) = 12':'синие — кратные 4, красные — кратные 6', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['24','12','10'],1,в,'r45Отв5') +
      (в==null ? СКАЗ('Вопрос','На каком такте барабаны впервые ударят вместе?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОК</b> — наименьшее общее кратное: самое маленькое число, которое делится на <b>оба</b>.') : '');
  }

  /* 6. Шестерни лебёдки */
  function F6(s){
    const Н=284, в=s.ответ6;
    const Ra=30, Rb=40, xa=112, xb=112+Ra+Rb+7, y=130;
    const разборы = ['48 = 6 · 8 — метки там тоже сойдутся, но уже <b>второй</b> раз. Первый — раньше.',
      'Малая прокрутит 24 зуба за <b>4</b> оборота (6 · 4), большая — за <b>3</b> (8 · 3). 24 — наименьшее число, кратное и 6, и 8: <b>НОК(6, 8) = 24</b>.',
      '14 = 6 + 8 — на 14-м зубе малая сделала 2⅓ оборота, большая 1¾: метки не на месте.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Буря! Чтобы поднять якорь, Архимед ставит лебёдку из двух бронзовых шестерён: у малой <b>6 зубьев</b>, у большой <b>8</b>. На обеих — золотая метка, сейчас они рядом. Через сколько зубьев метки снова встретятся?') +
      `<div class="pic">${свг(`
        ${трюм(Н)}
        <g>${анВращ(0,360,xa,y,'3s')}${шестерня(xa,y,6,Ra,'url(#c45-бронза-р)',GOLD,-24)}</g>
        <g>${анВращ(0,-360,xb,y,'4s')}${шестерня(xb,y,8,Rb,'url(#c45-бронза-р)',RED,204)}</g>
        ${т(xa,y+Ra+30,'6 зубьев',14,GOLD,true)}${т(xb,y+Rb+24,'8 зубьев',14,GOLD,true)}
        <g>${анК('opacity','0.3;0.3;1;1;0.3','12s','0;0.9;0.93;0.99;1')}${т(168,40,'метки сошлись!',16,GREEN,true)}</g>
        ${подпись(168,Н-12, в===1?'6 · 4 = 8 · 3 = 24':'1 зуб малой = 1 зуб большой', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['48','24','14'],1,в,'r45Отв6') +
      (в==null ? СКАЗ('Вопрос','Через сколько зубьев метки снова сойдутся?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('НОК перебором: выписывай кратные <b>большего</b> числа (8, 16, 24…), пока не попадётся кратное меньшего.') : '');
  }

  /* 7. Кирпичики: простые множители */
  function F7(s){
    const Н=316, в=s.ответ7;
    const сорок=[2,2,3], восем=[2,3,3];
    const башня = (x,мн,общиеИндексы,подп) => мн.map((p,i)=>кирпич(x,86+i*30,p,общиеИндексы.includes(i))).join('')+т(x,62,подп,16,GOLD,true);
    const разборы = ['216 = 12 · 18: так общие кирпичики 2 и 3 попали в произведение <b>дважды</b>. В НОК каждый кирпичик берут один раз — сколько его нужно самому «жадному» из чисел.',
      'НОК — все кирпичики, которые нужны хотя бы одному числу: две двойки (для 12) и две тройки (для 18): <b>2 · 2 · 3 · 3 = 36</b>.',
      '6 — это НОД: общие кирпичики. А НОК должен содержать <b>все</b> кирпичики обоих чисел.'];
    return ЛИСТ(s) +
      ЗАДАЧА('В каюте Архимед показывает главный секрет: каждое число сложено из <b>кирпичиков</b> — простых множителей. 12 = 2 · 2 · 3, 18 = 2 · 3 · 3. <b>НОД</b> — это кирпичики, которые есть <b>в обоих</b> (золотая рамка). А <b>НОК</b> — башня, из которой можно собрать и 12, и 18.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1a1530"/>
        ${башня(60,сорок,[0,2],'12')}
        ${башня(276,восем,[0,1],'18')}
        <g>${проявить('8s',0.15,0.25)}
          ${т(168,54,'НОД',14,GREEN,true)}${кирпич(168-22,86,2,true)}${кирпич(168+22,86,3,true)}
          ${т(168,122,'2 · 3 = 6',14,GREEN,true)}</g>
        <g>${проявить('8s',0.45,0.55)}
          ${т(168,166,'НОК',14,GOLD,true)}
          ${[2,2,3,3].map((p,i)=>кирпич(168,196+i*28,p,false)).join('')}</g>
        ${в===1?т(262,248,'2 · 2 · 3 · 3',14,GOLD,true)+т(262,270,'= 36',16,GOLD,true):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['216','36','6'],1,в,'r45Отв7') +
      (в==null ? СКАЗ('Вопрос','Чему равен НОК(12, 18) по кирпичикам?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОД</b> — общие кирпичики. <b>НОК</b> — все кирпичики, каждого столько, сколько нужно «жадному» числу.') : '');
  }

  /* 8. Связь НОД · НОК = a · b */
  function F8(s){
    const Н=240, в=s.ответ8;
    const разборы = ['НОД · НОК = a · b: 4 · 6 = 24, а НОД(4, 6) = 2, значит, НОК = 24 : 2 = <b>12</b>, а не 24.',
      'Верно: 4 · 6 = 24, НОД = 2, значит, НОК = 24 : 2 = <b>12</b>. Проверка: 12 делится и на 4, и на 6.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед прищуривается: «Перемножь НОД и НОК». 6 · 36 = 216. «А теперь сами числа». 12 · 18 = 216! Кирпичики НОД и НОК вместе — это <b>все</b> кирпичики обоих чисел.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1a1530"/>
        <g filter="url(#c45-тень)"><rect x="18" y="26" width="300" height="${Н-72}" rx="12" fill="url(#c45-пергамент)"/></g>
        <g>${проявить('7s',0.1,0.2)}${т(168,76,'НОД · НОК = 6 · 36 = 216',18,'#2e6a4a',true)}</g>
        <g>${проявить('7s',0.35,0.45)}${т(168,116,'a · b = 12 · 18 = 216',18,'#3a2410',true)}</g>
        <g>${проявить('7s',0.6,0.7)}${т(168,156,'НОД · НОК = a · b',20,'#8a5f1c',true)}</g>
        ${подпись(168,Н-12,'знаешь НОД — найдёшь НОК делением',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['24','12'],1,в,'r45Отв8') +
      (в==null ? СКАЗ('Вопрос','НОД(4, 6) = 2. Чему равен НОК(4, 6)?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОК = a · b : НОД</b>.') : '');
  }

  /* 9. Александрия: дроби */
  function F9(s){
    const Н=276, в=s.ответ9;
    const свиток = (x,y,з1,з2) => `<g filter="url(#c45-тень)"><rect x="${x}" y="${y}" width="146" height="112" rx="8" fill="url(#c45-пергамент)"/>
      <rect x="${x-4}" y="${y-6}" width="154" height="10" rx="5" fill="url(#c45-дерево)"/>
      ${т(x+73,y+26,з1,14,'#6a4b22',true)}${т(x+73,y+74,з2,22,'#3a2410',true)}</g>`;
    const разборы = ['48 = 6 · 8 тоже подходит в знаменатель, но числа будут больше. Наименьший общий знаменатель — <b>НОК(6, 8) = 24</b>.',
      '<b>24 = НОК(6, 8)</b>: 1/6 = 4/24, 1/8 = 3/24, вместе 7/24.',
      '14 = 6 + 8 не делится ни на 6, ни на 8 — дроби к нему не привести.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Александрия! Писец Птолемея записывает дары дробями и путается. Сократить 12/18 помогает <b>НОД</b>: делим верх и низ на 6 — выходит 2/3. А чтобы сложить 1/6 и 1/8, нужен общий знаменатель — какой?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c45-закат)"/>
        ${море(210,Н)}
        <g filter="url(#c45-тень)"><path d="M268 210 L276 96 L300 96 L308 210 Z" fill="url(#c45-мрамор)"/>
          <rect x="272" y="80" width="32" height="18" fill="url(#c45-мрамор)"/><path d="M270 80 L288 62 L306 80 Z" fill="#8a7a5a"/></g>
        <circle cx="288" cy="88" r="22" fill="url(#c45-пламя)">${анЛин('opacity','1;0.6;1','1.4s')}</circle>
        ${свиток(14,40,'НОД сокращает','12/18 = 2/3')}
        ${свиток(14,164,'НОК складывает',в===1?'4/24 + 3/24':'1/6 + 1/8')}
        ${в===1?т(236,250,'= 7/24',20,GOLD,true,undefined,'#0f2f52'):''}
        ${т(288,236,'Фарос',12,ИНК,true,undefined,'#0f2f52')}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['48','24','14'],1,в,'r45Отв9') +
      (в==null ? СКАЗ('Вопрос','Какой наименьший общий знаменатель у 1/6 и 1/8?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОД</b> сокращает дроби, <b>НОК</b> даёт общий знаменатель.') : '');
  }

  /* 10. Причалили */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=290;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? '«Сиракосия» у стен Александрии. Птолемей принимает дары — ровными подарками, без единой лишней амфоры. Архимед улыбается: «Моряки считают волны, а ты — делители. Ещё неизвестно, что полезнее».'
        : 'До Александрии осталось немного — доделай дела из журнала. А вот главное, что нужно запомнить.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c45-закат)"/>
        <circle cx="168" cy="150" r="46" fill="url(#c45-солнце)">${анЛин('r','44;50;44','6s')}</circle>
        ${море(160,Н)}
        <g filter="url(#c45-тень)"><path d="M290 160 L298 60 L318 60 L326 160 Z" fill="url(#c45-мрамор)"/></g>
        <circle cx="308" cy="54" r="20" fill="url(#c45-пламя)">${анЛин('opacity','1;0.6;1','1.4s')}</circle>
        <g>${анСдвиг('-20 0;0 0;0 0','6s','0;0.7;1')}${сиракосия(140,178,0.62)}</g>
        <g>${проявить('8s',0.1,0.2)}${подпись(140,40,'НОД — общие делители, наибольший',GOLD,12)}</g>
        <g>${проявить('8s',0.3,0.4)}${подпись(140,68,'НОК — общие кратные, наименьший',GOLD,12)}</g>
        <g>${проявить('8s',0.5,0.6)}${подпись(168,Н-44,'НОД — общие кирпичики, НОК — все',ИНК,12)}</g>
        <g>${проявить('8s',0.7,0.8)}${подпись(168,Н-14,'НОД · НОК = a · b',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>НОД</b> — самое большое число, на которое делятся оба (наибольшее число одинаковых подарков). <b>НОК</b> — самое маленькое число, которое делится на оба (когда снова совпадут метки). Быстрый способ — кирпичики: НОД — общие, НОК — все. И всегда <b>НОД · НОК = a · b</b>.') +
      ПРАВИЛО('<b>НОД</b> делит поровну и сокращает. <b>НОК</b> сводит ритмы и даёт общий знаменатель.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Найди НОД(8, 12).', варианты:[{т:'2',ок:false},{т:'4',ок:true}], разбор:'Делители 8: 1, 2, 4, 8. Делители 12: 1, 2, 3, 4, 6, 12. Наибольший общий — 4.' },
    { вопрос:'Найди НОК(4, 10).', варианты:[{т:'20',ок:true},{т:'40',ок:false}], разбор:'Кратные 10: 10, 20 — и 20 делится на 4. 40 = 4 · 10 — общее, но не наименьшее.' },
    { вопрос:'15 яблок и 25 груш разложили в одинаковые пакеты без остатка. Наибольшее число пакетов?', варианты:[{т:'3',ок:false},{т:'5',ок:true}], разбор:'НОД(15, 25) = 5: по 3 яблока и 5 груш.' },
    { вопрос:'Автобусы отходят каждые 12 и каждые 18 минут, сейчас вместе. Через сколько минут снова вместе?', варианты:[{т:'36',ок:true},{т:'216',ок:false}], разбор:'НОК(12, 18) = 36.' },
    { вопрос:'НОД(a, b) = 3, a · b = 90. Чему равен НОК?', варианты:[{т:'270',ок:false},{т:'30',ок:true}], разбор:'НОК = a · b : НОД = 90 : 3 = 30.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r45Reset()")}</div>` +
        ПРАВИЛО('<b>НОД · НОК = a · b.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r45Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'НОД', задания:[
    {q:'НОД(24, 36)?', в:1, варианты:['6','12'], раз:'24 = 2·2·2·3, 36 = 2·2·3·3 — общие 2·2·3 = 12.'},
    {q:'НОД(7, 21)?', в:0, варианты:['7','21'], раз:'21 делится на 7 — НОД равен меньшему числу.'},
    {q:'НОД(9, 16)?', в:1, варианты:['3','1'], раз:'Общих делителей, кроме 1, нет: числа взаимно простые.'},
    {q:'Сократить 14/21 — делим на…', в:0, варианты:['7','3'], раз:'НОД(14, 21) = 7: 14/21 = 2/3.'}
  ]};
  const Т2 = { имя:'НОК', задания:[
    {q:'НОК(6, 9)?', в:1, варианты:['54','18'], раз:'Кратные 9: 9, 18 — и 18 делится на 6.'},
    {q:'НОК(5, 7)?', в:0, варианты:['35','12'], раз:'Взаимно простые — НОК = 5 · 7.'},
    {q:'НОК(4, 12)?', в:1, варианты:['48','12'], раз:'12 делится на 4 — НОК равен большему.'},
    {q:'Общий знаменатель для 1/4 и 1/6?', в:0, варианты:['12','24'], раз:'НОК(4, 6) = 12.'}
  ]};
  const Т3 = { имя:'Задачи и связь', задания:[
    {q:'16 ручек и 24 карандаша поровну в наборы. Наибольшее число наборов?', в:1, варианты:['4','8'], раз:'НОД(16, 24) = 8.'},
    {q:'Шестерни 10 и 15 зубьев, метки рядом. Через сколько зубьев сойдутся?', в:0, варианты:['30','150'], раз:'НОК(10, 15) = 30.'},
    {q:'НОД(a, b) = 4, НОК(a, b) = 24. Чему равно a · b?', в:1, варианты:['28','96'], раз:'НОД · НОК = a · b = 4 · 24 = 96.'},
    {q:'НОД двух чисел — это…', в:0, варианты:['общие кирпичики','все кирпичики'], раз:'НОД — общие простые множители, НОК — все.'}
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
        в, "r45T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r45TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L45 = {
    id: ID,
    title: 'НОД и НОК',
    ico: '🔗',
    src: 'Математика · 6 класс · Делимость: НОД и НОК',
    subj: 'math',
    explain: [
      '«Сиракосия» — самый большой корабль древности, дар царя Гиерона египетскому царю. В походе придётся считать делители и кратные. Делитель — число, на которое делится без остатка. Кратное — число, которое делится без остатка.',
      '12 амфор раскладываем по ящикам поровну. Без остатка получается при 1, 2, 3, 4, 6 и 12 ящиках — это все делители 12. Они идут парами: 1 и 12, 2 и 6, 3 и 4.',
      'Из 12 амфор и 18 мешков собираем одинаковые подарки без остатка. Больше всего подарков — 6: по 2 амфоры и 3 мешка. Это наибольший общий делитель, НОД(12, 18) = 6.',
      'НОД перебором: выписываем делители 12 и делители 18, находим общие — 1, 2, 3, 6 — и берём наибольший.',
      'Барабаны бьют каждые 4 и каждые 6 тактов. Вместе впервые на 12-м такте — это наименьшее общее кратное, НОК(4, 6) = 12.',
      'Шестерни в 6 и 8 зубьев: метки снова сойдутся через 24 зуба — малая сделает 4 оборота, большая 3. НОК(6, 8) = 24. 48 — общее кратное, но не наименьшее.',
      'Кирпичики: 12 = 2 · 2 · 3, 18 = 2 · 3 · 3. НОД — общие кирпичики: 2 · 3 = 6. НОК — все кирпичики, каждого столько, сколько нужно самому «жадному» числу: 2 · 2 · 3 · 3 = 36.',
      'Связь: НОД · НОК = a · b. 6 · 36 = 216 = 12 · 18. Знаешь НОД — найдёшь НОК делением.',
      'В Александрии: НОД сокращает дроби — 12/18 = 2/3, НОК даёт общий знаменатель — 1/6 + 1/8 = 4/24 + 3/24 = 7/24.',
      'Итог: НОД — наибольший общий делитель, НОК — наименьшее общее кратное. НОД — общие кирпичики, НОК — все, и НОД · НОК = a · b.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: НОД.',
      'Тренажёр 2: НОК.',
      'Тренажёр 3: задачи и связь НОД с НОК.'
    ],
    check: {
      q: 'Найди НОД чисел 12 и 18.',
      choices: ['3','6','9','36'],
      ans: 1,
      exp: 'Общие делители 1, 2, 3, 6 — наибольший 6.'
    },
    tasks: [
      { q:'Найди НОД чисел 24 и 36.', kind:'unit', ans:12, tol:0,
        hints:['24 = 2 · 2 · 2 · 3, 36 = 2 · 2 · 3 · 3.','Общие кирпичики: 2 · 2 · 3.'], sol:'НОД(24, 36) = 12.' },
      { q:'Найди НОК чисел 4 и 6.', kind:'unit', ans:12, tol:0,
        hints:['Кратные 6: 6, 12…','12 делится на 4.'], sol:'НОК(4, 6) = 12.' },
      { q:'12 амфор и 18 мешков — в одинаковые подарки без остатка. Наибольшее число подарков?', kind:'unit', ans:6, tol:0,
        hints:['Число подарков — общий делитель 12 и 18.','Наибольший общий делитель.'], sol:'НОД(12, 18) = 6.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L45.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'«Сиракосия»',2:'Делители',3:'Дары поровну',4:'Общие делители',5:'Барабаны гребцов',
      6:'Шестерни лебёдки',7:'Кирпичики',8:'НОД · НОК',9:'Александрия',10:'Причалили',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l45" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'НОД и НОК'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r45K2=(д)=>{ const s=S(); const k=Math.max(1,Math.min(12,(s.k2||5)+д)); s.k2=k;
    if(12%k===0){ const н=s.делители2||[]; if(!н.includes(k)){ н.push(k); н.sort((a,b)=>a-b); s.делители2=н; } }
    chRender(0); };
  window.r45K3=(д)=>{ const s=S(); s.k3=Math.max(1,Math.min(9,(s.k3||4)+д)); chRender(0); };
  window.r45Отв3=(к)=>{ const s=S(); s.ответ3=к; if(к===1) s.дело_дары=true; chRender(0); };
  window.r45Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r45Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r45Отв6=(к)=>{ const s=S(); s.ответ6=к; if(к===1) s.дело_шестерни=true; chRender(0); };
  window.r45Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r45Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r45Отв9=(к)=>{ const s=S(); s.ответ9=к; if(к===1) s.дело_фарос=true; chRender(0); };
  window.r45Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r45Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r45T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r45TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L45; else arr.push(L45); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA45={render:render, L:L45};
})();
