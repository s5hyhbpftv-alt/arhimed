/* ====== МАТЕМАТИКА · УРОК 394 · «ДЕЛИМОСТЬ И ДЕСЯТИЧНАЯ ЗАПИСЬ» ================
   5–6 класс, олимпиадная теория чисел. Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md); прежние версии (vis_wk.js visW394, vis_bw.js)
   остаются в общих файлах, этот файл регистрируется поверх них.

   ОТЛИЧИЕ ОТ УРОКА 356 «Признаки делимости». Там — сами признаки. Здесь —
   ПОЧЕМУ они работают: всё держится на десятичной записи. Число лежит на
   счётной доске камешками по полосам (тысячи, сотни, десятки, единицы), и
   признак виден глазами:
     · 10 делится на 2, 5, 10 — десятки ничего не решают, решают единицы;
     · 100 = 4 · 25 — сотни ничего не решают, решают две последние цифры;
     · 10 = 9 + 1, 100 = 99 + 1 … — от каждого камешка после раздачи по 9
       остаётся один: остаток от 9 — это число камешков, то есть сумма цифр.
   Отсюда олимпиадные следствия: цифра-невидимка (5□4 делится на 9 при □ = 0
   и при □ = 9 — два ответа), перестановка цифр не меняет остатка от 3 и 9,
   число aaa всегда делится на 3 (и на 37: 111 = 3 · 37). В конце — НОК: два
   маяка мигают раз в 6 и раз в 8 секунд и вспыхивают вместе раз в 24.

   РУКАМИ: камешки на доске (кадры 2 и 5 — добавь один камешек так, чтобы
   делилось на 9: подходит ЛЮБАЯ полоса), выбор части груза, которая решает
   (кадр 3), цифры-кандидаты (кадр 6), цифра a (кадр 8).

   СЮЖЕТ: гавань Сиракуз. Архимед написал «Исчисление песчинок» — как
   записать число песчинок, которыми можно засыпать весь мир. В порту так же:
   грузы большие, делить долго — а по записи числа видно сразу.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     3 752 = 8 · 469 (на 2 и на 4 — да: 52 = 4 · 13), сумма 17 — на 3 и 9 нет;
       3 752 = 9 · 416 + 8, 3 752 = 3 · 1 250 + 2; +1 камешек → сумма 18:
       3 753 = 9 · 417, 3 762 = 9 · 418, 3 852 = 9 · 428, 4 752 = 9 · 528.
     4 736 : 5 — остаток 1 (6 = 5 + 1).
     3 716 = 4 · 929 (16 = 4 · 4); 3 726: 26 = 4 · 6 + 2 — не делится.
     5□4 : 9 → 9 + □ кратно 9 → □ = 0 (504 = 9 · 56) или □ = 9 (594 = 9 · 66).
     цифры 1…6: сумма 21 — на 3 всегда, на 9 никогда (21 = 18 + 3).
     aaa = a · 111 = a · 3 · 37; 777 = 21 · 37.
     НОК(6, 8) = 24; 48 = 6 · 8 — общее, но не наименьшее.

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>,
   сдвиги animateTransform идут с невидимым «заводом». Без движения каждый
   рисунок показывает конечное состояние. */
