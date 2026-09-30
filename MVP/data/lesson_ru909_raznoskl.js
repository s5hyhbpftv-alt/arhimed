/* ============ РУССКИЙ ЯЗЫК · УРОК 909 · «РАЗНОСКЛОНЯЕМЫЕ СУЩЕСТВИТЕЛЬНЫЕ» ============
   6 класс, «Имя существительное». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–908). Рисунки — общая библиотека
   MVP/data/ris_more.js. НОВЫЕ ГЕРОИ: бегун-факелоносец Никон, коза Зоя, сеятель
   дед Деметрий (бегун, коза, сеятель); факел и пламя, клепсидра, жертвенник.

   СЮЖЕТ. «Огонь для праздника». Никон несёт пламя к жертвеннику Сиракуз.
   В его пути собрались все особые слова: пламя, время, знамя, имя, семя, путь.
   Они склоняются «по-разному»: часть окончаний — как у 3-го склонения, одно —
   как у 2-го, а в косвенных падежах вырастает суффикс -ен-.

   РУКАМИ: шесть падежей слова «пламя»; эстафета падежей слова «время»;
   игра «Огонь для праздника» — клепсидра отсчитывает время, три ошибки — и оно
   вышло; шесть факелов — зажечь только разносклоняемые.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     разносклоняемые — десять существительных на -мя (бремя, время, вымя,
       знамя, имя, пламя, племя, семя, стремя, темя) и слово путь;
     в Р., Д., П. падежах ед. ч. окончание -и (как у 3-го склонения), в Т. —
       -ем/-ём (как у 2-го): времени, временем; пути, путём;
     у слов на -мя в косвенных падежах суффикс -ен-: времени, именем, о знамени;
       в суффиксе пишется е;
     мн. ч.: времена, имена, знамёна, племена, семена; Р. п.: времён, имён,
       знамён, племён, но семян, стремян. */
