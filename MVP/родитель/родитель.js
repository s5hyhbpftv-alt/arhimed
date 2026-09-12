/* АРХИМЕД · приложение родителя.
   Вход: код ребёнка (создаётся в детском приложении при первом входе) + PIN из 4 цифр.
   Отчёт рисует уже готовый renderDashboard() из dashboard.js — он читает DB,
   поэтому прогресс ребёнка подставляем в DB. Лимит и заметки живут на сервере. */
'use strict';

/* --- то, что в детском приложении делают app.js и simulator.js --- */
function hud(){}
function showNav(){}
function go(t){ location.href = '../index.html#' + (t || 'path'); }
function openLessonView(id){ location.href = '../index.html#lesson-' + id; }
function openTask(){ toast('Эту задачу можно открыть в приложении ребёнка'); }
function tourCount(){ return 8; }
function fmt(sec){ const m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

const ROD_KEY = 'arh_rod_v1';
let ROD = {code: '', pin: '', remember: 1, limits: {}, notes: [], updated: 0, child: {}};
let ROD_DATA = null;

function toast(t){
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = t;
  el.classList.add('on');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('on'), 2600);
}
function rodUrl(){
  const p = location.pathname || '';
  const i = p.indexOf('/MVP/');
  return (i >= 0 ? p.slice(0, i) : '') + '/api/kid';
}
function rodPost(payload){
  return fetch(rodUrl(), {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload), cache: 'no-store'}).then(r => r.json());
}
function rodNormCode(v){
  let s = String(v || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (s.indexOf('ARH') === 0) s = s.slice(3);
  s = s.slice(0, 6);
  return 'ARH-' + s.slice(0, 4) + (s.length > 4 ? '-' + s.slice(4) : '');
}
function rodStateSave(){
  try{
    if (ROD.remember) localStorage.setItem(ROD_KEY, JSON.stringify({code: ROD.code, pin: ROD.pin, remember: 1}));
    else localStorage.removeItem(ROD_KEY);
  }catch(e){}
}
function rodStateLoad(){
  try{
    const raw = localStorage.getItem(ROD_KEY);
    if (raw){ const s = JSON.parse(raw); if (s && s.code) ROD = Object.assign(ROD, s); }
  }catch(e){}
}
function rodClear(){
  ROD.pin = ''; ROD_DATA = null;
  try{ localStorage.removeItem(ROD_KEY); }catch(e){}
  rodScreenLogin('enter');
}
function rodErr(msg){ const el = document.getElementById('rodErr'); if (el) el.textContent = msg || ''; }

/* ---------- вход ---------- */
function rodScreenLogin(mode){
  const s = document.getElementById('screen');
  const first = (mode === 'setpin');
  document.getElementById('rodTop').innerHTML = '';
  document.getElementById('rodHud').innerHTML = '';
  document.getElementById('rodSub').textContent = 'приложение родителя';
  s.innerHTML = `<div class="card" style="max-width:440px;margin:18px auto">
    <div style="text-align:center"><div style="font-size:38px">🛡</div>
      <h2 style="margin:6px 0">${first ? 'Придумайте PIN' : 'Кабинет родителя'}</h2>
      <div class="small" style="margin-bottom:10px">${first
        ? 'Код принят. PIN из 4 цифр будет спрашиваться при каждом входе — так отчёт не увидит посторонний.'
        : 'Введите код ребёнка. Он показан в детском приложении на вкладке «Родитель».'}</div></div>
    <label class="small">Код ребёнка</label>
    <input class="gate-in code" id="rodCode" value="${esc(ROD.code || '')}" placeholder="ARH-XXXX-XX"
      autocomplete="off" spellcheck="false" inputmode="text" ${first ? 'readonly' : ''}>
    <label class="small">${first ? 'PIN из 4 цифр' : 'PIN из 4 цифр'}</label>
    <input class="gate-in pin" id="rodPin" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off">
    ${first ? `<label class="small">Повторите PIN</label>
      <input class="gate-in pin" id="rodPin2" inputmode="numeric" maxlength="4" placeholder="••••" autocomplete="off">` : ''}
    <label class="small" style="display:flex;gap:8px;align-items:center;margin:8px 0 2px">
      <input type="checkbox" id="rodRemember" ${ROD.remember ? 'checked' : ''}> запомнить вход на этом устройстве
    </label>
    <div class="rod-err" id="rodErr"></div>
    <button class="btn" style="width:100%" onclick="${first ? 'rodClaim()' : 'rodEnter()'}">${first ? 'Задать PIN и открыть отчёт' : 'Открыть отчёт'}</button>
    <div class="small" style="margin-top:8px">Код создаётся сам при первом входе ребёнка в общее приложение.
      Если кода нет — откройте детское приложение и загляните на вкладку «Родитель».</div>
  </div>`;
  const c = document.getElementById('rodCode');
  if (!first && c){
    c.addEventListener('input', () => { const pos = c.value.length; c.value = rodNormCode(c.value); });
    c.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('rodPin').focus(); });
  }
  const p = document.getElementById('rodPin');
  if (p){
    p.focus();
    p.addEventListener('input', () => { p.value = p.value.replace(/\D/g, '').slice(0, 4); });
    p.addEventListener('keydown', e => { if (e.key === 'Enter') (first ? rodClaim() : rodEnter()); });
  }
  const p2 = document.getElementById('rodPin2');
  if (p2){
    p2.addEventListener('input', () => { p2.value = p2.value.replace(/\D/g, '').slice(0, 4); });
    p2.addEventListener('keydown', e => { if (e.key === 'Enter') rodClaim(); });
  }
}

