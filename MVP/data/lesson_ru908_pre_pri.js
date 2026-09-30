/* ============ РУССКИЙ ЯЗЫК · УРОК 908 · «ПРИСТАВКИ ПРЕ- И ПРИ-» ============
   6 класс, «Словообразование. Орфография». Была заглушкой в soon_lessons.js — теперь урок.
   Место по легенде — Сиракузы (как 896–907). Рисунки — общая библиотека
   MVP/data/ris_more.js. НОВЫЕ ГЕРОИ: девочка Мирто, ослик Прим и сова Премудрая
   (девочка, ослик, сова), белёный домик с дверью; плитки букв — в самом уроке.

   СЮЖЕТ. «Ослик Прим и сова Премудрая». Мирто, дочь гончара, везёт на ослике
   амфоры к Архимеду. Ослик живёт приставкой при-: пришёл, привязан, прилёг у
   приморского домика. Сова живёт приставкой пре-: она премудрая и перелетает
   любую преграду. Приставки безударные — выбирать их надо по значению.

   РУКАМИ: познакомиться с героями; привести и привязать ослика; приоткрыть
   дверь; разложить шесть слов по четырём корзинам значений при-; провести
   ослика по дороге к Архимеду — шесть слов, при- или пре-; слова-близнецы.

   ПРОВЕРЕНО ПО ПРОГРАММЕ 6 КЛАССА (Ладыженская, Баранов):
     при-: приближение (прийти, приехать, приплыть), присоединение (привязать,
       пришить, приклеить), близость (приморский, прибрежный, пригородный),
       неполное действие (приоткрыть, присесть, прилечь, привстать);
     пре-: значение «очень» (премудрый, прекрасный, предобрый); близость к
       приставке пере- (преградить, прервать, преступить);
     слова, различающиеся значением: прибыть — пребывать, притворить —
       претворить;
     если значение приставки неясно (привет, природа, причина, препятствие,
       преследовать), написание проверяют по словарю и запоминают. */
