/* АРХИМЕД MVP · duel.js — дуэль с «призраком Архимеда» (база для 1v1 с рейтингом) */
'use strict';
let DU = { tasks:[], idx:0, t0:0, answers:[], ghost:0, over:false, ratingFrom:1200 };

function duelGhostSecs(tasks){ return Math.round(tasks.reduce((s,t)=>s+(45+t.diff*22),0)); }
function startDuel(){
  const isl=UI.tourIsl||'Сиракузы';
  const pool=window.ARH_TASKS.filter(t=>t.island===isl);
  const src=pool.slice();
  for(let i=src.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [src[i],src[j]]=[src[j],src[i]]; }
  DU={ tasks:src.slice(0,6), idx:0, t0:Date.now(), answers:[], ghost:0, over:false };
  DU.ghost=duelGhostSecs(DU.tasks);
  renderDuel();
}
function renderDuel(){
  const s=document.getElementById('screen');
  const t=DU.tasks[DU.idx];
  if(!t||DU.over){ finishDuel(); return; }
  s.innerHTML=`<button class="btn ghost" onclick="cancelDuel()">✕ Прервать дуэль</button>
    <h2 style="margin:8px 0 4px">⚔ Дуэль с призраком Архимеда</h2>
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
      <span class="chip">задача ${DU.idx+1}/${DU.tasks.length} · ${esc(DU.tasks[0].island)}</span>
      <span class="chip" style="color:var(--amber)">⏱ <b id="dClock">0:00</b> · призрак: ${fmt(DU.ghost)}</span></div>
    <div class="card">
      <div class="story">${esc(t.story)}</div>
      <div class="q">${esc(t.q)}</div>
      ${t.type==='choice'
        ? `<div class="choices">${t.choices.map((c,i)=>`<button class="choice" onclick="duelAns(${i})">${esc(c)}</button>`).join('')}</div>`
        : `<div class="answer-row"><input type="number" id="duelNum" step="any" placeholder="число">
           <select id="duelUnit">${unitOpts(t.unit).map(u=>`<option>${esc(u)}</option>`).join('')}</select>
           <button class="btn" onclick="duelUnit()" style="margin:0">Ответить</button></div>`}
    </div>`;
  const el=document.getElementById('dClock'); if(el) el.textContent=fmt(Math.round((Date.now()-DU.t0)/1000));
  DU._tick=setInterval(()=>{ const e=document.getElementById('dClock'); if(e&&!DU.over){ e.textContent=fmt(Math.round((Date.now()-DU.t0)/1000)); } },1000);
}
function duelAns(i){ const t=DU.tasks[DU.idx]; DU.answers.push({id:t.id,ok:i===t.answer}); clearInterval(DU._tick); DU.idx++; renderDuel(); }
function duelUnit(){ const t=DU.tasks[DU.idx];
  const n=parseFloat(document.getElementById('duelNum').value);
  if(isNaN(n)){ toast('Введи число!'); return; }
  const u=document.getElementById('duelUnit').value;
  DU.answers.push({id:t.id,ok:Math.abs(convert(n,u)-t.answer)<=t.tol}); clearInterval(DU._tick); DU.idx++; renderDuel(); }
function finishDuel(){
  if(DU.over) return; DU.over=true; clearInterval(DU._tick);
  const secs=Math.round((Date.now()-DU.t0)/1000);
  const score=DU.answers.filter(a=>a.ok).length;
  const win = score>=4 && secs<=DU.ghost;
  DB.duel=DB.duel||{rating:1200, wins:0, games:0, best:{}};
  const d=DB.duel;
  d.games++; if(win){ d.wins++; d.rating+=20; DB.points+=score*5; } else d.rating=Math.max(900,d.rating-15);
  if(!d.best.score||score>d.best.score||(score===d.best.score&&secs<d.best.secs)) d.best={score,secs};
  save();
  const s=document.getElementById('screen');
  const rows=DU.tasks.map((t,i)=>{ const a=DU.answers[i];
    return `<div class="task-row" style="cursor:default"><span class="st">${a?(a.ok?'✅':'❌'):'—'}</span>
      <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${a&&!a.ok?'верный ответ: '+t.answer:''}</div></div></div>`; }).join('');
  s.innerHTML=`<h2>${win?'🏆 Победа!':'⚔ Поражение…'}</h2>
    <div class="card" style="text-align:center">
      <div style="font-size:30px;color:var(--brass)">${score}/${DU.tasks.length}</div>
      <div class="small">твоё время ${fmt(secs)} · призрак ${fmt(DU.ghost)}</div>
      <div class="arch"><span class="who">◈ вердикт</span>${win
        ? 'Ты быстрее призрака Архимеда! Рейтинг дуэлей +20.'
        : 'Призрак был быстрее (или точнее). Пересмотри ошибки — и реванш! Рейтинг −15.'}</div>
    </div>${rows}
    <div class="btnrow">
      <button class="btn" onclick="startDuel()">⚔ Реванш</button>
      <button class="btn ghost" onclick="renderTourScreen()">К турам</button>
    </div>`;
  hud();
}
function cancelDuel(){ DU.over=true; clearInterval(DU._tick); renderTourScreen(); }
