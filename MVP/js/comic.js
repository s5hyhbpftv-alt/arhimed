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

  /* Портрет Архимеда живёт отдельным файлом (MVP/data/arch_head.js) — так его
     правят в одном месте и он не конфликтует с правками самого движка. Здесь
     только вписываем его в кадр героя 120x140. Если файл почему-то не
     загрузился, работает прежний рисунок ниже — это запасной вариант. */
  function archPortrait(){
    /* Портрет вкладываем вторым svg: у него своя рамка (188x224), и width/height
       с preserveAspectRatio="slice" вписывают её в кадр героя ровно так, как
       нужно. Первая попытка делала то же через transform — и голова уезжала
       вниз-вправо, в карточке был виден только фрагмент щеки. */
    const свг = (typeof window!=='undefined' && window.ARCH_HEAD) ? String(window.ARCH_HEAD) : '';
    if(!свг) return '';
    try{
      return свг.replace('<svg ', '<svg x="4" y="0" width="112" height="140" preserveAspectRatio="xMidYMid meet" ');
    }catch(e){ return ''; }
  }
  function archSVG(emo){
    /* Портрет вписывается так: translate/scale из его собственной рамки
       188x224 в кадр 120x140, лишнее срезает preserveAspectRatio="slice". */
    const портрет=archPortrait();
    if(портрет){
      try{
        const вн=портрет.replace('<g transform="translate(1.2,6.3) scale(0.626)"></g>',
          '<g transform="translate('+(120-188*0.626)/2+','+(140-224*0.626)/2+') scale(0.626)">');
        /* закрываем группу перед концом svg */
        return вн.replace(/<\/svg>\s*$/, '</g></svg>');
      }catch(e){}
    }
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
    else if(emo==='sad') mouth=`<path d="M53 84 Q60 76 67 84" stroke="#7c4a33" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    else if(emo==='think') mouth=`<path d="M54.5 83 Q60 86.5 65.5 83" stroke="#7c4a33" stroke-width="2.8" fill="none" stroke-linecap="round"/>`;
    else if(emo==='laugh') mouth=`<path d="M50 81 Q60 96 70 81 Q60 88 50 81 Z" fill="#8a3b33"/><path d="M50 81 Q60 89 70 81" stroke="#fff" stroke-width="1.6" fill="none"/>`;
    else mouth=`<path d="M53.5 82.5 Q60 88.5 66.5 82.5" stroke="#a0504a" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
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
      <path d="M25.5 48 C23 24 39 11 60 11 C81 11 97 24 94.5 48 C92.5 30 82 20 60 20 C38 20 27.5 30 25.5 48 Z" fill="${hair}" stroke="#33291e" stroke-width="2.4"/>
      <path d="M31 34 C36 24 47 18 60 18 C73 18 84 24 89 34" stroke="${hairD}" stroke-width="1.8" fill="none" opacity=".65"/>
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
      <path d="M47 31.5 Q60 27.5 73 31.5" stroke="${skinD}" stroke-width="1.5" fill="none" opacity=".38"/>
      <path d="M50 36.5 Q60 33 70 36.5" stroke="${skinD}" stroke-width="1.3" fill="none" opacity=".3"/>
      <!-- кустистые седые брови -->
      <path d="M36.5 46 Q46 38 56 44" stroke="${hairD}" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <path d="M64 44 Q74 38 83.5 46" stroke="${hairD}" stroke-width="3.8" fill="none" stroke-linecap="round"/>
      <!-- глаза (чуть меньше, с мешками-морщинками) -->
      <ellipse cx="46.5" cy="54.5" rx="6.8" ry="${wow?9:7.8}" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <ellipse cx="73.5" cy="54.5" rx="6.8" ry="${wow?9:7.8}" fill="#fff" stroke="#33291e" stroke-width="1.8"/>
      <circle cx="47.6" cy="${wow?56.5:56}" r="${wow?3:3.5}" fill="#6b4426"/>
      <circle cx="72.4" cy="${wow?56.5:56}" r="${wow?3:3.5}" fill="#6b4426"/>
      <circle cx="49.4" cy="${wow?54:53.5}" r="1.7" fill="#fff"/><circle cx="74.2" cy="${wow?54:53.5}" r="1.7" fill="#fff"/>
      <circle cx="46" cy="58" r=".9" fill="#fff" opacity=".7"/><circle cx="70.8" cy="58" r=".9" fill="#fff" opacity=".7"/>
      <path d="M39.5 62.5 Q42 60.5 45.5 61.5" stroke="${skinD}" stroke-width="1.4" fill="none" opacity=".4"/>
      <path d="M80.5 62.5 Q78 60.5 74.5 61.5" stroke="${skinD}" stroke-width="1.4" fill="none" opacity=".4"/>
      <!-- нос с носогубными складками -->
      <path d="M60 54 C58.4 59 57.6 62.5 54.5 65 M60 54 C61.6 59 62.4 62.5 65.5 65" stroke="${skinD}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path d="M54.5 65 Q60 68.2 65.5 65" stroke="${skinD}" stroke-width="1.8" fill="none"/>
      <path d="M50.5 68 Q49.5 72 50.5 75" stroke="${skinD}" stroke-width="1.5" fill="none" opacity=".42"/>
      <path d="M69.5 68 Q70.5 72 69.5 75" stroke="${skinD}" stroke-width="1.5" fill="none" opacity=".42"/>
      <!-- большая белая борода -->
      <path d="M37 63 C31 69 29 79 33 89 C37 99 47 106 60 106 C73 106 83 99 87 89 C91 79 89 69 83 63 C85 72 82 80 77 84 C73 88 67 90 60 90 C53 90 47 88 43 84 C38 80 35 72 37 63 Z" fill="${beard}" stroke="#33291e" stroke-width="2.4"/>
      <!-- мягкая текстура: борода читается как волосы, а не как белое пятно -->
      <path d="M49 88 C52 95 55 100 60 103 M60 87 C60 94 60 99 60 103 M71 88 C68 95 65 100 60 103" stroke="${beardD}" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <path d="M43 79 C46 83 50 85 55 85 M77 79 C74 83 70 85 65 85" stroke="${beardD}" stroke-width="1.4" fill="none" opacity=".6"/>
      <!-- седые усы (висят по бокам рта) -->
      <path d="M58 72.5 C52 70.5 46.5 71.8 43.2 76.2 C40.8 79.5 41.8 83 44.8 84.2 C45.6 80.2 49 78 53.2 77.5 C56.2 77.1 58 76.2 58 74.5 Z" fill="${beard}" stroke="#33291e" stroke-width="1.5"/>
      <path d="M62 72.5 C68 70.5 73.5 71.8 76.8 76.2 C79.2 79.5 78.2 83 75.2 84.2 C74.4 80.2 71 78 66.8 77.5 C63.8 77.1 62 76.2 62 74.5 Z" fill="${beard}" stroke="#33291e" stroke-width="1.5"/>
      <path d="M44.8 77.8 C48.8 76.2 53.2 75 56.6 73.6 M75.2 77.8 C71.2 76.2 66.8 75 63.4 73.6" stroke="${beardD}" stroke-width="1.4" fill="none" opacity=".7"/>
      <!-- мягкая тень под усами, чтобы рот читался -->
      <ellipse cx="60" cy="80.5" rx="7" ry="2.6" fill="rgba(160,170,190,.2)"/>
      <!-- рот (аккуратный, поверх бороды): опущен ниже усов, иначе усы его съедают -->
      <g transform="translate(0,7)">${mouth}</g>
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

  /* ── библиотека нарисованных символов ─────────────────────────────────
     Раньше деревья, шары, книги и лампы в сценах были эмодзи: рисунок
     складывался из картинок чужого шрифта, без обводки и перспективы, и на
     разных системах выглядел по-разному. Теперь каждый символ нарисован кодом
     в той же манере, что и герои, и ставится вызовом сим('дерево', x, y, s),
     где x,y — та же точка, где стоял эмодзи. */
  function сим(вид, x, y, s, цвет){
    const м = 'translate('+x+','+y+') scale('+(s==null?1:s)+')';
    const фигуры = {
      'дерево': '<path d="M-9 0 L-5 -22 L5 -22 L9 0 Z" fill="#7a4a26" stroke="#4a2c15" stroke-width="1.6"/>'+
        '<circle cx="0" cy="-42" r="20" fill="#5c8f3e" stroke="#3c6b26" stroke-width="1.8"/>'+
        '<circle cx="-15" cy="-34" r="14" fill="#6aa34e" stroke="#3c6b26" stroke-width="1.6"/>'+
        '<circle cx="15" cy="-34" r="14" fill="#6aa34e" stroke="#3c6b26" stroke-width="1.6"/>'+
        '<circle cx="0" cy="-56" r="13" fill="#7fb45c" stroke="#3c6b26" stroke-width="1.5"/>',
      'ёлка': '<path d="M-7 0 L-3 -18 L3 -18 L7 0 Z" fill="#6b4520" stroke="#40280f" stroke-width="1.5"/>'+
        '<path d="M0 -66 L-20 -30 L20 -30 Z" fill="#4e7f2f" stroke="#31531c" stroke-width="1.8"/>'+
        '<path d="M0 -50 L-24 -16 L24 -16 Z" fill="#5c8f3e" stroke="#31531c" stroke-width="1.8"/>'+
        '<path d="M0 -34 L-26 -6 L26 -6 Z" fill="#6aa34e" stroke="#31531c" stroke-width="1.8"/>',
      'куст': '<circle cx="0" cy="-14" r="16" fill="#6aa34e" stroke="#3c6b26" stroke-width="1.6"/>'+
        '<circle cx="-14" cy="-8" r="12" fill="#5c8f3e" stroke="#3c6b26" stroke-width="1.5"/>'+
        '<circle cx="14" cy="-8" r="12" fill="#7fb45c" stroke="#3c6b26" stroke-width="1.5"/>',
      'облако': '<g fill="#fff" opacity=".95"><ellipse cx="0" cy="0" rx="26" ry="13"/>'+
        '<circle cx="-16" cy="-6" r="12"/><circle cx="14" cy="-4" r="14"/></g>',
      'солнце': '<circle cx="0" cy="0" r="14" fill="#ffd76a" stroke="#e0a72e" stroke-width="1.6"/>'+
        '<g stroke="#ffd76a" stroke-width="2.6" stroke-linecap="round" fill="none">'+
        '<path d="M0 -20 L0 -26 M0 20 L0 26 M-20 0 L-26 0 M20 0 L26 0 M-14 -14 L-18 -18 M14 14 L18 18 M14 -14 L18 -18 M-14 14 L-18 18"/></g>',
      'цветок': '<g stroke="#4e7f2f" stroke-width="1.6" fill="none"><path d="M0 0 L0 -11"/></g>'+
        '<g fill="#f2c14e" stroke="#c9902e" stroke-width="1"><ellipse cx="0" cy="-16" rx="4" ry="6"/>'+
        '<ellipse cx="-6" cy="-12" rx="4" ry="6" transform="rotate(-60 -6 -12)"/>'+
        '<ellipse cx="6" cy="-12" rx="4" ry="6" transform="rotate(60 6 -12)"/></g>'+
        '<circle cx="0" cy="-12" r="2.6" fill="#8a5a1c"/>',
      'ромашка': '<path d="M0 0 L0 -10" stroke="#4e7f2f" stroke-width="1.5" fill="none"/>'+
        '<g fill="#fff" stroke="#c9c2d8" stroke-width=".9">'+
        '<ellipse cx="0" cy="-17" rx="3" ry="5.5"/><ellipse cx="5.5" cy="-14" rx="3" ry="5.5" transform="rotate(70 5.5 -14)"/>'+
        '<ellipse cx="-5.5" cy="-14" rx="3" ry="5.5" transform="rotate(-70 -5.5 -14)"/>'+
        '<ellipse cx="4" cy="-20" rx="3" ry="5.5" transform="rotate(35 4 -20)"/><ellipse cx="-4" cy="-20" rx="3" ry="5.5" transform="rotate(-35 -4 -20)"/></g>'+
        '<circle cx="0" cy="-17" r="3" fill="#f2c14e" stroke="#c9902e" stroke-width="1"/>',
      'гриб': '<rect x="-3" y="-12" width="6" height="12" rx="2" fill="#f0e2c4" stroke="#8a6d4a" stroke-width="1.2"/>'+
        '<path d="M-13 -11 C-13 -22 13 -22 13 -11 Z" fill="#c65b4a" stroke="#7c3326" stroke-width="1.4"/>'+
        '<circle cx="-5" cy="-16" r="2" fill="#f6efe0"/><circle cx="4" cy="-14" r="1.6" fill="#f6efe0"/>',
      'морковь': '<path d="M0 0 C6 7 8 19 0 27 C-8 19 -6 7 0 0 Z" fill="#e2803a" stroke="#8a4a1c" stroke-width="1.3"/>'+
        '<path d="M-5 -5 C-12 -12 -15 -22 -12 -28 M0 -7 C0 -15 2 -23 5 -28 M5 -5 C11 -12 17 -18 18 -25" stroke="#4e7f2f" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      'яблоко': '<path d="M0 -2 C-12 -14 -20 -4 -16 6 C-13 15 -4 19 0 14 C4 19 13 15 16 6 C20 -4 12 -14 0 -2 Z" fill="#c9433a" stroke="#8a2a24" stroke-width="1.4"/>'+
        '<path d="M0 -4 C0 -10 2 -14 6 -16" stroke="#6b4520" stroke-width="2.4" fill="none" stroke-linecap="round"/>'+
        '<path d="M6 -14 C12 -18 18 -16 18 -10 C12 -8 8 -10 6 -14 Z" fill="#4e7f2f" stroke="#31531c" stroke-width="1.1"/>',
      'шар': '<circle cx="0" cy="-8" r="8" fill="'+(цвет||'#c9433a')+'" stroke="rgba(0,0,0,.28)" stroke-width="1.2"/>'+
        '<circle cx="-3" cy="-11" r="2.4" fill="#fff" opacity=".55"/>',
      'книга': '<rect x="-9" y="-14" width="18" height="14" rx="2" fill="'+(цвет||'#c9433a')+'" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>'+
        '<rect x="-11" y="-15" width="4" height="16" rx="1.6" fill="rgba(0,0,0,.22)"/>'+
        '<path d="M-6 -11 L6 -11 M-6 -7 L4 -7" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>',
      'лампа': '<path d="M0 -26 L0 -14" stroke="#6b5b45" stroke-width="1.6" fill="none"/>'+
        '<path d="M-13 -14 L13 -14 L8 -2 L-8 -2 Z" fill="#ffe9a8" stroke="#c9902e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-2" rx="7" ry="3" fill="#ffd76a"/><circle cx="0" cy="-8" r="3" fill="#fff8d8"/>',
      'снежинка': '<g stroke="#bfe0ef" stroke-width="2" stroke-linecap="round">'+
        '<path d="M0 -12 L0 12 M-10 -6 L10 6 M-10 6 L10 -6"/>'+
        '<path d="M0 -12 L-4 -8 M0 -12 L4 -8 M0 12 L-4 8 M0 12 L4 8"/></g>',
      'пчела': '<ellipse cx="0" cy="-6" rx="8" ry="6" fill="#ffd76a" stroke="#8a5a1c" stroke-width="1.2"/>'+
        '<path d="M-3 -12 L-3 0 M2 -12 L2 0" stroke="#5f3a1a" stroke-width="2"/>'+
        '<ellipse cx="0" cy="-13" rx="8" ry="4" fill="#fff" opacity=".8"/>',
      'звезда': '<path d="M0 -12 L3.6 -4 L12 -4 L5.4 1.6 L8 10 L0 5 L-8 10 L-5.4 1.6 L-12 -4 L-3.6 -4 Z" fill="#ffd76a" stroke="#e0a72e" stroke-width="1.2"/>',
      'планета': '<circle cx="0" cy="-8" r="9" fill="#c98a5a" stroke="#8a5a2c" stroke-width="1.3"/>'+
        '<ellipse cx="0" cy="-8" rx="16" ry="5" fill="none" stroke="#e0c9a0" stroke-width="2" transform="rotate(-18)"/>',
      'снежок': '<circle cx="0" cy="-7" r="7" fill="#fff" stroke="#bfd8e8" stroke-width="1.2"/>',
      'яйцо': '<ellipse cx="0" cy="-7" rx="6" ry="8" fill="#fdf6e0" stroke="#c9b48a" stroke-width="1.2"/>',
      'камень': '<path d="M-9 0 C-11 -8 -4 -13 2 -12 C9 -11 12 -5 10 0 Z" fill="#9aa0a8" stroke="#6b7078" stroke-width="1.3"/>',
      /* ── быт, мебель, еда ─────────────────────────────────────────── */
      'стул': '<rect x="-11" y="-20" width="22" height="5" rx="2" fill="#b5793c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-10" y="-15" width="4" height="15" rx="1.6" fill="#9c6330" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="6" y="-15" width="4" height="15" rx="1.6" fill="#9c6330" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-11" y="-40" width="5" height="22" rx="2" fill="#a86a34" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-11" y="-40" width="20" height="5" rx="2" fill="#b5793c" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-11" y="-32" width="15" height="4" rx="2" fill="#a86a34" stroke="#33291e" stroke-width="1.1"/>',
      'стол': '<rect x="-20" y="-22" width="40" height="6" rx="2" fill="#b5793c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-16" y="-16" width="4.5" height="16" rx="1.6" fill="#9c6330" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="11.5" y="-16" width="4.5" height="16" rx="1.6" fill="#9c6330" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-9 -16 L9 -16" stroke="#8a5c33" stroke-width="2" opacity=".7"/>',
      'пирог': '<ellipse cx="0" cy="-3" rx="17" ry="4" fill="#f6efe0" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-14 -4 L-11 -14 L11 -14 L14 -4 Z" fill="#e0a75c" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-14" rx="11" ry="4" fill="#f0c481" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-6 -16 q2 -6 5 -3 q3 3 6 -4" stroke="#c07a30" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
      'чайник': '<path d="M-12 0 C-15 -6 -13 -18 0 -18 C13 -18 15 -6 12 0 Z" fill="#d76a5a" stroke="#33291e" stroke-width="1.5"/>'+
        '<rect x="-5" y="-22" width="10" height="4" rx="2" fill="#b8503f" stroke="#33291e" stroke-width="1.2"/>'+
        '<circle cx="0" cy="-24" r="2.2" fill="#b8503f" stroke="#33291e" stroke-width="1"/>'+
        '<path d="M-8 -18 C-8 -28 8 -28 8 -18" stroke="#33291e" stroke-width="2" fill="none"/>'+
        '<path d="M-12 -12 L-20 -17" stroke="#33291e" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
      'банка': '<rect x="-9" y="-20" width="18" height="20" rx="4" fill="#eaf2f6" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-7.5" y="-9" width="15" height="8" rx="3" fill="#e0a75c"/>'+
        '<rect x="-11" y="-24" width="22" height="5" rx="2" fill="#8a9aa8" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-4 -16 L4 -16" stroke="#b9c6cf" stroke-width="1.6"/>',
      'мёд': '<path d="M-11 0 C-13 -8 -11 -16 0 -16 C11 -16 13 -8 11 0 Z" fill="#e8a92e" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-16" rx="9" ry="3.2" fill="#f2c14e" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-7" y="-21" width="14" height="4" rx="2" fill="#c98a2a" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M0 -25 q1 -7 7 -9" stroke="#c98a2a" stroke-width="2" fill="none" stroke-linecap="round"/>'+
        '<circle cx="-6" cy="-8" r="1.6" fill="#f2c14e"/>',
      'корзина': '<path d="M-13 0 L-10 -16 L10 -16 L13 0 Z" fill="#d0a05a" stroke="#33291e" stroke-width="1.5"/>'+
        '<path d="M-11.5 -4 L11.5 -4 M-12.4 -9 L12.4 -9 M-11 -13 L11 -13" stroke="#a8721f" stroke-width="1.2"/>'+
        '<rect x="-14" y="-18" width="28" height="4" rx="2" fill="#c08f4c" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-8 -18 C-8 -30 8 -30 8 -18" stroke="#8a5c33" stroke-width="2" fill="none"/>',

      /* ── игра, движение, техника ──────────────────────────────────── */
      'мяч': '<circle cx="0" cy="-9" r="9" fill="'+(цвет||'#f6efe0')+'" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M0 -13.6 L3.6 -11.2 L2.2 -7.2 L-2.2 -7.2 L-3.6 -11.2 Z" fill="#33291e"/>'+
        '<path d="M-8.8 -9.6 L-4.2 -7.6 M8.8 -9.6 L4.2 -7.6 M-4.2 -1.4 Q0 0.4 4.2 -1.4" stroke="#33291e" stroke-width="1.2" fill="none"/>',
      'мишка': '<circle cx="-7" cy="-31" r="4.5" fill="#c08f5a" stroke="#33291e" stroke-width="1.2"/>'+
        '<circle cx="7" cy="-31" r="4.5" fill="#c08f5a" stroke="#33291e" stroke-width="1.2"/>'+
        '<ellipse cx="-9" cy="-12" rx="4" ry="6" fill="#c08f5a" stroke="#33291e" stroke-width="1.2"/>'+
        '<ellipse cx="9" cy="-12" rx="4" ry="6" fill="#c08f5a" stroke="#33291e" stroke-width="1.2"/>'+
        '<ellipse cx="0" cy="-9" rx="9" ry="9" fill="#d0a06a" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="-5" cy="-2.6" rx="4" ry="3" fill="#c08f5a" stroke="#33291e" stroke-width="1.1"/>'+
        '<ellipse cx="5" cy="-2.6" rx="4" ry="3" fill="#c08f5a" stroke="#33291e" stroke-width="1.1"/>'+
        '<circle cx="0" cy="-24" r="9" fill="#d0a06a" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-21" rx="4.6" ry="3.4" fill="#f0d8b8"/>'+
        '<circle cx="-3.2" cy="-26" r="1.4" fill="#33291e"/><circle cx="3.2" cy="-26" r="1.4" fill="#33291e"/>'+
        '<ellipse cx="0" cy="-21.6" rx="1.8" ry="1.3" fill="#33291e"/>',
      'машинка': '<path d="M-16 -8 L-16 -14 L-7 -14 L-3 -20 L7 -20 L7 -14 L16 -14 L16 -8 Z" fill="'+(цвет||'#d9503f')+'" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-6 -14 L-2.8 -19 L5 -19 L5 -14 Z" fill="#bfe3f7" stroke="#33291e" stroke-width="1"/>'+
        '<circle cx="-9" cy="-4.6" r="4.6" fill="#4a4a52" stroke="#33291e" stroke-width="1.3"/>'+
        '<circle cx="9" cy="-4.6" r="4.6" fill="#4a4a52" stroke="#33291e" stroke-width="1.3"/>'+
        '<circle cx="-9" cy="-4.6" r="1.7" fill="#c9ccd2"/><circle cx="9" cy="-4.6" r="1.7" fill="#c9ccd2"/>',
      'воздушный_змей': '<path d="M0 -40 L15 -24 L0 -8 L-15 -24 Z" fill="'+(цвет||'#4a93d0')+'" stroke="#33291e" stroke-width="1.5"/>'+
        '<path d="M0 -40 L0 -8 M-15 -24 L15 -24" stroke="#33291e" stroke-width="1.1"/>'+
        '<path d="M0 -8 C5 -4 4 -1 -2 0" stroke="#8a6d4a" stroke-width="1.4" fill="none"/>'+
        '<path d="M1 -5 L5 -7 L2 -3 Z" fill="#f2c14e" stroke="#33291e" stroke-width=".9"/>',
      'поезд': '<rect x="-20" y="-8" width="40" height="5" rx="2" fill="#6b7078" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-18" y="-30" width="22" height="22" rx="3" fill="#3f6f9c" stroke="#33291e" stroke-width="1.5"/>'+
        '<rect x="-16" y="-42" width="12" height="12" rx="2" fill="#4f80ad" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-14" y="-40" width="8" height="7" rx="1" fill="#bfe3f7" stroke="#33291e" stroke-width=".9"/>'+
        '<rect x="6" y="-30" width="16" height="22" rx="3" fill="#5a8cb8" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="9" y="-26" width="10" height="9" rx="1" fill="#bfe3f7" stroke="#33291e" stroke-width=".9"/>'+
        '<circle cx="-12" cy="-4.4" r="4.4" fill="#4a4a52" stroke="#33291e" stroke-width="1.2"/>'+
        '<circle cx="0" cy="-4.4" r="4.4" fill="#4a4a52" stroke="#33291e" stroke-width="1.2"/>'+
        '<circle cx="12" cy="-4.4" r="4.4" fill="#4a4a52" stroke="#33291e" stroke-width="1.2"/>',
      'кирпич': '<rect x="-14" y="-13" width="28" height="13" rx="2" fill="'+(цвет||'#b5533c')+'" stroke="#33291e" stroke-width="1.5"/>'+
        '<path d="M-14 -6.5 L14 -6.5" stroke="rgba(0,0,0,.28)" stroke-width="1.2"/>'+
        '<path d="M-4.6 -13 L-4.6 -6.5 M4.6 -6.5 L4.6 0" stroke="rgba(0,0,0,.28)" stroke-width="1.2"/>',
      'пазл': '<path d="M-13 0 L-13 -24 L-3 -24 C-4 -31 2 -34 4 -28 C5 -26 5 -25 5 -24 L13 -24 L13 -13 C19 -14 22 -8 17 -5 C15 -4 13.6 -4.6 13 -6 L13 0 Z" fill="'+(цвет||'#5aa9d6')+'" stroke="#33291e" stroke-width="1.5"/>',
      'велосипед': '<circle cx="-12" cy="-6" r="6" fill="none" stroke="#33291e" stroke-width="1.8"/>'+
        '<circle cx="12" cy="-6" r="6" fill="none" stroke="#33291e" stroke-width="1.8"/>'+
        '<path d="M-12 -6 L-4 -17 L8 -17 L12 -6 M-4 -17 L-4 -6 M8 -17 L8 -6" stroke="#d9503f" stroke-width="2" fill="none"/>'+
        '<path d="M-4 -17 L-7 -22 L-2 -22" stroke="#33291e" stroke-width="1.8" fill="none"/>'+
        '<path d="M8 -17 L11 -22 L16 -22" stroke="#33291e" stroke-width="1.8" fill="none"/>',
      'замок_песка': '<rect x="-17" y="-22" width="34" height="22" rx="2" fill="#e0c48a" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-21" y="-32" width="12" height="32" rx="2" fill="#ecd39c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="9" y="-32" width="12" height="32" rx="2" fill="#ecd39c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-21" y="-38" width="4" height="6" fill="#ecd39c" stroke="#33291e" stroke-width="1.1"/>'+
        '<rect x="-15" y="-38" width="4" height="6" fill="#ecd39c" stroke="#33291e" stroke-width="1.1"/>'+
        '<rect x="9" y="-38" width="4" height="6" fill="#ecd39c" stroke="#33291e" stroke-width="1.1"/>'+
        '<rect x="15" y="-38" width="4" height="6" fill="#ecd39c" stroke="#33291e" stroke-width="1.1"/>'+
        '<path d="M-4 0 L-4 -9 C-4 -14 4 -14 4 -9 L4 0 Z" fill="#c9a86a" stroke="#33291e" stroke-width="1.2"/>',

      /* ── инструменты и вещи ───────────────────────────────────────── */
      'ключ': '<circle cx="0" cy="-28" r="7" fill="none" stroke="#8a6d1e" stroke-width="3"/>'+
        '<rect x="-2.4" y="-22" width="4.8" height="22" rx="2" fill="#d9b24c" stroke="#8a6d1e" stroke-width="1"/>'+
        '<rect x="2.4" y="-12" width="7" height="4" rx="1.4" fill="#d9b24c" stroke="#8a6d1e" stroke-width="1"/>'+
        '<rect x="2.4" y="-4" width="5" height="4" rx="1.4" fill="#d9b24c" stroke="#8a6d1e" stroke-width="1"/>',
      'гайка': '<path d="M0 -16 L7 -12 L7 -4 L0 0 L-7 -4 L-7 -12 Z" fill="#a8adb5" stroke="#33291e" stroke-width="1.4"/>'+
        '<circle cx="0" cy="-8" r="3.2" fill="#6b7078" stroke="#33291e" stroke-width="1.2"/>',
      'молоток': '<rect x="-2.6" y="-32" width="5.2" height="32" rx="2.4" fill="#b5793c" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-13" y="-40" width="24" height="9" rx="3" fill="#8a9099" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="10" y="-38" width="6" height="5" rx="2" fill="#6b7078" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-9 -40 L-9 -31" stroke="#6b7078" stroke-width="1.1"/>',
      'отвёртка': '<path d="M-2 -26 L-2 -4 L0 0 L2 -4 L2 -26 Z" fill="#c9cfd7" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-2.4" y="-28" width="4.8" height="6" rx="1.4" fill="#a8adb5" stroke="#33291e" stroke-width="1.1"/>'+
        '<rect x="-6" y="-42" width="12" height="16" rx="4" fill="#d9503f" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-6 -37 L6 -37 M-6 -32 L6 -32" stroke="rgba(0,0,0,.25)" stroke-width="1.3"/>',
      'лопата': '<rect x="-2.2" y="-40" width="4.4" height="24" rx="2" fill="#b5793c" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-4" y="-43" width="8" height="4" rx="2" fill="#a8721f" stroke="#33291e" stroke-width="1.1"/>'+
        '<path d="M-9 -16 L9 -16 L7 0 L-7 0 Z" fill="#a8adb5" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-2.2 -16 L-2.2 -2" stroke="#6b7078" stroke-width="1.1"/>',
      'верёвка': '<path d="M0 -14 C10 -14 14 -8 12 -4 C10 -1 4 0 -2 0 C-10 0 -16 -2 -16 -6" stroke="#c9a86a" stroke-width="4.4" fill="none" stroke-linecap="round"/>'+
        '<path d="M0 -14 C10 -14 14 -8 12 -4 C10 -1 4 0 -2 0 C-10 0 -16 -2 -16 -6" stroke="#8a6d4a" stroke-width="4.4" fill="none" stroke-dasharray="3 5" stroke-linecap="round"/>',
      'клубок': '<circle cx="0" cy="-10" r="10" fill="'+(цвет||'#c96a8a')+'" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-9 -14 C-2 -6 6 -6 9 -13 M-9 -6 C-2 -14 6 -14 9 -7 M-6 -19 C-2 -12 4 -5 7 -1" stroke="rgba(0,0,0,.22)" stroke-width="1.2" fill="none"/>'+
        '<path d="M8 -16 C16 -20 22 -13 20 -7" stroke="#33291e" stroke-width="1.6" fill="none"/>',
      'ткань': '<path d="M-17 0 C-17 -7 -13 -11 -5 -11 L14 -11 C18 -11 21 -8 21 -4 L21 0 Z" fill="'+(цвет||'#7fb45c')+'" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-9 -11 C-6 -6 -2 -4 4 -4 L21 -4" stroke="rgba(0,0,0,.2)" stroke-width="1.1" fill="none"/>'+
        '<path d="M3 -11 C5 -6 9 -4 15 -4" stroke="rgba(0,0,0,.2)" stroke-width="1.1" fill="none"/>',
      'письмо': '<rect x="-16" y="-22" width="32" height="22" rx="2" fill="#fdf6e0" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-16 -22 L0 -10 L16 -22" fill="none" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-16 0 L-2 -11 M16 0 L2 -11" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="1.2"/>',
      'картина': '<rect x="-16" y="-28" width="32" height="28" rx="2" fill="#c9a227" stroke="#33291e" stroke-width="1.5"/>'+
        '<rect x="-12" y="-24" width="24" height="20" fill="#bfe3f7"/>'+
        '<path d="M-12 -11 L-5 -18 L0 -13 L5 -20 L12 -12 L12 -4 L-12 -4 Z" fill="#6aa34e"/>'+
        '<circle cx="6" cy="-20" r="2.4" fill="#ffe08a"/>'+
        '<rect x="-12" y="-24" width="24" height="20" fill="none" stroke="#33291e" stroke-width="1.2"/>',
      'свеча': '<ellipse cx="0" cy="-1" rx="8" ry="2.6" fill="#d9cdb4" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-5" y="-20" width="10" height="19" rx="2" fill="#f6efe0" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M0 -23 L0 -20" stroke="#8a6d4a" stroke-width="1.4"/>'+
        '<path d="M0 -33 C4 -28 4 -23 0 -23 C-4 -23 -4 -28 0 -33 Z" fill="#ffb347" stroke="#e07f2a" stroke-width="1.1"/>'+
        '<path d="M0 -29 C2 -27 2 -24 0 -24 C-2 -24 -2 -27 0 -29 Z" fill="#ffe9a8"/>',
      'огонь': '<rect x="-14" y="-6" width="28" height="5" rx="2.5" fill="#8a5c33" stroke="#33291e" stroke-width="1.2" transform="rotate(-7)"/>'+
        '<rect x="-14" y="-6" width="28" height="5" rx="2.5" fill="#a8721f" stroke="#33291e" stroke-width="1.2" transform="rotate(7)"/>'+
        '<path d="M0 -34 C9 -25 11 -16 6 -9 C3 -5 -3 -5 -6 -9 C-11 -16 -9 -25 0 -34 Z" fill="#f0832e" stroke="#c05a1c" stroke-width="1.3"/>'+
        '<path d="M0 -25 C5 -19 6 -13 2 -9 C0 -7 -2 -8 -3 -10 C-5 -14 -3 -20 0 -25 Z" fill="#ffd76a"/>',
      'флажок': '<rect x="-1.6" y="-42" width="3.2" height="42" rx="1.6" fill="#8a6d4a" stroke="#33291e" stroke-width="1.1"/>'+
        '<path d="M1.6 -42 L23 -34 L1.6 -26 Z" fill="'+(цвет||'#d9503f')+'" stroke="#33291e" stroke-width="1.4"/>',

      /* ── природа, еда, музыка ─────────────────────────────────────── */
      'виноград': '<path d="M0 -38 C6 -44 14 -42 15 -36 C9 -33 4 -34 0 -38 Z" fill="#4e7f2f" stroke="#31531c" stroke-width="1.2"/>'+
        '<path d="M0 -38 L0 -30" stroke="#6b4520" stroke-width="2" fill="none"/>'+
        '<g fill="#8a4fa8" stroke="#5c2f78" stroke-width="1.2">'+
        '<circle cx="-5" cy="-28" r="5"/><circle cx="5" cy="-28" r="5"/><circle cx="0" cy="-26" r="5"/>'+
        '<circle cx="-8" cy="-19" r="5"/><circle cx="0" cy="-18" r="5.4"/><circle cx="8" cy="-19" r="5"/>'+
        '<circle cx="-4" cy="-10" r="5"/><circle cx="4" cy="-10" r="5"/>'+
        '<circle cx="0" cy="-4.6" r="4.6"/></g>',
      'рыба': '<path d="M-13 -9 C-7 -18 6 -18 12 -9 C6 0 -7 0 -13 -9 Z" fill="#4a93d0" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-13 -9 L-21 -15 L-21 -3 Z" fill="#3f7fb0" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-1 -13 Q2 -16 5 -13" stroke="#5aa3d8" stroke-width="1.6" fill="none"/>'+
        '<path d="M-5 -8 Q0 -5 6 -8" stroke="#2f6f9c" stroke-width="1.1" fill="none"/>'+
        '<circle cx="6" cy="-11" r="1.5" fill="#33291e"/>',
      'птица': '<ellipse cx="0" cy="-10" rx="10" ry="8" fill="#6fb0d8" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-9 -9 L-18 -14 L-15 -5 Z" fill="#5a9cc4" stroke="#33291e" stroke-width="1.1"/>'+
        '<ellipse cx="-1" cy="-10" rx="5" ry="4" fill="#5a9cc4" transform="rotate(-18 -1 -10)"/>'+
        '<circle cx="8" cy="-17" r="6" fill="#7fc0e0" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M13 -17 L20 -15 L13 -13 Z" fill="#f2a93b" stroke="#33291e" stroke-width="1"/>'+
        '<circle cx="9.6" cy="-18.4" r="1.4" fill="#33291e"/>'+
        '<path d="M-2 0 L-2 -3 M3 0 L3 -3" stroke="#e0a72e" stroke-width="1.6"/>',
      'пингвин': '<ellipse cx="-11" cy="-16" rx="3.4" ry="8" fill="#2f343d" stroke="#33291e" stroke-width="1.1" transform="rotate(12 -11 -16)"/>'+
        '<ellipse cx="11" cy="-16" rx="3.4" ry="8" fill="#2f343d" stroke="#33291e" stroke-width="1.1" transform="rotate(-12 11 -16)"/>'+
        '<ellipse cx="0" cy="-17" rx="11" ry="17" fill="#3a3f4a" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-14" rx="7.6" ry="12.5" fill="#f6efe0"/>'+
        '<circle cx="0" cy="-33" r="8" fill="#3a3f4a" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-31" rx="4.4" ry="4" fill="#f6efe0"/>'+
        '<circle cx="-2.6" cy="-34" r="1.3" fill="#33291e"/><circle cx="2.6" cy="-34" r="1.3" fill="#33291e"/>'+
        '<path d="M-3 -30 L3 -30 L0 -26 Z" fill="#f2a93b" stroke="#33291e" stroke-width="1"/>'+
        '<ellipse cx="-4.4" cy="-1.2" rx="4.4" ry="2" fill="#f2a93b" stroke="#33291e" stroke-width="1"/>'+
        '<ellipse cx="4.4" cy="-1.2" rx="4.4" ry="2" fill="#f2a93b" stroke="#33291e" stroke-width="1"/>',
      'ракушка': '<path d="M0 0 C-12 -2 -17 -10 -14 -18 C-7 -18 -2 -12 0 -4 C2 -12 7 -18 14 -18 C17 -10 12 -2 0 0 Z" fill="#f6d8c8" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M0 -4 L0 -18 M-3.4 -5 L-8.6 -17 M3.4 -5 L8.6 -17" stroke="#e0a894" stroke-width="1.1"/>',
      'капля': '<path d="M0 -22 C6 -14 9 -9 9 -6 C9 -2 5 0 0 0 C-5 0 -9 -2 -9 -6 C-9 -9 -6 -14 0 -22 Z" fill="#7fc0e0" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-3 -9 C-4 -6 -3 -3 0 -1" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>',
      'чашка': '<path d="M-9 0 L-8 -18 L8 -18 L9 0 Z" fill="#fffef4" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-18" rx="8" ry="2.6" fill="#c98a5a" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M9 -14 C15 -13 15 -5 9 -4" stroke="#33291e" stroke-width="2" fill="none"/>',
      'тарелка': '<ellipse cx="0" cy="-3" rx="18" ry="3" fill="#e6e0d0" stroke="#33291e" stroke-width="1.3"/>'+
        '<ellipse cx="0" cy="-6" rx="15" ry="4.4" fill="#fffef4" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-6.5" rx="9" ry="2.6" fill="#f0ebdc" stroke="#33291e" stroke-width="1"/>',
      'свиток': '<rect x="-11" y="-25" width="22" height="19" rx="2" fill="#f6e6c0" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-15" y="-31" width="30" height="6" rx="3" fill="#e0c48a" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-15" y="-6" width="30" height="6" rx="3" fill="#e0c48a" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-6 -21 L6 -21 M-6 -16 L6 -16 M-6 -11 L2 -11" stroke="#b09468" stroke-width="1.2"/>',
      'весы': '<rect x="-10" y="-4" width="20" height="4" rx="2" fill="#a8721f" stroke="#33291e" stroke-width="1.3"/>'+
        '<rect x="-1.6" y="-34" width="3.2" height="30" rx="1.6" fill="#b5793c" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-18" y="-37" width="36" height="3.6" rx="1.8" fill="#c9a227" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-14 -34 L-14 -26 M14 -34 L14 -26" stroke="#8a6d1e" stroke-width="1.1"/>'+
        '<path d="M-20 -26 L-8 -26 L-11 -20 L-17 -20 Z" fill="#c9a227" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M8 -26 L20 -26 L17 -20 L11 -20 Z" fill="#c9a227" stroke="#33291e" stroke-width="1.2"/>'+
        '<circle cx="0" cy="-37" r="3" fill="#d9b24c" stroke="#33291e" stroke-width="1.2"/>',
      'песочные_часы': '<rect x="-12" y="-36" width="24" height="4" rx="2" fill="#8a5c33" stroke="#33291e" stroke-width="1.2"/>'+
        '<rect x="-12" y="-4" width="24" height="4" rx="2" fill="#8a5c33" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-9 -32 L9 -32 L0 -19 Z" fill="#f0e2c4" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-9 -4 L9 -4 L0 -17 Z" fill="#f0e2c4" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-6 -32 L6 -32 L0 -22 Z" fill="#e0b45c"/>'+
        '<path d="M-5 -4 L5 -4 L0 -12 Z" fill="#e0b45c"/>'+
        '<path d="M-1 -19 L1 -19 L1 -17 L-1 -17 Z" fill="#e0b45c"/>',
      'колокол': '<path d="M0 -30 C8 -30 12 -23 12 -13 L14 -1 L-14 -1 L-12 -13 C-12 -23 -8 -30 0 -30 Z" fill="#d9b24c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-3" y="-34" width="6" height="5" rx="2" fill="#b8902e" stroke="#33291e" stroke-width="1.1"/>'+
        '<circle cx="0" cy="-4" r="3.2" fill="#b8902e" stroke="#33291e" stroke-width="1.2"/>',
      'нота': '<ellipse cx="-6" cy="-5" rx="6" ry="4.4" fill="#3a3f4a" stroke="#33291e" stroke-width="1.2" transform="rotate(-18 -6 -5)"/>'+
        '<rect x="-1.4" y="-30" width="2.8" height="25" fill="#3a3f4a" stroke="#33291e" stroke-width="1"/>'+
        '<path d="M1.4 -30 C8 -28 10 -23 8 -17 C7 -23 4 -26 1.4 -27 Z" fill="#3a3f4a" stroke="#33291e" stroke-width="1.1"/>',
      'скрипка': '<ellipse cx="0" cy="-10" rx="10" ry="9" fill="#c98a4c" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-22" rx="7.5" ry="7" fill="#c98a4c" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-4" y="-36" width="8" height="10" rx="2" fill="#8a5c33" stroke="#33291e" stroke-width="1.2"/>'+
        '<path d="M-5 -36 q5 -5 10 0" stroke="#6b4520" stroke-width="2.2" fill="none"/>'+
        '<circle cx="0" cy="-12" r="2.4" fill="#5c3a1c"/>'+
        '<path d="M-3 -30 L-3 -8 M3 -30 L3 -8" stroke="#f6efe0" stroke-width="1"/>'+
        '<path d="M-6 -6 q6 4 12 0" stroke="#5c3a1c" stroke-width="1.4" fill="none"/>',
      'горшок': '<path d="M-11 -14 L-8 0 L8 0 L11 -14 Z" fill="#c96a4a" stroke="#33291e" stroke-width="1.4"/>'+
        '<rect x="-13" y="-19" width="26" height="5" rx="2" fill="#b5533c" stroke="#33291e" stroke-width="1.3"/>'+
        '<path d="M-11 -5 L11 -5" stroke="rgba(0,0,0,.18)" stroke-width="1.4"/>',
      'лейка': '<path d="M-10 0 L-12 -18 L10 -18 L12 0 Z" fill="#6fb0a8" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-11 -15 L-21 -23 L-19 -26 L-9 -19 Z" fill="#6fb0a8" stroke="#33291e" stroke-width="1.2"/>'+
        '<ellipse cx="-21" cy="-25" rx="4.6" ry="2.4" fill="#5a9a92" stroke="#33291e" stroke-width="1.1" transform="rotate(-30 -21 -25)"/>'+
        '<path d="M-4 -18 C-4 -28 8 -30 8 -20" stroke="#33291e" stroke-width="2" fill="none"/>'+
        '<path d="M-9 -8 L9 -8" stroke="rgba(255,255,255,.4)" stroke-width="1.6"/>',
      'чайная_пара': '<ellipse cx="0" cy="-2" rx="15" ry="4" fill="#fffef4" stroke="#33291e" stroke-width="1.4"/>'+
        '<path d="M-8 -4 L-6 -16 L6 -16 L8 -4 Z" fill="#fffef4" stroke="#33291e" stroke-width="1.4"/>'+
        '<ellipse cx="0" cy="-16" rx="6" ry="2.2" fill="#c98a5a" stroke="#33291e" stroke-width="1.1"/>'+
        '<path d="M8 -13 C14 -12 14 -5 8 -4" stroke="#33291e" stroke-width="1.8" fill="none"/>'+
        '<path d="M-3 -22 q3 -4 0 -8 M3 -22 q3 -4 0 -8" stroke="#c9c2d8" stroke-width="1.6" fill="none" stroke-linecap="round"/>'

    };
    const ф = фигуры[вид];
    return ф ? '<g transform="'+м+'">'+ф+'</g>' : '';
  }

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
      <!-- рыбки ПОД водой.
           У символа 'рыба' тело залито тем же синим #4a93d0, что и вода
           пруда, — на воде остаётся виден только контур. Пока у символа нет
           параметра цвета, перекрашиваем две его заливки в золотую.
           Покачивание раньше висело на .c2a-fish text — текстовых узлов
           больше нет, поэтому ту же анимацию c2fish вешаем на обёртки. -->
      <g class="c2a-fish">
        <g style="animation:c2fish 4.5s ease-in-out infinite alternate">${сим('рыба',67,146,1.0).replace(/#4a93d0/g,'#efa53c').replace(/#3f7fb0/g,'#c9862a')}</g>
        <g style="animation:c2fish 4.5s ease-in-out -1.5s infinite alternate">${сим('рыба',182,177,0.95).replace(/#4a93d0/g,'#efa53c').replace(/#3f7fb0/g,'#c9862a')}</g>
        <g style="animation:c2fish 4.5s ease-in-out -3s infinite alternate">${сим('рыба',285,137,0.90).replace(/#4a93d0/g,'#efa53c').replace(/#3f7fb0/g,'#c9862a')}</g>
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
      ${сим('банка',57,50,0.90)}${сим('мёд',102,50,0.80)}
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
      ${сим('пирог',139,153,0.80)}
      ${сим('пирог',160,157,0.95)}
      ${сим('пирог',181,153,0.80)}
      <!-- чайник на столе -->
      ${сим('чайник',267,154,1.0)}
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
        <!-- монеты внутри сундука (символа 'монета' пока нет — берём золотой шар) -->
        ${сим('шар',170,180,1.15,'#f2c14e')}
        ${сим('шар',197,184,1.05,'#e0a72e')}
        ${сим('шар',225,176,1.20,'#f2c14e')}
        ${сим('шар',251,184,1.05,'#e0a72e')}
        ${сим('шар',274,178,1.15,'#f2c14e')}
      </g>
      <!-- кучка монет на земле перед сундуком.
           Блеск раньше висел на .c2a-coin text — вешаем ту же c2glint на обёртки. -->
      <g class="c2a-coin">
        <g style="animation:c2glint 2.6s ease-in-out infinite">${сим('шар',185,200,1.05,'#f2c14e')}</g>
        <g style="animation:c2glint 2.6s ease-in-out -.8s infinite">${сим('шар',209,202,1.20,'#e0a72e')}</g>
        <g style="animation:c2glint 2.6s ease-in-out -1.6s infinite">${сим('шар',233,199,1.05,'#f2c14e')}</g>
        <g style="animation:c2glint 2.6s ease-in-out infinite">${сим('шар',258,203,1.15,'#e0a72e')}</g>
        <g style="animation:c2glint 2.6s ease-in-out -.8s infinite">${сим('шар',281,199,1.05,'#f2c14e')}</g>
      </g>
      <!-- одна монетка откатилась в сторону -->
      <g class="c2a-coin" style="animation:c2glint 2.6s ease-in-out infinite">${сим('шар',101,203,1.05,'#f2c14e')}</g>
      <!-- искры -->
      <g class="c2a-spark">${сим('звезда',158,66,0.85)}</g>
      <g class="c2a-spark">${сим('звезда',290,54,0.85)}</g>
      <g class="c2a-spark">${сим('звезда',255,115,0.70)}</g>
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
        ${сим('яблоко',162,63,1.09)}${сим('яблоко',208,55,1.09)}
        ${сим('яблоко',239,87,1.00)}${сим('яблоко',139,95,1.00)}
        ${сим('яблоко',178,111,0.91)}</g>
      <!-- корзина с яблоками справа на траве -->
      <path d="M236 168 L236 192 Q236 200 252 200 L282 200 Q298 200 298 192 L298 168 Z" fill="#b07a2e" stroke="#5f3f12" stroke-width="2.5"/>
      <path d="M236 168 Q267 156 298 168" stroke="#8a5c1e" stroke-width="4" fill="none"/>
      ${сим('яблоко',262,161,0.91)}${сим('яблоко',282,155,0.91)}${сим('яблоко',271,179,0.82)}
      ${сим('яблоко',260,195,0.73)}${сим('яблоко',280,193,0.73)}
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
        ${сим('морковь',36,140,0.75)}${сим('морковь',78,140,0.75)}${сим('морковь',120,140,0.75)}
        ${сим('морковь',210,134,0.75)}${сим('морковь',252,140,0.75)}${сим('морковь',294,134,0.75)}</g>
      <!-- ведёрко с морковками -->
      <path d="M40 168 L40 198 Q40 204 50 204 L84 204 Q94 204 94 198 L94 168 Z" fill="#d98f3f" stroke="#7a4a26" stroke-width="2"/>
      ${сим('морковь',54,164,0.62)}${сим('морковь',72,166,0.62)}
      ${сим('морковь',50,185,0.60)}${сим('морковь',70,186,0.60)}
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
      <!-- символа 'курица/цыплёнок' нет — двор населяем 'птицей'
           (куры крупнее, цыплята мельче; цвет у символа один, синий) -->
      <g class="c2a-chick">
        ${сим('птица',163,151,1.10)}${сим('птица',209,157,1.05)}
        ${сим('птица',130,178,0.80)}${сим('птица',155,184,0.75)}${сим('птица',182,180,0.80)}
        ${сим('птица',214,184,0.72)}${сим('птица',241,178,0.75)}</g>
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
        ${сим('мишка',57,58,0.75)}${сим('машинка',104,58,1.00)}${сим('мяч',149,58,1.20)}
        <rect x="196" y="58" width="146" height="8" rx="3" fill="#a8721f"/><rect x="196" y="58" width="146" height="3" fill="#c2915b"/>
        ${сим('шар',235,58,1.20,'#d9503f')}${сим('мишка',283,58,0.75)}${сим('поезд',328,58,0.60)}
      </g>
      <g>
        <rect x="20" y="104" width="150" height="8" rx="3" fill="#a8721f"/><rect x="20" y="104" width="150" height="3" fill="#c2915b"/>
        ${сим('воздушный_змей',64,104,0.62)}${сим('кирпич',111,104,1.20,'#f6efe0')}${сим('мишка',150,104,0.65)}
        <rect x="196" y="104" width="146" height="8" rx="3" fill="#a8721f"/><rect x="196" y="104" width="146" height="3" fill="#c2915b"/>
        ${сим('мяч',233,104,1.20)}${сим('машинка',279,104,0.95)}${сим('шар',324,104,1.00,'#4a93d0')}
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
      ${сим('мишка',291,162,0.60)}
    </svg>`; }
  function cosmosSVG(){ // космос: звёзды, ракета, поверхность Луны
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skC2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1b2450"/><stop offset="1" stop-color="#3d4d94"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skC2)"/>
      <g class="c2a-star">
        ${сим('звезда',50,32,1.00)}${сим('звезда',127,54,0.75)}
        ${сим('звезда',219,27,0.90)}${сим('звезда',308,64,0.85)}
        ${сим('звезда',90,87,0.65)}${сим('звезда',277,114,0.75)}
        ${сим('звезда',336,25,0.65)}</g>
      ${сим('планета',75,126,0.95)}
      <!-- символа 'ракета' нет: корпус ракеты собираем из свечи, перевёрнутой
           так, что фитиль-огонёк становится выхлопом снизу -->
      <g transform="translate(313,27) scale(1,-1)">${сим('свеча',0,0,1.00)}</g>
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
      <g class="c2a-cloud">${сим('облако',40,34,0.9)}${сим('облако',250,52,0.75)}</g>
      ${сим('солнце',308,36,0.95)}
      <path d="M0 118 Q90 92 180 116 T360 112 L360 150 L0 150 Z" fill="#7fb45c"/>
      <path d="M0 140 Q120 118 360 146 L360 168 L0 168 Z" fill="#5c8f3e"/>
      <rect x="0" y="150" width="360" height="60" fill="#4a7a33"/>
      ${сим('ёлка',20,174,0.72)}${сим('дерево',68,190,0.66)}
      ${сим('ёлка',290,170,0.70)}${сим('дерево',330,190,0.64)}
      ${сим('дерево',154,190,0.58)}
      ${сим('гриб',32,198,0.95)}${сим('гриб',210,202,0.85)}
      ${сим('ромашка',264,202,0.9)}${сим('цветок',122,198,0.9)}
      <g class="c2a-spark">${сим('камень',109,152,1.00,'#8a5a2c')}${сим('камень',249,160,0.82,'#8a5a2c')}</g>
    </svg>`; }
  function trainSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skT" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#cfe6f5"/><stop offset="1" stop-color="#a8d2ea"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skT)"/>
      <g class="c2a-cloud">${сим('облако',40,30,.85)}${сим('облако',252,22,.9)}</g>
      ${сим('солнце',322,44,.8)}
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
      <g class="c2a-smoke">${сим('облако',56,72,.6)}${сим('облако',46,52,.5)}</g>
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
      <g>
        ${сим('гайка',27,44,1.10)}${сим('гайка',61,46,1.20)}${сим('ключ',95,48,0.60)}${сим('молоток',127,50,0.60)}
      </g>
      <rect x="222" y="16" width="130" height="8" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
      <g>
        ${сим('флажок',243,48,0.60,'#e8d5a8')}${сим('отвёртка',279,48,0.60)}${сим('гайка',315,46,1.20)}${сим('молоток',345,50,0.60)}
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
      <g>
        ${сим('гайка',70,118,1.20)}${сим('гайка',106,117,1.05)}${сим('пазл',160,118,0.65)}
        ${сим('гайка',206,117,1.20)}${сим('ключ',250,118,0.60)}${сим('кирпич',296,117,1.20)}
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
      ${сим('солнце',325,29,0.72)}
      <g class="c2a-cloud">${сим('облако',43,29,0.80)}${сим('облако',160,53,0.70)}</g>
      <!-- море с волнами -->
      <path d="M0 96 Q40 88 80 96 T160 96 T240 96 T320 96 T360 96 L360 132 L0 132 Z" fill="#3f9ed6"/>
      <path d="M0 112 Q50 104 100 112 T200 112 T300 112 T360 112" stroke="#bfe6f7" stroke-width="3" fill="none"/>
      <!-- пляж -->
      <rect x="0" y="132" width="360" height="78" fill="#f0d9a8"/>
      <path d="M0 132 Q90 126 180 132 T360 132" fill="#e3c88e"/>
      <g>
        ${сим('ракушка',46,172,1.05)}${сим('звезда',107,180,1.00)}${сим('ракушка',190,180,1.05)}${сим('ракушка',272,170,1.05)}
        ${сим('звезда',326,184,0.72)}
      </g>
      <!-- ведёрко и зонтик -->
      <rect x="268" y="118" width="26" height="24" rx="3" fill="#e86a5a" stroke="#33291e" stroke-width="2.5"/>
      <path d="M274 118 Q281 110 288 118" stroke="#33291e" stroke-width="2.5" fill="none"/>
      <line x1="120" y1="140" x2="110" y2="96" stroke="#7c4a33" stroke-width="3"/>
      <path d="M110 96 Q132 78 158 92 Q140 102 122 100 Z" fill="#e86a5a" stroke="#33291e" stroke-width="2"/>
      <!-- вода в ведёрке -->
      <rect x="270" y="120" width="22" height="8" fill="#7fd1ff"/>
      <g class="c2a-spark">${сим('капля',158,200,0.80)}</g>
    </svg>`; }

  function winterSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skW2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9fb8e8"/><stop offset="1" stop-color="#7f9ed8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skW2)"/>
      <g class="c2a-cloud">${сим('облако',43,29,0.85)}${сим('облако',211,40,0.70)}</g>
      ${сим('снежинка',69,26,0.80)}${сим('снежинка',157,56,0.62)}
      ${сим('снежинка',309,30,0.80)}${сим('снежинка',126,88,0.60)}
      <rect x="0" y="150" width="360" height="60" fill="#eef3fb"/>
      <ellipse cx="80" cy="176" rx="46" ry="12" fill="#ffffff" opacity=".85"/>
      <ellipse cx="300" cy="188" rx="60" ry="14" fill="#ffffff" opacity=".8"/>
      <!-- ёлка -->
      <rect x="196" y="180" width="10" height="20" fill="#7c4a33"/>
      <polygon points="201,44 160,112 242,112" fill="#2f7d4e" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,78 166,140 236,140" fill="#357f4f" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,108 172,168 230,168" fill="#3a8a58" stroke="#1f5c38" stroke-width="3"/>
      <polygon points="201,26 174,70 228,70" fill="#2f7d4e" stroke="#1f5c38" stroke-width="2.5"/>
      ${сим('звезда',189,45,0.95)}
      <g class="c2a-coin">
        ${сим('шар',200,84,0.85,'#f2c14e')}${сим('шар',222,98,0.85,'#c9433a')}${сим('шар',198,124,0.85,'#f2c14e')}${сим('шар',224,140,0.85,'#4a93d0')}
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
      ${сим('солнце',261,38,.6)}
      <!-- пол -->
      <rect x="0" y="120" width="360" height="90" fill="#c89a6a"/>
      <path d="M0 120 L360 120" stroke="#a87c4f" stroke-width="4"/>
      <rect x="0" y="150" width="360" height="6" fill="#a87c4f" opacity=".5"/>
      <rect x="0" y="180" width="360" height="6" fill="#a87c4f" opacity=".5"/>
      <!-- ковёр -->
      <ellipse cx="150" cy="184" rx="90" ry="16" fill="#d97f6a" opacity=".75"/>
      <!-- полка с игрушками -->
      <rect x="18" y="40" width="120" height="8" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2"/>
      <g>
        ${сим('мишка',39,81,1.15)}${сим('машинка',73,79,1.1)}${сим('мяч',109,81,1.3)}
        ${сим('пазл',139,79,1.05)}
      </g>
      <!-- кубики на полу -->
      <g>${сим('кирпич',241,181,1.05)}${сим('кирпич',269,187,1.05)}${сим('кирпич',297,193,1.05)}</g>
    </svg>`; }
  function circusSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skC3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#f2b04c"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skC3)"/>
      <!-- флажки -->
      <g>${сим('флажок',20,46,.95)}${сим('флажок',324,42,.95)}</g>
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
      <g class="c2a-coin">${сим('шар',131,145,1.4,'#c9433a')}${сим('шар',171,137,1.4,'#e8c34a')}${сим('шар',211,137,1.4,'#4a93d0')}${сим('шар',249,147,1.4,'#5f9a6a')}</g>
      ${сим('флажок',155,200,.85)}
    </svg>`; }
  function campSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skCp" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2450"/><stop offset="1" stop-color="#3d4d94"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="140" fill="url(#skCp)"/>
      <g class="c2a-star">
        ${сим('звезда',51,27,.8)}${сим('звезда',131,45,.5)}${сим('звезда',221,23,.8)}
        ${сим('звезда',311,49,.5)}${сим('звезда',171,79,.8)}
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
      <g class="c2a-smoke">${сим('огонь',189,123,.62)}${сим('огонь',179,101,.5)}</g>
      <!-- брёвнышки -->
      <rect x="146" y="158" width="40" height="9" rx="4" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="2" transform="rotate(-8 166 162)"/>
      <rect x="176" y="158" width="40" height="9" rx="4" fill="#9c6c3a" stroke="#5f3a1a" stroke-width="2" transform="rotate(8 196 162)"/>
      <!-- камни вокруг -->
      <g>${сим('камень',131,184,1)}${сим('камень',223,180,1)}${сим('камень',171,194,1)}${сим('камень',211,196,1)}</g>
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
      ${сим('картина',33,65,1)}${сим('лампа',313,69,1.1)}
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
      <g>${сим('яблоко',74,99,.55)}<text x="86" y="94" font-size="18">=1</text>${сим('виноград',118,99,.45)}<text x="126" y="94" font-size="18">=2</text></g>
      <rect x="210" y="78" width="80" height="30" rx="4" fill="#fffef4" stroke="#5f3a1a" stroke-width="2"/>
      ${сим('шар',231,102,1.3,'#e8912a')}<text x="243" y="98" font-size="18">=3 ?</text>
      <!-- лупа и чернила -->
      ${сим('шар',163,125,1.7,'#cfe9f7')}
      <rect x="176" y="112" width="26" height="18" rx="3" fill="#3a5a8a" stroke="#2c3a5f" stroke-width="2"/>
      ${сим('письмо',294,125,1.2)}
      <rect x="0" y="190" width="360" height="20" fill="#8a6a44"/>
    </svg>`; }
  function parkSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skPk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#7fc3e0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="110" fill="url(#skPk)"/>
      <g class="c2a-cloud">${сим('облако',43,29,.95)}${сим('облако',251,37,.85)}</g>
      ${сим('солнце',324,27,.8)}
      <rect x="0" y="110" width="360" height="100" fill="#7fb45c"/>
      <path d="M0 110 Q90 100 180 110 T360 108 L360 130 L0 130 Z" fill="#6aa34e"/>
      <!-- дорожка -->
      <path d="M60 210 Q120 160 180 140 Q240 130 300 210 Z" fill="#c9a86a"/>
      <!-- клумба 2x3 -->
      <g stroke="#5f3a1a" stroke-width="3">
        <rect x="96" y="148" width="120" height="40" rx="6" fill="#9c6c3a"/>
      </g>
      <g>
        ${сим('цветок',114,180.5,1)}${сим('цветок',138,180.5,1)}${сим('цветок',162,180.5,1)}
        ${сим('цветок',114,160.5,1)}${сим('цветок',138,160.5,1)}${сим('цветок',162,160.5,1)}
        ${сим('ромашка',114,206,.85)}${сим('ромашка',138,206,.85)}${сим('ромашка',162,206,.85)}
      </g>
      <!-- полоска вдоль дорожки -->
      ${сим('цветок',225,184.4,0.9)}${сим('цветок',249,190.4,0.9)}${сим('цветок',271,196.4,0.9)}
      <g>${сим('дерево',34,160,.8)}${сим('дерево',338,168,.8)}</g>
    </svg>`; }
  function shelfSVG(){
    /* Склад перерисован по методу скила arhimed-comic: разряды числа
       показываются ПРЕДМЕТАМИ, а не плашкой «48 = 40 + 8». Четыре коробки по
       десять шариков стоят стопкой вдоль стола, восемь отдельных шариков
       лежат справа — один взгляд даёт и десятки, и единицы.
       Пространство: горизонт на y=104, задняя стена уходит к точке схода
       (180,104), стол нарисован трапецией, ряды коробок уменьшаются вглубь,
       у каждой коробки видно крышку и боковину. Свет — одна тёплая лампа
       слева, от неё на столе пятно света и тени вправо-вниз. */
    const короб = (x, y, ш, в) => {
      const г = в * 0.34;
      return `<g>`+
        `<ellipse cx="${x + ш / 2}" cy="${y + 3}" rx="${ш * 0.56}" ry="${в * 0.17}" fill="rgba(60,40,20,.22)"/>`+
        `<rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="3" fill="#b98a52" stroke="#5f3a1a" stroke-width="2.4"/>`+
        `<path d="M${x + 4} ${y + 5} L${x + ш - 4} ${y + 5}" stroke="#d8ac74" stroke-width="2" opacity=".7"/>`+
        `<path d="M${x + ш} ${y} l${г} ${-г * 0.7} l0 ${в} l${-г} ${г * 0.7} Z" fill="#9a6c3a" stroke="#5f3a1a" stroke-width="2.2"/>`+
        `<path d="M${x} ${y} l${г} ${-г * 0.7} l${ш} 0 l${-г} ${г * 0.7} Z" fill="#d0a06a" stroke="#5f3a1a" stroke-width="2.2"/>`+
        `</g>`;
    };
    /* 4 десятка = 4 коробки, в каждой 10 шариков; шарики меньше вглубь */
    const шарики = (x, y, ш, n) => {
      let s = '';
      for (let i = 0; i < n; i++){
        const к = i % 5, р = Math.floor(i / 5);
        const м = 0.52 - р * 0.06;
        s += сим('шар', x + 10 + к * 12, y + 15 + р * 10, м, ['#c9433a', '#4a93d0', '#e8c34a'][(i + р) % 3]);
      }
      return s;
    };
    let ящики = '';
    [0, 1, 2, 3].forEach(i => { ящики += короб(30 + i * 62, 138, 56, 26); });
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs>
        <linearGradient id="skSt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d8c39c"/><stop offset="1" stop-color="#b9a07a"/></linearGradient>
        <radialGradient id="skLamp" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#ffe9a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="0" y="0" width="360" height="104" fill="#6f5636"/>
      <!-- дальняя стена уходит к точке схода: полки-направляющие -->
      <path d="M0 44 L180 66 L360 44" stroke="#4f3c22" stroke-width="3" fill="none"/>
      <path d="M0 74 L180 90 L360 74" stroke="#4f3c22" stroke-width="3" fill="none"/>
      <g opacity=".55">
        <path d="M70 52 L92 55 L92 74 L70 70 Z" fill="#5b452a"/>
        <path d="M268 52 L290 55 L290 74 L268 70 Z" fill="#5b452a"/>
        <path d="M120 60 L142 63 L142 82 L120 78 Z" fill="#5b452a"/>
        <path d="M218 60 L240 63 L240 82 L218 78 Z" fill="#5b452a"/>
      </g>
      <rect x="0" y="104" width="360" height="106" fill="url(#skSt)"/>
      <!-- свет лампы: пятно на стене и на столе -->
      <ellipse cx="60" cy="120" rx="120" ry="70" fill="url(#skLamp)"/>
      <!-- стол в перспективе -->
      <path d="M-20 132 L380 132 L360 176 L0 176 Z" fill="#c9a476" stroke="#6f4a24" stroke-width="3"/>
      <path d="M-20 132 L380 132 L378 138 L-18 138 Z" fill="#e0bd8c"/>
      <path d="M0 176 L360 176 L360 210 L0 210 Z" fill="#8a6a44"/>
      <path d="M0 176 L360 176 L360 182 L0 182 Z" fill="#a17c4e"/>
      <!-- светильник на стене -->
      ${сим('лампа',44,120,1.25)}
      <!-- 4 коробки по десять шариков: десятки -->
      ${ящики}
      <!-- по десять шариков в каждой коробке -->
      ${[0, 1, 2, 3].map(i => шарики(30 + i * 62, 138, 56, 10)).join('')}
      <!-- отдельные шарики: единицы (8 штук, лежат вразброс и уходят вглубь) -->
      ${сим('шар',286,168,1.15,'#c9433a')}${сим('шар',312,172,1.15,'#4a93d0')}${сим('шар',338,176,1.15,'#e8c34a')}
      ${сим('шар',296,152,1.05,'#4a93d0')}${сим('шар',322,156,1.05,'#c9433a')}${сим('шар',348,160,1.05,'#e8c34a')}
      ${сим('шар',306,136,0.95,'#e8c34a')}${сим('шар',332,140,0.95,'#4a93d0')}
    </svg>`; }
  function citySVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skCt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bfe3f0"/><stop offset="1" stop-color="#9fd0e8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skCt)"/>
      <g class="c2a-cloud">${сим('облако',42,27,.9)}${сим('облако',261,24,.75)}</g>
      ${сим('солнце',328,43,.85)}
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
      ${сим('кирпич',59,200,1.2)}${сим('кирпич',331,200,1.15)}
    </svg>`; }

  function stageSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skSt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a5ac0"/><stop offset="1" stop-color="#6b3f9e"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="110" fill="url(#skSt)"/>
      ${сим('нота',31,45,.9)}${сим('нота',331,40,.75)}
      ${сим('нота',65,63.5,.6)}${сим('нота',295,69.5,.6)}
      <!-- занавес -->
      <path d="M0 0 Q40 60 0 110 Z" fill="#c0392b"/>
      <path d="M360 0 Q320 60 360 110 Z" fill="#c0392b"/>
      <path d="M360 0 L330 0 Q360 55 330 110 L360 110 Z" fill="#a93226"/>
      <!-- пол сцены -->
      <rect x="0" y="110" width="360" height="40" fill="#8a5a2b"/>
      <path d="M0 110 Q180 100 360 110" stroke="#6e4520" stroke-width="4" fill="none"/>
      <!-- ряды стульев 3 ряда по 4 -->
      <g>
        ${сим('стул',72,144.5,.75)}${сим('стул',112,144.5,.75)}${сим('стул',152,144.5,.75)}${сим('стул',192,144.5,.75)}
        ${сим('стул',72,174.5,.75)}${сим('стул',112,174.5,.75)}${сим('стул',152,174.5,.75)}${сим('стул',192,174.5,.75)}
        ${сим('стул',72,204.5,.75)}${сим('стул',112,204.5,.75)}${сим('стул',152,204.5,.75)}${сим('стул',192,204.5,.75)}
      </g>
      <g>${сим('свиток',260,154,.75)}${сим('скрипка',260,184,.7)}${сим('колокол',296,204,.7)}</g>
    </svg>`; }
  function factorySVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#d8d2c8"/>
      <rect x="0" y="0" width="360" height="70" fill="#a8b4c8"/>
      <rect x="14" y="18" width="60" height="36" rx="4" fill="#7f96b8" stroke="#4a5a78" stroke-width="3"/>
      <rect x="24" y="28" width="18" height="16" fill="#d9e8f5"/>
      <rect x="52" y="28" width="14" height="16" fill="#d9e8f5"/>
      ${сим('кирпич',210,48,1.1,'#8a8a92')}
      <!-- конвейер -->
      <rect x="0" y="120" width="360" height="22" fill="#9aa0a8" stroke="#5f666e" stroke-width="3"/>
      <g class="c2a-coin">
        ${сим('шар',70,142,1.3,'#d9503f')}${сим('шар',120,142,1.3,'#e8c34a')}${сим('шар',170,142,1.3,'#4a93d0')}${сим('шар',220,142,1.3,'#5f9a6a')}${сим('шар',270,142,1.3,'#e8912a')}
      </g>
      <!-- коробки -->
      <g>
        <rect x="30" y="166" width="70" height="26" rx="5" fill="#e8b04c" stroke="#a3762a" stroke-width="3"/>
        <rect x="120" y="166" width="70" height="26" rx="5" fill="#e86a5a" stroke="#a3442f" stroke-width="3"/>
        <rect x="210" y="166" width="70" height="26" rx="5" fill="#5f9a6a" stroke="#3a6b46" stroke-width="3"/>
      </g>
      <rect x="0" y="196" width="360" height="14" fill="#8a8a92"/>
    </svg>`; }
  function tableSVG(){
    /* Тарелки стоят на столешнице (её верх — y=96), а не висят под ней, как
       эмодзи: у нарисованного символа (0,0) — земля под предметом. */
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skTb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffe9c9"/><stop offset="1" stop-color="#f0d3a0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="100" fill="url(#skTb)"/>
      ${сим('шар',53,48,1.6,'#e86a5a')}${сим('шар',313,42,1.6,'#e86a5a')}
      <!-- стол -->
      <rect x="16" y="96" width="328" height="22" rx="6" fill="#c89a6a" stroke="#8a5a2b" stroke-width="3"/>
      <rect x="30" y="118" width="16" height="72" fill="#8a5a2b"/>
      <rect x="314" y="118" width="16" height="72" fill="#8a5a2b"/>
      <!-- тарелки -->
      <g>${сим('тарелка',53,104,0.75)}${сим('тарелка',113,104,0.75)}${сим('тарелка',173,104,0.75)}${сим('тарелка',233,104,0.75)}${сим('тарелка',293,104,0.75)}</g>
      <!-- конфеты на тарелке -->
      <g>${сим('шар',48,101,0.7,'#e86a5a')}${сим('шар',62,101,0.7,'#5f9a6a')}${сим('шар',55,91,0.7,'#e8b04c')}${сим('шар',69,93,0.7,'#c9433a')}</g>
      ${сим('пирог',263,188,0.8)}${сим('пирог',101,190,0.9)}
      <rect x="0" y="190" width="360" height="20" fill="#c89a6a"/>
    </svg>`; }
  function labSVG(){
    /* Колб в библиотеке символов нет: пробирка и реторта заменены ближайшей
       посудой — банкой и чашкой, чашка Петри — тарелкой. */
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#dbe4ee"/>
      <rect x="0" y="0" width="360" height="70" fill="#b8c6da"/>
      ${сим('лампа',22,48,0.8)}
      <!-- доска с примерами -->
      <rect x="30" y="14" width="180" height="78" rx="6" fill="#2f4a3a" stroke="#1f3328" stroke-width="4"/>
      <text x="44" y="44" font-size="18" fill="#e8e0cc">10 + 2 · 3 = ?</text>
      <text x="44" y="68" font-size="18" fill="#e8e0cc">(8 + 4) : 2 = ?</text>
      <!-- стол с посудой -->
      <rect x="240" y="120" width="110" height="14" rx="4" fill="#7f96a8"/>
      <rect x="250" y="120" width="12" height="60" fill="#7f96a8"/>
      <rect x="330" y="120" width="12" height="60" fill="#7f96a8"/>
      <g>${сим('банка',268,120,0.85)}${сим('чашка',304,120,0.75)}${сим('тарелка',338,120,0.6)}</g>
      <!-- пол -->
      <rect x="0" y="180" width="360" height="30" fill="#8fa0b0"/>
      <g>${сим('книга',71,198,1.05,'#d9a441')}${сим('книга',131,198,1.05,'#4a93d0')}</g>
    </svg>`; }

  function hiveSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skHv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bfe3a8"/><stop offset="1" stop-color="#8fc46a"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skHv)"/>
      <g class="c2a-cloud">${сим('облако',30,28,0.76)}${сим('облако',260,32,0.65)}</g>
      ${сим('солнце',314,46,0.95)}
      <g class="c2a-coin">${сим('пчела',82,82,1)}${сим('пчела',222,72,1)}${сим('пчела',152,58,1)}</g>
      <rect x="0" y="120" width="360" height="90" fill="#7fb45c"/>
      <!-- ульи -->
      <g>
        <rect x="40" y="128" width="70" height="46" rx="6" fill="#e8b04c" stroke="#a3762a" stroke-width="3"/>
        <rect x="40" y="150" width="70" height="8" fill="#a3762a"/>
        <rect x="48" y="134" width="18" height="12" rx="3" fill="#7a4f26"/>
        <rect x="140" y="120" width="70" height="46" rx="6" fill="#e8b04c" stroke="#a3762a" stroke-width="3"/>
        <rect x="140" y="142" width="70" height="8" fill="#a3762a"/>
        <rect x="148" y="126" width="18" height="12" rx="3" fill="#7a4f26"/>
      </g>
      <!-- банки мёда -->
      <g>${сим('мёд',261,152,0.8)}${сим('мёд',297,148,0.8)}${сим('мёд',279,180,0.8)}</g>
      <g>${сим('ромашка',122,198,0.9)}${сим('ромашка',232,202,0.9)}${сим('ромашка',62,202,0.9)}</g>
    </svg>`; }
  function librarySVG(){
    /* Книги на полках рисует код: 12 книг в ряд, цвета прежних картинок —
       красный, зелёный, синий, жёлтый. Вместо настенных часов — песочные:
       обычных часов в библиотеке символов нет. */
    const цвКниг=['#c9433a','#5f9a6a','#4a93d0','#d9a441'];
    const полкаКниг=(y,сдвиг)=>Array.from({length:12},(_,i)=>
      сим('книга',40+i*15.5,y,0.9,цвКниг[(i+сдвиг)%4])).join('');
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#c8b490"/>
      ${сим('песочные_часы',31,38,0.75)}
      <!-- стеллажи с книгами -->
      <rect x="24" y="24" width="200" height="150" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="4"/>
      <rect x="24" y="74" width="200" height="8" fill="#5f3a1a"/>
      <rect x="24" y="124" width="200" height="8" fill="#5f3a1a"/>
      <g>
        ${полкаКниг(73,0)}
        ${полкаКниг(123,2)}
        ${полкаКниг(173,1)}
      </g>
      <!-- стопки книг -->
      <g>
        <rect x="260" y="150" width="66" height="12" rx="3" fill="#4a93d0" stroke="#2c5f8a" stroke-width="2"/>
        <rect x="260" y="138" width="66" height="12" rx="3" fill="#e86a5a" stroke="#a3442f" stroke-width="2"/>
        <rect x="260" y="126" width="66" height="12" rx="3" fill="#5f9a6a" stroke="#3a6b46" stroke-width="2"/>
        <rect x="260" y="114" width="66" height="12" rx="3" fill="#e8b04c" stroke="#a3762a" stroke-width="2"/>
      </g>
      <rect x="0" y="176" width="360" height="34" fill="#9c6c3a"/>
      ${сим('колокол',311,202,0.75)}
    </svg>`; }
  function flatSVG(){
    /* Комната перерисована под площадь: ковёр лежит на полу В ПЕРСПЕКТИВЕ и
       расчерчен на квадраты — площадь читается как «сколько квадратов
       поместилось», а не как формула «5 · 2 = 10».
       Пространство: точка схода (180,92), пол — трапеция, ковёр — тоже
       трапеция, линии сетки сходятся к точке схода, дальние квадраты мельче.
       Свет — из окна справа: на ковре световое пятно. */
    /* Линии сетки считаем по кромкам трапеции: раньше они выходили за ковёр
       и висели на полу зелёными штрихами. Кромки: слева 42→26, справа 232→248,
       глубина 112→196. Квадраты выходят мельче вглубь — это и есть перспектива. */
    const лев=(y)=>42-((y-112)/84)*16, прав=(y)=>232+((y-112)/84)*16;
    let сетка='';
    for(let i=1;i<5;i++){
      const y=112+(84/5)*i;
      сетка+=`<path d="M${лев(y).toFixed(1)} ${y.toFixed(1)} L${прав(y).toFixed(1)} ${y.toFixed(1)}" stroke="#3a6b46" stroke-width="1.6" opacity=".6"/>`;
    }
    for(let i=1;i<8;i++){
      const t=i/8, xв=42+(232-42)*t, xн=26+(248-26)*t;
      сетка+=`<path d="M${xв.toFixed(1)} 112 L${xн.toFixed(1)} 196" stroke="#3a6b46" stroke-width="1.6" opacity=".6"/>`;
    }
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs>
        <linearGradient id="flWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#dccb9f"/></linearGradient>
        <linearGradient id="flFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#c8a473"/><stop offset="1" stop-color="#a9834f"/></linearGradient>
        <radialGradient id="flSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stop-color="#fff6d8" stop-opacity=".8"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
      </defs>
      <rect x="0" y="0" width="360" height="92" fill="url(#flWall)"/>
      <!-- окно — источник света кадра -->
      <rect x="238" y="10" width="104" height="66" rx="5" fill="#fff" stroke="#7c5a34" stroke-width="6"/>
      <rect x="246" y="18" width="88" height="50" fill="#cbe9fb"/>
      <circle cx="316" cy="34" r="8" fill="#ffe08a"/>
      <ellipse cx="272" cy="34" rx="12" ry="5" fill="#fff" opacity=".9"/>
      <line x1="290" y1="18" x2="290" y2="68" stroke="#7c5a34" stroke-width="4"/>
      <line x1="246" y1="43" x2="334" y2="43" stroke="#7c5a34" stroke-width="4"/>
      <path d="M238 10 q10 22 0 34 q-4 -6 0 -34 Z" fill="#d97b6c"/>
      <path d="M342 10 q-10 22 0 34 q4 -6 0 -34 Z" fill="#d97b6c"/>
      <rect x="0" y="88" width="360" height="6" fill="#bfa173"/>
      <!-- пол в перспективе -->
      <path d="M0 94 L360 94 L360 210 L0 210 Z" fill="url(#flFloor)"/>
      <ellipse cx="268" cy="140" rx="120" ry="66" fill="url(#flSun)"/>
      <!-- ковёр 5 x 2: трапеция на полу, расчерченная на квадраты -->
      <path d="M26 196 L248 196 L232 112 L42 112 Z" fill="#5f9a6a" stroke="#33603f" stroke-width="4"/>
      ${сетка}
      <path d="M26 196 L248 196 L246 188 L28 188 Z" fill="#7fb45c" opacity=".5"/>
      <path d="M42 112 L232 112 L230 118 L44 118 Z" fill="#7fb45c" opacity=".4"/>
      <!-- образец: один квадратный метр объёмом -->
      <g transform="translate(276,134)">
        <path d="M0 34 L34 34 L34 0 L0 0 Z" fill="#d9a441" stroke="#a3762a" stroke-width="3"/>
        <path d="M0 0 L10 -8 L44 -8 L34 0 Z" fill="#e8b95c" stroke="#a3762a" stroke-width="3"/>
        <path d="M34 0 L44 -8 L44 26 L34 34 Z" fill="#c1912f" stroke="#a3762a" stroke-width="3"/>
      </g>
      <!-- кресло у окна, чтобы комната читалась комнатой -->
      <g transform="translate(296,146)">
        <path d="M0 58 L0 16 C0 6 10 0 20 0 L40 0 C48 0 54 6 54 16 L54 58 Z" fill="#a8503c" stroke="#6e3226" stroke-width="3"/>
        <path d="M54 58 L54 18 C54 10 60 8 66 10 L72 14 L72 58 Z" fill="#8f4433" stroke="#6e3226" stroke-width="3"/>
        <path d="M0 46 L72 46 L72 58 L0 58 Z" fill="#c26a52" stroke="#6e3226" stroke-width="3"/>
      </g>
    </svg>`; }

  function toysSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#f6e3c5"/>
      <rect x="0" y="0" width="360" height="90" fill="#eacfa3"/>
      <g>${сим('шар',36,56,1.5,'#e86a5a')}${сим('мишка',328,50,0.62)}${сим('воздушный_змей',289,62,0.5)}</g>
      <!-- пол -->
      <rect x="0" y="90" width="360" height="120" fill="#c89a6a"/>
      <!-- большой куб 3x3x3 -->
      <g>
        <rect x="60" y="140" width="120" height="50" fill="#4a93d0" stroke="#2c5f8a" stroke-width="3"/>
        <rect x="60" y="122" width="120" height="18" fill="#7fb4d8" stroke="#2c5f8a" stroke-width="3"/>
        <rect x="60" y="104" width="120" height="18" fill="#4a93d0" stroke="#2c5f8a" stroke-width="3"/>
        <rect x="66" y="108" width="14" height="14" fill="#fff" opacity=".5"/>
        <rect x="66" y="126" width="14" height="14" fill="#fff" opacity=".5"/>
        <rect x="66" y="144" width="14" height="14" fill="#fff" opacity=".5"/>
        <rect x="86" y="108" width="14" height="14" fill="#fff" opacity=".5"/>
        <rect x="86" y="126" width="14" height="14" fill="#fff" opacity=".5"/>
      </g>
      <!-- параллелепипед 2x2x5 -->
      <rect x="210" y="160" width="100" height="30" fill="#e8b04c" stroke="#a3762a" stroke-width="3"/>
      <rect x="210" y="130" width="100" height="30" fill="#f2c26a" stroke="#a3762a" stroke-width="3"/>
      <rect x="216" y="136" width="12" height="12" fill="#fff" opacity=".6"/>
      <rect x="216" y="166" width="12" height="12" fill="#fff" opacity=".6"/>
      ${сим('кирпич',171,204,0.8)}
    </svg>`; }

  function clockSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skCl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fd3f0"/><stop offset="1" stop-color="#5fb0d8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skCl)"/>
      <g class="c2a-cloud">${сим('облако',30,32,0.76)}${сим('облако',240,30,0.65)}</g>
      ${сим('солнце',312,46,0.95)}
      <!-- башня -->
      <rect x="96" y="40" width="168" height="170" fill="#e0c39a" stroke="#8a6a44" stroke-width="3"/>
      <polygon points="180,0 96,40 264,40" fill="#a37c4f" stroke="#7c5a34" stroke-width="3"/>
      <!-- циферблат -->
      <circle cx="180" cy="110" r="52" fill="#fffef4" stroke="#33291e" stroke-width="5"/>
      <g font-size="16" text-anchor="middle" font-weight="bold" fill="#33291e">
        <text x="180" y="70">12</text><text x="222" y="115">3</text><text x="180" y="158">6</text><text x="138" y="115">9</text>
      </g>
      <line x1="180" y1="110" x2="180" y2="72" stroke="#33291e" stroke-width="5" stroke-linecap="round"/>
      <line x1="180" y1="110" x2="222" y2="110" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>
      <circle cx="180" cy="110" r="5" fill="#33291e"/>
      <!-- дуга угла -->
      <path d="M195 100 A 24 24 0 0 1 200 122" stroke="#e8b04c" stroke-width="3" fill="none"/>
      <rect x="0" y="180" width="360" height="30" fill="#7fb45c"/>
      <g>${сим('дерево',22,176,0.45)}${сим('дерево',322,176,0.45)}</g>
    </svg>`; }
  function shipSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skSh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fd3f0"/><stop offset="1" stop-color="#4aa8d8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skSh)"/>
      <g class="c2a-cloud">${сим('облако',30,28,0.7)}${сим('облако',270,24,0.6)}</g>
      <g class="c2a-fish">${сим('рыба',48,152,0.85)}${сим('рыба',308,162,0.85)}</g>
      <!-- море -->
      <path d="M0 120 Q60 112 120 120 T240 120 T360 120 L360 150 L0 150 Z" fill="#2f8fc4"/>
      <!-- палуба корабля -->
      <path d="M60 160 L300 160 L282 196 L78 196 Z" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="4"/>
      <rect x="150" y="120" width="60" height="40" fill="#e0c39a" stroke="#8a6a44" stroke-width="3"/>
      <polygon points="150,120 210,120 180,80" fill="#f4e9c8" stroke="#8a6a44" stroke-width="3"/>
      <!-- иллюминатор -->
      <circle cx="96" cy="150" r="26" fill="#fffef4" stroke="#5f3a1a" stroke-width="5"/>
      <circle cx="96" cy="150" r="4" fill="#33291e"/>
      <line x1="96" y1="150" x2="116" y2="136" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>
      <line x1="96" y1="150" x2="70" y2="150" stroke="#33291e" stroke-width="3"/>
      ${сим('ключ',208,178,0.45)}
      <rect x="0" y="196" width="360" height="14" fill="#2f8fc4"/>
    </svg>`; }
  function yardSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skYd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#7fb45c"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skYd)"/>
      ${сим('солнце',302,36,0.95)}
      <!-- дом -->
      <rect x="16" y="70" width="130" height="90" fill="#e8c9a0" stroke="#8a6a44" stroke-width="3"/>
      <polygon points="4,70 81,30 158,70" fill="#c0563f" stroke="#8a3a28" stroke-width="3"/>
      <rect x="60" y="116" width="34" height="44" fill="#8a5a2b"/>
      <rect x="100" y="86" width="28" height="22" fill="#bfe6f7" stroke="#8a6a44" stroke-width="2"/>
      <!-- забор -->
      <rect x="150" y="96" width="12" height="64" fill="#c9a86a" stroke="#8a6a44" stroke-width="2"/>
      <rect x="186" y="96" width="12" height="64" fill="#c9a86a" stroke="#8a6a44" stroke-width="2"/>
      <rect x="222" y="96" width="12" height="64" fill="#c9a86a" stroke="#8a6a44" stroke-width="2"/>
      <rect x="146" y="112" width="92" height="10" fill="#a87c4f"/>
      <rect x="0" y="160" width="360" height="50" fill="#7fb45c"/>
      <!-- шарики в небе -->
      <g class="c2a-coin">
        ${сим('мяч',192,64,1.3,'#d9503f')}${сим('мяч',242,84,1.3,'#4a93d0')}${сим('мяч',262,48,1.3,'#e8b04c')}
        ${сим('мяч',132,94,1.3,'#5f9a6a')}
      </g>
      <g class="c2a-spark">${сим('ромашка',49,182,0.9)}${сим('ромашка',329,187,0.9)}</g>
    </svg>`; }
  function blueprintSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#b8d4c8"/>
      <!-- стол чертёжный -->
      <rect x="10" y="120" width="340" height="14" rx="4" fill="#8a9a6a" stroke="#5f6e4a" stroke-width="3"/>
      <rect x="24" y="134" width="16" height="56" fill="#6a7a50"/>
      <rect x="320" y="134" width="16" height="56" fill="#6a7a50"/>
      <!-- чертёж с рамкой a x b -->
      <rect x="60" y="46" width="140" height="80" rx="4" fill="#fffef4" stroke="#5f8ad0" stroke-width="4"/>
      <rect x="74" y="60" width="112" height="52" fill="none" stroke="#c0563f" stroke-width="3"/>
      <text x="188" y="70" font-size="18" fill="#c0563f" font-weight="bold">b</text>
      <text x="120" y="128" font-size="18" fill="#c0563f" font-weight="bold">a</text>
      <text x="60" y="40" font-size="14" fill="#2c4a7a">P = (a + b) · 2</text>
      <!-- квадрат -->
      <rect x="230" y="70" width="56" height="56" fill="none" stroke="#5f9a6a" stroke-width="4"/>
      <text x="246" y="62" font-size="14" fill="#2c5f3a">5</text>
      <!-- инструменты -->
      ${сим('книга',41,120,1.1,'#d9a441')}${сим('книга',307,120,1.1,'#4a93d0')}${сим('отвёртка',70,180,0.5)}
    </svg>`; }

  function schoolSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skSc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6e3c5"/><stop offset="1" stop-color="#e6cfa0"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="150" fill="url(#skSc)"/>
      <!-- доска -->
      <rect x="24" y="14" width="200" height="96" rx="6" fill="#2f4a3a" stroke="#1f3328" stroke-width="5"/>
      <text x="40" y="50" font-size="22" fill="#f4e9c8">7 + 8 = ?</text>
      
      <rect x="24" y="118" width="200" height="10" fill="#8a5a2b"/>
      ${сим('картина',262,50,0.85)}
      ${сим('планета',311,62,0.9)}
      <!-- парты -->
      <rect x="30" y="160" width="120" height="14" rx="4" fill="#c89a6a" stroke="#8a5a2b" stroke-width="3"/>
      <rect x="46" y="174" width="12" height="30" fill="#8a5a2b"/>
      <rect x="120" y="174" width="12" height="30" fill="#8a5a2b"/>
      <rect x="210" y="160" width="120" height="14" rx="4" fill="#c89a6a" stroke="#8a5a2b" stroke-width="3"/>
      <rect x="226" y="174" width="12" height="30" fill="#8a5a2b"/>
      <rect x="300" y="174" width="12" height="30" fill="#8a5a2b"/>
      <rect x="0" y="196" width="360" height="14" fill="#b3905f"/>
    </svg>`; }
  function iceSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skIc" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d8e8f8"/><stop offset="1" stop-color="#9fc4e8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skIc)"/>
      <g class="c2a-spark">${сим('снежинка',48,34,0.8)}${сим('снежинка',168,24,0.8)}${сим('снежинка',308,38,0.8)}</g>
      <!-- море -->
      <rect x="0" y="120" width="360" height="90" fill="#4a90c8"/>
      <path d="M0 120 Q60 112 120 120 T240 120 T360 120" stroke="#9fd0e8" stroke-width="4" fill="none"/>
      <!-- льдины -->
      <path d="M20 160 L80 146 L140 160 L120 196 L30 196 Z" fill="#e8f2fa" stroke="#a8c8e0" stroke-width="3"/>
      <path d="M170 170 L230 158 L300 174 L284 200 L196 200 Z" fill="#e8f2fa" stroke="#a8c8e0" stroke-width="3"/>
      <!-- пингвины -->
      <g>
        ${сим('пингвин',59,152,0.6)}${сим('пингвин',109,160,0.6)}
        ${сим('пингвин',213,166,0.6)}${сим('пингвин',269,178,0.6)}
      </g>
      ${сим('пингвин',342,142,0.6)}
    </svg>`; }
  function tileSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skTl" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8d2ea"/><stop offset="1" stop-color="#7fb8d8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="110" fill="url(#skTl)"/>
      <g class="c2a-cloud">${сим('облако',30,27,0.7)}${сим('облако',270,29,0.6)}</g>
      ${сим('солнце',320,46,0.95)}
      <!-- земля -->
      <rect x="0" y="110" width="360" height="100" fill="#c89a6a"/>
      <!-- дорожка из плиток БЧБЧБ -->
      <g stroke="#8a6a44" stroke-width="3">
        <rect x="30" y="140" width="56" height="44" fill="#fffef4"/>
        <rect x="88" y="140" width="56" height="44" fill="#4a4a52"/>
        <rect x="146" y="140" width="56" height="44" fill="#fffef4"/>
        <rect x="204" y="140" width="56" height="44" fill="#4a4a52"/>
        <rect x="262" y="140" width="56" height="44" fill="#fffef4"/>
      </g>
      <!-- домино -->
      <rect x="40" y="74" width="46" height="22" rx="6" fill="#d9a441" stroke="#8a5a2b" stroke-width="3" transform="rotate(-12 63 85)"/>
      <line x1="63" y1="78" x2="63" y2="92" stroke="#8a5a2b" stroke-width="2" transform="rotate(-12 63 85)"/>
      ${сим('молоток',100,122,0.55)}
    </svg>`; }

  function scaleSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="210" fill="#f0dcc0"/>
      <rect x="0" y="0" width="360" height="90" fill="#e0c8a0"/>
      ${сим('клубок',37,58,0.7,'#4a93d0')}
      <!-- весы -->
      <line x1="180" y1="60" x2="180" y2="120" stroke="#33291e" stroke-width="5"/>
      <rect x="168" y="112" width="24" height="26" rx="4" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="3"/>
      <line x1="108" y1="80" x2="252" y2="80" stroke="#33291e" stroke-width="5"/>
      <line x1="108" y1="80" x2="108" y2="118" stroke="#33291e" stroke-width="4"/>
      <line x1="252" y1="80" x2="252" y2="118" stroke="#33291e" stroke-width="4"/>
      <g>
        ${сим('клубок',101,142,1.1,'#c96a8a')}${сим('клубок',249,142,1.1,'#5aa9d6')}
      </g>
      ${сим('клубок',178,142,1.0,'#7fb45c')}
      <!-- посуда с водой -->
      <rect x="280" y="120" width="44" height="34" rx="5" fill="#7fc4a6" stroke="#2c5f4a" stroke-width="3"/>
      <rect x="284" y="126" width="36" height="12" fill="#bfe6d8"/>
      <rect x="44" y="128" width="34" height="26" rx="4" fill="#4a93d0" stroke="#2c5f8a" stroke-width="3"/>
      <rect x="0" y="170" width="360" height="40" fill="#c89a6a"/>
    </svg>`; }
  function sandboxSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skSb" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#7fb45c"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="120" fill="url(#skSb)"/>
      <g class="c2a-cloud">${сим('облако',30,28,0.7)}${сим('облако',260,32,0.6)}</g>
      ${сим('солнце',314,44,0.95)}
      <!-- песочница -->
      <rect x="40" y="104" width="280" height="76" rx="10" fill="#d9b878" stroke="#8a5a2b" stroke-width="5"/>
      <rect x="40" y="96" width="280" height="12" rx="6" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="3"/>
      <!-- две кучки -->
      <path d="M110 176 Q100 140 130 136 Q158 140 152 176 Z" fill="#e8cf94"/>
      <path d="M230 176 Q220 140 250 136 Q278 140 272 176 Z" fill="#e8cf94"/>
      <g>
        ${сим('замок_песка',128,142,0.45)}${сим('замок_песка',152,142,0.45)}
        ${сим('замок_песка',248,142,0.45)}${сим('замок_песка',272,142,0.45)}
      </g>
      <g>${сим('корзина',70,162,0.6)}${сим('мяч',310,170,1.0,'#5f9a6a')}</g>
      <rect x="0" y="180" width="360" height="30" fill="#7fb45c"/>
    </svg>`; }
  function roadSVG(){
    return `<svg viewBox="0 0 360 210" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <defs><linearGradient id="skRd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#a8dcf0"/><stop offset="1" stop-color="#8fc9e8"/></linearGradient></defs>
      <rect x="0" y="0" width="360" height="100" fill="url(#skRd)"/>
      <g class="c2a-cloud">${сим('облако',30,27,0.7)}${сим('облако',250,24,0.6)}</g>
      ${сим('солнце',316,42,0.95)}
      <!-- даль -->
      <rect x="0" y="100" width="360" height="40" fill="#7fb45c"/>
      <!-- дорога -->
      <polygon points="0,196 360,196 250,140 110,140" fill="#8a8a92"/>
      <polygon points="0,210 360,210 330,196 30,196" fill="#7a7a82"/>
      <g stroke="#f4e9c8" stroke-width="4">
        <line x1="40" y1="196" x2="150" y2="150"/>
        <line x1="200" y1="196" x2="240" y2="162"/>
      </g>
      <!-- километровые столбы -->
      <rect x="90" y="116" width="8" height="28" fill="#8a5a2b"/>
      <rect x="84" y="112" width="20" height="10" rx="3" fill="#fffef4" stroke="#8a5a2b" stroke-width="2"/>
      <rect x="300" y="150" width="8" height="26" fill="#8a5a2b"/>
      <rect x="294" y="146" width="20" height="10" rx="3" fill="#fffef4" stroke="#8a5a2b" stroke-width="2"/>
      <g>${сим('велосипед',143,172,1.4)}</g>
      <g>${сим('дерево',282,152,0.5)}</g>
    </svg>`; }

  function boardFrame(title, lines){
    let body='';
    lines.forEach((ln,i)=>{ body+=`<text x="60" y="${74+i*46}" font-size="30" font-weight="bold" fill="#f4e9c8">${ln}</text>`; });
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" rx="10" fill="#1e3a2f"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <rect x="0" y="226" width="360" height="14" fill="#2c543f"/>
      <text x="40" y="52" font-size="26" font-weight="bold" fill="#ffd76a">${escHtml(title)}</text>
      ${body}
    </svg>`; }
  function div39SVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e3a2f"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <text x="40" y="52" font-size="26" font-weight="bold" fill="#ffd76a">Сумма цифр — главный признак</text>
      <text x="46" y="96" font-size="34" fill="#f4e9c8">7</text><text x="86" y="96" font-size="34" fill="#7fd1ff">2</text>
      <text x="126" y="96" font-size="34" fill="#f4e9c8">3</text><text x="166" y="96" font-size="34" fill="#7fd1ff">6</text>
      <text x="196" y="96" font-size="26" fill="#9fc0e8">→ сумма</text>
      <rect x="296" y="62" width="44" height="34" rx="8" fill="#d9a441"/>
      <text x="318" y="86" text-anchor="middle" font-size="22" font-weight="bold" fill="#33291e">18</text>
      <text x="40" y="138" font-size="24" fill="#b6e0bd">18 делится на 9 → число делится на 9</text>
      <text x="40" y="172" font-size="24" fill="#b6e0bd">и на 3 (9 кратно 3)</text>
      <text x="40" y="212" font-size="20" fill="#9fc0e8">7236 : 9 = 804 ✔</text>
    </svg>`; }
  function sieveSVG(){
    const P=new Set([2,3,5,7,11,13,17,19,23,29]);
    let cells='';
    const x0=24, y0=56, cw=52, ch=34;
    for(let n=1;n<=30;n++){
      const col=(n-1)%6, row=Math.floor((n-1)/6);
      const x=x0+col*cw, y=y0+row*ch;
      if(P.has(n)){
        cells+=`<rect x="${x-8}" y="${y-6}" width="${cw-10}" height="${ch-8}" rx="8" fill="rgba(217,164,65,.25)" stroke="#d9a441" stroke-width="3"/>`;
        cells+=`<text x="${x+9}" y="${y+19}" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffd76a">${n}</text>`;
      } else if(n===1){
        cells+=`<text x="${x+9}" y="${y+19}" text-anchor="middle" font-size="18" fill="#8fa08f">1</text>`;
      } else {
        cells+=`<text x="${x+9}" y="${y+19}" text-anchor="middle" font-size="18" fill="#7a8f86">${n}</text>`;
        cells+=`<line x1="${x-4}" y1="${y+2}" x2="${x+20}" y2="${y+28}" stroke="#e86a5a" stroke-width="2.5" opacity=".85"/>`;
      }
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <text x="24" y="38" font-size="20" font-weight="bold" fill="#ffd76a">Решето Эратосфена: числа 1–30</text>
      ${cells}
      <text x="24" y="228" font-size="15" fill="#8fa08f">золото — простые · серое зачёркнутое — составные</text>
    </svg>`; }

  function euclidSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e3a2f"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <text x="30" y="46" font-size="22" font-weight="bold" fill="#ffd76a">НОД(48; 30) — алгоритм Евклида</text>
      <g font-size="20" fill="#f4e9c8" font-family="Georgia,serif">
        <text x="30" y="78">48 = 30·1 + 18</text>
        <text x="30" y="106">30 = 18·1 + 12</text>
        <text x="30" y="134">18 = 12·1 + 6</text>
        <text x="30" y="162">12 = 6·2 + 0</text>
      </g>
      <rect x="30" y="176" width="150" height="36" rx="18" fill="#d9a441"/>
      <text x="105" y="201" text-anchor="middle" font-size="22" font-weight="bold" fill="#33291e">НОД = 6</text>
      <text x="210" y="96" font-size="18" fill="#7fd1ff">делим,</text>
      <text x="210" y="122" font-size="18" fill="#7fd1ff">пока остаток</text>
      <text x="210" y="148" font-size="18" fill="#7fd1ff">не станет 0</text>
    </svg>`; }
  function coordSVG(){
    let grid='';
    for(let i=-6;i<=6;i++){ grid+=`<line x1="${180+i*26}" y1="20" x2="${180+i*26}" y2="220" stroke="rgba(255,255,255,.08)"/>`;
      grid+=`<line x1="20" y1="${120-i*26}" x2="340" y2="${120-i*26}" stroke="rgba(255,255,255,.08)"/>`; }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#17253d"/>
      ${grid}
      <line x1="20" y1="120" x2="340" y2="120" stroke="#f4e9c8" stroke-width="3"/>
      <line x1="180" y1="20" x2="180" y2="220" stroke="#f4e9c8" stroke-width="3"/>
      <polygon points="340,120 332,114 332,126" fill="#f4e9c8"/>
      <polygon points="180,20 174,28 186,28" fill="#f4e9c8"/>
      <text x="330" y="138" font-size="18" fill="#9fc0e8">x</text>
      <text x="164" y="30" font-size="18" fill="#9fc0e8">y</text>
      <g font-size="13" fill="#8fa7c8">
        <text x="175" y="132">0</text><text x="198" y="132">1</text><text x="224" y="132">2</text><text x="250" y="132">3</text>
        <text x="156" y="132">−1</text><text x="130" y="132">−2</text><text x="104" y="132">−3</text>
      </g>
      <circle cx="258" cy="68" r="7" fill="#7fd1ff"/><text x="266" y="62" font-size="15" fill="#7fd1ff">(3; 2)</text>
      <circle cx="102" cy="68" r="7" fill="#ffd76a"/><text x="44" y="62" font-size="15" fill="#ffd76a">(−3; 2)</text>
    </svg>`; }
  function symSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#2a1f4a"/>
      <text x="30" y="40" font-size="20" font-weight="bold" fill="#ffd76a">Осевая симметрия (зеркало)</text>
      <line x1="180" y1="54" x2="180" y2="118" stroke="#7fd1ff" stroke-width="3" stroke-dasharray="8 5"/>
      <polygon points="120,96 150,62 158,106" fill="#5f9a6a" stroke="#8fd1a8" stroke-width="3"/>
      <polygon points="240,96 210,62 202,106" fill="#5f9a6a" stroke="#8fd1a8" stroke-width="3"/>
      <text x="60" y="132" font-size="15" fill="#8fa7c8">Δ</text><text x="276" y="132" font-size="15" fill="#8fa7c8">Δ</text>
      <text x="30" y="160" font-size="20" font-weight="bold" fill="#ffd76a">Центральная симметрия (180°)</text>
      <circle cx="180" cy="190" r="5" fill="#e86a5a"/>
      <polygon points="140,216 170,178 178,214" fill="#7fc4a6" stroke="#a8e0c8" stroke-width="3"/>
      <polygon points="220,164 190,202 182,166" fill="#7fc4a6" stroke="#a8e0c8" stroke-width="3"/>
      <line x1="150" y1="196" x2="210" y2="184" stroke="#e86a5a" stroke-width="2" stroke-dasharray="5 4"/>
    </svg>`; }

  function probSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <text x="26" y="38" font-size="21" font-weight="bold" fill="#ffd76a">Вероятность = благоприятные : все</text>
      <!-- мешок -->
      <path d="M40 150 Q60 110 120 108 Q180 110 190 150 Q170 196 115 196 Q60 196 40 150 Z" fill="#8a5a2b" stroke="#5f3a1a" stroke-width="4"/>
      ${сим('шар',87,154,1.70,'#c9433a')}${сим('шар',129,144,1.70,'#3f7fd0')}${сим('шар',135,170,1.70,'#c9433a')}${сим('шар',167,150,1.70,'#3f7fd0')}${сим('шар',173,176,1.70,'#3f7fd0')}
      <text x="46" y="216" font-size="18" fill="#8fa08f">2 красных + 3 синих = 5</text>
      <!-- диаграмма -->
      <rect x="240" y="120" width="34" height="56" fill="#e86a5a"/>
      <rect x="292" y="96" width="34" height="80" fill="#4a93d0"/>
      <text x="250" y="196" font-size="15" fill="#ffcfc2">2</text>
      <text x="302" y="196" font-size="15" fill="#c4e6ff">3</text>
      <text x="240" y="92" font-size="15" fill="#9fc0e8">диаграмма</text>
    </svg>`; }
  function estSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="30" y="46" font-size="21" font-weight="bold" fill="#ffd76a">Оценка + пример</text>
      <g font-size="24" fill="#f4e9c8">
        <text x="30" y="84">38 + 39 + 40 ≈ 40·3 = 120</text>
        <text x="30" y="114">точная сумма = 39·3 = 117</text>
      </g>
      <g font-size="20" fill="#7fd1ff">
        <text x="30" y="152">наименьшее с суммой цифр 10:</text>
        <text x="30" y="180">19 → 1 + 9 = 10</text>
      </g>
      <rect x="30" y="196" width="210" height="26" rx="13" fill="rgba(127,209,255,.18)" stroke="#7fd1ff" stroke-width="2"/>
      <text x="135" y="215" text-anchor="middle" font-size="17" fill="#c4e6ff">(50 + 10) : 2 = 30 — большее</text>
    </svg>`; }
  function avgSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#16251c"/>
      <text x="26" y="40" font-size="21" font-weight="bold" fill="#ffd76a">Средняя скорость = путь : время</text>
      <!-- участки -->
      <rect x="30" y="70" width="130" height="44" fill="#5f9a6a" stroke="#8fd1a8" stroke-width="3"/>
      <text x="95" y="84" text-anchor="middle" font-size="15" fill="#eafff0">40 км/ч · 2 ч</text>
      <text x="95" y="106" text-anchor="middle" font-size="17" fill="#eafff0">= 80 км</text>
      <rect x="160" y="70" width="170" height="44" fill="#4a93d0" stroke="#9fd0e8" stroke-width="3"/>
      <text x="245" y="84" text-anchor="middle" font-size="15" fill="#e6f4ff">70 км/ч · 1 ч</text>
      <text x="245" y="106" text-anchor="middle" font-size="17" fill="#e6f4ff">= 70 км</text>
      <text x="95" y="140" text-anchor="middle" font-size="18" fill="#f4e9c8">путь 150 км</text>
      <text x="245" y="140" text-anchor="middle" font-size="18" fill="#f4e9c8">время 3 ч</text>
      <rect x="90" y="158" width="180" height="44" rx="22" fill="#d9a441"/>
      <text x="180" y="187" text-anchor="middle" font-size="22" font-weight="bold" fill="#33291e">150 : 3 = 50 км/ч</text>
      <text x="180" y="222" text-anchor="middle" font-size="15" fill="#e86a5a">(40+70):2 = 55 — неверно!</text>
    </svg>`; }

  function pourSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#16243a"/>
      <text x="26" y="40" font-size="21" font-weight="bold" fill="#ffd76a">Ведро 7 л и банка 3 л → 1 л</text>
      <!-- ведро 7 л -->
      <rect x="60" y="70" width="100" height="120" rx="8" fill="none" stroke="#7fd1ff" stroke-width="4"/>
      <rect x="62" y="106" width="96" height="82" fill="rgba(127,209,255,.25)"/>
      <text x="110" y="176" text-anchor="middle" font-size="16" fill="#c4e6ff">7 л</text>
      <!-- банка 3 л -->
      <rect x="220" y="120" width="70" height="70" rx="6" fill="none" stroke="#ffd76a" stroke-width="4"/>
      <rect x="222" y="150" width="66" height="38" fill="rgba(255,215,106,.25)"/>
      <text x="255" y="180" text-anchor="middle" font-size="15" fill="#ffe9b0">3 л</text>
      <text x="110" y="230" text-anchor="middle" font-size="18" fill="#f4e9c8">7 − 3 − 3 = 1</text>
    </svg>`; }
  function divmodSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="30" y="48" font-size="21" font-weight="bold" fill="#ffd76a">48 : 5 — деление с остатком</text>
      <text x="60" y="96" font-size="40" fill="#f4e9c8">48 = 9·5 + 3</text>
      <text x="60" y="136" font-size="26" fill="#7fd1ff">частное 9 · остаток 3</text>
      <rect x="30" y="156" width="300" height="50" rx="12" fill="rgba(232,106,90,.14)" stroke="#e86a5a" stroke-width="3"/>
      <text x="180" y="189" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffcfc2">остаток всегда меньше делителя!</text>
    </svg>`; }
  function pctSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#231a10"/>
      <text x="26" y="40" font-size="21" font-weight="bold" fill="#ffd76a">Проценты — от разных чисел</text>
      <rect x="30" y="64" width="80" height="44" rx="8" fill="#4a93d0" stroke="#9fd0e8" stroke-width="3"/>
      <text x="70" y="92" text-anchor="middle" font-size="22" fill="#fff">100</text>
      <text x="122" y="92" font-size="24" fill="#8fd1a8">+10% →</text>
      <rect x="182" y="64" width="80" height="44" rx="8" fill="#5f9a6a" stroke="#8fd1a8" stroke-width="3"/>
      <text x="222" y="92" text-anchor="middle" font-size="22" fill="#fff">110</text>
      <text x="274" y="92" font-size="24" fill="#ffcfc2">−10% →</text>
      <rect x="38" y="122" width="80" height="44" rx="8" fill="#e86a5a" stroke="#ffcfc2" stroke-width="3"/>
      <text x="78" y="150" text-anchor="middle" font-size="22" fill="#fff">99</text>
      <text x="140" y="150" font-size="20" fill="#ffcfc2">99 < 100 !</text>
      <text x="40" y="200" font-size="18" fill="#f4e9c8">скидка 20% от 200 = 40 → 160</text>
      <text x="40" y="226" font-size="18" fill="#8fd1a8">+50% = ×1,5</text>
    </svg>`; }

  function cutSVG(){
    let grid='', sq='';
    for(let r=0;r<4;r++){ for(let c=0;c<6;c++){ grid+=`<rect x="${40+c*34}" y="${60+r*34}" width="34" height="34" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="2"/>`; } }
    for(let r=0;r<2;r++){ for(let c=0;c<3;c++){ sq+=`<rect x="${40+c*68}" y="${60+r*68}" width="68" height="68" fill="rgba(127,209,255,.12)" stroke="#7fd1ff" stroke-width="3"/>`; } }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#16251c"/>
      <text x="26" y="38" font-size="21" font-weight="bold" fill="#ffd76a">Разрезания и площади</text>
      ${grid}${sq}
      <text x="245" y="70" font-size="18" fill="#f4e9c8">6 · 4 = 24 клетки</text>
      <text x="245" y="98" font-size="18" fill="#7fd1ff">24 : 4 = 6 квадратов 2×2</text>
      <text x="245" y="140" font-size="18" fill="#8fd1a8">3 полоски по 5 = 15</text>
      <text x="245" y="168" font-size="18" fill="#8fd1a8">квадрат 5×5 = 25 клеток</text>
    </svg>`; }
  function triSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <text x="26" y="40" font-size="21" font-weight="bold" fill="#ffd76a">Углы треугольника: сумма 180°</text>
      <polygon points="180,44 66,196 294,196" fill="rgba(127,209,255,.16)" stroke="#7fd1ff" stroke-width="4"/>
      <text x="180" y="60" text-anchor="middle" font-size="18" fill="#ffd76a">40°</text>
      <text x="84" y="188" text-anchor="middle" font-size="17" fill="#8fd1a8">70°</text>
      <text x="276" y="188" text-anchor="middle" font-size="17" fill="#8fd1a8">70°</text>
      <path d="M180 44 L120 62 A 44 44 0 0 1 154 38 Z" fill="rgba(255,215,106,.35)"/>
      <text x="120" y="176" font-size="26" fill="#f4e9c8">40 + 70 + 70 = 180</text>
      <text x="60" y="214" font-size="17" fill="#9fc0e8">у равнобедренного углы при основании равны</text>
    </svg>`; }
  function prodSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#231a10"/>
      <text x="26" y="38" font-size="21" font-weight="bold" fill="#ffd76a">Правило произведения: умножаем</text>
      <circle cx="180" cy="56" r="16" fill="#e86a5a"/>
      <text x="180" y="62" text-anchor="middle" font-size="14" font-weight="bold" fill="#fff">×</text>
      <g stroke="#d9a441" stroke-width="3">
        <line x1="172" y1="70" x2="80" y2="120"/><line x1="180" y1="70" x2="180" y2="120"/><line x1="188" y1="70" x2="280" y2="120"/>
        <line x1="80" y1="130" x2="50" y2="176"/><line x1="80" y1="130" x2="110" y2="176"/>
        <line x1="180" y1="130" x2="160" y2="176"/><line x1="180" y1="130" x2="200" y2="176"/>
        <line x1="280" y1="130" x2="250" y2="176"/><line x1="280" y1="130" x2="310" y2="176"/>
      </g>
      ${сим('ткань',78,134,0.80,'#7fc3e0')}${сим('ткань',180,134,0.80,'#7fc3e0')}${сим('ткань',280,134,0.80,'#7fc3e0')}${сим('ткань',58,118,0.80,'#f0f0f4')}${сим('ткань',300,118,0.80,'#f0f0f4')}
      ${сим('ткань',44,196,0.75,'#f0f0f4')}${сим('ткань',104,196,0.75,'#f0f0f4')}${сим('ткань',154,196,0.75,'#f0f0f4')}${сим('ткань',194,196,0.75,'#f0f0f4')}${сим('ткань',246,196,0.75,'#f0f0f4')}${сим('ткань',304,196,0.75,'#f0f0f4')}
      <text x="180" y="222" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffd76a">4 · 3 = 12 комплектов</text>
    </svg>`; }

  function game20SVG(){
    let row='';
    for(let g=0;g<5;g++){ for(let k=0;k<4;k++){ const x=40+g*60+k*13, y=104; row+=`<circle cx="${x}" cy="${y}" r="5" fill="#ffd76a"/>`; } }
    let groups='';
    for(let g=0;g<5;g++){ groups+=`<rect x="${30+g*60}" y="88" width="60" height="34" fill="none" stroke="rgba(255,215,106,.4)" stroke-width="2" rx="8"/>`; }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2433"/>
      <text x="26" y="42" font-size="21" font-weight="bold" fill="#ffd76a">Игра «дополняй до 4»</text>
      ${groups}${row}
      <text x="180" y="158" text-anchor="middle" font-size="19" fill="#f4e9c8">20 = 4 + 4 + 4 + 4 + 4</text>
      <text x="180" y="188" text-anchor="middle" font-size="19" fill="#7fd1ff">каждая четвёрка — ловушка</text>
      <text x="180" y="222" text-anchor="middle" font-size="19" font-weight="bold" fill="#8fd1a8">второй дополняет до 4 → выигрывает</text>
    </svg>`; }
  function eulerSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <text x="24" y="38" font-size="20" font-weight="bold" fill="#ffd76a">Одним росчерком?</text>
      <!-- квадрат с диагональю -->
      <g stroke="#8fd1a8" stroke-width="4">
        <rect x="40" y="66" width="96" height="96" fill="rgba(143,209,168,.1)"/>
        <line x1="40" y1="66" x2="136" y2="162"/>
      </g>
      <circle cx="40" cy="66" r="7" fill="#e86a5a"/><circle cx="136" cy="66" r="7" fill="#ffd76a"/>
      <circle cx="40" cy="162" r="7" fill="#ffd76a"/><circle cx="136" cy="162" r="7" fill="#e86a5a"/>
      <text x="88" y="196" text-anchor="middle" font-size="16" fill="#8fd1a8">можно: 2 нечётные</text>
      <!-- плюс -->
      <g stroke="#e86a5a" stroke-width="4">
        <line x1="240" y1="114" x2="320" y2="114"/>
        <line x1="280" y1="66" x2="280" y2="162"/>
      </g>
      <circle cx="240" cy="114" r="7" fill="#ffd76a"/><circle cx="320" cy="114" r="7" fill="#ffd76a"/>
      <circle cx="280" cy="66" r="7" fill="#ffd76a"/><circle cx="280" cy="162" r="7" fill="#ffd76a"/>
      <text x="280" y="196" text-anchor="middle" font-size="16" fill="#ffcfc2">нельзя: 4 нечётные</text>
    </svg>`; }
  function pickSVG(){
    const dots=[];
    for(let r=0;r<7;r++){ for(let c=0;c<7;c++){ const inL=(c>=1&&c<=5&&r>=1&&r<=5);
      dots.push(`<circle cx="${40+c*40}" cy="${40+r*28}" r="3.4" fill="${inL?'#7fd1ff':'#5f6a75'}"/>`); } }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1a1f2e"/>
      <text x="24" y="34" font-size="20" font-weight="bold" fill="#ffd76a">Формула Пика: S = В + Г/2 − 1</text>
      ${dots.join('')}
      <polygon points="120,40 200,40 240,96 200,180 120,180 80,96" fill="rgba(127,209,255,.18)" stroke="#7fd1ff" stroke-width="3"/>
      <text x="180" y="232" text-anchor="middle" font-size="18" fill="#f4e9c8">В = 5, Г = 4 → S = 5 + 2 − 1 = 6</text>
    </svg>`; }

  function div10SVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="10" y="10" width="340" height="220" rx="8" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="30" y="48" font-size="21" font-weight="bold" fill="#ffd76a">Делимость — по записи числа</text>
      <text x="60" y="92" font-size="36" fill="#f4e9c8">12<span fill="#7fd1ff">4</span></text>
      <text x="110" y="92" font-size="24" fill="#9fc0e8">→ 24 ⋮ 4 → число ⋮ 4</text>
      <text x="60" y="136" font-size="24" fill="#7fd1ff">НОК(6; 8) = 24</text>
      <text x="60" y="172" font-size="24" fill="#8fd1a8">кратное 7: 14 = 7·2</text>
      <text x="60" y="206" font-size="17" fill="#9fc0e8">на 2, 5, 10 — последняя цифра · на 3, 9 — сумма цифр</text>
    </svg>`; }
  function combSVG(){
    const F=['яблоко','яблоко','виноград','яблоко']; let els='';
    F.forEach((f,i)=>{ const x=60+i*66; els+=`<text x="${x}" y="90" font-size="40">${f}</text>`; });
    const lines=['0,1','0,2','0,3','1,2','1,3','2,3'];
    const coords={0:[60,100],1:[126,100],2:[192,100],3:[258,100]};
    let ls='';
    lines.forEach((p)=>{ const a=p.split(','); ls+=`<line x1="${coords[a[0]][0]}" y1="${coords[a[0]][1]}" x2="${coords[a[1]][0]}" y2="${coords[a[1]][1]}" stroke="#d9a441" stroke-width="3" opacity=".8"/>`; });
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#231a10"/>
      <text x="24" y="38" font-size="21" font-weight="bold" fill="#ffd76a">Сочетания: пары из 4</text>
      ${els}${ls}
      <text x="180" y="180" text-anchor="middle" font-size="24" fill="#f4e9c8">6 пар</text>
      <text x="180" y="212" text-anchor="middle" font-size="18" fill="#8fd1a8">формула: n·(n−1)/2 = 4·3/2</text>
    </svg>`; }
  function dirSVG(){
    let boxes='';
    for(let i=0;i<9;i++){ const x=24+i*36; boxes+=`<rect x="${x}" y="96" width="30" height="40" rx="5" fill="none" stroke="#7fd1ff" stroke-width="2.5"/>`; }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <text x="24" y="38" font-size="21" font-weight="bold" fill="#ffd76a">Усиленный Дирихле</text>
      ${boxes}
      <text x="180" y="82" text-anchor="middle" font-size="17" fill="#8fa08f">100 шаров в 9 коробок</text>
      <text x="180" y="166" text-anchor="middle" font-size="22" fill="#ffd76a">100 = 9·11 + 1</text>
      <text x="180" y="200" text-anchor="middle" font-size="20" fill="#8fd1a8">есть коробка минимум с 12</text>
    </svg>`; }

  function dominoSVG(){
    let cells='';
    for(let r=0;r<8;r++){ for(let c=0;c<8;c++){ const black=(r+c)%2===1;
      const cut=(r===0&&c===0)||(r===0&&c===7);
      const x=24+c*30, y=44+r*30;
      if(cut){ cells+=`<rect x="${x}" y="${y}" width="30" height="30" fill="#14241c" stroke="#e86a5a" stroke-width="3"/>`; }
      else { cells+=`<rect x="${x}" y="${y}" width="30" height="30" fill="${black?'#4a4a55':'#e8e0cc'}"/>`; } } }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#16251c"/>
      <text x="24" y="30" font-size="18" font-weight="bold" fill="#ffd76a">Доска 8×8, два белых угла убраны</text>
      ${cells}
      <rect x="270" y="60" width="40" height="14" fill="#e8e0cc"/><text x="272" y="48" font-size="13" fill="#e8e0cc">белых 30</text>
      <rect x="270" y="96" width="40" height="14" fill="#4a4a55"/><text x="272" y="84" font-size="13" fill="#9fc0e8">чёрных 32</text>
      <text x="270" y="130" font-size="13" fill="#ffcfc2">домино:</text>
      <text x="270" y="148" font-size="13" fill="#ffcfc2">1 белая + 1 чёрная</text>
      <text x="270" y="178" font-size="14" fill="#ffd76a">30 ≠ 32</text>
    </svg>`; }
  function invSVG(){
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2433"/>
      <text x="24" y="40" font-size="21" font-weight="bold" fill="#ffd76a">Полуинвариант: чётность суммы</text>
      <g font-size="40" fill="#f4e9c8">
        <text x="40" y="100">1</text><text x="100" y="100">2</text><text x="160" y="100">3</text><text x="220" y="100">4</text>
      </g>
      <text x="280" y="100" font-size="26" fill="#9fc0e8">→ a − b</text>
      <text x="40" y="146" font-size="20" fill="#8fd1a8">сумма = 10 — чётная</text>
      <text x="40" y="178" font-size="20" fill="#7fd1ff">a + b и a − b одной чётности</text>
      <text x="40" y="214" font-size="22" font-weight="bold" fill="#ffd76a">итоговое число — чётное</text>
    </svg>`; }

  /* ================= ВОЛНА C · класс 7 (доска меняется по кадрам fr.v) ================= */
  function chipCard(x,y,txt,fill,edge,fs){
    const w=64+(txt.length)*13;
    return `<rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="${fill}" stroke="${edge}" stroke-width="3"/>
      <text x="${x+w/2}" y="${y+37}" text-anchor="middle" font-size="${fs||26}" font-weight="bold" fill="#fff" font-family="Georgia,serif">${txt}</text>`;
  }
  function polySVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="17" fill="#b6e0bd">одночлены — «коробочки»: число · буквы</text>
        ${chipCard(28,96,'3x','#4a93d0','#7fb8f0')}${chipCard(124,96,'5x²','#5f9a6a','#8fd1a8')}${chipCard(236,96,'−2ab','#c98a3a','#e8b25c',23)}
        <text x="180" y="196" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffd76a">2x + 3x² − 1 — многочлен</text>
        <text x="180" y="224" text-anchor="middle" font-size="15" fill="#8fa08f">сумма одночленов · каждый член — коробочка</text>`;
    } else if(v===1){
      m=`<text x="180" y="74" text-anchor="middle" font-size="17" fill="#b6e0bd">подобные — одинаковые буквы</text>
        ${chipCard(40,92,'3x','#5f9a6a','#8fd1a8')}<text x="142" y="126" font-size="30" fill="#ffd76a">+</text>${chipCard(158,92,'5x','#5f9a6a','#8fd1a8')}
        <text x="180" y="196" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffd76a">3x и 5x — подобные ✔</text>
        <text x="180" y="222" text-anchor="middle" font-size="16" fill="#8fa08f">а 3x и 3x² — НЕТ (x ≠ x²)</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="17" fill="#b6e0bd">берём коробки с x: 3 штуки + 5 штук</text>
        <text x="180" y="140" text-anchor="middle" font-size="40" font-weight="bold" fill="#f4e9c8">3x + 5x = 8x</text>
        <rect x="64" y="168" width="232" height="40" rx="20" fill="rgba(217,164,65,.22)" stroke="#d9a441" stroke-width="3"/>
        <text x="180" y="196" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffd76a">числа: 3+5=8 · букву x не трогай!</text>`;
    } else if(v===3){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#ffb0a0">минус перед скобкой меняет знаки</text>
        <text x="180" y="128" text-anchor="middle" font-size="34" font-weight="bold" fill="#f4e9c8">−(2x + 3) = −2x − 3</text>
        <text x="180" y="170" text-anchor="middle" font-size="20" fill="#8fd1a8">+2x → −2x</text>
        <text x="180" y="196" text-anchor="middle" font-size="20" fill="#8fd1a8">+3 → −3</text>
        <text x="180" y="224" text-anchor="middle" font-size="15" fill="#8fa08f">как вычесть всю пачку коробок целиком</text>`;
    } else if(v===4){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6e0bd">умножаем на каждый член скобки</text>
        <text x="180" y="128" text-anchor="middle" font-size="30" font-weight="bold" fill="#f4e9c8">2x · (x + 3)</text>
        <text x="180" y="168" text-anchor="middle" font-size="26" fill="#7fd1ff">2x·x = 2x²</text>
        <text x="180" y="196" text-anchor="middle" font-size="26" fill="#8fd1a8">2x·3 = 6x</text>
        <rect x="86" y="120" width="188" height="92" rx="12" fill="none" stroke="#d9a441" stroke-width="3" opacity=".5"/>
        <text x="180" y="228" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">итог: 2x² + 6x</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="17" fill="#b6e0bd">каждый с каждым — четыре произведения</text>
        <g font-size="22" fill="#f4e9c8" font-family="Georgia,serif">
          <text x="42" y="112">x·x = x²</text><text x="198" y="112">x·2 = 2x</text>
          <text x="42" y="146">1·x = x</text><text x="198" y="146">1·2 = 2</text>
        </g>
        <text x="180" y="184" text-anchor="middle" font-size="17" fill="#9fc0e8">(x + 1) · (x + 2) — каждый с каждым!</text>
        <rect x="34" y="196" width="292" height="30" rx="15" fill="rgba(79,141,255,.25)"/>
        <text x="180" y="218" text-anchor="middle" font-size="19" fill="#7fd1ff">сложили 4 кусочка → x² + 2x + x + 2</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6e0bd">2x и x — подобные! складываем</text>
        <text x="180" y="136" text-anchor="middle" font-size="38" font-weight="bold" fill="#f4e9c8">x² + 3x + 2</text>
        <text x="180" y="178" text-anchor="middle" font-size="20" fill="#8fd1a8">2x + x = 3x — привели подобные</text>
        <text x="180" y="220" text-anchor="middle" font-size="16" fill="#8fa08f">(x+1)(x+2) = x² + 3x + 2 ✔</text>`;
    } else {
      m=`<text x="180" y="96" text-anchor="middle" font-size="17" fill="#b6e0bd">числа складываем, букву оставляем</text>
        <text x="180" y="158" text-anchor="middle" font-size="44" font-weight="bold" fill="#ffd76a" class="c2a-spark">3x + 5x = ?</text>
        <text x="180" y="208" text-anchor="middle" font-size="16" fill="#8fa08f">подсказка: 3 + 5 = 8…</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#17302a"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <text x="18" y="54" font-size="15" font-weight="bold" fill="#ffd76a">Многочлены · коробочки с буквами</text>
      ${m}</svg>`; }
  function factSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6d4e8">число → множители: 12 = 3 · 4</text>
        <text x="180" y="132" text-anchor="middle" font-size="34" font-weight="bold" fill="#f4e9c8">6x + 12 = 6·(x + 2)</text>
        <text x="180" y="176" text-anchor="middle" font-size="19" fill="#ffd76a">выносим общий множитель за скобку</text>
        <text x="180" y="208" text-anchor="middle" font-size="16" fill="#8fa08f">общее у 6x и 12 — число 6</text>`;
    } else if(v===1){
      m=`<text x="180" y="76" text-anchor="middle" font-size="17" fill="#b6d4e8">делим каждый член на 6</text>
        <g font-size="24" fill="#f4e9c8" font-family="Georgia,serif">
          <text x="60" y="122">6x : 6 = x</text>
          <text x="60" y="158">12 : 6 = 2</text>
        </g>
        <text x="210" y="152" font-size="26" font-weight="bold" fill="#ffd76a">→ 6(x + 2)</text>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#8fa08f">общий множитель 6 — «на входе»</text>`;
    } else if(v===2){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#8fd1a8">проверка — раскрываем обратно</text>
        <text x="180" y="134" text-anchor="middle" font-size="32" font-weight="bold" fill="#f4e9c8">6·(x + 2) = 6x + 12 ✔</text>
        <text x="180" y="180" text-anchor="middle" font-size="20" fill="#b6d4e8">6·x = 6x и 6·2 = 12</text>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#8fa08f">сошлось с исходным — разложение верное!</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="17" fill="#ffd76a">формула-волшебница: разность квадратов</text>
        <text x="180" y="122" text-anchor="middle" font-size="30" font-weight="bold" fill="#f4e9c8">a² − b² = (a−b)(a+b)</text>
        <text x="180" y="164" text-anchor="middle" font-size="24" fill="#7fd1ff">x² − 16 = (x−4)(x+4)</text>
        <text x="180" y="204" text-anchor="middle" font-size="17" fill="#8fd1a8">16 = 4² → 4 и в минус, и в плюс</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">проверь: x²+4x−4x−16 = x²−16 ✔</text>`;
    } else if(v===4){
      m=`<text x="180" y="78" text-anchor="middle" font-size="17" fill="#b6d4e8">квадрат суммы — тоже формула!</text>
        <text x="180" y="124" text-anchor="middle" font-size="30" font-weight="bold" fill="#f4e9c8">(a+b)² = a² + 2ab + b²</text>
        <text x="180" y="166" text-anchor="middle" font-size="19" fill="#8fd1a8">(a+b)(a+b): ab появляется дважды!</text>
        <text x="180" y="196" text-anchor="middle" font-size="19" fill="#8fd1a8">a² + ab + ab + b² = a² + 2ab + b²</text>
        <text x="180" y="224" text-anchor="middle" font-size="15" fill="#8fa08f">двойка перед ab — как два одинаковых кусочка</text>`;
    } else if(v===5){
      m=`<text x="180" y="78" text-anchor="middle" font-size="17" fill="#ffd76a">считаем быстро, не раскрывая скобки</text>
        <text x="180" y="126" text-anchor="middle" font-size="28" font-weight="bold" fill="#f4e9c8">(x−3)(x+3) = x² − 9</text>
        <text x="180" y="170" text-anchor="middle" font-size="24" fill="#7fd1ff">x = 5 → 25 − 9 = 16</text>
        <rect x="128" y="188" width="104" height="36" rx="18" fill="#d9a441"/>
        <text x="180" y="213" text-anchor="middle" font-size="20" font-weight="bold" fill="#17302a">ответ: 16</text>`;
    } else if(v===6){
      m=`<text x="180" y="92" text-anchor="middle" font-size="17" fill="#b6d4e8">увидел x² − число² → формула!</text>
        <text x="180" y="148" text-anchor="middle" font-size="20" fill="#8fd1a8">общий множитель — выносим</text>
        <text x="180" y="180" text-anchor="middle" font-size="20" fill="#8fd1a8">разность квадратов — формула</text>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#8fa08f">двух приёмов хватит почти на всё</text>`;
    } else {
      m=`<text x="180" y="96" text-anchor="middle" font-size="17" fill="#b6d4e8">16 = 4² → скобки с 4</text>
        <text x="180" y="158" text-anchor="middle" font-size="40" font-weight="bold" fill="#ffd76a" class="c2a-spark">x² − 16 = ?</text>
        <text x="180" y="208" text-anchor="middle" font-size="16" fill="#8fa08f">(x − ?)(x + ?)</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#7fd1ff">Разложение на множители</text>
      ${m}</svg>`; }
  function systSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6d4e8">два условия про ОДНИ И ТЕ ЖЕ x и y</text>
        <g font-size="30" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="126" fill="#7fd1ff">x + y = 10</text>
          <text x="180" y="168" fill="#ffb0a0">x − y = 4</text>
        </g>
        <path d="M210 96 v64" stroke="#d9a441" stroke-width="4"/>
        <text x="232" y="136" font-size="26">{</text>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#8fa08f">ищем пару для ОБОИХ сразу</text>`;
    } else if(v===1){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6d4e8">+y и −y — гасят друг друга!</text>
        <g font-size="30" font-family="Georgia,serif" text-anchor="middle">
          <text x="150" y="128" fill="#7fd1ff">x + y = 10</text>
          <text x="150" y="170" fill="#ffb0a0">x − y = 4</text>
        </g>
        <text x="180" y="212" text-anchor="middle" font-size="22" font-weight="bold" fill="#8fd1a8">сложим → y исчезнет</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="17" fill="#b6d4e8">складываем левые и правые части</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="118" fill="#f4e9c8">x + x = 2x</text>
          <text x="180" y="150" fill="#f4e9c8">y − y = 0</text>
          <text x="180" y="182" fill="#ffd76a">10 + 4 = 14</text>
        </g>
        <rect x="88" y="196" width="184" height="34" rx="17" fill="rgba(79,141,255,.3)"/>
        <text x="180" y="220" text-anchor="middle" font-size="22" font-weight="bold" fill="#7fd1ff">2x = 14 → x = 7</text>`;
    } else if(v===3){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#b6d4e8">x=7 — в первое уравнение</text>
        <text x="180" y="132" text-anchor="middle" font-size="30" font-weight="bold" fill="#f4e9c8">7 + y = 10</text>
        <text x="180" y="176" text-anchor="middle" font-size="24" fill="#7fd1ff">y = 10 − 7 = 3</text>
        <rect x="112" y="196" width="136" height="34" rx="17" fill="#d9a441"/>
        <text x="180" y="220" text-anchor="middle" font-size="21" font-weight="bold" fill="#1e2a3d">y = 3</text>`;
    } else if(v===4){
      m=`<text x="180" y="80" text-anchor="middle" font-size="17" fill="#8fd1a8">проверяем в ОБОИХ уравнениях</text>
        <text x="180" y="126" text-anchor="middle" font-size="26" font-weight="bold" fill="#f4e9c8">(7; 3)</text>
        <text x="180" y="162" text-anchor="middle" font-size="21" fill="#8fd1a8">7 + 3 = 10 ✔</text>
        <text x="180" y="192" text-anchor="middle" font-size="21" fill="#8fd1a8">7 − 3 = 4 ✔</text>
        <text x="180" y="222" text-anchor="middle" font-size="17" fill="#ffd76a">всё сошлось — ответ верный!</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="17" fill="#b6d4e8">второй способ — подстановка</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="114" fill="#7fd1ff">из 1-го: y = 10 − x</text>
          <text x="180" y="146" fill="#f4e9c8">x − (10 − x) = 4</text>
          <text x="180" y="178" fill="#f4e9c8">2x − 10 = 4</text>
          <text x="180" y="210" fill="#ffd76a">2x = 14 → x = 7</text>
        </g>`;
    } else if(v===6){
      m=`<text x="180" y="84" text-anchor="middle" font-size="17" fill="#b6d4e8">два условия → система → ответ</text>
        <text x="180" y="132" text-anchor="middle" font-size="19" fill="#8fd1a8">возраст двух братьев</text>
        <text x="180" y="162" text-anchor="middle" font-size="19" fill="#8fd1a8">длина и ширина участка</text>
        <text x="180" y="192" text-anchor="middle" font-size="19" fill="#8fd1a8">цена ручки и тетради</text>
        <text x="180" y="222" text-anchor="middle" font-size="16" fill="#8fa08f">жизнь часто даёт два условия сразу!</text>`;
    } else {
      m=`<text x="180" y="96" text-anchor="middle" font-size="17" fill="#b6d4e8">x = 7 уже нашли — ищем y</text>
        <text x="180" y="158" text-anchor="middle" font-size="40" font-weight="bold" fill="#ffd76a" class="c2a-spark">x + y = 10 → y = ?</text>
        <text x="180" y="208" text-anchor="middle" font-size="16" fill="#8fa08f">7 + y = 10</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#221a3d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#7a5ac0" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#c9a8ff">Системы линейных уравнений</text>
      ${m}</svg>`; }

  /* --- 402: линейная функция y=kx+b (оси, прямые, k и b) --- */
  function linfSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const axes=`<line x1="30" y1="146" x2="330" y2="146" stroke="#f4e9c8" stroke-width="3"/>
      <line x1="180" y1="40" x2="180" y2="220" stroke="#f4e9c8" stroke-width="3"/>
      <polygon points="330,146 322,140 322,152" fill="#f4e9c8"/>
      <polygon points="180,40 174,48 186,48" fill="#f4e9c8"/>
      <text x="318" y="162" font-size="13" fill="#9fc0e8">x</text>
      <text x="168" y="46" font-size="13" fill="#9fc0e8">y</text>`;
    const grid=`<g stroke="rgba(255,255,255,.09)" stroke-width="1">
      <line x1="60" y1="40" x2="60" y2="220"/><line x1="110" y1="40" x2="110" y2="220"/><line x1="250" y1="40" x2="250" y2="220"/><line x1="300" y1="40" x2="300" y2="220"/>
      <line x1="30" y1="106" x2="330" y2="106"/><line x1="30" y1="66" x2="330" y2="66"/><line x1="30" y1="186" x2="330" y2="186"/><line x1="30" y1="226" x2="330" y2="226"/>
    </g>`;
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">график y = kx + b — всегда прямая</text>
        ${grid}${axes}
        <line x1="70" y1="186" x2="290" y2="106" stroke="#ffd76a" stroke-width="5" stroke-linecap="round"/>
        <text x="180" y="210" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffd76a">прямая линия!</text>
        <text x="180" y="232" text-anchor="middle" font-size="14" fill="#8fa08f">x растёт → y меняется равномерно</text>`;
    } else if(v===1){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">k — угловой коэффициент: наклон</text>
        ${grid}${axes}
        <line x1="70" y1="186" x2="290" y2="80" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
        <text x="292" y="76" font-size="15" fill="#8fd1a8">k &gt; 0</text>
        <line x1="70" y1="80" x2="290" y2="186" stroke="#e86a5a" stroke-width="5" stroke-linecap="round"/>
        <text x="60" y="74" font-size="15" fill="#e86a5a">k &lt; 0</text>
        <text x="180" y="214" text-anchor="middle" font-size="15" fill="#8fa08f">k &gt; 0 — растёт · k &lt; 0 — убывает</text>
        <text x="180" y="234" text-anchor="middle" font-size="13" fill="#8fa08f">чем больше |k|, тем круче прямая</text>`;
    } else if(v===2){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">b — пересечение с осью y</text>
        ${grid}${axes}
        <line x1="70" y1="146" x2="290" y2="146" stroke="#7fd1ff" stroke-width="5" stroke-linecap="round"/>
        <circle cx="180" cy="146" r="8" fill="#ffd76a"/>
        <text x="188" y="142" font-size="15" fill="#ffd76a">(0; b)</text>
        <text x="180" y="206" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffd76a">x = 0 → y = k·0 + b = b</text>
        <text x="180" y="230" text-anchor="middle" font-size="14" fill="#8fa08f">прямая встречает ось y в точке (0; b)</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">строим по двум точкам: y = 2x + 1</text>
        ${grid}${axes}
        <line x1="70" y1="186" x2="290" y2="106" stroke="#ffd76a" stroke-width="5" stroke-linecap="round"/>
        <circle cx="140" cy="166" r="8" fill="#7fd1ff"/><text x="112" y="162" font-size="14" fill="#7fd1ff">(0;1)</text>
        <circle cx="220" cy="126" r="8" fill="#8fd1a8"/><text x="226" y="120" font-size="14" fill="#8fd1a8">(1;3)</text>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#f4e9c8">x=0 → y=1 · x=1 → y=3</text>
        <text x="180" y="236" text-anchor="middle" font-size="14" fill="#8fa08f">двух точек достаточно, чтобы нарисовать прямую</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">таблица значений y = 2x + 1</text>
        ${grid}${axes}
        <line x1="70" y1="186" x2="290" y2="106" stroke="#ffd76a" stroke-width="5" stroke-linecap="round"/>
        <g font-size="17" fill="#f4e9c8" text-anchor="middle">
          <rect x="62" y="92" width="236" height="30" rx="8" fill="rgba(79,141,255,.22)"/>
          <text x="95" y="113">x</text><text x="180" y="113">0</text><text x="265" y="113">1</text>
          <rect x="62" y="122" width="236" height="30" rx="8" fill="rgba(143,209,168,.16)"/>
          <text x="95" y="143">y</text><text x="180" y="143">1</text><text x="265" y="143">3</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#8fd1a8">подставляем x в формулу — получаем y</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">в жизни: k — цена, b — начальная плата</text>
        ${grid}${axes}
        <line x1="70" y1="176" x2="290" y2="96" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
        <circle cx="120" cy="156" r="7" fill="#ffd76a"/>
        <text x="180" y="206" text-anchor="middle" font-size="15" fill="#f4e9c8">такси: y = 30x + 70</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">70 ₽ посадка + 30 ₽ за каждый км — прямая!</text>`;
    } else if(v===6){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">главное о k и b — одной картинкой</text>
        ${grid}${axes}
        <line x1="80" y1="166" x2="280" y2="126" stroke="#8fd1a8" stroke-width="5" stroke-linecap="round"/>
        <circle cx="180" cy="146" r="7" fill="#ffd76a"/>
        <text x="180" y="206" text-anchor="middle" font-size="15" fill="#8fd1a8">k — наклон (как быстро растёт)</text>
        <text x="180" y="228" text-anchor="middle" font-size="15" fill="#7fd1ff">b — старт на оси y (0; b)</text>`;
    } else {
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">подставь x = 3 в формулу y = 2x + 1</text>
        ${grid}${axes}
        <line x1="70" y1="186" x2="290" y2="106" stroke="#ffd76a" stroke-width="5" stroke-linecap="round"/>
        <text x="180" y="176" text-anchor="middle" font-size="24" font-weight="bold" fill="#ffd76a" class="c2a-spark">y = 2·3 + 1 = ?</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">считай: сначала умножь, потом прибавь</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#17253d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#ffd76a">Линейная функция y = kx + b</text>
      ${m}</svg>`; }

  /* --- 403: линейные неравенства (числовая ось, знак) --- */
  function neqSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const axis=(big,fill,xRight)=>`<line x1="40" y1="150" x2="320" y2="150" stroke="#f4e9c8" stroke-width="4"/>
      <polygon points="320,150 312,144 312,156" fill="#f4e9c8"/>
      <g font-size="13" fill="#8fa7c8" text-anchor="middle">
        <text x="60" y="138">−4</text><text x="100" y="138">−2</text><text x="140" y="138">0</text>
        <text x="180" y="138">2</text><text x="220" y="138">4</text><text x="260" y="138">6</text><text x="300" y="138">8</text>
      </g>
      <line x1="${xRight}" y1="150" x2="316" y2="150" stroke="${big? '#8fd1a8':'#e86a5a'}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="${xRight}" cy="150" r="9" fill="${fill? '#8fd1a8':'#231a2a'}" stroke="${big? '#8fd1a8':'#e86a5a'}" stroke-width="4"/>`;
    if(v===0){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">решаем почти как уравнение!</text>
        <text x="180" y="126" text-anchor="middle" font-size="26" font-weight="bold" fill="#f4e9c8">2x + 1 &gt; 7</text>
        <text x="180" y="158" text-anchor="middle" font-size="20" fill="#7fd1ff">переносим: 2x &gt; 7 − 1</text>
        <text x="180" y="190" text-anchor="middle" font-size="20" fill="#8fd1a8">2x &gt; 6</text>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#8fa08f">знак при переносе через = не меняется</text>`;
    } else if(v===1){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">делим на положительное 2 — знак тот же</text>
        <text x="180" y="126" text-anchor="middle" font-size="26" font-weight="bold" fill="#f4e9c8">2x &gt; 6  |  : 2</text>
        <text x="180" y="160" text-anchor="middle" font-size="26" font-weight="bold" fill="#8fd1a8">x &gt; 3</text>
        ${axis(true,true,240)}
        <text x="180" y="224" text-anchor="middle" font-size="14" fill="#8fa08f">кружок на 3 пустой: само число 3 не подходит</text>`;
    } else if(v===2){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#ffd0c0">ВНИМАНИЕ: делим на минус!</text>
        <text x="180" y="126" text-anchor="middle" font-size="24" font-weight="bold" fill="#f4e9c8">−3x &lt; 9  |  : (−3)</text>
        <text x="180" y="162" text-anchor="middle" font-size="22" font-weight="bold" fill="#ffd76a">x &gt; −3</text>
        <text x="180" y="190" text-anchor="middle" font-size="16" fill="#e86a5a">знак ПЕРЕВЕРНУЛСЯ: &lt; стал &gt;</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">минус «развернул» неравенство — как зеркало</text>`;
    } else if(v===3){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">почему так? проверяем на числах</text>
        <text x="180" y="116" text-anchor="middle" font-size="20" fill="#f4e9c8">−3·(−2) = 6 и 6 &lt; 9 — верно</text>
        <text x="180" y="146" text-anchor="middle" font-size="20" fill="#f4e9c8">−3·(−4) = 12 и 12 &lt; 9 — НЕВЕРНО</text>
        <text x="180" y="182" text-anchor="middle" font-size="18" fill="#8fd1a8">x = −2 подходит, x = −4 — нет</text>
        <text x="180" y="212" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">значит x &gt; −3, а не x &lt; −3!</text>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">проверка числом — лучшая страховка</text>`;
    } else if(v===4){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">рисуем ответ x &gt; −3 на оси</text>
        ${axis(true,true,124)}
        <text x="180" y="196" text-anchor="middle" font-size="18" font-weight="bold" fill="#8fd1a8">x &gt; −3</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">луч вправо: все числа больше −3</text>`;
    } else if(v===5){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">если знак ≥ или ≤ — кружок закрашиваем</text>
        ${axis(true,true,124)}
        <text x="180" y="196" text-anchor="middle" font-size="16" fill="#8fd1a8">x ≥ −3 — число −3 ТОЖЕ подходит</text>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#8fa08f">закрашенный кружок = число включаем</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">главное правило — запомни навсегда</text>
        <text x="180" y="120" text-anchor="middle" font-size="21" fill="#f4e9c8">делим на плюс → знак прежний</text>
        <text x="180" y="152" text-anchor="middle" font-size="21" fill="#ffd76a">делим на минус → знак наоборот</text>
        <text x="180" y="190" text-anchor="middle" font-size="16" fill="#8fd1a8">умножение на минус — то же самое</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">проверяй ответ подстановкой одного числа!</text>`;
    } else {
      m=`<text x="180" y="86" text-anchor="middle" font-size="16" fill="#b6d4e8">делим на −3 — не забудь про знак!</text>
        <text x="180" y="140" text-anchor="middle" font-size="30" font-weight="bold" fill="#ffd76a" class="c2a-spark">−3x &lt; 9</text>
        <text x="180" y="188" text-anchor="middle" font-size="20" fill="#7fd1ff">x ? −3</text>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#8fa08f">какой знак поставишь?</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2433"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#a05a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#ff8ac0">Линейные неравенства</text>
      ${m}</svg>`; }

  /* --- 404: признаки равенства треугольников --- */
  function congSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const triL=`<polygon points="180,60 90,190 270,190" fill="rgba(127,209,255,.15)" stroke="#7fd1ff" stroke-width="4"/>`;
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">равны — можно совместить наложением</text>
        ${triL}
        <text x="180" y="60" text-anchor="middle" font-size="13" fill="#ffd76a">A</text>
        <text x="78" y="204" text-anchor="middle" font-size="13" fill="#8fd1a8">B</text>
        <text x="282" y="204" text-anchor="middle" font-size="13" fill="#8fd1a8">C</text>
        <text x="180" y="126" text-anchor="middle" font-size="15" fill="#9fc0e8">равные стороны и углы —</text>
        <text x="180" y="150" text-anchor="middle" font-size="15" fill="#9fc0e8">как две одинаковые детали пазла</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">проверять все 6 элементов не обязательно!</text>`;
    } else if(v===1){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">1-й признак: две стороны и угол МЕЖДУ ними</text>
        ${triL}
        <line x1="180" y1="60" x2="90" y2="190" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="180" y1="60" x2="270" y2="190" stroke="#e86a5a" stroke-width="5"/>
        <path d="M180 60 L160 82 A 34 34 0 0 1 188 76 Z" fill="rgba(255,215,106,.7)"/>
        <text x="180" y="96" text-anchor="middle" font-size="13" fill="#ffd76a">угол</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">сторона·угол·сторона — как «замок»</text>`;
    } else if(v===2){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">2-й признак: сторона и два прилежащих угла</text>
        ${triL}
        <line x1="90" y1="190" x2="270" y2="190" stroke="#8fd1a8" stroke-width="6"/>
        <path d="M180 60 L142 78 A 60 60 0 0 1 118 122 Z" fill="rgba(255,215,106,.55)"/>
        <path d="M180 60 L218 78 A 60 60 0 0 0 242 122 Z" fill="rgba(127,209,255,.55)"/>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">сторона между углами — «полка» для углов</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">3-й признак: три стороны</text>
        <polygon points="180,60 90,190 270,190" fill="rgba(143,209,168,.15)" stroke="#8fd1a8" stroke-width="4"/>
        <line x1="180" y1="60" x2="90" y2="190" stroke="#e86a5a" stroke-width="5"/>
        <line x1="90" y1="190" x2="270" y2="190" stroke="#7fd1ff" stroke-width="5"/>
        <line x1="270" y1="190" x2="180" y2="60" stroke="#ffd76a" stroke-width="5"/>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">стороны определяют треугольник полностью</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">почему «сторона + угол + сторона» хватает?</text>
        <polygon points="180,60 90,190 270,190" fill="rgba(127,209,255,.15)" stroke="#7fd1ff" stroke-width="4"/>
        <line x1="180" y1="60" x2="90" y2="190" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="180" y1="60" x2="270" y2="190" stroke="#e86a5a" stroke-width="5"/>
        <path d="M180 60 L160 82 A 34 34 0 0 1 188 76 Z" fill="rgba(255,215,106,.7)"/>
        <text x="180" y="126" text-anchor="middle" font-size="14" fill="#9fc0e8">две «палочки» выходят из A под углом —</text>
        <text x="180" y="150" text-anchor="middle" font-size="14" fill="#9fc0e8">их концы B и C жёстко заданы!</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">третья сторона BC «дорисуется» сама</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">считаем недостающие углы</text>
        <polygon points="180,60 90,190 270,190" fill="rgba(255,215,106,.13)" stroke="#ffd76a" stroke-width="4"/>
        <text x="180" y="74" text-anchor="middle" font-size="14" fill="#ffd76a">60°</text>
        <text x="112" y="182" text-anchor="middle" font-size="14" fill="#8fd1a8">70°</text>
        <text x="248" y="182" text-anchor="middle" font-size="14" fill="#7fd1ff">?°</text>
        <text x="180" y="200" text-anchor="middle" font-size="17" fill="#f4e9c8">сумма углов = 180°</text>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#8fd1a8">угол C = 180 − 60 − 70 = 50°</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">в задачах ищем пары равных элементов</text>
        <text x="180" y="120" text-anchor="middle" font-size="17" fill="#f4e9c8">1-й: сторона — угол — сторона</text>
        <text x="180" y="148" text-anchor="middle" font-size="17" fill="#f4e9c8">2-й: угол — сторона — угол</text>
        <text x="180" y="176" text-anchor="middle" font-size="17" fill="#f4e9c8">3-й: сторона — сторона — сторона</text>
        <text x="180" y="210" text-anchor="middle" font-size="14" fill="#8fa08f">пометь равные элементы галочками — сразу видно</text>`;
    } else {
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">две стороны и угол между ними — это…</text>
        <polygon points="180,70 100,180 260,180" fill="rgba(127,209,255,.15)" stroke="#7fd1ff" stroke-width="4"/>
        <line x1="180" y1="70" x2="100" y2="180" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="180" y1="70" x2="260" y2="180" stroke="#e86a5a" stroke-width="5"/>
        <path d="M180 70 L162 90 A 30 30 0 0 1 187 86 Z" fill="rgba(255,215,106,.7)"/>
        <text x="180" y="226" text-anchor="middle" font-size="17" fill="#ffd76a" class="c2a-spark">какой признак?</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f7a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#8fd1a8">Признаки равенства треугольников</text>
      ${m}</svg>`; }

  /* --- 405: медианы, биссектрисы, высоты треугольника --- */
  function medSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const baseTri=(col)=>`<polygon points="180,52 80,196 280,196" fill="rgba(127,209,255,.10)" stroke="${col}" stroke-width="4"/>`;
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">три особых отрезка в каждом треугольнике</text>
        ${baseTri('#7fd1ff')}
        <text x="180" y="52" text-anchor="middle" font-size="13" fill="#ffd76a">A</text>
        <text x="70" y="210" text-anchor="middle" font-size="13" fill="#8fd1a8">B</text>
        <text x="290" y="210" text-anchor="middle" font-size="13" fill="#8fd1a8">C</text>
        <text x="180" y="224" text-anchor="middle" font-size="14" fill="#8fa08f">медиана · биссектриса · высота</text>`;
    } else if(v===1){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">медиана: из вершины в СЕРЕДИНУ стороны</text>
        ${baseTri('#8fd1a8')}
        <line x1="180" y1="52" x2="180" y2="196" stroke="#ffd76a" stroke-width="5"/>
        <circle cx="180" cy="196" r="7" fill="#e86a5a"/>
        <text x="172" y="212" font-size="13" fill="#e86a5a">середина</text>
        <rect x="118" y="96" width="124" height="30" rx="8" fill="rgba(255,215,106,.2)"/>
        <text x="180" y="117" text-anchor="middle" font-size="15" fill="#ffd76a">AM — медиана</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">делит сторону BC пополам: BM = MC</text>`;
    } else if(v===2){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">биссектриса: делит УГОЛ пополам</text>
        ${baseTri('#ffd76a')}
        <line x1="180" y1="52" x2="120" y2="196" stroke="#e86a5a" stroke-width="5" opacity=".25"/>
        <line x1="180" y1="52" x2="240" y2="196" stroke="#e86a5a" stroke-width="5" opacity=".25"/>
        <line x1="180" y1="52" x2="180" y2="180" stroke="#ff8ac0" stroke-width="5"/>
        <path d="M180 52 L166 74 A 30 30 0 0 1 190 70 Z" fill="rgba(255,138,192,.6)"/>
        <text x="196" y="66" font-size="13" fill="#ff8ac0">∠1 = ∠2</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">биссектриса делит угол поровну</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">высота: ПЕРПЕНДИКУЛЯР к стороне</text>
        ${baseTri('#e86a5a')}
        <line x1="180" y1="52" x2="252" y2="196" stroke="#7fd1ff" stroke-width="5" opacity=".2"/>
        <line x1="212" y1="52" x2="252" y2="196" stroke="#7fd1ff" stroke-width="4" stroke-dasharray="6 5"/>
        <line x1="212" y1="52" x2="252" y2="146" stroke="#7fd1ff" stroke-width="5"/>
        <rect x="228" y="144" width="20" height="14" fill="none" stroke="#7fd1ff" stroke-width="2"/>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">высота падает на сторону под прямым углом (90°)</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">равнобедренный — особый случай</text>
        <polygon points="180,52 90,196 270,196" fill="rgba(255,215,106,.10)" stroke="#ffd76a" stroke-width="4"/>
        <line x1="180" y1="52" x2="180" y2="196" stroke="#ff8ac0" stroke-width="5"/>
        <line x1="90" y1="196" x2="270" y2="196" stroke="#8fd1a8" stroke-width="3" opacity=".4"/>
        <circle cx="180" cy="196" r="7" fill="#e86a5a"/>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#ffd76a">медиана из вершины = высота = биссектриса!</text>
        <text x="180" y="238" text-anchor="middle" font-size="12" fill="#8fa08f">у равнобедренного все три отрезка сливаются в один</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">точки пересечения — тоже интересно!</text>
        ${baseTri('#7fd1ff')}
        <line x1="180" y1="52" x2="210" y2="196" stroke="#8fd1a8" stroke-width="3" opacity=".5"/>
        <line x1="120" y1="120" x2="260" y2="120" stroke="#e86a5a" stroke-width="3" opacity=".5"/>
        <line x1="100" y1="150" x2="262" y2="150" stroke="#ff8ac0" stroke-width="3" opacity=".5"/>
        <circle cx="180" cy="138" r="7" fill="#ffd76a"/>
        <text x="188" y="132" font-size="13" fill="#ffd76a">O</text>
        <text x="180" y="216" text-anchor="middle" font-size="14" fill="#cfe0ff">три медианы пересекаются в одной точке</text>
        <text x="180" y="234" text-anchor="middle" font-size="12" fill="#8fa08f">она делит каждую медиану в отношении 2:1</text>`;
    } else if(v===6){
      m=`<text x="180" y="84" text-anchor="middle" font-size="16" fill="#b6d4e8">запоминаем по ролям</text>
        <text x="180" y="126" text-anchor="middle" font-size="18" fill="#8fd1a8">медиана — к СЕРЕДИНЕ стороны</text>
        <text x="180" y="156" text-anchor="middle" font-size="18" fill="#ff8ac0">биссектриса — делит УГОЛ пополам</text>
        <text x="180" y="186" text-anchor="middle" font-size="18" fill="#7fd1ff">высота — ПЕРПЕНДИКУЛЯР (90°)</text>
        <text x="180" y="224" text-anchor="middle" font-size="13" fill="#8fa08f">«медиана делит сторону, биссектриса — угол»</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">какой отрезок делит угол пополам?</text>
        <text x="180" y="152" text-anchor="middle" font-size="34" font-weight="bold" fill="#ffd76a" class="c2a-spark">?</text>
        <text x="180" y="204" text-anchor="middle" font-size="17" fill="#8fd1a8">медиана · биссектриса · высота</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14242e"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#2f8fc4" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#ffd76a">Медианы, биссектрисы, высоты</text>
      ${m}</svg>`; }

  /* --- 406: параллельные прямые и секущая (углы) --- */
  function parSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">параллельные не встречаются</text>
        <line x1="40" y1="100" x2="320" y2="100" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="170" x2="320" y2="170" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#cfe0ff">a ∥ b, секущая c пересекает обе</text>
        <text x="180" y="240" text-anchor="middle" font-size="12" fill="#8fa08f">рельсы, строчки в тетради — параллельные прямые</text>`;
    } else if(v===1){
      m=`<text x="180" y="72" text-anchor="middle" font-size="16" fill="#b6d4e8">накрест лежащие углы — РАВНЫ</text>
        <line x1="40" y1="100" x2="320" y2="100" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="170" x2="320" y2="170" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(232,106,90,.65)"/>
        <path d="M206 208 A 40 40 0 0 0 222 178 Z" fill="rgba(232,106,90,.65)"/>
        <text x="180" y="140" text-anchor="middle" font-size="17" fill="#ffb0a0">∠1 = ∠2</text>
        <text x="180" y="236" text-anchor="middle" font-size="13" fill="#8fa08f">углы «внутри», по разные стороны секущей</text>`;
    } else if(v===2){
      m=`<text x="180" y="72" text-anchor="middle" font-size="16" fill="#b6d4e8">соответственные углы — РАВНЫ</text>
        <line x1="40" y1="100" x2="320" y2="100" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="170" x2="320" y2="170" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(127,209,255,.65)"/>
        <path d="M222 208 A 40 40 0 0 1 206 178 Z" fill="rgba(127,209,255,.65)"/>
        <text x="180" y="140" text-anchor="middle" font-size="17" fill="#7fd1ff">∠1 = ∠2</text>
        <text x="180" y="236" text-anchor="middle" font-size="13" fill="#8fa08f">углы «в одном углу» по одну сторону секущей</text>`;
    } else if(v===3){
      m=`<text x="180" y="72" text-anchor="middle" font-size="16" fill="#b6d4e8">односторонние углы: сумма 180°</text>
        <line x1="40" y1="100" x2="320" y2="100" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="170" x2="320" y2="170" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(143,209,168,.65)"/>
        <path d="M206 208 A 40 40 0 0 0 190 178 Z" fill="rgba(143,209,168,.65)"/>
        <text x="180" y="140" text-anchor="middle" font-size="16" fill="#8fd1a8">∠1 + ∠2 = 180°</text>
        <text x="180" y="236" text-anchor="middle" font-size="13" fill="#8fa08f">оба угла внутри, по одну сторону секущей</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">вертикальные углы тоже равны</text>
        <line x1="80" y1="120" x2="280" y2="120" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="60" x2="240" y2="180" stroke="#ffd76a" stroke-width="5"/>
        <path d="M150 78 A 44 44 0 0 1 132 106 Z" fill="rgba(232,106,90,.6)"/>
        <path d="M210 162 A 44 44 0 0 1 228 134 Z" fill="rgba(232,106,90,.6)"/>
        <text x="180" y="140" text-anchor="middle" font-size="17" fill="#ffb0a0">∠1 = ∠2 (вертикальные)</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#cfe0ff">крест-накрест у пересечения двух прямых</text>`;
    } else if(v===5){
      m=`<text x="180" y="72" text-anchor="middle" font-size="16" fill="#b6d4e8">признак: углы равны → прямые параллельны</text>
        <line x1="40" y1="90" x2="320" y2="90" stroke="#8fd1a8" stroke-width="4" opacity=".25"/>
        <line x1="40" y1="180" x2="320" y2="180" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(127,209,255,.65)"/>
        <path d="M206 208 A 40 40 0 0 0 222 178 Z" fill="rgba(232,106,90,.65)"/>
        <text x="180" y="140" text-anchor="middle" font-size="16" fill="#8fd1a8">если накрест лежащие равны → a ∥ b</text>
        <text x="180" y="236" text-anchor="middle" font-size="12" fill="#8fa08f">так доказывают параллельность прямых</text>`;
    } else if(v===6){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">считаем угол по картинке</text>
        <line x1="40" y1="100" x2="320" y2="100" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="170" x2="320" y2="170" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(232,106,90,.65)"/>
        <text x="150" y="86" text-anchor="middle" font-size="13" fill="#fff">70°</text>
        <path d="M206 208 A 40 40 0 0 0 222 178 Z" fill="rgba(127,209,255,.65)"/>
        <text x="222" y="192" text-anchor="middle" font-size="13" fill="#fff">?</text>
        <text x="180" y="140" text-anchor="middle" font-size="16" fill="#ffd76a">накрест лежащие равны → ? = 70°</text>
        <text x="180" y="236" text-anchor="middle" font-size="12" fill="#8fa08f">соседний с 70° по прямой = 110°</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">накрест лежащие углы при a ∥ b…</text>
        <line x1="40" y1="105" x2="320" y2="105" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="40" y1="175" x2="320" y2="175" stroke="#8fd1a8" stroke-width="5"/>
        <line x1="120" y1="40" x2="240" y2="230" stroke="#ffd76a" stroke-width="4"/>
        <path d="M150 62 A 40 40 0 0 0 134 92 Z" fill="rgba(232,106,90,.65)"/>
        <path d="M206 208 A 40 40 0 0 0 222 178 Z" fill="rgba(232,106,90,.65)"/>
        <text x="180" y="232" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a" class="c2a-spark">равны? или 180°?</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#8fd1a8">Параллельные прямые и углы</text>
      ${m}</svg>`; }

  /* --- 407: модуль числа (числовая ось, расстояние) --- */
  function modSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const axis=(extra)=>`<line x1="40" y1="150" x2="320" y2="150" stroke="#f4e9c8" stroke-width="4"/>
      <polygon points="320,150 312,144 312,156" fill="#f4e9c8"/>
      <g font-size="14" fill="#8fa7c8" text-anchor="middle">
        <text x="60" y="138">−4</text><text x="100" y="138">−2</text><text x="140" y="138">0</text>
        <text x="180" y="138">2</text><text x="220" y="138">4</text><text x="260" y="138">6</text><text x="300" y="138">8</text>
      </g>${extra||''}`;
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">|x| — расстояние от числа x до нуля</text>
        ${axis('')}
        <line x1="140" y1="176" x2="140" y2="128" stroke="#e86a5a" stroke-width="3"/>
        <circle cx="140" cy="150" r="7" fill="#ffd76a"/>
        <text x="180" y="186" text-anchor="middle" font-size="17" fill="#f4e9c8">|0| = 0</text>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#8fd1a8">расстояние не бывает отрицательным!</text>`;
    } else if(v===1){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">|−7| = 7 и |7| = 7 — оба на расстоянии 7</text>
        ${axis('')}
        <line x1="140" y1="176" x2="60" y2="176" stroke="#8fd1a8" stroke-width="4"/>
        <line x1="140" y1="176" x2="300" y2="176" stroke="#8fd1a8" stroke-width="4"/>
        <circle cx="60" cy="150" r="8" fill="#7fd1ff"/><text x="52" y="142" font-size="12" fill="#7fd1ff">−7</text>
        <circle cx="300" cy="150" r="8" fill="#8fd1a8"/><text x="296" y="142" font-size="12" fill="#8fd1a8">7</text>
        <circle cx="140" cy="150" r="5" fill="#ffd76a"/>
        <text x="180" y="216" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffd76a">|−7| = 7</text>
        <text x="180" y="240" text-anchor="middle" font-size="13" fill="#8fa08f">минус «отрезается»: остаётся только расстояние</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">|x| = 4: кто на расстоянии 4 от нуля?</text>
        ${axis('')}
        <line x1="140" y1="176" x2="60" y2="176" stroke="#ffd76a" stroke-width="4"/>
        <line x1="140" y1="176" x2="220" y2="176" stroke="#ffd76a" stroke-width="4"/>
        <circle cx="60" cy="150" r="8" fill="#7fd1ff"/><text x="52" y="142" font-size="12" fill="#7fd1ff">−4</text>
        <circle cx="220" cy="150" r="8" fill="#8fd1a8"/><text x="216" y="142" font-size="12" fill="#8fd1a8">4</text>
        <circle cx="140" cy="150" r="5" fill="#ffd76a"/>
        <text x="180" y="216" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">x = 4 или x = −4</text>
        <text x="180" y="240" text-anchor="middle" font-size="13" fill="#8fa08f">уравнение с модулем → ДВА ответа!</text>`;
    } else if(v===3){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">|x| = 0: только само число 0</text>
        ${axis('')}
        <circle cx="140" cy="150" r="9" fill="#ffd76a"/>
        <text x="180" y="196" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">x = 0 — единственное решение</text>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#8fa08f">расстояние 0 бывает только у самого нуля</text>`;
    } else if(v===4){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">|x − 3| = 2: расстояние до точки 3 равно 2</text>
        ${axis('')}
        <line x1="180" y1="176" x2="180" y2="128" stroke="#ffd76a" stroke-width="3"/>
        <circle cx="180" cy="150" r="6" fill="#e86a5a"/><text x="174" y="170" font-size="12" fill="#e86a5a">3</text>
        <line x1="180" y1="176" x2="140" y2="176" stroke="#7fd1ff" stroke-width="4"/>
        <line x1="180" y1="176" x2="220" y2="176" stroke="#8fd1a8" stroke-width="4"/>
        <circle cx="140" cy="150" r="8" fill="#7fd1ff"/><text x="132" y="142" font-size="12" fill="#7fd1ff">1</text>
        <circle cx="220" cy="150" r="8" fill="#8fd1a8"/><text x="216" y="142" font-size="12" fill="#8fd1a8">5</text>
        <text x="180" y="216" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffd76a">x = 5 или x = 1</text>
        <text x="180" y="240" text-anchor="middle" font-size="13" fill="#8fa08f">влево 2 шага и вправо 2 шага от числа 3</text>`;
    } else if(v===5){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">примеры: считаем модули</text>
        <g font-size="23" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="126" fill="#7fd1ff">|−5| = 5</text>
          <text x="180" y="160" fill="#8fd1a8">|12| = 12</text>
          <text x="180" y="194" fill="#ffd76a">|0| = 0</text>
        </g>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">минус убираем, плюс — как есть</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">главное о модуле</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="124">модуль — это РАССТОЯНИЕ до нуля</text>
          <text x="180" y="152" fill="#7fd1ff">|x| = a → x = a или x = −a</text>
          <text x="180" y="180" fill="#8fd1a8">|x − a| — расстояние до точки a</text>
        </g>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#8fa08f">ловушка: модуль ≠ минусу!</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">расстояние от −7 до нуля?</text>
        <text x="180" y="152" text-anchor="middle" font-size="38" font-weight="bold" fill="#ffd76a" class="c2a-spark">|−7| = ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="16" fill="#8fa08f">минус отрезаем — сколько останется?</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#231a2a"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#a05a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#e8a0d8">Модуль числа |x|</text>
      ${m}</svg>`; }

  /* --- 408: сравнения по модулю (остатки) --- */
  function cmpSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">делим с остатком: 17 : 5 = 3 и остаток 2</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="126" fill="#f4e9c8">17 = 3·5 + 2</text>
        </g>
        <text x="180" y="168" text-anchor="middle" font-size="20" fill="#ffd76a">остаток 2</text>
        <text x="180" y="216" text-anchor="middle" font-size="15" fill="#8fa08f">остаток всегда меньше делителя: 2 < 5</text>`;
    } else if(v===1){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">запись a ≡ b (mod m): одинаковые остатки</text>
        <g font-size="25" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">17 ≡ 2 (mod 5)</text>
          <text x="180" y="160" fill="#7fd1ff">17 − 2 = 15, а 15 ⋮ 5</text>
        </g>
        <text x="180" y="206" text-anchor="middle" font-size="17" font-weight="bold" fill="#8fd1a8">разность делится на модуль!</text>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">«≡» читается «сравнимо по модулю»</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">на «часах»: mod 5 считает кругами по 5</text>
        <circle cx="180" cy="140" r="70" fill="none" stroke="#8fd1a8" stroke-width="4"/>
        <g font-size="17" fill="#cfe0ff" text-anchor="middle">
          <text x="180" y="60">0</text><text x="250" y="132">1</text><text x="234" y="202">2</text>
          <text x="126" y="202">3</text><text x="110" y="132">4</text>
        </g>
        <text x="180" y="232" text-anchor="middle" font-size="14" fill="#8fa08f">числа 2, 7, 12, 17 — «та же точка» 2 по mod 5</text>`;
    } else if(v===3){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">находим остаток: 23 : 4</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="126" fill="#f4e9c8">23 = 5·4 + 3</text>
          <text x="180" y="164" fill="#ffd76a">23 ≡ 3 (mod 4)</text>
        </g>
        <text x="180" y="210" text-anchor="middle" font-size="17" fill="#8fd1a8">кратное 4 не больше 23 — это 20</text>
        <text x="180" y="234" text-anchor="middle" font-size="13" fill="#8fa08f">это 20 = 5·4, остаток 23 − 20 = 3</text>`;
    } else if(v===4){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">проверяем через разность</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#f4e9c8">29 ≡ ? (mod 6)</text>
          <text x="180" y="156" fill="#7fd1ff">29 − 5 = 24, 24 ⋮ 6 → 5</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="20" font-weight="bold" fill="#ffd76a">29 ≡ 5 (mod 6)</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">29 = 4·6 + 5 — остаток 5</text>`;
    } else if(v===5){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">остатки удобно складывать</text>
        <g font-size="21" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#f4e9c8">17 ≡ 2, 23 ≡ 3 (mod 5)</text>
          <text x="180" y="154" fill="#7fd1ff">17 + 23 ≡ 2 + 3 = 5 ≡ 0</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="16" fill="#8fd1a8">значит, 17 + 23 = 40 делится на 5!</text>
        <text x="180" y="226" text-anchor="middle" font-size="13" fill="#8fa08f">проверь: 40 : 5 = 8 без остатка ✔</text>`;
    } else if(v===6){
      m=`<text x="180" y="82" text-anchor="middle" font-size="16" fill="#b6d4e8">главное о сравнениях</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="126">a ≡ b (mod m) ⟺ одинаковые остатки</text>
          <text x="180" y="156" fill="#7fd1ff">⟺ a − b делится на m</text>
          <text x="180" y="186" fill="#8fd1a8">остатки можно складывать и умножать</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="13" fill="#8fa08f">мощный инструмент олимпиадных задач!</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">найди остаток от деления 23 на 4</text>
        <text x="180" y="152" text-anchor="middle" font-size="34" font-weight="bold" fill="#ffd76a" class="c2a-spark">23 mod 4 = ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="15" fill="#8fa08f">самое большое кратное 4, не большее 23…</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2433"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#7fd1ff">Сравнения по модулю</text>
      ${m}</svg>`; }

  /* --- 409: уравнения с параметром ax = b (три случая) --- */
  function prmSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">параметр a — «ручка настройки» уравнения</text>
        <g font-size="28" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="128" fill="#f4e9c8">ax = b</text>
        </g>
        <text x="180" y="170" text-anchor="middle" font-size="17" fill="#7fd1ff">a и b — буквы-числа, x — неизвестное</text>
        <text x="180" y="216" text-anchor="middle" font-size="15" fill="#8fa08f">задача: понять, как ответ зависит от a и b</text>`;
    } else if(v===1){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#8fd1a8">случай 1: a ≠ 0 — делим смело!</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">ax = b, a ≠ 0</text>
          <text x="180" y="160" fill="#ffd76a">x = b : a — одно решение</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="18" fill="#8fd1a8">пример: 3x = 6 → x = 2</text>
        <text x="180" y="232" text-anchor="middle" font-size="14" fill="#8fa08f">на a делить можно — оно не ноль</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">случай 2: a = 0 и b = 0 — всегда верно</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">0·x = 0</text>
          <text x="180" y="160" fill="#ffd76a">0 = 0 — верно при ЛЮБОМ x</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="18" fill="#8fd1a8">бесконечно много решений</text>
        <text x="180" y="232" text-anchor="middle" font-size="14" fill="#8fa08f">подставь любое число — ноль везде ноль</text>`;
    } else if(v===3){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#ffb0a0">случай 3: a = 0 и b ≠ 0 — решений нет</text>
        <g font-size="26" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">0·x = 5</text>
          <text x="180" y="160" fill="#e86a5a">0 = 5 — ложь!</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="18" fill="#ffb0a0">ни одно число не подойдёт</text>
        <text x="180" y="232" text-anchor="middle" font-size="14" fill="#8fa08f">ноль умножить на что угодно — всегда 0</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">сводим к виду ax = b</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="116" fill="#f4e9c8">ax + 1 = 5  (x с a слева)</text>
          <text x="180" y="148" fill="#7fd1ff">ax = 5 − 1 = 4</text>
          <text x="180" y="180" fill="#8fd1a8">при a ≠ 0: x = 4/a</text>
        </g>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#8fa08f">всегда приводи уравнение к виду ax = b</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">пример из олимпиады</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="114" fill="#f4e9c8">ax = 6. При каком a решений нет?</text>
          <text x="180" y="148" fill="#7fd1ff">если a = 0: 0 = 6 — ложь!</text>
        </g>
        <text x="180" y="188" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">ответ: a = 0 — решений нет</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">а при a = 0, b = 0 — решений бесконечно много</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">шпаргалка: ax = b</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="122" fill="#8fd1a8">a ≠ 0 → x = b/a (одно)</text>
          <text x="180" y="152" fill="#7fd1ff">a = 0, b = 0 → ∞ решений</text>
          <text x="180" y="182" fill="#e86a5a">a = 0, b ≠ 0 → решений нет</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="13" fill="#8fa08f">три случая — и все задачи на параметры открыты</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">ax = 6, a = 3: делим?</text>
        <text x="180" y="152" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffd76a" class="c2a-spark">x = ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="16" fill="#8fa08f">3x = 6 → x = 6 : 3</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2a3d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#a05a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#e8a0d8">Уравнения с параметром ax = b</text>
      ${m}</svg>`; }

  /* --- 410: неравенство о средних (AM ≥ GM) --- */
  function avg7SVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">два вида среднего для чисел a и b</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#7fd1ff">среднее арифметическое: (a+b)/2</text>
          <text x="180" y="158" fill="#8fd1a8">среднее геометрическое: √(a·b)</text>
        </g>
        <text x="180" y="204" text-anchor="middle" font-size="15" fill="#f4e9c8">для 4 и 9: (4+9)/2 = 6,5 · √36 = 6</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">арифметическое всегда не меньше геометрического</text>`;
    } else if(v===1){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#ffd76a">главное неравенство о средних</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="128" fill="#f4e9c8">(a+b)/2 ≥ √(a·b)</text>
        </g>
        <text x="180" y="172" text-anchor="middle" font-size="16" fill="#8fd1a8">для положительных a и b</text>
        <text x="180" y="204" text-anchor="middle" font-size="16" fill="#8fd1a8">равенство только при a = b</text>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">проверка на 4 и 9: 6,5 ≥ 6 ✔</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">почему это правда: квадрат разности</text>
        <g font-size="20" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="118" fill="#f4e9c8">(√a − √b)² ≥ 0 — всегда!</text>
          <text x="180" y="148" fill="#7fd1ff">a − 2√(ab) + b ≥ 0</text>
          <text x="180" y="178" fill="#8fd1a8">a + b ≥ 2√(ab)</text>
        </g>
        <text x="180" y="216" text-anchor="middle" font-size="16" fill="#ffd76a">делим на 2 — получаем (a+b)/2 ≥ √(ab)</text>
        <text x="180" y="238" text-anchor="middle" font-size="12" fill="#8fa08f">квадрат любого числа неотрицателен — вот и всё!</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">применяем: x + 4/x при x > 0</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="116" fill="#f4e9c8">x + 4/x — сумма двух чисел</text>
          <text x="180" y="148" fill="#7fd1ff">их произведение: x·(4/x) = 4</text>
          <text x="180" y="180" fill="#8fd1a8">значит, x + 4/x ≥ 2·√4 = 4</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#ffd76a">минимум равен 4 при x = 2</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">когда достигается минимум: a = b</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="118" fill="#f4e9c8">x = 4/x → x² = 4 → x = 2</text>
          <text x="180" y="152" fill="#7fd1ff">при x = 2: 2 + 4/2 = 2 + 2 = 4</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="17" font-weight="bold" fill="#8fd1a8">равенство → минимум достигнут</text>
        <text x="180" y="228" text-anchor="middle" font-size="13" fill="#8fa08f">в точке минимума оба числа равны друг другу</text>`;
    } else if(v===5){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">средние для 8 и 12</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#7fd1ff">(8 + 12)/2 = 10</text>
          <text x="180" y="158" fill="#8fd1a8">√(8·12) = √96 ≈ 9,8</text>
        </g>
        <text x="180" y="198" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a">10 ≥ 9,8 — неравенство работает!</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">арифметическое чуть больше — они равны лишь при a=b</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">где это применяют в олимпиадах</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="122">доказать x + 1/x ≥ 2 (при x>0)</text>
          <text x="180" y="152" fill="#7fd1ff">найти минимум a + b при a·b = const</text>
          <text x="180" y="182" fill="#8fd1a8">оценить площадь при заданном периметре</text>
        </g>
        <text x="180" y="220" text-anchor="middle" font-size="14" fill="#ffd76a">главный инструмент задач на минимум и максимум</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">среднее арифметическое чисел 8 и 12</text>
        <text x="180" y="152" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffd76a" class="c2a-spark">(8+12)/2 = ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="15" fill="#8fa08f">сложи и раздели на два</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14241c"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f7a5f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#8fd1a8">Неравенство о средних</text>
      ${m}</svg>`; }

  /* --- 411: принцип крайнего (выбираем крайний элемент) --- */
  function extSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">крайний элемент — самый-самый</text>
        <g font-size="30">
          <text x="40" y="136" fill="#f4e9c8">5</text><text x="110" y="136" fill="#f4e9c8">2</text>
          <text x="180" y="136" fill="#f4e9c8">7</text><text x="250" y="136" fill="#f4e9c8">4</text>
        </g>
        <rect x="232" y="106" width="46" height="46" rx="10" fill="rgba(255,215,106,.25)" stroke="#ffd76a" stroke-width="3"/>
        <text x="255" y="104" text-anchor="middle" font-size="12" fill="#ffd76a">самое большое!</text>
        <text x="180" y="200" text-anchor="middle" font-size="15" fill="#8fd1a8">изучаем крайний — обычно он и есть ключ</text>
        <text x="180" y="228" text-anchor="middle" font-size="13" fill="#8fa08f">самый большой, самый маленький, самый близкий…</text>`;
    } else if(v===1){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">из трёх чисел два — одной чётности</text>
        <g font-size="28">
          <text x="60" y="132" fill="#7fd1ff">чёт</text><text x="150" y="132" fill="#7fd1ff">чёт</text><text x="250" y="132" fill="#e86a5a">нечет</text>
        </g>
        <rect x="40" y="150" width="60" height="34" rx="8" fill="rgba(79,141,255,.2)" stroke="#7fd1ff" stroke-width="2"/>
        <rect x="130" y="150" width="60" height="34" rx="8" fill="rgba(79,141,255,.2)" stroke="#7fd1ff" stroke-width="2"/>
        <text x="180" y="200" text-anchor="middle" font-size="16" fill="#ffd76a">клеток чётности всего 2 — а чисел 3!</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">по принципу Дирихле двое попадут в одну клетку</text>`;
    } else if(v===2){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">обобщение: остатки по модулю m</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">остатков по mod m — ровно m</text>
          <text x="180" y="158" fill="#7fd1ff">0, 1, 2, …, m−1</text>
        </g>
        <text x="180" y="198" text-anchor="middle" font-size="17" fill="#8fd1a8">m+1 чисел → два с одним остатком!</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">их разность делится на m — мощный приём</text>`;
    } else if(v===3){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">пример: 4 числа, остатки по mod 3</text>
        <g font-size="22">
          <text x="60" y="130" fill="#f4e9c8">ост.0</text><text x="150" y="130" fill="#f4e9c8">ост.1</text><text x="240" y="130" fill="#f4e9c8">ост.2</text>
        </g>
        <g font-size="26">
          <text x="96" y="176" fill="#ffd76a">a</text><text x="186" y="176" fill="#ffd76a">b</text>
        </g>
        <rect x="40" y="150" width="120" height="40" rx="10" fill="rgba(79,141,255,.2)" stroke="#7fd1ff" stroke-width="2"/>
        <text x="180" y="222" text-anchor="middle" font-size="16" fill="#8fd1a8">a и b имеют одинаковый остаток → a − b ⋮ 3</text>`;
    } else if(v===4){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">выбираем крайний: наибольший делитель</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="120" fill="#f4e9c8">у числа n больше 1 есть простой делитель</text>
          <text x="180" y="154" fill="#7fd1ff">возьмём его НАИМЕНЬШИЙ делитель d &gt; 1</text>
        </g>
        <text x="180" y="192" text-anchor="middle" font-size="16" fill="#8fd1a8">d — простой: иначе был бы делитель меньше</text>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">противоречие с выбором — классика принципа крайнего</text>`;
    } else if(v===5){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">идея «наименьший контрпример»</text>
        <g font-size="20" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="120" fill="#f4e9c8">доказываем про ВСЕ числа</text>
          <text x="180" y="150" fill="#7fd1ff">есть контрпример — берём наименьший</text>
          <text x="180" y="180" fill="#8fd1a8">из него построим меньший — противоречие!</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="15" fill="#ffd76a">контрпримеров нет — доказано!</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">когда применять принцип крайнего</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="122">нужно доказать, что «что-то всегда есть»</text>
          <text x="180" y="152" fill="#7fd1ff">надо найти максимум или минимум</text>
          <text x="180" y="182" fill="#8fd1a8">доказательство от противного зашло в тупик</text>
        </g>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fd1a8">выбери крайний и разгляди его</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">остатков при делении на 2 — сколько?</text>
        <text x="180" y="152" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffd76a" class="c2a-spark">mod 2: ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="15" fill="#8fa08f">чётные и нечётные — их два: 0 и 1</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#231a2a"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#a05a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#ff8ac0">Принцип крайнего</text>
      ${m}</svg>`; }

  /* --- 412: игры и раскраски (доска 7×7, домино) --- */
  function game7SVG(fr){
    const v=(fr&&fr.v)||0;
    let board='';
    for(let r=0;r<7;r++){ for(let c=0;c<7;c++){ const x=96+c*21, y=64+r*21;
      board+=`<rect x="${x}" y="${y}" width="21" height="21" fill="${(r+c)%2?'#2f8fc4':'#cfe0ff'}" stroke="#0f1a24" stroke-width="1"/>`; } }
    let m='';
    if(v===0){
      m=`
        ${board}
        <text x="180" y="228" text-anchor="middle" font-size="17" font-weight="bold" fill="#ffd76a">7·7 = 49 клеток</text>`;
    } else if(v===1){
      m=`
        ${board}
        <rect x="92" y="64" width="50" height="25" rx="6" fill="rgba(255,215,106,.5)" stroke="#ffd76a" stroke-width="3"/>
        <text x="180" y="230" text-anchor="middle" font-size="14" fill="#8fd1a8">одна плитка = ровно 2 клетки (белая + чёрная)</text>`;
    } else if(v===2){
      m=`
        ${board}
        <text x="180" y="228" text-anchor="middle" font-size="16" font-weight="bold" fill="#e86a5a">49 : 2 — не делится нацело → НЕЛЬЗЯ!</text>`;
    } else if(v===3){
      m=`
        ${board}
        <text x="180" y="228" text-anchor="middle" font-size="15" fill="#8fd1a8">плитка: 1 синяя + 1 голубая</text>`;
    } else if(v===4){
      m=`
        ${board}
        <text x="180" y="228" text-anchor="middle" font-size="15" fill="#8fd1a8">25 синих, 24 голубых — не поровну!</text>`;
    } else if(v===5){
      m=`<text x="180" y="78" text-anchor="middle" font-size="16" fill="#b6d4e8">игра: кто не сходит — проиграл</text>
        <g font-size="22" text-anchor="middle">
          <text x="180" y="124" fill="#f4e9c8">49 ходов — последний делает первый</text>
          <text x="180" y="158" fill="#7fd1ff">нечётное число ходов → победа первого</text>
        </g>
        <text x="180" y="206" text-anchor="middle" font-size="17" font-weight="bold" fill="#8fd1a8">первый красит 49-ю → выигрывает</text>
        <text x="180" y="234" text-anchor="middle" font-size="13" fill="#8fa08f">чёт — второй, нечёт — первый: вот и вся стратегия</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">рецепт для игр и раскрасок</text>
        <g font-size="19" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="122">раскрась доску (шахматно, по цветам)</text>
          <text x="180" y="152" fill="#7fd1ff">посчитай клетки каждого цвета</text>
          <text x="180" y="182" fill="#8fd1a8">сравни с тем, что накрывает плитка/ход</text>
        </g>
        <text x="180" y="224" text-anchor="middle" font-size="15" fill="#ffd76a">не сходится → «нельзя»!</text>`;
    } else {
      m=`<text x="180" y="86" text-anchor="middle" font-size="16" fill="#b6d4e8">сколько клеток в доске 7×7?</text>
        <text x="180" y="146" text-anchor="middle" font-size="36" font-weight="bold" fill="#ffd76a" class="c2a-spark">7·7 = ?</text>
        <text x="180" y="198" text-anchor="middle" font-size="15" fill="#8fa08f">семь рядов по семь клеток</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14242e"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#2f8fc4" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#7fd1ff">Игры и раскраски · доска 7×7</text>
      ${m}</svg>`; }

  /* --- 13: чётность (чёт/нечет: пары, суммы, произведения) --- */
  function paritySVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    if(v===0){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">поделить на 2 без остатка — можно или нет?</text>
        <g font-size="22">
          <text x="60" y="122" fill="#8fd1a8">2 4 6 8 10…</text>
          <text x="60" y="152" fill="#ff8ac0">1 3 5 7 9…</text>
        </g>
        <rect x="52" y="98" width="120" height="30" rx="8" fill="rgba(143,209,168,.14)"/>
        <rect x="52" y="128" width="120" height="30" rx="8" fill="rgba(255,138,192,.14)"/>
        <text x="180" y="200" text-anchor="middle" font-size="16" fill="#ffd76a">11 конфет на двоих? 11:2 не делится!</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">чётные делятся на 2 · нечётные — нет</text>`;
    } else if(v===1){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">признак: смотрим на ПОСЛЕДНЮЮ цифру</text>
        <g font-size="24">
          <text x="52" y="124" fill="#8fd1a8">0 2 4 6 8 → чётное</text>
          <text x="52" y="158" fill="#ff8ac0">1 3 5 7 9 → нечётное</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="17" fill="#f4e9c8">847? кончается на 7 → нечётное!</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">быстрый способ — и не надо делить</text>`;
    } else if(v===2){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">чёт + чёт = чёт</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#8fd1a8">2 + 4 = 6</text>
          <text x="180" y="154" fill="#8fd1a8">10 + 8 = 18</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="16" fill="#f4e9c8">пары никуда не деваются!</text>
        <text x="180" y="226" text-anchor="middle" font-size="14" fill="#8fa08f">два чётных складываются в чётное — всегда</text>`;
    } else if(v===3){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">чёт + нечёт = нечёт</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#8fd1a8">4 + 1 = 5</text>
          <text x="180" y="154" fill="#ffd76a">10 + 7 = 17</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="16" fill="#f4e9c8">у нечётного остаётся «лишняя единица»</text>
        <text x="180" y="226" text-anchor="middle" font-size="14" fill="#8fa08f">паре не с кем составиться — она и лишняя</text>`;
    } else if(v===4){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">нечёт + нечёт = чёт!</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#ffd76a">3 + 5 = 8</text>
          <text x="180" y="154" fill="#ffd76a">11 + 13 = 24</text>
        </g>
        <text x="180" y="196" text-anchor="middle" font-size="16" fill="#f4e9c8">две «лишние единицы» складываются в пару!</text>
        <text x="180" y="226" text-anchor="middle" font-size="14" fill="#8fa08f">лишняя+лишняя = ровно пара</text>`;
    } else if(v===5){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">вычитание — как сложение</text>
        <g font-size="22" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="118" fill="#8fd1a8">чёт − чёт = чёт · 10−4 = 6</text>
          <text x="180" y="150" fill="#ff8ac0">чёт − нечёт = нечёт · 10−3 = 7</text>
          <text x="180" y="182" fill="#ffd76a">нечёт − нечёт = чёт · 9−3 = 6</text>
        </g>
        <text x="180" y="226" text-anchor="middle" font-size="14" fill="#8fa08f">правила те же — минус пары не ломает</text>`;
    } else if(v===6){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">умножение: один чётный — всё чётное!</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="122" fill="#8fd1a8">2·4 = 8 · 4·5 = 20 · 6·9 = 54</text>
        </g>
        <text x="180" y="164" text-anchor="middle" font-size="17" fill="#ffd76a">чётный множитель → произведение чётное</text>
        <text x="180" y="200" text-anchor="middle" font-size="15" fill="#8fa08f">пара в одном множителе «размножается»</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">3·4·5: четвёрка делает всё произведение чётным</text>`;
    } else if(v===7){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">нечёт × нечёт = нечёт (клетки 3×3)</text>
        <g font-size="24" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="118" fill="#8fd1a8">3·3 = 9 · 5·7 = 35</text>
        </g>
        <rect x="140" y="136" width="80" height="80" fill="rgba(143,209,168,.12)" stroke="#8fd1a8" stroke-width="2"/>
        <g fill="#ffd76a">
          <circle cx="154" cy="150" r="4"/><circle cx="172" cy="150" r="4"/><circle cx="190" cy="150" r="4"/>
          <circle cx="154" cy="168" r="4"/><circle cx="172" cy="168" r="4"/><circle cx="190" cy="168" r="4"/>
          <circle cx="154" cy="186" r="4"/><circle cx="172" cy="186" r="4"/><circle cx="190" cy="186" r="4"/>
        </g>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">все клетки парные, кроме одной «лишней»</text>`;
    } else if(v===8){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#b6d4e8">сумма многих: считаем НЕЧЁТНЫЕ слагаемые</text>
        <g font-size="20" font-family="Georgia,serif" text-anchor="middle">
          <text x="180" y="116" fill="#f4e9c8">1+2+…+99: нечётных ровно 50</text>
          <text x="180" y="148" fill="#8fd1a8">50 — чётно → сумма чётная!</text>
          <text x="180" y="182" fill="#f4e9c8">1·2·…·100: есть множитель 2</text>
          <text x="180" y="214" fill="#ffd76a">→ произведение чётное, считать не надо!</text>
        </g>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">два нечётных числа складываем</text>
        <text x="180" y="150" text-anchor="middle" font-size="38" font-weight="bold" fill="#ffd76a" class="c2a-spark">нечёт+нечёт = ?</text>
        <text x="180" y="204" text-anchor="middle" font-size="16" fill="#8fd1a8">две лишние единицы — они дают пару!</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#1e2433"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#a05a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#ff8ac0">Чётность: суммы и произведения</text>
      ${m}</svg>`; }

  /* --- 17: дни недели и остатки (круг-неделя, mod 7) --- */
  function weekSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const days=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    let ring='';
    for(let i=0;i<7;i++){
      const a=-90+i*(360/7), a2=a+360/7;
      const x1=180+86*Math.cos(a*Math.PI/180), y1=120+86*Math.sin(a*Math.PI/180);
      const x2=180+86*Math.cos(a2*Math.PI/180), y2=120+86*Math.sin(a2*Math.PI/180);
      const lx=180+58*Math.cos((a+a2)/2*Math.PI/180), ly=120+58*Math.sin((a+a2)/2*Math.PI/180);
      ring+=`<path d="M180 120 L${x1.toFixed(1)} ${y1.toFixed(1)} A86 86 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="rgba(127,209,255,${i===0?0.22:0.08})" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>
        <text x="${lx.toFixed(1)}" y="${(ly+5).toFixed(1)}" text-anchor="middle" font-size="12" fill="${i===0?'#ffd76a':'#cfe0ff'}">${days[i]}</text>`;
    }
    if(v===0){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">неделя — «часы» с 7 делениями</text>
        ${ring}
        <text x="180" y="226" text-anchor="middle" font-size="15" fill="#f4e9c8">через 7 дней — тот же день!</text>`;
    } else if(v===1){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">10 дней = 1 неделя + 3 дня</text>
        ${ring}
        <text x="180" y="226" text-anchor="middle" font-size="16" font-weight="bold" fill="#ffd76a">сдвигаемся на 3 дня — не на 10!</text>`;
    } else if(v===2){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">остаток от деления на 7</text>
        ${ring}
        <g font-size="17" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="210">10 = 7·1 + 3 → плюс 3 дня</text>
        </g>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">работает только остаток!</text>`;
    } else if(v===3){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">понедельник + 10 дней</text>
        ${ring}
        <g font-size="17" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="210">Пн + 3 = Чт</text>
          <text x="180" y="230" font-size="14" fill="#8fd1a8">четверг — 4-й день недели</text>
        </g>`;
    } else if(v===4){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">через 30 дней</text>
        ${ring}
        <g font-size="17" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="208">30 = 4·7 + 2 → +2 дня</text>
          <text x="180" y="230" font-size="15" fill="#ffd76a">Пн + 2 = Ср</text>
        </g>`;
    } else if(v===5){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">через 100 дней?</text>
        ${ring}
        <g font-size="17" fill="#f4e9c8" text-anchor="middle">
          <text x="180" y="208">100 = 14·7 + 2 → +2 дня</text>
          <text x="180" y="230" font-size="15" fill="#ffd76a">Пн + 2 = Ср</text>
        </g>`;
    } else if(v===6){
      m=`<text x="180" y="52" text-anchor="middle" font-size="15" fill="#b6d4e8">главный секрет — остаток!</text>
        ${ring}
        <text x="180" y="210" text-anchor="middle" font-size="15" fill="#8fd1a8">день = сдвиг на остаток от N : 7</text>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">полные недели ничего не меняют</text>`;
    } else {
      m=`<text x="180" y="60" text-anchor="middle" font-size="15" fill="#b6d4e8">сегодня понедельник</text>
        ${ring}
        <text x="180" y="216" text-anchor="middle" font-size="18" font-weight="bold" fill="#ffd76a" class="c2a-spark">+7 дней → ?</text>
        <text x="180" y="238" text-anchor="middle" font-size="13" fill="#8fa08f">полная неделя = тот же день</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#17253d"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#3f6a9f" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#7fd1ff">Дни недели и остатки</text>
      ${m}</svg>`; }

  /* --- 21: числа из цифр без повторов (замок, правило умножения) --- */
  function lockSVG(fr){
    const v=(fr&&fr.v)||0;
    let m='';
    const lock=`<rect x="150" y="52" width="60" height="44" rx="8" fill="rgba(217,164,65,.18)" stroke="#d9a441" stroke-width="3"/>
      <circle cx="180" cy="80" r="4" fill="#d9a441"/>
      <path d="M172 60 v-8 a8 8 0 0 1 16 0 v8" fill="none" stroke="#d9a441" stroke-width="3"/>
      <text x="180" y="44" text-anchor="middle" font-size="13" fill="#ffd76a">код</text>`;
    if(v===0){
      m=`<text x="180" y="88" text-anchor="middle" font-size="16" fill="#b6d4e8">из цифр 1, 2, 3 — двузначный код без повторов</text>
        ${lock}
        <g font-size="26">
          <text x="100" y="132" fill="#7fd1ff">1</text><text x="172" y="132" fill="#7fd1ff">2</text><text x="244" y="132" fill="#7fd1ff">3</text>
        </g>
        <text x="180" y="176" text-anchor="middle" font-size="15" fill="#8fd1a8">сколько кодов? считаем по шагам!</text>
        <text x="180" y="214" text-anchor="middle" font-size="14" fill="#8fa08f">повторять цифры нельзя</text>`;
    } else if(v===1){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">шаг 1: выбираем ПЕРВУЮ цифру</text>
        <g font-size="30">
          <text x="90" y="140" fill="#7fd1ff">1</text><text x="170" y="140" fill="#8fd1a8">2</text><text x="250" y="140" fill="#ffd76a">3</text>
        </g>
        <text x="180" y="188" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffd76a">3 способа</text>
        <text x="180" y="222" text-anchor="middle" font-size="14" fill="#8fa08f">любая цифра может стоять первой</text>`;
    } else if(v===2){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">шаг 2: вторая — из ОСТАВШИХСЯ</text>
        <g font-size="30">
          <text x="110" y="140" fill="#8fa08f">?</text><text x="170" y="140" fill="#8fd1a8">?</text>
        </g>
        <text x="180" y="190" text-anchor="middle" font-size="19" font-weight="bold" fill="#ffd76a">осталось 2 цифры</text>
        <text x="180" y="224" text-anchor="middle" font-size="14" fill="#8fa08f">повторять нельзя — одну уже поставили</text>`;
    } else if(v===3){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">правило умножения: 3 · 2</text>
        <g font-size="34" text-anchor="middle">
          <text x="180" y="128" fill="#ffd76a">3 · 2 = 6</text>
        </g>
        <g font-size="20" fill="#8fd1a8" text-anchor="middle">
          <text x="180" y="160">12 13 · 21 23 · 31 32</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="15" fill="#f4e9c8">порядок важен: 12 ≠ 21!</text>
        <text x="180" y="228" text-anchor="middle" font-size="14" fill="#8fa08f">первый выбор m, второй n → m·n</text>`;
    } else if(v===4){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">из цифр 1..5: двузначные</text>
        <g font-size="24" text-anchor="middle">
          <text x="180" y="126" fill="#f4e9c8">первая — 5 способов</text>
          <text x="180" y="158" fill="#7fd1ff">вторая — 4 (без повторов)</text>
          <text x="180" y="196" fill="#ffd76a">5 · 4 = 20 чисел</text>
        </g>
        <text x="180" y="230" text-anchor="middle" font-size="14" fill="#8fa08f">каждый выбор уменьшает число вариантов</text>`;
    } else if(v===5){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">трёхзначные из 1..5</text>
        <g font-size="22" text-anchor="middle">
          <text x="180" y="124" fill="#8fd1a8">первая: 5 · вторая: 4 · третья: 3</text>
          <text x="180" y="160" fill="#ffd76a">5 · 4 · 3 = 60 чисел</text>
        </g>
        <text x="180" y="200" text-anchor="middle" font-size="15" fill="#f4e9c8">множители убывают: 5, 4, 3…</text>
        <text x="180" y="228" text-anchor="middle" font-size="13" fill="#8fa08f">умножай по очереди: 5·4=20, 20·3=60</text>`;
    } else if(v===6){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">берём ВСЕ 5 цифр — перестановки</text>
        <g font-size="24" text-anchor="middle">
          <text x="180" y="128" fill="#f4e9c8">5·4·3·2·1</text>
          <text x="180" y="166" fill="#ffd76a">= 120 перестановок</text>
        </g>
        <text x="180" y="208" text-anchor="middle" font-size="15" fill="#8fd1a8">число 5! читается «пять факториал»</text>
        <text x="180" y="232" text-anchor="middle" font-size="13" fill="#8fa08f">единица в конце ничего не меняет</text>`;
    } else if(v===7){
      m=`<text x="180" y="76" text-anchor="middle" font-size="16" fill="#ffd0c0">ЛОВУШКА: цифра 0!</text>
        <g font-size="21" text-anchor="middle">
          <text x="180" y="114" fill="#f4e9c8">из 0, 1, 2 двузначные?</text>
          <text x="180" y="146" fill="#ffd0c0">первая не может быть 0 (01 = 1)</text>
          <text x="180" y="178" fill="#ffd76a">первая: 2 способа · вторая: 2</text>
          <text x="180" y="210" fill="#8fd1a8">2 · 2 = 4: 10, 12, 20, 21</text>
        </g>`;
    } else if(v===8){
      m=`<text x="180" y="80" text-anchor="middle" font-size="16" fill="#b6d4e8">из всех 10 цифр (0..9)</text>
        <g font-size="24" text-anchor="middle">
          <text x="180" y="126" fill="#f4e9c8">двузначных без повторов</text>
          <text x="180" y="162" fill="#7fd1ff">первая — 9 (не 0) · вторая — 9</text>
          <text x="180" y="200" fill="#ffd76a">9 · 9 = 81 число</text>
        </g>
        <text x="180" y="230" text-anchor="middle" font-size="13" fill="#8fa08f">ноль в начале запрещён — он «невидим»</text>`;
    } else {
      m=`<text x="180" y="92" text-anchor="middle" font-size="16" fill="#b6d4e8">цифры 1, 2, 3 · двузначные · без повторов</text>
        ${lock}
        <text x="180" y="150" text-anchor="middle" font-size="30" font-weight="bold" fill="#ffd76a" class="c2a-spark">3 · 2 = ?</text>
        <text x="180" y="200" text-anchor="middle" font-size="15" fill="#8fd1a8">первая — 3 способа, вторая — 2</text>`;
    }
    return `<svg viewBox="0 0 360 240" preserveAspectRatio="xMidYMid meet" class="c2-scene">
      <rect x="0" y="0" width="360" height="240" fill="#14242e"/>
      <rect x="8" y="8" width="344" height="224" rx="10" fill="none" stroke="#2f8fc4" stroke-width="4"/>
      <text x="18" y="54" font-size="18" font-weight="bold" fill="#7fd1ff">Числа из цифр без повторов</text>
      ${m}</svg>`; }

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
    else if(scene==='stage') base=stageSVG();
    else if(scene==='factory') base=factorySVG();
    else if(scene==='table') base=tableSVG();
    else if(scene==='lab') base=labSVG();
    else if(scene==='hive') base=hiveSVG();
    else if(scene==='library') base=librarySVG();
    else if(scene==='flat') base=flatSVG();
    else if(scene==='toys') base=toysSVG();
    else if(scene==='clock') base=clockSVG();
    else if(scene==='ship') base=shipSVG();
    else if(scene==='yard') base=yardSVG();
    else if(scene==='blueprint') base=blueprintSVG();
    else if(scene==='school') base=schoolSVG();
    else if(scene==='ice') base=iceSVG();
    else if(scene==='tile') base=tileSVG();
    else if(scene==='scale') base=scaleSVG();
    else if(scene==='sandbox') base=sandboxSVG();
    else if(scene==='road') base=roadSVG();
    else if(scene==='div39') base=div39SVG();
    else if(scene==='sieve') base=sieveSVG();
    else if(scene==='euclid') base=euclidSVG();
    else if(scene==='coord') base=coordSVG();
    else if(scene==='sym') base=symSVG();
    else if(scene==='prob') base=probSVG();
    else if(scene==='est') base=estSVG();
    else if(scene==='avg') base=avgSVG();
    else if(scene==='pour') base=pourSVG();
    else if(scene==='divmod') base=divmodSVG();
    else if(scene==='pct') base=pctSVG();
    else if(scene==='cut') base=cutSVG();
    else if(scene==='tri') base=triSVG();
    else if(scene==='prod') base=prodSVG();
    else if(scene==='game20') base=game20SVG();
    else if(scene==='euler') base=eulerSVG();
    else if(scene==='pick') base=pickSVG();
    else if(scene==='div10') base=div10SVG();
    else if(scene==='comb') base=combSVG();
    else if(scene==='dir') base=dirSVG();
    else if(scene==='domino') base=dominoSVG();
    else if(scene==='inv') base=invSVG();
    else if(scene==='poly') base=polySVG(fr);
    else if(scene==='fact') base=factSVG(fr);
    else if(scene==='syst') base=systSVG(fr);
    else if(scene==='linf') base=linfSVG(fr);
    else if(scene==='neq') base=neqSVG(fr);
    else if(scene==='cong') base=congSVG(fr);
    else if(scene==='med') base=medSVG(fr);
    else if(scene==='par') base=parSVG(fr);
    else if(scene==='mod') base=modSVG(fr);
    else if(scene==='cmp') base=cmpSVG(fr);
    else if(scene==='prm') base=prmSVG(fr);
    else if(scene==='avg7') base=avg7SVG(fr);
    else if(scene==='ext') base=extSVG(fr);
    else if(scene==='game7') base=game7SVG(fr);
    else if(scene==='parity') base=paritySVG(fr);
    else if(scene==='week') base=weekSVG(fr);
    else if(scene==='lock') base=lockSVG(fr);
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
      /* Норма касания 44 px: кнопка была 30 px — по стандарту проекта это
         промах пальцем. Визуальный кружок оставляем прежним, а цель касания
         расширяем невидимой рамкой. */
      .comic-top .ct-x { position:relative; background:none; border:2px solid #33291e; border-radius:50%;
        width:34px; height:34px; font-size:16px; line-height:1; color:#33291e; cursor:pointer;
        font-family:inherit; flex-shrink:0; }
      .comic-top .ct-x::after { content:""; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
        width:44px; height:44px; }
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
      /* Мысль-подсказка кадра: «что здесь важно заметить». Показывается ПОСЛЕ
         того, как реплика допечаталась, — иначе она перебивает саму реплику.
         Текст живёт в данных кадра (поле note), движок только показывает. */
      .c2-think { box-sizing:border-box; background:#1d3326; color:#eaf6ee; border-top:3px solid #4e7f2f;
        font-size:14px; line-height:1.45; padding:0 14px; display:flex; gap:8px; align-items:flex-start;
        max-height:0; opacity:0; overflow:hidden; transition:max-height .28s ease, opacity .28s ease, padding .28s ease; }
      .c2-think.on { max-height:88px; opacity:1; padding:8px 14px 9px; }
      .c2-think .ct-mark { flex:none; font-size:15px; line-height:1.35; }
      .c2-think .ct-txt { min-width:0; }
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
      .c2-stage.c2-bg-stage { background:linear-gradient(#8a5ac0,#6b3f9e 45%,#8a5a2b); }
      .c2-stage.c2-bg-factory { background:linear-gradient(#a8b4c8,#d8d2c8 45%,#8a8a92); }
      .c2-stage.c2-bg-table { background:linear-gradient(#ffe9c9,#f0d3a0 45%,#c89a6a); }
      .c2-stage.c2-bg-lab { background:linear-gradient(#b8c6da,#dbe4ee 45%,#8fa0b0); }
      .c2-stage.c2-bg-hive { background:linear-gradient(#bfe3a8,#8fc46a 45%,#7fb45c); }
      .c2-stage.c2-bg-library { background:linear-gradient(#c8b490,#b39a72 45%,#9c6c3a); }
      .c2-stage.c2-bg-flat { background:linear-gradient(#e0cfa8,#f0e0c0 45%,#c89a6a); }
      .c2-stage.c2-bg-toys { background:linear-gradient(#eacfa3,#f6e3c5 45%,#c89a6a); }
      .c2-stage.c2-bg-clock { background:linear-gradient(#8fd3f0,#5fb0d8 45%,#7fb45c); }
      .c2-stage.c2-bg-ship { background:linear-gradient(#8fd3f0,#4aa8d8 45%,#2f8fc4); }
      .c2-stage.c2-bg-yard { background:linear-gradient(#a8dcf0,#7fb45c 45%,#6aa34e); }
      .c2-stage.c2-bg-blueprint { background:linear-gradient(#b8d4c8,#9ab8a8 45%,#7a8a6a); }
      .c2-stage.c2-bg-school { background:linear-gradient(#f6e3c5,#e6cfa0 45%,#b3905f); }
      .c2-stage.c2-bg-ice { background:linear-gradient(#d8e8f8,#9fc4e8 45%,#4a90c8); }
      .c2-stage.c2-bg-tile { background:linear-gradient(#a8d2ea,#7fb8d8 45%,#c89a6a); }
      .c2-stage.c2-bg-scale { background:linear-gradient(#e0c8a0,#f0dcc0 45%,#c89a6a); }
      .c2-stage.c2-bg-sandbox { background:linear-gradient(#a8dcf0,#7fb45c 45%,#7fb45c); }
      .c2-stage.c2-bg-road { background:linear-gradient(#a8dcf0,#8fc9e8 45%,#7fb45c); }
      .c2-stage.c2-bg-div39 { background:linear-gradient(#1e3a2f,#17302a 45%,#0f241c); }
      .c2-stage.c2-bg-sieve { background:linear-gradient(#14241c,#0f1c16 45%,#0a140f); }
      .c2-stage.c2-bg-euclid { background:linear-gradient(#1e3a2f,#17302a 45%,#0f241c); }
      .c2-stage.c2-bg-coord { background:linear-gradient(#17253d,#12203a 45%,#0c1730); }
      .c2-stage.c2-bg-sym { background:linear-gradient(#2a1f4a,#241a3e 45%,#180f30); }
      .c2-stage.c2-bg-prob { background:linear-gradient(#14241c,#101c15 45%,#0a140f); }
      .c2-stage.c2-bg-est { background:linear-gradient(#1e2a3d,#182338 45%,#101a2c); }
      .c2-stage.c2-bg-avg { background:linear-gradient(#16251c,#122017 45%,#0c1a11); }
      .c2-stage.c2-bg-pour { background:linear-gradient(#16243a,#122038 45%,#0c1628); }
      .c2-stage.c2-bg-divmod { background:linear-gradient(#1e2a3d,#182338 45%,#101a2c); }
      .c2-stage.c2-bg-pct { background:linear-gradient(#231a10,#1c140c 45%,#140d08); }
      .c2-stage.c2-bg-cut { background:linear-gradient(#16251c,#122017 45%,#0c1a11); }
      .c2-stage.c2-bg-tri { background:linear-gradient(#1e2a3d,#182338 45%,#101a2c); }
      .c2-stage.c2-bg-prod { background:linear-gradient(#231a10,#1c140c 45%,#140d08); }
      .c2-stage.c2-bg-game20 { background:linear-gradient(#1e2433,#191f2c 45%,#12171f); }
      .c2-stage.c2-bg-euler { background:linear-gradient(#14241c,#101c15 45%,#0a140f); }
      .c2-stage.c2-bg-pick { background:linear-gradient(#1a1f2e,#151a26 45%,#0f131c); }
      .c2-stage.c2-bg-div10 { background:linear-gradient(#1e2a3d,#182338 45%,#101a2c); }
      .c2-stage.c2-bg-comb { background:linear-gradient(#231a10,#1c140c 45%,#140d08); }
      .c2-stage.c2-bg-dir { background:linear-gradient(#14241c,#101c15 45%,#0a140f); }
      .c2-stage.c2-bg-domino { background:linear-gradient(#16251c,#122017 45%,#0c1a11); }
      .c2-stage.c2-bg-inv { background:linear-gradient(#1e2433,#191f2c 45%,#12171f); }
      /* Рисунок сцены занимал только верхнюю треть кадра: при сцене 378x663
         (телефон) он выходил 378x221, а остальное заливалось ровным цветом.
         С эмодзи это было незаметно, с нарисованными сценами бросается в глаза.
         Растягиваем на всю высоту и прижимаем к низу: лишнее уходит из-под
         верхней кромки (небо), земля и предметы остаются на месте. */
      /* Пейзаж рисуется своей пропорцией в потоке: раньше он лежал абсолютно
         поверх сцены и занимал лишь её треть (378x221 при 663), а низ заливался
         ровным цветом. Растянуть его на всю высоту тоже нельзя — верх сцены
         обрезается. Поэтому сцена идёт первой, герои и облачко — под ней. */
      .c2-stage .c2-scene { position:relative; width:100%; height:auto; max-height:64%; display:block;
        margin:0 auto; box-shadow:0 12px 18px -12px rgba(0,0,0,.45); }
      .c2-cast { position:relative; display:flex; align-items:flex-end; justify-content:space-between;
        gap:8px; padding:6px 12px 2px; pointer-events:none; z-index:4; }
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
      .c2-talk { position:relative; z-index:6; margin:0 12px 8px; background:#fff; border:4px solid #33291e;
        border-radius:18px; padding:11px 16px 13px; font-size:16px; line-height:1.5;
        box-shadow:0 6px 16px rgba(0,0,0,.22); animation:c2talk .3s cubic-bezier(.2,1.6,.4,1) both; }
      /* хвостик облачка смотрит вниз, к героям, которые теперь стоят под ним */
      .c2-talk::before { content:""; position:absolute; left:44px; top:100%;
        border:10px solid transparent; border-top:16px solid #33291e; border-bottom:0; }
      .c2-talk::after { content:""; position:absolute; left:48px; top:100%;
        border:6px solid transparent; border-top:12px solid #fff; border-bottom:0; }
      .c2-page.st .c2-stage { min-height:0; }
      .c2-stepbar { box-sizing:border-box; min-height:120px; max-height:38%; overflow:auto;
        background:#182a3d; color:#eef2f7; padding:12px 18px 14px; border-top:5px solid #d9a441;
        display:flex; flex-direction:column; gap:6px; }
      .c2-stepbar h3 { color:#ffd76a; font-size:20px; line-height:1.3; margin:0; }
      .c2-stepbar p { font-size:16px; line-height:1.55; margin:0; color:#f2f5fa; }
      .c2-stepbar .c2cap-tag { color:#9fc0e8; font-weight:bold; letter-spacing:.08em; }

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
    if(L.mode==='steps'){ renderSteps(); return; }
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
    /* Слой украшений из эмодзи убран: он клался ПОВЕРХ рисунка сцены и был
       собран из картинок чужого шрифта — на фоне нарисованных травы и цветов
       это читалось как случайные наклейки. Траву и цветы теперь рисует сама
       сцена своим кодом (см. сим()). */
    root.innerHTML=`<div class="comic-top">
        <span class="ct-book">📖 ${escHtml(emojiFor(scene))} КОМИКС</span>
        <span class="ct-title">${escHtml(L.title)}</span>
        <button class="ct-x" onclick="COMIC.close()">✕</button>
      </div>
      <div class="c2-page">
        <div class="c2-stage c2-fresh c2-bg-${scene}" id="c2stage">
          ${sceneArt(scene, fr)}
          <div class="c2-talk" id="c2cur"><span class="c2-say"></span><span class="c2-caret"></span></div>
          <div class="c2-cast${many?' c2-many':(solo?' c2-solo':'')}">
            ${heroHTML(who, emo, 'talker')}
            ${(fr.with||[]).filter(w=>w!==who).slice(0,2).map((w,i)=>heroHTML(w,'smile','listener-'+(i+1))).join('')}
          </div>
        </div>
        <div class="c2-capbar"><span class="c2cap-tag">${idx+1}/${frs.length} · </span><span class="c2cap-in">${escHtml(fr.cap||'')}</span></div>
        ${fr.note?`<div class="c2-think" id="c2note"><span class="ct-mark">💡</span><span class="ct-txt">${escHtml(fr.note)}</span></div>`:''}
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
    /* Облачко сначала измеряем, потом ставим. Раньше ширина бралась как 56 %
       сцены, и на узком экране текст в 20 слов не влезал: облачко вылезало за
       верх сцены, а сцена обрезает по overflow:hidden — хвост реплики пропадал
       («В лесу у дупла переполох» превращалось в «...перепол»). Теперь ширина
       начинается с 74 % сцены, а если высоты всё равно не хватает, кегль
       снижается шагами до 13 px — но не меньше. */
    /* Облачко больше не позиционируется по голове героя: сцена, облачко и
       герои идут в потоке друг за другом, поэтому привязка не нужна. */
    // печать реплики по буквам
    const cur=document.getElementById('c2cur'); const say=cur.querySelector('.c2-say'); const caret=cur.querySelector('.c2-caret');
    const text=fr.say||''; say.textContent=''; caret.style.visibility='visible';
    let i=0;
    const tick=()=>{ if(!root||root.style.display==='none') return;
      say.textContent=text.slice(0,++i);
      if(i<text.length){ tmr=setTimeout(tick, text.length>70?18:28); } else { caret.style.visibility='hidden';
        try{ document.getElementById('c2cur').classList.add('ready'); }catch(e){}
        /* мысль появляется после реплики — сначала ребёнок читает слова героя */
        try{ const з=document.getElementById('c2note'); if(з) setTimeout(()=>з.classList.add('on'),140); }catch(e){} } };
    if(tmr){clearTimeout(tmr);} tmr=setTimeout(tick,160);
  }

  function renderSteps(){
    const frs=L.comic; const fr=frs[idx]; const scene=L.scene||'board';
    const last=idx>=frs.length-1;
    const dots=frs.map((_,i)=>`<span class="cn-dot ${i===idx?'on':''}"></span>`).join('');
    root.innerHTML=`<div class="comic-top">
        <span class="ct-book">🧮 ВИЗУАЛЬНЫЙ УРОК</span>
        <span class="ct-title">${escHtml(L.title)}</span>
        <button class="ct-x" onclick="COMIC.close()">✕</button>
      </div>
      <div class="c2-page st">
        <div class="c2-stage c2-fresh c2-bg-${scene}" id="c2stage">${sceneArt(scene, fr)}</div>
        <div class="c2-stepbar"><span class="c2cap-tag">${idx+1}/${frs.length}</span>
          <h3>${escHtml(fr.t||'')}</h3>
          <p>${escHtml(fr.say||'')}</p>
        </div>
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
  }

  function step(d){ idx=Math.max(0,Math.min(L.comic.length-1,idx+d)); render(); }
  function next(){ if(idx<L.comic.length-1){ idx++; render(); } }
  function done(){ close(); try{ if(typeof lvToCheck==='function') lvToCheck(); }catch(e){} }
  return { open, close, step, next, done, isOpen };
})();
