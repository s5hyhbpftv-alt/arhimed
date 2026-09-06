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
    '.wk-sml{color:#c9b795;font-size:12.5px;line-height:1.5;max-width:272px;text-align:center;margin:0 auto;}'+
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

/* ================= УРОК 12 · Остатки при делении (v3) ================= */
(function(){
  const L12 = {
    id: 12, title: 'Остатки при делении', ico: '🍬',
    src: 'Математика · 5 класс · Деление с остатком', subj: 'math',
    explain: [
      'Архимед раскладывает 17 конфет в мешочки по 5 конфет. Получается 3 полных мешочка — это 15 конфет — и остаются 2 конфеты, которые ни в один мешочек не поместились. Эти «лишние» конфеты и есть остаток. По учебнику: 17 = 5 · 3 + 2.',
      'Что такое остаток? Делим 17 на 5: 17 = 5 · 3 + 2. Говорят: 17 : 5 = 3 и остаток 2. Проверка: 5 · 3 + 2 = 17 — всё сходится! Частное 3 показывает, сколько раз по 5 поместилось, а остаток 2 — что не поместилось.',
      'Запомни формулу из учебника: делимое = делитель · частное + остаток. Для 17 : 5: 17 = 5 · 3 + 2. Обязательное правило: остаток всегда меньше делителя. Так проверяют любую задачу с остатком!',
      'Главное правило: остаток всегда МЕНЬШЕ делителя. При делении на 5 остаток бывает только 0, 1, 2, 3 или 4. Остаток 5 невозможен: 5 конфет снова собрались бы в целый мешочек!',
      'Остатки идут по кругу: 6 : 5 = 1 и остаток 1, 7 : 5 — остаток 2, 8 — остаток 3, 9 — остаток 4, 10 — остаток 0, а 11 — снова остаток 1. Каждые 5 чисел всё повторяется!',
      'Числа с одинаковым остатком образуют «семью». Остаток 2 при делении на 5 дают числа 2, 7, 12, 17, 22… Следующее число семьи получается прибавлением 5: шаг семьи равен делителю!',
      'Считаем членов семьи: сколько чисел от 1 до 40 дают остаток 2 при делении на 5? Это числа 2, 7, 12, …, 37. Формула: (37 − 2) : 5 + 1 = 7 + 1 = 8. Промежутков 7, а точек — на одну больше!',
      'Остаток 0 — это когда число делится нацело. Кратные 7: 7, 14, 21, …, 98 — у всех остаток 0 при делении на 7. Сколько их от 1 до 100? 100 : 7 = 14 и остаток 2 → ровно 14! Проверь себя в тесте ниже.',
      'Проверь себя: найди остаток при делении 47 на 5. Ближайшее кратное 5, не большее 47, — это 45. 47 − 45 = 2. Остаток 2! Теперь — вперёд, к проверке!'
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
  const C={gold:'#ffd76a',green:'#8fd1a8',blue:'#7fd1ff',red:'#ff8a7a'};
  const Q12=[
    {q:'Сколько чисел от 1 до 40 дают остаток 2 при делении на 5?',opts:['7','8','9'],ans:1},
    {q:'Сколько чисел от 1 до 100 делятся на 7?',opts:['13','14','15'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q12[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?C.green:C.red; tc=i===T.ans?C.green:C.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:52px;font-size:16px" onclick="visW12T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">🎉 верно! Оба теста решены!</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:17px">✅ верно! Членов семьи 8!</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ формула: (последнее − первое) : 5 + 1</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий вопрос →',`visW12Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW12Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW12(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.n==null) st.n=17;
      const n=st.n, b=Math.floor(n/5), rem=n%5;
      const showB=Math.min(b,4);
      const W=322, bw=52, bh=44, top=12, gapx=9, x0=8;
      let bags='';
      for(let g=0;g<showB;g++){
        const x=x0+g*(bw+gapx);
        bags+=`<g class="wv-pop" style="animation-delay:${(g*0.12).toFixed(2)}s">
          <rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="11" fill="rgba(255,255,255,.05)" stroke="${C.green}" stroke-width="2"/>
          <text x="${x+bw/2}" y="${top+19}" text-anchor="middle" font-size="10.5" fill="${C.green}">мешок ${g+1}</text>
          ${[0,1,2,3,4].map(j=>`<circle cx="${x+12+(j%3)*13}" cy="${top+(j<3?30:39)}" r="3.8" fill="#e0523d"/>`).join('')}
        </g>`;
      }
      let rest='';
      if(rem>0){
        const rx=x0+showB*(bw+gapx)+2;
        rest=`<g class="wv-pop" style="animation-delay:${(showB*0.12+0.12).toFixed(2)}s"><rect x="${rx}" y="${top}" width="54" height="${bh}" rx="11" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
          <text x="${rx+27}" y="${top+19}" text-anchor="middle" font-size="10.5" fill="${C.gold}">остаток</text>
          ${[0,1,2,3].slice(0,rem).map(j=>`<circle cx="${rx+13+j*11}" cy="${top+34}" r="3.8" fill="${C.gold}"/>`).join('')}</g>`;
      }
      h=wkFrame(wkBig('Конфеты Архимеда 🍬')+
        wkRow(wkChip('горсть: '+n, C.blue), wkChip('кладём по 5', C.green))+
        wkHero(`<svg width="${W}" height="${top+bh+8}" viewBox="0 0 ${W} ${top+bh+8}" style="display:block">${bags}${rest}</svg>`)+
        wkRow(wkPill(n+' = 5·'+b+' + '+rem, C.gold))+
        wkRow(wkBtn('🍬 новая горсть',`visW12Act('${lk}','n')`))+
        wkSml('полных мешочков '+b+' ('+b*5+' конфет), остаток '+rem));
    } else if(step===1){
      h=wkFrame(wkBig('Делим: частное и остаток')+
        wkHero(`<svg width="322" height="116" viewBox="0 0 322 116" style="display:block">
          <rect x="4" y="4" width="314" height="108" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49" stroke-width="1.4"/>
          <g class="wv-pop"><rect x="14" y="16" width="84" height="84" rx="13" fill="rgba(255,255,255,.05)" stroke="#5a6f7f" stroke-width="1.8"/>
            <text x="56" y="52" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">17</text>
            <line x1="34" y1="61" x2="78" y2="61" stroke="#9ec0a8" stroke-width="2"/>
            <text x="56" y="86" text-anchor="middle" font-size="24" fill="#fff" font-weight="bold" font-family="Georgia,serif">5</text></g>
          <text x="112" y="64" font-size="21" fill="#8fa08f">→</text>
          <g class="wv-pop2"><rect x="128" y="16" width="82" height="84" rx="13" fill="rgba(127,209,255,.08)" stroke="${C.blue}" stroke-width="2"/>
            <text x="169" y="42" text-anchor="middle" font-size="12.5" fill="${C.blue}">частное</text>
            <text x="169" y="82" text-anchor="middle" font-size="28" fill="${C.blue}" font-weight="bold" font-family="Georgia,serif">3</text></g>
          <g class="wv-pop3"><rect x="226" y="16" width="82" height="84" rx="13" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.4"/>
            <text x="267" y="42" text-anchor="middle" font-size="12.5" fill="${C.gold}">остаток</text>
            <text x="267" y="82" text-anchor="middle" font-size="28" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2</text></g>
        </svg>`)+
        wkAns('проверка: 5 · 3 + 2 = 17 ✔', C.green)+
        wkSml('частное — сколько раз по 5 поместилось, остаток — что осталось'));
    } else if(step===2){
      h=wkFrame(wkBig('Формула из учебника')+
        wkHero(`<svg width="322" height="100" viewBox="0 0 322 100" style="display:block">
          <rect x="4" y="4" width="314" height="92" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          ${[['делимое','17',C.blue,18],['делитель','5',C.green,98],['частное','3',C.gold,178]].map((b,i)=>`
            <g class="wv-pop" style="animation-delay:${(i*0.13).toFixed(2)}s"><rect x="${b[3]}" y="16" width="72" height="52" rx="11" fill="rgba(255,255,255,.05)" stroke="${b[2]}" stroke-width="2"/>
            <text x="${b[3]+36}" y="34" text-anchor="middle" font-size="10.5" fill="${b[2]}">${b[0]}</text>
            <text x="${b[3]+36}" y="59" text-anchor="middle" font-size="21" fill="${b[2]}" font-weight="bold" font-family="Georgia,serif">${b[1]}</text></g>`).join('')}
          <g class="wv-pop3"><rect x="258" y="16" width="54" height="52" rx="11" fill="rgba(255,215,106,.12)" stroke="${C.gold}" stroke-width="2"/>
            <text x="285" y="34" text-anchor="middle" font-size="9.5" fill="${C.gold}">ост.</text>
            <text x="285" y="59" text-anchor="middle" font-size="21" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">2</text></g>
          <text x="94" y="48" font-size="16" fill="#8fa08f">=</text><text x="174" y="48" font-size="16" fill="#8fa08f">·</text><text x="254" y="48" font-size="16" fill="#8fa08f">+</text>
        </svg>`)+
        wkAns('17 = 5 · 3 + 2 — остаток меньше делителя!', C.green)+
        wkSml('делимое = делитель · частное + остаток, где 0 ≤ остаток < делитель'));
    } else if(step===3){
      const cols=[C.blue,C.green,C.gold,'#e8a0d8','#ff8a7a'];
      const data=[[],[],[],[],[]];
      for(let nn=1;nn<=13;nn++) data[nn%5].push(nn);
      const W=322, x0=6, cw=60, gap=2.5, y0=12, ch=76;
      let cells='';
      for(let p=0;p<5;p++){
        const x=x0+p*(cw+gap);
        const last=p===4;
        cells+=`<g class="wv-pop" style="animation-delay:${(p*0.09).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="12" fill="${last?'rgba(232,106,90,.05)':'rgba(255,255,255,.04)'}" stroke="${last?'#c0564c':'#3d7a55'}" stroke-width="2" ${last?'stroke-dasharray="6 4"':''}/>
          ${fitTxt(x+cw/2,y0+22,cw-4,last?'нет!':'остаток '+p,last?'#ff9a8a':cols[p],11)}
          <text x="${x+cw/2}" y="${y0+48}" text-anchor="middle" font-size="24" fill="${last?'#ff9a8a':'#fff'}" font-weight="bold" font-family="Georgia,serif">${last?'✗':p}</text>
          <text x="${x+cw/2}" y="${y0+66}" text-anchor="middle" font-size="9" fill="#9ec0a8">${data[p].slice(0,4).join('·')}</text>
        </g>`;
      }
      h=wkFrame(wkBig('Карманы остатков · делим на 5')+
        wkHero(`<svg width="${W}" height="${y0+ch+8}" viewBox="0 0 ${W} ${y0+ch+8}" style="display:block">${cells}</svg>`)+
        wkRow(wkChip('остаток всегда < делителя', C.green))+
        wkSml('при делении на 5 остатки только 0, 1, 2, 3, 4 — остаток 5 невозможен'));
    } else if(step===4){
      const cols=[C.blue,C.green,C.gold,'#e8a0d8','#ff8a7a'];
      const nums=[6,7,8,9,10,11,12,13,14,15];
      const W=322, x0=6, cw=30.5, y0=12, th=42;
      let cells='';
      nums.forEach((nn,i)=>{
        const x=x0+i*(cw+0.5), c=cols[nn%5];
        cells+=`<g class="wv-pop" style="animation-delay:${(i*0.05).toFixed(2)}s">
          <rect x="${x}" y="${y0}" width="${cw-1.5}" height="${th}" rx="9" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="2"/>
          <text x="${x+(cw-1.5)/2}" y="${y0+24}" text-anchor="middle" font-size="16" fill="#fff" font-weight="bold" font-family="Georgia,serif">${nn}</text>
          <circle cx="${x+(cw-1.5)/2}" cy="${y0+33}" r="7" fill="${c}"/>
          <text x="${x+(cw-1.5)/2}" y="${y0+37}" text-anchor="middle" font-size="9.5" fill="#0d1a13" font-weight="bold">${nn%5}</text>
        </g>`;
      });
      h=wkFrame(wkBig('Остатки идут по кругу')+
        wkHero(`<svg width="${W}" height="${y0+th+6}" viewBox="0 0 ${W} ${y0+th+6}" style="display:block">${cells}</svg>`)+
        wkAns('6→1 · 10→0 · 11→1 — каждые 5 чисел повтор!', C.gold)+
        wkSml('под каждым числом — цветной кружок с его остатком при делении на 5'));
    } else if(step===5){
      const mem=[2,7,12,17];
      const W=322, d=86;
      let s='';
      mem.forEach((m,i)=>{
        const x=12+i*d;
        s+=`<g class="wv-pop" style="animation-delay:${(i*0.14).toFixed(2)}s"><circle cx="${x+38}" cy="46" r="32" fill="rgba(217,164,65,.1)" stroke="${C.gold}" stroke-width="2.6"/>
          <text x="${x+38}" y="53" text-anchor="middle" font-size="22" fill="${C.gold}" font-weight="bold" font-family="Georgia,serif">${m}</text></g>`;
        if(i<mem.length-1){
          const ax=x+71;
          s+=`<line x1="${ax}" y1="46" x2="${ax+25}" y2="46" stroke="${C.blue}" stroke-width="3"/>
          <polygon points="${ax+29},46 ${ax+21},41 ${ax+21},51" fill="${C.blue}"/>
          <text x="${ax+13}" y="36" text-anchor="middle" font-size="13" fill="${C.blue}" font-weight="bold">+5</text>`;
        }
      });
      h=wkFrame(wkBig('Семья чисел с остатком 2')+
        wkHero(`<svg width="${W}" height="94" viewBox="0 0 ${W} 94" style="display:block">${s}</svg>`)+
        wkRow(wkChip('2 = 5·0+2', C.blue),wkChip('7 = 5·1+2', C.blue),wkChip('12 = 5·2+2', C.blue))+
        wkAns('шаг семьи = делитель: +5', C.green)+
        wkSml('все числа семьи дают остаток 2 при делении на 5'));
    } else if(step===6){
      const mem=[2,7,12,17,22,27,32,37];
      const W=322, x0=14, L=294, y0=32;
      let s='';
      s+=`<line x1="${x0}" y1="${y0}" x2="${x0+L}" y2="${y0}" stroke="#3d5c49" stroke-width="3"/>`;
      for(let k=1;k<=40;k++){
        const x=x0+L*k/41;
        const on=mem.indexOf(k)>=0;
        s+=`<circle cx="${x.toFixed(1)}" cy="${y0}" r="${on?8:2.4}" fill="${on?'#ffd76a':'rgba(255,255,255,.12)'}" class="${on?'wv-pop':''}"/>`;
        if(on) s+=`<text x="${x.toFixed(1)}" y="${y0+17}" text-anchor="middle" font-size="8.5" fill="#ffd76a">${k}</text>`;
        else if(k%10===0) s+=`<text x="${x.toFixed(1)}" y="${y0+16}" text-anchor="middle" font-size="8" fill="#5b6b58">${k}</text>`;
      }
      h=wkFrame(wkBig('Сколько членов до 40?')+
        wkHero(`<svg width="${W}" height="60" viewBox="0 0 ${W} 60" style="display:block">${s}</svg>`)+
        wkRow(wkPill('(37−2):5 + 1', C.blue),wkPill('= 8 чисел', C.green))+
        wkSml('промежутков 7, чисел на одно больше — 8: 2, 7, …, 37'));
    } else if(step===7){
      const W=322, x0=14, L=294, y0=28;
      let s='';
      s+=`<line x1="${x0}" y1="${y0}" x2="${x0+L}" y2="${y0}" stroke="#3d5c49" stroke-width="3"/>`;
      for(let k=0;k<=100;k+=10){
        const x=x0+L*k/100;
        s+=`<line x1="${x}" y1="${y0-5}" x2="${x}" y2="${y0+5}" stroke="#5b6b58" stroke-width="1.3"/>`;
        if(k%20===0) s+=`<text x="${x}" y="${y0+16}" text-anchor="middle" font-size="8.5" fill="#7a8a80">${k}</text>`;
      }
      for(let k=7;k<=98;k+=7){
        const x=x0+L*k/100;
        s+=`<circle cx="${x.toFixed(1)}" cy="${y0}" r="6.5" fill="${C.green}" class="wv-pop"/>`;
      }
      h=wkFrame(wkBig('Кратные 7 = остаток 0')+
        wkHero(`<svg width="${W}" height="46" viewBox="0 0 ${W} 46" style="display:block">${s}</svg>`)+
        quiz(lk,st)+
        wkSml('7, 14, …, 98 — 14 чисел · 100 : 7 = 14 (остаток 2)'));
    } else {
      h=wkFrame(wkBig('Проверь себя: 47 : 5')+
        wkHero(`<svg width="322" height="106" viewBox="0 0 322 106" style="display:block">
          <rect x="4" y="4" width="314" height="98" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="wv-pop"><rect x="14" y="16" width="140" height="44" rx="11" fill="rgba(127,209,160,.1)" stroke="${C.green}" stroke-width="2"/>
            <text x="84" y="32" text-anchor="middle" font-size="11" fill="#9ec0a8">кратное 5 ≤ 47</text>
            <text x="84" y="52" text-anchor="middle" font-size="18" fill="${C.green}" font-weight="bold" font-family="Georgia,serif">45 = 5 · 9</text></g>
          <g class="wv-pop2"><rect x="166" y="16" width="142" height="44" rx="11" fill="rgba(255,255,255,.05)" stroke="#3d5c49"/>
            <text x="237" y="32" text-anchor="middle" font-size="11" fill="#9ec0a8">47 − 45</text>
            <text x="237" y="52" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold" font-family="Georgia,serif">= 2</text></g>
          <rect x="106" y="74" width="110" height="22" rx="11" fill="rgba(217,164,65,.12)" stroke="${C.gold}"/>
          <text x="161" y="89" text-anchor="middle" font-size="13.5" fill="${C.gold}" font-weight="bold">остаток 2!</text>
        </svg>`)+
        wkSml('готов? жми «Понял! Проверю себя» — там остаток 47 на 5!'));
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
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst'){ CHS[lk]={}; }
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
/* ================= УРОК 21 · Числа из цифр без повторов (v4) ================= */
(function(){
  if(!window.__wk21css){
    window.__wk21css=1;
    const st=document.createElement('style');
    st.textContent=
      '#lvis .wk-fall{animation:wkFall .55s cubic-bezier(.2,.8,.3,1.1) both;}'+
      '@keyframes wkFall{0%{transform:translateY(-16px) scale(.9);opacity:0}100%{transform:none;opacity:1}}'+
      '#lvis .wk-bob{animation:wkBob 1.4s ease-in-out infinite;}'+
      '@keyframes wkBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}'+
      '#lvis .wk-dash{stroke-dasharray:6 5;animation:wkDash2 .9s linear infinite;}'+
      '@keyframes wkDash2{to{stroke-dashoffset:-22}}'+
      '#lvis .wk-grow{animation:wkGrow .6s ease both;transform-box:fill-box;transform-origin:center;}'+
      '@keyframes wkGrow{0%{transform:scale(.2);opacity:0}70%{transform:scale(1.06);opacity:1}100%{transform:scale(1);opacity:1}}';
    document.head.appendChild(st);
  }
  const L21 = {
    id: 21, title: 'Числа из цифр без повторов', ico: '🔑',
    src: 'Математика · Комбинаторика · Правило умножения', subj: 'math',
    explain: [
      'Секретный сейф Архимеда: на нём три барабана с цифрами 1, 2, 3, а код — из ДВУХ цифр. Важное правило: цифры в коде не должны повторяться. Сколько разных кодов можно составить? Если перебирать все варианты вслепую — легко запутаться. Мы посчитаем красиво и без ошибок — по шагам.',
      'Шаг 1 — первая цифра кода. Она может быть любой из трёх: 1, 2 или 3. Представь: перед тобой три ключа, и ты берёшь первый из них — 3 способа выбрать. Запомни число 3 — это первый множитель нашего будущего умножения.',
      'Шаг 2 — вторая цифра. Повторять нельзя: одну цифру мы уже поставили на первое место. Если первой стоит 1, для второго места остаются только 2 и 3. Какую бы цифру мы ни взяли первой, для второй всегда останется ровно 2 варианта.',
      'Правило умножения: если первый выбор можно сделать m способами, а второй — n способами, то общее число вариантов равно m · n. У нас 3 · 2 = 6 кодов. Давай проверим: 12, 13, 21, 23, 31, 32 — ровно шесть. И помни: 12 и 21 — РАЗНЫЕ коды, порядок цифр важен!',
      'Усложняем: барабанов уже пять — цифры 1, 2, 3, 4, 5, а код всё ещё из двух цифр. Первую цифру выбираем 5 способами, вторую — 4 способами (одну цифру первая уже заняла). Перемножаем: 5 · 4 = 20. Каждый следующий выбор уменьшает число возможностей на 1 — как ступеньки лестницы.',
      'Теперь код из ТРЁХ цифр на тех же пяти барабанах. Первая цифра — 5 способов, вторая — 4, третья — уже 3. Умножаем по порядку: сначала 5 · 4 = 20, потом 20 · 3 = 60. Получается 60 трёхзначных чисел. Видишь закономерность: множители спускаются вниз: 5, 4, 3.',
      'А если взять ВСЕ пять цифр по одному разу? Тогда каждая цифра занимает своё место — это перестановки. Считаем: 5 · 4 · 3 · 2 · 1 = 120. Такое произведение математики записывают коротко: 5! и называют «факториал». Каждое новое место отбирает у нас одну цифру.',
      'Осторожно, ловушка! Составляем двузначные числа из цифр 0, 1, 2 без повторов. Первой цифрой НОЛЬ быть не может: число 01 — это просто 1, ноль в начале «невидим». Поэтому первую цифру выбираем только 2 способами (1 или 2), вторую — из 2 оставшихся. Итог: 2 · 2 = 4 числа: 10, 12, 20, 21.',
      'Проверь себя: сколько двузначных чисел можно составить из цифр 1, 2, 3 без повторов? Первая цифра — 3 способа, вторая — 2. 3 · 2 = 6. Теперь жми «Понял! Проверю себя» — этот же вопрос ждёт тебя там!'
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
  const COL=['#7fd1ff','#8fd1a8','#ffd76a','#e8a0d8','#ff9a7a'];
  const G={green:'#8fd1a8',gold:'#ffd76a',blue:'#7fd1ff',red:'#ff8a7a',cream:'#e8dcc8'};
  const digit=(d,i,c,big)=>`<g class="wk-grow" style="animation-delay:${(i*0.12).toFixed(2)}s"><rect x="${d[1]-22}" y="10" width="44" height="54" rx="13" fill="rgba(255,255,255,.06)" stroke="${c||COL[i%5]}" stroke-width="2.6"/><text x="${d[1]}" y="46" text-anchor="middle" font-size="${big||26}" fill="${c||COL[i%5]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text></g>`;
  const Q21=[
    {q:'Сколько двузначных чисел из цифр 1,2,3 без повторов?',opts:['3','6','9'],ans:1},
    {q:'Сколько трёхзначных чисел из цифр 1,2,3,4,5 без повторов?',opts:['20','60','120'],ans:1}
  ];
  function quiz(lk,st){
    const T=Q21[st.q||0];
    const opts=T.opts.map((o,i)=>{
      let bg='rgba(255,255,255,.05)',bd='#3d5c49',tc='#e8dcc8';
      if(st.sel!=null&&i===st.sel){ bg=i===T.ans?'rgba(143,209,168,.2)':'rgba(232,106,90,.2)'; bd=i===T.ans?G.green:G.red; tc=i===T.ans?G.green:G.red; }
      return `<button class="wk-btn" style="background:${bg};border-color:${bd};color:${tc};min-width:58px;font-size:16px" onclick="visW21T('${lk}',${i})">${o}</button>`;
    }).join('');
    let msg='';
    if(st.sel!=null){
      msg= st.sel===T.ans
        ? (st.q===1?'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">🎉 верно! 5·4·3 = 60</div>':'<div class="wk-ans" style="color:#8fd1a8;font-size:16px">✅ верно! 3 · 2 = 6 кодов</div>')
        : '<div class="wk-ans" style="color:#ff8a7a;font-size:15px">❌ перемножь способы: первая × вторая (и третья)</div>';
    }
    const next= st.sel!=null&&st.sel===T.ans&&st.q===0? wkBtn('следующий →',`visW21Act('${lk}','nq')`):'';
    const rst=wkBtn('↺',`visW21Act('${lk}','rst')`);
    return `${wkNote(T.q,'#cfe0cf')}<div class="wk-row">${opts}</div>${msg}<div class="wk-row">${next?next+rst:rst}</div>`;
  }
  function visW21(el){
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    let h='';
    if(step===0){
      if(st.safe==null) st.safe=0;
      const c1=(st.safe)%3, c2=(st.safe+1)%3;
      const bar=(cx,val,on)=>`<g class="wk-bob"><circle cx="${cx}" cy="52" r="30" fill="rgba(0,0,0,.25)" stroke="#3d5c49" stroke-width="2"/><text x="${cx}" y="${on?34:52}" text-anchor="middle" font-size="13" fill="#5b6b58">${(val+2)%3+1}</text><text x="${cx}" y="${on?78:70}" text-anchor="middle" font-size="26" fill="${on?G.gold:'#9aa8a0'}" font-weight="bold" font-family="Georgia,serif">${val+1}</text><text x="${cx}" y="${on?90:88}" text-anchor="middle" font-size="13" fill="#5b6b58">${(val+1)%3+1}</text></g>`;
      h=wkFrame(wkBig('Сейф Архимеда: код из двух цифр 🔐')+
        wkHero(`<svg width="322" height="118" viewBox="0 0 322 118" style="display:block">
          <rect x="4" y="4" width="314" height="110" rx="18" fill="rgba(0,0,0,.22)" stroke="#c9a06a" stroke-width="2"/>
          <rect x="14" y="26" width="100" height="70" rx="12" fill="#2b2013" stroke="#8a6a3a" stroke-width="2"/>
          ${bar(64,c1,true)}<text x="64" y="16" text-anchor="middle" font-size="9" fill="#c9a06a">1-я цифра</text>
          <g class="wv-pop2"><circle cx="148" cy="61" r="17" fill="rgba(217,164,65,.15)" stroke="${G.gold}" stroke-width="2.4"/><text x="148" y="67" text-anchor="middle" font-size="17" fill="${G.gold}" font-weight="bold">+</text></g>
          <rect x="176" y="26" width="100" height="70" rx="12" fill="#2b2013" stroke="#8a6a3a" stroke-width="2"/>
          ${bar(226,c2,true)}<text x="226" y="16" text-anchor="middle" font-size="9" fill="#c9a06a">2-я цифра</text>
          <rect x="288" y="40" width="24" height="42" rx="6" fill="rgba(232,106,90,.12)" stroke="${G.red}" stroke-width="1.6"/>
          <rect x="292" y="52" width="16" height="8" rx="3" fill="${G.red}"/>
          <text x="161" y="112" text-anchor="middle" font-size="11" fill="#9ec0a8">цифры 1·2·3 · не повторяются · сколько кодов?</text>
        </svg>`)+
        wkRow(wkBtn('🔀 покрутить барабан',`visW21Act('${lk}','spin')`),wkChip('1, 2, 3',G.blue))+
        wkSml('перебирать вслепую долго — посчитаем красиво, по шагам!'));
    } else if(step===1){
      h=wkFrame(wkBig('Шаг 1: берём первую цифру')+
        wkHero(`<svg width="322" height="120" viewBox="0 0 322 120" style="display:block">
          <rect x="4" y="4" width="314" height="112" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12.5" fill="#9ec0a8">три волшебных ключа — берём любой</text>
          ${[1,2,3].map((d,i)=>{const x=70+i*92;return `<g class="wk-bob" style="animation-delay:${(i*0.18).toFixed(2)}s"><circle cx="${x}" cy="76" r="27" fill="rgba(127,209,255,.08)" stroke="${COL[i]}" stroke-width="3"/><circle cx="${x}" cy="104" r="7" fill="${COL[i]}"/><text x="${x}" y="84" text-anchor="middle" font-size="26" fill="${COL[i]}" font-weight="bold" font-family="Georgia,serif">${d}</text></g>`;}).join('')}
          <text x="161" y="116" text-anchor="middle" font-size="11" fill="#8fa08f">выбор первой цифры</text>
        </svg>`)+
        wkRow(wkPill('3 способа', G.gold))+
        wkAns('первая цифра — любая из трёх!', G.blue)+
        wkSml('это первый множитель будущего умножения. Запоминаем тройку!'));
    } else if(step===2){
      h=wkFrame(wkBig('Шаг 2: дерево выбора')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <circle cx="161" cy="30" r="15" fill="rgba(127,209,255,.15)" stroke="${G.blue}" stroke-width="2.4"/>
          <text x="161" y="36" text-anchor="middle" font-size="15" fill="${G.blue}" font-weight="bold" font-family="Georgia,serif">?</text>
          ${[0,1,2].map(i=>{const x=60+i*102;return `<g><line class="wk-dash" x1="161" y1="45" x2="${x}" y2="72" stroke="#3d7a55" stroke-width="2"/></g>`;}).join('')}
          ${[0,1,2].map(i=>{const x=60+i*102;return `<g class="wk-grow" style="animation-delay:${(0.3+i*0.2).toFixed(2)}s"><circle cx="${x}" cy="88" r="20" fill="rgba(143,209,168,.12)" stroke="${COL[i]}" stroke-width="2.6"/><text x="${x}" y="94" text-anchor="middle" font-size="18" fill="${COL[i]}" font-weight="bold" font-family="Georgia,serif">${i+1}</text></g>`;}).join('')}
          ${[0,1,2].map(i=>{const x=60+i*102;const b1=x-38,b2=x+38;return `<g><line class="wk-dash" x1="${x}" y1="108" x2="${b1}" y2="128" stroke="#5aa883" stroke-width="1.8"/><line class="wk-dash" x1="${x}" y1="108" x2="${b2}" y2="128" stroke="#5aa883" stroke-width="1.8"/></g>`;}).join('')}
          <text x="161" y="24" text-anchor="middle" font-size="11" fill="#9ec0a8">после первой — 2 ветки на каждую</text>
        </svg>`)+
        wkRow(wkPill('3 ветки', G.blue),wkChip('у каждой — по 2 листика', G.green))+
        wkAns('вторая цифра — 2 способа из оставшихся', G.green)+
        wkSml('повторять нельзя: одну цифру уже заняло первое место'));
    } else if(step===3){
      h=wkFrame(wkBig('Правило умножения: 3 · 2 = 6')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">коды выстраиваются в очередь</text>
          ${['12','13','21','23','31','32'].map((s,i)=>{
            const x=16+(i%3)*98, y=40+Math.floor(i/3)*48;
            return `<g class="wk-fall" style="animation-delay:${(i*0.14).toFixed(2)}s"><rect x="${x}" y="${y}" width="86" height="38" rx="11" fill="${i===0||i===5?'rgba(217,164,65,.14)':'rgba(255,255,255,.05)'}" stroke="${i===0||i===5?G.gold:'#4c8a5a'}" stroke-width="2.2"/>
            <text x="${x+43}" y="${y+26}" text-anchor="middle" font-size="22" fill="#fff" font-weight="bold" font-family="Georgia,serif">${s[0]}</text><text x="${x+58}" y="${y+26}" text-anchor="middle" font-size="22" fill="${G.gold}" font-weight="bold" font-family="Georgia,serif">${s[1]}</text></g>`;
          }).join('')}
          <text x="161" y="138" text-anchor="middle" font-size="11.5" fill="#8fa08f">12 и 21 — разные коды: порядок важен!</text>
        </svg>`)+
        wkRow(wkPill('3 · 2 = 6 кодов', G.gold))+
        wkAns('ровно шесть: 12, 13, 21, 23, 31, 32', G.green)+
        wkSml('первый выбор m способов, второй n → всего m · n'));
    } else if(step===4){
      h=wkFrame(wkBig('Пять барабанов: 5 · 4 = 20')+
        wkHero(`<svg width="322" height="140" viewBox="0 0 322 140" style="display:block">
          <rect x="4" y="4" width="314" height="132" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="22" text-anchor="middle" font-size="12" fill="#9ec0a8">первая цифра (5) → вторая (4) — сетка кодов</text>
          ${[0,1,2,3,4].map(i=>{const x=26+i*56;return `<g class="wk-fall" style="animation-delay:${(i*0.1).toFixed(2)}s"><circle cx="${x}" cy="46" r="16" fill="rgba(127,209,255,.12)" stroke="${COL[i]}" stroke-width="2.4"/><text x="${x}" y="52" text-anchor="middle" font-size="17" fill="${COL[i]}" font-weight="bold" font-family="Georgia,serif">${i+1}</text></g>`;}).join('')}
          ${[0,1,2,3,4].map(i=>[0,1,2,3].map(j=>{const x=26+i*56+((j-1.5)*6), y=78+j*13;return `<circle cx="${x}" cy="${y}" r="3" fill="rgba(255,255,255,.35)" class="wk-fall" style="animation-delay:${(0.2+i*0.06+j*0.05).toFixed(2)}s"/>`;}).join('')).join('')}
          <text x="161" y="126" text-anchor="middle" font-size="12.5" fill="#9ec0a8">под каждой первой цифрой — 4 возможные вторые</text>
        </svg>`)+
        wkRow(wkPill('5 · 4 = 20 чисел', G.green))+
        wkSml('множители спускаются, как ступеньки лестницы: 5, 4, 3, …'));
    } else if(step===5){
      h=wkFrame(wkBig('Код из трёх цифр: 5 · 4 · 3')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="24" text-anchor="middle" font-size="12" fill="#9ec0a8">три ступеньки: 1-я, 2-я и 3-я цифра</text>
          ${[[5,40,'#7fd1ff'],[4,161,'#8fd1a8'],[3,282,'#e8a0d8']].map((d,i)=>`
            <g class="wk-fall" style="animation-delay:${(i*0.2).toFixed(2)}s">
              <path d="M${d[1]-40},${120-i*34} h80 v-${26-i*2} h-80 z" fill="rgba(255,255,255,.05)" stroke="${d[2]}" stroke-width="2.4"/>
              <text x="${d[1]}" y="${108-i*34}" text-anchor="middle" font-size="26" fill="${d[2]}" font-weight="bold" font-family="Georgia,serif">${d[0]}</text>
              <text x="${d[1]}" y="${120-i*34+16}" text-anchor="middle" font-size="10" fill="#9ec0a8">${i===0?'первая':(i===1?'вторая':'третья')}</text>
            </g>`).join('')}
          <g class="wk-fall" style="animation-delay:0.7s"><circle cx="161" cy="24" r="0" fill="none"/><text x="161" y="96" text-anchor="middle" font-size="13" fill="#8fa08f">×</text></g>
        </svg>`)+
        wkRow(wkPill('5·4 = 20', G.blue),wkPill('20 · 3 = 60', G.gold))+
        wkAns('60 трёхзначных чисел!', G.green)+
        wkSml('множители спускаются вниз: 5, 4, 3 — как ступеньки'));
    } else if(step===6){
      h=wkFrame(wkBig('Все пять цифр: перестановки 5!')+
        wkHero(`<svg width="322" height="150" viewBox="0 0 322 150" style="display:block">
          <rect x="4" y="4" width="314" height="142" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="22" text-anchor="middle" font-size="12" fill="#9ec0a8">пять мест — пять гостей рассаживаются</text>
          ${[0,1,2,3,4].map(i=>{const x=52+i*58;return `<g class="wk-fall" style="animation-delay:${(0.15+i*0.18).toFixed(2)}s"><rect x="${x-20}" y="86" width="40" height="34" rx="9" fill="rgba(255,255,255,.05)" stroke="#4c8a5a" stroke-width="2"/><text x="${x}" y="104" text-anchor="middle" font-size="11" fill="#9ec0a8">место ${i+1}</text><text x="${x}" y="52" text-anchor="middle" font-size="24">${['🐰','🦊','🐻','🐺','🐱'][i]}</text></g>`;}).join('')}
          <text x="161" y="138" text-anchor="middle" font-size="11.5" fill="#9ec0a8">5 гостей → 5 · 4 · 3 · 2 · 1 расстановок</text>
        </svg>`)+
        wkRow(wkPill('5 · 4 · 3 · 2 · 1 = 120', '#e8a0d8'),wkChip('коротко: 5! = 120', G.gold))+
        wkSml('каждое новое место отбирает одну цифру-гостя'));
    } else if(step===7){
      h=wkFrame(wkBig('Ловушка: ноль не может быть первым')+
        wkHero(`<svg width="322" height="140" viewBox="0 0 322 140" style="display:block">
          <rect x="4" y="4" width="314" height="132" rx="18" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <g class="wk-fall"><rect x="16" y="20" width="80" height="54" rx="11" fill="rgba(232,106,90,.1)" stroke="${G.red}" stroke-width="2.4"/><text x="56" y="38" text-anchor="middle" font-size="11" fill="#ff9a8a">первая?</text><text x="56" y="64" text-anchor="middle" font-size="28" fill="${G.red}" font-weight="bold" font-family="Georgia,serif">0</text><text x="56" y="90" text-anchor="middle" font-size="9.5" fill="#ff9a8a">01 = 1 — ноль невидим!</text></g>
          <g class="wk-fall" style="animation-delay:0.25s"><rect x="120" y="20" width="70" height="54" rx="11" fill="rgba(127,209,255,.1)" stroke="${G.blue}" stroke-width="2.4"/><text x="155" y="38" text-anchor="middle" font-size="11" fill="#9fc5e8">можно</text><text x="155" y="64" text-anchor="middle" font-size="28" fill="${G.blue}" font-weight="bold" font-family="Georgia,serif">1</text></g>
          <g class="wk-fall" style="animation-delay:0.35s"><rect x="200" y="20" width="70" height="54" rx="11" fill="rgba(127,209,255,.1)" stroke="${G.blue}" stroke-width="2.4"/><text x="235" y="38" text-anchor="middle" font-size="11" fill="#9fc5e8">можно</text><text x="235" y="64" text-anchor="middle" font-size="28" fill="${G.blue}" font-weight="bold" font-family="Georgia,serif">2</text></g>
          <g class="wk-fall" style="animation-delay:0.5s"><rect x="16" y="96" width="290" height="30" rx="10" fill="rgba(217,164,65,.1)" stroke="${G.gold}" stroke-width="1.8"/><text x="161" y="116" text-anchor="middle" font-size="13.5" fill="${G.gold}" font-weight="bold">2 · 2 = 4 числа: 10 · 12 · 20 · 21</text></g>
        </svg>`)+
        wkSml('первая цифра — 2 способа (без нуля!), вторая — 2 из оставшихся'));
    } else {
      h=wkFrame(wkBig('Проверь себя 📝')+
        wkHero(`<svg width="322" height="74" viewBox="0 0 322 74" style="display:block">
          <rect x="4" y="4" width="314" height="66" rx="16" fill="rgba(0,0,0,.16)" stroke="#3d5c49"/>
          <text x="161" y="30" text-anchor="middle" font-size="14" fill="#9ec0a8">из 1, 2, 3 · код из двух цифр · без повторов</text>
          ${['12','13','21','23','31','32'].map((s,i)=>{const x=14+i*50;return `<g class="wk-grow" style="animation-delay:${(i*0.1).toFixed(2)}s"><circle cx="${x+22}" cy="52" r="18" fill="rgba(217,164,65,.1)" stroke="${i%2?G.green:G.blue}" stroke-width="2"/><text x="${x+22}" y="57" text-anchor="middle" font-size="15" fill="#fff" font-weight="bold" font-family="Georgia,serif">${s}</text></g>`;}).join('')}
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
    if(act==='spin') st.safe=((st.safe==null?0:st.safe)+1)%3;
    if(act==='nq'){ st.q=1; st.sel=null; }
    if(act==='rst') CHS[lk]={};
    chRender(0);
  }
  window.visW21Act=visW21Act;
  (function(){ for(let i=0;i<window.ARH_LESSONS.length;i++){ if(window.ARH_LESSONS[i].id===21){ window.ARH_LESSONS[i]=L21; break; } } })();
})();
