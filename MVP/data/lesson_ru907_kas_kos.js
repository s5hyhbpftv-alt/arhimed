/* ============ РУССКИЙ ЯЗЫК · УРОК 907 · «КОРНИ -КАС- И -КОС-» ============
   6 класс, «Словообразование. Орфография». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–1015). Рисунки — общая библиотека
   MVP/data/ris_more.js: чертёж на песке (бороздка, кругПесок), прибой, черепок,
   восковая табличка, Архимед, юнга; плитки букв рисуются в самом уроке.

   СЮЖЕТ. «Не касайся моих кругов!» Архимед чертит на песке круг и касательную.
   Юнга лишь коснулся чертежа — и услышал знаменитые слова. Из них и вырастает
   правило: касаться — коснуться. Запоминалка — сам чертёж: круг-корень, к
   которому прикоснулась касательная «-а-», — в корне а; круг без касательной
   похож на букву о.

   РУКАМИ: коснуться круга; шесть слов — шесть кругов на песке; черепки с
   чужими корнями; игра «успей до волны» — три ошибки, и прибой смывает чертёж;
   исправить ошибки писца на восковой табличке.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     в корне -кас-/-кос- пишется а, если после корня есть суффикс -а-
       (касаться, касание, прикасаться, касательная, касаясь);
     пишется о, если суффикса -а- после корня нет (коснуться, прикосновение,
       неприкосновенный, прикоснись, коснулась — здесь а не после корня);
     гласная в этом корне безударная, ударением её не проверить;
     слова с другими корнями под правило не подходят: косить (коса),
       кассир (касса), косынка (косой). */
