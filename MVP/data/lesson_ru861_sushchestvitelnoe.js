/* ============ РУССКИЙ ЯЗЫК · УРОК 861 · «ЧАСТИ РЕЧИ: ИМЯ СУЩЕСТВИТЕЛЬНОЕ» ============
   3 класс, «Морфология». Была заглушкой в soon_lessons.js — теперь урок.

   СЮЖЕТ. «Судовой журнал». Лодка идёт вдоль берега (путь 3 класса «Вдоль
   берега»). Ночью шторм размыл страницы журнала, слова уплыли. Ты — юнга:
   вылавливаешь из моря имена предметов, раскладываешь их по каюте и трюму,
   ставишь большие буквы в именах и дописываешь журнал заново.

   РУКАМИ: сачок — касаешься слов-буйков, существительные ложатся в сеть,
   остальные отскакивают с объяснением; каюта и трюм — «кто?» или «что?»;
   большие буквы — касаешься слов в строке журнала.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 3 КЛАССА (Канакина, Горецкий):
     имя существительное обозначает предмет и отвечает на вопросы кто? что?;
     «предмет» в грамматике — и вещь, и живое, и явление, и чувство
     (шторм, радость, смелость);
     одушевлённые отвечают на кто? (юнга, краб, капитан, морская звезда),
     неодушевлённые — на что? (канат, бочка, волна, звезда на небе);
     собственные пишутся с большой буквы (Лёва, «Чайка», Сиракузы);
     род: он мой — мужской (якорь), она моя — женский (мачта),
     оно моё — средний (весло);
     «ножницы» — только во множественном числе;
     ь после шипящих — у существительных женского рода (ночь, мышь, рожь),
     у мужского рода без ь (ёрш, нож, плащ);
     «Утром чайка села на мачту»: существительные чайка, мачту (2);
     «утром» отвечает на вопрос когда? — это наречие. */
