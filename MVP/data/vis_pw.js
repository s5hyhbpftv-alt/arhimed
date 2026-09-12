/* Физика, учебные уроки 92 · 93 · 95 — кадровый формат:
   у каждого шага свой рисунок и своё короткое задание (как в уроках 100–107). */
window.WAVE_B = window.WAVE_B || {};

window.PKIT = (function(){
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f', PALE='#e8dcc8', INK='#041018';
  const CSS=`<style>
    @keyframes pkIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}
    @keyframes pkPop{0%{transform:scale(.4);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1);opacity:1}}
    @keyframes pkFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
    @keyframes pkSpin{to{transform:rotate(360deg)}}
    @keyframes pkPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
    @keyframes pkDash{to{stroke-dashoffset:0}}
    @keyframes pkRise{0%{transform:translateY(12px);opacity:0}100%{transform:translateY(0);opacity:.92}}
    @keyframes pkGlow{0%,100%{opacity:.3}50%{opacity:.85}}
    @keyframes pkSwing{0%,100%{transform:rotate(-9deg)}50%{transform:rotate(9deg)}}
    .pk-in{animation:pkIn .5s ease both}
    .pk-pop{transform-box:fill-box;transform-origin:center;animation:pkPop .55s cubic-bezier(.2,1.3,.25,1) both}
    .pk-float{transform-box:fill-box;transform-origin:center;animation:pkFloat 3s ease-in-out infinite}
    .pk-spin{transform-box:fill-box;transform-origin:center;animation:pkSpin 16s linear infinite}
    .pk-pulse{transform-box:fill-box;transform-origin:center;animation:pkPulse 2.2s ease-in-out infinite}
    .pk-dash{stroke-dasharray:320;stroke-dashoffset:320;animation:pkDash 1.15s ease forwards}
    .pk-rise{animation:pkRise 1.1s ease both}
    .pk-glow{animation:pkGlow 2.4s ease-in-out infinite}
    .pk-swing{transform-box:fill-box;transform-origin:50% 96%;animation:pkSwing 2.6s ease-in-out infinite}
    .pk-t{paint-order:stroke fill;stroke:${INK};stroke-width:3.4px;stroke-linejoin:round;font-family:Georgia,serif}
    .pk-t2{paint-order:stroke fill;stroke:${INK};stroke-width:2.6px;stroke-linejoin:round;font-family:Georgia,serif}
  </style>`;
  function use(){ try{ window._waveCss && _waveCss('css-pkv3', CSS); }catch(e){} }
  function sv(inner, o){
    o=o||{}; use();
    return `${CSS}<svg viewBox="${o.vb||'0 0 336 252'}" style="width:min(100%,340px);height:auto;background:${o.bg||'#0b1418'};border-radius:16px;display:block;margin:0 auto;overflow:visible;pointer-events:auto">${inner}</svg>`;
  }
  function l(x,y,t,col,o){
    o=o||{};
    const xx=Math.max(12,Math.min(o.max||324,+x)), yy=Math.max(15,Math.min(o.maxy||244,+y));
    return `<text class="pk-t" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${o.a||'middle'}" font-size="${o.fs||12}" fill="${col||PALE}">${t}</text>`;
  }
  function l2(x,y,t,col,o){
    o=o||{};
    const xx=Math.max(12,Math.min(o.max||324,+x)), yy=Math.max(15,Math.min(o.maxy||244,+y));
    return `<text class="pk-t2" x="${xx.toFixed(1)}" y="${yy.toFixed(1)}" text-anchor="${o.a||'middle'}" font-size="${o.fs||11}" fill="${col||PALE}">${t}</text>`;
  }
  function note(title,text){
    return `<div style="max-width:340px;width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid #3d5c49;border-radius:12px;padding:10px 12px">
      <div style="color:${GOLD};font-size:13px;font-family:Georgia,serif;margin-bottom:4px">${title}</div>
      <div style="color:${PALE};font-size:13.5px;line-height:1.55">${text}</div></div>`;
  }
  function pred(st, key, q, opts){
    const cur=st[key];
    const right=(opts.find(o=>o.k===cur)||{}).ok;
    const fb=cur?`<div class="wv-sml" style="margin-top:6px;color:${right===false?RED:GREEN}">${(opts.find(o=>o.k===cur)||{}).fb||(right===false?'пока нет — посмотри рисунок ещё раз':'верно!')}</div>`:'';
    return `<div style="width:min(100%,340px);text-align:left">
      <div style="color:${GOLD};font-size:13px;margin-bottom:6px;line-height:1.45">${q}</div>
      <div class="wv-row">${opts.map(o=>`<button type="button" class="btn" style="border-color:${cur===o.k?(o.ok===false?RED:GOLD):'#3d5c49'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${fb}</div>`;
  }
  function cards(items){
    return `<div style="display:flex;flex-wrap:wrap;gap:7px;width:min(100%,340px);justify-content:center">${items.map(x=>
      `<div style="flex:1 1 96px;max-width:164px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid #3d5c49;border-left:4px solid ${x[2]||GOLD};border-radius:11px;padding:8px 10px;text-align:left">
        <div style="color:${x[2]||GOLD};font-size:13px;font-family:Georgia,serif">${x[0]}</div>
        <div style="color:${PALE};font-size:12.5px;line-height:1.45;margin-top:2px">${x[1]}</div></div>`).join('')}</div>`;
  }
  function snowflake(cx,cy,r,col,op){
    let g='';
    for(let i=0;i<6;i++){
      const a=Math.PI/180*(60*i);
      const dx=Math.sin(a), dy=-Math.cos(a);
      const x2=cx+dx*r, y2=cy+dy*r;
      g+=`<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${col}" stroke-width="2.2" stroke-linecap="round" opacity="${op||1}"/>`;
      for(const f of [0.45,0.75]){
        const bx=cx+dx*r*f, by=cy+dy*r*f;
        const px=-dy, py=dx, s=r*0.22;
        g+=`<line x1="${(bx).toFixed(1)}" y1="${(by).toFixed(1)}" x2="${(bx+px*s+dx*s).toFixed(1)}" y2="${(by+py*s+dy*s).toFixed(1)}" stroke="${col}" stroke-width="1.6" stroke-linecap="round" opacity="${op||1}"/>`;
        g+=`<line x1="${(bx).toFixed(1)}" y1="${(by).toFixed(1)}" x2="${(bx-px*s+dx*s).toFixed(1)}" y2="${(by-py*s+dy*s).toFixed(1)}" stroke="${col}" stroke-width="1.6" stroke-linecap="round" opacity="${op||1}"/>`;
      }
    }
    return g;
  }
  /* все значки рисуем сами: эмодзи в SVG выглядят чёрными и выбиваются из палитры */
  function ico(kind,cx,cy,s){
    const k=String(kind);
    if(k==='snow') return snowflake(cx,cy,s,BLUE);
    if(k==='ice') return `<polygon points="${cx-s*0.9},${cy+s*0.22} ${cx-s*0.3},${cy-s} ${cx+s*0.5},${cy+s*0.22}" fill="#cfe0cf" opacity=".92"/>
      <polygon points="${cx-s*0.9},${cy+s*0.22} ${cx+s*0.5},${cy+s*0.22} ${cx+s*0.3},${cy+s*0.92} ${cx-s*0.62},${cy+s*0.92}" fill="#7fd1ff" opacity=".55"/>
      <line x1="${cx-s*1.1}" y1="${cy+s*0.22}" x2="${cx+s*0.9}" y2="${cy+s*0.22}" stroke="#4a9ad0" stroke-width="1.3"/>`;
    if(k==='drop') return `<path d="M${cx} ${cy-s} C${cx+s*0.78} ${cy-s*0.15} ${cx+s*0.62} ${cy+s*0.85} ${cx} ${cy+s} C${cx-s*0.62} ${cy+s*0.85} ${cx-s*0.78} ${cy-s*0.15} ${cx} ${cy-s} Z" fill="#7fd1ff" opacity=".82"/>`;
    if(k==='earth') return `<circle cx="${cx}" cy="${cy}" r="${s}" fill="#1d5070" stroke="#7fd1ff" stroke-width="1.6"/>
      <ellipse cx="${cx}" cy="${cy-s*0.18}" rx="${s*0.64}" ry="${s*0.3}" fill="#8fd1a8" opacity=".55"/>
      <ellipse cx="${cx-s*0.2}" cy="${cy+s*0.45}" rx="${s*0.34}" ry="${s*0.17}" fill="#8fd1a8" opacity=".45"/>`;
    if(k==='comet') return `<polygon points="${cx+s*0.25},${cy-s*0.3} ${cx+s*2.0},${cy-s*1.0} ${cx+s*2.0},${cy+s*0.05} ${cx+s*0.25},${cy+s*0.3}" fill="#7fd1ff" opacity=".34"/>
      <polygon points="${cx+s*0.25},${cy-s*0.15} ${cx+s*1.7},${cy-s*0.62} ${cx+s*1.7},${cy-s*0.2}" fill="#cfe0cf" opacity=".35"/>
      <circle cx="${cx}" cy="${cy}" r="${s*0.52}" fill="#eaf6ff" stroke="#7fd1ff" stroke-width="1.3"/>`;
    if(k==='water') return `<path d="M${cx-s*0.72} ${cy-s*0.9} h${s*1.44} l${-s*0.22} ${s*1.8} h${-s} Z" fill="rgba(127,209,255,.25)" stroke="#7fd1ff" stroke-width="1.5"/>
      <path d="M${cx-s*0.66} ${cy+s*0.1} h${s*1.32} l${-s*0.16} ${s*0.8} h${-s} Z" fill="#7fd1ff" opacity=".55"/>`;
    if(k==='gold') return `<polygon points="${cx-s*0.9},${cy+s*0.7} ${cx-s*0.55},${cy-s*0.7} ${cx+s*0.55},${cy-s*0.7} ${cx+s*0.9},${cy+s*0.7}" fill="#d9a441" stroke="#ffd76a" stroke-width="1.4"/>
      <polygon points="${cx-s*0.38},${cy+s*0.7} ${cx-s*0.22},${cy-s*0.18} ${cx+s*0.22},${cy-s*0.18} ${cx+s*0.38},${cy+s*0.7}" fill="#fff2c0" opacity=".45"/>`;
    if(k==='air') return `<rect x="${cx-s*0.5}" y="${cy-s}" width="${s}" height="${s*2}" rx="${s*0.45}" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="1.5"/>
      <rect x="${cx-s*0.18}" y="${cy-s*1.35}" width="${s*0.36}" height="${s*0.4}" rx="${s*0.16}" fill="#8fd1a8" opacity=".7"/>
      <circle cx="${cx-s*0.2}" cy="${cy-s*0.3}" r="${s*0.16}" fill="#8fd1a8" opacity=".8"/>
      <circle cx="${cx+s*0.2}" cy="${cy+s*0.25}" r="${s*0.13}" fill="#8fd1a8" opacity=".6"/>`;
    if(k==='bolt') return `<polygon points="${cx-s*0.3},${cy-s} ${cx-s*0.85},${cy+s*0.1} ${cx-s*0.2},${cy+s*0.1} ${cx-s*0.5},${cy+s} ${cx+s*0.8},${cy-s*0.2} ${cx+s*0.1},${cy-s*0.2} ${cx+s*0.45},${cy-s}" fill="#ffd76a"/>`;
    if(k==='rain') return `<path d="M${cx-s*0.95} ${cy-s*0.15} q0 ${-s*0.7} ${s*0.85} ${-s*0.62} q${s*0.35} ${-s*0.5} ${s*0.95} ${-s*0.05} q${s*0.75} ${-s*0.05} ${s*0.75} ${s*0.67} Z" fill="#8fa08f" opacity=".45" stroke="#8fd1a8" stroke-width="1.2"/>
      ${[[-0.5,0],[0,0.12],[0.5,0]].map(d=>`<line x1="${cx+s*d[0]}" y1="${cy+s*(0.4+d[1])}" x2="${cx+s*(d[0]-0.2)}" y2="${cy+s*(1.0+d[1])}" stroke="#7fd1ff" stroke-width="1.9" stroke-linecap="round"/>`).join('')}`;
    if(k==='rainbow') return [[0.95,'#ff9a8a'],[0.72,'#ffd76a'],[0.5,'#8fd1a8'],[0.28,'#7fd1ff']].map(a=>
      `<path d="M${(cx-s*a[0]).toFixed(1)} ${(cy+s*0.7).toFixed(1)} a${(s*a[0]).toFixed(1)} ${(s*a[0]).toFixed(1)} 0 0 1 ${(2*s*a[0]).toFixed(1)} 0" fill="none" stroke="${a[1]}" stroke-width="${(s*0.2).toFixed(1)}"/>`).join('');
    if(k==='geyser') return `<ellipse cx="${cx}" cy="${cy+s*0.78}" rx="${s*1.05}" ry="${s*0.28}" fill="#8fd1a8" opacity=".3"/>
      <path d="M${cx-s*0.38} ${cy+s*0.72} q${s*0.08} ${-s*0.95} ${s*0.38} ${-s*1.35} q${s*0.3} ${s*0.4} ${s*0.38} ${s*1.35} Z" fill="rgba(143,209,168,.45)" stroke="#8fd1a8" stroke-width="1.2"/>`;
    if(k==='aurora') return `<path d="M${cx-s*0.95} ${cy+s*0.5} q${s*0.6} ${-s*1.4} ${s*1.2} ${-s*0.2}" fill="none" stroke="#8fd1a8" stroke-width="${(s*0.22).toFixed(1)}" opacity=".7"/>
      <path d="M${cx-s*0.7} ${cy+s*0.85} q${s*0.6} ${-s*1.4} ${s*1.25} ${-s*0.3}" fill="none" stroke="#7fd1ff" stroke-width="${(s*0.2).toFixed(1)}" opacity=".55"/>`;
    if(k==='melt') return `<path d="M${cx-s*0.95} ${cy+s*0.5} q${s*0.5} ${-s*0.9} ${s*0.9} ${-s*0.2} q${s*0.5} ${s*0.3} ${s*0.85} ${-s*0.4}" fill="none" stroke="#e86a5a" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M${cx+s*0.15} ${cy+s*0.8} q${s*0.3} ${-s*0.35} 0 ${-s*0.62}" fill="none" stroke="#7fd1ff" stroke-width="1.9" stroke-linecap="round"/>`;
    if(k==='matter') return `<path d="M${cx-s*0.7} ${cy-s*0.85} h${s*1.4} l${-s*0.2} ${s*1.7} h${-s} Z" fill="rgba(127,209,255,.25)" stroke="#7fd1ff" stroke-width="1.4"/>
      <path d="M${cx-s*0.64} ${cy+s*0.05} h${s*1.28} l${-s*0.14} ${s*0.8} h${-s} Z" fill="#7fd1ff" opacity=".5"/>`;
    if(k==='phen') return `<polygon points="${cx-s*0.28},${cy-s} ${cx-s*0.82},${cy+s*0.12} ${cx-s*0.18},${cy+s*0.12} ${cx-s*0.48},${cy+s} ${cx+s*0.78},${cy-s*0.22} ${cx+s*0.08},${cy-s*0.22} ${cx+s*0.42},${cy-s}" fill="#ffd76a"/>`;
    if(k==='body') return `<rect x="${cx-s}" y="${cy-s*0.72}" width="${s*2}" height="${s*1.44}" rx="${s*0.24}" fill="rgba(143,209,168,.18)" stroke="#8fd1a8" stroke-width="1.5"/>
      <line x1="${cx-s*0.34}" y1="${cy-s*0.72}" x2="${cx-s*0.34}" y2="${cy+s*0.72}" stroke="#8fd1a8" stroke-width="1.1" opacity=".7"/>`;
    return '';
  }
  return {GOLD,BLUE,GREEN,RED,MUTED,PALE,INK,CSS,use,sv,l,l2,note,pred,cards,ico,snowflake};
})();

