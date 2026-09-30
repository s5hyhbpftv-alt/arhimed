/* ============ РУССКИЙ ЯЗЫК · УРОК 911 · «РАЗРЯДЫ ПРИЛАГАТЕЛЬНЫХ» ============
   6 класс, «Имя прилагательное». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–910). Рисунки — общая библиотека
   MVP/data/ris_more.js. НОВЫЕ ГЕРОИ: лиса Лика и ворона (лиса, ворона), следы лап,
   кусок сыра; машина трёх вопросов рисуется в самом уроке.

   СЮЖЕТ. «Дело о пропавшем сыре». У Главка (урок 910) пропал сыр. Архимед ведёт
   расследование по трём видам улик: какой вор (качественные), из чего и когда
   (относительные), чьи следы (притяжательные). Развязка — как в басне: ворона
   на сосне с сыром и лиса, которая ей льстит.

   РУКАМИ: три улики; «хитрометр» — хитрая, хитрее, хитрейшая; машина трёх
   вопросов — восемь слов по трём амфорам; три пробы качественного; погоня по
   следу — шесть развилок, три ошибки — след остыл; четыре перевёртыша.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     качественные — признак, который может быть в большей или меньшей степени:
       есть степени сравнения (хитрее), краткая форма (хитёр), сочетаются с
       «очень»;
     относительные — признак через отношение к материалу, времени, месту
       (глиняный, утренний, морской); степеней и краткой формы нет;
     притяжательные — принадлежность, вопрос «чей?» (лисий, вороний, мамин,
       отцов);
     относительные и притяжательные могут употребляться в значении
       качественных: золотое кольцо — золотой голос, железный замок — железная
       воля. */
