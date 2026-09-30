/* ============ РИСУНКИ ЛАБОРАТОРИИ · ОБЩАЯ БИБЛИОТЕКА ДЛЯ УРОКОВ ХИМИИ ============
   window.РЛ — функции, которые возвращают куски SVG в координатах кадра 336 × Н.
   Первый урок на ней — 110 «Растворы». Подключается ДО уроков, которые её используют.

   МАНЕРА «ФОТО». В отличие от сказочной библиотеки РМ (обводка #33291e, мультяшные
   герои), здесь рисуем как на снимке: без чёрной обводки, объём даёт только свет.
   • Свет — из окна слева-сверху: на стене косой луч, у предметов блик слева,
     вторичный блик справа, тень мягкая и уходит вправо-вниз.
   • Стекло прозрачное: у стакана видна задняя стенка, передняя даёт два блика и
     тёмные края (преломление), толстое дно, кольцо края. Под стаканом на столе —
     каустика: светлое пятно цвета жидкости.
   • Палочка в стакане ниже уровня жидкости сдвинута — преломление, как в жизни.
   • Столешница — тёмный эпоксидный камень с крапом; предметы на ней отражаются
     (РЛ.отражение). Стена — белый кафель с затиркой, мебель — белый ламинат
     и стальные ручки.
   • Надписи на этикетках — бумага, шрифт без засечек, как на настоящих банках.
   Движение только со смыслом и только при разрешённом движении. */
