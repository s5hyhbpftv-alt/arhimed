/* АРХИМЕД MVP · comic.js v2 — комикс-книжка:
большая иллюстрированная сцена-«разворот», персонажи стоят на сцене,
реплики всплывают пузырями с анимацией, подписи-нарратив появляются снизу. */
'use strict';
const COMIC = (function(){
  let root=null, L=null, idx=0, tmr=null;

  /* ================= ПЕРСОНАЖИ (детальные, с телом) ================= */
  function mouthSVG(emo){
    if(emo==='wow') return `<ellipse cx="60" cy="76" rx="7.5" ry="9" fill="#8a3b33"/><path d="M60 69 l-4.5 -4 M60 69 l4.5 -4" stroke="#33291e" stroke-width="2.2" fill="none"/>`;
    if(emo==='sad') return `<path d="M50 79 Q60 70 70 79" stroke="#7c4a33" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    if(emo==='think') return `<path d="M52 77 Q60 71 68 77" stroke="#7c4a33" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
    if(emo==='laugh') return `<path d="M47 74 Q60 88 73 74 Q60 80 47 74 Z" fill="#8a3b33"/><path d="M47 74 Q60 84 73 74" stroke="#fff" stroke-width="1.6" fill="none"/>`;
    return `<path d="M50 75 Q60 84 70 75" stroke="#a0504a" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  }
  function blush(){ return `<ellipse cx="38" cy="68" rx="6" ry="3.6" fill="rgba(232,120,110,.4)"/><ellipse cx="82" cy="68" rx="6" ry="3.6" fill="rgba(232,120,110,.4)"/>`; }
  function humanSVG(emo, who){
    const skin='#f2c9a3';
    let body='#4a93d0', collar='#fff', hair='#4a3523', hairBack='', hairFront='', ears='', bl=blush();
    if(who==='arch'){
      body='#d9a441'; collar='#f6ecd2'; hair='#cfd8ea';
      hairBack=`<path d="M24 60 C22 34 34 16 60 12 C86 16 98 34 96 60 C94 36 84 26 60 24 C36 26 26 36 24 60 Z" fill="#cfd8ea" stroke="#b0bcd6" stroke-width="1.5"/>
        <path d="M30 56 C34 34 44 24 60 22 C76 24 86 34 90 56 C84 36 76 30 60 30 C44 30 36 36 30 56 Z" fill="#f4f7ff" opacity=".85"/>
        <path d="M32 72 C38 58 48 50 60 48 C72 50 82 58 88 72 L84 60 C74 48 66 46 60 46 C54 46 46 48 36 60 Z" fill="#eef2fb" stroke="#c8d2e8" stroke-width="1.5"/>`;
      hairFront=`<path d="M30 66 C34 54 44 46 60 44 C76 46 86 54 90 66 C84 50 74 44 60 44 C46 44 36 50 30 66 Z" fill="#e2e8f5"/>`;
      ears=`<circle cx="24" cy="56" r="7" fill="${skin}" stroke="#33291e" stroke-width="2"/><circle cx="96" cy="56" r="7" fill="${skin}" stroke="#33291e" stroke-width="2"/>`;
    } else if(who==='granny'){
      body='#7c4f81'; collar='#f6ecd2'; hair='#c9c2d8';
      hairBack=`<path d="M24 62 C22 36 32 18 60 14 C88 18 98 36 96 62 C94 40 84 28 60 26 C36 28 26 40 24 62 Z" fill="#c9c2d8" stroke="#a79db9" stroke-width="1.5"/>
        <path d="M30 62 C32 42 44 32 60 30 C76 32 88 42 90 62 C86 42 76 36 60 36 C44 36 34 42 30 62 Z" fill="#d8d2e2" opacity=".85"/>`;
      ears=`<circle cx="25" cy="56" r="6" fill="${skin}" stroke="#33291e" stroke-width="1.8"/>`;
    } else {
      hairBack=`<path d="M24 60 C22 34 34 16 60 12 C86 16 98 34 96 60 C94 36 84 26 60 24 C36 26 26 36 24 60 Z" fill="#4a3523" stroke="#33291e" stroke-width="1.5"/>
        <path d="M28 60 C30 38 42 28 60 26 C78 28 90 38 92 60 C88 40 78 32 60 32 C42 32 32 40 28 60 Z" fill="#5f4531"/>`;
    }
    return `<svg viewBox="0 0 120 140">
      <!-- тень -->
      <ellipse cx="60" cy="134" rx="34" ry="5" fill="rgba(0,0,0,.15)"/>
      <!-- тело -->
      <path d="M32 140 C32 102 48 84 60 84 C72 84 88 102 88 140 Z" fill="${body}" stroke="#33291e" stroke-width="2.5"/>
      <path d="M60 100 L60 140" stroke="rgba(0,0,0,.2)" stroke-width="3"/>
      <path d="M46 92 Q60 106 74 92 L74 104 Q60 116 46 104 Z" fill="${collar}" stroke="rgba(0,0,0,.12)" stroke-width="1.2"/>
      <!-- шея -->
      <rect x="52" y="66" width="16" height="20" rx="6" fill="${skin}"/>
      ${ears}
      <!-- голова -->
      <circle cx="60" cy="50" r="34" fill="${skin}" stroke="#33291e" stroke-width="2.5"/>
      ${hairBack}
      <!-- глаза -->
      <ellipse cx="47" cy="56" rx="6.4" ry="7.4" fill="#fff" stroke="#33291e" stroke-width="1.6"/>
      <ellipse cx="73" cy="56" rx="6.4" ry="7.4" fill="#fff" stroke="#33291e" stroke-width="1.6"/>
      <circle cx="48.5" cy="57.5" r="3.4" fill="#33291e"/><circle cx="71.5" cy="57.5" r="3.4" fill="#33291e"/>
      <circle cx="49.8" cy="55" r="1.3" fill="#fff"/><circle cx="72.8" cy="55" r="1.3" fill="#fff"/>
      <!-- брови -->
      <path d="M38 46 Q47 41 55 45" stroke="#6b4a33" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M65 45 Q73 41 82 46" stroke="#6b4a33" stroke-width="3" fill="none" stroke-linecap="round"/>
      ${bl}
      ${hairFront}
      ${mouthSVG(emo)}
    </svg>`;
  }
  function catSVG(emo){
    const sad=emo==='sad';
    return `<svg viewBox="0 0 120 140">
      <ellipse cx="56" cy="132" rx="30" ry="5" fill="rgba(0,0,0,.15)"/>
      <path d="M76 126 C104 116 110 90 100 80" stroke="#d98f3f" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="56" cy="110" rx="34" ry="26" fill="#e8a95b" stroke="#33291e" stroke-width="2.5"/>
      <path d="M56 96 L56 126" stroke="rgba(0,0,0,.14)" stroke-width="2.6"/>
      <ellipse cx="40" cy="124" rx="9" ry="6" fill="#f2c89a" stroke="#33291e" stroke-width="2"/>
      <ellipse cx="72" cy="124" rx="9" ry="6" fill="#f2c89a" stroke="#33291e" stroke-width="2"/>
      <path d="M28 72 C26 32 40 10 60 6 C80 10 94 32 92 72" fill="none"/>
      <circle cx="60" cy="52" r="38" fill="#e8a95b" stroke="#33291e" stroke-width="2.5"/>
      <path d="M22 42 L6 12 L46 26 Z" fill="#d98f3f" stroke="#33291e" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M98 42 L114 12 L74 26 Z" fill="#d98f3f" stroke="#33291e" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M24 35 L16 20 L38 27 Z" fill="#f2b6b6"/><path d="M96 35 L104 20 L82 27 Z" fill="#f2b6b6"/>
      <path d="M30 70 L12 76 M36 84 L20 94 M90 70 L108 76 M84 84 L100 94" stroke="#c07a30" stroke-width="3.4" stroke-linecap="round"/>
      <ellipse cx="46" cy="52" rx="8" ry="${sad?10:8.6}" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <ellipse cx="74" cy="52" rx="8" ry="${sad?10:8.6}" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <ellipse cx="47.5" cy="${sad?56:53}" rx="3.8" ry="4.6" fill="#7a9b1e"/>
      <ellipse cx="72.5" cy="${sad?56:53}" rx="3.8" ry="4.6" fill="#7a9b1e"/>
      <circle cx="46" cy="${sad?53:50}" r="1.5" fill="#fff"/><circle cx="71" cy="${sad?53:50}" r="1.5" fill="#fff"/>
      <path d="M56 62 L60 69 L64 62 Z" fill="#7a4a22"/>
      <path d="M60 69 L60 76 M50 76 Q60 85 70 76" stroke="#7a4a22" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M42 60 L37 58 M42 64 L37 67 M78 60 L83 58 M78 64 L83 67" stroke="#33291e" stroke-width="2.6" stroke-linecap="round"/>
      ${emo==='wow'?`<path d="M52 44 l-5 -8 M52 44 l5 -8 M68 44 l-5 -8 M68 44 l5 -8" stroke="#33291e" stroke-width="2.2" fill="none"/>`:''}
    </svg>`;
  }
  function fishSVG(emo){
    return `<svg viewBox="0 0 120 140">
      <ellipse cx="58" cy="110" rx="30" ry="5" fill="rgba(0,0,0,.12)"/>
      <ellipse cx="58" cy="76" rx="44" ry="30" fill="#6fb4f0" stroke="#33291e" stroke-width="2.5"/>
      <path d="M98 76 L120 56 L120 96 Z" fill="#4a93d0" stroke="#33291e" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M32 54 Q14 30 6 38 Q18 58 24 68" fill="#8fc7f5" stroke="#33291e" stroke-width="2"/>
      <path d="M84 54 Q102 30 110 38 Q98 58 92 68" fill="#8fc7f5" stroke="#33291e" stroke-width="2"/>
      <circle cx="54" cy="16" r="6.4" fill="#ffb8c8" stroke="#33291e" stroke-width="1.8"/>
      <circle cx="40" cy="72" r="9" fill="#fff" stroke="#33291e" stroke-width="2"/>
      <circle cx="42" cy="74" r="4.4" fill="#33291e"/><circle cx="43.6" cy="71" r="1.7" fill="#fff"/>
      <path d="M62 58 L62 40 M68 60 L74 44 M56 60 L50 44" stroke="#4a93d0" stroke-width="2.8" stroke-linecap="round"/>
      ${emo==='wow'?`<ellipse cx="18" cy="78" rx="6.4" ry="7.4" fill="#8a3b33"/>`:`<path d="M14 80 Q24 88 34 80" stroke="#a0504a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`}
    </svg>`;
  }
  function coinSVG(emo){
    return `<svg viewBox="0 0 120 140">
      <ellipse cx="60" cy="116" rx="30" ry="5" fill="rgba(0,0,0,.14)"/>
      <ellipse cx="60" cy="74" rx="44" ry="52" fill="#f0c75e" stroke="#33291e" stroke-width="3"/>
      <ellipse cx="60" cy="74" rx="33" ry="41" fill="none" stroke="#d9a441" stroke-width="3.4" stroke-dasharray="6 6"/>
      <text x="60" y="92" text-anchor="middle" font-size="46" font-weight="bold" fill="#8a6d1e" font-family="Georgia,serif">₽</text>
      ${emo==='wow'?`<path d="M34 38 l-4 -11 M34 38 l7 -9 M86 38 l4 -11 M86 38 l-7 -9" stroke="#a3762a" stroke-width="3.4" fill="none" stroke-linecap="round"/>`:''}
    </svg>`;
  }
  function pigSVG(emo){
    return `<svg viewBox="0 0 120 140">
      <ellipse cx="60" cy="130" rx="32" ry="5" fill="rgba(0,0,0,.15)"/>
      <ellipse cx="60" cy="112" rx="36" ry="24" fill="#f2a9a0" stroke="#33291e" stroke-width="2.5"/>
      <path d="M36 116 L22 140 M84 116 L98 140" stroke="#33291e" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="60" cy="58" r="38" fill="#f2a9a0" stroke="#33291e" stroke-width="2.5"/>
      <path d="M18 50 L2 22 L36 38 Z" fill="#ef8f86" stroke="#33291e" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M102 50 L118 22 L84 38 Z" fill="#ef8f86" stroke="#33291e" stroke-width="2.5" stroke-linejoin="round"/>
      <ellipse cx="60" cy="72" rx="16" ry="14" fill="#f7c4be" stroke="#33291e" stroke-width="2.5"/>
      <circle cx="53" cy="75" r="4.2" fill="#a05a50"/><circle cx="67" cy="75" r="4.2" fill="#a05a50"/>
      <circle cx="43" cy="56" r="6.6" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <circle cx="77" cy="56" r="6.6" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <circle cx="44.5" cy="57.5" r="3.3" fill="#33291e"/><circle cx="75.5" cy="57.5" r="3.3" fill="#33291e"/>
      <circle cx="46" cy="55" r="1.3" fill="#fff"/><circle cx="77" cy="55" r="1.3" fill="#fff"/>
      ${mouthSVG(emo)}
    </svg>`;
  }
  /* ---- АРХИМЕД v2: мудрый грек — белая борода, брови, лысина с лавром, гиматий ---- */
  function squirrelSVG(emo){
    const sad=emo==='sad';
    return `<svg viewBox="0 0 120 140">
      <ellipse cx="58" cy="133" rx="30" ry="5" fill="rgba(0,0,0,.15)"/>
      <!-- хвост -->
      <path d="M84 96 C118 86 124 52 104 40 C96 34 86 36 80 44 C92 46 98 56 94 66 C84 78 78 88 76 98 Z" fill="#c97b2d" stroke="#33291e" stroke-width="2.4"/>
      <path d="M88 58 C96 50 100 44 98 40" stroke="#e8b06b" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- тело -->
      <ellipse cx="58" cy="112" rx="30" ry="24" fill="#e29a45" stroke="#33291e" stroke-width="2.5"/>
      <ellipse cx="50" cy="106" rx="14" ry="11" fill="#f6d9a8" stroke="#33291e" stroke-width="2"/>
      <ellipse cx="70" cy="112" rx="7" ry="5" fill="#f2c89a" stroke="#33291e" stroke-width="1.8"/>
      <ellipse cx="44" cy="118" rx="5" ry="3.4" fill="#f2c89a" stroke="#33291e" stroke-width="1.6"/>
      <!-- голова -->
      <circle cx="52" cy="66" r="26" fill="#e29a45" stroke="#33291e" stroke-width="2.5"/>
      <path d="M36 58 L22 40 L44 50 Z" fill="#d98f3f" stroke="#33291e" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M60 44 L58 22 L74 38 Z" fill="#d98f3f" stroke="#33291e" stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="28" cy="64" r="5" fill="#d98f3f" stroke="#33291e" stroke-width="1.8"/>
      <!-- глаза -->
      <ellipse cx="43" cy="62" rx="5.6" ry="6.6" fill="#fff" stroke="#33291e" stroke-width="1.6"/>
      <ellipse cx="63" cy="62" rx="5.6" ry="6.6" fill="#fff" stroke="#33291e" stroke-width="1.6"/>
      <circle cx="44.3" cy="63.5" r="3" fill="#33291e"/><circle cx="61.7" cy="63.5" r="3" fill="#33291e"/>
      <circle cx="45.5" cy="61" r="1.2" fill="#fff"/><circle cx="60.5" cy="61" r="1.2" fill="#fff"/>
      <path d="M34 52 Q43 47 52 51" stroke="#8a5420" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M54 51 Q63 47 72 52" stroke="#8a5420" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <!-- нос и рот -->
      <circle cx="53" cy="70" r="3.2" fill="#7c4a33"/>
      ${sad?`<path d="M45 80 Q52 74 60 80" stroke="#7c4a33" stroke-width="3" fill="none" stroke-linecap="round"/>`:(emo==='wow'?`<ellipse cx="53" cy="78" rx="6" ry="6" fill="#8a3b33"/>`:`<path d="M45 76 Q53 84 61 76" stroke="#7c4a33" stroke-width="3.4" fill="none" stroke-linecap="round"/>`)}
    </svg>`;
  }

  function archSVG(emo){
    const skin='#f4c9a3', skinD='#d9a87e';
    const robe='#f6ecd2', robeD='#e0d0a4', hem='#d9a441';
    const hair='#eef1f7', hairD='#c6cfe0', beard='#f4f6fb', beardD='#d3d9e6';
    const wow=emo==='wow';
    let mouth;
    if(emo==='wow') mouth=`<ellipse cx="60" cy="89.5" rx="8.4" ry="6.4" fill="#7c3326"/>
      <rect x="54.2" y="84.4" width="11.6" height="3.4" rx="1.6" fill="#fff"/>
      <path d="M54.2 87.8 Q60 90.6 65.8 87.8" stroke="#c2604f" stroke-width="2.6" fill="none"/>
      <ellipse cx="60" cy="93.6" rx="4.6" ry="2.2" fill="#c2604f"/>
      <path d="M60 79.5 l-4 -3.5 M60 79.5 l4 -3.5" stroke="#33291e" stroke-width="2.2" fill="none"/>`;
    else if(emo==='sad') mouth=`<path d="M53 88 Q60 80 67 88" stroke="#7c4a33" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    else if(emo==='think') mouth=`<path d="M54 84 Q60 88 66 84" stroke="#7c4a33" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    else if(emo==='laugh') mouth=`<path d="M50 82 Q60 98 70 82 Q60 89 50 82 Z" fill="#8a3b33"/><path d="M50 82 Q60 90 70 82" stroke="#fff" stroke-width="1.6" fill="none"/>`;
    else mouth=`<path d="M54 84 Q60 90 66 84" stroke="#a0504a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    return `<svg viewBox="0 0 120 140">
      <!-- тень -->
      <ellipse cx="60" cy="134" rx="33" ry="5" fill="rgba(0,0,0,.16)"/>
      <!-- гиматий (накидка): руки скрыты, как у статуи -->
      <path d="M36 140 C30 110 42 92 60 92 C78 92 90 110 84 140 Z" fill="${robe}" stroke="#33291e" stroke-width="2.6"/>
      <path d="M40 140 C36 118 42 104 50 98" stroke="${robeD}" stroke-width="3" fill="none"/>
      <path d="M80 140 C84 118 78 104 70 98" stroke="${robeD}" stroke-width="3" fill="none"/>
      <path d="M48 96 C52 104 50 112 48 120" stroke="${robeD}" stroke-width="2.2" fill="none" opacity=".8"/>
      <path d="M72 96 C68 104 70 112 72 120" stroke="${robeD}" stroke-width="2.2" fill="none" opacity=".8"/>
      <!-- золотая кайма по краям и подолу -->
      <path d="M42 140 C38 120 42 106 50 100 L53 100 C46 106 43 120 47 140 Z" fill="${hem}"/>
      <path d="M78 140 C82 120 78 106 70 100 L67 100 C74 106 77 120 73 140 Z" fill="${hem}"/>
      <path d="M36 140 C44 131 76 131 84 140 Z" fill="${hem}" opacity=".85"/>
      <path d="M60 100 L60 140" stroke="rgba(0,0,0,.12)" stroke-width="2.4"/>
      <!-- шея -->
      <rect x="52" y="62" width="16" height="24" rx="8" fill="${skin}" stroke="${skinD}" stroke-width="1.6"/>
      <!-- голова -->
      <circle cx="60" cy="46" r="33" fill="${skin}" stroke="#33291e" stroke-width="2.6"/>
      <!-- уши -->
      <circle cx="25" cy="55" r="7.5" fill="${skin}" stroke="#33291e" stroke-width="2"/>
      <circle cx="95" cy="55" r="7.5" fill="${skin}" stroke="#33291e" stroke-width="2"/>
      <!-- седые волосы по бокам (лысина сверху открыта) -->
      <path d="M27 44 C27 26 40 15 60 15 C80 15 93 26 93 44 C91 30 82 22 60 22 C38 22 29 30 27 44 Z" fill="${hair}" stroke="${hairD}" stroke-width="1"/>
      <path d="M26 52 C24 40 27 34 32 30 C30 38 31 46 34 52 Z" fill="${hair}"/>
      <path d="M94 52 C96 40 93 34 88 30 C90 38 89 46 86 52 Z" fill="${hair}"/>
      <!-- лавровый венок: две веточки с листьями по дуге -->
      <path d="M38 28 C42 20 50 15 60 13 C70 15 78 20 82 28" stroke="#4e7f2f" stroke-width="2.2" fill="none"/>
      <g fill="#66a33f" stroke="#3f6b26" stroke-width=".9">
        <ellipse cx="42" cy="24" rx="6.4" ry="2.7" transform="rotate(-40 42 24)"/>
        <ellipse cx="47" cy="18.5" rx="6" ry="2.6" transform="rotate(-22 47 18.5)"/>
        <ellipse cx="53" cy="14.5" rx="5.6" ry="2.5" transform="rotate(-8 53 14.5)"/>
        <ellipse cx="60" cy="13" rx="5.4" ry="2.4"/>
        <ellipse cx="67" cy="14.5" rx="5.6" ry="2.5" transform="rotate(8 67 14.5)"/>
        <ellipse cx="73" cy="18.5" rx="6" ry="2.6" transform="rotate(22 73 18.5)"/>
        <ellipse cx="78" cy="24" rx="6.4" ry="2.7" transform="rotate(40 78 24)"/>
        <ellipse cx="36" cy="20" rx="5.4" ry="2.5" transform="rotate(-64 36 20)"/>
        <ellipse cx="84" cy="20" rx="5.4" ry="2.5" transform="rotate(64 84 20)"/>
      </g>
      <!-- морщины на лбу -->
      <path d="M45 30 Q60 25 75 30" stroke="${skinD}" stroke-width="1.8" fill="none" opacity=".7"/>
      <path d="M48 35.5 Q60 31 72 35.5" stroke="${skinD}" stroke-width="1.6" fill="none" opacity=".6"/>
      <!-- кустистые седые брови -->
      <path d="M37 44 Q47 37 56 42" stroke="${hairD}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <path d="M64 42 Q73 37 83 44" stroke="${hairD}" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <!-- глаза (чуть меньше, с мешками-морщинками) -->
      <ellipse cx="46.5" cy="52" rx="5.8" ry="${wow?8:6.6}" fill="#fff" stroke="#33291e" stroke-width="1.9"/>
      <ellipse cx="73.5" cy="52" rx="5.8" ry="${wow?8:6.6}" fill="#fff" stroke="#33291e" stroke-width="1.9"/>
      <circle cx="48" cy="${wow?54.5:53.5}" r="${wow?2.6:3}" fill="#33291e"/><circle cx="72" cy="${wow?54.5:53.5}" r="${wow?2.6:3}" fill="#33291e"/>
      <circle cx="49.4" cy="${wow?52.5:51.5}" r="1.2" fill="#fff"/><circle cx="73.4" cy="${wow?52.5:51.5}" r="1.2" fill="#fff"/>
      <path d="M40 60 Q42 57 45 58" stroke="${skinD}" stroke-width="1.6" fill="none" opacity=".65"/>
      <path d="M80 60 Q78 57 75 58" stroke="${skinD}" stroke-width="1.6" fill="none" opacity=".65"/>
      <!-- нос с носогубными складками -->
      <path d="M60 50 C58 56 57 60 53 63 M60 50 C62 56 63 60 67 63" stroke="${skinD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M53 63 Q60 67 67 63" stroke="#33291e" stroke-width="2" fill="none"/>
      <path d="M50 66 Q49 71 50 75" stroke="${skinD}" stroke-width="1.7" fill="none" opacity=".7"/>
      <path d="M70 66 Q71 71 70 75" stroke="${skinD}" stroke-width="1.7" fill="none" opacity=".7"/>
      <!-- большая белая борода -->
      <path d="M33 58 C30 76 34 92 44 100 C52 107 68 107 76 100 C86 92 90 76 87 58 C87 68 82 76 76 81 C80 78 83 72 83 64 C76 74 70 80 60 80 C50 80 44 74 37 64 C37 72 40 78 44 81 C38 76 33 70 33 58 Z" fill="${beard}" stroke="#33291e" stroke-width="2.4"/>
      <!-- текстура бороды -->
      <path d="M46 86 C49 93 54 99 60 102 M60 82 L60 103 M74 86 C71 93 66 99 60 102" stroke="${beardD}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M40 76 C44 80 50 82 56 82 M80 76 C76 80 70 82 64 82" stroke="${beardD}" stroke-width="1.6" fill="none" opacity=".7"/>
      <!-- седые усы (висят по бокам рта) -->
      <path d="M60 70 C53 70 47 73 44 78 C49 77 55 74 60 72 Z" fill="${beard}" stroke="#33291e" stroke-width="1.5"/>
      <path d="M60 70 C67 70 73 73 76 78 C71 77 65 74 60 72 Z" fill="${beard}" stroke="#33291e" stroke-width="1.5"/>
      <path d="M46 74 C50 74 54 73 58 71 M74 74 C70 74 66 73 62 71" stroke="${beardD}" stroke-width="1.5" fill="none" opacity=".8"/>
      <!-- мягкая тень под усами -->
      <ellipse cx="60" cy="80.5" rx="9" ry="3.4" fill="rgba(160,170,190,.25)"/>
      <!-- рот (аккуратный, поверх бороды) -->
      ${mouth}
      <!-- румянец -->
      <ellipse cx="34" cy="62" rx="6" ry="4" fill="rgba(232,120,110,.25)"/>
      <ellipse cx="86" cy="62" rx="6" ry="4" fill="rgba(232,120,110,.25)"/>
    </svg>`;
  }
  /* ---- герой-ученик: берём выбор со стартового экрана (пол + цвет хитона) ---- */
  function heroKidGender(){ try{ if(typeof DB!=='undefined'&&DB.profile&&DB.profile.gender) return DB.profile.gender; }catch(e){} return 'boy'; }
  function heroKidColor(){ try{ if(typeof DB!=='undefined'&&DB.profile&&DB.profile.color) return DB.profile.color; }catch(e){} return '#d9a441'; }
  function heroKidName(){ try{ if(typeof DB!=='undefined'&&DB.profile&&DB.profile.name) return String(DB.profile.name).trim(); }catch(e){} return ''; }
  function kidSVG(emo){
    const g=heroKidGender(), c=heroKidColor();
    try{
      const fn = (g==='girl' && typeof girlSVG==='function') ? girlSVG
               : (typeof boySVG==='function') ? boySVG : null;
      if(!fn) throw 0;
      let s = fn(c);
      // убираем пустоту сверху (фигура стартует с y≈52) и вписываем в кадр героя
      s = s.replace('viewBox="0 0 220 300"', 'viewBox="0 42 220 258"');
      if(emo==='wow') s = s.replace('</svg>',
        '<text x="40" y="76" font-size="26" class="c2a-spark">✨</text><text x="176" y="76" font-size="26" class="c2a-spark">✨</text></svg>');
      return s;
    }catch(e){ return humanSVG(emo,'kid'); }
  }
  const PERS={
    arch:{ svg:(e)=>archSVG(e), name:'Архимед', color:'#a3762a' },
    kid:{ svg:(e)=>kidSVG(e), name:'Ты', color:'#4a93d0' },
    granny:{ svg:(e)=>humanSVG(e,'granny'), name:'Бабушка', color:'#7c4f81' },
    cat:{ svg:catSVG, name:'Барсик', color:'#c07a30' },
    fish:{ svg:fishSVG, name:'Рыбка', color:'#4a93d0' },
    coin:{ svg:coinSVG, name:'Монетка', color:'#8a6d1e' },
    pig:{ svg:pigSVG, name:'Пятачок', color:'#a05a50' },
    squirrel:{ svg:squirrelSVG, name:'Рыжик', color:'#c97b2d' }
  };

  /* плашка-надпись сцены (как реплика комикса) */
  function propTag(prop,x,y,w){
    if(!prop) return '';
    const fs=w>150?19:(w>110?16:13);
    return `<g class="c2a-prop"><rect x="${x-14}" y="${y-24}" width="${w+28}" height="34" rx="17"
        fill="#fffef4" stroke="#33291e" stroke-width="3"/>
      <text x="${x+w/2}" y="${y+1}" text-anchor="middle" font-size="${fs}" font-weight="bold" fill="#33291e" font-family="Georgia,serif">${escHtml(prop)}</text></g>`;
  }
function pondSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <!-- небо -->
      <rect x="0" y="0" width="360" height="102" fill="url(#skP)"/>
      <defs><linearGradient id="skP" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#b7e0f7"/><stop offset="1" stop-color="#8ecdf0"/></linearGradient>
        <linearGradient id="wtP" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6fc0e8"/><stop offset="1" stop-color="#2f7fb8"/></linearGradient></defs>
      <!-- солнце (за облаками) -->
      <circle cx="310" cy="28" r="17" fill="#ffe08a"/>
      <!-- облака -->
      <g fill="#fff" opacity=".95" class="c2a-cloud">
        <ellipse cx="70" cy="26" rx="26" ry="11"/><ellipse cx="92" cy="20" rx="18" ry="9"/>
        <ellipse cx="205" cy="40" rx="24" ry="9"/><ellipse cx="224" cy="34" rx="16" ry="8"/>
      </g>
      <!-- дальний луг за прудом -->
      <rect x="0" y="88" width="360" height="20" fill="#93c270"/>
      <path d="M0 88 Q30 82 60 88 T120 88 T180 88 T240 88 T300 88 T360 88 L360 108 L0 108 Z" fill="#7fb45c" opacity=".6"/>
      <!-- вода -->
      <rect x="0" y="104" width="360" height="94" fill="url(#wtP)"/>
      <!-- передний берег, на котором стоят герои -->
      <path d="M0 198 L360 198 L360 210 L0 210 Z" fill="#7fb45c"/>
      <path d="M0 196 Q40 192 80 196 T160 196 T240 196 T320 196 T360 196 L360 210 L0 210 Z" fill="#5c8f3e"/>
      <g stroke="#6f9c46" stroke-width="2" fill="none">
        <path d="M40 210 Q38 200 42 194"/><path d="M150 210 Q152 201 149 195"/>
        <path d="M280 210 Q278 200 282 194"/></g>
      <!-- блики-волны на воде -->
      <g stroke="#cdeefc" stroke-width="2.5" fill="none" opacity=".75" stroke-linecap="round">
        <path d="M30 118 q7 -5 14 0 t14 0"/><path d="M150 124 q7 -5 14 0 t14 0"/>
        <path d="M250 116 q7 -5 14 0 t14 0"/><path d="M90 160 q7 -5 14 0 t14 0"/>
        <path d="M205 150 q7 -5 14 0 t14 0"/><path d="M320 170 q7 -5 14 0 t14 0"/>
      </g>
      <!-- камыши из дна (слева) -->
      <g stroke="#6f9c46" stroke-width="3" fill="none">
        <path d="M20 210 Q18 150 30 96"/><path d="M34 210 Q34 160 46 118"/></g>
      <ellipse cx="30" cy="92" rx="4.5" ry="16" fill="#8a6130"/><ellipse cx="46" cy="114" rx="4" ry="14" fill="#8a6130"/>
      <g stroke="#5f8a3d" stroke-width="2.5" fill="none">
        <path d="M96 210 Q92 165 100 132"/></g>
      <ellipse cx="100" cy="128" rx="4" ry="13" fill="#7a5428"/>
      <!-- кувшинка на воде -->
      <ellipse cx="258" cy="112" rx="17" ry="7" fill="#4e8f4a"/>
      <path d="M258 104 L258 112" stroke="#4e8f4a" stroke-width="2"/>
      <g transform="translate(258,102)">
        <ellipse cx="0" cy="-6" rx="6" ry="10" fill="#fff" transform="rotate(20)"/>
        <ellipse cx="0" cy="-6" rx="6" ry="10" fill="#fff" transform="rotate(60)"/>
        <ellipse cx="0" cy="-6" rx="6" ry="10" fill="#fff" transform="rotate(100)"/>
        <ellipse cx="0" cy="-6" rx="6" ry="10" fill="#fff" transform="rotate(140)"/>
        <circle r="4" fill="#ffd45e"/>
      </g>
      <!-- рыбки ПОД водой -->
      <g class="c2a-fish">
        <text x="52" y="150" font-size="30">🐟</text>
        <text x="168" y="182" font-size="28">🐠</text>
        <text x="272" y="140" font-size="26">🐟</text>
      </g>
      <!-- пузырьки -->
      <g fill="#fff" opacity=".7">
        <circle cx="90" cy="176" r="2.6"/><circle cx="96" cy="166" r="1.8"/><circle cx="82" cy="168" r="1.4"/>
      </g>
    </svg>`;
  }


function kitchenSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs>
        <linearGradient id="wlK" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f8e7cb"/><stop offset="1" stop-color="#f0d2a8"/></linearGradient>
        <linearGradient id="flK" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c2915b"/><stop offset="1" stop-color="#9c6c3a"/></linearGradient>
      </defs>
      <!-- стена -->
      <rect x="0" y="0" width="360" height="152" fill="url(#wlK)"/>
      <rect x="0" y="0" width="360" height="152" fill="none"/>
      <!-- окно на стене с небом за ним -->
      <rect x="240" y="20" width="98" height="82" rx="4" fill="#fff" stroke="#8a5c33" stroke-width="7"/>
      <rect x="248" y="28" width="82" height="66" fill="#bfe3f7"/>
      <circle cx="316" cy="46" r="9" fill="#ffe08a"/>
      <ellipse cx="268" cy="44" rx="12" ry="5" fill="#fff" opacity=".9"/>
      <line x1="289" y1="28" x2="289" y2="94" stroke="#8a5c33" stroke-width="5"/>
      <line x1="248" y1="61" x2="330" y2="61" stroke="#8a5c33" stroke-width="5"/>
      <!-- занавески -->
      <path d="M240 20 q10 22 0 34 q-4 -6 0 -34 Z" fill="#d97b6c"/>
      <path d="M338 20 q-10 22 0 34 q4 -6 0 -34 Z" fill="#d97b6c"/>
      <!-- полка с баночками -->
      <rect x="18" y="52" width="118" height="8" rx="2" fill="#9c6c3a"/>
      <rect x="18" y="52" width="118" height="3" fill="#c2915b"/>
      <text x="46" y="44" font-size="22">🧂</text><text x="92" y="46" font-size="20">🍯</text>
      <!-- пол -->
      <rect x="0" y="152" width="360" height="58" fill="url(#flK)"/>
      <g stroke="#7c5028" stroke-width="1.6" opacity=".5">
        <line x1="0" y1="170" x2="360" y2="170"/><line x1="0" y1="188" x2="360" y2="188"/>
        <line x1="60" y1="152" x2="44" y2="210"/><line x1="150" y1="152" x2="140" y2="210"/>
        <line x1="240" y1="152" x2="252" y2="210"/><line x1="330" y1="152" x2="336" y2="210"/>
      </g>
      <!-- тень под столом -->
      <rect x="40" y="196" width="280" height="10" rx="5" fill="rgba(0,0,0,.16)"/>
      <!-- стол: ножки и столешница -->
      <rect x="52" y="170" width="14" height="40" fill="#8a5c33"/>
      <rect x="294" y="170" width="14" height="40" fill="#8a5c33"/>
      <rect x="52" y="170" width="14" height="40" fill="#a8721f" opacity=".35"/>
      <rect x="40" y="150" width="280" height="16" rx="3" fill="#a8721f" stroke="#6e441d" stroke-width="3"/>
      <rect x="40" y="150" width="280" height="6" rx="3" fill="#c2915b"/>
      <!-- скатёрка-полоска -->
      <rect x="46" y="166" width="268" height="10" fill="#e8d5b0" opacity=".85"/>
      <!-- тарелка на столе -->
      <ellipse cx="150" cy="152" rx="30" ry="8" fill="#f4f0e4" stroke="#c9c2ae" stroke-width="2"/>
      <!-- пирожки НА тарелке/столе -->
      <text x="128" y="151" font-size="22">🥧</text>
      <text x="148" y="155" font-size="24">🥧</text>
      <text x="170" y="151" font-size="22">🥧</text>
      <!-- чайник на столе -->
      <text x="252" y="156" font-size="30">🫖</text>
    </svg>`;
  }


function coinsSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs>
        <linearGradient id="skC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fdf3d2"/><stop offset="1" stop-color="#f3e0a8"/></linearGradient>
        <linearGradient id="grC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8fc060"/><stop offset="1" stop-color="#5c8f3e"/></linearGradient>
      </defs>
      <!-- небо -->
      <rect x="0" y="0" width="360" height="166" fill="url(#skC)"/>
      <circle cx="306" cy="34" r="16" fill="#ffd96a"/>
      <!-- облако -->
      <g fill="#fff" opacity=".95" class="c2a-cloud">
        <ellipse cx="80" cy="40" rx="26" ry="10"/><ellipse cx="102" cy="33" rx="17" ry="8"/>
        <ellipse cx="200" cy="60" rx="22" ry="9"/><ellipse cx="218" cy="53" rx="15" ry="7"/>
      </g>
      <!-- дерево слева: ствол из земли, крона -->
      <rect x="52" y="104" width="20" height="72" fill="#7a5230"/>
      <rect x="52" y="104" width="20" height="72" fill="#8a6130" opacity=".4"/>
      <path d="M44 110 Q30 60 20 44 L26 60 Z" fill="#4e7f2f"/>
      <g fill="#5f9a3c">
        <circle cx="62" cy="62" r="30"/><circle cx="34" cy="84" r="24"/><circle cx="92" cy="84" r="24"/>
      </g>
      <g fill="#74b04c" opacity=".6">
        <circle cx="52" cy="52" r="14"/><circle cx="78" cy="70" r="16"/>
      </g>
      <!-- земля -->
      <rect x="0" y="166" width="360" height="44" fill="url(#grC)"/>
      <path d="M0 166 Q30 158 60 166 T120 166 T180 166 T240 166 T300 166 T360 166 L360 178 L0 178 Z" fill="#a2d078" opacity=".7"/>
      <!-- тень под сундуком -->
      <ellipse cx="210" cy="196" rx="85" ry="9" fill="rgba(0,0,0,.22)"/>
      <!-- сундук (стоит на земле) -->
      <g>
        <!-- крышка откинута назад -->
        <path d="M140 148 L118 84 L300 84 L282 148 Z" fill="#9a6a1c" stroke="#5f3f12" stroke-width="4"/>
        <path d="M140 148 L118 84 L210 78 L300 84 L282 148 Z" fill="#b07a2e" stroke="#5f3f12" stroke-width="4"/>
        <line x1="210" y1="80" x2="210" y2="146" stroke="#8a5c1e" stroke-width="3"/>
        <!-- корпус -->
        <rect x="140" y="146" width="142" height="42" rx="4" fill="#b07a2e" stroke="#5f3f12" stroke-width="4"/>
        <rect x="140" y="146" width="142" height="12" rx="3" fill="#c98f3a"/>
        <!-- оковка -->
        <line x1="211" y1="146" x2="211" y2="188" stroke="#8a5c1e" stroke-width="3"/>
        <rect x="204" y="160" width="14" height="10" rx="2" fill="#ffe08a" stroke="#8a5c1e" stroke-width="2"/>
        <!-- монеты внутри сундука -->
        <text x="160" y="180" font-size="22">🪙</text>
        <text x="188" y="184" font-size="20">🪙</text>
        <text x="214" y="176" font-size="24">🪙</text>
        <text x="242" y="184" font-size="20">🪙</text>
        <text x="264" y="178" font-size="22">🪙</text>
      </g>
      <!-- кучка монет на земле перед сундуком -->
      <g class="c2a-coin">
        <text x="176" y="200" font-size="20">🪙</text>
        <text x="198" y="204" font-size="24">🪙</text>
        <text x="224" y="199" font-size="20">🪙</text>
        <text x="248" y="204" font-size="22">🪙</text>
        <text x="272" y="199" font-size="20">🪙</text>
      </g>
      <!-- одна монетка откатилась в сторону -->
      <text x="92" y="203" font-size="20" class="c2a-coin">🪙</text>
      <!-- искры -->
      <text x="150" y="72" font-size="18" class="c2a-spark">✨</text>
      <text x="282" y="60" font-size="18" class="c2a-spark">✨</text>
      <text x="248" y="120" font-size="15" class="c2a-spark">✨</text>
    </svg>`;
  }




  /* ============ НОВЫЕ СЦЕНЫ: сад, огород, двор, магазин, космос ============ */
  function sadSVG(){ // сад: яблоня с яблоками, корзина
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skS" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfeffb"/><stop offset="1" stop-color="#a9dcf4"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skS)"/>
      <circle cx="316" cy="30" r="16" fill="#ffe08a"/>
      <g fill="#fff" opacity=".95">
        <ellipse cx="70" cy="26" rx="26" ry="10"/><ellipse cx="92" cy="19" rx="17" ry="8"/>
        <ellipse cx="250" cy="40" rx="22" ry="9"/><ellipse cx="268" cy="33" rx="15" ry="7"/></g>
      <rect x="0" y="150" width="360" height="60" fill="#7fb45c"/>
      <path d="M0 150 Q40 143 80 150 T160 150 T240 150 T320 150 T360 150 L360 162 L0 162 Z" fill="#5c8f3e" opacity=".55"/>
      <g stroke="#6f9c46" stroke-width="2" fill="none">
        <path d="M30 210 Q27 195 33 187"/><path d="M200 210 Q198 199 203 190"/><path d="M330 210 Q327 197 332 189"/></g>
      <!-- яблоня -->
      <rect x="168" y="108" width="26" height="46" rx="8" fill="#8a5c33" stroke="#5f3f12" stroke-width="2"/>
      <g fill="#5f9a3c" stroke="#3f6b26" stroke-width="1.5">
        <circle cx="150" cy="86" r="46"/><circle cx="215" cy="92" r="42"/><circle cx="183" cy="62" r="48"/></g>
      <g fill="#74b04c" opacity=".55">
        <circle cx="158" cy="70" r="16"/><circle cx="205" cy="74" r="18"/><circle cx="178" cy="96" r="15"/></g>
      <!-- яблоки на дереве -->
      <g class="c2a-apple">
        <text x="150" y="60" font-size="24">🍎</text><text x="196" y="52" font-size="24">🍎</text>
        <text x="228" y="84" font-size="22">🍎</text><text x="128" y="92" font-size="22">🍎</text>
        <text x="168" y="108" font-size="20">🍎</text></g>
      <!-- корзина с яблоками справа на траве -->
      <path d="M236 168 L236 192 Q236 200 252 200 L282 200 Q298 200 298 192 L298 168 Z" fill="#b07a2e" stroke="#5f3f12" stroke-width="2.5"/>
      <path d="M236 168 Q267 156 298 168" stroke="#8a5c1e" stroke-width="4" fill="none"/>
      <text x="252" y="158" font-size="20">🍎</text><text x="272" y="152" font-size="20">🍎</text><text x="262" y="176" font-size="18">🍎</text>
      <text x="252" y="192" font-size="16">🍎</text><text x="272" y="190" font-size="16">🍎</text>
      <path d="M60 210 Q56 198 63 190" stroke="#6f9c46" stroke-width="2.5" fill="none"/>
    </svg>`; }
  function ogorodSVG(){ // огород: грядки с морковками
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skO" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d6f0fd"/><stop offset="1" stop-color="#b2e0f6"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="96" fill="url(#skO)"/>
      <circle cx="318" cy="26" r="15" fill="#ffe08a"/>
      <g fill="#fff" opacity=".95"><ellipse cx="70" cy="22" rx="25" ry="9"/><ellipse cx="90" cy="16" rx="16" ry="7"/></g>
      <!-- забор на горизонте -->
      <g stroke="#a8721f" stroke-width="3">
        <line x1="0" y1="86" x2="360" y2="86"/></g>
      <rect x="0" y="86" width="360" height="14" fill="#c2915b"/>
      <g stroke="#8a5c33" stroke-width="2.5"><line x1="30" y1="84" x2="30" y2="100"/><line x1="80" y1="84" x2="80" y2="100"/><line x1="130" y1="84" x2="130" y2="100"/><line x1="180" y1="84" x2="180" y2="100"/><line x1="230" y1="84" x2="230" y2="100"/><line x1="280" y1="84" x2="280" y2="100"/><line x1="330" y1="84" x2="330" y2="100"/></g>
      <!-- земля и грядки -->
      <rect x="0" y="100" width="360" height="110" fill="#a06a3a"/>
      <rect x="20" y="112" width="150" height="52" rx="8" fill="#7a4a26"/>
      <rect x="196" y="112" width="146" height="52" rx="8" fill="#7a4a26"/>
      <g stroke="#5f3a1a" stroke-width="2" opacity=".5">
        <line x1="24" y1="120" x2="24" y2="160"/><line x1="46" y1="120" x2="46" y2="160"/><line x1="68" y1="120" x2="68" y2="160"/><line x1="90" y1="120" x2="90" y2="160"/><line x1="112" y1="120" x2="112" y2="160"/><line x1="134" y1="120" x2="134" y2="160"/></g>
      <g stroke="#5f3a1a" stroke-width="2" opacity=".5">
        <line x1="200" y1="120" x2="200" y2="160"/><line x1="222" y1="120" x2="222" y2="160"/><line x1="244" y1="120" x2="244" y2="160"/><line x1="266" y1="120" x2="266" y2="160"/><line x1="288" y1="120" x2="288" y2="160"/><line x1="310" y1="120" x2="310" y2="160"/></g>
      <!-- морковки в грядках -->
      <g class="c2a-carrot">
        <text x="36" y="146" font-size="22">🥕</text><text x="78" y="146" font-size="22">🥕</text><text x="120" y="146" font-size="22">🥕</text>
        <text x="210" y="140" font-size="22">🥕</text><text x="252" y="146" font-size="22">🥕</text><text x="294" y="140" font-size="22">🥕</text></g>
      <!-- ведёрко с морковками -->
      <path d="M40 168 L40 198 Q40 204 50 204 L84 204 Q94 204 94 198 L94 168 Z" fill="#d98f3f" stroke="#7a4a26" stroke-width="2"/>
      <text x="54" y="160" font-size="18">🥕</text><text x="72" y="162" font-size="18">🥕</text>
      <text x="50" y="192" font-size="16">🥕</text><text x="70" y="194" font-size="16">🥕</text>
    </svg>`; }
  function fermaSVG(){ // птичий двор: куры и цыплята
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skF" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cdeefb"/><stop offset="1" stop-color="#a5d9f0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="96" fill="url(#skF)"/>
      <circle cx="314" cy="26" r="15" fill="#ffe08a"/>
      <g fill="#fff" opacity=".95"><ellipse cx="66" cy="22" rx="24" ry="9"/><ellipse cx="86" cy="16" rx="16" ry="7"/></g>
      <!-- курятник справа -->
      <rect x="236" y="52" width="104" height="70" fill="#c98f3a" stroke="#7a4a26" stroke-width="2.5"/>
      <path d="M232 52 L288 26 L344 52 Z" fill="#a8721f" stroke="#7a4a26" stroke-width="2.5"/>
      <rect x="300" y="92" width="24" height="30" fill="#5f3f12"/>
      <circle cx="312" cy="150" r="10" fill="#5f3f12"/>
      <!-- трава двора -->
      <rect x="0" y="96" width="360" height="114" fill="#8fc060"/>
      <path d="M0 96 Q40 88 80 96 T160 96 T240 96 T320 96 T360 96 L360 108 L0 108 Z" fill="#5c8f3e" opacity=".5"/>
      <!-- забор слева -->
      <g stroke="#c2915b" stroke-width="4"><line x1="14" y1="120" x2="14" y2="160"/><line x1="44" y1="120" x2="44" y2="160"/><line x1="74" y1="120" x2="74" y2="160"/><line x1="104" y1="120" x2="104" y2="160"/></g>
      <rect x="6" y="118" width="106" height="10" rx="4" fill="#c2915b"/><rect x="6" y="150" width="106" height="10" rx="4" fill="#c2915b"/>
      <!-- куры и цыплята -->
      <g class="c2a-chick">
        <text x="150" y="150" font-size="30">🐔</text><text x="196" y="156" font-size="28">🐔</text>
        <text x="120" y="178" font-size="22">🐥</text><text x="146" y="184" font-size="20">🐥</text><text x="172" y="180" font-size="22">🐥</text>
        <text x="206" y="184" font-size="18">🐥</text><text x="232" y="178" font-size="20">🐥</text></g>
      <!-- зёрнышки -->
      <g fill="#e8d5a8"><circle cx="140" cy="168" r="1.6"/><circle cx="190" cy="172" r="1.6"/><circle cx="224" cy="170" r="1.6"/></g>
      <g stroke="#5c8f3e" stroke-width="2" fill="none">
        <path d="M50 210 Q46 198 52 190"/><path d="M330 210 Q326 197 332 189"/></g>
    </svg>`; }
  function magazinSVG(){ // магазин игрушек: полки
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="wlM" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fdf3d9"/><stop offset="1" stop-color="#f3e0b5"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="148" fill="url(#wlM)"/>
      <!-- вывеска -->
      <rect x="96" y="12" width="168" height="30" rx="8" fill="#d97b6c" stroke="#8a3b2e" stroke-width="2.5"/>
      <text x="180" y="32" text-anchor="middle" font-size="17" font-weight="bold" fill="#fff" font-family="Georgia,serif">ИГРУШКИ</text>
      <!-- полки -->
      <g>
        <rect x="20" y="58" width="150" height="8" rx="3" fill="#a8721f"/><rect x="20" y="58" width="150" height="3" fill="#c2915b"/>
        <text x="44" y="52" font-size="26">🧸</text><text x="92" y="54" font-size="24">🚗</text><text x="136" y="52" font-size="26">⚽</text>
        <rect x="196" y="58" width="146" height="8" rx="3" fill="#a8721f"/><rect x="196" y="58" width="146" height="3" fill="#c2915b"/>
        <text x="222" y="52" font-size="26">🎈</text><text x="270" y="52" font-size="26">🧸</text><text x="316" y="52" font-size="24">🚂</text>
      </g>
      <g>
        <rect x="20" y="104" width="150" height="8" rx="3" fill="#a8721f"/><rect x="20" y="104" width="150" height="3" fill="#c2915b"/>
        <text x="52" y="100" font-size="24">🪁</text><text x="98" y="100" font-size="26">🎲</text><text x="140" y="100" font-size="22">🧸</text>
        <rect x="196" y="104" width="146" height="8" rx="3" fill="#a8721f"/><rect x="196" y="104" width="146" height="3" fill="#c2915b"/>
        <text x="220" y="100" font-size="26">⚽</text><text x="268" y="100" font-size="22">🚗</text><text x="314" y="100" font-size="22">🎈</text>
      </g>
      <!-- пол -->
      <rect x="0" y="148" width="360" height="62" fill="#c2915b"/>
      <g stroke="#8a5c33" stroke-width="1.6" opacity=".5">
        <line x1="0" y1="166" x2="360" y2="166"/><line x1="0" y1="184" x2="360" y2="184"/>
        <line x1="60" y1="148" x2="48" y2="210"/><line x1="150" y1="148" x2="140" y2="210"/>
        <line x1="240" y1="148" x2="252" y2="210"/><line x1="330" y1="148" x2="336" y2="210"/></g>
      <!-- прилавок справа снизу -->
      <rect x="250" y="162" width="100" height="12" rx="3" fill="#a8721f" stroke="#6e441d" stroke-width="2"/>
      <rect x="262" y="174" width="10" height="30" fill="#8a5c33"/><rect x="330" y="174" width="10" height="30" fill="#8a5c33"/>
      <text x="282" y="160" font-size="20">🧸</text>
    </svg>`; }
  function cosmosSVG(){ // космос: звёзды, ракета, поверхность Луны
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skC2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2450"/><stop offset="1" stop-color="#3d4d94"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skC2)"/>
      <g class="c2a-star">
        <text x="40" y="40" font-size="22">⭐</text><text x="120" y="60" font-size="16">✨</text>
        <text x="210" y="34" font-size="20">⭐</text><text x="300" y="70" font-size="18">✨</text>
        <text x="84" y="92" font-size="14">✨</text><text x="270" y="120" font-size="16">⭐</text>
        <text x="330" y="30" font-size="14">✨</text></g>
      <text x="60" y="130" font-size="30">🪐</text>
      <text x="296" y="60" font-size="34">🚀</text>
      <!-- поверхность Луны -->
      <rect x="0" y="150" width="360" height="60" fill="#9aa0b8"/>
      <path d="M0 150 Q40 144 80 150 T160 150 T240 150 T320 150 T360 150 L360 162 L0 162 Z" fill="#7f859e" opacity=".6"/>
      <g fill="#6f7690" stroke="#565c73" stroke-width="1.5">
        <circle cx="70" cy="178" r="9"/><circle cx="180" cy="190" r="7"/><circle cx="300" cy="176" r="11"/>
        <circle cx="130" cy="200" r="5"/><circle cx="240" cy="202" r="6"/></g>
    </svg>`; }

  function lesSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skL" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#7fc3e0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="140" fill="url(#skL)"/>
      <g class="c2a-cloud"><text x="40" y="40" font-size="30">☁️</text><text x="250" y="60" font-size="26">☁️</text></g>
      <text x="306" y="40" font-size="26">🌞</text>
      <path d="M0 118 Q90 92 180 116 T360 112 L360 150 L0 150 Z" fill="#7fb45c"/>
      <path d="M0 140 Q120 118 360 146 L360 168 L0 168 Z" fill="#5c8f3e"/>
      <rect x="0" y="150" width="360" height="60" fill="#4a7a33"/>
      <g font-size="52">
        <text x="18" y="172">🌲</text><text x="70" y="188">🌳</text>
        <text x="288" y="168">🌲</text><text x="330" y="186">🌳</text>
        <text x="150" y="186" font-size="40">🌳</text>
      </g>
      <g font-size="24">
        <text x="30" y="196">🍄</text><text x="208" y="200">🍄</text>
        <text x="262" y="200" font-size="18">🌼</text><text x="120" y="196" font-size="18">🌼</text>
      </g>
      <g class="c2a-spark"><text x="98" y="150" font-size="22">🌰</text><text x="240" y="158" font-size="18">🌰</text></g>
    </svg>`; }
  function trainSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skT" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfe6f5"/><stop offset="1" stop-color="#a8d2ea"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skT)"/>
      <g class="c2a-cloud"><text x="30" y="36" font-size="28">☁️</text><text x="240" y="30" font-size="24">☁️</text></g>
      <text x="310" y="52" font-size="24">🌞</text>
      <rect x="0" y="120" width="360" height="14" fill="#8a9a5a"/>
      <rect x="0" y="134" width="360" height="10" fill="#7c6b4a"/>
      <!-- рельсы -->
      <path d="M0 158 L360 158" stroke="#5a4a33" stroke-width="3"/>
      <path d="M0 166 L360 166" stroke="#5a4a33" stroke-width="3"/>
      <g stroke="#5a4a33" stroke-width="2">
        <line x1="30" y1="158" x2="30" y2="166"/><line x1="70" y1="158" x2="70" y2="166"/>
        <line x1="110" y1="158" x2="110" y2="166"/><line x1="150" y1="158" x2="150" y2="166"/>
        <line x1="190" y1="158" x2="190" y2="166"/><line x1="230" y1="158" x2="230" y2="166"/>
        <line x1="270" y1="158" x2="270" y2="166"/><line x1="310" y1="158" x2="310" y2="166"/>
      </g>
      <!-- паровоз -->
      <rect x="14" y="96" width="86" height="52" rx="8" fill="#c0392b" stroke="#33291e" stroke-width="3"/>
      <rect x="8" y="112" width="18" height="24" rx="5" fill="#a93226" stroke="#33291e" stroke-width="2.5"/>
      <circle cx="34" cy="140" r="12" fill="#3a3a3a" stroke="#33291e" stroke-width="3"/>
      <circle cx="78" cy="140" r="12" fill="#3a3a3a" stroke="#33291e" stroke-width="3"/>
      <circle cx="34" cy="140" r="5" fill="#9aa0b8"/><circle cx="78" cy="140" r="5" fill="#9aa0b8"/>
      <rect x="26" y="80" width="34" height="16" rx="6" fill="#e67e22" stroke="#33291e" stroke-width="2.5"/>
      <g class="c2a-smoke" font-size="26"><text x="52" y="74">💨</text><text x="40" y="52">💨</text></g>
      <rect x="30" y="102" width="26" height="20" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <!-- вагон 1 -->
      <rect x="112" y="104" width="70" height="44" rx="7" fill="#e8b04c" stroke="#33291e" stroke-width="3"/>
      <rect x="122" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <rect x="150" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <circle cx="126" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
      <circle cx="168" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
      <!-- вагон 2 -->
      <rect x="192" y="104" width="70" height="44" rx="7" fill="#4a93d0" stroke="#33291e" stroke-width="3"/>
      <rect x="202" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <rect x="230" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <circle cx="206" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
      <circle cx="248" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
      <!-- вагон 3 -->
      <rect x="272" y="104" width="70" height="44" rx="7" fill="#5f9a6a" stroke="#33291e" stroke-width="3"/>
      <rect x="282" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <rect x="310" y="112" width="22" height="18" rx="4" fill="#d9e8f5" stroke="#33291e" stroke-width="2"/>
      <circle cx="286" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
      <circle cx="328" cy="146" r="9" fill="#3a3a3a" stroke="#33291e" stroke-width="2.5"/>
    </svg>`; }

  function workshopSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skW" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e8d5ae"/><stop offset="1" stop-color="#c9a86a"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skW)"/>
      <!-- полки с инструментами -->
      <rect x="8" y="16" width="130" height="8" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
      <g font-size="20">
        <text x="18" y="44">🔩</text><text x="52" y="40">⚙️</text><text x="86" y="44">🔧</text><text x="118" y="42">🔨</text>
      </g>
      <rect x="222" y="16" width="130" height="8" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
      <g font-size="20">
        <text x="234" y="42">📐</text><text x="270" y="42">🪛</text><text x="306" y="42">⚙️</text><text x="336" y="44">🛠️</text>
      </g>
      <!-- висящая лампа -->
      <line x1="180" y1="0" x2="180" y2="10" stroke="#5f3a1a" stroke-width="2"/>
      <circle cx="180" cy="18" r="9" fill="#ffd76a" stroke="#5f3a1a" stroke-width="2"/>
      <!-- верстак -->
      <rect x="30" y="120" width="300" height="16" fill="#9c6c3a" stroke="#5f3a1a" stroke-width="3"/>
      <rect x="40" y="136" width="20" height="50" fill="#7a4f26" stroke="#5f3a1a" stroke-width="2"/>
      <rect x="300" y="136" width="20" height="50" fill="#7a4f26" stroke="#5f3a1a" stroke-width="2"/>
      <rect x="150" y="136" width="22" height="50" fill="#7a4f26" stroke="#5f3a1a" stroke-width="2"/>
      <!-- детали на верстаке -->
      <g font-size="22">
        <text x="60" y="116">⚙️</text><text x="96" y="114">🔩</text><text x="150" y="116">🧩</text>
        <text x="196" y="114">⚙️</text><text x="240" y="116">🔧</text><text x="286" y="114">🧱</text>
      </g>
      <!-- коробка-окошко x -->
      <g class="c2a-spark">
        <rect x="70" y="62" width="46" height="40" rx="6" fill="#fffef4" stroke="#33291e" stroke-width="3"/>
        <text x="93" y="90" text-anchor="middle" font-size="26" font-weight="bold" fill="#a3762a" font-family="Georgia,serif">x</text>
      </g>
      <rect x="0" y="186" width="360" height="24" fill="#7a5a34"/>
    </svg>`; }
  function beachSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skB" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fd3f0"/><stop offset="1" stop-color="#5fb8e0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skB)"/>
      <text x="310" y="42" font-size="30">🌞</text>
      <g class="c2a-cloud"><text x="30" y="40" font-size="26">☁️</text><text x="150" y="64" font-size="22">☁️</text></g>
      <!-- море с волнами -->
      <path d="M0 96 Q40 88 80 96 T160 96 T240 96 T320 96 T360 96 L360 132 L0 132 Z" fill="#3f9ed6"/>
      <path d="M0 112 Q50 104 100 112 T200 112 T300 112 T360 112" stroke="#bfe6f7" stroke-width="3" fill="none"/>
      <!-- пляж -->
      <rect x="0" y="132" width="360" height="78" fill="#f0d9a8"/>
      <path d="M0 132 Q90 126 180 132 T360 132" fill="#e3c88e"/>
      <g font-size="22">
        <text x="36" y="172">🐚</text><text x="96" y="188">⭐</text><text x="180" y="180">🐚</text><text x="262" y="170">🐚</text>
        <text x="318" y="190" font-size="16">⭐</text>
      </g>
      <!-- ведёрко и зонтик -->
      <rect x="268" y="118" width="26" height="24" rx="3" fill="#e86a5a" stroke="#33291e" stroke-width="2.5"/>
      <path d="M274 118 Q281 110 288 118" stroke="#33291e" stroke-width="2.5" fill="none"/>
      <line x1="120" y1="140" x2="110" y2="96" stroke="#7c4a33" stroke-width="3"/>
      <path d="M110 96 Q132 78 158 92 Q140 102 122 100 Z" fill="#e86a5a" stroke="#33291e" stroke-width="2"/>
      <!-- вода в ведёрке -->
      <rect x="270" y="120" width="22" height="8" fill="#7fd1ff"/>
      <g class="c2a-spark"><text x="150" y="200" font-size="18">💧</text></g>
    </svg>`; }

  function winterSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skW2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9fb8e8"/><stop offset="1" stop-color="#7f9ed8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skW2)"/>
      <g class="c2a-cloud"><text x="30" y="36" font-size="26">☁️</text><text x="200" y="46" font-size="22">☁️</text></g>
      <text x="60" y="30" font-size="20">❄️</text><text x="150" y="60" font-size="16">❄️</text>
      <text x="300" y="34" font-size="20">❄️</text><text x="120" y="92" font-size="14">❄️</text>
      <rect x="0" y="150" width="360" height="60" fill="#eef3fb"/>
      <ellipse cx="80" cy="176" rx="46" ry="12" fill="#ffffff" opacity=".85"/>
      <ellipse cx="300" cy="188" rx="60" ry="14" fill="#ffffff" opacity=".8"/>
      <!-- ёлка -->
      <rect x="196" y="180" width="10" height="20" fill="#7c4a33"/>
      <polygon points="201,44 160,112 242,112" fill="#2f7d4e" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,78 166,140 236,140" fill="#357f4f" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,108 172,168 230,168" fill="#3a8a58" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,26 174,70 228,70" fill="#2f7d4e" stroke="#1f5c38" stroke-width="2.5"/>
      <text x="178" y="52" font-size="22">⭐</text>
      <g class="c2a-coin" font-size="20">
        <text x="190" y="86">🟡</text><text x="212" y="100">🔴</text><text x="188" y="126">🟡</text><text x="214" y="142">🔵</text>
      </g>
      <!-- сугроб и подарок -->
      <path d="M0 196 Q60 186 120 196 T240 196 T360 196 L360 210 L0 210 Z" fill="#ffffff"/>
      <rect x="252" y="168" width="30" height="22" rx="4" fill="#e86a5a" stroke="#33291e" stroke-width="2.5"/>
      <path d="M267 168 L267 190 M252 179 L282 179" stroke="#f4e9c8" stroke-width="3"/>
    </svg>`; }
  function roomSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#f6e3c5"/>
      <rect x="0" y="0" width="360" height="120" fill="#eacfa3"/>
      <!-- окно -->
      <rect x="240" y="18" width="84" height="70" rx="6" fill="#bfe6f7" stroke="#8a5a2b" stroke-width="5"/>
      <line x1="282" y1="18" x2="282" y2="88" stroke="#8a5a2b" stroke-width="4"/>
      <line x1="240" y1="53" x2="324" y2="53" stroke="#8a5a2b" stroke-width="4"/>
      <text x="252" y="44" font-size="18">🌞</text>
      <!-- пол -->
      <rect x="0" y="120" width="360" height="90" fill="#c89a6a"/>
      <path d="M0 120 L360 120" stroke="#a87c4f" stroke-width="4"/>
      <rect x="0" y="150" width="360" height="6" fill="#a87c4f" opacity=".5"/>
      <rect x="0" y="180" width="360" height="6" fill="#a87c4f" opacity=".5"/>
      <!-- ковёр -->
      <ellipse cx="150" cy="184" rx="90" ry="16" fill="#d97f6a" opacity=".75"/>
      <!-- полка с игрушками -->
      <rect x="18" y="40" width="120" height="8" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
      <g font-size="26">
        <text x="26" y="76">🧸</text><text x="60" y="74">🚗</text><text x="96" y="76">⚽</text>
        <text x="126" y="74">🧩</text>
      </g>
      <!-- кубики на полу -->
      <g font-size="22"><text x="230" y="176">🧱</text><text x="258" y="182">🧱</text><text x="286" y="188">🧱</text></g>
    </svg>`; }
  function circusSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skC3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#f2b04c"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skC3)"/>
      <!-- флажки -->
      <g font-size="26"><text x="16" y="40">🚩</text><text x="320" y="36">🚩</text></g>
      <!-- шатёр -->
      <path d="M40 150 L96 26 L180 6 L264 26 L320 150 Z" fill="#e86a5a" stroke="#7c2f24" stroke-width="4"/>
      <path d="M96 26 L264 26 L180 6 Z" fill="#f2a24c"/>
      <path d="M96 26 L180 6 L180 26 Z" fill="#c94f3f"/>
      <path d="M180 6 L264 26 L180 26 Z" fill="#d9a441"/>
      <path d="M40 150 L96 26 L180 26 L180 150 Z" fill="#e86a5a" stroke="rgba(0,0,0,.08)" stroke-width="2"/>
      <path d="M320 150 L264 26 L180 26 L180 150 Z" fill="#d95545" stroke="rgba(0,0,0,.08)" stroke-width="2"/>
      <!-- арена -->
      <ellipse cx="180" cy="150" rx="150" ry="18" fill="#c98a3a"/>
      <ellipse cx="180" cy="150" rx="130" ry="12" fill="#d9a441" opacity=".6"/>
      <!-- мячи -->
      <g class="c2a-coin" font-size="22"><text x="120" y="140">🔴</text><text x="160" y="132">🟡</text><text x="200" y="132">🔵</text><text x="238" y="142">🟢</text></g>
      <text x="150" y="196" font-size="28">🎪</text>
    </svg>`; }
  function campSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skCp" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2450"/><stop offset="1" stop-color="#3d4d94"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="140" fill="url(#skCp)"/>
      <g class="c2a-star" font-size="18">
        <text x="40" y="34">⭐</text><text x="120" y="52">✨</text><text x="210" y="30">⭐</text>
        <text x="300" y="56">✨</text><text x="160" y="86">⭐</text>
      </g>
      <circle cx="330" cy="30" r="16" fill="#f4e9c8"/>
      <circle cx="330" cy="30" r="14" fill="#e8e0cc"/>
      <path d="M320 22 Q330 16 340 22 M318 30 Q330 22 342 30" stroke="#a8b4d0" stroke-width="2" fill="none" opacity=".7"/>
      <!-- холм и трава -->
      <path d="M0 120 Q90 104 180 120 T360 118 L360 150 L0 150 Z" fill="#3a6b46"/>
      <rect x="0" y="150" width="360" height="60" fill="#2f5738"/>
      <!-- костёр -->
      <path d="M168 150 L180 132 L192 150 Z" fill="#c96b2a" stroke="#7c3a14" stroke-width="2.5"/>
      <path d="M172 150 L180 138 L188 150 Z" fill="#ffcf6a"/>
      <g class="c2a-smoke" font-size="22"><text x="178" y="118">🔥</text><text x="168" y="96">🔥</text></g>
      <!-- брёвнышки -->
      <rect x="146" y="158" width="40" height="9" rx="4" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2" transform="rotate(-8 166 162)"/>
      <rect x="176" y="158" width="40" height="9" rx="4" fill="#9c6c3a" stroke="#5f3a1a" stroke-width="2" transform="rotate(8 196 162)"/>
      <!-- камни вокруг -->
      <g font-size="18"><text x="120" y="180">🪨</text><text x="212" y="176">🪨</text><text x="160" y="190">🪨</text><text x="200" y="192">🪨</text></g>
      <!-- палатка -->
      <path d="M40 196 L80 132 L120 196 Z" fill="#4a93d0" stroke="#2c5f8a" stroke-width="3"/>
      <path d="M80 132 L120 196 L80 196 Z" fill="#2c5f8a"/>
      <!-- пень -->
      <ellipse cx="258" cy="196" rx="22" ry="8" fill="#9c6c3a"/>
      <rect x="236" y="180" width="44" height="16" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
    </svg>`; }

  function deskSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#d9c39a"/>
      <rect x="0" y="0" width="360" height="96" fill="#b89a70"/>
      <text x="20" y="60" font-size="26">🖼️</text><text x="300" y="64" font-size="26">🪔</text>
      <!-- окно -->
      <rect x="120" y="16" width="90" height="64" rx="5" fill="#cfe6f5" stroke="#7c5a34" stroke-width="5"/>
      <line x1="165" y1="16" x2="165" y2="80" stroke="#7c5a34" stroke-width="4"/>
      <line x1="120" y1="48" x2="210" y2="48" stroke="#7c5a34" stroke-width="4"/>
      <!-- стол -->
      <rect x="24" y="104" width="312" height="16" rx="5" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="3"/>
      <rect x="36" y="120" width="18" height="70" fill="#6e4520"/>
      <rect x="306" y="120" width="18" height="70" fill="#6e4520"/>
      <!-- бумаги и письмо -->
      <rect x="60" y="72" width="70" height="34" rx="4" fill="#fffef4" stroke="#5f3a1a" stroke-width="2"/>
      <path d="M96 72 L96 106" stroke="#d9a441" stroke-width="3"/>
      <g font-size="18"><text x="70" y="94">🍎=1</text><text x="100" y="94">🍐=2</text></g>
      <rect x="210" y="78" width="80" height="30" rx="4" fill="#fffef4" stroke="#5f3a1a" stroke-width="2"/>
      <text x="220" y="98" font-size="18">🍊=3 ?</text>
      <!-- лупа и чернила -->
      <text x="150" y="120" font-size="24">🔍</text>
      <rect x="176" y="112" width="26" height="18" rx="3" fill="#3a5a8a" stroke="#2c3a5f" stroke-width="2"/>
      <text x="282" y="120" font-size="24">✉️</text>
      <rect x="0" y="190" width="360" height="20" fill="#8a6a44"/>
    </svg>`; }
  function parkSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skPk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#7fc3e0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="110" fill="url(#skPk)"/>
      <g class="c2a-cloud"><text x="30" y="36" font-size="26">☁️</text><text x="240" y="44" font-size="22">☁️</text></g>
      <text x="310" y="36" font-size="26">🌞</text>
      <rect x="0" y="110" width="360" height="100" fill="#7fb45c"/>
      <path d="M0 110 Q90 100 180 110 T360 108 L360 130 L0 130 Z" fill="#6aa34e"/>
      <!-- дорожка -->
      <path d="M60 210 Q120 160 180 140 Q240 130 300 210 Z" fill="#c9a86a"/>
      <!-- клумба 2x3 -->
      <g stroke="#5f3a1a" stroke-width="3">
        <rect x="96" y="148" width="120" height="40" rx="6" fill="#9c6c3a"/>
      </g>
      <g font-size="20">
        <text x="104" y="176">🌷</text><text x="128" y="176">🌷</text><text x="152" y="176">🌷</text>
        <text x="104" y="156">🌷</text><text x="128" y="156">🌷</text><text x="152" y="156">🌷</text>
        <text x="104" y="196">🌸</text><text x="128" y="196">🌸</text><text x="152" y="196">🌸</text>
      </g>
      <!-- полоска вдоль дорожки -->
      <text x="216" y="180" font-size="18">🌼</text><text x="240" y="186" font-size="18">🌼</text><text x="262" y="192" font-size="18">🌼</text>
      <g font-size="44"><text x="12" y="150">🌳</text><text x="316" y="158">🌳</text></g>
    </svg>`; }
  function shelfSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#b9a07a"/>
      <rect x="0" y="0" width="360" height="150" fill="#cbb38c"/>
      <text x="20" y="40" font-size="22">💡</text>
      <!-- стеллаж -->
      <rect x="34" y="30" width="292" height="150" fill="#9c6c3a" stroke="#5f3a1a" stroke-width="4"/>
      <rect x="34" y="80" width="292" height="8" fill="#7a4f26"/>
      <rect x="34" y="130" width="292" height="8" fill="#7a4f26"/>
      <!-- коробки по 10 (ряды шариков) -->
      <g font-size="14">
        <text x="52" y="56">🔴🔵🟡🔴🔵🟡🔴🔵🟡🔴</text>
        <text x="52" y="72">🔴🔵🟡🔴🔵🟡🔴🔵🟡🔴</text>
        <text x="52" y="112">🔴🔵🟡🔴🔵🟡🔴🔵🟡🔴</text>
        <text x="52" y="128">🔴🔵🟡🔴🔵🟡🔴🔵🟡🔴</text>
      </g>
      <!-- коробки-рамки -->
      <rect x="44" y="42" width="160" height="36" rx="5" fill="none" stroke="#5f3a1a" stroke-width="3" stroke-dasharray="6 4"/>
      <rect x="44" y="98" width="160" height="36" rx="5" fill="none" stroke="#5f3a1a" stroke-width="3" stroke-dasharray="6 4"/>
      <!-- отдельные шарики -->
      <g font-size="20"><text x="240" y="60">🔵</text><text x="266" y="60">🟡</text><text x="292" y="60">🔴</text>
        <text x="240" y="120">🔴</text><text x="266" y="120">🟡</text><text x="292" y="120">🔵</text></g>
      <rect x="0" y="180" width="360" height="30" fill="#7a5a34"/>
    </svg>`; }
  function citySVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skCt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bfe3f0"/><stop offset="1" stop-color="#9fd0e8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skCt)"/>
      <g class="c2a-cloud"><text x="30" y="34" font-size="24">☁️</text><text x="250" y="30" font-size="20">☁️</text></g>
      <text x="316" y="52" font-size="24">🌞</text>
      <!-- дома на заднем плане -->
      <rect x="16" y="86" width="70" height="70" fill="#c9a86a" stroke="#8a6a44" stroke-width="2"/>
      <rect x="30" y="106" width="16" height="16" fill="#7fc4a6"/>
      <rect x="58" y="106" width="16" height="16" fill="#7fc4a6"/>
      <rect x="280" y="80" width="64" height="76" fill="#e0b48c" stroke="#8a6a44" stroke-width="2"/>
      <rect x="292" y="100" width="14" height="14" fill="#7fc4a6"/>
      <rect x="318" y="100" width="14" height="14" fill="#7fc4a6"/>
      <!-- земля/стройплощадка -->
      <rect x="0" y="156" width="360" height="54" fill="#c89a6a"/>
      <rect x="0" y="120" width="360" height="36" fill="#b98a5c"/>
      <!-- башня из «кирпичей» -->
      <g>
        <rect x="110" y="128" width="120" height="20" rx="4" fill="#e8a24c" stroke="#a35f1f" stroke-width="2.5"/>
        <rect x="110" y="108" width="120" height="20" rx="4" fill="#d9a441" stroke="#a35f1f" stroke-width="2.5"/>
        <rect x="110" y="88" width="120" height="20" rx="4" fill="#e8a24c" stroke="#a35f1f" stroke-width="2.5"/>
        <rect x="118" y="68" width="104" height="20" rx="4" fill="#d9a441" stroke="#a35f1f" stroke-width="2.5"/>
        <text x="170" y="124" text-anchor="middle" font-size="14" font-weight="bold" fill="#5f3a1a">27</text>
        <text x="170" y="104" text-anchor="middle" font-size="14" font-weight="bold" fill="#5f3a1a">36</text>
      </g>
      <!-- кран -->
      <rect x="258" y="70" width="10" height="60" fill="#e86a5a" stroke="#7c2f24" stroke-width="2"/>
      <rect x="240" y="60" width="46" height="10" fill="#d95545" stroke="#7c2f24" stroke-width="2"/>
      <line x1="258" y1="70" x2="290" y2="84" stroke="#7c2f24" stroke-width="2"/>
      <text x="48" y="196" font-size="22">🟫</text><text x="320" y="196" font-size="20">🟫</text>
    </svg>`; }

  /* ================= ФОН-ПАНОРАМА (meet: видна целиком, без кропа по бокам) ================= */
  function sceneArt(scene, fr){
    let base='';
    if(scene==='pond') base=pondSVG();
    else if(scene==='kitchen') base=kitchenSVG();
    else if(scene==='coins') base=coinsSVG();
    else if(scene==='sad') base=sadSVG();
    else if(scene==='ogorod') base=ogorodSVG();
    else if(scene==='ferma') base=fermaSVG();
    else if(scene==='magazin') base=magazinSVG();
    else if(scene==='cosmos') base=cosmosSVG();
    else if(scene==='les') base=lesSVG();
    else if(scene==='train') base=trainSVG();
    else if(scene==='workshop') base=workshopSVG();
    else if(scene==='beach') base=beachSVG();
    else if(scene==='winter') base=winterSVG();
    else if(scene==='room') base=roomSVG();
    else if(scene==='circus') base=circusSVG();
    else if(scene==='camp') base=campSVG();
    else if(scene==='desk') base=deskSVG();
    else if(scene==='park') base=parkSVG();
    else if(scene==='shelf') base=shelfSVG();
    else if(scene==='city') base=citySVG();
    else base=pondSVG();
    let s = base;
    const prop = (fr && fr.prop) || '';
    if (prop) {
      const propW = prop.length > 20 ? 250 : (prop.length > 12 ? 210 : 170);
      s = s.replace('</svg>', propTag(prop, (360 - propW) / 2, 26, propW) + '</svg>');
    }
    return s;
  }
  function emojiFor(scene){
    return scene==='pond'?'🐟':scene==='kitchen'?'🥧':scene==='coins'?'🪙'
      : scene==='sad'?'🍎':scene==='ogorod'?'🥕':scene==='ferma'?'🐥':scene==='magazin'?'🧸':scene==='cosmos'?'⭐':'🐟';
  }

  /* HTML-герой: крупный, полностью видимый, стоит на «земле» сцены */
  function heroHTML(who, emo, side){
    const P=PERS[who]||PERS.arch;
    const nm = who==='kid' ? (heroKidName()||'Ты') : P.name;
    const col = who==='kid' ? heroKidColor() : P.color;
    return `<div class="c2-hero ${side}" data-hero="${who}">
      <div class="c2h-card">${P.svg(emo)}</div>
      <div class="c2h-name" style="color:${col}">${escHtml(nm)}</div>
    </div>`;
  }

  /* ================= ОВЕРЛЕЙ ================= */
  function ensure(){
    if(root) return;
    const st=document.createElement('style');
    st.textContent=`
      .comic-ov { position:fixed; inset:0; z-index:99; display:flex; flex-direction:column;
        background:#efe6d0; font-family:Georgia,serif; color:#33291e; overflow:hidden; }
      .comic-top { display:flex; align-items:center; gap:10px; padding:10px 12px 4px; }
      .comic-top .ct-book { font-size:12px; font-weight:bold; color:#8a6d3b; letter-spacing:.06em; flex-shrink:0; }
      .comic-top .ct-title { font-size:16px; font-weight:bold; flex:1; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; }
      .comic-top .ct-x { background:none; border:2px solid #33291e; border-radius:50%; width:30px; height:30px;
        font-size:15px; line-height:1; color:#33291e; cursor:pointer; font-family:inherit; flex-shrink:0; }
      .c2-page { flex:1 1 auto; width:100%; max-width:760px; margin:4px auto 10px; background:#fffdf4;
        border:6px solid #33291e; border-radius:10px; overflow:hidden; box-shadow:0 12px 34px rgba(0,0,0,.28);
        display:flex; flex-direction:column; position:relative; }
      .c2-scene { width:100%; height:auto; display:block; }
      .c2a-cloud { animation:c2drift 11s ease-in-out infinite alternate; }
      @keyframes c2drift { from{ transform:translateX(0);} to{ transform:translateX(24px);} }
      .c2a-fish text { animation:c2fish 4.5s ease-in-out infinite alternate; }
      .c2a-fish text:nth-child(2){ animation-delay:-1.5s; }
      .c2a-fish text:nth-child(3){ animation-delay:-3s; }
      @keyframes c2fish { from{ transform:translateY(0);} to{ transform:translateY(-6px);} }
      .c2a-coin text { animation:c2glint 2.6s ease-in-out infinite; }
      .c2a-coin text:nth-child(2){ animation-delay:-.8s; } .c2a-coin text:nth-child(3){ animation-delay:-1.6s; }
      @keyframes c2glint { 0%,100%{ transform:translateY(0); opacity:1;} 50%{ transform:translateY(-3px); opacity:.85;} }
      .c2a-spark { animation:c2twinkle 1.7s ease-in-out infinite; }
      .c2a-smoke text { animation:c2smoke 2.2s ease-in-out infinite; }
      @keyframes c2smoke { 0%{ transform:translateY(0); opacity:.9;} 100%{ transform:translateY(-14px); opacity:.4;} }
      @keyframes c2twinkle { 0%,100%{opacity:.25; transform:scale(.7);} 50%{opacity:1; transform:scale(1.2);} }
      .c2-capbar { box-sizing:border-box; min-height:66px; background:#33291e; color:#f4e9c8;
        font-size:14px; line-height:1.45; padding:8px 14px; display:flex; gap:8px; align-items:center; }
      .c2-capbar .c2cap-tag { color:#d9a441; font-weight:bold; flex-shrink:0; }
      .c2-capbar .c2cap-in { animation:c2capup .45s ease both; }
      @keyframes c2capup { from{ opacity:0; transform:translateY(9px);} to{ opacity:1; transform:none;} }
      /* сцена: появление целиком + актёры */
      .c2-stage.c2-fresh { animation:c2staget .5s cubic-bezier(.2,.9,.3,1) both; }
      @keyframes c2staget { from{ opacity:0; transform:scale(.97) translateY(10px);} to{ opacity:1; transform:none;} }
      .c2a-prop { animation:c2prop .4s ease .3s both; }
      @keyframes c2prop { from{ opacity:0; transform:translateY(-14px) scale(.7);} to{ opacity:1; transform:none;} }
      .c2a-prop rect { filter:drop-shadow(0 3px 6px rgba(0,0,0,.18)); }
      /* сцена-кадр: фон-панорама + герои поверх */
      .c2-stage { position:relative; flex:1 1 auto; min-height:0; width:100%; overflow:hidden;
        border-bottom:5px solid #33291e; background:linear-gradient(#8fc060,#5c8f3e 45%,#4a7a33); }
      .c2-stage.c2-bg-pond, .c2-stage.c2-bg-sad, .c2-stage.c2-bg-ferma { background:linear-gradient(#7fb45c,#5c8f3e 50%,#4a7a33); }
      .c2-stage.c2-bg-kitchen, .c2-stage.c2-bg-magazin { background:linear-gradient(#c2915b,#9c6c3a 45%,#7a4f26); }
      .c2-stage.c2-bg-ogorod { background:linear-gradient(#a06a3a,#7a4a26 55%,#5f3a1a); }
      .c2-stage.c2-bg-cosmos { background:linear-gradient(#9aa0b8,#7f859e 45%,#565c73); }
      .c2-stage.c2-bg-les { background:linear-gradient(#7fb45c,#5c8f3e 50%,#4a7a33); }
      .c2-stage.c2-bg-train { background:linear-gradient(#cfe6f5,#a8d2ea 45%,#8fb8d8); }
      .c2-stage.c2-bg-workshop { background:linear-gradient(#e8d5ae,#c9a86a 45%,#a5824e); }
      .c2-stage.c2-bg-beach { background:linear-gradient(#8fd3f0,#5fb8e0 45%,#f0d9a8); }
      .c2-stage.c2-bg-winter { background:linear-gradient(#9fb8e8,#7f9ed8 45%,#eef3fb); }
      .c2-stage.c2-bg-room { background:linear-gradient(#f6e3c5,#eacfa3 45%,#c89a6a); }
      .c2-stage.c2-bg-circus { background:linear-gradient(#ffd76a,#f2b04c 45%,#c98a3a); }
      .c2-stage.c2-bg-camp { background:linear-gradient(#1c2450,#3d4d94 45%,#2f5738); }
      .c2-stage.c2-bg-desk { background:linear-gradient(#d9c39a,#b89a70 45%,#8a6a44); }
      .c2-stage.c2-bg-park { background:linear-gradient(#a8dcf0,#7fb45c 45%,#6aa34e); }
      .c2-stage.c2-bg-shelf { background:linear-gradient(#cbb38c,#b9a07a 45%,#7a5a34); }
      .c2-stage.c2-bg-city { background:linear-gradient(#bfe3f0,#9fd0e8 45%,#b98a5c); }
      .c2-stage .c2-scene { position:absolute; top:0; left:0; width:100%; height:auto; display:block;
        box-shadow:0 12px 18px -12px rgba(0,0,0,.45); }
      .c2-cast { position:absolute; left:0; right:0; bottom:10px; display:flex; align-items:flex-end;
        justify-content:space-between; padding:0 10px; pointer-events:none; z-index:4; }
      .c2-hero { pointer-events:auto; display:flex; flex-direction:column; align-items:center;
        width:142px; animation:c2hIn .5s cubic-bezier(.2,1.4,.4,1) both; }
      .c2-hero.listener-1 { width:116px; animation-delay:.1s; }
      .c2-hero.listener-2 { width:116px; animation-delay:.16s; }
      .c2-cast.c2-many .c2-hero.talker { width:146px; }
      .c2-cast.c2-many .c2-hero { width:110px; }
      .c2-cast.c2-solo { justify-content:center; }
      .c2-cast.c2-solo .c2-hero.talker { width:182px; }
      .c2-deco { position:absolute; left:0; right:0; bottom:0; height:100%; pointer-events:none; z-index:2; }
      .c2-deco span { position:absolute; line-height:1; filter:drop-shadow(0 2px 2px rgba(0,0,0,.15)); }
      .c2-deco .d1 { left:10px; bottom:16px; }
      .c2-deco .d2 { right:12px; bottom:14px; }
      .c2-deco .d3 { right:40px; bottom:86px; font-size:22px; opacity:.65; }
      .c2-deco .d4 { left:46px; bottom:92px; font-size:20px; opacity:.6; }
      .c2-hero .c2h-card { width:100%; border-radius:16px 16px 6px 6px; overflow:hidden;
        border:4px solid #33291e; background:#fff; box-shadow:0 8px 20px rgba(0,0,0,.25); }
      .c2-hero .c2h-card svg { display:block; width:100%; height:auto; }
      .c2-hero .c2h-name { margin-top:4px; font-size:13px; font-weight:bold; background:#fffdf4;
        padding:1px 8px; border-radius:999px; border:2px solid #33291e;
        max-width:100%; box-sizing:border-box; white-space:nowrap; overflow:hidden;
        text-overflow:ellipsis; text-align:center; }
      .c2-hero.talker { width:166px; }
      .c2-hero.talker .c2h-name { font-size:14px; }
      @keyframes c2hIn { from{ opacity:0; transform:translateY(34px);} to{ opacity:1; transform:none;} }
      .c2-talk { position:absolute; z-index:6; background:#fff; border:4px solid #33291e;
        border-radius:18px; padding:11px 16px 13px; font-size:16px; line-height:1.5;
        box-shadow:0 6px 16px rgba(0,0,0,.22); animation:c2talk .3s cubic-bezier(.2,1.6,.4,1) both; }
      .c2-talk::before { content:""; position:absolute; left:50%; top:100%; margin-left:-10px;
        border:10px solid transparent; border-top:16px solid #33291e; border-bottom:0; }
      .c2-talk::after { content:""; position:absolute; left:50%; top:100%; margin-left:-6px;
        border:6px solid transparent; border-top:12px solid #fff; border-bottom:0; }
      .c2-talk .c2-caret { display:inline-block; width:2px; background:#33291e;
        animation:c2blink .8s steps(1) infinite; }
      @keyframes c2blink { 50%{ opacity:0; } }
      @keyframes c2talk { from{ transform:scale(.6) translateY(-10px); opacity:0;} to{ transform:none; opacity:1;} }
      /* навигация */
      .comic-nav { display:flex; flex-direction:column; gap:8px; padding:6px 14px 12px; }
      .comic-nav .cn-row { display:flex; align-items:center; justify-content:space-between; gap:10px; }
      .comic-nav .cn-dots { text-align:center; }
      .comic-nav .cn-dot { display:inline-block; width:9px; height:9px; border-radius:50%;
        background:#cbb897; margin:0 3px; transition:.15s; }
      .comic-nav .cn-dot.on { background:#33291e; transform:scale(1.35); }
      .cbtn { border:3px solid #33291e; background:#fff; color:#33291e; font-family:inherit;
        font-size:15px; font-weight:bold; border-radius:12px; padding:10px 18px; cursor:pointer;
        box-shadow:0 3px 0 #33291e; transition:.08s; }
      .cbtn:active { transform:translateY(2px); box-shadow:0 1px 0 #33291e; }
      .cbtn.primary { background:#f0c75e; border-color:#8a6d1e; box-shadow:0 3px 0 #8a6d1e; }
      .cbtn:disabled { opacity:.35; cursor:default; transform:none; box-shadow:0 3px 0 #33291e; }
    `;
    document.head.appendChild(st);
    root=document.createElement('div');
    root.className='comic-ov';
    document.body.appendChild(root);
  }
  function escHtml(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function open(lesson){ ensure(); L=lesson; idx=0; root.style.display='flex'; render(); }
  function close(){ if(root) root.style.display='none'; if(tmr){clearTimeout(tmr); tmr=null;} }
  function isOpen(){ return !!(root&&root.style.display!=='none'); }

  function render(){
    if(!L) return;
    const frs=L.comic; const fr=frs[idx];
    const scene=L.scene||'pond';
    const pers=PERS[fr.who]||PERS.arch;
    const who=fr.who||'arch';
    const emo=fr.emo||'smile';
    const last=idx>=frs.length-1;
    const nList=(fr.with||[]).filter(w=>w!==who).length;
    const many=nList>=2;
    const solo=nList===0;
    const dots=frs.map((_,i)=>`<span class="cn-dot ${i===idx?'on':''}"></span>`).join('');
    const DECO={pond:['🌾','🌼','🐞','🌷'],kitchen:['🧺','🪑','🌿','🫙'],coins:['🌼','🪙','🌻','🍄'],
      sad:['🌼','🍄','🐞','🌿'],ogorod:['🐛','🌼','🪱','🌿'],ferma:['🌾','🐞','🌻','🌼'],
      magazin:['🧸','🎈','🪁','🚂'],cosmos:['🌟','🪐','✨','🚀']};
    const deco=(DECO[scene]||DECO.pond).map((e,i)=>`<span class="d${i+1}">${e}</span>`).join('');
    root.innerHTML=`<div class="comic-top">
        <span class="ct-book">📖 ${escHtml(emojiFor(scene))} КОМИКС</span>
        <span class="ct-title">${escHtml(L.title)}</span>
        <button class="ct-x" onclick="COMIC.close()">✕</button>
      </div>
      <div class="c2-page">
        <div class="c2-stage c2-fresh c2-bg-${scene}" id="c2stage">
          ${sceneArt(scene, fr)}
          <div class="c2-cast${many?' c2-many':(solo?' c2-solo':'')}">
            ${heroHTML(who, emo, 'talker')}
            ${(fr.with||[]).filter(w=>w!==who).slice(0,2).map((w,i)=>heroHTML(w,'smile','listener-'+(i+1))).join('')}
          </div>
          <div class="c2-deco">${deco}</div>
          <div class="c2-talk" id="c2cur"><span class="c2-say"></span><span class="c2-caret"></span></div>
        </div>
        <div class="c2-capbar"><span class="c2cap-tag">${idx+1}/${frs.length} · </span><span class="c2cap-in">${escHtml(fr.cap||'')}</span></div>
      </div>
      <div class="comic-nav">
        <span class="cn-dots">${dots}</span>
        <div class="cn-row">
          <button class="cbtn" onclick="COMIC.step(-1)" ${idx===0?'disabled':''}>◀ Назад</button>
          ${last
            ? `<button class="cbtn primary" onclick="COMIC.done()">Понял! Проверю себя →</button>`
            : `<button class="cbtn primary" onclick="COMIC.next()">Дальше ▶</button>`}
        </div>
      </div>`;
        // облачко речи — НАД головой говорящего (лица не закрывает), хвостик вниз к голове
    try{
      const stage=document.getElementById('c2stage');
      const talk=document.getElementById('c2cur');
      if(stage&&talk){
        const sr=stage.getBoundingClientRect();
        const card=stage.querySelector('.c2-hero.talker .c2h-card');
        if(card){
          const cr=card.getBoundingClientRect();
          const cardTop=cr.top-sr.top;
          const centerX=(cr.left-sr.left)+cr.width/2;
          const maxW=Math.min(sr.width*0.56, 240);
          talk.style.maxWidth=maxW+'px';
          talk.style.bottom=(sr.height-(cardTop-12))+'px'; // низ облачка чуть выше макушки
          const left=Math.max(14, Math.min(centerX-maxW/2, sr.width-maxW-10));
          talk.style.left=left+'px';
          talk.style.top='auto';
        } else { talk.style.top='10px'; talk.style.left='14px'; }
      }
    }catch(e){ console.warn('comic bubble anchor:', e); }
    // печать реплики по буквам
    const cur=document.getElementById('c2cur'); const say=cur.querySelector('.c2-say'); const caret=cur.querySelector('.c2-caret');
    const text=fr.say||''; say.textContent=''; caret.style.visibility='visible';
    let i=0;
    const tick=()=>{ if(!root||root.style.display==='none') return;
      say.textContent=text.slice(0,++i);
      if(i<text.length){ tmr=setTimeout(tick, text.length>70?18:28); } else { caret.style.visibility='hidden';
        try{ document.getElementById('c2cur').classList.add('ready'); }catch(e){} } };
    if(tmr){clearTimeout(tmr);} tmr=setTimeout(tick,160);
  }
  function step(d){ idx=Math.max(0,Math.min(L.comic.length-1,idx+d)); render(); }
  function next(){ if(idx<L.comic.length-1){ idx++; render(); } }
  function done(){ close(); try{ if(typeof lvToCheck==='function') lvToCheck(); }catch(e){} }
  return { open, close, step, next, done, isOpen };
})();
