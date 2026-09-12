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
let ROD = {code: '', pin: '', remember: 1, card: null, limits: {}, notes: [], updated: 0, child: {}, linked: 0};
let ROD_DATA = null;

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
    if (ROD.remember) localStorage.setItem(ROD_KEY, JSON.stringify({code: ROD.code, card: ROD.card, remember: 1}));
    else localStorage.removeItem(ROD_KEY);
  }catch(e){}
}
function rodStateLoad(){
  try{
    let s = JSON.parse(localStorage.getItem(ROD_KEY) || 'null');
    /* переносим вход из первой версии приложения, чтобы не вводить всё заново */
    if (!s){
      const old = JSON.parse(localStorage.getItem('arh_rod_v1') || 'null');
      if (old && old.code) s = {code: old.code, card: null, remember: old.remember == null ? 1 : old.remember};
    }
    if (s && s.code) ROD = Object.assign(ROD, s);
    ROD.pin = '';
  }catch(e){}
}
function rodForgetAccount(){ try{ localStorage.removeItem(ROD_KEY); }catch(e){} }
function rodErr(msg){ const el = document.getElementById('rodErr'); if (el) el.textContent = msg || ''; }
function rodAva(c, size){
  c = c || {};
  const g = c.gender === 'girl' ? '👧' : (c.gender === 'boy' ? '👦' : (c.name ? String(c.name).trim()[0].toUpperCase() : '🧒'));
  const s = size || 56, col = c.color || '#d9a441';
  return `<span style="display:inline-flex;align-items:center;justify-content:center;width:${s}px;height:${s}px;
    border-radius:50%;font-size:${Math.round(s * 0.46)}px;background:${col}22;border:2px solid ${col};
    box-shadow:0 0 22px -10px ${col}">${g}</span>`;
}
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
  document.getElementById('screen').innerHTML = `<div class="card" style="max-width:440px;margin:18px auto">
    <div style="text-align:center"><div style="font-size:38px">🛡</div>
      <h2 style="margin:6px 0">Кабинет родителя</h2>
      <div class="small" style="margin-bottom:10px">Введите код ребёнка — он показан в детском приложении
        в карточке «Твой код для родителя».</div></div>
    <label class="small">Код ребёнка</label>
    <input class="gate-in code" id="rodCode" value="${esc(ROD.code || '')}" placeholder="ARH-XXXX-XX"
      autocomplete="off" spellcheck="false">
    <label class="small" style="display:flex;gap:8px;align-items:center;margin:8px 0 2px">
      <input type="checkbox" id="rodRemember" ${ROD.remember ? 'checked' : ''}> запомнить вход на этом устройстве
    </label>
    <div class="rod-err" id="rodErr"></div>
    <button class="btn" style="width:100%" onclick="rodByCode()">Продолжить →</button>
    <div class="small" style="margin-top:8px">Код создаётся сам при первом входе ребёнка в общее приложение.</div>
  </div>`;
  const c = document.getElementById('rodCode');
  c.addEventListener('input', () => { c.value = rodNormCode(c.value); });
  c.addEventListener('keydown', e => { if (e.key === 'Enter') rodByCode(); });
  c.focus();
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
  if (!/^ARH-[A-Z0-9]{4}-[A-Z0-9]{2}$/.test(code)){ rodErr('Код выглядит так: ARH-4K7Q-2M'); return; }
  rodPost({act: 'probe', code: code}).then(r => {
    if (!r || !r.ok){
      rodErr(r && r.err === 'notfound' ? 'Такого кода нет. Проверьте код в детском приложении.' : 'Нет связи с сервером.');
      return;
    }
    if (!r.pinSet) rodCreatePin(r);
    else rodEnterPin(r);
  }).catch(() => rodErr('Нет связи с сервером.'));
}

/* первый раз: родитель придумывает свой PIN (дважды) */
function rodCreatePin(){
  PinPad.set({
    title: 'Придумайте свой PIN',
    subtitle: 'Четыре цифры — их будет спрашивать кабинет родителя',
    foot: 'PIN знаете только вы'
  }).then(pin => {
    if (!pin) return;
    rodPost({act: 'claim', code: ROD.code, pin: pin}).then(r => {
      if (r && r.ok){ rodAfterLogin(r, pin); return; }
      if (r && r.err === 'pin'){ rodEnterPin(); return; }
      toast('Не получилось привязаться — проверьте связь');
    }).catch(() => toast('Нет связи с сервером'));
  });
}

/* обычный вход: только PIN */
function rodEnterPin(){
  const c = ROD.card || {};
  const known = !!(c.name || c.klass);
  PinPad.ask({
    avatar: known ? rodAva(c, 64) : '🔐',
    title: known ? rodChildLine() : 'PIN родителя',
    subtitle: known ? 'Введите свой PIN — четыре цифры'
                    : 'Код ' + esc(ROD.code) + ' · введите PIN, который задали при привязке',
    cancel: true,
    foot: `<span class="pp-link" onclick="rodAnotherCode()">Другой код ребёнка</span>`,
    verify: pin => rodPost({act: 'get', code: ROD.code, pin: pin}).then(r => {
      if (r && r.ok){ rodAfterLogin(r, pin); return true; }
      if (r && r.err === 'pin') return 'PIN не подходит';
      if (r && r.err === 'blocked') return 'Слишком много попыток. Подождите ' + Math.ceil((r.wait || 600) / 60) + ' мин.';
      if (r && r.err === 'nopin'){ rodForgetAccount(); setTimeout(rodScreenLogin, 60); return 'Аккаунт удалён — введите код заново'; }
      if (r && r.err === 'notfound') return 'Код больше не существует';
      return 'Нет связи с сервером';
    })
  });
}

