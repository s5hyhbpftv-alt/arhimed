/* АРХИМЕД MVP · kid.js — код ребёнка и связь с приложением родителя.
   При первом входе ребёнок получает код вида ARH-XXXX-XX: по нему родитель
   открывает /MVP/родитель/ и видит отчёт. Прогресс уезжает на сервер (шлюз),
   оттуда же приходят лимит времени и заметки родителя. */
'use strict';

const KID_KEY = 'arh_kid_v1';
function kidSaveState(){
  try{
    const k = kidSt();
    localStorage.setItem(KID_KEY, JSON.stringify({code: k.code || '', token: k.token || '',
      created: k.created || 0, introShown: k.introShown || 0, noteSeen: k.noteSeen || 0,
      noteToast: k.noteToast || 0, limitDay: k.limitDay || null,
      limits: k.limits || {}, notes: k.notes || [], srvUpdated: k.srvUpdated || 0}));
  }catch(e){}
}
function kidLoadState(){
  try{
    const s = JSON.parse(localStorage.getItem(KID_KEY) || 'null');
    if (s && s.code && s.token) DB.kid = Object.assign({}, DB.kid || {}, s);
  }catch(e){}
}
function kidApiUrl(){
  const p = location.pathname || '';
  const i = p.indexOf('/MVP/');
  return (i >= 0 ? p.slice(0, i) : '') + '/api/kid';
}
function kidSt(){ DB.kid = DB.kid || {}; return DB.kid; }
function kidReady(){ const k = kidSt(); return !!(k.code && k.token); }
function kidCode(){ const k = kidSt(); return k.code || ''; }

function kidPost(payload){
  return fetch(kidApiUrl(), {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload), cache: 'no-store'}).then(r => r.json());
}

/* --- 1. код создаётся при первом входе --- */
function kidEnsure(){
  const k = kidSt();
  if (kidReady() || k.busy) return Promise.resolve(k);
  k.busy = 1;
  return kidPost({act: 'new'}).then(r => {
    delete k.busy;
    if (r && r.ok && r.code && r.token){
      k.code = r.code; k.token = r.token; k.created = Date.now();
      try{ save(); }catch(e){}
      kidSaveState();
      kidRender();
      kidPush(1);
    }
    return k;
  }).catch(() => { delete k.busy; return k; });
}

/* --- 2. снимок прогресса: только то, что нужно отчёту --- */
function kidSnapshot(){
  const days = {};
  Object.keys(DB.days || {}).sort().slice(-120).forEach(key => {
    const r = DB.days[key] || {};
    days[key] = {min: r.min || 0, tasks: r.tasks || 0, wrong: r.wrong || 0,
      lessonSteps: r.lessonSteps || 0, lessons: r.lessons || 0};
  });
  const tasks = {};
  let ids = Object.keys(DB.tasks || {});
  ids.sort((a, b) => ((DB.tasks[b] || {}).ts || 0) - ((DB.tasks[a] || {}).ts || 0));
  ids.slice(0, 1500).forEach(id => {
    const t = DB.tasks[id] || {};
    tasks[id] = {done: t.done ? 1 : 0, tries: t.tries || 0, wrong: t.wrong || 0, ts: t.ts || 0};
  });
  const lessons = {};
  Object.keys(DB.lessons || {}).forEach(id => {
    const r = DB.lessons[id] || {};
    lessons[id] = {done: !!r.done, stars: r.stars || 0, tasks: (r.tasks || []).length};
  });
  const events = (DB.events || []).slice(-300).map(e => ({ts: e.ts, type: e.type, id: e.id, ok: e.ok, stars: e.stars, steps: e.steps}));
  return {profile: DB.profile || {}, points: DB.points || 0, streak: DB.streak || 0, best: DB.best || 0,
    totalMin: DB.totalMin || 0,
    today: {date: (DB.today || {}).date || null, minutes: (DB.today || {}).minutes || 0},
    tours: (DB.tours || []).slice(-5),
    days: days, tasks: tasks, lessons: lessons, events: events,
    sentAt: Date.now(), build: (window.ARH_BUILD || '')};
}

