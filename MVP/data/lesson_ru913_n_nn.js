/* ============ РУССКИЙ ЯЗЫК · УРОК 913 · «Н И НН В ПРИЛАГАТЕЛЬНЫХ» ============
   6 класс, «Имя прилагательное». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–912). Рисунки — общая библиотека
   MVP/data/ris_more.js. НОВЫЕ ГЕРОИ: северный ветер Борей и плотник Ксанф
   (борей, плотник), окно, молоток; вывески с гвоздями рисуются в самом уроке.

   СЮЖЕТ. «Буря на улице мастеров». Ветер Борей сорвал с лавок все вывески.
   Плотник Ксанф вешает их заново, а каждая буква н в суффиксе — бронзовый
   гвоздь: одни вывески держатся на одном гвозде, другие на двух. Исключения —
   стеклянный, оловянный, деревянный — собраны в одном окне. А у слова
   «ветреный» ветер сам унёс вторую н.

   РУКАМИ: дунуть за Борея; прибить первую вывеску; восемь вывесок улицы
   мастеров; три части окна; игра «Буря возвращается» — восемь вывесок, три
   сорванных — и улицу разметало; краткие формы.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     одна н — в суффиксах -ан-, -ян-, -ин- (кожаный, серебряный, глиняный,
       лебединый); исключения: стеклянный, оловянный, деревянный;
     две н — в суффиксах -онн-, -енн- (соломенный, клюквенный, утренний);
       исключение: ветреный (но безветренный);
     две н — если основа на н и суффикс -н- (камень — каменный, лимон —
       лимонный, туман — туманный, длина — длинный);
     одна н — в словах без суффикса -н- (юный, зелёный, румяный, синий);
     в краткой форме столько же н, сколько в полной: длинная — длинна,
       зелёная — зелена. */