(function(){
  'use strict';

  const ID = 908;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ПРИ='#ffb060', ПРЕ='#c2b0f6';

  const ДЕЛА = [
    {ключ:'корзины',  имя:'Наполнить четыре корзины', итог:'6 из 6'},
    {ключ:'дорога',   имя:'Довести ослика',           итог:'6 шагов'},
    {ключ:'близнецы', имя:'Различить близнецов',      итог:'4 из 4'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* кадр 4: четыре значения при- */
  const ЗНАЧ = ['приближение','присоединение','близость','неполное действие'];
  const КОРЗИНЫ = [
    {сл:'приплыть',    з:0, поч:'плыть и приблизиться'},
    {сл:'пришить',     з:1, поч:'шить и присоединить'},
    {сл:'пригородный', з:2, поч:'тот, что рядом с городом'},
    {сл:'привстать',   з:3, поч:'встать чуть-чуть, не до конца'},
    {сл:'прибрежный',  з:2, поч:'тот, что рядом с берегом'},
    {сл:'присесть',    з:3, поч:'сесть ненадолго'}
  ];
  /* кадр 7: дорога к Архимеду */
  const ДОРОГА = [
    {сл:'приехать',   г:'и', поч:'приближение'},
    {сл:'прекрасный', г:'е', поч:'пре- = очень: очень красивый'},
    {сл:'пришить',    г:'и', поч:'присоединение'},
    {сл:'прервать',   г:'е', поч:'пре- = пере-: перервать'},
    {сл:'присесть',   г:'и', поч:'неполное действие'},
    {сл:'предобрый',  г:'е', поч:'пре- = очень: очень добрый'}
  ];
  /* кадр 8: близнецы */
  const БЛИЗНЕЦЫ = [
    {до:'пр', после:'быть в Сиракузы',           г:'и', поч:'прибыть — приехать, приблизиться'},
    {до:'пр', после:'бывать в Сиракузах',        г:'е', поч:'пребывать — находиться где-то; приближения нет'},
    {до:'пр', после:'творить дверь',             г:'и', поч:'притворить — прикрыть не до конца'},
    {до:'пр', после:'творить мечту в жизнь',     г:'е', поч:'претворить — превратить мечту в дело'}
  ];

  const CSS=`
  #lvis .s6.l908{gap:14px}
  #lvis .s6.l908 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l908 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l908 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l908 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l908 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l908 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l908 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l908 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l908 .карт .текст b{color:${GOLD}}
  #lvis .s6.l908 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l908 .правило b{color:${GOLD}}
  #lvis .s6.l908 .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l908 .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l908 .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l908 .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l908 .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l908 .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l908 .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l908 .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l908 .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l908 .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l908 .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l908 .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l908 .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l908 .буйки button:active{transform:scale(.96)}
  #lvis .s6.l908 .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l908 .буйки button.мимо{border-color:${RED};animation:l908нет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l908нет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l908 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l908 .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l908 .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l908 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l908 .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l908 .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l908 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l908 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l908 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l908 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l908 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l908 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l908 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l908 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l908 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l908 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l908 .уровни .точка.сейчас{background:${GOLD};animation:l908dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l908dot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l908 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l908{-webkit-text-size-adjust:100%}
  #lvis .s6.l908 [data-anim]{animation:l908rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l908rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l908 .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l908 .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l908 .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l908 .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l908 .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l908 .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l908 .падежи button.мимо{border-color:${RED};background:rgba(232,106,90,.14)}
  #lvis .s6.l908 .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l908 [data-anim]{animation:none!important}
    #lvis .s6.l908 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l908 button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l908-style');
      if(!s){ s=document.createElement('style'); s.id='l908-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r908Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Дорога к Архимеду</span><b class="${всё?'готово':''}">${
        всё?'амфоры доставлены':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c908-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c908-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c908-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c908-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c908-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c908-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  /* плитки букв: приставка под «уголком», её гласная цветом (и — оранжевый ослика, е — лиловый совы) */
  const Ш=19;
  const плитки = (cx,y,слово,опц) => { const о=опц||{}, б=String(слово).split(''), x0=cx-б.length*Ш/2+1;
    let s2='';
    б.forEach((ch,i)=>{ const x=x0+i*Ш, пусто=ch==='?', гл=i===2;
      const fill = пусто ? 'rgba(14,26,20,.6)' : гл ? (ch==='и'?ПРИ:ПРЕ) : i<3 ? '#fff0cc' : 'url(#рм-мрамор)';
      s2+=`<rect x="${x.toFixed(1)}" y="${y}" width="17" height="26" rx="3.5" fill="${fill}" stroke="${пусто?GOLD:ОБВОД}" stroke-width="${гл||пусто?1.7:0.9}"${пусто?' stroke-dasharray="3 2.5"':''}/>
        ${т(x+8.5,y+19,ch,16,пусто?GOLD:ЧЕРНИЛА,true)}`; });
    const d=`M${x0.toFixed(1)} ${y-13} H${(x0+2*Ш+17).toFixed(1)} V${y-3}`;
    s2+=`<path d="${d}" stroke="#fffaf0" stroke-width="4.8" fill="none" opacity=".85"/><path d="${d}" stroke="#a0200e" stroke-width="2.3" fill="none"/>`;
    return `<g filter="url(#c908-тень)">${s2}</g>`; };
  /* земля: дальние холмы и песчаная дорога */
  const земля = (y0,Н,опц) => { const о=опц||{};
    return `<path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28} V${Н} H0 Z" fill="url(#рм-холм)"/>
      <path d="M0 ${y0-22} Q80 ${y0-50} 170 ${y0-30} Q260 ${y0-54} 336 ${y0-28}" stroke="#b6dc84" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M0 ${y0+8} Q168 ${y0-6} 336 ${y0+8} V${Н} H0 Z" fill="url(#рм-песок)"/>
      <g data-декор="1" opacity=".5">${Array.from({length:14},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${y0+20+((k*29)%Math.max(10,Н-y0-26))}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>
      ${о.ночь?`<rect x="0" y="${y0-54}" width="336" height="${Н-y0+54}" fill="#0a1430" opacity=".42"/>`:''}`; };
  const столб = (x,y,в) => `<rect x="${x-3}" y="${y-в}" width="6" height="${в}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".7"/><rect x="${x-5}" y="${y-в-4}" width="10" height="5" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7"/>`;
  const повод = (x1,y1,x2,y2) => `<path d="M${x1} ${y1} Q${(x1+x2)/2} ${Math.max(y1,y2)+10} ${x2} ${y2}" stroke="#d8c08a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
  const ореол = (cx,cy,rx,ry) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#ffd76a" stroke-width="2.4" stroke-dasharray="6 5">${анЛин('stroke-dashoffset','0;22','1.6s')}</ellipse>`;

  /* ================= КАДРЫ ================= */

  /* 1. Знакомство */
  function F1(s){
    const Н=310, М=Р(), вид=s.вид1||{}, к=s.кто1, оба=вид.ослик&&вид.сова, в=s.ответ1, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В Сиракузах новые лица. Мирто, дочь гончара, везёт на ослике амфоры к Архимеду. Ослика зовут <b>Прим</b>, а на крыше устроилась сова — её все зовут <b>Премудрая</b>. Познакомься с обоими.') +
      `<div class="pic">${свг(`
        ${М.небо(336,160,{облака:[[60,70,0.5,8],[196,84,0.45,-5]]})}
        ${земля(176,Н)}
        ${М.домик(258,236,1.15,{})}
        ${М.сова(296,150,0.72,{ветвь:true})}
        ${столб(180,238,50)}
        ${М.ослик(104,254,0.8,{поклажа:true})}
        ${повод(150,199,180,192)}
        ${М.девочка(38,262,0.62,{поза:к?'стоит':'машет'})}
        ${к==='ослик'?ореол(108,214,62,52):''}${к==='сова'?ореол(296,124,28,34):''}
        ${к==='ослик'?подпись(120,30,'ПРИшёл, ПРИвязан, ПРИлёг',ПРИ,12.5):''}
        ${к==='сова'?подпись(210,30,'ПРЕмудрая, ПРЕкрасная',ПРЕ,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask пара">${BTN(3,вид.ослик?'hit':'','Ослик Прим',"r908Кто('ослик')")}${BTN(4,вид.сова?'hit':'','Сова Премудрая',"r908Кто('сова')")}</div>` +
      (к==='ослик' ? A(6,'карт','<span class="метка">Ослик Прим</span><div class="текст">«Иа! Я всё делаю с приставкой <b>при-</b>: <b>при</b>шёл, <b>при</b>вязан, <b>при</b>лёг отдохнуть. Я всегда где-то рядом».</div>')
        : к==='сова' ? A(6,'карт','<span class="метка">Сова Премудрая</span><div class="текст">«Угу. Моя приставка — <b>пре-</b>. Я <b>пре</b>мудрая, то есть очень мудрая. И <b>пре</b>красная, разумеется».</div>')
        : СКАЗ('Начни','Нажми на ослика или на сову.')) +
      (!оба ? '' :
        ОТВЕТЫ('',['по значению приставки','на слух: как слышится, так и пишется'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Произнеси: «привязан», «премудрая». Приставки звучат одинаково. Как же выбрать букву?') :
          РАЗБОР(ок,['Верно: обе приставки безударные и звучат одинаково. Выбирать надо <b>по значению</b> — ему и научат Прим с Премудрой.',
            'На слух не получится: в безударном слоге <b>и</b> и <b>е</b> звучат одинаково. Выбирают <b>по значению</b>.'][в]))) +
      (ок ? ПРАВИЛО('Приставки <b>пре-</b> и <b>при-</b> безударные. Гласную в них выбирают <b>по значению</b> приставки.') : '');
  }

  /* 2. Пришёл и привязан */
  function F2(s){
    const Н=300, М=Р(), шаг=s.шаг2||0, в=s.ответ2, ок=в===0;
    const ox = шаг>=1 ? 150 : 40;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Мирто зовёт ослика к дому. Сначала он должен <b>прийти</b>, а потом его надо <b>привязать</b> к столбу, чтобы не убрёл. Помоги ей.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[70,44,0.6,8],[230,30,0.45,-5]]})}
        ${земля(168,Н)}
        ${М.домик(282,230,1.0,{})}
        ${столб(206,232,50)}
        <g>${шаг===1&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="-110 0" to="0 0" dur="1.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.6 0.4 1"/>`:''}${М.ослик(ox,250,0.78,{поклажа:true})}</g>
        ${шаг>=2?повод(196,197,206,188)+`<circle cx="206" cy="188" r="3" fill="#d8c08a" stroke="${ОБВОД}" stroke-width=".6"/>`+ореол(204,192,16,16):''}
        ${М.девочка(244,250,0.6,{влево:true,поза:шаг===0?'машет':'ведёт'})}
        ${шаг>=1?подпись(118,34,'ПРИшёл — приближение',ПРИ,12.5):''}
        ${шаг>=2?подпись(118,62,'ПРИвязан — присоединение',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      (шаг===0 ? `<div class="ask">${BTN(4,'','Привести ослика',"r908Шаг2()")}</div>` + СКАЗ('Начни','Ослик далеко. Пусть придёт.')
        : шаг===1 ? `<div class="ask">${BTN(4,'','Привязать ослика',"r908Шаг2()")}</div>` + СКАЗ('Пришёл','Ослик <b>при</b>шёл — приблизился. Теперь привяжи его.')
        : ОТВЕТЫ('',['присоединение: одно прикрепляют к другому','приближение: кто-то подходит ближе'],0,в,2) +
          (в==null ? СКАЗ('Вопрос','Привязать, приклеить, пришить, прибить. Что значит здесь приставка <b>при-</b>?') :
            РАЗБОР(ок,['Верно: ослика <b>при</b>вязали к столбу, заплатку <b>при</b>шили к рубахе — одно <b>присоединили</b> к другому.',
              'Приближение — это «прийти, приехать». А привязать, приклеить, пришить — значит <b>присоединить</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>При-</b> значит <b>приближение</b> (прийти, приехать, приплыть) или <b>присоединение</b> (привязать, приклеить, пришить).') : '');
  }

  /* 3. Приморский домик, дверь приоткрыта */
  function F3(s){
    const Н=300, М=Р(), дв=!!s.дв3, в=s.ответ3, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Домик гончара стоит у самого моря — он <b>приморский</b>. Прим устал и <b>прилёг</b> в тени. А Мирто хочет заглянуть в дом, но тихо, чтобы не разбудить отца. Как ей открыть дверь?') +
      `<div class="pic">${свг(`
        ${М.небо(336,110,{солнце:[44,34,10],облака:[[130,28,0.5,8]]})}
        ${М.море(92,78,336,{})}
        <path d="M0 170 Q168 156 336 170 V${Н} H0 Z" fill="url(#рм-песок)"/>
        <g data-декор="1" opacity=".5">${Array.from({length:12},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${188+((k*29)%100)}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>
        ${М.домик(236,244,1.3,{дверь:дв?0.35:0})}
        ${М.ослик(78,268,0.78,{поза:'лежит'})}
        ${М.девочка(166,256,0.6,{поза:'ведёт'})}
        ${подпись(236,130,'ПРИморский домик',ПРИ,12)}
        ${подпись(78,190,'ПРИлёг',ПРИ,12)}
        ${дв?подпись(236,Н-14,'дверь ПРИоткрыта — чуть-чуть',GREEN,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      (!дв ? `<div class="ask">${BTN(4,'','Приоткрыть дверь',"r908Дверь()")}</div>` + СКАЗ('Начни','Нажми — и дверь откроется на щёлочку.') :
        ОТВЕТЫ('',['открыть чуть-чуть, не до конца','распахнуть настежь'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Что значит «<b>при</b>открыть»?') :
          РАЗБОР(ок,['Верно: <b>при-</b> показывает <b>неполное действие</b>. Приоткрыть — не до конца, прилечь — ненадолго, присесть — на минутку.',
            'Настежь — это «открыть» или «распахнуть». А <b>при</b>открыть — лишь <b>чуть-чуть</b>: действие неполное.'][в]))) +
      (ок ? ПРАВИЛО('<b>При-</b> значит ещё <b>близость</b> (приморский, прибрежный, пригородный) и <b>неполное действие</b> (приоткрыть, прилечь, присесть, привстать).') : '');
  }

  /* 4. Четыре корзины */
  function F4(s){
    const Н=300, М=Р(), n=Math.min(s.кз4||0,КОРЗИНЫ.length), отв=s.отв4, все=n>=КОРЗИНЫ.length;
    const X=[48,128,208,288], с=КОРЗИНЫ[Math.min(n,КОРЗИНЫ.length-1)];
    const корзина=(j)=>{ const cx=X[j], слова=КОРЗИНЫ.slice(0,n).filter(w=>w.з===j);
      return `<g><path d="M${cx-34} 172 H${cx+34} L${cx+27} 214 H${cx-27} Z" fill="#c8a058" stroke="${ОБВОД}" stroke-width="1.1"/>
        ${[182,192,202].map(by=>`<line x1="${cx-32}" y1="${by}" x2="${cx+32}" y2="${by}" stroke="#7a5a2a" stroke-width=".8" opacity=".8"/>`).join('')}
        ${[-20,-10,0,10,20].map(bx=>`<line x1="${cx+bx}" y1="172" x2="${cx+bx*0.8}" y2="214" stroke="#7a5a2a" stroke-width=".8" opacity=".8"/>`).join('')}
        <rect x="${cx-36}" y="168" width="72" height="6" rx="3" fill="#a8803c" stroke="${ОБВОД}" stroke-width=".8"/>
        <ellipse cx="${cx}" cy="216" rx="30" ry="3" fill="#231a12" opacity=".25"/>
        ${j===3?т(cx,230,'неполное',9.5,ЧЕРНИЛА,true)+т(cx,241,'действие',9.5,ЧЕРНИЛА,true):т(cx,230,ЗНАЧ[j],9.5,ЧЕРНИЛА,true)}
        ${слова.map((w,i)=>`<g filter="url(#c908-тень)"><rect x="${cx-38}" y="${146-i*20}" width="76" height="17" rx="8.5" fill="#fffaf0" stroke="#c8701a" stroke-width="1.1"/></g>${т(cx,158-i*20,w.сл,10,ЧЕРНИЛА,true)}`).join('')}</g>`; };
    return ЖУРНАЛ(s) +
      ЗАДАЧА('У Прима четыре корзины — по одной на каждое значение приставки <b>при-</b>. Мирто достаёт слова, а ты скажи, в какую корзину их класть.') +
      `<div class="pic">${свг(`
        <rect width="336" height="${Н}" fill="url(#рм-песок)"/>
        <g data-декор="1" opacity=".5">${Array.from({length:16},(_,k)=>`<ellipse cx="${(k*61+20)%336}" cy="${60+((k*47)%230)}" rx="${5+k%4}" ry="1.2" fill="#b89a62"/>`).join('')}</g>
        ${[0,1,2,3].map(корзина).join('')}
        ${все ? подпись(168,38,'все корзины полны',GREEN,13) : плитки(168,26,с.сл,{})}
        ${М.ослик(150,Н-4,0.46,{})}${М.девочка(210,Н-4,0.42,{поза:все?'машет':'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="падежи" style="grid-template-columns:repeat(2,minmax(0,1fr))">${ЗНАЧ.map((z,j)=>BTN(3+j,отв&&!отв.ок&&отв.j===j?'мимо':'',z,'r908Корзина('+j+')')).join('')}</div>`) +
      (все ? РАЗБОР(true,'Шесть слов разложены. У приставки <b>при-</b> четыре значения: приближение, присоединение, близость и неполное действие.')
        : отв ? (отв.ок ? РАЗБОР(true,'<b>'+КОРЗИНЫ[отв.i].сл+'</b> — '+КОРЗИНЫ[отв.i].поч+': '+ЗНАЧ[КОРЗИНЫ[отв.i].з]+'. Следующее слово — на плитках.')
                        : РАЗБОР(false,'Не в ту корзину. «'+с.сл[0].toUpperCase()+с.сл.slice(1)+'» — '+с.поч+'.'))
        : СКАЗ('Подсказка','Объясни слово своими словами: «приплыть — значит плыть и…»')) +
      (все ? ПРАВИЛО('<b>При-</b>: <b>ближе</b> (приплыть), <b>плюс</b> (пришить), <b>рядом</b> (прибрежный), <b>чуть-чуть</b> (присесть).') : '');
  }

  /* 5. Премудрая: пре- = очень */
  function F5(s){
    const Н=310, М=Р(), в=s.ответ5, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Ночью сова садится на старую колонну. Мирто шепчет ослику: «Говорят, она <b>премудрая</b>. И перья у неё <b>прекрасные</b>». Что добавляет к слову приставка <b>пре-</b>?') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{ночь:true,луна:[284,52]})}
        ${земля(232,Н,{ночь:true})}
        <rect x="224" y="136" width="24" height="${Н-156}" fill="url(#рм-колонна)" stroke="${ОБВОД}" stroke-width=".9"/>
        ${[230,236,242].map(x=>`<line x1="${x}" y1="140" x2="${x}" y2="${Н-24}" stroke="#a89a7c" stroke-width=".6" opacity=".7"/>`).join('')}
        <rect x="216" y="126" width="40" height="10" rx="2" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
        <rect x="218" y="${Н-24}" width="36" height="8" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
        <rect x="216" y="126" width="40" height="${Н-142}" fill="#0a1430" opacity=".25"/>
        <circle cx="236" cy="92" r="44" fill="url(#рм-лунсвет)" opacity=".7"/>
        ${М.сова(236,127,1.2,{ветвь:true})}
        ${плитки(104,40,'премудрая',{})}
        ${подпись(100,92,ок?'пре- = очень':'пре- = ?',ок?GREEN:ПРЕ,13)}
        ${М.девочка(52,Н-10,0.6,{поза:'стоит'})}${М.ослик(134,Н-8,0.64,{})}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['очень мудрая','немного мудрая'],0,в,5) +
      (в==null ? СКАЗ('Вопрос','Премудрая — это какая?') :
        РАЗБОР(ок,['Верно: <b>пре-</b> можно заменить словом <b>«очень»</b>. Премудрая — очень мудрая, прекрасный — очень красивый.',
          '«Немного» — это про при- (приоткрыть). А <b>пре-</b> усиливает: премудрая — <b>очень</b> мудрая.'][в])) +
      (ок ? ПРАВИЛО('<b>Пре-</b> значит <b>«очень»</b>: премудрый, прекрасный, предобрый, преспокойный. Проверка: замени приставку словом «очень».') : '');
  }

  /* 6. Преграда: пре- = пере- */
  function F6(s){
    const Н=300, М=Р(), в=s.ответ6, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Утром дорогу <b>преградило</b> упавшее дерево. Прим упёрся: ни шагу! А сова просто перелетела <b>преграду</b>. «Прислушайся, — говорит она, — в слове „преграда“ прячется другая приставка».') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{солнце:[296,34,10],облака:[[70,40,0.55,8]]})}
        ${земля(168,Н)}
        <g transform="rotate(-8 200 232)">
          <rect x="150" y="220" width="124" height="20" rx="9" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.1"/>
          <ellipse cx="274" cy="230" rx="5" ry="10" fill="#e8c890" stroke="${ОБВОД}" stroke-width=".9"/><ellipse cx="274" cy="230" rx="2.4" ry="5" fill="none" stroke="#a87a44" stroke-width=".8"/>
          <path d="M176 220 q-6 -20 -18 -26 M206 220 q4 -18 16 -22" stroke="#6a4020" stroke-width="4" fill="none" stroke-linecap="round"/>
          ${[[154,190],[162,198],[224,196],[230,204]].map(([lx,ly],k)=>`<ellipse cx="${lx}" cy="${ly}" rx="7" ry="3" fill="${k%2?'#6a9a4a':'#4f8a44'}" transform="rotate(${k%2?-30:20} ${lx} ${ly})"/>`).join('')}
        </g>
        <path d="M232 250 l10 -22 l16 -4 l12 14 l-4 14 Z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M160 256 l6 -14 l14 -2 l8 10 l-2 8 Z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1"/>
        ${М.ослик(88,256,0.76,{поза:'упрямится',поклажа:true})}
        ${М.девочка(30,260,0.56,{поза:'стоит',рот:'о'})}
        <g${ДВИЖ?'':' transform="translate(206 112)"'}>${ДВИЖ?`<animateMotion path="M110 150 Q200 60 300 160 Q200 60 110 150" dur="5s" repeatCount="indefinite"/>`:''}${М.сова(0,0,0.66,{летит:true})}</g>
        ${плитки(96,36,'преграда',{})}
        ${ок?подпись(168,Н-12,'преградить = перегородить',GREEN,12.5):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['пере-: прервать = перервать','при-: прервать = прирвать'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Какой приставкой можно заменить <b>пре-</b> в словах «преградить», «прервать»?') :
        РАЗБОР(ок,['Верно: <b>пре-</b> здесь близка к <b>пере-</b>. Преградить — перегородить, прервать — перервать, преступить — переступить.',
          'Слова «прирвать» нет. А вот <b>пере</b>рвать — есть: <b>пре-</b> здесь близка к <b>пере-</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Пре-</b> бывает близка к <b>пере-</b>: преградить (перегородить), прервать (перервать), преступить (переступить). Проверка: замени на «пере-».') : '');
  }

  /* 7. Дорога к Архимеду */
  function F7(s){
    const Н=300, М=Р(), n=Math.min(s.дор7||0,ДОРОГА.length), отв=s.отв7, все=n>=ДОРОГА.length;
    const P=[[34,274],[96,240],[160,264],[222,216],[160,170],[226,130],[276,104]];
    const путь=`M${P[0][0]} ${P[0][1]} Q64 236 ${P[1][0]} ${P[1][1]} Q128 270 ${P[2][0]} ${P[2][1]} Q214 256 ${P[3][0]} ${P[3][1]} Q214 176 ${P[4][0]} ${P[4][1]} Q160 130 ${P[5][0]} ${P[5][1]} Q256 126 ${P[6][0]} ${P[6][1]}`;
    const с=ДОРОГА[Math.min(n,ДОРОГА.length-1)], [ox,oy]=P[n];
    const шаг=отв&&отв.ок&&n>0&&ДВИЖ ? `<animateTransform attributeName="transform" type="translate" from="${P[n-1][0]-ox} ${P[n-1][1]-oy}" to="0 0" dur="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.6 0.4 1"/>` : '';
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Пора в путь — к дому Архимеда. На дороге шесть придорожных камней, на каждом слово. Скажешь верно, <b>при-</b> или <b>пре-</b>, — Прим сделает шаг. Ошибёшься — упрётся.') +
      `<div class="pic">${свг(`
        <rect width="336" height="${Н}" fill="#cfe0a0"/>
        ${[[60,120,46,22],[286,230,40,26],[110,190,30,14],[300,160,26,18]].map(([cx,cy,rx,ry])=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#a8c878" opacity=".7"/>`).join('')}
        <path d="M0 58 Q60 50 96 78 Q60 96 0 92 Z" fill="url(#рм-море)" opacity=".9"/><path d="M0 92 Q60 96 96 78" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
        <path d="${путь}" stroke="#a88a52" stroke-width="17" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${путь}" stroke="#f0dcae" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${путь}" stroke="#c8a870" stroke-width="1.2" fill="none" stroke-dasharray="5 6"/>
        ${[[70,150],[250,190],[120,110]].map(([x,y])=>М.сосна(x,y,0.26)).join('')}
        ${М.домик(296,100,0.5,{дверь:все?1:0})}
        ${М.архимед(244,100,0.3,{поза:'указывает'})}
        ${P.slice(1).map(([x,y],i)=>{ const был=i<n, сейчас=i===n;
          return `<circle cx="${x}" cy="${y}" r="9" fill="${был?'#ffd76a':'#d8d0c0'}" stroke="${ОБВОД}" stroke-width="1.1">${сейчас&&!все?анЛин('r','8;11;8','1.4s'):''}</circle>${т(x,y+4,был?'✓':(i+1),10.5,ЧЕРНИЛА,true)}`; }).join('')}
        ${М.сова(30,134,0.5,{ветвь:true})}
        <g transform="translate(${ox} ${oy+2})"><g>${шаг}${М.ослик(0,0,0.42,{поза:отв&&!отв.ок?'упрямится':'стоит',поклажа:true})}</g></g>
        ${все ? подпись(118,38,'Прим у дома Архимеда!',GREEN,12.5) : плитки(118,26,с.сл.slice(0,2)+'?'+с.сл.slice(3),{})}
        ${подпись(270,Н-12,'шагов: '+n+' из 6',все?GREEN:GOLD,11.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask пара">${['и','е'].map((б,к)=>BTN(4+к,отв&&!отв.ок&&отв.к===б?'miss':'','<span style="font-size:22px;font-family:Georgia,serif">пр<b>'+б+'</b>-</span>',"r908Дорога('"+б+"')")).join('')}</div>`) +
      (все ? РАЗБОР(true,'Дошли! <b>При</b>ехать, <b>пре</b>красный, <b>при</b>шить, <b>пре</b>рвать, <b>при</b>сесть, <b>пре</b>добрый. Архимед <b>при</b>ветливо машет с порога.')
        : отв ? (отв.ок ? РАЗБОР(true,'<b>'+ДОРОГА[отв.i].сл+'</b>: '+ДОРОГА[отв.i].поч+'. Прим шагает к следующему камню.')
                        : РАЗБОР(false,'Прим упёрся. Подумай о значении: '+с.поч+' — нужна <b>пр'+с.г+'-</b>.'))
        : СКАЗ('Подсказка','Проверь по очереди: приближение, присоединение, близость, чуть-чуть? Или «очень» и «пере-»?')) +
      (все ? ПРАВИЛО('Сначала пойми <b>значение</b>. «Ближе, плюс, рядом, чуть-чуть» — <b>при-</b>. «Очень» или «пере-» — <b>пре-</b>.') : '');
  }

  /* 8. Близнецы */
  function F8(s){
    const Н=270, М=Р(), n=Math.min(s.бл8||0,БЛИЗНЕЦЫ.length), отв=s.отв8, все=n>=БЛИЗНЕЦЫ.length;
    const б=БЛИЗНЕЦЫ[Math.min(n,БЛИЗНЕЦЫ.length-1)];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('У Архимеда сова разворачивает свиток: «Есть слова-близнецы. Звучат одинаково, а приставки разные — потому что разный смысл». Выбери букву для каждого.') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{облака:[[40,30,0.45,5],[304,44,0.4,-4]]})}
        <path d="M0 232 Q168 220 336 232 V${Н} H0 Z" fill="url(#рм-песок)"/>
        ${М.свиток(82,34,208,170)}
        ${БЛИЗНЕЦЫ.map((x,i)=>{ const y=70+i*38, есть=i<n, сейчас=i===n&&!все;
          return `<text x="186" y="${y}" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${есть||сейчас?ЧЕРНИЛА:'#b8a27a'}" font-family="Georgia,serif">${x.до}<tspan fill="${есть?(x.г==='и'?'#c8601a':'#6a4ac8'):'#a0200e'}" font-size="${есть?12.5:15}">${есть?x.г:'?'}</tspan>${esc(x.после)}</text>
            ${i<3?`<line x1="100" y1="${y+14}" x2="272" y2="${y+14}" stroke="#d8c498" stroke-width=".8"/>`:''}`; }).join('')}
        ${столб(40,236,96)}${М.сова(40,138,0.8,{ветвь:true})}
        ${М.ослик(292,Н-6,0.46,{влево:true})}
        ${подпись(140,Н-12,все?'близнецы различены: 4 из 4':'различено: '+n+' из 4',все?GREEN:GOLD,11.5)}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : A(3,'карт','<span class="метка">Строка '+(n+1)+' из 4</span><div class="текст" style="font-family:Georgia,serif">'+б.до+'<b style="border-bottom:2px solid '+GOLD+';padding:0 4px">?</b>'+б.после+'</div>') +
        `<div class="ask пара">${['и','е'].map((бк,к)=>BTN(4+к,отв&&!отв.ок&&отв.к===бк?'miss':'','<span style="font-size:24px;font-family:Georgia,serif">'+бк+'</span>',"r908Близнец('"+бк+"')")).join('')}</div>`) +
      (все ? РАЗБОР(true,'<b>При</b>быть (приехать) — <b>пре</b>бывать (находиться). <b>При</b>творить дверь (прикрыть) — <b>пре</b>творить мечту в жизнь (превратить в дело).')
        : отв ? (отв.ок ? РАЗБОР(true,'Верно: '+БЛИЗНЕЦЫ[отв.i].поч+'.')
                        : РАЗБОР(false,'Вдумайся в смысл: '+б.поч+'. Нужна <b>'+б.г+'</b>.'))
        : СКАЗ('Подсказка','Приехать куда-то или находиться где-то? Прикрыть или превратить?')) +
      (все ? ПРАВИЛО('Слова-близнецы различай <b>по смыслу</b>: прибыть на место — пребывать на месте; притворить дверь — претворить в жизнь.') : '');
  }

  /* 9. Слова-упрямцы */
  function F9(s){
    const Н=290, М=Р(), в=s.ответ9, ок=в===0;
    const табл=(cx,y,t0,ц)=>`<g filter="url(#c908-тень)"><rect x="${cx-66}" y="${y-17}" width="132" height="24" rx="12" fill="#fffaf0" stroke="${ц}" stroke-width="1.4"/></g>${т(cx,y,t0,13,ЧЕРНИЛА,true)}`;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Иногда Прим упрямится — и слова тоже. В словах <b>привет, природа, препятствие, преследовать</b> значение приставки уже не объяснить. «Тут даже я заглядываю в свиток», — признаётся сова.') +
      `<div class="pic">${свг(`
        ${М.небо(336,150,{облака:[[300,120,0.4,-4]]})}
        ${земля(176,Н)}
        ${табл(90,36,'привет','#c8701a')}${табл(246,36,'природа','#c8701a')}
        ${табл(90,68,'препятствие','#6a4ac8')}${табл(246,68,'преследовать','#6a4ac8')}
        ${М.ослик(110,258,0.78,{поза:'упрямится'})}
        ${М.девочка(232,258,0.6,{влево:true,поза:'ведёт'})}
        ${повод(160,203,210,217)}
        ${столб(298,252,70)}${М.сова(298,180,0.66,{})}
        ${ок?подпись(168,Н-12,'не объяснить — загляни в словарь',GREEN,12):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('',['проверить по словарю и запомнить','писать при- — она встречается чаще'],0,в,9) +
      (в==null ? СКАЗ('Вопрос','Что делать, если значение приставки не определить?') :
        РАЗБОР(ок,['Верно: такие слова проверяют <b>по словарю</b> и запоминают — привет, природа, причина; препятствие, преследовать.',
          'Угадывать нельзя: «препятствие» и «преследовать» пишутся с <b>пре-</b>. Такие слова проверяют <b>по словарю</b>.'][в])) +
      (ок ? ПРАВИЛО('Если значение приставки неясно, слово <b>проверяют по словарю</b>: привет, природа, причина, приключение; препятствие, преследовать.') : '');
  }

  /* 10. Итог */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Амфоры доставлены. Архимед угощает Прима морковкой, сова дремлет на столбе, а Мирто считает: «Четыре значения у при-, два у пре-. Всего шесть — и ни одного на слух». — «Преотлично!» — смеётся Архимед.'
        : 'Прим ещё в пути — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${М.небо(336,130,{закат:true,солнце:[60,100,13],облака:[[240,36,0.6,-6]]})}
        ${М.море(112,40,336,{дорожка:60})}
        <path d="M0 152 Q168 140 336 152 V${Н} H0 Z" fill="url(#рм-песок)"/>
        <rect x="0" y="140" width="336" height="${Н-140}" fill="#ff9a50" opacity=".12"/>
        ${М.архимед(52,244,0.62,{поза:'указывает'})}
        ${М.девочка(116,246,0.58,{поза:'машет'})}
        ${М.ослик(206,248,0.72,{поклажа:true})}
        ${столб(296,246,70)}${М.сова(296,174,0.7,{ветвь:true})}
        ${[['при-: ближе, плюс, рядом, чуть-чуть',ПРИ],['пре- = очень: прекрасный, премудрый',ПРЕ],['пре- = пере-: прервать, преградить',BLUE],['не объяснить — загляни в словарь',GREEN]].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.45).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,268+i*22,t0,ц,10.5)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Приставки <b>пре-</b> и <b>при-</b> выбирают по значению. <b>При-</b>: приближение (прийти), присоединение (привязать), близость (приморский), неполное действие (приоткрыть). <b>Пре-</b>: «очень» (прекрасный) и близость к «пере-» (прервать). Слова-близнецы различают по смыслу: прибыть — пребывать. Если значение неясно — словарь.') +
      ПРАВИЛО('<b>Прим — всегда рядом: при-. Премудрая — очень и пере-: пре-.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Пр…ехать — какая приставка?', варианты:[{т:'при-',ок:true},{т:'пре-',ок:false}], разбор:'Приехать — приближение.' },
    { вопрос:'Пр…красный — какая приставка?', варианты:[{т:'при-',ок:false},{т:'пре-',ок:true}], разбор:'Прекрасный — очень красивый.' },
    { вопрос:'Пр…клеить — какая приставка?', варианты:[{т:'при-',ок:true},{т:'пре-',ок:false}], разбор:'Приклеить — присоединение.' },
    { вопрос:'Пр…градить — какая приставка?', варианты:[{т:'при-',ок:false},{т:'пре-',ок:true}], разбор:'Преградить — перегородить.' },
    { вопрос:'Пр…открыть — какая приставка?', варианты:[{т:'при-',ок:true},{т:'пре-',ок:false}], разбор:'Приоткрыть — неполное действие.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r908Reset()")}</div>` +
        ПРАВИЛО('<b>Прим — всегда рядом: при-. Премудрая — очень и пере-: пре-.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r908Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'При- или пре-', задания:[
    {q:'пр…бежать', в:0, варианты:['при-','пре-'], раз:'Прибежать — приближение.'},
    {q:'пр…мудрый', в:1, варианты:['при-','пре-'], раз:'Премудрый — очень мудрый.'},
    {q:'пр…вязать', в:0, варианты:['при-','пре-'], раз:'Привязать — присоединение.'},
    {q:'пр…рвать', в:1, варианты:['при-','пре-'], раз:'Прервать — перервать.'},
    {q:'пр…школьный', в:0, варианты:['при-','пре-'], раз:'Пришкольный — рядом со школой.'},
    {q:'пр…добрый', в:1, варианты:['при-','пре-'], раз:'Предобрый — очень добрый.'}
  ]};
  const Т2 = { имя:'Что значит при-', задания:[
    {q:'приплыть', в:0, варианты:['приближение','близость'], раз:'Плыть и приблизиться.'},
    {q:'пришить', в:0, варианты:['присоединение','неполное действие'], раз:'Шить и присоединить.'},
    {q:'приморский', в:1, варианты:['приближение','близость'], раз:'Рядом с морем.'},
    {q:'прилечь', в:0, варианты:['неполное действие','присоединение'], раз:'Лечь ненадолго.'},
    {q:'прибить', в:1, варианты:['близость','присоединение'], раз:'Бить и прикрепить.'}
  ]};
  const Т3 = { имя:'Что значит пре-', задания:[
    {q:'прекрасный', в:0, варианты:['очень','пере-'], раз:'Очень красивый.'},
    {q:'преградить', в:1, варианты:['очень','пере-'], раз:'Перегородить.'},
    {q:'премилый', в:0, варианты:['очень','пере-'], раз:'Очень милый.'},
    {q:'прервать', в:1, варианты:['очень','пере-'], раз:'Перервать.'},
    {q:'преступить (закон)', в:1, варианты:['очень','пере-'], раз:'Переступить.'}
  ]};
  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask${номер===2?'':' пара'}">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r908T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r908TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L908 = {
    id: ID,
    title: 'Приставки пре- и при-',
    ico: '🦉',
    src: 'Русский язык · 6 класс · Словообразование. Орфография', subj: 'rus',
    explain: [
      'Знакомство: ослик Прим (при-) и сова Премудрая (пре-).',
      'При-: приближение и присоединение — пришёл, привязан.',
      'При-: близость и неполное действие — приморский, приоткрыть.',
      'Четыре корзины значений при-.',
      'Пре- = очень: премудрая, прекрасный.',
      'Пре- = пере-: преграда, прервать.',
      'Дорога к Архимеду: шесть слов, при- или пре-.',
      'Слова-близнецы: прибыть — пребывать.',
      'Слова-упрямцы проверяем по словарю.',
      'Итог: при- и пре- выбирают по значению.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: при- или пре-.',
      'Тренажёр 2: что значит при-.',
      'Тренажёр 3: что значит пре-.'
    ],
    check: {
      q: 'Что значит приставка пре- в слове «прекрасный»?',
      choices: ['приближение','очень','неполное действие'],
      ans: 1,
      exp: 'Прекрасный — очень красивый.'
    },
    tasks: [
      { q:'Сколько значений у приставки при-?', kind:'unit', ans:4, tol:0,
        hints:['Приближение, присоединение, близость, неполное действие.'], sol:'4.' },
      { q:'Пр…морский — пишется', kind:'choice', choices:['при-','пре-'], ans:0, tol:0,
        hints:['Рядом с морем.'], sol:'Приморский.' },
      { q:'Пр…рвать разговор — пишется', kind:'choice', choices:['при-','пре-'], ans:1, tol:0,
        hints:['Перервать.'], sol:'Прервать.' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.ослик){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L908.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s); else if(f===2) сцена=F2(s); else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s); else if(f===5) сцена=F5(s); else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s); else if(f===8) сцена=F8(s); else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s); else if(f===11) сцена=F11(s);
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1); else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);
    const ЗАГОЛОВКИ={1:'Прим и Премудрая',2:'Пришёл и привязан',3:'Приморский домик',4:'Четыре корзины',5:'Премудрая сова',
      6:'Преграда',7:'Дорога к Архимеду',8:'Слова-близнецы',9:'Слова-упрямцы',10:'Преотлично!',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l908" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Приставки пре- и при-'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r908Кто=(к)=>{ const s=S(); s.кто1=к; const в=Object.assign({},s.вид1||{}); в[к]=true; s.вид1=в; chRender(0); };
  window.r908Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r908Шаг2=()=>{ const s=S(); s.шаг2=Math.min(2,(s.шаг2||0)+1); chRender(0); };
  window.r908Дверь=()=>{ const s=S(); s.дв3=true; chRender(0); };
  window.r908Корзина=(j)=>{ const s=S(); const n=s.кз4||0; if(n>=КОРЗИНЫ.length) return;
    if(КОРЗИНЫ[n].з===j){ s.кз4=n+1; s.отв4={i:n,ок:true}; if(n+1>=КОРЗИНЫ.length) s.дело_корзины=true; }
    else s.отв4={i:n,ок:false,j:j};
    chRender(0); };
  window.r908Дорога=(б)=>{ const s=S(); const n=s.дор7||0; if(n>=ДОРОГА.length) return;
    if(ДОРОГА[n].г===б){ s.дор7=n+1; s.отв7={i:n,ок:true}; if(n+1>=ДОРОГА.length) s.дело_дорога=true; }
    else s.отв7={i:n,ок:false,к:б};
    chRender(0); };
  window.r908Близнец=(б)=>{ const s=S(); const n=s.бл8||0; if(n>=БЛИЗНЕЦЫ.length) return;
    if(БЛИЗНЕЦЫ[n].г===б){ s.бл8=n+1; s.отв8={i:n,ок:true}; if(n+1>=БЛИЗНЕЦЫ.length) s.дело_близнецы=true; }
    else s.отв8={i:n,ок:false,к:б};
    chRender(0); };
  window.r908Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r908Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r908T=(ключ,вариант)=>{ const s=S(); if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const з=набор.задания[(s[ключ+'Шаг']||0)%набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0); };
  window.r908TNext=(ключ)=>{ const s=S(); const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length; s[ключ+'Ответ']=null; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=L908; else arr.push(L908); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU908={render:render, L:L908};
})();
