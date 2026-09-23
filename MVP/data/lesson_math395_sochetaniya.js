/* ====== МАТЕМАТИКА · УРОК 395 · «СОЧЕТАНИЯ: НАЧАЛО» ===============================
   5–6 класс, олимпиадная комбинаторика. Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md), рисунки — сцена из сюжета. Прежние версии
   (vis_wk.js visW395 — 15 кадров текста про фрукты на лавочке, vis_bw.js)
   остаются в общих файлах; этот файл регистрируется поверх.

   ОТЛИЧИЕ ОТ 390 «Правило произведения». Там — выборы по шагам, где порядок
   важен, и один кадр про пары. Здесь — сама тема «порядок не важен»: пары,
   турнир каждый с каждым, тройки, дополнение (выбрать 3 из 5 = оставить 2),
   треугольники из точек, диагонали многоугольника.

   СЮЖЕТ. Сиракузы едут на Олимпийские игры. Борцы — настоящие олимпийцы
   древности: Милон из Кротона, Феаген с Фасоса, Леонтиск из Мессены — и наш
   Дион из Сиракуз. Ход квеста — три дела перед играми: составить все пары
   для тренировки, сосчитать схватки турнира, отобрать команду бегунов.

   РУКАМИ: тап по двум борцам — пара заносится в список (пара, которая уже
   есть, названа: «Милон — Дион это та же пара, что Дион — Милон»); тап по
   трём бегунам — команда (повтор назван так же).

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     пары из 4: 4 · 3 : 2 = 6; турнир 6 борцов: 6 · 5 : 2 = 15 (ловушки 30 и 36);
     венки 5 атлетов каждый каждому: 5 · 4 = 20 (порядок важен), рукопожатия 10;
     команды из 3 из 5: 5 · 4 · 3 : (3 · 2 · 1) = 60 : 6 = 10 (ловушка 60);
     3 из 5 = 2 из 5 = 10; 4 из 6 = 2 из 6 = 15;
     треугольники из 6 точек на окружности: 6 · 5 · 4 : 6 = 20 (ловушка 120);
     диагонали шестиугольника: 6 · 3 : 2 = 9 (ловушки 15 = все пары, 18).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>. Без
   движения — конечное состояние. */
