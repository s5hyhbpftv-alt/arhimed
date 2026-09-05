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
  const lg=document.getElementById('hLogout');
  if(lg) lg.classList.toggle('hidden', !(DB.profile));
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
let chosenCol=COLORS[0], chosenGender='boy';
function figSVG(g){
  return g==='girl' ? girlSVG(chosenCol) : boySVG(chosenCol);
}
function boySVG(c){
  const skin='#f4c9a3', skinD='#d9a87e', hair='#5a4030', hairD='#45301f';
  const sh=shade(c);
  return `<svg width="150" height="205" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
    <!-- тень под фигурой -->
    <ellipse cx="110" cy="288" rx="62" ry="9" fill="rgba(0,0,0,.3)"/>
    <!-- руки (рукава хитона) -->
    <path d="M40 190 C28 200 22 214 20 230 C34 236 50 236 62 230 C58 214 52 200 44 190 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M180 190 C192 200 198 214 200 230 C186 236 170 236 158 230 C162 214 168 200 176 190 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M20 230 C26 244 34 252 44 258 L176 258 C186 252 194 244 200 230 C180 244 160 250 110 250 C60 250 40 244 20 230 Z" fill="${skinD}" opacity=".5"/>
    <!-- хитон -->
    <path d="M48 300 C52 236 76 196 110 196 C144 196 168 236 172 300 Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="2.5"/>
    <path d="M88 205 C96 220 104 230 110 230 C116 230 124 220 132 205 L120 300 L100 300 Z" fill="${sh}" opacity=".85"/>
    <path d="M78 218 C86 240 96 250 110 250 C124 250 134 240 142 218" stroke="rgba(255,255,255,.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M84 200 L76 300" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>
    <path d="M136 200 L144 300" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>
    <!-- ворот -->
    <path d="M84 200 C94 210 126 210 136 200 L140 212 C128 224 92 224 80 212 Z" fill="${sh}" opacity=".9"/>
    <!-- шея -->
    <rect x="97" y="172" width="26" height="28" rx="10" fill="${skin}"/>
    <!-- голова -->
    <circle cx="110" cy="132" r="52" fill="${skin}"/>
    <!-- уши -->
    <circle cx="56" cy="140" r="12" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="164" cy="140" r="12" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="56" cy="140" r="4" fill="${skinD}"/><circle cx="164" cy="140" r="4" fill="${skinD}"/>
    <!-- волосы мальчика: шапка -->
    <path d="M58 128 L58 118 C58 74 82 54 110 54 C138 54 162 74 162 118 L162 128 L58 128 Z" fill="${hair}"/>
    <path d="M56 128 C78 118 142 118 164 128 L164 118 C162 92 152 74 136 66 C150 74 158 92 160 116 L160 128 Z" fill="${hairD}"/>
    <!-- чёлка -->
    <path d="M64 128 L66 148 L80 126 L90 150 L100 124 L112 150 L122 126 L132 148 L142 124 L154 146 L156 128 Z" fill="${hair}"/>
    <!-- брови -->
    <path d="M78 124 Q92 116 104 122" stroke="${hairD}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M116 122 Q128 116 142 124" stroke="${hairD}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- глаза -->
    <ellipse cx="92" cy="140" rx="8.5" ry="10" fill="#fff"/>
    <ellipse cx="128" cy="140" rx="8.5" ry="10" fill="#fff"/>
    <circle cx="93" cy="142" r="5" fill="#3a2c1e"/>
    <circle cx="127" cy="142" r="5" fill="#3a2c1e"/>
    <circle cx="95" cy="140" r="1.6" fill="#fff"/><circle cx="129" cy="140" r="1.6" fill="#fff"/>
    <!-- нос -->
    <path d="M110 148 C108 154 110 158 113 157" stroke="${skinD}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- рот: лёгкая улыбка -->
    <path d="M100 170 Q110 179 120 170" stroke="#b0635a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- румянец -->
    <ellipse cx="78" cy="162" rx="9" ry="5.5" fill="rgba(230,120,110,.32)"/>
    <ellipse cx="142" cy="162" rx="9" ry="5.5" fill="rgba(230,120,110,.32)"/>
  </svg>`;
}

