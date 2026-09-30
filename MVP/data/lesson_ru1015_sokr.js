/* ============ РУССКИЙ ЯЗЫК · УРОК 1015 · «СЛОЖНОСОКРАЩЁННЫЕ СЛОВА» ============
   6 класс, «Словообразование». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–906). Рисунки — общая библиотека
   MVP/data/ris_more.js: «Сиракузия», знамя, высотка университета, плотина ГЭС,
   театр, свиток, восковая табличка, фрегат, галера, Архимед, юнга;
   бронзовые клейма и сигнальные флаги рисуются в самом уроке.

   СЮЖЕТ. «Судовая роль». «Сиракузия» спущена на воду (урок 906), Архимед
   записывает команду на папирусе — и длинные названия не помещаются в строку.
   Юнга показывает, как у него на фрегате слова сокращают: старпом, морфлот,
   ВМФ. У римлян на знамёнах тоже четыре буквы — SPQR.

   РУКАМИ: сократить «старший помощник»; назвать буквы ВМФ; шесть сигнальных
   флагов — по буквам или как слово; род по главному слову — фонари на
   плотине ГЭС; расшифровать четыре клейма.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     сложносокращённые слова образуются сложением сокращённых основ:
       начальных частей слов (старпом, завуч, завхоз, спецкор);
       начальной части и целого слова (морфлот, спортзал, турпоход, зарплата);
       начальных букв — читаются по названиям букв (ВМФ, МГУ, РФ, СНГ);
       начальных звуков — читаются как обычное слово (вуз, ТЮЗ, ГЭС, МИД);
     род определяется по главному слову: МГУ (университет) объявил,
       ГЭС (станция) дала, ООН (организация) приняла;
     буквенные и звуковые сокращения пишутся прописными без точек; сокращения
       из частей слов и слово «вуз» — строчными, слитно. */
