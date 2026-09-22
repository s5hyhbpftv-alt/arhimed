/* ====== МАТЕМАТИКА · УРОК 991 · «ЗАДАЧИ НА КУПЛЮ-ПРОДАЖУ» ==================
   4 класс. Тема была заглушкой «готовится» в MVP/data/soon_lessons.js.

   ПОЧЕМУ КВЕСТ. Цена, количество и стоимость — не три слова из учебника, а
   три вещи, которые ребёнок держит в руках, когда идёт на рынок: ценник,
   товар и кошелёк. Поэтому урок сделан походом за покупками: Архимед даёт
   ученику 300 драхм и опись поручения, а тот обходит ряд лавок в последней
   гавани перед открытым морем. Кошелёк настоящий — он тратится по ходу и к
   концу урока в нём остаётся ровно 15 драхм. Опись висит над каждым кадром и
   отмечается галочками: это и есть ход квеста.

   Платить можно только после верного счёта. Сначала посчитай — потом отдавай
   деньги: в этом весь смысл темы.

   Три лавки — три ключа темы, по одному на каждую неизвестную величину:
     лавка верёвок — ищем СТОИМОСТЬ   (цена × количество);
     лавка тканей  — ищем ЦЕНУ        (стоимость : количество), ткань режется
                                   на равные куски — деление на части;
     лавка бочек   — ищем КОЛИЧЕСТВО  (стоимость : цена), монеты раскладываются
                                   кучками по 12 — деление по содержанию.

   СЮЖЕТ ПОД МИР 4 КЛАССА В «ПУТИ» («Открытое море»): последний порт перед
   выходом в море.

   ЯЗЫК. Без канатчиков, парусников, бочаров, локтей и полотна: лавки названы
   по товару, ткань меряют метрами, амфора названа кувшином, а драхма объяснена
   одной строкой в первом кадре.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ РАСЧЁТОМ:
     кошелёк 300
     верёвка 14 × 4 = 56          → остаток 244
     ткань   90 : 5 = 18          → остаток 154
     бочки   84 : 12 = 7          → остаток  70
     кувшины 55 : 5 = 11 (дешевле, чем 36 : 3 = 12) → остаток 15
     сдача у торговца: 7 × 12 = 84, 100 − 84 = 16
     потрачено 56 + 90 + 84 + 55 = 285; 300 − 285 = 15 ✓

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md: в каждом кадре одно главное движение
   и одна вспышка результата. Движение здесь — само действие покупки: монеты
   улетают из кошеля к прилавку, ткань делится на одинаковые куски, монеты
   собираются в кучки. prefers-reduced-motion выключает SMIL полностью. */
