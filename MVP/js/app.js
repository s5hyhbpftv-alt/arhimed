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
  const col=DB.profile.color||COLORS[0];
  const hEl=document.getElementById('hName');
  hEl.innerHTML=`<i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${col};margin-right:6px;border:1px solid rgba(255,255,255,.35)"></i>${esc(DB.profile.name||'')}`;
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
      <select id="obClass"><option>1–2</option><option>3–4</option><option>5–6</option><option selected>7</option><option>8+</option></select>
      <label>Уровень</label>
      <select id="obLevel"><option value="novice">🌱 Новичок — объясняй побольше</option><option value="pro">⚡ Уже решал олимпиады</option></select>
      <label>Цвет хитона</label>
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin:2px 0 8px">
        <svg width="86" height="104" viewBox="0 0 96 116" style="filter:drop-shadow(0 4px 10px rgba(0,0,0,.45))">
          <ellipse cx="48" cy="30" rx="26" ry="28" fill="#eec39b"/>
          <circle cx="48" cy="26" r="22" fill="#eec39b"/>
          <path d="M30 30 Q38 40 48 40 Q58 40 66 30" stroke="#6b4a33" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          <circle cx="41" cy="26" r="2.4" fill="#33291e"/><circle cx="55" cy="26" r="2.4" fill="#33291e"/>
          <path d="M46 34 Q48 38 50 34" stroke="#d09a6a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
          <path id="chitShade" d="M12 116 C16 84 30 66 48 66 C66 66 80 84 84 116 Z" fill="#00000000"/>
          <path id="chitBody" d="M14 116 C17 80 32 62 48 62 C64 62 79 80 82 116 Z" fill="#d9a441" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>
          <path d="M38 64 L44 84" stroke="rgba(255,255,255,.5)" stroke-width="2.4" stroke-linecap="round"/>
          <path d="M58 64 L52 84" stroke="rgba(0,0,0,.18)" stroke-width="2.4" stroke-linecap="round"/>
        </svg>
        <div style="text-align:left;max-width:200px"><div class="small" style="color:var(--muted)">Хитон Исследователя — выбери свой цвет:</div>
        <div class="swatches" style="margin:8px 0 0">${COLORS.map((c,i)=>`<div class="sw ${i===0?'sel':''}" style="background:${c}" data-c="${c}" onclick="pickCol(this)"></div>`).join('')}</div></div>
      </div>
      <button class="btn" style="width:100%" onclick="finishOnboard()">В путь →</button>
    </div></div>`;
}
let chosenCol=COLORS[0];
function pickCol(el){
  chosenCol=el.dataset.c;
  document.querySelectorAll('.sw').forEach(x=>x.classList.toggle('sel',x===el));
  // перекрашиваем превью-хитон
  const b=document.getElementById('chitBody'), s=document.getElementById('chitShade');
  if(b) b.setAttribute('fill', chosenCol);
  if(s) s.setAttribute('fill', shade(chosenCol));
}
/* затемнение цвета для тени хитона */
function shade(hex){
  try{
    const n=parseInt(hex.slice(1),16);
    const f=v=>Math.max(0,Math.round(((n>>v)&255)*0.55));
    return 'rgb('+f(16)+','+f(8)+','+f(0)+')';
  }catch(e){ return 'rgba(0,0,0,.3)'; }
}
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
  {name:'Начальная школа', ico:'🧸', dsc:'1–4 класс · счёт, сложение, умножение, доли'},
  {name:'Сиракузы', ico:'🏛', dsc:'Математика · логика, комбинаторика, инварианты'},
  {name:'Ньютон', ico:'🍎', dsc:'Физика · механика, энергия, электричество'},
  {name:'Лавуазье', ico:'⚗️', dsc:'Химия · молекулы, растворы, газы'},
  {name:'Информатика', ico:'💻', dsc:'Информатика · двоичный код, алгоритмы, логика'}];
function isJunior(){ try{ return !!DB.profile&&/(^|\s)(1–2|3–4)(\s|$)/.test(DB.profile.klass||''); }catch(e){ return false; } }
function taskPool(){ return isJunior()? window.ARH_TASKS.filter(t=>t.island==='Начальная школа') : window.ARH_TASKS.filter(t=>t.island!=='Начальная школа'); }
function islandVisible(I){ return isJunior()? (I.name==='Начальная школа') : (I.name!=='Начальная школа'); }
function nextTask(){ return taskPool().filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0] || window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0] || null; }
function poolDone(){ const ts=taskPool(); return ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length; }
function islStats(name){
  const ts=window.ARH_TASKS.filter(t=>t.island===name);
  const done=ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  return {total:ts.length, done};
}
function renderPath(){
  const pool=taskPool();
  const doneN=pool.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const next = pool.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0]
            || window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0];
  const s=document.getElementById('screen');
  const top=`<div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
    <div><div style="font-size:13px;color:var(--muted)">Решено задач: <b style="color:var(--brass)">${doneN}</b> из ${pool.length}${isJunior()?' · раздел 1–4 класс':' (всего '+window.ARH_TASKS.length+')'}</div>
    <div style="font-size:12px;color:var(--muted);margin-top:3px">серия ${DB.streak}🔥 · лучшая ${DB.best}</div></div>
    <div class="bar" style="width:150px"><i style="width:${pool.length?Math.round(doneN/pool.length*100):0}%"></i></div></div>
    ${next?`<button class="btn" style="width:100%;margin:10px 0 4px" onclick="go('task-${next.id}')">🎯 Продолжить: ${esc(next.title)}</button>`:''}
    <div class="island" style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(127,209,255,.08),rgba(217,164,65,.07));border-color:rgba(127,209,255,.35)" onclick="go('legend')">
      <div style="font-size:34px">📜</div>
      <div style="flex:1"><div class="nm" style="color:var(--glow)">Легенда об Архимеде</div>
      <div class="sub">Кто он, почему острова называются так и откуда взялся новый — 💻 Цитадель Информатики</div></div>
      <span style="color:var(--brass)">→</span></div>`;
  const cards=ISLANDS.filter(islandVisible).map(I=>{
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
  const tip=name==='Начальная школа' ? 'Выбирай задачу — Архимед поможет, если что-то непонятно 😊'
    : 'выбирай задачу — помни: сначала ищи знакомый приём';
  s.innerHTML=`<button class="btn ghost" onclick="go('path')">← Путь</button>
    <h2>${meta.ico} ${esc(meta.name)}</h2>
    <div class="small" style="margin-bottom:8px">${islStats(name).done}/${islStats(name).total} решено · ${tip}</div>${rows}`;
  hud();
}
/* ---------- БАНК ЗАДАЧ ---------- */
function renderLibrary(){
  const s=document.getElementById('screen');
  const pool=taskPool();
  const h=pool.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done).length;
  const doneN=pool.length-h;
  s.innerHTML=`<h2>📚 Банк задач <span class="small">(решено ${doneN}/${pool.length} · осталось ${h})</span></h2>
    <div class="small" style="margin-bottom:8px">Все задачи по темам — от простых к сложным. Приёмы сначала объясняет Архимед в «Пути».</div>
    ${ISLANDS.filter(islandVisible).map(I=>{
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
