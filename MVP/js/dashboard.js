/* АРХИМЕД MVP · dashboard.js — кабинет родителя: редакционный отчёт о занятиях */
'use strict';
function themeStats(){
  const map={};
  window.ARH_TASKS.forEach(t=>{
    const key=t.island+' :: '+themeOf(t);
    map[key]=map[key]||{island:t.island, theme:themeOf(t), n:0, done:0, tries:0, wrong:0};
    const st=DB.tasks[t.id];
    map[key].n++;
    if(st&&st.done){ map[key].done++; map[key].tries+=st.tries||0; map[key].wrong+=st.wrong||0; }
  });
  return Object.values(map);
}
function forecast(){
  const m=window.ARH_TASKS.filter(t=>t.island==='Сиракузы'&&t.diff>=2);
  if(!m.length) return {lvl:0,txt:''};
  const d=m.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done);
  const pct=d.length/m.length;
  const avgTry=d.reduce((s,t)=>s+(DB.tasks[t.id].tries||0),0)/Math.max(1,d.length);
  let lvl=0;
  if(pct>=0.75&&avgTry<=1.8) lvl=3; else if(pct>=0.5&&avgTry<=2.2) lvl=2; else if(pct>=0.25) lvl=1;
  const txt=lvl===3?'Высокая готовность: решает большинство задач уровня 2+ почти без ошибок — пора пробовать школьный этап ВсОШ.'
    : lvl===2?'Средняя готовность: половина задач уровня 2+ взята. Стоит укрепить слабые темы и добить серии без подсказок.'
    : lvl===1?'Начало пути: уверенно решаются базовые задачи. Продолжайте разборы приёмов в уроках «объясни → реши».'
    : 'Только стартовали: пройдите 3–4 задачи с разбором, чтобы ребёнок почувствовал приёмы.';
  return {lvl, txt, pct:Math.round(pct*100), avgTry:+avgTry.toFixed(1)};
}
function parentOk(){ try{ return sessionStorage.getItem('arhimed_parent')==='1'; }catch(e){ return false; } }
function renderParentLock(){
  const s=document.getElementById('screen');
  s.innerHTML=`<div class="card" style="max-width:420px;margin:20px auto">
    <div style="text-align:center"><div style="font-size:38px">🔒</div>
      <h2 style="margin:6px 0">Кабинет родителя</h2>
      <div class="small" style="margin-bottom:10px">Раздел защищён паролем — здесь отчёт о занятиях и настройки.</div></div>
    <label style="font-size:12.5px;color:var(--muted)">Логин</label>
    <input class="gate-in" id="gateUser" placeholder="admin" autocomplete="off">
    <label style="font-size:12.5px;color:var(--muted)">Пароль</label>
    <input class="gate-in" id="gatePass" type="password" placeholder="•••••">
    <button class="btn" style="width:100%;margin-top:12px" onclick="tryParent()">Войти</button>
    <div class="small" style="margin-top:8px">Доступ по умолчанию: admin / admin</div>
    <div class="small" style="margin-top:10px">Отчёт можно смотреть и с телефона родителя — в приложении «Родитель».
      Для этого нужен код ребёнка.</div>
  </div>
  ${typeof kidCodeCard==='function'?kidCodeCard():''}`;
  const p=document.getElementById('gatePass'); if(p){ p.focus(); p.addEventListener('keydown',e=>{ if(e.key==='Enter') tryParent(); }); }
  hud();
}
function tryParent(){
  const u=document.getElementById('gateUser').value.trim().toLowerCase();
  const p=document.getElementById('gatePass').value;
  if(u==='admin'&&p==='admin'){ try{ sessionStorage.setItem('arhimed_parent','1'); }catch(e){} toast('Добро пожаловать!'); renderDashboard(); }
  else { toast('Неверный логин или пароль'); const el=document.getElementById('gatePass'); if(el) el.value=''; }
}
/* ---------- данные ---------- */
function pvPeriod(){ return (DB.pvPeriod==='30')?'30':((DB.pvPeriod==='all')?'all':'7'); }
function pvSet(p){ DB.pvPeriod=p; try{ save(); }catch(e){} renderDashboard(); }
function pvDayList(n){
  const out=[], now=new Date();
  for(let i=n-1;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i);
    const k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    const r=(DB.days||{})[k]||{};
    out.push({key:k, date:d, dow:['вс','пн','вт','ср','чт','пт','сб'][d.getDay()], dnum:d.getDate(),
      min:r.min||0, tasks:r.tasks||0, wrong:r.wrong||0, steps:r.lessonSteps||0, lessons:r.lessons||0});
  }
  return out;
}
function pvAllDays(){
  const keys=Object.keys(DB.days||{}); if(!keys.length) return [];
  return keys.sort((a,b)=>{ const [ay,am,ad]=a.split('-').map(Number), [by,bm,bd]=b.split('-').map(Number);
    return (ay-by)||(am-bm)||(ad-bd); });
}
function pvMetrics(period){
  const today=DB.today.minutes||0;
  const n=(period==='all')?Math.min(90, Math.max(7, pvAllDays().length||1)):(period==='30'?30:7);
  const days=pvDayList(n);
  const sum=k=>days.reduce((s,d)=>s+(d[k]||0),0);
  const active=days.filter(d=>d.min>0||d.tasks>0||d.steps>0).length;
  const best=days.slice().sort((a,b)=>b.min-a.min)[0]||{min:0,dnum:'—'};
  return {days, today, active, best, allMin:totalMinutes(),
    periodMin:sum('min'), periodTasks:sum('tasks'), periodWrong:sum('wrong'), periodSteps:sum('steps'), periodLessons:sum('lessons')};
}
function pvLessons(){
  const L=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson==='function'?isVisibleLesson(x):!x.hidden);
  const done=L.filter(x=>DB.lessons&&DB.lessons[x.id]&&DB.lessons[x.id].done);
  const last=new Map(); (DB.events||[]).forEach(e=>{ if(e.type==='lesson') last.set(e.id,e); });
  return {total:L.length, done:done.length, list:done.map(x=>({L:x, rec:DB.lessons[x.id], ev:last.get(x.id)}))};
}
function pvTasks(){
  const all=window.ARH_TASKS||[];
  const done=all.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done);
  const first=done.filter(t=>(DB.tasks[t.id].tries||1)<=1).length;
  const wrong=all.filter(t=>DB.tasks[t.id]&&(DB.tasks[t.id].wrong||0)>0)
    .map(t=>({t, st:DB.tasks[t.id]})).sort((a,b)=>(b.st.wrong||0)-(a.st.wrong||0));
  const lastTs=new Map(); (DB.events||[]).forEach(e=>{ if(e.type==='wrong'||e.type==='task') lastTs.set(e.id,e.ts); });
  return {total:all.length, done:done.length, first, wrong, lastTs};
}
function pvSubjects(){
  const L=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson!=='function'||isVisibleLesson(x));
  const isInf=x=>/Информатика/i.test(x.src||'');
  const inf=L.filter(isInf), mat=L.filter(x=>!isInf(x));
  const dn=a=>a.filter(x=>DB.lessons&&DB.lessons[x.id]&&DB.lessons[x.id].done).length;
  const st=a=>a.reduce((s,x)=>s+(DB.events||[]).filter(e=>e.type==='step'&&e.id===x.id).length,0);
  const all=window.ARH_TASKS||[];
  return {inf:inf.length, mat:mat.length, dInf:dn(inf), dMat:dn(mat), sInf:st(inf), sMat:st(mat),
    tDone:all.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length, tAll:all.length};
}
function pvMin(m){ const h=Math.floor(m/60), r=m%60; return h? (h+' ч'+(r?' '+r+' мин':'')) : (r+' мин'); }
function pvDate(ts){ if(!ts) return ''; const d=new Date(ts); return ('0'+d.getDate()).slice(-2)+'.'+('0'+(d.getMonth()+1)).slice(-2)+'.'+String(d.getFullYear()).slice(2); }
function pvLong(ts){ const d=ts?new Date(ts):new Date(); return d.toLocaleDateString('ru-RU',{day:'numeric',month:'long'}); }
/* ---------- типографика отчёта ---------- */
function rpStyles(){
  if(document.getElementById('rpCss')) return;
  const st=document.createElement('style'); st.id='rpCss';
  st.textContent=`
  .rp-wrap{max-width:520px;margin:0 auto}
  .rp-kicker{font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted)}
  .rp-name{font-size:21px;color:var(--brass);line-height:1.15;margin-top:2px}
  .rp-sub{font-size:11.5px;color:var(--muted);margin-top:2px}
  .rp-sec{display:flex;align-items:center;gap:10px;margin:20px 0 8px}
  .rp-sec i{flex:1;height:1px;background:linear-gradient(90deg,rgba(217,164,65,.45),transparent)}
  .rp-sec b{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--brass);font-weight:normal}
  .rp-sec span{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .rp-card{position:relative;border-radius:14px;padding:13px 13px 11px;margin:0 0 10px;
    background:linear-gradient(172deg,rgba(24,47,36,.95),rgba(14,24,48,.6) 70%,rgba(10,19,26,.9));
    border:1px solid rgba(217,164,65,.20);box-shadow:0 18px 40px -30px #000 inset,0 1px 0 rgba(255,255,255,.03) inset}
  .rp-card:before{content:'';position:absolute;inset:0;border-radius:14px;pointer-events:none;
    background:radial-gradient(120% 70% at 100% 0%,rgba(217,164,65,.07),transparent 60%)}
  .rp-num{font-variant-numeric:tabular-nums lining-nums;font-feature-settings:'tnum' 1}
  .rp-hero{display:flex;align-items:flex-end;gap:14px;justify-content:space-between}
  .rp-hero .big{font-size:40px;line-height:1;color:var(--brass);letter-spacing:-.02em}
  .rp-hero .unit{font-size:12px;color:var(--muted);margin-left:5px}
  .rp-hero .side{text-align:right}
  .rp-hero .side div{font-size:12px;color:var(--ivory);line-height:1.7}
  .rp-hero .side span{color:var(--muted)}
  .rp-row2{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:12px;padding-top:11px;
    border-top:1px solid rgba(217,164,65,.14)}
  .rp-metric{font-size:19px;color:var(--ivory)}
  .rp-metric small{display:block;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
  .rp-seg{display:flex;gap:2px;background:rgba(8,16,13,.55);border:1px solid rgba(217,164,65,.18);border-radius:10px;padding:3px}
  .rp-seg button{flex:1;background:none;border:none;color:var(--muted);font-family:inherit;font-size:11.5px;
    padding:6px 0;border-radius:7px;letter-spacing:.04em;transition:color .2s,background .25s}
  .rp-seg button.on{color:#1b1408;background:linear-gradient(180deg,#e7bd6a,#c08f31);font-weight:bold}
  .rp-chart{display:block;width:100%;height:auto;margin-top:2px}
  .rp-legend{display:flex;gap:12px;flex-wrap:wrap;font-size:10px;color:var(--muted);margin-top:7px}
  .rp-legend em{font-style:normal;display:inline-flex;align-items:center;gap:5px}
  .rp-legend i{width:9px;height:9px;border-radius:3px;display:inline-block}
  .rp-bars{display:flex;align-items:flex-end;gap:3px;height:54px;margin-top:4px}
  .rp-bars .c{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center}
  .rp-bars .c i{display:block;width:100%;max-width:9px;border-radius:2px 2px 0 0;transform-origin:bottom;
    animation:rpUp .8s cubic-bezier(.22,.85,.24,1) both}
  .rp-bars .c i.s{background:linear-gradient(180deg,rgba(127,184,160,.95),rgba(127,184,160,.35))}
  .rp-bars .c i.t{background:linear-gradient(180deg,#e7c277,#b8852c)}
  @keyframes rpUp{from{transform:scaleY(.04);opacity:.25}to{transform:scaleY(1);opacity:1}}
  .rp-barlab{display:flex;gap:3px;margin-top:3px}
  .rp-barlab span{flex:1;text-align:center;font-size:8.5px;color:var(--muted)}
  .rp-rings{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:2px}
  .rp-ring{text-align:center;position:relative}
  .rp-ring svg{display:block;margin:0 auto}
  .rp-ring .v{position:absolute;left:0;right:0;top:24px;font-size:16px;color:var(--ivory)}
  .rp-ring .k{font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:4px}
  .rp-heat{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,11px);gap:3px;margin-top:6px;overflow-x:auto;padding-bottom:3px}
  .rp-heat i{width:11px;height:11px;border-radius:3px;animation:rpFade .55s ease both}
  @keyframes rpFade{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:none}}
  .rp-heatx{display:flex;gap:3px;justify-content:space-between;font-size:8.5px;color:var(--muted);margin-top:4px}
  .rp-line{display:flex;align-items:baseline;gap:9px;padding:8px 0;border-bottom:1px solid rgba(217,164,65,.12)}
  .rp-line:last-child{border-bottom:none}
  .rp-line .d{font-size:9.5px;color:var(--muted);font-variant-numeric:tabular-nums;min-width:44px}
  .rp-line .t{flex:1;min-width:0;font-size:12.5px;color:var(--ivory);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .rp-line .m{font-size:11px;color:var(--muted);white-space:nowrap}
  .rp-link{background:none;border:none;border-bottom:1px solid rgba(217,164,65,.55);color:var(--brass);
    font-family:inherit;font-size:11px;padding:0 0 1px;letter-spacing:.02em}
  .rp-link:hover{border-color:var(--brass)}
  .rp-chip{display:inline-block;min-width:22px;text-align:center;border-radius:5px;padding:1px 5px;font-size:10.5px;
    background:rgba(232,106,90,.14);color:#e89a8f;border:1px solid rgba(232,106,90,.3)}
  .rp-quote{border-left:2px solid rgba(217,164,65,.6);padding:2px 0 2px 11px;margin-top:9px;font-size:12.5px;line-height:1.6;color:#d8e0ee}
  .rp-quote b{color:var(--brass);font-weight:normal;letter-spacing:.14em;text-transform:uppercase;font-size:9.5px;display:block;margin-bottom:3px}
  .rp-quote.g{border-color:rgba(127,184,160,.6)}
  .rp-quote.g b{color:var(--glass)}
  .rp-adv{margin:7px 0 0;padding:0;list-style:none}
  .rp-adv li{position:relative;padding-left:13px;font-size:12.5px;line-height:1.55;color:#d8e0ee;margin-bottom:5px}
  .rp-adv li:before{content:'—';position:absolute;left:0;color:var(--brass)}
  .rp-foot{display:flex;gap:8px;margin:14px 0 22px}
  .rp-foot button{flex:1;background:none;border:1px solid rgba(217,164,65,.25);border-radius:9px;color:var(--muted);
    font-family:inherit;font-size:11px;padding:9px 0}
  .rp-foot button:last-child{color:#e89a8f;border-color:rgba(232,106,90,.35)}
  .rp-note{font-size:10.5px;color:var(--muted);line-height:1.5;margin:0 2px 18px}
  .rp-bar{height:5px;border-radius:3px;background:rgba(255,255,255,.07);overflow:hidden;margin:7px 0 3px}
  .rp-bar i{display:block;height:100%;border-radius:3px;transition:width 1s cubic-bezier(.22,.85,.24,1)}
  .rp-dots{display:flex;gap:5px;align-items:center}
  .rp-dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.14)}
  .rp-dots i.ok{background:var(--glass)}
  .rp-dots i.no{background:#e86a5a}
  .rp-dots i.now{box-shadow:0 0 0 3px rgba(217,164,65,.22);background:var(--brass)}
  `;
  document.head.appendChild(st);
}
/* ---------- графики: спокойное осмысленное движение ---------- */
function rpChart(days, w, h){
  const P={l:26,r:8,t:16,b:20};
  const W=w-P.l-P.r, H=h-P.t-P.b;
  const max=Math.max(10, ...days.map(d=>d.min));
  const step=days.length>1? W/(days.length-1):W;
  const pt=days.map((d,i)=>({x:P.l+i*step, y:P.t+H-(d.min/max)*H, d}));
  const avg=days.length? days.reduce((s,d)=>s+d.min,0)/days.length : 0;
  const avgY=P.t+H-(avg/max)*H;
  let line='M'+pt[0].x.toFixed(1)+' '+pt[0].y.toFixed(1);
  for(let i=0;i<pt.length-1;i++){
    const a=pt[i], b=pt[i+1], cx=(a.x+b.x)/2;
    line+=' C'+cx.toFixed(1)+' '+a.y.toFixed(1)+' '+cx.toFixed(1)+' '+b.y.toFixed(1)+' '+b.x.toFixed(1)+' '+b.y.toFixed(1);
  }
  const area=line+` L${pt[pt.length-1].x.toFixed(1)} ${(P.t+H).toFixed(1)} L${pt[0].x.toFixed(1)} ${(P.t+H).toFixed(1)} Z`;
  const grid=[0,.5,1].map(f=>{ const y=P.t+H-f*H, v=Math.round(max*f);
    return `<line x1="${P.l}" y1="${y.toFixed(1)}" x2="${w-P.r}" y2="${y.toFixed(1)}" stroke="rgba(217,164,65,.13)" stroke-width="1"/>`
      +`<text x="${P.l-3}" y="${(y+3).toFixed(1)}" text-anchor="end" font-size="8" fill="#8fa08f" class="rp-num">${v}</text>`; }).join('');
  const last=pt.length-1;
  const dots=pt.map((p,i)=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${i===last?3.4:2.2}"
      fill="${i===last?'#e7bd6a':'#7fb8a0'}" opacity="0">
      <animate attributeName="opacity" values="0;1" dur=".5s" begin="${(0.55+i*0.045).toFixed(2)}s" fill="freeze"/>
      <title>${pvLong(p.d.date.getTime())}: ${p.d.min} мин · задач ${p.d.tasks} · ошибок ${p.d.wrong}</title></circle>`).join('');
  const every=days.length>15?5:(days.length>9?3:1);
  const labels=days.map((d,i)=>{
    if(i%every!==0 && i!==last) return '';
    const dow=(days.length<=7)?d.dow:(''+d.dnum);
    return `<text x="${pt[i].x.toFixed(1)}" y="${h-6}" text-anchor="middle" font-size="8" fill="#8fa08f">${dow}</text>`;
  }).join('');
  return `<svg class="rp-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Время занятий по дням">
    <defs>
      <linearGradient id="rpA" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d9a441" stop-opacity=".38"/><stop offset="1" stop-color="#d9a441" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="rpL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7fb8a0"/><stop offset="1" stop-color="#f0cd84"/>
      </linearGradient>
    </defs>
    ${grid}
    <line x1="${P.l}" y1="${avgY.toFixed(1)}" x2="${w-P.r}" y2="${avgY.toFixed(1)}" stroke="rgba(217,164,65,.5)" stroke-width="1" stroke-dasharray="3 4"/>
    <text x="${w-P.r}" y="${(avgY-3).toFixed(1)}" text-anchor="end" font-size="8" fill="#a98a4a">среднее ${Math.round(avg)}</text>
    <line x1="${pt[last].x.toFixed(1)}" y1="${P.t}" x2="${pt[last].x.toFixed(1)}" y2="${(P.t+H).toFixed(1)}" stroke="rgba(231,189,106,.35)" stroke-width="1"/>
    <path d="${area}" fill="url(#rpA)" opacity="0">
      <animate attributeName="opacity" values="0;1" dur="1s" begin=".25s" fill="freeze"/></path>
    <path d="${line}" fill="none" stroke="url(#rpL)" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="1400">
      <animate attributeName="stroke-dashoffset" values="1400;0" dur="1.5s" fill="freeze"/></path>
    ${dots}${labels}
    <text x="${pt[last].x.toFixed(1)}" y="${(pt[last].y-9).toFixed(1)}" text-anchor="end" font-size="9.5" fill="#e7bd6a" class="rp-num">${days[last].min} мин</text>
  </svg>`;
}
function rpBars(days){
  const max=Math.max(1, ...days.map(d=>d.tasks+d.steps/5));
  const every=days.length>15?5:(days.length>9?3:1);
  let bars='', labs='';
  days.forEach((d,i)=>{
    const ht=(d.tasks/max)*40, hs=((d.steps/5)/max)*40;
    bars+=`<div class="c" title="${pvLong(d.date.getTime())}: задач ${d.tasks}, шагов ${d.steps}">`
      +`<i class="s" style="height:${Math.max(0,hs).toFixed(1)}px;animation-delay:${(i*0.028).toFixed(2)}s"></i>`
      +`<i class="t" style="height:${Math.max(d.tasks?2:0,ht).toFixed(1)}px;animation-delay:${(i*0.028+0.05).toFixed(2)}s"></i></div>`;
    labs+=`<span>${(i%every===0||i===days.length-1)?((days.length<=7)?d.dow:d.dnum):''}</span>`;
  });
  return `<div class="rp-bars">${bars}</div><div class="rp-barlab">${labs}</div>`;
}
function rpRing(pct, size, col, second, label, val){
  size=size||72; const r=size/2-6, c=2*Math.PI*r, off=c*(1-Math.max(0,Math.min(1,pct/100)));
  return `<div class="rp-ring">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="6"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.10)" stroke-width="6"
        stroke-dasharray="${(c*0.5).toFixed(1)} ${c.toFixed(1)}" transform="rotate(90 ${size/2} ${size/2})"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${c.toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})">
        <animate attributeName="stroke-dashoffset" from="${c.toFixed(1)}" to="${off.toFixed(1)}" dur="1.1s" begin=".15s" fill="freeze"/></circle>
    </svg>
    <div class="v rp-num">${val!=null?val:pct+'%'}</div><div class="k">${label}</div></div>`;
}
function rpHeat(){
  const days=pvDayList(35);
  const max=Math.max(10, ...days.map(d=>d.min));
  const ramp=['rgba(255,255,255,.045)','rgba(127,184,160,.30)','rgba(217,164,65,.42)','rgba(231,189,106,.7)','rgba(255,226,160,.95)'];
  const cells=days.map((d,i)=>{
    const lvl=d.min===0?0:Math.min(4,1+Math.floor((d.min/max)*3.5));
    return `<i style="background:${ramp[lvl]};animation-delay:${(i*0.01).toFixed(2)}s" title="${pvLong(d.date.getTime())}: ${d.min} мин"></i>`;
  }).join('');
  return `<div class="rp-heat">${cells}</div>
    <div class="rp-heatx"><span>5 недель назад</span><span>${pvLong(days[17].date.getTime())}</span><span>сегодня</span></div>
    <div class="rp-legend"><span>меньше</span>${ramp.map(c=>`<i style="background:${c}"></i>`).join('')}<span>больше</span></div>`;
}
function rpCount(){
  document.querySelectorAll('.rp-count').forEach(el=>{
    const to=parseFloat(el.getAttribute('data-to'))||0, tail=el.getAttribute('data-tail')||'';
    const t0=performance.now(), dur=850;
    const step=now=>{ const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,3);
      el.textContent=Math.round(to*e)+tail; if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
/* ---------- отчёт ---------- */
function renderDashboard(){
  const p=DB.profile; if(!p) return;
  rpStyles();
  const period=pvPeriod(), M=pvMetrics(period), LS=pvLessons(), TK=pvTasks(), S=pvSubjects(), f=forecast();
  const lim=p.limitMin||45, over=M.today>=lim;
  const totalD=M.days.length? M.periodMin/M.days.length : 0;
  const lPct=LS.total?Math.round(LS.done/LS.total*100):0;
  const tPct=TK.total?Math.round(TK.done/TK.total*100):0;
  const fPct=TK.done?Math.round(TK.first/TK.done*100):0;
  const periodName=period==='7'?'неделю':(period==='30'?'месяц':'всё время');
  const periodTop=period==='7'?'неделя':(period==='30'?'месяц':'всё время');
  const daysWord=(n)=>{ const a=n%10, b=n%100; return (a===1&&b!==11)?'день':((a>=2&&a<=4&&(b<10||b>=20))?'дня':'дней'); };

  const recent=LS.list.slice().sort((a,b)=>{
    const ta=(a.rec&&a.rec.doneTs)||(a.ev&&a.ev.ts)||0, tb=(b.rec&&b.rec.doneTs)||(b.ev&&b.ev.ts)||0; return tb-ta;
  }).slice(0,5);
  const recentHtml=recent.length? recent.map(x=>{
    const ts=(x.rec&&x.rec.doneTs)||(x.ev&&x.ev.ts), steps=(x.rec&&x.rec.steps)||0, stars=(x.rec&&x.rec.stars)||0;
    const starsTxt=stars? ('<span style="color:#e7bd6a">'+'★'.repeat(Math.min(2,stars))+'</span>'):'';
    return `<div class="rp-line"><span class="d">${pvDate(ts)}</span>
      <span class="t">${x.L.ico||'📘'} ${esc(x.L.title)}</span>
      <span class="m">${steps?steps+' шаг.':''} ${starsTxt}</span>
      <button class="rp-link" onclick="openLessonView(${x.L.id})">открыть</button></div>`;
  }).join('') : `<div class="rp-line"><span class="t" style="color:var(--muted)">Пройденных уроков пока нет — начните с кнопки «Продолжить» на вкладке «Путь».</span></div>`;

  const wrongHtml=TK.wrong.slice(0,6).map(x=>{
    const ts=TK.lastTs.get(x.t.id)||x.st.ts, w=x.st.wrong||0, tr=x.st.tries||1;
    return `<div class="rp-line"><span class="d">${pvDate(ts)}</span>
      <span class="t">${esc(x.t.title)}</span>
      <span class="m"><span class="rp-chip">✕ ${w}</span> попыток ${tr}</span>
      <button class="rp-link" onclick="openTask('${x.t.id}','parent')">повторить</button></div>`;
  }).join('') || `<div class="rp-line"><span class="t" style="color:var(--glass)">Ошибок нет — отличный результат.</span></div>`;

  const stats=themeStats();
  const weak=stats.filter(x=>x.n>=2 && (x.done/x.n<0.6 || (x.done>0 && (x.tries/x.done)>2)))
    .sort((a,b)=>(b.wrong||0)-(a.wrong||0)).slice(0,3);

  const adv=[];
  if(M.active===0) adv.push('На этой неделе занятий не было — начните с сессии на 15 минут.');
  if(fPct&&fPct<60) adv.push('Каждая третья задача не с первой попытки: перед задачами проходите урок темы.');
  if(weak.length) adv.push('Разобрать темы: '+weak.map(w=>w.theme).slice(0,2).join(', ')+'.');
  if(M.periodMin>0&&totalD<15) adv.push('Средний день — '+Math.round(totalD)+' мин. Для устойчивого прогресса лучше 20–25 минут ежедневно.');
  if(lPct>=60&&tPct<40) adv.push('Уроки идут лучше задач: закрепите теорию практикой на вкладке «Путь».');
  if(tPct>=60) adv.push('Больше половины задач решено — можно взять задачи «уровня 3».');
  if(!adv.length) adv.push('Ритм ровный, ошибок мало. Добавьте одну задачу «уровня 2+» в день.');

  const subjRow=(name,col,done,total,extra)=>{
    const pct=total?Math.round(done/total*100):0;
    return `<div style="margin:10px 0 0">
      <div style="display:flex;justify-content:space-between;align-items:baseline;font-size:12px">
        <span style="color:var(--ivory)">${name}</span>
        <span class="rp-num" style="color:var(--muted);font-size:11px">${done} / ${total}${extra?' · '+extra:''}</span></div>
      <div class="rp-bar"><i style="width:${pct}%;background:linear-gradient(90deg,${col},rgba(255,255,255,.12))"></i></div></div>`;
  };

  const s=document.getElementById('screen');
  s.innerHTML=`<div class="rp-wrap">
  <div class="rp-kicker">кабинет родителя · отчёт о занятиях</div>
  <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:12px;margin-top:2px">
    <div><div class="rp-name"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${esc(p.color||'#d9a441')};border:1px solid rgba(255,255,255,.35);margin-right:7px;vertical-align:1px"></span>${esc(p.name)} · ${esc(p.klass)} класс</div>
      <div class="rp-sub">${rankName()} · ${DB.points} очков · серия ${DB.streak}${DB.streak>=3?' 🔥':''}</div></div>
    <div style="text-align:right"><div class="rp-kicker">всего</div>
      <div class="rp-num" style="font-size:15px;color:var(--ivory)">${pvMin(M.allMin)}</div></div>
  </div>

  <div class="rp-sec" style="margin-top:16px"><b>Период</b><span>${periodTop}</span><i></i></div>
  <div class="rp-seg">
    <button class="${period==='7'?'on':''}" onclick="pvSet('7')">неделя</button>
    <button class="${period==='30'?'on':''}" onclick="pvSet('30')">месяц</button>
    <button class="${period==='all'?'on':''}" onclick="pvSet('all')">всё время</button>
  </div>

  <div class="rp-sec"><b>Время</b><span>активных дней: ${M.active}</span><i></i></div>
  <div class="rp-card">
    <div class="rp-hero">
      <div><div class="rp-kicker">сегодня</div>
        <div><span class="big rp-num rp-count" data-to="${M.today}">0</span><span class="unit">мин</span></div>
        <div class="rp-sub">${over? 'лимит исчерпан — перерыв' : 'из '+lim+' мин по лимиту'}</div></div>
      <div class="side">
        <div><span>за ${periodName}: </span><b class="rp-num rp-count" data-to="${M.periodMin}">0</b> мин</div>
        <div><span>в среднем: </span><b class="rp-num">${Math.round(totalD)}</b> мин/день</div>
        <div><span>лучший день: </span><b class="rp-num">${M.best.min?pvMin(M.best.min):'—'}</b></div>
      </div>
    </div>
    ${rpChart(M.days, 318, 138)}
    <div class="rp-legend"><em><i style="background:#e7bd6a"></i>минуты занятий</em><em><i style="background:rgba(217,164,65,.5)"></i>среднее</em><em>точки — дни, нажмите для деталей</em></div>
  </div>

  <div class="rp-sec"><b>Нагрузка</b><span>задачи и шаги уроков</span><i></i></div>
  <div class="rp-card">
    ${rpBars(M.days)}
    <div class="rp-legend"><em><i style="background:#e7c277"></i>решённые задачи</em><em><i style="background:#7fb8a0"></i>шаги уроков</em></div>
  </div>

  <div class="rp-sec"><b>Прогресс</b><span>уроки · задачи · с первой попытки</span><i></i></div>
  <div class="rp-card"><div class="rp-rings">
    ${rpRing(lPct,72,'#7fb8a0',null,'уроки',LS.done+'/'+LS.total)}
    ${rpRing(tPct,72,'#d9a441',null,'задачи',TK.done+'/'+TK.total)}
    ${rpRing(fPct,72,'#7fd1ff',null,'без ошибок',fPct+'%')}
  </div>
  <div class="rp-bar" style="margin-top:12px"><i style="width:${tPct}%;background:linear-gradient(90deg,#d9a441,rgba(255,255,255,.12))"></i></div>
  <div class="rp-sub">решено ${TK.done} из ${TK.total} задач курса · в среднем ${TK.done?(TK.wrong.reduce((a,x)=>a+(x.st.tries||1),0)/Math.max(1,TK.done)).toFixed(1):'—'} попытки на задачу</div>
  </div>

  <div class="rp-sec"><b>По предметам</b><span>уроки и практика</span><i></i></div>
  <div class="rp-card">
    ${subjRow('Информатика · 5–6 класс','#7fd1ff',S.dInf,S.inf,'шагов '+S.sInf)}
    ${subjRow('Математика и олимпиадные','#d9a441',S.dMat,S.mat,'шагов '+S.sMat)}
    ${subjRow('Задачи на карте','#7fb8a0',S.tDone,S.tAll,'решено')}
  </div>

  <div class="rp-sec"><b>Карта занятий</b><span>цвет — время дня</span><i></i></div>
  <div class="rp-card">${rpHeat()}</div>

  <div class="rp-sec"><b>Что прошёл</b><span>последние уроки</span><i></i></div>
  <div class="rp-card">${recentHtml}</div>

  <div class="rp-sec"><b>Ошибки</b><span>${M.periodWrong} за ${periodName}</span><i></i></div>
  <div class="rp-card">
    ${wrongHtml}
    ${weak.length?`<div class="rp-sub" style="margin-top:9px">Слабые темы: ${weak.map(w=>esc(w.theme)+' ('+w.done+'/'+w.n+')').join(' · ')}</div>`:''}
  </div>

  <div class="rp-sec"><b>Готовность к ВсОШ</b><span>задачи уровня 2+</span><i></i></div>
  <div class="rp-card">
    <div class="rp-hero" style="align-items:center">
      <div><div class="rp-kicker">решено уровня 2+</div><div><span class="big rp-num rp-count" data-to="${f.pct||0}" data-tail="%">0</span></div></div>
      <div class="side"><div><span>среднее попыток: </span><b class="rp-num">${f.avgTry||'—'}</b></div>
      <div><span>уровень: </span><b>${['старт','база','рост','готов'][f.lvl||0]}</b></div></div>
    </div>
    <div class="rp-bar"><i style="width:${f.pct||0}%;background:linear-gradient(90deg,#7fb8a0,#e7bd6a)"></i></div>
    <div class="rp-quote"><b>совет наставника</b>${esc(f.txt)}</div>
    <div class="rp-quote g"><b>что делать дальше</b><ul class="rp-adv">${adv.slice(0,3).map(a=>'<li>'+esc(a)+'</li>').join('')}</ul></div>
    ${DB.tours&&DB.tours.length?`<div class="rp-sub" style="margin-top:9px">🏁 Последний тур: <b style="color:var(--brass)">${DB.tours[0].score}/${tourCount()}</b> за ${fmt(DB.tours[0].secs)} · лучший: ${Math.max(...DB.tours.map(t=>t.score))}/${tourCount()}</div>`:''}
  </div>

  <div class="rp-sec"><b>Лимит времени</b><span>${M.today} из ${lim} мин</span><i></i></div>
  <div class="rp-card">
    <div class="rp-bar"><i style="width:${Math.min(100,M.today/lim*100)}%;background:${over?'#e86a5a':'linear-gradient(90deg,#7fb8a0,#e7bd6a)'}"></i></div>
    <div style="display:flex;gap:8px;align-items:center;margin-top:10px">
      <input type="number" id="limIn" value="${lim}" min="10" max="240" style="width:76px;font-size:14px;padding:6px 8px;border:1px solid rgba(217,164,65,.25);border-radius:8px;background:#0c1812;color:var(--ivory);font-family:inherit">
      <button class="rp-link" onclick="setLimit()">сохранить лимит</button>
      <span class="rp-sub" style="margin-left:auto">${over?'перерыв ⏸':''}</span>
    </div>
  </div>

  <div class="rp-foot">
    <button onclick="pvDemo()">${DB.pvDemo?'выключить демо':'показать демо-данные'}</button>
    <button onclick="resetAll()">сбросить прогресс</button>
  </div>
  <div class="rp-note">${DB.pvDemo
    ? 'Сейчас показаны <b style="color:var(--brass)">демонстрационные</b> данные — прогресс ребёнка не изменён.'
    : 'Отчёт обновляется автоматически: время занятий, шаги уроков, решённые задачи и ошибки.'}</div>
  </div>`;
  requestAnimationFrame(rpCount);
  hud();
}
function setLimit(){ const v=parseInt(document.getElementById('limIn').value); if(v>=10&&v<=240){ DB.profile.limitMin=v; save(); toast('Лимит сохранён: '+v+' мин/день'); renderDashboard(); } }
function resetAll(){ if(!confirm('Сбросить прогресс ребёнка и профиль?')) return;
  DB=emptyState(); localStorage.removeItem(KEY); showNav(false); go('onboard'); }
/* ---------- демо-данные ---------- */
function pvDemo(){
  if(DB.pvDemo){ try{ const raw=sessionStorage.getItem('arh_demo_backup'); if(raw){ DB=Object.assign(emptyState(), JSON.parse(raw)); } }catch(e){}
    DB.pvDemo=0; save(); toast('Демо-данные выключены'); renderDashboard(); return; }
  try{ sessionStorage.setItem('arh_demo_backup', JSON.stringify(DB)); }catch(e){}
  const days={}, now=new Date();
  for(let i=29;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i);
    const k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    const skip=(i%7===3)||(i%11===5);
    const wave=Math.abs(Math.sin(i*1.7))*22+Math.abs(Math.cos(i*0.7))*12;
    const min=skip?0:Math.round(10+wave);
    const tasks=skip?0:Math.max(0,Math.round(min/11));
    days[k]={min:min,tasks:tasks,wrong:skip?0:Math.max(0,Math.round(tasks/3)),lessonSteps:skip?0:Math.round(min/3),lessons:(i%5===0&&!skip)?1:0};
  }
  DB.days=days; DB.totalMin=totalMinutes(); DB.pvDemo=1;
  DB.today={date:todayStr(), minutes:Math.max(18,(DB.days[dayKey()]||{}).min||18)};
  DB.days[dayKey()].min=DB.today.minutes;
  const lessons=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson!=='function'||isVisibleLesson(x)).slice(0,5);
  DB.lessons=DB.lessons||{};
  lessons.forEach((L,i)=>{ DB.lessons[L.id]={done:true,stars:(i%2)+1,tasks:[0],doneTs:Date.now()-(i+1)*86400000,steps:16+i*2}; });
  DB.events=DB.events||[];
  lessons.forEach((L,i)=>{ DB.events.push({ts:Date.now()-(i+1)*86400000,type:'lesson',id:L.id,title:L.title,stars:(i%2)+1,steps:16+i*2}); });
  const tks=(window.ARH_TASKS||[]).slice(0,9);
  DB.tasks=DB.tasks||{};
  tks.forEach((t,i)=>{ DB.tasks[t.id]={done:1,tries:1+(i%3),wrong:(i%4),hints:0,ts:Date.now()-(i%9)*86400000}; });
  DB.points=DB.points||256; DB.streak=DB.streak||5; DB.best=Math.max(DB.best||0,9);
  save(); toast('Показаны демо-данные'); renderDashboard();
}