(function(){
  'use strict';

  const ID = 395;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ОЛИВА='#9cc27a', НЕБО='#8fd0f0';
  const ИНК='#f5efe2', МУТ='#c9c1b0', ЛИНИЯ='#6a6048', ОБВОД='#1a140a';
  const БОРЦЫ = [{имя:'Дион',город:'Сиракузы',ц:'#e08a5f'},{имя:'Милон',город:'Кротон',ц:'#6aa0e0'},
                 {имя:'Феаген',город:'Фасос',ц:'#8fc07a'},{имя:'Леонтиск',город:'Мессена',ц:'#c08ad8'}];
  const БЕГУНЫ = ['Дион','Никий','Ламах','Феон','Гелон'];

  const ДЕЛА = [
    {ключ:'пары',    имя:'Составить все пары для тренировки', итог:'6 пар'},
    {ключ:'турнир',  имя:'Сосчитать схватки турнира',          итог:'15'},
    {ключ:'команда', имя:'Отобрать команду бегунов',           итог:'10 способов'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l395{gap:14px}
  #lvis .s6.l395 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l395 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l395 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#2c2a22,#1b1912);border:1.5px solid var(--line)}
  #lvis .s6.l395 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l395 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l395 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l395 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l395 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l395 .карт .текст b{color:${GOLD}}
  #lvis .s6.l395 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l395 .правило b{color:${GOLD}}
  #lvis .s6.l395 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(156,194,122,.16),rgba(156,194,122,.04));
    border:1.5px solid rgba(156,194,122,.55);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l395 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l395 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ОЛИВА}}
  #lvis .s6.l395 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l395 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l395 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l395 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l395 .лист li.есть{color:${ИНК}}
  #lvis .s6.l395 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l395 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l395 .лист li.есть span{color:${GREEN}}
  #lvis .s6.l395 .найдено{display:flex;flex-wrap:wrap;gap:6px;width:100%}
  #lvis .s6.l395 .найдено span{padding:6px 10px;border-radius:10px;font-size:14px;border:1.5px solid ${GREEN};color:${GREEN};
    background:rgba(143,224,176,.1)}
  #lvis .s6.l395 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l395 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l395 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l395 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l395 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l395 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l395 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:20px}
  #lvis .s6.l395 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l395 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l395 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l395 .уровни .точка.сейчас{background:${GOLD};animation:l395dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l395dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l395 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l395{-webkit-text-size-adjust:100%}
  #lvis .s6.l395 [data-anim]{animation:l395rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l395rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l395 [data-anim]{animation:none!important}
    #lvis .s6.l395 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l395 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l395-style');
      if(!s){ s=document.createElement('style'); s.id='l395-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Олимпия</span><div class="текст">'+текст+'</div>');
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
      `<div class="шапка"><span>Сборы на Олимпию</span><b class="${всё?'готово':''}">${
        всё?'команда готова':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  const очередь = (н,всего,длит) => анК('opacity','0.12;0.12;0.95;0.95',длит,'0;'+кт(0.04+н*0.8/всего)+';'+кт(0.08+н*0.8/всего)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c395-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4f8fd0"/><stop offset="0.6" stop-color="#9fcaec"/><stop offset="1" stop-color="#f3e2b8"/>
      </linearGradient>
      <radialGradient id="c395-солнце" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#fffbe0"/><stop offset="0.4" stop-color="#ffe89a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe89a" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c395-холм" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fae6a"/><stop offset="1" stop-color="#5a7a3e"/>
      </linearGradient>
      <linearGradient id="c395-песок" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e3c48a"/><stop offset="1" stop-color="#b98f52"/>
      </linearGradient>
      <linearGradient id="c395-мрамор" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#b8ad9a"/><stop offset="0.45" stop-color="#f6f0e2"/><stop offset="1" stop-color="#a99d88"/>
      </linearGradient>
      <linearGradient id="c395-кожа" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e9b98a"/><stop offset="1" stop-color="#b07a4a"/>
      </linearGradient>
      <linearGradient id="c395-лавр" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#bde08a"/><stop offset="1" stop-color="#4f7a2e"/>
      </linearGradient>
      <linearGradient id="c395-золото" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff0b0"/><stop offset="0.5" stop-color="#e8b84a"/><stop offset="1" stop-color="#8a5f1c"/>
      </linearGradient>
      <linearGradient id="c395-вечер" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a2c4a"/><stop offset="1" stop-color="#4a3a3a"/>
      </linearGradient>
      <filter id="c395-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".45"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c395-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(26,20,10,.88)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  const олива = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})">
    <path d="M-2 0 q-2 -16 2 -26 q3 10 2 26 z" fill="#6a4a2a"/>
    <ellipse cx="-8" cy="-30" rx="13" ry="9" fill="#7a9a5a"/><ellipse cx="8" cy="-34" rx="12" ry="9" fill="#6a8a4a"/>
    <ellipse cx="0" cy="-42" rx="11" ry="8" fill="#8aaa6a"/></g>`;
  const пейзаж = (в,горизонт,безХрама) => `<rect x="0" y="0" width="336" height="${в}" fill="url(#c395-небо)"/>
    <circle cx="284" cy="44" r="40" fill="url(#c395-солнце)">${анЛин('r','38;44;38','6s')}</circle>
    <path d="M0 ${горизонт} q60 -30 120 -8 q60 -34 120 -6 q50 -22 96 -2 V${в} H0 z" fill="url(#c395-холм)" opacity=".85"/>
    ${олива(26,горизонт+4,0.9)}${олива(312,горизонт+6,0.8)}
    ${безХрама?'':`<g filter="url(#c395-тень)">
      <path d="M96 ${горизонт-6} L168 ${горизонт-34} L240 ${горизонт-6} Z" fill="url(#c395-мрамор)"/>
      <rect x="100" y="${горизонт-6}" width="136" height="5" fill="url(#c395-мрамор)"/>
      ${[0,1,2,3,4,5].map(i=>`<rect x="${106+i*24}" y="${горизонт-1}" width="8" height="24" fill="url(#c395-мрамор)"/>`).join('')}
      <rect x="98" y="${горизонт+23}" width="140" height="5" fill="url(#c395-мрамор)"/>
    </g>`}`;
  /* атлет в хитоне цвета своего города */
  const атлет = (x,y,цвет,м,выбран) => `<g transform="translate(${x} ${y}) scale(${м||1})" filter="url(#c395-тень)">
    ${выбран?`<circle cx="0" cy="-8" r="26" fill="none" stroke="${GOLD}" stroke-width="2.4">${анЛин('r','24;29;24','1.3s')}</circle>`:''}
    <path d="M-10 22 l-3 14 M10 22 l3 14" stroke="url(#c395-кожа)" stroke-width="5" stroke-linecap="round"/>
    <path d="M-12 -6 q12 -8 24 0 l2 28 h-28 z" fill="${цвет}" stroke="${ОБВОД}" stroke-width=".8"/>
    <path d="M-12 -4 l-8 16 M12 -4 l8 16" stroke="url(#c395-кожа)" stroke-width="5" stroke-linecap="round"/>
    <circle cx="0" cy="-16" r="9" fill="url(#c395-кожа)"/>
    <path d="M-9 -18 q9 -10 18 0" fill="#3a2410"/>
    <path d="M-10 -20 q10 -6 20 0" fill="none" stroke="url(#c395-лавр)" stroke-width="2.6" stroke-dasharray="3 2"/>
  </g>`;
  const венок = (x,y,р) => `<g transform="translate(${x} ${y})">
    ${Array.from({length:12},(_,i)=>{ const a=i/12*Math.PI*2; return `<ellipse cx="${(р*Math.cos(a)).toFixed(1)}" cy="${(р*Math.sin(a)).toFixed(1)}" rx="5" ry="2.4"
      transform="rotate(${(a*180/Math.PI+60).toFixed(0)} ${(р*Math.cos(a)).toFixed(1)} ${(р*Math.sin(a)).toFixed(1)})" fill="url(#c395-лавр)"/>`; }).join('')}</g>`;

  /* круг людей и хорды между ними */
  const место = (i,n,cx,cy,R) => [cx+R*Math.cos(-Math.PI/2+i*2*Math.PI/n), cy+R*Math.sin(-Math.PI/2+i*2*Math.PI/n)];
  const хорды = (n,cx,cy,R,фильтр,длит,цвет) => { const r=[]; let н=0; const всего=n*(n-1)/2;
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++){ if(фильтр && !фильтр(i,j)) continue; const a=место(i,n,cx,cy,R), b=место(j,n,cx,cy,R);
      r.push(`<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${цвет||GOLD}" stroke-width="2" stroke-linecap="round" opacity=".95">${очередь(н++,всего,длит||'8s')}</line>`); }
    return r.join(''); };

  /* ================= КАДРЫ ================= */

  /* 1. На Олимпию */
  function F1(s){
    const Н=284;
    return ЛИСТ(s) +
      ЗАДАЧА('Лето, Олимпия. Сюда съехались лучшие атлеты Эллады: великий <b>Милон из Кротона</b>, непобедимый <b>Феаген с Фасоса</b>, <b>Леонтиск из Мессены</b> — и наш <b>Дион из Сиракуз</b>. Тренер Диона поручает тебе расписать тренировки и схватки. Ошибёшься в счёте — кто-то останется без пары, а кто-то сойдётся дважды.') +
      `<div class="pic">${свг(`
        ${пейзаж(Н,150)}
        <rect x="0" y="206" width="336" height="${Н-206}" fill="url(#c395-песок)"/>
        ${[0,1,2].map(i=>`<line x1="0" y1="${222+i*18}" x2="336" y2="${222+i*18}" stroke="#f6ead0" stroke-width="1.4" opacity=".7"/>`).join('')}
        ${БОРЦЫ.map((б,i)=>`<g>${анСдвиг('0 0;0 -3;0 0',(1.6+i*0.3).toFixed(1)+'s','0;0.5;1')}${атлет(60+i*72,206,б.ц,1)}</g>`).join('')}
        ${БОРЦЫ.map((б,i)=>т(60+i*72,262,б.имя,12,ИНК,true,undefined,'#4a3418')).join('')}
        ${венок(168,40,16)}
        ${подпись(168,28,'Олимпийские игры',GOLD,16)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Главное слово урока','<b>Сочетание</b> — это выбор группы, где <b>порядок не важен</b>: пара «Дион и Милон» и пара «Милон и Дион» — одна и та же пара.') +
      ПРАВИЛО('Порядок не важен — считаем <b>группы</b>, а не очереди.');
  }

  /* 2. Все пары для тренировки */
  const ключПары = (i,j) => Math.min(i,j)+'-'+Math.max(i,j);
  function F2(s){
    const Н=260, выбор=s.выбор2, пары=s.пары2||[], мимо=s.мимо2;
    const cx=[64,136,208,280];
    const линии = пары.map(k=>{ const [i,j]=k.split('-').map(Number);
      return `<path d="M${cx[i]} 126 Q${(cx[i]+cx[j])/2} ${126+Math.abs(j-i)*22} ${cx[j]} 126" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round"/>`; }).join('');
    const все = пары.length===6;
    return ЛИСТ(s) +
      ЗАДАЧА('Первое дело: каждый борец должен потренироваться с каждым. <b>Тапни двух борцов</b> — пара запишется. Найди все пары и не запиши одну дважды.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c395-песок)"/>
        ${[0,1,2,3].map(i=>`<line x1="0" y1="${30+i*60}" x2="336" y2="${30+i*60}" stroke="#f6ead0" stroke-width="1" opacity=".4"/>`).join('')}
        <g pointer-events="none">${линии}
          ${БОРЦЫ.map((б,i)=>атлет(cx[i],86,б.ц,1,выбор===i)).join('')}
          ${БОРЦЫ.map((б,i)=>т(cx[i],136+4,б.имя,12,'#3a2410',true,undefined,'#f3e2b8')).join('')}</g>
        ${БОРЦЫ.map((б,i)=>`<rect x="${cx[i]-34}" y="44" width="68" height="104" fill="rgba(255,255,255,.001)" style="cursor:pointer" onclick="r395Борец(${i})"/>`).join('')}
        ${подпись(168,Н-12, все?'все 6 пар найдены':'пар: '+пары.length, все?GREEN:GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (пары.length ? A(3,'найдено',пары.map(k=>{ const [i,j]=k.split('-').map(Number); return '<span>'+БОРЦЫ[i].имя+' — '+БОРЦЫ[j].имя+'</span>'; }).join('')) : '') +
      (мимо ? РАЗБОР(false,мимо) : '') +
      (все ? РАЗБОР(true,'Шесть пар — и ни одной лишней. Каждый встретился с тремя другими: 4 · 3 = 12 «встреч», но каждая пара посчитана с двух сторон — <b>12 : 2 = 6</b>.')
           : СКАЗ('Как искать','Чтобы не сбиться, иди по порядку: сначала все пары с Дионом, потом с Милоном (кроме Диона), потом с Феагеном.')) +
      (все ? ПРАВИЛО('Пар из n: <b>n · (n − 1) : 2</b>.') : '');
  }

  /* 3. Таблица: почему делим на 2 */
  function F3(s){
    const Н=304, в=s.ответ3;
    const x0=96, y0=64, к=50;
    let ячейки='';
    for(let i=0;i<4;i++) for(let j=0;j<4;j++){
      const x=x0+j*к, y=y0+i*к;
      if(i===j){ ячейки+=`<rect x="${x+2}" y="${y+2}" width="${к-4}" height="${к-4}" rx="6" fill="rgba(0,0,0,.2)"/>
        <line x1="${x+10}" y1="${y+10}" x2="${x+к-10}" y2="${y+к-10}" stroke="#8a6a3a" stroke-width="2"/>`; continue; }
      const верх=j>i;
      ячейки+=`<rect x="${x+2}" y="${y+2}" width="${к-4}" height="${к-4}" rx="6" fill="${верх?'url(#c395-золото)':'rgba(255,215,106,.25)'}" stroke="#8a5f1c" stroke-width=".8">
        ${верх?'':анК('opacity','1;1;0.35;0.35;1','5s','0;0.3;0.45;0.8;1')}</rect>
        ${т(x+к/2,y+к/2+5,БОРЦЫ[i].имя[0]+БОРЦЫ[j].имя[0],14,'#3a2410',true)}`;
    }
    const заг = БОРЦЫ.map((б,i)=>т(x0+i*к+к/2,y0-10,б.имя[0],14,GOLD,true)+т(x0-14,y0+i*к+к/2+5,б.имя[0],14,GOLD,true)).join('');
    const разборы = ['12 — это клетки таблицы, где важно, кто первый. Но «ДМ» и «МД» — одна пара: светлая половина повторяет золотую.',
      'Верно: 16 клеток минус 4 на диагонали (с самим собой не борются) — 12, и каждая пара встречается дважды, над и под диагональю. <b>12 : 2 = 6</b>.',
      '16 — все клетки, но на диагонали борец сам с собой, а пары ещё и повторены зеркально.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Тренер расчерчивает таблицу: строки — кто вызывает, столбцы — кого. В клетке — пара. Посмотри, что золотая половина и бледная — <b>одни и те же пары</b>.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c395-вечер)"/>
        <g filter="url(#c395-тень)"><rect x="${x0-30}" y="${y0-30}" width="${4*к+40}" height="${4*к+40}" rx="10" fill="#f3e2b8" opacity=".12"/></g>
        ${заг}${ячейки}
        ${подпись(168,Н-10,'4 · 3 = 12 клеток, каждая пара дважды',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['12','6','16'],1,в,'r395Отв3') +
      (в==null ? СКАЗ('Вопрос','Сколько разных пар в таблице?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Сначала считаем <b>с порядком</b> (4 · 3), потом <b>делим</b> на число повторов (2).') : '');
  }

  /* 4. Турнир каждый с каждым */
  function F4(s){
    const Н=290, в=s.ответ4;
    const n=6, cx=168, cy=146, R=96;
    const разборы = ['30 = 6 · 5 считает каждую схватку дважды: «Дион против Милона» и «Милон против Диона» — одна схватка.',
      'Верно: 6 · 5 = 30, и каждая схватка посчитана дважды — <b>30 : 2 = 15</b>. Ровно 15 линий на рисунке.',
      '36 = 6 · 6 считает и схватки «сам с собой», и каждую пару дважды.'];
    return ЛИСТ(s) +
      ЗАДАЧА('В турнир борцов приехали ещё двое, всего <b>шесть</b>. По олимпийскому обычаю этого года каждый схватится с каждым по разу. Сколько схваток на арене?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c395-песок)"/>
        <circle cx="${cx}" cy="${cy}" r="${R+22}" fill="#c9a36a" stroke="#8a6a3a" stroke-width="2"/>
        <circle cx="${cx}" cy="${cy}" r="${R+22}" fill="none" stroke="#f6ead0" stroke-width="1" stroke-dasharray="4 6" opacity=".6"/>
        ${хорды(n,cx,cy,R,null,'9s','#8a3a1a')}
        ${Array.from({length:n},(_,i)=>{ const [x,y]=место(i,n,cx,cy,R); return `<g filter="url(#c395-тень)"><circle cx="${x}" cy="${y}" r="15" fill="${i<4?БОРЦЫ[i].ц:(i===4?'#e0c060':'#70c0c0')}" stroke="${ОБВОД}" stroke-width="1"/>
          ${т(x,y+5,String(i+1),13,'#1a140a',true)}</g>`; }).join('')}
        ${подпись(168,Н-10, в===1?'6 · 5 : 2 = 15 схваток':'каждая линия — одна схватка', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['30','15','36'],1,в,'r395Отв4') +
      (в==null ? СКАЗ('Вопрос','Сколько схваток в турнире шести борцов «каждый с каждым»?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Турнир «каждый с каждым» из n — это <b>n · (n − 1) : 2</b> встреч.') : '');
  }

  /* 5. Венки и рукопожатия: когда порядок важен */
  function F5(s){
    const Н=260, в=s.ответ5;
    const n=5, cx=168, cy=128, R=84;
    const стрелки = [];
    for(let i=0;i<n;i++) for(let j=0;j<n;j++){ if(i===j) continue; const a=место(i,n,cx,cy,R), b=место(j,n,cx,cy,R);
      const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy), ox=-dy/L*4, oy=dx/L*4;
      стрелки.push(`<line x1="${(a[0]+ox+dx*0.18).toFixed(1)}" y1="${(a[1]+oy+dy*0.18).toFixed(1)}" x2="${(b[0]+ox-dx*0.18).toFixed(1)}" y2="${(b[1]+oy-dy*0.18).toFixed(1)}"
        stroke="${ОЛИВА}" stroke-width="1.6" marker-end="url(#c395-стр)">${очередь(стрелки.length,20,'10s')}</line>`); }
    const разборы = ['10 — так было бы для рукопожатий. Но венок от Диона Милону и венок от Милона Диону — <b>два разных венка</b>: здесь порядок важен.',
      'Каждый из 5 дарит каждому из 4 остальных: <b>5 · 4 = 20</b> венков. Делить не нужно — «кто кому» здесь важно.',
      '25 = 5 · 5 — так вышло бы, если бы каждый дарил венок и самому себе.'];
    return ЛИСТ(s) +
      ЗАДАЧА('После турнира пятеро победителей по обычаю <b>дарят друг другу</b> лавровые венки — каждый каждому. А потом <b>пожимают руки</b>. Сколько подарят венков?') +
      `<div class="pic">${свг(`
        <defs><marker id="c395-стр" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${ОЛИВА}"/></marker></defs>
        ${пейзаж(Н,236,true)}
        ${стрелки.join('')}
        ${Array.from({length:n},(_,i)=>{ const [x,y]=место(i,n,cx,cy,R); return венок(x,y,15)+`<circle cx="${x}" cy="${y}" r="9" fill="url(#c395-кожа)"/>`; }).join('')}
        ${подпись(168,Н-10, в===1?'венков 20, рукопожатий 10':'стрелка — венок от одного другому', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['10','20','25'],1,в,'r395Отв5') +
      (в==null ? СКАЗ('Вопрос','Сколько венков подарят пятеро, если каждый дарит каждому?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Порядок <b>важен</b> — не делим (20 венков). <b>Не важен</b> — делим на 2 (10 рукопожатий).') : '');
  }

  /* 6. Команда из трёх бегунов */
  const ключКоманды = (м) => м.slice().sort((a,b)=>a-b).join('-');
  function F6(s){
    const Н=250, выбор=s.выбор6||[], команды=s.команды6||[], мимо=s.мимо6, в=s.ответ6;
    const x=(i)=>40+i*64;
    const разборы = ['60 = 5 · 4 · 3 — так считают, если важно, кто первый, второй и третий. А в команде порядок не важен: одну тройку так посчитали <b>6 раз</b> (3 · 2 · 1).',
      'Верно: 5 · 4 · 3 = 60 «очередей», каждая команда встречается в 3 · 2 · 1 = 6 очередях — <b>60 : 6 = 10</b> команд.',
      '15 — это пары из 6, а тут тройки из 5. Посчитай с порядком (5 · 4 · 3) и раздели на число перестановок тройки.'];
    return ЛИСТ(s) +
      ЗАДАЧА('В эстафете от Сиракуз бегут трое, а бегунов пятеро. Тренер выбирает <b>команду</b> — кто за кем побежит, решат потом. <b>Тапни трёх бегунов</b>, чтобы собрать команду. Собери несколько разных.') +
      `<div class="pic">${свг(`
        ${пейзаж(Н,120)}
        <rect x="0" y="176" width="336" height="${Н-176}" fill="url(#c395-песок)"/>
        ${[0,1,2].map(i=>`<line x1="0" y1="${190+i*16}" x2="336" y2="${190+i*16}" stroke="#f6ead0" stroke-width="1.2" opacity=".7"/>`).join('')}
        <g pointer-events="none">
          ${БЕГУНЫ.map((б,i)=>`<g>${выбор.includes(i)?анСдвиг('0 0;0 -4;0 0','0.8s','0;0.5;1'):''}${атлет(x(i),174,['#e08a5f','#d8b060','#7ab0d8','#9cc27a','#c08ad8'][i],0.95,выбор.includes(i))}</g>`).join('')}
          ${БЕГУНЫ.map((б,i)=>т(x(i),226,б,12,'#3a2410',true,undefined,'#f3e2b8')).join('')}</g>
        ${БЕГУНЫ.map((б,i)=>`<rect x="${x(i)-32}" y="120" width="64" height="112" fill="rgba(255,255,255,.001)" style="cursor:pointer" onclick="r395Бегун(${i})"/>`).join('')}
        ${подпись(168,28, 'в команде: '+выбор.length+' из 3 · команд: '+команды.length, GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (команды.length ? A(3,'найдено',команды.map(k=>'<span>'+k.split('-').map(i=>БЕГУНЫ[+i]).join(', ')+'</span>').join('')) : '') +
      (мимо ? РАЗБОР(false,мимо) : '') +
      (команды.length>=3
        ? ОТВЕТЫ('три',['60','10','15'],1,в,'r395Отв6') + (в==null ? СКАЗ('Вопрос','Сколько всего разных команд из трёх можно выбрать из пяти?') : РАЗБОР(в===1, разборы[в]))
        : СКАЗ('Собери','Собери хотя бы три разные команды — потом посчитаем все.')) +
      (в===1 ? ПРАВИЛО('Тройки без порядка: <b>n · (n − 1) · (n − 2) : 6</b>. Для 5 — 60 : 6 = 10.') : '');
  }

  /* 7. Взять троих = оставить двоих */
  function F7(s){
    const Н=240, в=s.ответ7;
    const x=(i)=>40+i*64;
    /* команда {Дион, Ламах, Гелон} ↔ остаются {Никий, Феон} */
    const в_команде=[0,2,4];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед, приехавший болеть за своих, подмигивает: «Выбрать троих в команду — всё равно что выбрать <b>двоих, кто останется</b> на трибуне. Каждой команде соответствует своя пара запасных».') +
      `<div class="pic">${свг(`
        ${пейзаж(Н,110)}
        <rect x="0" y="150" width="336" height="${Н-150}" fill="url(#c395-песок)"/>
        ${БЕГУНЫ.map((б,i)=>{ const в_=в_команде.includes(i);
          return `<g>${в_?'':анСдвиг('0 0;0 0;0 -40;0 -40;0 0','6s','0;0.3;0.5;0.8;1')}${атлет(x(i),170,['#e08a5f','#d8b060','#7ab0d8','#9cc27a','#c08ad8'][i],0.9,в_)}</g>`; }).join('')}
        ${БЕГУНЫ.map((б,i)=>т(x(i),218,б,12,'#3a2410',true,undefined,'#f3e2b8')).join('')}
        ${подпись(168,28,'3 в команду = 2 на трибуну',GOLD,14)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['Выбрать 2 из 6','Выбрать 4 из 4'],0,в,'r395Отв7') +
      (в==null ? СКАЗ('Вопрос','Из 6 борцов выбирают 4 на парад. Это столько же способов, сколько…')
       : РАЗБОР(в===0, ['Выбрать 4 идущих = выбрать 2 остающихся: <b>6 · 5 : 2 = 15</b> способов. Так считать гораздо короче.','«4 из 4» — это один способ. А выбрать 4 из 6 — то же, что выбрать 2, кто <b>не</b> пойдёт: 6 · 5 : 2 = 15.'][в])) +
      (в===0 ? ПРАВИЛО('Выбрать k из n = выбрать n − k, <b>кого не взять</b>.') : '');
  }

  /* 8. Треугольники из флагштоков */
  function F8(s){
    const Н=276, в=s.ответ8;
    const n=6, cx=168, cy=140, R=96;
    const тройки=[]; for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) for(let k=j+1;k<n;k++) тройки.push([i,j,k]);
    const треуг = тройки.map((т_,н)=>{ const p=т_.map(i=>место(i,n,cx,cy,R));
      return `<path d="M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)} L${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)} L${p[2][0].toFixed(1)} ${p[2][1].toFixed(1)} Z"
        fill="rgba(255,215,106,.18)" stroke="${GOLD}" stroke-width="1.6" opacity="${н===0?1:0}">
        ${ДВИЖ?`<animate attributeName="opacity" values="0;0;1;1;0;0" dur="20s" repeatCount="indefinite" keyTimes="0;${(н/20).toFixed(3)};${((н+0.1)/20).toFixed(3)};${((н+0.9)/20).toFixed(3)};${((н+1)/20).toFixed(3)};1"/>`:''}</path>`; }).join('');
    const флаги = Array.from({length:n},(_,i)=>{ const [x,y]=место(i,n,cx,cy,R); return `<g filter="url(#c395-тень)">
      <line x1="${x}" y1="${y}" x2="${x}" y2="${y-26}" stroke="#6a4a2a" stroke-width="2"/>
      <path d="M${x} ${y-26} l16 5 l-16 5 z" fill="${['#e08a5f','#d8b060','#7ab0d8','#9cc27a','#c08ad8','#e06a8a'][i]}">${анЛин('d',`M${x} ${y-26} l16 5 l-16 5 z;M${x} ${y-26} l15 3 l-15 7 z;M${x} ${y-26} l16 5 l-16 5 z`,(1.4+i*0.2).toFixed(1)+'s')}</path>
      <circle cx="${x}" cy="${y}" r="5" fill="url(#c395-золото)"/></g>`; }).join('');
    const разборы = ['120 = 6 · 5 · 4 считает каждый треугольник <b>6 раз</b> — столько способов назвать его вершины по порядку. 120 : 6 = 20.',
      'Треугольник — это тройка флагштоков, порядок вершин не важен: 6 · 5 · 4 : 6 = <b>20</b>.',
      '18 — так не получается ни одним правилом. Выбирают тройку из 6: 6 · 5 · 4 : (3 · 2 · 1).'];
    return ЛИСТ(s) +
      ЗАДАЧА('Вокруг площади — шесть флагштоков. Для праздника жрецы натягивают ленты <b>треугольником</b> между любыми тремя флагштоками. Сколько разных треугольников можно натянуть?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c395-песок)"/>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(255,255,255,.12)" stroke="#8a6a3a" stroke-width="1" stroke-dasharray="3 6"/>
        ${треуг}${флаги}
        ${подпись(168,Н-10, в===1?'6 · 5 · 4 : 6 = 20':'треугольники по одному', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['120','20','18'],1,в,'r395Отв8') +
      (в==null ? СКАЗ('Вопрос','Сколько треугольников с вершинами во флагштоках?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Треугольник из точек = <b>тройка без порядка</b>.') : '');
  }

  /* 9. Диагонали арены */
  function F9(s){
    const Н=276, в=s.ответ9;
    const n=6, cx=168, cy=138, R=100;
    const разборы = ['15 — это все пары углов, вместе со <b>сторонами</b>. Стороны — не диагонали: 15 − 6 = 9.',
      'Из каждого угла канат тянется к 3 несоседним углам: 6 · 3 = 18, и каждый канат посчитан с двух концов — <b>18 : 2 = 9</b>.',
      '18 = 6 · 3 считает каждый канат дважды — от обоих его концов. 18 : 2 = 9.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Арена для панкратиона — шестиугольная. Судьи натягивают канаты между углами, но <b>не соседними</b> — это диагонали арены. Сколько канатов понадобится?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c395-вечер)"/>
        <path d="${Array.from({length:n},(_,i)=>{ const [x,y]=место(i,n,cx,cy,R); return (i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1); }).join(' ')} Z" fill="url(#c395-песок)" stroke="#8a6a3a" stroke-width="3"/>
        ${хорды(n,cx,cy,R,(i,j)=>{ const d=j-i; return d!==1 && d!==n-1; },'7s','#8a2a1a')}
        ${Array.from({length:n},(_,i)=>{ const [x,y]=место(i,n,cx,cy,R); return `<g filter="url(#c395-тень)"><rect x="${x-7}" y="${y-18}" width="14" height="22" rx="3" fill="url(#c395-мрамор)"/>
          <circle cx="${x}" cy="${y}" r="5" fill="url(#c395-золото)"/></g>`; }).join('')}
        ${подпись(168,Н-10, в===1?'6 · 3 : 2 = 9 канатов':'канат — между несоседними углами', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['15','9','18'],1,в,'r395Отв9') +
      (в==null ? СКАЗ('Вопрос','Сколько диагоналей у шестиугольника?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Диагоналей у n-угольника <b>n · (n − 3) : 2</b>: из угла — ко всем, кроме себя и двух соседей.') : '');
  }

  /* 10. Победа */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=280;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Тренировки расписаны без повторов, схватки сосчитаны, команда отобрана. Дион выходит на арену — и Сиракузы получают олимпийский венок! Глашатай выкрикивает имя победителя, а тренер кивает тебе: «Без твоего счёта бы не вышло».'
        : 'Сборы ещё не закончены — вернись к делам в списке. А вот что ты теперь умеешь.') +
      `<div class="pic">${свг(`
        ${пейзаж(Н,140)}
        <rect x="0" y="196" width="336" height="${Н-196}" fill="url(#c395-песок)"/>
        <g filter="url(#c395-тень)"><rect x="128" y="160" width="80" height="36" fill="url(#c395-мрамор)"/>${т(168,184,'1',20,'#6a5a3a',true)}</g>
        ${атлет(168,140,БОРЦЫ[0].ц,1.1,false)}
        <g>${анСдвиг('0 -20;0 0;0 0','3s','0;0.5;1')}${венок(168,102,14)}</g>
        <g>${проявить('8s',0.1,0.2)}${подпись(84,226,'пары: n(n−1):2',GOLD,12)}</g>
        <g>${проявить('8s',0.3,0.4)}${подпись(252,226,'тройки: делим на 6',GOLD,12)}</g>
        <g>${проявить('8s',0.5,0.6)}${подпись(168,Н-14,'порядок важен — не делим',GREEN,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Если порядок <b>не важен</b>, сначала считают с порядком, а потом делят на число перестановок выбранных: пары — на 2, тройки — на 6. Выбрать k — то же, что выбрать n − k, кого не взять.') +
      ПРАВИЛО('Спроси себя: <b>важен ли порядок?</b> Не важен — дели.');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Сколько пар можно составить из 5 борцов?',
      варианты:[{т:'20',ок:false},{т:'10',ок:true}], разбор:'5 · 4 : 2 = 10.' },
    { вопрос:'Турнир «каждый с каждым» из 8 команд. Сколько матчей?',
      варианты:[{т:'28',ок:true},{т:'56',ок:false}], разбор:'8 · 7 : 2 = 28.' },
    { вопрос:'Сколькими способами выбрать 2 дежурных из 7?',
      варианты:[{т:'42',ок:false},{т:'21',ок:true}], разбор:'7 · 6 : 2 = 21 — дежурные не различаются.' },
    { вопрос:'Сколько треугольников с вершинами в 5 точках на окружности?',
      варианты:[{т:'10',ок:true},{т:'60',ок:false}], разбор:'5 · 4 · 3 : 6 = 10.' },
    { вопрос:'Сколько диагоналей у пятиугольника?',
      варианты:[{т:'10',ок:false},{т:'5',ок:true}], разбор:'5 · 2 : 2 = 5.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r395Reset()")}</div>` +
        ПРАВИЛО('<b>Порядок не важен — дели.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r395Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Пары', задания:[
    {q:'Рукопожатия 6 человек, каждый с каждым.', в:1, варианты:['30','15'], раз:'6 · 5 : 2 = 15.'},
    {q:'Пары из 4 борцов.', в:0, варианты:['6','12'], раз:'4 · 3 : 2 = 6.'},
    {q:'Выбрать 2 книги из 10 в подарок.', в:1, варианты:['90','45'], раз:'10 · 9 : 2 = 45.'},
    {q:'Турнир из 5 команд, каждая с каждой по разу.', в:0, варианты:['10','20'], раз:'5 · 4 : 2 = 10.'}
  ]};
  const Т2 = { имя:'Важен ли порядок', задания:[
    {q:'Капитан и заместитель из 6 — сколько способов?', в:0, варианты:['30','15'], раз:'Роли разные — порядок важен: 6 · 5 = 30.'},
    {q:'Двое дежурных из 6 — сколько способов?', в:1, варианты:['30','15'], раз:'Дежурные одинаковые — делим: 15.'},
    {q:'Открытки: 4 друга шлют друг другу каждый каждому.', в:1, варианты:['6','12'], раз:'«Кто кому» важно: 4 · 3 = 12.'},
    {q:'Рукопожатия тех же 4 друзей.', в:0, варианты:['6','12'], раз:'Рукопожатие одно на пару: 6.'}
  ]};
  const Т3 = { имя:'Тройки и диагонали', задания:[
    {q:'Команда из 3 человек из 4.', в:1, варианты:['24','4'], раз:'Выбрать 3 = оставить 1: 4 способа.'},
    {q:'Треугольники из 6 точек на окружности.', в:0, варианты:['20','120'], раз:'6 · 5 · 4 : 6 = 20.'},
    {q:'Диагонали восьмиугольника.', в:1, варианты:['28','20'], раз:'8 · 5 : 2 = 20.'},
    {q:'Выбрать 5 из 7 — столько же, сколько…', в:0, варианты:['2 из 7','5 из 5'], раз:'Выбрать 5 = выбрать 2, кого не взять: 21.'}
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
        в, "r395T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r395TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L395 = {
    id: ID,
    title: 'Сочетания: начало',
    ico: '🤝',
    src: 'Математика · 5–6 класс · Олимп-6: комбинаторика',
    subj: 'math',
    explain: [
      'Олимпийские игры. Милон из Кротона, Феаген с Фасоса, Леонтиск из Мессены и наш Дион из Сиракуз. Сочетание — выбор группы, где порядок не важен: пара «Дион и Милон» — то же, что «Милон и Дион».',
      'Четыре борца, каждый тренируется с каждым. Находим все пары по порядку: их шесть. С порядком было бы 4 · 3 = 12, но каждая пара посчитана дважды.',
      'Таблица пар: 16 клеток, 4 на диагонали — борец сам с собой, остальные 12 разбиты на зеркальные половины. Разных пар 12 : 2 = 6.',
      'Турнир шести борцов «каждый с каждым»: 6 · 5 = 30, и каждая схватка посчитана дважды — схваток 15.',
      'Пятеро победителей дарят друг другу венки: тут важно, кто кому, поэтому 5 · 4 = 20. А рукопожатий только 10.',
      'Команда из трёх бегунов из пяти: с порядком 5 · 4 · 3 = 60, а одна тройка встречается в 3 · 2 · 1 = 6 порядках. Команд 60 : 6 = 10.',
      'Выбрать троих в команду — то же, что выбрать двоих запасных. Выбрать 4 из 6 — столько же способов, сколько выбрать 2 из 6: пятнадцать.',
      'Треугольник из флагштоков — тройка без порядка. Из шести флагштоков: 6 · 5 · 4 : 6 = 20 треугольников.',
      'Диагонали шестиугольной арены: из каждого угла — к трём несоседним, 6 · 3 = 18, и каждая диагональ посчитана дважды. Диагоналей 9.',
      'Итог: если порядок не важен, считаем с порядком и делим на число перестановок выбранных — пары на 2, тройки на 6.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: пары.',
      'Тренажёр 2: важен ли порядок.',
      'Тренажёр 3: тройки и диагонали.'
    ],
    check: {
      q: 'Сколькими способами можно выбрать 2 борца из 4 для тренировки?',
      choices: ['12','6','8','4'],
      ans: 1,
      exp: '4 · 3 : 2 = 6 — каждая пара посчитана дважды.'
    },
    tasks: [
      { q:'Сколькими способами выбрать 2 из 5?', kind:'unit', ans:10, tol:0,
        hints:['5 · 4 = 20 с порядком.','Каждая пара дважды: 20 : 2.'], sol:'10.' },
      { q:'Сколько схваток в турнире шести борцов «каждый с каждым»?', kind:'unit', ans:15, tol:0,
        hints:['6 · 5.','Каждая схватка посчитана дважды.'], sol:'6 · 5 : 2 = 15.' },
      { q:'Сколько команд из 3 бегунов можно выбрать из 5?', kind:'choice', choices:['10','60'], ans:0,
        hints:['С порядком 5 · 4 · 3 = 60.','Тройка встречается в 6 порядках.'], sol:'60 : 6 = 10.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L395.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'На Олимпию',2:'Все пары',3:'Почему делим на 2',4:'Турнир',5:'Венки и рукопожатия',
      6:'Команда из трёх',7:'Взять или оставить',8:'Треугольники из флагов',9:'Канаты арены',10:'Олимпийский венок',
      11:'Практика',12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l395" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Сочетания'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r395Борец=(i)=>{ const s=S(); s.мимо2=null; const в=s.выбор2;
    if(в==null){ s.выбор2=i; chRender(0); return; }
    if(в===i){ s.выбор2=null; chRender(0); return; }
    const к=ключПары(в,i), пары=s.пары2||[];
    if(пары.includes(к)) s.мимо2='Пара «'+БОРЦЫ[в].имя+' — '+БОРЦЫ[i].имя+'» уже записана как «'+БОРЦЫ[Math.min(в,i)].имя+' — '+БОРЦЫ[Math.max(в,i)].имя+'»: <b>порядок в паре не важен</b>.';
    else { пары.push(к); s.пары2=пары; if(пары.length===6) s.дело_пары=true; }
    s.выбор2=null; chRender(0); };
  window.r395Отв3=(к)=>{ S().ответ3=к; chRender(0); };
  window.r395Отв4=(к)=>{ const s=S(); s.ответ4=к; if(к===1) s.дело_турнир=true; chRender(0); };
  window.r395Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r395Бегун=(i)=>{ const s=S(); s.мимо6=null; const в=s.выбор6||[];
    if(в.includes(i)){ s.выбор6=в.filter(x=>x!==i); chRender(0); return; }
    в.push(i); s.выбор6=в;
    if(в.length===3){ const к=ключКоманды(в), к_=s.команды6||[];
      if(к_.includes(к)) s.мимо6='Команда «'+в.map(x=>БЕГУНЫ[x]).join(', ')+'» уже есть — просто бегуны выбраны в другом порядке. <b>В команде порядок не важен</b>.';
      else { к_.push(к); s.команды6=к_; }
      s.выбор6=[]; }
    chRender(0); };
  window.r395Отв6=(к)=>{ const s=S(); s.ответ6=к; if(к===1) s.дело_команда=true; chRender(0); };
  window.r395Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r395Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r395Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r395Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r395Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r395T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r395TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L395; else arr.push(L395); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA395={render:render, L:L395};
})();
