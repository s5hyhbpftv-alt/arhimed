/* ============ РИСУНКИ МОРЯ · ОБЩАЯ БИБЛИОТЕКА ДЛЯ УРОКОВ 3 КЛАССА «ВДОЛЬ БЕРЕГА» ============
   Подключается ДО уроков, которые её используют (сейчас 861, 862).
   window.РМ — функции, которые возвращают куски SVG в координатах кадра 336 × Н.

   МАНЕРА (deploy/РИСОВАНИЕ_ФИГУР.md): обводка #33291e, свет сверху-слева,
   тени тёмно-синие и тёплые контактные, у каждого предмета на воде — отражение,
   на земле — контактная тень. Детализация: доски обшивки, заклёпки, складки
   ткани, блики в глазах, пена на гребнях, дальние холмы с воздушной дымкой.
   Движение только со смыслом и только при разрешённом движении
   (prefers-reduced-motion выключает всю анимацию). */
(function(){
  'use strict';
  if(window.РМ) return;

  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const ОБВОД = '#33291e';
  let счётчик = 0;
  const ид = (п) => 'рм-'+п+'-'+(++счётчик);
  const f = (v) => (+v).toFixed(1);
  const ЗАВОД = `<rect width="0" height="0" fill="none"><animate attributeName="x" values="0;0" dur="1s" repeatCount="indefinite"/></rect>`;
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const качать = (значения,длит) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}" repeatCount="indefinite" additive="sum" calcMode="spline" keyTimes="${значения.split(';').map((_,i,a)=>(i/(a.length-1)).toFixed(2)).join(';')}" keySplines="${значения.split(';').slice(1).map(()=>'0.45 0 0.55 1').join(';')}"/>${ЗАВОД}` : '';
  const крутить = (значения,длит) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="rotate" values="${значения}" dur="${длит}" repeatCount="indefinite" additive="sum" calcMode="spline" keyTimes="${значения.split(';').map((_,i,a)=>(i/(a.length-1)).toFixed(2)).join(';')}" keySplines="${значения.split(';').slice(1).map(()=>'0.45 0 0.55 1').join(';')}"/>${ЗАВОД}` : '';

  /* ---------- общие определения: градиенты и фильтры ---------- */
  const defs = () => `<defs>
    <linearGradient id="рм-небо" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3f8fd2"/><stop offset="0.45" stop-color="#7cbde9"/><stop offset="0.85" stop-color="#cfe9f6"/><stop offset="1" stop-color="#f8efd8"/>
    </linearGradient>
    <linearGradient id="рм-ночь" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#070f24"/><stop offset="0.6" stop-color="#15264a"/><stop offset="1" stop-color="#2a3d66"/>
    </linearGradient>
    <linearGradient id="рм-закат" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a4f8a"/><stop offset="0.45" stop-color="#c7789a"/><stop offset="0.8" stop-color="#f4b27a"/><stop offset="1" stop-color="#ffe0a0"/>
    </linearGradient>
    <radialGradient id="рм-солнце" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fffbe6"/><stop offset="0.55" stop-color="#ffe9a0"/><stop offset="1" stop-color="#ffc85a"/>
    </radialGradient>
    <radialGradient id="рм-сияние" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff4c8" stop-opacity=".75"/><stop offset="0.4" stop-color="#ffe7a0" stop-opacity=".3"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="рм-лунсвет" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fff8d8" stop-opacity=".35"/><stop offset="1" stop-color="#fff8d8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="рм-луна" cx="0.4" cy="0.35" r="0.7">
      <stop offset="0" stop-color="#fffdf2"/><stop offset="0.7" stop-color="#eee6c8"/><stop offset="1" stop-color="#cfc4a0"/>
    </radialGradient>
    <linearGradient id="рм-облако" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f1f6fa"/><stop offset="1" stop-color="#c9d8e6"/>
    </linearGradient>
    <linearGradient id="рм-море" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7cc4e6"/><stop offset="0.12" stop-color="#3f98cf"/><stop offset="0.55" stop-color="#2273ad"/><stop offset="1" stop-color="#0f3f6c"/>
    </linearGradient>
    <linearGradient id="рм-мореночь" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2d4a78"/><stop offset="0.5" stop-color="#16305a"/><stop offset="1" stop-color="#081a36"/>
    </linearGradient>
    <linearGradient id="рм-дымка" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8efd8" stop-opacity="0"/><stop offset="1" stop-color="#f8efd8" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="рм-гребень" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8fd2f0"/><stop offset="1" stop-color="#2f86bf"/>
    </linearGradient>
    <linearGradient id="рм-холмдаль" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a9c7c0"/><stop offset="1" stop-color="#8cb2a6"/>
    </linearGradient>
    <linearGradient id="рм-холм" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#9ccc6a"/><stop offset="1" stop-color="#5e9444"/>
    </linearGradient>
    <linearGradient id="рм-скала" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e6d3a6"/><stop offset="0.5" stop-color="#c2a878"/><stop offset="1" stop-color="#8a714c"/>
    </linearGradient>
    <linearGradient id="рм-скалатень" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a88e64"/><stop offset="1" stop-color="#6a5638"/>
    </linearGradient>
    <linearGradient id="рм-песок" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4e2b6"/><stop offset="1" stop-color="#d9bf88"/>
    </linearGradient>
    <linearGradient id="рм-доска" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c98f52"/><stop offset="0.5" stop-color="#a86c34"/><stop offset="1" stop-color="#6e4118"/>
    </linearGradient>
    <linearGradient id="рм-доскатём" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a4a1e"/><stop offset="1" stop-color="#4a2a0e"/>
    </linearGradient>
    <linearGradient id="рм-мачта" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6a4018"/><stop offset="0.4" stop-color="#c08a50"/><stop offset="1" stop-color="#5a3410"/>
    </linearGradient>
    <linearGradient id="рм-парус" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fffaf0"/><stop offset="0.6" stop-color="#f3e8d0"/><stop offset="1" stop-color="#d8c8a4"/>
    </linearGradient>
    <radialGradient id="рм-кожа" cx="0.38" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#fde6cc"/><stop offset="0.6" stop-color="#f5c9a0"/><stop offset="1" stop-color="#dca276"/>
    </radialGradient>
    <linearGradient id="рм-волосы" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9a6030"/><stop offset="1" stop-color="#5a3414"/>
    </linearGradient>
    <linearGradient id="рм-штаны" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3a5a92"/><stop offset="1" stop-color="#22385e"/>
    </linearGradient>
    <linearGradient id="рм-сукно" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2e4a7c"/><stop offset="0.5" stop-color="#1e3460"/><stop offset="1" stop-color="#132444"/>
    </linearGradient>
    <linearGradient id="рм-складка" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="0.45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0b1c2a" stop-opacity=".28"/>
    </linearGradient>
    <linearGradient id="рм-латунь" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff0b0"/><stop offset="0.5" stop-color="#e0b048"/><stop offset="1" stop-color="#8a5a10"/>
    </linearGradient>
    <linearGradient id="рм-железо" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8a8e98"/><stop offset="0.5" stop-color="#5a5e68"/><stop offset="1" stop-color="#34373e"/>
    </linearGradient>
    <linearGradient id="рм-бумага" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbf5e3"/><stop offset="0.7" stop-color="#efe2c0"/><stop offset="1" stop-color="#dcc79a"/>
    </linearGradient>
    <radialGradient id="рм-крап" cx="0.35" cy="0.3" r="0.8">
      <stop offset="0" stop-color="#ff9a6a"/><stop offset="0.6" stop-color="#e8603a"/><stop offset="1" stop-color="#9a3418"/>
    </radialGradient>
    <linearGradient id="рм-рыба" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7a8a70"/><stop offset="0.5" stop-color="#b0b89a"/><stop offset="1" stop-color="#e8e4cc"/>
    </linearGradient>
    <radialGradient id="рм-огонь" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fffbe0"/><stop offset="0.4" stop-color="#ffd860" stop-opacity=".9"/><stop offset="1" stop-color="#ff9a30" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="рм-луч" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff6c0" stop-opacity=".75"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/>
    </linearGradient>
    <filter id="рм-отброс" x="-40%" y="-40%" width="180%" height="190%" color-interpolation-filters="linearRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="р"/><feOffset in="р" dx="3" dy="4" result="с"/>
      <feFlood flood-color="#0b1c2a" flood-opacity="0.28" result="ц"/><feComposite in="ц" in2="с" operator="in" result="т"/>
      <feMerge><feMergeNode in="т"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="рм-мягко" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="рм-очмягко" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>`;

  /* ---------- небо, солнце, облака, звёзды ---------- */
  function облако(x,y,м,дрейф){
    const p = `M${-40} 8 q-4 -16 14 -18 q4 -18 26 -14 q12 -16 30 -4 q20 -4 22 14 q14 2 10 18 z`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})" data-декор="1">${дрейф?качать('0 0;'+дрейф+' 0;0 0',(18+дрейф).toFixed(0)+'s'):''}
      <path d="${p}" fill="#9fb8cc" opacity=".35" transform="translate(3 4)"/>
      <path d="${p}" fill="url(#рм-облако)"/>
      <path d="M-26 -8 q4 -12 18 -10 M4 -16 q10 -10 22 -2" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".9"/>
    </g>`;
  }
  function солнце(x,y,r){
    return `<g data-декор="1"><circle cx="${x}" cy="${y}" r="${r*3.2}" fill="url(#рм-сияние)">${анЛин('r',`${r*3};${r*3.5};${r*3}`,'5s')}</circle>
      ${Array.from({length:12},(_,k)=>{ const a=k*Math.PI/6; return `<line x1="${f(x+Math.cos(a)*r*1.35)}" y1="${f(y+Math.sin(a)*r*1.35)}" x2="${f(x+Math.cos(a)*r*(k%2?1.8:2.2))}" y2="${f(y+Math.sin(a)*r*(k%2?1.8:2.2))}" stroke="#fff3c0" stroke-width="${k%2?1.4:2}" stroke-linecap="round" opacity=".7"/>`; }).join('')}
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#рм-солнце)"/></g>`;
  }
  function небо(ш,в,опц){
    const о=опц||{};
    if(о.ночь){
      const зв=[[22,18],[64,40],[108,14],[150,34],[196,20],[236,44],[282,16],[318,36],[40,70],[176,62],[300,78],[126,84],[260,92],[88,108]];
      return `<g><rect x="0" y="0" width="${ш}" height="${в}" fill="url(#рм-ночь)"/></g>
        ${зв.filter(([,y])=>y<в-6).map(([x,y],i)=>`<g data-декор="1"><circle cx="${x}" cy="${y}" r="${i%3?0.9:1.5}" fill="#fff">${анЛин('opacity','1;0.25;1',(1.8+(i%5)*0.6).toFixed(1)+'s')}</circle></g>`).join('')}
        ${о.луна?`<g data-декор="1"><circle cx="${о.луна[0]}" cy="${о.луна[1]}" r="40" fill="url(#рм-лунсвет)"/><circle cx="${о.луна[0]}" cy="${о.луна[1]}" r="16" fill="url(#рм-луна)"/>
          <circle cx="${о.луна[0]-5}" cy="${о.луна[1]-3}" r="3" fill="#d8ceac" opacity=".7"/><circle cx="${о.луна[0]+4}" cy="${о.луна[1]+5}" r="2.2" fill="#d8ceac" opacity=".7"/></g>`:''}`;
    }
    return `<g><rect x="0" y="0" width="${ш}" height="${в}" fill="url(#рм-${о.закат?'закат':'небо'})"/></g>
      ${о.солнце?солнце(о.солнце[0],о.солнце[1],о.солнце[2]||14):''}
      ${(о.облака||[[70,34,0.8,10],[250,54,0.6,-8]]).map(([x,y,м,д])=>облако(x,y,м,д)).join('')}`;
  }

  /* ---------- море: слои волн, пена, дорожка бликов ---------- */
  function море(y0,в,ш,опц){
    const о=опц||{}, низ=y0+в;
    const даль = Array.from({length:14},(_,k)=>{ const x=(k*53)%ш, y=y0+6+((k*7)%12); return `<path d="M${x} ${y} q5 -2 10 0" stroke="#e8f6ff" stroke-width=".9" fill="none" opacity=".5"/>`; }).join('');
    const сред = Array.from({length:9},(_,k)=>{ const x=(k*71+20)%ш, y=y0+в*0.35+((k*11)%18); return `<path d="M${x} ${y} q8 -4 16 0 t16 0" stroke="#d8efff" stroke-width="1.3" fill="none" opacity=".45"/>`; }).join('');
    const гребни = [0,1].map(r=>{ const y=y0+в*(0.62+r*0.22); let d=`M-20 ${y}`;
      for(let x=-20;x<ш+40;x+=40) d+=` q10 -${7+r*3} 20 -${3+r} q10 ${4+r*2} 20 ${3+r}`;
      d+=` V${низ} H-20 Z`;
      return `<g opacity="${0.55+r*0.2}">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${r?-20:20} 0;0 0" dur="${7+r*2}s" repeatCount="indefinite"/>`:''}
        <path d="${d}" fill="url(#рм-гребень)" opacity=".35"/>
        ${Array.from({length:Math.ceil((ш+60)/40)},(_,k)=>`<path d="M${-20+k*40} ${y} q10 -${7+r*3} 20 -${3+r}" stroke="#f4fbff" stroke-width="${1.6+r*0.6}" fill="none" stroke-linecap="round" opacity=".85"/>`).join('')}
      </g>`; }).join('');
    const блики = о.дорожка!=null ? Array.from({length:10},(_,k)=>{ const y=y0+4+k*(в*0.07), шир=6+k*2.2, x=о.дорожка+((k*37)%13)-6;
      return `<ellipse cx="${x}" cy="${f(y)}" rx="${f(шир)}" ry="1.2" fill="#fff8d8" opacity=".75">${анЛин('opacity','0.8;0.2;0.8',(1.2+(k%4)*0.35).toFixed(2)+'s')}</ellipse>`; }).join('') : '';
    return `<g data-декор="1"><rect x="0" y="${y0}" width="${ш}" height="${в}" fill="url(#рм-${о.ночь?'мореночь':'море'})"/>
      <rect x="0" y="${y0}" width="${ш}" height="4" fill="#e8f6ff" opacity=".35"/>
      ${даль}${сред}${блики}${гребни}</g>`;
  }

  /* ---------- берег: дальние холмы, утёс, домики, кипарисы, песок ---------- */
  function берег(y0,опц){
    const о=опц||{}, x0=о.x0||0, x1=о.x1||230;
    const дом=(x,y,м)=>`<g transform="translate(${x} ${y}) scale(${м})">
      <rect x="-8" y="-12" width="16" height="12" fill="#f6f0e2" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="2" y="-12" width="6" height="12" fill="#d8ccb0"/>
      <path d="M-10 -12 L0 -20 L10 -12 z" fill="#c8603a" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="-5" y="-8" width="3" height="4" fill="#3a4a6a"/><rect x="1" y="-5" width="3" height="5" fill="#6a4020"/></g>`;
    const кипарис=(x,y,в2)=>`<g><path d="M${x} ${y-в2} q6 ${в2*0.4} 4 ${в2} h-8 q-2 -${в2*0.6} 4 -${в2}z" fill="#2f5a36" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M${x-1} ${y-в2+6} q3 ${в2*0.3} 1 ${в2*0.8}" stroke="#4f7f4a" stroke-width="1.2" fill="none"/></g>`;
    const олива=(x,y)=>`<g><rect x="${x-1.5}" y="${y-8}" width="3" height="9" fill="#6a4a2a"/>
      <circle cx="${x}" cy="${y-13}" r="8" fill="#6f8f4a" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="${x-3}" cy="${y-15}" r="3.5" fill="#94b06a"/><circle cx="${x+4}" cy="${y-10}" r="2.5" fill="#566f38"/></g>`;
    return `<g data-декор="1">
      <path d="M${x0} ${y0} q40 -30 90 -22 q50 6 90 -12 q40 -10 ${x1-x0-180+50} 34 Z" fill="url(#рм-холмдаль)" opacity=".85"/>
      <path d="M${x0} ${y0} q30 -22 70 -18 q30 2 56 -14 q34 -10 ${Math.max(40,x1-x0-126)} 32 Z" fill="url(#рм-холм)"/>
      <path d="M${x0+20} ${y0-14} q30 -8 60 -4" stroke="#b6dc84" stroke-width="1.6" fill="none" opacity=".8"/>
      ${дом(x0+62,y0-18,1)}${дом(x0+82,y0-22,0.85)}${дом(x0+104,y0-24,0.9)}
      ${кипарис(x0+46,y0-14,26)}${кипарис(x0+124,y0-26,22)}${олива(x0+140,y0-20)}${олива(x0+24,y0-8)}
      <path d="M${x0} ${y0} h${x1-x0-10} q8 0 10 4 H${x0}z" fill="url(#рм-песок)"/>
      <path d="M${x0} ${y0+3} h${x1-x0}" stroke="#fff" stroke-width="1.4" stroke-dasharray="6 5" opacity=".8">${анЛин('stroke-dashoffset','0;11','3s')}</path>
    </g>`;
  }
  function утёс(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})" data-декор="1">
      <path d="M-40 0 L-30 -44 L-8 -62 L14 -54 L30 -30 L44 0 Z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-8 -62 L14 -54 L30 -30 L44 0 L10 0 L4 -30 Z" fill="url(#рм-скалатень)"/>
      <path d="M-30 -44 L-8 -62 L-2 -40 Z" fill="#f0e2bc" opacity=".6"/>
      <path d="M-22 -20 l10 -6 M6 -40 l8 10 M20 -14 l8 -4" stroke="${ОБВОД}" stroke-width="1" opacity=".5"/>
      <path d="M-34 -40 q20 -26 42 -24 q14 0 22 12" stroke="#8fbf5a" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  /* ---------- лодка с досками, уключиной, отражением ---------- */
  function лодка(x,y,м,опц){
    const о=опц||{};
    const корпус='M-62 -4 q4 26 26 30 h72 q22 -4 26 -30 z';
    return `<g transform="translate(${x} ${y}) scale(${м})">${о.качка!==false?качать('0 0;0 2.5;0 0','3.2s'):''}
      <g opacity=".18" transform="translate(0 50) scale(1 -0.5)"><path d="${корпус}" fill="#0b2a4a"/></g>
      <ellipse cx="0" cy="28" rx="64" ry="5" fill="#0b1c2a" opacity=".25" filter="url(#рм-мягко)"/>
      ${о.внутри||''}
      <path d="${корпус}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.6"/>
      <path d="M-58 4 q6 14 24 17 h68 q18 -3 24 -17" stroke="${ОБВОД}" stroke-width=".9" fill="none" opacity=".55"/>
      <path d="M-50 13 q8 8 20 9 h60 q12 -1 20 -9" stroke="${ОБВОД}" stroke-width=".9" fill="none" opacity=".45"/>
      <path d="M-62 -4 h124" stroke="#e8b878" stroke-width="3" stroke-linecap="round"/>
      <path d="M-62 -4 h124" stroke="${ОБВОД}" stroke-width="1" opacity=".6"/>
      ${[-40,-10,20,48].map(xx=>`<circle cx="${xx}" cy="3" r="1.2" fill="#5a3410"/>`).join('')}
      <path d="M-58 -2 q10 14 26 18" stroke="#fff4dc" stroke-width="1.4" fill="none" opacity=".5"/>
      ${о.имя?`<text x="30" y="14" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff0d0" font-family="Georgia,serif">${о.имя}</text>`:''}
      <path d="M-66 26 q10 4 20 0 M50 26 q10 4 20 0" stroke="#e8f6ff" stroke-width="1.4" fill="none" opacity=".8">${анЛин('opacity','0.8;0.2;0.8','2.2s')}</path>
    </g>`;
  }

  /* ---------- парусник: обшивка, иллюминаторы, парус со швами, такелаж, флаг ---------- */
  function парусник(x,y,м,опц){
    const о=опц||{}, парус=о.парус==null?1:о.парус;
    const корпус='M-80 -6 L-70 22 Q-60 30 -40 30 H52 Q72 30 84 16 L92 -12 Z';
    const флаг1='M0 -118 q10 -4 20 0 q10 4 20 0 v14 q-10 4 -20 0 q-10 -4 -20 0 z';
    const флаг2='M0 -118 q10 4 20 0 q10 -4 20 2 v14 q-10 -6 -20 -2 q-10 4 -20 0 z';
    const вх = 110*парус;
    return `<g transform="translate(${x} ${y}) scale(${м})">${о.качка!==false?качать('0 0;0 3;0 0','3.6s'):''}
      <g opacity=".25" transform="translate(0 60) scale(1 -0.5)"><path d="${корпус}" fill="#0b2a4a"/></g>
      <ellipse cx="4" cy="30" rx="88" ry="6" fill="#0b1c2a" opacity=".25" filter="url(#рм-мягко)"/>
      <rect x="-3" y="-120" width="6" height="116" rx="2" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width="1"/>
      <line x1="0" y1="-116" x2="-78" y2="-8" stroke="#6a5a44" stroke-width=".9"/><line x1="0" y1="-116" x2="90" y2="-12" stroke="#6a5a44" stroke-width=".9"/>
      <line x1="0" y1="-60" x2="-60" y2="-8" stroke="#6a5a44" stroke-width=".6"/><line x1="0" y1="-60" x2="70" y2="-10" stroke="#6a5a44" stroke-width=".6"/>
      <g>${ДВИЖ?`<animate attributeName="opacity" values="1;1" dur="1s" repeatCount="indefinite"/>`:''}
        <path d="M4 -106 Q${4+56*парус} ${-60} 6 ${-106+вх*0.9} Z" fill="url(#рм-парус)" stroke="${ОБВОД}" stroke-width="1.3" opacity="${парус?1:0}"/>
        ${парус?[0.3,0.55,0.8].map(t=>`<path d="M5 ${f(-106+вх*0.9*t)} q${f(28*парус)} -4 ${f(46*парус*(1-Math.abs(t-0.5)))} -2" stroke="#c8b48a" stroke-width=".8" fill="none"/>`).join(''):''}
        <path d="M-4 -96 Q${-4-40*парус} -54 -6 ${-96+вх*0.78} Z" fill="#efe2c4" stroke="${ОБВОД}" stroke-width="1.2" opacity="${парус?1:0}"/>
      </g>
      ${парус<1?`<path d="M-2 -8 h10 v-${f(10+ (1-парус)*14)} h-10z" fill="#e8dcc0" stroke="${ОБВОД}" stroke-width=".8"/>`:''}
      ${о.флаг===false?'':`<path d="${флаг1}" fill="#e05a3a" stroke="${ОБВОД}" stroke-width=".9">${ДВИЖ?`<animate attributeName="d" values="${флаг1};${флаг2};${флаг1}" dur="1.4s" repeatCount="indefinite"/>`:''}</path>`}
      <path d="${корпус}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.8"/>
      ${[4,12,20].map(yy=>`<path d="M${-74+yy*0.25} ${yy} Q-40 ${yy+4} 20 ${yy+3} T${86-yy*0.3} ${yy-6}" stroke="${ОБВОД}" stroke-width=".8" fill="none" opacity=".45"/>`).join('')}
      <path d="M-80 -6 L92 -12" stroke="#e8b878" stroke-width="3.2" stroke-linecap="round"/><path d="M-80 -6 L92 -12" stroke="${ОБВОД}" stroke-width="1" opacity=".6"/>
      ${[-44,-20,4,28].map(xx=>`<g><circle cx="${xx}" cy="6" r="4" fill="#2a3a52" stroke="url(#рм-латунь)" stroke-width="2"/><circle cx="${xx-1.2}" cy="4.8" r="1.1" fill="#9ac8f0" opacity=".8"/></g>`).join('')}
      ${о.имя?`<rect x="46" y="0" width="${о.имя.length*6+10}" height="12" rx="2" fill="#2a1a0a" opacity=".55"/><text x="${51}" y="9" font-size="9" font-weight="bold" fill="#ffe8b0" font-family="Georgia,serif">${о.имя}</text>`:''}
      ${о.якорь===false?'':`<g transform="translate(-66 4)"><circle cx="0" cy="0" r="2" fill="none" stroke="#3a3e46" stroke-width="1.2"/><path d="M0 2 v8 M-4 8 q4 5 8 0" stroke="#3a3e46" stroke-width="1.4" fill="none"/></g>`}
    </g>`;
  }

  /* ---------- люди ---------- */
  function лицо(опц){
    const о=опц||{}, моргание = ДВИЖ ? `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;1 0.1;1 1" keyTimes="0;0.92;0.96;1" dur="${о.мигать||4.2}s" repeatCount="indefinite" additive="sum"/>` : '';
    const глаз=(x)=>`<g transform="translate(${x} -1)"><g>${моргание}
        <ellipse cx="0" cy="0" rx="2.9" ry="3.5" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/>
        <circle cx="${о.взгляд||0.4}" cy=".4" r="2" fill="${о.глаза||'#4a3a26'}"/><circle cx="${о.взгляд||0.4}" cy=".4" r="1" fill="#1a120a"/>
        <circle cx="${(о.взгляд||0.4)-0.7}" cy="-.6" r=".7" fill="#fff"/></g></g>`;
    const рот = о.рот==='о' ? `<ellipse cx="0" cy="8" rx="2.2" ry="2.8" fill="#7a2a1a" stroke="${ОБВОД}" stroke-width=".6"/>`
      : о.рот==='ровно' ? `<path d="M-3 8 h6" stroke="${ОБВОД}" stroke-width="1.1" stroke-linecap="round"/>`
      : `<path d="M-4.5 6.5 q4.5 5 9 0 q-4.5 2.2 -9 0z" fill="#9a3a26" stroke="${ОБВОД}" stroke-width=".7"/><path d="M-2 8.6 q2 1.4 4 0" stroke="#e87a6a" stroke-width="1" fill="none"/>`;
    return `${глаз(-5)}${глаз(5)}
      <path d="M-7.6 -6.2 q2.6 -2 5 -.6 M2.6 -6.8 q2.6 -1.4 5 .6" stroke="#5a3414" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M-.4 1.4 q1.8 2.6 -.2 3.6" stroke="#c07a52" stroke-width="1" fill="none" stroke-linecap="round"/>
      <ellipse cx="-8" cy="4.2" rx="2.8" ry="1.7" fill="#f08a7a" opacity=".45"/><ellipse cx="8" cy="4.2" rx="2.8" ry="1.7" fill="#f08a7a" opacity=".45"/>
      ${рот}`;
  }
  /* юнга: высота ~112 единиц от подошв (0) до макушки */
  function юнга(x,y,м,опц){
    const о=опц||{}, кл=ид('тельн'), поза=о.поза||'стоит';
    const тело='M-15 -74 Q0 -80 15 -74 L17 -40 Q0 -36 -17 -40 Z';
    const полосы = Array.from({length:8},(_,k)=>`<rect x="-20" y="${-76+k*5}" width="40" height="2.4" fill="#2a4f8a"/>`).join('');
    const рукаЛ = поза==='машет' ? `<g>${крутить('0 -14 -70;-18 -14 -70;0 -14 -70','1.1s')}<path d="M-14 -70 q-16 -8 -20 -26" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M-14 -70 q-16 -8 -20 -26" stroke="#2a4f8a" stroke-width="7" stroke-dasharray="2.4 2.6" stroke-linecap="butt" fill="none"/><circle cx="-34" cy="-98" r="4.4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/></g>`
      : `<path d="M-14 -70 q-8 14 -6 30" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M-14 -70 q-8 14 -6 30" stroke="#2a4f8a" stroke-width="7" stroke-dasharray="2.4 2.6" fill="none"/><circle cx="-20" cy="-38" r="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    const рукаП = поза==='сачок' ? `<path d="M14 -70 q14 2 22 -10" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M14 -70 q14 2 22 -10" stroke="#2a4f8a" stroke-width="7" stroke-dasharray="2.4 2.6" fill="none"/><circle cx="37" cy="-81" r="4.4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`
      : поза==='пишет' ? `<path d="M14 -70 q12 12 4 22" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M14 -70 q12 12 4 22" stroke="#2a4f8a" stroke-width="7" stroke-dasharray="2.4 2.6" fill="none"/><circle cx="17" cy="-46" r="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
        <g>${крутить('0 17 -46;8 17 -46;0 17 -46','0.9s')}<path d="M17 -46 l12 -22" stroke="#f4ecd8" stroke-width="2.4" stroke-linecap="round"/><path d="M29 -68 q6 -2 4 -8 q-6 2 -4 8z" fill="#f4ecd8" stroke="${ОБВОД}" stroke-width=".6"/></g>`
      : `<path d="M14 -70 q8 14 6 30" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M14 -70 q8 14 6 30" stroke="#2a4f8a" stroke-width="7" stroke-dasharray="2.4 2.6" fill="none"/><circle cx="20" cy="-38" r="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="1" rx="18" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${о.безНог?'':`<path d="M-12 -40 L-13 -4 h9 L-2 -34 L2 -34 L4 -4 h9 L12 -40 Z" fill="url(#рм-штаны)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M0 -38 v6" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-15 -4 q0 -5 7 -5 q6 0 6 5 z M2 -4 q0 -5 7 -5 q6 0 6 5 z" fill="#5a3418" stroke="${ОБВОД}" stroke-width="1"/>`}
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      ${рукаЛ}
      <path d="${тело}" fill="#f6f2e8" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})">${полосы}<rect x="-20" y="-80" width="40" height="44" fill="url(#рм-складка)"/></g>
      <path d="${тело}" fill="none" stroke="${ОБВОД}" stroke-width="1.3"/>
      <path d="M-12 -75 L0 -64 L12 -75 L10 -79 L0 -71 L-10 -79 Z" fill="#2a4f8a" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-3 -66 l3 3 l3 -3" stroke="#fff" stroke-width="1" fill="none"/>
      ${рукаП}
      <rect x="-3.5" y="-82" width="7" height="6" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -95)">
        <ellipse cx="-14" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="14" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="14" ry="15" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-14 -3 q-2 -14 10 -16 q10 -4 16 4 q4 4 2 12 q-4 -8 -10 -8 q-2 5 -8 4 q-4 -2 -10 4z" fill="url(#рм-волосы)" stroke="${ОБВОД}" stroke-width=".9"/>
        <path d="M-6 -12 q4 -4 10 -3" stroke="#c08a50" stroke-width="1.2" fill="none" opacity=".8"/>
        ${о.шапка===false?'':`<path d="M-15 -8 q15 -14 30 0 q-15 -5 -30 0z" fill="#f4f4f0" stroke="${ОБВОД}" stroke-width="1"/><path d="M-15 -8 q15 -5 30 0 v3 q-15 -5 -30 0z" fill="#1e3460"/>
          <path d="M13 -6 q6 4 5 12" stroke="#1e3460" stroke-width="2" fill="none">${ДВИЖ?`<animate attributeName="d" values="M13 -6 q6 4 5 12;M13 -6 q8 3 8 11;M13 -6 q6 4 5 12" dur="1.6s" repeatCount="indefinite"/>`:''}</path>`}
        ${лицо(о)}
      </g>
    </g>`;
  }
  /* капитан: борода, фуражка с кокардой, китель с пуговицами, трубка */
  function капитан(x,y,м,опц){
    const о=опц||{};
    if(о.штурман) return штурман(x,y,м,о);
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="1" rx="22" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-14 -44 L-15 -4 h11 L-2 -36 L2 -36 L4 -4 h11 L14 -44 Z" fill="#1a2640" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-17 -4 q0 -6 8 -6 q7 0 7 6 z M2 -4 q0 -6 8 -6 q7 0 7 6 z" fill="#1a120a" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-20 -84 Q0 -92 20 -84 L22 -40 Q0 -36 -22 -40 Z" fill="url(#рм-сукно)" stroke="${ОБВОД}" stroke-width="1.4"/>
      <path d="M-20 -84 Q0 -92 20 -84 L22 -40 Q0 -36 -22 -40 Z" fill="url(#рм-складка)"/>
      <path d="M0 -86 v46" stroke="#0e1a30" stroke-width="1"/>
      ${[-76,-66,-56,-46].map(yy=>`<circle cx="-5" cy="${yy}" r="1.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".4"/><circle cx="5" cy="${yy}" r="1.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".4"/>`).join('')}
      <path d="M-20 -84 l-8 34" stroke="url(#рм-сукно)" stroke-width="9" stroke-linecap="round"/><circle cx="-28" cy="-48" r="4.6" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-24 -54 h8" stroke="#d8a840" stroke-width="2"/>
      <path d="M20 -84 q10 10 2 20" stroke="url(#рм-сукно)" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="21" cy="-63" r="4.6" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <g transform="translate(0 -104)">
        <ellipse cx="-15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="15" ry="16" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-15 2 q0 22 15 24 q15 -2 15 -24 q-6 8 -15 8 q-9 0 -15 -8z" fill="#c8c0b0" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-8 12 q8 6 16 0" stroke="#a09888" stroke-width="1" fill="none"/><path d="M-5 17 q5 4 10 0" stroke="#a09888" stroke-width="1" fill="none"/>
        <path d="M-6 6 q6 -3 12 0" stroke="#b8b0a0" stroke-width="3" stroke-linecap="round" fill="none"/>
        ${лицо({рот:'ровно',мигать:5.1,взгляд:о.взгляд})}
        <g transform="translate(0 -5)"><path d="M-17 -8 q17 -12 34 0 l-2 -6 q-15 -8 -30 0z" fill="#1a2640" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-18 -8 q18 5 36 0 l1 2 q-19 5 -38 0z" fill="#0e1628" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M-15 -15 q15 -6 30 0" stroke="#fff" stroke-width="2.4" fill="none"/>
        <circle cx="0" cy="-13" r="2.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/></g>
        ${о.трубка===false?'':`<path d="M5 9 l12 3" stroke="#5a3418" stroke-width="2"/><path d="M16 8 h6 v7 h-6z" fill="#6a3a14" stroke="${ОБВОД}" stroke-width=".7"/>
          ${ДВИЖ?[0,1].map(k=>`<circle cx="20" cy="4" r="2.4" fill="#e8e8e8" opacity="0"><animate attributeName="cy" values="4;-18" dur="2.4s" begin="${k*1.2}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0" dur="2.4s" begin="${k*1.2}s" repeatCount="indefinite"/><animate attributeName="r" values="2;5" dur="2.4s" begin="${k*1.2}s" repeatCount="indefinite"/></circle>`).join(''):''}`}
      </g>
    </g>`;
  }


  /* штурман: треуголка, красный шейный платок, камзол, подзорная труба */
  function штурман(x,y,м,опц){
    const о=опц||{}, кл=ид('камзол');
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="1" rx="22" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-13 -44 L-14 -4 h10 L-2 -36 L2 -36 L4 -4 h10 L13 -44 Z" fill="#e8dcc0" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-16 -4 q0 -6 8 -6 q7 0 7 6 z M2 -4 q0 -6 8 -6 q7 0 7 6 z" fill="#2a1a0a" stroke="${ОБВОД}" stroke-width="1"/>
      <linearGradient id="${кл}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a2e22"/><stop offset="0.5" stop-color="#6a1e16"/><stop offset="1" stop-color="#4a120c"/></linearGradient>
      <path d="M-20 -84 Q0 -92 20 -84 L24 -36 Q0 -32 -24 -36 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.4"/>
      <path d="M-20 -84 Q0 -92 20 -84 L24 -36 Q0 -32 -24 -36 Z" fill="url(#рм-складка)"/>
      <path d="M-8 -86 L0 -58 L8 -86" fill="#f4ecd8" stroke="${ОБВОД}" stroke-width=".8"/>
      ${[-72,-62,-52].map(yy=>`<circle cx="-11" cy="${yy}" r="1.7" fill="url(#рм-латунь)"/><circle cx="11" cy="${yy}" r="1.7" fill="url(#рм-латунь)"/>`).join('')}
      <path d="M-24 -42 H24" stroke="#3a2410" stroke-width="3.4"/><rect x="-4" y="-45" width="8" height="6" rx="1" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
      <path d="M-20 -84 l-8 34" stroke="url(#${кл})" stroke-width="9" stroke-linecap="round"/><circle cx="-28" cy="-48" r="4.6" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <g>${о.смотрит&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 20 -82;-6 20 -82;0 20 -82" dur="4s" repeatCount="indefinite"/>`:''}
        <path d="M20 -84 q14 -4 20 -14" stroke="url(#${кл})" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="40" cy="-99" r="4.6" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
        <g transform="translate(40 -100) rotate(-28)"><rect x="-2" y="-4" width="30" height="8" rx="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="24" y="-5" width="8" height="10" rx="2" fill="#3a2410" stroke="${ОБВОД}" stroke-width=".7"/><line x1="8" y1="-4" x2="8" y2="4" stroke="${ОБВОД}" stroke-width=".7"/></g></g>
      <g transform="translate(0 -104)">
        <ellipse cx="-15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="15" ry="16" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-15 2 q-2 10 2 14 M15 2 q2 10 -2 14" stroke="#5a3414" stroke-width="3" fill="none" stroke-linecap="round"/>
        ${лицо({рот:'улыбка',мигать:4.6,взгляд:о.взгляд})}
        <path d="M-6 13 q6 3 12 0" stroke="#5a3414" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M-26 -8 Q-14 -30 0 -22 Q14 -30 26 -8 Q14 -14 0 -12 Q-14 -14 -26 -8 Z" fill="#1e1a18" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-24 -9 Q-12 -15 0 -13 Q12 -15 24 -9" stroke="#e8c070" stroke-width="1.6" fill="none"/>
        <circle cx="0" cy="-20" r="2.6" fill="#d8402a" stroke="${ОБВОД}" stroke-width=".5"/>
      </g>
    </g>`;
  }

  /* ---------- чайка ---------- */
  function чайка(x,y,м,опц){
    const о=опц||{};
    const вверх='M-2 -2 Q-14 -18 -30 -12 Q-16 -6 -2 2', вниз='M-2 -2 Q-14 4 -28 10 Q-14 4 -2 2';
    const вверх2='M4 -2 Q16 -18 32 -12 Q18 -6 4 2', вниз2='M4 -2 Q16 4 30 10 Q16 4 4 2';
    const взмах=(a,b)=>ДВИЖ&&о.летит!==false?`<animate attributeName="d" values="${a};${b};${a}" dur="${о.темп||0.9}s" repeatCount="indefinite"/>`:'';
    const влево = о.влево!=null ? о.влево : (о.дрейф ? parseFloat(о.дрейф)<0 : false);
    return `<g transform="translate(${x} ${y}) scale(${м})" data-декор="1">${о.дрейф?качать('0 0;0 '+(parseFloat(о.дрейф.split(' ')[1])||-4)+';0 0',(о.дрейфВр||4)+'s'):''}<g transform="scale(${влево?-1:1} 1)">
      <path d="${вверх}" fill="#c8d0d8" stroke="${ОБВОД}" stroke-width=".8">${взмах(вверх,вниз)}</path>
      <ellipse cx="1" cy="0" rx="11" ry="5" fill="#fbfbf8" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-10 0 l-6 -2 l2 4z" fill="#e8ecef" stroke="${ОБВОД}" stroke-width=".6"/>
      <circle cx="10" cy="-2" r="4" fill="#fbfbf8" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M13 -2 l6 1 l-6 2z" fill="#f2c040" stroke="${ОБВОД}" stroke-width=".5"/><circle cx="17" cy="-.4" r=".7" fill="#d84a2a"/>
      <circle cx="11" cy="-3" r=".9" fill="#1a120a"/>
      <path d="${вверх2}" fill="#b4bec8" stroke="${ОБВОД}" stroke-width=".8">${взмах(вверх2,вниз2)}</path>
      <path d="M26 -12 l6 0 l-3 3z" fill="#2a2e34"/>
    </g></g>`;
  }

  /* ---------- предметы ---------- */
  function сундук(x,y,ш,в,опц){
    const о=опц||{}, кр=Math.min(18,в*0.35);
    const крышка = о.открыт ? `<path d="M${-ш/2} ${-в} q${ш/2} ${-кр*1.6} ${ш} 0 l-6 -${кр*1.4} q-${ш/2-6} -${кр} -${ш-12} 0z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.2"/>`
      : `<path d="M${-ш/2} ${-в} q${ш/2} ${-кр*2} ${ш} 0 z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
        <path d="M${-ш/2+6} ${-в-кр*0.4} q${ш/2-6} ${-кр*1.2} ${ш-12} 0" stroke="#f0c890" stroke-width="1.2" fill="none" opacity=".7"/>`;
    return `<g transform="translate(${x} ${y})">
      <ellipse cx="3" cy="2" rx="${ш*0.55}" ry="4" fill="#231a12" opacity=".4" filter="url(#рм-мягко)"/>
      <rect x="${-ш/2}" y="${-в}" width="${ш}" height="${в}" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.4"/>
      ${о.открыт?`<rect x="${-ш/2+4}" y="${-в}" width="${ш-8}" height="8" fill="#2a1808"/>`:''}
      ${[0.33,0.66].map(t=>`<path d="M${-ш/2+2} ${f(-в+в*t)} h${ш-4}" stroke="${ОБВОД}" stroke-width=".8" opacity=".5"/>`).join('')}
      <rect x="${-ш/2}" y="${-в}" width="${ш*0.12}" height="${в}" fill="#fff" opacity=".12"/>
      ${[-ш/2+8, ш/2-12].map(xx=>`<rect x="${xx}" y="${-в}" width="5" height="${в}" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/>
        ${[0.2,0.5,0.8].map(t=>`<circle cx="${xx+2.5}" cy="${f(-в+в*t)}" r="1" fill="#c8ccd4"/>`).join('')}`).join('')}
      ${крышка}
      ${о.открыт?'':`<rect x="-6" y="${-в-2}" width="12" height="12" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/><path d="M0 ${-в+2} v4" stroke="${ОБВОД}" stroke-width="1.6"/><circle cx="0" cy="${-в+2}" r="1.4" fill="${ОБВОД}"/>`}
      ${о.надпись?`<rect x="${-ш/2+14}" y="${-в*0.8}" width="${ш-28}" height="${в*0.68}" rx="3" fill="url(#рм-бумага)" stroke="${ОБВОД}" stroke-width=".7"/>`:''}
    </g>`;
  }
  function бочка(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="2" cy="1" rx="16" ry="3" fill="#231a12" opacity=".4" filter="url(#рм-мягко)"/>
      <path d="M-13 0 q-5 -20 0 -40 h26 q5 20 0 40 z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${[-6,0,6].map(xx=>`<path d="M${xx} 0 q${xx*0.3} -20 0 -40" stroke="${ОБВОД}" stroke-width=".6" opacity=".45" fill="none"/>`).join('')}
      ${[-34,-6].map(yy=>`<path d="M-15 ${yy} q15 3 30 0" stroke="url(#рм-железо)" stroke-width="3" fill="none"/>`).join('')}
      <ellipse cx="0" cy="-40" rx="13" ry="3" fill="#8a5a2a" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-11 -30 q-2 12 0 22" stroke="#f0c890" stroke-width="1.4" fill="none" opacity=".6"/>
    </g>`;
  }
  function якорь(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <circle cx="0" cy="-36" r="5" fill="none" stroke="url(#рм-железо)" stroke-width="3"/>
      <rect x="-2.5" y="-31" width="5" height="34" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="-12" y="-26" width="24" height="4" rx="2" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-18 -6 q2 12 18 12 q16 0 18 -12 l-5 3 q-2 6 -13 6 q-11 0 -13 -6z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-21 -9 l5 -1 l-1 5z M21 -9 l-5 -1 l1 5z" fill="#4a4e56"/>
      <path d="M-1 -30 v30" stroke="#c8ccd4" stroke-width=".8" opacity=".7"/>
    </g>`;
  }
  function бухта(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="0" rx="18" ry="6" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      ${[16,12,8,4].map((r,k)=>`<ellipse cx="0" cy="${-3-k*1.4}" rx="${r}" ry="${r*0.34}" fill="none" stroke="#c8a870" stroke-width="3.4"/><ellipse cx="0" cy="${-3-k*1.4}" rx="${r}" ry="${r*0.34}" fill="none" stroke="#8a6a3a" stroke-width="3.4" stroke-dasharray="1.2 2.4"/>`).join('')}
    </g>`;
  }
  function краб(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="4" rx="16" ry="3" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${[-1,1].map(с=>[0,1,2].map(k=>`<path d="M${с*8} ${-2+k*2} q${с*10} -2 ${с*14} ${6+k*2}" stroke="#b8482a" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')).join('')}
      <g>${крутить('0 -10 -6;-12 -10 -6;0 -10 -6','1.4s')}<path d="M-10 -6 q-10 -6 -12 -14" stroke="#c8502e" stroke-width="3" fill="none"/><path d="M-22 -20 q-6 -2 -4 -8 l4 4 l2 -6 q6 4 -2 10z" fill="url(#рм-крап)" stroke="${ОБВОД}" stroke-width=".8"/></g>
      <g>${крутить('0 10 -6;12 10 -6;0 10 -6','1.4s')}<path d="M10 -6 q10 -6 12 -14" stroke="#c8502e" stroke-width="3" fill="none"/><path d="M22 -20 q6 -2 4 -8 l-4 4 l-2 -6 q-6 4 2 10z" fill="url(#рм-крап)" stroke="${ОБВОД}" stroke-width=".8"/></g>
      <ellipse cx="0" cy="-4" rx="13" ry="9" fill="url(#рм-крап)" stroke="${ОБВОД}" stroke-width="1.1"/>
      <path d="M-8 -8 q8 -4 16 0" stroke="#ffb08a" stroke-width="1.4" fill="none" opacity=".8"/>
      <path d="M-4 -12 v-6 M4 -12 v-6" stroke="#b8482a" stroke-width="1.4"/><circle cx="-4" cy="-19" r="2.2" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="4" cy="-19" r="2.2" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/>
      <circle cx="-3.6" cy="-19" r="1.1" fill="#1a120a"/><circle cx="4.4" cy="-19" r="1.1" fill="#1a120a"/>
    </g>`;
  }
  function морзвезда(x,y,r,опц){
    const о=опц||{};
    const d = Array.from({length:10},(_,k)=>{ const a=-Math.PI/2+k*Math.PI/5, rr=k%2?r*0.42:r; return (k?'L':'M')+f(x+rr*Math.cos(a))+' '+f(y+rr*Math.sin(a)); }).join(' ')+'Z';
    const точки = Array.from({length:5},(_,k)=>{ const a=-Math.PI/2+k*2*Math.PI/5; return [0.35,0.6].map(t=>`<circle cx="${f(x+r*t*Math.cos(a))}" cy="${f(y+r*t*Math.sin(a))}" r="${f(r*0.07)}" fill="#ffd8b0"/>`).join(''); }).join('');
    return `<g><ellipse cx="${x+2}" cy="${y+r*0.6}" rx="${r*0.9}" ry="${r*0.2}" fill="#0b1c2a" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="${d}" fill="${о.цвет||'url(#рм-крап)'}" stroke="${ОБВОД}" stroke-width="1.2" stroke-linejoin="round"/>
      ${точки}${о.лицо?`<circle cx="${x-r*0.14}" cy="${y-r*0.1}" r="${f(r*0.09)}" fill="${ОБВОД}"/><circle cx="${x+r*0.14}" cy="${y-r*0.1}" r="${f(r*0.09)}" fill="${ОБВОД}"/>`:''}</g>`;
  }
  function ёрш(x,y,м,опц){
    const о=опц||{};
    const хвост1='M24 0 l14 -11 q-3 11 0 22 z', хвост2='M24 0 l14 -8 q-5 8 0 16 z';
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="${хвост1}" fill="#8a9a7a" stroke="${ОБВОД}" stroke-width=".9">${ДВИЖ&&о.плывёт!==false?`<animate attributeName="d" values="${хвост1};${хвост2};${хвост1}" dur="0.7s" repeatCount="indefinite"/>`:''}</path>
      <path d="M-18 -8 ${Array.from({length:7},(_,k)=>`l3 -9 l3 9`).join(' ')} z" fill="#a8b08a" stroke="${ОБВОД}" stroke-width=".8" opacity=".95"/>
      ${Array.from({length:7},(_,k)=>`<path d="M${-15+k*6} -8 l0 -8" stroke="${ОБВОД}" stroke-width=".7"/>`).join('')}
      <path d="M-28 0 q20 -18 52 0 q-32 18 -52 0 z" fill="url(#рм-рыба)" stroke="${ОБВОД}" stroke-width="1.1"/>
      ${Array.from({length:12},(_,k)=>{ const cx=-14+(k%6)*6, cy=-3+Math.floor(k/6)*6; return `<path d="M${cx} ${cy} q3 3 0 5" stroke="#5a6a4a" stroke-width=".6" fill="none" opacity=".7"/>`; }).join('')}
      ${[-12,-2,8].map(xx=>`<circle cx="${xx}" cy="-3" r="1.6" fill="#4a5a3a" opacity=".6"/>`).join('')}
      <path d="M-4 6 q4 8 10 4" fill="#b0b890" stroke="${ОБВОД}" stroke-width=".7"/>
      <circle cx="-19" cy="-2" r="3" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="-19.4" cy="-2" r="1.6" fill="#1a120a"/><circle cx="-20" cy="-2.7" r=".6" fill="#fff"/>
      <path d="M-28 1 q3 2 6 1" stroke="${ОБВОД}" stroke-width=".8" fill="none"/>
      <path d="M-22 -6 q16 -8 34 -2" stroke="#f0f0d8" stroke-width="1" fill="none" opacity=".6"/>
    </g>`;
  }
  function весло(x,y,м,угол){
    return `<g transform="translate(${x} ${y}) rotate(${угол||0}) scale(${м})">
      <rect x="-50" y="-2.5" width="72" height="5" rx="2.5" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M20 -3 q8 -7 30 -5 q4 5 0 16 q-22 2 -30 -5z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M24 -2 q10 -4 22 -3" stroke="#f0c890" stroke-width="1" fill="none" opacity=".7"/>
      <rect x="-50" y="-3" width="10" height="6" rx="2" fill="#5a3410"/></g>`;
  }
  /* маяк: полосатая башня, галерея, фонарь с вращающимся лучом */
  function маяк(x,y,м,горит){
    const кл=ид('маяк');
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="0" rx="28" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <clipPath id="${кл}"><path d="M-16 0 L-11 -86 H11 L16 0 Z"/></clipPath>
      <path d="M-16 0 L-11 -86 H11 L16 0 Z" fill="#f6f2e8"/>
      <g clip-path="url(#${кл})">${[0,1,2].map(k=>`<rect x="-20" y="${-24-k*28}" width="40" height="12" fill="#d0503a"/>`).join('')}<rect x="-20" y="-90" width="40" height="92" fill="url(#рм-складка)"/></g>
      <path d="M-16 0 L-11 -86 H11 L16 0 Z" fill="none" stroke="${ОБВОД}" stroke-width="1.3"/>
      <path d="M-4 0 v-12 a4 4 0 0 1 8 0 v12z" fill="#5a3418" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="-3" y="-60" width="6" height="8" rx="1" fill="#2a3a52" stroke="${ОБВОД}" stroke-width=".6"/>
      <rect x="-16" y="-90" width="32" height="5" fill="#3a3e46" stroke="${ОБВОД}" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(xx=>`<line x1="${xx}" y1="-90" x2="${xx}" y2="-96" stroke="#3a3e46" stroke-width="1"/>`).join('')}<line x1="-14" y1="-96" x2="14" y2="-96" stroke="#3a3e46" stroke-width="1.2"/>
      <rect x="-8" y="-108" width="16" height="18" rx="2" fill="${горит?'#fff4c0':'#6a8aa0'}" stroke="${ОБВОД}" stroke-width="1"/>
      ${горит?`<circle cx="0" cy="-99" r="16" fill="url(#рм-огонь)"/>
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="-25 0 -99;25 0 -99;-25 0 -99" dur="5s" repeatCount="indefinite"/>`:''}<path d="M4 -99 L150 -130 L150 -76 Z" fill="url(#рм-луч)"/><path d="M-4 -99 L-150 -130 L-150 -76 Z" fill="url(#рм-луч)" transform="scale(1 1)"/></g>`:''}
      <path d="M-10 -108 L0 -120 L10 -108 Z" fill="#d0503a" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="0" cy="-121" r="2" fill="url(#рм-латунь)"/>
    </g>`;
  }
  /* лист журнала: пергамент с неровным краем и пятнами */
  function лист(x,y,ш,в,опц){
    const о=опц||{};
    return `<g>
      <rect x="${x+3}" y="${y+4}" width="${ш}" height="${в}" rx="3" fill="#0b1c2a" opacity=".3" filter="url(#рм-мягко)"/>
      <path d="M${x} ${y+4} q${ш*0.25} -5 ${ш*0.5} -2 q${ш*0.25} 3 ${ш*0.5} -2 V${y+в-3} q-${ш*0.3} 5 -${ш*0.6} 1 q-${ш*0.2} -3 -${ш*0.4} 2 Z" fill="url(#рм-бумага)" stroke="#a88a5a" stroke-width="1"/>
      <ellipse cx="${x+ш*0.78}" cy="${y+в*0.72}" rx="${ш*0.08}" ry="${в*0.07}" fill="#c8a870" opacity=".25" data-декор="1"/>
      <ellipse cx="${x+ш*0.18}" cy="${y+в*0.3}" rx="${ш*0.05}" ry="${в*0.05}" fill="#c8a870" opacity=".2" data-декор="1"/>
      ${о.линии?Array.from({length:о.линии},(_,k)=>`<line x1="${x+10}" y1="${y+(k+1)*в/(о.линии+1)+6}" x2="${x+ш-10}" y2="${y+(k+1)*в/(о.линии+1)+6}" stroke="#c8b08a" stroke-width=".8" data-декор="1"/>`).join(''):''}
    </g>`;
  }
  /* доски палубы или трюма */
  function доски(x,y,ш,в,тёмные){
    return `<g><rect x="${x}" y="${y}" width="${ш}" height="${в}" fill="url(#рм-${тёмные?'доскатём':'доска'})"/>
      ${Array.from({length:Math.ceil(в/14)},(_,k)=>`<line x1="${x}" y1="${y+k*14}" x2="${x+ш}" y2="${y+k*14}" stroke="${ОБВОД}" stroke-width=".8" opacity=".45"/>
        ${Array.from({length:3},(_,j)=>`<line x1="${x+((j*97+k*53)%ш)}" y1="${y+k*14}" x2="${x+((j*97+k*53)%ш)}" y2="${y+k*14+14}" stroke="${ОБВОД}" stroke-width=".6" opacity=".35"/>`).join('')}`).join('')}
    </g>`;
  }


  /* ---------- флаг на флагштоке: цвет, форма (треугольный / квадратный), полоса ---------- */
  function флаг(x,y,цвет,форма,полоса,опц){
    const о=опц||{}, в=о.в||70, ц={красный:['#f0664a','#b8321e'],синий:['#4a86d8','#1e4a9a'],жёлтый:['#ffd24a','#c8901a'],зелёный:['#6ac06a','#2e7a3a'],белый:['#fbfbf6','#c8ccd0']}[цвет]||['#ccc','#888'];
    const кл=ид('флаг');
    const f1 = форма==='треугольный' ? 'M0 0 q10 3 26 11 q-16 8 -26 11 z' : 'M0 0 q13 -3 26 1 v20 q-13 -4 -26 -1 z';
    const f2 = форма==='треугольный' ? 'M0 0 q12 -2 26 13 q-14 6 -26 9 z' : 'M0 0 q13 3 26 -1 v20 q-13 4 -26 1 z';
    return `<g transform="translate(${x} ${y})">
      <ellipse cx="0" cy="1" rx="6" ry="1.8" fill="#231a12" opacity=".35"/>
      <rect x="-1.6" y="${-в}" width="3.2" height="${в}" rx="1.2" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <circle cx="0" cy="${-в-2}" r="2.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
      <g transform="translate(1.6 ${-в+2})">
        <clipPath id="${кл}"><path d="${f1}">${ДВИЖ&&о.вьётся!==false?`<animate attributeName="d" values="${f1};${f2};${f1}" dur="${(1.3+(x%7)*0.08).toFixed(2)}s" repeatCount="indefinite"/>`:''}</path></clipPath>
        <path d="${f1}" fill="${ц[0]}" stroke="${ОБВОД}" stroke-width=".9">${ДВИЖ&&о.вьётся!==false?`<animate attributeName="d" values="${f1};${f2};${f1}" dur="${(1.3+(x%7)*0.08).toFixed(2)}s" repeatCount="indefinite"/>`:''}</path>
        <g clip-path="url(#${кл})">
          <rect x="0" y="12" width="30" height="12" fill="${ц[1]}" opacity=".45"/>
          ${полоса?`<rect x="0" y="8" width="30" height="5" fill="#fbfbf6"/>`:''}
          <rect x="0" y="-4" width="30" height="7" fill="#fff" opacity=".18"/>
        </g>
      </g></g>`;
  }
  /* ---------- рыночный прилавок с полосатым навесом ---------- */
  function прилавок(x,y,ш,в){
    const n=Math.round(ш/24);
    return `<g transform="translate(${x} ${y})">
      <rect x="${-ш/2+6}" y="${-в-44}" width="5" height="${в+44}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <rect x="${ш/2-11}" y="${-в-44}" width="5" height="${в+44}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      ${Array.from({length:n},(_,k)=>`<path d="M${-ш/2+k*ш/n} ${-в-52} h${ш/n} v14 q-${ш/n/2} 8 -${ш/n} 0 z" fill="${k%2?'#fbf4e2':'#d0503a'}" stroke="${ОБВОД}" stroke-width=".7"/>`).join('')}
      <path d="M${-ш/2} ${-в-52} h${ш}" stroke="${ОБВОД}" stroke-width="1.2"/>
      <ellipse cx="4" cy="3" rx="${ш*0.52}" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${-ш/2}" y="${-в}" width="${ш}" height="${в}" rx="3" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${[0.33,0.66].map(t=>`<line x1="${-ш/2}" y1="${-в+в*t}" x2="${ш/2}" y2="${-в+в*t}" stroke="${ОБВОД}" stroke-width=".7" opacity=".45"/>`).join('')}
      <rect x="${-ш/2-4}" y="${-в-6}" width="${ш+8}" height="7" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1"/>
    </g>`;
  }
  /* мяч, лента, яблоко — со светом и тенью */
  function мяч(x,y,r,цвет){
    const кл=ид('мяч');
    return `<g><ellipse cx="${x+2}" cy="${y+r}" rx="${r*0.9}" ry="${r*0.2}" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <radialGradient id="${кл}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#fff"/><stop offset="0.25" stop-color="${цвет}"/><stop offset="1" stop-color="#5a1408"/></radialGradient>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${x-r} ${y} q${r} ${r*0.5} ${2*r} 0" stroke="#fff" stroke-width="${r*0.14}" fill="none" opacity=".8"/>
      <path d="M${x} ${y-r} q${r*0.5} ${r} 0 ${2*r}" stroke="#fff" stroke-width="${r*0.1}" fill="none" opacity=".5"/></g>`;
  }
  function лента(x,y,м,цвет){
    const d='M-30 0 q10 -16 20 -4 q10 12 20 -2 q10 -14 20 0 q6 8 0 16 q-8 -8 -16 2 q-10 12 -22 -2 q-10 -12 -22 6 z';
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="${d}" fill="${цвет}" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-26 -2 q8 -10 16 -2 M4 -6 q8 -8 14 -2" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6"/>
      <path d="M-30 0 q-6 10 -2 20 l6 -8 l6 6 q-4 -10 -10 -18z" fill="${цвет}" stroke="${ОБВОД}" stroke-width=".9"/></g>`;
  }
  function яблоко(x,y,r,цвет){
    const кл=ид('ябл');
    return `<g><ellipse cx="${x+2}" cy="${y+r*0.95}" rx="${r*0.9}" ry="${r*0.2}" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <radialGradient id="${кл}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffd8c8"/><stop offset="0.3" stop-color="${цвет}"/><stop offset="1" stop-color="#6a1408"/></radialGradient>
      <path d="M${x} ${y-r*0.7} q${r*1.1} ${-r*0.6} ${r*1.05} ${r*0.55} q0 ${r*0.9} ${-r*0.6} ${r*1.1} q${-r*0.45} ${r*0.1} ${-r*0.45} 0 q0 ${r*0.1} ${-r*0.45} 0 q${-r*0.6} ${-r*0.2} ${-r*0.6} ${-r*1.1} q0 ${-r*1.15} ${r*1.05} ${-r*0.55}z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${x} ${y-r*0.7} q2 ${-r*0.4} 5 ${-r*0.6}" stroke="#5a3410" stroke-width="2" fill="none"/>
      <path d="M${x+3} ${y-r*1.05} q${r*0.6} ${-r*0.4} ${r*0.9} ${r*0.05} q${-r*0.5} ${r*0.3} ${-r*0.9} ${-r*0.05}z" fill="#6ab04a" stroke="${ОБВОД}" stroke-width=".7"/>
      <ellipse cx="${x-r*0.4}" cy="${y-r*0.2}" rx="${r*0.16}" ry="${r*0.28}" fill="#fff" opacity=".6"/></g>`;
  }
  /* обычная гладкая рыбка */
  function рыбка(x,y,м,цвет,опц){
    const о=опц||{};
    const хв1='M16 0 l12 -9 q-3 9 0 18 z', хв2='M16 0 l12 -6 q-4 6 0 12 z';
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="${хв1}" fill="${цвет}" stroke="${ОБВОД}" stroke-width=".8">${ДВИЖ&&о.плывёт!==false?`<animate attributeName="d" values="${хв1};${хв2};${хв1}" dur="0.6s" repeatCount="indefinite"/>`:''}</path>
      <path d="M-20 0 q16 -14 38 0 q-22 14 -38 0z" fill="${цвет}" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-18 1 q16 8 34 -1 q-16 12 -34 1z" fill="#fff" opacity=".35"/>
      <path d="M-4 -8 q6 -6 12 0" fill="${цвет}" stroke="${ОБВОД}" stroke-width=".7"/>
      <circle cx="-12" cy="-2" r="2.4" fill="#fff" stroke="${ОБВОД}" stroke-width=".5"/><circle cx="-12.4" cy="-2" r="1.2" fill="#1a120a"/>
      <path d="M-16 -4 q10 -6 22 -2" stroke="#fff" stroke-width="1" fill="none" opacity=".5"/></g>`;
  }


  /* ---------- дельфин: тело со светотенью, плавники, глаз с бликом, прыжок ---------- */
  function дельфин(x,y,м,опц){
    const о=опц||{}, кл=ид('дельф');
    const тело='M-44 6 Q-30 -22 6 -20 Q30 -18 44 -4 Q50 0 58 -2 Q52 4 44 6 Q20 14 -10 14 Q-30 14 -44 6 Z';
    return `<g transform="translate(${x} ${y}) scale(${м})">${о.прыжок&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 18;0 -22;0 18" dur="2.6s" repeatCount="indefinite" additive="sum" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.3 0 0.6 1;0.4 0 0.7 1"/>${ЗАВОД}`:''}<g transform="scale(${о.влево?-1:1} 1)">
      <linearGradient id="${кл}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7a98"/><stop offset="0.55" stop-color="#8aa8c4"/><stop offset="1" stop-color="#e6eef4"/></linearGradient>
      <path d="M-40 4 L-58 -8 Q-54 4 -60 16 Z" fill="#5a7a98" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-4 -18 Q2 -36 16 -38 Q10 -28 12 -18 Z" fill="#5a7a98" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="${тело}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.3"/>
      <path d="M0 8 Q-2 20 -12 24 Q-2 20 6 10 Z" fill="#6a8aa8" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-30 -8 Q0 -22 30 -12" stroke="#c8dcec" stroke-width="2" fill="none" opacity=".7"/>
      <path d="M44 -2 Q48 1 54 0" stroke="${ОБВОД}" stroke-width="1" fill="none"/>
      <circle cx="34" cy="-8" r="2.6" fill="#1a120a"/><circle cx="33.2" cy="-8.8" r=".9" fill="#fff"/>
      <path d="M31 -2 q6 3 12 1" stroke="${ОБВОД}" stroke-width=".9" fill="none"/>
    </g></g>`;
  }
  /* ---------- бутылка с письмом: стекло с бликами, пробка, свёрток внутри ---------- */
  function бутылка(x,y,м,опц){
    const о=опц||{}, кл=ид('бут');
    return `<g transform="translate(${x} ${y}) rotate(${о.угол||-18}) scale(${м})">
      <ellipse cx="2" cy="16" rx="30" ry="4" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      <linearGradient id="${кл}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe8d0" stop-opacity=".85"/><stop offset="0.5" stop-color="#6ab090" stop-opacity=".7"/><stop offset="1" stop-color="#2e6a50" stop-opacity=".85"/></linearGradient>
      ${о.открыта?'':`<rect x="-8" y="-4" width="34" height="14" rx="6" fill="url(#рм-бумага)" stroke="#a88a5a" stroke-width=".8"/><line x1="-4" y1="3" x2="22" y2="3" stroke="#c8a870" stroke-width=".8"/>`}
      <path d="M-26 -10 Q-30 0 -26 12 H22 Q28 12 30 6 H44 V-4 H30 Q28 -10 22 -10 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-22 -6 H18" stroke="#fff" stroke-width="2" opacity=".7" stroke-linecap="round"/>
      ${о.открыта?'':`<rect x="44" y="-5" width="9" height="12" rx="2" fill="#b8844a" stroke="${ОБВОД}" stroke-width=".9"/>`}
    </g>`;
  }


  /* ---------- фрегат: три мачты, прямые паруса с выпуклостью и швами, бушприт, корма, окна ---------- */
  function фрегат(x,y,м,опц){
    const о=опц||{};
    const корпус='M-112 -10 L-100 22 Q-86 36 -54 36 H74 Q100 36 112 18 L122 -12 Z';
    const корма='M-112 -10 L-120 -34 H-78 L-76 -10 Z';
    const парус=(xm,y1,ш,в,k)=>{ const d=`M${xm-ш/2} ${y1} Q${xm} ${y1+в*0.12} ${xm+ш/2} ${y1} L${xm+ш*0.46} ${y1+в} Q${xm} ${y1+в*1.16} ${xm-ш*0.46} ${y1+в} Z`;
      return `<path d="${d}" fill="url(#рм-парус)" stroke="${ОБВОД}" stroke-width="1.1"/>
        ${[-0.25,0,0.25].map(t=>`<path d="M${(xm+ш*t).toFixed(1)} ${(y1+2).toFixed(1)} Q${(xm+ш*t*1.1).toFixed(1)} ${(y1+в*0.6).toFixed(1)} ${(xm+ш*t*0.95).toFixed(1)} ${(y1+в+(t===0?4:2)).toFixed(1)}" stroke="#cdbb94" stroke-width=".7" fill="none"/>`).join('')}
        <path d="M${xm-ш/2-3} ${y1} H${xm+ш/2+3}" stroke="#8a5a2e" stroke-width="3" stroke-linecap="round"/>
        <path d="M${xm-ш*0.3} ${y1+в*0.3} q${ш*0.15} -4 ${ш*0.3} 0" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/>`; };
    const мачта=(xm,в,мас)=>`<rect x="${xm-2.4}" y="${-10-в}" width="4.8" height="${в}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".7"/>
      ${парус(xm,-10-в+12,62*мас,34*мас,0)}${парус(xm,-10-в+12+38*мас,72*мас,40*мас,1)}
      <rect x="${xm-6}" y="${-10-в+2}" width="12" height="5" rx="1.5" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".6"/>`;
    const фл1='M0 0 q10 -4 20 0 q10 4 20 0 v12 q-10 4 -20 0 q-10 -4 -20 0 z', фл2='M0 0 q10 4 20 0 q10 -4 20 2 v12 q-10 -6 -20 -2 q-10 4 -20 0 z';
    return `<g transform="translate(${x} ${y}) scale(${м})">${о.качка!==false?качать('0 0;0 3.5;0 0','4s'):''}
      <g opacity=".22" transform="translate(0 66) scale(1 -0.45)"><path d="${корпус}" fill="#0b2a4a"/></g>
      <ellipse cx="4" cy="36" rx="118" ry="7" fill="#0b1c2a" opacity=".28" filter="url(#рм-мягко)"/>
      <path d="M118 -12 L170 -44" stroke="url(#рм-мачта)" stroke-width="4" stroke-linecap="round"/>
      <path d="M168 -42 L58 -150 L112 -20 Z" fill="#f1e6cc" stroke="${ОБВОД}" stroke-width="1"/>
      ${[[-58,-150,-112,-10],[-58,-150,120,-12],[0,-176,-112,-10],[0,-176,120,-12],[58,-142,120,-12]].map(([a,b,c,d])=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#6a5a44" stroke-width=".6"/>`).join('')}
      ${мачта(-58,140,0.86)}${мачта(0,166,1)}${мачта(58,132,0.82)}
      <g transform="translate(2 -178)"><path d="${фл1}" fill="${о.флаг||'#e05a3a'}" stroke="${ОБВОД}" stroke-width=".8">${ДВИЖ?`<animate attributeName="d" values="${фл1};${фл2};${фл1}" dur="1.5s" repeatCount="indefinite"/>`:''}</path></g>
      <path d="${корма}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${[-110,-100,-90].map(xx=>`<rect x="${xx}" y="-28" width="7" height="9" rx="1.5" fill="#ffd98a" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}
      <path d="${корпус}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.8"/>
      ${[4,14,24].map(yy=>`<path d="M${-104+yy*0.35} ${yy} Q-40 ${yy+5} 30 ${yy+4} T${116-yy*0.3} ${yy-8}" stroke="${ОБВОД}" stroke-width=".8" fill="none" opacity=".45"/>`).join('')}
      <path d="M-112 -10 L122 -12" stroke="#e8b878" stroke-width="3.4" stroke-linecap="round"/><path d="M-112 -10 L122 -12" stroke="${ОБВОД}" stroke-width="1" opacity=".6"/>
      <path d="M-100 6 H104" stroke="#2a4a7a" stroke-width="4"/><path d="M-100 6 H104" stroke="#e8c070" stroke-width="1" opacity=".8"/>
      ${[-70,-44,-18,8,34,60,84].map(xx=>`<rect x="${xx}" y="1" width="8" height="8" rx="1.5" fill="#1a2a3e" stroke="url(#рм-латунь)" stroke-width="1.2"/>`).join('')}
      ${о.имя?`<text x="-40" y="27" font-size="10" font-weight="bold" fill="#ffe8b0" font-family="Georgia,serif">${о.имя}</text>`:''}
      <path d="M126 30 q12 4 24 0 M-120 30 q-12 4 -24 0" stroke="#e8f6ff" stroke-width="1.6" fill="none" opacity=".8">${анЛин('opacity','0.8;0.2;0.8','2.2s')}</path>
    </g>`;
  }
  /* ---------- роза ветров: латунный обод, деления, n лучей с подписями, стрелка ---------- */
  function роза(x,y,r,опц){
    const о=опц||{}, n=о.лучей||8, подписи=о.подписи||[], угол=о.угол==null?-90:о.угол, было=о.было, свет=о.свет;
    const лучи=Array.from({length:n},(_,k)=>{ const a=-Math.PI/2+k*2*Math.PI/n, a1=a-Math.PI/n*0.42, a2=a+Math.PI/n*0.42, R=r*0.78, rr=r*0.2;
      const tip=[x+R*Math.cos(a),y+R*Math.sin(a)], l=[x+rr*Math.cos(a1),y+rr*Math.sin(a1)], p=[x+rr*Math.cos(a2),y+rr*Math.sin(a2)];
      const на=свет===k;
      return `<path d="M${f(x)} ${f(y)} L${f(l[0])} ${f(l[1])} L${f(tip[0])} ${f(tip[1])} Z" fill="${на?'#ffd76a':'#f4ead0'}" stroke="${ОБВОД}" stroke-width=".8"/>
        <path d="M${f(x)} ${f(y)} L${f(p[0])} ${f(p[1])} L${f(tip[0])} ${f(tip[1])} Z" fill="${на?'#c8901a':'#8a7a5a'}" stroke="${ОБВОД}" stroke-width=".8"/>`; }).join('');
    const мел=Array.from({length:n},(_,k)=>{ const a=-Math.PI/2+(k+0.5)*2*Math.PI/n, R=r*0.5, rr=r*0.14;
      return `<path d="M${f(x)} ${f(y)} L${f(x+rr*Math.cos(a-0.5))} ${f(y+rr*Math.sin(a-0.5))} L${f(x+R*Math.cos(a))} ${f(y+R*Math.sin(a))} L${f(x+rr*Math.cos(a+0.5))} ${f(y+rr*Math.sin(a+0.5))} Z" fill="#c8b890" stroke="${ОБВОД}" stroke-width=".6"/>`; }).join('');
    const деления=Array.from({length:72},(_,k)=>{ const a=k*Math.PI/36, r1=r*0.9, r2=r*(k%6?0.86:0.82);
      return `<line x1="${f(x+r1*Math.cos(a))}" y1="${f(y+r1*Math.sin(a))}" x2="${f(x+r2*Math.cos(a))}" y2="${f(y+r2*Math.sin(a))}" stroke="#6a5030" stroke-width="${k%6?0.6:1.1}"/>`; }).join('');
    const надписи=подписи.map((т0,k)=>{ const a=-Math.PI/2+k*2*Math.PI/n, R=r*1.18, на=свет===k;
      return `<g><circle cx="${f(x+R*Math.cos(a))}" cy="${f(y+R*Math.sin(a))}" r="${r*0.16}" fill="${на?'#ffd76a':'#1e2a3a'}" stroke="${на?'#fff4c0':'#c8a860'}" stroke-width="1.4"/>
        <text x="${f(x+R*Math.cos(a))}" y="${f(y+R*Math.sin(a)+r*0.065)}" text-anchor="middle" font-size="${f(r*0.17)}" font-weight="bold" fill="${на?'#3a2408':'#ffe8b0'}" font-family="Georgia,serif">${т0}</text></g>`; }).join('');
    const стрелка=`<g transform="rotate(${угол+90} ${x} ${y})">${было!=null&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" from="${было+90} ${x} ${y}" to="${угол+90} ${x} ${y}" dur="0.9s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 1.3 0.5 1"/>`:''}
      <path d="M${x} ${f(y-r*0.72)} L${f(x+r*0.08)} ${y} L${x} ${f(y+r*0.5)} L${f(x-r*0.08)} ${y} Z" fill="#d8402a" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M${x} ${f(y+r*0.5)} L${f(x+r*0.08)} ${y} L${f(x-r*0.08)} ${y} Z" fill="#e8ecf0"/></g>`;
    return `<g>
      <circle cx="${x+3}" cy="${y+4}" r="${r*1.02}" fill="#0b1c2a" opacity=".3" filter="url(#рм-мягко)"/>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width="1.4"/>
      <circle cx="${x}" cy="${y}" r="${r*0.93}" fill="url(#рм-бумага)" stroke="#8a6a3a" stroke-width="1"/>
      ${деления}${мел}${лучи}
      ${стрелка}
      <circle cx="${x}" cy="${y}" r="${r*0.07}" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
      <ellipse cx="${x-r*0.35}" cy="${y-r*0.45}" rx="${r*0.35}" ry="${r*0.14}" fill="#fff" opacity=".22" transform="rotate(-30 ${x-r*0.35} ${y-r*0.45})"/>
      ${надписи}
    </g>`;
  }
  /* ---------- какаду: белый, жёлтый хохолок, клюв, лапки ---------- */
  function какаду(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <g>${крутить('0 0 -18;-8 0 -18;0 0 -18','1.8s')}${[0,1,2,3].map(k=>`<path d="M${-2+k*2} -20 q${-8+k*3} -12 ${-4+k*4} -18 q2 8 ${4} 16" fill="#ffd84a" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}</g>
      <path d="M-10 12 q-4 18 4 26 l4 -8 l4 8 q6 -10 2 -26z" fill="#f4f4ec" stroke="${ОБВОД}" stroke-width=".8"/>
      <ellipse cx="0" cy="4" rx="11" ry="15" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-6 0 q-6 10 -2 20" stroke="#d8d8d0" stroke-width="3" fill="none"/>
      <circle cx="2" cy="-12" r="9" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width="1"/>
      <ellipse cx="5" cy="-10" rx="3" ry="2.2" fill="#f8d8c8" opacity=".8"/>
      <path d="M9 -14 q7 2 5 9 q-4 -1 -6 -5z" fill="#4a4e56" stroke="${ОБВОД}" stroke-width=".7"/>
      <circle cx="4" cy="-14" r="1.8" fill="#1a120a"/><circle cx="3.5" cy="-14.6" r=".6" fill="#fff"/>
      <path d="M-4 18 v6 M4 18 v6" stroke="#6a6a6a" stroke-width="2" stroke-linecap="round"/>
    </g>`;
  }
  /* ---------- морская карта: острова, курс пунктиром, крестик, маленькая роза ---------- */
  function карта(x,y,ш,в,опц){
    const о=опц||{};
    return `<g>${лист(x,y,ш,в,{})}
      <path d="M${x+ш*0.12} ${y+в*0.3} q${ш*0.08} -${в*0.12} ${ш*0.18} -${в*0.02} q${ш*0.06} ${в*0.1} -${ш*0.04} ${в*0.18} q-${ш*0.12} ${в*0.04} -${ш*0.14} -${в*0.16}z" fill="#c8d8a0" stroke="#6a8a4a" stroke-width="1"/>
      <path d="M${x+ш*0.62} ${y+в*0.6} q${ш*0.1} -${в*0.16} ${ш*0.2} -${в*0.04} q${ш*0.04} ${в*0.14} -${ш*0.08} ${в*0.2} q-${ш*0.14} ${в*0.02} -${ш*0.12} -${в*0.16}z" fill="#c8d8a0" stroke="#6a8a4a" stroke-width="1"/>
      <path d="M${x+ш*0.26} ${y+в*0.36} Q${x+ш*0.45} ${y+в*0.2} ${x+ш*0.5} ${y+в*0.5} T${x+ш*0.7} ${y+в*0.62}" stroke="#b8402a" stroke-width="2" fill="none" stroke-dasharray="5 4">${анЛин('stroke-dashoffset','0;-18','1.6s')}</path>
      <path d="M${x+ш*0.7-5} ${y+в*0.62-5} l10 10 M${x+ш*0.7+5} ${y+в*0.62-5} l-10 10" stroke="#b8402a" stroke-width="2.4"/>
      ${о.роза!==false?роза(x+ш*0.85,y+в*0.25,Math.min(ш,в)*0.13,{лучей:4}):''}
    </g>`;
  }

  /* ---------- боцман: плотный, чёрная борода, красная бандана, жилет поверх тельняшки,
     закатанные рукава, серьга, боцманская дудка. поза: 'свисток' | 'указывает' | 'стоит' ---------- */
  function боцман(x,y,м,опц){
    const о=опц||{}, кл=ид('боцм'), поза=о.поза||'стоит';
    const тело='M-22 -78 Q0 -86 22 -78 Q29 -58 25 -38 Q0 -32 -25 -38 Q-29 -58 -22 -78 Z';
    const полосы=Array.from({length:9},(_,k)=>`<rect x="-30" y="${-82+k*5}" width="60" height="2.4" fill="#2a4f8a"/>`).join('');
    const рука=(d,кисть)=>`<path d="${d}" stroke="#f4f0e6" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="${d}" stroke="#2a4f8a" stroke-width="10" stroke-dasharray="2.4 2.6" fill="none"/>
      <circle cx="${кисть[0]}" cy="${кисть[1]}" r="5.4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".9"/>`;
    const лев = рука('M-21 -74 q-12 14 -9 32',[-30,-40]);
    const прав = поза==='свисток'
      ? `${рука('M21 -74 q16 4 10 -14',[20,-90])}
         <g transform="translate(3 -93) rotate(-8)"><rect x="-2" y="-2.5" width="16" height="5" rx="2.5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="16" cy="0" r="4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/></g>
         ${ДВИЖ?[0,1,2].map(k=>`<g opacity="0"><animateTransform attributeName="transform" type="translate" values="30 -100;44 -128" dur="2.4s" begin="${k*0.8}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.4s" begin="${k*0.8}s" repeatCount="indefinite"/><path d="M0 0 v-9 l6 -2 v9" stroke="#fff4c0" stroke-width="1.6" fill="none"/><ellipse cx="-1.6" cy="0" rx="2.4" ry="1.8" fill="#fff4c0"/></g>`).join(''):''}`
      : поза==='указывает'
      ? `<g>${крутить('0 21 -74;-6 21 -74;0 21 -74','2.6s')}${рука('M21 -74 q18 -2 34 -12',[56,-87])}<path d="M59 -89 l8 -3" stroke="url(#рм-кожа)" stroke-width="3.4" stroke-linecap="round"/></g>`
      : рука('M21 -74 q12 14 9 32',[30,-40]);
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="26" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-18 -42 L-19 -5 h13 L-2 -34 L2 -34 L6 -5 h13 L18 -42 Z" fill="#3a3a44" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-21 -5 q0 -7 9 -7 q8 0 8 7 z M4 -5 q0 -7 9 -7 q8 0 8 7 z" fill="#1a120a" stroke="${ОБВОД}" stroke-width="1"/>
      ${лев}
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      <path d="${тело}" fill="#f6f2e8"/>
      <g clip-path="url(#${кл})">${полосы}
        <path d="M-30 -86 L-9 -80 L-11 -30 L-30 -30 Z M30 -86 L9 -80 L11 -30 L30 -30 Z" fill="#23324e"/>
        <rect x="-30" y="-86" width="60" height="56" fill="url(#рм-складка)"/></g>
      <path d="${тело}" fill="none" stroke="${ОБВОД}" stroke-width="1.4"/>
      <path d="M-9 -80 L-11 -38 M9 -80 L11 -38" stroke="${ОБВОД}" stroke-width=".9"/>
      ${[-70,-60,-50].map(yy=>`<circle cx="-13" cy="${yy}" r="1.5" fill="url(#рм-латунь)"/>`).join('')}
      <path d="M-26 -41 Q0 -36 26 -41" stroke="#4a2c12" stroke-width="5" fill="none"/><rect x="-5" y="-44" width="10" height="7" rx="1.5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M-4 -80 q4 16 10 20" stroke="#c8ccd4" stroke-width="1" fill="none" stroke-dasharray="1.6 1.2"/>
      ${поза==='свисток'?'':`<g transform="translate(6 -60) rotate(20)"><rect x="-1" y="-2" width="11" height="4" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="11" cy="0" r="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/></g>`}
      ${поза==='свисток'?'':прав}
      <rect x="-4.5" y="-86" width="9" height="7" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -100)">
        <ellipse cx="-16" cy="2" rx="3.2" ry="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="16" cy="2" rx="3.2" ry="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <circle cx="-16.5" cy="7.5" r="2.2" fill="none" stroke="url(#рм-латунь)" stroke-width="1.4"/>
        <ellipse cx="0" cy="0" rx="16" ry="16" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-16 2 q-3 20 8 26 q8 5 16 0 q11 -6 8 -26 q-4 8 -16 9 q-12 -1 -16 -9z" fill="#2a1c14" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-9 14 q4 4 3 9 M0 16 v9 M9 14 q-4 4 -3 9" stroke="#4a3426" stroke-width="1.1" fill="none"/>
        ${лицо({рот:о.рот||'улыбка',мигать:4.4,взгляд:о.взгляд})}
        <path d="M-9 6.5 q9 -4 18 0" stroke="#2a1c14" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M-17 -5 Q-16 -20 0 -20 Q16 -20 17 -5 Q0 -10 -17 -5 Z" fill="#c8322a" stroke="${ОБВОД}" stroke-width="1"/>
        ${[-10,-2,6,13].map(xx=>`<circle cx="${xx}" cy="-12" r="1.3" fill="#fff" opacity=".85"/>`).join('')}
        <g>${крутить('0 16 -8;6 16 -8;0 16 -8','1.7s')}<path d="M16 -8 q8 2 12 10 q-6 -2 -9 1z M16 -8 q10 -2 14 4 q-6 0 -9 3z" fill="#b02a22" stroke="${ОБВОД}" stroke-width=".7"/></g>
      </g>
      ${поза==='свисток'?прав:''}
    </g>`;
  }

  /* ---------- ящик с грузом: рама, доски, диагональ, гвозди, бумажный ярлык.
     (x,y) — середина дна. опц.надпись — готовое содержимое <text> (можно с tspan), опц.кегль ---------- */
  function ящик(x,y,ш,в,опц){
    const о=опц||{}, р=Math.max(4,Math.min(7,ш*0.09));
    return `<g transform="translate(${x} ${y})">
      <ellipse cx="3" cy="1" rx="${ш*0.56}" ry="3.6" fill="#231a12" opacity=".4" filter="url(#рм-мягко)"/>
      <rect x="${-ш/2}" y="${-в}" width="${ш}" height="${в}" rx="1.5" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${[1,2].map(k=>`<path d="M${-ш/2} ${f(-в+в*k/3)} h${ш}" stroke="${ОБВОД}" stroke-width=".7" opacity=".45"/>`).join('')}
      <path d="M${f(-ш/2+р)} ${f(-р)} L${f(ш/2-р*2)} ${f(-в+р)} L${f(ш/2-р)} ${f(-в+р)} L${f(-ш/2+р*2)} ${f(-р)} Z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7" opacity=".9"/>
      <path d="M${-ш/2} ${-в} h${ш} v${р} h${-ш} z M${-ш/2} ${-р} h${ш} v${р} h${-ш} z M${-ш/2} ${-в} h${р} v${в} h${-р} z M${ш/2-р} ${-в} h${р} v${в} h${-р} z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${[[-1,-1],[1,-1],[-1,1],[1,1]].map(([a,b])=>`<circle cx="${f(a*(ш/2-р/2))}" cy="${f(b>0?-р/2:-в+р/2)}" r="1.1" fill="#c8ccd4" stroke="${ОБВОД}" stroke-width=".3"/>`).join('')}
      <rect x="${-ш/2}" y="${-в}" width="${ш*0.1}" height="${в}" fill="#fff" opacity=".12"/>
      ${о.надпись?`<rect x="${f(-ш/2+р+2)}" y="${f(-в*0.5-(о.кегль||12)*0.72)}" width="${f(ш-р*2-4)}" height="${f((о.кегль||12)*1.3)}" rx="2" fill="url(#рм-бумага)" stroke="${ОБВОД}" stroke-width=".6"/>
        <text x="0" y="${f(-в*0.5+(о.кегль||12)*0.3)}" text-anchor="middle" font-size="${о.кегль||12}" font-weight="bold" fill="#2e2416" font-family="Georgia,serif">${о.надпись}</text>`:''}
    </g>`;
  }

  /* ---------- грузовая стрела: столб, стрела, топенант, блок, трос, гак, стропы, груз.
     (x,y) — низ столба, (x1,y1) — нок стрелы; трос — длина до гака; груз — svg, (0,0) — гак.
     опц.спуск — на сколько груз был выше: опускается один раз; опц.качка:false ---------- */
  function стрела(x,y,x1,y1,трос,груз,опц){
    const о=опц||{}, в=о.высота||(y-y1+30), ст=о.стропы||0, сп=о.спуск||0;
    const опуск = (сп&&ДВИЖ)?`<animateTransform attributeName="transform" type="translate" from="0 ${сп}" to="0 0" dur="1.1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.9 0.4 1.1"/>`:'';
    return `<g>
      <rect x="${x-5}" y="${y-в}" width="10" height="${в}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="${x}" cy="${y-в}" r="4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
      <line x1="${x}" y1="${y-в}" x2="${x1}" y2="${y1}" stroke="#6a5a44" stroke-width="1.2"/>
      <line x1="${x}" y1="${f(y-в*0.22)}" x2="${x1}" y2="${y1}" stroke="url(#рм-мачта)" stroke-width="6" stroke-linecap="round"/>
      <line x1="${x}" y1="${f(y-в*0.22)}" x2="${x1}" y2="${y1}" stroke="${ОБВОД}" stroke-width="6" stroke-linecap="round" opacity=".25" stroke-dasharray="0.1 999"/>
      <rect x="${x-7}" y="${f(y-в*0.22-4)}" width="14" height="8" rx="2" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
      <g>${о.качка===false?'':крутить(`-2.5 ${x1} ${y1};2.5 ${x1} ${y1};-2.5 ${x1} ${y1}`,'3.4s')}
        <g>${опуск}
          <line x1="${x1}" y1="${y1-сп}" x2="${x1}" y2="${y1+трос}" stroke="#8a7a5a" stroke-width="1.6"/>
          <g transform="translate(${x1} ${y1+трос})">
            ${ст?`<path d="M0 2 L${-ст} 16 M0 2 L${ст} 16" stroke="#8a7a5a" stroke-width="1.3"/>`:''}
            ${груз||''}
            <path d="M0 -4 v6 q0 5 -4 4" stroke="url(#рм-железо)" stroke-width="2.6" fill="none" stroke-linecap="round"/>
          </g>
        </g>
      </g>
      <g transform="translate(${x1} ${y1})"><rect x="-5" y="-4" width="10" height="11" rx="3" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/><circle cx="0" cy="1.5" r="2.6" fill="url(#рм-латунь)"/></g>
    </g>`;
  }

  /* ---------- фонарь: кольцо, колпак, стекло с огоньком, ореол ---------- */
  function фонарь(x,y,м,горит){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      ${typeof горит==='string'?`<circle cx="0" cy="19" r="22" fill="${горит}" opacity=".45" filter="url(#рм-очмягко)" data-декор="1">${анЛин('opacity','0.4;0.6;0.4','1.6s')}</circle>`:горит?`<circle cx="0" cy="18" r="30" fill="url(#рм-огонь)" opacity=".5" data-декор="1">${анЛин('opacity','0.45;0.6;0.42;0.55;0.45','1.3s')}</circle>`:''}
      <circle cx="0" cy="2" r="3" fill="none" stroke="url(#рм-железо)" stroke-width="1.6"/>
      <path d="M-8 11 L-4 5 H4 L8 11 Z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="-6.5" y="11" width="13" height="16" rx="1.5" fill="${typeof горит==='string'?горит:горит?'#ffd98a':'#3a4450'}" stroke="${ОБВОД}" stroke-width=".8"/>
      ${горит===true?`<path d="M0 24 q-3.4 -4 0 -9 q3.4 5 0 9z" fill="#ff8a2a">${ДВИЖ?`<animateTransform attributeName="transform" type="scale" values="1 1;0.9 1.1;1 1" dur="0.7s" repeatCount="indefinite" additive="sum"/>`:''}</path>`:''}
      <path d="M-2.2 11 v16 M2.2 11 v16" stroke="${ОБВОД}" stroke-width=".7" opacity=".7"/>
      <rect x="-8" y="27" width="16" height="3.4" rx="1" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/>
    </g>`;
  }

  /* ---------- трюмы в разрезе: корпус, обшивка, переборки, шпангоуты, люки, фонари.
     (x,y) — левый край палубы; опц.n — число отсеков, опц.внутри[i] — svg, (0,0) — середина пола отсека;
     опц.свет — true или массив отсеков с горящим фонарём; опц.подписи[i] — надпись таблички ---------- */
  function трюмыОтсеки(x,y,ш,в,n){
    const лев=x+ш*0.07, пр=x+ш*0.93, шир=(пр-лев)/n, пол=y+в-24;
    return Array.from({length:n},(_,i)=>({x:лев+шир*i, ш:шир, cx:лев+шир*(i+0.5), верх:y+10, пол:пол}));
  }
  function трюмы(x,y,ш,в,опц){
    const о=опц||{}, n=о.n||3, от=трюмыОтсеки(x,y,ш,в,n), пол=от[0].пол;
    const наружу=`M${x} ${y} H${x+ш} L${f(x+ш-ш*0.035)} ${y+в-28} Q${f(x+ш*0.5)} ${y+в+14} ${f(x+ш*0.035)} ${y+в-28} Z`;
    const внутрь=`M${x+9} ${y+8} H${x+ш-9} L${f(x+ш-ш*0.035-7)} ${y+в-30} Q${f(x+ш*0.5)} ${y+в+2} ${f(x+ш*0.035+7)} ${y+в-30} Z`;
    const горит=(i)=>о.свет===true||(Array.isArray(о.свет)&&о.свет.includes(i));
    return `<g>
      <path d="${наружу}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.8"/>
      ${[0.35,0.62,0.85].map(t=>`<path d="M${x+2} ${f(y+в*t*0.9)} Q${f(x+ш*0.5)} ${f(y+в*t+ (t>0.8?12:6))} ${x+ш-2} ${f(y+в*t*0.9)}" stroke="${ОБВОД}" stroke-width=".7" fill="none" opacity=".4"/>`).join('')}
      <path d="${внутрь}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${от.map(о2=>[0.2,0.5,0.8].map(t=>`<path d="M${f(о2.x+о2.ш*t)} ${y+10} V${пол}" stroke="#1a0e06" stroke-width="3" opacity=".25" data-декор="1"/>`).join('')).join('')}
      <rect x="${f(от[0].x-4)}" y="${пол}" width="${f(ш*0.86+8)}" height="6" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${от.slice(1).map(о2=>`<rect x="${f(о2.x-3.5)}" y="${y+8}" width="7" height="${пол-y-8}" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".9"/>`).join('')}
      ${от.map((о2,i)=>горит(i)?`<ellipse cx="${f(о2.cx)}" cy="${f((y+пол)/2+6)}" rx="${f(о2.ш*0.46)}" ry="${f((пол-y)*0.5)}" fill="url(#рм-огонь)" opacity=".28" data-декор="1"/>`:'').join('')}
      ${от.map((о2,i)=>о.внутри&&о.внутри[i]?`<g transform="translate(${f(о2.cx)} ${пол})">${о.внутри[i]}</g>`:'').join('')}
      <rect x="${x-4}" y="${y-4}" width="${ш+8}" height="12" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M${x-4} ${y+2} H${x+ш+4}" stroke="${ОБВОД}" stroke-width=".6" opacity=".5"/>
      ${от.map(о2=>`<rect x="${f(о2.cx-о2.ш*0.2)}" y="${y-8}" width="${f(о2.ш*0.4)}" height="8" rx="1.5" fill="url(#рм-доскатём)" stroke="url(#рм-латунь)" stroke-width="1.4"/>`).join('')}
      ${Array.from({length:9},(_,k)=>`<rect x="${f(x+k*ш/8-1.6)}" y="${y-18}" width="3.2" height="14" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".4"/>`).join('')}
      <rect x="${x-6}" y="${y-21}" width="${ш+12}" height="5" rx="2.5" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${от.map((о2,i)=>фонарь(о2.cx+о2.ш*0.38,y+8,0.8,горит(i))).join('')}
      ${о.подписи?от.map((о2,i)=>о.подписи[i]?`<g><rect x="${f(о2.cx-о2.ш*0.29)}" y="${y+16}" width="${f(о2.ш*0.5)}" height="18" rx="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
        <text x="${f(о2.cx-о2.ш*0.04)}" y="${y+29}" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#3a2408" font-family="Georgia,serif">${о.подписи[i]}</text></g>`:'').join(''):''}
    </g>`;
  }

  /* ---------- пристань на сваях: настил, сваи с кругами воды, кнехт ---------- */
  function пристань(x,y,ш,в,опц){
    const о=опц||{}, сваи=Math.max(2,Math.round(ш/42));
    return `<g>
      ${Array.from({length:сваи},(_,k)=>{ const xx=x+8+k*(ш-16)/(сваи-1);
        return `<rect x="${f(xx-4)}" y="${y+6}" width="8" height="${в}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
          <ellipse cx="${f(xx)}" cy="${y+в}" rx="9" ry="2" fill="none" stroke="#e8f6ff" stroke-width="1" opacity=".6" data-декор="1">${анЛин('rx','7;12;7','2.6s')}</ellipse>`; }).join('')}
      <rect x="${x}" y="${y}" width="${ш}" height="10" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${Array.from({length:Math.floor(ш/16)},(_,k)=>`<line x1="${x+(k+1)*16}" y1="${y}" x2="${x+(k+1)*16}" y2="${y+10}" stroke="${ОБВОД}" stroke-width=".6" opacity=".45"/>`).join('')}
      <rect x="${x}" y="${y}" width="${ш}" height="2" fill="#f0c890" opacity=".5"/>
      ${о.кнехт===false?'':`<g transform="translate(${x+ш-18} ${y})"><rect x="-5" y="-10" width="10" height="10" rx="2" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="-8" y="-12" width="16" height="4" rx="2" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".8"/></g>`}
    </g>`;
  }

  /* ---------- портовый склад: штукатурка, черепица, арка с распахнутыми створками, вывеска ---------- */
  function склад(x,y,ш,в,опц){
    const о=опц||{}, кр=в*0.34;
    return `<g transform="translate(${x} ${y})">
      <rect x="${-ш/2}" y="${-в}" width="${ш}" height="${в}" fill="#e8d4b0" stroke="${ОБВОД}" stroke-width="1.3"/>
      <rect x="${-ш/2}" y="${-в}" width="${ш}" height="${в}" fill="url(#рм-складка)" opacity=".6"/>
      ${[[-0.4,-0.7],[0.3,-0.4],[-0.2,-0.25]].map(([a,b])=>`<rect x="${f(ш*a)}" y="${f(в*b)}" width="14" height="6" fill="#c8b08a" opacity=".5" data-декор="1"/>`).join('')}
      <path d="M${-ш/2-8} ${-в} L0 ${f(-в-кр)} L${ш/2+8} ${-в} Z" fill="#b8482e" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${[0.3,0.6].map(t=>`<path d="M${f(-ш/2-8+ (ш/2+8)*t)} ${f(-в-кр*t)} L${f(ш/2+8-(ш/2+8)*t)} ${f(-в-кр*t)}" stroke="#7a2a1a" stroke-width=".9" opacity=".6"/>`).join('')}
      <path d="M${f(-ш*0.2)} 0 V${f(-в*0.5)} a${f(ш*0.2)} ${f(ш*0.2)} 0 0 1 ${f(ш*0.4)} 0 V0 Z" fill="#2a1a0e" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M${f(-ш*0.2)} 0 V${f(-в*0.5)} l${f(-ш*0.1)} 4 V2 Z M${f(ш*0.2)} 0 V${f(-в*0.5)} l${f(ш*0.1)} 4 V2 Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".9"/>
      ${[-0.38,0.32].map(t=>`<rect x="${f(ш*t)}" y="${f(-в*0.8)}" width="${f(ш*0.07)}" height="${f(в*0.2)}" fill="#3a4a5a" stroke="${ОБВОД}" stroke-width=".8"/>`).join('')}
      ${о.надпись?`<rect x="${f(-ш*0.3)}" y="${f(-в*0.95)}" width="${f(ш*0.6)}" height="16" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/><text x="0" y="${f(-в*0.95+12)}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffe8b0" font-family="Georgia,serif">${о.надпись}</text>`:''}
    </g>`;
  }

  /* ---------- штурвал: обод, спицы с рукоятями, латунная ступица, «королевская» спица с бандажом.
     опц.подписи — неподвижные кружки вокруг; опц.угол — поворот штурвала (°), опц.было — откуда
     повернуть один раз; опц.свет — номер подписи, на которую смотрит королевская спица ---------- */
  function штурвал(x,y,r,опц){
    const о=опц||{}, п=о.подписи||[], n=п.length||8, спиц=Math.max(n,6), угол=о.угол||0, было=о.было, свет=о.свет;
    const спицы=Array.from({length:спиц},(_,k)=>{ const a=-90+k*360/спиц;
      return `<g transform="rotate(${f(a+90)} ${x} ${y})">
        <rect x="${f(x-r*0.05)}" y="${f(y-r*1.02)}" width="${f(r*0.1)}" height="${f(r*0.84)}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".7"/>
        <path d="M${f(x-r*0.07)} ${f(y-r*1.08)} Q${f(x-r*0.1)} ${f(y-r*1.2)} ${f(x-r*0.06)} ${f(y-r*1.32)} Q${x} ${f(y-r*1.4)} ${f(x+r*0.06)} ${f(y-r*1.32)} Q${f(x+r*0.1)} ${f(y-r*1.2)} ${f(x+r*0.07)} ${f(y-r*1.08)} Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".9"/>
        ${k===0?`<rect x="${f(x-r*0.08)}" y="${f(y-r*1.2)}" width="${f(r*0.16)}" height="${f(r*0.06)}" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>`:''}
      </g>`; }).join('');
    const вращ = (было!=null&&ДВИЖ) ? `<animateTransform attributeName="transform" type="rotate" from="${было} ${x} ${y}" to="${угол} ${x} ${y}" dur="1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 1.25 0.5 1"/>` : '';
    const надписи=п.map((т0,k)=>{ const a=(-90+k*360/n)*Math.PI/180, R=r*1.62, на=свет===k;
      return `<g><circle cx="${f(x+R*Math.cos(a))}" cy="${f(y+R*Math.sin(a))}" r="${f(r*0.24)}" fill="${на?'#ffd76a':'#1e2a3a'}" stroke="${на?'#fff4c0':'#c8a860'}" stroke-width="1.5"/>
        <text x="${f(x+R*Math.cos(a))}" y="${f(y+R*Math.sin(a)+r*0.08)}" text-anchor="middle" font-size="${f(r*0.22)}" font-weight="bold" fill="${на?'#3a2408':'#ffe8b0'}" font-family="Georgia,serif">${т0}</text></g>`; }).join('');
    return `<g>
      <circle cx="${x+4}" cy="${y+5}" r="${r*1.05}" fill="none" stroke="#0b1c2a" stroke-width="${f(r*0.14)}" opacity=".3" filter="url(#рм-мягко)"/>
      <g transform="rotate(${угол} ${x} ${y})">${вращ}
        ${спицы}
        <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#5a3418" stroke-width="${f(r*0.16)}"/>
        <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="url(#рм-доска)" stroke-width="${f(r*0.12)}"/>
        <circle cx="${x}" cy="${y}" r="${f(r*0.84)}" fill="none" stroke="url(#рм-латунь)" stroke-width="${f(r*0.05)}"/>
        ${Array.from({length:спиц},(_,k)=>{ const a=(k*360/спиц+180/спиц)*Math.PI/180; return `<circle cx="${f(x+r*Math.cos(a))}" cy="${f(y+r*Math.sin(a))}" r="${f(r*0.025)}" fill="#e8c070"/>`; }).join('')}
        <circle cx="${x}" cy="${y}" r="${f(r*0.24)}" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width="1"/>
        <circle cx="${x}" cy="${y}" r="${f(r*0.12)}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
        <circle cx="${f(x-r*0.07)}" cy="${f(y-r*0.08)}" r="${f(r*0.05)}" fill="#fff" opacity=".5"/>
      </g>
      ${свет!=null?`<path d="M${x} ${f(y-r*1.44)} l${f(-r*0.08)} ${f(-r*0.1)} h${f(r*0.16)} z" fill="#ffd76a" stroke="${ОБВОД}" stroke-width=".6" opacity="0"/>`:''}
      ${надписи}
    </g>`;
  }

  /* ---------- рында: кронштейн, бронзовый колокол, язык, плетёный линёк; звонит — качается и звучит ---------- */
  function рында(x,y,м,опц){
    const о=опц||{};
    const кач = о.звонит&&ДВИЖ ? `<animateTransform attributeName="transform" type="rotate" values="0 0 14;16 0 14;-14 0 14;10 0 14;0 0 14" dur="1.2s" repeatCount="indefinite"/>` : '';
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-34 -4 H0 q8 0 8 8 v6" stroke="url(#рм-железо)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <rect x="-38" y="-10" width="8" height="14" rx="2" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
      <g transform="translate(8 0)"><g>${кач}
        <circle cx="0" cy="12" r="4" fill="none" stroke="url(#рм-железо)" stroke-width="2.4"/>
        <path d="M-7 18 Q-8 16 0 15 Q8 16 7 18 Q10 30 12 42 Q18 44 18 50 H-18 Q-18 44 -12 42 Q-10 30 -7 18 Z" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-17 46 H17" stroke="#8a5a1a" stroke-width="1.4"/><path d="M-9 26 H9" stroke="#8a5a1a" stroke-width="1" opacity=".7"/>
        <path d="M-5 20 Q-8 32 -11 42" stroke="#fff4c0" stroke-width="2" fill="none" opacity=".7"/>
        <circle cx="0" cy="52" r="3.4" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/>
        <path d="M0 55 q-3 10 1 20 q3 8 -1 14" stroke="#e8dcc0" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M0 55 q-3 10 1 20 q3 8 -1 14" stroke="#b8a888" stroke-width="3" fill="none" stroke-dasharray="1.6 2" />
        <path d="M-4 88 q4 -4 8 0 l-1 8 h-6z" fill="#e8dcc0" stroke="${ОБВОД}" stroke-width=".6"/>
      </g></g>
      ${о.звонит?[0,1].map(k=>`<path d="M${-22-k*8} ${24-k*4} q${-6} 12 0 24 M${38+k*8} ${24-k*4} q6 12 0 24" stroke="#fff4c0" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8">${анЛин('opacity','0.9;0;0.9','0.6s',`begin="${k*0.3}s"`)}</path>`).join(''):''}
    </g>`;
  }

  /* ---------- грифельная доска: деревянная рама, аспидное поле, разводы мела, полочка с мелом.
     (x,y) — левый верхний угол ---------- */
  function доска(x,y,ш,в,опц){
    const о=опц||{};
    return `<g>
      <rect x="${x+3}" y="${y+5}" width="${ш}" height="${в}" rx="4" fill="#0b1c2a" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <rect x="${x+7}" y="${y+7}" width="${ш-14}" height="${в-14}" rx="2" fill="${о.цвет||'#2c3a35'}" stroke="#1a120a" stroke-width="1"/>
      <ellipse cx="${f(x+ш*0.3)}" cy="${f(y+в*0.4)}" rx="${f(ш*0.22)}" ry="${f(в*0.12)}" fill="#fff" opacity=".035" data-декор="1"/>
      <ellipse cx="${f(x+ш*0.7)}" cy="${f(y+в*0.7)}" rx="${f(ш*0.18)}" ry="${f(в*0.08)}" fill="#fff" opacity=".03" data-декор="1"/>
      <rect x="${x+7}" y="${y+7}" width="${ш-14}" height="3" fill="#fff" opacity=".06"/>
      ${о.полка===false?'':`<rect x="${x+ш*0.1}" y="${y+в-3}" width="${ш*0.8}" height="6" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="${f(x+ш*0.62)}" y="${y+в-7}" width="14" height="4" rx="2" fill="#f4f0e6" stroke="#c8c0b0" stroke-width=".5"/>`}
    </g>`;
  }

  window.РМ = {ДВИЖ, defs, небо, солнце, облако, море, берег, утёс, лодка, парусник, юнга, капитан, чайка,
    сундук, бочка, якорь, бухта, краб, морзвезда, ёрш, весло, маяк, лист, доски, качать, крутить,
    флаг, прилавок, мяч, лента, яблоко, рыбка, дельфин, бутылка, фрегат, роза, какаду, карта, штурман,
    боцман, ящик, стрела, фонарь, трюмы, трюмыОтсеки, пристань, склад, штурвал, рында, доска};
})();