(function(){
  'use strict';

  const ID = 861;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const КОЖА='#f4c9a3', БУМАГА='#f7f0dc', ЧЕРНИЛА='#2e2416';

  const ДЕЛА = [
    {ключ:'сачок', имя:'Выловить имена предметов', итог:'4 слова'},
    {ключ:'трюм',  имя:'Разложить по каюте и трюму', итог:'кто? · что?'},
    {ключ:'буквы', имя:'Поставить большие буквы', итог:'Лёва, «Чайка»'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const БУЙКИ = [
    {с:'якорь',   сущ:1},
    {с:'плывёт',  сущ:0, почему:'«Плывёт» отвечает на вопрос <b>что делает?</b> Это действие, а не предмет.'},
    {с:'синий',   сущ:0, почему:'«Синий» отвечает на вопрос <b>какой?</b> Это признак предмета, а не сам предмет.'},
    {с:'чайка',   сущ:1},
    {с:'быстро',  сущ:0, почему:'«Быстро» отвечает на вопрос <b>как?</b> Это не предмет.'},
    {с:'парус',   сущ:1},
    {с:'шторм',   сущ:1},
    {с:'громкий', сущ:0, почему:'«Громкий» отвечает на вопрос <b>какой?</b> Это признак.'}
  ];
  const СУЩ1 = БУЙКИ.map((б,i)=>б.сущ?i:-1).filter(i=>i>=0);
  const ГРУЗ = [
    {с:'юнга',    о:0},
    {с:'канат',   о:1},
    {с:'краб',    о:0},
    {с:'бочка',   о:1},
    {с:'волна',   о:1},
    {с:'капитан', о:0}
  ];
  const СТРОКА = ['юнга','лёва','приплыл','на','корабле','«чайка»','в','сиракузы'];
  const ЗАГЛАВНЫЕ = [1,5,7];
  const сБольшой = (w) => w[0]==='«' ? '«'+w[1].toUpperCase()+w.slice(2) : w[0].toUpperCase()+w.slice(1);

  const CSS=`
  #lvis .s6.l861{gap:14px}
  #lvis .s6.l861 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l861 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l861 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l861 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l861 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l861 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l861 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l861 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l861 .карт .текст b{color:${GOLD}}
  #lvis .s6.l861 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l861 .правило b{color:${GOLD}}
  #lvis .s6.l861 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l861 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l861 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l861 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l861 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l861 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l861 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l861 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l861 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l861 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l861 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l861 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l861 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l861 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l861 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l861 .буйки button.мимо{border-color:${RED};animation:l861нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l861нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l861 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l861 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l861 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l861 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l861 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l861 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l861 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l861 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l861 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l861 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l861 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l861 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l861 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l861 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l861 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l861 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l861 .уровни .точка.сейчас{background:${GOLD};animation:l861dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l861dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l861 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l861{-webkit-text-size-adjust:100%}
  #lvis .s6.l861 [data-anim]{animation:l861rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l861rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l861 [data-anim]{animation:none!important}
    #lvis .s6.l861 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l861 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l861-style');
      if(!s){ s=document.createElement('style'); s.id='l861-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r861Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Страница журнала</span><b class="${всё?'готово':''}">${
        всё?'журнал восстановлен':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
  const качка = (длит,амп) => ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 ${амп};0 0" dur="${длит}" repeatCount="indefinite" additive="sum"/>${ЗАВОД}` : '';
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
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c861-небо" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6ab0e0"/><stop offset="1" stop-color="#d8eef8"/>
      </linearGradient>
      <linearGradient id="c861-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2e86c0"/><stop offset="1" stop-color="#15406a"/>
      </linearGradient>
      <linearGradient id="c861-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b07840"/><stop offset="1" stop-color="#6a4018"/>
      </linearGradient>
      <linearGradient id="c861-бумага" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fbf4e2"/><stop offset="1" stop-color="#e2cfa4"/>
      </linearGradient>
      <linearGradient id="c861-трюм" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a3a1c"/><stop offset="1" stop-color="#2e1c0c"/>
      </linearGradient>
      <linearGradient id="c861-берег" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9ac870"/><stop offset="1" stop-color="#5a8a3a"/>
      </linearGradient>
      <filter id="c861-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#000" flood-opacity=".45"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.6+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c861-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* море с берегом и чайками */
  const море = (Н,линия) => `<g><rect x="0" y="0" width="336" height="${линия}" fill="url(#c861-небо)"/></g>
    <path d="M0 ${линия} q40 -26 90 -18 q40 6 70 -10 q30 -12 60 4 q58 14 116 14 V${линия} H0z" fill="url(#c861-берег)" data-декор="1"/>
    <rect x="0" y="${линия}" width="336" height="${Н-линия}" fill="url(#c861-море)"/>
    ${[0,1,2,3].map(k=>`<path d="M${10+k*84} ${линия+18+(k%2)*22} q12 -6 24 0 t24 0" stroke="#bfe4ff" stroke-width="1.4" fill="none" opacity=".6" data-декор="1">${анЛин('opacity','0.6;0.15;0.6',(2.2+k*0.4).toFixed(1)+'s')}</path>`).join('')}
    ${[[250,26],[284,40]].map(([x,y],k)=>`<path d="M${x-9} ${y} q5 -6 9 0 q4 -6 9 0" stroke="${ОБВОД}" stroke-width="1.8" fill="none" data-декор="1">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;-10 -3;0 0" dur="${4+k}s" repeatCount="indefinite"/>`:''}</path>`).join('')}`;
  /* юнга в лодке с сачком */
  const юнга = (x,y) => `<g transform="translate(${x} ${y})" filter="url(#c861-тень)">
      <path d="M-46 0 h92 l-12 20 h-68 z" fill="url(#c861-дерево)" stroke="${ОБВОД}" stroke-width="1.4"/>
      <rect x="-10" y="-34" width="20" height="34" rx="6" fill="#f4f0e6" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[0,1,2].map(k=>`<line x1="-10" y1="${-27+k*9}" x2="10" y2="${-27+k*9}" stroke="#2a5a9a" stroke-width="3"/>`).join('')}
      <circle cx="0" cy="-44" r="11" fill="${КОЖА}" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-11 -48 q11 -14 22 0 z" fill="#2a4a7a" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="-4" cy="-44" r="1.4" fill="${ОБВОД}"/><circle cx="4" cy="-44" r="1.4" fill="${ОБВОД}"/>
      <path d="M-4 -39 q4 3 8 0" stroke="${ОБВОД}" stroke-width="1.2" fill="none"/>
      <line x1="8" y1="-24" x2="54" y2="-58" stroke="#8a5a2a" stroke-width="3" stroke-linecap="round"/>
    </g>`;
  /* сеть сачка с пойманными словами */
  const сеть = (x,y,слова,нов) => `<g transform="translate(${x} ${y})">
      <ellipse cx="0" cy="0" rx="34" ry="10" fill="none" stroke="#8a5a2a" stroke-width="3"/>
      <path d="M-34 0 q4 44 34 50 q30 -6 34 -50" fill="rgba(240,230,210,.25)" stroke="#e8dcc0" stroke-width="1.2"/>
      ${[-20,-6,8,22].map(d=>`<path d="M${d} 4 q${d*0.2} 22 ${-d*0.3} 42" stroke="#e8dcc0" stroke-width=".8" fill="none"/>`).join('')}
      ${слова.map((w,k)=>`<g>${нов&&k===слова.length-1?сдвигРаз('0 -30','0 0','0.5s',0):''}<rect x="-28" y="${6+k*11}" width="56" height="10" rx="5" fill="${GREEN}" opacity=".85"/>${т(0,14+k*11,w,9,ЧЕРНИЛА,true)}</g>`).join('')}
    </g>`;

  /* ================= КАДРЫ ================= */

  /* 1. Сачок */
  function F1(s){
    const Н=270, пойм=Array.isArray(s.пойм1)?s.пойм1:[], ош=s.ош1, всё=СУЩ1.every(i=>пойм.includes(i));
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ночью был шторм. Волны размыли страницу судового журнала, и слова уплыли в море. Капитан говорит: «Юнга, лови сачком только <b>имена предметов</b> — слова, которые отвечают на вопрос <b>кто?</b> или <b>что?</b>». Касайся буйков со словами.') +
      `<div class="pic">${свг(`
        ${море(Н,90)}
        ${БУЙКИ.map((б,i)=>{ if(пойм.includes(i)) return ''; const x=46+(i%4)*82, y=112+Math.floor(i/4)*38;
          return `<g>${качка((1.6+i*0.23).toFixed(2)+'s',3)}<g filter="url(#c861-тень)"><rect x="${x-36}" y="${y-13}" width="72" height="26" rx="13" fill="${ош===i?'#ffd8d0':'#fff6ea'}" stroke="${ош===i?RED:'#e86a5a'}" stroke-width="1.6"/></g>
            ${т(x,y+5,б.с,14,ЧЕРНИЛА,true)}</g>`; }).join('')}
        ${юнга(90,Н-30)}
        ${сеть(150,Н-92,пойм.map(i=>БУЙКИ[i].с),s.поймал)}
        ${т(240,Н-18,'в сачке: '+пойм.length+' из 4',14,всё?GREEN:ИНК,true)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="буйки">${БУЙКИ.map((б,i)=>BTN(3+(i%5),пойм.includes(i)?'пойман':(ош===i?'мимо':''),б.с,'r861Буй('+i+')')).join('')}</div>` +
      (всё ? РАЗБОР(true,'Якорь, чайка, парус, шторм — все отвечают на вопрос <b>кто?</b> или <b>что?</b>: что это? — якорь; кто это? — чайка.') :
        ош!=null ? РАЗБОР(false,БУЙКИ[ош].почему) :
        СКАЗ('Подсказка','Задай слову вопрос: «кто это?» или «что это?». Подходит — лови.')) +
      (всё ? ПРАВИЛО('<b>Имя существительное</b> — часть речи, которая обозначает <b>предмет</b> и отвечает на вопросы <b>кто?</b> или <b>что?</b>') : '');
  }

  /* 2. Предмет — не только вещь */
  function F2(s){
    const Н=250, в=s.ответ2, ок=в===0;
    const карточка=(x,y,слово,рис)=>`<g>${вырасти('8s',0.05+x/1200)}<g filter="url(#c861-тень)"><rect x="${x-46}" y="${y-44}" width="92" height="96" rx="10" fill="url(#c861-бумага)" stroke="${ОБВОД}" stroke-width="1.2"/></g>
      ${рис}${т(x,y+40,слово,14,ЧЕРНИЛА,true)}</g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга удивляется: «Шторм нельзя положить в сундук, радость — потрогать. Разве это предметы?» Капитан: «В грамматике <b>предмет</b> — всё, о чём можно спросить <b>что?</b> или <b>кто?</b>: и вещь, и зверь, и ветер, и чувство». Какое из слов — имя существительное?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1e3a2c"/>
        ${карточка(62,110,'шторм',`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;4 0;0 0" dur="0.9s" repeatCount="indefinite"/>`:''}${[0,1,2].map(k=>`<path d="M${36} ${86+k*12} q14 -8 26 0 t26 0" stroke="#2a6a9a" stroke-width="2.4" fill="none"/>`).join('')}</g>`)}
        ${карточка(168,110,'радость',`<circle cx="168" cy="${96}" r="20" fill="#ffd76a" stroke="${ОБВОД}" stroke-width="1.2"/><circle cx="161" cy="92" r="2" fill="${ОБВОД}"/><circle cx="175" cy="92" r="2" fill="${ОБВОД}"/><path d="M159 101 q9 8 18 0" stroke="${ОБВОД}" stroke-width="1.6" fill="none"/>`)}
        ${карточка(274,110,'дружба',`<path d="M254 104 q10 -12 20 -4 q10 -8 20 4 l-20 18 z" fill="#e86a5a" stroke="${ОБВОД}" stroke-width="1.2">${анЛин('opacity','1;0.7;1','1.2s')}</path>`)}
        ${т(168,34,'что это? — шторм, радость, дружба',14,GOLD,true)}
        ${ок?подпись(168,Н-14,'смелость — что? это существительное',GREEN,13):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['смелость','смелый','смело'],0,в,2) +
      (в==null ? СКАЗ('Вопрос','Какое слово — имя существительное?') :
        РАЗБОР(ок,['«Смелость» — <b>что?</b> Это существительное, хоть её и не потрогать: как радость или дружба.',
          '«Смелый» отвечает на вопрос <b>какой?</b> — это признак. Существительное — <b>смелость</b> (что?).',
          '«Смело» отвечает на вопрос <b>как?</b> Существительное — <b>смелость</b> (что?).'][в])) +
      (ок ? ПРАВИЛО('Существительные называют не только вещи, но и живых существ, явления природы и чувства: <b>шторм, радость, смелость</b>.') : '');
  }

  /* 3. Каюта и трюм */
  function F3(s){
    const Н=240, реш=s.реш3||{}, все=ГРУЗ.every((_,i)=>реш[i]!=null), верно=все&&ГРУЗ.every((г,i)=>реш[i]===г.о);
    const вКаюте=ГРУЗ.filter((г,i)=>реш[i]===0).map(г=>г.с), вТрюме=ГРУЗ.filter((г,i)=>реш[i]===1).map(г=>г.с);
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Капитан велит навести порядок: всех, про кого спрашивают <b>кто?</b>, — в каюту, всё, про что спрашивают <b>что?</b>, — в трюм. Реши про каждое слово.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c861-небо)"/>
        <rect x="0" y="${Н-40}" width="336" height="40" fill="url(#c861-море)"/>
        <g filter="url(#c861-тень)"><path d="M18 60 h300 l-24 150 h-252 z" fill="url(#c861-дерево)" stroke="${ОБВОД}" stroke-width="1.6"/></g>
        <line x1="168" y1="60" x2="168" y2="208" stroke="${ОБВОД}" stroke-width="2"/>
        <rect x="30" y="72" width="130" height="126" rx="6" fill="#f0e2c0" stroke="${ОБВОД}"/>
        <rect x="176" y="72" width="130" height="126" rx="6" fill="url(#c861-трюм)" stroke="${ОБВОД}"/>
        ${т(95,94,'каюта · кто?',14,'#7a2a10',true)}${т(241,94,'трюм · что?',14,GOLD,true)}
        ${вКаюте.map((w,k)=>`<g>${сдвигРаз('0 -20','0 0','0.4s',0)}${т(95,120+k*24,w,16,ЧЕРНИЛА,true)}</g>`).join('')}
        ${вТрюме.map((w,k)=>`<g>${сдвигРаз('0 -20','0 0','0.4s',0)}${т(241,120+k*24,w,16,'#f4e6c0',true)}</g>`).join('')}
        <line x1="168" y1="60" x2="168" y2="18" stroke="${ОБВОД}" stroke-width="3"/>
        <path d="M168 20 l40 16 l-40 12 z" fill="#e86a5a" stroke="${ОБВОД}">${анЛин('opacity','1;0.8;1','2s')}</path>
        ${рамка(Н)}
      `,Н)}</div>` +
      ГРУЗ.map((г,i)=>`<div class="случай">${A(3+i,'что',г.с)}<div class="ask пара">${['кто? — в каюту','что? — в трюм'].map((v,j)=>
        BTN(4+i,реш[i]===j?(j===г.о?'hit':'miss'):'',v,'r861Груз('+i+','+j+')')).join('')}</div></div>`).join('') +
      (!все ? СКАЗ('Подсказка','Живое — кто? Неживое — что? Краб живой, хоть и маленький.') :
        РАЗБОР(верно, верно ? 'Юнга, краб, капитан — <b>кто?</b> Канат, бочка, волна — <b>что?</b>' :
          'Проверь ещё раз: всё живое — люди и животные — отвечает на вопрос <b>кто?</b>, неживое — на <b>что?</b>')) +
      (верно ? ПРАВИЛО('Существительные, которые отвечают на вопрос <b>кто?</b>, — <b>одушевлённые</b> (люди и животные). На вопрос <b>что?</b> — <b>неодушевлённые</b>.') : '');
  }

  /* 4. Звезда и морская звезда */
  function F4(s){
    const Н=250, в=s.ответ4, ок=в===0;
    const звезда=(cx,cy,r,цв)=>`<path d="${Array.from({length:10},(_,k)=>{ const a=-Math.PI/2+k*Math.PI/5, rr=k%2?r*0.45:r; return (k?'L':'M')+(cx+rr*Math.cos(a)).toFixed(1)+' '+(cy+rr*Math.sin(a)).toFixed(1); }).join(' ')}z" fill="${цв}" stroke="${ОБВОД}" stroke-width="1.2"/>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ночью юнга записал в журнал: «Над мачтой зажглась <b>звезда</b>». А утром нырнул и увидел на дне <b>морскую звезду</b> — она медленно ползла по камню. Про звезду на небе спрашивают «что?». А про морскую?') +
      `<div class="pic">${свг(`
        <g><rect x="0" y="0" width="336" height="110" fill="#14203a"/></g>
        ${звезда(84,52,22,'#ffe488')}<g>${анЛин('opacity','1;0.3;1','1.6s')}${[0,1,2,3].map(k=>{ const a=k*Math.PI/4+Math.PI/8; return `<line x1="${(84+28*Math.cos(a)).toFixed(1)}" y1="${(52+28*Math.sin(a)).toFixed(1)}" x2="${(84+36*Math.cos(a)).toFixed(1)}" y2="${(52+36*Math.sin(a)).toFixed(1)}" stroke="#ffe488" stroke-width="2" stroke-linecap="round" data-декор="1"/><line x1="${(84-28*Math.cos(a)).toFixed(1)}" y1="${(52-28*Math.sin(a)).toFixed(1)}" x2="${(84-36*Math.cos(a)).toFixed(1)}" y2="${(52-36*Math.sin(a)).toFixed(1)}" stroke="#ffe488" stroke-width="2" stroke-linecap="round" data-декор="1"/>`; }).join('')}</g>
        ${т(84,98,'на небе: что?',14,'#dfe8ff',true)}
        <rect x="0" y="110" width="336" height="${Н-110}" fill="url(#c861-море)"/>
        <path d="M150 ${Н-22} q60 -30 170 -14 V${Н} H150z" fill="#6a5a44"/>
        <g transform="translate(252 ${Н-44})">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="240 ${Н-44};262 ${Н-46};240 ${Н-44}" dur="6s" repeatCount="indefinite"/>`:''}
          ${звезда(0,0,22,'#f08a5a')}<circle cx="-4" cy="-4" r="2" fill="${ОБВОД}"/><circle cx="4" cy="-4" r="2" fill="${ОБВОД}"/></g>
        ${т(250,140,'на дне: ?',14,'#dfe8ff',true)}
        ${ок?подпись(250,178,'живая — кто?',GREEN,13):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['кто?','что?'],0,в,4) +
      (в==null ? СКАЗ('Вопрос','Какой вопрос задают к слову «морская звезда»?') :
        РАЗБОР(ок,['Морская звезда — <b>живое</b> морское животное: она ползает и ест. Поэтому — <b>кто?</b> А звезда на небе — что?',
          'Звезда на небе — что? А морская звезда — животное, она живая и ползает. Про неё спрашивают <b>кто?</b>'][в])) +
      (ок ? ПРАВИЛО('Вопрос зависит от того, <b>живое ли</b> это: звезда на небе — что?, морская звезда — кто?') : '');
  }

  /* 5. Большие буквы */
  function F5(s){
    const Н=200, выбор=Array.isArray(s.загл5)?s.загл5:[], пров=s.пров5;
    const верно = пров && выбор.slice().sort((a,b)=>a-b).join(',')===ЗАГЛАВНЫЕ.join(',');
    const слова = СТРОКА.map((w,i)=>выбор.includes(i)?сБольшой(w):w);
    let x=24, y=90; const куски=[];
    слова.forEach((w,i)=>{ const ш=w.length*12.5+16; if(x+ш>318){ x=24; y+=38; }
      куски.push(`<g>${выбор.includes(i)?`<rect x="${x-2}" y="${y-22}" width="${ш}" height="30" rx="5" fill="rgba(42,106,154,.18)"/>`:''}${т(x+4,y,w,19,выбор.includes(i)?'#1a4a8a':ЧЕРНИЛА,выбор.includes(i),'start')}</g>`); x+=ш+4; });
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга переписывает строку журнала, но от волнения забыл про <b>большие буквы</b>. Имена людей, названия кораблей и городов пишут с заглавной. Коснись слов, которые надо написать с большой буквы, и нажми «Проверить».') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#3a2410"/>
        <g filter="url(#c861-тень)"><rect x="12" y="30" width="312" height="${Н-48}" rx="4" fill="url(#c861-бумага)"/></g>
        ${[0,1,2].map(k=>`<line x1="20" y1="${98+k*38}" x2="316" y2="${98+k*38}" stroke="#c8b08a" stroke-width="1" data-декор="1"/>`).join('')}
        ${т(24,56,'Журнал. День третий.',14,'#7a4a24',true,'start')}
        ${куски.join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(2,1fr)">${СТРОКА.map((w,i)=>BTN(3,выбор.includes(i)?'вкл':'',выбор.includes(i)?сБольшой(w):w,'r861Загл('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,'','Проверить строку','r861Проверить()')}</div>` +
      (!пров ? СКАЗ('Подсказка','Имя мальчика, название корабля в кавычках, название города.') :
        РАЗБОР(верно, верно ? '<b>Лёва</b> — имя, <b>«Чайка»</b> — название корабля, <b>Сиракузы</b> — город. Остальные слова — обычные.' :
          (выбор.includes(0)||выбор.includes(4) ? '«Юнга» и «корабль» — это не имена, а обычные слова: юнг и кораблей много. С большой — только <b>Лёва, «Чайка», Сиракузы</b>.' :
           'Найди все три имени: имя мальчика, название корабля в кавычках и название города.'))) +
      (верно ? ПРАВИЛО('Имена, фамилии, клички, названия городов, рек, кораблей — <b>имена собственные</b>, их пишут <b>с большой буквы</b>. Остальные существительные — нарицательные.') : '');
  }

  /* 6. Род */
  function F6(s){
    const Н=240, в=s.ответ6, ок=в===2;
    const сундук=(x,подп,слово,свет)=>`<g filter="url(#c861-тень)"><rect x="${x-46}" y="110" width="92" height="70" rx="6" fill="url(#c861-дерево)" stroke="${свет?GREEN:ОБВОД}" stroke-width="${свет?3:1.4}"/>
      <path d="M${x-48} 110 q48 -26 96 0 z" fill="#8a5a2a" stroke="${ОБВОД}" stroke-width="1.2"/></g>
      ${т(x,146,подп,14,'#fff0d8',true)}${т(x,168,слово,14,GOLD,true)}`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В трюме три сундука с надписями. Капитан объясняет: подставь к слову «<b>он, мой</b>», «<b>она, моя</b>» или «<b>оно, моё</b>» — и узнаешь, в какой сундук класть. Якорь — он мой, мачта — она моя. А куда положить <b>весло</b>?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c861-трюм)"/>
        ${сундук(62,'он, мой','якорь',false)}${сундук(168,'она, моя','мачта',false)}${сундук(274,'оно, моё',ок?'весло':'?',ок)}
        <g transform="translate(168 60)">${ок?сдвигРаз('0 0','106 60','0.8s',0.2)+(ДВИЖ?ЗАВОД:''):качка('1.6s',-4)}
          <g filter="url(#c861-тень)"><rect x="-44" y="-5" width="70" height="10" rx="5" fill="#c89458" stroke="${ОБВОД}"/><path d="M26 -9 q20 9 0 18 z" fill="#c89458" stroke="${ОБВОД}"/></g>
          ${т(-8,-12,'весло',14,ИНК,true)}</g>
        ${т(62,208,'мужской род',12,МУТ,true)}${т(168,208,'женский род',12,МУТ,true)}${т(274,208,'средний род',12,МУТ,true)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['он, мой','она, моя','оно, моё'],2,в,6) +
      (в==null ? СКАЗ('Вопрос','Какие слова подходят к слову «весло»?') :
        РАЗБОР(ок,['«Он, мой весло» — так не скажешь. Говорят: <b>оно моё</b> — весло среднего рода.',
          '«Она, моя весло» — не звучит. Правильно: <b>оно моё</b>. Весло — среднего рода.',
          '<b>Оно моё</b> — весло. Это <b>средний род</b>, как море, окно, солнце.'][в])) +
      (ок ? ПРАВИЛО('У существительного есть <b>род</b>: он мой — <b>мужской</b>, она моя — <b>женский</b>, оно моё — <b>средний</b>.') : '');
  }

  /* 7. Число */
  function F7(s){
    const Н=230, в=s.ответ7, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Капитан показывает: существительное меняется по <b>числам</b>. Один <b>парус</b> — много <b>парусов</b>, одна <b>чайка</b> — много <b>чаек</b>. Но есть хитрые слова, у которых нет «одного». Какое из них?') +
      `<div class="pic">${свг(`
        ${море(Н,120)}
        ${[0].map(()=>`<g transform="translate(70 150)" filter="url(#c861-тень)">${качка('2.4s',3)}<path d="M-30 0 h60 l-8 14 h-44 z" fill="url(#c861-дерево)" stroke="${ОБВОД}"/><line x1="0" y1="0" x2="0" y2="-46" stroke="${ОБВОД}" stroke-width="2"/><path d="M2 -44 q24 20 2 40 z" fill="#f4ead2" stroke="${ОБВОД}"/></g>`).join('')}
        ${т(70,190,'один парус',14,ИНК,true)}
        ${[0,1,2].map(k=>`<g transform="translate(${198+k*44} ${146+(k%2)*8})" filter="url(#c861-тень)">${качка((2+k*0.3).toFixed(1)+'s',3)}<path d="M-18 0 h36 l-5 9 h-26 z" fill="url(#c861-дерево)" stroke="${ОБВОД}"/><line x1="0" y1="0" x2="0" y2="-30" stroke="${ОБВОД}" stroke-width="1.6"/><path d="M1 -29 q16 13 1 26 z" fill="#f4ead2" stroke="${ОБВОД}"/></g>`).join('')}
        ${т(242,190,'много парусов',14,ИНК,true)}
        ${ок?`<g transform="translate(168 70)" filter="url(#c861-тень)"><circle cx="-10" cy="12" r="7" fill="none" stroke="${ОБВОД}" stroke-width="2.4"/><circle cx="10" cy="12" r="7" fill="none" stroke="${ОБВОД}" stroke-width="2.4"/><path d="M-6 6 L14 -22 M6 6 L-14 -22" stroke="#8a96a8" stroke-width="3" stroke-linecap="round"/></g>${т(168,102,'ножницы: и одни, и много',12,'#1a3a5a',true)}`:''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['ножницы','нож','ножик'],0,в,7) +
      (в==null ? СКАЗ('Вопрос','У какого слова нет формы «один предмет»?') :
        РАЗБОР(ок,['Не скажешь «одна ножница»: даже одни ножницы — <b>ножницы</b>. Такие слова бывают только во множественном числе, как сани и брюки.',
          'Нож — один, ножи — много: у него есть обе формы. А у слова <b>ножницы</b> «одного» нет.',
          'Ножик — ножики: обе формы есть. Без «одного» — <b>ножницы</b>.'][в])) +
      (ок ? ПРАВИЛО('Существительные изменяются по <b>числам</b>: единственное (парус) и множественное (паруса). Некоторые слова — только во множественном: <b>ножницы, сани, брюки</b>.') : '');
  }

  /* 8. Мягкий знак после шипящих */
  function F8(s){
    const Н=240, в=s.ответ8, ок=в===0;
    const рыба=(x,y)=>`<g transform="translate(${x} ${y})" filter="url(#c861-тень)"><path d="M-26 0 q20 -16 40 0 q-20 16 -40 0 z" fill="#8aa0b0" stroke="${ОБВОД}"/><path d="M14 0 l12 -10 v20 z" fill="#8aa0b0" stroke="${ОБВОД}"/>
      ${[-16,-8,0].map(d=>`<path d="M${d} -8 l3 -8 l3 8" stroke="${ОБВОД}" stroke-width="1" fill="none"/>`).join('')}<circle cx="-18" cy="-2" r="2" fill="${ОБВОД}"/></g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В сеть попалась колючая рыбка — <b>ёрш</b>. Юнга записал: «ёршь» — с мягким знаком, как «ночь» и «мышь». Капитан нахмурился. Как правильно?') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c861-море)"/>
        <g>${качка('2.2s',4)}${рыба(84,80)}</g>
        ${т(84,120,ок?'ёрш — он мой':'ёрш_ ?',16,ИНК,true)}
        <g filter="url(#c861-тень)"><rect x="170" y="36" width="150" height="120" rx="8" fill="url(#c861-бумага)"/></g>
        ${т(245,62,'она, моя: с ь',13,'#1a6a3a',true)}${т(245,84,'ночь, мышь, рожь',14,ЧЕРНИЛА,true)}
        ${т(245,116,'он, мой: без ь',13,'#7a2a10',true)}${т(245,138,'нож, плащ, '+(ок?'ёрш':'?'),14,ЧЕРНИЛА,true)}
        ${ок?подпись(168,Н-16,'ёрш — мужской род, без ь',GREEN,13):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['ёрш','ёршь'],0,в,8) +
      (в==null ? СКАЗ('Вопрос','Как написать название рыбки?') :
        РАЗБОР(ок,['Ёрш — <b>он мой</b>, мужской род. У существительных мужского рода на шипящий мягкого знака нет: нож, плащ, <b>ёрш</b>.',
          '«Ночь» и «мышь» — она моя, женский род, поэтому с ь. А ёрш — <b>он мой</b>, мужской: пишем <b>без ь</b>.'][в])) +
      (ок ? ПРАВИЛО('На конце существительных после шипящих (ж, ш, ч, щ) <b>ь пишется у женского рода</b> (ночь, мышь) и <b>не пишется у мужского</b> (нож, ёрш).') : '');
  }

  /* 9. Сколько существительных в строке */
  function F9(s){
    const Н=200, в=s.ответ9, ок=в===0;
    const слова=['Утром','чайка','села','на','мачту.'], сущ=[1,4];
    let x=20; const куски=слова.map((w,i)=>{ const ш=w.length*11+8, g=`<g>${ок&&сущ.includes(i)?`<rect x="${x-4}" y="78" width="${ш}" height="34" rx="6" fill="rgba(143,209,168,.35)" stroke="${GREEN}"/>`:''}${ок&&i===0?`<rect x="${x-4}" y="78" width="${ш}" height="34" rx="6" fill="none" stroke="${RED}" stroke-dasharray="4 3"/>`:''}${т(x,104,w,20,ЧЕРНИЛА,false,'start')}</g>`; x+=ш+3; return g; });
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Последняя проверка. Капитан диктует: «<b>Утром чайка села на мачту.</b>» Сколько в этой строке имён существительных? Осторожно: не каждое слово, похожее на предмет, — существительное.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#3a2410"/>
        <g filter="url(#c861-тень)"><rect x="12" y="40" width="312" height="${Н-70}" rx="4" fill="url(#c861-бумага)"/></g>
        ${куски.join('')}
        ${ок?т(26,140,'когда?',13,RED,true,'start')+т(84,140,'кто?',13,'#1a6a3a',true,'start')+т(236,140,'что?',13,'#1a6a3a',true,'start'):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['2','3','5'],0,в,9) +
      (в==null ? СКАЗ('Вопрос','Сколько существительных в строке «Утром чайка села на мачту»?') :
        РАЗБОР(ок,['<b>Чайка</b> (кто?) и <b>мачту</b> (что?) — два. «Утром» отвечает на вопрос <b>когда?</b> — это не существительное.',
          'Три — если посчитать «утром». Но оно отвечает на вопрос <b>когда?</b>, а не что? Существительных <b>два</b>: чайка, мачту.',
          '«Села» — что сделала?, «на» — маленькое слово-помощник. Существительных <b>два</b>: чайка и мачту.'][в])) +
      (ок ? ПРАВИЛО('Чтобы найти существительное, задай вопрос <b>кто?</b> или <b>что?</b> от другого слова. «Утром» отвечает на вопрос <b>когда?</b> — оно не подходит.') : '');
  }

  /* 10. Журнал восстановлен */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=260;
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Страница журнала снова целая. Капитан читает вслух и кивает: «Молодец, юнга. Все имена на месте, большие буквы тоже. Завтра поплывём дальше вдоль берега — к мысу, где живут слова-действия».'
        : 'Страница ещё не восстановлена — вернись к делам в журнале. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${море(Н,100)}
        <g transform="translate(168 124)" filter="url(#c861-тень)">${качка('2.6s',3)}
          <path d="M-70 0 h140 l-16 26 h-108 z" fill="url(#c861-дерево)" stroke="${ОБВОД}" stroke-width="1.6"/>
          <line x1="0" y1="0" x2="0" y2="-86" stroke="${ОБВОД}" stroke-width="3"/>
          <path d="M3 -84 q46 36 3 76 z" fill="#f4ead2" stroke="${ОБВОД}"/><path d="M-3 -78 q-38 30 -3 66 z" fill="#ede0c4" stroke="${ОБВОД}"/>
          ${т(0,16,'«Чайка»',14,'#fff0d8',true)}</g>
        ${[['кто? что? — существительное',GOLD],['он мой · она моя · оно моё',BLUE],['Лёва, «Чайка» — с большой',GREEN]].map(([t0,ц],i)=>`<g>${проявить('9s',0.1+i*0.18,0.16+i*0.18)}${подпись(168,Н-72+i*28,t0,ц,13)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Имя существительное</b> обозначает предмет и отвечает на вопросы <b>кто?</b> или <b>что?</b> Предмет — это и вещь, и животное, и явление, и чувство. Кто? — одушевлённые, что? — неодушевлённые. Имена собственные пишутся с большой буквы. У существительных есть род (он мой, она моя, оно моё) и число; после шипящих ь пишут только у женского рода.') +
      ПРАВИЛО('<b>Кто? что? — значит, существительное.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какое слово — имя существительное?', варианты:[{т:'бежит',ок:false},{т:'берег',ок:true}], разбор:'Берег — что?' },
    { вопрос:'Какой вопрос задают к слову «дельфин»?', варианты:[{т:'кто?',ок:true},{т:'что?',ок:false}], разбор:'Дельфин живой.' },
    { вопрос:'Какого рода слово «море»?', варианты:[{т:'женского',ок:false},{т:'среднего',ок:true}], разбор:'Оно моё.' },
    { вопрос:'Как написать: «город в…» (Волгоград)?', варианты:[{т:'Волгоград',ок:true},{т:'волгоград',ок:false}], разбор:'Название города — с большой.' },
    { вопрос:'Как написать: «доч_» (дочка)?', варианты:[{т:'дочь',ок:true},{т:'доч',ок:false}], разбор:'Она моя — женский род, с ь.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r861Reset()")}</div>` +
        ПРАВИЛО('<b>Кто? что? — значит, существительное.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r861Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Найди существительное', задания:[
    {q:'Какое слово — существительное?', в:1, варианты:['солёный','соль'], раз:'Соль — что?'},
    {q:'Какое слово — существительное?', в:0, варианты:['ветер','ветреный'], раз:'Ветер — что?'},
    {q:'Какое слово — существительное?', в:1, варианты:['плавать','плавание'], раз:'Плавание — что?'},
    {q:'Какое слово — существительное?', в:0, варианты:['доброта','добрый'], раз:'Доброта — что?'}
  ]};
  const Т2 = { имя:'Кто? что? Род', задания:[
    {q:'Медуза — кто? или что?', в:0, варианты:['кто?','что?'], раз:'Медуза живая.'},
    {q:'Камень — кто? или что?', в:1, варианты:['кто?','что?'], раз:'Камень неживой.'},
    {q:'Какого рода «чайка»?', в:1, варианты:['мужского','женского'], раз:'Она моя.'},
    {q:'Какого рода «окно»?', в:0, варианты:['среднего','мужского'], раз:'Оно моё.'}
  ]};
  const Т3 = { имя:'Буквы и знаки', задания:[
    {q:'Кличка собаки: «шарик» или «Шарик»?', в:1, варианты:['шарик','Шарик'], раз:'Кличка — имя собственное.'},
    {q:'Как написать: «плащ» или «плащь»?', в:0, варианты:['плащ','плащь'], раз:'Он мой — без ь.'},
    {q:'Как написать: «печ_» (русская печь)?', в:1, варианты:['печ','печь'], раз:'Она моя — с ь.'},
    {q:'Какое слово только во множественном числе?', в:0, варианты:['сани','лодка'], раз:'Не скажешь «одна саня».'}
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
        в, "r861T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r861TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L861 = {
    id: ID,
    title: 'Части речи: имя существительное',
    ico: '⚓',
    src: 'Русский язык · 3 класс · Морфология', subj: 'rus',
    explain: [
      'Шторм размыл судовой журнал. Юнга ловит сачком имена предметов — слова, которые отвечают на вопрос кто? или что?',
      'Предмет в грамматике — и вещь, и явление, и чувство: шторм, радость, смелость.',
      'Кто? — одушевлённые (юнга, краб, капитан), что? — неодушевлённые (канат, бочка, волна).',
      'Звезда на небе — что?, морская звезда — кто?: она живая.',
      'Имена собственные — Лёва, «Чайка», Сиракузы — пишут с большой буквы.',
      'Род: он мой — мужской, она моя — женский, оно моё — средний (весло).',
      'Число: парус — паруса. Ножницы бывают только во множественном числе.',
      'После шипящих ь пишут у женского рода (ночь, мышь), у мужского — нет (ёрш, нож).',
      '«Утром чайка села на мачту»: существительных два — чайка и мачту.',
      'Итог: кто? что? — значит, существительное.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: найди существительное.',
      'Тренажёр 2: кто? что? род.',
      'Тренажёр 3: большие буквы и мягкий знак.'
    ],
    check: {
      q: 'Какое слово — имя существительное?',
      choices: ['плывёт','парус','синий'],
      ans: 1,
      exp: 'Парус — что? Это существительное.'
    },
    tasks: [
      { q:'На какие вопросы отвечает имя существительное?', kind:'choice', choices:['какой? какая?','кто? что?','что делать?'], ans:1, tol:0,
        hints:['Существительное называет предмет.'], sol:'Кто? что?' },
      { q:'Какого рода слово «весло»?', kind:'choice', choices:['мужского','женского','среднего'], ans:2, tol:0,
        hints:['Подставь: оно моё.'], sol:'Среднего.' },
      { q:'Сколько существительных в предложении «Утром чайка села на мачту»?', kind:'unit', ans:2, tol:0,
        hints:['«Утром» — когда?'], sol:'Два: чайка, мачту.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L861.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    s.поймал=false;
    const ЗАГОЛОВКИ={1:'Слова уплыли',2:'Что такое предмет',3:'Каюта и трюм',4:'Две звезды',5:'Большие буквы',
      6:'Три сундука',7:'Один и много',8:'Колючий ёрш',9:'Строка капитана',10:'Журнал восстановлен',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l861" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Имя существительное'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r861Буй=(i)=>{ const s=S(); const п=Array.isArray(s.пойм1)?s.пойм1.slice():[];
    if(п.includes(i)) return;
    if(БУЙКИ[i].сущ){ п.push(i); s.пойм1=п; s.ош1=null; s.поймал=true; if(СУЩ1.every(k=>п.includes(k))) s.дело_сачок=true; }
    else s.ош1=i;
    chRender(0); };
  window.r861Груз=(i,j)=>{ const s=S(); const р=Object.assign({},s.реш3||{}); р[i]=j; s.реш3=р;
    if(ГРУЗ.every((г,k)=>р[k]===г.о)) s.дело_трюм=true; chRender(0); };
  window.r861Загл=(i)=>{ const s=S(); const в=Array.isArray(s.загл5)?s.загл5.slice():[]; const к=в.indexOf(i);
    if(к>=0) в.splice(к,1); else в.push(i); s.загл5=в; s.пров5=false; chRender(0); };
  window.r861Проверить=()=>{ const s=S(); s.пров5=true;
    if((s.загл5||[]).slice().sort((a,b)=>a-b).join(',')===ЗАГЛАВНЫЕ.join(',')) s.дело_буквы=true; chRender(0); };
  window.r861Отв=(f,к)=>{ S()['ответ'+f]=к; chRender(0); };
  window.r861Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r861Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r861T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r861TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L861; else arr.push(L861); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU861={render:render, L:L861};
})();
