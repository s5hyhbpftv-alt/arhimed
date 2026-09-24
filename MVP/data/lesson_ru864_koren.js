/* ============ РУССКИЙ ЯЗЫК · УРОК 864 · «КОРЕНЬ СЛОВА И ОДНОКОРЕННЫЕ» ============
   3 класс, «Состав слова». Была заглушкой в soon_lessons.js — теперь урок.
   Продолжение 861–863: «Чайка» пристаёт к острову со старым деревом.
   Рисунки — общая библиотека моря MVP/data/ris_more.js (window.РМ).

   СЮЖЕТ. «Дерево слов». На острове растёт древнее дерево. Земля у его
   подножия осыпалась, и видно, как корни уходят вглубь; на главном корне
   светятся буквы МОР. Смотритель острова говорит: «Это дерево морских слов.
   Приживётся только слово от этого корня — и с тем же смыслом».

   РУКАМИ: дерево слов — касаешься слова; родственное прирастает к стволу
   новой веткой с листвой, а корень под землёй разгорается ярче; обманщики
   (похожи буквами — морковь, морщинка; похожи смыслом — матрос) падают в
   море с брызгами и разбором; корень в словах — выбираешь, где он в слове,
   и над деревянными буквами встаёт дуга корня.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 3 КЛАССА (Канакина, Горецкий):
     однокоренные (родственные) слова имеют общую часть — корень — и близки
     по значению: море, морской, моряк, приморье, заморский;
     корень выделяют дугой: мор|як, мор|ской, при|мор|ье, за|мор|ский;
     формы одного слова (море, моря, морем) — не однокоренные слова;
     синонимы с разными корнями (моряк — матрос) — не однокоренные;
     похожие корни с разным значением: вода — водитель (от «водить»);
     чередование согласных в корне: берег — бережок, флаг — флажок;
     сложные слова имеют два корня: море-плаватель (соединительная е),
     пар-о-ход;
     безударную гласную в корне проверяют однокоренным словом: м_ряк —
     мОре → моряк;
     «Молодой моряк любит морской ветер и морковный пирог»: к «морю»
     относятся моряк и морской (2); морковный — другой корень. */
