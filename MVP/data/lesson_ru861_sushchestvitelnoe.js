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
  const Р = () => window.РМ;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c861-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <linearGradient id="c861-сталь" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2f6fa"/><stop offset="0.5" stop-color="#a8b4c2"/><stop offset="1" stop-color="#5a6676"/>
      </linearGradient>
      <linearGradient id="c861-дно" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a7a5a"/><stop offset="1" stop-color="#4a3e2a"/>
      </linearGradient>
      <linearGradient id="c861-туча" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a8698"/><stop offset="1" stop-color="#3a4254"/>
      </linearGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
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
  /* дощечка со словом, плывущая по воде */
  const дощечка = (x,y,слово,ош,фаза) => `<g transform="translate(${x} ${y})">${Р().качать('0 0;0 3;0 0',(1.8+фаза*0.27).toFixed(2)+'s')}
      <ellipse cx="0" cy="12" rx="40" ry="4" fill="#e8f6ff" opacity=".45">${анЛин('rx','34;42;34',(1.8+фаза*0.27).toFixed(2)+'s')}</ellipse>
      <g filter="url(#c861-тень)"><rect x="-36" y="-12" width="72" height="24" rx="5" fill="${ош?'#ffd8cc':'url(#рм-бумага)'}" stroke="${ош?RED:ОБВОД}" stroke-width="${ош?2:1.2}"/></g>
      <path d="M-32 -8 h64" stroke="#fff" stroke-width="1.4" opacity=".7"/>
      <circle cx="-30" cy="0" r="1.4" fill="#8a6a3a"/><circle cx="30" cy="0" r="1.4" fill="#8a6a3a"/>
      ${т(0,5,слово,14,ЧЕРНИЛА,true)}</g>`;
  /* сачок: древко от руки юнги, латунный обод, сеть узлами, улов */
  function сачок(x,y,слова,нов){
    const кл='c861-сеть';
    const ячейки = Array.from({length:7},(_,k)=>`<path d="M${-34+k*11} -2 q${4} 26 ${14-k*4} 50" stroke="#efe4c8" stroke-width=".8" fill="none"/>`).join('')+
      Array.from({length:4},(_,k)=>`<path d="M-34 ${8+k*11} q34 ${10-k*2} 68 0" stroke="#efe4c8" stroke-width=".8" fill="none"/>`).join('');
    return `<g transform="translate(${x} ${y})">
      <line x1="-62" y1="54" x2="-30" y2="4" stroke="url(#рм-мачта)" stroke-width="4" stroke-linecap="round"/>
      <clipPath id="${кл}"><path d="M-34 0 q4 48 34 56 q30 -8 34 -56 z"/></clipPath>
      <path d="M-34 0 q4 48 34 56 q30 -8 34 -56 z" fill="rgba(240,230,210,.18)"/>
      <g clip-path="url(#${кл})">${ячейки}</g>
      ${слова.map((w,k)=>`<g>${нов&&k===слова.length-1?сдвигРаз('0 -40','0 0','0.55s',0):''}<g filter="url(#c861-тень)"><rect x="-26" y="${6+k*12}" width="52" height="11" rx="5.5" fill="${GREEN}" stroke="${ОБВОД}" stroke-width=".6"/></g>${т(0,14.5+k*12,w,9,ЧЕРНИЛА,true)}</g>`).join('')}
      <ellipse cx="0" cy="0" rx="34" ry="9" fill="none" stroke="url(#рм-латунь)" stroke-width="3.2"/>
      <ellipse cx="0" cy="0" rx="34" ry="9" fill="none" stroke="${ОБВОД}" stroke-width=".7"/>
    </g>`;
  }

  /* ================= КАДРЫ ================= */

  /* 1. Сачок */
  function F1(s){
    const Н=300, пойм=Array.isArray(s.пойм1)?s.пойм1:[], ош=s.ош1, всё=СУЩ1.every(i=>пойм.includes(i)), М=Р();
    const юн = М.юнга(-6,20,0.62,{поза:'сачок',безНог:true,взгляд:1});
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ночью был шторм. Волны размыли страницу судового журнала, и слова уплыли в море. Капитан говорит: «Юнга, лови сачком только <b>имена предметов</b> — слова, которые отвечают на вопрос <b>кто?</b> или <b>что?</b>». Касайся дощечек со словами.') +
      `<div class="pic">${свг(`
        ${М.небо(336,96,{солнце:[292,34,11],облака:[[76,30,0.66,10],[196,52,0.5,-6]]})}
        ${М.берег(96,{x1:210})}
        ${М.море(96,Н-96,336,{дорожка:292})}
        ${М.чайка(214,26,0.8,{дрейф:'-14 -4'})}${М.чайка(250,50,0.55,{темп:1.1,дрейф:'10 -2'})}
        ${БУЙКИ.map((б,i)=>пойм.includes(i)?'':дощечка(46+(i%4)*82,124+Math.floor(i/4)*40,б.с,ош===i,i)).join('')}
        ${М.лодка(88,Н-46,1,{внутри:`<g>${юн}</g>`,имя:''})}
        ${сачок(172,Н-110,пойм.map(i=>БУЙКИ[i].с),s.поймал)}
        ${подпись(270,Н-16,'в сачке: '+пойм.length+' из 4',всё?GREEN:ИНК,13)}
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
    const Н=270, в=s.ответ2, ок=в===0, М=Р();
    const рама=(x,рис,слово,кл)=>`<g>${вырасти('8s',0.05+x/1400)}
      <clipPath id="${кл}"><rect x="${x-48}" y="44" width="96" height="120" rx="8"/></clipPath>
      <g filter="url(#c861-тень)"><rect x="${x-52}" y="40" width="104" height="160" rx="10" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.4"/></g>
      <g clip-path="url(#${кл})">${рис}</g>
      <rect x="${x-48}" y="44" width="96" height="120" rx="8" fill="none" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${x-40}" y="170" width="80" height="22" rx="4" fill="url(#рм-бумага)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${т(x,186,слово,14,ЧЕРНИЛА,true)}</g>`;
    const шторм = `<rect x="10" y="44" width="96" height="120" fill="#3a4a62"/>
      <path d="M14 70 q8 -18 26 -14 q8 -14 26 -6 q16 -6 24 8 q10 2 8 14 H14z" fill="url(#c861-туча)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M58 86 l-8 16 h8 l-6 16 l16 -22 h-8 l6 -10z" fill="#ffe46a" stroke="${ОБВОД}" stroke-width=".7">${анЛин('opacity','1;0.2;1;1','1.4s')}</path>
      ${Array.from({length:8},(_,k)=>`<line x1="${20+k*11}" y1="${92+(k%3)*6}" x2="${14+k*11}" y2="${108+(k%3)*6}" stroke="#a8c8e8" stroke-width="1.2">${анЛин('transform','0','1s')}</line>`).join('')}
      <path d="M10 140 q12 -14 24 0 t24 0 t24 0 t24 0 V164 H10z" fill="#2a5a8a"/><path d="M10 140 q12 -14 24 0 t24 0 t24 0 t24 0" stroke="#e8f6ff" stroke-width="1.6" fill="none"/>`;
    const радость = `<rect x="116" y="44" width="96" height="120" fill="#bfe4f6"/>${М.солнце(186,62,8)}
      <rect x="116" y="146" width="96" height="18" fill="#f0dca8"/>
      <g>${М.качать('0 0;0 -8;0 0','0.9s')}${М.юнга(160,150,0.62,{поза:'машет',шапка:true})}</g>`;
    const дружба = `<rect x="222" y="44" width="96" height="120" fill="#d8ecd0"/>
      <rect x="222" y="146" width="96" height="18" fill="#caa870"/>
      ${М.капитан(250,160,0.5,{трубка:false,взгляд:1})}${М.юнга(290,160,0.56,{взгляд:-1})}
      <path d="M270 128 q4 -6 8 0 q4 -6 8 0 q0 5 -8 10 q-8 -5 -8 -10z" fill="#e8604a" stroke="${ОБВОД}" stroke-width=".7">${анЛин('opacity','1;0.6;1','1.1s')}</path>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга удивляется: «Шторм нельзя положить в сундук, радость — потрогать. Разве это предметы?» Капитан: «В грамматике <b>предмет</b> — всё, о чём можно спросить <b>что?</b> или <b>кто?</b>: и вещь, и зверь, и ветер, и чувство». Какое из слов — имя существительное?') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}
        ${т(168,28,'что это? — шторм, радость, дружба',14,GOLD,true,undefined,'#2a1808')}
        ${рама(58,шторм,'шторм','c861-р1')}${рама(164,радость,'радость','c861-р2')}${рама(270,дружба,'дружба','c861-р3')}
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
    const Н=280, реш=s.реш3||{}, все=ГРУЗ.every((_,i)=>реш[i]!=null), верно=все&&ГРУЗ.every((г,i)=>реш[i]===г.о), М=Р();
    const вКаюте=ГРУЗ.filter((г,i)=>реш[i]===0).map(г=>г.с), вТрюме=ГРУЗ.filter((г,i)=>реш[i]===1).map(г=>г.с);
    const табличка=(x,y,w,светлая)=>`<g>${сдвигРаз('0 -24','0 0','0.45s',0)}<g filter="url(#c861-тень)"><rect x="${x-40}" y="${y-15}" width="80" height="22" rx="5" fill="${светлая?'url(#рм-бумага)':'#3a2410'}" stroke="${светлая?ОБВОД:'#c8a870'}" stroke-width="1"/></g>${т(x,y+1,w,15,светлая?ЧЕРНИЛА:'#f4e6c0',true)}</g>`;
    const корпус='M14 70 H322 L302 238 Q168 262 34 238 Z';
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Капитан велит навести порядок: всех, про кого спрашивают <b>кто?</b>, — в каюту, всё, про что спрашивают <b>что?</b>, — в трюм. Реши про каждое слово.') +
      `<div class="pic">${свг(`
        ${М.небо(336,90,{облака:[[60,26,0.6,8],[260,40,0.5,-6]]})}
        ${М.море(90,Н-90,336,{})}
        <line x1="168" y1="70" x2="168" y2="10" stroke="url(#рм-мачта)" stroke-width="6"/>
        <path d="M170 12 q14 -4 28 0 q14 4 28 0 v14 q-14 4 -28 0 q-14 -4 -28 0z" fill="#e05a3a" stroke="${ОБВОД}" stroke-width=".9"/>
        <line x1="168" y1="14" x2="24" y2="70" stroke="#6a5a44" stroke-width=".9"/><line x1="168" y1="14" x2="312" y2="70" stroke="#6a5a44" stroke-width=".9"/>
        <g filter="url(#c861-тень)"><path d="${корпус}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.8"/></g>
        <path d="M14 70 H322" stroke="#e8b878" stroke-width="4"/><path d="M14 70 H322" stroke="${ОБВОД}" stroke-width="1"/>
        <rect x="32" y="84" width="128" height="140" rx="6" fill="#f3e4c2" stroke="${ОБВОД}" stroke-width="1.2"/>
        <rect x="176" y="84" width="128" height="140" rx="6" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.2"/>
        ${М.доски(176,84,128,140,true)}
        <line x1="168" y1="72" x2="168" y2="244" stroke="${ОБВОД}" stroke-width="3"/>
        <circle cx="140" cy="206" r="10" fill="#bfe4f6" stroke="url(#рм-латунь)" stroke-width="3"/><circle cx="137" cy="203" r="3" fill="#fff" opacity=".7"/>
        <g transform="translate(48 206)"><line x1="0" y1="-12" x2="0" y2="-4" stroke="${ОБВОД}"/><rect x="-5" y="-4" width="10" height="14" rx="2" fill="#ffe7a0" stroke="${ОБВОД}" stroke-width=".8"/><circle cx="0" cy="3" r="9" fill="url(#рм-огонь)" opacity=".7">${анЛин('opacity','0.7;0.4;0.7','1.8s')}</circle></g>
        ${М.бочка(290,222,0.55)}${М.бухта(196,222,0.7)}
        ${т(96,100,'каюта · кто?',14,'#7a2a10',true)}${т(240,100,'трюм · что?',14,GOLD,true,undefined,'#2a1808')}
        ${вКаюте.map((w,k)=>табличка(96,132+k*30,w,true)).join('')}
        ${вТрюме.map((w,k)=>табличка(240,132+k*30,w,false)).join('')}
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
    const Н=290, в=s.ответ4, ок=в===0, М=Р();
    const лучи=(cx,cy)=>`<g>${анЛин('opacity','1;0.35;1','1.6s')}${[0,1,2,3,4,5,6,7].map(k=>{ const a=k*Math.PI/4+Math.PI/8, r1=24, r2=k%2?32:38;
      return `<line x1="${(cx+r1*Math.cos(a)).toFixed(1)}" y1="${(cy+r1*Math.sin(a)).toFixed(1)}" x2="${(cx+r2*Math.cos(a)).toFixed(1)}" y2="${(cy+r2*Math.sin(a)).toFixed(1)}" stroke="#fff4b0" stroke-width="1.8" stroke-linecap="round" data-декор="1"/>`; }).join('')}</g>`;
    const водоросль=(x,в2,цв)=>`<path d="M${x} ${Н-20} q-8 -${в2*0.3} 0 -${в2*0.55} q8 -${в2*0.25} 0 -${в2*0.45}" stroke="${цв}" stroke-width="4" fill="none" stroke-linecap="round">${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="-4 ${x} ${Н-20};4 ${x} ${Н-20};-4 ${x} ${Н-20}" dur="${(3+x%3).toFixed(0)}s" repeatCount="indefinite"/>`:''}</path>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ночью юнга записал в журнал: «Над мачтой зажглась <b>звезда</b>». А утром нырнул и увидел на дне <b>морскую звезду</b> — она медленно ползла по камню. Про звезду на небе спрашивают «что?». А про морскую?') +
      `<div class="pic">${свг(`
        ${М.небо(336,116,{ночь:true,луна:[296,30]})}
        ${лучи(84,52)}${М.морзвезда(84,52,20,{цвет:'#ffe488'})}
        ${т(84,104,'на небе: что?',14,'#dfe8ff',true,undefined,'#0a1428')}
        <g><rect x="0" y="116" width="336" height="${Н-116}" fill="url(#рм-море)"/></g>
        <path d="M0 116 h336" stroke="#bfe4ff" stroke-width="1.6" opacity=".6"/>
        ${[0,1,2,3,4].map(k=>`<path d="M${k*80-20} ${150+k*6} q40 30 80 0" stroke="#bfe4ff" stroke-width="10" fill="none" opacity=".05" data-декор="1"/>`).join('')}
        <path d="M0 ${Н-20} q60 -26 130 -18 q70 8 110 -14 q50 -18 96 -4 V${Н} H0z" fill="url(#c861-дно)" data-декор="1"/>
        <path d="M150 ${Н-18} q30 -34 80 -38 q50 4 70 34z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1" data-декор="1"/>
        ${водоросль(40,70,'#3f8a4a')}${водоросль(58,50,'#5aa85a')}${водоросль(316,64,'#3f8a4a')}
        ${[0,1,2].map(k=>`<circle cx="${200+k*14}" cy="${Н-90}" r="${2+k}" fill="none" stroke="#e8f6ff" stroke-width="1" opacity=".7">${анЛин('cy',`${Н-60};${Н-150}`,(2.4+k*0.6).toFixed(1)+'s')}${анЛин('opacity','0.8;0','2.6s')}</circle>`).join('')}
        <g transform="translate(0 0)">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;16 -2;0 0" dur="7s" repeatCount="indefinite"/>`:''}${М.морзвезда(234,Н-60,22,{лицо:true})}</g>
        ${т(250,144,'на дне: ?',14,'#dfe8ff',true,undefined,'#0f3f6c')}
        ${ок?подпись(250,186,'живая — кто?',GREEN,13):''}
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
    const Н=230, выбор=Array.isArray(s.загл5)?s.загл5:[], пров=s.пров5, М=Р();
    const верно = пров && выбор.slice().sort((a,b)=>a-b).join(',')===ЗАГЛАВНЫЕ.join(',');
    const слова = СТРОКА.map((w,i)=>выбор.includes(i)?сБольшой(w):w);
    let x=30, y=94; const куски=[];
    слова.forEach((w,i)=>{ const ш=w.length*12.5+16; if(x+ш>300){ x=30; y+=40; }
      куски.push(`<g>${выбор.includes(i)?`<rect x="${x-2}" y="${y-22}" width="${ш}" height="30" rx="5" fill="rgba(42,106,154,.18)"/>`:''}${т(x+4,y,w,19,выбор.includes(i)?'#1a4a8a':ЧЕРНИЛА,выбор.includes(i),'start')}</g>`); x+=ш+4; });
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга переписывает строку журнала, но от волнения забыл про <b>большие буквы</b>. Имена людей, названия кораблей и городов пишут с заглавной. Коснись слов, которые надо написать с большой буквы, и нажми «Проверить».') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}
        ${М.лист(14,26,308,Н-44,{линии:3})}
        ${т(30,54,'Журнал. День третий.',14,'#7a4a24',true,'start')}
        <g transform="translate(290 46)"><path d="M-8 6 q8 -6 16 0 v10 q-8 4 -16 0z" fill="#2a3a52" stroke="${ОБВОД}" stroke-width=".8"/><ellipse cx="0" cy="6" rx="8" ry="2.4" fill="#0e1a2a"/>
          <path d="M2 4 q10 -22 20 -30 q-2 12 -16 30" fill="#f4ecd8" stroke="${ОБВОД}" stroke-width=".7"/></g>
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
    const Н=270, в=s.ответ6, ок=в===2, М=Р();
    const сундук=(x,подп,слово,свет,знак)=>`${М.сундук(x,212,90,62,{надпись:true})}
      ${свет?`<rect x="${x-49}" y="146" width="98" height="70" rx="6" fill="none" stroke="${GREEN}" stroke-width="3"/>`:''}
      ${т(x,180,подп,13,ЧЕРНИЛА,true)}${т(x,198,слово,14,'#7a2a10',true)}${знак||''}`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В трюме три сундука с надписями. Капитан объясняет: подставь к слову «<b>он, мой</b>», «<b>она, моя</b>» или «<b>оно, моё</b>» — и узнаешь, в какой сундук класть. Якорь — он мой, мачта — она моя. А куда положить <b>весло</b>?') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}
        <rect x="0" y="212" width="336" height="${Н-212}" fill="#2a1808" opacity=".6"/>
        ${сундук(62,'он, мой','якорь',false)}${сундук(168,'она, моя','мачта',false)}${сундук(274,'оно, моё',ок?'весло':'?',ок)}
        ${т(62,244,'мужской род',12,МУТ,true)}${т(168,244,'женский род',12,МУТ,true)}${т(274,244,'средний род',12,МУТ,true)}
        <g>${ок?сдвигРаз('0 0','14 40','0.8s',0.2)+(ДВИЖ?ЗАВОД:''):М.качать('0 0;0 -5;0 0','1.6s')}${М.весло(262,90,0.9,-14)}</g>
        ${т(262,64,'весло',14,ИНК,true,undefined,'#2a1808')}
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
    const Н=270, в=s.ответ7, ок=в===0, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Капитан показывает: существительное меняется по <b>числам</b>. Один <b>парус</b> — много <b>парусов</b>, одна <b>чайка</b> — много <b>чаек</b>. Но есть хитрые слова, у которых нет «одного». Какое из них?') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{солнце:[40,34,10],облака:[[150,30,0.55,8]]})}
        ${М.берег(120,{x0:200,x1:336})}
        ${М.море(120,Н-120,336,{дорожка:40})}
        ${М.парусник(78,Н-66,0.55,{имя:''})}
        ${[0,1,2].map(k=>М.парусник(206+k*46,Н-70+(k%2)*10,0.3,{якорь:false})).join('')}
        ${подпись(78,Н-10,'один парус',ИНК,13)}${подпись(252,Н-10,'много парусов',ИНК,13)}
        ${ок?`<g transform="translate(168 64)" filter="url(#c861-тень)">
          <rect x="-58" y="-26" width="116" height="62" rx="8" fill="url(#рм-бумага)" stroke="${ОБВОД}" stroke-width="1"/>
          <g transform="translate(0 -4) rotate(-12)"><path d="M-4 0 L-30 -14 l3 -3 L2 -3z" fill="url(#c861-сталь)" stroke="${ОБВОД}" stroke-width=".7"/><path d="M-4 0 L-30 14 l3 3 L2 3z" fill="url(#c861-сталь)" stroke="${ОБВОД}" stroke-width=".7"/>
            <circle cx="6" cy="-6" r="6" fill="none" stroke="#c8402a" stroke-width="3"/><circle cx="6" cy="6" r="6" fill="none" stroke="#c8402a" stroke-width="3"/><circle cx="-2" cy="0" r="1.6" fill="${ОБВОД}"/></g>
          ${т(0,28,'ножницы',13,'#1a3a5a',true)}</g>`:''}
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
    const Н=270, в=s.ответ8, ок=в===0, М=Р();
    const водоросль=(x,в2,цв)=>`<path d="M${x} ${Н} q-8 -${в2*0.3} 0 -${в2*0.55} q8 -${в2*0.25} 0 -${в2*0.45}" stroke="${цв}" stroke-width="4" fill="none" stroke-linecap="round">${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="-5 ${x} ${Н};5 ${x} ${Н};-5 ${x} ${Н}" dur="${(3+x%3).toFixed(0)}s" repeatCount="indefinite"/>`:''}</path>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В сеть попалась колючая рыбка — <b>ёрш</b>. Юнга записал: «ёршь» — с мягким знаком, как «ночь» и «мышь». Капитан нахмурился. Как правильно?') +
      `<div class="pic">${свг(`
        <g><rect x="0" y="0" width="336" height="${Н}" fill="url(#рм-море)"/></g>
        ${[0,1,2,3].map(k=>`<path d="M${k*90-30} 0 l40 ${Н}" stroke="#e8f6ff" stroke-width="18" opacity=".05" data-декор="1"/>`).join('')}
        <path d="M0 ${Н-16} q80 -20 160 -6 q90 14 176 -8 V${Н} H0z" fill="url(#c861-дно)" data-декор="1"/>
        ${водоросль(24,80,'#3f8a4a')}${водоросль(40,56,'#5aa85a')}${водоросль(150,50,'#3f8a4a')}
        <g>${М.качать('0 0;-10 -4;0 0','3.4s')}${М.ёрш(80,96,1.35)}</g>
        ${[0,1,2].map(k=>`<circle cx="${40+k*6}" cy="84" r="${1.6+k*0.8}" fill="none" stroke="#e8f6ff" stroke-width="1" opacity=".8">${анЛин('cy','84;20',(2+k*0.5).toFixed(1)+'s')}${анЛин('opacity','0.8;0','2.4s')}</circle>`).join('')}
        ${т(84,150,ок?'ёрш — он мой':'ёрш_ ?',16,ИНК,true,undefined,'#0f3f6c')}
        ${М.лист(172,34,150,136,{})}
        ${т(247,64,'она, моя: с ь',13,'#1a6a3a',true)}${т(247,86,'ночь, мышь, рожь',14,ЧЕРНИЛА,true)}
        <line x1="186" y1="100" x2="308" y2="100" stroke="#c8b08a" stroke-width="1"/>
        ${т(247,122,'он, мой: без ь',13,'#7a2a10',true)}${т(247,144,'нож, плащ, '+(ок?'ёрш':'?'),14,ЧЕРНИЛА,true)}
        ${ок?подпись(168,Н-18,'ёрш — мужской род, без ь',GREEN,13):''}
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
    const Н=250, в=s.ответ9, ок=в===0, М=Р();
    const слова=['Утром','чайка','села','на','мачту.'], сущ=[1,4];
    let x=22; const куски=слова.map((w,i)=>{ const ш=w.length*11+8, g=`<g>${ок&&сущ.includes(i)?`<rect x="${x-4}" y="146" width="${ш}" height="34" rx="6" fill="rgba(143,209,168,.35)" stroke="${GREEN}"/>`:''}${ок&&i===0?`<rect x="${x-4}" y="146" width="${ш}" height="34" rx="6" fill="none" stroke="${RED}" stroke-dasharray="4 3"/>`:''}${т(x,172,w,20,ЧЕРНИЛА,false,'start')}</g>`; x+=ш+3; return {g,x0:x-ш-3,ш}; });
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Последняя проверка. Капитан диктует: «<b>Утром чайка села на мачту.</b>» Сколько в этой строке имён существительных? Осторожно: не каждое слово, похожее на предмет, — существительное.') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{солнце:[40,70,12],облака:[[220,30,0.5,6]]})}
        <g><rect x="0" y="96" width="336" height="${Н-96}" fill="#3a2410"/></g>
        <rect x="236" y="4" width="7" height="100" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".8"/>
        <rect x="222" y="30" width="36" height="5" rx="2" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
        ${М.чайка(248,22,1,{летит:false})}
        ${М.лист(12,116,312,Н-128,{})}
        ${куски.map(к=>к.g).join('')}
        ${ок?т(24,206,'когда?',13,RED,true,'start')+т(82,206,'кто?',13,'#1a6a3a',true,'start')+т(236,206,'что?',13,'#1a6a3a',true,'start'):''}
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
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=300, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Страница журнала снова целая. Капитан читает вслух и кивает: «Молодец, юнга. Все имена на месте, большие буквы тоже. Завтра поплывём дальше вдоль берега — к мысу, где живут слова-действия».'
        : 'Страница ещё не восстановлена — вернись к делам в журнале. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{закат:true,солнце:[268,96,16],облака:[[70,34,0.6,10]]})}
        ${М.утёс(40,120,0.8)}
        ${М.море(120,Н-120,336,{дорожка:268})}
        ${М.маяк(310,122,0.36,true)}
        ${М.чайка(200,40,0.8,{дрейф:'-16 -4'})}
        ${М.парусник(150,176,0.95,{имя:'Чайка'})}
        ${[['кто? что? — существительное',GOLD],['он мой · она моя · оно моё',BLUE],['Лёва, «Чайка» — с большой',GREEN]].map(([t0,ц],i)=>`<g>${проявить('9s',0.1+i*0.18,0.16+i*0.18)}${подпись(168,Н-70+i*28,t0,ц,13)}</g>`).join('')}
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
    if(!window.РМ){ el.innerHTML=''; return; }
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
