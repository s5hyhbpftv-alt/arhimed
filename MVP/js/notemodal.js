/* АРХИМЕД MVP · notemodal.js — заметка родителя во весь экран, поверх всех окон.
   Появляется один раз на каждую новую заметку (пока ребёнок не нажмёт «Понятно»),
   очередь из нескольких заметок показывается по одной, закрывается по Esc, Enter,
   клику по фону или кнопке. Пока окно открыто, прокрутка страницы заблокирована. */
'use strict';

const NOTE_MODAL = {id: 'kidNoteModal', queue: [], idx: 0, open: false, focusBack: null, lock: false};

function noteCss(){
  if (document.getElementById('noteFullCss')) return;
  const st = document.createElement('style');
  st.id = 'noteFullCss';
  st.textContent = `
  @keyframes nfIn { from { opacity:0; transform:scale(.96) translateY(10px) } to { opacity:1; transform:none } }
  @keyframes nfGlow { 0%,100% { opacity:.45 } 50% { opacity:.9 } }
  .nf-bg { position:fixed; inset:0; z-index:130; display:flex; align-items:center; justify-content:center;
    padding:max(14px, env(safe-area-inset-top)) 14px max(14px, env(safe-area-inset-bottom));
    background:radial-gradient(120% 80% at 50% 0%, rgba(26,50,38,.96) 0%, rgba(4,9,6,.97) 60%);
    -webkit-backdrop-filter:blur(7px); backdrop-filter:blur(7px); }
  .nf-card { position:relative; width:100%; max-width:560px; max-height:calc(100vh - 28px); overflow:auto;
    background:linear-gradient(180deg,#1a3226,#101f18); border:1px solid rgba(217,164,65,.55);
    border-radius:22px; padding:22px 20px 18px; box-shadow:0 24px 70px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06);
    animation:nfIn .34s cubic-bezier(.2,.9,.25,1) both; }
  .nf-card::before { content:''; position:absolute; left:20px; right:20px; top:0; height:3px; border-radius:0 0 4px 4px;
    background:linear-gradient(90deg,rgba(255,215,106,0),#ffd76a,rgba(255,215,106,0)); animation:nfGlow 2.6s ease-in-out infinite; }
  .nf-top { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
  .nf-ico { width:44px; height:44px; flex:0 0 44px; border-radius:14px; display:flex; align-items:center; justify-content:center;
    font-size:22px; background:rgba(217,164,65,.14); border:1px solid rgba(217,164,65,.5); }
  .nf-kick { font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:#d9a441; }
  .nf-sub { font-size:12.5px; color:#8fa08f; margin-top:3px; }
  .nf-text { font-family:Georgia,'Times New Roman',serif; color:#e8e0cc; font-size:clamp(24px,7.2vw,36px);
    line-height:1.42; margin:16px 0 6px; white-space:pre-wrap; word-break:break-word; }
  .nf-foot { display:flex; gap:10px; flex-wrap:wrap; margin-top:20px; }
  .nf-btn { flex:1 1 46%; min-height:54px; font-size:17px; border-radius:14px; }
  .nf-hint { margin-top:14px; padding-top:12px; font-size:12.5px; color:#8fa08f; text-align:center;
    border-top:1px solid rgba(217,164,65,.25); }
  .nf-hint b { color:#d9a441; font-weight:normal; letter-spacing:.14em; font-size:11.5px; text-transform:uppercase; }
  @media (max-width:400px){ .nf-text { font-size:clamp(23px,7.8vw,32px); } .nf-btn { flex:1 1 100%; } }
  /* низкие экраны (телефон в альбомной ориентации, старые модели): всё должно влезать без обрезки */
  @media (max-height:660px){
    .nf-card { padding:15px 15px 13px; border-radius:18px; }
    .nf-ico { width:38px; height:38px; flex:0 0 38px; font-size:19px; border-radius:12px; }
    .nf-text { font-size:clamp(21px,6.2vw,28px); margin:10px 0 2px; }
    .nf-foot { margin-top:14px; }
    .nf-btn { min-height:48px; font-size:16px; }
    .nf-hint { display:none; }
  }
  @media (prefers-reduced-motion: reduce){ .nf-card { animation:none } .nf-card::before { animation:none } }
  `;
  document.head.appendChild(st);
}

const NOTE_QUEUE_MAX = 8;      /* больше восьми окон подряд показывать нельзя — это уже не помощь */

function noteQueueUnread(){
  try{
    if (typeof kidNotes !== 'function') return {list: [], total: 0};
    const seen = (typeof kidSt === 'function') ? (kidSt().noteSeen || 0) : 0;
    const unread = kidNotes().slice().reverse().filter(n => (n.ts || 0) > seen);
    return {list: unread.slice(0, NOTE_QUEUE_MAX), total: unread.length};
  }catch(e){ return {list: [], total: 0}; }
}

/* открыть окно, если есть непрочитанные заметки */
function noteFullOpen(){
  if (NOTE_MODAL.open || NOTE_MODAL.lock) return false;
  try{ if (!DB || !DB.profile) return false; }catch(e){ return false; }   /* на знакомстве не перебиваем */
  /* и не поверх замка с PIN */
  try{ if (typeof parentNoteAllowed === 'function' && !parentNoteAllowed()) return false; }catch(e){}
  const q = noteQueueUnread();
  if (!q.list.length) return false;
  NOTE_MODAL.queue = q.list;
  NOTE_MODAL.totalUnread = q.total;
  NOTE_MODAL.idx = 0;
  NOTE_MODAL.focusBack = document.activeElement;
  noteFullShow();
  return true;
}

