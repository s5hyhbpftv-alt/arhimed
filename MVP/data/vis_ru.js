/* Русский язык · 5–6 класс. Кадровый формат: у каждого шага свой рисунок и своё задание.
   Опирается на общий набор помощников PKIT из vis_pw.js (рамка, подписи, разбор, заметки). */
window.WAVE_B = window.WAVE_B || {};

window.RUKIT = (function(){
  const K = window.PKIT;
  const GOLD='#ffd76a', BLUE='#7fd1ff', GREEN='#8fd1a8', RED='#e86a5a', MUTED='#8fa08f', PALE='#e8dcc8';
  const T = K.l, T2 = K.l2, SV = K.sv, CARDS = K.cards;

  /* --- Общий каркас кадра по стандарту кеглей (шаг 2 редизайна) ---
     Кадры уроков 601–610 должны читаться без увеличения: заголовок 24, лид 20,
     служебная подпись 16, буква-задание 44. Урок 601 живёт в этой вёрстке с
     самого редизайна (его класс .s6), остальные семь уроков рисовались в SVG-
     холсте 336×252, где единица равна пикселю и кегль выходил 10,5–14.
     Здесь тот же каркас выкладывается наружу, чтобы им могли пользоваться все
     уроки, а не только 601. Текст сцены набирается HTML-блоками: у них нет
     жёстких координат, поэтому крупный кегль не ломает кадр, а переносит строку. */
  const FRAME_F="Georgia,'Times New Roman',serif";
  const FRAME_EASE="cubic-bezier(.2,0,0,1)", FRAME_OUT="cubic-bezier(.23,1,.32,1)";
  const FRAME_CSS=`
  #lvis .s6{--gold:#ffd76a;--ink:#f6efe0;--mut:#d8c9a6;--line:rgba(255,215,106,.28);--ok:#8fd1a8;--no:#e86a5a;
    box-sizing:border-box;max-width:100%;font-family:${FRAME_F};color:var(--ink);width:100%;display:flex;flex-direction:column;gap:16px;padding-bottom:56px}
  #lvis .s6 .kicker{font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .s6 h2{font-size:24px;line-height:1.12;font-weight:600;color:var(--gold);letter-spacing:-.02em;margin:0;text-wrap:balance}
  #lvis .s6 p{margin:0}
  #lvis .s6 .lead{font-size:20px;line-height:1.5;text-wrap:pretty}
  #lvis .s6 .cap{font-size:16px;line-height:1.5;color:var(--mut)}
  #lvis .s6 .row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
  #lvis .s6 .card{box-sizing:border-box;flex:1 1 30%;min-width:104px;padding:16px 14px;border-radius:18px;text-align:center;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line);box-shadow:0 10px 24px rgba(0,0,0,.38)}
  #lvis .s6 .card .ic{font-size:30px;line-height:1}
  #lvis .s6 .card .nm{font-size:16px;font-weight:600;color:var(--gold);margin-top:8px}
  #lvis .s6 .card .ex{font-size:16px;line-height:1.25;color:var(--mut);margin-top:4px}
  #lvis .s6 button{font-family:${FRAME_F};cursor:pointer;border-radius:16px;border:1.5px solid var(--line);
    background:rgba(255,255,255,.05);color:var(--ink);transition:transform 120ms ${FRAME_EASE},background 160ms ease-out,border-color 160ms ease-out}
  #lvis .s6 button:active{transform:translateY(2px)}
  #lvis .s6 button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
  #lvis .s6 .chip{padding:14px 20px;font-size:24px;font-weight:600;line-height:1.2}
  #lvis .s6 .chip.on{border-color:var(--gold);background:rgba(255,215,106,.14)}
  #lvis .s6 .chip.ok{border-color:var(--ok);background:rgba(143,209,168,.16)}
  #lvis .s6 .chip.no{border-color:var(--no);background:rgba(232,106,90,.14)}
  #lvis .s6 .word{display:inline-flex;align-items:baseline;gap:10px;flex-wrap:nowrap;white-space:nowrap;padding:14px 18px;border-radius:18px;
    background:linear-gradient(180deg,#24382d,#17261e);border:1.5px solid var(--line);box-shadow:0 12px 28px rgba(0,0,0,.42)}
  #lvis .s6 .word b{font-size:44px;font-weight:600;line-height:1;letter-spacing:-.02em}
  #lvis .s6 .word i{font-style:normal;font-size:16px;color:var(--mut)}
  /* длинная фраза в плашке: на 320 px «кот · столе · спит» не влезала в строку —
     разрешаем перенос и держим кегль по шкале (26 px вместо 28) */
  #lvis .s6 .word.wide{white-space:normal;flex-wrap:wrap;justify-content:center;text-align:center;max-width:100%}
  #lvis .s6 .word.wide b{font-size:26px;line-height:1.25;letter-spacing:0}
  #lvis .s6 .tag{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;
    background:rgba(255,215,106,.12);border:1px solid var(--line);font-size:16px;color:var(--gold)}
  #lvis .s6 .cta{width:100%;padding:17px 18px;font-size:20px;font-weight:600;line-height:1.2;
    border-color:var(--gold);background:linear-gradient(180deg,#ffd76a,#e2b23f);color:#20180a}
  #lvis .s6 .verdict{font-size:16px;line-height:1.55}
  #lvis .s6 .verdict.ok{color:#b8e8cc}#lvis .s6 .verdict.no{color:#f3b3aa}
  #lvis .s6 .score{font-size:16px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .s6 .col{display:flex;flex-direction:column;gap:12px}
  #lvis .s6 .split{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}
  #lvis .s6 .rail{display:flex;gap:14px;justify-content:center;padding:10px 0;border-top:1px dashed var(--line);border-bottom:1px dashed var(--line)}
  #lvis .s6 .crates{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:86%;margin:0 auto}
  /* персонаж-помощник не должен закрывать содержимое русского тренажёра */
  body:has(#lvis .s6) .avatar,body:has(#lvis .s6) .mascot,body:has(#lvis .s6) .assistant,body:has(#lvis .s6) .guide,
  body:has(#lvis .ms) .avatar,body:has(#lvis .ms) .mascot,body:has(#lvis .ms) .assistant,body:has(#lvis .ms) .guide,
  body:has(#lvis .rl-wrap) .avatar,body:has(#lvis .rl-wrap) .mascot{display:none!important}
  body:has(#lvis .pp) .avatar,body:has(#lvis .pp) .mascot,body:has(#lvis .pp) .assistant{display:none!important}
  #lvis .s6 .crate{flex:1 1 30%;min-width:104px;padding:16px 12px;text-align:center}
  #lvis .s6 .crate .ic{font-size:30px}
  #lvis .s6 .crate .nm{font-size:16px;font-weight:600;color:var(--gold);margin-top:8px;white-space:nowrap}
  #lvis .s6 .crate .ex{font-size:14px;line-height:1.3;color:var(--mut);margin-top:4px}
  #lvis .s6 .crate.hit{border-color:var(--ok);box-shadow:0 0 0 4px rgba(143,209,168,.18);animation:bump 320ms ${FRAME_OUT}}
  #lvis .s6 .crate.miss{border-color:var(--no);animation:nudge 150ms ease-out}
  /* --- хореография: у каждого кадра своя --- */
  #lvis .s6 [data-anim]{animation-duration:260ms;animation-timing-function:${FRAME_OUT};animation-fill-mode:both;animation-delay:calc(var(--i,0)*40ms)}
  #lvis .s6[data-frame="1"] [data-anim]{animation-name:rise}
  #lvis .s6[data-frame="2"] [data-anim]{animation-name:pop}
  #lvis .s6[data-frame="3"] [data-anim]{animation-name:rise}
  #lvis .s6[data-frame="4"] [data-anim]{animation-name:slideX}
  #lvis .s6[data-frame="5"] [data-anim]{animation-name:swap}
  #lvis .s6[data-frame="6"] [data-anim]{animation-name:pop}
  #lvis .s6[data-frame="7"] [data-anim]{animation-name:slideX}
  #lvis .s6[data-frame="8"] [data-anim]{animation-name:drop}
  #lvis .s6[data-frame="9"] [data-anim]{animation-name:rise}
  #lvis .s6 .draw{stroke-dasharray:220;stroke-dashoffset:220;animation:draw 420ms ${FRAME_OUT} 160ms both}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes pop{0%{opacity:0;transform:scale(.9)}70%{transform:scale(1.02)}100%{opacity:1;transform:none}}
  @keyframes slideX{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
  @keyframes drop{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
  @keyframes swap{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:none}}
  @keyframes draw{to{stroke-dashoffset:0}}
  @keyframes bump{0%{transform:none}40%{transform:translateY(-8px)}100%{transform:none}}
  @keyframes nudge{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
  #lvis .s6 .fly{position:fixed;z-index:340;pointer-events:none;font-family:${FRAME_F};font-weight:600;color:#ffe9a8;
    text-shadow:0 0 14px rgba(255,215,106,.7);transition:transform 260ms ${FRAME_EASE},opacity 260ms ease-out}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6 *, #lvis .s6 *::before, #lvis .s6 *::after{
      animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    #lvis .s6 .fly{display:none!important}
  }

  #lvis .s6 .morph{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;align-items:flex-end}
  #lvis .s6 .morph .m{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 14px;border-radius:14px;
    border:1.6px solid var(--c,#ffd76a);background:rgba(255,255,255,.045);min-width:56px}
  #lvis .s6 .morph .m b{font-size:32px;line-height:1.05;font-weight:600;color:var(--c,#ffd76a)}
  #lvis .s6 .morph .m i{font-style:normal;font-size:14px;line-height:1.2;color:var(--mut)}
  #lvis .s6 .pair{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  #lvis .s6 .pair .card{flex:1 1 42%;min-width:150px}
  #lvis .s6 .cases{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
  #lvis .s6 .cases .c{padding:12px 12px 11px;border-radius:14px;border:1.5px solid var(--line);
    background:linear-gradient(180deg,#22362c,#17261e);text-align:left}
  #lvis .s6 .cases .c .n{font-size:14px;line-height:1.2;letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6 .cases .c .t{font-size:16px;line-height:1.25;font-weight:600;color:var(--gold);margin-top:3px}
  #lvis .s6 .cases .c .q{font-size:16px;line-height:1.3;color:var(--ink);margin-top:4px}
  #lvis .s6 .cases .c .e{font-size:14px;line-height:1.35;color:var(--mut);margin-top:5px}
  #lvis .s6 .casebtns{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
  /* На узком экране две колонки не держат длинные названия падежей
     («Родительный» выходил за край) — раскладываем в одну колонку. */
  @media (max-width:370px){
    #lvis .s6 .cases,#lvis .s6 .casebtns{grid-template-columns:1fr}
    #lvis .s6 .pair{flex-direction:column}
    #lvis .s6 .pair .card{flex:1 1 100%;min-width:0}
  }
  #lvis .s6 .casebtns button{display:flex;flex-direction:column;align-items:flex-start;gap:2px;min-height:56px;
    padding:12px 14px;border-radius:14px;border:1.5px solid var(--line);cursor:pointer;text-align:left;
    background:linear-gradient(180deg,#22362c,#17261e);font-family:Georgia,'Times New Roman',serif;
    transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 160ms}
  #lvis .s6 .casebtns button .nm{font-size:16px;line-height:1.2;font-weight:600;color:var(--gold)}
  #lvis .s6 .casebtns button .qs{font-size:14px;line-height:1.2;color:var(--mut)}
  #lvis .s6 .casebtns button:active{transform:translateY(1px)}
  #lvis .s6 .casebtns button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
  #lvis .s6 .ex-line{width:100%;text-align:left;font-size:16px;line-height:1.5;color:var(--ink);
    border-left:3px solid var(--gold);padding:2px 0 2px 12px}
  #lvis .s6 .ex-line b{color:var(--gold);font-weight:600;display:inline-block}
  /* inline-block: фраза-пример не разрывается по строкам и её рамка совпадает
     с текстом. У обычного inline-элемента, перенесённого на две строки, рамка
     охватывает обе строки целиком — гейт раскладки принимал это за наложение. */
  #lvis .s6 .steps{display:flex;flex-direction:column;gap:10px;width:100%}
  #lvis .s6 .steps .st{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;
    border:1.5px solid var(--line);background:linear-gradient(180deg,#22362c,#17261e)}
  #lvis .s6 .steps .st .n{flex:none;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-size:16px;color:#20180a;background:linear-gradient(180deg,#ffd76a,#e2b23f)}
  #lvis .s6 .steps .st .t{font-size:16px;line-height:1.3}
  #lvis .s6 .steps .st .t small{display:block;font-size:14px;color:var(--mut);margin-top:2px}
    `;
  function frameCss(){
    try{
      let e=document.getElementById('s6-style');
      if(!e){ e=document.createElement('style'); e.id='s6-style'; document.head.appendChild(e); }
      if(e.textContent!==FRAME_CSS) e.textContent=FRAME_CSS;
    }catch(e){}
  }
  /* морфемы кадра: [[часть, цвет, подпись], …] — имя frameMorph, чтобы не
     перекрыть прежний SVG-помощник morph(parts,y,o) */
  function frameMorph(items){
    return `<div class="morph">${items.map(([p,c,cap])=>
      `<span class="m" style="--c:${c}"><b>${p}</b>${cap?`<i>${cap}</i>`:''}</span>`).join('')}</div>`;
  }
  function NOTE(title,text){
    rcss();
    return `<div class="ru-note"><div class="t">${title}</div><div class="b">${text}</div></div>`;
  }
  function PRED(st,key,q,opts){
    rcss();
    const cur=st[key], pick=opts.find(o=>o.k===cur);
    const fb=cur?`<div class="fb" style="color:${(pick&&pick.ok===false)?RED:GREEN}">${(pick&&pick.fb)||((pick&&pick.ok===false)?'пока нет — посмотри кадр ещё раз':'верно!')}</div>`:'';
    return `<div class="ru-pred"><div class="q">${q}</div><div class="r">${opts.map(o=>
      `<button type="button" style="border-color:${cur===o.k?((o.ok===false)?RED:GOLD):'rgba(255,215,106,.28)'}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>${fb}</div>`;
  }

  /* слово-плашка: главный элемент русских сцен */
  function word(x, y, text, col, o){
    o = o || {};
    const fs = o.fs || 15, pad = o.pad == null ? 10 : o.pad;
    const w = Math.max(o.w || 0, String(text).length * fs * 0.58 + pad * 2);
    const h = o.h || fs + 16;
    const cx = x + w / 2;
    const g = o.gray ? '#2a3a31' : (o.bg || 'rgba(255,255,255,.05)');
    return `<rect x="${x.toFixed(1)}" y="${(y - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="${o.rx || 9}"
        fill="${g}" stroke="${col}" stroke-width="${o.sw || 1.6}" ${o.dash ? 'stroke-dasharray="4 3"' : ''}/>
      ${T(cx, y + fs * 0.36, text, col, {fs: fs})}`;
  }
  /* ряд слов: список массивов [текст, цвет] */
  function row(y, items, o){
    o = o || {};
    const gap = o.gap == null ? 8 : o.gap;
    const widths = items.map(it => Math.max(o.w || 0, String(it[0]).length * (o.fs || 15) * 0.58 + 20));
    const total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
    let x = Math.max(14, (336 - total) / 2);
    return items.map((it, i) => {
      const s = word(x, y, it[0], it[1] || PALE, Object.assign({}, o, {w: widths[i]}));
      x += widths[i] + gap;
      return s;
    }).join('');
  }
  /* подпись над словом со стрелкой вниз */
  function tag(x, y, text, col, fs){
    const w = Math.max(46, String(text).length * (fs || 11) * 0.6 + 14);
    return `<path d="M${x} ${y - 6} L${x} ${y - 14}" stroke="${col}" stroke-width="1.4"/>
      <path d="M${x - 4} ${y - 10} L${x} ${y - 4} L${x + 4} ${y - 10}" fill="none" stroke="${col}" stroke-width="1.4"/>
      <rect x="${(x - w / 2).toFixed(1)}" y="${y - 34}" width="${w}" height="20" rx="8" fill="rgba(7,20,24,.85)" stroke="${col}" stroke-width="1.3"/>
      ${T(x, y - 20, text, col, {fs: fs || 11})}`;
  }
  /* морфемы: список [часть, цвет, подпись] */
  function morph(parts, y, o){
    o = o || {};
    const fs = o.fs || 20, gap = 3;
    const widths = parts.map(p => Math.max(38, String(p[0]).length * fs * 0.6 + 22));
    const total = widths.reduce((a, b) => a + b, 0) + gap * (parts.length - 1);
    let x = Math.max(14, (336 - total) / 2);
    let boxes = '', tags = '';
    parts.forEach((p, i) => {
      const col = p[1] || GOLD;
      boxes += `<rect x="${x.toFixed(1)}" y="${y - 24}" width="${widths[i].toFixed(1)}" height="48" rx="8"
        fill="${col}22" stroke="${col}" stroke-width="1.7"/>
        ${T(x + widths[i] / 2, y + 8, p[0], col, {fs: fs})}`;
      if (p[2]) tags += T2(x + widths[i] / 2, y + 40, p[2], MUTED, {fs: 10.5});
      x += widths[i] + gap;
    });
    return boxes + tags;
  }
  /* карточка-пояснение внутри сцены */
  function rule(y, title, text, col, width){
    col = col || GOLD;
    const max = width || 44;                    /* сколько символов влезает в строку */
    const words = String(text).split(' ');
    const lines = [];
    let cur = '';
    words.forEach(w => {
      if ((cur ? cur + ' ' + w : w).length > max && cur){ lines.push(cur); cur = w; }
      else cur = cur ? cur + ' ' + w : w;
    });
    if (cur) lines.push(cur);
    const h = 26 + lines.length * 15;
    y = Math.min(y, 244 - h);              /* чтобы нижняя строка не липла к краю кадра */
    return `<rect x="24" y="${y}" width="288" height="${h}" rx="11" fill="rgba(255,255,255,.04)" stroke="${col}" stroke-width="1.4"/>
      ${T2(168, y + 18, title, col, {fs: 12})}
      ${lines.map((t, i) => T2(168, y + 35 + i * 15, t, PALE, {fs: 11})).join('')}`;
  }
  function box(x, y, w, h, col, title, lines){
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="rgba(255,255,255,.04)" stroke="${col}" stroke-width="1.5"/>
      ${T(x + w / 2, y + 22, title, col, {fs: 13})}
      ${lines.map((t, i) => T2(x + w / 2, y + 42 + i * 16, t, PALE, {fs: 11})).join('')}`;
  }
  function plus(x, y, col){
    return `<path d="M${x - 7} ${y} h14 M${x} ${y - 7} v14" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`;
  }
  function check(x, y, col, r){
    r = r || 9;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(143,209,168,.14)" stroke="${col}" stroke-width="1.6"/>
      <path d="M${x - r * 0.45} ${y} l${r * 0.34} ${r * 0.36} l${r * 0.6} ${-r * 0.72}" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  function cross(x, y, col, r){
    r = r || 9;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(232,106,90,.13)" stroke="${col}" stroke-width="1.6"/>
      <path d="M${x - r * 0.42} ${y - r * 0.42} L${x + r * 0.42} ${y + r * 0.42} M${x + r * 0.42} ${y - r * 0.42} L${x - r * 0.42} ${y + r * 0.42}"
        stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  return {GOLD, BLUE, GREEN, RED, MUTED, PALE, T, T2, SV, NOTE, PRED, CARDS, word, row, tag, morph, rule, box, plus, check, cross,
          frameCss, frameMorph};
})();


/* ================= RUKIT v2: полноэкранный глянцевый слой отображения =================
   Меняет не сцены, а саму систему: кадр занимает весь экран, типографика крупнее,
   у каждого шага — входная хореография, блик по карточке и живой фон. */
(function(){
  const R = window.RUKIT;
  /* сохраняем исходные функции: иначе новые будут вызывать сами себя */
  const OSV=R.SV, OT=R.T, OL2=R.T2, Oword=R.word, Orow=R.row, Otag=R.tag, Omorph=R.morph, Obox=R.box, Orule=R.rule;
  const TYPE = 1.0;                     /* общий масштаб шрифтов в сценах */
  const CSS2 = `
  @keyframes rkRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes rkSheen{0%{transform:translateX(-120%) rotate(8deg)}55%{transform:translateX(220%) rotate(8deg)}100%{transform:translateX(220%) rotate(8deg)}}
  @keyframes rkGlow{0%,100%{box-shadow:0 18px 50px rgba(0,0,0,.55),0 0 0 1px rgba(255,215,106,.16)}50%{box-shadow:0 22px 64px rgba(0,0,0,.6),0 0 0 1px rgba(255,215,106,.34)}}
  @keyframes rkFloat{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-7px);opacity:.85}}
  @keyframes rkDraw{from{stroke-dashoffset:640}to{stroke-dashoffset:0}}
  .rk-scene{align-self:stretch;position:relative;width:100%;margin:0;box-sizing:border-box;overflow:hidden;
    animation:rkGlow 6.5s ease-in-out infinite;border-radius:0}
  .rk-scene svg{width:100%!important;max-width:100%!important;height:auto!important;display:block}
  /* на телефоне рисунок занимает весь экран, на планшете и ноутбуке — остаётся в колонке */
  @media (max-width:640px){ .rk-scene{align-self:flex-start;width:100vw;left:50%;transform:translateX(-50%)} }
  .rk-scene svg > *{animation:rkRise .52s cubic-bezier(.22,.9,.24,1) both}
  .rk-scene svg > *:nth-child(1){animation-delay:.04s}.rk-scene svg > *:nth-child(2){animation-delay:.09s}
  .rk-scene svg > *:nth-child(3){animation-delay:.14s}.rk-scene svg > *:nth-child(4){animation-delay:.19s}
  .rk-scene svg > *:nth-child(5){animation-delay:.24s}.rk-scene svg > *:nth-child(6){animation-delay:.29s}
  .rk-scene svg > *:nth-child(7){animation-delay:.34s}.rk-scene svg > *:nth-child(8){animation-delay:.39s}
  .rk-scene svg > *:nth-child(n+9){animation-delay:.44s}
  /* свои движения по темам: буквы вспыхивают, тело всплывает, запятые встают на место */
  @keyframes rkPopIn{0%{opacity:0;transform:scale(.7) rotate(-5deg)}70%{transform:scale(1.06) rotate(1deg)}100%{opacity:1;transform:none}}
  @keyframes rkFloatUp{0%{opacity:0;transform:translateY(26px)}60%{transform:translateY(-6px)}100%{opacity:1;transform:none}}
  @keyframes rkSlideRight{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}
  @keyframes rkDraw{from{opacity:0;stroke-dashoffset:240}to{opacity:1;stroke-dashoffset:0}}
  .rk-scene[data-lesson="603"] svg > *,.rk-scene[data-lesson="604"] svg > *,
  .rk-scene[data-lesson="605"] svg > *,.rk-scene[data-lesson="609"] svg > *{animation-name:rkPopIn}
  .rk-scene[data-lesson="612"] svg > *,.rk-scene[data-lesson="106"] svg > *{animation-name:rkFloatUp}
  .rk-scene[data-lesson="610"] svg > *,.rk-scene[data-lesson="607"] svg > *{animation-name:rkPopIn}
  .rk-scene[data-lesson="608"] svg > *,.rk-scene[data-lesson="602"] svg > *{animation-name:rkFloatUp}
  .rk-scene .rk-sheen{position:absolute;top:-30%;left:0;width:42%;height:160%;pointer-events:none;
    background:linear-gradient(100deg,transparent,rgba(255,255,255,.09),transparent);animation:rkSheen 7s ease-in-out infinite}
  .rk-scene .rk-dust{position:absolute;inset:0;pointer-events:none}
  .rk-scene .rk-dust i{position:absolute;width:3px;height:3px;border-radius:50%;background:#ffd76a;opacity:.5;animation:rkFloat 5.5s ease-in-out infinite}
  .rk-note{width:100%;text-align:left;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02));
    border:1px solid rgba(255,215,106,.28);border-left:4px solid #ffd76a;border-radius:16px;padding:14px 16px;
    animation:rkRise .5s cubic-bezier(.22,.9,.24,1) both;animation-delay:.1s}
  .rk-note .rk-kicker{color:#ffd76a;font:600 14px/1 Georgia,serif;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px}
  .rk-note .rk-body{color:#f1e8d6;font-size:16px;line-height:1.62;font-family:Georgia,serif}
  .rk-pred{width:100%;text-align:left}
  .rk-pred .rk-q{color:#ffd76a;font:600 16px/1.4 Georgia,serif;margin-bottom:10px}
  .rk-pred .rk-opts{display:flex;flex-wrap:wrap;gap:10px}
  .rk-pred .rk-opt{flex:1 1 44%;min-width:140px;font-size:16px!important;padding:14px 12px!important;border-radius:14px!important}
  .rk-pred .rk-said{color:#d8e4d8;font-size:14px;margin-top:8px;opacity:.9}
  `;
  function injectCss(){
    try{
      if(window._waveCss) window._waveCss('css-rkv2', CSS2);
      let st=document.getElementById('rkv2-style');
      if(!st){ st=document.createElement('style'); st.id='rkv2-style'; document.head.appendChild(st); }
      if(st.textContent!==CSS2) st.textContent=CSS2;
    }catch(e){}
  }
  /* полноэкранный кадр: сам рисунок + блик + пылинки */
  function SV2(inner, o){
    injectCss();
    const svg = OSV(inner, o);
    let lid = '';
    try{ lid = (typeof LV!=='undefined' && LV.id) ? String(LV.id) : ''; }catch(e){}
    const dust = [[12,18,0],[74,10,1],[38,64,2],[88,44,3],[22,86,4],[66,78,5]]
      .map(([l,t,d])=>`<i style="left:${l}%;top:${t}%;animation-delay:${d*0.7}s"></i>`).join('');
    return `<div class="rk-scene" data-lesson="${lid}">${svg}<span class="rk-sheen"></span><span class="rk-dust">${dust}</span></div>`;
  }
  /* крупная типографика: масштабируем все подписи сцен */
  function T2(x,y,t,col,o){ o=o||{}; return OT(x,y,t,col,Object.assign({},o,{fs:(o.fs||12)*TYPE})); }
  function L2(x,y,t,col,o){ o=o||{}; return OL2(x,y,t,col,Object.assign({},o,{fs:(o.fs||12)*TYPE})); }
  function word2(x,y,text,col,o){ return Oword(x,y,text,col,Object.assign({},o,{fs:((o&&o.fs)||15)*TYPE})); }
  function row2(y,items,o){ return Orow(y,items,Object.assign({},o,{fs:((o&&o.fs)||15)*TYPE})); }
  function tag2(x,y,text,col,fs){ return Otag(x,y,text,col,(fs||11)*TYPE); }
  function morph2(parts,y,o){ return Omorph(parts,y,Object.assign({},o,{fs:((o&&o.fs)||20)*TYPE})); }
  function box2(x,y,w,h,col,title,lines){ return Obox(x,y,w,h,col,title,lines); }
  function rule2(y,title,text,col,width){ return Orule(y,title,text,col,width); }
  function note2(title,text){
    return `<div class="rk-note"><div class="rk-kicker">${title}</div><div class="rk-body">${text}</div></div>`;
  }
  function pred2(st,key,q,opts){
    const cur=st[key];
    return `<div class="rk-pred"><div class="rk-q">${q}</div><div class="rk-opts">${opts.map(o=>
      `<button type="button" class="btn rk-opt" style="${cur===o.k?'border-color:#ffd76a;box-shadow:0 0 0 1px rgba(255,215,106,.45) inset':''}"
        onclick="try{const k=lidKey(LV.id);CHS[k]=CHS[k]||{};CHS[k]['${key}']='${o.k}';chRender(0);}catch(e){}">${o.t}</button>`).join('')}</div>
      ${cur?`<div class="rk-said">ты выбрал: ${(opts.filter(o=>o.k===cur)[0]||{}).t||cur}</div>`:''}</div>`;
  }
  /* подменяем систему целиком — все уроки и работы подхватывают новый вид */
  Object.assign(R, {SV:SV2, T:T2, T2:L2, word:word2, row:row2, tag:tag2, morph:morph2,
                    box:box2, rule:rule2, NOTE:note2, PRED:pred2, TYPE:TYPE, injectCss:injectCss});
})();

/* ================= УРОК 601 · Части речи: что называет слово ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, TAG=R.tag, BOX=R.box, RULE=R.rule;

  const L601 = {
    id: 601, title: 'Части речи: что называет слово', ico: '📖',
    src: 'Русский язык · 5–6 класс · Части речи', subj: 'rus',
    explain: [
      'Каждое слово в русском языке — не просто набор букв, а работник со своей должностью. Эта должность называется часть речи. Определить её просто: задай к слову вопрос и посмотри, что слово называет — предмет, признак или действие.',
      'Имя существительное отвечает на вопросы кто? или что? и называет предмет: кот, дом, радость. Даже то, что нельзя потрогать, может быть существительным: смех, бег, доброта.',
      'Имя прилагательное отвечает на вопросы какой? какая? какое? какие? и называет признак: рыжий, тёплый, деревянный. Прилагательное всегда цепляется к существительному и объясняет его.',
      'Глагол отвечает на вопрос что делает? (что делал? что будет делать?) и называет действие или состояние: бежит, светит, спит. В предложении глагол чаще всего и есть самое главное слово про действие.',
      'Местоимение не называет, а указывает: я, ты, он, она, мы, вы, они. Оно работает вместо имени, чтобы не повторять одно слово десять раз: «Маша читает. Она читает» — об одном и том же.',
      'Имя числительное отвечает на вопросы сколько? или который? и называет число или порядок при счёте: пять, третий, двое. Числительных в речи немного, но без них не обойтись.',
      'Наречие отвечает на вопросы как? где? когда? куда? и называет признак действия: быстро, вдали, вечером. Наречие обычно прилипает к глаголу: бежит быстро, живёт вдали.',
      'Есть и служебные части речи: предлог (в, на, под), союз (и, но, потому что), частица (не, бы, же). Они ничего не называют — они служат: связывают слова и помогают выразить смысл.',
      'Алгоритм простой: назови, что слово делает в речи, задай вопрос, и часть речи определится сама. Потренируйся: ниже показывают слово, а ты выбери, кто он — существительное, прилагательное или глагол.'
    ],
    check: { q: 'На какие вопросы отвечает имя прилагательное?', choices: ['кто? что?', 'какой? какая? какое?', 'что делает?'], ans: 1,
      exp: 'Прилагательное называет признак: какой? какая? какое? какие?' },
    tasks: [
      { q: 'Какое слово — глагол?', kind: 'choice', choices: ['бежит', 'быстрый', 'бег'], ans: 0,
        hints: ['Задай вопрос: что делает?', '«Бежит» отвечает на вопрос что делает?'], sol: 'бежит' },
      { q: 'Сколько существительных в списке: дом, тёплый, смех, бежать?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Существительное отвечает на кто? что?', 'Дом и смех — существительные.'], sol: '2' }
    ]
  };

  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Что называет слово?',GOLD,{fs:14})}
        ${BOX(20,38,88,92,GREEN,'предмет','кто? что?'.split(' '))}
        ${BOX(124,38,88,92,BLUE,'признак','какой?'.split(' '))}
        ${BOX(228,38,88,92,GOLD,'действие','что делает?'.split(' '))}
        ${W(34,166,'кот',GREEN)}${W(126,166,'тёплый',BLUE)}${W(232,166,'бежит',GOLD)}
        ${RULE(184,'Вопрос — ключ','Задай вопрос к слову — и увидишь его работу.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Имя существительное',GREEN,{fs:14})}
        ${ROW(70,[['кто?',GREEN],['кот',PALE],['бабушка',PALE]],{fs:15})}
        ${ROW(116,[['что?',GREEN],['дом',PALE],['радость',PALE]],{fs:15})}
        ${RULE(150,'Называет предмет','Даже невидимое: смех, бег, доброта — тоже существительные.',GREEN)}
        ${T2(168,226,'вопрос кто? — живое, вопрос что? — остальное',MUTED,{fs:11})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Имя прилагательное',BLUE,{fs:14})}
        ${W(96,74,'рыжий',BLUE,{fs:16})}${TAG(96,60,'какой?',BLUE)}
        ${W(168,128,'тёплая',BLUE,{fs:16})}${TAG(168,114,'какая?',BLUE)}
        ${W(240,182,'деревянное',BLUE,{fs:15})}${TAG(240,168,'какое?',BLUE)}
        ${T2(168,226,'прилагательное всегда объясняет существительное',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Глагол',GOLD,{fs:14})}
        ${ROW(72,[['что делает?',GOLD]],{fs:13})}
        ${ROW(120,[['бежит',PALE],['светит',PALE],['спит',PALE]],{fs:16})}
        ${RULE(152,'Называет действие','А ещё состояние: спит, болеет, радуется.',GOLD)}
        ${T2(168,226,'глагол — самое главное слово про действие',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Местоимение: вместо имени',BLUE,{fs:14})}
        ${W(92,64,'Маша',PALE)}${W(176,64,'читает',PALE)}
        ${T2(168,94,'имя повторяется — речь тяжёлая',MUTED,{fs:10.5})}
        ${W(92,132,'Она',BLUE)}${W(176,132,'читает',PALE)}
        ${T2(168,162,'коротко и понятно, о ком речь',GREEN,{fs:10.5})}
        ${RULE(184,'Указывает, а не называет','я, ты, он, она, мы, вы, они.',BLUE)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Имя числительное',GREEN,{fs:14})}
        ${ROW(76,[['сколько?',GREEN]],{fs:13})}
        ${ROW(122,[['пять',PALE],['двое',PALE]],{fs:16})}
        ${ROW(170,[['который?',GREEN]],{fs:13})}
        ${ROW(206,[['третий',PALE]],{fs:16})}
        ${T2(168,240,'числительное называет число или порядок',MUTED,{fs:10.5})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Наречие',BLUE,{fs:14})}
        ${W(72,70,'бежит',PALE)}${W(178,70,'быстро',BLUE)}${TAG(178,56,'как?',BLUE)}
        ${W(72,132,'живёт',PALE)}${W(178,132,'вдали',BLUE)}${TAG(178,118,'где?',BLUE)}
        ${W(72,194,'вернулся',PALE)}${W(190,194,'вечером',BLUE)}${TAG(190,180,'когда?',BLUE)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Служебные части речи',GOLD,{fs:14})}
        ${BOX(18,44,94,86,MUTED,'предлог',['в, на, под','за, через'])}
        ${BOX(122,44,94,86,MUTED,'союз',['и, но, а','потому что'])}
        ${BOX(226,44,94,86,MUTED,'частица',['не, бы, же','ли, только'])}
        ${RULE(150,'Ничего не называют','Они служат: связывают слова и помогают смыслу.',GOLD)}
        ${T2(168,226,'без них речь рассыпается: «кот … столе … спит»',MUTED,{fs:11})}
      `);
    }
    if(step===8){
      const items=GAME601, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Кто это слово?',GOLD,{fs:14})}
        <rect x="58" y="44" width="220" height="76" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,96,it[0],PALE,{fs:30})}
        ${T2(168,150,res==null?'выбери часть речи кнопкой ниже':(res?'верно: ':'не угадал: ')+it[0]+' — '+it[2],res==null?MUTED:(res?GREEN:RED),{fs:12})}
        ${T2(84,182,'верно: '+ok,GREEN,{fs:12})}${T2(168,182,'ошибок: '+bad,RED,{fs:12})}${T2(252,182,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'вопрос подскажет часть речи:',MUTED,{fs:10.5})}
        ${T2(168,228,'кто? что? · какой? · что делает?',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }

  const GAME601=[['снег','сущ.','существительное'],['пушистый','прил.','прилагательное'],['летит','гл.','глагол'],
    ['дорога','сущ.','существительное'],['весёлый','прил.','прилагательное'],['рисует','гл.','глагол'],
    ['радость','сущ.','существительное'],['зимний','прил.','прилагательное'],['светит','гл.','глагол']];
  window.ru601Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME601.length; st.gRes=null; chRender(0); return; }
      const it=GAME601[(st.gIdx||0)%GAME601.length];
      const map={'сущ.':'снег', };
      st.gRes=(k==='n'&&it[1]==='сущ.')||(k==='a'&&it[1]==='прил.')||(k==='v'&&it[1]==='гл.');
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };

  const PRED601=[
    ['q1','Часть речи — это…',[{k:'a',t:'работа слова в речи',ok:true,fb:'верно: что слово называет'},{k:'b',t:'количество букв',ok:false,fb:'буквы тут ни при чём'}]],
    ['q2','«Дом» отвечает на вопрос…',[{k:'a',t:'что?',ok:true,fb:'верно: это существительное'},{k:'b',t:'какой?',ok:false,fb:'какой? — это признак, прилагательное'}]],
    ['q3','«Тёплый» — это…',[{k:'a',t:'прилагательное',ok:true,fb:'верно: какой? — признак'},{k:'b',t:'существительное',ok:false,fb:'существительное отвечает кто? что?'}]],
    ['q4','«Бежит» — это…',[{k:'a',t:'глагол',ok:true,fb:'верно: что делает?'},{k:'b',t:'наречие',ok:false,fb:'наречие отвечает как? где?'}]],
    ['q5','Зачем нужно местоимение?',[{k:'a',t:'чтобы не повторять имя',ok:true,fb:'верно: она читает вместо «Маша читает»'},{k:'b',t:'чтобы называть число',ok:false,fb:'число называет числительное'}]],
    ['q6','«Пять» — это…',[{k:'a',t:'числительное',ok:true,fb:'верно: отвечает сколько?'},{k:'b',t:'наречие',ok:false,fb:'наречие — как? где? когда?'}]],
    ['q7','«Быстро» отвечает на вопрос…',[{k:'a',t:'как?',ok:true,fb:'верно: это наречие'},{k:'b',t:'что делает?',ok:false,fb:'что делает? — вопрос глагола'}]],
    ['q8','Предлог, союз, частица…',[{k:'a',t:'служат для связи слов',ok:true,fb:'верно: сами они не называют'},{k:'b',t:'называют предметы',ok:false,fb:'предметы называют существительные'}]],
    ['q9','«Пушистый» — какая часть речи?',[{k:'a',t:'прилагательное',ok:true,fb:'верно: какой?'},{k:'b',t:'глагол',ok:false,fb:'глагол — что делает?'}]]
  ];

  const NOTES601=[
    ['Часть речи','Смотри не на буквы, а на работу слова: что оно называет и на какой вопрос отвечает.'],
    ['Существительное','Кто? — живое существо, что? — всё остальное. Смех и бег тоже существительные.'],
    ['Прилагательное','Признак без предмета не живёт: рыжий кто? — кот, лиса, хвост.'],
    ['Глагол','Действие и состояние: бежит, спит, радуется. Чаще всего это сказуемое.'],
    ['Местоимение','Указывает на того, о ком говорят, не называя его. Экономит повторы в речи.'],
    ['Числительное','Сколько? — пять, двое. Который? — третий, пятый.'],
    ['Наречие','Признак действия: бежит как? — быстро, живёт где? — вдали.'],
    ['Служебные','Предлоги, союзы и частицы не члены предложения — они помогают связи и смыслу.'],
    ['Тренажёр','Сначала задай вопрос, потом называй часть речи. Так ошибиться почти невозможно.']
  ];

  function visB601(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'601';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['n','сущ.'],['a','прил.'],['v','гл.']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;font-size:16px;padding:13px 4px;border-radius:14px" onclick="ru601Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'определи часть речи'}</div>`;
      }
      const p=(step===8)?null:PRED601[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES601[step]?NOTE(NOTES601[step][0],NOTES601[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }

  window.WAVE_B[601]=visB601;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===601){ arr[i]=L601; f=true; break; } }
    if(!f) arr.push(L601);
  })();
})();

/* ================= УРОК 602 · Состав слова ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, TAG=R.tag, BOX=R.box, RULE=R.rule, M=R.morph;

  const L602 = {
    id: 602, title: 'Состав слова: из чего состоит слово', ico: '🧩',
    src: 'Русский язык · 5–6 класс · Состав слова', subj: 'rus',
    explain: [
      'Слово — как постройка: у него есть части, и каждая часть работает по-своему. Наука называет эти части морфемами, а школьный разбор по составу показывает, из чего слово собрано.',
      'Главная часть — корень. В нём смысл слова и общая часть родственников: лес, лесной, лесник, перелесок. Корень может стоять один, а может обрастать другими частями.',
      'Приставка стоит перед корнем и добавляет оттенок смысла: ехать — приехать, уехать, переехать. Одна и та же приставка меняет направление или завершённость действия.',
      'Суффикс стоит после корня и тоже добавляет смысл: лес — лесник (человек), домик (маленький). Суффиксы часто указывают на профессию, уменьшение или признак.',
      'Окончание — изменяемая часть в конце слова. Оно связывает слова между собой: лес — леса — лесу, читаю книгу — читаешь книгу. Именно окончание показывает род, число и падеж.',
      'Если убрать окончание, останется основа — часть слова без окончания: в слове лесная основа лесн-, в слове пришкольный — пришкольн-. Основа бывает и равной всему слову: у слова лес окончание нулевое, основа лес.',
      'Разбирают слово по составу в четыре шага: сначала найди окончание (измени слово), потом основу, затем корень (подбери родственников) и уже между ними — приставку и суффикс.',
      'Важно не путать однокоренные слова и формы одного слова. Лес и лесник — разные слова, у них разные основы. Лес и леса — формы одного слова: изменилось только окончание.',
      'Потренируемся: ниже показывают слово, а ты выбери, что в нём спрятано — приставка, суффикс или окончание.'
    ],
    check: { q: 'Какая часть слова стоит перед корнем?', choices: ['суффикс', 'приставка', 'окончание'], ans: 1,
      exp: 'Приставка стоит перед корнем: приехать, уехать, переехать.' },
    tasks: [
      { q: 'Найди корень в слове «пришкольный»', kind: 'choice', choices: ['школь', 'при', 'ный'], ans: 0,
        hints: ['Убери приставку при- и окончание -ый.', 'Общая часть родственников: школа, школьник — корень школь.'], sol: 'школь' },
      { q: 'Сколько частей (морфем) в слове «домики»: дом-ик-и?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Считай корень, суффикс и окончание.', 'дом + ик + и.'], sol: '3' }
    ]
  };

  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Слово — как постройка',GOLD,{fs:14})}
        ${M([['при','#7fd1ff','приставка'],['школь','#8fd1a8','корень'],['н','#ffd76a','суффикс'],['ый','#e8a0d8','окончание']],116)}
        ${RULE(168,'Из частей — смысл','Убери любую часть — и слово рассыплется или изменит смысл.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Корень — общая часть родственников',GREEN,{fs:13.5})}
        ${ROW(70,[['лес',GREEN],['лесной',PALE],['лесник',PALE]],{fs:15})}
        ${ROW(116,[['перелесок',PALE],['лесничество',PALE]],{fs:14})}
        ${RULE(152,'Смысл живёт в корне','Найди корень — подбери родственников: лес, лесной, лесник.',GREEN)}
        ${T2(168,232,'корень выделяют дугой: ^лес^',MUTED,{fs:11})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Приставка — перед корнем',BLUE,{fs:14})}
        ${M([['при','#7fd1ff',''],['ехать','#8fd1a8','']],112)}
        ${ROW(168,[['уехать',PALE],['переехать',PALE]],{fs:14})}
        ${T2(168,208,'приставка меняет направление и смысл',MUTED,{fs:11})}
        ${T2(168,228,'их пишут слитно — это часть слова',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Суффикс — после корня',GOLD,{fs:14})}
        ${M([['лес','#8fd1a8',''],['ник','#ffd76a','']],112)}
        ${ROW(168,[['домик',PALE],['маленький',PALE]],{fs:14})}
        ${T2(168,208,'суффикс добавляет оттенок: человек, размер',MUTED,{fs:11})}
        ${T2(168,228,'-ник, -ик, -ок, -еньк-',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Окончание — изменяемая часть',BLUE,{fs:14})}
        ${M([['лес','#8fd1a8',''],['', '#3d5c49',''],['а','#e8a0d8','']],96)}
        ${ROW(150,[['лес',PALE],['леса',PALE],['лесу',PALE]],{fs:14})}
        ${RULE(178,'Связывает слова','Окончание показывает род, число и падеж: читаю книгу — читаешь книгу.',BLUE)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Основа — слово без окончания',GREEN,{fs:14})}
        ${M([['пришколь','#8fd1a8','основа'],['ый','#e8a0d8','окончание']],116)}
        ${T2(168,172,'в слове «лес» окончание нулевое,',MUTED,{fs:11})}
        ${T2(168,192,'поэтому основа равна всему слову',MUTED,{fs:11})}
        ${RULE(208,'Как найти','Измени слово — та часть, что меняется, и есть окончание.',GREEN)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Порядок разбора',GOLD,{fs:14})}
        ${BOX(18,42,148,54,GOLD,'1 · окончание',['измени слово'])}
        ${BOX(172,42,148,54,GOLD,'2 · основа',['слово без окончания'])}
        ${BOX(18,108,148,54,GREEN,'3 · корень',['подбери родственников'])}
        ${BOX(172,108,148,54,BLUE,'4 · приставка и суффикс',['что осталось'])}
        ${T2(168,186,'разбирай по порядку — так не запутаешься',MUTED,{fs:11})}
        ${T2(168,210,'проверка: сложи части обратно',MUTED,{fs:11})}
        ${T2(168,234,'должно получиться то же слово',MUTED,{fs:11})}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Родственники или формы?',GOLD,{fs:13.5})}
        ${BOX(18,42,148,84,GREEN,'однокоренные',['лес — лесник','разные слова','разные основы'])}
        ${BOX(172,42,148,84,BLUE,'формы слова',['лес — леса — лесу','одно слово','меняется окончание'])}
        ${RULE(146,'Как различить','Меняешь окончание — форма. Меняешь смысл — новое слово.',GOLD)}
      `);
    }
    if(step===8){
      const items=GAME602, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Что спрятано в слове?',GOLD,{fs:14})}
        <rect x="52" y="42" width="232" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:28})}
        ${T2(168,146,'выбери часть слова кнопкой',MUTED,{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'приставка — перед корнем,',MUTED,{fs:10.5})}
        ${T2(168,228,'суффикс — после, окончание — в конце',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }

  const GAME602=[['приехать','приставка','приставка при-'],['лесник','суффикс','суффикс -ник'],
    ['леса','окончание','окончание -а'],['переход','приставка','приставка пере-'],
    ['домик','суффикс','суффикс -ик'],['книгу','окончание','окончание -у']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[602]=GAME602;
  window.ru602Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME602.length; st.gRes=null; chRender(0); return; }
      const it=GAME602[(st.gIdx||0)%GAME602.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };

  const PRED602=[
    ['q1','Корень — это…',[{k:'a',t:'общая часть родственников',ok:true,fb:'верно: лес, лесной, лесник'},{k:'b',t:'первая часть слова',ok:false,fb:'первой может стоять приставка'}]],
    ['q2','Где стоит приставка?',[{k:'a',t:'перед корнем',ok:true,fb:'верно: приехать, уехать'},{k:'b',t:'после корня',ok:false,fb:'после корня — суффикс'}]],
    ['q3','«Домик» — что добавилось?',[{k:'a',t:'суффикс -ик',ok:true,fb:'верно: он делает предмет маленьким'},{k:'b',t:'приставка до-',ok:false,fb:'до- тут нет, есть -ик после корня'}]],
    ['q4','Что показывает окончание?',[{k:'a',t:'род, число, падеж',ok:true,fb:'верно: поэтому оно меняется'},{k:'b',t:'смысл слова',ok:false,fb:'смысл живёт в корне'}]],
    ['q5','Основа — это…',[{k:'a',t:'слово без окончания',ok:true,fb:'верно: пришкольный → пришкольн-'},{k:'b',t:'слово без корня',ok:false,fb:'без корня слова не бывает'}]],
    ['q6','С чего начинают разбор?',[{k:'a',t:'с окончания',ok:true,fb:'верно: измени слово — увидишь окончание'},{k:'b',t:'с приставки',ok:false,fb:'приставку ищут уже после корня'}]],
    ['q7','«Лес» и «лесник» — это…',[{k:'a',t:'однокоренные слова',ok:true,fb:'верно: разные слова, разные основы'},{k:'b',t:'формы одного слова',ok:false,fb:'форма меняет только окончание'}]],
    ['q8','«Леса» и «лесу» — это…',[{k:'a',t:'формы одного слова',ok:true,fb:'верно: меняется только окончание'},{k:'b',t:'разные слова',ok:false,fb:'смысл один — разные падежи'}]],
    ['q9','Что в слове «приехать» перед корнем?',[{k:'a',t:'приставка при-',ok:true,fb:'верно'},{k:'b',t:'суффикс -ать',ok:false,fb:'-ать стоит после корня'}]]
  ];

  const NOTES602=[
    ['Морфемы','Части слова называют морфемами. Их четыре главные: корень, приставка, суффикс, окончание.'],
    ['Корень','Найди двух-трёх родственников — и корень определится сам.'],
    ['Приставка','Стоит перед корнем и пишется слитно. Это часть слова, а не предлог.'],
    ['Суффикс','Стоит после корня: -ник, -ик, -ок, -еньк-. Добавляет оттенок смысла.'],
    ['Окончание','Изменяемая часть. Именно она связывает слова в предложении.'],
    ['Основа','Часть слова без окончания. У слова «лес» окончание нулевое, значит основа — всё слово.'],
    ['Порядок','Окончание → основа → корень → приставка и суффикс. В конце сложи части и проверь.'],
    ['Формы и родственники','Лес и леса — формы. Лес и лесник — родственники, разные слова.'],
    ['Тренажёр','Смотри, где стоит часть: перед корнем, после корня или в самом конце.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[602]={pred:PRED602,notes:NOTES602};

  function visB602(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'602';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['приставка','приставка'],['суффикс','суффикс'],['окончание','окончание']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;font-size:16px;padding:13px 3px;border-radius:14px" onclick="ru602Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'что за часть слова спрятана?'}</div>`;
      }
      const p=(step===8)?null:PRED602[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES602[step]?NOTE(NOTES602[step][0],NOTES602[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }

  window.WAVE_B[602]=visB602;
  (function(){
    const arr=window.ARH_LESSONS||[];
    let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===602){ arr[i]=L602; f=true; break; } }
    if(!f) arr.push(L602);
  })();
})();

/* ================= УРОК 603 · Безударные гласные в корне ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L603 = {
    id: 603, title: 'Безударные гласные в корне', ico: '🔤',
    src: 'Русский язык · 5–6 класс · Орфография корня', subj: 'rus',
    explain: [
      'Самая частая ошибка в диктанте — гласная в корне, на которую не падает ударение. Мы слышим «лиса», но так же слышится и «леса». Без проверки выбрать букву невозможно: звук без ударения теряет ясность.',
      'Сравни: в слове «лес» гласная под ударением и слышится отчётливо. В слове «лесной» она без ударения — и уже сомнительна. Значит, ударение — наш помощник: оно делает гласную ясной.',
      'Правило короткое: безударную гласную в корне проверяй ударением. Для этого подбери такое слово, где та же гласная стоит под ударением: лиса — лИс, гора — гОры, письмо — пИсьма.',
      'Проверочное слово ищут двумя способами. Первый — изменить форму слова: гора — горы, окно — окна. Второй — подобрать однокоренное слово: гора — горный, окно — оконный. В обоих случаях корень один и тот же.',
      'Главная ловушка — похожие, но не родственные слова. «Вода» и «водитель» звучат похоже, но смысл разный, и проверять одно другим нельзя. Проверочное слово обязано быть родственником по смыслу.',
      'Есть слова, которые проверить нельзя: собака, корова, ворона, молоко, работа. Их называют словарными — их написание просто запоминают или смотрят в словаре.',
      'Разберём на примерах. «Голова»: проверяем — гОловы, пишем о. «Земля»: зЕмли — пишем е. «Пятак»: пЯть — пишем я. Каждый раз мы ищем слово, где гласная станет ударной.',
      'Ещё одна ошибка — подмена буквы похожей: «а» вместо «о», «и» вместо «е». Спасает одно: проверочное слово нужно произнести вслух и убедиться, что под ударением слышится именно та буква, которую ты пишешь.',
      'Алгоритм: найди корень, определи, падает ли ударение на гласную, подбери родственника с ударной гласной, напиши букву. Потренируйся ниже.'
    ],
    check: { q: 'Как проверить безударную гласную в корне?', choices: ['подобрать слово, где она под ударением', 'посмотреть на соседнюю букву', 'запомнить на слух'], ans: 0,
      exp: 'Безударную гласную проверяют ударением в однокоренном слове: лиса — лис.' },
    tasks: [
      { q: 'Какая буква пропущена: «м_лодой»?', kind: 'choice', choices: ['о', 'а'], ans: 0,
        hints: ['Подбери проверочное слово.', 'МОлодость, мОлод — пишем о.'], sol: 'о' },
      { q: 'Сколько ошибок: «лиса», «гора», «вада»?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Проверь каждое слово ударением.', 'Вода — вОды.'], sol: '1' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Гласная без ударения сомнительна',GOLD,{fs:13.5})}
        ${W(96,80,'лиса',PALE,{fs:17})}${W(216,80,'леса',PALE,{fs:17})}
        ${T2(168,116,'звучит одинаково: [л\'иса]',MUTED,{fs:11})}
        ${T2(168,146,'а пишется по-разному',RED,{fs:11.5})}
        ${RULE(170,'Вывод','Без проверки выбрать букву нельзя.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Ударение делает гласную ясной',GREEN,{fs:13.5})}
        ${W(88,80,'лес',GREEN,{fs:18})}${T2(88,112,'ударная — слышно',GREEN,{fs:10.5})}
        ${W(232,80,'лесной',PALE,{fs:18})}${T2(232,112,'без ударения — сомнительно',MUTED,{fs:10.5})}
        ${T2(168,150,'одна и та же буква е',PALE,{fs:11.5})}
        ${RULE(176,'Проверка','Ставим гласную под ударение — и вопрос снят.',GREEN)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Правило',GOLD,{fs:14})}
        ${BOX(18,42,148,66,GREEN,'безударная',['сомнительна'])}
        ${BOX(172,42,148,66,GOLD,'проверяй',['ударением'])}
        ${M([['л','#8fd1a8',''],['ис','#ffd76a',''],['а','#e8a0d8','']],140)}
        ${T2(168,178,'лИс → пишем и',GREEN,{fs:13})}
        ${T2(168,210,'гора → гОры → пишем о',GREEN,{fs:13})}
        ${T2(168,236,'письмо → пИсьма → пишем и',GREEN,{fs:13})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Как подобрать проверочное',BLUE,{fs:13.5})}
        ${BOX(18,42,148,92,GREEN,'измени форму',['гора — горы','окно — окна','стена — стены'])}
        ${BOX(172,42,148,92,BLUE,'подбери родственника',['гора — горный','окно — оконный','лесной — лес'])}
        ${RULE(148,'Корень один','В проверочном слове та же гласная под ударением.',BLUE)}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Ловушка: похожие, но не родня',RED,{fs:13})}
        ${W(84,74,'вода',PALE,{fs:17})}${T2(84,106,'вОды — проверка',GREEN,{fs:10.5})}
        ${W(238,74,'водитель',PALE,{fs:15})}${T2(238,106,'не родственник',RED,{fs:10.5})}
        ${T2(168,140,'разный смысл — нельзя проверять',MUTED,{fs:11})}
        ${RULE(158,'Правило смысла','Проверочное слово должно быть родным по смыслу.',RED)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Словарные слова — без проверки',GOLD,{fs:13.5})}
        ${ROW(72,[['собака',PALE],['корова',PALE]],{fs:15})}
        ${ROW(118,[['ворона',PALE],['молоко',PALE]],{fs:15})}
        ${ROW(164,[['работа',PALE]],{fs:15})}
        ${RULE(184,'Что делать','Запомнить или посмотреть в словаре.',GOLD)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Разбираем примеры',GREEN,{fs:14})}
        ${T2(72,62,'голова',PALE,{fs:13})}${T2(200,62,'← гОловы: о',GREEN,{fs:11})}
        ${T2(72,100,'земля',PALE,{fs:13})}${T2(200,100,'← зЕмли: е',GREEN,{fs:11})}
        ${T2(72,138,'пятак',PALE,{fs:13})}${T2(200,138,'← пЯть: я',GREEN,{fs:11})}
        ${T2(72,176,'холодный',PALE,{fs:13})}${T2(200,176,'← хОлод: о',GREEN,{fs:11})}
        ${T2(168,222,'ударение показывает букву',MUTED,{fs:11})}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Произнеси проверку вслух',BLUE,{fs:13.5})}
        ${W(100,76,'а',GOLD,{fs:18})}${T2(168,76,'или',MUTED,{fs:12})}${W(228,76,'о',GOLD,{fs:18})}
        ${T2(168,120,'под ударением слышится ясно',PALE,{fs:11.5})}
        ${RULE(140,'Совет','Проверочное слово произноси вслух: ушам доверяй, но по правилу.',BLUE)}
      `);
    }
    if(step===8){
      const items=GAME603, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Вставь букву',GOLD,{fs:14})}
        <rect x="52" y="42" width="232" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:26})}
        ${T2(168,146,res==null?'какая буква пропущена?':(res?'верно: ':'не угадал: ')+it[2],res==null?MUTED:(res?GREEN:RED),{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'подбери проверочное слово',MUTED,{fs:10.5})}
        ${T2(168,228,'и поставь гласную под ударение',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME603=[['м_лодой','о','мОлодость'],['л_сной','е','лЕс'],['г_ра','о','гОры'],
    ['п_сьмо','и','пИсьма'],['з_мля','е','зЕмли'],['х_лодный','о','хОлод']];
  window.ru603Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME603.length; st.gRes=null; chRender(0); return; }
      const it=GAME603[(st.gIdx||0)%GAME603.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED603=[
    ['q1','Почему безударная гласная опасна?',[{k:'a',t:'звучит неясно',ok:true,fb:'верно: «лиса» и «леса» звучат похоже'},{k:'b',t:'её не видно',ok:false,fb:'видно, но непонятно, какая буква'}]],
    ['q2','Что помогает проверить гласную?',[{k:'a',t:'ударение',ok:true,fb:'верно: лЕс — лЕсной'},{k:'b',t:'соседняя буква',ok:false,fb:'соседняя буква не подскажет'}]],
    ['q3','Проверочное слово для «гора»?',[{k:'a',t:'гОры',ok:true,fb:'верно: о под ударением'},{k:'b',t:'горе',ok:false,fb:'«горе» — другое слово по смыслу'}]],
    ['q4','«Вода — водитель» можно проверить?',[{k:'a',t:'нет, это не родственники',ok:true,fb:'верно: разный смысл'},{k:'b',t:'да, корень один',ok:false,fb:'буквы похожи, а смысл разный'}]],
    ['q5','Что делать со словарными словами?',[{k:'a',t:'запомнить или посмотреть в словаре',ok:true,fb:'верно: собака, корова, молоко'},{k:'b',t:'проверить ударением',ok:false,fb:'у них нет проверочного слова'}]],
    ['q6','«Молоко» — какая буква?',[{k:'a',t:'о',ok:true,fb:'верно: молОчный'},{k:'b',t:'а',ok:false,fb:'мАлоко — ошибка'}]],
    ['q7','«Земля» — какая буква?',[{k:'a',t:'е',ok:true,fb:'верно: зЕмли'},{k:'b',t:'и',ok:false,fb:'зИмля — ошибка'}]],
    ['q8','Как проверить форму слова?',[{k:'a',t:'изменить его: стена — стены',ok:true,fb:'верно'},{k:'b',t:'закрыть глаза',ok:false,fb:'нужно изменить слово'}]],
    ['q9','«Л_сной» — какая буква?',[{k:'a',t:'е',ok:true,fb:'верно: лЕс'},{k:'b',t:'и',ok:false,fb:'лИсной — ошибка'}]]
  ];
  const NOTES603=[
    ['Проблема','Без ударения гласная звучит неясно — на слух букву не выбрать.'],
    ['Помощник','Ударение делает гласную отчётливой: так работает вся проверка.'],
    ['Правило','Безударную гласную в корне проверяй ударением в родственном слове или форме.'],
    ['Два способа','Измени форму (гора — горы) или подбери родственника (гора — горный).'],
    ['Осторожно','Похожие по звучанию слова не всегда родственники: вода и водитель.'],
    ['Словарные','Собака, корова, молоко, работа — запоминаем, проверки нет.'],
    ['Примеры','Молоко — молОчный, земля — зЕмли, пятак — пЯть.'],
    ['Проверка вслух','Произнеси проверочное слово: под ударением буква слышится ясно.'],
    ['Алгоритм','Найди корень → подбери проверку с ударением → напиши букву → проверь себя.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[603]={pred:PRED603,notes:NOTES603};
  function visB603(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'603';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['о','о'],['е','е'],['и','и']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;font-size:14px" onclick="ru603Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'выбери букву'}</div>`;
      }
      const p=(step===8)?null:PRED603[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES603[step]?NOTE(NOTES603[step][0],NOTES603[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[603]=visB603;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===603){ arr[i]=L603; f=true; break; } }
    if(!f) arr.push(L603); })();
})();

/* ================= УРОК 604 · Парные и непроизносимые согласные ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L604 = {
    id: 604, title: 'Парные и непроизносимые согласные', ico: '🔠',
    src: 'Русский язык · 5–6 класс · Орфография корня', subj: 'rus',
    explain: [
      'На конце слова и перед глухими согласными звук слабеет: «зуб» мы произносим как [зуп]. Слышится один звук, а буква может быть другой. Это работа парных согласных.',
      'Парные согласные идут шестью парами: б—п, в—ф, г—к, д—т, ж—ш, з—с. В паре один звук звонкий, другой глухой, и в слабой позиции они путаются.',
      'Правило проверки простое: измени слово так, чтобы после согласной стоял гласный звук. Зуб — зубы, снег — снега, глаз — глаза. Гласный «вытягивает» настоящий звук.',
      'Помогают и согласные л, м, н, р: зуб — зубной, снег — снежный. После них согласная тоже звучит ясно. Проверочное слово ищут так же, как для гласной: родственник или форма.',
      'Отдельная история — непроизносимые согласные. Мы пишем «солнце», а слышим [сонцэ]. Буква есть, звука нет. Такие согласные прячутся в сочетаниях стн, здн, лнц, вств, рдц.',
      'Проверяют их тем же способом: подбери слово, где согласная зазвучит. Солнце — солнышко, сердце — сердечко, здравствуй — здравый, местный — место.',
      'Но есть ловушка: иногда согласная только кажется. «Вкусный» — проверяем «вкусен»: буквы т нет, и писать её не надо. «Опасный» — «опасен», «чудесный» — «чудеса». Проверка спасает и от лишней буквы.',
      'Ещё одна группа — удвоенные согласные: класс, суббота, аллея, хоккей. Их нельзя проверить, это словарные слова, и запоминают их по словарю.',
      'Алгоритм: найди сомнительную согласную, подбери проверочное слово с гласной после неё, послушай и напиши. Потренируйся ниже.'
    ],
    check: { q: 'Как проверить парную согласную на конце слова?', choices: ['поставить после неё гласную', 'произнести громче', 'запомнить'], ans: 0,
      exp: 'Зуб — зубы: после согласной встал гласный, и слышно настоящую букву.' },
    tasks: [
      { q: 'Какая буква в слове «сне_»?', kind: 'choice', choices: ['г', 'к'], ans: 0,
        hints: ['Подбери проверочное слово.', 'Снега — слышим г.'], sol: 'г' },
      { q: 'Сколько лишних букв: «вкусный», «солнце», «опасный»?', kind: 'unit', ans: 0, tol: 0,
        hints: ['Проверь каждое: вкусен, солнышко, опасен.', 'В слове «вкусный» буквы т нет.'], sol: '0' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Слышим одно, пишем другое',GOLD,{fs:13.5})}
        ${W(110,80,'зуб',PALE,{fs:20})}
        ${T2(168,116,'произносим [зуп]',RED,{fs:12})}
        ${RULE(134,'Слабая позиция','На конце слова и перед глухими звук путается.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Шесть пар согласных',GREEN,{fs:14})}
        ${BOX(20,44,92,58,GREEN,'звонкие',['б в г д ж з'])}
        ${BOX(124,44,92,58,MUTED,'глухие',['п ф к т ш с'])}
        ${BOX(228,44,92,58,GOLD,'в паре',['путаются'])}
        ${T2(168,130,'б—п · в—ф · г—к · д—т · ж—ш · з—с',PALE,{fs:12})}
        ${RULE(158,'Где опасно','конец слова и положение перед глухой согласной.',GOLD)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Проверка: после согласной — гласный',GREEN,{fs:12.5})}
        ${M([['зуб','#8fd1a8','сомнительно'],['ы','#ffd76a','проверка']],112)}
        ${T2(168,178,'зубы — слышим [б]',GREEN,{fs:13})}
        ${T2(168,206,'снега · глаза · ложек',PALE,{fs:12})}
        ${T2(168,232,'помогают и л, м, н, р: зубной',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Примеры',GREEN,{fs:14})}
        ${T2(84,66,'снег',PALE,{fs:14})}${T2(240,66,'← снега',GREEN,{fs:11.5})}
        ${T2(84,104,'ложка',PALE,{fs:14})}${T2(240,104,'← ложечка',GREEN,{fs:11.5})}
        ${T2(84,142,'глаз',PALE,{fs:14})}${T2(240,142,'← глаза',GREEN,{fs:11.5})}
        ${T2(84,180,'мороз',PALE,{fs:14})}${T2(240,180,'← морозы',GREEN,{fs:11.5})}
        ${T2(168,222,'проверяем — и буква перестаёт спорить',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Непроизносимые согласные',BLUE,{fs:13})}
        ${W(92,76,'солнце',PALE,{fs:17})}${T2(92,108,'слышим [сонцэ]',RED,{fs:10.5})}
        ${W(240,76,'сердце',PALE,{fs:17})}${T2(240,108,'слышим [сэрцэ]',RED,{fs:10.5})}
        ${T2(168,146,'буква есть — звука нет',MUTED,{fs:11})}
        ${RULE(164,'Сочетания','стн, здн, лнц, вств, рдц.',BLUE)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Проверка непроизносимых',GREEN,{fs:13})}
        ${T2(84,66,'солнце',PALE,{fs:13.5})}${T2(242,66,'← солнышко',GREEN,{fs:11.5})}
        ${T2(84,104,'сердце',PALE,{fs:13.5})}${T2(242,104,'← сердечко',GREEN,{fs:11.5})}
        ${T2(84,142,'местный',PALE,{fs:13.5})}${T2(242,142,'← место',GREEN,{fs:11.5})}
        ${T2(84,180,'здравствуй',PALE,{fs:13.5})}${T2(242,180,'← здравый',GREEN,{fs:11.5})}
        ${T2(168,222,'согласная зазвучала — значит, буква нужна',MUTED,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Ловушка: буквы нет',RED,{fs:13.5})}
        ${T2(84,70,'вкусный',PALE,{fs:14})}${T2(240,70,'← вкусен: нет т',GREEN,{fs:11.5})}
        ${T2(84,110,'опасный',PALE,{fs:14})}${T2(240,110,'← опасен: нет т',GREEN,{fs:11.5})}
        ${T2(84,150,'чудесный',PALE,{fs:14})}${T2(240,150,'← чудеса: нет т',GREEN,{fs:11.5})}
        ${RULE(176,'Внимание','Проверка спасает и от лишней буквы.',RED)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Удвоенные согласные',GOLD,{fs:14})}
        ${ROW(72,[['класс',PALE],['суббота',PALE]],{fs:15})}
        ${ROW(118,[['аллея',PALE],['хоккей',PALE]],{fs:15})}
        ${RULE(148,'Словарные слова','Проверить нельзя — запоминаем по словарю.',GOLD)}
      `);
    }
    if(step===8){
      const items=GAME604, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Выбери букву',GOLD,{fs:14})}
        <rect x="52" y="42" width="232" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:26})}
        ${T2(168,146,res==null?'какая буква на месте пропуска?':(res?'верно: ':'не угадал: ')+it[2],res==null?MUTED:(res?GREEN:RED),{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'подбери проверочное слово,',MUTED,{fs:10.5})}
        ${T2(168,228,'где после согласной стоит гласный',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME604=[['сне_','г','снега'],['гла_','з','глаза'],['ло_ка','ж','ложечка'],
    ['моро_','з','морозы'],['зу_','б','зубы'],['кни_ка','ж','книжечка']];
  window.ru604Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME604.length; st.gRes=null; chRender(0); return; }
      const it=GAME604[(st.gIdx||0)%GAME604.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED604=[
    ['q1','Почему «зуб» звучит как [зуп]?',[{k:'a',t:'звук ослаб на конце',ok:true,fb:'верно: слабая позиция'},{k:'b',t:'мы говорим неправильно',ok:false,fb:'так устроен язык: звук оглушается'}]],
    ['q2','Сколько пар согласных?',[{k:'a',t:'шесть',ok:true,fb:'верно: б-п, в-ф, г-к, д-т, ж-ш, з-с'},{k:'b',t:'три',ok:false,fb:'пар шесть'}]],
    ['q3','Проверка для «снег»?',[{k:'a',t:'снега',ok:true,fb:'верно: после г стоит гласный'},{k:'b',t:'снежный',ok:false,fb:'тоже годится, но лучше «снега» — гласный яснее'}]],
    ['q4','Что делать с «солнце»?',[{k:'a',t:'проверить: солнышко',ok:true,fb:'верно: буква л звучит'},{k:'b',t:'убрать л',ok:false,fb:'без л будет ошибка'}]],
    ['q5','«Вкусный» — нужна ли т?',[{k:'a',t:'нет: вкусен',ok:true,fb:'верно: проверка показала, что буквы нет'},{k:'b',t:'да: вкусТный',ok:false,fb:'это ошибка'}]],
    ['q6','«Местный» — проверка?',[{k:'a',t:'место',ok:true,fb:'верно: т звучит'},{k:'b',t:'месный',ok:false,fb:'без т — ошибка'}]],
    ['q7','«Класс» — как проверить?',[{k:'a',t:'никак, это словарное',ok:true,fb:'верно: удвоенные согласные запоминаем'},{k:'b',t:'класы',ok:false,fb:'проверки нет'}]],
    ['q8','Что стоит после согласной в проверке?',[{k:'a',t:'гласный',ok:true,fb:'верно: зубы, снега'},{k:'b',t:'ещё один согласный',ok:false,fb:'согласный не поможет'}]],
    ['q9','«Ло_ка» — какая буква?',[{k:'a',t:'ж',ok:true,fb:'верно: ложечка'},{k:'b',t:'ш',ok:false,fb:'лошка — ошибка'}]]
  ];
  const NOTES604=[
    ['Слабая позиция','На конце слова и перед глухими согласными звонкий звук оглушается.'],
    ['Пары','Шесть пар: б—п, в—ф, г—к, д—т, ж—ш, з—с.'],
    ['Проверка','После согласной поставь гласный: зуб — зубы. Или л, м, н, р: зубной.'],
    ['Примеры','Снег — снега, ложка — ложечка, глаз — глаза, мороз — морозы.'],
    ['Непроизносимые','Сочетания стн, здн, лнц, вств, рдц: солнце, сердце, местный.'],
    ['Проверка','Солнце — солнышко, сердце — сердечко, местный — место.'],
    ['Ловушка','Вкусный, опасный, чудесный — буквы т нет, проверка это доказывает.'],
    ['Удвоенные','Класс, суббота, аллея — словарные слова.'],
    ['Алгоритм','Найди сомнительную согласную → подбери проверку → послушай → напиши.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[604]={pred:PRED604,notes:NOTES604};
  function visB604(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'604';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['г','г'],['з','з'],['б','б'],['ж','ж']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 22%;font-size:16.5px;padding:14px 4px;border-radius:14px" onclick="ru604Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'выбери букву'}</div>`;
      }
      const p=(step===8)?null:PRED604[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES604[step]?NOTE(NOTES604[step][0],NOTES604[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[604]=visB604;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===604){ arr[i]=L604; f=true; break; } }
    if(!f) arr.push(L604); })();
})();

/* ================= УРОК 605 · Приставки, предлоги, ъ ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L605 = {
    id: 605, title: 'Приставки и предлоги. Твёрдый знак', ico: '🧷',
    src: 'Русский язык · 5–6 класс · Приставки и предлоги', subj: 'rus',
    explain: [
      'Приставка и предлог часто звучат одинаково, но устроены по-разному. Приставка — часть слова, она приросла к корню. Предлог — отдельное маленькое слово, которое стоит перед другим словом.',
      'Различить их легко: между предлогом и словом можно вставить другое слово или вопрос. «В доме» → в (каком?) доме. С приставкой так не получится: «вошёл» не разорвать.',
      'Приставки пишутся слитно: приехал, ушёл, зашёл, отнёс. Предлоги пишутся раздельно: в лесу, на столе, за домом, под деревом.',
      'Сравни: «зашёл за другом». В первом слове за- — приставка (слитно), во втором за — предлог (раздельно). Смысл разный, и написание разное.',
      'Отдельное правило — твёрдый знак после приставки. Он пишется, если приставка оканчивается на согласную, а корень начинается с е, ё, ю, я: съел, объявил, подъезд, предъюбилейный.',
      'Если приставка оканчивается на гласную, твёрдый знак не нужен: заехал, поехал, приехал. И внутри корня его не бывает: яма, семья — здесь мягкий знак, а не твёрдый.',
      'Приставки пишутся единообразно: под-, от-, над-, об-, про- не меняются, как бы они ни звучали. «Отдал» и «отплыл» — везде от-.',
      'Не путай также приставку с корнем: в слове «приехал» нет предлога, а есть приставка при- и корень -ех-. Разбор по составу помогает увидеть это точно.',
      'Алгоритм: проверь, можно ли вставить слово — можно, значит предлог, пишем раздельно. Нельзя — это приставка, пишем слитно. И отдельно следи за твёрдым знаком после приставки на согласную.'
    ],
    check: { q: 'Как отличить предлог от приставки?', choices: ['между предлогом и словом можно вставить слово', 'предлог длиннее', 'по ударению'], ans: 0,
      exp: 'В (каком?) доме — можно вставить слово, значит «в» — предлог, пишем раздельно.' },
    tasks: [
      { q: 'Как пишется: «(за)шёл (за)другом»?', kind: 'choice', choices: ['зашёл за другом', 'за шёл задругом', 'зашёл задругом'], ans: 0,
        hints: ['Приставка — слитно, предлог — раздельно.', 'Зашёл — приставка, за другом — предлог.'], sol: 'зашёл за другом' },
      { q: 'В каком слове нужен твёрдый знак: «с_ел», «за_ехал»?', kind: 'choice', choices: ['съел', 'заехал', 'в обоих словах'], ans: 0,
        hints: ['Смотри на конец приставки.', 'С- на согласную, за- на гласную.'], sol: 'съел' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Часть слова или слово?',GOLD,{fs:13.5})}
        ${BOX(18,46,148,84,BLUE,'приставка',['часть слова','приросла к корню'])}
        ${BOX(172,46,148,84,GOLD,'предлог',['отдельное слово','стоит перед словом'])}
        ${T2(168,164,'звучат одинаково — а пишутся по-разному',MUTED,{fs:11})}
        ${RULE(182,'Сравни','зашёл · за другом',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Как различить',GREEN,{fs:14})}
        ${W(96,76,'в',GOLD,{fs:18})}${W(190,76,'доме',PALE,{fs:17})}
        ${T2(168,112,'в (каком?) доме — слово вставить можно',GREEN,{fs:11.5})}
        ${T2(168,148,'значит «в» — предлог, пишем раздельно',PALE,{fs:11.5})}
        ${RULE(166,'С приставкой','вошёл — вставить слово нельзя, это часть слова.',GREEN)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Приставки — слитно',BLUE,{fs:14})}
        ${ROW(72,[['приехал',PALE],['ушёл',PALE]],{fs:15})}
        ${ROW(118,[['зашёл',PALE],['отнёс',PALE]],{fs:15})}
        ${RULE(152,'Запомни','Приставка — часть слова, отделять её нельзя.',BLUE)}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Предлоги — раздельно',GOLD,{fs:14})}
        ${ROW(72,[['в лесу',PALE],['на столе',PALE]],{fs:15})}
        ${ROW(118,[['за домом',PALE],['под деревом',PALE]],{fs:14})}
        ${RULE(152,'Запомни','Предлог — отдельное слово, всегда с пробелом.',GOLD)}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Твёрдый знак после приставки',GREEN,{fs:12.5})}
        ${M([['с','#7fd1ff','согласная'],['ъ','#ffd76a','знак'],['ел','#8fd1a8','е, ё, ю, я']],112)}
        ${T2(168,178,'съел · объявил · подъезд',PALE,{fs:12.5})}
        ${T2(168,206,'приставка на согласную + е, ё, ю, я',MUTED,{fs:11})}
        ${T2(168,232,'предъюбилейный · объём',MUTED,{fs:11})}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Когда твёрдый знак не нужен',RED,{fs:13})}
        ${T2(84,74,'заехал',PALE,{fs:14})}${T2(240,74,'← приставка на гласную',GREEN,{fs:11})}
        ${T2(84,116,'яма',PALE,{fs:14})}${T2(240,116,'← знак внутри корня',GREEN,{fs:11})}
        ${T2(84,158,'семья',PALE,{fs:14})}${T2(240,158,'← здесь мягкий знак',GREEN,{fs:11})}
        ${T2(168,206,'ъ бывает только после приставки',MUTED,{fs:11})}
        ${T2(168,232,'и только перед е, ё, ю, я',MUTED,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Приставки пишутся единообразно',BLUE,{fs:12.5})}
        ${BOX(20,44,140,70,GREEN,'не меняются',['под-, от-, над-, об-','про-, за-, на-'])}
        ${BOX(176,44,140,70,GOLD,'примеры',['отдал · отплыл','надписал · обрубил'])}
        ${RULE(130,'Проверка','Как бы приставка ни звучала, пишем её одинаково.',BLUE)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Приставка или корень?',GOLD,{fs:13.5})}
        ${M([['при','#7fd1ff','приставка'],['ех','#8fd1a8','корень'],['а','#e8a0d8','суфф.'],['л','#ffd76a','']],112)}
        ${T2(168,178,'разбор по составу показывает границы частей',MUTED,{fs:11})}
        ${T2(168,204,'поэтому приставку не спутать с предлогом',MUTED,{fs:11})}
        ${T2(168,230,'предлог в состав слова не входит',PALE,{fs:11})}
      `);
    }
    if(step===8){
      const items=GAME605, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Слитно или раздельно?',GOLD,{fs:13.5})}
        <rect x="46" y="42" width="244" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:22})}
        ${T2(168,146,'как пишется?',MUTED,{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'попробуй вставить слово между',MUTED,{fs:10.5})}
        ${T2(168,228,'получилось — это предлог',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME605=[['(за)шёл','слитно','зашёл — приставка'],['(на)столе','раздельно','на столе — предлог'],
    ['(под)ъезд','слитно','подъезд — приставка'],['(в)лесу','раздельно','в лесу — предлог'],
    ['(от)нёс','слитно','отнёс — приставка'],['(за)домом','раздельно','за домом — предлог']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[605]=GAME605;
  window.ru605Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME605.length; st.gRes=null; chRender(0); return; }
      const it=GAME605[(st.gIdx||0)%GAME605.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED605=[
    ['q1','Приставка — это…',[{k:'a',t:'часть слова',ok:true,fb:'верно: она внутри слова'},{k:'b',t:'отдельное слово',ok:false,fb:'отдельное слово — предлог'}]],
    ['q2','Как проверить предлог?',[{k:'a',t:'вставить слово между',ok:true,fb:'верно: в (каком?) доме'},{k:'b',t:'посмотреть на длину',ok:false,fb:'длина тут ни при чём'}]],
    ['q3','«(при)ехал» — как писать?',[{k:'a',t:'слитно',ok:true,fb:'верно: это приставка'},{k:'b',t:'раздельно',ok:false,fb:'приехал — одно слово'}]],
    ['q4','«(в)лесу» — как писать?',[{k:'a',t:'раздельно',ok:true,fb:'верно: это предлог'},{k:'b',t:'слитно',ok:false,fb:'в лесу — два слова'}]],
    ['q5','Когда пишется ъ?',[{k:'a',t:'после приставки на согласную перед е, ё, ю, я',ok:true,fb:'верно: съел, подъезд'},{k:'b',t:'всегда после приставки',ok:false,fb:'заехал — без ъ'}]],
    ['q6','«За_ехал» — нужен ъ?',[{k:'a',t:'нет: приставка на гласную',ok:true,fb:'верно'},{k:'b',t:'да: заъехал',ok:false,fb:'так не пишут'}]],
    ['q7','«Подъезд» — почему ъ?',[{k:'a',t:'под- на согласную, дальше е',ok:true,fb:'верно'},{k:'b',t:'для красоты',ok:false,fb:'есть правило'}]],
    ['q8','«Отдал» и «отплыл» — приставка?',[{k:'a',t:'одна и та же от-',ok:true,fb:'верно: приставки единообразны'},{k:'b',t:'разные: ад- и от-',ok:false,fb:'всегда от-'}]],
    ['q9','«(за)домом» — как писать?',[{k:'a',t:'раздельно',ok:true,fb:'верно: за домом'},{k:'b',t:'слитно',ok:false,fb:'задОмом — ошибка'}]]
  ];
  const NOTES605=[
    ['Разница','Приставка — часть слова, предлог — отдельное слово.'],
    ['Проверка','Вставь слово: в (каком?) доме. Получилось — предлог.'],
    ['Слитно','Приставки: приехал, ушёл, зашёл, отнёс.'],
    ['Раздельно','Предлоги: в лесу, на столе, за домом, под деревом.'],
    ['Твёрдый знак','Приставка на согласную + е, ё, ю, я: съел, объявил, подъезд.'],
    ['Без знака','Заехал (приставка на гласную), яма, семья (знак в корне).'],
    ['Единообразие','Под-, от-, над-, об- пишутся всегда одинаково.'],
    ['Разбор','Границы частей видно при разборе по составу: при-ех-а-л.'],
    ['Алгоритм','Можно вставить слово → предлог, раздельно. Нельзя → приставка, слитно.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[605]={pred:PRED605,notes:NOTES605};
  function visB605(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'605';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['слитно','слитно'],['раздельно','раздельно']].map(x=>
          `<button type="button" class="btn" style="flex:1;font-size:16.5px;padding:14px 10px;border-radius:14px" onclick="ru605Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'выбери написание'}</div>`;
      }
      const p=(step===8)?null:PRED605[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES605[step]?NOTE(NOTES605[step][0],NOTES605[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[605]=visB605;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===605){ arr[i]=L605; f=true; break; } }
    if(!f) arr.push(L605); })();
})();

/* ================= УРОК 606 · Имя существительное: род и число ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L606 = {
    id: 606, title: 'Имя существительное: род и число', ico: '🧱',
    src: 'Русский язык · 5–6 класс · Имя существительное', subj: 'rus',
    explain: [
      'У имени существительного есть постоянный признак — род. Он не меняется: дом всегда мужского рода, а книга — женского, сколько бы раз мы их ни называли.',
      'Род определяют по трём словам-помощникам: он — мужской род, она — женский, оно — средний. Он стол, она парта, оно окно.',
      'Определить род можно и по окончанию в начальной форме: мужской род часто без окончания (стол, конь), женский — с -а, -я (парта, земля), средний — с -о, -е (окно, поле).',
      'Есть слова с мягким знаком на конце, и тут помощник особенно нужен: он день — мужской род, она ночь — женский. Смотри на смысл и проверяй по словарю.',
      'Второй признак — число. Существительное бывает в единственном числе (стол) или во множественном (столы). Число меняется: это не постоянный признак.',
      'Некоторые слова живут только в одном числе. Только в единственном: молоко, сахар, храбрость. Только во множественном: ножницы, каникулы, брюки — у них нет формы единственного числа.',
      'Важно: у существительных во множественном числе род не определяют. «Столы» — это не «они», а форма множественного числа слова «стол» мужского рода.',
      'Отдельное правило про мягкий знак после шипящих. У существительных женского рода он пишется: рожь, ночь, мышь, помощь. У мужского рода — не пишется: нож, врач, ключ, товарищ.',
      'Алгоритм: поставь слово в начальную форму, подставь он, она или оно — и род найдён. Затем посмотри, меняется ли слово по числам. Потренируйся ниже.'
    ],
    check: { q: 'Какие слова-помощники определяют род?', choices: ['он, она, оно', 'один, два, три', 'кто, что'], ans: 0,
      exp: 'Он — мужской, она — женский, оно — средний род.' },
    tasks: [
      { q: 'Какого рода слово «ночь»?', kind: 'choice', choices: ['женского', 'мужского'], ans: 0,
        hints: ['Подставь «она» или «он».', 'Она ночь — женский род, поэтому пишем ь.'], sol: 'женского' },
      { q: 'Сколько слов только во множественном числе: ножницы, столы, каникулы, брюки?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Проверь, есть ли форма единственного числа.', 'Столы — это форма слова стол, значит он не подходит.'], sol: '3' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Род — постоянный признак',GOLD,{fs:13.5})}
        ${BOX(20,46,92,72,BLUE,'он',['мужской','стол, конь'])}
        ${BOX(124,46,92,72,GOLD,'она',['женский','парта, земля'])}
        ${BOX(228,46,92,72,GREEN,'оно',['средний','окно, поле'])}
        ${T2(168,160,'род не меняется никогда',MUTED,{fs:11})}
        ${RULE(178,'Слова-помощники','Он, она, оно — самый быстрый способ.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Определяем род',GOLD,{fs:14})}
        ${W(88,76,'стол',PALE,{fs:17})}${T2(88,108,'он → мужской',BLUE,{fs:11})}
        ${W(240,76,'парта',PALE,{fs:17})}${T2(240,108,'она → женский',GOLD,{fs:11})}
        ${W(164,156,'окно',PALE,{fs:17})}${T2(164,188,'оно → средний',GREEN,{fs:11})}
        ${T2(168,226,'подставь местоимение — и род найдён',MUTED,{fs:11})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Подсказка по окончанию',BLUE,{fs:13.5})}
        ${BOX(18,44,148,96,BLUE,'мужской',['без окончания:','стол, конь, дом'])}
        ${BOX(172,44,148,96,GOLD,'женский',['-а, -я:','парта, земля, долина'])}
        ${BOX(18,152,148,56,GREEN,'средний',['-о, -е: окно, поле'])}
        ${BOX(172,152,148,56,MUTED,'запомни',['смотри на начальную форму'])}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Слова с мягким знаком',GOLD,{fs:13.5})}
        ${W(88,80,'день',PALE,{fs:17})}${T2(88,112,'он → мужской',BLUE,{fs:11})}
        ${W(240,80,'ночь',PALE,{fs:17})}${T2(240,112,'она → женский',GOLD,{fs:11})}
        ${T2(168,152,'мягкий знак род не подскажет',MUTED,{fs:11})}
        ${RULE(170,'Что делать','Подставь он или она, при сомнении — в словарь.',GOLD)}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Число: один или много',GREEN,{fs:14})}
        ${W(100,76,'стол',PALE,{fs:17})}${T2(100,108,'единственное',GREEN,{fs:11})}
        ${W(236,76,'столы',PALE,{fs:17})}${T2(236,108,'множественное',GREEN,{fs:11})}
        ${T2(168,150,'число меняется — это не постоянный признак',MUTED,{fs:11})}
        ${RULE(168,'Как проверить','Поставь слово во множественное число и обратно.',GREEN)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Слова только в одном числе',GOLD,{fs:13})}
        ${BOX(18,44,148,92,GREEN,'только единственное',['молоко, сахар','храбрость, листва'])}
        ${BOX(172,44,148,92,BLUE,'только множественное',['ножницы, каникулы','брюки, ворота'])}
        ${RULE(150,'Причина','У этих слов нет второй формы числа.',GOLD)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Род у множественного числа?',RED,{fs:13.5})}
        ${W(120,84,'столы',PALE,{fs:18})}
        ${T2(168,124,'не «они» — это форма слова «стол»',PALE,{fs:11.5})}
        ${T2(168,152,'род определяют только в единственном числе',MUTED,{fs:11})}
        ${RULE(170,'Порядок','Сначала поставь слово в единственное число.',RED)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Мягкий знак после шипящих',BLUE,{fs:13})}
        ${BOX(18,44,148,92,GOLD,'женский — с ь',['рожь, ночь','мышь, помощь'])}
        ${BOX(172,44,148,92,MUTED,'мужской — без ь',['нож, врач','ключ, товарищ'])}
        ${RULE(150,'Правило','Определи род — и знак решится сам.',BLUE)}
      `);
    }
    if(step===8){
      const items=GAME606, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Определи род',GOLD,{fs:14})}
        <rect x="52" y="42" width="232" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:28})}
        ${T2(168,146,'какого рода слово?',MUTED,{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'подставь он, она или оно',MUTED,{fs:10.5})}
        ${T2(168,228,'и посмотри на окончание',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME606=[['ночь','она','женский род'],['стол','он','мужской род'],['окно','оно','средний род'],
    ['мышь','она','женский род'],['ключ','он','мужской род'],['поле','оно','средний род']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[606]=GAME606;
  window.ru606Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME606.length; st.gRes=null; chRender(0); return; }
      const it=GAME606[(st.gIdx||0)%GAME606.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED606=[
    ['q1','Род существительного — признак…',[{k:'a',t:'постоянный',ok:true,fb:'верно: он не меняется'},{k:'b',t:'изменяемый',ok:false,fb:'меняется число, а не род'}]],
    ['q2','«Парта» — какой род?',[{k:'a',t:'женский',ok:true,fb:'верно: она парта'},{k:'b',t:'мужской',ok:false,fb:'он парта — не бывает'}]],
    ['q3','«Окно» — какой род?',[{k:'a',t:'средний',ok:true,fb:'верно: оно окно'},{k:'b',t:'женский',ok:false,fb:'она окно — неверно'}]],
    ['q4','Как определить род у слова «ночь»?',[{k:'a',t:'подставить «она»',ok:true,fb:'верно: женский род, пишем ь'},{k:'b',t:'по количеству букв',ok:false,fb:'буквы не помогут'}]],
    ['q5','«Столы» — какой род?',[{k:'a',t:'не определяют во множественном числе',ok:true,fb:'верно: ставим в единственное — стол'},{k:'b',t:'средний',ok:false,fb:'сначала единственное число'}]],
    ['q6','«Ножницы» — что за слово?',[{k:'a',t:'только множественное число',ok:true,fb:'верно: формы единственного нет'},{k:'b',t:'только единственное',ok:false,fb:'ножница — не говорят'}]],
    ['q7','«Рожь» — нужен ь?',[{k:'a',t:'да: женский род',ok:true,fb:'верно'},{k:'b',t:'нет: мужской род',ok:false,fb:'рожь — женский род'}]],
    ['q8','«Ключ» — нужен ь?',[{k:'a',t:'нет: мужской род',ok:true,fb:'верно'},{k:'b',t:'да: женский род',ok:false,fb:'ключ — мужской род'}]],
    ['q9','«Мышь» — какой род?',[{k:'a',t:'женский',ok:true,fb:'верно: она мышь'},{k:'b',t:'мужской',ok:false,fb:'она мышь'}]]
  ];
  const NOTES606=[
    ['Род','Постоянный признак: он, она, оно.'],
    ['Определение','Подставь местоимение или посмотри на окончание начальной формы.'],
    ['Окончания','Мужской — без окончания, женский — -а/-я, средний — -о/-е.'],
    ['Мягкий знак','День — он, ночь — она: знак род не подсказывает.'],
    ['Число','Единственное и множественное; число меняется.'],
    ['Одно число','Молоко, сахар — только единственное; ножницы, каникулы — только множественное.'],
    ['Множественное','Род определяют только в единственном числе.'],
    ['Шипящие','Женский род с ь (рожь, мышь), мужской без ь (нож, ключ).'],
    ['Алгоритм','Начальная форма → он/она/оно → род; затем проверь число.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[606]={pred:PRED606,notes:NOTES606};
  function visB606(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'606';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['он','он'],['она','она'],['оно','оно']].map(x=>
          `<button type="button" class="btn" style="flex:1;font-size:16.5px;padding:14px 10px;border-radius:14px" onclick="ru606Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'подставь местоимение'}</div>`;
      }
      const p=(step===8)?null:PRED606[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES606[step]?NOTE(NOTES606[step][0],NOTES606[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[606]=visB606;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===606){ arr[i]=L606; f=true; break; } }
    if(!f) arr.push(L606); })();
})();

/* ================= УРОК 607 · Падежи ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L607 = {
    id: 607, title: 'Падежи: шесть вопросов', ico: '🧭',
    src: 'Русский язык · 5–6 класс · Падежи', subj: 'rus',
    explain: [
      'Слово в предложении меняет форму — и от этого зависит его роль. Эта форма называется падежом. «Книга лежит» и «нет книги» — одно слово, но разные падежи и разные роли.',
      'Падежей шесть: именительный, родительный, дательный, винительный, творительный, предложный. У каждого свой вопрос, и по вопросу падеж определяют быстрее всего.',
      'Именительный падеж отвечает на кто? что? Это падеж действующего лица: Кто читает? — Ученик. Что лежит? — Книга. В предложении это подлежащее.',
      'Родительный падеж — кого? чего? Он говорит об отсутствии или принадлежности: нет книги, край леса, дом брата. Его предлоги: от, до, из, без, у, около, для.',
      'Дательный падеж — кому? чему? Он про адресата: дать другу, письмо брату, радоваться солнцу. Предлоги: к, по.',
      'Винительный падеж — кого? что? Он про того, на кого направлено действие: вижу книгу, читаю письмо, встретил друга. Предлоги: в, на, за, про, через.',
      'Творительный падеж — кем? чем? Он про инструмент и совместность: рисую карандашом, горжусь братом, иду с другом. Предлоги: с, над, под, за, перед.',
      'Предложный падеж — о ком? о чём? Он всегда идёт с предлогом и говорит о месте или теме: думаю о книге, гуляю в парке, читаю о космосе. Предлоги: в, на, о, об, при.',
      'Как определить падеж: найди слово, с которым связано существительное, задай от него вопрос. Потренируйся ниже: показано словосочетание, а ты выбери падеж.'
    ],
    check: { q: 'На какие вопросы отвечает родительный падеж?', choices: ['кого? чего?', 'кому? чему?', 'кем? чем?'], ans: 0,
      exp: 'Родительный — кого? чего?: нет книги, край леса.' },
    tasks: [
      { q: 'Какой падеж у слова «книгу» в «читаю книгу»?', kind: 'choice', choices: ['винительный', 'родительный'], ans: 0,
        hints: ['Задай вопрос: читаю (кого? что?)', 'Вижу книгу — винительный падеж.'], sol: 'винительный' },
      { q: 'Сколько падежей в русском языке?', kind: 'unit', ans: 6, tol: 0,
        hints: ['Вспомни примеры: книга, книги, книге, книгу, книгой, о книге.', 'Их шесть.'], sol: '6' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Падеж — форма и роль',GOLD,{fs:13.5})}
        ${T2(90,70,'Книга лежит',PALE,{fs:13})}
        ${T2(240,70,'нет книги',PALE,{fs:13})}
        ${T2(168,104,'одно слово — разные роли',MUTED,{fs:11})}
        ${BOX(18,126,300,54,GREEN,'Падеж показывает, кем слово работает в предложении',[])}
        ${T2(168,204,'их шесть, у каждого свой вопрос',PALE,{fs:11.5})}
        ${T2(168,230,'вопрос задают от соседнего слова',MUTED,{fs:11})}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,20,'Шесть падежей',GOLD,{fs:14})}
        ${BOX(14,38,152,48,BLUE,'Именительный',['кто? что?'])}
        ${BOX(170,38,152,48,GREEN,'Родительный',['кого? чего?'])}
        ${BOX(14,92,152,48,GOLD,'Дательный',['кому? чему?'])}
        ${BOX(170,92,152,48,RED,'Винительный',['кого? что?'])}
        ${BOX(14,146,152,48,PALE,'Творительный',['кем? чем?'])}
        ${BOX(170,146,152,48,MUTED,'Предложный',['о ком? о чём?'])}
        ${T2(168,214,'вопрос — ключ к падежу',MUTED,{fs:11})}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Именительный — кто? что?',BLUE,{fs:13.5})}
        ${W(120,80,'Ученик',PALE,{fs:18})}${T2(120,112,'кто? — действует',BLUE,{fs:11})}
        ${T2(168,154,'это подлежащее предложения',PALE,{fs:11.5})}
        ${RULE(170,'Пример','Ученик читает. Что лежит? — Книга.',BLUE)}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Родительный — кого? чего?',GREEN,{fs:13})}
        ${ROW(70,[['нет',PALE],['книги',GREEN]],{fs:15})}
        ${ROW(116,[['край',PALE],['леса',GREEN]],{fs:15})}
        ${T2(168,156,'предлоги: от, до, из, без, у, около',MUTED,{fs:11})}
        ${T2(168,186,'говорит об отсутствии или принадлежности',PALE,{fs:11})}
        ${T2(168,214,'дом брата · чашка чая',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Дательный — кому? чему?',GOLD,{fs:13.5})}
        ${ROW(74,[['дать',PALE],['другу',GOLD]],{fs:15})}
        ${ROW(120,[['письмо',PALE],['брату',GOLD]],{fs:15})}
        ${T2(168,162,'предлоги: к, по',MUTED,{fs:11})}
        ${RULE(178,'Смысл','Падеж адресата: действие направлено к кому-то.',GOLD)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Винительный — кого? что?',RED,{fs:13.5})}
        ${ROW(74,[['вижу',PALE],['книгу',RED]],{fs:15})}
        ${ROW(120,[['встретил',PALE],['друга',RED]],{fs:15})}
        ${T2(168,162,'предлоги: в, на, за, про, через',MUTED,{fs:11})}
        ${RULE(178,'Смысл','Действие направлено на предмет.',RED)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Творительный — кем? чем?',BLUE,{fs:13.5})}
        ${ROW(74,[['рисую',PALE],['карандашом',BLUE]],{fs:14})}
        ${ROW(120,[['горжусь',PALE],['братом',BLUE]],{fs:15})}
        ${T2(168,162,'предлоги: с, над, под, за, перед',MUTED,{fs:11})}
        ${RULE(178,'Смысл','Инструмент или совместность: с другом.',BLUE)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Предложный — о ком? о чём?',GOLD,{fs:13})}
        ${ROW(74,[['думаю',PALE],['о книге',GOLD]],{fs:14})}
        ${ROW(120,[['гуляю',PALE],['в парке',GOLD]],{fs:14})}
        ${T2(168,160,'предлоги: в, на, о, об, при',MUTED,{fs:11})}
        ${T2(168,188,'всегда с предлогом — без него не бывает',RED,{fs:11})}
        ${T2(168,216,'читаю о космосе · живу в городе',PALE,{fs:11})}
      `);
    }
    if(step===8){
      const items=GAME607, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Определи падеж',GOLD,{fs:14})}
        <rect x="42" y="42" width="252" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:22})}
        ${T2(168,146,'какой падеж у выделенного слова?',MUTED,{fs:11.5})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'задай вопрос от соседнего слова',MUTED,{fs:10.5})}
        ${T2(168,228,'и следи за предлогом',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME607=[['читаю книгу: падеж «книгу»','в','винительный'],['нет книги: падеж «книги»','р','родительный'],
    ['дать другу: падеж «другу»','д','дательный'],['рисую карандашом: «карандашом»','т','творительный'],
    ['думаю о книге: падеж «книге»','п','предложный'],['ученик читает: падеж «ученик»','и','именительный']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[607]=GAME607;
  window.ru607Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME607.length; st.gRes=null; chRender(0); return; }
      const it=GAME607[(st.gIdx||0)%GAME607.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED607=[
    ['q1','Что такое падеж?',[
      {k:'a',t:'форма слова, которая показывает его роль в предложении',ok:true,fb:'верно: книга — книги — книге — это одно слово в разных формах'},
      {k:'b',t:'часть речи',ok:false,fb:'часть речи — это существительное; падеж — форма, в которой слово стоит'}]],
    ['q2','Сколько в русском языке падежей?',[
      {k:'a',t:'шесть',ok:true,fb:'верно: именительный, родительный, дательный, винительный, творительный, предложный'},
      {k:'b',t:'четыре',ok:false,fb:'падежей шесть — вспомни примеры: книга, книги, книге, книгу, книгой, о книге'}]],
    ['q3','«Ученик читает» — какой падеж у слова «ученик»?',[
      {k:'a',t:'именительный',ok:true,fb:'верно: кто? — ученик, он действует'},
      {k:'b',t:'винительный',ok:false,fb:'винительный отвечает на кого? что? — здесь было бы «вижу ученика»'}]],
    ['q4','«Нет книги» — какой падеж у слова «книги»?',[
      {k:'a',t:'родительный',ok:true,fb:'верно: нет кого? чего? — книги'},
      {k:'b',t:'дательный',ok:false,fb:'дательный — кому? чему? — было бы «рад книге»'}]],
    ['q5','«Дать другу» — какой падеж у слова «другу»?',[
      {k:'a',t:'дательный',ok:true,fb:'верно: кому? — другу'},
      {k:'b',t:'родительный',ok:false,fb:'родительный — кого? чего? — было бы «нет друга»'}]],
    ['q6','«Вижу книгу» — какой падеж у слова «книгу»?',[
      {k:'a',t:'винительный',ok:true,fb:'верно: вижу кого? что? — книгу'},
      {k:'b',t:'именительный',ok:false,fb:'именительный — кто? что? — это «книга лежит», она действует'}]],
    ['q7','«Рисую карандашом» — какой падеж у слова «карандашом»?',[
      {k:'a',t:'творительный',ok:true,fb:'верно: чем? — карандашом, это инструмент'},
      {k:'b',t:'предложный',ok:false,fb:'предложный — о ком? о чём? — было бы «думаю о карандаше»'}]],
    ['q8','«Думаю о книге» — какой падеж у слова «книге»?',[
      {k:'a',t:'предложный',ok:true,fb:'верно: о чём? — о книге: у предложного падежа предлог есть всегда'},
      {k:'b',t:'творительный',ok:false,fb:'творительный — кем? чем? — было бы «доволен книгой»'}]],
    ['q9','У какого падежа предлог есть всегда?',[
      {k:'a',t:'у предложного',ok:true,fb:'верно: думаю о книге, гуляю в парке — без предлога он не употребляется'},
      {k:'b',t:'у именительного',ok:false,fb:'именительный как раз всегда без предлога: книга лежит'}]]
  ];
  const NOTES607=[
    ['Падеж','Форма слова, которая показывает его роль в предложении: книга — книги — книге — книгу.'],
    ['Шесть падежей','Именительный, родительный, дательный, винительный, творительный, предложный — у каждого свой вопрос.'],
    ['Именительный','Кто? что? — действующее лицо, подлежащее: Ученик читает. Книга лежит. Предлогов нет.'],
    ['Родительный','Кого? чего? — отсутствие или принадлежность: нет книги, дом брата. Предлоги: от, до, из, без, у, около.'],
    ['Дательный','Кому? чему? — адресат: дать другу, письмо брату. Предлоги: к, по.'],
    ['Винительный','Кого? что? — то, на что направлено действие: вижу книгу, читаю письмо. Предлоги: в, на, за, про, через.'],
    ['Творительный','Кем? чем? — инструмент и совместность: рисую карандашом, иду с другом. Предлоги: с, над, под, за, перед.'],
    ['Предложный','О ком? о чём? — всегда с предлогом: думаю о книге, гуляю в парке. Предлоги: в, на, о, об, при.'],
    ['Как определить','Найди слово-командир, задай от него вопрос и проверь предлог: читает (что?) книгу — винительный падеж.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[607]={pred:PRED607,notes:NOTES607};
  function visB607(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'607';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%;flex-wrap:wrap">${[['и','Именительный'],['р','Родительный'],['д','Дательный'],['в','Винительный'],['т','Творительный'],['п','Предложный']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 46%;font-size:16px;padding:12px 6px;border-radius:12px" onclick="ru607Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее сочетание':'выбери падеж'}</div>`;
      }
      const p=(step===8)?null:PRED607[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES607[step]?NOTE(NOTES607[step][0],NOTES607[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[607]=visB607;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===607){ arr[i]=L607; f=true; break; } }
    if(!f) arr.push(L607); })();
})();

/* ================= УРОК 608 · Глагол: время, лицо, число ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L608 = {
    id: 608, title: 'Глагол: время, лицо, число', ico: '⏱',
    src: 'Русский язык · 5–6 класс · Глагол', subj: 'rus',
    explain: [
      'Глагол называет действие или состояние и отвечает на вопросы что делает? что делал? что будет делать? Это самая «живая» часть речи: в предложении она чаще всего и есть сказуемое.',
      'Глагол изменяется по временам. Настоящее время — действие идёт сейчас: читает, бежит. Прошлое — действие уже было: читал, бежал. Будущее — действие ещё будет: прочитает, будет читать.',
      'Прошлое время узнать легко: у него суффикс -л. В единственном числе оно меняется по родам: он читал, она читала, оно читало. Во множественном роде нет: они читали.',
      'Будущее время бывает простым и сложным. Простое — одно слово: прочитаю, напишу. Сложное — два слова: буду читать, буду писать. Оба варианта правильные.',
      'Лицо глагола показывает, кто действует. Первое лицо — я, мы: читаю, читаем. Второе — ты, вы: читаешь, читаете. Третье — он, она, они: читает, читают.',
      'Число глагола — единственное или множественное: читает — читают. Число и лицо вместе называют спряжением формы: по ним видно, кто и сколько действует.',
      'У глагола есть начальная форма — неопределённая. Она отвечает на вопросы что делать? что сделать? и оканчивается на -ть, -ти, -чь: читать, идти, беречь. В ней не видно ни времени, ни лица.',
      'Важно не путать время и лицо: «читал» — прошедшее время, а лица у него нет, есть род. «Читает» — настоящее время и третье лицо. А «будет читать» — будущее время.',
      'Алгоритм: задай вопрос к глаголу, определи время, затем лицо и число по местоимению. Потренируйся: ниже показан глагол с местоимением, выбери время и лицо.'
    ],
    check: { q: 'По каким признакам изменяется глагол?', choices: ['по временам, лицам и числам', 'по падежам', 'по родам во множественном числе'], ans: 0,
      exp: 'Глагол меняется по временам, лицам и числам; род есть только в прошедшем времени единственного числа.' },
    tasks: [
      { q: 'Какое время у глагола «прочитает»?', kind: 'choice', choices: ['будущее', 'настоящее', 'прошедшее'], ans: 0,
        hints: ['Действие уже было, идёт сейчас или будет?', 'Прочитает — ещё будет.'], sol: 'будущее' },
      { q: 'Сколько глаголов в списке: бежит, бег, читал, чтение?', kind: 'unit', ans: 2, tol: 0,
        hints: ['Глагол отвечает что делает? что делал?', 'Бежит и читал — глаголы.'], sol: '2' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Глагол называет действие',GOLD,{fs:13.5})}
        ${W(96,76,'читает',PALE,{fs:17})}${W(238,76,'бежит',PALE,{fs:17})}
        ${T2(168,114,'что делает?',GOLD,{fs:12.5})}
        ${BOX(18,140,300,50,GREEN,'В предложении глагол чаще всего сказуемое',[])}
        ${T2(168,214,'он изменяется по временам, лицам и числам',MUTED,{fs:11})}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Три времени',GOLD,{fs:14})}
        ${BOX(18,44,94,74,GREEN,'прошлое',['читал','уже было'])}
        ${BOX(121,44,94,74,GOLD,'настоящее',['читает','идёт сейчас'])}
        ${BOX(224,44,94,74,BLUE,'будущее',['прочитает','ещё будет'])}
        ${T2(168,140,'время показывает, когда происходит действие',MUTED,{fs:11})}
        ${RULE(158,'Проверка','Подставь «вчера», «сейчас» или «завтра».',GOLD)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Прошедшее время: суффикс -л',GREEN,{fs:13})}
        ${ROW(72,[['читал',PALE],['читала',PALE],['читало',PALE]],{fs:15})}
        ${T2(168,110,'он · она · оно — меняется род',GREEN,{fs:11.5})}
        ${T2(168,146,'во множественном роде нет',PALE,{fs:11.5})}
        ${W(168,186,'читали',GREEN,{fs:16})}
        ${T2(168,222,'один глагол на всех',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Будущее время',BLUE,{fs:14})}
        ${BOX(18,44,148,78,BLUE,'простое',['прочитаю','напишу'])}
        ${BOX(172,44,148,78,GOLD,'сложное',['буду читать','буду писать'])}
        ${RULE(136,'Оба верны','Простое — одно слово, сложное — два.',BLUE)}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Лицо глагола',GOLD,{fs:14})}
        ${BOX(18,44,94,86,GREEN,'1-е',['я читаю','мы читаем'])}
        ${BOX(121,44,94,86,BLUE,'2-е',['ты читаешь','вы читаете'])}
        ${BOX(224,44,94,86,GOLD,'3-е',['он читает','они читают'])}
        ${RULE(144,'Как определить','Подставь местоимение: я, ты, он — и лицо видно.',GOLD)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Число глагола',GREEN,{fs:14})}
        ${W(100,78,'читает',PALE,{fs:17})}${T2(100,110,'один: единственное',GREEN,{fs:11})}
        ${W(238,78,'читают',PALE,{fs:17})}${T2(238,110,'много: множественное',GREEN,{fs:11})}
        ${T2(168,152,'лицо и число вместе показывают, кто действует',MUTED,{fs:11})}
        ${RULE(168,'Вместе','Форма глагола отвечает на два вопроса: кто и сколько.',GREEN)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Начальная форма глагола',BLUE,{fs:13.5})}
        ${ROW(76,[['что делать?',BLUE]],{fs:13})}
        ${ROW(118,[['читать',PALE],['идти',PALE],['беречь',PALE]],{fs:15})}
        ${T2(168,158,'-ть, -ти, -чь — окончания начальной формы',MUTED,{fs:11})}
        ${RULE(176,'В ней не видно','ни времени, ни лица, ни числа.',BLUE)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Не путай время и лицо',RED,{fs:13.5})}
        ${T2(84,70,'читал',PALE,{fs:14})}${T2(244,70,'← прошедшее, род',GREEN,{fs:11})}
        ${T2(84,110,'читает',PALE,{fs:14})}${T2(244,110,'← настоящее, 3-е лицо',GREEN,{fs:11})}
        ${T2(84,150,'будет читать',PALE,{fs:13.5})}${T2(244,150,'← будущее, сложное',GREEN,{fs:11})}
        ${T2(168,200,'у прошедшего времени лица нет',MUTED,{fs:11})}
        ${T2(168,226,'есть только род и число',MUTED,{fs:11})}
      `);
    }
    if(step===8){
      const items=GAME608, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Определи время глагола',GOLD,{fs:13.5})}
        <rect x="42" y="42" width="252" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:24})}
        ${T2(168,146,'какое это время?',MUTED,{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'подставь «вчера», «сейчас»,',MUTED,{fs:10.5})}
        ${T2(168,228,'«завтра» — и время определится',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME608=[['читает','наст','настоящее время'],['читал','прош','прошедшее время'],
    ['прочитает','буд','будущее время'],['будет читать','буд','будущее сложное'],
    ['читали','прош','прошедшее время'],['читаю','наст','настоящее время']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[608]=GAME608;
  window.ru608Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME608.length; st.gRes=null; chRender(0); return; }
      const it=GAME608[(st.gIdx||0)%GAME608.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED608=[
    ['q1','Глагол отвечает на вопрос…',[{k:'a',t:'что делает?',ok:true,fb:'верно'},{k:'b',t:'какой?',ok:false,fb:'какой? — прилагательное'}]],
    ['q2','Сколько времён у глагола?',[{k:'a',t:'три',ok:true,fb:'верно: прошлое, настоящее, будущее'},{k:'b',t:'два',ok:false,fb:'времён три'}]],
    ['q3','«Читал» — какое время?',[{k:'a',t:'прошедшее',ok:true,fb:'верно: суффикс -л'},{k:'b',t:'настоящее',ok:false,fb:'настоящее — читает'}]],
    ['q4','«Будет читать» — какое время?',[{k:'a',t:'будущее сложное',ok:true,fb:'верно: два слова'},{k:'b',t:'настоящее',ok:false,fb:'настоящее — читает'}]],
    ['q5','«Читаешь» — какое лицо?',[{k:'a',t:'второе',ok:true,fb:'верно: ты читаешь'},{k:'b',t:'третье',ok:false,fb:'третье — он читает'}]],
    ['q6','«Читают» — какое число?',[{k:'a',t:'множественное',ok:true,fb:'верно: они читают'},{k:'b',t:'единственное',ok:false,fb:'единственное — читает'}]],
    ['q7','Начальная форма глагола — это…',[{k:'a',t:'читать (что делать?)',ok:true,fb:'верно: -ть, -ти, -чь'},{k:'b',t:'читает',ok:false,fb:'это уже форма настоящего времени'}]],
    ['q8','Есть ли лицо у «читал»?',[{k:'a',t:'нет, только род и число',ok:true,fb:'верно: он читал, она читала'},{k:'b',t:'да, третье',ok:false,fb:'у прошедшего времени лица нет'}]],
    ['q9','«Бежит» — время и число?',[{k:'a',t:'настоящее, единственное',ok:true,fb:'верно'},{k:'b',t:'прошедшее, множественное',ok:false,fb:'прошедшее — бежал'}]]
  ];
  const NOTES608=[
    ['Глагол','Называет действие или состояние; в предложении — сказуемое.'],
    ['Времена','Прошлое (читал), настоящее (читает), будущее (прочитает).'],
    ['Прошедшее','Суффикс -л; в единственном числе меняется по родам.'],
    ['Будущее','Простое (прочитаю) и сложное (буду читать).'],
    ['Лицо','1-е — я, мы; 2-е — ты, вы; 3-е — он, они.'],
    ['Число','Единственное и множественное: читает — читают.'],
    ['Начальная форма','Что делать? что сделать? — читать, идти, беречь.'],
    ['Не путай','У прошедшего времени нет лица, есть род.'],
    ['Алгоритм','Вопрос → время → местоимение → лицо и число.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[608]={pred:PRED608,notes:NOTES608};
  function visB608(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'608';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['прош','прош.'],['наст','наст.'],['буд','буд.']].map(x=>
          `<button type="button" class="btn" style="flex:1;font-size:16px;padding:13px 6px;border-radius:14px" onclick="ru608Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующий глагол':'выбери время'}</div>`;
      }
      const p=(step===8)?null:PRED608[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES608[step]?NOTE(NOTES608[step][0],NOTES608[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[608]=visB608;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===608){ arr[i]=L608; f=true; break; } }
    if(!f) arr.push(L608); })();
})();

/* ================= УРОК 609 · -тся и -ться. Не с глаголами ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L609 = {
    id: 609, title: '«-тся» и «-ться». «Не» с глаголами', ico: '✍️',
    src: 'Русский язык · 5–6 класс · Глагол и орфография', subj: 'rus',
    explain: [
      'В словах «учится» и «учиться» мы слышим одно и то же: [учица]. На слух мягкий знак не различить, поэтому вопрос «писать ь или нет» решает правило, а не слух.',
      'Правило простое: задай к глаголу вопрос. Если в вопросе есть мягкий знак — «что делать? что сделать?» — пишем -ться. Если мягкого знака в вопросе нет — «что делает? что сделает?» — пишем -тся.',
      'Пример: «Он учится» — что делает? В вопросе нет ь, значит пишем -тся. «Надо учиться» — что делать? В вопросе есть ь, значит пишем -ться. Мягкий знак кочует из вопроса в глагол.',
      'Проверь себя вторым способом: подставь «он» или «надо». «Он учится» звучит правильно — без ь. «Надо учиться» — с ь. Если подставляется «надо», пишем -ться.',
      'Второе правило — про частицу «не» с глаголами. Она всегда пишется раздельно: не хочу, не знаю, не читал, не буду. Глагол и «не» — два разных слова.',
      'Исключение одно: слова, которые без «не» не употребляются. «Ненавидеть», «недомогать», «недоумевать» — если убрать «не», получится бессмыслица, поэтому пишем слитно.',
      'Не путай с приставкой недо-, которая означает «меньше, чем нужно»: недоспал, недоел. Здесь «недо» — часть слова, и пишется слитно.',
      'Сравни: «не хочу» (раздельно, «не» — частица) и «ненавижу» (слитно, без «не» не бывает). Разница видна по смыслу, а не по звуку.',
      'Алгоритм для -тся/-ться: задай вопрос, посмотри на мягкий знак в вопросе и перенеси его в глагол. Для «не»: проверь, употребляется ли слово без «не». Потренируйся ниже.'
    ],
    check: { q: 'Когда пишется -ться?', choices: ['когда в вопросе есть ь: что делать?', 'когда в вопросе нет ь: что делает?', 'всегда'], ans: 0,
      exp: 'Вопрос «что делать?» содержит ь — и глагол пишется с ь: учиться.' },
    tasks: [
      { q: 'Как писать: «Он (учит?ся)»?', kind: 'choice', choices: ['учится', 'учиться'], ans: 0,
        hints: ['Задай вопрос: он что делает?', 'В вопросе нет ь — пишем -тся.'], sol: 'учится' },
      { q: 'Как пишется «не» с глаголом: «(не)хочу»?', kind: 'choice', choices: ['не хочу', 'нехочу'], ans: 0,
        hints: ['«Не» с глаголами — частица.', 'Употребляется ли «хочу» без «не»? Да — значит раздельно.'], sol: 'не хочу' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Слышим одно — пишем по-разному',GOLD,{fs:13})}
        ${W(100,80,'учится',PALE,{fs:17})}${W(240,80,'учиться',PALE,{fs:16})}
        ${T2(168,118,'оба звучат [учица]',RED,{fs:12})}
        ${RULE(136,'Вывод','На слух мягкий знак не различить — нужен вопрос.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Правило вопросов',GREEN,{fs:14})}
        ${BOX(18,44,148,84,BLUE,'что делает?',['в вопросе нет ь','пишем -тся'])}
        ${BOX(172,44,148,84,GOLD,'что делать?',['в вопросе есть ь','пишем -ться'])}
        ${RULE(144,'Перенос','Мягкий знак кочует из вопроса в глагол.',GREEN)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Два примера',GOLD,{fs:14})}
        ${ROW(70,[['Он',PALE],['учится',BLUE]],{fs:15})}
        ${T2(168,104,'что делает? — без ь',BLUE,{fs:11})}
        ${ROW(146,[['Надо',PALE],['учиться',GOLD]],{fs:15})}
        ${T2(168,180,'что делать? — с ь',GOLD,{fs:11})}
        ${T2(168,214,'знак перенесли из вопроса',MUTED,{fs:11})}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Второй способ проверки',BLUE,{fs:13.5})}
        ${BOX(18,44,148,78,GREEN,'подставь «он»',['он учится','без мягкого знака'])}
        ${BOX(172,44,148,78,GOLD,'подставь «надо»',['надо учиться','с мягким знаком'])}
        ${RULE(140,'Как звучит','Если подставляется «надо» — пишем -ться.',BLUE)}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'«Не» с глаголами — раздельно',RED,{fs:13})}
        ${ROW(72,[['не',RED],['хочу',PALE]],{fs:15})}
        ${ROW(112,[['не',RED],['знаю',PALE]],{fs:15})}
        ${ROW(152,[['не',RED],['читал',PALE]],{fs:15})}
        ${T2(168,196,'«не» — отдельное слово, частица',PALE,{fs:11.5})}
        ${T2(168,224,'между ними можно вставить слово',MUTED,{fs:11})}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Исключение: без «не» не бывает',GOLD,{fs:12.5})}
        ${ROW(74,[['ненавидеть',PALE]],{fs:15})}
        ${ROW(116,[['недомогать',PALE]],{fs:15})}
        ${ROW(158,[['недоумевать',PALE]],{fs:15})}
        ${T2(168,200,'убери «не» — получится бессмыслица',MUTED,{fs:11})}
        ${T2(168,226,'значит, пишем слитно',GREEN,{fs:11})}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Приставка недо-',BLUE,{fs:13.5})}
        ${M([['недо','#7fd1ff','приставка'],['спал','#8fd1a8','корень']],112)}
        ${T2(168,178,'«меньше, чем нужно»',PALE,{fs:11.5})}
        ${T2(168,206,'недоспал · недоел · недосмотрел',MUTED,{fs:11})}
        ${T2(168,232,'здесь недо- — часть слова',MUTED,{fs:11})}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Сравни два случая',GOLD,{fs:13.5})}
        ${BOX(18,44,148,92,RED,'не + глагол',['не хочу','не знаю','раздельно'])}
        ${BOX(172,44,148,92,GREEN,'без «не» нельзя',['ненавижу','недоумеваю','слитно'])}
        ${RULE(152,'Разница','Смотри на смысл: употребляется ли слово без «не».',GOLD)}
      `);
    }
    if(step===8){
      const items=GAME609, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Как писать?',GOLD,{fs:14})}
        <rect x="42" y="42" width="252" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:22})}
        ${T2(168,146,'выбери написание',MUTED,{fs:12})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'задай вопрос к глаголу:',MUTED,{fs:10.5})}
        ${T2(168,228,'ь в вопросе — ь в слове',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME609=[['Он учит?ся','тся','что делает? — без ь'],['Надо учит?ся','ться','что делать? — с ь'],
    ['Ему не хоч?тся спать','тся','что делает? — без ь'],['Она улыбает?ся','тся','что делает? — без ь'],
    ['Хочу учит?ся','ться','что делать? — с ь'],['Дети улыбают?ся','тся','что делают? — без ь']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[609]=GAME609;
  window.ru609Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME609.length; st.gRes=null; chRender(0); return; }
      const it=GAME609[(st.gIdx||0)%GAME609.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED609=[
    ['q1','Как решить, ь или без ь?',[{k:'a',t:'задать вопрос к глаголу',ok:true,fb:'верно: что делает? / что делать?'},{k:'b',t:'послушать звук',ok:false,fb:'звук одинаковый — слух не поможет'}]],
    ['q2','«Что делать?» — пишем…',[{k:'a',t:'-ться',ok:true,fb:'верно: ь в вопросе — ь в слове'},{k:'b',t:'-тся',ok:false,fb:'без ь — это «что делает?»'}]],
    ['q3','«Он учится» — почему без ь?',[{k:'a',t:'что делает? — в вопросе нет ь',ok:true,fb:'верно'},{k:'b',t:'так короче',ok:false,fb:'дело в правиле'}]],
    ['q4','«Надо учиться» — почему с ь?',[{k:'a',t:'что делать? — ь в вопросе',ok:true,fb:'верно'},{k:'b',t:'потому что начало предложения',ok:false,fb:'дело в вопросе'}]],
    ['q5','«Не» с глаголами пишется…',[{k:'a',t:'раздельно',ok:true,fb:'верно: не хочу, не знаю'},{k:'b',t:'слитно',ok:false,fb:'слитно только в исключениях'}]],
    ['q6','«Ненавидеть» — почему слитно?',[{k:'a',t:'без «не» не употребляется',ok:true,fb:'верно'},{k:'b',t:'по желанию',ok:false,fb:'это исключение'}]],
    ['q7','«Недо-» в слове «недоспал» — это…',[{k:'a',t:'приставка',ok:true,fb:'верно: значит «меньше, чем нужно»'},{k:'b',t:'частица «не» и предлог',ok:false,fb:'это приставка недо-'}]],
    ['q8','«Дети улыбаются» — как писать?',[{k:'a',t:'-тся',ok:true,fb:'верно: что делают?'},{k:'b',t:'-ться',ok:false,fb:'в вопросе нет ь'}]],
    ['q9','Второй способ проверки -тся/-ться?',[{k:'a',t:'подставить «надо»',ok:true,fb:'верно: подходит «надо» — пишем ь'},{k:'b',t:'подставить «он»',ok:false,fb:'это первый способ'}]]
  ];
  const NOTES609=[
    ['Проблема','«Учится» и «учиться» звучат одинаково — [учица].'],
    ['Правило','Что делает? — -тся. Что делать? — -ться.'],
    ['Примеры','Он учится, надо учиться: знак переносится из вопроса.'],
    ['Проверка','Подставь «он» или «надо»: надо учиться — с ь.'],
    ['«Не» раздельно','Не хочу, не знаю, не читал: «не» — отдельное слово.'],
    ['Исключения','Ненавидеть, недомогать, недоумевать — без «не» не употребляются.'],
    ['Приставка недо-','Недоспал, недоел — «меньше, чем нужно», пишем слитно.'],
    ['Сравни','Не хочу (частица) и ненавижу (без «не» нельзя).'],
    ['Алгоритм','Вопрос → мягкий знак. Для «не»: проверь, живёт ли слово без «не».']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[609]={pred:PRED609,notes:NOTES609};
  function visB609(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'609';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%">${[['тся','-тся'],['ться','-ться']].map(x=>
          `<button type="button" class="btn" style="flex:1;font-size:16.5px;padding:14px 10px;border-radius:14px" onclick="ru609Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'выбери написание'}</div>`;
      }
      const p=(step===8)?null:PRED609[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES609[step]?NOTE(NOTES609[step][0],NOTES609[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[609]=visB609;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===609){ arr[i]=L609; f=true; break; } }
    if(!f) arr.push(L609); })();
})();

/* ================= УРОК 610 · Однородные члены и обращение ================= */
(function(){
  const R=window.RUKIT, GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE, PRED=R.PRED, W=R.word, ROW=R.row, BOX=R.box, RULE=R.rule, M=R.morph;
  const L610 = {
    id: 610, title: 'Однородные члены и обращение', ico: '❕',
    src: 'Русский язык · 5–6 класс · Синтаксис и пунктуация', subj: 'rus',
    explain: [
      'Однородные члены предложения — это слова, которые отвечают на один вопрос и относятся к одному и тому же слову. «В саду росли яблони, груши, сливы»: все три слова отвечают на вопрос что росло?',
      'Если однородные члены не соединены союзами, между ними ставят запятую: яблони, груши, сливы. Перечисление всегда разделяют запятыми.',
      'Если между однородными стоит одиночный союз и, или, да — запятая не нужна: яблони и груши. Союз сам выполняет работу разделителя.',
      'Но если союз повторяется, запятая возвращается: и яблони, и груши, и сливы. Повторяющийся союз требует запятых.',
      'С союзами а и но запятая нужна всегда: не груши, а сливы. Эти союзы противопоставляют, и перед ними ставят запятую.',
      'Обращение — это слово, которым называют того, к кому обращаются: Маша, помоги мне. Обращение выделяют запятыми с двух сторон, если оно в середине: Спасибо, Маша, за помощь.',
      'Важно: обращение не является членом предложения. Оно не подлежащее и не дополнение — его нельзя подчеркнуть как часть основы. Его просто выделяют запятыми.',
      'В сложном предложении две и более грамматические основы, и между их частями ставится запятая: Светит солнце, и поют птицы. Смотри, сколько в предложении основ: одна — простое, две и больше — сложное.',
      'Алгоритм: найди однородные члены — проверь запятые между ними; найди обращение — выдели запятыми; посчитай основы — если их несколько, поставь запятую между частями. Потренируйся ниже.'
    ],
    check: { q: 'Нужна ли запятая: «яблони и груши»?', choices: ['нет, союз одиночный', 'да, всегда', 'только в начале'], ans: 0,
      exp: 'При одиночном союзе «и» запятая между однородными членами не ставится.' },
    tasks: [
      { q: 'Где нужна запятая: «В саду росли яблони груши сливы»?', kind: 'choice', choices: ['после «яблони» и после «груши»', 'только после «яблони»', 'запятые не нужны'], ans: 0,
        hints: ['Это перечисление без союзов.', 'Между однородными при перечислении ставят запятые.'], sol: 'после «яблони» и после «груши»' },
      { q: 'Сколько запятых в «Маша помоги мне»?', kind: 'unit', ans: 1, tol: 0,
        hints: ['Маша — это обращение.', 'Обращение в начале выделяется одной запятой.'], sol: '1' }
    ]
  };
  function scene(step, st){
    if(step===0){
      return SV(`
        ${T(168,22,'Однородные члены',GOLD,{fs:13.5})}
        ${ROW(74,[['яблони',GREEN],['груши',GREEN],['сливы',GREEN]],{fs:14})}
        ${T2(168,110,'что росло? — один вопрос',MUTED,{fs:11})}
        ${T2(168,140,'и одно общее слово: «росли»',PALE,{fs:11})}
        ${RULE(158,'Определение','Один вопрос, одно слово — значит, однородные.',GOLD)}
      `);
    }
    if(step===1){
      return SV(`
        ${T(168,22,'Перечисление — запятые',GREEN,{fs:13.5})}
        ${T2(168,64,'В саду росли',PALE,{fs:12.5})}
        <rect x="34" y="84" width="268" height="44" rx="10" fill="rgba(143,209,168,.10)" stroke="${GREEN}" stroke-width="1.4"/>
        ${T2(168,112,'яблони , груши , сливы',GREEN,{fs:14})}
        ${T2(168,160,'без союзов — всегда запятые',MUTED,{fs:11})}
        ${RULE(178,'Правило','Перечисление разделяем запятыми.',GREEN)}
      `);
    }
    if(step===2){
      return SV(`
        ${T(168,22,'Одиночный союз — без запятой',BLUE,{fs:12.5})}
        <rect x="34" y="60" width="268" height="44" rx="10" fill="rgba(127,209,255,.10)" stroke="${BLUE}" stroke-width="1.4"/>
        ${T2(168,88,'яблони и груши',BLUE,{fs:14})}
        ${T2(168,136,'союз сам разделяет слова',PALE,{fs:11.5})}
        ${T2(168,164,'и, или, да — запятая не нужна',MUTED,{fs:11})}
        ${RULE(182,'Запомни','Один союз — одна запятая «не нужна».',BLUE)}
      `);
    }
    if(step===3){
      return SV(`
        ${T(168,22,'Союз повторяется — запятые',GOLD,{fs:12.5})}
        <rect x="24" y="60" width="288" height="44" rx="10" fill="rgba(255,215,106,.10)" stroke="${GOLD}" stroke-width="1.4"/>
        ${T2(168,88,'и яблони , и груши , и сливы',GOLD,{fs:13})}
        ${T2(168,136,'повторяющийся союз требует запятых',PALE,{fs:11.5})}
        ${T2(168,166,'сравни с «яблони и груши»',MUTED,{fs:11})}
        ${T2(168,196,'где запятая не нужна',MUTED,{fs:11})}
      `);
    }
    if(step===4){
      return SV(`
        ${T(168,22,'Союзы а и но — запятая',RED,{fs:13.5})}
        ${T2(168,70,'не груши , а сливы',RED,{fs:14})}
        ${T2(168,108,'маленький , но смелый',RED,{fs:14})}
        ${T2(168,152,'эти союзы противопоставляют',PALE,{fs:11.5})}
        ${RULE(170,'Перед ними','Запятая ставится всегда.',RED)}
      `);
    }
    if(step===5){
      return SV(`
        ${T(168,22,'Обращение',GREEN,{fs:14})}
        ${T2(168,68,'Маша , помоги мне',GREEN,{fs:14})}
        ${T2(168,110,'Спасибо , Маша , за помощь',GREEN,{fs:14})}
        ${T2(168,152,'в середине — запятые с двух сторон',PALE,{fs:11.5})}
        ${RULE(170,'Выделяем','Обращение всегда выделяют запятыми.',GREEN)}
      `);
    }
    if(step===6){
      return SV(`
        ${T(168,22,'Обращение — не член предложения',GOLD,{fs:12.5})}
        ${T2(168,66,'Маша , помоги мне',PALE,{fs:13})}
        <rect x="66" y="84" width="204" height="30" rx="8" fill="rgba(232,106,90,.10)" stroke="${RED}" stroke-width="1.3"/>
        ${T2(168,104,'подлежащее здесь — «ты» (скрытое)',RED,{fs:11})}
        ${T2(168,148,'обращение нельзя подчеркнуть как член',MUTED,{fs:11})}
        ${RULE(168,'Смысл','Им называют того, к кому обращаются.',GOLD)}
      `);
    }
    if(step===7){
      return SV(`
        ${T(168,22,'Сложное предложение',BLUE,{fs:13.5})}
        ${T2(168,64,'Светит солнце , и поют птицы',BLUE,{fs:13})}
        ${BOX(18,90,148,60,GREEN,'первая основа',['солнце светит'])}
        ${BOX(172,90,148,60,GOLD,'вторая основа',['птицы поют'])}
        ${T2(168,178,'две основы — запятая между частями',PALE,{fs:11.5})}
        ${T2(168,208,'одна основа — простое предложение',MUTED,{fs:11})}
      `);
    }
    if(step===8){
      const items=GAME610, it=items[(st.gIdx||0)%items.length], res=st.gRes;
      const ok=st.gOk||0, bad=st.gBad||0;
      return SV(`
        ${T(168,22,'Где нужна запятая?',GOLD,{fs:13.5})}
        <rect x="26" y="44" width="284" height="72" rx="14" fill="rgba(255,255,255,.05)"
          stroke="${res==null?'#3d5c49':(res?'#8fd1a8':'#e86a5a')}" stroke-width="1.6"/>
        ${T(168,90,it[0],PALE,{fs:16})}
        ${T2(168,146,'выбери ответ',MUTED,{fs:11})}
        ${T2(84,178,'верно: '+ok,GREEN,{fs:12})}${T2(168,178,'ошибок: '+bad,RED,{fs:12})}${T2(252,178,'всего: '+items.length,GOLD,{fs:12})}
        ${T2(168,212,'посчитай основы и найди',MUTED,{fs:10.5})}
        ${T2(168,228,'однородные члены',MUTED,{fs:10.5})}
      `);
    }
    return SV(`${T(168,120,'Сцена готовится',GOLD,{fs:14})}`);
  }
  const GAME610=[['яблони груши сливы','зап','нужны запятые между однородными'],
    ['яблони и груши','нет','одиночный союз и — без запятой'],
    ['Маша помоги мне','одна','обращение в начале — одна запятая'],
    ['Светит солнце и поют птицы','слож','две основы — запятая перед и'],
    ['не груши а сливы','перед а','союз а — запятая'],
    ['Спасибо Маша за помощь','две','обращение в середине — две запятые']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[610]=GAME610;
  window.ru610Game=function(k){
    try{
      const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; const st=CHS[lk];
      if(st.gRes!=null){ st.gIdx=((st.gIdx||0)+1)%GAME610.length; st.gRes=null; chRender(0); return; }
      const it=GAME610[(st.gIdx||0)%GAME610.length];
      st.gRes=(it[1]===k);
      if(st.gRes) st.gOk=(st.gOk||0)+1; else st.gBad=(st.gBad||0)+1;
      chRender(0);
    }catch(e){}
  };
  const PRED610=[
    ['q1','Однородные члены — это…',[{k:'a',t:'один вопрос, одно слово',ok:true,fb:'верно'},{k:'b',t:'любые слова рядом',ok:false,fb:'нужен общий вопрос и общее слово'}]],
    ['q2','«Яблони, груши, сливы» — запятые?',[{k:'a',t:'да, это перечисление',ok:true,fb:'верно'},{k:'b',t:'нет, союз же есть',ok:false,fb:'союза тут нет'}]],
    ['q3','«Яблони и груши» — запятая?',[{k:'a',t:'нет: союз одиночный',ok:true,fb:'верно'},{k:'b',t:'да: перед и всегда',ok:false,fb:'перед одиночным «и» не ставят'}]],
    ['q4','«И яблони, и груши» — запятая?',[{k:'a',t:'да: союз повторяется',ok:true,fb:'верно'},{k:'b',t:'нет',ok:false,fb:'повтор союза требует запятых'}]],
    ['q5','Перед «а» и «но» запятая…',[{k:'a',t:'ставится всегда',ok:true,fb:'верно'},{k:'b',t:'не ставится',ok:false,fb:'ставится всегда'}]],
    ['q6','«Маша, помоги мне» — что такое Маша?',[{k:'a',t:'обращение',ok:true,fb:'верно: выделяется запятой'},{k:'b',t:'подлежащее',ok:false,fb:'подлежащее — скрытое «ты»'}]],
    ['q7','Обращение — член предложения?',[{k:'a',t:'нет',ok:true,fb:'верно: его только выделяют запятыми'},{k:'b',t:'да, подлежащее',ok:false,fb:'не член предложения'}]],
    ['q8','Как найти сложное предложение?',[{k:'a',t:'посчитать основы',ok:true,fb:'верно: две и больше — сложное'},{k:'b',t:'посчитать слова',ok:false,fb:'считают основы'}]],
    ['q9','«Спасибо, Маша, за помощь» — сколько запятых?',[{k:'a',t:'две',ok:true,fb:'верно: обращение в середине'},{k:'b',t:'одна',ok:false,fb:'с двух сторон — две'}]]
  ];
  const NOTES610=[
    ['Однородные','Один вопрос и одно общее слово.'],
    ['Перечисление','Без союзов — запятые: яблони, груши, сливы.'],
    ['Одиночный союз','И, или, да — запятая не нужна: яблони и груши.'],
    ['Повтор союза','И яблони, и груши — запятые возвращаются.'],
    ['А и но','Перед ними запятая всегда: не груши, а сливы.'],
    ['Обращение','Выделяют запятыми: Маша, помоги мне.'],
    ['Не член','Обращение не подлежащее и не дополнение.'],
    ['Сложное','Две и более основ — запятая между частями.'],
    ['Алгоритм','Найди однородные → проверь союзы; найди обращение → запятые; посчитай основы.']
  ];
  window.RUEXTRA=window.RUEXTRA||{}; window.RUEXTRA[610]={pred:PRED610,notes:NOTES610};
  function visB610(el){
    try{
      const step=LV.step||0;
      const lk=(typeof lidKey==='function')?lidKey(LV.id):'610';
      if(typeof CHS==='undefined') window.CHS={};
      if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      let extra='';
      if(step===8){
        const done=st.gRes!=null;
        extra=`<div style="display:flex;gap:10px;width:100%;flex-wrap:wrap">${[['нет','запятые не нужны'],['одна','одна запятая'],['две','две запятые'],['зап','перечисление'],['перед а','перед «а»'],['слож','две основы']].map(x=>
          `<button type="button" class="btn" style="flex:1 1 30%;font-size:14px;padding:12px 2px;border-radius:12px" onclick="ru610Game('${x[0]}')">${x[1]}</button>`).join('')}</div>`
          +`<div class="wv-sml" style="color:${MUTED}">${done?'нажми любую кнопку — следующее предложение':'выбери ответ'}</div>`;
      }
      const p=(step===8)?null:PRED610[step];
      const predHtml=p?PRED(st,p[0],p[1],p[2]):'';
      const noteHtml=NOTES610[step]?NOTE(NOTES610[step][0],NOTES610[step][1]):'';
      el.innerHTML=`<div class="wv"><div class="wv-col">${scene(step,st)}${extra}${predHtml}${noteHtml}</div></div>`;
    }catch(e){ el.innerHTML=''; }
  }
  window.WAVE_B[610]=visB610;
  (function(){ const arr=window.ARH_LESSONS||[]; let f=false;
    for(let i=0;i<arr.length;i++){ if(arr[i].id===610){ arr[i]=L610; f=true; break; } }
    if(!f) arr.push(L610); })();
})();

/* ================= ПРОВЕРОЧНЫЕ РАБОТЫ (кадровый формат) ================= */
/* Общий набор: иконки к словам + конструктор проверочной работы.
   Опорные материалы: словарные слова 5 и 6 класса по учебнику Т.А. Ладыженской,
   школьные нормы отметки за словарный диктант (0 ошибок — «5», 1–2 — «4», 3–4 — «3»). */
window.RUKEXAM = (function(){
  const R = window.RUKIT;
  const GOLD=R.GOLD, BLUE=R.BLUE, GREEN=R.GREEN, RED=R.RED, MUTED=R.MUTED, PALE=R.PALE;
  const T=R.T, T2=R.T2, SV=R.SV, NOTE=R.NOTE;

  /* иконки слова: одна рамка 64×64, единый стиль (штрих 2.4, скругления) */
  const ICONS = {
    orange:   `<circle cx="32" cy="36" r="19" fill="#e8913a" opacity=".9"/><path d="M32 17 q3 -7 9 -8" stroke="${GREEN}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M30 15 q-8 -2 -11 4 q7 2 11 -4z" fill="${GREEN}"/>`,
    bike:     `<circle cx="18" cy="42" r="12" fill="none" stroke="${BLUE}" stroke-width="2.6"/><circle cx="48" cy="42" r="12" fill="none" stroke="${BLUE}" stroke-width="2.6"/><path d="M18 42 L30 22 L44 22 M30 22 L40 42 M44 22 L48 42" stroke="${PALE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
    hanger:   `<path d="M32 14 q-6 0 -6 6 q0 4 4 6" stroke="${PALE}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M32 26 L10 42 q-3 3 1 4 L53 46 q4 -1 1 -4 z" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linejoin="round"/>`,
    calendar: `<rect x="12" y="16" width="40" height="36" rx="5" fill="none" stroke="${BLUE}" stroke-width="2.6"/><path d="M12 26 h40" stroke="${BLUE}" stroke-width="2.4"/><path d="M22 12 v8 M42 12 v8" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="36" r="2.6" fill="${GOLD}"/><circle cx="34" cy="36" r="2.6" fill="${GOLD}"/><circle cx="44" cy="36" r="2.6" fill="${MUTED}"/>`,
    basket:   `<path d="M14 26 h36 l-5 26 q-1 4 -5 4 h-16 q-4 0 -5 -4 z" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linejoin="round"/><path d="M20 26 q12 -14 24 0" fill="none" stroke="${PALE}" stroke-width="2.4"/><path d="M24 34 v18 M32 34 v20 M40 34 v18" stroke="${MUTED}" stroke-width="1.8"/>`,
    parachute:`<path d="M10 30 q22 -26 44 0 q-14 6 -44 0z" fill="#e86a5a" opacity=".85"/><path d="M10 30 q11 10 22 10 q11 0 22 -10" fill="none" stroke="${PALE}" stroke-width="2.2"/><path d="M22 36 L30 56 M42 36 L34 56" stroke="${PALE}" stroke-width="2.2"/><rect x="27" y="54" width="10" height="8" rx="3" fill="${GOLD}"/>`,
    piano:    `<rect x="10" y="22" width="44" height="26" rx="4" fill="none" stroke="${PALE}" stroke-width="2.6"/><path d="M21 22 v26 M32 22 v26 M43 22 v26" stroke="${PALE}" stroke-width="2"/><rect x="16" y="22" width="6" height="14" fill="#1a2620" stroke="${PALE}" stroke-width="1.6"/><rect x="27" y="22" width="6" height="14" fill="#1a2620" stroke="${PALE}" stroke-width="1.6"/><rect x="38" y="22" width="6" height="14" fill="#1a2620" stroke="${PALE}" stroke-width="1.6"/>`,
    tomato:   `<circle cx="32" cy="38" r="18" fill="#d84a3a" opacity=".92"/><path d="M32 20 l-9 -6 M32 20 l9 -6 M32 20 l-4 -9 M32 20 l4 -9" stroke="${GREEN}" stroke-width="2.6" stroke-linecap="round"/>`,
    schedule: `<rect x="12" y="16" width="40" height="36" rx="5" fill="none" stroke="${GREEN}" stroke-width="2.6"/><path d="M12 27 h40 M25 16 v36 M39 16 v36 M12 38 h40" stroke="${MUTED}" stroke-width="1.8"/><path d="M16 33 h6" stroke="${GOLD}" stroke-width="2.6" stroke-linecap="round"/>`,
    train:    `<rect x="14" y="14" width="36" height="30" rx="6" fill="none" stroke="${BLUE}" stroke-width="2.6"/><path d="M14 30 h36" stroke="${BLUE}" stroke-width="2"/><circle cx="24" cy="36" r="3" fill="${GOLD}"/><circle cx="40" cy="36" r="3" fill="${GOLD}"/><path d="M20 44 L16 54 M44 44 L48 54" stroke="${PALE}" stroke-width="2.6" stroke-linecap="round"/>`,
    monitor:  `<rect x="10" y="16" width="44" height="28" rx="4" fill="none" stroke="${BLUE}" stroke-width="2.6"/><path d="M24 52 h16 M32 44 v8" stroke="${PALE}" stroke-width="2.6" stroke-linecap="round"/><path d="M16 24 h20 M16 32 h12" stroke="${MUTED}" stroke-width="2.2"/>`,
    candy:    `<rect x="12" y="26" width="40" height="16" rx="8" fill="${GOLD}" opacity=".9"/><path d="M12 34 l-6 -8 v16 z M52 34 l6 -8 v16 z" fill="#e86a5a"/><path d="M22 26 v16 M32 26 v16 M42 26 v16" stroke="#8a5a14" stroke-width="1.6"/>`,
    pool:     `<rect x="8" y="30" width="48" height="22" rx="6" fill="#1d5e7a" opacity=".55" stroke="${BLUE}" stroke-width="2.4"/><path d="M14 26 q6 -5 12 0 t12 0 t12 0" fill="none" stroke="${BLUE}" stroke-width="2.4"/><path d="M14 38 q6 -5 12 0 t12 0" fill="none" stroke="${PALE}" stroke-width="1.8" opacity=".8"/>`,
    shield:   `<path d="M32 12 l18 6 v16 q0 16 -18 22 q-18 -6 -18 -22 v-16z" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linejoin="round"/><path d="M24 34 l6 7 l12 -14" stroke="${PALE}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    doors:    `<rect x="16" y="12" width="32" height="44" rx="4" fill="none" stroke="${BLUE}" stroke-width="2.6"/><path d="M32 12 v44" stroke="${BLUE}" stroke-width="2"/><circle cx="27" cy="34" r="2.4" fill="${GOLD}"/><circle cx="37" cy="34" r="2.4" fill="${GOLD}"/>`,
    field:    `<path d="M6 46 q26 -6 52 0" fill="none" stroke="${GREEN}" stroke-width="2.6"/><path d="M14 44 v-12 M24 44 v-16 M34 44 v-13 M44 44 v-17 M52 44 v-11" stroke="${GOLD}" stroke-width="2.6" stroke-linecap="round"/>`,
    frame:    `<rect x="10" y="14" width="44" height="36" rx="3" fill="none" stroke="${GOLD}" stroke-width="3"/><path d="M16 42 l10 -14 l8 10 l6 -7 l8 11z" fill="${GREEN}" opacity=".75"/><circle cx="42" cy="24" r="4" fill="${GOLD}"/>`,
    stamps:   `<rect x="12" y="16" width="18" height="22" rx="2" fill="none" stroke="${PALE}" stroke-width="2" stroke-dasharray="3 3"/><rect x="34" y="26" width="18" height="22" rx="2" fill="none" stroke="${PALE}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="21" cy="27" r="5" fill="${BLUE}" opacity=".7"/><circle cx="43" cy="37" r="5" fill="${GOLD}" opacity=".7"/>`,
    rank:     `<path d="M32 12 l6 13 l14 2 l-10 10 l2 14 l-12 -7 l-12 7 l2 -14 l-10 -10 l14 -2z" fill="${GOLD}" opacity=".9" stroke="#8a5a14" stroke-width="1.6"/>`,
    coins:    `<ellipse cx="24" cy="44" rx="14" ry="6" fill="${GOLD}" opacity=".85"/><ellipse cx="24" cy="38" rx="14" ry="6" fill="#ffe08a" stroke="#8a5a14" stroke-width="1.6"/><ellipse cx="42" cy="30" rx="14" ry="6" fill="#ffe08a" stroke="#8a5a14" stroke-width="1.6"/><path d="M36 22 a14 6 0 0 0 0 16" stroke="#8a5a14" stroke-width="1.4" fill="none"/>`,
    ornament: `<path d="M32 12 q10 12 0 22 q-10 10 0 20" fill="none" stroke="${GOLD}" stroke-width="2.4"/><circle cx="32" cy="23" r="4" fill="${BLUE}"/><circle cx="32" cy="45" r="4" fill="${GREEN}"/><path d="M12 34 h12 M40 34 h12" stroke="${MUTED}" stroke-width="2"/>`,
    railing:  `<path d="M10 20 v34 M54 20 v34 M10 26 h44" stroke="${BLUE}" stroke-width="2.8" stroke-linecap="round"/><path d="M18 26 v28 M26 26 v28 M34 26 v28 M42 26 v28 M50 26 v28" stroke="${MUTED}" stroke-width="2"/>`,
    jacket:   `<path d="M22 14 l10 6 l10 -6 l12 6 v30 h-44 v-30z" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linejoin="round"/><path d="M32 20 v30 M26 28 l6 6 l6 -6" stroke="${PALE}" stroke-width="2.2" fill="none"/>`,
    tree:     `<rect x="29" y="38" width="6" height="16" fill="#8a5a14"/><circle cx="32" cy="28" r="16" fill="${GREEN}" opacity=".85"/><circle cx="22" cy="34" r="9" fill="#6fae86" opacity=".8"/><circle cx="42" cy="34" r="9" fill="#6fae86" opacity=".8"/>`,
    mountain: `<path d="M6 50 L26 18 L38 34 L46 24 L58 50z" fill="none" stroke="${BLUE}" stroke-width="2.6" stroke-linejoin="round"/><path d="M20 28 l6 -8 l6 8" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M4 52 h56" stroke="${MUTED}" stroke-width="2"/>`,
    snow:     `<path d="M32 12 v40 M14 22 l36 20 M50 22 l-36 20" stroke="${BLUE}" stroke-width="2.4" stroke-linecap="round"/><circle cx="32" cy="32" r="5" fill="#fff" opacity=".9"/><path d="M32 12 l-4 6 h8z M32 52 l-4 -6 h8z" fill="#fff"/>`,
    candle:   `<rect x="26" y="24" width="12" height="30" rx="3" fill="#f0e0b8" stroke="#8a5a14" stroke-width="1.8"/><path d="M32 12 q6 6 0 12 q-6 -6 0 -12z" fill="${GOLD}"/><path d="M18 54 h28" stroke="${MUTED}" stroke-width="2.4" stroke-linecap="round"/>`,
    drop:     `<path d="M32 12 q14 18 14 26 a14 14 0 0 1 -28 0 q0 -8 14 -26z" fill="${BLUE}" opacity=".8" stroke="#cdefff" stroke-width="1.6"/><path d="M26 38 q0 6 6 8" stroke="#fff" stroke-width="1.8" fill="none" opacity=".8"/>`,
    person:   `<circle cx="32" cy="20" r="8" fill="none" stroke="${GOLD}" stroke-width="2.6"/><path d="M32 28 v16 M32 34 l-10 8 M32 34 l10 8 M32 44 l-8 12 M32 44 l8 12" stroke="${PALE}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`,
    steps:    `<ellipse cx="22" cy="22" rx="7" ry="10" fill="none" stroke="${PALE}" stroke-width="2.2" transform="rotate(-20 22 22)"/><ellipse cx="42" cy="40" rx="7" ry="10" fill="none" stroke="${PALE}" stroke-width="2.2" opacity=".7" transform="rotate(-20 42 40)"/>`
  };
  function icon(name, x, y, s){
    s = s || 0.62;
    const g = ICONS[name] || ICONS.schedule;
    return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
  }

  /* строки кадра переносим сами: длинная строка не должна упираться в край */
  function wrapLines(lines, max){
    const out = [];
    (lines||[]).forEach(l => {
      let cur = '';
      String(l).split(' ').forEach(w => {
        if((cur ? cur + ' ' + w : w).length > (max || 54) && cur){ out.push(cur); cur = w; }
        else cur = cur ? cur + ' ' + w : w;
      });
      if(cur) out.push(cur);
    });
    return out;
  }

  /* конструктор проверочной работы: одна функция — три работы */
  function build(cfg){
    const items = cfg.items;
    const explain = [];
    cfg.intro.forEach(t => explain.push(t));
    items.forEach((it, i) => explain.push('Вопрос ' + (i+1) + ' из ' + items.length + '. ' + it.ask));
    cfg.tail.forEach(t => explain.push(t));

    const lesson = {
      id: cfg.id, title: cfg.title, ico: cfg.ico || '📝',
      src: 'Русский язык · ' + cfg.klass + ' · Проверочная работа', subj: 'rus',
      explain: explain, check: cfg.check, tasks: cfg.tasks || []
    };

    function score(ok, total){
      const wrong = total - ok;
      if(wrong === 0) return {mark:'5', word:'отлично', col:GREEN};
      if(wrong <= 2) return {mark:'4', word:'хорошо', col:BLUE};
      if(wrong <= 4) return {mark:'3', word:'надо повторить', col:GOLD};
      return {mark:'2', word:'повтори слова и вернись', col:RED};
    }

    function scene(step, st){
      const introN = cfg.intro.length;
      const qN = items.length;
      if(step < introN){
        const t = cfg.introCards[step];
        if(!t) return SV(`${T(168,120,'Проверочная работа',GOLD,{fs:15})}`);
        const lines = wrapLines(t[1], 54);
        return SV(`
          ${T(168,18,t[0],GOLD,{fs:13.5})}
          ${lines.map((s,i)=>T2(168, 44+i*18, s, PALE, {fs:11.5})).join('')}
          ${t[2] ? R.rule(44 + lines.length*18 + 8, t[2][0], t[2][1], t[2][2]||GOLD) : ''}
        `);
      }
      const qi = step - introN;
      if(qi < qN){
        const it = items[qi];
        const picked = (st.ans||{})[qi];
        const shown = picked != null;
        const ok = picked === it.ans;
        const dots = items.map((_, i) => {
          const a = (st.ans||{})[i];
          const c = a == null ? '#3d5c49' : (a === items[i].ans ? GREEN : RED);
          return `<circle cx="${116 + i*9}" cy="16" r="3.2" fill="${c}"/>`;
        }).join('');
        return SV(`
          <g>${dots}</g>
          <rect x="22" y="28" width="292" height="118" rx="14" fill="rgba(255,255,255,.05)"
            stroke="${shown ? (ok?GREEN:RED) : '#3d5c49'}" stroke-width="1.7"/>
          ${icon(it.icon, 34, 44, 0.62)}
          ${T(196,74,it.word,PALE,{fs:26})}
          ${T2(196,100, it.ask, MUTED, {fs:11})}
          ${shown? T2(196,124, ok ? 'верно: '+it.spell : 'правильно: '+it.spell, ok?GREEN:RED, {fs:12}) : T2(196,124,'выбери вариант', MUTED, {fs:11})}
          ${R.rule(156, shown ? (ok?'Молодец':'Запомни') : 'Памятка',
                   shown ? it.note : (it.hint || 'Словарное слово: вспомни, как оно выглядит в списке.'),
                   shown ? (ok?GREEN:RED) : GOLD)}
        `);
      }
      const ti = step - introN - qN;
      if(ti === 0){
        const done = Object.keys(st.ans||{}).length;
        const ok = items.filter((it,i) => (st.ans||{})[i] === it.ans).length;
        const sc = score(ok, qN);
        const wrongList = items.filter((it,i) => (st.ans||{})[i] != null && (st.ans||{})[i] !== it.ans);
        return SV(`
          ${T(168,20,'Результат работы', GOLD, {fs:14})}
          <rect x="26" y="34" width="284" height="86" rx="14" fill="rgba(255,255,255,.05)" stroke="${sc.col}" stroke-width="1.8"/>
          ${T(168,76, 'верно ' + ok + ' из ' + qN, done < qN ? GOLD : sc.col, {fs:20})}
          ${done < qN
            ? T2(168,102, 'отметка будет видна после всех вопросов', PALE, {fs:12})
            : T2(168,102, 'отметка «' + sc.mark + '» · ' + sc.word, PALE, {fs:12.5})}
          ${T2(168,140, done < qN ? 'осталось ответить: ' + (qN - done) : 'работа пройдена до конца', MUTED, {fs:11})}
          ${done < qN
            ? R.rule(152, 'Работа не закончена', 'Ответь на оставшиеся вопросы — и появится отметка и разбор ошибок.', GOLD)
            : (wrongList.length
              ? R.rule(152, 'Повторить', wrongList.map(x=>x.spell).join(', '), RED, 52)
              : R.rule(152, 'Ошибок нет', 'Словарные слова этого списка ты знаешь. Так держать!', GREEN))}
        `);
      }
      const t = cfg.tailCards[ti-1] || cfg.tailCards[0];
      const lines = wrapLines(t[1], 54);
      return SV(`
        ${T(168,18,t[0],GOLD,{fs:13.5})}
        ${lines.map((s,i)=>T2(168,44+i*18,s,PALE,{fs:11.5})).join('')}
        ${t[2]? R.rule(44 + lines.length*18 + 8, t[2][0], t[2][1], t[2][2]||GOLD) : ''}
      `);
    }

    function vis(el){
      try{
        const step = LV.step || 0;
        const lk = (typeof lidKey==='function') ? lidKey(LV.id) : String(cfg.id);
        if(typeof CHS === 'undefined') window.CHS = {};
        if(!CHS[lk]) CHS[lk] = {};
        const st = CHS[lk];
        if(!st.ans) st.ans = {};
        const introN = cfg.intro.length;
        const qi = step - introN;
        let extra = '';
        if(qi >= 0 && qi < items.length){
          const it = items[qi];
          const picked = st.ans[qi];
          const labels = it.opts || [it.ans];
          extra = `<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;width:100%">
            ${labels.map(o => `<button type="button" class="btn" style="min-width:74px;font-size:17px;padding:14px 10px;border-radius:14px;${picked===o?'border-color:'+GOLD:''}"
              onclick="ruExamPick(${cfg.id},${qi},'${o}')">${o}</button>`).join('')}</div>
            <div class="wv-sml" style="color:${MUTED}">${picked!=null ? 'нажми другой вариант, если хочешь исправить ответ' : 'выбери верное написание'}</div>`;
        }
        el.innerHTML = `<div class="wv"><div class="wv-col">${scene(step, st)}${extra}</div></div>`;
      }catch(e){ el.innerHTML = ''; }
    }

    /* обработчики разных работ не должны перекрывать друг друга — держим их по номеру работы */
    window.RU_EXAM_PICK = window.RU_EXAM_PICK || {};
    window.RU_EXAM_PICK[cfg.id] = function(qi, val){
      try{
        const lk = lidKey(LV.id); CHS[lk] = CHS[lk] || {}; CHS[lk].ans = CHS[lk].ans || {};
        const st = CHS[lk];
        const it = items[qi];
        const first = st.ans[qi] == null;
        st.ans[qi] = val;
        if(first){ if(val === it.ans) st.ok = (st.ok||0)+1; else st.bad = (st.bad||0)+1; }
        chRender(0);
      }catch(e){}
    };
    window.ruExamPick = window.ruExamPick || function(id, qi, val){
      const f = window.RU_EXAM_PICK[id];
      if(typeof f === 'function') f(qi, val);
    };

    window.RU_EXAM_ITEMS = window.RU_EXAM_ITEMS || {};
    window.RU_EXAM_ITEMS[cfg.id] = items;
    window.WAVE_B[cfg.id] = vis;
    (function(){
      const arr = window.ARH_LESSONS || [];
      let f = false;
      for(let i=0;i<arr.length;i++){ if(arr[i].id === cfg.id){ arr[i] = lesson; f = true; break; } }
      if(!f) arr.push(lesson);
    })();
    return lesson;
  }

  /* ---------- работы в формате МЦКО: баллы по заданиям и шкала выполнения ---------- */
  /* Баллы и темы заданий — из официального демотеста МЦКО (demo.mcko.ru, Русский язык, 5 класс):
     максимум 24 балла. МЦКО не выставляет отметку, а считает процент выполнения;
     шкала отметки ниже — рекомендация для школы (85–100 % — «5», 65–84 % — «4», 45–64 % — «3»). */
  function mckoMark(score, max){
    const pct = max ? Math.round(score / max * 100) : 0;
    let mark, word, col;
    if(pct >= 85){ mark='5'; word='высокий уровень'; col=GREEN; }
    else if(pct >= 65){ mark='4'; word='повышенный уровень'; col=BLUE; }
    else if(pct >= 45){ mark='3'; word='базовый уровень'; col=GOLD; }
    else { mark='2'; word='низкий уровень'; col=RED; }
    return {pct: pct, mark: mark, word: word, col: col};
  }
  function norm(s){
    /* сравниваем смысл ответа: регистр, ё/е, знаки и порядок слов не важны */
    const t = String(s == null ? '' : s).toLowerCase().replace(/ё/g,'е')
      .replace(/[^a-zа-я0-9 ]/g,' ').replace(/\s+/g,' ').trim();
    const nums = t.match(/\d+/g);
    if(nums) return nums.map(Number).sort((a,b)=>a-b).join(',');
    return t.split(' ').filter(Boolean).sort().join(' ');
  }
  function itemScore(it, got){
    if(got == null) return 0;
    const max = it.points || 1;
    if(it.kind === 'text'){
      const okList = (it.accept || []).map(norm);
      return okList.indexOf(norm(got)) >= 0 ? max : 0;
    }
    if(it.kind === 'multi'){
      const chosen = got.slice().sort().join(',');
      const right = it.correct.slice().sort().join(',');
      if(chosen === right) return max;
      const hits = got.filter(k => it.correct.indexOf(k) >= 0).length;
      const wrong = got.filter(k => it.correct.indexOf(k) < 0).length;
      if(hits && !wrong) return Math.max(1, Math.floor(max / 2));
      return 0;
    }
    return got === it.correct ? max : 0;
  }
  function buildMcko(cfg){
    const items = cfg.items;
    const maxAll = items.reduce((a, it) => a + (it.points || 1), 0);
    const explain = [];
    cfg.intro.forEach(t => explain.push(t));
    items.forEach((it, i) => explain.push('Задание ' + (i+1) + ' из ' + items.length + '. ' + it.theme + '. ' + (it.ask || '')));
    cfg.tail.forEach(t => explain.push(t));
    const lesson = {
      id: cfg.id, title: cfg.title, ico: cfg.ico || '🎓',
      src: 'Русский язык · ' + cfg.klass + ' · МЦКО', subj: 'rus',
      explain: explain, check: cfg.check, tasks: cfg.tasks || []
    };
    const stepsN = explain.length;

    function scene(step, st){
      const introN = cfg.intro.length, qN = items.length;
      if(step < introN){
        const t = cfg.introCards[step];
        const lines = wrapLines(t[1], 54);
        return SV(`
          ${T(168,18,t[0],GOLD,{fs:13.5})}
          ${lines.map((x,i)=>T2(168, 44+i*18, x, PALE, {fs:11.5})).join('')}
          ${t[2] ? R.rule(44 + lines.length*18 + 8, t[2][0], t[2][1], t[2][2]||GOLD) : ''}
        `);
      }
      const qi = step - introN;
      if(qi < qN){
        const it = items[qi];
        const got = (st.ans||{})[qi];
        const done = got != null;
        const pts = itemScore(it, got);
        const dots = items.map((_, i) => {
          const a = (st.ans||{})[i];
          const c = a == null ? '#3d5c49' : (itemScore(items[i], a) === (items[i].points||1) ? GREEN : (itemScore(items[i], a) > 0 ? GOLD : RED));
          return `<circle cx="${104 + i*8}" cy="16" r="3" fill="${c}"/>`;
        }).join('');
        return SV(`
          <g>${dots}</g>
          ${icon(it.icon || 'schedule', 26, 38, 0.52)}
          ${T(120,52,'Задание ' + (qi+1) + ' из ' + qN, GOLD, {fs:13.5})}
          ${T2(120,74, it.theme, PALE, {fs:11})}
          ${T2(120,94, (it.points||1) + ' ' + ((it.points||1) === 1 ? 'балл' : 'балла') + (done ? ' · получено ' + pts : ''), done ? (pts === (it.points||1) ? GREEN : (pts > 0 ? GOLD : RED)) : MUTED, {fs:11})}
          ${done
            ? R.rule(112, pts === (it.points||1) ? 'Верно' : (pts > 0 ? 'Частично верно' : 'Ошибка'), it.sol, pts === (it.points||1) ? GREEN : (pts > 0 ? GOLD : RED), 52)
            : R.rule(112, it.ask || 'Выполни задание', it.hint || 'Вспомни правило и выбери ответ.', GOLD, 52)}
        `);
      }
      const doneCount = Object.keys(st.ans||{}).length;
      const score = items.reduce((a, it, i) => a + itemScore(it, (st.ans||{})[i]), 0);
      const m = mckoMark(score, maxAll);
      if(step === introN + qN){
        return SV(`
          ${T(168,20,'Результат работы', GOLD, {fs:14})}
          <rect x="22" y="34" width="292" height="96" rx="14" fill="rgba(255,255,255,.05)" stroke="${doneCount < qN ? '#3d5c49' : m.col}" stroke-width="1.8"/>
          ${T(168,74, score + ' из ' + maxAll + ' баллов', doneCount < qN ? GOLD : m.col, {fs:20})}
          ${T2(168,100, doneCount < qN ? 'отметка появится после всех заданий' : 'выполнение ' + m.pct + ' % · отметка «' + m.mark + '» · ' + m.word, PALE, {fs:12})}
          ${T2(168,120, doneCount < qN ? 'осталось заданий: ' + (qN - doneCount) : 'как в настоящей работе МЦКО', MUTED, {fs:10.5})}
          ${doneCount < qN
            ? R.rule(140, 'Работа не закончена', 'Ответь на все задания — и появится балл, процент выполнения и отметка.', GOLD)
            : R.rule(140, 'Шкала', 'МЦКО оценку не ставит: в отчёте указывают процент выполнения. Отметка выше — рекомендация для школы (85–100 % — «5», 65–84 % — «4», 45–64 % — «3»).', GREEN, 56)}
        `);
      }
      const t = cfg.tailCards[step - introN - qN - 1] || cfg.tailCards[0];
      const lines = wrapLines(t[1], 54);
      const weak = items.filter((it, i) => itemScore(it, (st.ans||{})[i]) < (it.points||1));
      return SV(`
        ${T(168,18,t[0],GOLD,{fs:13.5})}
        ${lines.map((x,i)=>T2(168, 44+i*18, x, PALE, {fs:11.5})).join('')}
        ${weak.length
          ? R.rule(44 + lines.length*18 + 8, 'Повторить темы', weak.map(x => x.theme).slice(0,4).join(' · '), RED, 54)
          : R.rule(44 + lines.length*18 + 8, 'Всё верно', 'Ты справился со всеми заданиями этой работы.', GREEN, 54)}
      `);
    }

    function vis(el){
      try{
        const step = LV.step || 0;
        const lk = (typeof lidKey === 'function') ? lidKey(LV.id) : String(cfg.id);
        if(typeof CHS === 'undefined') window.CHS = {};
        if(!CHS[lk]) CHS[lk] = {};
        const st = CHS[lk];
        if(!st.ans) st.ans = {};
        const introN = cfg.intro.length, qi = step - introN;
        let extra = '';
        if(qi >= 0 && qi < items.length){
          const it = items[qi];
          const got = st.ans[qi];
          const locked = got != null;
          const parts = [];
          const boxS = 'width:100%;box-sizing:border-box;text-align:left;color:#f6efe0;font-size:18px;line-height:1.62;font-family:Georgia,serif';
          if(it.material) parts.push(`<div style="${boxS};box-sizing:border-box;background:rgba(255,255,255,.05);border:1px solid rgba(255,215,106,.22);border-radius:14px;padding:12px 14px">${it.material}</div>`);
          parts.push(`<div style="${boxS};font-size:21px;line-height:1.45;font-weight:600;color:#ffe9a8">${it.q}</div>`);
          if(!locked){
            const labels = it.opts || [];
            if(it.kind === 'text'){
              parts.push(`<div style="display:flex;gap:6px;align-items:center;width:min(100%,340px)">
                <input id="mkIn" type="text" placeholder="впиши ответ" autocomplete="off"
                  style="flex:1;min-width:0;padding:8px 10px;border-radius:10px;border:1px solid #3d5c49;background:rgba(255,255,255,.05);color:#e8dcc8;font-size:14px">
                <button type="button" class="btn" style="margin:0" onclick="ruMckoCheck(${cfg.id})">Ответить</button></div>`);
            } else if(it.kind === 'multi'){
              const chosen = ((st.tmp||{})[qi] || []);
              parts.push(`<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">${labels.map((o,k) =>
                `<button type="button" class="btn" style="text-align:left;font-size:17.5px;padding:16px 16px;border-radius:16px;${chosen.indexOf(k)>=0?'border-color:#ffd76a;background:rgba(255,215,106,.12)':''}"
                  onclick="ruMckoToggle(${cfg.id},${k})">${o}</button>`).join('')}</div>
                <button type="button" class="btn" onclick="ruMckoCheck(${cfg.id})">Ответить</button>`);
            } else {
              parts.push(`<div style="display:flex;flex-direction:column;gap:6px;width:min(100%,340px)">${labels.map((o,k) =>
                `<button type="button" class="btn" style="text-align:left;font-size:17.5px;padding:16px 16px;border-radius:16px" onclick="ruMckoPick(${cfg.id},${k})">${o}</button>`).join('')}</div>`);
            }
          } else {
            const pts2 = itemScore(it, got);
            parts.push(`<div style="${boxS};background:rgba(255,255,255,.04);border:1px solid ${pts2 === (it.points||1) ? '#8fd1a8' : (pts2 > 0 ? '#ffd76a' : '#e86a5a')};border-radius:12px;padding:8px 10px">
              ${pts2 === (it.points||1) ? '✅ верно' : (pts2 > 0 ? '🟡 частично верно' : '❌ ошибка')} · правильно: <b>${it.shown}</b></div>`);
          }
          extra = parts.join('');
        }
        el.innerHTML = `<div class="wv"><div class="wv-col">${scene(step, st)}${extra}</div></div>`;
      }catch(e){ el.innerHTML = ''; }
    }

    window.RU_MCKO = window.RU_MCKO || {};
    window.RU_MCKO[cfg.id] = {
      pick: function(k){ const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].ans=CHS[lk].ans||{}; CHS[lk].ans[cur()] = k; chRender(0); },
      toggle: function(k){
        const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].ans=CHS[lk].ans||{}; CHS[lk].tmp=CHS[lk].tmp||{};
        const q=cur(); const arr=CHS[lk].tmp[q]=CHS[lk].tmp[q]||[];
        const i=arr.indexOf(k); if(i>=0) arr.splice(i,1); else arr.push(k);
        chRender(0);
      },
      items: items,
      score: function(){
        const lk=lidKey(LV.id); const st=CHS[lk]||{}; const a=st.ans||{};
        return items.map((it,i)=>({n:i+1, theme:it.theme, points:it.points||1, got:a[i], pts:itemScore(it,a[i])}));
      },
      check: function(){
        const lk=lidKey(LV.id); CHS[lk]=CHS[lk]||{}; CHS[lk].ans=CHS[lk].ans||{}; const q=cur();
        const it=items[q];
        if(it.kind==='text'){
          const inp=document.getElementById('mkIn');
          const val=inp?inp.value:'';
          if(!val.trim()) return;
          CHS[lk].ans[q]=val;
        } else {
          const arr=(CHS[lk].tmp&&CHS[lk].tmp[q])||[];
          if(!arr.length) return;
          CHS[lk].ans[q]=arr.slice();
        }
        chRender(0);
      }
    };
    function cur(){
      const step = (typeof LV!=='undefined' && LV.step!=null) ? LV.step : 0;
      return Math.max(0, step - cfg.intro.length);
    }

    window.RU_EXAM_ITEMS = window.RU_EXAM_ITEMS || {};
    window.RU_EXAM_ITEMS[cfg.id] = items;
    window.WAVE_B[cfg.id] = vis;
    (function(){
      const arr = window.ARH_LESSONS || [];
      let f = false;
      for(let i=0;i<arr.length;i++){ if(arr[i].id === cfg.id){ arr[i] = lesson; f = true; break; } }
      if(!f) arr.push(lesson);
    })();
    return lesson;
  }

    /* внешние обёртки: приложение вызывает ruMckoPick / ruMckoToggle / ruMckoCheck */
    window.ruMckoPick = window.ruMckoPick || function(id, k){ const h=window.RU_MCKO[id]; if(h) h.pick(k); };
    window.ruMckoToggle = window.ruMckoToggle || function(id, k){ const h=window.RU_MCKO[id]; if(h) h.toggle(k); };
    window.ruMckoCheck = window.ruMckoCheck || function(id){ const h=window.RU_MCKO[id]; if(h) h.check(); };
  return {build: build, buildMcko: buildMcko, icon: icon, ICONS: ICONS, mckoMark: mckoMark};
})();

/* ================= РАБОТА 611 · Словарные слова, 5 класс ================= */
window.RUKEXAM.build({
  id: 611, klass: '5 класс', title: 'Проверочная работа: словарные слова (5 класс)', ico: '📝',
  intro: [
    'Это проверочная работа по словарным словам 5 класса. Слова взяты из школьного списка по учебнику Т.А. Ладыженской — это те слова, которые нельзя проверить правилом и приходится запоминать.',
    'В работе 12 слов. Настоящий словарный диктант в 5 классе длиннее — 15–20 слов, но проверяет он то же самое: помнишь ли ты написание словарных слов.',
    'Запоминать словарные слова помогают четыре приёма, которые советует школьная методика. Смотри следующий кадр.'
  ],
  introCards: [
    ['Что проверяем', ['словарные слова 5 класса', '12 слов из школьного списка', 'работа идёт по кадрам, слово за словом'], ['Как отвечать', 'Выбирай букву кнопкой ниже.', '#7fd1ff']],
    ['Как запоминать словарные слова', ['1. Группами по орфограмме: все слова с о в первом слоге вместе.',
        '2. Через происхождение: апельсин — «китайское яблоко», велосипед — «быстрые ноги».',
        '3. Проговаривай по слогам и записывай по памяти три раза.',
        '4. Карточки: слово на одной стороне, проверка на другой.'], ['Проверка', 'Словарное слово узнают глазами и рукой, а не на слух.', '#ffd76a']],
    ['Как считается отметка', ['Нормы школьного словарного диктанта:',
        '0 ошибок — «5»  ·  1–2 ошибки — «4»',
        '3–4 ошибки — «3»  ·  больше — надо повторить'], ['Важно', 'Отметка покажет, какие слова ещё учить.', '#8fd1a8']]
  ],
  items: [
    {word:'ап_льсин', hint:"Слово пришло из голландского. Гласная во втором слоге — не и.", ans:'е', opts:['е','и'], icon:'orange', spell:'апельсин', ask:'проверяем гласную во втором слоге', rule:'Словарное слово: пишем «апельсин» (а-п-е-л-ь-с-и-н).', note:'Апельсин — от голландского appelsien, «китайское яблоко»: ап-ЕЛЬ-син.'},
    {word:'в_лосипед', hint:"Слово собрано из «быстрый» и «нога». Вспомни первую гласную.", ans:'е', opts:['е','и'], icon:'bike', spell:'велосипед', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «велосипед».', note:'Велосипед — от латинского velox («быстрый») и pes («нога»).'},
    {word:'г_рдероб', hint:"Слово из французского: «хранить» + «одежда».", ans:'а', opts:['а','о'], icon:'hanger', spell:'гардероб', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «гардероб».', note:'Гардероб — от французского garder («хранить») и robe («одежда»).'},
    {word:'к_лендарь', hint:"Слово из латыни: «первый день месяца».", ans:'а', opts:['а','о'], icon:'calendar', spell:'календарь', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «календарь».', note:'Календарь — от латинского calendae, «первый день месяца».'},
    {word:'к_рзина', hint:"Проговори по слогам и вспомни, как слово выглядит в списке.", ans:'о', opts:['о','а'], icon:'basket', spell:'корзина', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «корзина».', note:'Запомни группу с о в первом слоге: корзина, помидор, вокзал, конфета.'},
    {word:'п_рашют', hint:"Слово значит «против падения». Первая гласная — как в слове «пара».", ans:'а', opts:['а','о'], icon:'parachute', spell:'парашют', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «парашют».', note:'Парашют — «против падения» (para + chute). После ш здесь пишется ю, это исключение.'},
    {word:'п_анино', hint:"Итальянское слово «тихо». Гласная во втором слоге.", ans:'и', opts:['и','е'], icon:'piano', spell:'пианино', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «пианино».', note:'Пианино — от итальянского piano, «тихо».'},
    {word:'п_мидор', hint:"Итальянское «золотое яблоко». Вспомни первый слог.", ans:'о', opts:['о','а'], icon:'tomato', spell:'помидор', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «помидор».', note:'Помидор — от итальянского pomo d’oro, «золотое яблоко».'},
    {word:'р_списание', hint:"Здесь не корень, а приставка. Вспомни, как пишутся приставки раз-/рас-.", ans:'а', opts:['а','о'], icon:'schedule', spell:'расписание', ask:'проверяем гласную в приставке', rule:'В приставке рас- пишется а: расписание, рассказ.', note:'Приставки раз-/рас- всегда с а, их не проверяют ударением.'},
    {word:'в_кзал', hint:"Слово пришло из английского названия парка. Вспомни первый слог.", ans:'о', opts:['о','а'], icon:'train', spell:'вокзал', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «вокзал».', note:'Вокзал — от английского Vauxhall, название парка в Лондоне.'},
    {word:'к_мпьютер', hint:"Английское «вычислитель». Вспомни первый слог.", ans:'о', opts:['о','а'], icon:'monitor', spell:'компьютер', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «компьютер».', note:'Компьютер — от английского computer, «вычислитель».'},
    {word:'к_нфета', hint:"Латинское «изготовленное». Вспомни первый слог.", ans:'о', opts:['о','а'], icon:'candy', spell:'конфета', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «конфета».', note:'Конфета — от латинского confectum, «изготовленное».'}
  ],
  tail: [
    'Посмотри результат: сколько слов верно и какая отметка по школьным нормам. Слова с ошибками нужно повторить — именно они попадутся в диктанте.',
    'Теперь закрепи: запиши слова с ошибками по памяти три раза, проговаривая по слогам. Затем пройди работу по словарным словам 6 класса.'
  ],
  tailCards: [
    ['Что дальше', ['Сначала повтори слова, где были ошибки.', 'Потом проверь себя снова: те же слова без подсказок.',
        'Затем возьми работу по словарным словам 6 класса.'], ['Как повторять', 'Три раза записать по памяти, проговаривая по слогам.', '#8fd1a8']],
    ['Группы для повторения', ['с о в первом слоге: корзина, помидор, вокзал, компьютер, конфета.',
        'с а в первом слоге: апельсин, гардероб, календарь, парашют, расписание.',
        'с е и и: велосипед, пианино.'],
      ['Совет', 'Учи слова группами по орфограмме — так они запоминаются быстрее.', '#ffd76a']]
  ],
  check: { q: 'Какая буква в слове «в_лосипед»?', choices: ['е', 'и'], ans: 0,
    exp: 'Словарное слово «велосипед» пишется с е в первом слоге.' },
  tasks: [
    { q: 'Сколько ошибок в записи: «календарь», «карзина», «велосипед»?', kind: 'unit', ans: 1, tol: 0,
      hints: ['Проверь каждое слово по списку.', 'Корзина пишется через о.', 'Ошибка одна — в слове «карзина».'], sol: '1' },
    { q: 'Какое слово написано верно?', kind: 'choice', choices: ['апельсин', 'апельсын', 'опельсин'], ans: 0,
      hints: ['Это словарное слово.', 'В первом слоге а, во втором е.', 'Верно: апельсин.'], sol: 'апельсин' }
  ]
});

/* ================= РАБОТА 612 · Словарные слова, 6 класс ================= */
window.RUKEXAM.build({
  id: 612, klass: '6 класс', title: 'Проверочная работа: словарные слова (6 класс)', ico: '📝',
  intro: [
    'Вторая проверочная работа — по словарным словам 6 класса. Список тот же, что в школьной программе по учебнику Т.А. Ладыженской: аккуратный, бассейн, богатырь, искусство, коллекция, миллион и другие.',
    'Здесь 12 слов, и почти в каждом проверяется трудное место: гласная, которую нельзя проверить, или удвоенная согласная.',
    'Напоминание: словарное слово нельзя проверить правилом — его узнают по памяти. Сначала вспомни, потом выбирай.'
  ],
  introCards: [
    ['Что проверяем', ['словарные слова 6 класса', '12 слов из школьного списка', 'гласные и удвоенные согласные'], ['Как отвечать', 'Выбери вариант кнопкой ниже.', '#7fd1ff']],
    ['Трудные места', ['Гласная без проверки: богатырь, командир, орнамент.',
        'Удвоенная согласная: бассейн, искусство, коллекция, миллион.',
        'Иностранные слова: вестибюль, гектар, пиджак.'], ['Совет', 'Учи слова группами: так они держатся в памяти.', '#ffd76a']],
    ['Как считается отметка', ['0 ошибок — «5»  ·  1–2 ошибки — «4»',
        '3–4 ошибки — «3»  ·  больше — повтори слова'], ['Важно', 'Слова с ошибками выпиши и запиши по памяти.', '#8fd1a8']]
  ],
  items: [
    {word:'ба_ейн', hint:'Слово пришло из французского bassin.', ans:'сс', opts:['сс','с'], icon:'pool', spell:'бассейн', ask:'проверяем удвоенную согласную', rule:'В слове «бассейн» пишутся две с.', note:'Бассейн — из французского bassin, «водоём». Две с запоминаем.'},
    {word:'б_гатырь', hint:'Словарное слово: вспомни, как оно выглядит в списке.', ans:'о', opts:['о','а'], icon:'shield', spell:'богатырь', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «богатырь».', note:'Богатырь — слово пришло из тюркских языков, первая гласная о.'},
    {word:'в_стибюль', hint:'Слово из другого языка — вспомни его написание.', ans:'е', opts:['е','и'], icon:'doors', spell:'вестибюль', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «вестибюль».', note:'Вестибюль — от латинского vestibulum, «передняя».'},
    {word:'г_ктар', hint:'В слове спрятано греческое «сто».', ans:'е', opts:['е','и'], icon:'field', spell:'гектар', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «гектар».', note:'Гектар — от греческого hekaton, «сто» (гекто- = 100).'},
    {word:'иску_тво', hint:'Здесь удвоенная согласная: вспомни, какая.', ans:'сс', opts:['сс','с'], icon:'frame', spell:'искусство', ask:'проверяем удвоенную согласную', rule:'В слове «искусство» пишутся две с.', note:'Искусство — две с, а в родственном «искусный» — одна. Сравни и запомни.'},
    {word:'ко_екция', hint:'Слово из латыни: вспомни удвоение.', ans:'лл', opts:['лл','л'], icon:'stamps', spell:'коллекция', ask:'проверяем удвоенную согласную', rule:'В слове «коллекция» пишутся две л.', note:'Коллекция — от латинского collectio, «собрание». Две л.'},
    {word:'к_мандир', hint:'Словарное слово из военной речи.', ans:'о', opts:['о','а'], icon:'rank', spell:'командир', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «командир».', note:'Командир — от латинского commandare, «поручать». Первая гласная о.'},
    {word:'ми_ион', hint:'Число с удвоенной согласной.', ans:'лл', opts:['лл','л'], icon:'coins', spell:'миллион', ask:'проверяем удвоенную согласную', rule:'В слове «миллион» пишутся две л.', note:'Миллион — от итальянского millione, «тысяча тысяч». Две л, как и в «миллиард».'},
    {word:'_рнамент', hint:'Слово пришло из латыни, речь о узоре.', ans:'о', opts:['о','а'], icon:'ornament', spell:'орнамент', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «орнамент».', note:'Орнамент — от латинского ornamentum, «украшение».'},
    {word:'п_рила', hint:'Словарное слово: вспомни, как оно выглядит в списке.', ans:'е', opts:['е','и'], icon:'railing', spell:'перила', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «перила».', note:'Перила — от слова «переть» (опираться), первая гласная е.'},
    {word:'п_джак', hint:'Слово пришло из английского, речь об одежде.', ans:'и', opts:['и','е'], icon:'jacket', spell:'пиджак', ask:'проверяем гласную в первом слоге', rule:'Словарное слово: пишем «пиджак».', note:'Пиджак — от английского pea jacket. Первая гласная и.'},
    {word:'пр_мер', hint:'Словарное слово с корнем пример-.', ans:'и', opts:['и','е'], icon:'tree', spell:'пример', ask:'проверяем гласную в корне', rule:'Словарное слово: пишем «пример».', note:'Пример — корень пример- (примерный, примерять). Запомни: пример, привет, природа.'}
  ],
  tail: [
    'Смотри результат и отметку. Слова с ошибками обязательно выпиши — именно их проверяют в словарном диктанте.',
    'Повтори трудные места: удвоенные согласные (бассейн, искусство, коллекция, миллион) и гласные в иностранных словах (вестибюль, гектар, пиджак).'
  ],
  tailCards: [
    ['Что дальше', ['Выпиши слова с ошибками и запиши их по памяти.',
        'Проговори каждое по слогам, отмечая трудное место.',
        'Пройди работу снова через день — так слово удержится.'], ['Как повторять', 'Три раза по памяти, затем проверка по списку.', '#8fd1a8']],
    ['Группы для повторения', ['Удвоенная согласная: бассейн, искусство, коллекция, миллион.',
        'Иностранные слова: вестибюль, гектар, пиджак, командир.',
        'Остальные: богатырь, орнамент, перила, природа.'], ['Совет', 'Один список — три подхода, по одной группе за раз.', '#ffd76a']]
  ],
  check: { q: 'Сколько с в слове «искусство»?', choices: ['две', 'одна'], ans: 0,
    exp: 'В слове «искусство» пишутся две с, а в родственном «искусный» — одна.' },
  tasks: [
    { q: 'Сколько ошибок: «басейн», «коллекция», «пиджак»?', kind: 'unit', ans: 1, tol: 0,
      hints: ['Сверь каждое слово со списком.', 'В «бассейне» две с.', 'Ошибка одна — в слове «басейн».'], sol: '1' },
    { q: 'Какое слово написано верно?', kind: 'choice', choices: ['миллион', 'милион', 'меллион'], ans: 0,
      hints: ['Это число.', 'В нём удвоенная л.', 'Верно: миллион.'], sol: 'миллион' }
  ]
});

/* ================= РАБОТА 613 · Орфограммы корня ================= */
window.RUKEXAM.build({
  id: 613, klass: '5 класс', title: 'Проверочная работа: орфограммы корня', ico: '📝',
  intro: [
    'Третья работа — про корень слова. Здесь проверяются безударные гласные: те, что слышатся неясно и требуют проверочного слова.',
    'Правило одно: безударную гласную в корне проверяй ударением. Подбери родственное слово или измени форму так, чтобы гласная стала ударной: лиса — лис, гора — горы.',
    'В каждом кадре будет слово с пропуском, а рядом — проверочное слово. Сначала подумай, потом выбирай букву.'
  ],
  introCards: [
    ['Что проверяем', ['безударные гласные в корне', '12 слов с проверкой', 'умение подбирать проверочное слово'], ['Как отвечать', 'Выбери букву кнопкой внизу.', '#7fd1ff']],
    ['Правило', ['Безударную гласную проверяй ударением.',
        'Измени форму: гора — горы, окно — окна.',
        'Или подбери родственника: лесной — лес.'],
      ['Осторожно', 'Похожие слова не всегда родственники: вода и водитель.', '#ffd76a']],
    ['Как считается отметка', ['0 ошибок — «5»  ·  1–2 ошибки — «4»',
        '3–4 ошибки — «3»  ·  больше — повтори правило'], ['Важно', 'Ошибка означает, что проверочное слово подобрано неверно.', '#8fd1a8']]
  ],
  items: [
    {word:'л_сной', hint:'Проверочное слово уже рядом: «лес».', ans:'е', opts:['е','и'], icon:'tree', spell:'лесной', ask:'проверяем гласную в корне (проверка: лес)', rule:'лЕс — под ударением е, пишем лесной.', note:'Проверка «лес»: гласная стала ударной, слышим е.'},
    {word:'г_ра', hint:'Проверочное слово: «горы».', ans:'о', opts:['о','а'], icon:'mountain', spell:'гора', ask:'проверяем гласную в корне (проверка: горы)', rule:'гОры — пишем гора.', note:'Множественное число «горы» ставит гласную под ударение.'},
    {word:'м_ря', hint:'Проверочное слово: «море».', ans:'о', opts:['о','а'], icon:'pool', spell:'моря', ask:'проверяем гласную в корне (проверка: море)', rule:'мОре — пишем моря.', note:'Родственное слово «море» делает гласную ударной.'},
    {word:'тр_ва', hint:'Проверочное слово: «травы».', ans:'а', opts:['а','о'], icon:'field', spell:'трава', ask:'проверяем гласную в корне (проверка: травы)', rule:'трАвы — пишем трава.', note:'Форма множественного числа «травы» — проверка.'},
    {word:'сн_жок', hint:'Проверочное слово: «снег».', ans:'е', opts:['е','и'], icon:'snow', spell:'снежок', ask:'проверяем гласную в корне (проверка: снег)', rule:'снЕг — пишем снежок.', note:'Чередование г//ж не мешает: корень один, проверка «снег».'},
    {word:'з_мля', hint:'Проверочное слово: «земли».', ans:'е', opts:['е','и'], icon:'field', spell:'земля', ask:'проверяем гласную в корне (проверка: земли)', rule:'зЕмли — пишем земля.', note:'«Земли» — форма того же слова с ударной гласной.'},
    {word:'м_лодой', hint:'Проверочное слово: «молодость».', ans:'о', opts:['о','а'], icon:'person', spell:'молодой', ask:'проверяем гласную в корне (проверка: молодость)', rule:'мОлодость — пишем молодой.', note:'В слове два безударных о, проверяем первое: молодость.'},
    {word:'х_дить', hint:'Проверочное слово: «ход».', ans:'о', opts:['о','а'], icon:'steps', spell:'ходить', ask:'проверяем гласную в корне (проверка: ход)', rule:'хОд — пишем ходить.', note:'Короткое слово «ход» ставит гласную под ударение.'},
    {word:'св_ча', hint:'Проверочное слово: «свечи».', ans:'е', opts:['е','и'], icon:'candle', spell:'свеча', ask:'проверяем гласную в корне (проверка: свечи)', rule:'свЕчи — пишем свеча.', note:'Форма множественного числа «свечи» — проверка.'},
    {word:'п_тно', hint:'Проверочное слово: «пятна».', ans:'я', opts:['я','е'], icon:'drop', spell:'пятно', ask:'проверяем гласную в корне (проверка: пятна)', rule:'пЯтна — пишем пятно.', note:'После проверки слышим я, значит пишем я, а не е.'},
    {word:'с_сна', hint:'Проверочное слово: «сосны».', ans:'о', opts:['о','а'], icon:'tree', spell:'сосна', ask:'проверяем гласную в корне (проверка: сосны)', rule:'сОсны — пишем сосна.', note:'«Сосны» ставит гласную под ударение.'},
    {word:'в_да', hint:'Проверочное слово: «воды».', ans:'о', opts:['о','а'], icon:'drop', spell:'вода', ask:'проверяем гласную в корне (проверка: воды)', rule:'вОды — пишем вода.', note:'Но помни: «водитель» — не родственное слово, оно не проверка.'}
  ],
  tail: [
    'Посмотри результат. Если ошибка в проверочном слове — повтори правило: безударную гласную проверяем ударением в родственном слове или в другой форме того же слова.',
    'Потренируйся ещё: возьми любые пять слов и подбери к каждому проверочное, а потом проверь себя по словарю.'
  ],
  tailCards: [
    ['Что дальше', ['Разбери каждую ошибку: какое проверочное слово ты подобрал?',
        'Проверь, что оно родственное по смыслу.',
        'Запиши пары «слово — проверка» в тетрадь.'], ['Как тренироваться', 'Пять слов в день с проверкой — и правило закрепится.', '#8fd1a8']],
    ['Пары для повторения', ['гора — горы, трава — травы, вода — воды.',
        'снежок — снег, земля — земли, свеча — свечи.',
        'лесной — лес, ходить — ход, пятно — пятна.'], ['Совет', 'Проговаривай проверочное слово вслух: так слышно букву.', '#ffd76a']]
  ],
  check: { q: 'Как проверить безударную гласную в корне?', choices: ['подобрать слово с ударной гласной', 'посмотреть на соседнюю букву', 'запомнить на слух'], ans: 0,
    exp: 'Безударную гласную проверяют ударением: гора — горы.' },
  tasks: [
    { q: 'Какая буква в слове «в_да»?', kind: 'choice', choices: ['о', 'а'], ans: 0,
      hints: ['Подбери проверочное слово.', 'Воды — под ударением о.', 'Пишем вода.'], sol: 'о' },
    { q: 'Сколько ошибок: «лесной», «гора», «трова»?', kind: 'unit', ans: 1, tol: 0,
      hints: ['Проверь каждое слово.', 'Трава — травы.', 'Ошибка одна — «трова».'], sol: '1' }
  ]
});

/* ============ РАБОТА 614 · МЦКО, русский язык, 5 класс (образцы заданий) ============
   Задания и баллы — по официальному демотесту МЦКО (demo.mcko.ru, «Русский язык, 5 класс»):
   17 заданий, максимум 24 балла. МЦКО не выставляет отметку, а считает процент выполнения;
   отметка ниже — рекомендация для школы (85–100 % — «5», 65–84 % — «4», 45–64 % — «3»). */
window.RUKEXAM.buildMcko({
  id: 614, klass: '5 класс', title: 'МЦКО: русский язык, 5 класс (образцы заданий)', ico: '🎓',
  intro: [
    'Это тренировочная работа по образцам заданий МЦКО для 5 класса. Задания и баллы взяты из официального демотеста МЦКО: всего 17 заданий, максимум 24 балла.',
    'В настоящей работе МЦКО оценку не ставит: в отчёте указывают первичный балл и процент выполнения. Отметку школа может выставить по рекомендации: 85–100 % — «5», 65–84 % — «4», 45–64 % — «3», меньше 45 % — «2».',
    'В работе три вида заданий: выбрать один ответ, выбрать несколько и вписать слово. Баллы разные: за часть заданий дают 1 балл, за часть — 2 балла. За неполный ответ на задание с несколькими ответами начисляют половину баллов — как в настоящей работе.'
  ],
  introCards: [
    ['Что за работа', ['образцы заданий МЦКО, 5 класс', '17 заданий · максимум 24 балла',
        'как в настоящем демотесте МЦКО'], ['Как отвечать', 'Выбери вариант или впиши слово и нажми «Ответить».', '#7fd1ff']],
    ['Типы заданий', ['Один ответ — нажми нужный вариант.',
        'Несколько ответов — отметь все и нажми «Ответить».',
        'Впиши слово — набери ответ в поле.',
        'За неполный ответ — половина баллов, как в МЦКО.'], ['Важно', 'Ответ проверяется сразу: увидишь верный вариант и правило.', '#ffd76a']],
    ['Баллы и отметка', ['Задания 1, 2, 3, 5, 6, 7, 13, 14, 15, 17 — по 1 баллу.',
        'Задания 4, 8, 9, 10, 11, 12, 16 — по 2 балла.',
        'Итого 24 балла. Отметка — по проценту выполнения.'], ['Шкала', '85–100 % — «5», 65–84 % — «4», 45–64 % — «3».', '#8fd1a8']]
  ],
  items: [
    { kind:'radio', points:1, theme:'Система согласных звуков', icon:'schedule',
      q:'Какое слово содержит глухой твёрдый согласный звук?',
      material:'чаща · гора · сила · ложь',
      opts:['чаща','гора','сила','ложь'], correct:3, shown:'ложь',
      ask:'Выбери одно слово.', hint:'Всегда твёрдые звуки — [ж], [ш], [ц]; всегда мягкие — [ч’], [щ’], [й’].',
      sol:'В слове «ложь» есть [ш] — глухой твёрдый. В «чаще» [ч’] и [щ’] мягкие, в «силе» [с’] мягкий, в «горе» [г] звонкий.' },

    { kind:'radio', points:1, theme:'Ударение', icon:'rank',
      q:'Укажите слово, в котором верно выделен ударный гласный.',
      material:'звОнишь · тортЫ · красИвее · катАлог',
      opts:['звОнишь','тортЫ','красИвее','катАлог'], correct:2, shown:'красИвее',
      ask:'Проверь ударение в каждом слове.', hint:'Словари дают: звони́шь, то́рты, краси́вее, катало́г.',
      sol:'Верно выделено ударение в слове «краси́вее». Нормы: звони́шь, то́рты, краси́вее, катало́г. В демотесте МЦКО это задание было со словом «досуг»; здесь взяты слова с однозначной нормой.' },

    { kind:'radio', points:1, theme:'Морфемный анализ слова', icon:'frame',
      q:'Укажите слово, состоящее из приставки, корня, одного суффикса и окончания.',
      material:'верите · полосатый · поучение · построили',
      opts:['верите','полосатый','поучение','построили'], correct:2, shown:'поучение',
      ask:'Разбери каждое слово по составу.', hint:'Найди приставку, потом окончание: по-уч-ени-е.',
      sol:'Поучение: по- (приставка) + -уч- (корень) + -ени- (суффикс) + -е (окончание). В «верите» окончание -ите и суффикса нет, в «полосатом» нет приставки, в «построили» два суффикса.' },

    { kind:'multi', points:2, theme:'Грамматическое значение слова', icon:'person',
      q:'Укажите все верные характеристики выделенного слова.',
      material:'Роняет лес багряный свой убор. (выделено слово «Роняет»)',
      opts:['глагол','употреблено в прошедшем времени','употреблено в третьем лице','второго спряжения','мужского рода','употреблено в единственном числе'],
      correct:[0,2,5], shown:'глагол · третье лицо · единственное число',
      ask:'Отметь все верные характеристики.',
      hint:'Задай вопрос: лес (что делает?) роняет — какое это время и лицо?',
      sol:'«Роняет» — глагол настоящего времени, 3-го лица (он роняет), единственного числа. Спряжение первое (ронять), а рода у глаголов настоящего времени нет.' },

    { kind:'text', points:1, theme:'Корни с чередованием', icon:'field',
      q:'Найдите слово, в корне которого пропущена безударная чередующаяся гласная. Запиши это слово, вставив пропущенную букву.',
      material:'р..скошный · сл..жение (чисел) · объед..нить · насл..ждение',
      accept:['сложение'], shown:'сложение',
      ask:'Впиши слово целиком.',
      hint:'Чередующиеся корни: -лаг-/-лож-, -раст-/-ращ-/-рос-, -гар-/-гор-, -зар-/-зор-.',
      sol:'Чередующаяся гласная в корне -лож-: слОжение (сравни: слагать). Остальные слова проверяются ударением: роскОшный, объедИнить, наслАждение.' },

    { kind:'text', points:1, theme:'Приставки на з/с', icon:'shield',
      q:'Найдите слово, написание пропущенной буквы в котором зависит от глухости-звонкости последующего согласного. Запиши это слово.',
      material:'само..вал · ..бить (с ног) · не..доровый · бе..вкусный',
      accept:['безвкусный'], shown:'безвкусный',
      ask:'Впиши слово целиком.',
      hint:'Приставки без-/бес-, из-/ис-, раз-/рас- пишутся по следующему звуку.',
      sol:'В приставке без-/бес- перед звонкой [в] пишем з: безвкусный. В «сбить» приставка с- всегда с, в «самосвале» и «нездоровом» эта орфограмма не та.' },

    { kind:'radio', points:1, theme:'Безударные окончания существительных', icon:'tree',
      q:'Укажите строчку, в которой на местах пропусков везде пишется буква И.',
      opts:['спать в постел.., с горюч..м веществом, курица кудахч..т','участвовать в революци.., с искренн..ми намерениями, он леч..т','в гостях у Ксени.., у осенн..й непогоды, увид..шь горы','забота о юной Юли.., с летн..ми дождями, бор..мся с врагами'],
      correct:1, shown:'участвовать в революциИ, с искреннИми намерениями, он лечИт',
      ask:'Проверь каждый пропуск в строчке.',
      hint:'Существительные на -ия в предложном падеже — с И; лечит — II спряжение.',
      sol:'Революции (на -ия, П.п.), искренними (какими? -ими), лечит (II спр.) — везде И. В других строках есть Е или Ь.' },

    { kind:'multi', points:2, theme:'ы/и после ц', icon:'stamps',
      q:'Выберите слова, в которых на месте пропуска пишется буква Ы.',
      opts:['вакц..на','организац..я','выц..ганить','спец..фический','сестриц..н'],
      correct:[2,4], shown:'выцыганить, сестрицын',
      ask:'Отметь все подходящие слова.', hint:'Ы после ц — в исключениях и в суффиксах; в словах на -ция пишем И.',
      sol:'Ы пишем в корнях-исключениях (выцыганить — как цыган, цыплёнок) и в суффиксах (сестрицын). В словах на -ция — И: вакцина, организация, специфический.' },

    { kind:'multi', points:2, theme:'ь после шипящих', icon:'doors',
      q:'Выберите слова, в которых на месте пропуска пишется буква Ь.',
      opts:['нет галош..','чувствовать фальш..','огурец свеж..','смеёш..ся','острый меч..'],
      correct:[1,3], shown:'фальшь, смеёшься',
      ask:'Отметь все подходящие слова.',
      hint:'Ь — у существительных женского рода и в глаголах 2-го лица.',
      sol:'Фальшь — существительное женского рода, смеёшься — глагол 2-го лица: пишем ь. Галош (мн. ч., Р.п.), свеж (краткое прилагательное), меч (м.р.) — без ь.' },

    { kind:'multi', points:2, theme:'ё/о после шипящих', icon:'candle',
      q:'Выберите слова, в которых на месте пропуска пишется буква О.',
      opts:['переш..птываться','ш..фёр','ш..рох','ч..рный','деш..вый'],
      correct:[1,2], shown:'шофёр, шорох',
      ask:'Отметь все подходящие слова.',
      hint:'Ё пишем, если есть проверка (шёпот, чернеть, дешевле); О — только в словах-исключениях.',
      sol:'В корне после шипящих под ударением пишем Ё, если есть проверочное слово: перешёптываться (шёпот), чёрный (чернеть), дешёвый (дешевле). О — в словах-исключениях: шофёр, шорох, шов, крыжовник, капюшон.' },

    { kind:'text', points:2, theme:'Простые и сложные предложения', icon:'drop',
      q:'Прочитайте текст (запятые не расставлены). Укажите номера сложных предложений.',
      material:'(1) Ночь уже стоит над озером и смотрит в его тёмную воду. (2) Бесшумно летают и как будто заглядывают в лицо летучие мыши. (3) Листва берёз висит неподвижно и роса стекает по белым стволам. (4) Я слышу как где-то очень далеко хрипло кричит старый петух в избе лесника.',
      accept:['3,4','3 4','34','3 и 4'], shown:'3, 4',
      ask:'Впиши номера через запятую.',
      hint:'Посчитай грамматические основы: сколько основ, столько частей.',
      sol:'В (3) две основы: листва висит и роса стекает. В (4) тоже две: я слышу и петух кричит. В (1) и (2) — простые предложения с однородными сказуемыми.' },

    { kind:'multi', points:2, theme:'Тире между подлежащим и сказуемым', icon:'coins',
      q:'Укажите два предложения с ошибкой в постановке знаков препинания.',
      opts:['Листья устилают воду так густо, что чёлн шуршит по ним, и оставляет за собой чёрную дорогу.','В Урженском озере вода фиолетовая.','Прорва — глубокая река с крутыми берегами.','«Какая книга К.Г. Паустовского тебе понравилась?» — поинтересовалась библиотекарь.','Какие книги, ты, прочитал летом?'],
      correct:[0,4], shown:'первое и пятое предложения',
      ask:'Отметь ровно два предложения с ошибкой.',
      hint:'Проверь однородные сказуемые и обращение.',
      sol:'В первом лишняя запятая перед «и»: шуршит и оставляет — однородные сказуемые. В пятом лишние запятые: «ты» — не обращение.' },

    { kind:'radio', points:1, theme:'Типы речи', icon:'mountain',
      q:'Определите тип речи, использованный в предложениях 4–5.',
      material:'(1) Когда в солнечное утро летом войдёшь в лес, то в мокрой траве видны алмазы. (2) Они блестят и переливаются на солнце разными цветами. (3) Когда разглядишь, что это такое, то увидишь, что это капли росы собрались в треугольных листах травы и блестят на солнце. (4) Листок этой травы внутри пушист. (5) Капли весело катаются по нежному листку и не мочат его. (6) Бывало, сорвёшь такую чашечку, потихоньку поднесёшь ко рту и выпьешь росинку, и росинка эта вкуснее всякого напитка кажется. (По Л.Н. Толстому)',
      opts:['повествование','описание с элементами повествования','рассуждение','повествование с элементами рассуждения'],
      correct:1, shown:'описание с элементами повествования',
      ask:'Выбери один вариант.', hint:'Есть ли здесь события или только признаки предмета?',
      sol:'Предложения описывают листок и капли, но есть и действие (катаются), поэтому это описание с элементами повествования.' },

    { kind:'radio', points:1, theme:'Тема и главная мысль', icon:'orange',
      q:'Какой заголовок наиболее точно отражает основную мысль текста?',
      material:'(1) Когда в солнечное утро летом войдёшь в лес, то в мокрой траве видны алмазы. (2) Они блестят и переливаются на солнце разными цветами. (3) Когда разглядишь, что это такое, то увидишь, что это капли росы собрались в треугольных листах травы и блестят на солнце. (4) Листок этой травы внутри пушист. (5) Капли весело катаются по нежному листку и не мочат его. (6) Бывало, сорвёшь такую чашечку, потихоньку поднесёшь ко рту и выпьешь росинку, и росинка эта вкуснее всякого напитка кажется. (По Л.Н. Толстому)',
      opts:['В лесу','Вкусные лесные алмазы','Летние развлечения','Необыкновенное утро'],
      correct:1, shown:'Вкусные лесные алмазы',
      ask:'Выбери один вариант.', hint:'О чём автор говорит в конце текста?',
      sol:'Главная мысль — о росинке, которая вкуснее всякого напитка, поэтому точнее всего «Вкусные лесные алмазы».' },

    { kind:'text', points:1, theme:'Синонимы и антонимы', icon:'basket',
      q:'Среди предложений 1–5 найдите антоним к слову «сухой» и выпишите его.',
      material:'(1) Когда в солнечное утро летом войдёшь в лес, то в мокрой траве видны алмазы. (2) Они блестят и переливаются на солнце разными цветами. (3) Когда разглядишь, что это такое, то увидишь, что это капли росы собрались в треугольных листах травы и блестят на солнце. (4) Листок этой травы внутри пушист. (5) Капли весело катаются по нежному листку и не мочат его. (6) Бывало, сорвёшь такую чашечку, потихоньку поднесёшь ко рту и выпьешь росинку, и росинка эта вкуснее всякого напитка кажется. (По Л.Н. Толстому)',
      accept:['мокрой','мокрый','в мокрой'], shown:'мокрой',
      ask:'Впиши одно слово.', hint:'Сухой — … ?',
      sol:'Антоним к слову «сухой» — «мокрый». В тексте: «в мокрой траве».' },

    { kind:'multi', points:2, theme:'Прямое и переносное значения слов', icon:'ornament',
      q:'В каких фрагментах текста использован эпитет?',
      opts:['в мокрой траве','весело катаются','в треугольных листах','по нежному листку','солнечное утро'],
      correct:[1,3], shown:'весело катаются · по нежному листку',
      ask:'Отметь все фрагменты с эпитетом.',
      hint:'Эпитет — образное, необычное слово; он рисует предмет или действие и бывает не только определением.',
      sol:'В этой работе МЦКО эпитетами признаны «весело катаются» (образное наречие) и «по нежному листку» (образное определение). «В мокрой траве» и «в треугольных листах» — обычные определения, они называют признак прямо.' },

    { kind:'text', points:1, theme:'Главные члены предложения', icon:'steps',
      q:'Из предложения 4 выпишите грамматическую основу.',
      material:'(4) Листок этой травы внутри пушист.',
      accept:['листок пушист','листок пушист.'], shown:'листок пушист',
      ask:'Впиши подлежащее и сказуемое.',
      hint:'Кто? — листок. Что о нём сказано? — пушист.',
      sol:'Подлежащее — листок, сказуемое — пушист (краткое прилагательное). Основа: «листок пушист».' }
  ],
  tail: [
    'Посмотри результат: первичный балл, процент выполнения и отметку по рекомендации. Так же выглядит отчёт настоящей работы МЦКО — там указывают балл и процент, а не отметку.',
    'Разбери темы, где потеряны баллы: это и есть план повторения. Начни с правил, которые встретились в заданиях с ошибками.'
  ],
  tailCards: [
    ['Что дальше', ['Разбери каждое задание с ошибкой: какое правило проверялось?',
        'Повтори правило по уроку с этим материалом.',
        'Пройди работу снова через день — балл должен вырасти.'], ['Как тренироваться', 'Сначала правила, потом задания на время.', '#8fd1a8']],
    ['Темы работы', ['Звуки и ударение · морфемный и морфологический разбор.',
        'Орфография: корни, приставки, окончания, ы/и, ь, ё/о.',
        'Синтаксис и пунктуация · типы речи · лексика.'], ['Совет', 'В МЦКО теряют баллы на невнимательности — читай задание до конца.', '#ffd76a']]
  ],
  check: { q: 'Сколько баллов максимум в работе МЦКО по русскому языку в 5 классе (по демотесту)?', choices: ['24', '17', '12'], ans: 0,
    exp: 'В демотесте МЦКО 17 заданий, максимум 24 первичных балла.' },
  tasks: [
    { q: 'Сколько заданий в демотесте МЦКО по русскому языку для 5 класса?', kind: 'unit', ans: 17, tol: 0,
      hints: ['Это число равно количеству кадров-заданий в работе.', 'Посчитай задания в работе МЦКО.', 'Их 17.'], sol: '17' },
    { q: 'Какой процент выполнения даёт отметку «5» по рекомендации?', kind: 'choice', choices: ['85–100 %', '65–84 %', '45–64 %'], ans: 0,
      hints: ['Смотри шкалу в начале работы.', 'Самый высокий диапазон — от 85 %.', 'Верно: 85–100 %.'], sol: '85–100 %' }
  ]
});

/* ================= RUTRAIN: живой тренажёр с вставкой буквы в слово =================
   Слово рисуется плитками, пропуск пульсирует. Когда ребёнок выбирает букву,
   она физически влетает из кнопки в пропуск (FLIP-анимация), плитка вспыхивает
   зелёным и слово читается целиком; при ошибке плитка краснеет и вздрагивает. */
window.RUTRAIN = (function(){
  const CSS = `
  #lvis .rt-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:14px}
  #lvis .rt-title{font:600 20px/1.2 Georgia,serif;color:#ffd76a;letter-spacing:.02em}
  #lvis .rt-tip{color:#cbb89a;font-size:14.5px}
  #lvis .rt-word{display:flex;gap:7px;justify-content:center;flex-wrap:wrap;padding:6px 2px}
  #lvis .rt-cell{min-width:44px;height:60px;padding:0 8px;border-radius:14px;display:flex;align-items:center;justify-content:center;
    font:600 30px/1 Georgia,serif;color:#f1e8d6;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03));
    border:1.5px solid rgba(255,215,106,.28);box-shadow:0 6px 18px rgba(0,0,0,.35);
    animation:rtRise .46s cubic-bezier(.22,.9,.24,1) both}
  #lvis .rt-cell.rt-gap{border-style:dashed;border-color:rgba(255,215,106,.75);color:transparent;
    animation:rtPulse 1.7s ease-in-out infinite}
  #lvis .rt-cell.rt-ok{border-color:#8fd1a8;background:linear-gradient(180deg,rgba(143,209,168,.28),rgba(143,209,168,.10));color:#eafff2;
    animation:rtPop .6s cubic-bezier(.2,1.5,.3,1) both, rtGlow 1.4s ease-out .3s}
  #lvis .rt-cell.rt-no{border-color:#e86a5a;background:linear-gradient(180deg,rgba(232,106,90,.26),rgba(232,106,90,.08));color:#ffe6e2;
    animation:rtShake .55s cubic-bezier(.36,.07,.19,.97) both}
  #lvis .rt-verdict{font-size:15px;color:#e8dcc8;text-align:center;min-height:22px;animation:rtFade .45s both}
  #lvis .rt-score{font-size:14px;color:#cbb89a}
  #lvis .rt-btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%}
  #lvis .rt-btn{flex:1 1 auto;min-width:86px;font:600 19px/1 Georgia,serif!important;padding:16px 14px!important;border-radius:16px!important;
    transition:transform .18s cubic-bezier(.2,1.3,.3,1), box-shadow .2s}
  #lvis .rt-btn:hover{transform:translateY(-2px) scale(1.02)}
  #lvis .rt-btn:active{transform:scale(.94)}
  .rt-fly{position:fixed;z-index:300;pointer-events:none;display:flex;align-items:center;justify-content:center;
    font:600 30px/1 Georgia,serif;color:#ffe9a8;text-shadow:0 0 18px rgba(255,215,106,.9);
    transition:transform .5s cubic-bezier(.2,.85,.2,1), opacity .5s ease-out}
  @keyframes rtRise{from{opacity:0;transform:translateY(16px) scale(.9)}to{opacity:1;transform:none}}
  @keyframes rtFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @keyframes rtPulse{0%,100%{box-shadow:0 6px 18px rgba(0,0,0,.35),0 0 0 0 rgba(255,215,106,.32)}50%{box-shadow:0 6px 18px rgba(0,0,0,.35),0 0 0 9px rgba(255,215,106,0)}}
  @keyframes rtPop{0%{transform:scale(.55) rotate(-8deg)}60%{transform:scale(1.18) rotate(2deg)}100%{transform:scale(1) rotate(0)}}
  @keyframes rtGlow{0%{box-shadow:0 0 0 0 rgba(143,209,168,.75)}100%{box-shadow:0 0 0 16px rgba(143,209,168,0)}}
  @keyframes rtShake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-7px)}40%,60%{transform:translateX(7px)}}
  `;
  function css(){ try{ const st=document.getElementById('rt-style'); if(!st){ const e=document.createElement('style'); e.id='rt-style'; document.head.appendChild(e); e.textContent=CSS; } }catch(e){} }
  const B=[['н','сущ.'],['п','прил.'],['г','глагол']];
  window.RUTRAIN_DATA = {
    601:{title:'Кто это слово?', tip:'определи часть речи', buttons:[['н','сущ.'],['п','прил.'],['г','глагол']],
      items:[['снег','н','существительное'],['пушистый','п','прилагательное'],['летит','г','глагол'],['дорога','н','существительное'],['весёлый','п','прилагательное'],['рисует','г','глагол'],['радость','н','существительное'],['зимний','п','прилагательное'],['светит','г','глагол']]},
    602:{title:'Что спрятано в слове?', tip:'приставка, суффикс или окончание', buttons:[['приставка','приставка'],['суффикс','суффикс'],['окончание','окончание']],
      items:[['приехать','приставка','приставка при-'],['лесник','суффикс','суффикс -ник'],['леса','окончание','окончание -а'],['переход','приставка','приставка пере-'],['домик','суффикс','суффикс -ик'],['книгу','окончание','окончание -у']]},
    603:{title:'Вставь букву', tip:'подбери проверочное слово', buttons:[['о','о'],['е','е'],['и','и']],
      items:[['м_лодой','о','мОлодость'],['л_сной','е','лЕс'],['г_ра','о','гОры'],['п_сьмо','и','пИсьма'],['з_мля','е','зЕмли'],['х_лодный','о','хОлод']]},
    604:{title:'Вставь букву', tip:'проверь согласную', buttons:[['г','г'],['з','з'],['б','б'],['ж','ж']],
      items:[['сне_','г','снега'],['гла_','з','глаза'],['ло_ка','ж','ложечка'],['моро_','з','морозы'],['зу_','б','зубы'],['кни_ка','ж','книжечка']]},
    605:{title:'Слитно или раздельно?', tip:'можно ли вставить слово между', buttons:[['слитно','слитно'],['раздельно','раздельно']],
      items:[['(за)шёл','слитно','зашёл — приставка'],['(на)столе','раздельно','на столе — предлог'],['(под)ъезд','слитно','подъезд — приставка'],['(в)лесу','раздельно','в лесу — предлог'],['(от)нёс','слитно','отнёс — приставка'],['(за)домом','раздельно','за домом — предлог']]},
    606:{title:'Определи род', tip:'подставь он, она или оно', buttons:[['он','он'],['она','она'],['оно','оно']],
      items:[['ночь','она','женский род'],['стол','он','мужской род'],['окно','оно','средний род'],['мышь','она','женский род'],['ключ','он','мужской род'],['поле','оно','средний род']]},
    607:{title:'Определи падеж', tip:'задай вопрос от соседнего слова', buttons:[['и','Именительный'],['р','Родительный'],['д','Дательный'],['в','Винительный'],['т','Творительный'],['п','Предложный']],
      items:[['читаю книгу: «книгу»','в','винительный'],['нет книги: «книги»','р','родительный'],['дать другу: «другу»','д','дательный'],['рисую карандашом: «карандашом»','т','творительный'],['думаю о книге: «книге»','п','предложный'],['ученик читает: «ученик»','и','именительный']]},
    608:{title:'Определи время глагола', tip:'вчера — сейчас — завтра', buttons:[['прош','прош.'],['наст','наст.'],['буд','буд.']],
      items:[['читает','наст','настоящее время'],['читал','прош','прошедшее время'],['прочитает','буд','будущее время'],['будет читать','буд','будущее сложное'],['читали','прош','прошедшее время'],['читаю','наст','настоящее время']]},
    609:{title:'Как писать?', tip:'ь переходит из вопроса в слово', buttons:[['тся','-тся'],['ться','-ться']],
      items:[['Он учит?ся','тся','что делает? — без ь'],['Надо учит?ся','ться','что делать? — с ь'],['Ему не хоч?тся спать','тся','что делает? — без ь'],['Она улыбает?ся','тся','что делает? — без ь'],['Хочу учит?ся','ться','что делать? — с ь'],['Дети улыбают?ся','тся','что делают? — без ь']]},
    610:{title:'Где нужна запятая?', tip:'посчитай основы и однородные члены', buttons:[['нет','запятые не нужны'],['одна','одна запятая'],['две','две запятые'],['зап','перечисление'],['перед а','перед «а»'],['слож','две основы']],
      items:[['яблони груши сливы','зап','нужны запятые между однородными'],['яблони и груши','нет','одиночный союз и — без запятой'],['Маша помоги мне','одна','обращение в начале — одна запятая'],['Светит солнце и поют птицы','слож','две основы — запятая перед и'],['не груши а сливы','перед а','союз а — запятая'],['Спасибо Маша за помощь','две','обращение в середине — две запятые']]}
  };
  function st(lk){ if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }
  function fly(from, to, ch){
    try{
      const s=document.createElement('span'); s.className='rt-fly'; s.textContent=ch;
      const w=Math.max(28,from.width), h=Math.max(28,from.height);
      s.style.width=w+'px'; s.style.height=h+'px';
      s.style.left=from.left+'px'; s.style.top=from.top+'px'; s.style.fontSize=Math.round(from.height*0.42)+'px';
      document.body.appendChild(s);
      const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
      requestAnimationFrame(()=>{ s.style.transform='translate('+dx+'px,'+dy+'px) scale(1.15)'; s.style.opacity='0.15'; });
      setTimeout(()=>{ try{ s.remove(); }catch(e){} }, 520);
    }catch(e){}
  }
  function render(el, id){
    css();
    const cfg=window.RUTRAIN_DATA[id]; if(!cfg) return;
    const lk=lidKey(LV.id), s=st(lk);
    if(s.gIdx==null) s.gIdx=0;
    if(s.gRes===undefined) s.gRes=null;
    const item=cfg.items[s.gIdx%cfg.items.length];
    const word=item[0], correct=item[1], hint=item[2];
    const picked=s.gRes;
    const ok = picked===correct;
    const cells=[...word].map((ch,i)=>{
      const isGap=(ch==='_'||ch==='?');
      const cls = isGap ? (picked==null?'rt-cell rt-gap':(ok?'rt-cell rt-ok':'rt-cell rt-no')) : 'rt-cell';
      const shown = isGap ? (picked==null?'':picked) : ch;
      return `<span class="${cls}" style="animation-delay:${(i*0.045).toFixed(2)}s" ${isGap?'id="rtGap"':''}>${shown}</span>`;
    }).join('');
    const verdict = picked==null ? '' :
      (ok ? `✅ верно: ${hint}` : `❌ не так · правильно «${correct}» — ${hint}`);
    el.innerHTML = `<div class="wv"><div class="wv-col"><div class="rt-wrap">
      <div class="rt-title">${cfg.title}</div>
      <div class="rt-word">${cells}</div>
      <div class="rt-verdict">${verdict || cfg.tip}</div>
      <div class="rt-score">верно: ${s.gOk||0} · ошибок: ${s.gBad||0} · всего: ${cfg.items.length}</div>
      <div class="rt-btns">${cfg.buttons.map(b=>`<button type="button" class="btn rt-btn" data-key="${b[0]}" onclick="rtPick(${id},'${b[0]}')">${b[1]}</button>`).join('')}</div>
      <div class="rt-tip">${picked==null?'выбери вариант':'нажми любую кнопку — следующее слово'}</div>
    </div></div></div>`;
  }
  window.rtPick=function(id,key){
    try{
      const cfg=window.RUTRAIN_DATA[id]; const lk=lidKey(LV.id), s=st(lk);
      if(s.gRes!=null){ s.gIdx=(s.gIdx||0)+1; s.gRes=null; chRender(0); return; }
      const btn=document.querySelector('#lvis button[data-key="'+key+'"]');
      const gap=document.getElementById('rtGap');
      const from=btn?btn.getBoundingClientRect():null, to=gap?gap.getBoundingClientRect():null;
      s.gRes=key;
      const correct=cfg.items[(s.gIdx||0)%cfg.items.length][1];
      if(key===correct) s.gOk=(s.gOk||0)+1; else s.gBad=(s.gBad||0)+1;
      chRender(0);
      if(from&&to) fly(from,to,correct);
    }catch(e){}
  };
  /* подменяем кадр тренажёра во всех уроках русского */
  /* RUTRAIN больше не подключается к урокам: буквы теперь рисует RULETTER (см. ниже) */
  return {render:render, data:window.RUTRAIN_DATA};
})();

/* ================= СВОИ ИНТЕРАКТИВЫ ПО ТЕМАМ (без общего шаблона) =================
   601 — сортировка: слово летит в свой ящик (существительное / прилагательное / глагол)
   610 — запятые: ребёнок ставит их между словами, знак встаёт на место и остаётся */
window.RUTHEME = (function(){
  const CSS = `
  #lvis .th-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:14px}
  #lvis .th-title{font:600 20px/1.2 Georgia,serif;color:#ffd76a}
  #lvis .th-tip{color:#d8c9a6;font-size:16px}
  #lvis .th-score{font-size:16px;color:#d8c9a6;font-variant-numeric:tabular-nums}
  #lvis .th-verdict{font-size:16px;line-height:1.55;color:#f6efe0;text-align:center;min-height:24px}
  /* 601: сортировка по ящикам */
  #lvis .th-word{font:600 40px/1 Georgia,serif;color:#f6efe0;padding:16px 26px;border-radius:20px;
    background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.03));border:1.5px solid rgba(255,215,106,.35);
    box-shadow:0 10px 30px rgba(0,0,0,.45);animation:thDrop .5s cubic-bezier(.2,1.2,.3,1) both}
  @keyframes thDrop{0%{opacity:0;transform:translateY(-26px) scale(.9)}100%{opacity:1;transform:none}}
  @keyframes thInto{0%{transform:translate(var(--dx),var(--dy)) scale(1)}60%{transform:translate(calc(var(--dx)*.55),calc(var(--dy)*.6)) scale(.72)}100%{transform:translate(var(--dx),var(--dy)) scale(.1);opacity:0}}
  @keyframes thBounce{0%{transform:translateY(0)}35%{transform:translateY(-10px)}70%{transform:translateY(3px)}100%{transform:translateY(0)}}
  #lvis .th-crates{display:flex;gap:10px;width:100%;justify-content:center;flex-wrap:wrap}
  #lvis .th-crate{flex:1 1 30%;min-width:96px;padding:14px 8px 12px;border-radius:18px;border:1.6px solid rgba(255,215,106,.35);
    background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02));display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;
    transition:transform .18s cubic-bezier(.2,1.3,.3,1), box-shadow .2s, border-color .2s}
  #lvis .th-crate:hover{transform:translateY(-3px)}
  #lvis .th-crate.hit{animation:thBounce .6s ease-out;border-color:#8fd1a8;box-shadow:0 0 0 4px rgba(143,209,168,.18)}
  #lvis .th-crate.miss{border-color:#e86a5a;animation:rtShake .5s}
  #lvis .th-crate .th-ico{font-size:26px;line-height:1}
  #lvis .th-crate .th-nm{font:600 17px/1.2 Georgia,serif;color:#ffe9a8;text-align:center;padding:0 4px;white-space:nowrap;overflow-wrap:normal}
  #lvis .th-crate .th-ex{font-size:16px;color:#e0d3b4}
  #lvis .th-fly{position:fixed;z-index:320;pointer-events:none;font:600 34px/1 Georgia,serif;color:#ffe9a8;
    text-shadow:0 0 20px rgba(255,215,106,.85);transition:transform 260ms cubic-bezier(.23,1,.32,1), opacity 260ms ease-out}
  /* 610: запятые в предложении */
  #lvis .th-sent{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:0;width:100%;
    background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(255,215,106,.25);border-radius:18px;padding:16px 12px}
  #lvis .th-w{font:600 19px/1.5 Georgia,serif;color:#f6efe0;padding:2px 1px}
  #lvis .th-slot{position:relative;width:22px;height:34px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
  #lvis .th-slot::after{content:'';position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:14px;height:2px;border-radius:2px;background:rgba(255,215,106,.25)}
  #lvis .th-slot.on::after{background:transparent}
  #lvis .th-comma{font:700 30px/1 Georgia,serif;color:#ffd76a;opacity:0;transform:translateY(-18px) scale(.4)}
  #lvis .th-slot.on .th-comma{animation:thComma .55s cubic-bezier(.2,1.6,.3,1) both, thCommaGlow 1.2s ease-out .4s}
  @keyframes thComma{0%{opacity:0;transform:translateY(-18px) scale(.4)}100%{opacity:1;transform:none}}
  @keyframes thCommaGlow{0%{text-shadow:0 0 0 rgba(255,215,106,.9)}100%{text-shadow:0 0 18px rgba(255,215,106,0)}}
  #lvis .th-slot.bad .th-comma{color:#e86a5a;animation:rtShake .5s}
  #lvis .th-btn{font:600 17px/1 Georgia,serif!important;padding:15px 18px!important;border-radius:16px!important}
  @media (prefers-reduced-motion: reduce){
    #lvis .th-word,#lvis .th-crate,#lvis .th-comma,#lvis .th-cell{animation:none!important}
    .th-fly{display:none!important}
  }
  `;
  function css(){ try{ if(!document.getElementById('th-style')){ const e=document.createElement('style'); e.id='th-style'; e.textContent=CSS; document.head.appendChild(e); } }catch(e){} }
  function st(lk){ if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }

  /* ---------- 601: сортировка по ящикам ---------- */
  const CRATES=[['н','🧱','сущ.','существительное','кто? что?'],['п','🎨','прил.','прилагательное','какой?'],['г','⚡','глагол','глагол','что делает?']];
  const W601=[['снег','н'],['пушистый','п'],['летит','г'],['дорога','н'],['весёлый','п'],['рисует','г'],['радость','н'],['зимний','п'],['светит','г']];
  function render601(el){
    css(); const lk=lidKey(601), s=st(lk); if(s.gIdx==null) s.gIdx=0; if(s.gRes===undefined) s.gRes=null;
    const i=s.gIdx%W601.length, pair=W601[i], word=pair[0], key=pair[1], picked=s.gRes;
    const crates=CRATES.map(c=>{
      const cls='th-crate'+(picked==null?'':(picked===c[0]?(c[0]===key?' hit':' miss'):''));
      return `<div class="${cls}" data-crate="${c[0]}" onclick="thSort('${c[0]}')">
        <span class="th-ico">${c[1]}</span><span class="th-nm">${c[2]}</span><span class="th-ex">${c[4]}</span></div>`;
    }).join('');
    const full = CRATES.filter(c=>c[0]===key)[0][3];
    const verdict = picked==null ? '' : (picked===key ? '✅ верно: '+word+' — '+full : '❌ '+word+' — это '+full);
    el.innerHTML=`<div class="th-wrap">
      <div class="th-title">Разложи слова по ящикам</div>
      <div class="th-word" id="thWord">${word}</div>
      <div class="th-verdict">${verdict||'выбери ящик для слова'}</div>
      <div class="th-crates">${crates}</div>
      <div class="th-score">верно: ${s.gOk||0} · ошибок: ${s.gBad||0} · всего: ${W601.length}</div>
      <div class="th-tip">${picked==null?'нажми ящик':'нажми любой ящик — следующее слово'}</div></div>`;
  }
  window.thSort=function(key){
    try{
      const lk=lidKey(601), s=st(lk);
      if(s.gRes!=null){ s.gIdx=(s.gIdx||0)+1; s.gRes=null; chRender(0); return; }
      const i=(s.gIdx||0)%W601.length, correct=W601[i][1];
      const card=document.getElementById('thWord'), crate=document.querySelector('#lvis .th-crate[data-crate="'+key+'"]');
      const from=card?card.getBoundingClientRect():null, to=crate?crate.getBoundingClientRect():null;
      s.gRes=key; if(key===correct) s.gOk=(s.gOk||0)+1; else s.gBad=(s.gBad||0)+1;
      chRender(0);
      if(from&&to){
        const f=document.createElement('span'); f.className='th-fly'; f.textContent=W601[i][0];
        f.style.left=from.left+'px'; f.style.top=from.top+'px'; document.body.appendChild(f);
        const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
        requestAnimationFrame(()=>{ f.style.transform='translate('+dx+'px,'+dy+'px)'; f.style.opacity='0.05'; });
        setTimeout(()=>{ try{ f.remove(); }catch(e){} }, 700);
      }
    }catch(e){}
  };

  /* ---------- 610: запятые в предложении ---------- */
  const S610=[['яблони|груши|сливы',[1,2]],['яблони|и|груши',[]],['Маша|помоги|мне',[1]],
              ['Светит|солнце|и|поют|птицы',[3]],['не|груши|а|сливы',[2]],['Спасибо|Маша|за|помощь',[1,2]]];
  const OK610=['между однородными ставятся запятые','одиночный союз «и» — запятая не нужна','обращение в начале — одна запятая',
               'две основы — запятая перед «и»','союз «а» — запятая','обращение в середине — две запятые'];
  function render610(el){
    css(); const lk=lidKey(610), s=st(lk); if(s.gIdx==null) s.gIdx=0; if(s.gSet===undefined) s.gSet=null;
    const i=s.gIdx%S610.length, words=S610[i][0].split('|'), need=S610[i][1], now=s.gSet, done=now!==null;
    let html='';
    words.forEach((w,k)=>{
      if(k>0){
        const isOn = done ? (need.indexOf(k)>=0) : now && now.indexOf(k)>=0;
        const bad = done && now.indexOf(k)>=0 && need.indexOf(k)<0;
        html+=`<span class="th-slot ${isOn?'on':''} ${bad?'bad':''}" onclick="${done?'':'thSlot('+k+')'}"><span class="th-comma">,</span></span>`;
      }
      html+=`<span class="th-w">${w}</span>`;
    });
    const verdict = !done ? '' : (s.gOk610 ? '✅ верно: '+OK610[i] : '❌ '+OK610[i]);
    el.innerHTML=`<div class="th-wrap">
      <div class="th-title">Поставь запятые</div>
      <div class="th-tip">нажимай на промежутки между словами</div>
      <div class="th-sent">${html}</div>
      <div class="th-verdict">${verdict||'отметь места для запятых'}</div>
      <div class="th-btns" style="display:flex;gap:10px">${done?`<button type="button" class="btn th-btn" onclick="thNext()">Дальше</button>`:`<button type="button" class="btn th-btn" onclick="thCheck()">Проверить</button>`}</div>
      <div class="th-score">верно: ${s.gOk610||0} · ошибок: ${s.gBad610||0} · всего: ${S610.length}</div>
      <div class="th-tip">${done?'нажми «Дальше»':'запятые встанут на места сразу'}</div></div>`;
  }
  window.thSlot=function(k){
    try{ const lk=lidKey(610), s=st(lk); s.gSet=s.gSet||[]; const p=s.gSet.indexOf(k); if(p>=0) s.gSet.splice(p,1); else s.gSet.push(k); chRender(0); }catch(e){}
  };
  window.thCheck=function(){
    try{ const lk=lidKey(610), s=st(lk); const i=(s.gIdx||0)%S610.length, need=S610[i][1];
      const got=(s.gSet||[]).slice().sort().join(','), right=need.slice().sort().join(',');
      if(got===right) s.gOk610=(s.gOk610||0)+1; else s.gBad610=(s.gBad610||0)+1;
      s.gRes=got; chRender(0);
    }catch(e){}
  };
  window.thNext=function(){
    try{ const lk=lidKey(610), s=st(lk); s.gIdx=(s.gIdx||0)+1; s.gSet=null; s.gRes=null; chRender(0); }catch(e){}
  };

  /* подменяем тренажёрный кадр: 601 — ящики, 610 — запятые; уроки-буквы остаются на RUTRAIN */
  if(window.WAVE_B){
    const wrap=(id, fn)=>{ const orig=window.WAVE_B[id]; if(typeof orig!=='function') return;
      window.WAVE_B[id]=function(el){ try{ if(((typeof LV!=='undefined'&&LV.step)||0)===8){ fn(el); return; } }catch(e){} return orig(el); }; };
    wrap(601, render601);   /* 610 включим, когда придёт его черёд — сейчас делаем по одному */
  }
  /* уроки, где вставка знака в слово — не их метафора, возвращаем прежний кадр (свои интерактивы будут следующими) */
  if(window.RUTRAIN && window.RUTRAIN.data){
    [602,606,607,608].forEach(id=>{ delete window.RUTRAIN.data[id]; });
  }
  window.RUTHEME_DATA={601:W601, 610:S610, ok610:OK610, crates:CRATES};
  return {render601:render601, render610:render610};
})();

/* ================= RULETTER: вставка буквы в слово, переписано с нуля =================
   Почему заново: прежний вариант масштабировал текст при анимации (transform: scale),
   из-за этого буква мылилась, а на планшете интерактив мог не отрисоваться вовсе.
   Здесь: буква создаётся сразу нужного кегля и анимируется ТОЛЬКО положением,
   у шрифта включены сглаживание и точная отрисовка, а если измерить позиции не удалось —
   буква всё равно встаёт в слово мгновенно, без анимации. */
window.RULETTER = (function(){
  const FONT = "Georgia,'Times New Roman',serif";
  const CSS = `
  #lvis .rl-wrap{width:100%;display:flex;flex-direction:column;align-items:center;gap:16px}
  #lvis .rl-title{font:600 24px/1.15 ${FONT};color:#ffd76a;letter-spacing:-.02em;text-wrap:balance;-webkit-font-smoothing:antialiased}
  #lvis .rl-word{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;padding:4px 2px}
  #lvis .rl-cell{min-width:52px;height:70px;padding:0 10px;display:flex;align-items:center;justify-content:center;
    font-family:${FONT};font-size:48px;line-height:1;font-weight:600;color:#f8f2e4;letter-spacing:-.02em;
    -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;
    background:linear-gradient(180deg,#20342a,#16241d);border:1.5px solid rgba(255,215,106,.30);border-radius:16px;
    box-shadow:0 8px 20px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06);
    animation:rlIn .42s cubic-bezier(.22,.9,.24,1) both}
  #lvis .rl-cell.rl-gap{border-style:dashed;border-color:rgba(255,215,106,.85);background:linear-gradient(180deg,#22352b,#16241d);
    animation:rlPulse 1.8s ease-in-out infinite}
  #lvis .rl-cell.rl-ok{border-color:#8fd1a8;background:linear-gradient(180deg,#244233,#182a21);box-shadow:0 8px 20px rgba(0,0,0,.45), inset 0 0 22px rgba(143,209,168,.28);
    animation:rlLand .5s cubic-bezier(.2,1.25,.3,1) both}
  #lvis .rl-cell.rl-no{border-color:#e86a5a;background:linear-gradient(180deg,#3a2422,#281815);box-shadow:0 8px 20px rgba(0,0,0,.45), inset 0 0 22px rgba(232,106,90,.26);
    animation:rlShake .5s cubic-bezier(.36,.07,.19,.97) both}
  @keyframes rlIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes rlLand{0%{opacity:.35}60%{opacity:1}100%{opacity:1}}
  @keyframes rlPulse{0%,100%{box-shadow:0 8px 20px rgba(0,0,0,.45),0 0 0 0 rgba(255,215,106,.30)}50%{box-shadow:0 8px 20px rgba(0,0,0,.45),0 0 0 10px rgba(255,215,106,0)}}
  @keyframes rlShake{10%,90%{transform:translateX(-2px)}20%,80%{transform:translateX(4px)}30%,50%,70%{transform:translateX(-6px)}40%,60%{transform:translateX(6px)}}
  #lvis .rl-hint{font-family:${FONT};font-size:16px;color:#e6dcc6;-webkit-font-smoothing:antialiased}
  #lvis .rl-score{font-family:${FONT};font-size:16px;color:#d8c9a6;font-variant-numeric:tabular-nums}
  #lvis .rl-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;width:100%}
  #lvis .rl-btn{min-width:78px;font-family:${FONT}!important;font-size:32px!important;font-weight:600!important;line-height:1!important;
    padding:14px 20px!important;border-radius:18px!important;-webkit-font-smoothing:antialiased;
    transition:transform .16s cubic-bezier(.2,1.3,.3,1), box-shadow .2s}
  #lvis .rl-btn:active{transform:translateY(2px) scale(.97)}
  @media (prefers-reduced-motion: reduce){
    #lvis .rl-cell,#lvis .rl-cell.rl-gap,#lvis .rl-cell.rl-ok,#lvis .rl-cell.rl-no{animation:none!important}
    .rl-fly{display:none!important}
  }
  .rl-fly{position:fixed;z-index:330;pointer-events:none;display:flex;align-items:center;justify-content:center;
    font-family:${FONT};font-weight:600;color:#ffe9a8;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision;
    will-change:transform;transition:transform 240ms cubic-bezier(.23,1,.32,1), opacity 240ms ease-out}
  `;
  function css(){ try{ let e=document.getElementById('rl-style'); if(!e){ e=document.createElement('style'); e.id='rl-style'; document.head.appendChild(e); } if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function S(lk){ if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }
  const L={603:[['м_лодой','о','мОлодость'],['л_сной','е','лЕс'],['г_ра','о','гОры'],['п_сьмо','и','пИсьма'],['з_мля','е','зЕмли'],['х_лодный','о','хОлод']],
           604:[['сне_','г','снега'],['гла_','з','глаза'],['ло_ка','ж','ложечка'],['моро_','з','морозы'],['зу_','б','зубы'],['кни_ка','ж','книжечка']]};
  const B={603:[['о','о'],['е','е'],['и','и']], 604:[['г','г'],['з','з'],['б','б'],['ж','ж']]};
  function draw(el,id){
    css(); const lk=lidKey(id), s=S(lk); if(s.gIdx==null||s.gIdx>=L[id].length*4) s.gIdx=0; if(s.gRes===undefined) s.gRes=null;
    const i=(s.gIdx||0)%L[id].length, it=L[id][i], word=it[0], right=it[1], hint=it[2], got=s.gRes, done=got!=null, ok=got===right;
    const cells=[...word].map((ch,k)=>{
      const gap=(ch==='_');
      const cls='rl-cell'+(gap?(done?(ok?' rl-ok':' rl-no'):' rl-gap'):'');
      const txt=gap?(done?got:''):ch;
      return `<div class="${cls}" ${gap?'id="rlGap"':''} style="animation-delay:${(k*0.04).toFixed(2)}s">${txt}</div>`;
    }).join('');
    const verdict = done ? (ok ? '✅ верно: '+hint : '❌ правильно «'+right+'» — '+hint) : 'найди проверочное слово и выбери букву';
    el.innerHTML=`<div class="rl-wrap">
      <div class="rl-title">Вставь букву</div>
      <div class="rl-word">${cells}</div>
      ${done ? (ok ? window.RUFEED.note('ok','верно',hint) : window.RUFEED.note('no','исправить','<b>'+right+'</b> — '+hint))
             : `<div class="rl-hint">${verdict}</div>`}
      <div class="rl-btns">${B[id].map(b=>`<button type="button" class="btn rl-btn" data-key="${b[0]}" onclick="rlPick(${id},'${b[0]}')">${b[1]}</button>`).join('')}</div>
      <div class="rl-score">верно: ${s.gOk||0} · ошибок: ${s.gBad||0} · всего: ${L[id].length}</div>
      <div class="rl-hint">${done?'нажми любую букву — следующее слово':'выбери букву'}</div></div>`;
  }
  window.rlPick=function(id,key){
    let from=null,to=null;
    try{
      const lk=lidKey(id), s=S(lk), i=(s.gIdx||0)%L[id].length, right=L[id][i][1];
      if(s.gRes!=null){ s.gIdx=(s.gIdx||0)+1; s.gRes=null; chRender(0); return; }
      const btn=document.querySelector('#lvis button[data-key="'+key+'"]');
      const gap=document.getElementById('rlGap');
      if(btn) from=btn.getBoundingClientRect();
      if(gap) to=gap.getBoundingClientRect();
      s.gRes=key; if(key===right) s.gOk=(s.gOk||0)+1; else s.gBad=(s.gBad||0)+1;
      chRender(0);                       /* буква встаёт в слово сразу — работает даже без анимации */
    }catch(e){}
    try{
      if(!from||!to) return;
      const c=document.createElement('div'); c.className='rl-fly'; c.textContent=key;
      c.style.fontSize=to.height*0.62+'px'; c.style.width=to.width+'px'; c.style.height=to.height+'px';
      c.style.left=from.left+'px'; c.style.top=from.top+'px'; document.body.appendChild(c);
      const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
      requestAnimationFrame(()=>{ c.style.transform='translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px)'; c.style.opacity='0'; });
      setTimeout(()=>{ try{ c.remove(); }catch(e){} }, 520);
    }catch(e){}
  };
  if(window.WAVE_B) Object.keys(L).forEach(id=>{
    const orig=window.WAVE_B[id]; if(typeof orig!=='function') return;
    window.WAVE_B[id]=function(el){ try{ if(((typeof LV!=='undefined'&&LV.step)||0)===8){ draw(el,id); return; } }catch(e){} return orig(el); };
  });
  return {draw:draw, data:L, buttons:B};
})();

/* ================= УРОК 601: своя вёрстка каждого кадра (без общего шаблона) =================
   Девять кадров — девять композиций: герой-вопрос, карточки-функции, сравнение до/после,
   две колонки, лента действия. Один кадр — 4–5 смысловых блоков, кегль по стандарту,
   шаг отступов 8 px, у каждого кадра своё маленькое действие. */
window.RU601 = (function(){
  const F="Georgia,'Times New Roman',serif";
  const CSS=`
  #lvis .r1{--g:#ffd76a;--gold:#ffd76a;--ink:#f6efe0;--mut:#d8c9a6;--line:rgba(255,215,106,.28);
    font-family:${F};color:var(--ink);width:100%;display:flex;flex-direction:column;gap:16px}
  #lvis .r1 h2{font-family:${F};font-size:24px;line-height:1.12;font-weight:600;color:var(--g);margin:0;letter-spacing:-.02em;text-wrap:balance}
  #lvis .r1 .lead{font-size:20px;line-height:1.5;color:var(--ink);margin:0;text-wrap:pretty}
  #lvis .r1 .cap{font-size:16px;line-height:1.5;color:var(--mut)}
  #lvis .r1 .row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
  #lvis .r1 .col{display:flex;flex-direction:column;gap:12px}
  #lvis .r1 .card{flex:1 1 30%;min-width:104px;padding:16px 14px;border-radius:18px;text-align:center;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line);box-shadow:0 10px 24px rgba(0,0,0,.38)}
  #lvis .r1 .card .ic{font-size:30px;line-height:1}
  #lvis .r1 .card .nm{font-size:16px;font-weight:600;color:var(--g);margin-top:8px}
  #lvis .r1 .card .ex{font-size:16px;line-height:1.25;color:var(--mut);margin-top:4px}
  #lvis .r1 .word{display:inline-flex;align-items:baseline;gap:10px;padding:14px 22px;border-radius:18px;
    background:linear-gradient(180deg,#24382d,#17261e);border:1.5px solid var(--line);box-shadow:0 12px 28px rgba(0,0,0,.42)}
  #lvis .r1 .word b{font-size:48px;font-weight:600;line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
  #lvis .r1 .word i{font-style:normal;font-size:16px;color:var(--mut)}
  #lvis .r1 .chips{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
  #lvis .r1 .chip{padding:14px 20px;border-radius:16px;border:1.5px solid var(--line);background:rgba(255,255,255,.05);
    font-size:24px;font-weight:600;line-height:1.2;color:var(--ink);cursor:pointer;transition:transform 140ms cubic-bezier(.23,1,.32,1),border-color 180ms ease-out,background 180ms ease-out}
  #lvis .r1 .chip:active{transform:translateY(2px)}
  #lvis .r1 .chip.on{border-color:var(--g);background:rgba(255,215,106,.12)}
  #lvis .r1 .chip.ok{border-color:#8fd1a8;background:rgba(143,209,168,.16)}
  #lvis .r1 .chip.no{border-color:#e86a5a;background:rgba(232,106,90,.14)}
  #lvis .r1 .tag{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;
    background:rgba(255,215,106,.12);border:1px solid var(--line);font-size:16px;color:var(--g)}
  #lvis .r1 .split{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}
  #lvis .r1 .arrow{font-size:26px;color:var(--g)}
  #lvis .r1 .verdict{font-size:16px;line-height:1.55}
  #lvis .r1 .verdict.ok{color:#b8e8cc}#lvis .r1 .verdict.no{color:#f3b3aa}
  #lvis .r1 .score{font-size:16px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .r1 .cta{width:100%;padding:17px 18px;border-radius:18px;border:1.5px solid #ffd76a;background:linear-gradient(180deg,#ffd76a,#e2b23f);
    color:#20180a;font-family:${F};font-size:20px;font-weight:600;line-height:1.2;cursor:pointer;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .r1 .cta:active{transform:translateY(2px)}
  @media (prefers-reduced-motion: reduce){#lvis .r1 *{animation:none!important;transition:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('r1-style'); if(!e){ e=document.createElement('style'); e.id='r1-style'; document.head.appendChild(e); } if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  /* третий элемент — ключ ящика (н/п/г), иначе слово не попадёт в свой ящик */
  const SC=[['снег','кто? что?','н'],['пушистый','какой?','п'],['летит','что делает?','г'],
            ['дорога','кто? что?','н'],['весёлый','какой?','п'],['рисует','что делает?','г'],
            ['радость','кто? что?','н'],['зимний','какой?','п'],['светит','что делает?','г']];
  const CRATES=[['н','🧱','сущ.','кто? что?'],['п','🎨','прил.','какой?'],['г','⚡','глагол','что делает?']];
  const PRED=[['Что называет имя существительное?','предмет','признак'],
              ['На какой вопрос отвечает прилагательное?','какой?','что делает?'],
              ['Что называет глагол?','действие','предмет'],
              ['«Тёплый» — это…','признак','предмет'],
              ['Местоимение…','указывает, а не называет','называет число'],
              ['«Пять» отвечает на вопрос…','сколько?','какой?'],
              ['«Быстро» отвечает на вопрос…','как?','кто?'],
              ['Предлог, союз, частица…','служат для связи','называют предмет']];
  function st(){ const lk=lidKey(601); if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }
  const S=(s,i)=>'r1 chip'+(s['a'+i]===1?' ok':'')+(s['a'+i]===0?' no':'');

  /* --- собственные композиции кадров --- */
  function hero(){
    return `<h2>Части речи: что называет слово</h2>
      <p class="lead">Каждое слово в речи — работник со своей должностью.<br>Должность и называется частью речи.</p>
      <div class="row">
        <div class="card"><div class="ic">🧱</div><div class="nm">предмет</div><div class="ex">кто? что?</div></div>
        <div class="card"><div class="ic">🎨</div><div class="nm">признак</div><div class="ex">какой?</div></div>
        <div class="card"><div class="ic">⚡</div><div class="nm">действие</div><div class="ex">что делает?</div></div>
      </div>
      <p class="cap">Вопрос к слову — самый быстрый способ узнать его должность.</p>`;
  }
  function noun(s){
    const on=(w,ok)=>{const c=s['w'+w]; return 'r1 chip'+(c===1?' ok':'')+(c===0?' no':'');};
    return `<h2>Имя существительное</h2>
      <p class="lead">Отвечает на вопросы <b style="color:#ffd76a">кто?</b> или <b style="color:#ffd76a">что?</b> и называет предмет.</p>
      <div class="chips">
        <span class="${on('кот',1)}" onclick="r601Pick('кот',1)">кот</span>
        <span class="${on('дом',1)}" onclick="r601Pick('дом',1)">дом</span>
        <span class="${on('смех',1)}" onclick="r601Pick('смех',1)">смех</span>
      </div>
      <div class="split"><span class="tag">кто? — живое</span><span class="tag">что? — остальное</span></div>
      <p class="verdict${s.wкот===0?' no':' ok'}">${s.wкот==null?'Нажми на слово — покажу вопрос к нему.':'Смех и бег тоже существительные: они отвечают на вопрос что?'}</p>`;
  }
  function adj(s){
    return `<h2>Имя прилагательное</h2>
      <p class="lead">Отвечает на вопрос <b style="color:#ffd76a">какой?</b> и всегда цепляется к существительному.</p>
      <div class="split">
        <span class="word"><b>рыжий</b><i>какой?</i></span><span class="arrow">→</span>
        <span class="word"><b>кот</b><i>кто?</i></span>
      </div>
      <div class="chips">
        <span class="r1 chip" onclick="r601More(this)">тёплая → вода</span>
        <span class="r1 chip" onclick="r601More(this)">деревянное → окно</span>
        <span class="r1 chip" onclick="r601More(this)">зимний → день</span>
      </div>
      <p class="cap">Нажми на пару — увидишь, что признак без предмета не живёт.</p>`;
  }
  function verb(s){
    const on=(w)=>{const c=s['v'+w]; return 'r1 chip'+(c===1?' ok':'');};
    return `<h2>Глагол</h2>
      <p class="lead">Отвечает на вопрос <b style="color:#ffd76a">что делает?</b> и называет действие или состояние.</p>
      <div class="chips">
        <span class="${on('бежит')}" onclick="r601Verb('бежит')">бежит</span>
        <span class="${on('светит')}" onclick="r601Verb('светит')">светит</span>
        <span class="${on('спит')}" onclick="r601Verb('спит')">спит</span>
      </div>
      <div class="split"><span class="tag">действие: бежит, светит</span><span class="tag">состояние: спит, радуется</span></div>
      <p class="score">${s.vN==null?'Нажми на глаголы — они отметятся.':'Отмечено глаголов: '+s.vN}</p>`;
  }
  function pron(s){
    return `<h2>Местоимение</h2>
      <p class="lead">Не называет, а <b style="color:#ffd76a">указывает</b>: я, ты, он, она, мы, вы, они.</p>
      <div class="col">
        <div class="split"><span class="word"><b>Маша</b><i>имя</i></span><span class="word"><b>читает</b></span></div>
        <div class="split"><span class="arrow">↓</span></div>
        <div class="split"><span class="word"><b>Она</b><i>указывает</i></span><span class="word"><b>читает</b></span></div>
      </div>
      <p class="verdict${s.p===1?' ok':' ok'}">${s.p==null?'Нажми кнопку — увидишь, зачем нужно местоимение.':'«Она читает» вместо «Маша читает»: короче и без повтора.'}</p>
      <button class="cta" onclick="r601Pron()">${s.p==null?'Показать, как короче':'Ещё раз'}</button>`;
  }
  function num(s){
    return `<h2>Имя числительное</h2>
      <p class="lead">Называет число или порядок при счёте.</p>
      <div class="row">
        <div class="card"><div class="nm">сколько?</div><div class="ex">пять, двое, сто</div></div>
        <div class="card"><div class="nm">который?</div><div class="ex">третий, пятый</div></div>
      </div>
      <div class="chips">
        <span class="r1 chip" onclick="r601Num(this)">пять</span>
        <span class="r1 chip" onclick="r601Num(this)">третий</span>
        <span class="r1 chip" onclick="r601Num(this)">сто</span>
      </div>
      <p class="cap">Нажми на числительное — покажу его вопрос.</p>`;
  }
  function adv(s){
    return `<h2>Наречие</h2>
      <p class="lead">Признак действия: отвечает на вопросы как? где? когда?</p>
      <div class="col">
        <div class="split"><span class="word"><b>бежит</b></span><span class="arrow">→</span><span class="tag">быстро · как?</span></div>
        <div class="split"><span class="word"><b>живёт</b></span><span class="arrow">→</span><span class="tag">вдали · где?</span></div>
        <div class="split"><span class="word"><b>вернулся</b></span><span class="arrow">→</span><span class="tag">вечером · когда?</span></div>
      </div>
      <p class="cap">Наречие не изменяется: у него нет окончания.</p>`;
  }
  function serv(s){
    return `<h2>Служебные части речи</h2>
      <p class="lead">Ничего не называют — они <b style="color:#ffd76a">служат</b>: связывают слова и помогают смыслу.</p>
      <div class="row">
        <div class="card"><div class="ic">🔗</div><div class="nm">предлог</div><div class="ex">в, на, под</div></div>
        <div class="card"><div class="ic">➕</div><div class="nm">союз</div><div class="ex">и, но, а</div></div>
        <div class="card"><div class="ic">❕</div><div class="nm">частица</div><div class="ex">не, бы, же</div></div>
      </div>
      <div class="word" style="align-self:center"><b>кот … столе … спит</b><i>без службы рассыпается</i></div>
      <p class="cap">Нажми кнопку — верну служебные слова на место.</p>
      <button class="cta" onclick="r601Serv()">${s.sv==null?'Собрать фразу':'Разобрать снова'}</button>`;
  }
  function trainer(s){
    const i=(s.gIdx||0)%SC.length, it=SC[i], got=s.gRes, done=got!=null, ok=got===it[2];
    const crates=CRATES.map(c=>`<div class="r1 card ${done?(got===c[2]?(c[2]===it[2]?'':' '):''):''}" data-crate="${c[0]}" onclick="thSort('${c[0]}')">
        <div class="ic">${c[1]}</div><div class="nm">${c[2]}</div><div class="ex">${c[3]}</div></div>`).join('');
    return `<h2>Разложи слова по ящикам</h2>
      <div class="split"><span class="word"><b>${it[0]}</b><i>${it[1]}</i></span></div>
      <p class="verdict${done?(ok?' ok':' no'):''}">${done?(ok?'✅ верно: '+it[0]+' — '+CRATES.filter(c=>c[0]===it[2])[0][2]:'❌ '+it[0]+' — это '+CRATES.filter(c=>c[0]===it[2])[0][2]):'Выбери ящик для слова.'}</p>
      <div class="row">${crates}</div>
      <p class="score">верно: ${s.gOk||0} · ошибок: ${s.gBad||0} · всего: ${SC.length}</p>
      <p class="cap">${done?'Нажми любой ящик — следующее слово.':'Каждое слово — в свой ящик.'}</p>`;
  }
  function render(el){
    css(); const s=st(); const step=(typeof LV!=='undefined'&&LV.step)||0;
    let body='';
    if(step===0) body=hero();
    else if(step===1) body=noun(s);
    else if(step===2) body=adj(s);
    else if(step===3) body=verb(s);
    else if(step===4) body=pron(s);
    else if(step===5) body=num(s);
    else if(step===6) body=adv(s);
    else if(step===7) body=serv(s);
    else body=trainer(s);
    const pr=PRED[step];
    const pred = (pr && step<8) ? `<div class="r1 row" style="gap:10px">
        <span class="chip" style="${s['q'+step]===0?'border-color:#ffd76a':''}" onclick="r601Pred(${step},0)">${pr[1]}</span>
        <span class="chip" style="${s['q'+step]===1?'border-color:#ffd76a':''}" onclick="r601Pred(${step},1)">${pr[2]}</span>
      </div>
      <p class="verdict${s['q'+step]==null?'':(s['q'+step]===0?' ok':' no')}">${s['q'+step]==null?'Выбери ответ:':(s['q'+step]===0?'✅ верно.':'❌ подумай ещё раз.')}</p>` : '';
    el.innerHTML=`<div class="r1">${body}${pred}</div>`;
  }
  window.r601Pick=(w,ok)=>{ const s=st(); s['w'+w]=ok; chRender(0); };
  window.r601More=(el)=>{ try{ el.classList.toggle('on'); }catch(e){} };
  window.r601Verb=(w)=>{ const s=st(); s['v'+w]=1; s.vN=Object.keys(s).filter(k=>k[0]==='v'&&k!=='vN').length; chRender(0); };
  window.r601Pron=()=>{ const s=st(); s.p=s.p==null?1:null; chRender(0); };
  window.r601Num=(el)=>{ try{ el.classList.toggle('on'); }catch(e){} };
  window.r601Serv=()=>{ const s=st(); s.sv=s.sv==null?1:null; chRender(0); };
  window.r601Pred=(i,v)=>{ const s=st(); s['q'+i]=v; chRender(0); };
  if(window.WAVE_B){
    const orig=window.WAVE_B[601];
    window.WAVE_B[601]=function(el){ try{ render(el); }catch(e){ try{ orig(el); }catch(e2){} } };
  }
  return {render:render};
})();

/* ================= 601 заново: девять кадров, у каждого своя хореография =================
   Сверено со скилами motion-principles / animate / typeset / emil-design-eng / accessibility-ux:
   вход 260 мс ease-out, отклик 120 мс, смена состояния 200 мс, только transform и opacity,
   масштаб не ниже 0,9, ease-in на входе нет, reduced-motion выключает движение,
   у каждого кадра своё осмысленное движение и своё действие ребёнка. */
window.RU601V2 = (function(){
  const F="Georgia,'Times New Roman',serif";
  const EASE="cubic-bezier(.2,0,0,1)";          /* snappy UI из motion-principles */
  const OUT="cubic-bezier(.23,1,.32,1)";        /* вход: приезжает и успокаивается   */
  const CSS=`
  #lvis .s6{--gold:#ffd76a;--ink:#f6efe0;--mut:#d8c9a6;--line:rgba(255,215,106,.28);--ok:#8fd1a8;--no:#e86a5a;
    box-sizing:border-box;max-width:100%;font-family:${F};color:var(--ink);width:100%;display:flex;flex-direction:column;gap:16px;padding-bottom:56px}
  #lvis .s6 .kicker{font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .s6 h2{font-size:24px;line-height:1.12;font-weight:600;color:var(--gold);letter-spacing:-.02em;margin:0;text-wrap:balance}
  #lvis .s6 p{margin:0}
  #lvis .s6 .lead{font-size:20px;line-height:1.5;text-wrap:pretty}
  #lvis .s6 .cap{font-size:16px;line-height:1.5;color:var(--mut)}
  #lvis .s6 .row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
  #lvis .s6 .card{box-sizing:border-box;flex:1 1 30%;min-width:104px;padding:16px 14px;border-radius:18px;text-align:center;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line);box-shadow:0 10px 24px rgba(0,0,0,.38)}
  #lvis .s6 .card .ic{font-size:30px;line-height:1}
  #lvis .s6 .card .nm{font-size:16px;font-weight:600;color:var(--gold);margin-top:8px}
  #lvis .s6 .card .ex{font-size:16px;line-height:1.25;color:var(--mut);margin-top:4px}
  #lvis .s6 button{font-family:${F};cursor:pointer;border-radius:16px;border:1.5px solid var(--line);
    background:rgba(255,255,255,.05);color:var(--ink);transition:transform 120ms ${EASE},background 160ms ease-out,border-color 160ms ease-out}
  #lvis .s6 button:active{transform:translateY(2px)}
  #lvis .s6 button:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
  #lvis .s6 .chip{padding:14px 20px;font-size:24px;font-weight:600;line-height:1.2}
  #lvis .s6 .chip.on{border-color:var(--gold);background:rgba(255,215,106,.14)}
  #lvis .s6 .chip.ok{border-color:var(--ok);background:rgba(143,209,168,.16)}
  #lvis .s6 .chip.no{border-color:var(--no);background:rgba(232,106,90,.14)}
  #lvis .s6 .word{display:inline-flex;align-items:baseline;gap:10px;flex-wrap:nowrap;white-space:nowrap;padding:14px 18px;border-radius:18px;
    background:linear-gradient(180deg,#24382d,#17261e);border:1.5px solid var(--line);box-shadow:0 12px 28px rgba(0,0,0,.42)}
  #lvis .s6 .word b{font-size:44px;font-weight:600;line-height:1;letter-spacing:-.02em}
  #lvis .s6 .word i{font-style:normal;font-size:16px;color:var(--mut)}
  /* длинная фраза в плашке: на 320 px «кот · столе · спит» не влезала в строку —
     разрешаем перенос и держим кегль по шкале (26 px вместо 28) */
  #lvis .s6 .word.wide{white-space:normal;flex-wrap:wrap;justify-content:center;text-align:center;max-width:100%}
  #lvis .s6 .word.wide b{font-size:26px;line-height:1.25;letter-spacing:0}
  #lvis .s6 .tag{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:12px;
    background:rgba(255,215,106,.12);border:1px solid var(--line);font-size:16px;color:var(--gold)}
  #lvis .s6 .cta{width:100%;padding:17px 18px;font-size:20px;font-weight:600;line-height:1.2;
    border-color:var(--gold);background:linear-gradient(180deg,#ffd76a,#e2b23f);color:#20180a}
  #lvis .s6 .verdict{font-size:16px;line-height:1.55}
  #lvis .s6 .verdict.ok{color:#b8e8cc}#lvis .s6 .verdict.no{color:#f3b3aa}
  #lvis .s6 .score{font-size:16px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .s6 .col{display:flex;flex-direction:column;gap:12px}
  #lvis .s6 .split{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}
  #lvis .s6 .rail{display:flex;gap:14px;justify-content:center;padding:10px 0;border-top:1px dashed var(--line);border-bottom:1px dashed var(--line)}
  #lvis .s6 .crates{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:86%;margin:0 auto}
  /* персонаж-помощник не должен закрывать содержимое русского тренажёра */
  body:has(#lvis .s6) .avatar,body:has(#lvis .s6) .mascot,body:has(#lvis .s6) .assistant,body:has(#lvis .s6) .guide,
  body:has(#lvis .ms) .avatar,body:has(#lvis .ms) .mascot,body:has(#lvis .ms) .assistant,body:has(#lvis .ms) .guide,
  body:has(#lvis .rl-wrap) .avatar,body:has(#lvis .rl-wrap) .mascot{display:none!important}
  body:has(#lvis .pp) .avatar,body:has(#lvis .pp) .mascot,body:has(#lvis .pp) .assistant{display:none!important}
  #lvis .s6 .crate{flex:1 1 30%;min-width:104px;padding:16px 12px;text-align:center}
  #lvis .s6 .crate .ic{font-size:30px}
  #lvis .s6 .crate .nm{font-size:16px;font-weight:600;color:var(--gold);margin-top:8px;white-space:nowrap}
  #lvis .s6 .crate .ex{font-size:14px;line-height:1.3;color:var(--mut);margin-top:4px}
  #lvis .s6 .crate.hit{border-color:var(--ok);box-shadow:0 0 0 4px rgba(143,209,168,.18);animation:bump 320ms ${OUT}}
  #lvis .s6 .crate.miss{border-color:var(--no);animation:nudge 150ms ease-out}
  /* --- хореография: у каждого кадра своя --- */
  #lvis .s6 [data-anim]{animation-duration:260ms;animation-timing-function:${OUT};animation-fill-mode:both;animation-delay:calc(var(--i,0)*40ms)}
  #lvis .s6[data-frame="1"] [data-anim]{animation-name:rise}
  #lvis .s6[data-frame="2"] [data-anim]{animation-name:pop}
  #lvis .s6[data-frame="3"] [data-anim]{animation-name:rise}
  #lvis .s6[data-frame="4"] [data-anim]{animation-name:slideX}
  #lvis .s6[data-frame="5"] [data-anim]{animation-name:swap}
  #lvis .s6[data-frame="6"] [data-anim]{animation-name:pop}
  #lvis .s6[data-frame="7"] [data-anim]{animation-name:slideX}
  #lvis .s6[data-frame="8"] [data-anim]{animation-name:drop}
  #lvis .s6[data-frame="9"] [data-anim]{animation-name:rise}
  #lvis .s6 .draw{stroke-dasharray:220;stroke-dashoffset:220;animation:draw 420ms ${OUT} 160ms both}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
  @keyframes pop{0%{opacity:0;transform:scale(.9)}70%{transform:scale(1.02)}100%{opacity:1;transform:none}}
  @keyframes slideX{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}
  @keyframes drop{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:none}}
  @keyframes swap{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:none}}
  @keyframes draw{to{stroke-dashoffset:0}}
  @keyframes bump{0%{transform:none}40%{transform:translateY(-8px)}100%{transform:none}}
  @keyframes nudge{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
  #lvis .s6 .fly{position:fixed;z-index:340;pointer-events:none;font-family:${F};font-weight:600;color:#ffe9a8;
    text-shadow:0 0 14px rgba(255,215,106,.7);transition:transform 260ms ${EASE},opacity 260ms ease-out}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6 *, #lvis .s6 *::before, #lvis .s6 *::after{
      animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    #lvis .s6 .fly{display:none!important}
  }`;
  /* каркас кадра один на всё русское направление — он лежит в RUKIT.frameCss() */
  function css(){ try{ if(window.RUKIT&&RUKIT.frameCss) RUKIT.frameCss(); }catch(e){} }
  const S=()=>{ const lk=lidKey(601); if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; };
  const T=(tag,i,cls,html,extra)=>`<${tag} data-anim style="--i:${i}" class="${cls||''}" ${extra||''}>${html}</${tag}>`;
  const BTN=(i,cls,html,on,extra)=>`<button type="button" data-anim style="--i:${i}" class="${cls}" onclick="${on}" ${extra||''}>${html}</button>`;
  const P={1:['Что называет существительное?','предмет','признак'],
           2:['Какие слова отвечают на «кто? что?»','смех и бег','только живое'],
           3:['Что делает прилагательное?','цепляется к предмету','действует само'],
           4:['Глагол называет…','действие или состояние','только движение'],
           5:['Зачем нужно местоимение?','чтобы не повторять слово','чтобы удлинить фразу'],
           6:['«Третий» отвечает на вопрос…','который?','сколько?'],
           7:['«Быстро» отвечает на вопрос…','как?','кто?'],
           8:['Предлог, союз, частица…','служат для связи','называют предмет']};
  const SC=[['снег','кто? что?','н'],['пушистый','какой?','п'],['летит','что делает?','г'],['дорога','кто? что?','н'],
            ['весёлый','какой?','п'],['рисует','что делает?','г'],['радость','кто? что?','н'],['зимний','какой?','п'],['светит','что делает?','г']];
  const CR=[['н','🧱','сущ.','кто? что?'],['п','🎨','прил.','какой?'],['г','⚡','гл.','что делает?']];
  window.RUGAME=window.RUGAME||{}; window.RUGAME[601]=SC;   /* тренажёр 601 виден гейту отклика */
  function v(s,i){ const q=s['q'+i]; return q==null?`<p class="verdict">Выбери ответ:</p>`:`<p class="verdict ${q===0?'ok':'no'}">${q===0?'✅ верно.':'❌ не так — подумай ещё раз.'}</p>`; }
  function pred(i,body){ return body + (P[i]?`<div class="row">
      ${BTN(90,'chip',P[i][1],`s6Pred(${i},0)`)}${BTN(91,'chip',P[i][2],`s6Pred(${i},1)`)}</div>${v(S(),i)}`:'') }
  function frames(s){
    const on=(k)=>k==null?'chip':(k===1?'chip ok':'chip no');
    return {
    1:`${T('div',0,'kicker','01 · Что называет слово')}
       ${T('h2',1,'','Части речи: что называет слово')}
       ${T('p',2,'lead','Каждое слово — работник со своей должностью.<br>Должность и есть часть речи.')}
       <div class="row">${T('div',3,'card','<div class="ic">🧱</div><div class="nm">предмет</div><div class="ex">кто? что?</div>')}
       ${T('div',4,'card','<div class="ic">🎨</div><div class="nm">признак</div><div class="ex">какой?</div>')}
       ${T('div',5,'card','<div class="ic">⚡</div><div class="nm">действие</div><div class="ex">что делает?</div>')}</div>
       ${T('p',6,'cap','Вопрос к слову — самый быстрый способ узнать должность.')}`,
    2:`${T('div',0,'kicker','02 · Имя существительное')}
       <div class="split">${T('span',1,'word','<b>смех</b><i>кто? что?</i>')}</div>
       ${T('p',2,'lead','Отвечает на <b style="color:#ffd76a">кто?</b> или <b style="color:#ffd76a">что?</b> и называет предмет.')}
       <div class="row">${['кот','дом','смех'].map((w,k)=>BTN(3+k,on(s['w'+w]),w,`s6Word('${w}')`)).join('')}</div>
       <div class="split">${T('span',7,'tag','кто? — живое')}${T('span',8,'tag','что? — остальное')}</div>
       ${T('p',9,'verdict '+(s.wкот==null?'':'ok'), s.wкот==null?'Нажми на слово — покажу вопрос к нему.':'Смех и бег тоже существительные: они отвечают на вопрос что?')}`,
    3:`${T('div',0,'kicker','03 · Имя прилагательное')}
       ${T('p',1,'lead','Признак не живёт сам: он <b style="color:#ffd76a">цепляется</b> к предмету.')}
       <div class="split">${T('span',2,'word','<b>рыжий</b><i>какой?</i>')}
         <svg width="72" height="24" style="flex:none"><line class="draw" x1="4" y1="12" x2="66" y2="12" stroke="#ffd76a" stroke-width="2.5" stroke-linecap="round"/></svg>
         ${T('span',3,'word','<b>кот</b><i>кто?</i>')}</div>
       <div class="row">${['тёплая → вода','деревянное → окно','зимний → день'].map((p,k)=>BTN(4+k,'chip',p,`s6Toggle(this)`)).join('')}</div>
       ${T('p',7,'cap','Нажми на пару — подсветится связь.')}`,
    4:`${T('div',0,'kicker','04 · Глагол')}
       ${T('p',1,'lead','Отвечает на <b style="color:#ffd76a">что делает?</b> и называет действие или состояние.')}
       <div class="row">${['бежит','светит','спит'].map((w,k)=>BTN(2+k,on(s['v'+w]===1?'ok':null),w,`s6Verb('${w}')`)).join('')}</div>
       <div class="rail">${T('span',5,'tag','действие: бежит, светит')}${T('span',6,'tag','состояние: спит')}</div>
       ${T('p',7,'score',s.vN==null?'Нажми на глаголы — они уедут на ленту.':'Отмечено глаголов: '+s.vN)}`,
    5:`${T('div',0,'kicker','05 · Местоимение')}
       ${T('p',1,'lead','Не называет, а <b style="color:#ffd76a">указывает</b>: я, ты, он, она, мы, вы, они.')}
       <div class="col">
         <div class="split">${T('span',2,'word', s.p==null?'<b>Маша</b><i>имя</i>':'<b>Она</b><i>указывает</i>')}${T('span',3,'word','<b>читает</b>')}</div>
         ${s.p==null?'':T('div',4,'cap','Слово «Маша» ушло, смысл остался: местоимение заменило имя.')}
       </div>
       ${BTN(5,'cta', s.p==null?'Показать, как короче':'Вернуть имя',`s6Pron()`)}`,
    6:`${T('div',0,'kicker','06 · Имя числительное')}
       ${T('p',1,'lead','Называет число или порядок при счёте — и всегда отвечает на свой вопрос.')}
       <div class="row">${T('div',2,'card','<div class="nm">сколько?</div><div class="ex">пять, сто</div>')}${T('div',3,'card','<div class="nm">который?</div><div class="ex">третий, пятый</div>')}</div>
       <div class="row">${[['пять','сколько?'],['третий','который?'],['сто','сколько?']].map((p,k)=>BTN(4+k,'chip',p[0],`s6Num(this,'${p[1]}')`)).join('')}</div>
       ${T('p',7,'cap','Нажми — покажу вопрос.')}`,
    7:`${T('div',0,'kicker','07 · Наречие')}
       ${T('p',1,'lead','Признак действия: как? где? когда? Наречие не изменяется — у него нет окончания.')}
       <div class="col">
         ${[['бежит','быстро · как?'],['живёт','вдали · где?'],['вернулся','вечером · когда?']].map((p,k)=>
           T('div',2+k,'split',`<span class="word"><b style="font-size:32px">${p[0]}</b></span><span class="tag">${p[1]}</span>`)).join('')}
       </div>`,
    8:`${T('div',0,'kicker','08 · Служебные части речи')}
       ${T('p',1,'lead','Ничего не называют — <b style="color:#ffd76a">служат</b>: связывают слова.')}
       <div class="row">${T('div',2,'card','<div class="ic">🔗</div><div class="nm">предлог</div><div class="ex">в, на, под</div>')}
       ${T('div',3,'card','<div class="ic">➕</div><div class="nm">союз</div><div class="ex">и, но, а</div>')}
       ${T('div',4,'card','<div class="ic">❕</div><div class="nm">частица</div><div class="ex">не, бы, же</div>')}</div>
       <div class="split">${T('span',5,'word wide', s.sv==null?'<b>кот · столе · спит</b><i>без службы</i>':'<b>кот <span style="color:#ffd76a">на</span> столе <span style="color:#ffd76a">и</span> спит</b><i>служебные на месте</i>')}</div>
       ${BTN(6,'cta', s.sv==null?'Собрать фразу':'Разобрать снова',`s6Serv()`)}`,
    9:(()=>{ const i=(s.gIdx||0)%SC.length, it=SC[i], got=s.gRes, done=got!=null, ok=got===it[2];
      return `${T('div',0,'kicker','09 · Тренажёр')}
       <div class="split">${T('span',1,'word',`<b>${it[0]}</b><i>${it[1]}</i>`)}</div>
       ${done
         ? (ok ? window.RUFEED.note('ok','верно',it[0]+' — '+CR.filter(c=>c[0]===it[2])[0][2])
               : window.RUFEED.note('no','исправить','<b>'+it[0]+'</b> — это '+CR.filter(c=>c[0]===it[2])[0][2]+', а не '+CR.filter(c=>c[0]===got)[0][2]))
         : `<div class="verdict">Выбери ящик для слова.</div>`}
       <div class="crates">${CR.map((c,k)=>{ const cls='crate'+(done&&got===c[2]?(c[2]===it[2]?' hit':' miss'):'');
         return BTN(2+k,cls,`<div class="ic">${c[1]}</div><div class="nm">${c[2]}</div><div class="ex">${c[3]}</div>`,`s6Sort('${c[0]}')`); }).join('')}</div>
       <p class="score">верно: ${s.gOk||0} · ошибок: ${s.gBad||0} · всего: ${SC.length}</p>
       <p class="cap">${done?'Нажми любой ящик — следующее слово.':'Каждое слово — в свой ящик.'}</p>`; })()
    };
  }
  function render(el){
    css(); const s=S(); const st=(typeof LV!=='undefined'&&LV.step)||0; const f=Math.min(9,Math.max(1,st+1));  /* шаги 0–8 → кадры 1–9 */
    const body=frames(s)[f];
    el.innerHTML=`<div class="s6" data-frame="${f}">${pred(f,body)}</div>`;
  }
  window.s6Pred=(i,q)=>{ const s=S(); s['q'+i]=q; chRender(0); };
  window.s6Word=(w)=>{ const s=S(); s['w'+w]=1; chRender(0); };
  window.s6Toggle=(b)=>{ try{ b.classList.toggle('on'); }catch(e){} };
  window.s6Verb=(w)=>{ const s=S(); s['v'+w]=1; s.vN=Object.keys(s).filter(k=>/^v[^N]/.test(k)).length; chRender(0); };
  window.s6Pron=()=>{ const s=S(); s.p=s.p==null?1:null; chRender(0); };
  window.s6Num=(b,q)=>{ try{ b.classList.add('on'); b.textContent=b.textContent.replace(/\s*—.*/,'')+' — '+q; }catch(e){} };
  window.s6Serv=()=>{ const s=S(); s.sv=s.sv==null?1:null; chRender(0); };
  window.s6Sort=(key)=>{
    let from=null,to=null,txt='';
    try{
      const s=S(), i=(s.gIdx||0)%SC.length, it=SC[i];
      if(s.gRes!=null){ s.gIdx=(s.gIdx||0)+1; s.gRes=null; chRender(0); return; }
      const crate=document.querySelector('#lvis .s6 .crate[onclick*="'+key+'"]')||[...document.querySelectorAll('#lvis .s6 .crate')].find(c=>(c.getAttribute('onclick')||'').indexOf("'"+key+"'")>0);
      const card=document.querySelector('#lvis .s6 .word');
      if(card) from=card.getBoundingClientRect(); if(crate) to=crate.getBoundingClientRect(); txt=it[0];
      s.gRes=key; if(key===it[2]) s.gOk=(s.gOk||0)+1; else s.gBad=(s.gBad||0)+1;
      chRender(0);                                  /* состояние видно сразу, даже без анимации */
    }catch(e){}
    try{
      if(!from||!to) return;
      const c=document.createElement('div'); c.className='fly'; c.textContent=txt;
      c.style.left=from.left+'px'; c.style.top=from.top+'px'; c.style.fontSize=Math.min(42,to.height*0.5)+'px';
      document.body.appendChild(c);
      const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
      requestAnimationFrame(()=>{ c.style.transform='translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px) scale(.9)'; c.style.opacity='.08'; });
      setTimeout(()=>{ try{ c.remove(); }catch(e){} }, 300);
    }catch(e){}
  };
  if(window.WAVE_B){
    const prev=window.WAVE_B[601];
    window.WAVE_B[601]=function(el){ try{ render(el); }catch(e){ try{ prev(el); }catch(e2){} } };
  }
  return {render:render};
})();

/* ================= РАБОТЫ 611–613: свет, глубина и своя хореография =================
   Данные и обработчики прежние (RU_EXAM_ITEMS, ruExamPick, CHS[lk].ans, st.ok/st.bad),
   поэтому машинные проверки работ продолжают работать. Новое — оформление и движение:
   подсветка гнезда, объёмные плитки, блик по правильному ответу, полоса прогресса,
   влетающая буква. Сверено с motion-principles, typeset, emil-design-eng, accessibility-ux. */
window.RUWORK = (function(){
  const F="Georgia,'Times New Roman',serif";
  const EASE="cubic-bezier(.2,0,0,1)", OUT="cubic-bezier(.23,1,.32,1)";
  const CSS=`
  #lvis .rk{--gold:#ffd76a;--ink:#f6efe0;--mut:#d8c9a6;--ok:#8fd1a8;--no:#e86a5a;--line:rgba(255,215,106,.26);
    box-sizing:border-box;max-width:100%;position:relative;font-family:${F};color:var(--ink);width:100%;display:flex;flex-direction:column;gap:18px;
    padding:20px 16px 22px;border-radius:22px;overflow:hidden;
    background:radial-gradient(120% 90% at 50% -10%,rgba(255,215,106,.10),transparent 60%),linear-gradient(180deg,#1c2f26,#14211b);
    border:1px solid var(--line);box-shadow:0 24px 60px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05)}
  #lvis .rk::before{content:'';position:absolute;inset:0;pointer-events:none;
    background:radial-gradient(60% 45% at 50% 0%,rgba(255,215,106,.14),transparent 70%)}
  #lvis .rk>*{position:relative;z-index:1}
  #lvis .rk .top{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
  #lvis .rk .kick{font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .rk .qnum{font-size:14px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .rk .bar{height:6px;border-radius:6px;background:rgba(255,255,255,.08);overflow:hidden}
  #lvis .rk .bar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,#ffd76a,#e2b23f);
    transform-origin:left;transition:transform 200ms ${EASE}}
  #lvis .rk .divider{display:flex;align-items:center;gap:10px;color:var(--line)}
  #lvis .rk .divider span{flex:1;height:1px;background:currentColor}
  #lvis .rk .divider b{font-size:12px;color:rgba(255,215,106,.55)}
  #lvis .rk .wordwrap{position:relative;display:flex;justify-content:center;padding:8px 0 4px}
  #lvis .rk .halo{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:230px;height:120px;pointer-events:none;
    background:radial-gradient(closest-side,rgba(255,215,106,.22),transparent 72%);filter:blur(6px);animation:haloPulse 2.6s ease-in-out infinite}
  #lvis .rk .word{display:flex;gap:9px;flex-wrap:wrap;justify-content:center}
  #lvis .rk .cell{min-width:52px;height:70px;padding:0 12px;display:flex;align-items:center;justify-content:center;
    font-size:48px;font-weight:600;line-height:1;letter-spacing:-.02em;color:#f8f2e4;
    background:linear-gradient(180deg,#26402f,#17271f);border:1.5px solid var(--line);border-radius:16px;
    box-shadow:0 10px 24px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.07);
    animation:cellIn 240ms ${OUT} both;animation-delay:calc(var(--i,0)*30ms)}
  #lvis .rk .cell.gap{border-style:dashed;border-color:rgba(255,215,106,.85);color:transparent;animation:cellIn 240ms ${OUT} both,gapPulse 1.9s ease-in-out infinite}
  #lvis .rk .cell.ok{border-color:var(--ok);background:linear-gradient(180deg,#254634,#17281f);
    box-shadow:0 10px 24px rgba(0,0,0,.45),inset 0 0 26px rgba(143,209,168,.3);animation:land 320ms ${OUT} both;position:relative}
  #lvis .rk .cell.ok::after{content:'';position:absolute;left:6px;right:6px;bottom:6px;height:3px;border-radius:3px;
    background:linear-gradient(90deg,rgba(255,215,106,0),#ffd76a 25%,#ffd76a 75%,rgba(255,215,106,0));
    transform-origin:left;animation:pen 420ms cubic-bezier(.2,1,.32,1) 120ms both}
  @keyframes pen{0%{transform:scaleX(0);opacity:.2}100%{transform:scaleX(1);opacity:1}}
  #lvis .rk .cell.no{border-color:var(--no);background:linear-gradient(180deg,#3b2422,#281715);
    box-shadow:0 10px 24px rgba(0,0,0,.45),inset 0 0 26px rgba(232,106,90,.28);animation:nudge 150ms ease-out}
  #lvis .rk .ask{font-size:16px;line-height:1.5;color:var(--ink);text-align:center;font-family:${F}}
  #lvis .rk .opts{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
  #lvis .rk .opt{box-sizing:border-box;position:relative;overflow:hidden;min-width:92px;padding:16px 22px;border-radius:18px;cursor:pointer;
    font-family:${F};font-size:32px;font-weight:600;line-height:1.1;color:var(--ink);
    background:linear-gradient(180deg,#25392e,#182720);border:1.5px solid var(--line);
    box-shadow:0 10px 22px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06);
    transition:transform 120ms ${EASE},box-shadow 180ms ease-out,border-color 180ms ease-out}
  #lvis .rk .opt:hover{transform:translateY(-2px)}
  #lvis .rk .opt:active{transform:translateY(2px)}
  #lvis .rk .opt:focus-visible{outline:3px solid var(--gold);outline-offset:3px}
  #lvis .rk .opt.picked{border-color:var(--gold);box-shadow:0 10px 22px rgba(0,0,0,.4),0 0 0 4px rgba(255,215,106,.16)}
  #lvis .rk .opt::after{content:'';position:absolute;top:0;bottom:0;width:46px;left:-60px;transform:skewX(-18deg);
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);pointer-events:none}
  #lvis .rk .opt.picked.ok::after{animation:sheen 520ms ${OUT} 80ms both}
  #lvis .rk .verdict{font-size:16px;line-height:1.55;text-align:center}
  #lvis .rk .verdict.ok{color:#b8e8cc}#lvis .rk .verdict.no{color:#f3b3aa}
  #lvis .rk .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  @keyframes cellIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @keyframes gapPulse{0%,100%{box-shadow:0 10px 24px rgba(0,0,0,.45),0 0 0 0 rgba(255,215,106,.2)}50%{box-shadow:0 10px 24px rgba(0,0,0,.45),0 0 0 10px rgba(255,215,106,0)}}
  @keyframes haloPulse{0%,100%{opacity:.55}50%{opacity:.95}}
  @keyframes land{0%{opacity:.4}100%{opacity:1}}
  @keyframes nudge{0%,100%{transform:none}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
  @keyframes sheen{to{left:120%}}
  #lvis .rk .fly{position:fixed;z-index:340;pointer-events:none;font-family:${F};font-weight:600;color:#ffe9a8;
    text-shadow:0 0 16px rgba(255,215,106,.75);transition:transform 260ms ${EASE},opacity 260ms ease-out}
  @media (prefers-reduced-motion: reduce){
    #lvis .rk *,#lvis .rk *::before,#lvis .rk *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    #lvis .rk .fly{display:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('rk-style'); if(!e){ e=document.createElement('style'); e.id='rk-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function render(el, id, qi, it, total, st){
    css();
    const picked = st.ans ? st.ans[qi] : null;
    const done = picked != null;
    const ok = picked === it.ans;
    const parts = String(it.word||'').split('');
    const cells = parts.map((ch,k)=>{
      const isGap = (ch==='_'||ch==='?');
      const cls = isGap ? (done ? (ok?'cell ok':'cell no') : 'cell gap') : 'cell';
      const txt = isGap ? (done ? picked : '') : ch;
      return `<div class="${cls}" style="--i:${k}" ${isGap?'id="rkGap"':''}>${txt}</div>`;
    }).join('');
    const opts = (it.opts || [it.ans]).map(o=>{
      const cls='opt'+(picked===o?' picked'+(o===it.ans?' ok':''):'');
      return `<button type="button" class="${cls}" onclick="ruExamPick(${id},${qi},'${o}')">${o}</button>`;
    }).join('');
    const spell = it.spell || String(it.word||'').replace('_', it.ans);
    const why = it.hint || it.ask || '';
    el.innerHTML = `<div class="rk" data-work="${id}">
      <div class="top"><div class="kick">Проверочная работа · ${id}</div><div class="qnum">${qi+1} / ${total}</div></div>
      <div class="bar"><i style="transform:scaleX(${((qi+ (done?1:0))/total).toFixed(3)})"></i></div>
      <div class="divider"><span></span><b>◆</b><span></span></div>
      <div class="wordwrap"><div class="halo"></div><div class="word">${cells}</div></div>
      <p class="ask">${it.ask||'Выбери верное написание'}</p>
      <div class="opts">${opts}</div>
      ${done
        ? (ok ? window.RUFEED.note('ok','верно','<b>'+spell+'</b>'+(why?' · '+why:''))
              : window.RUFEED.note('no','исправить','Правильно «<b>'+it.ans+'</b>» — '+spell+(why?' · '+why:'')))
        : `<p class="verdict" aria-live="polite">Выбери букву — она встанет в слово.</p>`}
      <p class="score">верно: ${st.ok||0} · ошибок: ${st.bad||0} · всего: ${total}</p>
    </div>`;
  }
  /* буква влетает в гнездо: только transform и opacity, масштаб не ниже 0,9 */
  const origPick = window.RU_EXAM_PICK;
  window.RU_EXAM_PICK = {};
  Object.keys(origPick||{}).forEach(k=>{ window.RU_EXAM_PICK[k]=origPick[k]; });
  [611,612,613].forEach(id=>{
    const prev = window.RU_EXAM_PICK[id];
    window.RU_EXAM_PICK[id] = function(qi, val){
      let from=null,to=null;
      try{
        const btn=[...document.querySelectorAll('#lvis .rk .opt')].find(b=>b.textContent.trim()===String(val));
        const gap=document.getElementById('rkGap');
        if(btn) from=btn.getBoundingClientRect();
        if(gap) to=gap.getBoundingClientRect();
      }catch(e){}
      if(typeof prev==='function') prev(qi,val);   /* состояние и счёт считает прежний обработчик */
      try{
        if(!from||!to) return;
        const c=document.createElement('div'); c.className='fly'; c.textContent=val;
        c.style.left=from.left+'px'; c.style.top=from.top+'px'; c.style.fontSize=Math.min(44,to.height*0.62)+'px';
        document.body.appendChild(c);
        const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
        requestAnimationFrame(()=>{ c.style.transform='translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px) scale(.92)'; c.style.opacity='.06'; });
        setTimeout(()=>{ try{c.remove();}catch(e){} }, 300);
      }catch(e){}
    };
  });
  /* подменяем кадр только на шагах с вопросами; вступление и разбор остаются прежними */
  if(window.WAVE_B){
    [611,612,613].forEach(id=>{
      const prevW=window.WAVE_B[id]; if(typeof prevW!=='function') return;
      window.WAVE_B[id]=function(el){
        try{
          const lk=(typeof lidKey==='function')?lidKey(LV.id):String(id);
          if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; if(!CHS[lk].ans) CHS[lk].ans={};
          const L=(window.ARH_LESSONS||[]).find(x=>x.id===id);
          const txt=L?(L.explain[LV.step||0]||''):'';
          const m=/^Вопрос (\d+) из (\d+)\./.exec(txt);
          const items=(window.RU_EXAM_ITEMS||{})[id];
          if(m && items){
            const qi=parseInt(m[1],10)-1, it=items[qi];
            if(it && it.word && it.ans){ render(el, id, qi, it, parseInt(m[2],10)||items.length, CHS[lk]); return; }
          }
        }catch(e){}
        return prevW(el);
      };
    });
  }
  return {render:render};
})();

/* ================= РАБОТА 611: рукописная страница с иллюминацией (своя, не шаблон) =================
   Вместо трёх одинаковых карточек и общей плиточной сетки: надпись на строке с прочерком,
   гнездо как каретка со свечой, выбор буквы — медальоны, верная буква — иллюминированная
   буквица с лучами, разбор — глосса на поле, прогресс — ромбы по числу вопросов.
   Сверено с design-taste-frontend (запрет шаблонов), motion-principles, typeset, accessibility-ux. */
window.RUWORK611 = (function(){
  const F="Georgia,'Times New Roman',serif";
  const EASE="cubic-bezier(.2,0,0,1)", OUT="cubic-bezier(.23,1,.32,1)";
  const GRAIN="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E\")";
  const CSS=`
  #lvis .ms{--gold:#ffd76a;--ink:#f7f0e0;--mut:#dccfb0;--ok:#9fd8b4;--no:#e8735f;--rule:rgba(255,215,106,.35);
    box-sizing:border-box;max-width:100%;position:relative;width:100%;padding:22px 18px 24px;border-radius:20px;overflow:hidden;font-family:${F};color:var(--ink);
    background:
      radial-gradient(80% 60% at 50% 0%,rgba(255,205,110,.16),transparent 62%),
      radial-gradient(120% 120% at 50% 120%,rgba(0,0,0,.5),transparent 60%),
      linear-gradient(180deg,#1b2c24,#131e19);
    border:1px solid var(--rule);box-shadow:0 26px 64px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.05)}
  #lvis .ms .grain{position:absolute;inset:0;background-image:${GRAIN};pointer-events:none;mix-blend-mode:overlay}
  /* СВОЙСТВА SVG-ЗАМЕНЯЕМОГО ЭЛЕМЕНТА: у абсолютно positioned SVG без явной ширины
     берётся собственная ширина 300 px из viewBox, а не расстояние между left и right.
     На 320 px лоза и подчёркивание выходили за правый край на 18 и 44 px — отсюда
     12 отметок гейта. Ширину задаём явно от контейнера. */
  #lvis .ms .vine{position:absolute;left:10px;width:calc(100% - 20px);top:8px;height:18px;opacity:.75;pointer-events:none}
  #lvis .ms .vine.b{top:auto;bottom:8px;transform:scaleY(-1)}
  #lvis .ms .head{display:flex;justify-content:space-between;align-items:baseline;gap:10px}
  #lvis .ms .work{font-size:clamp(11px,3.2vw,14px);letter-spacing:clamp(.06em,.14em,.14em);text-transform:uppercase;color:var(--mut)}
  #lvis .ms .num{font-size:14px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .ms .gems{display:flex;gap:clamp(3px,1.2vw,6px);margin-top:10px;justify-content:center;flex-wrap:wrap;max-width:100%}
  #lvis .ms .gem{width:clamp(7px,2.2vw,9px);height:clamp(7px,2.2vw,9px);transform:rotate(45deg);border:1px solid var(--rule);background:rgba(255,255,255,.04);
    transition:background 200ms ease-out,box-shadow 200ms ease-out,border-color 200ms ease-out}
  #lvis .ms .gem.done{background:linear-gradient(180deg,#ffd76a,#e2b23f);border-color:#ffd76a;box-shadow:0 0 10px rgba(255,215,106,.55)}
  #lvis .ms .inscribe{position:relative;margin:clamp(14px,4vw,26px) 0 8px;padding:clamp(10px,3vw,18px) 4px clamp(14px,4vw,22px);text-align:center;max-width:100%}
  #lvis .ms .ink{font-size:clamp(26px,10.6vw,52px);line-height:1.05;font-weight:600;letter-spacing:.01em;display:inline-flex;gap:2px;align-items:flex-end;flex-wrap:wrap;justify-content:center;max-width:100%}
  #lvis .ms .ink span{animation:inkIn 240ms ${OUT} both;animation-delay:calc(var(--i,0)*24ms)}
  #lvis .ms .ink span.seat{position:relative;min-width:42px;color:transparent;
    border-bottom:3px solid rgba(255,215,106,.85);box-shadow:0 12px 22px -10px rgba(255,215,106,.55)}
  #lvis .ms .ink span.seat::before{content:'?';position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);
    font-size:22px;color:rgba(255,215,106,.35);font-weight:600}
  #lvis .ms .ink span.seat.lit,#lvis .ms .ink span.seat.bad{border-bottom-color:transparent;box-shadow:none}
  #lvis .ms .ink span.seat.lit::before,#lvis .ms .ink span.seat.bad::before{content:''}
  #lvis .ms .ink span.seat::after{content:'';position:absolute;left:50%;bottom:-6px;width:26px;height:2px;transform:translateX(-50%);
    background:var(--gold);opacity:.85;animation:candle 1.8s ease-in-out infinite}
  #lvis .ms .ink span.lit{color:#fff6dd;text-shadow:0 0 22px rgba(255,215,106,.9),0 0 46px rgba(255,190,90,.5);animation:bloom 360ms ${OUT} both}
  #lvis .ms .ink span.lit::after{content:'';position:absolute;left:-4px;right:-4px;bottom:-8px;height:3px;border-radius:3px;
    background:linear-gradient(90deg,rgba(255,215,106,0),#ffd76a 25%,#ffd76a 75%,rgba(255,215,106,0));
    transform-origin:left;animation:pen 420ms cubic-bezier(.2,1,.32,1) 120ms both}
  @keyframes pen{0%{transform:scaleX(0);opacity:.2}100%{transform:scaleX(1);opacity:1}}
  #lvis .ms .ink span.bad{color:#ffdad4;text-shadow:0 0 18px rgba(232,115,95,.8)}
  #lvis .ms .underline{position:absolute;left:8%;width:84%;bottom:10px;height:14px;opacity:.9}
  #lvis .ms .gloss{margin-top:14px;padding:12px clamp(10px,3vw,14px) 12px clamp(12px,3.4vw,16px);border-left:3px solid var(--rule);
    background:linear-gradient(90deg,rgba(255,215,106,.08),transparent 70%);font-size:16px;line-height:1.55}
  #lvis .ms .gloss .lbl{display:block;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin-bottom:4px}
  #lvis .ms .gloss.ok{border-color:var(--ok)}#lvis .ms .gloss.no{border-color:var(--no)}
  #lvis .ms .seals{display:flex;gap:clamp(10px,3.4vw,18px);justify-content:center;margin-top:clamp(12px,3.4vw,18px);flex-wrap:wrap}
  #lvis .ms .seal{position:relative;width:clamp(58px,17vw,84px);height:clamp(58px,17vw,84px);border-radius:50%;cursor:pointer;font-family:${F};font-size:clamp(24px,7vw,34px);font-weight:600;color:var(--ink);
    background:radial-gradient(circle at 35% 28%,#2c4536,#17251e 70%);border:2px solid var(--rule);
    box-shadow:0 10px 22px rgba(0,0,0,.45),inset 0 2px 0 rgba(255,255,255,.09),inset 0 -6px 14px rgba(0,0,0,.35);
    transition:transform 120ms ${EASE},box-shadow 180ms ease-out,border-color 180ms ease-out}
  #lvis .ms .seal:hover{transform:translateY(-2px)}
  #lvis .ms .seal:active{transform:translateY(2px) scale(.98)}
  #lvis .ms .seal:focus-visible{outline:3px solid var(--gold);outline-offset:4px}
  #lvis .ms .seal.chosen{border-color:var(--gold);box-shadow:0 10px 22px rgba(0,0,0,.45),0 0 0 6px rgba(255,215,106,.12)}
  #lvis .ms .seal.press{animation:press 320ms ${OUT} both}
  #lvis .ms .seal.tip{animation:tilt 150ms ease-out}
  #lvis .ms .score{margin-top:14px;text-align:center;font-size:16px;color:var(--mut);font-variant-numeric:tabular-nums}
  #lvis .ms .fly{position:fixed;z-index:340;pointer-events:none;font-family:${F};font-weight:600;color:#fff6dd;
    text-shadow:0 0 20px rgba(255,215,106,.9);transition:transform 280ms ${EASE},opacity 280ms ease-out}
  @keyframes inkIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  @keyframes candle{0%,100%{opacity:.55}50%{opacity:1}}
  @keyframes bloom{0%{opacity:.4;transform:scale(.92)}60%{transform:scale(1.04)}100%{opacity:1;transform:none}}
  @keyframes press{0%{transform:none}45%{transform:scale(.92)}100%{transform:none}}
  @keyframes tilt{0%,100%{transform:rotate(0)}30%{transform:rotate(-4deg)}70%{transform:rotate(4deg)}}
  @media (prefers-reduced-motion: reduce){#lvis .ms *,#lvis .ms *::before{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
    #lvis .ms .fly{display:none!important}}
  `;
  const VINE=`<svg class="vine" viewBox="0 0 300 18" preserveAspectRatio="none"><path d="M4 12 C40 4,70 16,110 9 C150 2,180 15,220 8 C250 3,275 12,296 7" fill="none" stroke="rgba(255,215,106,.45)" stroke-width="1.2" stroke-linecap="round"/><circle cx="4" cy="12" r="2.2" fill="rgba(255,215,106,.6)"/><circle cx="296" cy="7" r="2.2" fill="rgba(255,215,106,.6)"/></svg>`;
  function css(){ try{ let e=document.getElementById('ms-style'); if(!e){ e=document.createElement('style'); e.id='ms-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function render(el, id, qi, it, total, st){
    css();
    const picked = st.ans ? st.ans[qi] : null, done = picked!=null, ok = picked===it.ans;
    const chars=[...String(it.word||'')];
    const ink = chars.map((ch,k)=>{
      const isGap = (ch==='_'||ch==='?');
      const cls = isGap ? ('seat'+(done?(ok?' lit':' bad'):'')) : '';
      return `<span class="${cls}" style="--i:${k}" ${isGap?'id="msSeat"':''}>${isGap?(done?picked:''):ch}</span>`;
    }).join('');
    const gems = Array.from({length:total},(_,i)=>`<i class="gem ${st.ans&&st.ans[i]!=null?'done':''}"></i>`).join('');
    const seals = (it.opts||[it.ans]).map(o=>{
      const cls='seal'+(picked===o?(' chosen'+(o===it.ans?' press':' tip')):'');
      return `<button type="button" class="${cls}" onclick="ruExamPick(${id},${qi},'${o}')">${o}</button>`;
    }).join('');
    const spell = it.spell || String(it.word||'').replace('_', it.ans);
    const why = it.hint || it.ask || '';
    el.innerHTML=`<div class="ms" data-work="${id}">
      <div class="grain"></div>${VINE}${VINE.replace('class="vine"','class="vine b"')}
      <div class="head"><div class="work">Проверочная работа · ${id}</div><div class="num">${qi+1} / ${total}</div></div>
      <div class="gems">${gems}</div>
      <div class="inscribe">
        <div class="ink">${ink}</div>
        <svg class="underline" viewBox="0 0 300 14" preserveAspectRatio="none"><path class="draw" d="M2 8 C60 14,120 2,180 8 C230 13,270 5,298 9" fill="none" stroke="rgba(255,215,106,.5)" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="320" stroke-dashoffset="320"/></svg>
      </div>
      ${done
        ? (ok ? window.RUFEED.note('ok','верно','Написание: <b>'+spell+'</b>'+(why?' · '+why:'')).replace('class="fb ok"','class="fb ok gloss ok" aria-live="polite"')
              : window.RUFEED.note('no','исправить','Правильно «<b>'+it.ans+'</b>» — '+spell+' · подсказка: '+why+'<span class="ghost"> '+String(it.word||'').replace('_',it.ans)+'</span>').replace('class="fb no"','class="fb no gloss no" aria-live="polite"'))
        : `<div class="gloss" aria-live="polite"><span class="lbl">подсказка</span>${it.ask||'Выбери букву: она сядет на прочерк и загорится.'}</div>`}
      <div class="seals">${seals}</div>
      <div class="score">верно: ${st.ok||0} · ошибок: ${st.bad||0} · всего: ${total}</div>
    </div>`;
    const u=el.querySelector('#lvis .ms .underline path'); if(u) requestAnimationFrame(()=>{ u.style.strokeDashoffset='0'; });
  }
  /* буква слетает в прочерк: только transform и opacity */
  const prev = window.RU_EXAM_PICK && window.RU_EXAM_PICK[611];
  if(window.RU_EXAM_PICK){
    window.RU_EXAM_PICK[611]=function(qi,val){
      let from=null,to=null;
      try{
        const seal=[...document.querySelectorAll('#lvis .ms .seal')].find(b=>b.textContent.trim()===String(val));
        const seat=document.getElementById('msSeat');
        if(seal) from=seal.getBoundingClientRect(); if(seat) to=seat.getBoundingClientRect();
      }catch(e){}
      if(typeof prev==='function') prev(qi,val);
      try{
        if(!from||!to) return;
        const c=document.createElement('div'); c.className='fly'; c.textContent=val;
        c.style.left=from.left+'px'; c.style.top=from.top+'px'; c.style.fontSize=Math.min(46,to.height||46)+'px';
        document.body.appendChild(c);
        const dx=(to.left+to.width/2)-(from.left+from.width/2), dy=(to.top+to.height/2)-(from.top+from.height/2);
        requestAnimationFrame(()=>{ c.style.transform='translate('+dx.toFixed(1)+'px,'+dy.toFixed(1)+'px)'; c.style.opacity='.05'; });
        setTimeout(()=>{ try{c.remove();}catch(e){} }, 320);
      }catch(e){}
    };
  }
  if(true){    /* рукописный кадр 611 включён: причина отметок на 320 px найдена замером (см. ниже) */
    const prevW=window.WAVE_B[611];
    window.WAVE_B[611]=function(el){
      try{
        const lk=(typeof lidKey==='function')?lidKey(LV.id):'611';
        if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; if(!CHS[lk].ans) CHS[lk].ans={};
        const L=(window.ARH_LESSONS||[]).find(x=>x.id===611);
        const m=/^Вопрос (\d+) из (\d+)\./.exec(L?(L.explain[LV.step||0]||''):'');
        const items=(window.RU_EXAM_ITEMS||{})[611];
        if(m&&items){ const qi=parseInt(m[1],10)-1, it=items[qi];
          if(it&&it.word&&it.ans){ render(el,611,qi,it,parseInt(m[2],10)||items.length,CHS[lk]); return; } }
      }catch(e){}
      return prevW(el);
    };
  }
  return {render:render};
})();

/* ================= ДВИЖОК ОТКЛИКА: вместо шаблонного «верно / не верно» =================
   Правильный ответ: печать впечатывается (320 мс), от неё идёт волна-кольцо, буква
   наливается светом, глосса разворачивается сверху вниз.
   Ошибка: чернильный оттиск расходится, буква вздрагивает и тает, на её месте
   проступает призрак верной буквы — ребёнок видит, что должно было быть.
   Никаких библиотек: только transform, opacity и clip-path. reduced-motion выключает всё. */
window.RUFEED = (function(){
  const F="Georgia,'Times New Roman',serif";
  const CSS=`
  #lvis .fb{position:relative;overflow:hidden;margin-top:14px;padding:14px 16px 14px 18px;border-left:3px solid var(--rule,rgba(255,215,106,.35));
    background:linear-gradient(90deg,rgba(255,215,106,.08),transparent 72%);font-family:${F};font-size:16px;line-height:1.55;
    transform-origin:top left;animation:fbUnfold 260ms cubic-bezier(.23,1,.32,1) both}
  #lvis .fb .lbl{display:block;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut,#dccfb0);margin-bottom:4px}
  #lvis .fb.ok{border-color:#9fd8b4}#lvis .fb.no{border-color:#e8735f}
  #lvis .fb .stamp{position:absolute;right:12px;top:6px;width:44px;height:44px;pointer-events:none}
  #lvis .fb .stamp .seal{fill:none;stroke:#9fd8b4;stroke-width:2.4}
  #lvis .fb .stamp .mark{stroke:#9fd8b4;stroke-width:3.2;fill:none;stroke-linecap:round;stroke-dasharray:40;stroke-dashoffset:40}
  #lvis .fb.no .stamp .seal,#lvis .fb.no .stamp .mark{stroke:#e8735f}
  #lvis .fb .ring{position:absolute;right:20px;top:14px;width:32px;height:32px;border-radius:50%;
    border:2px solid rgba(159,216,180,.65);pointer-events:none;animation:fbRing 520ms cubic-bezier(.2,0,0,1) 120ms both}
  #lvis .fb.no .ring{border-color:rgba(232,115,95,.6)}
  #lvis .fb .blot{position:absolute;left:6px;bottom:6px;width:22px;height:22px;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle,rgba(232,115,95,.55),transparent 70%);animation:fbBlot 420ms ease-out both}
  #lvis .fb.ok .stamp{animation:fbStamp 320ms cubic-bezier(.2,1.4,.3,1) 40ms both}
  #lvis .fb.no .stamp{animation:fbStampNo 260ms cubic-bezier(.36,.07,.19,.97) both}
  #lvis .fb.ok .stamp .mark{animation:fbMark 300ms cubic-bezier(.2,1,.32,1) 220ms both}
  #lvis .fb .ghost{color:rgba(255,215,106,.55)}
  @keyframes fbUnfold{from{opacity:0;transform:scaleY(.6)}to{opacity:1;transform:none}}
  @keyframes fbStamp{0%{opacity:0;transform:translateY(-14px) rotate(-10deg) scale(.92)}70%{transform:translateY(2px) rotate(2deg) scale(1.04)}100%{opacity:1;transform:none}}
  @keyframes fbStampNo{0%,100%{opacity:1;transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
  @keyframes fbMark{to{stroke-dashoffset:0}}
  @keyframes fbRing{0%{opacity:.9;transform:scale(.5)}100%{opacity:0;transform:scale(1.7)}}
  @keyframes fbBlot{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(1.5)}}
  @keyframes fbTremble{0%,100%{transform:none}25%{transform:translateY(-2px)}75%{transform:translateY(2px)}}
  /* буква, которая села верно, наливается светом; неверная — вздрагивает и тает */
  #lvis .ms .ink span.lit{animation:fbBloom 460ms cubic-bezier(.23,1,.32,1) both}
  #lvis .ms .ink span.bad{animation:fbTremble 220ms ease-out both,fbFade 300ms ease-out 240ms both}
  #lvis .s6 .word b.lit{animation:fbBloom 420ms cubic-bezier(.23,1,.32,1) both}
  #lvis .s6 .crate.hit::after{content:'';position:absolute;inset:-6px;border-radius:20px;border:2px solid rgba(143,209,168,.6);
    animation:fbRing 460ms cubic-bezier(.2,0,0,1) 60ms both;pointer-events:none}
  #lvis .s6 .crate{position:relative}
  @keyframes fbBloom{0%{opacity:.35;transform:scale(.92)}60%{transform:scale(1.05)}100%{opacity:1;transform:none}}
  @keyframes fbFade{to{opacity:.25}}
  @media (prefers-reduced-motion: reduce){#lvis .fb,#lvis .fb *,#lvis .fb *::before{animation-duration:.01ms!important;transition-duration:.01ms!important}
    #lvis .fb .ring,#lvis .fb .blot{display:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('fb-style'); if(!e){ e=document.createElement('style'); e.id='fb-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  /* html: содержимое глоссы; kind: 'ok' | 'no' | 'hint' */
  function note(kind, label, html, extra){
    css();
    const stamp = kind==='ok'
      ? `<svg class="stamp" viewBox="0 0 56 56"><circle class="seal" cx="28" cy="30" r="20"/><path class="mark" d="M18 31 L25 38 L39 23"/></svg><span class="ring"></span>`
      : (kind==='no' ? `<svg class="stamp" viewBox="0 0 56 56"><circle class="seal" cx="28" cy="30" r="20"/><path class="mark" d="M20 22 L36 38 M36 22 L20 38" stroke-dasharray="0"/></svg><span class="blot"></span>` : '');
    return `<div class="fb ${kind==='ok'?'ok':(kind==='no'?'no':'')}"><span class="lbl">${label}</span>${html}${stamp||''}${extra||''}</div>`;
  }
  return {note:note, css:css};
})();

/* ================= УСИЛЕНИЕ ДВИЖЕНИЯ: кадр живёт, ответ празднуется =================
   Было: движение 8–14 px за 240 мс — глазом не читается. Стало: крупный вход с
   пружиной, каскад 60 мс, световой проход по карточке, пыль в воздухе, дыхание
   подсветки; на верный ответ — подъём карточки, вспышка буквы, разлёт искр и печать
   с волной; на ошибку — наклон карточки, дрожь буквы и чернильный оттиск.
   Только transform и opacity, вход не длиннее 500 мс (motion-principles). */
window.RU601MOTION = (function(){
  const CSS=`
  /* --- живой фон кадра --- */
  #lvis .s6,#lvis .ms{position:relative;overflow:hidden}
  #lvis .s6 .word,#lvis .ms .ink{position:relative}
  #lvis .s6 .word .spark,#lvis .ms .ink .spark{overflow:visible}
  #lvis .s6{animation:cardIn 480ms cubic-bezier(.2,1.5,.3,1) both}
  #lvis .ms{animation:cardIn 480ms cubic-bezier(.2,1.5,.3,1) both}
  @keyframes cardIn{0%{opacity:0;transform:translateY(28px) scale(.96)}60%{transform:translateY(-4px) scale(1.01)}100%{opacity:1;transform:none}}
  #lvis .s6::after,#lvis .ms::after{content:'';position:absolute;top:-40%;bottom:-40%;width:180px;left:-240px;
    transform:skewX(-16deg);pointer-events:none;
    background:linear-gradient(90deg,transparent,rgba(255,231,170,.16),transparent);
    animation:sweep 3.4s cubic-bezier(.4,0,.2,1) 300ms infinite}
  @keyframes sweep{0%{left:-240px}55%{left:120%}100%{left:120%}}
  #lvis .amb{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit}
  #lvis .amb i{position:absolute;width:5px;height:5px;border-radius:50%;
    background:radial-gradient(circle,rgba(255,226,150,.85),transparent 70%);animation:drift 7s ease-in-out infinite}
  @keyframes drift{0%{opacity:0;transform:translateY(14px) scale(.6)}20%{opacity:.9}60%{opacity:.5;transform:translateY(-26px) translateX(10px) scale(1)}100%{opacity:0;transform:translateY(-52px) translateX(-6px) scale(.7)}}
  #lvis .haloGlow{position:absolute;left:50%;top:42%;width:min(78%,420px);height:150px;transform:translate(-50%,-50%);
    pointer-events:none;background:radial-gradient(closest-side,rgba(255,205,110,.22),transparent 70%);
    filter:blur(4px);animation:breathe 3.6s ease-in-out infinite}
  @keyframes breathe{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
  /* --- каскад: заметный вход --- */
  #lvis .s6 [data-anim]{animation-duration:420ms!important;animation-timing-function:cubic-bezier(.2,1.4,.3,1)!important;animation-delay:calc(var(--i,0)*60ms)!important}
  #lvis .ms .ink span{animation-duration:420ms!important;animation-delay:calc(var(--i,0)*70ms)!important;animation-timing-function:cubic-bezier(.2,1.4,.3,1)!important}
  /* --- ответ: подъём и наклон всей карточки --- */
  #lvis .s6.lift,#lvis .ms.lift{animation:lift 260ms cubic-bezier(.2,1.4,.3,1) both}
  #lvis .s6.tilt,#lvis .ms.tilt{animation:tiltCard 300ms cubic-bezier(.36,.07,.19,.97) both}
  @keyframes lift{0%{transform:none}45%{transform:translateY(-7px)}100%{transform:none}}
  @keyframes tiltCard{0%,100%{transform:none}20%{transform:rotate(-1.6deg)}55%{transform:rotate(1.6deg)}}
  /* --- буква и ящик --- */
  #lvis .ms .ink span.lit{animation:bigBloom 620ms cubic-bezier(.2,1.5,.3,1) both}
  @keyframes bigBloom{0%{opacity:.3;transform:scale(.86)}45%{transform:scale(1.16)}70%{transform:scale(1.02)}100%{opacity:1;transform:none}}
  #lvis .ms .ink span.bad{animation:buzz 260ms ease-out both}
  @keyframes buzz{0%,100%{transform:none}20%{transform:translateX(-4px) rotate(-2deg)}50%{transform:translateX(4px) rotate(2deg)}80%{transform:translateX(-2px)}}
  #lvis .s6 .crate.hit{animation:crateHit 460ms cubic-bezier(.2,1.5,.3,1) both}
  @keyframes crateHit{0%{transform:none}35%{transform:translateY(-12px) scale(1.03)}70%{transform:translateY(2px)}100%{transform:none}}
  #lvis .s6 .crate.miss{animation:crateMiss 300ms cubic-bezier(.36,.07,.19,.97) both}
  @keyframes crateMiss{0%,100%{transform:none}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
  /* --- искры на верный ответ --- */
  #lvis .spark{position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:50%;pointer-events:none;
    background:radial-gradient(circle,#fff3cf,rgba(255,205,110,.1) 70%);animation:spark 700ms cubic-bezier(.2,1,.3,1) both}
  @keyframes spark{0%{opacity:1;transform:translate(-50%,-50%) scale(.4)}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(1)}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6,#lvis .ms,#lvis .s6::after,#lvis .ms::after,#lvis .amb i,#lvis .haloGlow,#lvis .spark{animation:none!important}
    #lvis .s6 [data-anim],#lvis .ms .ink span{animation-duration:.01ms!important;animation-delay:0ms!important}}
  `;
  function css(){ try{ let e=document.getElementById('mot-style'); if(!e){ e=document.createElement('style'); e.id='mot-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  const DUST=[[10,72,0],[22,84,1.4],[36,66,2.6],[52,88,0.8],[66,70,2.1],[78,82,3.2],[88,64,1.1],[46,58,3.8]];
  function decorate(root){
    if(!root || root.querySelector('.amb')) return;
    const d=document.createElement('div'); d.className='amb';
    d.innerHTML=DUST.map(([x,y,t])=>`<i style="left:${x}%;top:${y}%;animation-delay:${t}s"></i>`).join('');
    root.insertBefore(d, root.firstChild);
    const g=document.createElement('div'); g.className='haloGlow'; root.insertBefore(g, d.nextSibling);
  }
  function sparks(root){
    try{
      const host=root.querySelector('.ink, .word, .crates') || root;
      for(let i=0;i<10;i++){
        const s=document.createElement('span'); s.className='spark';
        const a=(i/10)*Math.PI*2, r=54+Math.random()*34;
        s.style.setProperty('--dx', (Math.cos(a)*r).toFixed(1)+'px');
        s.style.setProperty('--dy', (Math.sin(a)*r).toFixed(1)+'px');
        s.style.animationDelay=(i*18)+'ms';
        host.appendChild(s);
        setTimeout(()=>{ try{s.remove();}catch(e){} }, 900);
      }
    }catch(e){}
  }
  /* наблюдаем состояние: как только ответ дан — подъём карточки, искры при верном, наклон при ошибке */
  function watch(){
    try{
      const lk=()=> (typeof lidKey==='function'&&typeof LV!=='undefined') ? lidKey(LV.id) : null;
      let last=null;
      setInterval(()=>{
        const host=document.getElementById('lvis'); if(!host) return;
        const root=host.querySelector('.s6, .ms'); if(!root) return;
        decorate(root);
        const k=lk(); if(!k||typeof CHS==='undefined'||!CHS[k]) return;
        const st=CHS[k];
        const step=(typeof LV!=='undefined'&&LV.step)||0;
        const sig=(st.gRes!=null?String(st.gRes):'')+'|'+(st.ans?JSON.stringify(st.ans).slice(0,80):'');
        if(sig===last) return;
        const fresh=(last!==null);
        last=sig;
        if(!fresh) return;
        const okNow = /"(ok|gOk)"/.test('') ? false : (st.gRes!=null ? (document.querySelector('#lvis .cell.ok,#lvis .crate.hit,#lvis .fb.ok,#lvis .seat.lit,.ink span.lit')!==null) : false);
        root.classList.add(okNow?'lift':'tilt');
        setTimeout(()=>root.classList.remove('lift','tilt'), 520);
        if(okNow) sparks(root);
      }, 90);
    }catch(e){}
  }
  watch();
  return {decorate:decorate, sparks:sparks};
})();

/* ================= Пролог и итог работ 611–614: первые три и последние два кадра =================
   Раньше эти кадры оставались прежними сценами. Теперь у них своя вёрстка в языке работ:
   пролог объясняет, что проверяет работа и сколько в ней вопросов; итог показывает балл,
   процент, отметку по школьной шкале и разбор всех ответов. */
window.RUWORKEDGES = (function(){
  const F="Georgia,'Times New Roman',serif";
  const CSS=`
  #lvis .rkw{box-sizing:border-box;max-width:100%;position:relative;width:100%;padding:clamp(14px,4vw,22px) clamp(12px,3.4vw,18px);
    border-radius:20px;font-family:${F};color:#f6efe0;overflow:hidden;
    background:radial-gradient(90% 60% at 50% 0%,rgba(255,205,110,.14),transparent 62%),linear-gradient(180deg,#1b2c24,#131e19);
    border:1px solid rgba(255,215,106,.26);box-shadow:0 22px 54px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05);
    display:flex;flex-direction:column;gap:14px}
  #lvis .rkw .kick{font-size:clamp(11px,3.2vw,14px);letter-spacing:.12em;text-transform:uppercase;color:#d8c9a6}
  #lvis .rkw h2{font-size:clamp(20px,6vw,24px);line-height:1.12;font-weight:600;color:#ffd76a;margin:0;letter-spacing:-.02em;text-wrap:balance}
  #lvis .rkw p{margin:0;font-size:clamp(15px,4.2vw,16px);line-height:1.55}
  #lvis .rkw .what{display:flex;flex-direction:column;gap:8px;margin-top:2px}
  #lvis .rkw .what li{position:relative;padding-left:22px;list-style:none;font-size:clamp(15px,4.2vw,16px);line-height:1.5}
  #lvis .rkw .what li::before{content:'';position:absolute;left:4px;top:9px;width:8px;height:8px;transform:rotate(45deg);
    background:linear-gradient(180deg,#ffd76a,#e2b23f)}
  #lvis .rkw .count{display:flex;gap:10px;flex-wrap:wrap;margin-top:2px}
  #lvis .rkw .pill{padding:8px 14px;border-radius:12px;border:1px solid rgba(255,215,106,.3);background:rgba(255,215,106,.10);
    font-size:clamp(14px,3.8vw,16px);color:#ffd76a;font-variant-numeric:tabular-nums}
  #lvis .rkw .score{font-size:clamp(34px,11vw,48px);font-weight:600;line-height:1;color:#fff6dd;font-variant-numeric:tabular-nums}
  #lvis .rkw .bands{display:flex;flex-direction:column;gap:6px;margin-top:4px}
  #lvis .rkw .band{display:flex;justify-content:space-between;gap:10px;padding:9px 12px;border-radius:12px;
    border:1px solid rgba(255,215,106,.18);font-size:clamp(15px,4.2vw,16px)}
  #lvis .rkw .band.on{border-color:#ffd76a;background:rgba(255,215,106,.12);color:#ffeaa8}
  #lvis .rkw .band span:last-child{color:#d8c9a6;font-variant-numeric:tabular-nums}
  #lvis .rkw .cta{width:100%;padding:16px 18px;border-radius:16px;border:1.5px solid #ffd76a;cursor:pointer;
    background:linear-gradient(180deg,#ffd76a,#e2b23f);color:#20180a;font-family:${F};font-size:clamp(16px,4.4vw,20px);font-weight:600;
    transition:transform 140ms cubic-bezier(.2,0,0,1)}
  #lvis .rkw .cta:active{transform:translateY(2px)}
  #lvis .rkw .cta:focus-visible{outline:3px solid #ffd76a;outline-offset:3px}
  #lvis .rkw .back{display:flex;gap:10px;flex-wrap:wrap}
  #lvis .rkw .back button{flex:1 1 44%;padding:13px 16px;border-radius:14px;border:1.5px solid rgba(255,215,106,.3);
    background:rgba(255,255,255,.05);color:#f6efe0;font-family:${F};font-size:clamp(15px,4vw,17px);cursor:pointer}
  #lvis .rkw .rev{display:flex;flex-direction:column;gap:6px}
  #lvis .rkw .rev div{display:flex;justify-content:space-between;gap:12px;padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.04);
    font-size:clamp(15px,4.2vw,16px)}
  #lvis .rkw .rev .ok{color:#b8e8cc}#lvis .rkw .rev .no{color:#f3b3aa}
  @media (prefers-reduced-motion: reduce){#lvis .rkw *{animation:none!important;transition:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('rkw-style'); if(!e){ e=document.createElement('style'); e.id='rkw-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function prolog(el,id,L,step){
    css();
    const txt=L.explain[step]||'';
    const cnt=(window.RU_EXAM_ITEMS&&window.RU_EXAM_ITEMS[id])?window.RU_EXAM_ITEMS[id].length:12;
    el.innerHTML=`<div class="rkw">
      <div class="kick">Проверочная работа · ${id} · шаг ${step+1} из ${L.explain.length}</div>
      <h2>${L.title||'Проверочная работа'}</h2>
      <p>${txt}</p>
      <ul class="what">
        <li>Проверяем ${id===611?'безударные гласные в корне':id===612?'парные согласные и непроизносимые согласные':id===613?'приставки, предлоги и разделительный знак':'функциональную грамотность'}</li>
        <li>Каждый вопрос с выбором ответа: буква встаёт в слово, правильность объясняется.</li>
        <li>В конце работы — балл, процент и отметка по школьной шкале.</li>
      </ul>
      <div class="count"><span class="pill">вопросов: ${cnt}</span><span class="pill">без ограничения времени</span></div>
      <p style="color:#d8c9a6">Читай задание до конца: подсказка говорит, что именно проверяется в этом слове.</p>
    </div>`;
  }
  function itog(el,id,L){
    css();
    const lk=(typeof lidKey==='function')?lidKey(LV.id):String(id);
    const st=(typeof CHS!=='undefined'&&CHS[lk])?CHS[lk]:{};
    const items=(window.RU_EXAM_ITEMS&&window.RU_EXAM_ITEMS[id])||[];
    const total=items.length||12;
    const ok=st.ok||0, bad=st.bad||0, answered=ok+bad;
    const pct=total?Math.round(ok*100/total):0;
    const bands=[['повышенный','больше 80 %',pct>80],['базовый','50–80 %',pct>50&&pct<=80],['пониженный','30–50 %',pct>30&&pct<=50],['недостаточный','меньше 30 %',pct<=30]];
    const rows=items.map((it,i)=>{
      const a=st.ans?st.ans[i]:null;
      return `<div><span>${i+1}. ${String(it.word||'').replace('_','_')}</span><span class="${a==null?'':(a===it.ans?'ok':'no')}">${a==null?'нет ответа':(a===it.ans?'верно: '+(it.spell||''):'ответ «'+a+'», нужно «'+it.ans+'»')}</span></div>`;
    }).join('');
    el.innerHTML=`<div class="rkw">
      <div class="kick">Итог работы · ${id}</div>
      <h2>${answered===total?'Работа пройдена':'Работа не закончена'}</h2>
      <div class="score">${ok} / ${total}</div>
      <p>Правильно ${ok}, ошибок ${bad}, без ответа ${total-answered}. Это ${pct} % работы.</p>
      <div class="bands">${bands.map(b=>`<div class="band ${b[2]?'on':''}"><span>${b[0]}</span><span>${b[1]}</span></div>`).join('')}</div>
      <div class="rev">${rows}</div>
      <div class="back">
        <button type="button" onclick="rkwRestart(${id})">Пройти заново</button>
        <button type="button" onclick="rkwToFirst(${id})">К первому вопросу</button>
      </div>
      <p style="color:#d8c9a6">Отметка по школьной шкале: 85 % и выше — «5», 65–84 % — «4», 45–64 % — «3». В МЦКО отметок нет, там уровень.</p>
    </div>`;
  }
  window.rkwRestart=(id)=>{ try{ const lk=lidKey(LV.id); CHS[lk]={ans:{},ok:0,bad:0}; LV.step=0; chRender(0); }catch(e){} };
  window.rkwToFirst=(id)=>{ try{ const L=ARH_LESSONS.find(x=>x.id===id); const i=L.explain.findIndex(t=>/^Вопрос 1 /.test(t)); LV.step=i>0?i:1; chRender(0); }catch(e){} };
  [611,612,613,614].forEach(id=>{
    if(!window.WAVE_B) return;
    const prev=window.WAVE_B[id]; if(typeof prev!=='function') return;
    window.WAVE_B[id]=function(el){
      try{
        const L=(window.ARH_LESSONS||[]).find(x=>x.id===id);
        const step=(typeof LV!=='undefined'&&LV.step)||0;
        if(L){
          const txt=L.explain[step]||'';
          const isQ=/^Вопрос \d+ из \d+\./.test(txt);
          const m=isQ?/^Вопрос (\d+) из (\d+)\./.exec(txt):null;
          const qi=m?parseInt(m[1],10)-1:-1;
          const items=(window.RU_EXAM_ITEMS||{})[id];
          /* вопросные кадры — прежний движок (важно для МЦКО: у неё свой формат) */
          if(items&&qi>=0&&items[qi]&&items[qi].word) return prev(el);
          const last=[L.explain.length-2, L.explain.length-1];
          if(last.indexOf(step)>=0){ itog(el,id,L); return; }        /* последние два кадра — итог */
          if(step<=2){ prolog(el,id,L,step); return; }                /* первые три — пролог */
          return prev(el);                                            /* середина — прежний кадр */
        }
      }catch(e){}
      return prev(el);
    };
  });
  return {prolog:prolog, itog:itog};
})();

/* ================= УРОК 615 «ПУТЬ МИШУТКИ» (русский язык) =================
   Десять заданий демонстрационного варианта олимпиады школы № 1517
   (school1517.ru/adt/20260910.pdf) — по условиям и ключу, с иллюстрациями,
   нарисованными заново в векторе: корзинки, столбчатая диаграмма, график
   температуры, координатная прямая, карта часовых поясов и часы, семья,
   клумба с заборчиком, карта округов, таблица тарифов, коврик с осями. */
window.RU615 = (function(){
  const F="Georgia,'Times New Roman',serif", G='#ffd76a', P='#f6efe0', M='#d8c9b8',
        AX='rgba(255,215,106,.45)', OK='#8fd1a8', NO='#e86a5a';
  const frame=(inner,h)=>`<svg viewBox="0 0 360 ${h}" width="100%" style="display:block;max-width:100%">${inner}</svg>`;
  const T=(x,y,s,size,fill,anchor)=>`<text x="${x}" y="${y}" text-anchor="${anchor||'middle'}" font-family="${F}" font-size="${size||12}" fill="${fill||M}">${s}</text>`;
  const ART={
    orehi: ()=>frame([0,1,2,3,4].map(i=>{const x=24+i*66;
      return `<path d="M${x} 118 L${x+54} 118 L${x+46} 156 L${x+8} 156 Z" fill="rgba(255,215,106,.10)" stroke="${AX}"/>`+
        [0,1,2].map(k=>`<circle cx="${x+17+k*10}" cy="${110-k*7}" r="5" fill="#c98b4a"/>`).join('')+
        T(x+27,146,['81','34','17','23','75'][i],13);}).join('')+T(180,180,'поровну на пять корзинок',14,G),200),
    chart: ()=>{const v=[3,6,8,5];
      return frame([0,2,4,6,8].map(t=>`<line x1="46" y1="${168-t*16}" x2="332" y2="${168-t*16}" stroke="rgba(255,255,255,.10)"/>`+
        T(40,172-t*16,t,11,M,'end')).join('')+
        v.map((n,i)=>{const h=n*16,x=78+i*62;
          return `<rect x="${x}" y="${168-h}" width="44" height="${h}" rx="5" fill="rgba(255,215,106,.55)" stroke="${G}"/>`+
            T(x+22,162-h,n,13,P)+T(x+22,186,'«'+(i+2)+'»',13,G);}).join('')+
        T(190,20,'результаты контрольной в 6 «В»',13),210);},
    temp: ()=>{const t=[-8,-10,0,10,12,16,17,16,12,4,-4,-8], y=v=>96-v*3.1;
      return frame([-16,-8,0,8,16].map(v=>`<line x1="34" y1="${y(v)}" x2="338" y2="${y(v)}" stroke="rgba(255,255,255,.10)"/>`+
        T(28,y(v)+4,v,10,M,'end')).join('')+
        `<rect x="84" y="${y(16)-8}" width="78" height="${y(-16)-y(16)+16}" fill="rgba(143,209,168,.14)" stroke="rgba(143,209,168,.45)" rx="6"/>`+
        `<polyline points="${t.map((v,i)=>`${46+i*24},${y(v)}`).join(' ')}" fill="none" stroke="${G}" stroke-width="2.2"/>`+
        t.map((v,i)=>`<circle cx="${46+i*24}" cy="${y(v)}" r="3" fill="${v>0?G:'#7fb7d8'}"/>`).join('')+
        ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'].map((m,i)=>T(46+i*24,118,m,9.5)).join('')+
        T(186,140,'весна выделена',12,'#9fd8b4'),160);},
    line: ()=>{const X=u=>40+u*62;
      return frame(`<line x1="24" y1="96" x2="342" y2="96" stroke="${P}" stroke-width="1.6"/>`+
        [0,1,2,3,4].map(u=>`<line x1="${X(u)}" y1="88" x2="${X(u)}" y2="104" stroke="${P}" stroke-width="1.6"/>`+T(X(u),122,u,12)).join('')+
        [['A',1.5],['B',2.105],['C',3.5]].map(([n,u])=>`<circle cx="${X(u)}" cy="96" r="5.5" fill="${G}"/>`+T(X(u),78,n,14,P)).join('')+
        T(186,150,'числа: 0,67 · 1,5 · 2,105 · 2,9 · 3,5',12.5),180);},
    zones: ()=>frame(
      [['МСК+6','Якутск',110],['МСК+5','Чита',180],['МСК+7','Магадан',250],['МСК+9','Анадырь',318]].map(([z,n,x],i)=>
        `<rect x="${x-32}" y="24" width="64" height="40" rx="8" fill="rgba(255,215,106,${i===0?.24:.08})" stroke="${AX}"/>`+
        T(x,44,z,12,G)+T(x,60,n,11)).join('')+
      `<line x1="36" y1="78" x2="336" y2="78" stroke="${AX}" stroke-dasharray="4 4"/>`+
      `<circle cx="76" cy="126" r="34" fill="none" stroke="${AX}" stroke-width="2"/>`+
      `<circle cx="76" cy="126" r="2.4" fill="${P}"/>`+
      `<line x1="76" y1="126" x2="${76+18*Math.cos((-75)*Math.PI/180)}" y2="${126+18*Math.sin((-75)*Math.PI/180)}" stroke="${P}" stroke-width="2.6" stroke-linecap="round"/>`+
      `<line x1="76" y1="126" x2="${76+26*Math.cos((150)*Math.PI/180)}" y2="${126+26*Math.sin((150)*Math.PI/180)}" stroke="${P}" stroke-width="2.6" stroke-linecap="round"/>`+
      T(200,120,'часы Коли: 19:50 по Якутску',12.5,G)+T(180,168,'разница с Москвой +6 часов',12),190),
    family: ()=>frame(
      [0,1,2].map(i=>`<g transform="translate(${84+i*54},66)"><circle r="12" fill="#5b8fc9"/><rect x="-12" y="0" width="24" height="30" rx="8" fill="#5b8fc9"/></g>`).join('')+
      [0,1].map(i=>`<g transform="translate(${118+i*54},142)"><circle r="12" fill="#d98aa8"/><rect x="-12" y="0" width="24" height="30" rx="8" fill="#d98aa8"/></g>`).join('')+
      T(180,192,'три мальчика и две девочки — пятеро детей',12.5),210),
    flower: ()=>frame(
      `<circle cx="150" cy="92" r="52" fill="rgba(143,209,168,.10)" stroke="#9fd8b4" stroke-width="2.4" stroke-dasharray="6 5"/>`+
      `<circle cx="150" cy="92" r="6" fill="${G}"/><line x1="150" y1="92" x2="150" y2="42" stroke="${AX}"/>`+
      T(158,40,'R',12.5,G)+T(150,164,'заборчик по границе: 18,84 м',13,P)+T(150,184,'π = 3,14',12),200),
    map: ()=>{const D=[[1,186,96],[2,168,64],[3,206,64],[4,236,78],[5,212,116],[6,186,128],[7,150,116],[8,138,92],[9,150,64],[10,62,34],[11,150,166],[12,108,176]];
      return frame(D.map(([n,x,y])=>`<circle cx="${x}" cy="${y}" r="${n===10?20:18}" fill="rgba(255,215,106,${n===10?.30:.09})" stroke="${AX}"/>`+
        T(x,y+4,n,12,G)).join('')+T(180,206,'12 округов Москвы · Зеленоградский стоит отдельно',12),220);},
    fares: ()=>frame(
      `<rect x="16" y="22" width="328" height="112" rx="12" fill="rgba(255,255,255,.04)" stroke="${AX}"/>`+
      `<line x1="16" y1="50" x2="344" y2="50" stroke="${AX}"/><line x1="16" y1="84" x2="344" y2="84" stroke="${AX}"/>`+
      ['Тройка','«90 минут»','банк. карта','биометрия'].map((h,i)=>T(120+i*60,42,h,10)).join('')+
      T(24,74,'метро',12,P,'start')+T(24,108,'наземный',12,P,'start')+
      ['57','85','64','53'].map((v,i)=>T(120+i*60,74,v,12,G)).join('')+
      ['57','85','64','—'].map((v,i)=>T(120+i*60,108,v,12,G)).join('')+
      T(180,160,'семья из трёх человек · цены в рублях',12.5),180),
    carpet: ()=>frame(
      `<polygon points="150,34 92,138 208,138" fill="rgba(143,209,168,.16)" stroke="#9fd8b4" stroke-width="2"/>`+
      `<line x1="150" y1="20" x2="150" y2="162" stroke="${G}" stroke-width="2.4"/>`+
      `<line x1="60" y1="86" x2="248" y2="86" stroke="${AX}" stroke-width="1.4"/>`+
      `<line x1="98" y1="150" x2="202" y2="30" stroke="${AX}" stroke-width="1.4"/>`+
      `<line x1="202" y1="150" x2="98" y2="30" stroke="${AX}" stroke-width="1.4"/>`+
      T(158,26,'b',13,P)+T(54,90,'c',13,P)+T(254,90,'a',13,P)+T(208,28,'d',13,P)+
      T(150,186,'какая прямая — ось симметрии?',12),200)
  };
  const Q=[
   {k:'orehi',t:'Орехи в корзинках',q:'81, 34, 17, 23 и 75 орехов разложили в пять корзинок поровну. Сколько орехов в каждой корзинке?',opts:['46','40','50'],ans:'46',why:'Сумма 230, делим на 5 — 46.'},
   {k:'chart',t:'Результаты контрольной',q:'На диаграмме — отметки в 6 «В»: «2» — 3, «3» — 6, «4» — 8, «5» — 5. Сколько всего учеников писало работу?',opts:['22','18','24'],ans:'22',why:'3 + 6 + 8 + 5 = 22.'},
   {k:'temp',t:'Температура весной',q:'График среднемесячной температуры воздуха в Нижнем Новгороде за 1994 год. Определи по диаграмме наибольшую среднемесячную температуру весной.',opts:['10 °C','12 °C','16 °C'],ans:'10 °C',why:'Весна — март, апрель, май: март −4, апрель 6, май 10 — наибольшая 10 °C.'},
   {k:'theatre',t:'Сколько мест в зале',q:'На спектакль продано 210 билетов. Сколько всего мест в зале театра, если продано две трети всех билетов?',opts:['315','280','420'],ans:'315',why:'210 — это две трети, значит одна треть 210 : 2 = 105, а всего 105 × 3 = 315.'},
   {k:'line',t:'Точки на прямой',q:'Точки A, B и C на координатной прямой. Установи соответствие и запиши три номера их координат подряд: A, B, C.',opts:['412','415','214'],ans:'412',why:'A → 1,5 (номер 4); B → 2,105 (номер 1); C → 3,5 (номер 2).'},
   {k:'zones',t:'Посадка самолёта',q:'Коля летит из Якутска (МСК+6) в Москву. Часы показывают 19:50 по Якутску, до посадки 2 часа. Во сколько сядет самолёт по московскому времени?',opts:['15:50','21:50','13:50'],ans:'15:50',why:'19:50 − 6 = 13:50, плюс 2 часа — 15:50.'},
   {k:'family',t:'Пятеро детей',q:'В семье Михайловых пятеро детей: три мальчика и две девочки. Укажи номера истинных утверждений двумя цифрами.',opts:['34','12','23'],ans:'34',why:'Мальчиков больше, чем девочек; у каждого мальчика два брата и две сестры.'},
   {k:'flower',t:'Круглая клумба',q:'Заборчик по границе круглой клумбы — 18,84 м, π = 3,14. Найди площадь клумбы.',opts:['28,26 м²','18,84 м²','56,52 м²'],ans:'28,26 м²',why:'R = 18,84 : 6,28 = 3 м; S = 3,14 × 9 = 28,26 м².'},
   {k:'carpet',t:'Ось симметрии',q:'Треугольный коврик и прямые a, b, c, d. Какая прямая является осью симметрии?',opts:['b','a','d'],ans:'b',why:'Ось проходит через вершину и середину основания.',},
   {k:'map',t:'Карта Москвы',q:'Зеленоградский административный округ не граничит ни с одним другим округом. Каким номером он обозначен на карте?',opts:['10','1','12'],ans:'10',why:'Зеленоградский — 10: он стоит отдельно на северо-западе, в стороне от остальных.'},
   {k:'map',t:'Самый большой округ',q:'Троицкий округ граничит только с Новомосковским и занимает самую большую площадь среди всех округов Москвы. Каким номером он обозначен?',opts:['12','11','1'],ans:'12',why:'12 — Троицкий, самый большой по площади; 11 — Новомосковский, он граничит с ЗАО и ЮЗАО.'},
   {k:'fares',t:'Проезд семьи',q:'Семья из трёх человек едет в центр Москвы. Билет «90 минут» стоит 85 рублей. Сколько заплатит семья, если каждый возьмёт такой билет?',opts:['255','171','342'],ans:'255',why:'85 × 3 = 255; по отдельным поездкам на метро вышло бы дороже.'},
   {k:'taxi',t:'Такси «Комфорт»',q:'Поездка на такси в тарифе «Эконом» стоит 680 рублей. Сколько стоит поездка в тарифе «Комфорт», если она дороже на 5 %?',opts:['714','685','700'],ans:'714',why:'5 % от 680 — это 34 рубля; 680 + 34 = 714 рублей.'}
  ];
  const CSS=`
  #lvis .mk{box-sizing:border-box;max-width:100%;width:100%;font-family:${F};color:${P};display:flex;flex-direction:column;gap:14px}
  #lvis .mk .kick{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${M}}
  #lvis .mk h2{font-size:clamp(20px,5.6vw,24px);line-height:1.14;font-weight:600;color:${G};margin:0;letter-spacing:-.02em}
  #lvis .mk .art{background:linear-gradient(180deg,#1d3027,#15231c);border:1px solid rgba(255,215,106,.24);border-radius:18px;padding:12px 10px;box-shadow:0 16px 38px rgba(0,0,0,.45)}
  #lvis .mk .q{font-size:clamp(15px,4.2vw,17px);line-height:1.5}
  #lvis .mk .opts{display:flex;gap:12px;flex-wrap:wrap}
  #lvis .mk .opt{flex:1 1 28%;min-width:88px;padding:15px 12px;border-radius:16px;cursor:pointer;font-family:${F};
    font-size:clamp(17px,4.8vw,20px);font-weight:600;color:${P};background:linear-gradient(180deg,#25392e,#182720);
    border:1.5px solid rgba(255,215,106,.26);transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 160ms}
  #lvis .mk .opt:active{transform:translateY(2px)}
  #lvis .mk .opt:focus-visible{outline:3px solid ${G};outline-offset:3px}
  #lvis .mk .opt.good{border-color:${OK}}#lvis .mk .opt.bad{border-color:${NO}}
  #lvis .mk .prog{display:flex;gap:5px}#lvis .mk .prog i{width:9px;height:9px;transform:rotate(45deg);border:1px solid rgba(255,215,106,.35)}
  #lvis .mk .prog i.done{background:linear-gradient(180deg,#ffd76a,#e2b23f)}
  `;
  function css(){ try{ let e=document.getElementById('mk-style'); if(!e){ e=document.createElement('style'); e.id='mk-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function render(el){
    css();
    const lk=(typeof lidKey==='function')?lidKey(615):'615';
    if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={ans:{}}; const st=CHS[lk]; if(!st.ans) st.ans={};
    const step=Math.max(0,Math.min(Q.length-1,((typeof LV!=='undefined'&&LV.step)||0)));
    const it=Q[step], picked=st.ans[step], done=picked!=null, ok=picked===it.ans;
    el.innerHTML=`<div class="mk">
      <div class="kick">Путь Мишутки · шаг ${step+1} из ${Q.length}</div>
      <div class="prog">${Q.map((_,i)=>`<i class="${st.ans[i]!=null?'done':''}"></i>`).join('')}</div>
      <h2>${it.t}</h2>
      <div class="art">${ART[it.k]()}</div>
      <div class="q">${it.q}</div>
      <div class="opts">${it.opts.map(o=>`<button type="button" class="opt ${done?(o===it.ans?'good':(o===picked?'bad':'')):''}" onclick="mkPick(${step},'${o}')">${o}</button>`).join('')}</div>
      ${done ? (ok ? window.RUFEED.note('ok','верно',it.why) : window.RUFEED.note('no','исправить','Правильно «'+it.ans+'». '+it.why))
             : `<div class="q" style="color:${M}">Задача из демонстрационного варианта олимпиады школы № 1517.</div>`}
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${step>0?`<button type="button" class="opt" style="flex:1 1 40%" onclick="mkStep(-1)">← Назад</button>`:''}
        ${step<Q.length-1?`<button type="button" class="opt" style="flex:1 1 40%" onclick="mkStep(1)">Дальше →</button>`:''}
      </div></div>`;
  }
  window.mkPick=(i,o)=>{ const lk=lidKey(615); CHS[lk].ans=CHS[lk].ans||{}; if(CHS[lk].ans[i]!=null) return; CHS[lk].ans[i]=o; chRender(0); };
  window.mkStep=(d)=>{ try{ const n=((typeof LV!=='undefined'&&LV.step)||0)+d; if(n<0||n>=Q.length) return; LV.step=n; chRender(0); }catch(e){} };
  if(window.ARH_LESSONS && !window.ARH_LESSONS.some(x=>x.id===615)){
    window.ARH_LESSONS.push({id:615,title:'Демоверсия МЦКО: 13 заданий',ico:'🐻',src:'Функциональная грамотность · 6 класс · Демонстрационный вариант',subj:'rus',group:'mish',
      explain:Q.map((x,i)=>(i+1)+'. '+x.t),
      check:{q:'Зеленоградский округ не граничит ни с одним другим. Каким номером он обозначен на карте Москвы?',
        choices:['10','1','12'],ans:0,exp:'Зеленоградский — 10: он стоит отдельно на северо-западе, в стороне от остальных округов.'},
      tasks:[
        {q:'Поездка на такси в тарифе «Эконом» стоит 680 рублей. Сколько стоит поездка в «Комфорте», если она дороже на 5 %?',
         kind:'unit',ans:714,tol:0,
         hints:['Сначала найди 1 % от 680 рублей.','1 % — это 6,8 рубля, значит 5 % — 34 рубля.'],
         sol:'680 + 34 = 714 рублей.'},
        {q:'На спектакль продано 210 билетов, это две трети всех мест. Сколько всего мест в зале?',
         kind:'unit',ans:315,tol:0,
         hints:['210 — это две трети, значит одна треть в два раза меньше.','Одна треть — 105, а мест в зале три трети.'],
         sol:'105 × 3 = 315 мест.'}
      ],img:'img/mishutka-head.png'});
  }
  if(window.WAVE_B) window.WAVE_B[615]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
  return {render:render,data:Q,art:ART};
})();

/* ================= ПУТЬ МИШУТКИ: лист задания, а не тёмная панель =================
   По совету скил-базы (раздел стилей): E-Ink / Paper — бумага, матовость, высокий
   контраст, спокойствие, без бликов и лишнего движения. Кадр собран как страница
   задания из PDF: номер задания, рамка вокруг рисунка, условие, варианты списком,
   пометка проверки. Ширина ограничена колонкой приложения, во весь экран не растягивается. */
window.RU615PAPER = (function(){
  const F="Georgia,'Times New Roman',serif";
  const INK='#2a2118', MUT='#6b5b45', RULE='#d8c9a8', PAPER='#f7f1e4', PAPER2='#fffdf7', OKC='#2f6b46', NOC='#9c2f22';
  const CSS=`
  #lvis .pp{box-sizing:border-box;width:100%;max-width:520px;margin:0 auto;font-family:${F};color:${INK};
    background-color:#fdf6e0;
    background-image:
      linear-gradient(rgba(96,128,168,.22) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,128,168,.22) 1px, transparent 1px),
      linear-gradient(180deg,#fffaea,#fbf1d6);
    background-size:20px 20px, 20px 20px, 100% 100%;
    background-position:0 0, 0 0, 0 0;
    border:1px solid ${RULE};border-radius:14px;
    padding:clamp(14px,4vw,22px) clamp(14px,4vw,24px) clamp(16px,4.4vw,24px);
    box-shadow:0 10px 26px rgba(26,20,12,.28),inset 0 1px 0 rgba(255,255,255,.7);
    display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden}
  #lvis .pp::after{content:'';position:absolute;top:0;bottom:0;left:38px;width:1px;pointer-events:none;
    background:linear-gradient(180deg,rgba(200,90,100,0),rgba(200,90,100,.5) 8%,rgba(200,90,100,.5) 92%,rgba(200,90,100,0))}
  #lvis .pp .head{position:static;width:auto;display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    border-bottom:1px solid ${RULE};padding-bottom:8px}
  #lvis .pp .num{font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:${MUT}}
  #lvis .pp .of{font-size:14px;color:${MUT};font-variant-numeric:tabular-nums}
  #lvis .pp h2{font-size:20px;line-height:1.2;font-weight:600;margin:0;color:${INK};letter-spacing:-.01em}
  #lvis .pp .fig{border:1px solid ${RULE};border-radius:10px;background:rgba(255,253,247,.92);padding:10px 8px}
  #lvis .pp .fig svg *{stroke-linecap:round}
  #lvis .pp .q{font-size:16px;line-height:1.55;color:${INK}}
  #lvis .pp .opts{display:flex;flex-direction:column;gap:10px}
  #lvis .pp .opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;cursor:pointer;
    padding:clamp(11px,3.2vw,14px) clamp(12px,3.4vw,16px);border-radius:10px;border:1px solid ${RULE};
    background:${PAPER2};font-family:${F};font-size:clamp(15px,4.2vw,17px);color:${INK};
    transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 140ms,background 140ms}
  #lvis .pp .opt:hover{border-color:#b9a67f}
  #lvis .pp .opt:active{transform:translateY(1px)}
  #lvis .pp .opt:focus-visible{outline:3px solid ${INK};outline-offset:3px}
  #lvis .pp .opt .k{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid ${RULE};
    display:flex;align-items:center;justify-content:center;font-size:14px;color:${MUT}}
  #lvis .pp .opt.good{border-color:${OKC};background:#eef6ef}
  #lvis .pp .opt.good .k{border-color:${OKC};color:${OKC}}
  #lvis .pp .opt.bad{border-color:${NOC};background:#fbeeec}
  #lvis .pp .opt.bad .k{border-color:${NOC};color:${NOC}}
  #lvis .pp .mark{display:flex;gap:10px;align-items:flex-start;border-top:1px solid ${RULE};padding-top:10px;
    animation:ppIn 260ms cubic-bezier(.23,1,.32,1) both}
  #lvis .pp .mark svg{flex:none;width:26px;height:26px}
  #lvis .pp .mark .d{stroke-dasharray:34;stroke-dashoffset:34;animation:ppDraw 360ms cubic-bezier(.2,1,.32,1) 120ms both}
  #lvis .pp .mark p{margin:0;font-size:16px;line-height:1.5}
  #lvis .pp .mark.ok p{color:${OKC}}#lvis .pp .mark.no p{color:${NOC}}
  @keyframes ppIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @keyframes ppDraw{to{stroke-dashoffset:0}}
  /* Прячем персонажа приложения, пока открыт лист. Правило живёт и здесь, а не
     только в каркасе .s6: лист может быть первым, что открыл ученик, и тогда
     тот стиль ещё не выложен. Раньше это делал JS — он ставил inline
     display:none и не снимал его, поэтому помощник пропадал навсегда. */
  body:has(#lvis .pp) .avatar,body:has(#lvis .pp) .mascot,body:has(#lvis .pp) .assistant,body:has(#lvis .pp) .guide{display:none!important}
  @media (prefers-reduced-motion: reduce){#lvis .pp *{animation:none!important;transition:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('pp-style'); if(!e){ e=document.createElement('style'); e.id='pp-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function render(el){
    css();
    /* Класс paper-mode на body не ставим: он нигде не снимался, и после первого
       же листа помощник пропадал до конца сеанса. Персонажа прячет CSS-правило
       body:has(#lvis .pp) — оно само перестаёт действовать, когда лист закрыт. */
    const src=window.RU615; if(!src||!src.data) return;
    const Q=src.data, ART=src.art;
    const lk=(typeof lidKey==='function')?lidKey(615):'615';
    if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={ans:{}}; const st=CHS[lk]; if(!st.ans) st.ans={};
    const step=Math.max(0,Math.min(Q.length-1,((typeof LV!=='undefined'&&LV.step)||0)));
    const it=Q[step], picked=st.ans[step], done=picked!=null, ok=picked===it.ans;
    const art=`<div class="fig" style="filter:invert(0)">${String(ART[it.k]()).replace(/fill="#f6efe0"/g,'fill="#2a2118"').replace(/fill="#d8c9b8"/g,'fill="#6b5b45"').replace(/fill="#ffd76a"/g,'fill="#8a6a1f"').replace(/rgba\(255,215,106,\.45\)/g,'rgba(138,106,31,.5)').replace(/rgba\(255,255,255,\.10\)/g,'rgba(42,33,24,.12)').replace(/fill="#9fd8b4"/g,'fill="#2f6b46"').replace(/fill="#8fd1a8"/g,'fill="#2f6b46"').replace(/fill="#7fb7d8"/g,'fill="#2a5f8a"').replace(/fill="#5b8fc9"/g,'fill="#2a5f8a"').replace(/fill="#d98aa8"/g,'fill="#9c4a63"').replace(/fill="#c98b4a"/g,'fill="#8a5a2a"').replace(/fill="#e86a5a"/g,'fill="#9c2f22"').replace(/fill="#f6efe0"/g,'fill="#2a2118"')}</div>`;
    el.innerHTML=`<div class="pp">
      <div class="head"><div class="num">Задание ${step+1} из ${Q.length}</div>
        <div class="of" style="display:flex;align-items:center;gap:8px">
          <img src="img/mishutka-head.png" alt="Мишутка" style="width:34px;height:34px;object-fit:contain;border-radius:50%">Путь Мишутки</div></div>
      <h2>${it.t}</h2>
      ${art}
      <div class="q">${it.q}</div>
      <div class="opts">${it.opts.map((o,i)=>`<button type="button" class="opt ${done?(o===it.ans?'good':(o===picked?'bad':'')):''}" onclick="mkPick(${step},'${o}')">
        <span class="k">${i+1}</span><span>${o}</span></button>`).join('')}</div>
      ${done ? `<div class="mark ${ok?'ok':'no'}">
          <svg viewBox="0 0 24 24">${ok?`<path class="d" d="M4 13 L10 19 L20 6" fill="none" stroke="${OKC}" stroke-width="2.6"/>`
            :`<path class="d" d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="${NOC}" stroke-width="2.6"/>`}</svg>
          <p>${ok?'Верно. ':'Правильно «'+it.ans+'». '}${it.why}</p></div>`
        : `<div class="q" style="color:${MUT}">Задача из демонстрационного варианта олимпиады школы № 1517.</div>`}
    </div>`;   /* свою строку «Назад / Дальше» лист не рисует: эти кнопки даёт приложение, иначе они дублируются */
  }
  if(window.WAVE_B) window.WAVE_B[615]=function(el){
    try{ render(el); }catch(e){ try{ window.RU615.render(el); }catch(e2){ el.innerHTML=''; } }
    /* Персонажа гасит CSS (body:has(#lvis .pp)), а не JS: прежнее гашение
       ставило inline display:none и не снимало его — помощник исчезал навсегда. */
  };
  return {render:render};
})();

/* ================= Иллюстрации 615 — сверены с демовариантом =================
   Источник: school1517.ru/adt/20260910.pdf (демовариант олимпиады школы № 1517).
   Локальная копия и вырезы: deploy/615/. Что именно сверено:
   · задание 2 — столбчатая диаграмма отметок: поле 10,4 клетки, столбцы 1,48
     клетки шириной, шаг 2,5 клетки, ось 0…9 с сеткой через 1;
   · задание 3 — столбчатая диаграмма температуры: ось −16…18 с подписью 18
     сверху, сетка через 2, подписи через 4, значения столбцов прочитаны с
     растра (−6, −13, −4, 6, 10, 14, 16, 15, 13, 5, −3, −10);
   · задание 4 — координатная прямая: семь делений, подписаны только 0 и 1;
   · задание 5 — карта часовых поясов ДФО и часы Коли на 19:50;
   · задание 8 — карта Москвы: контуры 12 округов векторизованы из растра;
   · задание 9 — таблица тарифов со сноской про условия «90 минут»;
   · задание 10 — треугольный коврик: c и d наклонены как в файле, прямые
     выходят за треугольник.
   Карты — настоящие очертания из файла, а не упрощённый силуэт. */
(function(){
  const F="Georgia,'Times New Roman',serif";
  const INK='#2a2118', MUT='#6b5b45', GRIDC='rgba(42,33,24,.18)', LINE='rgba(42,33,24,.8)';
  const BLUE='#2f7fb8', ICE='#c3e2f2', GOLD='#8a6a1f';
  const sv=(inner,h)=>`<svg viewBox="0 0 360 ${h}" width="100%" style="display:block;max-width:100%">${inner}</svg>`;
  const tx=(x,y,s,size,fill,anchor,rot)=>`<text x="${x}" y="${y}"${rot?' transform="rotate(-90 '+x+' '+y+')"':''} text-anchor="${anchor||'middle'}" font-family="${F}" font-size="${size||11}" fill="${fill||MUT}">${s}</text>`;

/* ---- Карта Москвы: контуры 12 округов, векторизованные из демоварианта
   (deploy/615/emb/p4_0.jpeg — вырез карты из school1517.ru/adt/20260910.pdf).
   Порядок, номера и взаимное положение округов — как в файле; это настоящие
   очертания, а не упрощённый силуэт. Система координат: viewBox 0 0 360 428. ---- */
  const MOSCOW={
    '1':['M266.8,137.0 262.6,136.3 259.1,134.8 256.6,132.3 253.5,131.1 249.7,131.1 246.9,132.3 245.1,134.8 242.3,134.8 238.5,132.3 236.7,132.6 236.7,135.8 236.0,137.9 234.8,139.2 232.3,139.8 228.6,139.8 224.8,141.6 221.1,145.4 219.5,148.5 220.2,151.0 222.7,151.2 226.9,149.5 230.7,149.1 233.9,150.4 234.8,153.2 233.5,157.5 231.4,160.9 228.2,163.4 226.7,165.9 226.7,168.4 227.7,169.9 229.4,170.7 231.7,169.9 234.2,168.2 236.0,167.4 237.3,168.2 239.4,167.4 242.6,165.7 246.0,164.7 249.7,164.7 255.1,163.4 261.8,160.9 265.6,159.1 266.3,157.8 265.1,155.7 261.8,152.5 260.3,150.0 260.3,148.2 262.2,146.0 265.9,143.5 268.0,141.0 268.8,138.5Z'],
    '2':['M217.7,76.3 212.0,81.2 208.0,84.0 205.5,84.7 203.7,86.2 202.4,88.7 202.0,91.8 202.8,95.6 204.0,98.1 205.8,99.3 208.0,103.0 210.5,109.3 211.5,114.2 210.8,118.0 211.8,124.2 214.2,132.9 216.7,139.2 219.2,142.9 221.7,143.3 224.2,140.0 227.9,138.3 232.9,137.5 234.4,129.8 232.7,114.9 231.9,104.7 232.7,98.9 231.9,92.2 230.2,84.0 226.9,78.5 222.7,75.3Z','M186.6,50.4 183.4,51.1 180.4,50.4 177.1,48.6 173.8,48.2 170.0,49.5 169.2,51.1 170.9,52.9 170.9,54.8 169.2,56.6 170.7,59.1 175.6,62.3 177.9,65.1 177.1,67.5 178.1,68.2 180.6,66.9 181.6,65.7 180.9,64.4 181.6,62.8 183.4,61.1 184.4,58.6 184.4,55.3 185.4,52.9 187.1,51.1Z'],
    '3':['M225.5,52.6 223.0,55.1 222.0,59.1 222.7,64.8 225.5,70.0 230.4,75.0 234.4,89.7 237.7,113.9 240.6,127.1 243.9,128.8 247.2,128.8 251.0,127.1 253.1,124.2 253.8,120.5 255.3,117.1 257.8,113.9 259.1,110.5 259.1,106.8 262.8,99.7 270.3,89.0 272.5,82.7 269.3,81.0 262.8,79.4 252.8,78.1 243.5,76.0 234.8,72.8 229.4,70.3 227.7,68.5 227.3,64.1 228.6,57.3 228.6,53.2 227.3,52.0Z'],
    '4':['M275.9,90.0 274.6,92.5 275.0,94.9 276.8,97.4 276.8,99.7 275.0,101.4 272.2,102.4 268.4,102.4 265.9,103.0 264.7,104.3 262.2,111.1 258.5,123.6 260.1,131.1 266.8,133.5 271.5,136.0 274.0,138.5 275.3,142.3 275.3,147.2 285.5,156.6 306.1,170.3 317.6,176.1 320.1,174.4 323.8,173.1 328.8,172.4 332.5,170.9 335.0,168.4 336.0,166.5 335.3,165.3 331.3,165.7 323.8,167.4 318.2,167.2 314.5,164.7 314.5,160.9 318.2,156.0 318.8,154.1 316.4,155.3 313.2,155.3 309.5,154.1 307.9,150.0 308.6,143.3 308.3,133.3 307.0,120.1 300.2,107.6 287.7,95.9 280.2,89.7 277.8,89.0Z'],
    '5':['M264.1,148.2 264.1,150.0 265.6,152.8 268.8,156.6 268.0,159.7 263.8,162.2 260.9,164.7 259.7,167.2 259.7,170.3 260.9,174.0 263.8,176.1 268.0,176.9 271.3,178.1 273.0,179.9 274.0,182.4 274.0,185.6 271.3,189.3 265.6,193.6 262.8,197.1 262.8,199.5 265.1,202.3 269.3,205.5 275.0,206.8 281.7,206.0 286.7,204.8 290.0,203.0 292.4,203.0 294.2,204.8 294.9,206.4 294.2,207.6 294.6,209.5 295.8,212.0 298.9,210.8 303.9,205.8 306.6,200.5 307.4,194.8 307.0,190.8 305.8,188.3 306.1,186.5 307.9,185.2 310.1,185.6 312.6,187.3 314.1,185.6 314.9,179.9 304.9,170.7 284.2,157.5 274.0,148.7 274.0,144.5 271.5,143.5 266.5,146.0Z','M331.1,162.8 330.3,164.1 331.3,164.4 333.8,163.7 335.7,164.4 336.9,166.2 336.0,169.0 332.8,172.8 330.7,174.6 329.4,174.6 330.1,175.9 332.5,178.4 332.8,181.1 331.1,184.4 333.2,187.1 339.4,189.6 342.8,189.3 343.5,186.1 342.5,183.1 340.0,179.9 340.0,176.9 342.5,173.6 340.6,169.7 334.4,164.7Z'],
    '6':['M249.1,168.2 246.6,169.9 244.4,170.3 242.6,169.0 241.6,170.7 241.6,174.9 242.6,177.8 244.4,179.0 246.4,181.9 248.1,186.1 248.1,191.1 246.4,196.8 246.0,200.5 247.2,202.3 246.0,204.8 242.3,208.0 239.4,212.2 237.7,218.0 237.7,222.6 239.4,226.3 239.8,230.4 238.5,234.7 238.5,237.2 239.8,237.9 241.6,237.5 244.1,236.3 245.4,234.7 245.4,232.9 244.8,232.2 243.5,232.9 242.3,232.5 241.0,231.3 240.4,229.4 240.4,226.9 241.4,224.7 243.1,223.0 244.4,223.0 245.1,224.7 246.6,225.9 249.1,226.7 251.0,225.9 252.2,224.2 254.1,223.2 256.6,223.2 260.1,224.7 264.3,227.9 266.8,229.2 267.5,228.4 266.8,227.6 265.1,226.3 265.3,225.1 267.8,223.8 270.3,224.2 272.8,225.9 273.0,228.8 271.3,232.5 272.5,233.2 276.8,230.7 281.7,225.9 287.5,219.2 290.5,216.0 291.2,216.7 291.5,215.1 291.5,211.4 290.8,209.3 289.6,208.5 287.7,209.3 285.2,211.0 279.6,211.8 270.9,211.0 266.3,209.8 265.6,208.0 263.4,205.8 259.7,203.3 257.8,200.2 257.8,196.4 260.3,192.7 265.3,189.0 267.5,186.1 266.8,184.4 265.6,184.4 263.8,186.1 260.3,187.3 255.3,188.1 251.6,187.3 249.1,185.6 248.5,183.6 249.7,181.9 251.0,181.1 252.2,181.9 254.1,181.1 256.6,179.4 257.6,176.1 256.8,171.9 255.1,169.0 251.9,167.8Z'],
    '7':['M227.9,175.9 220.5,183.4 217.4,188.3 218.6,190.8 215.2,195.8 207.0,203.3 205.3,211.4 209.5,220.1 215.5,227.2 223.0,232.9 226.7,236.9 226.7,239.4 227.7,241.6 229.4,243.4 229.8,245.9 228.6,249.1 226.7,250.6 224.2,250.6 219.2,252.8 211.8,257.1 208.0,259.9 208.0,261.2 210.5,262.1 215.5,262.8 220.2,265.3 224.5,269.5 226.4,272.4 225.7,273.6 226.9,272.8 230.2,269.5 232.3,268.7 233.5,269.9 234.2,272.0 234.2,275.3 236.0,277.0 239.8,277.8 239.8,275.3 236.0,269.5 234.8,262.4 236.0,253.7 237.7,247.9 239.4,244.6 238.9,241.6 235.7,238.4 233.9,232.9 233.2,224.7 233.5,219.5 234.8,217.0 235.2,213.9 234.4,210.1 235.7,207.3 238.9,205.5 241.0,203.0 242.3,199.8 242.9,195.8 242.9,190.8 241.0,184.4 237.3,176.1 234.4,172.2 232.7,172.2Z'],
    '8':['M229.2,154.5 224.2,156.2 220.5,156.2 218.0,154.5 215.7,151.6 214.0,147.9 211.5,145.8 208.3,145.0 206.8,147.0 206.8,151.2 204.9,154.7 201.2,157.2 197.8,157.2 194.6,154.7 193.7,152.2 194.9,149.7 196.8,148.2 199.3,147.5 199.9,145.4 198.7,141.6 196.8,140.4 194.3,141.6 189.1,142.0 180.9,141.3 176.6,143.8 175.9,149.5 177.5,157.8 181.2,169.0 182.1,175.9 180.4,178.4 178.4,178.1 176.6,174.9 175.6,174.4 175.6,176.1 175.0,177.8 173.8,179.0 172.5,179.4 171.3,178.6 169.2,180.2 165.9,184.0 165.4,186.5 167.2,187.7 169.2,188.1 170.9,187.3 171.7,186.5 170.9,185.2 171.7,183.6 173.4,181.9 176.9,179.9 181.9,178.1 185.9,179.6 189.1,184.6 189.6,188.1 187.8,189.8 187.5,191.8 188.7,193.6 188.3,195.6 186.6,197.3 184.1,197.7 180.9,196.4 178.8,196.8 177.5,198.6 176.3,198.3 175.0,195.8 173.4,195.6 171.7,197.3 170.4,198.1 169.7,197.3 168.4,199.8 166.7,205.5 167.2,208.5 170.4,209.3 173.2,210.8 175.6,213.2 177.5,213.9 178.8,212.6 181.2,212.0 185.0,212.0 186.8,208.9 186.8,202.7 188.1,198.6 190.6,196.8 194.3,198.6 199.3,204.3 205.3,203.9 212.0,197.7 215.5,192.7 215.5,189.0 218.2,184.0 224.0,177.8 225.7,173.4 224.0,170.9 223.0,168.4 223.0,165.9 224.8,163.2 228.6,159.9 230.7,157.2 231.4,154.7Z','M42.6,157.0 43.4,158.7 44.6,159.7 46.4,159.7 49.2,157.2 53.0,152.2 55.5,150.4 56.7,151.6 56.7,153.5 55.5,156.0 57.6,159.4 63.3,163.7 67.6,165.7 70.8,164.9 73.5,165.9 76.0,168.4 77.3,170.7 77.3,172.4 77.9,172.4 79.1,170.7 81.2,170.3 84.5,171.5 87.0,170.3 88.7,166.5 90.7,165.7 92.5,167.4 95.7,168.4 99.9,168.4 103.2,167.2 104.9,164.7 102.2,163.4 94.7,163.4 89.5,164.7 86.2,167.2 84.5,167.4 83.7,165.7 81.6,163.4 77.9,160.9 76.0,158.5 76.0,156.0 74.2,154.7 70.4,154.7 67.9,153.5 66.7,151.0 64.6,150.7 61.3,152.5 59.2,152.8 58.0,151.6 58.3,150.4 60.1,149.1 58.8,148.7 54.6,149.5 51.4,151.2 49.6,154.5 47.1,156.0 43.9,156.0Z','M153.5,223.0 146.8,222.2 142.0,225.4 139.5,232.2 138.9,235.9 140.2,236.7 144.8,235.0 153.0,231.3 157.0,227.9 157.0,224.7Z','M162.2,126.7 162.9,127.9 162.2,129.8 160.4,132.3 160.7,134.5 163.2,136.3 163.2,138.3 160.7,140.0 160.4,141.3 162.2,142.0 163.4,141.3 164.2,139.5 165.4,139.2 167.2,140.4 169.7,138.8 172.9,134.5 172.2,131.7 167.9,130.4 164.7,128.8 162.9,127.1Z'],
    '9':['M201.8,83.7 199.3,86.2 195.6,87.5 190.6,87.5 186.2,90.6 182.5,96.8 178.8,98.1 175.0,94.3 171.9,93.1 169.4,94.3 167.9,95.9 167.2,97.7 167.5,102.2 168.8,108.9 170.4,112.6 172.2,113.4 174.6,112.6 177.9,110.9 180.9,110.5 184.1,111.8 184.1,115.9 180.9,122.6 180.0,128.3 181.2,132.6 183.4,135.8 186.6,137.5 190.3,138.3 194.6,137.5 198.3,138.3 201.5,140.0 203.3,142.5 204.0,145.8 202.8,148.5 199.6,151.0 198.3,152.5 199.1,153.2 200.8,153.2 204.0,152.5 205.3,150.4 204.5,146.6 205.3,143.8 207.0,142.0 210.3,142.3 214.5,144.8 214.5,139.8 210.3,127.3 207.4,116.7 206.2,108.0 204.0,100.9 200.8,95.2 200.3,90.0 202.0,85.0Z','M172.5,60.7 173.8,61.9 175.0,67.8 176.3,78.5 178.8,84.4 182.5,85.6 184.6,84.7 185.4,81.5 184.6,77.3 182.9,71.5 182.9,67.3 184.6,64.1 185.0,62.8 183.7,63.6 183.1,64.8 183.1,66.6 181.6,68.5 178.4,70.3 176.3,70.7 175.0,69.4 174.6,67.5 175.4,65.1 174.6,62.8 172.9,61.1Z','M241.9,271.8 240.1,271.8 240.1,272.8 241.9,274.5 242.6,276.8 241.9,279.2 239.2,281.5 234.2,283.2 231.4,285.5 230.7,288.0 229.2,289.8 226.7,291.1 225.5,293.2 225.5,296.4 224.5,298.5 222.7,299.8 221.7,301.9 221.7,305.1 221.1,307.3 219.8,308.5 218.0,309.1 215.5,309.1 213.2,308.1 211.5,306.4 210.5,303.5 210.5,299.8 209.0,297.3 205.8,296.1 202.8,293.6 199.6,289.8 197.1,288.0 195.3,288.0 192.5,289.8 188.7,293.6 185.9,294.8 184.1,293.6 181.9,294.4 179.4,297.7 182.9,296.7 192.1,291.7 198.1,290.7 200.5,293.9 204.0,296.7 208.3,299.2 210.5,301.9 210.5,305.1 211.5,307.6 213.2,309.4 215.5,310.4 218.0,310.4 220.2,309.8 222.0,308.5 223.6,304.4 224.8,297.7 226.9,293.2 230.2,291.4 232.3,289.2 233.5,286.7 236.7,284.2 241.6,281.7 243.9,278.2 243.1,274.0Z','M261.3,177.4 260.6,178.1 261.3,179.0 263.1,180.2 263.4,181.5 262.2,182.7 263.1,183.1 266.3,182.4 268.4,183.4 269.7,185.8 268.0,188.6 263.8,191.8 261.6,195.8 261.6,200.8 263.8,204.5 268.0,207.0 273.8,208.3 280.5,208.3 285.5,207.3 288.7,205.5 291.2,207.6 292.9,213.9 288.0,222.2 276.3,232.9 276.3,233.2 288.0,223.2 293.9,215.1 293.9,208.9 293.3,205.2 292.1,203.9 290.0,204.3 286.7,206.0 282.5,207.3 276.8,208.0 272.2,207.6 268.4,206.4 265.3,204.5 262.8,202.0 261.6,199.5 261.6,197.1 264.1,193.9 269.0,190.2 271.5,187.1 271.5,184.6 269.0,181.9 264.1,178.6Z'],
    '10':['M110.9,18.4 113.4,22.1 114.0,25.5 112.8,28.7 112.4,33.3 113.1,39.5 118.1,44.1 127.3,47.4 130.8,47.6 128.3,45.1 127.7,42.0 128.9,38.3 130.8,35.2 133.3,32.7 137.0,33.7 142.0,37.9 144.8,38.3 145.5,34.5 144.8,31.7 143.0,29.9 142.3,28.7 143.0,27.9 138.9,24.6 130.2,18.4 124.6,15.9 122.1,17.1 118.1,17.5 112.4,16.7Z'],
    '11':['M99.9,237.5 105.7,246.2 111.1,249.1 116.9,245.9 120.8,245.6 123.3,248.1 125.8,249.1 128.3,248.4 130.6,249.4 132.3,251.8 136.0,252.8 141.8,252.1 145.5,252.8 147.2,254.6 150.1,255.3 153.8,254.6 157.2,255.0 160.4,256.2 163.4,255.8 166.7,254.1 168.8,253.7 170.0,255.0 170.7,257.8 170.7,262.1 168.8,266.2 165.1,269.9 162.9,273.3 162.2,276.5 162.2,280.2 162.9,284.5 165.1,287.7 168.8,289.5 170.0,291.7 168.8,294.2 169.4,296.1 171.9,297.3 174.6,297.9 177.9,297.9 180.4,296.4 182.1,293.2 184.1,292.3 185.9,293.6 189.3,292.3 194.3,288.6 198.3,288.6 201.5,292.3 205.5,295.7 210.5,298.9 212.8,301.7 212.0,304.2 212.4,306.0 213.6,307.3 215.7,307.9 219.0,307.9 221.5,304.2 223.2,296.7 226.4,290.5 230.7,285.5 233.5,283.2 234.8,284.0 236.7,283.2 239.2,281.5 239.4,280.5 237.7,280.5 235.7,279.5 233.9,277.8 232.9,275.3 232.9,272.0 231.9,270.5 230.2,270.5 228.6,272.4 227.3,276.1 225.5,275.8 223.0,271.5 217.7,267.4 209.5,263.7 207.8,259.6 212.0,255.3 217.4,251.6 223.6,248.4 226.1,243.8 224.8,237.5 224.0,234.7 223.2,235.4 219.8,233.2 213.6,228.2 206.5,219.2 198.3,206.0 193.1,199.8 190.6,200.5 189.6,202.7 190.3,206.4 189.1,210.5 185.9,214.7 181.2,216.7 175.0,216.0 170.0,214.2 166.3,211.0 164.4,206.8 164.4,201.0 163.2,200.2 160.7,203.9 158.2,205.8 155.7,205.8 153.8,204.8 152.6,203.0 149.7,202.7 145.5,203.9 142.3,205.5 140.5,207.3 139.5,209.8 139.5,213.0 137.7,216.0 133.9,219.2 132.3,221.7 133.1,223.5 131.8,225.9 128.6,229.2 126.1,230.4 124.3,229.7 123.1,228.4 122.3,226.7 120.8,226.7 118.4,228.4 115.6,228.4 112.4,226.7 109.9,226.7 108.1,228.4 105.7,229.2 102.4,228.4 99.9,229.4 98.2,231.9Z','M270.3,137.9 270.3,139.2 268.0,141.6 263.8,145.4 261.6,148.2 261.6,150.0 263.1,152.5 266.3,155.7 267.2,158.2 265.9,159.9 259.1,162.8 246.6,166.5 239.8,167.8 238.5,166.5 238.2,165.3 238.9,164.1 237.9,164.9 235.4,168.2 235.2,170.3 236.9,171.5 238.2,173.6 238.9,176.9 240.4,179.9 242.9,183.1 243.9,189.6 243.1,199.5 241.4,205.8 238.2,208.3 236.4,211.8 235.7,216.0 235.7,223.2 236.4,233.2 242.3,238.8 253.5,240.0 259.7,239.6 260.9,237.9 262.6,237.5 264.3,238.8 270.3,235.9 280.2,229.2 287.1,223.5 290.8,219.2 292.4,216.0 291.7,214.2 288.3,217.6 282.1,226.3 277.1,229.4 273.4,226.9 272.5,225.1 274.3,223.8 275.3,222.0 275.3,219.5 274.3,218.2 272.5,218.2 270.0,219.5 266.8,222.0 264.7,222.6 263.4,221.3 263.4,219.7 264.7,218.0 264.7,216.4 263.4,215.1 264.1,213.2 266.5,210.8 271.8,209.8 280.0,210.5 285.8,210.1 289.6,208.9 291.2,207.6 290.5,206.4 288.7,206.8 285.5,208.5 280.5,209.5 273.8,209.5 267.5,207.3 261.8,203.0 259.3,199.3 260.1,196.1 262.8,192.7 267.8,189.0 270.0,186.1 269.3,184.4 268.4,183.6 267.2,184.4 265.1,183.1 261.8,179.9 259.7,175.9 258.5,170.9 258.8,166.9 260.6,163.7 263.4,161.2 267.2,159.4 267.5,156.6 264.3,152.8 262.8,150.0 262.8,148.2 264.7,146.0 268.4,143.5 270.3,141.0 270.3,138.5Z'],
    '12':['M20.0,280.2 20.0,289.5 19.0,295.2 17.2,296.9 16.0,300.7 15.2,306.4 17.7,311.6 23.5,316.6 26.0,320.1 25.2,321.8 26.8,324.7 30.6,328.4 31.4,331.8 29.7,335.0 34.9,341.8 47.4,352.5 53.4,358.3 52.6,359.6 56.1,363.7 63.6,370.4 68.3,376.1 70.0,380.4 72.3,382.6 74.8,382.6 77.0,383.6 78.8,385.3 78.8,387.3 77.0,389.1 74.2,390.3 70.4,391.1 67.9,392.6 66.7,395.1 64.6,396.3 61.3,396.3 59.8,398.2 59.8,401.9 77.3,403.8 112.1,403.8 130.2,403.2 131.4,401.9 133.1,401.9 134.8,403.2 138.5,403.8 144.3,403.8 147.2,402.8 148.0,401.0 149.5,401.0 152.0,402.8 161.3,403.5 177.5,402.8 186.2,398.2 187.5,389.5 186.2,382.9 182.5,378.6 183.4,374.9 189.1,371.6 190.3,367.9 187.1,363.7 187.8,358.9 192.1,354.0 193.3,350.0 191.6,346.7 192.5,343.0 196.2,338.8 199.3,337.8 201.8,340.3 203.0,339.3 203.0,335.0 202.4,332.2 201.2,330.9 201.5,329.3 203.3,327.6 201.5,323.5 195.8,317.2 191.2,313.5 187.5,312.2 184.1,310.1 180.9,306.9 179.1,305.6 178.4,306.4 177.5,306.0 176.3,304.8 176.6,303.5 178.4,302.3 176.6,301.4 170.9,300.7 167.5,299.8 166.3,298.5 165.7,296.1 165.7,292.3 164.4,289.8 161.9,288.6 160.4,285.2 159.7,279.5 159.7,275.3 160.4,272.0 162.2,268.7 165.4,264.9 166.7,261.8 165.9,259.3 164.4,258.3 161.9,259.1 158.8,258.7 155.1,257.5 152.6,257.5 151.4,258.7 149.5,258.3 147.0,256.6 142.3,255.6 135.5,255.6 131.4,254.6 130.2,252.8 128.1,251.8 124.8,251.8 122.1,250.9 119.6,249.1 115.2,249.4 109.0,251.8 105.3,254.1 104.0,255.8 104.0,257.5 105.3,258.7 105.9,262.1 105.9,267.8 107.2,271.2 109.6,272.4 110.9,274.0 110.9,275.8 109.9,277.4 108.1,278.6 108.1,282.0 109.9,287.7 107.4,291.7 100.7,294.2 100.7,298.2 107.4,303.9 110.3,307.3 109.0,308.5 106.5,308.5 102.8,307.3 99.9,307.3 98.2,308.5 94.4,306.4 88.7,300.7 83.7,298.9 79.5,300.7 76.6,302.9 75.4,305.4 73.3,305.1 70.0,301.9 67.9,300.7 66.7,301.4 65.4,301.0 64.2,299.8 63.6,294.8 63.6,286.1 61.3,281.5 57.1,280.7 54.2,278.6 53.0,274.9 51.7,273.6 50.5,274.9 42.4,275.5 27.5,275.5Z'],
  };
  const MOSCOW_LABEL={
    1:[245.4,148.5],
    2:[221.7,101.2],
    3:[249.1,101.2],
    4:[289.0,124.8],
    5:[287.7,178.4],
    6:[257.8,213.2],
    7:[226.7,194.6],
    8:[201.8,167.2],
    9:[194.3,114.9],
    10:[123.3,30.2],
    11:[191.8,245.6],
    12:[127.1,345.2],
  };
  const MOSCOW_NAME=[
    ['ВАО',289.0,141.0],
    ['ЗАО',203.0,183.4],
    ['ЮАО',257.8,229.4],
  ];
  const MOSCOW_H=428;
/* ---- Карта часовых поясов Дальневосточного федерального округа:
   контуры векторизованы из демоварианта (deploy/615/emb/p2_1.jpeg).
   Пять поясов теми же цветами, что в файле. ---- */
  const ZONES={
    'МСК+5':['M71.8,189.1 70.5,189.1 68.7,187.7 66.3,184.9 64.1,183.3 61.7,182.8 60.1,183.3 59.2,184.6 57.3,185.5 54.5,186.1 52.2,187.4 50.4,189.8 49.5,191.8 49.5,193.7 48.5,195.4 46.7,196.6 44.6,199.4 42.2,203.7 40.4,206.5 39.1,207.8 37.4,208.5 35.6,208.5 35.1,208.3 36.0,207.8 37.2,208.5 38.5,210.3 38.8,213.3 37.9,217.6 35.6,221.3 31.9,224.4 30.0,226.5 30.0,227.5 29.6,228.4 28.6,229.3 27.4,228.8 26.1,227.0 25.6,227.0 26.1,228.8 24.9,230.5 22.2,231.8 19.8,232.1 18.0,231.2 16.6,230.9 15.7,231.4 14.8,230.7 13.8,228.8 13.6,228.1 14.1,228.7 13.8,229.3 12.9,230.2 11.3,230.5 8.9,230.0 8.0,230.9 8.6,233.3 10.1,235.3 12.9,237.2 16.3,237.6 20.6,236.7 24.3,237.0 27.4,238.3 29.6,238.8 30.5,238.3 31.1,237.0 31.7,234.6 32.6,232.7 33.9,231.4 35.8,230.7 38.2,230.7 40.7,229.8 43.4,227.9 45.0,227.2 45.6,227.7 46.2,227.5 47.1,226.5 48.7,226.1 51.1,226.1 53.0,224.2 54.3,220.5 56.4,217.6 59.2,215.2 61.5,214.0 63.3,214.0 63.5,213.1 62.2,211.3 61.7,210.2 62.2,209.6 61.9,209.0 61.0,208.0 60.6,206.5 60.6,204.1 61.3,202.2 62.6,200.9 64.4,200.2 66.8,200.2 67.8,199.2 67.2,197.4 68.7,195.4 71.8,192.9 73.3,191.1 72.8,189.8Z'],
    'МСК+6':['M44.4,94.2 43.4,95.2 43.2,97.0 43.7,99.8 45.0,102.3 47.4,104.7 49.0,107.5 49.9,110.6 49.5,113.0 47.6,114.3 45.7,115.0 43.9,115.0 41.6,116.2 38.8,118.6 37.0,120.6 36.0,122.4 35.1,123.2 34.2,122.6 31.9,123.2 28.2,124.5 26.8,126.1 27.7,128.0 28.2,131.2 28.2,135.9 27.2,138.9 25.4,140.2 25.2,143.3 26.5,147.9 26.5,151.6 25.2,154.4 26.3,156.2 30.0,157.1 33.5,159.5 36.7,163.2 38.3,166.1 38.3,168.5 38.8,170.1 39.7,171.0 40.0,172.2 39.5,173.5 40.0,175.2 41.3,177.0 41.6,179.6 40.7,182.8 39.5,185.2 38.2,186.5 37.6,187.7 38.2,188.6 41.3,188.6 47.4,187.7 50.8,186.5 51.8,185.2 54.1,183.5 57.8,181.7 60.6,180.7 62.4,180.7 65.0,182.1 68.1,184.9 70.5,186.3 71.8,186.3 73.3,187.0 74.6,188.3 75.5,190.2 76.1,192.6 74.6,194.4 71.5,195.7 70.0,197.9 70.5,200.6 70.3,202.5 69.3,203.4 67.5,203.9 64.7,203.9 63.3,205.0 63.3,207.4 64.3,210.2 66.1,213.3 65.0,215.9 60.7,217.7 58.2,219.4 57.3,220.7 57.8,221.0 59.6,220.1 61.0,220.5 61.9,222.4 61.9,223.8 61.0,224.7 59.6,224.7 57.8,223.8 56.9,223.8 56.9,224.7 55.9,226.1 54.1,227.9 52.2,228.7 50.4,228.1 47.6,229.0 43.9,231.4 40.4,232.5 37.2,232.5 35.1,233.0 34.2,233.9 33.9,234.9 34.5,235.8 34.2,237.2 33.3,239.0 33.3,240.4 34.2,241.3 37.6,241.8 43.7,241.8 48.7,240.7 53.0,238.3 59.2,237.9 67.5,239.2 72.6,239.2 74.4,237.9 75.4,236.1 75.4,233.7 76.5,231.8 78.9,230.5 80.2,229.0 80.7,227.7 80.4,226.3 79.5,225.0 79.8,223.5 81.1,222.2 85.3,221.3 92.2,220.7 97.6,221.4 101.3,223.3 104.2,226.5 106.6,231.2 107.9,233.3 108.5,232.7 109.4,233.3 110.7,234.6 111.0,236.2 110.1,238.1 112.4,240.0 117.9,241.8 121.2,242.3 122.1,241.3 121.8,239.2 120.5,236.1 120.0,233.9 120.5,233.0 123.0,230.7 127.6,227.0 131.3,225.0 134.1,224.4 135.5,223.5 135.5,222.2 132.7,221.9 127.2,222.8 123.3,222.2 120.9,219.8 119.8,217.9 119.8,216.6 121.6,214.5 125.3,211.7 126.1,210.3 123.7,210.3 122.1,209.9 121.2,209.0 120.7,207.8 120.7,206.5 121.4,205.0 122.7,203.7 123.3,202.0 122.7,200.2 123.3,197.6 124.6,194.4 126.4,191.7 128.8,189.2 131.8,188.1 135.5,188.1 140.1,187.2 145.7,185.4 148.6,182.8 149.2,179.6 151.4,176.1 155.7,172.4 157.0,169.6 155.7,167.8 154.9,166.1 154.9,164.8 155.9,163.2 157.7,161.3 158.4,159.5 157.9,157.6 157.0,156.2 155.7,155.3 155.4,153.2 156.3,150.0 154.0,147.9 148.4,147.0 142.4,148.2 136.0,151.3 132.0,154.1 130.7,156.5 128.8,156.9 126.4,155.6 125.3,154.4 125.3,153.4 123.5,151.1 119.8,147.4 117.9,145.1 117.9,144.2 119.6,142.8 122.7,141.0 125.5,138.6 127.9,135.9 128.6,132.8 127.6,129.7 127.6,126.0 128.6,121.7 127.9,118.6 125.5,116.2 123.0,115.0 120.2,115.0 117.5,113.7 114.7,110.9 113.3,106.7 113.3,101.2 112.2,97.7 109.8,96.4 107.6,95.8 105.1,96.4 102.0,95.8 97.7,94.5 95.0,93.9 93.7,94.5 92.9,95.6 92.9,97.5 92.5,98.9 91.5,99.8 87.2,100.1 79.2,99.5 74.6,98.4 73.3,96.5 71.8,95.4 70.5,94.9 65.6,94.9 57.3,95.4 52.7,95.2 51.8,94.2 49.6,93.8 46.5,93.8Z','M147.5,79.0 147.5,80.8 148.9,82.7 151.7,84.5 154.0,84.7 155.9,83.4 159.6,82.8 165.1,83.4 168.3,82.8 169.3,81.6 170.7,81.3 172.5,82.2 174.2,81.9 175.5,80.6 174.2,79.0 169.9,77.1 166.8,76.2 164.4,76.2 162.3,76.9 160.5,78.2 158.2,78.0 155.4,76.2 152.3,76.0 149.2,77.3Z'],
    'МСК+7':['M173.0,153.2 172.0,153.7 171.1,153.4 170.2,152.5 167.1,151.6 162.1,150.7 159.4,151.1 158.8,153.0 159.1,154.4 160.0,155.3 160.7,157.4 161.2,160.6 160.5,163.2 158.6,165.0 158.4,167.3 159.7,170.1 158.6,173.1 154.9,176.3 152.9,179.6 152.3,182.8 150.8,185.5 148.0,188.0 145.2,189.1 142.4,189.1 140.1,189.5 138.3,190.5 136.0,190.7 133.2,190.2 130.9,190.9 129.0,192.8 127.6,194.8 126.7,197.2 126.2,199.7 126.2,202.5 125.5,204.8 124.2,206.6 124.9,207.6 127.6,207.6 129.5,208.3 130.4,209.6 128.8,212.0 124.6,215.2 123.3,217.7 124.6,219.6 128.1,220.1 133.6,219.1 136.9,219.1 137.8,220.1 138.3,221.6 138.3,224.0 137.8,225.6 136.9,226.5 135.5,227.0 133.6,227.0 130.4,228.7 125.8,231.8 123.9,235.5 124.9,239.8 124.6,242.5 123.3,243.8 122.5,245.7 122.5,248.1 123.5,249.4 125.3,249.9 128.3,249.2 132.5,247.4 135.3,246.9 136.6,247.8 136.2,251.5 133.8,258.0 131.8,262.2 129.9,264.0 128.1,264.7 126.2,264.2 124.9,264.5 123.9,265.4 123.7,267.0 124.2,269.4 124.9,270.0 125.8,269.1 127.0,269.7 128.3,272.1 130.1,273.3 132.5,273.3 137.8,269.1 146.1,260.8 150.8,255.5 151.7,253.1 153.3,250.9 155.7,248.5 157.0,246.4 157.5,244.6 151.0,243.7 137.5,243.7 129.9,242.9 128.1,241.6 127.9,240.1 129.2,238.8 130.7,238.6 132.0,239.5 134.4,239.2 137.5,237.9 140.1,237.9 142.0,239.2 143.4,239.5 144.3,238.6 145.2,238.6 146.1,239.5 147.1,239.5 148.0,238.6 150.1,238.1 153.3,238.1 155.4,238.6 156.3,239.5 157.9,237.4 160.3,232.4 161.2,227.7 160.7,223.5 159.6,220.5 157.7,218.7 156.0,217.7 154.7,217.7 153.3,218.5 152.0,219.8 150.3,220.7 148.4,221.3 146.6,220.7 144.7,219.4 143.6,217.9 143.1,216.6 142.0,215.9 140.1,215.9 138.7,215.4 137.8,214.5 139.9,212.2 144.9,208.5 152.3,202.0 162.1,192.8 171.1,188.0 179.4,187.4 183.1,186.5 182.2,185.2 182.2,178.9 183.1,167.8 183.1,161.3 182.2,159.5 180.8,158.3 179.0,157.8 176.9,156.5 174.5,154.1Z','M173.4,101.9 166.0,101.4 160.9,102.6 158.2,105.3 157.0,107.5 157.5,108.8 157.2,110.0 156.3,110.9 154.7,111.2 152.3,110.6 150.8,111.2 149.8,112.5 148.0,112.5 145.2,111.2 142.0,110.9 138.3,111.8 135.3,112.1 132.9,111.5 131.1,110.6 129.8,109.3 128.6,109.0 127.6,110.0 127.2,111.5 127.2,113.9 128.3,116.0 130.7,117.8 131.8,119.9 131.8,122.3 131.3,124.1 130.4,125.4 130.4,128.7 131.3,133.7 129.0,138.6 123.5,143.3 122.1,146.7 124.9,149.1 126.7,151.1 127.6,153.0 129.0,153.0 130.9,151.1 132.5,150.2 133.8,150.2 136.6,148.8 140.9,146.0 146.4,144.7 153.3,144.7 156.0,143.3 154.7,140.5 156.0,137.4 160.3,134.3 163.3,130.8 165.1,127.1 166.0,124.5 166.0,123.2 165.3,122.4 164.0,122.4 162.8,122.0 161.9,121.1 161.6,119.7 162.1,117.8 163.4,115.8 165.8,113.4 167.7,110.9 169.0,108.1 170.7,106.0 172.5,104.7 174.5,103.8 176.9,103.2 177.9,102.8 177.3,102.3Z'],
    'МСК+8':['M169.9,108.1 168.6,110.9 166.8,113.4 164.4,115.8 163.1,117.8 162.5,119.7 163.1,120.8 164.4,121.3 165.6,122.4 166.5,124.3 166.0,127.1 164.2,130.8 162.3,133.5 160.5,135.4 158.6,136.5 156.8,137.1 155.7,138.0 155.1,139.3 155.7,140.8 157.0,142.1 157.2,143.5 156.3,144.8 156.8,146.3 158.6,147.6 159.4,148.8 158.8,149.7 159.6,150.0 161.4,149.5 164.2,149.7 167.9,150.7 170.2,151.6 171.1,152.5 172.0,152.8 173.0,152.2 174.2,153.0 175.5,154.8 177.1,155.9 179.0,156.5 180.8,157.6 182.7,159.5 183.8,163.0 184.3,168.0 184.1,174.1 183.1,180.9 183.1,185.2 184.1,186.5 185.6,187.4 188.0,188.0 191.5,187.2 196.1,185.4 200.4,185.5 204.7,188.0 208.4,189.1 211.6,189.1 213.2,187.0 213.2,182.8 214.1,180.0 216.0,178.7 217.4,178.4 218.3,179.3 219.5,179.6 220.8,179.1 222.3,177.5 223.6,174.7 227.3,173.1 233.4,172.6 236.8,172.9 237.7,173.8 237.7,175.2 236.8,177.0 236.8,178.1 237.7,178.7 240.0,177.8 243.7,175.4 245.6,171.9 245.6,167.3 246.3,163.2 247.6,159.5 244.9,155.9 238.0,152.8 233.8,150.4 232.5,149.1 231.5,146.7 231.0,143.5 229.7,141.0 227.3,139.1 227.1,136.8 228.9,134.0 232.6,131.9 238.2,130.6 241.9,130.0 243.7,130.6 245.1,130.0 246.1,128.7 246.1,126.9 245.1,124.5 242.8,123.6 239.1,124.1 236.5,123.6 235.2,122.3 234.7,120.6 235.2,118.7 234.0,116.9 231.3,115.0 225.7,114.1 217.4,114.1 211.6,114.6 208.4,115.5 205.4,114.9 202.6,112.5 200.7,111.5 199.8,112.1 198.2,111.3 195.8,109.5 194.9,108.1 195.5,107.2 194.7,106.3 192.9,105.3 190.8,104.9 188.4,104.9 186.2,105.8 183.8,107.6 181.8,108.6 179.9,108.6 178.2,107.6 176.9,105.8 174.8,105.3 172.0,106.3Z','M168.1,221.6 166.8,222.2 165.8,223.3 165.3,225.1 165.8,229.3 167.1,235.8 168.6,239.8 169.9,241.1 170.2,242.3 169.3,243.2 168.1,243.7 166.8,243.7 166.2,245.0 166.8,247.8 167.4,248.1 168.3,245.7 169.9,243.8 172.3,242.5 172.3,239.0 169.9,233.5 168.8,228.4 168.8,223.8Z'],
    'МСК+9':['M351.5,145.4 348.8,143.0 345.5,141.9 341.8,141.9 340.0,142.6 340.0,143.9 339.2,145.1 337.9,146.0 336.5,145.8 335.2,144.5 334.0,141.9 333.0,138.2 324.4,132.8 308.3,126.0 296.7,122.4 289.8,122.4 284.6,122.0 281.5,121.1 279.8,122.4 279.8,126.1 279.4,128.5 278.4,129.4 276.1,129.1 272.4,127.8 269.8,126.1 268.5,124.3 264.6,123.6 258.1,124.1 253.5,123.8 250.7,122.9 249.3,124.1 249.3,127.3 248.4,130.0 246.5,132.4 243.0,133.5 238.0,133.5 234.5,134.0 232.6,134.9 231.3,136.3 230.3,138.2 230.8,139.8 232.6,141.1 234.0,143.5 235.0,146.7 236.5,149.3 238.9,151.1 242.6,152.8 247.6,154.1 250.7,155.3 251.6,156.2 251.3,157.8 250.0,160.2 249.1,162.7 248.6,165.5 249.8,167.0 252.5,167.6 254.4,168.2 255.3,169.2 255.0,170.4 253.7,171.7 253.0,173.5 253.0,175.9 249.5,179.6 242.6,184.6 237.1,189.5 232.8,194.2 229.9,196.6 228.0,197.2 225.4,199.4 222.3,203.7 220.4,208.0 219.9,212.7 220.4,217.6 221.7,222.6 224.1,225.1 227.3,225.1 230.6,224.0 233.8,221.6 235.4,219.8 235.4,218.5 236.2,217.0 237.5,215.7 239.6,214.8 242.4,214.2 243.6,212.7 243.0,209.9 243.9,207.4 246.3,205.0 247.3,202.5 246.7,199.7 245.8,197.9 244.5,196.9 243.7,195.7 243.7,194.4 245.4,191.4 248.6,186.7 251.6,184.4 254.4,184.4 256.9,183.5 259.3,181.7 265.5,180.7 275.7,180.7 282.6,179.1 286.3,175.9 291.1,172.9 297.2,170.1 303.0,168.7 308.5,168.7 311.5,168.2 312.0,167.3 311.3,165.9 309.4,164.1 308.5,162.4 308.5,161.1 306.7,159.0 303.0,156.2 301.6,154.4 302.5,153.4 303.9,153.4 305.7,154.4 308.7,154.4 313.0,153.4 315.0,151.6 315.0,148.8 315.7,146.7 317.0,145.4 318.2,144.7 319.2,144.7 320.4,145.8 321.7,148.2 324.7,149.5 329.3,150.0 332.4,151.3 333.7,153.7 335.8,155.3 338.6,156.2 340.7,156.5 342.0,155.9 343.5,154.1 344.8,150.9 346.4,149.5 348.3,150.0 350.1,149.3 352.0,147.4Z'],
  };
  const ZONES_LABEL=[
    ['МСК+5',40,165],
    ['МСК+6',92,115],
    ['МСК+7',158,116],
    ['МСК+8',205,120],
    ['МСК+9',292,99],
  ];
  const ZONES_CITY=[
    ['Якутск',110,142],
    ['Магадан',216,140],
    ['Анадырь',296,120],
    ['Улан-Удэ',32,208],
    ['Чита',86,222],
    ['Благовещенск',134,236],
    ['Хабаровск',188,222],
    ['Владивосток',120,262],
    ['Южно-Сахалинск',232,248],
    ['Петропавловск-Камчатский',222,194],
  ];
  const ZONES_H=289;

  const MCOL={'1':'#a7cd5e','2':'#e39b60','3':'#42a2b9','4':'#cf6859','5':'#e8a3bf',
    '6':'#e9ae72','7':'#7dccd3','8':'#7b6b98','9':'#f8dbb3','10':'#8cb360',
    '11':'#e9c881','12':'#54a294'};
  const ZCOL={'МСК+5':'#f7a8d8','МСК+6':'#00d2a0','МСК+7':'#f09022','МСК+8':'#a8d830','МСК+9':'#0f9ecb'};

  /* ---- задание 2: отметки за контрольную ---- */
  function marksChart(){
    const v=[3,6,8,5], X0=70, Y0=246, T=22, PW=229;
    const y=n=>Y0-n*T;
    let s='';
    for(let n=0;n<=9;n++){
      s+=`<line x1="${X0}" y1="${y(n)}" x2="${X0+PW}" y2="${y(n)}" stroke="${GRIDC}" stroke-width=".8"/>`;
      s+=tx(X0-8, y(n)+4, n, 10, MUT, 'end');
    }
    s+=`<line x1="${X0}" y1="${y(0)}" x2="${X0+PW}" y2="${y(0)}" stroke="${INK}" stroke-width="1.1"/>`;
    s+=`<line x1="${X0}" y1="${y(0)}" x2="${X0}" y2="${y(9)}" stroke="${INK}" stroke-width="1.1"/>`;
    v.forEach((n,i)=>{ const bw=32, x=X0+T+i*55;
      s+=`<rect x="${x}" y="${y(n)}" width="${bw}" height="${n*T}" fill="${BLUE}"/>`;
      s+=tx(x+bw/2, y(0)+20, '×'+(i+2), 11, MUT); });
    s+=tx(18, (y(0)+y(9))/2, 'Число учеников', 10, MUT, 'middle', true);
    s+=tx(X0+PW/2, y(0)+42, 'Отметка', 11, MUT);
    return sv(s,300);
  }

  /* ---- задание 3: температура по месяцам ---- */
  function tempChart(){
    const v=[-6,-13,-4,6,10,14,16,15,13,5,-3,-10];
    const X0=54, Y0=165, T=5.2, PW=252;
    const y=c=>Y0-c*T;
    let s='';
    for(let c=-16;c<=18;c+=2)
      s+=`<line x1="${X0}" y1="${y(c)}" x2="${X0+PW}" y2="${y(c)}" stroke="${GRIDC}" stroke-width=".7"/>`;
    [18,16,12,8,4,0,-4,-8,-12,-16].forEach(c=>{ s+=tx(X0-7, y(c)+3.4, c, 9, MUT, 'end'); });
    s+=`<line x1="${X0-5}" y1="${y(0)}" x2="${X0+PW}" y2="${y(0)}" stroke="${INK}" stroke-width="1.1"/>`;
    s+=`<line x1="${X0}" y1="${y(18)}" x2="${X0}" y2="${y(-16)}" stroke="${INK}" stroke-width="1.1"/>`;
    const months=['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
    v.forEach((c,i)=>{ const bw=15, x=X0+6+i*21, top=c>=0?y(c):y(0), hh=Math.abs(c)*T;
      s+=`<rect x="${x}" y="${top}" width="${bw}" height="${hh}" fill="${ICE}" stroke="rgba(42,33,24,.4)" stroke-width=".6"/>`;
      s+=tx(x+bw/2, y(-16)+16, months[i], 9, MUT); });
    s+=tx(16, (y(18)+y(-16))/2, 'Температура, °C', 9.5, MUT, 'middle', true);
    return sv(s,276);
  }

  /* ---- задание 4: координатная прямая ---- */
  function coordLine(){
    const S=40, X0=60, X=u=>X0+u*S, Y=76;
    let s='';
    for(let u=0;u<=6;u++)
      s+=`<line x1="${X(u)}" y1="${Y-9}" x2="${X(u)}" y2="${Y+9}" stroke="${LINE}" stroke-width="1.3"/>`;
    s+=`<line x1="${X(0)-S}" y1="${Y}" x2="${X(6)+S}" y2="${Y}" stroke="${LINE}" stroke-width="1.3"/>`;
    s+=tx(X(0), Y+26, '0', 12, INK)+tx(X(1), Y+26, '1', 12, INK);
    [['A',1.5],['B',2.105],['C',3.5]].forEach(([n,u])=>{
      s+=`<circle cx="${X(u)}" cy="${Y}" r="5" fill="${INK}"/>`+tx(X(u), Y-18, n, 13, INK);
    });
    s+=tx(180, Y+54, '0,67 · 1,5 · 2,105 · 2,9 · 3,5', 11, MUT);
    return sv(s,168);
  }

  /* ---- задание 5: часы Коли и карта часовых поясов ---- */
  function clock(cx,cy,r){
    let s=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf7" stroke="${INK}" stroke-width="1.4"/>`;
    for(let h=0;h<12;h++){ const a=(h*30-90)*Math.PI/180;
      s+=`<line x1="${(cx+Math.cos(a)*(r-4)).toFixed(1)}" y1="${(cy+Math.sin(a)*(r-4)).toFixed(1)}" x2="${(cx+Math.cos(a)*r).toFixed(1)}" y2="${(cy+Math.sin(a)*r).toFixed(1)}" stroke="${INK}" stroke-width=".9"/>`; }
    const hA=(7.83*30-90)*Math.PI/180, mA=(50*6-90)*Math.PI/180;
    s+=`<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(hA)*r*0.52).toFixed(1)}" y2="${(cy+Math.sin(hA)*r*0.52).toFixed(1)}" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`;
    s+=`<line x1="${cx}" y1="${cy}" x2="${(cx+Math.cos(mA)*r*0.78).toFixed(1)}" y2="${(cy+Math.sin(mA)*r*0.78).toFixed(1)}" stroke="${GOLD}" stroke-width="1.8" stroke-linecap="round"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="1.8" fill="${INK}"/>`;
    return s;
  }
  function zones(){
    let s=tx(170,20,'Дальневосточный федеральный округ России',11,INK);
    Object.keys(ZONES).forEach(k=>{
      s+=`<path d="${ZONES[k].join(' ')}" fill="${ZCOL[k]}" opacity=".88" stroke="rgba(42,33,24,.5)" stroke-width=".6"/>`;
    });
    ZONES_LABEL.forEach(([t,x,y])=>{ s+=tx(x,y,t,10,INK); });
    ZONES_CITY.forEach(([t,x,y])=>{
      if(t==='Петропавловск-Камчатский'){
        s+=tx(x,y,'Петропавловск-',9,INK)+tx(x,y+11,'Камчатский',9,INK);
      } else s+=tx(x,y,t,9,INK);
    });
    s+=clock(326,42,26);
    s+=tx(326,80,'19:50 по Якутску',9,MUT);
    return sv(s,ZONES_H);
  }

  /* ---- задание 8: карта Москвы ---- */
  function moscowMap(){
    let s='';
    Object.keys(MOSCOW).forEach(k=>{
      s+=`<path d="${MOSCOW[k].join(' ')}" fill="${MCOL[k]}" opacity=".92" stroke="rgba(42,33,24,.55)" stroke-width=".7"/>`;
    });
    MOSCOW_NAME.forEach(([t,x,y])=>{ s+=tx(x,y,t,8.5,INK); });
    Object.keys(MOSCOW_LABEL).forEach(k=>{ const p=MOSCOW_LABEL[k]; s+=tx(p[0],p[1]+4,k,11,INK); });
    const cx=299, cy=368, R=34;
    const pt=(a,r)=>[(cx+Math.cos(a*Math.PI/180)*r).toFixed(1),(cy+Math.sin(a*Math.PI/180)*r).toFixed(1)];
    let star=[], inner=[];
    for(let k=0;k<8;k++){
      const a=-90+k*45, len=(k%2===0)?R:R*0.42;
      star.push(pt(a,len).join(','));
      star.push(pt(a+22.5,R*0.16).join(','));
      inner.push(pt(a+22.5,(k%2===0)?R*0.5:R*0.2).join(','));
      inner.push(pt(a+45,R*0.1).join(','));
    }
    s+=`<polygon points="${star.join(' ')}" fill="${INK}"/>`;
    s+=`<polygon points="${inner.join(' ')}" fill="#fdf6e0"/>`;
    s+=`<circle cx="${cx}" cy="${cy}" r="2.6" fill="#fdf6e0"/>`;
    s+=tx(cx,cy-R-8,'С',11,INK)+tx(cx,cy+R+14,'Ю',11,INK);
    s+=tx(cx-R-12,cy+4,'З',11,INK)+tx(cx+R+12,cy+4,'В',11,INK);
    s+=tx(10,MOSCOW_H-8,'Москва · 12 административных округов',10,MUT,'start');
    return sv(s,MOSCOW_H);
  }

  /* ---- задание 9: таблица тарифов ---- */
  function fares(){
    const BX=8, BW=344, BY=6, BH=118;
    const V1=126, V2=214, V3=278;
    const cA=148, cM=192, cB=246, cBio=315;
    let t=`<rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="8" fill="rgba(255,253,247,.92)" stroke="rgba(42,33,24,.35)"/>`;
    [38,66,94].forEach(y=>{ t+=`<line x1="${BX}" y1="${y}" x2="${BX+BW}" y2="${y}" stroke="rgba(42,33,24,.45)" stroke-width="${y===38?1:.8}"/>`; });
    [V1,V2,V3].forEach(x=>{ t+=`<line x1="${x}" y1="${BY}" x2="${x}" y2="${BY+BH}" stroke="rgba(42,33,24,.3)"/>`; });
    t+=tx(64,26,'Способы оплаты',10.5);
    t+=tx(170,26,'Карта «Тройка»',10.5);
    t+=tx(cB,22,'Банковская',8.5); t+=tx(cB,33,'карта',8.5);
    t+=tx(cBio,22,'Оплата',8.5);   t+=tx(cBio,33,'по биометрии',8.5);
    t+=tx(cA,56,'1 поездка',9);    t+=tx(cM,56,'«90 минут»*',9);
    t+=tx(14,80,'Метрополитен',10,INK,'start');
    t+=tx(14,110,'Наземный транспорт',10,INK,'start');
    t+=tx(cA,80,'57',11.5,INK)+tx(cM,80,'85',11.5,INK)+tx(cB,80,'64',11.5,INK)+tx(cBio,80,'53',11.5,INK);
    t+=tx(cA,110,'57',11.5,INK)+tx(cM,110,'85',11.5,INK)+tx(cB,110,'64',11.5,INK)+tx(cBio,110,'—',11.5,INK);
    t+=tx(180,146,'цена указана в рублях',10.5,MUT);
    t+=tx(10,170,'* По условиям тарифа «90 минут» пассажиру даётся одна поездка на метро,',8.5,MUT,'start');
    t+=tx(10,182,'монорельсе, МЦК или МЦД и сколько угодно поездок на автобусе,',8.5,MUT,'start');
    t+=tx(10,194,'электробусе и трамвае в течение 90 минут.',8.5,MUT,'start');
    return sv(t,208);
  }

  /* ---- задание 10: треугольный коврик ---- */
  function carpet(){
    let s=`<polygon points="180,40 118,202 242,204" fill="#a8d8ea" opacity=".9" stroke="#2f7fb8" stroke-width="1.3"/>`;
    s+=`<line x1="180" y1="10" x2="180" y2="230" stroke="${LINE}" stroke-width="1.1"/>`;
    s+=`<line x1="88" y1="121" x2="272" y2="121" stroke="${LINE}" stroke-width="1"/>`;
    s+=`<line x1="96" y1="103" x2="268" y2="224" stroke="${LINE}" stroke-width="1"/>`;
    s+=`<line x1="94" y1="224" x2="264" y2="104" stroke="${LINE}" stroke-width="1"/>`;
    s+=tx(186,16,'b',12,INK,'start');
    s+=tx(86,96,'c',12,INK);
    s+=tx(262,96,'d',12,INK);
    s+=tx(280,125,'a',12,INK,'start');
    s+=tx(180,252,'какая прямая — ось симметрии?',10.5,MUT);
    return sv(s,264);
  }

  /* ---- задание 3 демоварианта: сколько мест в зале ---- */
  function theatre(){
    const cols=12, rows=3, sold=8;
    let s=tx(180,18,'Зал театра',11,INK);
    s+=`<rect x="86" y="28" width="188" height="14" rx="7" fill="rgba(138,106,31,.20)" stroke="rgba(42,33,24,.35)"/>`;
    s+=tx(180,39,'сцена',9,MUT);
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
      const x=30+c*25, y=58+r*26, isSold=c<sold;
      s+=`<rect x="${x}" y="${y}" width="19" height="17" rx="5" fill="${isSold?'#e8c26a':'#fffdf7'}" stroke="rgba(42,33,24,${isSold?'.6':'.45'})" stroke-width="${isSold?'.9':'.8'}"/>`;
      s+=`<path d="M${x+4} ${y+10} h11" stroke="rgba(42,33,24,.4)" stroke-width=".9"/>`;
    }
    s+=tx(180,154,'жёлтые кресла — продано 210 билетов, это две трети зала',9.5,INK);
    s+=tx(180,172,'белые кресла — оставшаяся треть',9.5,MUT);
    return sv(s,188);
  }

  /* ---- задание 8.3 демоварианта: тариф «Комфорт» ---- */
  function taxi(){
    function car(x,y,col,title,badge,sub){
      let s=`<g transform="translate(${x},${y})">`;
      s+=`<rect x="0" y="16" width="120" height="30" rx="10" fill="${col}" stroke="rgba(42,33,24,.55)"/>`;
      s+=`<path d="M24 16 L38 -1 L84 -1 L98 16 Z" fill="${col}" stroke="rgba(42,33,24,.55)"/>`;
      s+=`<rect x="40" y="3" width="19" height="11" rx="3" fill="#fffdf7" stroke="rgba(42,33,24,.35)"/>`;
      s+=`<rect x="63" y="3" width="19" height="11" rx="3" fill="#fffdf7" stroke="rgba(42,33,24,.35)"/>`;
      s+=`<circle cx="28" cy="47" r="9" fill="${INK}"/><circle cx="28" cy="47" r="3.4" fill="#fffdf7"/>`;
      s+=`<circle cx="92" cy="47" r="9" fill="${INK}"/><circle cx="92" cy="47" r="3.4" fill="#fffdf7"/>`;
      s+=`<rect x="46" y="25" width="28" height="8" rx="3" fill="#fffdf7" opacity=".85"/>`;
      s+=`</g>`;
      s+=tx(x+60, y-24, title, 11, INK);
      s+=tx(x+60, y-9, badge, 12.5, GOLD);
      s+=tx(x+60, y+74, sub, 10, MUT);
      return s;
    }
    let s=tx(180,20,'Такси: «Эконом» и «Комфорт»',11,INK);
    s+=car(30,70,'#d8e2ea','«Эконом»','680 ₽','цена поездки');
    s+=car(200,70,'#f0d9a8','«Комфорт»','+ 5 %','дороже на 5 %');
    s+=tx(180,186,'сколько рублей стоит поездка в «Комфорте»?',10.5,MUT);
    return sv(s,200);
  }

  /* ---- задание 1: корзины с орехами (рисунок по решению владельца) ---- */
  function basket(x,nuts,count){
    const W=17, H=42;
    let s=`<defs>
      <linearGradient id="wick615" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e0b070"/><stop offset=".5" stop-color="#c08a44"/><stop offset="1" stop-color="#8f5f2a"/></linearGradient>
      <linearGradient id="rim615" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f0d59c"/><stop offset="1" stop-color="#b98a4a"/></linearGradient>
      <radialGradient id="nut615" cx=".35" cy=".3" r=".9">
        <stop offset="0" stop-color="#e8c187"/><stop offset="1" stop-color="#9c6528"/></radialGradient>
    </defs>`;
    s+=`<ellipse cx="${x}" cy="${132+H*0.86}" rx="${W+8}" ry="6" fill="rgba(42,33,24,.22)"/>`;
    s+=`<path d="M${x-W} 132 L${x+W} 132 L${x+W-6} ${132+H} L${x-W+6} ${132+H} Z" fill="url(#wick615)" stroke="rgba(60,40,15,.5)" stroke-width=".8"/>`;
    for(let i=1;i<5;i++){ const yy=132+i*(H/5); const w=W-i*1.2;
      s+=`<path d="M${x-w} ${yy} Q${x} ${yy+3} ${x+w} ${yy}" stroke="rgba(70,45,15,.42)" fill="none" stroke-width="1.1"/>`; }
    for(let i=-2;i<=2;i++){ const xx=x+i*6;
      s+=`<path d="M${xx} 133 Q${xx+(i*0.6)} ${133+H/2} ${xx} ${131+H}" stroke="rgba(70,45,15,.28)" fill="none" stroke-width=".9"/>`; }
    s+=`<ellipse cx="${x}" cy="132" rx="${W}" ry="6.5" fill="url(#rim615)" stroke="rgba(60,40,15,.5)" stroke-width=".8"/>`;
    s+=`<path d="M${x-W+3} 130 Q${x} ${132-30} ${x+W-3} 130" stroke="url(#rim615)" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
    for(let i=0;i<nuts;i++){ const a=-1.1+i*(2.2/Math.max(1,nuts-1)), nx=x+Math.sin(a)*(W-4), ny=126+Math.cos(a)*3;
      s+=`<ellipse cx="${nx.toFixed(1)}" cy="${(ny-i%2*4).toFixed(1)}" rx="4.4" ry="3.6" fill="url(#nut615)" stroke="rgba(60,40,15,.45)" stroke-width=".6"/>`;
      s+=`<ellipse cx="${(nx-1.2).toFixed(1)}" cy="${(ny-1.6-i%2*4).toFixed(1)}" rx="1.2" ry=".9" fill="rgba(255,240,210,.75)"/>`; }
    s+=tx(x,188,String(count),12.5,INK);
    return s;
  }
  function orehi(){
    const DATA=[[44,4,81],[110,5,34],[176,6,17],[242,5,23],[308,6,75]];
    let s=DATA.map(([x,n,c])=>basket(x,n,c)).join('');
    s+=`<line x1="20" y1="196" x2="340" y2="196" stroke="rgba(42,33,24,.25)"/>`;
    s+=tx(180,212,'поровну на пять корзинок',11.5,INK);
    return sv(s,224);
  }

  /* ---- задания 6 и 7: семья и клумба (рисунки по решению владельца) ---- */
  function kid(x,base,skin,hair,shirt,pants,scale,long){
    return `<g transform="translate(${x},${base}) scale(${scale})">
      <ellipse cx="0" cy="2" rx="20" ry="5" fill="rgba(42,33,24,.22)"/>
      ${long?`<path d="M-13 -34 q13 -14 26 0 q3 10 -2 14 q-11 -7 -22 0 q-5 -5 -2 -14 z" fill="${hair}"/>`:''}
      <circle cx="0" cy="-40" r="13" fill="url(#skinG615)"/>
      <path d="M-13 -44 q13 -13 26 0 q1 -9 -13 -12 q-14 3 -13 12 z" fill="${hair}"/>
      <circle cx="-4.5" cy="-41" r="1.7" fill="${INK}"/><circle cx="4.5" cy="-41" r="1.7" fill="${INK}"/>
      <path d="M-4 -35 q4 4 8 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M-11 -27 q11 -5 22 0 l3 22 q-14 4 -28 0 z" fill="${shirt}"/>
      <path d="M-11 -27 q-7 4 -9 12 q3 3 6 1 q2 -7 5 -9 z" fill="${shirt}" opacity=".9"/>
      <path d="M11 -27 q7 4 9 12 q-3 3 -6 1 q-2 -7 -5 -9 z" fill="${shirt}" opacity=".9"/>
      <path d="M-9 -5 l-2 20 h7 l3 -20 z" fill="${pants}"/><path d="M9 -5 l2 20 h-7 l-3 -20 z" fill="${pants}"/>
      <rect x="-13" y="14" width="11" height="5" rx="2.5" fill="${INK}"/><rect x="2" y="14" width="11" height="5" rx="2.5" fill="${INK}"/>
    </g>`;
  }
  function family(){
    let s=`<defs>
      <radialGradient id="skinG615" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#f6d9bd"/><stop offset="1" stop-color="#d9a97f"/></radialGradient>
      <linearGradient id="shirtB615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fa3dd"/><stop offset="1" stop-color="#3d6fae"/></linearGradient>
      <linearGradient id="shirtP615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a0bc"/><stop offset="1" stop-color="#c9678c"/></linearGradient>
      <linearGradient id="pantsG615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4f63"/><stop offset="1" stop-color="#2c3040"/></linearGradient>
      <linearGradient id="floor615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(42,33,24,.10)"/><stop offset="1" stop-color="rgba(42,33,24,0)"/></linearGradient>
    </defs>`;
    s+=`<rect x="18" y="176" width="324" height="34" fill="url(#floor615)" rx="8"/>`;
    s+=kid(96,178,'','#6b4a2a','url(#shirtB615)','url(#pantsG615)',1.02,false);
    s+=kid(152,178,'','#3d2a18','url(#shirtB615)','url(#pantsG615)',1.06,false);
    s+=kid(210,178,'','#7a5230','url(#shirtB615)','url(#pantsG615)',0.98,false);
    s+=kid(262,176,'','#8a5a2a','url(#shirtP615)','url(#pantsG615)',0.96,true);
    s+=kid(310,174,'','#c98b3a','url(#shirtP615)','url(#pantsG615)',0.94,true);
    s+=tx(180,214,'трое мальчиков и две девочки — пятеро детей',12,INK);
    return sv(s,228);
  }
  function flower(){
    let s=`<defs>
      <radialGradient id="soil615" cx=".38" cy=".32" r=".9"><stop offset="0" stop-color="#8a6242"/><stop offset="1" stop-color="#553a26"/></radialGradient>
      <radialGradient id="grass615" cx=".5" cy=".4" r=".9"><stop offset="0" stop-color="#7fae62"/><stop offset="1" stop-color="#4d7a3c"/></radialGradient>
      <linearGradient id="picket615" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d6ac"/><stop offset="1" stop-color="#b99a63"/></linearGradient>
      <radialGradient id="petal615" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff0f3"/><stop offset="1" stop-color="#e0768f"/></radialGradient>
      <radialGradient id="petal615b" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff6e0"/><stop offset="1" stop-color="#e8b23f"/></radialGradient>
    </defs>`;
    s+=`<ellipse cx="180" cy="126" rx="118" ry="66" fill="url(#grass615)" opacity=".55"/>`;
    s+=`<ellipse cx="180" cy="120" rx="96" ry="52" fill="url(#soil615)"/>`;
    for(let i=0;i<26;i++){ const a=((i*137.5)%360)*Math.PI/180, r=Math.sqrt((i%9)/9)*40;
      s+=`<circle cx="${(180+Math.cos(a)*r*1.7).toFixed(1)}" cy="${(120+Math.sin(a)*r).toFixed(1)}" r="${(0.8+(i%5)*0.35).toFixed(1)}" fill="rgba(255,235,200,.22)"/>`; }
    const fl=(x,y,sc,p)=>`<g transform="translate(${x},${y}) scale(${sc})">
        ${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7" rx="3.4" ry="7" fill="url(#${p})" transform="rotate(${a})" opacity=".95"/>`).join('')}
        <circle r="3.2" fill="#c9761f"/></g>`;
    [[140,104,1.15,'petal615'],[176,94,1.3,'petal615b'],[214,102,1.1,'petal615'],[158,126,1.25,'petal615b'],
     [196,128,1.15,'petal615'],[180,112,1.4,'petal615'],[126,124,1.0,'petal615b'],[232,120,1.0,'petal615b']]
      .forEach(([x,y,sc,p])=>{ s+=`<path d="M${x} ${y+6} q-4 16 2 24" stroke="#3f6b33" stroke-width="2" fill="none"/>`+fl(x,y,sc,p); });
    for(let i=0;i<16;i++){ const a=i*22.5*Math.PI/180; const x=180+Math.cos(a)*92, y=126+Math.sin(a)*50;
      s+=`<rect x="${(x-2.6).toFixed(1)}" y="${(y-16).toFixed(1)}" width="5.2" height="22" rx="2" fill="url(#picket615)" stroke="rgba(42,33,24,.35)" stroke-width=".6" transform="rotate(${(a*180/Math.PI+90).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }
    s+=`<line x1="180" y1="120" x2="180" y2="76" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`;
    s+=tx(188,74,'R',12,INK);
    s+=tx(180,196,'заборчик по границе клумбы: 18,84 м',12,INK);
    s+=tx(180,212,'π = 3,14',11,MUT);
    return sv(s,224);
  }

  if(window.RU615 && window.RU615.art){
    window.RU615.art.orehi=orehi;   window.RU615.art.chart=marksChart;
    window.RU615.art.temp=tempChart; window.RU615.art.line=coordLine;
    window.RU615.art.zones=zones;   window.RU615.art.map=moscowMap;
    window.RU615.art.fares=fares;   window.RU615.art.carpet=carpet;
    window.RU615.art.family=family; window.RU615.art.flower=flower;
    window.RU615.art.theatre=theatre; window.RU615.art.taxi=taxi;
  }
})();

/* ================= ОТКЛИК В ТРЕНАЖЁРАХ 602 И 605–610 =================
   Что было не так: в этих семи уроках проверка отвечала голой строкой текста
   внутри кадра, тогда как в 601, 603 и 604 ответ сопровождается анимированным
   откликом RUFEED. Теперь отклик один и тот же во всём русском направлении.

   Как сделано, не трогая вёрстку кадров: в каждом уроке массив его тренажёра
   выложен наружу (window.RUGAME), а здесь отрисовка кадра оборачивается —
   после кнопок вставляется тот же компонент отклика: при верном ответе печать
   с расходящейся волной, при ошибке — чернильный оттиск и объяснение, почему
   верно именно так. Место вставки — сразу под подсказкой к кнопкам, поэтому
   раскладка кадра не меняется, а гейт раскладки это подтверждает. */
(function(){
  const IDS=[602,605,606,607,608,609,610];
  IDS.forEach(function(id){
    const prev=window.WAVE_B && window.WAVE_B[id];
    if(typeof prev!=='function') return;
    window.WAVE_B[id]=function(el){
      prev(el);
      try{
        if(((typeof LV!=='undefined'&&LV.step)||0)!==8) return;
        const lk=(typeof lidKey==='function')?lidKey(id):String(id);
        const st=((window.CHS||{})[lk])||{};
        if(st.gRes==null) return;                       /* ответа ещё не было */
        const G=(window.RUGAME||{})[id];
        if(!G||!G.length) return;
        const it=G[(st.gIdx||0)%G.length];
        const html=st.gRes
          ? window.RUFEED.note('ok','верно',it[2])
          : window.RUFEED.note('no','исправить','Правильно: '+it[2]);
        const col=el.querySelector('.wv-col')||el;
        const box=document.createElement('div');
        box.innerHTML=html;
        const fb=box.firstChild;
        const hint=col.querySelector('.wv-sml');
        if(hint&&hint.nextSibling) col.insertBefore(fb,hint.nextSibling);
        else col.appendChild(fb);
      }catch(e){}
    };
  });
})();

/* ================= ШАГ 2 РЕДИЗАЙНА · УРОК 602 «Состав слова» =================
   Что было не так: девять кадров рисовались в SVG-холсте 336×252, где единица
   равна пикселю, поэтому подписи выходили 10,5–14 px — ниже стандарта (основной
   текст не меньше 16, заголовок кадра 24). Общий множитель шрифта кадры ломает
   (проверено), поэтому кадр переложен целиком, как в 601: заголовок 24, лид 20,
   пояснение 16, элемент-слово 34–44, перенос строк вместо жёстких координат.
   Содержание, порядок и хореография каждого кадра сохранены. */
(function(){
  const R=window.RUKIT; if(!R) return;
  const GOLD=R.GOLD, GREEN=R.GREEN, BLUE=R.BLUE, MUTED=R.MUTED, PALE=R.PALE,
        PINK='#e8a0d8', CYAN='#7fd1ff';
  const M=R.frameMorph;
  const GAME602=[['приехать','приставка','приставка при-'],['лесник','суффикс','суффикс -ник'],
    ['леса','окончание','окончание -а'],['переход','приставка','приставка пере-'],
    ['домик','суффикс','суффикс -ик'],['книгу','окончание','окончание -у']];
  const chip=(t,c)=>`<span class="tag" style="font-size:16px;${c?('border-color:'+c+';color:'+c):''}">${t}</span>`;

  function frame(step, st){
    if(step===0) return `
      <div class="kicker">01 · Состав слова</div>
      <h2>Слово — как постройка</h2>
      <p class="lead">У слова есть части, и каждая работает по-своему. Наука называет эти части <b style="color:${GOLD}">морфемами</b>.</p>
      ${M([['при',CYAN,'приставка'],['школь',GREEN,'корень'],['н',GOLD,'суффикс'],['ый',PINK,'окончание']])}
      <p class="cap">Убери любую часть — слово рассыплется или изменит смысл.</p>`;
    if(step===1) return `
      <div class="kicker">02 · Корень</div>
      <h2>Корень — общая часть родственников</h2>
      <p class="lead">В корне смысл слова. Подбери родственников — и корень определится сам.</p>
      <div class="row">${chip('лес',GREEN)+chip('лесной')+chip('лесник')+chip('перелесок')+chip('лесничество')}</div>
      <p class="cap">Корень выделяют дугой: лес.</p>`;
    if(step===2) return `
      <div class="kicker">03 · Приставка</div>
      <h2>Приставка — перед корнем</h2>
      <p class="lead">Стоит перед корнем и добавляет оттенок смысла. Пишется слитно: это часть слова, а не предлог.</p>
      ${M([['при',CYAN,'приставка'],['ехать',GREEN,'корень']])}
      <div class="row">${chip('уехать')+chip('переехать')}</div>
      <p class="cap">Приставка меняет направление и завершённость действия.</p>`;
    if(step===3) return `
      <div class="kicker">04 · Суффикс</div>
      <h2>Суффикс — после корня</h2>
      <p class="lead">Стоит после корня и тоже добавляет смысл: лес — лесник, дом — домик.</p>
      ${M([['лес',GREEN,'корень'],['ник',GOLD,'суффикс']])}
      <div class="row">${chip('домик')+chip('маленький')}</div>
      <p class="cap">Суффиксы: -ник, -ик, -ок, -еньк-. Они указывают на человека или размер.</p>`;
    if(step===4) return `
      <div class="kicker">05 · Окончание</div>
      <h2>Окончание — изменяемая часть</h2>
      <p class="lead">Оно связывает слова между собой и показывает род, число и падеж.</p>
      ${M([['лес',GREEN,'корень'],['а',PINK,'окончание']])}
      <div class="row">${chip('лес')+chip('леса')+chip('лесу')}</div>
      <p class="cap">Читаю книгу — читаешь книгу: меняется окончание, меняется связь слов.</p>`;
    if(step===5) return `
      <div class="kicker">06 · Основа</div>
      <h2>Основа — слово без окончания</h2>
      <p class="lead">Если убрать окончание, останется основа.</p>
      ${M([['пришколь',GREEN,'основа'],['ый',PINK,'окончание']])}
      <p class="cap">У слова «лес» окончание нулевое, поэтому основа равна всему слову.</p>`;
    if(step===6) return `
      <div class="kicker">07 · Порядок разбора</div>
      <h2>Разбирай слово по шагам</h2>
      <div class="steps">
        <div class="st"><span class="n">1</span><span class="t">Окончание<small>измени слово — увидишь изменяемую часть</small></span></div>
        <div class="st"><span class="n">2</span><span class="t">Основа<small>слово без окончания</small></span></div>
        <div class="st"><span class="n">3</span><span class="t">Корень<small>подбери родственников: лес, лесной, лесник</small></span></div>
        <div class="st"><span class="n">4</span><span class="t">Приставка и суффикс<small>то, что осталось между корнем и окончанием</small></span></div>
      </div>
      <p class="cap">Проверка: сложи части обратно — должно получиться то же слово.</p>`;
    if(step===7) return `
      <div class="kicker">08 · Родственники и формы</div>
      <h2>Однокоренные слова или формы одного слова?</h2>
      <div class="pair">
        <div class="card"><div class="nm">однокоренные</div><div class="ex">лес — лесник<br>разные слова<br>разные основы</div></div>
        <div class="card"><div class="nm">формы слова</div><div class="ex">лес — леса — лесу<br>одно слово<br>меняется окончание</div></div>
      </div>
      <p class="cap">Меняешь окончание — форма. Меняешь смысл — новое слово.</p>`;
    const it=GAME602[(st.gIdx||0)%GAME602.length], done=st.gRes!=null;
    return `
      <div class="kicker">09 · Тренажёр</div>
      <div class="split"><span class="word wide"><b>${it[0]}</b><i>что за часть?</i></span></div>
      <div class="row">${['приставка','суффикс','окончание'].map(k=>
        `<button type="button" class="chip" style="flex:1 1 28%" onclick="ru602Game('${k}')">${k}</button>`).join('')}</div>
      <div class="wv-sml" style="font-size:16px;color:${MUTED}">${done?'нажми любую кнопку — следующее слово':'что за часть слова спрятана?'}</div>
      <p class="score">верно: ${st.gOk||0} · ошибок: ${st.gBad||0} · всего: ${GAME602.length}</p>`;
  }

  const prev=window.WAVE_B[602];
  window.WAVE_B[602]=function(el){
    try{
      const step=(typeof LV!=='undefined'&&LV.step)||0;
      const lk=(typeof lidKey==='function')?lidKey(602):'602';
      if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      R.frameCss();
      if(R.injectCss) R.injectCss();
      const ex=(window.RUEXTRA||{})[602]||{};
      const pv=(step<8)&&ex.pred&&ex.pred[step], nt=ex.notes&&ex.notes[step];
      el.innerHTML=`<div class="s6">${frame(step, st)}
        ${pv?R.PRED(st,pv[0],pv[1],pv[2]):''}
        ${nt?R.NOTE(nt[0],nt[1]):''}</div>`;
      if(step===8 && st.gRes!=null){                 /* отклик на ответ — тот же RUFEED */
        const it=GAME602[(st.gIdx||0)%GAME602.length];
        const box=document.createElement('div');
        box.innerHTML = st.gRes ? window.RUFEED.note('ok','верно',it[2])
                                : window.RUFEED.note('no','исправить','Правильно: '+it[2]);
        const hint=el.querySelector('.wv-sml');
        if(hint && hint.parentElement) hint.parentElement.insertBefore(box.firstChild, hint.nextSibling);
        else el.appendChild(box.firstChild);
      }
      return;
    }catch(e){}
    return prev(el);
  };
  window.RU602FRAME=frame;
})();

/* ================= ШАГ 2 РЕДИЗАЙНА · УРОКИ 605–610 =================
   Тот же переход, что в 602: кадры из SVG-холста 336×252 (кегль 10,5–14 px)
   в общий каркас .s6 с кеглем по шкале. Общий помощник один, чтобы у семи
   уроков не расползалась вёрстка, но кадры у каждого свои — содержание,
   порядок и хореография сохранены, шаблона из одинаковых карточек нет. */
window.RULESSON=function(cfg){
  const R=window.RUKIT; if(!R) return;
  const prev=window.WAVE_B[cfg.id];
  window.WAVE_B[cfg.id]=function(el){
    try{
      const step=(typeof LV!=='undefined'&&LV.step)||0;
      const lk=(typeof lidKey==='function')?lidKey(cfg.id):String(cfg.id);
      if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={};
      const st=CHS[lk];
      if(!cfg.frames[step]) return prev(el);      /* кадр остаётся у прежнего движка (603, 604 — тренажёр) */
      R.frameCss();
      /* Стили пояснения и вопроса-проверки (.rk-note, .rk-pred) выкладывает
         injectCss(): раньше его вызывала отрисовка SVG-сцены, а в новом каркасе
         сцены нет — и пояснение с кнопками оставались без оформления (кегль
         брался из общего .btn приложения, 14,5 px вне шкалы). */
      if(R.injectCss) R.injectCss();
      /* Пояснение кадра и вопрос-проверка: у уроков 602–610 они были и до
         перекладки, но при переносе кадров в новый каркас я их потерял —
         остались только сцены. Возвращаем: пояснение объясняет правило,
         вопрос-проверка спрашивает по кадру. */
      const ex=(window.RUEXTRA||{})[cfg.id]||{};
      /* на кадре тренажёра вопрос-проверка не нужен: там уже своё задание.
         Так было и в прежней отрисовке — она брала PRED только для кадров 1–8. */
      const pv=(step<8)&&ex.pred&&ex.pred[step], nt=ex.notes&&ex.notes[step];
      window.__dbg={id:cfg.id, step:step, hasEx:!!(ex&&ex.pred), plen:ex&&ex.pred?ex.pred.length:-1, pv:!!pv, nt:!!nt, keys:Object.keys(window.RUEXTRA||{})};
      el.innerHTML=`<div class="s6">${cfg.frames[step](st)}
        ${pv?R.PRED(st,pv[0],pv[1],pv[2]):''}
        ${nt?R.NOTE(nt[0],nt[1]):''}</div>`;
      if(step===8 && st.gRes!=null){
        const it=cfg.game[(st.gIdx||0)%cfg.game.length];
        const box=document.createElement('div');
        box.innerHTML = st.gRes ? window.RUFEED.note('ok','верно',it[2])
                                : window.RUFEED.note('no','исправить','Правильно: '+it[2]);
        const hint=el.querySelector('.wv-sml');
        if(hint && hint.parentElement) hint.parentElement.insertBefore(box.firstChild, hint.nextSibling);
        else el.appendChild(box.firstChild);
      }
      return;
    }catch(e){ try{ console.error('кадр '+cfg.id+':', e); }catch(_){} }
    return prev(el);
  };
};

(function(){
  const R=window.RUKIT; if(!R) return;
  const GOLD=R.GOLD, GREEN=R.GREEN, BLUE=R.BLUE, MUTED=R.MUTED, CYAN='#7fd1ff', PINK='#e8a0d8';
  const M=R.frameMorph;
  const chip=(t,c)=>`<span class="tag" style="font-size:16px;${c?('border-color:'+c+';color:'+c):''}">${t}</span>`;
  const cards=(items)=>`<div class="row">${items.map(([nm,ex,ic])=>
    `<div class="card">${ic?`<div class="ic">${ic}</div>`:''}<div class="nm">${nm}</div><div class="ex">${ex}</div></div>`).join('')}</div>`;
  const pair=(a,b)=>`<div class="pair">${a}${b}</div>`;
  const card=(nm,ex)=>`<div class="card"><div class="nm">${nm}</div><div class="ex">${ex}</div></div>`;
  const trainer=(st,word,ask,note,buttons,game,tip)=>`
    <div class="kicker">09 · Тренажёр</div>
    <div class="split"><span class="word wide"><b>${word}</b><i>${ask}</i></span></div>
    <div class="row">${buttons}</div>
    <div class="wv-sml" style="font-size:16px;color:${MUTED}">${st.gRes==null?tip:'нажми любую кнопку — следующее'}</div>
    <p class="score">верно: ${st.gOk||0} · ошибок: ${st.gBad||0} · всего: ${game.length}</p>`;

  /* ---------- 605 · Приставки, предлоги, твёрдый знак ---------- */
  const G605=[['(за)шёл','слитно','зашёл — приставка'],['(на)столе','раздельно','на столе — предлог'],
    ['(под)ъезд','слитно','подъезд — приставка'],['(в)лесу','раздельно','в лесу — предлог'],
    ['(от)нёс','слитно','отнёс — приставка'],['(за)домом','раздельно','за домом — предлог']];
  window.RULESSON({id:605, game:G605, frames:[
    ()=>`<div class="kicker">01 · Приставка и предлог</div>
      <h2>Звучат одинаково, устроены по-разному</h2>
      <p class="lead">Приставка — <b style="color:${GOLD}">часть слова</b>, она приросла к корню. Предлог — <b style="color:${GOLD}">отдельное</b> маленькое слово.</p>
      ${pair(card('приставка','зашёл · отнёс · приехал'),card('предлог','за домом · в лесу · на столе'))}
      <p class="cap">Смысл разный — и написание разное.</p>`,
    ()=>`<div class="kicker">02 · Как различить</div>
      <h2>Вставь слово между предлогом и словом</h2>
      <p class="lead">«В доме» → <b style="color:${GOLD}">в (каком?) доме</b>. Получилось — перед нами предлог.</p>
      ${cards([['получилось','в (каком?) доме','🔎'],['не получилось','во(каком?)шёл','🚫']])}
      <p class="cap">С приставкой вставить слово не удаётся: она внутри слова.</p>`,
    ()=>`<div class="kicker">03 · Написание</div>
      <h2>Слитно и раздельно</h2>
      ${pair(card('слитно — приставки','приехал · ушёл · зашёл · отнёс'),card('раздельно — предлоги','в лесу · на столе · за домом'))}
      <p class="lead">Проверка одна: можно вставить слово — пишем раздельно.</p>`,
    ()=>`<div class="kicker">04 · Сравни</div>
      <h2>«зашёл за другом»</h2>
      <div class="row">${chip('зашёл',GREEN)+chip('за другом',GOLD)}</div>
      <p class="lead">В первом слове <b>за-</b> — приставка, слитно. Во втором <b>за</b> — предлог, раздельно.</p>
      <p class="cap">Одно и то же сочетание звуков в одном предложении пишется по-разному.</p>`,
    ()=>`<div class="kicker">05 · Твёрдый знак</div>
      <h2>ъ после приставки на согласную</h2>
      <p class="lead">Пишется, если приставка оканчивается на согласную, а корень начинается с <b>е, ё, ю, я</b>.</p>
      ${M([['с','#8fd1a8','приставка'],['ъ',GOLD,'твёрдый знак'],['ел','#e8dcc8','корень']])}
      <div class="row">${chip('съел')+chip('объявил')+chip('подъезд')}</div>`,
    ()=>`<div class="kicker">06 · Без знака</div>
      <h2>Когда твёрдый знак не нужен</h2>
      ${pair(card('приставка на гласную','заехал · поехал · приехал'),card('знак внутри корня','яма · семья — здесь мягкий знак'))}
      <p class="cap">Твёрдый знак живёт только на стыке приставки и корня.</p>`,
    ()=>`<div class="kicker">07 · Единообразие</div>
      <h2>Приставки пишутся одинаково</h2>
      <div class="row">${['под-','от-','над-','об-','про-'].map(p=>chip(p)).join('')}</div>
      <p class="lead">«Отдал» и «отплыл» — везде <b>от-</b>: как бы приставка ни звучала, пишем её одинаково.</p>`,
    ()=>`<div class="kicker">08 · Разбор</div>
      <h2>Приставка или корень?</h2>
      ${M([['при',CYAN,'приставка'],['ех',GREEN,'корень'],['а',PINK,'суффикс'],['л','#e8dcc8','']])}
      <p class="cap">Разбор по составу показывает границы частей, а предлог в состав слова не входит.</p>`,
    (st)=>{ const it=G605[(st.gIdx||0)%G605.length];
      return trainer(st,it[0],'как писать?','',
        [['слитно','слитно'],['раздельно','раздельно']].map(([k,l])=>
          `<button type="button" class="chip" style="flex:1 1 40%" onclick="ru605Game('${k}')">${l}</button>`).join(''),
        G605,'как пишется?'); }
  ]});

  /* ---------- 606 · Имя существительное: род и число ---------- */
  const G606=[['ночь','она','женский род'],['стол','он','мужской род'],['окно','оно','средний род'],
    ['мышь','она','женский род'],['ключ','он','мужской род'],['поле','оно','средний род']];
  window.RULESSON({id:606, game:G606, frames:[
    ()=>`<div class="kicker">01 · Род</div>
      <h2>Род — постоянный признак</h2>
      <p class="lead">Дом всегда мужского рода, а книга — женского, сколько бы раз мы их ни называли.</p>
      <div class="row">${chip('дом',GREEN)+chip('книга',PINK)}</div>
      <p class="cap">Род не меняется: это признак самого слова.</p>`,
    ()=>`<div class="kicker">02 · Помощники</div>
      <h2>он · она · оно</h2>
      ${cards([['он','стол, конь','🧱'],['она','парта, земля','📖'],['оно','окно, поле','🪟']])}
      <p class="cap">Подставь местоимение — и род определится сам.</p>`,
    ()=>`<div class="kicker">03 · Окончания</div>
      <h2>Род виден по окончанию</h2>
      ${cards([['мужской','без окончания: стол, конь'],['женский','-а, -я: парта, земля'],['средний','-о, -е: окно, поле']])}
      <p class="cap">Это окончание начальной формы слова.</p>`,
    ()=>`<div class="kicker">04 · Мягкий знак на конце</div>
      <h2>он день — она ночь</h2>
      <p class="lead">Тут помощник особенно нужен: мягкий знак на конце бывает у обоих родов.</p>
      <div class="row">${chip('он день',GREEN)+chip('она ночь',PINK)}</div>
      <p class="cap">Сомневаешься — посмотри в словарь.</p>`,
    ()=>`<div class="kicker">05 · Число</div>
      <h2>Число меняется</h2>
      <p class="lead">Один предмет — единственное число, много — множественное.</p>
      <div class="row">${chip('стол',GREEN)+chip('→')+chip('столы',GOLD)}</div>
      <p class="cap">Число — не постоянный признак: слово его меняет.</p>`,
    ()=>`<div class="kicker">06 · Только одно число</div>
      <h2>Слова, которые живут в одном числе</h2>
      ${pair(card('только единственное','молоко · сахар · храбрость'),card('только множественное','ножницы · каникулы · брюки'))}
      <p class="cap">У них второй формы просто нет.</p>`,
    ()=>`<div class="kicker">07 · Род и множественное число</div>
      <h2>У слова «столы» рода нет</h2>
      <p class="lead">Во множественном числе род не определяют: «столы» — не «они», а форма слова «стол» мужского рода.</p>
      <div class="row">${chip('стол',GREEN)+chip('он',GREEN)+chip('—',MUTED)+chip('столы',GOLD)}</div>
      <p class="cap">Род смотрим у начальной формы, а не у любой.</p>`,
    ()=>`<div class="kicker">08 · Мягкий знак после шипящих</div>
      <h2>рожь, ночь, мышь, помощь — с ь</h2>
      ${pair(card('женский род — с ь','рожь · ночь · мышь · помощь'),card('мужской род — без ь','нож · мяч · ключ · товарищ'))}
      <p class="cap">Род решает, писать ли мягкий знак.</p>`,
    (st)=>{ const it=G606[(st.gIdx||0)%G606.length];
      return trainer(st,it[0],'какой род?','',
        [['он','он'],['она','она'],['оно','оно']].map(([k,l])=>
          `<button type="button" class="chip" style="flex:1 1 28%" onclick="ru606Game('${k}')">${l}</button>`).join(''),
        G606,'подставь местоимение'); }
  ]});
})();

/* ================= ШАГ 2 РЕДИЗАЙНА · УРОКИ 607–610 ================= */
(function(){
  const R=window.RUKIT; if(!R) return;
  const GOLD=R.GOLD, GREEN=R.GREEN, BLUE=R.BLUE, MUTED=R.MUTED, CYAN='#7fd1ff', PINK='#e8a0d8';
  const chip=(t,c)=>`<span class="tag" style="font-size:16px;${c?('border-color:'+c+';color:'+c):''}">${t}</span>`;
  const card=(nm,ex)=>`<div class="card"><div class="nm">${nm}</div><div class="ex">${ex}</div></div>`;
  const cards=(items)=>`<div class="row">${items.map(([nm,ex])=>card(nm,ex)).join('')}</div>`;
  const pair=(a,b)=>`<div class="pair">${a}${b}</div>`;
  const trainer=(st,word,ask,buttons,game,tip)=>`
    <div class="kicker">09 · Тренажёр</div>
    <div class="split"><span class="word wide"><b>${word}</b><i>${ask}</i></span></div>
    <div class="row">${buttons}</div>
    <div class="wv-sml" style="font-size:16px;color:${MUTED}">${st.gRes==null?tip:'нажми любую кнопку — следующее'}</div>
    <p class="score">верно: ${st.gOk||0} · ошибок: ${st.gBad||0} · всего: ${game.length}</p>`;
  const CASES=[
    ['03 · Именительный','Кто? Что?','действующее лицо, подлежащее','Ученик читает. Книга лежит.',['—']],
    ['04 · Родительный','Кого? Чего?','отсутствие или принадлежность','нет книги · край леса · дом брата',['от','до','из','без','у','около']],
    ['05 · Дательный','Кому? Чему?','адресат, тот, кому адресовано','дать другу · письмо брату · радоваться солнцу',['к','по']],
    ['06 · Винительный','Кого? Что?','то, на что направлено действие','вижу книгу · читаю письмо · встретил друга',['в','на','за','про','через']],
    ['07 · Творительный','Кем? Чем?','инструмент и совместность','рисую карандашом · горжусь братом · иду с другом',['с','над','под','за','перед']],
    ['08 · Предложный','О ком? О чём?','место или тема, всегда с предлогом','думаю о книге · гуляю в парке · читаю о космосе',['в','на','о','об','при']]
  ];
  const G607=[['читаю книгу: «книгу»','в','винительный'],['нет книги: «книги»','р','родительный'],
    ['дать другу: «другу»','д','дательный'],['рисую карандашом: «карандашом»','т','творительный'],
    ['думаю о книге: «книге»','п','предложный'],['ученик читает: «ученик»','и','именительный']];
  window.RULESSON({id:607, game:G607, frames:[
    ()=>`<div class="kicker">01 · Падеж</div>
      <h2>Падеж — форма слова, а не новое слово</h2>
      <p class="lead">Книга, книги, книге — это одно и то же слово. Меняется форма, а вместе с ней и работа в предложении.</p>
      <div class="cases">
        <div class="c"><div class="n">пример</div><div class="t">Книга лежит</div><div class="q">кто? что?</div><div class="e">она действует — это подлежащее</div></div>
        <div class="c"><div class="n">пример</div><div class="t">Нет книги</div><div class="q">кого? чего?</div><div class="e">книги нет — об отсутствии</div></div>
        <div class="c"><div class="n">пример</div><div class="t">Рад книге</div><div class="q">кому? чему?</div><div class="e">радуюсь чему-то</div></div>
        <div class="c"><div class="n">пример</div><div class="t">Читаю книгу</div><div class="q">кого? что?</div><div class="e">действие направлено на неё</div></div>
      </div>
      <p class="cap">Падеж отвечает на вопрос и показывает, кем работает слово в предложении.</p>`,
    ()=>`<div class="kicker">02 · Шесть падежей</div>
      <h2>Одно слово во всех шести падежах</h2>
      <div class="cases">
        <div class="c"><div class="n">1 · кто? что?</div><div class="t">Именительный</div><div class="e">книг<b style="color:${GOLD}">а</b> лежит</div></div>
        <div class="c"><div class="n">2 · кого? чего?</div><div class="t">Родительный</div><div class="e">нет книг<b style="color:${GOLD}">и</b></div></div>
        <div class="c"><div class="n">3 · кому? чему?</div><div class="t">Дательный</div><div class="e">рад книг<b style="color:${GOLD}">е</b></div></div>
        <div class="c"><div class="n">4 · кого? что?</div><div class="t">Винительный</div><div class="e">читаю книг<b style="color:${GOLD}">у</b></div></div>
        <div class="c"><div class="n">5 · кем? чем?</div><div class="t">Творительный</div><div class="e">доволен книг<b style="color:${GOLD}">ой</b></div></div>
        <div class="c"><div class="n">6 · о ком? о чём?</div><div class="t">Предложный</div><div class="e">думаю о книг<b style="color:${GOLD}">е</b></div></div>
      </div>
      <p class="cap">Менялось только окончание — слово осталось тем же.</p>`,
    ()=>`<div class="kicker">03 · Как определить</div>
      <h2>Три шага — и падеж найден</h2>
      <div class="steps">
        <div class="st"><span class="n">1</span><span class="t">Найди слово-командир<small>от какого слова задаём вопрос: читает (что?) книгу</small></span></div>
        <div class="st"><span class="n">2</span><span class="t">Задай вопрос<small>что? — винительный, кому? — дательный, о чём? — предложный</small></span></div>
        <div class="st"><span class="n">3</span><span class="t">Проверь предлог<small>предлог подсказывает, но не решает: «в» бывает и в винительном, и в предложном</small></span></div>
      </div>
      <p class="ex-line">Пример: <b>Ученик</b> читает <b>книгу</b>. Ученик — кто? (именительный), книгу — что? (винительный).</p>`,
    ()=>`<div class="kicker">04 · Первые два падежа</div>
      <h2>Именительный и родительный</h2>
      <div class="pair">
        <div class="card"><div class="nm">Именительный · кто? что?</div><div class="ex">Ученик читает.<br>Книга лежит на столе.<br>Дом стоит у реки.<br><br>В предложении — подлежащее.<br>Предлогов не бывает.</div></div>
        <div class="card"><div class="nm">Родительный · кого? чего?</div><div class="ex">нет книги<br>край леса<br>дом брата<br><br>Отсутствие или принадлежность.<br>Предлоги: от, до, из, без, у, около.</div></div>
      </div>
      <p class="ex-line">Сравни: <b>Книга</b> на столе (кто? что?) — <b>нет книги</b> (кого? чего?).</p>`,
    ()=>`<div class="kicker">05 · Третий и четвёртый</div>
      <h2>Дательный и винительный</h2>
      <div class="pair">
        <div class="card"><div class="nm">Дательный · кому? чему?</div><div class="ex">дать другу<br>письмо брату<br>радуюсь солнцу<br><br>Адресат: кому это нужно.<br>Предлоги: к, по.</div></div>
        <div class="card"><div class="nm">Винительный · кого? что?</div><div class="ex">вижу книгу<br>читаю письмо<br>встретил друга<br><br>Действие направлено на предмет.<br>Предлоги: в, на, за, про, через.</div></div>
      </div>
      <p class="ex-line">Одно слово, два падежа: <b>дать другу</b> (кому? — дательный) и <b>видеть друга</b> (кого? — винительный).</p>`,
    ()=>`<div class="kicker">06 · Последние два падежа</div>
      <h2>Творительный и предложный</h2>
      <div class="pair">
        <div class="card"><div class="nm">Творительный · кем? чем?</div><div class="ex">рисую карандашом<br>горжусь братом<br>иду с другом<br><br>Инструмент и совместность.<br>Предлоги: с, над, под, за, перед.</div></div>
        <div class="card"><div class="nm">Предложный · о ком? о чём?</div><div class="ex">думаю о книге<br>гуляю в парке<br>читаю о космосе<br><br>Место или тема.<br>Предлоги: в, на, о, об, при.</div></div>
      </div>
      <p class="ex-line">У предложного падежа предлог есть <b>всегда</b>: без него он не употребляется.</p>`,
    ()=>`<div class="kicker">07 · Предлоги по падежам</div>
      <h2>Какой предлог к какому падежу</h2>
      <div class="cases">
        <div class="c"><div class="t">Именительный</div><div class="e">предлогов нет: книга лежит</div></div>
        <div class="c"><div class="t">Родительный</div><div class="e">от, до, из, без, у, около</div></div>
        <div class="c"><div class="t">Дательный</div><div class="e">к, по</div></div>
        <div class="c"><div class="t">Винительный</div><div class="e">в, на, за, про, через</div></div>
        <div class="c"><div class="t">Творительный</div><div class="e">с, над, под, за, перед</div></div>
        <div class="c"><div class="t">Предложный</div><div class="e">в, на, о, об, при</div></div>
      </div>
      <p class="cap">Один и тот же предлог встречается у разных падежей, поэтому решает вопрос, а не предлог.</p>`,
    ()=>`<div class="kicker">08 · Ловушка</div>
      <h2>Именительный или винительный?</h2>
      <div class="pair">
        <div class="card"><div class="nm">Кто действует</div><div class="ex">Ученик читает.<br>Книга лежит.<br>Мама пришла.<br><br>Вопрос кто? — именительный.<br>Это подлежащее.</div></div>
        <div class="card"><div class="nm">На кого направлено действие</div><div class="ex">Вижу ученика.<br>Читаю книгу.<br>Встретил маму.<br><br>Вопрос кого? — винительный.<br>Это дополнение.</div></div>
      </div>
      <p class="ex-line">Кто? — спрашиваем о том, кто действует. Кого? — о том, <b>на кого</b> направлено действие.</p>`,
    (st)=>{ const it=G607[(st.gIdx||0)%G607.length];
      return `<div class="kicker">09 · Тренажёр</div>
        <div class="split"><span class="word wide"><b>${it[0]}</b><i>определи падеж выделенного слова</i></span></div>
        <div class="casebtns">${[['и','Именительный','кто? что?'],['р','Родительный','кого? чего?'],
          ['д','Дательный','кому? чему?'],['в','Винительный','кого? что?'],
          ['т','Творительный','кем? чем?'],['п','Предложный','о ком? о чём?']].map(([k,nm,qs])=>
          `<button type="button" onclick="ru607Game('${k}')"><span class="nm">${nm}</span><span class="qs">${qs}</span></button>`).join('')}</div>
        <div class="wv-sml" style="font-size:16px;color:${MUTED}">${st.gRes==null?'Задай вопрос от слова-командира — и падеж определится':'нажми любую кнопку — следующее сочетание'}</div>
        <p class="score">верно: ${st.gOk||0} · ошибок: ${st.gBad||0} · всего: ${G607.length}</p>`; }
  ]});

  /* ---------- 608 · Глагол ---------- */
  const G608=[['читает','наст','настоящее время'],['читал','прош','прошедшее время'],
    ['прочитает','буд','будущее время'],['будет читать','буд','будущее сложное'],
    ['читали','прош','прошедшее время'],['читаю','наст','настоящее время']];
  window.RULESSON({id:608, game:G608, frames:[
    ()=>`<div class="kicker">01 · Глагол</div>
      <h2>Действие или состояние</h2>
      <p class="lead">Отвечает на вопросы <b style="color:${GOLD}">что делает? что делал? что будет делать?</b> Это самая живая часть речи.</p>
      <div class="row">${chip('бежит',GREEN)+chip('спит',CYAN)+chip('будет читать',GOLD)}</div>`,
    ()=>`<div class="kicker">02 · Времена</div>
      <h2>Глагол изменяется по временам</h2>
      ${cards([['настоящее','действие идёт сейчас: читает, бежит'],['прошедшее','действие уже было: читал, бежал'],['будущее','действие ещё будет: прочитает, будет читать']])}
      <p class="cap">Время — изменяемый признак, как число и лицо.</p>`,
    ()=>`<div class="kicker">03 · Прошедшее время</div>
      <h2>Узнаётся по суффиксу -л</h2>
      <p class="lead">В единственном числе меняется по родам: он читал, она читала, оно читало.</p>
      <div class="row">${chip('читал',GREEN)+chip('читала',PINK)+chip('читало',CYAN)}</div>
      <p class="cap">Во множественном числе рода нет: читали.</p>`,
    ()=>`<div class="kicker">04 · Будущее время</div>
      <h2>Простое и сложное</h2>
      ${pair(card('простое — одно слово','прочитаю · напишу'),card('сложное — два слова','буду читать · буду писать'))}
      <p class="cap">Смысл один: действие ещё не произошло.</p>`,
    ()=>`<div class="kicker">05 · Лицо</div>
      <h2>Лицо показывает, кто действует</h2>
      ${cards([['первое — я, мы','читаю, читаем'],['второе — ты, вы','читаешь, читаете'],['третье — он, она, они','читает, читают']])}
      <p class="cap">Лицо видно по окончанию глагола.</p>`,
    ()=>`<div class="kicker">06 · Число</div>
      <h2>Единственное и множественное</h2>
      <p class="lead">Число глагола показывает, сколько действующих лиц: читает — читают.</p>
      <div class="row">${chip('читает',GREEN)+chip('→')+chip('читают',GOLD)}</div>
      <p class="cap">Число и лицо вместе — это форма глагола.</p>`,
    ()=>`<div class="kicker">07 · Начальная форма</div>
      <h2>Что делать? Что сделать?</h2>
      <p class="lead">Неопределённая форма не показывает ни времени, ни лица. Она оканчивается на <b>-ть, -ти, -чь</b>.</p>
      <div class="row">${chip('читать',GREEN)+chip('идти',GREEN)+chip('беречь',GREEN)}</div>`,
    ()=>`<div class="kicker">08 · Не путай</div>
      <h2>Время и лицо — разные признаки</h2>
      ${pair(card('читал','прошедшее время, лица нет — есть род'),card('читает','настоящее время, третье лицо'))}
      <p class="cap">Смотри, на какой вопрос отвечает слово в предложении.</p>`,
    (st)=>{ const it=G608[(st.gIdx||0)%G608.length];
      return trainer(st,it[0],'какое время?',
        [['прош','прош.'],['наст','наст.'],['буд','буд.']].map(([k,l])=>
          `<button type="button" class="chip" style="flex:1 1 28%" onclick="ru608Game('${k}')">${l}</button>`).join(''),
        G608,'выбери время'); }
  ]});

  /* ---------- 609 · -тся и -ться, не с глаголами ---------- */
  const G609=[['Он учит?ся','тся','что делает? — без ь'],['Надо учит?ся','ться','что делать? — с ь'],
    ['Ему не хоч?тся спать','тся','что делает? — без ь'],['Она улыбает?ся','тся','что делает? — без ь'],
    ['Хочу учит?ся','ться','что делать? — с ь'],['Дети улыбают?ся','тся','что делают? — без ь']];
  window.RULESSON({id:609, game:G609, frames:[
    ()=>`<div class="kicker">01 · На слух не различить</div>
      <h2>«учится» и «учиться» звучат одинаково</h2>
      <p class="lead">Мы слышим одно и то же — [учица]. Значит, слушать бесполезно: нужен вопрос.</p>
      <div class="row">${chip('учится',GREEN)+chip('учиться',GOLD)}</div>`,
    ()=>`<div class="kicker">02 · Правило</div>
      <h2>Задай вопрос к глаголу</h2>
      ${pair(card('в вопросе есть ь','что делать? что сделать? → -ться'),card('в вопросе нет ь','что делает? что делают? → -тся'))}
      <p class="cap">Мягкий знак в вопросе переходит в слово.</p>`,
    ()=>`<div class="kicker">03 · Пример</div>
      <h2>Он учится — надо учиться</h2>
      <p class="lead">«Он учится» — что делает? В вопросе нет ь, значит пишем <b>-тся</b>. «Надо учиться» — что делать? В вопросе есть ь, значит <b>-ться</b>.</p>
      <div class="row">${chip('что делает? → -тся',GREEN)+chip('что делать? → -ться',GOLD)}</div>`,
    ()=>`<div class="kicker">04 · Второй способ</div>
      <h2>Подставь «он» или «надо»</h2>
      ${pair(card('подставь «он»','он учится — звучит верно, без ь'),card('подставь «надо»','надо учиться — с ь'))}
      <p class="cap">Если подстановка ломает фразу — написание выбрано неверно.</p>`,
    ()=>`<div class="kicker">05 · «Не» с глаголами</div>
      <h2>Всегда раздельно</h2>
      <p class="lead">Не хочу, не знаю, не читал, не буду: глагол и «не» — два разных слова.</p>
      <div class="row">${chip('не хочу',GREEN)+chip('не знаю',GREEN)+chip('не читал',GREEN)}</div>`,
    ()=>`<div class="kicker">06 · Исключение</div>
      <h2>Слова, которые без «не» не живут</h2>
      <p class="lead">Ненавидеть, недомогать, недоумевать: убери «не» — и слова не станет.</p>
      <div class="row">${chip('ненавидеть',GOLD)+chip('недомогать',GOLD)+chip('недоумевать',GOLD)}</div>`,
    ()=>`<div class="kicker">07 · Приставка недо-</div>
      <h2>«Меньше, чем нужно»</h2>
      <p class="lead">Недоспал, недоел: здесь <b>недо-</b> — часть слова и пишется слитно.</p>
      <div class="row">${chip('недоспал',GREEN)+chip('недоел',GREEN)+chip('недооценил',GREEN)}</div>`,
    ()=>`<div class="kicker">08 · Сравни</div>
      <h2>«не хочу» и «ненавижу»</h2>
      ${pair(card('не хочу','раздельно: «не» — частица'),card('ненавижу','слитно: без «не» не бывает'))}
      <p class="cap">Разница видна по смыслу, а не по звуку.</p>`,
    (st)=>{ const it=G609[(st.gIdx||0)%G609.length];
      return trainer(st,it[0],'как писать?',
        [['тся','-тся'],['ться','-ться']].map(([k,l])=>
          `<button type="button" class="chip" style="flex:1 1 40%" onclick="ru609Game('${k}')">${l}</button>`).join(''),
        G609,'выбери написание'); }
  ]});

  /* ---------- 610 · Однородные члены и обращение ---------- */
  const G610=[['яблони груши сливы','зап','нужны запятые между однородными'],
    ['яблони и груши','нет','одиночный союз и — без запятой'],
    ['Маша помоги мне','одна','обращение в начале — одна запятая'],
    ['Светит солнце и поют птицы','слож','две основы — запятая перед и'],
    ['не груши а сливы','перед а','союз а — запятая'],
    ['Спасибо Маша за помощь','две','обращение в середине — две запятые']];
  window.RULESSON({id:610, game:G610, frames:[
    ()=>`<div class="kicker">01 · Однородные члены</div>
      <h2>Один вопрос — одно слово в предложении</h2>
      <p class="lead">«В саду росли яблони, груши и сливы»: все три отвечают на вопрос <b>что росло?</b></p>
      <div class="row">${chip('яблони',GREEN)+chip('груши',GREEN)+chip('сливы',GREEN)}</div>`,
    ()=>`<div class="kicker">02 · Перечисление</div>
      <h2>Без союзов — запятая между членами</h2>
      <p class="lead">Яблони, груши, сливы. Перечисление всегда разделяют запятыми.</p>
      <div class="row">${chip('яблони, груши, сливы',GOLD)}</div>`,
    ()=>`<div class="kicker">03 · Одиночный союз</div>
      <h2>«и», «или», «да» — запятая не нужна</h2>
      <p class="lead">Яблони и груши: союз сам выполняет работу разделителя.</p>
      <div class="row">${chip('яблони и груши',GREEN)}</div>`,
    ()=>`<div class="kicker">04 · Повторяющийся союз</div>
      <h2>Союз повторяется — запятая возвращается</h2>
      <p class="lead">И яблони, и груши, и сливы.</p>
      <div class="row">${chip('и яблони, и груши',GOLD)}</div>`,
    ()=>`<div class="kicker">05 · Противопоставление</div>
      <h2>Перед «а» и «но» запятая всегда</h2>
      <p class="lead">Не груши, а сливы. Эти союзы противопоставляют.</p>
      <div class="row">${chip('не груши, а сливы',GOLD)}</div>`,
    ()=>`<div class="kicker">06 · Обращение</div>
      <h2>Слово, которым называют того, к кому обращаются</h2>
      <p class="lead">Маша, помоги мне. В начале — одна запятая, в середине — две.</p>
      <div class="row">${chip('Маша, помоги мне',GREEN)}</div>`,
    ()=>`<div class="kicker">07 · Обращение — не член предложения</div>
      <h2>Его нельзя подчеркнуть</h2>
      <p class="lead">Обращение не подлежащее и не дополнение: оно стоит вне основы.</p>
      <div class="row">${chip('Спасибо, Маша, за помощь',GOLD)}</div>`,
    ()=>`<div class="kicker">08 · Сложное предложение</div>
      <h2>Две основы — запятая между частями</h2>
      <p class="lead">Основ две, поэтому перед «и» ставится запятая.</p>
      <div class="row">${chip('солнце светит',GREEN)+chip('птицы поют',GREEN)}</div>
      <p class="cap">Светит солнце, и поют птицы.</p>`,
    (st)=>{ const it=G610[(st.gIdx||0)%G610.length];
      return trainer(st,it[0],'нужны запятые?',
        [['нет','запятые не нужны'],['одна','одна запятая'],['две','две запятые'],['зап','перечисление'],['перед а','перед «а»'],['слож','две основы']].map(([k,l])=>
          `<button type="button" class="chip" style="flex:1 1 30%;font-size:16px" onclick="ru610Game('${k}')">${l}</button>`).join(''),
        G610,'выбери ответ'); }
  ]});
})();

/* ================= ШАГ 2 РЕДИЗАЙНА · УРОКИ 603 и 604 =================
   У этих двух уроков тренажёр (кадр 9) давно переделан — вставка буквы живёт
   в RULETTER с кеглем 48 px. А восемь пояснительных кадров оставались в старом
   SVG-холсте; здесь они переложены в общий каркас, кадр 9 не трогаем. */
(function(){
  const R=window.RUKIT; if(!R) return;
  const GOLD=R.GOLD, GREEN=R.GREEN, MUTED=R.MUTED, CYAN='#7fd1ff', PINK='#e8a0d8';
  const M=R.frameMorph;
  const chip=(t,c)=>`<span class="tag" style="font-size:16px;${c?('border-color:'+c+';color:'+c):''}">${t}</span>`;
  const card=(nm,ex)=>`<div class="card"><div class="nm">${nm}</div><div class="ex">${ex}</div></div>`;
  const pair=(a,b)=>`<div class="pair">${a}${b}</div>`;
  const cards=(items)=>`<div class="row">${items.map(([nm,ex])=>card(nm,ex)).join('')}</div>`;

  window.RULESSON({id:603, frames:[
    ()=>`<div class="kicker">01 · Самая частая ошибка</div>
      <h2>Гласная, на которую не падает ударение</h2>
      <p class="lead">Мы слышим «лиса», но так же слышится и «леса». Без проверки выбрать букву невозможно.</p>
      <div class="row">${chip('лиса',PINK)+chip('леса',CYAN)}</div>`,
    ()=>`<div class="kicker">02 · Ударение — помощник</div>
      <h2>Под ударением гласная слышна ясно</h2>
      ${pair(card('лес','гласная под ударением — слышно отчётливо'),card('лесной','без ударения — и уже сомнительно'))}
      <p class="cap">Ударение делает гласную ясной.</p>`,
    ()=>`<div class="kicker">03 · Правило</div>
      <h2>Проверяй ударением</h2>
      <p class="lead">Подбери слово, где та же гласная стоит под ударением.</p>
      <div class="row">${chip('лиса → лИс',GREEN)+chip('гора → гОры',GREEN)+chip('письмо → пИсьма',GREEN)}</div>`,
    ()=>`<div class="kicker">04 · Два способа</div>
      <h2>Как ищут проверочное слово</h2>
      ${cards([['изменить форму','гора — горы, окно — окна'],['подобрать родственника','гора — горный, окно — оконный']])}
      <p class="cap">В обоих случаях корень один и тот же.</p>`,
    ()=>`<div class="kicker">05 · Ловушка</div>
      <h2>Похожие, но не родственные</h2>
      <p class="lead">«Вода» и «водитель» звучат похоже, но смысл разный: проверять одно другим нельзя.</p>
      <div class="row">${chip('вода',CYAN)+chip('водитель',PINK)}</div>
      <p class="cap">Проверочное слово обязано быть родственником по смыслу.</p>`,
    ()=>`<div class="kicker">06 · Словарные слова</div>
      <h2>Есть слова, которые проверить нельзя</h2>
      <div class="row">${['собака','корова','ворона','молоко','работа'].map(w=>chip(w,GOLD)).join('')}</div>
      <p class="cap">Их написание запоминают или смотрят в словаре.</p>`,
    ()=>`<div class="kicker">07 · Разбор примеров</div>
      <h2>Ищем слово, где гласная станет ударной</h2>
      ${M([['голов','#8fd1a8','гОловы → о'],['земл','#ffd76a','зЕмли → е'],['пят','#7fd1ff','пЯть → я']])}
      <p class="cap">Каждый раз подбираем проверку и слышим нужную букву.</p>`,
    ()=>`<div class="kicker">08 · Ещё одна ошибка</div>
      <h2>Подмена буквы похожей</h2>
      <p class="lead">«а» вместо «о», «и» вместо «е» — спасает одно: произнеси проверочное слово вслух.</p>
      <div class="row">${chip('о / а',GOLD)+chip('е / и',GOLD)}</div>
      <p class="cap">Под ударением слышно, какая буква настоящая.</p>`
  ]});

  window.RULESSON({id:604, frames:[
    ()=>`<div class="kicker">01 · Слабый звук</div>
      <h2>На конце слова звук слабеет</h2>
      <p class="lead">«Зуб» мы произносим как [зуп]: слышится один звук, а буква может быть другой.</p>
      <div class="row">${chip('зуб',GREEN)+chip('[зуп]',PINK)}</div>`,
    ()=>`<div class="kicker">02 · Шесть пар</div>
      <h2>Парные согласные</h2>
      <div class="row">${['б—п','в—ф','г—к','д—т','ж—ш','з—с'].map(p=>chip(p,GOLD)).join('')}</div>
      <p class="cap">В паре один звук звонкий, другой глухой — в слабой позиции они путаются.</p>`,
    ()=>`<div class="kicker">03 · Проверка</div>
      <h2>Поставь после согласной гласный</h2>
      <p class="lead">Гласный «вытягивает» настоящий звук.</p>
      <div class="row">${chip('зуб → зубы',GREEN)+chip('снег → снега',GREEN)+chip('глаз → глаза',GREEN)}</div>`,
    ()=>`<div class="kicker">04 · И согласные л, м, н, р</div>
      <h2>После них согласная тоже звучит ясно</h2>
      ${pair(card('зуб — зубной','после согласной стоит н'),card('снег — снежный','после согласной стоит н'))}
      <p class="cap">Проверочное слово ищут так же, как для гласной.</p>`,
    ()=>`<div class="kicker">05 · Непроизносимые согласные</div>
      <h2>Буква есть, а звука нет</h2>
      <p class="lead">Пишем «солнце», слышим [сонцэ]. Такие согласные прячутся в сочетаниях стн, здн, лнц, вств.</p>
      <div class="row">${chip('стн',CYAN)+chip('здн',CYAN)+chip('лнц',CYAN)+chip('вств',CYAN)}</div>`,
    ()=>`<div class="kicker">06 · Проверка</div>
      <h2>Подбери слово, где согласная зазвучит</h2>
      <div class="row">${chip('солнце → солнышко',GREEN)+chip('сердце → сердечко',GREEN)+chip('местный → место',GREEN)}</div>
      <p class="cap">Здравствуй — здравый: так проверяют и это слово.</p>`,
    ()=>`<div class="kicker">07 · Ловушка</div>
      <h2>Иногда согласная только кажется</h2>
      ${pair(card('вкусный','проверяем «вкусен»: буквы т нет'),card('опасный','проверяем «опасен»: буквы т нет'))}
      <p class="cap">Чудесный — чудеса: лишнюю букву писать не надо.</p>`,
    ()=>`<div class="kicker">08 · Удвоенные согласные</div>
      <h2>Их нельзя проверить</h2>
      <div class="row">${['класс','суббота','аллея','хоккей'].map(w=>chip(w,GOLD)).join('')}</div>
      <p class="cap">Это словарные слова: их запоминают по словарю.</p>`
  ]});
})();

/* ================= БУМАЖНЫЙ ЛИСТ: общий движок для листов Мишутки =================
   Урок 615 «Путь Мишутки» показал формат, который читается лучше тёмной панели:
   страница задания — кремовая тетрадная бумага в клетку, розовое поле, рамка
   вокруг рисунка, условие, варианты списком, анимированная пометка проверки.
   Теперь таких листов четыре: 615 (демовариант школы № 1517) и три варианта по
   спецификации МЦКО «Функциональная грамотность, 6 класс» (deploy/mcko/):
   616 — математическая грамотность, 617 — читательская, 618 — естественнонаучная.
   Движок один, содержание у каждого листа своё.

   Важно: своей строки «Назад / Дальше» лист больше не рисует. У 615 она была, и
   на экране оказывались две одинаковые пары кнопок — своя и от приложения.
   Навигацию даёт приложение, лист за неё не отвечает. */
window.RUPAPER = (function(){
  const F="Georgia,'Times New Roman',serif";
  const INK='#2a2118', MUT='#6b5b45', RULE='#d8c9a8', PAPER2='#fffdf7', OKC='#2f6b46', NOC='#9c2f22';
  const CSS=`
  #lvis .pp{box-sizing:border-box;width:100%;max-width:520px;margin:0 auto;font-family:${F};color:${INK};
    background-color:#fdf6e0;
    background-image:
      linear-gradient(rgba(96,128,168,.22) 1px, transparent 1px),
      linear-gradient(90deg, rgba(96,128,168,.22) 1px, transparent 1px),
      linear-gradient(180deg,#fffaea,#fbf1d6);
    background-size:20px 20px, 20px 20px, 100% 100%;
    border:1px solid ${RULE};border-radius:14px;
    padding:clamp(14px,4vw,22px) clamp(14px,4vw,24px) clamp(16px,4.4vw,24px);
    box-shadow:0 10px 26px rgba(26,20,12,.28),inset 0 1px 0 rgba(255,255,255,.7);
    display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden}
  #lvis .pp::after{content:'';position:absolute;top:0;bottom:0;left:38px;width:1px;pointer-events:none;
    background:linear-gradient(180deg,rgba(200,90,100,0),rgba(200,90,100,.5) 8%,rgba(200,90,100,.5) 92%,rgba(200,90,100,0))}
  #lvis .pp .head{position:static;width:auto;display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    border-bottom:1px solid ${RULE};padding-bottom:8px}
  #lvis .pp .num{font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:${MUT}}
  #lvis .pp .of{font-size:14px;color:${MUT};font-variant-numeric:tabular-nums}
  #lvis .pp h2{font-size:20px;line-height:1.2;font-weight:600;margin:0;color:${INK};letter-spacing:-.01em}
  #lvis .pp .fig{border:1px solid ${RULE};border-radius:10px;background:rgba(255,253,247,.92);padding:10px 8px}
  #lvis .pp .fig svg *{stroke-linecap:round}
  #lvis .pp .q{font-size:16px;line-height:1.55;color:${INK}}
  #lvis .pp .hint{font-size:14px;line-height:1.45;color:${MUT}}
  #lvis .pp .opts,#lvis .pp .seq,#lvis .pp .frag{display:flex;flex-direction:column;gap:10px}
  #lvis .pp .opt,#lvis .pp .fr{display:flex;align-items:center;gap:12px;width:100%;text-align:left;cursor:pointer;
    padding:clamp(11px,3.2vw,14px) clamp(12px,3.4vw,16px);border-radius:10px;border:1px solid ${RULE};
    background:${PAPER2};font-family:${F};font-size:16px;color:${INK};box-sizing:border-box;
    transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 140ms,background 140ms}
  #lvis .pp .fr{font-size:16px;line-height:1.5}
  #lvis .pp .opt:hover,#lvis .pp .fr:hover{border-color:#b9a67f}
  #lvis .pp .opt:active,#lvis .pp .fr:active{transform:translateY(1px)}
  #lvis .pp .opt:focus-visible,#lvis .pp .fr:focus-visible,#lvis .pp .check:focus-visible,#lvis .pp .short input:focus-visible{outline:3px solid ${INK};outline-offset:3px}
  #lvis .pp .opt .k,#lvis .pp .fr .k{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid ${RULE};
    display:flex;align-items:center;justify-content:center;font-size:14px;color:${MUT}}
  #lvis .pp .opt.sel{border-color:#b9a67f;background:#f6efdd}
  #lvis .pp .opt.good,#lvis .pp .fr.good{border-color:${OKC};background:#eef6ef}
  #lvis .pp .opt.good .k,#lvis .pp .fr.good .k{border-color:${OKC};color:${OKC}}
  #lvis .pp .opt.bad,#lvis .pp .fr.bad{border-color:${NOC};background:#fbeeec}
  #lvis .pp .opt.bad .k,#lvis .pp .fr.bad .k{border-color:${NOC};color:${NOC}}
  #lvis .pp .check{width:100%;min-height:52px;padding:12px 16px;border-radius:10px;cursor:pointer;
    border:1px solid ${RULE};background:linear-gradient(180deg,#ffd76a,#e2b23f);color:#20180a;
    font-family:${F};font-size:16px;font-weight:600}
  #lvis .pp .check:disabled{background:${PAPER2};color:${MUT};cursor:default}
  #lvis .pp .check:active{transform:translateY(1px)}
  #lvis .pp .open{display:flex;flex-direction:column;gap:10px}
  #lvis .pp .open textarea{width:100%;box-sizing:border-box;min-height:96px;padding:12px 14px;border-radius:10px;
    border:1px solid ${RULE};background:${PAPER2};font-family:${F};font-size:16px;color:${INK};
    line-height:1.5;resize:vertical}
  #lvis .pp .open textarea:focus-visible{outline:3px solid ${INK};outline-offset:3px}
  #lvis .pp .self{border-top:1px solid ${RULE};padding-top:10px;animation:ppIn 260ms cubic-bezier(.23,1,.32,1) both}
  #lvis .pp .self .ttl{font-size:20px;font-weight:600;color:${INK};margin-bottom:8px}
  #lvis .pp .self .model{font-size:16px;line-height:1.5;color:${OKC};
    background:#eef6ef;border:1px solid ${OKC};border-radius:10px;padding:10px 12px}
  #lvis .pp .self ul{margin:10px 0 0;padding-left:20px}
  #lvis .pp .self li{font-size:16px;line-height:1.5;color:${INK};margin-bottom:4px}
  #lvis .pp .short{display:flex;gap:10px;align-items:stretch}
  #lvis .pp .short input{flex:1 1 auto;min-width:0;min-height:52px;padding:12px 14px;border-radius:10px;border:1px solid ${RULE};
    background:${PAPER2};font-family:${F};font-size:16px;color:${INK}}
  #lvis .pp .short .check{width:auto;flex:0 0 auto;padding:12px 18px}
  #lvis .pp .mark{display:flex;gap:10px;align-items:flex-start;border-top:1px solid ${RULE};padding-top:10px;
    animation:ppIn 260ms cubic-bezier(.23,1,.32,1) both}
  #lvis .pp .mark svg{flex:none;width:26px;height:26px}
  #lvis .pp .mark .d{stroke-dasharray:34;stroke-dashoffset:34;animation:ppDraw 360ms cubic-bezier(.2,1,.32,1) 120ms both}
  #lvis .pp .mark p{margin:0;font-size:16px;line-height:1.5}
  #lvis .pp .mark.ok p{color:${OKC}}#lvis .pp .mark.no p{color:${NOC}}
  @keyframes ppIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  @keyframes ppDraw{to{stroke-dashoffset:0}}
  /* Прячем персонажа приложения, пока открыт лист. Правило живёт и здесь, а не
     только в каркасе .s6: лист может быть первым, что открыл ученик, и тогда
     тот стиль ещё не выложен. Раньше это делал JS — он ставил inline
     display:none и не снимал его, поэтому помощник пропадал навсегда. */
  body:has(#lvis .pp) .avatar,body:has(#lvis .pp) .mascot,body:has(#lvis .pp) .assistant,body:has(#lvis .pp) .guide{display:none!important}
  @media (prefers-reduced-motion: reduce){#lvis .pp *{animation:none!important;transition:none!important}}
  `;
  function css(){ try{ let e=document.getElementById('pp-style'); if(!e){ e=document.createElement('style'); e.id='pp-style'; document.head.appendChild(e);} if(e.textContent!==CSS) e.textContent=CSS; }catch(e){} }
  function state(id){
    const lk=(typeof lidKey==='function')?lidKey(id):String(id);
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    if(!CHS[lk].ans) CHS[lk].ans={};
    if(!CHS[lk].ok) CHS[lk].ok={};
    return CHS[lk];
  }
  const esc=s=>String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;');
  const redraw=()=>{ if(typeof chRender==='function') chRender(0); };

  /* Что считается верным ответом. Форматы взяты из спецификации МЦКО:
     один верный ответ, несколько верных ответов, установление
     последовательности, выделение фрагмента текста и краткий ответ. */
  function right(it,val){
    const t=it.type||'single';
    if(t==='open') return true;            /* развёрнутый ответ машина не судит: сверяем с образцом */
    if(t==='multi'){
      const a=(it.ans||[]).slice().sort().join('§'), b=((val&&val.length)?val:[]).slice().sort().join('§');
      return !!b && a===b;
    }
    if(t==='order') return (val||[]).join('§')===(it.ans||[]).join('§');
    if(t==='short'){
      const norm=s=>String(s==null?'':s).trim().toLowerCase()
        .replace(/ё/g,'е').replace(/\s+/g,' ').replace(',', '.')
        .replace(/\s*(рублей|рубля|руб|см2|см²|см|мм|дней|дня|день|плиток|плитки|жетонов|жетона|конвертов|конверта|сумок|сумки|мест|человека|человек|раза|раз)\s*$/,'')
        .replace(/\s/g,'');
      const v=norm(val);
      return v!=='' && (it.alts||[it.ans]).some(x=>norm(x)===v);
    }
    return val===it.ans;
  }

  function body(it,picked,checked,ok){
    const t=it.type||'single';
    if(t==='multi'){
      const sel=picked||[];
      return `<div class="opts">${it.opts.map((o,i)=>{
        const isSel=sel.indexOf(o)>=0, isRight=(it.ans||[]).indexOf(o)>=0;
        const cls='opt'+(isSel?' sel':'')+(checked?(isRight?' good':(isSel?' bad':'')):'');
        return `<button type="button" class="${cls}" onclick="ruPaperToggle(${it._id},${it._step},'${esc(o)}')">
          <span class="k">${isSel?'✓':i+1}</span><span>${o}</span></button>`;}).join('')}</div>`+
        (checked?'':`<button type="button" class="check" ${sel.length?'':'disabled'} onclick="ruPaperCheck(${it._id},${it._step})">Проверить</button>`);
    }
    if(t==='order'){
      const seq=picked||[];
      return `<div class="seq">${it.items.map((x,i)=>{
        const pos=seq.indexOf(x);
        const cls='opt'+(checked?(it.ans[i]===x?' good':' bad'):(pos>=0?' sel':''));
        return `<button type="button" class="${cls}" onclick="ruPaperOrder(${it._id},${it._step},'${esc(x)}')">
          <span class="k">${pos>=0?(pos+1):'·'}</span><span>${x}</span></button>`;}).join('')}</div>`+
        (checked?'':
          `<div class="hint">Нажимай по порядку — цифра покажет место в цепочке.</div>
           <button type="button" class="check" ${seq.length===it.items.length?'':'disabled'} onclick="ruPaperCheck(${it._id},${it._step})">Проверить</button>`);
    }
    if(t==='fragment'){
      return `<div class="frag">${it.text.map((s,i)=>{
        const cls='fr'+(picked===i?' '+(checked?(it.ans===i?'good':'bad'):'sel'):'');
        return `<button type="button" class="${cls}" onclick="ruPaperFrag(${it._id},${it._step},${i})">
          <span class="k">${i+1}</span><span>${s}</span></button>`;}).join('')}</div>`;
    }
    if(t==='open'){
      return `<div class="open">
        <textarea rows="4" placeholder="${it.ph||'запиши ответ словами'}"
          oninput="ruPaperType(${it._id},${it._step},this.value)" ${checked?'disabled':''}>${picked==null?'':String(picked).replace(/</g,'&lt;')}</textarea>
        ${checked?'':`<button type="button" class="check" onclick="ruPaperCheck(${it._id},${it._step})">Сверить с образцом</button>`}</div>`;
    }
    if(t==='short'){
      return `<div class="short">
        <input type="text" inputmode="text" autocomplete="off" value="${picked==null?'':String(picked).replace(/"/g,'&quot;')}"
          placeholder="${it.ph||'запиши ответ'}" oninput="ruPaperType(${it._id},${it._step},this.value)"
          ${checked?'disabled':''}>
        ${checked?'':`<button type="button" class="check" onclick="ruPaperCheck(${it._id},${it._step})">Проверить</button>`}</div>`;
    }
    return `<div class="opts">${it.opts.map((o,i)=>{
      const cls='opt'+(checked?(o===it.ans?' good':(o===picked?' bad':'')):'');
      return `<button type="button" class="${cls}" onclick="ruPaperPick(${it._id},${it._step},'${esc(o)}')">
        <span class="k">${i+1}</span><span>${o}</span></button>`;}).join('')}</div>`;
  }

  function render(el,cfg){
    css();
    /* без класса paper-mode: см. пояснение в листе 615 */
    const st=state(cfg.id);
    const Q=cfg.data;
    const step=Math.max(0,Math.min(Q.length-1,((typeof LV!=='undefined'&&LV.step)||0)));
    const it=Object.assign({_id:cfg.id,_step:step},Q[step]);
    const picked=st.ans[step];
    const checked=st.ok[step]!=null;
    const ok=checked?right(it,picked):false;
    const type=it.type||'single';
    const taskHint={multi:'Выбери все верные ответы и нажми «Проверить».',
                    order:'Расставь по порядку и нажми «Проверить».',
                    fragment:'Нажми на предложение, о котором спрашивают.',
                    short:'Запиши ответ и нажми «Проверить».',
                    open:'Запиши ответ словами, потом сверь его с образцом и критериями.'}[type];
    el.innerHTML=`<div class="pp">
      <div class="head"><div class="num">Задание ${step+1} из ${Q.length}</div>
        <div class="of" style="display:flex;align-items:center;gap:8px">
          <img src="img/mishutka-head.png" alt="Мишутка" style="width:34px;height:34px;object-fit:contain;border-radius:50%">${cfg.brand||'Путь Мишутки'}</div></div>
      <h2>${it.t}</h2>
      <div class="fig">${String(cfg.art[it.k]())}</div>
      <div class="q">${it.q}</div>
      ${taskHint?`<div class="hint">${taskHint}</div>`:''}
      ${body(it,picked,checked,ok)}
      ${checked ? (type==='open'
          ? `<div class="self">
               <div class="ttl">Сверь свой ответ с образцом</div>
               <div class="model">${it.model}</div>
               <ul>${(it.criteria||[]).map(c=>`<li>${c}</li>`).join('')}</ul>
               <div class="hint" style="margin-top:8px">Развёрнутый ответ проверяют по критериям, а не машиной: сравни свой ответ с образцом и посмотри, все ли пункты у тебя есть.</div>
             </div>`
          : `<div class="mark ${ok?'ok':'no'}">
               <svg viewBox="0 0 24 24">${ok?`<path class="d" d="M4 13 L10 19 L20 6" fill="none" stroke="${OKC}" stroke-width="2.6"/>`
                 :`<path class="d" d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="${NOC}" stroke-width="2.6"/>`}</svg>
               <p>${ok?'Верно. ':'Правильно: '+(Array.isArray(it.ans)?it.ans.join(' · '):it.ans)+'. '}${it.why}</p></div>`)
        : `<div class="q" style="color:${MUT}">${cfg.source||''}</div>`}
    </div>`;
  }

  /* Реестр листов: движок один, а ключи ответов у каждого листа свои.
     Проверка идёт по данным листа, поэтому реестр обязателен. */
  const REG={};
  function checkNow(id,step){
    const cfg=REG[id]; if(!cfg) return true;
    return right(cfg.data[step], state(id).ans[step]);
  }
  window.ruPaperPick=function(id,step,opt){
    const st=state(id);
    if(st.ok[step]!=null) return;
    st.ans[step]=opt;
    st.ok[step]=checkNow(id,step);
    redraw();
  };
  window.ruPaperFrag=function(id,step,i){
    const st=state(id);
    if(st.ok[step]!=null) return;
    st.ans[step]=i;
    st.ok[step]=checkNow(id,step);
    redraw();
  };
  window.ruPaperToggle=function(id,step,opt){
    const st=state(id);
    if(st.ok[step]!=null) return;
    const cur=Array.isArray(st.ans[step])?st.ans[step].slice():[];
    const k=cur.indexOf(opt);
    if(k>=0) cur.splice(k,1); else cur.push(opt);
    st.ans[step]=cur;
    redraw();
  };
  window.ruPaperOrder=function(id,step,item){
    const st=state(id);
    if(st.ok[step]!=null) return;
    const cur=Array.isArray(st.ans[step])?st.ans[step].slice():[];
    const k=cur.indexOf(item);
    if(k>=0) cur.splice(k,1); else cur.push(item);
    st.ans[step]=cur;
    redraw();
  };
  window.ruPaperType=function(id,step,v){       /* без перерисовки: иначе поле теряет фокус */
    const st=state(id);
    if(st.ok[step]!=null) return;
    st.ans[step]=v;
  };
  window.ruPaperCheck=function(id,step){
    const st=state(id);
    if(st.ok[step]!=null) return;
    st.ok[step]=checkNow(id,step);
    redraw();
  };
  /* cfg: {id, title, ico, src, brand, source, data, art, check, tasks} */
  function mount(cfg){
    REG[cfg.id]=cfg;
    window.WAVE_B[cfg.id]=function(el){
      try{ render(el,cfg); }
      catch(e){ el.innerHTML=''; try{ console.error('лист '+cfg.id+':', e); }catch(_){} }
      /* персонажа гасит CSS, см. пояснение в листе 615 */
    };
    if(window.ARH_LESSONS && !window.ARH_LESSONS.some(x=>x.id===cfg.id)){
      window.ARH_LESSONS.push({id:cfg.id,title:cfg.title,ico:cfg.ico,src:cfg.src,subj:'rus',group:cfg.group||'mish',
        explain:cfg.data.map((x,i)=>(i+1)+'. '+x.t),check:cfg.check,tasks:cfg.tasks,img:'img/mishutka-head.png'});
    }
  }
  return {mount:mount,css:css};
})();
