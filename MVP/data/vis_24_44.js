/* Уроки 24 и 44 · v2. Перекрывают vis_wk.js: 16 кадров, живой язык, своя сцена на кадр. */
(function(){
  if(window.__m2444css) return; window.__m2444css=1;
  const st=document.createElement('style');
  st.textContent=
    '#lvis .m24,#lvis .m44{width:100%;max-width:352px;margin:0 auto}'+
    '#lvis .m24 .wk-big,#lvis .m44 .wk-big{font-size:24px}'+
    '#lvis .m24 .wk-sml,#lvis .m44 .wk-sml{font-size:16px;line-height:1.45}'+
    '@keyframes mBeak{0%{transform:scaleX(.2);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes mPop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.06)}100%{transform:none;opacity:1}}'+
    '@keyframes mSlide{0%{transform:translateX(-18px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes mRise{0%{transform:translateY(12px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes mWalk{0%{transform:translateX(0)}100%{transform:translateX(96px)}}'+
    '@keyframes mFlip{0%{transform:rotateY(0)}100%{transform:rotateY(180deg)}}'+
    '@keyframes mFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'+
    '@keyframes mGlow{0%,100%{opacity:.45}50%{opacity:1}}'+
    '@keyframes mSpin{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}'+
    '@keyframes mDrop{0%{transform:translateY(-16px);opacity:0}100%{transform:none;opacity:1}}'+
    '#lvis .mBeak{transform-origin:center;animation:mBeak .7s ease both}'+
    '#lvis .mPop{transform-box:fill-box;transform-origin:center;animation:mPop .5s ease both}'+
    '#lvis .mSlide{animation:mSlide .5s ease both}'+
    '#lvis .mRise{animation:mRise .5s ease both}'+
    '#lvis .mWalk{animation:mWalk 1.1s ease forwards}'+
    '#lvis .mFill{transform-origin:left center;animation:mFill .8s ease both}'+
    '#lvis .mGlow{animation:mGlow 1.8s ease infinite}'+
    '#lvis .mDrop{animation:mDrop .45s ease both}'+
    '#lvis .m24[data-f="1"] .mBeak{animation-duration:.9s}'+
    '#lvis .m24[data-f="5"] .mSlide{animation-duration:.65s}'+
    '#lvis .m24[data-f="7"] .mRise{animation-duration:.7s}'+
    '#lvis .m24[data-f="9"] .mWalk{animation-duration:1.3s}'+
    '#lvis .m44[data-f="3"] .mFill{animation-duration:1s}'+
    '#lvis .m44[data-f="4"] .mPop{animation-duration:.7s}'+
    '#lvis .m44[data-f="10"] .mDrop{animation-duration:.55s}'+
    '@media (prefers-reduced-motion:reduce){'+
      '#lvis .mBeak,#lvis .mPop,#lvis .mSlide,#lvis .mRise,#lvis .mWalk,#lvis .mFill,#lvis .mGlow,#lvis .mDrop{animation:none!important}}';
  document.head.appendChild(st);
})();