function noteFullShow(){
  noteCss();
  const n = NOTE_MODAL.queue[NOTE_MODAL.idx] || {};
  const total = NOTE_MODAL.queue.length;
  let el = document.getElementById(NOTE_MODAL.id);
  if (!el){
    el = document.createElement('div');
    el.id = NOTE_MODAL.id;
    el.className = 'nf-bg';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'nfTitle');
    el.setAttribute('aria-describedby', 'nfText');
    document.body.appendChild(el);
    el.addEventListener('click', e => { if (e.target === el) noteFullCloseAll(); });
  }
  const last = NOTE_MODAL.idx === total - 1;
  el.innerHTML = `<div class="nf-card">
    <div class="nf-top">
      <div class="nf-ico">📩</div>
      <div style="flex:1">
        <div class="nf-kick" id="nfTitle">Сообщение от родителя</div>
        <div class="nf-sub">${noteDate(n.ts)}${total > 1 ? ' · заметка ' + (NOTE_MODAL.idx + 1) + ' из ' + total : ''}</div>
      </div>
    </div>
    <div class="nf-text" id="nfText">${esc(n.text || '')}</div>
    <div class="nf-foot">
      <button type="button" class="btn nf-btn" id="nfOk" onclick="noteFullNext()">${last ? 'Понятно' : 'Дальше →'}</button>
      <button type="button" class="btn ghost nf-btn" onclick="noteFullCloseAll()">Закрыть</button>
    </div>
    <div class="nf-hint">${last && NOTE_MODAL.totalUnread > total
      ? 'Показаны последние ' + total + ' сообщений из ' + NOTE_MODAL.totalUnread + ' — остальные уже отмечены прочитанными.<br>'
      : ''}Нажми «Понятно» — и вернёшься к занятиям.<br><b>АРХИМЕД · острова познания</b></div>
  </div>`;
  if (!NOTE_MODAL.open){
    NOTE_MODAL.open = true;
    noteScrollLock(true);
    document.addEventListener('keydown', noteKeys, true);
    try{ if (navigator.vibrate) navigator.vibrate(28); }catch(e){}
  }
  const ok = document.getElementById('nfOk');
  if (ok) setTimeout(() => { try{ ok.focus({preventScroll:true}); }catch(e){} }, 30);
}

function noteDate(ts){
  if (!ts) return 'сейчас';
  const d = new Date(ts);
  const p = x => ('0' + x).slice(-2);
  return p(d.getDate()) + '.' + p(d.getMonth() + 1) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}

function noteKeys(e){
  if (!NOTE_MODAL.open) return;
  if (e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); noteFullCloseAll(); }
  else if (e.key === 'Enter'){
    const a = document.activeElement;
    if (a && a.tagName === 'BUTTON' && a.id !== 'nfOk') return;   /* вторую кнопку не перебиваем */
    e.preventDefault(); e.stopPropagation(); noteFullNext();
  } else if (e.key === 'Tab'){
    /* удерживаем фокус внутри окна */
    const btns = [...document.querySelectorAll('#' + NOTE_MODAL.id + ' button')];
    if (!btns.length) return;
    const i = btns.indexOf(document.activeElement);
    const next = e.shiftKey ? (i <= 0 ? btns.length - 1 : i - 1) : (i === btns.length - 1 ? 0 : i + 1);
    e.preventDefault(); btns[next].focus();
  }
}

function noteFullNext(){
  if (NOTE_MODAL.idx < NOTE_MODAL.queue.length - 1){
    NOTE_MODAL.idx++;
    noteFullShow();
    return;
  }
  noteFullCloseAll();
}

/* закрыть и отметить всё показанное прочитанным */
function noteFullCloseAll(){
  if (!NOTE_MODAL.open) { noteFullRemove(); return; }
  const last = NOTE_MODAL.queue[NOTE_MODAL.queue.length - 1] || {};
  try{
    if (typeof kidSt === 'function' && last.ts){
      kidSt().noteSeen = Math.max(kidSt().noteSeen || 0, last.ts);
      if (typeof kidSaveState === 'function') kidSaveState();
      if (typeof save === 'function') save();
    }
  }catch(e){}
  NOTE_MODAL.open = false;
  NOTE_MODAL.lock = true;                       /* не открывать повторно ту же заметку */
  document.removeEventListener('keydown', noteKeys, true);
  noteScrollLock(false);
  noteFullRemove();
  try{ if (typeof kidRender === 'function') kidRender(); }catch(e){}
  try{ if (NOTE_MODAL.focusBack && NOTE_MODAL.focusBack.focus) NOTE_MODAL.focusBack.focus({preventScroll:true}); }catch(e){}
  setTimeout(() => { NOTE_MODAL.lock = false; }, 400);
}

function noteFullRemove(){
  const el = document.getElementById(NOTE_MODAL.id);
  if (el) el.remove();
}

function noteScrollLock(on){
  try{
    if (on){
      NOTE_MODAL._prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = NOTE_MODAL._prevOverflow || '';
    }
  }catch(e){}
}

/* вызывается после каждой синхронизации: появились новые заметки — показываем окно */
function noteFullCheck(){ return noteFullOpen(); }

window.noteFullOpen = noteFullOpen;
window.noteFullCheck = noteFullCheck;
window.noteFullNext = noteFullNext;
window.noteFullCloseAll = noteFullCloseAll;