function rodAfterLogin(r, pin){
  ROD.pin = pin || ROD.pin;
  if (r.child && (r.child.name || r.child.klass)) ROD.card = r.child;
  rodStateSave();
  rodApply(r);
}

/* сменить код (другой ребёнок) */
function rodAnotherCode(){
  if (PinPad.isOpen()) PinPad.hide();
  rodForgetAccount();
  ROD.code = ''; ROD.pin = ''; ROD.card = null;
  setTimeout(rodScreenLogin, 80);
}

/* ---------- отчёт ---------- */
function rodApply(r){
  ROD_DATA = r.data || {};
  ROD.limits = r.limits || {};
  ROD.notes = r.notes || [];
  ROD.updated = r.updated || 0;
  ROD.child = r.child || (r.data || {}).profile || {};
  ROD.linked = +r.linked || 0;
  if (ROD.child && (ROD.child.name || ROD.child.klass)) ROD.card = ROD.child;
  const snap = JSON.parse(JSON.stringify(ROD_DATA || {}));
  DB = Object.assign(emptyState(), snap);
  DB.days = DB.days || {}; DB.events = DB.events || []; DB.tasks = DB.tasks || {}; DB.lessons = DB.lessons || {};
  DB.profile = DB.profile || {};
  DB.profile.limitMin = +((ROD.limits || {}).minutes || 0);
  DB.pvPeriod = DB.pvPeriod || '7';
  renderDashboard();
  rodTop();
  hud();
}
function rodRefresh(){
  if (!ROD.code || !ROD.pin) return;
  rodPost({act: 'get', code: ROD.code, pin: ROD.pin}).then(r => {
    if (r && r.ok) rodApply(r);
    else if (r && r.err === 'pin'){ ROD.pin = ''; rodStateSave(); rodEnterPin(); }
    else if (r && r.err === 'nopin'){ rodForgetAccount(); rodScreenLogin(); }
  }).catch(() => {});
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
    `<button class="chip" style="cursor:pointer" onclick="rodRefresh()">↻ Обновить</button>` +
    `<button class="chip" style="cursor:pointer" onclick="rodLock()">⏻ Выйти</button>`;
  document.getElementById('rodTop').innerHTML =
    `<div class="card" style="margin-bottom:14px">
      <div class="rod-key">
        ${rodAva(ROD.card || ROD.child, 56)}
        <div style="flex:1;min-width:170px">
          <div class="small" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase">ученик</div>
          <div style="font-size:19px;color:var(--brass)">${rodChildLine()}</div>
          <div class="small">Обновлено: ${rodDate(ROD.updated)} · лимит: <b>${lim ? lim + ' мин/день' : 'не задан'}</b></div>
          ${rodStale()}
        </div>
        <div class="small" style="min-width:150px">Код: <b style="color:var(--brass)">${esc(ROD.code)}</b><br>
          Устройство: <b>${ROD.linked ? 'привязано' : 'отвязано'}</b></div>
      </div>

      <div class="rod-sep"><b>заметка ребёнку</b><i></i></div>
      <textarea class="rod-note-in" id="rodNoteIn" placeholder="Например: Вика, сегодня без спешки — сначала разбор, потом задачи."></textarea>
      <div class="rod-row" style="margin-top:8px">
        <button class="btn" style="min-height:40px;padding:8px 14px" onclick="rodNoteSend()">Отправить заметку</button>
        <span class="small">Ребёнок увидит её во весь экран при следующем входе.</span>
      </div>
      ${notes.length ? notes.map(n => `<div class="rod-note"><div class="t">${esc(n.text)}</div><div class="d">${rodDate(n.ts)}</div></div>`).join('')
        : '<div class="small" style="margin-top:8px">Заметок пока нет.</div>'}

      <div class="rod-sep"><b>устройство и аккаунт</b><i></i></div>
      <div class="small">Привязка держится на устройстве ребёнка. Отвязка вернёт устройство в исходное
        состояние: ребёнок введёт свой PIN заново (или создаст новый код), прогресс на устройстве сохранится.</div>
      <div class="rod-row" style="margin-top:10px">
        <button class="btn ghost" style="min-height:42px;padding:8px 14px" onclick="rodUnlink()">${ROD.linked ? 'Отвязать устройство ребёнка' : 'Устройство уже отвязано'}</button>
        <button class="btn ghost" style="min-height:42px;padding:8px 14px;border-color:rgba(232,106,90,.6);color:#e89a8f" onclick="rodDeleteAccount()">Удалить аккаунт родителя</button>
      </div>
    </div>`;
}

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
          ROD = {code: '', pin: '', remember: 1, card: null, limits: {}, notes: [], updated: 0, child: {}, linked: 0};
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
  if (ROD.code && ROD.card){
    rodEnterPin();                  /* приветствие: аватар, имя, класс и только PIN */
  } else if (ROD.code){
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
