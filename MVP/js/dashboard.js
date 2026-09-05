/* АРХИМЕД MVP · dashboard.js — родительский кабинет */
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
  // готовность к школьному этапу ВсОШ (эвристика: математика, задачи ур. 2+)
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
/* ---------- доступ родителя (admin/admin) ---------- */
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
  } else {
    toast('Неверный логин или пароль');
    const el=document.getElementById('gatePass'); if(el) el.value='';
  }
}
function renderDashboard(){
  const p=DB.profile; if(!p){ return; }
  const s=document.getElementById('screen');
  const f=forecast();
  const today=DB.today.minutes||0, lim=p.limitMin||45;
  const over=today>=lim;
  const stats=themeStats();
  const weak=stats.filter(x=>x.n>=2 && (x.done/x.n<0.6 || (x.done>0 && x.tries/x.done>2)));
  const rows=stats.sort((a,b)=>b.n-a.n).map(x=>{
    const d=x.done/x.n*100;
    return `<div class="theme-row"><span class="tn">${esc(x.island)} · ${esc(x.theme)}</span>
      <div class="bar"><i style="width:${d}%"></i></div><span class="pc">${x.done}/${x.n}</span></div>`;
  }).join('');
  const feed=DB.history.slice(0,12).map(h=>{
    const t=window.ARH_TASKS.find(x=>x.id===h.id); const dt=new Date(h.ts);
    return `<div class="task-row" style="cursor:default"><span class="st">✅</span>
      <div class="ti"><div class="tt">${t?esc(t.title):h.id}</div><div class="td">${dt.toLocaleString('ru-RU')}</div></div></div>`;
  }).join('')||'<div class="small">Пока нет решённых задач — пусть ребёнок начнёт с «Продолжить» в Пути.</div>';
  s.innerHTML=`
    <h2>🛡 Кабинет родителя</h2>
    <div class="card">
      <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <div><span style="display:inline-block;width:13px;height:13px;border-radius:50%;background:${esc(p.color||'#d9a441')};border:1px solid rgba(255,255,255,.35);margin-right:8px;vertical-align:-1px"></span><b style="font-size:17px;color:var(--brass)">${esc(p.name)}</b> · ${esc(p.klass)} класс · ${rankName()}</div>
        <span class="chip">решил(а) ${solvedCount()}/${window.ARH_TASKS.length}</span>
      </div>
      ${DB.duel?`<div class="theme-row" style="margin-top:6px"><span class="tn">⚔ Рейтинг дуэлей</span><span class="pc">${DB.duel.rating} · побед ${DB.duel.wins}/${DB.duel.games}</span></div>`:""}
      <div class="grid2" style="margin-top:10px">
        <div class="theme-row"><span class="tn">⭐ очки</span><span class="pc">${DB.points}</span></div>
        <div class="theme-row"><span class="tn">🔥 серия</span><span class="pc">${DB.streak} (рекорд ${DB.best})</span></div>
      </div>
    </div>

    <div class="card">
      <div class="sec" style="margin-top:0">🔮 Прогноз: готовность к ВсОШ (школьный этап, математика)</div>
      <div class="bar" style="margin-bottom:8px"><i style="width:${f.pct||0}%"></i></div>
      <div style="font-size:13px;line-height:1.5;color:#cfd8ea">решено задач уровня 2+: <b style="color:var(--amber)">${f.pct||0}%</b> · среднее попыток на задачу: ${f.avgTry||'—'}</div>
      <div class="arch"><span class="who">◈ совет наставника</span>${esc(f.txt)}</div>
      ${DB.tours&&DB.tours.length?`<div class="small" style="margin-top:6px">🏁 Последний тур: <b style="color:var(--amber)">${DB.tours[0].score}/${tourCount()}</b> за ${fmt(DB.tours[0].secs)} · лучший: ${Math.max(...DB.tours.map(t=>t.score))}/${tourCount()}</div>`:""}
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:center">
        <b>⏰ Лимит на сегодня</b>
        <div style="display:flex;gap:6px;align-items:center">
          <input type="number" id="limIn" value="${lim}" min="10" max="240" style="width:70px;font-size:14px;padding:6px 8px;border:2px solid var(--hairline);border-radius:8px;background:#0d1a13;color:var(--ivory)">
          <button class="btn ghost" onclick="setLimit()">Сохранить</button>
        </div>
      </div>
      <div class="bar" style="margin-top:8px"><i style="width:${Math.min(100,today/lim*100)}%;background:${over?'var(--danger)':'var(--glass)'}"></i></div>
      <div class="small" style="margin-top:4px">сегодня: ${today} мин из ${lim} ${over?'— лимит достигнут, пора на перерыв ⏸':''}</div>
    </div>

    ${weak.length?`<div class="card" style="border-color:rgba(232,106,90,.5)">
      <b style="color:var(--danger)">⚠ Слабые темы (стоит разобрать приёмы):</b>
      <div style="margin-top:6px">${weak.map(w=>`<div class="theme-row"><span class="tn">${esc(w.island)} · ${esc(w.theme)}</span><span class="pc">решено ${w.done}/${w.n} · попыток/зад. ${(w.tries/w.done||0).toFixed(1)}</span></div>`).join('')}</div>
      <div class="small" style="margin-top:6px">Совет: откройте урок «объясни → реши» по этим темам, затем вернитесь к задачам.</div>
    </div>`:''}

    <div class="card">
      <div class="sec" style="margin-top:0">📖 Уроки «объясни → реши» (ВсОШ 6–7 класс)</div>
      ${window.ARH_LESSONS.map(L=>{const rec=DB.lessons&&DB.lessons[L.id];
        const done=!!(rec&&rec.done);
        return `<div class="theme-row"><span class="tn">${L.ico} ${esc(L.title)}</span>
          <div class="bar"><i style="width:${done?100:0}%;background:var(--ok)"></i></div>
          <span class="pc">${done?'✅':(rec&&rec.stars?'⭐ '+rec.stars+'/2':'0/2')}</span></div>`;}).join('')}
      <div class="small" style="margin-top:6px">Совет: проходите урок перед задачами его темы — сначала объяснение приёма, потом решение.</div>
    </div>

    <div class="card">
      <div class="sec" style="margin-top:0">📈 Прогресс по темам</div>${rows}
    </div>

    <div class="card">
      <div class="sec" style="margin-top:0">🕘 Последняя активность</div>${feed}
    </div>

    <button class="btn ghost" style="width:100%;margin-top:4px;color:var(--danger);border-color:rgba(232,106,90,.5)" onclick="resetAll()">↺ Сбросить весь прогресс</button>`;
  hud();
}
function setLimit(){ const v=parseInt(document.getElementById('limIn').value); if(v>=10&&v<=240){ DB.profile.limitMin=v; save(); toast('Лимит сохранён: '+v+' мин/день'); renderDashboard(); } }
function resetAll(){ if(!confirm('Сбросить прогресс ребёнка и профиль?')) return;
  DB=emptyState(); localStorage.removeItem(KEY); showNav(false); go('onboard'); }
