/* АРХИМЕД MVP · dashboard.js — родительский кабинет (премиальный дашборд) */
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
  const txt=lvl===3?'Высокая готовность: решает большинство задач уровня 2+ почти без ошибок — пора пробовать школьный этап ВсОШ и задачи «уровня 3».'
    : lvl===2?'Средняя готовность: половина задач уровня 2+ взята. Укрепи слабые темы (см. ниже) и добей серии без подсказок.'
    : lvl===1?'Начало пути: уверенно решаются базовые задачи. Продолжайте разборы приёмов в уроках «объясни → реши» — цель: задачи уровня 2 без подсказок.'
    : 'Только стартовали: пройдите 3–4 задачи с разбором, чтобы ребёнок почувствовал приёмы.';
  return {lvl, txt, pct:Math.round(pct*100), avgTry:+avgTry.toFixed(1)};
}
/* ---------- доступ родителя ---------- */
function parentOk(){ try{ return sessionStorage.getItem('arhimed_parent')==='1'; }catch(e){ return false; } }
function renderParentLock(){
  const s=document.getElementById('screen');
  s.innerHTML=`<div class="card" style="max-width:420px;margin:20px auto">
    <div style="text-align:center"><div style="font-size:38px">🔒</div>
      <h2 style="margin:6px 0">Кабинет родителя</h2>
      <div class="small" style="margin-bottom:10px">Раздел защищён паролем — здесь прогресс и настройки ребёнка.</div></div>
    <label style="font-size:12.5px;color:var(--muted)">Логин</label>
    <input class="gate-in" id="gateUser" placeholder="admin" autocomplete="off">
    <label style="font-size:12.5px;color:var(--muted)">Пароль</label>
    <input class="gate-in" id="gatePass" type="password" placeholder="•••••">
    <button class="btn" style="width:100%;margin-top:12px" onclick="tryParent()">Войти</button>
    <div class="small" style="margin-top:8px">Доступ по умолчанию: admin / admin</div>
  </div>`;
  const p=document.getElementById('gatePass'); if(p){ p.focus(); p.addEventListener('keydown',e=>{ if(e.key==='Enter') tryParent(); }); }
  hud();
}
function tryParent(){
  const u=document.getElementById('gateUser').value.trim().toLowerCase();
  const p=document.getElementById('gatePass').value;
  if(u==='admin'&&p==='admin'){
    try{ sessionStorage.setItem('arhimed_parent','1'); }catch(e){}
    toast('Добро пожаловать!'); renderDashboard();
  } else { toast('Неверный логин или пароль'); const el=document.getElementById('gatePass'); if(el) el.value=''; }
}
/* ---------- стили дашборда ---------- */
function pvStyles(){
  if(document.getElementById('pvCss')) return;
  const st=document.createElement('style'); st.id='pvCss';
  st.textContent=`
  .pv-bar{display:flex;gap:6px;margin:10px 0 4px}
  .pv-bar button{flex:1;background:linear-gradient(170deg,var(--card),var(--card2));border:1px solid var(--hairline);
    color:var(--muted);font-family:inherit;font-size:12px;padding:8px 0;border-radius:10px;transition:.18s}
  .pv-bar button.on{color:#101f18;background:linear-gradient(170deg,var(--brass),var(--brass-d));border-color:var(--brass);font-weight:bold}
  .pv-kpi{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}
  .pv-k{position:relative;overflow:hidden;border-radius:14px;padding:11px 12px;
    background:linear-gradient(160deg,rgba(217,164,65,.14),rgba(19,37,28,.9) 55%);border:1px solid var(--hairline)}
  .pv-k:before{content:'';position:absolute;left:-30%;top:-70%;width:80%;height:200%;transform:rotate(18deg);
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent);animation:pvShim 3.6s linear infinite}
  .pv-k .t{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .pv-k .v{font-size:22px;color:var(--brass);line-height:1.15;margin-top:2px}
  .pv-k .s{font-size:11px;color:var(--muted)}
  @keyframes pvShim{0%{left:-40%}60%{left:120%}100%{left:120%}}
  .pv-card{position:relative;border-radius:16px;padding:12px;margin:10px 0;overflow:hidden;
    background:linear-gradient(170deg,var(--card),var(--card2));border:1px solid var(--hairline);
    box-shadow:0 10px 26px -18px rgba(0,0,0,.9) inset}
  .pv-head{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin-bottom:6px}
  .pv-head b{font-size:13px;color:var(--ivory)}
  .pv-head span{font-size:11px;color:var(--muted)}
  .pv-chart{display:block;width:100%;height:auto}
  .pv-dot-move{filter:drop-shadow(0 0 6px rgba(217,164,65,.9))}
  .pv-bars{display:flex;align-items:flex-end;gap:3px;height:74px;margin-top:6px}
  .pv-bars .b{flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:2px}
  .pv-bars .b i{display:block;width:100%;border-radius:4px 4px 2px 2px;transform-origin:bottom;
    background:linear-gradient(180deg,var(--glow),rgba(127,209,255,.25));animation:pvGrow .7s cubic-bezier(.2,.9,.25,1) both}
  .pv-bars .b i.g{background:linear-gradient(180deg,var(--brass),rgba(217,164,65,.25))}
  .pv-bars .b em{font-size:9px;color:var(--muted);font-style:normal}
  @keyframes pvGrow{from{transform:scaleY(.02);opacity:.2}to{transform:scaleY(1);opacity:1}}
  .pv-rings{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:4px;text-align:center}
  .pv-ring{position:relative}
  .pv-ring svg{display:block;margin:0 auto}
  .pv-ring .num{position:absolute;left:0;right:0;top:26px;font-size:15px;color:var(--brass)}
  .pv-ring .cap{font-size:10.5px;color:var(--muted);margin-top:2px}
  .pv-heat{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,10px);gap:3px;margin-top:8px;overflow-x:auto;padding-bottom:2px}
  .pv-heat i{width:10px;height:10px;border-radius:3px;background:rgba(255,255,255,.05);animation:pvFade .5s ease both}
  @keyframes pvFade{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
  .pv-legend{display:flex;align-items:center;gap:5px;font-size:10.5px;color:var(--muted);margin-top:6px}
  .pv-legend i{width:10px;height:10px;border-radius:3px;display:inline-block}
  .pv-row{display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px dashed rgba(217,164,65,.14);font-size:12.5px}
  .pv-row:last-child{border-bottom:none}
  .pv-row .ttl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .pv-row .meta{font-size:11px;color:var(--muted);white-space:nowrap}
  .pv-row .go{background:none;border:1px solid var(--hairline);color:var(--brass);border-radius:8px;font-family:inherit;font-size:11px;padding:4px 8px}
  .pv-badge{display:inline-block;min-width:20px;text-align:center;border-radius:6px;padding:2px 5px;font-size:11px}
  .pv-adv{border-left:3px solid var(--brass);padding:8px 10px;margin-top:6px;border-radius:8px;
    background:linear-gradient(90deg,rgba(217,164,65,.12),transparent);font-size:12.5px;line-height:1.5;color:#cfd8ea}
  .pv-lbl{font-size:10px;color:var(--muted)}
  .pv-grid2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .pv-spark{display:block;width:100%;height:26px;margin-top:4px}
  `;
  document.head.appendChild(st);
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
  const days=pvDayList(period==='all'?Math.min(90,pvAllDays().length||1):(period==='30'?30:7));
  const sum=k=>days.reduce((s,d)=>s+(d[k]||0),0);
  const active=days.filter(d=>d.min>0||d.tasks>0||d.steps>0).length;
  const bestD=days.slice().sort((a,b)=>b.min-a.min)[0]||{min:0,key:'—',dnum:''};
  const allMin=totalMinutes();
  return {days, today, sum, active, bestD, allMin,
    periodMin:sum('min'), periodTasks:sum('tasks'), periodWrong:sum('wrong'), periodSteps:sum('steps'), periodLessons:sum('lessons')};
}
function pvLessons(){
  const L=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson==='function'?isVisibleLesson(x):!x.hidden);
  const done=L.filter(x=>DB.lessons&&DB.lessons[x.id]&&DB.lessons[x.id].done);
  const t1=DB.events?DB.events.filter(e=>e.type==='lesson'):[];
  const last=new Map(); t1.forEach(e=>last.set(e.id,e));
  return {total:L.length, done:done.length, list:done.map(x=>({L:x, rec:DB.lessons[x.id], ev:last.get(x.id)}))};
}
function pvTasks(){
  const all=window.ARH_TASKS||[];
  const done=all.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done);
  const firstTry=done.filter(t=>(DB.tasks[t.id].tries||1)<=1).length;
  const wrongList=all.filter(t=>DB.tasks[t.id]&&(DB.tasks[t.id].wrong||0)>0)
    .map(t=>({t, st:DB.tasks[t.id]})).sort((a,b)=>(b.st.wrong||0)-(a.st.wrong||0));
  const lastTs=new Map();
  (DB.events||[]).forEach(e=>{ if(e.type==='wrong'||e.type==='task') lastTs.set(e.id,e.ts); });
  return {total:all.length, done:done.length, firstTry, wrongList, lastTs};
}
function pvFmtMin(m){ const h=Math.floor(m/60), r=m%60; return h? (h+' ч '+(r?r+' мин':'')) : (r+' мин'); }
function pvFmtDate(ts){ if(!ts) return ''; const d=new Date(ts); return d.getDate()+'.'+(d.getMonth()+1); }
function pvScore(ts){ return (ts?new Date(ts):new Date()).toLocaleDateString('ru-RU'); }
/* ---------- графики ---------- */
function pvAreaChart(days, w, h){
  const pad={l:30,r:10,t:14,b:20};
  const W=w-pad.l-pad.r, H=h-pad.t-pad.b;
  const max=Math.max(10, ...days.map(d=>d.min));
  const step=days.length>1? W/(days.length-1) : W;
  const P=days.map((d,i)=>({x:pad.l+i*step, y:pad.t+H-(d.min/max)*H, d}));
  /* сглаженная кривая */
  let line='M'+P[0].x.toFixed(1)+' '+P[0].y.toFixed(1);
  for(let i=0;i<P.length-1;i++){
    const a=P[i], b=P[i+1], cx=(a.x+b.x)/2;
    line+=' C'+cx.toFixed(1)+' '+a.y.toFixed(1)+' '+cx.toFixed(1)+' '+b.y.toFixed(1)+' '+b.x.toFixed(1)+' '+b.y.toFixed(1);
  }
  const area=line+` L${P[P.length-1].x.toFixed(1)} ${(pad.t+H).toFixed(1)} L${P[0].x.toFixed(1)} ${(pad.t+H).toFixed(1)} Z`;
  const grid=[0,.5,1].map(f=>{ const y=pad.t+H-f*H;
    return `<line x1="${pad.l}" y1="${y.toFixed(1)}" x2="${w-pad.r}" y2="${y.toFixed(1)}" stroke="rgba(217,164,65,.14)" stroke-width="1"/>
      <text x="4" y="${(y+3).toFixed(1)}" font-size="8.5" fill="#8fa08f">${Math.round(max*f)}</text>`; }).join('');
  const todayIdx=P.length-1;
  const dots=P.map((p,i)=>{
    const on=i===todayIdx;
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${on?4:2.6}" fill="${on?'#d9a441':'#7fb8a0'}" opacity="${on?1:.85}">
      <title>${pvScore(p.d.date.getTime())}: ${p.d.min} мин</title></circle>`;
  }).join('');
  const labels=days.map((d,i)=>{
    const every=days.length>14?7:(days.length>9?3:1);
    if(i%every!==0 && i!==todayIdx) return '';
    return `<text x="${P[i].x.toFixed(1)}" y="${h-6}" font-size="8.5" text-anchor="middle" fill="#8fa08f">${d.dnum}</text>`;
  }).join('');
  const path=`M${P[0].x.toFixed(1)} ${P[0].y.toFixed(1)} `+P.slice(1).map(p=>'L'+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
  const movPath=P.map((p,i)=>(i?'L':'M')+p.x.toFixed(1)+' '+p.y.toFixed(1)).join(' ');
  return `<svg class="pv-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Время занятий по дням">
    <defs>
      <linearGradient id="pvArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d9a441" stop-opacity=".55"/>
        <stop offset="1" stop-color="#d9a441" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="pvLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#7fb8a0"/><stop offset="1" stop-color="#ffd76a"/>
      </linearGradient>
    </defs>
    ${grid}
    <path d="${area}" fill="url(#pvArea)" opacity="0">
      <animate attributeName="opacity" values="0;.95" dur="1.1s" fill="freeze" begin=".15s"/></path>
    <path d="${line}" fill="none" stroke="url(#pvLine)" stroke-width="2.4" stroke-linecap="round"
      stroke-dasharray="1200" stroke-dashoffset="1200">
      <animate attributeName="stroke-dashoffset" values="1200;0" dur="1.4s" fill="freeze"/></path>
    ${dots}${labels}
    <circle class="pv-dot-move" r="4.6" fill="#fff7e0">
      <animateMotion dur="6s" repeatCount="indefinite" path="${movPath}"/></circle>
    <circle cx="${P[todayIdx].x.toFixed(1)}" cy="${P[todayIdx].y.toFixed(1)}" r="7" fill="none" stroke="#d9a441" stroke-width="1.4" opacity=".8">
      <animate attributeName="r" values="6;13;6" dur="2.2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values=".85;0;.85" dur="2.2s" repeatCount="indefinite"/></circle>
  </svg>`;
}
function pvBars(days, h){
  const max=Math.max(1, ...days.map(d=>d.tasks+d.steps/6));
  return `<div class="pv-bars">`+days.map((d,i)=>{
    const v=d.tasks+d.steps/6, hh=Math.max(3, Math.round(v/max*(h||64)));
    const gold=d.tasks>0;
    const every=days.length>14?7:(days.length>9?3:1);
    const lab=(i%every===0||i===days.length-1)?d.dnum:'';
    return `<div class="b"><i class="${gold?'g':''}" style="height:${hh}px;animation-delay:${(i*0.03).toFixed(2)}s" title="${pvScore(d.date.getTime())}: задач ${d.tasks}, шагов ${d.steps}"></i><em>${lab}</em></div>`;
  }).join('')+`</div>`;
}
function pvRing(pct, size, col, label, val){
  size=size||74; const r=(size/2)-6, c=2*Math.PI*r, off=c*(1-Math.max(0,Math.min(1,pct/100)));
  return `<div class="pv-ring">
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="7"/>
      <circle class="pv-rg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${c.toFixed(1)}" data-off="${off.toFixed(1)}" transform="rotate(-90 ${size/2} ${size/2})">
        <animate attributeName="stroke-dashoffset" from="${c.toFixed(1)}" to="${off.toFixed(1)}" dur="1.2s" fill="freeze"/>
      </circle>
    </svg>
    <div class="num">${val!=null?val:pct+'%'}</div>
    <div class="cap">${label}</div></div>`;
}
function pvHeat(){
  const days=pvDayList(35);
  const max=Math.max(10, ...days.map(d=>d.min));
  const cells=days.map((d,i)=>{
    const lvl=d.min===0?0:Math.min(4,1+Math.floor((d.min/max)*3.4));
    const col=['rgba(255,255,255,.05)','rgba(127,184,160,.35)','rgba(127,184,160,.6)','rgba(217,164,65,.65)','rgba(255,215,106,.95)'][lvl];
    return `<i style="background:${col};animation-delay:${(i*0.012).toFixed(2)}s" title="${pvScore(d.date.getTime())}: ${d.min} мин, задач ${d.tasks}"></i>`;
  }).join('');
  return `<div class="pv-heat">${cells}</div>
  <div class="pv-legend"><span>меньше</span>
    ${['rgba(255,255,255,.05)','rgba(127,184,160,.35)','rgba(127,184,160,.6)','rgba(217,164,65,.65)','rgba(255,215,106,.95)'].map(c=>`<i style="background:${c}"></i>`).join('')}
    <span>больше</span><span style="margin-left:auto">5 недель занятий</span></div>`;
}
function pvSubjects(){
  const L=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson!=='function'||isVisibleLesson(x));
  const isInf=x=>/Информатика/i.test(x.src||'');
  const inf=L.filter(isInf), mat=L.filter(x=>!isInf(x));
  const doneInf=inf.filter(x=>DB.lessons&&DB.lessons[x.id]&&DB.lessons[x.id].done).length;
  const doneMat=mat.filter(x=>DB.lessons&&DB.lessons[x.id]&&DB.lessons[x.id].done).length;
  const ev=DB.events||[];
  const stepsK=id=>ev.filter(e=>e.type==='step'&&e.id===id).length;
  const stepsInf=inf.reduce((a,x)=>a+stepsK(x.id),0), stepsMat=mat.reduce((a,x)=>a+stepsK(x.id),0);
  const all=window.ARH_TASKS||[];
  const tasksDone=all.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const maxL=Math.max(1,inf.length,mat.length);
  return {inf:inf.length, mat:mat.length, doneInf, doneMat, stepsInf, stepsMat, tasksDone, tasksAll:all.length, maxL};
}
function pvSubjCard(){
  const S=pvSubjects();
  const row=(name,col,done,total,ok,extra)=>{
    const pct=total?Math.round(done/total*100):0;
    return `<div style="margin:8px 0">
      <div style="display:flex;justify-content:space-between;font-size:12px"><span>${name}</span><span class="pv-lbl">${ok} из ${total}${extra?' · '+extra:''}</span></div>
      <div class="bar" style="margin-top:4px"><i style="width:${pct}%;background:linear-gradient(90deg,${col},rgba(255,255,255,.15));transition:width .9s cubic-bezier(.2,.9,.25,1)"></i></div></div>`;
  };
  return `<div class="pv-card">
    <div class="pv-head"><b>📚 По предметам</b><span>уроки и практика</span></div>
    ${row('Информатика · 5–6 класс','#7fd1ff',S.doneInf,S.inf,S.doneInf,'шагов '+S.stepsInf)}
    ${row('Математика и олимпиадные','#d9a441',S.doneMat,S.mat,S.doneMat,'шагов '+S.stepsMat)}
    ${row('Задачи на карте','#7fb8a0',S.tasksDone,S.tasksAll,S.tasksDone,'решено')}
  </div>`;
}
function pvKpi(t, v, s, sub){
  return `<div class="pv-k"><div class="t">${t}</div><div class="v" data-count="${v}">0</div><div class="s">${s||''}</div>${sub?`<div class="pv-lbl">${sub}</div>`:''}</div>`;
}
function pvCountUp(){
  document.querySelectorAll('.pv-k .v[data-count]').forEach(el=>{
    const to=parseFloat(el.getAttribute('data-count'))||0, sfx=el.getAttribute('data-suffix')||'';
    const t0=performance.now(), dur=900;
    const step=now=>{ const p=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-p,3);
      el.textContent=Math.round(to*e)+(el.getAttribute('data-plain')?'':'')+(el.getAttribute('data-tail')||'');
      if(p<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
/* ---------- главный экран кабинета ---------- */
function renderDashboard(){
  const p=DB.profile; if(!p){ return; }
  pvStyles();
  const period=pvPeriod();
  const M=pvMetrics(period);
  const LS=pvLessons(), TK=pvTasks();
  const f=forecast();
  const today=M.today, lim=p.limitMin||45, over=today>=lim;
  const lessonPct=LS.total? Math.round(LS.done/LS.total*100):0;
  const taskPct=TK.total? Math.round(TK.done/TK.total*100):0;
  const firstPct=TK.done? Math.round(TK.firstTry/TK.done*100):0;
  const avgDay=M.days.length? Math.round(M.periodMin/M.days.length):0;

  /* «что прошёл» — последние уроки */
  const recent=LS.list.slice().sort((a,b)=>{
    const ta=(a.rec&&a.rec.doneTs)||(a.ev&&a.ev.ts)||0, tb=(b.rec&&b.rec.doneTs)||(b.ev&&b.ev.ts)||0; return tb-ta;
  }).slice(0,6);
  const recentHtml=recent.length? recent.map(x=>{
    const ts=((x.rec&&x.rec.doneTs)||(x.ev&&x.ev.ts));
    const steps=(x.rec&&x.rec.steps)||0;
    return `<div class="pv-row"><span class="ttl">${x.L.ico||'📘'} ${esc(x.L.title)}</span>
      <span class="meta">${ts?pvScore(ts):''}${steps?` · ${steps} шаг(ов)`:''} · ⭐${(x.rec&&x.rec.stars)||0}</span>
      <button class="go" onclick="openLessonView(${x.L.id})">открыть</button></div>`;
  }).join('') : `<div class="small">Пока нет пройденных уроков. Начните с «Продолжить» на вкладке «Путь».</div>`;

  /* ошибки */
  const wrongHtml=TK.wrongList.slice(0,7).map(x=>{
    const ts=(TK.lastTs.get(x.t.id)||x.st.ts);
    const w=x.st.wrong||0, tr=x.st.tries||1;
    const col=w>=3?'var(--danger)':(w>=2?'var(--amber)':'var(--muted)');
    return `<div class="pv-row"><span class="ttl">${esc(x.t.title)}</span>
      <span class="meta"><span class="pv-badge" style="background:rgba(232,106,90,.16);color:${col}">✕${w}</span>
        · попыток ${tr}${ts?` · ${pvScore(ts)}`:''}</span>
      <button class="go" onclick="openTask('${x.t.id}','parent')">повторить</button></div>`;
  }).join('') || `<div class="small">Ошибок нет — отличный результат! 👏</div>`;

  /* слабые темы */
  const stats=themeStats();
  const weak=stats.filter(x=>x.n>=2 && (x.done/x.n<0.6 || (x.done>0 && (x.tries/x.done)>2)))
    .sort((a,b)=>(b.wrong||0)-(a.wrong||0)).slice(0,4);

  /* советы */
  const adv=[];
  if(M.active===0) adv.push('На этой неделе занятий не было. Начните с короткой сессии 15 минут — «Путь» → «Продолжить».');
  if(firstPct&&firstPct<60) adv.push('Много повторных попыток ('+(100-firstPct)+'% задач не с первой попытки). Перед задачами проходите урок темы — там разбирается приём.');
  if(weak.length) adv.push('Разобрать темы: '+weak.map(w=>w.theme).slice(0,2).join(', ')+'.');
  if(M.periodMin>0&&avgDay<15) adv.push('В среднем '+avgDay+' мин в день — коротко. Для устойчивого прогресса лучше 20–25 минут ежедневно.');
  if(lessonPct>=60&&taskPct<40) adv.push('Уроки идут лучше задач: закрепите теорию практикой на вкладке «Путь».');
  if(taskPct>=60) adv.push('Больше половины задач решено — можно взяться за задачи «уровня 3» и олимпиадные.');
  if(!adv.length) adv.push('Ритм ровный, ошибок мало. Продолжайте в том же темпе и добавьте одну задачу «уровня 2+» в день.');

  const s=document.getElementById('screen');
  s.innerHTML=`
  <div class="pv-card" style="margin-top:6px">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <div>
        <div style="font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)">кабинет родителя</div>
        <div style="font-size:19px;color:var(--brass)">🛡 ${esc(p.name)} · ${esc(p.klass)} класс</div>
        <div class="small">${rankName()} · очки ${DB.points} · серия ${DB.streak}${DB.streak>=3?' 🔥':''}</div>
      </div>
      <div style="text-align:right">
        <div class="chip">всего занятий: <b>${pvFmtMin(M.allMin)}</b></div>
        <div class="small" style="margin-top:4px">${DB.duel?`⚔ рейтинг ${DB.duel.rating} · побед ${DB.duel.wins}/${DB.duel.games}`:'&nbsp;'}</div>
      </div>
    </div>
  </div>

  <div class="pv-bar">
    <button class="${period==='7'?'on':''}" onclick="pvSet('7')">7 дней</button>
    <button class="${period==='30'?'on':''}" onclick="pvSet('30')">30 дней</button>
    <button class="${period==='all'?'on':''}" onclick="pvSet('all')">всё время</button>
  </div>

  <div class="pv-kpi">
    ${pvKpi('сегодня', today, 'минут', over?'лимит достигнут ⏸':'из '+lim+' мин')}
    ${pvKpi('за период', M.periodMin, 'минут', 'активных дней: '+M.active)}
    ${pvKpi('решено задач', M.periodTasks, 'за период', 'всего: '+TK.done+' из '+TK.total)}
    ${pvKpi('ошибок', M.periodWrong, 'за период', M.periodWrong?('попыток: '+TK.wrongList.reduce((a,x)=>a+(x.st.tries||0),0)):'чисто')}
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>Время занятий</b><span>${period==='7'?'последние 7 дней':(period==='30'?'последние 30 дней':'всё время')} · максимум ${Math.max(10,...M.days.map(d=>d.min))} мин</span></div>
    ${pvAreaChart(M.days, 318, 132)}
    <div class="pv-grid2" style="margin-top:6px">
      <div><div class="pv-lbl">среднее в день</div><div style="font-size:14px;color:var(--glass)">${pvFmtMin(avgDay)}</div></div>
      <div><div class="pv-lbl">лучший день</div><div style="font-size:14px;color:var(--brass)">${M.bestD.min?pvFmtMin(M.bestD.min)+' · '+M.bestD.dnum:'—'}</div></div>
    </div>
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>Что делал по дням</b><span>задачи (золотые) и шаги уроков (голубые)</span></div>
    ${pvBars(M.days, 64)}
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>Прогресс</b><span>уроки · задачи · с первой попытки</span></div>
    <div class="pv-rings">
      ${pvRing(lessonPct,74,'#7fb8a0','уроки',LS.done+'/'+LS.total)}
      ${pvRing(taskPct,74,'#d9a441','задачи',TK.done+'/'+TK.total)}
      ${pvRing(firstPct,74,'#7fd1ff','с 1-й попытки',firstPct+'%')}
    </div>
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>Карта активности</b><span>цвет = время в этот день</span></div>
    ${pvHeat()}
  </div>

  ${pvSubjCard()}

  <div class="pv-card">
    <div class="pv-head"><b>📖 Что прошёл</b><span>последние уроки</span></div>
    ${recentHtml}
  </div>

  <div class="pv-card" style="border-color:rgba(232,106,90,.35)">
    <div class="pv-head"><b style="color:#e89a8f">✕ Ошибки и трудные места</b><span>всего ошибок: ${M.periodWrong||0}</span></div>
    ${wrongHtml}
    ${weak.length?`<div class="small" style="margin-top:8px">Слабые темы: ${weak.map(w=>esc(w.theme)+' ('+w.done+'/'+w.n+')').join(' · ')}</div>`:''}
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>🔮 Прогноз: ВсОШ, школьный этап</b><span>задачи уровня 2+</span></div>
    <div class="bar" style="margin:2px 0 6px"><i style="width:${f.pct||0}%"></i></div>
    <div class="small">решено задач уровня 2+: <b style="color:var(--amber)">${f.pct||0}%</b> · среднее попыток на задачу: ${f.avgTry||'—'}</div>
    <div class="pv-adv"><b style="color:var(--brass)">◈ совет наставника</b><br>${esc(f.txt)}</div>
    ${adv.length?`<div class="pv-adv" style="border-color:var(--glass);background:linear-gradient(90deg,rgba(127,184,160,.12),transparent)"><b style="color:var(--glass)">◈ что делать дальше</b><br>${adv.slice(0,3).map(a=>'• '+esc(a)).join('<br>')}</div>`:''}
    ${DB.tours&&DB.tours.length?`<div class="small" style="margin-top:6px">🏁 Последний тур: <b style="color:var(--amber)">${DB.tours[0].score}/${tourCount()}</b> за ${fmt(DB.tours[0].secs)} · лучший: ${Math.max(...DB.tours.map(t=>t.score))}/${tourCount()}</div>`:''}
  </div>

  <div class="pv-card">
    <div class="pv-head"><b>⏰ Лимит на сегодня</b><span>${today} из ${lim} мин</span></div>
    <div class="bar"><i style="width:${Math.min(100,today/lim*100)}%;background:${over?'var(--danger)':'var(--glass)'}"></i></div>
    <div style="display:flex;gap:6px;align-items:center;margin-top:8px">
      <input type="number" id="limIn" value="${lim}" min="10" max="240" style="width:80px;font-size:14px;padding:6px 8px;border:2px solid var(--hairline);border-radius:8px;background:#0d1a13;color:var(--ivory)">
      <button class="btn ghost" onclick="setLimit()">Сохранить</button>
      <span class="small">${over?'лимит достигнут — пора на перерыв ⏸':''}</span>
    </div>
  </div>

  <div style="display:flex;gap:8px;margin-top:4px">
    <button class="btn ghost" style="flex:1" onclick="pvDemo()">${DB.pvDemo?'выключить демо':'показать демо-данные'}</button>
    <button class="btn ghost" style="flex:1;color:var(--danger);border-color:rgba(232,106,90,.5)" onclick="resetAll()">↺ Сбросить прогресс</button>
  </div>
  <div class="small" style="margin:8px 2px 20px">${DB.pvDemo?'Сейчас показаны <b>демонстрационные</b> данные — они не влияют на прогресс ребёнка.':'Данные обновляются автоматически: время, шаги уроков, решённые задачи и ошибки.'}</div>`;
  /* анимация чисел и колец */
  requestAnimationFrame(()=>{
    pvCountUp();
    document.querySelectorAll('.pv-rg').forEach(el=>{ const off=el.getAttribute('data-off'); if(off) el.setAttribute('stroke-dashoffset',off); });
  });
  hud();
}
function setLimit(){ const v=parseInt(document.getElementById('limIn').value); if(v>=10&&v<=240){ DB.profile.limitMin=v; save(); toast('Лимит сохранён: '+v+' мин/день'); renderDashboard(); } }
function resetAll(){ if(!confirm('Сбросить прогресс ребёнка и профиль?')) return;
  DB=emptyState(); localStorage.removeItem(KEY); showNav(false); go('onboard'); }
/* ---------- демо-данные для показа ---------- */
function pvDemo(){
  if(DB.pvDemo){ try{ const raw=sessionStorage.getItem('arh_demo_backup'); if(raw){ DB=Object.assign(emptyState(), JSON.parse(raw)); } }catch(e){}
    DB.pvDemo=0; save(); toast('Демо-данные выключены'); renderDashboard(); return; }
  try{ sessionStorage.setItem('arh_demo_backup', JSON.stringify(DB)); }catch(e){}
  const days={}, now=new Date();
  for(let i=29;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i);
    const k=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    const skip=(i%7===3)||(i%11===5);
    const min=skip?0:(12+Math.round(Math.abs(Math.sin(i*1.7))*33));
    const tasks=skip?0:Math.max(0,Math.round(min/12));
    days[k]={min:min, tasks:tasks, wrong:skip?0:Math.max(0,Math.round(tasks/3)), lessonSteps:skip?0:Math.round(min/3), lessons:(i%5===0&&!skip)?1:0};
  }
  DB.days=days; DB.totalMin=totalMinutes(); DB.pvDemo=1;
  DB.today={date:todayStr(), minutes:Math.max(12, (DB.days[dayKey()]||{}).min||12)};
  DB.days[dayKey()].min=DB.today.minutes;
  DB.days[dayKey()].tasks=Math.max(2,(DB.days[dayKey()].tasks||0));
  const lessons=window.ARH_LESSONS.filter(x=>typeof isVisibleLesson!=='function'||isVisibleLesson(x)).slice(0,6);
  DB.lessons=DB.lessons||{};
  lessons.forEach((L,i)=>{ DB.lessons[L.id]={done:true, stars:(i%2)+1, tasks:[0], doneTs:Date.now()-(i+1)*86400000, steps:18+i}; });
  DB.events=DB.events||[];
  lessons.forEach((L,i)=>{ DB.events.push({ts:Date.now()-(i+1)*86400000, type:'lesson', id:L.id, title:L.title, stars:(i%2)+1, steps:18+i}); });
  const tks=(window.ARH_TASKS||[]).slice(0,10);
  DB.tasks=DB.tasks||{};
  tks.forEach((t,i)=>{ DB.tasks[t.id]={done:1, tries:1+(i%3), wrong:(i%4), hints:0, ts:Date.now()-(i%9)*86400000}; });
  DB.points=DB.points||248; DB.streak=DB.streak||4; DB.best=Math.max(DB.best||0,7);
  save(); toast('Показаны демо-данные'); renderDashboard();
}