(function(){
  'use strict';

  const ID = 1015;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';

  const ДЕЛА = [
    {ключ:'читать', имя:'Прочитать шесть флагов', итог:'6 из 6'},
    {ключ:'род',    имя:'Зажечь фонари ГЭС',      итог:'4 из 4'},
    {ключ:'шифр',   имя:'Расшифровать клейма',    итог:'4 из 4'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* кадр 3: буквы на знамени */
  const БУКВЫ3 = [
    {б:'В', имя:'вэ', сл:'военно-'},
    {б:'М', имя:'эм', сл:'морской'},
    {б:'Ф', имя:'эф', сл:'флот'}
  ];
  /* кадр 5: шесть флагов; как: 0 — по буквам, 1 — как слово */
  const ЧТЕНИЕ = [
    {с:'МГУ', как:0, чт:'эм-гэ-у',  что:'Московский государственный университет', цв:'#c8402a'},
    {с:'вуз', как:1, чт:'вуз',      что:'высшее учебное заведение',               цв:'#2a6ab8'},
    {с:'РФ',  как:0, чт:'эр-эф',    что:'Российская Федерация',                   цв:'#2e8a4a'},
    {с:'ГЭС', как:1, чт:'гэс',      что:'гидроэлектрическая станция',             цв:'#c8901a'},
    {с:'СНГ', как:0, чт:'эс-эн-гэ', что:'Содружество Независимых Государств',     цв:'#7a3a9a'},
    {с:'МИД', как:1, чт:'мид',      что:'Министерство иностранных дел',           цв:'#1a8a8a'}
  ];
  /* кадр 7: род по главному слову */
  const РОД = [
    {с:'ГЭС', гл:'станция',     хвост:'ток',            вар:['дал','дала'],         верно:1},
    {с:'ТЮЗ', гл:'театр',       хвост:'сезон',          вар:['открыл','открыла'],   верно:0},
    {с:'ООН', гл:'организация', хвост:'решение',        вар:['приняла','принял'],   верно:0},
    {с:'ВМФ', гл:'флот',        хвост:'новый корабль',  вар:['получило','получил'], верно:1}
  ];
  /* кадр 8: клейма */
  const ШИФР = [
    {с:'завхоз',    вар:['заведующий хозяйством','заводское хозяйство'],         верно:0, стр:['заведующий','хозяйством']},
    {с:'спецкор',   вар:['специалист по кораблям','специальный корреспондент'],  верно:1, стр:['специальный','корреспондент']},
    {с:'универмаг', вар:['универсальный магазин','университетский маг'],         верно:0, стр:['универсальный','магазин']},
    {с:'турпоход',  вар:['турецкий поход','туристический поход'],                верно:1, стр:['туристический','поход']}
  ];

  const CSS=`
  #lvis .s6.l1015{gap:14px}
  #lvis .s6.l1015 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l1015 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l1015 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l1015 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l1015 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l1015 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l1015 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l1015 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l1015 .карт .текст b{color:${GOLD}}
  #lvis .s6.l1015 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l1015 .правило b{color:${GOLD}}
  #lvis .s6.l1015 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l1015 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l1015 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l1015 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l1015 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l1015 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l1015 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l1015 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l1015 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l1015 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l1015 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l1015 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l1015 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l1015 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l1015 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l1015 .буйки button.мимо{border-color:${RED};animation:l1015нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l1015нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l1015 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l1015 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1015 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l1015 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l1015 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l1015 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l1015 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l1015 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1015 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l1015 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l1015 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l1015 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l1015 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l1015 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l1015 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l1015 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l1015 .уровни .точка.сейчас{background:${GOLD};animation:l1015dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l1015dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l1015 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l1015{-webkit-text-size-adjust:100%}
  #lvis .s6.l1015 [data-anim]{animation:l1015rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l1015rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l1015 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l1015 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l1015 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l1015 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l1015 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l1015 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l1015 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l1015 [data-anim]{animation:none!important}
    #lvis .s6.l1015 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l1015 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l1015-style');
      if(!s){ s=document.createElement('style'); s.id='l1015-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r1015Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Судовая роль</span><b class="${всё?'готово':''}">${
        всё?'команда в сборе':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c1015-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c1015-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c1015-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c1015-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c1015-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c1015-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  /* строка на папирусе: оставшиеся части слова — киноварью, отброшенные — выцветшие */
  const сокр = (cx,y,части,вкл,кегль,безЧерты) =>
    `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${кегль||18}" font-weight="bold" fill="${ЧЕРНИЛА}" font-family="Georgia,'Times New Roman',serif" xml:space="preserve">${
      части.map(([t0,есть])=>`<tspan fill="${!вкл?ЧЕРНИЛА:есть?'#a0200e':'#b8a27a'}"${вкл&&!есть&&!безЧерты?' text-decoration="line-through"':''}>${esc(t0)}</tspan>`).join('')}</text>`;
  /* бронзовое клеймо со словом; (cx,y) — центр */
  const клеймо = (cx,y,текст,опц) => { const о=опц||{}, к=о.кегль||15, ш=String(текст).length*к*0.64+24, в=к+14;
    return `<g filter="url(#c1015-тень)"><rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в/2).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="url(#рм-бронза)" stroke="${о.обвод||ОБВОД}" stroke-width="${о.обвод?2.2:1}"/>
      <rect x="${(cx-ш/2+3).toFixed(1)}" y="${(y-в/2+3).toFixed(1)}" width="${(ш-6).toFixed(1)}" height="${в-6}" rx="${(в/2-3).toFixed(1)}" fill="none" stroke="#fff4c0" stroke-width=".8" opacity=".6"/>
      <rect x="${(cx-ш/2+8).toFixed(1)}" y="${(y-в/2+3).toFixed(1)}" width="${(ш-16).toFixed(1)}" height="3" rx="1.5" fill="#fff" opacity=".3"/>
      ${т(cx,y+к*0.36,текст,к,'#fff4c0',true,'middle','#4a2a10')}</g>`; };
  const появись = (тело,задержка) => ДВИЖ ? `<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${задержка||0.2}s" dur="0.5s" fill="freeze"/>${тело}</g>` : тело;
  const стол = (y0,Н) => `${Р().доски(0,y0,336,Н-y0,true)}<rect x="0" y="${y0}" width="336" height="3" fill="#f0c890" opacity=".35"/>`;

  /* ================= КАДРЫ ================= */

  /* 1. Старпом: начальные части слов */
  function F1(s){
    const Н=312, М=Р(), сл=!!s.сокр1, в=s.ответ1, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('«Сиракузия» на воде, и Архимед записывает команду на папирусе. «Старший помощник капитана»… Строка кончилась! «У нас на фрегате говорят короче», — смеётся юнга. Сократи — и увидишь как.') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{солнце:[40,36,11],облака:[[120,28,0.5,8]]})}
        ${М.море(94,90,336,{})}
        ${М.сиракузия(222,152,0.58,{})}
        ${М.пристань(0,160,112,24,{})}
        ${М.архимед(34,160,0.52,{поза:'читает'})}${М.юнга(80,160,0.48,{поза:сл?'машет':'стоит'})}
        ${стол(184,Н)}
        ${М.свиток(34,200,268,98)}
        ${т(168,218,'Судовая роль «Сиракузии»',11,КАМЕНЬ,true)}
        <line x1="60" y1="224" x2="276" y2="224" stroke="#a88a5a" stroke-width=".8"/>
        ${сокр(168,248,[['стар',1],['ший ',0],['пом',1],['ощник',0]],сл,19)}
        ${сл ? появись(`<path d="M168 256 v8" stroke="#a0200e" stroke-width="2"/><path d="M163 262 l5 6 l5 -6" fill="#a0200e"/>${клеймо(168,282,'старпом',{обвод:ок?GREEN:null})}`,0.3)
             : `<rect x="112" y="266" width="112" height="26" rx="13" fill="none" stroke="#a88a5a" stroke-width="1.4" stroke-dasharray="5 4"/>${т(168,284,'?',16,'#a88a5a',true)}`}
        ${рамка(Н)}
      `,Н)}</div>` +
      (!сл ? `<div class="ask">${BTN(4,'','Сократить',"r1015Сократить()")}</div>` + СКАЗ('Начни','Нажми кнопку — лишние буквы выцветут.') :
        ОТВЕТЫ('',['из начальных частей двух слов','из двух целых слов'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Получилось слово <b>старпом</b>. Из чего оно сложено?') :
          РАЗБОР(ок,['Верно: от каждого слова взяли только начало — <b>стар</b>(ший) <b>пом</b>(ощник).',
            'Целые слова дали бы «старший-помощник». Здесь от каждого слова осталось только <b>начало</b>: стар- и пом-.'][в]))) +
      (ок ? ПРАВИЛО('<b>Сложносокращённые слова</b> складывают из сокращённых основ. Первый способ — <b>начальные части слов</b>: стар(ший) пом(ощник) → старпом, зав(едующий) уч(ебной частью) → завуч.') : '');
  }

  /* 2. Морфлот: часть + целое слово */
  function F2(s){
    const Н=300, М=Р(), в=s.ответ2, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В гавани собрались корабли — целый <b>морской флот</b>. Юнга и его записывает коротко: <b>морфлот</b>. Посмотри на папирус: что взяли от каждого слова?') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{солнце:[296,30,10],облака:[[70,30,0.55,8]]})}
        ${М.море(92,120,336,{})}
        ${М.галера(248,134,0.36,{})}${М.фрегат(84,150,0.38,{})}${М.сиракузия(200,186,0.4,{})}
        ${стол(208,Н)}
        ${М.свиток(34,222,268,68)}
        ${сокр(118,250,[['мор',1],['ской ',0],['флот',1]],true,18)}
        <path d="M194 244 h22" stroke="#a0200e" stroke-width="2"/><path d="M212 239 l7 5 l-7 5" fill="#a0200e"/>
        ${клеймо(258,244,'морфлот',{кегль:13,обвод:ок?GREEN:null})}
        ${ок?т(168,278,'часть слова + целое слово',11,'#1a6a3a',true):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['от первого — начало, второе — целиком','от обоих слов — только начало'],0,в,2) +
      (в==null ? СКАЗ('Вопрос','Сравни: морской флот → морфлот.') :
        РАЗБОР(ок,['Верно: <b>мор</b>(ской) сократили, а слово <b>флот</b> вошло целиком.',
          'Посмотри на папирус: зачёркнуто только «-ской». Слово <b>флот</b> осталось целым.'][в])) +
      (ок ? ПРАВИЛО('Второй способ — <b>начальная часть + целое слово</b>: мор(ской) флот → морфлот, спорт(ивный) зал → спортзал, тур(истический) поход → турпоход.') : '');
  }

  /* 3. ВМФ: начальные буквы */
  function F3(s){
    const Н=282, М=Р(), вид=s.вид3||{}, к=s.бук3, все=БУКВЫ3.every((_,i)=>вид[i]), в=s.ответ3, ок=в===0;
    const б=к==null?null:БУКВЫ3[к];
    const золото=(t0,x,y,кегль,свет)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${кегль}" font-weight="bold" fill="${свет?'#fff4c0':'#f0c850'}" stroke="#3a1a08" stroke-width="${свет?3.4:2.4}" paint-order="stroke" font-family="Georgia,serif">${t0}</text>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('У римских галер на знамёнах четыре буквы — <b>SPQR</b>: «Сенат и народ Рима». «А у нас три, — говорит юнга, — <b>ВМФ</b>». Нажми на каждую букву и узнай, что за ней стоит.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[168,40,0.5,6]]})}
        ${М.море(136,Н-136,336,{})}
        ${М.галера(76,214,0.52,{})}${М.фрегат(254,226,0.46,{})}
        <path d="M30 0 V34 M130 0 V34 M196 0 V34 M308 0 V34" stroke="#d8c08a" stroke-width="1.3"/>
        ${М.знамя(80,36,100,62,['#c8402a','#7a1a0e'],{древко:false,тело:золото('SPQR',80,78,24,false)})}
        ${М.знамя(252,36,112,62,['#3a6ac8','#14307a'],{древко:false,тело:БУКВЫ3.map((x,i)=>золото(x.б,218+i*34,80,28,к===i)+(к===i?`<circle cx="${218+i*34}" cy="70" r="17" fill="none" stroke="#fff4c0" stroke-width="1.8"/>`:'')).join('')})}
        ${б?подпись(252,134,б.б+' — «'+б.имя+'»: '+б.сл,GOLD,12):''}
        ${все?подпись(168,Н-14,ок?'ВМФ читаем: вэ-эм-эф':'военно-морской флот',ок?GREEN:GOLD,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask три">${БУКВЫ3.map((x,i)=>BTN(3+i,вид[i]?'hit':'','<span style="font-size:24px;font-family:Georgia,serif">'+x.б+'</span>','r1015Буква('+i+')')).join('')}</div>` +
      (б ? A(6,'карт','<span class="метка">Буква '+б.б+'</span><div class="текст">Называется «<b>'+б.имя+'</b>» — первая буква в «'+(к===2?'флот':'военно-морской')+'».</div>') : СКАЗ('Начни','Нажми на букву.')) +
      (!все ? '' :
        ОТВЕТЫ('пара',['вэ-эм-эф','одним словом: «вмф»'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Как же прочитать слово <b>ВМФ</b>?') :
          РАЗБОР(ок,['Верно: гласных нет, слитно не прочитать — называем каждую букву: <b>вэ-эм-эф</b>.',
            'Попробуй произнести «вмф» — не выходит: нет гласного. Такие слова читают <b>по названиям букв</b>.'][в]))) +
      (ок ? ПРАВИЛО('Третий способ — <b>начальные буквы</b> слов. Такие слова читают по названиям букв: ВМФ [вэ-эм-эф], МГУ [эм-гэ-у], РФ [эр-эф].') : '');
  }

  /* 4. ТЮЗ: начальные звуки */
  function F4(s){
    const Н=292, М=Р(), в=s.ответ4, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед ведёт юнгу в сиракузский театр. «А у нас есть театр для детей, — говорит юнга, — <b>ТЮЗ</b>, Театр юного зрителя». Те же начальные буквы… но читается это слово иначе, чем ВМФ.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{солнце:[296,30,10],облака:[[44,40,0.5,6]]})}
        <path d="M0 132 Q90 106 168 120 Q250 104 336 128 V${Н} H0 Z" fill="url(#рм-холм)"/>
        <path d="M0 214 Q168 200 336 214 V${Н} H0 Z" fill="url(#рм-песок)"/>
        ${М.театр(168,186,116,{})}
        <path d="M100 0 V20 M236 0 V20" stroke="#d8c08a" stroke-width="1.3"/>
        ${М.знамя(168,22,132,46,['#8a44aa','#4a1a6a'],{древко:false,тело:`<text x="168" y="58" text-anchor="middle" font-size="28" font-weight="bold" fill="#fff4c0" stroke="#2a0a3a" stroke-width="3" paint-order="stroke" letter-spacing="4" font-family="Georgia,serif">ТЮЗ</text>`})}
        <rect x="58" y="84" width="220" height="24" rx="12" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
        ${сокр(168,101,[['Т',1],['еатр ',0],['ю',1],['ного ',0],['з',1],['рителя',0]],true,14,true)}
        ${М.архимед(44,Н-8,0.58,{поза:'указывает'})}${М.юнга(296,Н-8,0.54,{поза:'машет'})}
        ${ок?подпись(168,Н-16,'читаем как слово: тюз',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['«тюз» — как обычное слово','«тэ-ю-зэ» — по названиям букв'],0,в,4) +
      (в==null ? СКАЗ('Вопрос','Как читается <b>ТЮЗ</b>?') :
        РАЗБОР(ок,['Верно: между согласными есть гласный <b>ю</b>, и буквы легко сливаются в слово: <b>тюз</b>.',
          'Так никто не говорит: в середине гласный <b>ю</b>, и сокращение читается <b>как обычное слово</b> — тюз.'][в])) +
      (ок ? ПРАВИЛО('Четвёртый способ — <b>начальные звуки</b> слов. Если звуки складываются в слог, сокращение читают как обычное слово: ТЮЗ, вуз (высшее учебное заведение), ГЭС.') : '');
  }

  /* 5. Шесть сигнальных флагов */
  function F5(s){
    const Н=304, М=Р(), n=Math.min(s.чт5||0,ЧТЕНИЕ.length), отв=s.отв5, все=n>=ЧТЕНИЕ.length;
    const где=[[62,40],[168,48],[274,40],[62,118],[168,126],[274,118]];
    const флажок=(i)=>{ const [x,y]=где[i], ч=ЧТЕНИЕ[i], сост=i<n?'есть':(i===n?'сейчас':'нет');
      return `<g opacity="${сост==='нет'?0.5:1}">
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="skewX" values="0;${1.4+i%2};0;${-1.4-i%2};0" dur="${4+i*0.4}s" repeatCount="indefinite"/>`:''}
          <path d="M${x-40} ${y} H${x+40} V${y+42} Q${x+20} ${y+47} ${x} ${y+42} Q${x-20} ${y+37} ${x-40} ${y+42} Z" fill="${ч.цв}" stroke="${сост==='сейчас'?GOLD:ОБВОД}" stroke-width="${сост==='сейчас'?2.6:1.1}">${сост==='сейчас'?анЛин('stroke-opacity','1;0.3;1','1.4s'):''}</path>
          <path d="M${x+14} ${y+1} V${y+43}" stroke="#000" stroke-width="22" opacity=".1"/>
          <rect x="${x-38}" y="${y+2}" width="76" height="4" fill="#fff" opacity=".25"/>
          <text x="${x}" y="${y+29}" text-anchor="middle" font-size="21" font-weight="bold" fill="#fff" stroke="#1a120a" stroke-width="3" paint-order="stroke" font-family="Georgia,serif">${ч.с}</text>
        </g>
        ${сост==='есть'?подпись(x,y+66,(ч.как?'слово: ':'')+ч.чт,ч.как?BLUE:GOLD,10.5):''}</g>`; };
    const ч=ЧТЕНИЕ[Math.min(n,ЧТЕНИЕ.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Над «Сиракузией» подняли шесть сигнальных флагов с сокращениями из мира юнги. Скажи про каждый: его читают <b>по буквам</b> или <b>как слово</b>?') +
      `<div class="pic">${свг(`
        ${М.небо(336,220,{облака:[[300,196,0.45,-5]]})}
        ${М.море(206,Н-206,336,{})}
        ${М.сиракузия(168,Н-18,0.5,{})}
        <path d="M0 34 Q168 52 336 34 M0 112 Q168 130 336 112" stroke="#d8c08a" stroke-width="1.6" fill="none"/>
        ${[0,1,2,3,4,5].map(флажок).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : A(3,'карт','<span class="метка">Флаг '+(n+1)+' из 6</span><div class="текст"><b style="font-size:24px">'+ч.с+'</b> — '+ч.что+'</div>') +
        `<div class="ask пара">${['по буквам','как слово'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r1015Читать('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Все шесть флагов прочитаны. По буквам: <b>МГУ, РФ, СНГ</b>. Как слова: <b>вуз, ГЭС, МИД</b>.')
        : отв ? (отв.ок
            ? РАЗБОР(true,'<b>'+ЧТЕНИЕ[отв.i].с+'</b> читаем «'+ЧТЕНИЕ[отв.i].чт+'»'+(ЧТЕНИЕ[отв.i].как?' — как обычное слово.':' — по названиям букв.'))
            : РАЗБОР(false,ч.как ? 'Попробуй произнести слитно: «'+ч.чт+'» — получается. Значит, читаем <b>как слово</b>.' : 'Слитно так не говорят. Называем буквы: <b>'+ч.чт+'</b>.'))
        : СКАЗ('Подсказка','Произнеси сокращение вслух: складывается ли оно в слог?')) +
      (все ? ПРАВИЛО('<b>По буквам</b> читают сокращения, которые не складываются в слово: МГУ [эм-гэ-у], РФ [эр-эф]. <b>Как слово</b> — те, что складываются: вуз, ГЭС, МИД.') : '');
  }

  /* 6. Род: МГУ */
  function F6(s){
    const Н=300, М=Р(), в=s.ответ6, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга мечтает: «Вырасту — поступлю в <b>МГУ</b>, Московский государственный университет. Это дом науки высотой с гору!» Архимед кивает: «Значит, твой МГУ ждёт учеников». Как правильно: МГУ … набор?') +
      `<div class="pic">${свг(`
        ${М.небо(336,250,{солнце:[44,40,11],облака:[[276,52,0.6,-6],[80,110,0.4,5]]})}
        <path d="M0 246 Q168 236 336 246 V${Н} H0 Z" fill="#7a9a4a"/>
        <path d="M110 ${Н} L150 250 H186 L226 ${Н} Z" fill="#d8ccb0" opacity=".9"/>
        ${М.высотка(168,252,0.98,{})}
        ${М.юнга(40,Н-8,0.56,{поза:'машет'})}${М.архимед(298,Н-8,0.58,{поза:'указывает',влево:true})}
        ${подпись(76,174,ок?'университет — он':'МГУ',ок?GREEN:GOLD,12.5)}
        ${ок?подпись(258,174,'МГУ объявил',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['объявил','объявила','объявило'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Расшифруй сокращение и найди в нём главное слово.') :
        РАЗБОР(ок,['Верно: главное слово — <b>университет</b> (он), значит, <b>МГУ объявил</b> набор.',
          'Главное слово — не «Москва», а <b>университет</b> (он): МГУ <b>объявил</b>.',
          'Буква у на конце ни при чём. Главное слово — <b>университет</b> (он): МГУ <b>объявил</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Род</b> сложносокращённого слова определяют по <b>главному слову</b>: МГУ — университет → МГУ объявил; ГЭС — станция → ГЭС дала ток.') : '');
  }

  /* 7. Фонари на плотине: род по главному слову */
  function F7(s){
    const Н=250, М=Р(), реш=s.реш7||{}, огни=РОД.filter((x,i)=>реш[i]===x.верно).length, все=РОД.every((_,i)=>реш[i]!=null), верно=огни===РОД.length;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Юнга рассказывает про <b>ГЭС</b> — станцию, где падающая вода рождает свет. Архимед в восторге: вода снова работает! Подбери глагол к каждому сокращению. За каждый верный ответ на плотине загорится фонарь.') +
      `<div class="pic">${свг(`
        ${М.небо(336,130,{ночь:верно,облака:[[70,28,0.5,8],[270,40,0.45,-5]]})}
        <path d="M0 ${Н} V70 Q30 60 52 84 L60 ${Н} Z M336 ${Н} V64 Q306 56 284 82 L276 ${Н} Z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M0 70 Q30 60 52 84 M336 64 Q306 56 284 82" stroke="#8fbf5a" stroke-width="5" fill="none" stroke-linecap="round"/>
        ${М.море(196,Н-196,336,{ночь:верно})}
        ${М.плотина(46,204,244,112,{огни:огни})}
        ${подпись(168,Н-10,верно?'ГЭС дала ток: горят все фонари':'горит фонарей: '+огни+' из 4',верно?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      РОД.map((x,i)=>`<div class="случай">${A(3+i,'что',(i+1)+'. <b style="color:'+GOLD+'">'+x.с+'</b> ('+x.гл+') … '+x.хвост)}<div class="ask пара">${x.вар.map((т0,j)=>
        BTN(4+i,реш[i]===j?(j===x.верно?'hit':'miss'):'',т0,'r1015Род('+i+','+j+')')).join('')}</div></div>`).join('') +
      (!все ? СКАЗ('Подсказка','Главное слово — в скобках. Замени сокращение на него: «станция … ток».') :
        РАЗБОР(верно, верно ? 'ГЭС (станция) <b>дала</b>, ТЮЗ (театр) <b>открыл</b>, ООН (организация) <b>приняла</b>, ВМФ (флот) <b>получил</b>.' :
          'Не все фонари горят. Подставь главное слово вместо сокращения: «организация приняла», «флот получил».')) +
      (верно ? ПРАВИЛО('Сокращение согласуется так же, как его <b>главное слово</b>: станция дала — ГЭС дала; театр открыл — ТЮЗ открыл.') : '');
  }

  /* 8. Расшифруй клейма */
  function F8(s){
    const Н=252, М=Р(), n=Math.min(s.шиф8||0,ШИФР.length), отв=s.отв8, все=n>=ШИФР.length;
    const где=[[98,72],[238,72],[98,170],[238,170]];
    const ш=ШИФР[Math.min(n,ШИФР.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На грузах для «Сиракузии» боцман выбил бронзовые клейма с сокращёнными словами. Архимед просит юнгу расшифровать каждое. Помоги ему выбрать верную расшифровку.') +
      `<div class="pic">${свг(`
        ${стол(0,Н)}<rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".1" data-декор="1"/>
        ${М.свиток(26,22,284,208)}
        <line x1="168" y1="34" x2="168" y2="218" stroke="#a88a5a" stroke-width=".8" stroke-dasharray="3 4"/>
        <line x1="40" y1="126" x2="296" y2="126" stroke="#a88a5a" stroke-width=".8" stroke-dasharray="3 4"/>
        ${ШИФР.map((x,i)=>{ const [cx,cy]=где[i], сост=i<n?'есть':(i===n?'сейчас':'нет');
          return `<g opacity="${сост==='нет'?0.45:1}">${клеймо(cx,cy-18,x.с,{кегль:14,обвод:сост==='есть'?'#2a8a4a':сост==='сейчас'?'#a0200e':null})}
            ${сост==='есть'?т(cx,cy+12,x.стр[0],11.5,ЧЕРНИЛА,true)+т(cx,cy+27,x.стр[1],11.5,ЧЕРНИЛА,true)
              :сост==='сейчас'?т(cx,cy+22,'?',24,'#a0200e',true):''}</g>`; }).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : A(3,'карт','<span class="метка">Клеймо '+(n+1)+' из 4</span><div class="текст">Что значит <b>'+ш.с+'</b>?</div>') +
        `<div class="ask">${ш.вар.map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r1015Шифр('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Все клейма расшифрованы: <b>зав</b>едующий <b>хоз</b>яйством, <b>спец</b>иальный <b>кор</b>респондент, <b>универ</b>сальный <b>маг</b>азин, <b>тур</b>истический <b>поход</b>.')
        : отв ? (отв.ок ? РАЗБОР(true,'<b>'+ШИФР[отв.i].с+'</b> — '+ШИФР[отв.i].вар[ШИФР[отв.i].верно]+'. Следующее клеймо — на папирусе.')
                        : РАЗБОР(false,'Такого не бывает. Ищи слова, которые <b>начинаются</b> с частей сокращения.'))
        : СКАЗ('Подсказка','Раздели сокращение на части и подбери слова, которые с них начинаются.')) +
      (все ? ПРАВИЛО('Чтобы понять сложносокращённое слово, <b>расшифруй</b> его: найди слова, от которых взяты части.') : '');
  }

  /* 9. Как пишутся */
  function F9(s){
    const Н=280, М=Р(), в=s.ответ9, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед высекает сокращения на мраморе — так, как пишут в мире юнги. А юнга царапает свои на воске. Посмотри на обе записи и реши: как сокращённо записать «Российская Федерация»?') +
      `<div class="pic">${свг(`
        ${М.небо(336,170,{облака:[[60,30,0.5,6],[270,44,0.45,-5]]})}
        ${плиты(168,Н)}
        <ellipse cx="96" cy="${Н-14}" rx="70" ry="5" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
        <rect x="26" y="${Н-26}" width="140" height="12" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M36 ${Н-26} L42 40 Q96 22 150 40 L156 ${Н-26} Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M46 46 Q96 30 146 46" stroke="#a89a7c" stroke-width="1" fill="none"/>
        ${['МГУ','ГЭС','ТЮЗ'].map((t0,i)=>`<text x="96" y="${94+i*50}" text-anchor="middle" font-size="30" font-weight="bold" fill="#6a5a40" stroke="#fffaf0" stroke-width=".8" letter-spacing="3" font-family="Georgia,serif">${t0}</text>`).join('')}
        ${М.восковая(186,70,130,150,{})}
        ${['старпом','завуч','вуз'].map((t0,i)=>`<text x="251" y="${110+i*38}" text-anchor="middle" font-size="19" font-style="italic" fill="#e8d8a8" font-family="Georgia,serif">${t0}</text>`).join('')}
        ${ок?подпись(96,Н-36,'прописные, без точек',GREEN,11):''}
        ${ок?подпись(251,Н-36,'строчные, слитно',BLUE,11):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['РФ','р.ф.','Рф'],0,в,9) +
      (в==null ? СКАЗ('Вопрос','Это сокращение из начальных букв — как МГУ на мраморе.') :
        РАЗБОР(ок,['Верно: сокращения из начальных букв пишут <b>прописными, без точек и пробелов</b>: РФ.',
          'Точки в таких сокращениях не ставят. Пишем прописными и слитно: <b>РФ</b>.',
          'Обе буквы — начальные, значит, обе <b>прописные</b>: РФ.'][в])) +
      (ок ? ПРАВИЛО('Сокращения из начальных букв и звуков пишут <b>прописными без точек</b>: РФ, МГУ, ГЭС, ТЮЗ. Сокращения из частей слов — <b>строчными, слитно</b>: старпом, завуч. Слово «вуз» давно стало обычным и тоже пишется строчными.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=334, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Судовая роль готова, вся команда уместилась на одном папирусе. «Сиракузия» уходит в первое плавание. «Короткое слово — как хороший рычаг, — говорит Архимед. — Малым усилием поднимает большой смысл».'
        : 'Судовая роль ещё не дописана — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{закат:true,солнце:[270,112,14],облака:[[80,36,0.6,6],[210,56,0.4,-5]]})}
        ${М.море(128,Н-128,336,{дорожка:270})}
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="-60 6" to="0 0" dur="3.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.7 0.3 1"/>`:''}${М.сиракузия(206,204,0.8,{})}</g>
        ${М.пристань(0,214,84,30,{})}
        ${М.архимед(30,214,0.56,{поза:'указывает'})}${М.юнга(66,214,0.5,{поза:'машет'})}
        ${[['части слов: стар(ший) пом(ощник) → старпом',GOLD],['часть + слово: мор(ской) флот → морфлот',BLUE],['буквы: ВМФ [вэ-эм-эф], МГУ [эм-гэ-у]',GREEN],['звуки: вуз, ТЮЗ, ГЭС — читаем как слово','#f0b890']].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.5+i*0.5).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,256+i*24,t0,ц,10.5)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Сложносокращённые слова</b> складывают из сокращённых основ: из <b>начальных частей</b> (старпом), из <b>части и целого слова</b> (морфлот), из <b>начальных букв</b> (ВМФ — читаем по буквам) и из <b>начальных звуков</b> (вуз — читаем как слово). <b>Род</b> определяют по главному слову: МГУ объявил, ГЭС дала. Буквенные сокращения пишут прописными без точек.') +
      ПРАВИЛО('<b>Короткое слово — как рычаг: малым усилием поднимает большой смысл.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Слово «завуч» сложено…', варианты:[{т:'из начальных частей слов',ок:true},{т:'из двух целых слов',ок:false}], разбор:'Зав(едующий) уч(ебной частью).' },
    { вопрос:'Как читается «РФ»?', варианты:[{т:'«рф» — одним словом',ок:false},{т:'эр-эф',ок:true}], разбор:'По названиям букв: эр-эф.' },
    { вопрос:'Как читается «вуз»?', варианты:[{т:'как обычное слово',ок:true},{т:'вэ-у-зэ',ок:false}], разбор:'Звуки складываются в слог: вуз.' },
    { вопрос:'ГЭС (станция) … в прошлом году.', варианты:[{т:'построен',ок:false},{т:'построена',ок:true}], разбор:'Станция построена — ГЭС построена.' },
    { вопрос:'Как записать сокращённо «Московский государственный университет»?', варианты:[{т:'МГУ',ок:true},{т:'м.г.у.',ок:false}], разбор:'Прописными, без точек: МГУ.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r1015Reset()")}</div>` +
        ПРАВИЛО('<b>Короткое слово — как рычаг: малым усилием поднимает большой смысл.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r1015Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Как читать', задания:[
    {q:'МЧС', в:0, варианты:['по буквам','как слово'], раз:'Эм-чэ-эс.'},
    {q:'МХАТ', в:1, варианты:['по буквам','как слово'], раз:'Читаем словом: мхат.'},
    {q:'ВДНХ', в:0, варианты:['по буквам','как слово'], раз:'Вэ-дэ-эн-ха.'},
    {q:'ООН', в:1, варианты:['по буквам','как слово'], раз:'Читаем словом: оон.'},
    {q:'ФСБ', в:0, варианты:['по буквам','как слово'], раз:'Эф-эс-бэ.'},
    {q:'ЕГЭ', в:1, варианты:['по буквам','как слово'], раз:'Читаем словом: егэ.'}
  ]};
  const Т2 = { имя:'Род по главному слову', задания:[
    {q:'МГУ (университет) … двери.', в:0, варианты:['открыл','открыла'], раз:'Университет открыл.'},
    {q:'ГЭС (станция) … у реки.', в:1, варианты:['построен','построена'], раз:'Станция построена.'},
    {q:'ООН (организация) … в 1945 году.', в:1, варианты:['основан','основана'], раз:'Организация основана.'},
    {q:'ТЮЗ (театр) … на гастроли.', в:0, варианты:['приехал','приехала'], раз:'Театр приехал.'},
    {q:'МЧС (министерство) … о шторме.', в:0, варианты:['сообщило','сообщил'], раз:'Министерство сообщило.'}
  ]};
  const Т3 = { имя:'Расшифруй', задания:[
    {q:'зарплата', в:0, варианты:['заработная плата','зарубежная плата'], раз:'Зар(аботная) плата.'},
    {q:'медсестра', в:1, варианты:['медленная сестра','медицинская сестра'], раз:'Мед(ицинская) сестра.'},
    {q:'вуз', в:0, варианты:['высшее учебное заведение','важный учебный зал'], раз:'Высшее учебное заведение.'},
    {q:'запчасти', в:1, варианты:['запретные части','запасные части'], раз:'Зап(асные) части.'},
    {q:'завуч', в:0, варианты:['заведующий учебной частью','заводской учитель'], раз:'Зав(едующий) уч(ебной частью).'}
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
        в, "r1015T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r1015TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L1015 = {
    id: ID,
    title: 'Сложносокращённые слова',
    ico: '📜',
    src: 'Русский язык · 6 класс · Словообразование', subj: 'rus',
    explain: [
      'Начальные части слов: старший помощник → старпом.',
      'Часть и целое слово: морской флот → морфлот.',
      'Начальные буквы: ВМФ читаем вэ-эм-эф.',
      'Начальные звуки: ТЮЗ читаем как слово.',
      'Шесть флагов: по буквам или как слово.',
      'Род по главному слову: МГУ объявил.',
      'Фонари ГЭС: согласуй глагол с сокращением.',
      'Расшифруй клейма: завхоз, спецкор, универмаг, турпоход.',
      'Как пишутся: РФ, МГУ — прописными; старпом, вуз — строчными.',
      'Итог: короткое слово — как рычаг.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: как читать.',
      'Тренажёр 2: род по главному слову.',
      'Тренажёр 3: расшифруй.'
    ],
    check: {
      q: 'Как определить род сокращения «МГУ»?',
      choices: ['по последней букве','по главному слову — университет','оно всегда среднего рода'],
      ans: 1,
      exp: 'Университет — он: МГУ объявил набор.'
    },
    tasks: [
      { q:'Сколько слов сокращено в «МГУ»?', kind:'unit', ans:3, tol:0,
        hints:['Московский государственный университет.'], sol:'3.' },
      { q:'ГЭС … ток.', kind:'choice', choices:['дал','дала','дало'], ans:1, tol:0,
        hints:['ГЭС — станция.'], sol:'Дала.' },
      { q:'Слово «старпом» сложено…', kind:'choice', choices:['из начальных частей слов','из начальных букв','приставкой и суффиксом'], ans:0, tol:0,
        hints:['Старший помощник.'], sol:'Из начальных частей слов.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.плотина){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L1015.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Судовая роль',2:'Морфлот',3:'Буквы на знамени',4:'Театр юного зрителя',5:'Сигнальные флаги',
      6:'Дом науки',7:'Фонари на плотине',8:'Бронзовые клейма',9:'Мрамор и воск',10:'Первое плавание',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l1015" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Сложносокращённые слова'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r1015Сократить=()=>{ const s=S(); s.сокр1=true; chRender(0); };
  window.r1015Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r1015Буква=(i)=>{ const s=S(); s.бук3=i; const в=Object.assign({},s.вид3||{}); в[i]=true; s.вид3=в; chRender(0); };
  window.r1015Читать=(j)=>{ const s=S(); const n=s.чт5||0; if(n>=ЧТЕНИЕ.length) return;
    if(ЧТЕНИЕ[n].как===j){ s.чт5=n+1; s.отв5={i:n,ок:true}; if(n+1>=ЧТЕНИЕ.length) s.дело_читать=true; }
    else s.отв5={i:n,ок:false,j:j};
    chRender(0); };
  window.r1015Род=(i,j)=>{ const s=S(); const р=Object.assign({},s.реш7||{}); р[i]=j; s.реш7=р;
    if(РОД.every((x,k)=>р[k]===x.верно)) s.дело_род=true; chRender(0); };
  window.r1015Шифр=(j)=>{ const s=S(); const n=s.шиф8||0; if(n>=ШИФР.length) return;
    if(ШИФР[n].верно===j){ s.шиф8=n+1; s.отв8={i:n,ок:true}; if(n+1>=ШИФР.length) s.дело_шифр=true; }
    else s.отв8={i:n,ок:false,j:j};
    chRender(0); };
  window.r1015Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r1015Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r1015T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r1015TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L1015; else arr.push(L1015); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU1015={render:render, L:L1015};
})();