/* ================= УРОК 92 · Что изучает физика ================= */
(function(){
  const K=window.PKIT, GOLD=K.GOLD, BLUE=K.BLUE, GREEN=K.GREEN, RED=K.RED, MUTED=K.MUTED, PALE=K.PALE;
  const T=K.l, T2=K.l2, SV=K.sv, NOTE=K.note, PRED=K.pred, CARDS=K.cards, ICO=K.ico, SNOW=K.snowflake;

  const L92 = {
    id: 92, title: 'Что изучает физика', ico: '🔭',
    src: 'Физика · 5–6 класс · Что изучает физика', subj: 'phys',
    explain: [
      'Сегодня мы отправляемся в экспедицию. У Архимеда в рюкзаке лежит «Атлас чудес природы» — тетрадь, куда он записывает всё удивительное, что встречает в пути. Открываем её вместе с ним.',
      'В атласе три раздела. В первый попадают ТЕЛА — то, что можно увидеть и измерить: снежинка, планета, капля. Во второй — ВЕЩЕСТВА, из которых всё состоит: вода, золото, кислород. В третий — ЯВЛЕНИЯ, то есть процессы: молния, радуга, гейзер.',
      'Первая страница — чудеса-тела. Снежинка, планета, комета, капля, айсберг: у каждого есть форма, размер и масса. Тело — это предмет природы, который можно увидеть и измерить.',
      'Снежинка — целый кристалл льда с шестью лучами. Размер у неё около пяти миллиметров, масса — примерно один миллиграмм. Форма есть, размер есть, массу можно измерить. Значит, снежинка — тело.',
      'Планета — тоже тело, только огромное. Диаметр Земли 12 742 километра, а масса — шесть секстиллионов тонн. У Сатурна вдобавок кольца из льда и камня. Тела бывают от миллиметра до миллионов километров.',
      'Вторая страница — чудеса-вещества. Вода, золото, кислород: это материалы природы, из которых сделаны тела. Вещество отвечает на вопрос «из чего сделано», а тело — на вопрос «что это такое».',
      'Смотри, какой фокус: снежинка, капля и пар — три разных тела, но вещество у них одно и то же, вода. Тело можно разбить или переплавить, а само вещество останется тем же.',
      'Третья страница — чудеса-явления. Молния, дождь, радуга, гейзер, северное сияние. Явление — это процесс: оно длится во времени, и внутри него что-то меняется.',
      'Северное сияние возникает так: заряженные частицы от Солнца влетают в атмосферу у полюсов и заставляют воздух светиться. Длится оно минуты и часы. В руки такое чудо не возьмёшь — значит, это явление.',
      'Проверим. Дождь, гром и молния — что это? Это явления: они происходят во времени, у них есть начало и конец. Телом или веществом их не назовёшь.',
      'В экспедиции вышел спор. Снежинка говорит: я тело. Таяние говорит: я явление. Вода говорит: я вещество. Разберём каждого по очереди и рассудим спор.',
      'Снежинка — тело: её можно рассмотреть, у неё есть форма, размер и масса. А сделана она из вещества — из замёрзшей воды, то есть изо льда.',
      'Таяние — явление. Оно длится: снежинка постепенно превращается в каплю. Чтобы лёд растаял, нужно тепло, а при нуле градусов он начинает плавиться.',
      'Вода — вещество. Она прозрачная, без запаха, замерзает при нуле градусов и кипит при ста. Из неё получаются лёд, пар, снег и дождь, но само вещество при этом не меняется.',
      'Задача. В списке «снежинка, таяние, вода, капля» найди все тела. Снежинка и капля — тела, таяние — явление, вода — вещество. Значит, тел ровно два.',
      'Вторая задача. Что из «снежинка, таяние снега, лёд» является явлением? Конечно, таяние снега: снежинка и лёд — тела, а их превращение в воду — процесс.',
      'Теперь игра. Смотри на чудо природы и отправляй его в нужный раздел атласа: тело, вещество или явление. За каждый правильный ответ — очко.',
      'Памятка путешественника. Тела — то, что можно увидеть и измерить. Вещества — материалы природы. Явления — процессы во времени. С этими тремя разделами ты разберёшь любое чудо.'
    ],
    check: { q: 'Дождь, гром, молния — это…', choices: ['физические тела', 'вещества', 'физические явления'], ans: 2,
      exp: 'Дождь, гром и молния — изменения в природе, то есть физические явления.' },
    tasks: [
      { q: 'В списке «снежинка, таяние снега, вода, капля» сколько физических тел?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Тело — предмет, который можно увидеть и измерить.', 'Таяние — явление, а вода — вещество.', 'Остаются снежинка и капля.'],
        sol: '1 + 1 = 2: тела — снежинка и капля; таяние — явление, вода — вещество.' },
      { q: 'Какое слово обозначает физическое явление?', kind: 'choice', choices: ['Снежинка', 'Таяние снега', 'Лёд'], ans: 1,
        hints: ['Явление — процесс, изменение.', 'При таянии снег превращается в воду.'],
        sol: 'Таяние снега — явление, а снежинка и лёд — физические тела.' }
    ]
  };

  /* ---------- маленькие строители сцен ---------- */
  function tag(x,y,text,col,fs){
    const w=Math.max(58, String(text).length*7.2+16);
    return `<rect x="${(x-w/2).toFixed(1)}" y="${y-15}" width="${w.toFixed(1)}" height="22" rx="11" fill="rgba(7,20,24,.82)" stroke="${col}" stroke-width="1.3"/>
      ${T2(x, y, text, col, {fs:fs||11.5})}`;
  }
  function card3(x,y,w,h,col,kind,title,sub){
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="rgba(255,255,255,.045)" stroke="${col}" stroke-width="1.6"/>
      ${ICO(kind, x+w/2, y+Math.min(40,h*0.32), Math.min(19,h*0.17))}
      ${T(x+w/2, y+h-26, title, col, {fs:12.5})}
      ${T2(x+w/2, y+h-11, sub, MUTED, {fs:10.5})}`;
  }
  function star(x,y,col){
    return `<path d="M${x} ${y-7} L${x+2.2} ${y-2.2} L${x+7} ${y-1.6} L${x+3.2} ${y+1.8} L${x+4.4} ${y+6.6} L${x} ${y+4.1} L${x-4.4} ${y+6.6} L${x-3.2} ${y+1.8} L${x-7} ${y-1.6} L${x-2.2} ${y-2.2} Z" fill="${col}" opacity=".9"/>`;
  }

  /* ---------- сцены по шагам ---------- */
  function scene(step, st){
    if(step===0){
      return SV(`
        <rect x="14" y="14" width="308" height="224" rx="16" fill="rgba(20,60,52,.25)"/>
        <path d="M32 92 L88 56 L144 92" fill="none" stroke="#2c4f42" stroke-width="2"/>
        <path d="M196 92 L250 52 L304 92" fill="none" stroke="#2c4f42" stroke-width="2"/>
        <circle cx="286" cy="38" r="13" fill="#ffd76a" opacity=".85" class="pk-pulse"/>
        ${ICO('snow',52,124,16)}
        ${ICO('drop',52,172,11)}
        ${ICO('earth',252,178,16)}
        ${T(168,30,'ЭКСПЕДИЦИЯ АРХИМЕДА',GOLD,{fs:14})}
        <rect x="108" y="118" width="120" height="90" rx="14" fill="#1b3527" stroke="#3d5c49" stroke-width="2"/>
        <path d="M132 118 q36 -28 72 0" fill="none" stroke="#3d5c49" stroke-width="3"/>
        <rect x="120" y="140" width="96" height="56" rx="9" fill="#0f2018" stroke="#d9a441" stroke-width="2"/>
        ${T(168,164,'АТЛАС',GOLD,{fs:13})}
        ${T2(168,183,'чудес природы',GOLD,{fs:10.5})}
        ${T2(168,232,'три раздела — три страницы',MUTED,{fs:11})}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,26,'Три раздела атласа',GOLD,{fs:14})}
        ${card3(14,42,96,150,GREEN,'body','ТЕЛА','увидеть и измерить')}
        ${card3(120,42,96,150,BLUE,'matter','ВЕЩЕСТВА','материал природы')}
        ${card3(226,42,96,150,GOLD,'phen','ЯВЛЕНИЯ','процесс во времени')}
        <rect x="14" y="204" width="308" height="34" rx="10" fill="rgba(217,164,65,.1)" stroke="rgba(217,164,65,.45)" stroke-width="1.3"/>
        ${T2(168,225,'снежинка · планета   |   вода · золото   |   молния · радуга',PALE,{fs:10.5})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,24,'Страница 1 · чудеса-ТЕЛА',GREEN,{fs:14})}
        <rect x="14" y="38" width="308" height="148" rx="14" fill="rgba(143,209,168,.06)" stroke="rgba(143,209,168,.35)" stroke-width="1.4"/>
        ${ICO('snow',52,104,22)}
        ${T2(52,164,'снежинка',PALE,{fs:10.5})}
        ${ICO('earth',110,104,23)}
        ${T2(110,164,'планета',PALE,{fs:10.5})}
        ${ICO('comet',166,110,14)}
        ${T2(166,164,'комета',PALE,{fs:10.5})}
        ${ICO('drop',226,106,17)}
        ${T2(226,164,'капля',PALE,{fs:10.5})}
        ${ICO('ice',284,110,18)}
        ${T2(284,164,'айсберг',PALE,{fs:10.5})}
        ${T2(168,212,'тело: есть форма, размер, и массу можно измерить',GREEN,{fs:11.5})}
        ${T2(168,234,'от капли до планеты — всё это тела',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,24,'Снежинка-рекордсмен',BLUE,{fs:14})}
        <rect x="24" y="40" width="288" height="150" rx="14" fill="rgba(127,209,255,.05)" stroke="rgba(127,209,255,.3)" stroke-width="1.4"/>
        <g class="pk-spin">${SNOW(168,116,58,BLUE)}</g>
        <circle cx="168" cy="116" r="6" fill="#eaf6ff"/>
        <line x1="96" y1="52" x2="240" y2="52" stroke="${GOLD}" stroke-width="1.2"/>
        <line x1="96" y1="47" x2="96" y2="57" stroke="${GOLD}" stroke-width="2"/>
        <line x1="240" y1="47" x2="240" y2="57" stroke="${GOLD}" stroke-width="2"/>
        <text class="pk-t" x="168" y="46" text-anchor="middle" font-size="11" fill="#ffd76a">≈ 5 мм</text>
        <path d="M282 96 q14 20 0 40" fill="none" stroke="${GOLD}" stroke-width="1.4"/>
        ${T2(282,150,'≈ 1 мг',GOLD,{fs:11})}
        ${T2(168,212,'шесть лучей — шестиугольная симметрия',PALE,{fs:12})}
        ${T2(168,234,'кристалл льда: форма и размер есть',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,24,'Самое большое тело — планета',BLUE,{fs:14})}
        <circle cx="98" cy="118" r="52" fill="#1d5070" stroke="#7fd1ff" stroke-width="1.8"/>
        <ellipse cx="98" cy="112" rx="34" ry="16" fill="#8fd1a8" opacity=".55"/>
        <ellipse cx="88" cy="140" rx="18" ry="9" fill="#8fd1a8" opacity=".45"/>
        <ellipse cx="112" cy="96" rx="14" ry="7" fill="#cfe0cf" opacity=".5"/>
        ${T2(98,190,'Земля · 12 742 км',PALE,{fs:11.5})}
        <circle cx="250" cy="118" r="34" fill="#8a6a3a" stroke="#d9a441" stroke-width="1.6"/>
        <ellipse cx="250" cy="118" rx="62" ry="12" fill="none" stroke="#ffd76a" stroke-width="2" opacity=".8" transform="rotate(-14 250 118)"/>
        <ellipse cx="250" cy="118" rx="49" ry="8" fill="none" stroke="#ffd76a" stroke-width="1.2" opacity=".5" transform="rotate(-14 250 118)"/>
        ${T2(250,190,'Сатурн · кольца из льда',GOLD,{fs:11.5})}
        <line x1="40" y1="216" x2="296" y2="216" stroke="#4a6a58" stroke-width="1.2"/>
        <line x1="40" y1="210" x2="40" y2="222" stroke="#4a6a58" stroke-width="2"/>
        <line x1="296" y1="210" x2="296" y2="222" stroke="#4a6a58" stroke-width="2"/>
        ${T2(168,238,'от миллиметра до миллионов километров',MUTED,{fs:11})}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,24,'Страница 2 · чудеса-ВЕЩЕСТВА',BLUE,{fs:14})}
        <rect x="14" y="38" width="308" height="146" rx="14" fill="rgba(127,209,255,.05)" stroke="rgba(127,209,255,.3)" stroke-width="1.4"/>
        <path d="M48 66 h44 l-6 82 h-32 Z" fill="rgba(127,209,255,.28)" stroke="#7fd1ff" stroke-width="1.6"/>
        <path d="M48 118 h44 l-3 30 h-38 Z" fill="#7fd1ff" opacity=".55"/>
        ${T2(70,166,'вода',PALE,{fs:11.5})}
        <path d="M118 148 l22 -74 22 74 Z" fill="#d9a441" stroke="#ffd76a" stroke-width="1.5" opacity=".9"/>
        <path d="M132 148 l8 -30 8 30 Z" fill="#fff2c0" opacity=".7"/>
        ${T2(140,166,'золото',GOLD,{fs:11.5})}
        <rect x="196" y="72" width="42" height="76" rx="16" fill="rgba(143,209,168,.2)" stroke="#8fd1a8" stroke-width="1.6"/>
        <rect x="212" y="60" width="10" height="16" rx="4" fill="#8fd1a8" opacity=".7"/>
        <circle cx="209" cy="104" r="5" fill="#8fd1a8" opacity=".7" class="pk-float"/>
        <circle cx="224" cy="122" r="4" fill="#8fd1a8" opacity=".55" class="pk-float"/>
        ${T2(217,166,'кислород',GREEN,{fs:11.5})}
        ${T2(168,210,'вещество отвечает на вопрос «из чего сделано»',BLUE,{fs:12})}
        ${T2(168,234,'тела состоят из веществ',MUTED,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,24,'Вода-чародейка',BLUE,{fs:14})}
        ${SNOW(62,104,26,BLUE)}
        ${T2(62,150,'снежинка',PALE,{fs:11})}
        <path d="M138 122 q12 -22 24 0 q-12 22 -24 0" fill="#7fd1ff" opacity=".85"/>
        ${T2(150,150,'капля',PALE,{fs:11})}
        <path d="M228 120 q-12 -18 0 -30 q12 12 0 30 q-12 18 0 30 q12 -12 0 -30" fill="none" stroke="#8fd1a8" stroke-width="2.2" opacity=".85" class="pk-float"/>
        ${T2(252,150,'пар',PALE,{fs:11})}
        <path d="M40 176 h256" stroke="#3d5c49" stroke-width="1.2"/>
        ${T2(168,196,'снежинка и пар — разные тела',PALE,{fs:12})}
        <rect x="70" y="206" width="196" height="34" rx="10" fill="rgba(143,209,168,.12)" stroke="rgba(143,209,168,.5)" stroke-width="1.3"/>
        ${T2(168,228,'но вещество одно — ВОДА',GREEN,{fs:12})}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,24,'Страница 3 · чудеса-ЯВЛЕНИЯ',GOLD,{fs:14})}
        <rect x="14" y="38" width="308" height="112" rx="14" fill="rgba(255,215,106,.05)" stroke="rgba(255,215,106,.3)" stroke-width="1.4"/>
        ${ICO('bolt',66,84,20)} ${T2(66,138,'молния',GOLD,{fs:11})}
        ${ICO('rain',168,92,20)} ${T2(168,138,'дождь',BLUE,{fs:11})}
        ${ICO('rainbow',268,96,22)} ${T2(268,138,'радуга',PALE,{fs:11})}
        <rect x="14" y="160" width="308" height="50" rx="12" fill="rgba(255,215,106,.05)" stroke="rgba(255,215,106,.22)" stroke-width="1.3"/>
        ${ICO('geyser',64,185,13)} ${T2(108,190,'гейзер',GREEN,{fs:11})}
        ${ICO('aurora',232,185,14)} ${T2(278,190,'сияние',GREEN,{fs:11})}
        ${T2(168,228,'у явления есть ход во времени',GOLD,{fs:12})}
      `);
    }
    if(step===8){
      return SV(`
        ${T(168,24,'Северное сияние',GREEN,{fs:14})}
        <rect x="14" y="38" width="308" height="152" rx="14" fill="#050d16" stroke="#1e3a32" stroke-width="1.4"/>
        <circle cx="282" cy="62" r="16" fill="#ffd76a" opacity=".85" class="pk-pulse"/>
        ${[[246,84],[228,104],[206,122],[186,140]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#7fd1ff" opacity=".8"/>`).join('')}
        <path d="M96 62 q40 34 18 84 q-18 40 22 44" fill="none" stroke="#8fd1a8" stroke-width="7" opacity=".55" class="pk-glow" stroke-linecap="round"/>
        <path d="M132 58 q40 34 18 84 q-18 40 22 44" fill="none" stroke="#7fd1ff" stroke-width="7" opacity=".4" class="pk-glow" stroke-linecap="round"/>
        <path d="M60 210 q108 -34 216 0" fill="none" stroke="#2c4f42" stroke-width="3"/>
        ${T2(168,232,'частицы от Солнца — воздух светится',PALE,{fs:11.5})}
      `);
    }
    if(step===9){
      return SV(`
        ${T(168,26,'Задача-проверка',GOLD,{fs:14})}
        <rect x="14" y="42" width="96" height="140" rx="14" fill="rgba(127,209,255,.07)" stroke="rgba(127,209,255,.35)" stroke-width="1.4"/>
        <path d="M34 66 q22 18 0 36 q-22 18 0 36" fill="none" stroke="#7fd1ff" stroke-width="2.4" stroke-dasharray="4 7" class="pk-dash"/>
        ${T2(62,168,'дождь',BLUE,{fs:11.5})}
        <rect x="120" y="42" width="96" height="140" rx="14" fill="rgba(255,215,106,.07)" stroke="rgba(255,215,106,.35)" stroke-width="1.4"/>
        <circle cx="168" cy="92" r="10" fill="none" stroke="#ffd76a" stroke-width="1.6"/>
        <circle cx="168" cy="92" r="18" fill="none" stroke="#ffd76a" stroke-width="1.2" opacity=".6" class="pk-glow"/>
        ${T2(168,168,'гром',GOLD,{fs:11.5})}
        <rect x="226" y="42" width="96" height="140" rx="14" fill="rgba(232,106,90,.07)" stroke="rgba(232,106,90,.35)" stroke-width="1.4"/>
        <path d="M282 62 l-12 30 h12 l-10 34 24 -40 h-12 l10 -24 Z" fill="#ffd76a" class="pk-pulse"/>
        ${T2(274,168,'молния',GOLD,{fs:11.5})}
        ${T2(168,212,'дождь, гром и молния вместе —',PALE,{fs:12})}
        ${T2(168,234,'это явления природы',GOLD,{fs:12})}
      `);
    }
    if(step===10){
      return SV(`
        ${T(168,24,'Спор в экспедиции',GOLD,{fs:14})}
        ${SNOW(60,84,20,BLUE)}
        <rect x="18" y="112" width="86" height="34" rx="10" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="1.3"/>
        ${T2(61,134,'я — тело!',BLUE,{fs:11})}
        <path d="M112 84 q14 -20 0 -34 q-14 -14 0 -26" fill="none" stroke="#ff9a8a" stroke-width="2.4" class="pk-float"/>
        <rect x="122" y="112" width="96" height="34" rx="10" fill="rgba(232,106,90,.12)" stroke="#e86a5a" stroke-width="1.3"/>
        ${T2(170,134,'я — явление!',RED,{fs:11})}
        <path d="M262 78 q12 -18 24 0 q-12 18 -24 0" fill="#7fd1ff" opacity=".8"/>
        <rect x="230" y="112" width="90" height="34" rx="10" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="1.3"/>
        ${T2(275,134,'я — вещество!',GREEN,{fs:11})}
        ${T2(168,176,'у каждого своя роль',PALE,{fs:12})}
        ${T2(168,200,'разберём по очереди и рассудим спор',MUTED,{fs:11.5})}
        ${T2(168,228,'таблица атласа нас рассудит',GOLD,{fs:11.5})}
      `);
    }
    if(step===11){
      return SV(`
        ${T(168,24,'Снежинка — чудо-ТЕЛО',BLUE,{fs:14})}
        <circle cx="168" cy="112" r="64" fill="rgba(127,209,255,.06)" stroke="rgba(127,209,255,.4)" stroke-width="1.4"/>
        <g class="pk-spin">${SNOW(168,112,50,BLUE)}</g>
        <circle cx="196" cy="150" r="26" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
        <line x1="214" y1="168" x2="238" y2="192" stroke="${GOLD}" stroke-width="4" stroke-linecap="round"/>
        ${T2(96,196,'форма',GREEN,{fs:11.5})}
        ${T2(168,196,'размер',GREEN,{fs:11.5})}
        ${T2(244,196,'масса',GREEN,{fs:11.5})}
        ${T2(168,226,'всё это можно рассмотреть и измерить',PALE,{fs:12})}
      `);
    }
    if(step===12){
      return SV(`
        ${T(168,24,'Таяние — чудо-ЯВЛЕНИЕ',RED,{fs:14})}
        <rect x="14" y="40" width="308" height="136" rx="14" fill="rgba(232,106,90,.05)" stroke="rgba(232,106,90,.3)" stroke-width="1.4"/>
        ${SNOW(62,108,26,BLUE)}
        <path d="M96 108 h48" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 6" class="pk-dash"/>
        <path d="M152 130 q12 -24 24 0 q-12 24 -24 0" fill="#7fd1ff" opacity=".85"/>
        <path d="M148 108 l8 -6 l8 6" fill="none" stroke="${GOLD}" stroke-width="2"/>
        ${T2(240,90,'тепло',GOLD,{fs:12})}
        <path d="M226 100 q14 -18 0 -30" fill="none" stroke="#e86a5a" stroke-width="2.4" class="pk-float"/>
        <path d="M240 100 q14 -18 0 -30" fill="none" stroke="#e86a5a" stroke-width="2.4" class="pk-float"/>
        <rect x="196" y="132" width="104" height="34" rx="10" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.3"/>
        ${T2(248,154,'0 °C — и лёд тает',PALE,{fs:11})}
        ${T2(168,196,'снежинка → капля: длится во времени',PALE,{fs:12})}
        ${T2(168,222,'значит, таяние — явление',RED,{fs:12})}
        ${T2(168,240,'твёрдое становится жидким',MUTED,{fs:10.5})}
      `);
    }
    if(step===13){
      return SV(`
        ${T(168,24,'Вода — чудо-ВЕЩЕСТВО',GREEN,{fs:14})}
        <path d="M132 62 h72 l-10 96 h-52 Z" fill="rgba(127,209,255,.24)" stroke="#7fd1ff" stroke-width="1.8"/>
        <path d="M133 112 h70 l-5 45 h-58 Z" fill="#7fd1ff" opacity=".55"/>
        ${T2(168,92,'H₂O',PALE,{fs:15})}
        ${CARD3ROW(30,170,'прозрачная','без запаха')}
        ${T2(168,222,'замерзает при 0 °C, кипит при 100 °C',PALE,{fs:11.5})}
        ${T2(168,242,'из воды получаются лёд, пар, снег, дождь',MUTED,{fs:10.5})}
      `);
    }
    if(step===14){
      return SV(`
        ${T(168,26,'Задача · сколько здесь тел?',GOLD,{fs:13.5})}
        ${CARD4ROW()}
        ${T2(168,214,'таять может только тело, а лить — только вещество',MUTED,{fs:10.5})}
        ${T2(168,238,'считай только «что это такое»',PALE,{fs:11.5})}
      `);
    }
    if(step===15){
      return SV(`
        ${T(168,26,'Задача · что здесь явление?',GOLD,{fs:13.5})}
        ${card3(14,44,96,132,RED,'melt','таяние снега','процесс')}
        ${card3(120,44,96,132,BLUE,'snow','снежинка','тело')}
        ${card3(226,44,96,132,BLUE,'ice','лёд','тело')}
        <path d="M62 190 h212" stroke="#3d5c49" stroke-width="1.2"/>
        ${T2(168,212,'превращение одного в другое — процесс',PALE,{fs:11.5})}
        ${T2(168,236,'значит, явление здесь только одно',RED,{fs:12})}
      `);
    }
    if(step===16){
      const items=GAME92;
      const i=st.gIdx||0, it=items[i];
      const ok=st.gOk||0, bad=st.gBad||0;
      const res=st.gRes;
      return SV(`
        ${T(168,24,'Игра · разделы атласа',GOLD,{fs:14})}
        <rect x="24" y="36" width="288" height="112" rx="14" fill="rgba(255,255,255,.05)" stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${ICO(it[2],168,88,28)}
        ${T(168,124,it[0],PALE,{fs:15})}
        ${res==null?'':`<path d="M276 52 l-12 13 l-6 -7" fill="none" stroke="${res?'#8fd1a8':'#e86a5a'}" stroke-width="3" stroke-linecap="round"/>`}
        ${T2(60,168,'верно: '+ok,GREEN,{fs:12})}
        ${T2(168,168,'ошибок: '+bad,RED,{fs:12})}
        ${T2(276,168,'всего: '+items.length,GOLD,{fs:12})}
        <rect x="24" y="186" width="288" height="48" rx="12" fill="rgba(217,164,65,.08)" stroke="rgba(217,164,65,.4)" stroke-width="1.3"/>
        ${res==null
          ? T2(168,215,'выбери раздел кнопкой ниже',GOLD,{fs:12})
          : T2(168,209,(res?'верно: ':'не угадал: ')+it[0]+' — это '+it[3], res?GREEN:RED, {fs:11.5})}
        ${res==null?'':T2(168,230,'нажми любую кнопку — будет следующее чудо',MUTED,{fs:10.5})}
      `);
    }
    if(step===17){
      return SV(`
        ${T(168,24,'Памятка путешественника',GOLD,{fs:14})}
        ${card3(14,42,96,118,GREEN,'body','ТЕЛА','увидеть и измерить')}
        ${card3(120,42,96,118,BLUE,'matter','ВЕЩЕСТВА','материалы природы')}
        ${card3(226,42,96,118,GOLD,'phen','ЯВЛЕНИЯ','процессы во времени')}
        <rect x="14" y="172" width="308" height="66" rx="12" fill="rgba(143,209,168,.08)" stroke="rgba(143,209,168,.4)" stroke-width="1.3"/>
        ${T2(168,194,'снежинка · планета · капля — тела',GREEN,{fs:11.5})}
        ${T2(168,212,'вода · золото · кислород — вещества',BLUE,{fs:11.5})}
        ${T2(168,230,'молния · радуга · гейзер — явления',GOLD,{fs:11.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }

  const GAME92=[['снежинка','t','snow','тело'],['вода','v','water','вещество'],['молния','y','bolt','явление'],
    ['капля','t','drop','тело'],['золото','v','gold','вещество'],['радуга','y','rainbow','явление'],
    ['планета','t','earth','тело'],['кислород','v','air','вещество'],['гейзер','y','geyser','явление']];
  function game92(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME92.length; st.gRes=null; chRender(0); return; }
      const it=GAME92[st.gIdx||0];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  }
  window.pk92Game=game92;

  function CARD3ROW(x,y,t1,t2){
    return `<rect x="86" y="160" width="164" height="46" rx="11" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.3"/>
      ${T2(168,180,t1,PALE,{fs:11.5})}
      ${T2(168,198,t2,PALE,{fs:11.5})}`;
  }
  function CARD4ROW(){
    return `<rect x="14" y="44" width="150" height="76" rx="12" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="1.4"/>
      ${T2(89,76,'снежинка',BLUE,{fs:12})}${T2(89,98,'тело',MUTED,{fs:10.5})}
      <rect x="172" y="44" width="150" height="76" rx="12" fill="rgba(232,106,90,.08)" stroke="#e86a5a" stroke-width="1.4"/>
      ${T2(247,76,'таяние',RED,{fs:12})}${T2(247,98,'явление',MUTED,{fs:10.5})}
      <rect x="14" y="128" width="150" height="76" rx="12" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="1.4"/>
      ${T2(89,160,'вода',GREEN,{fs:12})}${T2(89,182,'вещество',MUTED,{fs:10.5})}
      <rect x="172" y="128" width="150" height="76" rx="12" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="1.4"/>
      ${T2(247,160,'капля',BLUE,{fs:12})}${T2(247,182,'тело',MUTED,{fs:10.5})}`;
  }

  const PRED92=[
    ['q1','Сколько разделов в атласе Архимеда?',[{k:'a',t:'три',ok:true,fb:'верно: тела, вещества, явления'},{k:'b',t:'один',ok:false,fb:'нет, страниц-разделов три'}]],
    ['q2','Куда в атласе попадёт молния?',[{k:'a',t:'в явления',ok:true,fb:'верно: молния — процесс'},{k:'b',t:'в тела',ok:false,fb:'молнию нельзя измерить линейкой'}]],
    ['q3','Тело — это то, что…',[{k:'a',t:'можно увидеть и измерить',ok:true,fb:'верно: форма, размер, масса'},{k:'b',t:'можно налить в стакан',ok:false,fb:'это про вещество'}]],
    ['q4','Снежинка — это…',[{k:'a',t:'тело',ok:true,fb:'верно: у неё есть форма и масса'},{k:'b',t:'вещество',ok:false,fb:'вещество — это вода, а снежинка из неё сделана'}]],
    ['q5','Что можно измерить у снежинки?',[{k:'a',t:'размер и массу',ok:true,fb:'верно: 5 мм и 1 мг'},{k:'b',t:'только цвет',ok:false,fb:'цвет не измеряют линейкой'}]],
    ['q6','Вещества — это…',[{k:'a',t:'материалы природы',ok:true,fb:'верно: вода, золото, кислород'},{k:'b',t:'процессы в природе',ok:false,fb:'процессы — это явления'}]],
    ['q7','Снежинка и пар — это…',[{k:'a',t:'одно вещество',ok:true,fb:'верно: оба из воды'},{k:'b',t:'разные вещества',ok:false,fb:'разные тела, а вещество одно'}]],
    ['q8','Явление — это…',[{k:'a',t:'процесс во времени',ok:true,fb:'верно: длится и что-то меняет'},{k:'b',t:'предмет, который можно взять',ok:false,fb:'в руки возьмёшь тело, а не явление'}]],
    ['q9','Можно ли взять северное сияние в руки?',[{k:'a',t:'нет, это явление',ok:true,fb:'верно: длится минуты и часы'},{k:'b',t:'да, это тело',ok:false,fb:'у него нет формы и размера'}]],
    ['q10','Дождь и гром — это…',[{k:'a',t:'явления',ok:true,fb:'верно: процессы в природе'},{k:'b',t:'тела',ok:false,fb:'у дождя нет постоянной формы'}]],
    ['q11','Кто из спорщиков — вещество?',[{k:'a',t:'вода',ok:true,fb:'верно: материал природы'},{k:'b',t:'снежинка',ok:false,fb:'снежинка — тело из вещества'}]],
    ['q12','Что доказывает, что снежинка — тело?',[{k:'a',t:'есть форма, размер и масса',ok:true,fb:'верно: всё это измеряют'},{k:'b',t:'она холодная',ok:false,fb:'температура не главное'}]],
    ['q13','Таяние — это…',[{k:'a',t:'явление',ok:true,fb:'верно: длится, и лёд становится водой'},{k:'b',t:'тело',ok:false,fb:'тело — это сама снежинка или лёд'}]],
    ['q14','При какой температуре вода замерзает?',[{k:'a',t:'при 0 °C',ok:true,fb:'верно: ноль градусов'},{k:'b',t:'при 100 °C',ok:false,fb:'при 100 °C вода кипит'}]],
    ['q15','Сколько тел в списке «снежинка, таяние, вода, капля»?',[{k:'a',t:'два',ok:true,fb:'верно: снежинка и капля'},{k:'b',t:'три',ok:false,fb:'таяние — явление, вода — вещество'}]],
    ['q16','Что из трёх — явление?',[{k:'a',t:'таяние снега',ok:true,fb:'верно: это процесс'},{k:'b',t:'лёд',ok:false,fb:'лёд — тело'}]],
    ['q17','Сколько разделов у атласа?',[{k:'a',t:'три',ok:true,fb:'верно: тела, вещества, явления'},{k:'b',t:'два',ok:false,fb:'разделов именно три'}]],
    ['q18','О чём рассказывает третий раздел атласа?',[{k:'a',t:'что происходит во времени',ok:true,fb:'верно: это раздел явлений'},{k:'b',t:'сколько весит тело',ok:false,fb:'масса — это про тела, первый раздел'}]]
  ];

  function visB92(el){
    try{
      K.use();
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'92';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===16){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:6px;width:min(100%,340px)">${[['t','ТЕЛО'],['v','ВЕЩЕСТВО'],['y','ЯВЛЕНИЕ']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;padding-left:4px;padding-right:4px;font-size:13px" onclick="pk92Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — будет следующее чудо':'выбери раздел для этого чуда'}</div>`;
      } else if(step===13){
        extra=`<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:340px">
          ${[['0 °C','замерзает'],['100 °C','кипит'],['без запаха','прозрачная']].map(x=>
          `<span style="border:1px solid #3d5c49;border-radius:9px;padding:5px 10px;color:#e8dcc8;font-size:12px">${x[0]} — ${x[1]}</span>`).join('')}</div>`;
      }
      const p=(step===16)?null:PRED92[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES92[step]?NOTE(NOTES92[step][0],NOTES92[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }

  const NOTES92=[
    ['Атлас','Три страницы — три раздела: тела, вещества, явления. Всё, что встретишь, попадёт в один из них.'],
    ['Как различать','Тело — «что это?», вещество — «из чего сделано?», явление — «что происходит?».'],
    ['Тела','У тела есть форма и размер. Поэтому снежинку и планету измеряют одинаково — линейкой или расчётом.'],
    ['Снежинка','Шесть лучей — это кристалл льда. Размер около 5 мм, масса около 1 мг — обычные измерения.'],
    ['Планета','Земля — тело с диаметром 12 742 км. Тела бывают любых размеров, это не мешает им быть телами.'],
    ['Вещества','Вода, золото, кислород — это то, из чего сделаны тела. Одно и то же вещество встречается в разных телах.'],
    ['Одно вещество','Снежинка, капля и пар — разные тела из одной воды. Вещество при превращениях не исчезает.'],
    ['Явления','У явления есть ход во времени: началось, длится, закончилось. Именно поэтому его нельзя измерить линейкой.'],
    ['Сияние','Частицы от Солнца сталкиваются с воздухом у полюсов. Это долгий процесс — значит, явление.'],
    ['Проверка','Дождь, гром и молния — процессы. Тела тут нет ни одного.'],
    ['Спор','Один и тот же предмет может быть телом, а процесс вокруг него — явлением. Различай вопросы «что?» и «что происходит?».'],
    ['Снежинка-тело','Форма, размер, масса — три признака тела. Все они у снежинки есть.'],
    ['Таяние','Нужно тепло. При нуле градусов лёд плавится, и твёрдое становится жидким — это и есть процесс.'],
    ['Вода','Свойства воды постоянны: прозрачная, без запаха, 0 °C — замерзает, 100 °C — кипит.'],
    ['Задача 1','Снежинка и капля — тела. Таяние — явление, вода — вещество. Ответ: 2.'],
    ['Задача 2','Снежинка и лёд — тела, а их превращение в воду — процесс. Ответ: таяние снега.'],
    ['Игра','Сначала реши, «что это такое» — тело или вещество, а потом «что происходит» — явление.'],
    ['Памятка','Три вопроса к любому чуду природы — и ты всегда найдёшь его раздел в атласе.']
  ];

  window.WAVE_B[92]=visB92;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===92){ arr[i]=L92; f=true; break; } }
    if(!f) arr.push(L92);
  })();
})();