function rodReadForm(){
  const codeEl = document.getElementById('rodCode');
  const pinEl = document.getElementById('rodPin');
  ROD.code = codeEl ? (rodNormCode(codeEl.value) || '') : ROD.code;
  ROD.pin = pinEl ? pinEl.value.replace(/\D/g, '') : '';
  const rem = document.getElementById('rodRemember');
  ROD.remember = rem ? (rem.checked ? 1 : 0) : 1;
}
function rodEnter(){
  rodReadForm();
  rodErr('');
  if (!/^ARH-[A-Z0-9]{4}-[A-Z0-9]{2}$/.test(ROD.code)){ rodErr('Код выглядит так: ARH-4K7Q-2M'); return; }
  if (!/^\d{4}$/.test(ROD.pin)){ rodErr('PIN — четыре цифры'); return; }
  const btn = document.querySelector('#screen .btn'); if (btn) btn.disabled = true;
  rodPost({act: 'get', code: ROD.code, pin: ROD.pin}).then(r => {
    if (btn) btn.disabled = false;
    if (r && r.ok){ rodStateSave(); rodApply(r); return; }
    if (r && r.err === 'nopin'){ rodScreenLogin('setpin'); rodErr('PIN ещё не задан — придумайте его'); return; }
    if (r && r.err === 'blocked'){ rodErr('Слишком много неверных попыток. Подождите ' + Math.ceil((r.wait || 600) / 60) + ' мин.'); return; }
    if (r && r.err === 'pin'){ rodErr('PIN не подходит'); return; }
    if (r && r.err === 'notfound'){ rodErr('Такого кода нет. Проверьте код в детском приложении.'); return; }
    rodErr('Не получилось связаться с сервером. Проверьте интернет.');
  }).catch(() => { if (btn) btn.disabled = false; rodErr('Нет связи с сервером.'); });
}
function rodClaim(){
  rodReadForm();
  rodErr('');
  const p2 = document.getElementById('rodPin2');
  const pin2 = p2 ? p2.value.replace(/\D/g, '') : '';
  if (!/^\d{4}$/.test(ROD.pin)){ rodErr('PIN — четыре цифры'); return; }
  if (pin2 && pin2 !== ROD.pin){ rodErr('PIN и повтор не совпадают'); return; }
  const btn = document.querySelector('#screen .btn'); if (btn) btn.disabled = true;
  rodPost({act: 'claim', code: ROD.code, pin: ROD.pin}).then(r => {
    if (btn) btn.disabled = false;
    if (r && r.ok){
      rodStateSave(); rodApply(r);
      /* первый вход: если лимит ещё не задан — ставим ориентир 45 минут,
         родитель может его изменить кнопкой в отчёте */
      if (!+((r.limits || {}).minutes || 0)){
        rodPost({act: 'set', code: ROD.code, pin: ROD.pin, limits: {minutes: 45}}).then(x => {
          if (x && x.ok){ rodApply(x); toast('Кабинет привязан · лимит 45 мин в день'); }
        }).catch(() => {});
      } else { toast('Кабинет привязан к коду ' + ROD.code); }
      return;
    }
    if (r && r.err === 'notfound'){ rodErr('Такого кода нет. Проверьте код в детском приложении.'); return; }
    if (r && r.err === 'pin'){ rodErr('Этот код уже защищён другим PIN'); return; }
    rodErr('Не получилось связаться с сервером.');
  }).catch(() => { if (btn) btn.disabled = false; rodErr('Нет связи с сервером.'); });
}

