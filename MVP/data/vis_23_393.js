/* Уроки 23 и 393 · флагман выше 24/44/181.
   Своя сцена и хореография на каждый кадр, живой язык у доски, теория Петерсона без вывески.
   VISKW перекрывает vis_wk.js (393) и добавляет 23. */
(function(){
  if(window.__m23393v1css) return; window.__m23393v1css=1;
  const st=document.createElement('style');
  st.textContent=
    '#lvis .q23,#lvis .q393{width:100%;max-width:352px;margin:0 auto}'+
    '#lvis .q23 .wk-big,#lvis .q393 .wk-big{font-size:24px;text-wrap:balance}'+
    '#lvis .q23 .wk-sml,#lvis .q393 .wk-sml{font-size:16px;line-height:1.45;text-wrap:pretty}'+
    '#lvis .q23 .wk-btn,#lvis .q393 .wk-btn{min-height:44px}'+
    '@keyframes qPop{0%{transform:scale(.42);opacity:0}70%{transform:scale(1.08)}100%{transform:none;opacity:1}}'+
    '@keyframes qRise{0%{transform:translateY(16px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qDrop{0%{transform:translateY(-16px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qSlide{0%{transform:translateX(-22px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qSlideR{0%{transform:translateX(22px);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qFlip{0%{transform:rotateY(88deg);opacity:0}100%{transform:rotateY(0);opacity:1}}'+
    '@keyframes qFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'+
    '@keyframes qFillY{from{transform:scaleY(0)}to{transform:scaleY(1)}}'+
    '@keyframes qGlow{0%,100%{opacity:.35}50%{opacity:1}}'+
    '@keyframes qPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}'+
    '@keyframes qSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}'+
    '@keyframes qWag{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}'+
    '@keyframes qTick{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}'+
    '@keyframes qHand{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}'+
    '@keyframes qWrap{0%{transform:rotate(330deg)}100%{transform:rotate(405deg)}}'+
    '@keyframes qOrbit{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}'+
    '@keyframes qSun{0%{transform:translate(0,8px);opacity:.2}100%{transform:none;opacity:1}}'+
    '@keyframes qBox{0%{transform:translateY(-18px) scale(.7);opacity:0}70%{transform:translateY(3px) scale(1.04)}100%{transform:none;opacity:1}}'+
    '@keyframes qSplit{0%{transform:scaleX(1)}40%{transform:scaleX(.12)}100%{transform:scaleX(1)}}'+
    '@keyframes qWedge{0%{transform:rotate(-24deg) scale(.4);opacity:0}100%{transform:none;opacity:1}}'+
    '@keyframes qDash{0%{stroke-dashoffset:80}100%{stroke-dashoffset:0}}'+
    '@keyframes qShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'+
    '@keyframes qMark{0%{transform:scale(2.2);opacity:0}100%{transform:scale(1);opacity:1}}'+
    '@keyframes qCoin{0%{transform:translateY(0)}40%{transform:translateY(-12px)}100%{transform:translateY(-4px)}}'+
    '#lvis .qPop{transform-box:fill-box;transform-origin:center;animation:qPop .5s ease both}'+
    '#lvis .qRise{animation:qRise .5s ease both}'+
    '#lvis .qDrop{animation:qDrop .48s ease both}'+
    '#lvis .qSlide{animation:qSlide .52s ease both}'+
    '#lvis .qSlideR{animation:qSlideR .52s ease both}'+
    '#lvis .qFlip{transform-origin:center;animation:qFlip .7s ease both}'+
    '#lvis .qFill{transform-origin:left center;animation:qFill .85s ease both}'+
    '#lvis .qFillY{transform-origin:center bottom;animation:qFillY .8s ease both}'+
    '#lvis .qGlow{animation:qGlow 1.6s ease infinite}'+
    '#lvis .qPulse{transform-box:fill-box;transform-origin:center;animation:qPulse 1.4s ease-in-out infinite}'+
    '#lvis .qSpin{transform-box:fill-box;transform-origin:center;animation:qSpin 1.5s ease both}'+
    '#lvis .qWag{transform-box:fill-box;transform-origin:center;animation:qWag 1.3s ease-in-out infinite}'+
    '#lvis .qTick{transform-box:fill-box;transform-origin:center;animation:qTick .4s cubic-bezier(.2,.8,.3,1.4) both}'+
    '#lvis .qHand{transform-box:fill-box;transform-origin:center;animation:qHand 1.35s ease both}'+
    '#lvis .qWrap{transform-box:fill-box;transform-origin:center;animation:qWrap 1.1s ease both}'+
    '#lvis .qOrbit{transform-origin:159px 96px;animation:qOrbit 8s linear infinite}'+
    '#lvis .qSun{animation:qSun .7s ease both}'+
    '#lvis .qBox{transform-box:fill-box;transform-origin:center;animation:qBox .55s ease both}'+
    '#lvis .qSplit{transform-box:fill-box;transform-origin:center;animation:qSplit .8s ease both}'+
    '#lvis .qWedge{transform-box:fill-box;transform-origin:0 100%;animation:qWedge .6s ease both}'+
    '#lvis .qDash{stroke-dasharray:80;animation:qDash 1s ease both}'+
    '#lvis .qShake{animation:qShake .45s ease both}'+
    '#lvis .qMark{transform-box:fill-box;transform-origin:center;animation:qMark .45s ease both}'+
    '#lvis .qCoin{animation:qCoin .7s ease both}'+
    '#lvis .q23[data-f="1"] .qTick{animation-duration:.42s}'+
    '#lvis .q23[data-f="2"] .qFlip{animation-duration:.75s}'+
    '#lvis .q23[data-f="3"] .qSpin{animation-duration:1.4s}'+
    '#lvis .q23[data-f="4"] .qBox{animation-duration:.6s}'+
    '#lvis .q23[data-f="5"] .qRise{animation-duration:.55s}'+
    '#lvis .q23[data-f="6"] .qPulse{animation-duration:1.2s}'+
    '#lvis .q23[data-f="7"] .qWrap{animation-duration:1.15s}'+
    '#lvis .q23[data-f="8"] .qGlow{animation-duration:1.4s}'+
    '#lvis .q23[data-f="9"] .qBox{animation-duration:.5s}'+
    '#lvis .q23[data-f="10"] .qSplit{animation-duration:.85s}'+
    '#lvis .q23[data-f="11"] .qSlide{animation-duration:.6s}'+
    '#lvis .q23[data-f="12"] .qDrop{animation-duration:.5s}'+
    '#lvis .q23[data-f="13"] .qFillY{animation-duration:.9s}'+
    '#lvis .q23[data-f="14"] .qRise{animation-duration:.5s}'+
    '#lvis .q23[data-f="15"] .qPop{animation-duration:.48s}'+
    '#lvis .q23[data-f="16"] .qPop{animation-duration:.45s}'+
    '#lvis .q393[data-f="1"] .qDash{animation-duration:1.1s}'+
    '#lvis .q393[data-f="2"] .qTick{animation-duration:.4s}'+
    '#lvis .q393[data-f="3"] .qMark{animation-duration:.5s}'+
    '#lvis .q393[data-f="4"] .qGlow{animation-duration:1.5s}'+
    '#lvis .q393[data-f="5"] .qFill{animation-duration:.9s}'+
    '#lvis .q393[data-f="6"] .qPop{animation-duration:.5s}'+
    '#lvis .q393[data-f="7"] .qRise{animation-duration:.55s}'+
    '#lvis .q393[data-f="8"] .qWedge{animation-duration:.7s}'+
    '#lvis .q393[data-f="9"] .qSpin{animation-duration:.9s}'+
    '#lvis .q393[data-f="10"] .qDash{animation-duration:1s}'+
    '#lvis .q393[data-f="11"] .qSlide{animation-duration:.55s}'+
    '#lvis .q393[data-f="12"] .qShake{animation-duration:.5s}'+
    '#lvis .q393[data-f="13"] .qCoin{animation-duration:.7s}'+
    '#lvis .q393[data-f="14"] .qMark{animation-duration:.45s}'+
    '#lvis .q393[data-f="15"] .qDrop{animation-duration:.5s}'+
    '#lvis .q393[data-f="16"] .qPop{animation-duration:.45s}'+
    '@media (prefers-reduced-motion:reduce){'+
      '#lvis .qPop,#lvis .qRise,#lvis .qDrop,#lvis .qSlide,#lvis .qSlideR,#lvis .qFlip,'+
      '#lvis .qFill,#lvis .qFillY,#lvis .qGlow,#lvis .qPulse,#lvis .qSpin,#lvis .qWag,'+
      '#lvis .qTick,#lvis .qHand,#lvis .qWrap,#lvis .qOrbit,#lvis .qSun,#lvis .qBox,'+
      '#lvis .qSplit,#lvis .qWedge,#lvis .qDash,#lvis .qShake,#lvis .qMark,#lvis .qCoin{animation:none!important}}';
  document.head.appendChild(st);
})();