(function(){
  'use strict';

  const ID = 991;
  const GOLD='#ffd76a', GREEN='#8fd1a8', RED='#e86a5a', МОРЕ='#5fb6c9',
        ТКАНЬ='#e0875f', ДЕРЕВО='#a97c40', КАМЕНЬ='#c9bfa8';
  const ИНК='#fdf8ec', МУТ='#dcc9a4', ЛИНИЯ='#8a6f3f', ОБВОД='#241d14';

  /* ---------- КОШЕЛЁК И ОПИСЬ ---------- */
  const НАЧАЛО = 300;
  const ПОКУПКИ = [
    {ключ:'верёвка', имя:'Верёвка', сколько:'4 мотка',  сумма:56},
    {ключ:'ткань',   имя:'Ткань',   сколько:'5 метров', сумма:90},
    {ключ:'бочки',   имя:'Бочки',   сколько:'7 бочек',  сумма:84},
    {ключ:'кувшины', имя:'Кувшины', сколько:'5 штук',   сумма:55}
  ];
  const куплено = (s,к) => !!s['куп_'+к];
  const кошелёк = (s) => НАЧАЛО - ПОКУПКИ.reduce((a,п)=> a + (куплено(s,п.ключ)?п.сумма:0), 0);

  const CSS=`
  #lvis .s6.l991{gap:14px}
  #lvis .s6.l991 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l991 .pic svg{display:block;width:100%;height:auto}
  #lvis .s6.l991 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#332b21,#211c15);border:1.5px solid var(--line)}
  #lvis .s6.l991 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l991 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l991 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l991 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l991 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l991 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l991 .правило b{color:${GOLD}}

  /* ── опись поручения: ход квеста, висит над кадром ── */
  #lvis .s6.l991 .опись{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(255,215,106,.10),rgba(255,215,106,.03));
    border:1.5px solid rgba(255,215,106,.4);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l991 .опись .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l991 .опись .шапка b{font-size:24px;letter-spacing:0;text-transform:none;color:${GOLD};
    font-variant-numeric:tabular-nums}
  #lvis .s6.l991 .опись ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l991 .опись li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l991 .опись li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l991 .опись li.есть{color:${ИНК}}
  #lvis .s6.l991 .опись li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,209,168,.14)}
  #lvis .s6.l991 .опись li span{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--mut);font-size:16px}
  #lvis .s6.l991 .опись li.есть span{color:${GREEN}}

  /* ── прилавок: −/+ количества ── */
  #lvis .s6.l991 .прилавок{display:flex;align-items:center;gap:10px;width:100%;padding:12px;border-radius:16px;
    background:rgba(255,215,106,.07);border:1.5px solid rgba(255,215,106,.32)}
  #lvis .s6.l991 .прилавок .сколько{flex:1;min-width:0;text-align:center;font-size:16px;line-height:1.25;color:${ИНК}}
  #lvis .s6.l991 .прилавок .сколько b{display:block;font-size:32px;color:${GOLD};font-variant-numeric:tabular-nums}
  #lvis .s6.l991 .прилавок button{width:56px;height:56px;flex:0 0 56px;border-radius:14px;cursor:pointer;
    border:1px solid rgba(255,215,106,.5);background:rgba(255,215,106,.14);color:${GOLD};
    font:inherit;font-size:24px;line-height:1;touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l991 .прилавок button:active{transform:translateY(2px);background:rgba(255,215,106,.26)}
  #lvis .s6.l991 .прилавок button:disabled{opacity:.35;cursor:not-allowed}

  /* ── большая кнопка действия: «Заплатить», «Закрыть клетку» ── */
  #lvis .s6.l991 .дело{width:100%;min-height:60px;padding:16px;border-radius:16px;cursor:pointer;
    font:inherit;font-size:20px;line-height:1.25;text-align:center;color:#2a1f10;
    border:0;background:linear-gradient(180deg,${GOLD},#c8912f);
    box-shadow:0 3px 0 rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.4);
    transition:transform 120ms ease, box-shadow 180ms ease}
  #lvis .s6.l991 .дело:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.42)}
  #lvis .s6.l991 .дело.сделано{background:rgba(143,209,168,.16);color:${GREEN};
    box-shadow:none;border:1.5px solid ${GREEN}}
  #lvis .s6.l991 .дело:disabled{background:rgba(255,255,255,.07);color:var(--mut);
    box-shadow:none;border:1.5px solid rgba(255,255,255,.16);cursor:not-allowed}

  #lvis .s6.l991 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l991 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l991 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l991 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l991 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l991 .ask.тройка button{flex:1 1 calc(33% - 8px);text-align:center;font-size:16px}

  #lvis .s6.l991 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l991 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l991 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l991 .уровни .точка.сейчас{background:${GOLD};animation:l991dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l991dot{0%,100%{opacity:1}50%{opacity:.45}}
  #lvis .s6.l991 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l991{-webkit-text-size-adjust:100%}
  #lvis .s6.l991 [data-anim]{animation:l991rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l991rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l991 [data-anim]{animation:none!important}
    #lvis .s6.l991 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l991 .ask button,#lvis .s6.l991 .прилавок button,#lvis .s6.l991 .дело{transition:none}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l991-style');
      if(!s){ s=document.createElement('style'); s.id='l991-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Поручение</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ДЕЛО = (текст,on,сделано,можно) =>
    `<button type="button" data-anim style="--i:3" class="дело${сделано?' сделано':''}"
       ${можно===false&&!сделано?'disabled':''} onclick="${on}">${текст}</button>`;

  /* Опись поручения: висит над кадром и показывает, что уже куплено и сколько
     осталось в кошеле. Это ход квеста — ребёнок видит его на каждом шагу. */
  const СПИСОК = (s) => A(0,'опись',
    `<div class="шапка"><span>Кошель</span><b>${кошелёк(s)} др.</b></div>
     <ul>${ПОКУПКИ.map(п=>{
       const есть = куплено(s,п.ключ);
       return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${п.имя} — ${п.сколько}
         <span>${есть?('−'+п.сумма):'—'}</span></li>`;
     }).join('')}</ul>`);

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
  const анТ = (значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              repeatCount="indefinite" calcMode="spline" keyTimes="${keyTimes}"
              keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  /* счёт по одному: предмет разгорается в свою очередь */
  const очередь = (номер,всего,длит) => {
    if(!ДВИЖ) return '';
    const д = 1/(всего+1), a = кт(номер*д), b = кт(номер*д+д*0.5), c = кт(номер*д+д*0.9);
    return анК('opacity','0.6;0.6;1;1;0.6',длит,'0;'+a+';'+b+';'+c+';1');
  };
  /* вспышка результата: кольцо ВОКРУГ предмета, не поверх подписи */
  const кольцо = (x,y,r,цвет,длит,доля) => ДВИЖ ? `<circle cx="${x}" cy="${y}" r="${r}" fill="none"
      stroke="${цвет||GOLD}" stroke-width="2.2" opacity="0">
      ${анК('opacity','0;0;0.95;0',длит,'0;'+кт(доля)+';'+кт(доля+0.1)+';1')}
      ${анК('r',r+';'+r+';'+(r+8)+';'+(r+8),длит,'0;'+кт(доля)+';'+кт(доля+0.16)+';1')}
    </circle>` : '';

  /* вспышка вокруг ШИРОКОЙ группы: круг тут сидел бы поверх навеса и подписей */
  const рамкаВсп = (x0,y0,x1,y1,цвет,длит,доля) => ДВИЖ ? `<rect x="${x0}" y="${y0}"
      width="${x1-x0}" height="${y1-y0}" rx="12" fill="none" stroke="${цвет||GOLD}"
      stroke-width="2.2" opacity="0">
      ${анК('opacity','0;0;0.95;0',длит,'0;'+кт(доля)+';'+кт(доля+0.1)+';1')}
    </rect>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;

  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c991-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3d4c5e"/><stop offset="0.65" stop-color="#6b6a63"/>
        <stop offset="1" stop-color="#8f7d5e"/>
      </linearGradient>
      <linearGradient id="c991-площадь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a3126"/><stop offset="0.5" stop-color="#2a231a"/>
        <stop offset="1" stop-color="#171310"/>
      </linearGradient>
      <linearGradient id="c991-фон" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a3126"/><stop offset="0.55" stop-color="#282017"/>
        <stop offset="1" stop-color="#15110d"/>
      </linearGradient>
      <linearGradient id="c991-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fd0dd"/><stop offset="1" stop-color="#2f6f86"/>
      </linearGradient>
      <linearGradient id="c991-злато" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffeeb4"/><stop offset="0.45" stop-color="#e9b944"/>
        <stop offset="1" stop-color="#9c6f1e"/>
      </linearGradient>
      <linearGradient id="c991-дуб" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6d4a22"/><stop offset="0.25" stop-color="#c79a5a"/>
        <stop offset="0.6" stop-color="#a97c40"/><stop offset="1" stop-color="#5c3f20"/>
      </linearGradient>
      <linearGradient id="c991-полотно" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6ecd4"/><stop offset="1" stop-color="#d9c79c"/>
      </linearGradient>
      <linearGradient id="c991-глина" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8d4f2c"/><stop offset="0.35" stop-color="#c8804f"/>
        <stop offset="1" stop-color="#7a4224"/>
      </linearGradient>
    </defs>`;

  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота||236}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;

  const фон = (высота) =>
    `<rect x="0" y="0" width="336" height="${высота}" fill="url(#c991-фон)"/>
     <rect x="0" y="0" width="336" height="${высота}" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;

  /* Подпись-плашка. Центр прижимается к полю кадра: на 356 и 1020 подписи уже
     срезались кромкой, поэтому здесь x зажат с запасом в 6 px. */
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.6+16, в=к+10;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g>
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+3).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,11,8,.88)" stroke="${цвет||GOLD}" stroke-width="1.2"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* ---------------- МОНЕТА И КОШЕЛЬ ---------------- */
  const монета = (x,y,r) => `<g>
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c991-злато)" stroke="#5e4114" stroke-width="0.9"/>
    <circle cx="${x}" cy="${y}" r="${(r*0.54).toFixed(1)}" fill="none" stroke="rgba(60,40,10,.55)" stroke-width="0.8"/>
    <circle cx="${x}" cy="${(y-r*0.16).toFixed(1)}" r="${(r*0.2).toFixed(1)}" fill="rgba(60,40,10,.5)"/>
  </g>`;

  const кошель = (x,y,м) => {
    const мм = м||1, ш=(n)=>(n/мм).toFixed(2);
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <path d="M-9 -4 q-15 11 -13 23 q2 15 22 15 q20 0 22 -15 q2 -12 -13 -23 z"
        fill="#8c5a2e" stroke="${ОБВОД}" stroke-width="${ш(1.3)}"/>
      <path d="M-6 2 q-6 10 -4 20" fill="none" stroke="rgba(50,28,8,.4)" stroke-width="${ш(1.2)}"/>
      <path d="M6 2 q6 10 4 20" fill="none" stroke="rgba(50,28,8,.4)" stroke-width="${ш(1.2)}"/>
      <path d="M-13 22 q13 7 26 0" fill="none" stroke="rgba(255,235,200,.14)" stroke-width="${ш(2)}"/>
      <path d="M-10 -13 q10 -7 20 0 l-3 9 h-14 z" fill="#7a4a24" stroke="${ОБВОД}" stroke-width="${ш(1.1)}"/>
      <rect x="-10" y="-6" width="20" height="5" rx="2.2" fill="#5c3a1c" stroke="${ОБВОД}" stroke-width="${ш(0.8)}"/>
      ${монета(1,-17,5)}
    </g>`;
  };

  /* ---------------- ТОВАРЫ ---------------- */
  /* моток верёвки: кольцо со свивкой — видно, что это верёвка, а не бублик */
  const моток = (x,y,r) => {
    const пряди = [0,45,90,135].map(a=>{
      const рад=a*Math.PI/180, к=Math.cos(рад), с=Math.sin(рад);
      return `<line x1="${(x+к*r*0.42).toFixed(1)}" y1="${(y+с*r*0.42).toFixed(1)}"
        x2="${(x+к*r*0.94).toFixed(1)}" y2="${(y+с*r*0.94).toFixed(1)}"
        stroke="rgba(70,45,18,.5)" stroke-width="1.4"/>
      <line x1="${(x-к*r*0.42).toFixed(1)}" y1="${(y-с*r*0.42).toFixed(1)}"
        x2="${(x-к*r*0.94).toFixed(1)}" y2="${(y-с*r*0.94).toFixed(1)}"
        stroke="rgba(70,45,18,.5)" stroke-width="1.4"/>`;
    }).join('');
    return `<g>
      <circle cx="${x}" cy="${y}" r="${r}" fill="#bb8c4c" stroke="${ОБВОД}" stroke-width="1.2"/>
      <circle cx="${x}" cy="${y}" r="${(r*0.68).toFixed(1)}" fill="none" stroke="#8a6234" stroke-width="1.6"/>
      ${пряди}
      <circle cx="${x}" cy="${y}" r="${(r*0.34).toFixed(1)}" fill="#1a1410" stroke="#8a6234" stroke-width="1.4"/>
    </g>`;
  };

  const амфора = (x,y,м) => {
    const мм=м||1;
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <path d="M0 -13 q-10 7 -10 15 q0 13 10 17 q10 -4 10 -17 q0 -8 -10 -15 z"
        fill="url(#c991-глина)" stroke="${ОБВОД}" stroke-width="${(1.2/мм).toFixed(2)}"/>
      <path d="M-6 -12 q-9 3 -7 10" fill="none" stroke="#8d4f2c" stroke-width="${(2/мм).toFixed(2)}"/>
      <path d="M6 -12 q9 3 7 10" fill="none" stroke="#8d4f2c" stroke-width="${(2/мм).toFixed(2)}"/>
      <rect x="-3" y="-21" width="6" height="9" fill="#a5623a" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
      <ellipse cx="0" cy="-21" rx="5.5" ry="2.2" fill="#c8804f" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
      <path d="M-8 4 q8 3 16 0" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="${(1.4/мм).toFixed(2)}"/>
    </g>`;
  };

  const бочонок = (x,y,м) => {
    const мм=м||1, ш=(n)=>(n/мм).toFixed(2);
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <path d="M-11 -18 q-4 18 0 36 h22 q4 -18 0 -36 z" fill="url(#c991-дуб)"
        stroke="${ОБВОД}" stroke-width="${ш(1.3)}"/>
      ${[-6,0,6].map(о=>`<path d="M${о} -17 q-1.6 17 0 34" fill="none"
        stroke="rgba(56,34,12,.45)" stroke-width="${ш(1)}"/>`).join('')}
      ${[-10,10].map(о=>`<rect x="-12.6" y="${о-2.4}" width="25.2" height="4.8" rx="1.6"
        fill="#cbb89a" opacity=".92" stroke="${ОБВОД}" stroke-width="${ш(0.7)}"/>`).join('')}
      <ellipse cx="0" cy="-18" rx="11" ry="3.4" fill="#5c3f20" stroke="${ОБВОД}" stroke-width="${ш(1)}"/>
      <path d="M-11 -18 q-4 18 0 36 h22 q4 -18 0 -36" fill="none" stroke="${ОБВОД}" stroke-width="${ш(1.3)}"/>
    </g>`;
  };

  /* ---------------- ЛЮДИ И ЛАВКА ---------------- */
  const торговец = (x,y,цвет) => `<g>
    <path d="M${x-17} ${y} q1 -30 17 -30 q16 0 17 30 z" fill="${цвет||'#6f8f7e'}"
      stroke="${ОБВОД}" stroke-width="1.3"/>
    <path d="M${x-17} ${y-16} q17 6 34 0" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.4"/>
    <path d="M${x-15} ${y-26} l-6 20" stroke="${цвет||'#6f8f7e'}" stroke-width="5" stroke-linecap="round"/>
    <path d="M${x+15} ${y-26} l6 20" stroke="${цвет||'#6f8f7e'}" stroke-width="5" stroke-linecap="round"/>
    <rect x="${x-4}" y="${y-40}" width="8" height="10" fill="#e4c096" stroke="${ОБВОД}" stroke-width="1"/>
    <circle cx="${x}" cy="${y-45}" r="10" fill="#e4c096" stroke="${ОБВОД}" stroke-width="1.3"/>
    <path d="M${x-8} ${y-42} q8 12 16 0 q-8 8 -16 0 z" fill="#8a7a62"/>
    <path d="M${x-10} ${y-51} q10 -6 20 0 q-3 -6 -10 -6 q-7 0 -10 6 z" fill="#7a6a52"/>
  </g>`;

  /* Лавка: прилавок, два столба и полосатый навес. база — низ ножек.
     Навес поднимается на 84 px над базой, поэтому месту нужно 92 px по высоте. */
  const лавка = (x,база,полуширина,ярко) => {
    const пш = полуширина||34, п = ярко?1:0.55;
    const верхПрилавка = база-26, навесНиз = база-70, навесВерх = база-84;
    const полосы = Array.from({length:7},(_,i)=>{
      const w=(пш*2+12)/7, x0=x-пш-6+i*w;
      return `<rect x="${x0.toFixed(1)}" y="${навесВерх}" width="${w.toFixed(1)}" height="${навесНиз-навесВерх}"
        fill="${i%2?'#f2e4c6':ТКАНЬ}"/>`;
    }).join('');
    return `<g opacity="${п}">
      <line x1="${x-пш+2}" y1="${верхПрилавка}" x2="${x-пш+2}" y2="${навесНиз}" stroke="#7a5326" stroke-width="3"/>
      <line x1="${x+пш-2}" y1="${верхПрилавка}" x2="${x+пш-2}" y2="${навесНиз}" stroke="#7a5326" stroke-width="3"/>
      <g>${полосы}</g>
      <path d="M${x-пш-6} ${навесНиз} h${пш*2+12} l-6 7 h-${пш*2} z" fill="#c9ab7c" opacity=".9"/>
      <rect x="${x-пш-6}" y="${навесВерх}" width="${пш*2+12}" height="${навесНиз-навесВерх+7}"
        fill="none" stroke="${ОБВОД}" stroke-width="1.2"/>
      <rect x="${x-пш}" y="${верхПрилавка}" width="${пш*2}" height="8" rx="2"
        fill="url(#c991-дуб)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <rect x="${x-пш+4}" y="${верхПрилавка+8}" width="${пш*2-8}" height="${база-верхПрилавка-8}"
        fill="#5f451f" stroke="${ОБВОД}" stroke-width="1"/>
      <line x1="${x-пш+4}" y1="${база-8}" x2="${x+пш-4}" y2="${база-8}" stroke="rgba(0,0,0,.35)" stroke-width="1.2"/>
    </g>`;
  };

  const судно = (x,y,м) => {
    const мм=м||1;
    return `<g transform="translate(${x} ${y}) scale(${мм})">
      <path d="M-30 0 q5 13 30 13 q25 0 30 -13 z" fill="url(#c991-дуб)" stroke="${ОБВОД}" stroke-width="${(1.3/мм).toFixed(2)}"/>
      <rect x="-31" y="-5" width="62" height="5" rx="2" fill="#8a5f30" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
      <path d="M-31 -5 q-5 -8 2 -12" fill="none" stroke="${ОБВОД}" stroke-width="${(2/мм).toFixed(2)}"/>
      <line x1="0" y1="-5" x2="0" y2="-46" stroke="${ОБВОД}" stroke-width="${(2.2/мм).toFixed(2)}"/>
      <path d="M3 -44 q19 15 0 30 z" fill="#f4ead2" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
      <path d="M-3 -41 q-14 12 0 24 z" fill="#e2d2ad" stroke="${ОБВОД}" stroke-width="${(1/мм).toFixed(2)}"/>
    </g>`;
  };

  /* одноразовый сдвиг: монеты уходят из кошеля к прилавку и остаются там */
  const анТРаз = (значения,длит,задержка) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"
              ${задержка?'begin="'+задержка+'"':''}/>` : '';

  const мотковСлово = (n) => {
    const д=n%10, с=n%100;
    if(с>=11&&с<=14) return 'мотков';
    if(д===1) return 'моток';
    if(д>=2&&д<=4) return 'мотка';
    return 'мотков';
  };

  /* ================= КАДРЫ ================= */

  /* 1. Поручение: порт, лавки, кошель */
  function F1(s){
    const дорожка = ДВИЖ ? `<g>
      ${анТ('0 0;0 0;64 88;64 88;150 88;150 88;236 88;236 88;0 0','9s',
            '0;0.06;0.18;0.32;0.42;0.56;0.66;0.9;1')}
      <circle cx="54" cy="108" r="5" fill="${GOLD}"/>
      <circle cx="54" cy="108" r="9" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity=".5"/>
    </g>` : `<circle cx="54" cy="108" r="5" fill="${GOLD}"/>`;
    return СПИСОК(s) +
      ЗАДАЧА('Архимед даёт тебе <b>300 драхм</b> и список покупок: верёвка, ткань, бочки и кувшины. Драхма — это греческая монета, ими здесь за всё и платят. Корабль уходит в открытое море: это последний порт, где вообще можно что-то купить.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="64" fill="url(#c991-небо)"/>
        <path d="M0 58 q44 -26 86 -8 q34 -18 70 4 q26 -10 48 4 z" fill="#3f4438" opacity=".75"/>
        <rect x="0" y="62" width="336" height="40" fill="url(#c991-море)"/>
        <rect x="0" y="100" width="336" height="18" fill="${КАМЕНЬ}" opacity=".55"/>
        ${[0,1,2,3,4,5].map(i=>`<line x1="${16+i*56}" y1="100" x2="${16+i*56}" y2="118"
          stroke="rgba(0,0,0,.28)" stroke-width="1.2"/>`).join('')}
        <rect x="0" y="118" width="336" height="${250-118}" fill="url(#c991-площадь)"/>
        ${судно(56,86,0.8)}
        ${лавка(118,214,34,true)}
        ${лавка(204,214,34,true)}
        ${лавка(290,214,34,true)}
        ${моток(103,177,10)}${моток(125,177,10)}
        <rect x="185" y="172" width="38" height="16" rx="2" fill="url(#c991-полотно)" stroke="${ОБВОД}" stroke-width="1"/>
        ${[194,204,214].map(x=>`<path d="M${x} 172 q-1.5 8 0 16" fill="none" stroke="rgba(90,70,35,.3)" stroke-width="1"/>`).join('')}
        ${бочонок(278,178,0.6)}${бочонок(300,178,0.6)}
        ${кошель(42,192,1)}
        ${дорожка}
        ${кольцо(42,200,28,GOLD,'9s',0.02)}
        ${подпись(168,26,'Последний порт',GOLD,16)}
        ${т(42,238,'кошель',14,МУТ)}
        ${т(118,238,'верёвка',14,МУТ)}
        ${т(204,238,'ткань',14,МУТ)}
        ${т(290,238,'бочки',14,МУТ)}
      `,250)}</div>` +
      СКАЗ('Три слова','<b>Цена</b> — сколько стоит один. <b>Количество</b> — сколько взяли. <b>Стоимость</b> — сколько отдали за всё.') +
      ПРАВИЛО('Платить можно только после счёта: <b>сначала посчитай — потом отдавай деньги</b>.');
  }

  /* 2. Песочница: сколько мотков — столько раз по 14 */
  function F2(s){
    const н = Math.max(0, Math.min(6, s.мотков==null?2:s.мотков));
    const всего = 14*н;
    const слагаемые = н===0 ? '' : Array.from({length:н},()=>'14').join(' + ');
    return СПИСОК(s) +
      ЗАДАЧА('Моток верёвки стоит <b>14 драхм</b> — это <b>цена</b>. Бери мотки с полки и смотри, что делается со стоимостью.') +
      `<div class="pic">${свг(`
        ${фон(240)}
        ${подпись(168,24,'Цена одна, а стоимость растёт',GOLD,14)}
        <rect x="20" y="128" width="296" height="7" rx="2" fill="url(#c991-дуб)" stroke="${ОБВОД}" stroke-width="1"/>
        ${Array.from({length:н},(_,i)=>`<g>${очередь(i,н,'7s')}
          ${моток(46+i*49,108,18)}
          ${т(46+i*49,152,'14',14,GOLD)}
        </g>`).join('')}
        ${н===0?т(168,112,'полка пуста',16,МУТ):''}
        <g>${проявить('7s',0.6,0.72)}
          ${н===0?'':т(168,184,слагаемые,16,ИНК)}
          ${подпись(168,216, н===0?'стоимость 0':('14 × '+н+' = '+всего), н===0?МУТ:GOLD, 20)}
        </g>
      `,240)}</div>` +
      A(3,'прилавок',
        `<button type="button" onclick="r991Мотки(-1)" ${н>0?'':'disabled'} aria-label="убрать моток">−</button>
         <span class="сколько">взял с полки<b>${н} ${мотковСлово(н)}</b></span>
         <button type="button" onclick="r991Мотки(1)" ${н<6?'':'disabled'} aria-label="взять моток">+</button>`) +
      СКАЗ('Смотри', н===0
        ? 'Ничего не взял — и платить нечего: стоимость 0.'
        : 'Цена не меняется, она у товара одна. Меняется <b>количество</b>, а вместе с ним — <b>стоимость</b>: 14 взяли '+н+' раз.') +
      ПРАВИЛО('<b>Стоимость = цена × количество.</b> «По 14 драхм, взяли '+н+'» — значит, 14 повторили '+н+' раз.');
  }

  /* 3. Лавка верёвок: ищем СТОИМОСТЬ */
  function F3(s){
    const в = s.о1, верно = в==='ok', есть = куплено(s,'верёвка');
    const монеты = есть ? `<g>${анТРаз('0 0;196 -18','760ms')}
      ${монета(58,192,7)}${монета(72,188,7)}${монета(65,202,7)}</g>` : '';
    return СПИСОК(s) +
      ЗАДАЧА('В лавке верёвок моток стоит <b>14 драхм</b>. Нужно <b>4 мотка</b>. Сколько отдать за всё?') +
      `<div class="pic">${свг(`
        ${фон(252)}
        ${подпись(168,24,'Лавка верёвок',GOLD,16)}
        ${лавка(198,200,66,true)}
        ${[0,1,2,3].map(i=>`<g>${есть?'':очередь(i,4,'6s')}${моток(152+i*26,161,12)}</g>`).join('')}
        ${торговец(300,196,'#6f8f7e')}
        ${кошель(44,188,1)}
        ${монеты}
        ${подпись(80,98,'14 др. за моток',GOLD,14)}
        ${т(44,232,'кошель',14,МУТ)}
        ${верно?рамкаВсп(136,146,248,178,GREEN,'6s',0.1):''}
        ${подпись(206,242, верно?'14 × 4 = 56':'14 × 4 = ?', верно?GREEN:GOLD, 20)}
      `,252)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), '56 драхм — взял 14 четыре раза', "r991О1('ok')")}
        ${BTN(5, в==='no'?'miss':'', '18 драхм — 14 да ещё 4', "r991О1('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: цена повторяется столько раз, сколько мотков. 14 × 4 = 56 драхм.'
              : 'Нет: 14 и 4 — не два слагаемых. 14 — это <b>за один</b> моток, а мотков четыре, значит 14 нужно повторить 4 раза: 14 × 4 = 56.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ДЕЛО(есть ? '✓ Верёвка куплена, отдал 56 драхм' : 'Заплатить 56 драхм', "r991Купить('верёвка')", есть, верно) +
      ПРАВИЛО('<b>Стоимость = цена × количество.</b>');
  }

  /* 4. Лавка тканей: ищем ЦЕНУ */
  function F4(s){
    const в = s.о2, верно = в==='ok', есть = куплено(s,'ткань');
    const монеты = есть ? `<g>${анТРаз('0 0;0 -24','760ms')}
      ${монета(296,196,7)}${монета(282,200,7)}</g>` : '';
    return СПИСОК(s) +
      ЗАДАЧА('В лавке тканей отрезали <b>5 метров</b> ткани на парус и просят за всё <b>90 драхм</b>. Сколько стоит <b>один метр</b>?') +
      `<div class="pic">${свг(`
        ${фон(250)}
        ${подпись(168,24,'Лавка тканей',GOLD,16)}
        ${подпись(168,72,'за всю ткань — 90 др.',GOLD,16)}
        <rect x="28" y="96" width="280" height="66" rx="3" fill="url(#c991-полотно)"
          stroke="${ОБВОД}" stroke-width="1.4"/>
        ${[0,1,2,3,4].map(i=>`<path d="M${30+i*56} 96 q4 33 0 66" fill="none"
          stroke="rgba(90,70,35,.22)" stroke-width="1"/>`).join('')}
        ${[1,2,3,4].map(k=>`<g>${очередь(k-1,4,'7s')}
          <line x1="${28+56*k}" y1="96" x2="${28+56*k}" y2="162" stroke="#a8742c"
            stroke-width="2" stroke-dasharray="5 4"/></g>`).join('')}
        ${[0,1,2,3,4].map(i=>т(56+i*56,136, верно?'18':'?',20,'#3a2a14',true)).join('')}
        <line x1="28" y1="176" x2="84" y2="176" stroke="${МУТ}" stroke-width="1.4"/>
        <line x1="28" y1="172" x2="28" y2="180" stroke="${МУТ}" stroke-width="1.4"/>
        <line x1="84" y1="172" x2="84" y2="180" stroke="${МУТ}" stroke-width="1.4"/>
        ${т(56,196,'1 метр',14,МУТ)}
        ${монеты}
        ${верно?рамкаВсп(30,98,84,160,GREEN,'6s',0.12):''}
        ${подпись(212,216, верно?'90 : 5 = 18':'90 : 5 = ?', верно?GREEN:GOLD, 20)}
      `,250)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), '18 драхм за метр', "r991О2('ok')")}
        ${BTN(5, в==='no'?'miss':'', '450 драхм за метр', "r991О2('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: ткань разрезали на 5 одинаковых кусков по метру, и все 90 драхм разделились между ними поровну. 90 : 5 = 18.'
              : 'Нет: один метр не может стоить дороже, чем вся ткань. Стоимость делят на количество: 90 : 5 = 18.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ДЕЛО(есть ? '✓ Ткань куплена, отдал 90 драхм' : 'Заплатить 90 драхм', "r991Купить('ткань')", есть, верно) +
      ПРАВИЛО('<b>Цена = стоимость : количество.</b>');
  }

  /* 5. Лавка бочек: ищем КОЛИЧЕСТВО */
  function F5(s){
    const в = s.о3, верно = в==='ok', есть = куплено(s,'бочки');
    const X = (i)=> 30+i*46;
    return СПИСОК(s) +
      ЗАДАЧА('На бочки для воды отложено <b>84 драхмы</b>. Одна бочка стоит <b>12 драхм</b>. Сколько бочек выйдет купить?') +
      `<div class="pic">${свг(`
        ${фон(256)}
        ${подпись(168,24,'Лавка бочек',GOLD,16)}
        ${подпись(168,52,'84 драхмы · бочка 12',GOLD,14)}
        ${[0,1,2,3,4,5,6].map(i=>`<g>${очередь(i,7,'8s')}
          ${Array.from({length:12},(_,k)=>монета(X(i),176-k*3.2,7)).join('')}
          ${т(X(i),200,'12',14,GOLD)}
        </g>`).join('')}
        ${верно?[0,1,2,3,4,5,6].map(i=>`<g>${анРаз('opacity','0.55;1','420ms',(0.1*i).toFixed(2)+'s')}
          ${бочонок(X(i),108,1)}</g>`).join(''):
          т(168,112,'разложи монеты кучками по 12',14,МУТ)}
        ${подпись(168,232, верно?'84 : 12 = 7 бочек':'сколько кучек по 12?', верно?GREEN:GOLD, 16)}
      `,256)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), '7 бочек', "r991О3('ok')")}
        ${BTN(5, в==='no'?'miss':'', '72 бочки', "r991О3('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: считаем, сколько раз по 12 помещается в 84. Кучек вышло семь — значит, и бочек семь. 84 : 12 = 7.'
              : 'Нет: 84 − 12 = 72 — это остаток денег после одной бочки, а не число бочек. Здесь спрашивают, <b>сколько раз</b> по 12 уместилось в 84: 84 : 12 = 7.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ДЕЛО(есть ? '✓ Бочки куплены, отдал 84 драхмы' : 'Заплатить 84 драхмы', "r991Купить('бочки')", есть, верно) +
      ПРАВИЛО('<b>Количество = стоимость : цена.</b>');
  }

  /* 6. Восковая табличка: закрой любую величину — и увидишь действие */
  function F6(s){
    const з = s.закрыта || null;
    const печать = (x,y) => `<g>${анРаз('opacity','0;1','320ms')}
      <circle cx="${x}" cy="${y}" r="17" fill="#7c2f26" stroke="#4a1a14" stroke-width="1.6"/>
      <circle cx="${x}" cy="${y}" r="11" fill="none" stroke="rgba(255,220,200,.45)" stroke-width="1.4"/>
      ${т(x,y+7,'?',20,'#ffd9cc',true)}
    </g>`;
    const клетка = (x0,x1,y0,y1,имя,число,ключ,номер) => {
      const закр = з===ключ;
      return `<g>${з?'':очередь(номер,3,'7s')}
        <rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" rx="8"
          fill="${закр?'rgba(124,47,38,.18)':'rgba(255,215,106,.10)'}"
          stroke="${закр?RED:GOLD}" stroke-width="1.6"/>
        ${т((x0+x1)/2,y0+18,имя,14,закр?RED:МУТ)}
        ${закр?печать((x0+x1)/2,y0+38):т((x0+x1)/2,y0+44,число,20,GOLD,true)}
      </g>`;
    };
    const формула = з==='с' ? 'стоимость = цена × количество'
                  : з==='ц' ? 'цена = стоимость : количество'
                  : з==='к' ? 'количество = стоимость : цена'
                  : 'закрой клетку — увидишь действие';
    return СПИСОК(s) +
      ЗАДАЧА('Три величины связаны намертво. Закрой печатью ту, которую ищешь, — и оставшиеся две сами покажут действие. Числа взяты от верёвки: 14 драхм, 4 мотка, 56 драхм.') +
      `<div class="pic">${свг(`
        ${фон(250)}
        <rect x="22" y="46" width="292" height="162" rx="12" fill="#8a5f30" stroke="${ОБВОД}" stroke-width="1.6"/>
        <rect x="30" y="54" width="276" height="146" rx="8" fill="#2b2318" stroke="#5c3f20" stroke-width="1.2"/>
        <line x1="140" y1="118" x2="100" y2="140" stroke="rgba(255,215,106,.4)" stroke-width="1.4"/>
        <line x1="196" y1="118" x2="236" y2="140" stroke="rgba(255,215,106,.4)" stroke-width="1.4"/>
        ${клетка(112,224,62,118,'СТОИМОСТЬ','56','с',0)}
        ${клетка(36,150,140,196,'ЦЕНА','14','ц',1)}
        ${клетка(186,300,140,196,'КОЛИЧЕСТВО','4','к',2)}
        ${т(168,174,'×',24,GOLD,true)}
        ${подпись(168,232,формула, з?GREEN:МУТ, 14)}
      `,250)}</div>` +
      `<div class="ask тройка">
        ${BTN(4, з==='с'?'hit':'', 'Стоимость', "r991Закрыть('с')")}
        ${BTN(5, з==='ц'?'hit':'', 'Цена', "r991Закрыть('ц')")}
        ${BTN(6, з==='к'?'hit':'', 'Количество', "r991Закрыть('к')")}
      </div>` +
      СКАЗ('Смотри', з==='с'
        ? 'Закрыта стоимость — остались цена и количество, между ними знак <b>×</b>. Значит, стоимость находят умножением: 14 × 4 = 56.'
        : з==='ц' ? 'Закрыта цена — сверху стоимость, рядом количество. Делим: 56 : 4 = 14.'
        : з==='к' ? 'Закрыто количество — делим стоимость на цену: 56 : 14 = 4.'
        : 'Нажми любую из трёх кнопок.') +
      ПРАВИЛО('Одна связь — три задачи. <b>Закрыл величину — узнал действие.</b>');
  }

  /* 7. Сдача: два действия подряд */
  function F7(s){
    const в = s.о4, верно = в==='ok';
    const отдал = `<g>${анТРаз('0 0;112 0','900ms')}
      ${монета(104,156,9)}${монета(122,156,9)}${подпись(113,140,'100 др.',GOLD,14)}</g>`;
    const сдача = верно ? `<g opacity="0">${анРаз('opacity','0;1','300ms','1.2s')}
      ${анТРаз('0 0;-146 34','900ms','1.2s')}
      ${монета(250,148,8)}${подпись(250,182,'16 др.',GREEN,14)}</g>` : '';
    return СПИСОК(s) +
      ЗАДАЧА('За семь бочек ты протянул торговцу <b>монету в 100 драхм</b>. Он отсчитал сдачу. Сколько он должен вернуть?') +
      `<div class="pic">${свг(`
        ${фон(244)}
        ${подпись(168,24,'Расчёт у торговца',GOLD,16)}
        ${[0,1,2,3,4,5,6].map(i=>`<g>${верно?'':очередь(i,7,'7s')}${бочонок(102+i*32,64,0.7)}</g>`).join('')}
        ${подпись(202,106,'7 × 12 = 84',GOLD,16)}
        ${кошель(52,178,0.9)}
        ${торговец(292,196,'#8a7154')}
        ${отдал}
        ${сдача}
        ${верно?рамкаВсп(84,42,304,88,GREEN,'7s',0.14):''}
        ${т(168,226,'товар на 84, а дал 100 — разницу вернут',14,МУТ)}
      `,244)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), 'Сдачи 16 драхм', "r991О4('ok')")}
        ${BTN(5, в==='no'?'miss':'', 'Сдачи 88 драхм', "r991О4('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно, и здесь два действия. Сначала стоимость: 7 × 12 = 84. Потом сдача: 100 − 84 = 16.'
              : 'Нет: 100 − 12 = 88 — это сдача за <b>одну</b> бочку. Бочек семь, они стоят 7 × 12 = 84, значит сдача 100 − 84 = 16.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ПРАВИЛО('Сдача = <b>отдал − стоимость</b>. Стоимость считают первой.');
  }

  /* 8. Торг: где дешевле на самом деле */
  function F8(s){
    const в = s.о5, верно = в==='ok', есть = куплено(s,'кувшины');
    return СПИСОК(s) +
      ЗАДАЧА('Осталось купить глиняные кувшины для масла. Слева: <b>3 кувшина за 36 драхм</b>. Справа: <b>5 кувшинов за 55 драхм</b>. Где кувшин дешевле?') +
      `<div class="pic">${свг(`
        ${фон(254)}
        ${подпись(168,24,'Две лавки рядом',GOLD,16)}
        ${лавка(86,178,56,true)}
        ${лавка(250,178,56,true)}
        ${[0,1,2].map(i=>`<g>${верно?'':очередь(i,3,'6s')}${амфора(62+i*24,141,0.55)}</g>`).join('')}
        ${[0,1,2,3,4].map(i=>`<g>${верно?'':очередь(i,5,'6s')}${амфора(206+i*22,142,0.5)}</g>`).join('')}
        ${подпись(86,200,'3 за 36 др.',GOLD,14)}
        ${подпись(250,200,'5 за 55 др.',GOLD,14)}
        ${верно?рамкаВсп(194,124,308,160,GREEN,'6s',0.12):''}
        ${верно?подпись(86,232,'36 : 3 = 12',МУТ,16):''}
        ${верно?подпись(250,232,'55 : 5 = 11',GREEN,16):подпись(168,232,'сравни цену одного кувшина',GOLD,14)}
      `,254)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), 'Справа: там кувшин стоит 11 драхм', "r991О5('ok')")}
        ${BTN(5, в==='no'?'miss':'', 'Слева: там вся покупка дешевле', "r991О5('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно. Считать надо не «сколько отдал», а «сколько за один»: 36 : 3 = 12, а 55 : 5 = 11. Справа дешевле на драхму с кувшина.'
              : 'Нет: 36 меньше 55, но и кувшинов там меньше. Сравнивают <b>цену одного</b>: 36 : 3 = 12 против 55 : 5 = 11. Дешевле справа.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ДЕЛО(есть ? '✓ Кувшины куплены, отдал 55 драхм' : 'Заплатить 55 драхм', "r991Купить('кувшины')", есть, верно) +
      ПРАВИЛО('Чтобы сравнить две покупки, <b>приведи обе к одному</b> предмету.');
  }

  /* 9. Ловушка: умножить вместо деления */
  function F9(s){
    const в = s.о6, верно = в==='ok';
    return СПИСОК(s) +
      ЗАДАЧА('Последняя проверка перед отходом. <b>За 3 кувшина отдали 45 драхм.</b> Сколько стоит один?') +
      `<div class="pic">${свг(`
        ${фон(248)}
        ${подпись(168,24,'Ловушка',GOLD,16)}
        ${[0,1,2].map(i=>`<g>${очередь(i,3,'6s')}${амфора(136+i*32,76,0.7)}</g>`).join('')}
        ${подпись(168,118,'за 3 кувшина отдали 45',GOLD,14)}
        <path d="M150 130 L88 162" fill="none" stroke="${RED}" stroke-width="1.6" opacity=".7"/>
        <path d="M186 130 L250 162" fill="none" stroke="${GREEN}" stroke-width="1.6" opacity=".7"/>
        <g>${проявить('6s',0.5,0.62)}${подпись(84,188,'45 × 3 = 135',RED,16)}</g>
        <path d="M26 164 L142 186" stroke="${RED}" stroke-width="2" opacity=".7"/>
        <path d="M26 186 L142 164" stroke="${RED}" stroke-width="2" opacity=".7"/>
        ${подпись(252,188,'45 : 3 = 15',GREEN,16)}
        ${верно?рамкаВсп(120,52,216,98,GREEN,'6s',0.14):''}
        ${т(168,226,'цена одного меньше, чем отдали за всё',14,МУТ)}
      `,248)}</div>` +
      `<div class="ask">
        ${BTN(4, верно?'hit':(в?'miss':''), '15 драхм', "r991О6('ok')")}
        ${BTN(5, в==='no'?'miss':'', '135 драхм', "r991О6('no')")}
      </div>` +
      (в!=null ? РАЗБОР(верно,
        верно ? 'Верно: 45 : 3 = 15. И проверка сходится — 15 × 3 = 45.'
              : 'Нет: 135 больше, чем все отданные 45 драхм. Один кувшин не может стоить дороже трёх. Делим: 45 : 3 = 15.')
        : СКАЗ('Ответ','Выбери вариант выше.')) +
      ПРАВИЛО('Проверка на глупость: <b>цена одного всегда меньше стоимости всех</b>.');
  }

  /* 10. Итог похода */
  function F10(s){
    const всё = ПОКУПКИ.every(п=>куплено(s,п.ключ));
    const груз = `
      ${моток(60,178,13)}${моток(90,178,13)}
      <rect x="110" y="164" width="48" height="24" rx="3" fill="url(#c991-полотно)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[120,134,148].map(x=>`<path d="M${x} 164 q-2 12 0 24" fill="none" stroke="rgba(90,70,35,.3)" stroke-width="1.2"/>`).join('')}
      <path d="M110 172 q24 4 48 0" fill="none" stroke="rgba(90,70,35,.25)" stroke-width="1.2"/>
      ${бочонок(182,178,0.8)}${бочонок(208,178,0.8)}
      ${амфора(240,178,0.7)}${амфора(266,178,0.7)}${амфора(292,178,0.7)}`;
    return СПИСОК(s) +
      ЗАДАЧА(всё
        ? 'Список закрыт: верёвка, ткань, бочки и кувшины на борту. Посчитаем, сколько ушло и сколько осталось.'
        : 'В списке ещё не всё отмечено — вернись на прошлые кадры и расплатись. А пока посмотрим, как сходится счёт, если купить всё.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="44" fill="url(#c991-небо)"/>
        <rect x="0" y="44" width="336" height="60" fill="url(#c991-море)"/>
        <rect x="0" y="104" width="336" height="18" fill="${КАМЕНЬ}" opacity=".55"/>
        <rect x="0" y="122" width="336" height="128" fill="url(#c991-площадь)"/>
        <rect x="0" y="0" width="336" height="250" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>
        ${судно(168,92,1)}
        <g>${проявить('8s',0.5,0.62)}${груз}</g>
        ${кольцо(168,86,58,GOLD,'8s',0.12)}
        ${подпись(168,24,'Судно снаряжено',GOLD,16)}
        ${подпись(168,214,'потрачено 285 · осталось 15',GREEN,16)}
        ${т(168,238,'на обратный путь ещё хватит',14,МУТ)}
      `,250)}</div>` +
      СКАЗ('Сверка','56 + 90 + 84 + 55 = <b>285</b> драхм потрачено. Было 300, значит 300 − 285 = <b>15</b> драхм осталось. Столько же показывает кошель в описи — счёт сошёлся.') +
      ПРАВИЛО('Стоимость всей закупки — это <b>сумма стоимостей</b> каждой покупки.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Тетива: 6 мотков по 9 драхм. Сколько отдашь за всё?',
      варианты:[{т:'54 драхмы',ок:true},{т:'15 драхм',ок:false}],
      разбор:'Ищут стоимость: цена × количество. 9 × 6 = 54.' },
    { вопрос:'За 8 факелов отдали 96 драхм. Сколько стоит один факел?',
      варианты:[{т:'12 драхм',ок:true},{т:'768 драхм',ок:false}],
      разбор:'Ищут цену: стоимость : количество. 96 : 8 = 12. Один факел не может стоить дороже всех восьми.' },
    { вопрос:'Есть 60 драхм, мера зерна стоит 15. Сколько мер купишь?',
      варианты:[{т:'4 меры',ок:true},{т:'900 мер',ок:false}],
      разбор:'Ищут количество: стоимость : цена. 60 : 15 = 4.' },
    { вопрос:'3 кувшина за 33 драхмы или 5 кувшинов за 60. Где кувшин дешевле?',
      варианты:[{т:'Где 3 за 33: там 11 за штуку',ок:true},{т:'Где 5 за 60',ок:false}],
      разбор:'33 : 3 = 11, а 60 : 5 = 12. Сравнивают цену одного, а не всю покупку.' },
    { вопрос:'Отдал 50 драхм за 4 весла по 11. Сколько сдачи?',
      варианты:[{т:'6 драхм',ок:true},{т:'39 драхм',ок:false}],
      разбор:'Сначала стоимость: 11 × 4 = 44. Потом сдача: 50 − 44 = 6.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r991Reset()")}</div>` +
        ПРАВИЛО('Стоимость = цена × количество; <b>цена и количество — делением</b>.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к,
        выбран===к ? (в.ок?'hit':'miss') : '',
        в.т, "r991Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Стоимость', задания:[
    {q:'5 мер по 12 драхм. Стоимость?', в:0, варианты:['60 драхм','17 драхм'], раз:'12 × 5 = 60. Складывать цену с количеством нельзя.'},
    {q:'7 мотков верёвки по 9 драхм. Стоимость?', в:0, варианты:['63 драхмы','16 драхм'], раз:'9 × 7 = 63.'},
    {q:'4 бочки по 25 драхм. Стоимость?', в:1, варианты:['29 драхм','100 драхм'], раз:'25 × 4 = 100.'},
    {q:'3 весла по 18 драхм. Стоимость?', в:0, варианты:['54 драхмы','21 драхма'], раз:'18 × 3 = 54.'}
  ]};
  const Т2 = { имя:'Цена и количество', задания:[
    {q:'6 мешков стоили 72 драхмы. Цена мешка?', в:0, варианты:['12 драхм','432 драхмы'], раз:'72 : 6 = 12.'},
    {q:'9 факелов стоили 90 драхм. Цена факела?', в:1, варианты:['81 драхма','10 драхм'], раз:'90 : 9 = 10.'},
    {q:'Есть 48 драхм, мера стоит 8. Сколько мер?', в:0, варианты:['6 мер','40 мер'], раз:'48 : 8 = 6. Вычитание тут не при чём.'},
    {q:'Есть 100 драхм, кувшин стоит 20. Сколько кувшинов?', в:1, варианты:['80 кувшинов','5 кувшинов'], раз:'100 : 20 = 5.'}
  ]};
  const Т3 = { имя:'Торг и сдача', задания:[
    {q:'4 бочки за 48 или 6 бочек за 66. Где дешевле бочка?', в:1, варианты:['Где 4 за 48','Где 6 за 66'], раз:'48 : 4 = 12, а 66 : 6 = 11. Дешевле там, где берут шесть.'},
    {q:'Отдал 100 драхм за 3 меры по 24. Сколько сдачи?', в:0, варианты:['28 драхм','76 драхм'], раз:'24 × 3 = 72; 100 − 72 = 28.'},
    {q:'Во сколько раз 8 мотков дороже двух — при одной цене?', в:0, варианты:['В 4 раза','На 6 драхм'], раз:'8 : 2 = 4. Во сколько раз больше товара, во столько дороже.'},
    {q:'5 мер стоили 60 драхм. Сколько отдашь за 8 таких же мер?', в:1, варианты:['63 драхмы','96 драхм'], раз:'Сначала цена одной: 60 : 5 = 12. Потом 12 × 8 = 96.'}
  ]};

  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r991T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r991TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L991 = {
    id: ID,
    title: 'Задачи на куплю-продажу',
    ico: '🪙',
    src: 'Начальная школа · 4 класс · Цена, количество, стоимость',
    subj: 'jun',
    explain: [
      'Архимед даёт 300 драхм и список покупок. Последний порт перед открытым морем: цена — сколько стоит один, количество — сколько взяли, стоимость — сколько отдали за всё.',
      'Моток верёвки стоит 14 драхм. Бери мотки с полки: цена не меняется, а стоимость растёт — это цена, повторённая столько раз, сколько мотков.',
      'Лавка верёвок: 14 драхм за моток, нужно 4 мотка. Стоимость = цена × количество, 14 × 4 = 56.',
      'Лавка тканей: 5 метров ткани за 90 драхм. Ткань режут на одинаковые куски, и 90 делится между ними поровну: цена = стоимость : количество, 90 : 5 = 18.',
      'Лавка бочек: 84 драхмы, бочка стоит 12. Раскладываем монеты кучками по 12 — сколько кучек, столько бочек: количество = стоимость : цена, 84 : 12 = 7.',
      'Восковая табличка: закрой печатью ту величину, которую ищешь, и оставшиеся две покажут действие. Одна связь — три задачи.',
      'Сдача считается в два действия: сначала стоимость 7 × 12 = 84, потом 100 − 84 = 16.',
      'Торг: 3 кувшина за 36 или 5 за 55. Сравнивают не всю покупку, а цену одного: 12 против 11.',
      'Ловушка: за 3 кувшина отдали 45 — цена одного 45 : 3 = 15, а не 135. Цена одного всегда меньше стоимости всех.',
      'Итог: 56 + 90 + 84 + 55 = 285 потрачено, 300 − 285 = 15 осталось. Счёт сошёлся с кошелём.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: стоимость.',
      'Тренажёр 2: цена и количество.',
      'Тренажёр 3: торг и сдача.'
    ],
    check: {
      q: 'За 6 мотков верёвки отдали 84 драхмы. Сколько стоит один моток?',
      choices: ['14 драхм','504 драхмы','90 драхм'],
      ans: 0,
      exp: 'Ищем цену: стоимость делим на количество, 84 : 6 = 14.'
    },
    tasks: [
      { q:'Моток верёвки стоит 14 драхм. Сколько отдашь за 4 мотка?', kind:'choice',
        choices:['56 драхм','18 драхм'], ans:0,
        hints:['Ищут стоимость.','Цену повторяют столько раз, сколько мотков: 14 × 4.'],
        sol:'14 × 4 = 56 драхм.' },
      { q:'5 метров ткани стоили 90 драхм. Сколько стоит один метр?', kind:'choice',
        choices:['18 драхм','450 драхм'], ans:0,
        hints:['Ищут цену.','Стоимость делят на количество: 90 : 5.'],
        sol:'90 : 5 = 18 драхм.' },
      { q:'Есть 84 драхмы, бочка стоит 12. Сколько бочек купишь?', kind:'choice',
        choices:['7 бочек','96 бочек'], ans:0,
        hints:['Ищут количество.','Сколько раз по 12 помещается в 84.'],
        sol:'84 : 12 = 7 бочек.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L991.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
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
      1:'Поручение и кошель',
      2:'Цена и количество',
      3:'Лавка верёвок',
      4:'Лавка тканей',
      5:'Лавка бочек',
      6:'Табличка трёх величин',
      7:'Сдача',
      8:'Где дешевле',
      9:'Ловушка',
      10:'Судно снаряжено',
      11:'Практика',
      12:'Тренажёр 1',
      13:'Тренажёр 2',
      14:'Тренажёр 3'
    };
    el.innerHTML = `<div class="s6 l991" data-frame="${f}">
        <h2>${ЗАГОЛОВКИ[f]||'Куплю-продажу'}</h2>
        ${сцена}
      </div>`;
  }

  window.r991Мотки  =(д)=>{ const s=S();
    s.мотков=Math.max(0,Math.min(6,(s.мотков==null?2:s.мотков)+д)); chRender(0); };
  window.r991О1     =(к)=>{ S().о1=к; chRender(0); };
  window.r991О2     =(к)=>{ S().о2=к; chRender(0); };
  window.r991О3     =(к)=>{ S().о3=к; chRender(0); };
  window.r991О4     =(к)=>{ S().о4=к; chRender(0); };
  window.r991О5     =(к)=>{ S().о5=к; chRender(0); };
  window.r991О6     =(к)=>{ S().о6=к; chRender(0); };
  window.r991Закрыть=(к)=>{ const s=S(); s.закрыта=(s.закрыта===к?null:к); chRender(0); };
  window.r991Купить =(к)=>{ const s=S(); s['куп_'+к]=!s['куп_'+к]; chRender(0); };
  window.r991Pick=(уровень,вариант)=>{
    const s=S();
    s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1;
    chRender(0);
  };
  window.r991Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r991T=(ключ,вариант)=>{
    const s=S();
    if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const шаг=(s[ключ+'Шаг']||0)%набор.задания.length;
    const з=набор.задания[шаг];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0);
  };
  window.r991TNext=(ключ)=>{
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
        if(место>=0) arr[место]=L991; else arr.push(L991);
      }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA991={render:render, L:L991};
})();
