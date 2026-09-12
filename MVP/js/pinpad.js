/* АРХИМЕД · pinpad.js — экран ввода PIN для обоих приложений.
   Один и тот же вид: у ученика — свой PIN при входе, у родителя — свой.
   Использование:
     PinPad.ask({title, subtitle, avatar, verify: async (pin)=> true | 'текст ошибки'}).then(pin=>…)
     PinPad.set({title:'Придумай PIN'}).then(pin=>…)      // с повтором
*/
'use strict';

(function(){
  const ID = 'pinPadOverlay';
  const S = {pin: '', resolve: null, opts: {}, busy: false, trap: null};

  function css(){
    if (document.getElementById('pinPadCss')) return;
    const st = document.createElement('style');
    st.id = 'pinPadCss';
    st.textContent = `
    @keyframes ppIn { from { opacity:0; transform:scale(.97) translateY(8px) } to { opacity:1; transform:none } }
    @keyframes ppShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(3px)} }
    .pp-bg { position:fixed; inset:0; z-index:150; display:flex; align-items:center; justify-content:center;
      padding:max(12px, env(safe-area-inset-top)) 12px max(12px, env(safe-area-inset-bottom));
      background:radial-gradient(120% 80% at 50% 0%, rgba(26,50,38,.97) 0%, rgba(4,9,6,.98) 62%);
      -webkit-backdrop-filter:blur(7px); backdrop-filter:blur(7px); }
    .pp-card { width:100%; max-width:400px; max-height:calc(100vh - 24px); overflow:auto; position:relative;
      background:linear-gradient(180deg,#1a3226,#101f18); border:1px solid rgba(217,164,65,.5); border-radius:22px;
      padding:22px 18px 16px; box-shadow:0 24px 70px rgba(0,0,0,.7); animation:ppIn .3s cubic-bezier(.2,.9,.25,1) both; }
    .pp-card::before { content:''; position:absolute; left:20px; right:20px; top:0; height:3px; border-radius:0 0 4px 4px;
      background:linear-gradient(90deg,rgba(255,215,106,0),#ffd76a,rgba(255,215,106,0)); }
    .pp-ava { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-size:30px; margin:2px auto 10px; border:2px solid rgba(217,164,65,.6); box-shadow:0 0 22px -8px rgba(255,196,90,.8); }
    .pp-ttl { text-align:center; font-size:19px; color:#d9a441; }
    .pp-sub { text-align:center; font-size:12.5px; color:#8fa08f; margin-top:4px; line-height:1.5; }
    .pp-dots { display:flex; gap:14px; justify-content:center; margin:18px 0 6px; }
    .pp-dot { width:16px; height:16px; border-radius:50%; border:2px solid rgba(217,164,65,.55); background:transparent;
      transition:.14s; }
    .pp-dot.on { background:linear-gradient(180deg,#ffe9a8,#d9a441); border-color:#ffd76a; transform:scale(1.08); }
    .pp-err { text-align:center; color:#e86a5a; font-size:13px; min-height:19px; margin-bottom:6px; }
    .pp-shake { animation:ppShake .42s ease; }
    .pp-pad { display:grid; grid-template-columns:repeat(3,1fr); gap:9px; margin-top:6px; }
    .pp-key { font-family:Georgia,'Times New Roman',serif; font-size:25px; color:#e8e0cc; background:linear-gradient(180deg,#22402f,#16291f);
      border:1px solid #3d5c49; border-radius:16px; min-height:58px; cursor:pointer; transition:.12s;
      display:flex; align-items:center; justify-content:center; -webkit-tap-highlight-color:transparent; }
    .pp-key:hover { border-color:rgba(255,215,106,.7); background:linear-gradient(180deg,#2a4c39,#1a3125); }
    .pp-key:active { transform:scale(.96); }
    .pp-key.act { color:#d9a441; font-size:21px; }
    .pp-key.blank { background:none; border:0; cursor:default; }
    .pp-foot { margin-top:14px; padding-top:12px; border-top:1px solid rgba(217,164,65,.22); text-align:center;
      font-size:12px; color:#8fa08f; line-height:1.55; }
    .pp-foot b { color:#d9a441; font-weight:normal; }
    .pp-link { color:#d9a441; text-decoration:none; cursor:pointer; }
    @media (max-height:640px){
      .pp-ava { width:52px; height:52px; font-size:25px; margin-bottom:6px; }
      .pp-ttl { font-size:17px; } .pp-dots { margin:12px 0 4px; }
      .pp-key { min-height:48px; font-size:22px; }
      .pp-foot { margin-top:10px; padding-top:9px; }
    }
    @media (prefers-reduced-motion: reduce){ .pp-card { animation:none } .pp-shake { animation:none } }
    `;
    document.head.appendChild(st);
  }

  function render(){
    const o = S.opts;
    const dots = Array.from({length: 4}, (_, i) => `<span class="pp-dot ${i < S.pin.length ? 'on' : ''}"></span>`).join('');
    const keys = ['1','2','3','4','5','6','7','8','9'];
    const pad = keys.map(k => `<button type="button" class="pp-key" data-k="${k}">${k}</button>`).join('')
      + `<button type="button" class="pp-key ${o.cancel ? 'act' : 'blank'}" ${o.cancel ? 'data-act="cancel"' : 'disabled'}>${o.cancel ? 'Отмена' : ''}</button>`
      + `<button type="button" class="pp-key" data-k="0">0</button>`
      + `<button type="button" class="pp-key act" data-act="back">⌫</button>`;
    let el = document.getElementById(ID);
    if (!el){
      el = document.createElement('div');
      el.id = ID; el.className = 'pp-bg';
      el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true');
      document.body.appendChild(el);
      el.addEventListener('click', e => { if (e.target === el && S.opts.cancel) cancel(); });
      el.addEventListener('click', e => {
        const b = e.target.closest ? e.target.closest('.pp-key') : null;
        if (!b || b.disabled) return;
        if (b.dataset.k != null) return press(b.dataset.k);
        if (b.dataset.act === 'back') return back();
        if (b.dataset.act === 'cancel') return cancel();
      });
    }
    el.innerHTML = `<div class="pp-card">
      ${o.avatar ? `<div class="pp-ava">${o.avatar}</div>` : ''}
      <div class="pp-ttl">${o.title || 'Введи PIN'}</div>
      ${o.subtitle ? `<div class="pp-sub">${o.subtitle}</div>` : ''}
      <div class="pp-dots" id="ppDots">${dots}</div>
      <div class="pp-err" id="ppErr"></div>
      <div class="pp-pad">${pad}</div>
      <div class="pp-foot" id="ppFoot">${o.foot || 'Четыре цифры · клавиатура тоже работает'}</div>
    </div>`;
  }

  function press(d){
    if (S.busy || S.pin.length >= 4) return;
    S.pin += d;
    const dots = document.querySelectorAll('#ppDots .pp-dot');
    if (dots[S.pin.length - 1]) dots[S.pin.length - 1].classList.add('on');
    docs();
    if (S.pin.length === 4) finish();
  }
  function back(){
    if (S.busy || !S.pin.length) return;
    S.pin = S.pin.slice(0, -1);
    const dots = document.querySelectorAll('#ppDots .pp-dot');
    if (dots[S.pin.length]) dots[S.pin.length].classList.remove('on');
    docs();
  }
  function docs(){ const e = document.getElementById('ppErr'); if (e) e.textContent = ''; }
  function fail(msg){
    const card = document.querySelector('#pinPadOverlay .pp-card');
    const err = document.getElementById('ppErr');
    if (err) err.textContent = msg || 'Не подошёл';
    if (card){ card.classList.remove('pp-shake'); void card.offsetWidth; card.classList.add('pp-shake'); }
    S.pin = '';
    document.querySelectorAll('#ppDots .pp-dot').forEach(d => d.classList.remove('on'));
  }

  function finish(){
    const pin = S.pin;
    const o = S.opts;
    if (!o.verify){ done(pin); return; }
    S.busy = true;
    const r = o.verify(pin);
    Promise.resolve(r).then(res => {
      S.busy = false;
      if (res === true || res == null) { done(pin); return; }
      fail(typeof res === 'string' ? res : 'Не подошёл');
    }).catch(() => { S.busy = false; fail('Нет связи, попробуй ещё'); });
  }

  function done(pin){
    const o = S.opts, res = S.resolve;
    if (o.onDone) { try{ o.onDone(pin); }catch(e){} }
    hide();
    if (res) res(pin);
  }
  function cancel(){
    const o = S.opts, res = S.resolve;
    hide();
    if (o.onCancel){ try{ o.onCancel(); }catch(e){} }
    if (res) res(null);
  }

  function key(e){
    if (!document.getElementById(ID)) return;
    if (/^[0-9]$/.test(e.key)){ e.preventDefault(); press(e.key); }
    else if (e.key === 'Backspace'){ e.preventDefault(); back(); }
    else if (e.key === 'Escape'){ if (S.opts.cancel){ e.preventDefault(); cancel(); } }
    else if (e.key === 'Tab'){
      const b = [...document.querySelectorAll('#' + ID + ' .pp-key:not(.blank):not([disabled])')];
      if (!b.length) return;
      const i = b.indexOf(document.activeElement);
      const nxt = e.shiftKey ? (i <= 0 ? b.length - 1 : i - 1) : (i === b.length - 1 ? 0 : i + 1);
      e.preventDefault(); b[nxt].focus();
    }
  }

  function hide(){
    const el = document.getElementById(ID);
    if (el) el.remove();
    document.removeEventListener('keydown', key, true);
    try{ document.body.style.overflow = S.prevOverflow || ''; }catch(e){}
    S.busy = false; S.pin = '';
  }

  function open(opts){
    css();
    hide();
    S.opts = opts || {}; S.pin = '';
    try{ S.prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; }catch(e){}
    document.addEventListener('keydown', key, true);
    return new Promise(res => { S.resolve = res; render(); });
  }

  window.PinPad = {
    isOpen(){ return !!document.getElementById(ID); },
    hide,
    /* один ввод PIN */
    ask(opts){ return open(opts); },
    /* придумать PIN и повторить: возвращает подтверждённый PIN */
    set(opts){
      const base = Object.assign({}, opts);
      const once = () => open(Object.assign({}, base, {
        title: base.title || 'Придумай свой PIN',
        subtitle: base.subtitle || 'Четыре цифры — их будешь вводить при каждом входе',
        foot: base.foot || 'Запомни PIN: восстановить его можно только через родителя'
      })).then(pin => {
        if (pin === null) return null;
        return open(Object.assign({}, base, {
          title: 'Повтори PIN',
          subtitle: 'Проверим, что ты его не перепутал',
          foot: ''
        })).then(pin2 => {
          if (pin2 === null) return null;
          if (pin2 === pin) return pin;
          return once();                      /* не совпало — сразу начинаем заново */
        });
      });
      return once();
    }
  };
})();
