/* АРХИМЕД MVP · simulator.js — олимпиадный симулятор (тур с таймером) */
'use strict';
let SIM = { tasks:[], idx:0, left:0, timerId:null, answers:[], over:false };

function tourCount(){ return 8; }
function startTour(){
  const isl = UI.tourIsl || 'Сиракузы';
  const pool = window.ARH_TASKS.filter(t=>t.island===isl);
  const uns = pool.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done);
  const src = (uns.length>=tourCount()?uns:pool).slice();
  // перемешиваем, но гарантируем не больше 2 задач одного diff подряд — простая тасовка Фишера-Йетса
  for(let i=src.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [src[i],src[j]]=[src[j],src[i]]; }
  SIM = { tasks:src.slice(0,tourCount()), idx:0, left: tourCount()*90, timerId:null, answers:[], over:false, start:Date.now() };
  UI.tourIsl = isl;
  tickTour(); renderTour();
}
function tickTour(){
  clearInterval(SIM.timerId);
  SIM.timerId=setInterval(()=>{ SIM.left--;
    if(SIM.left<=0){ clearInterval(SIM.timerId); finishTour(); }
    else if(!SIM.over){ const el=document.getElementById('tClock'); if(el) el.textContent=fmt(SIM.left); }
  },1000);
}
function fmt(sec){ const m=Math.floor(sec/60), s=sec%60; return (m<10?'0':'')+m+':'+(s<10?'0':'')+s; }
function tourIsls(){ return ISLANDS.filter(I=>{ if(typeof isJunior==='function'&&isJunior()) return I.name==='Начальная школа'; return I.name!=='Начальная школа'; }); }
function tourLabel(n){ return typeof isJunior==='function'&&isJunior()? 'Тур по начальной школе' : 'Олимпиадный тур'; }
function bestTour(isl){ try{ return (DB.tours||[]).filter(t=>t.island===isl); }catch(e){ return []; } }
/* ── Туры ВсОШ: отдельный раздел, не «Учебники» ──────────────────────
   Тур — это работа на баллы и время с разбором после каждого задания,
   а не урок. Поэтому он живёт здесь, рядом с быстрым туром по островам
   и дуэлью. Открывается тем же просмотром урока: RUKEXAM рисует обложку,
   задания и протокол. */
function openOlympTour(id){ try{ openLessonView(id); }catch(e){ toast('Тур не открылся'); } }

function olympTours(){
  const T=(typeof window.ARH_TOURS!=='undefined'&&window.ARH_TOURS)||[];
  return T.slice().sort((a,b)=>(a.klass-b.klass)||String(a.title).localeCompare(String(b.title),'ru'));
}

function renderTourScreen(){
  const s=document.getElementById('screen');
  const isls=tourIsls();
  const junior=typeof isJunior==='function'&&isJunior();
  const sub=junior? tourCount()+' задач на время — проверь себя в разделе «Начальная школа»' : 'как школьный этап ВсОШ · '+tourCount()+' задач · таймер · без подсказок';
  const nTask=tourCount();
  const hero=`<div class="card path-hero" style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
      <div style="font-size:40px;filter:drop-shadow(0 0 14px rgba(217,164,65,.5))">🏁</div>
      <div style="flex:1"><div style="font-size:19px;font-weight:bold;color:var(--brass)">${tourLabel()}</div>
      <div class="small" style="color:var(--muted);margin-top:3px;line-height:1.5">${sub}</div></div>
    </div>
    <div class="arch"><span class="who">◈ Архимед</span>
      «${junior?'Соберись и покажи, чему научился — решай по порядку, время пошло!':'Таймер запущен — не застревай на одной задаче, как на настоящем туре. Потом разберём протокол'}».</div>`;
  const tourCards=isls.map((I,i)=>{
    const st=islStats(I.name);
    const best=bestTour(I.name);
    const bestN=best.length? Math.max(...best.map(t=>t.score)) : null;
    const last=best.length? best[0] : null;
    return `<div class="tour-card path-island" style="animation-delay:${0.07*i}s" onclick="UI.tourIsl='${I.name}';startTour()">
      <div class="tc-icon">${I.img?`<img src="${I.img}" alt="" style="width:100%;height:100%;object-fit:contain;border-radius:50%;display:block">`:I.ico}</div>
      <div style="flex:1;min-width:0">
        <div class="tc-name">${esc(I.name)}</div>
        <div class="small" style="color:var(--muted);margin-top:2px">${esc(I.dsc)} · ${st.done}/${st.total} решено</div>
        <div class="tc-meta">
          <span class="chip" style="font-size:11px">⏱ ${nTask} задач</span>
          ${bestN!==null?`<span class="chip" style="font-size:11px">🏆 лучший ${bestN}/${nTask}</span>`:''}
          ${last?`<span class="chip" style="font-size:11px">последний ${last.score}/${nTask} (${fmt(last.secs)})</span>`:''}
        </div>
      </div>
      <span class="tc-go">▶</span>
    </div>`;}).join('');
  const duelBest=DB.duel? DB.duel : null;
  const duel=`<div class="card duel-card" style="margin-top:12px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
        <div style="font-size:34px">⚔</div>
        <div style="flex:1"><b style="font-size:16px">Дуэль с призраком Архимеда</b>
        <div class="small" style="color:var(--muted);margin-top:2px">${junior?'Реши 6 задачек быстрее призрака':'6 задач на время против призрака — рейтинг как в настоящих дуэлях'}</div></div>
        ${duelBest?`<div class="duel-score">${duelBest.rating}</div>`:''}
      </div>
      <div class="duel-row">${isls.map((I,i)=>`<button class="duel-btn path-island" style="animation-delay:${0.05*i}s" onclick="UI.tourIsl='${I.name}';startDuel()">
        <span style="font-size:20px">${I.ico}</span><span>${esc(I.name)}</span></button>`).join('')}</div>
      ${duelBest?`<div class="small" style="margin-top:8px;color:var(--muted)">Рейтинг <b style="color:var(--brass)">${duelBest.rating}</b> · побед ${duelBest.wins}/${duelBest.games}${duelBest.best? ' · лучший счёт '+duelBest.best:''}</div>`:''}
    </div>`;
  s.innerHTML=hero+olympButton()+tourCards+duel;
  hud();
}

