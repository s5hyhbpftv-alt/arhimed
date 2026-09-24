/* ============ РУССКИЙ ЯЗЫК · УРОК 873 · «ПРЕДЛОЖЕНИЕ: ОСНОВА И ВТОРОСТЕПЕННЫЕ ЧЛЕНЫ» ============
   4 класс, «Предложение». Была заглушкой в soon_lessons.js — теперь урок.
   Путь «Открытое море», «Судовой журнал», после 872. Рисунки — общая библиотека
   моря MVP/data/ris_more.js (шторм, молния, дождь, вал, всплеск, радуга).

   СЮЖЕТ. «Шторм». Фрегат попал в шторм. Капитан приказывает облегчить судно:
   всё лишнее — за борт. Слова предложения лежат на палубе ящиками. Второстепенные
   члены можно выбросить — предложение останется предложением. Подлежащее и
   сказуемое прибиты к палубе: без них предложение развалится. Потом команда
   разбирает, что за груз ушёл за борт, — какой? кого? когда? — и к утру
   записывает в журнал, что фрегат выдержал шторм.

   РУКАМИ: ящики-слова летят за борт с брызгами, а главные не сдвигаются — на них
   появляются цепи; разметка предложения: слово → член предложения, и на доске
   мелом проводится его линия (одна, две, волнистая, пунктир, точка-тире);
   запись в журнал — к основе подбираются слова по вопросам.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 4 КЛАССА (Канакина, Горецкий):
     главные члены — подлежащее (кто? что?) и сказуемое (что делает? что сделал?
     и др.), вместе — грамматическая основа; подлежащее подчёркивается одной
     чертой, сказуемое — двумя;
     второстепенные члены: определение (какой? чей?) — волнистая линия;
     дополнение (вопросы косвенных падежей: кого? чего? кому? чем? о ком?) —
     пунктир; обстоятельство (где? куда? откуда? когда? как? почему?) —
     точка-тире;
     предложения распространённые (есть второстепенные члены) и
     нераспространённые (только основа). */
