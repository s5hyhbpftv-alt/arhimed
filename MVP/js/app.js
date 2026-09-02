/* АРХИМЕД MVP · app.js — экраны, навигация, онбординг */
'use strict';
const UI = { tab:'path', backTab:'path', islName:null };

function init(){
  document.querySelectorAll('#navBar button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
  window.addEventListener('beforeunload', save);
  setInterval(()=>{ DB.today.minutes=Math.min(600,Math.max(DB.today.minutes,Math.round((Date.now()-DB.sessionStart)/60000))); save(); hud(); }, 60000);
  if(!DB.profile){ showNav(false); go('onboard'); }
  else { showNav(true); go('path'); }
}
function showNav(on){ document.getElementById('navBar').style.display = on?'flex':'none'; }
function setTab(t){
  document.querySelectorAll('#navBar button').forEach(b=>b.classList.toggle('active', b.dataset.tab===t));
}
function go(target){
  if(target==='onboard'){ setTab(''); renderOnboard(); return; }
  if(target==='path'){ setTab('path'); renderPath(); return; }
  if(target==='library'){ setTab('library'); renderLibrary(); return; }
  if(target==='parent'){ setTab('parent');
    if(typeof parentOk==='function'&&parentOk()) renderDashboard();
    else if(typeof renderParentLock==='function') renderParentLock();
    else renderDashboard();
    return; }
  if(target==='book'){ setTab('book'); renderBookList(); return; }
  if(target==='legend'){ setTab(''); renderLegend(); return; }
  if(target==='tour'){ setTab('tour'); renderTourScreen(); return; }
  if(target.startsWith('lesson-')){ setTab(''); openLessonView(parseInt(target.slice(7))); return; }
  if(target.startsWith('island-')){ setTab(''); UI.islName=decodeURIComponent(target.slice(7)); renderIsland(UI.islName); return; }
  if(target.startsWith('task-')){ openTask(target.slice(5), UI.islName? 'island-'+UI.islName : 'path'); return; }
}
function hud(){
  if(!DB.profile){ return; }
  document.getElementById('hName').textContent=DB.profile.name||'';
  document.getElementById('hPoints').textContent=DB.points;
  document.getElementById('hStreak').textContent=DB.streak;
  document.getElementById('hRank').textContent=rankName();
  const lim=DB.profile.limitMin||45, now=DB.today.minutes||0;
  document.getElementById('hdrSub').textContent = now>=lim ? `⏰ сегодня лимит (${now}/${lim} мин)` : 'Острова Познания · MVP';
}
/* ---------- ОНБОРДИНГ ---------- */
function renderOnboard(){
  const s=document.getElementById('screen');
  s.innerHTML=`<div class="onboard">
    <div class="card" style="text-align:center">
      <div style="font-size:44px">🏛</div>
      <h2 style="margin:6px 0">Добро пожаловать в АРХИМЕД!</h2>
      <div class="arch"><span class="who">◈ Архимед</span>
        «Назови себя, Исследователь. Острова Познания ждут — а я объясню каждый приём перед тем, как дать тебе задачу».</div>
      <label>Имя героя</label><input id="obName" maxlength="20" placeholder="Как тебя зовут?">
      <label>Класс</label>
      <select id="obClass"><option>5–6</option><option selected>7</option><option>8+</option></select>
      <label>Уровень</label>
      <select id="obLevel"><option value="novice">🌱 Новичок — объясняй побольше</option><option value="pro">⚡ Уже решал олимпиады</option></select>
      <label>Цвет хитона</label>
      <div class="swatches">${COLORS.map((c,i)=>`<div class="sw ${i===0?'sel':''}" style="background:${c}" data-c="${c}" onclick="pickCol(this)"></div>`).join('')}</div>
      <button class="btn" style="width:100%" onclick="finishOnboard()">В путь →</button>
    </div></div>`;
}
let chosenCol=COLORS[0];
function pickCol(el){ chosenCol=el.dataset.c; document.querySelectorAll('.sw').forEach(x=>x.classList.toggle('sel',x===el)); }
function finishOnboard(){
  const name=document.getElementById('obName').value.trim();
  if(!name){ toast('Архимед ждёт твоё имя!'); return; }
  DB.profile={ name, color:chosenCol,
    klass:document.getElementById('obClass').value,
    level:document.getElementById('obLevel').value,
    limitMin:45, createdAt:Date.now() };
  DB.sessionStart=Date.now(); save(); showNav(true); go('path'); toast('Добро пожаловать, '+name+'!');
}
/* ---------- ПУТЬ ---------- */
const ISLANDS=[
  {name:'Сиракузы', ico:'🏛', dsc:'Математика · логика, комбинаторика, инварианты'},
  {name:'Ньютон', ico:'🍎', dsc:'Физика · механика, энергия, электричество'},
  {name:'Лавуазье', ico:'⚗️', dsc:'Химия · молекулы, растворы, газы'},
  {name:'Информатика', ico:'💻', dsc:'Информатика · двоичный код, алгоритмы, логика'}];
function islStats(name){
  const ts=window.ARH_TASKS.filter(t=>t.island===name);
  const done=ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  return {total:ts.length, done};
}
function renderPath(){
  const next = window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0];
  const s=document.getElementById('screen');
  const top=`<div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
    <div><div style="font-size:13px;color:var(--muted)">Решено задач: <b style="color:var(--brass)">${solvedCount()}</b> из ${window.ARH_TASKS.length}</div>
    <div style="font-size:12px;color:var(--muted);margin-top:3px">серия ${DB.streak}🔥 · лучшая ${DB.best}</div></div>
    <div class="bar" style="width:150px"><i style="width:${Math.round(solvedCount()/window.ARH_TASKS.length*100)}%"></i></div></div>
    ${next?`<button class="btn" style="width:100%;margin:10px 0 4px" onclick="go('task-${next.id}')">🎯 Продолжить: ${esc(next.title)}</button>`:''}
    <div class="island" style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(127,209,255,.08),rgba(217,164,65,.07));border-color:rgba(127,209,255,.35)" onclick="go('legend')">
      <div style="font-size:34px">📜</div>
      <div style="flex:1"><div class="nm" style="color:var(--glow)">Легенда об Архимеде</div>
      <div class="sub">Кто он, почему острова называются так и откуда взялся новый — 💻 Цитадель Информатики</div></div>
      <span style="color:var(--brass)">→</span></div>`;
  const cards=ISLANDS.map(I=>{
    const st=islStats(I.name); const pct=Math.round(st.done/st.total*100);
    const themes=[...new Set(window.ARH_TASKS.filter(t=>t.island===I.name).map(t=>themeOf(t)))];
    const themeRows=themes.map(th=>{
      const tt=window.ARH_TASKS.filter(t=>t.island===I.name&&themeOf(t)===th);
      const d=tt.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
      return `<div class="theme-row"><span class="tn">${esc(th)}</span><div class="bar"><i style="width:${d/tt.length*100}%"></i></div><span class="pc">${d}/${tt.length}</span></div>`;
    }).join('');
    return `<div class="island" onclick="go('island-${encodeURIComponent(I.name)}')">
      <div class="top"><span class="nm">${I.ico} ${esc(I.name)}</span><span class="pr">${st.done}/${st.total} · ${pct}%</span></div>
      <div class="sub">${esc(I.dsc)}</div>${themeRows}</div>`;
  }).join('');
  s.innerHTML=top+cards;
  hud();
}
/* ---------- ОСТРОВ ---------- */
function renderIsland(name){
  const s=document.getElementById('screen');
  const ts=window.ARH_TASKS.filter(t=>t.island===name).sort((a,b)=>a.diff-b.diff||a.id.localeCompare(b.id));
  const rows=ts.map(t=>{
    const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
    return `<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')">
      <span class="st">${done?'✅':'🔒'}</span>
      <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${esc(themeOf(t))}</div></div>
      <span class="lvl">ур. ${t.diff}</span></div>`;
  }).join('');
  const meta=ISLANDS.find(i=>i.name===name)||{ico:'🗺',name:name};
  s.innerHTML=`<button class="btn ghost" onclick="go('path')">← Путь</button>
    <h2>${meta.ico} ${esc(meta.name)}</h2>
    <div class="small" style="margin-bottom:8px">${islStats(name).done}/${islStats(name).total} решено · выбирай задачу — помни: сначала ищи знакомый приём</div>${rows}`;
  hud();
}
/* ---------- БАНК ЗАДАЧ ---------- */
function renderLibrary(){
  const s=document.getElementById('screen');
  const h=window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done).length;
  s.innerHTML=`<h2>📚 Банк задач <span class="small">(решено ${solvedCount()}/${window.ARH_TASKS.length} · осталось ${h})</span></h2>
    <div class="small" style="margin-bottom:8px">Все задачи по темам — от простых к сложным. Приёмы сначала объясняет Архимед в «Пути».</div>
    ${ISLANDS.map(I=>{
      const ts=window.ARH_TASKS.filter(t=>t.island===I.name).sort((a,b)=>a.diff-b.diff);
      return `<div class="sec">${I.ico} ${I.name}</div>`+ts.map(t=>{
        const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
        return `<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')"><span class="st">${done?'✅':'🔒'}</span>
        <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${esc(themeOf(t))}</div></div>
        <span class="lvl">ур. ${t.diff}</span></div>`;}).join('');
    }).join('')}`;
  hud();
}
/* ---------- вспомогательное ---------- */
function toast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('show');
  clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('show'),2000); }
function showConfetti(){ const d=document.createElement('div'); d.className='confetti';
  for(let i=0;i<70;i++){ const p=document.createElement('span'); p.className='confetti-piece';
    p.style.left=Math.random()*100+'%'; p.style.background=COLORS[i%COLORS.length];
    p.style.animationDelay=Math.random()*0.6+'s'; p.style.animationDuration=1.4+Math.random()*1.3+'s'; d.appendChild(p); }
  document.body.appendChild(d); setTimeout(()=>d.remove(),3800); }
