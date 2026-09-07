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
      const showB=Math.min(b,3);
      let boxes='';
      for(let g=0;g<showB;g++){
        boxes+=`<div class="w6in" style="animation-delay:${(g*0.12).toFixed(2)}s;display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="width:70px;min-height:48px;border:2px solid #7fae8f;border-radius:12px;background:rgba(255,255,255,.04);padding:6px;display:flex;flex-wrap:wrap;gap:3px;align-content:flex-start">
            ${[0,1,2,3,4].map(j=>`<div class="w6pop" style="width:13px;height:9px;border-radius:2.5px;background:${BC[(g*5+j)%5]}"></div>`).join('')}
          </div>
          <span style="font-size:13px;color:#9ec0a8">коробка ${g+1}</span></div>`;
      }
      const remHtml = rem>0
        ? `<div class="w6in" style="animation-delay:${(showB*0.12+0.1).toFixed(2)}s;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="width:70px;min-height:48px;border:2px dashed ${G.gold};border-radius:12px;background:rgba(217,164,65,.07);padding:6px;display:flex;flex-wrap:wrap;gap:3px;align-content:flex-start">${[0,1,2,3].slice(0,rem).map(j=>`<div style="width:13px;height:9px;border-radius:2.5px;background:${G.gold}"></div>`).join('')}</div>
            <span style="font-size:13px;color:${G.gold}">остаток ${rem}</span></div>`
        : `<span style="font-size:13px;color:#8fd1a8">всё разложилось ровно!</span>`;
      h=wkFrame(wkBig('Склад конструктора 🧱')+
        
        `<div class="wk-row" style="gap:10px;align-items:flex-start">${boxes}${remHtml}</div>`+
        wkRow(wkPill(n+' = 5·'+b+' + '+rem, G.gold))+
        (b>3?wkNote('… и ещё '+(b-3)+' полные коробки по 5','#9ec0a8'):'')+
        wkRow(wkBtn('➕ ещё 5 кубиков',`visW12Act('${lk}','n')`),wkBtn('↺ 17',`visW12Act('${lk}','rst')`))+
        wkSml('полных коробок: '+b+' · остаток: '+rem+' — то, что не поместилось'));
    } else if(step===1){
      const W=318, cw=22, ch=16, gap=8, x0=Math.round((W- (5*cw+4*gap))/2);
      let s2='';
      for(let g=0;g<3;g++){
        for(let j=0;j<5;j++){
          const x=x0+j*(cw+gap), y=12+g*(ch+6);
          s2+=`<rect class="w6pop" x="${x}" y="${y}" width="${cw-6}" height="${ch-6}" rx="3" fill="${BC[(g*5+j)%5]}" style="animation-delay:${((g*5+j)*0.04).toFixed(2)}s"/>`;
        }
      }
      for(let j=0;j<2;j++){
        const x=x0+5*(cw+gap)+6, y=12+j*(ch+6);
        s2+=`<rect class="w6pop" x="${x}" y="${y}" width="${cw-6}" height="${ch-6}" rx="3" fill="${G.gold}" style="animation-delay:.5s"/>`;
      }
      s2+=`<line x1="${x0-2}" y1="80" x2="${x0+5*(cw+gap)+28}" y2="80" stroke="#3d5c49" stroke-width="1.4"/>`;
      h=wkFrame(wkBig('17 кубиков делим на 5')+
        wkHero(`<svg width="${W}" height="104" viewBox="0 0 ${W} 104" style="display:block">${s2}</svg>`)+
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
        boxes+=`<div class="w6in" style="animation-delay:${(p*0.07).toFixed(2)}s;width:56px;text-align:center;border:2px solid ${cols[p]};border-radius:11px;padding:5px 2px;background:rgba(255,255,255,.04)">
          <div style="font-size:13px;color:${cols[p]};font-weight:bold">остаток ${p}</div>
          <div style="font-family:Georgia,serif;font-size:24px;color:#fff;font-weight:bold;margin:2px 0">${p}</div>
          <div style="font-size:12px;color:#9ec0a8">${data[p].slice(0,3).join('·')}</div>
        </div>`;
      }
      h=wkFrame(wkBig('Остаток меньше делителя')+
        wkRow(wkChip('делим на '+k, G.gold))+
        `<div style="display:flex;flex-wrap:wrap;gap:5px;width:100%;justify-content:center">${boxes}</div>`+
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

/* ================= УРОК 24 · Цепочки сравнений (v3, крупные SVG, больше слайдов, без эмодзи) ================= */
(function(){
  if(!window.__wk24v3css){
    window.__wk24v3css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .c9in{animation:c9In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes c9In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .c9pop{animation:c9Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c9Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .c9float{animation:c9Float 1.9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c9Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}'+
      '#lvis .c9flow{stroke-dasharray:9 7;animation:c9Flow .85s linear infinite;}'+
      '@keyframes c9Flow{to{stroke-dashoffset:-32}}'+
      '#lvis .c9bump{animation:c9Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c9Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}'+
      '#lvis .c9sway{animation:c9Sway 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c9Sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}';
    document.head.appendChild(st);
  }
  const L24 = {
    id: 24, title: 'Цепочки сравнений', ico: '⇢',
    src: 'Логика · транзитивность · кто выше/тяжелее всех', subj: 'math',
    explain: [
      'Лесная линейка Архимеда: Лиса выше Зайца, а Волк выше Лисы. Можно ли узнать, кто выше всех, даже не измеряя их? Можно! Если Лиса выше Зайца, а Волк выше Лисы, то Волк выше и Зайца тоже — сравнения выстраиваются в цепочку.',
      'Строим цепочку: записываем условия одно за другим — «Лиса > Заяц» и «Волк > Лиса». Соединяем звенья: Волк > Лиса > Заяц. Теперь порядок виден сразу: выше всех тот, кто стоит в цепочке первым, — Волк!',
      'Это свойство называют транзитивностью: если A больше B, а B больше C, то A больше C. Промежуточное звено B можно «выбросить» — вывод останется верным. Правило работает для роста, массы, длины, возраста — для любых сравнений.',
      'Весы работают точно так же. X легче Y, а Y легче Z — значит, X < Y < Z. Тяжелее всех Z, легче всех X. Стрелка сравнения всегда указывает от более лёгкого к более тяжёлому.',
      'Пиши цепочку одной строкой: Волк > Лиса > Заяц. Кто первый — самый высокий, кто последний — самый низкий. Порядок звеньев — это готовый ответ на вопрос «кто выше или ниже всех».',
      'Четыре зверя: Медведь выше Волка, Волк выше Лисы, Лиса выше Зайца. Соединяем: Медведь > Волк > Лиса > Заяц. Медведь — самый высокий, Заяц — самый низкий. Длинная цепочка работает так же, как короткая.',
      'А если данных не хватает? Лиса выше Зайца и Волк выше Зайца. Кто выше — Лиса или Волк? Неизвестно! Мы знаем только, что оба выше Зайца. Отвечай ровно на то, что следует из цепочки, и не додумывай лишнего.',
      'Сравнения бывают не только по росту: тяжелее, длиннее, старше, быстрее. Правило всегда одно: если A больше B, а B больше C — A больше C. Стрелка показывает направление, и цепочка ведёт от «меньше» к «больше».',
      'Тренажёр: тебе дадут несколько сравнений. Шаг 1 — выстрой звенья в цепочку. Шаг 2 — найди, кто первый (самый высокий/тяжёлый), а кто последний. Нажимай кнопки и проверяй себя!',
      'Очень длинная цепочка: A выше B, B выше C, C выше D, D выше E. Кто выше всех? Первый — A. Кто ниже всех? Последний — E. Сколько бы ни было звеньев, ответ всегда на концах цепочки.',
      'Тест: A выше B, B выше C — кто выше всех? А если добавить C выше D — кто ниже всех? Собери цепочку и посмотри на её концы. Ответь в тесте ниже!',
      'Проверь себя: X легче Y, а Y легче Z. Кто тяжелее всех? Собери цепочку X < Y < Z — и ответ готов. Жми «Понял! Проверю себя»!'
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
  const H9={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',ivory:'#e8e0cc',mut:'#9ec0a8'};
  const H9P=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff9a7a','#5aa0d8'];
  /* персонаж-«зверь»: столбец роста с крупной буквой-«головой» наверху (без эмодзи) */
  function beast(x,ground,h,letter,color,opt){
    const o=opt||{};
    const w=o.w||58;
    const headR=o.headR||16;
    const cy=ground-h-headR-2;
    return `<g class="${o.sway?'c9sway':'c9pop'}" style="${o.delay?'animation-delay:'+o.delay+'s':''}">
      <rect x="${x}" y="${ground-h}" width="${w}" height="${h}" rx="${Math.min(14,w*0.24)}" fill="${color}" opacity=".16"/>
      <rect x="${x+3}" y="${ground-h}" width="${w-6}" height="${h}" rx="${Math.min(11,w*0.2)}" fill="none" stroke="${color}" stroke-width="2.6"/>
      <line x1="${x+Math.round(w/2)}" y1="${ground-h}" x2="${x+Math.round(w/2)}" y2="${cy+headR}" stroke="${color}" stroke-width="2.6"/>
      <circle cx="${x+Math.round(w/2)}" cy="${cy}" r="${headR}" fill="${color}" opacity=".2"/>
      <circle cx="${x+Math.round(w/2)}" cy="${cy}" r="${headR}" fill="none" stroke="${color}" stroke-width="3"/>
      <text x="${x+Math.round(w/2)}" y="${(cy+headR*0.5).toFixed(1)}" text-anchor="middle" font-size="${o.fs||22}" fill="#fff" font-weight="bold" font-family="Georgia,serif">${letter}</text>
    </g>`;
  }
  /* сцена «звери по росту» + стрелки > между ними */
  function rowBeasts(items,opt){
    const o=opt||{};
    const ground=o.ground||118;
    const W=o.w||318, headR=o.headR||15, w=o.wcol||54;
    const step=o.stepX||78;
    const x0=Math.round((W-(items.length*step-step))/2);
    let body='';
    items.forEach((it,i)=>{
      const x=x0+i*step;
      body+=beast(x,ground,it.h,it.letter,it.c,{w:headR*2.2,headR,delay:i*0.14,sway:it.sway});
      if(i<items.length-1){
        const mx=x+headR*2.2+ (step-headR*2.2)/2;
        body+=`<g class="c9pop" style="animation-delay:${(i*0.14+0.2).toFixed(2)}s"><text x="${mx}" y="${ground-8}" text-anchor="middle" font-size="26" fill="${H9.red}" font-weight="bold">&gt;</text></g>`;
      }
    });
    const H=ground+20;
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">${body}<line x1="${x0-8}" y1="${ground+1}" x2="${x0+(items.length-1)*step+headR*2.2+8}" y2="${ground+1}" stroke="#3d5c49" stroke-width="2.4"/></svg>`;
  }
  const sign=(t,c,delay)=>`<span class="c9in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:7px 15px;border-radius:13px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:22px;color:${c};font-weight:bold">${t}</span>`;
  const blkA=(label,bg,color,opt)=>`<div class="c9pop" style="animation-delay:${((opt&&opt.delay)||0).toFixed(2)}s;flex:1 1 0;min-width:0;text-align:center;border:2.5px solid ${color};border-radius:15px;padding:6px 4px;background:${bg||'rgba(255,255,255,.05)'}">
    <div style="font-size:13px;color:${color};font-weight:bold;margin-bottom:2px">${label}</div>
    <div style="font-size:${(opt&&opt.fs)||30}px;color:#fff;font-weight:bold;font-family:Georgia,serif;line-height:1.15">${(opt&&opt.big)||label}</div>
  </div>`;
  const Q24=[
    {q:'A выше B, B выше C. Кто выше всех?',opts:['A','B','C'],ans:0},
    {q:'A выше B, B выше C, C выше D. Кто ниже всех?',opts:['A','B','C','D'],ans:3}
  ];
  function quiz(lk,st){
    const T=Q24[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?H9.green:H9.red; tc=i===T.ans?H9.green:H9.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:62px;font-size:18px" onclick="visW24T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! Ниже всех — последний в цепочке: D</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! A > B > C — выше всех первый: A</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:17px">Не так. Собери цепочку: ответ на её концах</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW24Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW24Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW24(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0||step===5||step===8){ st.mode=0; } if(step===6){ st.mode=0; } if(step===9){ st.mode=0; } if(step===10){ st.sel=null; st.q=0; } if(step===11){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Лесная линейка Архимеда')+
        wkHero(rowBeasts([
          {letter:'З',h:42,c:'#c9a06a',sway:1},
          {letter:'Л',h:70,c:'#e08a4a'},
          {letter:'В',h:100,c:'#7f9bb8'}
        ],{ground:118,w:318}))+
        `<div class="c9in" style="animation-delay:.5s;text-align:center;font-size:13px;color:#e8dcc8;font-weight:bold">З — Заяц · Л — Лиса · В — Волк</div>`+
        wkRow(sign('Лиса > Заяц',H9.gold),sign('Волк > Лиса',H9.blue,0.2))+
        wkSml('кто выше всех — можно узнать, даже не измеряя! Листай дальше'));
    } else if(step===1){
      h=wkFrame(wkBig('Собираем цепочку')+
        wkHero(rowBeasts([
          {letter:'В',h:100,c:'#7f9bb8'},
          {letter:'Л',h:70,c:'#e08a4a',delay:.15},
          {letter:'З',h:42,c:'#c9a06a',delay:.3}
        ],{ground:118,w:318}))+
        `<div class="c9in" style="animation-delay:.5s;text-align:center;font-size:13px;color:#e8dcc8;font-weight:bold">В — Волк · Л — Лиса · З — Заяц</div>`+
        wkRow(sign('Волк > Лиса > Заяц',H9.green,0.5))+
        wkAns('выше всех — Волк!',H9.green)+
        wkSml('сравнения встают в ряд, как звенья цепи: середина соединяет края'));
    } else if(step===2){
      h=wkFrame(wkBig('Секрет — транзитивность')+
        wkHero(`<svg viewBox="0 0 318 168" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="158" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <rect x="24" y="26" width="76" height="64" rx="14" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>
          <text x="62" y="60" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">A</text>
          <text x="62" y="80" text-anchor="middle" font-size="12" fill="#9ec0a8">больше</text>
          <text x="124" y="66" text-anchor="middle" font-size="26" fill="#ff8a7a" font-weight="bold">&gt;</text>
          <rect x="144" y="26" width="76" height="64" rx="14" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="3"/>
          <text x="182" y="60" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">B</text>
          <text x="182" y="80" text-anchor="middle" font-size="12" fill="#9ec0a8">середина</text>
          <text x="240" y="66" text-anchor="middle" font-size="26" fill="#ff8a7a" font-weight="bold">&gt;</text>
          <rect x="258" y="26" width="36" height="64" rx="14" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="3"/>
          <text x="276" y="60" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">C</text>
          <g class="c9pop" style="animation-delay:.5s"><rect x="30" y="108" width="258" height="40" rx="16" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/><text x="159" y="133" text-anchor="middle" font-size="19" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">A &gt; B &gt; C</text></g>
        </svg>`)+
        wkRow(sign('A > B и B > C → A > C',H9.gold,0.5))+
        wkSml('промежуточное звено можно «выбросить»: вывод останется верным'));
    } else if(step===3){
      h=wkFrame(wkBig('Весы: X, Y и Z')+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="166" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="c9pop"><circle cx="159" cy="34" r="14" fill="rgba(255,255,255,.06)" stroke="#cbb89a" stroke-width="2.4"/><line x1="159" y1="48" x2="159" y2="72" stroke="#cbb89a" stroke-width="2.4"/><line x1="66" y1="72" x2="252" y2="72" stroke="#cbb89a" stroke-width="4"/><line x1="66" y1="72" x2="66" y2="94" stroke="#cbb89a" stroke-width="4"/><line x1="252" y1="72" x2="252" y2="94" stroke="#cbb89a" stroke-width="4"/><rect x="38" y="94" width="56" height="46" rx="11" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/><text x="66" y="123" text-anchor="middle" font-size="24" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">X</text><rect x="224" y="94" width="56" height="46" rx="11" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.4"/><text x="252" y="123" text-anchor="middle" font-size="24" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">Z</text><text x="159" y="70" text-anchor="middle" font-size="11" fill="#9ec0a8">X легче Y · Y легче Z</text></g>
          <g class="c9pop" style="animation-delay:.5s"><rect x="84" y="146" width="150" height="18" rx="9" fill="rgba(143,209,168,.14)" stroke="#8fd1a8"/><text x="159" y="159" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">X &lt; Y &lt; Z</text></g>
        </svg>`)+
        wkAns('тяжелее всех Z, легче всех X',H9.green)+
        wkSml('стрелка всегда указывает от лёгкого к тяжёлому — идём по ней до конца'));
    } else if(step===4){
      h=wkFrame(wkBig('Цепочка одной строкой')+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="140" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <text x="159" y="30" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">Волк &gt; Лиса &gt; Заяц</text>
          <rect x="26" y="44" width="120" height="30" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="86" y="64" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">первый</text>
          <rect x="172" y="44" width="120" height="30" rx="12" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.2"/>
          <text x="232" y="64" text-anchor="middle" font-size="14" fill="#8fd1a8" font-weight="bold">последний</text>
          <g class="c9pop" style="animation-delay:.35s"><text x="86" y="96" text-anchor="middle" font-size="14" fill="#e8dcc8" font-weight="bold">самый высокий</text></g>
          <g class="c9pop" style="animation-delay:.45s"><text x="232" y="96" text-anchor="middle" font-size="14" fill="#e8dcc8" font-weight="bold">самый низкий</text></g>
          <g class="c9pop" style="animation-delay:.55s"><rect x="56" y="110" width="206" height="22" rx="11" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/><text x="159" y="125" text-anchor="middle" font-size="13" fill="#cfe0cf">концы цепочки = готовый ответ</text></g>
        </svg>`)+
        wkSml('кто в цепочке первый — самый высокий; кто последний — самый низкий'));
    } else if(step===5){
      h=wkFrame(wkBig('Четыре зверя по росту')+
        wkHero(rowBeasts([
          {letter:'М',h:118,c:'#b98a5a'},
          {letter:'В',h:92,c:'#7f9bb8',delay:.12},
          {letter:'Л',h:66,c:'#e08a4a',delay:.24},
          {letter:'З',h:40,c:'#c9a06a',delay:.36}
        ],{ground:138,wcol:44,stepX:76,headR:13}))+
        `<div class="c9in" style="animation-delay:.5s;text-align:center;font-size:12.5px;color:#e8dcc8;font-weight:bold">М — Медведь · В — Волк · Л — Лиса · З — Заяц</div>`+
        wkRow(sign('Медведь > Волк > Лиса > Заяц',H9.green,0.5))+
        wkAns('Медведь — самый высокий, Заяц — самый низкий',H9.gold)+
        wkSml('длинная цепочка работает так же, как короткая: звено за звеном'));
    } else if(step===6){
      const show=st.mode===1;
      h=wkFrame(wkBig('Данных не хватает?')+
        wkHero(rowBeasts(show
          ? [{letter:'В',h:100,c:'#7f9bb8'},{letter:'Л',h:70,c:'#e08a4a',delay:.15},{letter:'З',h:42,c:'#c9a06a',delay:.3}]
          : [{letter:'Л',h:70,c:'#e08a4a'},{letter:'З',h:42,c:'#c9a06a',delay:.15},{letter:'В?',h:100,c:'#5a6f7f',delay:.3}],{ground:118,w:318}))+
        wkRow(sign('Лиса > Заяц',H9.gold),sign('Волк > Заяц',H9.blue,0.2))+
        (show
          ? wkAns('теперь ясно: Волк выше Лисы, оба выше Зайца!',H9.green)+wkRow(wkBtn('сброс',`visW24Act('${lk}','rst')`))
          : `<div class="c9in" style="animation-delay:.5s;text-align:center;font-size:13.5px;color:#ffcfc2;font-weight:bold">кто выше: Лиса или Волк? пока не знаем!</div>`+wkRow(wkBtn('добавить: Волк выше Лисы',`visW24Act('${lk}','w')`)))+
        wkSml('если данных не хватает — отвечай только на то, что следует из цепочки'));
    } else if(step===7){
      const kinds=[['рост','выше','#7fd1ff'],['масса','тяжелее','#8fd1a8'],['длина','длиннее','#ffd76a'],['возраст','старше','#e8a0d8']];
      const chips=kinds.map((k,i)=>`<span class="c9in" style="animation-delay:${(i*0.12).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2px solid ${k[2]};font-size:15px;color:${k[2]};font-weight:bold">${k[1]}</span>`).join('');
      h=wkFrame(wkBig('Сравниваем что угодно')+
        wkHero(`<svg viewBox="0 0 318 120" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="110" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <rect x="20" y="24" width="64" height="72" rx="11" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="52" y="64" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">A</text>
          <text x="52" y="86" text-anchor="middle" font-size="11" fill="#9ec0a8">больше</text>
          <text x="105" y="70" text-anchor="middle" font-size="24" fill="#ff8a7a" font-weight="bold">&gt;</text>
          <rect x="127" y="24" width="64" height="72" rx="11" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="159" y="64" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">B</text>
          <text x="159" y="86" text-anchor="middle" font-size="11" fill="#9ec0a8">середина</text>
          <text x="212" y="70" text-anchor="middle" font-size="24" fill="#ff8a7a" font-weight="bold">&gt;</text>
          <rect x="234" y="24" width="64" height="72" rx="11" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="266" y="64" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">C</text>
          <text x="266" y="86" text-anchor="middle" font-size="11" fill="#9ec0a8">меньше</text>
        </svg>`)+
        `<div class="wk-row" style="gap:7px;margin-top:4px">${chips}</div>`+
        wkSml('правило одно для роста, массы, длины и возраста: если A > B и B > C, то A > C'));
    } else if(step===8){
      if(st.quiz==null) st.quiz=0;
      const cases=[
        {chain:['A','B','C'], q:'A выше B, B выше C. Кто выше всех?', opts:['A','B','C'], ans:0},
        {chain:['X','Y','Z'], q:'X легче Y, Y легче Z. Кто тяжелее всех?', opts:['X','Y','Z'], ans:2},
        {chain:['М','В','Л','З'], q:'Медведь выше Волка, Волк выше Лисы, Лиса выше Зайца. Кто ниже всех?', opts:['Медведь','Волк','Лиса','Заяц'], ans:3},
        {chain:['A','B','C','D'], q:'A выше B, B выше C, C выше D. Кто выше всех?', opts:['A','B','C','D'], ans:0}
      ];
      const T=cases[st.quiz%cases.length];
      const Q=st.quiz>=cases.length? cases[st.quiz%cases.length] : T;
      h=wkFrame(wkBig('Тренажёр: концы цепочки')+
        (st.quiz<cases.length
          ? wkNote('вопрос '+((st.quiz%cases.length)+1)+' из '+cases.length,'#cfe0cf')
          : ''))+
        wkHero(rowBeasts(
          T.chain.map((c,i)=>({letter:c,h:120-i*24,c:H9P[i%H9P.length],delay:i*0.12})),
          {ground:132,wcol:40,stepX:72,headR:13}))+
        wkNote(T.q,'#e8dcc8')+
        `<div class="wk-row" style="gap:8px">${T.opts.map((o,i)=>{
          let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
          if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?H9.green:H9.red; tc=i===T.ans?H9.green:H9.red; }
          return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:52px;font-size:16px" onclick="visW24T('${lk}',${i})">${o}</button>`;
        }).join('')}</div>`+
        (st.sel!=null?(st.sel===T.ans
          ? `<div class="wk-ans" style="color:#8fd1a8;font-size:17px">верно! Ответ — на конце цепочки</div>`+wkRow(wkBtn('следующий вопрос',`visW24Act('${lk}','nq')`))
          : `<div class="wk-ans" style="color:#ff8a7a;font-size:16px">не так. Кто первый, кто последний?</div>`+wkRow(wkBtn('заново',`visW24Act('${lk}','rst')`))):'')+
        wkSml('первый в цепочке — «самый», последний — «наименее»');
    } else if(step===9){
      const show=st.mode===1;
      h=wkFrame(wkBig('Очень длинная цепочка')+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="128" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${['A','B','C','D','E'].map((c,i)=>{
            const x=26+i*58;
            return `<g class="c9pop" style="animation-delay:${(i*0.12).toFixed(2)}s">
              <rect x="${x}" y="${show? (20+i*10) : 40}" width="46" height="${show? (92-i*10) : 66}" rx="11" fill="rgba(255,255,255,.05)" stroke="${H9P[i%H9P.length]}" stroke-width="2.4"/>
              <text x="${x+23}" y="${show? (44+i*10): 78}" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">${c}</text>
            </g>`;
          }).join('')}
          ${!show? `<text x="159" y="112" text-anchor="middle" font-size="12" fill="#9ec0a8">пока просто буквы: A, B, C, D, E</text>`:''}
        </svg>`)+
        (show
          ? wkRow(sign('A > B > C > D > E',H9.green,0.4))+
            wkRow(wkPill('выше всех — A',H9.gold),wkPill('ниже всех — E',H9.blue))+
            wkRow(wkBtn('сброс',`visW24Act('${lk}','rst')`))
          : wkRow(wkBtn('выстроить по росту',`visW24Act('${lk}','w')`)))+
        wkSml('сколько бы ни было звеньев, ответ всегда на концах цепочки'));
    } else if(step===10){
      h=wkFrame(wkBig('Тест')+
        wkHero(`<svg viewBox="0 0 318 96" style="display:block;width:100%;height:auto">
          ${['A','B','C'].map((c,i)=>{
            const x=52+i*88;
            return `<g class="c9pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
              <rect x="${x}" y="14" width="64" height="64" rx="13" fill="rgba(255,255,255,.05)" stroke="${H9P[i%H9P.length]}" stroke-width="2.6"/>
              <text x="${x+32}" y="55" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">${c}</text>
            </g>`;
          }).join('')}
          <text x="120" y="58" text-anchor="middle" font-size="22" fill="#ff8a7a" font-weight="bold">&gt;</text>
          <text x="208" y="58" text-anchor="middle" font-size="22" fill="#ff8a7a" font-weight="bold">&gt;</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('собери цепочку и посмотри на её концы — ответ найдётся сам'));
    } else {
      h=wkFrame(wkBig('Проверь себя: X, Y и Z')+
        wkHero(`<svg viewBox="0 0 318 120" style="display:block;width:100%;height:auto">
          ${['X','Y','Z'].map((c,i)=>{
            const x=46+i*82;
            return `<g class="c9pop" style="animation-delay:${(i*0.16).toFixed(2)}s">
              <rect x="${x}" y="16" width="64" height="64" rx="13" fill="rgba(255,255,255,.05)" stroke="${H9P[i%H9P.length]}" stroke-width="2.6"/>
              <text x="${x+32}" y="57" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">${c}</text>
              <text x="${x+32}" y="96" text-anchor="middle" font-size="11" fill="#9ec0a8">${i===0?'легче всех':(i===1?'средний':'тяжелее всех')}</text>
            </g>`;
          }).join('')}
          <text x="114" y="60" text-anchor="middle" font-size="22" fill="#ff8a7a" font-weight="bold">&lt;</text>
          <text x="196" y="60" text-anchor="middle" font-size="22" fill="#ff8a7a" font-weight="bold">&lt;</text>
        </svg>`)+
        wkRow(sign('X < Y < Z',H9.gold))+
        wkAns('тяжелее всех — Z! Готов к проверке?',H9.green)+
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
    if(act==='nq'){ if(st.quiz!=null){ st.quiz++; } st.sel=null; if(st.q!=null){ st.q=1; st.sel=null; } }
    if(act==='rst') CHS[lk]={};
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

/* ================= УРОК 20 · Секрет умножения на 11 (v8, поезд-паровоз, аккуратные табло) ================= */
(function(){
  if(!window.__wk20v8css){
    window.__wk20v8css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .t8in{animation:t8In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes t8In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .t8pop{animation:t8Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t8Pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .t8smoke{animation:t8Smoke 2.6s ease-in-out infinite;}'+
      '@keyframes t8Smoke{0%,100%{transform:translate(0,0) scale(1);opacity:.75}50%{transform:translate(5px,-6px) scale(1.12);opacity:.5}}'+
      '#lvis .t8wob{animation:t8Wob 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t8Wob{0%,100%{transform:rotate(-1.4deg)}50%{transform:rotate(1.4deg)}}'+
      '#lvis .t8bump{animation:t8Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t8Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}'+
      '#lvis .t8flow{stroke-dasharray:9 7;animation:t8Flow .85s linear infinite;}'+
      '@keyframes t8Flow{to{stroke-dashoffset:-32}}'+
      '#lvis .t8seg{opacity:0;animation:t8Seg .35s ease forwards;}'+
      '@keyframes t8Seg{to{opacity:1}}';
    document.head.appendChild(st);
  }
  const L20 = {
    id: 20, title: 'Секрет умножения на 11', ico: '✕',
    src: 'Математика · Устный счёт · Умножение на 11', subj: 'math',
    explain: [
      'По перрону мчится магический поезд Архимеда — его называют «экспресс одиннадцати». На табло локомотива задача: 45 · 11. Столбиком решать долго, но машинист знает фокус: умножить на 11 — это умножить на 10 и прибавить само число, ведь 11 = 10 + 1.',
      'Разберём секрет по частям. Умножить на 10 легко: к числу просто приписываем ноль — 45 · 10 = 450. Теперь прибавляем само число: 450 + 45 = 495. Вот и ответ! Это надёжная проверка для любого примера.',
      'Теперь сам фокус. Возьмём двузначное число, например 45. Раздвинь цифры 4 и 5 — между ними появится пустой вагончик. Туда мы «посадим» их сумму: 4 + 5 = 9. Получается 495.',
      'Проверим, что фокус не обманывает: 45 · 11 = 495 — а по шагу «умножить на 10 и прибавить» мы получили ровно то же самое: 450 + 45 = 495. Два способа сошлись!',
      'Почему фокус работает? 11 = 10 + 1, значит 45 · 11 = 45 · 10 + 45 = 450 + 45. Запиши сложение столбиком: единицы 0 + 5 = 5, десятки 5 + 4 = 9, сотни — просто 4. Читаем по разрядам: 4, 9, 5 — та самая сумма соседних цифр в серединке!',
      'Тренируемся без переноса: 63 · 11. Цифры 6 и 3, их сумма 6 + 3 = 9 меньше десяти — просто ставим её в середину: 693. Проверка: 630 + 63 = 693. Всё сходится!',
      'Ещё пример без переноса: 24 · 11. Цифры 2 и 4, сумма 2 + 4 = 6. Пишем 6 между ними — и читаем 264. Проверь сам: 240 + 24 = 264. Фокус не подводит.',
      'Правило для суммы меньше 10: если a + b меньше десяти, цифры просто «раздвигаются», а сумма встаёт в середину. Переносить ничего не нужно — ответ готов за секунду!',
      'А если сумма цифр больше 9? Например, 37 · 11: 3 + 7 = 10. Десять не помещается в один вагончик! В середину пишем цифру 0, а единицу переносим вперёд: 3 + 1 = 4. Получается 407. Проверь: 370 + 37 = 407.',
      'Ещё пример с переносом: 76 · 11. Сумма 7 + 6 = 13: в середину пишем 3, а единицу переносим — 7 + 1 = 8. Получаем 836. Проверка: 760 + 76 = 836. Один перенос — и фокус снова работает!',
      'Хитрый случай — 99 · 11. Сумма 9 + 9 = 18: в середину пишем 8 и переносим единицу, но слева 9 + 1 = 10! Снова переносим — впереди появляется новый разряд 1. Получается 1089. Проверь: 990 + 99 = 1089. Двойной перенос!',
      'А если в числе есть ноль? 10 · 11: цифры 1 и 0, их сумма 1 + 0 = 1. Ставим единицу в середину: 110. Проверка: 100 + 10 = 110. Ноль — обычная цифра, фокус работает и с ним!',
      'Тренажёр: тебе дадут число ab. Шаг 1 — сложи цифры a + b. Шаг 2 — поставь сумму в середину. Если сумма больше 9 — в середину пиши её последнюю цифру, а единицу переноси к первой (и проверяй, не нужен ли ещё перенос). Нажимай кнопки и открывай ответ!',
      'Проверь себя: 45 · 11 = 495 (раздвинь 4 и 5, вставь сумму 9). А ещё проверь проверкой: 450 + 45 = 495. Жми «Понял! Проверю себя» — там ждёт этот пример!'
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
  const T={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',cream:'#f2e7c9',night:'#1d2f57',boiler:'#3e6f9e',wheel:'#23384d',smoke:'#cfd8dd'};
  const TP=['#ffd76a','#8fd1a8','#7fd1ff','#e8a0d8','#ff9a7a','#6fbf7a','#5aa0d8'];
  /* ==== настоящий паровоз на рельсах (вид сбоку) ==== */
  function tracks(y){
    let shp='';
    for(let x=8;x<312;x+=22){ shp+=`<rect x="${x}" y="${y+12}" width="12" height="3" rx="1.5" fill="#1c2a22"/>`; }
    return `<rect x="6" y="${y+10}" width="306" height="7" rx="3" fill="#0e1812"/>
      <rect x="6" y="${y+12}" width="306" height="2.4" fill="#16241c"/>
      ${shp}
      <rect x="4" y="${y-2}" width="310" height="4.5" rx="2" fill="#8a94ad"/>
      <rect x="4" y="${y+5}" width="310" height="4.5" rx="2" fill="#6b7686"/>`;
  }
  function engineSVG(opt){
    const o=opt||{};
    const gx=o.x||10, gy=o.y||34, s=o.s||1;
    const sx=(v)=>gx+v*s, sy=(v)=>gy+v*s;
    let out=`<g class="t8wob">`;
    // колёса
    const wheels=[[14,54],[46,54],[78,54],[108,54]];
    wheels.forEach((w,i)=>{
      out+=`<g class="t8seg" style="animation-delay:${(i*0.1).toFixed(2)}s">
        <circle cx="${sx(w[0])}" cy="${sy(w[1])}" r="${13*s}" fill="${T.wheel}" stroke="#0d1a22" stroke-width="2.5"/>
        <circle cx="${sx(w[0])}" cy="${sy(w[1])}" r="${5*s}" fill="#c8d2da"/>
        <circle cx="${sx(w[0])}" cy="${sy(w[1])}" r="${1.6*s}" fill="#0d1a22"/></g>`;
    });
    // рама
    out+=`<rect x="${sx(4)}" y="${sy(34)}" width="${140*s}" height="${10*s}" rx="${3*s}" fill="#241a10"/>`;
    // котёл (бочка)
    out+=`<rect x="${sx(14)}" y="${sy(20)}" width="${98*s}" height="${26*s}" rx="${12*s}" fill="${T.boiler}"/>
      <rect x="${sx(14)}" y="${sy(20)}" width="${98*s}" height="${26*s}" rx="${12*s}" fill="none" stroke="#16324d" stroke-width="2"/>
      <rect x="${sx(20)}" y="${sy(24)}" width="${86*s}" height="${5*s}" rx="2.5" fill="#ffd76a" opacity=".85"/>
      <line x1="${sx(40)}" y1="${sy(22)}" x2="${sx(40)}" y2="${sy(44)}" stroke="#d9c08a" stroke-width="2" opacity=".7"/>
      <line x1="${sx(66)}" y1="${sy(22)}" x2="${sx(66)}" y2="${sy(44)}" stroke="#d9c08a" stroke-width="2" opacity=".7"/>
      <line x1="${sx(92)}" y1="${sy(22)}" x2="${sx(92)}" y2="${sy(44)}" stroke="#d9c08a" stroke-width="2" opacity=".7"/>`;
    // кабина машиниста
    out+=`<rect x="${sx(112)}" y="${sy(8)}" width="${32*s}" height="${34*s}" rx="${5*s}" fill="#24405c"/>
      <rect x="${sx(112)}" y="${sy(8)}" width="${32*s}" height="${34*s}" rx="${5*s}" fill="none" stroke="#16324d" stroke-width="2"/>
      <rect x="${sx(117)}" y="${sy(13)}" width="${22*s}" height="${13*s}" rx="${3*s}" fill="#ffe9a8" opacity=".9"/>
      <rect x="${sx(117)}" y="${sy(30)}" width="${22*s}" height="${8*s}" rx="${2*s}" fill="#3a2b16"/>`;
    // труба
    out+=`<rect x="${sx(14)}" y="${sy(6)}" width="${12*s}" height="${15*s}" rx="${2.5*s}" fill="#16324d"/>`;
    // дым
    out+=`<g class="t8smoke">
      <circle cx="${sx(9)}" cy="${sy(-2)}" r="${9*s}" fill="${T.smoke}" opacity=".55"/>
      <circle cx="${sx(-6)}" cy="${sy(-10)}" r="${13*s}" fill="${T.smoke}" opacity=".4" style="animation-delay:.6s"/>
      <circle cx="${sx(-16)}" cy="${sy(-20)}" r="${16*s}" fill="${T.smoke}" opacity=".3" style="animation-delay:1.2s"/>
      <circle cx="${sx(-28)}" cy="${sy(-30)}" r="${18*s}" fill="${T.smoke}" opacity=".2" style="animation-delay:1.8s"/>
    </g>`;
    // буфер спереди
    out+=`<rect x="${sx(146)}" y="${sy(26)}" width="${8*s}" height="${14*s}" rx="${2*s}" fill="#16324d"/>`;
    out+=`<g class="t8seg" style="animation-delay:.35s"><text x="${sx(82)}" y="${sy(4)}" text-anchor="middle" font-size="${13*s}" fill="#ffd76a" font-weight="bold" letter-spacing="1">ЭКСПРЕСС 11</text></g>`;
    out+=`</g>`;
    return out;
  }
  /* ==== табло-вагон с цифрой (аккуратная плашка на колёсах) ==== */
  function coach(x,y,digit,color,opt){
    const o=opt||{};
    const w=o.w||62, h=o.h||50, fs=o.fs||34;
    const col=color||T.gold;
    const stroke=o.stroke||col;
    const delay=o.delay!=null?o.delay:0.08;
    const cls = o.bump? 't8bump' : (o.dash? 't8pop': 't8pop');
    const cy=y+h/2;
    let out=`<g class="${cls}" style="animation-delay:${delay.toFixed(2)}s">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11" fill="rgba(255,255,255,.06)" stroke="${stroke}" stroke-width="2.6"/>
      <rect x="${x+6}" y="${y+6}" width="${w-12}" height="${h-12}" rx="7" fill="rgba(10,20,30,.72)"/>
      <text x="${x+w/2}" y="${(cy+fs*0.36).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="${o.tc||col}" font-weight="bold" font-family="Georgia,serif">${digit}</text>
      <circle cx="${x+13}" cy="${y+h+8}" r="6" fill="${T.wheel}" stroke="#0d1a22" stroke-width="2"/>
      <circle cx="${x+w-13}" cy="${y+h+8}" r="6" fill="${T.wheel}" stroke="#0d1a22" stroke-width="2"/>
    </g>`;
    return out;
  }
  /* рельсы под составом вагонов */
  function rowSVG(items,opt){
    const o=opt||{};
    const W=318, y=o.y||34, w=o.w||62, gap=o.gap||8;
    const n=items.length;
    const total=n*w+(n-1)*gap;
    const x0=Math.round((W-total)/2);
    const H=y+70;
    let s=tracks(y+62);
    items.forEach((it,i)=>{
      const x=x0+i*(w+gap);
      const col=it.c||TP[i%TP.length];
      s+=coach(x,y,it.d,col,{delay:i*0.14,fs:o.fs,w,stroke:it.stroke});
      if(it.bump) {} // переиспользуем ниже
    });
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">${s}</svg>`;
  }
  /* знак между вагонами: рисуем отдельно */
  const signT=(x,y,ch,c,fs,delay)=>`<text class="t8in" style="animation-delay:${(delay||0).toFixed(2)}s" x="${x}" y="${y}" text-anchor="middle" font-size="${fs||34}" fill="${c||T.gold}" font-weight="bold">${ch}</text>`;
  const pill=(t,c,delay)=>`<span class="t8in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:7px 14px;border-radius:13px;border:2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:21px;color:${c};font-weight:bold">${t}</span>`;
  const Q20=[
    {q:'58 · 11 = ?',opts:['580','583','638'],ans:2},
    {q:'72 · 11 = ?',opts:['782','792','772'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q20[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?T.green:T.red; tc=i===T.ans?T.green:T.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:74px;font-size:18px" onclick="visW20T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! 7 + 2 = 9 в середину → 792</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! 5 + 8 = 13: в середину 3, единица вперёд → 638</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:17px">Не так. Раздвинь цифры и вставь их сумму (с переносом)</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW20Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW20Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW20(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===2){ st.step=0; } if(step===3){ st.step=0; } if(step===5){ st.step=0; } if(step===6){ st.step=0; } if(step===8){ st.step=0; } if(step===9){ st.step=0; } if(step===10){ st.step=0; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Магический поезд: 45 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          ${engineSVG({x:52,y:52,s:1.05})}
          ${tracks(142)}
          <g class="t8seg" style="animation-delay:.4s"><text x="238" y="86" text-anchor="middle" font-size="15" fill="#cfe0cf">на табло</text>
          <rect x="206" y="54" width="64" height="58" rx="10" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="238" y="80" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">45</text>
          <text x="238" y="102" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">× 11 = ?</text></g>
        </svg>`)+
        wkSml('умножить на 11 — это умножить на 10 и прибавить само число'));
    } else if(step===1){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Секрет: 11 = 10 + 1</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          ${tracks(142)}
          ${coach(34,34,45,'#7fd1ff',{delay:0,fs:30})}
          <text x="126" y="76" text-anchor="middle" font-size="34" fill="#cfe0cf" font-weight="bold">×</text>
          <text x="154" y="74" text-anchor="middle" font-size="24" fill="#8fd1a8" font-weight="bold">10</text>
          ${signT(196,74,'+',T.gold,36,.2)}
          <text x="240" y="74" text-anchor="middle" font-size="24" fill="#8fd1a8" font-weight="bold">45</text>
          ${signT(282,74,'=',T.gold,32,.3)}
          <g class="t8pop" style="animation-delay:.4s"><rect x="252" y="96" width="56" height="34" rx="10" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="280" y="119" text-anchor="middle" font-size="22" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">495</text></g>
          <text x="60" y="120" text-anchor="middle" font-size="14" fill="#8fd1a8" font-weight="bold">45 · 10 = 450</text>
        </svg>`)+
        wkRow(pill('450 + 45 = 495', T.green,0.5))+
        wkSml('сначала приписываем ноль (умножить на 10), потом прибавляем само число'));
    } else if(step===2){
      const sh=st.step||0;
      const gapX=72;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Фокус: раздвигаем цифры</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${tracks(118)}
          ${coach(x0,28,4,'#7fd1ff',{delay:0})}
          ${sh>=1? coach(x0+72,28,'?','#ffd76a',{delay:.2,stroke:'#8f9aa6',dash:1}):''}
          ${coach(x0+144,28,5,'#8fd1a8',{delay:.15})}
          ${sh>=1? signT(x0+114,60,'→',T.gold,28,.3):''}
        </svg>`)+
        (sh>=2? wkAns('между 4 и 5 появился пустой вагончик!',T.gold):'')+
        wkRow(
          sh===0? wkBtn('раздвинуть цифры',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('вставить сумму 4+5=9',`visW20Act('${lk}','f2')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('в пустой вагончик мы посадим сумму соседних цифр'));
    } else if(step===3){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Сумма в серединке: 495</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${tracks(118)}
          ${coach(x0,28,4,'#7fd1ff',{delay:0})}
          ${sh>=1? coach(x0+72,28,'9','#ffd76a',{delay:.2,bump:1}):''}
          ${coach(x0+144,28,5,'#8fd1a8',{delay:.15})}
          ${sh>=1? `<g class="t8seg" style="animation-delay:.4s"><text x="${x0+36}" y="92" text-anchor="middle" font-size="14" fill="#8fd1a8">4</text><text x="${x0+108}" y="92" text-anchor="middle" font-size="14" fill="#ffd76a">+</text><text x="${x0+180}" y="92" text-anchor="middle" font-size="14" fill="#8fd1a8">5</text><text x="${x0+108}" y="76" text-anchor="middle" font-size="13" fill="#cfe0cf">4+5=9</text></g>`:''}
        </svg>`)+
        (sh>=2? wkAns('45 · 11 = 495!',T.green):'')+
        wkRow(
          sh===0? wkBtn('вставить 9',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('прочитать ответ',`visW20Act('${lk}','f2')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('цифры 4 · 9 · 5 — это и есть 495: 4, затем сумма, затем 5'));
    } else if(step===4){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Почему так выходит?</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="t8seg"><text x="44" y="34" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">450</text>
          <text x="44" y="58" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">+ 45</text>
          <line x1="16" y1="68" x2="76" y2="68" stroke="#cfe0cf" stroke-width="2"/>
          <text x="44" y="90" text-anchor="middle" font-size="16" fill="#cfe0cf" font-weight="bold">495</text></g>
          <g class="t8seg" style="animation-delay:.2s"><text x="166" y="30" text-anchor="middle" font-size="13" fill="#9ec0a8">единицы: 0 + 5 = 5</text>
          <text x="166" y="54" text-anchor="middle" font-size="13" fill="#9ec0a8">десятки: 5 + 4 = 9</text>
          <text x="166" y="78" text-anchor="middle" font-size="13" fill="#9ec0a8">сотни: 4</text>
          <text x="166" y="108" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">4 · 9 · 5 → 495</text></g>
        </svg>`)+
        wkSml('в середине числа всегда «сумма соседей» — это не магия, а сложение'));
    } else if(step===5){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Без переноса: 63 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${tracks(118)}
          ${coach(x0,28,6,'#7fd1ff',{delay:0})}
          ${sh>=1? coach(x0+72,28,sh>=2?'9':'?',sh>=2?'#ffd76a':'#8fa0ad',{delay:.2,bump:sh>=2}):''}
          ${coach(x0+144,28,3,'#8fd1a8',{delay:.15})}
          ${sh>=2? `<g class="t8seg" style="animation-delay:.35s"><text x="${x0+108}" y="98" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">6+3=9</text></g>`:''}
        </svg>`)+
        (sh>=2? wkAns('63 · 11 = 693',T.green):'')+
        wkRow(
          sh===0? wkBtn('1 · сумма 6+3',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('2 · ответ',`visW20Act('${lk}','f2')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('сумма меньше 10 — переносить не нужно: 6 · 9 · 3'));
    } else if(step===6){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ещё без переноса: 24 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${tracks(118)}
          ${coach(x0,28,2,'#7fd1ff',{delay:0})}
          ${sh>=1? coach(x0+72,28,sh>=2?'6':'?',sh>=2?'#ffd76a':'#8fa0ad',{delay:.2,bump:sh>=2}):''}
          ${coach(x0+144,28,4,'#8fd1a8',{delay:.15})}
          ${sh>=2? `<g class="t8seg" style="animation-delay:.35s"><text x="${x0+108}" y="98" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">2+4=6</text></g>`:''}
        </svg>`)+
        (sh>=2? wkAns('24 · 11 = 264',T.green):'')+
        wkRow(
          sh===0? wkBtn('1 · сумма 2+4',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('2 · ответ',`visW20Act('${lk}','f2')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('2 · 6 · 4 — сумма 6 встала в середину, всё сошлось'));
    } else if(step===7){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Правило: сумма меньше 10</div>`+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="128" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="t8pop"><rect x="20" y="16" width="60" height="60" rx="12" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2.6"/>
          <text x="50" y="54" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">a</text></g>
          <g class="t8pop" style="animation-delay:.2s"><rect x="120" y="16" width="78" height="60" rx="12" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="159" y="54" text-anchor="middle" font-size="30" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">a+b</text></g>
          <g class="t8pop" style="animation-delay:.4s"><rect x="238" y="16" width="60" height="60" rx="12" fill="rgba(255,255,255,.05)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="268" y="54" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">b</text></g>
          ${signT(95,55,'+',T.gold,30,0)}
          ${signT(212,55,'=',T.gold,28,.3)}
        </svg>`)+
        wkSml('цифры «раздвигаются», сумма встаёт между ними — без всяких переносов'));
    } else if(step===8){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Перенос: 37 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          ${tracks(140)}
          ${coach(x0,28,sh>=3?'4':'3',sh>=3?'#ffd76a':'#7fd1ff',{delay:0,bump:sh>=3})}
          ${sh>=1? coach(x0+72,28,sh>=2?'0':'10',sh>=2?'#ffd76a':'#ff8a7a',{delay:.2,bump:1}):''}
          ${coach(x0+144,28,7,'#8fd1a8',{delay:.15})}
          ${sh>=1? `<g class="t8seg" style="animation-delay:.3s"><path class="t8flow" d="M${x0+118} 92 C ${x0+118} 108, ${x0+40} 112, ${x0+42} 96" fill="none" stroke="#ffd76a" stroke-width="3"/><text x="${x0+44}" y="104" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">+1</text></g>`:''}
        </svg>`)+
        (sh>=3? wkAns('3+7=10 → в середину 0, единица вперёд: 407',T.green):'')+
        wkRow(
          sh===0? wkBtn('сложить 3+7',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('в середину 0',`visW20Act('${lk}','f2')`) : '',
          sh===2? wkBtn('перенести единицу',`visW20Act('${lk}','f3')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('сумма 10 больше 9: в середину пишем 0, единицу — вперёд'));
    } else if(step===9){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ещё перенос: 76 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          ${tracks(140)}
          ${coach(x0,28,sh>=3?'8':'7',sh>=3?'#ffd76a':'#7fd1ff',{delay:0,bump:sh>=3})}
          ${sh>=1? coach(x0+72,28,sh>=2?'3':'13',sh>=2?'#ffd76a':'#ff8a7a',{delay:.2,bump:1}):''}
          ${coach(x0+144,28,6,'#8fd1a8',{delay:.15})}
          ${sh>=1? `<g class="t8seg" style="animation-delay:.3s"><path class="t8flow" d="M${x0+118} 92 C ${x0+118} 108, ${x0+40} 112, ${x0+42} 96" fill="none" stroke="#ffd76a" stroke-width="3"/><text x="${x0+44}" y="104" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">+1</text></g>`:''}
        </svg>`)+
        (sh>=3? wkAns('7+6=13 → в середину 3, единица вперёд: 836',T.green):'')+
        wkRow(
          sh===0? wkBtn('сложить 7+6',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('в середину 3',`visW20Act('${lk}','f2')`) : '',
          sh===2? wkBtn('перенести единицу',`visW20Act('${lk}','f3')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('7 + 6 = 13: в середину последняя цифра 3, единица — к первой'));
    } else if(step===10){
      const sh=st.step||0;
      const x0=Math.round((318-(4*56+3*8))/2);
      // 99·11: sh0 [9][?][9] · sh1 [9][18][9] · sh2 [9][8][9] +1 → [10][8][9]? нет:
      //   sh2 — показали 8 в середине, стрелка переноса к левой 9
      //   sh3 — левая 9 стала 10 (красная, двузначная) — ждём ещё перенос
      //   sh4 — 10 распалось на [1][0] → 1 0 8 9
      let left='9'; let leftCol='#7fd1ff';
      if(sh===3){ left='10'; leftCol='#ff8a7a'; }
      if(sh===4){ left='0'; leftCol='#7fd1ff'; }
      const off = (sh>=4)? 56 : 0;   // при sh4 добавляем единицу слева
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Хитрый случай: 99 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          ${tracks(158)}
          ${sh>=4? coach(x0,42,1,'#e8a0d8',{delay:0,w:48,fs:26,bump:1}):''}
          ${coach(x0+off,42,left,leftCol,{delay:.05,w:48,fs:26,bump:(sh===3||sh===4)})}
          ${sh>=1? coach(x0+56+off,42,sh>=2?'8':'18',sh>=2?'#ffd76a':'#ff8a7a',{delay:.2,w:48,fs:26,bump:sh>=2}):''}
          ${coach(x0+112+off,42,9,'#8fd1a8',{delay:.15,w:48,fs:26})}
          ${sh>=2&&sh<3? `<g class="t8seg" style="animation-delay:.3s"><path class="t8flow" d="M${x0+70} 120 C ${x0+70} 138, ${x0+4} 140, ${x0+6} 122" fill="none" stroke="#ffd76a" stroke-width="3"/><text x="${x0+10}" y="134" text-anchor="middle" font-size="13" fill="#ffd76a" font-weight="bold">+1</text></g>`:''}
          ${sh>=3? `<g class="t8seg" style="animation-delay:.35s"><path class="t8flow" d="M${x0+120} 116 C ${x0+132} 134, ${x0+0} 148, ${x0-6} 140" fill="none" stroke="#e8a0d8" stroke-width="3"/><text x="${x0+6}" y="150" text-anchor="middle" font-size="12" fill="#e8a0d8" font-weight="bold">9+1=10</text></g>`:''}
        </svg>`)+
        (sh>=4? wkAns('99 · 11 = 1089 · проверка: 990 + 99 = 1089',T.green):'')+
        wkRow(
          sh===0? wkBtn('сложить 9+9',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('в середину 8',`visW20Act('${lk}','f2')`) : '',
          sh===2? wkBtn('перенос +1 к 9',`visW20Act('${lk}','f3')`) : '',
          sh===3? wkBtn('ещё перенос: 10 → 1 и 0',`visW20Act('${lk}','f4')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('9+9=18 → в середину 8; 9+1=10 → пишем 0 и единицу в новый разряд'));
    } else if(step===11){
      const sh=st.step||0;
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ноль в числе: 10 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${tracks(118)}
          ${coach(x0,28,1,'#7fd1ff',{delay:0})}
          ${sh>=1? coach(x0+72,28,sh>=2?'1':'?',sh>=2?'#ffd76a':'#8fa0ad',{delay:.2,bump:sh>=2}):''}
          ${coach(x0+144,28,0,'#8fd1a8',{delay:.15})}
          ${sh>=2? `<g class="t8seg" style="animation-delay:.35s"><text x="${x0+108}" y="98" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">1+0=1</text></g>`:''}
        </svg>`)+
        (sh>=2? wkAns('10 · 11 = 110 · и 20 · 11 = 220',T.green):'')+
        wkRow(
          sh===0? wkBtn('1 · сумма 1+0',`visW20Act('${lk}','f1')`) : '',
          sh===1? wkBtn('2 · ответ',`visW20Act('${lk}','f2')`) : '',
          sh>=1? wkBtn('сброс',`visW20Act('${lk}','rst')`) : '')+
        wkSml('ноль — обычная цифра: 1 · 1 · 0 = 110, фокус работает и с ним'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[[4,5],[6,3],[3,7],[7,6],[9,2],[5,8],[1,9],[8,4],[2,4],[1,0]];
      const [a,b]=POOL[st.tr%POOL.length];
      const sum=a+b, hi=sum>=10;
      let res='';
      if(hi){ const left=a+1; res= left>=10 ? ''+(left)+((sum%10))+''+b : String(left*100+(sum%10)*10+b); }
      else res=String(a*100+sum*10+b);
      const x0=Math.round((318-(3*72-8))/2);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр устного счёта</div>`+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          ${tracks(132)}
          ${coach(x0,30,a,'#7fd1ff',{delay:0})}
          ${st.s1
            ? coach(x0+72,30,st.s2? (hi? String(sum%10): sum) : (hi? '10':'?'), st.s2?(hi?'#ffd76a':'#8fd1a8'):'#8fa0ad',{delay:.2,bump:st.s2})
            : ''}
          ${coach(x0+144,30,b,'#8fd1a8',{delay:.15})}
          ${st.s1? `<g class="t8seg" style="animation-delay:.25s"><text x="${x0+108}" y="104" text-anchor="middle" font-size="15" fill="${hi?'#ff8a7a':'#8fd1a8'}" font-weight="bold">${a}+${b}=${sum}</text></g>`:''}
          ${st.s2? `<g class="t8seg" style="animation-delay:.35s"><text x="159" y="128" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">ответ: ${res}${hi?' · был перенос':''}</text></g>`:''}
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · сумма',`visW20Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · ответ',`visW20Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW20Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW20Act('${lk}','rst')`) : '')+
        wkSml(hi?'сумма больше 9 — перенеси единицу вперёд!':'сумма меньше 10 — просто вставь её в середину'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: 45 · 11</div>`+
        wkHero(`<svg viewBox="0 0 318 110" style="display:block;width:100%;height:auto">
          ${tracks(100)}
          ${coach(52,20,4,'#7fd1ff',{delay:0,w:60,fs:32})}
          ${coach(128,20,9,'#ffd76a',{delay:.2,w:60,fs:32,bump:1})}
          ${coach(204,20,5,'#8fd1a8',{delay:.4,w:60,fs:32})}
        </svg>`)+
        quiz(lk,st)+
        wkSml('4 + 5 = 9 в серединку → 495 · жми «Понял! Проверю себя»'));
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
    if(act==='f1') st.step=1;
    if(act==='f2') st.step=2;
    if(act==='f3') st.step=3;
    if(act==='f4') st.step=4;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
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

/* ================= УРОК 179 · Правильные, неправильные дроби и смешанные числа (v5 · Шоколадная фабрика, 14 слайдов, без эмодзи) ================= */
(function(){
  if(!window.__wk179v5css){
    window.__wk179v5css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .c5in{animation:c5In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes c5In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .c5pop{animation:c5Pop .5s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c5Pop{0%{transform:scale(.12);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .c5slide{animation:c5Slide 1s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes c5Slide{from{transform:translateX(var(--sx));opacity:0}to{transform:translateX(0);opacity:1}}'+
      '#lvis .c5fall{animation:c5Fall .55s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes c5Fall{from{transform:translateY(-18px);opacity:0}to{transform:translateY(0);opacity:1}}'+
      '#lvis .c5belt{stroke-dasharray:10 8;animation:c5Belt .7s linear infinite;}'+
      '@keyframes c5Belt{to{stroke-dashoffset:-18}}'+
      '#lvis .c5bump{animation:c5Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c5Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}'+
      '#lvis .c5wob{animation:c5Wob 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes c5Wob{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}';
    document.head.appendChild(st);
  }
  const L179 = {
    id: 179, title: 'Правильные, неправильные дроби и смешанные числа', ico: '⅔',
    src: 'Математика · 5 класс · Виды дробей', subj: 'math',
    explain: [
      'На фабрике Архимеда пекут шоколадные плитки. Одна плитка — это ЦЕЛОЕ, и она разделена на равные дольки: например, на 4. Если взять меньше плитки — получится правильная дробь, а если больше — неправильная. Разберёмся с видами дробей!',
      'Взяли 3 дольки из 4 — это дробь 3/4. Числитель 3 меньше знаменателя 4, значит, дробь ПРАВИЛЬНАЯ: мы взяли меньше одной целой плитки. 5/8, 2/3, 7/10 — тоже правильные: всегда меньше 1.',
      'Посмотри на числовую ось от 0 до 1: правильная дробь всегда стоит МЕЖДУ 0 и 1. 3/4 — это 0,75, чуть ближе к 1, но всё равно меньше единицы!',
      'А теперь 7/4. Семь долек, а в плитке только четыре! Одной плитки не хватит — понадобится вторая. Числитель 7 больше знаменателя 4 — дробь НЕПРАВИЛЬНАЯ, она больше 1.',
      'А 5/5? Взяли все пять долек из пяти — собрали ровно одну целую плитку! Когда числитель РАВЕН знаменателю, дробь равна 1: 5/5 = 1, 9/9 = 1, 12/12 = 1.',
      'Неправильную дробь удобно записывать как СМЕШАННОЕ ЧИСЛО: целая часть и дробная. В 7/4 спрятана одна целая плитка (4/4) и ещё 3/4. Записываем: 7/4 = 1 целая и 3/4 — коротко: 1 3/4.',
      'Как найти целую часть? Делим числитель на знаменатель: 7 : 4 = 1 (и остаток 3). Частное 1 — целые плитки, остаток 3 — лишние дольки. Значит, 7/4 = 1 3/4.',
      'Обратный перевод: 2 1/3 — сколько это третей? В каждой целой плитке по 3 трети. Две плитки — это 2 · 3 = 6 третей. Плюс ещё 1 треть из дробной части: 6 + 1 = 7. Получаем 7/3!',
      'Запомни формулу: смешанное число a b/c = (a · c + b)/c. Проверь: 2 1/3 → (2 · 3 + 1)/3 = 7/3. 1 3/4 → (1 · 4 + 3)/4 = 7/4. Всё сходится!',
      'Тренажёр-определитель: тебе покажут дробь. Спроси себя: числитель меньше знаменателя? Тогда правильная. Больше или равен? Неправильная. Равен? Ровно 1. Отвечай и проверяй!',
      'Тренажёр-перевод: неправильную дробь превращаем в смешанное число. Шаг 1 — раздели числитель на знаменатель, найди целую часть. Шаг 2 — остаток станет числителем дробной части.',
      'Тренажёр обратный: смешанное число превращаем в неправильную дробь. Умножь целое на знаменатель, прибавь числитель — это новый числитель. Знаменатель не меняется!',
      'Ловушка: дробь 4/4 — это не «четыре четвёртых» больше единицы, а РОВНО 1! Любая дробь, где числитель равен знаменателю, равна целому. А 0/4 = 0 — ноль долек.',
      'Проверь себя: 7/4 = 1 3/4 (7 : 4 = 1, остаток 3). А 2 1/3 = 7/3. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Запиши 7/4 в виде смешанного числа.', choices: ['1 3/4', '1 1/4', '2 3/4'], ans: 0,
      exp: '7 : 4 = 1 (ост. 3) → 1 3/4.' },
    tasks: [
      { q: 'Чему равно 5/5?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Пять пятых — сколько целых?', '5 : 5 = 1.'], sol: '5/5 = 1.' },
      { q: 'Запиши 2 1/3 неправильной дробью.', kind: 'choice', choices: ['7/3', '6/3', '5/3'], ans: 0, tol: 0,
        hints: ['2 · 3 = 6 третей.', 'Плюс 1 = 7/3.'], sol: '2 1/3 = (2·3+1)/3 = 7/3.' }
    ]
  };
  const C5={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',choc:'#8a5a2e',chocD:'#4a2f1a',cream:'#ffe9c9'};
  /* шоколадная плитка: den долек, взято hl (подсвечено). Возвращает svg-строку */
  function choc(den,hl,opt){
    const o=opt||{};
    const W=o.w||300, H=o.h||54;
    const cw=W/den;
    let s=`<rect x="1" y="1" width="${W-2}" height="${H-2}" rx="10" fill="rgba(0,0,0,.25)"/>`;
    for(let i=0;i<den;i++){
      const on=hl>i;
      s+=`<g class="c5fall" style="animation-delay:${(i*0.07).toFixed(2)}s">
        <rect x="${i*cw+3}" y="4" width="${cw-6}" height="${H-8}" rx="7" fill="${on?'#8a5a2e':'#5d3a20'}" stroke="${on?C5.gold:'#3a2412'}" stroke-width="1.8"/>
        <rect x="${i*cw+6}" y="8" width="${cw-12}" height="${H-16}" rx="4" fill="${on?'#a9743c':'#6b4426'}" opacity=".6"/>
      </g>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">${s}</svg>`;
  }
  /* плитка-целое с рамкой + число долек для дробной части */
  const frac=(num,den,c,fs)=>`<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;font-family:Georgia,serif;line-height:1.05;margin:0 2px">
    <span style="font-size:${fs||22}px;color:${c||'#fff'};font-weight:bold;border-bottom:2px solid ${c||'#fff'};padding:0 4px">${num}</span>
    <span style="font-size:${fs||22}px;color:${c||'#fff'};font-weight:bold;padding:0 4px">${den}</span></span>`;
  const fracSVG=(x,y,num,den,c,fs,opt)=>{
    const o=opt||{};
    const f=fs||26;
    return `<g class="${o.anim||'c5pop'}" style="animation-delay:${(o.delay||0).toFixed(2)}s">
      <text x="${x}" y="${y-f/2+6}" text-anchor="middle" font-size="${f}" fill="${c||'#fff'}" font-weight="bold" font-family="Georgia,serif">${num}</text>
      <line x1="${x-f*0.55}" y1="${y+2}" x2="${x+f*0.55}" y2="${y+2}" stroke="${c||'#fff'}" stroke-width="2"/>
      <text x="${x}" y="${y+f/2+12}" text-anchor="middle" font-size="${f}" fill="${c||'#fff'}" font-weight="bold" font-family="Georgia,serif">${den}</text>
    </g>`;
  };
  const mixedSVG=(x,y,w,n,d,c,fs,opt)=>{
    const o=opt||{};
    const f=fs||26;
    const dx=f*0.85; // дробная часть сдвинута вправо от целой
    return `<g class="${o.anim||'c5pop'}" style="animation-delay:${(o.delay||0).toFixed(2)}s">
      <text x="${x}" y="${y+12}" text-anchor="middle" font-size="${f}" fill="${c||'#fff'}" font-weight="bold" font-family="Georgia,serif">${w}</text>
      <text x="${x+dx*0.7}" y="${y-f/2+8}" text-anchor="middle" font-size="${f*0.72}" fill="${c||'#fff'}" font-weight="bold" font-family="Georgia,serif">${n}</text>
      <line x1="${x+dx*0.35}" y1="${y+4}" x2="${x+dx*1.05}" y2="${y+4}" stroke="${c||'#fff'}" stroke-width="2"/>
      <text x="${x+dx*0.7}" y="${y+f/2+14}" text-anchor="middle" font-size="${f*0.72}" fill="${c||'#fff'}" font-weight="bold" font-family="Georgia,serif">${d}</text>
    </g>`;
  };
  const sign=(t,c,delay,fs)=>`<span class="c5in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q179=[
    {q:'7/4 = ? (смешанное число)',opts:['1 3/4','1 1/4','2 3/4'],ans:0},
    {q:'2 1/3 = ? (неправильная дробь)',opts:['7/3','6/3','5/3'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q179[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?C5.green:C5.red; tc=i===T.ans?C5.green:C5.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:80px;font-size:16px" onclick="visW179T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 2·3+1 = 7 третей → 7/3</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 7 : 4 = 1 (ост. 3) → 1 3/4</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Подели числитель на знаменатель: частное — целые</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW179Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW179Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW179(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step;
      if(step===0||step===3){ st.sh=0; } if(step===4){ st.sh=0; } if(step===5){ st.sh=0; } if(step===6){ st.sh=0; } if(step===7){ st.sh=0; }
      if(step===9){ st.pick=null; st.guess=-1; }
      if(step===10){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; }
      if(step===11){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; }
      if(step===13){ st.sel=null; st.q=0; }
    }
    let h='';
    if(step===0){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Шоколадная фабрика Архимеда</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="150" fill="#2a2030"/>
          <rect x="0" y="120" width="318" height="30" fill="#1c151f"/>
          ${[20,60,100,140,180,220,260,300].map((x,i)=>`<circle cx="${x}" cy="126" r="4" fill="#4a3a52"/>`).join('')}
          <line x1="8" y1="118" x2="310" y2="118" stroke="#5a4a62" stroke-width="6" stroke-linecap="round"/>
          <g class="c5belt"><line x1="8" y1="118" x2="310" y2="118" stroke="#c9a06a" stroke-width="2"/></g>
          <g class="c5slide" style="--sx:-200px"><rect x="26" y="38" width="104" height="56" rx="10" fill="#3a2412" stroke="#8a5a2e" stroke-width="2.4"/>
          <rect x="34" y="46" width="88" height="40" rx="7" fill="${show?'#8a5a2e':'#5d3a20'}"/>
          <g class="c5fall" style="animation-delay:.15s">${[0,1,2,3].map(i=>`<rect x="${40+i*21}" y="52" width="16" height="28" rx="5" fill="${show?'#a9743c':'#6b4426'}" stroke="${show?C5.gold:'#3a2412'}" stroke-width="1.4"/>`).join('')}</g></g>
          <text x="159" y="30" text-anchor="middle" font-size="13" fill="#e8d8c8">плитка = целое · 4 дольки</text>
          ${show? `<g class="c5pop" style="animation-delay:.4s"><rect x="150" y="44" width="140" height="48" rx="12" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.2"/>
            <text x="220" y="74" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">дольки — части плитки</text></g>`:''}
        </svg>`)+
        wkRow(show? wkBtn('сброс',`visW179Act('${lk}','rst')`) : wkBtn('разобрать плитку на дольки',`visW179Act('${lk}','go')`))+
        wkSml('одна целая плитка · дольки — это её части (дроби)'));
    } else if(step===1){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">3 из 4 долек = 3/4</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a2030"/>
          <g transform="translate(9,18)">${choc(4,3,{w:300,h:58})}</g>
          <text x="159" y="100" text-anchor="middle" font-size="14" fill="#e8d8c8">золотые дольки — взяли · тёмные — остались</text>
          <g class="c5pop" style="animation-delay:.5s"><rect x="60" y="112" width="198" height="44" rx="14" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
          ${fracSVG(100,136,3,4,'#8fd1a8',30)}
          <text x="159" y="142" text-anchor="middle" font-size="14" fill="#cfe0cf">3 меньше 4 — правильная!</text></g>
          <text x="159" y="162" text-anchor="middle" font-size="12.5" fill="#9ec0a8">числитель 3 &lt; знаменатель 4</text>
        </svg>`)+
        wkRow(sign('3/4 — меньше одной плитки',C5.green,0.5))+
        wkSml('5/8, 2/3, 7/10 — тоже правильные: всегда меньше 1'));
    } else if(step===2){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Правильная дробь на оси</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="160" fill="#2a2030"/>
          <text x="159" y="26" text-anchor="middle" font-size="13" fill="#e8d8c8">от 0 до 1</text>
          <line x1="36" y1="90" x2="282" y2="90" stroke="#cfe0cf" stroke-width="3.4"/>
          <g class="c5pop"><rect x="30" y="72" width="44" height="34" rx="8" fill="rgba(255,255,255,.05)" stroke="#4a6a54" stroke-width="2"/>
          <text x="52" y="94" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">0</text></g>
          <g class="c5pop" style="animation-delay:.15s"><rect x="238" y="72" width="44" height="34" rx="8" fill="rgba(255,255,255,.05)" stroke="#4a6a54" stroke-width="2"/>
          <text x="260" y="94" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">1</text></g>
          <g class="c5bump" style="animation-delay:.4s"><rect x="196" y="60" width="44" height="40" rx="9" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="218" y="86" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold">3/4</text></g>
          <text x="218" y="126" text-anchor="middle" font-size="13" fill="#cfe0cf">между 0 и 1 — меньше единицы!</text>
        </svg>`)+
        wkRow(sign('0 < правильная дробь < 1',C5.blue,0.5))+
        wkSml('3/4 = 0,75 · всегда строго между нулём и единицей'));
    } else if(step===3){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">7/4 — нужна вторая плитка!</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2a2030"/>
          <text x="159" y="22" text-anchor="middle" font-size="13" fill="#e8d8c8">семь долек · в плитке только четыре</text>
          <g transform="translate(6,30)">${choc(4,4,{w:144,h:40})}</g>
          <g class="c5slide" style="--sx:-120px;animation-delay:.3s"><g transform="translate(160,30)">${choc(4,3,{w:152,h:40})}</g></g>
          ${show? `<g class="c5pop" style="animation-delay:.6s"><rect x="40" y="88" width="238" height="42" rx="13" fill="rgba(255,138,138,.12)" stroke="#ff8a7a" stroke-width="2.2"/>
            ${fracSVG(80,110,7,4,'#ff9a8a',32)}
            <text x="159" y="115" text-anchor="middle" font-size="15" fill="#ffcfc2">7 больше 4 — неправильная!</text></g>
            <text x="159" y="150" text-anchor="middle" font-size="13" fill="#ffcfc2">числитель 7 &gt; знаменателя 4 → дробь больше 1</text>`:''}
        </svg>`)+
        (show? wkRow(sign('7/4 > 1',C5.red,0.6)): wkRow(wkBtn('показать, что плитки не хватает',`visW179Act('${lk}','go')`)))+
        wkSml('две плитки: целая + три дольки — больше единицы'));
    } else if(step===4){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">5/5 — ровно одна плитка</div>`+
        wkHero(`<svg viewBox="0 0 318 156" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="156" fill="#2a2030"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#e8d8c8">пять пятых = вся плитка = 1</text>
          <g transform="translate(34,36)">${choc(5,5,{w:250,h:52})}</g>
          ${show? `<g class="c5pop" style="animation-delay:.4s"><rect x="60" y="102" width="198" height="42" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
            <text x="159" y="129" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">5/5 = 1</text></g>`:''}
        </svg>`)+
        (show? wkRow(sign('9/9 = 1 · 12/12 = 1',C5.green,0.4)): wkRow(wkBtn('собрать плитку целиком',`visW179Act('${lk}','go')`)))+
        wkSml('числитель равен знаменателю — дробь равна единице'));
    } else if(step===5){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">7/4 = 1 целая и 3/4</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2a2030"/>
          <text x="159" y="22" text-anchor="middle" font-size="13" fill="#e8d8c8">разложим 7 долек по плиткам по 4</text>
          ${show? `<g class="c5pop"><rect x="20" y="44" width="120" height="64" rx="12" fill="rgba(255,255,255,.03)" stroke="#ffd76a" stroke-width="2"/>
            <text x="80" y="64" text-anchor="middle" font-size="13" fill="#ffe9c9">целая плитка</text>
            ${[0,1,2,3].map(i=>`<rect class="c5fall" style="animation-delay:${(0.1+i*0.1).toFixed(2)}s" x="${30+i*23}" y="74" width="18" height="26" rx="5" fill="#8a5a2e" stroke="#ffd76a" stroke-width="1.4"/>`).join('')}</g>`:''}
          ${show? `<g class="c5pop" style="animation-delay:.4s"><rect x="172" y="44" width="120" height="64" rx="12" fill="rgba(255,255,255,.03)" stroke="#4a6a54" stroke-width="2"/>
            <text x="232" y="64" text-anchor="middle" font-size="13" fill="#9ec0a8">осталось 3 дольки</text>
            ${[0,1,2].map(i=>`<rect class="c5fall" style="animation-delay:${(0.5+i*0.1).toFixed(2)}s" x="${184+i*24}" y="74" width="18" height="26" rx="5" fill="#6b4426" stroke="#8a5a2e" stroke-width="1.4"/>`).join('')}</g>`:''}
          ${show? `<g class="c5pop" style="animation-delay:.7s"><rect x="56" y="128" width="206" height="40" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
            ${mixedSVG(159,137,1,3,4,'#8fd1a8',26)}
            <text x="159" y="160" text-anchor="middle" font-size="0" fill="#fff"> </text></g>`:''}
        </svg>`)+
        (show? wkRow(sign('7/4 = 1 3/4',C5.green,0.7)): wkRow(wkBtn('разложить 7 долек по плиткам',`visW179Act('${lk}','go')`)))+
        wkSml('смешанное число: целая часть + дробная'));
    } else if(step===6){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Как найти целую часть: 7 : 4</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2a2030"/>
          <g class="c5pop"><rect x="24" y="26" width="120" height="64" rx="13" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2.2"/>
          ${fracSVG(84,48,7,4,'#fff',30)}
          <text x="84" y="80" text-anchor="middle" font-size="12" fill="#9ec0a8">делим 7 на 4</text></g>
          <g class="c5pop" style="animation-delay:.2s"><text x="180" y="66" text-anchor="middle" font-size="32" fill="#cfe0cf" font-weight="bold">→</text></g>
          ${show? `<g class="c5pop" style="animation-delay:.3s"><rect x="200" y="26" width="96" height="64" rx="13" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2.2"/>
            <text x="248" y="50" text-anchor="middle" font-size="15" fill="#ffe9c9">7 : 4 = 1</text>
            <text x="248" y="74" text-anchor="middle" font-size="15" fill="#ff9a8a">остаток 3</text></g>`:''}
          ${show? `<g class="c5pop" style="animation-delay:.5s"><rect x="40" y="112" width="238" height="46" rx="14" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
            <text x="159" y="132" text-anchor="middle" font-size="14" fill="#cfe0cf">частное 1 — целые плитки</text>
            <text x="159" y="150" text-anchor="middle" font-size="13" fill="#8fd1a8">остаток 3 — лишние дольки → 1 3/4</text></g>`:''}
        </svg>`)+
        (show? wkRow(sign('7/4 = 1 3/4',C5.green,0.6)): wkRow(wkBtn('поделить 7 на 4',`visW179Act('${lk}','go')`)))+
        wkSml('частное — целые · остаток — числитель дробной части'));
    } else if(step===7){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Обратно: 2 1/3 — сколько третей?</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2a2030"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#e8d8c8">две целые плитки по 3 трети + 1 треть</text>
          ${[0,1].map(k=>{const x=16+k*100; return `<g class="c5fall" style="animation-delay:${(k*0.15).toFixed(2)}s"><rect x="${x}" y="40" width="92" height="50" rx="10" fill="rgba(255,255,255,.02)" stroke="#7fd1ff" stroke-width="1.8"/>
            ${[0,1,2].map(j=>`<rect x="${x+6+j*28}" y="50" width="24" height="30" rx="6" fill="#8a5a2e" stroke="#7fd1ff" stroke-width="1.4"/>`).join('')}</g>`;}).join('')}
          <g class="c5fall" style="animation-delay:.35s"><rect x="228" y="40" width="72" height="50" rx="10" fill="rgba(255,255,255,.02)" stroke="#ffd76a" stroke-width="1.8"/>
          <rect x="234" y="50" width="24" height="30" rx="6" fill="#6b4426" stroke="#ffd76a" stroke-width="1.4"/></g>
          <text x="66" y="110" text-anchor="middle" font-size="13" fill="#9fc5e8">1-я плитка: 3 трети</text>
          <text x="166" y="110" text-anchor="middle" font-size="13" fill="#9fc5e8">2-я: 3 трети</text>
          <text x="264" y="110" text-anchor="middle" font-size="13" fill="#ffe9c9">+ 1 треть</text>
          ${show? `<g class="c5pop" style="animation-delay:.6s"><rect x="56" y="126" width="206" height="42" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
            <text x="159" y="154" text-anchor="middle" font-size="22" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">6 + 1 = 7 третей → 7/3</text></g>`:''}
        </svg>`)+
        (show? wkRow(sign('2 1/3 = 7/3',C5.green,0.7)): wkRow(wkBtn('посчитать трети',`visW179Act('${lk}','go')`)))+
        wkSml('2 плитки × 3 трети = 6 · плюс 1 = 7 третей'));
    } else if(step===8){
      const show=st.sh===1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Формула обратного перевода</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2a2030"/>
          <text x="159" y="30" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold" font-family="Georgia,serif">a b/c = (a · c + b) / c</text>
          ${show? `<g class="c5pop" style="animation-delay:.3s"><rect x="30" y="52" width="258" height="46" rx="13" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2.2"/>
            <text x="159" y="82" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">2 1/3 = (2·3 + 1)/3 = 7/3</text></g>`:''}
          ${show? `<g class="c5pop" style="animation-delay:.5s"><rect x="30" y="110" width="258" height="46" rx="13" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="2.2"/>
            <text x="159" y="140" text-anchor="middle" font-size="19" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">1 3/4 = (1·4 + 3)/4 = 7/4</text></g>`:''}
        </svg>`)+
        (show? wkRow(sign('обе формулы сошлись!',C5.green,0.6)): wkRow(wkBtn('проверить на примерах',`visW179Act('${lk}','go')`)))+
        wkSml('целое × знаменатель + числитель = новый числитель'));
    } else if(step===9){
      const pick=st.pick;
      const items=[
        {f:'3/4',a:0}, {f:'7/4',a:1}, {f:'5/5',a:2}, {f:'2/3',a:0}
      ];
      const cur=pick==null?0:pick;
      const T=items[cur%items.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр-определитель</div>`+
        wkHero(`<svg viewBox="0 0 318 120" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="120" fill="#2a2030"/>
          <text x="159" y="30" text-anchor="middle" font-size="15" fill="#e8d8c8">какая это дробь?</text>
          ${fracSVG(159,66,T.f.split('/')[0],T.f.split('/')[1],'#fff',46)}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW179T3('${lk}',0)">правильная</button>
          <button class="wk-btn" onclick="visW179T3('${lk}',1)">неправильная</button>
          <button class="wk-btn" onclick="visW179T3('${lk}',2)">ровно 1</button>
        </div>`+
        (st.ans!=null? (st.ans===T.a? `<div class="wk-ans" style="color:#8fd1a8">верно! ${T.f} — ${['правильная (меньше 1)','неправильная (больше 1)','ровно одно целое'][T.a]}</div>`+wkRow(wkBtn('следующая дробь',`visW179Act('${lk}','nx')`)) : `<div class="wk-ans" style="color:#ff8a7a">не так. Сравни числитель со знаменателем</div>`+wkRow(wkBtn('попробовать снова',`visW179Act('${lk}','again')`))) : '')+
        wkSml('числитель < знаменателя → правильная · > → неправильная · = → 1'));
    } else if(step===10){
      if(st.tr==null) st.tr=0;
      const POOL=[[11,4],[9,2],[13,5],[17,6],[7,3]];
      const [a,b]=POOL[st.tr%POOL.length];
      const q=Math.floor(a/b), r=a%b;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр: в смешанное число</div>`+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="140" fill="#2a2030"/>
          <g class="c5pop"><rect x="20" y="30" width="110" height="64" rx="13" fill="rgba(255,138,138,.08)" stroke="#ff8a7a" stroke-width="2.2"/>
          ${fracSVG(75,53,a,b,'#ff9a8a',34)}
          <text x="75" y="84" text-anchor="middle" font-size="11" fill="#ffcfc2">неправильная</text></g>
          ${st.s1? `<text class="c5pop" x="150" y="66" text-anchor="middle" font-size="28" fill="#8fd1a8" font-weight="bold">→</text>`:''}
          ${st.s1? `<g class="c5pop"><rect x="170" y="30" width="128" height="64" rx="13" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="234" y="52" text-anchor="middle" font-size="13" fill="#ffe9c9">${a} : ${b} = ${q}</text>
          <text x="234" y="78" text-anchor="middle" font-size="15" fill="#ff9a8a">остаток ${r}</text></g>`:''}
          ${st.s2? `<g class="c5pop" style="animation-delay:.15s"><rect x="90" y="106" width="140" height="26" rx="12" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="160" y="124" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">${q} ${r}/${b}</text></g>`:''}
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · сколько целых?',`visW179Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · записать смешанное',`visW179Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW179Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW179Act('${lk}','rst')`) : '')+
        wkSml('частное — целые плитки · остаток — дольки'));
    } else if(step===11){
      if(st.tr==null) st.tr=0;
      const POOL=[[2,1,3],[3,2,5],[4,1,4],[5,2,3],[1,3,4]];
      const [w,n,d]=POOL[st.tr%POOL.length];
      const num=w*d+n;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр: в неправильную дробь</div>`+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="140" fill="#2a2030"/>
          <g class="c5pop"><rect x="20" y="30" width="120" height="64" rx="13" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.2"/>
          ${mixedSVG(80,52,w,n,d,'#7fd1ff',34)}
          <text x="80" y="86" text-anchor="middle" font-size="11" fill="#9fc5e8">смешанное</text></g>
          ${st.s1? `<text class="c5pop" x="156" y="66" text-anchor="middle" font-size="28" fill="#8fd1a8" font-weight="bold">→</text>`:''}
          ${st.s1? `<g class="c5pop"><rect x="176" y="30" width="122" height="64" rx="13" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="237" y="52" text-anchor="middle" font-size="14" fill="#ffe9c9">${w}·${d} = ${w*d}</text>
          <text x="237" y="78" text-anchor="middle" font-size="15" fill="#ffd76a">+ ${n} = ${num}</text></g>`:''}
          ${st.s2? `<g class="c5pop" style="animation-delay:.15s"><rect x="90" y="106" width="140" height="26" rx="12" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
          ${fracSVG(160,120,num,d,'#8fd1a8',22)}</g>`:''}
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · целых × знаменатель',`visW179Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · + числитель',`visW179Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW179Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW179Act('${lk}','rst')`) : '')+
        wkSml('a b/c = (a·c + b)/c · знаменатель не меняется'));
    } else if(step===12){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ловушка: 4/4 = 1, а не больше</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a2030"/>
          <g transform="translate(24,26)">${choc(4,4,{w:270,h:52})}</g>
          <text x="159" y="98" text-anchor="middle" font-size="14" fill="#e8d8c8">взяли ВСЕ четыре дольки — это целая плитка!</text>
          <g class="c5pop" style="animation-delay:.4s"><rect x="60" y="112" width="198" height="42" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
          <text x="159" y="139" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">4/4 = 1 · 0/4 = 0</text></g>
        </svg>`)+
        wkSml('дробь с равными числителем и знаменателем равна 1 · ноль долек — 0'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: плитки и дольки</div>`+
        wkHero(`<svg viewBox="0 0 318 120" style="display:block;width:100%;height:auto">
          <g transform="translate(24,20)">${choc(4,4,{w:130,h:34})}</g>
          <g class="c5slide" style="--sx:-60px;animation-delay:.2s"><g transform="translate(160,20)">${choc(4,3,{w:136,h:34})}</g></g>
          <text x="159" y="86" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold" font-family="Georgia,serif">7/4 = 1 3/4</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('7 : 4 = 1 (ост. 3) · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[179]=visW179;
  function visW179T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW179T=visW179T;
  function visW179T3(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.ans=i; chRender(0);
  }
  window.visW179T3=visW179T3;
  function visW179Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
    if(act==='nx'){ st.pick=(st.pick==null?0:st.pick)+1; st.ans=null; }
    if(act==='again'){ st.ans=null; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW179Act=visW179Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===179){ window.ARH_LESSONS[i]=L179; break; } } })();
})();

/* ================= УРОК 13 · Чётность: суммы и произведения (v6, крупные SVG, больше слайдов) ================= */
(function(){
  if(!window.__wk13v6css){
    window.__wk13v6css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .e6in{animation:e6In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes e6In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .e6pop{animation:e6Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes e6Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .e6float{animation:e6Float 1.7s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes e6Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'+
      '#lvis .e6join{stroke-dasharray:8 7;animation:e6Join .9s linear infinite;}'+
      '@keyframes e6Join{to{stroke-dashoffset:-30}}'+
      '#lvis .e6bump{animation:e6Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes e6Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}';
    document.head.appendChild(st);
  }
  const L13 = {
    id: 13, title: 'Чётность: суммы и произведения', ico: '✦',
    src: 'Математика · Чёт и нечет: пары и «сироты»', subj: 'math',
    explain: [
      'Бал в Числовом королевстве: числа танцуют парами. Число 8 — это четыре пары: у него нет ни одного одинокого участника, поэтому 8 чётное. А число 9 — четыре пары и один лишний, которому не с кем танцевать: 9 нечётное. Чётность сразу отвечает на вопрос «можно ли раздать поровну?»',
      'Узнать чётность легко по последней цифре. Чётные числа кончаются на 0, 2, 4, 6 или 8. Нечётные — на 1, 3, 5, 7 или 9. Число 847 кончается на 7 — значит, оно нечётное. Смотреть на всё число не нужно, достаточно хвостика!',
      'Чёт + чёт = чёт: две компании пар танцуют вместе — снова получаются только пары, сирот нет. 2 + 4 = 6, 10 + 8 = 18. Сложение пар не создаёт одиноких участников.',
      'Чёт + нечёт = нечёт: к полным парам приходит одинокий гость — он так и остаётся один. 4 + 1 = 5, 10 + 7 = 17. Одинокая «сирота» не исчезает при сложении.',
      'Самое удивительное: нечёт + нечёт = чёт! У каждого нечётного числа есть своя «сирота». Две сироты знакомятся на балу и танцуют вместе — образуют пару! 3 + 5 = 8, 11 + 13 = 24.',
      'Вычитание ведёт себя так же: чёт − чёт = чёт, чёт − нечёт = нечёт, нечёт − нечёт = чёт. Минус не создаёт и не уничтожает сирот — он только уводит или добавляет пары.',
      'Умножение: если ХОТЯ БЫ ОДИН множитель чётный — произведение чётное. Пары «размножаются»: 2 · 4 = 8, 4 · 5 = 20, 6 · 9 = 54. Один чётный множитель делает всё произведение чётным.',
      'А если все множители нечётные — произведение нечётное: 3 · 3 = 9, 5 · 7 = 35. В сетке 3 × 3 клетки все разбиваются на пары, кроме одной лишней в углу — как сирота на балу.',
      'Число 0 — тоже чётное! Ноль участников — это ноль пар и ни одной сироты. Поэтому 0 делят на 2 без остатка, и правила «чёт + нечёт = нечёт» работают и с нулём: 0 + 1 = 1.',
      'У больших чисел чётность видна по последней цифре: 2024 кончается на 4 — чётное, а 2025 на 5 — нечётное. Даже семизначное число легко проверить одним взглядом на хвостик!',
      'Сумма 1 + 2 + … + 99 чётная: нечётных слагаемых ровно 50 (1, 3, …, 99), а 50 — чётное число. Произведение 1·2·3·…·100 тоже чётное: среди множителей есть двойка.',
      'Проверь себя: сумма 1 + 2 + … + 99 — чётная (нечётных 50). Произведение 1·2·…·100 — чётное (есть множитель 2). Ответь в тесте и жми «Понял! Проверю себя»!'
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
  const E={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',ivory:'#e8e0cc',mut:'#9ec0a8'};
  const EC=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff9a7a','#6fbf7a','#5aa0d8'];
  /* крупная сцена «пары и сирота»: n участников → пары с линией + сирота (n нечёт) */
  function party(n,opt){
    const o=opt||{};
    const W=o.w||318;
    const rr=Math.max(9, o.r||17);
    const gx=rr*2+5;
    const cols=Math.max(1,Math.min(o.cols||5,Math.floor((W-10)/gx)));
    const pN=Math.floor(n/2), odd=n%2;
    const per=Math.max(1,Math.ceil((pN+(odd?1:0))/cols));
    const gy=rr*2+3;
    const y0=o.y0||8;
    const H=y0+per*gy+rr+10;
    let s=''; let idx=0;
    for(let k=0;k<pN;k++){
      const col=idx%cols, row=Math.floor(idx/cols);
      const x0=Math.round((W-(cols*gx))/2)+col*gx;
      const cy=y0+row*gy+rr;
      s+=`<g class="e6pop" style="animation-delay:${(0.04+k*0.06).toFixed(2)}s">
        <circle cx="${x0}" cy="${cy}" r="${rr}" fill="${EC[(k*2)%EC.length]}"/>
        <circle cx="${x0+gx}" cy="${cy}" r="${rr}" fill="${EC[(k*2+1)%EC.length]}"/>
        <path d="M${x0+rr+2} ${cy} Q${x0+gx/2} ${cy+rr*0.8} ${x0+gx-rr-2} ${cy}" stroke="${E.gold}" stroke-width="3.2" fill="none" class="e6join"/>
      </g>`;
      idx++;
    }
    if(odd){
      const col=idx%cols, row=Math.floor(idx/cols);
      const x0=Math.round((W-(cols*gx))/2)+col*gx;
      const cy=y0+row*gy+rr;
      s+=`<g class="e6float" style="animation-delay:${(0.1+pN*0.06).toFixed(2)}s">
        <circle cx="${x0}" cy="${cy}" r="${rr+5}" fill="none" stroke="${E.red}" stroke-width="2.6" opacity=".7"/>
        <circle cx="${x0}" cy="${cy}" r="${rr}" fill="${E.red}"/>
      </g>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">${s}</svg>`;
  }
  /* блок-карточка: крупное число/надпись + строка-пояснение */
  function blk(big,cap,color,delay){
    const fs=String(big).length<=1?46:(String(big).length===2?34:26);
    return `<div class="e6in" style="animation-delay:${(delay||0).toFixed(2)}s;flex:1 1 0;min-width:0;text-align:center;border:2.5px solid ${color};border-radius:16px;padding:5px 4px 7px;background:rgba(255,255,255,.045)">
      <div style="font-size:11.5px;color:${color};font-weight:bold;letter-spacing:.02em;line-height:1.25">${cap}</div>
      <div style="font-size:${fs}px;color:#fff;font-weight:bold;font-family:Georgia,serif;line-height:1.15;margin:1px 0">${big}</div>
    </div>`;
  }
  const sign=(t,delay)=>`<span class="e6in" style="animation-delay:${(delay||0).toFixed(2)}s;flex:0 0 auto;font-size:28px;color:#cfe0cf;font-weight:bold;padding:0 1px">${t}</span>`;
  const Q13=[
    {q:'Нечёт + нечёт = ?',opts:['чётное','нечётное'],ans:0},
    {q:'Произведение 1·2·3·…·100 чётно?',opts:['да','нет'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q13[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?E.green:E.red; tc=i===T.ans?E.green:E.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:110px;font-size:18px" onclick="visW13T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! Множитель 2 делает всё чётным</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! Две «сироты» образовали пару</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:17px">Не так. У каждого нечётного числа есть одна «сирота»</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW13Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW13Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:12px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  const pill=(t,c,delay)=>`<span class="e6in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:7px 14px;border-radius:13px;border:2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:20px;color:${c};font-weight:bold">${t}</span>`;
  function visW13(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0&&st.n==null) st.n=9; if(step===8) st.zz=0; if(step===9&&st.big==null) st.big=0; if(step===10&&st.pick==null) st.pick=0; if(step===11){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      const n=st.n;
      h=wkFrame(wkBig('Бал чисел: пары и «сироты»')+
        wkHero(party(n,{w:318,r:16,cols:6}))+
        (n%2===0
          ? wkAns(n+' — чётное: только пары, ни одной «сироты»', E.green)
          : wkAns(n+' — нечётное: пары и одна «сирота»', E.red))+
        wkRow(wkBtn('− 1',`visW13Act('${lk}','m')`),wkBtn('+ 1',`visW13Act('${lk}','p')`),wkBtn('сброс',`visW13Act('${lk}','rst')`))+
        wkSml('8 — только пары · 9 — пары и одинокий кружок · покрути число кнопками'));
    } else if(step===1){
      const W=318, R=24, gx=R*2+7;
      const x0=Math.round((W-(5*gx))/2);
      const digitRow=(arr,color,off)=>{
        return arr.map((d,i)=>{
          const x=x0+i*gx;
          return `<g class="e6pop" style="animation-delay:${((off||0)+i*0.08).toFixed(2)}s">
            <circle cx="${x}" cy="44" r="${R}" fill="rgba(255,255,255,.05)" stroke="${color}" stroke-width="3.5"/>
            <text x="${x}" y="53" text-anchor="middle" font-size="31" fill="#fff" font-weight="bold" font-family="Georgia,serif">${d}</text>
          </g>`;
        }).join('');
      };
      h=wkFrame(wkBig('Последняя цифра всё расскажет')+
        wkHero(`<div style="font-size:13px;color:#8fd1a8;font-weight:bold;text-align:center;margin-bottom:2px">чётные кончаются на</div>`+
          `<svg viewBox="0 0 318 88" style="display:block;width:100%;height:auto">${digitRow([0,2,4,6,8],'#8fd1a8',0)}</svg>`+
          `<div style="font-size:13px;color:#ff8a7a;font-weight:bold;text-align:center;margin:10px 0 2px">нечётные кончаются на</div>`+
          `<svg viewBox="0 0 318 88" style="display:block;width:100%;height:auto">${digitRow([1,3,5,7,9],'#ff8a7a',0.35)}</svg>`+
          `<div class="e6in" style="animation-delay:.7s;margin-top:8px"><svg viewBox="0 0 318 96" style="display:block;width:100%;height:auto">
            <g class="e6pop" style="animation-delay:.75s"><rect x="78" y="18" width="52" height="60" rx="11" fill="rgba(255,255,255,.05)"/><text x="104" y="60" text-anchor="middle" font-size="38" fill="#b9cdc0" font-weight="bold" font-family="Georgia,serif">8</text></g>
            <g class="e6pop" style="animation-delay:.85s"><rect x="136" y="18" width="52" height="60" rx="11" fill="rgba(255,255,255,.05)"/><text x="162" y="60" text-anchor="middle" font-size="38" fill="#b9cdc0" font-weight="bold" font-family="Georgia,serif">4</text></g>
            <g class="e6bump" style="animation-delay:.95s"><rect x="194" y="14" width="56" height="68" rx="12" fill="rgba(232,106,90,.16)" stroke="#ff8a7a" stroke-width="4"/><text x="222" y="61" text-anchor="middle" font-size="42" fill="#ff8a7a" font-weight="bold" font-family="Georgia,serif">7</text></g>
          </svg></div>`)+
        wkRow(pill('847 → нечётное', E.red,1))+
        wkSml('смотри на последнюю цифру — остальное число считать не нужно'));
    } else if(step===2){
      h=wkFrame(wkBig('Чёт + чёт = чёт')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('4','чёт','#8fd1a8')}${sign('+',.12)}${blk('2','чёт','#7fd1ff',.2)}${sign('=',.32)}${blk('6','чёт','#ffd76a',.42)}
        </div>`)+
        wkHero(party(6,{w:318,r:14,cols:3,h:40,y0:6}))+
        wkRow(pill('2 + 4 = 6 · 10 + 8 = 18', E.green,0.5))+
        wkSml('две компании пар танцуют вместе — снова только пары, сирот нет'));
    } else if(step===3){
      h=wkFrame(wkBig('Чёт + нечёт = нечёт')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('4','чёт','#8fd1a8')}${sign('+',.12)}${blk('1','нечёт','#ff8a7a',.2)}${sign('=',.32)}${blk('5','нечёт','#ffd76a',.42)}
        </div>`)+
        wkHero(party(5,{w:318,r:15,cols:3,h:44,y0:6}))+
        wkRow(pill('4 + 1 = 5 · 10 + 7 = 17', E.red,0.5))+
        wkSml('одинокий гость приходит к парам и остаётся один — сумма нечётная'));
    } else if(step===4){
      h=wkFrame(wkBig('Нечёт + нечёт = чёт!')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('3','нечёт','#ff8a7a')}${sign('+',.12)}${blk('5','нечёт','#ff8a7a',.2)}${sign('=',.32)}${blk('8','чёт','#8fd1a8',.42)}
        </div>`)+
        wkHero(party(8,{w:318,r:13,cols:4,h:44,y0:6}))+
        wkRow(pill('3 + 5 = 8 · 11 + 13 = 24', E.green,0.5))+
        wkSml('две «сироты» знакомятся и образуют пару — сумма становится чётной'));
    } else if(step===5){
      const rows=[
        {t:'чёт − чёт', ex:'10 − 4 = 6', c:'#8fd1a8'},
        {t:'чёт − нечёт', ex:'10 − 3 = 7', c:'#ff8a7a'},
        {t:'нечёт − нечёт', ex:'9 − 3 = 6', c:'#8fd1a8'}
      ];
      const cards=rows.map((r,i)=>`<div class="e6in" style="animation-delay:${(i*0.16).toFixed(2)}s;flex:1 1 0;min-width:0;text-align:center;border:2.5px solid ${r.c};border-radius:14px;padding:7px 4px;background:rgba(255,255,255,.04)">
        <div style="font-size:12px;color:#e8dcc8;font-weight:bold">${r.t}</div>
        <div style="font-size:20px;color:${r.c};font-weight:bold;margin-top:3px;font-family:Georgia,serif">${r.ex}</div>
        <div style="font-size:11px;color:${r.c};margin-top:3px">${i===1?'сирота остаётся':'сирот нет'}</div>
      </div>`).join('');
      h=wkFrame(wkBig('Вычитание — то же самое')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">${cards}</div>`)+
        wkHero(party(6,{w:318,r:13,cols:3,h:40,y0:6}))+
        wkRow(pill('минус не создаёт «сирот»', E.gold,0.45))+
        wkSml('чёт − чёт = чёт · чёт − нечёт = нечёт · нечёт − нечёт = чёт'));
    } else if(step===6){
      h=wkFrame(wkBig('Умножение: один чётный — всё чётное')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('2 · 4','множители','#cfe0cf')}${sign('=',.15)}${blk('8','чёт','#ffd76a',.3)}
        </div>`)+
        wkHero(party(8,{w:318,r:13,cols:4,h:44,y0:6}))+
        wkRow(pill('2·4=8 · 4·5=20 · 6·9=54', E.green,0.4))+
        wkSml('пары «размножаются»: один чётный множитель делает произведение чётным'));
    } else if(step===7){
      h=wkFrame(wkBig('Все множители нечётные → нечёт')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('3 · 3','множители','#cfe0cf')}${sign('=',.15)}${blk('9','нечёт','#ff8a7a',.3)}
        </div>`)+
        wkHero(party(9,{w:318,r:14,cols:3,h:44,y0:6}))+
        wkRow(pill('3·3 = 9 · 5·7 = 35 — нечётные', E.red,0.4))+
        wkSml('все клетки разбились на пары, кроме одной «сироты» в углу'));
    } else if(step===8){
      h=wkFrame(wkBig('Число 0 — тоже чётное')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk('0','ноль пар','#8fd1a8')}${sign('+',.15)}${blk('10','чёт','#7fd1ff',.25)}${sign('=',.35)}${blk('10','чёт','#ffd76a',.45)}
        </div>`)+
        wkHero(party(10,{w:318,r:13,cols:5,h:40,y0:6}))+
        wkRow(pill('0 + 10 = 10 · чёт + чёт = чёт', E.green,0.45))+
        wkSml('0 участников — 0 пар и ни одной «сироты» · 0 делится на 2 нацело'));
    } else if(step===9){
      const bigs=[
        {n:'2024',last:4,odd:false},
        {n:'2025',last:5,odd:true},
        {n:'847',last:7,odd:true},
        {n:'1000',last:0,odd:false}
      ];
      const B=bigs[st.big||0];
      const ds=String(B.n).split('');
      const cw=76, gap=6;
      const W=ds.length*cw+(ds.length-1)*gap+12;
      const x0=6;
      let boxes='';
      ds.forEach((d,i)=>{
        const last=i===ds.length-1;
        const col=last?(B.odd?'#ff8a7a':'#8fd1a8'):'#4a6a54';
        boxes+=`<g class="e6pop" style="animation-delay:${(i*0.09).toFixed(2)}s">
          <rect x="${x0+i*(cw+gap)}" y="8" width="${cw}" height="66" rx="13" fill="${last?'rgba(255,255,255,.07)':'rgba(255,255,255,.03)'}" stroke="${col}" stroke-width="${last?4:2}"/>
          <text x="${x0+i*(cw+gap)+cw/2}" y="57" text-anchor="middle" font-size="46" fill="${last?(B.odd?'#ff8a7a':'#8fd1a8'):'#e8dcc8'}" font-weight="bold" font-family="Georgia,serif">${d}</text>
        </g>`;
      });
      h=wkFrame(wkBig('Большие числа — смотри на хвостик')+
        wkHero(`<svg viewBox="0 0 ${W} 82" style="display:block;width:100%;height:auto">${boxes}</svg>`)+
        (B.odd
          ? wkAns(String(B.n)+' кончается на '+B.last+' → нечётное', E.red)
          : wkAns(String(B.n)+' кончается на '+B.last+' → чётное', E.green))+
        wkRow(
          wkBtn('2024',`visW13Act('${lk}','b0')`),
          wkBtn('2025',`visW13Act('${lk}','b1')`),
          wkBtn('847',`visW13Act('${lk}','b2')`),
          wkBtn('1000',`visW13Act('${lk}','b3')`))+
        wkSml('чётные кончаются на 0, 2, 4, 6, 8 · нечётные — на 1, 3, 5, 7, 9'));
    } else if(step===10){
      const sum=st.pick===0;
      const rhythm = sum
        ? `<svg viewBox="0 0 318 46" style="display:block;width:100%;height:auto">${[1,2,3,4,5,6,7,8,9,10].map((d,i)=>{
            const odd=d%2===1;
            const x=Math.round((318-10*30)/2)+i*30;
            return `<g class="e6pop" style="animation-delay:${(i*0.05).toFixed(2)}s">
              <circle cx="${x}" cy="23" r="15" fill="${odd?'rgba(255,138,122,.15)':'rgba(143,209,168,.15)'}" stroke="${odd?'#ff8a7a':'#8fd1a8'}" stroke-width="2.6"/>
              <text x="${x}" y="29" text-anchor="middle" font-size="19" fill="${odd?'#ff8a7a':'#8fd1a8'}" font-weight="bold" font-family="Georgia,serif">${d}</text>
            </g>`;
          }).join('')}</svg>`
        : party(8,{w:318,r:13,cols:4,h:44,y0:6});
      h=wkFrame(wkBig('Длинные выражения — считаем чётность')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">
          ${blk(sum?'1+…+99':'1·2·…·100','выражение','#7fd1ff')}${sign('→',.2)}${blk(sum?'50':'2','нечётных / множитель','#ff8a7a',.3)}${sign('→',.4)}${blk(sum?'4950':'чётно','чётное','#8fd1a8',.5)}
        </div>`)+
        wkHero(rhythm)+
        (sum
          ? wkRow(pill('нечётных 50 (1, 3, …, 99) → сумма чётная', E.green,0.45))
          : wkRow(pill('среди множителей есть 2 → произведение чётное', E.green,0.45)))+
        wkRow(wkBtn('сумма 1…99',`visW13Act('${lk}','p0')`),wkBtn('произведение 1…100',`visW13Act('${lk}','p1')`))+
        wkSml('чётность длинного выражения решается по «сиротам», считать всё не нужно'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(party(8,{w:318,r:14,cols:4,h:44,y0:6}))+
        quiz(lk,st)+
        wkSml('нечётных от 1 до 99 — 50 (чётно) → сумма чётная · в 1·2·…·100 есть 2 → чётно'));
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
    if(act==='p') st.n=Math.min(12,(st.n==null?9:st.n)+1);
    if(act==='m') st.n=Math.max(1,(st.n==null?9:st.n)-1);
    if(act==='zz') st.zz=1;
    if(act==='b0'||act==='b1'||act==='b2'||act==='b3') st.big=+act.slice(1);
    if(act==='p0'||act==='p1') st.pick=+act.slice(1);
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW13Act=visW13Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===13){ window.ARH_LESSONS[i]=L13; break; } } })();
})();

/* ================= УРОК 83 · Пропорции (v1, игра «Лавка Архимеда») ================= */
(function(){
  if(!window.__wk83css){
    window.__wk83css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .p8in{animation:p8In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes p8In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .p8pop{animation:p8Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes p8Pop{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .p8flow{stroke-dasharray:8 6;animation:p8Flow .9s linear infinite;}'+
      '@keyframes p8Flow{to{stroke-dashoffset:-28}}';
    document.head.appendChild(st);
  }
  const L83 = {
    id: 83, title: 'Пропорции', ico: '≈',
    src: 'Математика · 5–6 класс · Пропорции и задачи', subj: 'math',
    explain: [
      'Лавка Архимеда, утро: 2 пакета сока стоят 40 рублей. Прибегает покупатель и просит 5 таких пакетов. Сколько он заплатит? Если пакетов больше в 2,5 раза — и цена вырастет во столько же раз. Такие задачи решает пропорция — сегодня ты научишься ей на всю жизнь.',
      'Начнём с «отношения»: это просто деление. Запись a : b читается «a относится к b» и показывает, во сколько раз a больше b. Пример: 6 пакетов и 2 пакета — 6 : 2 = 3, значит, пакетов в 3 раза больше. И денег тогда тоже нужно в 3 раза больше — это называется прямая пропорция: обе величины растут одинаково.',
      'Способ 1 — «через единицу». Сначала узнаём цену ОДНОГО пакета: 40 : 2 = 20 рублей. Теперь легко посчитать любую покупку: 5 пакетов — это 20 · 5 = 100 рублей, а 7 пакетов — 20 · 7 = 140 рублей. Цена одной штуки — ключ ко всем задачам такого типа.',
      'Способ 2 — «пропорция». Цена одного пакета не меняется, значит, отношения одинаковые: 2 пакета так относятся к 40 рублям, как 5 пакетов к неизвестной сумме x. Записываем: 2 : 40 = 5 : x. Это и есть пропорция — равенство двух отношений. Числа 2 и x — крайние члены, 40 и 5 — средние.',
      'Главное свойство пропорции: произведение КРАЙНИХ членов равно произведению СРЕДНИХ: a·d = b·c, если a : b = c : d. Проверим на нашей пропорции 2 : 40 = 5 : x: перемножим крест-накрест — 2 · x = 40 · 5. Оба произведения равны между собой.',
      'Находим x: 2 · x = 40 · 5 = 200. Значит, x = 200 : 2 = 100. Пять пакетов стоят 100 рублей! Сравни со способом 1: там мы получили 20 · 5 = 100. Оба пути ведут к одному ответу — пропорция работает.',
      'Потренируемся с ручками: 3 ручки стоят 45 рублей. Сколько стоят 5 таких ручек? Цена одной: 45 : 3 = 15. Пять ручек: 15 · 5 = 75. А пропорцией: 3 : 45 = 5 : x → 3x = 45·5 = 225 → x = 75. Ответ: 75 рублей!',
      'Пропорция вокруг нас: 3 кг яблок стоят 150 рублей — килограмм стоит 50, значит, 7 кг стоят 350. Поезд за 4 часа проехал 240 км — его скорость 60 км/ч, значит, за 6 часов он проедет 360 км. Везде один приём: найди «цену единицы» или составь пропорцию 3 : 150 = 7 : x.',
      'Проверь себя: 3 ручки стоят 45 рублей — сколько стоят 5 ручек? Цена одной 15, значит 5 ручек — 75. Ответь в тесте ниже и жми «Понял! Проверю себя»!'
    ],
    check: { q: '3 одинаковые ручки стоят 45 рублей. Сколько стоят 5 таких ручек?', choices: ['75', '60', '90'], ans: 0,
      exp: 'Одна ручка стоит 45 : 3 = 15 ₽, а пять ручек: 15 · 5 = 75 ₽ → 45 : 3 · 5 = 75.' },
    tasks: [
      { q: '3 кг яблок стоят 150 рублей. Сколько стоят 7 кг таких яблок?', kind: 'unit', ans: 350, tol: 0,
        hints: ['Один килограмм стоит 150 : 3 = 50 ₽.', 'Теперь умножь цену килограмма на 7.'], sol: '150 : 3 = 50 ₽ за килограмм; 50 · 7 = 350 ₽.' },
      { q: 'Поезд за 4 часа проехал 240 км. Сколько километров он проедет за 6 часов с той же скоростью?', kind: 'choice', choices: ['300', '360', '480'], ans: 1, tol: 0,
        hints: ['Скорость поезда: 240 : 4 = 60 км/ч.', 'За 6 часов: 60 · 6 = 360 км.'], sol: '240 : 4 = 60 км/ч; за 6 часов поезд проедет 60 · 6 = 360 км.' }
    ]
  };
  const P=['#e8a24e','#6fbf7a','#5aa0d8','#e8a0d8','#e08a55'];
  /* коробка-пакет сока */
  function carton(x,y,label,opt){
    const o=opt||{};
    const col=o.col||P[0];
    return `<g class="p8pop" style="${o.delay?'animation-delay:'+o.delay+'s':''}">
      <path d="M${x} ${y+44} L${x} ${y+16} L${x+6} ${y+8} L${x+18} ${y+4} L${x+30} ${y+8} L${x+36} ${y+16} L${x+36} ${y+44} Z" fill="${col}" stroke="#5d3a1f" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="${x+12}" y="${y+16}" width="12" height="22" rx="2" fill="rgba(255,255,255,.28)"/>
      ${o.big?`<text x="${x+18}" y="${y+52}" text-anchor="middle" font-size="15" fill="#ffe9c9" font-weight="bold">${label}</text>`:`<text x="${x+18}" y="${y+34}" text-anchor="middle" font-size="12" fill="#fff" font-weight="bold">${label}</text>`}
    </g>`;
  }
  /* купюра */
  function bill(x,y,txt,opt){
    const o=opt||{};
    return `<g class="p8pop" style="${o.delay?'animation-delay:'+o.delay+'s':''}">
      <rect x="${x}" y="${y}" width="46" height="24" rx="5" fill="${o.col||'#7fae8f'}" stroke="#33553f" stroke-width="1.4"/>
      <rect x="${x+3}" y="${y+3}" width="40" height="18" rx="3" fill="none" stroke="rgba(255,255,255,.5)" stroke-dasharray="3 2"/>
      <text x="${x+23}" y="${y+17}" text-anchor="middle" font-size="13" fill="#fff" font-weight="bold">${txt}</text>
    </g>`;
  }
  const cap=(t,c)=>`<div style="font-size:13.5px;color:${c||'#d8c9a8'};text-align:center;font-weight:bold;line-height:1.4">${t}</div>`;
  const Q83=[
    {q:'3 ручки стоят 45 ₽. Сколько стоят 5 ручек?',opts:['75 ₽','60 ₽','90 ₽'],ans:0},
    {q:'3 кг яблок стоят 150 ₽. Сколько стоят 7 кг?',opts:['300 ₽','350 ₽','400 ₽'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q83[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?'#8fd1a8':'#ff8a7a'; tc=i===T.ans?'#8fd1a8':'#ff8a7a'; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:86px;font-size:16px" onclick="visW83T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 150 : 3 = 50, затем 50 · 7 = 350</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 45 : 3 = 15, затем 15 · 5 = 75</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сначала цена одной штуки, потом умножь на количество</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW83Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW83Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:12px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW83(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0){ st.guess=-1; } if(step===6||step===7){ st.r=0; } if(step===8){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      if(st.guess==null) st.guess=-1;
      h=wkFrame(wkBig('Лавка Архимеда: утренний покупатель')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="88" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">2 пакета = 40 ₽</text>
          ${carton(44,38,'2',{delay:0})}${carton(88,38,'',{delay:.1})}
          ${bill(140,44,'40 ₽',{delay:.2})}
          <path class="p8flow" d="M64 104 C 150 122, 180 122, 256 100" fill="none" stroke="#ffd76a" stroke-width="3"/>
          <text x="252" y="24" text-anchor="middle" font-size="12.5" fill="#ffdfa0">5 пакетов = ?</text>
          ${carton(252,56,'5',{delay:.3,col:P[1],big:true})}
                  </svg>`)+
        wkRow(wkBtn('80 ₽',`visW83Act('${lk}','g80')`),wkBtn('100 ₽',`visW83Act('${lk}','g100')`),wkBtn('120 ₽',`visW83Act('${lk}','g120')`))+
        (st.guess===100? wkAns('Верно! Сегодня ты узнаешь, как посчитать точно', '#8fd1a8')
          : st.guess>100? wkAns('Многовато: 5 пакетов — это в 2,5 раза больше, чем 2', '#ffdfa0')
          : st.guess>0? wkAns('Слишком мало: пакетов больше чем вдвое — и цена больше', '#ffdfa0') : '')+
        wkSml('если пакетов больше в 2,5 раза — цена вырастет во столько же раз'));
    } else if(step===1){
      h=wkFrame(wkBig('Отношение: во сколько раз больше?')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="88" y="26" text-anchor="middle" font-size="12.5" fill="#9ec0a8">было: 2 пакета</text>
          ${carton(56,46,'2',{col:P[0]})}${carton(96,46,'',{col:P[0],delay:.08})}
          <text x="161" y="96" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">×3</text>
          <text x="246" y="26" text-anchor="middle" font-size="12.5" fill="#9ec0a8">стало: 6 пакетов</text>
          ${[0,1,2,3,4,5].map(i=>carton(196+i*18,50,'',{col:P[1],delay:.15+i*0.05})).join('')}
          <text x="246" y="118" text-anchor="middle" font-size="14" fill="#8fd1a8" font-weight="bold">6 : 2 = 3</text>
        </svg>`)+
        wkRow(wkPill('a : b — «a относится к b»', '#7fd1ff'))+
        wkSml('пакетов в 3 раза больше — значит, и цена будет в 3 раза больше. Это прямая пропорция'));
    } else if(step===2){
      h=wkFrame(wkBig('Способ 1: цена одной штуки')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">40 ₽ за 2 пакета → один пакет стоит?</text>
          ${carton(34,52,'2',{col:P[0]})}${carton(76,52,'',{col:P[0],delay:.08})}
          ${bill(118,58,'40 ₽',{delay:.12})}
          <text x="186" y="94" text-anchor="middle" font-size="28" fill="#cfe0cf" font-weight="bold">=</text>
          <text x="252" y="94" text-anchor="middle" font-size="28" fill="#8fd1a8" font-weight="bold">20 ₽</text>
          <text x="161" y="126" text-anchor="middle" font-size="13.5" fill="#8fd1a8" font-weight="bold">40 : 2 = 20 рублей за пакет</text>
        </svg>`)+
        wkSml('зная цену одной штуки, посчитаешь любую покупку: 5 пакетов — 20 · 5 = 100'));
    } else if(step===3){
      h=wkFrame(wkBig('Способ 2: записываем пропорцию')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">цена пакета не меняется → отношения равны</text>
          <g class="p8pop"><text x="70" y="58" text-anchor="middle" font-size="34" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">2</text>
            <text x="70" y="86" text-anchor="middle" font-size="12" fill="#9ec0a8">крайний</text>
            <line x1="46" y1="66" x2="94" y2="66" stroke="#3d5c49" stroke-width="2"/>
            <text x="70" y="124" text-anchor="middle" font-size="34" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">40</text></g>
          <text x="118" y="102" text-anchor="middle" font-size="26" fill="#cfe0cf" font-weight="bold">=</text>
          <g class="p8pop" style="animation-delay:.15s"><text x="170" y="58" text-anchor="middle" font-size="34" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">5</text>
            <text x="170" y="86" text-anchor="middle" font-size="12" fill="#9ec0a8">средний</text>
            <line x1="146" y1="66" x2="194" y2="66" stroke="#3d5c49" stroke-width="2"/>
            <text x="170" y="124" text-anchor="middle" font-size="34" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">x</text></g>
          <g class="p8pop" style="animation-delay:.3s"><text x="248" y="92" text-anchor="middle" font-size="24" fill="#8fd1a8" font-weight="bold">пропорция</text><text x="248" y="112" text-anchor="middle" font-size="12" fill="#9ec0a8">2:40 = 5:x</text></g>
        </svg>`)+
        wkRow(wkPill('крайние: 2 и x', '#7fd1ff'),wkPill('средние: 40 и 5', '#ffd76a'))+
        wkSml('равенство двух отношений называется пропорцией'));
    } else if(step===4){
      h=wkFrame(wkBig('Главное свойство: крест-накрест')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="70" y="44" text-anchor="middle" font-size="36" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">2</text>
          <text x="70" y="86" text-anchor="middle" font-size="36" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">40</text>
          <text x="161" y="70" text-anchor="middle" font-size="26" fill="#cfe0cf" font-weight="bold">=</text>
          <text x="252" y="44" text-anchor="middle" font-size="36" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">5</text>
          <text x="252" y="86" text-anchor="middle" font-size="36" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">x</text>
          <path class="p8flow" d="M76 50 C 160 20, 200 20, 246 40" fill="none" stroke="#ff8a7a" stroke-width="3"/>
          <path class="p8flow" d="M246 96 C 190 120, 120 120, 76 94" fill="none" stroke="#8fd1a8" stroke-width="3"/>
          <text x="70" y="132" text-anchor="middle" font-size="11" fill="#ff9a8a">2 · x</text>
          <text x="252" y="132" text-anchor="middle" font-size="11" fill="#8fd1a8">40 · 5</text>
        </svg>`)+
        wkRow(wkPill('2 · x = 40 · 5', '#ffd76a'))+
        wkSml('произведение крайних равно произведению средних: a·d = b·c'));
    } else if(step===5){
      h=wkFrame(wkBig('Находим x')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="28" text-anchor="middle" font-size="13" fill="#9ec0a8">2 · x = 200 → x = 200 : 2</text>
          <g class="p8pop"><rect x="70" y="44" width="70" height="50" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/><text x="105" y="75" text-anchor="middle" font-size="26" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">2x=200</text></g>
          <g class="p8pop" style="animation-delay:.25s"><text x="180" y="74" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">→</text></g>
          <g class="p8pop" style="animation-delay:.4s"><rect x="200" y="44" width="100" height="50" rx="12" fill="rgba(217,164,65,.14)" stroke="#ffd76a" stroke-width="2.8"/><text x="250" y="75" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">x=100</text></g>
          
        </svg>`)+
        wkSml('в пропорции 2:40 = 5:x неизвестное x = 40·5 : 2 = 100'));
    } else if(step===6){
      if(st.r==null) st.r=0;
      const show=st.r;
      h=wkFrame(wkBig('Ручки: 3 штуки за 45 ₽')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="6" y="6" width="310" height="138" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">сколько стоят 5 таких ручек?</text>
          ${[0,1,2].map(i=>pen(36+i*52,44,'',{delay:i*0.06})).join('')}
          ${bill(180,52,'45 ₽',{delay:.2})}
          ${show>=1?`<g class="p8in"><text x="200" y="112" text-anchor="middle" font-size="12" fill="#ffdfa0">одна ручка: 45 : 3 = 15</text></g>`:''}
          ${show>=1?`${[0,1,2,3,4].map(i=>pen(18+i*44,96,'',{col:P[1],delay:.3+i*0.06})).join('')}`:''}
          ${show>=2?`<g class="p8in"><text x="268" y="130" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">15 · 5 = 75 ₽</text></g>`:''}
        </svg>`)+
        wkRow(wkBtn('шаг 1: цена одной ручки',`visW83Act('${lk}','r1')`),wkBtn('шаг 2: цена пяти',`visW83Act('${lk}','r2')`),wkBtn('сброс',`visW83Act('${lk}','rst')`))+
        wkSml('45 : 3 = 15 за ручку · 15 · 5 = 75 за пять'));
    } else if(step===7){
      if(st.r==null) st.r=0;
      const show=st.r;
      const examples=[
        ['3 кг яблок — 150 ₽','килограмм: 150:3 = 50 ₽','7 кг: 50·7 = 350 ₽'],
        ['поезд: 4 ч — 240 км','за час: 240:4 = 60 км','6 ч: 60·6 = 360 км']
      ];
      const ex=examples[(st.i||0)%2];
      h=wkFrame(wkBig('Пропорция вокруг нас')+
        wkHero(`<svg width="322" height="130" viewBox="0 0 322 130" style="display:block">
          <rect x="6" y="6" width="310" height="118" rx="20" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="26" text-anchor="middle" font-size="12.5" fill="#9ec0a8">${ex[0]}</text>
          ${show>=1?`<g class="p8in"><text x="161" y="56" text-anchor="middle" font-size="15" fill="#ffdfa0">${ex[1]}</text></g>`:''}
          ${show>=2?`<g class="p8in"><text x="161" y="88" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold">${ex[2]}</text></g>`:''}
        </svg>`)+
        wkRow(wkBtn('шаг 1: цена единицы',`visW83Act('${lk}','r1')`),wkBtn('шаг 2: ответ',`visW83Act('${lk}','r2')`),wkBtn('новый пример',`visW83Act('${lk}','n')`),wkBtn('сброс',`visW83Act('${lk}','rst')`))+
        wkSml('везде один приём: найди цену единицы (или составь пропорцию)'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(`<svg width="322" height="86" viewBox="0 0 322 86" style="display:block">
          <text x="161" y="24" text-anchor="middle" font-size="13" fill="#9ec0a8">3 ручки = 45 ₽ · 5 ручек = ?</text>
          <text x="60" y="62" text-anchor="middle" font-size="30" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">3</text>
          <text x="161" y="62" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">→</text>
          <text x="262" y="62" text-anchor="middle" font-size="30" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">5</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('45 : 3 = 15 за одну · 15 · 5 = 75 за пять'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
    function pen(x,y,label,opt){
      const o=opt||{};
      const col=o.col||'#e0523d';
      return `<g class="p8pop" style="${o.delay?'animation-delay:'+o.delay+'s':''}">
        <rect x="${x}" y="${y+2}" width="34" height="8" rx="4" fill="${col}" stroke="#7a2a1c" stroke-width="1.2"/>
        <path d="M${x} ${y+6} L${x-8} ${y+6} L${x-4} ${y+12} L${x+2} ${y+8} Z" fill="${col}" stroke="#7a2a1c" stroke-width="1.1"/>
        <path d="M${x+34} ${y+6} L${x+42} ${y+3} L${x+44} ${y+11} Z" fill="#f2e8d0" stroke="#7a2a1c" stroke-width="1.1"/>
        <text x="${x+17}" y="${y+30}" text-anchor="middle" font-size="10" fill="#cfe0cf">${label||''}</text>
      </g>`;
    }
  }
  window.VISKW[83]=visW83;
  function visW83T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW83T=visW83T;
  function visW83Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='g80') st.guess=80;
    if(act==='g100') st.guess=100;
    if(act==='g120') st.guess=120;
    if(act==='r1') st.r=1;
    if(act==='r2') st.r=2;
    if(act==='n'){ st.i=(st.i||0)+1; st.r=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW83Act=visW83Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===83){ window.ARH_LESSONS[i]=L83; break; } } })();
})();
/* ================= УРОК 173 · Степень: квадрат и куб числа (v1, без эмодзи) ================= */
(function(){
  if(!window.__wk173css){
    window.__wk173css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .k2in{animation:k2In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes k2In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .k2pop{animation:k2Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes k2Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.05);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .k2flow{stroke-dasharray:7 6;animation:k2Flow .8s linear infinite;}'+
      '@keyframes k2Flow{to{stroke-dashoffset:-26}}'+
      '#lvis .k2tile{animation:k2Pop .5s ease both;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1.5px solid #4a6a54;border-radius:12px;cursor:pointer;padding:6px 4px 5px;min-width:44px;transition:border-color .15s}'+
      '#lvis .k2tile.on{border-color:#ffd76a;background:rgba(217,164,65,.12)}';
    document.head.appendChild(st);
  }
  const L173 = {
    id: 173, title: 'Степень: квадрат и куб числа', ico: '²',
    src: 'Математика · 5 класс · Степень', subj: 'math',
    explain: [
      'Квадрат числа — это число, умноженное само на себя: 5² = 5 · 5 = 25. Маленькая двойка говорит: «возьми число два раза». Покрути основание и посмотри, как растёт квадрат.',
      'Куб числа — число, взятое три раза: 2³ = 2 · 2 · 2 = 8. Два этажа по четыре кубика — вот и весь объём.',
      'Почему так называются? 5² — это площадь квадрата со стороной 5, а 2³ — объём куба с ребром 2. Квадрат отвечает за площадь, куб — за объём.',
      'Сначала возводим в степень, потом складываем: 3² + 2² = 9 + 4 = 13. Нельзя сложить 3 + 2 = 5 и потом возводить — степень сильнее сложения.',
      'Ловушка: 2³ — это не 2 · 3 = 6! Куб берёт число три раза: 2 · 2 · 2 = 8. Показатель 3 означает, сколько раз число умножается само на себя.',
      'Совет Архимеда: запиши степень развёрнуто и перемножь по шагам: 5² = 5 · 5 = 25. Так легко найти и 6², и любую другую степень.',
      'Квадраты удобно помнить наизусть: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, 6² = 36. Нажми на плитку и посмотри, как число «квадратится».',
      'Степени десятки — это просто нули: 10² = 100 (два нуля), 10³ = 1000 (три нуля). Приписывай нулей столько, сколько показывает степень.',
      'Проверь себя: чему равен квадрат 5 (5²) и куб 2 (2³)? Ответь на оба вопроса — и жми «Понял! Проверю себя».'
    ],
    check: { q: 'Чему равен квадрат числа 5 (5²)?', choices: ['10', '20', '25'], ans: 2,
      exp: '5² = 5 · 5 = 25.' },
    tasks: [
      { q: 'Чему равен куб числа 2 (2³)?', kind: 'unit', ans: 8, tol: 0,
        hints: ['Куб — число взятое три раза.', '2 · 2 · 2 = 8.'], sol: '2³ = 2 · 2 · 2 = 8.' },
      { q: 'Чему равно 3² + 2²?', kind: 'choice', choices: ['10', '13', '25'], ans: 1, tol: 0,
        hints: ['Сначала степени: 3² = 9, 2² = 4.', '9 + 4 = 13.'], sol: '3² = 9, 2² = 4, 9 + 4 = 13.' }
    ]
  };
  const G2={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',cream:'#f2e7c9'};
  const BC2=['#e8b34b','#6fbf7a','#5aa0d8','#d98ab0','#e08a55'];
  /* сетка n×n квадратиков (SVG): квадрат числа */
  function sqGrid(n,opt){
    const o=opt||{};
    const W=o.w||318;
    const cell=o.cell||Math.min(34,Math.floor((W-22)/n));
    const gap=2, x0=Math.round((W-(n*cell+(n-1)*gap))/2), y0=o.y0||12;
    let s='';
    for(let r=0;r<n;r++)for(let c=0;c<n;c++){
      const i=r*n+c;
      s+=`<rect class="k2pop" style="animation-delay:${(o.d0||0.02+i*0.018).toFixed(2)}s" x="${x0+c*(cell+gap)}" y="${y0+r*(cell+gap)}" width="${cell}" height="${cell}" rx="${Math.max(2,cell*0.12)}" fill="${BC2[(i%BC2.length)]}" opacity=".95"/>`;
    }
    const h=y0+n*(cell+gap)+4;
    return o.pct
      ? `<svg viewBox="0 0 ${W} ${h}" style="display:block;width:100%;height:auto">${s}</svg>`
      : `<svg width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" style="display:block">${s}</svg>`;
  }
  /* два этажа по 2×2 кубика = 2³ (вид с лёгким смещением верхнего этажа) */
  function cubeLayers(opt){
    const o=opt||{};
    const W=o.w||318, s=o.s||30;
    const x0=Math.round((W- (s*2+ (o.shift||8) ))/2), yTop=o.yTop||26;
    const bot=[];
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){
      bot.push(`<rect class="k2pop" style="animation-delay:${(0.05+(r*2+c)*0.08).toFixed(2)}s" x="${x0+c*(s+3)}" y="${yTop+s-4+(r)*(s+3)}" width="${s}" height="${s}" rx="4" fill="#c98f2e" stroke="#6f4f14" stroke-width="1.6"/>`);
    }
    const sh=o.shift||8, up=[];
    for(let r=0;r<2;r++)for(let c=0;c<2;c++){
      up.push(`<rect class="k2pop" style="animation-delay:${(0.35+(r*2+c)*0.08).toFixed(2)}s" x="${x0-sh+c*(s+3)}" y="${yTop-s+sh+r*(s+3)}" width="${s}" height="${s}" rx="4" fill="${o.topCol||'#ffd76a'}" stroke="#8a5f16" stroke-width="1.6"/>`);
    }
    const h=yTop+2*(s+3)+8;
    return o.pct
      ? `<svg viewBox="0 0 ${W} ${h}" style="display:block;width:100%;height:auto">${bot.join('')}${up.join('')}</svg>`
      : `<svg width="${W}" height="${h}" viewBox="0 0 ${W} ${h}" style="display:block">${bot.join('')}${up.join('')}</svg>`;
  }
  const cap2=(t,c)=>`<div style="font-size:13.5px;color:${c||'#d8c9a8'};text-align:center;font-weight:bold;line-height:1.4">${t}</div>`;
  const pill2=(t,c,delay)=>`<span class="k2in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:5px 13px;border-radius:13px;border:2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:21px;color:${c};font-weight:bold">${t}</span>`;
  const num2=(t,c)=>`<span style="display:inline-block;min-width:46px;text-align:center;font-family:Georgia,serif;font-size:40px;color:${c||'#ffd76a'};font-weight:bold;line-height:1">${t}</span>`;
  const Q173=[
    {q:'Чему равен квадрат числа 5, то есть 5²?',opts:['10','20','25'],ans:2},
    {q:'Чему равен куб числа 2, то есть 2³?',opts:['4','6','8'],ans:2}
  ];
  function quiz(lk,st){
    const T=Q173[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?G2.green:G2.red; tc=i===T.ans?G2.green:G2.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:70px;font-size:18px" onclick="visW173T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 2 · 2 · 2 = 8 — не путай с 2 · 3 = 6</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 5 · 5 = 25 — двойка сверху значит «два раза»</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Степень — число, умноженное само на себя нужное число раз</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW173Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW173Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:12px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW173(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0||step===5){ st.n=5; } if(step===6){ if(st.tile==null) st.tile=3; } if(step===7){ st.ten=2; } if(step===8){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      const n=st.n||5;
      h=wkFrame(wkBig('Квадрат: число умножаем само на себя')+
        wkHero(sqGrid(n))+
        wkRow(pill2(n+'² = '+n+' · '+n+' = '+(n*n), G2.gold,0.25))+
        wkRow(wkBtn('− 1',`visW173Act('${lk}','dec')`),wkBtn('+ 1',`visW173Act('${lk}','inc')`))+
        wkSml('сторона '+n+' — квадрат из '+n*n+' клеток: ровно столько, сколько даёт '+n+'²'));
    } else if(step===1){
      h=wkFrame(wkBig('Куб: число берём три раза')+
        wkHero(cubeLayers({w:318,s:32,shift:10,yTop:44,topCol:'#ffd76a'}))+
        wkRow(pill2('2³ = 2 · 2 · 2 = 8', G2.gold,0.4))+
        wkAns('нижний этаж 2×2 = 4 и верхний 2×2 = 4 — всего 8', G2.green)+
        wkSml('показатель 3 — сколько раз умножаем: 2 · 2 · 2, а не 2 · 3'));
    } else if(step===2){
      h=wkFrame(wkBig('Почему «квадрат» и «куб»?')+
        `<div class="wk-row" style="gap:8px;align-items:stretch">
          <div class="k2in" style="flex:1 1 128px;min-width:0;text-align:center;border:1.5px solid #4a6a54;border-radius:14px;padding:6px 6px 8px">
            <div style="font-size:12px;color:#9ec0a8;margin-bottom:2px">площадь 5²</div>${sqGrid(5,{w:150,cell:18,y0:8,pct:1})}
            <div style="font-size:20px;color:#ffd76a;font-weight:bold;margin-top:2px">= 25</div></div>
          <div class="k2in" style="animation-delay:.15s;flex:1 1 128px;min-width:0;text-align:center;border:1.5px solid #4a6a54;border-radius:14px;padding:6px 4px 8px">
            <div style="font-size:12px;color:#9ec0a8;margin-bottom:2px">объём 2³</div>${cubeLayers({w:150,s:15,shift:5,yTop:22,topCol:'#8fd1a8',pct:1})}
            <div style="font-size:20px;color:#8fd1a8;font-weight:bold;margin-top:2px">= 8</div></div>
        </div>`+
        wkSml('5² — площадь квадрата со стороной 5 · 2³ — объём куба с ребром 2'));
    } else if(step===3){
      h=wkFrame(wkBig('Сначала степень, потом сложение')+
        `<div class="wk-row" style="gap:8px;align-items:center">
          <div class="k2in" style="text-align:center;flex:0 1 120px;min-width:0"><div style="font-size:13px;color:#ffd76a;font-weight:bold">3² = 9</div>${sqGrid(3,{w:120,cell:18,y0:6,pct:1})}</div>
          <span class="k2in" style="animation-delay:.12s;font-size:24px;color:#cfe0cf;font-weight:bold">+</span>
          <div class="k2in" style="animation-delay:.2s;text-align:center;flex:0 1 120px;min-width:0"><div style="font-size:13px;color:#7fd1ff;font-weight:bold">2² = 4</div>${sqGrid(2,{w:120,cell:18,y0:16,pct:1})}</div>
        </div>`+
        wkHero(`<svg width="318" height="34" viewBox="0 0 318 34" style="display:block"><line class="k2flow" x1="120" y1="17" x2="198" y2="17" stroke="#ffd76a" stroke-width="3"/></svg>`)+
        `<div class="wk-row">${num2('9','#ffd76a')}<span class="k2in" style="animation-delay:.3s;font-size:26px;color:#cfe0cf;font-weight:bold">+</span>${num2('4','#7fd1ff')}<span class="k2in" style="animation-delay:.4s;font-size:26px;color:#cfe0cf;font-weight:bold">=</span>${num2('13','#8fd1a8')}</div>`+
        wkSml('сначала возвели в степень (9 и 4), потом сложили — как в выражении 3² + 2²'));
    } else if(step===4){
      const chosen=st.sel!=null;
      h=wkFrame(wkBig('Ловушка: 2³ — это не 6!')+
        (chosen
          ? (st.sel===1
              ? wkHero(cubeLayers({w:318,s:26,shift:8,yTop:34,topCol:'#8fd1a8'}))
              : `<div class="wk-row" style="gap:10px;align-items:center">
                  <span class="k2in" style="display:inline-block;padding:8px 14px;border:2.5px solid #ff8a7a;border-radius:14px;font-size:22px;color:#ff8a7a;font-weight:bold">2·3 = 6</span>
                  <span class="k2in" style="animation-delay:.15s;font-size:24px;color:#cfe0cf;font-weight:bold">≠</span>
                  <span class="k2in" style="animation-delay:.3s;display:inline-block;padding:8px 14px;border:2.5px solid #8fd1a8;border-radius:14px;font-size:22px;color:#8fd1a8;font-weight:bold">2·2·2 = 8</span></div>`)
          : wkHero(`<svg width="318" height="120" viewBox="0 0 318 120" style="display:block">
              <text x="70" y="74" text-anchor="middle" font-size="56" fill="#ffd76a" font-weight="bold">2³</text>
              <rect class="k2pop" x="140" y="22" width="150" height="78" rx="14" fill="rgba(255,255,255,.04)" stroke="#3d5c49"/>
              <text x="215" y="74" text-anchor="middle" font-size="48" fill="#cfe0cf" font-weight="bold">?</text></svg>`))+
        (chosen
          ? (st.sel===1
              ? wkAns('Верно! 2 · 2 · 2 = 8 — показатель говорит, сколько раз умножаем', G2.green)
              : wkAns('Нет: 6 — это 2 · 3. А куб — 2 · 2 · 2 = 8', G2.red))
          : wkNote('Чему равно 2³? Выбери верный вариант','#cfe0cf'))+
        (chosen
          ? wkRow(wkBtn('заново',`visW173Act('${lk}','rst')`))
          : wkRow(wkBtn('6',`visW173T('${lk}',0)`),wkBtn('8',`visW173T('${lk}',1)`)))+
        wkSml('показатель 3 — это количество множителей, а не «умножить на 3»'));
    } else if(step===5){
      const n=st.n||5;
      const prod=[];
      for(let i=0;i<2;i++) prod.push(`<span class="k2pop" style="animation-delay:${(0.15+i*0.15).toFixed(2)}s;display:inline-flex;align-items:center;justify-content:center;min-width:52px;height:52px;border:3px solid #ffd76a;border-radius:14px;font-family:Georgia,serif;font-size:30px;color:#fff;font-weight:bold">${n}</span>`);
      h=wkFrame(wkBig('Совет: запиши развёрнуто')+
        wkRow(pill2(n+'²', G2.blue,0))+
        wkHero(`<svg width="318" height="26" viewBox="0 0 318 26" style="display:block"><line x1="120" y1="13" x2="198" y2="13" stroke="#ffd76a" stroke-width="3" stroke-dasharray="8 6" class="k2flow"/></svg>`)+
        `<div class="wk-row">${prod.join('')}</div>`+
        wkHero(`<svg width="318" height="26" viewBox="0 0 318 26" style="display:block"><line x1="120" y1="13" x2="198" y2="13" stroke="#ffd76a" stroke-width="3" stroke-dasharray="8 6" class="k2flow" style="animation-delay:.3s"/></svg>`)+
        num2(n*n, G2.green)+
        wkRow(wkBtn('− 1',`visW173Act('${lk}','dec')`),wkBtn('+ 1',`visW173Act('${lk}','inc')`))+
        wkSml('разверни степень в умножение: '+n+' · '+n+' = '+n*n+' — так не запутаешься'));
    } else if(step===6){
      const tiles=[1,2,3,4,5,6].map(n=>{
        const on=st.tile===n;
        return `<button class="k2tile ${on?'on':''}" onclick="visW173Act('${lk}','t${n}')" style="animation-delay:${(0.05+n*0.06).toFixed(2)}s">
          <div style="font-size:15px;color:#e8dcc8;font-weight:bold">${n}²</div>
          <div style="font-size:22px;color:${on?'#ffd76a':'#8fd1a8'};font-weight:bold;font-family:Georgia,serif">${n*n}</div>
          ${on?`<div style="font-size:10px;color:#ffd76a">${n}·${n}</div>`:`<div style="height:13px"></div>`}
        </button>`;
      }).join('');
      h=wkFrame(wkBig('Квадраты — наизусть')+
        `<div class="wk-row" style="gap:5px">${tiles}</div>`+
        (st.tile? `<div class="k2in" style="width:100%">${sqGrid(st.tile,{w:318,cell:Math.min(40,Math.floor(300/st.tile)),y0:8,pct:1})}</div>`:'')+
        wkSml('1²=1 · 2²=4 · 3²=9 · 4²=16 · 5²=25 · 6²=36 — нажми, чтобы увидеть квадрат'));
    } else if(step===7){
      const k=st.ten||2;
      const zeros=Array.from({length:k},(_,i)=>`<span class="k2pop" style="animation-delay:${(0.2+i*0.14).toFixed(2)}s;display:inline-block;min-width:44px;text-align:center;font-family:Georgia,serif;font-size:44px;color:${i===0?'#ffd76a':'#8fd1a8'};font-weight:bold">0</span>`).join('');
      const mults=Array.from({length:k},()=>'<span style="font-family:Georgia,serif;font-size:24px;color:#cfe0cf;font-weight:bold">10</span>').join('<span style="font-size:20px;color:#cfe0cf;font-weight:bold;padding:0 3px">·</span>');
      h=wkFrame(wkBig('Степени десятки — это нули')+
        `<div class="wk-row">${mults}</div>`+
        wkHero(`<svg width="318" height="22" viewBox="0 0 318 22" style="display:block"><line x1="120" y1="11" x2="198" y2="11" stroke="#ffd76a" stroke-width="3" stroke-dasharray="8 6" class="k2flow"/></svg>`)+
        `<div class="wk-row"><span style="font-family:Georgia,serif;font-size:44px;color:#fff;font-weight:bold">1</span>${zeros}</div>`+
        wkRow(wkBtn('10²',`visW173Act('${lk}','ten2')`),wkBtn('10³',`visW173Act('${lk}','ten3')`))+
        wkSml('10² = 100 — два нуля · 10³ = 1000 — три нуля: сколько в показателе, столько и нулей'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(sqGrid(5,{w:318,cell:22,y0:8}))+
        quiz(lk,st)+
        wkSml('5² = 25 · 2³ = 8 — а теперь жми «Понял! Проверю себя» и реши обе задачи'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[173]=visW173;
  function visW173T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW173T=visW173T;
  function visW173Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='inc'){ const n=(st.n||5)+1; st.n=Math.min(9,n); }
    if(act==='dec'){ const n=(st.n||5)-1; st.n=Math.max(2,n); }
    if(act==='ten2') st.ten=2;
    if(act==='ten3') st.ten=3;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    if(/^t[1-6]$/.test(act)) st.tile=+act.slice(1);
    chRender(0);
  }
  window.visW173Act=visW173Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===173){ window.ARH_LESSONS[i]=L173; break; } } })();
})();
/* ================= УРОК 46 · Среднее арифметическое (v2, крупные SVG, без эмодзи) ================= */
(function(){
  if(!window.__wk46v2css){
    window.__wk46v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .a6in{animation:a6In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes a6In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .a6pop{animation:a6Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes a6Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .a6float{animation:a6Float 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes a6Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}'+
      '#lvis .a6flow{stroke-dasharray:8 6;animation:a6Flow .85s linear infinite;}'+
      '@keyframes a6Flow{to{stroke-dashoffset:-28}}'+
      '#lvis .a6bump{animation:a6Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes a6Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}'+
      '#lvis .a6grow{animation:a6Grow 1s cubic-bezier(.2,.8,.2,1) both;transform-box:fill-box;}'+
      '@keyframes a6Grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}';
    document.head.appendChild(st);
  }
  const L46 = {
    id: 46, title: 'Среднее арифметическое', ico: '∑',
    src: 'Математика · 5 класс · Среднее арифметическое', subj: 'math',
    explain: [
      'У Архимеда 12 конфет и 3 друга. Чтобы не обидеть никого, он делит поровну: каждому по 4. Это и есть среднее арифметическое — «поровну на всех»!',
      'Что мы делаем? Сначала всё складываем (12 конфет), потом делим на количество (на 3 друзей). Среднее = сумма : количество. Всего два шага!',
      'Пример с оценками: 4, 5, 3. Это три числа, значит делим на 3. Сначала сумма: 4 + 5 + 3 = 12.',
      'Теперь делим: 12 : 3 = 4. Среднее арифметическое оценок 4, 5 и 3 равно 4. Сначала сложи, потом подели — и всё!',
      'Среднее всегда посередине: оно не меньше самого маленького числа и не больше самого большого. Для чисел 3 и 5 среднее 4 — ровно между ними.',
      'Бывает и половинка: оценки 4 и 5 дают (4 + 5) : 2 = 4,5. Две оценки — делим на 2. «Четыре с половиной»!',
      'Можно идти и обратно: если знаешь среднее и количество, найди сумму: сумма = среднее · количество. Средний балл 4 при 5 оценках — сумма 20.',
      'Средняя скорость — тоже среднее: 240 км за 4 часа — это 240 : 4 = 60 км «на каждый час». Средняя скорость 60 км/ч.',
      'Средний балл за четверть: оценки 5, 4, 3, 5, 3. Сумма 5+4+3+5+3 = 20, делим на 5 оценок → 4. Средний балл 4.',
      'Средняя температура за неделю: 20, 22, 21, 23, 19 градусов. Сумма 105, делим на 5 дней → 21°. Столбики покажут: что-то теплее, что-то холоднее, а в среднем 21°!',
      'Ловушка: в классе А три ученика со средним баллом 4, в классе Б один ученик с баллом 2. Нельзя просто взять (4+2):2 = 3 — учеников же не поровну! Правильно: (3·4 + 1·2) : 4 = 3,5.',
      'Проверь себя: среднее чисел 4, 5, 3 равно 4, а сумма при среднем 4 и пяти оценках равна 20. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Найди среднее чисел 4, 5, 3.', choices: ['3', '4', '5', '12'], ans: 1,
      exp: '(4+5+3):3 = 12:3 = 4.' },
    tasks: [
      { q: 'Найди среднее чисел 6, 8, 10, 12.', kind: 'unit', ans: 9, tol: 0,
        hints: ['Сумма: 6+8+10+12 = 36.', 'Чисел 4.', '36 : 4 = 9.'], sol: '36 : 4 = 9.' },
      { q: 'Средний балл 5 оценок равен 4. Какова их сумма?', kind: 'unit', ans: 20, tol: 0,
        hints: ['Сумма = среднее · количество.', '4 · 5 = 20.'], sol: '4 · 5 = 20.' }
    ]
  };
  const A={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',ivory:'#e8e0cc',mut:'#9ec0a8'};
  const AP=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff9a7a','#5aa0d8'];
  /* столбик с числом */
  function bar(x,w,h,v,c,opt){
    const o=opt||{};
    return `<g class="a6pop" style="animation-delay:${(o.delay||0).toFixed(2)}s">
      <rect x="${x}" y="${108-h}" width="${w}" height="${h}" rx="${Math.min(10,w*0.24)}" fill="${c}" opacity=".22"/>
      <rect x="${x}" y="${108-h}" width="${w}" height="${h}" rx="${Math.min(10,w*0.24)}" fill="none" stroke="${c}" stroke-width="2.6"/>
      <text x="${x+w/2}" y="${106-h}" text-anchor="middle" font-size="${o.fs||22}" fill="#fff" font-weight="bold" font-family="Georgia,serif">${v}</text>
    </g>`;
  }
  /* шкала 0..N с отметкой среднего */
  function scaleSVG(min,max,mid,c,opt){
    const o=opt||{};
    const W=318, x0=22, x1=296, y=70;
    const px=v=> x0+(x1-x0)*(v-min)/(max-min);
    const ticks=[];
    for(let v=Math.ceil(min); v<=Math.floor(max); v++){
      ticks.push(`<text x="${px(v)}" y="104" text-anchor="middle" font-size="17" fill="#e8dcc8" font-weight="bold">${v}</text>`);
    }
    return `<svg viewBox="0 0 318 118" style="display:block;width:100%;height:auto">
      <rect x="4" y="4" width="310" height="110" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
      <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="#8a94ad" stroke-width="4"/>
      ${ticks.join('')}
      <line x1="${px(min)}" y1="${y-14}" x2="${px(min)}" y2="${y+10}" stroke="#7fd1ff" stroke-width="3"/>
      <line x1="${px(max)}" y1="${y-14}" x2="${px(max)}" y2="${y+10}" stroke="#7fd1ff" stroke-width="3"/>
      <g class="a6float"><circle cx="${px(mid)}" cy="${y}" r="14" fill="${c}"/><text x="${px(mid)}" y="${y+5}" text-anchor="middle" font-size="15" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">${mid}</text></g>
      <text x="${px(mid)}" y="${y-22}" text-anchor="middle" font-size="12" fill="${c}" font-weight="bold">среднее</text>
    </svg>`;
  }
  const sign=(t,c,delay)=>`<span class="a6in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:7px 15px;border-radius:13px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:23px;color:${c};font-weight:bold">${t}</span>`;
  const chip=(t,c)=>`<span class="a6in" style="display:inline-block;padding:5px 13px;border-radius:11px;background:rgba(255,255,255,.05);border:1.8px solid ${c||'#4a6a54'};font-size:14.5px;color:#e8dcc8">${t}</span>`;
  const Q46=[
    {q:'Найди среднее чисел 4, 5, 3.',opts:['3','4','5','12'],ans:1},
    {q:'Средний балл 4, оценок 5. Какова сумма?',opts:['9','20','45'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q46[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?A.green:A.red; tc=i===T.ans?A.green:A.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:18px" onclick="visW46T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! Сумма = 4 · 5 = 20</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:18px">Верно! (4+5+3):3 = 12:3 = 4</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:17px">Не так. Сначала сложи всё, потом раздели на количество</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW46Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW46Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:10px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW46(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0){ if(st.mode==null) st.mode=0; } if(step===3){ st.mode=0; } if(step===10){ st.mode=0; } if(step===11){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      const cnt=12, fr=3, each=4;
      const rows=[];
      for(let g=0;g<fr;g++){
        const dots=[];
        for(let j=0;j<each;j++) dots.push(`<circle class="a6pop" style="animation-delay:${(0.1+g*0.12+j*0.06).toFixed(2)}s" cx="${14+g*6+j*17}" cy="30" r="6.5" fill="${AP[(g+j)%AP.length]}"/>`);
        rows.push(`<div class="a6in" style="animation-delay:${(g*0.15+0.1).toFixed(2)}s;flex:1;min-width:0;border:2px solid ${A.blue};border-radius:14px;padding:6px 4px;text-align:center;background:rgba(127,209,255,.06)">
          <svg viewBox="0 0 84 60" style="display:block;width:100%;height:auto">${dots.join('')}<text x="42" y="52" text-anchor="middle" font-size="13" fill="#b9cdc0">друг ${g+1} · по ${each}</text></svg></div>`);
      }
      h=wkFrame(wkBig('Поровну на всех')+
        wkHero(`<div class="wk-row" style="gap:6px;align-items:stretch">${rows.join('')}</div>`)+
        wkRow(sign('12 конфет : 3 друзей = по 4',A.gold,0.4))+
        wkSml('среднее арифметическое — это «поровну на всех»'));
    } else if(step===1){
      h=wkFrame(wkBig('Два простых шага')+
        wkHero(`<svg viewBox="0 0 318 168" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="158" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <rect x="22" y="24" width="120" height="58" rx="14" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>
          <text x="82" y="50" text-anchor="middle" font-size="15" fill="#cfe0cf">шаг 1</text>
          <text x="82" y="72" text-anchor="middle" font-size="21" fill="#fff" font-weight="bold" font-family="Georgia,serif">сложи всё</text>
          <rect x="176" y="24" width="120" height="58" rx="14" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="3"/>
          <text x="236" y="50" text-anchor="middle" font-size="15" fill="#cfe0cf">шаг 2</text>
          <text x="236" y="72" text-anchor="middle" font-size="21" fill="#fff" font-weight="bold" font-family="Georgia,serif">раздели</text>
          <path class="a6flow" d="M150 52 Q 160 40 172 52" fill="none" stroke="#ffd76a" stroke-width="4"/>
          <rect x="42" y="100" width="234" height="46" rx="18" fill="rgba(217,164,65,.1)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="159" y="129" text-anchor="middle" font-size="23" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">сумма : количество</text>
        </svg>`)+
        wkSml('среднее = сумма : количество — запомни формулу'));
    } else if(step===2){
      const vals=[4,5,3];
      h=wkFrame(wkBig('Оценки: 4, 5, 3')+
        wkHero(`<svg viewBox="0 0 318 152" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="144" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <text x="159" y="26" text-anchor="middle" font-size="14" fill="#9ec0a8">три оценки — делим на 3</text>
          ${vals.map((v,i)=>{ const x=56+i*76; return bar(x,58,Math.max(20,v*15),v,AP[i],{delay:i*0.15}); }).join('')}
          <line x1="28" y1="110" x2="290" y2="110" stroke="#3d5c49" stroke-width="2"/>
          <text x="88" y="134" text-anchor="middle" font-size="17" fill="#9ec0a8">+</text>
          <text x="164" y="134" text-anchor="middle" font-size="17" fill="#9ec0a8">+</text>
        </svg>`)+
        wkRow(sign('4 + 5 + 3',A.blue),sign('= 12',A.gold,0.2))+
        wkSml('сначала считаем сумму всех чисел'));
    } else if(step===3){
      const sh=st.mode;
      h=wkFrame(wkBig('Два шага подробно')+
        wkHero(`<svg viewBox="0 0 318 168" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="158" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${sh===0
            ? `<rect x="26" y="30" width="100" height="64" rx="14" fill="rgba(127,209,255,.14)" stroke="#7fd1ff" stroke-width="3"/>
               <text x="76" y="60" text-anchor="middle" font-size="18" fill="#cfe0cf">сумма</text>
               <text x="76" y="82" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">12</text>
               <text x="170" y="70" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">:</text>
               <circle class="a6bump" cx="230" cy="70" r="36" fill="none" stroke="#8fd1a8" stroke-width="3.5"/>
               <text x="230" y="78" text-anchor="middle" font-size="24" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">3</text>
               <text x="230" y="118" text-anchor="middle" font-size="12" fill="#9ec0a8">сколько чисел</text>`
            : `<rect x="26" y="30" width="100" height="64" rx="14" fill="rgba(127,209,255,.14)" stroke="#7fd1ff" stroke-width="3"/>
               <text x="76" y="60" text-anchor="middle" font-size="18" fill="#cfe0cf">сумма</text>
               <text x="76" y="82" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">12</text>
               <text x="146" y="70" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">:</text>
               <rect x="166" y="30" width="64" height="64" rx="14" fill="rgba(143,209,168,.14)" stroke="#8fd1a8" stroke-width="3"/>
               <text x="198" y="60" text-anchor="middle" font-size="18" fill="#cfe0cf">чисел</text>
               <text x="198" y="82" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">3</text>
               <text x="246" y="70" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">=</text>
               <circle class="a6float" cx="286" cy="70" r="30" fill="#ffd76a"/><text x="286" y="79" text-anchor="middle" font-size="24" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">4</text>`}
          <text x="159" y="142" text-anchor="middle" font-size="14" fill="${sh===0?'#cfe0cf':'#8fd1a8'}" font-weight="bold">${sh===0?'шаг 1 · сумма = 12':'среднее = 12 : 3 = 4'}</text>
        </svg>`)+
        wkRow(sh===0
          ? wkBtn('шаг 2 · разделить',`visW46Act('${lk}','go')`)
          : wkRow(wkBtn('сначала',`visW46Act('${lk}','rst')`)))+
        (sh===1? wkAns('среднее = 4!',A.green):'')+
        wkSml('сначала сложи, потом подели — и всё'));
    } else if(step===4){
      h=wkFrame(wkBig('Среднее всегда посередине')+
        wkHero(scaleSVG(0,8,4,A.gold))+
        wkRow(chip('числа 3 и 5'),sign('среднее 4',A.green,0.2))+
        wkSml('среднее не меньше самого маленького и не больше самого большого'));
    } else if(step===5){
      h=wkFrame(wkBig('Бывает и половинка')+
        wkHero(`<svg viewBox="0 0 318 128" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="120" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${[4,5].map((v,i)=>{ const x=58+i*76; return bar(x,58,Math.max(22,v*16),v,AP[i],{delay:i*0.15}); }).join('')}
          <g class="a6pop" style="animation-delay:.35s"><line x1="48" y1="62" x2="262" y2="62" stroke="#3d5c49" stroke-width="2"/>
          <text x="282" y="70" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">?</text></g>
        </svg>`)+
        wkRow(sign('(4 + 5) : 2 = 4,5',A.gold,0.3))+
        wkSml('две оценки — делим на 2. среднее 4,5 — «четыре с половиной»!'));
    } else if(step===6){
      h=wkFrame(wkBig('Обратно: находим сумму')+
        wkHero(`<svg viewBox="0 0 318 120" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="110" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <rect x="20" y="24" width="88" height="70" rx="13" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="3"/>
          <text x="64" y="52" text-anchor="middle" font-size="14" fill="#cfe0cf">среднее</text>
          <text x="64" y="80" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">4</text>
          <text x="128" y="64" text-anchor="middle" font-size="28" fill="#cfe0cf" font-weight="bold">·</text>
          <rect x="148" y="24" width="88" height="70" rx="13" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>
          <text x="192" y="52" text-anchor="middle" font-size="14" fill="#cfe0cf">чисел</text>
          <text x="192" y="80" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">5</text>
          <text x="256" y="64" text-anchor="middle" font-size="28" fill="#cfe0cf" font-weight="bold">=</text>
          <circle class="a6float" cx="290" cy="62" r="24" fill="#ffd76a"/><text x="290" y="70" text-anchor="middle" font-size="22" fill="#0d1a13" font-weight="bold" font-family="Georgia,serif">20</text>
        </svg>`)+
        wkRow(sign('сумма = 4 · 5 = 20',A.green,0.3))+
        wkSml('знаешь среднее и количество — умножь и узнаешь сумму'));
    } else if(step===7){
      h=wkFrame(wkBig('Средняя скорость')+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="130" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${[60,60,60,60].map((v,i)=>{ const x=24+i*66; return bar(x,56,Math.max(24,v*0.42),v,AP[i%AP.length],{delay:i*0.12,fs:18}); }).join('')}
          <line x1="12" y1="108" x2="306" y2="108" stroke="#3d5c49" stroke-width="2.4"/>
          <g class="a6pop" style="animation-delay:.5s"><text x="159" y="40" text-anchor="middle" font-size="13" fill="#9ec0a8">4 часа — каждый по 60 км</text></g>
        </svg>`)+
        wkRow(sign('240 км : 4 ч = 60 км/ч',A.green,0.4))+
        wkSml('средняя скорость = весь путь, разложенный на все часы'));
    } else if(step===8){
      const vals=[5,4,3,5,3];
      h=wkFrame(wkBig('Средний балл за четверть')+
        wkHero(`<svg viewBox="0 0 318 158" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="148" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <text x="159" y="26" text-anchor="middle" font-size="13" fill="#9ec0a8">пять оценок — делим на 5</text>
          ${vals.map((v,i)=>{ const x=22+i*55; return bar(x,42,Math.max(18,v*13),v,AP[i%AP.length],{delay:i*0.12,fs:19}); }).join('')}
          <g class="a6pop" style="animation-delay:.6s"><rect x="30" y="118" width="258" height="22" rx="11" fill="rgba(217,164,65,.12)" stroke="#ffd76a"/><text x="159" y="133" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">5+4+3+5+3 = 20 → 20 : 5 = 4</text></g>
        </svg>`)+
        wkAns('средний балл 4',A.green)+
        wkSml('пять оценок — делим на 5!'));
    } else if(step===9){
      const vals=[20,22,21,23,19];
      h=wkFrame(wkBig('Средняя температура за неделю')+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <text x="159" y="26" text-anchor="middle" font-size="13" fill="#9ec0a8">пн · вт · ср · чт · пт</text>
          ${vals.map((v,i)=>{ const x=26+i*56; return bar(x,42,Math.max(20,(v-14)*7),v,AP[i%AP.length],{delay:i*0.12,fs:18}); }).join('')}
          <line x1="20" y1="${108-(21-14)*7}" x2="298" y2="${108-(21-14)*7}" stroke="#ffd76a" stroke-width="2.6" stroke-dasharray="9 7"/>
          <g class="a6pop" style="animation-delay:.6s"><text x="159" y="${108-(21-14)*7-8}" text-anchor="middle" font-size="13" fill="#ffd76a" font-weight="bold">среднее 21°</text></g>
        </svg>`)+
        wkRow(sign('105 : 5 = 21°',A.green,0.4))+
        wkSml('что-то теплее, что-то холоднее, а в среднем 21°'));
    } else if(step===10){
      const sh=st.mode;
      h=wkFrame(wkBig('Ловушка: средние разных «кучек»')+
        wkHero(`<svg viewBox="0 0 318 158" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="150" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <rect x="14" y="16" width="142" height="120" rx="13" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="85" y="34" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">класс А · 3 ученика</text>
          ${[0,1,2].map(i=>`<g class="a6pop" style="animation-delay:${(i*0.1).toFixed(2)}s"><circle cx="${40+i*44}" cy="70" r="19" fill="#8fd1a8" opacity=".25"/><circle cx="${40+i*44}" cy="70" r="19" fill="none" stroke="#8fd1a8" stroke-width="2.4"/><text x="${40+i*44}" y="76" text-anchor="middle" font-size="16" fill="#fff" font-weight="bold">4</text></g>`).join('')}
          <rect x="162" y="16" width="142" height="120" rx="13" fill="rgba(255,138,122,.07)" stroke="#ff8a7a" stroke-width="2.4"/>
          <text x="233" y="34" text-anchor="middle" font-size="13" fill="#ff8a7a" font-weight="bold">класс Б · 1 ученик</text>
          <g class="a6pop" style="animation-delay:.3s"><circle cx="233" cy="70" r="19" fill="#ff8a7a" opacity=".25"/><circle cx="233" cy="70" r="19" fill="none" stroke="#ff8a7a" stroke-width="2.4"/><text x="233" y="76" text-anchor="middle" font-size="16" fill="#fff" font-weight="bold">2</text></g>
          ${sh? `<g class="a6pop" style="animation-delay:.2s"><rect x="30" y="104" width="258" height="26" rx="12" fill="rgba(217,164,65,.14)" stroke="#ffd76a" stroke-width="2.4"/><text x="159" y="121" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">(3·4 + 1·2) : 4 = 14 : 4 = 3,5</text></g>`:''}
        </svg>`)+
        (sh
          ? wkAns('правильно: 3,5 — по количеству учеников!',A.green)+wkRow(wkBtn('сначала',`visW46Act('${lk}','rst')`))
          : `<div class="wk-ans" style="color:#ffcfc2">(4+2):2 = 3 — неверно!</div>`+wkRow(wkBtn('решить по весу',`visW46Act('${lk}','go')`)))+
        wkSml('нельзя усреднять «4 и 2» поровну: учеников 3 и 1 — считай по количеству'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(`<svg viewBox="0 0 318 108" style="display:block;width:100%;height:auto">
          ${[4,5,3].map((v,i)=>{ const x=36+i*88; return `<g class="a6pop" style="animation-delay:${(i*0.14).toFixed(2)}s"><circle cx="${x+30}" cy="44" r="30" fill="rgba(255,255,255,.05)" stroke="${AP[i]}" stroke-width="3"/><text x="${x+30}" y="52" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">${v}</text></g>`; }).join('')}
          <text x="100" y="88" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold">&gt;</text>
          <text x="190" y="88" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold">&gt;</text>
          <text x="159" y="100" text-anchor="middle" font-size="13" fill="#9ec0a8">сумма 12 · чисел 3</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('4, 5, 3 → (4+5+3):3 = 4 · среднее 4 и 5 оценок → сумма 20'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[46]=visW46;
  function visW46T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW46T=visW46T;
  function visW46Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.mode=1;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW46Act=visW46Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===46){ window.ARH_LESSONS[i]=L46; break; } } })();
})();
/* ================= УРОК 398 · Полуинварианты: процессы (v2, 13 слайдов, крупные SVG, без эмодзи) ================= */
(function(){
  if(!window.__wk398v2css){
    window.__wk398v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .i8in{animation:i8In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes i8In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .i8pop{animation:i8Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes i8Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .i8float{animation:i8Float 1.9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes i8Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}'+
      '#lvis .i8flow{stroke-dasharray:9 7;animation:i8Flow .85s linear infinite;}'+
      '@keyframes i8Flow{to{stroke-dashoffset:-32}}'+
      '#lvis .i8bump{animation:i8Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes i8Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}'+
      '#lvis .i8wob{animation:i8Wob 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes i8Wob{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}';
    document.head.appendChild(st);
  }
  const L398 = {
    id: 398, title: 'Полуинварианты: процессы', ico: '⇄',
    src: 'Математика · 5–6 класс · Олимп-6: процессы', subj: 'math',
    explain: [
      'На доске записаны числа 1, 2, 3, 4. Каждый ход стирают два числа a и b и записывают вместо них их разность a − b. Так делают, пока не останется одно число. Можно ли заранее узнать, каким оно будет — чётным или нечётным?',
      'Попробуем играть вручную. Стираем 1 и 2: 1 − 2 = −1. На доске теперь −1, 3, 4. Одно число заменилось, а сумма всех чисел тоже поменялась — следим за этим!',
      'Продолжаем: стираем 3 и 4: 3 − 4 = −1. Остались −1 и −1. Их разность: −1 − (−1) = 0. Итог 0 — чётное число!',
      'Проверим другим порядком. Стираем 1 и 3: 1 − 3 = −2. Остались −2, 2, 4.',
      'Дальше стираем 2 и 4: 2 − 4 = −2. Остались −2 и −2: их разность −2 − (−2) = 0. Опять 0? Похоже, итог всегда одинаковый…',
      'Стоп! Проверим третий порядок: (1,4) → −3, остались −3, 2, 3; затем (2,3) → −1, остались −3, −1; наконец −3 − (−1) = −2. Итог −2, а не 0! Значит, само число зависит от порядка — но оба ответа чётные. В чём секрет?',
      'Смотрим на один ход внимательно. Были числа a и b, а станет одно число a − b. Пусть S — сумма всех чисел на доске. Старая сумма теряет a и b, но получает a − b: новая сумма S′ = S − a − b + (a − b).',
      'Упростим: S′ = S − a − b + a − b = S − 2b. За один ход сумма меняется ровно на 2b — а 2b всегда чётное число! Вычесть чётное — значит, чётность суммы не изменится.',
      'Вот он, полуинвариант: чётность суммы чисел на доске сохраняется на каждом ходу, каким бы порядком мы ни играли. Значит, чётность единственного числа в конце равна чётности начальной суммы!',
      'Считаем начальную сумму: 1 + 2 + 3 + 4 = 10. Десять — чётное число. Чётность не меняется ни на одном ходу, поэтому и итоговое число обязательно чётное: 0 — чётное, −2 — тоже чётное. Ура, всё сходится!',
      'А что если бы сумма была нечётной? Например, числа 1, 2, 3, 4, 5 дают в сумме 15 — нечётное. Тогда и итог игры был бы нечётным, каким порядком ни играй. Чётность суммы — это «предсказание» финала.',
      'Тренажёр: возьми набор чисел, сложи их и сразу скажи, чётным или нечётным будет итог игры, — даже не играя! Проверь себя на разных наборах.',
      'Проверь себя: при замене пары a, b на a − b сохраняется чётность суммы. А из чисел 1, 2, 3, 4 (сумма 10 — чётная) итог будет чётным. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Стирают a и b, записывают a − b. Что сохраняется?', choices: ['чётность суммы', 'сама сумма', 'число чисел', 'произведение'], ans: 0,
      exp: 'a+b и a−b одной чётности → чётность суммы сохраняется.' },
    tasks: [
      { q: 'Чему равна сумма 1 + 2 + 3 + 4?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Сложи по порядку.', '10.'], sol: '10' },
      { q: 'Из чисел 1, 2, 3, 4 операцией «разность» останется одно число. Каким оно будет по чётности?', kind: 'choice', choices: ['чётным', 'нечётным', 'любым', 'нельзя узнать'], ans: 0, tol: 0,
        hints: ['Сумма 10 чётна.', 'Чётность сохраняется → итог чётный.'], sol: 'чётным' }
    ]
  };
  const I={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',ivory:'#e8e0cc',mut:'#9ec0a8',grey:'#8a94ad'};
  const IP=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff9a7a','#5aa0d8','#c9a06a'];
  /* плитка-число (SVG) */
  function tile(x,y,v,c,opt){
    const o=opt||{};
    const w=o.w||58, h=o.h||56;
    const s=String(v);
    const fs=Math.min(o.fs||30, Math.floor((w-8)/(s.length*0.62)));
    const col=o.fill? o.fill : (c? c : 'rgba(255,255,255,.05)');
    const stroke=o.stroke||c||'#4a6a54';
    const anim=o.bump?'i8bump':(o.float?'i8float':'i8pop');
    return `<g class="${anim}" style="animation-delay:${(o.delay||0).toFixed(2)}s">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx||13}" fill="${col}" stroke="${stroke}" stroke-width="${o.sw||3}"/>
      <text x="${x+w/2}" y="${(y+h/2+fs*0.37).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="${o.tc||'#fff'}" font-weight="bold" font-family="Georgia,serif">${v}</text>
    </g>`;
  }
  /* ряд плиток по центру; возвращает ширину использованного */
  function tileRow(vals,opt){
    const o=opt||{};
    const W=o.w||318, w=o.tw||58, gap=o.gap||8, y=o.y||14;
    const n=vals.length;
    const total=n*w+(n-1)*gap;
    const x0=Math.round((W-total)/2);
    let s='';
    vals.forEach((v,i)=>{
      const c=o.cols&&o.cols[i]? o.cols[i]: IP[i%IP.length];
      s+=tile(x0+i*(w+gap),y,v,c,{delay:(o.d0||0.1)+i*0.12,w,fs:o.fs});
    });
    return `<svg viewBox="0 0 ${W} ${y+56+(o.extra||6)}" style="display:block;width:100%;height:auto">${s}</svg>`;
  }
  /* «доска»: рамка с рядами плиток и подписями шагов */
  const sign=(t,c,delay,fs)=>`<span class="i8in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 14px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||22}px;color:${c};font-weight:bold">${t}</span>`;
  const arrow=(x,y,len,c)=>`<g class="i8flow"><line x1="${x}" y1="${y}" x2="${x+len}" y2="${y}" stroke="${c||'#ffd76a'}" stroke-width="3.4"/><path d="M${x+len} ${y-6} L${x+len+8} ${y} L${x+len} ${y+6} Z" fill="${c||'#ffd76a'}"/></g>`;
  const Q398=[
    {q:'При замене a, b на a − b чётность суммы…',opts:['сохраняется','меняется','зависит от хода'],ans:0},
    {q:'Сумма на доске нечётная (например 15). Итог игры будет…',opts:['чётным','нечётным','любым'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q398[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?I.green:I.red; tc=i===T.ans?I.green:I.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:96px;font-size:15px" onclick="visW398T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Нечётная сумма → нечётный итог</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Сумма меняется на −2b — чётность та же</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сумма S меняется на 2b — чётное число</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW398Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW398Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:8px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW398(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===1||step===2||step===3||step===4||step===5){ st.h=0; } if(step===11){ st.set=0; if(st.show==null) st.show=0; } if(step===12){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(wkBig('Процесс с числами на доске')+
        wkHero(tileRow([1,2,3,4],{y:20,extra:0}))+
        wkHero(`<svg viewBox="0 0 318 92" style="display:block;width:100%;height:auto">
          <rect x="20" y="10" width="110" height="46" rx="11" fill="rgba(255,255,255,.05)" stroke="#5aa0d8" stroke-width="2.6"/>
          <text x="42" y="39" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">a</text>
          <text x="88" y="39" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">b</text>
          ${arrow(140,33,34)}
          <rect x="188" y="10" width="110" height="46" rx="11" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="3"/>
          <text x="200" y="39" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">a</text><text x="232" y="39" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">−</text><text x="266" y="39" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">b</text>
          <text x="159" y="78" text-anchor="middle" font-size="13" fill="#9ec0a8">стираем два числа, пишем их разность</text>
        </svg>`)+
        wkSml('так делают, пока не останется одно число · можно ли заранее узнать его чётность?'));
    } else if(step===1){
      const sh=st.h;
      h=wkFrame(wkBig('Играем: порядок 1 (ход 1)')+
        wkHero(sh===0
          ? tileRow([1,2,3,4],{y:20,extra:0})
          : `<svg viewBox="0 0 318 100" style="display:block;width:100%;height:auto">
              <g class="i8pop"><rect x="14" y="16" width="88" height="58" rx="12" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3.4"/>
              <text x="58" y="34" text-anchor="middle" font-size="15" fill="#ffcfc2">стираем</text>
              <text x="34" y="62" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">1</text><text x="82" y="62" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">2</text></g>
              ${arrow(112,45,26)}
              ${tile(150,16,58,'−1','#ffd76a',{delay:.25,fs:28,bump:1})}
              <text x="236" y="30" text-anchor="middle" font-size="15" fill="#ffcfc2">1 − 2 = −1</text>
              <g class="i8pop" style="animation-delay:.4s"><rect x="150" y="64" width="150" height="30" rx="9" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
              <text x="225" y="84" text-anchor="middle" font-size="15" fill="#e8dcc8">на доске: −1, 3, 4</text></g>
            </svg>`)+
        (sh===0? wkRow(wkBtn('сделать ход: 1 − 2 = −1',`visW398Act('${lk}','go')`)): wkAns('сумма стала −1 + 3 + 4 = 6',I.gold))+
        wkSml('мы стёрли 1 и 2 и записали вместо них −1 · чисел стало меньше!'));
    } else if(step===2){
      const sh=st.h;
      h=wkFrame(wkBig('Играем: порядок 1 (ход 2)')+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <g class="i8pop"><text x="159" y="20" text-anchor="middle" font-size="14" fill="#9ec0a8">было: −1, 3, 4</text></g>
          ${sh===0? `<g class="i8pop" style="animation-delay:.1s"><rect x="24" y="30" width="82" height="54" rx="12" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3"/>
            <text x="44" y="66" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">−1</text><text x="88" y="66" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">3</text></g>`:''}
          ${sh>=1? tile(24,30,58,'3','#8fd1a8',{delay:0,fs:28}):''}
          ${sh>=1? tile(112,30,58,'4','#8fd1a8',{delay:.12,fs:28}):''}
          ${sh>=1? arrow(182,57,30):''}
          ${sh>=1? tile(220,30,58,'−1','#ffd76a',{delay:.25,fs:28,bump:1}):''}
          ${sh>=2? `<g class="i8pop" style="animation-delay:.1s"><text x="159" y="110" text-anchor="middle" font-size="20" fill="#e8dcc8" font-family="Georgia,serif">−1 − (−1) = 0</text>
            <circle class="i8float" cx="240" cy="120" r="22" fill="#ffd76a"/><text x="240" y="128" text-anchor="middle" font-size="22" fill="#0d1a13" font-weight="bold">0</text></g>`:''}
        </svg>`)+
        wkRow(sh===0? wkBtn('ход: 3 − 4 = −1',`visW398Act('${lk}','go')`) : (sh===1? wkBtn('финал: −1 − (−1)',`visW398Act('${lk}','go')`) : wkBtn('сначала',`visW398Act('${lk}','rst')`)))+
        (sh>=2? wkAns('итог 0 — чётное!',I.green):'')+
        wkSml('три хода — осталось одно число 0'));
    } else if(step===3){
      const sh=st.h;
      h=wkFrame(wkBig('Другой порядок (ход 1)')+
        wkHero(sh===0
          ? tileRow([1,2,3,4],{y:20,extra:0})
          : `<svg viewBox="0 0 318 100" style="display:block;width:100%;height:auto">
              <g class="i8pop"><rect x="14" y="16" width="88" height="58" rx="12" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3.4"/>
              <text x="58" y="34" text-anchor="middle" font-size="15" fill="#ffcfc2">стираем</text>
              <text x="34" y="62" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">1</text><text x="82" y="62" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">3</text></g>
              ${arrow(112,45,26)}
              ${tile(150,16,58,'−2','#7fd1ff',{delay:.25,fs:28,bump:1})}
              <text x="244" y="30" text-anchor="middle" font-size="15" fill="#bfe4ff">1 − 3 = −2</text>
              <g class="i8pop" style="animation-delay:.4s"><rect x="150" y="64" width="150" height="30" rx="9" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
              <text x="225" y="84" text-anchor="middle" font-size="15" fill="#e8dcc8">на доске: −2, 2, 4</text></g>
            </svg>`)+
        (sh===0? wkRow(wkBtn('сделать ход: 1 − 3 = −2',`visW398Act('${lk}','go')`)): wkAns('сумма стала −2 + 2 + 4 = 4',I.gold))+
        wkSml('порядок другой — а сумма по-прежнему меняется'));
    } else if(step===4){
      const sh=st.h;
      h=wkFrame(wkBig('Другой порядок (финал)')+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <g class="i8pop"><text x="159" y="20" text-anchor="middle" font-size="14" fill="#9ec0a8">было: −2, 2, 4</text></g>
          ${sh===0? `<g class="i8pop" style="animation-delay:.1s"><rect x="24" y="30" width="82" height="54" rx="12" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3"/>
            <text x="44" y="66" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">2</text><text x="88" y="66" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold">4</text></g>`:''}
          ${sh>=1? tile(24,30,58,'−2','#8fd1a8',{delay:0,fs:28}):''}
          ${sh>=1? tile(112,30,58,'4','#8fd1a8',{delay:.12,fs:28}):''}
          ${sh>=1? arrow(182,57,30):''}
          ${sh>=1? tile(220,30,58,'−2','#7fd1ff',{delay:.25,fs:28,bump:1}):''}
          ${sh>=2? `<g class="i8pop" style="animation-delay:.1s"><text x="120" y="110" text-anchor="middle" font-size="20" fill="#e8dcc8" font-family="Georgia,serif">−2 − (−2) = 0</text>
            <circle class="i8float" cx="200" cy="120" r="22" fill="#ffd76a"/><text x="200" y="128" text-anchor="middle" font-size="22" fill="#0d1a13" font-weight="bold">0</text></g>`:''}
        </svg>`)+
        wkRow(sh===0? wkBtn('ход: 2 − 4 = −2',`visW398Act('${lk}','go')`) : (sh===1? wkBtn('финал: −2 − (−2)',`visW398Act('${lk}','go')`) : wkBtn('сначала',`visW398Act('${lk}','rst')`)))+
        (sh>=2? wkAns('опять 0 — чётное!',I.green):'')+
        wkSml('два разных порядка — пока оба дали 0…'));
    } else if(step===5){
      const sh=st.h;
      h=wkFrame(wkBig('А теперь третий порядок!')+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          ${sh===0? `<g class="i8pop"><text x="159" y="24" text-anchor="middle" font-size="15" fill="#9ec0a8">было: 1, 2, 3, 4</text>
            <rect x="14" y="34" width="88" height="50" rx="11" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3"/>
            <text x="34" y="66" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold">1</text><text x="82" y="66" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold">4</text>
            <text x="130" y="66" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">→</text>
            ${tile(146,34,58,'−3','#ffd76a',{delay:.2,fs:26,bump:1})}
            <text x="238" y="66" text-anchor="middle" font-size="15" fill="#ffcfc2">1−4=−3</text>
            <text x="159" y="104" text-anchor="middle" font-size="14" fill="#e8dcc8">на доске: −3, 2, 3</text></g>`
          : `<g class="i8pop"><text x="159" y="22" text-anchor="middle" font-size="15" fill="#9ec0a8">было: −3, 2, 3</text>
            <rect x="14" y="34" width="88" height="50" rx="11" fill="rgba(255,138,122,.12)" stroke="#ff8a7a" stroke-width="3"/>
            <text x="34" y="66" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold">2</text><text x="82" y="66" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold">3</text>
            <text x="130" y="66" text-anchor="middle" font-size="30" fill="#cfe0cf" font-weight="bold">→</text>
            ${tile(146,34,58,'−1','#7fd1ff',{delay:.2,fs:26,bump:1})}
            <text x="236" y="66" text-anchor="middle" font-size="15" fill="#bfe4ff">2−3=−1</text>
            <text x="159" y="104" text-anchor="middle" font-size="14" fill="#e8dcc8">на доске: −3, −1</text></g>`}
        </svg>`)+
        wkRow(sh===0? wkBtn('ход: 1 − 4 = −3',`visW398Act('${lk}','go')`) : wkBtn('финал: −3 − (−1) = −2',`visW398Act('${lk}','go')`))+
        (sh>=1? wkAns('итог −2, а не 0! Но −2 — тоже чётное!',I.red):'')+
        wkSml('само число зависит от порядка — а чётность нет! в чём секрет?'));
    } else if(step===6){
      h=wkFrame(wkBig('Секрет: смотрим на один ход')+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <text x="159" y="28" text-anchor="middle" font-size="14" fill="#9ec0a8">была сумма S · стираем a и b · пишем a − b</text>
          ${tile(30,40,52,'a','#7fd1ff',{fs:24,delay:0})}
          ${tile(92,40,52,'b','#7fd1ff',{fs:24,delay:.1})}
          ${arrow(154,66,34)}
          ${tile(196,40,52,'a−b','#ffd76a',{fs:22,delay:.2,w:64})}
          <text x="159" y="120" text-anchor="middle" font-size="19" fill="#e8dcc8" font-family="Georgia,serif">S′ = S − a − b + (a − b)</text>
          <g class="i8pop" style="animation-delay:.35s"><rect x="30" y="132" width="258" height="30" rx="12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.2"/>
          <text x="159" y="152" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">S′ = S − 2b</text></g>
        </svg>`)+
        wkSml('старая сумма теряет a и b, но получает a − b · разберём формулу'));
    } else if(step===7){
      h=wkFrame(wkBig('Ключ: −2b — всегда чётное')+
        wkHero(`<svg viewBox="0 0 318 156" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="148" rx="18" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="i8pop"><rect x="24" y="18" width="120" height="64" rx="13" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>
          <text x="84" y="46" text-anchor="middle" font-size="15" fill="#cfe0cf">за ход сумма</text>
          <text x="84" y="70" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">− 2b</text></g>
          <g class="i8pop" style="animation-delay:.2s"><rect x="174" y="18" width="120" height="64" rx="13" fill="rgba(217,164,65,.12)" stroke="#ffd76a" stroke-width="3"/>
          <text x="234" y="46" text-anchor="middle" font-size="15" fill="#ffe9c9">2b — это</text>
          <text x="234" y="70" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">чётное</text></g>
          <g class="i8pop" style="animation-delay:.4s"><rect x="30" y="100" width="258" height="40" rx="15" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="159" y="125" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold">вычесть чётное → чётность не меняется</text></g>
        </svg>`)+
        wkSml('2·(любое число) делится на 2 — значит, S и S′ одной чётности'));
    } else if(step===8){
      h=wkFrame(wkBig('Полуинвариант найден')+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="120" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="i8pop"><rect x="22" y="18" width="274" height="52" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="159" y="40" text-anchor="middle" font-size="15" fill="#cfe0cf">чётность суммы на доске</text>
          <text x="159" y="60" text-anchor="middle" font-size="21" fill="#8fd1a8" font-weight="bold">сохраняется на каждом ходу</text></g>
          <g class="i8float"><circle cx="159" cy="100" r="15" fill="#ffd76a"/><text x="159" y="105" text-anchor="middle" font-size="13" fill="#0d1a13" font-weight="bold">✓</text></g>
          <text x="234" y="105" text-anchor="middle" font-size="13" fill="#ffd76a" font-weight="bold">полуинвариант</text>
        </svg>`)+
        wkSml('величина, которая сохраняется в процессе, — это и есть ключ к ответу'));
    } else if(step===9){
      h=wkFrame(wkBig('Считаем начальную сумму')+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${[1,2,3,4].map((v,i)=>{ const x=20+i*58; return tile(x,22,46,v,IP[i],{delay:i*0.12,fs:26}); }).join('')}
          ${[0,1,2].map(i=>`<text x="${68+i*58}" y="96" text-anchor="middle" font-size="26" fill="#cfe0cf" font-weight="bold">+</text>`).join('')}
          <g class="i8pop" style="animation-delay:.5s"><rect x="116" y="104" width="86" height="32" rx="13" fill="rgba(217,164,65,.12)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="159" y="126" text-anchor="middle" font-size="19" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">= 10</text></g>
        </svg>`)+
        wkRow(sign('10 — чётное',I.green,0.5))+
        wkSml('раз чётность сохраняется — финальное число тоже чётное'));
    } else if(step===10){
      h=wkFrame(wkBig('Проверяем предсказание')+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="i8pop"><rect x="16" y="18" width="138" height="56" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="85" y="40" text-anchor="middle" font-size="14" fill="#cfe0cf">1,2,3,4 · сумма 10</text>
          <text x="85" y="62" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold">итог 0 · −2 — чётные ✓</text></g>
          <g class="i8pop" style="animation-delay:.25s"><rect x="164" y="18" width="138" height="56" rx="13" fill="rgba(255,138,122,.1)" stroke="#ff8a7a" stroke-width="2.6"/>
          <text x="233" y="40" text-anchor="middle" font-size="14" fill="#ffcfc2">1,2,3,4,5 · сумма 15</text>
          <text x="233" y="62" text-anchor="middle" font-size="20" fill="#ff8a7a" font-weight="bold">итог будет нечётным</text></g>
          <g class="i8pop" style="animation-delay:.5s"><rect x="30" y="92" width="258" height="46" rx="14" fill="rgba(217,164,65,.1)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="159" y="113" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">чётная сумма → чётный итог</text>
          <text x="159" y="130" text-anchor="middle" font-size="14" fill="#ffe9c9">нечётная сумма → нечётный итог</text></g>
        </svg>`)+
        wkSml('итог предсказан по одной лишь чётности начальной суммы'));
    } else if(step===11){
      const sets=[
        {n:'1, 2, 3, 4', sum:10, vals:[1,2,3,4]},
        {n:'1, 2, 3, 4, 5', sum:15, vals:[1,2,3,4,5]},
        {n:'3, 5, 7, 9', sum:24, vals:[3,5,7,9]},
        {n:'1, 1, 1, 1, 1', sum:5, vals:[1,1,1,1,1]}
      ];
      const S=sets[st.set%sets.length];
      h=wkFrame(wkBig('Тренажёр: предскажи итог')+
        wkHero(tileRow(S.vals,{y:18,tw:50,extra:0,fs:26}))+
        (st.show
          ? wkAns('сумма '+S.sum+' — '+(S.sum%2===0?'чётная':'нечётная')+' → итог '+(S.sum%2===0?'чётный':'нечётный'), S.sum%2===0? I.green:I.red)
          : wkRow(wkBtn('посчитать сумму',`visW398Act('${lk}','show')`)))+
        (st.show? wkRow(wkBtn('другой набор',`visW398Act('${lk}','n')`),wkBtn('заново',`visW398Act('${lk}','rst')`)):'')+
        wkSml('играть не нужно — чётность суммы всё решает'));
    } else {
      h=wkFrame(wkBig('Проверь себя')+
        wkHero(tileRow([1,2,3,4],{y:18,tw:52,extra:0,fs:26}))+
        quiz(lk,st)+
        wkSml('сумма 10 чётная и сохраняется → итог чётный'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[398]=visW398;
  function visW398T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW398T=visW398T;
  function visW398Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.h=(st.h||0)+1;
    if(act==='show') st.show=1;
    if(act==='show') st.show=1;
    if(act==='n'){ st.set=(st.set||0)+1; st.show=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW398Act=visW398Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===398){ window.ARH_LESSONS[i]=L398; break; } } })();
})();
/* ================= УРОК 22 · Периметр фигур на клетках (v2, 13 слайдов, крупные SVG-сетки, без эмодзи) ================= */
(function(){
  if(!window.__wk22v2css){
    window.__wk22v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .m2in{animation:m2In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes m2In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .m2pop{animation:m2Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m2Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .m2edge{stroke-dasharray:7 5;animation:m2Edge .7s linear infinite;}'+
      '@keyframes m2Edge{to{stroke-dashoffset:-24}}'+
      '#lvis .m2seg{opacity:0;animation:m2Seg .4s ease forwards;}'+
      '@keyframes m2Seg{to{opacity:1}}'+
      '#lvis .m2bump{animation:m2Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m2Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}';
    document.head.appendChild(st);
  }
  const L22 = {
    id: 22, title: 'Периметр фигур на клетках', ico: '▭',
    src: 'Математика · 5 класс · Периметр фигур на клетчатой бумаге', subj: 'math',
    explain: [
      'Периметр фигуры на клетчатой бумаге — это длина её границы. Каждая клетка — квадратик со стороной 1. Чтобы найти периметр, считаем внешние стороны клеток — те, что смотрят наружу.',
      'Начнём с одной клетки: у неё 4 стороны по 1. Периметр одной клетки равен 4. Запомни: сторона клетки = 1 единица.',
      'Полоска 1×5: пять клеток в ряд. Сверху 5 сторон, снизу 5, слева 1 и справа 1. Итого 5+5+1+1 = 12. Проверь по рисунку: граница светится!',
      'Прямоугольник 3×4 клетки: формула P = 2·(a+b). Здесь a=3, b=4: 2·(3+4) = 2·7 = 14. Длина границы — как в задачке!',
      'Квадрат 5×5: все стороны равны, P = 4·a = 4·5 = 20. Тоже как в задачке!',
      'Смотри не перепутай: площадь — сколько клеток ВНУТРИ фигуры (3×4 = 12 клеток), а периметр — длина границы (14). Площадь в клетках, периметр в единицах длины.',
      'Две клетки в ряд: общая внутренняя сторона границей НЕ считается — она спрятана между клетками. Внешних сторон: 4 + 4 − 2 = 6.',
      'Уголок Г из 3 клеток: клетки соприкасаются двумя сторонами. Периметр: 4·3 − 2·2 = 12 − 4 = 8. Обойди границу пальцем — получится 8.',
      'Универсальный способ — обойти границу шагами. Квадрат 3×3: идём 3 вниз, 3 вправо, 3 вверх, 3 влево — всего 12 шагов. Каждый шаг — одна сторона клетки.',
      'Буква Т из 5 клеток: фигура не прямоугольная, но приём тот же. N = 5 клеток, общих сторон S = 4: P = 4·5 − 2·4 = 20 − 8 = 12.',
      'Выемка в фигуре: клетка «вдавлена» — граница огибает её и становится длиннее. N = 5, S = 5: P = 20 − 10 = 10. Формула не подводит!',
      'Дырка внутри фигуры — это вторая граница! У квадрата 4×4 с дыркой 2×2: внешняя граница 16, граница дырки 8, всего P = 24.',
      'Проверь себя: периметр полоски 1×5 равен 12, а прямоугольника 3×4 — 14. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Периметр полоски 1×5 клеток?', choices: ['6', '10', '12', '20'], ans: 2,
      exp: '2·(1+5) = 12.' },
    tasks: [
      { q: 'Периметр прямоугольника 3×4 клетки?', kind: 'unit', ans: 14, tol: 0,
        hints: ['P = 2·(a+b)', '2·(3+4) = 14.'], sol: '2·(3+4) = 14.' },
      { q: 'Периметр квадрата 5×5 клеток?', kind: 'unit', ans: 20, tol: 0,
        hints: ['P = 4·a', '4·5 = 20.'], sol: '4·5 = 20.' }
    ]
  };
  const M={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',cell:'#6fb7e8',cellD:'#549bcb',net:'rgba(18,52,80,.4)'};
  /* рисуем клетчатую фигуру по маске + подсвечиваем внешние стороны (периметр)
     mask: массив строк: '#' клетка, '.' пусто. out=1 — показать внешние стороны сразу. */
  function fig(mask,opt){
    const o=opt||{};
    const cell=o.cell||30;
    const R=mask.length, C=mask[0].length;
    const W=318, totalW=C*cell, x0=Math.round((W-totalW)/2);
    const H=o.h||(R*cell);
    let cells='', outer='', inner='', grid='';
    for(let r=0;r<R;r++)for(let c=0;c<C;c++){
      if(mask[r][c]!=='#') continue;
      const x=x0+c*cell, y=r*cell;
      cells+=`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${M.cell}" opacity=".92"/>`;
      grid+=`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="none" stroke="${M.net}" stroke-width="1"/>`;
      // соседи: внешняя сторона если за краем или рядом пусто
      const sides=[[0,-1,'U'],[0,1,'D'],[-1,0,'L'],[1,0,'R']];
      sides.forEach((s)=>{
        const nr=r+s[0], nc=c+s[1];
        const outside = nr<0||nr>=R||nc<0||nc>=C;
        const isOuterEdge = outside || mask[nr][nc]!=='#';
        if(!isOuterEdge) return;
        const kind = outside ? 'o' : 'i'; // o — внешняя, i — внутренняя (дырка/выемка)
        const lx=x, ly=y, rx=x+cell, ry=y+cell;
        const p1 = s[2]==='U'? [lx,ly,rx,ly] : s[2]==='D'? [lx,ry,rx,ry] : s[2]==='L'? [lx,ly,lx,ry] : [rx,ly,rx,ry];
        const col = kind==='o' ? M.gold : (o.innerCol||M.red);
        const cls = (kind==='o') ? 'm2seg' : 'm2seg';
        const delay = o.d0!=null ? o.d0 : 0.08;
        const seg = `<line class="${cls}" style="animation-delay:${(delay+(o.idx||0)*0.03).toFixed(2)}s" x1="${p1[0]}" y1="${p1[1]}" x2="${p1[2]}" y2="${p1[3]}" stroke="${col}" stroke-width="4.2" stroke-linecap="butt"/>`;
        if(kind==='o') outer+=seg; else inner+=seg;
        o.idx=(o.idx||0)+1;
      });
    }
    const reveal = o.reveal!==undefined ? o.reveal : 1;
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <rect x="${x0-4}" y="-2" width="${totalW+8}" height="${H+4}" fill="rgba(8,20,30,.35)" rx="8"/>
      ${cells}${grid}${reveal? outer:''}${reveal? inner:''}
    </svg>`;
  }
  /* периметр фигуры по маске */
  function perim(mask){
    const R=mask.length, C=mask[0].length; let p=0;
    for(let r=0;r<R;r++)for(let c=0;c<C;c++){
      if(mask[r][c]!=='#')continue;
      for(const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]]){
        const nr=r+dr,nc=c+dc;
        if(nr<0||nr>=R||nc<0||nc>=C||mask[nr][nc]!=='#') p++;
      }
    }
    return p;
  }
  const big=(t)=>`<div class="m2in" style="font-size:17px;color:#fff;font-weight:bold;text-align:center;line-height:1.3">${t}</div>`;
  const ans=(t,c)=>`<div class="wk-ans" style="color:${c||'#8fd1a8'}">${t}</div>`;
  const note=(t)=>`<div style="font-size:12.5px;color:#9ec0a8;text-align:center;line-height:1.5;max-width:300px">${t}</div>`;
  const sign=(t,c,delay)=>`<span class="m2in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2px solid ${c||'#ffd76a'};font-family:Georgia,serif;font-size:21px;color:${c||'#ffd76a'};font-weight:bold">${t}</span>`;
  const Q22=[
    {q:'Периметр полоски 1×5 клеток?',opts:['6','10','12','20'],ans:2},
    {q:'Периметр прямоугольника 3×4 клетки?',opts:['10','12','14','24'],ans:2}
  ];
  function quiz(lk,st){
    const T=Q22[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?M.green:M.red; tc=i===T.ans?M.green:M.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:18px" onclick="visW22T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! P = 2·(3+4) = 14</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 5+5+1+1 = 12</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сосчитай внешние стороны клеток</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW22Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW22Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW22(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0){ st.sh=0; } if(step===2){ st.sh=0; } if(step===6){ st.sh=0; } if(step===8){ st.sh=0; } if(step===11){ st.sh=0; } if(step===12){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      const m=['#.','##','.#','##'];
      const show=st.sh===1;
      h=wkFrame(big('Периметр — длина границы')+
        `<div class="wk-hero">${fig(m,{cell:26,reveal:1,h:104,innerCol:M.blue})}</div>`+
        `<div class="wk-row" style="gap:6px;margin-top:2px">
          <span class="m2seg" style="opacity:1;display:inline-block;padding:3px 10px;border-radius:8px;border:2px solid #ffd76a;font-size:12px;color:#ffd76a">золото — граница</span>
          <span class="m2seg" style="animation-delay:.2s;opacity:1;display:inline-block;padding:3px 10px;border-radius:8px;border:2px solid #7fd1ff;font-size:12px;color:#7fd1ff">синее — углубления</span>
        </div>`+
        note('каждая клетка — квадрат со стороной 1 · периметр = внешние стороны клеток')+
        (show? ans('это фигура-змейка: её границу мы и будем считать!',M.green):'')+
        `<div class="wk-row">${show? wkBtn('сброс',`visW22Act('${lk}','rst')`) : wkBtn('показать границу',`visW22Act('${lk}','go')`)}</div>`);
    } else if(step===1){
      h=wkFrame(big('Одна клетка')+
        `<div class="wk-hero">${fig(['#'],{cell:34,h:34})}</div>`+
        `<div class="wk-row">${sign('P = 4',M.green,0.3)}</div>`+
        note('4 внешние стороны по 1 · сторона клетки = 1 единица'));
    } else if(step===2){
      const show=st.sh===1;
      h=wkFrame(big('Полоска 1×5')+
        `<div class="wk-hero">${fig(['#####'],{cell:34,h:34,reveal:show?1:0})}</div>`+
        (show
          ? `<div class="wk-row">${sign('5',M.gold,0)}<span style="color:#9ec0a8;font-size:18px">+</span>${sign('5',M.gold,.08)}<span style="color:#9ec0a8;font-size:18px">+</span>${sign('1',M.gold,.16)}<span style="color:#9ec0a8;font-size:18px">+</span>${sign('1',M.gold,.24)}</div>`+ans('P = 12',M.green)
          : `<div class="wk-row">${wkBtn('показать границу',`visW22Act('${lk}','go')`)}</div>`)+
        note(show?'сверху 5 сторон, снизу 5, слева и справа по 1':'пять клеток в ряд — где граница?'));
    } else if(step===3){
      const m=['####','####','####'];
      h=wkFrame(big('Прямоугольник 3×4')+
        `<div class="wk-hero">${fig(m,{cell:30,h:90})}</div>`+
        `<div class="wk-row"><span class="m2in" style="display:inline-block;font-size:14px;color:#8fd1a8;font-weight:bold">длина 4 · ширина 3</span></div>`+
        `<div class="wk-row">${sign('P = 2·(3+4) = 14',M.green,0.2)}</div>`+
        note('две длины и две ширины: 4+3+4+3 = 14'));
    } else if(step===4){
      const m=['#####','#####','#####','#####','#####'];
      h=wkFrame(big('Квадрат 5×5')+
        `<div class="wk-hero">${fig(m,{cell:26,h:130})}</div>`+
        `<div class="wk-row">${sign('P = 4·5 = 20',M.green,0.3)}</div>`+
        note('все 4 стороны по 5 · 4 стороны × 5 = 20'));
    } else if(step===5){
      const m=['####','####','####'];
      h=wkFrame(big('Не путай с площадью!')+
        `<div class="wk-hero" style="position:relative">${fig(m,{cell:30,h:90})}</div>`+
        `<div class="wk-row" style="gap:8px">
          <span class="m2in" style="display:inline-block;padding:5px 12px;border-radius:11px;border:2px solid #7fd1ff;font-size:15px;color:#7fd1ff;font-weight:bold">площадь: 3·4 = 12 клеток</span>
          <span class="m2in" style="animation-delay:.15s;display:inline-block;padding:5px 12px;border-radius:11px;border:2px solid #ffd76a;font-size:15px;color:#ffd76a;font-weight:bold">периметр: 14</span>
        </div>`+
        note('площадь — клетки ВНУТРИ, периметр — длина ГРАНИЦЫ'));
    } else if(step===6){
      const show=st.sh===1;
      h=wkFrame(big('Две клетки в ряд')+
        `<div class="wk-hero">${fig(['##'],{cell:34,h:34,reveal:1})}</div>`+
        (show
          ? `<div class="m2in" style="margin-top:2px"><svg viewBox="0 0 318 20" style="display:block;width:100%;height:auto"><rect x="${Math.round((318-68)/2)+34}" y="6" width="2" height="8" fill="#8fd1a8"/><text x="${Math.round((318-68)/2)+52}" y="15" text-anchor="middle" font-size="11" fill="#8fd1a8">общая — не граница</text></svg></div>`+ans('P = 6',M.green)
          : `<div class="wk-row">${wkBtn('где общая сторона?',`visW22Act('${lk}','go')`)}</div>`)+
        note('общая внутренняя сторона спрятана — границей она не считается'));
    } else if(step===7){
      const m=['#.','##'];
      h=wkFrame(big('Уголок Г из 3 клеток')+
        `<div class="wk-hero">${fig(m,{cell:36,h:72})}</div>`+
        `<div class="wk-row">${sign('P = 8',M.green,0.25)}</div>`+
        note('общие стороны две · N=3, S=2 → 4·3 − 2·2 = 8'));
    } else if(step===8){
      const show=st.sh===1;
      const m=['###','###','###'];
      h=wkFrame(big('Обходим границу шагами')+
        `<div class="wk-hero">${fig(m,{cell:28,h:84,reveal:show?1:0})}</div>`+
        (show
          ? `<div class="wk-row" style="gap:4px">${[1,2,3,4].map(i=>`<span class="m2seg" style="animation-delay:${(i*0.3).toFixed(2)}s;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;border:2.5px solid #ffd76a;color:#ffd76a;font-weight:bold">${i}</span>`).join('<span style="color:#9ec0a8">+</span>')}</div>`+ans('3+3+3+3 = 12 шагов',M.green)
          : `<div class="wk-row">${wkBtn('пройти по границе',`visW22Act('${lk}','go')`)}</div>`)+
        note('каждый шаг — одна внешняя сторона клетки'));
    } else if(step===9){
      const m=['###','.#.','.#.'];
      h=wkFrame(big('Буква Т из 5 клеток')+
        `<div class="wk-hero">${fig(m,{cell:28,h:84})}</div>`+
        `<div class="wk-row">${sign('P = 12',M.green,0.25)}</div>`+
        note('N=5 клеток · общих сторон S=4 → 20 − 8 = 12'));
    } else if(step===10){
      const m=['##.','###'];
      h=wkFrame(big('Выемка удлиняет границу')+
        `<div class="wk-hero">${fig(m,{cell:30,h:60})}</div>`+
        `<div class="wk-row">${sign('P = 10',M.green,0.2)}</div>`+
        note('N=5, S=5 → 20 − 10 = 10 · граница огибает выемку'));
    } else if(step===11){
      const show=st.sh===1;
      const m=['####','#..#','#..#','####'];
      h=wkFrame(big('Дырка — вторая граница')+
        `<div class="wk-hero">${fig(m,{cell:28,h:112,reveal:1,innerCol:M.red})}</div>`+
        (show
          ? `<div class="wk-row" style="gap:8px">
              <span class="m2in" style="padding:5px 10px;border-radius:10px;border:2px solid #ffd76a;font-size:13.5px;color:#ffd76a;font-weight:bold">внешняя 16</span>
              <span class="m2in" style="animation-delay:.15s;padding:5px 10px;border-radius:10px;border:2px solid #ff8a7a;font-size:13.5px;color:#ff8a7a;font-weight:bold">внутренняя 8</span>
            </div>`+ans('P = 16 + 8 = 24',M.green)
          : `<div class="wk-row">${wkBtn('показать границу дырки',`visW22Act('${lk}','go')`)}</div>`)+
        note('клетки 16 − 4 = 12 · дырка добавляет свою границу 8'));
    } else {
      h=wkFrame(big('Проверь себя: периметр на клетках')+
        `<div class="wk-hero">${fig(['#####'],{cell:28,h:28})}</div>`+
        quiz(lk,st)+
        note('полоска 1×5 → 12 · прямоугольник 3×4 → 14 · квадрат 5×5 → 20'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[22]=visW22;
  function visW22T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW22T=visW22T;
  function visW22Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW22Act=visW22Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===22){ window.ARH_LESSONS[i]=L22; break; } } })();
})();
/* ================= УРОК 44 · Проценты: находим число (v2 · «Звёздная обсерватория», 14 слайдов) ================= */
(function(){
  if(!window.__wk44v2css){
    window.__wk44v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .z2in{animation:z2In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes z2In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .z2pop{animation:z2Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes z2Pop{0%{transform:scale(.15);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .z2tw{animation:z2Tw 2.2s ease-in-out infinite;}'+
      '@keyframes z2Tw{0%,100%{opacity:.35}50%{opacity:1}}'+
      '#lvis .z2met{animation:z2Met 1.5s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes z2Met{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg)}}'+
      '#lvis .z2spin{animation:z2Spin 4s linear infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes z2Spin{to{transform:rotate(360deg)}}'+
      '#lvis .z2shoot{animation:z2Shoot 3.4s ease-in infinite;}'+
      '@keyframes z2Shoot{0%{transform:translate(0,0);opacity:0}8%{opacity:1}22%{transform:translate(-90px,55px);opacity:1}24%{opacity:0}100%{transform:translate(-90px,55px);opacity:0}}'+
      '#lvis .z2bump{animation:z2Bump .8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes z2Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}'+
      '#lvis .z2rise{animation:z2Rise 1s cubic-bezier(.2,.8,.2,1) both;}'+
      '@keyframes z2Rise{from{transform:scaleY(0)}to{transform:scaleY(1)}}';
    document.head.appendChild(st);
  }
  const L44 = {
    id: 44, title: 'Проценты: находим число', ico: '%',
    src: 'Математика · 5 класс · Проценты: процент от числа', subj: 'math',
    explain: [
      'Над островом опустилась ночь, и Архимед поднялся в свою башню-обсерваторию. Сегодня он картографирует звёздное небо. Чтобы считать звёзды, Архимед пользуется процентами — ведь процент означает «сотая часть»: 1% = 1/100, а вся величина — это 100%.',
      'Представь небесную сетку Архимеда: ровно 100 звёзд в квадрате 10 на 10. Каждая звезда — это одна сотая, то есть 1%. Все 100 звёзд — это 100%. Теперь любое число звёзд легко превратить в проценты!',
      'Если звёзд больше ста, мы просто делим их на сотни. Например, 300 звёзд — это три сотенных квадрата: 300 = 3·100. Одна звезда из трёхсот — это всё равно 1%, ведь 1% — это «одна сотая», 300 : 100 = 3.',
      'Найти 1% от числа очень просто: раздели число на 100. 1% от 300 — это 300 : 100 = 3. 1% от 500 — это 5. 1% от 80 — это 80 : 100 = 0,8 (меньше единицы — бывает и так!).',
      'Теперь легко найти любой процент: сначала найди 1%, потом умножь на нужное число процентов. Например, 10% от 300: сначала 1% = 300 : 100 = 3, затем умножаем на 10: 3·10 = 30.',
      'Разберём 10% от 300 на звёздной сетке. Триста звёзд — это три сотенных квадрата. 10% — это одна десятая часть, то есть один ряд из десяти звёзд в каждом квадрате. В трёх квадратах: 10 + 10 + 10 = 30 звёзд. Ответ: 30!',
      'Запомни удобные доли — они встречаются чаще всего. 50% — это половина (делим на 2), 25% — четверть (делим на 4), 20% — пятая часть (делим на 5), 10% — десятая часть (делим на 10).',
      '25% от 80: четверть от 80 — это 80 : 4 = 20. Проверим на звёздах: восемьдесят звёзд — это 8 рядов по 10. Четверть — это 2 ряда, а в них 20 звёзд. Сходится!',
      '20% от 500: пятая часть от 500 — это 500 : 5 = 100. Или по-другому: 1% от 500 = 5, умножаем на 20 → 5·20 = 100. Два способа дают один ответ — выбирай, какой удобнее!',
      'Проценты повсюду: скидки в магазинах. Если вещь стоит 500 монет, а скидка 20% — мы экономим пятую часть: 500 : 5 = 100 монет. Платим 500 − 100 = 400.',
      'Теперь потренируйся на звёздной сетке: перед тобой сотенный квадрат. Выбери, сколько процентов зажечь, — и посмотри, сколько звёзд вспыхнет. 10% — это ряд из 10 звёзд, 20% — два ряда, 25% — четверть квадрата.',
      'Формула-помощник: чтобы найти p% от числа N, сделай два шага: 1) найди 1%: N : 100; 2) умножь на p. Запиши кратко: (N : 100) · p. Попробуй сам на тренажёре!',
      'Тренажёр: тебе дадут число и процент. Шаг 1 — найди 1% (раздели на 100). Шаг 2 — умножь на число процентов. Нажимай кнопки и проверяй ответ!',
      'Проверь себя: 10% от 300 — это 30 (сначала 300 : 100 = 3, потом 3·10). 20% от 500 — это 100. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Сколько будет 10% от 300?', choices: ['3', '30', '300', '15'], ans: 1,
      exp: '300 : 100 · 10 = 30.' },
    tasks: [
      { q: 'Найди 20% от 500.', kind: 'unit', ans: 100, tol: 0,
        hints: ['20% — это 1/5.', '500 : 5 = 100.'], sol: '500 · 0,2 = 100.' },
      { q: 'Найди 25% от 80.', kind: 'unit', ans: 20, tol: 0,
        hints: ['25% — это 1/4.', '80 : 4 = 20.'], sol: '80 · 0,25 = 20.' }
    ]
  };
  const Z={gold:'#ffd76a',star:'#fff2c2',dim:'#5b6d9e',night1:'#101a3a',night2:'#1d2c5c',moon:'#e9e2c4',green:'#7fe8b8',blue:'#7fd1ff',red:'#ff9a8a',lens:'#9fd8ff'};
  /* ночное небо: рамка-обсерватория с фоном-звёздами */
  function night(inner,opt){
    const o=opt||{};
    const W=318, H=o.h||150;
    let bg='';
    for(let i=0;i<26;i++){
      const x=8+(i*37)%302, y=8+((i*53)%(H-18));
      bg+=`<circle cx="${x}" cy="${y}" r="${i%3===0?1.6:1.1}" fill="${i%4===0?Z.star:Z.dim}" opacity="${i%4===0?'.9':'.5'}" class="z2tw" style="animation-delay:${(i*0.18).toFixed(2)}s"/>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs><linearGradient id="z2sky${o.uid||0}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${Z.night1}"/><stop offset="1" stop-color="${Z.night2}"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#z2sky${o.uid||0})"/>
      ${bg}
      <rect x="1" y="1" width="${W-2}" height="${H-2}" fill="none" stroke="#3d5a8c" stroke-width="1.6" rx="14"/>
      ${inner}
    </svg>`;
  }
  /* сотенный квадрат 10×10: lit — сколько первых звёзд зажжено */
  function starGrid(lit,opt){
    const o=opt||{};
    const cell=o.cell||24;
    const W=10*cell, H=10*cell;
    const R=Math.max(1.8,cell*0.16);
    let s='';
    for(let r=0;r<10;r++)for(let c=0;c<10;c++){
      const idx=r*10+c;
      const on=idx<lit;
      const x=c*cell+cell/2, y=r*cell+cell/2;
      if(on){
        s+=`<g class="z2tw" style="animation-delay:${((idx%10)*0.12).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="${R*1.8}" fill="${Z.gold}"/><circle cx="${x}" cy="${y}" r="${R*0.9}" fill="#fff"/></g>`;
      } else {
        s+=`<circle cx="${x}" cy="${y}" r="${R*0.85}" fill="${Z.dim}" opacity=".5"/>`;
      }
    }
    s+=`<rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${o.stroke||'#4a5f8f'}" stroke-width="2" rx="6"/>`;
    // сетка десятков (каждый 10-й столбец/строка тоньше)
    for(let i=1;i<10;i++){
      s+=`<line x1="${i*cell}" y1="0" x2="${i*cell}" y2="${H}" stroke="rgba(255,255,255,.05)" stroke-width="1"/>`;
    }
    return {svg:`<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">${s}</svg>`,W,H};
  }
  const pill=(t,c,delay,fs)=>`<span class="z2in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const chipT=(t,c)=>`<span class="z2in" style="display:inline-block;padding:4px 12px;border-radius:10px;border:1.8px solid ${c||'#4a5f8f'};font-size:14px;color:#e8e0cc">${t}</span>`;
  const Q44=[
    {q:'Сколько будет 10% от 300?',opts:['3','30','300','15'],ans:1},
    {q:'Сколько будет 25% от 80?',opts:['4','20','25','40'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q44[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?Z.green:Z.red; tc=i===T.ans?Z.green:Z.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:18px" onclick="visW44T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 25% — это четверть: 80 : 4 = 20</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 300 : 100 = 3, затем 3·10 = 30</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сначала найди 1% (раздели на 100)</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW44Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW44Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW44(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===0){ st.sh=0; } if(step===2||step===3){ st.n=0; } if(step===4){ st.sh=0; } if(step===5){ st.sh=0; } if(step===8){ st.sh=0; } if(step===10){ if(st.p==null) st.p=10; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      const show=st.sh===1;
      const g=starGrid(0,{cell:16});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ночь над обсерваторией Архимеда</div>`+
        wkHero(night(show
          ? `<g transform="translate(${Math.round((318-160)/2)},34)">${g.svg.replace('<svg','<svg width="160" height="160"')}</g>
             <text x="159" y="208" text-anchor="middle" font-size="13" fill="#cfe0ff">100 звёзд = 100%</text>
             <g class="z2pop" style="animation-delay:.3s"><rect x="10" y="10" width="298" height="200" fill="none" stroke="#7fd1ff" stroke-width="2" rx="16" opacity=".45"/></g>`
          : `<g>
              <path d="M34 220 L34 100 A84 84 0 0 1 202 100 L202 220 Z" fill="rgba(255,255,255,.02)" stroke="#5b6d9e" stroke-width="2.2"/>
              <path d="M34 100 A84 84 0 0 1 202 100" fill="none" stroke="#8fa4d8" stroke-width="4.5"/>
              <circle cx="112" cy="58" r="14" fill="${Z.moon}"/><circle cx="120" cy="53" r="12" fill="#15224c" opacity=".5"/>
              <g class="z2tw" style="animation-delay:0s"><circle cx="78" cy="120" r="2.4" fill="#fff2c2"/></g>
              <g class="z2tw" style="animation-delay:.6s"><circle cx="156" cy="150" r="2" fill="#fff2c2"/></g>
              <g class="z2tw" style="animation-delay:1.1s"><circle cx="128" cy="128" r="2.6" fill="#fff2c2"/></g>
              <g class="z2tw" style="animation-delay:.3s"><circle cx="180" cy="118" r="1.8" fill="#fff2c2"/></g>
              <g class="z2tw" style="animation-delay:.9s"><circle cx="92" cy="160" r="2.2" fill="#fff2c2"/></g>
              <g class="z2pop" style="animation-delay:.4s"><rect x="52" y="166" width="134" height="36" rx="12" fill="rgba(255,242,194,.08)" stroke="#ffd76a" stroke-width="2"/>
              <text x="119" y="189" text-anchor="middle" font-size="16" fill="#ffe9c9" font-weight="bold">что такое 1%?</text></g>
              <g class="z2pop" style="animation-delay:.55s">
                <rect x="228" y="152" width="60" height="11" rx="4" fill="#3a2b16"/>
                <rect x="237" y="163" width="6.5" height="34" fill="#5a452a"/><rect x="271" y="163" width="6.5" height="34" fill="#5a452a"/>
                <rect x="250" y="122" width="17" height="42" rx="6" fill="#9fd8ff" stroke="#5b6d9e" stroke-width="2"/>
                <rect x="267" y="108" width="38" height="13" rx="6" fill="#7fb7e8"/>
                <line x1="226" y1="120" x2="250" y2="120" stroke="#7fb7e8" stroke-width="5"/>
                <line x1="196" y1="132" x2="236" y2="120" stroke="#7fb7e8" stroke-width="3" opacity=".85"/>
                <circle cx="232" cy="119" r="3.2" fill="#fff"/></g>
            </g>`,{h:232}))+
        (show? wkRow(pill('1% = одна сотая',Z.gold,0.4)): wkRow(wkBtn('открыть купол',`visW44Act('${lk}','go')`)))+
        wkSml('процент — «сотая часть» · вся величина — 100%'));
    } else if(step===1){
      const g=starGrid(1,{cell:26});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Небесная сетка: 10 × 10</div>`+
        wkHero(night(`<g transform="translate(${Math.round((318-260)/2)},10)">${g.svg.replace('<svg','<svg width="260" height="260"')}</g>`,{h:282}))+
        wkRow(pill('1 звезда из 100 = 1%',Z.gold,0.5))+
        wkSml('десять рядов по десять звёзд · каждая клетка — 1%'));
    } else if(step===2){
      const g=starGrid(10,{cell:24});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ряд из десяти звёзд</div>`+
        wkHero(night(`<g transform="translate(${Math.round((318-240)/2)},16)">${g.svg.replace('<svg','<svg width="240" height="240"')}</g>`,{h:274}))+
        wkRow(pill('10 звёзд — это 10%',Z.green,0.4),pill('50 звёзд — 50%',Z.gold,0.55))+
        wkSml('десять звёзд подряд — одна десятая квадрата'));
    } else if(step===3){
      const sets=[{N:300,p:1,one:3},{N:500,p:1,one:5},{N:80,p:1,one:0.8}];
      const S=sets[st.n%sets.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">1% от числа: делим на 100</div>`+
        wkHero(night(`<g class="z2pop">
          <rect x="26" y="34" width="96" height="86" rx="16" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="74" y="70" text-anchor="middle" font-size="15" fill="#cfe0ff">число</text>
          <text x="74" y="104" text-anchor="middle" font-size="44" fill="#fff" font-weight="bold" font-family="Georgia,serif">${S.N}</text>
          <text x="74" y="112" text-anchor="middle" font-size="0" fill="#fff"> </text>
          <g class="z2spin"><rect x="132" y="56" width="34" height="34" rx="8" fill="rgba(255,255,255,.06)" stroke="#ffd76a" stroke-width="2"/>
          <circle cx="149" cy="73" r="3" fill="#ffd76a"/><line x1="149" y1="60" x2="149" y2="66" stroke="#ffd76a" stroke-width="2"/></g>
          <text x="160" y="76" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">:</text>
          <text x="196" y="76" text-anchor="middle" font-size="20" fill="#cfe0ff" font-weight="bold">100</text>
          ${st.sh? `<g class="z2pop"><rect x="220" y="34" width="80" height="86" rx="16" fill="rgba(255,242,194,.08)" stroke="${Z.gold}" stroke-width="2.6"/>
            <text x="260" y="70" text-anchor="middle" font-size="15" fill="#ffe9c9">1% =</text>
            <text x="260" y="106" text-anchor="middle" font-size="42" fill="${Z.gold}" font-weight="bold" font-family="Georgia,serif">${S.one}</text></g>`:''}
        </g>`,{h:150}))+
        wkRow(st.sh===1? '' : wkBtn('разделить на 100',`visW44Act('${lk}','go')`))+
        (st.sh===1? wkRow(pill(S.N+' : 100 = '+S.one+' → это 1%',Z.gold,0.2)):'')+
        wkRow(wkBtn('другое число',`visW44Act('${lk}','n')`), st.sh===1? wkBtn('сброс',`visW44Act('${lk}','rst')`):'')+
        wkSml('1% — это «одна сотая»: дели число на 100'));
    } else if(step===4){
      const show=st.sh===1;
      const g=starGrid(show?30:0,{cell:17});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">10% от 300</div>`+
        wkHero(night(`<g transform="translate(${Math.round((318-340)/2)},14) scale(0.9)">${g.svg.replace('<svg','<svg width="170" height="170"')}</g>
          <text x="70" y="200" text-anchor="middle" font-size="14" fill="#cfe0ff">квадрат 1</text>
          <text x="170" y="200" text-anchor="middle" font-size="14" fill="#cfe0ff">квадрат 2</text>
          <text x="270" y="200" text-anchor="middle" font-size="14" fill="#cfe0ff">квадрат 3</text>`,{h:210}))+
        (show? wkRow(pill('30 звёзд в трёх квадратах = 10% от 300',Z.green,0.3)):'')+
        wkRow(show===false? wkBtn('зажечь 10% в каждом квадрате',`visW44Act('${lk}','go')`) : wkBtn('сброс',`visW44Act('${lk}','rst')`))+
        wkSml('300 = 3 квадрата по 100 · в каждом зажглось 10 звёзд (10+10+10)'));
    } else if(step===5){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Два шага: 10% от 300</div>`+
        wkHero(night(`<g class="z2pop">
          <rect x="18" y="22" width="120" height="54" rx="14" fill="rgba(127,209,255,.1)" stroke="${Z.blue}" stroke-width="2.4"/>
          <text x="78" y="42" text-anchor="middle" font-size="13" fill="#cfe0ff">шаг 1 · 1%</text>
          <text x="78" y="66" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold" font-family="Georgia,serif">300 : 100 = 3</text>
          <g class="z2shoot"><line x1="252" y1="6" x2="252" y2="30" stroke="#fff2c2" stroke-width="2"/><circle cx="252" cy="4" r="3" fill="#fff2c2"/></g>
          <rect x="180" y="22" width="120" height="54" rx="14" fill="rgba(255,242,194,.08)" stroke="${Z.gold}" stroke-width="2.4"/>
          <text x="240" y="42" text-anchor="middle" font-size="13" fill="#ffe9c9">шаг 2 · ×10</text>
          <text x="240" y="66" text-anchor="middle" font-size="28" fill="${Z.gold}" font-weight="bold" font-family="Georgia,serif">3 · 10 = 30</text>
          <rect x="70" y="96" width="180" height="38" rx="16" fill="rgba(127,232,184,.1)" stroke="${Z.green}" stroke-width="2.4"/>
          <text x="160" y="121" text-anchor="middle" font-size="19" fill="${Z.green}" font-weight="bold" font-family="Georgia,serif">10% от 300 = 30</text>
        </g>`,{h:150}))+
        (sh? `<div class="z2pop">${starGrid(30,{cell:10}).svg}</div>`:'')+
        wkRow(wkBtn('показать формулу ещё раз',`visW44Act('${lk}','go')`), sh? wkBtn('сброс',`visW44Act('${lk}','rst')`):'')+
        wkSml('сначала 1% (число : 100), потом умножаем на проценты'));
    } else if(step===6){
      const rows=[
        {p:50,label:'половина',d:2,ex:'80 : 2 = 40'},
        {p:25,label:'четверть',d:4,ex:'80 : 4 = 20'},
        {p:20,label:'пятая часть',d:5,ex:'500 : 5 = 100'},
        {p:10,label:'десятая часть',d:10,ex:'300 : 10 = 30'}
      ];
      const cards=rows.map((r,i)=>`<div class="z2in" style="animation-delay:${(i*0.15).toFixed(2)}s;flex:1 1 0;min-width:0;text-align:center;border:2px solid ${i%2?Z.gold:Z.blue};border-radius:14px;padding:7px 4px;background:rgba(255,255,255,.04)">
        <div style="font-size:24px;color:${i%2?Z.gold:Z.blue};font-weight:bold;font-family:Georgia,serif">${r.p}%</div>
        <div style="font-size:12.5px;color:#e8e0cc;margin:2px 0">${r.label}</div>
        <div style="font-size:11.5px;color:#9fb0d0">делим на ${r.d}</div>
        <div style="font-size:12px;color:#7fe8b8;margin-top:2px;font-weight:bold">${r.ex}</div>
      </div>`).join('');
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Удобные доли</div>`+
        wkHero(night(`<g class="z2pop"><text x="159" y="40" text-anchor="middle" font-size="15" fill="#fff">запомни эти доли</text>
          <circle cx="70" cy="96" r="30" fill="${Z.gold}" opacity=".9"/><text x="70" y="104" text-anchor="middle" font-size="20" fill="#0d1a13" font-weight="bold">50%</text>
          <text x="70" y="122" text-anchor="middle" font-size="12" fill="#cfe0ff">1/2</text>
          <circle cx="159" cy="96" r="30" fill="${Z.blue}" opacity=".9"/><text x="159" y="104" text-anchor="middle" font-size="20" fill="#0d1a13" font-weight="bold">25%</text>
          <text x="159" y="122" text-anchor="middle" font-size="12" fill="#cfe0ff">1/4</text>
          <circle cx="248" cy="96" r="30" fill="${Z.green}" opacity=".9"/><text x="248" y="104" text-anchor="middle" font-size="20" fill="#0d1a13" font-weight="bold">20%</text>
          <text x="248" y="122" text-anchor="middle" font-size="12" fill="#cfe0ff">1/5</text>
        </g>`,{h:160}))+
        `<div class="wk-row" style="gap:6px;align-items:stretch">${cards}</div>`+
        wkSml('50% — половина · 25% — четверть · 20% — пятая часть · 10% — десятая'));
    } else if(step===7){
      const sh=st.sh||0;
      // 80 звёзд = 8 рядов по 10; 25% = 2 ряда = 20
      const g80=(lit)=>{
        const cell=15; let s='';
        for(let r=0;r<8;r++)for(let c=0;c<10;c++){
          const idx=r*10+c; const on=idx<lit;
          const x=c*cell+cell/2+4, y=r*cell+cell/2+4;
          s+=on?`<g class="z2tw" style="animation-delay:${((idx%10)*0.1).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="${cell*0.3}" fill="${Z.gold}"/><circle cx="${x}" cy="${y}" r="${cell*0.15}" fill="#fff"/></g>`
              :`<circle cx="${x}" cy="${y}" r="${cell*0.22}" fill="${Z.dim}" opacity=".6"/>`;
        }
        return s;
      };
      h=wkFrame(`<div class="wk-big" style="font-size:18px">25% от 80 — четверть</div>`+
        wkHero(night(`<rect x="4" y="10" width="312" height="126" rx="10" fill="rgba(0,0,0,.2)"/>
          ${g80(sh?20:0)}
          <line x1="30" y1="${10+2*15+15/2}" x2="300" y2="${10+2*15+15/2}" stroke="#ff9a8a" stroke-width="2.5" stroke-dasharray="6 5"/>
          <text x="159" y="150" text-anchor="middle" font-size="13" fill="#cfe0ff">80 звёзд = 8 рядов по 10</text>`,{h:160}))+
        (sh? wkRow(pill('2 ряда = 20 звёзд = 25% от 80',Z.green,0.3)):'')+
        wkRow(sh===0? wkBtn('отделить четверть (2 ряда)',`visW44Act('${lk}','go')`) : wkBtn('сброс',`visW44Act('${lk}','rst')`))+
        wkSml('80 : 4 = 20 · 25% — это каждая четвёртая звезда'));
    } else if(step===8){
      const sh=st.sh||0;
      const g=starGrid(sh?20:0,{cell:9});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">20% от 500 — пятая часть</div>`+
        wkHero(night(`<text x="159" y="20" text-anchor="middle" font-size="13" fill="#cfe0ff">500 = пять сотенных квадратов</text>
          <g transform="translate(${Math.round((318-5*92)/2)},30) scale(0.92)">
            ${[0,1,2,3,4].map(i=>`<g transform="translate(${i*92},0)">${g.svg.replace('<svg','<svg width="90" height="90"')}</g>`).join('')}
          </g>
          ${sh? `<text x="159" y="162" text-anchor="middle" font-size="15" fill="#7fe8b8" font-weight="bold">5 × 20 = 100 звёзд</text>`:''}
        `,{h:180}))+
        (sh? wkRow(pill('500 : 5 = 100',Z.green,0.3)):'')+
        wkRow(sh===0? wkBtn('зажечь 20% в каждом квадрате',`visW44Act('${lk}','go')`) : wkBtn('сброс',`visW44Act('${lk}','rst')`))+
        wkSml('в каждом квадрате по 20 звёзд · пять квадратов → 100'));
    } else if(step===9){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Два способа — один ответ</div>`+
        wkHero(night(`<g class="z2pop">
          <rect x="16" y="24" width="136" height="92" rx="14" fill="rgba(127,209,255,.08)" stroke="${Z.blue}" stroke-width="2.2"/>
          <text x="84" y="44" text-anchor="middle" font-size="13" fill="#cfe0ff">способ 1 · через 1%</text>
          <text x="84" y="72" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold" font-family="Georgia,serif">500:100=5</text>
          <text x="84" y="100" text-anchor="middle" font-size="20" fill="${Z.gold}" font-weight="bold" font-family="Georgia,serif">5·20=100</text>
          <rect x="166" y="24" width="136" height="92" rx="14" fill="rgba(127,232,184,.08)" stroke="${Z.green}" stroke-width="2.2"/>
          <text x="234" y="44" text-anchor="middle" font-size="13" fill="#cfe0ff">способ 2 · через долю</text>
          <text x="234" y="72" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold" font-family="Georgia,serif">20% = 1/5</text>
          <text x="234" y="100" text-anchor="middle" font-size="20" fill="${Z.green}" font-weight="bold" font-family="Georgia,serif">500:5=100</text>
          <rect x="70" y="130" width="180" height="30" rx="14" fill="rgba(255,242,194,.1)" stroke="${Z.gold}" stroke-width="2"/>
          <text x="160" y="150" text-anchor="middle" font-size="16" fill="${Z.gold}" font-weight="bold">20% от 500 = 100</text>
        </g>`,{h:176}))+
        wkSml('каким способом ни считай — ответ один: 100'));
    } else if(step===10){
      const P=st.p||10;
      const price=500, disc=(price/100)*P, pay=price-disc;
      const g=starGrid(Math.round(disc/5),{cell:13});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Скидка в лавке звёздных товаров</div>`+
        wkHero(night(`<g class="z2pop">
          <rect x="20" y="20" width="110" height="110" rx="16" fill="rgba(255,255,255,.05)" stroke="#4a5f8f" stroke-width="2"/>
          <text x="75" y="46" text-anchor="middle" font-size="12" fill="#cfe0ff">цена</text>
          <text x="75" y="86" text-anchor="middle" font-size="40" fill="#fff" font-weight="bold" font-family="Georgia,serif">500</text>
          <text x="75" y="106" text-anchor="middle" font-size="13" fill="#9fb0d0">монет</text>
          <rect x="148" y="20" width="150" height="46" rx="12" fill="rgba(255,138,138,.1)" stroke="#ff9a8a" stroke-width="2"/>
          <text x="223" y="40" text-anchor="middle" font-size="12" fill="#ffc9bd">скидка ${P}%</text>
          <text x="223" y="60" text-anchor="middle" font-size="24" fill="#ff9a8a" font-weight="bold" font-family="Georgia,serif">− ${disc}</text>
          <rect x="148" y="82" width="150" height="46" rx="12" fill="rgba(127,232,184,.1)" stroke="${Z.green}" stroke-width="2"/>
          <text x="223" y="102" text-anchor="middle" font-size="12" fill="#cfe0ff">платим</text>
          <text x="223" y="122" text-anchor="middle" font-size="24" fill="${Z.green}" font-weight="bold" font-family="Georgia,serif">${pay}</text>
        </g>`,{h:160}))+
        wkRow(
          wkBtn('скидка 10%',`visW44Act('${lk}','p10')`),
          wkBtn('скидка 20%',`visW44Act('${lk}','p20')`),
          wkBtn('скидка 25%',`visW44Act('${lk}','p25')`))+
        wkSml('скидка 20% от 500 = 100 монет · платим 400 · нажимай, меняй скидку'));
    } else if(step===11){
      const P=st.p||10;
      const lit=P===10?10:(P===20?20:25);
      const g=starGrid(lit,{cell:22});
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Зажигай звёзды</div>`+
        wkHero(night(`<g transform="translate(${Math.round((318-220)/2)},12)">${g.svg.replace('<svg','<svg width="220" height="220"')}</g>`,{h:246}))+
        wkRow(
          wkBtn('зажечь 10%',`visW44Act('${lk}','p10')`),
          wkBtn('зажечь 20%',`visW44Act('${lk}','p20')`),
          wkBtn('зажечь 25%',`visW44Act('${lk}','p25')`))+
        (P===10? wkAns('10 звёзд = 10% из 100',Z.gold):
          P===20? wkAns('20 звёзд = 20% из 100',Z.gold):
          wkAns('25 звёзд = 25% из 100',Z.gold))+
        wkSml('10% — ряд из 10 звёзд · 25% — четверть квадрата'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[{N:300,p:10},{N:500,p:20},{N:80,p:25},{N:200,p:10},{N:400,p:50},{N:120,p:25}];
      const T=POOL[st.tr%POOL.length];
      const one=+(T.N/100).toFixed(1), res=T.N/100*T.p;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр процентов</div>`+
        wkHero(night(`<g class="z2pop">
          <rect x="40" y="30" width="120" height="70" rx="14" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="100" y="54" text-anchor="middle" font-size="13" fill="#cfe0ff">найди ${T.p}% от ${T.N}</text>
          <text x="100" y="88" text-anchor="middle" font-size="42" fill="#fff" font-weight="bold" font-family="Georgia,serif">${T.p}%</text>
          <rect x="178" y="30" width="102" height="70" rx="14" fill="rgba(255,242,194,.07)" stroke="#ffd76a" stroke-width="2.4"/>
          ${st.s1? `<text x="229" y="56" text-anchor="middle" font-size="13" fill="#ffe9c9">1% = ${T.N}:100</text>
            <text x="229" y="88" text-anchor="middle" font-size="34" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">${one}</text>`:''}
          ${st.s2? `<rect x="60" y="112" width="200" height="34" rx="15" fill="rgba(127,232,184,.1)" stroke="#7fe8b8" stroke-width="2.2"/>
            <text x="160" y="134" text-anchor="middle" font-size="17" fill="#7fe8b8" font-weight="bold">ответ: ${res}</text>`:''}
        </g>`,{h:160}))+
        wkRow(
          !st.s1? wkBtn('1 · найди 1%',`visW44Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · умножь на '+T.p,`visW44Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW44Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW44Act('${lk}','rst')`) : '')+
        wkSml('формула: (N : 100) · p — сначала 1%, потом умножение'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: проценты</div>`+
        wkHero(night(`<g class="z2pop"><text x="159" y="34" text-anchor="middle" font-size="15" fill="#fff">1% от 300 = 3</text>
          <circle cx="70" cy="86" r="26" fill="${Z.gold}" opacity=".95"/><text x="70" y="93" text-anchor="middle" font-size="17" fill="#0d1a13" font-weight="bold">10%</text><text x="70" y="110" text-anchor="middle" font-size="11" fill="#cfe0ff">=30</text>
          <circle cx="159" cy="86" r="26" fill="${Z.blue}" opacity=".95"/><text x="159" y="93" text-anchor="middle" font-size="17" fill="#0d1a13" font-weight="bold">20%</text><text x="159" y="110" text-anchor="middle" font-size="11" fill="#cfe0ff">от 500=100</text>
          <circle cx="248" cy="86" r="26" fill="${Z.green}" opacity=".95"/><text x="248" y="93" text-anchor="middle" font-size="17" fill="#0d1a13" font-weight="bold">25%</text><text x="248" y="110" text-anchor="middle" font-size="11" fill="#cfe0ff">от 80=20</text>
        </g>`,{h:150}))+
        quiz(lk,st)+
        wkSml('10% от 300 = 30 · 25% от 80 = 20 · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[44]=visW44;
  function visW44T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW44T=visW44T;
  function visW44Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='n'){ if(st.n!=null) st.n++; st.sh=0; }
    if(act==='p10') st.p=10;
    if(act==='p20') st.p=20;
    if(act==='p25') st.p=25;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW44Act=visW44Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===44){ window.ARH_LESSONS[i]=L44; break; } } })();
})();
/* ================= УРОК 87 · Сумма углов треугольника (v2 · «Мостостроительная верфь», 14 слайдов, 3D, анимированные замеры) ================= */
(function(){
  if(!window.__wk87v2css){
    window.__wk87v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .m9in{animation:m9In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes m9In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .m9pop{animation:m9Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m9Pop{0%{transform:scale(.12);opacity:0}70%{transform:scale(1.09);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .m9sw{animation:m9Sw 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom;}'+
      '@keyframes m9Sw{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(4deg)}}'+
      '#lvis .m9sun{animation:m9Sun 3.5s ease-in-out infinite;}'+
      '@keyframes m9Sun{0%,100%{opacity:.85}50%{opacity:1}}'+
      '#lvis .m9wave{animation:m9Wave 2.6s ease-in-out infinite;}'+
      '@keyframes m9Wave{0%,100%{transform:translateX(0)}50%{transform:translateX(7px)}}'+
      '#lvis .m9spin{animation:m9Spin 5s linear infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m9Spin{to{transform:rotate(360deg)}}'+
      '#lvis .m9fly{animation:m9Fly 1.4s cubic-bezier(.3,.7,.4,1) both;}'+
      '@keyframes m9Fly{0%{transform:translate(0,0) rotate(0);opacity:0}20%{opacity:1}100%{transform:translate(var(--tx),var(--ty)) rotate(var(--rot));opacity:1}}'+
      '#lvis .m9bump{animation:m9Bump .8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m9Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}'+
      '#lvis .m9dash{stroke-dasharray:7 5;animation:m9Dash .9s linear infinite;}'+
      '@keyframes m9Dash{to{stroke-dashoffset:-24}}'+
      '#lvis .m9sway{animation:m9Sway 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes m9Sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}';
    document.head.appendChild(st);
  }
  const L87 = {
    id: 87, title: 'Сумма углов треугольника', ico: '∠',
    src: 'Математика · 7 класс · Геометрия: сумма углов треугольника', subj: 'math',
    explain: [
      'На закате Архимед стоит на берегу пролива. Он строит мост — и весь мост держится на треугольных фермах. Почему именно треугольники? Сейчас ты узнаешь главный секрет любого треугольника — и мост будет стоять века!',
      'Попробуй покачать квадратную раму — она шатается из стороны в сторону! А треугольник не сдвинуть: три стороны жёстко скрепляют углы. Поэтому инженеры и выбирают треугольники для мостов и крыш.',
      'Что такое угол? Это «раствор» между двумя лучами, его измеряют в градусах. Прямой угол — 90° (угол тетрадки). Развёрнутый угол — 180°: два луча вытянулись в одну прямую линию.',
      'Самый честный треугольник — равносторонний: у него все углы по 60°. Измерим: 60° + 60° + 60° = 180°. Запомни это число — оно появится у каждого треугольника!',
      'Возьмём ферму с углами 40°, 60° и 80°. Приложим транспортир к каждому углу и аккуратно измерим — а потом сложим: 40° + 60° + 80° = 180°. Совпадение? Нет — это закон!',
      'Секрет виден на бумаге: вырежи треугольник и отрежь три угла. Сложи их рядом — они выстроятся ровно вдоль одной прямой! Три угла вместе дают развёрнутый угол — 180°.',
      'Вот и теорема: ∠A + ∠B + ∠C = 180° — сумма углов любого треугольника. Её доказали ещё в Древней Греции, и с тех пор на ней стоят все мосты и крыши мира.',
      'Если два угла известны, третий находится в одно действие: ∠3 = 180° − ∠1 − ∠2. Углы 35° и 45° → третий = 180° − 35° − 45° = 100°.',
      'Прямоугольный треугольник: один угол — 90°. Значит, на два острых угла остаётся 180° − 90° = 90°. Углы 90° и 30° → третий = 60°.',
      'Равнобедренный треугольник: углы при основании равны. Вершина 40° → на два основания остаётся 140°, значит, каждое = 140° : 2 = 70°. Как у крыши-шатра!',
      'Треугольник объёмен! Треугольная призма — это тело из двух треугольников и трёх прямоугольников. Именно такие фермы Архимед поднимает на мост. Смотри, как они встают на место!',
      'Треугольники вокруг нас: крыши домов, пирамиды, палатки, крылья самолёта. Везде инженер помнит одно: сумма углов треугольника равна 180° — иначе конструкция не сойдётся.',
      'Тренажёр: тебе дадут треугольник с двумя известными углами (или расскажут про прямоугольный или равнобедренный). Найди третий угол — и мост встанет на место!',
      'Проверь себя: углы 35° и 45° дают третий 100°. Прямоугольный с углом 30° даёт третий 60°. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'В треугольнике углы 35° и 45°. Чему равен третий угол?', choices: ['80°', '90°', '100°'], ans: 2,
      exp: '35° + 45° = 80°, третий: 180° − 80° = 100°.' },
    tasks: [
      { q: 'Один угол треугольника равен 90°, другой — 30°. Найди третий угол.', kind: 'unit', ans: 60, tol: 0,
        hints: ['Сумма углов — 180°.', '90° + 30° = 120°, остаётся 60°.'], sol: '180° − 90° − 30° = 60°.' },
      { q: 'В равнобедренном треугольнике угол при вершине равен 40°. Чему равен каждый угол при основании?', kind: 'choice', choices: ['50°', '70°', '140°'], ans: 1, tol: 0,
        hints: ['Углы при основании равны.', 'Остаётся 140° на два угла.'], sol: '(180° − 40°) : 2 = 70°.' }
    ]
  };
  const M={steel:'#8fa4d8',steelD:'#5b6d9e',gold:'#ffd76a',paper:'#f4e8c8',ink:'#2b4a8a',sky:'#ff9a5a',sun:'#ffdf9a',sea:'#2a5a8a',cream:'#f2e7c9'};
  /* закат над проливом: фоновая сцена */
  function sunset(inner,opt){
    const o=opt||{};
    const W=318, H=o.h||190;
    const seaY=H-44;
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs><linearGradient id="m9sky${o.uid||0}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a9e"/><stop offset=".55" stop-color="#d97a8a"/><stop offset="1" stop-color="#ffb36b"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#m9sky${o.uid||0})"/>
      <g class="m9sun"><circle cx="${W-52}" cy="46" r="17" fill="#ffe9b0" opacity=".95"/></g>
      <rect x="0" y="${seaY}" width="${W}" height="${H-seaY}" fill="${M.sea}"/>
      <g class="m9wave"><path d="M0 ${seaY+10} Q 30 ${seaY+5} 60 ${seaY+10} T 120 ${seaY+10} T 180 ${seaY+10} T 240 ${seaY+10} T 318 ${seaY+10}" fill="none" stroke="#7fb7d8" stroke-width="2" opacity=".7"/></g>
      <rect x="1" y="1" width="${W-2}" height="${H-2}" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.6" rx="14"/>
      ${inner}
    </svg>`;
  }
  /* чертёжный лист */
  function sheet(inner,opt){
    const o=opt||{};
    const W=318, H=o.h||170;
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <rect x="8" y="6" width="302" height="${H-12}" rx="10" fill="${M.paper}" stroke="#b89a5a" stroke-width="2"/>
      <line x1="14" y1="${H-18}" x2="304" y2="${H-18}" stroke="#d9c08a" stroke-width="1"/>
      ${inner}
    </svg>`;
  }
  /* треугольник по точкам [{x,y,label,ang}] где ang — угол в этой вершине; мелом на чертеже */
  function triShape(pts,opt){
    const o=opt||{};
    const d=`M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y} Z`;
    let s=`<g class="${o.sway?'m9sway':''}"><path d="${d}" fill="${o.fill||'rgba(127,209,255,.14)'}" stroke="${o.stroke||M.ink}" stroke-width="3.4" stroke-linejoin="round" ${o.dash?'stroke-dasharray="9 6"':''}/></g>`;
    pts.forEach((p,i)=>{
      s+=`<circle cx="${p.x}" cy="${p.y}" r="5.5" fill="${o.rivet||M.gold}"/><circle cx="${p.x}" cy="${p.y}" r="2.2" fill="#5a4a2a"/>
      <text x="${p.x}" y="${p.y-12}" text-anchor="middle" font-size="15" fill="${o.lbl||'#2b4a8a'}" font-weight="bold">${p.l}</text>`;
    });
    return s;
  }
  /* дуга угла между двумя точками при вершине v */
  function angArc(v,a,b,opt){
    const o=opt||{};
    const r=o.r||34;
    const ang=pt=>Math.atan2(pt.y-v.y, pt.x-v.x);
    const a1=ang(a), a2=ang(b);
    // нормализуем разность в (-π, π]: дуга всегда по малому пути (внутренний угол)
    let d=a2-a1;
    while(d>Math.PI) d-=2*Math.PI;
    while(d<-Math.PI) d+=2*Math.PI;
    const sweep = d>0?1:0;
    const x1=v.x+r*Math.cos(a1), y1=v.y+r*Math.sin(a1);
    const x2=v.x+r*Math.cos(a1+d), y2=v.y+r*Math.sin(a1+d);
    const deg=Math.round(Math.abs(d)*180/Math.PI);
    const mid=a1+d/2;
    return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${o.c||M.gold}" stroke-width="${o.w||3.4}" ${o.dash?'class="m9dash"':''}/>
      <text x="${(v.x+(r+13)*Math.cos(mid)).toFixed(1)}" y="${(v.y+(r+13)*Math.sin(mid)+4).toFixed(1)}" text-anchor="middle" font-size="${o.fs||15}" fill="${o.c||'#c9812a'}" font-weight="bold">${deg}°</text>`;
  }
  /* строим треугольник: основание по горизонтали, левый угол = al, правый = ar (градусы).
     Возвращает массив вершин [A(верх), B(лево-низ), C(право-низ)] с координатами. */
  /* треугольник с вершиной A ровно над центром cx; h — высота A над основанием;
     al — угол при B (левый низ), ar — угол при C (правый низ). */
  function triByAngles(cx,yBase,h,al,ar){
    const bl=al*Math.PI/180, br=ar*Math.PI/180, s=bl+br;
    const L=h*Math.sin(s)/(Math.sin(bl)*Math.sin(br));
    const t=h/Math.sin(bl);
    const x0=cx-t*Math.cos(bl);
    return [{x:cx,y:yBase-h,l:'A'},{x:x0,y:yBase,l:'B'},{x:x0+L,y:yBase,l:'C'}];
  }
  /* большой полукруглый транспортир с делениями */
  function prot(x,y,R,ang,opt){
    const o=opt||{};
    const deg=ang*Math.PI/180;
    // шкала: дуга от -180 до 0 (верхняя полуокружность) стандартный транспортир
    let ticks='';
    for(let d=0;d<=180;d+=10){
      const rad=(180-d)*Math.PI/180;
      const x1=x-R*Math.cos(rad), y1=y-R*Math.sin(rad);
      const x2=x-(R+(d%30===0?7:3.5))*Math.cos(rad), y2=y-(R+(d%30===0?7:3.5))*Math.sin(rad);
      ticks+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#5b6d9e" stroke-width="${d%30===0?2:1.1}"/>`;
      if(d%30===0&&d>0&&d<180){
        const lx=x-(R+16)*Math.cos(rad), ly=y-(R+16)*Math.sin(rad);
        ticks+=`<text x="${lx.toFixed(1)}" y="${(ly+3).toFixed(1)}" text-anchor="middle" font-size="9.5" fill="#5b6d9e">${d}</text>`;
      }
    }
    // луч-указатель, вращается до ang
    const rot=180-ang; // от направления влево
    const c=o.c||'#d94f2a';
    let ray='';
    if(ang>0&&ang<180){
      ray=`<line x1="${x}" y1="${y}" x2="${(x+R*Math.cos(deg)).toFixed(1)}" y2="${(y-R*Math.sin(deg)).toFixed(1)}" stroke="${c}" stroke-width="3.4" stroke-linecap="round" class="m9pop"/>
      <circle cx="${(x+R*0.86*Math.cos(deg)).toFixed(1)}" cy="${(y-R*0.86*Math.sin(deg)).toFixed(1)}" r="4" fill="${c}" class="m9pop"/>`;
    }
    return `<g>
      <path d="M ${x-R} ${y} A ${R} ${R} 0 0 1 ${x+R} ${y} L ${x} ${y} Z" fill="rgba(255,255,255,.16)" stroke="#8fa4d8" stroke-width="2"/>
      <line x1="${x-R}" y1="${y}" x2="${x+R}" y2="${y}" stroke="#8fa4d8" stroke-width="2"/>
      ${ticks}
      ${ang>0? `<path d="M ${x} ${y} L ${x+R*Math.cos(deg)} ${y-R*Math.sin(deg)}" stroke="${c}" stroke-width="0" opacity="0"/>`:''}
      <text x="${x}" y="${y-4}" text-anchor="middle" font-size="12" fill="#fff" opacity="0"></text>
      ${ray}
    </g>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="m9in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q87=[
    {q:'В треугольнике углы 40° и 60°. Третий угол?',opts:['60°','80°','100°'],ans:1},
    {q:'В равнобедренном вершина 80°. Углы при основании?',opts:['40°','50°','80°'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q87[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?'#7fe8b8':'#ff9a8a'; tc=i===T.ans?'#7fe8b8':'#ff9a8a'; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:18px" onclick="visW87T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! (180° − 80°) : 2 = 50°</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 180° − 100° = 80°</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сумма углов = 180°</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW87Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW87Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW87(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===4){ st.c=0; } if(step===7||step===8||step===9){ st.sh=0; } if(step===10){ st.sh=0; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Мост Архимеда через пролив</div>`+
        wkHero(sunset(`
          <g class="m9pop"><rect x="16" y="86" width="120" height="46" rx="8" fill="#7a5233"/><rect x="16" y="96" width="120" height="7" fill="#8a6243"/>
          <rect x="26" y="70" width="16" height="16" rx="3" fill="#ffd76a" opacity=".8"/><rect x="108" y="70" width="16" height="16" rx="3" fill="#ffd76a" opacity=".8"/>
          <line x1="40" y1="132" x2="40" y2="150" stroke="#5a452a" stroke-width="4"/><line x1="114" y1="132" x2="114" y2="150" stroke="#5a452a" stroke-width="4"/></g>
          <rect x="14" y="150" width="290" height="9" fill="#7a5a33"/>
          <g class="m9pop" style="animation-delay:.3s">
            <path d="M 60 150 L 130 118 L 200 150 Z" fill="rgba(200,214,250,.16)" stroke="#e9eefc" stroke-width="3" stroke-linejoin="round"/>
            <path d="M 200 150 L 270 118 L 200 118 Z" fill="rgba(200,214,250,.1)" stroke="#c6d2f0" stroke-width="2.4"/>
            <line x1="130" y1="118" x2="270" y2="118" stroke="#c6d2f0" stroke-width="2.4"/>
            <circle cx="130" cy="118" r="4" fill="#ffd76a"/><circle cx="200" cy="118" r="4" fill="#ffd76a"/><circle cx="200" cy="150" r="4" fill="#ffd76a"/><circle cx="270" cy="118" r="4" fill="#ffd76a"/>
          </g>
          <g class="m9pop" style="animation-delay:.5s"><circle cx="292" cy="80" r="6" fill="#ff8a5a"/><circle cx="304" cy="72" r="4.6" fill="#ff8a5a"/></g>
        `,{h:190,uid:1}))+
        wkRow(sign('мост держится на треугольниках',M.gold,0.5))+
        wkSml('почему инженеры выбирают треугольники? · секрет — в сумме углов'));
    } else if(step===1){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Жёсткость: квадрат шатается</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9sw"><path d="M 40 110 L 40 58 L 116 58 L 116 110 Z" fill="rgba(255,138,122,.12)" stroke="#ff9a8a" stroke-width="3"/>
          <circle cx="40" cy="58" r="4.5" fill="#ffd76a"/><circle cx="116" cy="58" r="4.5" fill="#ffd76a"/><circle cx="40" cy="110" r="4.5" fill="#ffd76a"/><circle cx="116" cy="110" r="4.5" fill="#ffd76a"/></g>
          <text x="78" y="132" text-anchor="middle" font-size="14" fill="#ff9a8a" font-weight="bold">квадрат шатается!</text>
          <g class="m9pop" style="animation-delay:.4s"><path d="M 180 110 L 228 44 L 290 110 Z" fill="rgba(127,232,184,.1)" stroke="#7fe8b8" stroke-width="3.2" stroke-linejoin="round"/>
          <circle cx="180" cy="110" r="4.5" fill="#ffd76a"/><circle cx="228" cy="44" r="4.5" fill="#ffd76a"/><circle cx="290" cy="110" r="4.5" fill="#ffd76a"/></g>
          <text x="235" y="132" text-anchor="middle" font-size="14" fill="#7fe8b8" font-weight="bold">треугольник не сдвинуть!</text>
        </svg>`)+
        wkSml('три стороны жёстко скрепляют углы · поэтому фермы моста — треугольные'));
    } else if(step===2){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Что такое угол?</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <circle cx="52" cy="112" r="5" fill="#ffd76a"/>
          <line x1="52" y1="112" x2="150" y2="112" stroke="#fff" stroke-width="3.4"/>
          <line x1="52" y1="112" x2="240" y2="40" stroke="#fff" stroke-width="3.4"/>
          <path d="M 80 112 A 28 28 0 0 0 71.5 86" fill="none" stroke="#ffd76a" stroke-width="3.4"/>
          <g class="m9pop" style="animation-delay:.35s"><rect x="26" y="14" width="112" height="44" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.2"/>
          <text x="82" y="33" text-anchor="middle" font-size="12" fill="#cfe0ff">прямой угол</text><text x="82" y="50" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">90°</text></g>
          <g class="m9pop" style="animation-delay:.5s"><rect x="176" y="14" width="124" height="44" rx="12" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="238" y="33" text-anchor="middle" font-size="12" fill="#ffe9c9">развёрнутый</text><text x="238" y="50" text-anchor="middle" font-size="18" fill="#ffd76a" font-weight="bold">180°</text></g>
          <line x1="240" y1="112" x2="318" y2="112" stroke="#ffd76a" stroke-width="3.4" opacity=".8" stroke-dasharray="6 4"/>
          <text x="284" y="103" text-anchor="middle" font-size="11" fill="#ffe9c9">прямая</text>
        </svg>`)+
        wkSml('угол — «раствор» между двумя лучами · градусы — его мера'));
    } else if(step===3){
      const pts=triByAngles(159,150,132,60,60);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Равносторонний: три по 60°</div>`+
        wkHero(sheet(`${triShape(pts)}
          ${angArc(pts[1],pts[0],pts[2],{r:24,c:'#c93a1a'})}
          ${angArc(pts[2],pts[1],pts[0],{r:24,c:'#c93a1a'})}
          ${angArc(pts[0],pts[2],pts[1],{r:24,c:'#c93a1a'})}
        `,{h:168}))+
        wkRow(sign('60° + 60° + 60° = 180°',M.gold,0.4))+
        wkSml('все стороны равны → все углы равны · 180° : 3 = 60°'));
    } else if(step===4){
      const pick=st.c||0;
      const tri=triByAngles(159,156,108,40,80);
      const A=tri[0],B=tri[1],C=tri[2];
      const curArc = pick===0? angArc(A,B,C,{r:26,c:'#c93a1a'}) : (pick===1? angArc(B,A,C,{r:26,c:'#c93a1a'}) : angArc(C,A,B,{r:30,c:'#c93a1a'}));
      const pickLbl = pick===0? '∠A = 60°' : (pick===1? '∠B = 40°' : '∠C = 80°');
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Измеряем ферму транспортиром</div>`+
        wkHero(sheet(`${triShape(tri)}
          ${curArc}
          <text x="159" y="176" text-anchor="middle" font-size="15" fill="#2b4a8a" font-weight="bold">углы 40° · 60° · 80° · сейчас: ${pickLbl}</text>
        `,{h:204}))+
        wkRow(
          wkBtn('измерить ∠A (60°)',`visW87Act('${lk}','c0')`),
          wkBtn('измерить ∠B (40°)',`visW87Act('${lk}','c1')`),
          wkBtn('измерить ∠C (80°)',`visW87Act('${lk}','c2')`))+
        wkSml('прикладывай транспортир к вершине и читай градусы на шкале'));
    } else if(step===5){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Складываем отрезанные углы</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          ${sh===0
            ? `<g class="m9pop"><path d="M 70 140 L 120 50 L 250 140 Z" fill="rgba(244,232,200,.16)" stroke="#e8dcc8" stroke-width="3" stroke-linejoin="round"/>
               <line x1="70" y1="140" x2="120" y2="50" stroke="#c93a1a" stroke-width="2.6" stroke-dasharray="6 4" opacity=".8"/>
               <line x1="120" y1="50" x2="250" y2="140" stroke="#c93a1a" stroke-width="2.6" stroke-dasharray="6 4" opacity=".8"/>
               <text x="159" y="158" text-anchor="middle" font-size="13" fill="#cfe0cf">бумажный треугольник · режем по пунктиру</text></g>`
            : `<g>
                <line x1="24" y1="150" x2="294" y2="150" stroke="#e8dcc8" stroke-width="3.6"/>
                <!-- веер: из точки O на линии три сектора 40+60+80 = 180° -->
                <g class="m9pop"><circle cx="74" cy="150" r="5" fill="#e8dcc8"/></g>
                <g class="m9pop" style="animation-delay:.1s"><path d="M 74 150 L 74 106 A 44 44 0 0 1 107 117 Z" fill="rgba(201,58,26,.4)" stroke="#c93a1a" stroke-width="2.2"/>
                  <text x="92" y="126" text-anchor="middle" font-size="11" fill="#ffe9c9">40°</text></g>
                <g class="m9pop" style="animation-delay:.3s"><path d="M 74 150 L 107 117 A 44 44 0 0 1 159 103 Z" fill="rgba(43,74,138,.42)" stroke="#2b4a8a" stroke-width="2.2"/>
                  <text x="136" y="116" text-anchor="middle" font-size="11" fill="#ffe9c9">60°</text></g>
                <g class="m9pop" style="animation-delay:.5s"><path d="M 74 150 L 159 103 A 44 44 0 0 1 214 126 Z" fill="rgba(201,138,42,.42)" stroke="#c9812a" stroke-width="2.2"/>
                  <text x="188" y="126" text-anchor="middle" font-size="11" fill="#ffe9c9">80°</text></g>
                <g class="m9pop" style="animation-delay:.7s"><line x1="74" y1="150" x2="214" y2="126" stroke="#e8dcc8" stroke-width="1.6" opacity=".7"/>
                  <circle cx="74" cy="150" r="4" fill="#8fd1a8"/>
                  <text x="145" y="160" text-anchor="middle" font-size="14" fill="#8fd1a8" font-weight="bold">40° + 60° + 80° = 180° — прямая!</text></g>
              </g>`}
        </svg>`)+
        wkRow(sh===0? wkBtn('отрезать углы и сложить',`visW87Act('${lk}','go')`) : wkBtn('сброс',`visW87Act('${lk}','rst')`))+
        wkSml(sh? 'три угла вместе = развёрнутый угол 180°' : 'отрезанные углы приложи друг к другу'));
    } else if(step===6){
      const pts=triByAngles(159,150,104,50,70);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Теорема: сумма = 180°</div>`+
        wkHero(sheet(`${triShape(pts,{stroke:'#2b4a8a'})}
          ${angArc(pts[1],pts[0],pts[2],{r:22,c:'#c93a1a',fs:12})}
          ${angArc(pts[2],pts[1],pts[0],{r:22,c:'#2b4a8a',fs:12})}
          ${angArc(pts[0],pts[2],pts[1],{r:22,c:'#c9812a',fs:12})}
        `,{h:160}))+
        wkRow(sign('∠A + ∠B + ∠C = 180°',M.gold,0.3))+
        wkSml('доказано ещё в Древней Греции · работает для любого треугольника'));
    } else if(step===7){
      const sh=st.sh||0;
      const p7=triByAngles(159,150,58,35,45);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Третий угол: 35° и 45°</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9pop"><path d="M ${p7[1].x} ${p7[1].y} L ${p7[2].x} ${p7[2].y} L ${p7[0].x} ${p7[0].y} Z" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="${p7[1].x}" cy="${p7[1].y}" r="4" fill="#ffd76a"/><circle cx="${p7[2].x}" cy="${p7[2].y}" r="4" fill="#ffd76a"/><circle cx="${p7[0].x}" cy="${p7[0].y}" r="4" fill="#ffd76a"/>
          ${angArc(p7[1],p7[0],p7[2],{r:22,c:'#ffd76a',fs:12})}
          ${angArc(p7[2],p7[1],p7[0],{r:22,c:'#ff9a8a',fs:12})}
          ${angArc(p7[0],p7[1],p7[2],{r:24,c:'#8fd1a8',fs:13})}</g>
          ${sh? `<g class="m9pop" style="animation-delay:.2s">
            <rect x="36" y="60" width="240" height="74" rx="14" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="1.8"/>
            <text x="156" y="84" text-anchor="middle" font-size="15" fill="#cfe0cf">35° + 45° = 80°</text>
            <text x="156" y="106" text-anchor="middle" font-size="15" fill="#cfe0cf">180° − 80° = ?</text>
            <text x="156" y="128" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">третий = 100°</text></g>`:''}
        </svg>`)+
        wkRow(sh===0? wkBtn('найти третий угол',`visW87Act('${lk}','go')`) : wkBtn('сброс',`visW87Act('${lk}','rst')`))+
        wkSml('∠3 = 180° − ∠1 − ∠2 · вычти оба известных из 180°'));
    } else if(step===8){
      const sh=st.sh||0;
      // прямоугольный: прямой угол в B (слева внизу), 30° при C (справа внизу), 60° наверху в A
      const w8=180, h8=Math.round(w8*Math.tan(30*Math.PI/180));
      const X0=50, Y0=140;
      const bx={x:X0,y:Y0,l:'B'}, cx={x:X0+w8,y:Y0,l:'C'}, ax={x:X0,y:Y0-h8,l:'A'};
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Прямоугольный: 90° и 30°</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9pop"><path d="M ${bx.x} ${bx.y} L ${cx.x} ${cx.y} L ${ax.x} ${ax.y} Z" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="3.2" stroke-linejoin="round"/>
          <rect x="${bx.x-14}" y="${bx.y-14}" width="14" height="14" fill="none" stroke="#7fd1ff" stroke-width="2.2"/>
          ${angArc(cx,ax,bx,{r:26,c:'#ffd76a',fs:13})}
          ${sh? angArc(ax,cx,bx,{r:26,c:'#8fd1a8',fs:14}):''}
          <circle cx="${bx.x}" cy="${bx.y}" r="4" fill="#ffd76a"/><circle cx="${cx.x}" cy="${cx.y}" r="4" fill="#ffd76a"/><circle cx="${ax.x}" cy="${ax.y}" r="4" fill="#ffd76a"/>
          <text x="${bx.x-24}" y="${bx.y-8}" text-anchor="middle" font-size="13" fill="#7fd1ff" font-weight="bold">90°</text></g>
          <text x="159" y="36" text-anchor="middle" font-size="15" fill="${sh?'#8fd1a8':'#cfe0cf'}" font-weight="bold">${sh?'третий угол = 60°':'на острые углы остаётся 90°'}</text>
        </svg>`)+
        wkRow(sh===0? wkBtn('найти третий',`visW87Act('${lk}','go')`) : wkBtn('сброс',`visW87Act('${lk}','rst')`))+
        wkSml('180° − 90° − 30° = 60° · острые углы в сумме всегда 90°'));
    } else if(step===9){
      const sh=st.sh||0;
      const p9=triByAngles(159,152,126,70,70); // основания по 70 → вершина 40
      const A9=p9[0],B9=p9[1],C9=p9[2];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Равнобедренный: вершина 40°</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9sway"><path d="M ${B9.x} ${B9.y} L ${A9.x} ${A9.y} L ${C9.x} ${C9.y} Z" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="3.2" stroke-linejoin="round"/>
          <line x1="${B9.x}" y1="${B9.y}" x2="${C9.x}" y2="${C9.y}" stroke="#8fd1a8" stroke-width="2.4" stroke-dasharray="6 4" opacity=".7"/>
          ${angArc(A9,B9,C9,{r:22,c:'#ffd76a',fs:13})}
          ${sh? angArc(B9,A9,C9,{r:20,c:'#8fd1a8',fs:12}) : ''}
          ${sh? angArc(C9,A9,B9,{r:20,c:'#8fd1a8',fs:12}) : ''}
          <circle cx="${B9.x}" cy="${B9.y}" r="4" fill="#ffd76a"/><circle cx="${A9.x}" cy="${A9.y}" r="4" fill="#ffd76a"/><circle cx="${C9.x}" cy="${C9.y}" r="4" fill="#ffd76a"/>
          <text x="${B9.x}" y="${B9.y-8}" text-anchor="middle" font-size="12" fill="#8fd1a8" font-weight="bold">B</text>
          <text x="${A9.x}" y="${A9.y-10}" text-anchor="middle" font-size="12" fill="#8fd1a8" font-weight="bold">A</text>
          <text x="${C9.x}" y="${C9.y-8}" text-anchor="middle" font-size="12" fill="#8fd1a8" font-weight="bold">C</text></g>
          ${sh? `<g class="m9pop"><rect x="40" y="76" width="238" height="40" rx="13" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="2"/>
            <text x="159" y="101" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold">каждый угол = 70°</text></g>`:''}
        </svg>`)+
        wkRow(sh===0? wkBtn('найти углы основания',`visW87Act('${lk}','go')`) : wkBtn('сброс',`visW87Act('${lk}','rst')`))+
        wkSml('(180° − 40°) : 2 = 70° · два равных угла у основания'));
    } else if(step===10){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">3D: ферма-призма на мосту</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9pop">
            <rect x="30" y="118" width="258" height="9" fill="#7a5a33"/>
            <line x1="40" y1="44" x2="96" y2="44" stroke="#c6d2f0" stroke-width="0"/>
            ${sh===0? '' : `
            <g>
              <path d="M 62 118 L 106 40 L 150 118 Z" fill="rgba(200,214,250,.13)" stroke="#e9eefc" stroke-width="3"/>
              <path d="M 106 40 L 150 118 L 106 118 Z" fill="rgba(200,214,250,.2)" stroke="#c6d2f0" stroke-width="2.4"/>
              <path d="M 106 40 L 106 118" stroke="#c6d2f0" stroke-width="2.4"/>
              <circle cx="62" cy="118" r="4" fill="#ffd76a"/><circle cx="106" cy="40" r="4" fill="#ffd76a"/><circle cx="150" cy="118" r="4" fill="#ffd76a"/>
            </g>
            <g>
              <path d="M 168 118 L 212 40 L 256 118 Z" fill="rgba(200,214,250,.13)" stroke="#e9eefc" stroke-width="3"/>
              <path d="M 212 40 L 256 118 L 212 118 Z" fill="rgba(200,214,250,.2)" stroke="#c6d2f0" stroke-width="2.4"/>
              <path d="M 212 40 L 212 118" stroke="#c6d2f0" stroke-width="2.4"/>
              <circle cx="168" cy="118" r="4" fill="#ffd76a"/><circle cx="212" cy="40" r="4" fill="#ffd76a"/><circle cx="256" cy="118" r="4" fill="#ffd76a"/>
            </g>`}
            <text x="159" y="150" text-anchor="middle" font-size="13" fill="#cfe0cf">${sh?'две треугольные призмы подняты на мост!':'пустое место на мосту · ждём фермы'}</text>
          </g>
        </svg>`)+
        wkRow(sh===0? wkBtn('поднять фермы на мост',`visW87Act('${lk}','go')`) : wkBtn('сброс',`visW87Act('${lk}','rst')`))+
        wkSml('призма — тело из двух треугольников · фермы встают жёстко'));
    } else if(step===11){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Треугольники вокруг нас</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="14" fill="rgba(0,0,0,.14)" stroke="#3d5c49"/>
          <g class="m9pop"><rect x="20" y="96" width="76" height="44" rx="5" fill="#8a5a2e"/>
            <path d="M 26 96 L 58 62 L 90 96 Z" fill="rgba(255,215,106,.25)" stroke="#ffd76a" stroke-width="2.6"/>
            <text x="58" y="130" text-anchor="middle" font-size="11" fill="#e8dcc8">дом</text></g>
          <g class="m9pop" style="animation-delay:.15s"><path d="M 130 140 L 160 80 L 190 140 Z" fill="rgba(255,215,106,.2)" stroke="#ffd76a" stroke-width="2.6"/>
            <text x="160" y="132" text-anchor="middle" font-size="11" fill="#e8dcc8">палатка</text></g>
          <g class="m9pop" style="animation-delay:.3s"><path d="M 216 140 L 282 140 L 249 84 Z" fill="rgba(127,209,255,.18)" stroke="#7fd1ff" stroke-width="2.6"/>
            <line x1="216" y1="140" x2="249" y2="84" stroke="#7fd1ff" stroke-width="1.6"/><line x1="282" y1="140" x2="249" y2="84" stroke="#7fd1ff" stroke-width="1.6"/>
            <text x="249" y="132" text-anchor="middle" font-size="11" fill="#cfe0ff">пирамида</text></g>
          <g class="m9pop" style="animation-delay:.45s"><rect x="30" y="30" width="60" height="10" rx="5" fill="#8fa4d8"/>
            <rect x="38" y="30" width="44" height="26" fill="none" stroke="#8fa4d8" stroke-width="2"/>
            <path d="M 38 30 L 52 12 L 66 30 Z" fill="#8fa4d8"/><text x="100" y="42" text-anchor="middle" font-size="11" fill="#cfe0ff">крыло</text></g>
        </svg>`)+
        wkSml('крыши, пирамиды, палатки, крылья — везде закон 180°'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[
        {kind:'обычный', a:40, b:70, c:70},
        {kind:'прямоугольный', a:90, b:35, c:55},
        {kind:'равнобедренный', a:100, b:40, c:40},
        {kind:'обычный', a:50, b:60, c:70}
      ];
      const T=POOL[st.tr%POOL.length];
      const pts=triByAngles(159,150,96,T.b,T.c);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр: найди третий угол</div>`+
        wkHero(sheet(`${triShape(pts)}
          ${st.s1? angArc(pts[1],pts[0],pts[2],{r:22,c:'#c93a1a',fs:12}):''}
          ${st.s1? angArc(pts[2],pts[1],pts[0],{r:22,c:'#2b4a8a',fs:12}):''}
          <text x="159" y="172" text-anchor="middle" font-size="14" fill="#2b4a8a" font-weight="bold">${T.kind} · ∠A = ${T.a}°, ∠B = ${T.b}°</text>
          ${st.s2? `<text x="159" y="156" text-anchor="middle" font-size="22" fill="#c93a1a" font-weight="bold">∠C = ${T.c}°</text>`:''}
        `,{h:198}))+
        wkRow(
          !st.s1? wkBtn('показать известные углы',`visW87Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('найти ∠C = 180° − A − B',`visW87Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новая ферма',`visW87Act('${lk}','n')`) : '',
          st.s1? wkBtn('сброс',`visW87Act('${lk}','rst')`) : '')+
        wkSml('вычти оба известных угла из 180° · для равнобедренного подели пополам'));
    } else {
      const pF=triByAngles(159,124,64,35,45);
      const AF=pF[0],BF=pF[1],CF=pF[2];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: мост Архимеда</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <path d="M ${BF.x} ${BF.y} L ${CF.x} ${CF.y} L ${AF.x} ${AF.y} Z" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="${BF.x}" cy="${BF.y}" r="4" fill="#ffd76a"/><circle cx="${CF.x}" cy="${CF.y}" r="4" fill="#ffd76a"/><circle cx="${AF.x}" cy="${AF.y}" r="4" fill="#ffd76a"/>
          ${angArc(AF,BF,CF,{r:24,c:'#8fd1a8',fs:14})}
          ${angArc(BF,AF,CF,{r:20,c:'#ffd76a',fs:12})}
          ${angArc(CF,AF,BF,{r:20,c:'#ff9a8a',fs:12})}
          <text x="${BF.x-16}" y="${BF.y-10}" text-anchor="middle" font-size="12" fill="#ffd76a">B</text>
          <text x="${AF.x}" y="${AF.y-12}" text-anchor="middle" font-size="12" fill="#8fd1a8">A</text>
          <text x="${CF.x+16}" y="${CF.y-10}" text-anchor="middle" font-size="12" fill="#ff9a8a">C</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('35° + 45° → третий 100° · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[87]=visW87;
  function visW87T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW87T=visW87T;
  function visW87Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='c0') st.c=0;
    if(act==='c1') st.c=1;
    if(act==='c2') st.c=2;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW87Act=visW87Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===87){ window.ARH_LESSONS[i]=L87; break; } } })();
})();
/* ================= УРОК 174 · Простые уравнения (v2 · «Весы Архимеда», 14 слайдов) ================= */
(function(){
  if(!window.__wk174v2css){
    window.__wk174v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .b7in{animation:b7In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes b7In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .b7pop{animation:b7Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes b7Pop{0%{transform:scale(.14);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .b7drop{animation:b7Drop .7s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes b7Drop{from{transform:translateY(-34px);opacity:0}60%{opacity:1}to{transform:translateY(0);opacity:1}}'+
      '#lvis .b7wob{animation:b7Wob 1.7s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom;}'+
      '@keyframes b7Wob{0%,100%{transform:rotate(-2.2deg)}50%{transform:rotate(2.2deg)}}'+
      '#lvis .b7ok{animation:b7Ok 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes b7Ok{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}'+
      '#lvis .b7fly{animation:b7Fly 1s cubic-bezier(.3,.7,.4,1) both;}'+
      '@keyframes b7Fly{0%{transform:translate(0,0);opacity:0}25%{opacity:1}100%{transform:translate(var(--tx),var(--ty));opacity:1}}'+
      '#lvis .b7sway{animation:b7Sway 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes b7Sway{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}';
    document.head.appendChild(st);
  }
  const L174 = {
    id: 174, title: 'Простые уравнения', ico: '≈',
    src: 'Математика · 5 класс · Уравнения', subj: 'math',
    explain: [
      'В мастерской Архимеда — огромные чашечные весы. На одной чаше мешок с неизвестным числом x и гиря 27, на другой — гиря 52. Весы в равновесии! Уравнение x + 27 = 52 — это и есть рассказ про эти весы.',
      'Что говорит уравнение x + 27 = 52? «Неизвестное число и 27 вместе дают 52». Неизвестное — это x. Слагаемое ищут вычитанием: x = 52 − 27.',
      'Решаем на весах: снимем с ОБЕИХ чаш по 27. Равновесие сохранится! Слева останется мешок x, справа — 25. Значит, x = 25.',
      'Проверка обязательна: подставь ответ в уравнение. 25 + 27 = 52 — верно! Если сошлось — решение правильное.',
      'Теперь x − 14 = 30: из мешка с x вынули 14 (как из кошелька!), и осталось 30. Сколько было? Чтобы найти уменьшаемое, складываем: x = 30 + 14 = 44.',
      'А если 40 − x = 16: было 40, сколько-то вынули, осталось 16. Вычитаемое ищут вычитанием: x = 40 − 16 = 24.',
      'Умножение: 8 · x = 96. Восемь одинаковых мешков по x вместе дают 96. Множитель ищут делением: x = 96 : 8 = 12.',
      'Деление: x : 6 = 8. Неизвестное x разложили по 6 — получилось 8 частей. Делимое ищут умножением: x = 8 · 6 = 48.',
      'Ещё деление: 54 : x = 9. Число 54 разложили на части по 9 — сколько частей? Делитель ищут делением: x = 54 : 9 = 6.',
      'Запомни правило-зеркало: чтобы найти неизвестное, делай ОБРАТНОЕ действие. Было «+27» — делаем «−27». Было «·8» — делаем «:8». Сложение и вычитание — пара, умножение и деление — пара.',
      'Ловушка: не спеши! Сначала спроси: «что неизвестно — слагаемое, множитель, уменьшаемое?» От этого зависит, какое действие выбрать. И всегда проверяй ответ подстановкой!',
      'Определитель Архимеда: посмотри на уравнение и скажи, что неизвестно. Тренируйся — весы сами подскажут: качни чашу с неизвестным!',
      'Тренажёр: тебе дадут уравнение. Шаг 1 — определи, что неизвестно. Шаг 2 — сделай обратное действие и найди x. Шаг 3 — проверь подстановкой. Нажимай кнопки!',
      'Проверь себя: x + 27 = 52 → x = 25. 8 · x = 96 → x = 12. x − 14 = 30 → x = 44. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Реши уравнение: x + 27 = 52.', choices: ['25', '79', '35'], ans: 0,
      exp: 'x = 52 − 27 = 25. Проверка: 25 + 27 = 52.' },
    tasks: [
      { q: 'Реши уравнение: 8 · x = 96.', kind: 'unit', ans: 12, tol: 0,
        hints: ['Что неизвестно: множитель.', 'x = 96 : 8 = 12.'], sol: 'x = 96 : 8 = 12.' },
      { q: 'Реши уравнение: x − 14 = 30.', kind: 'choice', choices: ['16', '44', '34'], ans: 1, tol: 0,
        hints: ['Что неизвестно: уменьшаемое.', 'x = 30 + 14 = 44.'], sol: 'x = 30 + 14 = 44.' }
    ]
  };
  const E={bronze:'#c9a06a',bronzeD:'#8a6a3a',gold:'#ffd76a',goldD:'#d9a441',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff9a8a',cream:'#f2e7c9',dark:'#2a2430'};
  /* чашечные весы: коромысло с двумя чашами. left/right — содержимое чаш (html-строки svg) */
  function scaleSVG(left,right,opt){
    const o=opt||{};
    const tilt=o.tilt||0;
    return `<svg viewBox="0 0 318 ${o.h||190}" style="display:block;width:100%;height:auto">
      <rect x="4" y="4" width="310" height="${(o.h||190)-8}" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
      <g class="${tilt?'b7wob':''}" style="transform-origin:159px 56px">
        <line x1="159" y1="56" x2="159" y2="28" stroke="#e8dcc8" stroke-width="4"/>
        <line x1="64" y1="40" x2="254" y2="40" stroke="#e8dcc8" stroke-width="5" stroke-linecap="round"/>
        <line x1="64" y1="40" x2="88" y2="74" stroke="#c9a06a" stroke-width="2.4"/>
        <line x1="254" y1="40" x2="230" y2="74" stroke="#c9a06a" stroke-width="2.4"/>
        <circle cx="159" cy="56" r="8" fill="#c9a06a" stroke="#8a6a3a" stroke-width="2.4"/>
        <circle cx="64" cy="40" r="4" fill="#c9a06a"/><circle cx="254" cy="40" r="4" fill="#c9a06a"/>
      </g>
      <g class="${tilt?'b7wob':''}">
        <path d="M 88 74 Q 88 96 108 96 L 150 96 Q 158 96 158 96 L 158 74 Z" fill="#c9a06a" stroke="#8a6a3a" stroke-width="2.4"/>
        <path d="M 230 74 Q 230 96 210 96 L 168 96 Q 160 96 160 96 L 160 74 Z" fill="#c9a06a" stroke="#8a6a3a" stroke-width="2.4"/>
      </g>
      <rect x="84" y="96" width="76" height="16" fill="none"/>
      <rect x="158" y="96" width="76" height="16" fill="none"/>
      <g>${left}</g>
      <g transform="translate(160,0)">${right}</g>
      <line x1="110" y1="112" x2="110" y2="158" stroke="#c9a06a" stroke-width="6"/>
      <line x1="208" y1="112" x2="208" y2="158" stroke="#c9a06a" stroke-width="6"/>
      <rect x="86" y="152" width="146" height="20" rx="6" fill="#8a6a3a"/>
    </svg>`;
  }
  /* мешок с x */
  function bag(x,y,s){
    return `<g class="b7sway"><path d="M ${x} ${y} Q ${x-16} ${y+22} ${x} ${y+44} Q ${x+16} ${y+22} ${x} ${y} Z" fill="#b98a5a" stroke="#6b4a2a" stroke-width="2.4"/>
      <path d="M ${x-8} ${y+2} L ${x+8} ${y+2} L ${x+6} ${y-8} L ${x-6} ${y-8} Z" fill="#8a5a2e" stroke="#6b4a2a" stroke-width="2"/>
      <text x="${x}" y="${y+28}" text-anchor="middle" font-size="${s||26}" fill="#fff" font-weight="bold" font-family="Georgia,serif">x</text></g>`;
  }
  /* гиря-плитка с числом */
  function weight(x,y,v,c,opt){
    const o=opt||{};
    const fs=o.fs||Math.min(24, (String(v).length>2?18:24));
    return `<g class="${o.fly?'b7fly':o.drop?'b7drop':'b7pop'}" ${o.fly?`style="--tx:${o.tx||0}px;--ty:${o.ty||0}px;animation-delay:${(o.delay||0).toFixed(2)}s"`:o.drop?`style="animation-delay:${(o.delay||0).toFixed(2)}s"`:`style="animation-delay:${(o.delay||0).toFixed(2)}s"`}>
      <rect x="${x}" y="${y}" width="${o.w||52}" height="${o.h||40}" rx="9" fill="${c||'#7fd1ff'}" opacity=".25"/>
      <rect x="${x}" y="${y}" width="${o.w||52}" height="${o.h||40}" rx="9" fill="none" stroke="${c||'#7fd1ff'}" stroke-width="2.8"/>
      <text x="${x+(o.w||52)/2}" y="${(y+(o.h||40)/2+fs*0.36).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="#fff" font-weight="bold" font-family="Georgia,serif">${v}</text>
    </g>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="b7in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q174=[
    {q:'Реши: x + 27 = 52.',opts:['25','79','35'],ans:0},
    {q:'Реши: x − 14 = 30.',opts:['16','44','34'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q174[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?E.green:E.red; tc=i===T.ans?E.green:E.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:18px" onclick="visW174T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Уменьшаемое: x = 30 + 14 = 44</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Слагаемое: x = 52 − 27 = 25</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сделай обратное действие</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW174Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW174Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW174(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===1||step===2){ st.sh=0; } if(step===4||step===5||step===6||step===7||step===8){ st.sh=0; } if(step===11){ st.pick=null; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Весы Архимеда</div>`+
        wkHero(scaleSVG(`${bag(122,64,24)}${weight(86,80,27,'#7fd1ff',{w:40,h:34,fs:18,delay:.2})}`, `${weight(160,64,52,'#ffd76a',{w:56,h:44,fs:24,delay:.3})}`,{h:196}))+
        wkRow(sign('x + 27 = 52',E.gold,0.5))+
        wkSml('весы в равновесии — левая чаша весит столько же, сколько правая'));
    } else if(step===1){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Что говорит уравнение?</div>`+
        wkHero(scaleSVG(`${bag(122,64,24)}${weight(86,80,27,'#7fd1ff',{w:40,h:34,fs:18,delay:.1})}`, `${weight(160,64,52,'#ffd76a',{w:56,h:44,fs:24,delay:.2})}`,{h:196}))+
        (sh? wkRow(sign('неизвестное и 27 вместе = 52',E.green,0.2)):'')+
        wkRow(sh===0? wkBtn('перевести на русский',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('x — это «неизвестное число», его и надо найти'));
    } else if(step===2){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Снимаем 27 с обеих чаш</div>`+
        wkHero(scaleSVG(
          sh===0
            ? `${bag(122,64,24)}${weight(86,80,27,'#7fd1ff',{w:40,h:34,fs:18})}`
            : `${bag(122,64,24)}<g class="b7fly" style="--tx:-60px;--ty:70px;animation-delay:.2s">${weight(86,80,27,'#7fd1ff',{w:40,h:34,fs:18})}</g>`,
          sh===0
            ? `${weight(160,64,52,'#ffd76a',{w:56,h:44,fs:24})}${weight(160,104,27,'#8fd1a8',{w:40,h:30,fs:17,delay:.25})}`
            : `${weight(160,64,52,'#ffd76a',{w:56,h:44,fs:24})}${bag(188,96,20)}`,
          {h:196}))+
        (sh===1? wkRow(sign('слева x, справа 52 − 27 = 25',E.green,0.3)):'')+
        wkRow(sh===0? wkBtn('снять по 27 с обеих чаш',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('равновесие сохранится, если снять ОДИНАКОВОЕ с обеих чаш'));
    } else if(step===3){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">x = 25 · и проверка!</div>`+
        wkHero(`<svg viewBox="0 0 318 180" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7pop"><rect x="36" y="36" width="110" height="92" rx="14" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="91" y="72" text-anchor="middle" font-size="17" fill="#ffe9c9">ответ</text>
          <text x="91" y="112" text-anchor="middle" font-size="48" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">x = 25</text></g>
          <g class="b7pop" style="animation-delay:.3s"><rect x="176" y="36" width="106" height="92" rx="14" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="229" y="66" text-anchor="middle" font-size="15" fill="#cfe0cf">проверка</text>
          <text x="229" y="100" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">25+27</text>
          <text x="229" y="120" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold">= 52 ✓</text></g>
          <g class="b7ok"><circle cx="159" cy="156" r="16" fill="#8fd1a8"/><text x="159" y="162" text-anchor="middle" font-size="15" fill="#0d1a13" font-weight="bold">✓</text></g>
        </svg>`)+
        wkSml('подставь ответ в уравнение: 25 + 27 = 52 — всё сходится!'));
    } else if(step===4){
      const sh=st.sh||0;
      const showBag = ()=>`<g class="b7pop"><rect x="36" y="20" width="92" height="120" rx="10" fill="rgba(255,255,255,.05)" stroke="#5b6d9e" stroke-width="2.4"/>
        <rect x="44" y="14" width="76" height="18" rx="6" fill="#8a5a2e"/><text x="82" y="27" text-anchor="middle" font-size="10" fill="#ffe9c9">кошелёк x</text>
        <text x="82" y="62" text-anchor="middle" font-size="15" fill="#cfe0cf">осталось 30</text>
        <rect x="52" y="80" width="60" height="26" rx="7" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="2"/>
        <text x="82" y="98" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold">30</text></g>
        <g class="b7fly" style="--tx:70px;--ty:60px"><rect x="36" y="20" width="92" height="120" rx="10" fill="rgba(255,255,255,.05)" stroke="#5b6d9e" stroke-width="2.4"/><text x="82" y="40" text-anchor="middle" font-size="11" fill="#cfe0cf">вынули</text>
        <text x="82" y="66" text-anchor="middle" font-size="22" fill="#ff9a8a" font-weight="bold">14</text></g>`;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">x − 14 = 30: кошелёк</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${sh===0
            ? `<g class="b7pop"><rect x="96" y="24" width="120" height="128" rx="12" fill="rgba(184,138,90,.14)" stroke="#b98a5a" stroke-width="3"/>
               <rect x="110" y="18" width="92" height="20" rx="6" fill="#8a5a2e"/><text x="156" y="32" text-anchor="middle" font-size="11" fill="#ffe9c9">мешок с секретом x</text>
               <rect x="112" y="60" width="88" height="44" rx="9" fill="rgba(255,255,255,.07)" stroke="#8fd1a8" stroke-width="2.2"/>
               <text x="156" y="88" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">?</text>
               <text x="156" y="130" text-anchor="middle" font-size="14" fill="#cfe0cf">вынули 14, осталось 30</text></g>`
            : `<g class="b7pop"><rect x="24" y="30" width="86" height="118" rx="10" fill="rgba(255,255,255,.05)" stroke="#5b6d9e" stroke-width="2.4"/>
                 <text x="67" y="52" text-anchor="middle" font-size="12" fill="#cfe0cf">осталось</text>
                 <text x="67" y="86" text-anchor="middle" font-size="30" fill="#8fd1a8" font-weight="bold">30</text>
                 <text x="67" y="118" text-anchor="middle" font-size="13" fill="#9ec0a8">это x − 14</text></g>
               <g class="b7pop" style="animation-delay:.2s"><rect x="150" y="30" width="86" height="118" rx="10" fill="rgba(255,255,255,.05)" stroke="#ff9a8a" stroke-width="2.4"/>
                 <text x="193" y="52" text-anchor="middle" font-size="12" fill="#ffcfc2">вынули</text>
                 <text x="193" y="86" text-anchor="middle" font-size="30" fill="#ff9a8a" font-weight="bold">14</text>
                 <text x="193" y="118" text-anchor="middle" font-size="13" fill="#9ec0a8">вернём обратно!</text></g>
               <g class="b7pop" style="animation-delay:.4s"><text x="120" y="92" text-anchor="middle" font-size="40" fill="#ffd76a" font-weight="bold">+</text></g>
               <g class="b7pop" style="animation-delay:.5s"><rect x="234" y="40" width="60" height="92" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="3"/>
                 <text x="264" y="70" text-anchor="middle" font-size="13" fill="#ffe9c9">x =</text>
                 <text x="264" y="106" text-anchor="middle" font-size="28" fill="#ffd76a" font-weight="bold">44</text></g>`}
        </svg>`)+
        (sh===1? wkRow(sign('x = 30 + 14 = 44',E.green,0.5)):'')+
        wkRow(sh===0? wkBtn('вернуть вынутые 14',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('чтобы узнать, сколько было, складываем: остаток + вынутое'));
    } else if(step===5){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">40 − x = 16</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7pop"><rect x="24" y="30" width="120" height="52" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.6"/>
          <text x="84" y="52" text-anchor="middle" font-size="14" fill="#cfe0ff">было</text>
          <text x="84" y="74" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">40</text></g>
          <g class="b7pop" style="animation-delay:.15s"><rect x="24" y="100" width="120" height="52" rx="12" fill="rgba(255,138,138,.1)" stroke="#ff9a8a" stroke-width="2.6"/>
          <text x="84" y="122" text-anchor="middle" font-size="14" fill="#ffcfc2">осталось</text>
          <text x="84" y="144" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">16</text></g>
          <g class="b7pop" style="animation-delay:.3s"><text x="159" y="95" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">?</text>
          <text x="159" y="112" text-anchor="middle" font-size="13" fill="#ffe9c9">сколько вынули?</text></g>
          ${sh? `<g class="b7pop"><rect x="214" y="52" width="86" height="76" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="3"/>
          <text x="257" y="80" text-anchor="middle" font-size="13" fill="#ffe9c9">x =</text>
          <text x="257" y="114" text-anchor="middle" font-size="30" fill="#ffd76a" font-weight="bold">24</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('x = 40 − 16 = 24',E.green,0.3)):'')+
        wkRow(sh===0? wkBtn('найти вычитаемое',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('вычитаемое = уменьшаемое − разность: 40 − 16'));
    } else if(step===6){
      const sh=st.sh||0;
      const cups = sh===1
        ? [0,1,2,3,4,5,6,7].map(i=>`<g class="b7drop" style="animation-delay:${(i*0.08).toFixed(2)}s"><rect x="${26+i*30}" y="118" width="24" height="26" rx="6" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="2"/><text x="${38+i*30}" y="135" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">x</text></g>`).join('')
        : '';
      h=wkFrame(`<div class="wk-big" style="font-size:18px">8 · x = 96: восемь мешков</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${[0,1,2,3,4,5,6,7].map(i=>`<g class="b7pop" style="animation-delay:${(i*0.08).toFixed(2)}s"><circle cx="${30+i*34}" cy="46" r="17" fill="rgba(184,138,90,.3)" stroke="#b98a5a" stroke-width="2.2"/><text x="${30+i*34}" y="52" text-anchor="middle" font-size="17" fill="#ffe9c9" font-weight="bold">x</text></g>`).join('')}
          <text x="159" y="86" text-anchor="middle" font-size="16" fill="#cfe0cf">восемь одинаковых мешков · вместе 96</text>
          ${cups}
          ${sh===1? `<g class="b7pop" style="animation-delay:.6s"><rect x="150" y="150" width="130" height="0" fill="none"/>
            <text x="270" y="40" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">12</text></g>`:''}
          ${sh? `<g class="b7pop"><rect x="238" y="112" width="68" height="44" rx="10" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.6"/>
            <text x="272" y="133" text-anchor="middle" font-size="13" fill="#ffe9c9">x = 96:8</text>
            <text x="272" y="150" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold">= 12</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('96 : 8 = 12 → x = 12',E.green,0.5)):'')+
        wkRow(sh===0? wkBtn('разложить 96 поровну',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('множитель ищут делением: произведение : известный множитель'));
    } else if(step===7){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">x : 6 = 8</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7pop"><rect x="30" y="30" width="100" height="100" rx="12" fill="rgba(184,138,90,.16)" stroke="#b98a5a" stroke-width="3"/>
          <rect x="46" y="24" width="68" height="16" rx="5" fill="#8a5a2e"/><text x="80" y="35" text-anchor="middle" font-size="10" fill="#ffe9c9">было x</text>
          <text x="80" y="96" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">?</text></g>
          ${[0,1,2,3,4,5,6,7].map(i=>`<g class="b7pop" style="animation-delay:${(0.2+i*0.07).toFixed(2)}s"><rect x="${150+i*18}" y="${56+(i%2)*20}" width="15" height="34" rx="4" fill="rgba(127,209,255,.25)" stroke="#7fd1ff" stroke-width="1.8"/><text x="${157+i*18}" y="${76+(i%2)*20}" text-anchor="middle" font-size="11" fill="#cfe0ff">8</text></g>`).join('')}
          <text x="159" y="150" text-anchor="middle" font-size="14" fill="#cfe0cf">8 частей по 6</text>
          ${sh? `<g class="b7pop"><text x="272" y="120" text-anchor="middle" font-size="22" fill="#ffd76a" font-weight="bold">48</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('x = 8 · 6 = 48',E.green,0.4)):'')+
        wkRow(sh===0? wkBtn('собрать части обратно',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('делимое ищут умножением: частное · делитель'));
    } else if(step===8){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">54 : x = 9</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7pop"><rect x="26" y="40" width="120" height="90" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.8"/>
          <text x="86" y="76" text-anchor="middle" font-size="15" fill="#cfe0ff">разложили 54</text>
          <text x="86" y="106" text-anchor="middle" font-size="28" fill="#fff" font-weight="bold" font-family="Georgia,serif">по 9</text></g>
          <g class="b7pop" style="animation-delay:.25s"><text x="159" y="95" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">?</text>
          <text x="159" y="112" text-anchor="middle" font-size="13" fill="#ffe9c9">сколько частей?</text></g>
          ${sh? `<g class="b7pop"><rect x="196" y="40" width="100" height="90" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="3"/>
          <text x="246" y="72" text-anchor="middle" font-size="14" fill="#ffe9c9">x = 54 : 9</text>
          <text x="246" y="108" text-anchor="middle" font-size="32" fill="#ffd76a" font-weight="bold">= 6</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('x = 54 : 9 = 6',E.green,0.3)):'')+
        wkRow(sh===0? wkBtn('посчитать части',`visW174Act('${lk}','go')`) : wkBtn('сброс',`visW174Act('${lk}','rst')`))+
        wkSml('делитель ищут делением: делимое : частное'));
    } else if(step===9){
      const rows=[
        ['x + 27 = 52','слагаемое','52 − 27'],
        ['x − 14 = 30','уменьшаемое','30 + 14'],
        ['40 − x = 16','вычитаемое','40 − 16'],
        ['8 · x = 96','множитель','96 : 8'],
        ['x : 6 = 8','делимое','8 · 6'],
        ['54 : x = 9','делитель','54 : 9']
      ];
      const cards=rows.map((r,i)=>`<div class="b7in" style="animation-delay:${(i*0.12).toFixed(2)}s;border:2px solid ${i%2?E.blue:E.gold};border-radius:13px;padding:7px 9px;margin:5px 0;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.04)">
        <span style="font-family:Georgia,serif;font-size:17px;color:#fff;font-weight:bold">${r[0]}</span>
        <span style="font-size:12px;color:${i%2?E.blue:E.gold};font-weight:bold;text-align:center;flex:1">${r[1]}</span>
        <span style="font-family:Georgia,serif;font-size:15px;color:#8fd1a8;font-weight:bold">${r[2]}</span>
      </div>`).join('');
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Правило-зеркало</div>`+
        wkHero(`<svg viewBox="0 0 318 96" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="88" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="159" y="30" text-anchor="middle" font-size="14" fill="#cfe0cf">было «+» → делаем «−» · было «·» → делаем «:»</text>
          <g class="b7ok"><rect x="40" y="42" width="104" height="36" rx="10" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="92" y="65" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">+ ⇄ −</text></g>
          <g class="b7ok" style="animation-delay:.3s"><rect x="174" y="42" width="104" height="36" rx="10" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2"/>
          <text x="226" y="65" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">· ⇄ :</text></g>
        </svg>`)+
        `${cards}`+
        wkSml('каждая строка — как найти неизвестное · выучи как таблицу'));
    } else if(step===10){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ловушка: сначала подумай!</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7sway"><rect x="24" y="34" width="130" height="100" rx="14" fill="rgba(255,138,122,.1)" stroke="#ff9a8a" stroke-width="2.6"/>
          <text x="89" y="62" text-anchor="middle" font-size="15" fill="#ffcfc2">неизвестно</text>
          <text x="89" y="92" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold">x − 14 = 30</text>
          <text x="89" y="118" text-anchor="middle" font-size="13" fill="#ffcfc2">это УМЕНЬШАЕМОЕ!</text></g>
          <g class="b7pop" style="animation-delay:.5s"><rect x="176" y="34" width="120" height="100" rx="14" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="236" y="62" text-anchor="middle" font-size="15" fill="#cfe0cf">если x − 14 = 30,</text>
          <text x="236" y="90" text-anchor="middle" font-size="19" fill="#8fd1a8" font-weight="bold">x = 30 + 14</text>
          <text x="236" y="116" text-anchor="middle" font-size="13" fill="#8fd1a8">(не вычитаем!)</text></g>
        </svg>`)+
        wkSml('x стоит в начале — его БОЛЬШЕ, чем 30 · складываем, а не вычитаем'));
    } else if(step===11){
      const quiz11=[
        {q:'x + 15 = 40 · неизвестно?',a:'слагаемое',b:'множитель'},
        {q:'x · 6 = 54 · неизвестно?',a:'множитель',b:'делитель'},
        {q:'x − 9 = 21 · неизвестно?',a:'уменьшаемое',b:'вычитаемое'}
      ];
      const pick=st.pick==null?0:st.pick;
      const T=quiz11[pick%3];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Определитель: что неизвестно?</div>`+
        wkHero(`<svg viewBox="0 0 318 100" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="92" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7sway"><text x="159" y="44" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold" font-family="Georgia,serif">${T.q.split(' · ')[0]}</text>
          <text x="159" y="76" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">${T.q.split(' · ')[1]||''}</text></g>
        </svg>`)+
        `<div class="wk-row" style="gap:10px">
          <button class="wk-btn" onclick="visW174T2('${lk}',0)">${T.a}</button>
          <button class="wk-btn" onclick="visW174T2('${lk}',1)">${T.b}</button>
        </div>`+
        (st.ok!=null? wkAns(st.ok?'верно!':'не так. Посмотри на x — где он стоит?', st.ok?E.green:E.red):'')+
        (st.ok? wkRow(wkBtn('следующее уравнение',`visW174Act('${lk}','nx')`)):'')+
        wkSml('где стоит x: в конце (x+5) — слагаемое · x один — уменьшаемое/делимое'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[
        {eq:'x + 35 = 70', sol:35, kind:'слагаемое'},
        {eq:'x − 22 = 48', sol:70, kind:'уменьшаемое'},
        {eq:'56 − x = 17', sol:39, kind:'вычитаемое'},
        {eq:'9 · x = 81', sol:9, kind:'множитель'},
        {eq:'x : 4 = 13', sol:52, kind:'делимое'}
      ];
      const T=POOL[st.tr%POOL.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр уравнений</div>`+
        wkHero(`<svg viewBox="0 0 318 110" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="102" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="b7sway"><text x="159" y="44" text-anchor="middle" font-size="34" fill="#fff" font-weight="bold" font-family="Georgia,serif">${T.eq}</text>
          <text x="159" y="74" text-anchor="middle" font-size="14" fill="#9ec0a8">неизвестно: ${T.kind}</text>
          ${st.s1? `<text x="159" y="94" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">обратное действие → x = ?</text>`:''}
          ${st.s2? `<rect x="80" y="66" width="158" height="30" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2"/>
          <text x="159" y="86" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold">x = ${T.sol} ✓</text>`:''}
          </g>
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · обратное действие',`visW174Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · найти x',`visW174Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новое уравнение',`visW174Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW174Act('${lk}','rst')`) : '')+
        wkSml('проверь себя подстановкой: подставь x и посчитай'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: весы Архимеда</div>`+
        wkHero(`<svg viewBox="0 0 318 110" style="display:block;width:100%;height:auto">
          ${bag(140,34,20)}${weight(60,40,27,'#7fd1ff',{w:40,h:32,fs:16,delay:.15})}
          ${weight(190,30,52,'#ffd76a',{w:54,h:42,fs:20,delay:.25})}
          <text x="159" y="104" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">x + 27 = 52</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('x + 27 = 52 → x = 25 · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[174]=visW174;
  function visW174T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW174T=visW174T;
  function visW174T2(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    const quiz11=[
      {q:'x + 15 = 40',a:0,b:1},
      {q:'x · 6 = 54',a:1,b:1},
      {q:'x − 9 = 21',a:0,b:1}
    ];
    const T=quiz11[st.pick%quiz11.length];
    st.ans=i; st.ok=(i===T.a); chRender(0);
  }
  window.visW174T2=visW174T2;
  function visW174Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
    if(act==='nx'){ st.pick=(st.pick==null?0:st.pick)+1; st.ans=null; st.ok=null; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW174Act=visW174Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===174){ window.ARH_LESSONS[i]=L174; break; } } })();
})();
/* ================= УРОК 170 · Порядок действий со скобками (v2 · «Вычислительная башня», 14 слайдов) ================= */
(function(){
  if(!window.__wk170v2css){
    window.__wk170v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .o8in{animation:o8In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes o8In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .o8pop{animation:o8Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes o8Pop{0%{transform:scale(.12);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .o8up{animation:o8Up .6s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes o8Up{from{transform:translateY(26px);opacity:0}to{transform:translateY(0);opacity:1}}'+
      '#lvis .o8drop{animation:o8Drop .6s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes o8Drop{from{transform:translateY(-24px);opacity:0}to{transform:translateY(0);opacity:1}}'+
      '#lvis .o8blink{animation:o8Blink 1.1s ease-in-out infinite;}'+
      '@keyframes o8Blink{0%,100%{opacity:1}50%{opacity:.45}}'+
      '#lvis .o8wob{animation:o8Wob 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes o8Wob{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}'+
      '#lvis .o8bump{animation:o8Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes o8Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}';
    document.head.appendChild(st);
  }
  const L170 = {
    id: 170, title: 'Порядок действий со скобками', ico: '✱',
    src: 'Математика · 5 класс · Порядок действий', subj: 'math',
    explain: [
      'Два друга посчитали пример 20 − 3 · 4 и получили разные ответы: один — 68, другой — 8. Кто прав? Чтобы таких споров не было, математики договорились о ЕДИНОМ порядке действий.',
      'Представь вычислительную башню Архимеда с тремя этажами. Верхний этаж — СКОБКИ (их считают всегда первыми!). Средний — умножение и деление. Нижний — сложение и вычитание. Выражение «спускается» по этажам сверху вниз.',
      'Разберём 20 − 3 · (7 − 4). Верхний этаж: скобки 7 − 4 = 3. Спускаемся.',
      'Средний этаж: умножение 3 · 3 = 9. Ещё ниже.',
      'Нижний этаж: вычитание 20 − 9 = 11. Ответ 11 — прав был второй друг!',
      'Почему умножение раньше сложения? Умножение — это «быстрое сложение одинаковых кучек»: 3 · 4 — это 4 + 4 + 4. Такая кучка считается одним целым, поэтому её вычисляют раньше.',
      'Если скобок нет, умножение и деление всё равно идут раньше: 12 + 3 · 2 = 12 + 6 = 18. А (12 + 3) · 2 = 30 — совсем другое число! Скобки меняют всё.',
      'Умножение и деление — соседи по этажу: их выполняют слева направо. 18 : 3 · 2 = 6 · 2 = 12, а не 18 : (3 · 2) = 3.',
      'Скобки могут стоять где угодно и менять порядок: (20 − 3) · 4 = 17 · 4 = 68, а 20 − 3 · 4 = 20 − 12 = 8. Один и тот же набор чисел — разные ответы!',
      'Бывает два уровня скобок: (2 + 3) · (10 − 4). Сначала обе скобки: 5 и 6. Потом умножение: 5 · 6 = 30.',
      'Ловушка: 30 − 2 · (9 − 4) — сначала скобки 9 − 4 = 5, потом 2 · 5 = 10, затем 30 − 10 = 20. Не спеши вычитать 30 − 2 первым!',
      'Шпаргалка-лифт: спускайся по этажам: 1) скобки → 2) умножение и деление → 3) сложение и вычитание. Слева направо на каждом этаже. Подчёркивай выполненное действие!',
      'Тренажёр: тебе дадут пример. Шаг 1 — найди скобки. Шаг 2 — умножение и деление. Шаг 3 — сложение и вычитание. Спускайся по башне и считай!',
      'Проверь себя: 20 − 3 · (7 − 4) = 11. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Чему равно 20 − 3 · (7 − 4)?', choices: ['9', '11', '17'], ans: 1,
      exp: 'Скобки 7−4=3; 3·3=9; 20−9=11.' },
    tasks: [
      { q: 'Чему равно 30 − 2 · (9 − 4)?', kind: 'unit', ans: 20, tol: 0,
        hints: ['Сначала скобки.', '9−4=5; 2·5=10; 30−10=20.'], sol: '30 − 2 · 5 = 30 − 10 = 20.' },
      { q: 'Чему равно 12 + 3 · 2?', kind: 'choice', choices: ['18', '30', '17'], ans: 0, tol: 0,
        hints: ['Сначала умножение.', '3·2=6; 12+6=18.'], sol: '3·2=6; 12+6=18.' }
    ]
  };
  const B={pink:'#e8a0d8',gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff9a8a',cream:'#f2e7c9'};
  /* блок-число */
  function numB(x,y,v,c,opt){
    const o=opt||{};
    const w=o.w||46, h=o.h||44;
    const fs=o.fs||Math.min(24,(String(v).length>2?18:24));
    return `<g class="${o.blink?'o8blink':(o.wob?'o8wob':'o8pop')}" style="animation-delay:${(o.delay||0).toFixed(2)}s">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${c||'#7fd1ff'}" opacity=".22"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${c||'#7fd1ff'}" stroke-width="2.8"/>
      <text x="${x+w/2}" y="${(y+h/2+fs*0.36).toFixed(1)}" text-anchor="middle" font-size="${fs}" fill="#fff" font-weight="bold" font-family="Georgia,serif">${v}</text>
    </g>`;
  }
  const op=(x,y,ch,c,delay)=>`<text class="o8pop" style="animation-delay:${(delay||0).toFixed(2)}s" x="${x}" y="${y}" text-anchor="middle" font-size="30" fill="${c||'#cfe0cf'}" font-weight="bold">${ch}</text>`;
  /* этажи башни: массив [название, цвет, активен] */
  function tower(active,opt){
    const o=opt||{};
    const floors=[['1 · скобки',B.pink],['2 · × и ÷',B.gold],['3 · + и −',B.green]];
    return floors.map((f,i)=>{
      const on=active===i;
      return `<g class="o8pop" style="animation-delay:${(i*0.15).toFixed(2)}s">
        <rect x="14" y="${14+i*34}" width="150" height="30" rx="10" fill="${on?f[1]:'rgba(255,255,255,.04)'}" opacity="${on?'.9':'.5'}"/>
        <rect x="14" y="${14+i*34}" width="150" height="30" rx="10" fill="none" stroke="${on?f[1]:'#4a6a54'}" stroke-width="2.4"/>
        <text x="89" y="${14+i*34+20}" text-anchor="middle" font-size="${on?15:13}" fill="${on?'#0d1a13':'#9ec0a8'}" font-weight="bold">${f[0]}</text>
      </g>`;
    }).join('');
  }
  /* маленький лифт-маркер */
  const lift=(x,y,c)=>`<g class="o8bump"><rect x="${x}" y="${y}" width="22" height="26" rx="6" fill="${c||'#ffd76a'}"/><text x="${x+11}" y="${y+18}" text-anchor="middle" font-size="13" fill="#0d1a13" font-weight="bold">↓</text></g>`;
  const sign=(t,c,delay,fs)=>`<span class="o8in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q170=[
    {q:'Чему равно 20 − 3 · (7 − 4)?',opts:['9','11','17'],ans:1},
    {q:'Чему равно 12 + 3 · 2?',opts:['18','30','17'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q170[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?B.green:B.red; tc=i===T.ans?B.green:B.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:18px" onclick="visW170T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 3·2=6, затем 12+6=18</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 7−4=3, 3·3=9, 20−9=11</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Спустись по этажам: скобки → ×÷ → +−</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW170Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW170Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW170(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===2||step===3||step===4){ st.sh=0; } if(step===6||step===7||step===9||step===10){ st.sh=0; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Спор двух друзей</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><rect x="30" y="26" width="110" height="70" rx="13" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.6"/>
          <text x="85" y="48" text-anchor="middle" font-size="13" fill="#cfe0ff">друг 1</text>
          <text x="85" y="78" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">68</text></g>
          <g class="o8pop" style="animation-delay:.2s"><rect x="180" y="26" width="110" height="70" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="235" y="48" text-anchor="middle" font-size="13" fill="#cfe0cf">друг 2</text>
          <text x="235" y="78" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">8</text></g>
          <text x="159" y="120" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">20 − 3 · 4</text>
          <g class="o8pop" style="animation-delay:.4s"><text x="159" y="148" text-anchor="middle" font-size="14" fill="#cfe0cf">кто прав? математики договорились о порядке</text></g>
        </svg>`)+
        wkSml('один посчитал (20−3)·4, другой 20−(3·4) · нужен единый порядок'));
    } else if(step===1){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Вычислительная башня</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${tower(-1)}
          <g class="o8pop" style="animation-delay:.5s"><rect x="184" y="20" width="116" height="120" rx="13" fill="rgba(255,255,255,.03)" stroke="#4a6a54" stroke-width="2"/>
          <text x="242" y="44" text-anchor="middle" font-size="13" fill="#cfe0cf">выражение</text>
          <text x="242" y="80" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold" font-family="Georgia,serif">20 − 3 · (7−4)</text>
          <text x="242" y="116" text-anchor="middle" font-size="12" fill="#9ec0a8">спускается сверху вниз</text></g>
        </svg>`)+
        wkRow(sign('1 скобки → 2 ×÷ → 3 +−',B.gold,0.5))+
        wkSml('верхний этаж — скобки · самый важный порядок запомни'));
    } else if(step===2){
      const sh=st.sh||0;
      const active=sh===0?0:(sh>=1?1:1);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">20 − 3 · (7 − 4): этаж скобок</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${tower(active)}
          <g class="o8pop" style="animation-delay:.2s"><rect x="188" y="26" width="112" height="58" rx="12" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
          ${numB(192,36,20,'#7fd1ff',{w:38,h:36,fs:18,delay:0})}
          ${op(236,58,'−','#cfe0cf',0)}
          ${numB(244,36,3,'#ffd76a',{w:38,h:36,fs:18,delay:.05})}
          ${op(288,58,'·','#cfe0cf',.1)}
          <text x="246" y="76" text-anchor="middle" font-size="20" fill="#e8a0d8" font-weight="bold">(7−4)</text></g>
          ${sh? `<g class="o8up" style="animation-delay:.2s"><rect x="188" y="96" width="112" height="52" rx="12" fill="rgba(232,160,216,.1)" stroke="#e8a0d8" stroke-width="2.6"/>
            <text x="244" y="128" text-anchor="middle" font-size="24" fill="#e8a0d8" font-weight="bold" font-family="Georgia,serif">7 − 4 = 3</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('скобки: 7 − 4 = 3',B.pink,0.4)):'')+
        wkRow(sh===0? wkBtn('выполнить скобки',`visW170Act('${lk}','go')`) : wkBtn('спуститься на ×÷',`visW170Act('${lk}','go')`))+
        wkSml('всё, что в скобках, считается первым — это верхний этаж'));
    } else if(step===3){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Этаж умножения и деления</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${tower(1)}
          <g class="o8pop"><rect x="188" y="24" width="112" height="58" rx="12" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
          ${numB(192,32,20,'#7fd1ff',{w:38,h:36,fs:18})}
          ${op(236,54,'−','#cfe0cf')}
          ${numB(244,32,3,'#ffd76a',{w:38,h:36,fs:18,delay:.05})}
          ${op(288,54,'·','#cfe0cf',.1)}
          ${sh? numB(282,32,3,'#ffd76a',{w:30,h:36,fs:16,delay:.15}):''}</g>
          ${sh? `<g class="o8up" style="animation-delay:.2s"><rect x="188" y="92" width="112" height="52" rx="12" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.6"/>
            <text x="244" y="124" text-anchor="middle" font-size="24" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">3 · 3 = 9</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('умножение: 3 · 3 = 9',B.gold,0.4)):'')+
        wkRow(sh===0? wkBtn('выполнить умножение',`visW170Act('${lk}','go')`) : wkBtn('спуститься на +−',`visW170Act('${lk}','go')`))+
        wkSml('после скобок считаем умножение и деление'));
    } else if(step===4){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">20 − 9 = 11 · ответ!</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${tower(2)}
          <g class="o8pop"><rect x="188" y="24" width="112" height="58" rx="12" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
          ${numB(192,32,20,'#7fd1ff',{w:38,h:36,fs:18})}
          ${op(236,54,'−','#cfe0cf')}
          ${sh? numB(244,32,9,'#ffd76a',{w:38,h:36,fs:18,delay:.1}):''}</g>
          ${sh? `<g class="o8up" style="animation-delay:.25s"><rect x="188" y="96" width="112" height="58" rx="14" fill="rgba(143,209,168,.16)" stroke="#8fd1a8" stroke-width="3"/>
            <text x="244" y="120" text-anchor="middle" font-size="14" fill="#cfe0cf">ответ</text>
            <text x="244" y="146" text-anchor="middle" font-size="30" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">11</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('20 − 9 = 11 · прав друг 2!',B.green,0.4)):'')+
        wkRow(sh===0? wkBtn('вычесть: 20 − 9',`visW170Act('${lk}','go')`) : wkBtn('сброс',`visW170Act('${lk}','rst')`))+
        wkSml('скобки → умножение → вычитание · ответ 11'));
    } else if(step===5){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Почему × раньше +?</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><rect x="24" y="26" width="120" height="100" rx="13" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="84" y="48" text-anchor="middle" font-size="14" fill="#ffe9c9">3 · 4 — это</text>
          ${[0,1,2].map(i=>`<g class="o8pop" style="animation-delay:${(0.15+i*0.15).toFixed(2)}s"><circle cx="${50+i*26}" cy="76" r="10" fill="#ffd76a" opacity=".85"/><text x="${50+i*26}" y="80" text-anchor="middle" font-size="11" fill="#0d1a13" font-weight="bold">4</text></g>`).join('')}
          <text x="84" y="110" text-anchor="middle" font-size="13" fill="#ffe9c9">4 + 4 + 4</text></g>
          <g class="o8pop" style="animation-delay:.6s"><rect x="170" y="26" width="126" height="100" rx="13" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="233" y="52" text-anchor="middle" font-size="14" fill="#cfe0ff">кучка — одно целое</text>
          <rect x="196" y="64" width="74" height="44" rx="10" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="233" y="92" text-anchor="middle" font-size="24" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">12</text></g>
        </svg>`)+
        wkSml('кучки считаем раньше, чем просто прибавляем одиночные числа'));
    } else if(step===6){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Без скобок: 12 + 3 · 2</div>`+
        wkHero(`<svg viewBox="0 0 318 168" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="160" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><rect x="26" y="30" width="120" height="50" rx="12" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
          ${numB(34,36,12,'#7fd1ff',{w:36,h:34,fs:17})}
          ${op(78,58,'+','#cfe0cf')}
          ${numB(90,36,3,'#ffd76a',{w:36,h:34,fs:17})}
          ${op(132,58,'·','#cfe0cf')}
          ${numB(140,36,2,'#ffd76a',{w:36,h:34,fs:17,delay:.05})}</g>
          <g class="o8bump" style="animation-delay:.3s"><rect x="172" y="34" width="120" height="44" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="232" y="62" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">3 · 2 = 6</text></g>
          ${sh? `<g class="o8up" style="animation-delay:.25s"><rect x="172" y="96" width="120" height="50" rx="13" fill="rgba(143,209,168,.14)" stroke="#8fd1a8" stroke-width="3"/>
            <text x="232" y="128" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">18</text></g>`:''}
          <text x="40" y="130" text-anchor="middle" font-size="13" fill="#ff9a8a" font-weight="bold">не (12+3)·2!</text>
        </svg>`)+
        (sh? wkRow(sign('12 + 6 = 18',B.green,0.3)):'')+
        wkRow(sh===0? wkBtn('сначала 3 · 2',`visW170Act('${lk}','go')`) : wkBtn('сброс',`visW170Act('${lk}','rst')`))+
        wkSml('нет скобок — умножение всё равно раньше сложения'));
    } else if(step===7){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Соседи: × и ÷ слева направо</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><rect x="26" y="30" width="120" height="52" rx="12" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
          ${numB(34,36,18,'#7fd1ff',{w:34,h:32,fs:16})}
          ${op(74,56,':','#cfe0cf')}
          ${numB(84,36,3,'#ffd76a',{w:34,h:32,fs:16})}
          ${op(124,56,'·','#cfe0cf')}
          ${numB(132,36,2,'#ffd76a',{w:34,h:32,fs:16})}</g>
          <g class="o8bump" style="animation-delay:.3s"><rect x="176" y="30" width="116" height="52" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="234" y="48" text-anchor="middle" font-size="13" fill="#ffe9c9">слева направо</text>
          <text x="234" y="72" text-anchor="middle" font-size="18" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">18:3=6 · 6·2=12</text></g>
        </svg>`)+
        wkSml('18 : 3 · 2 = 12 · если бы справа налево — вышло бы 3'));
    } else if(step===8){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Скобки меняют всё</div>`+
        wkHero(`<svg viewBox="0 0 318 168" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="160" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><rect x="16" y="26" width="140" height="110" rx="13" fill="rgba(232,160,216,.1)" stroke="#e8a0d8" stroke-width="2.4"/>
          <text x="86" y="48" text-anchor="middle" font-size="17" fill="#e8a0d8" font-weight="bold">(20 − 3) · 4</text>
          <text x="86" y="78" text-anchor="middle" font-size="15" fill="#cfe0cf">сначала 20−3=17</text>
          <text x="86" y="104" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">17 · 4</text>
          <text x="86" y="128" text-anchor="middle" font-size="30" fill="#e8a0d8" font-weight="bold" font-family="Georgia,serif">= 68</text></g>
          <g class="o8pop" style="animation-delay:.3s"><rect x="168" y="26" width="140" height="110" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="238" y="48" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold">20 − 3 · 4</text>
          <text x="238" y="78" text-anchor="middle" font-size="15" fill="#cfe0cf">сначала 3·4=12</text>
          <text x="238" y="104" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold">20 − 12</text>
          <text x="238" y="128" text-anchor="middle" font-size="30" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">= 8</text></g>
        </svg>`)+
        wkSml('те же числа — разные ответы · потому что скобки поменяли порядок'));
    } else if(step===9){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Двойные скобки: (2+3)·(10−4)</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><text x="159" y="34" text-anchor="middle" font-size="26" fill="#fff" font-weight="bold" font-family="Georgia,serif">(2+3) · (10−4)</text></g>
          ${sh>=1? `<g class="o8up"><rect x="30" y="50" width="120" height="44" rx="12" fill="rgba(232,160,216,.14)" stroke="#e8a0d8" stroke-width="2.6"/>
          <text x="90" y="78" text-anchor="middle" font-size="22" fill="#e8a0d8" font-weight="bold">2+3 = 5</text></g>`:''}
          ${sh>=1? `<g class="o8up" style="animation-delay:.15s"><rect x="170" y="50" width="120" height="44" rx="12" fill="rgba(232,160,216,.14)" stroke="#e8a0d8" stroke-width="2.6"/>
          <text x="230" y="78" text-anchor="middle" font-size="22" fill="#e8a0d8" font-weight="bold">10−4 = 6</text></g>`:''}
          ${sh>=2? `<g class="o8up"><rect x="70" y="108" width="180" height="44" rx="13" fill="rgba(143,209,168,.16)" stroke="#8fd1a8" stroke-width="3"/>
          <text x="160" y="137" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">5 · 6 = 30</text></g>`:''}
        </svg>`)+
        (sh>=2? wkRow(sign('5 · 6 = 30',B.green,0.3)):'')+
        wkRow(
          sh===0? wkBtn('1 · обе скобки',`visW170Act('${lk}','go')`) : '',
          sh===1? wkBtn('2 · умножить',`visW170Act('${lk}','go')`) : '',
          sh>=1? wkBtn('сброс',`visW170Act('${lk}','rst')`) : '')+
        wkSml('сначала считаем ВСЕ скобки, потом умножаем'));
    } else if(step===10){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ловушка: 30 − 2 · (9 − 4)</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="o8pop"><text x="159" y="36" text-anchor="middle" font-size="27" fill="#fff" font-weight="bold" font-family="Georgia,serif">30 − 2 · (9−4)</text>
          <text x="159" y="58" text-anchor="middle" font-size="13" fill="#9ec0a8">скобки стоят не в начале — но всё равно первыми!</text></g>
          ${sh>=1? `<g class="o8up"><rect x="30" y="72" width="250" height="30" rx="11" fill="rgba(232,160,216,.12)" stroke="#e8a0d8" stroke-width="2.2"/>
          <text x="155" y="92" text-anchor="middle" font-size="16" fill="#e8a0d8" font-weight="bold">9 − 4 = 5</text></g>`:''}
          ${sh>=2? `<g class="o8up" style="animation-delay:.1s"><rect x="30" y="106" width="250" height="30" rx="11" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="155" y="126" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">2 · 5 = 10</text></g>`:''}
          ${sh>=3? `<g class="o8up" style="animation-delay:.1s"><rect x="30" y="140" width="250" height="0" fill="none"/>
          <text x="155" y="152" text-anchor="middle" font-size="16" fill="#ff9a8a" font-weight="bold">не 30 − 2 первым!</text></g>`:''}
        </svg>`)+
        wkRow(sh===0? wkBtn('шаг за шагом',`visW170Act('${lk}','go')`) : sh<3? wkBtn('дальше',`visW170Act('${lk}','go')`) : wkBtn('сброс',`visW170Act('${lk}','rst')`))+
        wkSml('30 − 2 · 5 = 30 − 10 = 20 · ответ 20'));
    } else if(step===11){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Шпаргалка-лифт</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${tower(-1)}
          <g class="o8pop" style="animation-delay:.5s"><rect x="184" y="24" width="116" height="104" rx="13" fill="rgba(255,255,255,.03)" stroke="#4a6a54" stroke-width="2"/>
          <text x="242" y="46" text-anchor="middle" font-size="13" fill="#cfe0cf">спускайся так</text>
          <text x="242" y="76" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">↓</text>
          <text x="242" y="104" text-anchor="middle" font-size="13" fill="#cfe0cf">слева направо</text>
          <text x="242" y="122" text-anchor="middle" font-size="13" fill="#cfe0cf">подчёркивай шаг</text></g>
        </svg>`)+
        wkRow(sign('1 () → 2 ×÷ → 3 +−',B.gold,0.5))+
        wkSml('запомни порядок как дорогу домой: сначала скобки, потом сильные действия'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[
        {eq:'20 − 3 · (7 − 4)', steps:['7 − 4 = 3','3 · 3 = 9','20 − 9 = 11'], ans:'11'},
        {eq:'30 − 2 · (9 − 4)', steps:['9 − 4 = 5','2 · 5 = 10','30 − 10 = 20'], ans:'20'},
        {eq:'12 + 3 · 2', steps:['3 · 2 = 6','12 + 6 = 18'], ans:'18'},
        {eq:'(2 + 3) · (10 − 4)', steps:['2+3=5 · 10−4=6','5 · 6 = 30'], ans:'30'}
      ];
      const T=POOL[st.tr%POOL.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр порядка</div>`+
        wkHero(`<svg viewBox="0 0 318 140" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="132" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="159" y="36" text-anchor="middle" font-size="27" fill="#fff" font-weight="bold" font-family="Georgia,serif">${T.eq}</text>
          ${st.s1? `<g class="o8up"><text x="159" y="66" text-anchor="middle" font-size="16" fill="#e8a0d8" font-weight="bold">${T.steps[0]}</text></g>`:''}
          ${st.s2? `<g class="o8up"><text x="159" y="92" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">${T.steps[1]}</text></g>`:''}
          ${st.s2&&T.steps.length>2? `<text x="159" y="112" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">${T.steps[2]}</text>`:''}
          ${st.s3? `<g class="o8up"><rect x="110" y="100" width="100" height="26" rx="12" fill="rgba(143,209,168,.14)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="160" y="118" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold">= ${T.ans}</text></g>`:''}
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · скобки',`visW170Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · ×÷',`visW170Act('${lk}','s2')`) : '',
          (st.s2&&!st.s3)? wkBtn('3 · +−',`visW170Act('${lk}','s3')`) : '',
          st.s1? wkBtn('заново',`visW170Act('${lk}','rst')`) : '')+
        (st.s3? wkRow(wkBtn('новый пример',`visW170Act('${lk}','n')`)):'')+
        wkSml('спускайся по этажам и не пропускай шаги'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: башня</div>`+
        wkHero(`<svg viewBox="0 0 318 100" style="display:block;width:100%;height:auto">
          ${numB(80,20,20,'#7fd1ff',{w:40,h:36,fs:18})}
          ${op(126,44,'−','#cfe0cf')}
          ${numB(136,20,3,'#ffd76a',{w:40,h:36,fs:18,delay:.05})}
          ${op(182,44,'·','#cfe0cf',.1)}
          <text x="228" y="44" text-anchor="middle" font-size="24" fill="#e8a0d8" font-weight="bold">(7−4)</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('20 − 3 · (7 − 4) = 11 · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[170]=visW170;
  function visW170T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW170T=visW170T;
  function visW170Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=(st.sh||0)+1;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='s3') st.s3=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; st.s3=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW170Act=visW170Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===170){ window.ARH_LESSONS[i]=L170; break; } } })();
})();
/* ================= УРОК 183 · Округление десятичных дробей (v2 · «Навигатор Архимеда», 14 слайдов) ================= */
(function(){
  if(!window.__wk183v2css){
    window.__wk183v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .r9in{animation:r9In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes r9In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .r9pop{animation:r9Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes r9Pop{0%{transform:scale(.13);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .r9wave{animation:r9Wave 2.4s ease-in-out infinite;}'+
      '@keyframes r9Wave{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}'+
      '#lvis .r9boat{animation:r9Boat 3.2s ease-in-out infinite;}'+
      '@keyframes r9Boat{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-4px) rotate(1.5deg)}}'+
      '#lvis .r9go{animation:r9Go 1s cubic-bezier(.3,.7,.4,1) both;}'+
      '@keyframes r9Go{from{transform:translateX(var(--sx))}to{transform:translateX(0)}}'+
      '#lvis .r9bump{animation:r9Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes r9Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}'+
      '#lvis .r9mast{animation:r9Mast 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom;}'+
      '@keyframes r9Mast{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}';
    document.head.appendChild(st);
  }
  const L183 = {
    id: 183, title: 'Округление десятичных дробей', ico: '≈',
    src: 'Математика · 5 класс · Округление', subj: 'math',
    explain: [
      'Ночь, штурман Архимед ведёт корабль по карте. Навигатор показывает точное расстояние 2,36 мили — но для записи в журнал удобнее простое число. Округлить — значит заменить число близким, но более простым. Как выбрать?',
      'Числовая дорога-море Архимеда: между целыми 2 и 3 плывёт корабль с дробью. Если он ближе к 2 — причаливаем к 2, ближе к 3 — к 3. А если ровно посередине (…,5)? Договорились округлять вверх — к большему!',
      'Правило точное: смотрим на цифру ПОСЛЕ разряда, до которого округляем. До десятых — смотрим на сотые. До целых — смотрим на десятые. Если она 5, 6, 7, 8 или 9 — цифру разряда увеличиваем на 1. Если 0–4 — оставляем как есть.',
      'Округляем 2,36 до десятых. До десятых — значит оставляем одну цифру после запятой. Смотрим на сотые: 6. Шесть больше пяти — значит, десятую 3 увеличиваем: 2,36 ≈ 2,4.',
      'Смотрим на процесс: 2,36 — сотые 6 ≥ 5, десятые 3 → 4. Записываем 2,4. Проверь на карте: 2,36 и правда ближе к 2,4, чем к 2,3!',
      'А теперь 7,5 до целых. Смотрим на десятые: 5. Пятёрка — середина между 7 и 8, но договорились: 5 округляет ВВЕРХ. Значит, 7,5 ≈ 8.',
      'Почему 5 всегда вверх? Представь, что 7,5 — ровно посередине между маяками 7 и 8. Чтобы не спорить, моряки договорились: середина — к большему числу. Так же и в математике.',
      'Округляем 4,71 до десятых. Смотрим на сотые: 1. Единица меньше 5 — десятую 7 оставляем! 4,71 ≈ 4,7, а не 4,8.',
      'Ловушка: сосед справа решает ВСЁ. 4,71 до десятых — сосед сотых 1 < 5, поэтому 4,7. Даже если после единицы идёт девятка (4,719), мы смотрим только на первый соседний разряд — на 1.',
      'Карта Архимеда: шкала с делениями по десятым. Точка 2,36 стоит между 2,3 и 2,4 — ближе к 2,4. Корабль всегда причаливает к ближайшему делению нужного разряда.',
      'Округление до целых — на ту же шкалу смотрим грубее: 7,5 посередине между 7 и 8 → к 8. А 7,4 — ближе к 7, поэтому 7,4 ≈ 7.',
      'Подчёркивай разряд округления и смотри на соседа справа: 0–4 — вниз (оставляем), 5–9 — вверх (прибавляем 1). Подчеркнул — и ответ готов!',
      'Тренажёр: тебе дадут дробь и разряд. Шаг 1 — подчеркни нужный разряд. Шаг 2 — посмотри на соседа справа. Шаг 3 — оставь или увеличь. Плыви к маяку!',
      'Проверь себя: 2,36 до десятых — 2,4. 7,5 до целых — 8. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Округли 2,36 до десятых.', choices: ['2,3', '2,4', '2,5'], ans: 1,
      exp: 'Сотые 6 ≥ 5 → десятые увеличиваем: 2,4.' },
    tasks: [
      { q: 'Округли 7,5 до целых.', kind: 'unit', ans: 8, tol: 0,
        hints: ['Смотрим на десятые: 5.', '5 округляет вверх → 8.'], sol: '7,5 ≈ 8.' },
      { q: 'Округли 4,71 до десятых.', kind: 'choice', choices: ['4,7', '4,8', '5'], ans: 0, tol: 0,
        hints: ['Смотрим на сотые: 1.', '1 < 5 — оставляем 4,7.'], sol: '4,71 ≈ 4,7.' }
    ]
  };
  const N={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',sea:'#1c3a5c',seaD:'#142c48',red:'#ff9a8a',beacon:'#ffe9a8',wood:'#8a5a2e'};
  /* море-шкала: прямая между left и right целыми; точка-корабль на доле pos (0..1) */
  function seaScale(left,right,pos,opt){
    const o=opt||{};
    const W=318, y=o.y||92;
    const x0=38, x1=280;
    const px=x0+(x1-x0)*pos;
    return `<svg viewBox="0 0 ${W} ${o.h||170}" style="display:block;width:100%;height:auto">
      <rect x="4" y="4" width="310" height="${(o.h||170)-8}" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
      <g class="r9wave"><path d="M0 ${y-24} Q 30 ${y-30} 60 ${y-24} T 120 ${y-24} T 180 ${y-24} T 240 ${y-24} T 318 ${y-24}" fill="none" stroke="#4a7ab0" stroke-width="2" opacity=".5"/></g>
      <rect x="30" y="${y}" width="258" height="7" rx="3" fill="#7fd1ff" opacity=".4"/>
      <g class="r9pop"><rect x="${x0-10}" y="${y-14}" width="52" height="34" rx="9" fill="${o.markLeft?'rgba(255,215,106,.9)':'rgba(255,255,255,.06)'}" stroke="${o.markLeft?'#ffd76a':'#4a6a54'}" stroke-width="2.4"/>
      <text x="${x0+16}" y="${y+8}" text-anchor="middle" font-size="20" fill="${o.markLeft?'#0d1a13':'#fff'}" font-weight="bold" font-family="Georgia,serif">${left}</text></g>
      <g class="r9pop" style="animation-delay:.12s"><rect x="${x1-42}" y="${y-14}" width="52" height="34" rx="9" fill="${o.markRight?'rgba(255,215,106,.9)':'rgba(255,255,255,.06)'}" stroke="${o.markRight?'#ffd76a':'#4a6a54'}" stroke-width="2.4"/>
      <text x="${x1-16}" y="${y+8}" text-anchor="middle" font-size="20" fill="${o.markRight?'#0d1a13':'#fff'}" font-weight="bold" font-family="Georgia,serif">${right}</text></g>
      ${o.lines? `<g class="r9pop">${[0.25,0.5,0.75].map(f=>{const x=x0+(x1-x0)*f; return `<line x1="${x}" y1="${y-6}" x2="${x}" y2="${y+13}" stroke="#4a7ab0" stroke-width="1.6" opacity=".6"/>`;}).join('')}</g>`:''}
      <g class="r9boat" style="${o.anim?`animation:r9Boat 3s ease-in-out infinite`:''}">
        <path d="M ${px-20} ${y-4} L ${px-8} ${y-24} L ${px-2} ${y-24} L ${px-2} ${y-6} L ${px+20} ${y-4} Q ${px} ${y+6} ${px-20} ${y-4} Z" fill="#b98a5a" stroke="#6b4a2a" stroke-width="2"/>
        <rect x="${px-4}" y="${y-30}" width="3" height="12" fill="#6b4a2a"/>
        <path d="M ${px-4} ${y-30} L ${px+8} ${y-22} L ${px-2} ${y-22} Z" fill="#ffd76a"/>
        <circle cx="${px}" cy="${y-9}" r="5" fill="#cfe0ff" opacity=".9"/>
      </g>
      <text x="159" y="${y+34}" text-anchor="middle" font-size="14" fill="${o.numCol||'#ffd76a'}" font-weight="bold" font-family="Georgia,serif">${o.num||''}</text>
      ${o.verdict? `<g class="r9pop" style="animation-delay:.3s"><rect x="${x1-52}" y="${y+40}" width="0" height="0" fill="none"/><text x="${(o.markRight?x1-16:x0+16)}" y="${y+44}" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold">✓ причалили!</text></g>`:''}
    </svg>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="r9in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q183=[
    {q:'Округли 2,36 до десятых.',opts:['2,3','2,4','2,5'],ans:1},
    {q:'Округли 4,71 до десятых.',opts:['4,7','4,8','5'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q183[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?N.green:N.red; tc=i===T.ans?N.green:N.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:60px;font-size:18px" onclick="visW183T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Сотые 1 < 5 — оставляем 4,7</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Сотые 6 ≥ 5 → десятые: 2,4</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сосед справа решает: 5–9 вверх, 0–4 вниз</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW183Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW183Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW183(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===2||step===3||step===4){ st.sh=0; } if(step===7||step===8){ st.sh=0; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Журнал штурмана</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="40" y="30" width="200" height="76" rx="12" fill="rgba(255,242,194,.06)" stroke="#c9a06a" stroke-width="2.4"/>
          <text x="140" y="56" text-anchor="middle" font-size="13" fill="#e8dcc8">навигатор показывает</text>
          <text x="140" y="92" text-anchor="middle" font-size="40" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">2,36 мили</text></g>
          <g class="r9bump" style="animation-delay:.3s"><circle cx="270" cy="66" r="20" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="270" y="72" text-anchor="middle" font-size="14" fill="#8fd1a8" font-weight="bold">окру-глить?</text></g>
          <text x="140" y="140" text-anchor="middle" font-size="14" fill="#9ec0a8">в журнал запишем простое число — ближайшее</text>
        </svg>`)+
        wkSml('округлить — заменить число близким, но более простым'));
    } else if(step===1){
      const show=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Два маяка: 7 и 8</div>`+
        wkHero(seaScale(7,8,0.5,{num:'7,5 · ровно посередине',y:104,markRight:show===1,h:196}))+
        (show? wkRow(sign('договорились: середина → вверх → 8',N.gold,0.4)):'')+
        wkRow(show===0? wkBtn('к какому маяку плыть?',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('число ровно посередине · моряки округляют к большему'));
    } else if(step===2){
      const show=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Точное правило</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="20" y="20" width="120" height="46" rx="11" fill="rgba(232,160,216,.1)" stroke="#e8a0d8" stroke-width="2.4"/>
          <text x="80" y="38" text-anchor="middle" font-size="12" fill="#f0c9e6">до десятых</text>
          <text x="80" y="58" text-anchor="middle" font-size="14" fill="#fff">смотрим сотые</text></g>
          <g class="r9pop" style="animation-delay:.15s"><rect x="180" y="20" width="120" height="46" rx="11" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="240" y="38" text-anchor="middle" font-size="12" fill="#ffe9c9">до целых</text>
          <text x="240" y="58" text-anchor="middle" font-size="14" fill="#fff">смотрим десятые</text></g>
          <g class="r9pop" style="animation-delay:.3s"><rect x="30" y="86" width="258" height="64" rx="14" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="159" y="110" text-anchor="middle" font-size="15" fill="#8fd1a8" font-weight="bold">5, 6, 7, 8, 9 → увеличиваем на 1</text>
          <text x="159" y="138" text-anchor="middle" font-size="15" fill="#cfe0cf" font-weight="bold">0, 1, 2, 3, 4 → оставляем как есть</text></g>
        </svg>`)+
        (show? wkRow(sign('сосед справа решает всё',N.gold,0.3)):'')+
        wkRow(show===0? wkBtn('запомнить правило',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('смотрим только на ОДНУ цифру — сразу после нужного разряда'));
    } else if(step===3){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">2,36 до десятых</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="30" y="28" width="258" height="60" rx="13" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="159" y="50" text-anchor="middle" font-size="15" fill="#cfe0cf">округлить ДО ДЕСЯТЫХ</text>
          <text x="159" y="78" text-anchor="middle" font-size="40" fill="#fff" font-weight="bold" font-family="Georgia,serif">2,3<span fill="${sh?N.red:'#fff'}" style="color:${sh?'#ff9a8a':'#fff'}">6</span></text></g>
          ${sh? `<g class="r9pop" style="animation-delay:.2s"><rect x="60" y="104" width="198" height="52" rx="12" fill="rgba(255,138,138,.1)" stroke="#ff9a8a" stroke-width="2.4"/>
          <text x="159" y="126" text-anchor="middle" font-size="15" fill="#ffcfc2">сотые = 6 · это 5,6,7,8,9</text>
          <text x="159" y="146" text-anchor="middle" font-size="16" fill="#ff9a8a" font-weight="bold">десятые 3 → увеличиваем до 4</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('2,36 ≈ 2,4',N.green,0.4)):'')+
        wkRow(sh===0? wkBtn('посмотреть на сотые',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('6 ≥ 5 — значит, десятая растёт: 3 становится 4'));
    } else if(step===4){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Корабль у маяка 2,4</div>`+
        wkHero(seaScale(2,3,0.36,{num:sh?'2,36 плывёт к 2,4 … 2,36 ≈ 2,4':'где стоит 2,36?',y:104,markRight:sh===1,h:200}))+
        (sh? wkRow(sign('2,36 ближе к 2,4 — причалили!',N.gold,0.4)):'')+
        wkRow(sh===0? wkBtn('показать путь',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('на шкале 2,36 между 2,3 и 2,4 · точка ближе к 2,4'));
    } else if(step===5){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">7,5 до целых</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="30" y="28" width="258" height="60" rx="13" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="159" y="50" text-anchor="middle" font-size="15" fill="#cfe0cf">округлить ДО ЦЕЛЫХ · смотрим десятые</text>
          <text x="159" y="80" text-anchor="middle" font-size="44" fill="#fff" font-weight="bold" font-family="Georgia,serif">7,<span style="color:${sh?'#ff9a8a':'#ffd76a'}">5</span></text></g>
          ${sh? `<g class="r9pop" style="animation-delay:.2s"><rect x="60" y="104" width="198" height="52" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="159" y="126" text-anchor="middle" font-size="15" fill="#ffe9c9">десятые = 5 · середина</text>
          <text x="159" y="146" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">5 округляет ВВЕРХ → 8</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('7,5 ≈ 8',N.green,0.4)):'')+
        wkRow(sh===0? wkBtn('сосед справа = 5',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('5 — это середина · её всегда отправляем вверх'));
    } else if(step===6){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Почему 5 вверх?</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <line x1="50" y1="100" x2="270" y2="100" stroke="#7fd1ff" stroke-width="3"/>
          <rect x="40" y="84" width="46" height="32" rx="8" fill="rgba(255,255,255,.06)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="63" y="105" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">7</text>
          <rect x="232" y="84" width="46" height="32" rx="8" fill="rgba(255,255,255,.06)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="255" y="105" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">8</text>
          <circle cx="160" cy="100" r="6" fill="#ffd76a"/>
          <text x="160" y="80" text-anchor="middle" font-size="13" fill="#ffd76a">7,5 — ровно середина</text>
          <g class="r9pop" style="animation-delay:.4s"><path d="M 160 92 C 200 60, 235 58, 248 76" fill="none" stroke="#8fd1a8" stroke-width="2.6" stroke-dasharray="6 4"/>
          <text x="228" y="62" text-anchor="middle" font-size="12" fill="#8fd1a8" font-weight="bold">к 8</text></g>
        </svg>`)+
        wkRow(sign('середина — к большему',N.gold,0.5))+
        wkSml('так договорились моряки и математики — без споров'));
    } else if(step===7){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">4,71 до десятых</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="168" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="30" y="28" width="258" height="60" rx="13" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="159" y="50" text-anchor="middle" font-size="15" fill="#cfe0cf">до десятых · смотрим сотые</text>
          <text x="159" y="80" text-anchor="middle" font-size="44" fill="#fff" font-weight="bold" font-family="Georgia,serif">4,7<span style="color:${sh?'#8fd1a8':'#ffd76a'}">1</span></text></g>
          ${sh? `<g class="r9pop" style="animation-delay:.2s"><rect x="60" y="104" width="198" height="52" rx="12" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="159" y="126" text-anchor="middle" font-size="15" fill="#cfe0cf">сотые = 1 · это 0,1,2,3,4</text>
          <text x="159" y="146" text-anchor="middle" font-size="16" fill="#8fd1a8" font-weight="bold">десятую 7 оставляем → 4,7</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('4,71 ≈ 4,7',N.green,0.4)):'')+
        wkRow(sh===0? wkBtn('посмотреть на сотые',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('1 < 5 — десятая не меняется, остаётся 7'));
    } else if(step===8){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ловушка: 4,719</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="162" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="40" y="30" width="240" height="60" rx="13" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2.2"/>
          <text x="160" y="52" text-anchor="middle" font-size="14" fill="#cfe0cf">до десятых — смотрим ТОЛЬКО сотые</text>
          <text x="160" y="80" text-anchor="middle" font-size="40" fill="#fff" font-weight="bold" font-family="Georgia,serif">4,7<span style="color:#8fd1a8">1</span>9</text></g>
          ${sh? `<g class="r9pop" style="animation-delay:.25s"><rect x="50" y="104" width="218" height="48" rx="12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="159" y="124" text-anchor="middle" font-size="15" fill="#cfe0cf">сосед справа — сотые 1</text>
          <text x="159" y="144" text-anchor="middle" font-size="16" fill="#8fd1a8" font-weight="bold">1 < 5 → 4,7 (девятка ни при чём!)</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('4,719 ≈ 4,7',N.green,0.4)):'')+
        wkRow(sh===0? wkBtn('какая цифра решает?',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('смотрим только первого соседа справа · дальше — не важно'));
    } else if(step===9){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Шкала с десятыми</div>`+
        wkHero(seaScale(2,3,0.36,{num:sh?'2,36 ≈ 2,4 (ближе к 2,4)':'найди 2,36 на шкале',y:100,lines:sh===1,markRight:sh===1,h:190}))+
        wkRow(sh===0? wkBtn('показать деления по 0,1',`visW183Act('${lk}','go')`) : wkBtn('сброс',`visW183Act('${lk}','rst')`))+
        wkSml('деления 2,3 и 2,4 · корабль 2,36 — рядом с 2,4'));
    } else if(step===10){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">До целых: 7,4 и 7,5</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="r9pop"><rect x="20" y="30" width="130" height="86" rx="13" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="2.2"/>
          <text x="85" y="56" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold" font-family="Georgia,serif">7,4</text>
          <text x="85" y="80" text-anchor="middle" font-size="13" fill="#cfe0ff">десятые 4 < 5</text>
          <text x="85" y="104" text-anchor="middle" font-size="24" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">≈ 7</text></g>
          <g class="r9pop" style="animation-delay:.2s"><rect x="170" y="30" width="130" height="86" rx="13" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.2"/>
          <text x="235" y="56" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold" font-family="Georgia,serif">7,5</text>
          <text x="235" y="80" text-anchor="middle" font-size="13" fill="#ffe9c9">десятые 5 ≥ 5</text>
          <text x="235" y="104" text-anchor="middle" font-size="24" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">≈ 8</text></g>
        </svg>`)+
        wkSml('4 идёт вниз, 5 — вверх · сосед справа всё решает'));
    } else if(step===11){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Памятка навигатора</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="122" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <text x="159" y="32" text-anchor="middle" font-size="14" fill="#cfe0cf">1 · подчеркни нужный разряд · 2 · сосед справа</text>
          <g class="r9bump"><rect x="40" y="46" width="104" height="40" rx="12" fill="rgba(127,209,255,.14)" stroke="#7fd1ff" stroke-width="2.6"/>
          <text x="92" y="71" text-anchor="middle" font-size="18" fill="#7fd1ff" font-weight="bold">0–4 → вниз</text></g>
          <g class="r9bump" style="animation-delay:.3s"><rect x="176" y="46" width="104" height="40" rx="12" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="228" y="71" text-anchor="middle" font-size="18" fill="#ffd76a" font-weight="bold">5–9 → вверх</text></g>
          <text x="159" y="106" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">вверх = прибавить 1 к разряду</text>
        </svg>`)+
        wkSml('подчеркнул разряд → посмотрел на соседа → решил'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[
        {num:'2,36',to:'десятых',look:'сотые: 6',ver:'2,4',ans:0},
        {num:'7,5',to:'целых',look:'десятые: 5',ver:'8',ans:0},
        {num:'4,71',to:'десятых',look:'сотые: 1',ver:'4,7',ans:0},
        {num:'6,8',to:'целых',look:'десятые: 8',ver:'7',ans:0}
      ];
      const T=POOL[st.tr%POOL.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр округления</div>`+
        wkHero(`<svg viewBox="0 0 318 130" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="122" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <text x="159" y="34" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold" font-family="Georgia,serif">${T.num}</text>
          <text x="159" y="56" text-anchor="middle" font-size="14" fill="#cfe0cf">округлить до ${T.to}</text>
          ${st.s1? `<text x="159" y="80" text-anchor="middle" font-size="15" fill="#e8a0d8" font-weight="bold">смотрим: ${T.look}</text>`:''}
          ${st.s2? `<g class="r9pop"><rect x="110" y="88" width="100" height="28" rx="12" fill="rgba(143,209,168,.14)" stroke="#8fd1a8" stroke-width="2.2"/>
          <text x="160" y="107" text-anchor="middle" font-size="19" fill="#8fd1a8" font-weight="bold">≈ ${T.ver}</text></g>`:''}
        </svg>`)+
        wkRow(
          !st.s1? wkBtn('1 · сосед справа',`visW183Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · округлить',`visW183Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW183Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW183Act('${lk}','rst')`) : '')+
        wkSml('сосед 0–4 → оставляем · 5–9 → прибавляем 1'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: навигатор</div>`+
        wkHero(`<svg viewBox="0 0 318 100" style="display:block;width:100%;height:auto">
          <text x="159" y="40" text-anchor="middle" font-size="42" fill="#fff" font-weight="bold" font-family="Georgia,serif">2,36</text>
          <text x="159" y="66" text-anchor="middle" font-size="14" fill="#cfe0cf">округлить до десятых</text>
          <text x="159" y="90" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold">сотые 6 → десятые 3+1</text>
        </svg>`)+
        quiz(lk,st)+
        wkSml('2,36 ≈ 2,4 · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[183]=visW183;
  function visW183T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW183T=visW183T;
  function visW183Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW183Act=visW183Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===183){ window.ARH_LESSONS[i]=L183; break; } } })();
})();
/* ================= УРОК 193 · Проценты: увеличить и уменьшить (v2 · «Бочка Архимеда», 14 слайдов) ================= */
(function(){
  if(!window.__wk193v2css){
    window.__wk193v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .k3in{animation:k3In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes k3In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .k3pop{animation:k3Pop .55s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes k3Pop{0%{transform:scale(.13);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .k3rise{animation:k3Rise .9s cubic-bezier(.2,.8,.2,1) both;transform-box:fill-box;}'+
      '@keyframes k3Rise{from{transform:translateY(26px);opacity:0}to{transform:translateY(0);opacity:1}}'+
      '#lvis .k3fall{animation:k3Fall .9s cubic-bezier(.3,.7,.4,1) both;transform-box:fill-box;}'+
      '@keyframes k3Fall{from{transform:translateY(-22px);opacity:0}to{transform:translateY(0);opacity:1}}'+
      '#lvis .k3wave{animation:k3Wave 1.8s ease-in-out infinite;}'+
      '@keyframes k3Wave{0%,100%{transform:translateX(0)}50%{transform:translateX(6px)}}'+
      '#lvis .k3drop{animation:k3Drop 1.1s ease-in infinite;opacity:0;}'+
      '@keyframes k3Drop{0%{transform:translate(0,-6px);opacity:0}20%{opacity:1}80%{opacity:1}100%{transform:translate(0,10px);opacity:0}}'+
      '#lvis .k3bub{animation:k3Bub 2.6s ease-in-out infinite;}'+
      '@keyframes k3Bub{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-5px);opacity:1}}'+
      '#lvis .k3bump{animation:k3Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes k3Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}'+
      '#lvis .k3sway{animation:k3Sway 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes k3Sway{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}';
    document.head.appendChild(st);
  }
  const L193 = {
    id: 193, title: 'Проценты: увеличить и уменьшить', ico: '⇅',
    src: 'Математика · 6 класс · Проценты', subj: 'math',
    explain: [
      'На складе Архимеда стоит огромная бочка с водой — сейчас в ней 200 литров. «Увеличить на 10%» — значит долить десятую часть от того, что есть. Давай разберёмся, как считать проценты увеличения и уменьшения!',
      'Вспомним: чтобы найти процент от числа, сначала находим 1%. 1% от 200 — это 200 : 100 = 2 литра. Одна сотая бочки — 2 литра.',
      'Теперь 10% от 200: умножаем 1% на 10 → 2 · 10 = 20 литров. Именно столько воды мы дольём в бочку!',
      '«Увеличить 200 на 10%»: берём 200 и добавляем 20 → 220. Бочка наполнилась до 220 литров! Увеличить = прибавить процент от числа.',
      'Запомни формулу: чтобы увеличить число на N%, найди N% от числа (число : 100 · N) и прибавь. 200 + 10% = 200 + 20 = 220.',
      'А теперь уменьшим! В другой бочке 300 литров. «Уменьшить на 20%» — вылить пятую часть: 20% от 300 = 300 : 100 · 20 = 60 литров.',
      'Выливаем 60 литров: 300 − 60 = 240. Уменьшить = отнять процент от числа. Уровень в бочке упал до 240!',
      'Хитрый способ: уменьшить на 20% — значит оставить 100% − 20% = 80%. А 80% от 300 — это 300 · 0,8 = 240. Тот же ответ, но в одно действие!',
      'Общая формула: увеличить на N% → умножить на (1 + N/100). Уменьшить на N% → умножить на (1 − N/100). Например, +10% → ×1,1, а −20% → ×0,8.',
      'Проверь на бочке: 200 · 1,1 = 220 ✓ · 300 · 0,8 = 240 ✓. Один множитель вместо двух шагов — удобно!',
      'Ловушка: 10% от 200 — это 20, а не 10! Процент всегда считаем от того числа, о котором речь. В бочке 200 литров — вот от 200 и считаем десятую часть.',
      'А если увеличить 50 на 100%? 100% от 50 — это само 50 (вся бочка!). Увеличить на 100% — значит добавить ещё столько же: 50 + 50 = 100. Число удвоилось!',
      'Тренажёр: тебе дадут число и процент. Шаг 1 — найди процент от числа (число : 100 · N). Шаг 2 — прибавь (увеличить) или отними (уменьшить). Наполняй и опустошай бочку!',
      'Проверь себя: 200 увеличили на 10% → 220. 300 уменьшили на 20% → 240. Ответь в тесте и жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Число 200 увеличили на 10%. Что получилось?', choices: ['210', '220', '240'], ans: 1,
      exp: '10% от 200 = 20; 200 + 20 = 220.' },
    tasks: [
      { q: 'Число 300 уменьшили на 20%. Что получилось?', kind: 'unit', ans: 240, tol: 0,
        hints: ['20% от 300 = ?', '60; 300 − 60 = 240.'], sol: '300 · 0,8 = 240.' },
      { q: 'Число 50 увеличили на 100%. Что получилось?', kind: 'choice', choices: ['100', '150', '75'], ans: 0, tol: 0,
        hints: ['100% от 50 — само 50.', '50 + 50 = 100.'], sol: '50 + 50 = 100.' }
    ]
  };
  const K={wood:'#8a5a2e',woodD:'#5f3d1d',band:'#c9a06a',water:'#4f9fd8',waterL:'#7fd1ff',gold:'#ffd76a',green:'#8fd1a8',red:'#ff9a8a'};
  /* бочка с уровнем воды: fillL — литры (0..max), max 300 */
  function barrel(fill,max,opt){
    const o=opt||{};
    const W=318;
    const bx=104, by=20, bw=110, bh=140;   // бочка
    const lvl = by+bh - (fill/max)*bh;
    let lines='';
    for(let v=0; v<=max; v+=50){
      const y=by+bh-(v/max)*bh;
      lines+=`<text x="${bx-14}" y="${y+4}" text-anchor="end" font-size="10" fill="#9ec0a8">${v}</text>
        <line x1="${bx-4}" y1="${y}" x2="${bx+bw+4}" y2="${y}" stroke="#3d5c49" stroke-width="1" opacity=".5"/>`;
    }
    const rise=o.rise||0; // высота анимации подъёма уровня
    return `<svg viewBox="0 0 ${W} ${o.h||210}" style="display:block;width:100%;height:auto">
      <rect x="4" y="4" width="310" height="${(o.h||210)-8}" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
      ${lines}
      <g class="k3sway">
        <path d="M ${bx+8} ${by+6} Q ${bx-6} ${by+bh/2} ${bx+8} ${by+bh-6} L ${bx+bw-8} ${by+bh-6} Q ${bx+bw+6} ${by+bh/2} ${bx+bw-8} ${by+6} Z" fill="${K.wood}" stroke="${K.woodD}" stroke-width="3"/>
        <rect x="${bx-6}" y="${by+30}" width="${bw+12}" height="9" rx="4" fill="${K.band}"/>
        <rect x="${bx-6}" y="${by+bh-38}" width="${bw+12}" height="9" rx="4" fill="${K.band}"/>
      </g>
      <clipPath id="k3c${o.uid||0}"><path d="M ${bx+10} ${by+8} Q ${bx-4} ${by+bh/2} ${bx+10} ${by+bh-8} L ${bx+bw-10} ${by+bh-8} Q ${bx+bw+4} ${by+bh/2} ${bx+bw-10} ${by+8} Z"/></clipPath>
      <g clip-path="url(#k3c${o.uid||0})">
        <g class="${rise?`k3rise`:''}" style="${rise?`animation-delay:${(o.delay||0).toFixed(2)}s`:''}">
          <rect x="${bx-8}" y="${lvl}" width="${bw+16}" height="${by+bh-lvl+8}" fill="${K.water}" opacity=".9"/>
          <g class="k3wave"><path d="M ${bx-8} ${lvl} Q ${bx+20} ${lvl-4} ${bx+50} ${lvl} T ${bx+120} ${lvl}" fill="none" stroke="${K.waterL}" stroke-width="2.4"/></g>
          ${o.bubbles? `<g class="k3bub"><circle cx="${bx+30}" cy="${lvl+30}" r="3" fill="#bfe4ff" opacity=".7"/><circle cx="${bx+70}" cy="${lvl+60}" r="2" fill="#bfe4ff" opacity=".5"/><circle cx="${bx+88}" cy="${lvl+40}" r="2.4" fill="#bfe4ff" opacity=".6"/></g>`:''}
        </g>
      </g>
      ${o.drop? `<g class="k3drop" style="animation-delay:.4s"><path d="M ${bx+bw/2} ${by+6} q 0 -4 -0 -6 q 0 4 0 6" stroke="#bfe4ff" stroke-width="2.4" fill="none"/></g>`:''}
      ${o.mark? `<g class="k3bump"><line x1="${bx+bw-8}" y1="${lvl}" x2="${bx+bw+26}" y2="${lvl}" stroke="${K.gold}" stroke-width="3.4"/>
        <polygon points="${bx+bw+26},${lvl} ${bx+bw+30},${lvl-5} ${bx+bw+30},${lvl+5}" fill="${K.gold}"/>
        <text x="${bx+bw+44}" y="${lvl+5}" text-anchor="middle" font-size="16" fill="${K.gold}" font-weight="bold">${o.mark}</text></g>`:''}
    </svg>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="k3in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q193=[
    {q:'Число 200 увеличили на 10%?',opts:['210','220','240'],ans:1},
    {q:'Число 50 увеличили на 100%?',opts:['100','150','75'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q193[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?K.green:K.red; tc=i===T.ans?K.green:K.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:64px;font-size:18px" onclick="visW193T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 100% от 50 = 50; 50+50 = 100</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! 10% от 200 = 20; 200+20 = 220</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сначала найди процент от числа</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW193Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW193Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW193(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; if(step===1||step===2||step===3){ st.sh=0; } if(step===4||step===5||step===6){ st.sh=0; } if(step===7){ st.sh=0; } if(step===8||step===9||step===11){ st.sh=0; } if(step===12){ if(st.tr==null) st.tr=0; st.s1=0; st.s2=0; } if(step===13){ st.sel=null; st.q=0; } }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Бочка Архимеда: 200 литров</div>`+
        wkHero(barrel(200,300,{h:212,uid:0}))+
        wkRow(sign('увеличить на 10% — что это значит?',K.gold,0.3))+
        wkSml('долить десятую часть от того, что есть · разберёмся!'));
    } else if(step===1){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">1% от 200 — это 2 литра</div>`+
        wkHero(barrel(200,300,{h:212,uid:1,mark:sh?'1% = 2 л':'200 л'}))+
        (sh? wkRow(sign('200 : 100 = 2',K.green,0.3)):'')+
        wkRow(sh===0? wkBtn('найти 1%',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('одна сотая бочки — 2 литра · 1% = число : 100'));
    } else if(step===2){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">10% от 200 = 20 литров</div>`+
        wkHero(barrel(200,300,{h:212,uid:2,mark:'10% = 20 л'}))+
        (sh? wkRow(sign('2 · 10 = 20 литров дольём',K.green,0.3)):'')+
        wkRow(sh===0? wkBtn('умножить 1% на 10',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('10% = 1% · 10 → 2 · 10 = 20'));
    } else if(step===3){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Доливаем: 200 + 20 = 220</div>`+
        wkHero(barrel(sh?220:200,300,{h:212,uid:3,rise:sh===1,drop:sh===1,mark:sh?'220 л':'200 л',delay:.2}))+
        (sh? wkRow(sign('увеличили на 10% → 220 литров!',K.green,0.4)):'')+
        wkRow(sh===0? wkBtn('долить 20 литров',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('увеличить = прибавить процент от числа'));
    } else if(step===4){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Формула увеличения</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="20" y="24" width="120" height="54" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="80" y="44" text-anchor="middle" font-size="13" fill="#cfe0ff">шаг 1 · процент</text>
          <text x="80" y="68" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold" font-family="Georgia,serif">200:100·10=20</text></g>
          <text x="159" y="58" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">+</text>
          <g class="k3pop" style="animation-delay:.2s"><rect x="178" y="24" width="120" height="54" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="238" y="44" text-anchor="middle" font-size="13" fill="#ffe9c9">шаг 2 · прибавить</text>
          <text x="238" y="68" text-anchor="middle" font-size="18" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">200+20=220</text></g>
          <g class="k3bump" style="animation-delay:.4s"><rect x="70" y="96" width="180" height="36" rx="14" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.6"/>
          <text x="160" y="119" text-anchor="middle" font-size="18" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">200 + 10% = 220</text></g>
        </svg>`)+
        wkSml('сначала N% от числа, потом прибавляем'));
    } else if(step===5){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Уменьшаем: 300 − 20%</div>`+
        wkHero(barrel(300,300,{h:212,uid:5,mark:sh?'20% = 60 л':'300 л'}))+
        (sh? wkRow(sign('20% от 300 = 60 литров',K.red,0.3)):'')+
        wkRow(sh===0? wkBtn('найти 20%',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('300 : 100 · 20 = 60 · столько выльем'));
    } else if(step===6){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Выливаем: 300 − 60 = 240</div>`+
        wkHero(barrel(sh?240:300,300,{h:212,uid:6,rise:false,mark:sh?'240 л':'300 л',delay:.2}))+
        (sh? wkRow(sign('уменьшили на 20% → 240 литров!',K.green,0.4)):'')+
        wkRow(sh===0? wkBtn('вылить 60 литров',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('уменьшить = отнять процент от числа'));
    } else if(step===7){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Хитрый способ: ×0,8</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="20" y="26" width="130" height="104" rx="13" fill="rgba(255,138,138,.08)" stroke="#ff9a8a" stroke-width="2.2"/>
          <text x="85" y="50" text-anchor="middle" font-size="14" fill="#ffcfc2">уменьшить на 20%</text>
          <text x="85" y="76" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold">100% − 20% = 80%</text>
          <text x="85" y="104" text-anchor="middle" font-size="15" fill="#cfe0cf">остаётся 80%</text>
          <text x="85" y="124" text-anchor="middle" font-size="20" fill="#ff9a8a" font-weight="bold">× 0,8</text></g>
          <g class="k3pop" style="animation-delay:.3s"><rect x="172" y="26" width="130" height="104" rx="13" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="237" y="52" text-anchor="middle" font-size="15" fill="#cfe0cf">300 · 0,8</text>
          <text x="237" y="84" text-anchor="middle" font-size="34" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">= 240</text>
          <text x="237" y="114" text-anchor="middle" font-size="13" fill="#8fd1a8">тот же ответ!</text></g>
        </svg>`)+
        (sh? wkRow(sign('300 · 0,8 = 240 ✓',K.green,0.4)):'')+
        wkRow(sh===0? wkBtn('показать волшебный множитель',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('оставить 80% проще, чем вычитать 20%'));
    } else if(step===8){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Формулы-множители</div>`+
        wkHero(`<svg viewBox="0 0 318 156" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="148" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="20" y="24" width="134" height="54" rx="12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="87" y="44" text-anchor="middle" font-size="13" fill="#cfe0cf">увеличить на N%</text>
          <text x="87" y="68" text-anchor="middle" font-size="19" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">× (1 + N/100)</text></g>
          <g class="k3pop" style="animation-delay:.2s"><rect x="164" y="24" width="134" height="54" rx="12" fill="rgba(255,138,138,.1)" stroke="#ff9a8a" stroke-width="2.4"/>
          <text x="231" y="44" text-anchor="middle" font-size="13" fill="#ffcfc2">уменьшить на N%</text>
          <text x="231" y="68" text-anchor="middle" font-size="19" fill="#ff9a8a" font-weight="bold" font-family="Georgia,serif">× (1 − N/100)</text></g>
          <g class="k3pop" style="animation-delay:.4s"><rect x="44" y="98" width="230" height="38" rx="13" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2"/>
          <text x="159" y="122" text-anchor="middle" font-size="17" fill="#ffd76a" font-weight="bold">+10% → ×1,1 · −20% → ×0,8</text></g>
        </svg>`)+
        wkSml('запомни: один множитель вместо двух шагов'));
    } else if(step===9){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверка на бочке</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="16" y="24" width="140" height="96" rx="13" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="2.2"/>
          <text x="86" y="50" text-anchor="middle" font-size="14" fill="#cfe0cf">+10%</text>
          <text x="86" y="76" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold">200 · 1,1</text>
          <text x="86" y="104" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold" font-family="Georgia,serif">= 220 ✓</text></g>
          <g class="k3pop" style="animation-delay:.25s"><rect x="164" y="24" width="140" height="96" rx="13" fill="rgba(255,138,138,.08)" stroke="#ff9a8a" stroke-width="2.2"/>
          <text x="234" y="50" text-anchor="middle" font-size="14" fill="#ffcfc2">−20%</text>
          <text x="234" y="76" text-anchor="middle" font-size="20" fill="#fff" font-weight="bold">300 · 0,8</text>
          <text x="234" y="104" text-anchor="middle" font-size="26" fill="#ff9a8a" font-weight="bold" font-family="Georgia,serif">= 240 ✓</text></g>
        </svg>`)+
        wkSml('оба ответа совпали с шагами-прибавлением — множители работают'));
    } else if(step===10){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Ловушка: процент от ЧИСЛА</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="142" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="26" y="28" width="120" height="52" rx="12" fill="rgba(255,138,138,.1)" stroke="#ff9a8a" stroke-width="2.4"/>
          <text x="86" y="48" text-anchor="middle" font-size="13" fill="#ffcfc2">неверно!</text>
          <text x="86" y="72" text-anchor="middle" font-size="20" fill="#ff9a8a" font-weight="bold">10% от 200 ≠ 10</text></g>
          <g class="k3pop" style="animation-delay:.3s"><rect x="172" y="28" width="126" height="52" rx="12" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2.4"/>
          <text x="235" y="48" text-anchor="middle" font-size="13" fill="#cfe0cf">верно!</text>
          <text x="235" y="72" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold">10% от 200 = 20</text></g>
          <text x="159" y="116" text-anchor="middle" font-size="14" fill="#cfe0cf">процент всегда считаем от числа, о котором речь (200!)</text>
        </svg>`)+
        wkSml('в бочке 200 литров — десятую часть находим от 200, а не от 100'));
    } else if(step===11){
      const sh=st.sh||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">50 + 100% = ?</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="4" y="4" width="310" height="152" rx="16" fill="rgba(0,0,0,.18)" stroke="#3d5c49"/>
          <g class="k3pop"><rect x="30" y="26" width="110" height="100" rx="13" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/>
          <text x="85" y="50" text-anchor="middle" font-size="13" fill="#cfe0ff">было</text>
          <text x="85" y="86" text-anchor="middle" font-size="36" fill="#fff" font-weight="bold" font-family="Georgia,serif">50</text>
          <text x="85" y="112" text-anchor="middle" font-size="12" fill="#cfe0ff">это 100%</text></g>
          ${sh? `<g class="k3pop" style="animation-delay:.2s"><text x="159" y="86" text-anchor="middle" font-size="30" fill="#ffd76a" font-weight="bold">+</text></g>
          <g class="k3fall" style="animation-delay:.3s"><rect x="178" y="26" width="110" height="100" rx="13" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="2.6"/>
          <text x="233" y="50" text-anchor="middle" font-size="13" fill="#ffe9c9">100% от 50</text>
          <text x="233" y="86" text-anchor="middle" font-size="36" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">50</text>
          <text x="233" y="112" text-anchor="middle" font-size="12" fill="#ffe9c9">ещё столько же!</text></g>`:''}
        </svg>`)+
        (sh? wkRow(sign('50 + 50 = 100 · число удвоилось',K.green,0.4)):'')+
        wkRow(sh===0? wkBtn('показать, что добавили',`visW193Act('${lk}','go')`) : wkBtn('сброс',`visW193Act('${lk}','rst')`))+
        wkSml('увеличить на 100% — значит добавить само число'));
    } else if(step===12){
      if(st.tr==null) st.tr=0;
      const POOL=[
        {N:200,p:10,up:1,one:2,add:20,res:220},
        {N:300,p:20,up:0,one:3,add:60,res:240},
        {N:50,p:100,up:1,one:0.5,add:50,res:100},
        {N:400,p:25,up:0,one:4,add:100,res:300},
        {N:80,p:50,up:1,one:0.8,add:40,res:120}
      ];
      const T=POOL[st.tr%POOL.length];
      const word = T.up? 'увеличить на '+T.p+'%' : 'уменьшить на '+T.p+'%';
      const fillLvl = T.up? (T.N+T.add) : (T.N-T.add);
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Тренажёр: бочка</div>`+
        wkHero(barrel(st.s2?fillLvl:(st.s1?T.N:200),300,{h:190,uid:12,mark:st.s2?(fillLvl+' л'):(T.N+' л')}))+
        wkRow(sign(`${T.N} → ${word}`,K.gold,0.2))+
        (st.s1? wkRow(sign(`${T.p}% от ${T.N} = ${T.add}`,K.green,0.2)):'')+
        (st.s2? wkRow(sign(`ответ: ${fillLvl}`,K.gold,0.2)):'')+
        wkRow(
          !st.s1? wkBtn('1 · найти процент',`visW193Act('${lk}','s1')`) : '',
          (st.s1&&!st.s2)? wkBtn('2 · прибавить/отнять',`visW193Act('${lk}','s2')`) : '',
          st.s2? wkBtn('новый пример',`visW193Act('${lk}','n')`) : '',
          st.s1? wkBtn('заново',`visW193Act('${lk}','rst')`) : '')+
        wkSml('N : 100 · p → прибавь (увеличить) или отними (уменьшить)'));
    } else {
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Проверь себя: бочка</div>`+
        wkHero(barrel(200,300,{h:180,uid:13,mark:'200 л'}))+
        quiz(lk,st)+
        wkSml('200 + 10% = 220 · жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[193]=visW193;
  function visW193T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW193T=visW193T;
  function visW193Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=1;
    if(act==='s1') st.s1=1;
    if(act==='s2') st.s2=1;
    if(act==='n'){ st.tr=(st.tr==null?0:st.tr)+1; st.s1=0; st.s2=0; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW193Act=visW193Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===193){ window.ARH_LESSONS[i]=L193; break; } } })();
})();
/* ================= УРОК 198 · Параллельные и перпендикулярные прямые (v2 · 14 блоков по сценарию) ================= */
(function(){
  if(!window.__wk198v2css){
    window.__wk198v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .q2in{animation:q2In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes q2In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .q2pop{animation:q2Pop .5s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Pop{0%{transform:scale(.1);opacity:0}70%{transform:scale(1.12);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .q2drive{animation:q2Drive 7s linear infinite;}'+
      '@keyframes q2Drive{0%{transform:translateX(-76px)}100%{transform:translateX(318px)}}'+
      '#lvis .q2drive2{animation:q2Drive2 8.4s linear infinite;}'+
      '@keyframes q2Drive2{0%{transform:translateX(-76px)}100%{transform:translateX(318px)}}'+
      '#lvis .q2float{animation:q2Float 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}'+
      '#lvis .q2wob{animation:q2Wob 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Wob{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}'+
      '#lvis .q2spin{animation:q2Spin 5s linear infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Spin{to{transform:rotate(360deg)}}'+
      '#lvis .q2dash{stroke-dasharray:8 6;animation:q2Dash .8s linear infinite;}'+
      '@keyframes q2Dash{to{stroke-dashoffset:-28}}'+
      '#lvis .q2bump{animation:q2Bump .9s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}'+
      '#lvis .q2fall{animation:q2Fall 1.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center bottom;}'+
      '@keyframes q2Fall{0%,100%{transform:rotate(0)}30%{transform:rotate(9deg)}70%{transform:rotate(-2deg)}}'+
      '#lvis .q2sway{animation:q2Sway 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes q2Sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}';
    document.head.appendChild(st);
  }
  const L198 = {
    id: 198, title: 'Параллельные и перпендикулярные прямые', ico: '⊥',
    src: 'Математика · 6 класс · Прямые', subj: 'math',
    explain: [
      'Две дороги в ночном городе: по каждой мчится машина. Расстояние между трассами всё время одинаковое — дороги никогда не встретятся. Такие линии называют параллельными — как рельсы поезда!',
      'Перекрёсток: одна улица пересекает другую. Если угол ровно 90°, улицы перпендикулярны. Это строгий «крест» с четырьмя одинаковыми углами — как пол и стена!',
      'Сюрприз! Робот бегает между двумя параллельными линиями с линейкой. В любой точке расстояние одинаковое. Это главный признак параллельности: равное расстояние везде.',
      'Проверка угольником: прозрачный треугольник с прямым углом прикладываем к пересечению. Если он «садится» точно в угол — линии перпендикулярны!',
      'Параллельность в природе: стволы деревьев растут ровно, полоски на зебре, соты пчёл. Везде прямые, которые не встречаются. Соты — гениальная экономия места!',
      'Стройка: стена строго вертикальна, пол горизонтален — они перпендикулярны. Именно поэтому дом стоит крепко! Стоит стене наклониться — и дом зашатается.',
      'У линий есть магические значки: // — две чёрточки, значит «параллельны»; ⊥ — перевёрнутая буква Т, значит «перпендикулярны». Кратко и удобно!',
      'Почти параллельные — не параллельные! Если две линии чуть-чуть сходятся, далеко-далеко они обязательно пересекутся. Нужно расстояние строго одинаковое.',
      'Ловушка: линии под углом 89° или 91° выглядят как перпендикуляр, но это не он. Только ровно 90° — перпендикуляр! Соседние градусы не подходят.',
      'Как нарисовать параллельные без линейки: согни лист бумаги, отогни край — линия сгиба готова! Любой следующий сгиб, параллельный первому, даст ещё одну такую линию.',
      'А перпендикуляр поможет начертить клетчатая тетрадь: проведи линию по клеткам вверх и вправо — они пересекутся ровно под 90°. Тетрадные линии — готовые перпендикуляры!',
      'Карта города: улицы идут прямо и параллельно, а проспекты пересекают их под прямым углом. Так строят современные города — удобно ходить и ездить!',
      'Дуэль линий: параллельные разбегаются и никогда не встречаются, перпендикулярные встречаются ровно под 90°. Сможешь отличить их с первого взгляда?',
      'Финальный квест: спаси комнату! Верни стенам перпендикулярность, потолку — параллельность — и комната станет красивой. Ты теперь мастер прямых! Жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Как называются прямые, которые не пересекаются?', choices: ['Параллельные', 'Перпендикулярные', 'Пересекающиеся'], ans: 0,
      exp: 'Прямые, которые не пересекаются, — параллельные.' },
    tasks: [
      { q: 'Сколько прямых, параллельных данной, можно провести через точку, не лежащую на ней?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Вспомни аксиому параллельных.', 'Ровно одну.'], sol: 'Ровно одну.' },
      { q: 'Под каким углом пересекаются перпендикулярные прямые?', kind: 'choice', choices: ['45°', '90°', '180°'], ans: 1, tol: 0,
        hints: ['Вспомни определение.', 'Под прямым углом — 90°.'], sol: '90°.' }
    ]
  };
  const P={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',pink:'#e8a0d8',cream:'#f2e7c9'};
  const PCOL=['#ffd76a','#7fd1ff','#e8a0d8','#8fd1a8','#ff9a8a','#c9a06a'];
  /* автомобиль */
  function car(x,y,scale,col){
    return `<g transform="translate(${x},${y}) scale(${scale||1})">
      <rect x="0" y="8" width="38" height="13" rx="5" fill="${col||'#ff8a5a'}"/>
      <rect x="6" y="0" width="20" height="10" rx="4" fill="${col||'#ff8a5a'}"/>
      <rect x="9" y="2" width="14" height="6" rx="2" fill="#bfe4ff"/>
      <circle cx="9" cy="22" r="4.5" fill="#23384d"/><circle cx="30" cy="22" r="4.5" fill="#23384d"/>
      <circle cx="9" cy="22" r="2" fill="#c8d2da"/><circle cx="30" cy="22" r="2" fill="#c8d2da"/>
      <circle cx="2" cy="11" r="1.6" fill="#ffe9a8"/><circle cx="36" cy="11" r="1.6" fill="#ff9a8a"/>
    </g>`;
  }
  const road=(x1,y1,x2,y2,c,w)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c||'#7fd1ff'}" stroke-width="${w||4}" stroke-linecap="round"/>`;
  /* городской фон */
  function bgCity(inner,opt){
    const o=opt||{};
    const W=318,H=o.h||180;
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs><linearGradient id="q2sky${o.uid||0}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3a6e"/><stop offset="1" stop-color="#7a5a8e"/></linearGradient></defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#q2sky${o.uid||0})"/>
      <circle cx="270" cy="36" r="13" fill="#ffe9a8" opacity=".9"/>
      ${[14,30,46,62,78,94,110,126,142].map((x,i)=>`<rect class="q2float" style="animation-delay:${(i*0.2).toFixed(1)}s" x="${x}" y="${50+((i*17)%40)}" width="${22-i%2*6}" height="${10+i%3*8}" rx="3" fill="${i%2?'#3a4a8a':'#2c3a70'}" opacity=".9"/><rect x="${x+3}" y="${52+((i*17)%40)}" width="4" height="3" fill="#ffd76a" opacity=".8"/>`).join('')}
      <rect x="0" y="${H-14}" width="${W}" height="14" fill="#1a2740"/>
      ${inner}
    </svg>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="q2in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.06);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const chip=(t,c)=>`<span style="display:inline-block;padding:4px 10px;border-radius:9px;border:1.8px solid ${c||'#4a6a54'};font-size:13px;color:#e8dcc8">${t}</span>`;
  /* итоговый quiz со звёздами */
  const Q198=[
    {q:'Прямые, которые не пересекаются, — это…',opts:['параллельные','перпендикулярные','пересекающиеся'],ans:0},
    {q:'Перпендикулярные прямые пересекаются под углом…',opts:['45°','90°','180°'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q198[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?P.green:P.red; tc=i===T.ans?P.green:P.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:92px;font-size:15px" onclick="visW198T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      if(st.sel===T.ans){
        const got=(st.stars||0)+1;
        st.stars=got;
        msg=`<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Звёзд: ${'★'.repeat(got)}${'☆'.repeat(2-got)}</div>`;
      } else {
        msg='<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Параллельные не встречаются · перпендикулярные — под 90°</div>';
      }
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW198Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW198Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:8px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW198(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step;
      if(step===0){ st.seen=0; }
      if(step===1){ if(st.ang==null) st.ang=90; }
      if(step===2){ if(st.r==null) st.r=0; }
      if(step===3){ st.pick=null; }
      if(step===4){ if(st.found==null) st.found=0; }
      if(step===6){ st.pick=null; }
      if(step===7){ st.pick=null; }
      if(step===8){ st.pick=null; }
      if(step===9){ st.fold=0; }
      if(step===10){ st.v=0; st.h=0; }
      if(step===11){ st.zone=null; }
      if(step===12){ st.pick=null; st.q12=0; }
      if(step===13){ st.sel=null; st.q=0; st.stars=0; st.kv=0; }
    }
    let h='';
    if(step===0){
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 1 · Две дороги, которые не встретятся</div>`+
        wkHero(bgCity(`
          ${road(10,64,308,64,'#7fd1ff',5)}
          ${road(10,96,308,96,'#7fd1ff',5)}
          <g class="q2drive" style="animation-delay:0s">${car(-14,50,1.15,'#ff8a5a')}</g>
          <g class="q2drive2" style="animation-delay:.15s">${car(-14,86,1.15,'#5aa0ff')}</g>
          <g class="q2pop"><text x="20" y="62" text-anchor="middle" font-size="12" fill="#ffe9a8">машина 1</text>
          <text x="20" y="98" text-anchor="middle" font-size="12" fill="#bfe4ff">машина 2</text></g>
          <line x1="60" y1="70" x2="60" y2="90" stroke="#ffd76a" stroke-width="2.4" stroke-dasharray="4 4"/>
          <line x1="160" y1="70" x2="160" y2="90" stroke="#ffd76a" stroke-width="2.4" stroke-dasharray="4 4"/>
          <line x1="260" y1="70" x2="260" y2="90" stroke="#ffd76a" stroke-width="2.4" stroke-dasharray="4 4"/>
          <text x="159" y="130" text-anchor="middle" font-size="12" fill="#ffe9c9">расстояние между трассами не меняется</text>
        `,{h:170,uid:0}))+
        wkRow(sign('параллельные — как рельсы',P.gold,0.5))+
        wkSml('машины едут ровно · расстояние всегда одно и то же'));
    } else if(step===1){
      const ang=st.ang==null?90:st.ang;
      const rad=ang*Math.PI/180;
      const is90=Math.abs(ang-90)<1;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 2 · Перекрёсток под прямым углом</div>`+
        wkHero(bgCity(`
          ${road(10,80,308,80,'#7fd1ff',5)}
          <g style="transform-origin:150px 80px" transform="rotate(${ang-90} 150 80)">
            ${road(150,10,150,170,'#ffd76a',5)}
          </g>
          <g class="q2bump"><circle cx="150" cy="80" r="7" fill="#ffd76a" stroke="#0d1a13" stroke-width="2"/></g>
          <g class="q2pop" style="animation-delay:.3s"><rect x="200" y="34" width="92" height="30" rx="9" fill="rgba(0,0,0,.55)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="246" y="54" text-anchor="middle" font-size="17" fill="#8fd1a8" font-weight="bold">угол ${ang}°</text></g>
        `,{h:170,uid:1}))+
        `<div class="q2in" style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="font-size:12px;color:#9ec0a8">наклони улицу:</span>
          <input type="range" min="30" max="150" value="${ang}" style="flex:1;max-width:180px" oninput="visW198Act('${lk}','ang:'+this.value)">
        </div>`+
        (is90? wkRow(sign('90° — перпендикуляр! крест!',P.green,0.2)) : wkRow(sign('ищи ровно 90°',P.gold,0.2)))+
        wkSml('перпендикулярные — строгий крест: четыре одинаковых угла'));
    } else if(step===2){
      const pts=[[50,120],[150,120],[250,120]];
      const dist=st.r||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 3 · Робот с линейкой (сюрприз!)</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#1d3a2a"/>
          <rect x="0" y="0" width="318" height="34" fill="#14291e"/>
          <text x="159" y="23" text-anchor="middle" font-size="13" fill="#8fd1a8">весёлый луг</text>
          ${road(20,120,298,120,'#ffd76a',4)}
          ${road(20,60,298,60,'#ffd76a',4)}
          ${pts.map((p,i)=>`<line x1="${p[0]}" y1="60" x2="${p[0]}" y2="120" stroke="#4f9a6a" stroke-width="2" stroke-dasharray="4 4"/>
          <g class="q2bump"><circle cx="${p[0]}" cy="90" r="4.5" fill="#e8a0d8"/></g>`).join('')}
          <g class="q2pop" style="animation-delay:.4s"><rect x="30" y="136" width="258" height="30" rx="12" fill="rgba(255,255,255,.07)" stroke="#8fd1a8" stroke-width="2"/>
          <text x="159" y="157" text-anchor="middle" font-size="16" fill="#8fd1a8" font-weight="bold">расстояние = ${dist==0?60:60} · везде 60!</text></g>
        </svg>`)+
        wkRow(wkBtn('проверить точку слева',`visW198Act('${lk}','p0')`),wkBtn('точка в середине',`visW198Act('${lk}','p1')`),wkBtn('точка справа',`visW198Act('${lk}','p2')`))+
        wkSml('кликай по разным точкам — робот везде намерит 60!'));
    } else if(step===3){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 4 · Проверка угольником</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#24314f"/>
          <text x="159" y="26" text-anchor="middle" font-size="13" fill="#cfe0cf">лаборатория углов</text>
          <!-- пара 1: перпендикуляр -->
          <g><line x1="40" y1="130" x2="130" y2="130" stroke="#7fd1ff" stroke-width="4"/>
          <line x1="85" y1="60" x2="85" y2="140" stroke="#7fd1ff" stroke-width="4"/></g>
          <g class="q2pop" style="animation-delay:.2s"><text x="85" y="150" text-anchor="middle" font-size="12" fill="#cfe0ff">пара 1</text></g>
          <!-- пара 2: наклон -->
          <g><line x1="180" y1="130" x2="290" y2="130" stroke="#ff8a7a" stroke-width="4"/>
          <line x1="215" y1="56" x2="262" y2="136" stroke="#ff8a7a" stroke-width="4"/></g>
          <text x="235" y="150" text-anchor="middle" font-size="12" fill="#ffcfc2">пара 2</text>
          ${pick!=null? `<g class="q2pop"><rect x="86" y="90" width="0" height="0" fill="none"/>
          <text x="159" y="166" text-anchor="middle" font-size="14" fill="${pick===0?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick===0?'верно! угольник сел точно в 90° ✓':'не так — в паре 2 угол не прямой'}</text></g>`:''}
        </svg>`)+
        wkRow(
          wkBtn('угольник в пару 1',`visW198Act('${lk}','p0')`),
          wkBtn('угольник в пару 2',`visW198Act('${lk}','p1')`))+
        wkSml('прозрачный угольник с прямым углом · где он совпадёт идеально?'));
    } else if(step===4){
      const found=st.found||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 5 · Параллельность в природе</div>`+
        wkHero(`<svg viewBox="0 0 318 180" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="180" fill="#7fd1ff"/>
          <rect x="0" y="0" width="318" height="96" fill="#a8e8c0" opacity=".65"/>
          <rect x="0" y="96" width="318" height="42" fill="#3fae6a"/>
          <rect x="0" y="148" width="318" height="32" fill="#2e8a50"/>
          <text x="159" y="18" text-anchor="middle" font-size="13" fill="#0d3a20">лес · зебра · соты</text>
          <!-- деревья на горизонте -->
          ${[36,90,144,198,252].map((x,i)=>`<rect x="${x-4}" y="${64+(i%2)*7}" width="9" height="38" fill="#6b4426" rx="3"/>
            <circle cx="${x}" cy="${56+(i%2)*7}" r="17" fill="${found>0?'#ffe9a8':'#3fae6a'}"/>
            <circle cx="${x-11}" cy="${63+(i%2)*7}" r="10" fill="#3fae6a" opacity=".8"/><circle cx="${x+11}" cy="${62+(i%2)*7}" r="11" fill="#35945a" opacity=".85"/>`).join('')}
          <!-- зебра на лужайке внизу -->
          <g class="q2float" style="animation-delay:.5s">
            <ellipse cx="140" cy="122" rx="42" ry="17" fill="#fff"/>
            ${[0,1,2,3,4,5].map(i=>`<path d="M ${104+i*13} 116 q 5 -15 10 0 q -5 15 -10 0" fill="${found>=2?'#ffd76a':'#2a2a2a'}" opacity=".95"/>`).join('')}
            <rect x="104" y="136" width="5" height="14" rx="2" fill="#fff"/>
            <rect x="120" y="138" width="5" height="13" rx="2" fill="#fff"/>
            <rect x="152" y="138" width="5" height="13" rx="2" fill="#fff"/>
            <rect x="168" y="136" width="5" height="14" rx="2" fill="#fff"/>
            <rect x="98" y="116" width="5" height="15" rx="2" fill="#fff" transform="rotate(12 100 124)"/>
            <rect x="176" y="116" width="5" height="15" rx="2" fill="#fff" transform="rotate(-12 178 124)"/>
            <circle cx="103" cy="118" r="2.2" fill="#2a2a2a"/><circle cx="177" cy="118" r="2.2" fill="#2a2a2a"/>
          </g>
          <!-- соты -->
          <g class="q2pop" style="animation-delay:.6s">
            ${[[246,118],[272,118],[259,99],[259,137]].map((c,i)=>{const on=found>=3; return `<circle cx="${c[0]}" cy="${c[1]}" r="12" fill="${on?'#ffe9a8':'#ffd76a'}" stroke="#c9812a" stroke-width="2.2"/>`;}).join('')}
            <text x="159" y="0" font-size="0" fill="#fff"> </text>
          </g>
          <text x="159" y="176" text-anchor="middle" font-size="11.5" fill="#eaffe9" font-weight="bold">${found<3?'найди 3 параллельных: деревья · полоски зебры · соты ('+found+'/3)':'все 3 найдены! соты экономят место!'}</text>
        </svg>`)+
        wkRow(wkBtn('стволы деревьев',`visW198Act('${lk}','f0')`),wkBtn('полоски зебры',`visW198Act('${lk}','f1')`),wkBtn('соты',`visW198Act('${lk}','f2')`))+
        wkSml('кликни 3 объекта с параллельными линиями'));
    } else if(step===5){
      const tilt=st.tilt||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 6 · Перпендикуляр в строительстве</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#e8dcc0"/>
          <rect x="0" y="0" width="318" height="40" fill="#7fd1ff"/><circle cx="60" cy="20" r="9" fill="#ffe9a8"/>
          <rect x="0" y="140" width="318" height="30" fill="#8a7a5a"/>
          <rect x="10" y="132" width="298" height="10" fill="#c9a06a"/>
          <g style="transform-origin:60px 142px" transform="rotate(${tilt} 60 142)">
            <rect x="60" y="52" width="46" height="90" fill="#c96a4a" stroke="#8a4428" stroke-width="2"/>
            <rect x="66" y="58" width="34" height="14" fill="#ffe9a8"/><rect x="66" y="80" width="34" height="14" fill="#8fd1a8"/>
            <rect x="66" y="102" width="34" height="14" fill="#7fd1ff"/>
            <line x1="46" y1="52" x2="120" y2="52" stroke="#ffd76a" stroke-width="3.4"/>
            <line x1="46" y1="52" x2="46" y2="142" stroke="#ffd76a" stroke-width="3.4"/>
            <g class="q2pop"><rect x="70" y="142" width="30" height="14" rx="4" fill="#5a3d20"/></g>
          </g>
          ${tilt!==0? `<g class="q2wob"><text x="159" y="30" text-anchor="middle" font-size="15" fill="#c0392b" font-weight="bold">дом шатается!</text></g>`:
          `<text x="159" y="30" text-anchor="middle" font-size="15" fill="#2a5a3a" font-weight="bold">стена ⊥ пол — дом крепкий</text>`}
        </svg>`)+
        wkRow(wkBtn('наклонить стену',`visW198Act('${lk}','tilt')`), wkBtn('выровнять обратно',`visW198Act('${lk}','tilt0')`))+
        wkSml('потяни стену — увидишь, почему 90° важны'));
    } else if(step===6){
      const pick=st.pick;
      const pairs=[
        {type:'parallel',name:'параллельные',l1:[20,60,150,60],l2:[20,110,150,110],col:'#7fd1ff'},
        {type:'perp',name:'перпендикулярные',l1:[190,130,290,130],l2:[240,70,240,140],col:'#ff8a7a'}
      ];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 7 · Магические значки // и ⊥</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#33275e"/>
          <text x="159" y="26" text-anchor="middle" font-size="13" fill="#d8c9ff">магическая лаборатория значков</text>
          <g class="q2pop"><line x1="20" y1="55" x2="150" y2="55" stroke="${pairs[0].col}" stroke-width="4"/>
          <line x1="20" y1="105" x2="150" y2="105" stroke="${pairs[0].col}" stroke-width="4"/></g>
          <g class="q2pop" style="animation-delay:.25s"><line x1="190" y1="130" x2="290" y2="130" stroke="${pairs[1].col}" stroke-width="4"/>
          <line x1="240" y1="70" x2="240" y2="140" stroke="${pairs[1].col}" stroke-width="4"/></g>
          <g class="q2bump" style="animation-delay:.5s"><circle cx="85" cy="150" r="24" fill="rgba(255,255,255,.06)" stroke="#e8a0d8" stroke-width="2.4"/>
          <text x="85" y="157" text-anchor="middle" font-size="20" fill="#e8a0d8" font-weight="bold">?</text></g>
          <g class="q2bump" style="animation-delay:.6s"><circle cx="240" cy="150" r="24" fill="rgba(255,255,255,.06)" stroke="#ffd76a" stroke-width="2.4"/>
          <text x="240" y="157" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold">?</text></g>
          ${pick!=null? `<text x="159" y="168" text-anchor="middle" font-size="13" fill="${pick?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick? 'верно! // — параллельные ✓':'не так. Пара 1 (две ровные) — //'}</text>`:''}
        </svg>`)+
        wkRow(wkBtn('пара 1 — значок //',`visW198Act('${lk}','p0')`),wkBtn('пара 2 — значок ⊥',`visW198Act('${lk}','p1')`))+
        wkSml('перетащи значок: // две чёрточки · ⊥ перевёрнутая Т'));
    } else if(step===7){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 8 · Почти параллельные — нет!</div>`+
        wkHero(`<svg viewBox="0 0 318 180" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="180" fill="#2a1f2e"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#e8c9d8">увеличительное стекло</text>
          <line x1="30" y1="60" x2="290" y2="50" stroke="#ffd76a" stroke-width="4"/>
          <line x1="30" y1="110" x2="290" y2="130" stroke="#ffd76a" stroke-width="4"/>
          <g class="q2pop" style="animation-delay:.5s"><circle cx="270" cy="96" r="34" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2.6"/>
          <line x1="246" y1="70" x2="296" y2="118" stroke="#7fd1ff" stroke-width="3"/>
          <text x="270" y="140" text-anchor="middle" font-size="11" fill="#7fd1ff">здесь пересекутся!</text></g>
          <text x="159" y="162" text-anchor="middle" font-size="13" fill="#e8c9d8">сходятся по чуть-чуть — далеко встретятся</text>
        </svg>`)+
        (pick!=null? wkRow(sign(pick===1?'верно! расстояние меняется — не параллельны!':'неверно! они чуть-чуть сходятся — встретятся!', pick===1?P.green:P.red,0.1)) : '')+
        wkRow(wkBtn('параллельны',`visW198Act('${lk}','p0')`),wkBtn('не параллельны',`visW198Act('${lk}','p1')`))+
        wkSml('если расстояние чуть-чуть меняется — они обязательно встретятся'));
    } else if(step===8){
      const pick=st.pick;
      const opts=[89,90,91];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 9 · Ловушки: 89°, 90°, 91°</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#1e3350"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#cfe0ff">транспортир наготове</text>
          ${opts.map((a,i)=>{
            const x=40+i*90;
            const rad=(a)*Math.PI/180;
            return `<g><line x1="${x}" y1="120" x2="${x+70}" y2="120" stroke="#7fd1ff" stroke-width="4"/>
            <line x1="${x}" y1="120" x2="${x+70*Math.cos(rad)}" y2="${120-70*Math.sin(rad)}" stroke="${a===90?'#8fd1a8':'#ff8a7a'}" stroke-width="4"/>
            <path d="M ${x+22} 120 A 22 22 0 0 0 ${x+22*Math.cos(rad)} ${120-22*Math.sin(rad)}" fill="none" stroke="#ffd76a" stroke-width="2.4"/>
            <text x="${x+35}" y="138" text-anchor="middle" font-size="13" fill="#ffd76a">${a}°</text></g>`;
          }).join('')}
          ${pick!=null? `<text x="159" y="166" text-anchor="middle" font-size="14" fill="${pick===1?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick===1?'верно! только 90° — перпендикуляр ✓':'нет! только ровно 90°'}</text>`:''}
        </svg>`)+
        wkRow(wkBtn('89°',`visW198Act('${lk}','p0')`),wkBtn('90°',`visW198Act('${lk}','p1')`),wkBtn('91°',`visW198Act('${lk}','p2')`))+
        wkSml('какой угол даёт перпендикуляр? проведи пальцем и измерь'));
    } else if(step===9){
      const fold=st.fold||0;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 10 · Параллельные сгибом листа</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#31403a"/>
          <rect x="0" y="0" width="318" height="34" fill="#203028"/>
          <text x="159" y="23" text-anchor="middle" font-size="13" fill="#9fe8c0">бумажная мастерская</text>
          <g class="q2sway"><rect x="60" y="44" width="200" height="110" rx="6" fill="#f2e7c9" stroke="#b89a5a" stroke-width="2"/>
          ${fold>=1? `<line x1="60" y1="44" x2="260" y2="44" stroke="#d9a441" stroke-width="0"/>` : ''}
          ${fold>=1? `<g class="q2pop"><rect x="60" y="44" width="200" height="14" fill="#efe0b0" opacity=".9"/>
            <line x1="60" y1="51" x2="260" y2="51" stroke="#c9812a" stroke-width="3"/></g>`:''}
          ${fold>=2? `<g class="q2pop"><rect x="60" y="58" width="200" height="14" fill="#efe0b0" opacity=".9"/>
            <line x1="60" y1="65" x2="260" y2="65" stroke="#c9812a" stroke-width="3"/></g>`:''}
          ${fold>=3? `<g class="q2pop"><rect x="60" y="72" width="200" height="14" fill="#efe0b0" opacity=".9"/>
            <line x1="60" y1="79" x2="260" y2="79" stroke="#c9812a" stroke-width="3"/></g>`:''}
          </g>
          ${fold===0? `<g class="q2float"><text x="159" y="130" text-anchor="middle" font-size="14" fill="#8a6a3a">согни лист!</text></g>`:''}
          ${fold>=3? `<text x="159" y="170" text-anchor="middle" font-size="13" fill="#9fe8c0">сгибы параллельны друг другу</text>`:''}
        </svg>`)+
        wkRow(fold<3? wkBtn('согнуть ещё раз',`visW198Act('${lk}','fold')`) : wkBtn('сброс',`visW198Act('${lk}','rst')`))+
        wkSml('каждый сгиб, параллельный первому, — новая линия'));
    } else if(step===10){
      const v=st.v||0,h2=st.h||0;
      const n=6,cell=26;
      const ox=(318-n*cell)/2, oy=34;
      let grid='';
      for(let r=0;r<n;r++)for(let c=0;c<n;c++){ grid+=`<rect x="${ox+c*cell}" y="${oy+r*cell}" width="${cell}" height="${cell}" fill="none" stroke="#5a8ab0" stroke-width="1" opacity=".5"/>`; }
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 11 · Тетрадь в клетку</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#f2e7c9"/>
          ${grid}
          <g class="q2pop"><text x="159" y="26" text-anchor="middle" font-size="13" fill="#8a6a3a">проведи по клеткам</text></g>
          ${h2? `<line x1="${ox+cell}" y1="${oy+cell}" x2="${ox+cell*4}" y2="${oy+cell}" stroke="#e8483a" stroke-width="6"/>`:''}
          ${v? `<line x1="${ox+cell}" y1="${oy+cell}" x2="${ox+cell}" y2="${oy+cell*4}" stroke="#2a7ab8" stroke-width="6"/>`:''}
          ${v&&h2? `<g class="q2pop"><circle cx="${ox+cell}" cy="${oy+cell}" r="6" fill="#ffd76a"/><text x="159" y="164" text-anchor="middle" font-size="13" fill="#2a5a3a" font-weight="bold">вертикаль ⊥ горизонталь — 90°!</text></g>`:''}
        </svg>`)+
        wkRow(wkBtn('провести вниз',`visW198Act('${lk}','v')`),wkBtn('провести вправо',`visW198Act('${lk}','h')`), (v&&h2)?wkBtn('сброс',`visW198Act('${lk}','rst')`):'')+
        wkSml('линии тетради — готовые перпендикуляры'));
    } else if(step===11){
      const zone=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 12 · Карта города</div>`+
        wkHero(`<svg viewBox="0 0 318 180" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="180" fill="#e8e0c8"/>
          <text x="159" y="18" text-anchor="middle" font-size="13" fill="#7a5a3a">какой квартал построен правильно?</text>
          <!-- квартал A: улицы сходятся -->
          <line x1="20" y1="40" x2="90" y2="150" stroke="#b0784a" stroke-width="3"/>
          <line x1="90" y1="40" x2="20" y2="150" stroke="#b0784a" stroke-width="3"/>
          <line x1="20" y1="90" x2="90" y2="90" stroke="#b0784a" stroke-width="2.6"/>
          <!-- квартал B: правильная сетка -->
          <line x1="130" y1="40" x2="130" y2="150" stroke="#4a8ac8" stroke-width="3"/>
          <line x1="190" y1="40" x2="190" y2="150" stroke="#4a8ac8" stroke-width="3"/>
          <line x1="128" y1="90" x2="192" y2="90" stroke="#4a8ac8" stroke-width="3"/>
          <line x1="128" y1="130" x2="192" y2="130" stroke="#4a8ac8" stroke-width="3"/>
          <!-- квартал C: острые углы -->
          <line x1="230" y1="150" x2="300" y2="40" stroke="#c86a4a" stroke-width="3"/>
          <line x1="230" y1="40" x2="300" y2="150" stroke="#c86a4a" stroke-width="3"/>
          ${zone!=null? `<g class="q2pop"><rect x="${zone===0?24:(zone===1?134:234)}" y="150" width="${zone===1?56:70}" height="22" rx="5" fill="rgba(255,215,106,.8)" stroke="#0d1a13" stroke-width="2"/></g>`:''}
          <text x="55" y="166" text-anchor="middle" font-size="12" fill="#7a5a3a" font-weight="bold">A</text>
          <text x="162" y="166" text-anchor="middle" font-size="12" fill="#7a5a3a" font-weight="bold">B</text>
          <text x="267" y="166" text-anchor="middle" font-size="12" fill="#7a5a3a" font-weight="bold">C</text>
        </svg>`)+
        (zone!=null? wkRow(sign(zone===1?'верно! квартал B — все углы прямые ✓':'не так. Ищи ровные улицы и прямые углы', zone===1?P.green:P.red,0.1)) : '')+
        wkRow(wkBtn('квартал A',`visW198Act('${lk}','z0')`),wkBtn('квартал B',`visW198Act('${lk}','z1')`),wkBtn('квартал C',`visW198Act('${lk}','z2')`))+
        wkSml('B: параллельные улицы + перпендикулярные проспекты — удобный город'));
    } else if(step===12){
      const pick=st.pick; const qi=st.q12||0;
      const Qs=[
        {l1:[20,60,290,60],l2:[20,120,290,120],type:'параллельные',type2:0},
        {l1:[20,90,290,90],l2:[150,20,150,160],type:'перпендикулярные',type2:1},
        {l1:[20,40,290,140],l2:[20,140,290,40],type:'пересекающиеся',type2:2},
        {l1:[40,90,160,50],l2:[60,120,200,100],type:'ни те, ни другие',type2:3}
      ];
      const T=Qs[qi%Qs.length];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 13 · Дуэль линий</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="160" fill="#2a2340"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#e8d8ff">ринг прямых</text>
          <g class="q2pop"><line x1="${T.l1[0]}" y1="${T.l1[1]}" x2="${T.l1[2]}" y2="${T.l1[3]}" stroke="#ffd76a" stroke-width="5" stroke-linecap="round"/>
          <line x1="${T.l2[0]}" y1="${T.l2[1]}" x2="${T.l2[2]}" y2="${T.l2[3]}" stroke="#e8a0d8" stroke-width="5" stroke-linecap="round"/></g>
          <text x="159" y="146" text-anchor="middle" font-size="13" fill="#9fb0d0">как зовут эту пару?</text>
        </svg>`)+
        (pick!=null? `<div class="wk-ans" style="color:${pick===T.type2?'#8fd1a8':'#ff8a7a'}">${pick===T.type2?'верно! это '+T.type:'не так — присмотрись'}</div>`:'')+
        (pick!=null&&pick===T.type2? wkRow(wkBtn('следующая дуэль',`visW198Act('${lk}','next')`)):'')+
        `<div class="wk-row" style="gap:6px">
          <button class="wk-btn" style="font-size:13px;min-width:70px" onclick="visW198T2('${lk}',0)">параллельные</button>
          <button class="wk-btn" style="font-size:13px;min-width:70px" onclick="visW198T2('${lk}',1)">перпендикулярные</button>
          <button class="wk-btn" style="font-size:13px;min-width:70px" onclick="visW198T2('${lk}',2)">пересекающиеся</button>
          <button class="wk-btn" style="font-size:13px;min-width:70px" onclick="visW198T2('${lk}',3)">никакие</button>
        </div>`+
        wkSml('различи параллельные и перпендикулярные с первого взгляда'));
    } else {
      // финал + квест-комната + quiz
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 14 · Спаси комнату!</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="160" fill="#3d4a6a"/>
          <text x="159" y="20" text-anchor="middle" font-size="13" fill="#cfe0cf">комната</text>
          <!-- пол и потолок -->
          <rect x="30" y="120" width="258" height="10" fill="#8a5a2e"/>
          <rect x="30" y="40" width="258" height="10" fill="#8a5a2e"/>
          ${st.kv? `<g class="q2pop"><rect x="30" y="50" width="10" height="70" fill="#c96a4a"/>
            <rect x="120" y="50" width="10" height="70" fill="#7fb7e8"/>
            <rect x="240" y="50" width="10" height="70" fill="#e8a0d8"/>
            <line x1="30" y1="45" x2="30" y2="125" stroke="#ffd76a" stroke-width="3"/>
            <text x="159" y="148" text-anchor="middle" font-size="13" fill="#8fd1a8" font-weight="bold">стены ⊥ пол · потолок ∥ пол — комната спасена!</text></g>`
          : `<g class="q2fall" style="transform-origin:30px 125px"><rect x="30" y="50" width="10" height="70" fill="#c96a4a" opacity=".85"/></g>
             <g class="q2fall" style="transform-origin:120px 125px;animation-delay:.3s"><rect x="120" y="50" width="10" height="70" fill="#7fb7e8" opacity=".85"/></g>
             <g class="q2fall" style="transform-origin:240px 125px;animation-delay:.15s"><rect x="240" y="50" width="10" height="70" fill="#e8a0d8" opacity=".85"/></g>
             <text x="159" y="148" text-anchor="middle" font-size="13" fill="#ff9a8a" font-weight="bold">стены шатаются — исправь!</text>`}
        </svg>`)+
        (st.kv? '' : wkRow(wkBtn('выпрямить все стены',`visW198Act('${lk}','kv')`)))+
        quiz(lk,st)+
        wkSml('ты мастер прямых! жми «Понял! Проверю себя»'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[198]=visW198;
  function visW198T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW198T=visW198T;
  function visW198T2(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.pick=i; chRender(0);
  }
  window.visW198T2=visW198T2;
  function visW198Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act.indexOf('ang:')===0){ st.ang=parseInt(act.slice(4),10); }
    if(act==='z0') st.pick=0;
    if(act==='z1') st.pick=1;
    if(act==='z2') st.pick=2;
    if(act==='p0') st.pick=0;
    if(act==='p1') st.pick=1;
    if(act==='p2') st.pick=2;
    if(act==='f0'||act==='f1'||act==='f2'){ st.found=(st.found||0)+1; if(st.found>3) st.found=3; }
    if(act==='tilt') st.tilt=9;
    if(act==='tilt0') st.tilt=0;
    if(act==='fold') st.fold=(st.fold||0)+1;
    if(act==='v') st.v=1;
    if(act==='h') st.h=1;
    if(act==='kv') st.kv=1;
    if(act==='next'){ st.q12=(st.q12||0)+1; st.pick=null; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW198Act=visW198Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===198){ window.ARH_LESSONS[i]=L198; break; } } })();
})();
/* ================= УРОК 194 · Задачи на части и отношения (v2 · 14 блоков по сценарию) ================= */
(function(){
  if(!window.__wk194v2css){
    window.__wk194v2css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .t7in{animation:t7In .5s cubic-bezier(.2,.85,.3,1.05) both;}'+
      '@keyframes t7In{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .t7pop{animation:t7Pop .5s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t7Pop{0%{transform:scale(.12);opacity:0}70%{transform:scale(1.1);opacity:1}100%{transform:scale(1)}}'+
      '#lvis .t7jump{animation:t7Jump 1s ease both;transform-box:fill-box;transform-origin:center bottom;}'+
      '@keyframes t7Jump{0%{transform:translateY(14px) scale(1,.4);opacity:0}40%{opacity:1}100%{transform:translateY(0) scale(1,1);opacity:1}}'+
      '#lvis .t7float{animation:t7Float 2s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t7Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}'+
      '#lvis .t7sway{animation:t7Sway 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t7Sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}'+
      '#lvis .t7bump{animation:t7Bump .85s ease-in-out infinite;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes t7Bump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}'+
      '#lvis .t7dash{stroke-dasharray:8 6;animation:t7Dash .8s linear infinite;}'+
      '@keyframes t7Dash{to{stroke-dashoffset:-28}}'+
      '#lvis .t7slide{animation:t7Slide 1s cubic-bezier(.3,.7,.4,1) both;}'+
      '@keyframes t7Slide{from{transform:translateX(var(--sx));opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(st);
  }
  const L194 = {
    id: 194, title: 'Задачи на части и отношения', ico: '≈',
    src: 'Математика · 6 класс · Отношения', subj: 'math',
    explain: [
      'У Тома корзина с 3 яблоками, у Рика — с 5. Отношение 3:5 говорит, что яблок Тома 3 «части», а Рика — 5 таких же частей. Отношение — это просто сравнение двух чисел через двоеточие!',
      'Варенье: на 2 кг слив кладут 3 кг сахара — отношение 2:3. Стройка: песок и цемент мешают в отношении 3:1. Отношения повсюду: в рецептах, растворах, смесях!',
      'Большой круг разделён на 5 равных секторов. 1 красный и 4 синих — отношение 1:4. Кликни по сектору — он поменяет цвет, и отношение пересчитается само!',
      'Главный рецепт Архимеда для задач на части: 1) сложи части отношения (2+3=5); 2) подели целое на сумму (60:5=12 — одна часть); 3) умножь на каждую часть (2·12=24 и 3·12=36).',
      'Древний рецепт стекла: 10 частей поташа, 31 часть песка, 2 части мела. Всего 10+31+2=43 части. Если стекла 86 пудов — одна часть = 86:43 = 2 пуда. Сколько же каждого материала?',
      'Две машинистки: одна печатает 10 страниц в час, другая — 8. Рукопись 90 страниц. Кто сколько получит, чтобы закончить одновременно? Скорости 10:8 = 5:4 — так и страницы делим!',
      'Велосипедист едет в 5 раз быстрее пешехода, навстречу — 30 км. До встречи велосипедист проедет 5 частей пути, пешеход — 1 часть. 30:6=5 км одна часть. Кто сколько проедет?',
      'Отношение 3:5 можно записать и как дробь 3/5! Это одно и то же: сравнение чисел через двоеточие или через дробную черту.',
      'В классе 15 девочек и 10 мальчиков — всего 25 учеников. Какую часть составляют девочки? 15 из 25: дробь 15/25 = 3/5. Отношение показывает и «во сколько раз», и «какую часть»!',
      'Отрезок 14 см делим в отношении 3:4. Всего 3+4=7 частей, одна часть 14:7=2 см. Тогда 3·2=6 см и 4·2=8 см. Геометрия тоже живёт по правилам отношений!',
      'Ювелирный сплав: золото и серебро в отношении 2:3. Слиток 7,5 кг — это 2+3=5 частей, одна часть 7,5:5=1,5 кг. Золота 2·1,5=3 кг, серебра 3·1,5=4,5 кг.',
      'Огородник смешивает семена моркови с песком в отношении 2:5. Песка взяли 200 г — это 5 частей, одна часть 200:5=40 г. Семян нужно 2·40=80 г!',
      'Ловушки! Проверь себя: 1) не перепутай, что с чем сравниваешь; 2) всегда складывай части отношения; 3) дели целое на сумму частей, а не на каждую часть по отдельности.',
      'Финальный квест: спаси город! Реши три задачи на отношения — и мост, стекло и сад вернутся к жизни. Ты теперь настоящий мастер частей и отношений! Жми «Понял! Проверю себя»!'
    ],
    check: { q: 'Число 60 разделили в отношении 2 : 3. Чему равна БОЛЬШАЯ часть?', choices: ['24', '36', '12'], ans: 1,
      exp: '2+3=5 частей; 60:5=12; 3·12=36.' },
    tasks: [
      { q: 'Число 40 разделили в отношении 1 : 3. Чему равна МЕНЬШАЯ часть?', kind: 'unit', ans: 10, tol: 0,
        hints: ['Всего частей: 1+3=4.', '40:4=10.'], sol: '40 : 4 = 10.' },
      { q: 'Число 100 разделили в отношении 2 : 3. Чему равна большая часть?', kind: 'choice', choices: ['40', '60', '50'], ans: 1, tol: 0,
        hints: ['Всего 5 частей: 100:5=20.', 'Большая 3·20=60.'], sol: '100:5=20; 3·20=60.' }
    ]
  };
  const T={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a',pink:'#e8a0d8',purple:'#c9a0ff',orange:'#ffb36b'};
  /* яблоко */
  function apple(x,y,s){
    return `<g class="t7jump" style="animation-delay:${(s.delay||0).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="10" fill="${s.c||'#ff6a4a'}"/><path d="M ${x-3} ${y-9} q 3 -7 7 -6 q -4 1 -7 6" fill="#4a8a3a"/><rect x="${x-1}" y="${y-17}" width="3" height="5" rx="1.5" fill="#6b4426"/></g>`;
  }
  const sign=(t,c,delay,fs)=>`<span class="t7in" style="animation-delay:${(delay||0).toFixed(2)}s;display:inline-block;padding:6px 13px;border-radius:12px;border:2.2px solid ${c};background:rgba(255,255,255,.05);font-family:Georgia,serif;font-size:${fs||21}px;color:${c};font-weight:bold">${t}</span>`;
  const Q194=[
    {q:'60 разделили в отношении 2:3. БОЛЬШАЯ часть?',opts:['24','36','12'],ans:1},
    {q:'40 разделили в отношении 1:3. МЕНЬШАЯ часть?',opts:['10','20','30'],ans:0}
  ];
  function quiz(lk,st){
    const T=Q194[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.06)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.22)':'rgba(232,106,90,.2)'; bd=i===T.ans?T.green:T.red; tc=i===T.ans?T.green:T.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:70px;font-size:18px" onclick="visW194T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      if(st.sel===T.ans){
        const got=(st.stars||0)+1; st.stars=got;
        msg=`<div class="wk-ans" style="color:#8fd1a8;font-size:17px">Верно! Звёзд: ${'★'.repeat(got)}${'☆'.repeat(2-got)}</div>`;
      } else msg='<div class="wk-ans" style="color:#ff8a7a;font-size:16px">Не так. Сложи части, подели, умножь</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW194Act('${lk}','nq')`):'';
    const rst=wkBtn('заново',`visW194Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row" style="gap:9px">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW194(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step;
      if(step===0){ st.sh=0; st.pick=null; }
      if(step===1){ if(st.sugar==null) st.sugar=3; }
      if(step===2){ if(st.red==null) st.red=2; }
      if(step===3){ st.sh=0; }
      if(step===5){ st.pick=null; }
      if(step===6){ st.pick=null; }
      if(step===7){ st.pick=null; }
      if(step===8){ st.pick=null; }
      if(step===9){ if(st.pos==null) st.pos=6; st.ok=null; }
      if(step===10){ st.pick=null; st.s1=0; st.s2=0; }
      if(step===11){ st.pick=null; }
      if(step===12){ st.pick=null; }
      if(step===13){ st.sel=null; st.q=0; st.stars=0; st.q2=0; }
    }
    let h='';
    if(step===0){
      const sh=st.sh||0;
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 1 · Отношение: яблоки</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#2f3a4a"/>
          <text x="159" y="22" text-anchor="middle" font-size="13" fill="#cfe0cf">кто сколько собрал?</text>
          <g class="t7pop"><rect x="16" y="40" width="132" height="120" rx="12" fill="rgba(255,255,255,.04)" stroke="${sh>=1?'#ffd76a':'#4a6a54'}" stroke-width="2.4"/>
            <text x="82" y="60" text-anchor="middle" font-size="15" fill="#ffe9c9" font-weight="bold">Том</text>
            <path d="M 40 150 L 124 150 L 110 110 L 54 110 Z" fill="#b98a5a" opacity=".7"/>
            ${sh>=1?[0,1,2].map(i=>apple(70+(i%3)*18-16,110-Math.floor(i/3)*24-16,{c:'#ff8a5a',delay:i*0.12})).join(''):''}
            ${sh>=1?`<text x="82" y="166" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">3</text>`:''}
          </g>
          <g class="t7pop" style="animation-delay:.15s"><rect x="170" y="40" width="132" height="120" rx="12" fill="rgba(255,255,255,.04)" stroke="${sh>=2?'#ffd76a':'#4a6a54'}" stroke-width="2.4"/>
            <text x="236" y="60" text-anchor="middle" font-size="15" fill="#ffe9c9" font-weight="bold">Рик</text>
            <path d="M 194 150 L 278 150 L 264 110 L 208 110 Z" fill="#b98a5a" opacity=".7"/>
            ${sh>=2?[0,1,2,3,4].map(i=>apple(214+(i%4)*14-10,112-Math.floor(i/4)*20-16,{c:'#ffb36b',delay:.2+i*0.1})).join(''):''}
            ${sh>=2?`<text x="236" y="166" text-anchor="middle" font-size="20" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">5</text>`:''}
          </g>
          ${sh>=3&&pick==null? `<text x="159" y="140" text-anchor="middle" font-size="13" fill="#cfe0cf">как записать отношение?</text>`:''}
        </svg>`)+
        (pick!=null? wkRow(sign(pick===0?'верно! 3:5 — Том к Рику ✓':'3 яблока Тома : 5 яблок Рика = 3:5', pick===0?T.green:T.red,0.1)) : '')+
        wkRow(
          sh===0? wkBtn('посчитать Тома',`visW194Act('${lk}','go')`) : '',
          sh===1? wkBtn('посчитать Рика',`visW194Act('${lk}','go')`) : '',
          sh===2? wkBtn('как записать?',`visW194Act('${lk}','go')`) : '',
          sh===3&&pick==null? wkBtn('3 : 5',`visW194Act('${lk}','p0')`) : '',
          sh===3&&pick==null? wkBtn('5 : 3',`visW194Act('${lk}','p1')`) : '',
          sh>=1? wkBtn('сброс',`visW194Act('${lk}','rst')`) : '')+
        wkSml('3:5 — яблок Тома 3 части, Рика 5 · отношение = сравнение чисел'));
    } else if(step===1){
      const sugar=st.sugar==null?3:st.sugar;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 2 · Варенье и стройка</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#3a2f22"/>
          <text x="80" y="30" text-anchor="middle" font-size="14" fill="#ffe9c9">варенье: сливы 2</text>
          <text x="240" y="30" text-anchor="middle" font-size="14" fill="#ffe9c9">сахар ${sugar}</text>
          <g class="t7pop"><circle cx="60" cy="90" r="16" fill="#7a3a5a"/><circle cx="95" cy="90" r="16" fill="#8a4a6a"/>
            <rect x="44" y="116" width="68" height="34" rx="8" fill="#e8dcc8" stroke="#b89a5a" stroke-width="2"/>
            <text x="78" y="138" text-anchor="middle" font-size="15" fill="#7a3a5a" font-weight="bold">сливы</text>
            <text x="78" y="155" text-anchor="middle" font-size="17" fill="#5a3a1a" font-weight="bold">2 кг</text></g>
          <text x="150" y="96" text-anchor="middle" font-size="30" fill="#ffd76a" font-weight="bold">:</text>
          <g class="t7pop" style="animation-delay:.2s"><rect x="168" y="52" width="86" height="64" rx="10" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2"/>
            <text x="211" y="82" text-anchor="middle" font-size="24" fill="#ffd76a" font-weight="bold">${sugar} кг</text>
            <text x="211" y="104" text-anchor="middle" font-size="11" fill="#ffe9c9">сахар</text></g>
          <text x="159" y="170" text-anchor="middle" font-size="13" fill="#e8dcc8">${sugar===2?'сладко-кислое · мало сахара':sugar===5?'приторно! много сахара':'2:${sugar} — как в рецепте!'}</text>
        </svg>`)+
        `<div class="t7in" style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="font-size:12px;color:#9ec0a8">сахар (части):</span>
          <input type="range" min="1" max="5" value="${sugar}" style="flex:1;max-width:180px" oninput="visW194Act('${lk}','sg:'+this.value)">
        </div>`+
        wkSml('рецепт 2:3 · меняй сахар ползунком — меняется вкус'));
    } else if(step===2){
      const red=st.red==null?1:st.red;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 3 · Круг из частей</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#1e2a3a"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#cfe0cf">5 секторов · кликай — меняй цвет!</text>
          <g transform="translate(60,40)">
            ${[0,1,2,3,4].map(i=>{const a0=i*72-90, a1=a0+72; const on=i<red;
              const x1=75+55*Math.cos(a0*Math.PI/180), y1=75+55*Math.sin(a0*Math.PI/180);
              const x2=75+55*Math.cos(a1*Math.PI/180), y2=75+55*Math.sin(a1*Math.PI/180);
              return `<path class="t7pop" style="animation-delay:${(i*0.08).toFixed(2)}s;cursor:pointer" onclick="visW194Act('${lk}','sec:${i}')" d="M 75 75 L ${x1.toFixed(1)} ${y1.toFixed(1)} A 55 55 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${on?'#e8484a':'#4a8ac8'}" stroke="#fff" stroke-width="2"/>`;}).join('')}
            <circle cx="75" cy="75" r="55" fill="none" stroke="#fff" stroke-width="2"/>
          </g>
          <g class="t7pop" style="animation-delay:.5s"><rect x="176" y="60" width="120" height="60" rx="12" fill="rgba(255,255,255,.05)" stroke="#ffd76a" stroke-width="2.4"/>
            <text x="236" y="82" text-anchor="middle" font-size="14" fill="#ffe9c9">красные : синие</text>
            <text x="236" y="108" text-anchor="middle" font-size="24" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">${red} : ${5-red}</text></g>
          <text x="159" y="162" text-anchor="middle" font-size="13" fill="#8fd1a8">всего 5 частей · отношение пересчитывается само</text>
        </svg>`)+
        wkRow(wkBtn('сделать ещё красным',`visW194Act('${lk}','more')`),wkBtn('убрать красный',`visW194Act('${lk}','less')`),wkBtn('сброс',`visW194Act('${lk}','rst')`))+
        wkSml('кликни по сектору или жми кнопки · 1:4, 2:3, 3:2…'));
    } else if(step===3){
      const sh=st.sh||0;
      const total=60, parts=5, one=12;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 4 · 60 конфет в отношении 2:3</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#3a1f2a"/>
          <text x="159" y="24" text-anchor="middle" font-size="14" fill="#ffe9c9">60 конфет · младшему 2 части, старшему 3</text>
          ${sh>=1? `<g class="t7pop"><rect x="20" y="44" width="120" height="52" rx="12" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2.4"/>
            <text x="80" y="64" text-anchor="middle" font-size="12" fill="#cfe0ff">шаг 1 · все части</text>
            <text x="80" y="86" text-anchor="middle" font-size="22" fill="#7fd1ff" font-weight="bold" font-family="Georgia,serif">2 + 3 = 5</text></g>`:''}
          ${sh>=2? `<g class="t7pop" style="animation-delay:.15s"><rect x="170" y="44" width="128" height="52" rx="12" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.4"/>
            <text x="234" y="64" text-anchor="middle" font-size="12" fill="#ffe9c9">шаг 2 · одна часть</text>
            <text x="234" y="86" text-anchor="middle" font-size="22" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">60 : 5 = 12</text></g>`:''}
          ${sh>=3? `<g class="t7pop" style="animation-delay:.3s"><rect x="30" y="112" width="120" height="46" rx="12" fill="rgba(232,160,216,.1)" stroke="#e8a0d8" stroke-width="2.4"/>
            <text x="90" y="131" text-anchor="middle" font-size="12" fill="#f0c9e6">младшему</text>
            <text x="90" y="150" text-anchor="middle" font-size="20" fill="#e8a0d8" font-weight="bold">2·12 = 24</text></g>
            <g class="t7pop" style="animation-delay:.45s"><rect x="168" y="112" width="120" height="46" rx="12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
            <text x="228" y="131" text-anchor="middle" font-size="12" fill="#cfe0cf">старшему</text>
            <text x="228" y="150" text-anchor="middle" font-size="20" fill="#8fd1a8" font-weight="bold">3·12 = 36</text></g>`:''}
          ${sh>=4? `<g class="t7pop" style="animation-delay:.5s"><text x="159" y="172" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">24 + 36 = 60 — всё сошлось!</text></g>`:''}
        </svg>`)+
        wkRow(
          sh===0? wkBtn('1 · сложить части',`visW194Act('${lk}','go')`) : '',
          sh===1? wkBtn('2 · 60 : 5',`visW194Act('${lk}','go')`) : '',
          sh===2? wkBtn('3 · умножить на части',`visW194Act('${lk}','go')`) : '',
          sh===3? wkBtn('4 · проверить',`visW194Act('${lk}','go')`) : '',
          sh>=1? wkBtn('сброс',`visW194Act('${lk}','rst')`) : '')+
        wkSml('сумма частей → одна часть → умножь на каждую'));
    } else if(step===4){
      const w=st.w==null?86:st.w;
      const parts=[10,31,2]; const sum=43; const one=w/sum;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 5 · Стекло: 10:31:2</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#3a332a"/>
          <text x="159" y="22" text-anchor="middle" font-size="13" fill="#e8dcc8">поташ : песок : мел = 10 : 31 : 2</text>
          ${[['поташ',10,'#8fd1a8'],['песок',31,'#ffd76a'],['мел',2,'#fff']].map((m,i)=>{
            const x=18+i*98;
            const hgt=Math.round(70*m[1]/31);
            return `<g class="t7jump" style="animation-delay:${(i*0.15).toFixed(2)}s"><rect x="${x}" y="${110-hgt}" width="76" height="${hgt}" rx="8" fill="${m[2]}" opacity=".8"/>
            <text x="${x+38}" y="${110-hgt-6}" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold">${Math.round(one*m[1]*10)/10}</text>
            <text x="${x+38}" y="128" text-anchor="middle" font-size="12" fill="#e8dcc8">${m[0]}</text></g>`;
          }).join('')}
          <text x="159" y="162" text-anchor="middle" font-size="14" fill="#ffd76a" font-weight="bold">${w} пудов · одна часть = ${w} : 43 = ${Math.round(one*10)/10}</text>
        </svg>`)+
        `<div class="t7in" style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="font-size:12px;color:#9ec0a8">вес стекла:</span>
          <input type="range" min="43" max="172" step="43" value="${w}" style="flex:1;max-width:180px" oninput="visW194Act('${lk}','w:'+this.value)">
        </div>`+
        wkSml('43 части всего · подели вес на 43 — узнаешь каждую часть'));
    } else if(step===5){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 6 · Машинистки и рукопись</div>`+
        wkHero(`<svg viewBox="0 0 318 176" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="176" fill="#24304a"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#cfe0cf">10 страниц/ч и 8 страниц/ч · рукопись 90</text>
          <g class="t7pop"><rect x="18" y="40" width="130" height="54" rx="12" fill="rgba(255,255,255,.05)" stroke="#7fd1ff" stroke-width="2.2"/>
            <text x="83" y="60" text-anchor="middle" font-size="12" fill="#cfe0ff">первая · 10 стр/ч</text>
            <text x="83" y="82" text-anchor="middle" font-size="19" fill="#7fd1ff" font-weight="bold">10 = 5 частей</text></g>
          <g class="t7pop" style="animation-delay:.15s"><rect x="170" y="40" width="130" height="54" rx="12" fill="rgba(255,255,255,.05)" stroke="#e8a0d8" stroke-width="2.2"/>
            <text x="235" y="60" text-anchor="middle" font-size="12" fill="#f0c9e6">вторая · 8 стр/ч</text>
            <text x="235" y="82" text-anchor="middle" font-size="19" fill="#e8a0d8" font-weight="bold">8 = 4 части</text></g>
          <text x="159" y="122" text-anchor="middle" font-size="14" fill="#cfe0cf">90 страниц делим 5:4 → 9 частей · одна 90:9=10</text>
          ${pick!=null? `<g class="t7pop"><text x="159" y="152" text-anchor="middle" font-size="18" fill="${pick===0?'#8fd1a8':'#ff8a7a'}" font-weight="bold">${pick===0?'верно! 5·10=50 и 4·10=40 ✓':'не так. Скорости 5:4 — так и страницы'}</text></g>`:''}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW194T2('${lk}',0)">50 и 40</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',1)">45 и 45</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',2)">60 и 30</button>
        </div>`+
        wkSml('отношение скоростей = отношению страниц'));
    } else if(step===6){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 7 · Велосипедист и пешеход</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a4a3a"/>
          <text x="159" y="22" text-anchor="middle" font-size="13" fill="#9fe8c0">навстречу · расстояние 30 км</text>
          <rect x="10" y="40" width="150" height="44" rx="10" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2"/>
          <text x="85" y="58" text-anchor="middle" font-size="11" fill="#ffe9c9">велосипедист · в 5 раз быстрее</text>
          <text x="85" y="76" text-anchor="middle" font-size="16" fill="#ffd76a">проедет 5 частей</text>
          <g class="t7pop" style="animation-delay:.15s"><rect x="172" y="40" width="140" height="44" rx="10" fill="rgba(127,209,255,.1)" stroke="#7fd1ff" stroke-width="2"/>
          <text x="242" y="58" text-anchor="middle" font-size="11" fill="#cfe0ff">пешеход · 1 часть</text>
          <text x="242" y="76" text-anchor="middle" font-size="16" fill="#7fd1ff">пройдёт 1 часть</text></g>
          <text x="159" y="110" text-anchor="middle" font-size="14" fill="#cfe0cf">5+1=6 частей · 30 : 6 = 5 км одна часть</text>
          ${pick!=null? `<g class="t7pop"><text x="159" y="140" text-anchor="middle" font-size="19" fill="${pick===0?'#8fd1a8':'#ff8a7a'}" font-weight="bold">${pick===0?'верно! 5·5 = 25 км велосипедист ✓':'не так · 5 частей из 6 — это 25 км'}</text></g>`:''}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW194T2('${lk}',0)">велосипедист 25 км</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',1)">велосипедист 20 км</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',2)">поровну 15 км</button>
        </div>`+
        wkSml('отношение скоростей = отношению путей до встречи'));
    } else if(step===7){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 8 · Отношение — это дробь</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#3a2a4a"/>
          <text x="159" y="26" text-anchor="middle" font-size="14" fill="#e8d8ff">3 к 5 — это 3:5 … и дробь 3/5!</text>
          <g class="t7pop"><rect x="36" y="52" width="104" height="70" rx="14" fill="rgba(255,215,106,.1)" stroke="#ffd76a" stroke-width="2.4"/>
            <text x="88" y="96" text-anchor="middle" font-size="32" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">3 : 5</text>
            <text x="88" y="112" text-anchor="middle" font-size="11" fill="#ffe9c9">отношение</text></g>
          <text x="176" y="96" text-anchor="middle" font-size="30" fill="#fff" font-weight="bold">=</text>
          <g class="t7pop" style="animation-delay:.25s"><rect x="196" y="52" width="90" height="70" rx="14" fill="rgba(232,160,216,.12)" stroke="#e8a0d8" stroke-width="2.4"/>
            <text x="241" y="82" text-anchor="middle" font-size="24" fill="#e8a0d8" font-weight="bold" font-family="Georgia,serif">3</text>
            <line x1="212" y1="90" x2="270" y2="90" stroke="#e8a0d8" stroke-width="2.4"/>
            <text x="241" y="112" text-anchor="middle" font-size="24" fill="#e8a0d8" font-weight="bold" font-family="Georgia,serif">5</text></g>
          ${pick!=null? `<text x="159" y="160" text-anchor="middle" font-size="15" fill="${pick?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick?'верно! двоеточие и дробь — одно и то же ✓':'двоеточие = дробная черта'}</text>`:''}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW194T2('${lk}',0)">2 : 7</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',1)">2 / 7</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',2)">7 : 2</button>
        </div>`+
        wkSml('выбери запись, равную дроби 2/7 · двоеточие или дробь — как удобно'));
    } else if(step===8){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 9 · Какую часть составляют девочки?</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a3a4a"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#cfe0cf">класс: 15 девочек и 10 мальчиков</text>
          ${[0,1,2,3,4].map(i=>`<circle class="t7jump" style="animation-delay:${(i*0.08).toFixed(2)}s" cx="${30+i*30}" cy="70" r="11" fill="#e8a0d8"/><rect x="26" y="81" width="8" height="10" rx="3" fill="#e8a0d8"/>`).join('')}
          ${[0,1,2,3,4].map(i=>`<circle class="t7jump" style="animation-delay:${(.4+i*0.08).toFixed(2)}s" cx="${30+i*30}" cy="104" r="11" fill="#7fd1ff"/><rect x="26" y="115" width="8" height="10" rx="3" fill="#7fd1ff"/>`).join('')}
          <text x="159" y="152" text-anchor="middle" font-size="14" fill="#cfe0cf">девочек 15 из 25 → 15/25 = 3/5</text>
          ${pick!=null? `<text x="159" y="168" text-anchor="middle" font-size="14" fill="${pick===1?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick===1?'верно! 15 из 25 = 3/5 ✓':'не так · всего 25 учеников'}</text>`:''}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW194T2('${lk}',0)">15/10</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',1)">15/25</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',2)">10/25</button>
        </div>`+
        wkSml('какую часть класса составляют девочки? сократи дробь'));
    } else if(step===9){
      const pos=st.pos==null?6:st.pos;
      const ok=st.ok;
      const ppx=(x)=>28+x*18.2; // 0..14 см -> px
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 10 · Отрезок 14 см в отношении 3:4</div>`+
        wkHero(`<svg viewBox="0 0 318 160" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="160" fill="#3a332a"/>
          <text x="159" y="30" text-anchor="middle" font-size="14" fill="#e8dcc8">двигай точку: левая часть 3, правая 4</text>
          <line x1="28" y1="96" x2="283" y2="96" stroke="#c9a06a" stroke-width="5" stroke-linecap="round"/>
          <g class="t7pop"><rect x="24" y="80" width="44" height="30" rx="8" fill="rgba(255,255,255,.05)" stroke="#4a6a54" stroke-width="2"/><text x="46" y="100" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold">0</text></g>
          <g class="t7pop" style="animation-delay:.15s"><rect x="256" y="80" width="44" height="30" rx="8" fill="rgba(255,255,255,.05)" stroke="#4a6a54" stroke-width="2"/><text x="278" y="100" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold">14</text></g>
          <g class="t7bump"><circle cx="${ppx(pos)}" cy="96" r="9" fill="#ffd76a" stroke="#0d1a13" stroke-width="2.4"/>
          <line x1="${ppx(pos)}" y1="96" x2="283" y2="96" stroke="#8fd1a8" stroke-width="4" stroke-dasharray="6 4"/></g>
          <text x="${(ppx(pos)+20)}" y="60" text-anchor="middle" font-size="16" fill="#ffd76a" font-weight="bold">${pos} см | ${14-pos} см</text>
          ${ok!=null? `<text x="159" y="140" text-anchor="middle" font-size="16" fill="${ok?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${ok?'верно! 3·2=6 и 4·2=8 — части 3:4 ✓':'ищи точку на 6 см · 14:7=2'}</text>`:''}
        </svg>`)+
        `<div class="t7in" style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="font-size:12px;color:#9ec0a8">точка:</span>
          <input type="range" min="1" max="13" value="${pos}" style="flex:1;max-width:200px" oninput="visW194Act('${lk}','pos:'+this.value)">
          <button class="wk-btn" onclick="visW194Act('${lk}','chk9')">проверить</button>
        </div>`+
        wkSml('3+4=7 частей · 14:7=2 см одна часть · точка на 6 см'));
    } else if(step===10){
      const w=st.w2==null?7.5:st.w2;
      const one=w/5;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 11 · Сплав золота и серебра 2:3</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a2a35"/>
          <g class="t7pop"><rect x="40" y="40" width="100" height="90" rx="12" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="2.2"/>
            <text x="90" y="62" text-anchor="middle" font-size="12" fill="#ffe9c9">золото · 2 части</text>
            <text x="90" y="96" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold" font-family="Georgia,serif">${Math.round(one*2*10)/10} кг</text>
            <text x="90" y="116" text-anchor="middle" font-size="11" fill="#ffe9c9">2 · ${Math.round(one*10)/10}</text></g>
          <text x="159" y="90" text-anchor="middle" font-size="26" fill="#cfe0cf" font-weight="bold">+</text>
          <g class="t7pop" style="animation-delay:.2s"><rect x="178" y="40" width="100" height="90" rx="12" fill="rgba(232,232,255,.08)" stroke="#cfe0ff" stroke-width="2.2"/>
            <text x="228" y="62" text-anchor="middle" font-size="12" fill="#e8ecff">серебро · 3 части</text>
            <text x="228" y="96" text-anchor="middle" font-size="26" fill="#cfe0ff" font-weight="bold" font-family="Georgia,serif">${Math.round(one*3*10)/10} кг</text>
            <text x="228" y="116" text-anchor="middle" font-size="11" fill="#e8ecff">3 · ${Math.round(one*10)/10}</text></g>
          <text x="159" y="160" text-anchor="middle" font-size="15" fill="#ffd76a" font-weight="bold">слиток ${w} кг · 5 частей по ${Math.round(one*10)/10} кг</text>
        </svg>`)+
        `<div class="t7in" style="display:flex;align-items:center;gap:8px;justify-content:center;margin:6px 0">
          <span style="font-size:12px;color:#9ec0a8">масса слитка:</span>
          <input type="range" min="5" max="10" step="0.5" value="${w}" style="flex:1;max-width:180px" oninput="visW194Act('${lk}','w2:'+this.value)">
        </div>`+
        wkSml('2+3=5 частей · вес : 5 = одна часть'));
    } else if(step===11){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 12 · Семена и песок 2:5</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#2a4a2a"/>
          <text x="159" y="24" text-anchor="middle" font-size="13" fill="#9fe8c0">семена : песок = 2 : 5 · песка 200 г</text>
          <g class="t7pop"><rect x="20" y="50" width="100" height="90" rx="12" fill="rgba(143,209,168,.1)" stroke="#8fd1a8" stroke-width="2.4"/>
            <text x="70" y="72" text-anchor="middle" font-size="12" fill="#cfe0cf">семена · 2 части</text>
            <text x="70" y="110" text-anchor="middle" font-size="26" fill="#8fd1a8" font-weight="bold">${pick===0?'80 г':'? г'}</text>
            <text x="70" y="128" text-anchor="middle" font-size="11" fill="#cfe0cf">2 · 40</text></g>
          <text x="152" y="100" text-anchor="middle" font-size="26" fill="#cfe0cf" font-weight="bold">:</text>
          <g class="t7pop" style="animation-delay:.2s"><rect x="176" y="50" width="120" height="90" rx="12" fill="rgba(255,215,106,.12)" stroke="#ffd76a" stroke-width="2.4"/>
            <text x="236" y="72" text-anchor="middle" font-size="12" fill="#ffe9c9">песок · 5 частей</text>
            <text x="236" y="110" text-anchor="middle" font-size="26" fill="#ffd76a" font-weight="bold">200 г</text>
            <text x="236" y="128" text-anchor="middle" font-size="11" fill="#ffe9c9">200 : 5 = 40 г одна часть</text></g>
          ${pick!=null? `<text x="159" y="160" text-anchor="middle" font-size="16" fill="${pick===0?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick===0?'верно! 2·40 = 80 г семян ✓':'песок 5 частей = 200 → 1 часть 40'}</text>`:''}
        </svg>`)+
        `<div class="wk-row" style="gap:8px">
          <button class="wk-btn" onclick="visW194T2('${lk}',0)">80 г</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',1)">100 г</button>
          <button class="wk-btn" onclick="visW194T2('${lk}',2)">40 г</button>
        </div>`+
        wkSml('5 частей = 200 г · одна часть 40 г · семян 2 части'));
    } else if(step===12){
      const pick=st.pick;
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 13 · Найди ловушку!</div>`+
        wkHero(`<svg viewBox="0 0 318 170" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="170" fill="#3a2a2a"/>
          <text x="159" y="20" text-anchor="middle" font-size="13" fill="#ffcfc2">в одной задаче ошибка — найди её</text>
          <g class="t7pop" style="cursor:pointer" onclick="visW194T2('${lk}',0)"><rect x="16" y="34" width="140" height="58" rx="10" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
            <text x="86" y="52" text-anchor="middle" font-size="12" fill="#cfe0cf">1 · 40 в отношении 1:3</text>
            <text x="86" y="74" text-anchor="middle" font-size="14" fill="#fff">1+3=4 → 40:4=10 ✓</text></g>
          <g class="t7pop" style="animation-delay:.15s;cursor:pointer" onclick="visW194T2('${lk}',1)"><rect x="164" y="34" width="140" height="58" rx="10" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
            <text x="234" y="52" text-anchor="middle" font-size="12" fill="#cfe0cf">2 · 60 в отношении 2:3</text>
            <text x="234" y="74" text-anchor="middle" font-size="14" fill="#ff9a8a">60:2=30 и 60:3=20 ✗</text></g>
          <g class="t7pop" style="animation-delay:.3s;cursor:pointer" onclick="visW194T2('${lk}',2)"><rect x="16" y="100" width="140" height="58" rx="10" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
            <text x="86" y="118" text-anchor="middle" font-size="12" fill="#cfe0cf">3 · 100 в отношении 2:3</text>
            <text x="86" y="140" text-anchor="middle" font-size="14" fill="#fff">5 частей → 20 · 40 и 60 ✓</text></g>
          <g class="t7pop" style="animation-delay:.45s;cursor:pointer" onclick="visW194T2('${lk}',3)"><rect x="164" y="100" width="140" height="58" rx="10" fill="rgba(255,255,255,.04)" stroke="#4a6a54" stroke-width="2"/>
            <text x="234" y="118" text-anchor="middle" font-size="12" fill="#cfe0cf">4 · 90 в отношении 5:4</text>
            <text x="234" y="140" text-anchor="middle" font-size="14" fill="#fff">9 частей → 50 и 40 ✓</text></g>
          ${pick!=null? `<text x="159" y="168" text-anchor="middle" font-size="15" fill="${pick===1?'#8fd1a8':'#ff9a8a'}" font-weight="bold">${pick===1?'верно! делили на 2 и 3 вместо суммы 5 ✗✓':'не та. Ищи, где не сложили части'}</text>`:''}
        </svg>`)+
        wkSml('кликни задачу с ошибкой · сначала всегда складывай части!'));
    } else {
      // финал: квест-город (3 задачи) + quiz
      const q2=st.q2||0;
      const cityTasks=[
        {q:'Мост: 60 балок в отношении 2:3. Большая часть?',ans:'36',opts:[['24',0],['36',1],['12',2]],check:1,fix:'мост построен'},
        {q:'Стекло 86 пудов · 43 части. Одна часть?',ans:'2',opts:[['2',0],['4',1],['3',2]],check:0,fix:'стекло готово'},
        {q:'Сад: 200 г песка · 5 частей. Семян 2 части?',ans:'80',opts:[['80',0],['40',1],['100',2]],check:0,fix:'сад засеян'}
      ];
      const T=cityTasks[q2%3];
      h=wkFrame(`<div class="wk-big" style="font-size:18px">Блок 14 · Спаси город!</div>`+
        wkHero(`<svg viewBox="0 0 318 150" style="display:block;width:100%;height:auto">
          <rect x="0" y="0" width="318" height="150" fill="${q2>0?'#2e5a8a':'#5a6a8a'}"/>
          ${[30,70,110,150,190,230,270].map((x,i)=>`<rect class="t7float" style="animation-delay:${(i*0.15).toFixed(1)}s" x="${x}" y="${60-(i%3)*10}" width="${24-i%2*8}" height="${60+(i%3)*12}" rx="4" fill="${i%2?'#7a9ac8':'#6a8ab8'}"/>`).join('')}
          <rect x="0" y="122" width="318" height="28" fill="#3a5a3a"/>
          <g class="t7pop"><rect x="110" y="84" width="104" height="40" rx="10" fill="rgba(0,0,0,.5)" stroke="#ffd76a" stroke-width="2"/>
          <text x="162" y="102" text-anchor="middle" font-size="13" fill="#ffe9c9">${T.q.split('?')[0]}?</text>
          <text x="162" y="118" text-anchor="middle" font-size="11" fill="#9fe8c0">${st.q2ok==null?'реши и город оживёт':T.fix}</text></g>
        </svg>`)+
        `<div class="wk-row" style="gap:8px">${T.opts.map(o=>`<button class="wk-btn" onclick="visW194T3('${lk}',${o[1]})">${o[0]}</button>`).join('')}</div>`+
        (st.q2ok!=null? (st.q2ok===1? wkRow(wkBtn('следующая стройка',`visW194Act('${lk}','nq2')`)): wkRow(sign('не так — посчитай части',T.red,0.1))) : '')+
        wkSml('реши 3 задачи — почини город, а потом тест на звёзды'));
    }
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.VISKW[194]=visW194;
  function visW194T(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.sel=i; chRender(0);
  }
  window.visW194T=visW194T;
  function visW194T2(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    st.pick=i; chRender(0);
  }
  window.visW194T2=visW194T2;
  function visW194T3(lk,i){
    const st=CHS[lk]||(CHS[lk]={});
    const q2=st.q2||0;
    const checks=[1,0,0];
    st.q2ok=(i===checks[q2%3])?1:0; chRender(0);
  }
  window.visW194T3=visW194T3;
  function visW194Act(lk,act){
    const st=CHS[lk]||(CHS[lk]={});
    if(act==='go') st.sh=(st.sh||0)+1;
    if(act==='p0') st.pick=0;
    if(act==='p1') st.pick=1;
    if(act==='sec:'){}
    if(act.indexOf('sec:')===0){ st.red=parseInt(act.slice(4),10)+1; if(st.red>5) st.red=5; if(st.red<1) st.red=1; }
    if(act==='more'){ st.red=(st.red||1)+1; if(st.red>5) st.red=5; }
    if(act==='less'){ st.red=(st.red||1)-1; if(st.red<0) st.red=0; }
    if(act==='sg:'){}
    if(act.indexOf('sg:')===0){ st.sugar=parseInt(act.slice(3),10); }
    if(act.indexOf('w:')===0){ st.w=parseInt(act.slice(2),10); }
    if(act.indexOf('w2:')===0){ st.w2=parseFloat(act.slice(3)); }
    if(act.indexOf('pos:')===0){ st.pos=parseInt(act.slice(4),10); st.ok=null; }
    if(act==='chk9'){ st.ok=(st.pos===6)?1:0; }
    if(act==='nq2'){ st.q2=(st.q2||0)+1; st.q2ok=null; }
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW194Act=visW194Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===194){ window.ARH_LESSONS[i]=L194; break; } } })();
})();