/* ------------------ ДЕВОЧКА ------------------ */
function girlSVG(c){
  const skin='#f6cdad', skinD='#dcaa82', hair='#6b4326', hairD='#54331c', hairL='#8a5a34';
  const sh=shade(c);
  return `<svg width="150" height="205" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="288" rx="62" ry="9" fill="rgba(0,0,0,.3)"/>
    <!-- длинные волосы (задний слой) -->
    <path d="M58 118 C36 140 32 190 40 236 C52 252 66 256 76 250 C66 210 66 160 78 138 Z" fill="${hairL}"/>
    <path d="M162 118 C184 140 188 190 180 236 C168 252 154 256 144 250 C154 210 154 160 142 138 Z" fill="${hairL}"/>
    <!-- руки -->
    <path d="M40 192 C28 202 22 216 20 232 C34 238 50 238 62 232 C58 216 52 202 44 192 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M180 192 C192 202 198 216 200 232 C186 238 170 238 158 232 C162 216 168 202 176 192 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <!-- хитон с расширением (платье) -->
    <path d="M52 300 C52 240 76 200 110 200 C144 200 168 240 168 300 Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="2.5"/>
    <path d="M52 300 C58 262 82 236 110 236 C138 236 162 262 168 300 Z" fill="${sh}" opacity=".55"/>
    <path d="M84 300 C90 268 98 252 110 252 C122 252 130 268 136 300 Z" fill="${sh}" opacity=".8"/>
    <path d="M80 222 C90 242 100 252 110 252 C120 252 130 242 140 222" stroke="rgba(255,255,255,.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M86 208 L80 300" stroke="rgba(0,0,0,.12)" stroke-width="3" fill="none"/>
    <path d="M134 208 L140 300" stroke="rgba(0,0,0,.12)" stroke-width="3" fill="none"/>
    <!-- ворот-оборочка -->
    <path d="M84 204 C96 218 124 218 136 204 L142 216 C128 230 92 230 78 216 Z" fill="#fdf6e8" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/>
    <circle cx="96" cy="210" r="2.4" fill="${c}"/><circle cx="110" cy="213" r="2.4" fill="${c}"/><circle cx="124" cy="210" r="2.4" fill="${c}"/>
    <!-- шея -->
    <rect x="97" y="172" width="26" height="26" rx="10" fill="${skin}"/>
    <!-- голова -->
    <circle cx="110" cy="132" r="52" fill="${skin}"/>
    <!-- уши -->
    <circle cx="58" cy="142" r="11" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="162" cy="142" r="11" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <!-- волосы сверху -->
    <path d="M58 132 L58 120 C58 74 82 52 110 52 C138 52 162 74 162 120 L162 132 L58 132 Z" fill="${hair}"/>
    <!-- чёлка -->
    <path d="M58 132 C80 116 140 116 162 132 L162 120 C158 100 146 92 130 92 C138 104 140 116 136 126 C128 114 92 114 84 126 C80 116 82 104 90 92 C74 92 62 100 58 120 Z" fill="${hairL}"/>
    <!-- хвостики с бантиками -->
    <circle cx="56" cy="88" r="10" fill="${hair}"/>
    <circle cx="164" cy="88" r="10" fill="${hair}"/>
    <path d="M46 80 L40 62 L58 70 Z" fill="#e86a5a"/><path d="M66 80 L72 62 L54 70 Z" fill="#e86a5a"/>
    <path d="M154 80 L148 62 L166 70 Z" fill="#e86a5a"/><path d="M174 80 L180 62 L162 70 Z" fill="#e86a5a"/>
    <path d="M52 84 L48 106 L60 106 Z" fill="${hairL}"/>
    <path d="M168 84 L172 106 L160 106 Z" fill="${hairL}"/>
    <!-- брови -->
    <path d="M80 126 Q92 120 104 124" stroke="${hairD}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M116 124 Q128 120 140 126" stroke="${hairD}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- глаза с ресницами -->
    <ellipse cx="93" cy="140" rx="8.5" ry="10.5" fill="#fff"/>
    <ellipse cx="127" cy="140" rx="8.5" ry="10.5" fill="#fff"/>
    <circle cx="94" cy="142" r="5.2" fill="#3a2c1e"/><circle cx="126" cy="142" r="5.2" fill="#3a2c1e"/>
    <circle cx="96" cy="139" r="1.7" fill="#fff"/><circle cx="128" cy="139" r="1.7" fill="#fff"/>
    <path d="M83 132 Q86 128 90 130" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M102 131 Q106 128 110 131" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M137 132 Q140 128 144 130" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M118 131 Q122 128 126 131" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- нос -->
    <path d="M110 149 C108 154 110 158 113 157" stroke="${skinD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <!-- улыбка -->
    <path d="M98 170 Q110 182 122 170" stroke="#c06a5e" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <!-- румянец -->
    <ellipse cx="78" cy="162" rx="9.5" ry="6" fill="rgba(235,130,120,.35)"/>
    <ellipse cx="142" cy="162" rx="9.5" ry="6" fill="rgba(235,130,120,.35)"/>
  </svg>`;
}
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
      <select id="obClass"><option value="1">1 класс</option><option value="2">2 класс</option><option value="3">3 класс</option><option value="4">4 класс</option><option value="5">5 класс</option><option value="6">6 класс</option><option selected value="7">7 класс</option><option value="8">8 класс</option><option value="9">9 класс</option></select>
      <label>Уровень</label>
      <select id="obLevel"><option value="novice">🌱 Новичок — объясняй побольше</option><option value="pro">⚡ Уже решал олимпиады</option></select>
      <label>Герой</label>
      <div class="gender-pick">
        <button type="button" class="gender-btn ${chosenGender==='boy'?'sel':''}" onclick="pickGender('boy')">👦 Мальчик</button>
        <button type="button" class="gender-btn ${chosenGender==='girl'?'sel':''}" onclick="pickGender('girl')">👧 Девочка</button>
      </div>
      <div id="chitPrev" style="display:flex;justify-content:center;margin:2px 0 6px">${figSVG(chosenGender)}</div>
      <label>Цвет хитона</label>
      <div class="swatches" style="justify-content:center">${COLORS.map((c,i)=>`<div class="sw ${i===0?'sel':''}" style="background:${c}" data-c="${c}" onclick="pickCol(this)"></div>`).join('')}</div>
      <button class="btn" style="width:100%" onclick="finishOnboard()">В путь →</button>
    </div></div>`;
  hud();
}
function pickGender(g){
  chosenGender=g;
  document.querySelectorAll('.gender-btn').forEach(b=>b.classList.toggle('sel', b.getAttribute('onclick').indexOf("'"+g+"'")>=0));
  const p=document.getElementById('chitPrev'); if(p) p.innerHTML=figSVG(g);
}
function pickCol(el){
  chosenCol=el.dataset.c;
  document.querySelectorAll('.sw').forEach(x=>x.classList.toggle('sel',x===el));
  const p=document.getElementById('chitPrev'); if(p) p.innerHTML=figSVG(chosenGender);
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
  DB.profile={ name, color:chosenCol, gender:chosenGender,
    klass:document.getElementById('obClass').value,
    level:document.getElementById('obLevel').value,
    limitMin:45, createdAt:Date.now() };
  DB.sessionStart=Date.now(); save(); showNav(true); go('path'); toast('Добро пожаловать, '+name+'!');
}
/* ---------- ВЫХОД ИЗ ПРОФИЛЯ ---------- */
function logoutProfile(){
  if(!DB.profile) return;
  if(!confirm('Выйти из профиля «'+DB.profile.name+'»? Прогресс сохранится — вернёмся к начальному экрану.')) return;
  DB.profile=null;
  DB.sessionStart=Date.now();
  save();
  try{ if(typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state()) AGENTLIVE.stop(); }catch(e){}
  showNav(false);
  go('onboard');
  toast('До встречи! Можно войти другому Исследователю.');
}
/* ---------- ПУТЬ ---------- */
const ISLANDS=[
  {name:'Начальная школа', ico:'🧸', dsc:'1–4 класс · счёт, сложение, умножение, доли'},
  {name:'Сиракузы', ico:'🏛', dsc:'Математика · логика, комбинаторика, инварианты'},
  {name:'Ньютон', ico:'🍎', dsc:'Физика · механика, энергия, электричество'},
  {name:'Лавуазье', ico:'⚗️', dsc:'Химия · молекулы, растворы, газы'},
  {name:'Информатика', ico:'💻', dsc:'Информатика · двоичный код, алгоритмы, логика'}];
function isJunior(){ try{ return !!DB.profile&&/^[1-4]$/.test(String(DB.profile.klass||'').trim()); }catch(e){ return false; } }
function taskPool(){ return isJunior()? window.ARH_TASKS.filter(t=>t.island==='Начальная школа') : window.ARH_TASKS.filter(t=>t.island!=='Начальная школа'); }
function islandVisible(I){ return isJunior()? (I.name==='Начальная школа') : (I.name!=='Начальная школа'); }
function nextTask(){ return taskPool().filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0] || window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0] || null; }
function poolDone(){ const ts=taskPool(); return ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length; }
function islStats(name){
  const ts=window.ARH_TASKS.filter(t=>t.island===name);
  const done=ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  return {total:ts.length, done};
}
function ringHTML(pct, size, label){
  // анимированное кольцо прогресса
  const r=(size-10)/2, c=2*Math.PI*r;
  const off=c*(1-Math.min(100,Math.max(0,pct))/100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring" style="--off:${off};--len:${c}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="5"/>
    <circle class="ring-fg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--brass)" stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" transform="rotate(-90 ${size/2} ${size/2})"/>
    <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" fill="#e8e0cc" font-size="${size*0.21}" font-family="Georgia,serif">${label}</text>
  </svg>`;
}
function renderPath(){
  const pool=taskPool();
  const doneN=pool.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const pctAll=pool.length? Math.round(doneN/pool.length*100):0;
  const next = pool.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0]
            || window.ARH_TASKS.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0];
  const s=document.getElementById('screen');
  const rank=rankName();
  const heroName=esc(DB.profile?DB.profile.name:'');
  // общее кольцо с именем
  const hero=`<div class="path-hero card" style="display:flex;align-items:center;gap:16px">
      ${ringHTML(pctAll, 92, pctAll+'%')}
      <div style="flex:1">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted)">Острова Познания</div>
        <div style="font-size:22px;font-weight:bold;color:var(--ivory);margin:2px 0">${heroName||'Исследователь'} <span class="rank-badge">${esc(rank)}</span></div>
        <div style="font-size:12.5px;color:var(--muted);line-height:1.5">Решено <b style="color:var(--brass)">${doneN}</b> из ${pool.length}${isJunior()?' в начальной школе':' на карте'} · серия ${DB.streak}🔥</div>
        <div class="spark-row">
          ${doneN>0?`<span class="spark done">✦</span>`:''}${(DB.streak||0)>=3?`<span class="spark done">🔥</span>`:''}${pctAll>=50?`<span class="spark done">🏆</span>`:''}
        </div>
      </div>
    </div>`;
  const nextBtn = next
    ? `<button class="btn pulse" style="width:100%;margin:12px 0 4px" onclick="go('task-${next.id}')">🎯 Продолжить: ${esc(next.title)}</button>`
    : `<div class="card" style="text-align:center;color:var(--ok);font-size:14px">🏆 Все задачи решены! Ты — настоящий ${esc(rank)}!</div>`;
  const legendCard=`<div class="path-legend" onclick="go('legend')">
      <span style="font-size:26px">📜</span>
      <span style="flex:1;text-align:left"><b style="color:var(--glow)">Легенда об Архимеде</b><br>
      <span class="small" style="color:var(--muted)">Кто он и откуда острова — читай историю</span></span>
      <span style="color:var(--brass)">→</span></div>`;
  const cards=ISLANDS.filter(islandVisible).map((I,i)=>{
    const st=islStats(I.name); const pct=st.total? Math.round(st.done/st.total*100):0;
    const islSorted=window.ARH_TASKS.filter(t=>t.island===I.name).sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id));
    const themes=[...new Set(islSorted.map(t=>themeOf(t)))];
    const themeRows=themes.map(th=>{
      const tt=islSorted.filter(t=>themeOf(t)===th);
      const d=tt.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
      return `<div class="theme-row"><span class="tn">${esc(th)}</span><div class="bar"><i style="width:${d/tt.length*100}%"></i></div><span class="pc">${d}/${tt.length}</span></div>`;
    }).join('');
    const glow = pct===100? 'rgba(95,154,106,.5)' : 'rgba(217,164,65,.18)';
    return `<div class="island path-island" style="animation-delay:${0.06*i}s" onclick="go('island-${encodeURIComponent(I.name)}')">
      <div class="pi-head">
        ${ringHTML(pct, 58, I.ico)}
        <div style="flex:1;min-width:0">
          <div class="nm">${esc(I.name)}</div>
          <div class="sub">${esc(I.dsc)}</div>
          <div class="small" style="margin-top:5px;color:var(--glass)">${st.done}/${st.total} · <span class="pct">${pct}%</span></div>
        </div>
      </div>
      ${themeRows}</div>`;
  }).join('');
  s.innerHTML=hero+nextBtn+legendCard+`<div class="path-map">${cards}</div>`;
  // запускаем анимацию колец после отрисовки
  requestAnimationFrame(()=>{ document.querySelectorAll('.ring-fg').forEach(el=>{ el.style.strokeDashoffset=getComputedStyle(el.parentNode).getPropertyValue('--off'); }); });
  hud();
}
/* ---------- ОСТРОВ ---------- */
function renderIsland(name){
  const s=document.getElementById('screen');
  const ts=window.ARH_TASKS.filter(t=>t.island===name).sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id));
  let prevCls=null;
  const rows=ts.map(t=>{
    const cl=clsKey(t);
    let head='';
    if(cl!==prevCls){
      prevCls=cl;
      head=`<div style="margin:14px 2px 4px;color:var(--brass);font-weight:bold;font-size:12.5px;letter-spacing:.05em">${esc(cl? clsFromKey(cl):'Общие задачи')}</div>`;
    }
    const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
    return head+`<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')">
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
let LB={ island:'all', status:'all', cls:'all', open:{} };
function clsHeadRow(label){ return `<div style="margin:12px 2px 4px;color:var(--brass);font-weight:bold;font-size:12.5px;letter-spacing:.05em">${esc(label)}</div>`; }
function thClean(th){ return th.replace(/^\d{1,2}(?:\s*[-–—]\s*\d{1,2})?\s*кл(?:асс)?\s*·\s*/,''); }
function secRows(items){
  const by={};
  items.forEach(t=>{ const k=clsKey(t)||'__none'; (by[k]=by[k]||[]).push(t); });
  const order=Object.keys(by).sort((a,b)=>(a==='__none'?999:+a)-(b==='__none'?999:+b));
  return order.map(k=>{
    const arr=by[k].slice().sort((a,b)=>a.diff-b.diff||a.id.localeCompare(b.id));
    const label=k==='__none' ? 'Общие задачи' : clsFromKey(k);
    const byTh={};
    arr.forEach(t=>{ const th=thClean(themeOf(t))||themeOf(t); (byTh[th]=byTh[th]||[]).push(t); });
    const rows=Object.keys(byTh).map(th=>`<div class="small" style="margin:7px 4px 4px;color:var(--muted);font-size:11px;letter-spacing:.08em;text-transform:uppercase">${esc(th)}</div>`+
      byTh[th].map(taskRow).join('')).join('');
    return clsHeadRow(label)+rows;
  }).join('');
}
function taskRow(t){
  const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
  return `<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')"><span class="st">${done?'✅':'🔒'}</span>
    <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${esc(themeOf(t))}</div></div>
    <span class="lvl">ур. ${t.diff}</span></div>`;
}
function libIsland(){ try{ if(typeof isJunior==='function'&&isJunior()) return 'Начальная школа'; }catch(e){}
  return LB.island==='all'? 'all' : LB.island; }
function renderLibrary(){
  const s=document.getElementById('screen');
  const junior=typeof isJunior==='function'&&isJunior();
  const islands=ISLANDS.filter(islandVisible);
  const status=LB.status||'all';
  const statFilter=t=> status==='all'? true : status==='todo'? !(DB.tasks[t.id]&&DB.tasks[t.id].done) : !!(DB.tasks[t.id]&&DB.tasks[t.id].done);
  const clsFilter=t=> LB.cls==='all' || clsKey(t)===LB.cls;
  const selIsl=libIsland();
  const allFit = window.ARH_TASKS.filter(t=>islandVisible({name:t.island})).filter(statFilter).filter(clsFilter);
  const doneFit=allFit.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const todoFit=allFit.length-doneFit;
  const statBadge = status==='all'? `всего ${allFit.length}` : status==='todo'? `осталось ${todoFit}` : `решено ${doneFit}`;
  // доступные классы для чипов — из задач текущего выбора
  const clsSource = selIsl==='all'
    ? window.ARH_TASKS.filter(t=>islandVisible({name:t.island})).filter(statFilter)
    : window.ARH_TASKS.filter(t=>t.island===selIsl).filter(statFilter);
  const clsOpts=[...new Set(clsSource.map(clsKey).filter(Boolean))].sort((a,b)=>+a.split('-')[0]-+b.split('-')[0]);
  const clsChips = clsOpts.length
    ? `<div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <button class="chip fb ${LB.cls==='all'?'on':''}" onclick="libPick('cls','all')">Все классы</button>
        ${clsOpts.map(c=>`<button class="chip fb ${LB.cls===c?'on':''}" onclick="libPick('cls','${c}')">${clsFromKey(c)}</button>`).join('')}
      </div>` : '';
  const tabAll = junior? [] : [{
    key:'all', ico:'🗺', name:'Все',
    items: allFit,
    done: doneFit, total: allFit.length }];
  const tabIsls = islands.map(I=>{
    const items=window.ARH_TASKS.filter(t=>t.island===I.name&&statFilter(t));
    return { key:I.name, ico:I.ico, name:I.name, items, done: items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length, total: items.length };
  }).filter(g=>g.total>0);
  const tabs=[...tabAll, ...tabIsls];
  const tabHTML=tabs.map(g=>{
    const on = selIsl===g.key;
    const p=g.total? Math.round(g.done/g.total*100):0;
    return `<button class="btab ${on?'on':''}" onclick="libPick('island','${g.key}')">
      <span class="bt-ico">${g.ico}</span>
      <span class="bt-name">${g.key==='all'? 'Все': esc(g.name)}</span>
      <span class="bt-bar"><i style="width:${p}%"></i></span>
    </button>`;}).join('');
  const groups = (selIsl==='all'? islands : islands.filter(I=>I.name===selIsl))
    .map(I=>({ I, items: window.ARH_TASKS.filter(t=>t.island===I.name&&statFilter(t)&&clsFilter(t))
      .sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id)) }))
    .filter(g=>g.items.length);
  const content = selIsl!=='all'
    ? (()=>{ const g=groups[0]; if(!g) return '';
        const gd=g.items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
        return `<div class="book-subj-head">
            <span class="bsh-ico">${g.I.ico}</span>
            <span><b>${esc(g.I.name)}</b><br>
            <span class="small" style="color:var(--muted)">${esc(g.I.dsc)} · ${gd}/${g.items.length} решено</span></span>
          </div>${secRows(g.items)}`; })()
    : groups.map((g,i)=>{
        const open = LB.open[g.I.name]===true || (LB.open[g.I.name]===undefined && i===0);
        const gd=g.items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
        return `<div class="book-sec">
          <div class="bs-head" onclick="libToggle('${esc(g.I.name)}')">
            <span class="bs-ico">${g.I.ico}</span>
            <span style="flex:1;text-align:left"><b>${esc(g.I.name)}</b>
              <span class="small" style="color:var(--muted);display:block">${esc(g.I.dsc)}</span></span>
            <span class="pr2">${gd}/${g.items.length} <i class="caret ${open?'down':''}">▸</i></span>
          </div>
          ${open? secRows(g.items) : ''}
        </div>`;}).join('');
  s.innerHTML=`<h2>📚 Банк задач <span class="small">(${statBadge})</span></h2>
    <div class="small" style="margin-bottom:8px">Все задачи по темам и классам — от простых к сложным. Приёмы сначала объясняет Архимед в «Пути».</div>
    <div class="btabs" style="margin-bottom:10px">${tabHTML}</div>
    ${clsChips}
    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      ${[['all','Все задачи'],['todo','🔒 Осталось решить'],['done','✅ Решено']].map(([v,lab])=>
        `<button class="chip fb ${status===v?'on':''}" onclick="libPick('status','${v}')">${lab}</button>`).join('')}
    </div>
    ${content}`;
  hud();
}
function libPick(k,v){ LB[k]=v; renderLibrary(); }
function libToggle(isl){
  LB.open[isl]= !(LB.open[isl]===true);
  renderLibrary();
}
/* ---------- вспомогательное ---------- */
function toast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('show');
  clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('show'),2000); }
function showConfetti(){ const d=document.createElement('div'); d.className='confetti';
  for(let i=0;i<70;i++){ const p=document.createElement('span'); p.className='confetti-piece';
    p.style.left=Math.random()*100+'%'; p.style.background=COLORS[i%COLORS.length];
    p.style.animationDelay=Math.random()*0.6+'s'; p.style.animationDuration=1.4+Math.random()*1.3+'s'; d.appendChild(p); }
  document.body.appendChild(d); setTimeout(()=>d.remove(),3800); }
