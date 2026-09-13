/* Уроки 24 и 44 · v3. Выше 181/190: своя сцена и хореография на кадр, живой язык у доски. */
(function(){
  if(window.__m2444v3css) return; window.__m2444v3css=1;
  const st=document.createElement('style');
  st.textContent=
    '#lvis .q24,#lvis .q44{width:100%;max-width:352px;margin:0 auto}'+
    '#lvis .q24 .wk-big,#lvis .q44 .wk-big{font-size:24px}'+
    '#lvis .q24 .wk-sml,#lvis .q44 .wk-sml{font-size:16px;line-height:1.45}'+
    '@keyframes qPop{0%{transform:scale(.45);opacity:0}72%{transform:scale(1.07)}100%{transform:none;opacity:1}}'+
    '@keyframes qRise{0%{transform:translateY(14px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qSlide{0%{transform:translateX(-20px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qSlideR{0%{transform:translateX(20px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qDrop{0%{transform:translateY(-18px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qBeak{0%{transform:scaleX(.12);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qWalk{0%{transform:translateX(0)}100%{transform:translateX(88px)}}'+
    '@keyframes qFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'+
    '@keyframes qFillY{from{transform:scaleY(0)}to{transform:scaleY(1)}}'+
    '@keyframes qGlow{0%,100%{opacity:.4}50%{opacity:1}}'+
    '@keyframes qFlip{0%{transform:rotateY(90deg);opacity:0}100%{transform:rotateY(0);opacity:1}}'+
    '@keyframes qLink{0%{transform:translateX(-16px)}100%{transform:none}}'+
    '@keyframes qLinkR{0%{transform:translateX(16px)}100%{transform:none}}'+
    '@keyframes qWag{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}'+
    '@keyframes qCoin{0%{transform:translateY(0)}40%{transform:translateY(-14px)}100%{transform:translateY(-6px)}}'+
    '@keyframes qPeel{0%{transform:translateY(-12px) rotate(-8deg);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qSlice{0%{transform:rotate(-18deg) translate(-6px,-8px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qPan{0%{transform:rotate(-4deg)}100%{transform:rotate(0)}}'+
    '#lvis .qPop{transform-box:fill-box;transform-origin:center;animation:qPop .5s ease both}'+
    '#lvis .qRise{animation:qRise .5s ease both}'+
    '#lvis .qSlide{animation:qSlide .5s ease both}'+
    '#lvis .qSlideR{animation:qSlideR .5s ease both}'+
    '#lvis .qDrop{animation:qDrop .48s ease both}'+
    '#lvis .qBeak{transform-origin:12% 50%;animation:qBeak .75s ease both}'+
    '#lvis .qWalk{animation:qWalk 1.25s ease forwards}'+
    '#lvis .qFill{transform-origin:left center;animation:qFill .85s ease both}'+
    '#lvis .qFillY{transform-origin:center bottom;animation:qFillY .8s ease both}'+
    '#lvis .qGlow{animation:qGlow 1.7s ease infinite}'+
    '#lvis .qFlip{transform-origin:center;animation:qFlip .65s ease both}'+
    '#lvis .qLink{animation:qLink .55s ease both}'+
    '#lvis .qLinkR{animation:qLinkR .55s ease both}'+
    '#lvis .qWag{transform-box:fill-box;transform-origin:center;animation:qWag 1.4s ease-in-out infinite}'+
    '#lvis .qCoin{animation:qCoin .7s ease both}'+
    '#lvis .qPeel{transform-box:fill-box;transform-origin:top center;animation:qPeel .6s ease both}'+
    '#lvis .qSlice{transform-box:fill-box;transform-origin:0 0;animation:qSlice .7s ease both}'+
    '#lvis .qPan{transform-box:fill-box;transform-origin:center;animation:qPan .6s ease both}'+
    '#lvis .q24[data-f="1"] .qBeak{animation-duration:.9s}'+
    '#lvis .q24[data-f="2"] .qRise{animation-duration:.55s}'+
    '#lvis .q24[data-f="3"] .qSlide{animation-duration:.6s}'+
    '#lvis .q24[data-f="4"] .qDrop{animation-duration:.55s}'+
    '#lvis .q24[data-f="5"] .qLink{animation-duration:.7s}'+
    '#lvis .q24[data-f="6"] .qPop{animation-duration:.58s}'+
    '#lvis .q24[data-f="7"] .qFlip{animation-duration:.8s}'+
    '#lvis .q24[data-f="8"] .qRise{animation-duration:.62s}'+
    '#lvis .q24[data-f="9"] .qWalk{animation-duration:1.35s}'+
    '#lvis .q24[data-f="10"] .qFill{animation-duration:.9s}'+
    '#lvis .q24[data-f="11"] .qPop{animation-duration:.48s}'+
    '#lvis .q24[data-f="12"] .qPop{animation-duration:.52s}'+
    '#lvis .q24[data-f="13"] .qFillY{animation-duration:1s}'+
    '#lvis .q24[data-f="14"] .qDrop{animation-duration:.5s}'+
    '#lvis .q24[data-f="15"] .qPan{animation-duration:.7s}'+
    '#lvis .q24[data-f="16"] .qPop{animation-duration:.45s}'+
    '#lvis .q44[data-f="1"] .qGlow{animation-duration:1.5s}'+
    '#lvis .q44[data-f="2"] .qPop{animation-duration:.55s}'+
    '#lvis .q44[data-f="3"] .qFill{animation-duration:1s}'+
    '#lvis .q44[data-f="4"] .qSlice{animation-duration:.75s}'+
    '#lvis .q44[data-f="5"] .qCoin{animation-duration:.8s}'+
    '#lvis .q44[data-f="6"] .qSlide{animation-duration:.55s}'+
    '#lvis .q44[data-f="7"] .qDrop{animation-duration:.5s}'+
    '#lvis .q44[data-f="8"] .qRise{animation-duration:.55s}'+
    '#lvis .q44[data-f="9"] .qPop{animation-duration:.5s}'+
    '#lvis .q44[data-f="10"] .qPeel{animation-duration:.65s}'+
    '#lvis .q44[data-f="11"] .qRise{animation-duration:.58s}'+
    '#lvis .q44[data-f="12"] .qRise{animation-duration:.5s}'+
    '#lvis .q44[data-f="13"] .qFill{animation-duration:.9s}'+
    '#lvis .q44[data-f="14"] .qRise{animation-duration:.55s}'+
    '#lvis .q44[data-f="15"] .qPop{animation-duration:.5s}'+
    '#lvis .q44[data-f="16"] .qPop{animation-duration:.45s}'+
    '@media (prefers-reduced-motion:reduce){'+
      '#lvis .qPop,#lvis .qRise,#lvis .qSlide,#lvis .qSlideR,#lvis .qDrop,#lvis .qBeak,#lvis .qWalk,'+
      '#lvis .qFill,#lvis .qFillY,#lvis .qGlow,#lvis .qFlip,#lvis .qLink,#lvis .qLinkR,#lvis .qWag,'+
      '#lvis .qCoin,#lvis .qPeel,#lvis .qSlice,#lvis .qPan{animation:none!important}}';
  document.head.appendChild(st);
})();

