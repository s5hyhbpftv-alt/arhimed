/* АРХИМЕД MVP · engine.js — микро-петля решения задачи */
'use strict';
let CUR = null;           // текущая задача {task, st(ate record)}
let tChosen=null, tNum=null, tUnit=null;

function openTask(id, backTab){
  const task = window.ARH_TASKS.find(t=>t.id===id); if(!task) return;
  CUR = { task, st: DB.tasks[id]||null };
  tChosen=null; tNum=null; tUnit=null;
  UI.backTab = backTab||'path';
  renderTask();
}
function rec(){ if(!CUR.st){ CUR.st={done:0,tries:0,wrong:0,hints:0,ts:Date.now()}; DB.tasks[CUR.task.id]=CUR.st; } }

function renderTask(){
  const t=CUR.task; const done=!!(CUR.st&&CUR.st.done);
  const solvedBadge = done?'<span class="chip" style="color:var(--ok);border-color:var(--ok)">✅ решено</span>':'';
  let body = `<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px;margin-bottom:6px">
      <span class="small">${esc(t.island)} · ${esc(t.theme)}</span>
      <span style="display:flex;gap:8px"><span class="chip">ур. ${t.diff}</span>${solvedBadge}</span></div>
    <h2 style="margin:0 0 4px">${esc(t.title)}</h2>
    <div class="card">
      <div class="story">${esc(t.story)}</div>
      <div class="q">${esc(t.q)}</div>
      ${done ? solHtml(t) : inputHtml(t)} 
      ${hintsHtml(t,done)}
      ${fbHtml(t,done)}
    </div>`;
  document.getElementById('screen').innerHTML = `
    <button class="btn ghost" onclick="go('${UI.backTab}')">← Назад</button>${body}
    <div class="btnrow" id="afterRow"></div>`;
  if(done){ afterRow(t); }
  hud();
}
function inputHtml(t){
  if(t.type==='choice') return `<div class="choices" id="choiceBox">${t.choices.map((c,i)=>
    `<button class="choice ${tChosen===i?'wrong':''}" onclick="pickCh(${i})">${esc(c)}</button>`).join('')}</div>`;
  return `<div class="answer-row">
      <input type="number" id="numIn" step="any" placeholder="число">
      <select id="unitIn">${unitOpts(t.unit).map(u=>`<option>${esc(u)}</option>`).join('')}</select>
      <button class="btn" onclick="pickNum()" style="margin:0">Ответить</button></div>`;
}
function hintsHtml(t,done){
  if(done) return '';
  const used=CUR.st?CUR.st.hints:0;
  const costs=['бесплатно','5 ⭐','10 ⭐'];
  return `<div class="hints">${t.hints.map((_,i)=>`<button class="hint-btn" ${used>i?'disabled':''} onclick="useHint(${i})">
    Подсказка ${i+1} · ${costs[i]}</button>`).join('')}</div>
    ${t.hints.filter((_,i)=>used>i).map(h=>`<div class="hint-box">${esc(h)}</div>`).join('')}`;
}
function fbHtml(t,done){
  if(done){ return `<div class="fb ok"><b>✅ Верно!</b> ${CUR.st.hints>0?`Подсказки: ${CUR.st.hints}.`:'Без подсказок — блестяще!'}</div>`; }
  if(tChosen!==null){ return `<div class="fb no">❌ ${esc(t.trap||'Не угадал — попробуй ещё!')}</div>`; }
  return '';
}
function solHtml(t){ return `<div class="arch"><span class="who">◈ Решение Архимеда</span>${esc(t.sol)}</div>`; }

function useHint(i){
  if(CUR.st && CUR.st.done) return;
  rec();
  if(CUR.st.hints>i) return;
  const cost = i===0?0:(i===1?5:10);
  if(DB.points<cost){ toast('Не хватает ⭐ для подсказки'); return; }
  DB.points-=cost; CUR.st.hints=i+1; save(); renderTask();
}
function wrongPing(){
  rec(); CUR.st.tries++; CUR.st.wrong=(CUR.st.wrong||0)+1; save();
  tChosen=-99; renderTask(); // подсветка ошибки
}
function pickCh(i){
  if(CUR.st&&CUR.st.done) return;
  const t=CUR.task;
  if(i===t.answer) win(); else { rec(); CUR.st.tries++; CUR.st.wrong=(CUR.st.wrong||0)+1; save(); tChosen=i; renderTask(); }
}
function pickNum(){
  if(CUR.st&&CUR.st.done) return;
  const t=CUR.task;
  const n=parseFloat(document.getElementById('numIn').value);
  const u=document.getElementById('unitIn').value;
  if(isNaN(n)){ toast('Введи число!'); return; }
  if(Math.abs(convert(n,u)-t.answer)<=t.tol) win(); else wrongPing();
}
function win(){
  rec();
  if(CUR.st.done) return;
  CUR.st.done=1; CUR.st.ts=Date.now();
  const hints=CUR.st.hints||0;
  const gain = Math.max(8, 20 - hints*6 + CUR.task.diff*2);
  DB.points+=gain; DB.streak++; DB.best=Math.max(DB.best,DB.streak);
  DB.history.unshift({ts:Date.now(), id:CUR.task.id, ok:1});
  if(DB.history.length>200) DB.history.length=200;
  save(); renderTask(); showConfetti(); hud();
}
function afterRow(t){
  const remaining = window.ARH_TASKS.filter(x=>!DB.tasks[x.id]||!DB.tasks[x.id].done);
  const nxt = remaining.find(x=>x.island===t.island) || remaining[0];
  document.getElementById('afterRow').innerHTML = nxt
    ? `<button class="btn" onclick="openTask('${nxt.id}','island-${esc(nxt.island)}')">Дальше → ${esc(nxt.title)}</button>
       <button class="btn ghost" onclick="go('${UI.backTab}')">В меню</button>`
    : `<button class="btn ghost" onclick="go('path')">Все задачи решены — в меню 🏆</button>`;
}