/* ===================== 24 · Цепочки сравнений ===================== */
(function(){
  const L24={
    id:24, title:'Цепочки сравнений', ico:'📏',
    src:'Математика · 5 класс · Сравнение и неравенства', subj:'math',
    explain:[
      'Смотри на две кучки. Слева пять кружков, справа три. Сравнить — значит сказать, какая кучка больше. У знака есть клювик: он всегда открывается на большее. Жми «показать» — клювик сам повернётся к пятёрке.',
      'Три знака, три фразы. 5 > 3 читаем «пять больше трёх». 3 < 5 — «три меньше пяти». Это одно сравнение с двух сторон. А 5 = 5 — когда кучки одинаковые. Жми знак — услышишь, как он читается.',
      'Натуральные числа сначала сравнивают по длине записи. У 100 три цифры, у 99 две. Три больше двух — значит и само число больше. Не смотри на девятки: они громкие, но цифр меньше. Жми «посчитать цифры».',
      'Если цифр поровну — идём слева направо. У 47 и 42 десятки одинаковые: по четыре. Тогда единицы: 7 больше 2. Поэтому 47 > 42. Старший разряд решает раньше младшего.',
      'Если A выше B, а B выше C — A выше C. Это не новая мысль, это склейка. Два звена становятся цепочкой. Жми «собрать» — A, B и C встанут в один ряд.',
      'Цепочку пишем одной строкой: A > B > C. Знаки смотрят в одну сторону. Кто слева — самый большой. Кто справа — самый маленький. Как очередь по росту: первый в ряду выше всех.',
      'Ту же цепочку можно прочитать с другого конца. Переверни всех вместе со знаками — получится C < B < A. Это не другое сравнение: тот же порядок, только шагаем справа налево.',
      'А вот если A выше B и C тоже выше B — про A и C мы ничего не сказали. Оба выше B, и всё. A может быть выше C, может ниже. Не хватает звена. Жми «не знаем» — так и отвечают.',
      'На луче сравнение видно глазом. Ноль слева, числа бегут вправо. Кто правее — тот больше. Семёрка стоит правее тройки, поэтому 7 > 3. Жми «пройти» — шарик дойдёт до семёрки.',
      'Двойное неравенство — это коридор. 3 < x < 7 значит: x правее тройки и левее семёрки сразу. Два условия, одна запись. x не выходит ни в дверь «3», ни в дверь «7».',
      'Если x — натуральное и 3 < x < 7, в коридоре живут только 4, 5 и 6. Три жильца. Жми на число — оно зажжётся. 3 и 7 стоят на пороге и внутрь не входят: знаки строгие.',
      'Знак ≥ читается «не меньше»: больше или столько же. 5 ≥ 5 — правда. 5 > 5 — ложь. Чёрточка под знаком пускает равенство. Не путай «не меньше» с «больше».',
      'Отрицательные стоят слева от нуля. Поэтому −5 < 0 < 3. Из двух отрицательных меньше то, что дальше от нуля: −7 левее −3, значит −7 < −3. Модуль больше — само число меньше.',
      'Величины сравнивают в одной единице. 5 см 3 мм — это 53 мм. 5 см 4 мм — 54 мм. 54 > 53, значит второй отрезок длиннее. Сначала переведи, потом сравнивай.',
      'Неравенство можно двигать. Если 3 < 5, прибавь двойку к обеим сторонам: 5 < 7 — знак тот же. Плюс не ломает знак. Умножение на отрицательное — уже другая история, её пока отложи.',
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
        card='rgba(16,26,48,.96)', line='#3a4c78';
  const W=318;
  function bg(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs><linearGradient id="m24bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#152038"/><stop offset="1" stop-color="#0b1224"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#m24bg)"/>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="${line}" stroke-width="2" rx="8"/>
      ${inner}</svg>`;
  }
  const T=(x,y,s,c,t,o)=>`<text x="${x}" y="${y}" text-anchor="${(o&&o.a)||'middle'}" font-size="${s}" fill="${c}" font-weight="${(o&&o.b)?'bold':'normal'}" font-family="Georgia,serif" paint-order="stroke" stroke="#0b1220" stroke-width="3.2">${t}</text>`;
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||gold};color:${c||gold};font-size:16px">${t}</span>`;
  function visW24(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.lit=0; }
    const go=st.go||0;
    let h='', H=210;
    if(step===0){
      H=220;
      let inn='';
      for(let i=0;i<5;i++) inn+=`<circle class="mPop" style="animation-delay:${.08*i}s" cx="${40+i*28}" cy="88" r="11" fill="${gold}"/>`;
      for(let i=0;i<3;i++) inn+=`<circle class="mPop" style="animation-delay:${.4+.08*i}s" cx="${210+i*28}" cy="88" r="11" fill="${blu}"/>`;
      inn+=T(96,128,16,gold,'5',{b:1})+T(238,128,16,blu,'3',{b:1});
      if(go) inn+=`<g class="mBeak">${T(159,96,32,gold,'>',{b:1})}${T(159,168,16,grn,'клювик открыт на большее',{b:1})}</g>`;
      else inn+=T(159,168,16,dim,'жми — появится знак');
      h=wkFrame(`<div class="wk-big">Клювик на большее</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('5 > 3',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('показать',`visW24Act('${lk}','go')`))+
        wkSml('слева пять, справа три'));
    } else if(step===1){
      H=228;
      const rows=[{s:'>',a:'5',b:'3',t:'пять больше трёх',c:gold},{s:'<',a:'3',b:'5',t:'три меньше пяти',c:blu},{s:'=',a:'5',b:'5',t:'пять равно пяти',c:grn}];
      const k=st.pick>=0?st.pick:0;
      let inn='';
      rows.forEach((r,i)=>{
        const y=48+i*52, on=st.pick===i;
        inn+=`<g class="mRise" style="animation-delay:${.1*i}s">
          <rect x="24" y="${y}" width="270" height="44" rx="12" fill="${on?'rgba(255,215,106,.14)':card}" stroke="${on?r.c:line}" stroke-width="2"/>
          ${T(70,y+30,20,ink,r.a,{b:1})}${T(159,y+30,24,r.c,r.s,{b:1})}${T(248,y+30,20,ink,r.b,{b:1})}
        </g>`;
      });
      inn+=go?T(159,210,14,rows[k].c,rows[k].t,{b:1}):T(159,210,14,dim,'нажми знак внизу');
      h=wkFrame(`<div class="wk-big">Три знака — три фразы</div>`+wkHero(bg(H,inn))+
        wkRow(rows.map((r,i)=>wkBtn(r.s,`visW24Pick('${lk}',${i})`)).join(''))+
        (go?wkRow(chip(rows[k].t,rows[k].c)):'')+
        wkSml('одно сравнение с двух сторон'));
    } else if(step===2){
      H=210;
      let inn=`<g class="mSlide"><rect x="28" y="48" width="120" height="96" rx="12" fill="${card}" stroke="${gold}" stroke-width="2"/>
        ${T(88,78,14,gold,'100',{b:1})}${T(88,104,32,ink,'3',{b:1})}${T(88,128,14,dim,'цифры')}</g>
        <g class="mSlide" style="animation-delay:.2s"><rect x="170" y="48" width="120" height="96" rx="12" fill="${card}" stroke="${red}" stroke-width="2"/>
        ${T(230,78,14,red,'99',{b:1})}${T(230,104,32,ink,'2',{b:1})}${T(230,128,14,dim,'цифры')}</g>`;
      inn+=go?T(159,178,20,grn,'100 > 99',{b:1}):T(159,178,16,dim,'считаем цифры, не девятки');
      h=wkFrame(`<div class="wk-big">Сначала длина записи</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('три цифры больше двух',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('посчитать цифры',`visW24Act('${lk}','go')`))+
        wkSml('у кого цифр больше — тот и больше'));
    } else if(step===3){
      H=216;
      let inn=`${T(90,50,16,gold,'47',{b:1})}${T(228,50,16,blu,'42',{b:1})}
        <rect x="40" y="68" width="100" height="52" rx="10" fill="${card}" stroke="${line}" stroke-width="1.8"/>${T(90,90,14,dim,'десятки')}${T(90,110,20,ink,'4',{b:1})}
        <rect x="178" y="68" width="100" height="52" rx="10" fill="${card}" stroke="${line}" stroke-width="1.8"/>${T(228,90,14,dim,'десятки')}${T(228,110,20,ink,'4',{b:1})}`;
      if(go) inn+=`<g class="mPop"><rect x="40" y="132" width="100" height="52" rx="10" fill="rgba(125,224,160,.14)" stroke="${grn}" stroke-width="2"/>${T(90,154,14,grn,'единицы')}${T(90,174,20,grn,'7',{b:1})}
        <rect x="178" y="132" width="100" height="52" rx="10" fill="rgba(255,154,138,.12)" stroke="${red}" stroke-width="2"/>${T(228,154,14,red,'единицы')}${T(228,174,20,red,'2',{b:1})}</g>`;
      h=wkFrame(`<div class="wk-big">Потом старший разряд</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('десятки равны · 7 > 2',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('сравнить единицы',`visW24Act('${lk}','go')`))+
        wkSml('слева направо: сначала десятки'));
    } else if(step===4){
      H=200;
      let inn=`${T(80,56,16,ink,'A > B',{b:1})}${T(238,56,16,ink,'B > C',{b:1})}
        <path d="M120 72 L159 104 L198 72" fill="none" stroke="${gold}" stroke-width="2.4"/>`;
      if(go) inn+=`<g class="mSlide">${T(70,148,24,gold,'A',{b:1})}${T(130,148,24,gold,'>',{b:1})}${T(180,148,24,gold,'B',{b:1})}${T(230,148,24,gold,'>',{b:1})}${T(280,148,24,gold,'C',{b:1})}</g>`;
      else inn+=T(159,148,16,dim,'склей два звена');
      h=wkFrame(`<div class="wk-big">Два звена — цепочка</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('A > B > C',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('собрать',`visW24Act('${lk}','go')`))+
        wkSml('если A больше B, а B больше C'));
    } else if(step===5){
      H=196;
      const xs=[56,124,192,260];
      let inn='';
      ['A','B','C','D'].forEach((t,i)=>{
        inn+=`<g class="mPop" style="animation-delay:${.12*i}s"><circle cx="${xs[i]}" cy="96" r="26" fill="${i===0?'rgba(125,224,160,.2)':i===3?'rgba(255,154,138,.18)':card}" stroke="${i===0?grn:i===3?red:gold}" stroke-width="2.2"/>${T(xs[i],104,20,ink,t,{b:1})}</g>`;
        if(i<3) inn+=T((xs[i]+xs[i+1])/2,104,20,gold,'>',{b:1});
      });
      inn+=T(56,150,12,grn,'самый большой')+T(260,150,12,red,'самый маленький');
      h=wkFrame(`<div class="wk-big">Слева — выше всех</div>`+wkHero(bg(H,inn))+
        wkRow(chip('A > B > C > D',gold))+
        wkSml('очередь по росту: первый выше всех'));
    } else if(step===6){
      H=200;
      let inn=go
        ? `<g class="mRise">${T(159,70,20,gold,'C < B < A',{b:1})}${T(159,110,16,dim,'читали справа налево')}${T(159,154,16,grn,'тот же порядок',{b:1})}</g>`
        : `<g>${T(159,70,20,gold,'A > B > C',{b:1})}${T(159,120,16,dim,'переверни вместе со знаками')}</g>`;
      h=wkFrame(`<div class="wk-big">С другого конца</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('C < B < A',blu)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('перевернуть',`visW24Act('${lk}','go')`))+
        wkSml('не новое сравнение — тот же ряд'));
    } else if(step===7){
      H=210;
      let inn=`${T(90,64,18,gold,'A > B',{b:1})}${T(228,64,18,gold,'C > B',{b:1})}
        ${T(159,108,16,dim,'оба выше B')}
        <rect x="48" y="128" width="100" height="48" rx="12" fill="${card}" stroke="${line}" stroke-width="2"/>${T(98,160,16,ink,'A ? C')}
        <rect x="170" y="128" width="100" height="48" rx="12" fill="${go?'rgba(255,215,106,.16)':card}" stroke="${go?gold:line}" stroke-width="2"/>${T(220,160,16,go?gold:ink,go?'не знаем':'?')}`;
      h=wkFrame(`<div class="wk-big">Звена не хватает</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('про A и C молчим',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('не знаем',`visW24Act('${lk}','go')`))+
        wkSml('оба выше B — и всё'));
    } else if(step===8){
      H=188;
      let inn=`<line x1="28" y1="110" x2="290" y2="110" stroke="${gold}" stroke-width="3" stroke-linecap="round"/>
        <polygon points="290,110 276,102 276,118" fill="${gold}"/>`;
      [0,3,7,10].forEach((n,i)=>{
        const x=40+n*22;
        inn+=`<line x1="${x}" y1="102" x2="${x}" y2="118" stroke="${ink}" stroke-width="2"/>${T(x,140,14,n===7?gold:ink,''+n,{b:n===7||n===3})}`;
      });
      inn+=go?`<circle class="mWalk" cx="106" cy="92" r="8" fill="${grn}"/>`: `<circle cx="106" cy="92" r="8" fill="${blu}"/>`;
      inn+=go?T(159,168,14,grn,'правее — значит больше',{b:1}):T(159,168,14,dim,'шарик стоит на тройке');
      h=wkFrame(`<div class="wk-big">Кто правее — тот больше</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('7 > 3',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('пройти',`visW24Act('${lk}','go')`))+
        wkSml('луч: вправо числа растут'));
    } else if(step===9){
      H=196;
      let inn=`<rect x="70" y="70" width="178" height="64" rx="10" fill="rgba(126,200,255,.12)" stroke="${blu}" stroke-width="2"/>
        ${T(70,58,16,gold,'3')}${T(248,58,16,gold,'7')}${T(159,108,20,ink,'x',{b:1})}
        ${T(88,150,14,dim,'дверь')}${T(230,150,14,dim,'дверь')}`;
      inn+=go?T(159,176,14,grn,'3 < x < 7 — два условия',{b:1}):T(159,176,14,dim,'коридор между 3 и 7');
      h=wkFrame(`<div class="wk-big">Коридор для x</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('больше 3 и меньше 7',blu)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('открыть коридор',`visW24Act('${lk}','go')`))+
        wkSml('двойное неравенство — две стены'));
    } else if(step===10){
      H=200;
      const nums=[3,4,5,6,7];
      let inn='';
      nums.forEach((n,i)=>{
        const x=40+i*56, inC=n>3&&n<7, on=st.lit&(1<<i);
        inn+=`<g class="mPop" style="animation-delay:${.08*i}s">
          <rect x="${x}" y="70" width="48" height="56" rx="12" fill="${on?'rgba(125,224,160,.2)':inC?card:'rgba(255,154,138,.08)'}" stroke="${on?grn:inC?gold:red}" stroke-width="2"/>
          ${T(x+24,106,20,on?grn:ink,''+n,{b:1})}</g>`;
      });
      inn+=T(159,160,14,go?grn:dim, go?'жильцы: 4, 5 и 6':'нажми 4, 5 или 6');
      h=wkFrame(`<div class="wk-big">Три жильца коридора</div>`+wkHero(bg(H,inn))+
        wkRow([4,5,6].map((n,i)=>wkBtn(''+n,`visW24Lit('${lk}',${i+1})`)).join(''))+
        wkSml('3 и 7 на пороге — внутрь не входят'));
    } else if(step===11){
      H=200;
      let inn=`<rect x="24" y="48" width="130" height="88" rx="12" fill="${go?'rgba(125,224,160,.14)':card}" stroke="${go?grn:line}" stroke-width="2"/>
        ${T(89,86,24,gold,'5 ≥ 5',{b:1})}${T(89,118,14,go?grn:dim,go?'правда':'не меньше')}
        <rect x="164" y="48" width="130" height="88" rx="12" fill="${go?'rgba(255,154,138,.12)':card}" stroke="${go?red:line}" stroke-width="2"/>
        ${T(229,86,24,red,'5 > 5',{b:1})}${T(229,118,14,go?red:dim,go?'ложь':'строго больше')}`;
      inn+=T(159,168,14,go?gold:dim, go?'чёрточка пускает равенство':'сравни два знака');
      h=wkFrame(`<div class="wk-big">Не меньше — не «больше»</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('≥ пускает равенство',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('проверить',`visW24Act('${lk}','go')`))+
        wkSml('5 ≥ 5 верно, 5 > 5 нет'));
    } else if(step===12){
      H=188;
      let inn=`<line x1="28" y1="100" x2="290" y2="100" stroke="${gold}" stroke-width="3"/>
        <polygon points="290,100 276,92 276,108" fill="${gold}"/>`;
      const marks=[{n:'−7',x:56},{n:'−3',x:110},{n:'0',x:168},{n:'3',x:230}];
      marks.forEach(m=>{ inn+=`<line x1="${m.x}" y1="92" x2="${m.x}" y2="108" stroke="${ink}" stroke-width="2"/>${T(m.x,132,14,ink,m.n,{b:1})}`; });
      inn+=go?T(159,164,14,grn,'−7 < −3 < 0 < 3',{b:1}):T(159,164,14,dim,'левее нуля — отрицательные');
      h=wkFrame(`<div class="wk-big">Левее нуля</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('дальше от нуля — меньше',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('расставить',`visW24Act('${lk}','go')`))+
        wkSml('у −7 модуль больше, само число меньше'));
    } else if(step===13){
      H=204;
      let inn=`<rect x="24" y="44" width="130" height="100" rx="12" fill="${card}" stroke="${line}" stroke-width="2"/>
        ${T(89,76,16,gold,'5 см 3 мм',{b:1})}${T(89,108,20,go?grn:ink,go?'53 мм':'?',{b:1})}${T(89,132,12,dim,'переведи')}
        <rect x="164" y="44" width="130" height="100" rx="12" fill="${card}" stroke="${line}" stroke-width="2"/>
        ${T(229,76,16,gold,'5 см 4 мм',{b:1})}${T(229,108,20,go?grn:ink,go?'54 мм':'?',{b:1})}${T(229,132,12,dim,'переведи')}`;
      inn+=go?T(159,170,16,grn,'54 мм > 53 мм',{b:1}):T(159,170,14,dim,'сначала в миллиметры');
      h=wkFrame(`<div class="wk-big">Сначала одна единица</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('54 > 53',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('перевести',`visW24Act('${lk}','go')`))+
        wkSml('сантиметры с миллиметрами не спорят'));
    } else if(step===14){
      H=196;
      let inn=`${T(159,56,18,ink,'3 < 5',{b:1})}
        ${T(159,92,16,dim,'прибавь 2 к обеим сторонам')}`;
      inn+=go?`<g class="mPop">${T(159,136,24,grn,'5 < 7',{b:1})}${T(159,168,14,gold,'знак тот же',{b:1})}</g>`:T(159,148,16,dim,'плюс не ломает знак');
      h=wkFrame(`<div class="wk-big">Плюс обеим сторонам</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('3+2 < 5+2',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW24Act('${lk}','rst')`):wkBtn('прибавить',`visW24Act('${lk}','go')`))+
        wkSml('умножение на минус — позже'));
    } else {
      H=200;
      const opts=['X','Y','Z'], ok=2;
      const sel=st.pick;
      let inn=`${T(159,48,16,ink,'X легче Y, Y легче Z',{b:1})}${T(159,76,14,dim,'X < Y < Z')}`;
      opts.forEach((t,i)=>{
        const x=46+i*90, on=sel===i;
        const col=on?(i===ok?grn:red):line;
        inn+=`<g class="mPop" style="animation-delay:${.08*i}s"><rect x="${x}" y="100" width="80" height="52" rx="12" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):card}" stroke="${col}" stroke-width="2.2"/>${T(x+40,134,20,on?col:ink,t,{b:1})}</g>`;
      });
      inn+=sel>=0?T(159,176,14,sel===ok?grn:red, sel===ok?'тяжелее всех Z':'собери цепочку по весу',{b:1}):T(159,176,14,dim,'кто тяжелее всех?');
      h=wkFrame(`<div class="wk-big">Кто тяжелее всех?</div>`+wkHero(bg(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW24Pick('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('X < Y < Z',grn)):'')+
        wkSml('правый в цепочке «<» — самый тяжёлый'));
    }
    el.innerHTML=`<div class="m24" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[24]=visW24;
  window.visW24Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW24Lit=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.lit=(st.lit||0)|(1<<i); st.go=1; chRender(0); };
  window.visW24Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.go=st.go?0:1;
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
      'Процент — это сотая часть. Представь поле из ста клеток. Одна клетка зажглась — это 1%. Сто зажглись — всё поле, 100%. Процент всегда считают от целого: от этого поля, от этой суммы, от этих трёхсот.',
      'Чтобы узнать, чему равен 1% числа, делим его на 100. У 300 один процент — три. Не тридцать и не триста: просто 300 : 100 = 3. Это цена одной клетки, если клеток сто.',
      '50% — половина. Разрежь полосу пополам: светит левая, тёмная правая. Не надо делить столбиком. Половина от 80 — 40, половина от 300 — 150. 50% = разделить на два.',
      '25% — четверть. Как пицца на четыре куска: один кусок — 25%. 80 : 4 = 20. Четверть — это сразу ответ, без «умножить на 25».',
      '10% — десятая часть. Десять столбиков, светит один. 10% от 300 — это 300 : 10 = 30. Запомни: десять процентов — раздели на десять.',
      'Общая формула на все случаи: N% от M = M : 100 · N. Сначала находим 1% (делим на сто), потом берём столько процентов, сколько просят. Два шага, не один.',
      '10% от 300. Шаг первый: 1% = 3. Шаг второй: 3 · 10 = 30. Жми «посчитать» — оба шага появятся по очереди. Не 10 и не 3: тридцать.',
      '20% от 500. 1% = 5. Потом 5 · 20 = 100. Это как пятая часть: 500 : 5 = 100. Два пути — один ответ. Жми «посчитать».',
      '25% от 80. Можно по формуле: 80 : 100 · 25 = 20. А можно сразу: четверть, 80 : 4 = 20. Если процент удобный — бери короткую дорогу.',
      'Ценник 500 рублей, скидка 20%. Скидка — это 20% от 500, то есть 100 рублей. Платишь 500 − 100 = 400. Скидка не падает с неба: это процент от цены.',
      'Ловушка. «10% от 300 — это 10?» Нет. Десять — просто число десять, а 10% — десятая часть от трёхсот. Ответ 30. Процент без «от какого числа» — пустой звук.',
      'Короткая карта. 50% — дели на 2. 25% — на 4. 20% — на 5. 10% — на 10. Если процент из этой четвёрки — столбик не нужен. Жми карту — откроется дорожка.',
      'Шкала от 0 до 100. Вся полоса — целое. Закрась 10%, 25%, 50% — увидишь, какая доля длиннее. 50% — середина, 10% — узкая щёлочка слева.',
      'Алгоритм вслух. Прочитай число M. Раздели на 100 — получил 1%. Умножь на N — получил N%. Проверь на удобной доле: если просили 10%, ответ должен быть в десять раз меньше M.',
      'Три устных. 10% от 300? Тридцать. 20% от 500? Сто. 25% от 80? Двадцать. Если язык уже не спотыкается — формула села. Ошибся — вернись на шаг с двумя клетками.',
      'Последний вопрос: сколько будет 10% от 300? 30 — десятая часть. 3 — это только 1%. 10 — забыли, от чего считаем. Выбери и не торопись.'
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
  function sky(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs><linearGradient id="m44bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#10183a"/><stop offset="1" stop-color="#0a1028"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#m44bg)"/>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="${I.line}" stroke-width="2" rx="8"/>
      ${inner}</svg>`;
  }
  const T=(x,y,s,c,t,o)=>`<text x="${x}" y="${y}" text-anchor="${(o&&o.a)||'middle'}" font-size="${s}" fill="${c}" font-weight="${(o&&o.b)?'bold':'normal'}" font-family="Georgia,serif" paint-order="stroke" stroke="#0a1028" stroke-width="3">${t}</text>`;
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||I.gold};color:${c||I.gold};font-size:16px">${t}</span>`;
  function visW44(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.q=0; st.sel=null; }
    const go=st.go||0;
    let h='', H=210;
    if(step===0){
      H=220;
      let inn='';
      const cell=13, x0=94, y0=36;
      for(let r=0;r<10;r++) for(let c=0;c<10;c++){
        const lit=go&&r===0&&c===0;
        inn+=`<rect class="${lit?'mPop':''}" x="${x0+c*cell}" y="${y0+r*cell}" width="${cell-2}" height="${cell-2}" rx="2" fill="${lit?I.gold:'#2a3a62'}" stroke="${lit?I.gold:'#4a5c88'}" stroke-width="0.8"/>`;
      }
      inn+=go?T(159,182,16,I.gold,'1 клетка из 100 = 1%',{b:1}):T(159,182,16,I.dim,'сто клеток — целое поле');
      h=wkFrame(`<div class="wk-big">Сотая часть поля</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('1% = 1 из 100',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('зажечь 1%',`visW44Act('${lk}','go')`))+
        wkSml('процент всегда от целого'));
    } else if(step===1){
      H=196;
      let inn=`<rect x="36" y="48" width="100" height="72" rx="12" fill="${I.card}" stroke="${I.gold}" stroke-width="2"/>${T(86,92,24,I.ink,'300',{b:1})}
        ${T(159,92,20,I.gold,': 100')}
        <rect x="182" y="48" width="100" height="72" rx="12" fill="${go?'rgba(125,224,160,.16)':I.card}" stroke="${go?I.grn:I.line}" stroke-width="2"/>${T(232,92,24,go?I.grn:I.ink,go?'3':'?',{b:1})}`;
      inn+=go?T(159,152,16,I.grn,'1% от 300 = 3',{b:1}):T(159,152,16,I.dim,'цена одной клетки');
      h=wkFrame(`<div class="wk-big">Один процент — делим на 100</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('300 : 100 = 3',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('разделить',`visW44Act('${lk}','go')`))+
        wkSml('не 30 и не 300 — три'));
    } else if(step===2){
      H=188;
      let inn=`<rect x="40" y="56" width="238" height="56" rx="10" fill="rgba(40,50,80,.5)" stroke="${I.line}" stroke-width="2"/>
        <rect class="mFill" x="40" y="56" width="119" height="56" rx="10" fill="rgba(255,215,106,.55)"/>
        ${T(100,90,16,I.ink,'50%',{b:1})}${T(218,90,16,I.dim,'50%')}`;
      inn+=T(159,148,16,go?I.gold:I.dim, go?'половина — дели на 2':'разрежь пополам');
      h=wkFrame(`<div class="wk-big">Половина полосы</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('50% = : 2',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('разрезать',`visW44Act('${lk}','go')`))+
        wkSml('половина от 80 — сорок'));
    } else if(step===3){
      H=210;
      const cx=110, cy=108, R=58;
      let inn=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="rgba(80,90,130,.3)" stroke="${I.line}" stroke-width="2"/>`;
      if(go) inn+=`<path class="mPop" d="M${cx} ${cy} L${cx} ${cy-R} A${R} ${R} 0 0 1 ${cx+R} ${cy} Z" fill="rgba(255,215,106,.7)"/>`;
      inn+=`<line x1="${cx}" y1="${cy-R}" x2="${cx}" y2="${cy+R}" stroke="${I.ink}" stroke-width="1.4" opacity=".5"/>
        <line x1="${cx-R}" y1="${cy}" x2="${cx+R}" y2="${cy}" stroke="${I.ink}" stroke-width="1.4" opacity=".5"/>
        ${T(230,80,16,I.gold,'25%',{b:1})}${T(230,108,14,I.dim,'один кусок')}${T(230,136,16,go?I.grn:I.ink,go?'80 : 4 = 20':'из четырёх',{b:1})}`;
      h=wkFrame(`<div class="wk-big">Четверть пиццы</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('25% = : 4',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('отрезать',`visW44Act('${lk}','go')`))+
        wkSml('четверть — сразу ответ'));
    } else if(step===4){
      H=200;
      let inn='';
      for(let i=0;i<10;i++){
        const lit=go&&i===0;
        inn+=`<rect class="${lit?'mPop':''}" x="${28+i*27}" y="50" width="22" height="${lit?90:70}" rx="6" fill="${lit?I.gold:'rgba(80,100,150,.28)'}" stroke="${lit?I.gold:I.line}" stroke-width="1.6"/>`;
      }
      inn+=go?T(159,168,16,I.grn,'10% от 300 = 30',{b:1}):T(159,168,16,I.dim,'один столбик из десяти');
      h=wkFrame(`<div class="wk-big">Десятая часть</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('10% = : 10',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('зажечь столбик',`visW44Act('${lk}','go')`))+
        wkSml('300 : 10 = 30'));
    } else if(step===5){
      H=196;
      let inn=`<rect x="20" y="50" width="84" height="64" rx="12" fill="${I.card}" stroke="${I.gold}" stroke-width="2"/>${T(62,90,18,I.ink,'M',{b:1})}
        ${T(122,90,16,I.gold,':100')}
        <rect x="148" y="50" width="64" height="64" rx="12" fill="${I.card}" stroke="${I.blu}" stroke-width="2"/>${T(180,90,16,I.blu,'1%',{b:1})}
        ${T(228,90,16,I.gold,'× N')}
        <rect x="246" y="50" width="52" height="64" rx="12" fill="${go?'rgba(125,224,160,.16)':I.card}" stroke="${go?I.grn:I.line}" stroke-width="2"/>${T(272,90,16,go?I.grn:I.ink,go?'N%':'?',{b:1})}`;
      inn+=go?T(159,148,16,I.grn,'M : 100 · N',{b:1}):T(159,148,16,I.dim,'два шага по конвейеру');
      h=wkFrame(`<div class="wk-big">Конвейер из двух шагов</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('сначала 1%, потом × N',I.gold)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('запустить',`visW44Act('${lk}','go')`))+
        wkSml('не прыгай сразу к ответу'));
    } else if(step===6){
      H=200;
      let inn=`${T(159,48,16,I.ink,'10% от 300',{b:1})}`;
      if(go>=1) inn+=`<g class="mDrop">${T(159,88,16,I.blu,'1% = 300 : 100 = 3',{b:1})}</g>`;
      if(go>=2) inn+=`<g class="mPop">${T(159,128,24,I.grn,'3 · 10 = 30',{b:1})}</g>`;
      if(!go) inn+=T(159,108,16,I.dim,'два шага по очереди');
      h=wkFrame(`<div class="wk-big">Десять процентов от трёхсот</div>`+wkHero(sky(H,inn))+
        (go>=2?wkRow(chip('= 30',I.grn)):'')+
        wkRow(go>=2?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn(go? 'второй шаг':'посчитать',`visW44Act('${lk}','go')`))+
        wkSml('не 10 и не 3 — тридцать'));
    } else if(step===7){
      H=200;
      let inn=`${T(159,48,16,I.ink,'20% от 500',{b:1})}`;
      if(go>=1) inn+=`<g class="mDrop">${T(159,88,16,I.blu,'1% = 5 · и 500 : 5',{b:1})}</g>`;
      if(go>=2) inn+=`<g class="mPop">${T(159,128,24,I.grn,'= 100',{b:1})}</g>`;
      if(!go) inn+=T(159,108,16,I.dim,'формула и пятая часть');
      h=wkFrame(`<div class="wk-big">Два пути — один ответ</div>`+wkHero(sky(H,inn))+
        (go>=2?wkRow(chip('5 · 20 = 100',I.grn)):'')+
        wkRow(go>=2?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn(go?'второй путь':'посчитать',`visW44Act('${lk}','go')`))+
        wkSml('20% — это пятая часть'));
    } else if(step===8){
      H=196;
      let inn=`<rect x="24" y="48" width="130" height="88" rx="12" fill="${I.card}" stroke="${I.line}" stroke-width="2"/>
        ${T(89,80,14,I.dim,'формула')}${T(89,112,16,go?I.grn:I.ink,go?'80:100·25':'80 : 100 · 25',{b:1})}
        <rect x="164" y="48" width="130" height="88" rx="12" fill="${go?'rgba(255,215,106,.14)':I.card}" stroke="${go?I.gold:I.line}" stroke-width="2"/>
        ${T(229,80,14,I.gold,'короткая')}${T(229,112,20,go?I.gold:I.ink,go?'80 : 4':'четверть',{b:1})}`;
      inn+=go?T(159,164,16,I.grn,'оба дают 20',{b:1}):T(159,164,14,I.dim,'удобный процент — короткая дорога');
      h=wkFrame(`<div class="wk-big">Четверть от восьмидесяти</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('= 20',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('сравнить дороги',`visW44Act('${lk}','go')`))+
        wkSml('25% = делить на 4'));
    } else if(step===9){
      H=204;
      let inn=`<rect x="70" y="40" width="178" height="120" rx="14" fill="${I.card}" stroke="${I.gold}" stroke-width="2.2"/>
        ${T(159,70,14,I.dim,'ценник')}${T(159,100,24,I.ink,'500 ₽',{b:1})}`;
      inn+=go?`<g class="mDrop">${T(159,128,16,I.red,'скидка 20% = 100',{b:1})}${T(159,150,16,I.grn,'платить 400',{b:1})}</g>`:T(159,136,16,I.dim,'скидка 20%');
      h=wkFrame(`<div class="wk-big">Скидка с ценника</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('500 − 100 = 400',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('снять скидку',`visW44Act('${lk}','go')`))+
        wkSml('скидка — процент от цены'));
    } else if(step===10){
      H=200;
      let inn=`<rect x="24" y="48" width="130" height="96" rx="12" fill="${go?'rgba(255,154,138,.12)':I.card}" stroke="${go?I.red:I.line}" stroke-width="2"/>
        ${T(89,88,20,I.red,'10',{b:1})}${T(89,118,14,I.dim,'просто десять')}
        <rect x="164" y="48" width="130" height="96" rx="12" fill="${go?'rgba(125,224,160,.14)':I.card}" stroke="${go?I.grn:I.line}" stroke-width="2"/>
        ${T(229,88,20,go?I.grn:I.ink,go?'30':'10%?',{b:1})}${T(229,118,14,I.dim,'десятая от 300')}`;
      inn+=go?T(159,168,14,I.gold,'процент без «от» — пустой звук',{b:1}):T(159,168,14,I.dim,'это не одно и то же');
      h=wkFrame(`<div class="wk-big">Не путай 10 и 10%</div>`+wkHero(sky(H,inn))+
        (go?wkRow(chip('10% от 300 = 30',I.grn)):'')+
        wkRow(go?wkBtn('сброс',`visW44Act('${lk}','rst')`):wkBtn('раскрыть ловушку',`visW44Act('${lk}','go')`))+
        wkSml('всегда спрашивай: от какого числа?'));
    } else if(step===11){
      H=210;
      const rows=[{t:'50%  →  : 2',c:I.gold},{t:'25%  →  : 4',c:I.blu},{t:'20%  →  : 5',c:I.grn},{t:'10%  →  : 10',c:I.ink}];
      let inn='';
      rows.forEach((r,i)=>{
        const show=go||st.pick===i;
        inn+=`<g class="mRise" style="animation-delay:${.08*i}s"><rect x="36" y="${36+i*38}" width="246" height="32" rx="9" fill="${show?'rgba(255,215,106,.12)':I.card}" stroke="${show?r.c:I.line}" stroke-width="1.8"/>
          ${T(159,58+i*38,16,show?r.c:I.dim,r.t,{b:1})}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Карта коротких дорог</div>`+wkHero(sky(H,inn))+
        wkRow(['50%','25%','20%','10%'].map((t,i)=>wkBtn(t,`visW44Pick('${lk}',${i})`)).join(''))+
        wkSml('удобный процент — деление'));
    } else if(step===12){
      H=188;
      const pct=[10,25,50][Math.max(0,st.pick)|0];
      const w=Math.round(2.4*pct);
      let inn=`<rect x="40" y="70" width="240" height="28" rx="8" fill="rgba(40,50,80,.5)" stroke="${I.line}" stroke-width="1.6"/>
        <rect class="mFill" x="40" y="70" width="${w}" height="28" rx="8" fill="${I.gold}"/>
        ${T(40,60,12,I.dim,'0')}${T(280,60,12,I.dim,'100')}${T(40+w,118,16,I.gold,pct+'%',{b:1})}`;
      h=wkFrame(`<div class="wk-big">Шкала от нуля до ста</div>`+wkHero(sky(H,inn))+
        wkRow(['10%','25%','50%'].map((t,i)=>wkBtn(t,`visW44Pick('${lk}',${i})`)).join(''))+
        wkSml('50% — середина, 10% — щель слева'));
    } else if(step===13){
      H=210;
      const steps=['1. Возьми число M','2. Раздели на 100 → 1%','3. Умножь на N → N%'];
      let inn='';
      steps.forEach((t,i)=>{
        inn+=`<g class="mRise" style="animation-delay:${.12*i}s"><rect x="28" y="${40+i*46}" width="262" height="38" rx="10" fill="${I.card}" stroke="${i===2?I.grn:I.gold}" stroke-width="2"/>
          ${T(159,64+i*46,16,i===2?I.grn:I.ink,t,{b:1})}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Три шага вслух</div>`+wkHero(sky(H,inn))+
        wkRow(chip('M : 100 · N',I.gold))+
        wkSml('для 10% ответ в десять раз меньше M'));
    } else if(step===14){
      H=200;
      const q=[{t:'10% от 300',a:'30'},{t:'20% от 500',a:'100'},{t:'25% от 80',a:'20'}][st.q||0];
      let inn=`${T(159,70,18,I.ink,q.t,{b:1})}`;
      inn+=go?T(159,120,32,I.grn,q.a,{b:1}):T(159,120,16,I.dim,'скажи вслух, потом открой');
      h=wkFrame(`<div class="wk-big">Три устных</div>`+wkHero(sky(H,inn))+
        wkRow(go?wkBtn((st.q||0)<2?'следующий':'сначала',`visW44Act('${lk}','nq')`):wkBtn('открыть',`visW44Act('${lk}','go')`))+
        wkSml('язык не должен спотыкаться'));
    } else {
      H=200;
      const opts=['3','30','300','15'], ok=1, sel=st.sel;
      let inn=`${T(159,48,16,I.ink,'10% от 300 = ?',{b:1})}`;
      opts.forEach((t,i)=>{
        const x=28+i*72, on=sel===i, col=on?(i===ok?I.grn:I.red):I.line;
        inn+=`<g class="mPop" style="animation-delay:${.06*i}s"><rect x="${x}" y="80" width="64" height="52" rx="12" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):I.card}" stroke="${col}" stroke-width="2"/>${T(x+32,114,18,on?col:I.ink,t,{b:1})}</g>`;
      });
      inn+=sel!=null?T(159,160,14,sel===ok?I.grn:I.red, sel===ok?'десятая часть — 30':'3 это 1%, 10 забыли «от»',{b:1}):T(159,160,14,I.dim,'выбери ответ');
      h=wkFrame(`<div class="wk-big">Сколько будет 10% от 300?</div>`+wkHero(sky(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW44T('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('300 : 100 · 10 = 30',I.grn)):'')+
        wkSml('не 3 и не 10 — тридцать'));
    }
    el.innerHTML=`<div class="m44" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[44]=visW44;
  window.visW44T=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.sel=i; chRender(0); };
  window.visW44Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW44Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go'){ if(LV.step===6||LV.step===7||LV.step===14) st.go=(st.go||0)+1; else st.go=st.go?0:1; }
    if(act==='nq'){ st.q=((st.q||0)+1)%3; st.go=0; }
    if(act==='rst') CHS[lk]={_at:st._at};
    chRender(0);
  };
  (function(){ const a=window.ARH_LESSONS||[]; for(let i=0;i<a.length;i++) if(a[i].id===44){ a[i]=L44; break; } })();
})();