/* Одна кнопка на туры ВсОШ: список из 25 туров — отдельным экраном, чтобы
   раздел «Тур» остался таким, как был (быстрый тур по островам и дуэль). */
function olympButton(){
  const T=(typeof window.ARH_TOURS!=='undefined'&&window.ARH_TOURS)||[];
  if(!T.length) return '';
  const заданий=T.reduce((a,t)=>a+t.items.length,0);
  const пройдено=T.filter(t=>{ try{ return !!(DB.lessons&&DB.lessons[t.id]&&DB.lessons[t.id].done); }catch(e){ return false; } }).length;
  return `<div class="card" style="margin-bottom:12px;display:flex;align-items:center;gap:12px;padding:14px">
      <div style="font-size:30px">🏆</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:16px;font-weight:bold;color:var(--brass)">Туры ВсОШ</div>
        <div class="small" style="color:var(--muted);margin-top:2px">${T.length} туров · ${заданий} заданий · баллы и время${пройдено?' · пройдено '+пройдено:''}</div>
      </div>
      <button class="btn" style="margin:0;min-height:44px" onclick="go('olymp')">Выбрать тур →</button>
    </div>`;
}

/* Экран выбора тура: предметы, в них классы. Отсюда открывается сам тур. */
function renderOlympScreen(){
  const s=document.getElementById('screen');
  const T=olympTours();
  const порядок=['math','rus','inf','phys','chem'];
  const имена={math:'Математика',rus:'Русский язык',inf:'Информатика',phys:'Физика',chem:'Химия'};
  const иконы={math:'🏛',rus:'📖',inf:'💻',phys:'🍎',chem:'⚗️'};
  const по={};
  T.forEach(t=>{ (по[t.subject]=по[t.subject]||[]).push(t); });
  const блоки=порядок.filter(п=>по[п]).map(п=>{
    const карточки=по[п].map(t=>{
      let пройден=false; try{ пройден=!!(DB.lessons&&DB.lessons[t.id]&&DB.lessons[t.id].done); }catch(e){}
      return `<button type="button" class="choice" style="text-align:left;display:block;width:100%;min-height:56px"
          onclick="openOlympTour(${t.id})">
          <b>${t.klass} класс</b> · ${esc(String(t.title).replace(/^[^·]*·\s*\d+\s*класс\s*·\s*/,''))}
          <span class="small" style="display:block;color:var(--muted);margin-top:2px">${t.items.length} заданий · до ${t.макс} баллов${t.время?' · '+t.время+' мин':''}${пройден?' · ✅ пройден':''}</span>
        </button>`;
    }).join('');
    return `<div style="margin-top:12px">
        <div style="font-size:15px;font-weight:bold;color:var(--brass);margin-bottom:6px">${иконы[п]||'🏆'} ${имена[п]||п}</div>
        <div style="display:flex;flex-direction:column;gap:8px">${карточки}</div>
      </div>`;
  }).join('');
  s.innerHTML=`<button class="btn ghost" onclick="go('tour')">← К турам</button>
    <h2 style="margin:8px 0 4px">🏆 Туры ВсОШ</h2>
    <div class="small" style="color:var(--muted);margin-bottom:8px">Выбери предмет и класс. Задание проверяется сразу: увидишь решение и разбор, в конце — балл и процент выполнения.</div>
    <div class="card" style="padding:12px 12px 16px">${блоки}</div>`;
  hud();
}
function renderTour(){
  const s=document.getElementById('screen');
  const t=SIM.tasks[SIM.idx]; if(!t||SIM.over){ finishTour(); return; }
  s.innerHTML=`<button class="btn ghost" onclick="cancelTour()">✕ Прервать тур</button>
    <h2 style="margin:8px 0 4px">🏁 Тур: ${esc(SIM.tasks[0].island)}</h2>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
      <span class="chip">задача ${SIM.idx+1}/${SIM.tasks.length}</span>
      <span class="chip" style="color:var(--amber);border-color:var(--brass)">⏱ <b id="tClock">${fmt(SIM.left)}</b></span></div>
    <div class="card">
      <div class="story">${esc(t.story)}</div>
      <div class="q">${esc(t.q)}</div>
      ${t.type==='choice'
        ? `<div class="choices">${t.choices.map((c,i)=>`<button class="choice" onclick="simAns(${i})">${esc(c)}</button>`).join('')}</div>`
        : `<div class="answer-row"><input type="number" id="simNum" step="any" placeholder="число">
           <select id="simUnit">${unitOpts(t.unit).map(u=>`<option>${esc(u)}</option>`).join('')}</select>
           <button class="btn" onclick="simUnit()" style="margin:0">Ответить</button></div>`}
    </div>`;
  const el=document.getElementById('tClock'); if(el) el.textContent=fmt(SIM.left);
}
function simAns(i){ const t=SIM.tasks[SIM.idx];
  SIM.answers.push({id:t.id, ok:i===t.answer}); SIM.idx++; renderTour(); }