(function(){
  'use strict';

  const ID = 864;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', ЯНТАРЬ='#ffb640';

  const ДЕЛА = [
    {ключ:'дерево', имя:'Вырастить дерево слов', итог:'5 веток'},
    {ключ:'корень', имя:'Найти корень в словах',  итог:'мор'},
    {ключ:'строка', имя:'Проверить запись в журнале', итог:'два слова'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* слова для дерева: [до корня, корень, после] или причина отказа */
  const СЛОВА = [
    {с:'морской',   ч:['','мор','ской']},
    {с:'морковь',   почему:'«Морковь» похожа буквами, но она растёт в огороде, а не в море. Смысл другой — это <b>не родственник</b>.'},
    {с:'моряк',     ч:['','мор','як']},
    {с:'матрос',    почему:'«Матрос» — про море, но общей части нет: мор- и матрос-. Слова близки по смыслу, но корни <b>разные</b>.'},
    {с:'приморье',  ч:['при','мор','ье']},
    {с:'морщинка',  почему:'«Морщинка» только начинается на «мор». К морю она отношения не имеет — <b>не родственник</b>.'},
    {с:'заморский', ч:['за','мор','ский']},
    {с:'море',      ч:['','мор','е']}
  ];
  const РОДНЯ = СЛОВА.map((с,i)=>с.ч?i:-1).filter(i=>i>=0);
  /* ветки дерева: откуда, изгиб, куда, где табличка */
  const ВЕТКИ = [
    {а:[164,128], б:[128,108], в:[94,86],  т:[70,72]},
    {а:[172,126], б:[208,106], в:[244,84], т:[266,70]},
    {а:[163,156], б:[122,150], в:[80,138], т:[62,124]},
    {а:[173,154], б:[216,148], в:[258,136],т:[276,122]},
    {а:[168,116], б:[166,86],  в:[168,64], т:[168,44]}
  ];
  /* корень в словах: варианты разбиения, верный — индекс */
  const ДЕЛЕНИЯ = [
    {с:'моряк',     в:['мо|ряк','мор|як','моря|к'], верно:1, к:[0,3]},
    {с:'морской',   в:['мор|ской','морс|кой','мо|рской'], верно:0, к:[0,3]},
    {с:'приморье',  в:['прим|орье','приморь|е','при|мор|ье'], верно:2, к:[3,6]},
    {с:'заморский', в:['зам|ор|ский','за|мор|ский','замо|р|ский'], верно:1, к:[2,5]}
  ];

  const CSS=`
  #lvis .s6.l864{gap:14px}
  #lvis .s6.l864 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l864 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l864 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l864 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l864 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l864 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l864 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l864 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l864 .карт .текст b{color:${GOLD}}
  #lvis .s6.l864 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l864 .правило b{color:${GOLD}}
  #lvis .s6.l864 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l864 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l864 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l864 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l864 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l864 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l864 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l864 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l864 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l864 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l864 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l864 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l864 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l864 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l864 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l864 .буйки button.мимо{border-color:${RED};animation:l864нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l864нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l864 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l864 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l864 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l864 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l864 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l864 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l864 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l864 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l864 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l864 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l864 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l864 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l864 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l864 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l864 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l864 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l864 .уровни .точка.сейчас{background:${GOLD};animation:l864dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l864dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l864 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l864{-webkit-text-size-adjust:100%}
  #lvis .s6.l864 [data-anim]{animation:l864rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l864rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l864 .буйки button{border-color:#6aa84a;background:linear-gradient(180deg,#f6fbec,#d8ecc0)}
  #lvis .s6.l864 .буйки button.пойман{border-color:#8fd1a8}
  #lvis .s6.l864 .буйки button.мимо{border-color:#e86a5a}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l864 [data-anim]{animation:none!important}
    #lvis .s6.l864 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l864 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l864-style');
      if(!s){ s=document.createElement('style'); s.id='l864-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Судовой журнал</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,f) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r864Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Остров корней</span><b class="${всё?'готово':''}">${
        всё?'дерево выросло':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}<span>${есть?д.итог:'—'}</span></li>`;
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
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.45;0.45;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const вырасти = (длит,доля) => анК('opacity','0.15;0.15;1;1',длит,'0;'+кт(доля)+';'+кт(доля+0.06)+';1');
  const сдвигРаз = (из,в,длит,задержка) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" from="${из}" to="${в}" dur="${длит}" begin="${(задержка||0).toFixed(2)}s"
       fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';
  const растиРаз = (cx,cy,длит) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="matrix" from="0.05 0 0 0.05 ${cx*0.95} ${cy*0.95}" to="1 0 0 1 0 0" dur="${длит}" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  /* слово с выделенным корнем: [до, корень, после] */
  const тКорень = (x,y,ч,кегль,цвет,цветК,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль}" font-weight="bold" fill="${цвет}" font-family="Georgia,'Times New Roman',serif">${esc(ч[0])}<tspan fill="${цветК}" text-decoration="underline">${esc(ч[1])}</tspan>${esc(ч[2])}</text>`;
  const Р = () => window.РМ;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c864-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <linearGradient id="c864-почва" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a34"/><stop offset="0.5" stop-color="#5a3e22"/><stop offset="1" stop-color="#3a2614"/>
      </linearGradient>
      <linearGradient id="c864-кора" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#4a2e14"/><stop offset="0.35" stop-color="#8a5a2e"/><stop offset="0.7" stop-color="#6a4220"/><stop offset="1" stop-color="#3a2410"/>
      </linearGradient>
      <radialGradient id="c864-свет" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd870" stop-opacity=".9"/><stop offset="0.5" stop-color="#ffb640" stop-opacity=".35"/><stop offset="1" stop-color="#ffb640" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c864-листва" cx="0.4" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#b8e08a"/><stop offset="0.6" stop-color="#6aa84a"/><stop offset="1" stop-color="#3a6a2a"/>
      </radialGradient>
      <linearGradient id="c864-трава" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9ccc6a"/><stop offset="1" stop-color="#5e9444"/>
      </linearGradient>
      <linearGradient id="c864-блок" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4dcae"/><stop offset="0.6" stop-color="#d8b07a"/><stop offset="1" stop-color="#a87a44"/>
      </linearGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.6+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c864-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* пучок листьев вокруг точки */
  const листва = (x,y,м,фаза) => { const л=[[0,0,14,10],[-12,-4,10,8],[12,-5,11,8],[-6,-12,10,7],[8,-13,9,7],[-14,6,9,6],[14,6,9,6],[0,10,10,6]];
    return `<g transform="translate(${x} ${y}) scale(${м})">${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="${(3+фаза*0.4).toFixed(1)}s" repeatCount="indefinite" additive="sum"/>`:''}
      ${л.map(([dx,dy,rx,ry],k)=>`<ellipse cx="${dx}" cy="${dy}" rx="${rx}" ry="${ry}" fill="url(#c864-листва)" stroke="#2e5a22" stroke-width=".7" transform="rotate(${(k*37)%80-40} ${dx} ${dy})"/>`).join('')}
      ${[[-6,-2],[6,4],[2,-8]].map(([dx,dy])=>`<circle cx="${dx}" cy="${dy}" r="2.2" fill="#4a5a2a" stroke="#2a3414" stroke-width=".5"/><circle cx="${dx-0.6}" cy="${dy-0.6}" r=".7" fill="#c8d8a0"/>`).join('')}
      <path d="M-10 -6 q8 -6 16 -2" stroke="#e0f4c0" stroke-width="1.2" fill="none" opacity=".7"/></g>`; };
  /* табличка-листок со словом и подсвеченным корнем */
  const табличка = (x,y,ч,свет) => { const w=(ч.join('').length*9.4+20);
    return `<g filter="url(#c864-тень)"><rect x="${(x-w/2).toFixed(1)}" y="${y-13}" width="${w.toFixed(1)}" height="22" rx="11" fill="${свет?'#fff6dc':'url(#рм-бумага)'}" stroke="${свет?ЯНТАРЬ:'#6a8a4a'}" stroke-width="1.4"/></g>
      ${тКорень(x,y+3,ч,14,ЧЕРНИЛА,'#b85a10')}`; };
  /* остров с деревом, корнями в разрезе и ветками выросших слов */
  function остров(s,Н,выросло,новое,упало){
    const М=Р(), n=выросло.length, яр=Math.min(1,0.2+n*0.16);
    const корни = [
      'M168 214 C166 240 170 262 168 292','M168 220 C150 236 122 244 96 262','M168 220 C188 238 214 246 244 262',
      'M150 234 C136 252 124 270 116 290','M188 234 C204 252 214 272 222 292','M168 250 C154 262 146 276 142 296'
    ];
    const ветки = выросло.map((i,k)=>{ const в=ВЕТКИ[k], ч=СЛОВА[i].ч, свеж=новое===i;
      return `<g>${свеж?растиРаз(в.а[0],в.а[1],'0.9s'):''}
        <path d="M${в.а[0]} ${в.а[1]} Q${в.б[0]} ${в.б[1]} ${в.в[0]} ${в.в[1]}" stroke="url(#c864-кора)" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M${в.а[0]} ${в.а[1]} Q${в.б[0]} ${в.б[1]} ${в.в[0]} ${в.в[1]}" stroke="#a87a4a" stroke-width="1.4" fill="none" opacity=".6"/>
        ${листва(в.в[0],в.в[1],0.95,k)}</g>
        <g>${свеж?сдвигРаз('0 14','0 0','0.6s',0.6):''}${табличка(в.т[0],в.т[1],ч,свеж)}</g>`; }).join('');
    const падение = упало!=null ? (()=>{ const x=286, w=СЛОВА[упало].с;
      return `<g opacity="0">${ДВИЖ?`<animate attributeName="opacity" values="1;1;0" keyTimes="0;0.8;1" dur="1.3s" fill="freeze"/><animateTransform attributeName="transform" type="translate" from="0 0" to="0 150" dur="1.3s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.55 0 0.9 0.6"/>`:''}
        ${подпись(x,120,w,RED,12)}</g>
        ${ДВИЖ?[0,1,2].map(k=>`<ellipse cx="${x}" cy="272" rx="3" ry="1.2" fill="none" stroke="#fff" stroke-width="1.6" opacity="0"><animate attributeName="rx" values="3;${22+k*9}" dur="1s" begin="${(1.1+k*0.15).toFixed(2)}s" fill="freeze"/><animate attributeName="opacity" values="0.9;0" dur="1s" begin="${(1.1+k*0.15).toFixed(2)}s" fill="freeze"/></ellipse>`).join(''):''}`; })() : '';
    return `
      ${М.небо(336,150,{солнце:[300,32,10],облака:[[60,24,0.55,10],[230,40,0.4,-6]]})}
      ${М.море(150,Н-150,336,{дорожка:300})}
      ${М.парусник(30,204,0.3,{имя:'',якорь:false})}
      ${М.чайка(250,50,0.6,{дрейф:'-10 -3'})}
      <path d="M40 214 Q168 236 296 214 L336 ${Н} H0 Z" fill="url(#c864-почва)"/>
      ${[[70,262,6],[112,296,5],[236,292,6],[276,250,5],[196,306,4],[138,258,3.5],[30,300,5],[306,302,5]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*0.7}" fill="#8a7a64" stroke="${ОБВОД}" stroke-width=".6" data-декор="1"/>`).join('')}
      <path d="M40 214 Q168 236 296 214 L336 ${Н} H0 Z" fill="url(#рм-море)" opacity=".38"/>
      <path d="M0 214 H40 M296 214 H336" stroke="#e8f6ff" stroke-width="2" opacity=".8"/>
      ${[[10,240],[300,236],[20,280],[316,276]].map(([x,y],k)=>`<path d="M${x} ${y} q8 -4 16 0" stroke="#e8f6ff" stroke-width="1.2" fill="none" opacity=".45" data-декор="1">${анЛин('opacity','0.45;0.1;0.45',(2+k*0.4).toFixed(1)+'s')}</path>`).join('')}
      <circle cx="168" cy="276" r="${(28+n*6)}" fill="url(#c864-свет)" opacity="${яр}" data-декор="1">${анЛин('opacity',`${яр};${яр*0.6};${яр}`,'2.4s')}</circle>
      ${корни.map((d,k)=>`<path d="${d}" stroke="${n>k?ЯНТАРЬ:'#c8a070'}" stroke-width="${k<3?4.2:2.8}" stroke-linecap="round" fill="none" opacity="${n>k?0.95:0.8}"/>`).join('')}
      <g filter="url(#c864-тень)"><rect x="140" y="264" width="56" height="24" rx="12" fill="rgba(40,24,8,.85)" stroke="${ЯНТАРЬ}" stroke-width="1.4"/></g>
      ${т(168,282,'мор',17,'#ffd870',true)}
      <ellipse cx="168" cy="212" rx="132" ry="22" fill="url(#рм-песок)" stroke="${ОБВОД}" stroke-width="1"/>
      <ellipse cx="168" cy="206" rx="118" ry="15" fill="url(#c864-трава)"/>
      ${Array.from({length:16},(_,k)=>`<path d="M${62+k*14} ${204+(k%3)*2} l2 -7 l2 7" stroke="#4e8a36" stroke-width="1.2" fill="none" data-декор="1"/>`).join('')}
      <path d="M154 212 Q158 160 161 114 L175 114 Q178 160 184 212 Z" fill="url(#c864-кора)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[[162,196,164,150],[172,204,170,160],[166,140,167,120]].map(([x1,y1,x2,y2])=>`<path d="M${x1} ${y1} Q${x1+3} ${(y1+y2)/2} ${x2} ${y2}" stroke="#2e1a0a" stroke-width="1" fill="none" opacity=".6"/>`).join('')}
      <path d="M156 212 q-10 4 -16 2 M182 212 q10 4 16 2" stroke="url(#c864-кора)" stroke-width="5" stroke-linecap="round"/>
      ${n===0?листва(168,112,0.7,0):''}
      ${ветки}
      ${падение}
    `;
  }

  /* ================= КАДРЫ ================= */

  /* 1. Дерево слов */
  function F1(s){
    const Н=320, выр=Array.isArray(s.выр1)?s.выр1:[], ош=s.ош1, всё=РОДНЯ.every(i=>выр.includes(i));
    return ЖУРНАЛ(s) +
      ЗАДАЧА('«Чайка» пристала к острову. Здесь растёт древнее дерево, и у подножия видны его корни. На главном корне светятся буквы <b>мор</b>. Смотритель острова говорит: «Это дерево морских слов. Приживётся только слово <b>с этим корнем и о море</b>». Касайся слов — посмотрим, какие прирастут.') +
      `<div class="pic">${свг(`
        ${остров(s,Н,выр,s.новое1,s.упало1)}
        ${подпись(58,Н-12,'веток: '+выр.length+' из 5',всё?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="буйки">${СЛОВА.map((с,i)=>BTN(3+(i%5),выр.includes(i)?'пойман':(ош===i?'мимо':''),с.с,'r864Слово('+i+')')).join('')}</div>` +
      (всё ? РАЗБОР(true,'Море, морской, моряк, приморье, заморский — у всех общая часть <b>мор</b>, и все они о море. Это <b>родственные</b> слова.') :
        ош!=null ? РАЗБОР(false,СЛОВА[ош].почему) :
        СКАЗ('Подсказка','Проверь два условия: есть ли в слове <b>мор</b> и говорит ли оно о море.')) +
      (всё ? ПРАВИЛО('<b>Однокоренные</b> (родственные) слова имеют общую часть — <b>корень</b> — и близки по смыслу. Корень — главная часть слова.') : '');
  }

  /* 2. Где корень */
  function F2(s){
    const Н=260, реш=s.реш2||{}, все=ДЕЛЕНИЯ.every((_,i)=>реш[i]!=null), верно=все&&ДЕЛЕНИЯ.every((р,i)=>реш[i]===р.верно);
    const блоки=(р,i,y)=>{ const буквы=[...р.с], ш=24, x0=168-буквы.length*ш/2, ок=реш[i]===р.верно;
      return буквы.map((б,k)=>{ const вКорне=ок&&k>=р.к[0]&&k<р.к[1];
        return `<g filter="url(#c864-тень)"><rect x="${x0+k*ш+1}" y="${y-18}" width="${ш-2}" height="26" rx="4" fill="${вКорне?'#ffe7a8':'url(#c864-блок)'}" stroke="${вКорне?'#b85a10':ОБВОД}" stroke-width="${вКорне?1.4:0.9}"/></g>
          ${т(x0+k*ш+ш/2,y+2,б,17,ЧЕРНИЛА,true)}`; }).join('') +
        (ок?`<g>${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" dur="0.5s" fill="freeze"/>`:''}<path d="M${x0+р.к[0]*ш+2} ${y-22} Q${x0+(р.к[0]+р.к[1])*ш/2} ${y-40} ${x0+р.к[1]*ш-2} ${y-22}" stroke="#b85a10" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`:''); };
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Смотритель выкладывает слова из деревянных букв и просит: «Покажи, где в каждом слове корень». Корень отмечают <b>дугой</b> сверху. Выбери правильное деление для каждого слова.') +
      `<div class="pic">${свг(`
        ${Р().доски(0,0,336,Н,false)}
        <g><rect x="0" y="0" width="336" height="${Н}" fill="#1e1206" opacity=".25"/></g>
        ${ДЕЛЕНИЯ.map((р,i)=>блоки(р,i,54+i*58)).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      ДЕЛЕНИЯ.map((р,i)=>`<div class="случай">${A(3+i,'что',р.с)}<div class="ask три">${р.в.map((v,j)=>
        BTN(4+i,реш[i]===j?(j===р.верно?'hit':'miss'):'',v,'r864Корень('+i+','+j+')')).join('')}</div></div>`).join('') +
      (!все ? СКАЗ('Подсказка','Корень — та часть, что есть во всех родственниках: море, моряк, морской.') :
        РАЗБОР(верно, верно ? 'Во всех четырёх словах корень <b>мор</b>: мор-як, мор-ской, при-мор-ье, за-мор-ский. Всё остальное — части, которые добавляют оттенки смысла.' :
          'Ищи ту часть, которая <b>повторяется</b> во всех родственниках, — <b>мор</b>.')) +
      (верно ? ПРАВИЛО('Чтобы найти корень, подбери родственные слова и найди их <b>общую часть</b>. Корень обозначают дугой: ⌒мор⌒як.') : '');
  }

  /* 3. Формы — не родственники */
  function F3(s){
    const Н=260, в=s.ответ3, ок=в===1, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга выписал «родственников»: «<b>море, моря, морем</b>». Смотритель улыбнулся: «Это одно и то же слово, просто в разных нарядах — оно отвечает на разные вопросы. А родственники — <b>разные</b> слова с одним корнем». Какой ряд — однокоренные слова?') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{облака:[[80,30,0.5,10]]})}
        ${М.море(110,Н-110,336,{})}
        <g filter="url(#c864-тень)"><rect x="12" y="120" width="150" height="118" rx="10" fill="rgba(14,26,20,.8)" stroke="${МУТ}"/></g>
        ${т(87,142,'одно слово',13,МУТ,true)}
        ${['море','моря','морем'].map((w,k)=>`<g>${М.качать('0 0;0 3;0 0',(1.6+k*0.3).toFixed(1)+'s')}${подпись(87,172+k*26,w,ИНК,13)}</g>`).join('')}
        <g filter="url(#c864-тень)"><rect x="174" y="120" width="150" height="118" rx="10" fill="rgba(14,26,20,.8)" stroke="${ок?GREEN:МУТ}"/></g>
        ${т(249,142,'разные слова',13,ок?GREEN:МУТ,true)}
        ${[['','мор','е'],['','мор','ской'],['','мор','як']].map((ч,k)=>табличка(249,168+k*26,ч,ок)).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['море, моря, морем','море, морской, моряк'],1,в,3) +
      (в==null ? СКАЗ('Вопрос','Какой ряд — однокоренные слова?') :
        РАЗБОР(ок,['Море, моря, морем — это <b>формы одного слова</b>: меняется только окончание. Однокоренные — разные слова: <b>море, морской, моряк</b>.',
          'Море, морской, моряк — <b>разные</b> слова с общим корнем <b>мор</b>. А «море, моря, морем» — одно слово в разных формах.'][в])) +
      (ок ? ПРАВИЛО('<b>Формы одного слова</b> (море, моря, морем) — не однокоренные слова. Однокоренные — это <b>разные</b> слова с общим корнем.') : '');
  }

  /* 4. Моряк и матрос */
  function F4(s){
    const Н=260, в=s.ответ4, ок=в===1, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На пристань сходят двое: один называет себя <b>моряком</b>, другой — <b>матросом</b>. Юнга думает: «Оба про море — значит, родственники!» Прав ли юнга?') +
      `<div class="pic">${свг(`
        ${М.небо(336,130,{солнце:[40,30,10],облака:[[250,34,0.5,-8]]})}
        ${М.море(130,Н-130,336,{})}
        ${М.доски(0,Н-62,336,62,false)}
        ${М.юнга(110,Н-26,0.72,{поза:'машет'})}${М.юнга(226,Н-26,0.72,{поза:'стоит',взгляд:-1})}
        ${табличка(110,96,['','мор','як'],ок)}${подпись(226,102,'матрос',ок?RED:ИНК,14)}
        ${ок?т(168,64,'смысл близкий, корни разные',13,'#1a3a5a',true,undefined,'#e8f4fa'):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Прав: слова про одно и то же','Не прав: общей части — корня — у них нет'],1,в,4) +
      (в==null ? СКАЗ('Вопрос','Однокоренные ли «моряк» и «матрос»?') :
        РАЗБОР(ок,['Близкий смысл — ещё не родство. У «моряка» корень <b>мор</b>, а у «матроса» — <b>матрос</b>. Это <b>синонимы</b>, а не однокоренные слова.',
          'Верно: у родственников должен быть <b>общий корень</b>. Моряк и матрос — синонимы: смысл близкий, корни разные.'][в])) +
      (ок ? ПРАВИЛО('Для родства нужны <b>оба</b> условия: общий корень и близкий смысл. Слова с близким смыслом и разными корнями — <b>синонимы</b>.') : '');
  }

  /* 5. Вода и водитель */
  function F5(s){
    const Н=270, в=s.ответ5, ок=в===2, М=Р();
    const повозка = `<g transform="translate(256 ${Н-40})">
      <ellipse cx="0" cy="6" rx="46" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-40 -30 h70 l6 -10 h-82 z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <rect x="-40" y="-30" width="76" height="20" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[-24,20].map(x=>`<g><circle cx="${x}" cy="-6" r="12" fill="none" stroke="#5a3410" stroke-width="3"/>${[0,1,2,3].map(k=>`<line x1="${x}" y1="-6" x2="${(x+11*Math.cos(k*Math.PI/4)).toFixed(1)}" y2="${(-6+11*Math.sin(k*Math.PI/4)).toFixed(1)}" stroke="#7a4a1e" stroke-width="1.6"/>`).join('')}${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" from="0 ${x} -6" to="360 ${x} -6" dur="3s" repeatCount="indefinite"/>`:''}</g>`).join('')}
      <line x1="36" y1="-20" x2="58" y2="-24" stroke="#5a3410" stroke-width="2.4"/></g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На острове родник, из него берут <b>воду</b>. Рядом по дороге едет повозка, ею правит <b>водитель</b>. Юнга записал в родственники воды три слова. Какое из них — самозванец?') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{солнце:[300,30,10],облака:[[90,30,0.5,8]]})}
        <g><rect x="0" y="120" width="160" height="${Н-120}" fill="url(#рм-море)"/></g>
        ${М.море(120,Н-120,160,{})}
        <g><rect x="160" y="120" width="176" height="${Н-120}" fill="#c8b080"/></g>
        <path d="M160 ${Н-26} h176" stroke="#a88a5a" stroke-width="14" opacity=".5"/>
        ${[[40,150],[60,176],[30,206],[90,200]].map(([x,y],k)=>`<path d="M${x} ${y-10} q7 10 0 14 q-7 -4 0 -14z" fill="#8fd2f0" stroke="${ОБВОД}" stroke-width=".7">${анЛин('transform','0','1s')}</path>`).join('')}
        ${повозка}
        ${М.юнга(220,Н-60,0.5,{поза:'стоит',безНог:true})}
        ${табличка(80,Н-20,['','вод','яной'],false)}
        ${подпись(248,140,ок?'водитель — от «водить»':'водитель',ок?RED:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['водяной','подводный','водитель'],2,в,5) +
      (в==null ? СКАЗ('Вопрос','Какое слово НЕ родственно слову «вода»?') :
        РАЗБОР(ок,['Водяной живёт в воде — он родственник. Самозванец — <b>водитель</b>: он не про воду, а от слова «водить».',
          'Подводный — под водой, родственник. Самозванец — <b>водитель</b>: тот, кто водит повозку.',
          'Верно: <b>водитель</b> — от «водить», а не от «вода». Буквы совпали, смысл — нет.'][в])) +
      (ок ? ПРАВИЛО('Корни могут совпадать только <b>по виду</b>. Если смысл разный (вода — водитель), слова <b>не родственные</b>.') : '');
  }

  /* 6. Берег и бережок */
  function F6(s){
    const Н=260, в=s.ответ6, ок=в===0, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('У острова большой <b>берег</b>, а у маленькой бухты — <b>бережок</b>. Юнга сомневается: «В корне то <b>г</b>, то <b>ж</b> — может, это разные корни?» Как думаешь?') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{солнце:[296,30,10]})}
        ${М.море(110,Н-110,336,{})}
        ${М.берег(110,{x1:200})}
        <path d="M196 ${Н} q18 -30 58 -38 q44 -8 82 6 V${Н} Z" fill="url(#рм-песок)" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M200 ${Н-4} q18 -28 56 -36 q42 -8 80 6" stroke="#fff" stroke-width="1.6" fill="none" stroke-dasharray="5 4" opacity=".8">${анЛин('stroke-dashoffset','0;9','2.4s')}</path>
        ${Р().краб(300,Н-14,0.7)}
        ${табличка(96,150,['','берег',''],ок)}${табличка(280,Н-60,['','береж','ок'],ок)}
        ${ок?подпись(130,244,'г → ж: корень тот же',GREEN,12):''}
        ${ок?`<path d="M130 160 Q200 190 240 ${Н-66}" stroke="#fff" stroke-width="2" stroke-dasharray="4 4" fill="none"/>`:''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['Корень один: г и ж просто сменяют друг друга','Корни разные: буквы-то другие'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Берег и бережок — однокоренные?') :
        РАЗБОР(ок,['Смысл один — маленький берег, а г и ж в корне <b>чередуются</b>: берег — бережок, флаг — флажок, друг — дружба.',
          'Бережок — это маленький берег, смысл тот же. А буквы г и ж в корне <b>чередуются</b>, корень один.'][в])) +
      (ок ? ПРАВИЛО('В корне согласные могут <b>чередоваться</b>: г — ж (берег — бережок), к — ч (рука — ручка). Корень при этом тот же.') : '');
  }

  /* 7. Два корня */
  function F7(s){
    const Н=260, в=s.ответ7, ок=в===0, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Смотритель рассказывает про Архимеда: «Он дружил с <b>мореплавателями</b>». Юнга замечает, что в этом слове спрятаны сразу два слова: <b>море</b> и <b>плавать</b>. Сколько корней в слове «мореплаватель»?') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{закат:true,солнце:[60,100,14]})}
        ${М.море(120,Н-120,336,{дорожка:60})}
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;30 0;0 0" dur="9s" repeatCount="indefinite"/>`:''}${М.парусник(150,200,0.6,{имя:'Чайка'})}</g>
        ${табличка(70,40,['','мор','е'],ок)}${т(168,46,'+',20,ИНК,true)}${табличка(262,40,['','плав','ать'],ок)}
        <g filter="url(#c864-тень)"><rect x="46" y="${Н-44}" width="244" height="30" rx="15" fill="rgba(14,26,20,.9)" stroke="${ок?GREEN:GOLD}"/></g>
        <text x="168" y="${Н-24}" text-anchor="middle" font-size="16" font-weight="bold" fill="${ИНК}" font-family="Georgia,serif"><tspan fill="#ffd870">мор</tspan><tspan fill="${ок?'#8fd1a8':ИНК}">е</tspan><tspan fill="#ffd870">плав</tspan>атель</text>
        ${ок?т(168,82,'е — соединительная гласная',12,'#1a3a5a',true,undefined,'#ffe8c8'):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2','1','3'],0,в,7) +
      (в==null ? СКАЗ('Вопрос','Сколько корней в слове «мореплаватель»?') :
        РАЗБОР(ок,['Два корня: <b>мор</b> (море) и <b>плав</b> (плавать). Между ними соединительная гласная <b>е</b>.',
          'Один — если заметить только «мор». Но есть и второй: <b>плав</b> — от «плавать». Корней два.',
          'Три корня здесь нет: «атель» — не корень, это конец слова. Корней два: мор и плав.'][в])) +
      (ок ? ПРАВИЛО('<b>Сложные слова</b> имеют два корня, их соединяют гласные <b>о</b> или <b>е</b>: мор-е-плаватель, пар-о-ход, вод-о-пад.') : '');
  }

  /* 8. Проверка безударной гласной */
  function F8(s){
    const Н=250, в=s.ответ8, ок=в===0, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга пишет в журнал: «м_ряк сошёл на берег». Какую букву поставить — <b>о</b> или <b>а</b>? Слышится неясно. Смотритель подсказывает: «Позови на помощь родственника, у которого эта гласная <b>под ударением</b>».') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}
        ${М.лист(14,24,308,Н-44,{линии:2})}
        <text x="96" y="100" text-anchor="middle" font-size="30" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">м<tspan fill="${ок?'#1a6a3a':'#b85a10'}">${ок?'о':'_'}</tspan>ряк</text>
        ${т(96,128,'безударная',12,'#7a5a3a',true)}
        <path d="M150 90 h40 l-8 -6 M190 90 l-8 6" stroke="#7a5a3a" stroke-width="2" fill="none"/>
        <text x="256" y="100" text-anchor="middle" font-size="30" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">м<tspan fill="#1a6a3a">о</tspan>ре</text>
        <path d="M246 66 l8 -8" stroke="#b85a10" stroke-width="2.4" stroke-linecap="round"/>
        ${т(256,128,'ударная',12,'#1a6a3a',true)}
        ${ок?подпись(168,Н-30,'моряк — проверка: море',GREEN,13):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['о','а'],0,в,8) +
      (в==null ? СКАЗ('Вопрос','М_ряк — какую букву писать?') :
        РАЗБОР(ок,['Проверочное слово — <b>мОре</b>: под ударением ясно слышно о. Значит, м<b>о</b>ряк.',
          'Под ударением в родственнике <b>мОре</b> слышно о, а не а. Пишем м<b>о</b>ряк.'][в])) +
      (ок ? ПРАВИЛО('Безударную гласную в корне проверяют <b>однокоренным словом</b>, где она под ударением: моряк — мОре.') : '');
  }

  /* 9. Строка журнала */
  function F9(s){
    const Н=270, в=s.ответ9, ок=в===0, М=Р();
    const с1=['Молодой','моряк','любит'], с2=['морской','ветер','и'], с3=['морковный','пирог.'], род=['моряк','морской'];
    const ряд=(слова,y)=>{ let x=26; return слова.map(w=>{ const ш=w.length*11.4+10, ловушка=ок&&w==='морковный', g=`<g>${ок&&род.includes(w)?`<rect x="${x-4}" y="${y-22}" width="${ш}" height="32" rx="6" fill="rgba(143,209,168,.35)" stroke="${GREEN}"/>`:''}${ловушка?`<rect x="${x-4}" y="${y-22}" width="${ш}" height="32" rx="6" fill="none" stroke="${RED}" stroke-dasharray="4 3"/>`:''}${т(x,y,w,20,ЧЕРНИЛА,false,'start')}</g>`; x+=ш+2; return g; }).join(''); };
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Вечером юнга записывает: «<b>Молодой моряк любит морской ветер и морковный пирог.</b>» Сколько здесь слов, родственных слову «море»?') +
      `<div class="pic">${свг(`
        ${М.небо(336,96,{закат:true,солнце:[60,84,12]})}
        ${М.море(96,30,336,{дорожка:60})}
        ${М.лист(12,116,312,Н-128,{})}
        ${ряд(с1,158)}${ряд(с2,198)}${ряд(с3,238)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2','3','1'],0,в,9) +
      (в==null ? СКАЗ('Вопрос','Сколько слов родственны слову «море»?') :
        РАЗБОР(ок,['<b>Моряк</b> и <b>морской</b> — два. «Морковный» — от «морковь», к морю отношения не имеет.',
          'Три — если посчитать «морковный». Но морковь растёт в огороде: смысл другой. Родственников два.',
          'Кроме «моряка» есть ещё <b>морской</b> (ветер). Родственников два.'][в])) +
      (ок ? ПРАВИЛО('Родственное слово проверяй двумя вопросами: <b>есть ли общий корень</b> и <b>близок ли смысл</b>.') : '');
  }

  /* 10. Дерево выросло */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=320;
    const полное = РОДНЯ.slice();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'К вечеру дерево морских слов покрылось листвой, а корень под землёй светится, как фонарь. Смотритель отрывает на память листок со словом «моряк»: «Держи, юнга. Ты теперь знаешь, как узнать родню у любого слова».'
        : 'Дерево ещё не выросло — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${остров(s,Н,полное,null,null)}
        ${[['общий корень + близкий смысл',GOLD]].map(([t0,ц],i)=>`<g>${проявить('8s',0.2,0.3)}${подпись(168,Н-12,t0,ц,13)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Однокоренные</b> слова имеют общий корень и близки по смыслу: море, морской, моряк. <b>Корень</b> — их общая часть, его отмечают дугой. Формы одного слова, синонимы (моряк — матрос) и слова с похожими буквами (вода — водитель, морковь) — не родственники. В корне согласные могут чередоваться (берег — бережок); в сложных словах два корня. Безударную гласную в корне проверяют родственным словом.') +
      ПРАВИЛО('<b>Общий корень + близкий смысл = родственники.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какое слово родственно слову «рыба»?', варианты:[{т:'рыбак',ок:true},{т:'рынок',ок:false}], разбор:'Общий корень рыб и смысл.' },
    { вопрос:'Где корень в слове «парусник»?', варианты:[{т:'пар',ок:false},{т:'парус',ок:true}], разбор:'Парус — парусный — парусник.' },
    { вопрос:'Однокоренные ли «волна» и «волнистый»?', варианты:[{т:'да',ок:true},{т:'нет',ок:false}], разбор:'Корень волн, смысл близкий.' },
    { вопрос:'«Гора, горы, горой» — это…', варианты:[{т:'однокоренные слова',ок:false},{т:'формы одного слова',ок:true}], разбор:'Меняется только окончание.' },
    { вопрос:'В_дица (проверь родственником)', варианты:[{т:'о',ок:true},{т:'а',ок:false}], разбор:'Вóды — водица.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r864Reset()")}</div>` +
        ПРАВИЛО('<b>Общий корень + близкий смысл = родственники.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r864Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Родственник или нет', задания:[
    {q:'Лес — лесник?', в:0, варианты:['родственники','не родственники'], раз:'Корень лес, смысл близкий.'},
    {q:'Гора — горе?', в:1, варианты:['родственники','не родственники'], раз:'Смысл разный.'},
    {q:'Снег — снежинка?', в:0, варианты:['родственники','не родственники'], раз:'г — ж чередуются.'},
    {q:'Смелый — храбрый?', в:1, варианты:['родственники','не родственники'], раз:'Синонимы, корни разные.'}
  ]};
  const Т2 = { имя:'Найди корень', задания:[
    {q:'Корень в слове «водолаз»?', в:0, варианты:['вод и лаз','водол'], раз:'Сложное слово: вод-о-лаз.'},
    {q:'Корень в слове «рыбачок»?', в:1, варианты:['рыбачо','рыб'], раз:'Рыба, рыбак, рыбачок.'},
    {q:'Корень в слове «подснежник»?', в:0, варианты:['снеж','подснеж'], раз:'Снег — снежный: снеж.'},
    {q:'Корень в слове «песочек»?', в:1, варианты:['песочек','песоч'], раз:'Песок — песочек: к — ч.'}
  ]};
  const Т3 = { имя:'Проверь гласную', задания:[
    {q:'Л_сной (проверь: лес)', в:0, варианты:['е','и'], раз:'Лес — лесной.'},
    {q:'Тр_ва (проверь: травы)', в:1, варианты:['о','а'], раз:'Тра́вы — трава.'},
    {q:'Р_ка (проверь: реки)', в:0, варианты:['е','и'], раз:'Рéки — река.'},
    {q:'В_лна (проверь: во́лны)', в:1, варианты:['а','о'], раз:'Во́лны — волна.'}
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
        в, "r864T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r864TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L864 = {
    id: ID,
    title: 'Корень слова и однокоренные',
    ico: '🌳',
    src: 'Русский язык · 3 класс · Состав слова', subj: 'rus',
    explain: [
      'На острове растёт дерево морских слов. Приживаются только слова с корнем мор и о море: море, морской, моряк, приморье, заморский.',
      'Корень — общая часть родственных слов, его отмечают дугой: мор-як, при-мор-ье.',
      'Море, моря, морем — формы одного слова, а не однокоренные слова.',
      'Моряк и матрос близки по смыслу, но корни разные — это синонимы.',
      'Водитель — от «водить», а не от «вода»: похожие буквы, разный смысл.',
      'В корне согласные чередуются: берег — бережок.',
      'В сложном слове два корня: мор-е-плаватель.',
      'Безударную гласную в корне проверяют родственным словом: моряк — мОре.',
      '«Молодой моряк любит морской ветер и морковный пирог»: родственников «моря» два.',
      'Итог: общий корень и близкий смысл — родственники.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: родственник или нет.',
      'Тренажёр 2: найди корень.',
      'Тренажёр 3: проверь гласную.'
    ],
    check: {
      q: 'Какое слово родственно слову «море»?',
      choices: ['морковь','морской','матрос'],
      ans: 1,
      exp: 'Морской — общий корень мор и близкий смысл.'
    },
    tasks: [
      { q:'Какой ряд — однокоренные слова?', kind:'choice', choices:['море, моря, морем','море, морской, моряк','моряк, матрос'], ans:1, tol:0,
        hints:['Нужны разные слова с общим корнем.'], sol:'Море, морской, моряк.' },
      { q:'Какое слово НЕ родственно слову «вода»?', kind:'choice', choices:['водяной','подводный','водитель'], ans:2, tol:0,
        hints:['Проверь смысл.'], sol:'Водитель — от «водить».' },
      { q:'Сколько корней в слове «мореплаватель»?', kind:'unit', ans:2, tol:0,
        hints:['Море + плавать.'], sol:'Два.' }
    ]
  };

  function render(el){
    if(!window.РМ){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L864.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    s.новое1=null; s.упало1=null;
    const ЗАГОЛОВКИ={1:'Дерево слов',2:'Где корень',3:'Одно слово в нарядах',4:'Моряк и матрос',5:'Вода и водитель',
      6:'Берег и бережок',7:'Два корня',8:'Позови родственника',9:'Запись в журнале',10:'Дерево выросло',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l864" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Корень слова'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r864Слово=(i)=>{ const s=S(); const в=Array.isArray(s.выр1)?s.выр1.slice():[];
    if(в.includes(i)) return;
    if(СЛОВА[i].ч){ в.push(i); s.выр1=в; s.ош1=null; s.новое1=i; if(РОДНЯ.every(k=>в.includes(k))) s.дело_дерево=true; }
    else { s.ош1=i; s.упало1=i; }
    chRender(0); };
  window.r864Корень=(i,j)=>{ const s=S(); const р=Object.assign({},s.реш2||{}); р[i]=j; s.реш2=р;
    if(ДЕЛЕНИЯ.every((x,k)=>р[k]===x.верно)) s.дело_корень=true; chRender(0); };
  window.r864Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; if(f===9&&к===0) s.дело_строка=true; chRender(0); };
  window.r864Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r864Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r864T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r864TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L864; else arr.push(L864); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU864={render:render, L:L864};
})();