/* --- 3. отправка на сервер: не чаще раза в 15 секунд --- */
let _kidPushAt = 0, _kidPushBusy = false;
function kidPush(force){
  if (!kidReady()) { kidEnsure(); return; }
  const now = Date.now();
  if (!force && now - _kidPushAt < 15000) return;
  if (_kidPushBusy) return;
  _kidPushAt = now; _kidPushBusy = true;
  const k = kidSt();
  kidPost({act: 'sync', code: k.code, token: k.token, data: kidSnapshot()}).then(r => {
    _kidPushBusy = false;
    if (r && r.ok){ kidTake(r); }
  }).catch(() => { _kidPushBusy = false; });
}

/* --- 4. что прислал родитель: лимит и заметки --- */
function kidTake(r){
  const k = kidSt();
  if (!r) return;
  if (r.limits) k.limits = r.limits;
  if (r.notes) k.notes = r.notes;
  if (typeof r.updated === 'number') k.srvUpdated = r.updated;
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
  kidNoteBadge();
}
function kidPull(){
  if (!kidReady()) { kidEnsure(); return; }
  const k = kidSt();
  kidPost({act: 'take', code: k.code, token: k.token}).then(r => { if (r && r.ok) kidTake(r); }).catch(() => {});
}

/* --- 5. лимит времени --- */
function kidLimit(){ const k = kidSt(); return +((k.limits || {}).minutes || 0); }
function kidTodayMin(){ return +((DB.today || {}).minutes || 0); }
function kidLimitOver(){ const lim = kidLimit(); return lim > 0 && kidTodayMin() >= lim; }
function kidLimitCheck(){
  if (!kidLimitOver()) return;
  const day = new Date().toDateString();
  if (kidSt().limitDay === day) return;
  kidSt().limitDay = day;
  try{ save(); }catch(e){}
  kidSaveState();
  try{ toast('На сегодня лимит занятий выполнен — родитель увидит прогресс'); }catch(e){}
}

/* --- 6. заметки родителя --- */
function kidNotes(){ return (kidSt().notes || []).slice(-8).reverse(); }
function kidNoteNew(){
  const seen = kidSt().noteSeen || 0;
  return kidNotes().filter(n => (n.ts || 0) > seen);
}
function kidIntroDone(){
  kidSt().introShown = 1;
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
}
function kidNoteSeen(){
  const n = kidNotes()[0];
  if (n) kidSt().noteSeen = n.ts || Date.now();
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
}
function kidNoteBadge(){
  const n = kidNoteNew();
  if (!n.length) return;
  const last = kidSt().noteToast;
  if (last === n[0].ts) return;
  kidSt().noteToast = n[0].ts;
  try{ save(); }catch(e){}
  kidSaveState();
  try{ toast('Заметка от родителя: ' + String(n[0].text).slice(0, 60)); }catch(e){}
}

