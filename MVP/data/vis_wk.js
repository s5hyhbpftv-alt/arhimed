/* Волна «неделя и остатки»: уроки 12 (Остатки при делении) и 17 (Дни недели и остатки).
   Без комиксов: обычные уроки с explain (9 шагов) + свой интерактивный SVG-виджет на каждый шаг.
   Загружается ПОСЛЕ vis_kl.js, поэтому перекрывает комикс-версию урока 17.
   Диспетчер: window.VISKW[id] — вызывается первым в chRender/renderLessonVis (в lessons.js). */
window.VISKW = window.VISKW || {};

/* ===== Общий UI-кит «АРХИМЕД»: аккуратная типографика, ничего не вылезает ===== */
(function(){
  if(window.__wkCssDone) return; window.__wkCssDone=1;
  const st=document.createElement('style');
  st.textContent=
    '#lvis g.wv-pop,#lvis rect.wv-pop,#lvis circle.wv-pop,#lvis text.wv-pop{transform-box:fill-box;transform-origin:center;}'+
    '@keyframes wvPop{0%{transform:translateY(10px) scale(.95);opacity:0}70%{transform:translateY(-2px) scale(1.005);opacity:1}100%{transform:none;opacity:1}}'+
    '.wk-frame{background:linear-gradient(180deg,rgba(26,52,40,.92),rgba(15,30,23,.95));border:1px solid #3d5c49;border-radius:18px;padding:9px 10px 10px;max-width:344px;margin:0 auto;overflow:hidden;}'+
    '.wk-hero{display:flex;justify-content:center;}'+
    '.wk-big{font-size:19px;color:#ffd76a;font-family:Georgia,serif;line-height:1.25;text-align:center;padding:0 4px;}'+
    '.wk-sml{color:#d8c9a8;font-size:13.5px;line-height:1.55;max-width:236px;text-align:center;margin:0 auto;}'+
    '.wk-row{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;align-items:center;}'+
    '.wk-chip{display:inline-block;padding:3px 10px;border-radius:999px;background:rgba(255,255,255,.05);border:1.5px solid #3d5c49;font-size:13.5px;color:#e8dcc8;}'+
    '.wk-ans{font-size:19px;font-weight:bold;font-family:Georgia,serif;text-align:center;line-height:1.3;}'+
    '.wk-btn{padding:8px 12px;font-size:13px;border-radius:10px;border:1px solid #3d5c49;background:rgba(255,255,255,.06);color:#ffe9c9;cursor:pointer;font-weight:bold;}'+
    '.wk-btn:active{transform:scale(.96);}';
  document.head.appendChild(st);
})();
const wkBig=t=>`<div class="wk-big">${t}</div>`;
const wkSml=t=>`<div class="wk-sml">${t}</div>`;
const wkChip=(t,c)=>`<span class="wk-chip" style="border-color:${c||'#3d5c49'}">${t}</span>`;
const wkPill=(t,c)=>`<span style="display:inline-block;padding:4px 13px;border-radius:12px;background:rgba(255,255,255,.06);border:2px solid ${c||'#ffd76a'};font-family:Georgia,serif;font-size:18px;font-weight:bold;color:${c||'#ffd76a'}">${t}</span>`;
const wkAns=(t,c)=>`<div class="wk-ans" style="color:${c||'#8fd1a8'}">${t}</div>`;
const wkRow=(...x)=>`<div class="wk-row">${x.join('')}</div>`;
const wkBtn=(t,on)=>`<button class="wk-btn" onclick="${on}">${t}</button>`;
const wkFrame=(inner)=>`<div class="wk-frame"><div class="wk-col" style="display:flex;flex-direction:column;gap:7px;align-items:center">${inner}</div></div>`;
const wkHero=(svg)=>`<div class="wk-hero" style="width:100%">${svg}</div>`;
const wkNote=(t,c)=>`<div style="font-size:13px;color:${c||'#cfe0cf'};text-align:center;line-height:1.45">${t}</div>`;
const wkP=(t)=>`<div class="wv-pop">${t}</div>`;
const fitTxt=(x,y,boxW,txt,size,fill,w)=>{let s=size;const est=txt.length*s*0.62+4;if(est>boxW)s=Math.max(8.5,Math.floor((boxW-4)/(txt.length*0.62)));return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s}" fill="${fill}"${w?' font-weight="bold"':''} font-family="Georgia,serif">${txt}</text>`;};

