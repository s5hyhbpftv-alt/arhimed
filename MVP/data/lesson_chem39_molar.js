/* ============ ХИМИЯ · 5–6 КЛАСС · 39 · «МОЛЯРНАЯ МАССА» ============
   Виртуальная лаборатория: весы, порция в 1 моль, сборка M по формуле.
   Заменяет карточку 39 в банке и вешает VISKW[39]. Чужие файлы не трогаем.
*/
(function(){
  if(window.__c39css) return;
  window.__c39css=1;
  const st=document.createElement('style');
  st.id='c39css';
  st.textContent=
    '#lvis .c39{width:100%;max-width:352px;margin:0 auto;font-family:Georgia,serif}'+
    '#lvis .c39-big{font-size:20px;line-height:1.25;color:#ffd76a;margin:0 0 8px}'+
    '#lvis .c39-note{font-size:16px;line-height:1.45;color:#f2ead6;margin:8px 0 0}'+
    '#lvis .c39-lab{background:linear-gradient(#1a2a24,#0c1612);border:1px solid rgba(227,176,76,.28);border-radius:14px;overflow:hidden}'+
    '#lvis .c39-lab svg{display:block;width:100%;height:auto}'+
    '#lvis .c39-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}'+
    '#lvis .c39-btn{min-height:48px;min-width:48px;padding:10px 14px;border-radius:12px;border:1px solid rgba(227,176,76,.45);background:#102319;color:#f2ead6;font:16px/1.2 Georgia,serif}'+
    '#lvis .c39-ok{border-color:#7fc4a6;color:#7fc4a6}'+
    '#lvis .c39-bad{border-color:#e07a63;color:#e07a63}'+
    '#lvis .c39-pill{font-size:16px;color:#9db3a0;margin-top:6px}'+
    '@media (prefers-reduced-motion:reduce){#lvis .c39 *{animation:none!important;transition:none!important}}';
  document.head.appendChild(st);

  const L39={
    id:39,
    title:'Молярная масса',
    src:'Химия · 5–6 класс · Масса веществ',
    ico:'⚖️',
    subj:'chem',
    explain:[
      'На весах лаборатории нельзя положить один атом: он слишком лёгкий. Химики считают порциями. Одна такая порция называется моль. В одном моле всегда одно и то же число частиц — число Авогадро, примерно 6·10²³.',
      'Молярная масса M — это масса одного моля вещества в граммах. Единица — г/моль. Если на чашу положить ровно 1 моль воды, весы покажут 18 г. Это и есть M(H₂O).',
      'Как получить M из формулы: возьми атомные массы из таблицы и сложи их с учётом индексов. Водород ≈ 1, кислород ≈ 16, углерод ≈ 12. Для воды: 2·1 + 16 = 18 г/моль.',
      'Кислород в воздухе — молекула O₂, не одиночный атом. M(O₂) = 2·16 = 32 г/моль. Частая ошибка: написать 16 и забыть индекс.',
      'Углекислый газ CO₂: 12 + 2·16 = 44 г/моль. Сначала углерод, потом кислород с индексом 2. Не сладывай «на глаз по буквам».',
      'Связь массы и количества вещества: m = M · n. n — сколько молей взяли. Два моля воды: 18 · 2 = 36 г. Полмоля кислорода: 32 · 0,5 = 16 г.',
      'Обратная задача: n = m : M. На весах 36 г воды. Сколько это молей? 36 : 18 = 2 моль. Весы дают массу, формула даёт M, деление даёт порцию.',
      'На столе собери M для выбранного вещества кнопками атомных масс. Если сумма совпала с табличной — кольцо на весах загорится.',
      'Журнал лаборатории: M — масса 1 моля; считается по формуле; m = M · n; атомы не взвешивают по одному.',
      'Шпаргалка: H=1, C=12, O=16, N=14. H₂O=18, O₂=32, CO₂=44, CH₄=16.',
      'Проверь себя вслух: чему равна молярная масса воды и почему не 16.'
    ],
    check:{
      q:'Какова молярная масса воды H₂O? (в г/моль)',
      choices:['16','18','20','10'],
      ans:1,
      exp:'Два водорода по 1 и один кислород 16: 2·1 + 16 = 18 г/моль. 16 — это только кислород, без водорода.'
    },
    tasks:[
      {q:'Молярная масса CO₂? (в г/моль, C=12, O=16)',kind:'unit',ans:44,tol:0,
        hints:['Сложи углерод и два кислорода.','12 + 2·16.'],
        sol:'M(CO₂) = 12 + 32 = 44 г/моль.'},
      {q:'Масса 2 моль воды? (в г, M = 18 г/моль)',kind:'unit',ans:36,tol:0,
        hints:['m = M · n.','18 · 2.'],
        sol:'m = 18 · 2 = 36 г.'},
      {q:'Сколько молей в 32 г кислорода O₂? (M = 32 г/моль)',kind:'unit',ans:1,tol:0,
        hints:['n = m : M.','32 : 32 = 1.'],
        sol:'n = 32 : 32 = 1 моль.'}
    ]
  };

  function atom(x,y,el,r){
    r=r||14;
    const fill={H:'#f2ead6',O:'#e07a63',C:'#4a5560',N:'#7aa7d9'}[el]||'#888';
    const ink=el==='H'?'#1a120c':'#f2ead6';
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#0a1611" stroke-width="1.2"/>
      <circle cx="${x-4}" cy="${y-4}" r="${Math.max(2,r/4)}" fill="#fff" opacity=".28"/>
      <text x="${x}" y="${y+5}" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}" font-family="Georgia,serif">${el}</text></g>`;
  }
  function bench(inner,cap){
    return `<div class="c39-lab"><svg viewBox="0 0 360 210" role="img" aria-label="${cap||'лабораторный стол'}">
      <rect width="360" height="210" fill="#0c1612"/>
      <rect x="0" y="168" width="360" height="42" fill="#2a1c12"/>
      <rect x="0" y="166" width="360" height="4" fill="#e3b04c" opacity=".35"/>
      <rect x="12" y="10" width="56" height="26" rx="4" fill="#1a3326" stroke="#e3b04c" stroke-width="1"/>
      <text x="40" y="28" text-anchor="middle" font-size="10" fill="#ffd76a" font-family="Georgia,serif">NB-LAB</text>
      ${inner}
    </svg></div>`;
  }
  function scales(value, unit){
    return `<g>
      <rect x="118" y="46" width="124" height="44" rx="8" fill="#0d1a13" stroke="#7fc4a6" stroke-width="2"/>
      <text x="180" y="64" text-anchor="middle" font-size="11" fill="#9db3a0" font-family="Georgia,serif">весы</text>
      <text x="180" y="82" text-anchor="middle" font-size="16" fill="#ffd76a" font-family="Georgia,serif">${value} ${unit||'г'}</text>
      <rect x="150" y="96" width="60" height="8" rx="2" fill="#3a2a14"/>
      <rect x="172" y="104" width="16" height="28" fill="#3a2a14"/>
    </g>`;
  }

  function f0(){
    return bench(
      scales('—','')+
      atom(70,130,'H',12)+atom(110,130,'H',12)+atom(160,132,'O',16)+
      `<text x="180" y="200" text-anchor="middle" font-size="12" fill="#9db3a0" font-family="Georgia,serif">атом не взвесишь — нужна порция</text>`,
      'весы и атомы'
    );
  }
  function f1(){
    return bench(
      scales('18','г')+
      atom(86,140,'H',11)+atom(118,140,'H',11)+atom(156,142,'O',15)+
      `<text x="250" y="148" font-size="14" fill="#ffd76a" font-family="Georgia,serif">1 моль H₂O</text>`,
      'моль воды на весах'
    );
  }
  function f2(){
    return bench(
      `<text x="180" y="58" text-anchor="middle" font-size="18" fill="#ffd76a" font-family="Georgia,serif">H₂O</text>`+
      `<text x="80" y="100" text-anchor="middle" font-size="14" fill="#f2ead6" font-family="Georgia,serif">2 × 1</text>`+
      `<text x="180" y="100" text-anchor="middle" font-size="14" fill="#f2ead6" font-family="Georgia,serif">+</text>`+
      `<text x="260" y="100" text-anchor="middle" font-size="14" fill="#f2ead6" font-family="Georgia,serif">16</text>`+
      `<text x="180" y="148" text-anchor="middle" font-size="20" fill="#7fc4a6" font-family="Georgia,serif">= 18 г/моль</text>`,
      'сложение масс'
    );
  }
  function f3(){
    return bench(
      atom(120,90,'O',16)+atom(200,90,'O',16)+
      `<line x1="136" y1="90" x2="184" y2="90" stroke="#c9b896" stroke-width="5"/>`+
      `<text x="180" y="150" text-anchor="middle" font-size="16" fill="#ffd76a" font-family="Georgia,serif">O₂ → 2 × 16 = 32</text>`,
      'кислород молекулярный'
    );
  }
  function f4(){
    return bench(
      atom(110,100,'O',14)+atom(180,100,'C',16)+atom(250,100,'O',14)+
      `<line x1="124" y1="100" x2="164" y2="100" stroke="#c9b896" stroke-width="5"/>`+
      `<line x1="196" y1="100" x2="236" y2="100" stroke="#c9b896" stroke-width="5"/>`+
      `<text x="180" y="160" text-anchor="middle" font-size="16" fill="#ffd76a" font-family="Georgia,serif">12 + 32 = 44 г/моль</text>`,
      'CO2'
    );
  }
  function f5(n){
    n=n||1;
    const m=18*n;
    return bench(
      scales(String(m),'г')+
      `<text x="180" y="150" text-anchor="middle" font-size="16" fill="#f2ead6" font-family="Georgia,serif">m = 18 · ${n} = ${m} г</text>`+
      `<text x="180" y="200" text-anchor="middle" font-size="12" fill="#9db3a0" font-family="Georgia,serif">меняй число молей кнопками</text>`,
      'масса порции'
    );
  }
  function f6(){
    return bench(
      scales('36','г')+
      `<text x="180" y="152" text-anchor="middle" font-size="16" fill="#ffd76a" font-family="Georgia,serif">n = 36 : 18 = 2 моль</text>`,
      'обратная задача'
    );
  }
  function f7(st){
    const add=st.add||0;
    const ok=add===18;
    return bench(
      scales(String(add),'г/моль')+
      `<text x="180" y="152" text-anchor="middle" font-size="14" fill="${ok?'#7fc4a6':'#f2ead6'}" font-family="Georgia,serif">${ok?'M(H₂O) совпала':'собери 2×H + O'}</text>`,
      'тренажёр M'
    );
  }
  function f8(){
    return bench(
      `<text x="24" y="70" font-size="14" fill="#ffd76a" font-family="Georgia,serif">журнал</text>`+
      `<text x="24" y="100" font-size="14" fill="#f2ead6" font-family="Georgia,serif">1. M — масса 1 моля</text>`+
      `<text x="24" y="124" font-size="14" fill="#f2ead6" font-family="Georgia,serif">2. M считают по формуле</text>`+
      `<text x="24" y="148" font-size="14" fill="#f2ead6" font-family="Georgia,serif">3. m = M · n</text>`,
      'журнал'
    );
  }
  function f9(){
    return bench(
      `<text x="180" y="80" text-anchor="middle" font-size="15" fill="#ffd76a" font-family="Georgia,serif">H=1  C=12  O=16  N=14</text>`+
      `<text x="180" y="120" text-anchor="middle" font-size="15" fill="#f2ead6" font-family="Georgia,serif">H₂O=18  O₂=32  CO₂=44</text>`+
      `<text x="180" y="150" text-anchor="middle" font-size="15" fill="#f2ead6" font-family="Georgia,serif">CH₄=16</text>`,
      'шпаргалка'
    );
  }
  function f10(){
    return bench(
      `<text x="180" y="90" text-anchor="middle" font-size="16" fill="#f2ead6" font-family="Georgia,serif">M(H₂O) = ?</text>`+
      `<text x="180" y="130" text-anchor="middle" font-size="14" fill="#9db3a0" font-family="Georgia,serif">скажи вслух, потом ответь в тесте</text>`,
      'проверка'
    );
  }

  const QUIZ=[
    {q:'M(H₂O), г/моль?',o:['16','18','2'],a:1},
    {q:'M(O₂), г/моль?',o:['16','32','8'],a:1},
    {q:'Масса 2 моль воды?',o:['18 г','36 г','2 г'],a:1}
  ];

  function visW39(el){
    const step=(typeof LV!=='undefined'&&LV.step)||0;
    const lk=(typeof lidKey==='function'&&LV)?lidKey(LV.id):'l39';
    const st=stOf(lk);
    const titles=['Порция вместо атома','Моль на весах','Считаем M по формуле','Ловушка O и O₂','Углекислый газ','Формула m = M · n','Обратная задача n = m : M','Собери M воды','Журнал опыта','Шпаргалка','Проверь себя'];
    const notes=[
      'Атом легче пылинки. Чтобы говорить о граммах, берут огромную одинаковую порцию — моль.',
      '1 моль любой воды весит 18 г. Это свойство вещества, не этой конкретной колбы.',
      'Индекс умножает атомную массу. Нет индекса — берёшь массу один раз.',
      'O — атом, O₂ — молекула. На весах в лаборатории почти всегда молекула.',
      'Два кислорода в CO₂ — это не «два вещества», а один индекс.',
      'n — сколько порций. Увеличь n — масса растёт прямо пропорционально.',
      'Весы сказали массу. Формула сказала M. Деление даёт число молей.',
      'Нажми +1 (водород) два раза и +16 (кислород) один раз.',
      'Три строки, которые нужны в следующем уроке про растворы.',
      'Выучи четыре атомные массы — остальное складывается.',
      'Дальше карточка движка. Ответ уже должен быть ясен по весам.'
    ];
    const frames=[f0,f1,f2,f3,f4,()=>f5(st.n||1),f6,()=>f7(st),f8,f9,f10];
    const fn=frames[Math.min(step,frames.length-1)];
    let buttons='';
    if(step===5){
      buttons=`<div class="c39-row">
        <button type="button" class="c39-btn" onclick="visW39Act('${lk}','n-')">− моль</button>
        <button type="button" class="c39-btn" onclick="visW39Act('${lk}','n+')">+ моль</button>
      </div>`;
    } else if(step===7){
      buttons=`<div class="c39-row">
        <button type="button" class="c39-btn" onclick="visW39Add('${lk}',1)">+1 H</button>
        <button type="button" class="c39-btn" onclick="visW39Add('${lk}',16)">+16 O</button>
        <button type="button" class="c39-btn" onclick="visW39Act('${lk}','clr')">сброс</button>
      </div>`;
      if((st.add||0)===18) buttons+=`<div class="c39-pill">Собрано 18 г/моль — вода.</div>`;
    } else if(step===10){
      const Q=QUIZ[(st.tr||0)%QUIZ.length];
      const picked=st.pick;
      buttons=`<div class="c39-note">${Q.q}</div><div class="c39-row">`+
        Q.o.map((opt,i)=>{
          let extra='';
          if(picked!=null) extra=i===Q.a?' c39-ok':(i===picked?' c39-bad':'');
          return `<button type="button" class="c39-btn${extra}" onclick="visW39Pick('${lk}',${i})">${opt}</button>`;
        }).join('')+`</div>`;
      if(picked!=null) buttons+=`<div class="c39-row"><button type="button" class="c39-btn" onclick="visW39Act('${lk}','next')">ещё вопрос</button></div>`;
    }
    el.innerHTML=`<div class="c39"><div class="c39-big">${titles[Math.min(step,titles.length-1)]}</div>${fn()}<div class="c39-note">${notes[Math.min(step,notes.length-1)]}</div>${buttons}</div>`;
  }

  function stOf(lk){ if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }
  function redraw(){ if(typeof chRender==='function') chRender(0); }
  window.visW39Act=function(lk,act){
    const st=stOf(lk);
    if(act==='n+') st.n=Math.min(4,(st.n||1)+1);
    if(act==='n-') st.n=Math.max(1,(st.n||1)-1);
    if(act==='clr') st.add=0;
    if(act==='next'){ st.tr=(st.tr||0)+1; st.pick=null; st.counted=false; }
    redraw();
  };
  window.visW39Add=function(lk,v){
    const st=stOf(lk);
    st.add=(st.add||0)+v;
    if(st.add>80) st.add=80;
    redraw();
  };
  window.visW39Pick=function(lk,i){
    const st=stOf(lk);
    const Q=QUIZ[(st.tr||0)%QUIZ.length];
    st.pick=i;
    if(!st.counted){
      st.counted=true;
      if(i===Q.a) st.ok=(st.ok||0)+1; else st.bad=(st.bad||0)+1;
    }
    redraw();
  };

  window.VISKW=window.VISKW||{};
  window.VISKW[39]=visW39;
  (function(){
    if(!window.ARH_LESSONS) return;
    for(let i=0;i<window.ARH_LESSONS.length;i++){
      if(window.ARH_LESSONS[i] && window.ARH_LESSONS[i].id===39){ window.ARH_LESSONS[i]=L39; return; }
    }
    window.ARH_LESSONS.push(L39);
  })();
})();
