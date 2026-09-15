/* АРХИМЕД · приложение родителя.
   Первый вход: код ребёнка → свой PIN. Дальше вход только по PIN,
   на экране — имя, класс и аватар ребёнка. Отсюда же можно отвязать
   устройство ребёнка и удалить свою учётную запись. */
'use strict';

/* --- то, что в детском приложении делают app.js и simulator.js --- */
function hud(){}
function showNav(){}
function go(t){ location.href = '../index.html#' + (t || 'path'); }
function openLessonView(id){ location.href = '../index.html#lesson-' + id; }
function openTask(){ toast('Эту задачу можно открыть в приложении ребёнка'); }
function tourCount(){ return 8; }
function fmt(sec){ const m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

const ROD_KEY = 'arh_rod_v2';
let ROD = {code: '', pin: '', remember: 1, card: null, limits: {}, notes: [], updated: 0, child: {}, linked: 0, role: ''};
let ROD_DATA = null;
let ROD_PICK = [];      /* что родитель отметил, но ещё не отправил */
let ROD_Q = '';         /* строка поиска по каталогу класса */

function toast(t){
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = t;
  el.classList.add('on');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('on'), 2800);
}
function rodUrl(){
  const p = location.pathname || '';
  const i = p.indexOf('/MVP/');
  return (i >= 0 ? p.slice(0, i) : '') + '/api/kid';
}
function rodPost(payload){
  const ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  const t = setTimeout(() => { try{ if (ctl) ctl.abort(); }catch(e){} }, 12000);
  return fetch(rodUrl(), {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload), cache: 'no-store', signal: ctl ? ctl.signal : undefined})
    .then(r => r.json()).finally(() => clearTimeout(t));
}
function rodNormCode(v){
  let s = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (s.indexOf('ARH') === 0) s = s.slice(3);
  s = s.slice(0, 6);
  return 'ARH-' + s.slice(0, 4) + (s.length > 4 ? '-' + s.slice(4) : '');
}
function rodStateSave(){
  try{
    /* PIN на устройстве не храним: при каждом входе спрашиваем только его */
    if (ROD.remember) localStorage.setItem(ROD_KEY, JSON.stringify({code: ROD.code, card: ROD.card, remember: 1, role: ROD.role || ''}));
    else localStorage.removeItem(ROD_KEY);
  }catch(e){}
}
function rodStateLoad(){
  try{
    let s = JSON.parse(localStorage.getItem(ROD_KEY) || 'null');
    /* переносим вход из первой версии приложения, чтобы не вводить всё заново */
    if (!s){
      const old = JSON.parse(localStorage.getItem('arh_rod_v1') || 'null');
      if (old && old.code) s = {code: old.code, card: null, remember: old.remember == null ? 1 : old.remember, role: old.role || ''};
    }
    if (s && s.code) ROD = Object.assign(ROD, s);
    ROD.pin = '';
  }catch(e){}
}
function rodForgetAccount(){ try{ localStorage.removeItem(ROD_KEY); }catch(e){} }
function rodErr(msg){ const el = document.getElementById('rodErr'); if (el) el.textContent = msg || ''; }
function rodAvaFile(kind){ return '../img/ava/' + kind + '.png?v=591'; }
function rodAvaImg(kind){
  return `<img src="${rodAvaFile(kind)}" alt="" draggable="false">`;
}
function rodAva(c, size){
  c = c || {};
  const s = size || 56, col = c.color || '#d9a441';
  const kind = c.gender === 'girl' ? 'girl' : (c.gender === 'boy' ? 'boy' : '');
  const inner = kind
    ? rodAvaImg(kind)
    : (c.name ? String(c.name).trim()[0].toUpperCase() : '🧒');
  return `<span class="rod-ava" style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;
    border-radius:50%;font-size:${Math.round(s * 0.46)}px;background:${col}22;border:2px solid ${col};
    box-shadow:0 0 22px -10px ${col};overflow:hidden">${inner}</span>`;
}
function rodAvaFace(c){
  c = c || {};
  const kind = c.gender === 'girl' ? 'girl' : (c.gender === 'boy' ? 'boy' : '');
  return kind ? rodAvaImg(kind) : (c.name ? String(c.name).trim()[0].toUpperCase() : '🧒');
}
function rodParentAva(){
  return (ROD.role === 'mom' || ROD.role === 'dad') ? rodAvaImg(ROD.role) : '';
}
function rodWhoHtml(){
  return `<div class="small" style="margin:10px 0 6px;text-align:center">Кто входит в кабинет</div>
    <div class="rod-who" role="radiogroup" aria-label="Папа или мама">
      <button type="button" class="rod-who-btn ${ROD.role==='dad'?'sel':''}" data-role="dad" aria-pressed="${ROD.role==='dad'?'true':'false'}" onclick="rodPickRole('dad')">
        <img src="${rodAvaFile('dad')}" alt="">
        <span>Папа</span>
      </button>
      <button type="button" class="rod-who-btn ${ROD.role==='mom'?'sel':''}" data-role="mom" aria-pressed="${ROD.role==='mom'?'true':'false'}" onclick="rodPickRole('mom')">
        <img src="${rodAvaFile('mom')}" alt="">
        <span>Мама</span>
      </button>
    </div>`;
}
window.rodPickRole = function(role){
  ROD.role = (role === 'mom' ? 'mom' : 'dad');
  rodStateSave();
  document.querySelectorAll('.rod-who-btn, .rod-who-mini').forEach(b => {
    const on = b.getAttribute('data-role') === ROD.role;
    b.classList.toggle('sel', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  rodErr('');
};
function rodChildLine(){
  const c = ROD.card || ROD.child || {};
  return `${esc(c.name || 'Ученик')}${c.klass ? ' · ' + esc(c.klass) + ' класс' : ''}`;
}
function rodEmpty(){
  document.getElementById('rodHud').innerHTML = '';
  document.getElementById('rodTop').innerHTML = '';
  document.getElementById('rodSub').textContent = 'приложение родителя';
}

/* ---------- первый вход: код ребёнка ---------- */
function rodScreenLogin(){
  rodEmpty();
  document.getElementById('screen').innerHTML = `<div class="card rod-login">
    <div style="text-align:center"><div class="rod-login-ico" aria-hidden="true"><img src="../img/icons/parent-192.png" width="84" height="84" alt=""></div>
      <h2 style="margin:6px 0">Кабинет родителя</h2>
      <div class="small" style="margin-bottom:12px">Код ребёнка написан в детском приложении —
        карточка «Твой код для родителя». Дальше попросим ваш PIN из 4 цифр.</div></div>
    ${rodWhoHtml()}
    <label class="small" for="rodCode">Код ребёнка</label>
    <input class="gate-in code" id="rodCode" value="${esc(ROD.code || '')}" placeholder="ARH-XXXX-XX"
      autocomplete="off" spellcheck="false" autocapitalize="characters" inputmode="text" maxlength="12">
    <label class="small rod-check">
      <input type="checkbox" id="rodRemember" ${ROD.remember ? 'checked' : ''}> запомнить вход на этом устройстве
    </label>
    <div class="rod-err" id="rodErr"></div>
    <button class="btn rod-go" id="rodGo" type="button" onclick="rodByCode()">Продолжить</button>
    <div class="small" style="margin-top:10px">Код появляется сам при первом входе ребёнка.
      PIN родителя и PIN ребёнка — разные.</div>
  </div>`;
  const c = document.getElementById('rodCode');
  c.addEventListener('input', () => { c.value = rodNormCode(c.value); rodErr(''); });
  c.addEventListener('keydown', e => { if (e.key === 'Enter') rodByCode(); });
  try{ c.focus(); c.setSelectionRange(c.value.length, c.value.length); }catch(e){ try{ c.focus(); }catch(x){} }
}

function rodReadCode(){
  const el = document.getElementById('rodCode');
  if (el) ROD.code = rodNormCode(el.value);
  const rem = document.getElementById('rodRemember');
  if (rem) ROD.remember = rem.checked ? 1 : 0;
  return ROD.code;
}

/* код ввели: узнаём, задан ли уже PIN родителя */
function rodByCode(){
  const code = rodReadCode();
  rodErr('');
  if (ROD.role !== 'dad' && ROD.role !== 'mom'){ rodErr('Отметьте, кто вы — папа или мама.'); return; }
  if (!/^ARH-[A-Z0-9]{4}-[A-Z0-9]{2}$/.test(code)){ rodErr('Код выглядит так: ARH-4K7Q-2M'); return; }
  const btn = document.getElementById('rodGo');
  if (btn){ btn.disabled = true; btn.textContent = 'Проверяем…'; }
  rodPost({act: 'probe', code: code}).then(r => {
    if (!r || !r.ok){
      rodErr(r && r.err === 'notfound' ? 'Такого кода нет. Проверьте код в детском приложении.' : 'Нет связи с сервером.');
      return;
    }
    ROD.code = code;
    rodStateSave();
    if (!r.pinSet) rodCreatePin(r);
    else rodEnterPin(r);
  }).catch(() => rodErr('Нет связи с сервером.')).finally(() => {
    const b = document.getElementById('rodGo');
    if (b){ b.disabled = false; b.textContent = 'Продолжить'; }
  });
}

/* первый раз: родитель придумывает свой PIN (дважды) */
function rodCreatePin(){
  PinPad.set({
    avatar: rodParentAva(),
    title: 'Придумайте свой PIN',
    subtitle: 'Четыре цифры — их будет спрашивать кабинет родителя',
    foot: 'PIN знаете только вы · нажмите «Ввод»',
    cancel: 'Назад к коду',
    onCancel: () => { setTimeout(rodScreenLogin, 40); }
  }).then(pin => {
    if (!pin){ rodScreenLogin(); return; }
    rodPost({act: 'claim', code: ROD.code, pin: pin}).then(r => {
      if (r && r.ok){ rodAfterLogin(r, pin); return; }
      if (r && r.err === 'pin'){ rodEnterPin(); return; }
      toast('Не получилось привязаться — проверьте связь');
      rodScreenLogin();
    }).catch(() => { toast('Нет связи с сервером'); rodScreenLogin(); });
  });
}

/* обычный вход: только PIN */
function rodEnterPin(){
  if (ROD.role !== 'dad' && ROD.role !== 'mom'){ rodScreenLogin(); return; }
  const c = ROD.card || {};
  const known = !!(c.name || c.klass);
  PinPad.ask({
    avatar: rodParentAva(),
    title: known ? rodChildLine() : 'PIN родителя',
    subtitle: known ? 'Ваш PIN — четыре цифры, затем «Ввод»'
                    : 'Код ' + esc(ROD.code) + ' · PIN, который задали при привязке',
    cancel: 'Другой код ребёнка',
    onCancel: rodAnotherCode,
    foot: 'PIN родителя и PIN ребёнка — разные',
    verify: pin => rodPost({act: 'get', code: ROD.code, pin: pin}).then(r => {
      if (r && r.ok){ rodAfterLogin(r, pin); return true; }
      if (r && r.err === 'pin') return 'PIN не подходит';
      if (r && r.err === 'blocked') return 'Слишком много попыток. Подождите ' + Math.ceil((r.wait || 600) / 60) + ' мин.';
      if (r && r.err === 'nopin'){ rodForgetAccount(); setTimeout(rodScreenLogin, 60); return 'Аккаунт удалён — введите код заново'; }
      if (r && r.err === 'notfound') return 'Код больше не существует';
      return 'Нет связи с сервером';
    })
  }).then(pin => {
    if (!pin && !ROD.pin) rodScreenLogin();
  });
}

function rodAfterLogin(r, pin){
  ROD.pin = pin || ROD.pin;
  if (r.child && (r.child.name || r.child.klass)) ROD.card = r.child;
  rodStateSave();
  rodApply(r);
  /* ребёнок мог только что задать PIN — подождём снимок, чтобы имя и «привязано» подтянулись */
  if (!ROD.linked || !(ROD.card && ROD.card.name)){
    setTimeout(() => rodRefresh(1), 1200);
    setTimeout(() => rodRefresh(1), 3500);
  }
}

/* сменить код (другой ребёнок) */
function rodAnotherCode(){
  if (PinPad.isOpen()) PinPad.hide();
  rodForgetAccount();
  ROD.code = ''; ROD.pin = ''; ROD.card = null;
  setTimeout(rodScreenLogin, 80);
}

/* ---------- отчёт ---------- */
/* Каталог приходит короткими ключами (он едет по сети), а отчёт написан на
   полных именах полей. Разворачиваем один раз здесь, чтобы dashboard.js не
   знал про сокращения. */
function rodCatalog(cat){
  if (!cat || !cat.tasks || !cat.tasks.length) return null;
  /* Острова и темы приехали словарём — разворачиваем по номерам. Старые
     каталоги (без словаря) несли строки прямо в задаче: их тоже понимаем. */
  const т = cat.themes || null, о = cat.islands || null;
  const стр = (сл, v) => (сл && typeof v === 'number') ? (сл[v] || '') : (v || '');
  return {
    class: cat.class || '',
    tasks: cat.tasks.map(x => ({id: x.id, title: x.t, island: стр(о, x.i),
                                theme: стр(т, x.th), diff: x.d || 1})),
    lessons: (cat.lessons || []).map(x => ({id: x.id, title: x.t, ico: x.ic, src: x.s, steps: x.st || 0}))
  };
}
function rodApply(r){
  ROD_DATA = r.data || {};
  if (r.catalog !== undefined) ROD.catalog = rodCatalog(r.catalog);
  ROD.assigned = r.assigned || null;
  ROD.limits = r.limits || {};
  ROD.notes = r.notes || [];
  ROD.updated = r.updated || 0;
  ROD.child = r.child || (r.data || {}).profile || {};
  ROD.linked = +r.linked || 0;
  if (ROD.child && (ROD.child.name || ROD.child.klass)) ROD.card = ROD.child;
  const snap = JSON.parse(JSON.stringify(ROD_DATA || {}));
  DB = Object.assign(emptyState(), snap);
  DB.каталог = ROD.catalog || null;   /* отчёт считается по классу ребёнка */
  DB.days = DB.days || {}; DB.events = DB.events || []; DB.tasks = DB.tasks || {}; DB.lessons = DB.lessons || {};
  DB.profile = DB.profile || {};
  DB.profile.limitMin = +((ROD.limits || {}).minutes || 0);
  DB.pvPeriod = DB.pvPeriod || '7';
  renderDashboard();
  rodTop();
  hud();
}
let _rodBusy = false;
function rodRefreshMark(state){
  /* Кнопка обязана показывать, что её нажали: раньше она молчала и при
     успехе, и при обрыве связи — и выглядела сломанной. */
  const б = document.getElementById('rodBtnRefresh');
  if (!б) return;
  б.disabled = state === 'идёт';
  б.style.opacity = state === 'идёт' ? '.55' : '';
  б.innerHTML = state === 'идёт' ? '↻ Обновляю…' : '↻ Обновить';
}
function rodRefresh(тихо){
  if (!ROD.code || !ROD.pin) return;
  if (_rodBusy) return;
  _rodBusy = true;
  rodRefreshMark('идёт');
  const было = ROD.updated || 0;
  rodPost({act: 'get', code: ROD.code, pin: ROD.pin}).then(r => {
    _rodBusy = false;
    if (r && r.ok){
      rodApply(r);                       /* rodTop перерисует кнопку заново */
      if (тихо) return;
      if ((r.updated || 0) > было) toast('Отчёт обновлён');
      else if (!r.updated) toast('Приложение ребёнка ещё ни разу не выходило на связь');
      else toast('Новых занятий нет · последняя связь ' + rodDate(r.updated));
      return;
    }
    rodRefreshMark('');
    if (r && r.err === 'pin'){ ROD.pin = ''; rodStateSave(); rodEnterPin(); return; }
    if (r && r.err === 'nopin'){ rodForgetAccount(); rodScreenLogin(); return; }
    if (r && r.err === 'blocked'){ toast('Слишком много попыток PIN, подождите ' + (r.wait || 60) + ' с'); return; }
    if (r && r.err === 'notfound'){ toast('Такого кода на сервере нет'); return; }
    toast('Не получилось обновить' + (r && r.err ? ' (' + r.err + ')' : ''));
  }).catch(() => {
    /* Молчать здесь нельзя: для родителя это и выглядело как «кнопка не работает». */
    _rodBusy = false; rodRefreshMark('');
    toast('Нет связи с сервером — проверьте интернет и попробуйте ещё раз');
  });
}
function rodDate(ts){ if (!ts) return '—'; const d = new Date(ts); return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + ' ' +
  ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }

function rodStale(){
  if (!ROD.updated) return '';
  const days = Math.floor((Date.now() - ROD.updated) / 86400000);
  if (days < 3) return '';
  return `<div class="small" style="margin-top:6px;color:#e8a08f">Данных нет уже ${days} ${days % 10 === 1 && days % 100 !== 11 ? 'день' : (days % 10 >= 2 && days % 10 <= 4 && (days % 100 < 12 || days % 100 > 14) ? 'дня' : 'дней')} —
    проверьте, что приложение ребёнка открывалось и устройство привязано.</div>`;
}
function rodTop(){
  const lim = +((ROD.limits || {}).minutes || 0);
  const notes = (ROD.notes || []).slice(-6).reverse();
  document.getElementById('rodSub').textContent = 'приложение родителя · ' + rodDate(ROD.updated);
  document.getElementById('rodHud').innerHTML =
    `<span class="chip">код <b>${esc(ROD.code)}</b></span>` +
    `<button class="chip" id="rodBtnRefresh" type="button" style="cursor:pointer" onclick="rodRefresh()">↻ Обновить</button>` +
    `<button class="chip" style="cursor:pointer" onclick="rodLock()">⏻ Выйти</button>`;
  document.getElementById('rodTop').innerHTML =
    `<div class="card" style="margin-bottom:14px">
      <div class="rod-key">
        ${rodAva(ROD.card || ROD.child, 56)}
        <div style="flex:1;min-width:170px">
          <div class="small" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase">ученик</div>
          <div style="font-size:19px;color:var(--brass)">${rodChildLine()}</div>
          <div class="small">Обновлено: ${rodDate(ROD.updated)} · лимит: <b>${lim ? lim + ' мин/день' : 'не задан'}</b></div>
          <div class="small" style="margin-top:6px">В кабинет вхожу как
            <button type="button" class="rod-who-mini ${ROD.role==='dad'?'sel':''}" data-role="dad" onclick="rodPickRole('dad')">Папа</button>
            <button type="button" class="rod-who-mini ${ROD.role==='mom'?'sel':''}" data-role="mom" onclick="rodPickRole('mom')">Мама</button>
          </div>
          ${rodStale()}
        </div>
        <div class="small" style="min-width:150px">Код: <b style="color:var(--brass)">${esc(ROD.code)}</b><br>
          Устройство: <b>${ROD.linked ? 'привязано' : 'отвязано'}</b></div>
      </div>

      ${(!ROD.catalog && ROD.updated) ? `<div class="small" style="margin-top:10px;color:#e8c07a">
        Список задач ещё не приехал: приложение ребёнка пришлёт его при следующем выходе на связь.
        До этого счётчики «решено из…» будут пустыми.</div>` : ''}

      <div class="rod-sep"><b>заметка ребёнку</b><i></i></div>
      <textarea class="rod-note-in" id="rodNoteIn" placeholder="Например: Вика, сегодня без спешки — сначала разбор, потом задачи."></textarea>
      <div class="rod-row" style="margin-top:8px">
        <button class="btn" style="min-height:40px;padding:8px 14px" onclick="rodNoteSend()">Отправить заметку</button>
        <span class="small">Ребёнок увидит её во весь экран при следующем входе.</span>
      </div>
      ${notes.length ? notes.map(n => `<div class="rod-note"><div class="t">${esc(n.text)}</div><div class="d">${rodDate(n.ts)}</div></div>`).join('')
        : '<div class="small" style="margin-top:8px">Заметок пока нет.</div>'}

      <div class="rod-sep"><b>задать ребёнку задачи</b><i></i></div>
      ${rodAssignHtml()}

      <div class="rod-sep"><b>устройство и аккаунт</b><i></i></div>
      <div class="small">Привязка держится на устройстве ребёнка. Отвязка вернёт устройство в исходное
        состояние: ребёнок введёт свой PIN заново (или создаст новый код), прогресс на устройстве сохранится.</div>
      <div class="rod-row" style="margin-top:10px">
        <button class="btn ghost" style="min-height:42px;padding:8px 14px" onclick="rodUnlink()">${ROD.linked ? 'Отвязать устройство ребёнка' : 'Устройство уже отвязано'}</button>
        <button class="btn ghost" style="min-height:42px;padding:8px 14px;border-color:rgba(232,106,90,.6);color:#e89a8f" onclick="rodDeleteAccount()">Удалить аккаунт родителя</button>
      </div>
    </div>`;
}

/* Выдача заданий.
   Каталог здесь — тот, что прислал ребёнок: только задачи его класса.
   Родителю семиклассника задачи первого класса не показываются вовсе. */
function rodAssignHtml(){
  const кат = (ROD.catalog && ROD.catalog.tasks) || [];
  const выдано = ((ROD.assigned || {}).list) || [];
  const решено = id => !!(ROD_DATA && ROD_DATA.tasks && ROD_DATA.tasks[id] && ROD_DATA.tasks[id].done);
  if (!кат.length){
    return `<div class="small">Список задач появится, когда приложение ребёнка выйдет на связь:
      оно присылает то, что открыто именно его классу.</div>` +
      (выдано.length ? rodAssignedList(выдано, решено) : '');
  }
  const q = ROD_Q.trim().toLowerCase();
  const найдено = (q ? кат.filter(t =>
        (t.title || '').toLowerCase().indexOf(q) >= 0 ||
        (t.theme || '').toLowerCase().indexOf(q) >= 0 ||
        (t.island || '').toLowerCase().indexOf(q) >= 0)
      : кат).slice(0, 8);
  const строка = t => {
    const взята = ROD_PICK.some(x => x.id === t.id);
    return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid var(--line)">
      <button class="btn ghost" style="min-height:34px;padding:4px 10px;min-width:34px;
        ${взята ? 'border-color:var(--brass);color:var(--brass)' : ''}"
        onclick="rodPick('${esc(t.id)}')">${взята ? '✓' : '+'}</button>
      <div style="flex:1;min-width:0">
        <div style="font-size:14px">${esc(t.title)}${решено(t.id) ? ' <span class="small" style="color:#7fc4a6">· уже решена</span>' : ''}</div>
        <div class="small" style="font-size:11.5px">${esc(t.island)} · ${esc(t.theme)} · уровень ${t.diff}</div>
      </div></div>`;
  };
  return `
    <div class="small">Каталог ${кат.length} ${скл(кат.length,'задача','задачи','задач')} — только ${ROD.catalog.class ? ROD.catalog.class + '-го класса' : 'класса ребёнка'}.</div>
    <input class="rod-note-in" id="rodFind" style="min-height:42px;margin-top:8px" placeholder="Найти задачу: тема, название или остров"
      value="${esc(ROD_Q)}" oninput="rodFindInput(this.value)">
    <div style="margin-top:4px">${найдено.map(строка).join('') || '<div class="small" style="padding:8px 0">Ничего не нашлось.</div>'}</div>
    ${ROD_PICK.length ? `<div class="rod-row" style="margin-top:10px">
      <button class="btn" style="min-height:40px;padding:8px 14px" onclick="rodAssignSend()">
        Отправить ${ROD_PICK.length} ${скл(ROD_PICK.length,'задачу','задачи','задач')}</button>
      <button class="btn ghost" style="min-height:40px;padding:8px 14px" onclick="rodPickClear()">Сбросить</button>
    </div>` : '<div class="small" style="margin-top:8px">Отметьте плюсом задачи — ребёнок увидит их списком при следующем входе.</div>'}
    ${rodAssignedList(выдано, решено)}`;
}
function rodAssignedList(выдано, решено){
  if (!выдано.length) return '';
  const n = выдано.filter(з => !решено(з.id)).length;
  return `<div style="margin-top:12px">
    <div class="small" style="color:var(--brass)">Сейчас выдано · ${выдано.length} ·
      ${n ? ('не решено ' + n) : 'всё решено'}</div>
    ${выдано.map(з => `<div class="rod-note"><div class="t">${решено(з.id) ? '✓ ' : '• '}${esc(з.title || з.id)}</div></div>`).join('')}
    <button class="btn ghost" style="margin-top:8px;min-height:36px;padding:6px 12px" onclick="rodAssignClear()">Снять задание</button>
  </div>`;
}
function скл(n, одна, две, много){
  const д = Math.abs(n) % 100, е = д % 10;
  if (д > 10 && д < 20) return много;
  if (е > 1 && е < 5) return две;
  if (е === 1) return одна;
  return много;
}
window.rodFindInput = function(v){
  ROD_Q = v || '';
  /* перерисовываем только список, чтобы не терять фокус в поле поиска */
  const б = document.getElementById('rodFind');
  const было = б ? б.selectionStart : null;
  rodTop();
  const н2 = document.getElementById('rodFind');
  if (н2){ н2.focus(); if (было != null) try{ н2.setSelectionRange(было, было); }catch(e){} }
};
window.rodPick = function(id){
  const t = ((ROD.catalog || {}).tasks || []).find(x => x.id === id);
  if (!t) return;
  const i = ROD_PICK.findIndex(x => x.id === id);
  if (i >= 0) ROD_PICK.splice(i, 1);
  else { if (ROD_PICK.length >= 20){ toast('Больше двадцати задач за раз — это уже не задание'); return; }
         ROD_PICK.push({id: t.id, title: t.title}); }
  rodTop();
};
window.rodPickClear = function(){ ROD_PICK = []; rodTop(); };
window.rodAssignSend = function(){
  if (!ROD_PICK.length) return;
  const список = ROD_PICK.slice();
  rodPost({act: 'set', code: ROD.code, pin: ROD.pin, assign: список}).then(r => {
    if (r && r.ok){ ROD_PICK = []; rodApply(r);
      toast('Отправлено: ' + список.length + ' ' + скл(список.length,'задача','задачи','задач')); }
    else toast('Не получилось отправить' + (r && r.err ? ' (' + r.err + ')' : ''));
  }).catch(() => toast('Нет связи с сервером'));
};
window.rodAssignClear = function(){
  rodPost({act: 'set', code: ROD.code, pin: ROD.pin, assign: []}).then(r => {
    if (r && r.ok){ rodApply(r); toast('Задание снято'); }
  }).catch(() => toast('Нет связи с сервером'));
};

window.rodNoteSend = function(){
  const el = document.getElementById('rodNoteIn');
  const text = el ? el.value.trim() : '';
  if (!text){ toast('Напишите пару слов'); return; }
  rodPost({act: 'set', code: ROD.code, pin: ROD.pin, note: text}).then(r => {
    if (r && r.ok){ ROD.notes = r.notes || []; if (el) el.value = ''; rodTop(); toast('Заметка отправлена'); }
    else toast('Не получилось отправить');
  }).catch(() => toast('Нет связи с сервером'));
};
window.rodRefresh = rodRefresh;

/* выход: аккаунт помним, просим только PIN */
window.rodLock = function(){
  if (PinPad.isOpen()) PinPad.hide();
  ROD.pin = '';
  rodStateSave();
  rodEmpty();
  document.getElementById('screen').innerHTML = '';
  setTimeout(rodEnterPin, 60);
  toast('До встречи! Вход — по PIN');
};
window.rodAnotherCode = rodAnotherCode;

/* ---------- диалог подтверждения в стиле проекта ---------- */
function rodConfirm(title, text, okLabel, danger){
  return new Promise(resolve => {
    const el = document.createElement('div');
    el.className = 'rod-dim';
    el.innerHTML = `<div class="rod-dcard">
      <div class="rod-dkick">${esc(title)}</div>
      <div class="rod-dtext">${text}</div>
      <div class="rod-drow">
        <button type="button" class="btn" style="${danger ? 'background:linear-gradient(180deg,#e88a7a,#c0483c);border-color:rgba(255,180,170,.6);color:#2a0f0b' : ''}" id="rcOk">${esc(okLabel)}</button>
        <button type="button" class="btn ghost" id="rcNo">Отмена</button>
      </div>
    </div>`;
    document.body.appendChild(el);
    const close = v => { el.remove(); resolve(v); };
    el.querySelector('#rcOk').onclick = () => close(true);
    el.querySelector('#rcNo').onclick = () => close(false);
    el.addEventListener('click', e => { if (e.target === el) close(false); });
  });
}

window.rodUnlink = function(){
  if (!ROD.linked){ toast('Устройство уже отвязано'); return; }
  rodConfirm('Отвязать устройство',
    'Ребёнок на своём устройстве увидит экран «Устройство отвязано» и сможет привязаться заново своим PIN. ' +
    'Прогресс и заметки сохранятся.',
    'Отвязать').then(ok => {
    if (!ok) return;
    rodPost({act: 'unlink', code: ROD.code, pin: ROD.pin}).then(r => {
      if (r && r.ok){ ROD.linked = 0; rodTop(); toast('Устройство отвязано'); }
      else toast('Не получилось отвязать');
    }).catch(() => toast('Нет связи с сервером'));
  });
};
window.rodDeleteAccount = function(){
  rodConfirm('Удалить аккаунт родителя',
    'Будут удалены PIN родителя, лимит, заметки и отчёт. Устройство ребёнка отвяжется. ' +
    'Отменить это нельзя. Прогресс на устройстве ребёнка останется.',
    'Удалить навсегда', true).then(ok => {
    if (!ok) return;
    rodConfirm('Точно удалить?', 'Это последний шаг — аккаунт родителя будет удалён.', 'Да, удалить', true).then(ok2 => {
      if (!ok2) return;
      rodPost({act: 'delparent', code: ROD.code, pin: ROD.pin}).then(r => {
        if (r && r.ok){
          rodForgetAccount();
          ROD = {code: '', pin: '', remember: 1, card: null, limits: {}, notes: [], updated: 0, child: {}, linked: 0, role: ''};
          rodEmpty();
          document.getElementById('screen').innerHTML = '';
          rodScreenLogin();
          toast('Аккаунт родителя удалён');
        } else toast('Не получилось удалить');
      }).catch(() => toast('Нет связи с сервером'));
    });
  });
};

/* кнопки отчёта, которые в детском приложении меняют локальный прогресс */
window.setLimit = function(){
  const el = document.getElementById('limIn');
  const v = parseInt(el ? el.value : '', 10);
  if (!(v >= 10 && v <= 240)){ toast('Лимит: от 10 до 240 минут'); return; }
  rodPost({act: 'set', code: ROD.code, pin: ROD.pin, limits: {minutes: v}}).then(r => {
    if (r && r.ok){
      ROD.limits = r.limits || {minutes: v};
      DB.profile.limitMin = +((ROD.limits || {}).minutes || v);
      toast('Лимит сохранён: ' + v + ' мин/день');
      renderDashboard();
    } else if (r && r.err === 'pin'){ rodLock(); }
    else toast('Не получилось сохранить лимит');
  }).catch(() => toast('Нет связи с сервером'));
};
window.pvDemo = function(){ toast('Демо-данные есть в приложении ребёнка'); };
window.resetAll = function(){ toast('Сброс прогресса делает приложение ребёнка'); };

/* ---------- старт ---------- */
window.addEventListener('DOMContentLoaded', function(){
  rodStateLoad();
  if (ROD.code && (ROD.role === 'dad' || ROD.role === 'mom') && ROD.card){
    rodEnterPin();                  /* приветствие: аватар папы/мамы, имя ребёнка и только PIN */
  } else if (ROD.code && (ROD.role === 'dad' || ROD.role === 'mom')){
    /* код помним, а имя ребёнка ещё не видели — подтянем после ввода PIN */
    rodPost({act: 'probe', code: ROD.code}).then(r => {
      if (r && r.ok) rodEnterPin();
      else if (r && r.err === 'notfound'){ rodForgetAccount(); rodScreenLogin(); }
      else rodEnterPin();
    }).catch(() => rodEnterPin());
  } else {
    rodScreenLogin();
  }
  setInterval(rodRefresh, 120000);
});