(function(){
  'use strict';

  const ID = 911;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЦК='#b8860b', ЦО='#1a5a8a', ЦП='#c8501a';   /* качественные, относительные, притяжательные */
  const ФК='#fff0b8', ФО='#d8ecf8', ФП='#ffd8c0';

  const ДЕЛА = [
    {ключ:'машина',  имя:'Запустить машину трёх вопросов', итог:'8 из 8'},
    {ключ:'погоня',  имя:'Пройти по следу',                итог:'6 развилок'},
    {ключ:'лесть',   имя:'Разгадать перевёртыши',          итог:'4 из 4'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const РАЗРЯДЫ = ['качественное','относительное','притяжательное'];
  /* кадр 1: три улики */
  const УЛИКИ = [
    {к:'следы',    кн:'Следы',     сл:'лисьи следы',    в:'чьи?',              р:2, речь:'Следы ведут от прилавка к лесу. Чьи они? <b>Лисьи</b>!'},
    {к:'миска',    кн:'Миска',     сл:'глиняная миска', в:'какая? из чего?',   р:1, речь:'Сыр лежал в миске. Миска <b>глиняная</b> — сделана из глины.'},
    {к:'свидетель',кн:'Свидетель', сл:'хитрый вор',     в:'какой?',            р:0, речь:'Мирто видела рыжую тень: «Вор был <b>хитрый</b> и очень быстрый!»'}
  ];
  /* кадр 5: машина */
  const МАШИНА = [
    {сл:'быстрый',    р:0, поч:'можно «быстрее», «очень быстрый» — это качество'},
    {сл:'деревянный', р:1, поч:'сделан из дерева — отношение к материалу'},
    {сл:'лисий',      р:2, поч:'чей? — лисы: принадлежность'},
    {сл:'утренний',   р:1, поч:'когда? утром — отношение ко времени'},
    {сл:'вкусный',    р:0, поч:'можно «вкуснее», «очень вкусный» — это качество'},
    {сл:'вороний',    р:2, поч:'чей? — вороны: принадлежность'},
    {сл:'морской',    р:1, поч:'где? у моря — отношение к месту'},
    {сл:'тяжёлый',    р:0, поч:'можно «тяжелее», «очень тяжёлый» — это качество'}
  ];
  /* кадр 7: погоня — на каждой развилке нужен разряд */
  const РАЗВИЛКИ = [
    {надо:2, вар:['лисья нора','лесная тропа'],   ок:0, поч:'лисья — чья? — притяжательное; лесная — относительное'},
    {надо:1, вар:['старый мост','каменный мост'], ок:1, поч:'каменный — из камня: относительное; старый — качественное'},
    {надо:0, вар:['узкая тропа','козья тропа'],   ок:0, поч:'узкая — можно «у́же»: качественное; козья — притяжательное'},
    {надо:2, вар:['свежий след','заячий след'],   ок:1, поч:'заячий — чей? — притяжательное; свежий — качественное'},
    {надо:1, вар:['сосновый бор','густой бор'],   ок:0, поч:'сосновый — из сосен: относительное; густой — качественное'},
    {надо:0, вар:['воронья сосна','высокая сосна'], ок:1, поч:'высокая — можно «выше»: качественное; воронья — притяжательное'}
  ];
  /* кадр 8: перевёртыши; 0 — качественное, 1 — относительное */
  const ПЕРЕВ = [
    {ф:'золотое кольцо', ок:1, поч:'кольцо из золота — материал'},
    {ф:'золотой голос',  ок:0, поч:'голос не из золота: он прекрасный — здесь слово стало качественным'},
    {ф:'железный замок', ок:1, поч:'замок из железа — материал'},
    {ф:'железная воля',  ок:0, поч:'воля не из железа: она очень твёрдая — здесь слово стало качественным'}
  ];

  const CSS=`
  #lvis .s6.l911{gap:14px}
  #lvis .s6.l911 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l911 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l911 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l911 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l911 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l911 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l911 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l911 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l911 .карт .текст b{color:${GOLD}}
  #lvis .s6.l911 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l911 .правило b{color:${GOLD}}
  #lvis .s6.l911 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l911 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l911 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l911 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l911 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l911 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l911 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l911 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l911 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l911 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l911 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l911 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l911 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l911 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l911 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l911 .буйки button.мимо{border-color:${RED};animation:l911нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l911нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l911 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l911 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l911 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l911 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l911 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l911 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l911 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l911 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l911 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l911 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l911 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l911 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l911 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l911 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l911 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l911 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l911 .уровни .точка.сейчас{background:${GOLD};animation:l911dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l911dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l911 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l911{-webkit-text-size-adjust:100%}
  #lvis .s6.l911 [data-anim]{animation:l911rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l911rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l911 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l911 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l911 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l911 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l911 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l911 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l911 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l911 [data-anim]{animation:none!important}
    #lvis .s6.l911 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l911 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l911-style');
      if(!s){ s=document.createElement('style'); s.id='l911-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r911Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Дело о сыре</span><b class="${всё?'готово':''}">${
        всё?'дело закрыто':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  const сдвигРаз = (из,в,длит,задержка) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" from="${из}" to="${в}" dur="${длит}" begin="${(задержка||0).toFixed(2)}s"
       fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  /* слово с выделенным окончанием */
  const тОк = (x,y,осн,ок,кегль,цвет,цветОк,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль}" font-weight="bold" fill="${цвет}" font-family="Georgia,'Times New Roman',serif">${esc(осн)}<tspan fill="${цветОк}">${esc(ок)}</tspan></text>`;
  const Р = () => window.РМ;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c911-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c911-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.64+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c911-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c911-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c911-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c911-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  const ЦВ=[ЦК,ЦО,ЦП], ФН=[ФК,ФО,ФП];
  /* бирка со словом в цвете разряда */
  const бирка = (cx,y,t0,р,опц) => { const о=опц||{}, к=о.кегль||14, ш=String(t0).length*к*0.64+20, в=к+13;
    return `<g filter="url(#c911-тень)"><rect x="${(cx-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="${р==null?'#fffaf0':ФН[р]}" stroke="${р==null?ОБВОД:ЦВ[р]}" stroke-width="${р==null?1:2}"/></g>${т(cx,y+в/2+к*0.35,t0,к,ЧЕРНИЛА,true)}`; };
  const земля = (y0,Н) => `<path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28} V${Н} H0 Z" fill="url(#рм-холм)"/>
      <path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28}" stroke="#b6dc84" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M0 ${y0+8} Q168 ${y0-6} 336 ${y0+8} V${Н} H0 Z" fill="url(#рм-песок)"/>
      <g data-декор="1" opacity=".5">${Array.from({length:14},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${y0+20+((k*29)%Math.max(10,Н-y0-26))}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>`;
  const лавка = (cx,y,ш) => { const n=Math.round(ш/22), л=cx-ш/2;
    return `<g><ellipse cx="${cx+4}" cy="${y+2}" rx="${ш*0.54}" ry="4.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${л+6}" y="${y-136}" width="5" height="136" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <rect x="${л+ш-11}" y="${y-136}" width="5" height="136" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      ${Array.from({length:n},(_,k)=>`<path d="M${(л-6+k*(ш+12)/n).toFixed(1)} ${y-146} h${((ш+12)/n).toFixed(1)} v16 q-${((ш+12)/n/2).toFixed(1)} 9 -${((ш+12)/n).toFixed(1)} 0 z" fill="${k%2?'#fbf4e2':'#d0503a'}" stroke="${ОБВОД}" stroke-width=".7"/>`).join('')}
      <rect x="${л-6}" y="${y-149}" width="${ш+12}" height="5" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="${л}" y="${y-36}" width="${ш}" height="36" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${[0.34,0.67].map(t0=>`<line x1="${л}" y1="${y-36+36*t0}" x2="${л+ш}" y2="${y-36+36*t0}" stroke="${ОБВОД}" stroke-width=".7" opacity=".45"/>`).join('')}
      <rect x="${л-5}" y="${y-43}" width="${ш+10}" height="8" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1"/></g>`; };
  const рынок = (Н,y0) => `${Р().небо(336,y0+10,{облака:[[60,24,0.5,8],[286,36,0.45,-5]]})}${Р().город(y0,{})}${плиты(y0,Н)}`;
  const миска = (cx,y) => `<path d="M${cx-20} ${y-10} Q${cx} ${y+14} ${cx+20} ${y-10} Z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1"/><ellipse cx="${cx}" cy="${y-10}" rx="20" ry="4.4" fill="#5a2a12" stroke="${ОБВОД}" stroke-width="1"/>
    <circle cx="${cx-6}" cy="${y-10}" r="1.2" fill="#f4d060"/><circle cx="${cx+5}" cy="${y-9}" r="1" fill="#f4d060"/>`;
  const кольцо = (cx,cy,rx,ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#ffd76a" stroke-width="2.4" stroke-dasharray="6 5">${анЛин('stroke-dashoffset','0;22','1.6s')}</ellipse>`;
  const перо = (x,y,угол) => `<g transform="translate(${x} ${y}) rotate(${угол})"><path d="M0 0 Q7 -14 2 -30 Q-6 -16 0 0 Z" fill="#2a2a30" stroke="${ОБВОД}" stroke-width=".8"/><path d="M0 4 L1.4 -26" stroke="#8a8a92" stroke-width=".9"/></g>`;
  const куст = (cx,y,м) => `<g transform="translate(${cx} ${y}) scale(${м})">${[[-22,-10,20],[0,-20,24],[22,-10,20],[-10,-2,18],[12,-2,18]].map(([dx,dy,r],k)=>`<circle cx="${dx}" cy="${dy}" r="${r}" fill="${k%2?'#4f8a44':'#3f7a3c'}" stroke="#1e3a24" stroke-width=".8"/>`).join('')}<path d="M-20 -22 q8 -8 18 -4 M6 -30 q8 -6 16 0" stroke="#7ab06a" stroke-width="2" fill="none" opacity=".8"/></g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Место происшествия */
  function F1(s){
    const Н=300, М=Р(), вид=s.вид1||{}, к=s.ул1, все=УЛИКИ.every(u=>вид[u.к]), в=s.ответ1, ок=в===0;
    const у=к==null?null:УЛИКИ.find(u=>u.к===к);
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Беда на рынке! У Главка пропал сыр — тот самый, что он отложил для Архимеда. Архимед берётся за расследование: «Осмотрим всё по порядку. Три улики — три вопроса».') +
      `<div class="pic">${свг(`
        ${рынок(Н,150)}
        ${лавка(150,264,190)}
        ${миска(150,218)}
        ${М.следы(200,274,312,286,7,{})}
        ${перо(228,262,40)}
        ${М.торговец(294,266,0.66,{поза:'сердит',влево:true})}
        ${М.архимед(28,270,0.56,{поза:'указывает'})}${М.девочка(68,272,0.48,{поза:'стоит',рот:'о'})}
        ${к==='следы'?кольцо(256,281,64,13):''}${к==='миска'?кольцо(150,214,28,14):''}${к==='свидетель'?кольцо(68,244,18,34):''}
        ${у?бирка(168,16,у.сл,у.р,{кегль:16})+подпись(168,70,у.в,'#fff4c0',12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask три">${УЛИКИ.map((u,i)=>BTN(3+i,вид[u.к]?'hit':'',u.кн,"r911Улика('"+u.к+"')")).join('')}</div>` +
      (у ? A(6,'карт','<span class="метка">Улика: '+у.кн.toLowerCase()+'</span><div class="текст">'+у.речь+'</div>') : СКАЗ('Начни','Осмотри следы, миску и расспроси свидетеля.')) +
      (!все ? '' :
        ОТВЕТЫ('три',['лисьи','глиняная','хитрый'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Три прилагательных — три разных смысла. Какое из них отвечает на вопрос <b>«чей?»</b>') :
          РАЗБОР(ок,['Верно: <b>лисьи</b> — чьи? Оно называет хозяина следов. «Глиняная» говорит о материале, «хитрый» — о качестве.',
            '«Глиняная» — из чего сделана миска. На вопрос «чьи?» отвечает слово <b>лисьи</b>.',
            '«Хитрый» — какой вор, это его качество. На вопрос «чьи?» отвечает слово <b>лисьи</b>.'][в]))) +
      (ок ? ПРАВИЛО('По значению прилагательные делятся на три <b>разряда</b>: <b>качественные</b> (хитрый), <b>относительные</b> (глиняный) и <b>притяжательные</b> (лисий).') : '');
  }

  /* 2. Качественные: хитрометр */
  function F2(s){
    const Н=300, М=Р(), ур=Math.min(s.хит2||0,2), в=s.ответ2, ок=в===0;
    const угол=-60+ур*60, сл=['хитрая','хитрее','хитрейшая'][ур];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Следы привели к опушке. Там сидит лиса Лика и делает вид, что ни при чём. «<b>Хитрая</b>, — шепчет Мирто. — Насколько?» Архимед достаёт свой прибор — хитрометр. Прибавь хитрости и следи за словом.') +
      `<div class="pic">${свг(`
        ${М.небо(336,170,{облака:[[60,40,0.5,8]]})}
        ${земля(190,Н)}
        ${М.сосна(40,230,0.7)}${куст(306,226,0.7)}
        ${М.лиса(150,272,1.5,{хитрость:ур})}
        <g filter="url(#c911-тень)"><path d="M210 96 A48 48 0 0 1 306 96 Z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1.2"/></g>
        ${[0,1,2].map(i=>{ const a1=(-180+i*60)*Math.PI/180, a2=(-120+i*60)*Math.PI/180; return `<path d="M258 96 L${(258+44*Math.cos(a1)).toFixed(1)} ${(96+44*Math.sin(a1)).toFixed(1)} A44 44 0 0 1 ${(258+44*Math.cos(a2)).toFixed(1)} ${(96+44*Math.sin(a2)).toFixed(1)} Z" fill="${['#ffe9a0','#ffc860','#f08a3a'][i]}" opacity="${i<=ур?1:0.3}"/>`; }).join('')}
        <g transform="rotate(${угол} 258 96)">${ДВИЖ&&ур>0?`<animateTransform attributeName="transform" type="rotate" from="${угол-60} 258 96" to="${угол} 258 96" dur="0.6s" fill="freeze"/>`:''}<path d="M256 96 L258 56 L260 96 Z" fill="#a0200e" stroke="${ОБВОД}" stroke-width=".7"/></g>
        <circle cx="258" cy="96" r="5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
        ${т(258,114,'хитрометр',10,ИНК,true,'middle','#14221a')}
        ${бирка(96,18,сл,0,{кегль:18})}
        ${подпись(96,80,['какая?','ещё сильнее','сильнее всех'][ур],GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (ур<2 ? `<div class="ask">${BTN(4,'','Ещё хитрее!',"r911Хитрее()")}</div>` + СКАЗ('Смотри','Хитрости становится больше — и слово меняется.') :
        ОТВЕТЫ('',['он бывает больше или меньше','он всегда одинаковый'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','Хитрая — хитрее — хитрейшая. Что можно сказать о признаке «хитрый»?') :
          РАЗБОР(ок,['Верно: качество может проявляться <b>сильнее или слабее</b>. Поэтому у таких слов есть степени сравнения: хитрее, хитрейший.',
            'Стрелка хитрометра только что двигалась! Качество бывает <b>больше или меньше</b>: хитрая, хитрее, хитрейшая.'][в]))) +
      (ок ? ПРАВИЛО('<b>Качественные</b> прилагательные называют признак, который может быть <b>в большей или меньшей степени</b>: хитрый — хитрее. У них есть краткая форма (хитёр) и они сочетаются со словом «очень».') : '');
  }

  /* 3. Относительные */
  function F3(s){
    const Н=292, М=Р(), в=s.ответ3, ок=в===0;
    const картинка=(x,y,тело)=>`<clipPath id="c911-к${x}"><rect x="${x}" y="${y}" width="120" height="56" rx="8"/></clipPath><g clip-path="url(#c911-к${x})"><g transform="translate(${x} ${y})">${тело}</g></g><rect x="${x}" y="${y}" width="120" height="56" rx="8" fill="none" stroke="${ЦО}" stroke-width="1.6"/>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед осматривает полку в лавке. Каждая вещь из чего-то сделана: миска <b>глиняная</b>, гиря <b>бронзовая</b>, ящик <b>деревянный</b>. Может ли миска быть «глинянее», чем другая?') +
      `<div class="pic">${свг(`
        <rect width="336" height="${Н}" fill="#ebe0c8"/><rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".18" data-декор="1"/>
        <rect x="14" y="98" width="308" height="9" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/>
        ${миска(62,88)}
        ${М.гиря(168,98,1.7,'')}
        <rect x="246" y="62" width="56" height="36" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/><path d="M246 74 H302 M246 86 H302 M274 62 V98" stroke="${ОБВОД}" stroke-width=".7" opacity=".5"/>
        ${бирка(62,112,'глиняная',1,{кегль:12})}${бирка(168,112,'бронзовая',1,{кегль:12})}${бирка(274,112,'деревянный',1,{кегль:12})}
        ${картинка(30,154,`${М.небо(120,40,{закат:true,солнце:[30,30,7],облака:[]})}<rect y="36" width="120" height="20" fill="#d8c8a4"/>`)}
        ${картинка(186,154,`${М.небо(120,24,{облака:[]})}${М.море(20,36,120,{})}`)}
        ${бирка(90,216,'утренний рынок',1,{кегль:12})}${бирка(246,216,'морской берег',1,{кегль:12})}
        ${ок?подпись(168,Н-14,'из чего? когда? где?',BLUE,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['нет: миска либо из глины, либо нет','да: бывает миска глинянее другой'],0,в,3) +
      (в==null ? СКАЗ('Вопрос','Можно ли сказать «эта миска глинянее той» или «очень глиняная»?') :
        РАЗБОР(ок,['Верно: у такого признака нет «больше» и «меньше». Из глины — и всё. Так же «утренний» (когда?) и «морской» (где?).',
          'Так не говорят: миска либо из глины, либо нет. У таких слов <b>нет степеней</b> и нельзя сказать «очень».'][в])) +
      (ок ? ПРАВИЛО('<b>Относительные</b> прилагательные называют признак через отношение к <b>материалу, времени, месту</b>: глиняный, утренний, морской. У них нет степеней сравнения и краткой формы.') : '');
  }

  /* 4. Притяжательные */
  function F4(s){
    const Н=292, М=Р(), в=s.ответ4, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На песке — цепочка следов, рядом чёрное перо и нож, забытый Главком. Архимед спрашивает о каждой вещи одно и то же: <b>чья</b> она? След — <b>лисий</b>, перо — <b>воронье</b>, нож — <b>Главков</b>.') +
      `<div class="pic">${свг(`
        ${М.небо(336,130,{облака:[[80,40,0.5,8],[250,30,0.45,-5]]})}
        ${земля(150,Н)}
        ${М.лиса(292,206,0.8,{поза:'крадётся'})}
        ${куст(286,214,0.9)}
        ${М.следы(40,262,236,214,10,{проявить:true})}
        ${перо(116,206,24)}
        ${М.нож(34,194,0.8,20)}
        ${М.архимед(300,Н-6,0.52,{поза:'указывает',влево:true})}
        ${бирка(170,258,'лисий след',2,{кегль:12})}${бирка(150,158,'воронье перо',2,{кегль:12})}${бирка(62,214,'Главков нож',2,{кегль:12})}
        ${подпись(168,30,ок?'чей? чья? чьё? чьи?':'один вопрос на всё',ок?GREEN:GOLD,12.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['чей?','какой?','из чего?'],0,в,4) +
      (в==null ? СКАЗ('Вопрос','На какой вопрос отвечает слово «лисий»?') :
        РАЗБОР(ок,['Верно: <b>чей?</b> Лисий след — след лисы. Такие слова называют хозяина.',
          '«Какой?» подошло бы к «рыжий» или «свежий». А «лисий» называет хозяина: <b>чей?</b> — лисы.',
          'След не сделан из лисы. Слово называет хозяина следа: <b>чей?</b> — лисий.'][в])) +
      (ок ? ПРАВИЛО('<b>Притяжательные</b> прилагательные называют <b>принадлежность</b> и отвечают на вопрос <b>чей?</b>: лисий, вороний, мамин, отцов, Главков.') : '');
  }

  /* 5. Машина трёх вопросов */
  function F5(s){
    const Н=312, М=Р(), n=Math.min(s.маш5||0,МАШИНА.length), отв=s.отв5, все=n>=МАШИНА.length;
    const X=[58,168,278], м=МАШИНА[Math.min(n,МАШИНА.length-1)];
    const труба=(x)=>`M168 86 Q168 118 ${x} 128 V156`;
    const шар=отв&&отв.ок&&ДВИЖ?`<circle r="7" fill="${ФН[МАШИНА[отв.i].р]}" stroke="${ЦВ[МАШИНА[отв.i].р]}" stroke-width="2"><animateMotion path="${труба(X[МАШИНА[отв.i].р])}" dur="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;0.9;1" dur="0.9s" fill="freeze"/></circle>`:'';
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Улик всё больше. Архимед строит <b>машину трёх вопросов</b>: слово падает в воронку и катится по трубе в свою амфору. Трубу выбираешь ты.') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".12" data-декор="1"/>
        ${X.map(x=>`<path d="${труба(x)}" stroke="#5a3414" stroke-width="13" fill="none" stroke-linecap="round"/><path d="${труба(x)}" stroke="#c8905a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${труба(x)}" stroke="#f0c890" stroke-width="2" fill="none" opacity=".7" transform="translate(-2 0)"/>`).join('')}
        <path d="M134 50 H202 L178 88 H158 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1.2"/><rect x="130" y="46" width="76" height="7" rx="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".9"/>
        ${шар}
        ${X.map((x,j)=>{ const слова=МАШИНА.slice(0,n).filter(w=>w.р===j);
          return `<g><ellipse cx="${x+3}" cy="256" rx="40" ry="4" fill="#0b1c2a" opacity=".4"/>
            <path d="M${x-22} 156 H${x+22} L${x+20} 166 Q${x+46} 184 ${x+40} 226 Q${x+36} 254 ${x} 254 Q${x-36} 254 ${x-40} 226 Q${x-46} 184 ${x-20} 166 Z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1.2"/>
            <rect x="${x-25}" y="152" width="50" height="7" rx="3" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1"/>
            <rect x="${x-41}" y="178" width="82" height="62" rx="8" fill="${ФН[j]}" stroke="${ЦВ[j]}" stroke-width="1.4" opacity=".96"/>
            ${слова.map((w,i)=>т(x,195+i*17,w.сл,10.5,ЧЕРНИЛА,true)).join('')}
            ${т(x,272,['какой?','из чего? когда?','чей?'][j],10.5,ИНК,true)}${т(x,286,['качественное','относительное','притяжательное'][j],9.5,МУТ,true)}</g>`; }).join('')}
        ${все ? подпись(168,28,'все восемь слов разобраны',GREEN,12.5) : бирка(168,10,м.сл,null,{кегль:17})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask">${РАЗРЯДЫ.map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',['какой? — ','из чего? когда? где? — ','чей? — '][j]+t0,'r911Машина('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Машина работает! Качественные: <b>быстрый, вкусный, тяжёлый</b>. Относительные: <b>деревянный, утренний, морской</b>. Притяжательные: <b>лисий, вороний</b>.')
        : отв ? (отв.ок ? РАЗБОР(true,'<b>'+МАШИНА[отв.i].сл+'</b> — '+МАШИНА[отв.i].поч+'. Следующее слово — в воронке.')
                        : РАЗБОР(false,'Труба не та: «'+м.сл+'» — '+м.поч+'.'))
        : СКАЗ('Подсказка','Сначала спроси «чей?». Не подходит — попробуй «очень» и «-ее». Не выходит — значит, относительное.')) +
      (все ? ПРАВИЛО('Три вопроса по порядку: <b>чей?</b> → притяжательное. <b>Можно «очень» и «-ее»?</b> → качественное. <b>Иначе</b> → относительное.') : '');
  }

  /* 6. Три пробы качественного */
  function F6(s){
    const Н=292, М=Р(), пр=s.проб6||{}, все=[0,1,2].every(i=>пр[i]), в=s.ответ6, ок=в===0;
    const пробы=[['очень быстрый','очень деревянный'],['быстрее','деревяннее'],['быстр','деревян']];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Вор был <b>быстрый</b>, прилавок — <b>деревянный</b>. Архимед проверяет оба слова тремя пробами: слово «очень», степень сравнения, краткая форма. Проведи все три.') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".1" data-декор="1"/>
        ${М.свиток(20,18,296,246)}
        ${бирка(96,30,'быстрый',все?0:null,{кегль:15})}${бирка(240,30,'деревянный',все?1:null,{кегль:15})}
        <line x1="168" y1="34" x2="168" y2="254" stroke="#a88a5a" stroke-width=".8" stroke-dasharray="3 4"/>
        ${пробы.map(([а,б],i)=>{ const y=108+i*58, есть=пр[i];
          return `${т(168,y-24,['проба «очень»','проба «-ее»','краткая форма'][i],10,КАМЕНЬ,true)}
            ${есть?`${т(96,y,а,12.5,'#1a6a3a',true)}<circle cx="96" cy="${y+14}" r="7" fill="#6ad08a" stroke="${ОБВОД}" stroke-width=".8"/>${т(96,y+18,'✓',10,'#fff',true)}
              <text x="240" y="${y}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#a0200e" text-decoration="line-through" font-family="Georgia,serif">${б}</text><circle cx="240" cy="${y+14}" r="7" fill="#e86a5a" stroke="${ОБВОД}" stroke-width=".8"/>${т(240,y+18,'✗',10,'#fff',true)}`
              :`${т(96,y+6,'…',16,'#b8a27a',true)}${т(240,y+6,'…',16,'#b8a27a',true)}`}
            `; }).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask три">${['очень','-ее','кратко'].map((t0,i)=>BTN(3+i,пр[i]?'hit':'',t0,'r911Проба('+i+')')).join('')}</div>` +
      (!все ? СКАЗ('Пробы','Нажми каждую из трёх проб.') :
        ОТВЕТЫ('',['«быстрый» — качественное','«деревянный» — качественное'],0,в,6) +
        (в==null ? СКАЗ('Вопрос','Какое слово выдержало все три пробы?') :
          РАЗБОР(ок,['Верно: <b>быстрый</b> — очень быстрый, быстрее, быстр. А «деревянный» не прошёл ни одной: оно относительное.',
            'Посмотри на правый столбик: «очень деревянный», «деревяннее», «деревян» — так не говорят. Все пробы прошло слово <b>быстрый</b>.'][в]))) +
      (ок ? ПРАВИЛО('Три пробы качественного прилагательного: сочетается с <b>«очень»</b>, имеет <b>степень сравнения</b> (быстрее) и <b>краткую форму</b> (быстр).') : '');
  }

  /* 7. Погоня по следу */
  function F7(s){
    const Н=304, М=Р(), п7=s.пог7||{}, n=Math.min(п7.n||0,РАЗВИЛКИ.length), ош=Math.min(п7.ош||0,3), отв=s.отв7, все=n>=РАЗВИЛКИ.length, остыл=ош>=3&&!все;
    const р=РАЗВИЛКИ[Math.min(n,РАЗВИЛКИ.length-1)];
    const указатель=(x,t0,вкл)=>`<rect x="${x-2.5}" y="150" width="5" height="50" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <g filter="url(#c911-тень)"><rect x="${x-58}" y="126" width="116" height="28" rx="4" fill="url(#рм-доска)" stroke="${вкл?GOLD:ОБВОД}" stroke-width="${вкл?2.4:1.1}"/></g>${т(x,145,t0,12.5,'#2e2416',true)}`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА(остыл ? 'Три раза свернули не туда — и след остыл. Архимед возвращается к лавке: «Начнём погоню заново. Читай указатели внимательнее».'
        : 'Лика сбежала в лес! След раздваивается шесть раз. На каждой развилке — два указателя. Идти надо туда, где прилагательное <b>нужного разряда</b>. Три ошибки — и след остынет.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[60,96,0.45,6],[280,100,0.4,-5]]})}
        ${земля(176,Н)}
        ${все ? `${М.сосна(168,262,1.25)}${М.ворона(176,106,0.8,{сыр:true})}${М.лиса(250,Н-10,1.0,{влево:true,хитрость:1})}`
          : `<path d="M130 ${Н} H206 Q196 250 250 196 H224 Q176 236 168 262 Q160 236 112 196 H86 Q140 250 130 ${Н} Z" fill="#f0dcae" stroke="#b89a62" stroke-width="1.2"/>
            ${М.сосна(20,214,0.5)}${М.сосна(318,210,0.46)}${куст(168,196,0.5)}
            ${остыл?'':М.следы(168,290,168,256,3,{})}
            ${указатель(74,р.вар[0],false)}${указатель(262,р.вар[1],false)}`}
        ${М.архимед(все?60:40,Н-8,0.5,{поза:'указывает'})}${М.девочка(все?104:296,Н-8,0.46,{поза:все?'машет':'стоит'})}
        ${все ? подпись(168,30,'след привёл к сосне!',GREEN,13) : остыл ? подпись(168,30,'след остыл',RED,13)
              : бирка(168,14,'ищи: '+РАЗРЯДЫ[р.надо],р.надо,{кегль:14})}
        ${все||остыл?'':[0,1,2].map(i=>`<g transform="translate(${262+i*22} 72) scale(1.5)" opacity="${i<3-ош?1:0.25}"><ellipse cx="0" cy="2" rx="3" ry="2.6" fill="#ffd76a"/>${[[-3.4,-1.6],[-1.2,-3.6],[1.2,-3.6],[3.4,-1.6]].map(([tx,ty])=>`<ellipse cx="${tx}" cy="${ty}" rx="1.2" ry="1.6" fill="#ffd76a"/>`).join('')}</g>`).join('')}
        ${все||остыл?'':подпись(60,76,'развилка '+(n+1)+' из 6',GOLD,11)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Шесть развилок позади. На сосне сидит ворона — и в клюве у неё тот самый сыр! А под сосной уже вертится Лика.')
        : остыл ? РАЗБОР(false,'Подсказка: '+р.поч+'.') + `<div class="ask">${BTN(4,'','Начать погоню заново',"r911Заново()")}</div>`
        : `<div class="ask пара">${р.вар.map((w,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',w,'r911Развилка('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'Верно: '+РАЗВИЛКИ[отв.i].поч+'. След ведёт дальше.')
                         : РАЗБОР(false,'Не туда! '+р.поч.charAt(0).toUpperCase()+р.поч.slice(1)+'.'))
               : СКАЗ('Подсказка','Чей? — притяжательное. Можно «очень»? — качественное. Из чего, когда, где? — относительное.'))) +
      (все ? ПРАВИЛО('Лисья (чья?), каменный (из чего?), узкая (можно у́же) — у каждого разряда свой вопрос.') : '');
  }

  /* 8. Лесть и перевёртыши */
  function F8(s){
    const Н=312, М=Р(), n=Math.min(s.пер8||0,ПЕРЕВ.length), отв=s.отв8, все=n>=ПЕРЕВ.length;
    const п=ПЕРЕВ[Math.min(n,ПЕРЕВ.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА(все ? 'Ворона не выдержала похвал и каркнула во всё воронье горло. Сыр выпал — и Архимед поймал его раньше лисы!'
        : 'Лика задрала морду и запела: «Ах, ворона! У тебя <b>золотой</b> голос! И <b>железная</b> воля — держать сыр так долго…» Архимед настораживается: слова «золотой» и «железный» сменили смысл. Разберись, где материал, а где качество.') +
      `<div class="pic">${свг(`
        ${М.небо(336,190,{облака:[[270,40,0.5,-5]]})}
        ${земля(212,Н)}
        ${М.сосна(104,282,1.6)}
        ${М.ворона(112,84,0.95,{сыр:!все,каркает:все})}
        ${все?`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="-130 -170" to="0 0" dur="1.1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.5 0 0.9 0.6"/>`:''}${М.сырок(282,232,1.5)}</g>`:''}
        ${М.лиса(212,Н-12,1.05,{влево:true,хитрость:все?0:2})}
        ${М.архимед(296,Н-10,0.56,{поза:'указывает',влево:true})}
        ${все ? подпись(200,30,'сыр спасён!',GREEN,13) : реплика(170,118,Math.min(160,п.ф.length*8.7+30),п.ф+'!',[206,4])}
        ${ПЕРЕВ.map((x,i)=>i<n?бирка(240,30+i*26-(все?-26:0),x.ф,x.ок===0?0:1,{кегль:11}):'').join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Золотое кольцо, железный замок — <b>относительные</b> (материал). Золотой голос, железная воля — в переносном значении они стали <b>качественными</b>.')
        : `<div class="ask пара">${['качественное','относительное'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r911Перев('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'<b>'+ПЕРЕВ[отв.i].ф+'</b>: '+ПЕРЕВ[отв.i].поч+'.')
                         : РАЗБОР(false,'Подумай о смысле: '+п.поч+'.'))
               : СКАЗ('Подсказка','Вещь и правда из этого материала? Или слово сказано в переносном смысле — «очень хороший», «очень твёрдый»?'))) +
      (все ? ПРАВИЛО('Относительные и притяжательные прилагательные в <b>переносном значении</b> становятся <b>качественными</b>: золотое кольцо — золотой голос; лисий хвост — лисья хитрость.') : '');
  }

  /* 9. Схема расследования */
  function F9(s){
    const Н=296, М=Р(), в=s.ответ9, ок=в===2;
    const блок=(x,y,ш,t0,фон,обв,к)=>`<rect x="${x-ш/2}" y="${y-15}" width="${ш}" height="26" rx="8" fill="${фон}" stroke="${обв}" stroke-width="1.6"/>${т(x,y+3,t0,к||12,ЧЕРНИЛА,true)}`;
    const стрела=(d,t0,tx,ty)=>`<path d="${d}" stroke="#7a5a2a" stroke-width="1.8" fill="none" marker-end="url(#c911-стр)"/>${t0?т(tx,ty,t0,10.5,'#7a5a2a',true):''}`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Дело раскрыто. Архимед записывает на свитке схему, по которой шло расследование, — она годится для любого прилагательного. Проверь по ней слово <b>медвежий</b>.') +
      `<div class="pic">${свг(`
        <defs><marker id="c911-стр" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="#7a5a2a"/></marker></defs>
        ${М.доски(0,0,336,Н,true)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".1" data-декор="1"/>
        ${М.свиток(18,16,300,254)}
        ${блок(104,46,140,'Отвечает на «чей?»','#fffaf0','#7a5a2a',11.5)}
        ${стрела('M176 44 H206','да',190,38)}${блок(262,46,102,'притяжательное',ФП,ЦП,10.5)}${т(262,74,'лисий, вороний',9.5,ЦП,true)}
        ${стрела('M104 60 V94','нет',120,82)}
        ${блок(104,112,152,'Можно «очень», «-ее»?','#fffaf0','#7a5a2a',10.5)}
        ${стрела('M182 110 H206','да',193,104)}${блок(262,112,102,'качественное',ФК,ЦК,10.5)}${т(262,140,'хитрый, быстрый',9.5,ЦК,true)}
        ${стрела('M104 126 V160','нет',120,148)}
        ${блок(104,178,140,'относительное',ФО,ЦО)}${т(110,206,'глиняный, утренний, морской',9.5,ЦО,true)}
        ${ок?бирка(168,226,'медвежий — чей?',2,{кегль:12}):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',РАЗРЯДЫ,2,в,9) +
      (в==null ? СКАЗ('Вопрос','Медвежий (след, берлога) — какого разряда это слово?') :
        РАЗБОР(ок, ок ? 'Верно: первый же вопрос схемы — <b>чей?</b> Медвежий след — след медведя. Притяжательное.'
          : 'Начни с первого вопроса схемы: <b>чей</b> след? — медведя. Значит, слово <b>притяжательное</b>.')) +
      (ок ? ПРАВИЛО('Сначала «чей?», потом проба на «очень» — и разряд найден.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Сыр вернулся в лавку. Главк на радостях отрезал по куску и сыщикам, и свидетельнице — и даже лисе с вороной: «За науку!» Архимед подводит итог: «Какой, из чего и чей — три вопроса раскрыли дело».'
        : 'Дело ещё не закрыто — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,160,{закат:true,солнце:[60,112,13],облака:[[250,36,0.55,-6]]})}
        ${М.город(150,{})}${плиты(150,Н)}
        <rect x="0" y="140" width="336" height="${Н-140}" fill="#ff9a50" opacity=".12"/>
        ${лавка(176,250,150)}
        ${М.плод('сыр',176,196,20,{})}
        ${М.ворона(232,104,0.62,{влево:true})}
        ${М.торговец(292,252,0.6,{влево:true})}
        ${М.архимед(36,252,0.56,{поза:'указывает'})}${М.девочка(82,252,0.5,{поза:'машет'})}
        ${М.лиса(130,Н-84,0.62,{хитрость:1})}
        ${[['качественные: какой? — хитрый, хитрее',GOLD],['относительные: из чего? когда? где? — глиняный',BLUE],['притяжательные: чей? — лисий','#ffb890'],['золотой голос — уже качественное',GREEN]].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.45).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,268+i*21,t0,ц,10)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','У прилагательных три разряда. <b>Качественные</b> называют признак, который бывает больше или меньше: хитрый — хитрее, очень хитрый. <b>Относительные</b> — признак по материалу, времени, месту: глиняный, утренний, морской. <b>Притяжательные</b> отвечают на вопрос «чей?»: лисий, вороний. В переносном значении относительные и притяжательные становятся качественными: золотой голос.') +
      ПРАВИЛО('<b>Какой? Из чего? Чей? — три вопроса, три разряда.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'«Добрый» — какой разряд?', варианты:[{т:'качественное',ок:true},{т:'относительное',ок:false}], разбор:'Добрее, очень добрый — качественное.' },
    { вопрос:'«Деревянный» — какой разряд?', варианты:[{т:'качественное',ок:false},{т:'относительное',ок:true}], разбор:'Из дерева — относительное.' },
    { вопрос:'«Лисий» — какой разряд?', варианты:[{т:'притяжательное',ок:true},{т:'относительное',ок:false}], разбор:'Чей? — лисы. Притяжательное.' },
    { вопрос:'У какого слова есть степень сравнения?', варианты:[{т:'зимний',ок:false},{т:'холодный',ок:true}], разбор:'Холоднее. А «зимнее» в таком смысле не бывает.' },
    { вопрос:'«Золотые руки» — какой разряд у «золотые»?', варианты:[{т:'качественное',ок:true},{т:'относительное',ок:false}], разбор:'Переносное значение: очень умелые.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r911Reset()")}</div>` +
        ПРАВИЛО('<b>Какой? Из чего? Чей? — три вопроса, три разряда.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r911Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Какой разряд', задания:[
    {q:'смелый', в:0, варианты:РАЗРЯДЫ, раз:'Смелее, очень смелый.'},
    {q:'каменный', в:1, варианты:РАЗРЯДЫ, раз:'Из камня.'},
    {q:'волчий', в:2, варианты:РАЗРЯДЫ, раз:'Чей? — волка.'},
    {q:'вчерашний', в:1, варианты:РАЗРЯДЫ, раз:'Когда? — вчера.'},
    {q:'мамин', в:2, варианты:РАЗРЯДЫ, раз:'Чей? — мамы.'},
    {q:'сладкий', в:0, варианты:РАЗРЯДЫ, раз:'Слаще, очень сладкий.'}
  ]};
  const Т2 = { имя:'Проба «очень»', задания:[
    {q:'очень (весёлый)', в:0, варианты:['можно','нельзя'], раз:'Очень весёлый — качественное.'},
    {q:'очень (стеклянный)', в:1, варианты:['можно','нельзя'], раз:'Стеклянный — относительное.'},
    {q:'очень (городской)', в:1, варианты:['можно','нельзя'], раз:'Городской — относительное.'},
    {q:'очень (трудный)', в:0, варианты:['можно','нельзя'], раз:'Очень трудный — качественное.'},
    {q:'очень (заячий)', в:1, варианты:['можно','нельзя'], раз:'Заячий — притяжательное.'}
  ]};
  const Т3 = { имя:'Прямое или переносное', задания:[
    {q:'серебряная ложка', в:1, варианты:['качественное','относительное'], раз:'Ложка из серебра.'},
    {q:'серебряный голосок', в:0, варианты:['качественное','относительное'], раз:'Звонкий, чистый — переносное значение.'},
    {q:'каменный дом', в:1, варианты:['качественное','относительное'], раз:'Дом из камня.'},
    {q:'каменное лицо', в:0, варианты:['качественное','относительное'], раз:'Неподвижное — переносное значение.'},
    {q:'стальной нож', в:1, варианты:['качественное','относительное'], раз:'Нож из стали.'}
  ]};
  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask${номер===2?' пара':''}">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r911T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r911TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L911 = {
    id: ID,
    title: 'Разряды прилагательных',
    ico: '🦊',
    src: 'Русский язык · 6 класс · Имя прилагательное', subj: 'rus',
    explain: [
      'Три улики — три разряда: хитрый, глиняная, лисьи.',
      'Качественные: хитрая — хитрее — хитрейшая.',
      'Относительные: материал, время, место.',
      'Притяжательные: чей? лисий, вороний.',
      'Машина трёх вопросов: восемь слов по трём амфорам.',
      'Три пробы качественного: очень, -ее, краткая форма.',
      'Погоня по следу: шесть развилок.',
      'Перевёртыши: золотое кольцо — золотой голос.',
      'Схема: чей? → очень? → разряд.',
      'Итог: три вопроса, три разряда.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: какой разряд.',
      'Тренажёр 2: проба «очень».',
      'Тренажёр 3: прямое или переносное.'
    ],
    check: {
      q: 'Какое прилагательное притяжательное?',
      choices: ['хитрый','глиняный','лисий'],
      ans: 2,
      exp: 'Лисий — чей? След лисы.'
    },
    tasks: [
      { q:'Сколько разрядов у прилагательных по значению?', kind:'unit', ans:3, tol:0,
        hints:['Качественные, относительные, притяжательные.'], sol:'3.' },
      { q:'«Утренний» — это прилагательное', kind:'choice', choices:['качественное','относительное','притяжательное'], ans:1, tol:0,
        hints:['Когда? — утром.'], sol:'Относительное.' },
      { q:'У какого слова есть краткая форма?', kind:'choice', choices:['быстрый','деревянный','лисий'], ans:0, tol:0,
        hints:['Быстр.'], sol:'Быстрый — качественное.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.лиса){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L911.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Дело о пропавшем сыре',2:'Хитрометр',3:'Из чего, когда, где',4:'Чей след',5:'Машина трёх вопросов',
      6:'Три пробы',7:'Погоня по следу',8:'Золотой голос',9:'Схема расследования',10:'Дело закрыто',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l911" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Разряды прилагательных'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r911Улика=(к)=>{ const s=S(); s.ул1=к; const в=Object.assign({},s.вид1||{}); в[к]=true; s.вид1=в; chRender(0); };
  window.r911Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r911Хитрее=()=>{ const s=S(); s.хит2=Math.min(2,(s.хит2||0)+1); chRender(0); };
  window.r911Машина=(j)=>{ const s=S(); const n=s.маш5||0; if(n>=МАШИНА.length) return;
    if(МАШИНА[n].р===j){ s.маш5=n+1; s.отв5={i:n,ок:true}; if(n+1>=МАШИНА.length) s.дело_машина=true; }
    else s.отв5={i:n,ок:false,j:j};
    chRender(0); };
  window.r911Проба=(i)=>{ const s=S(); const п=Object.assign({},s.проб6||{}); п[i]=true; s.проб6=п; chRender(0); };
  window.r911Развилка=(j)=>{ const s=S(); const п=Object.assign({n:0,ош:0},s.пог7||{}); if(п.n>=РАЗВИЛКИ.length||п.ош>=3) return;
    if(РАЗВИЛКИ[п.n].ок===j){ s.отв7={i:п.n,ок:true}; п.n++; if(п.n>=РАЗВИЛКИ.length) s.дело_погоня=true; }
    else { п.ош++; s.отв7={i:п.n,ок:false,j:j}; }
    s.пог7=п; chRender(0); };
  window.r911Заново=()=>{ const s=S(); s.пог7={n:0,ош:0}; s.отв7=null; chRender(0); };
  window.r911Перев=(j)=>{ const s=S(); const n=s.пер8||0; if(n>=ПЕРЕВ.length) return;
    if(ПЕРЕВ[n].ок===j){ s.пер8=n+1; s.отв8={i:n,ок:true}; if(n+1>=ПЕРЕВ.length) s.дело_лесть=true; }
    else s.отв8={i:n,ок:false,j:j};
    chRender(0); };
  window.r911Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r911Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r911T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r911TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L911; else arr.push(L911); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU911={render:render, L:L911};
})();