/* ===================== 23 · Время на часах: модуль 24 ===================== */
(function(){
  const L23={
    id:23, title:'Время на часах: модуль 24', ico:'🕐',
    src:'Математика · 3–5 класс · Время и сутки', subj:'math',
    explain:[
      'Смотри на круг. Это не обычные часы на двенадцать — это целые сутки. Двадцать четыре засечки, полночь наверху. Стрелка дошла до конца — и ты снова в начале. Сутки сами себя догоняют. Жми «зажечь круг» — засечки вспыхнут по порядку.',
      'На ручных часах круг из двенадцати. Сутки длиннее: два таких круга. Когда на электронных 13:00, короткая стрелка стоит на единице — «час дня». Не два времени, одно и то же, просто разный язык. Жми «перевернуть циферблат».',
      'Сейчас семь утра. Прокрути полные сутки — стрелка обежит весь круг и встанет туда же. Через 24 часа будет снова семь. Полный круг ничего не меняет, как полная неделя в днях. Жми «прокрутить сутки».',
      'А если часов больше, чем 24? Пятьдесят — это два полных круга и ещё два часа сверху. Пишем как в делении с остатком: 50 = 24·2 + 2. Двое суток выбрасываем, остаются два часа. Жми «разложить 50».',
      'К семи утра прибавили этот остаток — два часа. Стрелка шагнула с семи на девять. Вот и всё правило: полное число суток выкинь, остаток прибавь к сейчас. 7:00 через 50 часов — девять утра. Жми «сдвинуть стрелку».',
      'Покрути сам. Сейчас семь. Плюс час, плюс пять, плюс сутки. Стрелка бежит по кругу, а цифры не вырастают до сотни: после 23 снова 0. Это и есть счёт «по модулю 24» — по кругу суток, не по линейке.',
      'Бывает, сумма переваливает за полночь. Сейчас 22, плюс пять — это 27. Двадцать семи часов на циферблате нет. Вычти одни сутки: 27 − 24 = 3. Будет три часа ночи. Жми «перевалить полночь».',
      'Если остаток ноль — стрелка никуда не уехала. 48 часов — ровно двое суток, 72 — трое. Время то же самое. Остаток 0 в делении на 24 значит: прошло целое число суток. Жми «проверить 48».',
      'Сто часов звучит страшно, а считается так же. 100 = 24·4 + 4: четыре полных суток и ещё четыре часа. Семь плюс четыре — одиннадцать. Жми «разложить 100» — четыре коробки по 24 и хвост из четырёх.',
      'Иногда и остаток, прибавленный к сейчас, снова больше 24. Семь плюс двадцать: 27, вычитаем сутки — три часа. Правило одно: пока число часов не влезло в 0…23 — вычитай 24. Жми «ещё раз через полночь».',
      'После полудня на электронных часах уже не «три», а пятнадцать. К часам дня прибавь 12: 3 дня = 15:00, 7 вечера = 19:00. Утро до двенадцати можно не трогать. Жми «день или вечер».',
      'Полночь пишут и 0:00, и 24:00. Это одна и та же точка круга, верхняя засечка. Начался новый день — пишем ноль. Старый день только что кончился — можно сказать двадцать четыре. Жми «полночь».',
      'Наоборот тоже умеем. Двое суток и семь часов — это не «два и семь», а 2·24 + 7 = 55 часов. Частное — сколько полных кругов, остаток — где стоим. Как коробки с кубиками, только коробка на 24. Жми «собрать часы».',
      'Четыре строчки в карман. Сутки — круг из 24. Через 24 часа время то же. Лишние часы — это остаток от деления на 24. Если сумма вылезла за 23 — вычти 24, пока не влезет.',
      'Проговори вслух, не подглядывая. Семь через сутки? Семь. Семь через 50? Девять. Семь через 100? Одиннадцать. Если язык уже не спотыкается — правило село.',
      'Последний вопрос, как в тетради: сейчас 7:00. Который час будет через 24 часа? Не прибавляй двадцать четыре к семи — получишь 31, а таких часов нет. Полный круг. Выбери и не торопись.'
    ],
    check:{q:'Сейчас 7:00. Какое время будет через 24 часа?', choices:['7:00','8:00','6:00','12:00'], ans:0,
      exp:'24 часа — ровно сутки, стрелка обежала круг и встала на семь.'},
    tasks:[
      {q:'Сейчас 7:00. Который час будет через 50 часов?', kind:'unit', ans:9, tol:0,
        hints:['50 = 24·2 + 2 — двое суток и 2 часа.','7 + 2 = 9.'], sol:'50 = 24·2 + 2 → 7:00 + 2 ч = 9:00.'},
      {q:'Сейчас 7:00. Который час будет через 100 часов?', kind:'unit', ans:11, tol:0,
        hints:['100 = 24·4 + 4.','7 + 4 = 11.'], sol:'100 = 24·4 + 4 → 7:00 + 4 ч = 11:00.'}
    ]
  };
  const ink='#eef4ff', dim='#9aaccc', gold='#ffd76a', grn='#7de0a0', red='#ff9a8a', blu='#7ec8ff',
        card='rgba(16,26,48,.96)', line='#3a4c78', W=318;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function T(x,y,s,c,t,o){
    const str=''+t, a=(o&&o.a)||'middle', b=(o&&o.b)?'bold':'normal';
    let fs=s; if(str.length>24) fs=Math.max(12, Math.min(s, 280/(str.length*0.55)));
    const sw=fs>=20?3.2:2.5;
    return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" fill="${c}" font-weight="${b}" font-family="Georgia,serif" paint-order="stroke" stroke="#0b1220" stroke-width="${sw}">${esc(str)}</text>`;
  }
  function bg(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs>
        <linearGradient id="g23bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#152038"/><stop offset="1" stop-color="#0b1224"/></linearGradient>
        <linearGradient id="g23gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c9932f"/></linearGradient>
        <radialGradient id="g23face" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#1c2c4c"/><stop offset="1" stop-color="#101828"/></radialGradient>
        <filter id="f23sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g23bg)"/>
      <g opacity=".13" stroke="#4a5c8a" stroke-width="1"><line x1="40" y1="0" x2="34" y2="${H}"/><line x1="100" y1="0" x2="96" y2="${H}"/><line x1="160" y1="0" x2="157" y2="${H}"/><line x1="220" y1="0" x2="218" y2="${H}"/><line x1="280" y1="0" x2="279" y2="${H}"/></g>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="#44568c" stroke-width="2.4" rx="7"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" fill="none" stroke="#2c3a64" stroke-width="1.2" rx="4"/>
      ${inner}</svg>`;
  }
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||gold};color:${c||gold};font-size:16px">${t}</span>`;
  function polar(cx,cy,r,hour){
    const a=(hour/24)*Math.PI*2 - Math.PI/2;
    return [cx+Math.cos(a)*r, cy+Math.sin(a)*r];
  }
  function face(cx,cy,r,hour,opt){
    const o=opt||{};
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#g23face)" stroke="url(#g23gold)" stroke-width="2.4" filter="url(#f23sh)"/>`;
    for(let i=0;i<24;i++){
      const [x1,y1]=polar(cx,cy,r-2,i), [x2,y2]=polar(cx,cy, r-(i%6===0?14:8), i);
      const cls=o.tick?` class="qTick" style="animation-delay:${(.04*i).toFixed(2)}s"`:'';
      s+=`<line${cls} x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i%6===0?gold:line}" stroke-width="${i%6===0?2.4:1.2}"/>`;
    }
    [[0,'0'],[6,'6'],[12,'12'],[18,'18']].forEach(([h,lab])=>{
      const [x,y]=polar(cx,cy,r-26,h);
      s+=T(x,y+5,12, dim, lab);
    });
    if(hour!=null){
      const [hx,hy]=polar(cx,cy,r-22,hour);
      const cls=o.spin?'qSpin':(o.wrap?'qWrap':'qPulse');
      s+=`<g class="${cls}" filter="url(#f23sh)">
        <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${gold}" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="${cx}" cy="${cy}" r="6" fill="${gold}"/>
      </g>`;
    }
    return s;
  }
  function digital(x,y,hh){
    const h=((hh%24)+24)%24;
    const t=(h<10?'0':'')+h+':00';
    return `<g filter="url(#f23sh)"><rect x="${x}" y="${y}" width="86" height="36" rx="8" fill="${card}" stroke="${gold}" stroke-width="1.8"/>
      ${T(x+43,y+25,20,gold,t,{b:1})}</g>`;
  }
  function visW23(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.h=7; st.sel=null; st.q=0; }
    const go=st.go||0;
    let h='', H=210;
    if(step===0){
      H=228;
      let inn=face(112,108,64, go?7:null, {tick:1});
      if(go) inn+=`<g class="qSun">${T(112,28,14,gold,'полночь',{b:1})}</g>`+digital(210,92,7);
      else inn+=T(159,210,14,dim,'24 засечки — целые сутки');
      h=wkFrame(`<div class="wk-big">Сутки — это круг</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('24 часа = 1 круг',gold)):'')+
        (go?wkNote('Стрелка дошла до конца — и ты снова в начале. Как змея, кусающая хвост.'):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('зажечь круг',`visW23Act('${lk}','go')`))+
        wkSml('полночь наверху, дальше по кругу'));
    } else if(step===1){
      H=222;
      const show=go||st.pick>=0;
      let inn=`<g class="qFlip" filter="url(#f23sh)">
        <circle cx="86" cy="100" r="58" fill="url(#g23face)" stroke="${blu}" stroke-width="2.2"/>`;
      for(let i=0;i<12;i++){
        const a=(i/12)*Math.PI*2 - Math.PI/2;
        const x=86+Math.cos(a)*42, y=100+Math.sin(a)*42;
        inn+=T(x,y+4,11,ink, ''+(i===0?12:i));
      }
      inn+=T(86,172,14,blu,'круг из 12')+`</g>`;
      inn+=`<g class="qSlideR" filter="url(#f23sh)"><rect x="168" y="64" width="118" height="88" rx="12" fill="${card}" stroke="${gold}" stroke-width="2"/>
        ${T(227,100,24,gold, show?'13:00':'?:??',{b:1})}
        ${T(227,128,14, show?grn:dim, show?'это час дня':'электронные')}</g>`;
      inn+=show?T(159,200,14,grn,'одно время, два языка',{b:1}):T(159,200,14,dim,'двенадцать и двадцать четыре');
      h=wkFrame(`<div class="wk-big">Два круга в сутках</div>`+wkHero(bg(H,inn))+
        (show?wkRow(chip('13:00 = 1 час дня',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('перевернуть циферблат',`visW23Act('${lk}','go')`))+
        wkSml('на ручных 12, в сутках 24'));
    } else if(step===2){
      H=236;
      let inn=face(159,92,58,7,{spin:!!go});
      inn+=digital(28,168,7)+digital(204,168,7);
      inn+=go?T(159,44,14,grn,'обежала круг — снова семь',{b:1}):T(159,44,14,dim,'сейчас 7:00');
      h=wkFrame(`<div class="wk-big">Через сутки — то же</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('7:00 + 24 ч = 7:00',grn)):'')+
        (go?wkNote('Полный круг ничего не меняет. Как семь дней недели возвращают тот же день.'):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('прокрутить сутки',`visW23Act('${lk}','go')`))+
        wkSml('24 часа — ровно один круг'));
    } else if(step===3){
      H=214;
      function box(x,label,delay,lit){
        return `<g class="qBox" style="animation-delay:${delay}s" filter="url(#f23sh)">
          <rect x="${x}" y="48" width="72" height="88" rx="12" fill="${lit?'rgba(255,215,106,.16)':card}" stroke="${lit?gold:line}" stroke-width="2"/>
          ${T(x+36,88,20,lit?gold:ink,lit?'24':'',{b:1})}
          ${T(x+36,116,12,dim,label)}</g>`;
      }
      let inn=box(24,'1 сутки',0,!!go)+box(122,'2 сутки',.15,!!go);
      inn+=`<g class="qBox" style="animation-delay:.3s" filter="url(#f23sh)">
        <rect x="220" y="48" width="72" height="88" rx="12" fill="${go?'rgba(125,224,160,.16)':card}" stroke="${go?grn:line}" stroke-width="2"/>
        ${T(256,88,20,go?grn:ink,go?'+2':'+?',{b:1})}
        ${T(256,116,12,dim,'остаток')}</g>`;
      inn+=go?T(159,168,16,gold,'50 = 24·2 + 2',{b:1}):T(159,168,14,dim,'пятьдесят часов в коробки');
      inn+=go?T(159,192,14,grn,'двое суток выбрасываем',{b:1}):'';
      h=wkFrame(`<div class="wk-big">Лишнее — это остаток</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('50 = 24·2 + 2',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('разложить 50',`visW23Act('${lk}','go')`))+
        wkSml('как кубики по коробкам на 24'));
    } else if(step===4){
      H=214;
      let inn=face(100,108,68, go?9:7, {});
      inn+=`<g class="qRise">${T(230,88,16,dim,'7:00')}
        ${go?T(230,118,20,grn,'+ 2 ч',{b:1})+T(230,148,24,gold,'9:00',{b:1}):T(230,128,14,dim,'прибавь остаток')}</g>`;
      h=wkFrame(`<div class="wk-big">Остаток прибавь к сейчас</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('7 + 2 = 9',grn)):'')+
        (go?wkNote('Полные сутки выкинули. Остались два часа — и семёрка стала девяткой.'):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('сдвинуть стрелку',`visW23Act('${lk}','go')`))+
        wkSml('через 50 часов будет 9:00'));
    } else if(step===5){
      H=220;
      const hh=((st.h%24)+24)%24;
      let inn=face(112,108,64, hh, {});
      inn+=digital(210,92,hh);
      inn+=T(253,150,14,gold, hh+':00',{b:1});
      h=wkFrame(`<div class="wk-big">Покрути сам</div>`+wkHero(bg(H,inn))+
        wkRow(wkBtn('+1 ч',`visW23Act('${lk}','p1')`)+wkBtn('+5 ч',`visW23Act('${lk}','p5')`)+wkBtn('+24 ч',`visW23Act('${lk}','p24')`))+
        wkRow(wkBtn('снова 7:00',`visW23Act('${lk}','rst')`))+
        wkSml('после 23 снова 0 — это круг, не линейка'));
    } else if(step===6){
      H=220;
      let inn=face(86,100,56, go?3:22, {wrap:!!go});
      inn+=`<g class="qSplit" filter="url(#f23sh)"><rect x="168" y="54" width="118" height="108" rx="12" fill="${card}" stroke="${go?red:line}" stroke-width="2"/>
        ${T(227,88,24,go?red:ink, go?'27':'22+5',{b:1})}
        ${go?T(227,120,16,grn,'− 24',{b:1})+T(227,148,24,gold,'3:00',{b:1}):T(227,128,14,dim,'таких часов нет')}</g>`;
      h=wkFrame(`<div class="wk-big">Перевалило за полночь</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('27 − 24 = 3',grn)):'')+
        (go?wkNote('Двадцати семи часов на круге нет. Вычти одни сутки — получишь три часа ночи.'):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('перевалить полночь',`visW23Act('${lk}','go')`))+
        wkSml('22:00 + 5 ч = 3:00'));
    } else if(step===7){
      H=204;
      const rows=[{t:'24 часа',s:'остаток 0',d:'то же время'},{t:'48 часов',s:'2·24 + 0',d:'то же время'},{t:'72 часа',s:'3·24 + 0',d:'то же время'}];
      let inn='';
      rows.forEach((r,i)=>{
        inn+=`<g class="qRise" style="animation-delay:${.1*i}s" filter="url(#f23sh)">
          <rect x="24" y="${36+i*48}" width="270" height="42" rx="10" fill="${go?card:card}" stroke="${go?grn:line}" stroke-width="1.8"/>
          ${T(90,62+i*48,14,ink,r.t,{b:1})}${T(200,62+i*48,14,go?grn:dim, go?r.d:r.s)}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Остаток ноль — стоим</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('остаток 0 → время то же',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('проверить 48',`visW23Act('${lk}','go')`))+
        wkSml('целое число суток ничего не сдвигает'));
    } else if(step===8){
      H=214;
      let inn='';
      for(let i=0;i<4;i++){
        inn+=`<g class="qBox" style="animation-delay:${.08*i}s" filter="url(#f23sh)">
          <rect x="${18+i*52}" y="48" width="46" height="70" rx="8" fill="${go?'rgba(255,215,106,.14)':card}" stroke="${go?gold:line}" stroke-width="1.8"/>
          ${T(41+i*52,88,14,go?gold:dim,go?'24':'·',{b:1})}</g>`;
      }
      inn+=`<g class="qBox" style="animation-delay:.4s" filter="url(#f23sh)">
        <rect x="232" y="48" width="64" height="70" rx="8" fill="${go?'rgba(125,224,160,.16)':card}" stroke="${go?grn:line}" stroke-width="2"/>
        ${T(264,88,20,go?grn:ink,go?'+4':'+?',{b:1})}</g>`;
      inn+=go?T(159,144,16,gold,'100 = 24·4 + 4',{b:1})+T(159,170,16,grn,'7 + 4 = 11:00',{b:1}):T(159,152,14,dim,'сто часов в коробки');
      h=wkFrame(`<div class="wk-big">Сто часов — не страшно</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('7:00 + 100 ч = 11:00',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('разложить 100',`visW23Act('${lk}','go')`))+
        wkSml('четыре суток и ещё четыре часа'));
    } else if(step===9){
      H=210;
      let inn=`<g class="qSplit">${T(159,48,20,ink,'7 + 20 = 27',{b:1})}</g>`;
      if(go) inn+=`<g class="qDrop">${T(159,96,20,red,'27 > 23',{b:1})}${T(159,132,24,gold,'27 − 24 = 3',{b:1})}${T(159,168,14,grn,'будет 3:00',{b:1})}</g>`;
      else inn+=T(159,120,14,dim,'остаток 20, но 7+20 не влезает');
      h=wkFrame(`<div class="wk-big">И остаток может перевалить</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('вычитай, пока не 0…23',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('ещё раз через полночь',`visW23Act('${lk}','go')`))+
        wkSml('7:00 + 20 ч = 3:00'));
    } else if(step===10){
      H=214;
      const rows=[{a:'3 дня',b:'15:00'},{a:'7 вечера',b:'19:00'},{a:'час дня',b:'13:00'}];
      const k=st.pick>=0?st.pick:0;
      let inn='';
      rows.forEach((r,i)=>{
        const on=st.pick===i;
        inn+=`<g class="qSlide" style="animation-delay:${.1*i}s" filter="url(#f23sh)">
          <rect x="24" y="${40+i*48}" width="270" height="42" rx="10" fill="${on?'rgba(255,215,106,.14)':card}" stroke="${on?gold:line}" stroke-width="1.8"/>
          ${T(90,66+i*48,16,ink,r.a,{b:1})}${T(230,66+i*48,16,on?grn:dim, on?r.b:'+ 12?')}</g>`;
      });
      h=wkFrame(`<div class="wk-big">День и вечер — плюс 12</div>`+wkHero(bg(H,inn))+
        wkRow(rows.map((r,i)=>wkBtn(r.a,`visW23Pick('${lk}',${i})`)).join(''))+
        wkSml('после полудня к «трём» прибавь 12'));
    } else if(step===11){
      H=222;
      let inn=face(159,92,56,0,{});
      inn+=`<g class="qDrop">${T(70,180,16,go?gold:dim, go?'0:00':'?')}${T(248,180,16,go?gold:dim, go?'24:00':'?')}</g>`;
      inn+=go?T(159,36,14,grn,'одна точка круга',{b:1}):T(159,36,14,dim,'верхняя засечка');
      h=wkFrame(`<div class="wk-big">Полночь — и 0, и 24</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('0:00 = 24:00',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('полночь',`visW23Act('${lk}','go')`))+
        wkSml('новый день пишем с нуля'));
    } else if(step===12){
      H=214;
      let inn=`<g class="qFillY" filter="url(#f23sh)"><rect x="36" y="44" width="246" height="52" rx="12" fill="${card}" stroke="${gold}" stroke-width="2"/>
        ${T(159,76,18,ink,'2 суток 7 часов',{b:1})}</g>`;
      if(go) inn+=`<g class="qPop">${T(159,128,20,gold,'2 · 24 + 7',{b:1})}${T(159,160,32,grn,'55 ч',{b:1})}</g>`;
      else inn+=T(159,140,14,dim,'собери в часы');
      h=wkFrame(`<div class="wk-big">Наоборот: сутки в часы</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('частное · 24 + остаток',gold)):'')+
        (go?wkNote('Коробка на 24. Две полные и семь сверху — пятьдесят пять часов.'):'')+
        wkRow(go?wkBtn('сброс',`visW23Act('${lk}','rst')`):wkBtn('собрать часы',`visW23Act('${lk}','go')`))+
        wkSml('деление с остатком в другую сторону'));
    } else if(step===13){
      H=214;
      const items=['сутки — круг из 24','через 24 ч время то же','лишние часы = остаток : 24','вылезло за 23 — вычти 24'];
      let inn='';
      items.forEach((t,i)=>{
        inn+=`<g class="qRise" style="animation-delay:${.1*i}s" filter="url(#f23sh)">
          <rect x="28" y="${36+i*40}" width="262" height="34" rx="9" fill="${i%2?'rgba(255,215,106,.1)':card}" stroke="${gold}" stroke-width="1.6"/>
          ${T(159,58+i*40,14,ink,t,{b:1})}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Четыре строчки в карман</div>`+wkHero(bg(H,inn))+
        wkRow(chip('a = 24·q + r',gold))+
        wkSml('q — полные сутки, r — где стоим'));
    } else if(step===14){
      H=200;
      const qs=[{t:'7:00 + 24 ч',a:'7:00'},{t:'7:00 + 50 ч',a:'9:00'},{t:'7:00 + 100 ч',a:'11:00'}][st.q||0];
      let inn=`${T(159,56,18,ink,qs.t,{b:1})}`;
      inn+=go?T(159,120,32,grn,qs.a,{b:1}):T(159,120,16,dim,'скажи вслух, потом открой');
      h=wkFrame(`<div class="wk-big">Три устных</div>`+wkHero(bg(H,inn))+
        wkRow(go?wkBtn((st.q||0)<2?'следующий':'сначала',`visW23Act('${lk}','nq')`):wkBtn('открыть',`visW23Act('${lk}','go')`))+
        wkSml('язык не должен спотыкаться'));
    } else {
      H=210;
      const opts=['7:00','8:00','6:00','31:00'], ok=0, sel=st.sel;
      let inn=`${T(159,40,16,ink,'7:00 через 24 часа?',{b:1})}`;
      opts.forEach((t,i)=>{
        const x=22+i*74, on=sel===i, col=on?(i===ok?grn:red):line;
        inn+=`<g class="qPop" style="animation-delay:${.06*i}s" filter="url(#f23sh)">
          <rect x="${x}" y="70" width="68" height="56" rx="12" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):card}" stroke="${col}" stroke-width="2"/>
          ${T(x+34,106,16,on?col:ink,t,{b:1})}</g>`;
      });
      inn+=sel!=null?T(159,156,14,sel===ok?grn:red, sel===ok?'полный круг — снова семь':'31 часов нет, 8 — это плюс час',{b:1}):T(159,156,14,dim,'выбери ответ');
      h=wkFrame(`<div class="wk-big">Который час будет?</div>`+wkHero(bg(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW23T('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('7:00 + 24 ч = 7:00',grn)):'')+
        wkSml('не прибавляй 24 к семи в лоб'));
    }
    el.innerHTML=`<div class="q23" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[23]=visW23;
  window.visW23T=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.sel=i; chRender(0); };
  window.visW23Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW23Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.go=(st.go||0)+1;
    if(act==='p1') st.h=((st.h==null?7:st.h)+1)%24;
    if(act==='p5') st.h=((st.h==null?7:st.h)+5)%24;
    if(act==='p24') st.h=((st.h==null?7:st.h)+24)%24;
    if(act==='nq'){ st.q=((st.q||0)+1)%3; st.go=0; }
    if(act==='rst') CHS[lk]={_at:st._at, h:7};
    chRender(0);
  };
  (function(){ const a=window.ARH_LESSONS||[]; for(let i=0;i<a.length;i++) if(a[i].id===23){ a[i]=L23; break; } })();
})();

/* ===================== 393 · Формула Пика ===================== */
(function(){
  const L393={
    id:393, title:'Формула Пика', ico:'📏',
    src:'Математика · 5–6 класс · Олимп-6: клетки', subj:'math',
    explain:[
      'На клетчатой бумаге фигура с косыми сторонами. Клетки режутся как попало: тут треугольник, там обрубок. Считать куски — мука, легко промахнуться. Есть ход лучше: считать не клетки, а точки. Жми «посмотреть фигуру».',
      'Узел — это не клетка. Это точка, где линии сетки встречаются, крестик. Вершины нашей фигуры сидят как раз в таких крестиках. Жми «зажечь узлы» — сетка вспыхнет точками.',
      'Теперь два сорта узлов. Голубые живут строго внутри: не на стороне, не в вершине, а в комнате. Если точка стоит на линии — это уже не внутри. Жми узлы сам: внутри зажгутся голубым.',
      'Золотые — на заборе. Вершины тоже забор. И любая точка, что села на сторону, даже посередине. Их мы назовём Г — граница. Жми «зажечь границу».',
      'Сначала проверим на простой фигуре, где ответ и так виден. Прямоугольник 3 на 2: шесть целых клеток, площадь 6. Никаких косых, считать легко. Жми «посчитать клетки» — это наш якорь.',
      'В этом же прямоугольнике внутри всего два узла. Они как хозяева: вокруг каждого можно нарисовать целую клетку, и она целиком наша. Это В — внутренние. Жми «показать хозяев».',
      'На заборе десять узлов: четыре угла и точки на сторонах. Каждый «держит» кусок границы. Это Г. Жми «посчитать забор». Запомни пару: В = 2, Г = 10, площадь уже знаем — 6.',
      'Почему в формуле половина и минус один. Сдвинь сетку на полклетки. Внутренний узел накрывает целую клетку. Узел на стороне — половину. А четыре угла — по четвертинке: 4 × ¼ = 1. Если взять границу целиком пополам, углы посчитаются как две половинки вместо одной. Лишняя единица. Вычитаем. Жми «разрезать клетки».',
      'Складываем: два хозяина целиком, десять граничных пополам, минус лишняя единица. 2 + 10/2 − 1 = 2 + 5 − 1 = 6. Сошлось с клетками. Это и есть формула Пика: S = В + Г/2 − 1. Жми «сложить».',
      'Теперь косой треугольник, где клетки режутся. Вершины в узлах: (0,0), (4,0), (0,3). Площадь по обычной формуле — 4·3/2 = 6. Считаем узлы: внутри 3, на границе 8. 3 + 8/2 − 1 = 6. Та же шестёрка. Жми «проверить треугольник».',
      'Бывает, внутри пусто — ни одного голубого. Тогда S = Г/2 − 1. Тонкий треугольник: шесть точек на заборе, внутри тишина. 6/2 − 1 = 2. И площадь правда 2. Жми «пустой внутри».',
      'Ловушка. Если вершина не попала в узел — формула молчит. Она не «почти работает», она не работает. Вершины обязаны сидеть в крестиках сетки, иначе Пик не про нас. Жми «сбить вершину».',
      'Ещё сюрприз: площадь может быть с половинкой. Если Г нечётное, Г/2 — не целое. Треугольник площадью 1,5: внутри пусто, на границе пять точек. 5/2 − 1 = 1,5. Клетками так быстро не возьмёшь. Жми «половинка».',
      'Алгоритм вслух. Раз: отметь внутренние — строго в комнате. Два: отметь границу — вершины и все на сторонах. Три: S = В + Г/2 − 1. Жми узлы на квадрате 2×2: внутри должен зажечься один, на заборе — восемь, площадь 4.',
      'Частые ошибки. Считал вершину дважды — нет, она одна. Принял точку рядом со стороной за внутреннюю — если на линии, это граница. Забыл минус один — получится на клетку больше. Жми типичный промах.',
      'Последний счёт без рисунка, как на олимпиаде. В = 3, Г = 4. Чему равна площадь? В уме: три плюс четыре пополам минус один. Три плюс два минус один. Четыре. Выбери и не торопись.'
    ],
    check:{q:'В = 3, Г = 4. Чему равна площадь по формуле Пика?', choices:['4','5','6','3'], ans:0,
      exp:'S = 3 + 4/2 − 1 = 3 + 2 − 1 = 4.'},
    tasks:[
      {q:'В = 5, Г = 4. Площадь?', kind:'unit', ans:6, tol:0,
        hints:['S = В + Г/2 − 1','5 + 2 − 1 = 6.'], sol:'5 + 4/2 − 1 = 6.'},
      {q:'Что обозначает В в формуле Пика?', kind:'choice',
        choices:['узлы сетки внутри фигуры','узлы на границе','клетки внутри','стороны фигуры'], ans:0, tol:0,
        hints:['В — внутри.','Внутренние узлы, не клетки.'], sol:'В — узлы сетки строго внутри фигуры.'}
    ]
  };
  const ink='#eef4ff', dim='#9aaccc', gold='#ffd76a', grn='#7de0a0', red='#ff9a8a', blu='#7ec8ff', cyan='#5ad0e8',
        card='rgba(16,26,48,.96)', line='#3a4c78', W=318;
  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function T(x,y,s,c,t,o){
    const str=''+t, a=(o&&o.a)||'middle', b=(o&&o.b)?'bold':'normal';
    let fs=s; if(str.length>26) fs=Math.max(12, Math.min(s, 280/(str.length*0.55)));
    const sw=fs>=20?3.2:2.5;
    return `<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" fill="${c}" font-weight="${b}" font-family="Georgia,serif" paint-order="stroke" stroke="#0b1220" stroke-width="${sw}">${esc(str)}</text>`;
  }
  function bg(H,inner){
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs>
        <linearGradient id="gPbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#152038"/><stop offset="1" stop-color="#0b1224"/></linearGradient>
        <linearGradient id="gPgold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#c9932f"/></linearGradient>
        <filter id="fPsh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000" flood-opacity=".5"/></filter>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#gPbg)"/>
      <rect x="8" y="8" width="${W-16}" height="${H-16}" fill="none" stroke="#44568c" stroke-width="2.4" rx="7"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" fill="none" stroke="#2c3a64" stroke-width="1.2" rx="4"/>
      ${inner}</svg>`;
  }
  const chip=(t,c)=>`<span class="wk-chip" style="border-color:${c||gold};color:${c||gold};font-size:16px">${t}</span>`;
  const X0=40, Y0=28, CELL=32;
  const px=g=>X0+g*CELL, py=g=>Y0+g*CELL;
  function grid(n){
    let s='';
    for(let i=0;i<=n;i++){
      s+=`<line x1="${px(0)}" y1="${py(i)}" x2="${px(n)}" y2="${py(i)}" stroke="#3a5478" stroke-width="1.2"/>`;
      s+=`<line x1="${px(i)}" y1="${py(0)}" x2="${px(i)}" y2="${py(n)}" stroke="#3a5478" stroke-width="1.2"/>`;
    }
    return s;
  }
  function poly(pts,fill){
    const d=pts.map((p,i)=>(i?'L':'M')+px(p[0])+','+py(p[1])).join(' ')+' Z';
    return `<path class="qDash" d="${d}" fill="${fill||'rgba(94,208,232,.18)'}" stroke="${grn}" stroke-width="2.4"/>`;
  }
  function node(gx,gy,kind,delay){
    const col=kind==='i'?cyan:(kind==='b'?gold:(kind==='x'?red:'#6a7a9a'));
    const cls=kind==='x'?'qShake':'qTick';
    return `<g class="${cls}" style="animation-delay:${(delay||0).toFixed(2)}s" filter="url(#fPsh)"><circle cx="${px(gx)}" cy="${py(gy)}" r="${kind==='x'?7:6.5}" fill="${col}" stroke="#fff" stroke-width="1.6"/></g>`;
  }
  const RECT=[[0,0],[3,0],[3,2],[0,2]];
  const TRI=[[0,0],[4,0],[0,3]];
  const EMPTY=[[0,0],[2,0],[0,2]];
  const HALF=[[0,0],[3,1],[0,1]];
  const SQ=[[0,0],[2,0],[2,2],[0,2]];
  function visW393(el){
    const step=Math.min(15, LV.step||0);
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.sel=null; st.q=0; st.lit=0; }
    const go=st.go||0;
    let h='', H=220;
    if(step===0){
      H=256;
      let inn=grid(5)+poly([[0,1],[4,0],[5,3],[2,4],[0,3]], go?'rgba(94,208,232,.22)':'rgba(94,208,232,.08)');
      inn+=go?T(159,230,14,grn,'считать куски — мука',{b:1}):T(159,230,14,dim,'косые стороны');
      h=wkFrame(`<div class="wk-big">Клетки режутся как попало</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('ход лучше — считать точки',gold)):'')+
        (go?wkNote('На косых сторонах куски клеток. Легко промахнуться. Точки сетки не врут.'):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('посмотреть фигуру',`visW393Act('${lk}','go')`))+
        wkSml('не клетки — узлы'));
    } else if(step===1){
      H=214;
      let inn=grid(4);
      if(go){ for(let x=0;x<=4;x++) for(let y=0;y<=4;y++) inn+=node(x,y,'o',.03*(x+y)); }
      inn+=go?T(159,198,14,cyan,'крестик линий — узел',{b:1}):T(159,198,14,dim,'где линии встречаются');
      h=wkFrame(`<div class="wk-big">Узел — не клетка</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('точка пересечения',cyan)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('зажечь узлы',`visW393Act('${lk}','go')`))+
        wkSml('вершины сидят в крестиках'));
    } else if(step===2){
      H=222;
      let inn=grid(4)+poly(RECT);
      const insides=[[1,1],[2,1]];
      insides.forEach((p,i)=>{ if(go||(st.lit&(1<<i))) inn+=node(p[0],p[1],'i',.1*i); });
      inn+=T(159,198,14,go?cyan:dim, go?'строго внутри, не на линии':'жми внутренние');
      h=wkFrame(`<div class="wk-big">Голубые живут внутри</div>`+wkHero(bg(H,inn))+
        wkRow(wkBtn('узел 1',`visW393Lit('${lk}',0)`)+wkBtn('узел 2',`visW393Lit('${lk}',1)`))+
        (go||st.lit?wkRow(chip('В — внутренние',cyan)):'')+
        wkSml('если на стороне — это уже не внутри'));
    } else if(step===3){
      H=222;
      let inn=grid(4)+poly(RECT);
      const b=[[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[1,2],[0,2],[0,1]];
      if(go) b.forEach((p,i)=> inn+=node(p[0],p[1],'b',.05*i));
      inn+=go?T(244,70,16,gold,'Г = 10',{b:1}):T(159,198,14,dim,'вершины тоже забор');
      if(go) inn+=T(159,198,14,gold,'десять на периметре',{b:1});
      h=wkFrame(`<div class="wk-big">Золотые — на заборе</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('Г — граница, включая вершины',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('зажечь границу',`visW393Act('${lk}','go')`))+
        wkSml('и середина стороны — тоже Г'));
    } else if(step===4){
      H=214;
      let inn=grid(4)+poly(RECT,'rgba(125,224,160,.2)');
      if(go){
        for(let x=0;x<3;x++) for(let y=0;y<2;y++){
          inn+=`<rect class="qFill" x="${px(x)+3}" y="${py(y)+3}" width="${CELL-6}" height="${CELL-6}" rx="4" fill="rgba(125,224,160,.35)" stroke="${grn}" stroke-width="1.2"/>`;
        }
        inn+=T(159,198,16,grn,'6 целых клеток',{b:1});
      } else inn+=T(159,198,14,dim,'прямоугольник 3×2');
      h=wkFrame(`<div class="wk-big">Якорь: шесть клеток</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('площадь 6 — без спора',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('посчитать клетки',`visW393Act('${lk}','go')`))+
        wkSml('здесь ответ виден глазом'));
    } else if(step===5){
      H=214;
      let inn=grid(4)+poly(RECT);
      if(go){ inn+=node(1,1,'i',.1)+node(2,1,'i',.2); inn+=T(244,70,16,cyan,'В = 2',{b:1}); }
      inn+=go?T(159,198,14,cyan,'два хозяина целых клеток',{b:1}):T(159,198,14,dim,'кто живёт в комнате');
      h=wkFrame(`<div class="wk-big">Хозяева внутри</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('В = 2',cyan)):'')+
        (go?wkNote('Вокруг каждого внутреннего узла — целая клетка, и она наша целиком.'):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('показать хозяев',`visW393Act('${lk}','go')`))+
        wkSml('внутренний узел держит клетку'));
    } else if(step===6){
      H=214;
      let inn=grid(4)+poly(RECT);
      const b=[[0,0],[1,0],[2,0],[3,0],[3,1],[3,2],[2,2],[1,2],[0,2],[0,1]];
      if(go) b.forEach((p,i)=> inn+=node(p[0],p[1],'b',.04*i));
      inn+=go?T(244,70,16,gold,'Г = 10',{b:1})+T(159,198,14,gold,'В = 2, Г = 10, S = 6',{b:1}):T(159,198,14,dim,'узлы на периметре');
      h=wkFrame(`<div class="wk-big">Десять на заборе</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('запомни пару: 2 и 10',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('посчитать забор',`visW393Act('${lk}','go')`))+
        wkSml('площадь уже знаем — шесть'));
    } else if(step===7){
      H=226;
      let inn=`<g class="qWedge">
        <rect x="28" y="40" width="70" height="70" rx="6" fill="rgba(94,208,232,.2)" stroke="${cyan}" stroke-width="1.8"/>
        <circle cx="63" cy="75" r="7" fill="${cyan}"/>
        ${T(63,128,12,cyan,'внутри = 1')}</g>
        <g class="qWedge" style="animation-delay:.15s">
        <rect x="124" y="40" width="70" height="70" rx="6" fill="rgba(255,215,106,.16)" stroke="${gold}" stroke-width="1.8"/>
        <rect x="124" y="40" width="35" height="70" fill="rgba(255,215,106,.28)"/>
        <circle cx="159" cy="75" r="7" fill="${gold}"/>
        ${T(159,128,12,gold,'сторона = ½')}</g>
        <g class="qWedge" style="animation-delay:.3s">
        <rect x="220" y="40" width="70" height="70" rx="6" fill="rgba(255,154,138,.1)" stroke="${red}" stroke-width="1.8"/>
        <path d="M220 110 L255 110 L255 40 Z" fill="rgba(255,154,138,.35)"/>
        <circle cx="255" cy="110" r="7" fill="${red}"/>
        ${T(255,128,12,red,'угол = ¼')}</g>`;
      inn+=go?T(159,160,16,gold,'4 угла × ¼ = 1 лишняя',{b:1})+T(159,184,14,grn,'половину границы взяли с запасом',{b:1}):T(159,168,14,dim,'сдвинь сетку на полклетки');
      h=wkFrame(`<div class="wk-big">Почему /2 и почему −1</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('углы посчитались дважды как ½',gold)):'')+
        (go?wkNote('Четыре четвертинки — это 1. В «Г/2» они уже как 2. Лишнюю единицу вычитаем.'):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('разрезать клетки',`visW393Act('${lk}','go')`))+
        wkSml('для прямоугольника это видно'));
    } else if(step===8){
      H=210;
      let inn=`${T(159,48,16,ink,'2 + 10/2 − 1',{b:1})}`;
      if(go) inn+=`<g class="qSpin">${T(159,100,20,gold,'2 + 5 − 1',{b:1})}${T(159,148,32,grn,'= 6',{b:1})}</g>`;
      else inn+=T(159,120,14,dim,'сложи, как считали клетки');
      h=wkFrame(`<div class="wk-big">Формула родилась</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('S = В + Г/2 − 1',grn)):'')+
        (go?wkNote('Сошлось с шестью клетками. Оказывается, та же запись работает для любой фигуры с вершинами в узлах.'):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('сложить',`visW393Act('${lk}','go')`))+
        wkSml('внутренние + половина границы − 1'));
    } else if(step===9){
      H=240;
      let inn=grid(5)+poly(TRI);
      if(go){
        [[1,1],[2,1],[1,2]].forEach((p,i)=> inn+=node(p[0],p[1],'i',.08*i));
        [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[0,2],[0,3]].forEach((p,i)=> inn+=node(p[0],p[1],'b',.05*i+.2));
        inn+=T(250,56,14,cyan,'В=3')+T(250,76,14,gold,'Г=8');
        inn+=T(159,214,14,grn,'3 + 4 − 1 = 6 = 4·3/2',{b:1});
      } else inn+=T(159,214,14,dim,'косой треугольник 4×3');
      h=wkFrame(`<div class="wk-big">Косой — и тоже шесть</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('Пик = обычная площадь',grn)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('проверить треугольник',`visW393Act('${lk}','go')`))+
        wkSml('клетки режутся, узлы — нет'));
    } else if(step===10){
      H=214;
      let inn=grid(4)+poly(EMPTY,'rgba(255,215,106,.16)');
      if(go){
        [[0,0],[1,0],[2,0],[0,1],[0,2],[1,1]].forEach((p,i)=> inn+=node(p[0],p[1],'b',.07*i));
        inn+=T(230,70,16,gold,'Г = 6',{b:1})+T(230,94,16,cyan,'В = 0',{b:1});
        inn+=T(159,198,14,grn,'6/2 − 1 = 2',{b:1});
      } else inn+=T(159,198,14,dim,'внутри никого');
      h=wkFrame(`<div class="wk-big">Пусто внутри</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('S = Г/2 − 1',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('пустой внутри',`visW393Act('${lk}','go')`))+
        wkSml('точка на гипотенузе — это граница'));
    } else if(step===11){
      H=214;
      let inn=grid(4);
      inn+=`<path d="M ${px(0)} ${py(3)} L ${px(4)} ${py(3)} L ${px(2.4)} ${py(0.7)} Z" fill="rgba(255,154,138,.16)" stroke="${red}" stroke-width="2.2" class="qShake"/>`;
      inn+=node(0,3,'b',0)+node(4,3,'b',.1);
      inn+=go?node(2.4,0.7,'x',.2):`<circle cx="${px(2.4)}" cy="${py(0.7)}" r="6" fill="${dim}"/>`;
      inn+=go?T(159,198,14,red,'вершина мимо узла — Пик молчит',{b:1}):T(159,198,14,dim,'верхняя вершина села между линий');
      h=wkFrame(`<div class="wk-big">Вершины только в узлах</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('иначе формула не про нас',red)):'')+
        (go?wkNote('Не «почти». Если хотя бы одна вершина не в крестике — считать Пиком нельзя.'):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('сбить вершину',`visW393Act('${lk}','go')`))+
        wkSml('условие, не мелочь'));
    } else if(step===12){
      H=214;
      let inn=grid(4)+poly(HALF,'rgba(255,215,106,.18)');
      if(go){
        [[0,0],[3,1],[0,1],[1,1],[2,1]].forEach((p,i)=> inn+=node(p[0],p[1],'b',.08*i));
        inn+=T(230,56,14,gold,'Г = 5')+T(159,198,16,grn,'5/2 − 1 = 1,5',{b:1});
      } else inn+=T(159,198,14,dim,'нечётное Г даёт половинку');
      h=wkFrame(`<div class="wk-big">Площадь с половинкой</div>`+wkHero(bg(H,inn))+
        (go?wkRow(chip('Г нечётное → S = □,5',gold)):'')+
        wkRow(go?wkBtn('сброс',`visW393Act('${lk}','rst')`):wkBtn('половинка',`visW393Act('${lk}','go')`))+
        wkSml('клетками так быстро не возьмёшь'));
    } else if(step===13){
      H=226;
      let inn=grid(3)+poly(SQ);
      const insides=[[1,1]];
      const border=[[0,0],[1,0],[2,0],[2,1],[2,2],[1,2],[0,2],[0,1]];
      if(st.lit&1) insides.forEach(p=> inn+=node(p[0],p[1],'i',0));
      if(st.lit&2) border.forEach((p,i)=> inn+=node(p[0],p[1],'b',.04*i));
      const S=(st.lit&1)&&(st.lit&2);
      inn+=S?T(159,210,14,grn,'В=1, Г=8 → 1+4−1=4',{b:1}):T(159,210,14,dim,'отметь внутри, потом забор');
      h=wkFrame(`<div class="wk-big">Три шага вслух</div>`+wkHero(bg(H,inn))+
        wkRow(wkBtn('1 · внутри',`visW393Lit('${lk}',0)`)+wkBtn('2 · граница',`visW393Lit('${lk}',1)`))+
        (S?wkRow(chip('S = 1 + 8/2 − 1 = 4',grn)):'')+
        wkSml('квадрат 2×2: площадь 4, как 2·2'));
    } else if(step===14){
      H=214;
      const misses=[{t:'вершину посчитал дважды',d:'она одна'},{t:'точка на стороне → «внутри»',d:'это граница'},{t:'забыл минус один',d:'на клетку больше'}];
      const k=st.pick>=0?st.pick:0;
      let inn='';
      misses.forEach((m,i)=>{
        const on=st.pick===i;
        inn+=`<g class="qDrop" style="animation-delay:${.1*i}s" filter="url(#fPsh)">
          <rect x="24" y="${36+i*50}" width="270" height="44" rx="10" fill="${on?'rgba(255,154,138,.12)':card}" stroke="${on?red:line}" stroke-width="1.8"/>
          ${T(159,54+i*50,14,on?red:ink,m.t,{b:1})}
          ${on?T(159,72+i*50,12,grn,m.d):''}</g>`;
      });
      h=wkFrame(`<div class="wk-big">Три промаха</div>`+wkHero(bg(H,inn))+
        wkRow(misses.map((_,i)=>wkBtn(''+(i+1),`visW393Pick('${lk}',${i})`)).join(''))+
        wkSml('на линии — граница, −1 не украшение'));
    } else {
      H=210;
      const opts=['4','5','6','3'], ok=0, sel=st.sel;
      let inn=`${T(159,40,16,ink,'В = 3, Г = 4. Площадь?',{b:1})}`;
      opts.forEach((t,i)=>{
        const x=28+i*70, on=sel===i, col=on?(i===ok?grn:red):line;
        inn+=`<g class="qPop" style="animation-delay:${.06*i}s" filter="url(#fPsh)">
          <rect x="${x}" y="70" width="62" height="56" rx="12" fill="${on?(i===ok?'rgba(125,224,160,.16)':'rgba(255,154,138,.14)'):card}" stroke="${col}" stroke-width="2"/>
          ${T(x+31,106,24,on?col:ink,t,{b:1})}</g>`;
      });
      inn+=sel!=null?T(159,156,14,sel===ok?grn:red, sel===ok?'3 + 2 − 1 = 4':'В + Г/2 − 1',{b:1}):T(159,156,14,dim,'в уме: три плюс половина четырех');
      h=wkFrame(`<div class="wk-big">Счёт без рисунка</div>`+wkHero(bg(H,inn))+
        wkRow(opts.map((t,i)=>wkBtn(t,`visW393T('${lk}',${i})`)).join(''))+
        (sel===ok?wkRow(chip('S = 3 + 4/2 − 1 = 4',grn)):'')+
        wkSml('как на олимпиаде: только В и Г'));
    }
    el.innerHTML=`<div class="q393" data-f="${step+1}" style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[393]=visW393;
  window.visW393T=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.sel=i; chRender(0); };
  window.visW393Pick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; st.go=1; chRender(0); };
  window.visW393Lit=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.lit=(st.lit||0)|(1<<i); st.go=1; chRender(0); };
  window.visW393Act=function(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.go=(st.go||0)+1;
    if(act==='rst') CHS[lk]={_at:st._at};
    chRender(0);
  };
  (function(){ const a=window.ARH_LESSONS||[]; for(let i=0;i<a.length;i++) if(a[i].id===393){ a[i]=L393; break; } })();
})();