/* ---------- отчёт ---------- */
function rodApply(r){
  ROD_DATA = r.data || {};
  ROD.limits = r.limits || {};
  ROD.notes = r.notes || [];
  ROD.updated = r.updated || 0;
  ROD.child = r.child || (r.data || {}).profile || {};
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
    else if (r && r.err === 'pin'){ rodClear(); rodErr('PIN больше не подходит — войдите заново'); }
  }).catch(() => {});
}
function rodDate(ts){ if (!ts) return '—'; const d = new Date(ts); return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + ' ' +
  ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
function rodTop(){
  const c = ROD.child || {};
  const lim = +((ROD.limits || {}).minutes || 0);
  const notes = (ROD.notes || []).slice(-6).reverse();
  document.getElementById('rodSub').textContent = 'приложение родителя · ' + rodDate(ROD.updated);
  document.getElementById('rodHud').innerHTML =
    `<span class="chip">код <b>${esc(ROD.code)}</b></span>` +
    `<button class="chip" style="cursor:pointer" onclick="rodRefresh()">↻ Обновить</button>` +
    `<button class="chip" style="cursor:pointer" onclick="rodClear()">⏻ Выйти</button>`;
  document.getElementById('rodTop').innerHTML =
    `<div class="card" style="margin-bottom:14px">
      <div class="rod-key">
        <div>
          <div class="small" style="font-size:11px;letter-spacing:.18em;text-transform:uppercase">код ребёнка</div>
          <div class="rod-code">${esc(ROD.code)}</div>
        </div>
        <div class="small" style="flex:1;min-width:190px">Данные приходят с устройства ребёнка.
          Обновлено: ${rodDate(ROD.updated)}. Лимит занятий: <b>${lim ? lim + ' мин/день' : 'не задан'}</b>.</div>
      </div>
      <div class="rod-sep"><b>заметка ребёнку</b><i></i></div>
      <textarea class="rod-note-in" id="rodNoteIn" placeholder="Например: Вика, сегодня без спешки — сначала разбор, потом задачи."></textarea>
      <div class="rod-row" style="margin-top:8px">
        <button class="btn" style="min-height:40px;padding:8px 14px" onclick="rodNoteSend()">Отправить заметку</button>
        <span class="small">Ребёнок увидит её при следующем входе в приложение.</span>
      </div>
      ${notes.length ? notes.map(n => `<div class="rod-note"><div class="t">${esc(n.text)}</div><div class="d">${rodDate(n.ts)}</div></div>`).join('')
        : '<div class="small" style="margin-top:8px">Заметок пока нет.</div>'}
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
window.rodClear = rodClear;

/* кнопки отчёта, которые в детском приложении меняют локальный прогресс:
   здесь они работают через сервер или честно говорят, что делать */
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
    } else if (r && r.err === 'pin'){ rodClear(); }
    else toast('Не получилось сохранить лимит');
  }).catch(() => toast('Нет связи с сервером'));
};
window.pvDemo = function(){ toast('Демо-данные есть в приложении ребёнка'); };
window.resetAll = function(){ toast('Сброс прогресса делает приложение ребёнка'); };

/* ---------- старт ---------- */
window.addEventListener('DOMContentLoaded', function(){
  rodStateLoad();
  if (ROD.code && ROD.pin){
    rodPost({act: 'get', code: ROD.code, pin: ROD.pin}).then(r => {
      if (r && r.ok) rodApply(r);
      else if (r && r.err === 'nopin') rodScreenLogin('setpin');
      else { rodScreenLogin('enter'); if (r && r.err === 'pin') rodErr('PIN больше не подходит — войдите заново'); }
    }).catch(() => { rodScreenLogin('enter'); rodErr('Нет связи с сервером.'); });
  } else {
    rodScreenLogin('enter');
  }
  setInterval(rodRefresh, 120000);
});