(function(){
  'use strict';

  const ID = 907;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';

  const ДЕЛА = [
    {ключ:'круги',  имя:'Начертить шесть кругов', итог:'6 из 6'},
    {ключ:'волна',  имя:'Успеть до волны',        итог:'чертёж готов'},
    {ключ:'ошибки', имя:'Исправить писца',        итог:'4 из 4'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ЕСТЬ_А = 'после корня стоит суффикс -а-';
  /* кадр 4: шесть слов; поз — место гласной в слове */
  const СЛОВА4 = [
    {сл:'касаться',          поз:1, суф:3,    поч:ЕСТЬ_А},
    {сл:'коснуться',         поз:1, суф:null, поч:'после корня — -ну-, суффикса -а- нет'},
    {сл:'прикосновение',     поз:4, суф:null, поч:'после корня — -нов-, суффикса -а- нет'},
    {сл:'касание',           поз:1, суф:3,    поч:ЕСТЬ_А},
    {сл:'прикасаться',       поз:4, суф:6,    поч:ЕСТЬ_А},
    {сл:'неприкосновенный',  поз:6, суф:null, поч:'после корня — -нов-, суффикса -а- нет'}
  ];
  /* кадр 5: черепки */
  const ЧЕРЕПКИ = [
    {т:'касание',      ок:true,  поч:'корень кас- со значением «трогать»'},
    {т:'косить',       ок:false, поч:'«косить» — от «коса»: корень другой, с ударением проверяется'},
    {т:'прикоснуться', ок:true,  поч:'корень кос- со значением «трогать»'},
    {т:'кассир',       ок:false, поч:'«кассир» — от слова «касса», это совсем другой корень'},
    {т:'касательная',  ок:true,  поч:'касательная касается круга — тот самый корень'},
    {т:'косынка',      ок:false, поч:'«косынка» — от «косой»: корень другой'}
  ];
  /* кадр 7: успей до волны */
  const ВОЛНА = [
    {до:'Юнга чуть к',            после:'снулся чертежа.',            г:'о', поч:'после корня — -ну-, суффикса -а- нет'},
    {до:'«Не к',                  после:'сайся моих кругов!»',        г:'а', поч:ЕСТЬ_А},
    {до:'От лёгкого прик',        после:'сновения песок осыпался.',   г:'о', поч:'после корня — -нов-, суффикса -а- нет'},
    {до:'Прямая к',               после:'сается круга в одной точке.', г:'а', поч:ЕСТЬ_А},
    {до:'Волна уже к',            после:'снулась берега!',            г:'о', поч:'буква а здесь далеко от корня, сразу после него — -ну-'}
  ];
  /* кадр 8: ошибки писца */
  const ОШИБКИ = [
    {сл:['касаться','каснуться','касание'],                 плохо:1, верно:'коснуться',        поч:'после корня — -ну-, суффикса -а- нет, пишем о'},
    {сл:['прикосновение','прикоснуться','прикосаться'],     плохо:2, верно:'прикасаться',      поч:'после корня — суффикс -а-, пишем а'},
    {сл:['косательная','коснулся','касаясь'],               плохо:0, верно:'касательная',      поч:'после корня — суффикс -а-, пишем а'},
    {сл:['соприкасаться','неприкасновенный','прикоснись'],  плохо:1, верно:'неприкосновенный', поч:'после корня — -нов-, суффикса -а- нет, пишем о'}
  ];

  const CSS=`
  #lvis .s6.l907{gap:14px}
  #lvis .s6.l907 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l907 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l907 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l907 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l907 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l907 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l907 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l907 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l907 .карт .текст b{color:${GOLD}}
  #lvis .s6.l907 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l907 .правило b{color:${GOLD}}
  #lvis .s6.l907 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l907 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l907 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l907 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l907 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l907 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l907 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l907 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l907 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l907 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l907 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l907 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l907 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l907 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l907 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l907 .буйки button.мимо{border-color:${RED};animation:l907нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l907нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l907 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l907 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l907 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l907 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l907 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l907 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l907 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l907 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l907 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l907 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l907 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l907 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l907 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l907 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l907 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l907 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l907 .уровни .точка.сейчас{background:${GOLD};animation:l907dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l907dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l907 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l907{-webkit-text-size-adjust:100%}
  #lvis .s6.l907 [data-anim]{animation:l907rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l907rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l907 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l907 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l907 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l907 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l907 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l907 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l907 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l907 [data-anim]{animation:none!important}
    #lvis .s6.l907 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l907 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l907-style');
      if(!s){ s=document.createElement('style'); s.id='l907-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r907Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Круги на песке</span><b class="${всё?'готово':''}">${
        всё?'чертёж спасён':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c907-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c907-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.6+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c907-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c907-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c907-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c907-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  /* плитки букв: дуга корня, гласная корня цветом (а — золото, о — лазурь), суффикс -а- с «крышкой» */
  const Ш=19;
  const плитки = (cx,y,слово,опц) => { const о=опц||{}, б=String(слово).split(''), x0=cx-б.length*Ш/2+1;
    let s2='';
    б.forEach((ch,i)=>{ const гл=i===о.гл, суф=i===о.суф, x=x0+i*Ш, пусто=ch==='?';
      const fill = пусто ? 'rgba(14,26,20,.6)' : гл ? (ch==='а'?'#ffd76a':'#9ad4f4') : суф ? '#c8eec8' : 'url(#рм-мрамор)';
      s2+=`<rect x="${x.toFixed(1)}" y="${y}" width="17" height="26" rx="3.5" fill="${fill}" stroke="${пусто?GOLD:ОБВОД}" stroke-width="${гл||суф||пусто?1.7:0.9}"${пусто?' stroke-dasharray="3 2.5"':''}/>
        ${т(x+8.5,y+19,ch,16,пусто?GOLD:ЧЕРНИЛА,true)}`;
      if(i===о.метка) s2+=`<circle cx="${(x+8.5).toFixed(1)}" cy="${y+13}" r="15" fill="none" stroke="#b8321e" stroke-width="1.8" stroke-dasharray="4 3"/>`; });
    if(о.гл!=null){ const a=x0+(о.гл-1)*Ш, b=x0+(о.гл+1)*Ш+17, d=`M${a.toFixed(1)} ${y-3} Q${((a+b)/2).toFixed(1)} ${y-22} ${b.toFixed(1)} ${y-3}`;
      s2+=`<path d="${d}" stroke="#fffaf0" stroke-width="4.6" fill="none" opacity=".8"/><path d="${d}" stroke="#a0200e" stroke-width="2.3" fill="none"/>`; }
    if(о.суф!=null){ const x=x0+о.суф*Ш, d=`M${x.toFixed(1)} ${y-3} L${(x+8.5).toFixed(1)} ${y-14} L${(x+17).toFixed(1)} ${y-3}`;
      s2+=`<path d="${d}" stroke="#fffaf0" stroke-width="4.6" fill="none" opacity=".8"/><path d="${d}" stroke="#1a6a3a" stroke-width="2.3" fill="none"/>`; }
    if(о.удар!=null){ const x=x0+о.удар*Ш; s2+=`<path d="M${(x+6).toFixed(1)} ${y-4} l7 -9" stroke="${ЧЕРНИЛА}" stroke-width="2.6" stroke-linecap="round"/>`; }
    return `<g filter="url(#c907-тень)">${s2}</g>`; };
  const гладь = (Н,y0) => `<rect x="0" y="${y0||0}" width="336" height="${Н-(y0||0)}" fill="url(#рм-песок)"/>
    <g data-декор="1" opacity=".5">${Array.from({length:22},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${(y0||0)+12+((k*47)%Math.max(10,Н-(y0||0)-20))}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>`;
  /* касательная к кругу в точке под углом 35° вверх-вправо: [точка касания, концы] */
  const КОС=0.819, СИН=0.574;
  const касат = (cx,cy,r,L) => { const px=cx+r*КОС, py=cy-r*СИН; return {px:px,py:py,d:`M${(px-L*СИН).toFixed(1)} ${(py-L*КОС).toFixed(1)} L${(px+L*СИН).toFixed(1)} ${(py+L*КОС).toFixed(1)}`}; };

  /* ================= КАДРЫ ================= */

  /* 1. Не касайся моих кругов */
  function F1(s){
    const Н=310, М=Р(), тр=!!s.тронул1, в=s.ответ1, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед чертит на прибрежном песке круги. Юнге ужасно хочется потрогать ровную бороздку. Одним пальцем… чуть-чуть… Проверь, что будет.') +
      `<div class="pic">${свг(`
        ${М.небо(336,96,{солнце:[296,30,10],облака:[[90,28,0.5,8]]})}
        ${М.море(78,52,336,{})}
        <path d="M0 132 Q168 120 336 132 V${Н} H0 Z" fill="url(#рм-песок)"/>
        <g data-декор="1" opacity=".5">${Array.from({length:14},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${150+((k*47)%150)}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>
        ${М.кругПесок(138,198,40)}${М.кругПесок(206,222,22)}
        ${М.бороздка('M98 198 H178 M138 158 V238',{толщ:1.6})}
        ${тр?`<ellipse cx="174" cy="186" rx="13" ry="9" fill="#ecd6a4" transform="rotate(-28 174 186)"/><path d="M168 182 l10 6 M170 190 l9 3" stroke="#c8ac70" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="174" cy="186" r="12" fill="none" stroke="#ffd76a" stroke-width="2">${анЛин('r','10;17;10','1.6s')}</circle>`:''}
        ${М.архимед(44,206,0.62,{поза:'указывает'})}
        ${М.юнга(290,246,0.6,{поза:'стоит'})}
        ${тр ? реплика(14,88,202,'Не касайся моих кругов!',[48,-4])+реплика(164,150,164,'Я лишь коснулся…',[276,6])
             : реплика(196,150,124,'Можно тронуть?',[276,6])}
        ${тр ? плитки(84,278,'касайся',{гл:1,суф:3})+плитки(250,278,'коснулся',{гл:1}) : ''}
        ${рамка(Н)}
      `,Н)}</div>` +
      (!тр ? `<div class="ask">${BTN(4,'','Коснуться круга',"r907Тронуть()")}</div>` + СКАЗ('Начни','Нажми кнопку — юнга тронет бороздку.') :
        ОТВЕТЫ('пара',['касайся','коснулся'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Корень один, а гласные разные: к<b>а</b>сайся — к<b>о</b>снулся. В каком слове сразу после корня стоит суффикс <b>-а-</b>?') :
          РАЗБОР(ок,['Верно: кас-<b>а</b>-йся. Суффикс -а- стоит сразу за корнем — и в корне тоже <b>а</b>.',
            'В «коснулся» после корня идёт -ну-. Суффикс <b>-а-</b> — в слове кас-<b>а</b>-йся.'][в]))) +
      (ок ? ПРАВИЛО('В корне <b>-кас- / -кос-</b> пишется <b>а</b>, если после корня есть суффикс <b>-а-</b>: кас<b>а</b>ться. Если суффикса -а- нет — пишется <b>о</b>: коснуться.') : '');
  }

  /* 2. Касательная */
  function F2(s){
    const Н=300, М=Р(), в=s.ответ2, ок=в===0, к=касат(150,186,58,84);
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед проводит прямую, которая <b>касается</b> круга в одной-единственной точке. Она так и называется — <b>касательная</b>. И сам чертёж подсказывает правило.') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        ${М.кругПесок(150,186,58,{рисуется:true,длит:1.1})}
        ${М.бороздка(`M150 186 L${к.px.toFixed(1)} ${к.py.toFixed(1)}`,{толщ:1.6,рисуется:true,задержка:1.0,длит:0.5})}
        ${М.бороздка(к.d,{рисуется:true,задержка:1.4,длит:0.8})}
        <circle cx="150" cy="186" r="3" fill="#946c38"/>
        <circle cx="${к.px.toFixed(1)}" cy="${к.py.toFixed(1)}" r="5" fill="#ffd76a" stroke="${ОБВОД}" stroke-width="1"/>
        <circle cx="${к.px.toFixed(1)}" cy="${к.py.toFixed(1)}" r="10" fill="none" stroke="#ffd76a" stroke-width="2">${анЛин('r','8;15;8','1.8s')}</circle>
        ${т(150,236,'корень',11,КАМЕНЬ,true)}
        <text x="150" y="218" text-anchor="middle" font-size="30" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">к<tspan fill="#a0200e">а</tspan>с</text>
        <g transform="translate(248 214)"><rect x="-22" y="-14" width="44" height="26" rx="13" fill="#c8eec8" stroke="#1a6a3a" stroke-width="1.6"/>${т(0,5,'-а-',16,'#1a6a3a',true)}</g>
        ${плитки(168,26,'касательная',{гл:1,суф:3})}
        ${ок?подпись(168,Н-12,'коснулась касательная -а- — в корне а',GREEN,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['сразу после корня стоит суффикс -а-','на корень падает ударение'],0,в,2) +
      (в==null ? СКАЗ('Вопрос','Почему в корне слова «касательная» пишется <b>а</b>?') :
        РАЗБОР(ок,['Верно: кас-<b>а</b>-тельная. Суффикс -а- прикоснулся к корню, как касательная к кругу.',
          'Ударение здесь на «те»: каса́тельная. Дело в суффиксе <b>-а-</b> сразу после корня.'][в])) +
      (ок ? ПРАВИЛО('Запомни по чертежу: <b>круг — это корень</b>, касательная — суффикс <b>-а-</b>. Коснулась касательная круга — в корне <b>а</b>: касаться, касание, касательная.') : '');
  }

  /* 3. Коснулась */
  function F3(s){
    const Н=300, М=Р(), в=s.ответ3, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Набежала волна и едва <b>коснулась</b> круга. Юнга удивлён: «В слове же есть буква а! Почему в корне о?» Присмотрись, где эта а стоит.') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        ${М.кругПесок(168,216,46)}
        <text x="168" y="228" text-anchor="middle" font-size="30" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">к<tspan fill="#1a5a8a">о</tspan>с</text>
        ${М.прибой(162,336,{верх:-10})}
        <circle cx="168" cy="171" r="9" fill="none" stroke="#ffd76a" stroke-width="2.2">${анЛин('r','7;14;7','1.8s')}</circle>
        ${плитки(168,30,'коснулась',{гл:1,метка:6})}
        ${ок?подпись(168,96,'сразу после корня — -ну-, а не -а-',GREEN,12):''}
        ${М.архимед(46,Н-8,0.6,{поза:'указывает'})}${М.юнга(292,Н-8,0.56,{поза:'стоит'})}
        ${ок?подпись(168,122,'круг без касательной — как буква о',BLUE,11.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['эта а стоит не сразу после корня: за корнем идёт -ну-','это слово-исключение'],0,в,3) +
      (в==null ? СКАЗ('Вопрос','Почему в слове «коснулась» в корне <b>о</b>?') :
        РАЗБОР(ок,['Верно: кос-<b>ну</b>-л-а-сь. Буква а далеко, в самом хвосте слова. Сразу после корня суффикса -а- нет — пишем <b>о</b>.',
          'Исключений тут нет. Просто а стоит <b>не сразу после корня</b>: кос-ну-л-а-сь. За корнем идёт -ну-, значит, <b>о</b>.'][в])) +
      (ок ? ПРАВИЛО('Важна только та буква, что стоит <b>сразу после корня</b>. Нет там суффикса -а- — в корне <b>о</b>: коснуться, прикосновение. Круг без касательной сам похож на букву о.') : '');
  }

  /* 4. Шесть кругов */
  function F4(s){
    const Н=270, М=Р(), n=Math.min(s.кр4||0,СЛОВА4.length), отв=s.отв4, все=n>=СЛОВА4.length;
    const с=СЛОВА4[Math.min(n,СЛОВА4.length-1)];
    const X=[60,168,276], Y=[116,212];
    const круг=(i)=>{ const cx=X[i%3], cy=Y[i<3?0:1], w=СЛОВА4[i], есть=i<n, новый=есть&&i===n-1&&отв&&отв.ок, гл=w.сл[w.поз], кс=касат(cx,cy,24,30);
      if(!есть) return `<circle cx="${cx}" cy="${cy}" r="24" fill="none" stroke="#b89a62" stroke-width="1.4" stroke-dasharray="3 5"/>${i===n?т(cx,cy+8,'?',22,'#946c38',true):''}`;
      return `${М.кругПесок(cx,cy,24,{рисуется:новый,длит:0.7})}
        ${гл==='а'?М.бороздка(кс.d,{рисуется:новый,задержка:0.6,длит:0.5})+`<circle cx="${кс.px.toFixed(1)}" cy="${кс.py.toFixed(1)}" r="3.4" fill="#ffd76a" stroke="${ОБВОД}" stroke-width=".8"/>`:''}
        <text x="${cx}" y="${cy+8}" text-anchor="middle" font-size="24" font-weight="bold" fill="${гл==='а'?'#a0200e':'#1a5a8a'}" font-family="Georgia,serif">${гл}</text>
        ${т(cx,cy+44,w.сл,10.5,ЧЕРНИЛА,true)}`; };
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед разрешает юнге чертить самому — но по правилу. Слово с <b>а</b> в корне — круг с касательной. Слово с <b>о</b> — просто круг. Впиши гласную в шесть слов.') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        ${[0,1,2,3,4,5].map(круг).join('')}
        ${все ? плитки(168,26,'неприкосновенный',{гл:6})
              : плитки(168,26,с.сл.slice(0,с.поз)+'?'+с.сл.slice(с.поз+1),{гл:с.поз,суф:с.суф})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask пара">${['а','о'].map((б,к)=>BTN(4+к,отв&&!отв.ок&&отв.к===б?'miss':'','<span style="font-size:26px;font-family:Georgia,serif">'+б+'</span>',"r907Круг('"+б+"')")).join('')}</div>`) +
      (все ? РАЗБОР(true,'Шесть кругов на песке. С касательной: к<b>а</b>саться, к<b>а</b>сание, прик<b>а</b>саться. Без неё: к<b>о</b>снуться, прик<b>о</b>сновение, неприк<b>о</b>сновенный.')
        : отв ? (отв.ок
            ? РАЗБОР(true,'<b>'+СЛОВА4[отв.i].сл+'</b>: '+СЛОВА4[отв.i].поч+'. Следующее слово — на плитках.')
            : РАЗБОР(false,'Посмотри на плитки: '+с.поч+'. Значит, в корне <b>'+с.сл[с.поз]+'</b>.'))
        : СКАЗ('Подсказка','Найди корень (он под дугой) и посмотри на плитку сразу за ним: это суффикс -а-?')) +
      (все ? ПРАВИЛО('Есть после корня суффикс <b>-а-</b> — пиши <b>кас</b>. Нет — пиши <b>кос</b>.') : '');
  }

  /* 5. Черепки: чужие корни */
  function F5(s){
    const Н=232, М=Р(), лов=s.лов5||{}, мимо=s.мимо5||{}, посл=s.посл5, все=ЧЕРЕПКИ.every((б,i)=>!б.ок||лов[i]);
    const где=[[62,52],[168,44],[274,52],[62,136],[168,128],[274,136]];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На песке лежат глиняные черепки — на таких в Сиракузах пишут записки. Слова на них похожи, но не все от корня <b>-кас-/-кос-</b> со значением «трогать». Найди три таких слова.') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        ${ЧЕРЕПКИ.map((б,i)=>{ const [x,y]=где[i], сост=лов[i]?'есть':мимо[i]?'мимо':'';
          return `${М.черепок(x,y,1,i,{цвет:сост==='есть'?'#c8eec8':сост==='мимо'?'#e8b8a8':null,трещина:сост==='мимо'})}
            ${т(x,y+4,б.т,11.5,сост==='мимо'?'#7a2a1a':ЧЕРНИЛА,true)}
            ${сост==='есть'?`<circle cx="${x+40}" cy="${y-18}" r="8" fill="#2a8a4a" stroke="#fff" stroke-width="1.2"/>${т(x+40,y-14,'✓',10,'#fff',true)}`:''}`; }).join('')}
        ${М.краб(44,198,0.6)}${М.морзвезда(296,196,10)}
        ${подпись(168,Н-12,все?'найдены все три':'найдено '+ЧЕРЕПКИ.filter((б,i)=>б.ок&&лов[i]).length+' из 3',все?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="буйки">${ЧЕРЕПКИ.map((б,i)=>BTN(3+(i%5),лов[i]?'пойман':мимо[i]?'мимо':'',б.т,лов[i]?'':'r907Черепок('+i+')')).join('')}</div>` +
      (все ? РАЗБОР(true,'Найдены: <b>касание, прикоснуться, касательная</b>. А «косить», «кассир» и «косынка» только похожи — у них свои корни.')
        : посл!=null ? РАЗБОР(ЧЕРЕПКИ[посл].ок,(ЧЕРЕПКИ[посл].ок?'Да: ':'Мимо: ')+ЧЕРЕПКИ[посл].поч+'.')
        : СКАЗ('Подсказка','Подходит только корень со значением «трогать, дотрагиваться».')) +
      (все ? ПРАВИЛО('Правило работает только для корня со значением <b>«трогать»</b>. Косить (коса), кассир (касса), косынка (косой) — другие корни.') : '');
  }

  /* 6. Ударение молчит */
  function F6(s){
    const Н=290, М=Р(), в=s.ответ6, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга вспоминает школьное правило: «Сомневаешься в гласной — поставь её под ударение!» Архимед качает головой: «Попробуй. Где ударение в этих словах?»') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[60,120,0.45,6],[280,110,0.4,-5]]})}
        ${М.море(140,40,336,{})}
        <path d="M0 176 Q168 164 336 176 V${Н} H0 Z" fill="url(#рм-песок)"/>
        ${плитки(168,34,'касаться',{гл:1,удар:3})}
        ${плитки(168,92,'коснуться',{гл:1,удар:4})}
        ${ок?подпись(168,144,'ударение не на корне — смотри на суффикс',GREEN,11.5):''}
        ${М.кругПесок(168,232,30)}${М.бороздка(касат(168,232,30,40).d)}
        ${М.архимед(64,Н-8,0.66,{поза:'стоит'})}${М.юнга(272,Н-8,0.6,{поза:'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['посмотреть, есть ли после корня суффикс -а-','подобрать слово, где корень под ударением'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Как же проверить гласную в корне -кас-/-кос-?') :
        РАЗБОР(ок,['Верно: каса́ться, косну́ться — ударение оба раза убегает с корня. Остаётся смотреть на <b>суффикс</b>.',
          'Не выйдет: каса́ться, косну́ться, прикоснове́ние — корень всё время безударный. Смотри на <b>суффикс после корня</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>-кас-/-кос-</b> — корень с чередованием. Ударением его не проверить: выбирай букву <b>по суффиксу</b> после корня.') : '');
  }

  /* 7. Успей до волны */
  function F7(s){
    const Н=310, М=Р(), в7=s.вол7||{}, n=Math.min(в7.n||0,ВОЛНА.length), ош=Math.min(в7.ош||0,3), отв=s.отв7, все=n>=ВОЛНА.length, смыло=ош>=3&&!все;
    const к=касат(168,230,44,66), фронт=74+ош*40;
    const шаг=(i)=>n>i, нов=(i)=>отв&&отв.ок&&n===i+1;
    const ч=ВОЛНА[Math.min(n,ВОЛНА.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА(смыло ? 'Три ошибки — и прибой слизнул чертёж. Архимед вздыхает, разравнивает песок и берёт палочку: «Начнём сначала».'
        : 'Начинается прилив. Архимед спешит закончить чертёж: каждая верная буква — новая линия. Но каждая ошибка подпускает волну ближе. Три ошибки — и чертёж смоет!') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        <g opacity="${смыло?0.22:1}">
          ${шаг(0)?М.кругПесок(168,230,44,{рисуется:нов(0),длит:0.8}):`<circle cx="168" cy="230" r="44" fill="none" stroke="#b89a62" stroke-width="1.4" stroke-dasharray="3 5"/>`}
          ${шаг(1)?М.бороздка(`M168 230 L${к.px.toFixed(1)} ${к.py.toFixed(1)}`,{толщ:1.8,рисуется:нов(1),длит:0.6})+`<circle cx="168" cy="230" r="3" fill="#946c38"/>`:''}
          ${шаг(2)?М.бороздка(к.d,{рисуется:нов(2),длит:0.8}):''}
          ${шаг(3)?`<circle cx="${к.px.toFixed(1)}" cy="${к.py.toFixed(1)}" r="5" fill="#ffd76a" stroke="${ОБВОД}" stroke-width="1"/><circle cx="${к.px.toFixed(1)}" cy="${к.py.toFixed(1)}" r="10" fill="none" stroke="#ffd76a" stroke-width="2">${анЛин('r','8;15;8','1.8s')}</circle>`:''}
          ${шаг(4)?`<g transform="translate(${к.px.toFixed(1)} ${к.py.toFixed(1)}) rotate(55)">${М.бороздка('M-12 0 V-12 H0',{толщ:1.6,рисуется:нов(4),длит:0.5})}</g>${т(к.px+30,к.py-4,'90°',13,'#7a5420',true)}`:''}
        </g>
        <g>${ДВИЖ&&отв&&!отв.ок?`<animateTransform attributeName="transform" type="translate" from="0 -40" to="0 0" dur="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.7 0.3 1"/>`:''}${М.прибой(смыло?208:фронт,336,{верх:-60})}</g>
        ${М.архимед(40,Н-8,0.58,{поза:'указывает'})}${М.юнга(298,Н-8,0.54,{поза:все?'машет':'стоит'})}
        ${подпись(168,Н-10,все?'чертёж готов, волна не успела':смыло?'чертёж смыло':'линий: '+n+' из 5 · ошибок: '+ош+' из 3',все?GREEN:смыло?RED:GOLD,11.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Успел! Круг, радиус, касательная, точка касания и прямой угол: радиус всегда перпендикулярен касательной. А прибой остался ни с чем.')
        : смыло ? РАЗБОР(false,'Последняя подсказка от Архимеда: '+ч.поч+'.') + `<div class="ask">${BTN(4,'','Начертить заново',"r907Заново()")}</div>`
        : A(3,'карт','<span class="метка">Строка '+(n+1)+' из 5</span><div class="текст" style="font-family:Georgia,serif">'+ч.до+'<b style="border-bottom:2px solid '+GOLD+';padding:0 5px">?</b>'+ч.после+'</div>') +
          `<div class="ask пара">${['а','о'].map((б,к2)=>BTN(4+к2,отв&&!отв.ок&&отв.к===б?'miss':'','<span style="font-size:26px;font-family:Georgia,serif">'+б+'</span>',"r907Волна('"+б+"')")).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'Верно: '+ВОЛНА[отв.i].поч+'. Архимед проводит ещё одну линию.')
                         : РАЗБОР(false,'Волна подступила! Смотри: '+ч.поч+' — нужна <b>'+ч.г+'</b>.'))
               : СКАЗ('Подсказка','Что стоит сразу после корня — суффикс -а- или что-то другое?'))) +
      (все ? ПРАВИЛО('Каса́ться, каса́ется, каса́йся — после корня <b>-а-</b>. Косну́ться, косну́лась, прикоснове́ние — после корня <b>-ну-, -нов-</b>.') : '');
  }

  /* 8. Ошибки писца */
  function F8(s){
    const Н=250, М=Р(), n=Math.min(s.ош8||0,ОШИБКИ.length), отв=s.отв8, все=n>=ОШИБКИ.length;
    const р=ОШИБКИ[Math.min(n,ОШИБКИ.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Писец торопился и в каждой тройке слов сделал одну ошибку. Архимед протягивает юнге стилос: «Найди слово с ошибкой — я исправлю».') +
      `<div class="pic">${свг(`
        ${М.доски(0,0,336,Н,true)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".1" data-декор="1"/>
        ${М.восковая(28,16,280,190,{})}
        ${р.сл.map((w,i)=>{ const испр=все&&i===р.плохо;
          return `<text x="160" y="${70+i*48}" text-anchor="middle" font-size="21" font-style="italic" font-weight="${испр?'bold':'normal'}" fill="${испр?'#9ae6a8':'#e8d8a8'}" font-family="Georgia,serif">${испр?р.верно:w}</text>`; }).join('')}
        ${подпись(168,Н-10,все?'исправлено: 4 из 4':'исправлено: '+n+' из 4',все?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask">${р.сл.map((w,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',w,'r907Ошибка('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Табличка исправлена: <b>коснуться, прикасаться, касательная, неприкосновенный</b>.')
        : отв ? (отв.ок ? РАЗБОР(true,'Нашёл! Правильно — <b>'+ОШИБКИ[отв.i].верно+'</b>: '+ОШИБКИ[отв.i].поч+'. Следующая тройка — на табличке.')
                        : РАЗБОР(false,'Это слово написано верно. Проверь каждое: стоит ли сразу после корня суффикс -а-?'))
        : СКАЗ('Подсказка','В двух словах буква в корне согласна с суффиксом, в одном — нет.')) +
      (все ? ПРАВИЛО('Проверка в два шага: <b>найди корень</b> — <b>посмотри, что сразу за ним</b>.') : '');
  }

  /* 9. Развилка */
  function F9(s){
    const Н=302, М=Р(), в=s.ответ9, ок=в===0;
    const список=(cx,y,слова,ц)=>слова.map((w,i)=>`<rect x="${cx-68}" y="${y+i*24-15}" width="136" height="20" rx="10" fill="#fffaf0" stroke="${ц}" stroke-width="1.2"/>${т(cx,y+i*24-1,w,11,ЧЕРНИЛА,true)}`).join('');
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед чертит на песке развилку — всё правило на одном рисунке. Проверь по ней новое слово: <b>соприк…саться</b>.') +
      `<div class="pic">${свг(`
        ${гладь(Н)}
        ${М.кругПесок(168,52,30)}
        <text x="168" y="60" text-anchor="middle" font-size="20" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">к?с</text>
        ${М.бороздка('M146 74 Q110 96 86 118',{цвет:ок?'#c89a1a':null,толщ:ок?3.4:2.6})}${М.бороздка('M190 74 Q226 96 250 118')}
        <rect x="30" y="122" width="112" height="26" rx="13" fill="#c8eec8" stroke="#1a6a3a" stroke-width="1.6"/>${т(86,140,'есть -а-',14,'#1a6a3a',true)}
        <rect x="194" y="122" width="112" height="26" rx="13" fill="#e0ecf4" stroke="#1a5a8a" stroke-width="1.6"/>${т(250,140,'нет -а-',14,'#1a5a8a',true)}
        <text x="86" y="182" text-anchor="middle" font-size="26" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">к<tspan fill="#a0200e">а</tspan>с</text>
        <text x="250" y="182" text-anchor="middle" font-size="26" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,serif">к<tspan fill="#1a5a8a">о</tspan>с</text>
        ${список(86,210,['касаться','касание','касательная'],'#1a6a3a')}
        ${список(250,210,['коснуться','прикосновение','неприкосновенный'],'#1a5a8a')}
        ${ок?подпись(86,Н-12,'соприкасаться',GREEN,11.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['а','о'],0,в,9) +
      (в==null ? СКАЗ('Вопрос','Соприк…с-<b>а</b>-ться: что стоит сразу после корня?') :
        РАЗБОР(ок,['Верно: после корня суффикс -а- — идём по левой дорожке: соприк<b>а</b>саться.',
          'Посмотри ещё раз: соприкас-<b>а</b>-ться. Суффикс -а- на месте — значит, в корне <b>а</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Есть -а-</b> после корня → <b>кас</b>. <b>Нет -а-</b> → <b>кос</b>.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=334, М=Р(), к=касат(196,204,40,62);
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Вечер. Чертёж закончен, и волна до него не добралась. Юнга заложил руки за спину — на всякий случай. «Теперь я знаю, — говорит он. — Касаться нельзя. А вот коснуться правила — можно».'
        : 'Чертёж ещё не закончен — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{закат:true,солнце:[270,84,13],облака:[[80,30,0.6,6]]})}
        ${М.море(96,52,336,{дорожка:270})}
        <path d="M0 150 Q168 138 336 150 V${Н} H0 Z" fill="url(#рм-песок)"/>
        <rect x="0" y="140" width="336" height="${Н-140}" fill="#ff9a50" opacity=".12"/>
        ${М.кругПесок(196,204,40)}${М.бороздка(`M196 204 L${к.px.toFixed(1)} ${к.py.toFixed(1)}`,{толщ:1.8})}${М.бороздка(к.d)}
        <circle cx="196" cy="204" r="3" fill="#946c38"/><circle cx="${к.px.toFixed(1)}" cy="${к.py.toFixed(1)}" r="5" fill="#ffd76a" stroke="${ОБВОД}" stroke-width="1"/>
        ${М.архимед(58,250,0.64,{поза:'указывает'})}${М.юнга(296,246,0.56,{поза:'стоит'})}
        ${реплика(14,128,202,'Не касайся моих кругов!',[60,-4])}
        ${[['кас — если после корня суффикс -а-: касаться',GOLD],['кос — если суффикса -а- нет: коснуться',BLUE],['ударением не проверить — смотри на суффикс',GREEN]].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.5).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,276+i*24,t0,ц,10.5)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','В корне <b>-кас-/-кос-</b> гласная зависит от суффикса. Есть после корня суффикс <b>-а-</b> — пишем <b>а</b>: касаться, касание, касательная. Нет его — пишем <b>о</b>: коснуться, прикосновение, неприкосновенный. Ударением этот корень не проверить. А слова «косить», «кассир», «косынка» — с другими корнями.') +
      ПРАВИЛО('<b>Коснулась касательная -а- круга — в корне а. Круг один — в корне о.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'К…саться — какая буква в корне?', варианты:[{т:'а',ок:true},{т:'о',ок:false}], разбор:'Кас-а-ться: после корня суффикс -а-.' },
    { вопрос:'К…снуться — какая буква в корне?', варианты:[{т:'а',ок:false},{т:'о',ок:true}], разбор:'Кос-ну-ться: суффикса -а- нет.' },
    { вопрос:'Прик…сновение — какая буква в корне?', варианты:[{т:'о',ок:true},{т:'а',ок:false}], разбор:'Прикос-нов-ение: суффикса -а- нет.' },
    { вопрос:'В каком слове корень НЕ -кас-/-кос-?', варианты:[{т:'касание',ок:false},{т:'косить',ок:true}], разбор:'Косить — от «коса», другой корень.' },
    { вопрос:'Прик…саясь — какая буква в корне?', варианты:[{т:'а',ок:true},{т:'о',ок:false}], разбор:'Прикас-а-ясь: после корня суффикс -а-.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r907Reset()")}</div>` +
        ПРАВИЛО('<b>Коснулась касательная -а- круга — в корне а. Круг один — в корне о.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r907Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'А или О', задания:[
    {q:'к…сание', в:0, варианты:['а','о'], раз:'Кас-а-ние.'},
    {q:'к…снись', в:1, варианты:['а','о'], раз:'Кос-н-ись: суффикса -а- нет.'},
    {q:'прик…саться', в:0, варианты:['а','о'], раз:'Прикас-а-ться.'},
    {q:'неприк…сновенный', в:1, варианты:['а','о'], раз:'Неприкос-нов-енный.'},
    {q:'к…сательная', в:0, варианты:['а','о'], раз:'Кас-а-тельная.'},
    {q:'прик…снулся', в:1, варианты:['а','о'], раз:'Прикос-ну-лся.'}
  ]};
  const Т2 = { имя:'Есть ли -а- после корня', задания:[
    {q:'коснуться', в:1, варианты:['есть','нет'], раз:'После корня — -ну-.'},
    {q:'касаться', в:0, варианты:['есть','нет'], раз:'Кас-а-ться.'},
    {q:'прикосновение', в:1, варианты:['есть','нет'], раз:'После корня — -нов-.'},
    {q:'касаясь', в:0, варианты:['есть','нет'], раз:'Кас-а-ясь.'},
    {q:'коснулась', в:1, варианты:['есть','нет'], раз:'Ловушка: а стоит не сразу после корня.'}
  ]};
  const Т3 = { имя:'Найди верное', задания:[
    {q:'Дотрагиваться', в:0, варианты:['касаться','косаться'], раз:'Кас-а-ться.'},
    {q:'Дотронуться один раз', в:1, варианты:['каснуться','коснуться'], раз:'Кос-ну-ться.'},
    {q:'Лёгкое касание', в:0, варианты:['прикосновение','прикасновение'], раз:'Прикос-нов-ение.'},
    {q:'Прямая у круга', в:0, варианты:['касательная','косательная'], раз:'Кас-а-тельная.'},
    {q:'Он чуть…', в:1, варианты:['прикаснулся','прикоснулся'], раз:'Прикос-ну-лся.'}
  ]};
  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask${номер===3?'':' пара'}">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r907T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r907TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L907 = {
    id: ID,
    title: 'Корни -кас- и -кос-',
    ico: '⭕',
    src: 'Русский язык · 6 класс · Словообразование. Орфография', subj: 'rus',
    explain: [
      '«Не касайся моих кругов!»: касайся — коснулся.',
      'Касательная: после корня суффикс -а- — в корне а.',
      'Коснулась: суффикса -а- после корня нет — в корне о.',
      'Шесть слов — шесть кругов на песке.',
      'Черепки: косить, кассир, косынка — другие корни.',
      'Ударением корень не проверить.',
      'Успей до волны: пять строк, три ошибки — и чертёж смоет.',
      'Ошибки писца на восковой табличке.',
      'Развилка: есть -а- → кас, нет -а- → кос.',
      'Итог: круг и касательная.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: а или о.',
      'Тренажёр 2: есть ли -а- после корня.',
      'Тренажёр 3: найди верное.'
    ],
    check: {
      q: 'Когда в корне -кас-/-кос- пишется а?',
      choices: ['когда корень под ударением','когда после корня есть суффикс -а-','всегда'],
      ans: 1,
      exp: 'Кас-а-ться, но кос-ну-ться.'
    },
    tasks: [
      { q:'В скольких словах в корне пишется а: касаться, коснуться, касание, прикосновение?', kind:'unit', ans:2, tol:0,
        hints:['Ищи суффикс -а- после корня.'], sol:'2: касаться, касание.' },
      { q:'Прик…сновение — в корне пишется', kind:'choice', choices:['а','о','е'], ans:1, tol:0,
        hints:['После корня — -нов-.'], sol:'О: прикосновение.' },
      { q:'Какое слово НЕ от корня -кас-/-кос-?', kind:'choice', choices:['косынка','касание','прикоснуться'], ans:0, tol:0,
        hints:['От слова «косой».'], sol:'Косынка.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.прибой){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L907.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Не касайся моих кругов!',2:'Касательная',3:'Волна коснулась',4:'Шесть кругов',5:'Черепки',
      6:'Ударение молчит',7:'Успей до волны',8:'Ошибки писца',9:'Развилка на песке',10:'Круг и касательная',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l907" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Корни -кас- и -кос-'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r907Тронуть=()=>{ const s=S(); s.тронул1=true; chRender(0); };
  window.r907Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r907Круг=(б)=>{ const s=S(); const n=s.кр4||0; if(n>=СЛОВА4.length) return; const w=СЛОВА4[n];
    if(w.сл[w.поз]===б){ s.кр4=n+1; s.отв4={i:n,ок:true}; if(n+1>=СЛОВА4.length) s.дело_круги=true; }
    else s.отв4={i:n,ок:false,к:б};
    chRender(0); };
  window.r907Черепок=(i)=>{ const s=S();
    if(ЧЕРЕПКИ[i].ок){ const л=Object.assign({},s.лов5||{}); л[i]=true; s.лов5=л; }
    else { const м=Object.assign({},s.мимо5||{}); м[i]=true; s.мимо5=м; }
    s.посл5=i; chRender(0); };
  window.r907Волна=(б)=>{ const s=S(); const в=Object.assign({n:0,ош:0},s.вол7||{}); if(в.n>=ВОЛНА.length||в.ош>=3) return;
    if(ВОЛНА[в.n].г===б){ s.отв7={i:в.n,ок:true}; в.n++; if(в.n>=ВОЛНА.length) s.дело_волна=true; }
    else { в.ош++; s.отв7={i:в.n,ок:false,к:б}; }
    s.вол7=в; chRender(0); };
  window.r907Заново=()=>{ const s=S(); s.вол7={n:0,ош:0}; s.отв7=null; chRender(0); };
  window.r907Ошибка=(j)=>{ const s=S(); const n=s.ош8||0; if(n>=ОШИБКИ.length) return;
    if(ОШИБКИ[n].плохо===j){ s.ош8=n+1; s.отв8={i:n,ок:true}; if(n+1>=ОШИБКИ.length) s.дело_ошибки=true; }
    else s.отв8={i:n,ок:false,j:j};
    chRender(0); };
  window.r907Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r907Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r907T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r907TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L907; else arr.push(L907); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU907={render:render, L:L907};
})();
