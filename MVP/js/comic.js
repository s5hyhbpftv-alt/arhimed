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
    arch:{ svg:(e)=>humanSVG(e,'arch'), name:'Архимед', color:'#a3762a' },
    kid:{ svg:(e)=>kidSVG(e), name:'Ты', color:'#4a93d0' },
    granny:{ svg:(e)=>humanSVG(e,'granny'), name:'Бабушка', color:'#7c4f81' },
    cat:{ svg:catSVG, name:'Барсик', color:'#c07a30' },
    fish:{ svg:fishSVG, name:'Рыбка', color:'#4a93d0' },
    coin:{ svg:coinSVG, name:'Монетка', color:'#8a6d1e' },
    pig:{ svg:pigSVG, name:'Пятачок', color:'#a05a50' }
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



  /* ================= ФОН-ПАНОРАМА (meet: видна целиком, без кропа по бокам) ================= */
  function sceneArt(scene, fr){
    let base='';
    if(scene==='pond') base=pondSVG();
    else if(scene==='kitchen') base=kitchenSVG();
    else if(scene==='coins') base=coinsSVG();
    else base=pondSVG();
    let s = base;
    const prop = (fr && fr.prop) || '';
    if (prop) {
      const propW = prop.length > 20 ? 250 : (prop.length > 12 ? 210 : 170);
      s = s.replace('</svg>', propTag(prop, (360 - propW) / 2, 26, propW) + '</svg>');
    }
    return s;
  }
  function emojiFor(scene){ return scene==='pond'?'🐟':scene==='kitchen'?'🥧':'🪙'; }

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
      .c2-page { flex:1 1 auto; width:100%; max-width:620px; margin:4px auto 10px; background:#fffdf4;
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
      @keyframes c2twinkle { 0%,100%{opacity:.25; transform:scale(.7);} 50%{opacity:1; transform:scale(1.2);} }
      .c2-capbar { box-sizing:border-box; min-height:60px; background:#33291e; color:#f4e9c8;
        font-size:13px; line-height:1.45; padding:8px 14px; display:flex; gap:8px; align-items:center; }
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
      .c2-stage.c2-bg-pond { background:linear-gradient(#7fb45c,#5c8f3e 50%,#4a7a33); }
      .c2-stage.c2-bg-kitchen { background:linear-gradient(#c2915b,#9c6c3a 45%,#7a4f26); }
      .c2-stage .c2-scene { position:absolute; top:0; left:0; width:100%; height:auto; display:block;
        box-shadow:0 12px 18px -12px rgba(0,0,0,.45); }
      .c2-cast { position:absolute; left:0; right:0; bottom:10px; display:flex; align-items:flex-end;
        justify-content:space-between; padding:0 10px; pointer-events:none; z-index:4; }
      .c2-hero { pointer-events:auto; display:flex; flex-direction:column; align-items:center;
        width:118px; animation:c2hIn .5s cubic-bezier(.2,1.4,.4,1) both; }
      .c2-hero.listener-1 { width:96px; animation-delay:.1s; }
      .c2-hero.listener-2 { width:96px; animation-delay:.16s; }
      .c2-cast.c2-many .c2-hero.talker { width:122px; }
      .c2-cast.c2-many .c2-hero { width:92px; }
      .c2-cast.c2-solo { justify-content:center; }
      .c2-cast.c2-solo .c2-hero.talker { width:150px; }
      .c2-deco { position:absolute; left:0; right:0; bottom:0; height:100%; pointer-events:none; z-index:2; }
      .c2-deco span { position:absolute; line-height:1; filter:drop-shadow(0 2px 2px rgba(0,0,0,.15)); }
      .c2-deco .d1 { left:10px; bottom:16px; }
      .c2-deco .d2 { right:12px; bottom:14px; }
      .c2-deco .d3 { right:40px; bottom:86px; font-size:22px; opacity:.65; }
      .c2-deco .d4 { left:46px; bottom:92px; font-size:20px; opacity:.6; }
      .c2-hero .c2h-card { width:100%; border-radius:16px 16px 6px 6px; overflow:hidden;
        border:4px solid #33291e; background:#fff; box-shadow:0 8px 20px rgba(0,0,0,.25); }
      .c2-hero .c2h-card svg { display:block; width:100%; height:auto; }
      .c2-hero .c2h-name { margin-top:3px; font-size:12px; font-weight:bold; background:#fffdf4;
        padding:1px 8px; border-radius:999px; border:2px solid #33291e;
        max-width:100%; box-sizing:border-box; white-space:nowrap; overflow:hidden;
        text-overflow:ellipsis; text-align:center; }
      .c2-hero.talker { width:138px; }
      .c2-hero.talker .c2h-name { font-size:13px; }
      @keyframes c2hIn { from{ opacity:0; transform:translateY(34px);} to{ opacity:1; transform:none;} }
      .c2-talk { position:absolute; z-index:6; background:#fff; border:4px solid #33291e;
        border-radius:18px; padding:9px 14px 11px; font-size:14px; line-height:1.5;
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
    const DECO={pond:['🌾','🌼','🐞','🌷'],kitchen:['🧺','🪑','🌿','🫙'],coins:['🌼','🪙','🌻','🍄']};
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