(function(){
  'use strict';

  const ID = 913;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';

  const ДЕЛА = [
    {ключ:'улица',   имя:'Повесить восемь вывесок',  итог:'8 из 8'},
    {ключ:'буря',    имя:'Выстоять в бурю',          итог:'8 вывесок'},
    {ключ:'краткие', имя:'Прибить краткие формы',    итог:'4 из 4'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* кадр 5: улица мастеров; н — сколько гвоздей */
  const УЛИЦА = [
    {до:'серебря', после:'ый', н:1, поч:'суффикс -ян-: одна н'},
    {до:'соломе',  после:'ый', н:2, поч:'суффикс -енн-: две н'},
    {до:'глиня',   после:'ый', н:1, поч:'суффикс -ян-: одна н'},
    {до:'лимо',    после:'ый', н:2, поч:'лимон + суффикс -н-: н корня и н суффикса'},
    {до:'лебеди',  после:'ый', н:1, поч:'суффикс -ин-: одна н'},
    {до:'клюкве',  после:'ый', н:2, поч:'суффикс -енн-: две н'},
    {до:'кожа',    после:'ый', н:1, поч:'суффикс -ан-: одна н'},
    {до:'карма',   после:'ый', н:2, поч:'карман + суффикс -н-: н корня и н суффикса'}
  ];
  /* кадр 8: буря возвращается */
  const БУРЯ = [
    {до:'деревя',    после:'ый', н:2, поч:'исключение из окна: деревянный'},
    {до:'кожа',      после:'ый', н:1, поч:'суффикс -ан-: одна н'},
    {до:'ветре',     после:'ый', н:1, поч:'исключение: у слова «ветреный» ветер унёс вторую н'},
    {до:'тума',      после:'ый', н:2, поч:'туман + суффикс -н-: две н'},
    {до:'ю',         после:'ый', н:1, поч:'суффикса -н- нет, н — в корне: одна'},
    {до:'стекля',    после:'ый', н:2, поч:'исключение из окна: стеклянный'},
    {до:'гуси',      после:'ый', н:1, поч:'суффикс -ин-: одна н'},
    {до:'безветре',  после:'ый', н:2, поч:'с приставкой — по правилу: суффикс -енн-, две н'}
  ];
  /* кадр 9: краткие формы */
  const КРАТКИЕ = [
    {до:'дли',  после:'ая', н:2, кто:'дорога', кр:'а'},
    {до:'зелё', после:'ая', н:1, кто:'трава',  кр:'а', докр:'зеле'},
    {до:'тума', после:'ая', н:2, кто:'ночь',   кр:'а'},
    {до:'румя', после:'ая', н:1, кто:'Мирто',  кр:'а'}
  ];
  const ОКНО = [
    {к:'стекло',   кн:'Стекло',   до:'стекля', после:'ое'},
    {к:'рама',     кн:'Рама',     до:'деревя', после:'ая'},
    {к:'задвижка', кн:'Задвижка', до:'оловя',  после:'ая'}
  ];

  const CSS=`
  #lvis .s6.l913{gap:14px}
  #lvis .s6.l913 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l913 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l913 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l913 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l913 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l913 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l913 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l913 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l913 .карт .текст b{color:${GOLD}}
  #lvis .s6.l913 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l913 .правило b{color:${GOLD}}
  #lvis .s6.l913 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l913 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l913 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l913 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l913 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l913 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l913 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l913 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l913 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l913 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l913 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l913 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l913 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l913 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l913 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l913 .буйки button.мимо{border-color:${RED};animation:l913нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l913нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l913 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l913 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l913 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l913 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l913 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l913 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l913 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l913 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l913 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l913 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l913 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l913 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l913 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l913 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l913 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l913 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l913 .уровни .точка.сейчас{background:${GOLD};animation:l913dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l913dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l913 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l913{-webkit-text-size-adjust:100%}
  #lvis .s6.l913 [data-anim]{animation:l913rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l913rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l913 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l913 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l913 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l913 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l913 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l913 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l913 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l913 [data-anim]{animation:none!important}
    #lvis .s6.l913 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l913 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l913-style');
      if(!s){ s=document.createElement('style'); s.id='l913-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r913Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Улица мастеров</span><b class="${всё?'готово':''}">${
        всё?'улица выстояла':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c913-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c913-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c913-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c913-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c913-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c913-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  /* гвоздь-буква: бронзовая шляпка с буквой н; вид 'к' — каменный (н корня) */
  const гвоздь = (cx,cy,вид,r) => { const R=r||8.5;
    return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R}" fill="url(#${вид==='к'?'рм-камень':'рм-бронза'})" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(R*0.78).toFixed(1)}" fill="none" stroke="#fff" stroke-width=".8" opacity=".35"/>
      <text x="${cx.toFixed(1)}" y="${(cy+R*0.52).toFixed(1)}" text-anchor="middle" font-size="${(R*1.7).toFixed(1)}" font-weight="bold" fill="#fffbe8" stroke="#2a1606" stroke-width="${(R*0.3).toFixed(1)}" paint-order="stroke" font-family="Georgia,serif">н</text>`; };
  /* вывеска: доска на цепях, слово с гвоздями вместо н. гв: 0 — пустое гнездо, 1, 2;
     опц.криво — висит косо; опц.цепи:false; опц.корень — первый гвоздь каменный */
  const вывеска = (cx,y,до,после,гв,опц) => { const о=опц||{}, к=о.кегль||17, R=к*0.5, w=(t0)=>String(t0).length*к*0.61, a=w(до), b=w(после),
      гн=гв===0?к*1.5:гв*(R*2+2), всё=a+гн+b, ш=всё+26, в=к+16, x0=cx-всё/2, yт=y+в/2+к*0.35;
    const гвозди = гв===0 ? `<rect x="${(x0+a+2).toFixed(1)}" y="${y+3}" width="${(гн-4).toFixed(1)}" height="${в-6}" rx="5" fill="rgba(14,26,20,.62)" stroke="${GOLD}" stroke-width="1.5" stroke-dasharray="4 3"/>${т(x0+a+гн/2,yт,'?',к,GOLD,true)}`
      : Array.from({length:гв},(_,i)=>гвоздь(x0+a+1+R+i*(R*2+2),y+в/2,о.корень&&i===0?'к':'б',R)).join('');
    const тело=`${о.цепи===false?'':`<path d="M${(cx-ш/2+10).toFixed(1)} ${y-12} V${y+2} M${(cx+ш/2-10).toFixed(1)} ${y-12} V${y+2}" stroke="#8a7a5a" stroke-width="2" stroke-dasharray="3 2"/>`}
      <g filter="url(#c913-тень)"><rect x="${(cx-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="5" fill="url(#рм-доска)" stroke="${о.обвод||ОБВОД}" stroke-width="${о.обвод?2.4:1.2}"/></g>
      <rect x="${(cx-ш/2+3).toFixed(1)}" y="${y+2.5}" width="${(ш-6).toFixed(1)}" height="3.4" rx="1.7" fill="#fff" opacity=".22"/>
      <text x="${(x0+a/2).toFixed(1)}" y="${yт.toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="#fff4d8" stroke="#3a2008" stroke-width="2.6" paint-order="stroke" font-family="Georgia,serif">${esc(до)}</text>
      <text x="${(x0+a+гн+b/2).toFixed(1)}" y="${yт.toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="#fff4d8" stroke="#3a2008" stroke-width="2.6" paint-order="stroke" font-family="Georgia,serif">${esc(после)}</text>
      ${гвозди}`;
    return о.криво ? `<g transform="rotate(${о.криво} ${cx} ${y})">${тело}</g>`
      : о.качается&&ДВИЖ ? `<g><animateTransform attributeName="transform" type="rotate" values="-3 ${cx} ${y-12};3 ${cx} ${y-12};-3 ${cx} ${y-12}" dur="1.4s" repeatCount="indefinite"/>${тело}</g>` : `<g>${тело}</g>`; };
  /* улица мастеров: небо, три белёных дома, мощёная площадь */
  const улица = (Н,y0,опц) => { const М=Р(), о=опц||{};
    return `${М.небо(336,y0,о.небо||{облака:[[250,30,0.5,-5]]})}${плиты(y0,Н)}
      ${М.домик(58,y0+8,0.92,{})}${М.домик(168,y0+10,1.0,{})}${М.домик(280,y0+8,0.92,{})}`; };
  const стена = (Н) => `<rect width="336" height="${Н}" fill="#ebe0c8"/><rect width="336" height="${Н}" fill="url(#рм-луч)" opacity=".16" data-декор="1"/>
    <g data-декор="1" opacity=".35">${Array.from({length:9},(_,k)=>`<path d="M${(k*47+10)%336} ${30+(k*61)%(Н-60)} q8 -3 14 1" stroke="#b8a888" stroke-width="1.2" fill="none"/>`).join('')}</g>
    <rect x="0" y="${Н-18}" width="336" height="18" fill="#d8c8a4"/>`;
  const КНОПКИ = (f,в,верный,класс) => `<div class="ask пара">${['Один гвоздь: н','Два гвоздя: нн'].map((t0,j)=>BTN(4+j,в===j?(j===верный?'hit':'miss'):'',t0,'r913Отв('+f+','+j+')')).join('')}</div>`;

  /* ================= КАДРЫ ================= */

  /* 1. Буря */
  function F1(s){
    const Н=304, М=Р(), бур=!!s.буря1, в=s.ответ1, ок=в===0;
    const доска=(x,y,t0,угол)=>`<g transform="rotate(${угол} ${x} ${y})"><g filter="url(#c913-тень)"><rect x="${x-32}" y="${y-10}" width="64" height="20" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/></g>${т(x,y+4,t0,10.5,'#fff4d8',true,'middle','#3a2008')}</g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('На улице мастеров три новые лавки: кожевника, гончара и шляпника. Но с гор спускается северный ветер <b>Борей</b> — он терпеть не может вывесок. Посмотри, что он натворит.') +
      `<div class="pic">${свг(`
        ${улица(Н,208,{небо:бур?{облака:[[220,26,0.7,-10],[300,60,0.5,-8]]}:undefined})}
        ${бур?`<rect width="336" height="208" fill="#5a6a84" opacity=".28"/>`:''}
        ${!бур ? доска(58,150,'КОЖА',0)+доска(168,146,'ГЛИНА',0)+доска(280,150,'СОЛОМА',0)
               : `<g>${ДВИЖ&&в==null?`<animateTransform attributeName="transform" type="translate" from="-20 -110" to="0 0" dur="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.5 0 0.9 0.6"/>`:''}${доска(96,Н-34,'КОЖА',-18)+доска(196,Н-22,'ГЛИНА',12)+доска(276,Н-44,'СОЛОМА',-32)}</g>`}
        ${М.борей(62,56,0.95,{дует:бур})}
        ${М.плотник(38,Н-8,0.5,{})}${М.архимед(310,Н-70,0.46,{поза:'указывает',влево:true})}
        ${бур?подпись(200,32,'вывески сорваны!',RED,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      (!бур ? `<div class="ask">${BTN(4,'','Дунуть, как Борей',"r913Буря()")}</div>` + СКАЗ('Начни','Нажми — и ветер налетит на улицу.') :
        `<div class="ask">${['нет: бывает одна н, а бывает две','да: н всегда одна'].map((t0,j)=>BTN(4+j,в===j?(j===0?'hit':'miss'):'',t0,'r913Отв(1,'+j+')')).join('')}</div>` +
        (в==null ? СКАЗ('Вопрос','Плотник Ксанф берёт молоток. Новые вывески будут такие: «кожаный», «глиняный», «соломенный». Как думаешь, букв н в них поровну?') :
          РАЗБОР(ок,['Верно: кожа<b>н</b>ый и глиня<b>н</b>ый — с одной н, а соломе<b>нн</b>ый — с двумя. Ксанф вбивает вместо каждой н гвоздь: сколько н, столько гвоздей.',
            'Сравни: кожа<b>н</b>ый — одна н, соломе<b>нн</b>ый — две. Сколько букв н, столько гвоздей держит вывеску.'][в]))) +
      (ок ? ПРАВИЛО('В суффиксах прилагательных пишется то <b>одна н</b>, то <b>две</b>. Это зависит от <b>суффикса</b> — его и надо узнать.') : '');
  }

  /* 2. Одна н: -ан-, -ян-, -ин- */
  function F2(s){
    const Н=300, М=Р(), в=s.ответ2, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Первая вывеска — для кожевника: «<b>кожа…ые</b> ремни». Кожа → кож-<b>ан</b>-ый: суффикс -ан-. Сколько гвоздей вбить Ксанфу?') +
      `<div class="pic">${свг(`
        ${стена(Н)}
        <rect x="246" y="96" width="60" height="${Н-114}" rx="3" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.2"/>
        ${[258,272,286].map((x,k)=>`<path d="M${x} 100 q${k%2?3:-3} 40 0 ${70+k*16}" stroke="#7a4a20" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="${x-3.5}" y="${166+k*16}" width="7" height="8" rx="1.5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}
        ${вывеска(150,40,'кожа','ые',в==null?0:ок?1:0,{кегль:20,криво:в===1?7:0,обвод:ок?'#2a8a4a':null})}
        ${ок?подпись(150,104,'суффикс -ан-: одна н',GREEN,12.5):в===1?подпись(150,104,'висит криво: гвоздь лишний',RED,12):''}
        ${ок?[['серебря','ый'],['глиня','ый'],['лебеди','ый']].map(([а,б],i)=>вывеска(110,134+i*34,а,б,1,{кегль:13,цепи:false})).join(''):''}
        ${М.плотник(210,Н-14,0.72,{поза:ок?'бьёт':'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      КНОПКИ(2,в,0) +
      (в==null ? СКАЗ('Подсказка','Найди суффикс: кож-ан-ый.') :
        РАЗБОР(ок,['Верно: в суффиксах <b>-ан-, -ян-, -ин-</b> одна н. Кожа<b>н</b>ый, серебря<b>н</b>ый, глиня<b>н</b>ый, лебеди<b>н</b>ый.',
          'Вывеска перекосилась — второй гвоздь лишний. В суффиксе <b>-ан-</b> всего одна н: кожа<b>н</b>ый.'][в])) +
      (ок ? ПРАВИЛО('<b>Одна н</b> — в суффиксах <b>-ан-, -ян-, -ин-</b>: кожаный, серебряный, глиняный, лебединый.') : '');
  }

  /* 3. Две н: -енн-, -онн- */
  function F3(s){
    const Н=300, М=Р(), в=s.ответ3, ок=в===1;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Дед Деметрий торгует шляпами — такими же, как у него самого. Вывеска: «<b>соломе…ые</b> шляпы». Солома → солом-<b>енн</b>-ый: суффикс длинный. Сколько гвоздей?') +
      `<div class="pic">${свг(`
        ${стена(Н)}
        ${[[268,120],[268,160],[268,200]].map(([x,y])=>`<ellipse cx="${x}" cy="${y+8}" rx="26" ry="5.4" fill="#e8c878" stroke="${ОБВОД}" stroke-width="1"/><path d="M${x-12} ${y+7} Q${x-10} ${y-8} ${x} ${y-9} Q${x+10} ${y-8} ${x+12} ${y+7} Z" fill="#f0d48a" stroke="${ОБВОД}" stroke-width="1"/><path d="M${x-12} ${y+6} Q${x} ${y+10} ${x+12} ${y+6}" stroke="#a0200e" stroke-width="2.4" fill="none"/>`).join('')}
        ${вывеска(150,40,'соломе','ые',в==null?0:ок?2:0,{кегль:19,криво:в===0?-9:0,обвод:ок?'#2a8a4a':null})}
        ${ок?подпись(150,104,'суффикс -енн-: две н',GREEN,12.5):в===0?подпись(150,104,'на одном гвозде болтается',RED,12):''}
        ${ок?[['утре','ий'],['клюкве','ый'],['торжестве','ый']].map(([а,б],i)=>вывеска(116,134+i*34,а,б,2,{кегль:12.5,цепи:false})).join(''):''}
        ${М.сеятель(40,Н-14,0.6,{сеет:false})}${М.плотник(214,Н-14,0.7,{поза:ок?'бьёт':'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      КНОПКИ(3,в,1) +
      (в==null ? СКАЗ('Подсказка','Найди суффикс: солом-енн-ый.') :
        РАЗБОР(ок,['Вывеска болтается — одного гвоздя мало. В суффиксе <b>-енн-</b> две н: соломе<b>нн</b>ый.',
          'Верно: в суффиксах <b>-енн-</b> и <b>-онн-</b> две н. Соломе<b>нн</b>ый, утре<b>нн</b>ий, клюкве<b>нн</b>ый, торжестве<b>нн</b>ый.'][в])) +
      (ок ? ПРАВИЛО('<b>Две н</b> — в суффиксах <b>-енн-, -онн-</b>: соломенный, утренний, клюквенный, торжественный.') : '');
  }

  /* 4. Н корня + н суффикса */
  function F4(s){
    const Н=300, М=Р(), в=s.ответ4, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Каменщик просит вывеску «<b>каменная</b> кладка». Здесь гвозди разные: серый — это <b>н</b> самого корня (каме<b>н</b>ь), бронзовый — суффикс <b>-н-</b>. Встретились — и получилось две. А вот в слове «юный» суффикса нет вовсе.') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{облака:[[60,30,0.5,8],[280,40,0.45,-5]]})}
        ${М.крепость(0,Н-16,336,130,{})}
        <rect x="0" y="${Н-16}" width="336" height="16" fill="#d8c8a4"/>
        ${вывеска(168,18,'каме','ая',2,{кегль:20,корень:true})}
        ${т(162,76,'корень',10.5,ИНК,true,'end','#14221a')}${т(178,76,'суффикс',10.5,GOLD,true,'start','#14221a')}
        ${вывеска(84,100,'лимо','ый',2,{кегль:13,цепи:false,корень:true})}${вывеска(252,100,'тума','ый',в==null?0:2,{кегль:13,цепи:false,корень:true,обвод:ок?'#2a8a4a':null})}
        ${вывеска(168,140,'ю','ый',1,{кегль:13,цепи:false,корень:true})}
        ${подпись(168,186,'юный: суффикса нет — н одна',BLUE,11)}
        ${М.плотник(296,Н-16,0.56,{влево:true})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask">${['туман + суффикс -н-: две н','суффикс -ан-: одна н'].map((t0,j)=>BTN(4+j,в===j?(j===0?'hit':'miss'):'',t0,'r913Отв(4,'+j+')')).join('')}</div>` +
      (в==null ? СКАЗ('Вопрос','Сколько н в слове «тума…ый» и почему?') :
        РАЗБОР(ок,['Верно: тума<b>н</b> + <b>н</b> + ый. Одна н из корня, вторая — суффикс: тума<b>нн</b>ый.',
          'В слове «туман» буквы «ан» — часть корня, а не суффикс. Корень кончается на н, и к нему добавлен суффикс -н-: тума<b>нн</b>ый.'][в])) +
      (ок ? ПРАВИЛО('Если основа кончается на <b>н</b> и добавлен суффикс <b>-н-</b>, получается <b>две н</b>: каменный, лимонный, туманный, длинный. Без суффикса -н- — одна: юный, зелёный, румяный.') : '');
  }

  /* 5. Улица мастеров */
  function F5(s){
    const Н=320, М=Р(), n=Math.min(s.ул5||0,УЛИЦА.length), отв=s.отв5, все=n>=УЛИЦА.length;
    const у=УЛИЦА[Math.min(n,УЛИЦА.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Мастера несут Ксанфу доски со всей улицы. На каждой — слово с пропуском. Скажи, сколько гвоздей вбить, — и вывеска займёт своё место.') +
      `<div class="pic">${свг(`
        ${улица(Н,236)}
        ${УЛИЦА.map((x,i)=>i<n?вывеска(60+(i%3)*108,76+Math.floor(i/3)*27,x.до,x.после,x.н,{кегль:10.5,цепи:false}):'').join('')}
        ${все ? подпись(168,32,'все восемь вывесок на месте',GREEN,12.5) : вывеска(168,22,у.до,у.после,0,{кегль:19,криво:отв&&!отв.ок?(отв.j?6:-8):0})}
        ${М.плотник(114,Н-8,0.5,{поза:отв&&отв.ок&&!все?'бьёт':'стоит'})}${М.девочка(224,Н-8,0.44,{поза:все?'машет':'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask пара">${['Один гвоздь: н','Два гвоздя: нн'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r913Улица('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Улица снова нарядная. Один гвоздь: серебря<b>н</b>ый, глиня<b>н</b>ый, лебеди<b>н</b>ый, кожа<b>н</b>ый. Два: соломе<b>нн</b>ый, лимо<b>нн</b>ый, клюкве<b>нн</b>ый, карма<b>нн</b>ый.')
        : отв ? (отв.ок ? РАЗБОР(true,'Прибито: <b>'+УЛИЦА[отв.i].до+'н'.repeat(УЛИЦА[отв.i].н)+УЛИЦА[отв.i].после+'</b> — '+УЛИЦА[отв.i].поч+'.')
                        : РАЗБОР(false,'Вывеска висит криво. Разбери слово: '+у.поч+'.'))
        : СКАЗ('Подсказка','-ан-, -ян-, -ин- — один гвоздь. -енн-, -онн- и «н + н» — два.')) +
      (все ? ПРАВИЛО('<b>-ан-, -ян-, -ин-</b> — одна н. <b>-енн-, -онн-</b> и <b>н + н</b> — две.') : '');
  }

  /* 6. Окно: три исключения */
  function F6(s){
    const Н=300, М=Р(), вид=s.вид6||{}, к=s.ок6, все=ОКНО.every(x=>вид[x.к]), в=s.ответ6, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Архимед придумал для своей мастерской диковину — <b>окно</b>. В нём три вещи, и все три названы словами-исключениями: суффикс -ян-, а н — две. Потрогай каждую часть.') +
      `<div class="pic">${свг(`
        ${стена(Н)}
        ${М.окно(104,142,150,150,{свет:к})}
        ${ОКНО.map((x,i)=>вид[x.к]?вывеска(256,56+i*62,x.до,x.после,2,{кегль:12.5,цепи:false,обвод:к===x.к?GOLD:null})
          :`<rect x="206" y="${56+i*62}" width="100" height="28" rx="5" fill="rgba(14,26,20,.3)" stroke="#b8a888" stroke-width="1.2" stroke-dasharray="5 4"/>${т(256,75+i*62,'?',14,'#8a7a5a',true)}`).join('')}
        ${ОКНО.map((x,i)=>т(256,50+i*62,x.кн.toLowerCase(),10,КАМЕНЬ,true)).join('')}
        ${все?подпись(168,Н-30,'три исключения — одно окно',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask три">${ОКНО.map((x,i)=>BTN(3+i,вид[x.к]?'hit':'',x.кн,"r913Окно('"+x.к+"')")).join('')}</div>` +
      (!все ? СКАЗ('Смотри','Нажми на стекло, раму и задвижку.') :
        `<div class="ask">${['исключения: их три, и все — в окне','обычное правило суффикса -ян-'].map((t0,j)=>BTN(4+j,в===j?(j===0?'hit':'miss'):'',t0,'r913Отв(6,'+j+')')).join('')}</div>` +
        (в==null ? СКАЗ('Вопрос','Стекля<b>нн</b>ое, деревя<b>нн</b>ая, оловя<b>нн</b>ая: суффикс -ян-, а н две. Что это за слова?') :
          РАЗБОР(ок,['Верно: это три <b>исключения</b>. Запомнить их легко по окну: <b>стеклянное</b> стекло, <b>деревянная</b> рама, <b>оловянная</b> задвижка.',
            'По правилу в суффиксе -ян- одна н (глиняный, серебряный). А эти три слова — <b>исключения</b>: стеклянный, оловянный, деревянный.'][в]))) +
      (ок ? ПРАВИЛО('<b>Исключения</b> с двумя н: <b>стеклянный, оловянный, деревянный</b>. Вспоминай окно: стекло, задвижка, рама.') : '');
  }

  /* 7. Ветреный */
  function F7(s){
    const Н=300, М=Р(), в=s.ответ7, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Борей снова тут как тут — дует прямо в новое окно. «А про <b>меня</b> вывеска есть?» — гудит он. Ксанф пишет: «ветре…ый день». По правилу в суффиксе -енн- две н. Но Борей хитро щурится…') +
      `<div class="pic">${свг(`
        ${стена(Н)}
        <rect x="0" y="0" width="150" height="${Н-18}" fill="#8ab8e0"/><rect x="146" y="0" width="8" height="${Н-18}" fill="#c8b898" stroke="${ОБВОД}" stroke-width=".8"/>
        ${М.борей(70,84,1.0,{дует:true})}
        ${М.окно(250,190,110,120,{})}
        ${вывеска(224,22,'ветре','ый',в==null?0:ок?1:0,{кегль:18,качается:true,обвод:ок?'#2a8a4a':null})}
        ${ок?`<g><animateTransform attributeName="transform" type="translate" from="0 0" to="-260 40" dur="1.6s" fill="freeze"/><animate attributeName="opacity" from="1" to="0" dur="1.6s" fill="freeze"/>${гвоздь(250,48,'б',9)}</g>`:''}
        ${ок?вывеска(98,190,'безветре','ый',2,{кегль:12,цепи:false})+подпись(98,Н-40,'с приставкой — две н',BLUE,11):''}
        ${ок?подпись(236,86,'одну н унёс ветер',GREEN,11.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      КНОПКИ(7,в,0) +
      (в==null ? СКАЗ('Вопрос','Сколько н в слове «ветре…ый»?') :
        РАЗБОР(ок,['Верно: <b>ветреный</b> — исключение, одна н. Вторую унёс сам ветер. Но стоит появиться приставке — и правило возвращается: <b>безветренный</b>.',
          'По правилу так и было бы, но <b>ветреный</b> — исключение: одна н. Две пишутся только с приставкой: безветренный.'][в])) +
      (ок ? ПРАВИЛО('<b>Ветреный</b> — исключение: одна н. С приставкой — две: <b>безветренный</b>.') : '');
  }

  /* 8. Буря возвращается */
  function F8(s){
    const Н=324, М=Р(), б8=s.бур8||{}, n=Math.min(б8.n||0,БУРЯ.length), ош=Math.min(б8.ош||0,3), отв=s.отв8, все=n>=БУРЯ.length, разм=ош>=3&&!все;
    const б=БУРЯ[Math.min(n,БУРЯ.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА(разм ? 'Три вывески унесло — и за ними полетели остальные. Улицу разметало. Ксанф собирает доски по площади: «Ничего. Повесим заново — и теперь уж накрепко».'
        : 'Борей набрал воздуху и дует изо всех сил. Восемь вывесок — восемь слов, среди них все исключения. Верное число гвоздей — вывеска устоит. Ошибка — её унесёт. Три унесённых — и улицу разметает.') +
      `<div class="pic">${свг(`
        ${улица(Н,244,{небо:{облака:[[230,24,0.7,-12],[300,64,0.5,-9]]}})}
        <rect width="336" height="244" fill="#5a6a84" opacity="${все?0:0.26}"/>
        ${все?М.борей(60,50,0.8,{спит:true}):М.борей(58,52,0.95,{дует:!разм})}
        ${БУРЯ.map((x,i)=>i<n?вывеска(60+(i%3)*108,100+Math.floor(i/3)*27,x.до,x.после,x.н,{кегль:10.5,цепи:false}):'').join('')}
        ${разм?[[80,Н-30,-20],[180,Н-20,14],[262,Н-40,-34]].map(([x,y,a])=>`<g transform="rotate(${a} ${x} ${y})"><rect x="${x-30}" y="${y-9}" width="60" height="18" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/></g>`).join(''):''}
        ${все ? подпись(200,32,'улица выстояла!',GREEN,13) : разм ? подпись(200,32,'улицу разметало',RED,13) : вывеска(200,26,б.до,б.после,0,{кегль:17,качается:true})}
        ${все||разм?'':[0,1,2].map(i=>`<g opacity="${i<3-ош?1:0.25}">${гвоздь(276+i*20,84,'б',7)}</g>`).join('')}
        ${М.плотник(300,Н-8,0.52,{поза:отв&&отв.ок&&!все?'бьёт':'стоит',влево:true})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Борей выдохся и уснул. Устояли все восемь: деревя<b>нн</b>ый, кожа<b>н</b>ый, ветре<b>н</b>ый, тума<b>нн</b>ый, ю<b>н</b>ый, стекля<b>нн</b>ый, гуси<b>н</b>ый, безветре<b>нн</b>ый.')
        : разм ? РАЗБОР(false,'Подсказка: '+б.поч+'.') + `<div class="ask">${BTN(4,'','Повесить заново',"r913Заново()")}</div>`
        : `<div class="ask пара">${['Один гвоздь: н','Два гвоздя: нн'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r913Гвоздь('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'Держится! <b>'+БУРЯ[отв.i].до+'н'.repeat(БУРЯ[отв.i].н)+БУРЯ[отв.i].после+'</b> — '+БУРЯ[отв.i].поч+'.')
                         : РАЗБОР(false,'Вывеску унесло! Запомни: '+б.поч+'.'))
               : СКАЗ('Подсказка','Сначала проверь, не исключение ли это: окно (стеклянный, оловянный, деревянный) и ветреный.'))) +
      (все ? ПРАВИЛО('Сначала вспомни <b>исключения</b>, потом найди <b>суффикс</b> — и считай гвозди.') : '');
  }

  /* 9. Краткие формы */
  function F9(s){
    const Н=290, М=Р(), n=Math.min(s.кр9||0,КРАТКИЕ.length), отв=s.отв9, все=n>=КРАТКИЕ.length;
    const к=КРАТКИЕ[Math.min(n,КРАТКИЕ.length-1)], дк=к.докр||к.до;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ксанф вешает вывески парами: сверху полная форма, снизу — краткая. «Секрет простой, — говорит он. — Сколько гвоздей в полной, столько и в краткой». Прибей четыре кратких.') +
      `<div class="pic">${свг(`
        ${стена(Н)}
        ${т(126,28,'полная форма',10.5,КАМЕНЬ,true)}
        ${вывеска(126,40,к.до,к.после,к.н,{кегль:18,корень:к.н===2})}
        <path d="M126 82 v20" stroke="#8a7a5a" stroke-width="2" stroke-dasharray="3 2"/>
        ${т(126,116,'краткая форма: '+к.кто+' …',10.5,КАМЕНЬ,true)}
        ${вывеска(126,126,дк,к.кр,все?к.н:0,{кегль:18,цепи:false,корень:к.н===2,обвод:все?'#2a8a4a':null,криво:отв&&!отв.ок?5:0})}
        ${КРАТКИЕ.map((x,i)=>i<n?вывеска(70+(i%2)*112,188+(i<2?0:30),(x.докр||x.до),x.кр,x.н,{кегль:11,цепи:false}):'').join('')}
        ${М.плотник(290,Н-14,0.66,{поза:отв&&отв.ок?'бьёт':'стоит',влево:true})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask пара">${['Один гвоздь: н','Два гвоздя: нн'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r913Краткая('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Все пары на месте: дли<b>нн</b>ая — дли<b>нн</b>а, зелё<b>н</b>ая — зеле<b>н</b>а, тума<b>нн</b>ая — тума<b>нн</b>а, румя<b>н</b>ая — румя<b>н</b>а.')
        : отв ? (отв.ок ? РАЗБОР(true,'Верно: сколько в полной форме, столько и в краткой. Следующая пара — на стене.')
                        : РАЗБОР(false,'Посмотри на верхнюю вывеску и сосчитай гвозди: их '+(к.н===2?'два':'один')+'. В краткой форме — столько же.'))
        : СКАЗ('Подсказка','Сосчитай гвозди в полной форме.')) +
      (все ? ПРАВИЛО('В <b>краткой форме</b> пишется столько же н, сколько в <b>полной</b>: длинная — длинна, зелёная — зелена.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Вечер. Улица мастеров сияет новыми вывесками, и ни одна не качается. Борей полетал вокруг, попробовал дунуть — и уснул на крыше. «Каждая н на своём гвозде», — говорит Ксанф и прячет молоток за пояс.'
        : 'Улица ещё без вывесок — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${улица(Н,196,{небо:{закат:true,солнце:[270,150,13],облака:[[200,40,0.5,-5]]}})}
        <rect x="0" y="0" width="336" height="${Н}" fill="#ff9a50" opacity=".1"/>
        ${вывеска(54,122,'кожа','ый',1,{кегль:10,цепи:false})}${вывеска(166,100,'соломе','ый',2,{кегль:10,цепи:false})}${вывеска(279,122,'стекля','ый',2,{кегль:10,цепи:false})}
        ${М.борей(84,42,0.7,{спит:true})}
        ${М.плотник(40,250,0.56,{})}${М.архимед(110,252,0.54,{поза:'указывает'})}${М.девочка(230,252,0.48,{поза:'машет'})}${М.сеятель(296,252,0.5,{сеет:false,влево:true})}
        ${[['-ан-, -ян-, -ин- — одна н: кожаный',GOLD],['-енн-, -онн-, н + н — две: соломенный',BLUE],['окно: стеклянный, оловянный, деревянный',GREEN],['ветреный — одна; краткая форма — как полная','#f0b890']].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.45).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,268+i*21,t0,ц,10)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Одна н</b> — в суффиксах -ан-, -ян-, -ин- (кожаный, глиняный, лебединый) и в словах без суффикса -н- (юный). <b>Две н</b> — в суффиксах -енн-, -онн- (соломенный) и там, где н корня встречается с суффиксом -н- (лимонный). <b>Исключения</b>: стеклянный, оловянный, деревянный — с двумя н; ветреный — с одной. В краткой форме н столько же, сколько в полной.') +
      ПРАВИЛО('<b>Каждая н — свой гвоздь. Окно — на двух, ветер — на одном.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Серебря…ый — сколько н?', варианты:[{т:'н',ок:true},{т:'нн',ок:false}], разбор:'Суффикс -ян-: серебряный.' },
    { вопрос:'Соломе…ый — сколько н?', варианты:[{т:'н',ок:false},{т:'нн',ок:true}], разбор:'Суффикс -енн-: соломенный.' },
    { вопрос:'Деревя…ый — сколько н?', варианты:[{т:'нн',ок:true},{т:'н',ок:false}], разбор:'Исключение из окна: деревянный.' },
    { вопрос:'Ветре…ый — сколько н?', варианты:[{т:'нн',ок:false},{т:'н',ок:true}], разбор:'Исключение: ветреный.' },
    { вопрос:'Дорога дли…а — сколько н?', варианты:[{т:'нн',ок:true},{т:'н',ок:false}], разбор:'Длинная — длинна: как в полной форме.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r913Reset()")}</div>` +
        ПРАВИЛО('<b>Каждая н — свой гвоздь. Окно — на двух, ветер — на одном.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', '<span style="font-size:22px;font-family:Georgia,serif">'+в.т+'</span>', "r913Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Н или НН', задания:[
    {q:'глиня…ый', в:0, варианты:['н','нн'], раз:'Суффикс -ян-.'},
    {q:'карма…ый', в:1, варианты:['н','нн'], раз:'Карман + н.'},
    {q:'гуси…ый', в:0, варианты:['н','нн'], раз:'Суффикс -ин-.'},
    {q:'клюкве…ый', в:1, варианты:['н','нн'], раз:'Суффикс -енн-.'},
    {q:'шерстя…ой', в:0, варианты:['н','нн'], раз:'Суффикс -ян-.'},
    {q:'осе…ий', в:1, варианты:['н','нн'], раз:'Осень + н: осенний.'}
  ]};
  const Т2 = { имя:'Исключения', задания:[
    {q:'стекля…ый', в:1, варианты:['н','нн'], раз:'Исключение: стеклянный.'},
    {q:'серебря…ый', в:0, варианты:['н','нн'], раз:'Правило: -ян-, одна н.'},
    {q:'оловя…ый', в:1, варианты:['н','нн'], раз:'Исключение: оловянный.'},
    {q:'ветре…ый', в:0, варианты:['н','нн'], раз:'Исключение: ветреный.'},
    {q:'безветре…ый', в:1, варианты:['н','нн'], раз:'С приставкой — две н.'},
    {q:'деревя…ый', в:1, варианты:['н','нн'], раз:'Исключение: деревянный.'}
  ]};
  const Т3 = { имя:'Краткая форма', задания:[
    {q:'речь торжестве…а (торжественная)', в:1, варианты:['н','нн'], раз:'Как в полной: торжественна.'},
    {q:'роща зеле…а (зелёная)', в:0, варианты:['н','нн'], раз:'Как в полной: зелена.'},
    {q:'даль тума…а (туманная)', в:1, варианты:['н','нн'], раз:'Как в полной: туманна.'},
    {q:'девочка ю…а (юная)', в:0, варианты:['н','нн'], раз:'Как в полной: юна.'},
    {q:'вещь це…а (ценная)', в:1, варианты:['н','нн'], раз:'Как в полной: ценна.'}
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
        '<span style="font-size:22px;font-family:Georgia,serif">'+в+'</span>', "r913T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r913TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L913 = {
    id: ID,
    title: 'Н и нн в прилагательных',
    ico: '🔨',
    src: 'Русский язык · 6 класс · Имя прилагательное', subj: 'rus',
    explain: [
      'Буря сорвала вывески: в суффиксах бывает н и нн.',
      'Одна н: -ан-, -ян-, -ин- — кожаный.',
      'Две н: -енн-, -онн- — соломенный.',
      'Н корня и н суффикса: каменный, туманный; юный — одна.',
      'Улица мастеров: восемь вывесок.',
      'Окно: стеклянный, оловянный, деревянный.',
      'Ветреный — одна н, безветренный — две.',
      'Буря возвращается: восемь слов с исключениями.',
      'Краткая форма: столько же н, сколько в полной.',
      'Итог: каждая н — свой гвоздь.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: н или нн.',
      'Тренажёр 2: исключения.',
      'Тренажёр 3: краткая форма.'
    ],
    check: {
      q: 'В каком слове пишется одна н?',
      choices: ['стеклянный','ветреный','соломенный'],
      ans: 1,
      exp: 'Ветреный — исключение с одной н.'
    },
    tasks: [
      { q:'Сколько слов-исключений с двумя н «живут» в окне?', kind:'unit', ans:3, tol:0,
        hints:['Стекло, рама, задвижка.'], sol:'3: стеклянный, деревянный, оловянный.' },
      { q:'Кожа…ый — пишется', kind:'choice', choices:['н','нн'], ans:0, tol:0,
        hints:['Суффикс -ан-.'], sol:'Кожаный.' },
      { q:'Лимо…ый — пишется', kind:'choice', choices:['н','нн'], ans:1, tol:0,
        hints:['Лимон + суффикс -н-.'], sol:'Лимонный.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.борей){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L913.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Буря на улице мастеров',2:'Кожаные ремни',3:'Соломенные шляпы',4:'Каменная кладка',5:'Улица мастеров',
      6:'Окно Архимеда',7:'Ветреный день',8:'Буря возвращается',9:'Полная и краткая',10:'Каждая н — свой гвоздь',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l913" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Н и нн в прилагательных'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r913Буря=()=>{ const s=S(); s.буря1=true; chRender(0); };
  window.r913Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r913Окно=(к)=>{ const s=S(); s.ок6=к; const в=Object.assign({},s.вид6||{}); в[к]=true; s.вид6=в; chRender(0); };
  const шаг = (ключСч,ключОтв,список,дело,j) => { const s=S(); const n=s[ключСч]||0; if(n>=список.length) return;
    if(список[n].н===j+1){ s[ключСч]=n+1; s[ключОтв]={i:n,ок:true}; if(n+1>=список.length) s['дело_'+дело]=true; }
    else s[ключОтв]={i:n,ок:false,j:j};
    chRender(0); };
  window.r913Улица=(j)=>шаг('ул5','отв5',УЛИЦА,'улица',j);
  window.r913Краткая=(j)=>шаг('кр9','отв9',КРАТКИЕ,'краткие',j);
  window.r913Гвоздь=(j)=>{ const s=S(); const б=Object.assign({n:0,ош:0},s.бур8||{}); if(б.n>=БУРЯ.length||б.ош>=3) return;
    if(БУРЯ[б.n].н===j+1){ s.отв8={i:б.n,ок:true}; б.n++; if(б.n>=БУРЯ.length) s.дело_буря=true; }
    else { б.ош++; s.отв8={i:б.n,ок:false,j:j}; }
    s.бур8=б; chRender(0); };
  window.r913Заново=()=>{ const s=S(); s.бур8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r913Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r913Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r913T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r913TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L913; else arr.push(L913); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU913={render:render, L:L913};
})();