/* --- 7. полоска над экраном: код, лимит, заметки --- */
function kidCopyCode(){
  const code = kidCode();
  try{
    navigator.clipboard.writeText(code).then(() => toast('Код скопирован: ' + code), () => toast(code));
  }catch(e){ toast(code); }
}
function kidCodeCard(){
  const k = kidSt();
  if (!k.code) return `<div class="card"><div class="small">Код для родителя появится, когда устройство будет в сети.</div></div>`;
  const lim = kidLimit(), mins = kidTodayMin();
  return `<div class="card" style="margin-bottom:10px">
    <div class="small" style="color:var(--muted);font-size:11.5px">Код для родителя · приложение «Родитель»</div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:6px">
      <b style="font-family:Georgia,serif;font-size:22px;color:var(--brass);letter-spacing:.08em">${esc(k.code)}</b>
      <button class="btn ghost" style="min-height:36px;padding:6px 12px" onclick="kidCopyCode()">Скопировать</button>
    </div>
    <div class="small" style="margin-top:8px">Родитель открывает <a href="parent/" style="color:var(--brass)">123.teramont.pro/MVP/parent/</a>,
      вводит этот код и придумывает PIN из 4 цифр. Тогда ему будет виден отчёт о занятиях.</div>
    <div class="rod-row" style="margin-top:8px">
      <a class="btn ghost" style="text-decoration:none;display:inline-flex;align-items:center;min-height:38px;padding:7px 12px" href="parent/">Открыть приложение родителя →</a>
    </div>
    ${lim ? `<div class="small" style="margin-top:8px">Лимит занятий на день: <b>${lim} мин</b> · сегодня ${mins} мин${mins >= lim ? ' — лимит выполнен' : ''}</div>` : ''}
  </div>`;
}
function kidRender(){
  const host = document.querySelector('.wrap');
  if (!host) return;
  let el = document.getElementById('kidBanner');
  const k = kidSt();
  const notes = kidNoteNew();
  const parts = [];
  /* при первом входе сразу показываем код: родителю его надо увидеть и записать */
  if (k.code && !k.introShown){
    parts.push(`<div class="card" style="border-color:rgba(255,215,106,.6);margin-bottom:10px">
      <div class="small" style="color:var(--brass);font-size:11.5px">🎁 Твой код для родителя</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px">
        <b style="font-family:Georgia,serif;font-size:23px;color:var(--brass);letter-spacing:.08em">${esc(k.code)}</b>
        <button class="btn ghost" style="min-height:36px;padding:6px 12px" onclick="kidCopyCode()">Скопировать</button>
      </div>
      <div class="small" style="margin-top:8px">Покажи код родителю: он откроет
        <a href="parent/" style="color:var(--brass)">123.teramont.pro/MVP/parent/</a>, введёт код,
        придумает PIN — и увидит отчёт о твоих занятиях.</div>
      <div class="rod-row" style="margin-top:8px">
        <a class="btn ghost" style="text-decoration:none;display:inline-flex;align-items:center;min-height:38px;padding:7px 12px" href="parent/">Я родитель — открыть →</a>
        <button class="btn" style="min-height:38px;padding:7px 14px" onclick="kidIntroDone()">Понятно</button>
      </div>
    </div>`);
  }
  if (notes.length){
    parts.push(`<div class="card" style="border-color:rgba(217,164,65,.55);margin-bottom:10px">
      <div class="small" style="color:var(--brass);font-size:11.5px">📩 От родителя · ${pvDate(notes[0].ts)}</div>
      <div style="font-size:14.5px;line-height:1.5;margin-top:4px">${esc(notes[0].text)}</div>
      <button class="btn ghost" style="margin-top:8px;min-height:36px;padding:6px 12px" onclick="kidNoteSeen()">Понятно</button>
    </div>`);
  }
  if (kidLimitOver()){
    parts.push(`<div class="card" style="border-color:rgba(232,106,90,.5);margin-bottom:10px">
      <div class="small" style="color:var(--danger);font-size:11.5px">⏱ Лимит на сегодня выполнен</div>
      <div style="font-size:14px;margin-top:4px">Занимался ${kidTodayMin()} мин из ${kidLimit()}. Можно отдохнуть — прогресс уже отправлен родителю.</div>
    </div>`);
  } else if (kidLimit()){
    parts.push(`<div class="card" style="margin-bottom:10px">
      <div class="small">⏱ Сегодня ${kidTodayMin()} мин из ${kidLimit()} — идёшь по плану.</div>
    </div>`);
  }
  if (!k.code){
    parts.push(`<div class="card" style="margin-bottom:10px"><div class="small">Код для родителя появится, когда устройство будет в сети.</div></div>`);
  }
  if (!parts.length){ if (el) el.remove(); return; }
  if (!el){
    el = document.createElement('div');
    el.id = 'kidBanner';
    const first = host.querySelector('header');
    if (first && first.nextSibling) host.insertBefore(el, first.nextSibling); else host.insertBefore(el, host.firstChild);
  }
  el.innerHTML = parts.join('');
}

function kidBoot(){
  kidLoadState();
  kidEnsure().then(() => { kidPush(1); kidPull(); });
  kidRender();
  setInterval(kidPull, 60000);
  try{
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') kidPull(); else kidPush(1);
    });
  }catch(e){}
  /* уход со страницы: обычный fetch может не успеть, отправляем маячок */
  try{
    window.addEventListener('pagehide', () => {
      if (!kidReady()) return;
      const k = kidSt();
      const body = JSON.stringify({act: 'sync', code: k.code, token: k.token, data: kidSnapshot()});
      try{ navigator.sendBeacon(kidApiUrl(), new Blob([body], {type: 'application/json'})); }catch(e){}
    });
  }catch(e){}
}
