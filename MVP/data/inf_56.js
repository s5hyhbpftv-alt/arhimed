/* ================= ИНФОРМАТИКА С НУЛЯ · 5–6 класс · курс из 27 уроков (id 500–526) · «Азбука информатики Архимеда» ================= */
(function(){
  /* ---------- общий набор ---------- */
  const ink='#eaf2ff', dim='#93a6c8', gold='#ffd76a', grn='#7de0a0', red='#ff9a8a', blu='#6ea8ff', cyan='#7fd6ff', pur='#b07fff',
        bg0='#0d1830', bg1='#080d1c', card='rgba(16,26,46,.96)', cardB='#3a4c78';
  const tx=(x,y,s,c,t,o)=>`<text x="${x}" y="${y}" text-anchor="${(o&&o.an)||'middle'}" font-size="${(t&&(''+t).length<=6?Math.round(s*1.4):((''+t).length>24?Math.max(9.5,Math.min(s,292/((''+t).length*0.66))):s)).toFixed(1)}" fill="${c||ink}" font-weight="${(o&&o.b)?'bold':'normal'}" font-family="${(o&&o.georgia)?'Georgia,serif':'Arial,Helvetica,sans-serif'}" paint-order="stroke" stroke="#08101f" stroke-width="4">${plain(t)}</text>`;
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
  const polyLen=(pts)=>{let s2=0;for(let i=1;i<pts.length;i++)s2+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);return Math.max(16,Math.round(s2));};
  const drawPoly=(pts,col,dur,beg,w,opt)=>{
    const o=opt||{}, d='M'+pts.map(q=>q[0]+' '+q[1]).join(' L'), L=polyLen(pts);
    return `<path d="${d}" fill="${o.fill||'none'}" stroke="${col}" stroke-width="${w||3}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.7;1" dur="${dur}s" begin="${beg||0}s" repeatCount="${o.keep?'1':'indefinite'}"/></path>`
      +((o.pen===false||o.keep)?'':`<circle r="${o.r||5}" fill="${gold}"><animateMotion dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite" path="${d}"/></circle>`);
  };
  const drawRect=(x,y,w,h,rx,col,dur,beg,sw,pre,opt)=>{
    const o=opt||{}, r=Math.min(rx||8,Math.min(w,h)/2);
    const d=`M${x+r} ${y} H${x+w-r} A${r} ${r} 0 0 1 ${x+w} ${y+r} V${y+h-r} A${r} ${r} 0 0 1 ${x+w-r} ${y+h} H${x+r} A${r} ${r} 0 0 1 ${x} ${y+h-r} V${y+r} A${r} ${r} 0 0 1 ${x+r} ${y}`;
    const L=Math.round(2*(w-2*r)+2*(h-2*r)+2*Math.PI*r);
    return `<path d="${d}" fill="${o.fill||'none'}" stroke="${col}" stroke-width="${sw||2.4}" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.6;1" dur="${dur}s" begin="${beg||0}s" repeatCount="${o.keep?'1':'indefinite'}"/></path>`
      +((o.pen===false||o.keep)?'':`<circle r="${o.r||5}" fill="${gold}"><animateMotion dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite" path="${d}"/></circle>`);
  };
  const growBar=(x,y,w,h,fill,dur,beg,stroke)=>`<rect x="${x}" y="${y}" width="0" height="${h}" rx="${h/2}" fill="${fill}" stroke="${stroke||'none'}" stroke-width="1.2">`
    +`<animate fill="freeze" attributeName="width" values="0;${w};${w}" keyTimes="0;.75;1" dur="${dur}s" begin="${beg||0}s" repeatCount="1"/></rect>`;
  /* ---------- движок ИИ: данные, нейросеть, график точности ---------- */
  const aiExamples=[{x:0.20,y:0,ch:'квадрат'},{x:0.30,y:0,ch:'квадрат'},{x:0.35,y:0,ch:'квадрат'},{x:0.42,y:0,ch:'квадрат'},{x:0.48,y:0,ch:'квадрат'},
                    {x:0.55,y:1,ch:'круг'},{x:0.62,y:1,ch:'круг'},{x:0.68,y:0,ch:'квадрат'},{x:0.75,y:1,ch:'круг'},{x:0.85,y:1,ch:'круг'}];
  const aiShape=(x,y,s,kind,col,sw)=>{
    if(kind==='circle') return `<circle cx="${x}" cy="${y}" r="${s}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="${sw||2.2}"/>`;
    if(kind==='square') return `<rect x="${x-s}" y="${y-s}" width="${s*2}" height="${s*2}" rx="2" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="${sw||2.2}"/>`;
    return `<path d="M${x} ${y-s} L${x+s} ${y+s*0.8} L${x-s} ${y+s*0.8} Z" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="${sw||2.2}"/>`;
  };
  const aiAxis=(x0,x1,y,col,label0,label1)=>{
    let s2=drawPoly([[x0,y],[x1,y]],col,1.6,0.2,2,{pen:false,keep:true});
    s2+=`<path d="M${x1} ${y} l-9 -5 v10 z" fill="${col}"/>`;
    s2+=`<text x="${x0}" y="${y+20}" text-anchor="middle" font-size="10.5" fill="${dim}">${label0}</text>`;
    s2+=`<text x="${x1}" y="${y+20}" text-anchor="middle" font-size="10.5" fill="${dim}">${label1}</text>`;
    return s2;
  };
  const aiThreshold=(x0,x1,y,t,col,label)=>{
    const x=x0+(x1-x0)*t;
    let s2=`<line x1="${x.toFixed(1)}" y1="${y-46}" x2="${x.toFixed(1)}" y2="${y+46}" stroke="${col}" stroke-width="2.6" stroke-dasharray="7 5"/>`;
    s2+=`<circle cx="${x.toFixed(1)}" cy="${y-52}" r="5" fill="${col}"/>`;
    if(label) s2+=`<text x="${x.toFixed(1)}" y="${y+62}" text-anchor="middle" font-size="10.5" fill="${col}">${label}</text>`;
    return s2;
  };
  const drawNet=(cx,cy,layers,pre,opt)=>{
    const o=opt||{}, gapX=o.gapX||46, gapY=14, R=8;
    const pos=layers.map((n,k)=>{
      const col=[];
      for(let j=0;j<n;j++) col.push([cx+(k-(layers.length-1)/2)*gapX, cy+(j-(n-1)/2)*gapY*1.5]);
      return col;
    });
    let s2='';
    for(let k=0;k<pos.length-1;k++) for(const a of pos[k]) for(const b of pos[k+1]){
      s2+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${o.c||cyan}" stroke-width="1" opacity=".35"/>`;
    }
    pos.forEach((col,k)=>{
      col.forEach((q,j)=>{
        const col2=k===0?blu:(k===pos.length-1?gold:cyan);
        s2+=`<circle class="${pre}Pop" style="animation-delay:${(0.1*k+j*0.05).toFixed(2)}s" cx="${q[0]}" cy="${q[1]}" r="${R}" fill="rgba(12,32,34,.97)" stroke="${col2}" stroke-width="1.8"/>`;
      });
    });
    if(o.anim){
      s2+=`<circle r="4.5" fill="${gold}"><animateMotion dur="2.6s" repeatCount="indefinite" path="M${pos[0][0][0]} ${pos[0][0][1]} L${pos[1][0][0]} ${pos[1][0][1]} L${pos[2][0][0]} ${pos[2][0][1]}"/></circle>`;
      s2+=`<circle r="4.5" fill="${grn}"><animateMotion dur="2.6s" begin="0.5s" repeatCount="indefinite" path="M${pos[0][pos[0].length-1][0]} ${pos[0][pos[0].length-1][1]} L${pos[1][pos[1].length-1][0]} ${pos[1][pos[1].length-1][1]} L${pos[2][pos[2].length-1][0]} ${pos[2][pos[2].length-1][1]}"/></circle>`;
    }
    return s2;
  };
  const drawAcc=(x0,y0,w,h,pts,pre,opt)=>{
    const o=opt||{};
    let s2=drawPoly([[x0,y0],[x0+w,y0]],cardB,1.4,0.2,1.6,{pen:false,keep:true})+drawPoly([[x0,y0],[x0,y0-h]],cardB,1.4,0.2,1.6,{pen:false,keep:true});
    for(let k=1;k<=4;k++) s2+=`<line x1="${x0}" y1="${y0-h*k/4}" x2="${x0+w}" y2="${y0-h*k/4}" stroke="#2c3868" stroke-width="1"/>`;
    s2+=`<line x1="${x0}" y1="${y0-h}" x2="${x0+w}" y2="${y0-h}" stroke="${grn}" stroke-width="1.6" stroke-dasharray="6 5"/>`;
    s2+=`<text x="${x0+w+2}" y="${y0-h+4}" text-anchor="end" font-size="10" fill="${grn}">100%</text>`;
    const step=w/Math.max(1,pts.length-1);
    const path=pts.map((v,k)=>[x0+k*step, y0-h*v]).map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L');
    s2+=`<path d="M${path}" fill="none" stroke="${o.c||gold}" stroke-width="2.6" stroke-linecap="round"/>`;
    pts.forEach((v,k)=>{ s2+=`<circle class="${pre}Pop" style="animation-delay:${(0.3+k*0.25).toFixed(2)}s" cx="${(x0+k*step).toFixed(1)}" cy="${(y0-h*v).toFixed(1)}" r="4" fill="${o.c||gold}"/>`; });
    return s2;
  };
  const drawDecisionTree=(cx,cy,pre,opt)=>{
    const o=opt||{};
    const N={root:[cx,cy],a:[cx-72,cy+58],b:[cx+72,cy+58],a1:[cx-108,cy+118],a2:[cx-40,cy+118],b1:[cx+40,cy+118],b2:[cx+108,cy+118]};
    let s2='';
    const link=(p,q)=>{ s2+=drawPoly([p,q],o.dim||cardB,1,0.15,1.6,{pen:false,keep:true}); };
    link(N.root,N.a); link(N.root,N.b); link(N.a,N.a1); link(N.a,N.a2); link(N.b,N.b1); link(N.b,N.b2);
    const node=(p,t,col,fill)=>`<g class="${pre}Pop" style="animation-delay:${(0.2+(fill||0)*0.2).toFixed(2)}s"><rect x="${p[0]-32}" y="${p[1]-13}" width="64" height="26" rx="8" fill="rgba(12,32,34,.97)" stroke="${col}" stroke-width="1.7"/>`
      +fit(p[0],p[1]+4,10,col,t,{b:1},58)+`</g>`;
    s2+=node(N.root,o.q1||'вопрос 1?',cyan,0);
    s2+=node(N.a,o.q2||'вопрос 2?',cyan,1);
    s2+=node(N.b,o.q3||'вопрос 3?',cyan,2);
    s2+=node(N.a1,o.a1||'ответ A',grn,3);
    s2+=node(N.a2,o.a2||'ответ B',gold,3);
    s2+=node(N.b1,o.b1||'ответ C',gold,3);
    s2+=node(N.b2,o.b2||'ответ D',red,3);
    return s2;
  };
  const aiWeightBar=(x,y,w,h,v,col,label)=>{
    const mid=x+w/2, frac=Math.max(-1,Math.min(1,v));
    let s2=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="rgba(255,255,255,.05)" stroke="${cardB}" stroke-width="1.4"/>`
      +`<line x1="${mid}" y1="${y-3}" x2="${mid}" y2="${y+h+3}" stroke="${dim}" stroke-width="1.4"/>`;
    if(frac>=0) s2+=`<rect x="${mid}" y="${y+1}" width="${(w/2-1)*frac}" height="${h-2}" rx="${(h-2)/2}" fill="${col}"/>`;
    else s2+=`<rect x="${mid+(w/2-1)*frac}" y="${y+1}" width="${(w/2-1)*(-frac)}" height="${h-2}" rx="${(h-2)/2}" fill="${red}"/>`;
    if(label) s2+=`<text x="${x-6}" y="${y+h*0.7}" text-anchor="end" font-size="10.5" fill="${dim}">${label}</text>`;
    return s2;
  };
  /* ---------- движок фракталов (рекурсивная прорисовка) ---------- */
  const fracTree=(x,y,len,ang,depth,base,out)=>{
    const o=out||[]; const x2=x+Math.cos(ang)*len, y2=y+Math.sin(ang)*len;
    o.push({x1:x,y1:y,x2:x2,y2:y2,d:depth});
    if(depth>0){
      const nl=len*0.7, sw=0.42;
      fracTree(x2,y2,nl,ang-sw,o.length?depth-1:0,base,o);
      fracTree(x2,y2,nl,ang+sw,depth-1,base,o);
    }
    return o;
  };
  const drawTree=(x,y,len,depth,H,pre,opt)=>{
    const o=opt||{}, segs=fracTree(x,y,len,-Math.PI/2,depth,H,[]);
    let s2='', maxd=depth;
    segs.forEach((q,k)=>{
      const lvl=maxd-q.d, w=Math.max(1.4,5.4-lvl*0.85);
      const col=(lvl>=maxd-1&&maxd>1)?o.leaf||grn:(lvl>maxd/2?o.c2||'#7aa86a':o.c||'#8a6b4a');
      s2+=`<path d="M${q.x1.toFixed(1)} ${q.y1.toFixed(1)} L${q.x2.toFixed(1)} ${q.y2.toFixed(1)}" fill="none" stroke="${col}" stroke-width="${w.toFixed(1)}" stroke-linecap="round" stroke-dasharray="${Math.max(6,Math.round(Math.hypot(q.x2-q.x1,q.y2-q.y1)))}" stroke-dashoffset="${Math.max(6,Math.round(Math.hypot(q.x2-q.x1,q.y2-q.y1)))}">`
        +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${Math.max(6,Math.round(Math.hypot(q.x2-q.x1,q.y2-q.y1)))};0;0" keyTimes="0;0.7;1" dur="${(o.dur||1.1).toFixed(2)}s" begin="${((o.beg||0)+lvl*0.55).toFixed(2)}s" repeatCount="1"/></path>`;
    });
    return s2;
  };
  const sierpPts=(p,depth,out)=>{
    const o=out||[];
    if(depth===0){ o.push(p); return o; }
    const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
    const m01=mid(p[0],p[1]), m12=mid(p[1],p[2]), m20=mid(p[2],p[0]);
    sierpPts([p[0],m01,m20],depth-1,o);
    sierpPts([m01,p[1],m12],depth-1,o);
    sierpPts([m20,m12,p[2]],depth-1,o);
    return o;
  };
  const drawSierp=(p,depth,pre,opt)=>{
    const o=opt||{}, tris=sierpPts(p,depth,[]);
    let s2='';
    tris.forEach((q,k)=>{
      const d=Math.round(6-depth);
      s2+=`<path d="M${q[0][0].toFixed(1)} ${q[0][1].toFixed(1)} L${q[1][0].toFixed(1)} ${q[1][1].toFixed(1)} L${q[2][0].toFixed(1)} ${q[2][1].toFixed(1)} Z" fill="${(k%2)?'rgba(255,215,106,.30)':'rgba(127,214,255,.30)'}" stroke="${(k%2)?gold:cyan}" stroke-width="1.1"/>`;
    });
    s2+=`<path d="M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]} L${p[2][0]} ${p[2][1]} Z" fill="none" stroke="${o.c||ink}" stroke-width="2.4" stroke-dasharray="${Math.round(3*180)}" stroke-dashoffset="${Math.round(3*180)}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${Math.round(3*180)};0;0" keyTimes="0;0.6;1" dur="1.6s" begin="${o.beg||0}s" repeatCount="1"/></path>`;
    return s2;
  };
  const kochPath=(p1,p2,depth)=>{
    if(depth===0) return [p1,p2];
    const dx=(p2[0]-p1[0])/3, dy=(p2[1]-p1[1])/3;
    const a=[p1[0]+dx,p1[1]+dy], b=[p1[0]+2*dx,p1[1]+2*dy];
    const ang=Math.atan2(p2[1]-p1[1],p2[0]-p1[0])-Math.PI/3, h=Math.hypot(dx,dy);
    const pk=[a[0]+Math.cos(ang)*h, a[1]+Math.sin(ang)*h];
    return [...kochPath(p1,a,depth-1).slice(0,-1), ...kochPath(a,pk,depth-1).slice(0,-1), ...kochPath(pk,b,depth-1).slice(0,-1), ...kochPath(b,p2,depth-1)];
  };
  const drawKoch=(p1,p2,depth,pre,opt)=>{
    const o=opt||{}, pts=kochPath(p1,p2,depth), d='M'+pts.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L');
    const L=Math.round(polyLen(pts.map(q=>[q[0],q[1]])));
    return `<path d="${d}" fill="none" stroke="${o.c||cyan}" stroke-width="${o.sw||3}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.75;1" dur="${o.dur||2.4}s" begin="${o.beg||0}s" repeatCount="1"/></path>`;
  };
  const drawKochSnow=(cx,cy,r,depth,pre,opt)=>{
    const pts=[];
    for(let k=0;k<3;k++){
      const a1=-Math.PI/2+k*2*Math.PI/3, a2=-Math.PI/2+(k+1)*2*Math.PI/3;
      const p1=[cx+Math.cos(a1)*r,cy+Math.sin(a1)*r], p2=[cx+Math.cos(a2)*r,cy+Math.sin(a2)*r];
      const seg=kochPath(p1,p2,depth);
      if(k>0) seg.shift();
      pts.push(...seg);
    }
    const d='M'+pts.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')+' Z';
    const L=Math.round(polyLen(pts.map(q=>[q[0],q[1]])));
    const o=opt||{};
    return `<path d="${d}" fill="rgba(127,214,255,.14)" stroke="${o.c||cyan}" stroke-width="${o.sw||2.6}" stroke-linejoin="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.8;1" dur="${o.dur||3}s" begin="${o.beg||0}s" repeatCount="1"/></path>`;
  };
  const kochLen=(depth)=>3*Math.pow(4/3,depth);
  const RU='АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const cpShift=(w,k)=>[...(w||'')].map(ch=>{const i=RU.indexOf(ch.toUpperCase()); return i<0?ch:RU[((i+k)%RU.length+RU.length)%RU.length];}).join('');
  const cpRing=(cx,cy,r,letters,opt)=>{
    const o=opt||{}, arr=(typeof letters==='string')?[...letters]:letters; let s2='';
    arr.forEach((ch,k)=>{
      const a=-Math.PI/2+k*2*Math.PI/arr.length;
      const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
      s2+=`<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="middle" font-size="${o.fs||10.5}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" fill="${o.c||ink}" paint-order="stroke" stroke="#06131a" stroke-width="2.4">${ch}</text>`;
    });
    return s2;
  };
  const cpDisc=(cx,cy,rO,rI,shift,pre,opt)=>{
    const A=accOf(pre), o=opt||{}, inner=cpShift(RU,shift);
    let s2='';
    s2+=`<circle class="${pre}In" cx="${cx}" cy="${cy}" r="${rO+11}" fill="rgba(10,28,30,.95)" stroke="${A}" stroke-width="2.4"/>`;
    s2+=`<circle cx="${cx}" cy="${cy}" r="${(rO+rI)/2}" fill="none" stroke="${cardB}" stroke-width="1.2" opacity=".8"/>`;
    s2+=`<circle cx="${cx}" cy="${cy}" r="${rI-9}" fill="rgba(16,42,44,.95)" stroke="${cyan}" stroke-width="1.4" opacity=".7"/>`;
    s2+=cpRing(cx,cy,rO,RU,{c:gold,fs:o.fs||10.5});
    s2+=`<g transform="rotate(${o.rot||0} ${cx} ${cy})">`
      +`${cpRing(cx,cy,rI,inner,{c:cyan,fs:o.fs||10.5})}</g>`;
    s2+=`<path d="M${cx-7} ${cy-rO-14} h14 l-7 11 z" fill="${gold}"/>`;
    s2+=`<path d="M${cx-6} ${cy-rI+2} h12 l-6 -10 z" fill="${cyan}"/>`;
    s2+=`<circle cx="${cx}" cy="${cy}" r="9" fill="rgba(10,28,30,.97)" stroke="${gold}" stroke-width="1.6"/>`
      +`<text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${gold}">${shift}</text>`;
    return s2;
  };
  const cpSym=(i,x,y,s,c)=>{
    const k=((i%12)+12)%12, r=s*0.42, st=`fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"`;
    if(k===0) return `<circle cx="${x}" cy="${y}" r="${r}" ${st}/>`;
    if(k===1) return `<path d="M${x} ${y-r} L${x+r} ${y+r*0.8} L${x-r} ${y+r*0.8} Z" ${st}/>`;
    if(k===2) return `<rect x="${x-r}" y="${y-r}" width="${r*2}" height="${r*2}" rx="2" ${st}/>`;
    if(k===3) return `<path d="M${x} ${y-r} L${x+r} ${y} L${x} ${y+r} L${x-r} ${y} Z" ${st}/>`;
    if(k===4) return `<path d="M${x-r} ${y} H${x+r} M${x} ${y-r} V${y+r}" ${st}/>`;
    if(k===5) return `<path d="M${x-r} ${y} L${x+r} ${y} M${x} ${y-r} L${x} ${y+r} M${x-r*0.7} ${y-r*0.7} L${x+r*0.7} ${y+r*0.7}" ${st}/>`;
    if(k===6) return `<path d="M${x-r} ${y} A${r} ${r} 0 0 1 ${x+r} ${y}" ${st}/><line x1="${x-r}" y1="${y}" x2="${x+r}" y2="${y}" stroke="${c}" stroke-width="2"/>`;
    if(k===7) return `<path d="M${x-r} ${y+r*0.6} L${x} ${y-r} L${x+r} ${y+r*0.6}" ${st}/><line x1="${x-r*0.6}" y1="${y+r*0.6}" x2="${x+r*0.6}" y2="${y+r*0.6}" stroke="${c}" stroke-width="2"/>`;
    if(k===8) return `<path d="M${x-r} ${y+r} L${x+r} ${y-r} M${x+r*0.2} ${y-r} h${r*0.8} v${r*0.8}" ${st}/>`;
    if(k===9) return `<path d="M${x-r} ${y-r} L${x+r} ${y+r} M${x-r} ${y+r} L${x+r} ${y-r}" ${st}/>`;
    if(k===10) return `<circle cx="${x}" cy="${y-r*0.6}" r="${r*0.28}" fill="${c}"/><circle cx="${x-r*0.7}" cy="${y+r*0.5}" r="${r*0.28}" fill="${c}"/><circle cx="${x+r*0.7}" cy="${y+r*0.5}" r="${r*0.28}" fill="${c}"/>`;
    return `<path d="M${x-r} ${y+r*0.7} L${x-r*0.3} ${y-r*0.7} L${x+r*0.3} ${y+r*0.7} L${x+r} ${y-r*0.7}" ${st}/>`;
  };
  const cpStrip=(x0,y,letters,cell,pre,opt)=>{
    const o=opt||{}, hl=(o.hl!=null?o.hl:-1);
    const arr=(typeof letters==='string')?[...letters]:letters;
    let s2='';
    arr.forEach((ch,k)=>{
      const x=x0+k*cell, on=(k===hl);
      s2+=`<rect class="${pre}Pop" style="animation-delay:${(0.05*k).toFixed(2)}s" x="${x}" y="${y}" width="${cell-2}" height="${cell-2}" rx="4" fill="${on?'rgba(255,215,106,.22)':'rgba(12,32,34,.97)'}" stroke="${on?gold:cardB}" stroke-width="${on?1.8:1}"/>`
        +`<text x="${x+cell/2-1}" y="${y+cell*0.68}" text-anchor="middle" font-size="${cell*0.5}" font-weight="bold" fill="${on?gold:(o.c||ink)}">${ch}</text>`;
    });
    return s2;
  };
  const drawC=(cx,cy,r,col,dur,beg,pre)=>{
    const L=Math.round(2*Math.PI*r);
    const d=`M${cx} ${cy-r} A${r} ${r} 0 1 1 ${cx-0.01} ${cy-r}`;
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.8" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;.62;1" dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite"/></path>`
      +`<circle r="5" fill="${gold}" stroke="#fffdf2" stroke-width="1.3"><animateMotion dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite" path="${d}"/></circle>`;
  };
  const drawRR=(x,y,w,h,rx,col,dur,beg,sw,pre,opt)=>{
    const r=Math.min(rx||8,Math.min(w,h)/2);
    const d=`M${x+r} ${y} H${x+w-r} A${r} ${r} 0 0 1 ${x+w} ${y+r} V${y+h-r} A${r} ${r} 0 0 1 ${x+w-r} ${y+h} H${x+r} A${r} ${r} 0 0 1 ${x} ${y+h-r} V${y+r} A${r} ${r} 0 0 1 ${x+r} ${y}`;
    const L=Math.round(2*(w-2*r)+2*(h-2*r)+2*Math.PI*r);
    return `<path d="${d}" fill="${(opt&&opt.fill)||'none'}" stroke="${col}" stroke-width="${sw||2.4}" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.6;1" dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite"/></path>`
      +((opt&&opt.pen===false)?'':`<circle r="5" fill="${gold}" stroke="#fffdf2" stroke-width="1.3"><animateMotion dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite" path="${d}"/></circle>`);
  };
  const drawLL=(a,b,col,sw,dur,beg,pre)=>{
    const L=Math.max(16,Math.round(Math.hypot(b.x-a.x,b.y-a.y)));
    const d=`M${a.x} ${a.y} L${b.x} ${b.y}`;
    return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw||2.2}" stroke-linecap="round" stroke-dasharray="${L}" stroke-dashoffset="${L}">`
      +`<animate fill="freeze" attributeName="stroke-dashoffset" values="${L};0;0" keyTimes="0;0.7;1" dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite"/></path>`;
  };
  const plate2=(x,y,w,h,col,txt,fs,pre)=>`<g class="${pre}Rise"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="rgba(12,32,34,.95)" stroke="${col}" stroke-width="1.9"/>`
    +fit(x+w/2,y+h*0.66,fs||13,col,txt,{b:1},w-16)+`</g>`;
  const walker=(cx,cy,s,c,ph)=>{
    const col=c||gold, hip=cy+2*s, ph2=((ph||0)*0.4).toFixed(2), ph3=(((ph||0)*0.4)+0.45).toFixed(2);
    const limb=(x1,y1,x2,y2,w2,delay,swing)=>`<g><animateTransform attributeName="transform" type="rotate" values="${-swing} ${x1} ${y1};${swing} ${x1} ${y1};${-swing} ${x1} ${y1}" dur="0.9s" begin="${delay}s" repeatCount="indefinite"/>`
      +`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="${w2}" stroke-linecap="round"/></g>`;
    return `<g>`
      +`<circle cx="${cx}" cy="${cy-30*s}" r="${7*s}" fill="none" stroke="${col}" stroke-width="${2.4*s}"/>`
      +`<line x1="${cx}" y1="${cy-22*s}" x2="${cx}" y2="${hip}" stroke="${col}" stroke-width="${3*s}" stroke-linecap="round"/>`
      +limb(cx,cy-18*s,cx-13*s,cy-6*s,2.4*s,ph2,26)
      +limb(cx,cy-18*s,cx+13*s,cy-6*s,2.4*s,ph3,26)
      +limb(cx,hip,cx-9*s,cy+18*s,2.8*s,ph2,24)
      +limb(cx,hip,cx+9*s,cy+18*s,2.8*s,ph3,24)
      +`</g>`;
  };
  const fit=(x,y,fs,c,t,o,maxw)=>{
    const s2=(maxw?Math.min(fs,maxw/Math.max(1,(''+t).length)/0.72):fs);
    return tx(x,y,s2,c,t,o);
  };
  const sineD=(x0,y0,w,amp,cyc,steps)=>{
    let d='';
    for(let i=0;i<=steps;i++){
      const t=i/steps, x=x0+t*w, y=y0-amp*Math.sin(t*cyc*2*Math.PI);
      d+=(i?' L':'M')+x.toFixed(1)+' '+y.toFixed(1);
    }
    return d;
  };
  const sinePts=(x0,y0,w,amp,cyc,n)=>{
    const o=[];
    for(let i=0;i<n;i++){
      const t=(n===1?0:i/(n-1)), x=x0+t*w, y=y0-amp*Math.sin(t*cyc*2*Math.PI);
      o.push([+x.toFixed(1),+y.toFixed(1)]);
    }
    return o;
  };
  const stairD=(pts)=>{
    let d='M'+pts[0][0]+' '+pts[0][1];
    for(let i=1;i<pts.length;i++) d+=' H'+pts[i][0]+' V'+pts[i][1];
    return d;
  };
  function pxGrid(pre,x0,y0,cell,mat,opt){
    opt=opt||{}; let s='';
    mat.forEach((row,r)=>row.forEach((v2,c)=>{
      const on=(v2===1||v2===true), x=x0+c*cell, y=y0+r*cell;
      const fill=on?'#101828':(opt.paper?'#eaf2ff':'rgba(255,255,255,.05)');
      s+=`<rect class="${pre}Pop" style="animation-delay:${((opt.base||0)+(r*mat[0].length+c)*0.03).toFixed(2)}s" x="${x}" y="${y}" width="${cell-1}" height="${cell-1}" rx="2" fill="${fill}" stroke="${opt.paper?'#c8d4ee':'#26355c'}" stroke-width="0.9"/>`;
    }));
    return s;
  }
  function graphDraw(pre,nodes,edges,opt){
    opt=opt||{}; const A=accOf(pre); let s='';
    edges.forEach((e,k)=>{
      const a=nodes[e[0]], b=nodes[e[1]];
      const hl=(opt.hlEdges||[]).indexOf(k)>=0;
      const col=hl?grn:((opt.dimAll||(opt.dimEdges||[]).indexOf(k)>=0)?'#33456e':'#5a6d96');
      s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${col}" stroke-width="${hl?4:2.4}" opacity="${(opt.dimAll&&!hl)?0.35:0.95}"/>`;
      if(opt.dir){
        const dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy)||1, ux=dx/L, uy=dy/L;
        const ax=b.x-ux*24, ay=b.y-uy*24;
        s+=`<path d="M${ax.toFixed(1)} ${ay.toFixed(1)} l${(-ux*11-uy*7).toFixed(1)} ${(-uy*11+ux*7).toFixed(1)} l${(ux*8-uy*10).toFixed(1)} ${(uy*8+ux*10).toFixed(1)} z" fill="#8ea3c8"/>`;
      }
      if(e[2]!==undefined) s+=`<g class="${pre}Pop"><rect x="${(a.x+b.x)/2-16}" y="${(a.y+b.y)/2-11}" width="32" height="20" rx="6" fill="rgba(10,18,36,.97)" stroke="#41558a" stroke-width="1.2"/>`
        +`<text x="${(a.x+b.x)/2}" y="${(a.y+b.y)/2+3}" text-anchor="middle" font-size="11" font-weight="bold" fill="${gold}">${e[2]}</text></g>`;
    });
    nodes.forEach((n,i)=>{
      const hl=(opt.hlNodes||[]).indexOf(i)>=0, dim=(opt.dimNodes||[]).indexOf(i)>=0;
      const col=hl?grn:(n.c||A);
      s+=`<circle cx="${n.x}" cy="${n.y}" r="17" fill="${hl?'rgba(19,44,35,.97)':'rgba(10,18,36,.97)'}" stroke="${col}" stroke-width="${hl?3:2.2}" opacity="${dim?0.4:1}"/>`
        +(hl?`<circle class="${pre}Glow" cx="${n.x}" cy="${n.y}" r="23" fill="none" stroke="${col}" stroke-width="1.8" opacity=".45"/>`:'')
        +`<text x="${n.x}" y="${n.y+5}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${hl?grn:col}" paint-order="stroke" stroke="#08101f" stroke-width="3">${n.t}</text>`;
    });
    return s;
  }
  function gridTable(pre,x0,y0,cw,rh,head,rows,opt){
    opt=opt||{};
    const A=accOf(pre);
    const c0=opt.c0||78, n=(head&&head.length)||(rows[0]||[]).length;
    let w=[], x=[], cur=x0;
    for(let c=0;c<n;c++){ const ww=(c===0?c0:cw); w.push(ww); x.push(cur); cur+=ww; }
    let s='';
    if(head) head.forEach((h,c)=>{
      s+=`<rect x="${x[c]}" y="${y0}" width="${w[c]}" height="${rh}" fill="${A}" opacity=".18" stroke="${A}" stroke-width="1.2"/>`
        +`${tx(x[c]+w[c]/2,y0+rh*0.68,Math.min(11.5,(w[c]-8)/Math.max(1,plain(h).length)/0.72),A,h,{b:1})}`;
    });
    const top=y0+(head?rh:0);
    rows.forEach((r,ri)=>{
      r.forEach((cell,ci)=>{
        const cy=top+ri*rh;
        const isCell=!!(opt.hlCell&&opt.hlCell[0]===ri&&opt.hlCell[1]===ci);
        const isHl=(opt.hlRow===ri), isHc=(opt.hlCol===ci);
        const fill=isCell?'rgba(125,224,160,.22)':(isHl?'rgba(255,215,106,.12)':(isHc?'rgba(110,168,255,.12)':'rgba(15,25,46,.95)'));
        const stc=isCell?grn:(isHl?gold:(isHc?blu:'#31456f'));
        s+=`<rect x="${x[ci]}" y="${cy}" width="${w[ci]}" height="${rh}" fill="${fill}" stroke="${stc}" stroke-width="${(isCell||isHl||isHc)?1.6:1.1}"/>`
          +`<text x="${x[ci]+w[ci]/2}" y="${cy+rh*0.68}" text-anchor="middle" font-size="${ci===0?11:14.5}" font-family="${ci===0?'Arial,Helvetica,sans-serif':'Georgia,serif'}" font-weight="${ci===0?'normal':'bold'}" fill="${isCell?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(cell)}</text>`;
      });
    });
    return {s:s, x:x, w:w, total:cur-x0, bottom:top+rows.length*rh};
  }
  function cellRow(pre,x0,y,w,h,vals,opt){
    opt=opt||{}; let s='';
    vals.forEach((v2,k)=>{
      const x=x0+k*(w+6), on=(opt.at===k), col=on?(opt.c||grn):'#6ea8ff';
      s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9" fill="${on?'rgba(19,44,35,.97)':'rgba(15,25,46,.97)'}" stroke="${col}" stroke-width="${on?2.4:1.6}"/>`
        +`<text x="${x+w/2}" y="${y+h/2+7}" text-anchor="middle" font-size="18" font-family="Georgia,serif" font-weight="bold" fill="${on?(opt.c||grn):ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
        +(opt.idx?tx(x+w/2,y+h+16,10.5,on?(opt.c||grn):dim,''+k,{}):'')
        +(on&&opt.ring?`<rect class="${pre}Glow" x="${x-3}" y="${y-3}" width="${w+6}" height="${h+6}" rx="12" fill="none" stroke="${col}" stroke-width="2" opacity=".45"/>`:'');
    });
    return s;
  }
  function wrapT(t,max){
    const w=(''+t).split(' '), out=[]; let cur='';
    w.forEach(x=>{ if((cur?cur+' ':'')+x && ((cur+' '+x).trim().length>max) && cur){ out.push(cur); cur=x; } else cur=(cur+' '+x).trim(); });
    if(cur) out.push(cur);
    return out;
  }
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
     +`@keyframes ${pre}Spot{0%,100%{opacity:.15}38%,62%{opacity:.62}}`
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
      const it=v.items||[], ch=58, cw=136, gx=10, gy=10, rows=Math.ceil(it.length/2);
      const tot=rows*ch+(rows-1)*gy, y0=Math.max(20,Math.round((H-tot)/2));
      let s='';
      it.forEach((c,k)=>{
        const x=22+(k%2)*(cw+gx), y=y0+Math.floor(k/2)*(ch+gy), col=c.c||A;
        const title=plain(c.t), cx=x+29, cy=y+ch/2, tx0=x+cw/2+15;
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
      const n=v.bits.length, bw=n<=4?48:(n<=6?40:30), gp=n<=4?12:(n<=6?6:5);
      const tot=n*bw+(n-1)*gp, x0=Math.round((CW-tot)/2), by=n>=7?58:44, bh=n<=4?62:56;
      const busY=by+bh+12;
      let s=`<rect x="18" y="${busY}" width="${CW-36}" height="6" rx="3" fill="url(#${pre}bar)" opacity=".5"/>`;
      v.bits.forEach((b,k)=>{
        const x=x0+k*(bw+gp), col=b?grn:'#8ea3c8';
        s+=`<line x1="${x+bw/2}" y1="${by+bh+2}" x2="${x+bw/2}" y2="${busY+1}" stroke="${b?grn:'#3a4c78'}" stroke-width="2"/>`
          +`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${x}" y="${by}" width="${bw}" height="${bh}" rx="11" fill="${b?'rgba(125,224,160,.13)':'rgba(255,255,255,.045)'}" stroke="${b?grn:cardB}" stroke-width="2.2"/>`
          +(b?`<rect class="${pre}Glow" x="${x-3}" y="${by-3}" width="${bw+6}" height="${bh+6}" rx="13" fill="none" stroke="${grn}" stroke-width="2.2" opacity=".4"/>`:'')
          +`<circle cx="${x+bw/2}" cy="${by+bh-9}" r="3" fill="${b?grn:'#465878'}"/>`
          +`${tx(x+bw/2,by+34,n<=4?28:22,b?grn:col,''+b,{b:1,georgia:1})}`
          +`${tx(x+bw/2,by+bh+30,10.5,dim,b?'вкл':'выкл',{})}</g>`;
      });
      if(n===8){ /* скобка «1 байт»: 8 бит вместе */
        s+=`<path d="M${x0} ${by-8} v-5 h${tot} v5" fill="none" stroke="${gold}" stroke-width="2" opacity=".85"/>`
          +`<rect x="${159-42}" y="${by-32}" width="84" height="22" rx="8" fill="rgba(10,18,36,.98)" stroke="${gold}" stroke-width="1.6"/>`
          +`${tx(159,by-16,11.5,gold,'1 байт',{b:1})}`;
      }
      s+=`${tx(159,H-8,11,dim,v.note||'есть ток — 1, нет тока — 0',{})}`;
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
      const hl=(v.hl===undefined?-1:v.hl), chn=!!v.chain;
      pr.forEach((c,k)=>{
        const x=x0+k*(cw+gp), on=(k===hl);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${x}" y="${y}" width="${cw}" height="56" rx="11" fill="${on?'rgba(176,127,255,.16)':'url(#'+pre+'card)'}" stroke="${on?gold:pur}" stroke-width="${on?2.6:2}"/>`
          +(on?`<rect class="${pre}Glow" x="${x-4}" y="${y-4}" width="${cw+8}" height="64" rx="14" fill="none" stroke="${gold}" stroke-width="2" opacity=".45"/>`:'')
          +`<rect x="${x+1}" y="${y+1}" width="${cw-2}" height="3" rx="1.5" fill="${on?gold:pur}" opacity=".8"/>`
          +`${tx(x+cw/2,y+28,23,on?gold:ink,c[0],{b:1,georgia:1})}`
          +`<rect x="${x+6}" y="${y+38}" width="${cw-12}" height="15" rx="6" fill="${on?gold:pur}" opacity=".18"/>`
          +`${tx(x+cw/2,y+50,11.5,on?gold:pur,c[1],{b:1})}</g>`
          +(chn&&k<pr.length-1?`${tx(x+cw+gp/2,y+32,15,dim,'+',{b:1})}`:'');
      });
      if(chn){
        s+=`<path d="M ${x0} ${y+66} V${y+74} M ${x0+tot} ${y+66} V${y+74}" stroke="${A}" stroke-width="1.6" opacity=".4"/>`
          +`<rect class="${pre}Rise" style="animation-delay:.6s" x="40" y="${y+74}" width="238" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.8"/>`
          +`${tx(159,y+94,14,grn,v.result||pr.map(c=>c[1]).join(' '),{b:1})}`;
        return s;
      }
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
          : x.k==='p'
          ? `<path d="M${75+18} ${y} h168 l-18 ${rh} h-168 z" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
          : `<rect x="75" y="${y}" width="168" height="${rh}" rx="9" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s" filter="url(#${pre}sh)">${shape}`
          +`<rect class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" x="70" y="${y-3}" width="7" height="${rh+6}" rx="3.5" fill="${c}"/>`
          +`${tx(159,y+rh/2+4.5,12.5,c,x.t,{b:1})}</g>`;
        if(k<sh.length-1) s+=`<path d="M159 ${y+rh+2} V${y+rh+gp-2}" stroke="${A}" stroke-width="2" opacity=".7" class="${pre}Dash"/><path d="M155 ${y+rh+gp-7} l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
        if(x.k==='d'){ /* у ромба две ветки: да — вниз, нет — в сторону */
          s+=`<path d="M245 ${y+rh/2} h26" stroke="${dim}" stroke-width="1.6" stroke-dasharray="5 4" class="${pre}Dash"/><path d="M267 ${y+rh/2-4} l5 4 l-5 4" fill="none" stroke="${dim}" stroke-width="1.6"/>`
            +`${tx(283,y+rh/2+4,10,dim,'нет',{})}`;
          if(k<sh.length-1) s+=`${tx(173,y+rh+11,10,dim,'да',{})}`;
        }
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
      if(v.out){ /* экран: что появится на выходе */
        const oy=hh+34;
        s+=`<g class="${pre}Rise" style="animation-delay:.55s"><rect x="76" y="${oy}" width="166" height="44" rx="10" fill="rgba(8,14,30,.95)" stroke="${grn}" stroke-width="2"/>`
          +`<rect x="76" y="${oy}" width="166" height="3" rx="1.5" fill="${grn}" opacity=".8"/>`
          +`<text x="159" y="${oy+31}" text-anchor="middle" font-size="17" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="4" opacity="0">${plain(v.out)}<animate attributeName="opacity" values="0;1" dur=".4s" begin="1s" fill="freeze"/></text>`
          +`${tx(159,oy-5,10,dim,'экран',{})}</g>`;
      }
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
      s+=`<path d="M240 62 H252" stroke="${A}" stroke-width="2" opacity=".6"/><path d="M248 58 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>${tx(244,50,10,dim,'нет',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.2s"><ellipse cx="278" cy="62" rx="25" ry="16" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>${tx(278,66,11,A,'выход',{})}</g>`;
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
      let colw=need.map(x=>Math.max(26, avail*x/sumN));
      const wsum=colw.reduce((x,y)=>x+y,0);
      if(wsum>avail) colw=colw.map(x=>x*avail/wsum);
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
      s+=`<g class="${pre}Pop"><ellipse cx="140" cy="24" rx="56" ry="13" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>${tx(140,28,11.5,grn,'начало',{b:1})}</g>`;
      s+=`<path d="M140 38 V54" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M136 50 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<rect x="26" y="56" width="238" height="176" rx="15" fill="rgba(125,224,160,.06)" stroke="${grn}" stroke-width="2" stroke-dasharray="9 7"/>`;
      s+=`<rect x="34" y="47" width="126" height="20" rx="7" fill="rgba(10,18,36,.98)" stroke="${grn}" stroke-width="1.5"/>${tx(97,61,10.5,grn,'пока не вышли',{b:1})}`;
      s+=`<g class="${pre}Pop" style="animation-delay:.15s"><path d="M130 84 l62 24 l-62 24 l-62 -24 z" fill="rgba(176,127,255,.14)" stroke="${pur}" stroke-width="2.2"/>${tx(130,112,12.5,pur,'стена?',{b:1})}</g>`;
      s+=`<path d="M192 108 H200" stroke="${A}" stroke-width="2"/><path d="M196 104 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>${tx(206,100,10,dim,'да',{})}`;
      s+=`<g class="${pre}Pop" style="animation-delay:.28s"><rect x="204" y="86" width="52" height="30" rx="8" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>${tx(230,105,11,gold,'повернуть',{})}</g>`;
      s+=`<path d="M230 116 V142 H196" stroke="${A}" stroke-width="2" opacity=".65" class="${pre}Dash"/><path d="M200 138 l-5 4 l5 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<path d="M130 132 V142" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M126 138 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>${tx(146,140,10,dim,'нет',{})}`;
      s+=`<g class="${pre}Pop" style="animation-delay:.4s" filter="url(#${pre}sh)"><rect x="60" y="148" width="134" height="32" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2.2"/>${tx(127,169,12.5,ink,'шаг вперёд',{b:1})}</g>`;
      s+=`<path d="M127 180 V206 H38 V108 H64" fill="none" stroke="${A}" stroke-width="2" opacity=".6" class="${pre}Dash"/><path d="M60 104 l-5 4 l5 4" fill="none" stroke="${A}" stroke-width="2"/>`
        +`<circle r="4" fill="${gold}"><animateMotion dur="3.4s" repeatCount="indefinite" path="M127 180 V206 H38 V108 H64"/></circle>`;
      s+=`<path d="M264 206 H270" stroke="${A}" stroke-width="2" opacity=".7"/><path d="M266 202 l5 4 l-5 4" fill="none" stroke="${A}" stroke-width="2"/>`
        +`<ellipse cx="288" cy="206" rx="16" ry="12" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.8"/>${tx(288,210,7,red,'выход',{})}`;
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
      const gs=[{x:70,y:96,r:34,v:v.a||'i',t:v.la||'повторы',c:blu},{x:159,y:96,r:26,v:v.b||'шаги',t:v.lb||'шагов',c:grn},{x:224,y:96,r:20,v:v.c||'повороты',t:v.lc||'поворотов',c:gold}];
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
      const br=[{x:70,y:60,t:'переменные',c:blu},{x:248,y:60,t:'условие',c:pur},{x:70,y:170,t:'цикл',c:grn},{x:248,y:170,t:'порядок',c:gold}];
      let s=`<g>`;
      br.forEach((q,k)=>{
        s+=`<path d="M159 116 Q${(159+q.x)/2} ${(116+q.y)/2} ${q.x} ${q.y}" fill="none" stroke="${q.c}" stroke-width="2" opacity=".55" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      });
      br.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="${q.x-54}" y="${q.y-17}" width="108" height="34" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`${tx(q.x,q.y+5,11.5,q.c,q.t,{b:1})}</g>`;
      });
      s+=`<g class="${pre}Pulse" filter="url(#${pre}sh)"><circle cx="159" cy="116" r="42" fill="rgba(10,18,36,.97)" stroke="${A}" stroke-width="2.6"/><circle cx="159" cy="116" r="50" fill="none" stroke="${A}" stroke-width="1.6" opacity=".35"/></g>`
        +`${tx(159,110,12.5,ink,'моя',{b:1})}${tx(159,126,12.5,ink,'программа',{b:1})}`;
      s+=`${tx(159,206,11,dim,'всё, что нужно, чтобы написать любую программу',{})}`;
      return s;
    }
    if(K==='pick'){ /* интерактив: выбери ответ */
      const opts=v.opts||[], sel=(st&&typeof st.pick==='number')?st.pick:-1, okI=opts.findIndex(o=>o.ok);
      const qq=plain(v.q||'Выбери ответ');
      const qp=(qq.length>30 && qq.indexOf(' ')>0)?(()=>{ const m=qq.lastIndexOf(' ',Math.ceil(qq.length/2)); return [qq.slice(0,m),qq.slice(m+1)]; })():[qq];
      const qfs=Math.min(12.5, 244/(Math.max.apply(null,qp.map(x=>x.length))*0.72));
      const qh=qp.length>1?46:34, y0=qp.length>1?78:70;
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="20" y="20" width="278" height="${qh}" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +(qp.length>1
          ? `<text x="159" y="40" text-anchor="middle" font-size="${qfs.toFixed(1)}" fill="${ink}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[0]}</text>`
           +`<text x="159" y="58" text-anchor="middle" font-size="${qfs.toFixed(1)}" fill="${ink}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[1]}</text>`
          : `${tx(159,42,qfs,ink,qq,{b:1})}`)
        +`</g>`;
      opts.forEach((o,k)=>{
        const y=y0+k*40, done=sel>=0, good=(k===okI);
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
      if(sel>=0){
        const elines=wrapT(plain(v.exp||(sel===okI?'Верно!':'Подумай ещё')),40).slice(0,3);
        const eh=12+elines.length*15;
        s+=`<g class="${pre}Rise" style="animation-delay:.2s"><rect x="20" y="${y0+opts.length*40+6}" width="278" height="${eh}" rx="9" fill="rgba(255,255,255,.04)" stroke="${sel===okI?grn:gold}" stroke-width="1.8"/>`
          +elines.map((t,k)=>tx(159,y0+opts.length*40+24+k*15,Math.min(11,252/Math.max(1,t.length)/0.7),sel===okI?grn:gold,t,{b:1})).join('')
          +`</g>`;
      }
      else s+=`${tx(159,y0+opts.length*40+22,11,dim,'нажми на вариант — я проверю',{})}`;
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
      const qq=plain(v.q||'Собери алгоритм по порядку');
      const qp=(qq.length>30 && qq.indexOf(' ')>0)?(()=>{ const m=qq.lastIndexOf(' ',Math.ceil(qq.length/2)); return [qq.slice(0,m),qq.slice(m+1)]; })():[qq];
      const qfs2=Math.min(12, 250/(Math.max.apply(null,qp.map(x=>x.length))*0.72));
      const qh2=qp.length>1?46:30;
      let s=`<g class="${pre}Pop"><rect x="16" y="20" width="286" height="${qh2}" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +(qp.length>1
          ? `<text x="159" y="40" text-anchor="middle" font-size="${qfs2.toFixed(1)}" fill="${ink}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[0]}</text>`
           +`<text x="159" y="58" text-anchor="middle" font-size="${qfs2.toFixed(1)}" fill="${ink}" font-weight="bold" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${qp[1]}</text>`
          : `${tx(159,40,qfs2,ink,qq,{b:1})}`)
        +`</g>`;
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
    if(K==='broken'){ /* программа не работает: робот врезался в стену */
      let s=`<line x1="20" y1="150" x2="300" y2="150" stroke="#31456f" stroke-width="2"/>`;
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="234" y="84" width="20" height="66" rx="4" fill="#33456e" stroke="${blu}" stroke-width="1.6"/>`
        +`<path d="M238 96 L250 132 M250 96 L238 132" stroke="${blu}" stroke-width="1.2" opacity=".7"/></g>`;
      s+=`<g><circle r="13" fill="${gold}" stroke="#fffdf2" stroke-width="1.8"/>`
        +`<circle cx="-4" cy="-3" r="2.8" fill="#1a2340"/><circle cx="4" cy="-3" r="2.8" fill="#1a2340"/>`
        +`<animateMotion dur="2.6s" repeatCount="indefinite" path="M40 136 H214"/></g>`;
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;.52;.6;.72;1" dur="2.6s" repeatCount="indefinite"/>`
        +`<circle cx="222" cy="136" r="24" fill="${red}" opacity=".22"/>`
        +`<path d="M216 122 l14 22 h-28 z" fill="${red}" opacity=".95"/><text x="216" y="141" text-anchor="middle" font-size="13" font-weight="bold" fill="#241016">!</text></g>`;
      s+=`<path d="M234 106 l-9 11 l9 9 l-9 13" fill="none" stroke="${red}" stroke-width="2.4" opacity=".85"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="22" y="162" width="274" height="46" rx="10" fill="rgba(8,14,30,.92)" stroke="${red}" stroke-width="1.7"/>`
        +`<text x="48" y="184" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">вперёд · вперёд · вперёд</text>`
        +`${tx(159,201,10.5,red,'а здесь нужно было повернуть',{b:1})}</g>`;
      return s;
    }
    if(K==='kinds3'){ /* три вида ошибок */
      const rows=[
        {t:'Опечатка в команде', c1:'виперёд', c2:'вперёд', c:red, ic:'quest'},
        {t:'Не тот порядок', c1:'налить · взять чашку', c2:'взять · налить', c:gold, ic:'loop'},
        {t:'Не то условие', c1:'пока i > 3', c2:'пока i ≤ 3', c:pur, ic:'gear'}
      ];
      let s='';
      rows.forEach((q,k)=>{
        const y=22+k*62;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="14" y="${y}" width="290" height="54" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<circle cx="36" cy="${y+27}" r="13" fill="${q.c}" opacity=".16" stroke="${q.c}" stroke-width="1.4"/>`
          +`<text x="36" y="${y+32}" text-anchor="middle" font-size="14" font-weight="bold" fill="${q.c}" font-family="Georgia,serif">${k+1}</text>`
          +`${tx(100,y+18,10.5,ink,q.t,{an:'start'})}`
          +`<text x="100" y="${y+40}" font-size="${Math.min(11.5,96/(Math.max(1,q.c1.length)*0.66)).toFixed(1)}" font-family="'Courier New',monospace" font-weight="bold" fill="${red}">${q.c1}</text>`
          +`<path d="M100 ${y+44} h96" stroke="${red}" stroke-width="2" stroke-dasharray="96" stroke-dashoffset="96">`
          +`<animate attributeName="stroke-dashoffset" values="96;0" dur=".6s" begin="${(0.5+k*0.2).toFixed(2)}s" fill="freeze"/></path>`
          +`<path d="M204 ${y+36} h12 m-4 -4 l5 4 l-5 4" stroke="${A}" stroke-width="1.6" fill="none" opacity=".7"/>`
          +`<text x="224" y="${y+40}" font-size="${Math.min(11.5,74/(Math.max(1,q.c2.length)*0.66)).toFixed(1)}" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">${q.c2}</text>`
          +`</g>`;
      });
      s+=`${tx(159,212,11,dim,'красным — как не надо, зелёным — как правильно',{})}`;
      return s;
    }
    if(K==='console'){ /* компьютер сообщает об ошибке */
      const ln=(v.lines||['шаги = 0','пока шаги < 3:','    вперёд шаг','    шаги = шаги + 1','вывести шаги']);
      let s=`<rect x="12" y="24" width="150" height="152" rx="11" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".5" stroke-width="1.6"/>`
        +`${tx(87,42,10.5,dim,'моя программа',{})}`;
      ln.forEach((t,k)=>{
        const y=54+k*24, bad=(k===2);
        s+=`<rect x="18" y="${y}" width="138" height="20" rx="5" fill="${bad?'rgba(255,120,100,.16)':'rgba(255,255,255,.04)'}" stroke="${bad?red:'#2b3c62'}" stroke-width="1"/>`
          +`<text x="26" y="${y+14}" font-size="10.5" font-family="'Courier New',monospace" font-weight="bold" fill="${bad?red:cyan}">${plain(t.trim())}</text>`;
      });
      s+=`<rect x="170" y="24" width="134" height="152" rx="11" fill="rgba(30,10,14,.92)" stroke="${red}" stroke-width="1.8"/>`
        +`<circle cx="184" cy="38" r="3.4" fill="#ff6b6b"/><circle cx="195" cy="38" r="3.4" fill="${gold}" opacity=".6"/><circle cx="206" cy="38" r="3.4" fill="${grn}" opacity=".6"/>`
        +`${tx(240,42,10.5,red,'сообщение',{})}`;
      ['не знаю команду','«вперёд шаг»','строка 3'].forEach((t,k)=>{
        s+=`<text x="182" y="${62+k*20}" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${red}" opacity="0">${t}`
          +`<animate attributeName="opacity" values="0;1" dur=".3s" begin="${(0.6+k*0.35).toFixed(2)}s" fill="freeze"/></text>`;
      });
      s+=`<g class="${pre}Pop" style="animation-delay:1.8s"><rect x="176" y="126" width="122" height="34" rx="8" fill="rgba(255,120,100,.14)" stroke="${red}" stroke-width="1.6"/>`
        +`${tx(237,147,11,red,'исправь строку 3',{b:1})}</g>`;
      s+=`<path d="M168 108 H158" stroke="${red}" stroke-width="1.8" stroke-dasharray="5 4" class="${pre}Dash"/><path d="M150 104 l-6 4 l6 4" fill="none" stroke="${red}" stroke-width="1.8"/>`;
      s+=`${tx(160,192,11,dim,'компьютер останавливается и говорит, где ошибка',{})}`;
      return s;
    }
    if(K==='stepdebug'){ /* пошаговое выполнение: где всё пошло не так */
      const ln=(v.lines||['взять чашку','положить чай','налить кипяток','выпить чай','убрать чашку']);
      const stop=v.stop||3;
      let s=`<rect x="34" y="22" width="240" height="${ln.length*26+14}" rx="11" fill="rgba(8,14,30,.9)" stroke="${A}" stroke-opacity=".45" stroke-width="1.5"/>`;
      ln.forEach((t,k)=>{
        const y=30+k*26, d=(0.5+k*0.55).toFixed(2), du=(ln.length*0.55+1.2).toFixed(2);
        const isStop=(k===stop);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.08*k).toFixed(2)}s">`
          +`<rect x="40" y="${y}" width="228" height="22" rx="5" fill="${isStop?'rgba(255,120,100,.14)':'rgba(255,255,255,.035)'}" stroke="${isStop?red:'#2b3c62'}" stroke-width="${isStop?1.8:1}"/>`
          +`<text x="50" y="${y+15}" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${isStop?red:cyan}">${plain(t)}</text>`
          +(isStop?`<circle class="${pre}Blink" cx="256" cy="${y+11}" r="8" fill="none" stroke="${red}" stroke-width="2"/>`
                 +`<text x="256" y="${y+15}" text-anchor="middle" font-size="11" font-weight="bold" fill="${red}">?</text>`:'')
          +`</g>`
          +`<path class="${pre}Spot" style="animation-delay:${d}s;animation-duration:${du}s" d="M30 ${y+4} l7 7 l-7 7 z" fill="${gold}"/>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="14" y="22" width="16" height="16" rx="4" fill="rgba(255,215,106,.2)" stroke="${gold}" stroke-width="1.4"/>`
        +`<text x="22" y="34" text-anchor="middle" font-size="10" font-weight="bold" fill="${gold}">1</text>`
        +`<rect x="14" y="${30+stop*26}" width="16" height="16" rx="4" fill="rgba(255,120,100,.2)" stroke="${red}" stroke-width="1.4"/>`
        +`<text x="22" y="${42+stop*26}" text-anchor="middle" font-size="10" font-weight="bold" fill="${red}">!</text></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.8s"><rect x="272" y="${30+stop*26-4}" width="32" height="24" rx="7" fill="rgba(255,120,100,.14)" stroke="${red}" stroke-width="1.5"/>`
        +`<text x="288" y="${30+stop*26+13}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${red}">стоп</text></g>`;
      s+=`${tx(159,30+ln.length*26+18,11,dim,'подсветка идёт по строкам — на этой она останавливается',{})}`;
      return s;
    }
    if(K==='printDebug'){ /* отладочная печать значений */
      const out=(v.out||['i = 1   шаги = 1','i = 2   шаги = 2','i = 3   шаги = 3']);
      let s=`<rect x="36" y="26" width="246" height="${out.length*26+30}" rx="11" fill="rgba(8,14,30,.94)" stroke="${grn}" stroke-width="1.8"/>`
        +`<rect x="36" y="26" width="246" height="3" rx="1.5" fill="${grn}" opacity=".8"/>`
        +`${tx(159,46,10.5,grn,'отладочная печать',{b:1})}`;
      out.forEach((t,k)=>{
        s+=`<text x="52" y="${70+k*26}" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}" opacity="0">${plain(t)}`
          +`<animate attributeName="opacity" values="0;1" dur=".3s" begin="${(0.5+k*0.4).toFixed(2)}s" fill="freeze"/></text>`;
      });
      s+=`${tx(159,out.length*26+72,11,dim,'команда «вывести» показывает, что происходит внутри',{})}`;
      return s;
    }
    if(K==='traceErr'){ /* сравниваем с тем, что должно быть */
      const head=(v.head||['шаг','i','получилось','должно быть']), rows=(v.rows||[]);
      const cw=[54,44,86,86], x0=[16,74,122,212];
      const hy=40, rh=28;
      let s=`<g class="${pre}Pop"><rect x="16" y="${hy}" width="286" height="${rh}" rx="8" fill="${A}" opacity=".16" stroke="${A}" stroke-width="1.5"/></g>`;
      head.forEach((h,k)=>{ s+=`${tx(x0[k]+cw[k]/2,hy+19,10.5,k>=2&&k===3?grn:A,h,{b:1})}`; });
      s+=`<path d="M120 ${hy-9} h178" stroke="${grn}" stroke-width="1.6" opacity=".7"/><path d="M120 ${hy-9} v6 M298 ${hy-9} v6" stroke="${grn}" stroke-width="1.6" opacity=".7"/>`
        +`${tx(209,hy-15,9.5,grn,'сравниваем',{})}`;
      rows.forEach((r,k)=>{
        const y=hy+rh+k*rh;
        s+=`<rect x="16" y="${y}" width="286" height="${rh}" fill="${k%2?'rgba(255,255,255,.05)':'rgba(255,255,255,.015)'}" stroke="#2b3c62" stroke-width="1"/>`;
        r.forEach((cv,c)=>{
          const wrong=(c===2 && plain(cv)!==plain(r[3]));
          const col=wrong?red:(c===3?grn:(c===0?dim:ink));
          s+=`${tx(x0[c]+cw[c]/2, y+20, c===0?11:13, col, cv, {b:c>0, georgia:c>0})}`;
          if(wrong) s+=`<rect class="${pre}Glow" x="${x0[c]+2}" y="${y+2}" width="${cw[c]-4}" height="${rh-4}" rx="6" fill="none" stroke="${red}" stroke-width="2" opacity=".6"/>`;
        });
      });
      const by=hy+rh+rows.length*rh;
      const nl=wrapT(plain(v.note||'там, где получилось не то — ошибка'),44).slice(0,2), nh=12+nl.length*15;
      s+=`<rect x="16" y="${by+8}" width="286" height="${nh}" rx="9" fill="rgba(255,255,255,.04)" stroke="${red}" stroke-width="1.6"/>`
        +nl.map((t,k)=>tx(159,by+26+k*15,Math.min(11,252/Math.max(1,t.length)/0.7),red,t,{b:1})).join('');
      return s;
    }
    if(K==='breakpoints'){ /* точка останова и лупа */
      const ln=(v.lines||['шаги = 0','пока шаги < 3:','    шаг вперёд','    шаги = шаги + 1']);
      const bp=v.bp||3;
      let s=`<rect x="14" y="26" width="188" height="${ln.length*26+16}" rx="11" fill="rgba(8,14,30,.9)" stroke="${A}" stroke-opacity=".45" stroke-width="1.5"/>`;
      ln.forEach((t,k)=>{
        const y=34+k*26, isB=(k===bp);
        s+=`<rect x="20" y="${y}" width="176" height="22" rx="5" fill="${isB?'rgba(255,120,100,.14)':'rgba(255,255,255,.035)'}" stroke="${isB?red:'#2b3c62'}" stroke-width="1"/>`
          +`<text x="30" y="${y+15}" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${isB?red:cyan}">${plain(t.trim())}</text>`;
        if(isB) s+=`<circle class="${pre}Pulse" cx="20" cy="${y+11}" r="8" fill="${red || '#ff9a8a'}" opacity=".85" stroke="#fffdf2" stroke-width="1.2"/>`;
      });
      s+=`<path d="M206 108 H222" stroke="${A}" stroke-width="1.8" stroke-dasharray="5 4" class="${pre}Dash"/>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.35s"><circle cx="262" cy="108" r="42" fill="rgba(126,168,255,.08)" stroke="${A}" stroke-width="2.6"/>`
        +`<circle cx="262" cy="108" r="37" fill="rgba(8,14,30,.94)"/>`
        +`<path d="M292 138 l18 18" stroke="${A}" stroke-width="6" stroke-linecap="round"/>`
        +`${tx(262,100,10,dim,'сейчас',{})}${tx(262,120,16,grn,v.val||'шаги = 1',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="16" y="${26+ln.length*26+26}" width="286" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${red}" stroke-width="1.5"/>`
        +`${tx(159,26+ln.length*26+45,11,red,'красная точка — программа останавливается, и видно значения',{})}</g>`;
      return s;
    }
    if(K==='bisect'){ /* ищем ошибку делением пополам */
      const n=8, bw=32, gp=4, x0=Math.round((318-(n*bw+(n-1)*gp))/2), y=74;
      let s='';
      for(let k=0;k<n;k++){
        const x=x0+k*(bw+gp), firstHalf=(k<4), secondHalf=(k>=6);
        const c=firstHalf?grn:(k===7?red:A);
        s+=`<rect x="${x}" y="${y}" width="${bw}" height="34" rx="6" fill="rgba(15,25,46,.96)" stroke="#2b3c62" stroke-width="1.4"/>`
          +`<rect x="${x}" y="${y}" width="${bw}" height="34" rx="6" fill="${c}" opacity="0">`
          +(firstHalf?`<animate attributeName="opacity" values="0;.22" dur=".4s" begin=".5s" fill="freeze"/>`:'')
          +(secondHalf&&k!==7?`<animate attributeName="opacity" values="0;.18" dur=".4s" begin="1.5s" fill="freeze"/>`:'')
          +`</rect>`
          +`${tx(x+bw/2,y+22,12,A,''+(k+1),{b:1})}`;
      }
      s+=`<path d="M${x0} ${y-10} h${4*bw+3*gp}" stroke="${grn}" stroke-width="2" opacity="0"><animate attributeName="opacity" values="0;.8" dur=".4s" begin=".5s" fill="freeze"/></path>`
        +`${tx(x0+(4*bw+3*gp)/2,y-16,10,grn,'здесь всё верно',{})}`;
      s+=`<path d="M${x0+6*(bw+gp)} ${y+44} h${2*bw+gp}" stroke="${gold}" stroke-width="2" opacity="0"><animate attributeName="opacity" values="0;.8" dur=".4s" begin="1.5s" fill="freeze"/></path>`
        +`${tx(x0+7*(bw+gp),y+58,10,gold,'делим ещё раз',{})}`;
      s+=`<circle class="${pre}Glow" cx="${x0+7*(bw+gp)+bw/2}" cy="${y+17}" r="24" fill="none" stroke="${red}" stroke-width="2.4" opacity=".5" style="animation-delay:2.2s"/>`
        +`<path d="M${x0+7*(bw+gp)+bw/2} ${y+17} l14 14" stroke="${red}" stroke-width="3" opacity="0"><animate attributeName="opacity" values="0;1" dur=".3s" begin="2.2s" fill="freeze"/></path>`
        +`${tx(159,196,11.5,red,'ошибка в последнем блоке — его и проверяем',{b:1})}`;
      s+=`${tx(159,214,11,dim,'проверяем половину — и снова делим пополам',{})}`;
      return s;
    }
    if(K==='fixpatch'){ /* как выглядит исправление */
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="14" y="34" width="132" height="86" rx="11" fill="rgba(52,22,26,.75)" stroke="${red}" stroke-width="2"/>`
        +`${tx(80,54,11,red,'было',{b:1})}`
        +`<text x="30" y="80" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${red}">вперёд шаг</text>`
        +`<path d="M30 86 h66" stroke="${red}" stroke-width="2.4"/>`
        +`${tx(80,110,10.5,dim,'компьютер не знает',{})}</g>`;
      s+=`<path d="M152 77 h26" stroke="${A}" stroke-width="2.4" opacity=".8"/><circle cx="152" cy="77" r="3.6" fill="${A}" style="--run:26px" class="${pre}Dot"/><path d="M174 73 l6 4 l-6 4" fill="none" stroke="${A}" stroke-width="2.2"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s" filter="url(#${pre}sh)"><rect x="188" y="34" width="116" height="86" rx="11" fill="rgba(19,44,35,.8)" stroke="${grn}" stroke-width="2"/>`
        +`${tx(246,54,11,grn,'стало',{b:1})}`
        +`<text x="200" y="80" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">шаг вперёд</text>`
        +`<path d="M264 92 l6 7 l12 -16" fill="none" stroke="${grn}" stroke-width="2.8"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="20" y="136" width="278" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,156,11.5,grn,'исправляем одну строку и снова запускаем',{b:1})}</g>`;
      s+=`${tx(159,186,11,dim,'ищем ошибку — меняем только её, остальное не трогаем',{})}`;
      return s;
    }
    if(K==='checklist'){ /* проверь перед запуском */
      const it=(v.items||['понял, что должна делать программа','проверил порядок строк','проверил условие выхода из цикла','запустил на маленьком примере']);
      let s='';
      it.forEach((t,k)=>{
        const y=26+k*44;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="16" y="${y}" width="286" height="36" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-opacity=".45" stroke-width="1.6"/>`
          +`<rect x="28" y="${y+8}" width="20" height="20" rx="6" fill="rgba(125,224,160,.14)" stroke="${grn}" stroke-width="1.6"/>`
          +`<path d="M32 ${y+18} l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.6" stroke-dasharray="20" stroke-dashoffset="20">`
          +`<animate attributeName="stroke-dashoffset" values="20;0" dur=".4s" begin="${(0.6+k*0.35).toFixed(2)}s" fill="freeze"/></path>`
          +`${tx(62,y+22,Math.min(11.5,220/Math.max(1,t.length)/0.66),ink,t,{an:'start',b:1})}</g>`;
      });
      s+=`${tx(159,26+it.length*44+4,11,dim,'четыре проверки перед запуском программы',{})}`;
      return s;
    }
    if(K==='fixkit'){ /* набор инструментов отладчика */
      const tools=[
        {t:'печать', d:'видеть значения', ic:'num', c:grn},
        {t:'трассировка', d:'таблица по шагам', ic:'lines', c:blu},
        {t:'деление пополам', d:'сузить место', ic:'gear', c:gold},
        {t:'точка останова', d:'остановка и просмотр', ic:'quest', c:red}
      ];
      let s=`<path d="M126 34 h66 v-10 a8 8 0 0 0 -8 -8 h-50 a8 8 0 0 0 -8 8 z" fill="none" stroke="${A}" stroke-width="2.4" opacity=".7"/>`;
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="16" y="34" width="286" height="160" rx="14" fill="url(#${pre}card)" stroke="${A}" stroke-width="2.4"/>`
        +`<rect x="16" y="34" width="286" height="3.4" rx="1.7" fill="url(#${pre}bar)"/></g>`;
      tools.forEach((q,k)=>{
        const x=30+(k%2)*140, y=54+Math.floor(k/2)*68;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.2+0.16*k).toFixed(2)}s">`
          +`<rect x="${x}" y="${y}" width="126" height="56" rx="10" fill="rgba(15,25,46,.95)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<circle cx="${x+26}" cy="${y+28}" r="17" fill="${q.c}" opacity=".13" stroke="${q.c}" stroke-width="1.3"/>`
          +`${icon(q.ic,x+26,y+28,q.c,26)}`
          +`${tx(x+50,y+24,11,q.c,q.t,{an:'start',b:1})}`
          +`${tx(x+50,y+40,Math.min(9.5,66/(Math.max(1,q.d.length)*0.72)),dim,q.d,{an:'start'})}</g>`;
      });
      s+=`${tx(159,208,11,dim,'набор инструментов, которые помогают найти ошибку',{})}`;
      return s;
    }
    if(K==='guess'){ /* предскажи результат, потом проверь */
      const opts=v.opts||['шаги = 3','шаги = 4','шаги = 0'];
      const good=(v.ok===undefined?0:v.ok);
      const ln=(v.lines||['шаги = 0','пока шаги < 3:','    шаги = шаги + 1','вывести шаги']);
      let s=`<rect x="12" y="30" width="136" height="${ln.length*24+16}" rx="10" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".5" stroke-width="1.5"/>`;
      ln.forEach((t,k)=>{
        const y=40+k*24;
        s+=`<rect x="18" y="${y}" width="124" height="20" rx="5" fill="rgba(255,255,255,.04)"/>`
          +`<text x="26" y="${y+14}" font-size="10" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">${plain(t)}</text>`;
      });
      opts.forEach((t,k)=>{
        const y=44+k*46, on=(k===good);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.15).toFixed(2)}s">`
          +`<rect x="162" y="${y}" width="142" height="38" rx="10" fill="${on?'rgba(19,44,35,.8)':'rgba(15,25,46,.9)'}" stroke="${on?grn:cardB}" stroke-width="${on?2.2:1.6}"/>`
          +`<text x="233" y="${y+24}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${on?grn:'#8ea3c8'}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(t)}</text>`;
        if(on) s+=`<g opacity="0"><animate attributeName="opacity" values="0;1" dur=".4s" begin="1.8s" fill="freeze"/>`
          +`<circle class="${pre}Glow" cx="233" cy="${y+19}" r="26" fill="none" stroke="${grn}" stroke-width="2" opacity=".5"/>`
          +`<path d="M292 ${y+19} l5 6 l10 -13" fill="none" stroke="${grn}" stroke-width="2.6"/></g>`;
        s+=`</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:2.1s"><rect x="16" y="186" width="288" height="28" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(160,205,11,grn,v.note||'сначала предскажи ответ — потом проверь',{b:1})}</g>`;
      s+=`${tx(80,30+ln.length*24+16+4,10,dim,'программа',{})}`;
      return s;
    }
    if(K==='summary514'){ /* план отладки из пяти шагов */
      const st4=[{t:'пойми, что должно получиться',c:cyan},{t:'проверь на маленьком примере',c:blu},{t:'найди место: шаг за шагом или пополам',c:gold},{t:'посмотри значения переменных',c:grn},{t:'исправь одну строку и проверь снова',c:red}];
      let s=`<path d="M44 34 V${34+4*40}" stroke="${A}" stroke-width="2.4" opacity=".4" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      s+=`<circle r="5" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M44 34 V${34+4*40}"/></circle>`;
      st4.forEach((q,k)=>{
        const y=34+k*40;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<circle cx="44" cy="${y}" r="14" fill="rgba(10,18,36,.97)" stroke="${q.c}" stroke-width="2.2"/>`
          +`<text x="44" y="${y+5}" text-anchor="middle" font-size="13" font-weight="bold" fill="${q.c}" font-family="Georgia,serif">${k+1}</text>`
          +`<rect x="66" y="${y-15}" width="238" height="30" rx="9" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="1.7"/>`
          +`${tx(72,y+4,Math.min(11,222/Math.max(1,q.t.length)/0.66),q.c,q.t,{an:'start',b:1})}</g>`;
      });
      s+=`${tx(159,214,11,dim,'так ищут ошибку настоящие программисты',{})}`;
      return s;
    }
    if(K==='find'){ /* интерактив: найди строку с ошибкой */
      const ln=v.lines||[], sel=(st&&typeof st.find==='number')?st.find:-1, bad=(st&&typeof st.bad==='number')?st.bad:-1;
      const okI=ln.findIndex(x=>x.ok), done=(sel>=0 && sel===okI);
      let s=`<g class="${pre}Pop"><rect x="16" y="18" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,38,Math.min(12,240/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Нажми на строку с ошибкой',{b:1})}</g>`;
      ln.forEach((L,k)=>{
        const y=58+k*26, on=(done&&k===okI), isBad=(k===bad);
        const c=on?grn:(isBad?red:cyan);
        const bg=on?'rgba(19,44,35,.97)':(isBad?'rgba(52,22,26,.97)':'rgba(15,25,46,.97)');
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.08*k).toFixed(2)}s;cursor:pointer" onclick="infFind('${lk}',${k},${L.ok?1:0})">`
          +`<rect x="24" y="${y}" width="270" height="22" rx="5" fill="${bg}" stroke="${c}" stroke-width="${(on||isBad)?1.8:1}" stroke-opacity=".95"/>`
          +`${tx(38,y+15,10,'#5a6d96',''+(k+1),{})}`
          +`<text x="${54+(L.i?14:0)}" y="${y+15}" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${c}">${plain(L.t)}</text>`
          +(on?`<path d="M274 ${y+11} l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')
          +(isBad?`${tx(262,y+15,10.5,red,'нет',{})}`:'')
          +`</g>`;
      });
      const by=58+ln.length*26;
      const msg=done?(v.exp||'Верно — ошибка здесь.'):(bad>=0?'Здесь всё в порядке — ищи дальше':'Нажми на строку, где ошибка');
      const ml=wrapT(plain(msg),44).slice(0,3), mh=12+ml.length*15;
      s+=`<g class="${pre}Rise"><rect x="20" y="${by+8}" width="278" height="${mh}" rx="9" fill="${done?'rgba(125,224,160,.12)':'rgba(15,25,46,.95)'}" stroke="${done?grn:A}" stroke-width="1.7"/>`
        +ml.map((t,k)=>tx(159,by+26+k*15,Math.min(11.5,252/Math.max(1,t.length)/0.7),done?grn:dim,t,{b:done})).join('')+`</g>`;
      return s;
    }
    if(K==='manyvars'){ /* много переменных — неудобно */
      let s='';
      for(let k=0;k<6;k++){
        const x=18+(k%3)*98, y=32+Math.floor(k/3)*62;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.08*k).toFixed(2)}s"><rect x="${x}" y="${y}" width="88" height="48" rx="10" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.8"/>`
          +`<rect x="${x+8}" y="${y-9}" width="44" height="19" rx="6" fill="rgba(10,18,36,.97)" stroke="${red}" stroke-width="1.4"/>`
          +`${tx(x+30,y+5,10,red,'a'+(k+1),{b:1})}`
          +`<text x="${x+44}" y="${y+34}" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="#8ea3c8" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${3+k*2}</text></g>`;
      }
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="18" y="158" width="282" height="46" rx="11" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,178,12,red,'а если чисел сто?',{b:1})}`
        +`${tx(159,196,11,dim,'сто переменных — так делать нельзя',{})}</g>`;
      return s;
    }
    if(K==='train'){ /* список — поезд с вагонами */
      const vals=v.vals||[3,7,2,9];
      let s=`<g><animateTransform attributeName="transform" type="translate" values="0 0;8 0;8 0;0 0" keyTimes="0;.3;.7;1" dur="7s" repeatCount="indefinite"/>`;
      s+=`<line x1="10" y1="152" x2="308" y2="152" stroke="#31456f" stroke-width="2"/>`;
      s+=`<g class="${pre}Pop"><rect x="16" y="104" width="62" height="44" rx="8" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2.2"/>`
        +`<rect x="30" y="90" width="16" height="16" rx="4" fill="#33456e" stroke="${gold}" stroke-width="1.4"/></g>`
        +`<g class="${pre}Pop" style="animation-delay:.1s"><rect x="14" y="62" width="66" height="24" rx="8" fill="rgba(10,18,36,.97)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(47,79,12,gold,v.name||'числа',{b:1})}</g>`;
      vals.forEach((v2,k)=>{
        const x=86+k*56;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12+k*0.12).toFixed(2)}s">`
          +`<rect x="${x}" y="${104}" width="50" height="44" rx="8" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+25}" y="133" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
          +`${tx(x+25,96,11,gold,''+k,{b:1})}`
          +`<circle class="${pre}Spin" cx="${x+12}" cy="152" r="7" fill="#8fa3c8" stroke="#1a2340" stroke-width="1.2"/>`
          +`<circle class="${pre}Spin" cx="${x+38}" cy="152" r="7" fill="#8fa3c8" stroke="#1a2340" stroke-width="1.2"/></g>`;
      });
      s+=`<circle class="${pre}Spin" cx="47" cy="152" r="8" fill="#8fa3c8" stroke="#1a2340" stroke-width="1.2"/>`;
      s+=`</g>`;
      s+=`${tx(159,180,11.5,dim,'одно имя у всего поезда, а вагоны идут по порядку',{})}`;
      return s;
    }
    if(K==='cells'){ /* ячейки с индексами: список[2] */
      const vals=v.vals||[3,7,2,9], at=(v.at===undefined?2:v.at);
      let s=cellRow(pre,22,54,64,52,vals,{at:at,idx:1,ring:1});
      s+=`<path d="M${22+at*70+32} 40 V50" stroke="${grn}" stroke-width="2" class="${pre}Dash"/><path d="M${22+at*70+28} 30 h8 l-4 8 z" fill="${grn}"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s"><rect x="40" y="146" width="238" height="34" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>`
        +`<text x="159" y="169" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">${plain(v.name||'числа')}[${at}] = ${plain(vals[at])}</text></g>`;
      return s;
    }
    if(K==='index0'){ /* счёт с нуля */
      const vals=v.vals||[3,7,2];
      let s='';
      vals.forEach((v2,k)=>{
        const x=44+k*80;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.14*k).toFixed(2)}s">`
          +`<circle cx="${x+32}" cy="50" r="15" fill="${k===0?'rgba(255,120,100,.16)':'rgba(110,168,255,.14)'}" stroke="${k===0?red:blu}" stroke-width="2"/>`
          +`<text x="${x+32}" y="56" text-anchor="middle" font-size="16" font-weight="bold" fill="${k===0?red:blu}" font-family="Georgia,serif">${k}</text>`
          +`<path d="M${x+32} 66 V74" stroke="${k===0?red:blu}" stroke-width="1.8" class="${pre}Dash"/></g>`;
      });
      s+=cellRow(pre,44,76,64,50,vals,{at:0,c:red,idx:0});
      s+=`<text x="76" y="146" text-anchor="middle" font-size="10.5" fill="${red}" font-weight="bold" font-family="Arial">первый элемент</text>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="18" y="156" width="282" height="34" rx="10" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,178,11.5,red,'нумерация начинается с нуля, а не с единицы!',{b:1})}</g>`;
      return s;
    }
    if(K==='create'){ /* создаём список: числа = [3, 7, 2, 9] */
      const vals=v.vals||[3,7,2,9];
      let s=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="30" y="22" width="258" height="38" rx="10" fill="rgba(8,14,30,.95)" stroke="${A}" stroke-width="2"/>`
        +`<text x="159" y="47" text-anchor="middle" font-size="16" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">числа = [${vals.join(', ')}]</text></g>`;
      s+=cellRow(pre,22,124,64,50,vals,{idx:1});
      vals.forEach((v2,k)=>{
        const tx2=22+k*70+32;
        s+=`<circle r="9" fill="${gold}" opacity=".95"><animateMotion dur="3.6s" begin="${(0.5+k*0.35).toFixed(2)}s" repeatCount="indefinite" path="M${70+k*44} 62 Q${tx2} 90 ${tx2} 118"/></circle>`;
      });
      s+=`${tx(159,206,11,grn,'числа из скобок встают в ячейки по порядку',{b:1})}`;
      return s;
    }
    if(K==='length'){ /* длина списка */
      const vals=v.vals||[3,7,2,9];
      let s=cellRow(pre,22,44,64,52,vals,{idx:1});
      s+=`<path d="M22 116 v10 h286 v-10" fill="none" stroke="${gold}" stroke-width="2.2" opacity=".85"/>`;
      vals.forEach((v2,k)=>{
        s+=`<circle class="${pre}Spot" style="animation-delay:${(k*0.45).toFixed(2)}s;animation-duration:${(vals.length*0.45+1).toFixed(2)}s" cx="${22+k*70+32}" cy="70" r="30" fill="${gold}" opacity=".16"/>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="64" y="134" width="190" height="34" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`<text x="159" y="157" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">длина = ${vals.length}</text></g>`;
      s+=`${tx(159,186,11,dim,'длина — сколько ячеек в списке',{})}`;
      return s;
    }
    if(K==='walk'){ /* перебор циклом */
      const vals=v.vals||[3,7,2,9];
      let s=cellRow(pre,22,36,64,50,vals,{idx:1});
      vals.forEach((v2,k)=>{
        s+=`<rect x="${22+k*70}" y="36" width="64" height="50" rx="9" fill="${A}" opacity=".08"><animate attributeName="opacity" values="0.06;0.26;0.06" dur="${(vals.length*0.7+1).toFixed(2)}s" begin="${(k*0.7).toFixed(2)}s" repeatCount="indefinite"/></rect>`;
        s+=`<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.05;.2;.25;1" dur="${(vals.length*0.7+1).toFixed(2)}s" begin="${(k*0.7).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<rect x="240" y="104" width="64" height="26" rx="8" fill="rgba(15,25,46,.97)" stroke="${A}" stroke-width="1.6"/>`
          +`${tx(272,121,11.5,A,'i = '+k,{b:1})}</g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.3s"><rect x="18" y="110" width="212" height="52" rx="10" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".5" stroke-width="1.5"/>`
        +`<text x="30" y="132" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">пока i &lt; длина:</text>`
        +`<text x="30" y="150" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">    смотри числа[i]</text></g>`;
      s+=`${tx(159,182,11,dim,'цикл по очереди заглядывает в каждую ячейку',{})}`;
      return s;
    }
    if(K==='sumlist'){ /* сумма всех чисел */
      const vals=v.vals||[3,7,2,9], acc=[], tot=[];
      let run=0; vals.forEach(x=>{ run+=Number(plain(x))||0; tot.push(run); });
      let s=cellRow(pre,22,30,64,46,vals,{idx:1});
      s+=`<path d="M34 100 L70 172 H174 L210 100 z" fill="rgba(126,168,255,.12)" stroke="${blu}" stroke-width="2.2" opacity=".9"/>`;
      vals.forEach((v2,k)=>{
        s+=`<circle r="9" fill="${gold}" opacity=".95"><animateMotion dur="4s" begin="${(0.4+k*0.6).toFixed(2)}s" repeatCount="indefinite" path="M${22+k*70+32} 80 Q${90+k*20} 110 122 166"/></circle>`;
      });
      s+=`<rect x="78" y="120" width="88" height="30" rx="9" fill="rgba(8,14,30,.95)" stroke="${blu}" stroke-width="1.8"/><text x="122" y="141" text-anchor="middle" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">сумма</text>`;
      tot.forEach((t,k)=>{
        s+=`<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.2;.26;1" dur="4s" begin="${(0.9+k*0.6).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<rect x="224" y="120" width="76" height="30" rx="9" fill="rgba(19,44,35,.97)" stroke="${grn}" stroke-width="1.8"/>`
          +`<text x="262" y="141" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="${grn}">${t}</text></g>`;
      });
      s+=`${tx(159,196,11,grn,'числа по очереди падают в сумму, счётчик растёт',{b:1})}`;
      return s;
    }
    if(K==='maxlist'){ /* поиск самого большого */
      const vals=v.vals||[3,7,2,9];
      let s=cellRow(pre,22,50,64,50,vals,{idx:1});
      vals.forEach((v2,k)=>{
        s+=`<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.05;.3;.35;1" dur="4.5s" begin="${(0.4+k*1.05).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<circle cx="${22+k*70+32}" cy="50" r="14" fill="rgba(255,215,106,.2)" stroke="${gold}" stroke-width="2"/>`
          +`<text x="${22+k*70+32}" y="55" text-anchor="middle" font-size="14" font-weight="bold" fill="${gold}">★</text></g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.3s"><rect x="18" y="120" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,140,11.5,gold,'чемпион пока в первой ячейке: 3',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="18" y="158" width="282" height="30" rx="9" fill="rgba(19,44,35,.9)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,178,11.5,grn,'7 больше 3 → чемпион переехал; 9 больше 7 → снова',{b:1})}</g>`;
      return s;
    }
    if(K==='findlist'){ /* ищем число в списке */
      const vals=v.vals||[3,7,2,9], target=(v.target===undefined?2:v.target);
      const ti=vals.map(plain).indexOf(plain(target));
      let s=cellRow(pre,22,60,64,50,vals,{idx:1,at:(ti<0?-1:ti),c:grn,ring:1});
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.6;.75;1" dur="3.2s" repeatCount="indefinite"/>`
        +`<path d="M${22+ti*70+32} 46 l8 9 l16 -20" fill="none" stroke="${grn}" stroke-width="3"/></g>`;
      s+=`<g><circle r="7" fill="none" stroke="${cyan}" stroke-width="2.4"/><path d="M0 0 l-9 9" stroke="${cyan}" stroke-width="3"/>`
        +`<animateMotion dur="3.2s" repeatCount="indefinite" path="M${22+32} 122 H${22+ti*70+32}"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s"><rect x="18" y="140" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.7"/>`
        +`${tx(159,160,11.5,cyan,'ищем ' + plain(target) + ' … нашли в ячейке ' + ti + '!',{b:1})}</g>`;
      s+=`${tx(159,190,11,dim,'лупа идёт по ячейкам, пока число не найдётся',{})}`;
      return s;
    }
    if(K==='append'){ /* добавляем в конец */
      const vals=v.vals||[3,7,2,9], add2=(v.add===undefined?5:v.add);
      let s=cellRow(pre,19,54,52,50,vals,{idx:1});
      s+=`<g class="${pre}Rise" style="animation-delay:.45s"><rect x="247" y="54" width="52" height="50" rx="9" fill="rgba(19,44,35,.97)" stroke="${grn}" stroke-width="2.4"/>`
        +`<rect class="${pre}Glow" x="244" y="51" width="58" height="56" rx="12" fill="none" stroke="${grn}" stroke-width="2" opacity=".45"/>`
        +`<text x="273" y="86" text-anchor="middle" font-size="18" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(add2)}</text>`
        +`${tx(273,120,10.5,grn,'4',{b:1})}</g>`;
      s+=`<path d="M250 44 h46 m-6 -5 l6 5 l-6 5" stroke="${A}" stroke-width="1.8" fill="none" opacity=".8"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="20" y="140" width="278" height="30" rx="9" fill="rgba(19,44,35,.85)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,160,11.5,grn,'добавили в конец — длина стала 5',{b:1})}</g>`;
      s+=`${tx(159,190,11,dim,'новое значение всегда встаёт последним',{})}`;
      return s;
    }
    if(K==='outofrange'){ /* выход за границы */
      const vals=v.vals||[3,7,2,9];
      let s=cellRow(pre,19,54,52,50,vals,{idx:1});
      s+=`<g class="${pre}Pop" style="animation-delay:.4s"><rect x="247" y="54" width="52" height="50" rx="9" fill="rgba(52,22,26,.7)" stroke="${red}" stroke-width="2.4" stroke-dasharray="6 5"/>`
        +`<text x="273" y="88" text-anchor="middle" font-size="20" font-weight="bold" fill="${red}">?</text>`
        +`${tx(273,120,10.5,red,'4',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="18" y="140" width="282" height="52" rx="10" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.9"/>`
        +`<text x="159" y="162" text-anchor="middle" font-size="13.5" font-family="'Courier New',monospace" font-weight="bold" fill="${red}">числа[4] — такой ячейки нет</text>`
        +`${tx(159,182,11,red,'длина 4, значит последний индекс 3',{})}</g>`;
      return s;
    }
    if(K==='marks'){ /* список команд робота */
      const cmds=v.cmds||['вперёд','вперёд','вправо','вперёд'];
      let s=`<rect x="12" y="26" width="140" height="${cmds.length*28+22}" rx="10" fill="rgba(8,14,30,.92)" stroke="${A}" stroke-opacity=".5" stroke-width="1.5"/>`
        +`${tx(82,44,10.5,dim,'список команд',{})}`;
      cmds.forEach((t,k)=>{
        const y=54+k*28;
        s+=`<rect x="18" y="${y}" width="128" height="24" rx="6" fill="rgba(255,255,255,.04)" stroke="#2b3c62" stroke-width="1"/>`
          +`<rect x="18" y="${y}" width="128" height="24" rx="6" fill="${A}" opacity=".1"><animate attributeName="opacity" values="0.06;0.3;0.06" dur="${(cmds.length*0.9+1).toFixed(2)}s" begin="${(k*0.9).toFixed(2)}s" repeatCount="indefinite"/></rect>`
          +`<text x="28" y="${y+16}" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${k%2?gold:cyan}">${plain(t)}</text>`
          +`${tx(138,y+16,10,dim,''+k,{})}`;
      });
      s+=`<rect x="166" y="26" width="140" height="140" rx="10" fill="rgba(126,168,255,.07)" stroke="${A}" stroke-opacity=".5" stroke-width="1.5"/>`;
      for(let r=0;r<4;r++)for(let c=0;c<4;c++){
        s+=`<rect x="${174+c*32}" y="${36+r*32}" width="32" height="32" fill="${((r+c)%2)?'rgba(255,255,255,.05)':'rgba(255,255,255,.02)'}" stroke="#31456f" stroke-width="1"/>`;
      }
      s+=`<g><circle r="11" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"/><circle cx="-3.4" cy="-3" r="2.4" fill="#1a2340"/><circle cx="3.4" cy="-3" r="2.4" fill="#1a2340"/>`
        +`<animateMotion dur="3.6s" repeatCount="indefinite" path="M190 148 V116 V84 L222 84 V52"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="166" y="176" width="140" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
        +`${tx(236,196,10.5,ink,'робот идёт по списку',{})}</g>`;
      return s;
    }
    if(K==='findcell'){ /* интерактив: нажми на ячейку с нужным индексом */
      const vals=v.vals||[3,7,2,9], need=(v.need===undefined?2:v.need);
      const sel=(st&&typeof st.find==='number')?st.find:-1, bad2=(st&&typeof st.bad==='number')?st.bad:-1;
      const done=(sel===need);
      let s=`<g class="${pre}Pop"><rect x="16" y="18" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,38,Math.min(12,246/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Нажми на ячейку с нужным индексом',{b:1})}</g>`;
      vals.forEach((v2,k)=>{
        const x=22+k*70, on=(done&&k===need), isB=(k===bad2);
        const c=on?grn:(isB?red:blu);
        const bg=on?'rgba(19,44,35,.97)':(isB?'rgba(52,22,26,.97)':'rgba(15,25,46,.97)');
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s;cursor:pointer" onclick="infCell('${lk}',${k},${k===need?1:0})">`
          +`<rect x="${x}" y="60" width="64" height="54" rx="10" fill="${bg}" stroke="${c}" stroke-width="${(on||isB)?2.6:1.8}"/>`
          +`<text x="${x+32}" y="96" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${on?grn:(isB?red:ink)}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
          +`${tx(x+32,132,12,on?grn:(isB?red:dim),''+k,{b:1})}`
          +(on?`<path d="M${x+8} 72 l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')
          +(isB?`${tx(x+32,152,10.5,red,'это индекс '+k,{})}`:'')
          +`</g>`;
      });
      const msg=done?(v.exp||'Верно! Это ячейка с этим индексом.'):(bad2>=0?'Не угадал: смотри на номер под ячейкой':'Нажми на ячейку, у которой такой номер');
      s+=`<g class="${pre}Rise"><rect x="20" y="168" width="278" height="30" rx="9" fill="${done?'rgba(125,224,160,.12)':'rgba(15,25,46,.95)'}" stroke="${done?grn:A}" stroke-width="1.7"/>`
        +`${tx(159,188,Math.min(11.5,252/Math.max(1,msg.length)/0.7),done?grn:dim,msg,{b:done})}</g>`;
      return s;
    }
    if(K==='disorder'){ /* числа стоят вразнобой */
      const vals=v.vals||[7,2,9,3,1];
      const w=52, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s=`<g class="${pre}Pop"><rect x="30" y="18" width="258" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,38,13,gold,'как навести порядок?',{b:1})}</g>`;
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s"><g>`
          +`<animateTransform attributeName="transform" type="translate" values="0 0;2 -4;-3 3;0 0" dur="${(2.4+k*0.3).toFixed(2)}s" begin="${(k*0.2).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<rect x="${x}" y="70" width="${w}" height="54" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="104" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text></g></g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="22" y="146" width="274" height="30" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,166,11.5,red,'так числа искать долго и неудобно',{b:1})}</g>`;
      return s;
    }
    if(K==='order'){ /* карточки сами встают по порядку */
      const init=v.vals||[7,2,9,3,1], fin=init.slice().sort((a,b)=>a-b);
      const w=52, gap=6, tot=fin.length*w+(fin.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s=`<g class="${pre}Pop"><rect x="24" y="18" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>`
        +`${tx(159,38,12.5,grn,'по порядку — от меньшего к большему',{b:1})}</g>`;
      fin.forEach((v2,k)=>{
        const x=x0+k*(w+gap), from=init.indexOf(v2)* (w+gap);
        s+=`<g><animateTransform attributeName="transform" type="translate" values="${(from-(k*(w+gap))).toFixed(0)} -30;0 0;0 0" keyTimes="0;.6;1" dur="3s" begin="${(k*0.25).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<rect x="${x}" y="70" width="${w}" height="54" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="104" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
          +`<path d="M${x+w/2} 130 l5 6 l9 -12" fill="none" stroke="${grn}" stroke-width="2.4" opacity=".8"/></g>`;
      });
      s+=`${tx(159,166,11.5,dim,'каждое число встало на своё место',{})}`;
      return s;
    }
    if(K==='scale'){ /* весы: сравнение двух чисел */
      const a=(v.a===undefined?7:v.a), b=(v.b===undefined?2:v.b);
      let s=`<path d="M159 44 V150" stroke="#41558a" stroke-width="4"/>`;
      s+=`<path d="M120 150 h78" stroke="#41558a" stroke-width="5" stroke-linecap="round"/>`;
      s+=`<g><animateTransform attributeName="transform" type="rotate" values="0 159 44;-9 159 44;-9 159 44;0 159 44" keyTimes="0;.25;.85;1" dur="5s" repeatCount="indefinite"/>`
        +`<path d="M74 44 H244" stroke="${gold}" stroke-width="4" stroke-linecap="round"/>`
        +`<circle cx="159" cy="44" r="7" fill="${gold}"/>`;
      [[74,a,'левое'],[244,b,'правое']].forEach((q,k)=>{
        const c=k===0?blu:pur;
        s+=`<path d="M${q[0]} 44 V74" stroke="#41558a" stroke-width="2"/>`
          +`<path d="M${q[0]-26} 74 H${q[0]+26} L${q[0]+16} 106 H${q[0]-16} z" fill="rgba(126,168,255,.14)" stroke="${c}" stroke-width="2"/>`
          +`<text x="${q[0]}" y="96" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${c}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(q[1])}</text>`;
      });
      s+=`</g>`;
      s+=`${tx(159,124,10.5,dim,'сравниваем два числа',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="150" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,170,11.5,grn,'7 больше 2 — значит большее идёт правее',{b:1})}</g>`;
      return s;
    }
    if(K==='swap2'){ /* обмен двух чисел местами */
      const a=(v.a===undefined?7:v.a), b=(v.b===undefined?2:v.b);
      const card=(x,y,val,c)=>`<rect x="${x}" y="${y}" width="54" height="46" rx="10" fill="url(#${pre}card)" stroke="${c}" stroke-width="2.2"/>`
        +`<text x="${x+27}" y="${y+31}" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${c}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(val)}</text>`;
      let s=`${tx(88,34,11,dim,'было',{b:1})}${card(61,42,a,red)}${card(161,42,b,blu)}`;
      s+=`<path d="M121 52 C140 30, 156 30, 175 50" fill="none" stroke="${gold}" stroke-width="2.4" class="${pre}Dash"/>`
        +`<path d="M171 42 l6 9 l-10 1" fill="none" stroke="${gold}" stroke-width="2.4"/>`
        +`<path d="M175 76 C156 98, 140 98, 121 78" fill="none" stroke="${gold}" stroke-width="2.4" class="${pre}Dash"/>`
        +`<path d="M125 86 l-6 -9 l10 -1" fill="none" stroke="${gold}" stroke-width="2.4"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s">${tx(230,34,11,grn,'стало',{b:1})}${card(203,42,b,grn)}${card(103,42,a,grn)}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="40" y="116" width="238" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,136,11.5,grn,'поменяли местами — стало по порядку',{b:1})}</g>`;
      return s;
    }
    if(K==='bubble'){ /* большое число всплывает вправо */
      const vals=v.vals||[2,3,1,7,9];
      const w=46, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s"><rect x="${x}" y="112" width="${w}" height="46" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="142" text-anchor="middle" font-size="19" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text></g>`;
      });
      s+=`<g><circle r="17" fill="rgba(255,215,106,.2)" stroke="${gold}" stroke-width="2.4"/>`
        +`<text y="6" text-anchor="middle" font-size="18" font-family="Georgia,serif" font-weight="bold" fill="${gold}">9</text>`
        +`<animateMotion dur="3.4s" repeatCount="indefinite" path="M${x0+4*(w+gap)+w/2} 100 Q159 30 ${x0+4*(w+gap)+w/2} 100"/></g>`;
      s+=`${tx(159,176,11.5,gold,'самое большое число «всплывает» в конец',{b:1})}`;
      s+=`${tx(159,194,11,dim,'как пузырёк в воде — так работает пузырьковая сортировка',{})}`;
      return s;
    }
    if(K==='pass'){ /* один проход: сравниваем пары */
      const vals=v.vals||[2,7,3,1,9];
      const w=52, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<rect x="${x}" y="74" width="${w}" height="50" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="107" text-anchor="middle" font-size="21" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`;
      });
      for(let k=0;k<vals.length-1;k++){
        const x=x0+k*(w+gap);
        s+=`<rect x="${x-3}" y="71" width="${2*w+gap+6}" height="56" rx="12" fill="${A}" opacity=".1">`
          +`<animate attributeName="opacity" values="0.08;0.28;0.08;0.08" keyTimes="0;.3;.6;1" dur="${((vals.length-1)*0.55+1).toFixed(2)}s" begin="${(k*0.55).toFixed(2)}s" repeatCount="indefinite"/></rect>`;
      }
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.75;.85;1" dur="3.6s" repeatCount="indefinite"/>`
        +`<rect x="${x0+(vals.length-1)*(w+gap)-4}" y="70" width="${w+8}" height="58" rx="13" fill="none" stroke="${gold}" stroke-width="2.6"/>`
        +`${tx(x0+(vals.length-1)*(w+gap)+w/2,66,10.5,gold,'на месте',{b:1})}</g>`;
      s+=`${tx(159,146,11.5,dim,'идём слева направо и сравниваем соседей',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="22" y="158" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,178,11.5,gold,'самое большое встало в конец — оно на месте',{b:1})}</g>`;
      return s;
    }
    if(K==='passes'){ /* проходы: ряд становится по порядку */
      const rows=v.rows||[[2,7,3,1,9],[2,3,1,7,9],[2,1,3,7,9],[1,2,3,7,9]];
      const w=40, gap=5, tot=5*w+4*gap, x0=20;
      let s='';
      rows.forEach((r,k)=>{
        const y=26+k*42;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.2+k*0.3).toFixed(2)}s">`;
        r.forEach((v2,j)=>{
          const x=x0+j*(w+gap), done=(v2===r.slice().sort((p,q)=>p-q)[j]);
          s+=`<rect x="${x}" y="${y}" width="${w}" height="34" rx="8" fill="rgba(15,25,46,.97)" stroke="${done?grn:'#6ea8ff'}" stroke-width="${done?2:1.6}"/>`
            +`<text x="${x+w/2}" y="${y+23}" text-anchor="middle" font-size="16" font-family="Georgia,serif" font-weight="bold" fill="${done?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(v2)}</text>`;
        });
        s+=`<rect x="248" y="${y+4}" width="52" height="26" rx="8" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.5"/>`
          +`${tx(274,y+22,10.5,gold,'проход '+(k+1),{b:1})}</g>`;
      });
      s+=`${tx(159,26+rows.length*42+2,11,dim,'с каждым проходом порядок становится лучше',{})}`;
      return s;
    }
    if(K==='minscan'){ /* сканер ищет самое маленькое */
      const vals=v.vals||[7,2,9,3,1];
      const w=52, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<rect x="${x}" y="84" width="${w}" height="50" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="117" text-anchor="middle" font-size="21" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`;
      });
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.08;.28;.36;1" dur="4.4s" repeatCount="indefinite"/>`
        +`<rect x="${x0-3}" y="81" width="${w+6}" height="56" rx="12" fill="none" stroke="${gold}" stroke-width="2.6"/>${tx(x0+w/2,72,10,gold,'минимум',{b:1})}</g>`;
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;.5;.58;.85;.93;1" dur="4.4s" repeatCount="indefinite"/>`
        +`<rect x="${x0+4*(w+gap)-3}" y="81" width="${w+6}" height="56" rx="12" fill="none" stroke="${grn}" stroke-width="2.6"/>${tx(x0+4*(w+gap)+w/2,72,10,grn,'новый',{b:1})}</g>`;
      s+=`<rect x="${x0-6}" y="52" width="${w+12}" height="80" rx="14" fill="none" stroke="${cyan}" stroke-width="2" opacity=".65">`
        +`<animateMotion dur="4.4s" repeatCount="indefinite" path="M0 0 H${(4*(w+gap))}"/></rect>`;
      s+=`${tx(159,158,11.5,cyan,'сканер запоминает самое маленькое',{b:1})}`;
      return s;
    }
    if(K==='minmove'){ /* минимум переезжает в начало */
      const vals=v.vals||[2,7,9,3,1];
      const w=46, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap), isMin=(v2===1);
        s+=`<rect x="${x}" y="80" width="${w}" height="46" rx="10" fill="url(#${pre}card)" stroke="${isMin?red:'#6ea8ff'}" stroke-width="${isMin?2.4:1.8}"/>`
          +`<text x="${x+w/2}" y="110" text-anchor="middle" font-size="19" font-family="Georgia,serif" font-weight="bold" fill="${isMin?red:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`;
      });
      s+=`<g><circle r="14" fill="rgba(125,224,160,.22)" stroke="${grn}" stroke-width="2.2"/>`
        +`<text y="6" text-anchor="middle" font-size="17" font-family="Georgia,serif" font-weight="bold" fill="${grn}">1</text>`
        +`<animateMotion dur="3.6s" repeatCount="indefinite" path="M${x0+4*(w+gap)+w/2} 74 Q159 22 ${x0+w/2} 74"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.45s">`;
      [1,2,7,9,3].forEach((v2,k)=>{
        const x=x0+k*(w+gap), first=(k===0);
        s+=`<rect x="${x}" y="128" width="${w}" height="42" rx="10" fill="rgba(19,44,35,.9)" stroke="${first?grn:'#6ea8ff'}" stroke-width="${first?2.4:1.6}"/>`
          +`<text x="${x+w/2}" y="155" text-anchor="middle" font-size="17" font-family="Georgia,serif" font-weight="bold" fill="${first?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(v2)}</text>`;
      });
      s+=`</g>`;
      s+=`${tx(159,190,11.5,grn,'самое маленькое встало в начало ряда',{b:1})}`;
      return s;
    }
    if(K==='sortedok'){ /* ряд отсортирован */
      const vals=v.vals||[1,2,3,7,9];
      const w=52, gap=6, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="${x}" y="76" width="${w}" height="50" rx="10" fill="rgba(19,44,35,.9)" stroke="${grn}" stroke-width="2.2"/>`
          +`<text x="${x+w/2}" y="109" text-anchor="middle" font-size="21" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
          +`<path d="M${x+w/2-11} 56 l5 6 l11 -13" fill="none" stroke="${grn}" stroke-width="2.6"/></g>`;
        if(k<vals.length-1) s+=`<path d="M${x+w+1} 101 h${gap-2}" stroke="${grn}" stroke-width="2" opacity=".6"/>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.7s"><rect x="30" y="142" width="258" height="30" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,162,12,grn,'ряд отсортирован!',{b:1})}</g>`;
      s+=`${tx(159,188,11,dim,'каждое число не больше следующего',{})}`;
      return s;
    }
    if(K==='neighbors'){ /* проверяем соседей */
      const vals=v.vals||[2,3,7,9,12];
      const w=46, gap=14, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap);
        s+=`<rect x="${x}" y="60" width="${w}" height="46" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
          +`<text x="${x+w/2}" y="90" text-anchor="middle" font-size="19" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`;
        if(k<vals.length-1){
          const mx=x+w+gap/2;
          s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.25).toFixed(2)}s"><text x="${mx}" y="90" text-anchor="middle" font-size="15" font-weight="bold" fill="${grn}">≤</text>`
            +`<circle cx="${mx}" cy="108" r="6" fill="none" stroke="${grn}" stroke-width="1.8"/><path d="M${mx-2} 108 l2 3 l4 -5" fill="none" stroke="${grn}" stroke-width="1.6"/></g>`;
        }
      });
      s+=`${tx(159,138,11.5,dim,'проверяем каждую пару соседей',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.8s"><rect x="24" y="150" width="270" height="30" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,170,11.5,grn,'все пары в порядке — ряд отсортирован',{b:1})}</g>`;
      return s;
    }
    if(K==='why'){ /* зачем сортировать */
      let s=`<rect x="12" y="28" width="146" height="122" rx="11" fill="rgba(19,44,35,.5)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(85,46,10.5,grn,'по порядку',{b:1})}`
        +`<rect x="160" y="28" width="146" height="122" rx="11" fill="rgba(52,22,26,.5)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(233,46,10.5,red,'вразнобой',{b:1})}`;
      const drawer=(x,y,val,hit,c)=>`<rect x="${x}" y="${y}" width="34" height="22" rx="5" fill="${hit?'rgba(125,224,160,.2)':'rgba(15,25,46,.95)'}" stroke="${hit?grn:'#3a4c78'}" stroke-width="${hit?2:1.3}"/>`
        +`<text x="${x+17}" y="${y+15}" text-anchor="middle" font-size="11" font-weight="bold" fill="${hit?grn:'#8ea3c8'}">${val}</text>`;
      [1,2,3,4,5].forEach((n2,k)=>{ s+=drawer(20+k*26,58,n2,n2===3,grn); });
      s+=`<circle class="${pre}Pop" cx="89" cy="69" r="13" fill="none" stroke="${grn}" stroke-width="2.2"/>`
        +`${tx(85,100,10.5,grn,'нашли за 1 шаг',{b:1})}`;
      [7,1,9,3,5].forEach((n2,k)=>{ s+=drawer(168+k*26,58,n2,n2===3,red); });
      s+=`${tx(233,100,10.5,red,'перебрали все 5',{b:1})}`;
      s+=`${tx(85,126,10,dim,'сразу видно, где искать',{})}${tx(233,126,10,dim,'приходится смотреть всё',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="20" y="156" width="278" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,175,11.5,gold,'в отсортированном ряду искать быстрее',{b:1})}</g>`;
      return s;
    }
    if(K==='countcmp'){ /* сколько сравнений нужно */
      const rows=v.rows||[[3,3],[4,6],[5,10],[10,45]];
      let s=`<g class="${pre}Pop"><rect x="70" y="20" width="178" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,39,11.5,ink,'чисел · сравнений',{b:1})}</g>`;
      rows.forEach((r,k)=>{
        const y=58+k*32, bw=Math.round(r[1]*3.4);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.15+k*0.15).toFixed(2)}s">`
          +`<circle cx="46" cy="${y+12}" r="12" fill="rgba(110,168,255,.14)" stroke="${blu}" stroke-width="1.5"/>`
          +`<text x="46" y="${y+17}" text-anchor="middle" font-size="13" font-weight="bold" fill="${blu}" font-family="Georgia,serif">${r[0]}</text>`
          +`<rect x="66" y="${y}" width="${Math.min(bw,180)}" height="24" rx="7" fill="${A}" opacity=".22" stroke="${A}" stroke-width="1.2"/>`
          +`<text x="76" y="${y+17}" font-size="11.5" font-weight="bold" fill="${ink}">${r[1]} сравнений</text></g>`;
      });
      s+=`${tx(159,58+rows.length*32+10,11,dim,'чем больше чисел, тем больше сравнений',{})}`;
      return s;
    }
    if(K==='sortgame'){ /* интерактив: меняем соседей местами, пока ряд не встанет по порядку */
      const start=v.vals||[7,2,9,3,1];
      const arr=(st&&st.arr&&st.arr.length)?st.arr:start;
      const tgt=start.slice().sort((a,b)=>a-b);
      const isSorted=arr.every((x,i)=>i===0||arr[i-1]<=x);
      const moves=(st&&st.moves)||0;
      const w=52, gap=6, tot=arr.length*w+(arr.length-1)*gap, x0=Math.round((CW-tot)/2);
      let s=`<g class="${pre}Pop"><rect x="16" y="18" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,38,Math.min(12,246/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Нажми на число, чтобы поменять его с соседом справа',{b:1})}</g>`;
      arr.forEach((v2,k)=>{
        const x=x0+k*(w+gap), inPlace=(v2===tgt[k]);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.06*k).toFixed(2)}s;cursor:pointer" onclick="infSwap('${lk}',${k},0)">`
          +`<rect x="${x}" y="70" width="${w}" height="52" rx="10" fill="${inPlace?'rgba(19,44,35,.97)':'rgba(15,25,46,.97)'}" stroke="${inPlace?grn:A}" stroke-width="${inPlace?2.4:2}"/>`
          +`<text x="${x+w/2}" y="104" text-anchor="middle" font-size="22" font-family="Georgia,serif" font-weight="bold" fill="${inPlace?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.5">${plain(v2)}</text>`
          +`${tx(x+w/2,138,10.5,dim,''+k,{})}</g>`;
      });
      for(let k=0;k<arr.length-1;k++){
        const x=x0+k*(w+gap);
        s+=`<path d="M${x+w} 96 h${gap}" stroke="${A}" stroke-width="1.6" opacity=".5"/>`;
      }
      s+=`<rect x="96" y="152" width="126" height="28" rx="9" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,171,11.5,gold,'обменов: '+moves,{b:1})}`;
      if(isSorted) s+=`<g class="${pre}Pop"><rect x="30" y="190" width="258" height="30" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,210,12,grn,'Отсортировано! Обменов: '+moves,{b:1})}</g>`;
      else s+=`<g class="${pre}Rise"><rect x="30" y="190" width="258" height="30" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,210,11,dim,'нажимай числа, пока ряд не встанет по порядку',{})}</g>`;
      return s;
    }
    if(K==='findtask'){ /* задача: найти число в ряду */
      const vals=v.vals||[3,7,2,9,5,1,8,4,6];
      const w=40, gap=6;
      let s=`<g class="${pre}Pop"><rect x="60" y="16" width="198" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,36,13,gold,'где здесь число 8?',{b:1})}</g>`;
      const row=(arr,y)=>{ const tot=arr.length*w+(arr.length-1)*gap, x0=Math.round((CW-tot)/2);
        return arr.map((v2,k)=>`<rect x="${x0+k*(w+gap)}" y="${y}" width="${w}" height="38" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
          +`<text x="${x0+k*(w+gap)+w/2}" y="${y+26}" text-anchor="middle" font-size="18" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.2">${plain(v2)}</text>`).join(''); };
      s+=`<g class="${pre}Slide" style="animation-delay:.15s">${row(vals.slice(0,5),60)}</g>`;
      s+=`<g class="${pre}Slide" style="animation-delay:.3s">${row(vals.slice(5),112)}</g>`;
      s+=`<g class="${pre}Float"><circle cx="86" cy="86" r="15" fill="rgba(126,168,255,.12)" stroke="${cyan}" stroke-width="2.4"/>`
        +`<circle cx="86" cy="86" r="9" fill="none" stroke="${cyan}" stroke-width="2"/><path d="M92 92 l8 8" stroke="${cyan}" stroke-width="3"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.45s"><rect x="30" y="162" width="258" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,181,11,dim,'как найти его быстрее всего?',{})}</g>`;
      return s;
    }
    if(K==='linear'){ /* линейный поиск: по очереди */
      const vals=v.vals||[3,7,2,9,5,1,8,4,6], tgt=(v.target===undefined?8:v.target);
      const w=29, gap=4, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2), ti=vals.map(plain).indexOf(plain(tgt));
      let s='';
      vals.forEach((v2,k)=>{
        s+=`<rect x="${x0+k*(w+gap)}" y="60" width="${w}" height="44" rx="8" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
          +`<text x="${x0+k*(w+gap)+w/2}" y="89" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(v2)}</text>`
          +`<rect x="${x0+k*(w+gap)-2}" y="58" width="${w+4}" height="48" rx="10" fill="${cyan}" opacity="0">`
          +`<animate attributeName="opacity" values="0;0.28;0.28;0" keyTimes="0;.04;.16;.22" dur="4.4s" begin="${(0.3+k*0.5).toFixed(2)}s" repeatCount="indefinite"/></rect>`;
      });
      s+=`<g class="${pre}Pop" style="animation-delay:.4s"><rect x="${x0+ti*(w+gap)-3}" y="57" width="${w+6}" height="50" rx="11" fill="none" stroke="${grn}" stroke-width="2.4" opacity="0">`
        +`<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.6;.7;1" dur="4.4s" repeatCount="indefinite"/></rect></g>`;
      s+=`<g><circle r="11" fill="none" stroke="${cyan}" stroke-width="2.6"/><path d="M5 5 l7 7" stroke="${cyan}" stroke-width="3"/>`
        +`<animateMotion dur="4.4s" repeatCount="indefinite" path="M${x0+w/2} 120 H${x0+ti*(w+gap)+w/2}"/></g>`;
      for(let k=0;k<4;k++){
        s+=`<g opacity="0"><animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.2;.26;1" dur="4.4s" begin="${(0.3+k*0.5).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<rect x="96" y="136" width="126" height="28" rx="9" fill="rgba(15,25,46,.97)" stroke="${cyan}" stroke-width="1.6"/>`
          +`${tx(159,155,11.5,cyan,'проверок: '+(k+1),{b:1})}</g>`;
      }
      s+=`${tx(159,182,11,dim,'смотрим числа по очереди, слева направо',{})}`;
      return s;
    }
    if(K==='linearBad'){ /* сто чисел — сто проверок */
      let s=`<g class="${pre}Pop"><rect x="30" y="18" width="258" height="28" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,37,12,red,'а если чисел сто?',{b:1})}</g>`;
      for(let k=0;k<20;k++){
        s+=`<rect x="${20+k*14}" y="62" width="12" height="30" rx="3" fill="${k<9?'rgba(126,168,255,.18)':'rgba(255,255,255,.05)'}" stroke="${k<9?A:'#31456f'}" stroke-width="1"/>`;
      }
      s+=`${tx(159,110,12,A,'…',{b:1})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s"><rect x="66" y="126" width="186" height="30" rx="9" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,146,12,red,'до 100 проверок',{b:1})}</g>`;
      s+=`${tx(159,174,11,dim,'и это только чтобы найти одно число',{})}`;
      return s;
    }
    if(K==='sortedRow'){ /* в порядке есть подсказка: середина */
      const vals=v.vals||[1,2,3,4,5,6,7,8,9];
      const w=29, gap=4, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2), mid=Math.floor(vals.length/2);
      let s='';
      s+=`<path d="M${x0} 50 H${x0+mid*(w+gap)-2}" stroke="${blu}" stroke-width="2" opacity=".8"/>`
        +`${tx(x0+(mid*(w+gap)-2)/2,44,10,blu,'здесь меньше',{b:1})}`
        +`<path d="M${x0+(mid+1)*(w+gap)+2} 50 H${x0+tot}" stroke="${grn}" stroke-width="2" opacity=".8"/>`
        +`${tx(x0+(mid+1)*(w+gap)+2+(tot-(mid+1)*(w+gap)-2)/2,44,10,grn,'здесь больше',{b:1})}`;
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap), on=(k===mid);
        s+=`<rect x="${x}" y="60" width="${w}" height="44" rx="8" fill="${on?'rgba(255,215,106,.16)':'url(#'+pre+'card)'}" stroke="${on?gold:A}" stroke-width="${on?2.4:1.6}"/>`
          +`<text x="${x+w/2}" y="89" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${on?gold:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(v2)}</text>`;
      });
      s+=`<path d="M${x0+mid*(w+gap)+w/2} 54 v-8" stroke="${gold}" stroke-width="2" class="${pre}Dash"/><path d="M${x0+mid*(w+gap)+w/2-5} 40 h10 l-5 8 z" fill="${gold}"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="124" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,144,12,gold,'середина — наша подсказка',{b:1})}</g>`;
      s+=`${tx(159,174,11,dim,'сравним нужное число со средним',{})}`;
      return s;
    }
    if(K==='halves'){ /* половина отпадает */
      const vals=v.vals||[1,2,3,4,5,6,7,8,9], keep=v.keep||'right';
      const w=29, gap=4, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2), mid=Math.floor(vals.length/2);
      let s='';
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap), drop=(keep==='right'? k<=mid : k>=mid);
        s+=`<g>`;
        if(drop) s+=`<animateTransform attributeName="transform" type="translate" values="0 0;0 14;0 14" keyTimes="0;.5;1" dur="4s" repeatCount="indefinite"/>`;
        s+=`<rect x="${x}" y="70" width="${w}" height="44" rx="8" fill="url(#${pre}card)" stroke="${keep==='right'?grn:blu}" stroke-width="1.6"/>`
          +`<text x="${x+w/2}" y="99" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(v2)}</text>`;
        if(drop) s+=`<rect x="${x-2}" y="68" width="${w+4}" height="48" rx="10" fill="#0a1226" opacity="0"><animate attributeName="opacity" values="0;0;0.82;0.82" keyTimes="0;.3;.55;1" dur="4s" repeatCount="indefinite"/></rect>`;
        s+=`</g>`;
      });
      s+=`<path d="M${x0+(mid+1)*(w+gap)-2} 124 H${x0+tot}" stroke="${grn}" stroke-width="2" opacity="0"><animate attributeName="opacity" values="0;0;0.9;0.9" keyTimes="0;.3;.6;1" dur="4s" repeatCount="indefinite"/></path>`
        +`${tx(159,144,11.5,grn,'осталась только эта половина',{b:1})}`;
      s+=`${tx(159,172,11,dim,'вторая половина отпала — там числа не подходят',{})}`;
      return s;
    }
    if(K==='binsteps'){ /* три шага деления пополам */
      const steps=v.steps||[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[9,10,11,12,13,14,15],[11,12,13]];
      const rows=steps, labels=['шаг 1: 15 чисел','шаг 2: 7 чисел','шаг 3: 3 числа'];
      let s='';
      rows.forEach((r,k)=>{
        const y=34+k*62, n=r.length, w=Math.max(17,Math.min(30,Math.round(240/n)-3)), gap=3;
        const tot=n*w+(n-1)*gap, x0=Math.round((CW-tot)/2);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.2+k*0.3).toFixed(2)}s">`
          +`<rect x="14" y="${y-10}" width="120" height="20" rx="7" fill="rgba(10,18,36,.97)" stroke="${A}" stroke-width="1.4"/>`
          +`${tx(74,y+4,10,A,labels[k]||('шаг '+(k+1)),{})}`;
        r.forEach((v2,j)=>{
          const x=x0+j*(w+gap), on=(k===2 && v2===12);
          s+=`<rect x="${x}" y="${y+16}" width="${w}" height="26" rx="6" fill="${on?'rgba(125,224,160,.2)':'rgba(15,25,46,.97)'}" stroke="${on?grn:A}" stroke-width="${on?2:1.4}"/>`
            +`<text x="${x+w/2}" y="${y+34}" text-anchor="middle" font-size="11" font-family="Georgia,serif" font-weight="bold" fill="${on?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="2.6">${plain(v2)}</text>`;
        });
        s+=`</g>`;
        if(k<rows.length-1) s+=`<path d="M159 ${y+46} v8" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/><path d="M155 ${y+50} l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="1.8"/>`;
      });
      s+=`${tx(159,34+rows.length*62+8,11.5,grn,'12 найдено за три шага',{b:1})}`;
      return s;
    }
    if(K==='binaryCount'){ /* сравнение числа проверок */
      const vals=v.vals||[[ 'по очереди', 15, red],[ 'делением пополам', 4, grn]];
      let s=`<g class="${pre}Pop"><rect x="60" y="16" width="198" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,35,11.5,ink,'сколько проверок нужно',{b:1})}</g>`;
      vals.forEach((q,k)=>{
        const y=58+k*54;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s">`
          +`${tx(24,y+16,11,q[2],q[0],{an:'start',b:1})}`
          +`<rect x="24" y="${y+24}" width="${Math.min(250,Math.round(q[1]*16))}" height="20" rx="7" fill="${q[2]}" opacity=".26" stroke="${q[2]}" stroke-width="1.3"/>`
          +`${tx(Math.min(250,Math.round(q[1]*16))+34,y+39,11.5,q[2],''+q[1],{b:1})}</g>`;
      });
      s+=`${tx(159,58+vals.length*54+6,11,dim,'для 15 чисел разница уже заметна',{})}`;
      return s;
    }
    if(K==='rule'){ /* влево или вправо */
      let s=`<rect x="132" y="66" width="54" height="46" rx="10" fill="rgba(255,215,106,.16)" stroke="${gold}" stroke-width="2.4"/>`
        +`<text x="159" y="97" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${gold}" paint-order="stroke" stroke="#08101f" stroke-width="3.4">7</text>`
        +`${tx(159,58,10.5,gold,'середина',{b:1})}`;
      s+=`<path d="M132 89 H60" stroke="${blu}" stroke-width="2.4" class="${pre}Dash"/><path d="M66 84 l-7 5 l7 5" fill="none" stroke="${blu}" stroke-width="2.4"/>`
        +`<rect x="18" y="70" width="80" height="38" rx="9" fill="url(#${pre}card)" stroke="${blu}" stroke-width="2"/>`
        +`${tx(58,88,10.5,blu,'меньше',{b:1})}${tx(58,102,9.5,blu,'1…6',{})}`;
      s+=`<path d="M186 89 H258" stroke="${grn}" stroke-width="2.4" class="${pre}Dash"/><path d="M252 84 l7 5 l-7 5" fill="none" stroke="${grn}" stroke-width="2.4"/>`
        +`<rect x="220" y="70" width="80" height="38" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>`
        +`${tx(260,88,10.5,grn,'больше',{b:1})}${tx(260,102,9.5,grn,'8…15',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="128" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,148,11.5,ink,'средний элемент — как развилка на дороге',{b:1})}</g>`;
      s+=`${tx(159,176,11,dim,'сравнили и выбрали половину',{})}`;
      return s;
    }
    if(K==='phonebook'){ /* как в словаре */
      let s=`<g class="${pre}Pop">`
        +`<path d="M40 44 Q159 26 278 44 L278 150 Q159 168 40 150 z" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`<path d="M159 32 V162" stroke="#41558a" stroke-width="2" opacity=".8"/>`
        +`<path d="M40 44 Q100 36 159 32" fill="none" stroke="${A}" stroke-width="1.4" opacity=".5"/>`
        +`<path d="M278 44 Q218 36 159 32" fill="none" stroke="${A}" stroke-width="1.4" opacity=".5"/>`
        +`${tx(96,92,13,blu,'А–М',{b:1})}${tx(222,92,13,grn,'Н–Я',{b:1})}`
        +`<path d="M150 34 v26" stroke="${gold}" stroke-width="3"/><path d="M150 60 l-5 -7 h10 z" fill="${gold}"/></g>`;
      s+=`<rect x="150" y="60" width="18" height="86" fill="#0a1226" opacity=".55"/>`;
      s+=`<circle class="${pre}Float" cx="159" cy="104" r="15" fill="rgba(255,215,106,.14)" stroke="${gold}" stroke-width="2.2"/>`
        +`<text x="159" y="109" text-anchor="middle" font-size="12" font-weight="bold" fill="${gold}">?</text>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="176" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,195,11.5,gold,'открываем в середине и листаем в нужную сторону',{b:1})}</g>`;
      return s;
    }
    if(K==='notfound'){ /* числа нет: границы сходятся */
      const tgt=(v.target===undefined?6:v.target);
      let s=`<g class="${pre}Pop"><rect x="40" y="16" width="238" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.8"/>`
        +`${tx(159,35,12,pur,'ищем число ' + plain(tgt),{b:1})}</g>`;
      s+=`<rect x="30" y="72" width="258" height="26" rx="8" fill="rgba(255,255,255,.05)" stroke="#31456f" stroke-width="1.2"/>`;
      s+=`<rect x="30" y="72" width="258" height="26" rx="8" fill="${red}" opacity=".14">`
        +`<animate attributeName="x" values="30;150;159" keyTimes="0;.6;1" dur="4.4s" repeatCount="indefinite"/>`
        +`<animate attributeName="width" values="258;18;0" keyTimes="0;.6;1" dur="4.4s" repeatCount="indefinite"/></rect>`;
      s+=`<g><rect x="26" y="66" width="8" height="38" rx="3" fill="${blu}"/><animate attributeName="x" values="0;120;129" keyTimes="0;.6;1" dur="4.4s" repeatCount="indefinite"/></g>`;
      s+=`<g><rect x="284" y="66" width="8" height="38" rx="3" fill="${blu}"/><animate attributeName="x" values="0;-120;-129" keyTimes="0;.6;1" dur="4.4s" repeatCount="indefinite"/></g>`;
      s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.75;.85;1" dur="4.4s" repeatCount="indefinite"/>`
        +`<circle cx="159" cy="85" r="20" fill="none" stroke="${red}" stroke-width="2.4"/>`
        +`<path d="M151 77 l16 16 M167 77 l-16 16" stroke="${red}" stroke-width="3"/></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="118" width="270" height="46" rx="10" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,140,11.5,red,'границы сошлись — пусто',{b:1})}`
        +`${tx(159,157,10.5,red,'такого числа в списке нет',{})}</g>`;
      return s;
    }
    if(K==='dups'){ /* бинарный поиск в неотсортированном ряду ошибается */
      const vals=v.vals||[7,2,9,3,1], tgt=(v.target===undefined?3:v.target);
      const w=42, gap=8, tot=vals.length*w+(vals.length-1)*gap, x0=Math.round((CW-tot)/2), mid=2, ti=vals.indexOf(tgt);
      let s=`<g class="${pre}Pop"><rect x="34" y="14" width="250" height="28" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,33,11.5,red,'ряд не отсортирован!',{b:1})}</g>`;
      vals.forEach((v2,k)=>{
        const x=x0+k*(w+gap), isMid=(k===mid), isT=(k===ti);
        s+=`<rect x="${x}" y="58" width="${w}" height="44" rx="9" fill="url(#${pre}card)" stroke="${isMid?gold:A}" stroke-width="${isMid?2.4:1.8}"/>`
          +`<text x="${x+w/2}" y="87" text-anchor="middle" font-size="18" font-family="Georgia,serif" font-weight="bold" fill="${isT?red:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3.2">${plain(v2)}</text>`;
        if(isMid) s+=`${tx(x+w/2,52,10,gold,'середина',{b:1})}`;
        if(isT) s+=`<path d="M${x+8} 66 l${w-16} ${28} M${x+w-8} 66 l-${w-16} ${28}" stroke="${red}" stroke-width="2.6"/>`;
      });
      s+=`<path d="M${x0+mid*(w+gap)-2} 106 H${x0+ti*(w+gap)+w/2}" stroke="${red}" stroke-width="2.2" stroke-dasharray="6 5" class="${pre}Dash"/>`
        +`<path d="M${x0+ti*(w+gap)+w/2+8} 106 l-6 -5 v10 z" fill="${red}"/>`
        +`${tx(159,124,10.5,red,'поиск ушёл влево, а число стоит справа',{})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="20" y="140" width="278" height="46" rx="10" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,162,11.5,red,'бинарный поиск требует порядка',{b:1})}`
        +`${tx(159,179,10.5,dim,'сначала отсортируй — потом ищи',{})}</g>`;
      return s;
    }
    if(K==='halving'){ /* пирамида половин */
      const nums=v.nums||[1000,500,250,125,63,32,16,8,4,2,1];
      const show=nums.slice(0,6).concat([1]);
      let s='';
      show.forEach((q,k)=>{
        const y=26+k*26, w2=Math.max(24,Math.round(200*Math.log2(q+1)/Math.log2(1001)));
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="18" y="${y}" width="${w2}" height="20" rx="6" fill="${A}" opacity=".22" stroke="${A}" stroke-width="1.2"/>`
          +`${tx(26,y+14,11,ink,''+q,{an:'start',b:1})}`
          +`${tx(232,y+14,10.5,dim,'шаг '+(k+1),{})}</g>`;
      });
      s+=`${tx(159,26+show.length*26+10,11.5,grn,'10 шагов вместо 1000 проверок',{b:1})}`;
      return s;
    }
    if(K==='mistakes'){ /* типичные ошибки */
      const it=v.items||[
        {t:'искать в неотсортированном ряду', f:'сначала отсортируй список'},
        {t:'перепутать левую и правую половину', f:'меньше среднего — идём влево'},
        {t:'остановиться, не проверив границу', f:'сравнивай и крайние элементы'}
      ];
      let s='';
      it.forEach((q,k)=>{
        const y=26+k*54;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.15+k*0.18).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="16" y="${y}" width="286" height="46" rx="11" fill="url(#${pre}card)" stroke="${red}" stroke-width="2"/>`
          +`<path d="M36 ${y+12} l12 20 h-24 z" fill="${red}" opacity=".9"/><text x="36" y="${y+28}" text-anchor="middle" font-size="11" font-weight="bold" fill="#241016">!</text>`
          +`${tx(60,y+20,Math.min(11.5,220/Math.max(1,q.t.length)/0.72),red,q.t,{an:'start',b:1})}`
          +`<path d="M60 ${y+30} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +`${tx(82,y+40,Math.min(11,190/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'})}</g>`;
      });
      s+=`${tx(159,26+it.length*54+4,11,dim,'эти ошибки встречаются чаще всего',{})}`;
      return s;
    }
    if(K==='guessnum'){ /* интерактив: угадай число делением пополам */
      const L0=v.lo||1, H0=v.hi||15, T=v.target||11;
      const lo=(st&&st.glo!=null)?st.glo:L0, hi=(st&&st.gi!=null)?st.gi:H0;
      const steps=(st&&st.gsteps)||0, done=(lo>=hi), mid=Math.floor((lo+hi)/2);
      const per=5, cw=30, gp=5;
      let s=`<g class="${pre}Pop"><rect x="30" y="16" width="258" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,35,11.5,ink,done?('Угадал! Это ' + lo):('я загадал число от ' + L0 + ' до ' + H0),{b:1})}</g>`;
      for(let n2=L0;n2<=H0;n2++){
        const idx=n2-L0, r=Math.floor(idx/per), c=idx%per, rows=Math.ceil((H0-L0+1)/per);
        const yy=54+r*30, xx=Math.round((CW-(per*cw+(per-1)*gp))/2)+c*(cw+gp);
        const inside=(n2>=lo&&n2<=hi), isMid=(!done&&n2===mid);
        s+=`<rect x="${xx}" y="${yy}" width="${cw}" height="26" rx="7" fill="${isMid?'rgba(255,215,106,.2)':(inside?'rgba(15,25,46,.97)':'rgba(255,255,255,.03)')}" stroke="${isMid?gold:(inside?A:'#26355c')}" stroke-width="${isMid?2.2:1.4}" opacity="${inside?1:.5}"/>`
          +`<text x="${xx+cw/2}" y="${yy+18}" text-anchor="middle" font-size="12.5" font-family="Georgia,serif" font-weight="bold" fill="${isMid?gold:(inside?ink:'#4a5b85')}" paint-order="stroke" stroke="#08101f" stroke-width="2.8">${n2}</text>`;
      }
      const rows=Math.ceil((H0-L0+1)/per), by=54+rows*30+6;
      if(!done){
        s+=`<g style="cursor:pointer" onclick="infGuess('${lk}',1,${L0},${H0},${T})">`
          +`<rect x="22" y="${by}" width="132" height="34" rx="10" fill="rgba(19,44,35,.95)" stroke="${grn}" stroke-width="2"/>`
          +`${tx(88,by+22,11.5,grn,'загаданное больше',{b:1})}</g>`;
        s+=`<g style="cursor:pointer" onclick="infGuess('${lk}',-1,${L0},${H0},${T})">`
          +`<rect x="164" y="${by}" width="132" height="34" rx="10" fill="rgba(12,30,52,.95)" stroke="${blu}" stroke-width="2"/>`
          +`${tx(230,by+22,11.5,blu,'загаданное меньше',{b:1})}</g>`;
        s+=`${tx(159,by+52,10.5,dim,'жёлтая клетка — середина; после ответа половина отпадёт',{})}`;
      } else {
        s+=`<g class="${pre}Pop"><rect x="60" y="${by}" width="198" height="34" rx="10" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="2"/>`
          +`${tx(159,by+22,12.5,grn,'Шагов: ' + steps,{b:1})}</g>`;
        s+=`${tx(159,by+52,10.5,dim,'каждый вопрос уменьшал диапазон вдвое',{})}`;
      }
      return s;
    }
    if(K==='tableintro'){ /* что такое таблица: строки и столбцы */
      const g=gridTable(pre,52,54,58,28,['предмет','Маша','Петя'],[['математика','5','4'],['русский','4','5'],['история','5','4']],{c0:78,anim:1});
      let s=`<g class="${pre}Slide">${g.s}</g>`;
      s+=`<path d="M${g.x[1]+g.w[1]/2} 44 H${g.x[1]+g.w[1]/2+120}" stroke="${blu}" stroke-width="2.4"/>`
        +`<path d="M${g.x[1]+g.w[1]/2+114} 39 l7 5 l-7 5" fill="none" stroke="${blu}" stroke-width="2.4"/>`
        +`${tx(g.x[1]+g.w[1]/2+60,38,11,blu,'строка',{b:1})}`;
      s+=`<path d="M44 ${g.bottom-8} V${g.bottom-70}" stroke="${gold}" stroke-width="2.4"/>`
        +`<path d="M39 ${g.bottom-64} l5 -7 l5 7" fill="none" stroke="${gold}" stroke-width="2.4"/>`
        +`${tx(44,g.bottom-40,11,gold,'столбец',{b:1,an:'middle'})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="30" y="${g.bottom+10}" width="258" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
        +`${tx(159,g.bottom+29,11.5,ink,'таблица — это данные в клетках',{b:1})}</g>`;
      return s;
    }
    if(K==='rowcol'){ /* пересечение строки и столбца */
      const g=gridTable(pre,52,44,58,28,['предмет','Маша','Петя'],[['математика','5','4'],['русский','4','5'],['история','5','4']],{c0:78,hlRow:1,hlCol:1,hlCell:[1,1]});
      let s=`<g class="${pre}Pop">${g.s}</g>`;
      s+=`<path d="M44 ${44+g.bottom-44+14-44} 0" stroke="none"/>`;
      s+=`<path d="M52 ${44+28+1.5*28} H${g.x[1]-4}" stroke="${gold}" stroke-width="2.2" opacity=".9"/>`
        +`${tx(46,44+28+1.5*28+4,10.5,gold,'строка',{b:1})}`;
      s+=`<path d="M${g.x[1]+g.w[1]/2} 40 V32" stroke="${blu}" stroke-width="2.2"/>`
        +`${tx(g.x[1]+g.w[1]/2,26,10.5,blu,'столбец',{b:1})}`;
      s+=`<circle class="${pre}Glow" cx="${g.x[1]+g.w[1]/2}" cy="${44+28+1.5*28}" r="20" fill="none" stroke="${grn}" stroke-width="2.2" opacity=".6"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="30" y="${g.bottom+14}" width="258" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,g.bottom+34,11.5,grn,'на пересечении — одна ячейка',{b:1})}</g>`;
      return s;
    }
    if(K==='celladdr'){ /* адрес ячейки */
      const vals=[[1,2,3],[4,5,6],[7,8,9]], hr=1, hc=2;
      const cw=54, x0=Math.round((CW-3*cw)/2), y0=52, rh=30;
      let s='';
      for(let r=0;r<3;r++){
        s+=`${tx(x0-14,y0+r*rh+20,11,dim,''+r,{b:1})}`;
        for(let c=0;c<3;c++){
          const cell=(r===hr&&c===hc);
          s+=`<rect x="${x0+c*cw}" y="${y0+r*rh}" width="${cw}" height="${rh}" fill="${cell?'rgba(125,224,160,.2)':'rgba(15,25,46,.95)'}" stroke="${cell?grn:'#31456f'}" stroke-width="${cell?2:1.1}"/>`
            +`<text x="${x0+c*cw+cw/2}" y="${y0+r*rh+21}" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${cell?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${vals[r][c]}</text>`;
        }
      }
      for(let c=0;c<3;c++) s+=`${tx(x0+c*cw+cw/2,y0-8,11,blu,''+c,{b:1})}`;
      s+=`${tx(x0-14,y0-8,10,dim,'',{})}`;
      s+=`<path d="M${x0+hc*cw+cw/2} ${y0+rh*hr} V${y0+rh*hr-10}" stroke="${grn}" stroke-width="1.8" opacity=".7"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s"><rect x="34" y="${y0+3*rh+14}" width="250" height="34" rx="10" fill="url(#${pre}card)" stroke="${grn}" stroke-width="2"/>`
        +`<text x="159" y="${y0+3*rh+36}" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">таблица[1][2] = 6</text></g>`;
      s+=`${tx(159,y0+3*rh+62,10.5,dim,'сначала строка, потом столбец; счёт с нуля',{})}`;
      return s;
    }
    if(K==='tablecreate'){ /* таблица = список списков */
      const vals=[[1,2,3],[4,5,6],[7,8,9]];
      const cw=54, x0=Math.round((CW-3*cw)/2), y0=108, rh=28;
      let s=`<g class="${pre}Pop"><rect x="16" y="18" width="286" height="76" rx="11" fill="rgba(8,14,30,.94)" stroke="${A}" stroke-width="1.8"/>`
        +`<path d="M16 38 h286" stroke="${A}" stroke-opacity=".25"/>`
        +`<text x="28" y="58" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">числа = [[1, 2, 3],</text>`
        +`<text x="28" y="74" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">         [4, 5, 6],</text>`
        +`<text x="28" y="90" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">         [7, 8, 9]]</text></g>`;
      for(let r=0;r<3;r++)for(let c=0;c<3;c++){
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.35+(r*3+c)*0.07).toFixed(2)}s">`
          +`<rect x="${x0+c*cw}" y="${y0+r*rh}" width="${cw}" height="${rh}" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.3"/>`
          +`<text x="${x0+c*cw+cw/2}" y="${y0+r*rh+20}" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${vals[r][c]}</text></g>`;
        s+=`<path d="M${x0+c*cw+cw/2} 96 V${y0+r*rh-3}" stroke="${A}" stroke-width="1.1" opacity=".25"/>`;
      }
      s+=`${tx(159,y0+3*rh+18,11,dim,'каждая строка — свой список внутри общего',{})}`;
      return s;
    }
    if(K==='rowsum'){ /* сумма по строке */
      const vals=[[4,5,3],[2,7,1],[6,2,8]], hr=0;
      const g=gridTable(pre,24,50,48,28,null,vals,{c0:48,hlRow:hr});
      let s=`<g class="${pre}Pop">${g.s}</g>`;
      vals[hr].forEach((v2,c)=>{
        s+=`<circle r="7" fill="${gold}" opacity=".95"><animateMotion dur="3.6s" begin="${(0.4+c*0.4).toFixed(2)}s" repeatCount="indefinite" path="M${g.x[c]+g.w[c]/2} ${50+14} Q160 ${76+c*8} 232 104"/></circle>`;
      });
      s+=`<rect x="204" y="88" width="96" height="32" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(252,109,12,gold,'сумма',{b:1})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="134" width="276" height="34" rx="10" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.8"/>`
        +`<text x="159" y="156" text-anchor="middle" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">4 + 5 + 3 = 12</text></g>`;
      s+=`${tx(159,186,11,ink,'складываем числа в строке',{})}`;
      return s;
    }
    if(K==='colsum'){ /* сумма по столбцу */
      const vals=[[4,5,3],[2,7,1],[6,2,8]], hc=1;
      const g=gridTable(pre,24,42,48,28,null,vals,{c0:48,hlCol:hc});
      let s=`<g class="${pre}Pop">${g.s}</g>`;
      for(let r=0;r<3;r++){
        s+=`<circle r="7" fill="${blu}" opacity=".95"><animateMotion dur="3.6s" begin="${(0.4+r*0.4).toFixed(2)}s" repeatCount="indefinite" path="M${g.x[hc]+g.w[hc]/2} ${42+r*28+14} Q${g.x[hc]+g.w[hc]/2-20} 120 ${g.x[hc]+g.w[hc]/2} 152"/></circle>`;
      }
      s+=`<rect x="${g.x[hc]+g.w[hc]/2-46}" y="140" width="92" height="30" rx="9" fill="url(#${pre}card)" stroke="${blu}" stroke-width="1.8"/>`
        +`${tx(g.x[hc]+g.w[hc]/2,160,11.5,blu,'сумма',{b:1})}`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="182" width="276" height="32" rx="10" fill="rgba(110,168,255,.1)" stroke="${blu}" stroke-width="1.8"/>`
        +`<text x="159" y="203" text-anchor="middle" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${blu}">5 + 7 + 2 = 14</text></g>`;
      return s;
    }
    if(K==='findrow'){ /* ищем строку по значению */
      const rows=[['Маша','5'],['Петя','3'],['Ваня','4']];
      const cw=64, x0=62, y0=46, rh=30;
      let s=`<g class="${pre}Pop"><rect x="40" y="14" width="238" height="26" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,32,11.5,gold,'кто получил 5?',{b:1})}</g>`;
      s+=`<rect x="${x0-8}" y="${y0-4}" width="${2*cw+16}" height="26" rx="8" fill="${A}" opacity=".18" stroke="${A}" stroke-width="1.2"/>`
        +`${tx(x0+cw-32,y0+15,11,A,'ученик',{b:1})}${tx(x0+cw+cw/2,y0+15,11,A,'оценка',{b:1})}`;
      rows.forEach((r,ri)=>{
        const y=y0+22+ri*rh, hit=(ri===0);
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*ri).toFixed(2)}s">`
          +`<rect x="${x0}" y="${y}" width="${cw}" height="${rh}" fill="${hit?'rgba(125,224,160,.16)':'rgba(15,25,46,.95)'}" stroke="${hit?grn:'#31456f'}" stroke-width="${hit?1.8:1.1}"/>`
          +`${tx(x0+cw/2,y+20,11.5,hit?grn:ink,plain(r[0]),{b:hit})}`
          +`<rect x="${x0+cw}" y="${y}" width="${cw}" height="${rh}" fill="${hit?'rgba(125,224,160,.16)':'rgba(15,25,46,.95)'}" stroke="${hit?grn:'#31456f'}" stroke-width="${hit?1.8:1.1}"/>`
          +`<text x="${x0+cw+cw/2}" y="${y+20}" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="${hit?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(r[1])}</text></g>`;
      });
      s+=`<rect x="${x0-12}" y="${y0+22}" width="${2*cw+24}" height="26" rx="9" fill="none" stroke="${gold}" stroke-width="2">`
        +`<animateMotion dur="3.4s" repeatCount="indefinite" path="M0 0 V0"/></rect>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="30" y="${y0+22+3*rh+12}" width="258" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,y0+22+3*rh+32,11.5,grn,'нашли строку «Маша»',{b:1})}</g>`;
      return s;
    }
    if(K==='maxinrow'){ /* самое большое число в таблице */
      const vals=[[3,8,5],[7,9,2],[4,6,1]];
      const cw=48, x0=Math.round((CW-3*cw)/2), y0=52, rh=30;
      let s='';
      for(let r=0;r<3;r++)for(let c=0;c<3;c++){
        const win=(vals[r][c]===9);
        s+=`<rect x="${x0+c*cw}" y="${y0+r*rh}" width="${cw}" height="${rh}" fill="${win?'rgba(255,215,106,.18)':'rgba(15,25,46,.95)'}" stroke="${win?gold:'#31456f'}" stroke-width="${win?2:1.1}"/>`
          +`<text x="${x0+c*cw+cw/2}" y="${y0+r*rh+21}" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${win?gold:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${vals[r][c]}</text>`;
      }
      let order=[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
      order.forEach((rc,k)=>{
        s+=`<circle r="11" fill="rgba(255,215,106,.22)" stroke="${gold}" stroke-width="2" opacity="0">`
          +`<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;.04;.1;.14;1" dur="5.4s" begin="${(0.3+k*0.55).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<animateMotion dur="5.4s" begin="${(0.3+k*0.55).toFixed(2)}s" repeatCount="indefinite" path="M${x0+rc[1]*cw+cw/2} ${y0+rc[0]*rh+12} V${y0+rc[0]*rh+12}"/></circle>`;
      });
      s+=`<text x="${x0+1*cw+cw/2}" y="${y0+1*rh+16}" text-anchor="middle" font-size="11" font-weight="bold" fill="${gold}" opacity="0">★<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;.75;.85;1" dur="5.4s" repeatCount="indefinite"/></text>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="30" y="${y0+3*rh+14}" width="258" height="30" rx="9" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,y0+3*rh+34,11.5,gold,'самое большое число — 9',{b:1})}</g>`;
      return s;
    }
    if(K==='avgrow'){ /* среднее по строке */
      const g=gridTable(pre,30,44,52,28,['баллы','',''],[['4','5','3'],['5','5','4']],{c0:58,hlRow:0});
      let s=`<g class="${pre}Pop">${g.s}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s"><rect x="150" y="120" width="150" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`<text x="225" y="141" text-anchor="middle" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">4 + 5 + 3 = 12</text></g>`;
      s+=`<path d="M225 150 v14" stroke="${A}" stroke-width="2" class="${pre}Dash"/><path d="M221 160 l4 5 l4 -5" fill="none" stroke="${A}" stroke-width="2"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="150" y="170" width="150" height="30" rx="9" fill="rgba(110,168,255,.12)" stroke="${blu}" stroke-width="1.7"/>`
        +`<text x="225" y="191" text-anchor="middle" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${blu}">12 : 3 = 4</text></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.85s"><rect x="16" y="140" width="126" height="56" rx="10" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(79,162,10.5,dim,'среднее',{})}`
        +`<text x="79" y="188" text-anchor="middle" font-size="20" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="3.4">4</text></g>`;
      s+=`${tx(159,214,11,dim,'сумму делим на количество чисел',{})}`;
      return s;
    }
    if(K==='sorttable'){ /* строки переезжают целиком */
      const rows=[['Маша','4'],['Петя','5'],['Ваня','3']];
      const sorted=rows.slice().sort((a,b)=>+b[1]-+a[1]);
      const cw=64, x0=16, y0=44, rh=28;
      let s=`<g class="${pre}Pop"><rect x="40" y="14" width="238" height="26" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,32,11.5,gold,'сортируем по баллам',{b:1})}</g>`;
      s+=`<rect x="${x0-8}" y="${y0-4}" width="${2*cw+16}" height="24" rx="8" fill="${A}" opacity=".18" stroke="${A}" stroke-width="1.2"/>`
        +`${tx(x0+cw/2,y0+13,11,A,'ученик',{b:1})}${tx(x0+cw+cw/2,y0+13,11,A,'баллы',{b:1})}`;
      rows.forEach((r,ri)=>{
        const y=y0+20+ri*rh;
        s+=`<rect x="${x0}" y="${y}" width="${cw}" height="${rh}" fill="rgba(15,25,46,.95)" stroke="#31456f" stroke-width="1.1"/>`
          +`${tx(x0+cw/2,y+19,11,ink,plain(r[0]),{})}`
          +`<rect x="${x0+cw}" y="${y}" width="${cw}" height="${rh}" fill="rgba(15,25,46,.95)" stroke="#31456f" stroke-width="1.1"/>`
          +`<text x="${x0+cw+cw/2}" y="${y+19}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(r[1])}</text>`;
      });
      s+=`<path d="M150 ${y0+20+rh-6} C168 ${y0+30}, 168 ${y0+80}, 150 ${y0+20+2*rh-6}" fill="none" stroke="${gold}" stroke-width="2.2" class="${pre}Dash"/>`;
      s+=`<path d="M154 ${y0+20+2*rh-14} l-8 6 l8 6" fill="none" stroke="${gold}" stroke-width="2.2"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s">`;
      sorted.forEach((r,ri)=>{
        const y=y0+20+ri*rh, best=(ri===0);
        s+=`<rect x="${x0+152}" y="${y}" width="${cw}" height="${rh}" fill="${best?'rgba(125,224,160,.16)':'rgba(15,25,46,.95)'}" stroke="${best?grn:'#31456f'}" stroke-width="${best?1.8:1.1}"/>`
          +`${tx(x0+152+cw/2,y+19,11,best?grn:ink,plain(r[0]),{b:best})}`
          +`<rect x="${x0+152+cw}" y="${y}" width="${cw}" height="${rh}" fill="${best?'rgba(125,224,160,.16)':'rgba(15,25,46,.95)'}" stroke="${best?grn:'#31456f'}" stroke-width="${best?1.8:1.1}"/>`
          +`<text x="${x0+152+cw+cw/2}" y="${y+19}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${best?grn:ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(r[1])}</text>`;
      });
      s+=`</g>`;
      s+=`${tx(159,y0+20+3*rh+20,11,grn,'строка переезжает целиком — вместе с именем',{b:1})}`;
      return s;
    }
    if(K==='tablevslist'){ /* список и таблица: одни данные */
      let s=`<rect x="14" y="40" width="140" height="110" rx="11" fill="rgba(15,25,46,.8)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(84,60,11,dim,'список',{b:1})}`;
      [1,2,3].forEach((v2,k)=>{
        s+=`<rect x="${30+k*40}" y="76" width="34" height="34" rx="8" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
          +`<text x="${47+k*40}" y="99" text-anchor="middle" font-size="15" font-family="Georgia,serif" font-weight="bold" fill="${ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${v2}</text>`;
      });
      s+=`${tx(84,132,10,dim,'один ряд',{})}`;
      s+=`<rect x="164" y="40" width="140" height="110" rx="11" fill="rgba(19,44,35,.55)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(234,60,11,grn,'таблица',{b:1})}`;
      [1,2,3].forEach((v2,k)=>{
        s+=`<rect x="200" y="${76+k*24}" width="68" height="22" rx="6" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.4"/>`
          +`<text x="234" y="${91+k*24}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="2.8">${v2}</text>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="164" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
        +`${tx(159,184,11.5,ink,'одни и те же числа, но по-разному',{b:1})}</g>`;
      return s;
    }
    if(K==='schedule'){ /* расписание: день и урок */
      const head=['','пн','вт','ср'], rows=[['1','рус','мат','физ'],['2','мат','рус','мат'],['3','физ','ист','рус']];
      const g=gridTable(pre,40,52,58,28,head,rows,{c0:44,hlCell:[2,3]});
      let s=`<g class="${pre}Pop"><rect x="34" y="14" width="250" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,33,11.5,gold,'что в среду третьим уроком?',{b:1})}</g>`;
      s+=`<g class="${pre}Slide" style="animation-delay:.2s">${g.s}</g>`;
      s+=`<path d="M${g.x[3]+g.w[3]/2} 48 V40" stroke="${grn}" stroke-width="2" class="${pre}Dash"/>`;
      s+=`<circle class="${pre}Glow" cx="${g.x[3]+g.w[3]/2}" cy="${52+28+2.5*28}" r="19" fill="none" stroke="${grn}" stroke-width="2.2" opacity=".6"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="30" y="${g.bottom+12}" width="258" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,g.bottom+32,11.5,grn,'ячейка на пересечении: физкультура',{b:1})}</g>`;
      return s;
    }
    if(K==='grades'){ /* дневник: сумма баллов по строкам */
      const head=['предмет','1','2','3','сумма'], rows=[['математика','5','4','5','14'],['русский','4','5','4','13'],['история','5','5','5','15']];
      const cw=44, x0=26, y0=46, rh=28;
      let s=`<g class="${pre}Pop"><rect x="34" y="14" width="250" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,32,11.5,ink,'дневник: баллы и их сумма',{b:1})}</g>`;
      s+=`<rect x="${x0}" y="${y0}" width="${86+cw*4}" height="26" rx="8" fill="${A}" opacity=".18" stroke="${A}" stroke-width="1.2"/>`;
      let cx=x0;
      head.forEach((h,c)=>{ const w2=(c===0?86:cw);
        s+=`${tx(cx+w2/2,y0+17,11,A,plain(h),{b:1})}`; cx+=w2; });
      rows.forEach((r,ri)=>{
        const y=y0+26+ri*rh, best=(ri===2);
        let cx2=x0;
        r.forEach((cell,ci)=>{
          const w2=(ci===0?86:cw), last=(ci===4);
          s+=`<rect x="${cx2}" y="${y}" width="${w2}" height="${rh}" fill="${last?(best?'rgba(125,224,160,.2)':'rgba(255,215,106,.1)'):'rgba(15,25,46,.95)'}" stroke="${last?(best?grn:gold):'#31456f'}" stroke-width="${last?1.6:1.1}"/>`
            +`<text x="${cx2+w2/2}" y="${y+19}" text-anchor="middle" font-size="${ci===0?10.5:13}" font-family="${ci===0?'Arial,Helvetica,sans-serif':'Georgia,serif'}" font-weight="${ci===0?'normal':'bold'}" fill="${last?(best?grn:gold):ink}" paint-order="stroke" stroke="#08101f" stroke-width="3">${plain(cell)}</text>`;
          cx2+=w2;
        });
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.45s"><rect x="26" y="${y0+26+3*rh+12}" width="266" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,y0+26+3*rh+32,11.5,grn,'лучше всего с историей: 15 баллов',{b:1})}</g>`;
      return s;
    }
    if(K==='tabgame'){ /* интерактив: нажми на ячейку с нужным адресом */
      const vals=v.vals||[[1,2,3],[4,5,6],[7,8,9]], hr=v.row||2, hc=v.col||1;
      const cw=56, x0=Math.round((CW-3*cw)/2), y0=60, rh=32;
      const sel=(st&&st.tab)?st.tab:null, bad=(st&&typeof st.bad==='number')?st.bad:-1;
      const done=(sel && sel[0]===hr && sel[1]===hc && st.tabOk);
      let s=`<g class="${pre}Pop"><rect x="16" y="16" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,36,Math.min(12,246/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Нажми на нужную ячейку',{b:1})}</g>`;
      for(let r=0;r<3;r++){
        s+=`${tx(x0-14,y0+r*rh+21,11,dim,''+r,{b:1})}`;
        for(let c=0;c<3;c++){
          const on=(done&&r===hr&&c===hc), isB=(bad===r*10+c);
          const col=on?grn:(isB?red:A);
          s+=`<g class="${pre}Slide" style="animation-delay:${(0.08*(r*3+c)).toFixed(2)}s;cursor:pointer" onclick="infTab('${lk}',${r},${c},${(r===hr&&c===hc)?1:0})">`
            +`<rect x="${x0+c*cw}" y="${y0+r*rh}" width="${cw}" height="${rh}" fill="${on?'rgba(19,44,35,.97)':(isB?'rgba(52,22,26,.97)':'rgba(15,25,46,.97)')}" stroke="${col}" stroke-width="${(on||isB)?2.2:1.2}"/>`
            +`<text x="${x0+c*cw+cw/2}" y="${y0+r*rh+22}" text-anchor="middle" font-size="16" font-family="Georgia,serif" font-weight="bold" fill="${on?grn:(isB?red:ink)}" paint-order="stroke" stroke="#08101f" stroke-width="3.2">${vals[r][c]}</text>`
            +(on?`<path d="M${x0+c*cw+5} ${y0+r*rh+10} l3 4 l7 -9" fill="none" stroke="${grn}" stroke-width="2.2"/>`:'')
            +(isB?`${tx(x0+c*cw+cw/2,y0+r*rh+rh+13,10,red,'это ['+r+']['+c+']',{})}`:'')
            +`</g>`;
        }
      }
      for(let c=0;c<3;c++) s+=`${tx(x0+c*cw+cw/2,y0-9,11,blu,''+c,{b:1})}`;
      const by=y0+3*rh+22;
      const msg=done?(v.exp||'Верно! Это нужная ячейка.'):(bad>=0?'Не та ячейка — считай строку и столбец':'Нажми на ячейку по адресу сверху');
      s+=`<g class="${pre}Rise"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="${done?'rgba(125,224,160,.12)':'rgba(15,25,46,.95)'}" stroke="${done?grn:A}" stroke-width="1.7"/>`
        +`${tx(159,by+20,Math.min(11.5,252/Math.max(1,msg.length)/0.7),done?grn:dim,msg,{b:done})}</g>`;
      return s;
    }
    if(K==='maptask'){ /* карта: как добраться? */
      const nodes=[{x:44,y:54,t:'A'},{x:159,y:38,t:'B'},{x:274,y:56,t:'C'},{x:62,y:158,t:'D'},{x:159,y:170,t:'E'},{x:272,y:158,t:'F'}];
      const edges=[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[1,3]];
      let s=`<g class="${pre}Pop"><rect x="34" y="12" width="250" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(159,31,12,gold,'как добраться из A в F?',{b:1})}</g>`;
      s+=graphDraw(pre,nodes,edges,{});
      const pulses=[[0,1],[0,3]];
      pulses.forEach((e,k)=>{
        s+=`<circle r="5" fill="${gold}"><animateMotion dur="3s" begin="${(k*0.6).toFixed(1)}s" repeatCount="indefinite" path="M${nodes[e[0]].x} ${nodes[e[0]].y} L${nodes[e[1]].x} ${nodes[e[1]].y}"/></circle>`;
      });
      s+=`${tx(159,196,11.5,dim,'дороги соединяют города — это граф',{})}`;
      return s;
    }
    if(K==='graphintro'){ /* вершины и рёбра */
      const nodes=[{x:60,y:70,t:'A'},{x:170,y:52,t:'B'},{x:258,y:110,t:'C'},{x:96,y:162,t:'D'}];
      const edges=[[0,1],[1,2],[0,3],[3,2]];
      let s='';
      edges.forEach((e,k)=>{
        const a=nodes[e[0]], b=nodes[e[1]];
        s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${A}" stroke-width="3" stroke-dasharray="${Math.round(Math.hypot(b.x-a.x,b.y-a.y))}" stroke-dashoffset="${Math.round(Math.hypot(b.x-a.x,b.y-a.y))}">`
          +`<animate attributeName="stroke-dashoffset" values="${Math.round(Math.hypot(b.x-a.x,b.y-a.y))};0;0" keyTimes="0;.5;1" dur="3.6s" begin="${(k*0.35).toFixed(2)}s" repeatCount="indefinite"/></line>`;
      });
      nodes.forEach((n,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.5+k*0.2).toFixed(2)}s"><circle cx="${n.x}" cy="${n.y}" r="18" fill="rgba(10,18,36,.97)" stroke="${cyan}" stroke-width="2.4"/>`
          +`<text x="${n.x}" y="${n.y+5}" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="${cyan}" paint-order="stroke" stroke="#08101f" stroke-width="3">${n.t}</text></g>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="24" y="188" width="130" height="28" rx="9" fill="rgba(15,25,46,.95)" stroke="${cyan}" stroke-width="1.6"/>`
        +`${tx(89,207,11,cyan,'кружки — вершины',{})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.8s"><rect x="164" y="188" width="130" height="28" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.6"/>`
        +`${tx(229,207,11,A,'линии — рёбра',{})}</g>`;
      return s;
    }
    if(K==='degree'){ /* степень вершины */
      const nodes=[{x:159,y:64,t:'B'},{x:52,y:120,t:'A'},{x:266,y:120,t:'C'},{x:100,y:194,t:'D'},{x:220,y:194,t:'E'}];
      const edges=[[0,1],[1,2],[0,3],[1,3],[1,4]];
      let s=graphDraw(pre,nodes,edges,{hlNodes:[0],hlEdges:[0,2,3,4],dimEdges:[1]});
      [0,2,3,4].forEach((ei,k)=>{
        const e=edges[ei], a=nodes[e[0]], b=nodes[e[1]];
        s+=`<circle r="5" fill="${grn}"><animateMotion dur="2.6s" begin="${(k*0.45).toFixed(2)}s" repeatCount="indefinite" path="M${b.x} ${b.y} L${a.x} ${a.y}"/></circle>`;
      });
      s+=`<rect x="96" y="14" width="126" height="28" rx="9" fill="rgba(19,44,35,.95)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,33,11.5,grn,'4 дороги — 4 соседа',{b:1})}`;
      s+=`${tx(159,222,9,dim,'',{})}`;
      return s;
    }
    if(K==='route'){ /* путь по карте */
      const nodes=[{x:44,y:54,t:'A'},{x:159,y:38,t:'B'},{x:274,y:56,t:'C'},{x:62,y:158,t:'D'},{x:159,y:170,t:'E'},{x:272,y:158,t:'F'}];
      const all=[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[1,3]];
      const path=[0,3,4,5];
      let s=graphDraw(pre,nodes,all,{dimAll:1});
      const d='M'+path.map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L');
      s+=`<path d="${d}" fill="none" stroke="${grn}" stroke-width="4" stroke-linecap="round" opacity=".9"/>`;
      path.forEach((n2,k)=>{
        if(k<path.length-1) s+=`<path d="M${nodes[n2].x} ${nodes[n2].y} L${nodes[path[k+1]].x} ${nodes[path[k+1]].y}" stroke="${grn}" stroke-width="4" stroke-dasharray="6 6" opacity=".9" class="${pre}Dash"/>`;
      });
      path.forEach((n2,k)=>{
        s+=`<circle cx="${nodes[n2].x}" cy="${nodes[n2].y}" r="18" fill="rgba(19,44,35,.97)" stroke="${grn}" stroke-width="2.6"/>`
          +`<text x="${nodes[n2].x}" y="${nodes[n2].y+5}" text-anchor="middle" font-size="14" font-family="Georgia,serif" font-weight="bold" fill="${grn}" paint-order="stroke" stroke="#08101f" stroke-width="3">${nodes[n2].t}</text>`;
      });
      s+=`<circle r="8" fill="${gold}" stroke="#fffdf2" stroke-width="1.6"><animateMotion dur="4.6s" repeatCount="indefinite" path="${d}"/></circle>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.3s"><rect x="24" y="196" width="270" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,216,11.5,grn,'путь A → D → E → F: три дороги',{b:1})}</g>`;
      return s;
    }
    if(K==='longshort'){ /* длинный и короткий путь */
      const nodes=[{x:44,y:54,t:'A'},{x:159,y:38,t:'B'},{x:274,y:56,t:'C'},{x:62,y:158,t:'D'},{x:159,y:170,t:'E'},{x:272,y:158,t:'F'}];
      const all=[[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5]];
      let s=graphDraw(pre,nodes,all,{dimAll:1});
      const lp=[0,1,2,5], sp=[0,3,4,5];
      s+=`<path d="M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[2].x} ${nodes[2].y} L${nodes[5].x} ${nodes[5].y}" fill="none" stroke="${red}" stroke-width="3.4" opacity=".85" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      s+=`<path d="M${nodes[0].x} ${nodes[0].y} L${nodes[3].x} ${nodes[3].y} L${nodes[4].x} ${nodes[4].y} L${nodes[5].x} ${nodes[5].y}" fill="none" stroke="${grn}" stroke-width="3.4" opacity=".9" stroke-dasharray="7 6" class="${pre}Dash"/>`;
      [[lp,red,'3 дороги'],[sp,grn,'3 дороги']].forEach((q,k)=>{
        s+=`<circle r="7" fill="${q[1]}"><animateMotion dur="4.4s" begin="${(k*1.1).toFixed(1)}s" repeatCount="indefinite" path="M${q[0].map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L')}"/></circle>`;
      });
      s+=`<rect x="26" y="196" width="126" height="28" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.6"/>${tx(89,215,11,red,'длинный путь',{b:1})}`;
      s+=`<rect x="166" y="196" width="126" height="28" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.6"/>${tx(229,215,11,grn,'короткий путь',{b:1})}`;
      return s;
    }
    if(K==='shortest'){ /* сравниваем маршруты */
      const nodes=[{x:40,y:110,t:'S'},{x:120,y:46,t:'P'},{x:120,y:174,t:'Q'},{x:206,y:46,t:'R'},{x:206,y:174,t:'T'},{x:282,y:110,t:'Z'}];
      const all=[[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,2],[3,4]];
      let s=graphDraw(pre,nodes,all,{dimAll:1});
      const r1=[0,1,3,5], r2=[0,2,4,5];
      s+=`<path d="M${r1.map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L')}" fill="none" stroke="${grn}" stroke-width="3.6" opacity=".9"/>`;
      s+=`<path d="M${r2.map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L')}" fill="none" stroke="${gold}" stroke-width="3.6" opacity=".9"/>`;
      s+=`<circle r="7" fill="${grn}"><animateMotion dur="4.2s" repeatCount="indefinite" path="M${r1.map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L')}"/></circle>`;
      s+=`<circle r="7" fill="${gold}"><animateMotion dur="4.2s" begin="1.2s" repeatCount="indefinite" path="M${r2.map(i=>`${nodes[i].x} ${nodes[i].y}`).join(' L')}"/></circle>`;
      s+=`<rect x="70" y="196" width="86" height="26" rx="8" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.6"/>${tx(113,214,10.5,grn,'3 дороги',{b:1})}`;
      s+=`<rect x="164" y="196" width="86" height="26" rx="8" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.6"/>${tx(207,214,10.5,gold,'3 дороги',{b:1})}`;
      return s;
    }
    if(K==='deadend'){ /* тупик */
      const nodes=[{x:40,y:120,t:'A'},{x:126,y:60,t:'B'},{x:210,y:120,t:'C'},{x:270,y:60,t:'T'}];
      const all=[[0,1],[1,2],[3,2]];
      let s=graphDraw(pre,nodes,all,{hlNodes:[3]});
      s+=`<path d="M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[2].x} ${nodes[2].y} L${nodes[3].x} ${nodes[3].y}" fill="none" stroke="${gold}" stroke-width="3.2" class="${pre}Dash"/>`;
      s+=`<circle r="8" fill="${gold}"><animateMotion dur="4.4s" repeatCount="indefinite" path="M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[2].x} ${nodes[2].y} L${nodes[3].x} ${nodes[3].y}"/></circle>`;
      s+=`<circle cx="${nodes[3].x}" cy="${nodes[3].y}" r="27" fill="none" stroke="${red}" stroke-width="2.4" class="${pre}Glow"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="30" y="170" width="258" height="46" rx="10" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.8"/>`
        +`${tx(159,192,11.5,red,'из T больше никуда не выйти',{b:1})}`
        +`${tx(159,209,10.5,red,'это тупик — придётся возвращаться',{})}</g>`;
      return s;
    }
    if(K==='oneway'){ /* направленные дороги */
      const nodes=[{x:52,y:70,t:'A'},{x:170,y:52,t:'B'},{x:270,y:118,t:'C'},{x:110,y:172,t:'D'}];
      const edges=[[0,1],[1,2],[3,0],[3,2]];
      let s=graphDraw(pre,nodes,edges,{dir:1});
      s+=`<circle r="6" fill="${gold}"><animateMotion dur="3.4s" repeatCount="indefinite" path="M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[2].x} ${nodes[2].y}"/></circle>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.35s"><rect x="24" y="200" width="132" height="28" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(90,219,11,grn,'так можно',{b:1})}</g>`;
      s+=`<path d="M${nodes[2].x} ${nodes[2].y} L${nodes[1].x} ${nodes[1].y}" stroke="${red}" stroke-width="3" stroke-dasharray="7 6" opacity=".8"/>`
        +`<path d="M196 88 l16 10 M212 96 l-16 10" stroke="${red}" stroke-width="3"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.55s"><rect x="164" y="200" width="132" height="28" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.6"/>`
        +`${tx(230,219,11,red,'а так нельзя',{b:1})}</g>`;
      return s;
    }
    if(K==='weight'){ /* дороги с числами */
      const nodes=[{x:44,y:70,t:'A'},{x:170,y:44,t:'B'},{x:278,y:74,t:'C'},{x:70,y:176,t:'D'},{x:170,y:190,t:'E'},{x:274,y:176,t:'F'}];
      const edges=[[0,1,5],[1,2,6],[0,3,2],[3,4,3],[4,5,4],[2,5,2]];
      let s=graphDraw(pre,nodes,edges,{hlEdges:[2,3,4]});
      s+=`<path d="M${nodes[0].x} ${nodes[0].y} L${nodes[3].x} ${nodes[3].y} L${nodes[4].x} ${nodes[4].y} L${nodes[5].x} ${nodes[5].y}" fill="none" stroke="${grn}" stroke-width="3.6" opacity=".9" class="${pre}Dash"/>`;
      s+=`<circle r="7" fill="${grn}"><animateMotion dur="4.6s" repeatCount="indefinite" path="M${nodes[0].x} ${nodes[0].y} L${nodes[3].x} ${nodes[3].y} L${nodes[4].x} ${nodes[4].y} L${nodes[5].x} ${nodes[5].y}"/></circle>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="20" y="216" width="140" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`<text x="90" y="236" text-anchor="middle" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">2 + 3 + 4 = 9</text></g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="170" y="216" width="126" height="30" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`<text x="233" y="236" text-anchor="middle" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${red}">5 + 6 + 2 = 13</text></g>`;
      return s;
    }
    if(K==='bfs'){ /* волна от старта */
      const nodes=[{x:44,y:104,t:'A'},{x:120,y:44,t:'B'},{x:120,y:168,t:'D'},{x:206,y:44,t:'C'},{x:206,y:168,t:'E'},{x:280,y:104,t:'F'}];
      const all=[[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]];
      const lvl=[0,1,1,2,2,3];
      const cols=[grn,cyan,gold,pur];
      let s=graphDraw(pre,nodes,all,{});
      [0,1,2].forEach(k=>{
        s+=`<circle cx="${nodes[0].x}" cy="${nodes[0].y}" r="20" fill="none" stroke="${grn}" stroke-width="2.4" opacity="0">`
          +`<animate attributeName="r" values="20;${60+k*52};${60+k*52}" dur="4.6s" begin="${(k*0.9).toFixed(2)}s" repeatCount="indefinite"/>`
          +`<animate attributeName="opacity" values="0;.7;0" dur="4.6s" begin="${(k*0.9).toFixed(2)}s" repeatCount="indefinite"/></circle>`;
      });
      nodes.forEach((n,k)=>{
        const c=cols[lvl[k]];
        s+=`<circle cx="${n.x}" cy="${n.y}" r="17" fill="rgba(10,18,36,.97)" stroke="${c}" stroke-width="2.6" opacity="0">`
          +`<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.1+lvl[k]*0.2).toFixed(2)};${(0.16+lvl[k]*0.2).toFixed(2)};1" dur="4.6s" repeatCount="indefinite"/></circle>`
          +`<text x="${n.x}" y="${n.y+5}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${c}" paint-order="stroke" stroke="#08101f" stroke-width="3" opacity="0">${n.t}`
          +`<animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.1+lvl[k]*0.2).toFixed(2)};${(0.16+lvl[k]*0.2).toFixed(2)};1" dur="4.6s" repeatCount="indefinite"/></text>`;
      });
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="20" y="196" width="278" height="30" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.6"/>`
        +`${tx(159,216,11,ink,'волна идёт по уровням: 1 → 2 → 3 дороги от старта',{b:1})}</g>`;
      return s;
    }
    if(K==='tree'){ /* дерево без колец */
      const nodes=[{x:159,y:38,t:'К'},{x:84,y:104,t:'A'},{x:234,y:104,t:'Б'},{x:46,y:176,t:'1'},{x:122,y:176,t:'2'},{x:196,y:176,t:'3'},{x:272,y:176,t:'4'}];
      const all=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
      let s=graphDraw(pre,nodes,all,{hlNodes:[0]});
      s+=`<circle class="${pre}Glow" cx="159" cy="38" r="24" fill="none" stroke="${grn}" stroke-width="2" opacity=".45"/>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="24" y="200" width="132" height="28" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(90,219,11,grn,'нет ни одного кольца',{b:1})}</g>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.6s"><rect x="164" y="200" width="132" height="28" rx="9" fill="rgba(110,168,255,.1)" stroke="${blu}" stroke-width="1.6"/>`
        +`${tx(230,219,11,blu,'это дерево',{b:1})}</g>`;
      return s;
    }
    if(K==='cycle'){ /* цикл: вернулись в начало */
      const nodes=[{x:70,y:52,t:'A'},{x:248,y:52,t:'B'},{x:288,y:150,t:'C'},{x:159,y:200,t:'D'},{x:32,y:150,t:'E'}];
      const all=[[0,1],[1,2],[2,3],[3,4],[4,0]];
      let s=graphDraw(pre,nodes,all,{});
      s+=`<path d="M${all.map(e=>`${nodes[e[0]].x} ${nodes[e[0]].y}`).join(' L')} L${nodes[0].x} ${nodes[0].y}" fill="none" stroke="${gold}" stroke-width="3.4" opacity=".9" class="${pre}Dash"/>`;
      s+=`<circle r="8" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M${all.map(e=>`${nodes[e[0]].x} ${nodes[e[0]].y}`).join(' L')} L${nodes[0].x} ${nodes[0].y}"/></circle>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.4s"><rect x="30" y="216" width="258" height="30" rx="9" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,236,11.5,gold,'обошли круг и вернулись в A',{b:1})}</g>`;
      return s;
    }
    if(K==='metro'){ /* схема метро */
      const red=[{x:26,y:52},{x:120,y:52},{x:210,y:52},{x:292,y:52}];
      const blu=[{x:120,y:52},{x:120,y:134},{x:120,y:206}];
      const gold=[{x:210,y:52},{x:210,y:134},{x:210,y:206}];
      let s='';
      const line=(pts,c)=>`<path d="M${pts.map(q=>`${q.x} ${q.y}`).join(' L')}" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round" opacity=".8"/>`;
      s+=line(red,'#ff8f6a')+line(blu,'#6ea8ff')+line(gold,'#ffd76a');
      [[26,52,'A'],[120,52,'B'],[210,52,'C'],[292,52,'D'],[120,134,'E'],[210,134,'F'],[120,206,'G'],[210,206,'H']].forEach((q,k)=>{
        const jump=(q[3]==='B'||q[3]==='C'), lx=(q[0]>150? q[0]-20 : q[0]+20);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.1*k).toFixed(2)}s"><circle cx="${q[0]}" cy="${q[1]}" r="10" fill="#0d1830" stroke="#eaf2ff" stroke-width="2.4"/>`
          +(jump?`<circle class="${pre}Glow" cx="${q[0]}" cy="${q[1]}" r="15" fill="none" stroke="${gold}" stroke-width="2" opacity=".5"/>`:'')
          +`</g>`
          +`${tx(lx,q[1]+4,11,ink,q[3],{b:1})}`;
      });
      s+=`<circle r="6" fill="#fff"><animateMotion dur="5s" repeatCount="indefinite" path="M26 52 L120 52 L210 52 L210 134"/></circle>`;
      s+=`<g class="${pre}Rise" style="animation-delay:.5s"><rect x="24" y="226" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,246,11,gold,'на пересадке переходим на другую линию',{b:1})}</g>`;
      return s;
    }
    if(K==='walkgame'){ /* интерактив: пройди по карте до цели */
      const nodes=[{x:44,y:150,t:'S'},{x:126,y:60,t:'P'},{x:132,y:182,t:'Q'},{x:232,y:176,t:'R'},{x:280,y:72,t:'Z'}];
      const all=[[0,1],[0,2],[1,3],[2,3],[3,4],[1,4]];
      const cur=(st&&st.wnode!=null)?st.wnode:0, bad=(st&&typeof st.wbad==='number')?st.wbad:-1, goal=4;
      const steps=(st&&st.wsteps)||0, done=(cur===goal);
      const adj=all.filter(e=>e[0]===cur||e[1]===cur).map(e=>e[0]===cur?e[1]:e[0]);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,Math.min(11.5,246/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Пройди из S в Z: нажимай соседние города',{b:1})}</g>`;
      all.forEach(e=>{
        const a=nodes[e[0]], b=nodes[e[1]];
        s+=`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#5a6d96" stroke-width="2.4" opacity=".8"/>`;
      });
      nodes.forEach((n,k)=>{
        const isCur=(k===cur), on_=(adj.indexOf(k)>=0), isB=(k===bad), isGoal=(k===goal);
        const col=isCur?grn:(isB?red:(on_?cyan:'#5a6d96'));
        s+=`<g style="cursor:pointer" onclick="infWalk('${lk}',${k},${on_?1:0})">`
          +`<circle cx="${n.x}" cy="${n.y}" r="${isCur?20:17}" fill="${isCur?'rgba(19,44,35,.97)':'rgba(10,18,36,.97)'}" stroke="${col}" stroke-width="${(isCur||isGoal)?3:2.2}"/>`
          +(isGoal?`<circle class="${pre}Glow" cx="${n.x}" cy="${n.y}" r="24" fill="none" stroke="${grn}" stroke-width="2" opacity=".5"/>`:'')
          +`<text x="${n.x}" y="${n.y+5}" text-anchor="middle" font-size="13" font-family="Georgia,serif" font-weight="bold" fill="${col}" paint-order="stroke" stroke="#08101f" stroke-width="3">${n.t}</text>`
          +(isB?`${tx(n.x,n.y-26,9.5,red,'не сосед',{})}`:'')
          +`</g>`;
      });
      const by=214;
      s+=`<rect x="96" y="${by}" width="126" height="26" rx="8" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,by+18,11,gold,'шагов: '+steps,{b:1})}`;
      if(done) s+=`<g class="${pre}Pop"><rect x="30" y="${by+32}" width="258" height="28" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,by+51,11.5,grn,'Дошёл до Z! Шагов: ' + steps,{b:1})}</g>`;
      else s+=`<g class="${pre}Rise"><rect x="20" y="${by+32}" width="278" height="28" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,by+51,10.5,dim,bad>=0?'Это не соседний город — иди по дороге':'Голубым отмечены соседи, куда можно пойти',{})}</g>`;
      return s;
    }
    if(K==='pixeltask'){ /* как компьютер хранит рисунок */
      const smile=[[0,1,1,1,1,0],[1,0,0,0,0,1],[1,1,0,0,1,1],[1,0,0,0,0,1],[1,1,1,1,1,1],[0,1,1,1,1,0]];
      let s=`<g class="${pre}Pop"><rect x="30" y="16" width="258" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,36,13,gold,'как компьютер хранит рисунок?',{b:1})}</g>`;
      const cw2=17, x0=Math.round((CW-6*cw2)/2), y0=58;
      s+=`<rect x="${x0-8}" y="${y0-8}" width="${6*cw2+16}" height="${6*cw2+16}" rx="8" fill="#0f1930" stroke="${A}" stroke-width="1.8"/>`;
      s+=pxGrid(pre,x0,y0,cw2,smile,{base:0.15});
      s+=`<g class="${pre}Float"><circle cx="${x0+2*cw2}" cy="${y0+2*cw2}" r="26" fill="rgba(126,168,255,.14)" stroke="${cyan}" stroke-width="2.4"/>`
        +`<circle cx="${x0+2*cw2}" cy="${y0+2*cw2}" r="19" fill="none" stroke="${cyan}" stroke-width="1.6"/>`
        +`<path d="M${x0+2*cw2+14} ${y0+2*cw2+14} l12 12" stroke="${cyan}" stroke-width="3.4" stroke-linecap="round"/>`
        +`<animateMotion dur="4s" repeatCount="indefinite" path="M${x0+cw2} ${y0+cw2} Q${x0+3*cw2} ${y0+5*cw2} ${x0+5*cw2} ${y0+cw2}"/></g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.5s"><rect x="24" y="176" width="270" height="28" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,195,11,dim,'а внутри — только числа, как всегда',{})}</g>`;
      return s;
    }
    if(K==='pixzoom'){ /* приближаем: видно клетки */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'увеличиваем — и видим клетки',{b:1})}</g>`;
      const mat=[[1,1,0,1],[1,0,1,1],[0,1,1,0],[1,1,0,1]];
      [[22,60,10],[112,60,15],[208,62,20]].forEach((q,k)=>{
        const n=4, x0=q[0], y0=q[1], cell=q[2];
        s+=`<rect x="${x0-4}" y="${y0-4}" width="${n*cell+8}" height="${n*cell+8}" rx="6" fill="#0f1930" stroke="${k===2?gold:A}" stroke-width="1.6"/>`;
        s+=pxGrid(pre,x0,y0,cell,mat,{base:0.15+k*0.2});
        if(k<2){
          const g=k===0?34:20;
          s+=`<path d="M${x0+n*cell+6} ${y0+n*cell/2} h${g}" stroke="${gold}" stroke-width="2" class="${pre}Dash"/>`
            +`<path d="M${x0+n*cell+6+g-6} ${y0+n*cell/2-4} l6 4 l-6 4" fill="none" stroke="${gold}" stroke-width="2"/>`;
        }
      });
      s+=`${tx(159,178,11.5,gold,'на каждом шаге клетки всё крупнее',{b:1})}`;
      s+=`${tx(159,198,11,dim,'так выглядит «пиксель» при увеличении',{})}`;
      return s;
    }
    if(K==='pixel'){ /* один пиксель */
      let s=`<g class="${pre}Pop"><rect x="30" y="16" width="258" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(159,35,12.5,gold,'один пиксель — один цвет',{b:1})}</g>`;
      s+=`<rect x="99" y="58" width="120" height="120" rx="10" fill="#eaf2ff" stroke="${gold}" stroke-width="2.6" filter="url(#${pre}sh)"/>`;
      s+=`<circle class="${pre}Twinkle" cx="159" cy="118" r="34" fill="#101828"/>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.3s"><rect x="24" y="190" width="130" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5"/>`
        +`${tx(89,210,11,cyan,'клетка = пиксель',{})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.45s"><rect x="164" y="190" width="130" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5"/>`
        +`${tx(229,210,11,grn,'у него один цвет',{})}</g>`;
      return s;
    }
    if(K==='bw'){ /* чёрно-белый код: 1 и 0 */
      const mat=(v.mat||[[0,1,1,1,1,0],[1,0,0,0,0,1],[1,0,1,0,1,1],[1,0,0,0,0,1],[1,1,1,1,1,1],[0,1,1,1,1,0]]);
      const cw2=20, x0=Math.round((CW-6*cw2)/2)-30, y0=52;
      let s=`<g class="${pre}Pop"><rect x="20" y="14" width="278" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'белый лист и чёрные пиксели',{b:1})}</g>`;
      s+=`<rect x="${x0-6}" y="${y0-6}" width="${6*cw2+12}" height="${6*cw2+12}" rx="6" fill="#eaf2ff" stroke="${grn}" stroke-width="2"/>`;
      s+=`<g>${pxGrid(pre,x0,y0,cw2,mat,{base:0.2,paper:1})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="228" y="60" width="76" height="52" rx="9" fill="rgba(16,26,46,.97)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(266,82,20,grn,'1',{b:1,georgia:1})}${tx(266,102,10.5,dim,'чёрный',{})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.75s"><rect x="228" y="122" width="76" height="52" rx="9" fill="rgba(16,26,46,.97)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(266,144,20,ink,'0',{b:1,georgia:1})}${tx(266,164,10.5,dim,'белый',{})}</g>`;
      s+=`${tx(159,196,11.5,dim,'два числа — два цвета',{})}`;
      return s;
    }
    if(K==='drawbits'){ /* рисуем по коду */
      const mat=(v.mat||[[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]]);
      const rows=mat.length, cols=mat[0].length, cw2=22, x0=150, y0=52;
      let s=`<g class="${pre}Pop"><rect x="20" y="14" width="278" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(159,33,12,gold,'где 1 — закрашиваем клетку',{b:1})}</g>`;
      mat.forEach((r,k)=>{
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.1*k).toFixed(2)}s"><rect x="26" y="${y0+k*22-2}" width="${cols*18}" height="20" rx="5" fill="rgba(15,25,46,.97)" stroke="${cardB}" stroke-width="1"/>`;
        r.forEach((v2,c)=>{ s+=`${tx(26+8+c*18,y0+k*22+12,12,v2?grn:dim,''+v2,{b:1})}`; });
        s+=`</g>`;
      });
      s+=`<rect x="${x0-6}" y="${y0-6}" width="${cols*cw2+12}" height="${rows*cw2+12}" rx="6" fill="#eaf2ff" stroke="${grn}" stroke-width="2"/>`;
      mat.forEach((r,k)=>r.forEach((v2,c)=>{
        const d=(0.3+(k*cols+c)*0.055).toFixed(2);
        s+=`<rect class="${pre}Pop" style="animation-delay:${d}s" x="${x0+c*cw2}" y="${y0+k*cw2}" width="${cw2-1}" height="${cw2-1}" rx="2" fill="${v2?'#101828':'#eaf2ff'}" stroke="#c8d4ee" stroke-width="0.8"/>`;
      }));
      s+=`<path d="M${x0-14} ${y0-6} v${rows*cw2+12} M${x0-14} ${y0-6} h8 M${x0-14} ${y0+rows*cw2+6} h8" stroke="${gold}" stroke-width="2" opacity=".8"/>`;
      s+=`${tx(159,y0+rows*cw2+26,11.5,grn,'код из чисел стал картинкой',{b:1})}`;
      return s;
    }
    if(K==='readbits'){ /* читаем код с картинки */
      const mat=(v.mat||[[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1]]);
      const rows=mat.length, cols=mat[0].length, cw2=20, x0=34, y0=56;
      let s=`<g class="${pre}Pop"><rect x="20" y="14" width="278" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.8"/>`
        +`${tx(159,33,12,cyan,'запишем рисунок числами',{b:1})}</g>`;
      s+=`<rect x="${x0-6}" y="${y0-6}" width="${cols*cw2+12}" height="${rows*cw2+12}" rx="6" fill="#eaf2ff" stroke="${cyan}" stroke-width="2"/>`;
      mat.forEach((r,k)=>r.forEach((v2,c)=>{
        s+=`<rect x="${x0+c*cw2}" y="${y0+k*cw2}" width="${cw2-1}" height="${cw2-1}" rx="2" fill="${v2?'#101828':'#eaf2ff'}" stroke="#c8d4ee" stroke-width="0.8"/>`;
      }));
      s+=`<path d="M${x0+cols*cw2+8} ${y0+8} h30 m-6 -5 l6 5 l-6 5" stroke="${A}" stroke-width="2" fill="none" class="${pre}Dash"/>`;
      mat.forEach((r,k)=>{
        s+=`<g opacity="0"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;${(0.12+k*0.18).toFixed(2)};${(0.2+k*0.18).toFixed(2)};1" dur="4.6s" repeatCount="indefinite"/>`
          +`<rect x="180" y="${y0+k*24-2}" width="${cols*20}" height="22" rx="5" fill="rgba(15,25,46,.97)" stroke="${cyan}" stroke-width="1.2"/>`;
        r.forEach((v2,c)=>{ s+=`${tx(180+10+c*20,y0+k*24+13,13,v2?ink:dim,''+v2,{b:1})}`; });
        s+=`</g>`;
      });
      s+=`${tx(159,y0+rows*cw2+30,11.5,cyan,'каждая строка — цепочка нулей и единиц',{b:1})}`;
      return s;
    }
    if(K==='graylevels'){ /* оттенки серого */
      const sh=[{v:0,t:'00',c:'#1b2a4d'},{v:1,t:'01',c:'#5a6d96'},{v:2,t:'10',c:'#a8b6d4'},{v:3,t:'11',c:'#eaf2ff'}];
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'2 бита → 4 оттенка',{b:1})}</g>`;
      sh.forEach((q,k)=>{
        const x=24+k*70;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.12).toFixed(2)}s">`
          +`<rect x="${x}" y="58" width="62" height="62" rx="8" fill="${q.c}" stroke="${gold}" stroke-width="1.8"/>`
          +`<rect x="${x+8}" y="132" width="46" height="26" rx="7" fill="rgba(15,25,46,.97)" stroke="${A}" stroke-width="1.4"/>`
          +`${tx(x+31,150,14,gold,q.t,{b:1})}</g>`;
      });
      s+=`${tx(159,182,11.5,dim,'каждый оттенок — свой код из двух бит',{})}`;
      s+=`${tx(159,202,11.5,grn,'чем больше бит, тем больше оттенков',{b:1})}`;
      return s;
    }
    if(K==='colors'){ /* смешиваем три цвета */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'красный + зелёный + синий',{b:1})}</g>`;
      const cx=159, cy=118, R=44;
      s+=`<circle class="${pre}Glow" cx="${cx-30}" cy="${cy-18}" r="${R}" fill="rgba(255,90,90,.4)" stroke="#ff6b6b" stroke-width="2"/>`;
      s+=`<circle class="${pre}Glow" style="animation-delay:.5s" cx="${cx+30}" cy="${cy-18}" r="${R}" fill="rgba(90,255,140,.38)" stroke="${grn}" stroke-width="2"/>`;
      s+=`<circle class="${pre}Glow" style="animation-delay:1s" cx="${cx}" cy="${cy+30}" r="${R}" fill="rgba(90,140,255,.38)" stroke="${blu}" stroke-width="2"/>`;
      s+=tx(cx-62,cy-40,12,'#ffd0d0','R',{b:1});
      s+=tx(cx+62,cy-40,12,'#d4ffe0','G',{b:1});
      s+=tx(cx-58,cy+48,12,'#d6e2ff','B',{b:1});
      s+=`<circle class="${pre}Twinkle" cx="${cx}" cy="${cy}" r="12" fill="rgba(255,255,255,.55)"/>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.5s"><rect x="24" y="186" width="270" height="28" rx="9" fill="rgba(255,255,255,.05)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,205,11.5,gold,'все три вместе дают белый',{b:1})}</g>`;
      return s;
    }
    if(K==='colorcode'){ /* код цвета */
      const pal=[{n:'красный',r:255,g:0,b:0,c:'#ff5d5d'},{n:'зелёный',r:0,g:200,b:90,c:'#6fe0a0'},{n:'синий',r:70,g:130,b:255,c:'#7fa8ff'}];
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'цвет — это три числа',{b:1})}</g>`;
      pal.forEach((q,k)=>{
        const y=54+k*48;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="42" height="40" rx="8" fill="${q.c}" stroke="${gold}" stroke-width="1.6"/>`
          +`<rect x="76" y="${y}" width="222" height="40" rx="9" fill="rgba(15,25,46,.97)" stroke="${cardB}" stroke-width="1.4"/>`
          +`${tx(104,y+25,12,ink,q.n,{an:'start'})}`
          +`<text x="284" y="${y+26}" text-anchor="end" font-size="12.5" font-family="'Courier New',monospace" font-weight="bold" fill="${q.c}">(${q.r}, ${q.g}, ${q.b})</text></g>`;
      });
      s+=`${tx(159,204,11.5,dim,'каждое число от 0 до 255 — это один байт',{})}`;
      return s;
    }
    if(K==='bitscount'){ /* сколько бит на пиксель */
      const rows=[{n:'2 цвета',b:'1 бит',c:cyan,w:22},{n:'4 цвета',b:'2 бита',c:blu,w:44},{n:'16 цветов',b:'4 бита',c:gold,w:78},{n:'256 цветов',b:'8 бит',c:grn,w:122}];
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'сколько бит нужно пикселю',{b:1})}</g>`;
      rows.forEach((q,k)=>{
        const y=54+k*38;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +`${tx(24,y+16,12,q.c,q.n,{an:'start',b:1})}`
          +`<rect x="118" y="${y+2}" width="${q.w}" height="18" rx="6" fill="${q.c}" opacity=".26" stroke="${q.c}" stroke-width="1.3"/>`
          +`<text x="300" y="${y+17}" text-anchor="end" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${q.c}">${q.b}</text></g>`;
      });
      s+=`${tx(159,54+rows.length*38+8,11.5,grn,'каждый новый бит удваивает число цветов',{b:1})}`;
      return s;
    }
    if(K==='imgsize'){ /* считаем размер рисунка */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.8"/>`
        +`${tx(159,33,12,gold,'считаем размер рисунка',{b:1})}</g>`;
      const steps=[{t:'10 × 10 пикселей',c:cyan},{t:'× 1 бит на пиксель',c:blu},{t:'= 100 бит',c:grn}];
      steps.forEach((q,k)=>{
        const y=54+k*40;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s"><rect x="34" y="${y}" width="250" height="32" rx="9" fill="rgba(15,25,46,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +`${tx(159,y+22,13,q.c,q.t,{b:1})}</g>`;
        if(k<2) s+=`<path d="M159 ${y+34} v6" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:.95s"><rect x="20" y="180" width="278" height="34" rx="9" fill="rgba(255,255,255,.05)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,202,11.5,ink,'а цветной пиксель — это 3 байта',{b:1})}</g>`;
      return s;
    }
    if(K==='resolution'){ /* чем больше пикселей, тем чётче */
      const small=[[1,1,1,1],[1,0,0,0],[1,0,0,0],[1,1,1,0]];
      const big=[[1,1,1,1,1,1,1,1],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,0,0,0,0,0,0],[1,1,1,1,1,1,0,0]];
      let s=`<g class="${pre}Pop"><rect x="20" y="14" width="278" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'больше пикселей — чётче рисунок',{b:1})}</g>`;
      s+=`<rect x="24" y="52" width="124" height="124" rx="8" fill="#eaf2ff" stroke="${red}" stroke-width="2"/>`;
      s+=`<g>${small.map((r,k)=>r.map((v2,c)=>`<rect x="${28+c*29}" y="${56+k*29}" width="28" height="28" fill="${v2?'#101828':'#eaf2ff'}" stroke="#c8d4ee" stroke-width="0.8"/>`).join('')).join('')}</g>`;
      s+=`<rect x="170" y="52" width="124" height="124" rx="8" fill="#eaf2ff" stroke="${grn}" stroke-width="2"/>`;
      s+=`<g>${big.map((r,k)=>r.map((v2,c)=>`<rect x="${174+c*14.5}" y="${56+k*14.5}" width="14" height="14" fill="${v2?'#101828':'#eaf2ff'}" stroke="#dbe4f5" stroke-width="0.6"/>`).join('')).join('')}</g>`;
      s+=`${tx(86,192,11.5,red,'4 × 4 — грубо',{b:1})}${tx(232,192,11.5,grn,'8 × 8 — уже видно',{b:1})}`;
      s+=`${tx(159,212,11,dim,'разрешение — это число пикселей в рисунке',{})}`;
      return s;
    }
    if(K==='rle'){ /* одинаковые пиксели записываем короче */
      const row=[0,0,0,0,0,1,1,1,0,0];
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'одинаковые пиксели — короче',{b:1})}</g>`;
      row.forEach((v2,k)=>{
        const x=34+k*25;
        s+=`<g class="${pre}Tok" style="animation-delay:${(0.08*k).toFixed(2)}s"><rect x="${x}" y="52" width="23" height="30" rx="5" fill="${v2?'#101828':'#eaf2ff'}" stroke="#c8d4ee" stroke-width="1"/>`
          +`${tx(x+11,90,12,v2?grn:dim,''+v2,{b:1})}</g>`;
      });
      s+=`<path d="M34 108 H158" stroke="${cyan}" stroke-width="2.4"/><path d="M34 104 v8 M158 104 v8" stroke="${cyan}" stroke-width="2.4"/>`
        +`${tx(96,126,12,cyan,'5 нулей',{b:1})}`;
      s+=`<path d="M159 108 H234" stroke="${gold}" stroke-width="2.4"/><path d="M159 104 v8 M234 104 v8" stroke="${gold}" stroke-width="2.4"/>`
        +`${tx(196,126,12,gold,'3 единицы',{b:1})}`;
      s+=`<path d="M235 108 H284" stroke="${cyan}" stroke-width="2.4"/><path d="M235 104 v8 M284 104 v8" stroke="${cyan}" stroke-width="2.4"/>`
        +`${tx(259,126,11,cyan,'2 нуля',{})}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="140" width="270" height="34" rx="9" fill="rgba(255,255,255,.05)" stroke="${grn}" stroke-width="1.6"/>`
        +`<text x="159" y="162" text-anchor="middle" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">5·0  3·1  2·0</text></g>`;
      s+=`${tx(159,192,11,dim,'так код становится короче — это сжатие',{})}`;
      return s;
    }
    if(K==='photo'){ /* фото — миллионы пикселей */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${tx(159,33,12,ink,'фотография — это очень много пикселей',{b:1})}</g>`;
      let sd=7; const rnd=()=>{sd=(sd*1103515245+12345)%2147483648; return sd/2147483648;};
      for(let r=0;r<18;r++)for(let c=0;c<18;c++){
        const x=52+c*12, y=52+r*12, t=rnd();
        const col=t<.33?'#3b5a8f':(t<.66?'#7fa8ff':'#d9e6ff');
        s+=`<rect x="${x}" y="${y}" width="11" height="11" fill="${col}" opacity=".85"/>`;
      }
      s+=`<rect x="50" y="50" width="220" height="220" rx="8" fill="none" stroke="${gold}" stroke-width="2"/>`;
      const steps=[{t:'1000 × 1000 = 1 000 000 пикселей',c:cyan},{t:'и у каждого 3 числа цвета',c:blu},{t:'= 3 000 000 байт!',c:red}];
      steps.forEach((q,k)=>{
        const y=282+k*30;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.3+k*0.25).toFixed(2)}s"><rect x="20" y="${y}" width="278" height="26" rx="8" fill="rgba(15,25,46,.97)" stroke="${q.c}" stroke-width="1.5"/>`
          +fit(159,y+18,11.5,q.c,q.t,{},266)+`</g>`;
      });
      return s;
    }
    if(K==='drawgame'){ /* интерактив: раскрась по коду */
      const tgt=(v.mat||[[0,1,0,0,1,0],[1,1,1,1,1,1],[1,1,1,1,1,1],[0,1,1,1,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]]);
      const rows=tgt.length, cols=tgt[0].length;
      const grid=(st&&st.grid)?st.grid:tgt.map(r=>r.map(()=>0));
      const done=grid.every((r,k)=>r.every((v2,c)=>v2===tgt[k][c]));
      const cw2=26, x0=Math.round((CW-cols*cw2)/2), y0=64;
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,34,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Раскрась пиксели по коду',{b:1})}</g>`;
      grid.forEach((r,k)=>r.forEach((v2,c)=>{
        const want=tgt[k][c], ok=(v2===want);
        s+=`<g style="cursor:pointer" onclick="infDraw('${lk}',${k},${c})">`
          +`<rect x="${x0+c*cw2}" y="${y0+k*cw2}" width="${cw2-2}" height="${cw2-2}" rx="4" fill="${v2?'#101828':'#eaf2ff'}" stroke="${v2?(ok?grn:'#ff9a8a'):'#c8d4ee'}" stroke-width="${v2?2:1}"/>`
          +(v2?`${tx(x0+c*cw2+6,y0+k*cw2+16,10,'#4a5b85',''+want,{an:'start'})}`
             :`<text x="${x0+c*cw2+5}" y="${y0+k*cw2+14}" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${want?'#8ea3c8':'#b6c2dd'}" opacity=".85">${want}</text>`)
          +`</g>`;
      }));
      s+=`<rect x="${x0-4}" y="${y0-4}" width="${cols*cw2+4}" height="${rows*cw2+4}" rx="6" fill="none" stroke="${A}" stroke-width="1.6"/>`;
      const by=y0+rows*cw2+10;
      if(done) s+=`<g class="${pre}Pop"><rect x="30" y="${by}" width="258" height="30" rx="9" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`${tx(159,by+20,12,grn,'Совпало! Ты нарисовал картинку по коду',{b:1})}</g>`;
      else s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.5"/>`
        +`${tx(159,by+20,11,dim,'нажимай клетки: где в коде 1 — там чёрный',{})}</g>`;
      return s;
    }
    if(K==='pixmistakes'){ /* частые ошибки */
      const it=(v.items||[
        {t:'перепутал 1 и 0', f:'1 — чёрный пиксель, 0 — белый'},
        {t:'думал, что у пикселя один цвет', f:'в RGB цвет — это три числа'},
        {t:'забыл про размер', f:'пиксели × биты = объём рисунка'}
      ]);
      let s='';
      it.forEach((q,k)=>{
        const y=22+k*54;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14+k*0.16).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="16" y="${y}" width="286" height="46" rx="11" fill="url(#${pre}card)" stroke="${red}" stroke-width="2"/>`
          +`<path d="M36 ${y+12} l12 20 h-24 z" fill="${red}" opacity=".9"/><text x="36" y="${y+28}" text-anchor="middle" font-size="11" font-weight="bold" fill="#241016">!</text>`
          +fit(62,y+20,Math.min(11.5,206/Math.max(1,q.t.length)/0.72),red,q.t,{an:'start',b:1},206)
          +`<path d="M62 ${y+30} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +fit(84,y+40,Math.min(11,186/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'},186)+`</g>`;
      });
      s+=`${tx(159,22+it.length*54+4,11,dim,'эти ошибки встречаются чаще всего',{})}`;
      return s;
    }
    if(K==='sndtask'){ /* что такое звук */
      let s=`<g class="${pre}Pop"><rect x="30" y="16" width="258" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,36,13,gold,'как компьютер записывает звук?',{b:1})}</g>`;
      s+=`<g class="${pre}Pop" filter="url(#${pre}sh)"><rect x="26" y="86" width="54" height="76" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`<path d="M80 108 l26 -18 v60 l-26 -18 z" fill="rgba(126,168,255,.25)" stroke="${cyan}" stroke-width="2"/></g>`;
      [0,1,2].forEach(k=>{
        s+=`<path d="M112 ${124} q${18+k*14} ${-22-k*16} 0 ${-44-k*32}" fill="none" stroke="${cyan}" stroke-width="2.6" opacity="0">`
          +`<animate attributeName="opacity" values="0;.9;0" dur="2.4s" begin="${(k*0.5).toFixed(2)}s" repeatCount="indefinite"/></path>`;
      });
      let sd2=11; const rnd2=()=>{sd2=(sd2*1103515245+12345)%2147483648; return sd2/2147483648;};
      for(let k=0;k<22;k++){
        const x=150+rnd2()*140, y=74+rnd2()*100, d=(rnd2()*2).toFixed(2);
        s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="2.4" fill="${gold}" opacity=".5">`
          +`<animateTransform attributeName="transform" type="translate" values="0 0;${(rnd2()*6-3).toFixed(1)} ${(rnd2()*6-3).toFixed(1)};0 0" dur="${(1.6+rnd2()).toFixed(1)}s" begin="${d}s" repeatCount="indefinite"/></circle>`;
      }
      s+=`<g class="${pre}Rise}" style="animation-delay:.5s"><rect x="24" y="176" width="270" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,196,11.5,dim,'звук — это дрожание воздуха',{})}</g>`;
      return s;
    }
    if(K==='sndwave'){ /* громкость и высота */
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'громкость и высота звука',{b:1})}</g>`;
      const bl=(y)=>`<line x1="24" y1="${y}" x2="292" y2="${y}" stroke="#31456f" stroke-width="1.6" opacity=".8"/>`;
      s+=bl(74)+bl(160);
      s+=`<path d="${sineD(30,74,120,10,2,40)}" fill="none" stroke="${blu}" stroke-width="3"/>`
        +`${tx(90,64,10.5,blu,'тихо',{b:1})}`
        +`${tx(90,116,10,dim,'дрожит слабо',{})}`;
      s+=`<path d="${sineD(168,74,120,24,2,40)}" fill="none" stroke="${red}" stroke-width="3"/>`
        +`${tx(228,64,10.5,red,'громко',{b:1})}`
        +`${tx(228,116,10,dim,'дрожит сильно',{})}`;
      s+=`<path d="${sineD(30,160,120,18,1.5,40)}" fill="none" stroke="${gold}" stroke-width="3"/>`
        +`${tx(90,204,10.5,gold,'низкий звук',{b:1})}`;
      s+=`<path d="${sineD(168,160,120,18,5,80)}" fill="none" stroke="${grn}" stroke-width="3"/>`
        +`${tx(228,204,10.5,grn,'высокий звук',{b:1})}`;
      s+=`${tx(90,192,9.5,dim,'волна редкая',{})}${tx(228,192,9.5,dim,'волна частая',{})}`;
      return s;
    }
    if(K==='sndsample'){ /* измеряем через равные промежутки */
      const y0=96, amp=40, n=10;
      const pts=sinePts(30,y0,258,amp,2,n);
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'измеряем через равные промежутки',{b:1})}</g>`;
      s+=`<path d="${sineD(30,y0,258,amp,2,80)}" fill="none" stroke="${A}" stroke-width="2.2" opacity=".45"/>`;
      s+=`<line x1="24" y1="${y0}" x2="292" y2="${y0}" stroke="#31456f" stroke-width="1.4"/>`;
      pts.forEach((p,k)=>{
        s+=`<circle class="${pre}Pop" style="animation-delay:${(0.2+k*0.22).toFixed(2)}s" cx="${p[0]}" cy="${p[1]}" r="4.6" fill="${gold}" stroke="#fffdf2" stroke-width="1.2"/>`;
        s+=`<line x1="${p[0]}" y1="${p[1]}" x2="${p[0]}" y2="${y0+52}" stroke="${gold}" stroke-width="1.4" stroke-dasharray="4 4" class="${pre}Pop" style="animation-delay:${(0.2+k*0.22).toFixed(2)}s" opacity=".55"/>`;
      });
      s+=`<circle r="5" fill="${cyan}"><animateMotion dur="4.4s" repeatCount="indefinite" path="${sineD(30,y0,258,amp,2,80)}"/></circle>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="164" width="270" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,184,11.5,gold,'у каждой точки — своё время',{b:1})}</g>`;
      s+=`${tx(159,212,11,dim,'ровные промежутки — как тиканье часов',{})}`;
      return s;
    }
    if(K==='sndnumbers'){ /* точки становятся числами */
      const y0=70, amp=34, n=8;
      const pts=sinePts(30,y0,258,amp,2,n);
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'каждое измерение — это число',{b:1})}</g>`;
      s+=`<path d="${sineD(30,y0,258,amp,2,80)}" fill="none" stroke="${A}" stroke-width="2" opacity=".4"/>`;
      pts.forEach((p,k)=>{
        s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.2" fill="${gold}"/>`;
        s+=`<circle r="3.4" fill="${gold}"><animateMotion dur="3.6s" begin="${(k*0.25).toFixed(2)}s" repeatCount="indefinite" path="M${p[0]} ${p[1]} V132"/></circle>`;
      });
      s+=`<rect x="24" y="132" width="270" height="30" rx="8" fill="rgba(15,25,46,.97)" stroke="${gold}" stroke-width="1.6"/>`;
      pts.forEach((p,k)=>{
        const v=Math.round((y0-p[1])/amp*9);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.5+k*0.22).toFixed(2)}s">`
          +`<text x="${32+k*32}" y="152" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${k%2?grn:cyan}">${(v>0?'+':'')+v}</text></g>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:.7s"><rect x="24" y="176" width="270" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(159,196,11.5,grn,'эта строка чисел — уже файл',{b:1})}</g>`;
      return s;
    }
    if(K==='sndfew'){ /* мало измерений — грубо */
      const y0=72, amp=30, n=4;
      const pts=sinePts(30,y0,258,amp,2,n);
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,red,'мало измерений — звук грубый',{b:1})}</g>`;
      s+=`<path d="${sineD(30,y0,258,amp,2,80)}" fill="none" stroke="${A}" stroke-width="1.8" opacity=".3"/>`;
      s+=`<path d="${stairD(pts)}" fill="none" stroke="${red}" stroke-width="3"/>`;
      pts.forEach(p=>{ s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4.6" fill="${red}"/>`; });
      s+=`<rect x="24" y="118" width="270" height="28" rx="8" fill="rgba(15,25,46,.97)" stroke="${red}" stroke-width="1.5"/>`;
      pts.forEach((p,k)=>{ const v=Math.round((y0-p[1])/amp*9);
        s+=`<text x="${70+k*62}" y="137" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${red}">${(v>0?'+':'')+v}</text>`; });
      s+=`<g class="${pre}Rise}" style="animation-delay:.4s"><rect x="24" y="158" width="270" height="30" rx="9" fill="rgba(255,120,100,.1)" stroke="${red}" stroke-width="1.7"/>`
        +`${tx(159,178,11.5,red,'вместо волны — ступеньки',{b:1})}</g>`;
      s+=`${tx(159,206,11,dim,'на слух: скрипучий, «металлический» звук',{})}`;
      return s;
    }
    if(K==='sndmore'){ /* много измерений — точно */
      const y0=72, amp=30, n=26;
      const pts=sinePts(30,y0,258,amp,2,n);
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,grn,'много измерений — звук точный',{b:1})}</g>`;
      s+=`<path d="${sineD(30,y0,258,amp,2,80)}" fill="none" stroke="${A}" stroke-width="1.8" opacity=".3"/>`;
      s+=`<path d="${stairD(pts)}" fill="none" stroke="${grn}" stroke-width="2.6"/>`;
      pts.filter((p,k)=>k%5===0).forEach(p=>{ s+=`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${grn}"/>`; });
      s+=`<g class="${pre}Rise}" style="animation-delay:.4s"><rect x="24" y="120" width="270" height="30" rx="9" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,140,11.5,grn,'ступеньки почти слились с волной',{b:1})}</g>`;
      s+=`${tx(159,170,11,dim,'звук получается чистым',{})}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="184" width="270" height="28" rx="8" fill="rgba(15,25,46,.97)" stroke="${cardB}" stroke-width="1.4"/>`
        +`${tx(159,203,11,dim,'точек больше — и разница не слышна',{})}</g>`;
      return s;
    }
    if(K==='sndrate'){ /* частота дискретизации */
      const rows=[{n:'телефонный звонок',v:8000,c:cyan,w:40},{n:'музыка в наушниках',v:22050,c:gold,w:110},{n:'диск CD',v:44100,c:grn,w:190}];
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'сколько раз в секунду измеряют',{b:1})}</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*48;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14*k).toFixed(2)}s">`
          +fit(24,y+16,11.5,q.c,q.n,{an:'start',b:1},140)
          +`<rect x="24" y="${y+24}" width="${Math.min(q.w,266)}" height="18" rx="6" fill="${q.c}" opacity=".26" stroke="${q.c}" stroke-width="1.3"/>`
          +fit(24+Math.min(q.w,266)+6,y+38,11.5,q.c,q.v.toLocaleString('ru-RU'),{an:'start',b:1},60)
          +`</g>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:.5s"><rect x="24" y="196" width="270" height="28" rx="8" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.6"/>`
        +`${tx(159,215,11,grn,'это и есть частота дискретизации',{b:1})}</g>`;
      return s;
    }
    if(K==='sndlevels'){ /* уровни громкости */
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'сколько оттенков громкости',{b:1})}</g>`;
      [[26,'8 бит','256 уровней',cyan],[176,'16 бит','65 536 уровней',grn]].forEach((q,k)=>{
        const x=q[0];
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.2).toFixed(2)}s">`
          +`<rect x="${x}" y="52" width="116" height="96" rx="9" fill="rgba(15,25,46,.97)" stroke="${q[3]}" stroke-width="1.8"/>`;
        for(let i=0;i<16;i++){
          const y=56+i*5.6, op=0.15+i/16*0.8;
          s+=`<rect x="${x+8}" y="${y.toFixed(1)}" width="100" height="4" fill="${q[3]}" opacity="${op.toFixed(2)}"/>`;
        }
        s+=`${tx(x+58,164,11.5,q[3],q[1],{b:1})}${tx(x+58,182,10,dim,q[2],{})}</g>`;
      });
      s+=`${tx(159,206,11,dim,'чем больше бит, тем плавнее громкость',{})}`;
      return s;
    }
    if(K==='sndsize'){ /* размер файла */
      const steps=[{t:'44 100 измерений в секунду',c:cyan},{t:'× 16 бит на измерение',c:blu},{t:'× 2 канала (стерео)',c:gold},{t:'= 1 411 200 бит в секунду',c:grn}];
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'считаем размер звукового файла',{b:1})}</g>`;
      steps.forEach((q,k)=>{
        const y=48+k*38;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.18+k*0.2).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="270" height="30" rx="9" fill="rgba(15,25,46,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +fit(159,y+20,12,q.c,q.t,{b:1},250)+`</g>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:1s"><rect x="24" y="204" width="270" height="30" rx="9" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,224,11.5,gold,'за минуту — почти 10 мегабайт!',{b:1})}</g>`;
      return s;
    }
    if(K==='sndstereo'){ /* два канала */
      const y0=76, amp=22, n=8;
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'стерео: два уха — два числа',{b:1})}</g>`;
      s+=`<path d="${sineD(38,y0,112,amp,2,40)}" fill="none" stroke="${blu}" stroke-width="2.6"/>`
        +`${tx(94,52,11,blu,'левый канал',{b:1})}`;
      s+=`<path d="${sineD(168,y0,112,amp,2.6,40)}" fill="none" stroke="${pur}" stroke-width="2.6"/>`
        +`${tx(224,52,11,pur,'правый канал',{b:1})}`;
      s+=`<rect x="24" y="112" width="270" height="26" rx="8" fill="rgba(15,25,46,.97)" stroke="${cardB}" stroke-width="1.4"/>`;
      for(let k=0;k<n;k++){
        const x=36+k*33;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.15).toFixed(2)}s">`
          +`<text x="${x}" y="130" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${blu}">${(k%3?4:-6)+k%5}</text>`
          +`<text x="${x+13}" y="130" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${pur}">${(k%4?3:-7)+k%4}</text></g>`;
      }
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="152" width="270" height="30" rx="9" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.7"/>`
        +`${tx(159,172,11.5,gold,'на каждое измерение — два числа',{b:1})}</g>`;
      s+=`${tx(159,200,11,dim,'файл становится в два раза больше',{})}`;
      return s;
    }
    if(K==='sndpipe'){ /* путь звука */
      const stn=[{t:'микрофон',c:cyan},{t:'измерения',c:gold},{t:'числа',c:blu},{t:'файл',c:grn},{t:'колонка',c:pur}];
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'путь звука в компьютере',{b:1})}</g>`;
      stn.forEach((q,k)=>{
        const y=52+k*36;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14*k).toFixed(2)}s">`
          +`<rect x="52" y="${y}" width="214" height="28" rx="9" fill="rgba(15,25,46,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +fit(159,y+19,12,q.c,q.t,{b:1},190)+`</g>`;
        if(k<stn.length-1) s+=`<path d="M159 ${y+30} v4" stroke="${A}" stroke-width="1.6"/><path d="M155 ${y+30} l4 4 l4 -4" fill="none" stroke="${A}" stroke-width="1.6"/>`;
      });
      s+=`<circle r="5" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M159 66 V238"/></circle>`;
      s+=`${tx(159,252,10.5,dim,'микрофон → числа → файл → звук',{})}`;
      return s;
    }
    if(K==='sndmp3'){ /* сжатие звука */
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'сжатие: убираем лишнее',{b:1})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.15s">`
        +`${tx(28,60,11.5,cyan,'без сжатия',{an:'start',b:1})}`
        +`<rect x="28" y="68" width="262" height="24" rx="8" fill="${cyan}" opacity=".24" stroke="${cyan}" stroke-width="1.4"/>`
        +`${tx(159,85,11,cyan,'10 мегабайт',{b:1})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.4s">`
        +`${tx(28,120,11.5,grn,'mp3',{an:'start',b:1})}`
        +`<rect x="28" y="128" width="54" height="24" rx="8" fill="${grn}" opacity=".26" stroke="${grn}" stroke-width="1.4"/>`
        +`<text x="88" y="145" font-size="11" font-weight="bold" fill="${grn}">1 мегабайт</text></g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="170" width="270" height="46" rx="10" fill="rgba(125,224,160,.1)" stroke="${grn}" stroke-width="1.7"/>`
        +`${tx(159,190,11,grn,'убираем то, что человек почти не слышит',{b:1})}`
        +`${tx(159,206,10.5,dim,'поэтому музыку слушают в mp3',{})}</g>`;
      return s;
    }
    if(K==='sndanalog'){ /* пластинка и компьютер */
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'непрерывно и по точкам',{b:1})}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.15s">`
        +`<rect x="20" y="48" width="130" height="112" rx="10" fill="rgba(15,25,46,.95)" stroke="${gold}" stroke-width="1.7"/>`
        +fit(85,68,11,gold,'пластинка',{b:1},110)
        +`<path d="${sineD(28,110,114,20,2,80)}" fill="none" stroke="${gold}" stroke-width="2.8"/>`
        +fit(85,148,10,dim,'волна непрерывная',{},112)+`</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.35s">`
        +`<rect x="168" y="48" width="130" height="112" rx="10" fill="rgba(15,25,46,.95)" stroke="${grn}" stroke-width="1.7"/>`
        +fit(233,68,11,grn,'компьютер',{b:1},110)
        +`<path d="${sineD(176,110,114,20,2,80)}" fill="none" stroke="${grn}" stroke-width="1.4" opacity=".35"/>`
        +`<path d="${stairD(sinePts(176,110,114,20,2,10))}" fill="none" stroke="${grn}" stroke-width="2.6"/>`
        +fit(233,148,10,dim,'только точки',{},112)+`</g>`;
      s+=`${tx(159,182,11,dim,'у цифры звук собран из измерений',{})}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.6s"><rect x="24" y="194" width="270" height="28" rx="8" fill="rgba(255,215,106,.1)" stroke="${gold}" stroke-width="1.6"/>`
        +`${tx(159,213,11,gold,'чаще измеряем — ближе к настоящему',{b:1})}</g>`;
      return s;
    }
    if(K==='sndgame'){ /* интерактив: где запись точнее */
      const tiles=[{n:4,t:'4 измерения',c:red},{n:12,t:'12 измерений',c:gold},{n:40,t:'40 измерений',c:grn}];
      const sel=(st&&typeof st.pick==='number')?st.pick:-1, ok=2, done=(sel>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="12" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,32,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Где звук записан точнее?',{b:1})}</g>`;
      tiles.forEach((q,k)=>{
        const x=16+k*96, good=(k===ok), on=(done&&k===ok), bad=(done&&sel===k&&!good);
        const c=on?grn:(bad?red:q.c);
        const pts=sinePts(x+22,88,74,18,2,q.n);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="${x}" y="52" width="90" height="120" rx="10" fill="${on?'rgba(19,44,35,.97)':(bad?'rgba(52,22,26,.97)':'rgba(15,25,46,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.4:1.7}"/>`
          +`<path d="${sineD(x+22,88,74,18,2,80)}" fill="none" stroke="${c}" stroke-width="1.2" opacity=".3"/>`
          +`<path d="${stairD(pts)}" fill="none" stroke="${c}" stroke-width="2.4"/>`
          +fit(x+45,146,10.5,c,q.t,{},84)
          +(on?`<path d="M${x+70} 64 l5 6 l11 -13" fill="none" stroke="${grn}" stroke-width="2.6"/>`:'')
          +`</g>`;
      });
      const by=184;
      if(done) s+=`<g class="${pre}Pop"><rect x="24" y="${by}" width="270" height="30" rx="9" fill="${sel===ok?'rgba(125,224,160,.12)':'rgba(255,120,100,.1)'}" stroke="${sel===ok?grn:red}" stroke-width="1.7"/>`
        +`${tx(159,by+20,11,sel===ok?grn:red,sel===ok?'Верно! Чем больше измерений, тем точнее':'Нет: смотри, где ступеньки ровнее',{b:1})}</g>`;
      else s+=`<g class="${pre}Rise}"><rect x="24" y="${by}" width="270" height="30" rx="9" fill="rgba(15,25,46,.95)" stroke="${A}" stroke-width="1.5" stroke-opacity=".5"/>`
        +`${tx(159,by+20,11,dim,'нажми на самую точную запись',{})}</g>`;
      return s;
    }
    if(K==='sndmistakes'){ /* частые ошибки */
      const it=(v.items||[
        {t:'думал, что компьютер хранит волну', f:'он хранит только числа-измерения'},
        {t:'забыл про два канала', f:'в стерео чисел в два раза больше'},
        {t:'спутал высоту звука и частоту измерений', f:'это разные вещи'}
      ]);
      let s='';
      it.forEach((q,k)=>{
        const y=20+k*54;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14+k*0.16).toFixed(2)}s" filter="url(#${pre}sh)">`
          +`<rect x="16" y="${y}" width="286" height="46" rx="11" fill="url(#${pre}card)" stroke="${red}" stroke-width="2"/>`
          +`<path d="M36 ${y+12} l12 20 h-24 z" fill="${red}" opacity=".9"/><text x="36" y="${y+28}" text-anchor="middle" font-size="11" font-weight="bold" fill="#241016">!</text>`
          +fit(62,y+20,Math.min(11,206/Math.max(1,q.t.length)/0.72),red,q.t,{an:'start',b:1},206)
          +`<path d="M62 ${y+30} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +fit(84,y+40,Math.min(11,186/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'},186)+`</g>`;
      });
      s+=`${tx(159,20+it.length*54+4,11,dim,'эти ошибки встречаются чаще всего',{})}`;
      return s;
    }
    if(K==='sndvoice'){ /* примеры */
      const ex=(v.ex||[{t:'голосовое сообщение',d:'1 минута ≈ 5 МБ',c:cyan},{t:'музыка в плеере',d:'mp3 ≈ 1 МБ',c:grn},{t:'звонок по телефону',d:'8000 измерений',c:gold}]);
      let s=`<g class="${pre}Pop"><rect x="24" y="12" width="270" height="26" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.7"/>`
        +`${tx(159,30,11.5,ink,'где мы встречаем звук',{b:1})}</g>`;
      ex.forEach((q,k)=>{
        const y=48+k*46;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.14*k).toFixed(2)}s">`
          +`<rect x="20" y="${y}" width="278" height="38" rx="10" fill="rgba(15,25,46,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(60,y+18,11.5,q.c,q.t,{an:'start',b:1},150)
          +fit(60,y+32,10.5,dim,q.d,{an:'start'},150)
          +`<path d="${sineD(220,y+10,70,9,2,40)}" fill="none" stroke="${q.c}" stroke-width="2" opacity=".85"/></g>`;
      });
      s+=`${tx(159,48+ex.length*46+4,11,dim,'звук всюду вокруг нас — и всюду числа',{})}`;
      return s;
    }
    if(K==='movetask'){ /* как получается движение */
      let s=`<g class="${pre}Pop"><rect x="26" y="14" width="266" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,34,12.5,gold,'почему на экране движение?',{b:1})}</g>`;
      const cx=[56,110,164,218,272];
      for(let k=0;k<5;k++){
        s+=drawRR(cx[k]-24,58,48,92,10,A,2.2,0.15+k*0.16,1.6,pre);
        s+=`<circle class="${pre}Pop" style="animation-delay:${(0.6+k*0.16).toFixed(2)}s" cx="${cx[k]}" cy="${128-k*16}" r="11" fill="${gold}" stroke="#fffdf2" stroke-width="1.4"/>`;
      }
      s+=`${fit(159,168,11.5,dim,'в каждом кадре мяч стоит на новом месте',{},290)}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.9s"><rect x="24" y="184" width="270" height="30" rx="9" fill="rgba(255,255,255,.05)" stroke="${gold}" stroke-width="1.6"/>`
        +`${fit(159,204,11.5,gold,'а показывают их очень быстро',{},260)}</g>`;
      return s;
    }
    if(K==='flipbook'){ /* блокнот-мультик */
      let s=`<g class="${pre}Pop"><rect x="20" y="14" width="278" height="30" rx="10" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="2"/>`
        +`${tx(159,34,12.5,cyan,'быстро листаем — рисунок оживает',{b:1})}</g>`;
      s+=drawRR(52,58,214,150,12,cardB,2.6,0.2,2,pre);
      for(let k=0;k<4;k++){
        const op=`0;0;1;1;0;0`, t=(k*0.25).toFixed(3), t2=Math.min(1,(k+1)*0.25).toFixed(3);
        s+=`<g opacity="0"><animate attributeName="opacity" values="${op}" keyTimes="0;${t};${t};${t2};${t2};1" dur="4s" repeatCount="indefinite"/>`
          +walker(159,150,1,['#7fd6ff','#7de0a0','#ffd76a','#b07fff'][k],k)
          +`</g>`;
      }
      s+=`<g class="${pre}Pop" style="animation-delay:1.2s"><rect x="196" y="70" width="58" height="126" rx="8" fill="rgba(255,255,255,.05)" stroke="${cyan}" stroke-width="1.6" opacity=".7"/>`
        +fit(225,200,10,dim,'страницы',{},54)+`</g>`;
      s+=plate2(24,216,270,28,cyan,'много кадров подряд = мультик',11,pre);
      return s;
    }
    if(K==='frame'){ /* что такое кадр */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${tx(159,34,12.5,ink,'кадр — это один рисунок',{b:1})}</g>`;
      s+=drawRR(84,58,150,120,14,A,3,0.2,2.2,pre,{pen:true});
      const mat=[[0,0,1,1,0,0],[0,1,1,1,1,0],[1,1,0,0,1,1],[0,1,0,0,1,0],[0,1,0,0,1,0],[0,0,1,1,0,0]];
      for(let r=0;r<6;r++)for(let c=0;c<6;c++){
        s+=`<rect class="${pre}Pop" style="animation-delay:${(0.6+(r*6+c)*0.03).toFixed(2)}s" x="${96+c*22}" y="${70+r*18}" width="20" height="16" rx="3" fill="${mat[r][c]?'#101828':'#eaf2ff'}"/>`;
      }
      s+=`${fit(159,196,11.5,dim,'в кадре — таблица пикселей',{},290)}`;
      s+=plate2(24,208,270,30,grn,'фильм — это очень много кадров',11.5,pre);
      return s;
    }
    if(K==='fps'){ /* что такое частота кадров */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,34,12.5,gold,'сколько кадров в секунду',{b:1})}</g>`;
      s+=drawRR(30,58,258,54,12,A,2.4,0.2,2,pre);
      s+=`${fit(159,80,12,ink,'1 секунда',{b:1},200)}`;
      for(let k=0;k<12;k++){
        s+=`<line class="${pre}Pop" style="animation-delay:${(0.5+k*0.08).toFixed(2)}s" x1="${42+k*20.5}" y1="88" x2="${42+k*20.5}" y2="104" stroke="${cyan}" stroke-width="2"/>`;
      }
      s+=`${fit(159,126,11,dim,'например, 24 кадра за одну секунду',{},290)}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:1.1s"><rect x="34" y="142" width="250" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.7"/>`
        +`${fit(159,164,12.5,gold,'это и есть частота кадров',{b:1},230)}</g>`;
      s+=plate2(24,186,270,30,grn,'обозначают «кадров в секунду»',11.5,pre);
      s+=`${fit(159,232,11,cyan,'2 кадра — рывки, 24 кадра — плавно',{b:1},290)}`;
      return s;
    }
    if(K==='slowfast'){ /* медленно и быстро */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'2 кадра в секунду и 24 кадра в секунду',{b:1},256)}</g>`;
      s+=fit(22,58,11,red,'мало кадров — рывки',{an:'start',b:1},140);
      for(let k=0;k<3;k++) s+=drawRR(24+k*44,66,38,40,8,red,2.2,0.2+k*0.15,1.5,pre);
      s+=`<circle r="9" fill="${red}"><animateMotion dur="2.4s" repeatCount="indefinite" path="M40 86 h${3*44-8}"/></circle>`;
      s+=fit(22,132,11,grn,'много кадров — плавно',{an:'start',b:1},150);
      for(let k=0;k<6;k++) s+=drawRR(24+k*44,140,38,40,8,grn,2.2,0.5+k*0.1,1.5,pre);
      s+=`<circle r="9" fill="${grn}"><animateMotion dur="2.4s" repeatCount="indefinite" path="M40 160 h${6*44-8}"/></circle>`;
      s+=plate2(22,192,274,30,go?grn:cardB,go?'24 кадра в секунду глаз видит как движение':'сравни две ленты кадров',11.5,pre);
      return s;
    }
    if(K==='eye'){ /* почему мы видим движение */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${pur}" stroke-width="2"/>`
        +`${tx(159,34,12.5,pur,'почему кадры превращаются в движение',{b:1})}</g>`;
      s+=`<path d="M56 108 q103 -54 206 0 q-103 54 -206 0 z" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="2.4"/>`;
      s+=`<circle cx="159" cy="108" r="17" fill="rgba(176,127,255,.25)" stroke="${pur}" stroke-width="2.2"/>`;
      s+=`<circle cx="159" cy="108" r="7" fill="${pur}"/>`;
      for(let k=0;k<3;k++){
        s+=`<circle r="9" fill="${gold}" opacity="0"><animate attributeName="opacity" values="0;0;.8;.8;0" keyTimes="0;${(0.1+k*0.2).toFixed(2)};${(0.2+k*0.2).toFixed(2)};${(0.35+k*0.2).toFixed(2)};1" dur="3s" repeatCount="indefinite"/>`
          +`<animateMotion dur="3s" repeatCount="indefinite" path="M60 168 H258"/></circle>`;
      }
      s+=`<path d="M60 168 H258" stroke="${A}" stroke-width="2" stroke-dasharray="6 5" opacity=".5"/>`;
      s+=fit(159,196,11.5,dim,'глаз ещё мгновение «держит» картинку',{},290);
      s+=plate2(24,210,270,30,go?grn:cardB,go?'поэтому мы видим плавное движение':'что происходит с глазом?',11.5,pre);
      return s;
    }
    if(K==='fpsvalues'){ /* где какая частота */
      const rows=[{t:'мультик, гифка',v:'10 кадров',w:52,c:cyan},{t:'кино',v:'24 кадра',w:96,c:gold},{t:'видео',v:'30 кадров',w:130,c:grn},{t:'игры',v:'60 кадров',w:200,c:pur}];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'сколько кадров в секунду бывает',{b:1},256)}</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*42;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.12*k).toFixed(2)}s">`
          +fit(22,y+18,11,q.c,q.t,{an:'start',b:1},120)
          +`<rect x="22" y="${y+26}" width="${q.w}" height="14" rx="6" fill="${q.c}" opacity=".28" stroke="${q.c}" stroke-width="1.2"/>`
          +`<text x="${28+q.w}" y="${y+38}" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${q.c}">${q.v}</text></g>`;
      });
      s+=plate2(22,228,274,28,go?grn:cardB,go?'чем больше кадров, тем плавнее картинка':'сравни частоты',11.5,pre);
      return s;
    }
    if(K==='framescount'){ /* сколько кадров в минуте */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,gold,'считаем кадры в мультфильме',{b:1},256)}</g>`;
      const steps=[{t:'24 кадра в секунду',c:cyan},{t:'× 60 секунд в минуте',c:blu},{t:'= 1440 кадров',c:grn}];
      steps.forEach((q,k)=>{
        const y=54+k*44;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s"><rect x="30" y="${y}" width="258" height="34" rx="10" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(159,y+22,12.5,q.c,q.t,{b:1},236)+`</g>`;
        if(k<2) s+=`<path d="M159 ${y+36} v6" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/>`;
      });
      s+=plate2(30,196,258,30,go?grn:cardB,go?'за минуту — 1440 кадров':'сколько кадров получится?',11.5,pre);
      s+=`${fit(159,244,11.5,dim,'поэтому фильмы занимают много места',{},290)}`;
      return s;
    }
    if(K==='framepixels'){ /* кадр — это пиксели */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'в кадре — сетка пикселей',{b:1},256)}</g>`;
      const mat=[[0,0,1,1,0,0],[0,1,0,0,1,0],[1,0,0,0,0,1],[1,0,0,0,0,1],[0,1,0,0,1,0],[0,0,1,1,0,0]];
      for(let r=0;r<6;r++)for(let c=0;c<6;c++){
        s+=`<rect x="${34+c*24}" y="${50+r*24}" width="22" height="22" rx="3" fill="${mat[r][c]?'#101828':'#eaf2ff'}" stroke="#c8d4ee" stroke-width=".8"/>`;
      }
      s+=`${tx(220,90,12,cyan,'1 кадр',{b:1})}`;
      s+=`${fit(220,116,10.5,dim,'сотни тысяч',{},70)}`;
      s+=`${fit(220,132,10.5,dim,'пикселей',{},70)}`;
      s+=plate2(24,206,270,30,grn,'и всё это надо хранить для каждого кадра',11,pre);
      s+=`${fit(159,254,11,dim,'поэтому видео сжимают',{},290)}`;
      return s;
    }
    if(K==='vidres'){ /* разрешение кадра */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'чем больше кадр, тем тяжелее видео',{b:1},256)}</g>`;
      s+=drawRR(24,52,122,72,10,cyan,2.4,0.2,1.8,pre)+drawRR(172,52,122,72,10,pur,2.4,0.4,1.8,pre);
      s+=fit(85,80,11.5,cyan,'640 × 360',{b:1},110)+fit(233,80,11.5,pur,'1920 × 1080',{b:1},110);
      s+=fit(85,102,10.5,dim,'230 тысяч пикселей',{},116)+fit(233,102,10.5,dim,'2 миллиона пикселей',{},116);
      s+=`<g class="${pre}Rise}" style="animation-delay:.7s"><rect x="24" y="140" width="270" height="32" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.7"/>`
        +`${fit(159,161,11.5,pur,'в 9 раз больше пикселей — и файл тяжелее',{b:1},250)}</g>`;
      s+=plate2(24,182,270,30,go?grn:cardB,go?'разрешение показывает размер кадра':'сравни два кадра',11.5,pre);
      s+=`${fit(159,234,11,dim,'поэтому у больших видео огромный размер',{},290)}`;
      return s;
    }
    if(K==='vidsize'){ /* размер видео */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,red,'почему видео такое большое',{b:1},256)}</g>`;
      const steps=[{t:'один кадр ≈ 6 мегабайт',c:cyan},{t:'× 30 кадров в секунду',c:blu},{t:'= 180 мегабайт в секунду!',c:red}];
      steps.forEach((q,k)=>{
        const y=54+k*44;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s"><rect x="30" y="${y}" width="258" height="34" rx="10" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(159,y+22,12.5,q.c,q.t,{b:1},236)+`</g>`;
        if(k<2) s+=`<path d="M159 ${y+36} v6" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/>`;
      });
      s+=plate2(30,196,258,30,go?grn:cardB,go?'поэтому видео всегда сжимают':'что получится?',11.5,pre);
      s+=`${fit(159,244,11.5,grn,'в сжатом видео файл в сотни раз меньше',{b:1},290)}`;
      return s;
    }
    if(K==='vidsound'){ /* видео и звук */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'видео — это кадры и звук вместе',{b:1},256)}</g>`;
      for(let k=0;k<4;k++) s+=drawRR(30+k*42,52,36,40,7,cyan,2.2,0.2+k*0.12,1.6,pre);
      s+=fit(30,106,10.5,cyan,'картинка',{an:'start',b:1},90);
      s+=`<path d="M148 72 h20" stroke="${A}" stroke-width="2"/><path d="M162 68 l6 4 l-6 4" fill="none" stroke="${A}" stroke-width="2"/>`;
      for(let k=0;k<3;k++) s+=`<path d="M182 ${60+k*12} q9 -10 18 0 q9 10 18 0 q9 -10 18 0" fill="none" stroke="${grn}" stroke-width="2.2"/>`;
      s+=fit(226,106,10.5,grn,'звук',{b:1},70);
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="24" y="122" width="270" height="32" rx="10" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.7"/>`
        +`${fit(159,143,11.5,grn,'звук хранится отдельно — как в уроке про звук',{b:1},250)}</g>`;
      s+=plate2(24,166,270,30,go?grn:cardB,go?'плеер показывает кадры и играет звук':'из чего состоит видео?',11.5,pre);
      s+=`${fit(159,218,11,dim,'поэтому видеофайл больше, чем просто картинки',{},290)}`;
      return s;
    }
    if(K==='changes'){ /* храним только изменения */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'сжатие: храним только изменения',{b:1},256)}</g>`;
      const draw=(x0,y0,ball,hl)=>{
        let s2=drawRR(x0,y0,126,92,10,cardB,2.2,0.2,1.6,pre);
        for(let k=0;k<3;k++) s2+=`<rect x="${x0+8+k*40}" y="${y0+64}" width="36" height="20" rx="4" fill="rgba(255,255,255,.05)"/>`;
        s2+=`<circle cx="${x0+30+ball}" cy="${y0+56}" r="10" fill="${gold}" stroke="#fffdf2" stroke-width="1.3"/>`;
        if(hl) s2+=drawRR(x0+18+ball,y0+42,26,28,6,red,2,0.7,2,pre);
        return s2;
      };
      s+=draw(24,50,0,false)+draw(168,50,66,true);
      s+=fit(87,60,10.5,dim,'кадр 1',{},80)+fit(231,60,10.5,dim,'кадр 2',{},80);
      s+=`<g class="${pre}Rise}" style="animation-delay:.9s"><rect x="24" y="152" width="270" height="34" rx="10" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.7"/>`
        +`${fit(159,175,11.5,red,'изменилась только рамка вокруг мяча',{b:1},250)}</g>`;
      s+=plate2(24,194,270,30,go?grn:cardB,go?'её и записываем, а остальное берём из кадра 1':'что изменилось?',11.5,pre);
      s+=`${fit(159,246,11,dim,'так видео становится во много раз меньше',{},290)}`;
      return s;
    }
    if(K==='keyframe'){ /* опорные кадры */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'опорные кадры простыми словами',{b:1},256)}</g>`;
      const pos=[{x:46,k:1},{x:118,k:0},{x:190,k:0},{x:262,k:1}];
      pos.forEach((q,i)=>{
        s+=drawRR(q.x-26,52,52,74,9,q.k?cyan:cardB,q.k?2.6:1.8,0.2+i*0.2,q.k?2:1.4,pre,{pen:!!q.k});
        s+=`<circle cx="${q.x}" cy="${88-i*8}" r="9" fill="${q.k?gold:dim}" stroke="#fffdf2" stroke-width="1.2"/>`;
        s+=fit(q.x,140,10,q.k?cyan:dim,q.k?'опорный':'достроен',{},60);
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:1.1s"><rect x="24" y="156" width="270" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.7"/>`
        +`${fit(159,179,11.5,cyan,'опорные кадры хранят полностью, остальные — достраивают',{b:1},250)}</g>`;
      s+=plate2(24,198,270,30,go?grn:cardB,go?'так экономят место в видеофайле':'зачем опорные кадры?',11.5,pre);
      s+=`${fit(159,250,11,dim,'это и есть сжатие видео',{},290)}`;
      return s;
    }
    if(K==='vformats'){ /* форматы */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'где встречаются видео и мультики',{b:1},256)}</g>`;
      s+=drawRR(22,50,132,110,12,cyan,2.4,0.2,1.9,pre);
      s+=fit(88,74,11.5,cyan,'гифка (gif)',{b:1},120);
      s+=`${fit(88,96,10.5,dim,'короткий мультик',{},116)}`;
      s+=`${fit(88,114,10.5,dim,'без звука',{},116)}`;
      s+=`${fit(88,138,10.5,grn,'повторяется по кругу',{},116)}`;
      s+=drawRR(164,50,132,110,12,grn,2.4,0.4,1.9,pre);
      s+=fit(230,74,11.5,grn,'фильм (mp4)',{b:1},120);
      s+=`${fit(230,96,10.5,dim,'кадры и звук',{},116)}`;
      s+=`${fit(230,114,10.5,dim,'сжатый — потому и',{},116)}`;
      s+=`${fit(230,132,10.5,dim,'помещается в телефон',{},116)}`;
      s+=plate2(22,174,274,30,go?grn:cardB,go?'гифка — мультик, mp4 — фильм':'чем они отличаются?',11.5,pre);
      s+=`${fit(159,226,11,dim,'и там, и там — быстрая смена кадров',{},290)}`;
      return s;
    }
    if(K==='slowmo'){ /* замедление */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'зачем снимают с большой частотой',{b:1},256)}</g>`;
      s+=drawRR(24,50,270,44,10,cardB,2.4,0.2,1.8,pre);
      for(let k=0;k<20;k++) s+=`<line x1="${34+k*13}" y1="58" x2="${34+k*13}" y2="86" stroke="${pur}" stroke-width="1.4" opacity=".8"/>`;
      s+=fit(159,110,11.5,pur,'240 кадров в секунду — очень много',{b:1},260);
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="24" y="126" width="270" height="32" rx="10" fill="rgba(255,255,255,.05)" stroke="${pur}" stroke-width="1.5"/>`
        +`${fit(159,147,11.5,ink,'при замедлении кадров хватает — движение плавное',{b:1},250)}</g>`;
      s+=plate2(24,168,270,30,go?grn:cardB,go?'поэтому в слоумо можно рассмотреть всё':'что даёт много кадров?',11.5,pre);
      s+=`${fit(159,220,11,dim,'если кадров мало, замедленное видео дёргается',{},290)}`;
      return s;
    }
    if(K==='practice1'){ /* практика: кадры */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,gold,'задача: 5 секунд при 24 кадрах в секунду',{b:1},256)}</g>`;
      s+=fit(159,70,13,ink,'сколько всего кадров?',{b:1},250);
      s+=drawRR(40,86,238,40,10,cardB,2.4,0.3,1.8,pre);
      s+=`<text x="159" y="112" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">24 · 5 = ?</text>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="66" y="136" width="186" height="38" rx="10" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`<text x="159" y="162" text-anchor="middle" font-size="16" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">24 · 5 = 120</text></g>`;
      s+=plate2(24,186,270,30,go?grn:cardB,go?'120 кадров за пять секунд':'как посчитать?',12,pre);
      s+=`${fit(159,238,11.5,dim,'кадры в секунду умножаем на секунды',{},290)}`;
      return s;
    }
    if(K==='practice2'){ /* практика: мультик */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,cyan,'мультик: 10 секунд, 10 кадров в секунду',{b:1},256)}</g>`;
      const st2=[{t:'10 кадров · 10 секунд = 100 кадров',c:cyan},{t:'а при 24 к/с: 24 · 10 = 240',c:gold},{t:'чем больше кадров — тем плавнее',c:grn}];
      st2.forEach((q,k)=>{
        const y=52+k*40;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s"><rect x="26" y="${y}" width="266" height="32" rx="10" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(159,y+21,11.5,q.c,q.t,{b:1},244)+`</g>`;
      });
      s+=plate2(26,180,266,30,go?grn:cardB,go?'100 кадров против 240':'сколько кадров получится?',11.5,pre);
      s+=`${fit(159,232,11,dim,'одна и та же сцена — разное число кадров',{},290)}`;
      return s;
    }
    if(K==='vidgame'){ /* интерактив: кадры */
      const opts=['72','27','24'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${fit(159,34,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Сколько кадров?',{b:1})}</g>`;
      s+=drawRR(40,54,238,44,10,cardB,2.4,0.2,1.8,pre);
      s+=`<text x="159" y="82" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">24 · 3 = ?</text>`;
      opts.forEach((t,k)=>{
        const x=34+k*84, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="${x}" y="116" width="76" height="44" rx="11" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +tx(x+38,145,19,c,t,{b:on})+(on?`<path d="M${x+56} 126 l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=176;
      const msg=done?(st.pick===ok?'Верно! 24 · 3 = 72 кадра':(st.pick===1?'Почти: 24 · 3, а не 24 + 3':'Запомни: кадры в секунду умножаем на секунды')):'Нажми на ответ';
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="${done?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done?grn:A}" stroke-width="1.7"/>`
        +`${fit(159,by+20,Math.min(11.5,260/Math.max(1,msg.length)/0.72),done?(st.pick===ok?grn:red):dim,msg,{b:done})}</g>`;
      return s;
    }
    if(K==='vidgame2'){ /* интерактив: мало кадров */
      const opts=['движение будет рывками','движение станет плавнее','видео исчезнет'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${fit(159,34,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Что будет, если кадров мало?',{b:1})}</g>`;
      opts.forEach((t,k)=>{
        const y=58+k*42, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="24" y="${y}" width="270" height="34" rx="10" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +fit(159,y+22,12,on?grn:(bad?red:ink),t,{b:on},240)+(on?`<path d="M262 ${y+10} l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=190;
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.7"/>`
        +`${fit(159,by+20,11,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! Кадров мало — движение дёргается':'Сравни: 2 кадра и 24 кадра',{b:done&&st.pick===ok},258)}</g>`;
      return s;
    }
    if(K==='vidsum'){ /* карта темы */
      const nodes=[{x:159,y:52,t:'кадры',c:cyan},{x:60,y:128,t:'частота',c:gold},{x:258,y:128,t:'размер',c:red},
        {x:60,y:206,t:'сжатие',c:pur},{x:258,y:206,t:'звук',c:grn}];
      const ed=[[0,1],[0,2],[1,3],[2,4],[1,4],[3,4]];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'вся тема на одной карте',{b:1},256)}</g>`;
      ed.forEach((e,k)=>{
        const a=nodes[e[0]], b=nodes[e[1]];
        s+=drawLL(a,b,'#415a6a',1.6,0.1+k*0.12,2,pre);
      });
      nodes.forEach((n,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.14).toFixed(2)}s">`
          +`<rect x="${n.x-48}" y="${n.y-15}" width="96" height="30" rx="9" fill="rgba(12,32,34,.97)" stroke="${n.c}" stroke-width="1.9"/>`
          +fit(n.x,n.y+5,11.5,n.c,n.t,{b:1},88)+`</g>`;
      });
      s+=`<circle r="6" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M159 52 L60 128 L60 206 L258 206 L258 128 L159 52"/></circle>`;
      s+=plate2(22,240,274,28,go?grn:cardB,go?'кадры → частота → размер → сжатие и звук':'как связана тема',11.5,pre);
      return s;
    }
    if(K==='vtheory'){ /* теория словами */
      const it=[
        {t:'кадр — один рисунок',d:'из кадров состоит любое видео',c:cyan},
        {t:'частота — кадров в секунду',d:'24 кадра в секунду — как в кино',c:gold},
        {t:'размер — кадры · пиксели',d:'поэтому файлы большие',c:red},
        {t:'сжатие — храним изменения',d:'и видео помещается в телефон',c:pur}
      ];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'четыре главные мысли о видео',{b:1},256)}</g>`;
      it.forEach((q,k)=>{
        const y=52+k*44;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.12*k).toFixed(2)}s"><rect x="26" y="${y}" width="266" height="36" rx="10" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +`<circle cx="46" cy="${y+18}" r="11" fill="rgba(255,255,255,.05)" stroke="${q.c}" stroke-width="1.4"/>`
          +tx(46,y+23,11.5,q.c,''.concat(k+1),{b:1})
          +fit(172,y+17,11.5,q.c,q.t,{b:1},200)
          +fit(172,y+31,10,dim,q.d,{},214)+`</g>`;
        s+=drawLL({x:26,y:y+36},{x:292,y:y+36},q.c,2,0.3+k*0.2,1.8,pre);
      });
      s+=plate2(26,232,266,28,go?grn:cardB,go?'эти четыре мысли — основа урока':'запомни четыре мысли',11.5,pre);
      return s;
    }
    if(K==='vpractice3'){ /* практика: игры */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,pur,'задача: игра, 60 кадров в секунду, 3 секунды',{b:1},256)}</g>`;
      s+=fit(159,70,12.5,ink,'сколько кадров нарисует компьютер?',{b:1},250);
      s+=drawRR(40,88,238,40,10,cardB,2.4,0.3,1.8,pre);
      s+=`<text x="159" y="114" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${pur}">60 · 3 = ?</text>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="66" y="138" width="186" height="38" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.8"/>`
        +`<text x="159" y="164" text-anchor="middle" font-size="16" font-family="'Courier New',monospace" font-weight="bold" fill="${pur}">60 · 3 = 180</text></g>`;
      s+=plate2(24,188,270,30,go?grn:cardB,go?'180 кадров — вот почему нужна мощная видеокарта':'как посчитать?',11.5,pre);
      s+=`${fit(159,240,11.5,dim,'чем больше кадров, тем плавнее игра',{},290)}`;
      return s;
    }
    if(K==='vcheck'){ /* проверь себя */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,grn,'что мы узнали о видео',{b:1},256)}</g>`;
      const qa=[['из чего состоит видео?','из кадров'],['что такое 24 кадра в секунду?','частота кадров'],['почему файлы большие?','много кадров и пикселей'],['как уменьшают размер?','сжимают: хранят изменения']];
      qa.forEach((q,k)=>{
        const y=52+k*38, shown=(st&&st.q)>k;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.12*k).toFixed(2)}s"><rect x="24" y="${y}" width="270" height="32" rx="9" fill="rgba(255,255,255,.04)" stroke="${shown?grn:A}" stroke-width="1.6"/>`
          +fit(92,y+21,10.5,ink,q[0],{},140)
          +(shown?fit(232,y+21,11,grn,q[1],{b:1},120):fit(232,y+21,10,dim,'нажми «ответ»',{},110))+`</g>`;
      });
      s+=plate2(24,206,270,30,go?grn:cardB,go?'все четыре ответа на месте':'проверь себя устно',11.5,pre);
      return s;
    }
    if(K==='nettask'){ /* как доходит сообщение */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,34,12.5,gold,'как сообщение доходит до друга?',{b:1})}</g>`;
      s+=drawRR(28,60,64,44,10,cyan,2.4,0.2,1.9,pre);
      s+=`${fit(60,88,10.5,cyan,'твой',{},54)}${fit(60,102,10.5,cyan,'компьютер',{},58)}`;
      s+=drawRR(228,60,64,44,10,grn,2.4,0.35,1.9,pre);
      s+=`${fit(260,88,10.5,grn,'друг',{},50)}${fit(260,102,10.5,grn,'далеко',{},50)}`;
      s+=drawLL({x:92,y:82},{x:228,y:82},cardB,2,1.2,0.5,pre);
      for(let k=0;k<3;k++){
        s+=`<g><animateMotion dur="4s" begin="${(0.8+k*0.35).toFixed(2)}s" repeatCount="indefinite" path="M92 82 H228"/>`
          +`<rect x="-15" y="-9" width="30" height="18" rx="4" fill="rgba(19,60,44,.97)" stroke="${gold}" stroke-width="1.5"/>`
          +`<text x="0" y="4" text-anchor="middle" font-size="9.5" font-weight="bold" fill="${gold}">часть ${k+1}</text></g>`;
      }
      s+=`<circle class="${pre}Pop" cx="159" cy="82" r="15" fill="rgba(255,215,106,.16)" stroke="${gold}" stroke-width="2"/>`;
      s+=`${fit(159,128,11,dim,'сообщение идёт через сеть',{},250)}`;
      s+=plate2(24,144,270,30,go?grn:cardB,go?'его делят на части — пакеты':'что происходит с сообщением?',11.5,pre);
      s+=`${fit(159,196,11.5,ink,'по пути части идут разными дорогами',{b:1},290)}`;
      return s;
    }
    if(K==='network'){ /* что такое сеть */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,33,12,cyan,'сеть — это соединённые компьютеры',{b:1},250)}</g>`;
      const N=[{x:60,y:74,t:1},{x:159,y:56,t:2},{x:258,y:74,t:3},{x:110,y:150,t:4},{x:210,y:150,t:5}];
      const E=[[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,4]];
      E.forEach((e,k)=>{
        s+=drawLL({x:N[e[0]].x,y:N[e[0]].y},{x:N[e[1]].x,y:N[e[1]].y},cardB,2,1.8,0.2+k*0.16,pre);
      });
      N.forEach((n,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.6+k*0.12).toFixed(2)}s">`
          +`<circle cx="${n.x}" cy="${n.y}" r="15" fill="rgba(12,32,34,.97)" stroke="${cyan}" stroke-width="2"/>`
          +tx(n.x,n.y+5,13,cyan,''+n.t,{b:1})+`</g>`;
      });
      s+=`<circle r="5" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M60 74 L159 56 L258 74 L210 150 L110 150 Z"/></circle>`;
      s+=plate2(24,180,270,30,go?grn:cardB,go?'у каждого компьютера есть номер в сети':'что общего у этих устройств?',11.5,pre);
      s+=`${fit(159,232,11,dim,'данные бегут по линиям связи',{},290)}`;
      return s;
    }
    if(K==='localnet'){ /* локальная сеть */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'домашняя и школьная сеть',{b:1},256)}</g>`;
      s+=drawRR(112,54,94,40,10,gold,2.6,0.2,2,pre);
      s+=`${fit(159,80,11.5,gold,'роутер',{b:1},80)}`;
      const dev=[{x:42,y:66,t:'ноутбук',c:cyan},{x:42,y:150,t:'телефон',c:grn},{x:276,y:66,t:'телевизор',c:pur},{x:276,y:150,t:'планшет',c:blu}];
      dev.forEach((q,k)=>{
        s+=drawRR(q.x-40,q.y-16,80,32,8,q.c,2.4,0.5+k*0.2,1.8,pre);
        s+=`${fit(q.x,q.y+4,10.5,q.c,q.t,{},76)}`;
        const ax=(q.x<159? q.x+40 : q.x-40);
        s+=drawLL({x:ax,y:q.y},{x:(q.x<159?112:206),y:q.y===66?66:150+0},cardB,1.8,1.4,0.8+k*0.2,pre);
      });
      s+=plate2(24,192,270,30,go?grn:cardB,go?'роутер соединяет все устройства':'кто связывает устройства?',11.5,pre);
      s+=`${fit(159,244,11,dim,'это и есть локальная сеть',{},290)}`;
      return s;
    }
    if(K==='globe'){ /* интернет — сеть сетей */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${blu}" stroke-width="1.9"/>`
        +`${fit(159,31,12,blu,'интернет — сеть сетей',{b:1},256)}</g>`;
      const cx=159, cy=118, r=62;
      s+=drawC(cx,cy,r,blu,3.4,0.2,pre);
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${(r*0.35).toFixed(1)}" fill="none" stroke="${blu}" stroke-width="1.6" opacity=".7"/>`;
      s+=`<ellipse cx="${cx}" cy="${cy}" rx="${(r*0.35).toFixed(1)}" ry="${r}" fill="none" stroke="${blu}" stroke-width="1.6" opacity=".7"/>`;
      s+=`<line x1="${cx-r}" y1="${cy}" x2="${cx+r}" y2="${cy}" stroke="${blu}" stroke-width="1.6" opacity=".7"/>`;
      [[-46,-40],[46,-30],[0,54]].forEach((q,k)=>{
        s+=`<circle class="${pre}Pop" style="animation-delay:${(0.8+k*0.2).toFixed(2)}s" cx="${cx+q[0]}" cy="${cy+q[1]}" r="9" fill="${[gold,grn,pur][k]}" stroke="#fffdf2" stroke-width="1.3"/>`;
      });
      s+=`<circle r="5" fill="${cyan}"><animateMotion dur="6s" repeatCount="indefinite" path="M113 78 Q159 30 205 88 Q159 172 113 78"/></circle>`;
      s+=plate2(24,194,270,30,go?grn:cardB,go?'сети соединяются друг с другом':'что такое интернет?',11.5,pre);
      s+=`${fit(159,246,11,dim,'поэтому связь есть между любыми странами',{},290)}`;
      return s;
    }
    if(K==='ipaddr'){ /* IP-адрес */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'IP-адрес — номер устройства в сети',{b:1},256)}</g>`;
      ['192','168','1','25'].forEach((q,k)=>{
        s+=drawRR(38+k*62,60,52,46,9,k===3?grn:gold,2.6,0.3+k*0.25,2,pre,{pen:k===3});
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.7+k*0.25).toFixed(2)}s">${tx(64+k*62,90,17,k===3?grn:gold,q,{b:1})}</g>`;
      });
      s+=`${tx(95,94,20,dim,'.',{b:1})}${tx(157,94,20,dim,'.',{b:1})}${tx(219,94,20,dim,'.',{b:1})}`;
      s+=fit(159,132,11.5,ink,'четыре числа от 0 до 255',{b:1},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.9s"><rect x="40" y="148" width="238" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.7"/>`
        +fit(159,171,11.5,gold,'как номер дома, только для компьютера',{b:1},230)+`</g>`;
      s+=plate2(24,194,270,30,go?grn:cardB,go?'такой адрес у каждого устройства в сети':'из чего состоит адрес?',11.5,pre);
      return s;
    }
    if(K==='ipunique'){ /* у каждого свой адрес */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'два устройства — два адреса',{b:1},256)}</g>`;
      [[36,60,'192.168.1.25',grn,'ноутбук'],[164,60,'192.168.1.30',blu,'телефон']].forEach((q,k)=>{
        s+=drawRR(q[0],q[1],118,64,10,q[3],2.4,0.25+k*0.25,1.9,pre);
        s+=fit(q[0]+59,q[1]+26,11,q[3],q[4],{b:1},108);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.7+k*0.25).toFixed(2)}s"><text x="${q[0]+59}" y="${q[1]+48}" text-anchor="middle" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${q[3]}">${q[2]}</text></g>`;
      });
      s+=drawLL({x:95,y:124},{x:223,y:124},cardB,1.8,1.2,0.9,pre);
      s+=`<circle class="${pre}Pop" cx="159" cy="124" r="13" fill="rgba(255,215,106,.16)" stroke="${gold}" stroke-width="1.8"/>`;
      s+=`${fit(159,124,10,gold,'сеть',{b:1},40)}`;
      s+=`<g class="${pre}Rise}" style="animation-delay:1.4s"><rect x="30" y="146" width="258" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.7"/>`
        +fit(159,169,11.5,cyan,'адреса не повторяются — иначе письмо уйдёт не туда',{b:1},250)+`</g>`;
      s+=plate2(24,192,270,30,go?grn:cardB,go?'адрес уникален, как номер телефона':'зачем разные адреса?',11.5,pre);
      return s;
    }
    if(K==='dns'){ /* DNS — телефонная книга */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'имя сайта превращается в адрес',{b:1},256)}</g>`;
      s+=drawRR(24,56,120,54,10,pur,2.4,0.25,1.9,pre);
      s+=fit(84,80,11.5,pur,'школа.ру',{b:1},110);
      s+=fit(84,98,10,dim,'имя понятно человеку',{},112);
      s+=drawLL({x:144,y:83},{x:196,y:83},pur,2,1.2,0.6,pre);
      s+=`<circle r="6" fill="${gold}"><animateMotion dur="3s" repeatCount="indefinite" path="M146 83 H196"/></circle>`;
      s+=drawRR(196,56,98,54,10,grn,2.4,0.5,1.9,pre);
      s+=`<g class="${pre}Pop" style="animation-delay:1s"><text x="245" y="80" text-anchor="middle" font-size="11" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">93.184.216.34</text></g>`;
      s+=fit(245,98,10,dim,'адрес понятен сети',{},94);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.3s"><rect x="30" y="126" width="258" height="34" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.7"/>`
        +fit(159,149,11.5,pur,'это делает DNS — «телефонная книга» интернета',{b:1},250)+`</g>`;
      s+=plate2(24,172,270,30,go?grn:cardB,go?'имя → адрес: так находят сайт':'как из имени получается адрес?',11.5,pre);
      s+=`${fit(159,224,11,dim,'человек помнит имена, а сеть — числа',{},290)}`;
      return s;
    }
    if(K==='packets'){ /* данные делят на пакеты */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'файл делят на маленькие пакеты',{b:1},256)}</g>`;
      s+=drawRR(40,54,238,38,9,cyan,2.6,0.2,2,pre,{pen:true});
      s+=fit(159,79,11.5,cyan,'файл 100 килобайт',{b:1},220);
      for(let k=0;k<5;k++){
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.8+k*0.18).toFixed(2)}s">`
          +`<rect x="${34+k*52}" y="112" width="46" height="34" rx="7" fill="rgba(19,60,44,.97)" stroke="${grn}" stroke-width="1.8"/>`
          +tx(57+k*52,134,11,grn,'П'+(k+1),{b:1})+`</g>`;
        s+=drawLL({x:159,y:94},{x:57+k*52,y:110},cardB,1.6,1,0.7+k*0.15,pre);
      }
      s+=fit(159,166,11.5,ink,'каждый пакет — часть файла со своим номером',{b:1},292);
      s+=fit(159,188,11,dim,'номер нужен, чтобы собрать файл в правильном порядке',{},292);
      s+=plate2(24,204,270,30,go?grn:cardB,go?'100 КБ по 1 КБ = 100 пакетов':'на что делят файл?',11.5,pre);
      return s;
    }
    if(K==='packetroute'){ /* пакеты идут разными путями */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'пакеты идут разными дорогами',{b:1},256)}</g>`;
      const A={x:40,y:104}, B={x:278,y:104};
      const mid=[[{x:110,y:52},{x:210,y:52}],[{x:159,y:104}],[{x:110,y:156},{x:210,y:156}]];
      s+=`<circle cx="${A.x}" cy="${A.y}" r="15" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="2"/>`;
      s+=tx(A.x,A.y+4,9.5,gold,'ты',{b:1});
      s+=`<circle cx="${B.x}" cy="${B.y}" r="15" fill="rgba(12,32,34,.97)" stroke="${grn}" stroke-width="2"/>`;
      s+=tx(B.x,B.y+4,9.5,grn,'друг',{b:1});
      mid.forEach((path,k)=>{
        let d=`M${A.x+15} ${A.y}`;
        path.forEach(q=>{ d+=` L${q.x} ${q.y}`; });
        d+=` L${B.x-15} ${B.y}`;
        s+=`<path d="${d}" fill="none" stroke="${cardB}" stroke-width="1.8" stroke-dasharray="6 5"/>`;
        path.forEach((q,j)=>{
          s+=`<circle class="${pre}Pop" style="animation-delay:${(0.3+k*0.2+j*0.1).toFixed(2)}s" cx="${q.x}" cy="${q.y}" r="10" fill="rgba(12,32,34,.97)" stroke="${[gold,cyan,pur][k]}" stroke-width="1.8"/>`;
        });
        s+=`<g><animateMotion dur="4.4s" begin="${(0.6+k*0.5).toFixed(2)}s" repeatCount="indefinite" path="${d}"/>`
          +`<rect x="-13" y="-8" width="26" height="16" rx="4" fill="rgba(19,60,44,.97)" stroke="${[gold,cyan,pur][k]}" stroke-width="1.4"/>`
          +`<text x="0" y="4" text-anchor="middle" font-size="9" font-weight="bold" fill="${[gold,cyan,pur][k]}">П${k+1}</text></g>`;
      });
      s+=fit(159,192,11.5,ink,'дошли все три — файл собирается у друга',{b:1},292);
      s+=plate2(24,208,270,30,go?grn:cardB,go?'если пакет потерялся, его отправят снова':'что происходит в пути?',11.5,pre);
      return s;
    }
    if(K==='routerjob'){ /* маршрутизатор */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'маршрутизатор выбирает дорогу',{b:1},256)}</g>`;
      s+=drawRR(114,72,90,44,10,gold,2.6,0.2,2,pre);
      s+=`${fit(159,100,11.5,gold,'роутер',{b:1},80)}`;
      const out=[{x:52,y:150,t:'быстрее',c:grn,cost:'2'},{x:159,y:164,t:'средний',c:gold,cost:'4'},{x:266,y:150,t:'долгий',c:red,cost:'7'}];
      out.forEach((q,k)=>{
        s+=drawLL({x:159,y:116},{x:q.x,y:q.y-14},q.c,2,k===0?2.2:1.6,0.6+k*0.3,pre);
        s+=drawRR(q.x-46,q.y-14,92,30,8,q.c,2,1+k*0.2,1.7,pre);
        s+=`${fit(q.x,q.y+5,10.5,q.c,q.t,{},84)}`;
        s+=`<g class="${pre}Pop" style="animation-delay:${(1.3+k*0.2).toFixed(2)}s"><text x="${q.x+54}" y="${q.y+5}" text-anchor="middle" font-size="11" font-weight="bold" fill="${q.c}">${q.cost}</text></g>`;
      });
      s+=plate2(24,196,270,30,go?grn:cardB,go?'пакет пойдёт по дороге с числом 2':'какую дорогу выберет роутер?',11.5,pre);
      s+=`${fit(159,248,11,dim,'число — это «сколько шагов до цели»',{},290)}`;
      return s;
    }
    if(K==='protocol'){ /* правила передачи */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'правила передачи — протокол',{b:1},256)}</g>`;
      const it=[{t:'каждый пакет подписан адресом',c:cyan},{t:'номер пакета — чтобы собрать по порядку',c:gold},{t:'проверка: не испортился ли пакет',c:grn},{t:'если потерялся — попросят повторить',c:pur}];
      it.forEach((q,k)=>{
        const y=52+k*40;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.12*k).toFixed(2)}s"><rect x="26" y="${y}" width="266" height="32" rx="9" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +`<circle cx="46" cy="${y+16}" r="10" fill="rgba(255,255,255,.05)" stroke="${q.c}" stroke-width="1.3"/>`
          +tx(46,y+20,11,q.c,''.concat(k+1),{b:1})
          +fit(170,y+21,11,q.c,q.t,{b:1},215)+`</g>`;
        s+=drawLL({x:26,y:y+32},{x:292,y:y+32},q.c,2,0.3+k*0.2,1.8,pre);
      });
      s+=plate2(26,214,266,30,go?grn:cardB,go?'все правила вместе — протокол TCP/IP':'зачем нужны правила?',11.5,pre);
      s+=`${fit(159,266,11,dim,'без правил пакеты не соберутся в файл',{},290)}`;
      return s;
    }
    if(K==='wifi'){ /* Wi-Fi и кабель */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${blu}" stroke-width="1.9"/>`
        +`${fit(159,31,12,blu,'без провода и с проводом',{b:1},256)}</g>`;
      s+=drawRR(24,60,130,96,12,cyan,2.6,0.2,2,pre);
      s+=fit(89,84,11.5,cyan,'Wi-Fi',{b:1},110);
      s+=`<circle cx="89" cy="126" r="10" fill="${cyan}"/>`;
      for(let k=0;k<3;k++){
        s+=`<path d="M${89-14-k*10} ${126-14-k*10} q${14+k*10} ${-18-k*12} ${28+k*20} 0" fill="none" stroke="${cyan}" stroke-width="2.4" opacity="0">`
          +`<animate attributeName="opacity" values="0;.9;0" dur="2.4s" begin="${(k*0.4).toFixed(1)}s" repeatCount="indefinite"/></path>`;
      }
      s+=fit(89,174,10,dim,'радиоволны, без провода',{},116);
      s+=drawRR(164,60,130,96,12,grn,2.6,0.4,2,pre);
      s+=fit(229,84,11.5,grn,'кабель',{b:1},110);
      s+=drawLL({x:190,y:126},{x:268,y:126},grn,4,1.6,0.8,pre);
      s+=`<circle r="5" fill="${gold}"><animateMotion dur="2.6s" repeatCount="indefinite" path="M190 126 H268"/></circle>`;
      s+=fit(229,174,10,dim,'надёжнее и быстрее',{},116);
      s+=plate2(24,186,270,30,go?grn:cardB,go?'и Wi-Fi, и кабель — это сети':'в чём разница?',11.5,pre);
      s+=`${fit(159,238,11,grn,'Wi-Fi — это способ подключиться, а не сам интернет',{b:1},292)}`;
      return s;
    }
    if(K==='serverclient'){ /* сервер и клиент */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'браузер просит — сервер отвечает',{b:1},256)}</g>`;
      s+=drawRR(24,60,116,84,12,cyan,2.6,0.2,2,pre);
      s+=fit(82,86,11.5,cyan,'браузер',{b:1},100);
      s+=fit(82,108,10,dim,'клиент',{},100);
      s+=fit(82,130,10,cyan,'просит страницу',{},104);
      s+=drawRR(178,60,116,84,12,grn,2.6,0.4,2,pre);
      s+=fit(236,86,11.5,grn,'сервер',{b:1},100);
      s+=fit(236,108,10,dim,'хранит сайт',{},100);
      s+=fit(236,130,10,grn,'отправляет',{},104);
      s+=`<g><animateMotion dur="3.4s" repeatCount="indefinite" path="M140 84 H178"/>`
        +`<rect x="-22" y="-8" width="44" height="16" rx="4" fill="rgba(19,60,44,.97)" stroke="${cyan}" stroke-width="1.4"/>`
        +`<text x="0" y="4" text-anchor="middle" font-size="8.5" font-weight="bold" fill="${cyan}">запрос</text></g>`;
      s+=`<g><animateMotion dur="3.4s" begin="1.7s" repeatCount="indefinite" path="M178 122 H140"/>`
        +`<rect x="-24" y="-8" width="48" height="16" rx="4" fill="rgba(19,60,44,.97)" stroke="${grn}" stroke-width="1.4"/>`
        +`<text x="0" y="4" text-anchor="middle" font-size="8.5" font-weight="bold" fill="${grn}">страница</text></g>`;
      s+=plate2(24,164,270,30,go?grn:cardB,go?'так браузер получает сайт':'кто с кем разговаривает?',11.5,pre);
      s+=`${fit(159,216,11,dim,'сервер — компьютер, который отдаёт страницы',{},292)}`;
      return s;
    }
    if(K==='browser'){ /* что делает браузер */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'что делает браузер по шагам',{b:1},256)}</g>`;
      const it=['читает имя сайта','спрашивает у DNS адрес','просит страницу у сервера','собирает пакеты в страницу','показывает её на экране'];
      it.forEach((q,k)=>{
        const y=50+k*34;
        s+=`<g class="${pre}Slide" style="animation-delay:${(0.15*k).toFixed(2)}s"><rect x="30" y="${y}" width="258" height="28" rx="8" fill="rgba(255,255,255,.04)" stroke="${k===4?grn:cardB}" stroke-width="1.5"/>`
          +tx(48,y+19,11,gold,''.concat(k+1),{b:1})
          +fit(176,y+19,11,k===4?grn:ink,q,{},200)+`</g>`;
        if(k<4) s+=`<path d="M159 ${y+28} v6" stroke="${A}" stroke-width="1.6"/>`;
      });
      s+=plate2(30,222,258,30,go?grn:cardB,go?'всё это занимает доли секунды':'что происходит по порядку?',11.5,pre);
      return s;
    }
    if(K==='speed'){ /* скорость передачи */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'скорость передачи данных',{b:1},256)}</g>`;
      s+=fit(159,66,12,ink,'скорость измеряют в мегабитах в секунду',{b:1},292);
      s+=drawRR(30,84,258,34,9,cardB,2.4,0.3,1.8,pre,{pen:true});
      s+=`<rect x="34" y="88" width="0" height="26" rx="6" fill="rgba(125,224,160,.35)" stroke="${grn}" stroke-width="1.4">`
        +`<animate fill="freeze" attributeName="width" values="0;248;0" keyTimes="0;.5;1" dur="6s" repeatCount="indefinite"/></rect>`;
      s+=`<text x="159" y="106" text-anchor="middle" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">10 Мбит/с</text>`;
      s+=fit(159,146,11.5,dim,'10 мегабит за одну секунду',{},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="30" y="162" width="258" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.7"/>`
        +fit(159,185,11.5,gold,'чем больше скорость, тем быстрее скачается файл',{b:1},250)+`</g>`;
      s+=plate2(24,208,270,30,go?grn:cardB,go?'1 мегабайт = 8 мегабит':'как связаны байты и биты?',11.5,pre);
      s+=`${fit(159,260,11,dim,'это важно для задач про время загрузки',{},290)}`;
      return s;
    }
    if(K==='praccalc'){ /* практика: время загрузки */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,32,12,gold,'файл 10 МБ, скорость 5 Мбит/с',{b:1},256)}</g>`;
      const steps=[{t:'10 МБ = 10 · 8 = 80 Мбит',c:cyan},{t:'80 : 5 = 16',c:blu},{t:'ответ: 16 секунд',c:grn}];
      steps.forEach((q,k)=>{
        const y=54+k*46;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.25).toFixed(2)}s"><rect x="30" y="${y}" width="258" height="36" rx="10" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(159,y+24,12.5,q.c,q.t,{b:1},238)+`</g>`;
        if(k<2) s+=`<path d="M159 ${y+38} v6" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/>`;
      });
      s+=plate2(30,198,258,30,go?grn:cardB,go?'16 секунд — вот ответ':'как посчитать время?',11.5,pre);
      s+=`${fit(159,250,11,dim,'сначала переводим мегабайты в мегабиты',{},290)}`;
      return s;
    }
    if(K==='pracpackets'){ /* практика: сколько пакетов */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,grn,'файл 100 КБ, пакет 1 КБ',{b:1},256)}</g>`;
      s+=fit(159,68,12,ink,'сколько получится пакетов?',{b:1},250);
      for(let k=0;k<6;k++){
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.14).toFixed(2)}s">`
          +`<rect x="${34+k*42}" y="86" width="36" height="28" rx="6" fill="rgba(19,60,44,.97)" stroke="${grn}" stroke-width="1.5"/>`
          +tx(52+k*42,105,10.5,grn,'1 КБ',{b:1})+`</g>`;
      }
      s+=fit(159,134,12,dim,'…',{b:1},40);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="46" y="148" width="226" height="38" rx="10" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`<text x="159" y="174" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">100 : 1 = 100</text></g>`;
      s+=plate2(24,194,270,30,go?grn:cardB,go?'100 пакетов по 1 килобайту':'как посчитать?',11.5,pre);
      s+=`${fit(159,246,11,dim,'столько же маленьких частей отправит сеть',{},290)}`;
      return s;
    }
    if(K==='pracaddr'){ /* практика: читаем адрес */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,pur,'читаем адрес устройства 10.0.0.7',{b:1},256)}</g>`;
      ['10','0','0','7'].forEach((q,k)=>{
        s+=drawRR(38+k*62,58,52,46,9,[gold,cyan,grn,pur][k],2.4,0.3+k*0.2,2,pre,{pen:k===0});
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.7+k*0.2).toFixed(2)}s">${tx(64+k*62,88,17,[gold,cyan,grn,pur][k],q,{b:1})}</g>`;
      });
      const notes=['старшая часть','сеть','подсеть','само устройство'];
      notes.forEach((q,k)=>{
        s+=fit(64+k*62,122,9.5,[gold,cyan,grn,pur][k],q,{},58);
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:1.6s"><rect x="30" y="138" width="258" height="34" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.7"/>`
        +fit(159,161,11.5,pur,'каждое число — от 0 до 255',{b:1},250)+`</g>`;
      s+=fit(159,190,11.5,ink,'последнее число часто означает само устройство',{b:1},292);
      s+=plate2(24,206,270,30,go?grn:cardB,go?'по адресу видно, где искать устройство':'что означают числа?',11.5,pre);
      return s;
    }
    if(K==='safety'){ /* безопасность */
      const it=[
        {t:'пароль держи в секрете',d:'никому не сообщай его',c:gold},
        {t:'не переходи по чужим ссылкам',d:'спроси взрослых',c:red},
        {t:'не выкладывай личные данные',d:'адрес, телефон, фото школы',c:pur}
      ];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'безопасность в сети',{b:1},256)}</g>`;
      it.forEach((q,k)=>{
        const y=52+k*54;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s"><rect x="20" y="${y}" width="278" height="46" rx="11" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<path d="M40 ${y+12} l12 20 h-24 z" fill="${q.c}" opacity=".9"/><text x="40" y="${y+27}" text-anchor="middle" font-size="10" font-weight="bold" fill="#06131a">!</text>`
          +fit(104,y+20,11.5,q.c,q.t,{b:1},190)
          +fit(104,y+38,10.5,dim,q.d,{},190)+`</g>`;
      });
      s+=plate2(20,214,278,30,go?grn:cardB,go?'эти три правила — главные':'какие правила безопасности?',11.5,pre);
      return s;
    }
    if(K==='netgame'){ /* тренажёр: IP-адрес */
      const opts=['номер устройства в сети','имя сайта','пароль от почты'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${fit(159,34,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Что такое IP-адрес?',{b:1})}</g>`;
      s+=drawRR(80,56,158,40,9,gold,2.4,0.2,1.8,pre);
      s+=`<text x="159" y="82" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${gold}">192.168.1.25</text>`;
      opts.forEach((t,k)=>{
        const y=110+k*40, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="24" y="${y}" width="270" height="34" rx="10" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +fit(159,y+22,11.5,on?grn:(bad?red:ink),t,{b:on},240)+(on?`<path d="M262 ${y+10} l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=240;
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="28" rx="9" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.6"/>`
        +`${fit(159,by+18,11,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! Это номер устройства в сети':'IP-адрес — числовой номер устройства',{b:done&&st.pick===ok},256)}</g>`;
      return s;
    }
    if(K==='netgame2'){ /* тренажёр: потерянный пакет */
      const opts=['его отправят ещё раз','файл пропадёт навсегда','интернет выключится'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +`${fit(159,34,Math.min(12,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Что будет, если пакет потерялся?',{b:1})}</g>`;
      s+=`<path d="M40 84 H200" stroke="${cardB}" stroke-width="2" stroke-dasharray="7 6"/>`;
      s+=`<circle cx="40" cy="84" r="13" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="2"/>`;
      s+=`<g class="${pre}Blink}"><rect x="176" y="76" width="30" height="18" rx="4" fill="rgba(52,22,26,.97)" stroke="${red}" stroke-width="1.5"/>`
        +`<text x="191" y="89" text-anchor="middle" font-size="9" font-weight="bold" fill="${red}">П2</text></g>`;
      s+=`<circle cx="252" cy="84" r="13" fill="rgba(12,32,34,.97)" stroke="${grn}" stroke-width="2"/>`;
      s+=fit(146,116,11,red,'пакет пропал — порядок сбился',{b:1},250);
      opts.forEach((t,k)=>{
        const y=132+k*38, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="24" y="${y}" width="270" height="32" rx="9" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +fit(159,y+21,11.5,on?grn:(bad?red:ink),t,{b:on},240)+(on?`<path d="M262 ${y+9} l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=252;
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="26" rx="8" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.5"/>`
        +`${fit(159,by+17,10.5,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! Потерянный пакет отправляют снова':'Подумай: правила протокола помогают',{b:done&&st.pick===ok},260)}</g>`;
      return s;
    }
    if(K==='netmist'){ /* частые ошибки */
      const it=[
        {t:'путают интернет и сайт',f:'интернет — сеть, сайт — страница в ней',c:gold},
        {t:'думают, что данные идут одним куском',f:'данные делят на пакеты',c:grn},
        {t:'считают, что Wi-Fi — это интернет',f:'Wi-Fi — способ подключения',c:cyan},
        {t:'забывают про правила протокола',f:'они собирают пакеты по порядку',c:pur}
      ];
      let s='';
      it.forEach((q,k)=>{
        const y=14+k*56;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.1+k*0.14).toFixed(2)}s">`
          +`<rect x="14" y="${y}" width="290" height="48" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<path d="M34 ${y+13} l12 21 h-24 z" fill="${red}" opacity=".9"/><text x="34" y="${y+30}" text-anchor="middle" font-size="11" font-weight="bold" fill="#06131a">!</text>`
          +fit(60,y+21,Math.min(11,200/Math.max(1,q.t.length)/0.72),q.c,q.t,{an:'start',b:1},200)
          +`<path d="M60 ${y+31} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +fit(82,y+42,Math.min(10.5,180/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'},186)+`</g>`;
      });
      s+=`${tx(159,300,11,dim,'проверяй эти четыре места',{})}`;
      return s;
    }
    if(K==='netsum'){ /* карта темы */
      const nodes=[{x:159,y:52,t:'адрес',c:gold},{x:58,y:128,t:'пакеты',c:cyan},{x:260,y:128,t:'роутер',c:grn},
        {x:58,y:206,t:'DNS',c:pur},{x:260,y:206,t:'сайт',c:blu}];
      const ed=[[0,1],[0,2],[1,3],[2,4],[1,4],[3,4]];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.9"/>`
        +`${fit(159,31,12,ink,'вся тема на одной карте',{b:1},256)}</g>`;
      ed.forEach((e,k)=>s+=drawLL({x:nodes[e[0]].x,y:nodes[e[0]].y},{x:nodes[e[1]].x,y:nodes[e[1]].y},'#415a6a',1.6,0.1+k*0.12,2,pre));
      nodes.forEach((n,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.14).toFixed(2)}s">`
          +`<rect x="${n.x-46}" y="${n.y-15}" width="92" height="30" rx="9" fill="rgba(12,32,34,.97)" stroke="${n.c}" stroke-width="1.9"/>`
          +fit(n.x,n.y+5,11.5,n.c,n.t,{b:1},84)+`</g>`;
      });
      s+=`<circle r="6" fill="${gold}"><animateMotion dur="5s" repeatCount="indefinite" path="M159 52 L58 128 L58 206 L260 206 L260 128 L159 52"/></circle>`;
      s+=plate2(22,240,274,28,go?grn:cardB,go?'адрес → пакеты → роутер → сайт':'как связана тема',11.5,pre);
      return s;
    }
    if(K==='netcheck'){ /* проверь себя */
      const qa=[['номер устройства в сети','IP-адрес'],['на что делят файл','пакеты'],['кто выбирает дорогу','маршрутизатор'],['где ищут адрес сайта','в DNS']];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'что мы узнали о сети',{b:1},256)}</g>`;
      qa.forEach((q,k)=>{
        const y=50+k*40, shown=(st&&st.q)>k;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.1*k).toFixed(2)}s"><rect x="24" y="${y}" width="270" height="34" rx="9" fill="rgba(255,255,255,.04)" stroke="${shown?grn:A}" stroke-width="1.6"/>`
          +fit(120,y+22,11,ink,q[0],{},170)
          +(shown?fit(248,y+22,11.5,grn,q[1],{b:1},104):fit(248,y+22,10,dim,'нажми «ответ»',{},104))+`</g>`;
      });
      s+=plate2(24,214,270,30,go?grn:cardB,go?'все четыре ответа на месте':'проверь себя устно',11.5,pre);
      return s;
    }
    if(K==='secrettask'){ /* зачем прятать сообщение */
      let s=`<g class="${pre}Pop"><rect x="24" y="14" width="270" height="30" rx="10" fill="url(#${pre}card)" stroke="${gold}" stroke-width="2"/>`
        +`${tx(159,34,12.5,gold,'как передать секретное сообщение?',{b:1})}</g>`;
      s+=drawRR(30,60,180,50,10,cyan,2.8,0.2,2.2,pre,{pen:true});
      s+=`<text x="120" y="92" text-anchor="middle" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">ВСТРЕЧА В 5:00</text>`;
      s+=drawLL({x:210,y:85},{x:250,y:85},cardB,2,1.2,0.6,pre);
      s+=`<g class="${pre}Pop" style="animation-delay:1s"><rect x="248" y="58" width="46" height="54" rx="8" fill="rgba(19,44,44,.97)" stroke="${grn}" stroke-width="2.2"/>`
        +`<path d="M256 58 v-8 a15 15 0 0 1 30 0 v8" fill="none" stroke="${grn}" stroke-width="2.6"/>`
        +`<circle cx="271" cy="84" r="4.5" fill="${grn}"/><rect x="269" y="88" width="4" height="10" rx="2" fill="${grn}"/></g>`;
      s+=fit(159,140,11.5,ink,'любой по пути может прочитать сообщение',{b:1},292);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.3s"><rect x="30" y="156" width="258" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.7"/>`
        +fit(159,179,11.5,gold,'поэтому сообщение шифруют — прячут по правилу',{b:1},250)+`</g>`;
      s+=plate2(24,200,270,30,go?grn:cardB,go?'слово «шифр» значит «тайна»':'что делать с сообщением?',11.5,pre);
      return s;
    }
    if(K==='caesarstory'){ /* шифр Цезаря */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,32,12.5,gold,'так шифровал Юлий Цезарь',{b:1},256)}</g>`;
      s+=fit(159,62,11.5,ink,'каждую букву он сдвигал на 3 вперёд',{b:1},290);
      s+=cpStrip(46,78,RU.slice(0,9),26,pre,{});
      s+=`<path d="M120 112 h44" stroke="${gold}" stroke-width="2.4"/><path d="M158 106 l8 6 l-8 6" fill="none" stroke="${gold}" stroke-width="2.4"/>`;
      s+=cpStrip(46,124,cpShift(RU.slice(0,9),3),26,pre,{c:cyan,hl:1});
      s+=fit(159,166,11.5,dim,'А превращается в Г, Б — в Д, В — в Е',{},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1s"><rect x="30" y="182" width="258" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.7"/>`
        +fit(159,205,11.5,cyan,'сдвиг на 3 — это и есть ключ',{b:1},240)+`</g>`;
      s+=plate2(24,226,270,28,go?grn:cardB,go?'Цезарь сдвигал буквы на 3':'как он это делал?',11.5,pre);
      return s;
    }
    if(K==='shift3'){ /* сдвиг на три */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'сдвигаем алфавит на 3 буквы',{b:1},256)}</g>`;
      s+=cpStrip(30,52,RU.slice(0,12),22,pre,{});
      s+=cpStrip(30,90,cpShift(RU.slice(0,12),3),22,pre,{c:cyan,hl:3});
      s+=`<rect x="30" y="86" width="20" height="24" rx="4" fill="none" stroke="${gold}" stroke-width="2"/>`
        +`<animate attributeName="x" values="30;96;96;30" keyTimes="0;.45;.9;1" dur="4.5s" repeatCount="indefinite"/>`
        +`<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.85;1" dur="4.5s" repeatCount="indefinite"/>`;
      s+=fit(159,126,11,dim,'нижняя строка «уезжает» на 3 клетки вправо',{},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="30" y="142" width="258" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.7"/>`
        +fit(159,165,11.5,gold,'теперь А стоит над Г, Б над Д',{b:1},240)+`</g>`;
      s+=plate2(24,186,270,30,go?grn:cardB,go?'читаем букву сверху, пишем снизу':'что произошло с алфавитом?',11.5,pre);
      s+=`${fit(159,238,11,dim,'это самый простой шифр — шифр сдвига',{},290)}`;
      return s;
    }
    if(K==='cipherdisc'){ /* шифровальный круг */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'шифровальный круг: два алфавита',{b:1},256)}</g>`;
      s+=cpDisc(159,150,78,54,3,pre,{rot:0});
      s+=`<g><animateTransform attributeName="transform" type="rotate" values="0 159 150;30 159 150;0 159 150" dur="6s" repeatCount="indefinite"/>`
        +`<circle cx="159" cy="150" r="40" fill="none" stroke="${cyan}" stroke-width="1" opacity=".35" stroke-dasharray="5 6"/></g>`;
      s+=fit(159,54,10.5,gold,'внешний круг — обычные буквы',{an:'start'},150);
      s+=fit(303,88,10.5,cyan,'внутренний — сдвинутые',{an:'end'},150);
      s+=plate2(24,240,270,28,go?grn:cardB,go?'круг поворачивают на ключ — на 3 буквы':'как устроен круг?',11.5,pre);
      return s;
    }
    if(K==='cipherenc'){ /* шифруем по кругу */
      const word='КОТ', sh=3, cx=108, cy=124, rO=72, rI=48;
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'шифруем слово КОТ сдвигом 3',{b:1},256)}</g>`;
      s+=cpDisc(cx,cy,rO,rI,sh,pre,{rot:0,fs:9.5});
      [...word].forEach((ch,k)=>{
        const i=RU.indexOf(ch), out=RU[(i+sh)%RU.length];
        const a1=-Math.PI/2+i*2*Math.PI/RU.length, a2=-Math.PI/2+((i+sh)%RU.length)*2*Math.PI/RU.length;
        const x1=cx+Math.cos(a1)*rO, y1=cy+Math.sin(a1)*rO;
        const x2=cx+Math.cos(a2)*rI, y2=cy+Math.sin(a2)*rI;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.6+k*0.5).toFixed(2)}s"><circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="8" fill="rgba(255,215,106,.22)" stroke="${gold}" stroke-width="1.6"/></g>`;
        s+=`<circle class="${pre}Pop" r="5" fill="${gold}" style="animation-delay:${(0.7+k*0.5).toFixed(2)}s"><animateMotion dur="3s" begin="${(0.7+k*0.5).toFixed(2)}s" repeatCount="indefinite" path="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}"/></circle>`;
        s+=`<g class="${pre}Pop" style="animation-delay:${(1+k*0.5).toFixed(2)}s"><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="8" fill="rgba(127,214,255,.22)" stroke="${cyan}" stroke-width="1.6"/></g>`;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(1.2+k*0.5).toFixed(2)}s"><rect x="${216}" y="${58+k*34}" width="86" height="28" rx="7" fill="rgba(12,32,34,.97)" stroke="${cyan}" stroke-width="1.6"/>`
          +`<text x="${248}" y="${78+k*34}" text-anchor="middle" font-size="12" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">${ch} → ${out}</text></g>`;
      });
      s+=plate2(22,214,116,30,go?grn:cardB,go?'К→Н, О→С, Т→Х':'какая буква получится?',10.5,pre);
      s+=`${fit(240,244,12,gold,'КОТ → НСХ',{b:1},120)}`;
      return s;
    }
    if(K==='cipherdec'){ /* расшифровываем */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'расшифровка — сдвиг назад',{b:1},256)}</g>`;
      s+=fit(159,62,13,cyan,'шифр: НСХ',{b:1,georgia:1},200);
      s+=`<path d="M159 74 v16" stroke="${grn}" stroke-width="2.4"/><path d="M154 84 l5 7 l5 -7" fill="none" stroke="${grn}" stroke-width="2.4"/>`;
      s+=fit(159,110,12,ink,'сдвигаем каждую букву на 3 назад',{b:1},290);
      s+=cpStrip(46,126,RU.slice(11,20),24,pre,{c:cyan,hl:2});
      s+=cpStrip(46,158,cpShift(RU.slice(11,20),-3),24,pre,{c:grn,hl:2});
      s+=fit(159,200,13,gold,'получилось: КОТ',{b:1,georgia:1},240);
      s+=plate2(24,214,270,30,go?grn:cardB,go?'тот же ключ 3, только со знаком минус':'как читать шифр?',11.5,pre);
      s+=`${fit(159,266,11,dim,'у кого ключ — тот и прочитает',{},290)}`;
      return s;
    }
    if(K==='keyidea'){ /* что такое ключ */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'ключ — число сдвига',{b:1},256)}</g>`;
      s+=drawRR(30,54,120,54,10,gold,2.6,0.2,2,pre,{pen:true});
      s+=fit(90,78,11.5,gold,'слово ПРИВЕТ',{b:1},110);
      s+=fit(90,98,11,cyan,'ключ 3',{b:1},110);
      s+=`<path d="M150 81 h28" stroke="${A}" stroke-width="2.2"/><path d="M172 75 l8 6 l-8 6" fill="none" stroke="${A}" stroke-width="2.2"/>`;
      s+=drawRR(188,54,106,54,10,cyan,2.6,0.5,2,pre,{pen:true});
      s+=`<text x="241" y="86" text-anchor="middle" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">ТУЛЕЗИХ</text>`;
      s+=fit(159,132,11.5,ink,'другой ключ — совсем другой шифр',{b:1},290);
      s+=cpStrip(30,150,RU.slice(0,10),26,pre,{});
      s+=`<g class="${pre}Pop" style="animation-delay:.8s"><text x="159" y="196" text-anchor="middle" font-size="12" font-weight="bold" fill="${gold}">ключ 3</text></g>`;
      s+=cpStrip(30,206,cpShift(RU.slice(0,10),3),26,pre,{c:gold});
      s+=plate2(24,242,270,30,go?grn:cardB,go?'ключ меняет шифр полностью':'что такое ключ?',11.5,pre);
      return s;
    }
    if(K==='keyvars'){ /* сколько ключей */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'сколько бывает ключей',{b:1},256)}</g>`;
      s+=fit(159,64,12,ink,'в русском алфавите 32 буквы',{b:1},290);
      for(let k=0;k<8;k++){
        const x=30+k*34;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.3+k*0.12).toFixed(2)}s">`
          +`<rect x="${x}" y="82" width="30" height="30" rx="6" fill="rgba(12,32,34,.97)" stroke="${pur}" stroke-width="1.5"/>`
          +tx(x+15,103,11,pur,''+k,{b:1})+`</g>`;
      }
      s+=fit(159,132,12,dim,'… и так до 31',{b:1},200);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="46" y="150" width="226" height="36" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.8"/>`
        +`<text x="159" y="175" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${pur}">32 варианта ключа</text></g>`;
      s+=plate2(24,196,270,30,go?grn:cardB,go?'ключ от 0 до 31 — всего 32':'сколько вариантов?',11.5,pre);
      s+=`${fit(159,248,11,dim,'сдвиг 0 ничего не меняет — он бесполезен',{},290)}`;
      return s;
    }
    if(K==='alpha'){ /* лента алфавита */
      const word='ШКОЛА';
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'шифруем ШКОЛА по ленте',{b:1},256)}</g>`;
      s+=fit(20,60,11,ink,'буквы слова:',{an:'start',b:1},110);
      [...word].forEach((ch,k)=>{
        const i=RU.indexOf(ch);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.12).toFixed(2)}s">`
          +`<rect x="${112+k*36}" y="46" width="32" height="28" rx="6" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
          +tx(128+k*36,66,13,gold,ch,{b:1})+`</g>`;
      });
      s+=fit(20,104,11,cyan,'шифр:',{an:'start',b:1},60);
      [...word].forEach((ch,k)=>{
        const out=cpShift(ch,3);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.9+k*0.35).toFixed(2)}s">`
          +`<rect x="${86+k*40}" y="90" width="36" height="30" rx="6" fill="rgba(16,42,44,.97)" stroke="${cyan}" stroke-width="1.7"/>`
          +tx(104+k*40,111,14,cyan,out,{b:1})+`</g>`;
        if(k===0) s+=`<path d="M128 76 v12" stroke="${A}" stroke-width="1.8" class="${pre}Dash"/>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:2.6s"><rect x="30" y="136" width="258" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.7"/>`
        +`<text x="159" y="159" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">ШКОЛА → ЫНСОГ</text></g>`;
      s+=plate2(24,180,270,30,go?grn:cardB,go?'каждая буква сдвинулась на 3':'как изменилось слово?',11.5,pre);
      s+=`${fit(159,232,11,dim,'смотри внимательно: Я сдвигается в Б',{},290)}`;
      return s;
    }
    if(K==='ciphex1'){ /* пошаговый пример */
      const pairs=[['К','Н'],['О','С'],['Т','Х']];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'каждая буква по отдельности',{b:1},256)}</g>`;
      pairs.forEach((q,k)=>{
        const y=56+k*56;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.2+k*0.35).toFixed(2)}s">`
          +`<rect x="46" y="${y}" width="60" height="44" rx="9" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="2"/>`
          +tx(76,y+32,18,gold,q[0],{b:1})
          +`<path d="M112 ${y+22} h24" stroke="${A}" stroke-width="2.2"/><path d="M130 ${y+16} l8 6 l-8 6" fill="none" stroke="${A}" stroke-width="2.2"/>`
          +`<rect x="150" y="${y}" width="60" height="44" rx="9" fill="rgba(16,42,44,.97)" stroke="${cyan}" stroke-width="2"/>`
          +tx(180,y+32,18,cyan,q[1],{b:1})
          +fit(248,y+22,10.5,dim,'буква '+(k+1),{},80)
          +fit(248,y+38,10.5,gold,'сдвиг +3',{},80)+`</g>`;
      });
      s+=plate2(24,232,270,30,go?grn:cardB,go?'из трёх букв получилось НСХ':'что получится из каждой буквы?',11.5,pre);
      return s;
    }
    if(K==='ciphex2'){ /* пример: Я переходит в Б */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.9"/>`
        +`${fit(159,31,12,red,'важный случай: буквы идут по кругу',{b:1},256)}</g>`;
      s+=cpStrip(24,54,RU.slice(28,32),32,pre,{c:gold,hl:3});
      s+=`<path d="M136 96 q40 -22 80 0" fill="none" stroke="${red}" stroke-width="2.4" stroke-dasharray="6 5"/>`;
      s+=`<circle r="5" fill="${red}"><animateMotion dur="3s" repeatCount="indefinite" path="M144 92 Q176 70 208 92"/></circle>`;
      s+=cpStrip(24,110,RU.slice(0,4),32,pre,{c:cyan,hl:2});
      s+=fit(159,158,11.5,ink,'после Я алфавит начинается сначала',{b:1},290);
      s+=fit(159,182,11,dim,'поэтому Я + 3 = В (Я, А, Б, В)',{},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1s"><rect x="40" y="198" width="238" height="34" rx="10" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.7"/>`
        +fit(159,221,11.5,red,'если забыть про круг — получится ошибка',{b:1},230)+`</g>`;
      s+=plate2(24,220,270,30,go?grn:cardB,go?'алфавит замкнут в круг':'что происходит в конце алфавита?',11.5,pre);
      return s;
    }
    if(K==='revword'){ /* читаем наоборот */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${blu}" stroke-width="1.9"/>`
        +`${fit(159,31,12,blu,'самый простой способ: читать наоборот',{b:1},256)}</g>`;
      const w='СЕКРЕТ';
      [...w].forEach((ch,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.2+k*0.1).toFixed(2)}s">`
          +`<rect x="${34+k*38}" y="56" width="34" height="32" rx="6" fill="rgba(12,32,34,.97)" stroke="${blu}" stroke-width="1.6"/>`
          +tx(51+k*38,78,13,blu,ch,{b:1})+`</g>`;
      });
      [...w].reverse().forEach((ch,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.9+k*0.12).toFixed(2)}s">`
          +`<rect x="${34+k*38}" y="110" width="34" height="32" rx="6" fill="rgba(16,42,44,.97)" stroke="${gold}" stroke-width="1.6"/>`
          +tx(51+k*38,132,13,gold,ch,{b:1})+`</g>`;
      });
      s+=`<path d="M34 96 q120 26 240 0" fill="none" stroke="${cyan}" stroke-width="2" stroke-dasharray="6 5"/>`;
      s+=fit(159,166,11.5,ink,'ТЕРЕКС вместо СЕКРЕТ',{b:1},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.8s"><rect x="30" y="182" width="258" height="34" rx="10" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.7"/>`
        +fit(159,205,11.5,red,'такой шифр легко разгадать — буквы просто переставили',{b:1},246)+`</g>`;
      s+=plate2(24,226,270,28,go?grn:cardB,go?'этот способ называют «перестановка»':'чем этот способ слабее?',11.5,pre);
      return s;
    }
    if(K==='numcode'){ /* буквы как числа */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'заменяем буквы числами: А = 1, Б = 2',{b:1},256)}</g>`;
      for(let k=0;k<10;k++){
        const x=26+k*29;
        s+=drawRR(x,52,26,34,6,k===0?gold:cardB,2,0.15+k*0.08,1.5,pre,{pen:k===0,r:3});
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.5+k*0.08).toFixed(2)}s">`
          +tx(x+13,68,11,ink,RU[k],{b:1})+tx(x+13,82,10,dim,''.concat(k+1),{})+`</g>`;
      }
      s+=fit(159,110,11,dim,'…и так до Я = 32',{b:1},200);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="30" y="126" width="258" height="38" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.8"/>`
        +`<text x="159" y="151" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">КОТ = 11 15 19</text></g>`;
      s+=fit(159,184,11.5,ink,'числа передавать проще, чем буквы',{b:1},290);
      s+=plate2(24,200,270,30,go?grn:cardB,go?'числовой шифр — замена букв числами':'как превратить буквы в числа?',11.5,pre);
      s+=`${fit(159,252,11,dim,'но такой шифр тоже легко разгадать',{},290)}`;
      return s;
    }
    if(K==='symcode'){ /* шифр символами */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'у каждой буквы — свой значок',{b:1},256)}</g>`;
      for(let k=0;k<12;k++){
        const x=30+(k%6)*48, y=k<6?54:106;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.07).toFixed(2)}s">`
          +`<rect x="${x-20}" y="${y-20}" width="40" height="40" rx="8" fill="rgba(12,32,34,.97)" stroke="${pur}" stroke-width="1.4"/>`
          +tx(x,y-8,11,ink,RU[k],{b:1})+cpSym(k,x,y+8,15,pur)+`</g>`;
      }
      s+=fit(159,144,11,dim,'это ключ шифра — таблица значков',{b:1},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.4s"><rect x="34" y="158" width="250" height="40" rx="10" fill="rgba(176,127,255,.12)" stroke="${pur}" stroke-width="1.8"/>`
        +`<text x="100" y="184" text-anchor="middle" font-size="13" font-weight="bold" fill="${ink}">ДОМ =</text>`;
      [4,14,12].forEach((idx,k2)=>{ s+=cpSym(idx,150+k2*40,178,22,pur); });
      s+=`</g>`;
      s+=plate2(24,212,270,30,go?grn:cardB,go?'без таблицы значки не прочитать':'что здесь ключ?',11.5,pre);
      return s;
    }
    if(K==='keysecret'){ /* ключ в секрете */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'что можно знать всем, а что нельзя',{b:1},256)}</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.15s"><rect x="22" y="52" width="130" height="86" rx="11" fill="rgba(19,60,44,.55)" stroke="${grn}" stroke-width="1.8"/>`
        +fit(87,76,11.5,grn,'можно знать',{b:1},116)
        +fit(87,100,10.5,dim,'способ шифрования',{},116)
        +fit(87,118,10.5,dim,'сам круг',{},116)+`</g>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.35s"><rect x="166" y="52" width="130" height="86" rx="11" fill="rgba(52,22,26,.6)" stroke="${red}" stroke-width="1.8"/>`
        +fit(231,76,11.5,red,'нельзя никому',{b:1},116)
        +fit(231,100,10.5,dim,'число-ключ',{},116)
        +fit(231,118,10.5,dim,'и текст без ключа',{},116)+`</g>`;
      s+=drawLL({x:154,y:95},{x:164,y:95},cardB,2,0.9,0.6,pre);
      s+=`<g class="${pre}Rise}" style="animation-delay:.7s"><rect x="26" y="152" width="266" height="36" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.8"/>`
        +fit(159,176,11.5,gold,'секретен именно ключ, а не способ',{b:1},250)+`</g>`;
      s+=plate2(24,198,270,30,go?grn:cardB,go?'потеряешь ключ — никто не прочитает':'что держат в секрете?',11.5,pre);
      s+=`${fit(159,250,11,dim,'поэтому ключ хранят отдельно от шифра',{},290)}`;
      return s;
    }
    if(K==='brute'){ /* перебор всех ключей */
      const cipher='ТУЛЕЗИХ';
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +`${fit(159,31,12,cyan,'пробуем все ключи по порядку',{b:1},256)}</g>`;
      s+=fit(159,54,11.5,dim,'шифр: ТУЛЕЗИХ',{b:1},200);
      for(let k=0;k<7;k++){
        const y=70+k*28, ok=(k===3);
        const word=cpShift(cipher,-k);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.2+k*0.08).toFixed(2)}s">`
          +`<rect x="34" y="${y}" width="250" height="24" rx="6" fill="${ok?'rgba(19,60,44,.75)':'rgba(12,32,34,.97)'}" stroke="${ok?grn:cardB}" stroke-width="${ok?1.8:1.2}"/>`
          +fit(74,y+17,10.5,dim,'ключ '+k,{},78)
          +`<text x="200" y="${y+17}" text-anchor="middle" font-size="11.5" font-family="'Courier New',monospace" font-weight="bold" fill="${ok?grn:ink}">${word}</text></g>`;
        if(!ok) s+=`<g class="${pre}Blink}" style="animation-delay:${(0.4+k*0.3).toFixed(2)}s"><circle cx="300" cy="${y+12}" r="6" fill="none" stroke="${red}" stroke-width="1.8"/></g>`;
      }
      s+=`<g class="${pre}Pop" style="animation-delay:1.8s"><circle cx="300" cy="154" r="8" fill="none" stroke="${grn}" stroke-width="2.4"/>`
        +`<path d="M296 154 l3 4 l6 -7" fill="none" stroke="${grn}" stroke-width="2.2"/></g>`;
      s+=plate2(34,268,250,28,go?grn:cardB,go?'ключ 3 — текст читается: ПРИВЕТ':'какой ключ подойдёт?',11,pre);
      return s;
    }
    if(K==='crackword'){ /* взлом по знакомому слову */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'если одно слово известно — ключ найден',{b:1},256)}</g>`;
      s+=fit(159,62,12,cyan,'шифр: ТУЛЕЗИХ',{b:1},200);
      s+=fit(159,88,11.5,dim,'мы знаем, что в тексте есть слово ПРИВЕТ',{},290);
      const pairs=[['П','Т'],['Р','У'],['И','Л']];
      pairs.forEach((q,k)=>{
        const x=68+k*74;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.4+k*0.25).toFixed(2)}s">`
          +`<rect x="${x-24}" y="108" width="48" height="38" rx="8" fill="rgba(16,42,44,.97)" stroke="${cyan}" stroke-width="1.7"/>`
          +tx(x,132,15,cyan,q[0],{b:1})
          +`<path d="M${x-6} 152 v12" stroke="${A}" stroke-width="1.8"/>`
          +`<rect x="${x-24}" y="166" width="48" height="38" rx="8" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.7"/>`
          +tx(x,190,15,gold,q[1],{b:1})+`</g>`;
      });
      s+=fit(159,224,11.5,ink,'сдвиг между буквами одинаковый — это и есть ключ',{b:1},292);
      s+=plate2(24,238,270,30,go?grn:cardB,go?'П→Т даёт сдвиг 3 — ключ найден':'как узнать ключ?',11.5,pre);
      return s;
    }
    if(K==='cpdial'){ /* интерактив: крутим круг */
      const cipher='НСХ', sh=(st&&typeof st.sh==='number')?st.sh:0;
      const word=cpShift(cipher,-sh);
      let s=`<g class="${pre}Pop"><rect x="16" y="12" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${fit(159,31,Math.min(11.5,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'Крути круг и расшифруй слово',{b:1})}</g>`;
      s+=`<circle cx="106" cy="142" r="78" fill="rgba(10,28,30,.95)" stroke="${A}" stroke-width="2.2"/>`;
      s+=cpRing(106,142,66,RU,{c:gold,fs:9});
      s+=`<g transform="rotate(${(sh*360/RU.length).toFixed(1)} 106 142)">${cpRing(106,142,50,cpShift(RU,sh),{c:cyan,fs:9})}</g>`;
      s+=`<path d="M99 62 h14 l-7 10 z" fill="${gold}"/>`;
      s+=`<circle cx="106" cy="142" r="16" fill="rgba(10,28,30,.97)" stroke="${gold}" stroke-width="1.6"/>`
        +`<text x="106" y="147" text-anchor="middle" font-size="12" font-weight="bold" fill="${gold}">${sh}</text>`;
      s+=`<g class="${pre}Rise}" style="animation-delay:.2s"><rect x="200" y="86" width="102" height="40" rx="10" fill="rgba(12,32,34,.97)" stroke="${cyan}" stroke-width="1.7"/>`
        +`<text x="249" y="114" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">${cipher}</text></g>`;
      const ok=(sh===3);
      s+=`<g class="${pre}Pop" style="animation-delay:.4s"><rect x="200" y="140" width="102" height="40" rx="10" fill="${ok?'rgba(19,60,44,.97)':'rgba(12,32,34,.97)'}" stroke="${ok?grn:gold}" stroke-width="1.7"/>`
        +`<text x="249" y="166" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${ok?grn:gold}">${word}</text></g>`;
      s+=`<g style="cursor:pointer" onclick="infShift('${lk}',-1)"><rect x="196" y="192" width="48" height="34" rx="9" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
        +`<text x="220" y="215" text-anchor="middle" font-size="13" font-weight="bold" fill="${gold}">◀ −1</text></g>`;
      s+=`<g style="cursor:pointer" onclick="infShift('${lk}',1)"><rect x="254" y="192" width="48" height="34" rx="9" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
        +`<text x="278" y="215" text-anchor="middle" font-size="13" font-weight="bold" fill="${gold}">+1 ▶</text></g>`;
      const by=234;
      s+=`<g class="${pre}Rise}"><rect x="18" y="${by}" width="284" height="28" rx="9" fill="${ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${ok?grn:A}" stroke-width="1.6"/>`
        +`${fit(159,by+18,11,ok?grn:dim,ok?'Верно! Ключ 3: НСХ → КОТ':'Крути круг, пока слово не станет читаемым',{b:ok},268)}</g>`;
      return s;
    }
    if(K==='cpracc'){ /* практика: задача */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,32,12,gold,'задача: слово ЗАМОК, ключ 4',{b:1},256)}</g>`;
      s+=fit(159,68,12,ink,'зашифруй слово',{b:1},200);
      ['З','А','М','О','К'].forEach((ch,k)=>{
        const out=cpShift(ch,4);
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.3+k*0.25).toFixed(2)}s">`
          +`<rect x="${30+k*52}" y="86" width="44" height="34" rx="7" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
          +tx(52+k*52,109,14,gold,ch,{b:1})
          +`<path d="M52 124 v10" stroke="${A}" stroke-width="1.6"/>`
          +`<rect x="${30+k*52}" y="136" width="44" height="34" rx="7" fill="rgba(16,42,44,.97)" stroke="${cyan}" stroke-width="1.6"/>`
          +tx(52+k*52,159,14,cyan,out,{b:1})+`</g>`;
      });
      s+=`<g class="${pre}Rise}" style="animation-delay:1.8s"><rect x="40" y="184" width="238" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.7"/>`
        +`<text x="159" y="207" text-anchor="middle" font-size="14" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">ЗАМОК → ЛДРТО</text></g>`;
      s+=plate2(24,206,270,30,go?grn:cardB,go?'каждая буква сдвинулась на 4':'что получится?',11.5,pre);
      return s;
    }
    if(K==='hardcipher'){ /* современные шифры */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +`${fit(159,31,12,pur,'сейчас шифры гораздо сложнее',{b:1},256)}</g>`;
      const rows=[{t:'длинный ключ из многих чисел',c:cyan},{t:'буквы перемешиваются и заменяются',c:gold},{t:'одну букву шифруют по-разному',c:grn},{t:'без ключа не прочитать за миллион лет',c:pur}];
      rows.forEach((q,k)=>{
        const y=52+k*38;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.12*k).toFixed(2)}s"><rect x="26" y="${y}" width="266" height="30" rx="9" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.6"/>`
          +`<circle cx="46" cy="${y+15}" r="9" fill="rgba(255,255,255,.05)" stroke="${q.c}" stroke-width="1.3"/>`
          +tx(46,y+19,10.5,q.c,''.concat(k+1),{b:1})
          +fit(168,y+20,11,q.c,q.t,{b:1},210)+`</g>`;
        s+=drawLL({x:26,y:y+30},{x:292,y:y+30},q.c,2,0.3+k*0.2,1.8,pre);
      });
      s+=plate2(26,208,266,32,go?grn:cardB,go?'идея та же: правило + секретный ключ':'что изменилось?',11.5,pre);
      s+=`${fit(159,262,11,dim,'но правило стало очень хитрым',{},290)}`;
      return s;
    }
    if(K==='stego'){ /* спрятать внутри другого */
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'можно спрятать сообщение внутри другого',{b:1},256)}</g>`;
      const lines=['Солнце светит ярко','Тучи уплыли вдаль','Иней лёг на травы','Хвоя пахнет смолой'];
      lines.forEach((q,k)=>{
        const y=56+k*30;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.12).toFixed(2)}s">`
          +fit(30,y+16,11,ink,q,{an:'start'},250)
          +`<circle cx="36" cy="${y+12}" r="8" fill="rgba(255,215,106,.2)" stroke="${gold}" stroke-width="1.3"/>`
          +tx(36,y+16,10,gold,q[0],{b:1})+`</g>`;
      });
      s+=fit(159,190,11.5,dim,'читаем первые буквы сверху вниз',{},290);
      s+=`<g class="${pre}Rise}" style="animation-delay:.9s"><rect x="60" y="204" width="198" height="34" rx="10" fill="rgba(125,224,160,.12)" stroke="${grn}" stroke-width="1.8"/>`
        +`<text x="159" y="227" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${grn}">С Т И Х</text></g>`;
      s+=plate2(24,244,270,28,go?grn:cardB,go?'сообщение спрятано, а текст обычный':'какое слово спрятано?',11.5,pre);
      return s;
    }
    if(K==='cpsafety'){ /* правила */
      const it=[
        {t:'не отправляй пароль в чате',d:'даже другу',c:red},
        {t:'ключ храни отдельно от шифра',d:'иначе смысла нет',c:gold},
        {t:'слабый шифр легко взломать',d:'перебором всех ключей',c:cyan}
      ];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +`${fit(159,31,12,gold,'правила секретной переписки',{b:1},256)}</g>`;
      it.forEach((q,k)=>{
        const y=52+k*54;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s"><rect x="20" y="${y}" width="278" height="46" rx="11" fill="rgba(255,255,255,.04)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<path d="M40 ${y+12} l12 20 h-24 z" fill="${q.c}" opacity=".9"/><text x="40" y="${y+27}" text-anchor="middle" font-size="10" font-weight="bold" fill="#06131a">!</text>`
          +fit(104,y+20,11.5,q.c,q.t,{b:1},190)
          +fit(104,y+38,10.5,dim,q.d,{},190)+`</g>`;
      });
      s+=plate2(20,214,278,30,go?grn:cardB,go?'секрет — это ключ и текст':'что важно помнить?',11.5,pre);
      return s;
    }
    if(K==='cpgame1'){ /* тренажёр: расшифруй */
      const opts=['КОТ','КИТ','ДОМ'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${fit(159,33,Math.min(11.5,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'НСХ с ключом 3 — какое слово?',{b:1})}</g>`;
      s+=`<g class="${pre}Rise}"><rect x="86" y="52" width="146" height="38" rx="9" fill="rgba(12,32,34,.97)" stroke="${cyan}" stroke-width="1.8"/>`
        +`<text x="159" y="78" text-anchor="middle" font-size="15" font-family="'Courier New',monospace" font-weight="bold" fill="${cyan}">НСХ</text></g>`;
      s+=fit(159,106,11,dim,'ключ 3, читаем назад',{},240);
      opts.forEach((t,k)=>{
        const x=34+k*84, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="${x}" y="120" width="76" height="42" rx="10" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +tx(x+38,148,16,c,t,{b:on})+(on?`<path d="M${x+56} 130 l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=176;
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.6"/>`
        +`${fit(159,by+20,11,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! НСХ → КОТ':'Сдвинь каждую букву на 3 назад',{b:done&&st.pick===ok},260)}</g>`;
      return s;
    }
    if(K==='cpgame2'){ /* тренажёр: какой ключ */
      const opts=['3','5','1'], ok=0, done=(st&&st.pick>=0);
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +`${fit(159,33,Math.min(11.5,250/Math.max(1,plain(v.q||'').length)/0.72),ink,v.q||'ПРИВЕТ → ТУЛЕЗИХ: какой ключ?',{b:1})}</g>`;
      s+=`<g class="${pre}Rise}"><rect x="26" y="52" width="266" height="44" rx="10" fill="rgba(12,32,34,.97)" stroke="${cardB}" stroke-width="1.6"/>`
        +`<text x="159" y="80" text-anchor="middle" font-size="13" font-family="'Courier New',monospace" font-weight="bold" fill="${ink}">ПРИВЕТ → ТУЛЕЗИХ</text></g>`;
      opts.forEach((t,k)=>{
        const x=44+k*88, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:A);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="${x}" y="112" width="78" height="44" rx="11" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +tx(x+39,141,18,c,t,{b:on})+(on?`<path d="M${x+56} 122 l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      const by=172;
      s+=`<g class="${pre}Rise}"><rect x="20" y="${by}" width="278" height="30" rx="9" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.6"/>`
        +`${fit(159,by+20,11,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! П и Т стоят на 3 буквы друг от друга':'Сравни первые буквы: П и Т',{b:done&&st.pick===ok},262)}</g>`;
      return s;
    }
    if(K==='cpcheck'){ /* проверь себя */
      const qa=[['что такое ключ шифра','число сдвига'],['сколько ключей у 32 букв','32'],['как читают шифр сдвига','сдвигают назад'],['что держат в секрете','ключ']];
      let s=`<g class="${pre}Pop"><rect x="22" y="12" width="274" height="28" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +`${fit(159,31,12,grn,'что мы узнали о шифрах',{b:1},256)}</g>`;
      qa.forEach((q,k)=>{
        const y=50+k*40, shown=(st&&st.q)>k;
        s+=`<g class="${pre}Rise}" style="animation-delay:${(0.1*k).toFixed(2)}s"><rect x="24" y="${y}" width="270" height="34" rx="9" fill="rgba(255,255,255,.04)" stroke="${shown?grn:A}" stroke-width="1.6"/>`
          +fit(118,y+22,11,ink,q[0],{},166)
          +(shown?fit(246,y+22,11.5,grn,q[1],{b:1},100):fit(246,y+22,10,dim,'нажми «ответ»',{},100))+`</g>`;
      });
      s+=plate2(24,214,270,30,go?grn:cardB,go?'все четыре ответа на месте':'проверь себя устно',11.5,pre);
      return s;
    }
    if(K==='fracintro'){ /* самоподобие */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'фрактал: часть похожа на целое',{b:1},260)+`</g>`;
      s+=drawTree(104,268,58,4,270,pre,{dur:1.1,beg:0.2,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=drawRect(206,60,92,92,8,gold,2.4,1.6,2,pre,{pen:true,keep:true});
      s+=drawTree(252,148,24,4,150,pre,{dur:0.8,beg:2.2,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=fit(252,182,10.5,gold,'ветка внутри ветки',{},100);
      s+=fit(104,292,10.5,dim,'дерево целиком',{},110);
      s+=plate2(18,190,164,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='selfsimilar'){ /* часть похожа на целое */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'приближаем — снова то же самое',{b:1},260)+`</g>`;
      const frames=[[70,74,178,178,0,'всё дерево'],[104,104,110,110,0.6,'ветка'],[124,124,70,70,1.2,'меньше'],[136,136,46,46,1.8,'ещё меньше']];
      frames.forEach((q,k)=>{
        s+=`<rect class="${pre}Pop" style="animation-delay:${q[4].toFixed(2)}s" x="${q[0]}" y="${q[1]}" width="${q[2]}" height="${q[3]}" rx="6" fill="none" stroke="${[grn,cyan,gold,pur][k]}" stroke-width="${2.6-k*0.3}"/>`;
        s+=fit(q[0]+q[2]/2,q[1]-6,10,[grn,cyan,gold,pur][k],q[5],{b:1},q[2]+20);
      });
      s+=drawTree(159,250,26,3,120,pre,{dur:0.7,beg:2.2,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=plate2(18,268,282,28,go?grn:cardB,go?'каждый раз видим ту же форму':'что происходит при приближении?',11.5,pre);
      return s;
    }
    if(K==='fracrule'){ /* простое правило */
      const steps=[
        {t:'1. отрезок',d:'у нас есть ветка',c:cyan},
        {t:'2. уголок',d:'из одной ветки — две',c:gold},
        {t:'3. повторяем',d:'и так на каждом шаге',c:grn}
      ];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'всё фрактальное дерево — из одного правила',{b:1},262)+`</g>`;
      steps.forEach((q,k)=>{
        const y=52+k*62;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s"><rect x="20" y="${y}" width="278" height="50" rx="11" fill="rgba(12,32,34,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +fit(78,y+22,12,q.c,q.t,{b:1},100)
          +fit(188,y+38,10.5,dim,q.d,{},160)+`</g>`;
        s+=drawLL({x:104,y:y+40},{x:104,y:y+50},q.c,2,0.4+k*0.2,1.6,pre);
      });
      s+=drawTree(159,268,26,3,110,pre,{dur:0.7,beg:1.4,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=plate2(20,272,278,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='recursion'){ /* рекурсия */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'алгоритм, который вызывает сам себя',{b:1},262)+`</g>`;
      s+=drawRR(52,60,214,60,12,pur,2.4,0.2,2,pre);
      s+=fit(159,86,12.5,pur,'ветка(длина, глубина)',{b:1},190);
      s+=fit(159,106,10.5,dim,'если глубина = 0 — стоп',{},200);
      s+=`<path class="${pre}Dash" d="M242 120 q40 40 -166 0" fill="none" stroke="${gold}" stroke-width="2.4" stroke-dasharray="8 6"/>`;
      s+=`<g class="${pre}Pop" style="animation-delay:1.2s"><path d="M76 118 l8 10 l10 -12" fill="none" stroke="${gold}" stroke-width="2.6"/></g>`;
      s+=fit(159,158,11.5,gold,'иначе рисуем ветку и вызываем себя дважды',{b:1},292);
      s+=drawTree(159,252,30,3,108,pre,{dur:0.7,beg:1.6,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=plate2(18,186,282,32,go?grn:cardB,go?'так одна процедура рисует всё дерево':'что делает процедура?',11.5,pre);
      return s;
    }
    if(K==='tree1'){ /* уровень 1 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'уровень 0: только ствол',{b:1},260)+`</g>`;
      s+=drawTree(159,278,92,0,270,pre,{dur:1.2,beg:0.3,c:'#8a6b4a'});
      s+=fit(159,300,11.5,dim,'одна ветка — начало',{},250);
      s+=`<g class="${pre}Pop" style="animation-delay:1.6s"><rect x="118" y="222" width="82" height="30" rx="9" fill="rgba(18,24,44,.97)" stroke="${cyan}" stroke-width="1.7"/>`
        +tx(159,243,13,cyan,'1 ветка',{b:1})+`</g>`;
      return s;
    }
    if(K==='tree3'){ /* уровень 2 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'уровень 1: ствол и две ветки',{b:1},260)+`</g>`;
      s+=drawTree(159,286,96,3,270,pre,{dur:1.1,beg:0.3,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=`<g class="${pre}Pop" style="animation-delay:1.8s"><rect x="112" y="228" width="94" height="30" rx="9" fill="rgba(18,24,44,.97)" stroke="${gold}" stroke-width="1.7"/>`
        +tx(159,249,13,gold,'3 ветки',{b:1})+`</g>`;
      s+=fit(159,282,11,dim,'каждая ветка дала две новые',{},270);
      return s;
    }
    if(K==='tree5'){ /* уровень 3 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'уровень 2: ветки растут и снова делятся',{b:1},262)+`</g>`;
      s+=drawTree(159,290,88,3,278,pre,{dur:1,beg:0.3,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=`<g class="${pre}Pop" style="animation-delay:1.8s"><rect x="112" y="232" width="94" height="30" rx="9" fill="rgba(18,24,44,.97)" stroke="${pur}" stroke-width="1.7"/>`
        +tx(159,253,13,pur,'7 веток',{b:1})+`</g>`;
      return s;
    }
    if(K==='tree7'){ /* полное дерево */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'уровень 3: настоящее фрактальное дерево',{b:1},262)+`</g>`;
      s+=drawTree(159,292,80,3,290,pre,{dur:0.9,beg:0.2,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      s+=plate2(18,268,282,28,go?grn:cardB,go?'15 веток — и это только начало':'сколько стало веток?',11.5,pre);
      return s;
    }
    if(K==='treecount'){ /* считаем ветки */
      const rows=[{n:'уровень 0',v:1,c:cyan},{n:'уровень 1',v:3,c:gold},{n:'уровень 2',v:7,c:pur},{n:'уровень 3',v:15,c:grn}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'каждый уровень: каждая ветка даёт две',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*44;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="270" height="34" rx="9" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(96,y+23,11.5,q.c,q.n,{b:1},120)
          +fit(196,y+23,13,q.c,''+q.v,{b:1},60)
          +growBar(232,y+12,54*Math.log2(q.v+1)/4,10,q.c,1.2,0.4+k*0.2,0)+`</g>`;
      });
      s+=plate2(24,232,270,32,go?grn:cardB,go?'1, 3, 7, 15 — почти удвоение':'как растёт число веток?',11.5,pre);
      s+=`${fit(159,292,11.5,ink,'веток становится всё больше и больше',{b:1},290)}`;
      return s;
    }
    if(K==='sierp1'){ /* шаг 1 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'шаг 0: один большой треугольник',{b:1},262)+`</g>`;
      s+=drawSierp([[159,64],[50,268],[268,268]],0,pre,{beg:0.3});
      s+=fit(159,292,11.5,dim,'1 треугольник',{},200);
      return s;
    }
    if(K==='sierp2'){ /* шаг 2 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'шаг 1: убрали середину',{b:1},262)+`</g>`;
      s+=drawSierp([[159,64],[50,268],[268,268]],1,pre,{beg:0.3});
      s+=`<g class="${pre}Pop" style="animation-delay:1.4s"><rect x="116" y="150" width="86" height="28" rx="8" fill="rgba(18,24,44,.97)" stroke="${red}" stroke-width="1.6"/>`
        +fit(159,169,11,red,'середина пустая',{b:1},80)+`</g>`;
      s+=fit(159,292,11.5,dim,'3 треугольника',{},200);
      return s;
    }
    if(K==='sierp3'){ /* шаг 3 */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'шаг 2: то же с каждым треугольником',{b:1},262)+`</g>`;
      s+=drawSierp([[159,64],[50,268],[268,268]],2,pre,{beg:0.3});
      s+=fit(159,292,11.5,dim,'9 треугольников',{},200);
      return s;
    }
    if(K==='sierp4'){ /* красивый ковёр */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'шаг 3: треугольник Серпинского',{b:1},262)+`</g>`;
      s+=drawSierp([[159,60],[44,272],[274,272]],3,pre,{beg:0.3});
      s+=plate2(18,278,282,0,cardB,'',11.5,pre);
      s+=`${fit(159,292,11.5,gold,'27 треугольников, а дырок ещё больше',{b:1},290)}`;
      return s;
    }
    if(K==='sierpcount'){ /* считаем треугольники */
      const rows=[{n:'шаг 0',v:1},{n:'шаг 1',v:3},{n:'шаг 2',v:9},{n:'шаг 3',v:27}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'каждый шаг умножает число на 3',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*42;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s">`
          +`<rect x="34" y="${y}" width="250" height="32" rx="9" fill="rgba(18,24,44,.97)" stroke="${k===3?grn:cyan}" stroke-width="1.7"/>`
          +fit(96,y+22,11.5,cyan,q.n,{b:1},90)
          +fit(170,y+22,13,cyan,'×3',{b:1},40)
          +fit(226,y+22,14,k===3?grn:gold,''+q.v,{b:1},60)+`</g>`;
        if(k<3) s+=drawLL({x:159,y:y+34},{x:159,y:y+40},cyan,1.6,0.4+k*0.2,1.6,pre);
      });
      s+=`${fit(159,246,12,gold,'1, 3, 9, 27 — растёт очень быстро',{b:1},290)}`;
      s+=plate2(24,258,270,30,go?grn:cardB,go?'на 5-м шаге их будет 243':'сколько будет дальше?',11.5,pre);
      return s;
    }
    if(K==='koch1'){ /* отрезок */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'правило Коха: делим на три части',{b:1},262)+`</g>`;
      s+=drawPoly([[40,150],[278,150]],cyan,1.8,0.3,3.4,{pen:true,keep:true});
      [40,119.3,198.7,278].forEach((x,k)=>{
        s+=`<circle class="${pre}Pop" style="animation-delay:${(0.8+k*0.2).toFixed(2)}s" cx="${x.toFixed(1)}" cy="150" r="6" fill="${gold}"/>`;
      });
      s+=fit(80,182,11.5,dim,'1/3',{b:1},60); s+=fit(159,182,11.5,dim,'1/3',{b:1},60); s+=fit(238,182,11.5,dim,'1/3',{b:1},60);
      s+=fit(159,214,11.5,ink,'среднюю часть будем заменять уголком',{b:1},292);
      s+=plate2(20,236,278,32,go?grn:cardB,go?'так начинается снежинка Коха':'что делаем с отрезком?',11.5,pre);
      return s;
    }
    if(K==='koch2'){ /* уголок */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'середину заменили уголком',{b:1},262)+`</g>`;
      s+=drawPoly([[40,200],[119.3,200]],dim,1.2,0.3,2.4,{pen:false,keep:true});
      s+=drawPoly([[198.7,200],[278,200]],dim,1.2,0.3,2.4,{pen:false,keep:true});
      s+=drawKoch([40,200],[278,200],1,pre,{beg:0.5,dur:1.8,c:gold,sw:3.2});
      s+=fit(159,242,11.5,ink,'из одного отрезка получилось четыре',{b:1},292);
      s+=fit(159,266,11.5,dim,'и появилась новая вершина',{},290);
      s+=plate2(20,280,278,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='koch3'){ /* кривая */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'повторяем правило на каждом отрезке',{b:1},262)+`</g>`;
      s+=drawKoch([36,220],[282,220],0,pre,{beg:0.2,dur:0.8,c:cardB,sw:2});
      s+=drawKoch([36,220],[282,220],2,pre,{beg:0.8,dur:2.4,c:pur,sw:3});
      s+=fit(159,258,11.5,ink,'уровень 2: ломаная становится всё сложнее',{b:1},292);
      s+=plate2(20,272,278,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='koch4'){ /* снежинка */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'снежинка Коха: три кривые вместе',{b:1},262)+`</g>`;
      s+=drawKochSnow(159,164,86,3,pre,{beg:0.2,dur:3.2,c:cyan,sw:2.4});
      s+=`<circle class="${pre}Pop" style="animation-delay:3.2s" cx="159" cy="164" r="7" fill="${gold}"/>`;
      s+=fit(159,284,11.5,dim,'если повторять правило дальше, деталей станет ещё больше',{},298);
      s+=plate2(18,258,282,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='kochperim'){ /* периметр растёт */
      const rows=[{n:0,v:'3,00'},{n:1,v:'4,00'},{n:2,v:'5,33'},{n:3,v:'7,11'},{n:4,v:'9,48'}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'периметр растёт без конца',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=50+k*36;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.12+k*0.16).toFixed(2)}s">`
          +`<rect x="30" y="${y}" width="124" height="28" rx="8" fill="rgba(18,24,44,.97)" stroke="${k===4?red:cardB}" stroke-width="1.5"/>`
          +fit(92,y+19,11,ink,'уровень '+q.n,{b:1},110)
          +fit(216,y+19,12.5,k===4?red:gold,q.v,{b:1},60)
          +growBar(236,y+9,38*k/4+8,10,k===4?red:cyan,1.2,0.4+k*0.18,0)+`</g>`;
      });
      s+=`${fit(159,246,11.5,red,'каждый шаг умножает периметр на 4/3',{b:1},292)}`;
      s+=plate2(24,260,270,30,go?grn:cardB,go?'а площадь остаётся маленькой':'что происходит с периметром?',11.5,pre);
      return s;
    }
    if(K==='fern'){ /* папоротник */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'папоротник: тот же приём, другой рисунок',{b:1},262)+`</g>`;
      s+=`<path d="M159 292 C150 224 150 152 159 76" fill="none" stroke="#7aa86a" stroke-width="3.4" stroke-linecap="round"/>`;
      for(let k=0;k<7;k++){
        const t=k/7, y=286-t*198, len=54*(1-t*0.78);
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.4+k*0.22).toFixed(2)}s">`
          +drawPoly([[159,y],[159-len,y-16]],grn,1.1,0.5+k*0.22,2,{keep:true})
          +drawPoly([[159,y],[159+len,y-16]],grn,1.1,0.5+k*0.22,2,{keep:true})
          +drawPoly([[159-len,y-16],[159-len-14,y-30]],grn,0.9,0.7+k*0.22,1.6,{keep:true})
          +drawPoly([[159+len,y-16],[159+len+14,y-30]],grn,0.9,0.7+k*0.22,1.6,{keep:true})+`</g>`;
      }
      s+=plate2(18,288,282,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='fraczoom'){ /* бесконечная детализация */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'приближаем: детали не кончаются',{b:1},262)+`</g>`;
      const pts=kochPath([30,196],[288,196],4);
      s+=`<path d="M${pts.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')}" fill="none" stroke="${cyan}" stroke-width="1.6"/>`;
      s+=`<g class="${pre}Pop" style="animation-delay:.5s"><rect x="42" y="164" width="54" height="54" rx="6" fill="rgba(255,215,106,.10)" stroke="${gold}" stroke-width="2.4"/></g>`;
      const seg=kochPath([30,196],[288,196],4).filter(q=>q[0]>=40&&q[0]<=94&&q[1]>=162&&q[1]<=222);
      s+=`<path d="M${seg.map(q=>((q[0]-42)*4+34).toFixed(1)+' '+((q[1]-164)*3+96).toFixed(1)).join(' L')}" fill="none" stroke="${gold}" stroke-width="2.2"/>`;
      s+=fit(159,116,11.5,gold,'увеличили кусочек — снова та же ломаная',{b:1},292);
      s+=fit(159,250,11.5,ink,'фрактал бесконечно подробный',{b:1},292);
      s+=fit(159,274,11,dim,'внутри каждой мелочи — снова такая же форма',{},292);
      s+=plate2(20,232,278,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='nature'){ /* фракталы в природе */
      const cards=[
        {t:'дерево',d:'ветки как целое',c:grn,x:22,y:50,ico:'tree'},
        {t:'снежинка',d:'лучи и веточки',c:cyan,x:168,y:50,ico:'snow'},
        {t:'берег моря',d:'изгибы повторяются',c:blu,x:22,y:162,ico:'coast'},
        {t:'брокколи',d:'соцветия как целое',c:gold,x:168,y:162,ico:'broc'}
      ];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'природа любит фракталы',{b:1},260)+`</g>`;
      cards.forEach((q,k)=>{
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.18).toFixed(2)}s">`
          +`<rect x="${q.x}" y="${q.y}" width="128" height="102" rx="11" fill="rgba(12,32,34,.97)" stroke="${q.c}" stroke-width="1.8"/>`;
        const cx=q.x+64, cy=q.y+46;
        if(q.ico==='tree'){
          s+=`<path d="M${cx} ${cy+28} v-30" stroke="#8a6b4a" stroke-width="3" stroke-linecap="round"/>`
            +`<path d="M${cx} ${cy} l-18 -16 M${cx} ${cy} l18 -16 M${cx} ${cy-12} l-13 -13 M${cx} ${cy-12} l13 -13" stroke="${grn}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
        } else if(q.ico==='snow'){
          for(let j=0;j<6;j++){
            const a=-Math.PI/2+j*Math.PI/3;
            s+=`<path d="M${cx} ${cy} L${(cx+Math.cos(a)*24).toFixed(1)} ${(cy+Math.sin(a)*24).toFixed(1)}" stroke="${cyan}" stroke-width="2"/>`
              +`<path d="M${(cx+Math.cos(a)*15).toFixed(1)} ${(cy+Math.sin(a)*15).toFixed(1)} l${(Math.cos(a+1)*9).toFixed(1)} ${(Math.sin(a+1)*9).toFixed(1)}" stroke="${cyan}" stroke-width="1.6"/>`;
          }
        } else if(q.ico==='coast'){
          s+=`<path d="M${q.x+12} ${cy+18} q14 -20 26 -6 q12 14 24 -4 q10 -14 22 2 q10 14 22 -6" fill="none" stroke="${blu}" stroke-width="2.6"/>`
            +`<path d="M${q.x+12} ${cy+30} q10 -10 20 -2 q12 10 22 -2 q12 -10 24 2 q12 10 26 -4" fill="none" stroke="${blu}" stroke-width="1.6" opacity=".6"/>`;
        } else {
          s+=`<circle cx="${cx}" cy="${cy+14}" r="15" fill="rgba(125,224,160,.35)" stroke="${gold}" stroke-width="1.6"/>`;
          [0,1,2,3].forEach(j=>{
            const a=-Math.PI/2+j*Math.PI/2, r=20;
            s+=`<circle cx="${(cx+Math.cos(a)*r).toFixed(1)}" cy="${(cy+14+Math.sin(a)*r*0.7).toFixed(1)}" r="9" fill="rgba(125,224,160,.3)" stroke="${gold}" stroke-width="1.3"/>`;
          });
        }
        s+=fit(cx,q.y+78,11,q.c,q.t,{b:1},120)+fit(cx,q.y+93,10,dim,q.d,{},120)+`</g>`;
      });
      s+=plate2(22,274,274,26,go?grn:cardB,go?'фракталы вокруг нас':'где встречаются фракталы?',11,pre);
      return s;
    }
    if(K==='fracpractice'){ /* практика: считаем */
      const rows=[
        {t:'дерево, уровень 4: сколько новых веток?',a:'16',c:grn},
        {t:'Серпинский, шаг 4: сколько треугольников?',a:'81',c:cyan},
        {t:'снежинка Коха: во сколько раз длиннее?',a:'в (4/3)ⁿ раз',c:gold}
      ];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'практика: считаем, как растёт фрактал',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*56;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.25).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="46" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(146,y+20,10.5,ink,q.t,{},210)
          +fit(146,y+38,11,dim,'ответ:',{an:'start'},44)
          +(go?fit(206,y+38,13,q.c,q.a,{b:1},110):'')+`</g>`;
      });
      s+=plate2(22,226,274,32,go?grn:cardB,go?'2⁴ = 16 · 3⁴ = 81':'нажми «показать»',11.5,pre);
      s+=`${fit(159,282,11,dim,'число деталей растёт очень быстро',{},290)}`;
      return s;
    }
    if(K==='fraccreator'){ /* творческая мастерская: строим сами */
      const lvl=(st&&typeof st.lvl==='number')?st.lvl:0;
      const fk=(st&&st.fk)||'tree';
      const modes=[['tree','дерево',grn],['sier','треугольник',cyan],['koch','снежинка',pur]];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'мастерская: построй фрактал сам',{b:1},262)+`</g>`;
      modes.forEach((q,k)=>{
        const x=22+k*92, on=(fk===q[0]);
        s+=`<g style="cursor:pointer" onclick="infFracMode('${lk}','${q[0]}')">`
          +`<rect x="${x}" y="50" width="86" height="30" rx="9" fill="${on?'rgba(19,60,44,.97)':'rgba(12,32,34,.97)'}" stroke="${on?q[2]:cardB}" stroke-width="${on?2:1.4}"/>`
          +fit(x+43,70,11,on?q[2]:dim,q[1],{b:on},78)+`</g>`;
      });
      if(fk==='tree'){
        s+=drawTree(159,272,54,Math.min(4,lvl+1),278,pre,{dur:0.9,beg:0.1,c:'#8a6b4a',c2:'#7aa86a',leaf:grn});
      } else if(fk==='sier'){
        s+=drawSierp([[159,92],[58,246],[260,246]],lvl,pre,{beg:0.2});
      } else {
        s+=drawKochSnow(159,166,70,Math.min(4,lvl),pre,{beg:0.2,dur:2,c:pur,sw:2.2});
      }
      const info=(fk==='tree')?('веток: '+((1<<(lvl+2))-1)):(fk==='sier')?('треугольников: '+Math.pow(3,lvl)):('длина × '+(Math.pow(4/3,lvl)).toFixed(2));
      s+=`<g class="${pre}Rise}"><rect x="60" y="256" width="198" height="26" rx="8" fill="rgba(18,24,44,.97)" stroke="${gold}" stroke-width="1.5"/>`
        +fit(159,274,11.5,gold,'уровень '+lvl+' · '+info,{b:1},180)+`</g>`;
      s+=`<g style="cursor:pointer" onclick="infFracLvl('${lk}',-1)"><rect x="34" y="288" width="118" height="34" rx="9" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
        +tx(93,311,13,gold,'◀ −1 уровень',{b:1})+`</g>`;
      s+=`<g style="cursor:pointer" onclick="infFracLvl('${lk}',1)"><rect x="166" y="288" width="118" height="34" rx="9" fill="rgba(12,32,34,.97)" stroke="${gold}" stroke-width="1.6"/>`
        +tx(225,311,13,gold,'+1 уровень ▶',{b:1})+`</g>`;
      return s;
    }
    if(K==='fracmist'){ /* частые ошибки */
      const it=[
        {t:'думают, что фрактал — это просто узор',f:'фрактал строят по правилу, шаг за шагом',c:gold},
        {t:'считают, что детали когда-нибудь кончатся',f:'их можно повторять бесконечно',c:cyan},
        {t:'путают число шагов и размер рисунка',f:'шаг — это повторение правила',c:grn},
        {t:'забывают, что правило одно и то же',f:'на каждом шаге применяем то же правило',c:pur}
      ];
      let s='';
      it.forEach((q,k)=>{
        const y=14+k*56;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.1+k*0.14).toFixed(2)}s">`
          +`<rect x="14" y="${y}" width="290" height="48" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<path d="M34 ${y+13} l12 21 h-24 z" fill="${red}" opacity=".9"/><text x="34" y="${y+30}" text-anchor="middle" font-size="11" font-weight="bold" fill="${ink}">!</text>`
          +fit(60,y+21,Math.min(11,200/Math.max(1,q.t.length)/0.72),q.c,q.t,{an:'start',b:1},200)
          +`<path d="M60 ${y+31} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +fit(82,y+42,Math.min(10.5,180/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'},186)+`</g>`;
      });
      s+=`${tx(159,266,11,dim,'проверяй эти четыре места',{})}`;
      return s;
    }
    if(K==='fracsheet'){ /* шпаргалка */
      const rows=[{t:'фрактал: часть похожа на целое',c:grn},{t:'правило применяют снова и снова',c:cyan},
                  {t:'рекурсия: алгоритм вызывает сам себя',c:pur},{t:'дерево: 1, 3, 7, 15 веток',c:gold},
                  {t:'Серпинский: 1, 3, 9, 27',c:blu},{t:'снежинка Коха: длина × 4/3',c:red}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'всё главное о фракталах',{b:1},260)+`</g>`;
      rows.forEach((q,k)=>{
        const y=50+k*36;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.1+k*0.12).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="30" rx="8" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +fit(159,y+20,11.5,q.c,q.t,{b:1},256)+`</g>`;
      });
      s+=plate2(22,268,274,30,go?grn:cardB,go?'жми «Понял! Проверю себя» →':'шесть главных мыслей',11.5,pre);
      return s;
    }
    if(K==='aiintro'){ /* что такое ИИ */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'искусственный интеллект учится на примерах',{b:1},262)+`</g>`;
      s+=aiShape(70,120,34,'circle',grn,2.6)+aiShape(159,120,30,'square',blu,2.6)+aiShape(248,120,32,'circle',grn,2.6);
      s+=aiShape(70,214,34,'square',blu,2.6)+aiShape(159,214,30,'circle',grn,2.6)+aiShape(248,214,32,'square',blu,2.6);
      s+=fit(159,88,11,dim,'примеры с ответами',{b:1},200);
      s+=`<g class="${pre}Rise}" style="animation-delay:1s"><rect x="52" y="256" width="214" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.8"/>`
        +fit(159,279,11.5,cyan,'машина ищет закономерность сама',{b:1},200)+`</g>`;
      s+=plate2(18,290,282,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='aiwhere'){ /* где встречается */
      const cards=[{t:'фото',d:'найти кота',c:grn},{t:'голос',d:'понять слова',c:cyan},{t:'перевод',d:'с языка на язык',c:gold},
                   {t:'рекомендации',d:'что посмотреть',c:pur},{t:'игры',d:'обыграть человека',c:blu},{t:'медицина',d:'заметить болезнь',c:red}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'где уже работает ИИ',{b:1},262)+`</g>`;
      cards.forEach((q,k)=>{
        const x=22+(k%3)*94, y=54+Math.floor(k/3)*100;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.14).toFixed(2)}s">`
          +`<rect x="${x}" y="${y}" width="88" height="86" rx="11" fill="rgba(12,32,34,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +fit(x+44,y+34,12,q.c,q.t,{b:1},80)
          +fit(x+44,y+56,10,dim,q.d,{},80);
        const cx=x+44, cy=y+66;
        if(k===0) s+=aiShape(cx,cy,10,'circle',q.c,1.6);
        else if(k===1) s+=`<path d="M${cx-10} ${cy} q5 -10 10 0 q5 10 10 0" fill="none" stroke="${q.c}" stroke-width="1.8"/>`;
        else if(k===2) s+=`<path d="M${cx-10} ${cy} h20 M${cx-3} ${cy-7} l-7 7 l7 7" fill="none" stroke="${q.c}" stroke-width="1.8"/>`;
        else if(k===3) s+=`<path d="M${cx-10} ${cy+6} l6 -12 l6 12 l6 -12" fill="none" stroke="${q.c}" stroke-width="1.8"/>`;
        else if(k===4) s+=`<rect x="${cx-10}" y="${cy-7}" width="20" height="14" rx="4" fill="none" stroke="${q.c}" stroke-width="1.8"/>`;
        else s+=`<path d="M${cx-10} ${cy} h20 M${cx} ${cy-8} v16" stroke="${q.c}" stroke-width="1.8"/>`;
        s+=`</g>`;
      });
      s+=plate2(22,268,274,28,go?grn:cardB,go?'ИИ помогает людям в разных делах':'где встречается ИИ?',11.5,pre);
      return s;
    }
    if(K==='ainotmagic'){ /* не магия */
      const it=[{t:'ИИ не «думает» как человек',c:red},{t:'он находит закономерности в данных',c:grn},{t:'чем больше данных — тем лучше',c:cyan}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'это не волшебство, а математика',{b:1},262)+`</g>`;
      it.forEach((q,k)=>{
        const y=54+k*52;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.22).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="270" height="42" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<circle cx="46" cy="${y+21}" r="10" fill="rgba(255,255,255,.05)" stroke="${q.c}" stroke-width="1.3"/>`
          +tx(46,y+25,11,q.c,''.concat(k+1),{b:1})
          +fit(176,y+26,11.5,q.c,q.t,{b:1},228)+`</g>`;
      });
      s+=drawNet(159,258,[3,3,2],pre,{anim:true});
      s+=fit(159,300,10.5,dim,'внутри — числа и вычисления',{},280);
      return s;
    }
    if(K==='aidata'){ /* данные */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'данные: примеры вместе с ответами',{b:1},262)+`</g>`;
      const rows=[['большой круг','круг'],['маленький квадрат','квадрат'],['круг средний','круг'],['квадрат большой','квадрат']];
      s+=`<rect x="24" y="54" width="180" height="30" rx="8" fill="rgba(255,255,255,.05)" stroke="${cardB}" stroke-width="1.4"/>`;
      s+=fit(114,74,11.5,cyan,'что видим',{b:1},160);
      s+=`<rect x="210" y="54" width="84" height="30" rx="8" fill="rgba(255,255,255,.05)" stroke="${cardB}" stroke-width="1.4"/>`;
      s+=fit(252,74,11.5,gold,'ответ',{b:1},76);
      rows.forEach((q,k)=>{
        const y=88+k*34;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.16).toFixed(2)}s">`
          +`<rect x="24" y="${y}" width="180" height="28" rx="7" fill="rgba(18,24,44,.97)" stroke="${cardB}" stroke-width="1.3"/>`
          +fit(114,y+19,11,ink,q[0],{},170)
          +`<rect x="210" y="${y}" width="84" height="28" rx="7" fill="rgba(18,24,44,.97)" stroke="${k%2?blu:grn}" stroke-width="1.3"/>`
          +fit(252,y+19,11,k%2?blu:grn,q[1],{b:1},76);
        const cx=290, cy=y+14;
        s+=(q[1]==='круг'?aiShape(cx,cy,9,'circle',grn,1.6):aiShape(cx,cy,9,'square',blu,1.6))+`</g>`;
      });
      s+=plate2(24,232,270,32,go?grn:cardB,go?'это и есть обучающая выборка':'как устроены данные?',11.5,pre);
      s+=`${fit(159,290,11,dim,'чем больше примеров, тем умнее машина',{},290)}`;
      return s;
    }
    if(K==='aifeatures'){ /* признаки */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'признаки: по чему различаем',{b:1},262)+`</g>`;
      const feats=[{t:'форма',v:'круглая или угловатая',c:grn},{t:'размер',v:'большой или маленький',c:cyan},{t:'цвет',v:'светлый или тёмный',c:gold}];
      s+=aiShape(74,120,30,'circle',grn,2.4)+aiShape(244,120,26,'square',blu,2.4);
      s+=fit(159,124,16,gold,'?',{b:1},30);
      feats.forEach((q,k)=>{
        const y=176+k*36;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.2+k*0.2).toFixed(2)}s">`
          +`<rect x="30" y="${y}" width="258" height="30" rx="8" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +fit(80,y+20,11.5,q.c,q.t,{b:1},96)
          +fit(206,y+20,10.5,dim,q.v,{},140)+`</g>`;
      });
      s+=plate2(30,292,258,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='aiexample'){ /* пример: круг или квадрат */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'признак «округлость» от 0 до 1',{b:1},262)+`</g>`;
      s+=aiAxis(40,278,150,dim,'0 · квадрат','1 · круг');
      aiExamples.forEach((q,k)=>{
        const x=40+238*q.x, y=150;
        s+=`<g class="${pre}Pop" style="animation-delay:${(0.15+k*0.12).toFixed(2)}s">`
          +`<circle cx="${x.toFixed(1)}" cy="${y}" r="9" fill="${q.y?grn:blu}" fill-opacity=".35" stroke="${q.y?grn:blu}" stroke-width="2"/></g>`;
      });
      s+=fit(159,200,11.5,ink,'каждый пример получил число — округлость',{b:1},292);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.4s"><rect x="40" y="216" width="238" height="34" rx="10" fill="rgba(127,214,255,.12)" stroke="${cyan}" stroke-width="1.8"/>`
        +fit(159,239,11.5,cyan,'машине осталось провести границу',{b:1},226)+`</g>`;
      s+=fit(159,272,11,dim,'слева квадраты, справа круги',{},290);
      return s;
    }
    if(K==='aiweight'){ /* вес признака */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'вес признака: насколько он важен',{b:1},262)+`</g>`;
      s+=aiWeightBar(96,74,180,20,0.9,grn,'округлость');
      s+=aiWeightBar(96,124,180,20,-0.6,red,'угловатость');
      s+=aiWeightBar(96,174,180,20,0.25,cyan,'размер');
      s+=fit(159,220,11.5,ink,'чем важнее признак, тем больше вес',{b:1},292);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="36" y="236" width="246" height="34" rx="10" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.8"/>`
        +fit(159,259,11.5,gold,'веса машина подбирает сама',{b:1},234)+`</g>`;
      s+=`${fit(159,292,11,dim,'красный вес работает против признака',{},290)}`;
      return s;
    }
    if(K==='aiguess'){ /* первая догадка */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.9"/>`
        +fit(159,32,12.5,red,'сначала машина угадывает наугад',{b:1},262)+`</g>`;
      s+=aiAxis(40,278,160,dim,'0','1');
      s+=aiThreshold(40,278,160,0.18,red,'граница');
      aiExamples.forEach((q,k)=>{
        const x=40+238*q.x;
        s+=`<circle cx="${x.toFixed(1)}" cy="160" r="9" fill="${q.y?grn:blu}" fill-opacity=".3" stroke="${q.y?grn:blu}" stroke-width="1.8"/>`;
      });
      s+=fit(159,214,11.5,ink,'граница стоит почти в самом начале',{b:1},292);
      s+=`<g class="${pre}Rise}" style="animation-delay:1.2s"><rect x="36" y="230" width="246" height="34" rx="10" fill="rgba(255,120,100,.12)" stroke="${red}" stroke-width="1.8"/>`
        +fit(159,253,11.5,red,'почти всё машина называет кругом — ошибки',{b:1},234)+`</g>`;
      s+=`${fit(159,288,11,dim,'правильных ответов мало',{},290)}`;
      return s;
    }
    if(K==='aicorrect'){ /* исправляем */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'увидев ошибку, машина сдвигает границу',{b:1},262)+`</g>`;
      s+=aiAxis(40,278,160,dim,'0','1');
      s+=aiThreshold(40,278,160,0.18,red,'было');
      s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;74 0;74 0;0 0" keyTimes="0;.45;.9;1" dur="6s" repeatCount="indefinite"/>`
        +aiThreshold(40,278,160,0.18,grn,'стало')+`</g>`;
      aiExamples.forEach((q,k)=>{
        const x=40+238*q.x;
        s+=`<circle cx="${x.toFixed(1)}" cy="160" r="9" fill="${q.y?grn:blu}" fill-opacity=".3" stroke="${q.y?grn:blu}" stroke-width="1.8"/>`;
      });
      s+=fit(159,216,11.5,ink,'граница поехала вправо — к правильному месту',{b:1},292);
      s+=plate2(24,234,270,32,go?grn:cardB,go?'так машина учится на ошибках':'что произошло с границей?',11.5,pre);
      s+=`${fit(159,292,11,dim,'каждая ошибка — маленький шаг',{},290)}`;
      return s;
    }
    if(K==='ailoop'){ /* цикл обучения */
      const st2=[{t:'показать пример',c:cyan},{t:'машина отвечает',c:gold},{t:'сравнить с ответом',c:pur},{t:'исправить веса',c:grn}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'обучение — это цикл из четырёх шагов',{b:1},262)+`</g>`;
      st2.forEach((q,k)=>{
        const y=56+k*46;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s">`
          +`<rect x="60" y="${y}" width="198" height="32" rx="9" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(159,y+21,11.5,q.c,q.t,{b:1},186)+`</g>`;
        if(k<3) s+=drawPoly([[159,y+34],[159,y+42]],q.c,1,0.4+k*0.2,1.8,{pen:false,keep:true});
      });
      s+=`<path d="M258 72 q22 60 0 118" fill="none" stroke="${gold}" stroke-width="2.2" stroke-dasharray="7 5"/>`;
      s+=`<g class="${pre}Pop" style="animation-delay:1.2s"><path d="M252 184 l6 8 l8 -8" fill="none" stroke="${gold}" stroke-width="2.4"/></g>`;
      s+=fit(276,140,10.5,gold,'повторять',{b:1},60);
      s+=plate2(60,248,198,30,go?grn:cardB,go?'повторяем много раз — машина учится':'что делаем по кругу?',11,pre);
      return s;
    }
    if(K==='aimore'){ /* больше примеров */
      const rows=[{n:'10 примеров',v:0.6,c:red},{n:'50 примеров',v:0.78,c:gold},{n:'200 примеров',v:0.92,c:cyan},{n:'1000 примеров',v:0.97,c:grn}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'чем больше примеров, тем точнее',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=56+k*42;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.12+k*0.18).toFixed(2)}s">`
          +`<rect x="26" y="${y}" width="266" height="32" rx="9" fill="rgba(18,24,44,.97)" stroke="${cardB}" stroke-width="1.5"/>`
          +fit(96,y+21,11,ink,q.n,{b:1},130)
          +growBar(180,y+11,72*q.v,10,q.c,1.2,0.4+k*0.2,0)
          +fit(266,y+21,11,q.c,Math.round(q.v*100)+'%',{b:1},50)+`</g>`;
      });
      s+=`${fit(159,246,11.5,ink,'точность растёт с каждым новым примером',{b:1},290)}`;
      s+=plate2(26,258,266,30,go?grn:cardB,go?'1000 примеров — точность 97%':'как меняется точность?',11.5,pre);
      return s;
    }
    if(K==='aiaccuracy'){ /* график точности */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'точность растёт шаг за шагом',{b:1},262)+`</g>`;
      s+=drawAcc(56,232,240,150,[0.1,0.25,0.3,0.45,0.5,0.55,0.7,0.85,0.9,0.95],pre,{c:grn});
      s+=fit(56,254,10.5,dim,'сначала',{an:'start'},60);
      s+=fit(296,254,10.5,dim,'потом',{an:'end'},60);
      s+=fit(159,276,11.5,ink,'каждая попытка делает модель чуть лучше',{b:1},292);
      s+=plate2(24,288,270,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='aitree'){ /* дерево решений */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${cyan}" stroke-width="1.9"/>`
        +fit(159,32,12.5,cyan,'дерево решений: вопросы «да» и «нет»',{b:1},262)+`</g>`;
      s+=drawDecisionTree(159,86,pre,{q1:'есть перья?',q2:'умеет летать?',q3:'живёт в воде?',a1:'птица',a2:'пингвин',b1:'рыба',b2:'кот'});
      s+=fit(159,240,11.5,ink,'идём по вопросам — и получаем ответ',{b:1},292);
      s+=plate2(24,254,270,30,go?grn:cardB,go?'так машина объясняет своё решение':'как машина решает?',11.5,pre);
      s+=`${fit(159,308,11,dim,'дерево можно нарисовать и понять',{},290)}`;
      return s;
    }
    if(K==='aineuron'){ /* нейросеть */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'нейросеть: много нейронов и связей',{b:1},262)+`</g>`;
      s+=drawNet(159,140,[4,4,3],pre,{anim:true,gapX:56});
      s+=fit(56,140,10.5,blu,'вход',{b:1},44);
      s+=fit(159,206,10.5,cyan,'скрытый слой',{b:1},80);
      s+=fit(262,140,10.5,gold,'ответ',{b:1},50);
      s+=fit(159,232,11.5,ink,'сигнал идёт от входа к ответу',{b:1},292);
      s+=plate2(24,246,270,32,go?grn:cardB,go?'каждый нейрон складывает сигналы с весами':'как устроена нейросеть?',11.5,pre);
      s+=`${fit(159,300,11,dim,'связей очень много — вот почему нужны компьютеры',{},292)}`;
      return s;
    }
    if(K==='ailayers'){ /* слои */
      const L3=[{t:'вход: признаки',d:'округлость, размер, цвет',c:blu},{t:'скрытые слои',d:'ищем сочетания признаков',c:cyan},{t:'выход: ответ',d:'круг или квадрат',c:gold}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'слои: от признаков к ответу',{b:1},262)+`</g>`;
      L3.forEach((q,k)=>{
        const y=56+k*52;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.22).toFixed(2)}s">`
          +`<rect x="30" y="${y}" width="258" height="42" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +fit(96,y+20,11.5,q.c,q.t,{b:1},130)
          +fit(212,y+34,10,dim,q.d,{},150)+`</g>`;
        if(k<2) s+=drawPoly([[159,y+44],[159,y+50]],q.c,1,0.5+k*0.2,1.8,{pen:false,keep:true});
      });
      s+=drawNet(159,262,[3,4,2],pre,{});
      s+=`${fit(159,300,10.5,dim,'чем больше слоёв, тем сложнее закономерности',{},292)}`;
      return s;
    }
    if(K==='ainotprogram'){ /* не как программа */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'обычная программа и обучение',{b:1},262)+`</g>`;
      s+=`<g class="${pre}Rise}"><rect x="20" y="54" width="130" height="150" rx="11" fill="rgba(127,214,255,.10)" stroke="${cyan}" stroke-width="1.8"/>`
        +fit(85,80,12,cyan,'программа',{b:1},116)+`</g>`;
      s+=fit(85,106,10.5,dim,'правила пишет человек',{},116);
      s+=`<path d="M42 122 h86" stroke="${cyan}" stroke-width="2"/>`;
      s+=fit(85,142,10.5,dim,'если круг — то…',{},116);
      s+=fit(85,162,10.5,dim,'если углы — то…',{},116);
      s+=fit(85,188,10.5,cyan,'понятно и предсказуемо',{b:1},116);
      s+=`<g class="${pre}Rise}" style="animation-delay:.3s"><rect x="164" y="54" width="130" height="150" rx="11" fill="rgba(255,215,106,.10)" stroke="${gold}" stroke-width="1.8"/>`
        +fit(229,80,12,gold,'обучение',{b:1},116)+`</g>`;
      s+=fit(229,106,10.5,dim,'правила находит машина',{},116);
      s+=aiAxis(180,274,130,dim,'0','1');
      s+=aiThreshold(180,274,130,0.52,gold,'');
      s+=fit(229,188,10.5,gold,'может ошибаться',{b:1},116);
      s+=plate2(20,218,274,32,go?grn:cardB,go?'в обучении правила никто не пишет':'в чём разница?',11.5,pre);
      s+=`${fit(159,272,11,dim,'поэтому ИИ иногда ведёт себя неожиданно',{},290)}`;
      return s;
    }
    if(K==='aibaddata'){ /* мусор на входе */
      const it=[{t:'если примеры плохие — ответы плохие',c:red},{t:'если примеры однобокие — машина ошибается',c:gold},{t:'«мусор на входе — мусор на выходе»',c:pur}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${red}" stroke-width="1.9"/>`
        +fit(159,32,12.5,red,'качество зависит от данных',{b:1},262)+`</g>`;
      it.forEach((q,k)=>{
        const y=56+k*52;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.22).toFixed(2)}s">`
          +`<rect x="26" y="${y}" width="266" height="42" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<path d="M42 ${y+14} l10 18 h-20 z" fill="${q.c}" opacity=".9"/>`
          +fit(180,y+26,11,q.c,q.t,{b:1},224)+`</g>`;
      });
      s+=aiShape(90,252,26,'circle',grn,2.2)+aiShape(150,252,24,'square',blu,2.2)+aiShape(210,252,26,'circle',grn,2.2)+aiShape(264,252,24,'square',blu,2.2);
      s+=fit(159,294,11,dim,'хорошие примеры — основа хорошей модели',{},292);
      return s;
    }
    if(K==='aiethics'){ /* этика */
      const it=[
        {t:'машина может ошибаться',d:'её ответ нужно проверять',c:gold},
        {t:'важные решения принимает человек',d:'лечение, суд, безопасность',c:grn},
        {t:'нельзя слепо доверять ИИ',d:'думай своей головой',c:cyan}
      ];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'ИИ — помощник, а не начальник',{b:1},262)+`</g>`;
      it.forEach((q,k)=>{
        const y=56+k*54;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s"><rect x="22" y="${y}" width="274" height="46" rx="11" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +fit(108,y+22,11.5,q.c,q.t,{b:1},190)
          +fit(108,y+38,10.5,dim,q.d,{},190)+`</g>`;
      });
      s+=plate2(22,230,274,32,go?grn:cardB,go?'ответственность всегда на человеке':'что важно помнить?',11.5,pre);
      s+=`${fit(159,286,11,dim,'ИИ помогает думать, но не думает вместо нас',{},292)}`;
      return s;
    }
    if(K==='aipractice'){ /* практика */
      const rows=[
        {t:'сколько нужно примеров, чтобы точность была 95%?',a:'сотни',c:cyan},
        {t:'какой признак важнее для «кот или собака»?',a:'форма морды и уши',c:gold},
        {t:'что делать, если машина ошибается часто?',a:'добавить хорошие примеры',c:grn}
      ];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${pur}" stroke-width="1.9"/>`
        +fit(159,32,12.5,pur,'практика: думаем как инженеры ИИ',{b:1},262)+`</g>`;
      rows.forEach((q,k)=>{
        const y=52+k*58;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.25).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="48" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.7"/>`
          +fit(146,y+20,10.5,ink,q.t,{},212)
          +(go?fit(146,y+39,11.5,q.c,q.a,{b:1},212):fit(146,y+39,10.5,dim,'нажми «показать»',{},212))+`</g>`;
      });
      s+=plate2(22,228,274,30,go?grn:cardB,go?'вот три инженерных ответа':'нажми «показать»',11.5,pre);
      s+=`${fit(159,282,11,dim,'данные решают всё',{},280)}`;
      return s;
    }
    if(K==='aiplan'){ /* план обучения */
      const steps=[{t:'собрать примеры',d:'много и разных',c:grn},{t:'выбрать признаки',d:'по чему различать',c:cyan},
                   {t:'обучить модель',d:'угадывай и исправляй',c:gold},{t:'проверить на новых',d:'так ли хорошо она работает',c:pur}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'как обучают модель: четыре шага',{b:1},262)+`</g>`;
      steps.forEach((q,k)=>{
        const y=54+k*52;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.15+k*0.2).toFixed(2)}s">`
          +`<rect x="30" y="${y}" width="258" height="42" rx="10" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.8"/>`
          +`<circle cx="54" cy="${y+21}" r="11" fill="rgba(255,255,255,.05)" stroke="${q.c}" stroke-width="1.4"/>`
          +tx(54,y+25,11.5,q.c,''.concat(k+1),{b:1})
          +fit(174,y+19,11.5,q.c,q.t,{b:1},196)
          +fit(174,y+35,10,dim,q.d,{},196)+`</g>`;
        if(k<3) s+=drawPoly([[159,y+44],[159,y+50]],q.c,1,0.5+k*0.2,1.8,{pen:false,keep:true});
      });
      s+=fit(159,276,11.5,ink,'без проверки на новых данных доверять нельзя',{b:1},292);
      s+=plate2(30,288,258,0,cardB,'',11.5,pre);
      return s;
    }
    if(K==='aitrain'){ /* интерактив: обучаем машину */
      const t=(st&&typeof st.t==='number')?st.t:0.18;
      const n=(st&&st.n)||0, ok=(st&&st.ok)||0;
      const i=(st&&typeof st.i==='number')?st.i:0;
      const ex=aiExamples[i%aiExamples.length];
      const pred=(ex.x>t);           // true = круг
      const truth=(ex.y===1);
      const right=(pred===truth);
      let s=`<g class="${pre}Pop"><rect x="16" y="12" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +fit(159,31,11.5,ink,'обучи машину: подскажи, где она ошиблась',{b:1},266)+`</g>`;
      s+=aiAxis(40,278,150,dim,'0 · квадрат','1 · круг');
      aiExamples.forEach((q,k)=>{
        const x=40+238*q.x;
        s+=`<circle cx="${x.toFixed(1)}" cy="150" r="8" fill="${q.y?grn:blu}" fill-opacity=".3" stroke="${q.y?grn:blu}" stroke-width="1.6"/>`;
      });
      s+=aiThreshold(40,278,150,t,gold,'');
      const exX=40+238*ex.x;
      s+=`<g class="${pre}Pop}"><circle cx="${exX.toFixed(1)}" cy="150" r="14" fill="none" stroke="${gold}" stroke-width="2.4" class="${pre}Blink"/></g>`;
      s+=`<g class="${pre}Rise}"><rect x="196" y="62" width="104" height="52" rx="10" fill="rgba(12,32,34,.97)" stroke="${ex.y?grn:blu}" stroke-width="1.8"/>`
        +aiShape(248,88,15,ex.y?'circle':'square',ex.y?grn:blu,2)+`</g>`;
      s+=fit(120,80,11,dim,'машина видит объект',{},130);
      s+=fit(120,102,11.5,(ex.y?grn:blu),ex.ch,{b:1},130);
      s+=`<g class="${pre}Rise}" style="animation-delay:.2s"><rect x="40" y="196" width="238" height="30" rx="8" fill="rgba(255,215,106,.12)" stroke="${gold}" stroke-width="1.6"/>`
        +fit(159,216,11.5,gold,'машина говорит: '+(pred?'это круг':'это квадрат'),{b:1},220)+`</g>`;
      const btns=[['верно ✓',grn,'infTrain("'+lk+'",1)'],['ошибка ✗',red,'infTrain("'+lk+'",2)']];
      btns.forEach((b,k)=>{
        const x=40+k*124;
        s+=`<g style="cursor:pointer" onclick='${b[2]}'><rect x="${x}" y="232" width="114" height="32" rx="9" fill="rgba(12,32,34,.97)" stroke="${b[1]}" stroke-width="1.7"/>`
          +fit(x+57,253,11.5,b[1],b[0],{b:1},104)+`</g>`;
      });
      const acc=n?Math.round(ok/n*100):0;
      s+=`<g class="${pre}Rise}"><rect x="40" y="270" width="238" height="26" rx="8" fill="rgba(18,24,44,.97)" stroke="${cardB}" stroke-width="1.4"/>`
        +fit(159,288,10.5,(acc>=70?grn:(acc>=40?gold:red)),'граница '+t.toFixed(2).replace('.',',')+' · попыток '+n+' · точность '+acc+'%',{b:1},224)+`</g>`;
      return s;
    }
    if(K==='aitreegame'){ /* интерактив: строим дерево */
      const a1=(st&&st.a1)||0, a2=(st&&st.a2)||0, a3=(st&&st.a3)||0;
      const leaf=!a1?0:(a1===1?(a2===1?1:2):(a3===1?3:4));
      const ans=['—','птица (умеет летать)','пингвин (не летает)','рыба (живёт в воде)','кот (не летает, не в воде)'];
      let s=`<g class="${pre}Pop"><rect x="16" y="12" width="286" height="28" rx="9" fill="url(#${pre}card)" stroke="${A}" stroke-width="1.8"/>`
        +fit(159,31,11.5,ink,'построй дерево решений: отвечай на вопросы',{b:1},266)+`</g>`;
      const q=[[ 'есть перья?',['да','нет'],a1,'a1'],[ 'умеет летать?',['да','нет'],a2,'a2'],['живёт в воде?',['да','нет'],a3,'a3']];
      q.forEach((row,k)=>{
        const y=52+k*34;
        s+=fit(84,y+20,11,ink,row[0],{b:1},96);
        row[1].forEach((lab,j)=>{
          const x=140+j*70, on=(row[2]===j+1);
          s+=`<g style="cursor:pointer" onclick="infTree('${lk}','${row[3]}',${j+1})">`
            +`<rect x="${x}" y="${y+4}" width="64" height="24" rx="7" fill="${on?'rgba(19,60,44,.97)':'rgba(12,32,34,.97)'}" stroke="${on?grn:cardB}" stroke-width="${on?1.8:1.3}"/>`
            +fit(x+32,y+20,11,on?grn:dim,lab,{b:on},56)+`</g>`;
        });
      });
      const N={root:[159,180],a:[92,224],b:[226,224],a1:[56,268],a2:[128,268],b1:[194,268],b2:[266,268]};
      const link=(p,q2,c)=>drawPoly([p,q2],c,1,0.1,1.8,{pen:false,keep:true});
      const onA=(a1===1), onB=(a1===2), onA1=(onA&&a2===1), onA2=(onA&&a2===2), onB1=(onB&&a3===1), onB2=(onB&&a3===2);
      s+=link(N.root,N.a,onA?grn:cardB)+link(N.root,N.b,onB?grn:cardB);
      s+=link(N.a,N.a1,onA1?grn:cardB)+link(N.a,N.a2,onA2?grn:cardB);
      s+=link(N.b,N.b1,onB1?grn:cardB)+link(N.b,N.b2,onB2?grn:cardB);
      const node=(p,t2,c,on)=>`<g class="${pre}Pop"><rect x="${p[0]-34}" y="${p[1]-12}" width="68" height="24" rx="8" fill="${on?'rgba(19,60,44,.97)':'rgba(12,32,34,.97)'}" stroke="${c}" stroke-width="${on?2:1.5}"/>`
        +fit(p[0],p[1]+4,10,on?c:dim,t2,{b:on},62)+`</g>`;
      s+=node(N.root,'есть перья?',onA||onB?grn:cyan,onA||onB);
      s+=node(N.a,'летает?',onA1||onA2?grn:cardB,onA1||onA2);
      s+=node(N.b,'в воде?',onB1||onB2?grn:cardB,onB1||onB2);
      s+=node(N.a1,'птица',onA1?grn:cardB,onA1)+node(N.a2,'пингвин',onA2?grn:cardB,onA2);
      s+=node(N.b1,'рыба',onB1?grn:cardB,onB1)+node(N.b2,'кот',onB2?grn:cardB,onB2);
      s+=`<g class="${pre}Rise}"><rect x="30" y="292" width="258" height="26" rx="8" fill="rgba(255,215,76,.12)" stroke="${gold}" stroke-width="1.5"/>`
        +fit(159,310,11.5,gold,'ответ машины: '+ans[leaf],{b:1},240)+`</g>`;
      return s;
    }
    if(K==='aitest'){ /* интерактив: что скажет машина */
      const opts=['круг','квадрат'], ok=1, done=(st&&st.pick>=0);
      const val=(st&&typeof st.tv==='number')?st.tv:0.72;
      let s=`<g class="${pre}Pop"><rect x="16" y="14" width="286" height="30" rx="10" fill="url(#${pre}card)" stroke="${A}" stroke-width="2"/>`
        +fit(159,34,11.5,ink,'машина обучилась: граница на 0,50. Что она ответит?',{b:1},272)+`</g>`;
      s+=aiAxis(44,274,150,dim,'0','1');
      s+=aiThreshold(44,274,150,0.5,gold,'граница 0,50');
      const x=44+230*val;
      s+=`<g class="${pre}Pop}"><circle cx="${x.toFixed(1)}" cy="150" r="12" fill="rgba(255,215,106,.25)" stroke="${gold}" stroke-width="2.4"/></g>`;
      s+=fit(x,124,11.5,gold,'округлость '+val.toFixed(2).replace('.',','),{b:1},140);
      s+=fit(159,196,11.5,ink,'объект правее границы — значит он круглее',{b:1},292);
      opts.forEach((t2,k)=>{
        const bx=44+k*124, on=(done&&k===ok), bad=(done&&st.pick===k&&!on), c=on?grn:(bad?red:cardB);
        s+=`<g style="cursor:pointer" onclick="infPick('${lk}',${k})">`
          +`<rect x="${bx}" y="214" width="114" height="38" rx="10" fill="${on?'rgba(19,60,44,.97)':(bad?'rgba(52,22,26,.97)':'rgba(12,32,34,.97)')}" stroke="${c}" stroke-width="${(on||bad)?2.2:1.6}"/>`
          +aiShape(bx+28,233,11,k===0?'circle':'square',c,1.8)
          +fit(bx+74,239,12.5,c,t2,{b:on},66)+(on?`<path d="M${bx+90} 222 l4 5 l9 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`:'')+`</g>`;
      });
      s+=`<g class="${pre}Rise}"><rect x="30" y="262" width="258" height="30" rx="9" fill="${done&&st.pick===ok?'rgba(125,224,160,.12)':'rgba(255,255,255,.04)'}" stroke="${done&&st.pick===ok?grn:A}" stroke-width="1.6"/>`
        +fit(159,282,11.5,done&&st.pick===ok?grn:dim,done&&st.pick===ok?'Верно! Машина назовёт это кругом':'Правее границы — машина считает это кругом',{b:done&&st.pick===ok},248)+`</g>`;
      return s;
    }
    if(K==='aimistakes'){ /* частые ошибки */
      const it=[
        {t:'думают, что ИИ понимает смысл',f:'он сравнивает числа и признаки',c:red},
        {t:'верят любому ответу машины',f:'модель может ошибаться',c:gold},
        {t:'учат на плохих примерах',f:'мусор на входе — мусор на выходе',c:pur},
        {t:'считают, что ИИ не ошибается',f:'точность бывает 90%, а не 100%',c:cyan}
      ];
      let s='';
      it.forEach((q,k)=>{
        const y=14+k*56;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.1+k*0.14).toFixed(2)}s">`
          +`<rect x="14" y="${y}" width="290" height="48" rx="11" fill="url(#${pre}card)" stroke="${q.c}" stroke-width="2"/>`
          +`<path d="M34 ${y+13} l12 21 h-24 z" fill="${red}" opacity=".9"/><text x="34" y="${y+30}" text-anchor="middle" font-size="11" font-weight="bold" fill="${ink}">!</text>`
          +fit(60,y+21,Math.min(11,200/Math.max(1,q.t.length)/0.72),q.c,q.t,{an:'start',b:1},200)
          +`<path d="M60 ${y+31} l5 5 l10 -11" fill="none" stroke="${grn}" stroke-width="2.4"/>`
          +fit(82,y+42,Math.min(10.5,180/Math.max(1,q.f.length)/0.72),grn,q.f,{an:'start'},186)+`</g>`;
      });
      s+=`${tx(159,266,11,dim,'проверяй эти четыре места',{})}`;
      return s;
    }
    if(K==='aisheet'){ /* шпаргалка */
      const rows=[{t:'ИИ учится на примерах с ответами',c:grn},{t:'признаки и веса решают всё',c:cyan},
                  {t:'обучение — цикл: угадай и исправь',c:gold},{t:'точность растёт с числом примеров',c:pur},
                  {t:'нейросеть: слои нейронов и связей',c:blu},{t:'ответ ИИ всегда проверяет человек',c:red}];
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${grn}" stroke-width="1.9"/>`
        +fit(159,32,12.5,grn,'всё главное об искусственном интеллекте',{b:1},264)+`</g>`;
      rows.forEach((q,k)=>{
        const y=50+k*36;
        s+=`<g class="${pre}Rise" style="animation-delay:${(0.1+k*0.12).toFixed(2)}s">`
          +`<rect x="22" y="${y}" width="274" height="30" rx="8" fill="rgba(18,24,44,.97)" stroke="${q.c}" stroke-width="1.6"/>`
          +fit(159,y+20,11,q.c,q.t,{b:1},260)+`</g>`;
      });
      s+=plate2(22,268,274,30,go?grn:cardB,go?'жми «Понял! Проверю себя» →':'шесть главных мыслей',11.5,pre);
      return s;
    }
    if(K==='aifinish'){ /* итог */
      let s=`<g class="${pre}Pop"><rect x="18" y="12" width="282" height="30" rx="9" fill="url(#${pre}card)" stroke="${gold}" stroke-width="1.9"/>`
        +fit(159,32,12.5,gold,'итог: как машина учится',{b:1},262)+`</g>`;
      s+=aiAxis(44,274,140,dim,'0 · квадрат','1 · круг');
      aiExamples.forEach((q,k)=>{ const x=44+230*q.x;
        s+=`<circle class="${pre}Pop" style="animation-delay:${(0.1+k*0.1).toFixed(2)}s" cx="${x.toFixed(1)}" cy="140" r="8" fill="${q.y?grn:blu}" fill-opacity=".3" stroke="${q.y?grn:blu}" stroke-width="1.6"/>`; });
      s+=aiThreshold(44,274,140,0.5,grn,'выученная граница');
      s+=fit(159,196,11.5,ink,'машина нашла границу сама — по примерам',{b:1},292);
      s+=`<g class="${pre}Rise}" style="animation-delay:.8s"><rect x="20" y="214" width="278" height="36" rx="10" fill="rgba(255,215,106,.14)" stroke="${gold}" stroke-width="1.8"/>`
        +fit(159,238,12,gold,'жми «Понял! Проверю себя» →',{b:1},250)+`</g>`;
      s+=`${fit(159,276,11,dim,'данные → признаки → обучение → проверка',{},292)}`;
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
          const fs=t.b?Math.min(17.5,286/(len*0.78)):Math.min(13.5,280/(len*0.72));
          const tl=(len*fs*0.9>286)?` textLength="284" lengthAdjust="spacingAndGlyphs"`:'';
          s2+=`<g class="${pre}Rise" style="animation-delay:${(0.12*k).toFixed(2)}s">`
            +`<text x="159" y="${ly}"${tl} text-anchor="middle" font-size="${fs.toFixed(1)}" fill="${col}" font-weight="${t.b?'bold':'normal'}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${txt}</text>`
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
          +`<text x="66" y="${cy2+5}"${(len*fs*0.9>236)?` textLength="234" lengthAdjust="spacingAndGlyphs"`:''} text-anchor="start" font-size="${fs.toFixed(1)}" fill="${col}" font-weight="${t.b?'bold':'normal'}" font-family="Arial,Helvetica,sans-serif" paint-order="stroke" stroke="#08101f" stroke-width="4">${txt}</text>`
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
    if(K==='code'){ const base=Math.max(110, 42+(v.lines||[]).length*24+16); return v.out? Math.max(base,(v.lines||[]).length*24+142) : base; }
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
    if(K==='pick'){ const ql=plain(v.q||'').length; return (ql>30?78:70)+(v.opts||[]).length*40+72; }
    if(K==='var') return 186;
    if(K==='assign') return 194;
    if(K==='input') return 190;
    if(K==='while') return (v.warn||v.pre)?232:214;
    if(K==='trace') return 26+27+(v.rows||[]).length*27+44;
    if(K==='compare') return 208;
    if(K==='text') return ((v.lines||[]).length<=2)?(132+26*(v.lines||[]).length):Math.max(134, (v.lines||[]).length*39+54);
    if(K==='maptask') return 214;
    if(K==='graphintro') return 228;
    if(K==='degree') return 226;
    if(K==='route') return 238;
    if(K==='longshort') return 238;
    if(K==='shortest') return 236;
    if(K==='deadend') return 228;
    if(K==='oneway') return 240;
    if(K==='weight') return 258;
    if(K==='bfs') return 238;
    if(K==='tree') return 240;
    if(K==='cycle') return 258;
    if(K==='metro') return 268;
    if(K==='walkgame') return 292;
    if(K==='tableintro') return 232;
    if(K==='rowcol') return 226;
    if(K==='celladdr') return 210;
    if(K==='tablecreate') return 218;
    if(K==='rowsum') return 200;
    if(K==='colsum') return 226;
    if(K==='findrow') return 214;
    if(K==='maxinrow') return 218;
    if(K==='avgrow') return 226;
    if(K==='sorttable') return 226;
    if(K==='tablevslist') return 208;
    if(K==='schedule') return 232;
    if(K==='grades') return 216;
    if(K==='tabgame') return 60+3*32+70;
    if(K==='findtask') return 200;
    if(K==='linear') return 194;
    if(K==='linearBad') return 190;
    if(K==='sortedRow') return 190;
    if(K==='halves') return 190;
    if(K==='binsteps') return 34+(v.steps||[1,2,3]).length*62+26;
    if(K==='binaryCount') return 58+((v.vals||[1,2]).length)*54+28;
    if(K==='rule') return 194;
    if(K==='phonebook') return 212;
    if(K==='notfound') return 176;
    if(K==='dups') return 200;
    if(K==='halving') return 26+7*26+26;
    if(K==='mistakes') return 26+((v.items||[1,2,3]).length)*54+22;
    if(K==='guessnum') return 54+Math.ceil(((v.hi||15)-(v.lo||1)+1)/5)*30+76;
    if(K==='disorder') return 200;
    if(K==='order') return 190;
    if(K==='scale') return 196;
    if(K==='swap2') return 166;
    if(K==='bubble') return 212;
    if(K==='pass') return 206;
    if(K==='passes') return 26+(v.rows||[1,2,3,4]).length*42+22;
    if(K==='minscan') return 180;
    if(K==='minmove') return 208;
    if(K==='sortedok') return 200;
    if(K==='neighbors') return 194;
    if(K==='why') return 198;
    if(K==='countcmp') return 58+(v.rows||[1,2,3,4]).length*32+28;
    if(K==='sortgame') return 232;
    if(K==='manyvars') return 218;
    if(K==='train') return 200;
    if(K==='cells') return 200;
    if(K==='index0') return 202;
    if(K==='create') return 216;
    if(K==='length') return 200;
    if(K==='walk') return 196;
    if(K==='sumlist') return 204;
    if(K==='maxlist') return 200;
    if(K==='findlist') return 204;
    if(K==='append') return 186;
    if(K==='outofrange') return 202;
    if(K==='marks') return 220;
    if(K==='findcell') return 210;
    if(K==='aiintro') return 300;
    if(K==='aiwhere') return 306;
    if(K==='ainotmagic') return 310;
    if(K==='aidata') return 300;
    if(K==='aifeatures') return 296;
    if(K==='aiexample') return 286;
    if(K==='aiweight') return 300;
    if(K==='aiguess') return 296;
    if(K==='aicorrect') return 300;
    if(K==='ailoop') return 292;
    if(K==='aimore') return 296;
    if(K==='aiaccuracy') return 296;
    if(K==='aitree') return 316;
    if(K==='aineuron') return 310;
    if(K==='ailayers') return 312;
    if(K==='ainotprogram') return 288;
    if(K==='aibaddata') return 306;
    if(K==='aiethics') return 298;
    if(K==='aiplan') return 296;
    if(K==='aipractice') return 278;
    if(K==='aitrain') return 312;
    if(K==='aitreegame') return 330;
    if(K==='aitest') return 306;
    if(K==='aimistakes') return 282;
    if(K==='aisheet') return 308;
    if(K==='aifinish') return 292;
    if(K==='fracintro') return 306;
    if(K==='selfsimilar') return 308;
    if(K==='fracrule') return 292;
    if(K==='recursion') return 296;
    if(K==='tree1') return 314;
    if(K==='tree3') return 300;
    if(K==='tree5') return 280;
    if(K==='tree7') return 306;
    if(K==='treecount') return 308;
    if(K==='sierp1') return 304;
    if(K==='sierp2') return 304;
    if(K==='sierp3') return 304;
    if(K==='sierp4') return 306;
    if(K==='sierpcount') return 300;
    if(K==='koch1') return 280;
    if(K==='koch2') return 284;
    if(K==='koch3') return 286;
    if(K==='koch4') return 296;
    if(K==='kochperim') return 300;
    if(K==='fern') return 300;
    if(K==='fraczoom') return 292;
    if(K==='nature') return 312;
    if(K==='fracpractice') return 296;
    if(K==='fraccreator') return 336;
    if(K==='fracmist') return 282;
    if(K==='fracsheet') return 308;
    if(K==='secrettask') return 244;
    if(K==='caesarstory') return 268;
    if(K==='shift3') return 254;
    if(K==='cipherdisc') return 282;
    if(K==='cipherenc') return 258;
    if(K==='cipherdec') return 282;
    if(K==='keyidea') return 288;
    if(K==='keyvars') return 264;
    if(K==='alpha') return 250;
    if(K==='ciphex1') return 276;
    if(K==='ciphex2') return 272;
    if(K==='revword') return 268;
    if(K==='numcode') return 268;
    if(K==='symcode') return 256;
    if(K==='keysecret') return 262;
    if(K==='brute') return 312;
    if(K==='crackword') return 284;
    if(K==='cpdial') return 278;
    if(K==='cpracc') return 250;
    if(K==='hardcipher') return 280;
    if(K==='stego') return 288;
    if(K==='cpsafety') return 258;
    if(K==='cpgame1') return 220;
    if(K==='cpgame2') return 216;
    if(K==='cpcheck') return 258;
    if(K==='nettask') return 212;
    if(K==='network') return 248;
    if(K==='localnet') return 260;
    if(K==='globe') return 262;
    if(K==='ipaddr') return 240;
    if(K==='ipunique') return 238;
    if(K==='dns') return 240;
    if(K==='packets') return 250;
    if(K==='packetroute') return 254;
    if(K==='routerjob') return 264;
    if(K==='protocol') return 282;
    if(K==='wifi') return 254;
    if(K==='serverclient') return 232;
    if(K==='browser') return 268;
    if(K==='speed') return 276;
    if(K==='praccalc') return 266;
    if(K==='pracpackets') return 262;
    if(K==='pracaddr') return 252;
    if(K==='safety') return 260;
    if(K==='netgame') return 284;
    if(K==='netgame2') return 294;
    if(K==='netmist') return 318;
    if(K==='netsum') return 284;
    if(K==='netcheck') return 260;
    if(K==='movetask') return 224;
    if(K==='flipbook') return 256;
    if(K==='frame') return 250;
    if(K==='fps') return 244;
    if(K==='slowfast') return 234;
    if(K==='eye') return 252;
    if(K==='fpsvalues') return 268;
    if(K==='framescount') return 258;
    if(K==='framepixels') return 268;
    if(K==='vidres') return 246;
    if(K==='vidsize') return 258;
    if(K==='vidsound') return 232;
    if(K==='changes') return 260;
    if(K==='keyframe') return 262;
    if(K==='vformats') return 240;
    if(K==='slowmo') return 234;
    if(K==='practice1') return 252;
    if(K==='practice2') return 246;
    if(K==='vidgame') return 218;
    if(K==='vidgame2') return 232;
    if(K==='vidsum') return 282;
    if(K==='vtheory') return 272;
    if(K==='vpractice3') return 254;
    if(K==='vcheck') return 248;
    if(K==='sndtask') return 214;
    if(K==='sndwave') return 216;
    if(K==='sndsample') return 232;
    if(K==='sndnumbers') return 216;
    if(K==='sndfew') return 224;
    if(K==='sndmore') return 224;
    if(K==='sndrate') return 236;
    if(K==='sndlevels') return 216;
    if(K==='sndsize') return 244;
    if(K==='sndstereo') return 216;
    if(K==='sndpipe') return 268;
    if(K==='sndmp3') return 226;
    if(K==='sndanalog') return 234;
    if(K==='sndgame') return 226;
    if(K==='sndmistakes') return 20+((v.items||[1,2,3]).length)*54+22;
    if(K==='sndvoice') return 48+((v.ex||[1,2,3]).length)*46+18;
    if(K==='pixeltask') return 220;
    if(K==='pixzoom') return 220;
    if(K==='pixel') return 236;
    if(K==='bw') return 224;
    if(K==='drawbits') return 240;
    if(K==='readbits') return 230;
    if(K==='graylevels') return 220;
    if(K==='colors') return 230;
    if(K==='colorcode') return 220;
    if(K==='bitscount') return 224;
    if(K==='imgsize') return 228;
    if(K==='resolution') return 228;
    if(K==='rle') return 210;
    if(K==='photo') return 24+282+3*30;
    if(K==='drawgame') return 64+6*26+52;
    if(K==='pixmistakes') return 22+((v.items||[1,2,3]).length)*54+22;
    if(K==='broken') return 216;
    if(K==='kinds3') return 218;
    if(K==='console') return 204;
    if(K==='stepdebug') return (v.lines||['a','b','c','d','e']).length*26+62;
    if(K==='printDebug') return (v.out||['a','b','c']).length*26+96;
    if(K==='traceErr') return 40+28+(v.rows||[]).length*28+60;
    if(K==='breakpoints') return (v.lines||['a','b','c','d']).length*26+104;
    if(K==='bisect') return 226;
    if(K==='fixpatch') return 200;
    if(K==='checklist') return (v.items||['a','b','c','d']).length*44+46;
    if(K==='fixkit') return 216;
    if(K==='guess') return 222;
    if(K==='summary514') return 226;
    if(K==='find') return 58+(v.lines||[]).length*26+68;
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
        {h:'Информация', v:{kind:'cards', items:[{t:'📝 текст', d:'слова, буквы', c:cyan},{t:'🔢 число', d:'цифры', c:gold},{t:'🖼 картинка', d:'изображение', c:grn},{t:'🔊 звук', d:'музыка, речь', c:pur}]}, r:'Информация — это сведения об окружающем мире.', d:'Текст, число, картинка и звук — четыре вида информации: компьютер умеет хранить и обрабатывать все четыре.'} ,
        {h:'Как мы получаем', v:{kind:'cards', items:[{t:'👁 зрение', c:cyan},{t:'👂 слух', c:gold},{t:'👃 запах', c:grn},{t:'✋ осязание', c:pur}]}, r:'Информацию человек получает органами чувств.', d:'Глаза, уши, нос и кожа — «датчики» человека: через них информация попадает в мозг.'} ,
        {h:'Компьютер', v:{kind:'machine'}, r:'Компьютер хранит, обрабатывает и передаёт информацию.', d:'Внутри системного блока крутится кулер, на экране бегут строки, на клавиатуре вспыхивают клавиши — компьютер всё время работает с данными.'} ,
        {h:'Схема работы', v:{kind:'ipo'}, r:'ВВОД → ОБРАБОТКА → ВЫВОД.', d:'Точки бегут по стрелкам и показывают путь информации: сначала ввод, потом обработка, в конце вывод.'} ,
        {h:'Ввод', v:{kind:'cards', items:[{t:'⌨ клавиатура', c:cyan},{t:'🖱 мышь', c:cyan},{t:'📷 камера', c:cyan},{t:'🎤 микрофон', c:cyan}]}, r:'Ввод — информация попадает в компьютер.', d:'Всё, чем информацию «заносят» в компьютер, — это устройства ввода.'} ,
        {h:'Обработка', v:{kind:'text', lines:[{t:'Компьютер выполняет программу', b:1},{t:'и меняет информацию', b:1},{t:'(считает, ищет, рисует)', c:dim}]}, r:'Обработка — компьютер работает с информацией по программе.', d:'Обработка — работа по программе: компьютер считает, ищет, сравнивает и рисует.'} ,
        {h:'Вывод', v:{kind:'cards', items:[{t:'🖥 экран', c:grn},{t:'🔊 колонки', c:grn},{t:'🖨 принтер', c:grn},{t:'📽 проектор', c:grn}]}, r:'Вывод — результат показывают обратно.', d:'Результат компьютер показывает обратно: на экран, в колонки, на бумагу.'} ,
        {h:'Пример', v:{kind:'ipo'}, r:'Клавиша → программа → буква на экране.', d:'Нажали клавишу — программа обработала сигнал — на экране появилась буква. Так работает любая программа.'} ,
        {h:'Важно', v:{kind:'text', lines:[{t:'Компьютер сам не «понимает»', b:1, c:red},{t:'Он делает только то, что', c:dim},{t:'заложил человек в программе', b:1, c:grn}]}, r:'Компьютер выполняет команды человека.', d:'Компьютер не понимает смысл того, что делает: он послушно выполняет то, что записал человек.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Клавиатура — это ввод или вывод?', opts:[{t:'ввод', ok:1},{t:'вывод'},{t:'обработка'}], exp:'Клавиатура «заносит» информацию в компьютер — это ввод.'}, r:'Проверь себя: ввод, обработка или вывод.', d:'Смотри на устройство и решай: информация попадает в компьютер или выходит из него?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'информация', b:1},{t:'текст · число · картинка · звук', c:dim},{t:'ВВОД → ОБРАБОТКА → ВЫВОД', c:grn, b:1}]}, r:'Запомни три шага работы компьютера.', d:'Запомни порядок: информация → ввод → обработка → вывод.'} ],
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
        {h:'Внутри компьютера', v:{kind:'text', lines:[{t:'Только сигналы:', b:1},{t:'есть ток · нет тока', c:cyan, b:1},{t:'Любая информация — из них!', c:dim}]}, r:'Компьютер хранит всё как сигналы.', d:'Внутри компьютера нет букв и картинок — только сигналы: есть ток или нет тока.'} ,
        {h:'0 и 1', v:{kind:'bits', bits:[1,0]}, r:'Есть ток = 1, нет тока = 0.', d:'Два состояния выключателя — два знака: 1 (ток есть) и 0 (тока нет).'} ,
        {h:'Что такое бит', v:{kind:'text', lines:[{t:'БИТ — один 0 или одна 1', b:1, c:gold},{t:'самая маленькая единица', c:dim},{t:'информации', c:dim}]}, r:'Бит — самая маленькая единица информации.', d:'Один бит — это один знак: либо 0, либо 1. Меньше единицы информации не бывает.'} ,
        {h:'Бит = выключатель', v:{kind:'bits', bits:[1,1,0,0]}, r:'Включён = 1, выключен = 0.', d:'Каждый бит — как выключатель: 1 — включён, 0 — выключен; вместе биты образуют цепочку.'} ,
        {h:'Мало бит', v:{kind:'text', lines:[{t:'Один бит = только «да/нет»', b:1},{t:'Поэтому биты объединяют', c:dim},{t:'в группы', c:dim}]}, r:'Из одного бита мало что закодируешь.', d:'Одним битом можно сказать только «да» или «нет», поэтому биты объединяют в группы.'} ,
        {h:'Байт', v:{kind:'bits', bits:[1,1,1,1,1,1,1,1], note:'8 бит вместе — это 1 байт'}, r:'8 бит = 1 байт.', d:'Смотри на скобку: восемь бит под ней собираются в один байт.'} ,
        {h:'Байт хранит букву', v:{kind:'cards', items:[{t:'1 байт', d:'= 1 буква', c:grn},{t:'1 байт', d:'= 8 бит', c:blu}]}, r:'В одном байте — одна буква.', d:'Один байт вмещает один символ: букву, цифру или знак.'} ,
        {h:'Всё — это 0 и 1', v:{kind:'rain'}, r:'Буквы, картинки, музыка — всё цепочки 0 и 1.', d:'По проводам бегут волны нулей и единиц: так хранится и текст, и картинка, и музыка.'} ,
        {h:'Длиннее — больше', v:{kind:'text', lines:[{t:'Больше бит → больше значений', b:1},{t:'2 бита → 4 значения', c:cyan},{t:'3 бита → 8 значений', c:grn}]}, r:'Чем длиннее цепочка, тем больше вариантов.', d:'Чем больше бит в цепочке, тем больше значений: 2 бита — 4 значения, 3 бита — 8.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Сколько бит в одном байте?', opts:[{t:'8', ok:1},{t:'10'},{t:'100'}], exp:'1 байт = 8 бит — это надо помнить наизусть.'}, r:'Проверь себя про биты и байт.', d:'Вспомни главное число этого урока: 1 байт = 8 бит.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'1 бит = 0 или 1', b:1},{t:'1 байт = 8 бит', c:grn, b:1},{t:'всё хранится как 0 и 1', c:dim}]}, r:'Запомни: бит, байт, 0 и 1.', d:'Главное про хранение: бит — 0 или 1, байт — 8 бит, а всё остальное собирается из них.'} ],
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
        {h:'Десятичные числа', v:{kind:'text', lines:[{t:'цифры 0…9', b:1, c:cyan},{t:'разряды: 1, 10, 100…', c:dim}]}, r:'В обычных числах 10 цифр.', d:'В обычной жизни у нас 10 цифр, и каждый разряд в 10 раз больше соседнего.'} ,
        {h:'Двоичные числа', v:{kind:'text', lines:[{t:'только 0 и 1', b:1, c:grn},{t:'разряды: 1, 2, 4, 8…', c:dim}]}, r:'В двоичных числах только две цифры.', d:'У компьютера только две цифры, поэтому каждый разряд в 2 раза больше соседнего: 1, 2, 4, 8.'} ,
        {h:'Разряды', v:{kind:'binary', powers:[8,4,2,1], bits:[0,0,0,0]}, r:'Двоичные разряды: 1, 2, 4, 8 (удвоение).', d:'Пока все разряды выключены — число равно нулю; включаем разряды — получаем значение.'} ,
        {h:'Правило перевода', v:{kind:'text', lines:[{t:'Сложи разряды,', b:1},{t:'где стоит 1', b:1, c:grn}]}, r:'Складываем разряды с единицами.', d:'Чтобы перевести двоичное число, складываем только те разряды, где стоит единица.'} ,
        {h:'Пример 101', v:{kind:'binary', powers:[4,2,1], bits:[1,0,1]}, r:'101₂ = 4 + 0 + 1 = 5.', d:'Единицы стоят в разрядах 4 и 1, значит 101₂ = 4 + 1 = 5.'} ,
        {h:'Пример 110', v:{kind:'binary', powers:[4,2,1], bits:[1,1,0]}, r:'110₂ = 4 + 2 + 0 = 6.', d:'Единицы в разрядах 4 и 2: 110₂ = 4 + 2 = 6.'} ,
        {h:'Пример 111', v:{kind:'binary', powers:[4,2,1], bits:[1,1,1]}, r:'111₂ = 4 + 2 + 1 = 7.', d:'Все три разряда включены: 4 + 2 + 1 = 7.'} ,
        {h:'Как понимает компьютер', v:{kind:'text', lines:[{t:'числа собраны из 0 и 1', b:1},{t:'по разрядам 1,2,4,8', c:dim}]}, r:'Компьютер считает по разрядам.', d:'Компьютер не считает в нашем смысле — он просто складывает значения включённых разрядов.'} ,
        {h:'Ещё числа', v:{kind:'binary', powers:[4,2,1], bits:[0,1,0]}, r:'010₂ = 2.', d:'Ноль в старшем разряде ничего не добавляет: 010₂ — это то же самое, что 10₂ = 2.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Чему равно двоичное число 100₂?', opts:[{t:'4', ok:1},{t:'100'},{t:'1'}], exp:'Единица стоит в разряде 4, значит 100₂ = 4.'}, r:'Проверь себя: перевод двоичного числа.', d:'Смотри на разряды: в числе 100₂ единица стоит в разряде 4.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'двоичные — 0 и 1', b:1},{t:'разряды 1,2,4,8', c:cyan},{t:'сложи разряды с 1', c:grn, b:1}]}, r:'Перевод: складываем разряды с единицами.', d:'Алгоритм перевода: выпиши разряды и сложи те, где стоит единица.'} ],
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
        {h:'Буквы как числа', v:{kind:'text', lines:[{t:'Компьютер хранит буквы', b:1},{t:'как ЧИСЛА (коды)', b:1, c:pur}]}, r:'Каждой букве — своё число.', d:'Компьютер не хранит буквы — он хранит их номера.'} ,
        {h:'Таблица кодов', v:{kind:'codes', pairs:[['А','1'],['Б','2'],['В','3'],['Г','4']]}, r:'Есть таблица код ↔ буква.', d:'Таблица кодов — это словарь: каждой букве соответствует своё число.'} ,
        {h:'Буква по номеру', v:{kind:'codes', pairs:[['К','12'],['О','16'],['Т','20']], hl:0}, r:'К — 12-я, О — 16-я, Т — 20-я.', d:'Подсвечена та буква, которую мы ищем: у неё свой номер в таблице.'} ,
        {h:'Слово = цепочка', v:{kind:'text', lines:[{t:'«КОТ» → К, О, Т', b:1},{t:'это три буквы — три кода', c:dim}]}, r:'Слово — цепочка кодов.', d:'Слово кодируется по буквам: каждая буква превращается в свой номер.'} ,
        {h:'Считаем КОТ', v:{kind:'codes', pairs:[['К','12'],['О','16'],['Т','20']], chain:1, result:'12 16 20'}, r:'«КОТ» = 12 16 20.', d:'Коды складываются по порядку букв: между плитками стоят плюсы, а ниже — готовая цепочка чисел.'} ,
        {h:'Собираем код', v:{kind:'text', lines:[{t:'К=12 · О=16 · Т=20', b:1, c:pur},{t:'→ 12 16 20', b:1, c:grn}]}, r:'Получилась цепочка чисел.', d:'Из отдельных кодов собралась цепочка: К=12, О=16, Т=20 — вместе 12 16 20.'} ,
        {h:'Раскодировать', v:{kind:'text', lines:[{t:'по числу находим букву', b:1},{t:'12 → К', c:cyan}]}, r:'Обратно: число → буква.', d:'Действие работает и наоборот: по числу находим букву в той же таблице.'} ,
        {h:'Другая информация', v:{kind:'cards', items:[{t:'🖼 картинка', d:'свои коды', c:grn},{t:'🔊 звук', d:'свои коды', c:gold}]}, r:'У каждого вида — своя таблица кодов.', d:'У картинок своя таблица кодов, у звука — своя: одни и те же числа могут означать разное.'} ,
        {h:'Главное', v:{kind:'rain'}, r:'Компьютер превращает всё в числа, потом в 0 и 1.', d:'Компьютер переводит всё в числа, а числа — в нули и единицы.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Если А = 1, Б = 2, то какой код у буквы А?', opts:[{t:'1', ok:1},{t:'2'},{t:'А'}], exp:'А — первая буква, её код 1.'}, r:'Проверь себя: буква и её код.', d:'Пользуйся таблицей: под номером 1 стоит первая буква алфавита.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'буква = число (код)', b:1},{t:'слово = цепочка кодов', c:dim},{t:'всё → числа → 0 и 1', c:grn, b:1}]}, r:'Запомни: буква кодируется числом.', d:'Помни цепочку: буква → число → 0 и 1.'} ],
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
        {h:'Что такое алгоритм', v:{kind:'text', lines:[{t:'последовательность шагов', b:1, c:gold},{t:'для решения задачи', b:1}]}, r:'Алгоритм — шаги для решения задачи.', d:'Алгоритм — это план из понятных шагов, которые приводят к результату.'} ,
        {h:'Каждый шаг прост', v:{kind:'text', lines:[{t:'один шаг — одно действие', b:1},{t:'и оно понятно исполнителю', c:dim}]}, r:'Шаг — простое понятное действие.', d:'Шаг должен быть простым: одно действие, которое исполнитель точно сумеет сделать.'} ,
        {h:'Порядок важен', v:{kind:'steps', steps:['взять чашку','положить чай','налить кипяток','подождать']}, r:'Поменяешь шаги — будет неверно.', d:'Шаги идут по порядку, и подсветка бежит сверху вниз — так их выполняет исполнитель.'} ,
        {h:'Пример', v:{kind:'steps', steps:['открыть тетрадь','взять ручку','написать дату']}, r:'Шаги идут строго по порядку.', d:'Алгоритм «записать дату» состоит из трёх простых шагов.'} ,
        {h:'Конечность', v:{kind:'text', lines:[{t:'алгоритм заканчивается', b:1, c:grn},{t:'(конечное число шагов)', c:dim}]}, r:'Алгоритм конечен.', d:'У алгоритма есть последний шаг: он обязательно заканчивается.'} ,
        {h:'Точность', v:{kind:'text', lines:[{t:'всё точно', b:1},{t:'без «как-нибудь»', c:red}]}, r:'Алгоритм точный.', d:'В алгоритме не бывает «примерно» и «как-нибудь» — только точные команды.'} ,
        {h:'Понятность', v:{kind:'text', lines:[{t:'исполнитель умеет', b:1},{t:'эти команды', c:grn}]}, r:'Команды должны быть понятны.', d:'Команды должны быть из списка того, кто их выполняет.'} ,
        {h:'Как записать', v:{kind:'cards', items:[{t:'словами', c:blu},{t:'блок-схемой', c:pur},{t:'программой', c:cyan},{t:'таблицей', c:gold}]}, r:'Алгоритм записывают по-разному.', d:'Один и тот же алгоритм можно записать словами, фигурами, программой или таблицей.'} ,
        {h:'Разные пути', v:{kind:'text', lines:[{t:'один результат —', b:1},{t:'разные алгоритмы', c:dim}]}, r:'Результат один, способы разные.', d:'К одному результату могут вести разные алгоритмы — выбирай удобный.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Что будет, если поменять шаги алгоритма местами?', opts:[{t:'получится неверный результат', ok:1},{t:'ничего не изменится'},{t:'алгоритм станет быстрее'}], exp:'Порядок шагов важен: поменяешь местами — результат будет другим.'}, r:'Проверь себя: важен ли порядок шагов.', d:'Проверь себя: можно ли менять шаги алгоритма местами?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'алгоритм = шаги', b:1},{t:'конечный · точный · понятный', c:cyan},{t:'порядок важен', c:gold, b:1}]}, r:'Запомни свойства алгоритма.', d:'Три свойства алгоритма: конечность, точность и понятность — и, конечно, порядок шагов.'} ],
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
        {h:'Кто такой исполнитель', v:{kind:'text', lines:[{t:'тот, кто выполняет', b:1},{t:'команды', b:1, c:cyan}]}, r:'Исполнитель выполняет команды.', d:'Исполнитель — тот, кто умеет выполнять команды: робот, человек или компьютер.'} ,
        {h:'Список команд', v:{kind:'cards', items:[{t:'⬆ вперёд', c:grn},{t:'⬅ влево', c:blu},{t:'➡ вправо', c:blu},{t:'⬇ назад', c:grn}]}, r:'У исполнителя есть свой набор команд.', d:'У каждого исполнителя свой набор команд: робот понимает «вперёд», «влево», «вправо» и «назад».'} ,
        {h:'Команды робота', v:{kind:'robot', pos:[2,5], path:[[2,5],[2,4],[1,4],[2,4],[3,4]]}, r:'Робот идёт по клеткам: вперёд, влево, вправо.', d:'Пунктир показывает путь: робот шагает вперёд, поворачивает влево и снова идёт вправо.'} ,
        {h:'По порядку', v:{kind:'steps', steps:['вперёд','вперёд','вправо','вперёд']}, r:'Команды выполняются по порядку.', d:'Команды выполняются по порядку, одна за другой.'} ,
        {h:'Робот не думает', v:{kind:'text', lines:[{t:'делает ровно то,', b:1},{t:'что написано', b:1, c:gold}]}, r:'Робот выполняет буквально команды.', d:'Робот не рассуждает: что написано — то он и делает.'} ,
        {h:'Планируй путь', v:{kind:'robot', pos:[0,3], walls:[[3,2],[3,3]], path:[[0,3],[1,3],[2,3],[2,4],[3,4],[4,4]]}, r:'Стена перегородила путь — идём в обход.', d:'Стена перегородила дорогу, поэтому маршрут идёт в обход — путь надо планировать заранее.'} ,
        {h:'Ошибка', v:{kind:'text', lines:[{t:'неверная команда →', b:1},{t:'робот идёт не туда', c:red}]}, r:'Ошибка в команде — робот ошибётся.', d:'Одна неверная команда — и робот уходит не туда.'} ,
        {h:'Поле', v:{kind:'robot', pos:[0,0], path:[[0,0],[1,0],[2,0],[3,0]]}, r:'Робот двигается по клеткам поля.', d:'Робот двигается по клеткам поля, как по клетчатой тетради.'} ,
        {h:'Программа', v:{kind:'code', lines:[{t:'вперёд', c:cyan},{t:'вперёд', c:cyan},{t:'вправо', c:gold},{t:'вперёд', c:cyan}]}, r:'Программа — список команд по порядку.', d:'Программа исполнителя — просто список команд по порядку.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Робот получил команду «вправо». Что он сделает?', opts:[{t:'шагнёт на клетку вправо', ok:1},{t:'подумает и выберет сам'},{t:'остановится'}], exp:'Исполнитель выполняет команду буквально: «вправо» — значит вправо.'}, r:'Проверь себя: как робот понимает команды.', d:'Вспомни: исполнитель понимает команду буквально.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'исполнитель = выполняет', b:1},{t:'у него есть команды (СКИ)', c:cyan},{t:'по порядку, буквально', c:dim}]}, r:'Запомни: исполнитель делает команды.', d:'Исполнитель — тот, кто умеет выполнять команды своего набора.'} ],
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
        {h:'Повтор нужен часто', v:{kind:'text', lines:[{t:'одно действие', b:1},{t:'много раз', b:1, c:gold}]}, r:'Одинаковые действия повторяются.', d:'Одинаковые действия встречаются в алгоритмах очень часто.'} ,
        {h:'Проблема', v:{kind:'code', lines:[{t:'вперёд'},{t:'вперёд'},{t:'вперёд'},{t:'вперёд'}]}, r:'Писать одно и то же долго.', d:'Писать одну и ту же команду много раз долго, и в ней легко ошибиться.'} ,
        {h:'Цикл', v:{kind:'loop', n:4, body:'вперёд'}, r:'Цикл: «Повтори 4 раза: вперёд».', d:'Точка бежит по кругу, а тело цикла повторяется нужное число раз.'} ,
        {h:'Короче', v:{kind:'text', lines:[{t:'цикл короче', b:1, c:grn},{t:'чем 100 команд', c:dim}]}, r:'Цикл экономит запись.', d:'Цикл короче длинной записи: одна строка вместо сотни команд.'} ,
        {h:'Квадрат', v:{kind:'text', lines:[{t:'Повтори 4 раза:', b:1},{t:'вперёд и повернуть', c:cyan}]}, r:'Квадрат — 4 повтора.', d:'Квадрат получается, если четыре раза повторить «вперёд и повернуть».'} ,
        {h:'Число повторов', v:{kind:'loop', n:3, body:'вправо'}, r:'Число в цикле — сколько повторов.', d:'Число в цикле говорит, сколько раз повторить тело.'} ,
        {h:'Тело цикла', v:{kind:'text', lines:[{t:'тело цикла —', b:1},{t:'что повторяется', b:1, c:grn}]}, r:'Тело цикла повторяется.', d:'Тело цикла — это команды, которые повторяются.'} ,
        {h:'Цикл со счётчиком', v:{kind:'loop', n:5, body:'вперёд'}, r:'Известное число повторов — цикл со счётчиком.', d:'Когда число повторов известно заранее, его просто пишут в цикле.'} ,
        {h:'Экономия', v:{kind:'text', lines:[{t:'короче и понятнее', b:1, c:grn}]}, r:'Циклы делают программу короче.', d:'Циклы делают программу короче и понятнее.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Что делает цикл «повтори 4 раза: вперёд»?', opts:[{t:'повторяет команду «вперёд» четыре раза', ok:1},{t:'выполняет четыре разные команды'},{t:'останавливает программу'}], exp:'Цикл повторяет тело столько раз, сколько написано в цикле.'}, r:'Проверь себя: что такое цикл.', d:'Проверь себя: что именно повторяет цикл?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'цикл = повторение', b:1},{t:'повтори N раз: …', c:gold, b:1},{t:'тело цикла повторяется', c:dim}]}, r:'Запомни: цикл повторяет.', d:'Цикл — это повторение тела заданное число раз.'} ],
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
        {h:'Не всегда', v:{kind:'text', lines:[{t:'иногда команда нужна', b:1},{t:'только при условии', b:1, c:pur}]}, r:'Команда может зависеть от условия.', d:'Иногда команду нужно выполнить не всегда, а только при определённом условии.'} ,
        {h:'Условие', v:{kind:'text', lines:[{t:'проверка: да или нет', b:1, c:cyan}]}, r:'Условие даёт «да» или «нет».', d:'Условие — это вопрос, на который можно ответить только «да» или «нет».'} ,
        {h:'Запись', v:{kind:'cond', q:'впереди стена?', then:'повернуть'}, r:'ЕСЛИ условие ТО команда.', d:'Ромб показывает условие, зелёная ветка — что делать при ответе «да», штриховая — при «нет».'} ,
        {h:'Когда работает', v:{kind:'text', lines:[{t:'если условие ИСТИННО —', b:1},{t:'команда выполняется', b:1, c:grn}]}, r:'Команда работает при истине.', d:'Если условие истинно, то есть ответ «да», команда выполняется.'} ,
        {h:'Когда не работает', v:{kind:'text', lines:[{t:'если условие ЛОЖНО —', b:1},{t:'команда пропускается', c:red, b:1}]}, r:'При лжи — пропуск.', d:'Если условие ложно, команда пропускается.'} ,
        {h:'Пример', v:{kind:'cond', q:'впереди стена?', then:'повернуть'}, r:'Проверил — и решил.', d:'Робот проверил, есть ли впереди стена, и решил, что делать дальше.'} ,
        {h:'Сначала проверка', v:{kind:'steps', steps:['проверить условие','если да — сделать','если нет — пропустить']}, r:'Сначала проверка, потом действие.', d:'Порядок такой: сначала проверить условие, потом действовать.'} ,
        {h:'Иначе', v:{kind:'text', lines:[{t:'ЕСЛИ … ТО …', b:1, c:grn},{t:'ИНАЧЕ …', b:1, c:red}]}, r:'«Иначе» — второй вариант.', d:'Ветка «иначе» добавляет второй вариант: что делать, если условие ложно.'} ,
        {h:'Умнее', v:{kind:'text', lines:[{t:'программа реагирует', b:1},{t:'на ситуацию', c:dim}]}, r:'Условия делают программу умнее.', d:'С условиями программа реагирует на ситуацию, а не действует вслепую.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Условие «светло?» оказалось ложным. Что сделает программа?', opts:[{t:'пропустит команду', ok:1},{t:'выполнит команду дважды'},{t:'остановится навсегда'}], exp:'При ложном условии команда пропускается — ветка не выполняется.'}, r:'Проверь себя: что бывает при ложном условии.', d:'Проверь себя: что делает программа, если условие ложно?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'ЕСЛИ условие ТО команда', b:1},{t:'да → делать · нет → пропустить', c:cyan}]}, r:'Запомни: условие — это «да/нет».', d:'Условие даёт «да» или «нет»: при «да» — делаем, при «нет» — пропускаем.'} ],
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
        {h:'Что это', v:{kind:'text', lines:[{t:'алгоритм из фигур', b:1},{t:'и стрелок', b:1, c:cyan}]}, r:'Блок-схема — рисунок алгоритма.', d:'Блок-схема — это рисунок алгоритма: фигуры и стрелки показывают порядок шагов.'} ,
        {h:'Начало и конец', v:{kind:'flow', shapes:[{k:'o',t:'начало',c:grn},{k:'o',t:'конец',c:red}]}, r:'Овал = начало/конец.', d:'Овал — начало и конец схемы: с него начинаем и им заканчиваем.'} ,
        {h:'Действие', v:{kind:'flow', shapes:[{k:'r',t:'взять ручку',c:blu}]}, r:'Прямоугольник = действие.', d:'Прямоугольник — действие: то, что исполнитель делает.'} ,
        {h:'Условие', v:{kind:'flow', shapes:[{k:'d',t:'стена?',c:pur}]}, r:'Ромб = условие.', d:'Ромб — условие: из него выходят две стрелки, «да» и «нет».'} ,
        {h:'Ввод / вывод', v:{kind:'flow', shapes:[{k:'p',t:'прочитать число',c:gold},{k:'p',t:'показать ответ',c:grn}]}, r:'Параллелограмм = ввод/вывод.', d:'Параллелограмм — ввод или вывод: так в схемах помечают «прочитать» и «показать».'} ,
        {h:'Стрелки', v:{kind:'flow', shapes:[{k:'r',t:'шаг 1',c:blu},{k:'r',t:'шаг 2',c:blu}]}, r:'Стрелки показывают порядок.', d:'Стрелки показывают порядок: по ним схема читается сверху вниз.'} ,
        {h:'Читаем сверху', v:{kind:'flow', shapes:[{k:'o',t:'начало',c:grn},{k:'r',t:'действие',c:blu},{k:'o',t:'конец',c:red}]}, r:'Читаем сверху вниз.', d:'Начало, действие, конец — вся схема читается по стрелкам сверху вниз.'} ,
        {h:'Да и нет', v:{kind:'flow', shapes:[{k:'d',t:'условие?',c:pur},{k:'r',t:'действие',c:grn}]}, r:'Из ромба — две стрелки: да и нет.', d:'Из ромба выходят две ветки: «да» — вниз к действию, «нет» — в сторону.'} ,
        {h:'Помогает увидеть', v:{kind:'text', lines:[{t:'вся программа', b:1},{t:'как на ладони', c:dim}]}, r:'Блок-схема видна целиком.', d:'Блок-схема показывает программу целиком: сразу видно все ветки и повторы.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Какая фигура в блок-схеме обозначает условие?', opts:[{t:'ромб', ok:1},{t:'овал'},{t:'прямоугольник'}], exp:'Условие — ромб, действие — прямоугольник, начало и конец — овал.'}, r:'Проверь себя: фигуры блок-схемы.', d:'Вспомни фигуры: условие, действие, начало и конец.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'овал — начало/конец', b:1},{t:'прямоуг. — действие', c:blu},{t:'ромб — условие', c:pur, b:1}]}, r:'Запомни фигуры блок-схемы.', d:'Овал — начало и конец, прямоугольник — действие, параллелограмм — ввод и вывод, ромб — условие.'} ],
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
        {h:'Что такое программа', v:{kind:'text', lines:[{t:'алгоритм для компьютера', b:1},{t:'записанный командами', b:1, c:cyan}]}, r:'Программа — алгоритм для компьютера.', d:'Программа — это алгоритм, записанный командами, понятными компьютеру.'} ,
        {h:'Из команд', v:{kind:'code', lines:[{t:'команда 1', c:cyan},{t:'команда 2', c:cyan},{t:'команда 3', c:cyan}]}, r:'Программа — список команд.', d:'Программа — список команд, которые выполняются по порядку.'} ,
        {h:'Команда вывести', v:{kind:'code', lines:[{t:'вывести "Привет"', c:grn}]}, r:'«вывести» показывает текст.', d:'Команда «вывести» показывает текст на экране.'} ,
        {h:'Пример', v:{kind:'code', lines:[{t:'вывести "Привет"', c:grn}], out:'Привет'}, r:'На экране появится: Привет.', d:'После выполнения команды на экране появится слово «Привет» — смотри на экран под программой.'} ,
        {h:'С циклом', v:{kind:'loop', n:3, body:'вывести "Привет"'}, r:'Цикл повторяет команду.', d:'Цикл повторяет команду: «Привет» покажется несколько раз.'} ,
        {h:'Пример 3 раза', v:{kind:'code', lines:[{t:'повтори 3 раза:', c:gold},{t:'    вывести "Привет"', c:grn, i:1}]}, r:'«Привет» покажется 3 раза.', d:'Запись «повтори 3 раза» и отступ показывают, что повторяется именно эта строка.'} ,
        {h:'Порядок строк', v:{kind:'text', lines:[{t:'компьютер читает', b:1},{t:'сверху вниз', b:1, c:gold}]}, r:'Порядок строк важен.', d:'Компьютер читает программу сверху вниз, поэтому порядок строк важен.'} ,
        {h:'Ошибка', v:{kind:'text', lines:[{t:'ошибка →', b:1},{t:'компьютер сделает не то', c:red}]}, r:'Ошибка ломает программу.', d:'Ошибка в команде ломает программу: компьютер сделает не то или остановится.'} ,
        {h:'Языки', v:{kind:'cards', items:[{t:'Python', c:blu},{t:'Scratch', c:gold},{t:'Pascal', c:grn},{t:'C++', c:pur}]}, r:'Программы пишут на языках программирования.', d:'Программы пишут на языках программирования: Python, Scratch, Pascal, C++.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Что покажет программа «вывести Молодец»?', opts:[{t:'текст Молодец', ok:1},{t:'пустой экран'},{t:'число 5'}], exp:'Команда «вывести» показывает текст на экране.'}, r:'Проверь себя: что делает «вывести».', d:'Проверь себя: что делает команда «вывести»?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'программа = команды', b:1},{t:'вывести "…" — показать', c:grn},{t:'сверху вниз, по порядку', c:gold}]}, r:'Запомни: программа — команды по порядку.', d:'Программа — это команды по порядку, а «вывести» показывает текст.'} ],
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
        {h:'Программа должна помнить', v:{kind:'text', lines:[{t:'чтобы считать — надо', b:1},{t:'где-то хранить числа', b:1, c:gold}]}, r:'Без памяти программа ничего не посчитает.', d:'Без переменных программа не сможет сохранить число даже на один шаг.'} ,
        {h:'Коробочка с наклейкой', v:{kind:'var', name:'x', note:'имя — наклейка, значение — внутри коробочки'}, r:'Переменная = коробочка с именем.', d:'Имя — как наклейка на коробочке: по нему программа находит нужное значение.'} ,
        {h:'Имя и значение', v:{kind:'var', vars:[{name:'x',val:'5',c:blu},{name:'sum',val:'12',c:grn}], note:'имя выбирает программист — чтобы было понятно'}, r:'У каждой переменной своё имя.', d:'У каждой коробочки своё имя, и в каждой лежит своё значение.'} ,
        {h:'Что лежит внутри', v:{kind:'var', name:'word', val:'Привет', note:'в коробочке может лежать число или слово'}, r:'Значение — то, что лежит в переменной.', d:'В переменной может лежать число или слово — главное, чтобы значение было одно.'} ,
        {h:'Знак «=» кладёт значение', v:{kind:'assign', name:'x', from:'пусто', to:'7', note:'x = 7 читается: «в x положили 7»'}, r:'«=» — команда присваивания.', d:'Слева имя, справа значение: команда «x = 7» кладёт 7 в коробочку x.'} ,
        {h:'Старое значение затирается', v:{kind:'assign', name:'x', from:'5', to:'9', note:'коробочка одна, а значение в ней меняется'}, r:'Новое значение заменяет старое.', d:'Коробочка одна, поэтому новое значение затирает старое: пятёрка зачёркнута, девятка встала на её место.'} ,
        {h:'Ввод: спросим человека', v:{kind:'input', q:'Сколько тебе лет?', name:'возраст', val:'11', note:'программа получила 11 и запомнила его'}, r:'Ввод кладёт ответ человека в переменную.', d:'Программа спросила — человек ответил — и число 11 легло в переменную «возраст».'} ,
        {h:'Считаем коробочками', v:{kind:'assign', name:'sum', from:'a + b', to:'7', note:'sum = a + b — взяли два числа и сложили'}, r:'В sum попадёт сумма a и b.', d:'Сначала компьютер смотрит, что лежит в a и b, и только потом кладёт сумму в sum.'} ,
        {h:'Как это устроено', v:{kind:'ipo'}, r:'Ввод → обработка → вывод, и всё через переменные.', d:'Ввод, обработка и вывод работают через переменные: числа в них хранятся и меняются.'} ,
        {h:'Трассировка', v:{kind:'trace', head:['шаг','команда','a','b','sum'], rows:[['1','a = 3','3','—','—'],['2','b = 4','3','4','—'],['3','sum = a+b','3','4','7']], note:'по таблице видно, как менялась каждая переменная'}, r:'Трассировка показывает изменения по шагам.', d:'Трассировка — таблица по шагам: подсветка показывает, на каком шаге что изменилось.'} ,
        {h:'Осторожно с именами', v:{kind:'cards', items:[{t:'сумма', d:'понятное имя', c:grn},{t:'x', d:'коротко и ясно', c:grn},{t:'2x', d:'нельзя: начинается с цифры', c:red},{t:'s1', d:'непонятно, что внутри', c:red}]}, r:'Имя должно быть понятным и без цифры в начале.', d:'Понятное имя помогает читать программу, а имя, начинающееся с цифры, — ошибка.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'a = 8, b = 2. Что окажется в sum после «sum = a + b»?', opts:[{t:'10', ok:1},{t:'82'},{t:'6'}], exp:'Программа складывает значения: 8 + 2 = 10.'}, r:'Проверь себя: посчитай сам.', d:'Посчитай сам: 8 + 2 — и выбери, что окажется в sum.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'переменная = имя + значение', b:1},{t:'x = 5 — положить в коробочку', c:grn},{t:'ввести x — спросить у человека', c:gold}]}, r:'Запомни: переменная — коробочка с именем.', d:'Переменная — это имя и значение; «=» кладёт значение, «ввести» спрашивает у человека.'} ],
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
        {h:'Когда число повторов известно', v:{kind:'loop', n:4, body:'шаг вперёд'}, r:'«Повтори 4 раза» — если знаем, сколько раз.', d:'Если число повторов известно, удобно использовать «повтори N раз»: точка бежит по кругу.'} ,
        {h:'А если неизвестно?', v:{kind:'text', lines:[{t:'идти, пока не стена', b:1},{t:'сколько шагов — неизвестно', b:1, c:gold}]}, r:'Тут «повтори N раз» не подходит.', d:'Бывает, что число шагов заранее неизвестно: робот идёт, пока не упрётся в стену.'} ,
        {h:'Цикл «пока»', v:{kind:'while', q:'впереди нет стены?', body:'шаг вперёд', n:3}, r:'ПОКА условие истинно — повторяй тело.', d:'Условие стоит в ромбе, тело — в прямоугольнике, а стрелка возвращает нас к проверке снова.'} ,
        {h:'Как это записывают', v:{kind:'code', lines:[{t:'пока впереди нет стены:', c:gold},{t:'    шаг вперёд', c:cyan, i:1}]}, r:'Читаем: пока «да» — делаем команду.', d:'Строка с условием заканчивается двоеточием, а тело цикла пишут с отступом.'} ,
        {h:'Условие проверяется снова', v:{kind:'while', q:'впереди нет стены?', body:'шаг вперёд', again:1}, r:'После шага условие проверяют заново.', d:'После каждого шага компьютер возвращается к ромбу и проверяет условие заново.'} ,
        {h:'Дошёл до стены — стоп', v:{kind:'robot', pos:[0,3], walls:[[3,3]], path:[[0,3],[1,3],[2,3]]}, r:'Условие стало «нет» — цикл остановился.', d:'Стена рядом — условие стало ложным, цикл остановился, робот дошёл до флажка.'} ,
        {h:'Проверка до тела', v:{kind:'while', q:'есть числа?', body:'прибавь число', pre:1}, r:'Условие проверяется перед телом.', d:'Условие стоит перед телом, поэтому цикл может не выполниться ни разу.'} ,
        {h:'Два вида циклов', v:{kind:'compare', left:{t:'повтори 4 раза', d:'число повторов знаем', c:blu, points:['тело выполнится ровно 4 раза','предсказуемо и просто']}, right:{t:'пока есть числа', d:'число повторов неизвестно', c:grn, points:['сколько раз — решает условие','может не выполниться ни разу']}}, r:'Разные задачи — разные циклы.', d:'Слева цикл со счётчиком, справа цикл с условием: выбирай по задаче.'} ,
        {h:'Счётчик внутри цикла', v:{kind:'code', lines:[{t:'i = 1', c:cyan},{t:'пока i ≤ 3:', c:gold},{t:'    вывести i', c:grn, i:1},{t:'    i = i + 1', c:cyan, i:1}]}, r:'Тело меняет i — цикл остановится.', d:'Счётчик i растёт на единицу за круг, поэтому условие «i ≤ 3» рано или поздно станет ложным.'} ,
        {h:'Трассировка', v:{kind:'trace', head:['шаг','i ≤ 3 ?','вывели'], rows:[['1','да','1'],['2','да','2'],['3','да','3'],['4','нет','—']], note:'на шаге 4 условие стало ложным — вышли из цикла'}, r:'По таблице видно, почему цикл закончился.', d:'В таблице видно все проверки: на четвёртом шаге условие стало ложным, и цикл закончился.'} ,
        {h:'Бесконечный цикл', v:{kind:'while', q:'x всё ещё > 0?', body:'x = x + 1', warn:1}, r:'Условие всегда «да» — программа зациклится.', d:'Условие всегда истинно — точка бежит по кругу без остановки, программа зациклилась.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Что решает, сколько раз повторится цикл «пока»?', opts:[{t:'условие', ok:1},{t:'число в команде «повтори»'},{t:'длина программы'}], exp:'В цикле «пока» количество повторов решает условие: пока оно истинно, тело повторяется.'}, r:'Проверь себя: кто решает число повторов.', d:'Проверь себя: кто решает, сколько раз повторится цикл «пока»?'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'пока условие верно — повторяй', b:1},{t:'условие проверяется до тела', c:gold},{t:'тело должно менять условие', c:grn}]}, r:'Запомни: «пока» — цикл с условием.', d:'«Пока» — цикл с условием: проверка до тела, а тело меняет условие.'} ],
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
        {h:'Что мы уже умеем', v:{kind:'quest'}, r:'Переменные, условие и цикл — вместе.', d:'Три умения соединяются в одну программу: переменные помнят, условие выбирает, цикл повторяет.'} ,
        {h:'Программа целиком', v:{kind:'comboscheme'}, r:'Цикл снаружи, условие внутри.', d:'Рамка — это цикл, внутри ромб-условие и тело: точка бежит по петле через условие.'} ,
        {h:'Читаем по строкам', v:{kind:'pseudo', rows:[{t:'i = 0',c:cyan},{t:'пока не вышли:',c:gold},{t:'если стена?',c:pur,i:1},{t:'повернуть',c:gold,i:2},{t:'шаг вперёд',c:cyan,i:1},{t:'i = i + 1',c:grn,i:1}]}, r:'Указатель показывает, какую строку читает компьютер.', d:'Указатель идёт сверху вниз, а отступы показывают, какие строки лежат внутри цикла и условия.'} ,
        {h:'Код и мир рядом', v:{kind:'split', lines:['пока не вышли:','    если стена:','        повернуть','    шаг вперёд']}, r:'Слева команды — справа робот.', d:'Слева подсвечивается строка, справа робот делает шаг — так видно связь кода и действия.'} ,
        {h:'Как робот видит стену', v:{kind:'sensor'}, r:'Датчик отвечает «да» или «нет».', d:'Датчик посылает луч, получает эхо и отвечает «да» или «нет».'} ,
        {h:'Ворота-условие', v:{kind:'gate', q:'впереди стена?', open:0}, r:'Стена рядом — ворота закрыты, робот поворачивает.', d:'Стена рядом — ворота закрыты, поэтому робот поворачивает, а не идёт вперёд.'} ,
        {h:'Счётчики программы', v:{kind:'gears', a:'7', b:'7', c:'2', la:'i', lb:'шаги', lc:'повороты'}, r:'i, шаги и повороты — переменные.', d:'Три шестерни вращаются, а числа в них растут: i, шаги и повороты меняются по ходу программы.'} ,
        {h:'Что программа помнит', v:{kind:'shelves', cells:[{n:'i',v:'7',c:blu},{n:'шаги',v:'7',c:grn},{n:'повороты',v:'2',c:gold},{n:'стена',v:'нет',c:pur}]}, r:'Значения живут в переменных.', d:'Каждая ячейка — переменная со своим значением; подсветка переходит от ячейки к ячейке.'} ,
        {h:'Условие внутри цикла', v:{kind:'nest'}, r:'Вложенность: цикл снаружи, условие внутри.', d:'Внутри рамки цикла лежит рамка условия — это и есть вложенность.'} ,
        {h:'Один круг цикла', v:{kind:'belt'}, r:'Прочитал → проверил → сделал → повторил.', d:'Каждый круг компьютер делает четыре дела и возвращается к началу цикла.'} ,
        {h:'Частая ошибка', v:{kind:'debugger', lines:['пока не вышли:','    шаг вперёд'], bad:1, hint:'забыли проверить стену — робот врежется'}, r:'Проверка стены обязательна.', d:'Красная строка — ошибка: забыли проверить стену, и робот врежется.'} ,
        {h:'Проверяем на примерах', v:{kind:'tests', runs:[{t:'коридор без стен', r:'вышел за 5 шагов'},{t:'стена справа', r:'повернул и вышел'},{t:'стена впереди', r:'повернул сразу'}]}, r:'Одна программа — разные поля.', d:'Одна программа проверяется на разных полях: везде должен получиться верный результат.'} ,
        {h:'Тренажёр', v:{kind:'pick', q:'Что робот сделает первым делом?', opts:[{t:'проверит, есть ли стена', ok:1},{t:'сразу шагнёт вперёд'},{t:'выключится'}], exp:'Сначала проверка условия — иначе можно врезаться.'}, r:'Сначала проверяем, потом действуем.', d:'Подумай: что робот делает первым — проверяет условие или шагает?'} ,
        {h:'Карта знаний', v:{kind:'mindmap'}, r:'Всё, что нужно для любой программы.', d:'В центре — программа, вокруг всё, из чего она собирается.'} ,
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'цикл снаружи, условие внутри', b:1},{t:'сначала проверь — потом шагай', c:gold},{t:'тело меняет условие', c:grn}]}, r:'Программа думает перед каждым шагом.', d:'Главное правило урока: сначала проверь условие, потом действуй.'} ],
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
        {h:'Задача слишком большая', v:{kind:'bigtask'}, r:'Много одинаковых команд — легко ошибиться.', d:'Тридцать команд подряд: длинно, однообразно и очень легко ошибиться.'} ,
        {h:'Разбиваем на части', v:{kind:'plan'}, r:'Большое делим на маленькие понятные шаги.', d:'Большую задачу разбивают на три маленьких — каждую легко понять и проверить.'} ,
        {h:'Что такое помощник', v:{kind:'recipe', name:'квадрат'}, r:'У алгоритма-помощника есть имя и тело.', d:'У помощника есть имя на ярлыке и тело из команд: это как рецепт в книге.'} ,
        {h:'Главный и помощник', v:{kind:'helper', name:'квадрат'}, r:'Главная программа вызывает помощника по имени.', d:'Главная программа пишет имя «квадрат» — и помощник выполняет свою работу.'} ,
        {h:'Вызов из разных мест', v:{kind:'call', name:'повернуть'}, r:'Одно описание — сколько угодно вызовов.', d:'Одно описание в центре и четыре вызова из разных мест программы: описываем один раз, используем много.'} ,
        {h:'Заглянем внутрь', v:{kind:'zoom', name:'квадрат'}, r:'Внутри помощника — обычные команды.', d:'Лупа показывает, что внутри помощника обычные команды: повторение и шаги.'} ,
        {h:'Рисуем квадрат', v:{kind:'square'}, r:'4 раза: вперёд и повернуть.', d:'Зелёный след растёт, пока робот проходит четыре стороны и отмечает углы.'} ,
        {h:'Башня из квадратов', v:{kind:'tower'}, r:'Три вызова — три этажа.', d:'Каждый вызов рисует один этаж: три вызова — башня из трёх этажей.'} ,
        {h:'Число-параметр', v:{kind:'params'}, r:'Одно имя, разные числа — разный результат.', d:'Одно имя с разными числами даёт разные квадраты: маленький и большой.'} ,
        {h:'Библиотека помощников', v:{kind:'library'}, r:'Готовые алгоритмы берём по имени.', d:'Готовые помощники стоят на полке: берём нужный по имени и не пишем всё заново.'} ,
        {h:'Было и стало', v:{kind:'compare2'}, r:'С помощником программа короче в пять раз.', d:'Слева тридцать строк, справа шесть: помощник сделал программу короткой.'} ,
        {h:'Проверяем помощника', v:{kind:'test513'}, r:'Сначала проверь помощника отдельно.', d:'Помощника запускают отдельно: если он рисует верный квадрат, ему можно доверять.'} ,
        {h:'Тренажёр', v:{kind:'sort', q:'Собери алгоритм «приготовить чай» по порядку', items:[{t:'положить чай', ord:2},{t:'взять чашку', ord:1},{t:'выпить', ord:5},{t:'налить кипяток', ord:3},{t:'подождать', ord:4}]}, r:'Шаги выполняются по порядку.', d:'Нажимай шаги в правильном порядке и следи за полосой «порядок выполнения».'} ,
        {h:'Как назвать помощника', v:{kind:'naming'}, r:'Имя — короткое и понятное.', d:'Хорошее имя короткое и понятное, а длинное или с цифрой в начале — плохая идея.'} ,
        {h:'Из чего состоит программа', v:{kind:'summary513'}, r:'Команды → помощники → большая программа.', d:'Пирамида: из команд собираются помощники, а из них — большая программа.'} ],
      check:{ q:'Что такое вспомогательный алгоритм?', choices:['маленький алгоритм со своим именем, который вызывают по имени','самая главная программа','ошибка в программе'], ans:0, exp:'Вспомогательный алгоритм — маленькая часть со своим именем; её вызывают по имени.' },
      tasks:[
        {q:'Сколько раз выполнится помощник «квадрат», если в программе три вызова «квадрат»?', kind:'unit', ans:3, tol:0, hints:['Каждый вызов — одно выполнение.','Три вызова — три раза.'], sol:'3'},
        {q:'Как воспользоваться помощником с именем «дорога»?', kind:'choice', choices:['написать его имя: дорога','написать слово «вызов»','скопировать все его команды в программу','написать имя в кавычках'], ans:0, tol:0, hints:['Вызов — это просто имя алгоритма.','Пишем имя: дорога.'], sol:'написать его имя: дорога'}
      ] },
    { id:514, title:'Ошибки в программе: как найти и исправить', ico:'🛠', src:'Информатика · 5–6 класс · С нуля: отладка',
      explain:[
        'Иногда программа не работает: компьютер делает не то, что мы хотели. Это нормально — ошибаются все программисты, даже взрослые.',
        'Ошибки бывают разные: опечатка в команде, неверный порядок шагов или неправильное условие.',
        'Опечатку компьютер замечает сам: такой команды он не знает, поэтому сразу сообщает об ошибке и не начинает работу.',
        'Ошибка в порядке или в условии хитрее: программа запустится, но результат будет неверным. Компьютер об этом не скажет — искать придётся самому.',
        'Поэтому программу сначала проверяют на маленьком примере, где правильный ответ известен заранее.',
        'Первый помощник в поиске ошибки — пошаговое выполнение: смотрим, как подсветка идёт по строкам, и находим то место, где всё пошло не так.',
        'Второй помощник — отладочная печать: просим программу показать значения переменных на каждом шаге.',
        'Третий помощник — трассировка: записываем значения в таблицу и сравниваем с тем, что должно было получиться.',
        'Четвёртый помощник — точка останова: программа останавливается в нужном месте, и мы спокойно смотрим, что лежит в переменных.',
        'Если программа длинная, её делят пополам: сначала проверяют первую половину; если там всё верно — ищут во второй и снова делят её пополам.',
        'Нашли ошибку — исправляем ровно одну строку и снова проверяем. Менять сразу много строк нельзя: потом непонятно, что именно помогло.',
        'Перед запуском полезно проверить себя по списку: понял ли задачу, верный ли порядок строк, выходит ли цикл, проверен ли маленький пример.',
        'Если программа зациклилась, ищите строку, которая меняет условие цикла: скорее всего, её забыли написать или написали неверно.',
        'Ошибки — не беда: каждая найденная ошибка делает программиста опытнее.',
        'Проверь себя: где искать ошибку, если программа запустилась, но ответ неверный?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Программа не работает', v:{kind:'broken'}, r:'Робот врезался в стену.', d:'Робот ехал вперёд, но впереди стена. Программа сделала не то, что нужно, — значит, в ней ошибка.'},
        {h:'Три вида ошибок', v:{kind:'kinds3'}, r:'Опечатка, порядок, условие.', d:'Опечатку компьютер замечает сам, а ошибку в порядке и в условии — нет: программа запустится, но ответ будет неверным.'},
        {h:'Компьютер сообщает', v:{kind:'console', lines:['шаги = 0','пока шаги < 3:','    вперёд шаг','    шаги = шаги + 1','вывести шаги']}, r:'Опечатку компьютер видит сам.', d:'Компьютер не знает команды «вперёд шаг» и прямо говорит, в какой строке проблема.'},
        {h:'Идём по шагам', v:{kind:'stepdebug', lines:['взять чашку','положить чай','налить кипяток','выпить чай','убрать чашку'], stop:3}, r:'Подсветка останавливается на плохом шаге.', d:'Выполняем программу по шагам и смотрим, где результат впервые стал неправильным.'},
        {h:'Печать значений', v:{kind:'printDebug', out:['i = 1   шаги = 1','i = 2   шаги = 2','i = 3   шаги = 3']}, r:'Просим показать, что внутри.', d:'Команда «вывести» печатает значения переменных: сразу видно, где число перестало расти правильно.'},
        {h:'Сравниваем с ответом', v:{kind:'traceErr', head:['шаг','i','получилось','должно быть'], rows:[['1','1','1','1'],['2','2','3','3'],['3','3','9','6']], note:'на третьем шаге получилось 9, а должно быть 6 — ошибка здесь'}, r:'Где не совпало — там ошибка.', d:'Записываем значения в таблицу и сравниваем столбцы: красная клетка показывает шаг с ошибкой.'},
        {h:'Точка останова', v:{kind:'breakpoints', lines:['шаги = 0','пока шаги < 3:','    шаг вперёд','    шаги = шаги + 1'], bp:3, val:'шаги = 1'}, r:'Остановились и посмотрели.', d:'Красная точка останавливает программу в нужном месте, и лупа показывает, что лежит в переменной в этот момент.'},
        {h:'Делим пополам', v:{kind:'bisect'}, r:'Проверяем половину — и делим снова.', d:'В длинной программе сначала проверяют первую половину: если там всё верно, ошибка во второй — и её снова делят пополам.'},
        {h:'Как выглядит исправление', v:{kind:'fixpatch'}, r:'Меняем одну строку.', d:'Исправляем только ту строку, где ошибка, и снова запускаем программу.'},
        {h:'Найди ошибку сам', v:{kind:'find', q:'Нажми на строку с ошибкой', lines:[{t:'шаги = 0'},{t:'пока шаги < 3:'},{t:'    шаг вперёд'},{t:'    шаги = шаги + 2', ok:1},{t:'вывести шаги'}], exp:'Верно! Шаги растут по два, поэтому цикл выйдет слишком рано.'}, r:'Проверь себя: найди строку с ошибкой.', d:'Нажми на строку, которая, по-твоему, написана неверно. Я проверю и объясню.'},
        {h:'Проверь перед запуском', v:{kind:'checklist', items:['понял, что должна делать программа','проверил порядок строк','проверил условие выхода из цикла','запустил на маленьком примере']}, r:'Четыре проверки перед запуском.', d:'Такие проверки экономят время: часто ошибку видно ещё до запуска программы.'},
        {h:'Если зациклилось', v:{kind:'pick', q:'Программа крутится без конца. Что проверить первым делом?', opts:[{t:'строку, которая меняет условие цикла', ok:1},{t:'название программы'},{t:'цвет букв на экране'}], exp:'Цикл заканчивается, когда условие станет ложным. Проверь строку, которая меняет условие.'}, r:'Проверь себя: как выйти из цикла.', d:'Нажми на вариант ответа — я проверю и объясню.'},
        {h:'Аптечка отладчика', v:{kind:'fixkit'}, r:'Четыре инструмента против ошибок.', d:'Печать, трассировка, деление пополам и точка останова — этим пользуются настоящие программисты.'},
        {h:'Предскажи результат', v:{kind:'guess', lines:['шаги = 0','пока шаги < 3:','    шаги = шаги + 1','вывести шаги'], opts:['шаги = 3','шаги = 4','шаги = 0'], ok:0, note:'сначала предскажи ответ — потом проверь'}, r:'Сначала догадайся, потом проверь.', d:'Умение предсказывать результат помогает сразу заметить, что программа работает неправильно.'},
        {h:'План отладки', v:{kind:'summary514'}, r:'Пять шагов поиска ошибки.', d:'По этому плану можно найти ошибку в любой программе: от «что должно быть» до «исправь и проверь снова».'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'ошибка → найди место', b:1},{t:'шаг за шагом · печать · трассировка', c:grn},{t:'исправь одну строку и проверь', c:gold}]}, r:'Запомни, как искать ошибки.', d:'Главное: не бояться ошибок и искать их по шагам, а не наугад.'} ],
      check:{ q:'Программа запустилась, но ответ неверный. Где искать ошибку?', choices:['в порядке шагов, в условии или в вычислениях','в названии файла','нужно переустановить компьютер'], ans:0, exp:'Если программа запускается, ошибка обычно в логике: порядок шагов, условие или вычисления.' },
      tasks:[
        {q:'Сколько строк нужно менять за один раз, когда исправляешь ошибку?', kind:'unit', ans:1, tol:0, hints:['Иначе непонятно, что помогло.','Одну — ту, где ошибка.'], sol:'1'},
        {q:'Как быстрее всего найти ошибку в длинной программе?', kind:'choice', choices:['делить программу пополам и проверять половины','удалить программу и написать заново','запускать её много раз подряд'], ans:0, tol:0, hints:['Каждая проверка сужает место поиска вдвое.','Делим пополам.'], sol:'делить программу пополам и проверять половины'}
      ] },
    { id:515, title:'Списки: как хранить много чисел', ico:'🚃', src:'Информатика · 5–6 класс · С нуля: списки',
      explain:[
        'В переменной хранится одно значение. Но что делать, если чисел не одно, а двадцать или сто?',
        'Заводить сто переменных неудобно: у каждой должно быть своё имя, и в них очень легко запутаться.',
        'Для этого придумали СПИСОК: одно имя — и много значений внутри, по порядку друг за другом.',
        'Список похож на поезд: у всего поезда одно имя, а вагоны идут один за другим.',
        'Каждое значение лежит в своей ячейке. У ячейки есть номер — его называют индексом.',
        'Важно: счёт индексов начинается с нуля! Первый элемент — это числа[0], второй — числа[1].',
        'Создают список так: числа = [3, 7, 2, 9]. Квадратные скобки означают, что это список.',
        'Обращение к элементу: числа[2] — это значение из ячейки с номером 2, то есть третьей по счёту.',
        'Длина списка — сколько в нём ячеек. У списка [3, 7, 2, 9] длина равна четырём.',
        'Чтобы пройти по всем элементам, используют цикл: «пока i меньше длины списка — смотри числа[i]».',
        'Так считают сумму всех чисел: берём числа по одному и складываем результат в переменную сумма.',
        'Так же ищут самое большое число: сначала чемпион — первый элемент, а потом сравниваем с ним остальные.',
        'Список можно менять: добавить значение в конец, заменить значение в ячейке или найти нужное число.',
        'Частая ошибка — выйти за границы списка: если длина равна 4, то последний индекс 3, а числа[4] не существует.',
        'Проверь себя: какой индекс у первого элемента списка?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'А если чисел много?', v:{kind:'manyvars'}, r:'Сто переменных — неудобно.', d:'Каждому числу пришлось бы придумывать своё имя. Для больших наборов чисел так делать нельзя.'},
        {h:'Список — это поезд', v:{kind:'train', vals:[3,7,2,9]}, r:'Одно имя — много вагонов.', d:'У списка одно имя, а значения стоят в вагонах-ячейках по порядку: первое, второе, третье.'},
        {h:'Номер ячейки', v:{kind:'cells', vals:[3,7,2,9], at:2}, r:'У каждой ячейки свой индекс.', d:'Индекс — это номер ячейки. Запись числа[2] значит: возьми значение из ячейки с номером 2.'},
        {h:'Счёт с нуля', v:{kind:'index0', vals:[3,7,2]}, r:'Первый элемент — нулевой!', d:'Это самое непривычное в списках: нумерация начинается с нуля, а не с единицы.'},
        {h:'Создаём список', v:{kind:'create', vals:[3,7,2,9]}, r:'Числа = [3, 7, 2, 9].', d:'Квадратные скобки — это список. Значения из скобок встают в ячейки по порядку.'},
        {h:'Длина списка', v:{kind:'length', vals:[3,7,2,9]}, r:'Сколько ячеек — такая и длина.', d:'Длина показывает, сколько в списке элементов. У списка из четырёх чисел длина равна 4.'},
        {h:'Идём по списку циклом', v:{kind:'walk', vals:[3,7,2,9]}, r:'Цикл заглядывает в каждую ячейку.', d:'Счётчик i по очереди становится 0, 1, 2, 3 — и цикл смотрит числа[i].'},
        {h:'Сумма всех чисел', v:{kind:'sumlist', vals:[3,7,2,9]}, r:'Складываем по одному.', d:'Числа по очереди попадают в сумму, а счётчик растёт: 3, потом 10, потом 12 и наконец 21.'},
        {h:'Самое большое число', v:{kind:'maxlist', vals:[3,7,2,9]}, r:'Ищем чемпиона по очереди.', d:'Сначала чемпион — первое число. Если следующее больше, чемпион меняется: так находим максимум.'},
        {h:'Поиск в списке', v:{kind:'findlist', vals:[3,7,2,9], target:2}, r:'Лупа идёт по ячейкам.', d:'Проверяем числа одно за другим и сравниваем с тем, что ищем. Нашли — запоминаем номер ячейки.'},
        {h:'Добавляем в конец', v:{kind:'append', vals:[3,7,2,9], add:5}, r:'Список можно удлинить.', d:'Новое значение всегда встаёт в конец списка, и длина увеличивается на единицу.'},
        {h:'Ошибка: выход за границы', v:{kind:'outofrange', vals:[3,7,2,9]}, r:'Числа[4] не существует.', d:'Если длина списка 4, то последний индекс — 3. Обращение к числа[4] — ошибка.'},
        {h:'Список команд робота', v:{kind:'marks', cmds:['вперёд','вперёд','вправо','вперёд']}, r:'Робот выполняет команды из списка.', d:'В списке могут храниться не только числа, но и команды: робот берёт их по порядку.'},
        {h:'Найди нужную ячейку', v:{kind:'findcell', vals:[3,7,2,9], need:2, q:'Нажми на ячейку с индексом 2'}, r:'Проверь себя: где индекс 2?', d:'Нажми на ячейку, у которой номер 2. Я проверю и объясню.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Что покажет команда вывести числа[1], если числа = [4, 9, 6]?', opts:[{t:'9', ok:1},{t:'4'},{t:'6'}], exp:'Числа[1] — это второй элемент по счёту, то есть 9.'}, r:'Проверь себя: чему равен числа[1].', d:'Вспомни: индекс 1 — это второй элемент, потому что счёт начинается с нуля.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'список = [3, 7, 2, 9]', b:1},{t:'первый индекс — 0', c:red},{t:'длина = сколько ячеек', c:grn, b:1}]}, r:'Запомни: список, индекс, длина.', d:'Главное: у списка одно имя, у каждой ячейки свой номер, и счёт начинается с нуля.'} ],
      check:{ q:'Какой индекс у первого элемента списка?', choices:['0','1','2'], ans:0, exp:'Счёт элементов в списке начинается с нуля: первый элемент — это числа[0].' },
      tasks:[
        {q:'Дан список [5, 8, 1]. Чему равна его длина?', kind:'unit', ans:3, tol:0, hints:['Посчитай ячейки.','Их три.'], sol:'3'},
        {q:'Числа = [4, 9, 6]. Что окажется в переменной x после команды x = числа[1]?', kind:'choice', choices:['9','4','6','1'], ans:0, tol:0, hints:['Индекс 1 — это второй элемент.','Второй элемент — 9.'], sol:'9'}
      ] },
    { id:516, title:'Сортировка: расставляем числа по порядку', ico:'🔢', src:'Информатика · 5–6 класс · С нуля: сортировка',
      explain:[
        'В списке числа могут стоять как попало. С таким рядом неудобно работать: трудно найти нужное число.',
        'Навести порядок — значит расставить числа по порядку: от самого маленького к самому большому.',
        'Чтобы расставить числа, компьютер их сравнивает. Сравнение — это вопрос «кто больше?», и ответ на него всегда точный.',
        'Если два соседних числа стоят не по порядку — их меняют местами. Такой обмен называют перестановкой.',
        'Самый простой способ — идти по ряду слева направо и сравнивать соседей: если левое больше правого, меняем их местами.',
        'За один такой проход самое большое число «всплывает» в конец ряда — как пузырёк в воде. Поэтому способ называют пузырьковой сортировкой.',
        'Один проход ставит на место только одно число — самое большое. Значит, проходы нужно повторять.',
        'Каждый следующий проход можно делать короче: последнее число уже стоит на месте, и его можно не трогать.',
        'Есть и другой способ: найти самое маленькое число и поставить его в начало, потом искать следующее — и так до конца.',
        'Способов сортировки несколько: пузырьковая и выбором — самые простые. Результат у них один: ряд, расставленный по порядку.',
        'Когда ряд встал по порядку, каждое число не больше следующего. Это и есть проверка: сравниваем соседей по очереди.',
        'Сортировка нужна не сама по себе, а чтобы быстро искать: в упорядоченном ряду нужное число находится сразу.',
        'Чем больше чисел, тем больше сравнений нужно. Для трёх чисел хватает трёх сравнений, а для пяти — уже десяти.',
        'Компьютер сортирует очень быстро: миллионы чисел он расставляет за секунды.',
        'Проверь себя: что нужно сделать, если два соседних числа стоят не по порядку?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Числа стоят вразнобой', v:{kind:'disorder', vals:[7,2,9,3,1]}, r:'Как навести порядок?', d:'Карточки дрожат и стоят как попало: в таком ряду трудно что-то найти.'},
        {h:'По порядку', v:{kind:'order', vals:[7,2,9,3,1]}, r:'От меньшего к большему.', d:'Смотри: карточки сами съезжают на свои места — получается 1, 2, 3, 7, 9.'},
        {h:'Сравниваем два числа', v:{kind:'scale', a:7, b:2}, r:'Сначала сравнить: кто больше?', d:'Весы показывают: 7 тяжелее 2. Значит, большее число должно стоять правее.'},
        {h:'Меняем местами', v:{kind:'swap2', a:7, b:2}, r:'Если не по порядку — обмен.', d:'Два числа меняются местами: было 7 и 2, стало 2 и 7 — теперь по порядку.'},
        {h:'Пузырёк', v:{kind:'bubble', vals:[2,3,1,7,9]}, r:'Большое «всплывает» в конец.', d:'Большое число поднимается и уходит вправо, как пузырёк в воде — отсюда название способа.'},
        {h:'Один проход', v:{kind:'pass', vals:[2,7,3,1,9]}, r:'Идём и сравниваем соседей.', d:'Подсветка по очереди обводит пары: 2 и 7, потом 7 и 3, потом 3 и 1, потом 1 и 9. В конце 9 оказалось на месте.'},
        {h:'Повторяем проходы', v:{kind:'passes', rows:[[2,7,3,1,9],[2,3,1,7,9],[2,1,3,7,9],[1,2,3,7,9]]}, r:'Каждый проход ставит число на место.', d:'Зелёные числа уже стоят правильно. С каждым проходом зелёных становится больше, пока весь ряд не станет зелёным.'},
        {h:'Ищем самое маленькое', v:{kind:'minscan', vals:[7,2,9,3,1]}, r:'Сканер ищет минимум.', d:'Рамка идёт по ряду и запоминает самое маленькое число: сначала это 7, потом 2, а потом 1.'},
        {h:'Минимум — в начало', v:{kind:'minmove', vals:[2,7,9,3,1]}, r:'Маленькое переезжает вперёд.', d:'Самое маленькое число перелетает в начало ряда, а остальные сдвигаются вправо.'},
        {h:'Ряд отсортирован', v:{kind:'sortedok', vals:[1,2,3,7,9]}, r:'Готово: каждое число на месте.', d:'Все числа встали по порядку, у каждой карточки галочка.'},
        {h:'Как проверить', v:{kind:'neighbors', vals:[2,3,7,9,12]}, r:'Сравниваем соседей по очереди.', d:'Проверка простая: каждое число должно быть не больше следующего. Между парами появляются знаки «меньше или равно» с галочками.'},
        {h:'Зачем сортировать', v:{kind:'why'}, r:'В порядке искать быстрее.', d:'Слева числа по порядку — нужное находится сразу. Справа вразнобой — приходится перебирать всё.'},
        {h:'Сколько сравнений', v:{kind:'countcmp', rows:[[3,3],[4,6],[5,10],[10,45]]}, r:'Чем больше чисел, тем больше работы.', d:'Для трёх чисел нужно 3 сравнения, для пяти — 10, а для десяти — уже 45.'},
        {h:'Отсортируй сам', v:{kind:'sortgame', vals:[7,2,9,3,1], q:'Нажми на число, чтобы поменять его с соседом справа'}, r:'Проверь себя: расставь числа.', d:'Нажимай карточки: выбранное число меняется местами с соседом справа. Цель — расставить числа по порядку.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Сколько обменов нужно, чтобы из ряда 3, 1, 2 получился ряд 1, 2, 3?', opts:[{t:'2', ok:1},{t:'1'},{t:'3'}], exp:'Меняем 3 и 1 — получаем 1, 3, 2; потом меняем 3 и 2 — получаем 1, 2, 3. Всего два обмена.'}, r:'Проверь себя: посчитай обмены.', d:'Посчитай, сколько раз придётся поменять соседей местами, и выбери ответ.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'сравнить → поменять местами', b:1},{t:'большое «всплывает» в конец', c:gold},{t:'ряд готов, если каждое ≤ следующего', c:grn}]}, r:'Запомни, как работает сортировка.', d:'Главное: сравниваем соседей и меняем местами, пока каждое число не встанет на своё место.'} ],
      check:{ q:'Что нужно сделать, если два соседних числа стоят не по порядку?', choices:['поменять их местами','удалить одно из них','дописать ещё число'], ans:0, exp:'Если левое число больше правого, их меняют местами — это и есть шаг сортировки.' },
      tasks:[
        {q:'Ряд 3, 1, 2. Сколько обменов нужно, чтобы получился ряд 1, 2, 3?', kind:'unit', ans:2, tol:0, hints:['Сначала поменяй 3 и 1.','Потом поменяй 3 и 2 — всего два обмена.'], sol:'2'},
        {q:'Когда ряд чисел можно считать отсортированным?', kind:'choice', choices:['когда каждое число не больше следующего','когда чисел стало больше','когда все числа одинаковые'], ans:0, tol:0, hints:['Сравни соседей по очереди.','Каждое число не больше следующего.'], sol:'когда каждое число не больше следующего'}
      ] },
    { id:517, title:'Поиск: как найти нужное число', ico:'🔍', src:'Информатика · 5–6 класс · С нуля: поиск',
      explain:[
        'Мы научились сортировать числа. Теперь проверим, зачем это нужно: в упорядоченном ряду искать намного быстрее.',
        'Задача поиска: в списке чисел нужно найти нужное число и узнать его номер — индекс.',
        'Самый простой способ — линейный поиск: смотреть числа по очереди, начиная с первого.',
        'Линейный поиск работает всегда, но медленно: если числа в списке нет, придётся проверить все.',
        'Если чисел сто, линейный поиск может сделать сто проверок. Это долго и утомительно.',
        'Но в отсортированном ряду есть подсказка: числа идут по возрастанию, и по среднему элементу можно понять, где искать.',
        'Смотрим на средний элемент. Если он больше нужного числа, искать надо слева; если меньше — справа.',
        'Так сразу отпадает половина ряда. Этот способ называется бинарный поиск, или поиск делением пополам.',
        'После каждого шага чисел становится вдвое меньше. Для пятнадцати чисел хватает четырёх шагов, а линейному поиску нужно до пятнадцати.',
        'Так же мы ищем слова в словаре или номер в телефонной книге: открываем в середине и решаем, куда листать дальше.',
        'Если числа в списке нет, границы поиска сойдутся, и мы это поймём: останется пустой отрезок.',
        'Важно: бинарный поиск работает только в отсортированном ряду. В беспорядочном ряду он ошибается.',
        'Ещё одна частая ошибка — перепутать, куда идти: если средний элемент больше нужного числа, идём в левую половину.',
        'В игру «угадай число» удобно играть именно так: каждый вопрос «больше или меньше» уменьшает диапазон вдвое.',
        'Проверь себя: сколько шагов нужно бинарному поиску, чтобы найти число среди пятнадцати?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Найди число', v:{kind:'findtask', vals:[3,7,2,9,5,1,8,4,6]}, r:'Где здесь число 8?', d:'В ряду девять чисел, и нужно найти одно. Как сделать это быстрее всего?'},
        {h:'По очереди', v:{kind:'linear', vals:[3,7,2,9,5,1,8,4,6], target:8}, r:'Линейный поиск: смотрим подряд.', d:'Лупа идёт слева направо и проверяет числа одно за другим. Счётчик показывает, сколько проверок уже сделано.'},
        {h:'А если чисел сто?', v:{kind:'linearBad'}, r:'Линейный поиск — до 100 проверок.', d:'Чем длиннее список, тем дольше искать по очереди. Если числа нет, придётся проверить всё.'},
        {h:'В порядке есть подсказка', v:{kind:'sortedRow', vals:[1,2,3,4,5,6,7,8,9]}, r:'Середина подсказывает, где искать.', d:'В отсортированном ряду слева числа меньше среднего, а справа — больше. Значит, половину можно сразу отбросить.'},
        {h:'Половина отпадает', v:{kind:'halves', vals:[1,2,3,4,5,6,7,8,9], keep:'right'}, r:'Лишняя половина нам не нужна.', d:'Смотри: левая половина гаснет, остаётся только та часть, где может быть нужное число.'},
        {h:'Три шага', v:{kind:'binsteps', steps:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[9,10,11,12,13,14,15],[11,12,13]]}, r:'Делим пополам снова и снова.', d:'Было 15 чисел, стало 7, потом 3 — и число 12 нашлось всего за три шага.'},
        {h:'Сколько проверок', v:{kind:'binaryCount', vals:[['по очереди',15,'#ff9a8a'],['делением пополам',4,'#7de0a0']]}, r:'Разница огромная.', d:'Для пятнадцати чисел линейному поиску нужно до 15 проверок, а бинарному — всего четыре.'},
        {h:'Влево или вправо', v:{kind:'rule'}, r:'Средний элемент — как развилка.', d:'Сравнили нужное число со средним — и сразу поняли, в какую половину идти дальше.'},
        {h:'Как в словаре', v:{kind:'phonebook'}, r:'Открываем в середине.', d:'Слова в словаре стоят по алфавиту, поэтому мы открываем книгу в середине и листаем в нужную сторону — это тот же бинарный поиск.'},
        {h:'Если числа нет', v:{kind:'notfound', target:6}, r:'Границы сходятся — числа нет.', d:'Левая и правая границы сдвигаются навстречу друг другу. Когда они сошлись, значит, числа в списке нет.'},
        {h:'Так нельзя!', v:{kind:'dups', vals:[7,2,9,3,1], target:3}, r:'В беспорядочном ряду поиск ошибается.', d:'Числа стоят как попало, поэтому правило «слева меньше, справа больше» не работает — поиск уходит не туда.'},
        {h:'Как быстро уменьшается', v:{kind:'halving', nums:[1000,500,250,125,63,32,16,8,4,2,1]}, r:'Каждый шаг — вдвое меньше.', d:'Тысяча чисел превращается в 500, потом в 250 и так далее: до одного числа остаётся всего десять шагов.'},
        {h:'Угадай число', v:{kind:'guessnum', lo:1, hi:15, target:11}, r:'Проверь себя: угадай число.', d:'Нажимай «больше» или «меньше» — жёлтая клетка показывает середину, а лишняя половина сразу отпадает.'},
        {h:'Частые ошибки', v:{kind:'mistakes'}, r:'Что чаще всего делают не так.', d:'Под каждой ошибкой зелёным написано, как правильно.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Сколько проверок нужно бинарному поиску для 15 чисел?', opts:[{t:'4', ok:1},{t:'15'},{t:'1'}], exp:'15 → 7 → 3 → 1: каждое деление уменьшает ряд вдвое, поэтому хватает четырёх шагов.'}, r:'Проверь себя: посчитай шаги.', d:'Вспомни, как ряд уменьшается вдвое, и выбери ответ.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'по очереди — просто, но долго', b:1},{t:'делением пополам — быстро', c:grn},{t:'но только в отсортированном ряду', c:red}]}, r:'Запомни два способа поиска.', d:'Главное: поиск делением пополам работает только там, где числа стоят по порядку.'} ],
      check:{ q:'Почему бинарный поиск работает только в отсортированном ряду?', choices:['потому что по середине видно, в какой половине искать','потому что так короче программа','потому что числа становятся меньше'], ans:0, exp:'В отсортированном ряду слева от середины числа меньше, а справа больше — поэтому половину можно отбросить.' },
      tasks:[
        {q:'Сколько шагов нужно бинарному поиску, чтобы найти число среди 15?', kind:'unit', ans:4, tol:0, hints:['15 → 7 → 3 → 1.','Четыре шага.'], sol:'4'},
        {q:'Что делать, если средний элемент больше нужного числа?', kind:'choice', choices:['искать в левой половине','искать в правой половине','остановить поиск'], ans:0, tol:0, hints:['Слева числа меньше.','Искать в левой половине.'], sol:'искать в левой половине'}
      ] },
    { id:518, title:'Таблицы: как хранить и искать данные', ico:'📊', src:'Информатика · 5–6 класс · С нуля: таблицы',
      explain:[
        'В списке данные стоят в один ряд. Но часто данные удобнее расположить в виде таблицы — со строками и столбцами.',
        'Таблица — это данные, записанные в клетки. Каждую клетку называют ячейкой.',
        'Горизонтальные ряды таблицы называют строками, а вертикальные — столбцами.',
        'Каждая ячейка стоит на пересечении своей строки и своего столбца.',
        'У ячейки есть адрес: сначала пишут номер строки, потом номер столбца. Например, таблица[1][2] — это строка 1, столбец 2.',
        'Как и в списках, счёт начинается с нуля: первая строка — нулевая, первый столбец — тоже нулевой.',
        'В программе таблицу записывают как список списков: каждая строка — это свой список внутри общего.',
        'С таблицей удобно работать циклами: внешний цикл идёт по строкам, а внутренний — по столбцам.',
        'Можно сложить числа в строке — получится сумма по строке.',
        'А можно сложить числа в столбце — сумма будет по столбцу. Это совсем другое число, и путать их нельзя.',
        'Так же находят нужную строку: например, ученика, у которого оценка равна пяти.',
        'И самое большое число в таблице находят перебором: сравниваем ячейки по очереди и запоминаем чемпиона.',
        'Среднее значение считают так: сумму делят на количество чисел.',
        'Таблицу можно отсортировать, но важно помнить: строка переезжает целиком, иначе данные перепутаются.',
        'Проверь себя: как записать адрес ячейки в третьей строке и втором столбце?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что такое таблица', v:{kind:'tableintro'}, r:'Строки и столбцы.', d:'Данные встают в клетки: по горизонтали идут строки, по вертикали — столбцы. Так видно сразу много чисел.'},
        {h:'Пересечение', v:{kind:'rowcol'}, r:'Строка и столбец встречаются в ячейке.', d:'Одна ячейка стоит и в своей строке, и в своём столбце — на их пересечении.'},
        {h:'Адрес ячейки', v:{kind:'celladdr'}, r:'Сначала строка, потом столбец.', d:'Сверху подписаны номера столбцов, слева — номера строк. Ячейка таблица[1][2] — это строка 1, столбец 2, и в ней число 6.'},
        {h:'Как записать таблицу', v:{kind:'tablecreate'}, r:'Таблица — это список списков.', d:'Каждая строка таблицы записана своим списком в квадратных скобках, а все строки вместе — ещё один список.'},
        {h:'Сумма по строке', v:{kind:'rowsum'}, r:'Складываем числа строки.', d:'Числа из строки по очереди летят в сумму: 4 + 5 + 3 = 12.'},
        {h:'Сумма по столбцу', v:{kind:'colsum'}, r:'А теперь складываем столбец.', d:'Здесь числа падают вниз, в сумму по столбцу: 5 + 7 + 2 = 14. Это другое число, чем сумма по строке.'},
        {h:'Поиск строки', v:{kind:'findrow'}, r:'Ищем того, у кого 5.', d:'Смотрим строки по очереди и находим нужную: у Маши оценка 5.'},
        {h:'Самое большое', v:{kind:'maxinrow'}, r:'Чемпион среди ячеек.', d:'Рамка идёт по всем ячейкам по очереди и останавливается на самой большой — это 9.'},
        {h:'Среднее значение', v:{kind:'avgrow'}, r:'Сумма делённая на количество.', d:'Сложили 4 + 5 + 3 = 12, чисел три, значит 12 : 3 = 4 — это среднее.'},
        {h:'Сортировка таблицы', v:{kind:'sorttable'}, r:'Строка переезжает целиком.', d:'При сортировке строка переезжает вместе с именем: Петя с пятью баллами встаёт первым. Если переставить только числа, данные перепутаются.'},
        {h:'Список и таблица', v:{kind:'tablevslist'}, r:'Одни данные — разная запись.', d:'В списке числа стоят в ряд, в таблице — в столбик. Данные одни и те же, меняется только форма.'},
        {h:'Расписание', v:{kind:'schedule'}, r:'Находим урок по дню и номеру.', d:'День — это столбец, номер урока — строка. Их пересечение и есть ответ: в среду третьим уроком физкультура.'},
        {h:'Дневник', v:{kind:'grades'}, r:'Сумма баллов по предметам.', d:'В каждой строке сложили баллы — и сразу видно, где больше всего: история, 15 баллов.'},
        {h:'Нажми на ячейку', v:{kind:'tabgame', vals:[[1,2,3],[4,5,6],[7,8,9]], row:2, col:1, q:'Нажми на ячейку таблица[2][1]'}, r:'Проверь себя: найди ячейку по адресу.', d:'Строка — первое число, столбец — второе. Счёт с нуля: строка 2 — третья, столбец 1 — второй.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Таблица = [[1, 2], [3, 4]]. Что окажется в таблица[1][0]?', opts:[{t:'3', ok:1},{t:'1'},{t:'4'}], exp:'Строка 1 — вторая: [3, 4]. Столбец 0 — первый элемент этой строки: 3.'}, r:'Проверь себя: найди ячейку по адресу.', d:'Сначала находим строку, потом в ней нужный столбец.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'таблица[строка][столбец]', b:1},{t:'счёт с нуля', c:gold},{t:'строка переезжает целиком', c:grn}]}, r:'Запомни, как устроена таблица.', d:'Главное: адрес ячейки — это строка и столбец, а при сортировке строка переезжает целиком.'} ],
      check:{ q:'Что означает запись таблица[2][1]?', choices:['строка 2 и столбец 1 (счёт с нуля)','строка 1 и столбец 2','два раза по одному'], ans:0, exp:'Сначала пишут номер строки, потом номер столбца; счёт начинается с нуля.' },
      tasks:[
        {q:'Таблица = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]. Чему равна ячейка таблица[1][2]?', kind:'unit', ans:6, tol:0, hints:['Строка 1 — вторая: 4, 5, 6.','Столбец 2 — третий: это 6.'], sol:'6'},
        {q:'Что переезжает при сортировке таблицы?', kind:'choice', choices:['строка целиком','только одно число','названия столбцов'], ans:0, tol:0, hints:['Иначе данные перепутаются.','Вся строка целиком.'], sol:'строка целиком'}
      ] },
    { id:519, title:'Графы: как найти дорогу', ico:'🗺', src:'Информатика · 5–6 класс · С нуля: графы',
      explain:[
        'Не все данные — это числа. Часто важнее связи: кто с кем дружит, какие города соединены дорогами.',
        'Такие связи рисуют графом: точки — это вершины, а линии между ними — рёбра.',
        'Вершиной может быть что угодно: город, человек, страница сайта, комната, остановка автобуса.',
        'Ребро означает, что две вершины связаны: например, между городами есть дорога.',
        'Сколько рёбер выходит из вершины, столько у неё соседей. Это число называют степенью вершины.',
        'Путь — это последовательность рёбер, по которым мы идём от одной вершины к другой.',
        'Из одной вершины в другую часто ведёт несколько путей: один короткий, другой длинный.',
        'Самый короткий путь находят перебором: сравнивают варианты и выбирают тот, где меньше шагов.',
        'Если у дорог есть длина или время, сравнивают не количество дорог, а их сумму.',
        'Бывает, что дорога ведёт в тупик: из такой вершины больше никуда не выйти, придётся возвращаться.',
        'Рёбра бывают направленными: по дороге можно ехать только в одну сторону — в графе это стрелка.',
        'Чтобы найти путь от старта до цели, удобно пускать «волну»: сначала соседи старта, потом их соседи.',
        'Дерево — это граф без колец: из корня идут ветки, и вернуться по кругу нельзя.',
        'А если из вершины можно вернуться в неё же — это цикл, то есть кольцо.',
        'Проверь себя: что означают вершины и рёбра на карте дорог?',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Как добраться?', v:{kind:'maptask'}, r:'Карта дорог между городами.', d:'Шесть городов соединены дорогами. Нужно решить, по каким дорогам идти из A в F.'},
        {h:'Вершины и рёбра', v:{kind:'graphintro'}, r:'Точки — вершины, линии — рёбра.', d:'Вершины — это объекты, рёбра — связи между ними. Рёбра появляются одно за другим, как будто мы рисуем карту.'},
        {h:'Сколько соседей', v:{kind:'degree'}, r:'Считаем рёбра у вершины.', d:'У вершины B четыре дороги — значит, четыре соседа. Из каждой дороги к B бежит точка.'},
        {h:'Путь по карте', v:{kind:'route'}, r:'Путь — это цепочка дорог.', d:'Смотри: золотая точка идёт из A в D, потом в E и в F. Это и есть путь из трёх дорог.'},
        {h:'Длинный и короткий', v:{kind:'longshort'}, r:'Пути бывают разной длины.', d:'Красный путь обходит карту сверху, зелёный идёт напрямую. Сравниваем и выбираем тот, где меньше дорог.'},
        {h:'Сравниваем маршруты', v:{kind:'shortest'}, r:'Выбираем самый короткий.', d:'По карте одновременно идут две точки: зелёный путь короче, поэтому он и побеждает.'},
        {h:'Тупик', v:{kind:'deadend'}, r:'Дорога ведёт в тупик.', d:'Из вершины T выходит только одна дорога. Зашли — и придётся возвращаться назад.'},
        {h:'Односторонние дороги', v:{kind:'oneway'}, r:'Ребро со стрелкой — только в одну сторону.', d:'По стрелке ехать можно, а обратно — нельзя. Такие рёбра называют направленными.'},
        {h:'Дороги с числами', v:{kind:'weight'}, r:'Считаем не дороги, а их длину.', d:'У каждой дороги своё число — время в пути. Зелёный маршрут короче по сумме, хотя дорог столько же.'},
        {h:'Волна от старта', v:{kind:'bfs'}, r:'Ищем путь волной.', d:'Сначала подсвечиваются соседи старта, потом их соседи — волна идёт по уровням и доходит до цели.'},
        {h:'Дерево', v:{kind:'tree'}, r:'Граф без колец.', d:'Из корня идут ветки, и ни одна дорога не возвращает назад. Так выглядит дерево.'},
        {h:'Цикл', v:{kind:'cycle'}, r:'Кольцо в графе.', d:'Пройдя по всем вершинам, точка возвращается в начало — это цикл.'},
        {h:'Схема метро', v:{kind:'metro'}, r:'Линии и пересадки.', d:'Схема метро — тоже граф: станции это вершины, а линии — рёбра. На пересадке переходим на другую линию.'},
        {h:'Пройди по карте', v:{kind:'walkgame', q:'Пройди из S в Z: нажимай соседние города'}, r:'Проверь себя: найди путь.', d:'Голубым подсвечены соседние города. Нажимай их по очереди, чтобы дойти до Z.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Сколько дорог в пути A → B → E, если это три вершины?', opts:[{t:'2', ok:1},{t:'3'},{t:'1'}], exp:'Вершин три, а дорог между ними две: A→B и B→E.'}, r:'Проверь себя: посчитай дороги.', d:'В пути на одну дорогу меньше, чем вершин.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'вершины и рёбра', b:1},{t:'путь — цепочка дорог', c:grn},{t:'короткий путь ищем сравнением', c:gold}]}, r:'Запомни, что такое граф.', d:'Главное: граф — это вершины и связи; путь — цепочка рёбер, а короткий путь ищут сравнением.'} ],
      check:{ q:'Что означает ребро в графе дорог?', choices:['что две вершины соединены','что вершина одна','что дорога закрыта'], ans:0, exp:'Ребро — это связь: например, дорога между двумя городами.' },
      tasks:[
        {q:'Сколько соседей у вершины, из которой выходит 4 ребра?', kind:'unit', ans:4, tol:0, hints:['Каждое ребро ведёт к соседу.','Четыре ребра — четыре соседа.'], sol:'4'},
        {q:'Как находят самый короткий путь?', kind:'choice', choices:['сравнивают варианты и выбирают с меньшим числом дорог','берут первую попавшуюся дорогу','идут наугад'], ans:0, tol:0, hints:['Сравниваем маршруты.','Выбираем тот, где меньше дорог.'], sol:'сравнивают варианты и выбирают с меньшим числом дорог'}
      ] },
    { id:520, title:'Пиксели: как компьютер хранит рисунок', ico:'🖼', src:'Информатика · 5–6 класс · С нуля: пиксели',
      explain:[
        'Рисунок на экране состоит из маленьких квадратиков — пикселей. Если сильно увеличить картинку, эти квадратики видно глазом.',
        'Пиксель — это одна клетка рисунка, и у неё только один цвет: чёрный или белый, серый или цветной.',
        'Компьютер хранит рисунок как таблицу чисел: для каждой клетки записано своё число.',
        'Самый простой рисунок — чёрно-белый. Здесь хватает двух чисел: 1 — чёрный пиксель, 0 — белый.',
        'Тогда рисунок записывают кодом: строка за строкой идут нули и единицы — так же, как мы кодировали буквы.',
        'Чтобы нарисовать картинку по коду, идём по строкам: где стоит 1 — закрашиваем клетку, где 0 — оставляем белой.',
        'Если цветов больше двух, одному пикселю нужно больше бит: 2 бита дают 4 оттенка серого, 4 бита — 16 цветов, 8 бит (один байт) — 256 цветов.',
        'Цветной пиксель кодируют тремя числами: сколько красного, зелёного и синего. Такой способ называют RGB.',
        'Каждое из этих чисел — от 0 до 255, то есть один байт. Значит, один цветной пиксель занимает три байта.',
        'Смешивая три цвета, получают любой другой: красный с зелёным дают жёлтый, а все три вместе — белый.',
        'Размер рисунка считают так: число пикселей умножают на число бит для одного пикселя.',
        'Чем больше в рисунке пикселей, тем он чётче. Это называют разрешением: 4 на 4 клетки — грубо, 100 на 100 — уже хорошо.',
        'Если подряд идут одинаковые пиксели, код можно сократить: вместо пяти нулей записать «5 нулей». Это и есть сжатие.',
        'Фотография — это миллионы пикселей, у каждого три числа. Поэтому файлы с картинками такие большие и их сжимают.',
        'Проверь себя: сколько чисел нужно, чтобы записать один цветной пиксель?',
        'Тренажёр: раскрась клетки по коду — где 1, там чёрный пиксель.',
        'Тренажёр: посчитай, сколько бит нужно для 16 цветов.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Как хранится рисунок', v:{kind:'pixeltask'}, r:'Что внутри картинки?', d:'На экране мы видим рисунок, а компьютер хранит его как таблицу чисел. Смотри, что покажет лупа.'},
        {h:'Увеличиваем', v:{kind:'pixzoom'}, r:'При увеличении видны клетки.', d:'Одна и та же картинка при разном увеличении: чем сильнее приближаем, тем крупнее становятся квадратики-пиксели.'},
        {h:'Пиксель', v:{kind:'pixel'}, r:'Клетка = пиксель = один цвет.', d:'Пиксель — самая маленькая часть рисунка. У него ровно один цвет, смешивать внутри клетки нечего.'},
        {h:'Чёрное и белое', v:{kind:'bw', mat:[[0,1,1,1,1,0],[1,0,0,0,0,1],[1,0,1,0,1,1],[1,0,0,0,0,1],[1,1,1,1,1,1],[0,1,1,1,1,0]]}, r:'Два числа — два цвета.', d:'Самый простой код: 1 — чёрный пиксель, 0 — белый. Всего один бит на клетку.'},
        {h:'Рисуем по коду', v:{kind:'drawbits', mat:[[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1]]}, r:'Числа превращаются в картинку.', d:'Слева код, справа рисунок. Клетки закрашиваются одна за другой — видно, как числа становятся картинкой.'},
        {h:'Читаем код', v:{kind:'readbits', mat:[[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1]]}, r:'А теперь наоборот.', d:'Обратная задача: смотрим на рисунок и записываем его кодом. Каждая строка клеток становится строкой из нулей и единиц.'},
        {h:'Оттенки серого', v:{kind:'graylevels'}, r:'2 бита — 4 оттенка.', d:'Если цветов больше двух, нужно больше бит: двумя битами можно записать четыре разных оттенка.'},
        {h:'Три цвета', v:{kind:'colors'}, r:'Красный, зелёный, синий.', d:'Цветной пиксель собирают из трёх цветов. Они светятся и складываются: все три вместе дают белый.'},
        {h:'Код цвета', v:{kind:'colorcode'}, r:'Цвет — это три числа.', d:'Каждый цвет записывают тремя числами от 0 до 255: сколько красного, зелёного и синего. Это и есть RGB.'},
        {h:'Сколько бит', v:{kind:'bitscount'}, r:'Больше цветов — больше бит.', d:'Каждый новый бит удваивает число цветов: 1 бит — 2 цвета, 2 бита — 4, 4 бита — 16, 8 бит — 256.'},
        {h:'Размер рисунка', v:{kind:'imgsize'}, r:'Считаем объём.', d:'Размер считают умножением: число пикселей на число бит для одного пикселя. Для цветного пикселя нужно три байта.'},
        {h:'Разрешение', v:{kind:'resolution'}, r:'Чем больше клеток, тем чётче.', d:'Слева рисунок из 16 клеток — он грубый, видны квадраты. Справа клеток больше в четыре раза — рисунок стал чётким.'},
        {h:'Сжатие', v:{kind:'rle'}, r:'Одинаковые клетки — короче.', d:'Подряд идущие одинаковые пиксели записывают группой: «5 нулей, 3 единицы, 2 нуля». Так код становится короче.'},
        {h:'Фотография', v:{kind:'photo'}, r:'Миллионы пикселей.', d:'В фотографии 1000 на 1000 пикселей — это миллион клеток, и у каждой три числа цвета. Поэтому фотографии такие большие.'},
        {h:'Раскрась по коду', v:{kind:'drawgame', q:'Раскрась клетки по коду: где 1 — чёрный', mat:[[0,1,0,0,1,0],[1,1,1,1,1,1],[1,1,1,1,1,1],[0,1,1,1,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]]}, r:'Проверь себя: нарисуй картинку.', d:'Сверху написан код. Нажимай клетки: где в коде 1 — там должен быть чёрный пиксель, где 0 — белый.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Сколько бит нужно, чтобы закодировать один пиксель с 16 цветами?', opts:[{t:'4 бита', ok:1},{t:'16 бит'},{t:'1 бит'}], exp:'16 = 2 · 2 · 2 · 2, значит, нужно 4 бита.'}, r:'Проверь себя: посчитай биты.', d:'Вспомни: каждый бит удваивает число цветов.'},
        {h:'Частые ошибки', v:{kind:'pixmistakes'}, r:'Что чаще всего путают.', d:'Под каждой ошибкой зелёным написано, как правильно.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'пиксель = клетка + число', b:1},{t:'1 — чёрный, 0 — белый', c:grn},{t:'цвет в RGB — три числа', c:gold}]}, r:'Запомни, как хранятся рисунки.', d:'Главное: рисунок — это таблица чисел, один бит для чёрно-белого и три байта для цветного пикселя.'} ],
      check:{ q:'Сколько бит нужно, чтобы закодировать один пиксель с 16 цветами?', choices:['4','16','2','8'], ans:0, exp:'16 = 2⁴, значит, для одного пикселя нужно 4 бита.' },
      tasks:[
        {q:'Сколько чисел нужно, чтобы записать один цветной пиксель (RGB)?', kind:'unit', ans:3, tol:0, hints:['Красный, зелёный, синий.','Три числа.'], sol:'3'},
        {q:'Что означает 1 в чёрно-белом коде рисунка?', kind:'choice', choices:['чёрный пиксель','белый пиксель','пустую клетку'], ans:0, tol:0, hints:['1 — закрашенная клетка.','1 — чёрный пиксель.'], sol:'чёрный пиксель'}
      ] },
    { id:521, title:'Звук в компьютере: как записать волну', ico:'🔊', src:'Информатика · 5–6 класс · С нуля: звук',
      explain:[
        'Звук — это дрожание воздуха. Когда что-то звучит, воздух начинает дрожать, и эти дрожания доходят до нашего уха.',
        'Громкость зависит от того, насколько сильно дрожит воздух: дрожит сильнее — звук громче, дрожит слабее — тише.',
        'Высота звука зависит от того, как часто дрожит воздух: частые дрожания дают высокий звук, редкие — низкий.',
        'Компьютер не может сохранить саму волну целиком. Он измеряет её через равные промежутки времени — как будто ставит точки.',
        'Каждое измерение — это одно число: насколько громким был звук в этот момент.',
        'Если измерять редко, точек получится мало, и волна будет угловатой — звук станет грубым и скрипучим.',
        'Если измерять часто, точек много, и волна получится почти как настоящая — звук будет чистым.',
        'Сколько раз в секунду измеряют звук, называют частотой дискретизации. Для музыки на диске это 44 100 раз в секунду.',
        'Каждое измерение записывают числом из нескольких бит. 8 бит дают 256 уровней громкости, а 16 бит — уже 65 536.',
        'Размер звукового файла считают умножением: измерений в секунду умножить на биты, потом на каналы и на секунды.',
        'В стерео два канала: один для левого уха, другой для правого. Значит, на каждое измерение нужно два числа, и файл в два раза больше.',
        'Записывают звук так: микрофон превращает дрожание воздуха в сигнал, компьютер измеряет его и записывает числа в файл.',
        'Играют звук обратно наоборот: компьютер читает числа и заставляет колонку дрожать точно так же, как дрожал воздух.',
        'Чтобы файл стал меньше, звук сжимают: убирают то, что человек почти не слышит. Так получается формат mp3.',
        'Проверь себя: что называют частотой дискретизации?',
        'Тренажёр: выбери запись, где звук записан точнее всего.',
        'Тренажёр: посчитай, сколько измерений делают за секунду на диске.',
        'Тренажёр и шпаргалка.' ],
      slides:[
        {h:'Что такое звук', v:{kind:'sndtask'}, r:'Звук — это дрожание воздуха.', d:'Когда колонка играет, она толкает воздух, и по нему бегут волны дрожания. Именно их и слышит наше ухо.'},
        {h:'Громко и высоко', v:{kind:'sndwave'}, r:'Громкость и высота — разные вещи.', d:'Сверху две волны одной высоты, но разной громкости: чем выше горбы, тем громче. Внизу две волны одинаковой громкости, но разной высоты: чем чаще горбы, тем выше звук.'},
        {h:'Измеряем волну', v:{kind:'sndsample'}, r:'Ставим точки через равные промежутки.', d:'Компьютер не рисует волну, а измеряет её через равные промежутки времени — как будто тикают часы. Каждая точка — это одно измерение.'},
        {h:'Измерение — это число', v:{kind:'sndnumbers'}, r:'Точки превращаются в числа.', d:'Каждая точка падает вниз и становится числом: насколько громко было в этот момент. Строка таких чисел и есть звуковой файл.'},
        {h:'Мало измерений', v:{kind:'sndfew'}, r:'Редкие измерения — грубый звук.', d:'Если точек мало, вместо плавной волны получаются ступеньки. На слух такой звук скрипучий и «металлический».'},
        {h:'Много измерений', v:{kind:'sndmore'}, r:'Частые измерения — чистый звук.', d:'Чем больше точек, тем ближе ступеньки к настоящей волне. При частых измерениях разница на слух почти незаметна.'},
        {h:'Сколько раз в секунду', v:{kind:'sndrate'}, r:'Это частота дискретизации.', d:'Телефон измеряет звук 8000 раз в секунду, музыка — 22 050, а диск CD — 44 100 раз в секунду. Чем больше измерений, тем точнее запись.'},
        {h:'Уровни громкости', v:{kind:'sndlevels'}, r:'Сколько бит на одно измерение.', d:'8 бит дают 256 уровней громкости, а 16 бит — 65 536. Чем больше уровней, тем плавнее и точнее звук.'},
        {h:'Размер файла', v:{kind:'sndsize'}, r:'Считаем, сколько места займёт.', d:'44 100 измерений умножаем на 16 бит, потом на два канала — получаем больше миллиона бит в секунду. За минуту это почти 10 мегабайт.'},
        {h:'Два канала', v:{kind:'sndstereo'}, r:'Стерео — это два числа.', d:'В стерео звук записывают отдельно для левого и правого уха. На каждое измерение нужно два числа, поэтому файл в два раза больше.'},
        {h:'Путь звука', v:{kind:'sndpipe'}, r:'От микрофона до колонки.', d:'Микрофон ловит дрожание воздуха, компьютер измеряет его, превращает в числа и сохраняет в файл. При прослушивании всё происходит наоборот.'},
        {h:'Сжатие', v:{kind:'sndmp3'}, r:'mp3 — звук поменьше.', d:'Из записи убирают то, что человек почти не слышит. Файл становится в десять раз меньше, а на слух разница почти незаметна.'},
        {h:'Пластинка и файл', v:{kind:'sndanalog'}, r:'Непрерывно и по точкам.', d:'У пластинки волна непрерывная, а в компьютере — только отдельные точки. Чем чаще измерения, тем ближе цифровой звук к настоящему.'},
        {h:'Где точнее', v:{kind:'sndgame', q:'Где звук записан точнее всего?'}, r:'Проверь себя: выбери запись.', d:'На трёх плитках одна и та же волна, но измерений разное количество. Нажми на ту, где ступеньки ровнее всего.'},
        {h:'Что выведет программа', v:{kind:'pick', q:'Сколько измерений в секунду делают при записи диска CD?', opts:[{t:'44 100', ok:1},{t:'100'},{t:'8'}], exp:'На диске CD звук измеряют 44 100 раз в секунду — это стандарт качества музыки.'}, r:'Проверь себя: посчитай измерения.', d:'Вспомни строку про диск CD: там самое большое число измерений.'},
        {h:'Частые ошибки', v:{kind:'sndmistakes'}, r:'Что чаще всего путают.', d:'Под каждой ошибкой зелёным написано, как правильно.'},
        {h:'Где мы встречаем звук', v:{kind:'sndvoice'}, r:'Вокруг нас — всюду числа.', d:'Голосовые сообщения, музыка в плеере и телефонный звонок — всё это наборы измерений. Различаются они числом измерений и качеством.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'звук = измерения', b:1},{t:'чаще измеряем — точнее', c:grn},{t:'в стерео два числа', c:gold}]}, r:'Запомни главное про звук.', d:'Главное: компьютер хранит звук как строку чисел-измерений, а точность зависит от того, как часто он измеряет.'} ],
      check:{ q:'Что называют частотой дискретизации?', choices:['сколько раз в секунду измеряют звук','как громко звучит музыка','сколько бит в файле'], ans:0, exp:'Частота дискретизации — это число измерений звука за одну секунду.' },
      tasks:[
        {q:'Сколько чисел нужно на одно измерение в стерео (два канала)?', kind:'unit', ans:2, tol:0, hints:['Один канал — левое ухо.','Два канала — два числа.'], sol:'2'},
        {q:'Что будет со звуком, если измерять его слишком редко?', kind:'choice', choices:['он станет грубым и неточным','он станет громче','он исчезнет'], ans:0, tol:0, hints:['Точек мало — волна угловатая.','Звук станет грубым.'], sol:'он станет грубым и неточным'}
      ] },
    { id:522, title:'Видео: движение из кадров', ico:'🎬', src:'Информатика · 5–6 класс · С нуля: видео',
      explain:[
        'Движение на экране — это обман зрения: компьютер показывает много похожих картинок, и они сменяют друг друга очень быстро.',
        'Такие картинки называют кадрами. Если быстро листать блокнот, где человечек нарисован чуть-чуть по-разному, он «оживёт» — так делают мультики.',
        'Кадр — это один рисунок фильма. В нём, как и в обычной картинке, есть строки и столбцы пикселей.',
        'Сколько кадров показывают за одну секунду, называют частотой кадров. Например, 24 кадра в секунду.',
        'Если кадров мало (2–3 в секунду), движение получается рывками. Если много (24 и больше), глаз видит плавное движение.',
        'Почему так? Глаз ещё мгновение «держит» увиденную картинку, поэтому быстрая смена кадров сливается в движение.',
        'Частота кадров бывает разной: в мультике и гифке около 10 кадров, в кино 24, в видео 30, а в играх 60 кадров в секунду.',
        'Посчитаем: если в секунду 24 кадра, то в минуте 24 · 60 = 1440 кадров. Поэтому фильмы занимают так много места.',
        'Каждый кадр — это сетка пикселей. Даже небольшой кадр содержит сотни тысяч пикселей, и всё это надо хранить.',
        'Разрешение кадра — это его размер в пикселях. Кадр 640 на 360 содержит 230 тысяч пикселей, а 1920 на 1080 — уже 2 миллиона.',
        'Размер видео считают так: размер одного кадра умножают на число кадров. Один несжатый кадр занимает около 6 мегабайт.',
        'Если кадров 30 в секунду, получается 180 мегабайт за одну секунду. Поэтому видео обязательно сжимают.',
        'Видео состоит из двух частей: картинки (кадры) и звука. Звук хранится отдельно — так же, как в уроке про звук.',
        'Как уменьшить размер? Хранить не все кадры целиком, а только то, что изменилось: если двигается только мяч, остальное можно не записывать.',
        'Опорные кадры хранят полностью, а промежуточные достраивают по изменениям. Так видео сжимается в сотни раз.',
        'Короткий мультик без звука удобно хранить гифкой, а фильм со звуком — в формате mp4.',
        'Если снимать с частотой 240 кадров в секунду, видео можно замедлить: кадров хватает, и движение остаётся плавным.',
        'Практика: сколько кадров в 5 секундах при 24 кадрах в секунду? Умножаем: 24 · 5 = 120 кадров.',
        'Практика: мультик 10 секунд при 10 кадрах в секунду — это 100 кадров, а при 24 кадрах — уже 240.',
        'Тренажёр: посчитай кадры для 3 секунд при 24 кадрах в секунду.',
        'Тренажёр: определи, что будет, если кадров слишком мало.',
        'Соберём тему в карту: кадры дают движение, частота отвечает за плавность, разрешение и число кадров дают размер, а сжатие уменьшает файл.',
        'Четыре главные мысли: кадр — один рисунок, частота — кадры в секунду, размер — кадры умножить на пиксели, сжатие — храним только изменения.',
        'Практика: игра рисует 60 кадров в секунду. За 3 секунды получится 60 · 3 = 180 кадров.',
        'Проверь себя: из чего состоит видео, что такое частота кадров, почему файлы большие и как их уменьшают. Шпаргалка и тренажёр!' ],
      slides:[
        {h:'Движение на экране', v:{kind:'movetask'}, r:'Откуда берётся движение?', d:'В каждом кадре мяч стоит на новом месте. Если показывать кадры быстро, глаз видит движение.'},
        {h:'Блокнот-мультик', v:{kind:'flipbook'}, r:'Быстро листаем — рисунок оживает.', d:'На каждой странице человечек нарисован чуть иначе. Когда страницы листаются быстро, человечек начинает шагать.'},
        {h:'Что такое кадр', v:{kind:'frame'}, r:'Кадр — один рисунок.', d:'Кадр — это как обычная картинка: таблица пикселей. Фильм состоит из тысяч таких кадров.'},
        {h:'Частота кадров', v:{kind:'fps'}, r:'Сколько кадров за секунду.', d:'Частота кадров — это число кадров, которые компьютер показывает за одну секунду. Обозначают «кадров в секунду».'},
        {h:'Мало и много кадров', v:{kind:'slowfast'}, r:'Мало кадров — рывки, много — плавно.', d:'Слева всего 3 кадра, и мяч прыгает рывками. Справа кадров в восемь раз больше — движение получается плавным.'},
        {h:'Почему мы видим движение', v:{kind:'eye'}, r:'Глаз задерживает картинку.', d:'Глаз ещё мгновение «держит» увиденный кадр. Поэтому при быстрой смене кадров перерывы не заметны и мы видим движение.'},
        {h:'Какая частота бывает', v:{kind:'fpsvalues'}, r:'От 10 до 60 кадров.', d:'В мультике и гифке около 10 кадров в секунду, в кино 24, в видео 30, а в играх 60. Чем больше кадров, тем плавнее.'},
        {h:'Сколько кадров в минуте', v:{kind:'framescount'}, r:'Считаем кадры.', d:'При 24 кадрах в секунду за минуту получается 24 · 60 = 1440 кадров. Это только одна минута фильма!'},
        {h:'Кадр — это пиксели', v:{kind:'framepixels'}, r:'В кадре сотни тысяч пикселей.', d:'Каждый кадр — сетка пикселей, как в уроке про рисунки. И такую сетку нужно хранить для каждого кадра.'},
        {h:'Разрешение кадра', v:{kind:'vidres'}, r:'Больше пикселей — тяжелее файл.', d:'Кадр 640 на 360 — это 230 тысяч пикселей, а 1920 на 1080 — два миллиона. Чем больше пикселей, тем больше размер видео.'},
        {h:'Размер одного кадра', v:{kind:'vidsize'}, r:'Кадр весит немало.', d:'Один несжатый кадр занимает около 6 мегабайт. Если кадров 30 в секунду, за секунду набегает 180 мегабайт.'},
        {h:'Видео и звук', v:{kind:'vidsound'}, r:'Картинка плюс звук.', d:'Видео состоит из кадров и звука. Звук хранится отдельно — теми же измерениями, о которых мы говорили в уроке про звук.'},
        {h:'Храним изменения', v:{kind:'changes'}, r:'Что изменилось — то и записываем.', d:'В соседних кадрах меняется только маленькая часть: мяч сдвинулся. Вместо целого кадра можно записать только это изменение.'},
        {h:'Опорные кадры', v:{kind:'keyframe'}, r:'Главные кадры и промежуточные.', d:'Опорные кадры хранят полностью, а промежуточные достраивают по изменениям. Так видео сжимается в сотни раз.'},
        {h:'Форматы видео', v:{kind:'vformats'}, r:'Гифка и фильм.', d:'Гифка — короткий мультик без звука, который повторяется по кругу. Формат mp4 хранит и кадры, и звук.'},
        {h:'Замедление', v:{kind:'slowmo'}, r:'Зачем много кадров.', d:'Если снять 240 кадров в секунду, видео можно замедлить: кадров хватает, и движение остаётся плавным.'},
        {h:'Практика: кадры', v:{kind:'practice1'}, r:'Сколько кадров в 5 секундах?', d:'Умножаем частоту на время: 24 · 5 = 120 кадров. Так считают кадры для любого фильма.'},
        {h:'Практика: мультик', v:{kind:'practice2'}, r:'Сравниваем две частоты.', d:'При 10 кадрах в секунду за 10 секунд получится 100 кадров, а при 24 кадрах — уже 240. Одна сцена, но разное число кадров.'},
        {h:'Тренажёр: считаем кадры', v:{kind:'vidgame', q:'Сколько кадров в 3 секундах при 24 кадрах в секунду?'}, r:'Проверь себя: посчитай кадры.', d:'Кадры в секунду умножаем на секунды: 24 · 3 = 72.'},
        {h:'Тренажёр: мало кадров', v:{kind:'vidgame2', q:'Что будет, если кадров слишком мало?'}, r:'Проверь себя: выбери ответ.', d:'Мало кадров — движение становится рывками, как в старом мультике.'},
        {h:'Карта темы', v:{kind:'vidsum'}, r:'Как связана тема.', d:'Кадры дают движение, частота отвечает за плавность, разрешение и число кадров дают размер, сжатие уменьшает файл, а звук хранится отдельно.'},
        {h:'Четыре главные мысли', v:{kind:'vtheory'}, r:'Коротко о видео.', d:'Кадр — один рисунок. Частота — кадров в секунду. Размер — кадры умножить на пиксели. Сжатие — храним только изменения.'},
        {h:'Практика: игра', v:{kind:'vpractice3'}, r:'Сколько кадров рисует игра?', d:'Игра с 60 кадрами в секунду за 3 секунды нарисует 60 · 3 = 180 кадров.'},
        {h:'Проверь себя', v:{kind:'vcheck'}, r:'Ответь на четыре вопроса.', d:'Нажимай «показать ответ» и проверяй себя: из чего состоит видео, что такое частота кадров, почему файлы большие и как их уменьшают.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'видео = кадры + звук', b:1},{t:'частота: кадров в секунду', c:grn},{t:'размер: кадры · пиксели', c:gold}]}, r:'Запомни главное о видео.', d:'Главное: движение получается из быстрой смены кадров, размер зависит от числа кадров и пикселей, а сжатие хранит только изменения.'} ],
      check:{ q:'Что называют частотой кадров?', choices:['сколько кадров показывают за секунду','сколько пикселей в кадре','сколько секунд идёт фильм'], ans:0, exp:'Частота кадров — это число кадров за одну секунду.' },
      tasks:[
        {q:'Сколько кадров в 5 секундах при 24 кадрах в секунду?', kind:'unit', ans:120, tol:0, hints:['Кадры в секунду · секунды.','24 · 5 = 120.'], sol:'120'},
        {q:'Мультик идёт 10 секунд при 10 кадрах в секунду. Сколько в нём кадров?', kind:'choice', choices:['100','20','10','1000'], ans:0, tol:0, hints:['10 · 10.','Получится 100 кадров.'], sol:'10 · 10 = 100'}
      ] },
    { id:523, title:'Как работает интернет: пакеты и адреса', ico:'🌐', src:'Информатика · 5–6 класс · С нуля: сети',
      explain:[
        'Когда мы отправляем сообщение другу, оно не летит одним куском. Компьютер делит его на маленькие части — пакеты, и они идут по сети.',
        'Сеть — это несколько компьютеров, соединённых линиями связи. По этим линиям данные бегут от одного устройства к другому.',
        'Дома и в школе устройства соединяет роутер: он связывает ноутбук, телефон, телевизор и планшет в одну сеть — локальную.',
        'Интернет — это сеть сетей: миллионы компьютеров по всему миру соединены друг с другом.',
        'Чтобы письмо дошло до нужного устройства, ему нужен адрес. В сети адрес числовой — его называют IP-адресом.',
        'IP-адрес состоит из четырёх чисел от 0 до 255, разделённых точками: например, 192.168.1.25. Это как номер дома, только для компьютера.',
        'Адреса не повторяются: у ноутбука и телефона разные IP-адреса, иначе данные уходили бы не туда.',
        'Люди помнят имена сайтов, а сеть работает с числами. Поэтому имя превращают в адрес с помощью DNS — «телефонной книги» интернета.',
        'Файл или сообщение делят на пакеты. У каждого пакета есть адрес получателя и номер, чтобы собрать всё в правильном порядке.',
        'Пакеты могут идти разными дорогами: один — через один город, другой — через другой. У получателя они собираются в целый файл.',
        'Дорогу для пакетов выбирает маршрутизатор: он смотрит, какая дорога свободнее и короче, и отправляет пакет туда.',
        'Чтобы всё работало, нужны общие правила — протокол. Он говорит, как подписать пакет, как проверить его и что делать, если пакет потерялся.',
        'Подключиться к сети можно по проводу или без него. Wi-Fi — это беспроводное подключение, но сам интернет при этом тот же.',
        'Сайт хранится на сервере — большом компьютере, который работает круглосуточно. Браузер отправляет запрос, сервер отвечает страницей.',
        'Браузер делает несколько шагов: читает имя сайта, узнаёт у DNS адрес, просит страницу у сервера, собирает пакеты и показывает страницу.',
        'Скорость передачи измеряют в мегабитах в секунду. Чем она больше, тем быстрее скачивается файл.',
        'Практика: файл 10 мегабайт при скорости 5 мегабит в секунду. 10 МБ = 80 Мбит, 80 : 5 = 16 секунд.',
        'Практика: файл 100 килобайт делим на пакеты по 1 килобайту — получится 100 пакетов.',
        'Практика: в адресе 10.0.0.7 четыре числа; последнее часто означает само устройство, а первые — сеть.',
        'В сети важно быть внимательным: держать пароль в секрете, не переходить по чужим ссылкам и не выкладывать личные данные.',
        'Тренажёр: что такое IP-адрес.',
        'Тренажёр: что будет, если пакет потерялся.',
        'Частые ошибки: путать интернет и сайт, думать, что данные идут одним куском, считать Wi-Fi интернетом и забывать про правила протокола.',
        'Соберём тему в карту: адрес, пакеты, маршрутизатор, DNS и сайт — из этого состоит любая передача данных.',
        'Шпаргалка: адрес → пакеты → маршрутизатор → сборка; имя сайта находит DNS; скорость считают в мегабитах. Проверь себя!' ],
      slides:[
        {h:'Как доходит сообщение', v:{kind:'nettask'}, r:'Сообщение делится на части.', d:'Сообщение не летит одним куском: компьютер режет его на пакеты, и они идут по сети.'},
        {h:'Что такое сеть', v:{kind:'network'}, r:'Компьютеры соединены линиями.', d:'Сеть — это устройства, соединённые линиями связи. У каждого устройства в сети есть свой номер.'},
        {h:'Домашняя сеть', v:{kind:'localnet'}, r:'Роутер связывает устройства.', d:'Роутер соединяет ноутбук, телефон, телевизор и планшет в одну локальную сеть.'},
        {h:'Интернет — сеть сетей', v:{kind:'globe'}, r:'Миллионы компьютеров вместе.', d:'Интернет — это сети, соединённые между собой по всему миру — поэтому связь есть между любыми странами.'},
        {h:'IP-адрес', v:{kind:'ipaddr'}, r:'Номер устройства в сети.', d:'IP-адрес — четыре числа от 0 до 255, разделённые точками. Для сети это как номер дома.'},
        {h:'Адреса разные', v:{kind:'ipunique'}, r:'У каждого устройства свой адрес.', d:'Если адреса повторятся, данные уйдут не туда. Поэтому у ноутбука и телефона адреса разные.'},
        {h:'DNS: имя и адрес', v:{kind:'dns'}, r:'Имя сайта превращается в адрес.', d:'Человек пишет имя сайта, а сеть работает с числами. DNS — «телефонная книга», которая превращает имя в адрес.'},
        {h:'Данные делят на пакеты', v:{kind:'packets'}, r:'Файл становится пакетами.', d:'Файл 100 килобайт при пакете 1 килобайт даёт 100 пакетов. У каждого пакета есть адрес и номер.'},
        {h:'Пакеты идут разными путями', v:{kind:'packetroute'}, r:'Три пакета — три дороги.', d:'Пакеты могут идти разными дорогами, а у получателя собираются в один файл по номерам.'},
        {h:'Маршрутизатор выбирает дорогу', v:{kind:'routerjob'}, r:'Какая дорога короче.', d:'Маршрутизатор смотрит на «стоимость» дорог и отправляет пакет туда, где быстрее.'},
        {h:'Правила передачи', v:{kind:'protocol'}, r:'Протокол — общие правила.', d:'Протокол говорит, как подписать пакет, как проверить, не испортился ли он, и что делать, если пакет потерялся.'},
        {h:'Wi-Fi и кабель', v:{kind:'wifi'}, r:'Без провода и с проводом.', d:'Wi-Fi — беспроводное подключение, кабель — проводное. Сам интернет при этом один и тот же.'},
        {h:'Сервер и клиент', v:(function(){return {kind:'serverclient'};})(), r:'Браузер просит — сервер отвечает.', d:'Сервер — компьютер, который хранит сайт и отвечает на запросы. Браузер — клиент, который просит страницу.'},
        {h:'Что делает браузер', v:{kind:'browser'}, r:'Пять шагов до страницы.', d:'Браузер читает имя, спрашивает адрес у DNS, просит страницу, собирает пакеты и показывает результат.'},
        {h:'Скорость передачи', v:{kind:'speed'}, r:'Мегабиты в секунду.', d:'Скорость показывает, сколько данных проходит за секунду. 1 мегабайт — это 8 мегабит.'},
        {h:'Задача: время загрузки', v:{kind:'praccalc'}, r:'10 МБ при 5 Мбит/с.', d:'Переводим мегабайты в мегабиты: 10 · 8 = 80. Делим на скорость: 80 : 5 = 16 секунд.'},
        {h:'Задача: сколько пакетов', v:{kind:'pracpackets'}, r:'100 КБ по 1 КБ.', d:'Делим размер файла на размер пакета: 100 : 1 = 100 пакетов.'},
        {h:'Задача: читаем адрес', v:{kind:'pracaddr'}, r:'Что означают числа.', d:'В адресе 10.0.0.7 четыре числа. Первые описывают сеть, последнее — само устройство.'},
        {h:'Безопасность в сети', v:{kind:'safety'}, r:'Три главных правила.', d:'Держи пароль в секрете, не переходи по чужим ссылкам и не выкладывай личные данные.'},
        {h:'Тренажёр: IP-адрес', v:{kind:'netgame', q:'Что такое IP-адрес?'}, r:'Проверь себя: выбери ответ.', d:'IP-адрес — это числовой номер устройства в сети, например 192.168.1.25.'},
        {h:'Тренажёр: потерянный пакет', v:{kind:'netgame2', q:'Что будет, если пакет потерялся?'}, r:'Проверь себя: выбери ответ.', d:'По правилам протокола потерянный пакет отправляют снова, поэтому файл всё равно соберётся.'},
        {h:'Частые ошибки', v:{kind:'netmist'}, r:'Что чаще всего путают.', d:'Интернет и сайт — разные вещи; данные идут пакетами; Wi-Fi — это способ подключения, а не сам интернет.'},
        {h:'Карта темы', v:{kind:'netsum'}, r:'Как связана тема.', d:'Адрес указывает, куда идти; пакеты — что передаём; маршрутизатор выбирает дорогу; DNS находит адрес по имени.'},
        {h:'Проверь себя', v:{kind:'netcheck'}, r:'Ответь на четыре вопроса.', d:'Нажимай «показать ответ» и проверяй себя: адрес, пакеты, маршрутизатор и DNS.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'адрес → пакеты → маршрут', b:1},{t:'DNS: имя превращается в адрес', c:grn},{t:'скорость — в мегабитах', c:gold}]}, r:'Запомни главное о сети.', d:'Главное: данные идут пакетами, у каждого устройства есть адрес, дорогу выбирает маршрутизатор, а имя сайта превращает в адрес DNS.'} ],
      check:{ q:'На что компьютер делит файл, когда отправляет его по сети?', choices:['на пакеты','на буквы','на страницы','на картинки'], ans:0, exp:'Данные делят на пакеты — маленькие части с адресом и номером.' },
      tasks:[
        {q:'Файл 100 килобайт передают пакетами по 1 килобайту. Сколько получится пакетов?', kind:'unit', ans:100, tol:0, hints:['Делим размер файла на размер пакета.','100 : 1 = 100.'], sol:'100'},
        {q:'Что делает DNS?', kind:'choice', choices:['превращает имя сайта в адрес','хранит пароли','ускоряет интернет','удаляет вирусы'], ans:0, tol:0, hints:['DNS — «телефонная книга» интернета.','Он находит адрес по имени.'], sol:'превращает имя сайта в адрес'}
      ] },
    { id:524, title:'Шифры: как спрятать сообщение', ico:'🔐', src:'Информатика · 5–6 класс · С нуля: шифры',
      explain:[
        'Секретное сообщение опасно отправлять как есть: любой по пути может его прочитать. Поэтому сообщение шифруют — прячут по правилу.',
        'Простейший шифр придумали ещё в древности: Юлий Цезарь сдвигал каждую букву на 3 вперёд. Из А получалось Г, из Б — Д, из В — Е.',
        'Такой шифр называют шифром сдвига: буквы как будто едут по кругу алфавита. Число сдвига — это ключ шифра.',
        'Чтобы удобнее было шифровать, делают шифровальный круг: на внешнем кольце обычные буквы, на внутреннем — сдвинутые. Круг поворачивают на ключ.',
        'Шифруем слово КОТ с ключом 3: К становится Н, О становится С, Т становится Х. Получается НСХ.',
        'Чтобы расшифровать, круг поворачивают назад — на те же 3 буквы. НСХ снова превращается в КОТ. У кого есть ключ, тот и прочитает.',
        'Ключ — самое важное в шифре. Другой ключ даёт совсем другой шифр: одно и то же слово зашифруется по-разному.',
        'В русском алфавите 32 буквы, значит ключей тоже 32: сдвиги от 0 до 31. Сдвиг 0 ничего не меняет, поэтому он бесполезен.',
        'Если буквы заканчиваются, счёт продолжается с начала: после Я идёт А. Алфавит как будто замкнут в круг, и это важно помнить.',
        'Шифровать можно не только сдвигом. Есть способ читать слово наоборот — но он очень слабый: буквы просто переставили.',
        'Можно заменить буквы числами: А = 1, Б = 2, …, Я = 32. Тогда слово КОТ запишется как 11 15 19.',
        'А можно придумать свой значок для каждой буквы. Тогда ключом становится таблица значков: без неё сообщение не прочитать.',
        'Правило простое: способ шифрования знать можно, а ключ — нельзя. Секрет — это именно ключ.',
        'Если шифр простой, его можно взломать перебором: попробовать все ключи по порядку и посмотреть, где текст станет читаемым.',
        'Перебор работает быстро: 32 варианта — это совсем немного. Поэтому настоящие шифры делают гораздо сложнее.',
        'Есть и более хитрый способ взлома: если мы знаем одно слово из сообщения, по нему можно найти сдвиг и вычислить ключ.',
        'Практика: зашифруем слово ЗАМОК с ключом 4 — получится ЛДРТО. Каждая буква сдвинулась на 4.',
        'Покрути шифровальный круг сам: меняй ключ и смотри, когда шифр НСХ превратится в понятное слово.',
        'Современные шифры устроены намного сложнее: длинный ключ, перемешивание, разные замены для одной и той же буквы. Но идея та же: правило плюс секретный ключ.',
        'Есть ещё один приём — спрятать сообщение внутри другого текста. Например, читать первые буквы строк: из них складывается тайное слово.',
        'В секретной переписке важно: не отправлять пароль в чате, хранить ключ отдельно и помнить, что слабый шифр взламывают быстро.',
        'Тренажёр: расшифруй слово НСХ с ключом 3.',
        'Тренажёр: определи, какой ключ использовали для слова ПРИВЕТ.',
        'Проверь себя: что такое ключ, сколько ключей бывает, как читают шифр сдвига и что держат в секрете.',
        'Проверь себя: что такое ключ, сколько бывает ключей, как читают шифр сдвига и что держат в секрете.',
        'Шпаргалка: ключ — число сдвига, алфавит замкнут в круг, расшифровка — сдвиг назад, секрет — это ключ. Проверь себя!' ],
      slides:[
        {h:'Зачем прятать сообщение', v:{kind:'secrettask'}, r:'Любой может прочитать.', d:'Сообщение без шифра прочитает каждый, через кого оно проходит. Поэтому его прячут по правилу.'},
        {h:'Шифр Цезаря', v:{kind:'caesarstory'}, r:'Сдвиг на три буквы.', d:'Цезарь сдвигал каждую букву на 3 вперёд: А превращалось в Г, Б — в Д, В — в Е. Это шифр сдвига.'},
        {h:'Сдвигаем алфавит', v:{kind:'shift3'}, r:'Нижняя строка уезжает.', d:'Если сдвинуть нижнюю строку алфавита на 3 клетки, буква А окажется над Г, а Б — над Д. Так и шифруют.'},
        {h:'Шифровальный круг', v:{kind:'cipherdisc'}, r:'Два кольца с буквами.', d:'На внешнем кольце обычные буквы, на внутреннем — сдвинутые. Круг поворачивают на число ключа.'},
        {h:'Шифруем слово', v:{kind:'cipherenc'}, r:'КОТ с ключом 3.', d:'Каждая буква идёт по кругу: К становится Н, О — С, Т — Х. Получается НСХ.'},
        {h:'Расшифровываем', v:{kind:'cipherdec'}, r:'Сдвигаем назад.', d:'Чтобы прочитать шифр, круг поворачивают назад на то же число. НСХ снова становится КОТ.'},
        {h:'Что такое ключ', v:{kind:'keyidea'}, r:'Число сдвига.', d:'Ключ — это число, на которое сдвигают буквы. С другим ключом то же слово зашифруется иначе.'},
        {h:'Сколько бывает ключей', v:{kind:'keyvars'}, r:'32 буквы — 32 ключа.', d:'Ключ может быть от 0 до 31. Сдвиг 0 ничего не меняет, поэтому он не нужен.'},
        {h:'Шифруем ШКОЛА', v:{kind:'alpha'}, r:'Каждая буква сдвинулась.', d:'ШКОЛА с ключом 3 даёт ЫНСОГ. Смотри внимательно: Я переходит через край алфавита.'},
        {h:'Буква за буквой', v:{kind:'ciphex1'}, r:'Каждая буква отдельно.', d:'Буквы шифруются по одной: К → Н, О → С, Т → Х. Из трёх букв получается НСХ.'},
        {h:'Алфавит замкнут в круг', v:{kind:'ciphex2'}, r:'После Я идёт А.', d:'Если сдвигать букву в конце алфавита, счёт продолжается с начала: Я + 3 = В. Об этом легко забыть и ошибиться.'},
        {h:'Читаем наоборот', v:{kind:'revword'}, r:'Слабый способ.', d:'Слово можно просто перевернуть: СЕКРЕТ станет ТЕРЕКС. Это легко разгадать, потому что буквы те же.'},
        {h:'Буквы как числа', v:{kind:'numcode'}, r:'А = 1, Б = 2.', d:'Каждой букве можно дать номер: А = 1, Б = 2, …, Я = 32. Тогда КОТ запишется как 11 15 19.'},
        {h:'Шифр значками', v:{kind:'symcode'}, r:'Свой значок для буквы.', d:'Можно придумать значок для каждой буквы. Ключом станет таблица значков — без неё текст не прочитать.'},
        {h:'Что держат в секрете', v:{kind:'keysecret'}, r:'Секрет — это ключ.', d:'Способ шифрования знать можно, а ключ — нельзя. Если ключ попадёт к чужому, он прочитает всё.'},
        {h:'Взлом перебором', v:{kind:'brute'}, r:'Пробуем все ключи.', d:'Простой шифр взламывают перебором: подставляют ключи по порядку, пока текст не станет читаемым.'},
        {h:'Взлом по слову', v:{kind:'crackword'}, r:'Знаем одно слово — знаем ключ.', d:'Если известно, что в тексте есть слово ПРИВЕТ, сравниваем буквы и находим сдвиг. Так узнают ключ.'},
        {h:'Практика: ЗАМОК', v:{kind:'cpracc'}, r:'Ключ 4.', d:'Сдвигаем каждую букву на 4: З → Л, А → Д, М → Р, О → Т, К → О. Получается ЛДРТО.'},
        {h:'Покрути круг', v:{kind:'cpdial', q:'Крути круг и расшифруй слово'}, r:'Меняй ключ кнопками.', d:'Нажимай «−1» и «+1», поворачивая круг, пока шифр НСХ не превратится в понятное слово.'},
        {h:'Настоящие шифры', v:{kind:'hardcipher'}, r:'Сложно, но идея та же.', d:'В современных шифрах длинный ключ, перемешивание и разные замены, но принцип тот же: правило плюс секретный ключ.'},
        {h:'Спрятать в тексте', v:{kind:'stego'}, r:'Читаем первые буквы.', d:'Сообщение можно спрятать внутри обычного текста: если читать первые буквы строк, получится тайное слово.'},
        {h:'Правила секретов', v:{kind:'cpsafety'}, r:'Три важных правила.', d:'Не отправляй пароль в чате, храни ключ отдельно от шифра и помни: слабый шифр взламывают быстро.'},
        {h:'Тренажёр: расшифруй', v:{kind:'cpgame1', q:'НСХ с ключом 3 — какое слово?'}, r:'Проверь себя: выбери слово.', d:'Сдвигаем каждую букву на 3 назад: Н → К, С → О, Х → Т. Получается КОТ.'},
        {h:'Тренажёр: найди ключ', v:{kind:'cpgame2', q:'ПРИВЕТ → ТУЛЕЗИХ: какой ключ?'}, r:'Проверь себя: выбери ключ.', d:'Сравниваем первые буквы: П и Т стоят на расстоянии 3 букв. Значит, ключ равен 3.'},
        {h:'Проверь себя', v:{kind:'cpcheck'}, r:'Ответь на четыре вопроса.', d:'Нажимай «показать ответ» и проверяй себя: ключ, число ключей, расшифровка и что держат в секрете.'},
        {h:'Шпаргалка', v:{kind:'text', lines:[{t:'ключ — число сдвига', b:1},{t:'алфавит замкнут в круг', c:grn},{t:'секрет — это ключ', c:gold}]}, r:'Запомни главное о шифрах.', d:'Главное: буквы сдвигают на ключ по кругу, расшифровка — сдвиг назад, а секретным должен быть только ключ.'} ],
      check:{ q:'Что такое ключ в шифре сдвига?', choices:['число, на которое сдвигают буквы','само слово','таблица значков','пароль от почты'], ans:0, exp:'Ключ — это число сдвига, например 3.' },
      tasks:[
        {q:'Слово КОТ зашифровали ключом 3. Какое слово получилось?', kind:'choice', choices:['НСХ','ЛПЦ','МТЧ','НРХ'], ans:0, tol:0, hints:['К сдвигается на 3 вперёд.','К→Н, О→С, Т→Х.'], sol:'НСХ'},
        {q:'Сколько всего ключей у алфавита из 32 букв?', kind:'unit', ans:32, tol:0, hints:['Ключ — любой сдвиг от 0 до 31.','Получится 32 варианта.'], sol:'32'}
      ] },
    { id:525, title:'Фракталы: красота из простого правила', ico:'🌿', src:'Информатика · 5–6 класс · С нуля: фракталы',
      explain:[
        'Фрактал — это фигура, у которой часть похожа на целое. Посмотри на дерево: каждая его ветка устроена так же, как всё дерево.',
        'Если приближать фрактал, рисунок повторяется: внутри большого — маленькое, внутри маленького — ещё меньше. Деталей бесконечно много.',
        'Главная идея: берём простое правило и применяем его снова и снова. Из одного правила получается сложная и красивая картина.',
        'Чтобы нарисовать фрактал, нужна рекурсия — алгоритм, который вызывает сам себя. Как помощник из урока про вспомогательные алгоритмы, только он зовёт себя.',
        'Начнём с дерева. Уровень 0 — это один ствол. Дальше каждая ветка делится на две поменьше.',
        'Уровень 1: ствол и две ветки. Уровень 2: каждая ветка снова делится — получается 7 веток.',
        'Уровень 3: продолжаем то же правило — уже 15 веток, и дерево выглядит настоящим.',
        'Считаем ветки: 1, 3, 7, 15 — с каждым уровнем число почти удваивается. Поэтому фракталы растут так быстро.',
        'Теперь другая фигура — треугольник Серпинского. Начинаем с одного большого треугольника.',
        'Шаг 1: убираем серединный треугольник. Остаются три угловых.',
        'Шаг 2: то же самое делаем с каждым из трёх — получается 9 треугольников.',
        'Шаг 3: повторяем правило ещё раз — 27 треугольников и множество дырок. Это и есть треугольник Серпинского.',
        'Число треугольников растёт умножением на 3: 1, 3, 9, 27. Так фрактал становится всё подробнее.',
        'Снежинка Коха строится из отрезка. Сначала делим отрезок на три равные части.',
        'Потом заменяем серединную часть «уголком». Из одного отрезка получается четыре.',
        'Повторяем то же правило на каждом из четырёх отрезков — ломаная становится всё сложнее.',
        'Если соединить три такие кривые, получится знаменитая снежинка Коха — её контур бесконечно изрезан.',
        'У снежинки Коха удивительное свойство: периметр увеличивается на каждом шаге (× 4/3), а площадь остаётся ограниченной.',
        'Похожим правилом рисуют папоротник: ствол, листочки, а на них — снова маленькие листочки.',
        'Фракталы бесконечно подробные: сколько ни приближай, внутри снова находится такая же форма.',
        'Фракталы встречаются в природе: деревья, снежинки, берега морей, брокколи, молнии и облака.',
        'Практика: если на каждом уровне каждая ветка даёт две новые, то на 4-м уровне появится 2⁴ = 16 новых веток.',
        'Практика: у треугольника Серпинского на 4-м шаге будет 3⁴ = 81 маленький треугольник.',
        'Мастерская: выбери фигуру — дерево, треугольник или снежинку — и нажимай «+1 уровень». Смотри, как из простого правила вырастает фрактал.',
        'Частые ошибки: думать, что фрактал — просто узор; считать, что детали когда-нибудь закончатся; путать номер уровня с размером рисунка.',
        'Шпаргалка: фрактал — часть похожа на целое; правило повторяют много раз; рекурсия — алгоритм, вызывающий себя; веток 1, 3, 7, 15, а треугольников 1, 3, 9, 27. Проверь себя!' ],
      slides:[
        {h:'Часть похожа на целое', v:{kind:'fracintro'}, r:'Знакомимся с фракталом.', d:'Фрактал — это фигура, у которой часть похожа на целое. Ветка дерева устроена так же, как всё дерево.'},
        {h:'Приближаем', v:{kind:'selfsimilar'}, r:'Внутри большого — маленькое.', d:'Если приближать фрактал, мы снова видим ту же форму. Так повторяется на всех уровнях.'},
        {h:'Простое правило', v:{kind:'fracrule'}, r:'Одно правило — сложная картина.', d:'Берём простое правило и применяем его снова и снова: из этого вырастает фрактал.'},
        {h:'Рекурсия', v:{kind:'recursion'}, r:'Алгоритм зовёт сам себя.', d:'Рисовать фрактал помогает рекурсия: процедура рисует ветку и вызывает себя для двух веток поменьше.'},
        {h:'Дерево: уровень 0', v:{kind:'tree1'}, r:'Начинаем со ствола.', d:'Уровень 0 — это один ствол. Дальше каждая ветка будет делиться на две.'},
        {h:'Дерево: уровень 1', v:{kind:'tree3'}, r:'Уже три ветки.', d:'Ствол дал две ветки — всего 3 ветки. Правило остаётся тем же.'},
        {h:'Дерево: уровень 2', v:{kind:'tree5'}, r:'Ветки делятся снова.', d:'Каждая ветка снова делится на две, и веток становится 7.'},
        {h:'Настоящее фрактальное дерево', v:{kind:'tree7'}, r:'Уровень 3: 15 веток.', d:'Продолжаем то же правило — и получается дерево, похожее на настоящее.'},
        {h:'Считаем ветки', v:{kind:'treecount'}, r:'1, 3, 7, 15…', d:'С каждым уровнем число веток почти удваивается: 1, 3, 7, 15. Поэтому фракталы растут очень быстро.'},
        {h:'Треугольник Серпинского', v:{kind:'sierp1'}, r:'Шаг 0: один треугольник.', d:'Начинаем с одного большого треугольника — это шаг 0.'},
        {h:'Шаг 1: убираем середину', v:{kind:'sierp2'}, r:'Остались три угловых.', d:'Убрали серединный треугольник — получилось 3 треугольника.'},
        {h:'Шаг 2: повторяем', v:{kind:'sierp3'}, r:'Уже девять треугольников.', d:'То же правило применили к каждому из трёх — стало 9 треугольников.'},
        {h:'Треугольник Серпинского готов', v:{kind:'sierp4'}, r:'Шаг 3: 27 треугольников.', d:'Ещё один шаг — 27 треугольников и много пустых мест. Это классический фрактал.'},
        {h:'Считаем треугольники', v:{kind:'sierpcount'}, r:'1, 3, 9, 27…', d:'Число треугольников умножается на 3 на каждом шаге: 1, 3, 9, 27.'},
        {h:'Снежинка Коха: начало', v:{kind:'koch1'}, r:'Делим отрезок на три части.', d:'Правило Коха начинается с деления отрезка на три равные части.'},
        {h:'Заменяем середину', v:{kind:'koch2'}, r:'Появился уголок.', d:'Серединную часть заменили уголком: из одного отрезка стало четыре.'},
        {h:'Повторяем правило', v:{kind:'koch3'}, r:'Ломаная усложняется.', d:'То же правило применяем к каждому отрезку — ломаная становится всё изрезаннее.'},
        {h:'Снежинка Коха', v:{kind:'koch4'}, r:'Три кривые вместе.', d:'Соединили три кривые Коха — получилась знаменитая снежинка.'},
        {h:'Периметр растёт', v:{kind:'kochperim'}, r:'× 4/3 на каждом шаге.', d:'Периметр снежинки увеличивается на каждом шаге, а площадь остаётся ограниченной.'},
        {h:'Папоротник', v:{kind:'fern'}, r:'Тот же приём — другой рисунок.', d:'Похожим правилом рисуют папоротник: листочки, а на них — снова маленькие листочки.'},
        {h:'Бесконечная детализация', v:{kind:'fraczoom'}, r:'Приближаем — то же самое.', d:'Сколько ни приближай фрактал, внутри снова находится такая же форма.'},
        {h:'Фракталы в природе', v:{kind:'nature'}, r:'Дерево, снежинка, берег, брокколи.', d:'Фракталы встречаются в природе постоянно: деревья, снежинки, берега морей, брокколи.'},
        {h:'Практика: считаем', v:{kind:'fracpractice'}, r:'2⁴ = 16 и 3⁴ = 81.', d:'На 4-м уровне дерева появится 16 новых веток, а у треугольника Серпинского на 4-м шаге будет 81 треугольник.'},
        {h:'Мастерская фракталов', v:{kind:'fraccreator'}, r:'Построй фрактал сам!', d:'Выбирай фигуру и нажимай «+1 уровень»: смотри, как из простого правила вырастает фрактал.'},
        {h:'Частые ошибки', v:{kind:'fracmist'}, r:'Что чаще всего путают.', d:'Фрактал строят по правилу; детали не заканчиваются; уровень — это номер повторения правила.'},
        {h:'Шпаргалка', v:{kind:'fracsheet'}, r:'Шесть главных мыслей.', d:'Фрактал — часть похожа на целое; правило повторяют много раз; рекурсия — алгоритм, вызывающий себя.'} ],
      check:{ q:'Что такое фрактал?', choices:['фигура, у которой часть похожа на целое','любой красивый узор','фигура из одних треугольников','алгоритм без повторений'], ans:0, exp:'Фрактал — фигура, у которой часть подобна целому.' },
      tasks:[
        {q:'В дереве каждая ветка на следующем уровне даёт две новые. Сколько новых веток появится на 4-м уровне?', kind:'unit', ans:16, tol:0, hints:['Уровень 0 — 1 ветка, уровень 1 — 2 новые.','Новых веток 2⁴ = 16.'], sol:'2⁴ = 16'},
        {q:'Сколько маленьких треугольников у треугольника Серпинского на 4-м шаге?', kind:'choice', choices:['81','27','64','12'], ans:0, tol:0, hints:['Число треугольников умножается на 3.','1, 3, 9, 27, 81 — значит 3⁴ = 81.'], sol:'3⁴ = 81'}
      ] },
    { id:526, title:'Искусственный интеллект: как машина учится', ico:'🤖', src:'Информатика · 5–6 класс · С нуля: ИИ',
      explain:[
        'Искусственный интеллект — это программа, которая учится на примерах. Мы показываем ей много примеров с ответами, и она находит закономерность.',
        'ИИ уже вокруг нас: он узнаёт лица на фото, понимает речь, переводит тексты, советует фильмы, играет в игры и помогает врачам.',
        'Это не волшебство, а математика: внутри идут числа, признаки и вычисления. Машина не «понимает» смысл, она сравнивает числа.',
        'Данные — это примеры вместе с ответами. Чем больше хороших примеров, тем лучше учится машина. Такие данные называют обучающей выборкой.',
        'Признаки — это свойства, по которым различают объекты: форма, размер, цвет. По ним машина и принимает решение.',
        'Пример: отличить круг от квадрата можно по одному признаку — округлости от 0 до 1. У круга она близка к единице.',
        'У каждого признака есть вес — насколько он важен. Чем больше вес, тем сильнее признак влияет на ответ. Веса машина подбирает сама.',
        'Сначала машина угадывает наугад: её граница решения стоит в случайном месте, и она часто ошибается.',
        'Увидев ошибку, машина сдвигает границу в нужную сторону. Каждая ошибка — маленький шаг к правильному ответу.',
        'Обучение — это цикл: показать пример, получить ответ, сравнить с правильным, исправить веса. И так много-много раз.',
        'Чем больше примеров, тем точнее модель: на 10 примерах точность около 60%, а на 1000 — уже около 97%.',
        'Точность растёт шаг за шагом — это хорошо видно на графике. Сначала ошибок много, потом всё меньше.',
        'Дерево решений — понятный способ обучения: машина задаёт вопросы «да» или «нет» и идёт по веткам к ответу.',
        'Нейросеть — это много нейронов и связей между ними. Каждый нейрон складывает сигналы с весами и передаёт дальше.',
        'Слои нейросети идут от входа к выходу: вход — признаки, скрытые слои — сочетания признаков, выход — ответ.',
        'Отличие от обычной программы: правила пишет человек, а в обучении правила находит машина по данным.',
        'Если данные плохие, ответы тоже плохие: «мусор на входе — мусор на выходе». Однобокие примеры приводят к ошибкам.',
        'ИИ может ошибаться, поэтому важные решения принимает человек: врач, учитель, инженер. Машина — помощник, а не начальник.',
        'Как обучают модель: собрать примеры, выбрать признаки, обучить, а потом обязательно проверить на новых данных.',
        'Практика: чтобы точность была около 95%, нужны сотни примеров; если модель ошибается часто — добавьте хорошие примеры.',
        'Мастерская: перед тобой машина, которая учится отличать круг от квадрата. Подсказывай ей «верно» или «ошибка» — и смотри, как двигается граница и растёт точность.',
        'Мастерская: построй дерево решений сам — отвечай на вопросы «да» и «нет», и дерево приведёт к ответу: птица, пингвин, рыба или кот.',
        'Проверь себя: машина обучилась, и её граница стоит на 0,50. Что она ответит про объект с округлостью 0,72?',
        'Частые ошибки: думать, что ИИ понимает смысл; верить любому ответу; учить на плохих примерах; ждать 100% точности.',
        'Шпаргалка: данные → признаки → веса → цикл обучения → проверка; ответ ИИ всегда проверяет человек. Проверь себя!',
        'Итог: соберём всё вместе — данные, признаки, веса, обучение и проверка. Так машина сама находит границу и учится отличать круг от квадрата.' ],
      slides:[
        {h:'Что такое ИИ', v:{kind:'aiintro'}, r:'Машина учится на примерах.', d:'Искусственный интеллект — программа, которая находит закономерность в примерах и потом узнаёт похожие объекты.'},
        {h:'Где работает ИИ', v:{kind:'aiwhere'}, r:'Вокруг нас.', d:'ИИ узнаёт фото, понимает речь, переводит, советует фильмы, играет в игры и помогает врачам.'},
        {h:'Это не магия', v:{kind:'ainotmagic'}, r:'Внутри — числа.', d:'ИИ не думает как человек: он работает с числами, признаками и весами. Это математика, а не волшебство.'},
        {h:'Данные и ответы', v:{kind:'aidata'}, r:'Обучающая выборка.', d:'Данные — это примеры вместе с правильными ответами. Чем больше хороших примеров, тем точнее обучение.'},
        {h:'Признаки', v:{kind:'aifeatures'}, r:'По чему различаем.', d:'Признаки — свойства объекта: форма, размер, цвет. По ним машина и отличает объекты.'},
        {h:'Один признак', v:{kind:'aiexample'}, r:'Округлость от 0 до 1.', d:'Круг и квадрат можно различить по одному признаку — округлости. Каждый пример получает число.'},
        {h:'Вес признака', v:{kind:'aiweight'}, r:'Насколько признак важен.', d:'У каждого признака есть вес. Чем он больше, тем сильнее влияет на ответ. Веса подбирает сама машина.'},
        {h:'Первая догадка', v:{kind:'aiguess'}, r:'Машина угадывает.', d:'Сначала граница решения стоит почти в начале, и машина почти всё называет кругом — она часто ошибается.'},
        {h:'Исправляем ошибку', v:{kind:'aicorrect'}, r:'Граница сдвигается.', d:'Увидев ошибку, машина сдвигает границу к правильному месту. Так она учится.'},
        {h:'Цикл обучения', v:{kind:'ailoop'}, r:'Четыре шага по кругу.', d:'Обучение — это цикл: пример, ответ, сравнение с правильным, исправление. И так много раз.'},
        {h:'Больше примеров', v:{kind:'aimore'}, r:'Точность выше.', d:'На 10 примерах точность около 60%, на 50 — 78%, на 200 — 92%, а на 1000 — 97%.'},
        {h:'График точности', v:{kind:'aiaccuracy'}, r:'Растёт шаг за шагом.', d:'Точность модели растёт с каждой попыткой: сначала ошибок много, потом всё меньше.'},
        {h:'Дерево решений', v:{kind:'aitree'}, r:'Вопросы «да» и «нет».', d:'Дерево решений задаёт вопросы и идёт по веткам к ответу. Такое решение легко понять.'},
        {h:'Нейросеть', v:{kind:'aineuron'}, r:'Нейроны и связи.', d:'Нейросеть — много нейронов, соединённых связями. Сигнал идёт от входа к ответу.'},
        {h:'Слои', v:{kind:'ailayers'}, r:'От признаков к ответу.', d:'Вход — признаки, скрытые слои — их сочетания, выход — ответ машины.'},
        {h:'Не как программа', v:{kind:'ainotprogram'}, r:'Правила находит машина.', d:'В обычной программе правила пишет человек, а в обучении правила находятся по данным.'},
        {h:'Плохие данные', v:{kind:'aibaddata'}, r:'Мусор на входе — мусор на выходе.', d:'Если примеры плохие или однобокие, машина будет ошибаться. Качество данных решает всё.'},
        {h:'Этика', v:{kind:'aiethics'}, r:'Помощник, не начальник.', d:'ИИ может ошибаться, поэтому важные решения принимает человек. Ответственность всегда на нас.'},
        {h:'План обучения', v:{kind:'aiplan'}, r:'Четыре шага инженера.', d:'Собрать примеры, выбрать признаки, обучить модель и проверить её на новых данных.'},
        {h:'Практика', v:{kind:'aipractice'}, r:'Думаем как инженеры ИИ.', d:'Сколько нужно примеров, какой признак важнее и что делать, если модель часто ошибается.'},
        {h:'Мастерская: обучи машину', v:{kind:'aitrain'}, r:'Подскажи, где ошибка!', d:'Машина показывает свой ответ, а ты нажимай «верно» или «ошибка». Граница будет двигаться, а точность — расти.'},
        {h:'Мастерская: дерево решений', v:{kind:'aitreegame'}, r:'Отвечай на вопросы.', d:'Отвечай «да» и «нет» — и дерево приведёт к ответу: птица, пингвин, рыба или кот.'},
        {h:'Что выучила машина', v:{kind:'aitest'}, r:'Проверь модель.', d:'Машина обучилась, граница стоит на 0,50. Посмотри, что она скажет про новый объект.'},
        {h:'Частые ошибки', v:{kind:'aimistakes'}, r:'Что чаще всего путают.', d:'ИИ не понимает смысл, может ошибаться, зависит от данных и не даёт 100% точности.'},
        {h:'Шпаргалка', v:{kind:'aisheet'}, r:'Шесть главных мыслей.', d:'Данные, признаки, веса, цикл обучения, нейросеть и обязательная проверка человеком.'},
        {h:'Итог', v:{kind:'aifinish'}, r:'Машина нашла границу сама.', d:'Данные → признаки → обучение → проверка. Так машина учится отличать круг от квадрата.'} ],
      check:{ q:'Как машина учится отличать круг от квадрата?', choices:['находит закономерность в примерах','читает надписи на картинке','спрашивает у человека каждый раз','запоминает все ответы наизусть'], ans:0, exp:'Машина находит закономерность в примерах с ответами и по ней предсказывает.' },
      tasks:[
        {q:'Сколько признаков нужно машине, чтобы отличать круг от квадрата по округлости?', kind:'unit', ans:1, tol:0, hints:['Округлость — один признак.','Достаточно одного признака.'], sol:'1'},
        {q:'Что произойдёт, если обучать машину на плохих примерах?', kind:'choice', choices:['она будет ошибаться','она станет умнее','ничего не изменится','она выключится'], ans:0, tol:0, hints:['«Мусор на входе — мусор на выходе».','Плохие данные дают плохие ответы.'], sol:'она будет ошибаться'}
      ] }
  ];

  /* ---------- движок виджета ---------- */
  function renderInf(el, L, spec){
    const pre='ix'+L.id;
    css(pre);
    const step=LV.step||0;
    const s=spec.slides[Math.min(step,spec.slides.length-1)];
    const lk=lidKey(LV.id); if(!CHS[lk]) CHS[lk]={}; const st=CHS[lk];
    if(st._at!==step){ st._at=step; st.go=0; st.pick=-1; st.seq=[]; st.bad=-1; st.find=-1; st.moves=0;
      st.arr=(s.v.kind==='sortgame')?(s.v.vals||[7,2,9,3,1]).slice():null; st.glo=null; st.gi=null; st.gsteps=0; st.tab=null; st.bad=-1; st.tabOk=0; st.wnode=0; st.wsteps=0; st.wbad=-1;
      st.grid=(s.v.kind==='drawgame')?(s.v.mat||[[0,1,0,0,1,0],[1,1,1,1,1,1],[1,1,1,1,1,1],[0,1,1,1,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]]).map(r=>r.map(()=>0)):null; }
    const go=st.go||0;
    const isPick=(s.v.kind==='pick'||s.v.kind==='sort'||s.v.kind==='find'||s.v.kind==='findcell'||s.v.kind==='sortgame'||s.v.kind==='guessnum'||s.v.kind==='tabgame'||s.v.kind==='walkgame'||s.v.kind==='drawgame'||s.v.kind==='sndgame'||s.v.kind==='vidgame'||s.v.kind==='vidgame2'||s.v.kind==='vcheck'||s.v.kind==='netgame'||s.v.kind==='netgame2'||s.v.kind==='netcheck'||s.v.kind==='cpgame1'||s.v.kind==='cpgame2'||s.v.kind==='cpdial'||s.v.kind==='cpcheck'||s.v.kind==='fraccreator'||s.v.kind==='aitrain'||s.v.kind==='aitreegame'||s.v.kind==='aitest');
    const H=vizH(s.v)+30;
    const inner = `<g class="${pre}In">${(go||isPick)? viz(s.v,pre,step,st,lk) : ''}</g>`;
    const btnRow = (s.v.kind==='sort')
      ? wkRow(wkBtn('собрать заново',`infSeq('${lk}',-1,0)`))
      : (s.v.kind==='sortgame')
      ? wkRow(wkBtn('начать заново',`infSwap('${lk}',-1,1)`))
      : (s.v.kind==='guessnum')
      ? ((st.gsteps>0)? wkRow(wkBtn('загадать снова',`infGuess('${lk}',0,0,0,0)`)) : '')
      : (s.v.kind==='tabgame')
      ? ((st.tab)? wkRow(wkBtn('ещё раз',`infTab('${lk}',-1,-1,0)`)) : '')
      : (s.v.kind==='walkgame')
      ? wkRow(wkBtn('сначала',`infWalk('${lk}',-1,0)`))
      : (s.v.kind==='drawgame')
      ? wkRow(wkBtn('начать заново',`infDraw('${lk}',-1,-1)`))
      : (s.v.kind==='find')
      ? (st.find>=0? wkRow(wkBtn('искать снова',`infFind('${lk}',-1,0)`)) : '')
      : (s.v.kind==='findcell')
      ? (st.find>=0? wkRow(wkBtn('искать снова',`infCell('${lk}',-1,0)`)) : '')
      : (s.v.kind==='aitrain')
      ? wkRow(wkBtn('начать заново',`infTrain('${lk}',0,1)`))
      : (s.v.kind==='aitreegame')
      ? wkRow(wkBtn('сбросить ответы',`infTree('${lk}','reset',0)`))
      : (s.v.kind==='fraccreator')
      ? wkRow(wkBtn('сброс',`infFracLvl('${lk}',0,1)`))
      : (s.v.kind==='cpdial')
      ? wkRow(wkBtn('сброс круга',`infShift('${lk}',0,1)`))
      : (s.v.kind==='vcheck'||s.v.kind==='netcheck'||s.v.kind==='cpcheck')
      ? ((st.q||0)<4? wkRow(wkBtn('показать ответ',`infQ('${lk}')`)) : wkRow(wkBtn('сначала',`infQ('${lk}',1)`)))
      : isPick
      ? (st.pick>=0? wkRow(wkBtn('ещё раз',`infPick('${lk}',-1)`)) : '')
      : wkRow(go?wkBtn('сброс',`infAct('${lk}')`):wkBtn('показать',`infAct('${lk}')`));
    const capShown = (s.v.kind==='sort')? (((st.seq||[]).length===(s.v.items||[]).length) && s.r) : (s.v.kind==='find'||s.v.kind==='findcell')? (st.find>=0 && s.r) : (s.v.kind==='sortgame')? (((st.arr||[]).length>0 && (st.arr||[]).every((x,i,a)=>i===0||a[i-1]<=x)) && s.r) : (s.v.kind==='guessnum')? ((st.glo!=null && st.glo>=st.gi) && s.r) : (s.v.kind==='tabgame')? (st.tabOk===1 && s.r) : (s.v.kind==='walkgame')? ((st.wnode===4) && s.r) : (s.v.kind==='drawgame')? (!!(st.grid&&st.grid.every((row,k)=>row.every((v2,c)=>{const t2=(s.v.mat||[[0,1,0,0,1,0],[1,1,1,1,1,1],[1,1,1,1,1,1],[0,1,1,1,1,0],[0,0,1,1,0,0],[0,0,0,0,0,0]])[k]||[]; return v2===t2[c];}))) && s.r) : (s.v.kind==='vcheck'||s.v.kind==='netcheck'||s.v.kind==='cpcheck')? (((st.q||0)>=4) && s.r) : (s.v.kind==='aitrain')? ((st.n>=6) && s.r) : (s.v.kind==='aitreegame')? ((st.a3>0) && s.r) : (s.v.kind==='fraccreator')? ((st.lvl>=3) && s.r) : (s.v.kind==='cpdial')? ((st.sh===3) && s.r) : (isPick? (st.pick>=0 && s.r) : (go && s.r));
    let h = wkFrame(`<div class="wk-big" style="font-size:23px">${s.h}</div>`+
      wkHero(arh(318,H,inner,pre))+
      (capShown?wkRow(chip(s.r,grn,pre)):'')+
      (s.d?wkNote(s.d):'')+
      btnRow+
      wkSml(L.title));
    el.innerHTML=`<div style="margin-top:6px">${h}</div>`;
  }
  window.infTrain=function(lk,say,reset){
    const st=CHS[lk]||(CHS[lk]={});
    if(reset){ st.t=0.18; st.i=0; st.n=0; st.ok=0; chRender(0); return; }
    const t=(typeof st.t==='number')?st.t:0.18;
    const i=(typeof st.i==='number')?st.i:0;
    const list=aiExamples, ex=list[i%list.length];
    const pred=(ex.x>t), right=(pred===(ex.y===1));
    st.n=(st.n||0)+1;
    if(right) st.ok=(st.ok||0)+1;
    if(say===2 && !right){ st.t=Math.max(0.05,Math.min(0.95, ex.y===1 ? t-0.07 : t+0.07)); }
    st.i=i+1;
    chRender(0);
  };
  window.infTree=function(lk,field,val){
    const st=CHS[lk]||(CHS[lk]={});
    if(field==='reset'){ st.a1=0; st.a2=0; st.a3=0; chRender(0); return; }
    st[field]=val; chRender(0);
  };
  window.infFracMode=function(lk,mode){
    const st=CHS[lk]||(CHS[lk]={}); st.fk=mode; chRender(0);
  };
  window.infFracLvl=function(lk,delta,reset){
    const st=CHS[lk]||(CHS[lk]={});
    if(reset) st.lvl=0; else st.lvl=Math.max(0,Math.min(4,(st.lvl||0)+delta));
    chRender(0);
  };
  window.infShift=function(lk,delta,reset){
    const st=CHS[lk]||(CHS[lk]={});
    if(reset) st.sh=0; else st.sh=((st.sh||0)+delta+32)%32;
    chRender(0);
  };
  window.infQ=function(lk,reset){
    const st=CHS[lk]||(CHS[lk]={});
    if(reset) st.q=0; else st.q=Math.min(4,(st.q||0)+1);
    chRender(0);
  };
  window.infDraw=function(lk,r,c){
    const st=CHS[lk]||(CHS[lk]={}); const g=st.grid;
    if(!g) return;
    if(r<0){ st.grid=null; chRender(0); return; }
    g[r][c]=g[r][c]?0:1; chRender(0);
  };
  window.infWalk=function(lk,i,ok){
    const st=CHS[lk]||(CHS[lk]={});
    if(i<0){ st.wnode=0; st.wsteps=0; st.wbad=-1; chRender(0); return; }
    if(!ok){ st.wbad=i; chRender(0); return; }
    st.wnode=i; st.wsteps=(st.wsteps||0)+1; st.wbad=-1; chRender(0);
  };
  window.infTab=function(lk,r,c,ok){
    const st=CHS[lk]||(CHS[lk]={});
    if(r<0){ st.tab=null; st.bad=-1; st.tabOk=0; chRender(0); return; }
    st.tab=[r,c]; st.tabOk=ok?1:0; st.bad=ok?(-1):(r*10+c); chRender(0);
  };
  window.infGuess=function(lk,dir,L0,H0,T){
    const st=CHS[lk]||(CHS[lk]={});
    if(dir===0){ st.glo=null; st.gi=null; st.gsteps=0; chRender(0); return; }
    let lo=(st.glo!=null)?st.glo:L0, hi=(st.gi!=null)?st.gi:H0;
    const mid=Math.floor((lo+hi)/2);
    if(dir>0) lo=mid+1; else hi=mid-1;
    st.glo=lo; st.gi=hi; st.gsteps=(st.gsteps||0)+1;
    chRender(0);
  };
  window.infSwap=function(lk,i,reset){
    const st=CHS[lk]||(CHS[lk]={});
    if(reset){ st.arr=null; st.moves=0; chRender(0); return; }
    const cur=st.arr||null;
    const base=(cur&&cur.length)?cur:null;
    if(!base) return;
    if(i<0||i>=base.length-1) return;
    const v=base.slice(), t=v[i]; v[i]=v[i+1]; v[i+1]=t;
    st.arr=v; st.moves=(st.moves||0)+1; chRender(0);
  };
  window.infCell=function(lk,i,ok){
    const st=CHS[lk]||(CHS[lk]={});
    if(i<0){ st.find=-1; st.bad=-1; chRender(0); return; }
    st.find=i; st.bad=ok?(-1):i; chRender(0);
  };
  window.infFind=function(lk,i,ok){
    const st=CHS[lk]||(CHS[lk]={});
    if(i<0){ st.find=-1; st.bad=-1; chRender(0); return; }
    st.find=i; st.bad=ok?(-1):i; chRender(0);
  };
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