(function(){
  'use strict';

  const ID = 909;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';

  const ДЕЛА = [
    {ключ:'эстафета', имя:'Пробежать эстафету падежей', итог:'5 из 5'},
    {ключ:'огонь',    имя:'Донести огонь',              итог:'праздник начат'},
    {ключ:'факелы',   имя:'Зажечь верные факелы',       итог:'3 из 3'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* кадр 1: шесть падежей слова «пламя» */
  const ПАДЕЖИ = [
    {п:'И.', в:'что?',    ч:['плам','','я'],     пред:''},
    {п:'Р.', в:'чего?',   ч:['плам','ен','и'],   пред:''},
    {п:'Д.', в:'чему?',   ч:['плам','ен','и'],   пред:''},
    {п:'В.', в:'что?',    ч:['плам','','я'],     пред:''},
    {п:'Т.', в:'чем?',    ч:['плам','ен','ем'],  пред:''},
    {п:'П.', в:'о чём?',  ч:['плам','ен','и'],   пред:'о '}
  ];
  /* кадр 4: эстафета слова «время» */
  const ЭСТ = [
    {п:'Р', в:'нет чего?',      вар:['времени','время','времи'],       ок:0, ф:'времени'},
    {п:'Д', в:'рад чему?',      вар:['времю','времени','время'],       ок:1, ф:'времени'},
    {п:'В', в:'вижу что?',      вар:['времени','времю','время'],       ок:2, ф:'время'},
    {п:'Т', в:'доволен чем?',   вар:['временем','времем','временью'],  ок:0, ф:'временем'},
    {п:'П', в:'думаю о чём?',   вар:['о времене','о времени','о время'], ок:1, ф:'о времени'}
  ];
  /* кадр 8: огонь для праздника */
  const ИГРА = [
    {до:'Никон не терял ни минуты', после:'.',              вар:['времени','время'],   ок:0, поч:'нет чего? — времени: суффикс -ен-, окончание -и'},
    {до:'Факел горел ярким',        после:'.',              вар:['пламем','пламенем'], ок:1, поч:'горел чем? — пламенем: суффикс -ен-, окончание -ем'},
    {до:'На',                       после:'вышит дельфин.', вар:['знамени','знамене'], ок:0, поч:'на чём? — на знамени: в предложном падеже окончание -и'},
    {до:'Дед Деметрий достал горсть', после:'.',            вар:['семён','семян'],     ок:1, поч:'горсть чего? — семян: эту форму надо запомнить'},
    {до:'Бегун шёл своим',          после:'.',              вар:['путём','путью'],     ок:0, поч:'шёл чем? — путём: окончание -ём, как у 2-го склонения'},
    {до:'Победителя назвали по',    после:'.',              вар:['имю','имени'],       ок:1, поч:'по чему? — по имени: суффикс -ен-, окончание -и'}
  ];
  /* кадр 9: шесть факелов */
  const ФАКЕЛЫ = [
    {т:'пламя', ок:true,  поч:'одно из десяти слов на -мя'},
    {т:'дыня',  ок:false, поч:'«дыня» — обычное слово 1-го склонения: дыни, дыне, дыней'},
    {т:'путь',  ок:true,  поч:'путь — одиннадцатое разносклоняемое слово'},
    {т:'тётя',  ок:false, поч:'«тётя» кончается на -тя, а не на -мя: это 1-е склонение'},
    {т:'имя',   ок:true,  поч:'одно из десяти слов на -мя'},
    {т:'ночь',  ок:false, поч:'«ночь» — 3-е склонение: ночи, ночью'}
  ];

  const CSS=`
  #lvis .s6.l909{gap:14px}
  #lvis .s6.l909 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l909 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l909 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l909 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l909 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l909 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l909 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l909 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l909 .карт .текст b{color:${GOLD}}
  #lvis .s6.l909 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l909 .правило b{color:${GOLD}}
  #lvis .s6.l909 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l909 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l909 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l909 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l909 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l909 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l909 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l909 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l909 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l909 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l909 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l909 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l909 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l909 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l909 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l909 .буйки button.мимо{border-color:${RED};animation:l909нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l909нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l909 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l909 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l909 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l909 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l909 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l909 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l909 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l909 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l909 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l909 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l909 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l909 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l909 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l909 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l909 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l909 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l909 .уровни .точка.сейчас{background:${GOLD};animation:l909dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l909dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l909 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l909{-webkit-text-size-adjust:100%}
  #lvis .s6.l909 [data-anim]{animation:l909rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l909rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l909 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l909 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l909 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l909 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l909 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l909 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l909 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l909 [data-anim]{animation:none!important}
    #lvis .s6.l909 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l909 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l909-style');
      if(!s){ s=document.createElement('style'); s.id='l909-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r909Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Огонь для праздника</span><b class="${всё?'готово':''}">${
        всё?'праздник начат':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c909-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c909-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c909-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c909-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c909-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c909-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  /* форма слова на светлой плашке: основа, суффикс -ен- в золотой рамке, окончание в красном квадрате */
  const форма = (cx,y,ч,опц) => { const о=опц||{}, к=о.кегль||20, w=(t0)=>String(t0).length*к*0.62, пред=о.пред||'';
    const wP=w(пред), wO=w(ч[0]), wS=ч[1]?w(ч[1])+8:0, wE=w(ч[2])+10, всё=wP+wO+wS+wE, x0=cx-всё/2, в=к+16, yб=y+к*0.36;
    const сег=(t0,x,ш,цвет)=>`<text x="${(x+ш/2).toFixed(1)}" y="${yб.toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${цвет}" font-family="Georgia,'Times New Roman',serif">${esc(t0)}</text>`;
    return `<g filter="url(#c909-тень)"><rect x="${(x0-12).toFixed(1)}" y="${(y-в/2).toFixed(1)}" width="${(всё+24).toFixed(1)}" height="${в}" rx="9" fill="#fffaf0" stroke="${о.обвод||ОБВОД}" stroke-width="${о.обвод?2.2:1.1}"/></g>
      ${пред?сег(пред.trim(),x0,wP-к*0.3,КАМЕНЬ):''}${сег(ч[0],x0+wP,wO,ЧЕРНИЛА)}
      ${ч[1]?`<rect x="${(x0+wP+wO+1).toFixed(1)}" y="${(y-к*0.62).toFixed(1)}" width="${(wS-2).toFixed(1)}" height="${(к*1.24).toFixed(1)}" rx="5" fill="#ffd76a" stroke="#8a5a10" stroke-width="1.4"/>`+сег(ч[1],x0+wP+wO,wS,'#5a3a08'):''}
      <rect x="${(x0+wP+wO+wS+2).toFixed(1)}" y="${(y-к*0.62).toFixed(1)}" width="${(wE-3).toFixed(1)}" height="${(к*1.24).toFixed(1)}" fill="none" stroke="#b8321e" stroke-width="1.8"/>${сег(ч[2],x0+wP+wO+wS,wE,'#b8321e')}`; };
  const пилюля = (cx,y,t0,опц) => { const о=опц||{}, к=о.кегль||10.5, ш=о.ш||String(t0).length*к*0.64+16;
    return `<g filter="url(#c909-тень)"><rect x="${(cx-ш/2).toFixed(1)}" y="${y-к-3}" width="${ш.toFixed(1)}" height="${к+9}" rx="${((к+9)/2).toFixed(1)}" fill="${о.фон||'#fffaf0'}" stroke="${о.обвод||ОБВОД}" stroke-width="${о.обвод?1.7:0.9}"/></g>${т(cx,y,t0,к,о.цвет||ЧЕРНИЛА,true)}`; };
  const земля = (y0,Н,опц) => { const о=опц||{};
    return `<path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28} V${Н} H0 Z" fill="url(#рм-холм)"/>
      <path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28}" stroke="#b6dc84" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M0 ${y0+8} Q168 ${y0-6} 336 ${y0+8} V${Н} H0 Z" fill="url(#рм-песок)"/>
      <g data-декор="1" opacity=".5">${Array.from({length:14},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${y0+20+((k*29)%Math.max(10,Н-y0-26))}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>
      ${о.ночь?`<rect x="0" y="${y0-54}" width="336" height="${Н-y0+54}" fill="#0a1430" opacity=".45"/>`:''}`; };

  /* ================= КАДРЫ ================= */

  /* 1. Шесть падежей слова «пламя» */
  function F1(s){
    const Н=310, М=Р(), вид=s.вид1||{}, к=s.пад1==null?0:s.пад1, все=ПАДЕЖИ.every((_,i)=>вид[i]), в=s.ответ1, ок=в===0, p=ПАДЕЖИ[к];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В Сиракузах праздник. Юный бегун <b>Никон</b> несёт к городскому жертвеннику <b>пламя</b>. Слово это непростое. Проведи его по всем шести падежам и посмотри, что вырастает у него внутри.') +
      `<div class="pic">${свг(`
        ${М.небо(336,170,{облака:[[60,110,0.5,8],[286,120,0.45,-5]]})}
        ${земля(190,Н)}
        ${М.портик(6,226,118,110,{колонн:4,дверь:false})}
        ${М.бегун(168,Н-14,0.9,{кольцо:!!p.ч[1]})}
        ${М.коза(262,Н-16,0.62,{влево:true})}
        ${форма(168,40,p.ч,{кегль:24,пред:p.пред,обвод:p.ч[1]?'#c89a1a':null})}
        ${подпись(168,88,p.п+' п. — '+p.в,GOLD,12.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="падежи">${ПАДЕЖИ.map((x,i)=>BTN(3+(i%5),(к===i?'вкл':'')+(вид[i]?' был':''),'<b>'+x.п+'</b>'+x.в,'r909Падеж('+i+')')).join('')}</div>` +
      (!все ? СКАЗ('Смотри','Пройди все шесть падежей. Следи за золотой рамкой в середине слова.') :
        ОТВЕТЫ('пара',['в четырёх','во всех шести'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','В скольких падежах у слова «пламя» появился суффикс <b>-ен-</b>?') :
          РАЗБОР(ок,['Верно: в Р., Д., Т. и П. падежах — плам<b>ен</b>и, плам<b>ен</b>ем. А в И. и В. суффикса нет: пламя.',
            'Посмотри на И. и В. падежи: там просто «пламя», без -ен-. Суффикс вырастает в <b>четырёх</b> остальных.'][в]))) +
      (ок ? ПРАВИЛО('У слов на <b>-мя</b> в родительном, дательном, творительном и предложном падежах появляется суффикс <b>-ен-</b>: пламя — плам<b>ен</b>и — плам<b>ен</b>ем.') : '');
  }

  /* 2. Десять слов и путь */
  function F2(s){
    const Н=300, М=Р(), в=s.ответ2, ок=в===0;
    const яч=(i)=>[8+(i%5)*64, i<5?8:90];
    const рис=[
      (cx,y)=>М.клепсидра(cx,y+54,0.46,0.6),
      (cx,y)=>`<path d="M${cx-13} ${y+52} q-5 -24 5 -32 q-3 -7 8 -7 q11 0 8 7 q10 8 5 32 z" fill="#c8a058" stroke="${ОБВОД}" stroke-width="1"/><path d="M${cx-4} ${y+20} q4 3 8 0" stroke="#7a5a2a" stroke-width="2" fill="none"/>`,
      (cx,y)=>`<rect x="${cx-3}" y="${y+8}" width="6" height="16" rx="2" fill="#8a5a2e" stroke="${ОБВОД}" stroke-width=".7"/><path d="M${cx-12} ${y+50} Q${cx-14} ${y+24} ${cx} ${y+24} Q${cx+14} ${y+24} ${cx+12} ${y+50} Z" fill="none" stroke="url(#рм-бронза)" stroke-width="4"/><rect x="${cx-14}" y="${y+47}" width="28" height="5" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>`,
      (cx,y)=>`<ellipse cx="${cx}" cy="${y+46}" rx="9" ry="6" fill="#a87a3a" stroke="${ОБВОД}" stroke-width=".9"/><path d="M${cx} ${y+42} Q${cx-2} ${y+28} ${cx+2} ${y+18}" stroke="#4a8a3a" stroke-width="2" fill="none"/><ellipse cx="${cx+7}" cy="${y+20}" rx="7" ry="3" fill="#6ab04a" transform="rotate(-30 ${cx+7} ${y+20})"/><ellipse cx="${cx-6}" cy="${y+26}" rx="6" ry="2.6" fill="#4f9a44" transform="rotate(30 ${cx-6} ${y+26})"/>`,
      (cx,y)=>М.пламя(cx,y+52,0.95),
      (cx,y)=>`<rect x="${cx-22}" y="${y+18}" width="44" height="30" rx="2" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/><text x="${cx}" y="${y+38}" text-anchor="middle" font-size="8.5" font-weight="bold" fill="#6a5a40" font-family="Georgia,serif">НИКОН</text>`,
      (cx,y)=>М.коза(cx-4,y+54,0.44),
      (cx,y)=>`<circle cx="${cx}" cy="${y+38}" r="15" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1"/><path d="M${cx-15} ${y+40} q4 8 0 12 M${cx+15} ${y+40} q-4 8 0 12" stroke="#f0ece4" stroke-width="4" stroke-linecap="round"/><path d="M${cx} ${y+8} v10" stroke="#b8321e" stroke-width="2"/><path d="M${cx-4} ${y+15} l4 6 l4 -6" fill="#b8321e"/>`,
      (cx,y)=>[[-12,40,'#5a3a1e'],[12,40,'#3a2418'],[0,30,'#8a6238']].map(([dx,dy,ц])=>`<circle cx="${cx+dx}" cy="${y+dy+6}" r="9" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".9"/><path d="M${cx+dx-9} ${y+dy+4} q9 -12 18 0 q-9 -5 -18 0z" fill="${ц}"/>`).join(''),
      (cx,y)=>`<rect x="${cx-16}" y="${y+10}" width="3" height="44" fill="url(#рм-мачта)"/><path d="M${cx-13} ${y+12} q12 -4 26 2 v18 q-14 -6 -26 -2 z" fill="#c8402a" stroke="${ОБВОД}" stroke-width=".9"/>`
    ];
    const слова=['время','бремя','стремя','семя','пламя','имя','вымя','темя','племя','знамя'];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед, судья праздника, показывает Никону десять слов на <b>-мя</b>. Все они склоняются так же, как «пламя». «Но есть ещё одно слово, одиннадцатое, — говорит он. — Оно у тебя под ногами».') +
      `<div class="pic">${свг(`
        ${М.небо(336,190,{облака:[]})}
        ${земля(206,Н)}
        ${слова.map((w,i)=>{ const [x,y]=яч(i); return `<g><rect x="${x}" y="${y}" width="62" height="78" rx="8" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1" opacity=".96"/>
          ${рис[i](x+31,y)}<rect x="${x}" y="${y+60}" width="62" height="18" rx="8" fill="rgba(14,26,20,.9)"/>${т(x+31,y+73,w,11.5,GOLD,true)}</g>`; }).join('')}
        <path d="M0 ${Н} L70 ${Н} Q150 250 336 226 V204 Q140 226 0 ${Н-24} Z" fill="#f0dcae" stroke="#b89a62" stroke-width="1"/>
        <rect x="262" y="196" width="4" height="36" fill="url(#рм-мачта)"/><rect x="238" y="190" width="58" height="20" rx="3" fill="url(#рм-доска)" stroke="${ок?GOLD:ОБВОД}" stroke-width="${ок?2.4:1}"/>${т(267,205,ок?'путь':'?',13,ЧЕРНИЛА,true)}
        ${М.бегун(120,Н-8,0.56,{поза:'бежит'})}${М.архимед(44,Н-10,0.5,{поза:'указывает'})}
        ${ок?подпись(190,Н-12,'десять слов на -мя и путь',GREEN,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['путь','день'],0,в,2) +
      (в==null ? СКАЗ('Вопрос','Какое слово — одиннадцатое?') :
        РАЗБОР(ок,['Верно: <b>путь</b>. Нет пут<b>и</b>, к пут<b>и</b>, пут<b>ём</b>, о пут<b>и</b> — склоняется по-особому, как слова на -мя.',
          '«День» — обычное слово 2-го склонения: дня, дню, днём. А вот <b>путь</b> — пути, пути, путём — особое.'][в])) +
      (ок ? ПРАВИЛО('<b>Разносклоняемые существительные</b> — десять слов на <b>-мя</b>: время, бремя, стремя, семя, пламя, имя, вымя, темя, племя, знамя — и слово <b>путь</b>.') : '');
  }

  /* 3. Почему «разно» */
  function F3(s){
    const Н=292, М=Р(), в=s.ответ3, ок=в===0;
    const строки=[['Р.','степ','и','времен','и',null,null,0],['Д.','степ','и','времен','и',null,null,0],['Т.',null,null,'времен','ем','кон','ём',1],['П.','о степ','и','о времен','и',null,null,0]];
    const ц3='#1a6a3a', ц2='#1a5a8a';
    const сл=(x,y,осн,ок2,цв,к)=>осн==null?т(x,y,'—',13,'#b8a27a',true):`<text x="${x}" y="${y}" text-anchor="middle" font-size="${к||14}" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">${esc(осн)}<tspan fill="${цв}">${esc(ок2)}</tspan></text>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('«Почему такие слова зовут <b>разно</b>склоняемыми?» — спрашивает Никон. Архимед разворачивает свиток: слева слово 3-го склонения, справа — 2-го, а посередине — «время». Сравни окончания.') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".1" data-декор="1"/>
        ${М.свиток(20,20,296,226)}
        ${т(72,50,'степь',15,ц3,true)}${т(72,64,'3-е склонение',9.5,ц3,true)}
        ${т(168,54,'время',17,ЧЕРНИЛА,true)}
        ${т(258,50,'конь',15,ц2,true)}${т(258,64,'2-е склонение',9.5,ц2,true)}
        <line x1="36" y1="74" x2="300" y2="74" stroke="#a88a5a" stroke-width="1"/>
        ${строки.map(([п,о3,е3,ов,ев,о2,е2,тип],i)=>{ const y=104+i*38;
          return `${т(34,y,п,11,КАМЕНЬ,true)}${сл(76,y,о3,е3,ц3,13)}
            <rect x="120" y="${y-19}" width="96" height="28" rx="8" fill="${тип?'#e0ecf8':'#e2f2e2'}" stroke="${тип?ц2:ц3}" stroke-width="1.3"/>${сл(168,y,ов,ев,тип?ц2:ц3,15)}
            ${сл(258,y,о2,е2,ц2)}
            ${тип?`<path d="M232 ${y-5} H220" stroke="${ц2}" stroke-width="2"/><path d="M224 ${y-10} l-7 5 l7 5" fill="${ц2}"/>`:`<path d="M106 ${y-5} H113" stroke="${ц3}" stroke-width="2"/><path d="M111 ${y-10} l7 5 l-7 5" fill="${ц3}"/>`}`; }).join('')}
        ${ок?подпись(168,Н-16,'окончания — из двух склонений',GREEN,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['как у 2-го склонения: конём — временем','как у 3-го склонения: степью — временем'],0,в,3) +
      (в==null ? СКАЗ('Вопрос','Окончание <b>-ем</b> в слове «временем» — как у какого склонения?') :
        РАЗБОР(ок,['Верно: <b>-ем</b> — как у 2-го склонения (конём). А <b>-и</b> в остальных падежах — как у 3-го (степи). Окончания из разных склонений!',
          'У 3-го склонения в творительном падеже -ью: степью. А «времен<b>ем</b>» — как «кон<b>ём</b>», это <b>2-е</b> склонение.'][в])) +
      (ок ? ПРАВИЛО('В Р., Д. и П. падежах — окончание <b>-и</b>, как у 3-го склонения. В Т. падеже — <b>-ем (-ём)</b>, как у 2-го. Окончания из разных склонений — потому и <b>разно</b>склоняемые.') : '');
  }

  /* 4. Эстафета падежей */
  function F4(s){
    const Н=300, М=Р(), n=Math.min(s.эст4||0,ЭСТ.length), отв=s.отв4, все=n>=ЭСТ.length;
    const X=[34,88,142,196,250,304], э=ЭСТ[Math.min(n,ЭСТ.length-1)];
    const бег=отв&&отв.ок&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="-54 0" to="0 0" dur="0.8s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.6 0.4 1"/>`:'';
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Путь Никона размечен шестью столбами — по числу падежей. У первого он взял слово <b>время</b>. Чтобы добежать до следующего столба, нужно назвать верную форму.') +
      `<div class="pic">${свг(`
        ${М.небо(336,160,{солнце:[296,30,10],облака:[[110,28,0.5,8]]})}
        ${земля(184,Н)}
        ${М.клепсидра(30,112,0.56,0.7)}
        ${X.map((x,i)=>{ const был=i<=n, буква='ИРДВТП'[i], фт=i===0?'время':ЭСТ[i-1].ф;
          return `<rect x="${x-10}" y="166" width="20" height="36" rx="3" fill="url(#рм-камень)" stroke="${был?'#c89a1a':ОБВОД}" stroke-width="${был?2:1}"/>
            <rect x="${x-13}" y="161" width="26" height="7" rx="2" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>${т(x,190,буква,14,был?'#7a2a10':КАМЕНЬ,true)}
            ${был?пилюля(Math.min(x,296),i%2?128:150,фт,{обвод:'#c89a1a',кегль:10}):''}`; }).join('')}
        <g transform="translate(${X[n]} ${Н-10})"><g>${бег}${М.бегун(0,0,0.56,{поза:все?'стоит':'бежит',кольцо:true})}</g></g>
        ${подпись(180,34,все?'эстафета пройдена':э.п+'. п.: '+э.в,все?GREEN:GOLD,13)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask три">${э.вар.map((w,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',w,'r909Эст('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Все столбы позади: время, врем<b>ен</b>и, врем<b>ен</b>и, время, врем<b>ен</b>ем, о врем<b>ен</b>и.')
        : отв ? (отв.ок ? РАЗБОР(true,'Верно: <b>'+ЭСТ[отв.i].ф+'</b>. Никон бежит к следующему столбу.')
                        : РАЗБОР(false,'Такой формы нет. Вспомни «пламя»: '+(э.ок===2&&э.п==='В'?'в винительном падеже слово такое же, как в именительном.':'в этом падеже нужен суффикс <b>-ен-</b> и окончание '+(э.п==='Т'?'<b>-ем</b>.':'<b>-и</b>.'))))
        : СКАЗ('Подсказка','Склоняй как «пламя»: пламени, пламени, пламя, пламенем, о пламени.')) +
      (все ? ПРАВИЛО('Время — нет врем<b>ени</b> — к врем<b>ени</b> — вижу время — доволен врем<b>енем</b> — о врем<b>ени</b>.') : '');
  }

  /* 5. Суффикс -ен-: пишем е */
  function F5(s){
    const Н=296, М=Р(), в=s.ответ5, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('У финиша поднято <b>знамя</b>. Коза Зоя тянется пожевать бахрому, а Никон читает надпись. Одна буква стёрлась. Какая?') +
      `<div class="pic">${свг(`
        ${М.небо(336,170,{облака:[[52,50,0.5,8],[290,40,0.45,-5]]})}
        ${земля(196,Н)}
        ${М.знамя(168,44,176,80,['#2a6ab8','#14307a'],{длина:118,тело:`<text x="168" y="92" text-anchor="middle" font-size="24" font-weight="bold" fill="#fff4c0" stroke="#0a1a4a" stroke-width="3" paint-order="stroke" font-family="Georgia,serif">на знам<tspan fill="${ок?'#ffd76a':'#ff8a6a'}">${ок?'е':'?'}</tspan>ни</text>`})}
        ${М.бегун(70,Н-10,0.72,{кольцо:true})}
        ${М.коза(252,Н-10,0.72,{влево:true})}
        ${ок?подпись(168,158,'суффикс -ен-: пишем е',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['е','и'],0,в,5) +
      (в==null ? СКАЗ('Вопрос','На знам…ни: какая буква в суффиксе?') :
        РАЗБОР(ок,['Верно: суффикс <b>-ен-</b> всегда с буквой <b>е</b>: на знам<b>е</b>ни, о врем<b>е</b>ни, по им<b>е</b>ни.',
          'Суффикса «-ин-» у этих слов не бывает. Только <b>-ен-</b>: знам<b>е</b>ни, врем<b>е</b>ни, им<b>е</b>ни.'][в])) +
      (ок ? ПРАВИЛО('В суффиксе <b>-ен-</b> пишется <b>е</b>: времени, имени, знамени, пламени. А окончание после него — <b>-и</b>: на знамен<b>и</b>.') : '');
  }

  /* 6. Путь */
  function F6(s){
    const Н=292, М=Р(), в=s.ответ6, ок=в===0;
    const камень=(x,y,м,t0)=>`<g transform="translate(${x} ${y}) scale(${м})"><ellipse cx="2" cy="1" rx="24" ry="3" fill="#231a12" opacity=".3"/><path d="M-22 0 V-16 Q0 -26 22 -16 V0 Z" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width="1"/>${т(0,-4,t0,11,ЧЕРНИЛА,true)}</g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('До города ещё далеко. Дорога вьётся мимо поля деда Деметрия. На придорожных камнях выбиты формы слова <b>путь</b>. Никон бежит и повторяет: «Каждый идёт своим…» Как закончить?') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{солнце:[48,40,11],облака:[[250,40,0.55,-6]]})}
        ${М.город(150,{})}
        <path d="M0 150 H336 V${Н} H0 Z" fill="#a8c070"/>
        ${Array.from({length:7},(_,k)=>`<path d="M0 ${168+k*20} Q70 ${162+k*20} 140 ${170+k*22}" stroke="#7a9040" stroke-width="1.2" fill="none" opacity=".7"/>`).join('')}
        <path d="M96 ${Н} L250 ${Н} Q214 220 186 150 H166 Q170 220 96 ${Н} Z" fill="#f0dcae" stroke="#b89a62" stroke-width="1.2"/>
        <path d="M172 ${Н} Q190 220 176 152" stroke="#c8a870" stroke-width="1.4" fill="none" stroke-dasharray="7 8"/>
        ${камень(232,194,0.74,'пути')}${камень(100,214,0.84,'пути')}${камень(250,244,0.96,ок?'путём':'?')}${камень(64,262,1.06,'о пути')}
        ${М.сеятель(300,Н-8,0.5,{влево:true})}
        ${М.бегун(176,Н-8,0.66,{поза:'бежит'})}
        ${ок?подпись(168,30,'путь — пути — путём — о пути',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['путём','путью'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Каждый идёт своим (чем?)…') :
        РАЗБОР(ок,['Верно: пут<b>ём</b> — окончание как у 2-го склонения (конём). А в остальных падежах — пут<b>и</b>.',
          '«Путью» — так было бы у 3-го склонения (степью). Но в творительном падеже «путь» берёт окончание 2-го: пут<b>ём</b>.'][в])) +
      (ок ? ПРАВИЛО('Слово <b>путь</b> склоняется так: нет пут<b>и</b>, к пут<b>и</b>, вижу путь, иду пут<b>ём</b>, о пут<b>и</b>.') : '');
  }

  /* 7. Множественное число */
  function F7(s){
    const Н=300, М=Р(), в=s.ответ7, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Дед Деметрий сеет: из сумы летят <b>семена</b>. «Было одно семя — стали семена, — говорит он. — Одно имя — имена, одно знамя — знамёна». Коза Зоя уже подбирается к суме. Сколько же у деда осталось?') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[70,112,0.5,8],[260,104,0.45,-5]]})}
        <path d="M0 140 Q80 112 170 132 Q260 108 336 134 V${Н} H0 Z" fill="url(#рм-холм)"/>
        <path d="M0 176 Q168 164 336 176 V${Н} H0 Z" fill="#8a6a44"/>
        ${Array.from({length:7},(_,k)=>`<path d="M0 ${190+k*17} Q168 ${180+k*17} 336 ${190+k*17}" stroke="#5a4028" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
        ${[[196,222],[226,250],[184,262],[252,214],[280,246]].map(([x,y])=>`<path d="M${x} ${y} q-1 -8 2 -12" stroke="#4a8a3a" stroke-width="1.6" fill="none"/><ellipse cx="${x+5}" cy="${y-12}" rx="5" ry="2.2" fill="#6ab04a" transform="rotate(-30 ${x+5} ${y-12})"/>`).join('')}
        ${М.сеятель(70,Н-10,0.84,{})}
        ${М.коза(262,Н-8,0.66,{влево:true})}
        ${форма(104,40,['сем','ен','а'],{кегль:20})}${подпись(104,82,'мн. ч.: что?',GOLD,11.5)}
        ${ок ? форма(250,40,['сем','','ян'],{кегль:20,обвод:'#2a8a4a'}) : форма(250,40,['сем','','…н'],{кегль:20})}${подпись(250,82,'нет чего?',GOLD,11.5)}
        ${ок?подпись(168,112,'времён, имён, знамён — но семян, стремян',GREEN,11):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['семян','семён'],0,в,7) +
      (в==null ? СКАЗ('Вопрос','Нет (чего?) сем…н. Времён, имён, знамён — а тут?') :
        РАЗБОР(ок,['Верно: <b>семян</b>. У двух слов особая форма — сем<b>ян</b> и стрем<b>ян</b>. У остальных -ён: времён, имён, знамён, племён.',
          'Так хочется по образцу «времён»… но нет: правильно <b>семян</b>. И ещё «стремян». Эти две формы надо запомнить.'][в])) +
      (ок ? ПРАВИЛО('Множественное число: врем<b>ена</b>, им<b>ена</b>, знам<b>ёна</b>, сем<b>ена</b>. Родительный падеж: врем<b>ён</b>, им<b>ён</b>, знам<b>ён</b>, плем<b>ён</b> — но сем<b>ян</b>, стрем<b>ян</b>.') : '');
  }

  /* 8. Огонь для праздника */
  function F8(s){
    const Н=310, М=Р(), и8=s.игр8||{}, n=Math.min(и8.n||0,ИГРА.length), ош=Math.min(и8.ош||0,3), отв=s.отв8, все=n>=ИГРА.length, вышло=ош>=3&&!все;
    const и=ИГРА[Math.min(n,ИГРА.length-1)], rx=34+n*36;
    const бег=отв&&отв.ок&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="-36 0" to="0 0" dur="0.7s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.6 0.4 1"/>`:'';
    return ЖУРНАЛ(s) +
      ЗАДАЧА(вышло ? 'Клепсидра опустела: время вышло, и факел погас. Никон переводит дух. Архимед наливает в часы свежей воды: «Беги ещё раз — и думай о суффиксе».'
        : 'Последний отрезок! Огонь надо донести до жертвенника, пока в клепсидре есть вода. Каждое верное слово — рывок вперёд. Каждая ошибка — треть воды вон. Три ошибки — и время вышло.') +
      `<div class="pic">${свг(`
        ${М.небо(336,180,{закат:true,солнце:[150,138,13],облака:[[240,40,0.55,-6]]})}
        ${земля(200,Н)}
        <rect x="0" y="146" width="336" height="${Н-146}" fill="#ff9a50" opacity=".1"/>
        ${М.знамя(236,96,50,40,['#2a6ab8','#14307a'],{длина:118})}
        ${М.жертвенник(284,272,0.92,все?1.5:0)}
        ${М.клепсидра(42,138,0.86,1-ош/3)}
        ${подпись(42,156,вышло?'время вышло':'воды: '+(3-ош)+' из 3',вышло?RED:BLUE,10.5)}
        ${[0,1,2,3,4,5].map(i=>`<circle cx="${34+(i+1)*36}" cy="${Н-14}" r="4" fill="${i<n?'#ffd76a':'#c8b890'}" stroke="${ОБВОД}" stroke-width=".8"/>`).join('')}
        <g transform="translate(${rx} ${Н-18})"><g>${бег}${М.бегун(0,0,0.62,{поза:все||вышло?'стоит':'бежит',сила:вышло?0:все?0.2:1-ош*0.25,кольцо:true})}</g></g>
        ${подпись(190,30,все?'огонь зажжён — праздник начат!':вышло?'факел погас':'до жертвенника рывков: '+(6-n),все?GREEN:вышло?RED:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Никон успел! Пламя взметнулось над жертвенником. Времени, пламенем, на знамени, семян, путём, по имени — ни одной ошибки в конце пути.')
        : вышло ? РАЗБОР(false,'Подсказка напоследок: '+и.поч+'.') + `<div class="ask">${BTN(4,'','Бежать заново',"r909Заново()")}</div>`
        : A(3,'карт','<span class="метка">Рывок '+(n+1)+' из 6</span><div class="текст" style="font-family:Georgia,serif">'+и.до+' <b style="border-bottom:2px solid '+GOLD+';padding:0 10px">…</b>'+(и.после==='.'?'.':' '+и.после)+'</div>') +
          `<div class="ask пара">${и.вар.map((w,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',w,'r909Игра('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'Верно: '+ИГРА[отв.i].поч+'.')
                         : РАЗБОР(false,'Вода уходит! Смотри: '+и.поч+'.'))
               : СКАЗ('Подсказка','Задай вопрос, определи падеж — и вспомни «пламя».'))) +
      (все ? ПРАВИЛО('Задай вопрос → определи падеж → в косвенном падеже добавь <b>-ен-</b> → окончание <b>-и</b> (в творительном <b>-ем</b>).') : '');
  }

  /* 9. Шесть факелов */
  function F9(s){
    const Н=294, М=Р(), лов=s.лов9||{}, мимо=s.мимо9||{}, посл=s.посл9, все=ФАКЕЛЫ.every((ф,i)=>!ф.ок||лов[i]);
    const где=[[62,102],[168,102],[274,102],[62,228],[168,228],[274,228]];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Стемнело. Вдоль дороги шесть факелов со словами. Никон зажигает от жертвенника только те, где написано <b>разносклоняемое</b> существительное. Их три. Покажи ему какие.') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{ночь:true,луна:[221,30]})}
        <path d="M0 ${Н-22} Q168 ${Н-36} 336 ${Н-22} V${Н} H0 Z" fill="#2a3a2a"/>
        ${ФАКЕЛЫ.map((ф,i)=>{ const [x,y]=где[i], сост=лов[i]?'есть':мимо[i]?'мимо':'';
          return `<rect x="${x-2.5}" y="${y-26}" width="5" height="${i<3?30:34}" fill="#3a2a1a"/>
            ${М.факел(x,y-20,0.95,сост==='есть'?1:0,{})}
            ${пилюля(x,y+24-(i<3?0:0),ф.т,{кегль:12,ш:72,фон:сост==='есть'?'#fff4c0':сост==='мимо'?'#e8b8a8':'#d8d0c0',обвод:сост==='есть'?'#c89a1a':сост==='мимо'?'#b8321e':null})}`; }).join('')}
        ${подпись(168,Н-8,все?'горят все три':'горит: '+ФАКЕЛЫ.filter((ф,i)=>ф.ок&&лов[i]).length+' из 3',все?GREEN:GOLD,11.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="буйки">${ФАКЕЛЫ.map((ф,i)=>BTN(3+(i%5),лов[i]?'пойман':мимо[i]?'мимо':'',ф.т,лов[i]?'':'r909Факел('+i+')')).join('')}</div>` +
      (все ? РАЗБОР(true,'Горят <b>пламя, путь, имя</b>. А «дыня», «тётя» и «ночь» — обычные слова 1-го и 3-го склонения.')
        : посл!=null ? РАЗБОР(ФАКЕЛЫ[посл].ок,(ФАКЕЛЫ[посл].ок?'Горит! «'+ФАКЕЛЫ[посл].т+'» — ':'Не загорелся: ')+ФАКЕЛЫ[посл].поч+'.')
        : СКАЗ('Подсказка','Ищи слова на -мя и слово «путь». Похожие окончания -ня, -тя не считаются.')) +
      (все ? ПРАВИЛО('Разносклоняемых слов всего <b>одиннадцать</b>: десять на -мя и путь. Дыня, тётя, дядя, земля — не из их числа.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Ночь праздника. Над жертвенником пляшет пламя, на ветру плещет знамя. Архимед высекает на мраморе имя бегуна, дед Деметрий угощает козу, а Никон улыбается: его путь окончен — и ни одной ошибки за всё время.'
        : 'Огонь ещё в пути — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{ночь:true,луна:[52,44]})}
        ${земля(212,Н,{ночь:true})}
        ${М.знамя(246,60,60,46,['#2a6ab8','#14307a'],{длина:130})}
        <circle cx="168" cy="160" r="70" fill="url(#рм-сияние)" opacity=".5"/>
        ${М.жертвенник(168,244,1.05,1.5)}
        ${М.архимед(40,250,0.58,{поза:'указывает'})}
        ${М.бегун(104,250,0.62,{факел:false})}
        ${М.коза(244,252,0.56,{влево:true})}
        ${М.сеятель(298,250,0.56,{сеет:false,влево:true})}
        ${[['10 слов на -мя и слово путь',GOLD],['Р., Д., П. — окончание -и: времени, пути',GREEN],['Т. — окончание -ем: временем, путём',BLUE],['в косвенных падежах — суффикс -ен-','#f0b890']].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.45).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,262+i*22,t0,ц,10.5)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Разносклоняемые</b> существительные — десять слов на -мя и слово путь. В Р., Д., П. падежах у них окончание <b>-и</b> (как у 3-го склонения), в Т. — <b>-ем, -ём</b> (как у 2-го). У слов на -мя в косвенных падежах появляется суффикс <b>-ен-</b>: времени, именем. Во множественном числе: времён, имён, но семян, стремян.') +
      ПРАВИЛО('<b>Время — времени — временем. Путь — пути — путём.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Нет (чего?) — слово «время».', варианты:[{т:'времени',ок:true},{т:'время',ок:false}], разбор:'Нет времени: -ен- и окончание -и.' },
    { вопрос:'Горит ярким (чем?) — слово «пламя».', варианты:[{т:'пламем',ок:false},{т:'пламенем',ок:true}], разбор:'Пламенем: -ен- и окончание -ем.' },
    { вопрос:'На знам…ни — какая буква?', варианты:[{т:'е',ок:true},{т:'и',ок:false}], разбор:'Суффикс -ен-: на знамени.' },
    { вопрос:'Шёл своим (чем?) — слово «путь».', варианты:[{т:'путью',ок:false},{т:'путём',ок:true}], разбор:'Путём — как у 2-го склонения.' },
    { вопрос:'Горсть (чего?) — слово «семена».', варианты:[{т:'семян',ок:true},{т:'семён',ок:false}], разбор:'Семян — особая форма.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r909Reset()")}</div>` +
        ПРАВИЛО('<b>Время — времени — временем. Путь — пути — путём.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r909Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Выбери форму', задания:[
    {q:'назвать по (имя)', в:0, варианты:['имени','имю'], раз:'По имени.'},
    {q:'подойти к (знамя)', в:0, варианты:['знамени','знамю'], раз:'К знамени.'},
    {q:'дружить с (племя)', в:1, варианты:['племем','племенем'], раз:'С племенем.'},
    {q:'забыть о (время)', в:0, варианты:['времени','времене'], раз:'О времени.'},
    {q:'сбиться с (путь)', в:1, варианты:['путя','пути'], раз:'С пути.'}
  ]};
  const Т2 = { имя:'Разносклоняемое?', задания:[
    {q:'бремя', в:0, варианты:['да','нет'], раз:'Одно из десяти слов на -мя.'},
    {q:'дядя', в:1, варианты:['да','нет'], раз:'1-е склонение.'},
    {q:'темя', в:0, варианты:['да','нет'], раз:'Одно из десяти слов на -мя.'},
    {q:'путь', в:0, варианты:['да','нет'], раз:'Одиннадцатое слово.'},
    {q:'дверь', в:1, варианты:['да','нет'], раз:'3-е склонение.'},
    {q:'стремя', в:0, варианты:['да','нет'], раз:'Одно из десяти слов на -мя.'}
  ]};
  const Т3 = { имя:'Множественное число', задания:[
    {q:'нет (имена)', в:0, варианты:['имён','имян'], раз:'Имён.'},
    {q:'много (семена)', в:1, варианты:['семён','семян'], раз:'Семян — запомни.'},
    {q:'нет (знамёна)', в:0, варианты:['знамён','знамян'], раз:'Знамён.'},
    {q:'нет (стремена)', в:1, варианты:['стремён','стремян'], раз:'Стремян — запомни.'},
    {q:'давние (время)', в:0, варианты:['времена','времени'], раз:'Времена.'}
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
        в, "r909T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r909TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L909 = {
    id: ID,
    title: 'Разносклоняемые существительные',
    ico: '🔥',
    src: 'Русский язык · 6 класс · Имя существительное', subj: 'rus',
    explain: [
      'Шесть падежей слова «пламя»: в четырёх вырастает суффикс -ен-.',
      'Десять слов на -мя и слово путь.',
      'Окончания из двух склонений: -и как у 3-го, -ем как у 2-го.',
      'Эстафета падежей слова «время».',
      'В суффиксе -ен- пишется е: на знамени.',
      'Путь — пути — путём.',
      'Множественное число: времён, имён, но семян, стремян.',
      'Огонь для праздника: шесть слов, три ошибки — и время вышло.',
      'Шесть факелов: зажги разносклоняемые.',
      'Итог: время — времени — временем.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: выбери форму.',
      'Тренажёр 2: разносклоняемое?',
      'Тренажёр 3: множественное число.'
    ],
    check: {
      q: 'Какое слово разносклоняемое, хотя и не на -мя?',
      choices: ['день','путь','степь'],
      ans: 1,
      exp: 'Путь — пути — путём.'
    },
    tasks: [
      { q:'Сколько всего разносклоняемых существительных?', kind:'unit', ans:11, tol:0,
        hints:['Десять на -мя и ещё одно.'], sol:'11.' },
      { q:'Творительный падеж слова «имя» —', kind:'choice', choices:['именем','имем','имей'], ans:0, tol:0,
        hints:['Суффикс -ен- и окончание -ем.'], sol:'Именем.' },
      { q:'Нет (чего?) — слово «семена».', kind:'choice', choices:['семён','семян','семен'], ans:1, tol:0,
        hints:['Особая форма.'], sol:'Семян.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.бегун){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L909.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Пламя Никона',2:'Десять слов и путь',3:'Почему «разно»',4:'Эстафета падежей',5:'На знамени',
      6:'Своим путём',7:'Семена',8:'Огонь для праздника',9:'Шесть факелов',10:'Ночь праздника',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l909" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Разносклоняемые существительные'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r909Падеж=(i)=>{ const s=S(); s.пад1=i; const в=Object.assign({0:true},s.вид1||{}); в[i]=true; s.вид1=в; chRender(0); };
  window.r909Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r909Эст=(j)=>{ const s=S(); const n=s.эст4||0; if(n>=ЭСТ.length) return;
    if(ЭСТ[n].ок===j){ s.эст4=n+1; s.отв4={i:n,ок:true}; if(n+1>=ЭСТ.length) s.дело_эстафета=true; }
    else s.отв4={i:n,ок:false,j:j};
    chRender(0); };
  window.r909Игра=(j)=>{ const s=S(); const и=Object.assign({n:0,ош:0},s.игр8||{}); if(и.n>=ИГРА.length||и.ош>=3) return;
    if(ИГРА[и.n].ок===j){ s.отв8={i:и.n,ок:true}; и.n++; if(и.n>=ИГРА.length) s.дело_огонь=true; }
    else { и.ош++; s.отв8={i:и.n,ок:false,j:j}; }
    s.игр8=и; chRender(0); };
  window.r909Заново=()=>{ const s=S(); s.игр8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r909Факел=(i)=>{ const s=S();
    if(ФАКЕЛЫ[i].ок){ const л=Object.assign({},s.лов9||{}); л[i]=true; s.лов9=л; if(ФАКЕЛЫ.every((ф,k)=>!ф.ок||л[k])) s.дело_факелы=true; }
    else { const м=Object.assign({},s.мимо9||{}); м[i]=true; s.мимо9=м; }
    s.посл9=i; chRender(0); };
  window.r909Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r909Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r909T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r909TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L909; else arr.push(L909); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU909={render:render, L:L909};
})();