/* ================= УРОК 93 · Измерения: длина, масса, время ================= */
(function(){
  const K=window.PKIT, GOLD=K.GOLD, BLUE=K.BLUE, GREEN=K.GREEN, RED=K.RED, MUTED=K.MUTED, PALE=K.PALE;
  const T=K.l, T2=K.l2, SV=K.sv, NOTE=K.note, PRED=K.pred, CARDS=K.cards;

  const L93 = {
    id: 93, title: 'Измерения: длина, масса, время', ico: '📏',
    src: 'Физика · 5–6 класс · Измерения: длина, масса, время', subj: 'phys',
    explain: [
      'Как измерить стол? Древние люди мерили локтями и ладонями, и у каждого получалось своё число: у взрослого пять локтей, у ребёнка — семь. Чтобы люди понимали друг друга, понадобились одинаковые единицы измерения.',
      'Измерить величину — значит сравнить её с выбранной единицей и узнать, сколько таких единиц укладывается. Сколько метров в столе, сколько килограммов в арбузе, сколько секунд длится урок.',
      'Главных измерений три: длину мерят в метрах, массу — в килограммах, время — в секундах. Для каждого есть свой прибор: линейка, весы, часы.',
      'Метр — основная единица длины. Сантиметр — его сотая часть: в одном метре ровно сто сантиметров. На линейке между большими делениями как раз сантиметры.',
      'Проверим на числе. Стол длиной три метра: 3 умножаем на 100 и получаем 300 сантиметров. Метр крупный, поэтому метров всегда меньше, чем сантиметров.',
      'Вторая задача: пять метров — это пятьсот сантиметров. Каждый метр даёт сто сантиметров, значит пять метров дают пять сотен.',
      'Теперь масса. Килограмм — основная единица, грамм — его тысячная часть. В одном килограмме тысяча граммов, и весы показывают именно их.',
      'Проверим: четыре килограмма — это четыре тысячи граммов. Умножаем на тысячу, потому что каждый килограмм даёт тысячу граммов.',
      'Со временем всё иначе. Час делится не на сто, а на шестьдесят минут, и это надо просто запомнить: в одном часе ровно шестьдесят минут.',
      'Секунда — самая маленькая единица времени. В минуте шестьдесят секунд. Скажи «раз-и-два-и» — прошло примерно две секунды.',
      'На помощь приходят приставки. «Санти» означает сотую часть: сантиметр — сотая часть метра. «Кило» означает тысячу: килограмм — тысяча граммов, километр — тысяча метров.',
      'Вот главная хитрость: чем крупнее единица, тем меньше число. Три метра и триста сантиметров — это одно и то же расстояние, просто записанное разными единицами.',
      'Трюк Архимеда простой. Умножаешь на сто — дописываешь два нуля: 5 метров станут 500 сантиметрами. Умножаешь на тысячу — дописываешь три нуля: 4 килограмма станут 4000 граммов.',
      'У каждой величины свой прибор. Линейкой мерят длину, весами — массу, часами — время. Путать приборы нельзя: линейкой массу не узнаешь.',
      'Измеряем мы постоянно, даже не замечая. Рост — метр сорок, арбуз — три двести, стометровку пробежали за двенадцать секунд. Всё это измерения.',
      'Проверим всё вместе: два метра — это двести сантиметров, три килограмма — три тысячи граммов, один час — шестьдесят минут. Умножаем на сто, на тысячу и на шестьдесят соответственно.',
      'А теперь тренажёр. Тебе покажут перевод единиц, а ты выбери, на что умножать: на сто, на тысячу или на шестьдесят. Считай очки.',
      'Совет Архимеда на память: 1 м = 100 см, 1 кг = 1000 г, 1 ч = 60 мин, 1 мин = 60 с. Мерить — значит сравнивать с единицей. Теперь можно переходить к проверке.'
    ],
    check: { q: 'Сколько сантиметров в 3 метрах?', choices: ['30 см', '300 см', '3000 см'], ans: 1,
      exp: '1 м = 100 см, значит 3 · 100 = 300 см.' },
    tasks: [
      { q: 'Сколько сантиметров в 5 метрах?', kind: 'unit', ans: 500, tol: 0,
        hints: ['1 м = 100 см.', '5 · 100 = ?'], sol: '5 · 100 = 500 см.' },
      { q: 'Сколько граммов в 4 килограммах?', kind: 'choice', choices: ['400 г', '4000 г', '40 000 г'], ans: 1,
        hints: ['1 кг = 1000 г.', '4 · 1000 = ?'], sol: '1 кг = 1000 г, значит 4 · 1000 = 4000 г.' }
    ]
  };

  function man(cx,cy,col,s){
    s=s||1;
    return `<circle cx="${cx}" cy="${cy-22*s}" r="${11*s}" fill="${col}" opacity=".85"/>
      <path d="M${cx} ${cy-11*s} V${cy+10*s} M${cx-14*s} ${cy-2*s} H${cx+14*s} M${cx} ${cy+10*s} L${cx-11*s} ${cy+34*s} M${cx} ${cy+10*s} L${cx+11*s} ${cy+34*s}"
        stroke="${col}" stroke-width="${3*s}" fill="none" stroke-linecap="round"/>`;
  }
  function ruler(cx,cy,w){
    const n=6, step=w/n;
    let t='';
    for(let i=0;i<=n;i++) t+=`<line x1="${(cx-w/2+i*step).toFixed(1)}" y1="${cy-9}" x2="${(cx-w/2+i*step).toFixed(1)}" y2="${cy-2}" stroke="#7fd1ff" stroke-width="1.4"/>`;
    return `<rect x="${cx-w/2}" y="${cy-10}" width="${w}" height="20" rx="4" fill="rgba(127,209,255,.16)" stroke="#7fd1ff" stroke-width="1.5"/>${t}`;
  }
  function scales(cx,cy){
    return `<line x1="${cx}" y1="${cy-16}" x2="${cx}" y2="${cy+16}" stroke="#8fd1a8" stroke-width="2"/>
      <line x1="${cx-26}" y1="${cy-16}" x2="${cx+26}" y2="${cy-16}" stroke="#8fd1a8" stroke-width="2"/>
      <path d="M${cx-26} ${cy-16} l-8 14 h16 Z" fill="rgba(143,209,168,.3)" stroke="#8fd1a8" stroke-width="1.3"/>
      <path d="M${cx+26} ${cy-16} l-8 14 h16 Z" fill="rgba(143,209,168,.3)" stroke="#8fd1a8" stroke-width="1.3"/>
      <rect x="${cx-16}" y="${cy+10}" width="32" height="8" rx="3" fill="rgba(143,209,168,.4)" stroke="#8fd1a8" stroke-width="1.2"/>`;
  }
  function clock(cx,cy,r,minAngle,label){
    const a=(minAngle-90)*Math.PI/180;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(255,215,106,.08)" stroke="#ffd76a" stroke-width="1.8"/>
      ${[0,1,2,3].map(i=>{const q=(i*90-90)*Math.PI/180; return `<line x1="${(cx+Math.cos(q)*(r-5)).toFixed(1)}" y1="${(cy+Math.sin(q)*(r-5)).toFixed(1)}" x2="${(cx+Math.cos(q)*r).toFixed(1)}" y2="${(cy+Math.sin(q)*r).toFixed(1)}" stroke="#ffd76a" stroke-width="1.6"/>`;}).join('')}
      <line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(a)*(r-11)).toFixed(1)}" y2="${(cy+Math.sin(a)*(r-11)).toFixed(1)}" stroke="#7fd1ff" stroke-width="2.2" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="3" fill="#ffd76a"/>
      ${label||''}`;
  }
  function tile(x,y,w,h,col,title,sub,inner){
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="rgba(255,255,255,.045)" stroke="${col}" stroke-width="1.6"/>
      ${inner(x+w/2, y+Math.min(42,h*0.34))}
      ${T(x+w/2, y+h-26, title, col, {fs:12.5})}
      ${T2(x+w/2, y+h-11, sub, MUTED, {fs:10.5})}`;
  }
  function bar(x,y,w,h,seg,filled,total){
    const step=w/total;
    let g='';
    for(let i=0;i<total;i++) g+=`<rect x="${(x+i*step).toFixed(1)}" y="${y}" width="${(step-2).toFixed(1)}" height="${h}" rx="4" fill="${i<filled?GOLD:'rgba(255,255,255,.07)'}" stroke="${i<filled?'#ffd76a':'#3d5c49'}" stroke-width="1.3"/>`;
    return g;
  }

  function scene(step, st){
    if(step===0){
      return SV(`
        <rect x="14" y="14" width="308" height="224" rx="16" fill="rgba(20,60,52,.25)"/>
        ${T(168,32,'Один стол — разные ответы',GOLD,{fs:14})}
        <rect x="60" y="118" width="216" height="14" rx="5" fill="#6a5a3a" stroke="#d9a441" stroke-width="1.4"/>
        <rect x="76" y="132" width="11" height="46" rx="3" fill="#4a3f2c"/>
        <rect x="249" y="132" width="11" height="46" rx="3" fill="#4a3f2c"/>
        ${man(80,84,GREEN,1)}
        ${man(256,88,BLUE,0.82)}
        ${T2(80,198,'«пять локтей»',GREEN,{fs:11.5})}
        ${T2(256,198,'«семь ладоней»',BLUE,{fs:11.5})}
        ${T2(168,222,'локти у всех разные — нужна общая единица',PALE,{fs:11.5})}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,26,'Измерить — значит сравнить',GOLD,{fs:14})}
        <rect x="30" y="58" width="240" height="18" rx="6" fill="#6a5a3a" stroke="#d9a441" stroke-width="1.4"/>
        ${[0,1,2,3].map(i=>`<rect x="${30+i*60}" y="92" width="56" height="34" rx="6" fill="${i<4?'rgba(127,209,255,.24)':'none'}" stroke="#7fd1ff" stroke-width="1.4"/>`).join('')}
        ${T2(168,150,'в столе уложилось 4 единицы длины',BLUE,{fs:12})}
        <rect x="70" y="170" width="196" height="34" rx="10" fill="rgba(217,164,65,.1)" stroke="rgba(217,164,65,.45)" stroke-width="1.3"/>
        ${T2(168,192,'единицу выбрали общую — метр',GOLD,{fs:12})}
        ${T2(168,226,'число единиц и есть измерение',MUTED,{fs:11})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,26,'Три главных измерения',GOLD,{fs:14})}
        ${tile(14,42,96,158,GREEN,'длина','метры, м',(cx,cy)=>ruler(cx,cy,64))}
        ${tile(120,42,96,158,BLUE,'масса','килограммы, кг',(cx,cy)=>scales(cx,cy))}
        ${tile(226,42,96,158,GOLD,'время','секунды, с',(cx,cy)=>clock(cx,cy,22,60))}
        ${T2(168,222,'у каждой величины свой прибор',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,26,'Метр и сантиметр',GOLD,{fs:14})}
        <rect x="24" y="60" width="288" height="34" rx="6" fill="rgba(127,209,255,.14)" stroke="#7fd1ff" stroke-width="1.6"/>
        ${Array.from({length:21},(_,i)=>`<line x1="${24+i*14.4}" y1="60" x2="${24+i*14.4}" y2="${i%5===0?76:70}" stroke="#7fd1ff" stroke-width="${i%5===0?1.8:1}"/>`).join('')}
        <line x1="24" y1="112" x2="312" y2="112" stroke="#ffd76a" stroke-width="1.4"/>
        <line x1="24" y1="106" x2="24" y2="118" stroke="#ffd76a" stroke-width="2.2"/>
        <line x1="312" y1="106" x2="312" y2="118" stroke="#ffd76a" stroke-width="2.2"/>
        ${T2(168,132,'один метр',GOLD,{fs:12})}
        <line x1="24" y1="152" x2="38.4" y2="152" stroke="#8fd1a8" stroke-width="1.4"/>
        <line x1="24" y1="146" x2="24" y2="158" stroke="#8fd1a8" stroke-width="1.8"/>
        <line x1="38.4" y1="146" x2="38.4" y2="158" stroke="#8fd1a8" stroke-width="1.8"/>
        ${T2(88,156,'1 см — сотая часть метра',GREEN,{fs:11.5})}
        ${T2(168,192,'1 м = 100 см',PALE,{fs:17})}
        ${T2(168,224,'санти — значит сотая',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      const m=Math.max(1,Math.min(5,+(st.m93==null?3:st.m93)));
      return SV(`
        ${T(168,26,'Задача-проверка · 3 м',GOLD,{fs:14})}
        <rect x="28" y="56" width="280" height="26" rx="5" fill="rgba(255,255,255,.06)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect id="pk93fill" x="28" y="56" width="${(m/5*280).toFixed(1)}" height="26" rx="5" fill="rgba(255,215,106,.35)" stroke="#ffd76a" stroke-width="1.3"/>
        ${T2(168,72,m+' м',GOLD,{fs:12.5})}
        <g id="pk93segs">${Array.from({length:5},(_,i)=>`<rect x="${28+i*56}" y="94" width="52" height="28" rx="5" fill="rgba(143,209,168,.18)" stroke="#8fd1a8" stroke-width="1.2" opacity="${i<m?1:0.25}"/>`).join('')}</g>
        ${T2(168,140,'каждый метр — это сто сантиметров',PALE,{fs:11.5})}
        <rect x="72" y="158" width="192" height="40" rx="12" fill="rgba(143,209,168,.12)" stroke="rgba(143,209,168,.5)" stroke-width="1.4"/>
        <text class="pk-t" x="168" y="185" text-anchor="middle" font-size="19" fill="#8fd1a8">${m} м = ${m*100} см</text>
        ${T2(168,226,'двигай ползунок — смотри, как меняется ответ',MUTED,{fs:11})}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,26,'Задача 1 · пять метров',GOLD,{fs:14})}
        <rect x="24" y="52" width="288" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.3"/>
        ${bar(30,58,276,18,1,5,5)}
        ${T2(168,102,'5 метров',GOLD,{fs:13})}
        <rect x="24" y="118" width="288" height="30" rx="6" fill="rgba(255,255,255,.05)" stroke="#3d5c49" stroke-width="1.3"/>
        ${bar(30,124,276,18,1,5,5)}
        ${T2(168,168,'это же расстояние в сантиметрах',PALE,{fs:11.5})}
        ${T2(168,200,'5 · 100 = 500 см',GREEN,{fs:19})}
        ${T2(168,230,'каждый метр даёт сотню сантиметров',MUTED,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,26,'Килограмм и грамм',GOLD,{fs:14})}
        ${scales(96,110)}
        ${T2(96,176,'гиря 1 кг',GREEN,{fs:12})}
        <rect x="176" y="96" width="18" height="18" rx="3" fill="rgba(255,215,106,.5)" stroke="#ffd76a" stroke-width="1.2"/>
        ${Array.from({length:24},(_,i)=>`<rect x="${200+(i%6)*17}" y="${96+Math.floor(i/6)*17}" width="13" height="13" rx="3" fill="rgba(255,215,106,.22)" stroke="#ffd76a" stroke-width="0.9" opacity=".85"/>`).join('')}
        ${T2(252,186,'очень много граммов',GOLD,{fs:11})}
        ${T2(168,212,'1 кг = 1000 г',PALE,{fs:17})}
        ${T2(168,236,'кило — значит тысяча',MUTED,{fs:11})}
      `);
    }
    if(step===7){
      const g=Math.max(1,Math.min(5,+(st.kg93==null?4:st.kg93)));
      return SV(`
        ${T(168,26,'Задача 2 · четыре килограмма',GOLD,{fs:14})}
        <rect x="28" y="56" width="280" height="26" rx="5" fill="rgba(255,255,255,.06)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect id="pk93fill" x="28" y="56" width="${(g/5*280).toFixed(1)}" height="26" rx="5" fill="rgba(255,215,106,.35)" stroke="#ffd76a" stroke-width="1.3"/>
        ${T2(168,72,g+' кг',GOLD,{fs:12.5})}
        <g id="pk93segs">${Array.from({length:5},(_,i)=>`<rect x="${28+i*56}" y="94" width="52" height="28" rx="5" fill="rgba(143,209,168,.18)" stroke="#8fd1a8" stroke-width="1.2" opacity="${i<g?1:0.25}"/>`).join('')}</g>
        ${T2(168,140,'каждый килограмм — тысяча граммов',PALE,{fs:11.5})}
        <rect x="66" y="158" width="204" height="40" rx="12" fill="rgba(143,209,168,.12)" stroke="rgba(143,209,168,.5)" stroke-width="1.4"/>
        <text class="pk-t" x="168" y="185" text-anchor="middle" font-size="19" fill="#8fd1a8">${g} кг = ${g*1000} г</text>
        ${T2(168,226,'двигай ползунок — число граммов растёт в тысячу раз',MUTED,{fs:11})}
      `);
    }
    if(step===8){
      return SV(`
        ${T(168,26,'Час и минута',GOLD,{fs:14})}
        ${clock(96,116,52,60,`<line x1="96" y1="116" x2="96" y2="80" stroke="#ffd76a" stroke-width="2.6" stroke-linecap="round"/>`)}
        ${T2(96,192,'минутная стрелка на 12',PALE,{fs:11})}
        ${Array.from({length:12},(_,i)=>`<circle cx="${200+(i%6)*20}" cy="${92+Math.floor(i/6)*22}" r="6" fill="rgba(255,215,106,.25)" stroke="#ffd76a" stroke-width="1.1"/>`).join('')}
        ${T2(252,150,'60 минут — целый круг',GOLD,{fs:11})}
        ${T2(168,216,'1 час = 60 минут',PALE,{fs:17})}
        ${T2(168,238,'час делится на шестьдесят, а не на сто',MUTED,{fs:11})}
      `);
    }
    if(step===9){
      return SV(`
        ${T(168,26,'Секунда',GOLD,{fs:14})}
        <circle cx="168" cy="120" r="58" fill="rgba(127,209,255,.07)" stroke="#7fd1ff" stroke-width="1.8"/>
        ${Array.from({length:12},(_,i)=>{const a=(i*30-90)*Math.PI/180; return `<line x1="${(168+Math.cos(a)*48).toFixed(1)}" y1="${(120+Math.sin(a)*48).toFixed(1)}" x2="${(168+Math.cos(a)*58).toFixed(1)}" y2="${(120+Math.sin(a)*58).toFixed(1)}" stroke="#7fd1ff" stroke-width="1.5"/>`;}).join('')}
        <line x1="168" y1="120" x2="168" y2="72" stroke="#ffd76a" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="168" y1="120" x2="206" y2="146" stroke="#8fd1a8" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="168" cy="120" r="3.4" fill="#ffd76a"/>
        ${T2(168,204,'одна минута — шестьдесят секунд',PALE,{fs:12})}
        ${T2(168,230,'«раз-и-два-и» — примерно две секунды',MUTED,{fs:11})}
      `);
    }
    if(step===10){
      return SV(`
        ${T(168,26,'Приставки-помощники',GOLD,{fs:14})}
        <rect x="18" y="46" width="146" height="96" rx="13" fill="rgba(143,209,168,.07)" stroke="#8fd1a8" stroke-width="1.5"/>
        ${T(91,74,'санти-',GREEN,{fs:16})}
        ${T2(91,100,'сотая часть',PALE,{fs:12})}
        ${T2(91,124,'1 см = 0,01 м',MUTED,{fs:11})}
        <rect x="172" y="46" width="146" height="96" rx="13" fill="rgba(255,215,106,.07)" stroke="#ffd76a" stroke-width="1.5"/>
        ${T(245,74,'кило-',GOLD,{fs:16})}
        ${T2(245,100,'тысяча',PALE,{fs:12})}
        ${T2(245,124,'1 кг = 1000 г',MUTED,{fs:11})}
        ${T2(168,170,'сантиметр — сотая часть метра',PALE,{fs:11.5})}
        ${T2(168,196,'километр — тысяча метров',PALE,{fs:11.5})}
        ${T2(168,228,'запомнил приставку — не перепутаешь единицы',MUTED,{fs:11})}
      `);
    }
    if(step===11){
      return SV(`
        ${T(168,26,'Крупнее единица — меньше число',GOLD,{fs:14})}
        ${T2(168,50,'одно и то же расстояние',MUTED,{fs:11})}
        <rect x="24" y="66" width="288" height="52" rx="11" fill="rgba(143,209,168,.08)" stroke="#8fd1a8" stroke-width="1.4"/>
        <rect x="120" y="80" width="120" height="24" rx="5" fill="rgba(143,209,168,.3)" stroke="#8fd1a8" stroke-width="1.3"/>
        ${T2(60,96,'3 м',GREEN,{fs:16})}
        <rect x="24" y="132" width="288" height="52" rx="11" fill="rgba(127,209,255,.08)" stroke="#7fd1ff" stroke-width="1.4"/>
        <rect x="52" y="146" width="252" height="24" rx="5" fill="rgba(127,209,255,.28)" stroke="#7fd1ff" stroke-width="1.3"/>
        ${T2(272,162,'300 см',BLUE,{fs:14})}
        ${T2(168,208,'метр крупный — метров мало,',PALE,{fs:11.5})}
        ${T2(168,228,'сантиметр мелкий — сантиметров много',PALE,{fs:11.5})}
      `);
    }
    if(step===12){
      return SV(`
        ${T(168,26,'Трюк Архимеда',GOLD,{fs:14})}
        <rect x="18" y="46" width="146" height="120" rx="13" fill="rgba(255,215,106,.07)" stroke="#ffd76a" stroke-width="1.5"/>
        ${T(91,76,'× 100',GOLD,{fs:17})}
        ${T2(91,104,'допиши два нуля',PALE,{fs:11.5})}
        ${T2(91,134,'5 м = 500 см',GREEN,{fs:13})}
        <rect x="172" y="46" width="146" height="120" rx="13" fill="rgba(127,209,255,.07)" stroke="#7fd1ff" stroke-width="1.5"/>
        ${T(245,76,'× 1000',BLUE,{fs:17})}
        ${T2(245,104,'допиши три нуля',PALE,{fs:11.5})}
        ${T2(245,134,'4 кг = 4000 г',GREEN,{fs:13})}
        ${T2(168,192,'ноль — это просто сдвиг запятой',MUTED,{fs:11})}
        ${T2(168,220,'5 → 500 и 4 → 4000',PALE,{fs:13})}
      `);
    }
    if(step===13){
      return SV(`
        ${T(168,26,'У каждой величины свой прибор',GOLD,{fs:14})}
        ${tile(14,42,96,140,GREEN,'линейка','длина',(cx,cy)=>ruler(cx,cy,62))}
        ${tile(120,42,96,140,BLUE,'весы','масса',(cx,cy)=>scales(cx,cy))}
        ${tile(226,42,96,140,GOLD,'часы','время',(cx,cy)=>clock(cx,cy,20,40))}
        ${T2(168,200,'чем измерить арбуз?',PALE,{fs:12})}
        ${T2(168,226,'выбери прибор для МАССЫ арбуза',MUTED,{fs:11})}
      `);
    }
    if(step===14){
      return SV(`
        ${T(168,26,'Измеряем каждый день',GOLD,{fs:14})}
        <rect x="18" y="44" width="300" height="50" rx="11" fill="rgba(143,209,168,.07)" stroke="#8fd1a8" stroke-width="1.4"/>
        ${T(80,68,'рост',GREEN,{fs:12})}
        ${T(80,86,'1 м 40 см',PALE,{fs:13})}
        ${T(186,68,'= 140 см',MUTED,{fs:11.5})}
        <rect x="18" y="104" width="300" height="50" rx="11" fill="rgba(255,215,106,.07)" stroke="#ffd76a" stroke-width="1.4"/>
        ${T(80,128,'арбуз',GOLD,{fs:12})}
        ${T(80,146,'3 кг 200 г',PALE,{fs:13})}
        ${T(186,128,'= 3200 г',MUTED,{fs:11.5})}
        <rect x="18" y="164" width="300" height="50" rx="11" fill="rgba(127,209,255,.07)" stroke="#7fd1ff" stroke-width="1.4"/>
        ${T(80,188,'забег',BLUE,{fs:12})}
        ${T(80,206,'12 секунд',PALE,{fs:13})}
        ${T(186,188,'100 метров',MUTED,{fs:11.5})}
        ${T2(168,236,'каждое число — это измерение',MUTED,{fs:11})}
      `);
    }
    if(step===15){
      return SV(`
        ${T(168,26,'Проверь себя',GOLD,{fs:14})}
        ${[['2 м','200 см',GREEN],['3 кг','3000 г',GOLD],['1 час','60 минут',BLUE]].map((x,i)=>
          `<rect x="18" y="${46+i*54}" width="300" height="44" rx="11" fill="rgba(255,255,255,.05)" stroke="${x[2]}" stroke-width="1.4"/>
           ${T(84,74+i*54,x[0],x[2],{fs:15})}
           ${T(160,74+i*54,'=',MUTED,{fs:14})}
           ${T(240,74+i*54,x[1],PALE,{fs:14})}`).join('')}
        ${T2(168,222,'×100 для сантиметров, ×1000 для граммов, ×60 для минут',MUTED,{fs:10.5})}
      `);
    }
    if(step===16){
      const items=TRAIN93;
      const it=items[(st.tIdx||0)%items.length];
      const res=st.tRes, ok=st.tOk||0, bad=st.tBad||0;
      return SV(`
        ${T(168,26,'Тренажёр · перевод единиц',GOLD,{fs:14})}
        <rect x="24" y="42" width="288" height="110" rx="14" fill="rgba(255,255,255,.05)" stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,86,it[0]+'  →  '+it[1],PALE,{fs:22})}
        ${T2(168,124,res==null?'во сколько раз умножать?':(res?'верно: ':'неверно: ')+it[3],res==null?MUTED:(res?GREEN:RED),{fs:12})}
        ${T2(70,176,'верно: '+ok,GREEN,{fs:12})}
        ${T2(168,176,'ошибок: '+bad,RED,{fs:12})}
        ${T2(266,176,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,res==null?'выбери множитель кнопками ниже':'нажми любую кнопку — будет следующий пример',MUTED,{fs:11})}
        ${T2(168,238,'длина ×100 · масса ×1000 · время ×60',MUTED,{fs:10.5})}
      `);
    }
    if(step===17){
      return SV(`
        ${T(168,26,'Совет Архимеда',GOLD,{fs:14})}
        ${[['1 м','100 см',GREEN],['1 кг','1000 г',GOLD],['1 ч','60 мин',BLUE],['1 мин','60 с',BLUE]].map((x,i)=>
          `<rect x="${18+(i%2)*152}" y="${46+Math.floor(i/2)*60}" width="146" height="50" rx="11" fill="rgba(255,255,255,.05)" stroke="${x[2]}" stroke-width="1.4"/>
           ${T(60+(i%2)*152,77+Math.floor(i/2)*60,x[0],x[2],{fs:15})}
           ${T(126+(i%2)*152,77+Math.floor(i/2)*60,'= '+x[1],PALE,{fs:12})}`).join('')}
        ${T2(168,192,'мерить — значит сравнивать с единицей',PALE,{fs:12})}
        ${T2(168,220,'запомни четыре равенства — и любая задача решается',MUTED,{fs:11})}
        ${T2(168,240,'готов к проверке!',GREEN,{fs:11.5})}
      `);
    }
    return SV(`${T(168,126,'Сцена готовится',GOLD,{fs:14})}`);
  }

  const TRAIN93=[['3 м','см','100','3 м = 300 см'],
    ['4 кг','г','1000','4 кг = 4000 г'],
    ['2 ч','мин','60','2 ч = 120 мин'],
    ['5 м','см','100','5 м = 500 см'],
    ['7 кг','г','1000','7 кг = 7000 г'],
    ['3 мин','с','60','3 мин = 180 с']];
  function train93(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.tRes!=null){ st.tIdx=((st.tIdx||0)+1)%TRAIN93.length; st.tRes=null; chRender(0); return; }
      const it=TRAIN93[(st.tIdx||0)%TRAIN93.length];
      st.tRes=(it[2]===String(k));
      if(st.tRes) st.tOk=(st.tOk||0)+1; else st.tBad=(st.tBad||0)+1;
      chRender(0);
    }catch(e){}
  }
  window.pk93Train=train93;
  window.pk93Set=function(key,v){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk][key]=+v;
      const out=document.getElementById('pk93out');
      if(out) out.textContent=(key==='m93')?((+v)+' м = '+(+v*100)+' см'):((+v)+' кг = '+(+v*1000)+' г');
      const fill=document.getElementById('pk93fill');
      if(fill) fill.setAttribute('width',(Math.max(0,Math.min(5,+v))/5*280).toFixed(1));
      const segs=document.querySelectorAll('#pk93segs > *');
      segs.forEach((el,i)=>{ el.setAttribute('opacity', i<+v?'1':'0.25'); });
    }catch(e){}
  };

  const PRED93=[
    ['q1','Почему у ребят получились разные числа?',[{k:'a',t:'локти у всех разной длины',ok:true,fb:'верно: нужна общая единица'},{k:'b',t:'стол был разной длины',ok:false,fb:'стол один и тот же'}]],
    ['q2','Измерить величину — значит…',[{k:'a',t:'сравнить её с единицей',ok:true,fb:'верно: считаем, сколько единиц уложилось'},{k:'b',t:'назвать её на глаз',ok:false,fb:'на глаз — это не измерение'}]],
    ['q3','Чем измеряют массу?',[{k:'a',t:'весами',ok:true,fb:'верно: масса — в килограммах'},{k:'b',t:'линейкой',ok:false,fb:'линейка — для длины'}]],
    ['q4','Сколько сантиметров в одном метре?',[{k:'a',t:'сто',ok:true,fb:'верно: 1 м = 100 см'},{k:'b',t:'десять',ok:false,fb:'десять сантиметров — это дециметр'}]],
    ['q5','Три метра — это сколько сантиметров?',[{k:'a',t:'300 см',ok:true,fb:'верно: 3 · 100'},{k:'b',t:'30 см',ok:false,fb:'умножаем на 100, а не на 10'}]],
    ['q6','Пять метров — это…',[{k:'a',t:'500 см',ok:true,fb:'верно: 5 · 100'},{k:'b',t:'50 см',ok:false,fb:'каждый метр даёт сто сантиметров'}]],
    ['q7','Сколько граммов в килограмме?',[{k:'a',t:'тысяча',ok:true,fb:'верно: 1 кг = 1000 г'},{k:'b',t:'сто',ok:false,fb:'сто — это про сантиметры'}]],
    ['q8','Четыре килограмма — это…',[{k:'a',t:'4000 г',ok:true,fb:'верно: 4 · 1000'},{k:'b',t:'400 г',ok:false,fb:'умножаем на 1000'}]],
    ['q9','Сколько минут в часе?',[{k:'a',t:'60',ok:true,fb:'верно: час делится на шестьдесят'},{k:'b',t:'100',ok:false,fb:'время считают не сотнями'}]],
    ['q10','Сколько секунд в минуте?',[{k:'a',t:'60',ok:true,fb:'верно'},{k:'b',t:'100',ok:false,fb:'минута — это 60 секунд'}]],
    ['q11','Что означает приставка «кило»?',[{k:'a',t:'тысячу',ok:true,fb:'верно: килограмм — тысяча граммов'},{k:'b',t:'сотую часть',ok:false,fb:'сотую часть означает «санти»'}]],
    ['q12','Почему сантиметров получилось 300, а метров 3?',[{k:'a',t:'сантиметр мелкая единица, их много',ok:true,fb:'верно: чем мельче единица, тем больше число'},{k:'b',t:'это разные расстояния',ok:false,fb:'расстояние одно и то же'}]],
    ['q13','Сколько нулей дописать при умножении на 100?',[{k:'a',t:'два',ok:true,fb:'верно: 5 м → 500 см'},{k:'b',t:'три',ok:false,fb:'три нуля — при умножении на 1000'}]],
    ['q14','Чем измеряют время?',[{k:'a',t:'часами',ok:true,fb:'верно: и секундомером'},{k:'b',t:'весами',ok:false,fb:'весы показывают массу'}]],
    ['q15','Рост 1 м 40 см — это сколько сантиметров?',[{k:'a',t:'140 см',ok:true,fb:'верно: 100 + 40'},{k:'b',t:'104 см',ok:false,fb:'метр — это сто сантиметров'}]],
    ['q16','Три килограмма — это…',[{k:'a',t:'3000 г',ok:true,fb:'верно: 3 · 1000'},{k:'b',t:'300 г',ok:false,fb:'умножаем на тысячу'}]],
    ['q17','Чему равен множитель для минут?',[{k:'a',t:'60',ok:true,fb:'верно: час — 60 минут'},{k:'b',t:'100',ok:false,fb:'время не сотенное'}]],
    ['q18','Что значит «мерить»?',[{k:'a',t:'сравнивать с единицей',ok:true,fb:'верно: так и получается число'},{k:'b',t:'запоминать на глаз',ok:false,fb:'единица — обязательна'}]]
  ];

  const NOTES93=[
    ['Единая мера','Пока единицы разные, числа не сравнить. Метр договорились считать во всём мире одинаковым.'],
    ['Сравнение','Измерение — это ответ на вопрос «сколько единиц уложилось».'],
    ['Приборы','Длина — линейка, масса — весы, время — часы. У каждой величины свой прибор и своя единица.'],
    ['Метр','Санти — сотая часть. Поэтому в метре ровно сто сантиметров, а на линейке отметки идут через сантиметр.'],
    ['Проверка','3 \u00b7 100 = 300. Метр \u2014 крупная единица, поэтому метров мало, а сантиметров много: 3 \u043c = 300 \u0441\u043c.'],
    ['Задача 1','Каждый метр — сто сантиметров. Пять метров — пять сотен сантиметров.'],
    ['Килограмм','Кило — тысяча. Килограмм тяжелее грамма в тысячу раз.'],
    ['Задача 2','4 · 1000 = 4000. Умножаем на тысячу, а не приписываем один ноль.'],
    ['Час','Время считают не десятками: в часе шестьдесят минут, в минуте шестьдесят секунд.'],
    ['Секунда','Самая маленькая привычная единица времени. Секундомер отмеряет её точно.'],
    ['Приставки','санти — сотая, кило — тысяча. Одна приставка заменяет целую таблицу.'],
    ['Хитрость','Одно расстояние можно записать крупной единицей малым числом или мелкой единицей большим числом.'],
    ['Трюк','Умножение на 100 и на 1000 — это просто сдвиг: два или три нуля справа.'],
    ['Приборы','Линейкой массу не измеришь, весами длину не узнаешь. Прибор выбирают по величине.'],
    ['В жизни','Рост, вес арбуза, время забега — всё это измерения, просто мы к ним привыкли.'],
    ['Проверь себя','×100 для сантиметров, ×1000 для граммов, ×60 для минут и секунд.'],
    ['Тренажёр','Смотри на единицы: метр → сантиметр это ×100, килограмм → грамм это ×1000, час → минута это ×60.'],
    ['Совет','Четыре равенства: 1 м = 100 см, 1 кг = 1000 г, 1 ч = 60 мин, 1 мин = 60 с. Этого хватит для любой задачи.']
  ];

  function visB93(el){
    try{
      K.use();
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'93';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===4){
        const m=Math.max(1,Math.min(5,+(st.m93==null?3:st.m93)));
        extra=`<div style="width:min(100%,340px);display:flex;flex-direction:column;gap:4px;align-items:center">
          <input type="range" min="1" max="5" step="1" value="${m}" oninput="pk93Set('m93',this.value)" style="width:100%">
          <div id="pk93out" style="color:#ffd76a;font-family:Georgia,serif;font-size:15px">${m} м = ${m*100} см</div></div>`;
      } else if(step===7){
        const g=Math.max(1,Math.min(5,+(st.kg93==null?4:st.kg93)));
        extra=`<div style="width:min(100%,340px);display:flex;flex-direction:column;gap:4px;align-items:center">
          <input type="range" min="1" max="5" step="1" value="${g}" oninput="pk93Set('kg93',this.value)" style="width:100%">
          <div id="pk93out" style="color:#ffd76a;font-family:Georgia,serif;font-size:15px">${g} кг = ${g*1000} г</div></div>`;
      } else if(step===16){
        const done=st.tRes!=null;
        extra=`<div style="display:flex;gap:6px;width:min(100%,340px)">${[['100','× 100'],['1000','× 1000'],['60','× 60']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;font-size:13px;padding-left:4px;padding-right:4px" onclick="pk93Train('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующий пример':'выбери множитель'}</div>`;
      }
      const p=(step===16)?null:PRED93[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES93[step]?NOTE(NOTES93[step][0],NOTES93[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }

  window.WAVE_B[93]=visB93;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===93){ arr[i]=L93; f=true; break; } }
    if(!f) arr.push(L93);
  })();
})();


/* ================= УРОК 95 · Магниты и притяжение ================= */
(function(){
  const K=window.PKIT, GOLD=K.GOLD, BLUE=K.BLUE, GREEN=K.GREEN, RED=K.RED, MUTED=K.MUTED, PALE=K.PALE;
  const T=K.l, T2=K.l2, SV=K.sv, NOTE=K.note, PRED=K.pred;

  const L95 = {
    id: 95, title: 'Магниты и притяжение', ico: '🧲',
    src: 'Физика · 5–6 класс · Магниты и притяжение', subj: 'phys',
    explain: [
      'В городе Архимагнетии поезда летают над рельсами, двери открываются сами, а на холодильнике держатся записки. Всё это делает магнит. Архимед приглашает тебя на экскурсию по этому городу.',
      'Первый экспонат — магнит-стержень. У него два конца, и они называются полюсами: красный — северный, его обозначают буквой N, синий — южный, буква S.',
      'Магнит притягивает не всё подряд. Железо и сталь — да, а дерево, стекло и пластик — нет. Гвоздь прилипнет, карандаш — нет. Так дома можно искать железные вещи.',
      'Проверим на опыте. Поднеси магнит к гвоздю — прилип, значит внутри железо. К карандашу — не прилип, там дерево. К стеклянному стакану — тоже не прилип.',
      'Сила магнита невидима, но её видно. Насыпь на лист железные опилки и подложи магнит: опилки выстроятся в аккуратные дуги — это линии магнитного поля.',
      'Главное правило города: разные полюса притягиваются, одинаковые отталкиваются. Север и юг бегут навстречу друг другу, а два севера расходятся в стороны.',
      'Смотри на встречу: N слева и S справа. Магниты сближаются, будто здороваются. Разные полюса всегда притягиваются.',
      'А теперь два севера: N слева и N справа. Они упираются и разъезжаются, как два упрямца. Одинаковые полюса отталкиваются.',
      'Задача. Два магнита поднесли друг к другу северными полюсами. Это одноимённые полюса, значит они оттолкнутся и между ними останется зазор.',
      'Вторая задача. Южный полюс одного поднесли к северному полюсу другого. Полюса разные, значит магниты притянутся и прилипнут друг к другу.',
      'Дальше по городу — площадь Компаса. Стрелка компаса сама разворачивается на север. Почему она это делает, если её никто не крутит?',
      'Потому что Земля — гигантский магнит. В её центре раскалённое железо, и оно создаёт магнитное поле всей планеты, от полюса до полюса.',
      'Вот и секрет компаса. Красный конец стрелки — северный полюс, и он тянется к северу. Значит, там у Земли расположен южный магнитный полюс: притягиваются-то разные.',
      'Городское чудо — поезд на магнитной подушке. Магниты в рельсе и в поезде отталкиваются, поезд приподнимается над путём, трение пропадает, и он разгоняется до 600 километров в час.',
      'Есть и управляемый магнит — электромагнит. Это катушка с током: включили ток — магнит появился, выключили — исчез. Такой кран поднимает целые автомобили и отпускает их одной кнопкой.',
      'Магниты вокруг тебя: наушники, динамик, банковская карта, дверца холодильника, дверной звонок. В динамике магнит двигает мембрану — и получается звук.',
      'Проверим три правила. N и S притягиваются, N и N отталкиваются, а магнит и дерево просто не замечают друг друга.',
      'Что будет, если разломить магнит пополам? У каждой половинки снова окажутся свои N и S. Отделить один полюс нельзя — у любого кусочка будут оба.',
      'А теперь игра. Тебе покажут пару полюсов, а ты реши, что произойдёт: они притянутся или оттолкнутся. Считай очки.',
      'Совет мэра Архимеда: магнит дружит с железом и сталью, разные полюса притягиваются, одинаковые отталкиваются, а Земля — большой магнит, поэтому компас показывает на север. Ты готов к проверке.'
    ],
    check: { q: 'Какие тела притягивает магнит?', choices: ['Деревянные', 'Железные', 'Стеклянные'], ans: 1,
      exp: 'Магнит притягивает железо и сталь — тела, в которых есть железо.' },
    tasks: [
      { q: 'Два магнита поднесли северными полюсами друг к другу. Что произойдёт?', kind: 'choice',
        choices: ['Притянутся', 'Оттолкнутся', 'Ничего'], ans: 1,
        hints: ['Полюса одинаковые — одноимённые.', 'Одноимённые полюса отталкиваются.'],
        sol: 'Северный и северный — одноимённые полюса, поэтому магниты отталкиваются.' },
      { q: 'Южный полюс одного магнита поднесли к северному полюсу другого. Что произойдёт?', kind: 'choice',
        choices: ['Притянутся', 'Оттолкнутся', 'Не будут взаимодействовать'], ans: 0,
        hints: ['Юг и север — разные полюса.', 'Разноимённые полюса притягиваются.'],
        sol: 'N и S — разноимённые полюса, поэтому магниты притянутся.' }
    ]
  };

  function magH(cx,cy,w,h){
    const hw=w/2, hh=h/2;
    return `<rect x="${cx-hw}" y="${cy-hh}" width="${hw}" height="${h}" rx="4" fill="#c0483c" stroke="#e86a5a" stroke-width="1.4"/>
      <rect x="${cx}" y="${cy-hh}" width="${hw}" height="${h}" rx="4" fill="#2a6b8a" stroke="#7fd1ff" stroke-width="1.4"/>
      ${T(cx-hw/2, cy+5, 'N', '#ffd0c8', {fs:h*0.6})}
      ${T(cx+hw/2, cy+5, 'S', '#d0f0ff', {fs:h*0.6})}`;
  }
  function pole(x,y,k,label){
    const col=(k==='N')?'#c0483c':'#2a6b8a', st=(k==='N')?'#e86a5a':'#7fd1ff', tc=(k==='N')?'#ffd0c8':'#d0f0ff';
    return `<rect x="${x-17}" y="${y-19}" width="34" height="38" rx="5" fill="${col}" stroke="${st}" stroke-width="1.6"/>
      ${T(x, y+7, k, tc, {fs:20})}
      ${label?T2(x, y+34, label, MUTED, {fs:10.5}):''}`;
  }
  function arrow(x1,y1,x2,y2,col){
    const a=Math.atan2(y2-y1, x2-x1);
    return `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M${x2} ${y2} l${(-9*Math.cos(a-0.4)).toFixed(1)} ${(-9*Math.sin(a-0.4)).toFixed(1)} M${x2} ${y2} l${(-9*Math.cos(a+0.4)).toFixed(1)} ${(-9*Math.sin(a+0.4)).toFixed(1)}" stroke="${col}" stroke-width="2.6" stroke-linecap="round"/>`;
  }
  function checkMark(x,y,col,r){
    return `<path d="M${x-r} ${y} l${r*0.72} ${r*0.72} l${r*1.3} ${-r*1.5}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  function crossMark(x,y,col,r){
    return `<path d="M${x-r} ${y-r} L${x+r} ${y+r} M${x+r} ${y-r} L${x-r} ${y+r}" stroke="${col}" stroke-width="3" stroke-linecap="round"/>`;
  }
  function nail(x,y,s,col){
    return `<line x1="${x-s}" y1="${y}" x2="${x+s}" y2="${y}" stroke="${col}" stroke-width="4" stroke-linecap="round"/>
      <line x1="${x+s}" y1="${y}" x2="${x+s*0.6}" y2="${y-s*0.55}" stroke="${col}" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="${x-s}" cy="${y}" r="4.4" fill="none" stroke="${col}" stroke-width="2.4"/>`;
  }
  function pencil(x,y,s,col){
    return `<polygon points="${x-s},${y-s*0.3} ${x+s*0.6},${y-s*0.3} ${x+s},${y} ${x+s*0.6},${y+s*0.3} ${x-s},${y+s*0.3}" fill="rgba(255,255,255,.06)" stroke="${col}" stroke-width="1.6"/>
      <polygon points="${x+s*0.6},${y-s*0.3} ${x+s},${y} ${x+s*0.6},${y+s*0.3}" fill="${col}" opacity=".75"/>`;
  }
  function glass(x,y,s,col){
    return `<path d="M${x-s*0.6} ${y-s} h${s*1.2} l${-s*0.18} ${s*2} h${-s*0.84} Z" fill="rgba(255,255,255,.08)" stroke="${col}" stroke-width="1.6"/>`;
  }

  function scene(step, st){
    if(step===0){
      return SV(`
        <rect x="14" y="14" width="308" height="224" rx="16" fill="rgba(20,60,52,.25)"/>
        ${T(168,32,'Город Архимагнетия',GOLD,{fs:14})}
        <rect x="34" y="86" width="40" height="76" rx="5" fill="rgba(143,209,168,.16)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect x="84" y="66" width="34" height="96" rx="5" fill="rgba(143,209,168,.22)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect x="252" y="76" width="46" height="86" rx="5" fill="rgba(143,209,168,.16)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect x="216" y="96" width="30" height="66" rx="5" fill="rgba(143,209,168,.22)" stroke="#3d5c49" stroke-width="1.3"/>
        <rect x="30" y="162" width="276" height="7" rx="3" fill="#4a6a58"/>
        <rect x="86" y="120" width="164" height="26" rx="12" fill="rgba(127,209,255,.28)" stroke="#7fd1ff" stroke-width="1.8"/>
        <rect x="106" y="126" width="14" height="14" rx="3" fill="#cfe0cf" opacity=".7"/>
        <rect x="216" y="126" width="14" height="14" rx="3" fill="#cfe0cf" opacity=".7"/>
        ${[[112,139],[136,139],[160,139],[184,139],[208,139]].map(p=>`<path d="M${p[0]} ${p[1]} q7 6 14 0" fill="none" stroke="#ffd76a" stroke-width="1.6" opacity=".85"/>`).join('')}
        ${T(168,110,'поезд парит',BLUE,{fs:11.5})}
        ${T2(168,192,'рельс и поезд отталкиваются магнитами',PALE,{fs:11})}
        ${T2(168,216,'двери, замки, динамики — всюду магнит',MUTED,{fs:11})}
        ${T2(168,236,'поезд: 600 км/ч',GOLD,{fs:11})}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,26,'Экспонат первый · магнит-стержень',GOLD,{fs:13.5})}
        ${magH(168,116,200,52)}
        ${T2(68,86,'северный полюс (N)',RED,{fs:11})}
        ${T2(268,86,'южный полюс (S)',BLUE,{fs:11})}
        <line x1="68" y1="94" x2="68" y2="86" stroke="#e86a5a" stroke-width="1.2"/>
        <line x1="268" y1="94" x2="268" y2="86" stroke="#7fd1ff" stroke-width="1.2"/>
        ${T2(168,166,'у любого магнита ровно два полюса',PALE,{fs:12})}
        ${T(168,198,'N и S',GOLD,{fs:17})}
        ${T2(168,228,'разломишь магнит — у каждой части снова будут N и S',MUTED,{fs:10.5})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,26,'Кого притягивает магнит?',GOLD,{fs:14})}
        ${magH(70,116,86,44)}
        ${nail(150,86,14,'#cfe0cf')} ${T2(150,116,'гвоздь',GREEN,{fs:11})}
        <rect x="196" y="70" width="30" height="12" rx="6" fill="none" stroke="#cfe0cf" stroke-width="2.4"/>
        <rect x="206" y="82" width="30" height="12" rx="6" fill="none" stroke="#cfe0cf" stroke-width="2.4"/>
        ${T2(216,116,'скрепка',GREEN,{fs:11})}
        ${pencil(288,86,20,'#8fa08f')} ${T2(288,116,'карандаш',RED,{fs:11})}
        ${checkMark(150,140,GREEN,8)} ${checkMark(216,140,GREEN,8)} ${crossMark(288,140,RED,7)}
        ${T2(70,150,'сталь и железо',GREEN,{fs:11})}
        <rect x="24" y="168" width="288" height="60" rx="12" fill="rgba(143,209,168,.08)" stroke="rgba(143,209,168,.4)" stroke-width="1.3"/>
        ${T2(168,190,'притягиваются: железо, сталь, никель',GREEN,{fs:11.5})}
        ${T2(168,212,'не притягиваются: дерево, стекло, пластик',RED,{fs:11.5})}
      `);
    }
    if(step===3){
      const r=st.test95;
      const item=TEST95[(st.testIdx||0)%TEST95.length];
      return SV(`
        ${T(168,26,'Опыт · проверяем предметы',GOLD,{fs:14})}
        ${magH(64,120,76,40)}
        ${item[1](220,120)}
        ${T(220,168,item[0],PALE,{fs:13})}
        <rect x="120" y="186" width="192" height="46" rx="12" fill="rgba(255,255,255,.05)" stroke="${r==null?'#3d5c49':(r===1?'#e86a5a':'#8fd1a8')}" stroke-width="1.5"/>
        ${r==null?T2(216,214,'нажми кнопку ниже',GOLD,{fs:12}):T(216,215,r===1?'ПРИЛИП!':'НЕ ПРИЛИП',r===1?RED:GREEN,{fs:15})}
        ${T2(168,244,'магнит притягивает только железные тела',MUTED,{fs:10.5})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,26,'Невидимая сила · линии поля',GOLD,{fs:14})}
        ${magH(168,132,120,34)}
        ${[[-96,-46],[-74,-64],[0,-76],[74,-64],[96,-46],[-96,46],[-74,64],[0,76],[74,64],[96,46]].map(p=>
          `<path d="M${168+p[0]*0.55} 132 Q${168+p[0]} ${132+p[1]*0.55} ${168+p[0]} ${132+p[1]}" fill="none" stroke="#7fd1ff" stroke-width="1.5" opacity=".55"/>`).join('')}
        ${Array.from({length:26},(_,i)=>{const a=i/26*Math.PI*2, rr=58+((i*37)%26); return `<circle cx="${(168+Math.cos(a)*rr).toFixed(1)}" cy="${(132+Math.sin(a)*rr*0.62).toFixed(1)}" r="1.8" fill="#cfe0cf" opacity=".8"/>`;}).join('')}
        ${T2(168,206,'опилки выстраиваются по линиям поля',PALE,{fs:12})}
        <rect x="60" y="216" width="216" height="28" rx="10" fill="rgba(217,164,65,.1)" stroke="rgba(217,164,65,.4)" stroke-width="1.2"/>
        ${T2(168,235,'поле невидимо, но опилки показывают его форму',GOLD,{fs:10.5})}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,26,'Главное правило',GOLD,{fs:14})}
        <rect x="18" y="44" width="300" height="84" rx="13" fill="rgba(143,209,168,.07)" stroke="#8fd1a8" stroke-width="1.5"/>
        ${pole(60,86,'N')}
        ${pole(120,86,'S')}
        ${arrow(146,86,158,86,GREEN)}
        ${T(232,80,'разные полюса',GREEN,{fs:12.5})}
        ${T2(232,100,'ПРИТЯГИВАЮТСЯ',GREEN,{fs:12})}
        <rect x="18" y="140" width="300" height="84" rx="13" fill="rgba(232,106,90,.07)" stroke="#e86a5a" stroke-width="1.5"/>
        ${pole(60,182,'N')}
        ${pole(120,182,'N')}
        ${arrow(96,166,78,154,RED)}
        ${arrow(126,166,144,154,RED)}
        ${T(232,176,'одинаковые',RED,{fs:12.5})}
        ${T2(232,196,'ОТТАЛКИВАЮТСЯ',RED,{fs:12})}
        ${T2(168,242,'противоположности притягиваются',MUTED,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,28,'Разные полюса — встреча',GREEN,{fs:14})}
        ${pole(96,116,'N','север')}
        ${pole(240,116,'S','юг')}
        ${arrow(134,108,202,108,GREEN)}
        ${arrow(134,124,202,124,GREEN)}
        ${T(168,170,'бегут навстречу',GREEN,{fs:13})}
        <rect x="54" y="192" width="228" height="38" rx="11" fill="rgba(143,209,168,.1)" stroke="rgba(143,209,168,.45)" stroke-width="1.3"/>
        ${T2(168,216,'N + S притягиваются',GREEN,{fs:12.5})}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,28,'Одинаковые полюса — расходятся',RED,{fs:14})}
        ${pole(96,116,'N','север')}
        ${pole(240,116,'N','север')}
        ${arrow(120,116,66,116,RED)}
        ${arrow(216,116,270,116,RED)}
        ${T(168,170,'упираются и разъезжаются',RED,{fs:13})}
        <rect x="54" y="192" width="228" height="38" rx="11" fill="rgba(232,106,90,.1)" stroke="rgba(232,106,90,.45)" stroke-width="1.3"/>
        ${T2(168,216,'N + N отталкиваются',RED,{fs:12.5})}
      `);
    }
    if(step===8){
      return SV(`
        ${T(168,28,'Задача 1 · N и N',GOLD,{fs:14})}
        ${magH(96,120,112,40)}
        ${magH(250,120,112,40)}
        ${arrow(172,120,222,120,GOLD)}
        ${T(168,172,'северные полюса смотрят друг на друга',PALE,{fs:11.5})}
        ${T(168,202,'одноимённые → ОТТОЛКНУТСЯ',RED,{fs:15})}
        ${T2(168,234,'магниты сдвинутся в стороны',MUTED,{fs:11})}
      `);
    }
    if(step===9){
      return SV(`
        ${T(168,28,'Задача 2 · S и N',GOLD,{fs:14})}
        ${magH(96,120,112,40)}
        ${magH(250,120,112,40)}
        ${arrow(222,120,172,120,GREEN)}
        ${T(168,172,'южный полюс смотрит на северный',PALE,{fs:11.5})}
        ${T(168,202,'разноимённые → ПРИТЯНУТСЯ',GREEN,{fs:15})}
        ${T2(168,234,'магниты прилипнут друг к другу',MUTED,{fs:11})}
      `);
    }
    if(step===10){
      return SV(`
        ${T(168,28,'Площадь Компаса',GOLD,{fs:14})}
        <circle cx="168" cy="128" r="72" fill="rgba(255,215,106,.06)" stroke="#ffd76a" stroke-width="1.6"/>
        <circle cx="168" cy="128" r="58" fill="none" stroke="#3d5c49" stroke-width="1.1"/>
        ${T(168,72,'С',GOLD,{fs:13})}${T(168,192,'Ю',MUTED,{fs:12})}${T(108,132,'З',MUTED,{fs:12})}${T(228,132,'В',MUTED,{fs:12})}
        <polygon points="168,64 176,128 168,118 160,128" fill="#c0483c" stroke="#e86a5a" stroke-width="1"/>
        <polygon points="168,192 176,128 168,138 160,128" fill="#2a6b8a" stroke="#7fd1ff" stroke-width="1"/>
        <circle cx="168" cy="128" r="4" fill="#ffd76a"/>
        <rect x="60" y="212" width="216" height="30" rx="10" fill="rgba(217,164,65,.1)" stroke="rgba(217,164,65,.4)" stroke-width="1.2"/>
        ${T2(168,232,'стрелка сама разворачивается на север',GOLD,{fs:11})}
      `);
    }
    if(step===11){
      return SV(`
        ${T(168,24,'Земля — гигантский магнит',GOLD,{fs:14})}
        ${[74,96,120].map(r=>`<path d="M168 76 A${r} ${(r*0.72).toFixed(1)} 0 0 1 168 184" fill="none" stroke="#ffd76a" stroke-width="1.4" opacity=".45"/>`).join('')}
        ${[74,96,120].map(r=>`<path d="M168 76 A${r} ${(r*0.72).toFixed(1)} 0 0 0 168 184" fill="none" stroke="#ffd76a" stroke-width="1.4" opacity=".45"/>`).join('')}
        <circle cx="168" cy="130" r="54" fill="#1d5070" stroke="#7fd1ff" stroke-width="1.8"/>
        <ellipse cx="168" cy="118" rx="33" ry="15" fill="#8fd1a8" opacity=".5"/>
        <ellipse cx="154" cy="152" rx="18" ry="8" fill="#8fd1a8" opacity=".4"/>
        <rect x="150" y="40" width="36" height="26" rx="6" fill="#2a6b8a" stroke="#7fd1ff" stroke-width="1.5"/>
        ${T(168,59,'S','#d0f0ff',{fs:15})}
        <rect x="150" y="196" width="36" height="26" rx="6" fill="#c0483c" stroke="#e86a5a" stroke-width="1.5"/>
        ${T(168,215,'N','#ffd0c8',{fs:15})}
        ${T2(168,240,'внутри планеты раскалённое железо — оно и создаёт поле Земли',MUTED,{fs:10.5})}
      `);
    }
    if(step===12){
      return SV(`
        ${T(168,26,'Секрет компаса',GOLD,{fs:14})}
        <rect x="18" y="42" width="300" height="86" rx="13" fill="rgba(127,209,255,.07)" stroke="#7fd1ff" stroke-width="1.4"/>
        <rect x="40" y="86" width="46" height="22" rx="5" fill="#2a6b8a" stroke="#7fd1ff" stroke-width="1.4"/>
        ${T2(63,78,'южный полюс Земли',BLUE,{fs:9.5})}
        ${arrow(96,97,148,97,GOLD)}
        <rect x="204" y="86" width="46" height="22" rx="5" fill="#c0483c" stroke="#e86a5a" stroke-width="1.4"/>
        ${T2(227,78,'N стрелки',RED,{fs:9.5})}
        ${T(168,158,'N тянется к S',GOLD,{fs:24})}
        <rect x="18" y="176" width="300" height="60" rx="12" fill="rgba(255,255,255,.04)" stroke="#3d5c49" stroke-width="1.3"/>
        ${T2(168,198,'стрелка ищет южный магнитный полюс планеты,',PALE,{fs:11.5})}
        ${T2(168,220,'а он лежит у географического севера',PALE,{fs:11.5})}
      `);
    }
    if(step===13){
      return SV(`
        ${T(168,26,'Поезд на магнитной подушке',GOLD,{fs:14})}
        <rect x="24" y="150" width="288" height="12" rx="4" fill="#4a6a58"/>
        ${[70,120,170,220,270].map(x=>`<rect x="${x-14}" y="162" width="28" height="14" rx="3" fill="rgba(232,106,90,.55)" stroke="#e86a5a" stroke-width="1.2"/>`).join('')}
        <rect x="88" y="104" width="160" height="30" rx="14" fill="rgba(127,209,255,.3)" stroke="#7fd1ff" stroke-width="1.8"/>
        <rect x="108" y="111" width="16" height="16" rx="3" fill="#cfe0cf" opacity=".7"/>
        <rect x="212" y="111" width="16" height="16" rx="3" fill="#cfe0cf" opacity=".7"/>
        ${[102,140,178,216].map(x=>`<path d="M${x} 134 q12 10 24 0" fill="none" stroke="#ffd76a" stroke-width="1.8" opacity=".85"/>`).join('')}
        ${T(168,94,'отталкивание',GOLD,{fs:11.5})}
        ${T2(168,198,'поезд приподнят — трения о рельс нет',PALE,{fs:11.5})}
        ${T(168,226,'600 км/ч',BLUE,{fs:16})}
      `);
    }
    if(step===14){
      const on=!!st.coil95;
      return SV(`
        ${T(168,26,'Электромагнит',GOLD,{fs:14})}
        <rect x="88" y="76" width="120" height="34" rx="8" fill="${on?'rgba(127,209,255,.22)':'rgba(255,255,255,.05)'}" stroke="${on?'#7fd1ff':'#3d5c49'}" stroke-width="1.6"/>
        <rect x="82" y="70" width="8" height="46" rx="3" fill="#8fa08f"/>
        <rect x="206" y="70" width="8" height="46" rx="3" fill="#8fa08f"/>
        ${[0,1,2,3,4,5].map(i=>`<path d="M${96+i*19} 76 q10 17 19 0" fill="none" stroke="${on?GOLD:'#4a6a58'}" stroke-width="2.4"/>`).join('')}
        ${on?[0,1,2,3].map(i=>`<path d="M${104+i*26} 40 q10 -14 20 0" fill="none" stroke="#7fd1ff" stroke-width="1.8" opacity=".7"/>`).join(''):''}
        <line x1="148" y1="110" x2="148" y2="140" stroke="#cfe0cf" stroke-width="3"/>
        <path d="M136 140 h24" stroke="#cfe0cf" stroke-width="4" stroke-linecap="round"/>
        ${T(272, 60, on?'ток включён':'ток выключен',on?BLUE:MUTED,{fs:11.5})}
        <path d="M272 68 L272 84" stroke="${on?BLUE:'#4a6a58'}" stroke-width="1.6"/>
        <path d="M272 84 l-4 -7 M272 84 l4 -7" stroke="${on?BLUE:'#4a6a58'}" stroke-width="1.6" fill="none"/>
        <rect x="104" y="${on?152:186}" width="96" height="34" rx="10" fill="rgba(143,209,168,.18)" stroke="#8fd1a8" stroke-width="1.5"/>
        <circle cx="128" cy="${169+(on?0:34)}" r="9" fill="none" stroke="#cfe0cf" stroke-width="2"/>
        <circle cx="176" cy="${169+(on?0:34)}" r="9" fill="none" stroke="#cfe0cf" stroke-width="2"/>
        ${T2(168,240,on?'катушка стала магнитом и подняла машину':'нажми кнопку «включить ток»',PALE,{fs:11})}
      `);
    }
    if(step===15){
      return SV(`
        ${T(168,26,'Магниты вокруг тебя',GOLD,{fs:14})}
        <circle cx="56" cy="92" r="20" fill="none" stroke="#7fd1ff" stroke-width="2.4"/>
        <path d="M38 92 q18 -22 36 0" fill="none" stroke="#7fd1ff" stroke-width="2.4"/>
        ${T2(56,132,'наушники',PALE,{fs:11})}
        <rect x="116" y="70" width="44" height="44" rx="9" fill="rgba(127,209,255,.14)" stroke="#7fd1ff" stroke-width="1.6"/>
        <circle cx="138" cy="92" r="12" fill="none" stroke="#8fd1a8" stroke-width="2.2"/>
        <circle cx="138" cy="92" r="4" fill="#ffd76a"/>
        ${T2(138,132,'динамик',PALE,{fs:11})}
        <rect x="196" y="74" width="52" height="36" rx="6" fill="rgba(255,215,106,.14)" stroke="#ffd76a" stroke-width="1.5"/>
        <rect x="204" y="84" width="20" height="14" rx="3" fill="#ffd76a" opacity=".6"/>
        ${T2(222,132,'карта',PALE,{fs:11})}
        <rect x="266" y="64" width="44" height="52" rx="7" fill="rgba(143,209,168,.14)" stroke="#8fd1a8" stroke-width="1.6"/>
        <line x1="288" y1="64" x2="288" y2="116" stroke="#8fd1a8" stroke-width="1.2"/>
        <circle cx="304" cy="90" r="3" fill="#ffd76a"/>
        ${T2(288,132,'холодильник',PALE,{fs:11})}
        <rect x="24" y="160" width="288" height="72" rx="12" fill="rgba(255,255,255,.04)" stroke="#3d5c49" stroke-width="1.3"/>
        ${T2(168,184,'в динамике магнит двигает мембрану —',PALE,{fs:11.5})}
        ${T2(168,206,'и мы слышим звук',PALE,{fs:11.5})}
        ${T2(168,228,'магниты стоят в замках, кнопках, микрофонах',MUTED,{fs:10.5})}
      `);
    }
    if(step===16){
      return SV(`
        ${T(168,26,'Проверь себя · три правила',GOLD,{fs:14})}
        ${[['N и S','притягиваются',GREEN],['N и N','отталкиваются',RED],['магнит и дерево','ничего не происходит',MUTED]].map((x,i)=>
          `<rect x="18" y="${44+i*56}" width="300" height="48" rx="11" fill="rgba(255,255,255,.05)" stroke="${x[2]}" stroke-width="1.4"/>
           ${T(92,74+i*56,x[0],x[2],{fs:14})}
           ${T(216,74+i*56,x[1],PALE,{fs:11.5})}`).join('')}
        ${T2(168,228,'запомни три строки — и задачи решаются сами',MUTED,{fs:11})}
      `);
    }
    if(step===17){
      return SV(`
        ${T(168,26,'Разломили магнит пополам',GOLD,{fs:14})}
        <g class="pk-pop">${magH(96,92,96,34)}</g>
        <path d="M168 56 v14 M160 64 l8 8 l8 -8" fill="none" stroke="#ffd76a" stroke-width="1.6"/>
        <path d="M148 116 l-8 22 M188 116 l8 22" stroke="#8fa08f" stroke-width="1.4" stroke-dasharray="4 4"/>
        <g class="pk-pop">${magH(78,166,84,32)}</g>
        <g class="pk-pop">${magH(258,166,84,32)}</g>
        ${T2(78,218,'N | S',PALE,{fs:12})}
        ${T2(258,218,'N | S',PALE,{fs:12})}
        <rect x="24" y="226" width="288" height="22" rx="9" fill="rgba(217,164,65,.1)" stroke="rgba(217,164,65,.4)" stroke-width="1.2"/>
        ${T2(168,242,'у каждого кусочка снова оба полюса',GOLD,{fs:10.5})}
      `);
    }
    if(step===18){
      const items=GAME95;
      const it=items[(st.gIdx||0)%items.length];
      const res=st.gRes, ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,26,'Игра · притянутся или оттолкнутся?',GOLD,{fs:13.5})}
        <rect x="24" y="42" width="288" height="112" rx="14" fill="rgba(255,255,255,.05)" stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${pole(120,98,it[0])}
        ${pole(216,98,it[1])}
        ${T(168,98,'?',GOLD,{fs:26})}
        ${T2(168,138,res==null?'одинаковые или разные полюса?':(res?'верно! ':'неверно: ')+it[3],res==null?MUTED:(res?GREEN:RED),{fs:11.5})}
        ${T2(70,176,'верно: '+ok,GREEN,{fs:12})}
        ${T2(168,176,'ошибок: '+bad,RED,{fs:12})}
        ${T2(266,176,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,208,'разные полюса — притянутся, одинаковые — оттолкнутся',MUTED,{fs:10.5})}
        ${T2(168,234,res==null?'выбери кнопку ниже':'нажми любую кнопку — следующая пара',MUTED,{fs:10.5})}
      `);
    }
    if(step===19){
      return SV(`
        ${T(168,26,'Совет мэра Архимеда',GOLD,{fs:14})}
        ${[['магнит дружит с','железом и сталью',GREEN],['разные полюса','притягиваются',GREEN],['одинаковые полюса','отталкиваются',RED],['Земля —','большой магнит',BLUE]].map((x,i)=>
          `<rect x="18" y="${42+i*50}" width="300" height="42" rx="11" fill="rgba(255,255,255,.05)" stroke="${x[2]}" stroke-width="1.4"/>
           ${T(112,69+i*50,x[0],MUTED,{fs:11.5})}
           ${T(240,69+i*50,x[1],x[2],{fs:12.5})}`).join('')}
        ${T2(168,240,'компас показывает на север — там южный полюс Земли-магнита',MUTED,{fs:10})}
      `);
    }
    return SV(`${T(168,126,'Сцена готовится',GOLD,{fs:14})}`);
  }

  const TEST95=[
    ['гвоздь',(x,y)=>nail(x,y,16,'#cfe0cf'),1],
    ['карандаш',(x,y)=>pencil(x,y,22,'#8fa08f'),0],
    ['стеклянный стакан',(x,y)=>glass(x,y,22,'#7fd1ff'),0],
    ['железная скрепка',(x,y)=>`<rect x="${x-16}" y="${y-12}" width="32" height="12" rx="6" fill="none" stroke="#cfe0cf" stroke-width="2.6"/><rect x="${x-6}" y="${y+2}" width="32" height="12" rx="6" fill="none" stroke="#cfe0cf" stroke-width="2.6"/>`,1]
  ];
  window.pk95Test=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.test95!=null){ st.testIdx=((st.testIdx||0)+1)%TEST95.length; st.test95=null; chRender(0); return; }
      st.test95=(TEST95[(st.testIdx||0)%TEST95.length][2]===k)?1:0;
      chRender(0);
    }catch(e){}
  };
  const GAME95=[['N','S',true,'N и S притягиваются'],['N','N',false,'N и N отталкиваются'],
    ['S','S',false,'S и S отталкиваются'],['S','N',true,'S и N притягиваются'],
    ['N','S',true,'N и S притягиваются'],['S','N',true,'S и N притягиваются']];
  window.pk95Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME95.length; st.gRes=null; chRender(0); return; }
      const it=GAME95[(st.gIdx||0)%GAME95.length];
      st.gRes=(it[2]?(k==='a'):(k==='r'));
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  window.pk95Coil=function(){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].coil95=CHS[lk].coil95?0:1; chRender(0);
    }catch(e){}
  };

  const PRED95=[
    ['q1','Что поднимает поезд над рельсами?',[{k:'a',t:'магниты',ok:true,fb:'верно: рельс и поезд отталкиваются'},{k:'b',t:'сильный ветер',ok:false,fb:'ветер тут ни при чём'}]],
    ['q2','Сколько полюсов у магнита?',[{k:'a',t:'два: N и S',ok:true,fb:'верно: северный и южный'},{k:'b',t:'один',ok:false,fb:'у любого магнита оба полюса'}]],
    ['q3','Что притянет магнит?',[{k:'a',t:'железный гвоздь',ok:true,fb:'верно: железо и сталь'},{k:'b',t:'деревянный карандаш',ok:false,fb:'дерево магнит не притягивает'}]],
    ['q4','Стеклянный стакан прилипнет к магниту?',[{k:'a',t:'нет',ok:true,fb:'верно: стекло не магнитное'},{k:'b',t:'да',ok:false,fb:'притягиваются только железные тела'}]],
    ['q5','Что показывают железные опилки?',[{k:'a',t:'линии магнитного поля',ok:true,fb:'верно: они выстраиваются по полю'},{k:'b',t:'температуру магнита',ok:false,fb:'опилки показывают форму поля'}]],
    ['q6','Разные полюса…',[{k:'a',t:'притягиваются',ok:true,fb:'верно: N и S сходятся'},{k:'b',t:'отталкиваются',ok:false,fb:'отталкиваются одинаковые'}]],
    ['q7','N и S сближаются — что произойдёт?',[{k:'a',t:'притянутся',ok:true,fb:'верно: разные полюса'},{k:'b',t:'оттолкнутся',ok:false,fb:'они разные, значит притянутся'}]],
    ['q8','N и N рядом — что произойдёт?',[{k:'a',t:'оттолкнутся',ok:true,fb:'верно: одинаковые полюса'},{k:'b',t:'притянутся',ok:false,fb:'одинаковые отталкиваются'}]],
    ['q9','Северные полюса двух магнитов…',[{k:'a',t:'отталкиваются',ok:true,fb:'верно: одноимённые'},{k:'b',t:'притягиваются',ok:false,fb:'они одинаковые'}]],
    ['q10','Южный полюс и северный…',[{k:'a',t:'притянутся',ok:true,fb:'верно: разные полюса'},{k:'b',t:'оттолкнутся',ok:false,fb:'разные притягиваются'}]],
    ['q11','Куда показывает красный конец стрелки?',[{k:'a',t:'на север',ok:true,fb:'верно: там южный полюс Земли'},{k:'b',t:'на юг',ok:false,fb:'красный конец — северный, он идёт к северу'}]],
    ['q12','Земля — это…',[{k:'a',t:'большой магнит',ok:true,fb:'верно: поле создаёт железо в ядре'},{k:'b',t:'просто камень',ok:false,fb:'у Земли есть магнитное поле'}]],
    ['q13','Почему стрелка идёт на север?',[{k:'a',t:'там южный полюс Земли-магнита',ok:true,fb:'верно: разные полюса притягиваются'},{k:'b',t:'её тянет ветер',ok:false,fb:'ветер стрелку не разворачивает'}]],
    ['q14','Почему поезд парит над путём?',[{k:'a',t:'магниты отталкиваются',ok:true,fb:'верно: трение исчезает'},{k:'b',t:'у него крылья',ok:false,fb:'крылья тут не помогут'}]],
    ['q15','Что делает электромагнит при выключении тока?',[{k:'a',t:'перестаёт быть магнитом',ok:true,fb:'верно: магнит исчезает'},{k:'b',t:'притягивает сильнее',ok:false,fb:'без тока поля нет'}]],
    ['q16','Где в доме есть магнит?',[{k:'a',t:'в динамике и на дверце холодильника',ok:true,fb:'верно: и в замках, и в звонке'},{k:'b',t:'в стеклянном стакане',ok:false,fb:'в стекле магнита нет'}]],
    ['q17','Магнит и дерево…',[{k:'a',t:'не взаимодействуют',ok:true,fb:'верно: дерево не магнитное'},{k:'b',t:'притягиваются',ok:false,fb:'только железо и сталь'}]],
    ['q18','Что будет у половинки разломанного магнита?',[{k:'a',t:'свои N и S',ok:true,fb:'верно: полюс не отделить'},{k:'b',t:'только N',ok:false,fb:'второй полюс появится снова'}]],
    ['q19','Одинаковые полюса в игре — что выбрать?',[{k:'a',t:'отталкиваются',ok:true,fb:'верно'},{k:'b',t:'притягиваются',ok:false,fb:'одинаковые отталкиваются'}]],
    ['q20','Что притягивает магнит?',[{k:'a',t:'железо и сталь',ok:true,fb:'верно'},{k:'b',t:'дерево и стекло',ok:false,fb:'они не магнитные'}]]
  ];

  const NOTES95=[
    ['Архимагнетия','Всё «волшебство» города — работа магнитов: подушка поезда, замки дверей, динамики.'],
    ['Полюса','Полюс — конец магнита. Северный обозначают N, южный — S. Их всегда два.'],
    ['Железо','Магнит чувствует только железо, сталь и никель. Дерево, стекло, пластик для него невидимы.'],
    ['Опыт','Прилип — значит внутри железо. Не прилип — материал немагнитный.'],
    ['Поле','Магнитное поле невидимо, но опилки показывают его форму: дуги от одного полюса к другому.'],
    ['Правило','Разные полюса притягиваются, одинаковые отталкиваются. Это главное правило магнитов.'],
    ['Встреча','N и S тянутся друг к другу. В задачах это значит: магниты сдвинутся и прилипнут.'],
    ['Расходятся','N и N упираются. Магниты разъедутся, между ними останется зазор.'],
    ['Задача 1','Север и север — одноимённые полюса, значит отталкивание.'],
    ['Задача 2','Юг и север — разноимённые полюса, значит притяжение.'],
    ['Компас','Стрелка компаса — маленький магнит на оси. Он свободно поворачивается и встаёт вдоль поля Земли.'],
    ['Земля-магнит','В ядре планеты раскалённое железо. Оно создаёт поле, поэтому компас работает в любой точке Земли.'],
    ['Секрет','Красный конец стрелки — северный полюс, а притягивается он к южному полюсу Земли, который лежит на севере.'],
    ['Маглев','Отталкивание поднимает поезд на несколько сантиметров, трение исчезает, и скорость доходит до 600 км/ч.'],
    ['Электромагнит','Ток создаёт магнит, без тока магнита нет. Поэтому такой кран легко отпускает груз.'],
    ['Вокруг','Магниты стоят в динамиках, наушниках, замках, картах, звонках. В динамике магнит колеблет мембрану.'],
    ['Проверь себя','Три правила: N-S притягиваются, N-N отталкиваются, магнит и дерево не взаимодействуют.'],
    ['Разлом','Магнит нельзя разделить на «только север» и «только юг»: у каждой части снова два полюса.'],
    ['Игра','Смотри на буквы: если они разные — притянутся, если одинаковые — оттолкнутся.'],
    ['Совет','Магнит + железо, разные полюса притягиваются, одинаковые отталкиваются, Земля — магнит. Этого достаточно для проверки.']
  ];

  function visB95(el){
    try{
      K.use();
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'95';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===3){
        const done=st.test95!=null;
        extra=`<div style="display:flex;gap:6px;width:min(100%,340px)">${[[1,'прилипнет'],[0,'не прилипнет']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 46%" onclick="pk95Test(${x[0]})">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующий предмет':'как думаешь, что произойдёт?'}</div>`;
      } else if(step===14){
        extra=`<div style="display:flex;gap:6px;width:min(100%,340px)">
          <button type="button" class="btn" style="flex:1 1 100%" onclick="pk95Coil()">${st.coil95?'выключить ток':'включить ток'}</button></div>`;
      } else if(step===18){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:6px;width:min(100%,340px)">${[['a','притянутся'],['r','оттолкнутся']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 46%" onclick="pk95Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующая пара':'что сделают эти полюса?'}</div>`;
      }
      const p=(step===18)?null:PRED95[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES95[step]?NOTE(NOTES95[step][0],NOTES95[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }

  window.WAVE_B[95]=visB95;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===95){ arr[i]=L95; f=true; break; } }
    if(!f) arr.push(L95);
  })();
})();
