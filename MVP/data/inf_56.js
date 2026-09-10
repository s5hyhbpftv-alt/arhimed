/* ================= ИНФОРМАТИКА С НУЛЯ · 5–6 класс · курс из 14 уроков (id 500–513) · «Азбука информатики Архимеда» ================= */
(function(){
  /* ---------- общий набор ---------- */
  const ink='#eaf2ff', dim='#93a6c8', gold='#ffd76a', grn='#7de0a0', red='#ff9a8a', blu='#6ea8ff', cyan='#7fd6ff', pur='#b07fff',
        bg0='#0d1830', bg1='#080d1c', card='rgba(16,26,46,.96)', cardB='#3a4c78';
  const tx=(x,y,s,c,t,o)=>`<text x="${x}" y="${y}" text-anchor="${(o&&o.an)||'middle'}" font-size="${(t&&(''+t).length<=6?Math.round(s*1.4):((''+t).length>24?Math.max(10,Math.min(s,300/((''+t).length*0.62))):s)).toFixed(1)}" fill="${c||ink}" font-weight="${(o&&o.b)?'bold':'normal'}" font-family="${(o&&o.georgia)?'Georgia,serif':'Arial,Helvetica,sans-serif'}" paint-order="stroke" stroke="#08101f" stroke-width="4">${plain(t)}</text>`;
  /* ---------- акцентный цвет урока ---------- */
  const ACCS=['#7fd6ff','#7de0a0','#6ea8ff','#b07fff','#ffd76a','#ffb066','#5fe0d0','#ff8fd0','#8fb4ff','#9ae86a'];
  function accOf(pre){
    const id=parseInt((''+pre).replace(/[^0-9]/g,''),10);
    return ACCS[(((isFinite(id)?id:500)-500)%ACCS.length+ACCS.length)%ACCS.length];
  }
  /* ---------- emoji → векторные значки ---------- */
  const EMO=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\uFE0F\u20E3]/gu;
  const plain=(t)=>(''+t).replace(EMO,'').replace(/\s+/g,' ').trim();
  const IKEYS=[
    [/зрен|глаз|вид|смотр|наблюд/i,'eye'],
    [/слух|уш[ио]|слыш/i,'ear'],
    [/запах|нос|нюх/i,'nose'],
    [/осяза|рук|палец|трогат|кож/i,'hand'],
    [/вкус|язык|рот/i,'mouth'],
    [/текст|букв|слов|книг|письм|запис/i,'lines'],
    [/числ|цифр|счёт|счет|значен|данн/i,'num'],
    [/картин|рис|изображ|фото|пиксел/i,'pic'],
    [/звук|музык|реч|колонк|микроф|наушник/i,'sound'],
    [/экран|монитор|проектор|телевизор|дисплей/i,'screen'],
    [/клавиат|мышь|камер|принтер|сканер|устройств|компьютер|машин|систем/i,'chip'],
    [/бит|байт|нолик|единичк/i,'bits'],
    [/память|диск|файл|храни|флешк/i,'disk'],
    [/интернет|сеть|сайт|браузер|почт|сервер/i,'net'],
    [/программ|команд|алгоритм|код/i,'code'],
    [/парол|секрет|шифр|ключ/i,'key'],
    [/быстр|скорост|время|секунд/i,'bolt'],
    [/услови|вопрос|если|провер/i,'quest'],
    [/цикл|повтор/i,'loop'],
    [/робот|исполн/i,'robot'],
    [/схем|граф|связ|маршрут|план/i,'net'],
    [/двоичн|разряд|0 и 1|ноль|нул|единиц/i,'bits'],
    [/порядок|шаг|список|номер|строк/i,'lines']
  ];
  const iconKey=(t,k)=>{ for(const r of IKEYS){ if(r[0].test(t)) return r[1]; } return MOT[(((k||0)%MOT.length)+MOT.length)%MOT.length]; };
  function icon(k,cx,cy,c,s){
    s=s||26; const h=s/2, sw=2.2, o='fill="none" stroke="'+c+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-linejoin="round"';
    if(k==='lines') return `<path d="M${cx-h*0.85} ${cy-h*0.55} H${cx+h*0.85} M${cx-h*0.85} ${cy} H${cx+h*0.45} M${cx-h*0.85} ${cy+h*0.55} H${cx+h*0.15}" ${o}/>`;
    if(k==='num') return `<text x="${cx}" y="${cy+h*0.42}" text-anchor="middle" font-size="${(s*0.62).toFixed(1)}" font-family="'Courier New',monospace" font-weight="bold" fill="${c}">123</text><path d="M${cx-h*0.95} ${cy+h*0.85} H${cx+h*0.95}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>`;
    if(k==='pic') return `<rect x="${cx-h}" y="${cy-h*0.78}" width="${s}" height="${h*1.56}" rx="4" ${o}/><circle cx="${cx-h*0.42}" cy="${cy-h*0.3}" r="${h*0.19}" fill="${c}"/><path d="M${cx-h*0.78} ${cy+h*0.6} L${cx-h*0.12} ${cy-h*0.12} L${cx+h*0.35} ${cy+h*0.35} L${cx+h*0.58} ${cy+h*0.08} L${cx+h*0.8} ${cy+h*0.6}" ${o}/>`;
    if(k==='sound') return `<path d="M${cx-h*0.85} ${cy-h*0.28} h${h*0.34} l${h*0.5} -${h*0.55} v${h*1.66} l-${h*0.5} -${h*0.55} h-${h*0.34} z" fill="${c}" opacity=".4" stroke="${c}" stroke-width="1.7" stroke-linejoin="round"/><path d="M${cx+h*0.3} ${cy-h*0.35} a${h*0.5} ${h*0.5} 0 0 1 0 ${h*0.7} M${cx+h*0.66} ${cy-h*0.62} a${h*0.85} ${h*0.85} 0 0 1 0 ${h*1.24}" ${o}/>`;
    if(k==='screen') return `<rect x="${cx-h}" y="${cy-h*0.85}" width="${s}" height="${h*1.3}" rx="4" ${o}/><path d="M${cx-h*0.35} ${cy+h*0.86} h${h*0.7} M${cx} ${cy+h*0.45} v${h*0.41}" ${o}/>`;
    if(k==='eye') return `<path d="M${cx-h} ${cy} q${h} ${-h*0.8} ${s} 0 q-${h} ${h*0.8} -${s} 0 z" ${o}/><circle cx="${cx}" cy="${cy}" r="${h*0.26}" fill="${c}"/>`;
    if(k==='ear') return `<path d="M${cx+h*0.35} ${cy+h*0.9} q-${h*0.5} ${h*0.1} -${h*0.5} -${h*0.4} q0 -${h*0.5} ${h*0.35} -${h*0.55} q${h*0.4} -${h*0.1} ${h*0.4} -${h*0.5} q0 -${h*0.65} -${h*0.6} -${h*0.65} q-${h*0.75} 0 -${h*0.85} ${h*0.75} q-${h*0.08} ${h*0.6} ${h*0.15} ${h*0.95}" ${o}/><path d="M${cx+h*0.1} ${cy+h*0.15} q${h*0.28} ${h*0.2} ${h*0.05} ${h*0.5}" ${o}/>`;
    if(k==='nose') return `<path d="M${cx+h*0.2} ${cy-h*0.9} q-${h*0.15} ${h*1.1} -${h*0.55} ${h*1.3} q-${h*0.35} ${h*0.2} -${h*0.05} ${h*0.42} q${h*0.35} ${h*0.22} ${h*0.85} ${h*0.1}" ${o}/><path d="M${cx-h*0.4} ${cy+h*0.72} q${h*0.22} ${h*0.28} ${h*0.6} ${h*0.18}" ${o}/>`;
    if(k==='mouth') return `<path d="M${cx-h*0.85} ${cy-h*0.25} q${h*0.85} ${h*1.25} ${h*1.7} 0 z" fill="${c}" opacity=".3" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    if(k==='hand') return `<path d="M${cx-h*0.6} ${cy+h*0.6} v-${h*1.1} M${cx-h*0.2} ${cy+h*0.6} v-${h*1.35} M${cx+h*0.2} ${cy+h*0.6} v-${h*1.2} M${cx+h*0.6} ${cy+h*0.6} v-${h*0.8}" ${o}/><path d="M${cx-h*0.6} ${cy+h*0.15} q0 -${h*0.85} ${h*0.6} -${h*0.85} q${h*0.6} 0 ${h*0.6} ${h*0.85}" ${o}/>`;
    if(k==='chip') return motif('chip',cx,cy,s,c);
    if(k==='bulb') return motif('bulb',cx,cy,s,c);
    if(k==='gear') return motif('gear',cx,cy,s,c);
    if(k==='wave') return motif('wave',cx,cy,s,c);
    if(k==='loop') return motif('loop',cx,cy,s,c);
    if(k==='key') return motif('key',cx,cy,s,c);
    if(k==='net') return motif('net',cx,cy,s,c);
    if(k==='bits') return `<rect x="${cx-h*0.9}" y="${cy-h*0.8}" width="${h*0.8}" height="${h*1.6}" rx="3" fill="${c}" opacity=".35" stroke="${c}" stroke-width="${sw}"/><rect x="${cx+h*0.1}" y="${cy-h*0.8}" width="${h*0.8}" height="${h*1.6}" rx="3" ${o}/>`;
    if(k==='disk') return `<rect x="${cx-h*0.9}" y="${cy-h*0.9}" width="${h*1.8}" height="${h*1.8}" rx="4" ${o}/><circle cx="${cx}" cy="${cy}" r="${h*0.42}" ${o}/><circle cx="${cx}" cy="${cy}" r="${h*0.1}" fill="${c}"/>`;
    if(k==='code') return `<path d="M${cx-h*0.5} ${cy-h*0.5} l-${h*0.42} ${h*0.5} l${h*0.42} ${h*0.5} M${cx+h*0.5} ${cy-h*0.5} l${h*0.42} ${h*0.5} l-${h*0.42} ${h*0.5} M${cx+h*0.12} ${cy-h*0.62} l-${h*0.24} ${h*1.24}" ${o}/>`;
    if(k==='bolt') return `<path d="M${cx+h*0.25} ${cy-h*0.95} l-${h*0.85} ${h*1.1} h${h*0.6} l-${h*0.35} ${h*0.8}" fill="${c}" opacity=".35" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round"/>`;
    if(k==='quest') return `<circle cx="${cx}" cy="${cy}" r="${h*0.9}" ${o}/><path d="M${cx-h*0.3} ${cy-h*0.28} q${h*0.3} -${h*0.45} ${h*0.62} -${h*0.05} q-${h*0.05} ${h*0.3} -${h*0.32} ${h*0.45}" ${o}/><circle cx="${cx}" cy="${cy+h*0.55}" r="${h*0.11}" fill="${c}"/>`;
    if(k==='robot') return `<path d="M${cx} ${cy-h*0.95} v-${h*0.25}" ${o}/><circle cx="${cx}" cy="${cy-h*1.28}" r="${h*0.16}" fill="${c}"/><rect x="${cx-h*0.72}" y="${cy-h*0.55}" width="${h*1.44}" height="${h*1.1}" rx="${h*0.3}" ${o}/><circle cx="${cx-h*0.28}" cy="${cy-h*0.02}" r="${h*0.13}" fill="${c}"/><circle cx="${cx+h*0.28}" cy="${cy-h*0.02}" r="${h*0.13}" fill="${c}"/><path d="M${cx-h*0.25} ${cy+h*0.28} h${h*0.5}" ${o}/>`;
    return motif('chip',cx,cy,s,c);
  }
  /* ---------- стили сцен ---------- */
  const css=(pre)=>{
    if(window['__inf_'+pre]) return; window['__inf_'+pre]=1;
    const st=document.createElement('style');
    st.textContent=
      `#lvis .${pre}In{animation:${pre}In .55s cubic-bezier(.2,.85,.3,1.05) both}`
     +`@keyframes ${pre}In{0%{transform:translateY(-14px);opacity:0}100%{transform:none;opacity:1}}`
     +`#lvis .${pre}Pop{animation:${pre}Pop .6s cubic-bezier(.2,.9,.3,1.2) both;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Pop{0%{transform:scale(.25);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}`
     +`#lvis .${pre}Slide{animation:${pre}Slide .8s cubic-bezier(.2,.8,.3,1.15) both}`
     +`@keyframes ${pre}Slide{0%{transform:translateX(-18px);opacity:0}100%{transform:none;opacity:1}}`
     +`#lvis .${pre}Rise{animation:${pre}Rise .85s cubic-bezier(.2,.9,.3,1.1) both}`
     +`@keyframes ${pre}Rise{0%{transform:translateY(18px) scale(.97);opacity:0}100%{transform:none;opacity:1}}`
     +`#lvis .${pre}Blink{animation:${pre}Blink 1.5s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Blink{0%,100%{opacity:.28}50%{opacity:1}}`
     +`#lvis .${pre}Float{animation:${pre}Float 3.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`
     +`#lvis .${pre}Pulse{animation:${pre}Pulse 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}`
     +`#lvis .${pre}Glow{animation:${pre}Glow 2.2s ease-in-out infinite}`
     +`@keyframes ${pre}Glow{0%,100%{opacity:.25}50%{opacity:.9}}`
     +`#lvis .${pre}Dot{animation:${pre}Dot 1.7s linear infinite}`
     +`@keyframes ${pre}Dot{0%{transform:translateX(0);opacity:0}14%{opacity:1}82%{opacity:1}100%{transform:translateX(var(--run,64px));opacity:0}}`
     +`#lvis .${pre}Dash{stroke-dasharray:7 8;animation:${pre}Dash 1.1s linear infinite}`
     +`@keyframes ${pre}Dash{to{stroke-dashoffset:-30}}`
     +`#lvis .${pre}Spot{animation:${pre}Spot 2.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Spot{0%,100%{opacity:.2}38%,62%{opacity:1}}`
     +`#lvis .${pre}Shine{animation:${pre}Shine 3.8s ease-in-out infinite;transform-box:fill-box}`
     +`@keyframes ${pre}Shine{0%{transform:translateX(-90px);opacity:0}25%{opacity:.35}60%{opacity:0}100%{transform:translateX(120px);opacity:0}}`
     +`#lvis .${pre}Spin{animation:${pre}Spin 8s linear infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Spin{to{transform:rotate(360deg)}}`
     +`#lvis .${pre}Caret{animation:${pre}Caret .95s steps(1) infinite}`
     +`@keyframes ${pre}Caret{0%,49%{opacity:1}50%,100%{opacity:0}}`
     +`#lvis .${pre}Bob{animation:${pre}Bob 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`
     +`#lvis .${pre}Scan{animation:${pre}Scan 3.6s ease-in-out infinite}`
     +`@keyframes ${pre}Scan{0%{transform:translateY(0);opacity:0}12%{opacity:.7}88%{opacity:.7}100%{transform:translateY(var(--scan,120px));opacity:0}}`
     +`#lvis .${pre}Twinkle{animation:${pre}Twinkle 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
     +`@keyframes ${pre}Twinkle{0%,100%{transform:scale(.86);opacity:.5}50%{transform:scale(1.08);opacity:1}}`;
    document.head.appendChild(st);
  };
  /* ---------- рамка сцены с фоном и «атмосферой» ---------- */
  function arh(W,H,inner,pre){
    const p=pre||'ix500', A=accOf(p);
    let sd=((W*7919+H*104729+(''+p).length*31)%9973)+7;
    const rnd=()=>{ sd=(sd*1103515245+12345)%2147483648; return sd/2147483648; };
    let amb='';
    for(let i=0;i<12;i++){
      const x=(14+rnd()*(W-28)).toFixed(0), y=(16+rnd()*(H-32)).toFixed(0), r=(0.9+rnd()*1.7).toFixed(1),
            d=(rnd()*3).toFixed(1), du=(2.6+rnd()*2.6).toFixed(1);
      amb+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${A}"><animate attributeName="opacity" values="0.10;0.55;0.10" dur="${du}s" begin="${d}s" repeatCount="indefinite"/></circle>`;
    }
    for(let i=0;i<5;i++){
      const x=(28+rnd()*(W-56)).toFixed(0), y=(42+rnd()*(H-80)).toFixed(0), g=rnd()<.5?'0':'1',
            d=(rnd()*3).toFixed(1), du=(4+rnd()*3).toFixed(1);
      amb+=`<text x="${x}" y="${y}" fill="${A}" opacity=".15" font-size="13" font-family="'Courier New',monospace" text-anchor="middle">${g}<animateTransform attributeName="transform" type="translate" values="0 0;0 -11;0 0" dur="${du}s" begin="${d}s" repeatCount="indefinite"/></text>`;
    }
    return `<svg viewBox="0 0 ${W} ${H}" style="display:block;width:100%;height:auto">
      <defs>
        <linearGradient id="${p}bg" x1="0" y1="0" x2="0.25" y2="1"><stop offset="0" stop-color="#122043"/><stop offset=".55" stop-color="#0a1329"/><stop offset="1" stop-color="#060a16"/></linearGradient>
        <radialGradient id="${p}halo" cx="0.5" cy="0.08" r="0.95"><stop offset="0" stop-color="${A}" stop-opacity=".26"/><stop offset="1" stop-color="${A}" stop-opacity="0"/></radialGradient>
        <linearGradient id="${p}card" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2748"/><stop offset="1" stop-color="#0e1830"/></linearGradient>
        <linearGradient id="${p}bar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${A}" stop-opacity=".95"/><stop offset="1" stop-color="${A}" stop-opacity=".25"/></linearGradient>
        <filter id="${p}sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#000" flood-opacity=".55"/></filter>
        <pattern id="${p}gr" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0 L0 0 L0 26" fill="none" stroke="#2a3a68" stroke-width="1"/></pattern>
        <clipPath id="${p}clip"><rect x="9" y="9" width="${W-18}" height="${H-18}" rx="9"/></clipPath>
        <linearGradient id="${p}fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1329"/><stop offset=".22" stop-color="#0a1329" stop-opacity="0"/><stop offset=".78" stop-color="#0a1329" stop-opacity="0"/><stop offset="1" stop-color="#0a1329"/></linearGradient>
      </defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#${p}bg)"/>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#${p}halo)"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" rx="8" fill="url(#${p}gr)" opacity=".30"/>
      <g opacity=".9">${amb}</g>
      <rect x="7" y="7" width="${W-14}" height="${H-14}" rx="11" fill="none" stroke="#3d5490" stroke-width="2.4"/>
      <rect x="12" y="12" width="${W-24}" height="${H-24}" rx="7" fill="none" stroke="#22304f" stroke-width="1"/>
      <g stroke="${A}" stroke-width="2.6" fill="none" opacity=".85">
        <path d="M17 30 v-8 h8"/><path d="M${W-17} 30 v-8 h-8"/>
        <path d="M17 ${H-30} v8 h8"/><path d="M${W-17} ${H-30} v8 h-8"/>
      </g>
      <g clip-path="url(#${p}clip)">${inner}</g>
    </svg>`;
  }
  const chip=(t,c,cls)=>`<span class="${cls}In" style="display:inline-block;padding:6px 14px;border-radius:12px;border:2.2px solid ${c};background:${card};font-family:Georgia,serif;font-size:21px;color:${c};font-weight:bold">${t}</span>`;
  /* ---------- векторные «значки-мотивы» ---------- */
  const MOT=['chip','gear','bulb','screen','loop','key','net','wave'];
  function motif(k,cx,cy,s,c,cls){
    const h=s/2; let g='';
    if(k==='chip'){
      for(let i=-1;i<=1;i++) g+=`<line x1="${cx-h-6}" y1="${cy+i*s/4}" x2="${cx-h}" y2="${cy+i*s/4}" stroke="${c}" stroke-width="2"/><line x1="${cx+h}" y1="${cy+i*s/4}" x2="${cx+h+6}" y2="${cy+i*s/4}" stroke="${c}" stroke-width="2"/>`;
      g+=`<rect x="${cx-h}" y="${cy-h}" width="${s}" height="${s}" rx="${(s*0.18).toFixed(1)}" fill="none" stroke="${c}" stroke-width="2.4"/><rect x="${cx-s*0.22}" y="${cy-s*0.22}" width="${s*0.44}" height="${s*0.44}" rx="4" fill="${c}" opacity=".3" stroke="${c}" stroke-width="1.6"/>`;
    } else if(k==='gear'){
      g+=`<circle cx="${cx}" cy="${cy}" r="${h*0.62}" fill="none" stroke="${c}" stroke-width="2.4"/>`;
      for(let i=0;i<8;i++){ const a=i*Math.PI/4;
        g+=`<line x1="${(cx+Math.cos(a)*h*0.62).toFixed(1)}" y1="${(cy+Math.sin(a)*h*0.62).toFixed(1)}" x2="${(cx+Math.cos(a)*h).toFixed(1)}" y2="${(cy+Math.sin(a)*h).toFixed(1)}" stroke="${c}" stroke-width="4"/>`; }
      g+=`<circle cx="${cx}" cy="${cy}" r="${h*0.22}" fill="${c}" opacity=".5"/>`;
    } else if(k==='bulb'){
      g+=`<circle cx="${cx}" cy="${cy-h*0.18}" r="${h*0.56}" fill="none" stroke="${c}" stroke-width="2.6"/><rect x="${cx-h*0.26}" y="${cy+h*0.36}" width="${h*0.52}" height="${h*0.44}" rx="3" fill="none" stroke="${c}" stroke-width="2.2"/>`;
      for(let i=0;i<6;i++){ const a=Math.PI*(0.12+i*0.15);
        g+=`<line x1="${(cx+Math.cos(a)*h*0.78).toFixed(1)}" y1="${(cy-h*0.18-Math.sin(a)*h*0.78).toFixed(1)}" x2="${(cx+Math.cos(a)*h*1.06).toFixed(1)}" y2="${(cy-h*0.18-Math.sin(a)*h*1.06).toFixed(1)}" stroke="${c}" stroke-width="2" opacity=".8"/>`; }
    } else if(k==='screen'){
      g+=`<rect x="${cx-h}" y="${cy-h*0.82}" width="${s}" height="${s*0.7}" rx="6" fill="none" stroke="${c}" stroke-width="2.4"/><path d="M${cx-h*0.34} ${cy+h*0.6} h${h*0.68} M${cx} ${cy-h*0.12} v${h*0.72}" stroke="${c}" stroke-width="2.2"/>`;
    } else if(k==='loop'){
      g+=`<path d="M${cx-h*0.72} ${cy} a${h*0.72} ${h*0.72} 0 1 1 ${h*1.44} 0" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M${cx+h*0.72} ${cy} a${h*0.72} ${h*0.72} 0 1 1 -${h*1.44} 0" fill="none" stroke="${c}" stroke-width="2.6" opacity=".5"/>`;
    } else if(k==='key'){
      g+=`<circle cx="${cx-h*0.45}" cy="${cy}" r="${h*0.42}" fill="none" stroke="${c}" stroke-width="2.6"/><path d="M${cx-h*0.08} ${cy} h${h*0.95} M${cx+h*0.55} ${cy} v${h*0.36} M${cx+h*0.86} ${cy} v${h*0.3}" stroke="${c}" stroke-width="2.4"/>`;
    } else if(k==='net'){
      const q=[[-0.82,-0.5],[0.86,-0.6],[0.05,-0.95],[0,0.12],[-0.72,0.8],[0.78,0.76]];
      g+=`<path d="M${cx+q[0][0]*h} ${cy+q[0][1]*h} L${cx+q[3][0]*h} ${cy+q[3][1]*h} L${cx+q[1][0]*h} ${cy+q[1][1]*h} M${cx+q[3][0]*h} ${cy+q[3][1]*h} L${cx+q[4][0]*h} ${cy+q[4][1]*h} M${cx+q[3][0]*h} ${cy+q[3][1]*h} L${cx+q[5][0]*h} ${cy+q[5][1]*h} M${cx+q[3][0]*h} ${cy+q[3][1]*h} L${cx+q[2][0]*h} ${cy+q[2][1]*h}" stroke="${c}" stroke-width="2.2" fill="none"/>`;
      q.forEach(z=>{ g+=`<circle cx="${(cx+z[0]*h).toFixed(1)}" cy="${(cy+z[1]*h).toFixed(1)}" r="4.2" fill="${c}"/>`; });
    } else if(k==='wave'){
      g+=`<path d="M${cx-h} ${cy} q${h*0.25} ${-h*0.55} ${h*0.5} 0 t${h*0.5} 0 t${h*0.5} 0 t${h*0.5} 0" fill="none" stroke="${c}" stroke-width="2.6"/>`;
    }
    return `<g class="${cls||''}">${g}</g>`;
  }
  function flagAt(cx,cy,s,c,cls){
    return `<g class="${cls||''}"><path d="M${cx} ${cy+s*0.6} v${-s}" stroke="#cfe3ff" stroke-width="2.2"/><path d="M${cx} ${cy-s*0.4} l${s*0.62} ${s*0.22} l-${s*0.62} ${s*0.22} z" fill="${c}" stroke="${c}" stroke-width="1.2"/></g>`;
  }

  /* ---------- визуализации (kind) ---------- */
  function viz(v,pre,i,st,lk){
    const K=v.kind, A=accOf(pre), CW=318, H=vizH(v), MOTIF=MOT[((i||0)+(''+pre).length)%MOT.length];
    if(K==='cards'){ /* карточки */
      const it=v.items||[], ch=58, cw=138, gx=12, gy=10, rows=Math.ceil(it.length/2);
      const tot=rows*ch+(rows-1)*gy, y0=Math.max(20,Math.round((H-tot)/2));
      let s='';
      it.forEach((c,k)=>{
        const x=24+(k%2)*(cw+gx), y=y0+Math.floor(k/2)*(ch+gy), col=c.c||A;
        const title=plain(c.t), cx=x+30, cy=y+ch/2, tx0=x+cw/2+17;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="12" fill="url(#${pre}card)" stroke="${col}" stroke-width="2"/>`
          +`<rect x="${x+1}" y="${y+1}" width="${cw-2}" height="3" rx="1.5" fill="${col}" opacity=".85"/>`
          +`<path d="M${x+64} ${y+ch-4} L${x+92} ${y+4} L${x+104} ${y+4} L${x+76} ${y+ch-4} z" fill="#fff" opacity=".04"/>`
          +`<circle cx="${cx}" cy="${cy}" r="16" fill="${col}" opacity=".13" stroke="${col}" stroke-opacity=".55" stroke-width="1.4"/>`
          +`<g class="${pre}Float" style="animation-delay:${(0.2*k).toFixed(2)}s">${icon(iconKey(title,k),cx,cy,col,24)}</g>`
          +`${tx(tx0,y+26,Math.min(13.5,84/Math.max(1,title.length)/0.6),col,title,{b:1})}`
          +(c.d?tx(tx0,y+46,Math.min(11.5,86/Math.max(1,(''+c.d).length)/0.56),dim,c.d,{}):'')
          +`</g>`;
      });
      return s;
    }
    if(K==='ipo'){ /* ввод → обработка → вывод */
      const y=46, bw=88, bh=64;
      const blk=(x,c,tt,s2,gl)=>`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="12" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
        +(gl?`<rect class="${pre}Glow" x="${x-4}" y="${y-4}" width="${bw+8}" height="${bh+8}" rx="15" fill="none" stroke="${c}" stroke-width="2.4" opacity=".45"/>`:'')
        +`${tx(x+bw/2,y+30,Math.min(13,70/Math.max(1,tt.length)/0.62),c,tt,{b:1})}${tx(x+bw/2,y+50,Math.min(10,76/Math.max(1,(''+s2).length)/0.6),dim,s2||'',{})}</g>`;
      let s=blk(14,cyan,'ВВОД','клавиатура')+blk(115,gold,'ОБРАБОТКА','программа',1)+blk(216,grn,'ВЫВОД','экран');
      const conn=(x1,x2)=>{ const d=x2-x1-4;
        return `<path d="M${x1} ${y+bh/2} H${x2}" stroke="${A}" stroke-width="2" opacity=".55" fill="none"/>`
          +`<circle cx="${x1}" cy="${y+bh/2}" r="3.4" fill="${A}" style="--run:${d}px" class="${pre}Dot"/>`
          +`<path d="M${x2-6} ${y+bh/2-4} l6 4 l-6 4" fill="none" stroke="${A}" stroke-width="2"/>`; };
      s+=conn(104,113)+conn(205,214);
      s+=`${tx(56,y+bh+20,10.5,dim,'вводим данные',{})}${tx(159,y+bh+20,10.5,dim,'компьютер думает',{})}${tx(258,y+bh+20,10.5,dim,'видим результат',{})}`;
      s+=`<path d="M120 ${y+bh-4} L146 ${y+4} L158 ${y+4} L132 ${y+bh-4} z" fill="#fff" opacity=".05"/>`;
      return s;
    }
    if(K==='bits'){ /* биты-выключатели */
      const n=v.bits.length, bw=n<=4?46:(n<=6?38:32), gp=n<=4?14:8;
      const tot=n*bw+(n-1)*gp, x0=Math.round((CW-tot)/2), by=44, bh=62, busY=by+bh+12;
      let s=`<rect x="18" y="${busY}" width="${CW-36}" height="6" rx="3" fill="url(#${pre}bar)" opacity=".5"/>`;
      v.bits.forEach((b,k)=>{
        const x=x0+k*(bw+gp), col=b?grn:'#8ea3c8';
        s+=`<line x1="${x+bw/2}" y1="${by+bh+2}" x2="${x+bw/2}" y2="${busY+1}" stroke="${b?grn:'#3a4c78'}" stroke-width="2"/>`
          +`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${x}" y="${by}" width="${bw}" height="${bh}" rx="11" fill="${b?'rgba(125,224,160,.13)':'rgba(255,255,255,.045)'}" stroke="${b?grn:cardB}" stroke-width="2.2"/>`
          +(b?`<rect class="${pre}Glow" x="${x-3}" y="${by-3}" width="${bw+6}" height="${bh+6}" rx="13" fill="none" stroke="${grn}" stroke-width="2.2" opacity=".4"/>`:'')
          +`<circle cx="${x+bw/2}" cy="${by+bh-9}" r="3" fill="${b?grn:'#465878'}"/>`
          +`${tx(x+bw/2,by+34,n<=4?28:23,b?grn:col,''+b,{b:1,georgia:1})}`
          +`${tx(x+bw/2,by+bh+30,10.5,dim,b?'вкл':'выкл',{})}</g>`;
      });
      return s;
    }
    if(K==='binary'){ /* разряды двоичного числа */
      const pw=v.powers||[], b=v.bits||[], n=pw.length, bw=n<=3?48:44, gp=6;
      const tot=n*bw+(n-1)*gp, x0=Math.round((CW-tot)/2);
      const expr=b.map((x,k)=>x?pw[k]:0).filter(Boolean).join(' + ');
      const val=pw.reduce((a,p,k)=>a+(b[k]?p:0),0);
      const sum=(expr? expr+' = ' : 'единиц нет · ')+val;
      let s='';
      pw.forEach((p,k)=>{
        const x=x0+k*(bw+gp), on=!!b[k];
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.07*k).toFixed(2)}s">`
          +`<rect x="${x}" y="28" width="${bw}" height="26" rx="7" fill="rgba(110,168,255,.12)" stroke="${blu}" stroke-width="1.6"/>${tx(x+bw/2,47,13,blu,''+p,{b:1})}`
          +`<rect x="${x}" y="60" width="${bw}" height="42" rx="8" fill="${on?'rgba(125,224,160,.16)':'rgba(255,255,255,.04)'}" stroke="${on?grn:cardB}" stroke-width="2"/>`
          +(on?`<rect class="${pre}Glow" x="${x-3}" y="57" width="${bw+6}" height="48" rx="11" fill="none" stroke="${grn}" stroke-width="2.2" opacity=".4"/>`:'')
          +`${tx(x+bw/2,90,22,on?grn:'#7f92b6',''+b[k],{b:1,georgia:1})}`
          +(on?`<path d="M${x+bw/2} 104 v10" stroke="${grn}" stroke-width="2" class="${pre}Dash"/>`:`<path d="M${x+bw/2} 104 v10" stroke="#33456e" stroke-width="1.6"/>`)
          +`</g>`;
      });
      s+=`<rect x="22" y="118" width="274" height="32" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8" filter="url(#${pre}sh)"/>`
        +`${tx(159,139,13.5,ink,sum,{b:1})}`;
      return s;
    }
    if(K==='codes'){ /* таблица код-буква */
      const pr=v.pairs||[], n=pr.length, cw=n<=3?76:(n<=4?62:52), gp=n<=3?14:8;
      const tot=n*cw+(n-1)*gp, x0=Math.round((CW-tot)/2), y=52;
      let s=`<g opacity=".12" class="${pre}Float">${motif('key',159,120,150,A)}</g>`;
      pr.forEach((c,k)=>{
        const x=x0+k*(cw+gp);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${x}" y="${y}" width="${cw}" height="56" rx="11" fill="url(#${pre}card)" stroke="${pur}" stroke-width="2"/>`
          +`<rect x="${x+1}" y="${y+1}" width="${cw-2}" height="3" rx="1.5" fill="${pur}" opacity=".8"/>`
          +`${tx(x+cw/2,y+28,23,ink,c[0],{b:1,georgia:1})}`
          +`<rect x="${x+6}" y="${y+38}" width="${cw-12}" height="15" rx="6" fill="${pur}" opacity=".18"/>`
          +`${tx(x+cw/2,y+50,11.5,pur,c[1],{b:1})}</g>`;
      });
      s+=`<path d="M ${x0} ${y+72} H ${x0+tot}" stroke="${A}" stroke-width="2" opacity=".45" class="${pre}Dash"/>`;
      s+=`${tx(159,y+88,11.5,dim,v.note||'буква → её код',{})}`;
      return s;
    }
    if(K==='steps'){ /* шаги алгоритма */
      const st=v.steps||[], n=st.length, rh=28, gp=6, tot=n*rh+(n-1)*gp;
      const y0=Math.max(26,Math.round((H-tot)/2));
      let s=`<line x1="44" y1="${y0+8}" x2="44" y2="${y0+tot-8}" stroke="${A}" stroke-width="2" opacity=".3" class="${pre}Dash"/>`;
      st.forEach((t,k)=>{
        const y=y0+k*(rh+gp), d=(k*0.5).toFixed(2), du=(n*0.5+1).toFixed(2);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.08*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="30" y="${y}" width="266" height="${rh}" rx="8" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".38" stroke-width="1.4"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="30" y="${y}" width="266" height="${rh}" rx="8" fill="${A}" opacity=".14"/>`
          +`<circle cx="44" cy="${y+rh/2}" r="10" fill="rgba(255,215,106,.16)" stroke="${gold}" stroke-width="1.6"/>${tx(44,y+rh/2+4,11,gold,''+(k+1),{b:1})}`
          +`${tx(163,y+rh/2+4.5,12.5,ink,t,{})}</g>`;
      });
      return s;
    }
    if(K==='robot'){ /* робот на клетчатом поле */
      const n=6, cell=34, x0=Math.round((CW-n*cell)/2), y0=40;
      let s='';
      s+=`<rect x="${x0-6}" y="${y0-6}" width="${n*cell+12}" height="${n*cell+12}" rx="10" fill="rgba(126,168,255,.06)" stroke="${A}" stroke-opacity=".35" stroke-width="1.6"/>`;
      for(let r=0;r<n;r++)for(let c=0;c<n;c++){
        s+=`<rect x="${x0+c*cell}" y="${y0+r*cell}" width="${cell}" height="${cell}" fill="${((r+c)%2)?'rgba(255,255,255,.055)':'rgba(255,255,255,.022)'}" stroke="#31456f" stroke-width="1"/>`;
      }
      (v.walls||[]).forEach(w=>{
        const x=x0+w[0]*cell, y=y0+w[1]*cell;
        s+=`<g class="${pre}Pop"><rect x="${x+1.5}" y="${y+1.5}" width="${cell-3}" height="${cell-3}" rx="4" fill="rgba(110,168,255,.3)" stroke="${blu}" stroke-width="1.5"/>`
          +`<path d="M${x+7} ${y+cell-7} L${x+cell-7} ${y+7}" stroke="${blu}" stroke-width="1.4" opacity=".75"/></g>`;
      });
      const path=(v.path||[]);
      if(path.length>1){
        let d='M'+path.map(q=>`${(x0+q[0]*cell+cell/2).toFixed(1)} ${(y0+q[1]*cell+cell/2).toFixed(1)}`).join(' L');
        s+=`<path d="${d}" fill="none" stroke="${A}" stroke-width="2.6" opacity=".8" class="${pre}Dash"/>`;
        const g=path[path.length-1];
        const wallAhead=(v.walls||[]).some(w=>Math.abs(w[0]-g[0])+Math.abs(w[1]-g[1])===1);
        if(!wallAhead) s+=flagAt(x0+g[0]*cell+cell/2+8, y0+g[1]*cell+cell/2-6, 16, '#ff9a6a', pre+'Pulse');
      }
      const rx=x0+v.pos[0]*cell+cell/2, ry=y0+v.pos[1]*cell+cell/2;
      s+=`<g class="${pre}Float" filter="url(#${pre}sh)">`
        +`<path d="M${rx} ${ry-19} v-7" stroke="${gold}" stroke-width="2"/><circle class="${pre}Blink" cx="${rx}" cy="${ry-30}" r="3.6" fill="${gold}"/>`
        +`<rect x="${rx-13}" y="${ry-19}" width="26" height="20" rx="7" fill="#ffd76a" stroke="#fffdf2" stroke-width="1.6"/>`
        +`<circle cx="${rx-5}" cy="${ry-10}" r="3" fill="#1a2340"/><circle cx="${rx+5}" cy="${ry-10}" r="3" fill="#1a2340"/>`
        +`<rect x="${rx-11}" y="${ry+4}" width="22" height="12" rx="4" fill="#e8b84e" stroke="#fffdf2" stroke-width="1.2"/>`
        +`<circle class="${pre}Spin" cx="${rx-7}" cy="${ry+18}" r="4.2" fill="#9fb2d6" stroke="#1a2340" stroke-width="1"/><circle class="${pre}Spin" cx="${rx+7}" cy="${ry+18}" r="4.2" fill="#9fb2d6" stroke="#1a2340" stroke-width="1"/>`
        +`</g>`;
      for(let c=0;c<n;c++) s+=tx(x0+c*cell+cell/2, y0+n*cell+16, 10, dim, ''+c, {});
      for(let r=0;r<n;r++) s+=tx(x0-13, y0+r*cell+cell/2+3.5, 10, dim, ''+r, {});
      return s;
    }
    if(K==='loop'){ /* цикл */
      const n=v.n||4, cxx=150, cyy=92, R=50;
      let s=`<g opacity=".12" class="${pre}Float">${motif('loop',cxx,cyy,R*2.1,A)}</g>`;
      s+=`<circle cx="${cxx}" cy="${cyy}" r="${R}" fill="none" stroke="${A}" stroke-width="3" stroke-dasharray="${(2*Math.PI*R-34).toFixed(0)} 34" opacity=".6"/>`;
      for(let k=0;k<n;k++){
        const a=(-Math.PI/2)+(k/n)*2*Math.PI, px=cxx+Math.cos(a)*R, py=cyy+Math.sin(a)*R;
        s+=`<circle class="${pre}Spot" style="animation-delay:${(k*0.32).toFixed(2)}s;animation-duration:${(n*0.32+0.6).toFixed(2)}s" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="6" fill="${gold}" stroke="#0b1224" stroke-width="1.6"/>`;
      }
      s+=`<circle r="5" fill="${A}"><animateMotion dur="2.2s" repeatCount="indefinite" path="M ${cxx} ${cyy-R} A ${R} ${R} 0 1 1 ${cxx-0.1} ${cyy-R}"/></circle>`;
      s+=`<circle cx="${cxx}" cy="${cyy}" r="26" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2" filter="url(#${pre}sh)"/>${tx(cxx,cyy+7,17,gold,''+n,{b:1,georgia:1})}`;
      s+=`<rect x="22" y="${cyy+R+18}" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6" filter="url(#${pre}sh)"/>`
        +`${tx(159,cyy+R+38,12,ink,'повтори '+n+' раз: '+(v.body||'действие'),{})}`;
      return s;
    }
    if(K==='cond'){ /* условие ЕСЛИ…ТО… */
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><path d="M159 34 l 80 34 l -80 34 l -80 -34 z" fill="rgba(176,127,255,.14)" stroke="${pur}" stroke-width="2.4"/>`
        +`<path class="${pre}Glow" d="M159 30 l84 38 l-84 38 l-84 -38 z" fill="none" stroke="${pur}" stroke-width="2" opacity=".35"/>`
        +`${tx(159,73,14,pur,v.q,{b:1})}</g>`;
      s+=`<path d="M159 102 v14" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M155 111 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<circle cx="159" cy="104" r="3.6" fill="${A}" style="--run:14px" class="${pre}Dot"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.25s" filter="url(#${pre}sh)">`
        +`<rect x="34" y="126" width="196" height="40" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>`
        +`<rect class="${pre}Glow" x="32" y="124" width="200" height="44" rx="13" fill="none" stroke="${grn}" stroke-width="2" opacity=".3"/>`
        +`<circle cx="56" cy="146" r="10" fill="rgba(125,224,160,.18)" stroke="${grn}" stroke-width="1.6"/>${tx(56,150,10.5,grn,'да',{b:1})}`
        +`${tx(150,150,13,grn,v.then,{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.42s"><rect x="240" y="126" width="62" height="40" rx="10" fill="rgba(255,255,255,.03)" stroke="${cardB}" stroke-width="1.6" stroke-dasharray="5 4"/>`
        +`<circle cx="256" cy="146" r="10" fill="rgba(255,255,255,.05)" stroke="${cardB}" stroke-width="1.4"/>${tx(256,150,10,'#9fb0cf','нет',{b:1})}`
        +`${tx(283,150,10.5,'#8296b8','—',{})}</g>`;
      s+=`${tx(159,186,11,dim,'если да — выполняем, если нет — пропускаем',{})}`;
      return s;
    }
    if(K==='flow'){ /* блок-схема */
      const sh=v.shapes||[], lone=(sh.length===1), rh=32, gp=16, tot=sh.length*rh+(sh.length-1)*gp;
      const y0=lone?32:Math.max(24,Math.round((H-tot)/2));
      let s='';
      sh.forEach((x,k)=>{
        const y=y0+k*(rh+gp), c=x.c||A, d=(k*0.45).toFixed(2), du=(sh.length*0.45+1).toFixed(2);
        const shape=x.k==='o'
          ? `<ellipse cx="159" cy="${y+rh/2}" rx="84" ry="${rh/2}" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
          : x.k==='d'
          ? `<path d="M159 ${y} l 84 ${rh/2} l -84 ${rh/2} l -84 -${rh/2} z" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
          : `<rect x="75" y="${y}" width="168" height="${rh}" rx="9" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s" filter="url(#${pre}sh)">${shape}`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="70" y="${y-3}" width="7" height="${rh+6}" rx="3.5" fill="${c}"/>`
          +`${tx(159,y+rh/2+4.5,12.5,c,x.t,{b:1})}</g>`;
        if(k<sh.length-1) s+=`<path d="M159 ${y+rh+2} V${y+rh+gp-2}" stroke="${A}" stroke-width="2" opacity=".7" class="${pre}Dash"/><path d="M155 ${y+rh+gp-7} l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
      });
      if(lone){ /* из чего состоит блок-схема — мини-легенда */
        const ly=H-64;
        s+=`<rect x="16" y="${ly-16}" width="286" height="62" rx="12" fill="rgba(255,255,255,.035)" stroke="${A}" stroke-opacity=".25"/>`;
        [{k:'o',x:64,t:'начало/конец',c:grn},{k:'r',x:159,t:'действие',c:blu},{k:'d',x:254,t:'условие',c:pur}].forEach(it=>{
          const on=(it.k===sh[0].k), col=on?it.c:'#5f78a8';
          const shape=it.k==='o'?`<ellipse cx="${it.x}" cy="${ly+6}" rx="25" ry="11" fill="none" stroke="${col}" stroke-width="${on?2.4:1.6}"/>`
            : it.k==='r'?`<rect x="${it.x-25}" y="${ly-6}" width="50" height="24" rx="6" fill="none" stroke="${col}" stroke-width="${on?2.4:1.6}"/>`
            : `<path d="M${it.x} ${ly-8} l25 14 l-25 14 l-25 -14 z" fill="none" stroke="${col}" stroke-width="${on?2.4:1.6}"/>`;
          s+=`<g opacity="${on?1:.5}" class="${on?pre+'Pulse':''}">${shape}${tx(it.x,ly+34,10.5,col,it.t,{})}</g>`;
        });
      }
      return s;
    }
    if(K==='code'){ /* окно программы */
      const ln=v.lines||[], lh=24, hh=42+ln.length*lh+10;
      let s=`<g filter="url(#${pre}sh)"><rect x="20" y="20" width="278" height="${hh}" rx="12" fill="rgba(8,14,30,.94)" stroke="${A}" stroke-opacity=".5" stroke-width="1.6"/>`
        +`<path d="M20 46 h278" stroke="${A}" stroke-opacity=".22"/>`
        +`<circle cx="34" cy="33" r="4" fill="#ff6b6b" opacity=".85"/><circle cx="48" cy="33" r="4" fill="${gold}" opacity=".85"/><circle cx="62" cy="33" r="4" fill="${grn}" opacity=".85"/>`
        +`${tx(170,37,10.5,dim,v.title||'программа',{})}</g>`;
      ln.forEach((L,k)=>{
        const y=48+k*lh, ind=L.i?20:0, ch=(''+L.t).length;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="26" y="${y}" width="266" height="${lh-2}" rx="5" fill="rgba(255,255,255,${k%2?'.022':'.04'})"/>`
          +`${tx(38,y+15,10,'#5a6d96',''+(k+1),{})}`
          +`<text x="${54+ind}" y="${y+16}" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${L.c||cyan}">${L.t}</text>`
          +(k===ln.length-1?`<rect class="${pre}Caret" x="${(54+ind+ch*7.85).toFixed(1)}" y="${y+4}" width="7" height="14" fill="${A}"/>`:'')
          +`</g>`;
      });
      return s;
    }
    if(K==='machine'){ /* настоящий компьютер: монитор, системный блок, клавиатура */
      let s='';
      // системный блок
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="20" y="40" width="50" height="120" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".7" stroke-width="1.8"/>`
        +`<rect x="28" y="50" width="34" height="10" rx="3" fill="rgba(255,255,255,.06)"/><rect x="28" y="66" width="34" height="10" rx="3" fill="rgba(255,255,255,.06)"/>`
        +`<circle class="${pre}Blink" cx="45" cy="98" r="12" fill="none" stroke="${A}" stroke-width="1.4" opacity=".5"/>`
        +`<g class="${pre}Spin">${[0,60,120,180,240,300].map(a=>`<path d="M45 98 l${(Math.cos(a*Math.PI/180)*11).toFixed(1)} ${(Math.sin(a*Math.PI/180)*11).toFixed(1)}" stroke="${A}" stroke-width="2.4" opacity=".8"/>`).join('')}</g>`
        +`<circle class="${pre}Blink" cx="31" cy="130" r="3.2" fill="${grn}"/><circle class="${pre}Twinkle" cx="31" cy="142" r="3.2" fill="${gold}"/>`
        +`<rect x="28" y="150" width="34" height="3" rx="1.5" fill="${A}" opacity=".4"/></g>`;
      // монитор
      s+=`<g class="${pre}Pop" style="animation-delay:.12s" filter="url(#${pre}sh)"><rect x="82" y="30" width="162" height="106" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".7" stroke-width="1.8"/>`
        +`<rect x="90" y="38" width="146" height="88" rx="6" fill="#0a1730" stroke="${A}" stroke-opacity=".35"/>`
        +`<rect x="152" y="136" width="22" height="10" fill="#16223f"/><rect x="126" y="146" width="74" height="7" rx="3.5" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".5"/></g>`;
      // «код» на экране
      const lines=[[100,44],[86,120],[94,70],[72,110],[104,52]];
      lines.forEach((w,k)=>{
        s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 0" dur="1s"/>`
          +`<rect x="100" y="${47+k*17}" width="${w[0]}" height="6" rx="3" fill="${k%2?A:grn}" opacity=".55"><animate attributeName="opacity" values="0.2;0.75;0.2" dur="${(2.2+k*0.35).toFixed(2)}s" begin="${(k*0.3).toFixed(2)}s" repeatCount="indefinite"/></rect>`
          +`</g>`;
      });
      s+=`<rect class="${pre}Caret" x="102" y="${47+5*17}" width="7" height="7" rx="1.5" fill="${A}"/>`;
      // клавиатура
      s+=`<g class="${pre}Pop" style="animation-delay:.24s" filter="url(#${pre}sh)"><rect x="86" y="170" width="150" height="34" rx="7" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".6" stroke-width="1.6"/>`;
      for(let r=0;r<3;r++)for(let c=0;c<9;c++){
        const kx=92+c*16, ky=175+r*9.5, dl=((r*9+c)%7*0.28).toFixed(2);
        s+=`<rect x="${kx}" y="${ky}" width="13" height="7" rx="2" fill="rgba(255,255,255,.12)"><animate attributeName="fill" values="rgba(255,255,255,.12);${A};rgba(255,255,255,.12)" dur="3.4s" begin="${dl}s" repeatCount="indefinite"/></rect>`;
      }
      s+=`</g>`;
      // мышь
      s+=`<g class="${pre}Pop" style="animation-delay:.3s" filter="url(#${pre}sh)"><rect x="246" y="170" width="28" height="42" rx="13" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".6" stroke-width="1.6"/><path d="M260 176 v10" stroke="${A}" stroke-width="2"/></g>`;
      // кабели с «током»
      s+=`<path d="M70 130 C 76 150, 90 152, 130 150" fill="none" stroke="${A}" stroke-width="1.8" opacity=".45" class="${pre}Dash"/>`
        +`<path d="M70 60 C 76 44, 78 40, 82 40" fill="none" stroke="${A}" stroke-width="1.8" opacity=".45"/>`
        +`<circle cx="70" cy="130" r="3" fill="${A}"><animate attributeName="cx" values="70;130" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite"/></circle>`;
      return s;
    }
    if(K==='rain'){ /* поток данных: бегущие 0 и 1 */
      const cols=7, cw=(CW-40)/cols, y0=22, rows=6, rh=22;
      let s='';
      for(let c=0;c<cols;c++){
        const x=(20+cw*c+cw/2).toFixed(1);
        for(let k=0;k<rows;k++){
          const ch=((c+k)%2)?'1':'0', dur=(rows*0.34).toFixed(2), beg=(c*0.28+k*0.34).toFixed(2);
          s+=`<text x="${x}" y="${y0+k*rh}" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="#5f78a8">${ch}`
            +`<animate attributeName="fill" values="#5f78a8;${A};#5f78a8" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>`
            +`<animate attributeName="opacity" values="0.45;1;0.45" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/>`
            +`<animateTransform attributeName="transform" type="translate" values="0 0;0 5;0 0" dur="${dur}s" begin="${beg}s" repeatCount="indefinite"/></text>`;
        }
      }
      s+=`<rect x="14" y="${y0+rows*rh-4}" width="${CW-28}" height="2.4" rx="1.2" fill="url(#${pre}bar)" opacity=".55"/>`;
      s+=`${[0,1,2,3,4].map((k)=>`<circle r="3.6" fill="${A}"><animateMotion dur="2.4s" begin="${(k*0.45).toFixed(2)}s" repeatCount="indefinite" path="M 26 ${y0+rows*rh+16} L ${CW-26} ${y0+rows*rh+16}"/><animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="${(k*0.45).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')}</g>`;
      s+=`<rect x="20" y="${y0+rows*rh+30}" width="${CW-40}" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".4"/>`
        +`${tx(159,y0+rows*rh+47,11.5,dim,'любая информация хранится как 0 и 1',{})}`;
      return s;
    }
    if(K==='var'){ /* переменная — коробочка с наклейкой */
      const list=(v.vars&&v.vars.length)?v.vars:[{name:v.name||'x', val:(v.val!==undefined?v.val:'5'), c:A}];
      const n=list.length, bw=n>1?134:150, gp=12, tot=n*bw+(n-1)*gp, x0=Math.round((CW-tot)/2);
      let s='';
      list.forEach((it,k)=>{
        const bx=x0+k*(bw+gp), bc=it.c||A, cx=bx+bw/2, val=plain(it.val!==undefined?it.val:'5');
        const vfs=Math.min(38,(bw-24)/(Math.max(1,val.length)*0.62));
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${bx}" y="54" width="${bw}" height="94" rx="12" fill="url(#${pre}card)" stroke="${bc}" stroke-width="2.2"/>`
          +`<rect x="${bx+8}" y="42" width="${bw-16}" height="27" rx="8" fill="rgba(10,18,36,.97)" stroke="${bc}" stroke-width="1.8"/>`
          +`${tx(cx,61,Math.min(15,60/Math.max(1,plain(it.name).length)/0.62),bc,it.name,{b:1})}`
          +`<rect class="${pre}Glow" x="${bx-3}" y="51" width="${bw+6}" height="100" rx="14" fill="none" stroke="${bc}" stroke-width="2" opacity=".3"/>`
          +`<text x="${cx}" y="120" text-anchor="middle" font-size="${vfs.toFixed(1)}" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="4">${val}</text>`
          +`${tx(cx,140,10.5,dim,'значение',{})}</g>`;
      });
      s+=`${tx(159,168,11.5,dim,v.note||'переменная = имя + значение',{})}`;
      return s;
    }
    if(K==='assign'){ /* присваивание: было → стало */
      const name=plain(v.name||'x'), from=plain(v.from!==undefined?v.from:'3'), to=plain(v.to!==undefined?v.to:'7');
      let s='';
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="59" y="24" width="200" height="48" rx="12" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`<rect x="59" y="24" width="200" height="3.2" rx="1.6" fill="url(#${pre}bar)"/>`
        +`<text x="159" y="58" text-anchor="middle" font-size="${Math.min(27,170/(Math.max(1,(name+' = '+to).length)*0.68)).toFixed(1)}" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="4">${name} = <tspan fill="${grn}">${to}</tspan></text></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.14s" opacity=".8"><rect x="18" y="96" width="126" height="58" rx="11" fill="rgba(255,255,255,.035)" stroke="${cardB}" stroke-width="1.6"/>`
        +`${tx(81,116,10.5,dim,'было',{})}`
        +(from==='пусто'||from==='—'||from===''
            ? `<rect x="50" y="122" width="62" height="28" rx="7" fill="none" stroke="#4a5b85" stroke-width="1.6" stroke-dasharray="5 4"/>${tx(81,141,11,'#8ea3c8','пусто',{})}`
            : `<text x="81" y="146" text-anchor="middle" font-size="${Math.min(24,110/(Math.max(1,from.length)*0.62)).toFixed(1)}" font-family="Georgia,serif" fill="#9fb0cf" paint-order="stroke" stroke="#08101f" stroke-width="4">${from}</text><path d="M40 138 H122" stroke="${red}" stroke-width="2.4" opacity=".9"/>`)
        +`</g>`;
      s+=`<path d="M150 125 H168" stroke="${A}" stroke-width="2.2" opacity=".7"/><circle cx="150" cy="125" r="3.4" fill="${A}" style="--run:18px" class="${pre}Dot"/><path d="M164 121 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.32s" filter="url(#${pre}sh)"><rect x="174" y="96" width="126" height="58" rx="11" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>`
        +`<rect class="${pre}Glow" x="171" y="93" width="132" height="64" rx="14" fill="none" stroke="${grn}" stroke-width="2" opacity=".35"/>`
        +`${tx(237,116,10.5,grn,'стало',{})}`
        +`<text x="237" y="147" text-anchor="middle" font-size="${Math.min(26,110/(Math.max(1,to.length)*0.62)).toFixed(1)}" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="4">${to}</text></g>`;
      s+=`${tx(159,180,11.5,dim,v.note||'новое значение заменяет старое',{})}`;
      return s;
    }
    if(K==='input'){ /* ввод: спросили — запомнили */
      const q=plain(v.q||'Сколько тебе лет?'), name=plain(v.name||'возраст'), val=plain(v.val!==undefined?v.val:'11');
      let s='';
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="14" y="24" width="196" height="108" rx="11" fill="rgba(8,14,30,.95)" stroke="${A}" stroke-opacity=".55" stroke-width="1.8"/>`
        +`<path d="M14 46 h196" stroke="${A}" stroke-opacity=".25"/>`
        +`<circle cx="27" cy="35" r="3.4" fill="#ff6b6b" opacity=".85"/><circle cx="39" cy="35" r="3.4" fill="${gold}" opacity=".85"/><circle cx="51" cy="35" r="3.4" fill="${grn}" opacity=".85"/></g>`;
      s+=`<text x="24" y="72" font-size="${Math.min(12.5,168/(Math.max(1,q.length)*0.6)).toFixed(1)}" fill="${ink}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${q}</text>`;
      s+=`<rect x="24" y="84" width="176" height="30" rx="7" fill="rgba(255,255,255,.05)" stroke="${A}" stroke-opacity=".4"/>`
        +`<text x="36" y="105" font-size="17" fill="${grn}" font-family="'Courier New',monospace" font-weight="bold" opacity="0">${val}<animate attributeName="opacity" values="0;1" dur=".4s" begin=".7s" fill="freeze"/></text>`
        +`<rect class="${pre}Caret" x="${(38+val.length*10.4).toFixed(0)}" y="90" width="7" height="18" fill="${A}"/>`;
      for(let i=0;i<9;i++) s+=`<rect x="${24+i*20}" y="142" width="16" height="9" rx="2.5" fill="rgba(255,255,255,.1)"/>`;
      s+=`<path d="M214 106 H232" stroke="${A}" stroke-width="2.2" opacity=".7"/><circle cx="214" cy="106" r="3.4" fill="${A}" style="--run:18px" class="${pre}Dot"/><path d="M228 102 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s" filter="url(#${pre}sh)"><rect x="236" y="46" width="70" height="112" rx="11" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>`
        +`<rect x="240" y="36" width="62" height="25" rx="7" fill="rgba(10,18,36,.97)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(271,53,Math.min(12,54/Math.max(1,name.length)/0.62),grn,name,{b:1})}`
        +`<text x="271" y="112" text-anchor="middle" font-size="30" font-family="Georgia,serif" font-weight="bold" fill="${ink}" opacity="0">${val}<animate attributeName="opacity" values="0;1" dur=".4s" begin="1s" fill="freeze"/></text>`
        +`<rect class="${pre}Glow" x="233" y="43" width="76" height="118" rx="14" fill="none" stroke="${grn}" stroke-width="2" opacity=".3"/></g>`;
      s+=`${tx(159,174,11.5,dim,v.note||'ввод кладёт число в переменную',{})}`;
      return s;
    }
    if(K==='while'){ /* цикл «пока» */
      const warn=!!v.warn, pre1=!!v.pre, again=!!v.again;
      const q=plain(v.q||'условие?'), body=plain(v.body||'тело цикла');
      const dc=warn?red:pur, bc2=warn?red:(again?gold:grn);
      const qp=(q.length>13 && q.indexOf(' ')>0)?(()=>{ const m=q.lastIndexOf(' ',Math.ceil(q.length/2)); return [q.slice(0,m), q.slice(m+1)]; })():[q];
      const qfs=Math.min(13.5, 126/(Math.max.apply(null,qp.map(x=>x.length))*0.68));
      const qText=(c)=>qp.length>1
        ? `<text x="162" y="58" text-anchor="middle" font-size="${qfs.toFixed(1)}" fill="${c}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[0]}</text>`
         +`<text x="162" y="76" text-anchor="middle" font-size="${qfs.toFixed(1)}" fill="${c}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[1]}</text>`
        : `<text x="162" y="67" text-anchor="middle" font-size="${qfs.toFixed(1)}" fill="${c}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[0]}</text>`;
      let s='';
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><path d="M162 30 l76 32 l-76 32 l-76 -32 z" fill="${warn?'rgba(255,120,100,.14)':'rgba(176,127,255,.14)'}" stroke="${dc}" stroke-width="2.4"/>`
        +(warn?`<path class="${pre}Glow" d="M162 26 l80 36 l-80 36 l-80 -36 z" fill="none" stroke="${dc}" stroke-width="2" opacity=".5"/>`:'')
        +qText(dc)+`</g>`;
      s+=`<path d="M240 62 H264" stroke="${A}" stroke-width="2" opacity=".6"/><path d="M260 58 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>${tx(248,50,10,dim,'нет',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.2s"><ellipse cx="286" cy="62" rx="27" ry="16" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>${tx(286,66,11,A,'выход',{})}</g>`;
      s+=`<path d="M162 96 V116" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M158 112 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>${tx(180,108,10.5,dim,'да',{})}<circle cx="162" cy="98" r="3.4" fill="${A}" style="--run:18px" class="${pre}Dot"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s" filter="url(#${pre}sh)"><rect x="88" y="120" width="148" height="42" rx="10" fill="url(#${pre}card)" stroke="${bc2}" stroke-width="2.2"/>`
        +`<text x="162" y="146" text-anchor="middle" font-size="${Math.min(13,140/(Math.max(1,body.length)*0.62)).toFixed(1)}" fill="${bc2}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${body}</text></g>`;
      s+=`<path d="M162 162 V182 H40 V62 H82" fill="none" stroke="${A}" stroke-width="2" opacity=".6" class="${pre}Dash"/><path d="M78 58 l-5 4 l5 4" fill="none" stroke="${A}" stroke-width="2"/>`
        +`<circle r="3.6" fill="${A}"><animateMotion dur="${warn?'1.1':'2.2'}s" repeatCount="indefinite" path="M162 162 V182 H40 V62 H82"/><animate attributeName="opacity" values="0;1;1;0" dur="${warn?'1.1':'2.2'}s" repeatCount="indefinite"/></circle>`;
      const plate=warn?{t:'условие всё время истинно → цикл бесконечный', c:red}:(pre1?{t:'условие проверяется ПЕРЕД телом цикла', c:gold}:null);
      if(plate){
        s+=`<g class="${pre}Rise" style="animation-delay:.42s"><rect x="24" y="188" width="270" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${plate.c}" stroke-width="1.8"/>`
          +`<text x="159" y="207" text-anchor="middle" font-size="${Math.min(11.5,240/(Math.max(1,plate.t.length)*0.62)).toFixed(1)}" fill="${plate.c}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${plate.t}</text></g>`;
      } else {
        s+=`${tx(46,196,10.5,dim,'после тела — снова к условию',{an:'start'})}`;
      }
      return s;
    }
    if(K==='trace'){ /* трассировка: таблица по шагам */
      const head=(v.head||[]).map(plain), rows=(v.rows||[]).map(r=>r.map(plain)), nc=Math.max(1,head.length);
      const need=[];
      for(let c=0;c<nc;c++){
        let m=Math.max(1,(''+(head[c]||'')).length*1.3);
        rows.forEach(r=>{ m=Math.max(m,(''+(r[c]!==undefined?r[c]:'')).length); });
        need.push(m);
      }
      const sumN=need.reduce((x,y)=>x+y,0)||1, avail=CW-40-6*(nc-1);
      const colw=need.map(x=>Math.max(30, avail*x/sumN));
      const colX=(c)=>{ let x=20; for(let i=0;i<c;i++) x+=colw[i]+6; return x; };
      const hy=26, rh=27;
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="20" y="${hy}" width="${CW-40}" height="${rh}" rx="8" fill="${A}" opacity=".16" stroke="${A}" stroke-width="1.5"/></g>`;
      head.forEach((h,c)=>{ s+=`${tx(colX(c)+colw[c]/2, hy+18, Math.min(11.5,(colw[c]-10)/Math.max(1,h.length)/0.76), A, h, {b:1})}`; });
      rows.forEach((r,k)=>{
        const y=hy+rh+k*rh, last=(k===rows.length-1), d=(k*0.45).toFixed(2), du=(rows.length*0.45+0.8).toFixed(2);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="20" y="${y}" width="${CW-40}" height="${rh}" fill="${k%2?'rgba(255,255,255,.05)':'rgba(255,255,255,.015)'}" stroke="#2b3c62" stroke-width="1"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="20" y="${y}" width="${CW-40}" height="${rh}" fill="${A}" opacity=".14"/>`
          +`<rect x="20" y="${y}" width="3.4" height="${rh}" fill="${A}" opacity=".55"/>`;
        r.forEach((cv,c)=>{
          const col=c===0?dim:(last&&c===r.length-1?grn:ink);
          const fs=c===0?Math.min(11,(colw[c]-10)/Math.max(1,cv.length)/0.74):Math.min(c===r.length-1?14.5:13,(colw[c]-10)/Math.max(1,cv.length)/0.74);
          s+=`${tx(colX(c)+colw[c]/2, y+19, fs, col, cv, {b:c>0, georgia:c>0})}`;
        });
        s+=`</g>`;
      });
      const by=hy+rh+rows.length*rh, note=plain(v.note||'таблица показывает каждое изменение');
      s+=`<rect x="20" y="${by+8}" width="${CW-40}" height="26" rx="8" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-opacity=".35"/>`
        +`${tx(159,by+25,Math.min(11,250/Math.max(1,note.length)/0.64),dim,note,{})}`;
      return s;
    }
    if(K==='compare'){ /* два вида цикла рядом */
      const L2=v.left||{}, R2=v.right||{};
      const panel=(x,o)=>{
        const c=o.c||A, t=plain(o.t||''), d=plain(o.d||''), pts=(o.points||[]).map(plain);
        let g=`<g class="${pre}Rise" filter="url(#${pre}sh)"><rect x="${x}" y="26" width="138" height="164" rx="13" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
          +`<rect x="${x}" y="26" width="138" height="3.2" rx="1.6" fill="${c}"/>`
          +`<circle cx="${x+69}" cy="72" r="25" fill="${c}" opacity=".13" stroke="${c}" stroke-opacity=".5" stroke-width="1.4"/>`
          +`<g class="${pre}Float">${icon(iconKey(t,0),x+69,72,c,34)}</g>`
          +`<text x="${x+69}" y="116" text-anchor="middle" font-size="${Math.min(12.5,110/(Math.max(1,t.length)*0.74)).toFixed(1)}" fill="${c}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${t}</text>`;
        let py=136;
        if(d){ g+=`<text x="${x+69}" y="${py}" text-anchor="middle" font-size="${Math.min(10.5,116/(Math.max(1,d.length)*0.68)).toFixed(1)}" fill="${dim}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="3.4">${d}</text>`; py+=8; }
        pts.slice(0,2).forEach(pt=>{
          py+=20;
          g+=`<circle cx="${x+16}" cy="${py-4}" r="3" fill="${c}"/>`
            +`<text x="${x+26}" y="${py}" font-size="${Math.min(10.5,98/(Math.max(1,pt.length)*0.68)).toFixed(1)}" fill="${ink}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="3.4">${pt}</text>`;
        });
        return g+`</g>`;
      };
      let s=panel(16,L2)+panel(164,R2);
      s+=`<path d="M159 34 V182" stroke="${A}" stroke-width="1.6" stroke-dasharray="5 5" opacity=".5"/>`
        +`<circle cx="159" cy="108" r="16" fill="rgba(10,18,36,.96)" stroke="${A}" stroke-width="1.6"/>${tx(159,112,10.5,A,'или',{b:1})}`;
      return s;
    }
    if(K==='quest'){ /* карта пути: что мы уже умеем */
      const st2=[{x:56,y:140,ic:'chip',t:'переменные',c:blu},{x:159,y:92,ic:'quest',t:'условие',c:pur},{x:262,y:44,ic:'loop',t:'цикл',c:grn}];
      let s=`<path d="M56 140 Q108 122 159 92 Q210 70 262 44" fill="none" stroke="${A}" stroke-width="2.6" stroke-dasharray="8 7" opacity=".6" class="${pre}Dash"/>`;
      s+=`<circle r="5" fill="${gold}"><animateMotion dur="4.2s" repeatCount="indefinite" path="M56 140 Q108 122 159 92 Q210 70 262 44"/></circle>`;
      st2.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.16*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<circle cx="${q.x}" cy="${q.y}" r="27" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2.4"/>`
          +`<circle class="${pre}Glow" cx="${q.x}" cy="${q.y}" r="32" fill="none" stroke="${q.c}" stroke-width="2" opacity=".35"/>`
          +`${icon(q.ic,q.x,q.y,q.c,30)}`
          +`<rect x="${q.x-46}" y="${q.y+32}" width="92" height="22" rx="8" fill="rgba(10,18,36,.96)" stroke="${q.c}" stroke-width="1.5"/>`
          +`${tx(q.x,q.y+47,11.5,q.c,q.t,{b:1})}</g>`;
      });
      s+=`${tx(159,200,11,dim,'три умения вместе — и программа «думает»',{})}`;
      return s;
    }
    if(K==='comboscheme'){ /* условие внутри цикла — общая схема */
      let s='';
      s+=`<g class="Pop"><ellipse cx="140" cy="24" rx="56" ry="13" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>${tx(140,28,11.5,grn,'начало',{b:1})}</g>`;
      s+=`<path d="M140 38 V54" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M136 50 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<rect x="26" y="56" width="238" height="176" rx="15" fill="rgba(125,224,160,.06)" stroke="${grn}" stroke-width="2" stroke-dasharray="9 7"/>`;
      s+=`<rect x="34" y="47" width="126" height="20" rx="7" fill="rgba(10,18,36,.98)" stroke="${grn}" stroke-width="1.5"/>${tx(97,61,10.5,grn,'пока не вышли',{b:1})}`;
      s+=`<g class="Pop" style="animation-delay:.15s"><path d="M130 84 l62 24 l-62 24 l-62 -24 z" fill="rgba(176,127,255,.14)" stroke="${pur}" stroke-width="2.2"/>${tx(130,112,12.5,pur,'стена?',{b:1})}</g>`;
      s+=`<path d="M192 108 H200" stroke="${A}" stroke-width="2"/><path d="M196 104 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>${tx(206,100,10,dim,'да',{})}`;
      s+=`<g class="Pop" style="animation-delay:.28s"><rect x="204" y="86" width="52" height="30" rx="8" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>${tx(230,105,11,gold,'повернуть',{})}</g>`;
      s+=`<path d="M230 116 V142 H196" stroke="${A}" stroke-width="2" opacity=".65" class="${pre}Dash"/><path d="M200 138 l-5 4 l5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<path d="M130 132 V142" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M126 138 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>${tx(146,140,10,dim,'нет',{})}`;
      s+=`<g class="Pop" style="animation-delay:.4s" filter="url(#${pre}sh)"><rect x="60" y="148" width="134" height="32" rx="9" fill="url(#${pre}card)" stroke="${bc||A}" stroke-width="2.2"/>${tx(127,169,12.5,ink,'шаг вперёд',{b:1})}</g>`;
      s+=`<path d="M127 180 V206 H38 V108 H64" fill="none" stroke="${A}" stroke-width="2" opacity=".6" class="${pre}Dash"/><path d="M60 104 l-5 4 l5 4" fill="none" stroke="${A}" stroke-width="2"/>`
        +`<circle r="4" fill="${gold}"><animateMotion dur="3.4s" repeatCount="indefinite" path="M127 180 V206 H38 V108 H64"/></circle>`;
      s+=`<path d="M264 206 H282" stroke="${A}" stroke-width="2" opacity=".7"/><path d="M278 202 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`
        +`<ellipse cx="298" cy="206" rx="18" ry="12" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.8"/>${tx(298,210,9.5,red,'выход',{})}`;
      s+=`<rect class="${pre}Scan" style="--scan:160px" x="30" y="60" width="230" height="2" rx="1" fill="${grn}" opacity=".2"/>`;
      return s;
    }
    if(K==='pseudo'){ /* псевдокод с указателем выполнения */
      const rows=v.rows||[], rh=25, y0=26;
      let s=`<rect x="16" y="16" width="286" height="${rows.length*rh+38}" rx="12" fill="rgba(8,14,30,.9)" stroke="${A}" stroke-opacity=".45" stroke-width="1.6"/>`
        +`<path d="M16 40 h286" stroke="${A}" stroke-opacity=".2"/>`
        +`<circle cx="30" cy="28" r="3.4" fill="#ff6b6b" opacity=".8"/><circle cx="42" cy="28" r="3.4" fill="${gold}" opacity=".8"/><circle cx="54" cy="28" r="3.4" fill="${grn}" opacity=".8"/>`
        +`${tx(200,32,10.5,dim,'как читает компьютер',{})}`;
      rows.forEach((r,k)=>{
        const y=y0+22+k*rh, ind=(r.i||0)*18, d=(k*0.5).toFixed(2), du=(rows.length*0.5+1).toFixed(2);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.09*k).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="${rh-2}" rx="5" fill="rgba(255,255,255,${k%2?'.02':'.045'})"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="22" y="${y}" width="274" height="${rh-2}" rx="5" fill="${A}" opacity=".13"/>`
          +`<text x="${34+ind}" y="${y+16}" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${r.c||cyan}">${plain(r.t)}</text>`
          +`</g>`
          +`<path class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" d="M22 ${y+5} l8 6 l-8 6 z" fill="${gold}"/>`;
      });
      return s;
    }
    if(K==='split'){ /* программа и мир одновременно */
      const code=v.lines||['пока не вышли:','    шаг вперёд','    i = i + 1'];
      const n=4, cell=28, gx=196, gy=54;
      let s=`<rect x="14" y="24" width="150" height="184" rx="12" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".5" stroke-width="1.6"/>`
        +`${tx(89,42,11,dim,'программа',{b:1})}`
        +`<rect x="176" y="24" width="128" height="184" rx="12" fill="rgba(126,168,255,.07)" stroke="${A}" stroke-opacity=".5" stroke-width="1.6"/>`
        +`${tx(240,42,11,dim,'мир робота',{b:1})}`;
      code.forEach((t,k)=>{
        const y=54+k*30, d=(k*0.6).toFixed(2), du=(code.length*0.6+1).toFixed(2);
        s+=`<rect x="22" y="${y}" width="134" height="24" rx="6" fill="rgba(255,255,255,.04)"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="22" y="${y}" width="134" height="24" rx="6" fill="${A}" opacity=".16"/>`
          +`<text x="${30+(t.match(/^\s+/)?12:0)}" y="${y+16}" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${k===0?gold:cyan}">${plain(t.trim())}</text>`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="16" y="${y+4}" width="4" height="16" rx="2" fill="${gold}"/>`;
      });
      for(let r=0;r<4;r++)for(let c=0;c<4;c++){
        const x=gx+c*cell, y=gy+r*cell;
        s+=`<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${((r+c)%2)?'rgba(255,255,255,.05)':'rgba(255,255,255,.02)'}" stroke="#31456f" stroke-width="1"/>`;
      }
      s+=`<rect x="${gx+2*cell}" y="${gy+cell}" width="${cell}" height="${cell}" rx="3" fill="rgba(110,168,255,.32)" stroke="${blu}" stroke-width="1.4"/>`;
      s+=`<g><circle r="9" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"/><circle cx="-3" cy="-3" r="2" fill="#1a2340"/><circle cx="3" cy="-3" r="2" fill="#1a2340"/>`
        +`<animateMotion dur="4.4s" repeatCount="indefinite" path="M${gx+cell/2} ${gy+3*cell+cell/2} L${gx+cell/2} ${gy+2*cell+cell/2} L${gx+2*cell+cell/2} ${gy+2*cell+cell/2} L${gx+2*cell+cell/2} ${gy+cell+cell/2}"/></g>`;
      s+=`<path d="M168 116 H172" stroke="${A}" stroke-width="2" opacity=".6"/><circle cx="168" cy="116" r="3.2" fill="${A}" style="--run:6px" class="${pre}Dot"/>`;
      return s;
    }
    if(K==='gears'){ /* шестерни-счётчики */
      const gs=[{x:70,y:96,r:34,v:v.a||'i',t:'повторы',c:blu},{x:159,y:96,r:26,v:v.b||'шаги',t:'шагов',c:grn},{x:224,y:96,r:20,v:v.c||'повороты',t:'поворотов',c:gold}];
      let s='';
      gs.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<g class="${pre}Spin" style="animation-duration:${(7+k*2)}s">${motif('gear',q.x,q.y,q.r*2.1,q.c)}</g>`
          +`<circle cx="${q.x}" cy="${q.y}" r="${q.r*0.62}" fill="rgba(10,18,36,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +`<text x="${q.x}" y="${q.y+7}" text-anchor="middle" font-size="16" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(q.v)}</text>`
          +`${tx(q.x,q.y+q.r+20,10.5,q.c,q.t,{b:1})}</g>`;
      });
      s+=`<path d="M40 172 h40" stroke="${A}" stroke-width="2" opacity=".5"/><circle cx="40" cy="172" r="3.2" fill="${A}" style="--run:40px" class="${pre}Dot"/>`;
      s+=`${tx(159,194,11.5,dim,'каждый повтор добавляет единицу в счётчики',{})}`;
      return s;
    }
    if(K==='gate'){ /* ворота-условие в стене */
      const op=!!v.open, dc=op?grn:gold;
      let s=`<rect x="14" y="150" width="290" height="44" rx="6" fill="#33456e" stroke="#41558a" stroke-width="1.5"/>`;
      for(let k=0;k<4;k++) s+=`<path d="M14 ${161+k*11} h290" stroke="#41558a" stroke-width="1" opacity=".45"/>`;
      s+=`<rect x="132" y="150" width="54" height="44" rx="3" fill="#0f1930" stroke="${dc}" stroke-width="1.6"/>`;
      s+=`<g transform="translate(132,150)"><g><animateTransform attributeName="transform" type="rotate" values="0 0 0;${op?-88:0} 0 0;${op?-88:0} 0 0;0 0 0" keyTimes="0;.3;.85;1" dur="6s" repeatCount="indefinite"/>`
        +`<rect x="0" y="0" width="27" height="44" rx="3" fill="${dc}" opacity=".85" stroke="#08101f" stroke-width="1"/></g></g>`;
      s+=`<g transform="translate(186,150)"><g><animateTransform attributeName="transform" type="rotate" values="0 0 0;${op?88:0} 0 0;${op?88:0} 0 0;0 0 0" keyTimes="0;.3;.85;1" dur="6s" repeatCount="indefinite"/>`
        +`<rect x="-27" y="0" width="27" height="44" rx="3" fill="${dc}" opacity=".85" stroke="#08101f" stroke-width="1"/></g></g>`;
      s+=`<g class="${pre}Pop"><path d="M159 24 l76 26 l-76 26 l-76 -26 z" fill="rgba(176,127,255,.14)" stroke="${pur}" stroke-width="2.2"/>${tx(159,56,12.5,pur,v.q||'впереди стена?',{b:1})}</g>`;
      s+=`<path d="M116 72 L98 84" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M94 80 l-3 7 l8 -1" fill="none" stroke="${A}" stroke-width="2"/>${tx(88,74,10,dim,'да',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.22s"><rect x="14" y="90" width="118" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>${tx(73,110,11.5,gold,'повернуть',{b:1})}</g>`;
      s+=`<path d="M159 76 V142" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M155 136 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>${tx(172,96,10,dim,'нет',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.34s"><rect x="186" y="90" width="118" height="30" rx="9" fill="url(#${pre}card)" stroke="${dc}" stroke-width="2"/>`
        +`${tx(245,110,Math.min(11.5,108/Math.max(1,(op?'ворота открыты':'ворота закрыты').length)/0.64),dc,op?'ворота открыты':'ворота закрыты',{b:1})}</g>`;
      s+=`<rect class="${pre}Spot" style="animation-duration:3s" x="132" y="150" width="54" height="44" rx="3" fill="${dc}" opacity=".18"/>`;
      if(op){
        s+=`<g><circle r="12" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"/><circle cx="-4" cy="-3" r="2.6" fill="#1a2340"/><circle cx="4" cy="-3" r="2.6" fill="#1a2340"/>`
          +`<animateMotion dur="4.4s" repeatCount="indefinite" path="M159 240 V110"/></g>`;
      } else {
        s+=`<g><circle r="12" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"/><circle cx="-4" cy="-3" r="2.6" fill="#1a2340"/><circle cx="4" cy="-3" r="2.6" fill="#1a2340"/>`
          +`<animateMotion dur="2.2s" repeatCount="indefinite" path="M159 238 h-16 h32 h-16"/></g>`;
      }
      s+=`${tx(159,262,11,dim,'условие решает: повернуть или пройти',{})}`;
      return s;
    }
    if(K==='sensor'){ /* датчик робота: луч и эхо */
      let s=`<rect x="284" y="34" width="18" height="116" rx="4" fill="rgba(110,168,255,.3)" stroke="${blu}" stroke-width="1.6"/>`;
      for(let k=0;k<4;k++) s+=`<path d="M287 ${52+k*26} L299 ${44+k*26}" stroke="${blu}" stroke-width="1.1" opacity=".6"/>`;
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="14" y="46" width="98" height="26" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.8"/>${tx(63,64,11.5,cyan,'датчик',{b:1})}</g>`;
      s+=`<path d="M63 72 V96" stroke="${cyan}" stroke-width="1.6" opacity=".6" class="${pre}Dash"/>`;
      s+=`<g class="${pre}Float"><circle cx="56" cy="122" r="20" fill="${gold}" stroke="#fffdf2" stroke-width="1.8"/>`
        +`<circle cx="49" cy="118" r="3.4" fill="#1a2340"/><circle cx="63" cy="118" r="3.4" fill="#1a2340"/>`
        +`<circle class="${pre}Blink" cx="56" cy="92" r="4.4" fill="${cyan}"/></g>`;
      s+=`<path d="M78 116 H282" stroke="${cyan}" stroke-width="2" stroke-dasharray="7 6" class="${pre}Dash" opacity=".8"/>`;
      s+=`<circle r="4.4" fill="${cyan}"><animateMotion dur="1.8s" repeatCount="indefinite" path="M78 116 H282"/></circle>`;
      s+=`<path d="M282 130 H78" stroke="${grn}" stroke-width="1.8" opacity=".45"/>`;
      s+=`<circle r="3.6" fill="${grn}"><animateMotion dur="1.8s" begin=".9s" repeatCount="indefinite" path="M282 130 H78"/></circle>`;
      s+=`${[140,200,260].map(x=>`<path d="M${x} 112 v8" stroke="${cyan}" stroke-width="1.4" opacity=".5"/>`).join('')}`;
      s+=`<rect x="16" y="160" width="286" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${pur}" stroke-width="1.7"/>`
        +`${tx(159,180,11.5,pur,'датчик отвечает: «стена?» → да или нет',{b:1})}`;
      return s;
    }
    if(K==='shelves'){ /* полка памяти */
      const cells=v.cells||[{n:'i',v:'0',c:blu},{n:'шаги',v:'3',c:grn},{n:'повороты',v:'1',c:gold},{n:'стена',v:'нет',c:pur}];
      let s=`<rect x="16" y="44" width="286" height="14" rx="4" fill="rgba(255,255,255,.08)" stroke="#31456f" stroke-width="1"/>`;
      const cw=(286-6*(cells.length+1))/cells.length, x0=22;
      cells.forEach((q,k)=>{
        const x=x0+k*(cw+6);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="${x}" y="58" width="${cw}" height="92" rx="9" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${(k*0.5).toFixed(2)}s;animation-duration:${(cells.length*0.5+1).toFixed(2)}s" x="${x}" y="58" width="${cw}" height="92" rx="9" fill="${q.c}" opacity=".13"/>`
          +`${tx(x+cw/2,76,9.5,q.c,q.n,{b:1})}`
          +`<text x="${x+cw/2}" y="118" text-anchor="middle" font-size="19" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(q.v)}</text>`
          +`</g>`;
      });
      s+=`${tx(159,172,11.5,dim,v.note||'программа помнит всё, что ей нужно',{})}`;
      return s;
    }
    if(K==='nest'){ /* вложенность блоков */
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="20" y="46" width="278" height="150" rx="14" fill="rgba(125,224,160,.06)" stroke="${grn}" stroke-width="2.2"/>`
        +`<rect x="28" y="38" width="112" height="20" rx="7" fill="rgba(10,18,36,.98)" stroke="${grn}" stroke-width="1.5"/>${tx(84,52,10.5,grn,'цикл пока',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s" filter="url(#${pre}sh)"><rect x="44" y="80" width="230" height="98" rx="12" fill="rgba(176,127,255,.10)" stroke="${pur}" stroke-width="2.2"/>`
        +`<rect x="52" y="72" width="94" height="20" rx="7" fill="rgba(10,18,36,.98)" stroke="${pur}" stroke-width="1.5"/>${tx(99,86,10.5,pur,'если стена',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="62" y="104" width="90" height="28" rx="8" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>${tx(107,123,11,gold,'повернуть',{})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.65s"><rect x="166" y="104" width="94" height="28" rx="8" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.8"/>${tx(213,123,11,cyan,'шаг вперёд',{})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.8s"><rect x="62" y="142" width="198" height="28" rx="8" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.8"/>${tx(161,161,11,grn,'i = i + 1',{b:1})}</g>`;
      s+=`<path class="${pre}Dash" d="M20 200 H298" stroke="${A}" stroke-width="1.6" opacity=".4" stroke-dasharray="7 6"/>${tx(159,216,11,dim,'внутри цикла живёт условие — это вложенность',{})}`;
      return s;
    }
    if(K==='debugger'){ /* ищем ошибку */
      const rows=v.lines||['пока i < 3:','    вывести i'], bad=v.bad||0;
      let s=`<g filter="url(#${pre}sh)"><rect x="16" y="20" width="286" height="${rows.length*26+40}" rx="12" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".45" stroke-width="1.6"/>`
        +`<path d="M16 44 h286" stroke="${A}" stroke-opacity=".2"/>`
        +`<circle cx="30" cy="32" r="3.4" fill="#ff6b6b" opacity=".8"/><circle cx="42" cy="32" r="3.4" fill="${gold}" opacity=".8"/><circle cx="54" cy="32" r="3.4" fill="${grn}" opacity=".8"/>`
        +`${tx(190,36,10.5,dim,'ищем ошибку',{})}</g>`;
      rows.forEach((t,k)=>{
        const y=54+k*26, isb=(k===bad);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="22" rx="5" fill="${isb?'rgba(255,120,100,.16)':'rgba(255,255,255,.035)'}" ${isb?'class="'+pre+'Glow"':''} stroke="${isb?red:'#2b3c62'}" stroke-width="${isb?1.8:1}"/>`
          +`<text x="${34+(t.match(/^\s+/)?16:0)}" y="${y+15}" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${isb?red:cyan}">${plain(t.trim())}</text>`
          +(isb?`<path d="M258 ${y+4} l8 14 h-16 z" fill="${red}" opacity=".9"/><text x="258" y="${y+16}" text-anchor="middle" font-size="9" fill="#1a2340" font-weight="bold">!</text>`:'')
          +`</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="16" y="${rows.length*26+66}" width="286" height="30" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,rows.length*26+86,11.5,red,v.hint||'тело не меняет условие — цикл не кончится',{b:1})}</g>`;
      return s;
    }
    if(K==='tests'){ /* проверяем на примерах */
      const runs=v.runs||[{t:'поле 3×3',r:'вышел за 4 шага'},{t:'поле 4×4',r:'вышел за 6 шагов'},{t:'стена рядом',r:'повернул сразу'}];
      let s='';
      runs.forEach((q,k)=>{
        const y=34+k*50;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.16*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="20" y="${y}" width="278" height="42" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.8"/>`
          +`<circle cx="44" cy="${y+21}" r="12" fill="${grn}" opacity=".18" stroke="${grn}" stroke-width="1.5"/>`
          +`<path d="M38 ${y+21} l4 5 l8 -10" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +`${tx(64,y+17,11.5,ink,q.t,{an:'start',b:1})}`
          +`${tx(64,y+33,10.5,dim,q.r,{an:'start'})}`
          +`<rect class="${pre}Spot" style="animation-delay:${(k*0.5).toFixed(2)}s;animation-duration:${(runs.length*0.5+1).toFixed(2)}s" x="20" y="${y}" width="278" height="42" rx="10" fill="${grn}" opacity=".08"/></g>`;
      });
      s+=`${tx(159,34+runs.length*50+8,11,grn,v.note||'проверяем на нескольких полях — программа работает всегда',{})}`;
      return s;
    }
    if(K==='belt'){ /* конвейер: прочитал → проверил → сделал → повторил */
      const st3=[{x:52,t:'прочитал',c:cyan},{x:126,t:'проверил',c:pur},{x:200,t:'сделал',c:gold},{x:274,t:'повторил',c:grn}];
      let s=`<rect x="24" y="118" width="270" height="26" rx="13" fill="rgba(255,255,255,.06)" stroke="#31456f" stroke-width="1.4"/>`;
      for(let i=0;i<18;i++) s+=`<rect class="${pre}Dash" x="${30+i*15}" y="126" width="8" height="4" rx="2" fill="${A}" opacity=".5"/>`;
      st3.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<circle cx="${q.x}" cy="76" r="25" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2.2"/>`
          +`<text x="${q.x}" y="84" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="bold" fill="${q.c}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${k+1}</text>`
          +`${tx(q.x,120,10.5,q.c,q.t,{b:1})}`
          +`<path d="M${q.x} 102 v12" stroke="${q.c}" stroke-width="1.6" opacity=".6"/></g>`;
        if(k<st3.length-1) s+=`<path d="M${q.x+26} 76 h${st3[k+1].x-q.x-52}" stroke="${A}" stroke-width="1.6" opacity=".35" stroke-dasharray="4 4"/>`;
      });
      s+=`<rect x="60" y="122" width="22" height="18" rx="4" fill="${gold}" opacity=".9"><animateMotion dur="5s" repeatCount="indefinite" path="M0 0 H210"/></rect>`;
      s+=`<rect x="30" y="166" width="258" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.6" stroke-opacity=".5"/>${tx(159,186,11.5,ink,'каждый круг компьютер делает эти четыре шага',{})}`;
      return s;
    }
    if(K==='mindmap'){ /* карта знаний */
      const br=[{x:60,y:60,t:'переменные',c:blu},{x:258,y:60,t:'условие',c:pur},{x:60,y:170,t:'цикл',c:grn},{x:258,y:170,t:'порядок',c:gold}];
      let s=`<g>`;
      br.forEach((q,k)=>{
        s+=`<path d="M159 116 Q${(159+q.x)/2} ${(116+q.y)/2} ${q.x} ${q.y}" fill="none" stroke="${q.c}" stroke-width="2" opacity=".55" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      });
      br.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${q.x-56}" y="${q.y-17}" width="112" height="34" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`${tx(q.x,q.y+5,11.5,q.c,q.t,{b:1})}</g>`;
      });
      s+=`<g class="${pre}Pulse" filter="url(#${pre}sh)"><circle cx="159" cy="116" r="42" fill="rgba(10,18,36,.97)" stroke="${A}" stroke-width="2.6"/><circle cx="159" cy="116" r="50" fill="none" stroke="${A}" stroke-width="1.6" opacity=".35"/></g>`
        +`${tx(159,110,12.5,ink,'моя',{b:1})}${tx(159,126,12.5,ink,'программа',{b:1})}`;
      s+=`${tx(159,206,11,dim,'всё, что нужно, чтобы написать любую программу',{})}`;
      return s;
    }
    if(K==='pick'){ /* интерактив: выбери ответ */
      const opts=v.opts||[], sel=(st&&typeof st.pick==='number')?st.pick:-1, okI=opts.findIndex(o=>o.ok);
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="20" y="24" width="278" height="34" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,46,Math.min(12.5,250/Math.max(1,plain(v.q||'').length)/0.64),ink,v.q||'Выбери ответ',{b:1})}</g>`;
      opts.forEach((o,k)=>{
        const y=70+k*40, done=sel>=0, good=(k===okI);
        const col=!done?(o.c||A):(good?grn:red);
        const bg=done&&good?'rgba(125,224,160,.16)':(done&&sel===k?'rgba(255,120,100,.16)':'rgba(255,255,255,.04)');
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s;cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="34" y="${y}" width="250" height="34" rx="10" fill="${bg}" stroke="${col}" stroke-width="2"/>`
          +`<circle cx="56" cy="${y+17}" r="11" fill="${col}" opacity=".16" stroke="${col}" stroke-width="1.5"/>`
          +`<text x="56" y="${y+22}" text-anchor="middle" font-size="12" font-weight="bold" fill="${col}" font-family="Georgia,serif">${String.fromCharCode(1040+k)}</text>`
          +`${tx(180,y+23,12.5,done&&sel===k?col:ink,o.t,{b:1})}`
          +(done&&good?`<path d="M266 ${y+17} l5 6 l9 -12" fill="none" stroke="${grn}" stroke-width="2.6"/>`:'')
          +(done&&sel===k&&!good?`<path d="M262 ${y+11} l12 12 M274 ${y+11} l-12 12" stroke="${red}" stroke-width="2.6" fill="none"/>`:'')
          +`</g>`;
      });
      if(sel>=0) s+=`<g class="${pre}Rise" style="animation-delay:.2s"><rect x="20" y="${70+opts.length*40+6}" width="278" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${sel===okI?grn:gold}" stroke-width="1.8"/>`
        +`${tx(159,70+opts.length*40+26,11,sel===okI?grn:gold, v.exp||(sel===okI?'Верно!':'Подумай ещё: подсказка ниже'),{b:1})}</g>`;
      else s+=`${tx(159,70+opts.length*40+22,11,dim,'нажми на вариант — я проверю',{})}`;
      return s;
    }
    if(K==='bigtask'){ /* большая задача — длинно и запутанно */
      let s='', y0=26, rh=11;
      for(let k=0;k<13;k++){
        const w=120+((k*37)%110);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.05*k).toFixed(2)}s">`
          +`<rect x="24" y="${y0+k*rh}" width="${w}" height="8" rx="4" fill="${k%3?A:'#5f78a8'}" opacity="${k%3?0.65:0.4}"/>`
          +`<rect x="${24+w+6}" y="${y0+k*rh}" width="${(k%4)*14}" height="8" rx="4" fill="#5f78a8" opacity=".3"/></g>`;
      }
      s+=`<path d="M258 ${y0-4} V${y0+13*rh}" stroke="${red}" stroke-width="2.4" opacity=".8"/>`
        +`<path d="M254 ${y0-4} h8 M254 ${y0+13*rh} h8" stroke="${red}" stroke-width="2.4" opacity=".8"/>`;
      s+=`<rect class="${pre}Pop" style="animation-delay:.8s" x="266" y="${y0+42}" width="40" height="24" rx="7" fill="rgba(255,120,100,.16)" stroke="${red}" stroke-width="1.6"/>${tx(286,y0+59,10.5,red,'30',{b:1})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:1s"><rect x="20" y="186" width="278" height="30" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,206,11.5,red,'30 команд — долго писать и легко ошибиться',{b:1})}</g>`;
      return s;
    }
    if(K==='plan'){ /* разбиваем задачу на подзадачи */
      const ch=[{x:65,t:'нарисовать квадрат',c:cyan},{x:159,t:'повторить 3 раза',c:gold},{x:253,t:'поставить рядом',c:grn}];
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="64" y="24" width="190" height="36" rx="12" fill="url(#${pre}card)" stroke="${A}" stroke-width="2.2"/>`
        +`<rect x="64" y="24" width="190" height="3.2" rx="1.6" fill="url(#${pre}bar)"/>${tx(159,48,13,ink,'большая задача',{b:1})}</g>`;
      ch.forEach((q,k)=>{
        s+=`<path d="M159 60 V70 H${q.x} V104" fill="none" stroke="${q.c}" stroke-width="2" opacity=".6" stroke-dasharray="6 5" class="${pre}Dash"/>`;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.2+0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${q.x-45}" y="104" width="90" height="62" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<circle cx="${q.x}" cy="126" r="13" fill="${q.c}" opacity=".14" stroke="${q.c}" stroke-width="1.3"/>`
          +`<text x="${q.x}" y="140" text-anchor="middle" font-size="17" font-family="Georgia,serif" font-weight="bold" fill="${q.c}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${k+1}</text>`
          +`${tx(q.x,155,10.5,ink,q.t,{})}</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="20" y="178" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.6" stroke-opacity=".5"/>`
        +`${tx(159,197,11,dim,'большое → три маленьких понятных шага',{})}</g>`;
      return s;
    }
    if(K==='recipe'){ /* вспомогательный алгоритм — рецепт с именем */
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="28" y="30" width="262" height="140" rx="13" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>`
        +`<rect x="30" y="18" width="126" height="26" rx="9" fill="rgba(10,18,36,.98)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(93,36,13,grn,v.name||'квадрат',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.25s">`
        +`<rect x="46" y="64" width="226" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="${A}" stroke-opacity=".4"/>${tx(159,82,11.5,gold,'повтори 4 раза:',{b:1,an:'middle'})}`
        +`<rect x="56" y="96" width="206" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="${A}" stroke-opacity=".4"/>${tx(159,114,11.5,cyan,'вперёд и повернуть',{b:1})}`
        +`<rect x="56" y="128" width="206" height="26" rx="7" fill="rgba(255,255,255,.05)" stroke="${grn}" stroke-opacity=".5"/>${tx(159,146,11.5,grn,'4 стороны готовы',{b:1})}</g>`;
      s+=`<circle class="${pre}Twinkle" cx="266" cy="34" r="11" fill="${gold}" opacity=".25" stroke="${gold}" stroke-width="1.6"/><text x="266" y="39" text-anchor="middle" font-size="12" font-weight="bold" fill="${gold}">имя</text>`;
      s+=`${tx(159,190,11.5,dim,v.note||'у алгоритма есть имя и своё тело из команд',{})}`;
      return s;
    }
    if(K==='helper'){ /* главный алгоритм вызывает помощника */
      let s=`<path d="M96 112 H224" stroke="${A}" stroke-width="2" opacity=".55" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      s+=`<circle r="4.4" fill="${A}"><animateMotion dur="1.6s" repeatCount="indefinite" path="M96 112 H224"/></circle>`;
      s+=`<circle r="3.8" fill="${grn}"><animateMotion dur="1.6s" begin=".8s" repeatCount="indefinite" path="M224 130 H96"/></circle>`;
      s+=`<path d="M224 124 H96" stroke="${grn}" stroke-width="1.6" opacity=".4"/>`;
      s+=`<g class="${pre}Float"><circle cx="62" cy="110" r="26" fill="${gold}" stroke="#fffdf2" stroke-width="2"/>`
        +`<circle cx="53" cy="104" r="4" fill="#1a2340"/><circle cx="71" cy="104" r="4" fill="#1a2340"/>`
        +`<path d="M54 120 q8 7 16 0" fill="none" stroke="#1a2340" stroke-width="2"/>`
        +`<path d="M62 84 v-10" stroke="${gold}" stroke-width="2"/><circle class="${pre}Blink" cx="62" cy="70" r="4" fill="${cyan}"/></g>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.2s" filter="url(#${pre}sh)"><rect x="10" y="140" width="104" height="26" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>${tx(62,158,11,gold,'главный',{b:1})}</g>`;
      s+=`<g class="${pre}Float" style="animation-delay:.3s"><circle cx="250" cy="120" r="20" fill="#8fd6ff" stroke="#fffdf2" stroke-width="1.8"/>`
        +`<circle cx="243" cy="115" r="3.2" fill="#14314a"/><circle cx="257" cy="115" r="3.2" fill="#14314a"/></g>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.35s" filter="url(#${pre}sh)"><rect x="196" y="52" width="108" height="26" rx="9" fill="rgba(10,18,36,.98)" stroke="${cyan}" stroke-width="1.8"/>${tx(250,70,11.5,cyan,v.name||'квадрат',{b:1})}</g>`;
      s+=`${tx(250,80,10,dim,'имя помощника',{})}`;
      s+=`<g class="${pre}Pop" style="animation-delay:.5s"><rect x="216" y="140" width="68" height="26" rx="9" fill="rgba(143,214,255,.12)" stroke="${cyan}" stroke-width="1.6"/>${tx(250,158,11,cyan,'помощник',{})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="20" y="176" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,195,11,dim,'главный пишет: «квадрат» — и помощник приходит на помощь',{})}</g>`;
      return s;
    }
    if(K==='call'){ /* вызов по имени из разных мест */
      let s=`<g class="${pre}Pulse" filter="url(#${pre}sh)"><rect x="114" y="90" width="90" height="40" rx="12" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.4"/>`
        +`<rect x="114" y="90" width="90" height="3.2" rx="1.6" fill="${grn}"/>${tx(159,116,13,grn,v.name||'повернуть',{b:1})}</g>`;
      const sites=[{x:44,y:36,t:'шаг 3'},{x:274,y:36,t:'шаг 7'},{x:44,y:186,t:'шаг 12'},{x:274,y:186,t:'шаг 18'}];
      sites.forEach((q,k)=>{
        s+=`<path d="M159 106 Q${(159+q.x)/2} ${(106+q.y)/2} ${q.x} ${q.y}" fill="none" stroke="${A}" stroke-width="1.8" opacity=".5" stroke-dasharray="6 5" class="${pre}Dash"/>`
          +`<g class="${pre}Slide" style="animation-delay:${(0.14*k).toFixed(2)}s"><rect x="${q.x-32}" y="${q.y-15}" width="64" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>${tx(q.x,q.y+4,11,dim,q.t,{})}</g>`
          +`<circle r="3.4" fill="${gold}"><animateMotion dur="2.6s" begin="${(k*0.5).toFixed(2)}s" repeatCount="indefinite" path="M${q.x} ${q.y} Q${(159+q.x)/2} ${(106+q.y)/2} 159 106"/></circle>`;
      });
      s+=`${tx(159,156,10.5,dim,'одно описание — много вызовов',{})}`;
      return s;
    }
    if(K==='zoom'){ /* лупа: что внутри алгоритма */
      const lines=['повтори 4 раза:','   вперёд','   повернуть','конец'];
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="18" y="84" width="84" height="44" rx="11" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>`
        +`${tx(60,112,12.5,grn,v.name||'квадрат',{b:1})}</g>`;
      s+=`<path d="M106 106 H138" stroke="${A}" stroke-width="2.2" opacity=".7"/><path d="M134 102 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<circle class="${pre}Pulse" cx="212" cy="106" r="60" fill="rgba(126,168,255,.08)" stroke="${A}" stroke-width="3"/>`
        +`<circle cx="212" cy="106" r="54" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-width="1.2" opacity=".7"/>`
        +`<path d="M256 152 l24 24" stroke="${A}" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;
      lines.forEach((t,k)=>{
        const y=74+k*22;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.25+0.14*k).toFixed(2)}s">`
          +`<rect x="168" y="${y}" width="${t.length*6+16}" height="18" rx="5" fill="rgba(255,255,255,.05)"/>`
          +`<text x="176" y="${y+13}" font-size="10.5" font-family="'Courier New',monospace" font-weight="bold" fill="${k===0?gold:cyan}">${t}</text></g>`;
      });
      return s;
    }
    if(K==='square'){ /* робот рисует квадрат: след и углы */
      const p="M112 66 H206 V160 H112 Z", L=372;
      let s=`<path d="${p}" fill="none" stroke="${A}" stroke-width="5" opacity=".18"/>`;
      s+=`<path d="${p}" fill="none" stroke="${grn}" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">
            <animate attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;.75;1" dur="4.4s" repeatCount="indefinite"/></path>`;
      [[112,66],[206,66],[206,160],[112,160]].forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.9+k*0.8).toFixed(2)}s"><circle cx="${q[0]}" cy="${q[1]}" r="11" fill="rgba(10,18,36,.96)" stroke="${gold}" stroke-width="1.8"/>`
          +`<text x="${q[0]}" y="${q[1]+4}" text-anchor="middle" font-size="11" font-weight="bold" fill="${gold}">${k+1}</text></g>`;
      });
      s+=`<g><circle r="11" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"/><circle cx="-3.6" cy="-3" r="2.4" fill="#1a2340"/><circle cx="3.6" cy="-3" r="2.4" fill="#1a2340"/>`
        +`<animateMotion dur="4.4s" repeatCount="indefinite" path="${p}"/></g>`;
      s+=`${tx(159,190,11.5,dim,'4 раза: вперёд и повернуть — получился квадрат',{})}`;
      return s;
    }
    if(K==='tower'){ /* башня из трёх вызовов */
      let s=`<g class="${pre}Float"><circle cx="52" cy="176" r="16" fill="${gold}" stroke="#fffdf2" stroke-width="1.8"/>`
        +`<circle cx="46" cy="172" r="3" fill="#1a2340"/><circle cx="58" cy="172" r="3" fill="#1a2340"/></g>`;
      [[128,148,cyan,'1'],[128,104,grn,'2'],[128,60,gold,'3']].forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.55).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${q[0]}" y="${q[1]}" width="76" height="40" rx="8" fill="rgba(126,168,255,.14)" stroke="${q[2]}" stroke-width="2.2"/>`
          +`<path d="M${q[0]+6} ${q[1]+34} h64" stroke="${q[2]}" stroke-width="2" opacity=".7"/></g>`;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.45+k*0.55).toFixed(2)}s"><rect x="216" y="${q[1]+7}" width="82" height="26" rx="8" fill="url(#${pre}card)" stroke="${q[2]}" stroke-width="1.7"/>`
          +`<text x="257" y="${q[1]+24}" text-anchor="middle" font-size="10.5" font-family="'Courier New',monospace" font-weight="bold" fill="${q[2]}">${'квадрат('+q[3]+')'}</text></g>`;
        s+=`<path d="M${q[0]+80} ${q[1]+20} H212" stroke="${q[2]}" stroke-width="1.5" opacity=".45" stroke-dasharray="5 4"/>`;
      });
      s+=`<path d="M68 176 H124" stroke="${A}" stroke-width="2" opacity=".5" class="${pre}Dash"/>`;
      s+=`${tx(159,204,11.5,grn,'три вызова — башня из трёх этажей',{b:1})}`;
      return s;
    }
    if(K==='params'){ /* параметр: одно имя — разные размеры */
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="24" y="24" width="118" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="2"/>`
        +`<text x="83" y="44" text-anchor="middle" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">квадрат(2)</text></g>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.16s" filter="url(#${pre}sh)"><rect x="176" y="24" width="118" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`<text x="235" y="44" text-anchor="middle" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">квадрат(5)</text></g>`;
      s+=`<path d="M83 56 V88" stroke="${cyan}" stroke-width="1.8" opacity=".6" stroke-dasharray="6 5" class="${pre}Dash"/>`
        +`<path d="M235 56 V76" stroke="${gold}" stroke-width="1.8" opacity=".6" stroke-dasharray="6 5" class="${pre}Dash"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s"><rect x="61" y="90" width="44" height="44" rx="4" fill="rgba(126,168,255,.16)" stroke="${cyan}" stroke-width="2.2"/>`
        +`${tx(83,154,10.5,cyan,'маленький',{})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="180" y="78" width="110" height="110" rx="4" fill="rgba(255,215,106,.14)" stroke="${gold}" stroke-width="2.2"/>`
        +`${tx(235,204,10.5,gold,'большой',{})}</g>`;
      s+=`${tx(159,178,11,dim,'одно имя, разные числа → разный результат',{})}`;
      return s;
    }
    if(K==='library'){ /* библиотека алгоритмов */
      const books=[{x:30,h:64,t:'повернуть',c:cyan},{x:100,h:80,t:'квадрат',c:grn,pull:1},{x:172,h:56,t:'башня',c:gold},{x:242,h:70,t:'дорога',c:pur}];
      let s=`<rect x="14" y="152" width="290" height="12" rx="4" fill="rgba(255,255,255,.09)" stroke="#31456f" stroke-width="1"/>`;
      books.forEach((q,k)=>{
        const y=152-q.h;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +(q.pull?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -14;0 -14;0 0" keyTimes="0;.25;.8;1" dur="5s" repeatCount="indefinite"/>`:'')
          +`<rect x="${q.x}" y="${y}" width="58" height="${q.h}" rx="6" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<rect x="${q.x+4}" y="${y+6}" width="50" height="4" rx="2" fill="${q.c}" opacity=".7"/>`
          +`<text transform="translate(${q.x+29},${y+q.h/2+6}) rotate(-90)" text-anchor="middle" font-size="11" font-weight="bold" fill="${q.c}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="3">${q.t}</text>`
          +(q.pull?`<rect class="${pre}Glow" x="${q.x-3}" y="${y-3}" width="64" height="${q.h+6}" rx="9" fill="none" stroke="${q.c}" stroke-width="2" opacity=".5"/>`:'')
          +`</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="20" y="176" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,195,11,dim,'берём готовый алгоритм по имени',{})}</g>`;
      return s;
    }
    if(K==='compare2'){ /* было / стало: длинно и коротко */
      const lh=6.4;
      let s=`<rect x="14" y="30" width="132" height="150" rx="11" fill="rgba(255,120,100,.07)" stroke="${red}" stroke-width="1.8"/>`
        +`<rect x="172" y="30" width="132" height="150" rx="11" fill="rgba(125,224,160,.08)" stroke="${grn}" stroke-width="1.8"/>`;
      s+=`${tx(80,50,11,red,'без помощника',{b:1})}${tx(238,50,11,grn,'с помощником',{b:1})}`;
      s+=`<rect x="60" y="58" width="40" height="20" rx="7" fill="rgba(255,120,100,.16)" stroke="${red}" stroke-width="1.4"/>${tx(80,72,10.5,red,'30',{b:1})}`
        +`<rect x="218" y="58" width="40" height="20" rx="7" fill="rgba(125,224,160,.16)" stroke="${grn}" stroke-width="1.4"/>${tx(238,72,10.5,grn,'6',{b:1})}`;
      for(let k=0;k<18;k++){
        s+=`<rect class="${pre}Slide" style="animation-delay:${(k*0.04).toFixed(2)}s" x="24" y="${80+k*lh}" width="${88-((k*13)%26)}" height="4" rx="2" fill="${red}" opacity=".45"/>`;
      }
      ['квадрат','повернуть','квадрат','повернуть','квадрат','конец'].forEach((t,k)=>{
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.3+k*0.12).toFixed(2)}s"><rect x="182" y="${78+k*17}" width="112" height="13" rx="4" fill="rgba(255,255,255,.05)" stroke="${grn}" stroke-opacity=".45"/>`
          +`<text x="188" y="${88+k*17}" font-size="9.5" font-family="'Courier New',monospace" font-weight="bold" fill="${k===5?'#7f92b6':grn}">${t}</text></g>`;
      });
      s+=`<path d="M152 106 h14 m-4 -5 l5 5 l-5 5" stroke="${A}" stroke-width="2" fill="none"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.9s"><rect x="20" y="188" width="278" height="28" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,207,11.5,grn,'30 строк превратились в 6 — понятнее и короче',{b:1})}</g>`;
      return s;
    }
    if(K==='test513'){ /* проверяем помощника отдельно */
      let s=`<rect x="16" y="30" width="196" height="150" rx="12" fill="rgba(126,168,255,.07)" stroke="${A}" stroke-width="1.8" stroke-dasharray="8 6"/>`
        +`${tx(114,50,11,dim,'проверяем помощника отдельно',{})}`;
      s+=`<g class="${pre}Float"><circle cx="52" cy="122" r="17" fill="${gold}" stroke="#fffdf2" stroke-width="1.8"/>`
        +`<circle cx="46" cy="118" r="3" fill="#1a2340"/><circle cx="58" cy="118" r="3" fill="#1a2340"/></g>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.2s"><rect x="88" y="86" width="108" height="72" rx="9" fill="rgba(8,14,30,.95)" stroke="${grn}" stroke-width="1.8"/>`
        +`<path d="M132 104 H192 V150 H132 Z" fill="none" stroke="${grn}" stroke-width="2.4" stroke-dasharray="180" stroke-dashoffset="180">`
        +`<animate attributeName="stroke-dashoffset" values="180;0;0" keyTimes="0;.6;1" dur="4s" repeatCount="indefinite"/></path>`
        +`<path d="M100 132 H124" stroke="${A}" stroke-width="1.6" opacity=".5" stroke-dasharray="5 4" class="${pre}Dash"/></g>`;
      s+=`<path d="M214 118 H238" stroke="${A}" stroke-width="1.8" opacity=".6"/><path d="M234 114 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.5s" transform="rotate(-12 268 108)"><rect x="240" y="86" width="58" height="44" rx="9" fill="rgba(125,224,160,.16)" stroke="${grn}" stroke-width="2.4"/>`
        +`<path d="M252 108 l7 8 l14 -18" fill="none" stroke="${grn}" stroke-width="3"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.8s"><rect x="20" y="188" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,207,11,dim,'верный помощник — верная и вся программа',{})}</g>`;
      return s;
    }
    if(K==='sort'){ /* интерактив: собери алгоритм по порядку */
      const items=v.items||[], done=(st&&st.seq)?st.seq:[], bad=(st&&typeof st.bad==='number')?st.bad:-1;
      const full=items.length;
      let s=`<g class="${pre}Pop"><rect x="16" y="20" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,40,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.64),ink,v.q||'Собери алгоритм по порядку',{b:1})}</g>`;
      items.forEach((it,k)=>{
        const col=Math.floor(k/3), row=k%3, x=18+row*98, y=60+col*40;
        const pos=done.indexOf(k), placed=pos>=0, isBad=(bad===k);
        const c=placed?grn:(isBad?red:A);
        const bg=placed?'rgba(19,44,35,.97)':(isBad?'rgba(52,22,26,.97)':'rgba(15,25,46,.97)');
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s;cursor:pointer" onclick="infSeq('${lk}',${k},${it.ord})">`
          +`<rect x="${x}" y="${y}" width="94" height="32" rx="9" fill="${bg}" stroke="${c}" stroke-width="2"/>`
          +(placed?`<circle cx="${x+16}" cy="${y+16}" r="10" fill="${grn}" opacity=".28" stroke="${grn}" stroke-width="1.4"/><text x="${x+16}" y="${y+21}" text-anchor="middle" font-size="11" font-weight="bold" fill="${grn}">${pos+1}</text>`
                 :`<circle cx="${x+16}" cy="${y+16}" r="10" fill="rgba(255,255,255,.05)" stroke="${c}" stroke-width="1.3"/>`)
          +`${tx(x+58,y+21,Math.min(10.5,60/Math.max(1,plain(it.t).length)/0.62),placed?grn:ink,it.t,{})}</g>`;
      });
      const sy=148;
      s+=`<rect x="18" y="${sy}" width="284" height="34" rx="10" fill="rgba(10,18,36,.9)" stroke="${A}" stroke-opacity=".45" stroke-width="1.5"/>`
        +`${tx(159,sy-4,9.5,dim,'порядок выполнения',{})}`;
      for(let k=0;k<full;k++){
        const x=24+k*56;
        s+=`<rect x="${x}" y="${sy+6}" width="50" height="22" rx="7" fill="${done[k]!==undefined?'rgba(19,44,35,.98)':'rgba(255,255,255,.04)'}" stroke="${done[k]!==undefined?grn:'#2b3c62'}" stroke-width="1.4"/>`
          +`<text x="${x+25}" y="${sy+21}" text-anchor="middle" font-size="11" font-weight="bold" fill="${done[k]!==undefined?grn:'#5f78a8'}">${k+1}</text>`;
      }
      if(done.length===full) s+=`<g class="${pre}Pop"><rect x="18" y="190" width="284" height="28" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>${tx(159,209,11.5,grn,'Порядок верный! Алгоритм собран.',{b:1})}</g>`;
      else s+=`<g class="${pre}Rise"><rect x="18" y="190" width="284" height="28" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,209,11,dim,bad>=0?'Не тот шаг — подумай, что должно быть раньше':'Нажимай шаги в правильном порядке',{})}</g>`;
      return s;
    }
    if(K==='naming'){ /* правила имени алгоритма */
      const t=[{n:'повернуть',ok:1},{n:'квадрат',ok:1},{n:'алг 1',ok:0},{n:'поворот-на-90-градусов-вправо',ok:0}];
      let s='';
      t.forEach((q,k)=>{
        const y=26+k*38, c=q.ok?grn:red;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<path d="M34 ${y} h${q.ok?212:200} l16 16 l-16 16 H34 z" fill="${q.ok?'rgba(125,224,160,.1)':'rgba(255,120,100,.1)'}" stroke="${c}" stroke-width="1.8"/>`
          +`${tx(q.ok?50:50,y+21,Math.min(11.5,(q.ok?190:150)/Math.max(1,q.n.length)/0.64),c,q.n,{an:'start',b:1})}`
          +`<circle cx="272" cy="${y+16}" r="13" fill="${c}" opacity=".16" stroke="${c}" stroke-width="1.6"/>`
          +(q.ok?`<path d="M266 ${y+16} l5 6 l11 -13" fill="none" stroke="${c}" stroke-width="2.8"/>`
               :`<path d="M266 ${y+11} l12 10 M278 ${y+11} l-12 10" stroke="${c}" stroke-width="2.6" fill="none"/>`)
          +`</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="20" y="182" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,201,10.5,dim,'имя — короткое, понятное, без пробелов',{})}</g>`;
      return s;
    }
    if(K==='summary513'){ /* пирамида: из чего состоит большая программа */
      const lv=[{y:150,w:250,t:'большая программа',c:gold},{y:104,w:190,t:'алгоритмы-помощники',c:grn},{y:58,w:130,t:'команды исполнителя',c:cyan}];
      let s='';
      lv.forEach((q,k)=>{
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.2+0.16*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<path d="M${159-q.w/2} ${q.y} h${q.w} l${(q.w-(q.w-30))/2} -34 h-${q.w-30} z" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2.2"/>`
          +`<rect class="${pre}Spot" style="animation-delay:${(k*0.5).toFixed(2)}s;animation-duration:2.5s" x="${159-q.w/2}" y="${q.y-34}" width="${q.w}" height="34" fill="${q.c}" opacity=".1"/>`
          +`${tx(159,q.y-13,11.5,q.c,q.t,{b:1})}</g>`;
      });
      s+=`<path d="M159 58 V42" stroke="${gold}" stroke-width="2.4" opacity=".8"/><path class="${pre}Twinkle" d="M159 20 l5 12 l12 2 l-9 8 l2 13 l-10 -6 l-10 6 l2 -13 l-9 -8 l12 -2 z" fill="${gold}" opacity=".9"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.75s"><rect x="20" y="188" width="278" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,207,11,dim,'большое строится из маленьких понятных частей',{})}</g>`;
      return s;
    }
    if(K==='text'){ /* текстовые строки — «плакат» */
      const L=(v.lines||[]), n=L.length||1, rh=32, gp=7, tot=n*rh+(n-1)*gp;
      if(n<=2){ /* короткая мысль — крупный медальон и большая строка */
        let s2=`<g opacity=".12" class="${pre}Float">${motif(MOTIF,159,Math.round(H*0.42),Math.min(H*0.6,104),A)}</g>`;
        s2+=`<g filter="url(#${pre}sh)"><rect x="18" y="18" width="282" height="${H-36}" rx="14" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".4" stroke-width="1.6"/>`
          +`<rect x="18" y="18" width="282" height="3.2" rx="1.6" fill="url(#${pre}bar)"/></g>`;
        s2+=`<circle cx="159" cy="66" r="42" fill="${A}" opacity=".1"/><circle cx="159" cy="66" r="30" fill="rgba(10,18,36,.85)" stroke="${A}" stroke-width="2"/>`
          +`<g class="${pre}Twinkle">${icon(iconKey(plain((L[0]||{}).t),0),159,66,A,40)}</g>`;
        const ly0=H-34-(n-1)*30;
        L.forEach((t,k)=>{
          const raw=(t.t!==undefined?t.t:t), txt=plain(raw), len=Math.max(1,txt.length);
          const col=t.c||(t.b?ink:dim), ly=ly0+k*30;
          const fs=t.b?Math.min(17.5,252/(len*0.62)):Math.min(13.5,250/(len*0.6));
          s2+=`<g class="${pre}Rise" style="animation-delay:${(0.12*k).toFixed(2)}s">`
            +`<text x="159" y="${ly}" text-anchor="middle" font-size="${fs.toFixed(1)}" fill="${col}" font-weight="${t.b?'bold':'normal'}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${txt}</text>`
            +(t.b?`<rect x="${(159-Math.min(240,len*fs*0.3)).toFixed(0)}" y="${ly+7}" width="${Math.min(480,len*fs*0.6).toFixed(0)}" height="2.2" rx="1.1" fill="${col}" opacity=".35"/>`:'')
            +`</g>`;
        });
        return s2;
      }
      const y0=Math.max(30,Math.round((H-tot)/2)), py=y0-14, ph=tot+28;
      let s=`<g opacity=".12" class="${pre}Float">${motif(MOTIF,159,Math.round(H/2),Math.min(H*0.6,110),A)}</g>`;
      s+=`<g filter="url(#${pre}sh)"><rect x="16" y="${py}" width="286" height="${ph}" rx="14" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".4" stroke-width="1.6"/>`
        +`<rect x="16" y="${py}" width="286" height="3.2" rx="1.6" fill="url(#${pre}bar)"/></g>`;
      s+=`<rect class="${pre}Scan" style="--scan:${ph-8}px" x="20" y="${py+4}" width="278" height="2" rx="1" fill="${A}" opacity=".18"/>`;
      L.forEach((t,k)=>{
        const y=y0+k*(rh+gp), raw=(t.t!==undefined?t.t:t), txt=plain(raw);
        const len=Math.max(1,txt.length), fs=Math.min(t.b?15.5:14.2, 236/(len*0.62));
        const col=t.c||(t.b?ink:dim), cy2=y+rh/2;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.09*k).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="270" height="${rh}" rx="9" fill="rgba(255,255,255,.035)"/>`
          +`<circle cx="44" cy="${cy2}" r="12" fill="${A}" opacity=".12" stroke="${A}" stroke-opacity=".45" stroke-width="1.2"/>`
          +`<g class="${pre}Twinkle" style="animation-delay:${(0.3*k).toFixed(2)}s">${icon(iconKey(txt,k),44,cy2,col,18)}</g>`
          +`<text x="66" y="${cy2+5}" text-anchor="start" font-size="${fs.toFixed(1)}" fill="${col}" font-weight="${t.b?'bold':'normal'}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${txt}</text>`
          +(t.b?`<rect x="66" y="${cy2+9.5}" width="${Math.min(238, len*fs*0.6).toFixed(0)}" height="2" rx="1" fill="${col}" opacity=".35"/>`:'')
          +`<path d="M222 ${y+rh-1} h14 M244 ${y+rh-1} h14" stroke="${A}" stroke-width="1.4" opacity=".25"/></g>`;
      });
      return s;
    }
    return '';
  }
  function vizH(v){ /* высота под визуализацию */
    const K=v.kind;
    if(K==='cards') return Math.max(120, Math.ceil((v.items||[]).length/2)*68+16);
    if(K==='ipo') return 152;
    if(K==='bits') return 172;
    if(K==='binary') return 158;
    if(K==='codes') return 158;
    if(K==='steps') return Math.max(120, (v.steps||[]).length*34+22);
    if(K==='robot') return 40+6*34+30;
    if(K==='loop') return 206;
    if(K==='cond') return 202;
    if(K==='flow') return ((v.shapes||[]).length===1)?200:Math.max(120, (v.shapes||[]).length*48+20);
    if(K==='code') return Math.max(110, 42+(v.lines||[]).length*24+16);
    if(K==='quest') return 214;
    if(K==='comboscheme') return 246;
    if(K==='pseudo') return (v.rows||[]).length*25+68;
    if(K==='split') return 226;
    if(K==='gears') return 206;
    if(K==='gate') return 272;
    if(K==='sensor') return 202;
    if(K==='shelves') return 190;
    if(K==='nest') return 232;
    if(K==='debugger') return (v.lines||[]).length*26+108;
    if(K==='tests') return 34+(v.runs||[]).length*50+26;
    if(K==='belt') return 212;
    if(K==='mindmap') return 226;
    if(K==='pick') return 70+(v.opts||[]).length*40+48;
    if(K==='var') return 186;
    if(K==='assign') return 194;
    if(K==='input') return 190;
    if(K==='while') return (v.warn||v.pre)?232:214;
    if(K==='trace') return 26+27+(v.rows||[]).length*27+44;
    if(K==='compare') return 208;
    if(K==='text') return ((v.lines||[]).length<=2)?(132+26*(v.lines||[]).length):Math.max(134, (v.lines||[]).length*39+54);
    if(K==='bigtask') return 226;
    if(K==='plan') return 216;
    if(K==='recipe') return 200;
    if(K==='helper') return 214;
    if(K==='call') return 216;
    if(K==='zoom') return 200;
    if(K==='square') return 202;
    if(K==='tower') return 214;
    if(K==='params') return 218;
    if(K==='library') return 214;
    if(K==='compare2') return 226;
    if(K==='test513') return 226;
    if(K==='sort') return 70+((v.items||[]).length>3?2:1)*40+136;
    if(K==='naming') return 220;
    if(K==='summary513') return 226;
    if(K==='machine') return 216;
    if(K==='rain') return 212;
    return 180;
  }
  /* ---------- данные 10 уроков ---------- */
  const LESSONS=[
    { id:500, title:'Что такое информация и компьютер', ico:'💡', src:'Информатика · 5–6 класс · С нуля: информация',
      explain:[
        'Информация — это сведения об окружающем мире: текст, число, картинка, звук, видео.',
        'Человек получает информацию органами чувств: глазами видит, ушами слышит, носом чувствует запах.',
        'Компьютер — это машина, которая хранит, обрабатывает и передаёт информацию.',
        'Работа компьютера идёт по схеме: ВВОД → ОБРАБОТКА → ВЫВОД.',
        'Ввод — это когда информацию «заносят» в компьютер: клавиатура, мышь, камера, микрофон.',
        'Обработка — компьютер выполняет программу и меняет информацию.',
        'Вывод — результат показывают обратно: экран, колонки, принтер.',
        'Пример: нажимаем клавишу (ввод) → программа считает (обработка) → на экране буква (вывод).',
        'Компьютер сам ничего не «понимает»: он делает только то, что заложил человек в программе.',
        'Проверь себя: назови, что здесь ввод, обработка и вывод.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Информация', v:{kind:'cards', items:[{t:'📝 текст', d:'слова, буквы', c:cyan},{t:'🔢 число', d:'цифры', c:gold},{t:'🖼 картинка', d:'изображение', c:grn},{t:'🔊 звук', d:'музыка, речь', c:pur}]}, r:'Информация — это сведения об окружающем мире.'},
        {h:'Как мы получаем', v:{kind:'cards', items:[{t:'👁 зрение', c:cyan},{t:'👂 слух', c:gold},{t:'👃 запах', c:grn},{t:'✋ осязание', c:pur}]}, r:'Информацию человек получает органами чувств.'},
        {h:'Компьютер', v:{kind:'machine'}, r:'Компьютер хранит, обрабатывает и передаёт информацию.'},
        {h:'Схема работы', v:{kind:'ipo'}, r:'ВВОД → ОБРАБОТКА → ВЫВОД.'},
        {h:'Ввод', v:{kind:'cards', items:[{t:'⌨ клавиатура', c:cyan},{t:'🖱 мышь', c:cyan},{t:'📷 камера', c:cyan},{t:'🎤 микрофон', c:cyan}]}, r:'Ввод — информация попадает в компьютер.'},
        {h:'Обработка', v:{kind:'text', lines:[{t:'Компьютер выполняет программу', b:1},{t:'и меняет информацию', b:1},{t:'(считает, ищет, рисует)', c:dim}]}, r:'Обработка — компьютер работает с информацией по программе.'},
        {h:'Вывод', v:{kind:'cards', items:[{t:'🖥 экран', c:grn},{t:'🔊 колонки', c:grn},{t:'🖨 принтер', c:grn},{t:'📽 проектор', c:grn}]}, r:'Вывод — результат показывают обратно.'},
        {h:'Пример', v:{kind:'ipo'}, r:'Клавиша → программа → буква на экране.'},
        {h:'Важно', v:{kind:'text', lines:[{t:'Компьютер сам не «понимает»', b:1, c:red},{t:'Он делает только то, что', c:dim},{t:'заложил человек в программе', b:1, c:grn}]}, r:'Компьютер выполняет команды человека.'},
        {h:'Тренажёр', v:{kind:'cards', items:[{t:'ВВОД?', d:'клавиатура', c:cyan},{t:'ВЫВОД?', d:'экран', c:grn}]}, r:'Различай ввод, обработку и вывод.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'информация', b:1},{t:'текст · число · картинка · звук', c:dim},{t:'ВВОД → ОБРАБОТКА → ВЫВОД', c:grn, b:1}]}, r:'Запомни три шага работы компьютера.'} ],
      check:{ q:'Что компьютер делает с информацией?', choices:['хранит, обрабатывает, передаёт','только рисует','ничего'], ans:0, exp:'Компьютер хранит, обрабатывает и передаёт информацию.' },
      tasks:[
        {q:'Что из этого — ВВОД информации?', kind:'choice', choices:['клавиатура','экран','принтер','колонки'], ans:0, tol:0, hints:['Ввод — информация попадает В компьютер.','Клавиатура вводит.'], sol:'клавиатура'},
        {q:'Что из этого — ВЫВОД информации?', kind:'choice', choices:['экран','мышь','камера','микрофон'], ans:0, tol:0, hints:['Вывод — результат ИЗ компьютера.','Экран показывает.'], sol:'экран'}
      ] },
    { id:501, title:'Как компьютер хранит данные: бит, 0 и 1', ico:'💾', src:'Информатика · 5–6 класс · С нуля: биты',
      explain:[
        'Внутри компьютера нет букв и картинок — только электрические сигналы.',
        'Сигнал может быть «есть» или «нет». Это записывают как 1 (есть ток) и 0 (нет тока).',
        'Бит — самая маленькая единица информации: это один 0 или одна 1.',
        'Бит можно представить выключателем: включён = 1, выключен = 0.',
        'Один бит хранит очень мало — только «да/нет». Поэтому биты объединяют.',
        '8 бит = 1 байт. Байт — это уже «кирпичик» памяти.',
        'В одном байте можно закодировать одну букву или один маленький символ.',
        'Любая информация — буква, картинка, музыка — хранится как длинная цепочка 0 и 1.',
        'Чем длиннее цепочка бит, тем больше разных значений она кодирует.',
        'Проверь себя: сколько бит в одном байте?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Внутри компьютера', v:{kind:'text', lines:[{t:'Только сигналы:', b:1},{t:'есть ток · нет тока', c:cyan, b:1},{t:'Любая информация — из них!', c:dim}]}, r:'Компьютер хранит всё как сигналы.'},
        {h:'0 и 1', v:{kind:'bits', bits:[1,0]}, r:'Есть ток = 1, нет тока = 0.'},
        {h:'Что такое бит', v:{kind:'text', lines:[{t:'БИТ — один 0 или одна 1', b:1, c:gold},{t:'самая маленькая единица', c:dim},{t:'информации', c:dim}]}, r:'Бит — самая маленькая единица информации.'},
        {h:'Бит = выключатель', v:{kind:'bits', bits:[1,1,0,0]}, r:'Включён = 1, выключен = 0.'},
        {h:'Мало бит', v:{kind:'text', lines:[{t:'Один бит = только «да/нет»', b:1},{t:'Поэтому биты объединяют', c:dim},{t:'в группы', c:dim}]}, r:'Из одного бита мало что закодируешь.'},
        {h:'Байт', v:{kind:'text', lines:[{t:'8 бит = 1 байт', b:1, c:grn},{t:'байт — «кирпичик» памяти', c:dim}]}, r:'8 бит = 1 байт.'},
        {h:'Байт хранит букву', v:{kind:'cards', items:[{t:'1 байт', d:'= 1 буква', c:grn},{t:'1 байт', d:'= 8 бит', c:blu}]}, r:'В одном байте — одна буква.'},
        {h:'Всё — это 0 и 1', v:{kind:'rain'}, r:'Буквы, картинки, музыка — всё цепочки 0 и 1.'},
        {h:'Длиннее — больше', v:{kind:'text', lines:[{t:'Больше бит → больше значений', b:1},{t:'2 бита → 4 значения', c:cyan},{t:'3 бита → 8 значений', c:grn}]}, r:'Чем длиннее цепочка, тем больше вариантов.'},
        {h:'Тренажёр', v:{kind:'bits', bits:[1,0,1,0]}, r:'1 байт = 8 бит.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'1 бит = 0 или 1', b:1},{t:'1 байт = 8 бит', c:grn, b:1},{t:'всё хранится как 0 и 1', c:dim}]}, r:'Запомни: бит, байт, 0 и 1.'} ],
      check:{ q:'Сколько бит в одном байте?', choices:['8','10','1'], ans:0, exp:'1 байт = 8 бит.' },
      tasks:[
        {q:'Сколько бит в одном байте?', kind:'unit', ans:8, tol:0, hints:['Приставка байт = 8 бит.','8.'], sol:'8 бит'},
        {q:'Что хранит один бит?', kind:'choice', choices:['0 или 1','букву','слово','картинку'], ans:0, tol:0, hints:['Бит — самый маленький.','Только 0 или 1.'], sol:'0 или 1'}
      ] },
    { id:502, title:'Двоичные числа: считаем в 0 и 1', ico:'🔟', src:'Информатика · 5–6 класс · С нуля: двоичная система',
      explain:[
        'Обычные числа — десятичные: в них цифры от 0 до 9.',
        'В компьютере есть только 0 и 1 — это двоичные числа.',
        'В десятичных числах разряды: 1, 10, 100… В двоичных: 1, 2, 4, 8, 16…',
        'Каждый разряд двоичного числа — это удвоение: 1, 2, 4, 8.',
        'Чтобы перевести двоичное число в обычное — складываем разряды, где стоит 1.',
        'Пример: 101₂ = 4 + 0 + 1 = 5. Единица в разряде 4 и в разряде 1.',
        'Пример: 110₂ = 4 + 2 + 0 = 6.',
        'Пример: 111₂ = 4 + 2 + 1 = 7.',
        'Так компьютер «понимает» числа: они собраны из 0 и 1.',
        'Проверь себя: чему равно 101₂?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Десятичные числа', v:{kind:'text', lines:[{t:'цифры 0…9', b:1, c:cyan},{t:'разряды: 1, 10, 100…', c:dim}]}, r:'В обычных числах 10 цифр.'},
        {h:'Двоичные числа', v:{kind:'text', lines:[{t:'только 0 и 1', b:1, c:grn},{t:'разряды: 1, 2, 4, 8…', c:dim}]}, r:'В двоичных числах только две цифры.'},
        {h:'Разряды', v:{kind:'binary', powers:[8,4,2,1], bits:[0,0,0,0]}, r:'Двоичные разряды: 1, 2, 4, 8 (удвоение).'},
        {h:'Правило перевода', v:{kind:'text', lines:[{t:'Сложи разряды,', b:1},{t:'где стоит 1', b:1, c:grn}]}, r:'Складываем разряды с единицами.'},
        {h:'Пример 101', v:{kind:'binary', powers:[4,2,1], bits:[1,0,1]}, r:'101₂ = 4 + 0 + 1 = 5.'},
        {h:'Пример 110', v:{kind:'binary', powers:[4,2,1], bits:[1,1,0]}, r:'110₂ = 4 + 2 + 0 = 6.'},
        {h:'Пример 111', v:{kind:'binary', powers:[4,2,1], bits:[1,1,1]}, r:'111₂ = 4 + 2 + 1 = 7.'},
        {h:'Как понимает компьютер', v:{kind:'text', lines:[{t:'числа собраны из 0 и 1', b:1},{t:'по разрядам 1,2,4,8', c:dim}]}, r:'Компьютер считает по разрядам.'},
        {h:'Ещё числа', v:{kind:'binary', powers:[4,2,1], bits:[0,1,0]}, r:'010₂ = 2.'},
        {h:'Тренажёр', v:{kind:'binary', powers:[4,2,1], bits:[1,0,0]}, r:'100₂ = 4.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'двоичные — 0 и 1', b:1},{t:'разряды 1,2,4,8', c:cyan},{t:'сложи разряды с 1', c:grn, b:1}]}, r:'Перевод: складываем разряды с единицами.'} ],
      check:{ q:'Чему равно 101₂?', choices:['5','3','7'], ans:0, exp:'101₂ = 4 + 0 + 1 = 5.' },
      tasks:[
        {q:'Чему равно 110₂?', kind:'unit', ans:6, tol:0, hints:['Разряды 4,2,1.','4 + 2 = 6.'], sol:'110₂ = 6'},
        {q:'Чему равно 111₂?', kind:'choice', choices:['7','6','3','5'], ans:0, tol:0, hints:['4+2+1.','7.'], sol:'111₂ = 7'}
      ] },
    { id:503, title:'Кодирование текста: буква = число', ico:'🔤', src:'Информатика · 5–6 класс · С нуля: кодирование',
      explain:[
        'Компьютер хранит буквы не как буквы, а как числа — коды.',
        'Есть таблица кодов: каждой букве сопоставлено число.',
        'Например, по номеру в алфавите: А = 1, Б = 2, В = 3 …',
        'Слово — это цепочка кодов: «КОТ» → К, О, Т.',
        'Посчитаем: К — 12-я буква, О — 16-я, Т — 20-я.',
        'Значит «КОТ» кодируется как 12 16 20.',
        'Чтобы раскодировать — по числу находим букву в таблице.',
        'Так же кодируют любую информацию: картинки, звуки (но там свои таблицы).',
        'Главное: компьютер превращает всё в числа, а числа — в 0 и 1.',
        'Проверь себя: какая буква стоит под номером 1?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Буквы как числа', v:{kind:'text', lines:[{t:'Компьютер хранит буквы', b:1},{t:'как ЧИСЛА (коды)', b:1, c:pur}]}, r:'Каждой букве — своё число.'},
        {h:'Таблица кодов', v:{kind:'codes', pairs:[['А','1'],['Б','2'],['В','3'],['Г','4']]}, r:'Есть таблица код ↔ буква.'},
        {h:'Буква по номеру', v:{kind:'codes', pairs:[['К','12'],['О','16'],['Т','20']]}, r:'К — 12-я, О — 16-я, Т — 20-я.'},
        {h:'Слово = цепочка', v:{kind:'text', lines:[{t:'«КОТ» → К, О, Т', b:1},{t:'это три буквы — три кода', c:dim}]}, r:'Слово — цепочка кодов.'},
        {h:'Считаем КОТ', v:{kind:'codes', pairs:[['К','12'],['О','16'],['Т','20']]}, r:'«КОТ» = 12 16 20.'},
        {h:'Собираем код', v:{kind:'text', lines:[{t:'К=12 · О=16 · Т=20', b:1, c:pur},{t:'→ 12 16 20', b:1, c:grn}]}, r:'Получилась цепочка чисел.'},
        {h:'Раскодировать', v:{kind:'text', lines:[{t:'по числу находим букву', b:1},{t:'12 → К', c:cyan}]}, r:'Обратно: число → буква.'},
        {h:'Другая информация', v:{kind:'cards', items:[{t:'🖼 картинка', d:'свои коды', c:grn},{t:'🔊 звук', d:'свои коды', c:gold}]}, r:'У каждого вида — своя таблица кодов.'},
        {h:'Главное', v:{kind:'rain'}, r:'Компьютер превращает всё в числа, потом в 0 и 1.'},
        {h:'Тренажёр', v:{kind:'codes', pairs:[['А','1'],['Б','2']]}, r:'Под номером 1 — буква А.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'буква = число (код)', b:1},{t:'слово = цепочка кодов', c:dim},{t:'всё → числа → 0 и 1', c:grn, b:1}]}, r:'Запомни: буква кодируется числом.'} ],
      check:{ q:'Какая буква стоит под номером 1?', choices:['А','Б','В'], ans:0, exp:'А = 1.' },
      tasks:[
        {q:'«КОТ» → 12 16 20. Какое число у буквы О?', kind:'unit', ans:16, tol:0, hints:['О — 16-я буква.','16.'], sol:'16'},
        {q:'Если Б = 2, то какая это буква?', kind:'choice', choices:['Б','А','В','Г'], ans:0, tol:0, hints:['Номер 2 — вторая буква.','Б.'], sol:'Б'}
      ] },
    { id:504, title:'Алгоритм: шаги и порядок', ico:'📋', src:'Информатика · 5–6 класс · С нуля: алгоритм',
      explain:[
        'Алгоритм — это точная последовательность шагов для решения задачи.',
        'Каждый шаг — простое и понятное действие, которое исполнитель умеет делать.',
        'Порядок шагов очень важен: если поменять — получится неверно.',
        'Пример алгоритма: «заварить чай» — шаги идут строго по порядку.',
        'Алгоритм должен быть конечным: рано или поздно он заканчивается.',
        'Алгоритм должен быть точным: без «примерно» и «как-нибудь».',
        'Алгоритм должен быть понятным исполнителю: он умеет эти команды.',
        'Алгоритм записывают словами, блок-схемой или программой.',
        'Один и тот же результат можно получить разными алгоритмами.',
        'Проверь себя: можно ли менять шаги алгоритма местами?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что такое алгоритм', v:{kind:'text', lines:[{t:'последовательность шагов', b:1, c:gold},{t:'для решения задачи', b:1}]}, r:'Алгоритм — шаги для решения задачи.'},
        {h:'Каждый шаг прост', v:{kind:'text', lines:[{t:'один шаг — одно действие', b:1},{t:'и оно понятно исполнителю', c:dim}]}, r:'Шаг — простое понятное действие.'},
        {h:'Порядок важен', v:{kind:'steps', steps:['взять чашку','положить чай','налить кипяток','подождать']}, r:'Поменяешь шаги — будет неверно.'},
        {h:'Пример', v:{kind:'steps', steps:['открыть тетрадь','взять ручку','написать дату']}, r:'Шаги идут строго по порядку.'},
        {h:'Конечность', v:{kind:'text', lines:[{t:'алгоритм заканчивается', b:1, c:grn},{t:'(конечное число шагов)', c:dim}]}, r:'Алгоритм конечен.'},
        {h:'Точность', v:{kind:'text', lines:[{t:'всё точно', b:1},{t:'без «как-нибудь»', c:red}]}, r:'Алгоритм точный.'},
        {h:'Понятность', v:{kind:'text', lines:[{t:'исполнитель умеет', b:1},{t:'эти команды', c:grn}]}, r:'Команды должны быть понятны.'},
        {h:'Как записать', v:{kind:'cards', items:[{t:'словами', c:blu},{t:'блок-схемой', c:pur},{t:'программой', c:cyan},{t:'таблицей', c:gold}]}, r:'Алгоритм записывают по-разному.'},
        {h:'Разные пути', v:{kind:'text', lines:[{t:'один результат —', b:1},{t:'разные алгоритмы', c:dim}]}, r:'Результат один, способы разные.'},
        {h:'Тренажёр', v:{kind:'steps', steps:['начало','действие','конец']}, r:'Шаги нельзя менять без причины.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'алгоритм = шаги', b:1},{t:'конечный · точный · понятный', c:cyan},{t:'порядок важен', c:gold, b:1}]}, r:'Запомни свойства алгоритма.'} ],
      check:{ q:'Можно ли менять шаги алгоритма местами?', choices:['нет, порядок важен','да, всегда','только 2 раза'], ans:0, exp:'Порядок шагов важен.' },
      tasks:[
        {q:'Что такое алгоритм?', kind:'choice', choices:['последовательность шагов','одно число','картинка','буква'], ans:0, tol:0, hints:['Это план действий.','Последовательность шагов.'], sol:'последовательность шагов'},
        {q:'Свойство алгоритма: он должен быть…', kind:'choice', choices:['конечным','бесконечным','случайным','секретным'], ans:0, tol:0, hints:['Рано или поздно заканчивается.','Конечным.'], sol:'конечным'}
      ] },
    { id:505, title:'Исполнитель и команды', ico:'🤖', src:'Информатика · 5–6 класс · С нуля: исполнитель',
      explain:[
        'Исполнитель — это тот, кто выполняет команды: робот, черепашка, человек.',
        'У каждого исполнителя есть список команд, которые он умеет (СКИ).',
        'У робота команды: вперёд, назад, влево, вправо.',
        'Команды выполняются по порядку — сверху вниз.',
        'Робот не думает: он делает ровно то, что написано в командах.',
        'Чтобы решить задачу, надо заранее спланировать путь робота.',
        'Если команда неверная — робот пойдёт не туда или ударится.',
        'Робот работает на клетчатом поле — двигается по клеткам.',
        'Программа для робота — это список его команд по порядку.',
        'Проверь себя: что делает исполнитель?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Кто такой исполнитель', v:{kind:'text', lines:[{t:'тот, кто выполняет', b:1},{t:'команды', b:1, c:cyan}]}, r:'Исполнитель выполняет команды.'},
        {h:'Список команд', v:{kind:'cards', items:[{t:'⬆ вперёд', c:grn},{t:'⬅ влево', c:blu},{t:'➡ вправо', c:blu},{t:'⬇ назад', c:grn}]}, r:'У исполнителя есть свой набор команд.'},
        {h:'Команды робота', v:{kind:'robot', pos:[0,5], path:[[0,5],[0,4],[0,3]]}, r:'Робот идёт по клеткам: вперёд, влево, вправо.'},
        {h:'По порядку', v:{kind:'steps', steps:['вперёд','вперёд','вправо','вперёд']}, r:'Команды выполняются по порядку.'},
        {h:'Робот не думает', v:{kind:'text', lines:[{t:'делает ровно то,', b:1},{t:'что написано', b:1, c:gold}]}, r:'Робот выполняет буквально команды.'},
        {h:'Планируй путь', v:{kind:'robot', pos:[0,5], walls:[[2,3],[2,4]], path:[[0,5],[1,5],[2,5]]}, r:'Сначала спланируй путь, потом давай команды.'},
        {h:'Ошибка', v:{kind:'text', lines:[{t:'неверная команда →', b:1},{t:'робот идёт не туда', c:red}]}, r:'Ошибка в команде — робот ошибётся.'},
        {h:'Поле', v:{kind:'robot', pos:[0,0], path:[[0,0],[1,0],[2,0],[3,0]]}, r:'Робот двигается по клеткам поля.'},
        {h:'Программа', v:{kind:'code', lines:[{t:'вперёд', c:cyan},{t:'вперёд', c:cyan},{t:'вправо', c:gold},{t:'вперёд', c:cyan}]}, r:'Программа — список команд по порядку.'},
        {h:'Тренажёр', v:{kind:'robot', pos:[0,3], path:[[0,3],[1,3],[1,2]]}, r:'Исполнитель выполняет команды.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'исполнитель = выполняет', b:1},{t:'у него есть команды (СКИ)', c:cyan},{t:'по порядку, буквально', c:dim}]}, r:'Запомни: исполнитель делает команды.'} ],
      check:{ q:'Что делает исполнитель?', choices:['выполняет команды','придумывает задачи','пишет учебник'], ans:0, exp:'Исполнитель выполняет команды.' },
      tasks:[
        {q:'Кто выполняет команды?', kind:'choice', choices:['исполнитель','учебник','экран','мышь'], ans:0, tol:0, hints:['Робот/черепашка.','Исполнитель.'], sol:'исполнитель'},
        {q:'Как робот выполняет команды?', kind:'choice', choices:['по порядку','как захочет','случайно','задом наперёд'], ans:0, tol:0, hints:['Сверху вниз.','По порядку.'], sol:'по порядку'}
      ] },
    { id:506, title:'Повторение: циклы', ico:'🔁', src:'Информатика · 5–6 класс · С нуля: циклы',
      explain:[
        'Часто нужно повторить одно и то же действие много раз.',
        'Чтобы не писать команду 100 раз, придумали ЦИКЛ — повторение.',
        'Цикл записывают так: «Повтори 4 раза: вперёд».',
        'Цикл сильно короче, чем много одинаковых команд.',
        'Пример: чтобы нарисовать квадрат, повторяем «вперёд и повернуть» 4 раза.',
        'Число в цикле говорит, сколько раз повторить тело цикла.',
        'Тело цикла — это команды, которые повторяются.',
        'Если число повторов известно — это цикл «со счётчиком».',
        'Циклы экономят место и делают программу понятнее.',
        'Проверь себя: что такое цикл?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Повтор нужен часто', v:{kind:'text', lines:[{t:'одно действие', b:1},{t:'много раз', b:1, c:gold}]}, r:'Одинаковые действия повторяются.'},
        {h:'Проблема', v:{kind:'code', lines:[{t:'вперёд'},{t:'вперёд'},{t:'вперёд'},{t:'вперёд'}]}, r:'Писать одно и то же долго.'},
        {h:'Цикл', v:{kind:'loop', n:4, body:'вперёд'}, r:'Цикл: «Повтори 4 раза: вперёд».'},
        {h:'Короче', v:{kind:'text', lines:[{t:'цикл короче', b:1, c:grn},{t:'чем 100 команд', c:dim}]}, r:'Цикл экономит запись.'},
        {h:'Квадрат', v:{kind:'text', lines:[{t:'Повтори 4 раза:', b:1},{t:'вперёд и повернуть', c:cyan}]}, r:'Квадрат — 4 повтора.'},
        {h:'Число повторов', v:{kind:'loop', n:3, body:'вправо'}, r:'Число в цикле — сколько повторов.'},
        {h:'Тело цикла', v:{kind:'text', lines:[{t:'тело цикла —', b:1},{t:'что повторяется', b:1, c:grn}]}, r:'Тело цикла повторяется.'},
        {h:'Цикл со счётчиком', v:{kind:'loop', n:5, body:'вперёд'}, r:'Известное число повторов — цикл со счётчиком.'},
        {h:'Экономия', v:{kind:'text', lines:[{t:'короче и понятнее', b:1, c:grn}]}, r:'Циклы делают программу короче.'},
        {h:'Тренажёр', v:{kind:'loop', n:4, body:'вперёд'}, r:'Цикл — повторение команд.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'цикл = повторение', b:1},{t:'повтори N раз: …', c:gold, b:1},{t:'тело цикла повторяется', c:dim}]}, r:'Запомни: цикл повторяет.'} ],
      check:{ q:'Что такое цикл?', choices:['повторение команд','одна команда','ошибка'], ans:0, exp:'Цикл — повторение команд.' },
      tasks:[
        {q:'«Повтори 4 раза: вперёд». Сколько раз робот пойдёт вперёд?', kind:'unit', ans:4, tol:0, hints:['Число в цикле.','4.'], sol:'4'},
        {q:'Зачем нужен цикл?', kind:'choice', choices:['повторять без лишних команд','рисовать','считать','запускать'], ans:0, tol:0, hints:['Экономит запись.','Повторяет.'], sol:'повторять'}
      ] },
    { id:507, title:'Выбор: условия «если…то…»', ico:'🔀', src:'Информатика · 5–6 класс · С нуля: условия',
      explain:[
        'Иногда команду надо выполнить не всегда, а только при условии.',
        'Условие — это проверка, которая даёт ответ «да» или «нет».',
        'Записывают так: «ЕСЛИ условие ТО команда».',
        'Команда выполняется только тогда, когда условие истинно (да).',
        'Если условие ложно (нет) — команда пропускается.',
        'Пример: ЕСЛИ впереди стена ТО повернуть.',
        'Робот сначала проверяет условие, потом решает, делать ли команду.',
        'Бывает «иначе»: ЕСЛИ … ТО … ИНАЧЕ … — выбор из двух.',
        'Условия делают программу «умнее»: она реагирует на ситуацию.',
        'Проверь себя: когда выполняется команда после «если»?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Не всегда', v:{kind:'text', lines:[{t:'иногда команда нужна', b:1},{t:'только при условии', b:1, c:pur}]}, r:'Команда может зависеть от условия.'},
        {h:'Условие', v:{kind:'text', lines:[{t:'проверка: да или нет', b:1, c:cyan}]}, r:'Условие даёт «да» или «нет».'},
        {h:'Запись', v:{kind:'cond', q:'впереди стена?', then:'повернуть'}, r:'ЕСЛИ условие ТО команда.'},
        {h:'Когда работает', v:{kind:'text', lines:[{t:'если условие ИСТИННО —', b:1},{t:'команда выполняется', b:1, c:grn}]}, r:'Команда работает при истине.'},
        {h:'Когда не работает', v:{kind:'text', lines:[{t:'если условие ЛОЖНО —', b:1},{t:'команда пропускается', c:red, b:1}]}, r:'При лжи — пропуск.'},
        {h:'Пример', v:{kind:'cond', q:'впереди стена?', then:'повернуть'}, r:'Проверил — и решил.'},
        {h:'Сначала проверка', v:{kind:'steps', steps:['проверить условие','если да — сделать','если нет — пропустить']}, r:'Сначала проверка, потом действие.'},
        {h:'Иначе', v:{kind:'text', lines:[{t:'ЕСЛИ … ТО …', b:1, c:grn},{t:'ИНАЧЕ …', b:1, c:red}]}, r:'«Иначе» — второй вариант.'},
        {h:'Умнее', v:{kind:'text', lines:[{t:'программа реагирует', b:1},{t:'на ситуацию', c:dim}]}, r:'Условия делают программу умнее.'},
        {h:'Тренажёр', v:{kind:'cond', q:'светло?', then:'идти'}, r:'При истине — делаем.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'ЕСЛИ условие ТО команда', b:1},{t:'да → делать · нет → пропустить', c:cyan}]}, r:'Запомни: условие — это «да/нет».'} ],
      check:{ q:'Когда выполняется команда после «если»?', choices:['когда условие истинно','всегда','никогда'], ans:0, exp:'Только при истинном условии.' },
      tasks:[
        {q:'ЕСЛИ впереди стена ТО повернуть. Когда робот повернёт?', kind:'choice', choices:['когда впереди стена','всегда','никогда','через 5 шагов'], ans:0, tol:0, hints:['Стена → условие истинно.','Когда стена.'], sol:'когда стена'},
        {q:'Условие даёт ответ…', kind:'choice', choices:['да или нет','число 100','букву','картинку'], ans:0, tol:0, hints:['Проверка.','Да/нет.'], sol:'да или нет'}
      ] },
    { id:508, title:'Блок-схемы алгоритмов', ico:'🗂', src:'Информатика · 5–6 класс · С нуля: блок-схемы',
      explain:[
        'Блок-схема — это алгоритм, нарисованный фигурами и стрелками.',
        'Овал означает НАЧАЛО и КОНЕЦ алгоритма.',
        'Прямоугольник — обычное действие (команда).',
        'Ромб — условие (проверка «да/нет»).',
        'Параллелограмм — ввод или вывод данных.',
        'Стрелки показывают порядок: куда идти дальше.',
        'Читаем блок-схему сверху вниз по стрелкам.',
        'Из ромба выходят две стрелки: «да» и «нет».',
        'Блок-схема помогает увидеть алгоритм целиком.',
        'Проверь себя: какой фигурой обозначают условие?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что это', v:{kind:'text', lines:[{t:'алгоритм из фигур', b:1},{t:'и стрелок', b:1, c:cyan}]}, r:'Блок-схема — рисунок алгоритма.'},
        {h:'Начало и конец', v:{kind:'flow', shapes:[{k:'o',t:'начало',c:grn},{k:'o',t:'конец',c:red}]}, r:'Овал = начало/конец.'},
        {h:'Действие', v:{kind:'flow', shapes:[{k:'r',t:'взять ручку',c:blu}]}, r:'Прямоугольник = действие.'},
        {h:'Условие', v:{kind:'flow', shapes:[{k:'d',t:'стена?',c:pur}]}, r:'Ромб = условие.'},
        {h:'Ввод / вывод', v:{kind:'flow', shapes:[{k:'r',t:'прочитать число',c:gold},{k:'r',t:'показать ответ',c:grn}]}, r:'Параллелограмм = ввод/вывод.'},
        {h:'Стрелки', v:{kind:'flow', shapes:[{k:'r',t:'шаг 1',c:blu},{k:'r',t:'шаг 2',c:blu}]}, r:'Стрелки показывают порядок.'},
        {h:'Читаем сверху', v:{kind:'flow', shapes:[{k:'o',t:'начало',c:grn},{k:'r',t:'действие',c:blu},{k:'o',t:'конец',c:red}]}, r:'Читаем сверху вниз.'},
        {h:'Да и нет', v:{kind:'flow', shapes:[{k:'d',t:'условие?',c:pur},{k:'r',t:'действие',c:grn}]}, r:'Из ромба — две стрелки: да и нет.'},
        {h:'Помогает увидеть', v:{kind:'text', lines:[{t:'вся программа', b:1},{t:'как на ладони', c:dim}]}, r:'Блок-схема видна целиком.'},
        {h:'Тренажёр', v:{kind:'flow', shapes:[{k:'d',t:'?',c:pur}]}, r:'Условие — это ромб.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'овал — начало/конец', b:1},{t:'прямоуг. — действие', c:blu},{t:'ромб — условие', c:pur, b:1}]}, r:'Запомни фигуры блок-схемы.'} ],
      check:{ q:'Какой фигурой обозначают условие?', choices:['ромбом','овалом','квадратом'], ans:0, exp:'Условие — ромб.' },
      tasks:[
        {q:'Чем на блок-схеме обозначают действие?', kind:'choice', choices:['прямоугольником','овалом','ромбом','кругом'], ans:0, tol:0, hints:['Обычная команда.','Прямоугольник.'], sol:'прямоугольник'},
        {q:'Чем обозначают начало и конец?', kind:'choice', choices:['овалом','ромбом','линией','стрелкой'], ans:0, tol:0, hints:['Круглая фигура.','Овал.'], sol:'овал'}
      ] },
    { id:509, title:'Первая программа', ico:'💻', src:'Информатика · 5–6 класс · С нуля: первая программа',
      explain:[
        'Программа — это алгоритм, записанный на языке, понятном компьютеру.',
        'Программа состоит из команд (строк), которые выполняются по порядку.',
        'Одна из главных команд — ВЫВЕСТИ (показать на экране текст).',
        'Пример: команда «вывести "Привет"» покажет на экране слово Привет.',
        'Команды можно повторять с помощью цикла.',
        'Пример: «повтори 3 раза: вывести Привет» покажет Привет три раза.',
        'В программе важен порядок строк — компьютер читает сверху вниз.',
        'Ошибка в программе — компьютер сделает не то или остановится.',
        'Программу пишут на языке программирования (Python, Scratch и других).',
        'Проверь себя: что делает команда «вывести»?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что такое программа', v:{kind:'text', lines:[{t:'алгоритм для компьютера', b:1},{t:'записанный командами', b:1, c:cyan}]}, r:'Программа — алгоритм для компьютера.'},
        {h:'Из команд', v:{kind:'code', lines:[{t:'команда 1', c:cyan},{t:'команда 2', c:cyan},{t:'команда 3', c:cyan}]}, r:'Программа — список команд.'},
        {h:'Команда вывести', v:{kind:'code', lines:[{t:'вывести "Привет"', c:grn}]}, r:'«вывести» показывает текст.'},
        {h:'Пример', v:{kind:'code', lines:[{t:'вывести "Привет"', c:grn}]}, r:'На экране появится: Привет.'},
        {h:'С циклом', v:{kind:'loop', n:3, body:'вывести "Привет"'}, r:'Цикл повторяет команду.'},
        {h:'Пример 3 раза', v:{kind:'code', lines:[{t:'повтори 3 раза:', c:gold},{t:'    вывести "Привет"', c:grn, i:1}]}, r:'«Привет» покажется 3 раза.'},
        {h:'Порядок строк', v:{kind:'text', lines:[{t:'компьютер читает', b:1},{t:'сверху вниз', b:1, c:gold}]}, r:'Порядок строк важен.'},
        {h:'Ошибка', v:{kind:'text', lines:[{t:'ошибка →', b:1},{t:'компьютер сделает не то', c:red}]}, r:'Ошибка ломает программу.'},
        {h:'Языки', v:{kind:'cards', items:[{t:'Python', c:blu},{t:'Scratch', c:gold},{t:'Pascal', c:grn},{t:'C++', c:pur}]}, r:'Программы пишут на языках программирования.'},
        {h:'Тренажёр', v:{kind:'code', lines:[{t:'вывести "Молодец!"', c:grn}]}, r:'«вывести» показывает текст.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'программа = команды', b:1},{t:'вывести "…" — показать', c:grn},{t:'сверху вниз, по порядку', c:gold}]}, r:'Запомни: программа — команды по порядку.'} ],
      check:{ q:'Что делает команда «вывести»?', choices:['показывает текст на экране','стирает файл','выключает компьютер'], ans:0, exp:'«вывести» показывает текст.' },
      tasks:[
        {q:'Сколько раз покажется «Привет», если «повтори 3 раза: вывести Привет»?', kind:'unit', ans:3, tol:0, hints:['Число в цикле.','3.'], sol:'3'},
        {q:'Что такое программа?', kind:'choice', choices:['алгоритм для компьютера','картинка','число','буква'], ans:0, tol:0, hints:['Записана командами.','Алгоритм для компьютера.'], sol:'алгоритм для компьютера'}
      ] },
    { id:510, title:'Переменные: как программа помнит', ico:'📦', src:'Информатика · 5–6 класс · С нуля: переменные',
      explain:[
        'Компьютер — машина, и сам он ничего не помнит. Чтобы программа могла считать, ей нужно где-то хранить числа.',
        'Для этого придумали ПЕРЕМЕННУЮ. Переменная — это коробочка: сверху наклейка с именем, внутри — значение.',
        'Имя пишут латинскими буквами: x, a, b, sum. По имени программа понимает, какую именно коробочку открыть.',
        'Значение — то, что лежит в коробочке: число 5 или слово «Привет». У одной переменной всегда одно значение.',
        'Положить значение помогает команда присваивания — знак «=». Запись «x = 5» читается так: «в переменную x положили 5».',
        'Если потом записать «x = 7», старое значение 5 затрётся, и в коробочке останется 7. Коробочка одна, а значение в ней меняется.',
        'Значение можно спросить у человека. Это ВВОД: команда «ввести x» ждёт, пока ты напечатаешь число, и кладёт его в переменную.',
        'Пример: программа спрашивает «Сколько тебе лет?», получает ответ 11 и запоминает его в переменной «возраст».',
        'С переменными можно считать: «sum = a + b» возьмёт числа из двух коробочек и положит в третью их сумму.',
        'Чтобы понять, что делает программа, делают ТРАССИРОВКУ — табличку со столбцами-переменными. В ней видно, как значения меняются шаг за шагом.',
        'Пример: a = 3, b = 4, sum = a + b. В таблице видно: сначала в a появилось 3, потом в b — 4, и только потом в sum — 7.',
        'Проверь себя: чем имя переменной отличается от её значения? Имя — наклейка, оно не меняется; значение — то, что внутри, и оно меняется.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Программа должна помнить', v:{kind:'text', lines:[{t:'чтобы считать — надо', b:1},{t:'где-то хранить числа', b:1, c:gold}]}, r:'Без памяти программа ничего не посчитает.'},
        {h:'Коробочка с наклейкой', v:{kind:'var', name:'x', note:'имя — наклейка, значение — внутри коробочки'}, r:'Переменная = коробочка с именем.'},
        {h:'Имя и значение', v:{kind:'var', vars:[{name:'x',val:'5',c:blu},{name:'sum',val:'12',c:grn}], note:'имя выбирает программист — чтобы было понятно'}, r:'У каждой переменной своё имя.'},
        {h:'Что лежит внутри', v:{kind:'var', name:'word', val:'Привет', note:'в коробочке может лежать число или слово'}, r:'Значение — то, что лежит в переменной.'},
        {h:'Знак «=» кладёт значение', v:{kind:'assign', name:'x', from:'пусто', to:'7', note:'x = 7 читается: «в x положили 7»'}, r:'«=» — команда присваивания.'},
        {h:'Старое значение затирается', v:{kind:'assign', name:'x', from:'5', to:'9', note:'коробочка одна, а значение в ней меняется'}, r:'Новое значение заменяет старое.'},
        {h:'Ввод: спросим человека', v:{kind:'input', q:'Сколько тебе лет?', name:'возраст', val:'11', note:'программа получила 11 и запомнила его'}, r:'Ввод кладёт ответ человека в переменную.'},
        {h:'Считаем коробочками', v:{kind:'assign', name:'sum', from:'a + b', to:'7', note:'sum = a + b — взяли два числа и сложили'}, r:'В sum попадёт сумма a и b.'},
        {h:'Как это устроено', v:{kind:'ipo'}, r:'Ввод → обработка → вывод, и всё через переменные.'},
        {h:'Трассировка', v:{kind:'trace', head:['шаг','команда','a','b','sum'], rows:[['1','a = 3','3','—','—'],['2','b = 4','3','4','—'],['3','sum = a+b','3','4','7']], note:'по таблице видно, как менялась каждая переменная'}, r:'Трассировка показывает изменения по шагам.'},
        {h:'Осторожно с именами', v:{kind:'cards', items:[{t:'сумма', d:'понятное имя', c:grn},{t:'x', d:'коротко и ясно', c:grn},{t:'2x', d:'нельзя: начинается с цифры', c:red},{t:'s1', d:'непонятно, что внутри', c:red}]}, r:'Имя должно быть понятным и без цифры в начале.'},
        {h:'Тренажёр', v:{kind:'var', vars:[{name:'a',val:'8',c:cyan},{name:'b',val:'2',c:gold}], note:'что окажется в sum = a + b ?'}, r:'sum получит 10.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'переменная = имя + значение', b:1},{t:'x = 5 — положить в коробочку', c:grn},{t:'ввести x — спросить у человека', c:gold}]}, r:'Запомни: переменная — коробочка с именем.'} ],
      check:{ q:'Что делает запись «x = 5»?', choices:['кладёт число 5 в переменную x','сравнивает x и 5','показывает 5 на экране'], ans:0, exp:'Знак «=» — присваивание: в переменную x положили 5.' },
      tasks:[
        {q:'В переменной a лежит 3, в b — 4. Что окажется в sum после команды «sum = a + b»?', kind:'unit', ans:7, tol:0, hints:['Программа складывает то, что лежит в коробочках.','3 + 4 = 7.'], sol:'7'},
        {q:'Какое имя переменной записано неправильно?', kind:'choice', choices:['2x','sum','b','x1'], ans:0, tol:0, hints:['Имя не может начинаться с цифры.','«2x» — так нельзя.'], sol:'2x'}
      ] },
    { id:511, title:'Цикл «пока»: повторяем, пока условие верно', ico:'🔁', src:'Информатика · 5–6 класс · С нуля: цикл пока',
      explain:[
        'Раньше мы повторяли команды известное число раз: «повтори 4 раза». Но так бывает не всегда.',
        'Пример: робот должен идти, пока не дойдёт до стены. Сколько шагов ему сделать — заранее неизвестно.',
        'Для таких случаев есть цикл «ПОКА». Он повторяет команды, пока условие истинно, то есть пока ответ «да».',
        'Читаем так: «ПОКА впереди нет стены — шаг вперёд». Компьютер проверяет условие, и если «да» — делает шаг.',
        'После каждого шага условие проверяется ЗАНОВО. Как только стена рядом, ответ станет «нет» — и цикл остановится.',
        'Важно: в цикле «пока» условие проверяется ПЕРЕД телом. Если условие сразу ложно, тело не выполнится ни разу.',
        'Сравни: в цикле «повтори N раз» число повторов известно заранее, а в цикле «пока» всё решает условие.',
        'Пример со счётчиком: «пока i ≤ 3: вывести i; i = i + 1». Число i растёт, и цикл сам останавливается, когда i станет 4.',
        'Чтобы цикл закончился, тело должно менять то, что проверяет условие. Здесь тело увеличивает i — поэтому условие рано или поздно станет ложным.',
        'Если тело не меняет условие, ответ всегда будет «да» — и получится бесконечный цикл. Программа зациклится и не выдаст ответ.',
        'Цикл «пока» удобен для подсчёта неизвестного количества: «пока есть числа — прибавь число к сумме».',
        'Проверь себя: цикл «пока» проверяет условие до тела или после? До тела — поэтому он может не выполниться ни разу.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Когда число повторов известно', v:{kind:'loop', n:4, body:'шаг вперёд'}, r:'«Повтори 4 раза» — если знаем, сколько раз.'},
        {h:'А если неизвестно?', v:{kind:'text', lines:[{t:'идти, пока не стена', b:1},{t:'сколько шагов — неизвестно', b:1, c:gold}]}, r:'Тут «повтори N раз» не подходит.'},
        {h:'Цикл «пока»', v:{kind:'while', q:'впереди нет стены?', body:'шаг вперёд', n:3}, r:'ПОКА условие истинно — повторяй тело.'},
        {h:'Как это записывают', v:{kind:'code', lines:[{t:'пока впереди нет стены:', c:gold},{t:'    шаг вперёд', c:cyan, i:1}]}, r:'Читаем: пока «да» — делаем команду.'},
        {h:'Условие проверяется снова', v:{kind:'while', q:'впереди нет стены?', body:'шаг вперёд', again:1}, r:'После шага условие проверяют заново.'},
        {h:'Дошёл до стены — стоп', v:{kind:'robot', pos:[0,3], walls:[[3,3]], path:[[0,3],[1,3],[2,3]]}, r:'Условие стало «нет» — цикл остановился.'},
        {h:'Проверка до тела', v:{kind:'while', q:'есть числа?', body:'прибавь число', pre:1}, r:'Условие проверяется перед телом.'},
        {h:'Два вида циклов', v:{kind:'compare', left:{t:'повтори 4 раза', d:'число повторов знаем', c:blu, points:['тело выполнится ровно 4 раза','предсказуемо и просто']}, right:{t:'пока есть числа', d:'число повторов неизвестно', c:grn, points:['сколько раз — решает условие','может не выполниться ни разу']}}, r:'Разные задачи — разные циклы.'},
        {h:'Счётчик внутри цикла', v:{kind:'code', lines:[{t:'i = 1', c:cyan},{t:'пока i ≤ 3:', c:gold},{t:'    вывести i', c:grn, i:1},{t:'    i = i + 1', c:cyan, i:1}]}, r:'Тело меняет i — цикл остановится.'},
        {h:'Трассировка', v:{kind:'trace', head:['шаг','i ≤ 3 ?','вывели'], rows:[['1','да','1'],['2','да','2'],['3','да','3'],['4','нет','—']], note:'на шаге 4 условие стало ложным — вышли из цикла'}, r:'По таблице видно, почему цикл закончился.'},
        {h:'Бесконечный цикл', v:{kind:'while', q:'x всё ещё > 0?', body:'x = x + 1', warn:1}, r:'Условие всегда «да» — программа зациклится.'},
        {h:'Тренажёр', v:{kind:'while', q:'не дошли до стены?', body:'шаг вперёд', n:2}, r:'Сколько раз повторять — решает условие.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'пока условие верно — повторяй', b:1},{t:'условие проверяется до тела', c:gold},{t:'тело должно менять условие', c:grn}]}, r:'Запомни: «пока» — цикл с условием.'} ],
      check:{ q:'Когда цикл «пока» проверяет условие?', choices:['перед каждым выполнением тела','только один раз в начале','после того как программа закончится'], ans:0, exp:'Условие проверяется перед каждым повтором тела цикла.' },
      tasks:[
        {q:'Сколько раз выполнится тело цикла, если условие «пока» сразу ложно?', kind:'unit', ans:0, tol:0, hints:['Условие проверяется до тела.','Ни разу — это 0.'], sol:'0'},
        {q:'Что будет, если тело цикла «пока» не меняет условие?', kind:'choice', choices:['цикл будет повторяться бесконечно','цикл выполнится один раз','программа станет быстрее','цикл сам остановится'], ans:0, tol:0, hints:['Условие всё время остаётся истинным.','Получится бесконечный цикл.'], sol:'цикл будет повторяться бесконечно'}
      ] },
    { id:512, title:'Программа думает: условие внутри цикла', ico:'🤖', src:'Информатика · 5–6 класс · С нуля: условие в цикле',
      explain:[
        'В этом уроке мы соединим всё, что уже знаем: переменные, условие и цикл. Такая программа умеет «думать»: она смотрит на мир и решает, что делать дальше.',
        'Задача: робот в лабиринте. Он должен идти, пока не выйдет, а если впереди стена — повернуть. Сколько шагов понадобится, заранее неизвестно.',
        'Значит, нужен цикл «пока»: «пока не вышли из лабиринта — повторяй».',
        'Но одного шага мало: перед каждым шагом надо проверить, нет ли стены. Поэтому ВНУТРИ цикла стоит условие: «если стена, то повернуть».',
        'Когда одно правило вложено в другое, это называется вложенность. Здесь цикл — снаружи, а условие — внутри него.',
        'Порядок очень важен: сначала проверяем стену, потом шагаем. Если шагнуть первым, робот врежется в стену.',
        'У робота есть датчик. Датчик отвечает на вопрос «впереди стена?» только «да» или «нет» — это и есть условие для ветвления.',
        'Чтобы не потеряться, программа ведёт счёт: i — сколько шагов сделано, «повороты» — сколько раз повернули. Это переменные.',
        'Тело цикла должно менять условие — иначе цикл никогда не закончится. Здесь робот каждый раз подходит ближе к выходу, и условие становится ложным.',
        'Как читать программу по-русски: «пока не вышли: если стена — повернуть; шаг вперёд; i = i + 1».',
        'Каждый круг компьютер делает четыре дела: прочитал команду, проверил условие, выполнил действие, вернулся к началу цикла.',
        'Частая ошибка — забыть проверить стену или не менять счётчик. Тогда робот врежется или программа зациклится.',
        'Готовую программу проверяют на нескольких примерах: короткий коридор, стена рядом, длинный путь. Если везде верно — программа хорошая.',
        'Проверь себя: почему условие стоит внутри цикла, а не после него? Потому что проверять стену нужно перед каждым шагом.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что мы уже умеем', v:{kind:'quest'}, r:'Переменные, условие и цикл — вместе.'},
        {h:'Программа целиком', v:{kind:'comboscheme'}, r:'Цикл снаружи, условие внутри.'},
        {h:'Читаем по строкам', v:{kind:'pseudo', rows:[{t:'i = 0',c:cyan},{t:'пока не вышли:',c:gold},{t:'если стена?',c:pur,i:1},{t:'повернуть',c:gold,i:2},{t:'шаг вперёд',c:cyan,i:1},{t:'i = i + 1',c:grn,i:1}]}, r:'Указатель показывает, какую строку читает компьютер.'},
        {h:'Код и мир рядом', v:{kind:'split', lines:['пока не вышли:','    если стена:','        повернуть','    шаг вперёд']}, r:'Слева команды — справа робот.'},
        {h:'Как робот видит стену', v:{kind:'sensor'}, r:'Датчик отвечает «да» или «нет».'},
        {h:'Ворота-условие', v:{kind:'gate', q:'впереди стена?', open:1}, r:'Стена близко — поворачиваем.'},
        {h:'Счётчики программы', v:{kind:'gears', a:'7', b:'7', c:'2'}, r:'i, шаги и повороты — переменные.'},
        {h:'Что программа помнит', v:{kind:'shelves', cells:[{n:'i',v:'7',c:blu},{n:'шаги',v:'7',c:grn},{n:'повороты',v:'2',c:gold},{n:'стена',v:'нет',c:pur}]}, r:'Значения живут в переменных.'},
        {h:'Условие внутри цикла', v:{kind:'nest'}, r:'Вложенность: цикл снаружи, условие внутри.'},
        {h:'Один круг цикла', v:{kind:'belt'}, r:'Прочитал → проверил → сделал → повторил.'},
        {h:'Частая ошибка', v:{kind:'debugger', lines:['пока не вышли:','    шаг вперёд'], bad:1, hint:'забыли проверить стену — робот врежется'}, r:'Проверка стены обязательна.'},
        {h:'Проверяем на примерах', v:{kind:'tests', runs:[{t:'коридор без стен', r:'вышел за 5 шагов'},{t:'стена справа', r:'повернул и вышел'},{t:'стена впереди', r:'повернул сразу'}]}, r:'Одна программа — разные поля.'},
        {h:'Тренажёр', v:{kind:'pick', q:'Что робот сделает первым делом?', opts:[{t:'проверит, есть ли стена', ok:1},{t:'сразу шагнёт вперёд'},{t:'выключится'}], exp:'Сначала проверка условия — иначе можно врезаться.'}, r:'Сначала проверяем, потом действуем.'},
        {h:'Карта знаний', v:{kind:'mindmap'}, r:'Всё, что нужно для любой программы.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'цикл снаружи, условие внутри', b:1},{t:'сначала проверь — потом шагай', c:gold},{t:'тело меняет условие', c:grn}]}, r:'Программа думает перед каждым шагом.'} ],
      check:{ q:'Где стоит условие в программе «идти, пока не вышли, а при стене поворачивать»?', choices:['внутри цикла, перед шагом','после цикла','в самом начале программы'], ans:0, exp:'Стену проверяем перед каждым шагом — значит, условие внутри цикла.' },
      tasks:[
        {q:'Робот сделал 3 шага и 1 поворот. Сколько всего команд выполнила программа?', kind:'unit', ans:4, tol:0, hints:['Сложи шаги и повороты.','3 + 1 = 4.'], sol:'4'},
        {q:'Что случится, если внутри цикла «пока» не менять условие?', kind:'choice', choices:['программа зациклится','робот сразу остановится','цикл выполнится один раз','ничего не изменится'], ans:0, tol:0, hints:['Условие всё время остаётся истинным.','Получится бесконечный цикл.'], sol:'программа зациклится'}
      ] },
    { id:513, title:'Разбиваем задачу на части: помощники', ico:'🧩', src:'Информатика · 5–6 класс · С нуля: вспомогательные алгоритмы',
      explain:[
        'Большую задачу писать целиком тяжело: в ней много одинаковых кусков, и в них легко запутаться.',
        'Люди так не делают. Большую работу разбивают на маленькие понятные части: «сначала это, потом это, потом это».',
        'Маленькая часть алгоритма со своим именем называется ВСПОМОГАТЕЛЬНЫЙ АЛГОРИТМ. По-другому — подпрограмма.',
        'Вспомогательный алгоритм похож на рецепт в книге: у него есть имя (название рецепта) и тело (сами команды).',
        'Чтобы воспользоваться помощником, в программе пишут его ИМЯ. Это называется вызов. Компьютер идёт и выполняет команды этого алгоритма, а потом возвращается обратно.',
        'Один и тот же помощник можно вызывать сколько угодно раз и из разных мест программы — описываем один раз, используем много раз.',
        'Имя должно быть понятным: «квадрат», «повернуть», «дорога». Тогда программа читается как рассказ, а не как шифр.',
        'Пример: квадрат — это «повтори 4 раза: вперёд и повернуть». Опишем его один раз, а рисовать квадраты будем вызовом «квадрат».',
        'Башня из трёх квадратов — это три вызова «квадрат», а не тридцать одинаковых команд. Программа стала короче и понятнее.',
        'Помощнику можно передать число — параметр. Например, вызов «квадрат(5)» нарисует квадрат со стороной 5.',
        'Благодаря параметру один и тот же алгоритм работает по-разному: «квадрат(2)» — маленький, «квадрат(5)» — большой.',
        'Когда помощников много, они собираются в библиотеку. Программист берёт из неё нужный алгоритм по имени и не пишет всё заново.',
        'Каждый помощник проверяют отдельно: запускают только его и смотрят, что получилось. Если помощник верный, то и большая программа будет верной.',
        'Проверь себя: зачем разбивать задачу на части? Чтобы не повторять одно и то же, легче читать и проще находить ошибки.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Задача слишком большая', v:{kind:'bigtask'}, r:'Много одинаковых команд — легко ошибиться.'},
        {h:'Разбиваем на части', v:{kind:'plan'}, r:'Большое делим на маленькие понятные шаги.'},
        {h:'Что такое помощник', v:{kind:'recipe', name:'квадрат'}, r:'У алгоритма-помощника есть имя и тело.'},
        {h:'Главный и помощник', v:{kind:'helper', name:'квадрат'}, r:'Главная программа вызывает помощника по имени.'},
        {h:'Вызов из разных мест', v:{kind:'call', name:'повернуть'}, r:'Одно описание — сколько угодно вызовов.'},
        {h:'Заглянем внутрь', v:{kind:'zoom', name:'квадрат'}, r:'Внутри помощника — обычные команды.'},
        {h:'Рисуем квадрат', v:{kind:'square'}, r:'4 раза: вперёд и повернуть.'},
        {h:'Башня из квадратов', v:{kind:'tower'}, r:'Три вызова — три этажа.'},
        {h:'Число-параметр', v:{kind:'params'}, r:'Одно имя, разные числа — разный результат.'},
        {h:'Библиотека помощников', v:{kind:'library'}, r:'Готовые алгоритмы берём по имени.'},
        {h:'Было и стало', v:{kind:'compare2'}, r:'С помощником программа короче в пять раз.'},
        {h:'Проверяем помощника', v:{kind:'test513'}, r:'Сначала проверь помощника отдельно.'},
        {h:'Тренажёр', v:{kind:'sort', q:'Собери алгоритм «приготовить чай» по порядку', items:[{t:'положить чай', ord:2},{t:'взять чашку', ord:1},{t:'выпить', ord:5},{t:'налить кипяток', ord:3},{t:'подождать', ord:4}]}, r:'Шаги выполняются по порядку.'},
        {h:'Как назвать помощника', v:{kind:'naming'}, r:'Имя — короткое и понятное.'},
        {h:'Из чего состоит программа', v:{kind:'summary513'}, r:'Команды → помощники → большая программа.'} ],
      check:{ q:'Что такое вспомогательный алгоритм?', choices:['маленький алгоритм со своим именем, который вызывают по имени','самая главная программа','ошибка в программе'], ans:0, exp:'Вспомогательный алгоритм — маленькая часть со своим именем; её вызывают по имени.' },
      tasks:[
        {q:'Сколько раз выполнится помощник «квадрат», если в программе три вызова «квадрат»?', kind:'unit', ans:3, tol:0, hints:['Каждый вызов — одно выполнение.','Три вызова — три раза.'], sol:'3'},
        {q:'Как воспользоваться помощником с именем «дорога»?', kind:'choice', choices:['написать его имя: дорога','написать слово «вызов»','скопировать все его команды в программу','написать имя в кавычках'], ans:0, tol:0, hints:['Вызов — это просто имя алгоритма.','Пишем имя: дорога.'], sol:'написать его имя: дорога'}
      ] }
  ];

  /* ---------- движок виджета ---------- */
  function renderInf(el, L, spec){
    const pre='ix'+L.id;
    css(pre);
    const step=LV.step||0;
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.seq=[]; st.bad=-1; }
    const go=st.go||0;
    const s=spec.slides[Math.min(step,spec.slides.length-1)];
    const isPick=(s.v.kind==='pick'||s.v.kind==='sort');
    const H=vizH(s.v)+30;
    const inner = `<g class="${pre}In">${(go||isPick)? viz(s.v,pre,step,st,lk) : ''}</g>`;
    const btnRow = (s.v.kind==='sort')
      ? wkRow(wkBtn('собрать заново',`infSeq('${lk}',-1,0)`))
      : isPick
      ? (st.pick>=0? wkRow(wkBtn('ещё раз',`infPick('${lk}',-1)`)) : '')
      : wkRow(go?wkBtn('сброс',`infAct('${lk}')`):wkBtn('показать',`infAct('${lk}')`));
    const capShown = (s.v.kind==='sort')? (((st.seq||[]).length===(s.v.items||[]).length) && s.r) : (isPick? (st.pick>=0 && s.r) : (go && s.r));
    let h = wkFrame(`<div class="wk-big" style="font-size:23px">${s.h}</div>`+
      wkHero(arh(318,H,inner,pre))+
      (capShown?wkRow(chip(s.r,grn,pre)):'')+
      btnRow+
      wkSml(L.title));
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.infSeq=function(lk,i,ord){
    const st=CHS[lk]||(CHS[lk]={});
    if(i<0){ st.seq=[]; st.bad=-1; chRender(0); return; }
    const sq=st.seq||(st.seq=[]);
    if(sq.indexOf(i)>=0) return;
    if(ord===sq.length+1){ sq.push(i); st.bad=-1; } else { st.bad=i; }
    chRender(0);
  };
  window.infPick=function(lk,i){ const st=CHS[lk]||(CHS[lk]={}); st.pick=i; chRender(0); };
  window.infAct=function(lk){ const st=CHS[lk]||(CHS[lk]={}); st.go=st.go?0:1; chRender(0); };
  LESSONS.forEach(function(L){ L.subj='inf'; });
  window.ARH_LESSONS = (window.ARH_LESSONS||[]).concat(LESSONS);
  window.VISKW = window.VISKW || {};
  LESSONS.forEach(function(L){ window.VISKW[L.id]=function(el){ renderInf(el, L, {slides:L.slides}); }; });
})();