(function(){
  'use strict';

  const ID = 873;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КРАСН='#b8321e', МЕЛ='#f4f0e6', МЕЛЖ='#ffd76a';

  const ДЕЛА = [
    {ключ:'шторм',    имя:'Облегчить фрегат',       итог:'боцман держит'},
    {ключ:'разметка', имя:'Разметить предложение',  итог:'пять членов'},
    {ключ:'журнал',   имя:'Записать в журнал',      итог:'выдержал шторм'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* члены предложения: ключ → имя, вопросы, линия */
  const РОЛИ = {
    п:{имя:'подлежащее',   в:'кто? что?'},
    с:{имя:'сказуемое',    в:'что делает? что сделал?'},
    о:{имя:'определение',  в:'какой? чей?'},
    д:{имя:'дополнение',   в:'кого? чего? кому? чем?'},
    б:{имя:'обстоятельство', в:'где? когда? как?'}
  };
  const ПОРЯДОК_РОЛЕЙ = ['п','с','о','д','б'];
  const ШТРИХ = {п:'', с:'', о:'', д:'5 3', б:'8 3 1.6 3'};

  /* кадр 1: груз на палубе */
  const ГРУЗ = [
    {w:'Старый', r:'о'}, {w:'боцман', r:'п'}, {w:'крепко', r:'б'},
    {w:'держит', r:'с'}, {w:'мокрый', r:'о'}, {w:'штурвал', r:'д'}
  ];
  const ГЛАВНЫЙ = (r) => r==='п'||r==='с';
  /* кадр 7: разметка */
  const РАЗМ = [
    {w:'Смелый', r:'о', почему:'юнга какой? — смелый'},
    {w:'юнга', r:'п', почему:'кто забрался? — юнга'},
    {w:'быстро', r:'б', почему:'забрался как? — быстро'},
    {w:'забрался', r:'с', почему:'юнга что сделал? — забрался'},
    {w:'на мачту', r:'б', почему:'забрался куда? — на мачту'}
  ];
  /* кадр 9: запись в журнал */
  const ВАРИАНТЫ9 = ['крепкий','ночью','шторм'];
  const СЛОТЫ9 = [
    {в:'Выдержал когда?', верно:'ночью', r:'б', why:'«ночью» отвечает на вопрос когда? — это обстоятельство'},
    {в:'Фрегат какой?',   верно:'крепкий', r:'о', why:'«крепкий» отвечает на вопрос какой? — это определение'},
    {в:'Выдержал что?',   верно:'шторм', r:'д', why:'«шторм» отвечает на вопрос что? после сказуемого — это дополнение'}
  ];

  const CSS=`
  #lvis .s6.l873{gap:14px}
  #lvis .s6.l873 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l873 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l873 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l873 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l873 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l873 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l873 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l873 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l873 .карт .текст b{color:${GOLD}}
  #lvis .s6.l873 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l873 .правило b{color:${GOLD}}
  #lvis .s6.l873 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l873 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l873 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l873 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l873 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l873 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l873 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l873 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l873 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l873 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l873 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l873 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l873 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l873 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l873 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l873 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l873 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l873 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l873 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l873 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l873 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l873 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l873 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l873 .уровни .точка.сейчас{background:${GOLD};animation:l873dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l873dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l873 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l873{-webkit-text-size-adjust:100%}
  #lvis .s6.l873 [data-anim]{animation:l873rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l873rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l873 .слова{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l873 .слова button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-family:Georgia,serif;font-weight:700;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms,opacity 200ms}
  #lvis .s6.l873 .слова button:active{transform:translateY(2px)}
  #lvis .s6.l873 .слова button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24);color:${GOLD}}
  #lvis .s6.l873 .слова button.ушёл{opacity:.35;text-decoration:line-through;border-color:rgba(127,209,255,.5)}
  #lvis .s6.l873 .слова button.главн{border-color:${GREEN};color:${GREEN}}
  #lvis .s6.l873 .слова button.мимо{border-color:${RED};animation:l873нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l873нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l873 .роли{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l873 .роли button{min-height:64px;border-radius:14px;cursor:pointer;font:inherit;text-align:left;padding:8px 10px;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.08);color:${ИНК};display:flex;flex-direction:column;gap:4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l873 .роли button:active{transform:translateY(2px)}
  #lvis .s6.l873 .роли button b{font-size:17px;font-family:Georgia,serif}
  #lvis .s6.l873 .роли button small{font-size:14px;color:var(--mut)}
  #lvis .s6.l873 .роли button svg{width:74px;height:8px;display:block}
  #lvis .s6.l873 .роли button:last-child:nth-child(odd){grid-column:1 / -1}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l873 [data-anim]{animation:none!important}
    #lvis .s6.l873 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l873 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l873-style');
      if(!s){ s=document.createElement('style'); s.id='l873-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r873Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Шторм</span><b class="${всё?'готово':''}">${
        всё?'фрегат спасён':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}<span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const появиться = () => ДВИЖ ? `<animate attributeName="opacity" from="0" to="1" dur="0.7s" fill="freeze"/>` : '';

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
      <filter id="c873-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.56+22, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c873-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* линия члена предложения под словом: x — начало, w — ширина */
  function линияD(тип,x,y,w){
    const X=(+x).toFixed(1), W=(+w).toFixed(1);
    if(тип==='с') return `M${X} ${y} h${W} M${X} ${y+4} h${W}`;
    if(тип==='о'){
      const n=Math.max(2,Math.round(w/6)), шаг=w/n;
      let d=`M${X} ${y+1}`;
      for(let i=0;i<n;i++) d+=` q${(шаг/2).toFixed(1)} ${i%2?3.2:-3.2} ${шаг.toFixed(1)} 0`;
      return d;
    }
    return `M${X} ${y+1} h${W}`;
  }
  /* строка предложения: слова с линиями членов. Линии сначала ставятся по оценке ширины,
     а после вставки в страницу подгоняются по настоящим буквам (подогнать). */
  function строка(x,y,слова,опц){
    const о=опц||{}, к=о.кегль||18, цвет=о.цвет||ЧЕРНИЛА, лц=о.линия||КРАСН, шр=о.шрифт||"Georgia,'Times New Roman',serif";
    const est=к*0.5;
    const всего=слова.map(с=>с.w).join(' ').length+(о.конец||'').length;
    const x0 = о.якорь==='middle' ? x-всего*est/2 : x;
    let полный='', html='', линии='';
    слова.forEach((с,i)=>{
      if(i){ полный+=' '; html+=' '; }
      const s0=полный.length; полный+=с.w;
      html += с.цвет ? `<tspan fill="${с.цвет}"${с.жир?' font-weight="bold"':''}${с.курсив?' font-style="italic"':''}>${esc(с.w)}</tspan>` : esc(с.w);
      if(с.r) линии+=`<path data-из="${s0}" data-до="${полный.length}" data-тип="${с.r}" data-y="${y+6}"
        d="${линияD(с.r,x0+s0*est,y+6,с.w.length*est)}" stroke="${с.лц||лц}" stroke-width="1.9" fill="none"
        stroke-dasharray="${ШТРИХ[с.r]}" stroke-linecap="round">${с.новое?появиться():''}</path>`;
    });
    html+=esc(о.конец||'');
    return `<g class="c873-стр"><text x="${x}" y="${y}" text-anchor="${о.якорь||'start'}" font-size="${к}" fill="${цвет}" font-family="${шр}">${html}</text>${линии}</g>`;
  }
  function подогнать(el){
    try{
      el.querySelectorAll('.c873-стр').forEach(g=>{
        const t=g.querySelector('text'); if(!t||!t.getStartPositionOfChar) return;
        g.querySelectorAll('path[data-тип]').forEach(p=>{
          try{
            const a=+p.getAttribute('data-из'), b=+p.getAttribute('data-до'), y=+p.getAttribute('data-y');
            const x0=t.getStartPositionOfChar(a).x, x1=t.getEndPositionOfChar(b-1).x;
            if(x1>x0) p.setAttribute('d',линияD(p.getAttribute('data-тип'),x0,y,x1-x0));
          }catch(e){}
        });
      });
    }catch(e){}
  }
  /* образец линии для кнопки */
  const образец = (r,цвет) => `<svg viewBox="0 0 74 8" aria-hidden="true"><path d="${линияD(r,2,2,70)}" stroke="${цвет||МЕЛЖ}" stroke-width="1.9" fill="none" stroke-dasharray="${ШТРИХ[r]}" stroke-linecap="round"/></svg>`;

  /* палуба шире кадра — чтобы при крене не открывались углы */
  const палуба = (y,Н) => { const М=Р(); return `${М.доски(-24,y,384,Н-y+24,false)}
    ${Array.from({length:10},(_,k)=>`<rect x="${-14+k*40}" y="${y-22}" width="5" height="22" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
    <rect x="-24" y="${y-26}" width="384" height="6" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/>`; };
  const крен = (cx,cy,угол,длит) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="rotate" values="${-угол} ${cx} ${cy};${угол} ${cx} ${cy};${-угол} ${cx} ${cy}" dur="${длит}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>` : '';
  /* лист журнала с предложением внизу кадра */
  const полоска = (y,в,содержимое) => `${Р().лист(10,y,316,в,{})}${содержимое}`;

  /* ================= КАДРЫ ================= */

  /* 1. Шторм: лишнее за борт */
  const МЕСТО1 = (i) => ({x:[62,168,274][i%3], y:i<3?236:292});
  function F1(s){
    const Н=390, М=Р(), за=s.за1||[], гл=s.гл1||[], летит=s.летит1, тряс=s.тряс1, сооб=s.сооб1;
    const вторые=ГРУЗ.map((г,i)=>i).filter(i=>!ГЛАВНЫЙ(ГРУЗ[i].r)), все=вторые.every(i=>за.includes(i));
    const в=s.ответ1, ок=в===0;
    const ящ=(i)=>{ const г=ГРУЗ[i], м=МЕСТО1(i), держ=гл.includes(i);
      const цепь=держ?[-1,1].map(с=>`<path d="M${м.x+с*40} ${м.y-6} q${с*6} 6 ${с*12} 10" stroke="url(#рм-железо)" stroke-width="3.4" fill="none" stroke-dasharray="3.4 1.8"/><circle cx="${м.x+с*52}" cy="${м.y+5}" r="3.4" fill="none" stroke="url(#рм-железо)" stroke-width="2"/>`).join(''):'';
      const тряска = тряс===i&&ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="0 0;-5 0;5 0;-3 0;0 0" dur="0.45s" fill="freeze"/>` : '';
      return `<g onclick="r873За(${i})" style="cursor:pointer"><g>${тряска}${цепь}${М.ящик(м.x,м.y,94,42,{надпись:esc(г.w),кегль:14})}</g></g>`; };
    const полёт=(i)=>{ if(!ДВИЖ) return ''; const г=ГРУЗ[i], м=МЕСТО1(i), cy=м.y-21, tx=м.x<168?52:(м.x>168?286:220), ty=150, mx=(м.x+tx)/2;
      return `<g transform="translate(${м.x} ${cy})"><g opacity="1"><animate attributeName="opacity" values="1;1;0" keyTimes="0;0.75;1" dur="1s" fill="freeze"/>
          <animateTransform attributeName="transform" type="translate" values="0 0;${(mx-м.x).toFixed(1)} ${(40-cy).toFixed(1)};${tx-м.x} ${ty-cy}" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;0.45;1" keySplines="0.2 0.6 0.4 1;0.5 0 0.9 0.6"/>
          <g><animateTransform attributeName="transform" type="rotate" values="0;${м.x<168?-140:140}" dur="1s" fill="freeze"/>
            <animateTransform attributeName="transform" type="scale" values="1;0.8;0.45" dur="1s" fill="freeze" additive="sum"/>
            ${М.ящик(0,21,94,42,{надпись:esc(г.w),кегль:14})}</g></g></g>
        ${М.всплеск(tx,ty,0.8,{раз:true,задержка:0.9})}`; };
    /* предложение на листе: что осталось */
    const ост=ГРУЗ.map((г,i)=>i).filter(i=>!за.includes(i));
    const слова=ост.map((i,k)=>{ const г=ГРУЗ[i]; let w=г.w; w = k===0 ? w[0].toUpperCase()+w.slice(1) : w.toLowerCase();
      return {w:w, r:(все&&ГЛАВНЫЙ(г.r))?г.r:null, новое:все}; });
    const стр1=слова.slice(0,Math.min(3,слова.length)), стр2=слова.slice(3);
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Шторм! Волны перехлёстывают через борт. Капитан кричит: «Облегчить фрегат! Лишнее — за борт!» На палубе ящики — это слова предложения. Выбрасывай те, без которых <b>предложение не развалится</b>.') +
      `<div class="pic">${свг(`
        ${М.шторм(336,150,{тучи:[[64,26,1,6],[214,18,1.2,-8],[318,40,0.9,5]]})}
        ${М.молния(236,34,0.62,{})}
        ${М.море(126,60,336,{шторм:true})}
        ${М.вал(290,164,0.62,{влево:true})}${М.вал(40,166,0.5,{})}
        <g>${крен(168,300,1.6,'3.4s')}
          ${палуба(182,Н)}
          ${ГРУЗ.map((_,i)=>за.includes(i)?'':ящ(i)).join('')}
        </g>
        ${летит!=null&&за.includes(летит)?полёт(летит):''}
        ${М.дождь(336,Н,{})}
        ${полоска(306,76,
          строка(168,336,стр1,{кегль:19,якорь:'middle',конец:стр2.length?'':'.'})+
          (стр2.length?строка(168,364,стр2,{кегль:19,якорь:'middle',конец:'.'}):''))}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="слова">${ГРУЗ.map((г,i)=>{ const ушёл=за.includes(i), держ=гл.includes(i);
        return BTN(3+(i%5),(ушёл?'ушёл':'')+(держ?' главн':'')+(тряс===i?' мимо':''),(держ?'⚓ ':'')+г.w,ушёл||все?'':'r873За('+i+')'); }).join('')}</div>` +
      (!все
        ? (сооб ? РАЗБОР(сооб.ок, сооб.ок
              ? '«'+ГРУЗ[сооб.i].w+'» — за борт! Предложение не развалилось, смысл остался.'
              : '«'+ГРУЗ[сооб.i].w+'» выбросить нельзя: без него '+(ГРУЗ[сооб.i].r==='п'?'непонятно, <b>кто</b> держит штурвал':'непонятно, <b>что делает</b> боцман')+'. Это главный член — он прибит к палубе.')
            : СКАЗ('Как проверить','Убери слово мысленно. Если предложение всё ещё понятно — это груз, его можно за борт.'))
        : ОТВЕТЫ('пара',['грамматическая основа','второстепенные члены'],0,в,1) +
          (в==null ? СКАЗ('Вопрос','На палубе остались «боцман держит». Как называются эти два главных слова вместе?') :
            РАЗБОР(ок,['«Боцман держит» — <b>подлежащее</b> и <b>сказуемое</b>. Вместе это <b>грамматическая основа</b> предложения.',
              'Второстепенные ушли за борт. Остались главные члены — <b>грамматическая основа</b>: боцман держит.'][в]))) +
      (ок ? ПРАВИЛО('<b>Подлежащее</b> и <b>сказуемое</b> — главные члены предложения, его <b>грамматическая основа</b>. Остальные члены — <b>второстепенные</b>.') : '');
  }

  /* 2. Подлежащее: кто? что? */
  function F2(s){
    const Н=306, М=Р(), в=s.ответ2, ок=в===2;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Небо раскололось. Юнга пишет в журнал: «Над мачтой сверкнула молния». О чём говорится в предложении? Найди <b>подлежащее</b> — оно отвечает на вопрос <b>кто?</b> или <b>что?</b>') +
      `<div class="pic">${свг(`
        ${М.шторм(336,196,{тучи:[[70,30,1.1,6],[250,22,1.2,-6]]})}
        ${М.молния(118,44,0.95,{всегда:true})}
        ${М.море(170,136,336,{шторм:true})}
        ${М.фрегат(196,232,0.52,{})}
        ${М.вал(40,238,0.5,{})}
        ${М.дождь(336,240,{})}
        ${ок?подпись(250,40,'что сверкнуло? — молния',GOLD,13):''}
        ${полоска(248,50,строка(168,280,[{w:'Над'},{w:'мачтой'},{w:'сверкнула'},{w:'молния',r:ок?'п':null,новое:true,цвет:ок?КРАСН:null,жир:ок}],{кегль:20,якорь:'middle',конец:'.'}))}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['мачтой','сверкнула','молния'],2,в,2) +
      (в==null ? СКАЗ('Вопрос','<b>Что</b> сверкнуло?') :
        РАЗБОР(ок,['«Над мачтой» — это где сверкнула. Спроси: <b>что</b> сверкнуло? — молния.',
          '«Сверкнула» — это что сделала. А кто или что сделало? — <b>молния</b>.',
          'Что сверкнуло? — <b>молния</b>. Это подлежащее: о нём говорится в предложении.'][в])) +
      (ок ? ПРАВИЛО('<b>Подлежащее</b> называет, о ком или о чём говорится. Вопросы: <b>кто? что?</b> Подчёркиваем <b>одной чертой</b>.') : '');
  }

  /* 3. Сказуемое: что сделал? */
  function F3(s){
    const Н=306, М=Р(), в=s.ответ3, ок=в===1;
    const бочка=`<g>${М.бочка(126,226,1.05)}
      ${[196,208].map(y=>`<path d="M110 ${y} q16 5 32 0" stroke="#c8a870" stroke-width="3" fill="none"/><path d="M110 ${y} q16 5 32 0" stroke="#8a6a3a" stroke-width="3" fill="none" stroke-dasharray="1.2 2.4"/>`).join('')}
      <path d="M142 200 Q160 196 168 190" stroke="#c8a870" stroke-width="3" fill="none"/></g>`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Бочку с пресной водой едва не смыло. Запись: «Юнга крепко привязал бочку». Подлежащее уже подчёркнуто — <b>юнга</b>. Найди <b>сказуемое</b>: что сделал юнга?') +
      `<div class="pic">${свг(`
        ${М.шторм(336,130,{тучи:[[80,24,1,6],[270,30,1,-6]],такт:6})}
        ${М.море(112,40,336,{шторм:true})}
        ${палуба(168,Н)}
        <rect x="60" y="0" width="14" height="236" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width="1"/>
        ${[70,110,150].map(y=>`<path d="M74 ${y} L150 ${y+40}" stroke="#6a5a44" stroke-width="1"/>`).join('')}
        ${бочка}
        ${М.юнга(200,232,0.9,{поза:'сачок',рот:'о'})}
        <path d="M168 190 Q188 178 234 150" stroke="#c8a870" stroke-width="3" fill="none"/>
        ${М.боцман(292,232,0.72,{поза:'указывает',влево:true})}
        ${М.дождь(336,240,{})}
        ${полоска(248,50,строка(168,280,[{w:'Юнга',r:'п'},{w:'крепко'},{w:'привязал',r:ок?'с':null,новое:true,цвет:ок?КРАСН:null,жир:ок},{w:'бочку'}],{кегль:20,якорь:'middle',конец:'.'}))}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['крепко','привязал','бочку'],1,в,3) +
      (в==null ? СКАЗ('Вопрос','Юнга <b>что сделал</b>?') :
        РАЗБОР(ок,['«Крепко» — это как привязал. А что сделал юнга? — <b>привязал</b>.',
          'Юнга что сделал? — <b>привязал</b>. Это сказуемое: оно говорит, что делает подлежащее.',
          '«Бочку» — это что привязал. Сам поступок юнги — <b>привязал</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Сказуемое</b> говорит, что делает подлежащее. Вопросы: <b>что делает? что сделал?</b> Подчёркиваем <b>двумя чертами</b>. Подлежащее + сказуемое = <b>основа</b>.') : '');
  }

  /* 4. Определение: какой? */
  function F4(s){
    const Н=316, М=Р(), в=s.ответ4, ок=в===1;
    const п1='M120 58 Q176 70 238 58 L230 196 Q176 214 128 196 Z', п2='M120 58 Q184 66 238 58 L236 196 Q182 206 128 196 Z';
    const дыра1='M150 110 L170 104 L162 122 L186 118 L178 138 L198 142 L176 150 L184 170 L164 156 L158 176 L150 150 L136 158 L146 136 L130 128 L150 124 Z';
    const лоскут1='M186 118 Q210 116 222 106 Q214 124 198 142 Z', лоскут2='M186 118 Q214 124 228 120 Q214 134 198 142 Z';
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ветер рвёт грот. Запись: «Ветер рвал старый парус». Основа уже подчёркнута. Какое слово отвечает на вопрос <b>какой?</b>') +
      `<div class="pic">${свг(`
        ${М.шторм(336,Н-60,{тучи:[[70,24,1,6],[300,34,0.9,-5]],такт:6})}
        ${М.море(200,56,336,{шторм:true})}
        <rect x="112" y="30" width="10" height="226" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M100 54 H258" stroke="#8a5a2e" stroke-width="5" stroke-linecap="round"/><path d="M106 200 H250" stroke="#8a5a2e" stroke-width="4" stroke-linecap="round"/>
        <path d="M117 30 L250 54 M117 30 L100 54" stroke="#6a5a44" stroke-width=".9"/>
        <g><path d="${п1}" fill="url(#рм-парус)" stroke="${ОБВОД}" stroke-width="1.3">${ДВИЖ?`<animate attributeName="d" values="${п1};${п2};${п1}" dur="0.9s" repeatCount="indefinite"/>`:''}</path>
          ${[146,176,206].map(x=>`<path d="M${x} 62 Q${x+4} 130 ${x} 200" stroke="#cdbb94" stroke-width=".8" fill="none"/>`).join('')}
          ${[[132,82,16,12],[204,172,18,12],[210,78,14,10]].map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e0cca0" stroke="#a88a5a" stroke-width=".8" stroke-dasharray="2 1.4"/>`).join('')}
          <path d="${дыра1}" fill="#2a3448" stroke="${ОБВОД}" stroke-width="1"/>
          <path d="${лоскут1}" fill="#efe2c4" stroke="${ОБВОД}" stroke-width="1">${ДВИЖ?`<animate attributeName="d" values="${лоскут1};${лоскут2};${лоскут1}" dur="0.35s" repeatCount="indefinite"/>`:''}</path></g>
        ${[[20,90],[6,140],[30,176]].map(([x,y],i)=>`<path d="M${x} ${y} q24 -10 48 0 t48 0" stroke="#e8eef8" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7" stroke-dasharray="40 140">${анЛин('stroke-dashoffset','180;0','1.6s',`begin="${(i*0.4).toFixed(1)}s"`)}</path>`).join('')}
        ${М.дождь(336,Н-60,{})}
        ${ок?подпись(270,236,'парус какой? — старый',GOLD,13):''}
        ${полоска(258,50,строка(168,290,[{w:'Ветер',r:'п'},{w:'рвал',r:'с'},{w:'старый',r:ок?'о':null,новое:true,цвет:ок?КРАСН:null,жир:ок},{w:'парус'}],{кегль:20,якорь:'middle',конец:'.'}))}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['ветер','старый','парус'],1,в,4) +
      (в==null ? СКАЗ('Вопрос','Парус <b>какой</b>?') :
        РАЗБОР(ок,['«Ветер» — подлежащее, он уже подчёркнут. Спроси от слова «парус»: парус <b>какой?</b> — старый.',
          'Парус какой? — <b>старый</b>. Это определение: оно называет признак предмета.',
          '«Парус» — это что рвал ветер. А какой парус? — <b>старый</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Определение</b> — признак предмета. Вопросы: <b>какой? чей?</b> Подчёркиваем <b>волнистой линией</b>.') : '');
  }

  /* 5. Дополнение: кого? */
  function F5(s){
    const Н=306, М=Р(), в=s.ответ5, ок=в===1;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Фрегат несёт на скалы. Капитан зовёт штурмана — нужно проложить курс. Запись: «Капитан позвал штурмана». Позвал <b>кого?</b>') +
      `<div class="pic">${свг(`
        ${М.шторм(336,130,{тучи:[[90,26,1,6],[260,20,1.1,-6]],такт:7})}
        ${М.утёс(300,128,0.7)}
        ${М.море(110,50,336,{шторм:true})}
        ${палуба(166,Н)}
        <rect x="130" y="170" width="10" height="62" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
        <rect x="126" y="226" width="18" height="8" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>
        ${М.штурвал(135,160,26,{})}
        ${М.капитан(66,236,0.82,{трубка:false})}
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="0.5s" repeatCount="indefinite"/>`:''}${М.штурман(248,236,0.82,{})}</g>
        ${[0,1,2].map(k=>`<path d="M${80+k*12} ${116-k*6} q8 -6 0 -12" stroke="#fff4c0" stroke-width="2" fill="none" stroke-linecap="round">${анЛин('opacity','1;0.2;1','0.8s',`begin="${k*0.2}s"`)}</path>`).join('')}
        ${М.дождь(336,240,{})}
        ${ок?подпись(250,56,'позвал кого? — штурмана',GOLD,13):''}
        ${полоска(248,50,строка(168,280,[{w:'Капитан',r:'п'},{w:'позвал',r:'с'},{w:'штурмана',r:ок?'д':null,новое:true,цвет:ок?КРАСН:null,жир:ок}],{кегль:20,якорь:'middle',конец:'.'}))}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['капитан','штурмана'],1,в,5) +
      (в==null ? СКАЗ('Вопрос','Позвал <b>кого</b>?') :
        РАЗБОР(ок,['«Капитан» — подлежащее: кто позвал? Нам нужен другой вопрос — позвал <b>кого?</b> — штурмана.',
          'Позвал кого? — <b>штурмана</b>. Это дополнение: оно отвечает на вопросы падежей, кроме именительного.'][в])) +
      (ок ? ПРАВИЛО('<b>Дополнение</b> отвечает на вопросы косвенных падежей: <b>кого? чего? кому? чем? о ком?</b> Подчёркиваем <b>пунктиром</b>.') : '');
  }

  /* 6. Обстоятельство: когда? */
  function F6(s){
    const Н=300, М=Р(), в=s.ответ6, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Всю ночь фрегат боролся с волнами. А на рассвете юнга записал: «К утру шторм утих». Какие слова отвечают на вопрос <b>когда?</b>') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{закат:true,солнце:[250,142,15],облака:[[70,40,0.6,6],[290,60,0.5,-5]]})}
        ${М.море(140,160,336,{дорожка:250})}
        ${М.фрегат(128,210,0.5,{})}
        ${М.чайка(250,60,0.6,{дрейф:'0 -4'})}${М.чайка(290,86,0.45,{дрейф:'0 -3',темп:1.1})}
        ${ок?подпись(250,26,'утих когда? — к утру',GOLD,13):''}
        ${полоска(244,50,строка(168,276,[{w:'К утру',r:ок?'б':null,новое:true,цвет:ок?КРАСН:null,жир:ок},{w:'шторм',r:'п'},{w:'утих',r:'с'}],{кегль:20,якорь:'middle',конец:'.'}))}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['к утру','шторм','утих'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Шторм утих <b>когда</b>?') :
        РАЗБОР(ок,['Утих когда? — <b>к утру</b>. Это обстоятельство: оно говорит, когда, где или как происходит действие.',
          '«Шторм» — подлежащее. А на вопрос когда? отвечают слова <b>к утру</b>.',
          '«Утих» — сказуемое. Когда утих? — <b>к утру</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Обстоятельство</b> — где, когда, куда, как происходит действие. Подчёркиваем <b>точка — тире</b>.') : '');
  }

  /* 7. Разметка: пять членов */
  function F7(s){
    const Н=330, М=Р(), разм=s.разм7||{}, выб=s.выб7, отв=s.отв7;
    const все=РАЗМ.every((_,i)=>разм[i]);
    const слово=(i)=>{ const г=РАЗМ[i], есть=разм[i];
      return {w:г.w, r:есть?г.r:null, новое:отв&&отв.ок&&отв.i===i, цвет:есть?МЕЛЖ:(выб===i?'#9fe0ff':null)}; };
    const лесенка=Array.from({length:8},(_,k)=>{ const y=196-k*20-2, t=(196-y)/156;
      return `<path d="M${(152+46*t).toFixed(1)} ${y} H${(186+18*t).toFixed(1)}" stroke="#c8a870" stroke-width="2.2" stroke-linecap="round"/>`; }).join('');
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Шторм стих, но на мачте запутался флаг. Смелый юнга полез его распутать. Разметь предложение, как штурман: выбери слово, потом член предложения — и на доске появится его линия.') +
      `<div class="pic">${свг(`
        ${М.небо(336,120,{облака:[[70,30,0.6,6],[250,50,0.5,-6]]})}
        ${М.море(120,40,336,{})}
        ${палуба(196,Н)}
        <rect x="200" y="0" width="12" height="200" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width="1"/>
        <rect x="186" y="54" width="40" height="8" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M152 196 L198 40 M186 196 L204 40" stroke="#8a6a44" stroke-width="1.6"/>${лесенка}
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="1.4s" repeatCount="indefinite"/>`:''}${М.юнга(181,138,0.62,{поза:'машет'})}</g>
        ${М.флаг(214,52,'красный','треугольный',true,{в:42})}
        ${М.боцман(60,196,0.62,{поза:'указывает'})}
        ${М.доска(8,212,320,110,{})}
        ${строка(168,252,[0,1,2].map(слово),{кегль:22,якорь:'middle',цвет:МЕЛ,линия:МЕЛЖ,шрифт:"'Comic Sans MS','Marker Felt',Georgia,serif"})}
        ${строка(168,294,[3,4].map(слово),{кегль:22,якорь:'middle',цвет:МЕЛ,линия:МЕЛЖ,конец:'.',шрифт:"'Comic Sans MS','Marker Felt',Georgia,serif"})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="слова">${РАЗМ.map((г,i)=>{ const есть=разм[i];
        return BTN(3+(i%5),(есть?'главн':'')+(выб===i?' вкл':''),(есть?'✓ ':'')+г.w,есть||все?'':'r873Слово('+i+')'); }).join('')}</div>` +
      (все ? '' : `<div class="роли">${ПОРЯДОК_РОЛЕЙ.map((r,k)=>BTN(4+k,'',`<b>${РОЛИ[r].имя}</b>${образец(r)}<small>${РОЛИ[r].в}</small>`,'r873Роль(\''+r+'\')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Разметка готова: <b>юнга</b> — подлежащее, <b>забрался</b> — сказуемое, <b>смелый</b> — определение, <b>быстро</b> и <b>на мачту</b> — обстоятельства.')
        : отв ? РАЗБОР(отв.ок, отв.ок
            ? '«'+РАЗМ[отв.i].w+'» — '+РОЛИ[РАЗМ[отв.i].r].имя+': '+РАЗМ[отв.i].почему+'.'
            : '«'+РАЗМ[отв.i].w+'» — не '+РОЛИ[отв.r].имя+'. Задай вопрос: '+РАЗМ[отв.i].почему+'. Выбери ещё раз.')
        : СКАЗ(выб!=null?'Слово выбрано':'Сначала слово', выб!=null?'«'+esc(РАЗМ[выб].w)+'» — какой это член предложения? Задай к нему вопрос.':'Нажми на слово выше. Начни с основы: кто? что сделал?')) +
      (все ? ПРАВИЛО('Сначала найди <b>основу</b>, потом задавай вопросы <b>от главных слов</b> к остальным: юнга какой? забрался как? куда?') : '');
  }

  /* 8. Распространённое и нераспространённое */
  function F8(s){
    const Н=300, М=Р(), в=s.ответ8, ок=в===1;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Штурман говорит: «Предложение — как корабль. Основа — мачты. Второстепенные члены — паруса». Какое предложение <b>распространённое</b>, с парусами?') +
      `<div class="pic">${свг(`
        ${М.небо(336,130,{солнце:[300,30,11],облака:[[150,34,0.55,6]]})}
        ${М.море(130,90,336,{})}
        ${М.парусник(84,178,0.62,{парус:0,флаг:false})}
        ${М.парусник(252,178,0.62,{})}
        ${М.лист(12,222,150,70,{})}${М.лист(174,222,150,70,{})}
        ${строка(87,262,[{w:'Шторм',r:'п'},{w:'утих',r:'с'}],{кегль:17,якорь:'middle',конец:'.'})}
        ${строка(249,252,[{w:'К утру',r:ок?'б':null,новое:true},{w:'сильный',r:ок?'о':null,новое:true}],{кегль:16,якорь:'middle'})}
        ${строка(249,278,[{w:'шторм',r:'п'},{w:'утих',r:'с'}],{кегль:16,якорь:'middle',конец:'.'})}
        ${ок?подпись(84,44,'только основа',BLUE,12)+подпись(252,96,'основа + второстепенные',GOLD,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['Шторм утих.','К утру сильный шторм утих.'],1,в,8) +
      (в==null ? СКАЗ('Вопрос','В каком предложении есть второстепенные члены?') :
        РАЗБОР(ок,['«Шторм утих» — только основа, одни голые мачты. Это <b>нераспространённое</b> предложение.',
          'Здесь к основе добавлены <b>к утру</b> (когда?) и <b>сильный</b> (какой?). Это <b>распространённое</b> предложение.'][в])) +
      (ок ? ПРАВИЛО('Только основа — предложение <b>нераспространённое</b>. Есть второстепенные члены — <b>распространённое</b>.') : '');
  }

  /* 9. Запись в журнал */
  function F9(s){
    const Н=280, М=Р(), реш=s.реш9||{}, все=СЛОТЫ9.every((_,i)=>реш[i]!=null), верно=все&&СЛОТЫ9.every((x,i)=>реш[i]===x.верно);
    const слот=(i,заглавная)=>{ const р=реш[i], x=СЛОТЫ9[i];
      if(р==null) return {w:'(' + x.в.split(' ')[1] + ')', цвет:'#a88a5a', курсив:true};
      const w=заглавная?р[0].toUpperCase()+р.slice(1):р;
      return р===x.верно ? {w:w, r:x.r, цвет:'#1a6a3a', жир:true, новое:true} : {w:w, цвет:КРАСН, жир:true}; };
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Утро. Капитан диктует главную запись: основа — «<b>фрегат выдержал</b>». Добавь к ней второстепенные члены: к каждому вопросу подбери слово.') +
      `<div class="pic">${свг(`
        ${М.небо(336,70,{солнце:[40,30,10],облака:[[240,30,0.5,-6]]})}
        ${М.море(70,30,336,{})}
        ${М.фрегат(250,94,0.26,{})}
        ${М.лист(12,96,312,Н-108,{линии:3})}
        ${строка(30,150,[слот(0,true),слот(1,false),{w:'фрегат',r:'п'}],{кегль:21})}
        ${строка(30,196,[{w:'выдержал',r:'с'},слот(2,false)],{кегль:21,конец:'.'})}
        ${верно?т(304,244,'✓',24,'#1a7a4a',true,'end'):''}
        ${М.перо(292,248,0.8,-24)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СЛОТЫ9.map((x,i)=>`<div class="случай">${A(3+i,'что',x.в)}<div class="ask три">${ВАРИАНТЫ9.map(w=>
        BTN(4+i,реш[i]===w?(w===x.верно?'hit':'miss'):'',w,"r873Слот("+i+",'"+w+"')")).join('')}</div></div>`).join('') +
      (!все ? СКАЗ('Подсказка','Задавай вопрос от главного слова: выдержал <b>когда?</b> фрегат <b>какой?</b> выдержал <b>что?</b>') :
        РАЗБОР(верно, верно ? 'Запись готова: «Ночью крепкий фрегат выдержал шторм». Основа — <b>фрегат выдержал</b>, остальное — второстепенные члены.' :
          СЛОТЫ9.filter((x,i)=>реш[i]!==x.верно).map(x=>x.why).join('; ')+'.')) +
      (верно ? ПРАВИЛО('Второстепенные члены <b>поясняют</b> главные: определение — подлежащее, дополнение и обстоятельство — сказуемое.') : '');
  }

  /* 10. Радуга: итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    const ряд=(i,r,слово)=>{ const y=184+i*30;
      return `<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="${(0.2+i*0.3).toFixed(1)}s" fill="freeze"/>`:''}${строка(30,y,[{w:слово,r:r}],{кегль:16})}
        ${т(128,y,РОЛИ[r].имя,14,ЧЕРНИЛА,true,'start')}${т(316,y,РОЛИ[r].в.split(' ').slice(0,2).join(' '),12,'#6a5236',false,'end')}</g>`; };
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Над морем встала радуга. Фрегат цел: груз второстепенных слов вернули на борт, а основа выдержала шторм. Штурман повесил в кубрике памятку — пять линий.'
        : 'Шторм ещё не пройден — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{солнце:[300,34,12],облака:[[60,30,0.5,6]]})}
        ${М.радуга(170,150,120,{яркость:0.5})}
        ${М.море(120,40,336,{дорожка:300})}
        ${М.фрегат(170,146,0.4,{})}
        ${М.чайка(80,70,0.5,{дрейф:'0 -3'})}
        ${М.лист(12,160,312,Н-172,{})}
        ${ряд(0,'п','юнга')}${ряд(1,'с','забрался')}${ряд(2,'о','смелый')}${ряд(3,'д','штурмана')}${ряд(4,'б','к утру')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','<b>Подлежащее</b> (кто? что?) и <b>сказуемое</b> (что делает?) — главные члены, <b>грамматическая основа</b>. Второстепенные: <b>определение</b> (какой? чей?), <b>дополнение</b> (кого? чего? чем?…), <b>обстоятельство</b> (где? когда? как?). Есть второстепенные — предложение распространённое, нет — нераспространённое.') +
      ПРАВИЛО('<b>Сначала основа — потом вопросы от неё.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'«Чайка кричит». Подлежащее?', варианты:[{т:'чайка',ок:true},{т:'кричит',ок:false}], разбор:'Кто кричит? — чайка.' },
    { вопрос:'«Волны бьют в борт». Сказуемое?', варианты:[{т:'волны',ок:false},{т:'бьют',ок:true}], разбор:'Волны что делают? — бьют.' },
    { вопрос:'«Над синим морем летят чайки». «Синим» — это…', варианты:[{т:'определение',ок:true},{т:'дополнение',ок:false}], разбор:'Над морем каким? — синим.' },
    { вопрос:'«Юнга чистит палубу». «Палубу» — это…', варианты:[{т:'обстоятельство',ок:false},{т:'дополнение',ок:true}], разбор:'Чистит что? — палубу.' },
    { вопрос:'«Вечером фрегат вошёл в бухту». «Вечером» — это…', варианты:[{т:'обстоятельство',ок:true},{т:'подлежащее',ок:false}], разбор:'Вошёл когда? — вечером.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r873Reset()")}</div>` +
        ПРАВИЛО('<b>Сначала основа — потом вопросы от неё.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r873Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Найди основу', задания:[
    {q:'«Ветер надул паруса». Основа?', в:0, варианты:['ветер надул','надул паруса'], раз:'Что надуло? — ветер. Ветер что сделал? — надул.'},
    {q:'«На мачте сидит чайка». Основа?', в:1, варианты:['мачте сидит','сидит чайка'], раз:'Кто сидит? — чайка. Подлежащее бывает и после сказуемого.'},
    {q:'«Утром пришёл новый юнга». Основа?', в:0, варианты:['пришёл юнга','новый юнга'], раз:'Кто пришёл? — юнга. «Новый» — определение.'},
    {q:'«Звёзды светят ярко». Основа?', в:0, варианты:['звёзды светят','светят ярко'], раз:'Что светит? — звёзды. «Ярко» — обстоятельство: как?'}
  ]};
  const Т2 = { имя:'Второстепенные', задания:[
    {q:'«Боцман поднял тяжёлый якорь». «Тяжёлый» —', в:0, варианты:['определение','дополнение'], раз:'Якорь какой? — тяжёлый.'},
    {q:'«Кок варит суп». «Суп» —', в:1, варианты:['подлежащее','дополнение'], раз:'Варит что? — суп.'},
    {q:'«Чайки летают высоко». «Высоко» —', в:0, варианты:['обстоятельство','определение'], раз:'Летают как? — высоко.'},
    {q:'«Капитан доволен юнгой». «Юнгой» —', в:1, варианты:['обстоятельство','дополнение'], раз:'Доволен кем? — юнгой.'}
  ]};
  const Т3 = { имя:'Распространённое?', задания:[
    {q:'«Дождь идёт.»', в:0, варианты:['нераспространённое','распространённое'], раз:'Только основа.'},
    {q:'«Тёплый дождь идёт.»', в:1, варианты:['нераспространённое','распространённое'], раз:'Есть определение: какой? — тёплый.'},
    {q:'«Ветер стих к вечеру.»', в:1, варианты:['нераспространённое','распространённое'], раз:'Есть обстоятельство: когда? — к вечеру.'},
    {q:'«Волны улеглись.»', в:0, варианты:['нераспространённое','распространённое'], раз:'Только основа: волны улеглись.'}
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
        в, "r873T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r873TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L873 = {
    id: ID,
    title: 'Предложение: основа и второстепенные',
    ico: '⚓',
    src: 'Русский язык · 4 класс · Предложение', subj: 'rus',
    explain: [
      'Шторм: второстепенные слова можно выбросить за борт, основа остаётся — «боцман держит».',
      'Подлежащее отвечает на вопрос кто? что? — молния. Одна черта.',
      'Сказуемое: что делает? что сделал? — привязал. Две черты.',
      'Определение: какой? чей? — старый парус. Волнистая линия.',
      'Дополнение: кого? чего? чем? — позвал штурмана. Пунктир.',
      'Обстоятельство: где? когда? как? — к утру. Точка — тире.',
      'Разметка: смелый юнга быстро забрался на мачту.',
      'Только основа — нераспространённое, со второстепенными — распространённое.',
      'Ночью крепкий фрегат выдержал шторм.',
      'Итог: пять членов предложения и пять линий.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: найди основу.',
      'Тренажёр 2: второстепенные члены.',
      'Тренажёр 3: распространённое или нет.'
    ],
    check: {
      q: '«Над морем кружат чайки». Подлежащее?',
      choices: ['морем','чайки'],
      ans: 1,
      exp: 'Кто кружит? — чайки.'
    },
    tasks: [
      { q:'Сколько главных членов в предложении «Юнга спит»?', kind:'unit', ans:2, tol:0,
        hints:['Подлежащее и сказуемое.'], sol:'2.' },
      { q:'«Старый боцман курит трубку». «Старый» —', kind:'choice', choices:['определение','подлежащее'], ans:0, tol:0,
        hints:['Боцман какой?'], sol:'Определение.' },
      { q:'«Утром фрегат поднял якорь». «Утром» —', kind:'choice', choices:['дополнение','обстоятельство'], ans:1, tol:0,
        hints:['Поднял когда?'], sol:'Обстоятельство.' }
    ]
  };

  function render(el){
    if(!window.РМ){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L873.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    s.летит1=null; s.тряс1=null;
    const ЗАГОЛОВКИ={1:'Всё лишнее — за борт',2:'Молния над мачтой',3:'Бочку не смыло',4:'Рваный парус',5:'Курс мимо скал',
      6:'Шторм утих',7:'Флаг на мачте',8:'Мачты и паруса',9:'Главная запись',10:'Радуга',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l873" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Предложение'}</h2>${сцена}</div>`;
    подогнать(el);
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r873За=(i)=>{ const s=S(); const за=(s.за1||[]).slice(); if(за.includes(i)) return;
    if(ГЛАВНЫЙ(ГРУЗ[i].r)){ const гл=(s.гл1||[]).slice(); if(!гл.includes(i)) гл.push(i); s.гл1=гл; s.тряс1=i; s.сооб1={i:i,ок:false}; }
    else { за.push(i); s.за1=за; s.летит1=i; s.сооб1={i:i,ок:true}; }
    chRender(0); };
  window.r873Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; if(f===1&&к===0) s.дело_шторм=true; chRender(0); };
  window.r873Слово=(i)=>{ const s=S(); s.выб7=i; s.отв7=null; chRender(0); };
  window.r873Роль=(r)=>{ const s=S(); const i=s.выб7; if(i==null) return;
    if(РАЗМ[i].r===r){ const р=Object.assign({},s.разм7||{}); р[i]=r; s.разм7=р; s.выб7=null; s.отв7={i:i,ок:true};
      if(РАЗМ.every((_,k)=>р[k])) s.дело_разметка=true;
    } else s.отв7={i:i,r:r,ок:false};
    chRender(0); };
  window.r873Слот=(i,w)=>{ const s=S(); const р=Object.assign({},s.реш9||{}); р[i]=w; s.реш9=р;
    if(СЛОТЫ9.every((x,k)=>р[k]===x.верно)) s.дело_журнал=true; chRender(0); };
  window.r873Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r873Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r873T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r873TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L873; else arr.push(L873); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU873={render:render, L:L873};
})();