(function(){
  'use strict';

  const ID = 394;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', НЕБО='#9fc6ff', ЯНТАРЬ='#ffb35c';
  const ИНК='#f5efe2', МУТ='#b9b3c9', ЛИНИЯ='#4d5680', ОБВОД='#0c0f1c';

  /* ---------- ЛИСТ ПОРТА: ход квеста ---------- */
  const ДЕЛА = [
    {ключ:'камешек',   имя:'Одним камешком сделать груз кратным 9', итог:'18 камешков'},
    {ключ:'невидимка', имя:'Найти цифру-невидимку в 5□4',            итог:'0 и 9'},
    {ключ:'ааа',       имя:'Доказать: aaa делится на 3',              итог:'a + a + a'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l394{gap:14px}
  #lvis .s6.l394 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l394 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l394 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#232845,#151a30);border:1.5px solid var(--line)}
  #lvis .s6.l394 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l394 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l394 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l394 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l394 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l394 .карт .текст b{color:${GOLD}}
  #lvis .s6.l394 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l394 .правило b{color:${GOLD}}

  #lvis .s6.l394 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(255,179,92,.14),rgba(255,179,92,.04));
    border:1.5px solid rgba(255,179,92,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l394 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l394 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ЯНТАРЬ}}
  #lvis .s6.l394 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l394 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l394 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l394 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l394 .лист li.есть{color:${ИНК}}
  #lvis .s6.l394 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l394 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l394 .лист li.есть span{color:${GREEN}}

  /* ── кнопки полос счётной доски: по столбцу на полосу ── */
  #lvis .s6.l394 .полосы{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%}
  #lvis .s6.l394 .полосы button,#lvis .s6.l394 .цифры button,#lvis .s6.l394 .рычаги button{
    min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:700;
    border:1.5px solid rgba(255,179,92,.55);background:rgba(255,179,92,.13);color:${ИНК};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;font-variant-numeric:tabular-nums;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l394 .полосы button:active,#lvis .s6.l394 .цифры button:active,#lvis .s6.l394 .рычаги button:active{
    transform:translateY(2px);background:rgba(255,179,92,.26)}
  #lvis .s6.l394 .полосы button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l394 .цифры{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;width:100%}
  #lvis .s6.l394 .цифры button.да{border-color:${GREEN};background:rgba(143,224,176,.18);color:${GREEN}}
  #lvis .s6.l394 .цифры button.нет{border-color:${RED};background:rgba(255,138,120,.12);color:${RED}}
  #lvis .s6.l394 .цифры button.вкл{border-color:${GOLD};background:rgba(255,215,106,.18);color:${GOLD}}
  #lvis .s6.l394 .рычаги{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l394 .рычаги button{font-size:16px}

  #lvis .s6.l394 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l394 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l394 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l394 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l394 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l394 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l394 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:20px}

  #lvis .s6.l394 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l394 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l394 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l394 .уровни .точка.сейчас{background:${GOLD};animation:l394dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l394dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l394 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l394{-webkit-text-size-adjust:100%}
  #lvis .s6.l394 [data-anim]{animation:l394rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l394rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l394 [data-anim]{animation:none!important}
    #lvis .s6.l394 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l394 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l394-style');
      if(!s){ s=document.createElement('style'); s.id='l394-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Порт</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));

  const ЛИСТ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'лист',
      `<div class="шапка"><span>Портовая книга</span><b class="${всё?'готово':''}">${
        всё?'всё сделано':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const тыс = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');

  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c394-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#141a38"/><stop offset="0.45" stop-color="#3a3566"/>
        <stop offset="0.78" stop-color="#b8676a"/><stop offset="1" stop-color="#f0a66a"/>
      </linearGradient>
      <linearGradient id="c394-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2246"/><stop offset="1" stop-color="#0d1024"/>
      </linearGradient>
      <linearGradient id="c394-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3b5b8c"/><stop offset="0.5" stop-color="#1c3558"/><stop offset="1" stop-color="#0b1a30"/>
      </linearGradient>
      <radialGradient id="c394-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fff2c4"/><stop offset="0.35" stop-color="#ffc56b" stop-opacity=".9"/>
        <stop offset="1" stop-color="#ff9a5c" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c394-огонь" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffbe6"/><stop offset="0.3" stop-color="#ffd76a" stop-opacity=".95"/>
        <stop offset="1" stop-color="#ffb35c" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c394-луч" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#ffe9a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="c394-луч2" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stop-color="#ffe9a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="c394-город" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2f4e"/><stop offset="1" stop-color="#241d36"/>
      </linearGradient>
      <linearGradient id="c394-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a5a31"/><stop offset="0.5" stop-color="#6d4424"/><stop offset="1" stop-color="#4a2c15"/>
      </linearGradient>
      <linearGradient id="c394-доска" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f3e3bd"/><stop offset="1" stop-color="#d8bf8c"/>
      </linearGradient>
      <linearGradient id="c394-желоб" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b39562"/><stop offset="0.5" stop-color="#cdb07b"/><stop offset="1" stop-color="#b39562"/>
      </linearGradient>
      <radialGradient id="c394-камень" cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#e6ddcc"/><stop offset="1" stop-color="#8f8370"/>
      </radialGradient>
      <radialGradient id="c394-камень-золото" cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stop-color="#fff6cf"/><stop offset="0.45" stop-color="#f1c056"/><stop offset="1" stop-color="#8f5c12"/>
      </radialGradient>
      <radialGradient id="c394-камень-синий" cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stop-color="#f1f8ff"/><stop offset="0.45" stop-color="#8fbef0"/><stop offset="1" stop-color="#2f5d93"/>
      </radialGradient>
      <linearGradient id="c394-амфора" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8e3f22"/><stop offset="0.35" stop-color="#e08a5a"/><stop offset="0.6" stop-color="#c2653a"/><stop offset="1" stop-color="#6e2e17"/>
      </linearGradient>
      <linearGradient id="c394-мешок" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e9d3a4"/><stop offset="1" stop-color="#a88652"/>
      </linearGradient>
      <linearGradient id="c394-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6ead0"/><stop offset="1" stop-color="#dcc697"/>
      </linearGradient>
      <linearGradient id="c394-камень-стен" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7b7389"/><stop offset="1" stop-color="#433c52"/>
      </linearGradient>
      <filter id="c394-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".5"/>
      </filter>
      <filter id="c394-мягко" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>`;

  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (высота) => `<rect x="0.8" y="0.8" width="334.4" height="${высота-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const ночь = (высота) => `<rect x="0" y="0" width="336" height="${высота}" fill="url(#c394-ночь)"/>
    ${[[24,20],[70,44],[118,16],[210,30],[262,14],[300,48],[160,52],[40,70]].map((з,i)=>
      `<circle cx="${з[0]}" cy="${з[1]}" r="${i%3?0.9:1.3}" fill="#fff" opacity=".7">${анЛин('opacity','0.7;0.25;0.7',(2.4+i*0.37).toFixed(2)+'s')}</circle>`).join('')}`;

  /* плашка-подпись: ширина по числу знаков с запасом на жирную кириллицу */
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c394-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(12,15,28,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* ---------- ГАВАНЬ: небо, солнце, город, море ---------- */
  const город = (y) => `<g fill="url(#c394-город)">
    <path d="M0 ${y} L0 ${y-18} L18 ${y-18} L18 ${y-30} L30 ${y-30} L30 ${y-18} L52 ${y-18} L52 ${y-26} L74 ${y-26} L74 ${y-14} L96 ${y-14} L96 ${y} Z"/>
    <path d="M200 ${y} L200 ${y-22} L212 ${y-22} L212 ${y-40} L226 ${y-40} L226 ${y-22} L246 ${y-22} L246 ${y-16} L336 ${y-16} L336 ${y} Z"/>
    ${/* храм с колоннами на холме */''}
    <path d="M110 ${y} Q150 ${y-26} 190 ${y} Z"/>
    <path d="M128 ${y-24} L150 ${y-36} L172 ${y-24} Z"/>
    <rect x="130" y="${y-24}" width="40" height="3"/>
    ${[0,1,2,3,4].map(i=>`<rect x="${132+i*8}" y="${y-21}" width="3.4" height="13"/>`).join('')}
    <rect x="128" y="${y-9}" width="44" height="3"/>
  </g>`;
  const море = (y,высота) => `<rect x="0" y="${y}" width="336" height="${высота-y}" fill="url(#c394-море)"/>
    ${[0,1,2,3,4,5].map(i=>`<path d="M${-20+i*13} ${y+10+i*9} q40 -4 80 0 t80 0 t80 0 t80 0 t80 0" fill="none"
      stroke="#ffd6a0" stroke-width="${1.4-i*0.15}" opacity="${(0.5-i*0.06).toFixed(2)}" stroke-dasharray="18 22">
      ${анЛин('stroke-dashoffset','0;-40',(3+i*0.6).toFixed(1)+'s')}</path>`).join('')}`;
  const корабль = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c394-тень)">
    <path d="M-40 0 q6 16 40 16 q34 0 40 -16 z" fill="url(#c394-дерево)" stroke="${ОБВОД}" stroke-width="1.2"/>
    ${[-26,-14,-2,10,22].map(ox=>`<line x1="${ox}" y1="10" x2="${ox-6}" y2="22" stroke="#4a2c15" stroke-width="1.6"/>`).join('')}
    <line x1="0" y1="0" x2="0" y2="-54" stroke="#3b2413" stroke-width="2.4"/>
    <path d="M-26 -48 Q0 -40 26 -48 L24 -12 Q0 -6 -24 -12 Z" fill="#f4ead2" stroke="${ОБВОД}" stroke-width="1"/>
    <path d="M-25 -32 Q0 -25 25 -32" fill="none" stroke="#c8683e" stroke-width="3.2"/>
    <path d="M-24.5 -22 Q0 -15 24.5 -22" fill="none" stroke="#c8683e" stroke-width="3.2"/>
    <path d="M0 -54 l12 4 l-12 4 z" fill="#c8683e"/>
  </g>`;
  const амфора = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c394-тень)">
    <path d="M-5 -28 h10 l1 5 q9 3 9 15 q0 14 -9 22 l-3 6 h-6 l-3 -6 q-9 -8 -9 -22 q0 -12 9 -15 z"
      fill="url(#c394-амфора)" stroke="${ОБВОД}" stroke-width="0.9"/>
    <path d="M-5 -24 q-8 1 -8 9 M5 -24 q8 1 8 9" fill="none" stroke="#6e2e17" stroke-width="2"/>
    <path d="M-8 -6 h16" stroke="#f2c29a" stroke-width="1.2" opacity=".6"/>
  </g>`;
  const мешок = (x,y,надпись) => `<g transform="translate(${x} ${y})" filter="url(#c394-тень)">
    <path d="M-14 12 q-4 -18 6 -26 l-3 -6 h22 l-3 6 q10 8 6 26 z" fill="url(#c394-мешок)" stroke="${ОБВОД}" stroke-width="0.9"/>
    <path d="M-8 -14 q8 4 16 0" fill="none" stroke="#6d4a22" stroke-width="2"/>
    ${т(0,6,надпись==null?'10':надпись,12,'#4a2c15',true)}
  </g>`;

  /* ---------- СЧЁТНАЯ ДОСКА ----------------------------------------------------
     Четыре желоба: тысячи, сотни, десятки, единицы. В желобе столько
     камешков, какова цифра разряда (0…9). Камешки ложатся снизу вверх. */
  const ПОЛОСЫ = ['тыс.','сот.','дес.','ед.'];
  const КАМ = 9.5;
  function доска(цифры, о){
    const оо=о||{};
    const x0=оо.x0||34, y0=оо.y0||40, ш=268, в=оо.в||256, шаг=ш/4;
    const низ = y0+в-58;   /* под нижним камешком — табличка с цифрой, внутри доски */
    let s=`<g filter="url(#c394-тень)">
      <rect x="${x0-10}" y="${y0-10}" width="${ш+20}" height="${в+20}" rx="12" fill="url(#c394-дерево)" stroke="${ОБВОД}" stroke-width="1.4"/>
      <rect x="${x0}" y="${y0}" width="${ш}" height="${в}" rx="8" fill="url(#c394-доска)"/>
      ${[0,1,2].map(i=>`<path d="M${x0+8} ${y0+30+i*62} q${ш/2} ${i%2?6:-6} ${ш-16} 0" fill="none" stroke="#b89a64" stroke-width=".8" opacity=".5"/>`).join('')}
    </g>`;
    цифры.forEach((ц,к)=>{
      const cx=x0+шаг*к+шаг/2;
      s+=`<rect x="${cx-15}" y="${y0+32}" width="30" height="${низ-y0-20}" rx="15" fill="url(#c394-желоб)" opacity=".75"/>`;
      s+=т(cx,y0+22,ПОЛОСЫ[к],12,'#6a4b22',true);
      for(let н=0;н<ц;н++){
        const cy = низ - н*(2*КАМ+0.5);
        const свет = оо.свет && оо.свет(к,н);
        const залив = свет==='золото'?'url(#c394-камень-золото)':(свет==='синий'?'url(#c394-камень-синий)':'url(#c394-камень)');
        const свежий = оо.свежий && оо.свежий[0]===к && н===ц-1;
        s+=`<g>${свежий?анРаз('opacity','0;1','0.4s'):''}
          <ellipse cx="${cx+1}" cy="${cy+КАМ-1}" rx="${КАМ*0.9}" ry="2.6" fill="#000" opacity=".22"/>
          <circle cx="${cx}" cy="${cy}" r="${КАМ}" fill="${залив}" stroke="#6b5e49" stroke-width=".8"/></g>`;
      }
      s+=`<g filter="url(#c394-тень)"><rect x="${cx-17}" y="${низ+18}" width="34" height="30" rx="8" fill="#2a1a0c" stroke="#a7834b" stroke-width="1.2"/>
        ${т(cx,низ+40,String(ц),20,оо.цвет&&оо.цвет(к)||GOLD,true)}</g>`;
    });
    return s;
  }

  /* ---------- МАЯК ---------- */
  const маяк = (x,y,период,цвет,налево) => `<g>
    <path d="M${x-26} ${y+64} q26 -14 52 0 z" fill="#241d36"/>
    <path d="M${x-10} ${y+58} L${x-7} ${y+8} L${x+7} ${y+8} L${x+10} ${y+58} Z" fill="url(#c394-камень-стен)" stroke="${ОБВОД}" stroke-width="1"/>
    ${[18,32,46].map(dy=>`<line x1="${x-8.5}" y1="${y+dy}" x2="${x+8.5}" y2="${y+dy}" stroke="#2c2640" stroke-width="1.4"/>`).join('')}
    <rect x="${x-9}" y="${y-4}" width="18" height="12" rx="2" fill="#2c2640" stroke="${ОБВОД}" stroke-width="1"/>
    <path d="M${x-10} ${y-4} L${x} ${y-14} L${x+10} ${y-4} Z" fill="#433c52"/>
    <g opacity="${ДВИЖ?0.12:0.9}">
      ${анЛин('opacity','0.95;0.95;0.12;0.12',период,'keyTimes="0;0.18;0.3;1"')}
      <path d="M${x} ${y+2} L${налево?x-96:x+96} ${y-30} L${налево?x-96:x+96} ${y+4} Z" fill="url(#c394-${налево?'луч2':'луч'})"/>
      <circle cx="${x}" cy="${y+2}" r="16" fill="url(#c394-огонь)"/>
    </g>
    <circle cx="${x}" cy="${y+2}" r="4" fill="${цвет}"/>
  </g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Гавань Сиракуз */
  function F1(s){
    const Н=280;
    return ЛИСТ(s) +
      ЗАДАЧА('Вечер в гавани Сиракуз. Корабли везут амфоры, мешки и слитки — тысячами. Грузчикам надо знать: разложится ли груз поровну по 2, по 5, по 9 ящиков? Делить долго. Но Архимед, который в «Исчислении песчинок» научился записывать даже число песчинок на весь мир, знал: <b>ответ виден по записи числа</b>.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c394-небо)"/>
        <circle cx="236" cy="150" r="54" fill="url(#c394-солнце)">${анЛин('r','52;58;52','6s')}</circle>
        ${[[40,28],[96,56],[150,22],[296,40],[260,70]].map((з,i)=>`<circle cx="${з[0]}" cy="${з[1]}" r="1.1" fill="#fff" opacity=".6">${анЛин('opacity','0.6;0.15;0.6',(2.6+i*0.5).toFixed(1)+'s')}</circle>`).join('')}
        ${город(172)}
        ${море(172,Н)}
        <g>${анСдвиг('0 0;0 -3;0 0','4s','0;0.5;1')}${корабль(236,196,1)}</g>
        <path d="M0 238 L130 238 L130 ${Н} L0 ${Н} Z" fill="url(#c394-дерево)"/>
        ${[0,1,2,3,4,5,6].map(i=>`<line x1="${i*20}" y1="238" x2="${i*20}" y2="${Н}" stroke="#3a220f" stroke-width="1"/>`).join('')}
        ${амфора(24,232,1)}${амфора(50,234,0.9)}${амфора(74,232,1)}${мешок(106,226,'')}
        <g filter="url(#c394-тень)"><rect x="84" y="188" width="46" height="18" rx="4" fill="url(#c394-пергамент)" stroke="#a7834b"/>
          ${т(107,201,'3 752',12,'#3a2610',true)}<line x1="107" y1="206" x2="107" y2="212" stroke="#a7834b" stroke-width="1.2"/></g>
        ${подпись(168,28,'Гавань Сиракуз',GOLD,16)}
        ${подпись(212,Н-14,'3 752 амфоры — по сколько?',ИНК,12)}
      `,Н)}</div>` +
      СКАЗ('Как это устроено','Число записывают <b>разрядами</b>: единицы, десятки, сотни, тысячи. Каждый следующий в 10 раз больше. На этом и держатся все признаки делимости — сегодня увидим, почему.') +
      ПРАВИЛО('Делится ли число — часто видно <b>по его записи</b>, без деления.');
  }

  /* 2. Счётная доска: число — камешки по полосам */
  const цифрыИз = (s,кл,по) => { if(!s[кл]) s[кл]=(по||[3,7,5,2]).slice(); return s[кл]; };
  const число = (ц) => ц.reduce((а,д)=>а*10+д,0);
  function F2(s){
    const ц = цифрыИз(s,'доска2'), Н=340, n=число(ц);
    const разложение = ц.map((д,к)=>д+'·'+['1000','100','10','1'][к]).join(' + ');
    return ЛИСТ(s) +
      ЗАДАЧА('Так считали в древности: на <b>счётной доске</b> четыре желоба — тысячи, сотни, десятки, единицы. Камешек в желобе единиц — это 1, в желобе десятков — 10, сотен — 100. Клади и убирай камешки кнопками.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        ${доска(ц,{свежий:s.свежий2})}
        ${подпись(168,Н-8,тыс(n)+' = '+разложение,GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="полосы">${ПОЛОСЫ.map((п,к)=>BTN(3,'','+ '+п,"r394Кам2("+к+",1)",ц[к]>=9)).join('')}
        ${ПОЛОСЫ.map((п,к)=>BTN(4,'','− '+п,"r394Кам2("+к+",-1)",ц[к]<=0)).join('')}</div>` +
      СКАЗ('Больше девяти нельзя','В желобе не бывает десяти камешков: десять единиц — это <b>один камешек</b> в соседнем желобе. Поэтому каждая цифра — от 0 до 9.') +
      ПРАВИЛО('Цифра числа — это <b>сколько камешков в своём желобе</b>.');
  }

  /* 3. Кто решает для 2, 5, 10: мешки по 10 и россыпь */
  function F3(s){
    const Н=276, выбор=s.часть3, в=s.ответ3;
    const мешки = Array.from({length:10},(_,i)=>мешок(34+(i%5)*30,86+Math.floor(i/5)*44,'10')).join('');
    const россыпь = Array.from({length:6},(_,i)=>амфора(214+(i%3)*30,90+Math.floor(i/3)*48,0.95)).join('');
    const рамкаВыбора = (x,y,w,h,ок,активна) => активна ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none"
        stroke="${ок?GREEN:RED}" stroke-width="2.4" stroke-dasharray="7 5">${анЛин('stroke-dashoffset','0;-24','1.2s')}</rect>` : '';
    const разборы = ['1 — это и есть остаток: из 6 амфор россыпи в ящик по 5 уходит 5, одна лишняя.',
      'Не делится: 4 736 кончается на 6, а не на 0 или 5. Россыпь 6 = 5 + 1.',
      '6 — это вся россыпь, но в ящик кладут по 5: одна пятёрка уходит, <b>остаётся 6 − 5 = 1</b>.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Груз — 4 736 амфор. Почти всё уже увязано в мешки по 10, россыпью лежат 6. Разложим по ящикам по 5. <b>Тапни ту часть груза, которая решает</b>, останется ли лишнее.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        <rect x="16" y="52" width="162" height="150" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
        <rect x="190" y="52" width="130" height="150" rx="14" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
        <g pointer-events="none">
          ${мешки}${т(97,176,'473 мешка по 10',12,МУТ)}
          ${россыпь}${т(255,176,'россыпь: 6',12,МУТ)}
          ${рамкаВыбора(12,48,170,158,false,выбор==='мешки')}
          ${рамкаВыбора(186,48,138,158,true,выбор==='россыпь')}
          ${т(168,32,'4 736 = 473 · 10 + 6',16,GOLD,true)}
          ${подпись(168,Н-14, выбор==='россыпь'?'решают единицы — последняя цифра':'10 = 2 · 5 — мешок делится сам', выбор==='россыпь'?GREEN:ИНК,12)}
        </g>
        <rect x="16" y="52" width="162" height="150" fill="rgba(255,255,255,.001)" style="cursor:pointer" onclick="r394Часть3('мешки')"/>
        <rect x="190" y="52" width="130" height="150" fill="rgba(255,255,255,.001)" style="cursor:pointer" onclick="r394Часть3('россыпь')"/>
        ${рамка(Н)}
      `,Н)}</div>` +
      (выбор==='мешки' ? РАЗБОР(false,'Мешки ничего не решают: в каждом 10, а <b>10 делится и на 2, и на 5, и на 10</b>. Сколько бы мешков ни было, они разложатся без остатка. Смотри на россыпь.') : '') +
      (выбор==='россыпь'
        ? `<div class="ask три">${['1','0','6'].map((v,к)=>BTN(5+к, в===к?(к===0?'hit':'miss'):'', v, "r394Отв3("+к+")")).join('')}</div>` +
          (в==null ? СКАЗ('Вопрос','Сколько амфор останется лишними, если раскладывать по 5?') : РАЗБОР(в===0, разборы[в]))
        : '') +
      (в===0 ? ПРАВИЛО('На <b>2, 5 и 10</b> решает <b>последняя цифра</b>: все десятки делятся сами.') : '');
  }

  /* 4. Для 4 и 25 решают две последние цифры: 100 = 4 · 25 */
  function F4(s){
    const Н=270, в=s.ответ4;
    const ящик = (x,y) => `<g filter="url(#c394-тень)">
      <rect x="${x}" y="${y}" width="84" height="58" rx="6" fill="url(#c394-дерево)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[0,1,2].map(i=>`<line x1="${x+4}" y1="${y+14+i*15}" x2="${x+80}" y2="${y+14+i*15}" stroke="#3a220f" stroke-width="1"/>`).join('')}
      <rect x="${x+14}" y="${y+18}" width="56" height="22" rx="4" fill="url(#c394-пергамент)"/>
      ${т(x+42,y+34,'100',16,'#4a2c15',true)}</g>`;
    const четвёрки = Array.from({length:25},(_,i)=>`<circle cx="${198+(i%5)*22}" cy="${70+Math.floor(i/5)*20}" r="7"
        fill="url(#c394-камень-синий)" stroke="#2f5d93" stroke-width=".6">${анК('opacity','0.4;0.4;1;1','6s','0;'+кт(0.05+i*0.022)+';'+кт(0.08+i*0.022)+';1')}</circle>`).join('');
    const разборы = ['Последняя цифра 6 чётная — это признак на 2, а не на 4. Для 4 смотрят на две последние: <b>26 = 4 · 6 + 2</b>, остаток 2.',
      'Сотни (37 ящиков по 100) делятся на 4 сами, решает хвост: <b>16 = 4 · 4</b>. Значит, 3 716 делится на 4.'];
    return ЛИСТ(s) +
      ЗАДАЧА('А если раскладывать по 4? Мешок в 10 уже не делится на 4 (10 = 4 · 2 + 2). Зато <b>сотня делится</b>: 100 = 4 · 25. Значит, ящики по 100 не мешают — решает хвост из двух последних цифр.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        ${т(168,30,'100 = 4 · 25',16,GOLD,true)}
        ${ящик(28,56)}${ящик(40,122)}
        ${т(82,202,'сотни — в ящиках',12,МУТ)}
        <rect x="184" y="56" width="116" height="104" rx="12" fill="rgba(143,190,240,.08)" stroke="rgba(143,190,240,.4)"/>
        ${четвёрки}
        ${т(242,178,'25 четвёрок',12,МУТ)}
        ${подпись(168,Н-16,'сотня делится на 4 сама',ИНК,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask пара">
        ${BTN(4, в===0?'miss':'', '3 726', "r394Отв4(0)")}
        ${BTN(5, в===1?'hit':'', '3 716', "r394Отв4(1)")}
      </div>` +
      (в==null ? СКАЗ('Вопрос','Какое из чисел делится на 4?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('На <b>4 и на 25</b> решают <b>две последние цифры</b>: сотни делятся сами.') : '');
  }

  /* 5. Девятка: от каждого камешка остаётся один */
  function F5(s){
    const ц = цифрыИз(s,'доска5'), Н=340, сумма=ц.reduce((a,b)=>a+b,0), n=число(ц);
    const ост = сумма%9, готово = сумма>0 && ост===0;
    const номер = (к,н) => ц.slice(0,к).reduce((a,b)=>a+b,0)+н;   /* номер камешка по порядку */
    return ЛИСТ(s) +
      ЗАДАЧА('Теперь раскладываем по <b>9</b>. Тут помогает запись: 10 = 9 + 1, 100 = 99 + 1, 1000 = 999 + 1. Значит, от <b>каждого</b> камешка на доске после раздачи по 9 остаётся ровно 1. Остаток от 9 — это остаток от числа камешков. <b>Добавь один камешек</b> так, чтобы груз разложился по 9 без остатка.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        ${доска(ц,{свежий:s.свежий5, свет:(к,н)=> номер(к,н) < сумма-ост ? 'золото' : 'синий'})}
        ${подпись(168,Н-10, готово ? тыс(n)+' : 9 = '+тыс(n/9)+' — без остатка' : 'камешков '+сумма+' = 9 · '+Math.floor(сумма/9)+' + '+ост, готово?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="полосы">${ПОЛОСЫ.map((п,к)=>BTN(3,'','+ '+п,"r394Кам5("+к+")",ц[к]>=9)).join('')}</div>` +
      `<div class="рычаги">${BTN(4,'','Вернуть 3 752',"r394Вернуть5()")}${BTN(4,'','Убрать камешек',"r394Минус5()")}</div>` +
      (готово
        ? РАЗБОР(true,'Камешков стало '+сумма+' — это '+(сумма/9)+' девят'+(сумма/9===1?'ка':'ки')+'. И заметь: <b>подходит любой желоб</b> — 3 753, 3 762, 3 852, 4 752 все делятся на 9. Каждый камешок добавляет к остатку ровно 1, где бы он ни лежал.')
        : СКАЗ('Золотые и синие','Золотые камешки собираются в целые девятки, синие — остаток. Сейчас синих '+ост+'.')) +
      ПРАВИЛО('На <b>9 и на 3</b> решает <b>сумма цифр</b>: это число камешков на доске.');
  }

  /* 6. Цифра-невидимка: 5□4 делится на 9 */
  function F6(s){
    const Н=240, пробы=s.пробы6||[], найдено=пробы.filter(ц=>ц===0||ц===9);
    const последняя = пробы.length ? пробы[пробы.length-1] : null;
    const ц = последняя==null ? '□' : String(последняя);
    const сумма = последняя==null ? null : 9+последняя;
    const оба = найдено.length===2;
    return ЛИСТ(s) +
      ЗАДАЧА('На амфоре стёрлась цифра: «5□4». Известно, что груз разложили по 9 без остатка. <b>Какая цифра стёрлась?</b> Пробуй цифры — и найди <b>все</b>, какие подходят.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        <g filter="url(#c394-тень)">
          <path d="M60 40 q-12 0 -12 12 v108 q0 12 12 12 h216 q12 0 12 -12 v-108 q0 -12 -12 -12 z" fill="url(#c394-пергамент)"/>
          <path d="M48 52 q-8 0 -8 -8 q0 -8 8 -8 h12 v8 z M288 160 q8 0 8 8 q0 8 -8 8 h-12 v-8 z" fill="#c9ad76"/>
        </g>
        ${т(128,122,'5',56,'#3a2610',true)}
        <g>${последняя==null?анК('opacity','1;1;0.45;1','2s','0;0.4;0.7;1'):''}
          ${т(168,122,ц,56,последняя==null?'#b08a4a':(последняя===0||последняя===9?'#2d7a4f':'#b0402c'),true)}</g>
        ${т(208,122,'4',56,'#3a2610',true)}
        <line x1="148" y1="132" x2="188" y2="132" stroke="#b08a4a" stroke-width="2" stroke-dasharray="4 4"/>
        ${т(168,154, сумма==null?'5 + □ + 4 = ?':'5 + '+последняя+' + 4 = '+сумма, 16,'#5a4020',true)}
        ${подпись(168,Н-16, оба?'504 и 594 — обе делятся на 9':(сумма==null?'сумма цифр должна делиться на 9':(сумма%9===0?'подходит! а есть ещё?':сумма+' — на 9 не делится')), оба?GREEN:(сумма!=null&&сумма%9===0?GREEN:ИНК),12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="цифры">${Array.from({length:10},(_,д)=>{
        const было=пробы.includes(д); const ок=д===0||д===9;
        return BTN(3+Math.floor(д/5),было?(ок?'да':'нет'):'',String(д),"r394Цифра6("+д+")");
      }).join('')}</div>` +
      (оба
        ? РАЗБОР(true,'Стёрлась <b>0 или 9</b>: 5 + 0 + 4 = 9 и 5 + 9 + 4 = 18. Оба числа делятся на 9: 504 = 9 · 56, 594 = 9 · 66. В олимпиадной задаче нужны <b>все</b> ответы.')
        : последняя==null ? СКАЗ('Как искать','Сумма известных цифр 5 + 4 = 9. Какую цифру можно добавить, чтобы сумма снова делилась на 9?')
        : найдено.length===1 && (последняя===0||последняя===9)
          ? A(9,'карт','<span class="метка">Почти</span><div class="текст">Одна подходит. Но цифр десять — <b>проверь, нет ли второй</b>.</div>')
          : РАЗБОР(false,'С цифрой '+последняя+' сумма 5 + '+последняя+' + 4 = '+сумма+', а '+сумма+' на 9 не делится. Ищи такую, чтобы сумма была 9 или 18.')) +
      (оба ? ПРАВИЛО('Цифра-невидимка ищется по сумме цифр — и ответов может быть <b>несколько</b>.') : '');
  }

  /* 7. Перестановка цифр не меняет остаток */
  function F7(s){
    const Н=236, в=s.ответ7;
    const ЦИФРЫ=[1,2,3,4,5,6], ш=44, x0=36;
    /* плитки меняются местами парами: 1↔6, 2↔5, 3↔4 — и обратно */
    const плитки = ЦИФРЫ.map((д,i)=>{
      const пара = 5-i, дx = (пара-i)*ш;
      return `<g>${анСдвиг('0 0;0 0;'+дx+' 0;'+дx+' 0;0 0','6s','0;0.2;0.45;0.75;1')}
        <g filter="url(#c394-тень)">
          <rect x="${x0+i*ш+2}" y="70" width="${ш-4}" height="54" rx="9" fill="url(#c394-пергамент)" stroke="#a7834b" stroke-width="1.2"/>
          ${т(x0+i*ш+ш/2,108,String(д),28,'#3a2610',true)}</g></g>`;
    }).join('');
    const разборы = ['От порядка ничего не зависит: сумма цифр всегда 1 + 2 + 3 + 4 + 5 + 6 = 21.',
      'Цифры переставляй как хочешь — камешков на доске столько же: <b>21</b>. 21 делится на 3, значит, <b>любое</b> такое число делится на 3. А на 9 — никогда: 21 = 18 + 3.',
      'Сумма цифр 21 делится на 3 — значит, делится и число, в любом порядке.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Из цифр 1, 2, 3, 4, 5, 6 — каждая по разу — составили шестизначный номер склада. Цифры можно переставлять как угодно. Делится ли номер на 3?') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        ${т(168,40,'переставляем цифры',14,МУТ)}
        ${плитки}
        ${т(168,164,'1 + 2 + 3 + 4 + 5 + 6 = 21',16,GOLD,true)}
        ${подпись(168,Н-16, в===1?'21 = 3 · 7 — на 3 делится всегда':'сумма от порядка не зависит', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask">
        ${BTN(4, в===0?'miss':'', 'Зависит от того, как переставить цифры', "r394Отв7(0)")}
        ${BTN(5, в===1?'hit':'', 'Делится всегда: сумма цифр 21', "r394Отв7(1)")}
        ${BTN(6, в===2?'miss':'', 'Не делится никогда', "r394Отв7(2)")}
      </div>` +
      (в==null ? СКАЗ('Вопрос','Делится ли номер на 3?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Перестановка цифр <b>не меняет остаток</b> от деления на 3 и на 9.') : '');
  }

  /* 8. Числа aaa */
  function F8(s){
    const Н=260, a=s.а8||7, в=s.ответ8;
    const n=a*111;
    const кучки = [0,1,2].map(к=>Array.from({length:a},(_,н)=>`<circle cx="${64+к*104+(н%3)*16}" cy="${156+Math.floor(н/3)*16}" r="7"
        fill="url(#c394-камень-золото)" stroke="#8f5c12" stroke-width=".6">${анК('opacity','0.45;0.45;1;1','5s','0;'+кт(0.06+к*0.2+н*0.012)+';'+кт(0.1+к*0.2+н*0.012)+';1')}</circle>`).join('')).join('');
    const разборы = ['Последняя цифра решает для 2, 5 и 10, а не для 3. Для 3 — сумма цифр.',
      'Цифры одинаковые: <b>a + a + a = 3 · a</b> — сумма всегда делится на 3, значит, и число. А ещё aaa = a · 111 = a · 3 · 37 — оно делится и на 37: '+тыс(n)+' = '+(3*a)+' · 37.',
      'Проверь: 5 + 5 + 5 = 15, и 555 = 3 · 185 — делится. Для любой цифры a сумма a + a + a = 3a.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Третье дело — олимпиадное. На складах номера из трёх <b>одинаковых</b> цифр: 111, 222, … 999. Выбери цифру a и посмотри: всегда ли номер aaa делится на 3?') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        <g filter="url(#c394-тень)">
          <rect x="58" y="34" width="220" height="70" rx="14" fill="url(#c394-пергамент)" stroke="#a7834b" stroke-width="1.2"/>
        </g>
        ${т(168,82,String(n),40,'#3a2610',true)}
        ${кучки}
        ${[0,1,2].map(к=>т(80+к*104,134,String(a),16,GOLD,true)).join('')}
        ${т(128,134,'+',16,МУТ)}${т(232,134,'+',16,МУТ)}
        ${подпись(168,Н-14, a+' + '+a+' + '+a+' = '+(3*a)+' = 3 · '+a, GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="цифры">${Array.from({length:9},(_,к)=>BTN(3,a===к+1?'вкл':'',String(к+1),"r394А8("+(к+1)+")")).join('')}${BTN(3,'','?',"r394А8(0)")}</div>` +
      `<div class="ask">
        ${BTN(5, в===0?'miss':'', 'Потому что последняя цифра — a', "r394Отв8(0)")}
        ${BTN(6, в===1?'hit':'', 'Сумма цифр a + a + a = 3a', "r394Отв8(1)")}
        ${BTN(7, в===2?'miss':'', 'Не всегда: 555 не делится', "r394Отв8(2)")}
      </div>` +
      (в==null ? СКАЗ('Вопрос','Почему aaa всегда делится на 3?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Чтобы доказать «всегда», ищут причину в <b>записи числа</b>, а не перебирают примеры.') : '');
  }

  /* 9. НОК: два маяка */
  function F9(s){
    const Н=300, в=s.ответ9;
    /* 1 секунда рассказа = 0,2 с анимации: вспышки раз в 1,2 и 1,6 с, вместе — раз в 4,8 с */
    const шкала = (() => {
      const x0=24, x1=312, y=246, к=(x1-x0)/48;
      let r=`<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${МУТ}" stroke-width="1.6"/>`;
      for(let t=0;t<=48;t+=6) r+=`<circle cx="${x0+t*к}" cy="${y-9}" r="4" fill="${ЯНТАРЬ}"/>`;
      for(let t=0;t<=48;t+=8) r+=`<circle cx="${x0+t*к}" cy="${y+9}" r="4" fill="${НЕБО}"/>`;
      [0,24,48].forEach(t=>{ r+=`<circle cx="${x0+t*к}" cy="${y}" r="11" fill="none" stroke="${GOLD}" stroke-width="2">
          ${анЛин('r','9;13;9','1.6s')}</circle>`+т(x0+t*к,y+30,String(t),12,t===24?GOLD:МУТ,t===24); });
      return r;
    })();
    const разборы = ['48 = 6 · 8 — тут маяки тоже вспыхнут вместе, но <b>не в первый раз</b>. Раньше, на 24-й секунде, они уже совпали.',
      'Кратные 8: 8, 16, <b>24</b> — и 24 делится на 6. Это <b>наименьшее общее кратное</b>: НОК(6, 8) = 24.',
      '6 + 8 = 14, но 14 не делится ни на 6, ни на 8 — вспышек в эту секунду нет вовсе.'];
    return ЛИСТ(s) +
      ЗАДАЧА('У входа в гавань два маяка. Левый вспыхивает каждые <b>6 секунд</b>, правый — каждые <b>8</b>. Сейчас вспыхнули вместе. Через сколько секунд вспыхнут вместе снова?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c394-ночь)"/>
        ${[[60,24],[150,40],[210,18],[290,34],[110,62]].map((з,i)=>`<circle cx="${з[0]}" cy="${з[1]}" r="1.1" fill="#fff" opacity=".6">${анЛин('opacity','0.6;0.2;0.6',(2.2+i*0.4).toFixed(1)+'s')}</circle>`).join('')}
        ${море(150,210)}
        ${маяк(46,86,'1.2s',ЯНТАРЬ,false)}
        ${маяк(290,86,'1.6s',НЕБО,true)}
        ${т(46,178,'каждые 6 с',12,ЯНТАРЬ,true,undefined,'#0c1024')}
        ${т(290,178,'каждые 8 с',12,НЕБО,true,undefined,'#0c1024')}
        <rect x="0" y="210" width="336" height="${Н-210}" fill="#0c1024"/>
        ${шкала}
        ${т(168,226,'секунды',12,МУТ)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask три">${['48','24','14'].map((v,к)=>BTN(4+к, в===к?(к===1?'hit':'miss'):'', v, "r394Отв9("+к+")")).join('')}</div>` +
      (в==null ? СКАЗ('Вопрос','Через сколько секунд маяки вспыхнут вместе?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>НОК</b> — наименьшее число, которое делится на оба. Ищут перебором кратных <b>большего</b> числа.') : '');
  }

  /* 10. Итог: свиток признаков */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=300;
    const строка = (y,на,смотрим,почему,н) => `<g>${проявить('9s',0.06+н*0.14,0.14+н*0.14)}
      ${т(76,y+2,на,16,'#3a2610',true)}
      ${т(124,y-6,смотрим,14,'#3a2610',true,'start')}
      ${т(124,y+12,почему,12,'#6a4b22',false,'start')}
      <line x1="40" y1="${y+22}" x2="296" y2="${y+22}" stroke="#b89a64" stroke-width=".8"/></g>`;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Портовая книга закрыта: груз по 9 выровнен одним камешком, невидимые цифры найдены обе, про номера aaa всё доказано. Архимед бы одобрил.'
        : 'В портовой книге ещё не всё — вернись и доделай. А вот свиток, который грузчики держат под рукой.') +
      `<div class="pic">${свг(`
        ${ночь(Н)}
        <g filter="url(#c394-тень)">
          <rect x="28" y="30" width="280" height="${Н-60}" rx="6" fill="url(#c394-пергамент)"/>
          <rect x="20" y="22" width="296" height="16" rx="8" fill="url(#c394-дерево)"/>
          <rect x="20" y="${Н-38}" width="296" height="16" rx="8" fill="url(#c394-дерево)"/>
        </g>
        ${строка(70,'2, 5, 10','последняя цифра','10 делится на 2, 5 и 10',0)}
        ${строка(118,'4, 25','две последние','100 = 4 · 25',1)}
        ${строка(166,'3, 9','сумма цифр','10 = 9 + 1: от камешка — 1',2)}
        ${строка(214,'НОК','кратные большего','6 и 8 → 24',3)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Все признаки — из <b>десятичной записи</b>: десятки делятся на 2, 5 и 10; сотни — на 4 и 25; а каждый разряд даёт остаток 1 от 9 и от 3. Поэтому невидимую цифру находят по сумме, а перестановка цифр ничего не меняет.') +
      ПРАВИЛО('<b>Смотри на запись, а не дели.</b> Ищешь цифру — проверь все, их бывает несколько.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Делится ли 7 350 на 25?',
      варианты:[{т:'Нет: последняя цифра 0',ок:false},{т:'Да: 50 делится на 25',ок:true}],
      разбор:'На 25 решают две последние цифры: 50 = 25 · 2. Значит, 7 350 делится на 25.' },
    { вопрос:'Какую цифру поставить вместо □ в 12□, чтобы число делилось и на 2, и на 5?',
      варианты:[{т:'5',ок:false},{т:'0',ок:true}],
      разбор:'На 5 — последняя 0 или 5, на 2 — чётная. Обоим подходит только 0: 120.' },
    { вопрос:'Какой остаток даёт 1 000 001 при делении на 9?',
      варианты:[{т:'2',ок:true},{т:'1',ок:false}],
      разбор:'Камешков на доске два: 1 + 0 + … + 0 + 1 = 2. Остаток 2.' },
    { вопрос:'Чему равно НОК(4, 10)?',
      варианты:[{т:'40',ок:false},{т:'20',ок:true}],
      разбор:'Кратные 10: 10, 20 — и 20 делится на 4. 40 = 4 · 10 тоже общее, но не наименьшее.' },
    { вопрос:'Из цифр 2, 4, 6, 8 (по разу) составили число. Можно ли так, чтобы оно делилось на 9?',
      варианты:[{т:'Нет: сумма 20 при любом порядке',ок:true},{т:'Да, если правильно переставить',ок:false}],
      разбор:'Сумма 2 + 4 + 6 + 8 = 20 не зависит от порядка, а 20 на 9 не делится.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r394Reset()")}</div>` +
        ПРАВИЛО('<b>Смотри на запись, а не дели.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r394Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Последние цифры', задания:[
    {q:'Делится ли 5 318 на 2?', в:1, варианты:['нет','да'], раз:'Последняя цифра 8 — чётная.'},
    {q:'Делится ли 5 318 на 4?', в:1, варианты:['да','нет'], раз:'Две последние: 18 = 4 · 4 + 2. Не делится, хотя 8 чётная.'},
    {q:'Делится ли 9 075 на 25?', в:0, варианты:['да','нет'], раз:'Две последние: 75 = 25 · 3.'},
    {q:'Делится ли 3 140 на 10?', в:1, варианты:['нет','да'], раз:'Кончается на 0.'}
  ]};
  const Т2 = { имя:'Сумма цифр', задания:[
    {q:'Делится ли 4 518 на 9?', в:0, варианты:['да','нет'], раз:'4 + 5 + 1 + 8 = 18 — делится на 9.'},
    {q:'Какой остаток даёт 2 024 при делении на 3?', в:0, варианты:['2','1'], раз:'2 + 0 + 2 + 4 = 8 = 3 · 2 + 2. Остаток 2.'},
    {q:'Наименьшая цифра □ в 7□2, чтобы делилось на 3?', в:1, варианты:['3','0'], раз:'7 + 2 = 9 уже делится на 3, значит, подходит и 0: 702.'},
    {q:'Делится ли 123 456 789 на 9?', в:1, варианты:['нет','да'], раз:'1 + 2 + … + 9 = 45 = 9 · 5.'}
  ]};
  const Т3 = { имя:'НОК и олимпиада', задания:[
    {q:'Чему равно НОК(4, 6)?', в:1, варианты:['24','12'], раз:'Кратные 6: 6, 12 — и 12 делится на 4.'},
    {q:'Чему равно НОК(5, 7)?', в:0, варианты:['35','12'], раз:'Общих делителей, кроме 1, нет — НОК = 5 · 7 = 35.'},
    {q:'Делится ли 888 на 37?', в:0, варианты:['да','нет'], раз:'888 = 8 · 111 = 8 · 3 · 37 = 24 · 37.'},
    {q:'В числе 5 841 переставили цифры. Остаток от деления на 9…', в:1, варианты:['изменился','тот же'], раз:'Сумма цифр та же — 18, остаток тот же: 0.'}
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
        в, "r394T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r394TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L394 = {
    id: ID,
    title: 'Делимость и десятичная запись',
    ico: '🔗',
    src: 'Математика · 5–6 класс · Олимп-6: теория чисел',
    subj: 'math',
    explain: [
      'Гавань Сиракуз, грузы тысячами. Разложится ли груз поровну, часто видно по записи числа, без деления. Архимед в «Исчислении песчинок» научился записывать огромные числа — начнём с того, как устроена запись.',
      'Счётная доска: четыре желоба — тысячи, сотни, десятки, единицы. Цифра числа — это сколько камешков в своём желобе. Десять камешков в желобе не бывает: десять единиц — один камешек в соседнем желобе.',
      'Раскладываем по 5. Всё, что увязано в мешки по 10, разложится само: 10 делится на 2, на 5 и на 10. Решает россыпь — последняя цифра. У 4 736 россыпь 6, и по 5 останется одна амфора.',
      'Раскладываем по 4. Мешок в 10 на 4 не делится, зато сотня делится: 100 = 4 · 25. Значит, решают две последние цифры: 3 716 делится на 4, потому что 16 делится, а 3 726 — нет.',
      'Раскладываем по 9. 10 = 9 + 1, 100 = 99 + 1 — от каждого камешка после раздачи по 9 остаётся один. Остаток от 9 — это остаток от числа камешков, то есть от суммы цифр. Добавь один камешек в любой желоб — и 3 752 станет кратным 9.',
      'Цифра-невидимка: 5□4 делится на 9. Сумма 5 + □ + 4 должна делиться на 9 — подходят 0 и 9. Ответов два: 504 и 594.',
      'Из цифр 1, 2, 3, 4, 5, 6 как ни составляй число, сумма цифр 21 — и оно всегда делится на 3. Перестановка цифр не меняет остаток от 3 и 9.',
      'Числа из трёх одинаковых цифр aaa всегда делятся на 3: сумма a + a + a = 3a. А ещё aaa = a · 111 = a · 3 · 37.',
      'Два маяка: вспышки каждые 6 и каждые 8 секунд. Вместе они вспыхнут через 24 секунды — это наименьшее общее кратное, НОК(6, 8) = 24.',
      'Итог: все признаки выросли из десятичной записи. Последняя цифра — для 2, 5, 10; две последние — для 4 и 25; сумма цифр — для 3 и 9.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: последние цифры.',
      'Тренажёр 2: сумма цифр.',
      'Тренажёр 3: НОК и олимпиадные задачи.'
    ],
    check: {
      q: 'Чему равно НОК(6, 8)?',
      choices: ['48','24','14','2'],
      ans: 1,
      exp: 'Кратные 8: 8, 16, 24 — и 24 делится на 6. 48 тоже общее кратное, но не наименьшее.'
    },
    tasks: [
      { q:'Какое наименьшее двузначное число кратно 7?', kind:'unit', ans:14, tol:0,
        hints:['7 · 1 = 7 — однозначное.','7 · 2 = 14.'], sol:'14' },
      { q:'Число делится на 4, если…', kind:'choice',
        choices:['делятся на 4 две его последние цифры','последняя цифра чётная','сумма цифр делится на 4'], ans:0,
        hints:['100 делится на 4.','Значит, решают две последние цифры.'], sol:'две последние цифры делятся на 4' },
      { q:'Какая цифра стёрлась в 5□4, если число делится на 9? Назови наименьшую.', kind:'unit', ans:0, tol:0,
        hints:['5 + □ + 4 должно делиться на 9.','5 + 4 = 9 уже делится — подходит 0 (и ещё 9).'], sol:'0 (подходит и 9)' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L394.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
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
      1:'Гавань Сиракуз', 2:'Счётная доска', 3:'По 2, 5 и 10', 4:'По 4 и 25',
      5:'По 9 и 3', 6:'Цифра-невидимка', 7:'Переставь цифры', 8:'Числа aaa',
      9:'Два маяка', 10:'Свиток признаков', 11:'Практика',
      12:'Тренажёр 1', 13:'Тренажёр 2', 14:'Тренажёр 3'
    };
    el.innerHTML = `<div class="s6 l394" data-frame="${f}">
        <h2>${ЗАГОЛОВКИ[f]||'Делимость и десятичная запись'}</h2>
        ${сцена}
      </div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r394Кам2=(к,д)=>{ const s=S(); const ц=цифрыИз(s,'доска2');
    ц[к]=Math.max(0,Math.min(9,ц[к]+д)); s.свежий2 = д>0?[к]:null; chRender(0); };
  window.r394Часть3=(ч)=>{ const s=S(); s.часть3=ч; if(ч!=='россыпь') s.ответ3=null; chRender(0); };
  window.r394Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r394Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r394Кам5=(к)=>{ const s=S(); const ц=цифрыИз(s,'доска5'); if(ц[к]>=9) return;
    ц[к]++; s.свежий5=[к]; s.история5=(s.история5||[]).concat([к]);
    const сумма=ц.reduce((a,b)=>a+b,0); if(сумма%9===0) s.дело_камешек=true; chRender(0); };
  window.r394Минус5=()=>{ const s=S(); const ц=цифрыИз(s,'доска5'); const ист=s.история5||[];
    if(!ист.length) return; const к=ист.pop(); if(ц[к]>0) ц[к]--; s.свежий5=null; chRender(0); };
  window.r394Вернуть5=()=>{ const s=S(); s.доска5=[3,7,5,2]; s.история5=[]; s.свежий5=null; chRender(0); };
  window.r394Цифра6=(д)=>{ const s=S(); const п=(s.пробы6||[]).filter(x=>x!==д); п.push(д); s.пробы6=п;
    if(п.includes(0)&&п.includes(9)) s.дело_невидимка=true; chRender(0); };
  window.r394Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r394А8=(a)=>{ const s=S(); s.а8 = a || (1+Math.floor(Math.random()*9)); chRender(0); };
  window.r394Отв8=(к)=>{ const s=S(); s.ответ8=к; if(к===1) s.дело_ааа=true; chRender(0); };
  window.r394Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r394Pick=(уровень,вариант)=>{
    const s=S();
    s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1;
    chRender(0);
  };
  window.r394Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r394T=(ключ,вариант)=>{
    const s=S();
    if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const шаг=(s[ключ+'Шаг']||0)%набор.задания.length;
    const з=набор.задания[шаг];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0);
  };
  window.r394TNext=(ключ)=>{
    const s=S();
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length;
    s[ключ+'Ответ']=null;
    chRender(0);
  };

  /* прежние уроки 394 (vis_wk.js, vis_bw.js) регистрируются раньше — этот
     файл подключён после них и перерегистрируется ещё раз на load */
  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){
        const место=arr.findIndex(L=>L && L.id===ID);
        if(место>=0) arr[место]=L394; else arr.push(L394);
      }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA394={render:render, L:L394};
})();