/* ===================== 24 · Цепочки сравнений ===================== */
(function(){
  const L24={
    id:24, title:'Цепочки сравнений', ico:'📏',
    src:'Математика · 5 класс · Сравнение и неравенства', subj:'math',
    explain:[
      'Смотри на две кучки яблок. Слева пять, справа три. Сравнить — не угадать «какая красивее», а сказать, какая больше. У знака есть клювик, как у птицы: он всегда открывается на большую кучку. Жми «открыть клювик» — сам повернётся к пятёрке.',
      'Три знака — три фразы. 5 > 3 читаем «пять больше трёх». 3 < 5 — то же самое с другого конца: «три меньше пяти». 5 = 5 — когда кучки одинаковые. Жми знак внизу — услышишь, как его читают вслух.',
      'Натуральные числа сначала сравнивают по длине записи. У 100 три цифры, у 99 две. Три окошка против двух — и неважно, что девятки громкие. Жми «посчитать окошки»: 100 больше 99 именно поэтому.',
      'Если цифр поровну — идём слева направо, как читаем. У 47 и 42 десятки одинаковые: по четыре. Тогда единицы: семь больше двух. Старший разряд решает раньше младшего. Жми «сравнить единицы».',
      'Если А выше Б, а Б выше В — А выше В. Это не новая мысль, это склейка двух звеньев. Жми «склеить» — два куска станут одной цепочкой.',
      'Цепочку пишем в один ряд: А > Б > В > Г. Знаки смотрят в одну сторону. Кто слева — самый высокий. Кто справа — самый низкий. Как очередь по росту: первый в ряду выше всех.',
      'Ту же очередь можно прочитать с другого конца. Переверни всех вместе со знаками — получится Г < В < Б < А. Это не другое сравнение: тот же порядок, только шагаем справа налево. Жми «перевернуть».',
      'А вот если А выше Б и В тоже выше Б — про А и В мы ничего не сказали. Оба выше Б, и всё. А может быть выше В, может ниже. Не хватает звена. Жми ответ: только «не знаем».',
      'На луче сравнение видно глазом. Ноль слева, числа бегут вправо. Кто правее — тот больше. Семёрка стоит правее тройки, поэтому 7 > 3. Жми «пройти» — шарик дойдёт до семёрки.',
      'Двойное неравенство — это коридор. 3 < x < 7 значит: x правее тройки и левее семёрки сразу. Два условия, одна запись. x не выходит ни в дверь «3», ни в дверь «7». Жми «открыть коридор».',
      'Если x — натуральное и 3 < x < 7, в коридоре живут только 4, 5 и 6. Три жильца. 3 и 7 стоят на пороге и внутрь не входят: знаки строгие. Жми на число — комната зажжётся.',
      'Знак ≥ читается «не меньше»: больше или столько же. 5 ≥ 5 — правда. 5 > 5 — ложь. Чёрточка под знаком пускает равенство. Не путай «не меньше» с «больше». Жми «проверить».',
      'Отрицательные живут левее нуля, как холод на термометре. Поэтому −5 < 0 < 3. Из двух отрицательных меньше то, что дальше от нуля: −7 левее −3, значит −7 < −3. Модуль больше — само число меньше. Жми «расставить».',
      'Величины сравнивают в одной единице. 5 см 3 мм — это 53 мм. 5 см 4 мм — 54 мм. 54 > 53, второй отрезок длиннее. Сначала переведи, потом сравнивай. Жми «в миллиметры».',
      'Неравенство можно двигать, как весы. Если 3 < 5, положи двойку на обе чаши: 5 < 7 — знак тот же. Плюс не ломает знак. Умножение на минус — уже другая история, её пока отложи. Жми «положить двойку».',
      'X легче Y, Y легче Z. Кто тяжелее всех? Собери цепочку по весу: X < Y < Z. Тяжелее всех тот, кто справа. Выбери и не торопись.'
    ],
    check:{q:'X легче Y, а Y легче Z. Кто тяжелее всех?', choices:['X','Y','Z'], ans:2,
      exp:'X < Y < Z — тяжелее всех Z.'},
    tasks:[
      {q:'A выше B, B выше C. Кто выше всех?', kind:'choice', choices:['A','B','C'], ans:0, tol:0,
        hints:['Цепочка: A > B > C.'], sol:'A > B > C — выше всех A.'},
      {q:'A выше B, B выше C, C выше D. Кто ниже всех?', kind:'choice', choices:['A','B','C','D'], ans:3, tol:0,
        hints:['Цепочка: A > B > C > D.','Ниже всех — последний.'], sol:'A > B > C > D — ниже всех D.'}
    ]
  };
  const ink='#eef4ff', dim='#9aaccc', gold='#ffd76a', grn='#7de0a0', red='#ff9a8a', blu='#7ec8ff',
        card='rgba(16,26,48,.96)', line='#3a4c78', W=318;
  function esc(s){ return String(s).replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>'); }
  function T(x,y,s,c,t,o){
    const str=''+t, a=(o&&o.a)||'middle', b=(o&&o.b)?'bold':'normal';
    let fs=s; if(str.length>24) fs=Math.max(12, Math.min(s, 280/(str.length*0.55)));
    const sw=fs>=20?3.2:2.5;
    return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" fill="${c}" font-weight="${b}" font-family="Georgia,serif" paint-order="stroke" stroke="#0b1220" stroke-width="${sw}">${esc(str)}</text>`;
  }
  function bg(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs>
        <linearGradient id="g24bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#152038"/><stop offset="1" stop-color="#0b1224"/></linearGradient>
        <linearGradient id="g24gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c9932f"/></linearGradient>
        <filter id="f24sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g24bg)"/>
      <g opacity=".13" stroke="#4a5c8a" stroke-width="1"><line x1="40" y1="0" x2="34" y2="${H}"/><line x1="100" y1="0" x2="96" y2="${H}"/><line x1="160" y1="0" x2="157" y2="${H}"/><line x1="220" y1="0" x2="218" y2="${H}"/><line x1="280" y1="0" x2="279" y2="${H}"/></g>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="#44568c" stroke-width="2.4" rx="7"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" fill="none" stroke="#2c3a64" stroke-width="1.2" rx="4"/>
      ${inner}</svg>`;
  }
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||gold};color:${c||gold};font-size:16px">${t}</span>`;
  function apple(cx,cy,col,delay){
    return `<g class="qPop" style="animation-delay:${delay}s" filter="url(#f24sh)">
      <circle cx="${cx}" cy="${cy}" r="12" fill="${col}"/>
      <ellipse cx="${cx+3}" cy="${cy-12}" rx="3.2" ry="5.5" fill="${grn}"/>
      <rect x="${cx-1}" y="${cy-16}" width="2.2" height="6" rx="1" fill="#5a3a22"/></g>`;
  }
  function kid(cx,gy,h,col,lab,delay){
    const hr=Math.max(8,h*0.18), hy=gy-h+hr, bw=Math.max(16,h*0.36), bh=h-hr*2-2;
    return `<g class="qPop" style="animation-delay:${delay}s" filter="url(#f24sh)">
      <circle cx="${cx}" cy="${hy}" r="${hr}" fill="${col}"/>
      <rect x="${cx-bw/2}" y="${hy+hr+1}" width="${bw}" height="${bh}" rx="7" fill="${col}"/>
      ${T(cx,gy+18,14,ink,lab,{b:1})}</g>`;
  }
  function visW24(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.lit=0; }
    const go=st.go||0;
    let h='', H=210;
    if(step===0){
      H=222;
      let inn='';
      for(let i=0;i<5;i++) inn+=apple(42+i*26,86,gold,.06*i);
      for(let i=0;i<3;i++) inn+=apple(208+i*26,86,blu,.4+.06*i);
      inn+=T(94,132,16,gold,'5',{b:1})+T(234,132,16,blu,'3',{b:1});
      if(go){
        inn+=`<g class="qBeak" filter="url(#f24sh)">
          <circle cx="150" cy="88" r="13" fill="url(#g24gold)"/>
          <circle cx="155" cy="84" r="3" fill="#0b1220"/>
          <path d="M162 80 L186 88 L162 96 Z" fill="url(#g24gold)"/>
        </g>`+T(159,168,16,grn,'клювик открыт на большее',{b:1});
      } else inn+=T(159,168,14,dim,'жми — клювик повернётся');
      h=wkFrame(`<div class="wk-big">Клювик на большее</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('5 > 3',gold)):'')+
        (go?wkNote('Клювик как у птицы: всегда открывается на большую кучку. Слева пять, справа три — значит 5 > 3.'):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('открыть клювик',`visW24Act('${lk}','go')`))+
        wkSml('слева пять, справа три'));
    } else if(step===1){
      H=228;
      const rows=[{s:'>',a:'5',b:'3',t:'пять больше трёх',c:gold},{s:'<',a:'3',b:'5',t:'три меньше пяти',c:blu},{s:'=',a:'5',b:'5',t:'пять равно пяти',c:grn}];
      const k=st.pick>=0?st.pick:0;
      let inn='';
      rows.forEach((r,i)=>{
        const y=40+i*54, on=st.pick===i;
        inn+=`<g class="qRise" style="animation-delay:${.1*i}s" filter="url(#f24sh)">
          <rect x="24" y="${y}" width="270" height="46" rx="12" fill="${on?'rgba(255,215,106,.14)':card}" stroke="${on?r.c:line}" stroke-width="2"/>
          ${T(70,y+30,20,ink,r.a,{b:1})}${T(159,y+32,24,r.c,r.s,{b:1})}${T(248,y+30,20,ink,r.b,{b:1})}
        </g>`;
      });
      inn+=go?T(159,208,14,rows[k].c,rows[k].t,{b:1}):T(159,208,14,dim,'нажми знак внизу');
      h=wkFrame(`<div class="wk-big">Три знака — три фразы</div>`+wkHero(bg(H,inn))+
        wkRow(rows.map((r,i)=>wkBtn(r.s,`visW24Pick('${lk}',${i})`)).join(''))+
        (go?wkRow(chip(rows[k].t,rows[k].c)):'')+
        wkSml('одно сравнение с двух сторон'));
    } else if(step===2){
      H=214;
      function win(x,n,col,delay,cls){
        let s=`<g class="${cls}" style="animation-delay:${delay}s" filter="url(#f24sh)"><rect x="${x}" y="44" width="118" height="108" rx="12" fill="${card}" stroke="${col}" stroke-width="2"/>`;
        for(let i=0;i<n;i++) s+=`<rect x="${x+14+i*32}" y="70" width="26" height="36" rx="6" fill="rgba(255,255,255,.07)" stroke="${col}" stroke-width="1.6"/>${T(x+27+i*32,94,18,ink,'·',{b:1})}`;
        s+=T(x+59,132,14,col,n===3?'3 окошка':'2 окошка',{b:1})+`</g>`;
        return s;
      }
      let inn=win(28,3,gold,0,'qSlide')+win(172,2,red,.18,'qSlideR');
      inn+=T(87,40,16,gold,'100',{b:1})+T(231,40,16,red,'99',{b:1});
      inn+=go?T(159,178,20,grn,'100 > 99',{b:1}):T(159,178,14,dim,'считаем окошки, не девятки');
      h=wkFrame(`<div class="wk-big">Сначала длина записи</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('три цифры больше двух',gold)):'')+
        (go?wkNote('У кого цифр больше — то число и больше. Девятки громкие, но окошек у них меньше.'):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('посчитать окошки',`visW24Act('${lk}','go')`))+
        wkSml('три окошка против двух'));
    } else if(step===3){
      H=222;
      function house(x,ones,show,ocol){
        const roof=`<path d="M${x+8} 72 L${x+60} 52 L${x+112} 72 Z" fill="rgba(255,215,106,.18)" stroke="${gold}" stroke-width="1.8"/>`;
        return `${roof}<rect x="${x+14}" y="72" width="92" height="100" rx="8" fill="${card}" stroke="${line}" stroke-width="1.8"/>
          <rect x="${x+24}" y="80" width="72" height="38" rx="8" fill="rgba(126,200,255,.1)" stroke="${blu}" stroke-width="1.6"/>
          ${T(x+60,94,12,dim,'десятки')}${T(x+60,110,18,ink,'4',{b:1})}
          ${show?`<g class="qDrop"><rect x="${x+24}" y="124" width="72" height="38" rx="8" fill="${ocol==='grn'?'rgba(125,224,160,.14)':'rgba(255,154,138,.12)'}" stroke="${ocol==='grn'?grn:red}" stroke-width="2"/>
          ${T(x+60,138,12,ocol==='grn'?grn:red,'единицы')}${T(x+60,154,18,ocol==='grn'?grn:red,''+ones,{b:1})}</g>`
          :`<rect x="${x+24}" y="124" width="72" height="38" rx="8" fill="rgba(255,255,255,.04)" stroke="${line}" stroke-width="1.4"/>${T(x+60,148,16,dim,'?')}`}`;
      }
      let inn=T(80,36,20,gold,'47',{b:1})+T(238,36,20,blu,'42',{b:1});
      inn+=house(20,7,!!go,'grn')+house(176,2,!!go,'red');
      h=wkFrame(`<div class="wk-big">Потом старший разряд</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('десятки равны · 7 > 2',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('сравнить единицы',`visW24Act('${lk}','go')`))+
        wkSml('слева направо: сначала десятки'));
    } else if(step===4){
      H=200;
      let inn=`<g class="qLink">${T(80,40,16,ink,'A > B',{b:1})}
        <ellipse cx="80" cy="88" rx="38" ry="22" fill="none" stroke="${gold}" stroke-width="6"/></g>
        <g class="qLinkR">${T(238,40,16,ink,'B > C',{b:1})}
        <ellipse cx="238" cy="88" rx="38" ry="22" fill="none" stroke="${blu}" stroke-width="6"/></g>`;
      if(go) inn+=`<g class="qPop">${T(159,148,22,gold,'A > B > C',{b:1})}${T(159,174,14,grn,'два звена склеились',{b:1})}</g>`;
      else inn+=T(159,160,14,dim,'склей два звена');
      h=wkFrame(`<div class="wk-big">Два звена — цепочка</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('A > B > C',gold)):'')+
        (go?wkNote('Если первое больше второго, а второе больше третьего — первое больше третьего. Это склейка, не новая мысль.'):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('склеить',`visW24Act('${lk}','go')`))+
        wkSml('если A больше B, а B больше C'));
    } else if(step===5){
      H=204;
      const kids=[{x:48,h:78,c:grn,l:'A'},{x:122,h:64,c:gold,l:'B'},{x:196,h:50,c:blu,l:'C'},{x:270,h:42,c:red,l:'D'}];
      let inn='';
      kids.forEach((k,i)=>{ inn+=kid(k.x,150,k.h,k.c,k.l,.1*i); });
      inn+=T(48,184,12,grn,'выше всех')+T(270,184,12,red,'ниже всех');
      h=wkFrame(`<div class="wk-big">Слева — выше всех</div>`+wkHero(bg(H,inn))+
        wkRow(chip('A > B > C > D',gold))+
        wkSml('очередь по росту: первый выше всех'));
    } else if(step===6){
      H=196;
      let inn=go
        ? `<g class="qFlip" filter="url(#f24sh)"><rect x="44" y="48" width="230" height="88" rx="14" fill="${card}" stroke="${blu}" stroke-width="2.2"/>
           ${T(159,86,24,blu,'C < B < A',{b:1})}${T(159,118,14,dim,'читали справа налево')}</g>`
        : `<g filter="url(#f24sh)"><rect x="44" y="48" width="230" height="88" rx="14" fill="${card}" stroke="${gold}" stroke-width="2.2"/>
           ${T(159,86,24,gold,'A > B > C',{b:1})}${T(159,118,14,dim,'переверни вместе со знаками')}</g>`;
      inn+=go?T(159,168,14,grn,'тот же порядок',{b:1}):T(159,168,14,dim,'не новое сравнение');
      h=wkFrame(`<div class="wk-big">С другого конца</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('C &lt; B &lt; A',blu)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('перевернуть',`visW24Act('${lk}','go')`))+
        wkSml('не новое сравнение — тот же ряд'));
    } else if(step===7){
      H=214;
      const opts=['A > C','C > A','не знаем'], ok=2, sel=st.pick;
      let inn=`<circle cx="80" cy="58" r="16" fill="${card}" stroke="${gold}" stroke-width="2"/>${T(80,64,16,gold,'A',{b:1})}
        <circle cx="238" cy="58" r="16" fill="${card}" stroke="${blu}" stroke-width="2"/>${T(238,64,16,blu,'C',{b:1})}
        <circle cx="159" cy="118" r="16" fill="${card}" stroke="${red}" stroke-width="2"/>${T(159,124,16,red,'B',{b:1})}
        <line x1="92" y1="70" x2="148" y2="108" stroke="${gold}" stroke-width="2.2"/>
        <line x1="226" y1="70" x2="170" y2="108" stroke="${blu}" stroke-width="2.2"/>
        <line x1="96" y1="58" x2="222" y2="58" stroke="${line}" stroke-width="1.6" stroke-dasharray="6 5"/>`;
      inn+=sel>=0?T(159,168,14,sel===ok?grn:red, sel===ok?'про A и C молчим':'звена A—C нет',{b:1}):T(159,168,14,dim,'что можно сказать про A и C?');
      h=wkFrame(`<div class="wk-big">Звена не хватает</div>`+wkHero(bg(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW24Pick('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('оба выше B — и всё',gold)):'')+
        wkSml('оба выше B — про A и C молчим'));
    } else if(step===8){
      H=188;
      let inn=`<line x1="28" y1="96" x2="290" y2="96" stroke="url(#g24gold)" stroke-width="5" stroke-linecap="round"/>
        <polygon points="290,96 276,88 276,104" fill="${gold}"/>`;
      [0,3,7,10].forEach(n=>{
        const x=40+n*22;
        inn+=`<line x1="${x}" y1="88" x2="${x}" y2="104" stroke="${ink}" stroke-width="2"/>${T(x,128,14,n===7||n===3?gold:ink,''+n,{b:1})}`;
      });
      inn+=go?`<circle class="qWalk" cx="106" cy="78" r="8" fill="${grn}" filter="url(#f24sh)"/>`: `<circle cx="106" cy="78" r="8" fill="${blu}"/>`;
      inn+=go?T(159,164,14,grn,'правее — значит больше',{b:1}):T(159,164,14,dim,'шарик стоит на тройке');
      h=wkFrame(`<div class="wk-big">Кто правее — тот больше</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('7 > 3',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('пройти',`visW24Act('${lk}','go')`))+
        wkSml('луч: вправо числа растут'));
    } else if(step===9){
      H=200;
      let inn=`<rect x="36" y="52" width="36" height="88" rx="6" fill="${card}" stroke="${gold}" stroke-width="2"/>${T(54,102,16,gold,'3',{b:1})}
        <rect x="246" y="52" width="36" height="88" rx="6" fill="${card}" stroke="${gold}" stroke-width="2"/>${T(264,102,16,gold,'7',{b:1})}`;
      if(go) inn+=`<rect class="qFill" x="76" y="60" width="166" height="72" rx="8" fill="rgba(126,200,255,.18)" stroke="${blu}" stroke-width="2"/>${T(159,104,24,ink,'x',{b:1})}`;
      else inn+=`<rect x="76" y="60" width="166" height="72" rx="8" fill="rgba(255,255,255,.04)" stroke="${line}" stroke-width="1.6" stroke-dasharray="6 5"/>${T(159,104,16,dim,'коридор')}`;
      inn+=T(54,160,12,dim,'дверь')+T(264,160,12,dim,'дверь');
      inn+=go?T(159,180,14,grn,'больше 3 и меньше 7',{b:1}):T(159,180,14,dim,'два условия, одна запись');
      h=wkFrame(`<div class="wk-big">Коридор для x</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('3 &lt; x &lt; 7',blu)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('открыть коридор',`visW24Act('${lk}','go')`))+
        wkSml('двойное неравенство — две стены'));
    } else if(step===10){
      H=204;
      const nums=[3,4,5,6,7];
      let inn='';
      nums.forEach((n,i)=>{
        const x=28+i*54, inC=n>3&&n<7, on=st.lit&(1<<i);
        const fill=on?'rgba(125,224,160,.22)':inC?card:'rgba(255,154,138,.1)';
        inn+=`<g class="qPop" style="animation-delay:${.08*i}s" filter="url(#f24sh)">
          <rect x="${x}" y="52" width="48" height="72" rx="10" fill="${fill}" stroke="${on?grn:inC?gold:red}" stroke-width="2"/>
          ${T(x+24,86,20,on?grn:ink,''+n,{b:1})}
          ${T(x+24,110,12,on?grn:(inC?dim:red), on?'живёт':(inC?'жми':'порог'))}
        </g>`;
      });
      inn+=T(159,152,14,go?grn:dim, go?'жильцы: 4, 5 и 6':'нажми 4, 5 или 6');
      h=wkFrame(`<div class="wk-big">Три жильца коридора</div>`+wkHero(bg(H,inn))+
        wkRow([4,5,6].map((n,i)=>wkBtn(''+n,`visW24Lit('${lk}',${i+1})`)).join(''))+
        wkSml('3 и 7 на пороге — внутрь не входят'));
    } else if(step===11){
      H=200;
      let inn=`<g class="qPop" filter="url(#f24sh)"><rect x="24" y="40" width="130" height="100" rx="14" fill="${go?'rgba(125,224,160,.14)':card}" stroke="${go?grn:line}" stroke-width="2.2"/>
        ${T(89,84,24,gold,'5 ≥ 5',{b:1})}${T(89,116,14,go?grn:dim,go?'правда':'не меньше')}</g>
        <g class="qPop" style="animation-delay:.15s" filter="url(#f24sh)"><rect x="164" y="40" width="130" height="100" rx="14" fill="${go?'rgba(255,154,138,.12)':card}" stroke="${go?red:line}" stroke-width="2.2"/>
        ${T(229,84,24,red,'5 > 5',{b:1})}${T(229,116,14,go?red:dim,go?'ложь':'строго больше')}</g>`;
      inn+=T(159,168,14,go?gold:dim, go?'чёрточка пускает равенство':'сравни два знака');
      h=wkFrame(`<div class="wk-big">Не меньше — не «больше»</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('≥ пускает равенство',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('проверить',`visW24Act('${lk}','go')`))+
        wkSml('5 ≥ 5 верно, 5 > 5 нет'));
    } else if(step===12){
      H=196;
      let inn=`<rect x="26" y="36" width="22" height="118" rx="11" fill="${card}" stroke="${blu}" stroke-width="2"/>
        <circle cx="37" cy="148" r="14" fill="${blu}"/>`;
      if(go) inn+=`<rect class="qFillY" x="31" y="70" width="12" height="78" rx="6" fill="${blu}"/>`;
      inn+=`<line x1="64" y1="100" x2="292" y2="100" stroke="url(#g24gold)" stroke-width="5" stroke-linecap="round"/>
        <polygon points="292,100 278,92 278,108" fill="${gold}"/>`;
      [{n:'−7',x:88},{n:'−3',x:140},{n:'0',x:192},{n:'3',x:250}].forEach(m=>{
        inn+=`<line x1="${m.x}" y1="92" x2="${m.x}" y2="108" stroke="${ink}" stroke-width="2"/>${T(m.x,132,14,ink,m.n,{b:1})}`;
      });
      inn+=go?T(178,168,14,grn,'−7 < −3 < 0 < 3',{b:1}):T(178,168,14,dim,'левее нуля — холод');
      h=wkFrame(`<div class="wk-big">Левее нуля</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('дальше от нуля — меньше',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('расставить',`visW24Act('${lk}','go')`))+
        wkSml('у −7 модуль больше, само число меньше'));
    } else if(step===13){
      H=210;
      function ruler(x,label,mm,show){
        let s=`<g filter="url(#f24sh)"><rect x="${x}" y="44" width="130" height="96" rx="12" fill="${card}" stroke="${line}" stroke-width="2"/>
          ${T(x+65,68,14,gold,label,{b:1})}
          <rect x="${x+14}" y="80" width="102" height="16" rx="3" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.4"/>`;
        for(let i=0;i<11;i++) s+=`<line x1="${x+18+i*9.2}" y1="80" x2="${x+18+i*9.2}" y2="${i%5===0?100:92}" stroke="${gold}" stroke-width="1.2"/>`;
        s+=(show?T(x+65,124,20,grn,mm+' мм',{b:1}):T(x+65,124,16,dim,'?'))+`</g>`;
        return s;
      }
      let inn=ruler(24,'5 см 3 мм','53',!!go)+ruler(164,'5 см 4 мм','54',!!go);
      inn+=go?`<g class="qDrop">${T(159,168,16,grn,'54 мм > 53 мм',{b:1})}</g>`:T(159,168,14,dim,'сначала в миллиметры');
      h=wkFrame(`<div class="wk-big">Сначала одна единица</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('54 > 53',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('в миллиметры',`visW24Act('${lk}','go')`))+
        wkSml('сантиметры с миллиметрами не спорят'));
    } else if(step===14){
      H=204;
      let inn=`<polygon points="159,48 148,70 170,70" fill="${gold}"/>
        <g class="qPan"><line x1="70" y1="70" x2="248" y2="70" stroke="${gold}" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="90" cy="92" rx="32" ry="10" fill="none" stroke="${blu}" stroke-width="2.4"/>
        <ellipse cx="228" cy="92" rx="32" ry="10" fill="none" stroke="${red}" stroke-width="2.4"/>
        ${T(90,118,16,ink,go?'5':'3',{b:1})}${T(228,118,16,ink,go?'7':'5',{b:1})}</g>`;
      if(go) inn+=`<g class="qDrop">${T(90,54,14,grn,'+2',{b:1})}${T(228,54,14,grn,'+2',{b:1})}${T(159,154,16,grn,'5 < 7 — знак тот же',{b:1})}</g>`;
      else inn+=T(159,154,14,dim,'положи двойку на обе чаши');
      h=wkFrame(`<div class="wk-big">Плюс обеим сторонам</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('3+2 &lt; 5+2',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('положить двойку',`visW24Act('${lk}','go')`))+
        wkSml('умножение на минус — позже'));
    } else {
      H=204;
      const opts=['X','Y','Z'], ok=2, sel=st.pick;
      const rs=[18,26,34];
      let inn=`${T(159,36,16,ink,'X легче Y, Y легче Z',{b:1})}`;
      opts.forEach((t,i)=>{
        const x=56+i*90, on=sel===i, col=on?(i===ok?grn:red):line;
        inn+=`<g class="qPop" style="animation-delay:${.08*i}s" filter="url(#f24sh)">
          <circle cx="${x}" cy="92" r="${rs[i]}" fill="${on?(i===ok?'rgba(125,224,160,.18)':'rgba(255,154,138,.16)'):card}" stroke="${col}" stroke-width="2.4"/>
          ${T(x,98,16,on?col:ink,t,{b:1})}
          <rect x="${x-36}" y="132" width="72" height="22" rx="8" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):card}" stroke="${col}" stroke-width="1.8"/></g>`;
      });
      inn+=sel>=0?T(159,180,14,sel===ok?grn:red, sel===ok?'тяжелее всех Z':'собери цепочку по весу',{b:1}):T(159,180,14,dim,'кто тяжелее всех?');
      h=wkFrame(`<div class="wk-big">Кто тяжелее всех?</div>`+wkHero(bg(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW24Pick('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('X &lt; Y &lt; Z',grn)):'')+
        wkSml('правый в цепочке «меньше» — самый тяжёлый'));
    }
    el.innerHTML=`<div class="q24" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[24]=visW24;
  window.visW24Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW24Lit=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.lit=(st.lit||0)|(1<<i); st.go=1; chRender(0); };
  window.visW24Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.go=(st.go||0)+1;
    if(act==='rst') CHS[lk]={_at:st._at};
    chRender(0);
  };
  (function(){ const a=window.ARH_LESSONS||[]; for(let i=0;i<a.length;i++) if(a[i].id===24){ a[i]=L24; break; } })();
})();

/* ===================== 44 · Проценты: находим число ===================== */
(function(){
  const L44={
    id:44, title:'Проценты: находим число', ico:'✶',
    src:'Математика · 5 класс · Проценты', subj:'math',
    explain:[
      'Процент — сотая часть. Представь портновскую ленту длиной сто. Один маленький штрих — это 1%. Вся лента — 100%, целое. Процент всегда считают от целого: от этой ленты, от этой суммы, от этих трёхсот. Жми «зажечь 1%».',
      'Чтобы узнать, чему равен 1% числа, делим его на сто. У трёхсот один процент — три. Не тридцать и не триста: просто 300 : 100 = 3. Это цена одного штриха, если штрихов сто. Жми «разделить».',
      '50% — половина. Разрежь полосу пополам: светит левая, тёмная правая. Не надо делить столбиком. Половина от 80 — 40, половина от 300 — 150. 50% значит «разделить на два». Жми «разрезать».',
      '25% — четверть. Как пицца на четыре куска: один кусок — 25%. 80 : 4 = 20. Четверть — сразу ответ, без «умножить на 25». Жми «отрезать».',
      '10% — десятая часть. Десять монет, светит одна. 10% от 300 — это 300 : 10 = 30. Запомни: десять процентов — раздели на десять. Жми «зажечь монету».',
      'Общая формула на все случаи: N% от M = M : 100 · N. Сначала находим 1% (делим на сто), потом берём столько процентов, сколько просят. Два шага, не один. Жми «запустить».',
      '10% от 300. Шаг первый: 1% = 3. Шаг второй: 3 · 10 = 30. Жми «посчитать» — оба шага появятся по очереди. Не 10 и не 3: тридцать.',
      '20% от 500. 1% = 5, потом 5 · 20 = 100. Это же пятая часть: 500 : 5 = 100. Две дороги — один ответ. Жми «посчитать».',
      '25% от 80. Можно по формуле: 80 : 100 · 25 = 20. А можно сразу: четверть, 80 : 4 = 20. Если процент удобный — бери короткую дорогу. Жми «сравнить дороги».',
      'Ценник 500 рублей, скидка 20%. Скидка — это 20% от 500, то есть 100 рублей. Платишь 500 − 100 = 400. Скидка не падает с неба: это процент от цены. Жми «снять скидку».',
      'Ловушка. «10% от 300 — это 10?» Нет. Десять — просто число десять, а 10% — десятая часть от трёхсот. Ответ 30. Процент без «от какого числа» — пустой звук. Жми дверь с ответом.',
      'Короткая карта. 50% — дели на 2. 25% — на 4. 20% — на 5. 10% — на 10. Если процент из этой четвёрки — столбик не нужен. Жми процент — откроется дорожка.',
      'Шкала от 0 до 100. Вся полоса — целое. Закрась 10%, 25%, 50% — увидишь, какая доля длиннее. 50% — середина, 10% — узкая щёлочка слева.',
      'Алгоритм вслух. Возьми число M. Раздели на 100 — получил 1%. Умножь на N — получил N%. Проверь на удобной доле: если просили 10%, ответ должен быть в десять раз меньше M.',
      'Три устных. 10% от 300? Тридцать. 20% от 500? Сто. 25% от 80? Двадцать. Если язык уже не спотыкается — формула села. Ошибся — вернись на шаг с двумя клетками.',
      'Последний вопрос: сколько будет 10% от 300? 30 — десятая часть. 3 — это только 1%. 10 — забыли, от чего считаем. 300 — взяли всё число. Выбери и не торопись.'
    ],
    check:{q:'Сколько будет 10% от 300?', choices:['3','30','300','15'], ans:1, exp:'300 : 100 · 10 = 30.'},
    tasks:[
      {q:'Найди 20% от 500.', kind:'unit', ans:100, tol:0, hints:['1% = 500 : 100 = 5.','5 · 20 = 100.'], sol:'100.'},
      {q:'Найди 25% от 80.', kind:'unit', ans:20, tol:0, hints:['25% — это четверть.','80 : 4 = 20.'], sol:'20.'}
    ]
  };
  const I={ink:'#e8f0ff', dim:'#9aaccc', gold:'#ffd76a', grn:'#7de0a0', red:'#ff9a8a', blu:'#8fe0ff',
           card:'rgba(18,28,58,.95)', line:'#3a4a78'};
  const W=318;
  function esc(s){ return String(s).replace(/&/g,'&').replace(/</g,'<').replace(/>/g,'>'); }
  function T(x,y,s,c,t,o){
    const str=''+t, a=(o&&o.a)||'middle', b=(o&&o.b)?'bold':'normal';
    let fs=s; if(str.length>24) fs=Math.max(12, Math.min(s, 280/(str.length*0.55)));
    const sw=fs>=20?3:2.4;
    return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" fill="${c}" font-weight="${b}" font-family="Georgia,serif" paint-order="stroke" stroke="#0a1028" stroke-width="${sw}">${esc(str)}</text>`;
  }
  function sky(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs>
        <linearGradient id="g44bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10183a"/><stop offset="1" stop-color="#0a1028"/></linearGradient>
        <linearGradient id="g44gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c9932f"/></linearGradient>
        <filter id="f44sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g44bg)"/>
      <g opacity=".12" stroke="#4a5c8a" stroke-width="1"><line x1="40" y1="0" x2="34" y2="${H}"/><line x1="100" y1="0" x2="96" y2="${H}"/><line x1="160" y1="0" x2="157" y2="${H}"/><line x1="220" y1="0" x2="218" y2="${H}"/><line x1="280" y1="0" x2="279" y2="${H}"/></g>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="#44568c" stroke-width="2.4" rx="7"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" fill="none" stroke="#2c3a64" stroke-width="1.2" rx="4"/>
      ${inner}</svg>`;
  }
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||I.gold};color:${c||I.gold};font-size:16px">${t}</span>`;
  function visW44(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.q=0; st.sel=null; }
    const go=st.go||0;
    let h='', H=210;
    if(step===0){
      H=200;
      let inn=`<rect x="28" y="78" width="262" height="36" rx="6" fill="#5a4214" stroke="#c9a24a" stroke-width="2"/>`;
      for(let i=0;i<=10;i++){
        const x=36+i*24.6;
        inn+=`<line x1="${x}" y1="78" x2="${x}" y2="${i%5===0?114:100}" stroke="#e8d7a0" stroke-width="${i%5===0?2:1}"/>`;
      }
      inn+=T(36,52,12,I.dim,'0')+T(159,52,12,I.dim,'50')+T(282,52,12,I.dim,'100');
      if(go) inn+=`<rect class="qGlow" x="36" y="62" width="14" height="52" rx="3" fill="${I.gold}" stroke="#fff3c0" stroke-width="1.4"/>`+T(78,44,14,I.gold,'1%',{b:1})+T(159,148,16,I.gold,'1 штрих из 100 = 1%',{b:1});
      else inn+=T(159,148,16,I.dim,'сто штрихов — вся лента');
      h=wkFrame(`<div class="wk-big">Сотая часть ленты</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('1% = 1 из 100',I.gold)):'')+
        (go?wkNote('Процент всегда от целого. Один штрих ленты — сотая, вся лента — сто процентов.'):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('зажечь 1%',`visW44Act('${lk}','go')`))+
        wkSml('процент всегда от целого'));
    } else if(step===1){
      H=196;
      let inn=`<rect x="28" y="48" width="100" height="72" rx="12" fill="${I.card}" stroke="${I.gold}" stroke-width="2" filter="url(#f44sh)"/>${T(78,92,24,I.ink,'300',{b:1})}
        ${T(148,92,18,I.gold,': 100')}
        <rect x="186" y="48" width="100" height="72" rx="12" fill="${go?'rgba(125,224,160,.16)':I.card}" stroke="${go?I.grn:I.line}" stroke-width="2" filter="url(#f44sh)"/>${T(236,92,24,go?I.grn:I.ink,go?'3':'?',{b:1})}`;
      inn+=go?T(159,152,16,I.grn,'1% от 300 = 3',{b:1}):T(159,152,16,I.dim,'цена одного штриха');
      h=wkFrame(`<div class="wk-big">Один процент — делим на 100</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('300 : 100 = 3',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('разделить',`visW44Act('${lk}','go')`))+
        wkSml('не 30 и не 300 — три'));
    } else if(step===2){
      H=188;
      let inn=`<rect x="40" y="56" width="238" height="56" rx="12" fill="rgba(40,50,80,.5)" stroke="${I.line}" stroke-width="2"/>`;
      if(go) inn+=`<rect class="qFill" x="40" y="56" width="119" height="56" rx="12" fill="rgba(255,215,106,.55)"/>`;
      inn+=`${T(100,90,16,I.ink,'50%',{b:1})}${T(218,90,16,I.dim,'50%')}`;
      inn+=T(159,148,16,go?I.gold:I.dim, go?'половина — дели на 2':'разрежь пополам');
      h=wkFrame(`<div class="wk-big">Половина полосы</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('50% = : 2',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('разрезать',`visW44Act('${lk}','go')`))+
        wkSml('половина от 80 — сорок'));
    } else if(step===3){
      H=210;
      const cx=110, cy=108, R=58;
      let inn=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(210,160,70,.35)" stroke="${I.gold}" stroke-width="2.2"/>
        <line x1="${cx}" y1="${cy-R}" x2="${cx}" y2="${cy+R}" stroke="${I.ink}" stroke-width="1.5" opacity=".55"/>
        <line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="${I.ink}" stroke-width="1.5" opacity=".55"/>`;
      if(go) inn+=`<path class="qSlice" d="M${cx} ${cy} L${cx} ${cy-R} A${R} ${R} 0 0 1 ${cx+R} ${cy} Z" fill="rgba(255,215,106,.78)"/>`;
      inn+=`${T(236,80,16,I.gold,'25%',{b:1})}${T(236,108,14,I.dim,'один кусок')}${T(236,136,16,go?I.grn:I.ink,go?'80 : 4 = 20':'из четырёх',{b:1})}`;
      h=wkFrame(`<div class="wk-big">Четверть пиццы</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('25% = : 4',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('отрезать',`visW44Act('${lk}','go')`))+
        wkSml('четверть — сразу ответ'));
    } else if(step===4){
      H=196;
      let inn='';
      for(let i=0;i<10;i++){
        const lit=go&&i===0, x=32+i*27, y=lit?78:92;
        inn+=`<g class="${lit?'qCoin':'qPop'}" style="animation-delay:${.05*i}s" filter="url(#f44sh)">
          <ellipse cx="${x}" cy="${y}" rx="11" ry="11" fill="${lit?I.gold:'rgba(180,160,90,.35)'}" stroke="${lit?I.gold:I.line}" stroke-width="1.8"/>
          <ellipse cx="${x}" cy="${y-3}" rx="6" ry="3" fill="${lit?'rgba(255,255,220,.5)':'rgba(255,255,255,.08)'}"/>
        </g>`;
      }
      inn+=go?T(159,160,16,I.grn,'10% от 300 = 30',{b:1}):T(159,160,16,I.dim,'одна монета из десяти');
      h=wkFrame(`<div class="wk-big">Десятая часть</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('10% = : 10',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('зажечь монету',`visW44Act('${lk}','go')`))+
        wkSml('300 : 10 = 30'));
    } else if(step===5){
      H=204;
      let inn=`<g class="qSlide"><rect x="28" y="40" width="118" height="56" rx="12" fill="${I.card}" stroke="${I.gold}" stroke-width="2"/>${T(87,74,18,I.ink,'M : 100',{b:1})}</g>
        <g class="qSlide" style="animation-delay:.15s"><rect x="172" y="40" width="118" height="56" rx="12" fill="${I.card}" stroke="${I.blu}" stroke-width="2"/>${T(231,74,18,I.blu,'1%',{b:1})}</g>
        <g class="qSlide" style="animation-delay:.3s"><rect x="28" y="112" width="118" height="56" rx="12" fill="${I.card}" stroke="${I.gold}" stroke-width="2"/>${T(87,146,18,I.ink,'1% · N',{b:1})}</g>
        <g class="qPop" style="animation-delay:.45s"><rect x="172" y="112" width="118" height="56" rx="12" fill="${go?'rgba(125,224,160,.16)':I.card}" stroke="${go?I.grn:I.line}" stroke-width="2"/>${T(231,146,18,go?I.grn:I.ink,go?'N%':'?',{b:1})}</g>`;
      h=wkFrame(`<div class="wk-big">Конвейер из двух шагов</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('сначала 1%, потом × N',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('запустить',`visW44Act('${lk}','go')`))+
        wkSml('не прыгай сразу к ответу'));
    } else if(step===6){
      H=200;
      let inn=`${T(159,44,16,I.ink,'10% от 300',{b:1})}`;
      if(go>=1) inn+=`<g class="qDrop"><rect x="44" y="64" width="230" height="40" rx="10" fill="${I.card}" stroke="${I.blu}" stroke-width="1.8"/>${T(159,90,16,I.blu,'1% = 300 : 100 = 3',{b:1})}</g>`;
      if(go>=2) inn+=`<g class="qPop"><rect x="44" y="116" width="230" height="44" rx="10" fill="rgba(125,224,160,.14)" stroke="${I.grn}" stroke-width="2"/>${T(159,146,20,I.grn,'3 · 10 = 30',{b:1})}</g>`;
      if(!go) inn+=T(159,112,16,I.dim,'два шага по очереди');
      h=wkFrame(`<div class="wk-big">Десять процентов от трёхсот</div>`+wkHero(sky(H,inn))+
        (go>=2?wkRow(chip('= 30',I.grn)):'')+
        wkRow(go>=2?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn(go?'второй шаг':'посчитать',`visW44Act('${lk}','go')`))+
        wkSml('не 10 и не 3 — тридцать'));
    } else if(step===7){
      H=204;
      let inn=`${T(159,40,16,I.ink,'20% от 500',{b:1})}`;
      if(go>=1) inn+=`<g class="qRise"><rect x="24" y="58" width="130" height="88" rx="12" fill="${I.card}" stroke="${I.blu}" stroke-width="2"/>
        ${T(89,88,14,I.dim,'формула')}${T(89,118,16,I.blu,'1% = 5',{b:1})}${T(89,140,14,I.ink,'5 · 20')}</g>`;
      if(go>=2) inn+=`<g class="qPop"><rect x="164" y="58" width="130" height="88" rx="12" fill="rgba(125,224,160,.14)" stroke="${I.grn}" stroke-width="2"/>
        ${T(229,88,14,I.gold,'пятая часть')}${T(229,118,20,I.grn,'500 : 5',{b:1})}${T(229,142,16,I.grn,'= 100',{b:1})}</g>`;
      if(!go) inn+=T(159,112,16,I.dim,'формула и пятая часть');
      h=wkFrame(`<div class="wk-big">Два пути — один ответ</div>`+wkHero(sky(H,inn))+
        (go>=2?wkRow(chip('5 · 20 = 100',I.grn)):'')+
        wkRow(go>=2?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn(go?'второй путь':'посчитать',`visW44Act('${lk}','go')`))+
        wkSml('20% — это пятая часть'));
    } else if(step===8){
      H=196;
      let inn=`<rect x="24" y="44" width="130" height="96" rx="12" fill="${I.card}" stroke="${I.line}" stroke-width="2"/>
        ${T(89,76,14,I.dim,'формула')}${T(89,108,16,go?I.grn:I.ink,go?'= 20':'80 : 100 · 25',{b:1})}
        <rect x="164" y="44" width="130" height="96" rx="12" fill="${go?'rgba(255,215,106,.14)':I.card}" stroke="${go?I.gold:I.line}" stroke-width="2"/>
        ${T(229,76,14,I.gold,'короткая')}${T(229,108,20,go?I.gold:I.ink,go?'80 : 4':'четверть',{b:1})}`;
      inn+=go?T(159,164,16,I.grn,'оба дают 20',{b:1}):T(159,164,14,I.dim,'удобный процент — короткая дорога');
      h=wkFrame(`<div class="wk-big">Четверть от восьмидесяти</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('= 20',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('сравнить дороги',`visW44Act('${lk}','go')`))+
        wkSml('25% = делить на 4'));
    } else if(step===9){
      H=210;
      let inn=`<g filter="url(#f44sh)"><path d="M88 44 L230 44 L242 70 L230 164 L88 164 Z" fill="${I.card}" stroke="${I.gold}" stroke-width="2.2"/>
        <circle cx="100" cy="70" r="7" fill="none" stroke="${I.gold}" stroke-width="2"/>
        ${T(164,78,14,I.dim,'ценник')}${T(164,112,24,I.ink,'500 ₽',{b:1})}</g>`;
      if(go) inn+=`<g class="qPeel"><rect x="118" y="128" width="92" height="28" rx="6" fill="${I.red}"/>${T(164,148,14,I.ink,'−100 ₽',{b:1})}</g>`+T(159,188,16,I.grn,'платить 400',{b:1});
      else inn+=T(164,148,14,I.dim,'скидка 20%');
      h=wkFrame(`<div class="wk-big">Скидка с ценника</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('500 − 100 = 400',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('снять скидку',`visW44Act('${lk}','go')`))+
        wkSml('скидка — процент от цены'));
    } else if(step===10){
      H=210;
      const sel=st.pick, ok=1;
      function door(x,label,sub,good,on){
        const col=on?(good?I.grn:I.red):I.line;
        const fill=on?(good?'rgba(125,224,160,.14)':'rgba(255,154,138,.12)'):I.card;
        return `<g class="qRise" filter="url(#f44sh)"><path d="M${x} 160 L${x} 56 Q${x+55} 28 ${x+110} 56 L${x+110} 160 Z" fill="${fill}" stroke="${col}" stroke-width="2.2"/>
          <circle cx="${x+88}" cy="108" r="4" fill="${col}"/>
          ${T(x+55,100,20,on?col:I.ink,label,{b:1})}${T(x+55,128,12,I.dim,sub)}</g>`;
      }
      let inn=door(32,'10','просто десять',false,sel===0)+door(176,sel===1?'30':'10%?','десятая от 300',true,sel===1);
      inn+=sel>=0?T(159,184,14,sel===ok?I.grn:I.red, sel===ok?'процент без «от» — пустой звук':'это не одно и то же',{b:1}):T(159,184,14,I.dim,'какая дверь верная?');
      h=wkFrame(`<div class="wk-big">Не путай 10 и 10%</div>`+wkHero(sky(H,inn))+
        wkRow(wkBtn('10',`visW44Pick('${lk}',0)`)+wkBtn('30',`visW44Pick('${lk}',1)`))+
        (sel===ok?wkRow(chip('10% от 300 = 30',I.grn)):'')+
        wkSml('всегда спрашивай: от какого числа?'));
    } else if(step===11){
      H=214;
      const rows=[{t:'50%  →  : 2',c:I.gold},{t:'25%  →  : 4',c:I.blu},{t:'20%  →  : 5',c:I.grn},{t:'10%  →  : 10',c:I.ink}];
      let inn='';
      rows.forEach((r,i)=>{
        const show=go||st.pick===i;
        inn+=`<g class="qRise" style="animation-delay:${.08*i}s"><rect x="36" y="${32+i*40}" width="246" height="34" rx="9" fill="${show?'rgba(255,215,106,.12)':I.card}" stroke="${show?r.c:I.line}" stroke-width="1.8"/>
          ${T(159,54+i*40,16,show?r.c:I.dim,r.t,{b:1})}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Карта коротких дорог</div>`+wkHero(sky(H,inn))+
        wkRow(['50%','25%','20%','10%'].map((t,i)=>wkBtn(t,`visW44Pick('${lk}',${i})`)).join(''))+
        wkSml('удобный процент — деление'));
    } else if(step===12){
      H=188;
      const pct=[10,25,50][Math.max(0,st.pick)|0];
      const w=Math.round(2.4*pct);
      let inn=`<rect x="40" y="70" width="240" height="32" rx="8" fill="rgba(40,50,80,.5)" stroke="${I.line}" stroke-width="1.6"/>
        <rect class="qFill" x="40" y="70" width="${w}" height="32" rx="8" fill="url(#g44gold)"/>
        ${T(40,60,12,I.dim,'0')}${T(280,60,12,I.dim,'100')}${T(40+Math.max(24,w),128,16,I.gold,pct+'%',{b:1})}`;
      h=wkFrame(`<div class="wk-big">Шкала от нуля до ста</div>`+wkHero(sky(H,inn))+
        wkRow(['10%','25%','50%'].map((t,i)=>wkBtn(t,`visW44Pick('${lk}',${i})`)).join(''))+
        wkSml('50% — середина, 10% — щель слева'));
    } else if(step===13){
      H=210;
      const steps=['1. Возьми число M','2. Раздели на 100 → 1%','3. Умножь на N → N%'];
      let inn='';
      steps.forEach((t,i)=>{
        inn+=`<g class="qRise" style="animation-delay:${.12*i}s" filter="url(#f44sh)"><rect x="28" y="${40+i*48}" width="262" height="40" rx="10" fill="${I.card}" stroke="${i===2?I.grn:I.gold}" stroke-width="2"/>
          ${T(159,66+i*48,16,i===2?I.grn:I.ink,t,{b:1})}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Три шага вслух</div>`+wkHero(sky(H,inn))+
        wkRow(chip('M : 100 · N',I.gold))+
        wkSml('для 10% ответ в десять раз меньше M'));
    } else if(step===14){
      H=196;
      const q=[{t:'10% от 300',a:'30'},{t:'20% от 500',a:'100'},{t:'25% от 80',a:'20'}][st.q||0];
      let inn=`${T(159,64,18,I.ink,q.t,{b:1})}`;
      inn+=go?T(159,118,32,I.grn,q.a,{b:1}):T(159,118,16,I.dim,'скажи вслух, потом открой');
      h=wkFrame(`<div class="wk-big">Три устных</div>`+wkHero(sky(H,inn))+
        wkRow(go?wkBtn((st.q||0)<2?'следующий':'сначала',`visW44Act('${lk}','nq')`):wkBtn('открыть',`visW44Act('${lk}','go')`))+
        wkSml('язык не должен спотыкаться'));
    } else {
      H=200;
      const opts=['3','30','300','15'], ok=1, sel=st.sel;
      let inn=`${T(159,40,16,I.ink,'10% от 300 = ?',{b:1})}`;
      opts.forEach((t,i)=>{
        const x=28+i*72, on=sel===i, col=on?(i===ok?I.grn:I.red):I.line;
        inn+=`<g class="qPop" style="animation-delay:${.06*i}s" filter="url(#f44sh)"><rect x="${x}" y="70" width="64" height="56" rx="12" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):I.card}" stroke="${col}" stroke-width="2"/>${T(x+32,106,18,on?col:I.ink,t,{b:1})}</g>`;
      });
      inn+=sel!=null?T(159,156,14,sel===ok?I.grn:I.red, sel===ok?'десятая часть — 30':'3 это 1%, 10 забыли «от»',{b:1}):T(159,156,14,I.dim,'выбери ответ');
      h=wkFrame(`<div class="wk-big">Сколько будет 10% от 300?</div>`+wkHero(sky(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW44T('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('300 : 100 · 10 = 30',I.grn)):'')+
        wkSml('не 3 и не 10 — тридцать'));
    }
    el.innerHTML=`<div class="q44" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[44]=visW44;
  window.visW44T=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.sel=i; chRender(0); };
  window.visW44Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW44Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go'){ if(LV.step===6||LV.step===7||LV.step===14) st.go=(st.go||0)+1; else st.go=(st.go||0)+1; }
    if(act==='nq'){ st.q=((st.q||0)+1)%3; st.go=0; }
    if(act==='rst') CHS[lk]={_at:st._at};
    chRender(0);
  };
  (function(){ const a=window.ARH_LESSONS||[]; for(let i=0;i<a.length;i++) if(a[i].id===44){ a[i]=L44; break; } })();
})();