(function(){
  'use strict';
  if(window.РЛ) return;

  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let счётчик = 0;
  const ид = (п) => 'рл-'+п+'-'+(++счётчик);
  const f = (v) => (+v).toFixed(1);
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  /* детерминированный «случай»: крап и кристаллы одинаковы при каждой перерисовке */
  const слч = (seed) => { let s=(seed>>>0)||7; return () => ((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296); };
  const ШРИФТ = "'Helvetica Neue',Arial,sans-serif";

  /* ---------- определения ---------- */
  const defs = () => `<defs>
    <filter id="рл-мягко" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="рл-размыв" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="рл-чуть" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".7"/></filter>
    <filter id="рл-свечение" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="рл-стена" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f5f3"/><stop offset="1" stop-color="#d4dad7"/></linearGradient>
    <pattern id="рл-кафель" width="30" height="15" patternUnits="userSpaceOnUse">
      <rect width="30" height="15" fill="#f7f9f8"/><rect x=".8" y=".8" width="28.4" height="13.4" rx="1.2" fill="url(#рл-плитка)"/>
      <path d="M0 14.6 H30 M29.6 0 V15" stroke="#c6cdca" stroke-width=".9"/></pattern>
    <linearGradient id="рл-плитка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1f4f3"/><stop offset="1" stop-color="#e3e8e6"/></linearGradient>
    <linearGradient id="рл-столешница" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5158"/><stop offset=".35" stop-color="#2c3237"/><stop offset="1" stop-color="#1a1e22"/></linearGradient>
    <linearGradient id="рл-кромка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6168"/><stop offset=".25" stop-color="#23282c"/><stop offset="1" stop-color="#0f1215"/></linearGradient>
    <linearGradient id="рл-ламинат" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ecea"/><stop offset="1" stop-color="#c9cfcc"/></linearGradient>
    <linearGradient id="рл-сталь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d848b"/><stop offset=".22" stop-color="#e6eaee"/><stop offset=".4" stop-color="#a7aeb5"/><stop offset=".62" stop-color="#f5f7f9"/><stop offset="1" stop-color="#868d94"/></linearGradient>
    <radialGradient id="рл-чаша" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cfd5db"/><stop offset="1" stop-color="#7e868e"/></radialGradient>
    <linearGradient id="рл-пластик" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbf9"/><stop offset=".6" stop-color="#e6e8e4"/><stop offset="1" stop-color="#c3c7c2"/></linearGradient>
    <linearGradient id="рл-жк" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a14"/><stop offset="1" stop-color="#18261e"/></linearGradient>
    <linearGradient id="рл-стекло" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".07" stop-color="#dcebf5" stop-opacity=".22"/>
      <stop offset=".5" stop-color="#dcebf5" stop-opacity=".05"/><stop offset=".9" stop-color="#dcebf5" stop-opacity=".2"/><stop offset="1" stop-color="#ffffff" stop-opacity=".48"/></linearGradient>
    <linearGradient id="рл-жидкость" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
    <linearGradient id="рл-глубина" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
    <linearGradient id="рл-луч" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8e0" stop-opacity=".55"/><stop offset="1" stop-color="#fff8e0" stop-opacity="0"/></linearGradient>
    <radialGradient id="рл-окносвет" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eaf5ff"/><stop offset="1" stop-color="#b8d8f0"/></radialGradient>
    <linearGradient id="рл-этикетка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfbf4"/><stop offset="1" stop-color="#e8e3d4"/></linearGradient>
    <linearGradient id="рл-янтарь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a1a06"/><stop offset=".25" stop-color="#8a4a14"/><stop offset=".5" stop-color="#6a3208"/><stop offset="1" stop-color="#2a1004"/></linearGradient>
    <linearGradient id="рл-крышка" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#101214"/><stop offset=".3" stop-color="#4a5056"/><stop offset=".55" stop-color="#1c2024"/><stop offset="1" stop-color="#08090a"/></linearGradient>
    <linearGradient id="рл-стык" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <radialGradient id="рл-виньетка" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient>
    <radialGradient id="рл-яйцо" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fffaf2"/><stop offset=".6" stop-color="#f0dcc0"/><stop offset="1" stop-color="#c8a882"/></radialGradient>
    <filter id="рл-тень" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="2" stdDeviation="1.6" flood-color="#000" flood-opacity=".3"/></filter>
    <linearGradient id="рл-перчатка" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ab8f0"/><stop offset=".5" stop-color="#4a86d8"/><stop offset="1" stop-color="#2a5aa8"/></linearGradient>
  </defs>`;

  /* ---------- цвет раствора: вид 'вода' | 'сахар' | 'соль' | 'купорос'; доля 0..1 ---------- */
  function цвет(вид,доля){
    const д=Math.max(0,Math.min(1,доля||0));
    if(вид==='купорос'){ const a=Math.min(.9,.18+д*3.2), l=Math.round(72-д*140); return `hsla(203,85%,${Math.max(30,l)}%,${a.toFixed(2)})`; }
    if(вид==='чай') return `hsla(28,75%,${Math.round(50-д*60)}%,${Math.min(.9,.35+д*2).toFixed(2)})`;
    return вид==='сахар'||вид==='соль' ? `hsla(${200-д*120},${50+д*40}%,${80-д*20}%,${(.4+д*1.2).toFixed(2)})` : 'hsla(198,60%,74%,.42)';
  }

  /* ---------- кристаллы: горка гранёных зёрен (x — центр, y — низ) ---------- */
  function кристаллы(x,y,ш,в,вид,n,seed){
    const r=слч(seed||11), ц = вид==='купорос'?['#1f6fc8','#4a9ae8','#9fd0ff']: вид==='песок'?['#b8925a','#d8b47a','#8a6a3a']: вид==='сахар'?['#ffffff','#f1f4f7','#d9e0e8']
      : вид==='уголь'?['#1a1b1d','#2e3033','#0c0d0e']: вид==='железо'?['#5a5f66','#8a9098','#3a3e44']: вид==='медь'?['#b8622a','#e0884a','#8a4418']: вид==='сера'?['#f2d22a','#ffe86a','#d0a810']:['#ffffff','#eef2f5','#cfd8e0'];
    let s='';
    for(let i=0;i<n;i++){
      const t=r(), u=r(), dx=(t-0.5)*ш*(1-u*0.6), dy=-u*в*(1-Math.abs(t-0.5)*1.4), k=вид==='песок'||вид==='сера'?1.1+r()*0.8:вид==='уголь'?1.8+r()*2:1.1+r()*1.3, a=r()*180;
      const cx=x+dx, cy=y+dy-k*0.5;
      if(вид==='медь'){ s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(k*0.9)}" fill="${ц[i%3]}"/><circle cx="${f(cx-k*0.3)}" cy="${f(cy-k*0.3)}" r="${f(k*0.3)}" fill="#ffd0a0" opacity=".85"/>`; continue; }
      if(вид==='железо'){ s+=`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><rect x="${f(-k)}" y="-.5" width="${f(k*2)}" height="1" fill="${ц[i%3]}"/><rect x="${f(-k)}" y="-.5" width="${f(k)}" height=".4" fill="#d8dde2" opacity=".8"/></g>`; continue; }
      if(вид==='уголь'){ s+=`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><path d="M${f(-k)} ${f(k*0.2)} L${f(-k*0.3)} ${f(-k*0.8)} L${f(k*0.9)} ${f(-k*0.3)} L${f(k*0.6)} ${f(k*0.7)} Z" fill="${ц[i%3]}"/><path d="M${f(-k*0.3)} ${f(-k*0.8)} L${f(k*0.9)} ${f(-k*0.3)} L${f(k*0.1)} 0 Z" fill="#6a7078" opacity=".7"/></g>`; continue; }
      s+= вид==='песок'||вид==='сера'
        ? `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(k*0.7)}" fill="${ц[i%3]}"/>`
        : `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><path d="M${f(-k)} 0 L0 ${f(-k*0.8)} L${f(k)} 0 L0 ${f(k*0.8)} Z" fill="${ц[i%3]}"/><path d="M${f(-k)} 0 L0 ${f(-k*0.8)} L0 0 Z" fill="#fff" opacity=".55"/></g>`;
    }
    return s;
  }

  /* ---------- комната: кафельная стена, окно со светом, полка, лабораторный стол ----------
     y0 — задний край столешницы; опц.окно, опц.полка (по умолчанию есть), опц.вечер */
  function комната(Н,y0,опц){
    const о=опц||{}, r=слч(3);
    const крап=Array.from({length:70},()=>`<circle cx="${f(r()*336)}" cy="${f(y0+2+r()*20)}" r="${f(0.3+r()*0.7)}" fill="${r()>0.5?'#8a939b':'#0c0e10'}" opacity="${f(0.3+r()*0.4)}"/>`).join('');
    const окно = о.окно===false?'' : `
      <rect x="14" y="16" width="86" height="${f(y0-60)}" rx="2" fill="url(#рл-окносвет)"/>
      <path d="M14 ${f(y0-80)} Q40 ${f(y0-96)} 70 ${f(y0-86)} Q90 ${f(y0-80)} 100 ${f(y0-88)} V${f(y0-44)} H14 Z" fill="#a8c8a0" opacity=".55"/>
      <rect x="14" y="16" width="86" height="${f(y0-60)}" fill="none" stroke="#e9ecea" stroke-width="5"/>
      <path d="M57 16 V${f(y0-44)} M14 ${f((y0-28)/2)} H100" stroke="#e9ecea" stroke-width="3.4"/>
      <rect x="10" y="${f(y0-46)}" width="94" height="6" fill="#f4f6f5"/><rect x="10" y="${f(y0-40)}" width="94" height="2" fill="#b8bfbb"/>
      <path d="M100 16 L220 ${f(y0)} L130 ${f(y0)} L100 ${f(y0-44)} Z" fill="url(#рл-луч)" opacity=".7"/>`;
    const полка = о.полка===false?'' : `
      <rect x="150" y="${f(y0-104)}" width="176" height="5" fill="#dfe3e1"/><rect x="150" y="${f(y0-99)}" width="176" height="2" fill="#a8b0ac"/>
      <path d="M160 ${f(y0-99)} v10 l6 -10 M316 ${f(y0-99)} v10 l-6 -10" stroke="#9aa2a6" stroke-width="1.6" fill="none"/>
      ${банка(176,y0-104,22,34,{стекло:'янтарь',надпись:['HCl'],мал:true})}${банка(206,y0-104,20,28,{содержимое:'купорос',уровень:.6,надпись:['CuSO₄'],мал:true})}
      ${банка(234,y0-104,22,36,{стекло:'янтарь',надпись:['KMnO₄'],мал:true})}${банка(262,y0-104,20,30,{содержимое:'соль',уровень:.7,надпись:['NaCl'],мал:true})}
      ${банка(290,y0-104,22,34,{стекло:'янтарь',надпись:['H₂SO₄'],мал:true})}
      ${колба(314,y0-104,0.34,{цвет:цвет('купорос',.08),уровень:.4})}`;
    return `<rect width="336" height="${f(y0)}" fill="url(#рл-кафель)"/><rect width="336" height="${f(y0)}" fill="url(#рл-стена)" opacity=".35"/>
      <g filter="url(#рл-чуть)">${окно}${полка}</g>
      ${о.полка===false?'':`<rect x="150" y="${f(y0-97)}" width="176" height="10" fill="#000" opacity=".12" filter="url(#рл-мягко)"/>`}
      <rect x="0" y="${f(y0-10)}" width="336" height="10" fill="url(#рл-стык)"/>
      <rect x="0" y="${f(y0-4)}" width="336" height="5" fill="#b9c0bc" opacity=".6"/>
      <rect x="0" y="${f(y0)}" width="336" height="24" fill="url(#рл-столешница)"/>${крап}
      <rect x="0" y="${f(y0)}" width="336" height="1.2" fill="#8a939b" opacity=".6"/>
      <rect x="0" y="${f(y0+24)}" width="336" height="7" fill="url(#рл-кромка)"/>
      <rect x="0" y="${f(y0+31)}" width="336" height="${f(Н-y0-31)}" fill="url(#рл-ламинат)"/>
      ${[0,1,2].map(k=>`<rect x="${f(6+k*110)}" y="${f(y0+36)}" width="102" height="${f(Н-y0-40)}" rx="2" fill="none" stroke="#b6bdb9" stroke-width="1"/>
        <rect x="${f(37+k*110)}" y="${f(y0+44)}" width="40" height="4" rx="2" fill="url(#рл-сталь)"/><rect x="${f(37+k*110)}" y="${f(y0+48)}" width="40" height="1.4" fill="#000" opacity=".15"/>`).join('')}
      <rect x="0" y="${f(y0+31)}" width="336" height="8" fill="#000" opacity=".12" filter="url(#рл-мягко)"/>
      ${о.вечер?`<rect width="336" height="${f(Н)}" fill="#ffb060" opacity=".08"/>`:''}`;
  }
  /* виньетка «объектива»: края кадра чуть темнее — кладётся последним слоем */
  const виньетка = (Н) => `<rect width="336" height="${f(Н)}" fill="url(#рл-виньетка)" pointer-events="none"/>`;

  /* ---------- отражение предмета в столешнице: кусок SVG зеркалится вниз от линии y ---------- */
  function отражение(svg,y,глубина){
    const кл=ид('отр'), г=глубина||22;
    return `<clipPath id="${кл}"><rect x="0" y="${f(y)}" width="336" height="${f(г)}"/></clipPath>
      <g clip-path="url(#${кл})" opacity=".16"><g transform="translate(0 ${f(2*y)}) scale(1 -1)">${svg}</g></g>`;
  }
  /* мягкая тень предмета на столе */
  const тень = (x,y,ш,сила) => `<ellipse cx="${f(x+ш*0.12)}" cy="${f(y+1)}" rx="${f(ш*0.62)}" ry="${f(Math.max(2.4,ш*0.07))}" fill="#000" opacity="${сила||.45}" filter="url(#рл-мягко)"/>`;

  /* ---------- химический стакан: (x,y) — середина дна; ш×в; опц:
     уровень 0..1, цвет жидкости, крупинки (нерастворённые на дне, число), вид кристаллов,
     муть (взвесь песка), осадок (слой песка на дне, высота), палочка, мешать, деления,
     надпись (на стекле), объём (мл для делений, по умолч. 250) ---------- */
  function стакан(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('стак'), л=x-ш/2, п=x+ш/2, вр=y-в, ст=2.2, дно=4.5;
    const ур=Math.max(0,Math.min(1,о.уровень==null?0:о.уровень)), жв=(в-дно-8)*ур, жверх=y-дно-жв;
    const ц=о.цвет||цвет('вода');
    const жидкость = ур>0 ? `<clipPath id="${кл}"><rect x="${f(л+ст)}" y="${f(жверх)}" width="${f(ш-2*ст)}" height="${f(жв+дно-1)}" rx="2"/></clipPath>
      <g clip-path="url(#${кл})">
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="${ц}"/>
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="url(#рл-жидкость)"/>
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="url(#рл-глубина)"/>
        ${о.муть?(()=>{ const r=слч(21); return Array.from({length:о.муть},(_,i)=>{ const cx=л+4+r()*(ш-8), cy=жверх+4+r()*(жв-6), d=(жв*0.6+r()*жв*0.4);
          return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(0.7+r()*0.9)}" fill="${['#b8925a','#d8b47a','#9a7a4a'][i%3]}" opacity=".85">${ДВИЖ?`<animate attributeName="cy" values="${f(cy)};${f(Math.min(y-дно-2,cy+d))}" dur="${f(3+r()*3)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join(''); })():''}
        ${о.осадок?`<path d="M${f(л)} ${f(y-дно)} V${f(y-дно-о.осадок)} ${Array.from({length:8},(_,k)=>`Q${f(л+ш*(k+0.5)/8)} ${f(y-дно-о.осадок-(k%2?2:-1))} ${f(л+ш*(k+1)/8)} ${f(y-дно-о.осадок)}`).join(' ')} V${f(y-дно)} Z" fill="#b8925a"/>${кристаллы(x,y-дно,ш-6,о.осадок,'песок',40,5)}`:''}
        ${о.крупинки?`<g>${ДВИЖ&&о.таять?`<animate attributeName="opacity" values="1;.6;0" dur="2.6s" fill="freeze"/>`:''}${кристаллы(x,y-дно,ш*0.6,6,о.вид||'соль',о.крупинки,9)}</g>`:''}
        ${ДВИЖ&&о.мешать?`<path d="M${f(л+6)} ${f(жверх+жв*0.5)} q${f(ш*0.4)} -6 ${f(ш-12)} 0" stroke="#fff" stroke-width=".8" fill="none" opacity=".35"><animateTransform attributeName="transform" type="translate" values="0 0;0 ${f(жв*0.3)};0 0" dur="1.2s" repeatCount="indefinite"/></path>`:''}
      </g>
      <ellipse cx="${f(x)}" cy="${f(жверх)}" rx="${f(ш/2-ст)}" ry="3" fill="${ц}"/><ellipse cx="${f(x)}" cy="${f(жверх)}" rx="${f(ш/2-ст)}" ry="3" fill="#fff" opacity=".35"/>
      <path d="M${f(л+ст)} ${f(жверх)} A${f(ш/2-ст)} 3 0 0 0 ${f(п-ст)} ${f(жверх)}" stroke="#5a8aa8" stroke-width=".9" fill="none" opacity=".55"/>
      <path d="M${f(л+ст+2)} ${f(жверх-0.6)} A${f(ш/2-ст-2)} 2.4 0 0 1 ${f(п-ст-2)} ${f(жверх-0.6)}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
      <path d="M${f(л+ст)} ${f(жверх)} q0 -2 2 -3 M${f(п-ст)} ${f(жверх)} q0 -2 -2 -3" stroke="#fff" stroke-width=".9" opacity=".6" fill="none"/>` : '';
    const палочка = о.палочка ? (()=>{ const x1=x+ш*0.28, y1=вр-18, x2=x-ш*0.18, y2=y-дно-3;
        const t=ур>0?Math.max(0,Math.min(1,(жверх-y1)/(y2-y1))):1, xm=x1+(x2-x1)*t, ym=y1+(y2-y1)*t;
        const г=`<path d="M${f(x1)} ${f(y1)} L${f(xm)} ${f(ym)}" stroke="#e8f4fa" stroke-width="3.2" stroke-linecap="round" opacity=".85"/><path d="M${f(x1-0.6)} ${f(y1)} L${f(xm-0.6)} ${f(ym)}" stroke="#fff" stroke-width="1" opacity=".9"/>
          ${ур>0?`<path d="M${f(xm+3)} ${f(ym)} L${f(x2+3)} ${f(y2)}" stroke="#e8f4fa" stroke-width="3.2" stroke-linecap="round" opacity=".6"/>`:''}`;
        return ДВИЖ&&о.мешать ? `<g>${г}<animateTransform attributeName="transform" type="rotate" values="-7 ${f(x1)} ${f(y1)};7 ${f(x1)} ${f(y1)};-7 ${f(x1)} ${f(y1)}" dur="1.1s" repeatCount="indefinite"/></g>` : г; })() : '';
    const деления = о.деления===false ? '' : (()=>{ const V=о.объём||250, шаг=V>=200?50:V>=100?25:10; let s='';
        for(let v=шаг; v<V; v+=шаг){ const yy=y-дно-(в-дно-8)*v/V; s+=`<path d="M${f(п-ш*0.3)} ${f(yy)} H${f(п-4)}" stroke="#fff" stroke-width=".9" opacity=".8"/><text x="${f(п-ш*0.32)}" y="${f(yy+2.2)}" text-anchor="end" font-size="${f(Math.max(5,ш*0.075))}" fill="#fff" opacity=".85" font-family="${ШРИФТ}">${v}</text>`; }
        return s; })();
    const каустика = `<ellipse cx="${f(x+ш*0.2)}" cy="${f(y+2)}" rx="${f(ш*0.5)}" ry="${f(ш*0.07+1)}" fill="${ур>0?ц:'#e8f4ff'}" opacity=".55" filter="url(#рл-мягко)"/>`;
    return `<g>
      ${тень(x,y,ш,.4)}${каустика}
      <path d="M${f(л)} ${f(вр)} V${f(y-3)} Q${f(л)} ${f(y)} ${f(л+3)} ${f(y)} H${f(п-3)} Q${f(п)} ${f(y)} ${f(п)} ${f(y-3)} V${f(вр)}" fill="#dcebf5" fill-opacity=".06"/>
      <ellipse cx="${f(x)}" cy="${f(вр)}" rx="${f(ш/2)}" ry="3.4" fill="none" stroke="#9fb8c8" stroke-width=".8" opacity=".6"/>
      ${жидкость}${палочка}
      <rect x="${f(л+1)}" y="${f(y-дно)}" width="${f(ш-2)}" height="${f(дно)}" rx="2" fill="#dcebf5" opacity=".35"/>
      <path d="M${f(л)} ${f(вр)} V${f(y-3)} Q${f(л)} ${f(y)} ${f(л+3)} ${f(y)} H${f(п-3)} Q${f(п)} ${f(y)} ${f(п)} ${f(y-3)} V${f(вр)}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width=".9"/>
      <rect x="${f(л+3)}" y="${f(вр+6)}" width="${f(Math.max(2,ш*0.05))}" height="${f(в-14)}" rx="1.5" fill="#fff" opacity=".7"/>
      <rect x="${f(л+3+ш*0.09)}" y="${f(вр+10)}" width="1.2" height="${f(в*0.55)}" fill="#fff" opacity=".35"/>
      <rect x="${f(п-6)}" y="${f(вр+8)}" width="2" height="${f(в-18)}" rx="1" fill="#fff" opacity=".32"/>
      <path d="M${f(л-1.5)} ${f(вр+1)} Q${f(л-4)} ${f(вр-2)} ${f(л-5)} ${f(вр-3)}" stroke="#cfe2ee" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
      <ellipse cx="${f(x)}" cy="${f(вр)}" rx="${f(ш/2)}" ry="3.4" fill="none" stroke="#fff" stroke-width="1.4" opacity=".75"/>
      ${деления}
      ${о.надпись?`<text x="${f(x-ш*0.12)}" y="${f(y-в*0.25)}" text-anchor="middle" font-size="${f(Math.max(5.5,ш*0.08))}" fill="#fff" opacity=".85" font-family="${ШРИФТ}">${esc(о.надпись)}</text>`:''}
    </g>`;
  }

  /* ---------- коническая колба (Эрленмейера): (x,y) — середина дна, м — масштаб (1 ≈ 60×90) ---------- */
  function колба(x,y,м,опц){
    const о=опц||{}, кл=ид('колб'), ур=Math.max(0,Math.min(1,о.уровень||0)), ц=о.цвет||цвет('вода');
    const форма='M-10 -90 V-58 L-30 -6 Q-32 0 -26 0 H26 Q32 0 30 -6 L10 -58 V-90';
    const yж=-6-(52*ур);
    const шир=(yy)=>10+20*Math.min(1,(-yy-6)/52<0?0:1-(-yy-6)/52);
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <ellipse cx="4" cy="1" rx="34" ry="3.6" fill="#000" opacity=".4" filter="url(#рл-мягко)"/>
      ${ур>0?`<ellipse cx="6" cy="2" rx="30" ry="4" fill="${ц}" opacity=".6" filter="url(#рл-мягко)"/>
        <clipPath id="${кл}"><path d="${форма} Z"/></clipPath>
        <g clip-path="url(#${кл})"><rect x="-34" y="${f(yж)}" width="68" height="${f(-yж+2)}" fill="${ц}"/><rect x="-34" y="${f(yж)}" width="68" height="${f(-yж+2)}" fill="url(#рл-жидкость)"/></g>
        <ellipse cx="0" cy="${f(yж)}" rx="${f(шир(yж)-1.5)}" ry="2.4" fill="#fff" opacity=".3"/>`:''}
      <path d="${форма}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width="1"/>
      <path d="M-8 -86 V-58 L-26 -10" stroke="#fff" stroke-width="2.4" fill="none" opacity=".65" stroke-linecap="round"/>
      <path d="M7 -80 V-60 L22 -22" stroke="#fff" stroke-width="1.2" fill="none" opacity=".35"/>
      <ellipse cx="0" cy="-90" rx="11" ry="2.6" fill="none" stroke="#fff" stroke-width="1.6" opacity=".8"/>
    </g>`;
  }

  /* ---------- мерный цилиндр: (x,y) — середина подставки; ш×в; опц.уровень (мл), опц.объём, опц.цвет ---------- */
  function цилиндр(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('цил'), V=о.объём||100, мл=Math.max(0,Math.min(V,о.мл||0)), л=x-ш/2, п=x+ш/2, низ=y-6, верх=y-в;
    const h=(в-16)*мл/V, yж=низ-h, ц=о.цвет||цвет('вода');
    let дел=''; for(let v=10; v<V; v+=10){ const yy=низ-(в-16)*v/V; дел+=`<path d="M${f(x-ш*0.1)} ${f(yy)} H${f(п-2)}" stroke="#fff" stroke-width="${v%50?0.6:1}" opacity=".85"/>${v%20===0?`<text x="${f(x-ш*0.14)}" y="${f(yy+2)}" text-anchor="end" font-size="5.4" fill="#fff" font-family="${ШРИФТ}">${v}</text>`:''}`; }
    return `<g>
      ${тень(x,y,ш*1.8,.4)}
      <path d="M${f(x-ш*0.95)} ${f(y)} L${f(x-ш*0.7)} ${f(y-6)} H${f(x+ш*0.7)} L${f(x+ш*0.95)} ${f(y)} Z" fill="#dcebf5" fill-opacity=".35" stroke="#8fa8b8" stroke-opacity=".5" stroke-width=".8"/>
      ${мл>0?`<clipPath id="${кл}"><rect x="${f(л+1.6)}" y="${f(yж)}" width="${f(ш-3.2)}" height="${f(h)}"/></clipPath><g clip-path="url(#${кл})"><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(h)}" fill="${ц}"/><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(h)}" fill="url(#рл-жидкость)"/></g>
        <path d="M${f(л+1.6)} ${f(yж-2)} Q${f(x)} ${f(yж+2.4)} ${f(п-1.6)} ${f(yж-2)}" stroke="#fff" stroke-width="1" fill="none" opacity=".75"/>`:''}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(в-6)}" rx="1.5" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width=".8"/>
      <rect x="${f(л+2)}" y="${f(верх+4)}" width="2" height="${f(в-14)}" fill="#fff" opacity=".7"/>
      ${дел}
      <path d="M${f(л-2)} ${f(верх)} H${f(п+1)} M${f(л-2)} ${f(верх)} l-3 -3" stroke="#e0eef6" stroke-width="1.6" fill="none"/>
    </g>`;
  }

  /* ---------- электронные весы: (x,y) — середина низа; ш — ширина; опц.показ — строка на табло
     (по умолч. '0.0'), опц.ед ('г'). Верх чаши — весыВерх(y,ш) ---------- */
  const весыВерх = (y,ш) => y-ш*0.3-4;
  function весы(x,y,ш,опц){
    const о=опц||{}, в=ш*0.26, л=x-ш/2, верх=y-в, чаша=весыВерх(y,ш)+4, r=ш*0.36;
    const показ=о.показ==null?'0.0':String(о.показ);
    return `<g>
      ${тень(x,y,ш,.5)}
      <path d="M${f(л+4)} ${f(y)} L${f(л+10)} ${f(верх)} H${f(л+ш-10)} L${f(л+ш-4)} ${f(y)} Z" fill="url(#рл-пластик)"/>
      <path d="M${f(л+10)} ${f(верх)} H${f(л+ш-10)}" stroke="#fff" stroke-width="1.4"/>
      <path d="M${f(л+4)} ${f(y)} H${f(л+ш-4)}" stroke="#9aa09c" stroke-width="1.4"/>
      <rect x="${f(x-ш*0.3)}" y="${f(верх+в*0.2)}" width="${f(ш*0.42)}" height="${f(в*0.56)}" rx="2" fill="url(#рл-жк)"/>
      <text x="${f(x-ш*0.3+ш*0.4)}" y="${f(верх+в*0.2+в*0.46)}" text-anchor="end" font-size="${f(в*0.44)}" font-weight="bold" fill="#7dffb0" font-family="'Courier New',monospace" filter="url(#рл-свечение)">${esc(показ)}</text>
      <text x="${f(x+ш*0.16)}" y="${f(верх+в*0.2+в*0.46)}" font-size="${f(в*0.3)}" fill="#6ad89a" font-family="${ШРИФТ}">${esc(о.ед||'г')}</text>
      ${[0,1].map(k=>`<ellipse cx="${f(x+ш*0.24+k*ш*0.12)}" cy="${f(верх+в*0.5)}" rx="${f(ш*0.04)}" ry="${f(в*0.16)}" fill="${k?'#3a8a5a':'#c8c8c4'}"/><text x="${f(x+ш*0.24+k*ш*0.12)}" y="${f(верх+в*0.9)}" text-anchor="middle" font-size="${f(в*0.16)}" fill="#6a706c" font-family="${ШРИФТ}">${k?'ON':'TARE'}</text>`).join('')}
      <rect x="${f(x-4)}" y="${f(чаша)}" width="8" height="${f(верх-чаша)}" fill="url(#рл-сталь)"/>
      <ellipse cx="${f(x)}" cy="${f(чаша+2)}" rx="${f(r)}" ry="${f(r*0.14+1)}" fill="#6a7178"/>
      <ellipse cx="${f(x)}" cy="${f(чаша)}" rx="${f(r)}" ry="${f(r*0.14+1)}" fill="url(#рл-чаша)"/>
      <ellipse cx="${f(x-r*0.3)}" cy="${f(чаша-0.6)}" rx="${f(r*0.4)}" ry="${f(r*0.05+0.4)}" fill="#fff" opacity=".7"/>
    </g>`;
  }

  /* ---------- банка с реактивом: (x,y) — середина дна; опц.стекло 'прозрачное'|'янтарь',
     опц.содержимое 'соль'|'сахар'|'купорос'|'песок', опц.уровень, опц.надпись — строки этикетки,
     опц.мал — мелкая (на полке) ---------- */
  function банка(x,y,ш,в,опц){
    const о=опц||{}, л=x-ш/2, крв=Math.max(5,в*0.18), тело=в-крв, верх=y-тело, ур=о.уровень==null?0.7:о.уровень;
    const янт=о.стекло==='янтарь';
    const кб=ид('бнк');
    const внутри = !янт&&о.содержимое ? (()=>{ const hh=(тело-4)*ур;
        return `<clipPath id="${кб}"><rect x="${f(л+1.5)}" y="${f(y-2-hh)}" width="${f(ш-3)}" height="${f(hh)}" rx="1.5"/></clipPath>
          <rect x="${f(л+1.5)}" y="${f(y-2-hh)}" width="${f(ш-3)}" height="${f(hh)}" rx="1.5" fill="${о.содержимое==='купорос'?'#2a78d0':о.содержимое==='песок'?'#c8a268':'#e6ebf0'}"/>
          <g clip-path="url(#${кб})">${кристаллы(x,y-2,ш-2,hh+4,о.содержимое,Math.round(ш*hh/(о.мал?12:7)),x|0)}</g>`; })() : '';
    const строк=[].concat(о.надпись||[]), кег=о.мал?5.4:Math.max(6.5,ш*0.14);
    return `<g>
      ${о.мал?'':тень(x,y,ш,.45)}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(тело)}" rx="${f(ш*0.12)}" fill="${янт?'url(#рл-янтарь)':'#dcebf5'}" fill-opacity="${янт?1:.14}"/>
      ${внутри}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(тело)}" rx="${f(ш*0.12)}" fill="url(#рл-стекло)" stroke="#6a7a86" stroke-opacity=".45" stroke-width=".7"/>
      <rect x="${f(л+ш*0.14)}" y="${f(верх-крв*0.3)}" width="${f(ш*0.72)}" height="${f(крв*0.4)}" fill="${янт?'#4a2208':'#dcebf5'}" opacity=".8"/>
      <rect x="${f(л+ш*0.08)}" y="${f(верх-крв)}" width="${f(ш*0.84)}" height="${f(крв*0.8)}" rx="1.5" fill="url(#рл-крышка)"/>
      ${Array.from({length:Math.round(ш/3)},(_,k)=>`<path d="M${f(л+ш*0.1+k*ш*0.8/Math.round(ш/3))} ${f(верх-крв)} v${f(крв*0.8)}" stroke="#000" stroke-width=".5" opacity=".5"/>`).join('')}
      <rect x="${f(л+2)}" y="${f(верх+3)}" width="${f(Math.max(1.4,ш*0.08))}" height="${f(тело-8)}" rx="1" fill="#fff" opacity="${янт?.4:.7}"/>
      ${строк.length?`<rect x="${f(л+ш*0.14)}" y="${f(верх+тело*0.3)}" width="${f(ш*0.72)}" height="${f(тело*0.42)}" rx="1" fill="url(#рл-этикетка)"/>
        <rect x="${f(л+ш*0.14)}" y="${f(верх+тело*0.3)}" width="${f(ш*0.72)}" height="${f(Math.max(1.4,тело*0.05))}" fill="${о.полоса||'#c8402a'}"/>
        ${строк.map((s0,i)=>{ const кк=i?кег*0.8:кег, нужно=String(s0).length*кк*0.56, влез=ш*0.66; return `<text x="${f(x+ш*0.02)}" ${нужно>влез?`textLength="${f(влез)}" lengthAdjust="spacingAndGlyphs"`:''} y="${f(верх+тело*0.3+тело*0.42*(i+1)/(строк.length+1)+кег*0.4+ (строк.length>1?1:0))}" text-anchor="middle" font-size="${f(i?кег*0.8:кег)}" font-weight="${i?'normal':'bold'}" fill="#1a1a1a" font-family="${ШРИФТ}">${esc(s0)}</text>`; }).join('')}`:''}
    </g>`;
  }

  /* ---------- лодочка для взвешивания: белая пластиковая чашечка (x — центр, y — низ), горка кристаллов ---------- */
  function лодочка(x,y,ш,опц){
    const о=опц||{}, в=ш*0.26;
    return `<g>
      <path d="M${f(x-ш/2)} ${f(y-в)} L${f(x-ш*0.38)} ${f(y)} H${f(x+ш*0.38)} L${f(x+ш/2)} ${f(y-в)} Z" fill="url(#рл-пластик)"/>
      <ellipse cx="${f(x)}" cy="${f(y-в)}" rx="${f(ш/2)}" ry="${f(в*0.28)}" fill="#e8ebe7"/>
      ${о.горка?кристаллы(x,y-в*0.6,ш*0.7,о.горка,о.вид||'соль',Math.round(10+о.горка*6),(x*3)|0):''}
      <path d="M${f(x-ш/2)} ${f(y-в)} Q${f(x)} ${f(y-в-в*0.5)} ${f(x+ш/2)} ${f(y-в)}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
    </g>`;
  }
  /* ---------- шпатель: стальная лопатка; (x,y) — кончик, угол в градусах, опц.горка (вид кристаллов на лопатке) ---------- */
  function шпатель(x,y,длина,угол,опц){
    const о=опц||{};
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол)})">
      <path d="M0 -3.4 Q-4 0 0 3.4 H14 L${f(длина)} 1.4 V-1.4 L14 -3.4 Z" fill="url(#рл-сталь)"/>
      <path d="M1 -2 H13" stroke="#fff" stroke-width=".8" opacity=".8"/>
      ${о.горка?`<g transform="rotate(${f(-угол)} 6 0)">${кристаллы(6,-1,12,4,о.горка,10,5)}</g>`:''}
    </g>`;
  }
  /* ---------- защитные очки на столе ---------- */
  function очки(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <ellipse cx="4" cy="1" rx="30" ry="3" fill="#000" opacity=".35" filter="url(#рл-мягко)"/>
      <path d="M-28 -2 Q-30 -16 -14 -17 Q-2 -17 0 -10 Q2 -17 14 -17 Q30 -16 28 -2 Q14 2 0 -4 Q-14 2 -28 -2 Z" fill="#cfe8f4" fill-opacity=".35" stroke="#2a3a4a" stroke-width="1.6"/>
      <path d="M-24 -12 Q-18 -15 -10 -14 M8 -14 Q16 -15 22 -12" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8" stroke-linecap="round"/>
      <path d="M-28 -6 Q-40 -6 -44 0 M28 -6 Q40 -6 44 0" stroke="#2a3a4a" stroke-width="2.4" fill="none"/>
    </g>`;
  }
  /* ---------- струя из стакана/цилиндра в стакан: от (x1,y1) к (x2,y2), цвет ---------- */
  function струя(x1,y1,x2,y2,ц){
    return `<path d="M${f(x1)} ${f(y1)} Q${f(x2+ (x1-x2)*0.15)} ${f(y1)} ${f(x2)} ${f(y2)}" stroke="${ц||цвет('вода')}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M${f(x1)} ${f(y1)} Q${f(x2+(x1-x2)*0.15)} ${f(y1)} ${f(x2)} ${f(y2)}" stroke="#fff" stroke-width="1" fill="none" opacity=".6" stroke-dasharray="4 6">${ДВИЖ?`<animate attributeName="stroke-dashoffset" values="20;0" dur=".5s" repeatCount="indefinite"/>`:''}</path>
      <ellipse cx="${f(x2)}" cy="${f(y2)}" rx="5" ry="1.6" fill="#fff" opacity=".6">${ДВИЖ?`<animate attributeName="rx" values="3;7;3" dur=".6s" repeatCount="indefinite"/>`:''}</ellipse>`;
  }
  /* ---------- рука в синей нитриловой перчатке, держит (x,y) — точка хвата; угол ---------- */
  function рука(x,y,м,угол){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)}) scale(${м||1})">
      <path d="M-6 -8 Q-2 -12 6 -10 L40 -12 Q52 -12 60 -6 L60 10 Q48 14 38 12 L6 10 Q-4 10 -6 4 Z" fill="url(#рл-перчатка)"/>
      <path d="M-6 -6 Q-12 -4 -10 2 Q-8 6 -2 4" fill="url(#рл-перчатка)"/>
      ${[-7,-2,3,8].map((yy,k)=>`<path d="M8 ${yy} Q2 ${yy+1} 0 ${yy+2}" stroke="#2a5aa8" stroke-width="1" fill="none" opacity=".6"/>`).join('')}
      <path d="M10 -9 Q30 -12 50 -8" stroke="#bcdcff" stroke-width="1.6" fill="none" opacity=".7"/>
      <rect x="58" y="-8" width="20" height="20" rx="4" fill="#f4f6f8"/><path d="M58 -8 V12" stroke="#c8ccd0" stroke-width="1.4"/>
    </g>`;
  }


  /* ---------- часовое стекло: плоская стеклянная чашка на столе с навеской вещества ---------- */
  function часовое(x,y,ш,вид,горка){
    const в=ш*0.12;
    return `<g>${тень(x,y,ш,.35)}
      <ellipse cx="${f(x)}" cy="${f(y-в*0.5)}" rx="${f(ш/2)}" ry="${f(в)}" fill="#dcebf5" fill-opacity=".25" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".8"/>
      ${вид==='вода'?`<ellipse cx="${f(x)}" cy="${f(y-в*0.6)}" rx="${f(ш*0.36)}" ry="${f(в*0.6)}" fill="${цвет('вода')}"/>`:кристаллы(x,y-в*0.5,ш*0.7,горка||ш*0.22,вид,Math.round(ш*(горка||ш*0.22)/(вид==='уголь'?14:4)),(x*7)|0)}
      <path d="M${f(x-ш/2+3)} ${f(y-в*0.7)} Q${f(x-ш*0.2)} ${f(y-в*1.4)} ${f(x+ш*0.1)} ${f(y-в*1.3)}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".75"/></g>`;
  }
  /* ---------- монеты: стопка (n штук) — (x,y) середина низа, r — радиус ---------- */
  function монеты(x,y,r,n,цв){
    const ц=цв||['#c8962a','#f0c860','#8a6010'];
    let s=тень(x,y,r*2,.4);
    for(let i=0;i<n;i++){ const yy=y-i*2.2, dx=((i*37)%5-2)*0.6;
      s+=`<ellipse cx="${f(x+dx)}" cy="${f(yy)}" rx="${f(r)}" ry="${f(r*0.3)}" fill="${ц[2]}"/><ellipse cx="${f(x+dx)}" cy="${f(yy-1.4)}" rx="${f(r)}" ry="${f(r*0.3)}" fill="${ц[0]}"/>`; }
    const top=y-(n-1)*2.2-1.4;
    return s+`<ellipse cx="${f(x)}" cy="${f(top)}" rx="${f(r*0.72)}" ry="${f(r*0.2)}" fill="none" stroke="${ц[2]}" stroke-width=".7"/><ellipse cx="${f(x-r*0.3)}" cy="${f(top-0.4)}" rx="${f(r*0.35)}" ry="${f(r*0.08)}" fill="${ц[1]}" opacity=".9"/>`;
  }
  /* ---------- лоток с дюжиной яиц: (x,y) — середина низа, м ---------- */
  function яйца(x,y,м){
    let s=`<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,90,.4)}
      <path d="M-46 0 L-42 -14 H42 L46 0 Z" fill="#c8b89a"/><path d="M-42 -14 H42" stroke="#e0d4bc" stroke-width="1.2"/>`;
    for(let r0=0;r0<2;r0++) for(let k=0;k<6;k++){ const ex=-35+k*14+r0*2, ey=-14-r0*6;
      s+=`<ellipse cx="${ex}" cy="${ey-6}" rx="6" ry="7.4" fill="url(#рл-яйцо)"/><ellipse cx="${ex-2}" cy="${ey-9}" rx="1.8" ry="2.4" fill="#fff" opacity=".7"/>`; }
    return s+`</g>`;
  }
  /* ---------- пачка бумаги (500 листов) ---------- */
  function пачка(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,70,.4)}
      <path d="M-34 0 V-16 L-24 -24 H38 V-8 L28 0 Z" fill="#e8ecef"/><path d="M-34 -16 L-24 -24 H38 L28 -16 Z" fill="#fbfcfd"/>
      <path d="M-34 -16 H28 V0 H-34 Z" fill="#2a6ab8"/><path d="M28 -16 L38 -24 V-8 L28 0 Z" fill="#1a4a8a"/>
      <text x="-3" y="-5" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">A4 · 500</text></g>`;
  }
  /* ---------- пара перчаток на столе ---------- */
  function перчатки(x,y,м){
    const одна=(dx,угол)=>`<g transform="translate(${dx} 0) rotate(${угол})"><path d="M-8 0 Q-10 -14 -8 -22 L-8 -34 Q-6 -37 -4 -34 L-4 -24 L-2 -38 Q0 -41 2 -38 L2 -24 L4 -36 Q6 -39 8 -36 L7 -22 L10 -30 Q12 -32 13 -29 L10 -14 Q8 0 6 0 Z" fill="url(#рл-перчатка)"/><path d="M-6 -10 Q0 -12 6 -10" stroke="#bcdcff" stroke-width="1" fill="none" opacity=".6"/></g>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,50,.35)}${одна(-10,-12)}${одна(10,14)}</g>`;
  }
  /* ---------- плакат «Периодическая система»: сетка 18×7 на стене; выдел — {символ:true} ----------
     (x,y) — левый верх, ш — ширина; клетки известных элементов подписаны */
  const ЭЛ = {H:[1,1,1,'водород'],He:[18,1,4,'гелий'],Li:[1,2,7,'литий'],C:[14,2,12,'углерод'],N:[15,2,14,'азот'],O:[16,2,16,'кислород'],F:[17,2,19,'фтор'],Ne:[18,2,20,'неон'],
    Na:[1,3,23,'натрий'],Mg:[2,3,24,'магний'],Al:[13,3,27,'алюминий'],Si:[14,3,28,'кремний'],P:[15,3,31,'фосфор'],S:[16,3,32,'сера'],Cl:[17,3,35.5,'хлор'],Ar:[18,3,40,'аргон'],
    K:[1,4,39,'калий'],Ca:[2,4,40,'кальций'],Fe:[8,4,56,'железо'],Cu:[11,4,64,'медь'],Zn:[12,4,65,'цинк'],Ag:[11,5,108,'серебро'],Au:[11,6,197,'золото']};
  function таблица(x,y,ш,опц){
    const о=опц||{}, к=ш/18, в=к*7+к*0.6;
    const есть=(g,p)=> p===1?(g===1||g===18): p<=3?(g<=2||g>=13): true;
    const цвет0=(g)=> g<=2?'#f4c8a0': g>=13&&g<=17?'#c8e4b0': g===18?'#c8d8f4':'#f4e4a8';
    let s=`<g>${тень(x+ш/2,y+в+4,ш,.25)}<rect x="${f(x-3)}" y="${f(y-10)}" width="${f(ш+6)}" height="${f(в+14)}" rx="2" fill="#fbfbf7"/>
      <text x="${f(x+ш/2)}" y="${f(y-3)}" text-anchor="middle" font-size="${f(к*0.62)}" textLength="${f(ш-4)}" lengthAdjust="spacingAndGlyphs" font-weight="bold" fill="#2a2a2a" font-family="${ШРИФТ}">ПЕРИОДИЧЕСКАЯ СИСТЕМА ЭЛЕМЕНТОВ Д. И. МЕНДЕЛЕЕВА</text>`;
    for(let p=1;p<=7;p++) for(let g=1;g<=18;g++){ if(!есть(g,p)) continue;
      const sym=Object.keys(ЭЛ).find(k0=>ЭЛ[k0][0]===g&&ЭЛ[k0][1]===p), вык=sym&&о.выдел&&о.выдел[sym];
      const cx=x+(g-1)*к, cy=y+(p-1)*к+(p>5?0:0);
      s+=`<rect x="${f(cx+0.3)}" y="${f(cy+0.3)}" width="${f(к-0.6)}" height="${f(к-0.6)}" fill="${вык?'#ffd76a':цвет0(g)}" stroke="${вык?'#c8402a':'#fff'}" stroke-width="${вык?1:0.4}"/>`;
      if(sym) s+=`<text x="${f(cx+к/2)}" y="${f(cy+к*0.68)}" text-anchor="middle" font-size="${f(к*0.5)}" font-weight="bold" fill="#1a1a1a" font-family="${ШРИФТ}">${sym}</text>`;
    }
    return s+`<path d="M${f(x-3)} ${f(y+в+4)} H${f(x+ш+3)}" stroke="#000" stroke-width=".6" opacity=".2"/></g>`;
  }
  /* крупная клетка элемента: (x,y) — левый верх, ш — сторона */
  function клетка(x,y,ш,сим){
    const e=ЭЛ[сим]||[0,0,0,''], цв=e[0]<=2?'#f4c8a0': e[0]>=13&&e[0]<=17?'#c8e4b0': e[0]===18?'#c8d8f4':'#f4e4a8';
    const Z={H:1,He:2,Li:3,C:6,N:7,O:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,S:16,Cl:17,Ar:18,K:19,Ca:20,Fe:26,Cu:29,Zn:30,Ag:47,Au:79}[сим]||'';
    return `<g filter="url(#рл-тень)">${тень(x+ш/2,y+ш,ш,.35)}<rect x="${f(x)}" y="${f(y)}" width="${f(ш)}" height="${f(ш)}" rx="3" fill="${цв}"/></g>
      <rect x="${f(x)}" y="${f(y)}" width="${f(ш)}" height="${f(ш)}" rx="3" fill="none" stroke="#fff" stroke-width="1.4" opacity=".7"/>
      <text x="${f(x+ш*0.1)}" y="${f(y+ш*0.2)}" font-size="${f(ш*0.14)}" font-weight="bold" fill="#333" font-family="${ШРИФТ}">${Z}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.58)}" text-anchor="middle" font-size="${f(ш*0.38)}" font-weight="bold" fill="#111" font-family="${ШРИФТ}">${esc(сим)}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.76)}" text-anchor="middle" font-size="${f(ш*0.13)}" fill="#333" font-family="${ШРИФТ}">${esc(e[3])}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.93)}" text-anchor="middle" font-size="${f(ш*0.14)}" font-weight="bold" fill="#8a1a1a" font-family="${ШРИФТ}">${String(e[2]).replace('.',',')}</text>`;
  }
  /* ---------- модель молекулы «шары и палочки»: (x,y) — центр, м — масштаб, вид — 'H2O'|'CO2'|'O2'|'CH4'|'NH3'|'N2'|'H2' ---------- */
  const АТОМ = {H:['#ffffff','#b8c0c8',7],O:['#ff5a4a','#8a1a10',11],C:['#5a5e64','#1a1c1f',11],N:['#5a7aff','#1a2a8a',10.5],Cl:['#6ad84a','#1a6a10',12.5],Na:['#b87aff','#4a1a8a',13],S:['#ffd84a','#8a6a00',12.5]};
  const МОЛ = {
    H2O:[['O',0,0,0],['H',-17,12,4],['H',17,12,4]],
    CO2:[['O',-26,0,0],['C',0,0,0],['O',26,0,0]],
    O2:[['O',-11,0,0],['O',11,0,0]],
    H2:[['H',-7,0,0],['H',7,0,0]],
    N2:[['N',-10,0,0],['N',10,0,0]],
    CH4:[['C',0,0,0],['H',0,-20,0],['H',-18,8,-6],['H',18,8,-6],['H',4,10,10]],
    NH3:[['N',0,-2,0],['H',-18,8,2],['H',18,8,2],['H',0,14,10]],
    NaCl:[['Na',-14,0,0],['Cl',14,0,0]]
  };
  function молекула(x,y,м,вид,опц){
    const о=опц||{}, ат=(МОЛ[вид]||[]).slice().sort((a,b)=>a[3]-b[3]), ц=МОЛ[вид]?МОЛ[вид][0]:null;
    let s=`<g transform="translate(${f(x)} ${f(y)}) scale(${м})">`;
    if(вид!=='NaCl'&&ц){ const [e0,x0,y0]=МОЛ[вид][0];
      МОЛ[вид].slice(1).forEach(([e,xx,yy])=>{ s+=`<path d="M${x0} ${y0} L${xx} ${yy}" stroke="#9aa0a6" stroke-width="4.4" stroke-linecap="round"/><path d="M${x0} ${y0} L${xx} ${yy}" stroke="#e8ecef" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`; });
      if(вид==='O2'||вид==='CO2'||вид==='N2'){ s+=МОЛ[вид].slice(1).map(([e,xx,yy])=>`<path d="M${x0} ${y0-3.4} L${xx} ${yy-3.4}" stroke="#9aa0a6" stroke-width="2.6"/>`).join(''); if(вид==='O2') s+=`<path d="M-11 -3.4 L11 -3.4" stroke="#9aa0a6" stroke-width="2.6"/>`; } }
    ат.forEach(([e,xx,yy,zz])=>{ const [c1,c2,r]=АТОМ[e], кл=ид('ат'), rr=r*(1+zz*0.012);
      s+=`<radialGradient id="${кл}" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <circle cx="${xx}" cy="${yy}" r="${f(rr)}" fill="url(#${кл})"/>${о.подписи?`<text x="${xx}" y="${f(yy+rr*0.35)}" text-anchor="middle" font-size="${f(rr*0.9)}" font-weight="bold" fill="${e==='H'?'#333':'#fff'}" font-family="${ШРИФТ}">${e}</text>`:''}`; });
    return s+`</g>`;
  }
  window.РЛ = {ДВИЖ, defs, виньетка, цвет, кристаллы, комната, отражение, тень, стакан, колба, цилиндр, весы, весыВерх, банка, лодочка, шпатель, очки, струя, рука, часовое, монеты, яйца, пачка, перчатки, ЭЛ, таблица, клетка, молекула};
})();