/* ================= УРОК 12 · Остатки при делении (v6) ================= */
(function(){
  if(!window.__wk12v6css){
    window.__wk12v6css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .w6in{animation:w6In .5s ease both;}'+
      '@keyframes w6In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .w6pop{animation:w6Pop .5s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes w6Pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}';
    document.head.appendChild(st);
  }
  const L12 = {
    id: 12, title: 'Остатки при делении', ico: '🧱',
    src: 'Математика · 5 класс · Деление с остатком', subj: 'math',
    explain: [
      'Склад конструктора Архимеда: надо разложить 17 кубиков в коробки по 5 кубиков. Получается 3 полные коробки (15 кубиков) и остаются 2 кубика, которым коробки не хватило. Эти «лишние» кубики и есть ОСТАТОК. Записываем так: 17 = 5 · 3 + 2.',
      'Что такое остаток? Делим 17 на 5: по 5 кубиков помещается 3 раза — это частное 3, и остаётся 2 кубика — остаток. Проверка всегда одна: делитель умножить на частное и прибавить остаток: 5 · 3 + 2 = 17. Всё сходится!',
      'Запомни формулу деления с остатком: делимое = делитель · частное + остаток. У нас: 17 = 5 · 3 + 2. И обязательное правило: остаток всегда меньше делителя. Эту формулу используют в любой задаче с остатком.',
      'Остаток всегда меньше делителя: при делении на 5 остаток бывает только 0, 1, 2, 3 или 4. Остаток 5 невозможен: пять кубиков снова собрались бы в целую коробку! Покрути кнопки и посмотри, как остатки меняются при делении на 4 и на 3.',
      'Остатки идут по кругу: 6 : 5 = 1 и остаток 1, 7 : 5 — остаток 2, 8 — остаток 3, 9 — остаток 4, 10 — остаток 0, а 11 — снова остаток 1. Каждые 5 чисел всё повторяется!',
      'Числа с одинаковым остатком образуют «семью» — они живут на одной улице! Остаток 2 при делении на 5 дают числа 2, 7, 12, 17, 22… Дома семьи стоят через 5 номеров: шаг семьи равен делителю.',
      'Считаем членов семьи: сколько чисел от 1 до 40 дают остаток 2 при делении на 5? Это числа 2, 7, 12, …, 37 — всего 8. Формула: (37 − 2) : 5 + 1 = 7 + 1 = 8. Промежутков между домами 7, а самих домов — на один больше!',
      'Остаток 0 — это когда число делится нацело. Кратные 7: 7, 14, 21, …, 98 — у всех остаток 0 при делении на 7. Сколько таких чисел от 1 до 100? 100 : 7 = 14 и остаток 2 → ровно 14! Проверь себя в тесте ниже.',
      'Проверь себя: найди остаток при делении 47 на 5. Ближайшее кратное 5, не большее 47, — это 45 = 5 · 9. 47 − 45 = 2. Остаток 2! Теперь жми «Понял! Проверю себя».'
    ],
    check: { q: 'Остаток при делении 47 на 5 равен…', choices: ['1', '2', '3', '4'], ans: 1,
      exp: '45 делится на 5, значит 47 − 45 = 2.' },
    tasks: [
      { q: 'Сколько чисел от 1 до 40 дают остаток 2 при делении на 5?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Это числа 2, 7, 12, …, 37.', 'Шаг 5: (37 − 2) : 5 + 1', '35 : 5 + 1 = 8.'], sol: '(37 − 2)/5 + 1 = 8 чисел с остатком 2.' },
      { q: 'Сколько чисел от 1 до 100 делятся на 7?', kind: 'unit', ans: 14, tol: 0,
        hints: ['Это кратные 7: 7, 14, …, 98.', '98 : 7 = 14.', 'Ответ: 14 чисел.'], sol: 'Кратные 7 до 100: 98 : 7 = 14 чисел.' }
    ]
  };
  const G={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a'};
  const BC=['#5aa0d8','#6fbf7a','#e0b64d','#d98ab0','#e08a55'];
  const Q12=[
    {q:'Сколько чисел от 1 до 40 дают остаток 2 при делении на 5?',opts:['7','8','9'],ans:1},
    {q:'Сколько чисел от 1 до 100 делятся на 7?',opts:['13','14','15'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q12[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?G.green:G.red; tc=i===T.ans?G.green:G.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:70px;font-size:18px" onclick="visW12T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">🎉 верно! Оба теста решены!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">✅ верно! Домов-членов семьи 8</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">❌ формула: (последнее − первое) : шаг + 1</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW12Act('${lk}','nq')`):'';
    const rst=wkBtn('↺ заново',`visW12Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:12px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW12(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.n==null) st.n=17;
      const n=st.n, b=Math.floor(n/5), rem=n%5;
      const showB=Math.min(b,4);
      let boxes='';
      for(let g=0;g<showB;g++){
        boxes+=`<div class="w6in" style="animation-delay:${(g*0.12).toFixed(2)}s;display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="width:80px;min-height:56px;border:2px solid #7fae8f;border-radius:12px;background:rgba(255,255,255,.04);padding:6px;display:flex;flex-wrap:wrap;gap:3px;align-content:flex-start">
            ${[0,1,2,3,4].map(j=>`<div class="w6pop" style="width:15px;height:11px;border-radius:3px;background:${BC[(g*5+j)%5]}"></div>`).join('')}
          </div>
          <span style="font-size:13px;color:#9ec0a8">коробка ${g+1}</span></div>`;
      }
      const remHtml = rem>0
        ? `<div class="w6in" style="animation-delay:${(showB*0.12+0.1).toFixed(2)}s;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:80px;min-height:56px;border:2px dashed ${G.gold};border-radius:12px;background:rgba(217,164,65,.07);padding:6px;display:flex;flex-wrap:wrap;gap:3px;align-content:flex-start">${[0,1,2,3].slice(0,rem).map(j=>`<div style="width:15px;height:11px;border-radius:3px;background:${G.gold}"></div>`).join('')}</div>
            <span style="font-size:13px;color:${G.gold}">остаток ${rem}</span></div>`
        : `<span style="font-size:13px;color:#8fd1a8">всё разложилось ровно!</span>`;
      h=wkFrame(wkBig('Склад конструктора 🧱')+
        wkRow(wkChip('кубиков: '+n, G.blue),wkChip('по 5 в коробку', G.green))+
        `<div class="wk-row" style="gap:10px;align-items:flex-start">${boxes}${remHtml}</div>`+
        wkRow(wkPill(n+' = 5·'+b+' + '+rem, G.gold))+
        wkRow(wkBtn('➕ ещё 5 кубиков',`visW12Act('${lk}','n')`),wkBtn('↺ 17',`visW12Act('${lk}','rst')`))+
        wkSml('полных коробок: '+b+' · остаток: '+rem+' — то, что не поместилось'));
    } else if(step===1){
      const W=318, top=18;
      let s='';
      for(let g=0;g<3;g++) for(let j=0;j<5;j++){
        const x=16+g*72+j*14, y=top+(g%2?22:0);
        s+=`<rect class="w6pop" x="${x}" y="${y}" width="12" height="10" rx="2.5" fill="${BC[(g*5+j)%5]}" style="animation-delay:${((g*5+j)*0.04).toFixed(2)}s"/>`;
      }
      for(let j=0;j<2;j++) s+=`<rect class="w6pop" x="244"+'' y="${top+22}" width="12" height="10" rx="2.5" fill="${G.gold}" style="animation-delay:.4s"/>`;
      h=wkFrame(wkBig('17 кубиков делим на 5')+
        wkHero(`<svg width="${W}" height="70" viewBox="0 0 ${W} 70" style="display:block">${s}</svg>`)+
        wkRow(wkPill('частное 3 — группы по 5', G.blue),wkPill('остаток 2', G.gold))+
        wkAns('проверка: 5 · 3 + 2 = 17 ✔', G.green)+
        wkSml('частное — сколько раз поместилось по 5, остаток — что осталось'));
    } else if(step===2){
      const box=(t,c,delay)=>`<span class="w6in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:10px 14px;border-radius:14px;border:2.5px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:22px;color:${c};font-weight:bold;min-width:74px">${t}</span>`;
      const op=(t)=>`<span style="font-size:30px;color:#cfe0cf;font-weight:bold;padding:0 2px">${t}</span>`;
      h=wkFrame(wkBig('Формула деления с остатком')+
        `<div class="wk-row" style="gap:6px">${box('17',G.blue)}${op('=')}${box('5',G.green,0.1)}${op('·')}${box('3',G.gold,0.2)}${op('+')}${box('2',G.red,0.3)}</div>`+
        wkRow(wkPill('делимое 17', G.blue),wkPill('делитель 5', G.green),wkPill('частное 3', G.gold),wkPill('остаток 2', G.red))+
        wkAns('остаток всегда меньше делителя: 2 < 5', G.green)+
        wkSml('делимое = делитель · частное + остаток'));
    } else if(step===3){
      if(st.d==null) st.d=5;
      const k=st.d;
      const cols=[G.blue,G.green,G.gold,'#e8a0d8','#ff9a7a'];
      const data=[[],[],[],[],[]];
      for(let nn=1;nn<=15;nn++) data[nn%k].push(nn);
      const cells='';
      let boxes='';
      for(let p=0;p<k;p++){
        boxes+=`<div class="w6in" style="animation-delay:${(p*0.07).toFixed(2)}s;flex:1;min-width:52px;text-align:center;border:2px solid ${cols[p]};border-radius:12px;padding:6px 2px;background:rgba(255,255,255,.04)">
          <div style="font-size:13px;color:${cols[p]};font-weight:bold">остаток ${p}</div>
          <div style="font-family:Georgia,serif;font-size:24px;color:#fff;font-weight:bold;margin:2px 0">${p}</div>
          <div style="font-size:12px;color:#9ec0a8">${data[p].slice(0,3).join('·')}</div>
        </div>`;
      }
      h=wkFrame(wkBig('Остаток меньше делителя')+
        wkRow(wkChip('делим на '+k, G.gold))+
        `<div style="display:flex;gap:6px;width:100%;justify-content:center">${boxes}</div>`+
        wkRow(wkBtn('делим на 5',`visW12Act('${lk}','d5')`),wkBtn('делим на 4',`visW12Act('${lk}','d4')`),wkBtn('делим на 3',`visW12Act('${lk}','d3')`))+
        wkSml('остаток 5 не бывает: 5 кубиков снова собрались бы в коробку!'));
    } else if(step===4){
      const cols=[G.blue,G.green,G.gold,'#e8a0d8','#ff9a7a'];
      const nums=[6,7,8,9,10,11,12,13,14,15];
      let tiles='';
      nums.forEach((nn,i)=>{
        tiles+=`<div class="w6in" style="animation-delay:${(i*0.05).toFixed(2)}s;display:flex;flex-direction:column;align-items:center;border:2px solid ${cols[nn%5]};border-radius:10px;padding:4px 8px;min-width:44px">
          <span style="font-family:Georgia,serif;font-size:19px;color:#fff;font-weight:bold">${nn}</span>
          <span style="font-size:14px;color:${cols[nn%5]};font-weight:bold">${nn%5}</span></div>`;
      });
      h=wkFrame(wkBig('Остатки идут по кругу')+
        `<div class="wk-row" style="gap:5px">${tiles}</div>`+
        wkAns('цвет числа — его остаток при делении на 5', G.gold)+
        wkSml('6→1 · 7→2 · … · 10→0 · 11→1 — каждые 5 чисел всё повторяется'));
    } else if(step===5){
      const mem=[2,7,12,17];
      const W=318, top=34;
      let s='';
      s+=`<rect x="6" y="86" width="306" height="26" rx="6" fill="#24372c"/><line x1="8" y1="98" x2="310" y2="98" stroke="#ffd76a" stroke-width="2" stroke-dasharray="12 9"/>`;
      mem.forEach((m,i)=>{
        const x=14+i*76;
        s+=`<g class="w6pop" style="animation-delay:${(i*0.15).toFixed(2)}s"><polygon points="${x},52 ${x+52},52 ${x+26},34" fill="${i%2?'#4f8a63':'#4a7da8'}"/><rect x="${x+6}" y="52" width="40" height="36" rx="4" fill="${i%2?'#3a6b4c':'#38618c'}"/><text x="${x+26}" y="72" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">${m}</text></g>`;
        if(i<mem.length-1) s+=`<text x="${x+60}" y="72" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">+5</text>`;
      });
      h=wkFrame(wkBig('Улица семьи «остаток 2» 🏘')+
        wkHero(`<svg width="${W}" height="118" viewBox="0 0 ${W} 118" style="display:block">${s}</svg>`)+
        wkRow(wkPill('2 = 5·0+2', G.blue),wkPill('7 = 5·1+2', G.green),wkPill('12 = 5·2+2', G.gold))+
        wkSml('дома стоят через 5 номеров: шаг семьи равен делителю'));
    } else if(step===6){
      const mem=[2,7,12,17,22,27,32,37];
      const W=318, x0=14, L=290, y0=34;
      let s='';
      s+=`<rect x="${x0-8}" y="24" width="${L+16}" height="22" rx="7" fill="#24372c"/><line x1="${x0}" y1="35" x2="${x0+L}" y2="35" stroke="#ffd76a" stroke-width="1.5" stroke-dasharray="10 8"/>`;
      mem.forEach((m,i)=>{
        const x=x0+L*m/41;
        s+=`<g class="w6pop" style="animation-delay:${(i*0.09).toFixed(2)}s"><rect x="${x-10}" y="8" width="20" height="16" rx="3" fill="#ffd76a"/><text x="${x}" y="20" text-anchor="middle" font-size="11" fill="#0d1a13" font-weight="bold">${m}</text></g>`;
      });
      h=wkFrame(wkBig('Сколько домов до 40?')+
        wkHero(`<svg width="${W}" height="58" viewBox="0 0 ${W} 58" style="display:block">${s}</svg>`)+
        wkRow(wkPill('(37−2):5 + 1', G.blue),wkPill('= 8 домов', G.green))+
        wkSml('промежутков 7, домов на один больше — 8'));
    } else if(step===7){
      const W=318, x0=18, L=282, y0=30;
      let s='';
      s+=`<circle cx="${x0}" cy="${y0}" r="11" fill="rgba(232,106,90,.2)" stroke="${G.red}" stroke-width="2"/><text x="${x0}" y="${y0+4}" text-anchor="middle" font-size="11" fill="#ffcfc2">0</text>`;
      s+=`<line x1="${x0+12}" y1="${y0}" x2="${x0+L}" y2="${y0}" stroke="#3d5c49" stroke-width="3"/>`;
      for(let k=0;k<=100;k+=10){ const x=x0+L*k/100; s+=`<line x1="${x}" y1="${y0-5}" x2="${x}" y2="${y0+5}" stroke="#5b6b58" stroke-width="1.3"/>`; }
      for(let k=7;k<=98;k+=7){
        const x=x0+L*k/100;
        s+=`<g class="w6pop" style="animation-delay:${((k/7-1)*0.05).toFixed(2)}s"><path d="M${x} ${y0-9} l4 7 h-8 z" fill="${G.green}"/><line x1="${x}" y1="${y0+1}" x2="${x}" y2="${y0-7}" stroke="${G.green}" stroke-width="1.6"/></g>`;
      }
      h=wkFrame(wkBig('Поезд кратных 7 🚂')+
        wkHero(`<svg width="${W}" height="52" viewBox="0 0 ${W} 52" style="display:block">${s}</svg>`)+
        quiz(lk,st)+
        wkSml('флажки на 7, 14, …, 98 — 14 штук · 100 : 7 = 14 (остаток 2)'));
    } else {
      h=wkFrame(wkBig('Проверь себя: 47 : 5')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <g class="w6pop"><rect x="16" y="16" width="140" height="58" rx="13" fill="rgba(127,209,160,.1)" stroke="${G.green}" stroke-width="2.6"/><text x="86" y="38" text-anchor="middle" font-size="13" fill="#9ec0a8">кратное 5 ≤ 47</text><text x="86" y="62" text-anchor="middle" font-size="24" fill="${G.green}" font-weight="bold" font-family="Georgia,serif">45</text></g>
          <text x="166" y="52" text-anchor="middle" font-size="28" fill="#cfe0cf" font-weight="bold">−</text>
          <g class="w6pop" style="animation-delay:.2s"><rect x="178" y="16" width="130" height="58" rx="13" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="2"/><text x="243" y="38" text-anchor="middle" font-size="13" fill="#9ec0a8">47 − 45</text><text x="243" y="62" text-anchor="middle" font-size="24" fill="${G.gold}" font-weight="bold" font-family="Georgia,serif">= 2</text></g>
          <text x="165" y="90" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">остаток 2!</text>
        </svg>`)+
        wkSml('жми «Понял! Проверю себя» — там остаток 47 на 5'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[12]=visW12;
  function visW12T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW12T=visW12T;
  function visW12Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    const POOL=[17,22,27,32,18,23];
    if(act==='n'){ const i0=POOL.indexOf(st.n==null?17:st.n); st.n=POOL[(i0+1)%POOL.length]; }
    if(act==='d5') st.d=5;
    if(act==='d4') st.d=4;
    if(act==='d3') st.d=3;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW12Act=visW12Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===12){ window.ARH_LESSONS[i]=L12; break; } } })();
})();

/* ================= УРОК 17 · Дни недели и остатки (v3) ================= */
(function(){
  const L17 = {
    id: 17, title: 'Дни недели и остатки', ico: '📅',
    src: 'Математика · ВсОШ-стиль · Календарь и остатки (mod 7)', subj: 'math',
    explain: [
      'Дни недели повторяются каждые 7 дней: понедельник, вторник, среда, четверг, пятница, суббота, воскресенье — и снова понедельник. Это как часы, на циферблате которых 7 делений. Через 7 дней наступит ТОТ ЖЕ день недели!',
      'Сегодня понедельник. Какой день будет через 10 дней? 10 дней — это 1 полная неделя (7 дней) и ещё 3 дня. Полная неделя возвращает нас в понедельник, значит, важен только остаток — 3 дня.',
      'Удобно делить с остатком на 7: 10 = 7 · 1 + 3. Частное 1 — это полные недели, их выбрасываем. Остаток 3 — на столько дней сдвигаемся вперёд по кругу недели. Так работает счёт по модулю 7.',
      'Сдвигаемся на 3 дня от понедельника: понедельник → вторник (1) → среда (2) → четверг (3). Значит, через 10 дней будет ЧЕТВЕРГ! Остаток 3 честно показал день.',
      'А через 30 дней? 30 = 4 · 7 + 2. Четыре полные недели (28 дней) выбрасываем, остаток 2. От понедельника +2 дня: вторник, среда. Через 30 дней будет среда!',
      'Даже 100 дней — легко! 100 = 14 · 7 + 2, ведь 14 · 7 = 98. Полных недель 14, остаток 2 — сдвиг всего на 2 дня. От понедельника через 100 дней снова среда. Остаток экономит время!',
      'Главный секрет: при счёте дней важны только остатки от деления на 7. Остаток 0 — тот же день, остаток 1 — следующий, …, остаток 6 — день через шесть дней. Полные недели ничего не меняют — выбрасывай их!',
      'Тренажёр: нажимай «+10», «+30», «+100» и смотри, как подсветка бежит по кругу недели. А потом ответь на вопросы теста: через 10 дней — какой день? через 30 — какой?',
      'Проверь себя: сегодня понедельник. Какой день будет через 7 дней? 7 — это полная неделя, остаток 0. День не изменится! Вперёд, к проверке!'
    ],
    check: { q: 'Сегодня понедельник. Какой день будет через 7 дней?', choices: ['Понедельник', 'Вторник', 'Суббота', 'Воскресенье'], ans: 0,
      exp: '7 дней — полная неделя, день тот же.' },
    tasks: [
      { q: 'Сегодня понедельник. Какой день будет через 10 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 3, tol: 0,
        hints: ['10 = 7 + 3 — сдвиг на 3 дня.', 'Понедельник +3 = четверг.'], sol: '10 ≡ 3 (по модулю 7): понедельник + 3 дня = четверг.', kind: 'choice' },
      { q: 'Сегодня понедельник. Какой день будет через 30 дней?', choices: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'], ans: 2, tol: 0,
        hints: ['30 = 28 + 2 — сдвиг на 2 дня.', 'Понедельник + 2 = среда.'], sol: '30 ≡ 2 (mod 7): понедельник + 2 дня = среда.', kind: 'choice' }
    ]
  };
  const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const DFULL=['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',cream:'#e8dcc8',red:'#ff8a7a'};
  const rad=(d)=>d*Math.PI/180;
  function ring17(opts){
    const o=opts||{};
    const S=o.s||190, cx=S/2, cy=S/2, R=S/2-33, r=21;
    const gold=o.today!=null?o.today:-1, target=o.target!=null?o.target:-1;
    const hl=o.hl||[];
    let s='';
    s+=`<circle cx="${cx}" cy="${cy}" r="${R+r+6}" fill="rgba(0,0,0,.22)" stroke="#3d5c49" stroke-width="1.5"/>`;
    for(let i=0;i<7;i++){
      const a=rad(-90+i*45);
      const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
      const isGold=i===gold, isT=i===target, isH=hl.indexOf(i)>=0;
      const fill=isGold?C.gold:(isT?C.green:(isH?'rgba(127,209,160,.16)':'rgba(255,255,255,.05)'));
      const stroke=isGold?C.gold:(isT?C.green:(isH?'#5aa883':'#3d5c49'));
      s+=`<g class="${isGold||isT?'wv-pop':''}" style="${isGold||isT?'animation-delay:'+(isT?0.25:0.08)+'s':''}">
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${isGold||isT?3:1.6}"/>
        <text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" font-size="13.5" fill="${isGold||isT?'#0d1a13':'#e8dcc8'}" font-weight="bold">${DAYS[i]}</text>
      </g>`;
    }
    s+=`<circle cx="${cx}" cy="${cy}" r="19" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
      <text x="${cx}" y="${cy-2}" text-anchor="middle" font-size="9" fill="#9ec0a8">неделя</text>
      <text x="${cx}" y="${cy+12}" text-anchor="middle" font-size="12.5" fill="#cfe0cf" font-weight="bold">7</text>`;
    return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  const Q17=[
    {q:'Сегодня понедельник. Какой день будет через 10 дней?',opts:['Пн','Чт','Сб','Вс'],ans:1},
    {q:'Сегодня понедельник. Какой день будет через 30 дней?',opts:['Пн','Вт','Ср','Чт'],ans:2}
  ];
  function quiz(lk,st){
    const T=Q17[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:38px;font-size:13.5px;padding:6px 9px" onclick="visW17T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! Оба вопроса решены!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! Пн + 3 = Чт</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:14.5px">❌ сдвинься на остаток: 10 = 7 + 3</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW17Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW17Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW17(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.cur==null) st.cur=0;
      const c=st.cur, day=c%7;
      const note=c===0?'жми кнопку — день побежит по кругу!':(day===0?'полная неделя — снова понедельник! ✔':'+'+c+' '+(c%10===1&&c%100!==11?'день':((c%10>=2&&c%10<=4)&&(c<12||c>14)?'дня':'дней'))+' → '+DFULL[day]);
      h=wkFrame(wkBig('Неделя — часы с 7 делениями')+
        wkHero(ring17({s:146,today:0,target:day>0?day:-1}))+
        wkAns(note, day===0&&c>0?C.green:C.gold)+
        wkRow(wkBtn('+1 день →',`visW17Act('${lk}','d')`),wkBtn('+7 дней',`visW17Act('${lk}','w')`),wkBtn('↺',`visW17Act('${lk}','rst')`))+
        wkNote('через 7 дней — тот же день!','#9ec0a8'));
    } else if(step===1){
      const W=326, x0=8, cw=29, gap=1.2, y0=24, r2=12.5;
      let s='';
      for(let i=0;i<10;i++){
        const x=x0+i*(cw+gap);
        const week=i<7, extra=i>=7;
        s+=`<g class="wv-pop" style="animation-delay:${(i*0.07).toFixed(2)}s">
          <circle cx="${x+cw/2}" cy="${y0}" r="${r2}" fill="${week?'rgba(127,209,255,.12)':(extra?'rgba(217,164,65,.16)':'rgba(255,255,255,.05)')}" stroke="${week?C.blue:(extra?C.gold:'#3d5c49')}" stroke-width="2"/>
          <text x="${x+cw/2}" y="${y0+4}" text-anchor="middle" font-size="10" fill="${extra?'#ffd76a':'#cfe0cf'}" font-weight="bold">${DAYS[i%7]}</text>
          <text x="${x+cw/2}" y="${y0+23}" text-anchor="middle" font-size="8.5" fill="#7a8a80">${i+1}</text>
        </g>`;
      }
      h=wkFrame(wkBig('10 дней = неделя + 3')+
        wkHero(`<svg width="${W}" height="58" viewBox="0 0 ${W} 58" style="display:block">${s}</svg>`)+
        wkRow(wkChip('1 неделя (7) — выбросили', C.blue),wkChip('осталось 3 дня', C.gold))+
        wkSml('полная неделя возвращает в понедельник — двигаемся на 3'));
    } else if(step===2){
      h=wkFrame(wkBig('Делим с остатком на 7')+
        wkHero(`<svg width="322" height="118" viewBox="0 0 322 118" style="display:block">
          <g class="wv-pop"><rect x="8" y="14" width="76" height="76" rx="13" fill="rgba(255,255,255,.05)" stroke="#5a6f7f" stroke-width="1.8"/>
            <text x="46" y="45" text-anchor="middle" font-size="11" fill="#9ec0a8">дней</text>
            <text x="46" y="74" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">10</text></g>
          <g class="wv-pop2"><circle cx="126" cy="52" r="23" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="126" y="58" text-anchor="middle" font-size="13" fill="${C.gold}" font-weight="bold">÷7</text></g>
          <g class="wv-pop3"><rect x="178" y="14" width="58" height="34" rx="10" fill="rgba(127,209,255,.09)" stroke="${C.blue}" stroke-width="2"/>
            <text x="207" y="36" text-anchor="middle" font-size="13" fill="${C.blue}" font-weight="bold">1 нед.</text></g>
          <g class="wv-pop3"><rect x="178" y="56" width="58" height="34" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="207" y="78" text-anchor="middle" font-size="13" fill="${C.gold}" font-weight="bold">ост. 3</text></g>
          <rect x="248" y="24" width="66" height="56" rx="11" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
          <text x="281" y="56" text-anchor="middle" font-size="10.5" fill="#9ec0a8">неделю<br/>выбрасываем</text>
        </svg>`)+
        wkRow(wkPill('10 = 7 · 1 + 3', C.gold))+
        wkSml('частное 1 — полные недели, остаток 3 — рабочий сдвиг'));
    } else if(step===3){
      h=wkFrame(wkBig('Понедельник + 3 = четверг')+
        wkHero(ring17({s:160,today:0,target:3,hl:[1,2]}))+
        wkRow(`<span class="wv-pop" style="padding:3px 9px;border-radius:999px;background:rgba(127,209,160,.1);border:1.5px solid ${C.green};font-size:12px;color:#e8dcc8">1 → Вт</span><span class="wv-pop2" style="padding:3px 9px;border-radius:999px;background:rgba(127,209,160,.1);border:1.5px solid ${C.green};font-size:12px;color:#e8dcc8">2 → Ср</span><span class="wv-pop3" style="padding:3px 9px;border-radius:999px;background:rgba(127,209,160,.1);border:1.5px solid ${C.green};font-size:12px;color:#e8dcc8">3 → Чт</span>`)+
        wkAns('через 10 дней — четверг! 🎯', C.green)+
        wkSml('шагаем от понедельника на остаток 3 по кругу'));
    } else if(step===4){
      h=wkFrame(wkBig('Через 30 дней')+
        wkHero(`<svg width="322" height="108" viewBox="0 0 322 108" style="display:block">
          <g class="wv-pop"><rect x="10" y="12" width="144" height="48" rx="12" fill="rgba(127,209,255,.08)" stroke="${C.blue}" stroke-width="2.2"/>
            <text x="82" y="30" text-anchor="middle" font-size="12" fill="#9fc5e8">4 полные недели</text>
            <text x="82" y="51" text-anchor="middle" font-size="17" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">4 · 7 = 28 дней</text></g>
          <g class="wv-pop2"><rect x="168" y="12" width="144" height="48" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="240" y="30" text-anchor="middle" font-size="12" fill="#d9c088">и остаток</text>
            <text x="240" y="51" text-anchor="middle" font-size="17" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2 дня</text></g>
          <rect x="66" y="70" width="190" height="28" rx="14" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="2"/>
          <text x="161" y="89" text-anchor="middle" font-size="14" fill="${C.green}" font-weight="bold">Пн + 2 → среда!</text>
        </svg>`)+
        wkRow(wkPill('30 = 4 · 7 + 2', C.gold))+
        wkSml('28 дней — 4 полные недели; остаток 2 двигает день'));
    } else if(step===5){
      h=wkFrame(wkBig('Даже 100 дней — легко!')+
        wkHero(`<svg width="322" height="116" viewBox="0 0 322 116" style="display:block">
          <g class="wv-pop"><rect x="10" y="14" width="92" height="54" rx="12" fill="rgba(255,255,255,.05)" stroke="#5a6f7f" stroke-width="1.8"/>
            <text x="56" y="38" text-anchor="middle" font-size="11.5" fill="#9ec0a8">дней</text>
            <text x="56" y="60" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">100</text></g>
          <g class="wv-pop2"><rect x="116" y="14" width="92" height="54" rx="12" fill="rgba(127,209,255,.08)" stroke="${C.blue}" stroke-width="2"/>
            <text x="162" y="38" text-anchor="middle" font-size="11.5" fill="#9fc5e8">14 полных</text>
            <text x="162" y="60" text-anchor="middle" font-size="19" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">14·7=98</text></g>
          <g class="wv-pop3"><rect x="222" y="14" width="90" height="54" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="267" y="38" text-anchor="middle" font-size="11.5" fill="#d9c088">остаток</text>
            <text x="267" y="60" text-anchor="middle" font-size="19" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2</text></g>
          <rect x="66" y="80" width="190" height="28" rx="14" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="2"/>
          <text x="161" y="99" text-anchor="middle" font-size="14" fill="${C.green}" font-weight="bold">сдвиг на 2 → среда</text>
        </svg>`)+
        wkSml('не считаем все 100 дней: 100 : 7 = 14 (ост. 2) — остаток всё решает'));
    } else if(step===6){
      const W=324, x0=6, cw=43, gap=2, y0=12, ch=60;
      let s='';
      for(let r=0;r<7;r++){
        const x=x0+r*(cw+gap);
        const g0=r===0;
        s+=`<g class="wv-pop" style="animation-delay:${(r*0.08).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="11" fill="${g0?'rgba(143,209,168,.12)':'rgba(255,255,255,.04)'}" stroke="${g0?C.green:'#3d5c49'}" stroke-width="2"/>
          ${fitTxt(x+cw/2,y0+19,cw-4,'ост. '+r,g0?C.green:'#9ec0a8',10.5)}
          <circle cx="${x+cw/2}" cy="${y0+39}" r="13" fill="${g0?C.green:'rgba(255,255,255,.06)'}" stroke="${g0?C.green:'#4c8a5a'}"/>
          <text x="${x+cw/2}" y="${y0+43}" text-anchor="middle" font-size="12" fill="#e8dcc8" font-weight="bold">${DAYS[r]}</text>
        </g>`;
      }
      h=wkFrame(wkBig('Остаток решает день!')+
        wkHero(`<svg width="${W}" height="${y0+ch+6}" viewBox="0 0 ${W} ${y0+ch+6}" style="display:block">${s}</svg>`)+
        wkRow(wkChip('ост. 0 → Пн', C.green),wkChip('ост. 3 → Чт', C.cream),wkChip('ост. 6 → Вс', C.cream))+
        wkSml('остаток r от деления на 7 — день номер r от понедельника'));
    } else if(step===7){
      if(st.n==null) st.n=10;
      const n=st.n, k=Math.floor(n/7), r=n%7;
      h=wkFrame(wkBig('Тренажёр недели')+
        wkHero(ring17({s:132,today:0,target:r>0?r:-1}))+
        wkRow(wkBtn('+10 дней',`visW17Act('${lk}','n10')`),wkBtn('+30 дней',`visW17Act('${lk}','n30')`),wkBtn('+100 дней',`visW17Act('${lk}','n100')`),wkBtn('↺',`visW17Act('${lk}','rst')`))+
        wkAns('+'+n+' дней → '+DFULL[r]+' ('+DAYS[r]+')', C.gold)+
        quiz(lk,st)+
        wkNote('полных недель '+k+' — выброшены · остаток '+r,'#9ec0a8'));
    } else {
      h=wkFrame(wkBig('Проверь себя: +7 дней')+
        wkHero(ring17({s:148,today:0,target:-1}))+
        wkRow(wkPill('7 = 1 · 7 + 0', C.green))+
        wkAns('через 7 дней — снова понедельник!', C.green)+
        wkSml('полная неделя не двигает стрелку. Готов к проверке?'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[17]=visW17;
  function visW17T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW17T=visW17T;
  function visW17Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    switch(act){
      case 'd': st.cur=((st.cur==null?0:st.cur)+1)%15; break;
      case 'w': st.cur=((st.cur==null?0:st.cur)+7)%22; break;
      case 'n10': st.n=10; break;
      case 'n30': st.n=30; break;
      case 'n100': st.n=100; break;
      case 'nq': st.q=1; st.sel=null; break;
      case 'rst': CHS[lk]={}; break;
    }
    chRender(0);
  }
  window.visW17Act=visW17Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===17){ window.ARH_LESSONS[i]=L17; break; } } })();
})();

/* ================= УРОК 24 · Цепочки сравнений (v2) ================= */
(function(){
  const L24 = {
    id: 24, title: 'Цепочки сравнений', ico: '📏',
    src: 'Логика · транзитивность · кто выше/тяжелее всех', subj: 'math',
    explain: [
      'Лесная линейка Архимеда: Лиса выше Зайца, а Волк выше Лисы. Можно ли узнать, кто выше всех, даже не измеряя их? Можно! Если Лиса выше Зайца, а Волк выше Лисы, то Волк выше и Зайца тоже — сравнения выстраиваются в цепочку.',
      'Строим цепочку: записываем условия одно за другим — «Лиса > Заяц» и «Волк > Лиса». Соединяем звенья: Волк > Лиса > Заяц. Теперь порядок виден сразу: выше всех тот, кто стоит в цепочке первым, — Волк!',
      'Это свойство называют транзитивностью: если A больше B, а B больше C, то A больше C. Промежуточное звено B можно «выбросить» — вывод останется верным. Правило работает для роста, массы, длины, возраста — для любых сравнений.',
      'Весы работают точно так же. X легче Y, а Y легче Z — значит, X < Y < Z. Тяжелее всех Z, легче всех X. Стрелка сравнения всегда указывает от более лёгкого к более тяжёлому.',
      'Пиши цепочку одной строкой: Волк > Лиса > Заяц. Кто первый — самый высокий, кто последний — самый низкий. Порядок звеньев — это готовый ответ на вопрос «кто выше или ниже всех».',
      'Четыре зверя: Медведь выше Волка, Волк выше Лисы, Лиса выше Зайца. Соединяем: Медведь > Волк > Лиса > Заяц. Медведь — самый высокий, Заяц — самый низкий. Длинная цепочка работает так же, как короткая.',
      'А если данных не хватает? Лиса выше Зайца и Волк выше Зайца. Кто выше — Лиса или Волк? Неизвестно! Мы знаем только, что оба выше Зайца. Отвечай ровно на то, что следует из цепочки, и не додумывай лишнего.',
      'Тест из учебника: A выше B, B выше C — кто выше всех? Правильный ответ A: A > B > C. А если A выше B, B выше C, C выше D — кто ниже всех? Правильный ответ D. Попробуй ответить сам в виджете ниже!',
      'Проверь себя: X легче Y, а Y легче Z. Кто тяжелее всех? Собери цепочку X < Y < Z — и ответ готов. Вперёд, к проверке!'
    ],
    check: { q: 'X легче Y, а Y легче Z. Кто тяжелее всех?', choices: ['X', 'Y', 'Z'], ans: 2,
      exp: 'X < Y < Z — тяжелее всех Z.' },
    tasks: [
      { q: 'A выше B, B выше C. Кто выше всех?', choices: ['A', 'B', 'C'], ans: 0, tol: 0,
        hints: ['Цепочка: A > B > C.'], sol: 'A > B > C — выше всех A.', kind: 'choice' },
      { q: 'A выше B, B выше C, C выше D. Кто ниже всех?', choices: ['A', 'B', 'C', 'D'], ans: 3, tol: 0,
        hints: ['Цепочка: A > B > C > D.', 'Ниже всех — последний.'], sol: 'A > B > C > D — ниже всех D.', kind: 'choice' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',dim:'#8fa08f',cream:'#e8dcc8',red:'#ff8a7a'};
  // башни-звери: seq=[{e,t,h,c}]
  function towers(seq,opts){
    const o=opts||{};
    const colW=o.colW||58, gap=o.gap||10, base=o.base||124, top=o.top||10;
    const W=seq.length*colW+(seq.length-1)*gap+12;
    const x0=6;
    let s='';
    seq.forEach((it,i)=>{
      const x=x0+i*(colW+gap);
      const hh=it.h;
      s+=`<g class="wv-pop" style="animation-delay:${(i*0.13).toFixed(2)}s">
        <rect x="${x}" y="${base-hh}" width="${colW}" height="${hh}" rx="12" fill="rgba(255,255,255,.05)" stroke="${it.c}" stroke-width="2.4"/>
        <text x="${x+colW/2}" y="${base-hh+30}" text-anchor="middle" font-size="24">${it.e}</text>
        <text x="${x+colW/2}" y="${base+16}" text-anchor="middle" font-size="12.5" fill="${it.c}" font-weight="bold">${it.t}</text>
      </g>`;
    });
    s+=`<line x1="4" y1="${base+3}" x2="${W-4}" y2="${base+3}" stroke="#3d5c49" stroke-width="2"/>`;
    return `<svg width="${W}" height="${base+26}" viewBox="0 0 ${W} ${base+26}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  function chain24(arr,hlIdx){
    const cells=arr.map((a,i)=>{
      const hl=hlIdx&&hlIdx.indexOf(i)>=0;
      return `<span class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s;display:inline-flex;flex-direction:column;align-items:center;gap:2px;padding:7px 13px;border-radius:13px;background:${hl?'rgba(217,164,65,.14)':'rgba(255,255,255,.05)'};border:2px solid ${hl?C.gold:'#4c8a5a'};min-width:64px">
        <span style="font-size:24px">${a.e}</span><span style="font-size:13px;color:#e8dcc8">${a.t}</span></span>`;
    }).join(`<span style="font-size:24px;color:${C.red};font-weight:bold"> &gt; </span>`);
    return `<div class="wk-row" style="gap:6px">${cells}</div>`;
  }
  const Q24=[
    {q:'A выше B, B выше C. Кто выше всех?',opts:['A','B','C'],ans:0},
    {q:'A выше B, B выше C, C выше D. Кто ниже всех?',opts:['A','B','C','D'],ans:3}
  ];
  function testUI(lk,st){
    const T=Q24[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:17px" onclick="visW24T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1? '<div class="wk-ans" style="color:#8fd1a8">🎉 верно! Оба теста решены!</div>' : '<div class="wk-ans" style="color:#8fd1a8">✅ верно! Цепочка работает!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a">❌ не так. Собери цепочку и посмотри, кто первый, а кто последний.</div>';
    }
    const next = st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW24Act('${lk}','nq')`):'';
    const rst = wkBtn('↺ заново',`visW24Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next}${rst}</div>`;
  }
  function visW24(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Лесная линейка Архимеда 🐾')+
        wkHero(towers([{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'}],{base:118}))+
        wkRow(wkPill('Лиса > Заяц',C.gold),wkPill('Волк > Лиса',C.blue))+
        `<div class="wk-ans wv-pulse" style="color:#ffd76a">кто выше всех — видно сразу после сборки цепочки?</div>`+
        wkSml('известно только два сравнения, но они уже складываются в ответ. Листай дальше!'));
    } else if(step===1){
      h=wkFrame(wkBig('Собираем цепочку')+
        wkHero(towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        chain24([{e:'🐺',t:'Волк'},{e:'🦊',t:'Лиса'},{e:'🐰',t:'Заяц'}],[0])+
        wkAns('Волк > Лиса > Заяц — выше всех Волк!',C.green)+
        wkSml('сравнения встают в ряд, как звенья цепи: середина соединяет края'));
    } else if(step===2){
      h=wkFrame(wkBig('Секрет — транзитивность')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          ${[['A','больше','#7fd1ff',20],['B','середина','#8fd1a8',126],['C','меньше','#ffd76a',232]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${b[3]}" y="24" width="72" height="64" rx="14" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2.4"/>
              <text x="${b[3]+36}" y="58" text-anchor="middle" font-size="26" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[0]}</text>
              <text x="${b[3]+36}" y="78" text-anchor="middle" font-size="11" fill="#9ec0a8">${b[1]}</text>
            </g>`).join('')}
          <text x="96" y="64" font-size="24" fill="${C.red}" font-weight="bold">></text>
          <text x="202" y="64" font-size="24" fill="${C.red}" font-weight="bold">></text>
          <rect x="66" y="104" width="190" height="30" rx="15" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="1.8"/>
          <text x="161" y="124" text-anchor="middle" font-size="13.5" fill="${C.green}" font-weight="bold">A > B и B > C → A > C</text>
        </svg>`)+
        wkRow(wkChip('рост',C.blue),wkChip('масса',C.green),wkChip('длина',C.gold),wkChip('возраст','#e8a0d8'))+
        wkSml('промежуточное звено можно «выбросить»: вывод останется верным!'));
    } else if(step===3){
      h=wkFrame(wkBig('Весы: X, Y и Z')+
        wkHero(`<svg width="322" height="170" viewBox="0 0 322 170" style="display:block">
          <rect x="4" y="4" width="314" height="162" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><circle cx="161" cy="34" r="15" fill="rgba(255,255,255,.07)" stroke="#cbb89a" stroke-width="2.4"/>
            <line x1="161" y1="49" x2="161" y2="74" stroke="#cbb89a" stroke-width="2.4"/>
            <line x1="70" y1="76" x2="252" y2="76" stroke="#cbb89a" stroke-width="4"/>
            <line x1="70" y1="76" x2="70" y2="98" stroke="#cbb89a" stroke-width="4"/>
            <line x1="252" y1="76" x2="252" y2="98" stroke="#cbb89a" stroke-width="4"/>
            <rect x="42" y="98" width="56" height="42" rx="10" fill="rgba(127,209,255,.1)" stroke="${C.blue}" stroke-width="2.2"/>
            <text x="70" y="124" text-anchor="middle" font-size="20" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">X</text>
            <rect x="224" y="98" width="56" height="42" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.2"/>
            <text x="252" y="124" text-anchor="middle" font-size="20" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">Z</text>
            <text x="161" y="80" text-anchor="middle" font-size="12" fill="#9ec0a8">X легче Y · Y легче Z</text>
          </g>
          <rect x="86" y="132" width="150" height="26" rx="13" fill="rgba(143,209,168,.1)" stroke="${C.green}"/>
          <text x="161" y="150" text-anchor="middle" font-size="14" fill="${C.green}" font-weight="bold">X < Y < Z</text>
        </svg>`)+
        wkAns('тяжелее всех Z, легче всех X',C.green)+
        wkSml('стрелка всегда указывает от лёгкого к тяжёлому — идём по ней до конца'));
    } else if(step===4){
      h=wkFrame(wkBig('Цепочка одной строкой')+
        wkHero(towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        wkRow(wkChip('первый — выше всех',C.gold),wkChip('последний — ниже всех',C.green))+
        wkSml('кто в цепочке первый — самый высокий; кто последний — самый низкий'));
    } else if(step===5){
      h=wkFrame(wkBig('Четыре зверя по росту')+
        wkHero(towers([{e:'🐻',t:'Медведь',h:122,c:'#b98a5a'},{e:'🐺',t:'Волк',h:94,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:68,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:42,c:'#c9a06a'}],{base:140,colW:56,gap:8}))+
        chain24([{e:'🐻',t:'Медведь'},{e:'🐺',t:'Волк'},{e:'🦊',t:'Лиса'},{e:'🐰',t:'Заяц'}])+
        wkSml('длинная цепочка работает так же, как короткая: звено за звеном'));
    } else if(step===6){
      if(st.mode==null) st.mode=0;
      h=wkFrame(wkBig('Данных не хватает?')+
        wkHero(st.mode===0
          ? towers([{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:96,colW:60})
          : towers([{e:'🐺',t:'Волк',h:108,c:'#7f9bb8'},{e:'🦊',t:'Лиса',h:76,c:'#e08a4a'},{e:'🐰',t:'Заяц',h:46,c:'#c9a06a'}],{base:118}))+
        wkRow(wkPill('Лиса > Заяц',C.gold),wkPill('Волк > Заяц',C.blue))+
        (st.mode===0
          ? `<div class="wk-ans" style="color:#ffcfc2">кто выше: Лиса или Волк? пока не знаем!</div>
             ${wkRow(wkBtn('➕ добавить: Волк выше Лисы',`visW24Act('${lk}','w')`))}`
          : `${wkAns('теперь ясно: Волк выше Лисы, оба выше Зайца!',C.green)}
             ${wkRow(wkBtn('↺ сброс',`visW24Act('${lk}','rst')`))}`)+
        wkSml('если данных не хватает — отвечай только на то, что следует из цепочки'));
    } else if(step===7){
      h=wkFrame(wkBig('Тест из учебника 📝')+testUI(lk,st)+
        wkSml('это вопросы из учебника: собери цепочку — и ответ найдётся сам'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          ${[['X','легче','#7fd1ff',22],['Y','средний','#8fd1a8',124],['Z','тяжелее','#ffd76a',226]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${b[3]}" y="18" width="70" height="64" rx="13" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2.4"/>
              <text x="${b[3]+35}" y="52" text-anchor="middle" font-size="26" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[0]}</text>
              <text x="${b[3]+35}" y="72" text-anchor="middle" font-size="11" fill="#9ec0a8">${b[1]}</text>
            </g>`).join('')}
          <text x="96" y="58" font-size="22" fill="${C.red}" font-weight="bold"><</text>
          <text x="198" y="58" font-size="22" fill="${C.red}" font-weight="bold"><</text>
        </svg>`)+
        wkRow(wkPill('X < Y < Z',C.gold))+
        wkAns('тяжелее всех — Z! Готов к проверке?',C.green)+
        wkSml('жми «Понял! Проверю себя» — там вопрос про X, Y и Z'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[24]=visW24;
  function visW24T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW24T=visW24T;
  function visW24Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='w') st.mode=1;
    if(act==='rst') CHS[lk]={};
    if(act==='nq'){ st.q=1; st.sel=null; }
    chRender(0);
  }
  window.visW24Act=visW24Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===24){ window.ARH_LESSONS[i]=L24; break; } } })();
})();

/* ================= УРОК 45 · НОД и НОК (v2) ================= */
(function(){
  const L45 = {
    id: 45, title: 'НОД и НОК', ico: '🔗',
    src: 'Математика · 6 класс · Делимость: НОД и НОК', subj: 'math',
    explain: [
      'Мастерская Архимеда: два задания. Первое — застелить пол 24 на 36 одинаковыми квадратными плитками, самыми большими из возможных. Второе — два автобуса: один приезжает на остановку каждые 4 минуты, другой каждые 6. Когда они снова встретятся? Для таких задач нужны два инструмента — НОД и НОК.',
      'НОД — наибольший общий делитель: самое большое число, на которое делятся оба числа. Выпишем делители 12: 1, 2, 3, 4, 6, 12. Делители 18: 1, 2, 3, 6, 9, 18. Общие делители: 1, 2, 3, 6. Наибольший из них — 6. Значит, НОД(12, 18) = 6.',
      'Как искать НОД перебором? Шаг 1 — выпиши все делители каждого числа. Шаг 2 — найди общие. Шаг 3 — возьми наибольший. Для 24 и 36: общие делители 1, 2, 3, 4, 6, 12, наибольший — 12. НОД(24, 36) = 12. Это и есть сторона самой большой квадратной плитки!',
      'НОК — наименьшее общее кратное: самое маленькое число, которое делится на оба числа. Кратные 6: 6, 12, 18, 24, 30… Кратные 8: 8, 16, 24, 32… Первое общее — 24. Значит, НОК(6, 8) = 24.',
      'Вернёмся к автобусам: один приезжает каждые 4 минуты — 4, 8, 12, 16… Другой каждые 6 — 6, 12, 18… Впервые они встретятся через 12 минут. НОК(4, 6) = 12. НОК отвечает на вопрос «когда снова совпадёт».',
      'Быстрый способ — разложение на простые множители. 24 = 2 · 2 · 2 · 3 = 2³ · 3, а 36 = 2 · 2 · 3 · 3 = 2² · 3². НОД берёт общие множители с наименьшей степенью: 2² · 3 = 12. НОК берёт все множители с наибольшей степенью: 2³ · 3² = 72.',
      'Красивая связь: НОД(24, 36) · НОК(24, 36) = 12 · 72 = 864, и 24 · 36 = 864 тоже! Произведение НОД и НОК двух чисел равно произведению самих чисел. Удобная проверка для любого ответа.',
      'Тест из учебника: найди НОД чисел 24 и 36 (подсказка: общие делители 1, 2, 3, 4, 6, 12) и НОК чисел 4 и 6 (подсказка: кратные 4 — 4, 8, 12…). Попробуй ответить в виджете ниже!',
      'Проверь себя: НОД(12, 18) = ? Делители 12 и 18 мы уже выписывали — общие 1, 2, 3, 6, наибольший 6. Вперёд, к проверке!'
    ],
    check: { q: 'Найди НОД чисел 12 и 18.', choices: ['3', '6', '9', '36'], ans: 1,
      exp: 'Общие делители 1,2,3,6 — наибольший 6.' },
    tasks: [
      { q: 'Найди НОД чисел 24 и 36.', kind: 'unit', ans: 12, tol: 0,
        hints: ['24 = 2³·3, 36 = 2²·3².', 'Общее: 2²·3 = 12.'], sol: 'НОД(24,36) = 12.' },
      { q: 'Найди НОК чисел 4 и 6.', kind: 'unit', ans: 12, tol: 0,
        hints: ['Кратные 4: 4,8,12…', 'Кратные 6: 6,12…', 'Первое общее — 12.'], sol: 'НОК(4,6) = 12.' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',dim:'#8fa08f',cream:'#e8dcc8',red:'#ff8a7a'};
  const divs=(n)=>Array.from({length:n},(_,i)=>i+1).filter(d=>n%d===0);
  function divRow(n,color,label){
    const ds=divs(n);
    const cells=ds.map((d,i)=>`<span class="wv-pop" style="animation-delay:${(i*0.06).toFixed(2)}s;display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:28px;margin:2px;border-radius:8px;background:rgba(255,255,255,.05);border:1.5px solid ${color};font-size:14px;color:#e8dcc8;font-family:Georgia,serif">${d}</span>`).join('');
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px"><span style="font-size:12px;color:${color}">${label}</span><div style="display:flex;flex-wrap:wrap;justify-content:center;max-width:190px">${cells}</div></div>`;
  }
  function lane45(a,upTo,color,cy,mark){
    let s='';
    const span=270, x0=44;
    for(let m=1;a*m<=upTo;m++){
      const x=x0+(a*m)*(span/upTo);
      const isMark=mark.indexOf(a*m)>=0;
      s+=`<circle cx="${x.toFixed(1)}" cy="${cy}" r="${isMark?9.5:7.5}" fill="${isMark?'rgba(217,164,65,.22)':'rgba(255,255,255,.06)'}" stroke="${isMark?C.gold:color}" stroke-width="${isMark?2.6:2}"/>`;
      if(isMark) s+=`<text x="${x.toFixed(1)}" y="${cy-14}" text-anchor="middle" font-size="12" fill="${C.gold}" font-weight="bold">${a*m}</text>`;
    }
    s+=`<text x="12" y="${cy+4}" font-size="14" fill="${color}" font-weight="bold">${a}:</text>`;
    s+=`<text x="20" y="${cy+4}" font-size="14" fill="#5b6b58"> </text>`;
    return s;
  }
  function ladder45(n,cx,color,top){
    const steps=[]; let x=n;
    for(let d=2;d<=x;d++){
      while(x%d===0){ steps.push([x,d]); x/=d; }
    }
    let s='';
    steps.forEach((st,i)=>{
      const y=top+i*30;
      s+=`<g class="wv-pop" style="animation-delay:${(i*0.12).toFixed(2)}s">
        <rect x="${cx-66}" y="${y-16}" width="132" height="26" rx="9" fill="rgba(255,255,255,.04)" stroke="${color}" stroke-width="1.6"/>
        <text x="${cx-42}" y="${y+1}" text-anchor="middle" font-size="15" fill="#fff" font-family="Georgia,serif" font-weight="bold">${st[0]}</text>
        <text x="${cx-8}" y="${y+1}" text-anchor="middle" font-size="13" fill="#ffd76a">÷${st[1]}</text>
        <text x="${cx+34}" y="${y+1}" text-anchor="middle" font-size="15" fill="${color}" font-weight="bold" font-family="Georgia,serif">${st[0]/st[1]}</text>
      </g>`;
    });
    return s;
  }
  const Q45=[
    {q:'Найди НОД чисел 24 и 36.',opts:['6','12','18','24'],ans:1},
    {q:'Найди НОК чисел 4 и 6.',opts:['8','12','24','4'],ans:1}
  ];
  function testUI(lk,st){
    const T=Q45[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:58px;font-size:17px" onclick="visW45T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1? '<div class="wk-ans" style="color:#8fd1a8">🎉 верно! Оба теста решены!</div>' : '<div class="wk-ans" style="color:#8fd1a8">✅ верно! НОД найден!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a">❌ не так. Выпиши делители/кратные и найди общее.</div>';
    }
    const next = st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW45Act('${lk}','nq')`):'';
    const rst = wkBtn('↺ заново',`visW45Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next}${rst}</div>`;
  }
  function visW45(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Мастерская Архимеда 🔧')+
        wkHero(`<svg width="322" height="140" viewBox="0 0 322 140" style="display:block">
          <g class="wv-pop"><rect x="8" y="10" width="148" height="122" rx="15" fill="rgba(127,209,255,.05)" stroke="${C.blue}" stroke-width="2"/>
            <text x="82" y="32" text-anchor="middle" font-size="12.5" fill="#9fc5e8">задание 1 · плитка</text>
            <rect x="20" y="44" width="52" height="40" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="46" y="68" text-anchor="middle" font-size="13" fill="#9ec0a8">?</text>
            <rect x="80" y="44" width="52" height="40" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="106" y="68" text-anchor="middle" font-size="13" fill="#9ec0a8">?</text>
            <rect x="20" y="92" width="52" height="32" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <rect x="80" y="92" width="52" height="32" rx="7" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.4"/>
            <text x="82" y="126" text-anchor="middle" font-size="11.5" fill="${C.blue}">пол 24 × 36</text></g>
          <g class="wv-pop2"><rect x="166" y="10" width="148" height="122" rx="15" fill="rgba(217,164,65,.05)" stroke="${C.gold}" stroke-width="2"/>
            <text x="240" y="32" text-anchor="middle" font-size="12.5" fill="#d9c088">задание 2 · автобусы</text>
            <circle cx="240" cy="80" r="34" fill="none" stroke="#3d5c49" stroke-width="3"/>
            <text x="240" y="86" text-anchor="middle" font-size="15" fill="#cfe0cf">4 и 6</text>
            <text x="240" y="112" text-anchor="middle" font-size="10.5" fill="#9ec0a8">минут</text>
            <text x="240" y="128" text-anchor="middle" font-size="11" fill="${C.gold}">когда встретятся?</text></g>
        </svg>`)+
        wkRow(wkChip('НОД — режет на равные части',C.blue),wkChip('НОК — ищет совпадение',C.gold))+
        wkSml('два инструмента на два вопроса: «какой самый большой общий кусок?» и «когда снова совпадёт?»'));
    } else if(step===1){
      h=wkFrame(wkBig('НОД(12, 18) = ?')+
        wkRow(divRow(12,C.blue,'делители 12'),divRow(18,C.green,'делители 18'))+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <circle cx="112" cy="50" r="42" fill="rgba(127,209,255,.07)" stroke="${C.blue}" stroke-width="1.8"/>
          <circle cx="210" cy="50" r="42" fill="rgba(143,209,168,.07)" stroke="${C.green}" stroke-width="1.8"/>
          <text x="161" y="46" text-anchor="middle" font-size="12" fill="#cfe0cf">общие</text>
          <text x="161" y="64" text-anchor="middle" font-size="13" fill="${C.gold}" font-weight="bold">1, 2, 3, 6</text>
          <text x="70" y="22" text-anchor="middle" font-size="11" fill="${C.blue}">4, 12</text>
          <text x="252" y="22" text-anchor="middle" font-size="11" fill="${C.green}">9, 18</text>
        </svg>`)+
        wkAns('НОД(12, 18) = 6 — самый большой общий делитель',C.green)+
        wkSml('общие делители 1, 2, 3, 6 — берём наибольший'));
    } else if(step===2){
      h=wkFrame(wkBig('Перебор: НОД(24, 36)')+
        wkRow(divRow(24,C.blue,'делители 24'),divRow(36,C.green,'делители 36'))+
        wkHero(`<svg width="322" height="86" viewBox="0 0 322 86" style="display:block">
          <rect x="6" y="6" width="310" height="74" rx="15" fill="rgba(217,164,65,.06)" stroke="${C.gold}" stroke-width="1.8"/>
          <text x="161" y="32" text-anchor="middle" font-size="13.5" fill="#d9c088">делители → общие → наибольший</text>
          <text x="161" y="58" text-anchor="middle" font-size="17" fill="#fff" font-weight="bold" font-family="Georgia,serif">общие: 1, 2, 3, 4, 6, 12 → НОД = <tspan fill="${C.gold}">12</tspan></text>
        </svg>`)+
        wkAns('сторона самой большой плитки — 12!',C.green)+
        wkSml('перебор всегда работает: делители → общие → наибольший'));
    } else if(step===3){
      h=wkFrame(wkBig('НОК: когда числа «встретятся»')+
        wkHero(`<svg width="322" height="108" viewBox="0 0 322 108" style="display:block">
          <rect x="4" y="4" width="314" height="100" rx="15" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${lane45(6,24,C.blue,28,[24])}
          ${lane45(8,24,C.green,62,[24])}
          <rect x="76" y="80" width="170" height="20" rx="10" fill="rgba(217,164,65,.12)" stroke="${C.gold}"/>
          <text x="161" y="94" text-anchor="middle" font-size="12.5" fill="${C.gold}" font-weight="bold">первое общее — 24!</text>
        </svg>`)+
        wkRow(wkPill('НОК(6, 8) = 24',C.gold))+
        wkSml('НОК — наименьшее общее кратное: первое число, кратное обоим'));
    } else if(step===4){
      h=wkFrame(wkBig('Автобусы: 4 и 6 минут 🚌')+
        wkHero(`<svg width="322" height="104" viewBox="0 0 322 104" style="display:block">
          <rect x="4" y="4" width="314" height="96" rx="15" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${lane45(4,12,C.blue,28,[12])}
          ${lane45(6,12,C.green,62,[12])}
          <circle cx="240" cy="45" r="16" fill="rgba(255,255,255,.06)" stroke="#3d5c49"/>
          <text x="240" y="50" text-anchor="middle" font-size="11" fill="#9ec0a8">🚌</text>
        </svg>`)+
        wkRow(wkPill('НОК(4, 6) = 12',C.gold))+
        wkAns('встретятся через 12 минут!',C.green)+
        wkSml('наименьшее общее кратное — ответ на вопрос «когда снова совпадёт»'));
    } else if(step===5){
      h=wkFrame(wkBig('Разложение на простые')+
        wkHero(`<svg width="322" height="216" viewBox="0 0 322 216" style="display:block">
          <text x="92" y="20" text-anchor="middle" font-size="13" fill="${C.blue}" font-weight="bold">24 = 2³ · 3</text>
          ${ladder45(24,92,C.blue,32)}
          <text x="230" y="20" text-anchor="middle" font-size="13" fill="${C.green}" font-weight="bold">36 = 2² · 3²</text>
          ${ladder45(36,230,C.green,32)}
        </svg>`)+
        wkRow(wkPill('НОД: общие, меньшая степень 2²·3 = 12',C.green),wkPill('НОК: все, большая степень 2³·3² = 72',C.gold))+
        wkSml('общие множители — в НОД, все множители — в НОК'));
    } else if(step===6){
      h=wkFrame(wkBig('Волшебная связь')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="20" y="24" width="88" height="52" rx="12" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="2"/>
            <text x="64" y="46" text-anchor="middle" font-size="11" fill="#9ec0a8">НОД(24,36)</text>
            <text x="64" y="68" text-anchor="middle" font-size="20" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">12</text></g>
          <text x="114" y="60" font-size="20" fill="#8fa08f">·</text>
          <g class="wv-pop2"><rect x="126" y="24" width="88" height="52" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2"/>
            <text x="170" y="46" text-anchor="middle" font-size="11" fill="#d9c088">НОК(24,36)</text>
            <text x="170" y="68" text-anchor="middle" font-size="20" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">72</text></g>
          <text x="220" y="60" font-size="20" fill="#8fa08f">=</text>
          <g class="wv-pop3"><rect x="232" y="24" width="76" height="52" rx="12" fill="rgba(255,255,255,.06)" stroke="#5a6f7f" stroke-width="2"/>
            <text x="270" y="46" text-anchor="middle" font-size="11" fill="#9ec0a8">24 · 36</text>
            <text x="270" y="68" text-anchor="middle" font-size="19" fill="#fff" font-weight="bold" font-family="Georgia,serif">864</text></g>
          <rect x="46" y="96" width="230" height="40" rx="20" fill="rgba(255,255,255,.04)" stroke="#3d5c49"/>
          <text x="161" y="121" text-anchor="middle" font-size="14.5" fill="#ffd76a" font-weight="bold">НОД · НОК = a · b (12·72 = 24·36)</text>
        </svg>`)+
        wkSml('перемножь НОД и НОК — получишь произведение самих чисел. Удобная проверка!'));
    } else if(step===7){
      h=wkFrame(wkBig('Тест из учебника 📝')+testUI(lk,st)+
        wkSml('вопросы из учебника 6 класса: НОД — перебором делителей, НОК — по кратным'));
    } else {
      h=wkFrame(wkBig('Применения и проверка')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="14" y="16" width="142" height="56" rx="12" fill="rgba(127,209,255,.07)" stroke="${C.blue}" stroke-width="2"/>
            <text x="85" y="38" text-anchor="middle" font-size="12" fill="#9fc5e8">плитка: пол 24×36</text>
            <text x="85" y="62" text-anchor="middle" font-size="15" fill="${C.blue}" font-weight="bold">12×12 → 6 шт</text></g>
          <g class="wv-pop2"><rect x="166" y="16" width="142" height="56" rx="12" fill="rgba(127,209,160,.07)" stroke="${C.green}" stroke-width="2"/>
            <text x="237" y="38" text-anchor="middle" font-size="12" fill="#9ec0a8">дроби: 18/24</text>
            <text x="237" y="62" text-anchor="middle" font-size="15" fill="${C.green}" font-weight="bold">:6 → 3/4</text></g>
          <g class="wv-pop3"><rect x="34" y="86" width="254" height="50" rx="13" fill="rgba(217,164,65,.08)" stroke="${C.gold}" stroke-width="2"/>
            <text x="161" y="108" text-anchor="middle" font-size="12.5" fill="#d9c088">общий знаменатель: 1/4 + 1/6</text>
            <text x="161" y="128" text-anchor="middle" font-size="14.5" fill="${C.gold}" font-weight="bold">НОК(4,6)=12 → 3/12 + 2/12 = 5/12</text></g>
        </svg>`)+
        wkRow(wkPill('НОД(12, 18) = ?',C.green))+
        wkSml('готов? жми «Понял! Проверю себя» — там НОД чисел 12 и 18'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[45]=visW45;
  function visW45T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW45T=visW45T;
  function visW45Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW45Act=visW45Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===45){ window.ARH_LESSONS[i]=L45; break; } } })();
})();
/* ================= УРОК 43 · Обыкновенные дроби: складываем (v3) ================= */
(function(){
  if(!window.__wk43css){
    window.__wk43css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .wk-assemble{transform-box:fill-box;transform-origin:center;animation:wkAssemble .8s cubic-bezier(.2,.9,.28,1.15) both;}'+
      '@keyframes wkAssemble{0%{transform:translate(var(--tx,0px),var(--ty,60px)) rotate(var(--rot,0deg)) scale(.4);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .wk-flow{stroke-dasharray:9 7;animation:wkDash .8s linear infinite;}'+
      '@keyframes wkDash{to{stroke-dashoffset:-16}}'+
      '#lvis .wk-book{display:flex;gap:7px;align-items:flex-start;text-align:left;max-width:310px;padding:7px 11px;border-radius:12px;background:rgba(217,164,65,.07);border:1.5px solid rgba(217,164,65,.5);color:#ffdfa0;font-size:12.5px;line-height:1.45;}'+
      '#lvis .wk-pizzacap{font-size:13px;color:#cfe0cf;font-weight:bold;font-family:Georgia,serif;}';
    document.head.appendChild(st);
  }
  const L43 = {
    id: 43, title: 'Обыкновенные дроби: складываем', ico: '🍕',
    src: 'Математика · Начальная школа · Доли и дроби', subj: 'math',
    explain: [
      'У Архимеда пицца — и её разрезали на 4 РАВНЫХ куска. Когда целое делят на равные части, каждая часть называется долей, а целое из всех долей снова собирается в круг! Один друг съел 1 кусок, второй — 2. Сколько кусков съели вместе? Ответят дроби.',
      'Дробь показывает, сколько равных долей взяли из целого. В дроби 3/4 знаменатель 4 — на сколько равных долей разделили пиццу, числитель 3 — сколько долей взяли. Доли имеют имена: 1/2 — половина, 1/3 — треть, 1/4 — четверть.',
      'Складываем одинаковые доли: 1/4 + 2/4 = 3/4. Один кусок и два куска — вместе три куска из тех же четырёх. Знаменатель не меняется: куски одной пиццы, одного размера — складываем только числители 1 + 2 = 3!',
      'Целая пицца — это 4/4: все четыре четвертинки на месте и снова образуют круг. Помни: 2 четверти — это половина пиццы, а 4 четверти — вся пицца (1 = 4/4). Знаменатель не меняется — куски одной пиццы.',
      'А если доли разные? Например, 1/2 + 1/4: половинка и четвертинка — куски РАЗНОГО размера, складывать их напрямую нельзя (получилось бы 2/6 — ерунда). Сначала нарежем пиццу на одинаковые доли.',
      'Секрет — равные дроби: 1/2 и 2/4 — это ОДНА И ТА ЖЕ порция! Разрезали половинку пополам: кусков стало больше, а еды столько же. Доли мельче — значит, их больше: 2 четвертинки вместо 1 половинки.',
      'Приводим к общему знаменателю: 1/2 = 2/4, значит 2/4 + 1/4 = 3/4. Общий знаменатель 4 делится и на 2, и на 4 (это НОК). Получили 3/4 — а это 0,75. Три куска из четырёх — три четверти.',
      'Целое — это тоже дробь: 1 = 4/4 (четыре четвертинки собраны в круг). Поэтому 3/4 + 1 = 3/4 + 4/4 = 7/4 — это семь четвертинок: целая пицца и ещё 3 куска.',
      'Проверь себя: 2/5 + 1/5 = ? Пицца разрезана на 5 кусков: берём 2 и добавляем 1 — получается 3 куска из пяти. А две половинки всегда соберутся в целый круг: 1/2 + 1/2 = 1!'
    ],
    check: { q: 'Сколько будет 2/5 + 1/5?', choices: ['3/5', '3/10', '2/10'], ans: 0,
      exp: 'Знаменатели одинаковые: (2+1)/5 = 3/5.' },
    tasks: [
      { q: 'Сколько будет 1/4 + 2/4?', kind: 'unit', ans: 0.75, tol: 0.01,
        hints: ['(1+2)/4 = 3/4.', '3/4 = 0,75.'], sol: '3/4 = 0,75.' },
      { q: 'Сколько будет 1/2 + 1/4? (ответ десятичной дробью)', kind: 'unit', ans: 0.75, tol: 0.01,
        hints: ['1/2 = 2/4.', '2/4 + 1/4 = 3/4.'], sol: '1/2 + 1/4 = 3/4 = 0,75.' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',cream:'#ffe9c9'};
  const rad=(d)=>d*Math.PI/180;
  function wedge(cx,cy,r,a0,a1){
    const x0=cx+r*Math.cos(rad(a0)), y0=cy+r*Math.sin(rad(a0));
    const x1=cx+r*Math.cos(rad(a1)), y1=cy+r*Math.sin(rad(a1));
    const large=(a1-a0)>180?1:0;
    return `M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
  }
  /* Красивая пицца: градиенты, тени, пепперони. Куски «слетаются» и собирают круг. */
  function pizza(den,hl,uid,opt){
    const o=opt||{};
    const s=o.s||150;
    const pad=Math.max(10,s*0.11);
    const W=s+2*pad, cx=W/2, cy=W/2;
    const R=s/2-6, Rc=R-9;
    const step=360/den, gapD=Math.min(2.2, Math.max(0.9, 7/den));
    const hlN=Math.max(0,Math.min(den,hl==null?0:hl));
    const whole=hlN===den;
    const pr=Math.max(3.2,Math.min(6.2,Rc*0.44*Math.sin(rad(step/2))-1.4));
    let svg=`<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" style="display:block;margin:0 auto">`;
    svg+=`<defs>
      <radialGradient id="ch${uid}" cx="50%" cy="42%" r="65%"><stop offset="0%" stop-color="#ffe79b"/><stop offset="55%" stop-color="#f8c45e"/><stop offset="100%" stop-color="#eea83f"/></radialGradient>
      <linearGradient id="cr${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f6d08b"/><stop offset="100%" stop-color="#cf8a33"/></linearGradient>
      <radialGradient id="pl${uid}" cx="50%" cy="40%" r="70%"><stop offset="0%" stop-color="#1a2b20"/><stop offset="100%" stop-color="#0c1410"/></radialGradient>
      <radialGradient id="pep${uid}"><stop offset="0%" stop-color="#e25a45"/><stop offset="60%" stop-color="#c13428"/><stop offset="100%" stop-color="#8f1f16"/></radialGradient>
      <filter id="sh${uid}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="3.4" flood-color="#000" flood-opacity=".55"/></filter>
      <filter id="gl${uid}" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ffd76a" flood-opacity=".8"/></filter>
    </defs>`;
    svg+=`<circle cx="${cx}" cy="${cy}" r="${R+2.5}" fill="url(#pl${uid})" stroke="#2a3f30" stroke-width="1.5"/>`;
    for(let i=0;i<den;i++){
      const a0=-90+i*step+gapD/2, a1=-90+(i+1)*step-gapD/2;
      const on=hlN>0&&i<hlN;
      const mid=rad(-90+i*step+step/2);
      const dist=R*0.55;
      const tx=(Math.cos(mid)*dist).toFixed(1), ty=(Math.sin(mid)*dist).toFixed(1);
      const rot=((i*7)%18-9).toFixed(0);
      const gid=`${uid}s${i}`;
      svg+=`<g class="wk-assemble" style="animation-delay:${(i*0.13).toFixed(2)}s;--tx:${tx}px;--ty:${ty}px;--rot:${rot}deg" filter="${on?'url(#gl'+uid+')':'none'}">
        <path d="${wedge(cx,cy,R,a0,a1)}" fill="url(#cr${uid})" stroke="#9c6620" stroke-width="${on?2.6:1.6}"/>
        <path d="${wedge(cx,cy,Rc,a0+0.4,a1-0.4)}" fill="url(#ch${uid})"/>
        <circle cx="${(cx+Rc*0.86*Math.cos(mid+rad(step*0.3))).toFixed(1)}" cy="${(cy+Rc*0.86*Math.sin(mid+rad(step*0.3))).toFixed(1)}" r="1.6" fill="#b4561e" opacity=".5"/>
        <circle cx="${(cx+Rc*0.52*Math.cos(mid)).toFixed(1)}" cy="${(cy+Rc*0.52*Math.sin(mid)).toFixed(1)}" r="${pr.toFixed(1)}" fill="url(#pep${uid})" stroke="#7c150f" stroke-width="1"/>
        <circle cx="${(cx+Rc*0.52*Math.cos(mid)-pr*0.35).toFixed(1)}" cy="${(cy+Rc*0.52*Math.sin(mid)-pr*0.35).toFixed(1)}" r="${Math.max(.7,pr*0.2).toFixed(1)}" fill="#ff9b7e"/>
        <circle cx="${(cx+Rc*0.82*Math.cos(mid+rad(step*0.34))).toFixed(1)}" cy="${(cy+Rc*0.82*Math.sin(mid+rad(step*0.34))).toFixed(1)}" r="2.2" fill="#4f9a44"/>
        ${den<=4?`<circle cx="${(cx+Rc*0.3*Math.cos(mid+rad(step*0.3))).toFixed(1)}" cy="${(cy+Rc*0.3*Math.sin(mid+rad(step*0.3))).toFixed(1)}" r="${Math.max(2.8,pr*0.9).toFixed(1)}" fill="url(#pep${uid})" stroke="#7c150f" stroke-width=".8"/>`:''}
      </g>`;
    }
    if(whole&&den>=2&&den<=8){
      svg+=`<circle cx="${cx}" cy="${cy}" r="${Math.max(8,R*0.15)}" fill="url(#pep${uid})" stroke="#7c150f" stroke-width="1.2"/>`;
    }
    svg+='</svg>';
    return svg;
  }
  const sign=(t,c,cls)=>`<span class="${cls||''}" style="display:inline-flex;font-size:24px;color:${c||'#8fa08f'};font-weight:bold">${t}</span>`;
  const flow=(w)=>`<svg width="${w}" height="14" viewBox="0 0 ${w} 14" style="display:block"><line x1="2" y1="7" x2="${w-14}" y2="7" stroke="#8fd1a8" stroke-width="3" stroke-linecap="round" class="wk-flow"/><polygon points="${w-6},7 ${w-14},2.5 ${w-14},11.5" fill="#8fd1a8"/></svg>`;
  function pchain(pizzas,mid){
    let inner='';
    pizzas.forEach((p,i)=>{
      if(i>0) inner+=mid[i-1];
      inner+=p;
    });
    return `<div class="wk-row" style="gap:3px">${inner}</div>`;
  }
  const book=(t)=>`<div class="wk-book">💡 <span>${t}</span></div>`;
  const cap=(t)=>`<div class="wk-pizzacap">${t}</div>`;
  const Q43=[
    {q:'2/5 + 1/5 = ?',opts:['3/5','3/10','2/10'],ans:0},
    {q:'1/2 + 1/2 = ?',opts:['1/4','1','2/4'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q43[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.gold; tc=i===T.ans?C.green:C.gold; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:16px" onclick="visW43T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! Две половинки — целый круг!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! 2+1 = 3 куска из пяти</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ складывай только числители, знаменатель тот же</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW43Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW43Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW43(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Пицца для двоих друзей 🍕')+
        wkHero(pizza(4,4,'a',{s:126}))+
        wkAns('1 кусок + 2 куска = сколько вместе?', C.gold)+
        book('Запомни: целое делят на равные части — каждая часть называется долей; из всех долей целое собирается в круг.'));
    } else if(step===1){
      if(st.n==null) st.n=3;
      h=wkFrame(wkBig('Дробь — часть целого')+
        wkRow(wkChip('половина 1/2',C.blue),wkChip('треть 1/3',C.green),wkChip('четверть 1/4',C.gold))+
        wkHero(pizza(4,st.n,'b',{s:132}))+
        wkRow(wkPill(st.n+' из 4', C.gold))+
        wkRow(wkBtn('1 кусок',`visW43Act('${lk}','s1')`),wkBtn('2 куска',`visW43Act('${lk}','s2')`),wkBtn('3 куска',`visW43Act('${lk}','s3')`),wkBtn('целая',`visW43Act('${lk}','s4')`))+
        book('Запомни: числитель — сколько долей взяли, знаменатель — на сколько равных долей разделили целое. Доли имеют имена: половина, треть, четверть.'));
    } else if(step===2){
      h=wkFrame(wkBig('1/4 + 2/4 = 3/4')+
        wkHero(pchain([pizza(4,1,'c1',{s:72}),pizza(4,2,'c2',{s:72}),pizza(4,3,'c3',{s:72})],[sign('+'),sign('=')]))+
        wkRow(wkChip('1 кусок',C.blue),wkChip('+ 2 куска',C.blue),wkChip('= 3 куска из четырёх',C.gold))+
        wkAns('1 + 2 = 3 · знаменатель 4 не меняется!', C.green)+
        book('Запомни: складывать можно только одинаковые доли — тогда складываем числители, а знаменатель остаётся прежним.')+
        wkSml('нажми «Дальше» — посмотрим, как куски двигаются'));
    } else if(step===3){
      h=wkFrame(wkBig('Целая пицца = 4/4')+
        wkHero(pizza(4,4,'d',{s:162}))+
        cap('4 куска слетаются и образуют круг!')+
        wkRow(wkPill('4/4 = 1', C.green),wkChip('2 четверти = половина',C.gold))+
        book('2/4 = 1/2 — две четверти занимают ровно половину пиццы; 4/4 — вся пицца, то есть 1.')+
        wkSml('знаменатель не меняется: доли одной пиццы одинаковые'));
    } else if(step===4){
      h=wkFrame(wkBig('Разные доли — так нельзя!')+
        wkHero(pchain([pizza(2,1,'e1',{s:104}),pizza(4,1,'e2',{s:104})],[sign('+')]))+
        wkRow(wkPill('1/2 + 1/4',C.red),sign('≠',C.red),wkPill('2/6',C.red))+
        wkAns('половинка ≠ четвертинке — размер разный!', C.red)+
        book('Запомни: прежде чем складывать, доли должны стать ОДИНАКОВЫМИ — как одинаковые монетки одного достоинства.')+
        wkSml('сначала нарежем пиццу на одинаковые доли'));
    } else if(step===5){
      h=wkFrame(wkBig('Секрет: 1/2 = 2/4')+
        wkHero(pchain([pizza(2,1,'f1',{s:112}),pizza(4,2,'f2',{s:112})],['=']))+
        wkRow(wkPill('1/2 = 2/4', C.green),wkChip('равные дроби',C.gold))+
        book('Запомни: равные дроби — одна и та же порция: разрезали половинку пополам, долей стало больше, а еды столько же.')+
        wkSml('доли мельче — значит, их больше: 2 четвертинки вместо 1 половинки'));
    } else if(step===6){
      h=wkFrame(wkBig('К общему знаменателю')+
        wkHero(pchain([pizza(4,2,'g1',{s:70}),pizza(4,1,'g2',{s:70}),pizza(4,3,'g3',{s:70})],[sign('+'),sign('=')]))+
        wkRow(wkPill('1/2 = 2/4',C.blue),wkPill('+ 1/4',C.blue),wkPill('= 3/4',C.gold))+
        wkAns('3/4 = 0,75 · НОК(2,4) = 4', C.green)+
        book('Запомни: общий знаменатель — число, которое делится на оба знаменателя (наименьшее — НОК). Теперь доли одинаковые — можно складывать!')+
        wkSml('следим, как стрелка переносит куски в общий ряд'));
    } else if(step===7){
      h=wkFrame(wkBig('Целое — это 4/4')+
        wkHero(pchain([pizza(4,4,'h1',{s:102}),pizza(4,3,'h2',{s:102})],[sign('+')]))+
        wkRow(wkPill('1 = 4/4',C.green),wkPill('3/4 + 4/4 = 7/4',C.gold))+
        book('Запомни: целое можно записать дробью: 1 = 4/4. Семь четвертинок — это целая пицца и ещё 3 куска (7/4 = 1 + 3/4).')+
        wkSml('вся пицца — круг из 4 кусков, плюс ещё 3 куска'));
    } else {
      h=wkFrame(wkBig('Проверь себя 📝')+
        wkHero(pchain([pizza(5,2,'i1',{s:72}),pizza(5,1,'i2',{s:72}),pizza(5,3,'i3',{s:72})],[sign('+'),sign('=')]))+
        quiz(lk,st)+
        book('Запомни: две половинки всегда соберутся в целый круг: 1/2 + 1/2 = 2/2 = 1.')+
        wkSml('готов? жми «Понял! Проверю себя» — там 2/5 + 1/5'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[43]=visW43;
  function visW43T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW43T=visW43T;
  function visW43Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    const map={s1:1,s2:2,s3:3,s4:4};
    if(map[act]!=null) st.n=map[act];
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW43Act=visW43Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===43){ window.ARH_LESSONS[i]=L43; break; } } })();
})();

/* ================= УРОК 20 · Секрет умножения на 11 (v3) ================= */
(function(){
  const L20 = {
    id: 20, title: 'Секрет умножения на 11', ico: '✖️',
    src: 'Математика · Устный счёт · Умножение на 11', subj: 'math',
    explain: [
      'Магический поезд Архимеда: как мгновенно посчитать 45 · 11? Обычным столбиком — долго, а есть красивый устный фокус! Это приём быстрого устного счёта. Секрет простой — 11 = 10 + 1.',
      'Фокус: берём двузначное число ab и «раздвигаем» его цифры. В середину ставим их сумму: 45 · 11 → 4 (4+5) 5 → 4 9 5 → 495! Сумма 4+5=9 — меньше десяти, значит переносить не нужно.',
      'Почему так получается? Умножить на 11 — это умножить на 10 и прибавить само число: 45 · 11 = 45 · 10 + 45 = 450 + 45. Смотри: 450 и 45 записаны друг под другом — единицы и десятки складываются, и в середине оказывается сумма цифр 4+5!',
      'Потренируемся: 63 · 11. Шаг 1: цифры 6 и 3. Шаг 2: сумма 6+3 = 9. Шаг 3: вставляем 9 в середину → 693. Проверка: 63 · 10 = 630, плюс 63 → 693. Всё сходится!',
      'А если сумма цифр больше 9? Например, 37 · 11: 3+7 = 10. Десять не помещается в одну клетку! Пишем в середину 0, а единицу переносим к первой цифре: 3+1 = 4. Получаем 407.',
      'Ещё пример с переносом: 76 · 11. Сумма 7+6 = 13: пишем 3, единицу переносим — 7+1 = 8. Получаем 836. Проверь: 76·10 = 760, +76 = 836 ✔. Один перенос — и фокус работает!',
      'Тренажёр: тебе дадут число ab. Сначала раздвинь цифры, потом сложи их — и вставь сумму в середину. Если сумма больше 9 — перенеси единицу. Нажимай кнопки и открывай ответ!',
      'Тест из учебника: чему равно 45 · 11? А 63 · 11? Помни: раздвинь цифры и вставь в середину их сумму (с переносом, если нужно). Ответь в виджете ниже!',
      'Проверь себя: 45 · 11 = ? Сумма 4+5 = 9, вставляем в середину → 495. Готов? Жми «Понял! Проверю себя»!'
    ],
    check: { q: '45·11 = ?', choices: ['450', '495', '504', '945'], ans: 1,
      exp: '4 (4+5) 5 → 495.' },
    tasks: [
      { q: '63·11 = ?', kind: 'unit', ans: 693, tol: 0,
        hints: ['Цифры 6 и 3.', 'Сумма 6+3 = 9 в середину.'], sol: '6(6+3)3 = 693.' },
      { q: '37·11 = ?', kind: 'unit', ans: 407, tol: 0,
        hints: ['3+7 = 10 — больше 9.', 'Переносим: 3+1=4, в середине 0.'], sol: '3+7=10 → 407.' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a'};
  function digitCards(a,b,m,carry){
    // a,b — крайние цифры, m — сумма (или строка), carry — перенесённая к a
    const f=(x,c,h)=>`<g class="wv-pop" style="animation-delay:${(h*0.12).toFixed(2)}s"><rect x="${0}" y="0" width="46" height="56" rx="11" fill="rgba(255,255,255,.05)" stroke="${c||C.blue}" stroke-width="2.4"/><text x="23" y="37" text-anchor="middle" font-size="28" fill="${c||C.blue}" font-weight="bold" font-family="Georgia,serif">${x}</text></g>`;
    const row=[];
    row.push(f(carry!=null?carry:a, C.blue, 0));
    row.push(f(m, C.gold, 1));
    row.push(f(b, C.green, 2));
    return `<div class="wk-row" style="gap:6px">${row.join('<span style="font-size:20px;color:#8fa08f">·</span>')}</div>`;
  }
  const Q20=[
    {q:'45 · 11 = ?',opts:['450','495','504','945'],ans:1},
    {q:'63 · 11 = ?',opts:['630','636','693','963'],ans:2}
  ];
  function quiz(lk,st){
    const T=Q20[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:56px;font-size:15px" onclick="visW20T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! Оба теста решены!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! 4(4+5)5 = 495</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ раздвинь цифры и вставь их сумму в середину</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW20Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW20Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW20(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Магический поезд: 45 · 11')+
        wkHero(`<svg width="322" height="130" viewBox="0 0 322 130" style="display:block">
          <rect x="6" y="6" width="310" height="118" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="70" y="40" text-anchor="middle" font-size="13" fill="#9ec0a8">локомотив «45»</text>
          <rect x="16" y="50" width="62" height="44" rx="10" fill="rgba(127,209,255,.1)" stroke="${C.blue}" stroke-width="2.4"/>
          <text x="47" y="78" text-anchor="middle" font-size="24" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">45</text>
          <text x="140" y="78" text-anchor="middle" font-size="30" fill="#8fa08f">× 11</text>
          <rect x="176" y="44" width="130" height="56" rx="13" fill="rgba(217,164,65,.08)" stroke="${C.gold}" stroke-width="2"/>
          <text x="241" y="70" text-anchor="middle" font-size="13" fill="#d9c088">секрет:</text>
          <text x="241" y="90" text-anchor="middle" font-size="15" fill="${C.gold}" font-weight="bold">11 = 10 + 1</text>
          <text x="161" y="116" text-anchor="middle" font-size="11.5" fill="#9ec0a8">посчитаем в уме за секунду!</text>
        </svg>`)+
        wkAns('45 · 11 = 450 + 45 = 495', C.green)+
        wkSml('умножить на 11 — это умножить на 10 и прибавить само число'));
    } else if(step===1){
      h=wkFrame(wkBig('Фокус: раздвигаем цифры')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <text x="161" y="18" text-anchor="middle" font-size="13" fill="#9ec0a8">4 и 5 раздвигаем — в середину их сумму</text>
          ${[['4',40,C.blue],['4+5=9',161,C.gold],['5',282,C.green]].map((d,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
              <rect x="${d[1]-34}" y="30" width="68" height="52" rx="12" fill="rgba(255,255,255,.05)" stroke="${d[2]}" stroke-width="2.6"/>
              <text x="${d[1]}" y="63" text-anchor="middle" font-size="24" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text>
            </g>`).join('')}
        </svg>`)+
        wkRow(wkPill('45 · 11 = 495', C.gold))+
        wkAns('в середину вставили сумму 4 + 5 = 9', C.green)+
        wkSml('получилось 4 9 5 — три цифры подряд, и ответ готов!'));
    } else if(step===2){
      h=wkFrame(wkBig('Почему так работает?')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <rect x="6" y="6" width="310" height="108" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="16" y="20" width="120" height="40" rx="10" fill="rgba(127,209,255,.08)" stroke="${C.blue}" stroke-width="2"/>
            <text x="76" y="46" text-anchor="middle" font-size="16" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">45·10 = 450</text></g>
          <g class="wv-pop2"><rect x="16" y="68" width="120" height="40" rx="10" fill="rgba(127,209,160,.08)" stroke="${C.green}" stroke-width="2"/>
            <text x="76" y="94" text-anchor="middle" font-size="16" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">+ 45</text></g>
          <g class="wv-pop3"><line x1="150" y1="22" x2="150" y2="106" stroke="#3d5c49" stroke-width="2"/><text x="150" y="20" text-anchor="middle" font-size="15" fill="#8fa08f">+</text>
            <rect x="170" y="44" width="140" height="40" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="240" y="70" text-anchor="middle" font-size="18" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">495</text></g>
        </svg>`)+
        wkSml('450 + 45: единицы и десятки складываются — в середине сумма цифр 4+5'));
    } else if(step===3){
      h=wkFrame(wkBig('Пример: 63 · 11')+
        wkHero(`<svg width="322" height="104" viewBox="0 0 322 104" style="display:block">
          ${[['6',46,C.blue],['9',161,C.gold],['3',276,C.green]].map((d,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${d[1]-38}" y="22" width="76" height="58" rx="13" fill="rgba(255,255,255,.05)" stroke="${d[2]}" stroke-width="2.6"/>
              <text x="${d[1]}" y="42" text-anchor="middle" font-size="11" fill="#9ec0a8">${i===0?'шаг 1: цифра':(i===1?'шаг 2: сумма':'шаг 3: цифра')}</text>
              <text x="${d[1]}" y="72" text-anchor="middle" font-size="30" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text>
            </g>`).join('')}
          <text x="161" y="96" text-anchor="middle" font-size="12" fill="#9ec0a8">6 + 3 = 9 — вставляем в середину</text>
        </svg>`)+
        wkRow(wkPill('63 · 11 = 693', C.green))+
        wkSml('проверка: 63 · 10 = 630, + 63 = 693 ✔'));
    } else if(step===4){
      h=wkFrame(wkBig('Перенос: 37 · 11')+
        wkHero(`<svg width="322" height="112" viewBox="0 0 322 112" style="display:block">
          <g class="wv-pop"><rect x="16" y="20" width="88" height="52" rx="12" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
            <text x="60" y="54" text-anchor="middle" font-size="13" fill="#9ec0a8">3 + 7 = 10</text></g>
          <g class="wv-pop2"><rect x="118" y="20" width="90" height="52" rx="12" fill="rgba(232,106,90,.1)" stroke="${C.red}" stroke-width="2.4"/>
            <text x="163" y="54" text-anchor="middle" font-size="13.5" fill="${C.red}" font-weight="bold">10 > 9!</text></g>
          <g class="wv-pop3"><rect x="222" y="14" width="88" height="64" rx="12" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.6"/>
            <text x="266" y="36" text-anchor="middle" font-size="12" fill="#d9c088">единица — вперёд!</text>
            <text x="266" y="66" text-anchor="middle" font-size="24" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">407</text></g>
          <text x="161" y="104" text-anchor="middle" font-size="12" fill="#9ec0a8">в середину пишем 0, единицу переносим: 3+1 = 4</text>
        </svg>`)+
        wkRow(wkPill('37 · 11 = 407', C.green))+
        wkSml('сумма 10 не помещается — переносим единицу к первой цифре'));
    } else if(step===5){
      h=wkFrame(wkBig('Ещё перенос: 76 · 11')+
        wkHero(`<svg width="322" height="104" viewBox="0 0 322 104" style="display:block">
          ${[['7+1=8',76,C.blue],['3',161,C.gold],['6',276,C.green]].map((d,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${d[1]-44}" y="22" width="88" height="58" rx="13" fill="rgba(255,255,255,.05)" stroke="${d[2]}" stroke-width="2.6"/>
              <text x="${d[1]}" y="42" text-anchor="middle" font-size="11" fill="#9ec0a8">${i===0?'перенос: 7+1':(i===1?'сумма 7+6=13':'цифра')}</text>
              <text x="${d[1]}" y="72" text-anchor="middle" font-size="26" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text>
            </g>`).join('')}
        </svg>`)+
        wkRow(wkPill('76 · 11 = 836', C.green))+
        wkSml('7+6 = 13: пишем 3, единица к 7 → 8. Проверка: 760+76 = 836 ✔'));
    } else if(step===6){
      if(st.tr==null) st.tr=0;
      const POOL=[[4,5],[6,3],[3,7],[7,6],[9,2],[5,8]];
      const [a,b]=POOL[st.tr%POOL.length];
      const sum=a+b;
      const hi=sum>=10;
      const res=(hi?(a+1):a)*100+(sum%10)*10+b;
      h=wkFrame(wkBig('Тренажёр умножения на 11')+
        wkHero(`<svg width="322" height="84" viewBox="0 0 322 84" style="display:block">
          <text x="161" y="16" text-anchor="middle" font-size="13" fill="#9ec0a8">${a}${b} · 11 = ?</text>
          <rect x="86" y="24" width="50" height="44" rx="10" fill="rgba(127,209,255,.1)" stroke="${C.blue}" stroke-width="2.4"/><text x="111" y="53" text-anchor="middle" font-size="24" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">${a}</text>
          <rect x="150" y="24" width="86" height="44" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/><text x="193" y="53" text-anchor="middle" font-size="16" fill="${C.gold}" font-weight="bold">${st.s1?'сумма = '+sum:'?'}</text>
          <rect x="250" y="24" width="50" height="44" rx="10" fill="rgba(127,209,160,.12)" stroke="${C.green}" stroke-width="2.4"/><text x="275" y="53" text-anchor="middle" font-size="24" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">${b}</text>
        </svg>`)+
        (st.s2? wkAns('ответ: '+a+b+' · 11 = '+res+(hi?' (перенос!)':''), C.gold):'')+
        wkRow(wkBtn('1️⃣ сумма',`visW20Act('${lk}','s1')`),wkBtn('2️⃣ ответ',`visW20Act('${lk}','s2')`),wkBtn('🎲 новый',`visW20Act('${lk}','n')`),wkBtn('↺',`visW20Act('${lk}','rst')`))+
        wkSml('раздвинь цифры и вставь сумму в середину'+(hi?' — она больше 9, перенеси единицу!':'')));
    } else if(step===7){
      h=wkFrame(wkBig('Тест из учебника 📝')+quiz(lk,st)+
        wkSml('вопросы из учебника по устному счёту: раздвинь цифры, вставь сумму'));
    } else {
      h=wkFrame(wkBig('Проверь себя: 45 · 11')+
        wkHero(`<svg width="322" height="88" viewBox="0 0 322 88" style="display:block">
          ${[['4',50,C.blue],['4+5=9',161,C.gold],['5',272,C.green]].map((d,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
              <rect x="${d[1]-36}" y="16" width="72" height="52" rx="12" fill="rgba(255,255,255,.05)" stroke="${d[2]}" stroke-width="2.6"/>
              <text x="${d[1]}" y="50" text-anchor="middle" font-size="24" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text>
            </g>`).join('')}
          <text x="161" y="82" text-anchor="middle" font-size="12.5" fill="#9ec0a8">в середину — сумму 4+5 = 9</text>
        </svg>`)+
        wkAns('45 · 11 = 495!', C.green)+
        wkSml('жми «Понял! Проверю себя» — там вопрос 45 · 11'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[20]=visW20;
  function visW20T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW20T=visW20T;
  function visW20Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=st.s2=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW20Act=visW20Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===20){ window.ARH_LESSONS[i]=L20; break; } } })();
})();
/* ================= УРОК 21 · Числа из цифр без повторов (v5) ================= */
(function(){
  if(!window.__wk21v5css){
    window.__wk21v5css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .f5in{animation:f5In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes f5In{0%{transform:translateY(-14px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .f5pop{animation:f5Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes f5Pop{0%{transform:scale(.1);opacity:0}75%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .f5flow{stroke-dasharray:8 6;animation:f5Flow .9s linear infinite;}'+
      '@keyframes f5Flow{to{stroke-dashoffset:-28}}'+
      '#lvis .f5float{animation:f5Float 1.6s ease-in-out infinite;}'+
      '@keyframes f5Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}'+
      '#lvis .f5ring{animation:f5Ring 1.1s ease-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes f5Ring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.6);opacity:0}}';
    document.head.appendChild(st);
  }
  const L21 = {
    id: 21, title: 'Числа из цифр без повторов', ico: '🔑',
    src: 'Математика · Комбинаторика · Правило умножения', subj: 'math',
    explain: [
      'Сейф Архимеда заперт на код из ДВУХ цифр. На барабанах сейфа три цифры: 1, 2 и 3. Правило сейфа: цифры в коде не должны повторяться. Сколько же разных кодов может быть? Считать перебором долго и легко ошибиться — но есть красивый способ посчитать точно, шаг за шагом.',
      'Подумаем про ПЕРВУЮ цифру кода. Она может быть любой из трёх: 1, 2 или 3. Это как выбрать первый ключ из связки из трёх ключей — вариантов ровно 3. Запомним: первый выбор даёт 3 варианта.',
      'Теперь ВТОРАЯ цифра. Повторять нельзя! Одну цифру мы уже поставили первой. Если первой стоит 1, то второй может быть только 2 или 3. А если первой стоит 2 — то только 1 или 3. В любом случае для второй цифры остаётся ровно 2 варианта.',
      'Вот главное правило: если первый выбор можно сделать m способами, а второй — n способами, то ВСЕГО вариантов m · n. У нас: 3 варианта первой цифры и 2 варианта второй → 3 · 2 = 6 кодов. Проверим руками: 12, 13, 21, 23, 31, 32 — ровно шесть! Важно: 12 и 21 — это разные коды.',
      'Усложним: цифр уже пять — 1, 2, 3, 4, 5 — а код всё ещё из двух цифр. Первую цифру выбираем 5 способами. Вторую — из оставшихся четырёх: 4 способа. Получаем 5 · 4 = 20 чисел. Заметь закономерность: после каждого выбора остаётся на один вариант меньше.',
      'А теперь код из ТРЁХ цифр на тех же пяти цифрах. Первая — 5 способов, вторая — 4, третья — 3. Умножаем по шагам: 5 · 4 = 20, затем 20 · 3 = 60. Итого 60 трёхзначных чисел. Множители спускаются вниз, как ступеньки: 5, 4, 3.',
      'Если использовать ВСЕ пять цифр — по одной на каждую позицию — получатся перестановки. Считаем так: 5 · 4 · 3 · 2 · 1 = 120. Коротко это записывают 5! и называют «факториал». Каждая новая позиция «забирает» одну цифру из набора.',
      'Внимание, ловушка с нулём! Берём цифры 0, 1, 2 и составляем двузначные числа без повторов. Цифра 0 НЕ может стоять первой: число 01 — это просто 1, ноль в начале «невидим». Значит, первую цифру выбираем 2 способами (1 или 2), а вторую — из двух оставшихся. Итог: 2 · 2 = 4 числа: 10, 12, 20, 21.',
      'Подведём итог: из цифр 1, 2, 3 без повторов двузначных чисел ровно 3 · 2 = 6. Проверь себя в тесте ниже и жми «Понял! Проверю себя» — там ждёт этот же вопрос!'
    ],
    check: { q: 'Сколько двузначных чисел можно составить из цифр 1,2,3 без повторов?', choices: ['3', '6', '9', '12'], ans: 1,
      exp: '3·2 = 6.' },
    tasks: [
      { q: 'Сколько двузначных чисел можно составить из цифр 1,2,3,4,5, не повторяя цифры?', kind: 'unit', ans: 20, tol: 0,
        hints: ['Первая цифра — 5 способов.', 'Вторая — 4 способа.'], sol: '5·4 = 20.' },
      { q: 'Сколько трёхзначных чисел можно составить из цифр 1,2,3,4,5 без повторов?', kind: 'unit', ans: 60, tol: 0,
        hints: ['Первая — 5, вторая — 4, третья — 3.', '5·4·3 = 60.'], sol: '5·4·3 = 60.' }
    ]
  };
  const C=['#5aa0d8','#6fbf7a','#e0b64d','#d98ab0','#e08a55','#8fc7e8'];
  const G={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a'};
  const rad=(d)=>d*Math.PI/180;
  /* большой круг с цифрой, текст идеально по центру */
  function disc(cx,cy,r,digit,fill,stroke,opt){
    const o=opt||{};
    const size=o.size||Math.min(40, Math.floor((r*2-6)/(String(digit).length*0.62)));
    const fs=Math.max(14,size);
    return `<g class="f5pop" style="${o.delay?'animation-delay:'+o.delay+'s':''}">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>
      ${o.glow?`<circle class="f5ring" cx="${cx}" cy="${cy}" r="${r-2}" fill="none" stroke="${stroke}" stroke-width="2"/>`:''}
      <text x="${cx}" y="${(cy+fs*0.36).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${digit}</text>
    </g>`;
  }
  function opSign(x,y,t,big){
    return `<text class="f5pop" style="${big?'':'animation-delay:.15s'}" x="${x}" y="${y}" text-anchor="middle" font-size="${big||30}" fill="#cfe0cf" font-weight="bold">${t}</text>`;
  }
  const Q21=[
    {q:'Сколько двузначных чисел из цифр 1,2,3 без повторов?',opts:['3','6','9'],ans:1},
    {q:'Сколько трёхзначных чисел из цифр 1,2,3,4,5 без повторов?',opts:['20','60','120'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q21[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?G.green:G.red; tc=i===T.ans?G.green:G.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:17px" onclick="visW21T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">🎉 верно! 5·4·3 = 60</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">✅ верно! 3 · 2 = 6</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15.5px">❌ перемножь способы выбора: первую × вторую (× третью)</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW21Act('${lk}','nq')`):'';
    const rst=wkBtn('↺ заново',`visW21Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW21(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.pair==null) st.pair=0;
      const p1=st.pair%3+1, p2=(st.pair+1)%3+1;
      h=wkFrame(wkBig('Сейф Архимеда 🔐')+
        wkHero(`<svg width="330" height="150" viewBox="0 0 330 150" style="display:block">
          <rect x="6" y="6" width="318" height="138" rx="22" fill="#241a10" stroke="#c9a06a" stroke-width="3"/>
          <rect x="24" y="20" width="116" height="84" rx="14" fill="#17110a" stroke="#8a6a3a" stroke-width="2"/>
          <text x="82" y="32" text-anchor="middle" font-size="10" fill="#c9a06a" font-weight="bold">первая цифра</text>
          ${disc(82,72,30,p1,'#ffd76a','#ffd76a')}
          <g class="f5float"><text x="156" y="80" text-anchor="middle" font-size="34" fill="#ffd76a">+</text></g>
          <rect x="188" y="20" width="116" height="84" rx="14" fill="#17110a" stroke="#8a6a3a" stroke-width="2"/>
          <text x="246" y="32" text-anchor="middle" font-size="10" fill="#c9a06a" font-weight="bold">вторая цифра</text>
          ${disc(246,72,30,p2,'#8fd1a8','#8fd1a8',{delay:.15})}
          <circle cx="303" cy="58" r="9" fill="#ff8a7a"/>
          <circle cx="303" cy="86" r="9" fill="#ff8a7a"/>
          <text x="165" y="124" text-anchor="middle" font-size="13" fill="#ffdfa0">код из двух цифр · цифры не повторяются</text>
        </svg>`)+
        wkRow(wkBtn('🔀 покрутить барабаны',`visW21Act('${lk}','spin')`),wkChip('на барабанах: 1, 2, 3', G.blue))+
        wkSml('кодов может быть много — посчитаем их точно и без перебора, шаг за шагом'));
    } else if(step===1){
      h=wkFrame(wkBig('Шаг 1: первая цифра — 3 способа')+
        wkHero(`<svg width="330" height="150" viewBox="0 0 330 150" style="display:block">
          <rect x="6" y="6" width="318" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="26" text-anchor="middle" font-size="12" fill="#9ec0a8">связка из трёх ключей — берём любой</text>
          ${[1,2,3].map((d,i)=>{const x=70+i*96;return `<g class="f5float" style="animation-delay:${(i*0.15).toFixed(2)}s"><circle cx="${x}" cy="86" r="30" fill="rgba(255,255,255,.06)" stroke="#4c8a5a" stroke-width="2"/><text x="${x}" y="92" text-anchor="middle" font-size="13" fill="#9ec0a8">ключ</text><text x="${x}" y="66" text-anchor="middle" font-size="13" fill="#9ec0a8">№${i+1}</text></g><g class="f5pop" style="animation-delay:${(0.2+i*0.15).toFixed(2)}s"><circle cx="${x}" cy="80" r="30" fill="${C[i]}" opacity=".9"/><text x="${x}" y="90" text-anchor="middle" font-size="34" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${d}</text></g>`;}).join('')}
        </svg>`)+
        wkAns('первая цифра — любая из трёх: 3 способа', G.gold)+
        wkSml('это первый множитель будущего умножения — запомни число 3'));
    } else if(step===2){
      h=wkFrame(wkBig('Шаг 2: вторая цифра — 2 способа')+
        wkHero(`<svg width="330" height="160" viewBox="0 0 330 160" style="display:block">
          <rect x="6" y="6" width="318" height="148" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">дерево выбора: после любой первой — по 2 ветки</text>
          <circle cx="165" cy="52" r="16" fill="rgba(255,255,255,.08)" stroke="#5aa883" stroke-width="2.4"/>
          <text x="165" y="58" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">?</text>
          ${[0,1,2].map(i=>{const x=60+i*106;return `<line class="f5flow" x1="165" y1="68" x2="${x}" y2="94" stroke="#7fae8f" stroke-width="2"/>`;}).join('')}
          ${[0,1,2].map(i=>{const x=60+i*106;return `<g class="f5pop" style="animation-delay:${(0.25+i*0.18).toFixed(2)}s"><circle cx="${x}" cy="104" r="20" fill="${C[i]}" opacity=".92"/><text x="${x}" y="112" text-anchor="middle" font-size="24" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${i+1}</text></g>`;}).join('')}
          ${[0,1,2].map(i=>{const x=60+i*106;return [0,1].map(j=>{const b2=x+(j?26:-26);return `<line class="f5flow" x1="${x}" y1="124" x2="${b2}" y2="140" stroke="#7fae8f" stroke-width="2"/>`;}).join('');}).join('')}
          <text x="165" y="158" text-anchor="middle" font-size="11" fill="#8fa08f">6 листьев — 6 кодов</text>
        </svg>`)+
        wkSml('какую цифру ни поставим первой — для второй всегда остаются 2 варианта'));
    } else if(step===3){
      h=wkFrame(wkBig('Правило умножения: 3 · 2 = 6')+
        wkHero(`<svg width="330" height="150" viewBox="0 0 330 150" style="display:block">
          <rect x="6" y="6" width="318" height="126" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${disc(74,70,33,'3','#7fd1ff','#7fd1ff',{glow:true})}
          ${opSign(126,82,'×',26)}
          ${disc(152,70,33,'2','#8fd1a8','#8fd1a8',{delay:.15,glow:true})}
          ${opSign(204,82,'=',26)}
          ${disc(248,70,40,'6','#ffd76a','#ffd76a',{delay:.3,glow:true})}
          <text x="165" y="120" text-anchor="middle" font-size="12" fill="#9ec0a8">первый выбор × второй выбор</text>
        </svg>`)+
        wkRow(`<span class="f5in" style="display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">12</span><span class="f5in" style="animation-delay:.1s;display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">13</span><span class="f5in" style="animation-delay:.2s;display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">21</span><span class="f5in" style="animation-delay:.3s;display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">23</span><span class="f5in" style="animation-delay:.4s;display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">31</span><span class="f5in" style="animation-delay:.5s;display:inline-block;margin:2px 6px;font-size:15px;color:#e8dcc8;background:rgba(255,255,255,.06);border-radius:999px;padding:3px 12px;border:1.5px solid #4c8a5a">32</span>`)+
        wkAns('ровно 6 кодов — и 12 ≠ 21: порядок важен!', G.green));
    } else if(step===4){
      h=wkFrame(wkBig('Пять цифр, код из двух: 5 · 4')+
        wkHero(`<svg width="330" height="160" viewBox="0 0 330 160" style="display:block">
          <rect x="6" y="6" width="318" height="148" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">выбрали первую цифру 1 — остались 4</text>
          ${[1,2,3,4,5].map((d,i)=>{const x=48+i*58;return `<g class="f5pop" style="animation-delay:${(i*0.08).toFixed(2)}s"><circle cx="${x}" cy="60" r="${i===0?28:22}" fill="${i===0?'#ffd76a':C[i%5]}" opacity="${i===0?1:.55}"/><text x="${x}" y="${i===0?68:66}" text-anchor="middle" font-size="${i===0?30:22}" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${d}</text></g>`;}).join('')}
          <text x="272" y="64" text-anchor="middle" font-size="11" fill="#9ec0a8">5 выборов</text>
          ${[2,3,4,5].map((d,i)=>{const x=38+i*62;return `<g class="f5pop" style="animation-delay:${(0.3+i*0.1).toFixed(2)}s"><circle cx="${x}" cy="118" r="24" fill="${C[i+1]}" opacity=".9"/><text x="${x}" y="125" text-anchor="middle" font-size="26" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${d}</text></g>`;}).join('')}
          <text x="302" y="124" text-anchor="middle" font-size="11" fill="#9ec0a8">4 способа</text>
          <path class="f5flow" d="M48 92 C 110 102, 170 100, 240 94" fill="none" stroke="#ffd76a" stroke-width="2.6"/>
        </svg>`)+
        wkRow(wkPill('5 · 4 = 20 чисел', G.green))+
        wkSml('вторую цифру выбираем из оставшихся четырёх — каждый выбор уменьшает варианты'));
    } else if(step===5){
      h=wkFrame(wkBig('Код из трёх цифр: 5 · 4 · 3')+
        wkHero(`<svg width="330" height="160" viewBox="0 0 330 160" style="display:block">
          <rect x="6" y="6" width="318" height="148" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">три позиции кода · множители спускаются вниз</text>
          ${[[5,70,'#5aa0d8','1-я цифра'],[4,165,'#6fbf7a','2-я цифра'],[3,260,'#d98ab0','3-я цифра']].map((d,i)=>`
            <g class="f5pop" style="animation-delay:${(i*0.2).toFixed(2)}s"><circle cx="${d[1]}" cy="92" r="36" fill="rgba(255,255,255,.06)" stroke="${d[2]}" stroke-width="3"/><text x="${d[1]}" y="70" text-anchor="middle" font-size="11" fill="#9ec0a8">${d[3]}</text><text x="${d[1]}" y="102" text-anchor="middle" font-size="40" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text></g>`).join('')}
          ${[[130,'×'],[232,'×']].map((d,i)=>`<text class="f5pop" style="animation-delay:${(0.25+i*0.2).toFixed(2)}s" x="${d[0]}" y="104" text-anchor="middle" font-size="32" fill="#cfe0cf" font-weight="bold">${d[1]}</text>`).join('')}
          <rect x="96" y="130" width="138" height="20" rx="10" fill="rgba(217,164,65,.12)" stroke="#ffd76a"/>
          <text x="165" y="144" text-anchor="middle" font-size="13.5" fill="#ffd76a" font-weight="bold">5·4 = 20 → 20·3 = 60</text>
        </svg>`)+
        wkAns('60 трёхзначных чисел!', G.green)+
        wkSml('позиции заполняются по очереди: сперва 5 вариантов, потом 4, потом 3'));
} else if(step===6){
      h=wkFrame(wkBig('Все пять цифр: 5! = 120')+
        wkHero(`<svg width="330" height="160" viewBox="0 0 330 160" style="display:block">
          <rect x="6" y="6" width="318" height="148" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="22" text-anchor="middle" font-size="12" fill="#9ec0a8">пять гостей садятся на пять мест — по очереди</text>
          ${[0,1,2,3,4].map(i=>{const x=46+i*62;return `<g><circle cx="${x}" cy="124" r="24" fill="rgba(255,255,255,.05)" stroke="#4c8a5a" stroke-width="2.4"/><text x="${x}" y="131" text-anchor="middle" font-size="16" fill="#cfe0cf" font-weight="bold">${i+1}</text></g>`;}).join('')}
          ${[0,1,2,3,4].map(i=>{const x=46+i*62;return `<g class="f5in" style="animation-delay:${(0.2+i*0.2).toFixed(2)}s"><text x="${x}" y="52" text-anchor="middle" font-size="26">${['🐰','🦊','🐻','🐺','🐱'][i]}</text></g>`;}).join('')}
          ${[0,1,2,3,4].map(i=>{const x=46+i*62;return `<line class="f5flow" x1="${x}" y1="60" x2="${x}" y2="96" stroke="#5aa883" stroke-width="2"/>`;}).join('')}
        </svg>`)+
        wkRow(wkPill('5 · 4 · 3 · 2 · 1 = 120', '#e8a0d8'),wkChip('коротко: 5! = 120', G.gold))+
        wkSml('каждое новое место забирает одну цифру-гостя: так считаются перестановки'));
    } else if(step===7){
      h=wkFrame(wkBig('Ловушка: ноль в начале невидим')+
        wkHero(`<svg width="330" height="150" viewBox="0 0 330 150" style="display:block">
          <rect x="6" y="6" width="318" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">первая позиция заперта: ноль не пускаем!</text>
          <g class="f5pop"><rect x="40" y="44" width="74" height="66" rx="14" fill="rgba(232,106,90,.1)" stroke="#ff8a7a" stroke-width="3" stroke-dasharray="8 5"/><text x="77" y="86" text-anchor="middle" font-size="38" fill="#ff8a7a" font-weight="bold" font-family="Georgia,serif">0</text><text x="77" y="102" text-anchor="middle" font-size="10" fill="#ff9a8a">замок ✕</text></g>
          <g class="f5pop" style="animation-delay:.2s"><rect x="128" y="44" width="74" height="66" rx="14" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3"/><text x="165" y="86" text-anchor="middle" font-size="38" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">1</text><text x="165" y="102" text-anchor="middle" font-size="10" fill="#9fc5e8">можно</text></g>
          <g class="f5pop" style="animation-delay:.3s"><rect x="216" y="44" width="74" height="66" rx="14" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3"/><text x="253" y="86" text-anchor="middle" font-size="38" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">2</text><text x="253" y="102" text-anchor="middle" font-size="10" fill="#9fc5e8">можно</text></g>
          <g class="f5in" style="animation-delay:.5s"><text x="165" y="132" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">2 · 2 = 4 числа: 10, 12, 20, 21</text></g>
        </svg>`)+
        wkSml('первая цифра — 2 способа (без нуля!), вторая — из двух оставшихся'));
    } else {
      h=wkFrame(wkBig('Проверь себя 📝')+
        wkHero(`<svg width="330" height="96" viewBox="0 0 330 96" style="display:block">
          ${disc(58,50,34,'3','#7fd1ff','#7fd1ff')}
          ${opSign(104,60,'×',26)}
          ${disc(130,50,34,'2','#8fd1a8','#8fd1a8',{delay:.12})}
          ${opSign(178,60,'=',26)}
          ${disc(224,50,42,'6','#ffd76a','#ffd76a',{delay:.24,glow:true})}
          <text x="165" y="88" text-anchor="middle" font-size="11.5" fill="#9ec0a8">из цифр 1·2·3 · без повторов · код из двух</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('3 · 2 = 6 — жми «Понял! Проверю себя»!'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[21]=visW21;
  function visW21T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW21T=visW21T;
  function visW21Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='spin') st.pair=((st.pair==null?0:st.pair)+1)%3;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW21Act=visW21Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===21){ window.ARH_LESSONS[i]=L21; break; } } })();
})();

/* ================= УРОК 79 · Сложение и вычитание дробей (v5, эталон урока 2) ================= */
(function(){
  if(!window.__wk79v5css){
    window.__wk79v5css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .v5in{animation:v5In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes v5In{0%{transform:translateY(-12px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .v5pop{animation:v5Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes v5Pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .v5flow{stroke-dasharray:8 6;animation:v5Flow .9s linear infinite;}'+
      '@keyframes v5Flow{to{stroke-dashoffset:-28}}';
    document.head.appendChild(st);
  }
  const L79 = {
    id: 79, title: 'Сложение и вычитание дробей', ico: '🍕',
    src: 'Математика · 5 класс · Дроби: сложение и вычитание', subj: 'math',
    explain: [
      'Пиццерия Архимеда: одна пицца разрезана на 8 РАВНЫХ кусков. Два друга заказали её на двоих: первый взял 3 куска, второй — 4. Сколько кусков они съели вместе? Вопрос простой: 3 куска плюс 4 куска из одной пиццы — сколько всего? Это и есть сложение дробей: 3/8 + 4/8 = ?',
      'Сначала вспомним язык дробей. Знаменатель (число внизу) говорит, на сколько РАВНЫХ частей разделили целое: у нас 8 кусков. Числитель (число сверху) говорит, сколько таких частей взяли: например, 3. Значит, 3/8 — это «три куска из восьми». Целая пицца — 8/8.',
      'Правило сложения одинаковых долей: если куски ОДНОГО размера, их можно соединять. 2/7 + 3/7: взяли 2 седьмых и ещё 3 седьмых — всего 5 седьмых, но «седьмых» по-прежнему 7. Знаменатель НЕ меняется, складываем только числители: 2 + 3 = 5. Ответ 5/7.',
      'Теперь наш пример: 3/8 + 4/8. Пицца одна, кусков в ней 8 — значит, и в ответе знаменатель 8. Складываем числители: 3 + 4 = 7. Получаем 7/8! Ловушка: некоторые складывают и знаменатели (8+8=16) и пишут 7/16. Так нельзя: кусков в пицце по-прежнему восемь!',
      'Вычитание — то же сложение, только наоборот: 5/8 − 2/8. Было 5 кусков, два убрали — осталось 3 из тех же восьми: 5/8 − 2/8 = 3/8. Ещё пример: 7/10 − 3/10 = 4/10. Знаменатель не меняется, вычитаем только числители.',
      'Задача «сколько осталось»: пирог разрезали на 9 равных кусков. Маша съела 2/9, Петя — 3/9. Вместе они съели 2/9 + 3/9 = 5/9, то есть 5 кусков из 9. Сколько осталось? Из 9 кусков убрали 5 — осталось 4 куска, то есть 4/9 пирога.',
      'А если доли РАЗНЫЕ? Например, 2/3 + 1/4: треть и четверть — куски разного размера, их нельзя складывать как 3/7. Сначала приводим к одинаковым долям: общий знаменатель 12 (это НОК чисел 3 и 4). Тогда 2/3 = 8/12, а 1/4 = 3/12.',
      'Теперь всё просто: 8/12 + 3/12 = 11/12. И вычитание с разными знаменателями: 5/6 − 3/4. НОК чисел 6 и 4 — это 12: 5/6 = 10/12, 3/4 = 9/12, значит 10/12 − 9/12 = 1/12. Всегда три шага: найди НОК → приведи каждую дробь → посчитай числители.',
      'Проверь себя: 3/8 + 4/8 = ? Пицца на 8 кусков, складываем только числители: 3 + 4 = 7, знаменатель остаётся 8. Ответ: 7/8! Жми «Понял! Проверю себя» — там ждёт этот пример.'
    ],
    check: { q: 'Сколько будет 3/8 + 4/8?', choices: ['7', '7/8', '7/16'], ans: 1,
      exp: 'Числители складываем: 3 + 4 = 7, а знаменатель 8 остаётся → 3/8 + 4/8 = 7/8.' },
    tasks: [
      { q: 'Пирог разрезали на 9 равных кусков. Маша съела 2/9 пирога, а Петя — 3/9. Сколько кусков пирога осталось?', kind: 'unit', ans: 4, tol: 0,
        hints: ['Съели 2/9 + 3/9 = 5/9 — это 5 кусков из 9.', 'Осталось 9 - 5 = 4 куска.'], sol: '2/9 + 3/9 = 5/9; 9/9 - 5/9 = 4/9 → осталось 4 куска.' },
      { q: 'Сколько будет 7/10 - 3/10?', kind: 'choice', choices: ['4/10', '10/10', '4/20'], ans: 0, tol: 0,
        hints: ['Числители вычитаем: 7 - 3.', 'Знаменатель 10 не меняется.'], sol: '7 - 3 = 4, знаменатель прежний → 7/10 - 3/10 = 4/10.' }
    ]
  };
  const SLICE_COL=['#ffd76a','#ffb35c','#ff8f6b','#ff7fa8','#c9a0ff','#9fd1ff','#8fd1a8','#e8e0c8'];
  const G={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a'};
  const rad=(d)=>d*Math.PI/180;
  /* пицца из кусков без цифр внутри: только цвет и золотая корочка у «взятых» */
  function pizza(den,hl,uid,opt){
    const o=opt||{};
    const s=o.s||120;
    const W=s+12, cx=W/2, cy=W/2, R=s/2-2;
    const step=360/den, gapD=Math.min(2.2,Math.max(0.8,7/den));
    const hlN=Math.max(0,Math.min(den,hl==null?0:hl));
    let svg=`<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" style="display:block;margin:0 auto"><circle cx="${cx}" cy="${cy}" r="${R+2}" fill="#161f18" stroke="#2a3f30"/>`;
    for(let i=0;i<den;i++){
      const a0=-90+i*step+gapD/2, a1=-90+(i+1)*step-gapD/2;
      const on=hlN>0&&i<hlN;
      const x0=cx+R*Math.cos(rad(a0)),y0=cy+R*Math.sin(rad(a0));
      const x1=cx+R*Math.cos(rad(a1)),y1=cy+R*Math.sin(rad(a1));
      const large=(a1-a0)>180?1:0;
      const d=`M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`;
      svg+=`<g class="${on?'v5pop':''}" style="${on?'animation-delay:'+(i*0.09).toFixed(2)+'s':''}">
        <path d="${d}" fill="${on?SLICE_COL[i%SLICE_COL.length]:'#24382c'}" stroke="${on?'#ffd76a':'#3d5c49'}" stroke-width="${on?2.6:1.2}"/>
        ${on?`<path d="${d}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="1"/>`:''}
      </g>`;
    }
    svg+='</svg>';
    return svg;
  }
  const banner=(t,c)=>`<div class="v5in" style="font-size:12.5px;letter-spacing:1.5px;color:${c||'#c9b28a'};font-weight:bold;text-align:center">${t}</div>`;
  const cap=(t)=>`<div style="font-size:13px;color:#e8dcc8;text-align:center;font-family:Georgia,serif;font-weight:bold">${t}</div>`;
  const Q79=[
    {q:'3/8 + 4/8 = ?',opts:['7/16','7/8','7'],ans:1},
    {q:'5/8 − 2/8 = ?',opts:['3/0','3/8','7/8'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q79[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?G.green:G.red; tc=i===T.ans?G.green:G.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:70px;font-size:17px" onclick="visW79T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">🎉 верно! Оба примера решены!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">✅ верно! 3+4 = 7, знаменатель 8</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15.5px">❌ складывай числители, знаменатель не трогай</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW79Act('${lk}','nq')`):'';
    const rst=wkBtn('↺ заново',`visW79Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW79(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.a==null) st.a=3;
      if(st.b==null) st.b=4;
      h=wkFrame(banner('🍕 ПИЦЦЕРИЯ АРХИМЕДА · ПИЦЦА НА 8 КУСКОВ','#ffd76a')+
        wkBig('Сколько кусков съели вместе?')+
        wkHero(`<div class="wk-row" style="gap:8px"><div style="text-align:center">${pizza(8,st.a,'a',{s:98})}${cap('друг №1: '+st.a+'/8')}</div><span class="v5pop" style="font-size:34px;color:#cfe0cf;font-weight:bold">+</span><div style="text-align:center">${pizza(8,st.b,'b',{s:98})}${cap('друг №2: '+st.b+'/8')}</div></div>`)+
        wkRow(wkBtn('🍕 друг №1: ещё кусок',`visW79Act('${lk}','a+')`),wkBtn('🍕 друг №2: ещё кусок',`visW79Act('${lk}','b+')`),wkBtn('↺ заново',`visW79Act('${lk}','rst')`))+
        wkNote('оба едят одну пиццу из 8 кусков: 3 + 4 = сколько?','#9ec0a8'));
    } else if(step===1){
      if(st.h==null) st.h=3;
      h=wkFrame(banner('ЯЗЫК ДРОБЕЙ','#7fd1ff')+
        wkBig('Знаменатель и числитель')+
        wkHero(`<div style="text-align:center">${pizza(8,st.h,'c',{s:140})}${cap(st.h+' кусков из 8 — это '+st.h+'/8')}</div>`)+
        wkRow(wkBtn('3 куска',`visW79Act('${lk}','h3')`),wkBtn('5 кусков',`visW79Act('${lk}','h5')`),wkBtn('целая 8/8',`visW79Act('${lk}','h8')`))+
        wkRow(wkPill('знаменатель 8 — всего кусков', G.blue),wkPill('числитель '+st.h+' — взяли', G.gold))+
        wkSml('8/8 — вся пицца, одно целое. Дроби — это «сколько из скольких».'));
    } else if(step===2){
      if(st.one==null) st.one=2;
      h=wkFrame(banner('СКЛАДЫВАЕМ ОДИНАКОВЫЕ ДОЛИ','#8fd1a8')+
        wkBig('2/7 + 3/7 = 5/7')+
        wkHero(`<div class="wk-row" style="gap:6px"><div style="text-align:center">${pizza(7,st.one,'d',{s:104})}${cap('2/7')}</div><span class="v5in" style="font-size:28px;color:#cfe0cf;font-weight:bold">+</span><div style="text-align:center">${pizza(7,st.one,'e',{s:104})}${cap('ещё 2/7?')}</div><span class="v5in" style="font-size:28px;color:#cfe0cf;font-weight:bold">→</span></div>`)+
        wkRow(wkBtn('➕ добавить ещё 1/7',`visW79Act('${lk}','one+')`),wkBtn('↺',`visW79Act('${lk}','one0')`))+
        (st.one>=5?wkAns('2/7 + 3/7 = 5/7 — только числители!', G.green):'')+
        wkSml('добавляй куски, пока их не станет 5 — знаменатель 7 не меняется'));
    } else if(step===3){
      if(st.pick==null) st.pick=-1;
      const right=1;
      h=wkFrame(banner('ЛОВУШКА: ЗНАМЕНАТЕЛИ НЕ СКЛАДЫВАЕМ','#ff8a7a')+
        wkBig('3/8 + 4/8 = ?')+
        wkHero(`<div class="wk-row" style="gap:8px"><div style="text-align:center">${pizza(8,3,'f',{s:96})}${cap('3/8')}</div><span style="font-size:26px;color:#cfe0cf">+</span><div style="text-align:center">${pizza(8,4,'g',{s:96})}${cap('4/8')}</div></div>`)+
        wkRow(wkBtn('7/16',`visW79Act('${lk}','p0')`),wkBtn('7/8',`visW79Act('${lk}','p1')`),wkBtn('7',`visW79Act('${lk}','p2')`))+
        (st.pick===right?wkAns('✅ верно! Кусков в пицце 8 — ответ 7/8', G.green):(st.pick>=0?wkAns('❌ посчитай куски: их 8, а не 16!', G.red):''))+
        wkSml('кто складывает знаменатели (8+8=16) — получает 7/16 и ошибку'));
    } else if(step===4){
      if(st.left==null) st.left=5;
      const rem=Math.max(0,st.left);
      h=wkFrame(banner('ВЫЧИТАЕМ: УБИРАЕМ КУСКИ','#7fd1ff')+
        wkBig('5/8 − 2/8 = 3/8')+
        wkHero(`<div style="text-align:center">${pizza(8,rem,'i',{s:132})}${cap('осталось: '+rem+'/8')}</div>`)+
        wkRow(wkBtn('➖ убрать кусок',`visW79Act('${lk}','take')`,rem<=0?'disabled':''),wkBtn('↺ 5 кусков',`visW79Act('${lk}','five')`))+
        (rem===3?wkAns('5 − 2 = 3 — осталось 3/8!', G.green):'')+
        wkSml('убирай куски по одному: 5/8 → 4/8 → 3/8. И 7/10 − 3/10 = 4/10 тоже!'));
    } else if(step===5){
      h=wkFrame(banner('ЗАДАЧА: ПИРОГ НА 9 КУСКОВ 🥧','#ffd76a')+
        wkBig('Маша 2/9, Петя 3/9 — сколько осталось?')+
        wkHero(`<div class="wk-row" style="gap:6px"><div style="text-align:center">${pizza(9,2,'j',{s:90})}${cap('2/9')}</div><span style="font-size:24px;color:#cfe0cf">+</span><div style="text-align:center">${pizza(9,3,'k',{s:90})}${cap('3/9')}</div></div>`)+
        wkRow(wkPill('съели 2/9 + 3/9 = 5/9', G.gold))+
        wkAns('осталось: 9 − 5 = 4 куска (4/9)', G.green)+
        wkSml('из 9 кусков съели 5 — осталось 4. «Осталось» — это вычитание!'));
    } else if(step===6){
      if(st.r==null) st.r=0;
      const steps=[
        ['1️⃣','Найди общий знаменатель: НОК чисел 3 и 4 = 12.','#7fd1ff'],
        ['2️⃣','Приведи дроби: 2/3 = 8/12, 1/4 = 3/12.','#8fd1a8'],
        ['3️⃣','Сложи числители: 8 + 3 = 11 → 11/12.','#ffd76a']
      ];
      h=wkFrame(banner('РАЗНЫЕ ДОЛИ: ПРИВОДИМ К НОК','#c9a0ff')+
        wkBig('2/3 + 1/4 = ?')+
        wkHero(`<div class="wk-row" style="gap:6px"><div style="text-align:center">${pizza(3,2,'m',{s:84})}${cap('2/3')}</div><span style="font-size:22px;color:#cfe0cf">+</span><div style="text-align:center">${pizza(4,1,'n',{s:84})}${cap('1/4')}</div></div>`)+
        `<div style="display:flex;flex-direction:column;gap:5px;max-width:320px;width:100%">${steps.filter((s,i)=>i<st.r).map(s=>`<div class="v5in" style="background:rgba(255,255,255,.04);border:1px solid ${s[2]}66;border-left:5px solid ${s[2]};border-radius:9px;padding:6px 11px;text-align:left;font-size:13.5px;color:#e8dcc8"><b style="color:${s[2]}">${s[0]}</b> ${s[1]}</div>`).join('')}</div>`+
        wkRow(wkBtn('▶ следующий шаг',`visW79Act('${lk}','stp')`,st.r>=3?'disabled':''),wkBtn('↺',`visW79Act('${lk}','rst')`))+
        wkSml('треть и четверть — разного размера: сначала режем всё на двенадцатые'));
    } else if(step===7){
      h=wkFrame(banner('ВЫЧИТАНИЕ С РАЗНЫМИ ЗНАМЕНАТЕЛЯМИ','#c9a0ff')+
        wkBig('5/6 − 3/4 = ?')+
        wkHero(`<svg width="330" height="96" viewBox="0 0 330 96" style="display:block">
          <rect x="6" y="6" width="318" height="84" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="165" y="26" text-anchor="middle" font-size="12.5" fill="#9ec0a8">НОК(6, 4) = 12</text>
          <text x="165" y="52" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">5/6 = 10/12 · 3/4 = 9/12</text>
          <text x="165" y="78" text-anchor="middle" font-size="19" fill="#8fd1a8" font-weight="bold">10/12 − 9/12 = 1/12</text>
        </svg>`)+
        wkRow(wkPill('ответ: 1/12', G.green))+
        wkSml('три шага всегда одинаковы: НОК → привести → посчитать числители'));
    } else {
      h=wkFrame(banner('ПРОВЕРЬ СЕБЯ','#8fd1a8')+
        wkBig('3/8 + 4/8 = ?')+
        wkHero(`<div class="wk-row" style="gap:8px"><div style="text-align:center">${pizza(8,3,'p',{s:96})}${cap('3/8')}</div><span style="font-size:26px;color:#cfe0cf">+</span><div style="text-align:center">${pizza(8,4,'q',{s:96})}${cap('4/8')}</div></div>`)+
        quiz(lk,st));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[79]=visW79;
  function visW79T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW79T=visW79T;
  function visW79Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='a+') st.a=Math.min(8,(st.a==null?3:st.a)+1);
    if(act==='b+') st.b=Math.min(8,(st.b==null?4:st.b)+1);
    if(act==='h3') st.h=3;
    if(act==='h5') st.h=5;
    if(act==='h8') st.h=8;
    if(act==='one+') st.one=Math.min(7,(st.one==null?2:st.one)+1);
    if(act==='one0') st.one=0;
    if(act==='p0') st.pick=0;
    if(act==='p1') st.pick=1;
    if(act==='p2') st.pick=2;
    if(act==='take') st.left=Math.max(0,(st.left==null?5:st.left)-1);
    if(act==='five') st.left=5;
    if(act==='stp') st.r=Math.min(3,(st.r==null?0:st.r)+1);
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW79Act=visW79Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===79){ window.ARH_LESSONS[i]=L79; break; } } })();
})();

/* ================= УРОК 179 · Правильные, неправильные дроби и смешанные числа (v4) ================= */
(function(){
  if(!window.__wk179css){
    window.__wk179css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .wk-fall{animation:wkA179 .55s cubic-bezier(.2,.8,.3,1.1) both;}'+
      '@keyframes wkA179{0%{transform:translateY(-16px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .wk-grow{animation:wkG179 .6s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes wkG179{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.05);opacity:1}100%{transform:scale(1);opacity:1}}'+
      '#lvis .wk-dash{stroke-dasharray:6 5;animation:wkD179 .8s linear infinite;}'+
      '@keyframes wkD179{to{stroke-dashoffset:-18}}';
    document.head.appendChild(st);
  }
  const L179 = {
    id: 179, title: 'Правильные, неправильные дроби и смешанные числа', ico: '🍫',
    src: 'Математика · 5 класс · Виды дробей', subj: 'math',
    explain: [
      'Кондитерская Архимеда: шоколадные плитки. У плитки 4 дольки. Если взять 3 дольки из 4 — это 3/4: меньше одной целой плитки. А если нужно 7/4? Тогда одной плитки не хватит — понадобится вторая! Дроби бывают разные: меньше единицы и больше единицы. Разберёмся!',
      'Если числитель МЕНЬШЕ знаменателя — дробь ПРАВИЛЬНАЯ, она меньше единицы. 3/4 — взяли меньше целой плитки. 5/8 — тоже правильная: 5 долек из 8. Правильные дроби всегда меньше 1.',
      'Если числитель БОЛЬШЕ знаменателя — дробь НЕПРАВИЛЬНАЯ, в ней больше одной целой. 7/4 — это больше целой плитки (нужны две плитки). А 5/5 — числитель равен знаменателю — это ровно ОДНО целое.',
      'Неправильную дробь удобно записывать как СМЕШАННОЕ ЧИСЛО: целая часть + дробь. Сколько целых «спрятано» в 7/4? Спрашиваем: сколько четвёрок помещается в семёрке? 7 : 4 = 1 и остаток 3. Значит: 1 целая и ещё 3/4 → 7/4 = 1 3/4.',
      'Проверка: 5/5 = 1. Взяли все пять долек из пяти — собрали ровно одну целую плитку. Числитель равен знаменателю — всегда ровно одно целое: 5/5 = 1, 9/9 = 1, 12/12 = 1.',
      'Переводим обратно — из смешанного числа в неправильную дробь: 2 1/3. В каждой целой плитке по 3 трети, целых две → 2 · 3 = 6 третей. Прибавляем ещё 1 треть: 6 + 1 = 7. Получаем 7/3. Формула: 2 1/3 = (2 · 3 + 1)/3 = 7/3.',
      'Тренажёр-«превращалка»: тебе дадут неправильную дробь. Задай вопрос «сколько целых спрятано?» — подели числитель на знаменатель: частное станет целой частью, остаток — числителем дробной части. Жми кнопки и проверяй себя!',
      'Примеры: 11/4 — сколько четвёрок в 11? 11 : 4 = 2 и остаток 3 → 2 3/4. А 7/3: 7 : 3 = 2 и остаток 1 → 2 1/3. Частное — целые плитки, остаток — лишние дольки.',
      'Проверь себя: 7/4 = ? (подсказка: 7 : 4 = 1 и остаток 3). И наоборот: 2 1/3 — сколько это третей? Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Запиши 7/4 в виде смешанного числа.', choices: ['1 3/4', '1 1/4', '2 3/4'], ans: 0,
      exp: 'В 7 четвёрках одна целая (4/4) и остаётся 3 четвёртых: 7/4 = 1 3/4.' },
    tasks: [
      { q: 'Чему равно 5/5?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Пять пятых — сколько целых?', '5 : 5 = 1.'], sol: '5/5 = 1.' },
      { q: 'Запиши 2 1/3 неправильной дробью.', kind: 'choice', choices: ['7/3', '6/3', '5/3'], ans: 0, tol: 0,
        hints: ['Две целые — это сколько третей?', '2 · 3 = 6 третей, плюс 1 = 7/3.'], sol: '2 1/3 = (2·3 + 1)/3 = 7/3.' }
    ]
  };
  const G={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',cream:'#ffe9c9'};
  /* шоколадная плитка: den долек, hl из них «взяты» (подсвечены) */
  function bar(den,hl,uid,opt){
    const o=opt||{};
    const W=o.w||200, h=o.h||46;
    const cw=W/den;
    let s='';
    for(let i=0;i<den;i++){
      const on=hl>i;
      const x=i*cw;
      s+=`<g class="wk-fall" style="animation-delay:${(i*0.06).toFixed(2)}s"><rect x="${x+1.5}" y="0" width="${cw-3}" height="${h}" rx="7" fill="${on?'#8a5a2e':'#4a2f1a'}" stroke="${on?G.gold:'#6b4426'}" stroke-width="1.8"/><rect x="${x+4}" y="4" width="${cw-8}" height="${h-8}" rx="4" fill="${on?'#a9743c':'#5d3a20'}" opacity=".55"/></g>`;
    }
    return `<svg width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" style="display:block;margin:0 auto">${s}</svg>`;
  }
  const cap=(t,c)=>`<div style="font-size:12.5px;color:${c||'#cfe0cf'};text-align:center;font-family:Georgia,serif;font-weight:bold">${t}</div>`;
  const Q179=[
    {q:'7/4 = ? (смешанное число)',opts:['1 3/4','1 1/4','2 3/4'],ans:0},
    {q:'2 1/3 = ? (неправильная дробь)',opts:['7/3','6/3','5/3'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q179[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?G.green:G.red; tc=i===T.ans?G.green:G.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:80px;font-size:15px" onclick="visW179T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! 2·3+1 = 7 третей</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! 7 : 4 = 1 и остаток 3</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ подели числитель на знаменатель: частное — целые</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW179Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW179Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW179(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Кондитерская: шоколадные плитки 🍫')+
        wkHero(`<div class="wk-row" style="gap:10px;align-items:flex-end"><div>${bar(4,3,'a',{w:150,h:40})}${cap('3/4 — меньше плитки')}</div><div style="text-align:center">${bar(4,4,'b',{w:150,h:40})}${cap('целая плитка')}<div class="wk-row" style="gap:3px;margin-top:3px">${[0,1,2].map(i=>`<div class="wk-fall" style="animation-delay:${(0.2+i*0.1).toFixed(2)}s;width:15px;height:30px;border-radius:4px;background:#6b3f1f;border:1.5px solid #ffd76a"></div>`).join('')}</div>${cap('+ 3 дольки → 7/4!')}</div></div>`)+
        wkAns('дроби бывают меньше и больше единицы', '#ffd76a')+
        wkSml('одна плитка — это целое; дольки — её части'));
    } else if(step===1){
      h=wkFrame(wkBig('Правильная дробь: меньше единицы')+
        wkHero(`<div class="wk-col" style="display:flex;flex-direction:column;gap:8px;width:100%">${bar(4,3,'c',{w:210,h:40})}${cap('3/4 — взяли 3 из 4')}<svg width="260" height="26" viewBox="0 0 260 26"><line x1="6" y1="14" x2="254" y2="14" stroke="#3d5c49" stroke-width="3"/><circle cx="253" cy="14" r="7" fill="#ffd76a"/><text x="253" y="24" text-anchor="middle" font-size="10" fill="#9ec0a8">1</text><circle cx="156" cy="14" r="7" fill="#8fd1a8"/><text x="156" y="24" text-anchor="middle" font-size="10" fill="#9ec0a8">3/4</text></svg></div>`)+
        wkRow(wkPill('3/4 < 1', G.green),wkChip('5/8 — тоже правильная', G.blue))+
        wkSml('числитель меньше знаменателя → дробь меньше единицы'));
    } else if(step===2){
      h=wkFrame(wkBig('Неправильная дробь: больше единицы')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <rect x="6" y="6" width="310" height="108" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="26" text-anchor="middle" font-size="12.5" fill="#9ec0a8">7/4 — целая плитка и ещё 3 дольки</text>
          ${[0,1,2,3].map(i=>`<rect x="${30+i*44}" y="44" width="38" height="30" rx="6" fill="#8a5a2e" stroke="#ffd76a" stroke-width="1.8"/>`).join('')}
          ${[0,1,2].map(i=>`<rect x="${248+i*22}" y="44" width="18" height="30" rx="5" fill="#6b3f1f" stroke="#ffd76a" stroke-width="1.4"/>`).join('')}
          <text x="161" y="98" text-anchor="middle" font-size="12" fill="#ffd76a">числитель 7 ≥ знаменателя 4 → больше 1</text>
        </svg>`)+
        wkRow(wkPill('7/4 > 1', G.red),wkChip('5/5 = 1 (ровно целое)', G.green))+
        wkSml('числитель больше или равен знаменателю — дробь неправильная'));
    } else if(step===3){
      h=wkFrame(wkBig('7/4 = 1 целая и 3/4')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <rect x="6" y="6" width="310" height="108" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="wk-grow"><circle cx="86" cy="40" r="26" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.6"/><text x="86" y="32" text-anchor="middle" font-size="11" fill="#9fc5e8">7 : 4</text><text x="86" y="52" text-anchor="middle" font-size="22" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">= 1</text><text x="86" y="66" text-anchor="middle" font-size="10" fill="#9fc5e8">остаток 3</text></g>
          <text x="122" y="55" font-size="24" fill="#8fa08f">→</text>
          <g class="wk-grow" style="animation-delay:.2s"><rect x="140" y="26" width="76" height="52" rx="11" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2.6"/><text x="178" y="60" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">1</text></g>
          <text x="222" y="62" font-size="20" fill="#cfe0cf">+</text>
          <g class="wk-grow" style="animation-delay:.35s"><text x="262" y="62" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">3/4</text></g>
          <text x="161" y="102" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">7/4 = 1 3/4 — целая плитка и 3 дольки</text>
        </svg>`)+
        wkSml('сколько четвёрок в семёрке? Одна целая (4/4) и остаток 3/4'));
    } else if(step===4){
      h=wkFrame(wkBig('5/5 = 1 — собрали целую плитку')+
        wkHero(`<div>${bar(5,5,'d',{w:230,h:44})}${cap('пять пятых — вся плитка')}</div>`)+
        wkRow(wkPill('5/5 = 1', G.green),wkChip('9/9 = 1 · 12/12 = 1', G.blue))+
        wkSml('числитель равен знаменателю — всегда ровно одно целое'));
    } else if(step===5){
      h=wkFrame(wkBig('Обратно: 2 1/3 = ?')+
        wkHero(`<svg width="322" height="126" viewBox="0 0 322 126" style="display:block">
          <rect x="6" y="6" width="310" height="114" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">две целые плитки по 3 трети — размениваем</text>
          ${[0,1].map(k=>{const x=40+k*118;return `<g class="wk-fall" style="animation-delay:${(k*0.15).toFixed(2)}s">${[0,1,2].map(j=>`<rect x="${x+j*30}" y="40" width="26" height="30" rx="5" fill="#8a5a2e" stroke="#7fd1ff" stroke-width="1.6"/>`).join('')}</g>`;}).join('')}
          <g class="wk-fall" style="animation-delay:.35s"><rect x="282" y="40" width="22" height="30" rx="5" fill="#6b3f1f" stroke="#ffd76a" stroke-width="1.6"/></g>
          <text x="90" y="92" text-anchor="middle" font-size="11" fill="#9fc5e8">2 · 3 = 6 третей</text>
          <text x="161" y="110" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">6 + 1 = 7 → 2 1/3 = 7/3</text>
        </svg>`)+
        wkSml('в каждой целой по 3 трети: 2·3 = 6, плюс 1 треть → 7/3'));
    } else if(step===6){
      if(st.d==null) st.d=0;
      const POOL=[[7,4],[11,4],[9,2],[13,5],[17,6]];
      const [a,b]=POOL[st.d%POOL.length];
      const q=Math.floor(a/b), r=a%b;
      h=wkFrame(wkBig('Тренажёр-«превращалка» 🔄')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <g class="wk-grow"><rect x="16" y="16" width="120" height="58" rx="13" fill="rgba(232,106,90,.08)" stroke="#ff8a7a" stroke-width="2.4"/><text x="76" y="38" text-anchor="middle" font-size="11" fill="#ff9a8a">неправильная</text><text x="76" y="62" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">${a}/${b}</text></g>
          ${st.show?`<g class="wk-fall"><text x="176" y="50" text-anchor="middle" font-size="26" fill="#8fd1a8">→</text></g>`:''}
          ${st.show?`<g class="wk-fall"><rect x="186" y="16" width="120" height="58" rx="13" fill="rgba(217,164,65,.1)" stroke="#ffd76a" stroke-width="2.4"/><text x="246" y="38" text-anchor="middle" font-size="11" fill="#d9c088">смешанное</text><text x="246" y="62" text-anchor="middle" font-size="22" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">${q} ${r}/${b}</text></g>`:''}
        </svg>`)+
        wkRow(wkBtn('1️⃣ сколько целых?',`visW179Act('${lk}','s1')`),wkBtn('2️⃣ ответ',`visW179Act('${lk}','s2')`),wkBtn('🎲 новый',`visW179Act('${lk}','n')`),wkBtn('↺',`visW179Act('${lk}','rst')`))+
        (st.s1? wkNote(a+' : '+b+' = '+q+' и остаток '+r,'#cfe0cf'):'')+
        (st.show? wkAns(a+'/'+b+' = '+q+' '+r+'/'+b, G.gold):'')+
        wkSml('частное — целые плитки, остаток — лишние дольки'));
    } else if(step===7){
      h=wkFrame(wkBig('Сколько целых спрятано?')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <rect x="6" y="6" width="310" height="84" rx="15" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="wk-fall"><rect x="16" y="16" width="136" height="60" rx="11" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="2"/><text x="84" y="36" text-anchor="middle" font-size="11" fill="#9fc5e8">11 : 4</text><text x="84" y="62" text-anchor="middle" font-size="19" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">= 2 ост. 3 → 2 3/4</text></g>
          <g class="wk-fall" style="animation-delay:.2s"><rect x="168" y="16" width="140" height="60" rx="11" fill="rgba(217,164,65,.1)" stroke="#ffd76a" stroke-width="2"/><text x="238" y="36" text-anchor="middle" font-size="11" fill="#d9c088">7 : 3</text><text x="238" y="62" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">= 2 ост. 1 → 2 1/3</text></g>
        </svg>`)+
        wkSml('всегда задавай вопрос: сколько целых спрятано? — дели числитель на знаменатель'));
    } else {
      h=wkFrame(wkBig('Проверь себя 📝')+
        wkHero(`<div class="wk-row" style="gap:16px"><div>${bar(4,4,'e',{w:140,h:36})}${cap('целая плитка 4/4')}</div><div style="display:flex;gap:4px">${[0,1,2].map(i=>`<div class="wk-grow" style="animation-delay:${(0.2+i*0.1).toFixed(2)}s;width:18px;height:34px;border-radius:5px;background:#8a5a2e;border:1.5px solid #ffd76a;margin-top:2px"></div>`).join('')}</div>${cap('+ 3/4')}</div>`)+
        quiz(lk,st)+
        wkSml('7/4 = 1 3/4. Жми «Понял! Проверю себя»!'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[179]=visW179;
  function visW179T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW179T=visW179T;
  function visW179Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='s1') st.s1=1;
    if(act==='s2') st.show=1;
    if(act==='n'){ st.d=(st.d==null?0:st.d)+1; st.s1=st.show=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW179Act=visW179Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===179){ window.ARH_LESSONS[i]=L179; break; } } })();
})();
/* ================= УРОК 13 · Чётность: суммы и произведения (v3) ================= */
(function(){
  const L13 = {
    id: 13, title: 'Чётность: суммы и произведения', ico: '💃',
    src: 'Математика · Чёт и нечет: пары и «сироты»', subj: 'math',
    explain: [
      'Бал в Числовом королевстве: числа танцуют парами. 8 = 4 пары — чётное число, у него нет ни одной «сироты». А 9 — это 4 пары и один лишний, которому не с кем танцевать: 9 нечётное. Чётность решает задачи «можно ли раздать поровну?» без единого вычисления!',
      'Узнать чётность легко по последней цифре: 0, 2, 4, 6, 8 — чётные, а 1, 3, 5, 7, 9 — нечётные. 847 кончается на 7 → нечётное. Проверять всё число не нужно — достаточно хвостика!',
      'Чёт + чёт = чёт: две компании пар танцуют вместе — снова только пары, без сирот. 2 + 4 = 6, 10 + 8 = 18. Сложение не ломает пары.',
      'Чёт + нечёт = нечёт: к полным парам приходит гость-сирота — он так и остаётся один. 4 + 1 = 5, 10 + 7 = 17. Одна сирота не исчезает!',
      'Удивительно: нечёт + нечёт = чёт! У каждого нечётного числа есть своя сирота. Две сироты знакомятся — и танцуют вместе парой! 3 + 5 = 8, 11 + 13 = 24.',
      'Вычитание ведёт себя так же: чёт − чёт = чёт, чёт − нечёт = нечёт, нечёт − нечёт = чёт. Минус не создаёт и не уничтожает сирот — он только уводит или добавляет пары.',
      'Умножение: если ХОТЯ БЫ ОДИН множитель чётный — произведение чётное. Пары «размножаются»: 2 · 4 = 8, 4 · 5 = 20, 6 · 9 = 54. Один чётный множитель делает всё произведение чётным.',
      'А если все множители нечётные? Тогда и произведение нечётное: 3 · 3 = 9, 5 · 7 = 35. В сетке 3 × 3 клеток все разбиваются на пары, кроме одной лишней в углу — как сирота на балу.',
      'Проверь себя: сумма 1 + 2 + … + 99 — чётная или нечётная? Каждое нечётное слагаемое «переключает» чётность, их ровно 50 — чётное число, значит сумма чётная. А 1 · 2 · 3 · … · 100 — там есть множитель 2, значит произведение чётное!'
    ],
    check: { q: 'Сумма двух нечётных чисел…', choices: ['чётная', 'нечётная'], ans: 0,
      exp: 'Нечёт + нечёт = чёт: например, 3+5=8.' },
    tasks: [
      { q: 'Сумма 1+2+3+…+99 — чётная или нечётная?', kind: 'choice', choices: ['Чётная', 'Нечётная'], ans: 0, tol: 0,
        hints: ['Сколько среди чисел 1..99 нечётных?', 'Их 50 — сумма чётна (пары 1+3, 5+7…).'], sol: 'Нечётных 50 → сумма чётная. (По формуле: 99·50 = 4950 — чётное.)' },
      { q: 'Произведение 1·2·3·…·100 чётно?', kind: 'choice', choices: ['Да', 'Нет'], ans: 0, tol: 0,
        hints: ['Среди множителей есть 2.', 'Произведение с чётным множителем — чётное.'], sol: 'Множитель 2 делает произведение чётным.' }
    ]
  };
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',pink:'#f2a7d8',red:'#ff8a7a'};
  function pairs(n,uid){
    const W=322, cols=6, r=7, x0=16, y0=22, gx=44, gy=18;
    const pairsN=Math.floor(n/2), odd=n%2;
    let s='';
    let idx=0;
    for(let k=0;k<pairsN;k++){
      const c1=idx%cols, r1=Math.floor(idx/cols), c2=c1+1<cols?c1+1:0;
      const x1=x0+c1*gx, y1=y0+r1*gy;
      const x2=x0+((c1+1)%cols)*gx, y2=y0+Math.floor((idx+1)/cols)*gy;
      s+=`<g class="wv-pop" style="animation-delay:${(k*0.06).toFixed(2)}s"><circle cx="${x1}" cy="${y1}" r="${r}" fill="#7fd1ff"/><circle cx="${x2}" cy="${y2}" r="${r}" fill="#8fd1a8"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d9a441" stroke-width="1.4" stroke-dasharray="3 2"/></g>`;
      idx+=2;
    }
    if(odd){
      const c=idx%cols, rr=Math.floor(idx/cols);
      s+=`<g class="wv-pop" style="animation-delay:${(pairsN*0.06+0.1).toFixed(2)}s"><circle cx="${x0+c*gx}" cy="${y0+rr*gy}" r="${r+2}" fill="#e0523d"/><text x="${x0+c*gx}" y="${y0+rr*gy+22}" text-anchor="middle" font-size="9" fill="#ff9a8a">сирота!</text></g>`;
    }
    return `<svg width="${W}" height="96" viewBox="0 0 ${W} 96" style="display:block;margin:0 auto">${s}</svg>`;
  }
  const Q13=[
    {q:'Нечёт + нечёт = ?',opts:['чётное','нечётное'],ans:0},
    {q:'Произведение 1·2·3·…·100 чётно?',opts:['да','нет'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q13[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:70px;font-size:15px" onclick="visW13T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! Множитель 2 — всё чётное</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! Две сироты образовали пару!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ вспомни: у каждого нечётного есть одна «сирота»</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW13Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW13Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW13(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.n==null) st.n=9;
      const n=st.n;
      h=wkFrame(wkBig('Бал чисел: пары и «сироты» 💃')+
        wkHero(pairs(n,'a'))+
        wkRow(wkPill(n+(n%2===0?' = чётное (только пары)':' = нечётное (есть сирота)'), n%2===0?C.green:C.red))+
        wkRow(wkBtn('−1',`visW13Act('${lk}','m')`),wkBtn('+1',`visW13Act('${lk}','p')`),wkBtn('↺',`visW13Act('${lk}','rst')`))+
        wkSml('8 = 4 пары — чётное; 9 = 4 пары и одна сирота — нечётное'));
    } else if(step===1){
      h=wkFrame(wkBig('Быстрый признак: последняя цифра')+
        wkHero(`<svg width="322" height="88" viewBox="0 0 322 88" style="display:block">
          ${[0,2,4,6,8].map((d,i)=>`<g class="wv-pop" style="animation-delay:${(i*0.09).toFixed(2)}s"><circle cx="${24+i*60}" cy="30" r="21" fill="rgba(143,209,168,.14)" stroke="${C.green}" stroke-width="2.4"/><text x="${24+i*60}" y="37" text-anchor="middle" font-size="20" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">${d}</text></g>`).join('')}
          <text x="161" y="72" text-anchor="middle" font-size="12" fill="${C.green}">чётные</text>
          ${[1,3,5,7,9].map((d,i)=>`<g class="wv-pop" style="animation-delay:${(0.3+i*0.09).toFixed(2)}s"><circle cx="${14+i*34}" cy="74" r="0" fill="none"/></g>`).join('')}
        </svg>`)+
        wkRow(wkChip('0 2 4 6 8 — чётные', C.green),wkChip('1 3 5 7 9 — нечётные', C.red))+
        wkSml('847 кончается на 7 → нечётное. Хвостик числа всё расскажет!'));
    } else if(step===2){
      h=wkFrame(wkBig('Чёт + чёт = чёт')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <g class="wv-pop"><rect x="10" y="14" width="88" height="66" rx="13" fill="rgba(127,209,160,.08)" stroke="${C.green}" stroke-width="2"/><text x="54" y="40" text-anchor="middle" font-size="13" fill="#9ec0a8">чёт</text><text x="54" y="68" text-anchor="middle" font-size="26" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">2 + 4</text></g>
          <text x="110" y="52" font-size="24" fill="#8fa08f">=</text>
          <g class="wv-pop2"><rect x="124" y="14" width="88" height="66" rx="13" fill="rgba(143,209,168,.12)" stroke="${C.green}" stroke-width="2.4"/><text x="168" y="40" text-anchor="middle" font-size="13" fill="#9ec0a8">пары+пары</text><text x="168" y="68" text-anchor="middle" font-size="26" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">6</text></g>
          <text x="224" y="40" text-anchor="middle" font-size="30">💃</text>
          <g class="wv-pop3"><rect x="248" y="14" width="66" height="66" rx="13" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/><text x="281" y="52" text-anchor="middle" font-size="20" fill="${C.gold}" font-weight="bold">чёт!</text></g>
        </svg>`)+
        wkSml('две компании пар танцуют вместе — снова только пары, сирот нет'));
    } else if(step===3){
      h=wkFrame(wkBig('Чёт + нечёт = нечёт')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          <g class="wv-pop"><rect x="10" y="14" width="100" height="66" rx="13" fill="rgba(127,209,160,.08)" stroke="${C.green}" stroke-width="2"/><text x="60" y="40" text-anchor="middle" font-size="13" fill="#9ec0a8">чёт</text><text x="60" y="68" text-anchor="middle" font-size="22" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">4</text></g>
          <text x="120" y="52" font-size="24" fill="#8fa08f">+</text>
          <g class="wv-pop2"><rect x="134" y="14" width="100" height="66" rx="13" fill="rgba(232,106,90,.08)" stroke="${C.red}" stroke-width="2"/><text x="184" y="40" text-anchor="middle" font-size="13" fill="#ff9a8a">нечёт</text><text x="184" y="68" text-anchor="middle" font-size="22" fill="${C.red}" font-weight="bold" font-family="Georgia,serif">1</text></g>
          <text x="246" y="52" font-size="26" fill="#8fa08f">=</text>
          <g class="wv-pop3"><rect x="258" y="14" width="56" height="66" rx="13" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/><text x="286" y="52" text-anchor="middle" font-size="19" fill="${C.gold}" font-weight="bold">5</text></g>
          <text x="286" y="78" text-anchor="middle" font-size="10" fill="#ff9a8a">сирота!</text>
        </svg>`)+
        wkSml('к парам приходит гость-сирота — он так и остаётся один: 4+1=5 нечётное'));
    } else if(step===4){
      h=wkFrame(wkBig('Нечёт + нечёт = чёт!')+
        wkHero(`<svg width="322" height="100" viewBox="0 0 322 100" style="display:block">
          <g class="wv-pop"><rect x="10" y="16" width="92" height="64" rx="13" fill="rgba(232,106,90,.08)" stroke="${C.red}" stroke-width="2"/><text x="56" y="40" text-anchor="middle" font-size="13" fill="#ff9a8a">нечёт</text><text x="56" y="66" text-anchor="middle" font-size="20" fill="${C.red}" font-weight="bold" font-family="Georgia,serif">3</text></g>
          <text x="112" y="54" font-size="24" fill="#8fa08f">+</text>
          <g class="wv-pop2"><rect x="126" y="16" width="92" height="64" rx="13" fill="rgba(232,106,90,.08)" stroke="${C.red}" stroke-width="2"/><text x="172" y="40" text-anchor="middle" font-size="13" fill="#ff9a8a">нечёт</text><text x="172" y="66" text-anchor="middle" font-size="20" fill="${C.red}" font-weight="bold" font-family="Georgia,serif">5</text></g>
          <text x="228" y="54" font-size="26" fill="#8fa08f">=</text>
          <g class="wv-pop3"><rect x="242" y="12" width="72" height="72" rx="14" fill="rgba(217,164,65,.14)" stroke="${C.gold}" stroke-width="3"/><text x="278" y="52" text-anchor="middle" font-size="28" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">8</text><text x="278" y="72" text-anchor="middle" font-size="11" fill="#8fd1a8">чёт!</text></g>
          <text x="56" y="94" text-anchor="middle" font-size="10" fill="#ff9a8a">сирота</text><text x="172" y="94" text-anchor="middle" font-size="10" fill="#ff9a8a">сирота</text>
        </svg>`)+
        wkAns('две сироты знакомятся — и танцуют парой! 3 + 5 = 8', C.green)+
        wkSml('два нечётных числа всегда дают чётную сумму'));
    } else if(step===5){
      h=wkFrame(wkBig('Вычитание — то же самое')+
        wkHero(`<svg width="322" height="96" viewBox="0 0 322 96" style="display:block">
          ${[['чёт−чёт = чёт','10−4=6',C.green,8],['чёт−нечёт = нечёт','10−3=7',C.red,112],['нечёт−нечёт = чёт','9−3=6',C.green,216]].map((d,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.15).toFixed(2)}s"><rect x="${d[3]}" y="14" width="100" height="70" rx="13" fill="rgba(255,255,255,.04)" stroke="${d[2]}" stroke-width="2"/>
              <text x="${d[3]+50}" y="38" text-anchor="middle" font-size="10.5" fill="#9ec0a8">${d[0]}</text>
              <text x="${d[3]+50}" y="68" text-anchor="middle" font-size="19" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[1]}</text></g>`).join('')}
        </svg>`)+
        wkSml('минус не создаёт и не уничтожает сирот — только уводит или добавляет пары'));
    } else if(step===6){
      h=wkFrame(wkBig('Умножение: один чётный — всё чётное')+
        wkHero(`<svg width="322" height="106" viewBox="0 0 322 106" style="display:block">
          <g class="wv-pop"><rect x="10" y="16" width="92" height="70" rx="13" fill="rgba(127,209,160,.08)" stroke="${C.green}" stroke-width="2.4"/><text x="56" y="42" text-anchor="middle" font-size="12" fill="#9ec0a8">чётный</text><text x="56" y="70" text-anchor="middle" font-size="22" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">2 · 4</text></g>
          <g class="wv-pop2"><rect x="114" y="16" width="92" height="70" rx="13" fill="rgba(217,164,65,.12)" stroke="${C.gold}" stroke-width="2.4"/><text x="160" y="42" text-anchor="middle" font-size="12" fill="#d9c088">пары «размножаются»</text><text x="160" y="70" text-anchor="middle" font-size="24" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">= 8</text></g>
          <text x="218" y="54" font-size="30">🎉</text>
          <g class="wv-pop3"><rect x="240" y="16" width="74" height="70" rx="13" fill="rgba(143,209,168,.1)" stroke="${C.green}" stroke-width="2.4"/><text x="277" y="56" text-anchor="middle" font-size="17" fill="${C.green}" font-weight="bold">чёт!</text></g>
        </svg>`)+
        wkSml('2·4=8, 4·5=20, 6·9=54 — один чётный множитель решает всё'));
    } else if(step===7){
      h=wkFrame(wkBig('Все множители нечётные → нечёт')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <text x="161" y="18" text-anchor="middle" font-size="13" fill="#9ec0a8">клетки 3 × 3 = 9 — одна лишняя, как сирота</text>
          ${[0,1,2,3,4,5,6,7].map(i=>{const r=Math.floor(i/3),c=i%3;return `<circle class="wv-pop" style="animation-delay:${(i*0.05).toFixed(2)}s" cx="${120+c*30}" cy="${34+r*24}" r="9" fill="rgba(127,209,160,.5)" stroke="${C.green}" stroke-width="1.6"/>`;}).join('')}
          <circle class="wv-pop3" cx="278" cy="82" r="12" fill="rgba(232,106,90,.4)" stroke="${C.red}" stroke-width="2"/>
          <text x="278" y="87" text-anchor="middle" font-size="12" fill="${C.red}" font-weight="bold">9</text>
          <rect x="80" y="96" width="164" height="20" rx="10" fill="rgba(217,164,65,.1)" stroke="${C.gold}"/>
          <text x="162" y="110" text-anchor="middle" font-size="12.5" fill="${C.gold}" font-weight="bold">3 · 3 = 9 — нечётное</text>
        </svg>`)+
        wkSml('5·7=35 тоже нечётное: всегда остаётся одна лишняя клетка'));
    } else {
      h=wkFrame(wkBig('Проверь себя 📝')+
        wkHero(pairs(8,'z'))+
        quiz(lk,st)+
        wkSml('нечётных от 1 до 99 — ровно 50 (чётно) → сумма чётная; в 1·2·…·100 есть 2 → чётно. Жми «Понял! Проверю себя»!'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[13]=visW13;
  function visW13T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW13T=visW13T;
  function visW13Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='p') st.n=Math.min(16,(st.n==null?9:st.n)+1);
    if(act==='m') st.n=Math.max(1,(st.n==null?9:st.n)-1);
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW13Act=visW13Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===13){ window.ARH_LESSONS[i]=L13; break; } } })();
})();