function simUnit(){ const t=SIM.tasks[SIM.idx];
  const n=parseFloat(document.getElementById('simNum').value);
  if(isNaN(n)){ toast('Введи число!'); return; }
  const u=document.getElementById('simUnit').value;
  SIM.answers.push({id:t.id, ok:Math.abs(convert(n,u)-t.answer)<=t.tol}); SIM.idx++; renderTour(); }
function finishTour(){
  if(SIM.over) return; SIM.over=true; clearInterval(SIM.timerId);
  const secs=Math.round((Date.now()-SIM.start)/1000);
  const score=SIM.answers.filter(a=>a.ok).length;
  DB.tours=DB.tours||[]; DB.tours.unshift({island:SIM.tasks[0]?SIM.tasks[0].island:'', score, secs, ts:Date.now()});
  DB.points+=score*5; save();
  const s=document.getElementById('screen');
  const rows=SIM.tasks.map((t,i)=>{
    const a=SIM.answers[i];
    const mark=a? (a.ok?'✅':'❌') : '—';
    return `<div class="task-row" style="cursor:default"><span class="st">${mark}</span>
      <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${a&&!a.ok?'верный ответ: '+t.answer:''}</div></div>
      <span class="lvl">ур. ${t.diff}</span></div>`;
  }).join('');
  const advice=score>=7?'Турнирный уровень! Так держать — цель: школьный этап ВсОШ.'
    :score>=5?'Хороший результат. Разбери ошибки и повтори уроки по слабым темам.'
    :score>=3?'Неплохо для старта. Сначала пройди уроки «объясни → реши», потом возвращайся к туру.'
    :'Сложно? Начни с уроков и задач уровня 1–2 в Пути, затем снова попробуй тур.';
  s.innerHTML=`<h2>🏁 Протокол тура</h2>
    <div class="card" style="text-align:center">
      <div style="font-size:34px;color:var(--brass)">${score}/${SIM.tasks.length}</div>
      <div class="small">время: ${fmt(secs)} · +${score*5} ⭐</div>
      <div class="arch"><span class="who">◈ Архимед</span>${advice}</div>
    </div>
    ${rows}
    <div class="btnrow"><button class="btn" onclick="renderTourScreen()">Ещё тур</button>
    <button class="btn ghost" onclick="go('path')">В меню</button></div>`;
  hud();
}
function cancelTour(){ clearInterval(SIM.timerId); SIM.over=true; renderTourScreen(); }
