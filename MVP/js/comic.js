/* АРХИМЕД MVP · comic.js — полноэкранные уроки-комиксы «как книжка».
Страница комикса: светлая «бумага», панель-кадр с иллюстрацией-сценой,
персонажем и пузырём речи, внизу пояснение и листание ◀ ▶. */
'use strict';
const COMIC = (function(){
  let root=null, L=null, idx=0;

  /* ---------- персонажи: простые SVG-портреты с эмоциями ---------- */
  const PAL={ ink:'#33291e', skin:'#f2c9a3', skin2:'#d9a87e', blush:'rgba(232,120,110,.35)' };
  function mouth(emo){
    if(emo==='wow') return `<ellipse cx="50" cy="66" rx="7" ry="8" fill="#7c3f33"/><path d="M50 61 l-4 -3 M50 61 l4 -3" stroke="#7c3f33" stroke-width="2" fill="none"/>`;
    if(emo==='sad') return `<path d="M40 70 Q50 62 60 70" stroke="#7c4a33" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
    if(emo==='think') return `<path d="M42 68 Q50 62 58 68" stroke="#7c4a33" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="63" cy="44" r="1.8" fill="#33291e"/>`;
    return `<path d="M41 66 Q50 75 59 66" stroke="#a0504a" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
  }
  function eyes(emo){
    const b=emo==='wow'||emo==='think';
    const open = b ? 6.4 : 4.6;
    return `<circle cx="40" cy="50" r="${open}" fill="#fff" stroke="#33291e" stroke-width="1.6"/><circle cx="60" cy="50" r="${open}" fill="#fff" stroke="#33291e" stroke-width="1.6"/>
      <circle cx="${b?42.5:41}" cy="51" r="2.4" fill="#33291e"/><circle cx="${b?57.5:59}" cy="51" r="2.4" fill="#33291e"/>`;
  }
  function blush(){ return `<ellipse cx="35" cy="58" rx="5" ry="3.2" fill="${PAL.blush}"/><ellipse cx="65" cy="58" rx="5" ry="3.2" fill="${PAL.blush}"/>`; }

  function catSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="60" r="34" fill="#e8a95b"/>
      <path d="M26 42 L14 18 L40 32 Z" fill="#d98f3f"/><path d="M74 42 L86 18 L60 32 Z" fill="#d98f3f"/>
      <circle cx="50" cy="58" r="26" fill="#e8a95b"/>
      <circle cx="42" cy="52" r="3.6" fill="#33291e"/><circle cx="58" cy="52" r="3.6" fill="#33291e"/>
      <path d="M46 60 L50 66 L54 60" stroke="#7a4a22" stroke-width="2.4" fill="#ff9a9a"/>
      <path d="M38 68 Q50 74 62 68" stroke="#33291e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="52.5" r="1.1" fill="#fff"/><circle cx="56" cy="52.5" r="1.1" fill="#fff"/>
      ${emo==='wow'?`<path d="M50 44 l-3 -5 M50 44 l3 -5" stroke="#33291e" stroke-width="2" fill="none"/>`:''}
    </svg>`;
  }
  function fishSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <ellipse cx="50" cy="58" rx="34" ry="22" fill="#6fb4f0"/>
      <path d="M82 58 L100 46 L100 70 Z" fill="#4a93d0"/>
      <path d="M34 42 Q20 26 14 34 Q22 44 26 50" fill="#8fc7f5"/>
      <path d="M66 42 Q80 26 86 34 Q78 44 74 50" fill="#8fc7f5"/>
      <circle cx="36" cy="54" r="4" fill="#fff"/><circle cx="37" cy="55" r="2" fill="#33291e"/>
      <circle cx="64" cy="54" r="4" fill="#fff"/><circle cx="65" cy="55" r="2" fill="#33291e"/>
      ${mouth(emo==='wow'?'wow':'smile')}
    </svg>`;
  }
  function archSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="42" r="26" fill="${PAL.skin}"/>
      <path d="M24 40 C24 18 36 6 50 6 C64 6 76 18 76 40 C76 26 66 20 50 20 C34 20 24 26 24 40 Z" fill="#cfd8ea" stroke="#b8c4dd" stroke-width="1"/>
      <path d="M26 46 C34 36 44 32 50 32 C56 32 66 36 74 46 C70 34 62 28 50 28 C38 28 30 34 26 46 Z" fill="#f4f7ff" opacity=".8"/>
      <path d="M24 44 C30 34 40 30 50 30 C60 30 70 34 76 44 L76 34 C70 24 60 18 50 18 C40 18 30 24 24 34 Z" fill="#c8d2e8"/>
      <path d="M28 50 C34 72 40 82 50 84 C60 82 66 72 72 50 C62 56 38 56 28 50 Z" fill="#e9eefb" stroke="#ccd6ec"/>
      <path d="M32 52 C40 64 60 64 68 52 C62 66 38 66 32 52 Z" fill="#dde5f5" opacity=".7"/>
      <circle cx="42" cy="48" r="4.4" fill="#fff"/><circle cx="58" cy="48" r="4.4" fill="#fff"/>
      <circle cx="43" cy="49" r="2.6" fill="#33291e"/><circle cx="57" cy="49" r="2.6" fill="#33291e"/>
      <path d="M40 60 L60 60" stroke="#d9a441" stroke-width="3" stroke-linecap="round"/>
      ${emo==='wow'?`<ellipse cx="50" cy="70" rx="6" ry="7" fill="#7c3f33"/>`:''}
    </svg>`;
  }
  function grannySVG(emo){
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="40" r="24" fill="${PAL.skin}"/>
      <path d="M26 38 C26 20 36 10 50 10 C64 10 74 20 74 38 C74 26 64 20 50 20 C36 20 26 26 26 38 Z" fill="#8a5a8f"/>
      <path d="M22 46 C24 38 34 34 44 34 L56 34 C66 34 76 38 78 46 L74 56 L26 56 Z" fill="#8a5a8f"/>
      <path d="M26 56 Q38 64 50 60 Q62 64 74 56 L74 92 L26 92 Z" fill="#7c4f81"/>
      <path d="M34 58 L34 84 M66 58 L66 84" stroke="#6a426f" stroke-width="2" fill="none"/>
      <circle cx="42" cy="46" r="4.4" fill="#fff"/><circle cx="58" cy="46" r="4.4" fill="#fff"/>
      <circle cx="43" cy="47" r="2.6" fill="#33291e"/><circle cx="57" cy="47" r="2.6" fill="#33291e"/>
      ${mouth(emo==='sad'?'sad':'smile')}${blush()}
    </svg>`;
  }
  function coinSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="55" r="36" fill="#f0c75e" stroke="#c79b2e" stroke-width="3"/>
      <circle cx="50" cy="55" r="28" fill="none" stroke="#d9a441" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="50" y="67" text-anchor="middle" font-size="34" font-weight="bold" fill="#a3762a">₽</text>
      ${emo==='wow'?`<path d="M36 34 l-2 -8 M36 34 l6 -5" stroke="#a3762a" stroke-width="3" fill="none" stroke-linecap="round"/>`:''}
    </svg>`;
  }
  function pigSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <ellipse cx="50" cy="62" rx="34" ry="30" fill="#f2a9a0"/>
      <path d="M20 46 L8 28 L34 36 Z" fill="#ef8f86"/><path d="M80 46 L92 28 L66 36 Z" fill="#ef8f86"/>
      <ellipse cx="50" cy="66" rx="12" ry="10" fill="#f7c4be"/>
      <circle cx="45" cy="68" r="3" fill="#a05a50"/><circle cx="55" cy="68" r="3" fill="#a05a50"/>
      <circle cx="40" cy="56" r="4" fill="#fff"/><circle cx="60" cy="56" r="4" fill="#fff"/>
      <circle cx="41" cy="57" r="2.4" fill="#33291e"/><circle cx="59" cy="57" r="2.4" fill="#33291e"/>
      ${mouth(emo==='wow'?'wow':'smile')}
    </svg>`;
  }
  function kidSVG(emo){
    return `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="40" r="24" fill="${PAL.skin}"/>
      <path d="M26 38 C26 20 36 8 50 8 C64 8 74 20 74 38 C74 24 64 18 50 18 C36 18 26 24 26 38 Z" fill="#4a3523"/>
      <path d="M30 36 C32 24 40 18 50 18 C60 18 68 24 70 36 C64 28 56 26 50 26 C44 26 36 28 30 36 Z" fill="#5f4531"/>
      <circle cx="42" cy="46" r="4.4" fill="#fff"/><circle cx="58" cy="46" r="4.4" fill="#fff"/>
      <circle cx="43" cy="47" r="2.6" fill="#33291e"/><circle cx="57" cy="47" r="2.6" fill="#33291e"/>
      ${mouth(emo==='wow'?'wow':'smile')}${blush()}
    </svg>`;
  }
  const PERS={
    arch:{ svg:archSVG, name:'Архимед' },
    cat:{ svg:catSVG, name:'Барсик' },
    fish:{ svg:fishSVG, name:'Рыбка' },
    granny:{ svg:grannySVG, name:'Бабушка' },
    coin:{ svg:coinSVG, name:'Монетка' },
    pig:{ svg:pigSVG, name:'Пятачок' },
    kid:{ svg:kidSVG, name:'Ты' }
  };

  /* ---------- сцены-иллюстрации (фон панели по истории) ---------- */
  function sceneBg(scene){
    if(scene==='pond') return `<div class="cs-sky"></div><div class="cs-pond"></div><div class="cs-sun">☀️</div>
      <span class="cs-leaf" style="left:6%;top:8%">🌿</span><span class="cs-leaf" style="left:82%;top:12%">🌾</span>
      <span class="cs-fish" style="left:22%;bottom:14%">🐟</span><span class="cs-fish" style="left:58%;bottom:24%">🐠</span>
      <span class="cs-fish" style="left:74%;bottom:10%">🐟</span><div class="cs-cat">${catSVG('smile')}</div>`;
    if(scene==='kitchen') return `<div class="cs-sky" style="background:linear-gradient(180deg,#f6e3c8,#f0d5ae)"></div>
      <div class="cs-sun" style="left:auto;right:8%">☀️</div><div class="cs-table"></div>
      <span class="cs-leaf" style="left:10%;bottom:6%;font-size:34px">🥧</span><span class="cs-leaf" style="left:30%;bottom:10%">🥧</span>
      <span class="cs-leaf" style="left:52%;bottom:6%;font-size:40px">🥧</span><span class="cs-leaf" style="left:74%;bottom:9%">🥧</span>
      <div class="cs-granny">${grannySVG('sad')}</div>`;
    if(scene==='coins') return `<div class="cs-sky" style="background:linear-gradient(180deg,#f7ecd0,#efdfae)"></div>
      <div class="cs-sun" style="left:auto;right:10%">☀️</div>
      <div class="cs-chest"></div>
      <span class="cs-leaf" style="left:8%;bottom:4%;font-size:30px">🪙</span><span class="cs-leaf" style="left:26%;bottom:12%;font-size:36px">🪙</span>
      <span class="cs-leaf" style="left:66%;bottom:8%;font-size:32px">🪙</span><span class="cs-leaf" style="left:86%;bottom:14%;font-size:30px">🪙</span>
      <div class="cs-tree">🌳</div>`;
    return `<div class="cs-sky"></div><div class="cs-sun">☀️</div>`;
  }
  function personEmo(fr){ return fr.emo||'smile'; }

  /* ---------- полноэкранный оверлей ---------- */
  function ensure(){
    if(root) return;
    const st=document.createElement('style');
    st.textContent=`
      .comic-ov { position:fixed; inset:0; z-index:99; background:#efe6d0; overflow:hidden;
        display:flex; flex-direction:column; font-family:Georgia,serif; color:#33291e; }
      .comic-top { display:flex; align-items:center; gap:10px; padding:12px 14px 6px; }
      .comic-top .ct-title { font-size:15px; font-weight:bold; flex:1; }
      .comic-top .ct-x { background:none; border:none; font-size:22px; color:#8a6d3b; cursor:pointer; font-family:inherit; }
      .comic-page { flex:1; display:flex; flex-direction:column; margin:0 12px 12px;
        background:#fffdf6; border:6px solid #33291e; border-radius:6px; overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,.25); position:relative; }
      .comic-page-inner { flex:1; display:flex; flex-direction:column; overflow-y:auto; }
      .cs-stage { position:relative; height:38%; min-height:170px; border-bottom:4px solid #33291e; overflow:hidden; }
      .cs-sky { position:absolute; inset:0; background:linear-gradient(180deg,#bfe3f7,#9fd4f0); }
      .cs-sun { position:absolute; top:10px; left:8%; font-size:30px; }
      .cs-pond { position:absolute; left:0; right:0; bottom:0; height:52%;
        background:linear-gradient(180deg,#7ec8e8,#4a9fd0); border-top:5px solid #8fd4ef; }
      .cs-leaf,.cs-fish { position:absolute; font-size:26px; }
      .cs-cat { position:absolute; right:6%; bottom:6%; width:120px; height:120px; }
      .cs-cat svg { width:100%; height:100%; }
      .cs-table { position:absolute; left:0; right:0; bottom:0; height:34%; background:#b0783f; border-top:6px solid #94622f; }
      .cs-granny { position:absolute; right:8%; bottom:0; width:150px; height:170px; }
      .cs-granny svg { width:100%; height:100%; }
      .cs-chest { position:absolute; left:50%; bottom:8%; transform:translateX(-50%); width:150px; height:110px;
        background:linear-gradient(180deg,#b07a2e,#8a5c1e); border:5px solid #6e4816; border-radius:8px; }
      .cs-chest::before { content:"◈"; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); color:#f0c75e; font-size:30px; }
      .cs-tree { position:absolute; left:4%; bottom:10%; font-size:70px; }
      .comic-caption { padding:10px 12px; background:#33291e; color:#f4e9c8; font-size:12px; line-height:1.4; }
      .comic-body { flex:1; display:flex; gap:10px; padding:12px; }
      .comic-char { width:96px; flex-shrink:0; text-align:center; }
      .comic-char .cc-svg { width:96px; height:96px; border:4px solid #33291e; border-radius:14px;
        background:#fff; margin:0 auto; }
      .comic-char .cc-svg svg { width:100%; height:100%; }
      .comic-char .cc-name { margin-top:4px; font-size:11px; font-weight:bold; color:#8a6d3b; }
      .comic-bubble { flex:1; background:#fff; border:4px solid #33291e; border-radius:6px 22px 22px 22px;
        padding:10px 14px; font-size:15.5px; line-height:1.5; position:relative; align-self:center; }
      .comic-bubble::before { content:""; position:absolute; left:-18px; top:18px;
        border:9px solid transparent; border-right-color:#33291e; }
      .comic-note { margin:0 12px 8px; background:#fdf3d8; border:2px dashed #c9a95c; border-radius:10px;
        padding:8px 12px; font-size:13px; line-height:1.5; color:#6d5a2e; }
      .comic-nav { display:flex; align-items:center; justify-content:space-between; gap:10px;
        padding:8px 14px 14px; }
      .comic-nav .cn-dots { flex:1; text-align:center; }
      .comic-nav .cn-dot { display:inline-block; width:8px; height:8px; border-radius:50%;
        background:#cbb897; margin:0 3px; }
      .comic-nav .cn-dot.on { background:#33291e; transform:scale(1.4); }
      .cbtn { border:3px solid #33291e; background:#fff; color:#33291e; font-family:inherit;
        font-size:14px; font-weight:bold; border-radius:10px; padding:9px 16px; cursor:pointer; }
      .cbtn.primary { background:#d9a441; border-color:#8a6d1e; }
      .cbtn:disabled { opacity:.35; cursor:default; }
      @keyframes cPop { from{opacity:0; transform:translateX(18px);} to{opacity:1; transform:none;} }
      .comic-page.pop { animation:cPop .22s ease; }
    `;
    document.head.appendChild(st);
    root=document.createElement('div');
    root.className='comic-ov';
    document.body.appendChild(root);
  }
  function open(lesson){
    ensure();
    L=lesson; idx=0;
    render();
    root.style.display='flex';
  }
  function close(){
    if(root) root.style.display='none';
  }
  function isOpen(){ return !!(root&&root.style.display!=='none'); }
  function render(){
    if(!L) return;
    const fr=L.comic[idx];
    const pers=PERS[fr.who]||PERS.arch;
    const scene = L.scene || (fr.scene) || (L.id===63?'pond':L.id===64?'kitchen':L.id===65?'coins':'pond');
    const last=idx>=L.comic.length-1;
    const dots=L.comic.map((_,i)=>`<span class="cn-dot ${i===idx?'on':''}"></span>`).join('');
    root.innerHTML=`<div class="comic-top">
        <span class="ct-title">📖 ${esc(L.ico)} ${esc(L.title)} <span style="color:#8a6d3b;font-weight:normal">· ${idx+1}/${L.comic.length}</span></span>
        <button class="ct-x" onclick="COMIC.close()">✕</button>
      </div>
      <div class="comic-page pop" style="animation:none"><div class="comic-page-inner">
        <div class="cs-stage">${sceneBg(scene)}</div>
        <div class="comic-caption">${esc(fr.cap||L.title+' — маленькая история про счёт')}</div>
        <div class="comic-body">
          <div class="comic-char"><div class="cc-svg">${pers.svg(personEmo(fr))}</div>
            <div class="cc-name">${pers.name}</div></div>
          <div class="comic-bubble">${esc(fr.say)}</div>
        </div>
        ${fr.note?`<div class="comic-note">💡 ${esc(fr.note)}</div>`:''}
      </div></div>
      <div class="comic-nav">
        <button class="cbtn" onclick="COMIC.step(-1)" ${idx===0?'disabled':''}>◀ Назад</button>
        <span class="cn-dots">${dots}</span>
        ${last
          ? `<button class="cbtn primary" onclick="COMIC.done()">Понял! Проверю себя →</button>`
          : `<button class="cbtn primary" onclick="COMIC.step(1)">Дальше ▶</button>`}
      </div>`;
    // лёгкая анимация страницы
    const pg=root.querySelector('.comic-page');
    if(pg){ pg.style.animation='none'; void pg.offsetWidth; pg.style.animation=''; }
  }
  function step(d){
    idx=Math.max(0,Math.min(L.comic.length-1,idx+d));
    render();
  }
  function done(){
    close();
    try{ if(typeof lvToCheck==='function') lvToCheck(); }catch(e){}
  }
  return { open, close, step, done, isOpen };
})();
