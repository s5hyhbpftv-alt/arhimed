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
  const PERS={
    arch:{ svg:(e)=>humanSVG(e,'arch'), name:'Архимед', color:'#a3762a' },
    kid:{ svg:(e)=>humanSVG(e,'kid'), name:'Ты', color:'#4a93d0' },
    granny:{ svg:(e)=>humanSVG(e,'granny'), name:'Бабушка', color:'#7c4f81' },
    cat:{ svg:catSVG, name:'Барсик', color:'#c07a30' },
    fish:{ svg:fishSVG, name:'Рыбка', color:'#4a93d0' },
    coin:{ svg:coinSVG, name:'Монетка', color:'#8a6d1e' },
    pig:{ svg:pigSVG, name:'Пятачок', color:'#a05a50' }
  };

  /* ================= СЦЕНЫ-РАЗВОРОТЫ (SVG, всё стоит на поверхностях) ================= */
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
      <rect x="0" y="104" width="360" height="106" fill="url(#wtP)"/>
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
  function sceneArt(scene){
    if(scene==='pond') return pondSVG();
    if(scene==='kitchen') return kitchenSVG();
    if(scene==='coins') return coinsSVG();
    return pondSVG();
  }
  function emojiFor(scene){ return scene==='pond'?'🐟':scene==='kitchen'?'🥧':'🪙'; }

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
      .c2-page { flex:1; margin:4px 14px 10px; background:#fffdf4; border:6px solid #33291e;
        border-radius:10px; overflow:hidden; box-shadow:0 12px 34px rgba(0,0,0,.28);
        display:flex; flex-direction:column; position:relative; }
            .c2-stage { position:relative; width:100%; flex:0 0 auto; aspect-ratio:360/210;
        overflow:hidden; border-bottom:5px solid #33291e; background:#fffdf4; display:flex; align-items:center; justify-content:center; }
      .c2-scene { width:100%; height:100%; display:block; }
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
      @keyframes c2twinkle { 0%,100%{opacity:.25; transform:scale(.7);} 50%{opacity:1; transform:scale(1.2);} }
      .c2-caption { position:absolute; left:0; right:0; bottom:0; background:rgba(51,41,30,.92); color:#f4e9c8;
        font-size:12.5px; line-height:1.45; padding:7px 12px; }
      .c2-caption .c2cap-in { animation:c2capup .45s ease both; }
      @keyframes c2capup { from{ opacity:0; transform:translateY(9px);} to{ opacity:1; transform:none;} }
      .c2-caption .c2cap-tag { color:#d9a441; font-weight:bold; }
      /* диалог */
      .c2-dialog { position:relative; flex:1 1 auto; min-height:0; background:#fffaf0; display:flex; }
      .c2-speaker { width:124px; flex-shrink:0; display:flex; flex-direction:column; align-items:center;
        justify-content:flex-end; padding:4px 2px 8px; }
      .c2-speaker .c2s-card { width:112px; border-radius:16px; overflow:hidden;
        box-shadow:0 7px 18px rgba(0,0,0,.22); border:4px solid #33291e; background:#fff; }
      .c2-speaker .c2s-card svg { display:block; width:100%; height:auto; }
      .c2-speaker .c2s-name { margin-top:5px; font-size:12.5px; font-weight:bold; }
      .c2-bubbles { flex:1; display:flex; flex-direction:column; justify-content:center; gap:7px;
        padding:10px 12px 8px 4px; min-width:0; }
      .c2-bubble { position:relative; background:#fff; border:4px solid #33291e; border-radius:8px 20px 20px 20px;
        padding:10px 13px; font-size:15.5px; line-height:1.5; box-shadow:0 4px 12px rgba(0,0,0,.12); }
      .c2-bubble::before { content:""; position:absolute; left:-17px; top:15px; border:8px solid transparent;
        border-right-color:#33291e; border-left:0; }
      .c2-bubble .c2-caret { display:inline-block; width:2px; background:#33291e; animation:c2blink .8s steps(1) infinite; }
      @keyframes c2blink { 50%{ opacity:0; } }
      .c2-bubble.hist { opacity:.5; font-size:12.5px; padding:5px 10px; border-width:2px; }
      .c2-bubble.hist::before { display:none; }
      .c2-bubble.new { animation:c2pop .3s cubic-bezier(.2,1.7,.4,1) both; }
      @keyframes c2pop { from{ transform:scale(.5) translateY(9px); opacity:0;} to{ transform:none; opacity:1;} }
      .c2-speaker.new .c2s-card { animation:c2slide .4s ease both; }
      @keyframes c2slide { from{ transform:translateY(26px) scale(.9); opacity:0;} to{ transform:none; opacity:1;} }
      /* навигация */
      .comic-nav { display:flex; align-items:center; justify-content:space-between; gap:10px;
        padding:4px 14px 14px; }
      .comic-nav .cn-dots { flex:1; text-align:center; }
      .comic-nav .cn-dot { display:inline-block; width:9px; height:9px; border-radius:50%;
        background:#cbb897; margin:0 3px; transition:.15s; }
      .comic-nav .cn-dot.on { background:#33291e; transform:scale(1.35); }
      .cbtn { border:3px solid #33291e; background:#fff; color:#33291e; font-family:inherit;
        font-size:15px; font-weight:bold; border-radius:12px; padding:10px 18px; cursor:pointer;
        box-shadow:0 3px 0 #33291e; transition:.08s; }
      .cbtn:active { transform:translateY(2px); box-shadow:0 1px 0 #33291e; }
      .cbtn.primary { background:#f0c75e; border-color:#8a6d1e; box-shadow:0 3px 0 #8a6d1e; }
      .cbtn:disabled { opacity:.35; cursor:default; transform:none; box-shadow:0 3px 0 #33291e; }
      @media (max-width:430px){
        .c2-speaker{ width:98px; } .c2-speaker .c2s-card{ width:90px; }
        .c2-bubble{ font-size:14.5px; } .c2-bubble.hist{ font-size:12px; } }
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
    const emo=fr.emo||'smile';
    const last=idx>=frs.length-1;
    const hist=frs.slice(Math.max(0,idx-2),idx).map(h=>{
      const hp=PERS[h.who]||PERS.arch;
      return `<div class="c2-bubble hist"><b>${escHtml(hp.name)}:</b> ${escHtml(h.say)}</div>`;}).join('');
    const dots=frs.map((_,i)=>`<span class="cn-dot ${i===idx?'on':''}"></span>`).join('');
    root.innerHTML=`<div class="comic-top">
        <span class="ct-book">📖 ${escHtml(emojiFor(scene))} КОМИКС</span>
        <span class="ct-title">${escHtml(L.title)}</span>
        <button class="ct-x" onclick="COMIC.close()">✕</button>
      </div>
      <div class="c2-page">
        <div class="c2-stage">${sceneArt(scene)}
          <div class="c2-caption"><span class="c2cap-in"><span class="c2cap-tag">${idx+1}/${frs.length} · </span>${escHtml(fr.cap||'')}</span></div>
        </div>
        <div class="c2-dialog">
          <div class="c2-speaker">
            <div class="c2s-card">${pers.svg(emo)}</div>
            <div class="c2s-name" style="color:${pers.color}">${pers.name}</div>
          </div>
          <div class="c2-bubbles">
            ${hist}
            <div class="c2-bubble new" id="c2cur"><span class="c2-say"></span><span class="c2-caret"></span></div>
          </div>
        </div>
      </div>
      <div class="comic-nav">
        <button class="cbtn" onclick="COMIC.step(-1)" ${idx===0?'disabled':''}>◀ Назад</button>
        <span class="cn-dots">${dots}</span>
        ${last
          ? `<button class="cbtn primary" onclick="COMIC.done()">Понял! Проверю себя →</button>`
          : `<button class="cbtn primary" onclick="COMIC.next()">Дальше ▶</button>`}
      </div>`;
    // печать реплики по буквам
    const cur=document.getElementById('c2cur'); const say=cur.querySelector('.c2-say'); const caret=cur.querySelector('.c2-caret');
    const text=fr.say||''; say.textContent=''; caret.style.visibility='visible';
    let i=0;
    const tick=()=>{ if(!root||root.style.display==='none') return;
      say.textContent=text.slice(0,++i);
      if(i<text.length){ tmr=setTimeout(tick, text.length>70?20:30); } else { caret.style.visibility='hidden'; } };
    if(tmr){clearTimeout(tmr);} tmr=setTimeout(tick,200);
  }
  function step(d){ idx=Math.max(0,Math.min(L.comic.length-1,idx+d)); render(); }
  function next(){ if(idx<L.comic.length-1){ idx++; render(); } }
  function done(){ close(); try{ if(typeof lvToCheck==='function') lvToCheck(); }catch(e){} }
  return { open, close, step, next, done, isOpen };
})();
