/* ============ РИСУНКИ МОРЯ · ОБЩАЯ БИБЛИОТЕКА ДЛЯ УРОКОВ 3 КЛАССА «ВДОЛЬ БЕРЕГА» ============
   Подключается ДО уроков, которые её используют (861–876).
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
    <linearGradient id="рм-мрамор" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fbf8f0"/><stop offset="0.6" stop-color="#ece4d2"/><stop offset="1" stop-color="#cfc3a8"/>
    </linearGradient>
    <linearGradient id="рм-колонна" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#b8ab90"/><stop offset="0.3" stop-color="#fbf8f0"/><stop offset="0.55" stop-color="#efe7d6"/><stop offset="1" stop-color="#a89a7c"/>
    </linearGradient>
    <linearGradient id="рм-глина" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8a3a1a"/><stop offset="0.35" stop-color="#e0864a"/><stop offset="0.6" stop-color="#c8662e"/><stop offset="1" stop-color="#6a2a10"/>
    </linearGradient>
    <linearGradient id="рм-бронза" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0c890"/><stop offset="0.45" stop-color="#b8783a"/><stop offset="1" stop-color="#5a3414"/>
    </linearGradient>
    <linearGradient id="рм-хитон" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#d8d0c0"/><stop offset="0.35" stop-color="#fbf8f0"/><stop offset="0.7" stop-color="#f0ead8"/><stop offset="1" stop-color="#c8bca4"/>
    </linearGradient>
    <linearGradient id="рм-шторм" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1a2230"/><stop offset="0.5" stop-color="#34425a"/><stop offset="0.85" stop-color="#5a6a80"/><stop offset="1" stop-color="#7a8a9c"/>
    </linearGradient>
    <linearGradient id="рм-морешторм" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a6a78"/><stop offset="0.4" stop-color="#2a4a5a"/><stop offset="1" stop-color="#0e2230"/>
    </linearGradient>
    <linearGradient id="рм-туча" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a6678"/><stop offset="1" stop-color="#252c3a"/>
    </linearGradient>
    <radialGradient id="рм-вспышка" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset="0.35" stop-color="#d8e4ff" stop-opacity=".45"/><stop offset="1" stop-color="#d8e4ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="рм-стена" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4a2a12"/><stop offset="0.5" stop-color="#6a3e1c"/><stop offset="1" stop-color="#3e220e"/>
    </linearGradient>
    <linearGradient id="рм-камень" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4e6c4"/><stop offset="0.6" stop-color="#e0c898"/><stop offset="1" stop-color="#b89868"/>
    </linearGradient>
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
    return `<g data-декор="1"><rect x="0" y="${y0}" width="${ш}" height="${в}" fill="url(#рм-${о.шторм?'морешторм':о.ночь?'мореночь':'море'})"/>
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
    const о=опц||{}, кл=ид('боцм'), поза=о.поза||'стоит', кок=!!о.кок;
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
        ${кок?'':'<path d="M-30 -86 L-9 -80 L-11 -30 L-30 -30 Z M30 -86 L9 -80 L11 -30 L30 -30 Z" fill="#23324e"/>'}
        <rect x="-30" y="-86" width="60" height="56" fill="url(#рм-складка)"/></g>
      <path d="${тело}" fill="none" stroke="${ОБВОД}" stroke-width="1.4"/>
      <path d="M-9 -80 L-11 -38 M9 -80 L11 -38" stroke="${ОБВОД}" stroke-width=".9"/>
      ${[-70,-60,-50].map(yy=>`<circle cx="-13" cy="${yy}" r="1.5" fill="url(#рм-латунь)"/>`).join('')}
      <path d="M-26 -41 Q0 -36 26 -41" stroke="#4a2c12" stroke-width="5" fill="none"/><rect x="-5" y="-44" width="10" height="7" rx="1.5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M-4 -80 q4 16 10 20" stroke="#c8ccd4" stroke-width="1" fill="none" stroke-dasharray="1.6 1.2"/>
      ${поза==='свисток'?'':`<g transform="translate(6 -60) rotate(20)"><rect x="-1" y="-2" width="11" height="4" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="11" cy="0" r="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/></g>`}
      ${кок?`<path d="M-17 -70 H17 L21 -20 Q0 -14 -21 -20 Z" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width="1"/><path d="M-17 -70 Q0 -80 17 -70" stroke="${ОБВОД}" stroke-width=".8" fill="none"/><path d="M-10 -40 h20 v10 h-20z" fill="none" stroke="#c8c0b0" stroke-width=".8"/><path d="M-21 -44 q-6 4 -4 10 M21 -44 q6 4 4 10" stroke="#fbfbf6" stroke-width="2" fill="none"/>`:''}
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
        ${кок?`<rect x="-15" y="-16" width="30" height="10" rx="2" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width=".9"/><path d="M-16 -15 Q-22 -30 -8 -32 Q-4 -44 6 -38 Q20 -40 18 -26 Q22 -20 15 -15 Z" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width=".9"/><path d="M-6 -30 q4 -4 8 0 M4 -34 q4 -2 6 2" stroke="#d8d8d0" stroke-width="1" fill="none"/>`:`<path d="M-17 -5 Q-16 -20 0 -20 Q16 -20 17 -5 Q0 -10 -17 -5 Z" fill="#c8322a" stroke="${ОБВОД}" stroke-width="1"/>`}
        ${кок?'':[-10,-2,6,13].map(xx=>`<circle cx="${xx}" cy="-12" r="1.3" fill="#fff" opacity=".85"/>`).join('')}
        ${кок?'':`<g>${крутить('0 16 -8;6 16 -8;0 16 -8','1.7s')}<path d="M16 -8 q8 2 12 10 q-6 -2 -9 1z M16 -8 q10 -2 14 4 q-6 0 -9 3z" fill="#b02a22" stroke="${ОБВОД}" stroke-width=".7"/></g>`}
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

  /* ---------- шторм: свинцовое небо, рваные тучи, вспышки молний по всему кадру ---------- */
  function шторм(ш,в,опц){
    const о=опц||{};
    const туча=(x,y,м,д)=>`<g transform="translate(${x} ${y}) scale(${м})" data-декор="1">${д?качать('0 0;'+д+' 0;0 0',(10+Math.abs(д)).toFixed(0)+'s'):''}
      <path d="M-60 10 q-8 -22 16 -26 q6 -24 34 -20 q14 -20 40 -6 q26 -8 30 16 q20 4 14 26 z" fill="#161c28" opacity=".35" transform="translate(4 6)"/>
      <path d="M-60 10 q-8 -22 16 -26 q6 -24 34 -20 q14 -20 40 -6 q26 -8 30 16 q20 4 14 26 z" fill="url(#рм-туча)" stroke="#1a2030" stroke-width="1"/>
      <path d="M-40 -12 q10 -14 26 -10 M4 -24 q14 -10 30 0" stroke="#8a96a8" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round"/>
    </g>`;
    const вспышка = о.вспышка!==false && ДВИЖ ? `<rect x="0" y="0" width="${ш}" height="${в}" fill="#e8f0ff" opacity="0" data-декор="1"><animate attributeName="opacity" values="0;0;0.5;0;0.3;0;0" keyTimes="0;0.6;0.62;0.66;0.69;0.73;1" dur="${о.такт||5}s" repeatCount="indefinite"/></rect>`:'';
    return `<g><rect x="0" y="0" width="${ш}" height="${в}" fill="url(#рм-шторм)"/></g>
      ${(о.тучи||[[60,30,1,6],[200,20,1.2,-8],[310,44,0.9,5]]).map(([x,y,м,д])=>туча(x,y,м,д)).join('')}
      ${вспышка}`;
  }
  /* молния: (x,y) — где выходит из тучи; вспыхивает в такт шторму (опц.такт), опц.всегда — горит постоянно */
  function молния(x,y,м,опц){
    const о=опц||{}, такт=о.такт||5, всегда=о.всегда||!ДВИЖ;
    const d='M0 0 L-10 34 L4 34 L-8 70 L2 70 L-12 108 L14 60 L2 60 L14 28 L2 28 L10 0 Z';
    const миг = всегда ? (ДВИЖ?`<animate attributeName="opacity" values="1;0.7;1;1;0.85;1" keyTimes="0;0.08;0.16;0.6;0.66;1" dur="2.2s" repeatCount="indefinite"/>`:'') : `<animate attributeName="opacity" values="0;0;1;0.2;1;0;0" keyTimes="0;0.6;0.62;0.66;0.69;0.73;1" dur="${такт}s" repeatCount="indefinite"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})" opacity="${всегда?1:0}" data-декор="1">${миг}
      <circle cx="0" cy="54" r="64" fill="url(#рм-вспышка)"/>
      <path d="${d}" fill="#fff4b0" stroke="#ffe070" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="${d}" fill="#fffef4" transform="translate(1 2) scale(.55 .96)"/>
    </g>`;
  }
  /* косой дождь в прямоугольнике (0,y0)–(ш,y0+в), бесшовно идёт по кругу */
  function дождь(ш,в,опц){
    const о=опц||{}, n=о.капель||46, y0=о.y0||0, кл=ид('дождь'), сдв=в*5/14;
    const линии=Array.from({length:n},(_,k)=>{ const x=(k*37)%(ш+сдв+60)-30, y=y0+((k*53)%в);
      return `<line x1="${f(x)}" y1="${y}" x2="${f(x-5)}" y2="${y+14}" stroke="#c8d8ee" stroke-width="${k%3?1:1.4}" opacity="${k%2?0.45:0.7}" stroke-linecap="round"/>`; }).join('');
    return `<g data-декор="1"><clipPath id="${кл}"><rect x="0" y="${y0}" width="${ш}" height="${в}"/></clipPath>
      <g clip-path="url(#${кл})"><g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${f(-сдв)} ${в}" dur="${о.темп||0.8}s" repeatCount="indefinite"/>`:''}
        ${линии}<g transform="translate(${f(сдв)} ${-в})">${линии}</g></g></g></g>`;
  }
  /* всплеск: корона брызг. опц.раз — вспыхнуть один раз (после броска), опц.задержка — через сколько секунд */
  function всплеск(x,y,м,опц){
    const о=опц||{}, раз=о.раз, нач=(о.задержка||0).toFixed(2)+'s';
    const анимация = ДВИЖ ? (раз
      ? `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.6;1" dur="1.3s" begin="${нач}" fill="freeze"/><animateTransform attributeName="transform" type="scale" values="0.3;1.15;1" dur="0.6s" begin="${нач}" fill="freeze" additive="sum"/>`
      : `<animateTransform attributeName="transform" type="scale" values="0.7;1.05;0.7" dur="1.6s" repeatCount="indefinite" additive="sum"/>`) : '';
    if(раз && !ДВИЖ) return '';
    return `<g transform="translate(${x} ${y}) scale(${м})" data-декор="1"><g opacity="${раз?0:1}">${анимация}
      <ellipse cx="0" cy="0" rx="24" ry="5" fill="#e8f6ff" opacity=".6"/>
      <path d="M-18 0 q-6 -14 -2 -24 q4 10 8 12 q0 -18 8 -26 q2 16 6 16 q4 -14 12 -18 q-2 14 2 20 q6 -6 10 -2 q-6 10 -8 22 z" fill="#f4fbff" stroke="#8ac8e8" stroke-width="1"/>
      ${[[-24,-30,2.4],[-6,-40,2],[14,-36,2.6],[26,-22,1.8]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="#f4fbff" stroke="#8ac8e8" stroke-width=".7"/>`).join('')}
    </g></g>`;
  }
  /* вал: штормовая волна с загнутым гребнем и пеной, (x,y) — середина подошвы */
  function вал(x,y,м,опц){
    const о=опц||{};
    const тело='M-80 0 Q-60 -20 -30 -50 Q0 -80 30 -70 Q56 -62 50 -40 Q40 -54 24 -50 Q6 -44 10 -24 Q20 0 80 0 Z';
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})" data-декор="1">${качать('0 0;0 -4;0 0','2.6s')}
      <path d="${тело}" fill="url(#рм-морешторм)" stroke="#0e2230" stroke-width="1.2"/>
      <path d="M-70 -8 Q-44 -36 -24 -56 Q2 -76 30 -70" stroke="#8ab8c8" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M30 -70 Q56 -62 50 -40 Q40 -54 24 -50 Q14 -48 10 -40 Q16 -60 30 -70 Z" fill="#f4fbff" stroke="#bfe0ee" stroke-width="1"/>
      ${[[40,-76,3],[54,-66,2.4],[60,-50,2],[48,-82,1.6]].map(([a,b,r])=>`<circle cx="${a}" cy="${b}" r="${r}" fill="#f4fbff">${анЛин('opacity','1;0.3;1',(1+r*0.2).toFixed(1)+'s')}</circle>`).join('')}
      <path d="M-20 -20 q10 -6 20 0 M-50 -12 q10 -6 20 0" stroke="#bfe0ee" stroke-width="1.2" fill="none" opacity=".7"/>
    </g>`;
  }

  /* ---------- каюта: стена из досок, балки, латунный иллюминатор с ночным морем, пол.
     опц.иллюминатор [x,y], опц.r, опц.пол — высота пола (false — без пола), опц.лампа [x, длина подвеса] ---------- */
  function каюта(ш,в,опц){
    const о=опц||{}, кл=ид('илл'), пх=о.иллюминатор||[ш*0.78,в*0.3], r=о.r||26, пол=о.пол===false?0:(о.пол||40);
    const стена=Array.from({length:Math.ceil(ш/28)},(_,k)=>`<rect x="${k*28}" y="0" width="28" height="${в}" fill="${k%2?'#5a3418':'#663c1c'}"/><line x1="${k*28}" y1="0" x2="${k*28}" y2="${в}" stroke="#2a160a" stroke-width="1" opacity=".6"/>
       ${[0.3,0.62].map(t=>`<circle cx="${k*28+14}" cy="${f(в*t+(k%3)*7)}" r="1" fill="#2a160a" opacity=".5"/>`).join('')}
       <path d="M${k*28+6} ${f(в*0.15+(k%4)*9)} q4 6 0 12" stroke="#7a4a24" stroke-width="1" fill="none" opacity=".5"/>`).join('');
    const лампа = о.лампа ? `<g>${крутить(`-5 ${о.лампа[0]} 0;5 ${о.лампа[0]} 0;-5 ${о.лампа[0]} 0`,'3.4s')}
        <line x1="${о.лампа[0]}" y1="0" x2="${о.лампа[0]}" y2="${о.лампа[1]}" stroke="#3a3e46" stroke-width="1.4" stroke-dasharray="2 1.4"/>
        ${фонарь(о.лампа[0],о.лампа[1],1,true)}</g>` : '';
    return `<g>
      ${стена}
      <rect x="0" y="0" width="${ш}" height="${в}" fill="url(#рм-складка)" opacity=".5"/>
      ${о.лампа?`<circle cx="${о.лампа[0]}" cy="${о.лампа[1]+20}" r="${Math.min(ш,в)*0.55}" fill="url(#рм-огонь)" opacity=".22" data-декор="1">${анЛин('opacity','0.2;0.28;0.2','1.6s')}</circle>`:''}
      <rect x="0" y="0" width="${ш}" height="14" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1"/>
      ${[0.12,0.5,0.88].map(t=>`<rect x="${f(ш*t-8)}" y="0" width="16" height="20" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>`).join('')}
      <clipPath id="${кл}"><circle cx="${f(пх[0])}" cy="${f(пх[1])}" r="${r}"/></clipPath>
      <g clip-path="url(#${кл})">
        <rect x="${f(пх[0]-r)}" y="${f(пх[1]-r)}" width="${2*r}" height="${2*r}" fill="url(#рм-ночь)"/>
        <rect x="${f(пх[0]-r)}" y="${f(пх[1]+r*0.3)}" width="${2*r}" height="${r}" fill="url(#рм-мореночь)"/>
        <circle cx="${f(пх[0]+r*0.35)}" cy="${f(пх[1]-r*0.35)}" r="${f(r*0.22)}" fill="url(#рм-луна)"/>
        <circle cx="${f(пх[0]-r*0.5)}" cy="${f(пх[1]-r*0.5)}" r=".9" fill="#fff"/><circle cx="${f(пх[0]-r*0.1)}" cy="${f(пх[1]-r*0.2)}" r=".7" fill="#fff"/>
        <path d="M${f(пх[0]-r)} ${f(пх[1]+r*0.5)} q${f(r*0.3)} -3 ${f(r*0.6)} 0 t${f(r*0.6)} 0 t${f(r*0.6)} 0 t${f(r*0.6)} 0" stroke="#8aa8d0" stroke-width="1" fill="none" opacity=".7">${анЛин('opacity','0.7;0.3;0.7','2.4s')}</path>
        <path d="M${f(пх[0]-r)} ${f(пх[1]+r*0.1)} l${2*r} ${f(-r*1.1)}" stroke="#fff" stroke-width="${f(r*0.28)}" opacity=".09"/>
      </g>
      <circle cx="${f(пх[0])}" cy="${f(пх[1])}" r="${r+3}" fill="none" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="${f(пх[0])}" cy="${f(пх[1])}" r="${r}" fill="none" stroke="url(#рм-латунь)" stroke-width="5"/>
      ${Array.from({length:8},(_,k)=>{ const a=k*Math.PI/4; return `<circle cx="${f(пх[0]+(r+0.2)*Math.cos(a))}" cy="${f(пх[1]+(r+0.2)*Math.sin(a))}" r="1.2" fill="#8a5a10"/>`; }).join('')}
      ${пол?`${доски(0,в-пол,ш,пол,true)}<rect x="0" y="${в-пол-3}" width="${ш}" height="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".6"/>`:''}
      ${лампа}
    </g>`;
  }
  /* белое перо с жёлтым кончиком (у какаду жёлтый хохолок) */
  function перо(x,y,м,угол){
    return `<g transform="translate(${x} ${y}) rotate(${угол||0}) scale(${м})">
      <ellipse cx="2" cy="2" rx="7" ry="2" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      <path d="M0 0 Q-8 -12 -5 -30 Q-1 -40 3 -44 Q9 -30 7 -14 Q5 -4 0 0 Z" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M0 3 Q1 -20 3 -42" stroke="#b8b098" stroke-width="1.2" fill="none"/>
      ${[-36,-30,-24,-18,-12].map((yy,k)=>`<path d="M${f(1+(yy+44)*0.03)} ${yy} l${k%2?5:-5} -4" stroke="#d8d4c4" stroke-width=".7"/>`).join('')}
      <path d="M-4 -32 Q-1 -41 3 -44 Q6 -38 7 -32 Q2 -35 -4 -32 Z" fill="#ffe070" opacity=".9"/>
    </g>`;
  }
  /* туман: мягкие полосы, медленно плывут в разные стороны */
  function туман(y0,в,ш,опц){
    const о=опц||{}, n=о.полос||5, пл=о.плотность||0.75;
    return `<g data-декор="1">${Array.from({length:n},(_,k)=>{ const y=y0+в*(k+0.5)/n, д=(k%2?-1:1)*(16+k*4);
      return `<g>${качать('0 0;'+д+' 0;0 0',(9+k*2)+'s')}<ellipse cx="${f(ш*(0.3+((k*37)%50)/100))}" cy="${f(y)}" rx="${f(ш*0.72)}" ry="${f(в/n*0.95)}" fill="#e8eef2" opacity="${(пл*(0.5+0.1*(k%3))).toFixed(2)}" filter="url(#рм-очмягко)"/></g>`; }).join('')}</g>`;
  }
  /* Сиракузы на горизонте: холм, стена с зубцами, башни, дома с черепицей, храм с колоннами, кипарисы */
  function сиракузы(x,y,м,опц){
    const о=опц||{};
    const башня=(bx,bw,bh)=>`<rect x="${bx}" y="${-bh}" width="${bw}" height="${bh}" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${Array.from({length:Math.floor(bw/5)},(_,k)=>`<rect x="${bx+k*5+1}" y="${-bh-4}" width="3" height="4" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
      <rect x="${bx+bw/2-1.5}" y="${-bh+7}" width="3" height="6" rx="1.5" fill="#4a3a2a"/>`;
    const дом=(dx,dw,dh)=>`<rect x="${dx}" y="${-dh}" width="${dw}" height="${dh}" fill="#f6ecd6" stroke="${ОБВОД}" stroke-width=".7"/><rect x="${dx+dw*0.6}" y="${-dh}" width="${dw*0.4}" height="${dh}" fill="#e0d2b4"/>
      <path d="M${dx-2} ${-dh} L${dx+dw/2} ${-dh-6} L${dx+dw+2} ${-dh} Z" fill="#c8603a" stroke="${ОБВОД}" stroke-width=".6"/><rect x="${f(dx+dw*0.3)}" y="${-dh+4}" width="${f(dw*0.25)}" height="4" fill="#3a4a6a"/>`;
    const храм=`<g transform="translate(-8 -30)">
      <path d="M-30 -30 L0 -44 L30 -30 Z" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-18 -33 L0 -41 L18 -33" stroke="#c8a870" stroke-width=".8" fill="none"/>
      <rect x="-31" y="-30" width="62" height="5" fill="#e8d4a8" stroke="${ОБВОД}" stroke-width=".7"/>
      ${Array.from({length:7},(_,k)=>`<rect x="${-28+k*9}" y="-25" width="4.4" height="22" fill="#f4e8cc" stroke="${ОБВОД}" stroke-width=".5"/><line x1="${-26.6+k*9}" y1="-24" x2="${-26.6+k*9}" y2="-4" stroke="#c8b08a" stroke-width=".6"/>`).join('')}
      <rect x="-33" y="-3" width="66" height="4" fill="#e0c898" stroke="${ОБВОД}" stroke-width=".7"/></g>`;
    return `<g transform="translate(${x} ${y}) scale(${м})" data-декор="1">
      <path d="M-124 0 Q-92 -30 -40 -34 Q20 -40 60 -26 Q100 -16 132 0 Z" fill="url(#рм-холм)" stroke="${ОБВОД}" stroke-width="1"/>
      ${дом(-82,16,24)}${дом(-62,14,28)}${дом(28,16,26)}${дом(50,14,30)}${дом(70,16,24)}
      ${храм}
      ${[[-44,-10,22],[16,-10,20],[88,-10,18]].map(([cx,cy,h])=>`<path d="M${cx} ${cy-h} q5 ${h*0.4} 3 ${h} h-6 q-2 -${f(h*0.6)} 3 -${h}z" fill="#2f5a36" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}
      <path d="M-106 -12 H114 V0 H-106 Z" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".9"/>
      ${Array.from({length:44},(_,k)=>`<rect x="${-106+k*5}" y="-15" width="3" height="3" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".4"/>`).join('')}
      ${[-80,-40,0,40,80].map(xx=>`<path d="M${xx} -12 v12" stroke="${ОБВОД}" stroke-width=".5" opacity=".4"/>`).join('')}
      ${башня(-104,14,28)}${башня(-30,12,32)}${башня(98,14,26)}
      <rect x="-130" y="-78" width="270" height="80" fill="url(#рм-дымка)" opacity="${о.дымка==null?0.5:о.дымка}"/>
    </g>`;
  }
  /* радуга после шторма */
  function радуга(x,y,r,опц){
    return `<g data-декор="1" opacity="${(опц&&опц.яркость)||0.55}">
      ${['#ff6a5a','#ffb04a','#ffe86a','#7ad07a','#5aa8e8','#8a6ad8'].map((c,k)=>`<path d="M${x-r+k*5} ${y} A${r-k*5} ${r-k*5} 0 0 1 ${x+r-k*5} ${y}" stroke="${c}" stroke-width="5.4" fill="none"/>`).join('')}
    </g>`;
  }

  /* ================= СИРАКУЗЫ: античный город для 5–6 классов ================= */

  /* ---------- портик: ступени, дорические колонны с каннелюрами, архитрав с триглифами, фронтон.
     (x,y) — левый нижний угол нижней ступени ---------- */
  function портик(x,y,ш,в,опц){
    const о=опц||{}, n=о.колонн||6, ст=5, hк=в*0.6, верхК=y-ст*3-hк, rк=Math.min(9,ш/n*0.22);
    const лев=x+ш*0.08, пр=x+ш*0.92, шаг=(пр-лев)/(n-1);
    const колонны=Array.from({length:n},(_,k)=>{ const cx=лев+шаг*k;
      return `<g>
        <rect x="${f(cx-rк)}" y="${f(верхК)}" width="${f(rк*2)}" height="${f(hк)}" fill="url(#рм-колонна)" stroke="${ОБВОД}" stroke-width=".7"/>
        ${[-0.55,-0.2,0.2,0.55].map(t=>`<line x1="${f(cx+rк*t)}" y1="${f(верхК+4)}" x2="${f(cx+rк*t)}" y2="${f(верхК+hк-3)}" stroke="#a89a7c" stroke-width=".6" opacity=".7" data-декор="1"/>`).join('')}
        <path d="M${f(cx-rк-2)} ${f(верхК)} q${f(rк+2)} 5 ${f(rк*2+4)} 0 v-2 h${f(-rк*2-4)}z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".7"/>
        <rect x="${f(cx-rк-4)}" y="${f(верхК-6)}" width="${f(rк*2+8)}" height="5" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".7"/>
        <rect x="${f(cx-rк-1)}" y="${f(верхК+hк-3)}" width="${f(rк*2+2)}" height="3" fill="#e0d6c0" stroke="${ОБВОД}" stroke-width=".5"/>
      </g>`; }).join('');
    const ар=верхК-6, hа=в*0.1, hфр=в*0.1, hфрон=в*0.2;
    return `<g>
      <rect x="${f(x+ш*0.06)}" y="${f(верхК)}" width="${f(ш*0.88)}" height="${f(hк)}" fill="#7a6a52"/>
      <rect x="${f(x+ш*0.06)}" y="${f(верхК)}" width="${f(ш*0.88)}" height="${f(hк*0.35)}" fill="#3a2e22" opacity=".45"/>
      ${о.дверь===false?'':`<rect x="${f(x+ш/2-ш*0.08)}" y="${f(y-ст*3-hк*0.7)}" width="${f(ш*0.16)}" height="${f(hк*0.7)}" fill="#2a1e14"/>`}
      ${[0,1,2].map(k=>`<rect x="${f(x+k*4)}" y="${f(y-ст*(k+1))}" width="${f(ш-k*8)}" height="${ст}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}
      ${колонны}
      <rect x="${f(x+ш*0.03)}" y="${f(ар-hа)}" width="${f(ш*0.94)}" height="${f(hа)}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="${f(x+ш*0.03)}" y="${f(ар-hа-hфр)}" width="${f(ш*0.94)}" height="${f(hфр)}" fill="#e6dcc6" stroke="${ОБВОД}" stroke-width=".8"/>
      ${Array.from({length:Math.round(ш/22)},(_,k)=>{ const tx=x+ш*0.05+k*22; return tx+8>x+ш*0.96?'':`<rect x="${f(tx)}" y="${f(ар-hа-hфр+1)}" width="8" height="${f(hфр-2)}" fill="#6a7a8a"/><line x1="${f(tx+2.7)}" y1="${f(ар-hа-hфр+2)}" x2="${f(tx+2.7)}" y2="${f(ар-hа-2)}" stroke="#3a4a5a" stroke-width=".8"/><line x1="${f(tx+5.3)}" y1="${f(ар-hа-hфр+2)}" x2="${f(tx+5.3)}" y2="${f(ар-hа-2)}" stroke="#3a4a5a" stroke-width=".8"/>`; }).join('')}
      <rect x="${f(x)}" y="${f(ар-hа-hфр-4)}" width="${f(ш)}" height="4" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M${f(x)} ${f(ар-hа-hфр-4)} L${f(x+ш/2)} ${f(ар-hа-hфр-4-hфрон)} L${f(x+ш)} ${f(ар-hа-hфр-4)} Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${f(x+ш*0.08)} ${f(ар-hа-hфр-6)} L${f(x+ш/2)} ${f(ар-hа-hфр-2-hфрон*0.86)} L${f(x+ш*0.92)} ${f(ар-hа-hфр-6)} Z" fill="#9aaec0" opacity=".55"/>
      ${о.надпись?`<text x="${f(x+ш/2)}" y="${f(ар-hа*0.28)}" text-anchor="middle" font-size="${f(Math.min(hа*0.7,11))}" font-weight="bold" letter-spacing="1.5" fill="#6a5a40" font-family="Georgia,serif">${о.надпись}</text>`:''}
      <rect x="${f(x+ш*0.06)}" y="${f(верхК)}" width="${f(ш*0.88)}" height="${f(hк)}" fill="url(#рм-луч)" opacity=".18" data-декор="1"/>
    </g>`;
  }

  /* ---------- стела: мраморная плита с пальметтой, выбитые строки; (x,y) — середина основания ---------- */
  function стела(x,y,ш,в,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y})">
      <ellipse cx="4" cy="1" rx="${f(ш*0.6)}" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${f(-ш*0.62)}" y="-12" width="${f(ш*1.24)}" height="12" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${f(-ш/2)} -12 L${f(-ш*0.46)} ${f(-в)} H${f(ш*0.46)} L${f(ш/2)} -12 Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M${f(-ш*0.5)} ${f(-в)} Q0 ${f(-в-ш*0.5)} ${f(ш*0.5)} ${f(-в)} Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.1"/>
      ${[-0.3,-0.15,0,0.15,0.3].map(t=>`<path d="M0 ${f(-в-2)} Q${f(ш*t*0.8)} ${f(-в-ш*0.3)} ${f(ш*t)} ${f(-в-ш*0.22*(1-Math.abs(t)))}" stroke="#b8ab90" stroke-width="1.4" fill="none"/>`).join('')}
      <path d="M${f(-ш*0.3)} ${f(-в*0.55)} q${f(ш*0.1)} ${f(-в*0.15)} ${f(ш*0.25)} ${f(-в*0.1)} M${f(ш*0.05)} ${f(-в*0.25)} q${f(ш*0.1)} 6 ${f(ш*0.2)} -4" stroke="#c8bca4" stroke-width=".8" fill="none" data-декор="1"/>
      <path d="M${f(-ш*0.46)} ${f(-в)} L${f(-ш/2)} -12" stroke="#fff" stroke-width="2" opacity=".5"/>
      ${о.венок?`<g transform="translate(0 ${f(-в-ш*0.12)})"><path d="M-10 0 q10 10 20 0" stroke="#5a7a3a" stroke-width="2" fill="none"/>${[-8,-4,4,8].map(xx=>`<ellipse cx="${xx}" cy="${Math.abs(xx)/3}" rx="3" ry="1.5" fill="#6a8a4a" transform="rotate(${xx*4} ${xx} ${Math.abs(xx)/3})"/>`).join('')}</g>`:''}
    </g>`;
  }

  /* ---------- амфора: глина, чёрнофигурный пояс с меандром, ручки ---------- */
  function амфора(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="2" cy="0" rx="14" ry="3" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-8 -64 q-8 8 -10 14 M8 -64 q8 8 10 14" stroke="#8a3a1a" stroke-width="3.4" fill="none"/>
      <path d="M-6 -66 h12 l-1 8 q14 8 14 26 q0 20 -12 30 l-2 2 h-10 l-2 -2 q-12 -10 -12 -30 q0 -18 14 -26 z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1.1"/>
      <path d="M-15 -36 h30 v10 h-30 z" fill="#1e140e"/>
      <path d="M-14 -31 h4 v-3 h3 v5 h4 v-3 h3 v3 h4 v-5 h3 v3 h4" stroke="#e0864a" stroke-width="1" fill="none"/>
      <path d="M-7 -66 h14 v-3 h-14 z" fill="#6a2a10" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-9 -48 q-4 14 0 30" stroke="#ffc890" stroke-width="2" fill="none" opacity=".45"/>
    </g>`;
  }

  /* ---------- весы: мраморный постамент, бронзовая стойка, коромысло с чашами на цепях.
     опц.наклон — градусы (+ правая чаша ниже), опц.было — откуда качнуться;
     опц.левая/правая — svg на чаше, (0,0) — дно чаши ---------- */
  function весы(x,y,м,опц){
    const о=опц||{}, н=о.наклон||0, б=о.было, L=58, H=112;
    const dy=(a)=>L*Math.sin(a*Math.PI/180);
    const анКор = (б!=null&&ДВИЖ) ? `<animateTransform attributeName="transform" type="rotate" from="${б} 0 ${-H}" to="${н} 0 ${-H}" dur="1.2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 1.4 0.5 1"/>` : '';
    const чаша=(знак,груз)=>{ const d=знак*dy(н), d0=б!=null?знак*dy(б):d;
      return `<g transform="translate(${знак*L} ${f(-H+d)})">${(б!=null&&ДВИЖ)?`<animateTransform attributeName="transform" type="translate" from="${знак*L} ${f(-H+d0)}" to="${знак*L} ${f(-H+d)}" dur="1.2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 1.4 0.5 1"/>`:''}
        <path d="M0 2 L-20 44 M0 2 L20 44 M0 2 L0 44" stroke="#8a6a3a" stroke-width="1" stroke-dasharray="2.4 1.2"/>
        <g transform="translate(0 44)">${груз||''}</g>
        <path d="M-24 44 q24 14 48 0 z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-24 44 h48" stroke="#f0c890" stroke-width="1.2"/>
      </g>`; };
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="4" cy="1" rx="44" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-34" y="-10" width="68" height="10" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-24" y="-18" width="48" height="8" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-3.5" y="${-H}" width="7" height="${H-18}" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${[-40,-70].map(yy=>`<rect x="-6" y="${yy}" width="12" height="4" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".6"/>`).join('')}
      <path d="M0 ${-H-2} l-5 -12 h10 z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
      <g transform="rotate(${н} 0 ${-H})">${анКор}
        <rect x="${-L-4}" y="${-H-3}" width="${2*L+8}" height="6" rx="3" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".9"/>
        <circle cx="${-L}" cy="${-H}" r="3" fill="#f0c890" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="${L}" cy="${-H}" r="3" fill="#f0c890" stroke="${ОБВОД}" stroke-width=".6"/>
      </g>
      <circle cx="0" cy="${-H}" r="4.4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${чаша(-1,о.левая)}${чаша(1,о.правая)}
    </g>`;
  }
  /* эталонная гиря: бронзовый усечённый конус с клеймом; (0,0) — дно */
  function гиря(x,y,м,клеймо){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-11 0 L-8 -16 Q0 -20 8 -16 L11 0 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="-3" y="-23" width="6" height="6" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-7 -14 q-1 6 0 12" stroke="#f8dcb0" stroke-width="1.4" fill="none" opacity=".7"/>
      ${клеймо?`<text x="0" y="-5" text-anchor="middle" font-size="7" font-weight="bold" fill="#3a2008" font-family="Georgia,serif">${клеймо}</text>`:''}
    </g>`;
  }

  /* ---------- полки со свитками: деревянные ячейки, торцы свитков, ярлычки. (x,y) — левый верх ---------- */
  function полкаСвитков(x,y,ш,в,опц){
    const о=опц||{}, ряды=о.ряды||3, ст=о.столбцы||4, яш=ш/ст, яв=в/ряды;
    const ячейки=[];
    for(let r=0;r<ряды;r++) for(let c=0;c<ст;c++){ const x0=x+c*яш, y0=y+r*яв;
      const свитки=[[0.3,0.62],[0.62,0.62],[0.46,0.3],[0.78,0.34]].slice(0,2+((r*3+c)%3)).map(([a,b],k)=>{ const cx=x0+яш*a, cy=y0+яв*b, rr=Math.min(яш,яв)*0.17;
        return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr)}" fill="url(#рм-бумага)" stroke="#8a6a3a" stroke-width=".8"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rr*0.35)}" fill="#6a4020"/>
          ${k===0?`<path d="M${f(cx)} ${f(cy+rr)} v${f(яв*0.16)}" stroke="${['#b8321e','#2a4f8a','#2e7a4a'][(r+c)%3]}" stroke-width="1.6" data-декор="1"/><rect x="${f(cx-3)}" y="${f(cy+rr+яв*0.14)}" width="6" height="5" fill="${['#b8321e','#2a4f8a','#2e7a4a'][(r+c)%3]}" data-декор="1"/>`:''}`; }).join('');
      ячейки.push(`<rect x="${f(x0+2)}" y="${f(y0+2)}" width="${f(яш-4)}" height="${f(яв-4)}" fill="#2a1a0e"/>${свитки}`);
    }
    return `<g>
      <rect x="${x-4}" y="${y-4}" width="${ш+8}" height="${в+8}" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${ячейки.join('')}
      ${Array.from({length:ряды+1},(_,r)=>`<rect x="${x-4}" y="${f(y+r*яв-2)}" width="${ш+8}" height="4" fill="url(#рм-доскатём)"/>`).join('')}
    </g>`;
  }

  /* ---------- свиток: развёрнутый папирус на двух стержнях; (x,y) — левый верх листа ---------- */
  function свиток(x,y,ш,в){
    const стер=(xx)=>`<rect x="${xx-4}" y="${y-6}" width="8" height="${в+12}" rx="4" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="${xx}" cy="${y-8}" r="4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="${xx}" cy="${y+в+8}" r="4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>`;
    return `<g>
      <rect x="${x+3}" y="${y+5}" width="${ш}" height="${в}" fill="#0b1c2a" opacity=".3" filter="url(#рм-мягко)"/>
      <rect x="${x}" y="${y}" width="${ш}" height="${в}" fill="url(#рм-бумага)" stroke="#a88a5a" stroke-width="1"/>
      ${Array.from({length:Math.floor(ш/9)},(_,k)=>`<line x1="${x+k*9+4}" y1="${y}" x2="${x+k*9+4}" y2="${y+в}" stroke="#d8c498" stroke-width=".5" opacity=".6" data-декор="1"/>`).join('')}
      <rect x="${x}" y="${y}" width="10" height="${в}" fill="#a88a5a" opacity=".25"/><rect x="${x+ш-10}" y="${y}" width="10" height="${в}" fill="#a88a5a" opacity=".25"/>
      ${стер(x)}${стер(x+ш)}
    </g>`;
  }

  /* ---------- город на холме: стены, белые дома, храм, кипарисы; y0 — линия горизонта ---------- */
  function город(y0,опц){
    const о=опц||{}, x0=о.x0==null?0:о.x0, x1=о.x1==null?336:о.x1, ш=x1-x0;
    const дом=(x,y,w,h,k)=>`<g><rect x="${f(x)}" y="${f(y-h)}" width="${f(w)}" height="${f(h)}" fill="${k%2?'#f4ecdc':'#ebe0c8'}" stroke="#8a7a5a" stroke-width=".5"/>
      <rect x="${f(x+w*0.6)}" y="${f(y-h)}" width="${f(w*0.4)}" height="${f(h)}" fill="#c8b898" opacity=".6"/>
      <path d="M${f(x-1)} ${f(y-h)} L${f(x+w/2)} ${f(y-h-w*0.28)} L${f(x+w+1)} ${f(y-h)} Z" fill="#c86a44" stroke="#8a4a2a" stroke-width=".4"/>
      ${w>9?`<rect x="${f(x+w*0.25)}" y="${f(y-h*0.6)}" width="2.4" height="3.2" fill="#4a3a2a"/>`:''}</g>`;
    const дома=[]; let k=0;
    for(let xx=x0+ш*0.12; xx<x0+ш*0.86; xx+=11+(k%3)*3){ const hh=8+((k*7)%9), yy=y0-6-Math.sin((xx-x0)/ш*Math.PI)*22; дома.push(дом(xx,yy,9+(k%3)*2,hh,k)); k++; }
    const tx=x0+ш*0.52, ty=y0-30;
    return `<g>
      <path d="M${x0} ${y0} Q${f(x0+ш*0.25)} ${y0-30} ${f(x0+ш*0.5)} ${y0-34} T${x1} ${y0} Z" fill="url(#рм-холмдаль)" stroke="#6a7a4a" stroke-width=".6"/>
      <path d="M${f(x0+ш*0.08)} ${y0-4} Q${f(x0+ш*0.5)} ${y0-14} ${f(x0+ш*0.92)} ${y0-4}" stroke="#c8b898" stroke-width="5" fill="none"/>
      ${дома.join('')}
      <g transform="translate(${f(tx)} ${f(ty)})"><rect x="-18" y="-3" width="36" height="3" fill="#f4ecdc" stroke="#8a7a5a" stroke-width=".4"/>
        ${[-14,-7,0,7,14].map(cx=>`<rect x="${cx-1.3}" y="-15" width="2.6" height="12" fill="#f8f2e4" stroke="#8a7a5a" stroke-width=".3"/>`).join('')}
        <rect x="-18" y="-18" width="36" height="3" fill="#ebe0c8" stroke="#8a7a5a" stroke-width=".4"/><path d="M-18 -18 L0 -25 L18 -18 Z" fill="#f4ecdc" stroke="#8a7a5a" stroke-width=".4"/></g>
      ${[0.1,0.2,0.84,0.9].map((t,i)=>{ const cx=x0+ш*t, cy=y0-4-(i%2)*4; return `<path d="M${f(cx)} ${f(cy-22)} q5 9 3.4 22 h-6.8 q-1.6 -13 3.4 -22z" fill="#2f5a36" stroke="#1e3a24" stroke-width=".5"/>`; }).join('')}
      <rect x="${x0}" y="${y0-40}" width="${ш}" height="40" fill="url(#рм-дымка)" opacity=".35" data-декор="1"/>
    </g>`;
  }

  /* ---------- Архимед: хитон и гиматий с синим меандром, седая борода, лысина, сандалии.
     поза: 'стоит' (циркуль в руке) | 'указывает' | 'читает' (свиток у груди); высота ~120 ---------- */
  function архимед(x,y,м,опц){
    const о=опц||{}, поза=о.поза||'стоит', кл=ид('хитон'), царь=!!о.царь, поэт=!!о.поэт, старец=!!о.старец;
    const гим=царь?'#7a2a6a':поэт?'#3a7a6a':старец?'#f4f0e6':'#e4d8bc', кайма=царь||поэт?'#e0b030':старец?'#b8321e':'#2a4f8a', бор=царь?'#b8b0a4':поэт?'#7a5a3a':'#f0ece4', борТ=царь?'#8a8274':поэт?'#4a3020':'#a8a090', вол=поэт?'#7a5a3a':'#f0ece4';
    const тело='M-18 -84 Q0 -90 18 -84 Q22 -50 24 -4 Q0 3 -24 -4 Q-22 -50 -18 -84 Z';
    const рука=(d,кисть)=>`<path d="${d}" stroke="url(#рм-хитон)" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="${d}" stroke="${ОБВОД}" stroke-width="9" stroke-linecap="round" fill="none" opacity=".12"/>
      <circle cx="${кисть[0]}" cy="${кисть[1]}" r="4.6" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    const лев = поза==='читает' ? рука('M-17 -80 q-8 16 2 30',[-12,-50]) : рука('M-17 -80 q-9 18 -8 34',[-25,-45]);
    const прав = поза==='указывает'
      ? `<g>${крутить('0 17 -80;-5 17 -80;0 17 -80','2.8s')}${рука('M17 -80 q16 -6 28 -20',[46,-101])}<path d="M49 -104 l7 -5" stroke="url(#рм-кожа)" stroke-width="3" stroke-linecap="round"/></g>`
      : поза==='читает'
      ? `${рука('M17 -80 q8 16 -2 30',[12,-50])}
         <g><rect x="-20" y="-60" width="40" height="18" fill="url(#рм-бумага)" stroke="#a88a5a" stroke-width=".8"/>${[-54,-50,-46].map(yy=>`<line x1="-15" y1="${yy}" x2="15" y2="${yy}" stroke="#8a7a5a" stroke-width=".6"/>`).join('')}
           <rect x="-23" y="-62" width="5" height="22" rx="2.5" fill="url(#рм-доскатём)"/><rect x="18" y="-62" width="5" height="22" rx="2.5" fill="url(#рм-доскатём)"/></g>`
      : `${рука('M17 -80 q10 16 8 32',[25,-47])}
         <g transform="translate(25 -47)"><path d="M0 0 L-6 30 M0 0 L7 30" stroke="url(#рм-бронза)" stroke-width="2.2" stroke-linecap="round"/><circle cx="0" cy="0" r="2.6" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".5"/></g>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="26" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-14 -3 h11 v3 h-12 z M3 -3 h11 l1 3 h-12 z" fill="#6a4020" stroke="${ОБВОД}" stroke-width=".8"/>
      ${лев}
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      <path d="${тело}" fill="url(#рм-хитон)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})">
        ${[-12,-5,3,11].map(xx=>`<path d="M${xx} -80 Q${xx+2} -40 ${xx*1.3} 0" stroke="#c8bca4" stroke-width="1.2" fill="none"/>`).join('')}
        <path d="M-26 -88 L26 -30 L26 -16 L-26 -70 Z" fill="${гим}" stroke="#a89a7c" stroke-width=".8"/>
        <path d="M-26 -70 L26 -16" stroke="${кайма}" stroke-width="3.4" stroke-dasharray="3 1.6"/>
        <path d="M-26 -1 H26" stroke="${кайма}" stroke-width="3" stroke-dasharray="3 1.6"/>
      </g>
      <path d="${тело}" fill="none" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${старец?`<path d="M-23 -46 Q0 -41 23 -46" stroke="#b8321e" stroke-width="3.4" fill="none"/><path d="M14 -44 l2 12 M18 -45 l3 11" stroke="#b8321e" stroke-width="1.6"/><path d="M-10 -84 V-62" stroke="#b8321e" stroke-width="2" stroke-dasharray="2 1.6"/>`:''}
      ${прав}
      <rect x="-4.5" y="-90" width="9" height="7" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -103)">
        <path d="M-16 8 q-6 -10 -3 -18 q3 -5 7 -4 M16 8 q6 -10 3 -18 q-3 -5 -7 -4" fill="${вол}" stroke="#b8b0a0" stroke-width=".8"/>
        <ellipse cx="-15" cy="2" rx="3" ry="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="15" cy="2" rx="3" ry="4.2" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="15" ry="16" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <ellipse cx="-4" cy="-10" rx="5" ry="3" fill="#fff" opacity=".35"/>
        <path d="M-14.6 -5 q2 4 1 9 M14.6 -5 q-2 4 -1 9" stroke="${вол}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M-15 3 q-3 20 9 27 q6 4 12 0 q12 -7 9 -27 q-6 9 -15 9 q-9 0 -15 -9z" fill="${бор}" stroke="${борТ}" stroke-width="1"/>
        ${[-8,-3,2,7].map(xx=>`<path d="M${xx} 12 q1 8 ${xx>0?-1:1} 14" stroke="#c8c0b0" stroke-width=".9" fill="none"/>`).join('')}
        ${лицо({рот:о.рот||'ровно',мигать:4.8,взгляд:о.взгляд})}
        <path d="M-8.6 -7 q3 -2.4 5.6 -.6 M3 -7.6 q2.6 -1.8 5.6 .6" stroke="${поэт?'#5a3a20':'#f4f0e8'}" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M-6 7 q6 -3 12 0" stroke="${царь?'#a8a094':поэт?'#5a3a20':'#e8e4dc'}" stroke-width="3" fill="none" stroke-linecap="round"/>
        ${поэт?`<path d="M-15 -6 q0 -14 15 -15 q15 1 15 15 q-6 -8 -15 -8 q-9 0 -15 8z" fill="${вол}" stroke="${борТ}" stroke-width=".8"/>`:''}${царь||поэт||о.венец?венец(0,-8,16.5,{дуга:true}):''}
      </g>
    </g>`;
  }

  /* ---------- золотой венец: две лавровые ветви по эллипсу, ягоды, лента; (x,y) — центр ---------- */
  function венец(x,y,r,опц){
    const о=опц||{}, ry=r*0.5;
    const лист=(a,сторона,k)=>{ const t=a*Math.PI/180, px=x+r*Math.cos(t), py=y+ry*Math.sin(t);
      const ang=Math.atan2(ry*Math.cos(t), -r*Math.sin(t))*180/Math.PI*сторона + (k%2?35:-35);
      return `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(r*0.17)}" ry="${f(r*0.065)}" fill="url(#рм-латунь)" stroke="#7a5010" stroke-width=".6" transform="rotate(${f(ang)} ${f(px)} ${f(py)})"/>`; };
    const ветвь=(от,до,сторона)=>{ const n=11, out=[];
      for(let k=0;k<n;k++){ const a=от+(до-от)*k/(n-1); out.push(лист(a,сторона,k)); if(k%3===1){ const t=a*Math.PI/180; out.push(`<circle cx="${f(x+r*0.9*Math.cos(t))}" cy="${f(y+ry*0.9*Math.sin(t))}" r="${f(r*0.035)}" fill="#fff0b0" stroke="#8a5a10" stroke-width=".4"/>`); } }
      return out.join(''); };
    if(о.дуга) return `<g><path d="M${f(x-r)} ${y} A${r} ${f(ry)} 0 0 1 ${f(x+r)} ${y}" stroke="#a8781a" stroke-width="${f(r*0.05)}" fill="none"/>${ветвь(185,268,1)}${ветвь(-5,-88,-1)}</g>`;
    return `<g>
      ${о.свет?`<ellipse cx="${x}" cy="${y}" rx="${f(r*1.5)}" ry="${f(ry*1.8)}" fill="url(#рм-огонь)" opacity=".45" data-декор="1">${анЛин('opacity','0.3;0.55;0.3','2.4s')}</ellipse>`:''}
      <ellipse cx="${x}" cy="${f(y+ry*0.9)}" rx="${f(r*0.9)}" ry="${f(ry*0.25)}" fill="#231a12" opacity=".25" filter="url(#рм-мягко)"/>
      <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${f(ry)}" fill="none" stroke="#a8781a" stroke-width="${f(r*0.04)}"/>
      ${ветвь(95,265,1)}${ветвь(85,-85,-1)}
      ${о.лента===false?'':`<path d="M${f(x-r*0.08)} ${f(y+ry)} q-6 10 -2 18 M${f(x+r*0.08)} ${f(y+ry)} q6 10 2 18" stroke="#b8321e" stroke-width="${f(r*0.06)}" fill="none" stroke-linecap="round"/>
      <circle cx="${x}" cy="${f(y+ry)}" r="${f(r*0.07)}" fill="#c83a2a" stroke="#6a1a0e" stroke-width=".6"/>`}
      ${ДВИЖ?`<path d="M${f(x-r*0.6)} ${f(y-ry*0.7)} l${f(r*0.05)} ${f(-r*0.05)} l${f(r*0.05)} ${f(r*0.05)} l${f(-r*0.05)} ${f(r*0.05)} z" fill="#fff" opacity="0">${анЛин('opacity','0;1;0;0','2.6s')}</path>`:''}
    </g>`;
  }

  /* ---------- золотой слиток с клеймом; (x,y) — середина низа ---------- */
  function слиток(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="2" cy="1" rx="22" ry="3" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-20 0 L-14 -14 H14 L20 0 Z" fill="url(#рм-латунь)" stroke="#7a5010" stroke-width="1"/>
      <path d="M-14 -14 H14 L11 -17 H-11 Z" fill="#fff4c0" stroke="#7a5010" stroke-width=".8"/>
      <rect x="-6" y="-11" width="12" height="7" rx="1" fill="none" stroke="#8a5a10" stroke-width=".8"/>
      <path d="M-12 -12 L-17 -2" stroke="#fffbe0" stroke-width="1.6" opacity=".8"/>
    </g>`;
  }

  /* ---------- мраморная ванна: чаша, вода, пар; опц.перелив — вода льётся через край.
     (x,y) — середина низа. Кого-то «в ванне» рисуют ДО неё, чтобы край закрыл ноги ---------- */
  function ванна(x,y,ш,в,опц){
    const о=опц||{}, край=y-в;
    return `<g>
      <ellipse cx="${x+4}" cy="${y+2}" rx="${f(ш*0.56)}" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M${f(x-ш/2)} ${f(край)} Q${f(x-ш/2+4)} ${y} ${f(x-ш*0.38)} ${y} H${f(x+ш*0.38)} Q${f(x+ш/2-4)} ${y} ${f(x+ш/2)} ${f(край)} Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <path d="M${f(x-ш*0.3)} ${f(край+в*0.35)} q${f(ш*0.1)} ${f(-в*0.1)} ${f(ш*0.2)} 0 M${f(x+ш*0.05)} ${f(край+в*0.6)} q${f(ш*0.12)} ${f(в*0.08)} ${f(ш*0.22)} ${f(-в*0.04)}" stroke="#c8bca4" stroke-width=".9" fill="none" data-декор="1"/>
      <path d="M${f(x-ш*0.46)} ${f(край+4)} Q${f(x-ш*0.44)} ${f(y-6)} ${f(x-ш*0.36)} ${f(y-3)}" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>
      <ellipse cx="${x}" cy="${f(край)}" rx="${f(ш/2)}" ry="6" fill="#7ac0e8" stroke="${ОБВОД}" stroke-width="1"/>
      <ellipse cx="${f(x-ш*0.1)}" cy="${f(край-1)}" rx="${f(ш*0.22)}" ry="2" fill="#e8f6ff" opacity=".6">${анЛин('rx',`${f(ш*0.18)};${f(ш*0.26)};${f(ш*0.18)}`,'2.4s')}</ellipse>
      <rect x="${f(x-ш/2-3)}" y="${f(край-3)}" width="${f(ш+6)}" height="5" rx="2.5" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      ${о.перелив?[-1,1].map(с=>`<path d="M${f(x+с*ш/2)} ${f(край)} q${с*6} 4 ${с*5} ${f(в*0.55)} q0 ${f(в*0.3)} ${с*2} ${f(в*0.45)}" stroke="#7ac0e8" stroke-width="4" fill="none" stroke-linecap="round" opacity=".9" stroke-dasharray="10 6">${анЛин('stroke-dashoffset','32;0','0.8s')}</path>
        <ellipse cx="${f(x+с*(ш/2+10))}" cy="${y}" rx="14" ry="3" fill="#7ac0e8" opacity=".6">${анЛин('rx','10;18;10','1.6s')}</ellipse>`).join(''):''}
      ${о.пар===false?'':[0,1,2].map(k=>`<path d="M${f(x-ш*0.25+k*ш*0.25)} ${f(край-6)} q-5 -10 0 -18 q5 -8 0 -16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity="0">${ДВИЖ?`<animate attributeName="opacity" values="0;0.55;0" dur="3.2s" begin="${k}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -10" dur="3.2s" begin="${k}s" repeatCount="indefinite"/>`:''}</path>`).join('')}
    </g>`;
  }

  /* ---------- сосуд с водой в разрезе: стекло, вода до уровня (0..1), риски, предмет на дне.
     опц.было — прежний уровень (вода поднимется), опц.внутри — svg, (0,0) — середина дна;
     (x,y) — середина низа ---------- */
  function сосуд(x,y,ш,в,опц){
    const о=опц||{}, ур=Math.max(0,Math.min(1,о.уровень==null?0.5:о.уровень)), было=о.было;
    const вн=в-6, hв=вн*ур, hб=было==null?hв:вн*Math.max(0,Math.min(1,было));
    const подъём=(было!=null&&ДВИЖ)?`<animate attributeName="y" from="${f(y-3-hб)}" to="${f(y-3-hв)}" dur="1.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.8 0.4 1"/><animate attributeName="height" from="${f(hб)}" to="${f(hв)}" dur="1.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.8 0.4 1"/>`:'';
    return `<g>
      <ellipse cx="${x+3}" cy="${y+2}" rx="${f(ш*0.58)}" ry="4" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      <rect x="${f(x-ш/2)}" y="${f(y-в)}" width="${ш}" height="${в}" rx="4" fill="#e8f6ff" opacity=".35" stroke="#8aa8c0" stroke-width="1.4"/>
      ${о.внутри?`<g transform="translate(${x} ${f(y-3)})">${о.внутри}</g>`:''}
      <rect x="${f(x-ш/2+2)}" y="${f(y-3-hв)}" width="${ш-4}" height="${f(hв)}" fill="#4a9ad8" opacity=".45">${подъём}</rect>
      <rect x="${f(x-ш/2+2)}" y="${f(y-3-hв)}" width="${ш-4}" height="2.4" fill="#bfe6ff" opacity=".9">${(было!=null&&ДВИЖ)?`<animate attributeName="y" from="${f(y-3-hб)}" to="${f(y-3-hв)}" dur="1.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0.8 0.4 1"/>`:''}</rect>
      ${Array.from({length:5},(_,k)=>`<line x1="${f(x+ш/2-8)}" y1="${f(y-3-вн*(k+1)/6)}" x2="${f(x+ш/2-2)}" y2="${f(y-3-вн*(k+1)/6)}" stroke="#5a7a90" stroke-width="1"/>`).join('')}
      <rect x="${f(x-ш/2+4)}" y="${f(y-в+4)}" width="4" height="${f(в-10)}" rx="2" fill="#fff" opacity=".5"/>
      <rect x="${f(x-ш/2-3)}" y="${f(y-в-3)}" width="${ш+6}" height="5" rx="2.5" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="${f(x-ш/2-3)}" y="${f(y-3)}" width="${ш+6}" height="5" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
    </g>`;
  }

  /* ================= ОСАДА СИРАКУЗ ================= */

  /* ---------- крепостная стена крупно: кладка, зубцы, бойницы, башня. (x,y) — левый низ ---------- */
  function крепость(x,y,ш,в,опц){
    const о=опц||{}, ряд=11, кл=ид('кладка');
    const зубцы=(x0,w,yy)=>Array.from({length:Math.floor(w/14)},(_,k)=>`<rect x="${f(x0+k*14+2)}" y="${f(yy-9)}" width="9" height="9" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".7"/>`).join('');
    const кладка=(x0,y0,w,h)=>`<clipPath id="${кл}${x0}"><rect x="${f(x0)}" y="${f(y0)}" width="${f(w)}" height="${f(h)}"/></clipPath>
      <g clip-path="url(#${кл}${x0})" stroke="#8a7a60" stroke-width=".7" opacity=".7" data-декор="1">
        ${Array.from({length:Math.ceil(h/ряд)},(_,r)=>`<line x1="${f(x0)}" y1="${f(y0+r*ряд)}" x2="${f(x0+w)}" y2="${f(y0+r*ряд)}"/>`+
          Array.from({length:Math.ceil(w/22)+1},(_,c)=>`<line x1="${f(x0+c*22+(r%2)*11)}" y1="${f(y0+r*ряд)}" x2="${f(x0+c*22+(r%2)*11)}" y2="${f(y0+(r+1)*ряд)}"/>`).join('')).join('')}
      </g>`;
    const бx=x+ш*(о.башня==null?0.22:о.башня), бw=ш*0.2, бв=в*1.35;
    return `<g>
      <rect x="${x}" y="${y-в}" width="${ш}" height="${в}" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width="1.1"/>
      ${кладка(x,y-в,ш,в)}
      ${зубцы(x,ш,y-в)}
      <rect x="${x}" y="${y-в}" width="${ш}" height="${f(в*0.12)}" fill="#fff" opacity=".12"/>
      ${о.башня===false?'':`<rect x="${f(бx)}" y="${f(y-бв)}" width="${f(бw)}" height="${f(бв)}" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width="1.1"/>
        ${кладка(бx,y-бв,бw,бв)}${зубцы(бx-2,бw+4,y-бв)}
        ${[0.3,0.55].map(t=>`<rect x="${f(бx+бw/2-2.5)}" y="${f(y-бв+бв*t)}" width="5" height="12" rx="2.5" fill="#2a1e14"/>`).join('')}
        <rect x="${f(бx)}" y="${f(y-бв)}" width="${f(бw*0.25)}" height="${f(бв)}" fill="#fff" opacity=".12"/>`}
      <rect x="${x}" y="${y-8}" width="${ш}" height="8" fill="#6a5a44" opacity=".35"/>
    </g>`;
  }

  /* ---------- римская галера: корпус с хвостом-завитком, бронзовый таран, щиты по борту,
     ряд вёсел (гребут), мачта и полосатый парус. (x,y) — середина по ватерлинии, нос вправо ---------- */
  function галера(x,y,м,опц){
    const о=опц||{};
    const корпус='M-86 -26 Q-94 -44 -80 -50 Q-86 -38 -74 -26 L70 -26 Q86 -26 92 -18 L108 -12 L92 -8 Q84 1 60 2 L-60 2 Q-80 0 -86 -26 Z';
    const вёсла=Array.from({length:9},(_,k)=>{ const ox=-56+k*14;
      return `<g transform="translate(${ox} -8)">${ДВИЖ&&о.гребут!==false?`<animateTransform attributeName="transform" type="rotate" values="0;-16;0" dur="1.6s" repeatCount="indefinite" additive="sum"/>`:''}<line x1="0" y1="0" x2="-12" y2="24" stroke="#8a5a2e" stroke-width="2"/></g>`; }).join('');
    const парус=о.парус===false?'':`<path d="M-34 -104 Q0 -96 34 -104 L32 -50 Q0 -42 -32 -50 Z" fill="#f1e6cc" stroke="${ОБВОД}" stroke-width="1"/>
      ${[-22,-6,10,26].map(xx=>`<path d="M${xx} ${-103+Math.abs(xx)*0.1} L${xx*0.95} ${-49+Math.abs(xx)*0.1}" stroke="#b8321e" stroke-width="6" opacity=".85"/>`).join('')}
      <path d="M-36 -104 H36" stroke="#6a4020" stroke-width="3" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <g opacity=".22" transform="translate(0 10) scale(1 -0.4)"><path d="${корпус}" fill="#0b2a4a"/></g>
      ${вёсла}
      <rect x="-2.5" y="-110" width="5" height="86" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".7"/>
      ${парус}
      <path d="${корпус}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.6"/>
      <path d="M-78 -20 H86" stroke="#b8321e" stroke-width="3"/>
      ${Array.from({length:10},(_,k)=>`<circle cx="${-60+k*13}" cy="-26" r="5" fill="${k%2?'#b8321e':'#e0b030'}" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="${-60+k*13}" cy="-26" r="1.6" fill="url(#рм-бронза)"/>`).join('')}
      <path d="M92 -18 L108 -12 L92 -8 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="80" cy="-14" r="3" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="80.6" cy="-14" r="1.4" fill="#1a120a"/>
      <path d="M-80 -50 q-6 -2 -4 -8" stroke="#6a4020" stroke-width="2" fill="none"/>
      <path d="M110 -2 q10 4 20 0 M-90 2 q-12 4 -24 0" stroke="#e8f6ff" stroke-width="1.4" fill="none" opacity=".8">${анЛин('opacity','0.8;0.2;0.8','2s')}</path>
    </g>`;
  }

  /* ---------- катапульта: рама на колёсах, стойки, метательный рычаг с ложкой; выстрел — рычаг
     бьёт вперёд, камень летит по дуге. (x,y) — середина низа, стреляет вправо ---------- */
  function катапульта(x,y,м,опц){
    const о=опц||{};
    const рычаг=`<g>${ДВИЖ&&о.выстрел?`<animateTransform attributeName="transform" type="rotate" values="-62 -14 -20;28 -14 -20;28 -14 -20;-62 -14 -20" keyTimes="0;0.12;0.6;1" dur="3s" repeatCount="indefinite"/>`:`<animateTransform attributeName="transform" type="rotate" values="-62 -14 -20;-62 -14 -20" dur="1s"/>`}
        <path d="M-14 -20 L-14 -72" stroke="#9a6a3a" stroke-width="5" stroke-linecap="round"/>
        <path d="M-22 -78 q8 -6 16 0 q-2 6 -8 6 q-6 0 -8 -6z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      </g>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="2" cy="1" rx="40" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${[-26,24].map(cx=>`<circle cx="${cx}" cy="-7" r="7" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1"/><circle cx="${cx}" cy="-7" r="2" fill="url(#рм-железо)"/>`).join('')}
      <rect x="-40" y="-22" width="80" height="10" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-4 -22 L10 -60 L24 -22" stroke="url(#рм-доска)" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <path d="M-4 -22 L10 -60 L24 -22" stroke="${ОБВОД}" stroke-width="5" fill="none" opacity=".15"/>
      <rect x="0" y="-62" width="20" height="5" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-24 -18 q10 -6 20 0" stroke="#c8b898" stroke-width="3" fill="none"/>
      ${рычаг}
      ${ДВИЖ&&о.выстрел?`<circle r="5" fill="#8a8a8a" stroke="${ОБВОД}" stroke-width=".7" opacity="0"><animateMotion path="M20 -80 Q90 -150 170 -60" dur="3s" keyTimes="0;0.12;0.6;1" keyPoints="0;0;1;1" calcMode="linear" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.1;0.12;0.58;0.6" dur="3s" repeatCount="indefinite"/></circle>`:''}
    </g>`;
  }

  /* ---------- «коготь Архимеда»: противовес, бревно-журавль, цепь, железный захват.
     (x,y) — ось на стене; длина бревна; угол — подъём бревна (°); цепь — длина цепи ---------- */
  function коготь(x,y,длина,опц){
    const о=опц||{}, у=о.угол==null?18:о.угол, цепь=о.цепь||40;
    const кх=длина*Math.cos(у*Math.PI/180), ку=-длина*Math.sin(у*Math.PI/180);
    return `<g transform="translate(${x} ${y})">
      <g>${ДВИЖ&&о.качать!==false?`<animateTransform attributeName="transform" type="rotate" values="0;-5;0" dur="4s" repeatCount="indefinite"/>`:''}
        <rect x="-30" y="-8" width="20" height="18" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".9"/>
        <line x1="-20" y1="0" x2="${f(кх)}" y2="${f(ку)}" stroke="url(#рм-мачта)" stroke-width="7" stroke-linecap="round"/>
        <line x1="-20" y1="0" x2="${f(кх)}" y2="${f(ку)}" stroke="${ОБВОД}" stroke-width="7" stroke-linecap="round" opacity=".15"/>
        <path d="M${f(кх)} ${f(ку)} V${f(ку+цепь)}" stroke="#4a4e56" stroke-width="2.4" stroke-dasharray="3 1.4"/>
        <g transform="translate(${f(кх)} ${f(ку+цепь)})">
          <circle cx="0" cy="0" r="3.4" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".7"/>
          ${[-1,0,1].map(с=>`<path d="M0 2 q${с*10} 6 ${с*8} 16 q${-с*2} 4 ${-с*6} 2" stroke="url(#рм-железо)" stroke-width="3.2" fill="none" stroke-linecap="round"/>`).join('')}
        </g>
      </g>
      <circle cx="0" cy="0" r="5" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
    </g>`;
  }

  /* ---------- восковая табличка писца: рама, тёмный воск, стилос. (x,y) — левый верх ---------- */
  function восковая(x,y,ш,в,опц){
    const о=опц||{};
    return `<g>
      <rect x="${x+3}" y="${y+5}" width="${ш}" height="${в}" rx="4" fill="#0b1c2a" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <rect x="${x+8}" y="${y+8}" width="${ш-16}" height="${в-16}" rx="2" fill="#4a3418" stroke="#2a1a0a" stroke-width="1"/>
      <rect x="${x+8}" y="${y+8}" width="${ш-16}" height="${в-16}" rx="2" fill="url(#рм-луч)" opacity=".12"/>
      ${[0.25,0.75].map(t=>`<circle cx="${f(x+4)}" cy="${f(y+в*t)}" r="2" fill="url(#рм-бронза)"/>`).join('')}
      ${о.стилос===false?'':`<g transform="translate(${x+ш-18} ${y+в+2}) rotate(-24)"><rect x="-2" y="-40" width="4" height="40" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".6"/><path d="M-4 -44 h8 l-2 5 h-4z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".6"/></g>`}
    </g>`;
  }

  /* ---------- винт Архимеда: наклонный цилиндр в разрезе, винтовая лопасть и порции воды
     ползут вверх по оси (вращение), обручи, рукоять на верхнем конце.
     (x,y) — нижний конец оси; L — длина; угол — наклон (°); опц.r — радиус ---------- */
  function винт(x,y,L,угол,опц){
    const о=опц||{}, r=о.r||14, p=r*1.7, n=Math.ceil(L/p)+2, кл=ид('винт');
    const ход = ДВИЖ&&о.крутится!==false ? `<animateTransform attributeName="transform" type="translate" from="0 0" to="${f(p)} 0" dur="${о.темп||1.4}s" repeatCount="indefinite"/>` : '';
    const лопасти=Array.from({length:n},(_,k)=>{ const x0=-p*2+k*p;
      return `<ellipse cx="${f(x0+p*0.42)}" cy="${f(r*0.5)}" rx="${f(p*0.34)}" ry="${f(r*0.42)}" fill="#5ab4f4" transform="rotate(-38 ${f(x0+p*0.42)} ${f(r*0.5)})"/>
        <ellipse cx="${f(x0+p*0.36)}" cy="${f(r*0.36)}" rx="${f(p*0.14)}" ry="${f(r*0.1)}" fill="#dff2ff" opacity=".8" transform="rotate(-38 ${f(x0+p*0.36)} ${f(r*0.36)})"/>
        <path d="M${f(x0)} ${r} Q${f(x0+p*0.5)} 0 ${f(x0+p)} ${-r}" stroke="#a8743e" stroke-width="4" fill="none"/>
        <path d="M${f(x0)} ${r} Q${f(x0+p*0.5)} 0 ${f(x0+p)} ${-r}" stroke="#e8b878" stroke-width="1" fill="none"/>`; }).join('');
    const рукоять = `<g transform="translate(${L} 0)">${ДВИЖ&&о.крутится!==false?`<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="${f((о.темп||1.4)*1)}s" repeatCount="indefinite" additive="sum"/>`:''}
        <line x1="0" y1="0" x2="0" y2="${f(-r*1.3)}" stroke="#5a5e68" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="${f(-r*1.3)}" r="3" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".6"/></g>`;
    return `<g transform="translate(${x} ${y}) rotate(${-угол})">
      <rect x="-4" y="${f(r+2)}" width="${L+8}" height="6" rx="3" fill="#231a12" opacity=".25" filter="url(#рм-мягко)"/>
      <clipPath id="${кл}"><rect x="0" y="${-r}" width="${L}" height="${2*r}"/></clipPath>
      <rect x="0" y="${-r}" width="${L}" height="${2*r}" fill="#2a1a0e" opacity=".85"/>
      <g clip-path="url(#${кл})"><g>${ход}${лопасти}</g></g>
      <line x1="-6" y1="0" x2="${L+6}" y2="0" stroke="#5a3418" stroke-width="3.4"/>
      <rect x="0" y="${-r}" width="${L}" height="${2*r}" fill="url(#рм-доска)" opacity=".12" stroke="${ОБВОД}" stroke-width="1.4"/>
      <rect x="0" y="${-r-3}" width="${L}" height="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".6"/>
      <line x1="0" y1="${f(-r*0.5)}" x2="${L}" y2="${f(-r*0.5)}" stroke="#fff" stroke-width="1.4" opacity=".35"/>
      ${[0.02,0.33,0.66,0.98].map(t=>`<rect x="${f(L*t-2)}" y="${f(-r-1.5)}" width="4" height="${f(2*r+3)}" rx="1" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
      <circle cx="0" cy="0" r="3.4" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/>
      ${рукоять}
    </g>`;
  }

  /* ---------- лира: панцирь, два рога, перекладина, струны; (x,y) — низ ---------- */
  function лира(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-10 -12 Q-22 -34 -14 -58 Q-10 -64 -6 -60 Q-12 -38 -4 -16 Z M10 -12 Q22 -34 14 -58 Q10 -64 6 -60 Q12 -38 4 -16 Z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="-16" y="-58" width="32" height="4" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
      <ellipse cx="0" cy="-8" rx="14" ry="10" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1"/>
      <ellipse cx="-4" cy="-11" rx="5" ry="3" fill="#fff4c0" opacity=".5"/>
      ${[-6,-2,2,6].map((xx,k)=>`<line x1="${xx}" y1="-54" x2="${xx*0.8}" y2="-10" stroke="#f4ecd8" stroke-width=".8">${ДВИЖ&&о.звучит?`<animate attributeName="x2" values="${xx*0.8};${xx*0.8+1.2};${xx*0.8}" dur="${0.3+k*0.07}s" repeatCount="indefinite"/>`:''}</line>`).join('')}
      ${о.звучит&&ДВИЖ?[0,1,2].map(k=>`<g opacity="0"><animateTransform attributeName="transform" type="translate" values="16 -40;34 -70" dur="2.6s" begin="${k*0.85}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="${k*0.85}s" repeatCount="indefinite"/><path d="M0 0 v-9 l6 -2 v9" stroke="#ffd76a" stroke-width="1.6" fill="none"/><ellipse cx="-1.6" cy="0" rx="2.4" ry="1.8" fill="#ffd76a"/></g>`).join(''):''}
    </g>`;
  }

  /* ---------- ведро: деревянные клёпки, обручи, дужка; опц.вода — плещет ---------- */
  function ведро(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-14 -30 Q0 -44 14 -30" stroke="url(#рм-железо)" stroke-width="2" fill="none"/>
      <path d="M-14 -30 L-11 0 H11 L14 -30 Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/>
      ${[-7,0,7].map(xx=>`<line x1="${xx}" y1="-29" x2="${xx*0.8}" y2="-1" stroke="${ОБВОД}" stroke-width=".5" opacity=".5"/>`).join('')}
      ${[-24,-8].map(yy=>`<path d="M${-14+(yy+30)*0.1} ${yy} H${14-(yy+30)*0.1}" stroke="#5a5e68" stroke-width="2.4"/>`).join('')}
      <ellipse cx="0" cy="-30" rx="14" ry="3" fill="${о.вода===false?'#3a2a1a':'#5ab4f4'}" stroke="${ОБВОД}" stroke-width=".8"/>
      ${о.вода!==false&&ДВИЖ?`<path d="M8 -32 q6 -8 12 -4" stroke="#5ab4f4" stroke-width="2.4" fill="none" stroke-linecap="round">${анЛин('opacity','1;0.2;1','0.9s')}</path>`:''}
    </g>`;
  }

  /* ---------- осенний лист: форма клёна, прожилки; угол — поворот ---------- */
  function листок(x,y,м,цвет,угол){
    const ц=цвет||'#e8a02a';
    return `<g transform="translate(${x} ${y}) rotate(${угол||0}) scale(${м})">
      <path d="M0 10 L0 2 M0 2 L-10 -2 L-7 -5 L-12 -10 L-5 -10 L-6 -17 L0 -12 L6 -17 L5 -10 L12 -10 L7 -5 L10 -2 Z" fill="${ц}" stroke="#8a4a10" stroke-width=".8"/>
      <path d="M0 2 V-12 M0 -2 L-8 -8 M0 -2 L8 -8" stroke="#8a4a10" stroke-width=".6" fill="none"/>
    </g>`;
  }

  /* ---------- золотое кольцо с камнем; (x,y) — низ ---------- */
  function кольцо(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="-8" rx="11" ry="8" fill="none" stroke="url(#рм-латунь)" stroke-width="3.4"/>
      <ellipse cx="0" cy="-8" rx="11" ry="8" fill="none" stroke="#8a5a10" stroke-width=".6"/>
      <path d="M-4 -17 L0 -22 L4 -17 L0 -14 Z" fill="#c83a5a" stroke="#6a1a2a" stroke-width=".6"/>
      <path d="M-8 -12 q-2 3 0 6" stroke="#fffbe0" stroke-width="1.2" fill="none"/>
    </g>`;
  }

  /* ---------- греческий театр: полукруглые ряды на склоне, орхестра, скена с колоннами.
     (x,y) — середина орхестры; r — радиус верхнего ряда ---------- */
  function театр(x,y,r,опц){
    const о=опц||{}, ряды=о.ряды||6, ry=r*0.42;
    return `<g>
      <path d="M${f(x-r*1.08)} ${y} A${f(r*1.08)} ${f(ry*1.08)} 0 0 1 ${f(x+r*1.08)} ${y} Z" fill="url(#рм-холм)" stroke="#6a7a4a" stroke-width=".8"/>
      ${Array.from({length:ряды},(_,k)=>{ const rr=r*(1-k*0.13), rv=ry*(1-k*0.13);
        return `<path d="M${f(x-rr)} ${y} A${f(rr)} ${f(rv)} 0 0 1 ${f(x+rr)} ${y}" stroke="${k%2?'#e8dcc4':'#d8ccb0'}" stroke-width="${f(r*0.1)}" fill="none"/>
          <path d="M${f(x-rr)} ${y} A${f(rr)} ${f(rv)} 0 0 1 ${f(x+rr)} ${y}" stroke="#a89a7c" stroke-width=".6" fill="none" transform="translate(0 ${f(r*0.05)})"/>`; }).join('')}
      ${[-60,-30,0,30,60].map(a=>{ const t=(a-90)*Math.PI/180; return `<line x1="${f(x+r*0.3*Math.cos(t))}" y1="${f(y+ry*0.3*Math.sin(t))}" x2="${f(x+r*1.02*Math.cos(t))}" y2="${f(y+ry*1.02*Math.sin(t))}" stroke="#b8a888" stroke-width="1.4"/>`; }).join('')}
      <ellipse cx="${x}" cy="${y}" rx="${f(r*0.28)}" ry="${f(ry*0.28)}" fill="#e8d8b4" stroke="#a89a7c" stroke-width=".8"/>
      <circle cx="${x}" cy="${y}" r="2" fill="#a89a7c"/>
      ${о.скена===false?'':`<g><rect x="${f(x-r*0.55)}" y="${f(y+4)}" width="${f(r*1.1)}" height="${f(r*0.22)}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
        ${Array.from({length:7},(_,k)=>`<rect x="${f(x-r*0.5+k*r*0.16)}" y="${f(y+6)}" width="${f(r*0.05)}" height="${f(r*0.18)}" fill="url(#рм-колонна)"/>`).join('')}
        <rect x="${f(x-r*0.58)}" y="${f(y+2)}" width="${f(r*1.16)}" height="4" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".6"/></g>`}
    </g>`;
  }

  /* ================= ПИР ================= */

  /* ---------- пиршественный стол: скатерть со складками, хлеб, виноград, рыба на блюде,
     кубки, светильник. (x,y) — середина переднего края столешницы; ш — ширина ---------- */
  function пиршество(x,y,ш,опц){
    const о=опц||{}, л=x-ш/2;
    const виноград=(cx,cy,м)=>`<g transform="translate(${cx} ${cy}) scale(${м})"><path d="M0 -16 q4 -6 10 -6" stroke="#5a7a3a" stroke-width="1.6" fill="none"/><path d="M4 -18 q8 -8 14 -2 q-8 4 -14 2z" fill="#6a9a4a"/>
      ${[[0,-12],[-5,-7],[5,-7],[-8,-1],[0,-2],[8,-1],[-4,4],[4,4],[0,9]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="4.2" fill="#6a2a7a" stroke="#3a1040" stroke-width=".5"/><circle cx="${a-1.3}" cy="${b-1.4}" r="1.2" fill="#d8a8e8" opacity=".8"/>`).join('')}</g>`;
    const хлеб=(cx,cy,м)=>`<g transform="translate(${cx} ${cy}) scale(${м})"><ellipse cx="0" cy="0" rx="16" ry="9" fill="#c8843a" stroke="#6a3a10" stroke-width=".8"/><ellipse cx="-3" cy="-3" rx="10" ry="4" fill="#e8b068" opacity=".8"/>${[-8,0,8].map(a=>`<path d="M${a-3} -5 q3 4 6 0" stroke="#8a4a18" stroke-width="1" fill="none"/>`).join('')}</g>`;
    const рыба=(cx,cy)=>`<g><ellipse cx="${cx}" cy="${cy+3}" rx="22" ry="6" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/><path d="M${cx-14} ${cy} q14 -9 26 0 q-12 8 -26 0z M${cx+12} ${cy} l7 -5 v10z" fill="url(#рм-рыба)" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="${cx-8}" cy="${cy-1}" r="1.2" fill="#1a120a"/></g>`;
    const кубок=(cx,cy)=>`<g><path d="M${cx-6} ${cy-16} h12 q0 9 -6 11 q-6 -2 -6 -11z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/><rect x="${cx-1}" y="${cy-5}" width="2" height="4" fill="url(#рм-бронза)"/><ellipse cx="${cx}" cy="${cy}" rx="5" ry="1.6" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".5"/><ellipse cx="${cx}" cy="${cy-16}" rx="6" ry="1.4" fill="#7a1a2a"/></g>`;
    return `<g>
      <rect x="${f(л+6)}" y="${y+4}" width="${ш-12}" height="${о.высота||40}" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      <path d="M${л} ${y-8} H${л+ш} L${л+ш+4} ${y+(о.высота||40)} H${л-4} Z" fill="#f4eee0" stroke="${ОБВОД}" stroke-width="1"/>
      ${Array.from({length:Math.floor(ш/22)},(_,k)=>`<path d="M${f(л+11+k*22)} ${y} q-3 ${(о.высота||40)*0.5} 0 ${(о.высота||40)-2}" stroke="#d8ccb4" stroke-width="1.4" fill="none" data-декор="1"/>`).join('')}
      <path d="M${л} ${y+6} ${Array.from({length:Math.floor(ш/22)},(_,k)=>`q11 6 22 0`).join(' ')}" stroke="#b8321e" stroke-width="2.4" fill="none"/>
      <rect x="${л}" y="${y-12}" width="${ш}" height="6" fill="#e8dcc4" stroke="${ОБВОД}" stroke-width=".7"/>
      ${хлеб(л+ш*0.14,y-16,1)}${виноград(л+ш*0.34,y-22,0.9)}${рыба(л+ш*0.55,y-18)}${кубок(л+ш*0.72,y-10)}${кубок(л+ш*0.78,y-10)}${виноград(л+ш*0.9,y-22,0.8)}
      ${амфора(л+ш*0.46,y-8,0.34)}
    </g>`;
  }

  /* ---------- гусли: крыловидный корпус, струны, резьба; (x,y) — нижний край ---------- */
  function гусли(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м}) rotate(-12)">
      <path d="M-26 0 L28 0 Q30 -10 18 -18 L-22 -26 Q-30 -14 -26 0 Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-20 -6 L20 -6 Q22 -10 14 -13 L-18 -19 Q-22 -12 -20 -6 Z" fill="#8a5a2e" opacity=".5"/>
      ${[0,1,2,3,4,5].map(k=>`<line x1="${-22+k*1}" y1="${-22+k*3.2}" x2="${24-k*1.4}" y2="${-14+k*2.4}" stroke="#f4ecd8" stroke-width=".7">${ДВИЖ&&о.звучит?`<animate attributeName="y2" values="${-14+k*2.4};${-13.4+k*2.4};${-14+k*2.4}" dur="${0.25+k*0.05}s" repeatCount="indefinite"/>`:''}</line>`).join('')}
      <circle cx="-6" cy="-12" r="2.4" fill="none" stroke="#6a3a10" stroke-width=".8"/>
      <path d="M-26 0 q-4 -6 -2 -12" stroke="#b8321e" stroke-width="1.6" fill="none"/>
    </g>`;
  }

  /* ---------- сосна-зонтик (пиния): изогнутый ствол, плоская крона ---------- */
  function сосна(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-4 0 Q-2 -40 -10 -70 Q-8 -90 4 -104 L10 -102 Q0 -88 0 -70 Q8 -40 6 0 Z" fill="#7a4a2a" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-6 -80 q-14 -6 -24 -2 M4 -96 q12 -4 22 2" stroke="#7a4a2a" stroke-width="3" fill="none"/>
      <path d="M-58 -98 Q-40 -126 0 -128 Q44 -128 62 -100 Q40 -88 0 -90 Q-38 -88 -58 -98 Z" fill="#3a6a3a" stroke="#1e3a24" stroke-width="1"/>
      <path d="M-44 -104 Q-20 -120 10 -120 Q40 -118 52 -104" stroke="#5a8a4a" stroke-width="5" fill="none" opacity=".7"/>
      ${[-40,-16,10,36].map(xx=>`<path d="M${xx} -96 q8 -6 16 0" stroke="#2a4a2a" stroke-width="1.4" fill="none"/>`).join('')}
    </g>`;
  }
  /* ---------- белка: рыжая, пушистый хвост, ушки с кисточками ---------- */
  function белка(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <g>${крутить('0 -8 -6;6 -8 -6;0 -8 -6','1.4s')}<path d="M-6 -4 Q-24 -10 -20 -30 Q-16 -40 -6 -34 Q-14 -26 -8 -14 Z" fill="#c8642a" stroke="#6a2a10" stroke-width=".8"/><path d="M-16 -28 q2 -6 8 -6" stroke="#e8a060" stroke-width="2" fill="none"/></g>
      <ellipse cx="2" cy="-8" rx="8" ry="9" fill="#d8743a" stroke="#6a2a10" stroke-width=".8"/>
      <ellipse cx="4" cy="-5" rx="4" ry="5" fill="#f4d8b0"/>
      <circle cx="8" cy="-19" r="6" fill="#d8743a" stroke="#6a2a10" stroke-width=".8"/>
      <path d="M5 -24 l-1 -7 l4 5z M10 -24 l1 -7 l3 6z" fill="#c8642a" stroke="#6a2a10" stroke-width=".6"/>
      <circle cx="10.5" cy="-20" r="1.4" fill="#1a120a"/><circle cx="14" cy="-18" r="1" fill="#3a1a0a"/>
      <path d="M8 -12 q4 2 6 -2" stroke="#6a2a10" stroke-width="1.4" fill="none"/>
      ${о.шишка?`<ellipse cx="14" cy="-12" rx="3" ry="4" fill="#8a5a2a" stroke="#4a2a10" stroke-width=".5"/>`:''}
    </g>`;
  }

  /* ---------- кольчуга и кафтан — предметы старины ---------- */
  function кольчуга(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-22 -60 L-8 -64 Q0 -58 8 -64 L22 -60 L34 -44 L26 -38 L20 -46 L20 0 H-20 L-20 -46 L-26 -38 L-34 -44 Z" fill="#8a8e98" stroke="${ОБВОД}" stroke-width="1"/>
      <g opacity=".7" data-декор="1">${Array.from({length:9},(_,r)=>Array.from({length:8},(_,c)=>`<circle cx="${-17+c*5+(r%2)*2.5}" cy="${-56+r*6}" r="2" fill="none" stroke="#c8ccd4" stroke-width=".7"/>`).join('')).join('')}</g>
      <path d="M-20 -6 H20" stroke="#5a5e68" stroke-width="2"/>
    </g>`;
  }
  function кафтан(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-18 -62 L-6 -66 L0 -58 L6 -66 L18 -62 L30 -40 L22 -34 L18 -44 L24 0 H-24 L-18 -44 L-22 -34 L-30 -40 Z" fill="#8a2a2a" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M0 -58 V0" stroke="#e0b030" stroke-width="2"/>
      ${[-50,-40,-30,-20,-10].map(yy=>`<path d="M-5 ${yy} h10" stroke="#e0b030" stroke-width="2.4"/><circle cx="-6" cy="${yy}" r="1.4" fill="#e0b030"/><circle cx="6" cy="${yy}" r="1.4" fill="#e0b030"/>`).join('')}
      <path d="M-24 0 H24" stroke="#e0b030" stroke-width="3"/>
      <path d="M-6 -66 q6 -6 12 0" stroke="#5a1a1a" stroke-width="3" fill="none"/>
    </g>`;
  }

  /* ================= ФРАЗЕОЛОГИЗМЫ ================= */

  /* ---------- трон: мраморный, резные подлокотники-львы, пурпурная подушка; (x,y) — низ ---------- */
  function трон(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="3" cy="1" rx="44" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-40" y="-8" width="80" height="8" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-30 -120 Q-30 -132 -18 -132 H18 Q30 -132 30 -120 V-50 H-30 Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-22 -122 H22 V-58 H-22 Z" fill="#7a2a6a" stroke="#4a1040" stroke-width=".8"/>
      <path d="M-22 -122 H22" stroke="#e0b030" stroke-width="2.4" stroke-dasharray="4 2"/>
      <circle cx="0" cy="-138" r="7" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="-34" y="-50" width="68" height="42" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-30 -52 Q0 -60 30 -52 V-44 Q0 -50 -30 -44 Z" fill="#9a3a8a" stroke="#4a1040" stroke-width=".8"/>
      ${[-1,1].map(с=>`<g transform="translate(${с*38} -44)"><path d="M-6 0 V-26 Q-6 -34 0 -34 Q8 -34 8 -26 V0 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/><circle cx="1" cy="-30" r="5" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="${с*2.2}" cy="-31" r="1" fill="#1a120a"/></g>`).join('')}
      <rect x="-34" y="-20" width="68" height="4" fill="#e0b030" opacity=".7"/>
    </g>`;
  }
  /* ---------- меч, подвешенный на конском волосе; (x,y) — точка подвеса; длина — до острия ---------- */
  function меч(x,y,длина,опц){
    const о=опц||{}, в=о.волос||40;
    return `<g transform="translate(${x} ${y})">
      <line x1="0" y1="0" x2="0" y2="${в}" stroke="#e8e0d0" stroke-width=".7" opacity=".9"/>
      <g>${ДВИЖ&&о.дрожит!==false?`<animateTransform attributeName="transform" type="rotate" values="0 0 0;2.4 0 0;-2 0 0;1.2 0 0;0 0 0" dur="2.2s" repeatCount="indefinite"/>`:''}
        <g transform="translate(0 ${в})">
          <circle cx="0" cy="2" r="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
          <rect x="-2.6" y="4" width="5.2" height="18" rx="2" fill="#5a3418" stroke="${ОБВОД}" stroke-width=".6"/>
          <rect x="-14" y="22" width="28" height="4" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>
          <path d="M-4 26 H4 L3 ${длина-12} L0 ${длина} L-3 ${длина-12} Z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".8"/>
          <path d="M-1 28 V${длина-14}" stroke="#e8ecf4" stroke-width="1.2" opacity=".8"/>
          ${ДВИЖ?`<path d="M-2 ${длина*0.5} l2 -4 l2 4 l-2 4z" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;1;0;0" dur="2.6s" repeatCount="indefinite"/></path>`:''}
        </g>
      </g>
    </g>`;
  }
  /* ---------- гусь: белый, оранжевый клюв; с перьев скатываются капли ---------- */
  function гусь(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <path d="M-26 -6 Q-30 -26 -6 -30 Q14 -32 20 -18 Q24 -6 10 0 Q-10 4 -26 -6 Z" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-18 -18 q10 -6 22 -2" stroke="#d8d8d0" stroke-width="2" fill="none"/>
      <path d="M12 -24 Q16 -44 22 -54 Q26 -60 32 -56 Q34 -52 30 -50 Q24 -44 22 -24 Z" fill="#fbfbf6" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M32 -56 l10 2 l-9 4 z" fill="#f08a2a" stroke="#8a4a10" stroke-width=".6"/>
      <circle cx="28" cy="-55" r="1.3" fill="#1a120a"/>
      <path d="M-4 0 v8 M4 0 v8" stroke="#f08a2a" stroke-width="2"/>
      ${о.капли&&ДВИЖ?[0,1,2].map(k=>`<ellipse cx="${-14+k*12}" cy="-26" rx="2" ry="2.8" fill="#7ac0e8" opacity="0"><animate attributeName="cy" values="-28;-4" dur="1.4s" begin="${k*0.45}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="1.4s" begin="${k*0.45}s" repeatCount="indefinite"/></ellipse>`).join(''):''}
    </g>`;
  }
  /* ---------- голова коня: насторожённые уши, грива ---------- */
  function конь(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <path d="M-16 20 Q-20 -10 -8 -30 Q4 -44 16 -40 Q30 -34 34 -18 Q36 -8 28 -4 Q18 0 12 -6 Q6 6 8 20 Z" fill="#8a5a3a" stroke="${ОБВОД}" stroke-width="1"/>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 2 -38;-6 2 -38;0 2 -38" dur="1.6s" repeatCount="indefinite"/>`:''}<path d="M-2 -36 l-2 -16 l8 12z M6 -40 l2 -16 l6 14z" fill="#7a4a2a" stroke="${ОБВОД}" stroke-width=".8"/></g>
      <path d="M-16 20 Q-24 -6 -12 -30 Q-18 -8 -10 20 Z" fill="#3a2418"/>
      <circle cx="16" cy="-28" r="2.2" fill="#1a120a"/><circle cx="15.4" cy="-28.6" r=".7" fill="#fff"/>
      <ellipse cx="30" cy="-12" rx="2" ry="1.4" fill="#2a1a10"/>
      <path d="M10 -34 q10 4 18 14" stroke="#5a3418" stroke-width="1.2" fill="none"/>
    </g>`;
  }
  /* ---------- голова медведя с кольцом в носу ---------- */
  function медведь(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м})">
      ${[-1,1].map(с=>`<circle cx="${с*16}" cy="-22" r="8" fill="#7a4a2a" stroke="${ОБВОД}" stroke-width=".9"/><circle cx="${с*16}" cy="-22" r="4" fill="#a86a4a"/>`).join('')}
      <ellipse cx="0" cy="-6" rx="22" ry="20" fill="#7a4a2a" stroke="${ОБВОД}" stroke-width="1"/>
      <ellipse cx="0" cy="4" rx="11" ry="8" fill="#c89a6a" stroke="${ОБВОД}" stroke-width=".7"/>
      <ellipse cx="0" cy="0" rx="4" ry="3" fill="#1a120a"/>
      <circle cx="-8" cy="-12" r="2" fill="#1a120a"/><circle cx="8" cy="-12" r="2" fill="#1a120a"/>
      ${о.кольцо!==false?`<circle cx="0" cy="5" r="3.4" fill="none" stroke="url(#рм-латунь)" stroke-width="1.8"/><path d="M0 8 Q10 20 ${о.верёвка||30} 18" stroke="#b8a888" stroke-width="1.4" fill="none"/>`:''}
    </g>`;
  }
  /* ---------- баклуши: чурки-заготовки для ложек, стружка ---------- */
  function баклуши(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      ${[[-14,0],[4,0],[-5,-12],[16,-6]].map(([a,b])=>`<g transform="translate(${a} ${b})"><rect x="-7" y="-14" width="14" height="14" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/><ellipse cx="0" cy="-14" rx="7" ry="2.4" fill="#e8c898" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="0" cy="-14" r="1.4" fill="none" stroke="#b8905a" stroke-width=".5"/></g>`).join('')}
      <path d="M-26 2 q4 -6 8 0 q4 -6 8 0 M20 4 q3 -4 6 0" stroke="#e8c898" stroke-width="1.4" fill="none"/>
    </g>`;
  }

  /* ---------- бронзовая статуя воина на постаменте: шлем с гребнем, щит, копьё;
     опц.пята — светится уязвимая пятка. (x,y) — низ постамента ---------- */
  function воин(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="3" cy="1" rx="36" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-30" y="-20" width="60" height="20" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-34" y="-24" width="68" height="5" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-8 -24 L-10 -60 H-2 L0 -44 L2 -60 H10 L8 -24 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-12 -24 h8 v-4 h-8z M4 -24 h8 v-4 h-8z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
      ${о.пята?`<circle cx="-9" cy="-26" r="6" fill="#ff6a4a" opacity=".7">${анЛин('r','4;9;4','1.2s')}${анЛин('opacity','0.9;0.3;0.9','1.2s')}</circle><circle cx="-9" cy="-26" r="2.2" fill="#ffe0c8"/>`:''}
      <path d="M-14 -60 Q-16 -92 -10 -100 H10 Q16 -92 14 -60 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-10 -84 Q0 -78 10 -84 M-8 -72 Q0 -68 8 -72" stroke="#5a3414" stroke-width="1" fill="none" opacity=".7"/>
      <path d="M12 -96 Q24 -86 28 -70" stroke="url(#рм-бронза)" stroke-width="7" stroke-linecap="round" fill="none"/>
      <line x1="30" y1="-150" x2="26" y2="-24" stroke="#6a4020" stroke-width="3"/><path d="M30 -150 l-4 -10 l8 0 z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/>
      <circle cx="-20" cy="-78" r="18" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1.2"/>
      <circle cx="-20" cy="-78" r="12" fill="none" stroke="#f0c890" stroke-width="1.4" opacity=".7"/><circle cx="-20" cy="-78" r="3" fill="#f0c890"/>
      <rect x="-4" y="-106" width="8" height="8" fill="url(#рм-бронза)"/>
      <path d="M-11 -106 Q-12 -126 0 -128 Q12 -126 11 -106 L8 -104 V-112 H4 V-104 H-4 V-112 H-8 V-104 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-4 -128 Q-18 -146 -4 -150 Q14 -150 16 -132" fill="#b8321e" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-6 -120 Q0 -124 6 -120" stroke="#f8dcb0" stroke-width="1" fill="none" opacity=".7"/>
    </g>`;
  }

  /* ---------- сфера Архимеда (армиллярная): бронзовая стойка, меридиан, горизонт и шесть колец,
     медленно вращающихся; опц.свет — номера колец, которые горят золотом; опц.ядро — svg в центре ---------- */
  function сфера(x,y,r,опц){
    const о=опц||{}, свет=о.свет||[], n=о.колец||6;
    const кольцо=(k)=>{ const на=свет.includes(k), a=-60+k*24, ry=r*(0.22+0.07*k);
      const вр=ДВИЖ&&о.вращать!==false?`<animateTransform attributeName="transform" type="rotate" from="${a} ${x} ${y}" to="${a+(k%2?360:-360)} ${x} ${y}" dur="${60+k*14}s" repeatCount="indefinite"/>`:'';
      return `<g transform="rotate(${a} ${x} ${y})">${вр}
        ${на?`<ellipse cx="${x}" cy="${y}" rx="${f(r*0.96)}" ry="${f(ry)}" fill="none" stroke="#ffd76a" stroke-width="7" opacity=".35" filter="url(#рм-мягко)"/>`:''}
        <ellipse cx="${x}" cy="${y}" rx="${f(r*0.96)}" ry="${f(ry)}" fill="none" stroke="${на?'#ffd76a':'#8a5a2a'}" stroke-width="${на?3.2:2.4}"/>
        <ellipse cx="${x}" cy="${y}" rx="${f(r*0.96)}" ry="${f(ry)}" fill="none" stroke="${на?'#fff4c0':'#c8905a'}" stroke-width=".8" stroke-dasharray="2 6"/>
        <circle cx="${f(x+r*0.96)}" cy="${y}" r="${на?4:3}" fill="${на?'#ffd76a':'url(#рм-бронза)'}" stroke="${ОБВОД}" stroke-width=".6"/>
      </g>`; };
    return `<g>
      <ellipse cx="${x+4}" cy="${f(y+r*1.5)}" rx="${f(r*0.7)}" ry="6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M${f(x-r*0.5)} ${f(y+r*1.5)} L${f(x-r*0.3)} ${f(y+r*1.3)} H${f(x+r*0.3)} L${f(x+r*0.5)} ${f(y+r*1.5)} Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${f(x-4)} ${f(y+r*1.3)} L${f(x-3)} ${f(y+r*1.02)} H${f(x+3)} L${f(x+4)} ${f(y+r*1.3)} Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="${x}" cy="${y}" r="${f(r*1.04)}" fill="none" stroke="url(#рм-бронза)" stroke-width="5"/>
      <circle cx="${x}" cy="${y}" r="${f(r*1.04)}" fill="none" stroke="${ОБВОД}" stroke-width=".8"/>
      ${Array.from({length:36},(_,k)=>{ const t=k*Math.PI/18; return `<line x1="${f(x+r*1.0*Math.cos(t))}" y1="${f(y+r*1.0*Math.sin(t))}" x2="${f(x+r*1.08*Math.cos(t))}" y2="${f(y+r*1.08*Math.sin(t))}" stroke="#5a3414" stroke-width=".7"/>`; }).join('')}
      <ellipse cx="${x}" cy="${y}" rx="${f(r*1.18)}" ry="${f(r*0.3)}" fill="none" stroke="url(#рм-бронза)" stroke-width="4"/>
      ${Array.from({length:n},(_,k)=>кольцо(k)).join('')}
      ${о.ядро?о.ядро:`<circle cx="${x}" cy="${y}" r="${f(r*0.2)}" fill="url(#рм-море)" stroke="${ОБВОД}" stroke-width=".8"/><ellipse cx="${f(x-r*0.06)}" cy="${f(y-r*0.07)}" rx="${f(r*0.07)}" ry="${f(r*0.04)}" fill="#fff" opacity=".5"/>`}
      <circle cx="${x}" cy="${f(y-r*1.04)}" r="4" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>
    </g>`;
  }
  /* ---------- цветы: охапка разноцветных соцветий с листьями; (x,y) — середина низа ---------- */
  function цветы(x,y,ш,в,опц){
    const о=опц||{}, n=о.сколько||Math.round(ш*в/180), ц=['#e8405a','#ffd24a','#f08a2a','#b84ab8','#fbfbf6','#ff7aa8','#4a86d8'];
    return `<g>${Array.from({length:n},(_,k)=>{ const px=x-ш/2+((k*47)%100)/100*ш, py=y-((k*31)%100)/100*в, c=ц[k%ц.length], rr=3+(k%3);
      return `<path d="M${f(px)} ${f(py+6)} q-4 -2 -6 -8" stroke="#3a7a3a" stroke-width="1.4" fill="none"/><ellipse cx="${f(px-5)}" cy="${f(py+2)}" rx="3.4" ry="1.6" fill="#4a8a3a" transform="rotate(-30 ${f(px-5)} ${f(py+2)})"/>
        ${[0,72,144,216,288].map(a=>{ const t=a*Math.PI/180; return `<circle cx="${f(px+rr*Math.cos(t))}" cy="${f(py+rr*Math.sin(t))}" r="${f(rr*0.62)}" fill="${c}"/>`; }).join('')}<circle cx="${f(px)}" cy="${f(py)}" r="${f(rr*0.45)}" fill="${c==='#ffd24a'?'#c8601a':'#ffd24a'}"/>`; }).join('')}</g>`;
  }

  /* ================= МУЗЕЙ ================= */

  /* ---------- музейная амфора: узкое горло с меандром, ручки-«лебединые шеи», тулово с
     чёрнофигурной росписью (корабль среди дельфинов), лучи, ножка. (x,y) — середина низа;
     высота ≈ 176·м. опц.свет — массив частей с подсветкой:
     'горло' | 'ручки' | 'тулово' | 'роспись' | 'ножка' ---------- */
  function амфораМузей(x,y,м,опц){
    const о=опц||{}, св=о.свет||[], кл=ид('амф');
    const P={
      ножка:'M-19 0 H19 L15 -8 H-15 Z M-8 -8 L-11 -22 H11 L8 -8 Z',
      тулово:'M-10 -22 Q-26 -30 -40 -60 Q-54 -94 -46 -116 Q-38 -130 -20 -134 H20 Q38 -130 46 -116 Q54 -94 40 -60 Q26 -30 10 -22 Z',
      горло:'M-16 -133 L-13 -170 H13 L16 -133 Z M-20 -179 H20 V-170 H-20 Z',
      ручки:'M-13 -162 Q-44 -168 -40 -124 M13 -162 Q44 -168 40 -124',
      роспись:'M-42 -112 H42 V-60 H-42 Z'
    };
    const глоу=(k,d,линия)=>св.includes(k)?`<path d="${d}" fill="none" stroke="#ffd76a" stroke-width="${линия?11:5}" stroke-linecap="round" opacity=".55" filter="url(#рм-мягко)">${анЛин('opacity','0.35;0.8;0.35','1.4s')}</path>`:'';
    const корабль=`<g transform="translate(0 -78) scale(.9)">
      <path d="M-30 4 Q-34 -4 -30 -6 L26 -6 Q34 -6 36 0 L30 6 Q0 10 -30 4 Z" fill="#1a120e"/>
      <path d="M-34 -2 q-4 -6 -2 -10" stroke="#1a120e" stroke-width="2" fill="none"/>
      <path d="M-2 -6 V-30" stroke="#1a120e" stroke-width="1.8"/><path d="M-14 -28 H12 L10 -12 H-12 Z" fill="#1a120e"/>
      <path d="M-12 -24 H10 M-12 -18 H10" stroke="#e0864a" stroke-width=".7"/>
      ${[-22,-14,-6,2,10,18].map(xx=>`<path d="M${xx} 5 l-4 8" stroke="#1a120e" stroke-width="1.2"/>`).join('')}
      <circle cx="28" cy="-1" r="1.2" fill="#e0864a"/>
    </g>`;
    const дельфин=(dx,dy,зн)=>`<path transform="translate(${dx} ${dy}) scale(${зн} 1)" d="M-10 2 Q-4 -8 8 -4 Q12 -3 13 0 Q8 -1 6 2 Q0 4 -10 2 Z M0 -6 l2 -4 l2 4 M-10 2 l-4 -3 l1 6 z" fill="#1a120e"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="4" cy="1" rx="46" ry="5" fill="#231a12" opacity=".4" filter="url(#рм-мягко)"/>
      ${глоу('ручки',P.ручки,true)}
      <path d="${P.ручки}" stroke="#8a3a1a" stroke-width="7.5" fill="none" stroke-linecap="round"/>
      <path d="${P.ручки}" stroke="#e0864a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      ${глоу('тулово',P.тулово)}
      <path d="${P.тулово}" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <clipPath id="${кл}"><path d="${P.тулово}"/></clipPath>
      <g clip-path="url(#${кл})">
        <rect x="-60" y="-120" width="120" height="4" fill="#1a120e"/><rect x="-60" y="-56" width="120" height="3" fill="#1a120e"/>
        ${корабль}${дельфин(-28,-100,1)}${дельфин(28,-102,-1)}
        <path d="M-60 -52 H60" stroke="#1a120e" stroke-width="1"/>
        ${Array.from({length:10},(_,k)=>`<path d="M${-40+k*8} -24 L${-36+k*8} -48 L${-32+k*8} -24 Z" fill="#1a120e"/>`).join('')}
        <ellipse cx="-30" cy="-96" rx="10" ry="30" fill="#ffc890" opacity=".28" transform="rotate(14 -30 -96)"/>
      </g>
      ${глоу('роспись',P.роспись)}
      ${глоу('ножка',P.ножка)}
      <path d="${P.ножка}" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-15" y="-6" width="30" height="2.4" fill="#1a120e"/>
      ${глоу('горло',P.горло)}
      <path d="${P.горло}" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1.1"/>
      <rect x="-14.5" y="-160" width="29" height="14" fill="#1a120e"/>
      <path d="M-13 -149 h4 v-7 h5 v10 h5 v-7 h5 v7 h5 v-10 h4 v7 h2" stroke="#e0864a" stroke-width="1.2" fill="none"/>
      <path d="M-8 -175 q-3 16 -2 36" stroke="#ffc890" stroke-width="2" fill="none" opacity=".45"/>
    </g>`;
  }

  /* ---------- музейная витрина: мраморный постамент, стеклянный колпак с бликами, табличка.
     (x,y) — середина низа постамента; ш — ширина; в — высота стекла ---------- */
  function витрина(x,y,ш,в,опц){
    const о=опц||{}, п=34;
    return `<g>
      <ellipse cx="${x+4}" cy="${y+2}" rx="${f(ш*0.6)}" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="${f(x-ш/2)}" y="${y-п}" width="${ш}" height="${п}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${f(x-ш/2-5)}" y="${y-п-5}" width="${ш+10}" height="6" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
      ${о.табличка?`<rect x="${f(x-ш*0.44)}" y="${y-п+9}" width="${f(ш*0.88)}" height="16" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/><text x="${x}" y="${y-п+21}" text-anchor="middle" font-size="9" font-weight="bold" fill="#3a2408" font-family="Georgia,serif">${о.табличка}</text>`:''}
      ${о.стекло===false?'':`<rect x="${f(x-ш/2+4)}" y="${f(y-п-5-в)}" width="${ш-8}" height="${в}" fill="#dff2ff" opacity=".13" stroke="#b8d8f0" stroke-width="1.2"/>
        <path d="M${f(x-ш/2+14)} ${f(y-п-в+10)} l18 0 l-40 ${f(в*0.5)} l-8 0 z" fill="#fff" opacity=".16" data-декор="1"/>
        <path d="M${f(x+ш/2-26)} ${f(y-п-в+30)} l8 0 l-24 ${f(в*0.4)} l-6 0 z" fill="#fff" opacity=".12" data-декор="1"/>
        <rect x="${f(x-ш/2+2)}" y="${f(y-п-9-в)}" width="${ш-4}" height="6" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>`}
    </g>`;
  }

  /* ---------- подснежник: изогнутый стебель, два узких листа, поникший белый цветок ---------- */
  function подснежник(x,y,м){
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <path d="M-6 0 Q-12 -20 -8 -40 M6 0 Q12 -22 6 -38" stroke="#3a8a4a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M0 0 Q2 -30 -2 -48 Q-4 -56 4 -58" stroke="#4a9a4a" stroke-width="2" fill="none"/>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 4 -58;6 4 -58;0 4 -58" dur="3s" repeatCount="indefinite"/>`:''}
        <path d="M4 -58 Q14 -58 12 -46 Q10 -34 4 -30 Q-2 -34 -4 -46 Q-6 -58 4 -58 Z" fill="#fbfbf6" stroke="#9aa8a0" stroke-width=".8"/>
        <path d="M4 -56 Q-8 -52 -6 -38 Q-2 -40 2 -44 M4 -56 Q16 -52 14 -38 Q10 -40 6 -44" fill="#f4f8f2" stroke="#9aa8a0" stroke-width=".7"/>
        <path d="M1 -34 q3 3 6 0" stroke="#6ac06a" stroke-width="1.4" fill="none"/>
        <circle cx="4" cy="-59" r="2" fill="#5a9a4a"/>
      </g>
    </g>`;
  }
  /* ---------- Этна: вулкан со снежной шапкой и дымком; (x,y) — середина подножия, ш — ширина ---------- */
  function этна(x,y,ш,в){
    return `<g>
      <path d="M${f(x-ш/2)} ${y} L${f(x-ш*0.08)} ${f(y-в)} H${f(x+ш*0.08)} L${f(x+ш/2)} ${y} Z" fill="#8a7a8a" stroke="#5a4a5a" stroke-width="1"/>
      <path d="M${f(x-ш*0.08)} ${f(y-в)} H${f(x+ш*0.08)} L${f(x+ш*0.2)} ${f(y-в*0.62)} Q${f(x+ш*0.1)} ${f(y-в*0.7)} ${f(x+ш*0.02)} ${f(y-в*0.6)} Q${f(x-ш*0.08)} ${f(y-в*0.72)} ${f(x-ш*0.2)} ${f(y-в*0.62)} Z" fill="#fbfbf6" stroke="#c8ccd4" stroke-width=".8"/>
      <path d="M${f(x-ш*0.3)} ${f(y-в*0.3)} L${f(x-ш*0.18)} ${f(y-в*0.5)} M${f(x+ш*0.28)} ${f(y-в*0.28)} L${f(x+ш*0.16)} ${f(y-в*0.5)}" stroke="#6a5a6a" stroke-width="1" opacity=".6"/>
      ${[0,1,2].map(k=>`<circle cx="${f(x)}" cy="${f(y-в-6)}" r="6" fill="#d8d0d8" opacity="0">${ДВИЖ?`<animate attributeName="cy" values="${f(y-в-6)};${f(y-в-44)}" dur="5s" begin="${k*1.6}s" repeatCount="indefinite"/><animate attributeName="r" values="5;14" dur="5s" begin="${k*1.6}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.7;0" dur="5s" begin="${k*1.6}s" repeatCount="indefinite"/>`:''}</circle>`).join('')}
    </g>`;
  }

  /* ---------- снегопад: хлопья падают и чуть сносятся ветром ---------- */
  function снегопад(ш,в,n){
    return `<g data-декор="1">${Array.from({length:n||28},(_,k)=>{ const x=(k*53+17)%ш, r=0.9+(k%4)*0.45, d=5+(k%5)*1.1, y0=(k*37)%в;
      return `<circle cx="${x}" cy="${y0}" r="${f(r)}" fill="#fff" opacity="${f(0.55+(k%3)*0.2)}">${ДВИЖ?`<animate attributeName="cy" values="-6;${в+6}" dur="${f(d)}s" begin="-${f(d*y0/в)}s" repeatCount="indefinite"/><animate attributeName="cx" values="${x};${x+8};${x-4};${x}" dur="${f(d*0.8)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('')}</g>`;
  }

  /* ---------- акведук: каменные опоры и арки, наверху жёлоб с бегущей водой.
     (x,y) — левый низ; опц.арок — число пролётов; опц.струя — вода падает с правого края ---------- */
  function акведук(x,y,ш,в,опц){
    const о=опц||{}, n=о.арок||Math.max(2,Math.round(ш/46)), шаг=ш/n, оп=шаг*0.18, r=(шаг-2*оп)/2, верх=y-в, ys=Math.min(y-4,верх+16+r);
    let d=`M${f(x)} ${f(y)} V${f(верх+8)} H${f(x+ш)} V${f(y)} Z`, дуги='', швы='', тени='';
    for(let k=0;k<n;k++){ const a=x+k*шаг+оп, b=a+2*r, дуга=`M${f(a)} ${f(ys)} A${f(r)} ${f(r)} 0 0 1 ${f(b)} ${f(ys)}`;
      d+=` M${f(a)} ${f(y)} V${f(ys)} A${f(r)} ${f(r)} 0 0 1 ${f(b)} ${f(ys)} V${f(y)} Z`;
      дуги+=`<path d="${дуга}" stroke="#8a7656" stroke-width="3.4" fill="none"/><path d="${дуга}" stroke="#f4ead0" stroke-width="1" fill="none" stroke-dasharray="4 3" opacity=".75"/>`; }
    for(let k=0;k<=n;k++){ const a=Math.max(x,x+k*шаг-оп), b=Math.min(x+ш,x+k*шаг+оп);
      for(let yy=ys+7;yy<y-3;yy+=9) швы+=`<line x1="${f(a)}" y1="${f(yy)}" x2="${f(b)}" y2="${f(yy)}" stroke="#7a6a4e" stroke-width=".6" opacity=".6"/>`;
      тени+=`<rect x="${f((a+b)/2)}" y="${f(ys)}" width="${f((b-a)/2)}" height="${f(y-ys)}" fill="#2a1e10" opacity=".16"/>`; }
    return `<g>
      <path d="${d}" fill="url(#рм-камень)" fill-rule="evenodd" stroke="${ОБВОД}" stroke-width="1"/>
      ${тени}${швы}${дуги}
      <line x1="${f(x)}" y1="${f(верх+15)}" x2="${f(x+ш)}" y2="${f(верх+15)}" stroke="#7a6a4e" stroke-width=".7" opacity=".6"/>
      <rect x="${f(x-3)}" y="${f(верх)}" width="${f(ш+6)}" height="9" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="${f(x-3)}" y="${f(верх+1.5)}" width="${f(ш+6)}" height="3.4" fill="#5aa8e0"/>
      <line x1="${f(x-3)}" y1="${f(верх+3.2)}" x2="${f(x+ш+3)}" y2="${f(верх+3.2)}" stroke="#e8f6ff" stroke-width="1.2" stroke-dasharray="8 10" opacity=".9" data-декор="1">${анЛин('stroke-dashoffset','18;0','1.4s')}</line>
      ${о.струя?`<path d="M${f(x+ш+2)} ${f(верх+3)} q7 2 8 ${f(в-8)}" stroke="#8ccaf0" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="7 4" data-декор="1">${анЛин('stroke-dashoffset','11;0','0.5s')}</path>
        <ellipse cx="${f(x+ш+10)}" cy="${f(y-2)}" rx="9" ry="2.4" fill="none" stroke="#e8f6ff" stroke-width="1.2" data-декор="1">${анЛин('rx','5;12;5','1.2s')}</ellipse>`:''}
    </g>`;
  }

  /* ---------- корабль на стапеле: киль на кильблоках, шпангоуты, пояса обшивки снизу вверх,
     штевни, подпорки и леса с лестницей. (x,y) — середина у земли; опц.обшивка 0..1 — доля
     готовых поясов из опц.поясов (6); опц.новая — верхний пояс проявляется; опц.леса:false ---------- */
  function стапель(x,y,ш,в,опц){
    const о=опц||{}, S=о.поясов||6, есть=Math.max(0,Math.min(S,Math.round((о.обшивка||0)*S))), N=18, n=о.рёбер||11;
    const xt=(t)=>x-ш/2+ш*t, yK=(t)=>y-12-в*0.5*Math.pow(Math.abs(2*t-1),3), yT=(t)=>y-в+в*0.16*4*t*(1-t);
    const yj=(t,j)=>yK(t)+(yT(t)-yK(t))*j/S;
    const линия=(j,обр)=>{ const p=[]; for(let i=0;i<=N;i++){ const t=обр?1-i/N:i/N; p.push(f(xt(t))+' '+f(yj(t,j))); } return p; };
    const xl=xt(0), xr=xt(1);
    const рёбра=Array.from({length:n},(_,k)=>{ const t=(k+1)/(n+1);
      return `<line x1="${f(xt(t))}" y1="${f(yK(t))}" x2="${f(xt(t))}" y2="${f(yT(t)-4)}" stroke="#b88a52" stroke-width="3.2" stroke-linecap="round"/>
        <line x1="${f(xt(t)+1.4)}" y1="${f(yK(t))}" x2="${f(xt(t)+1.4)}" y2="${f(yT(t)-3)}" stroke="#6a4020" stroke-width=".7" opacity=".7"/>`; }).join('');
    const пояса=Array.from({length:есть},(_,j)=>{ const новая=о.новая&&j===есть-1&&ДВИЖ;
      const стыки=[0.22,0.47,0.71].map((t0,q)=>{ const t=t0+((j*0.13+q*0.05)%0.2); return `<line x1="${f(xt(t))}" y1="${f(yj(t,j))}" x2="${f(xt(t))}" y2="${f(yj(t,j+1))}" stroke="${ОБВОД}" stroke-width=".6" opacity=".5"/>`; }).join('');
      const гвозди=Array.from({length:n},(_,k)=>{ const t=(k+1)/(n+1); return `<circle cx="${f(xt(t))}" cy="${f((yj(t,j)+yj(t,j+1))/2)}" r=".9" fill="#3a2008" opacity=".7"/>`; }).join('');
      return `<g${новая?' opacity="0"':''}>${новая?`<animate attributeName="opacity" from="0" to="1" dur="0.7s" fill="freeze"/>`:''}
        <path d="M${линия(j).join(' L')} L${линия(j+1,true).join(' L')} Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8" stroke-linejoin="round"/>${стыки}${гвозди}</g>`; }).join('');
    const блоки=[0.24,0.37,0.5,0.63,0.76].map(t=>`<rect x="${f(xt(t)-6)}" y="${f(yK(t)+2)}" width="12" height="${f(y-yK(t)-2)}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7"/>`).join('');
    const подпорки=[[0.13,-16],[0.3,-12],[0.7,12],[0.87,16]].map(([t,dx])=>`<line x1="${f(xt(t)+dx)}" y1="${f(y)}" x2="${f(xt(t))}" y2="${f(yj(t,2.4))}" stroke="#8a5a2e" stroke-width="3" stroke-linecap="round"/>`).join('');
    const леса=о.леса===false?'':`<g>
        <rect x="${f(xl-16)}" y="${f(y-в-14)}" width="4" height="${f(в+14)}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".5"/>
        <rect x="${f(xr+12)}" y="${f(y-в-14)}" width="4" height="${f(в+14)}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".5"/>
        <rect x="${f(xl-20)}" y="${f(y-в*0.56)}" width="${f(ш*0.2)}" height="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".6"/>
        <rect x="${f(xr+20-ш*0.2)}" y="${f(y-в*0.56)}" width="${f(ш*0.2)}" height="4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".6"/>
        <path d="M${f(xl-6)} ${f(y)} L${f(xl+6)} ${f(y-в*0.56)} M${f(xl+3)} ${f(y)} L${f(xl+15)} ${f(y-в*0.56)}" stroke="#7a4a24" stroke-width="1.6"/>
        ${[0.15,0.35,0.55,0.75,0.92].map(q=>`<line x1="${f(xl-6+12*q)}" y1="${f(y-в*0.56*q)}" x2="${f(xl+3+12*q)}" y2="${f(y-в*0.56*q)}" stroke="#7a4a24" stroke-width="1.4"/>`).join('')}
      </g>`;
    return `<g>
      <ellipse cx="${f(x)}" cy="${f(y+1)}" rx="${f(ш*0.52)}" ry="5" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      ${леса}${блоки}
      <path d="M${f(xl)} ${f(yK(0))} Q${f(xl-13)} ${f(yT(0)-12)} ${f(xl-3)} ${f(yT(0)-30)} q7 -7 11 1" stroke="#6a4020" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M${f(xr)} ${f(yK(1))} Q${f(xr+11)} ${f(yT(1)-8)} ${f(xr+5)} ${f(yT(1)-26)}" stroke="#6a4020" stroke-width="5" fill="none" stroke-linecap="round"/>
      ${рёбра}
      <path d="M${линия(S).join(' L')}" stroke="#7a4a24" stroke-width="2.6" fill="none" stroke-linejoin="round"/>
      ${пояса}
      <path d="M${линия(0).join(' L')}" stroke="#4a2a10" stroke-width="5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M${линия(0).join(' L')}" stroke="#c89a5a" stroke-width="1" fill="none" opacity=".6" transform="translate(0 -1.6)"/>
      ${подпорки}
    </g>`;
  }

  /* ---------- «Сиракузия»: корабль-великан Гиерона — длинный корпус с цветными поясами и портами,
     три мачты с полосатыми парусами, башни на носу и корме, палубный павильон с колоннами,
     бронзовый таран. (x,y) — середина по ватерлинии, нос вправо; опц.качка:false ---------- */
  function сиракузия(x,y,м,опц){
    const о=опц||{};
    const корпус='M-120 -30 Q-130 -54 -112 -64 Q-118 -46 -104 -30 L100 -30 Q118 -30 126 -20 L142 -13 L124 -7 Q112 5 84 5 L-84 5 Q-112 3 -120 -30 Z';
    const парус=(xm,y1,w,h)=>`<path d="M${xm-w/2} ${y1} Q${xm} ${f(y1+h*0.1)} ${xm+w/2} ${y1} L${f(xm+w*0.46)} ${y1+h} Q${xm+6} ${f(y1+h*1.14)} ${f(xm-w*0.46)} ${y1+h} Z" fill="url(#рм-парус)" stroke="${ОБВОД}" stroke-width=".9"/>
      ${[-0.3,0,0.3].map(k=>`<path d="M${f(xm+w*k)} ${f(y1+3)} Q${f(xm+w*k+3)} ${f(y1+h*0.6)} ${f(xm+w*k*0.94+2)} ${f(y1+h+2)}" stroke="#7a2a6a" stroke-width="${f(w*0.085)}" fill="none" opacity=".78"/>`).join('')}
      <rect x="${xm-w/2-3}" y="${y1-1.5}" width="${w+6}" height="3" rx="1.5" fill="#6a4020"/>`;
    const мачта=(xm,h)=>`<rect x="${xm-2}" y="${-30-h}" width="4" height="${h}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M${xm+2} ${-30-h} q9 3 16 -1 q-5 7 -16 7z" fill="#b8321e" stroke="${ОБВОД}" stroke-width=".5"/>`;
    const башня=(bx)=>`<rect x="${bx}" y="-58" width="16" height="24" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${[0,1,2].map(k=>`<rect x="${bx+k*6}" y="-62" width="4" height="4" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
      <rect x="${bx+6.5}" y="-52" width="3" height="7" rx="1.5" fill="#3a2a1a"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">${о.качка===false?'':качать('0 0;0 2;0 0','4.4s')}
      <g opacity=".2" transform="translate(0 12) scale(1 -0.4)"><path d="${корпус}" fill="#0b2a4a"/></g>
      ${мачта(0,122)}${парус(0,-146,60,58)}
      ${мачта(-70,94)}${парус(-70,-118,48,50)}${мачта(68,88)}${парус(68,-112,44,46)}
      <path d="M-70 -124 L-116 -40 M68 -118 L118 -36 M0 -152 L-70 -124 M0 -152 L68 -118" stroke="#5a4630" stroke-width=".7" opacity=".7"/>
      ${башня(-100)}${башня(84)}
      <rect x="-34" y="-62" width="68" height="28" fill="#f6efe0" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="-30" y="-58" width="60" height="24" fill="#5a4a3a"/>
      ${[-28,-14,0,14,28].map(cx=>`<rect x="${cx-2.4}" y="-60" width="4.8" height="26" fill="url(#рм-колонна)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
      <path d="M-38 -62 L0 -76 L38 -62 Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-30 -63.5 L0 -73 L30 -63.5 Z" fill="#c8603a" opacity=".85"/>
      <rect x="-106" y="-37" width="212" height="7" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/>
      ${Array.from({length:26},(_,k)=>`<line x1="${-102+k*8}" y1="-37" x2="${-102+k*8}" y2="-30" stroke="${ОБВОД}" stroke-width=".5" opacity=".5"/>`).join('')}
      <path d="${корпус}" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1.6"/>
      <rect x="-112" y="-25" width="234" height="3.2" rx="1.6" fill="#e0b030"/>
      <rect x="-108" y="-13" width="226" height="2.4" rx="1.2" fill="#b8321e"/>
      ${Array.from({length:16},(_,k)=>`<rect x="${-96+k*13}" y="-20" width="5" height="4.4" rx="1" fill="#1e120a" stroke="#8a6a3a" stroke-width=".5"/>`).join('')}
      <path d="M-104 -2 Q0 8 104 -2" stroke="#2a1a0e" stroke-width=".8" fill="none" opacity=".5"/>
      <path d="M126 -20 L142 -13 L124 -7 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="112" cy="-17" r="3.2" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="112.7" cy="-17" r="1.5" fill="#1a120a"/>
      <path d="M-112 -64 q-9 -4 -6 -13 q7 -6 11 2" stroke="#e0b030" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M144 -2 q10 4 20 0 M-124 4 q-12 4 -24 0" stroke="#e8f6ff" stroke-width="1.4" fill="none" opacity=".8">${анЛин('opacity','0.8;0.2;0.8','2s')}</path>
    </g>`;
  }

  /* ---------- полиспаст: два блока со шкивами и три ветви каната между ними;
     (x1,y1) и (x2,y2) — блоки; опц.тяга — [x,y] свободного конца ---------- */
  function полиспаст(x1,y1,x2,y2,опц){
    const о=опц||{}, канат='#e0c890';
    const блок=(bx,by)=>`<g><ellipse cx="${bx}" cy="${by}" rx="6.5" ry="8.5" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".9"/>
      <circle cx="${bx}" cy="${by}" r="4" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="${bx}" cy="${by}" r="1.2" fill="#3a2008"/></g>`;
    return `<g>
      ${[-3.4,0,3.4].map(k=>`<line x1="${f(x1)}" y1="${f(y1+k)}" x2="${f(x2)}" y2="${f(y2+k)}" stroke="${канат}" stroke-width="1.3"/>`).join('')}
      ${о.тяга?`<path d="M${f(x1)} ${f(y1+4)} Q${f((x1+о.тяга[0])/2)} ${f(Math.max(y1,о.тяга[1])+8)} ${f(о.тяга[0])} ${f(о.тяга[1])}" stroke="${канат}" stroke-width="1.7" fill="none" stroke-linecap="round"/>`:''}
      ${блок(x1,y1)}${блок(x2,y2)}
    </g>`;
  }

  /* ---------- плащ на шесте и палатка из того же сукна (плащ-палатка); (x,y) — середина низа ---------- */
  const ХАКИ = (кл) => `<linearGradient id="${кл}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8a868"/><stop offset=".55" stop-color="#8a8a50"/><stop offset="1" stop-color="#5e5e34"/></linearGradient>`;
  function плащ(x,y,м){
    const кл=ид('хаки');
    return `<g transform="translate(${x} ${y}) scale(${м})">${ХАКИ(кл)}
      <ellipse cx="2" cy="1" rx="26" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-2.5" y="-100" width="5" height="100" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
      <rect x="-24" y="-84" width="48" height="4" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M-24 -82 Q0 -92 24 -82 L32 -10 Q20 -2 8 -8 Q0 -2 -8 -8 Q-20 -2 -32 -10 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-12 -80 Q-16 -40 -18 -8 M0 -84 Q2 -44 0 -8 M12 -80 Q18 -40 20 -8" stroke="#4a4a26" stroke-width="1.2" fill="none" opacity=".6"/>
      <path d="M-18 -78 Q-22 -44 -26 -12" stroke="#d0d090" stroke-width="2" fill="none" opacity=".55"/>
      <path d="M-11 -84 Q0 -108 11 -84 Q0 -76 -11 -84 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-5 -86 Q0 -98 5 -86" stroke="#3a3a1e" stroke-width="1" fill="none" opacity=".6"/>
      <circle cx="0" cy="-76" r="2.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
    </g>`;
  }
  function палатка(x,y,м){
    const кл=ид('хаки');
    return `<g transform="translate(${x} ${y}) scale(${м})">${ХАКИ(кл)}
      <ellipse cx="22" cy="1" rx="66" ry="5" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <line x1="0" y1="-64" x2="-56" y2="0" stroke="#d8c08a" stroke-width="1.2"/><line x1="58" y1="-54" x2="104" y2="0" stroke="#d8c08a" stroke-width="1.2"/>
      <rect x="-59" y="-5" width="3" height="7" fill="#6a4020"/><rect x="103" y="-5" width="3" height="7" fill="#6a4020"/>
      <path d="M0 -64 L58 -54 L86 0 L34 0 Z" fill="#5e5e34" stroke="${ОБВОД}" stroke-width="1.1"/>
      <path d="M18 -60 L56 0 M38 -57 L72 0" stroke="#3a3a1e" stroke-width=".8" opacity=".6"/>
      <path d="M-34 0 L0 -64 L34 0 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M-12 0 L0 -42 L12 0 Z" fill="#1e140a"/>
      <path d="M0 -42 L12 0 L22 0 Q14 -22 0 -42 Z" fill="#b8b878" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-24 -18 L-10 -44 M0 -64 L0 -42" stroke="#3a3a1e" stroke-width=".8" opacity=".55"/>
      <path d="M-28 -4 L-4 -50" stroke="#d8d8a0" stroke-width="2" opacity=".5"/>
      <rect x="-1.5" y="-72" width="3" height="10" fill="#6a4020"/><rect x="56.5" y="-61" width="3" height="9" fill="#6a4020"/>
      <circle cx="0" cy="-56" r="2.2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
    </g>`;
  }

  /* ---------- знамя-вексиллум: древко, перекладина с навершием, полотнище со складками и бахромой.
     (x,y) — середина перекладины; ш, в — полотнище; цвет — [светлый, тёмный] ---------- */
  function знамя(x,y,ш,в,цвет,опц){
    const о=опц||{}, кл=ид('знамя'), ц=цвет||['#c8402a','#7a1a0e'];
    return `<g>
      <linearGradient id="${кл}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ц[0]}"/><stop offset=".6" stop-color="${ц[0]}"/><stop offset="1" stop-color="${ц[1]}"/></linearGradient>
      ${о.древко===false?'':`<rect x="${f(x-2)}" y="${f(y-16)}" width="4" height="${f(в+(о.длина||70))}" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".6"/>
        <path d="M${f(x)} ${f(y-28)} l5 8 l-5 6 l-5 -6 z" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>`}
      <rect x="${f(x-ш/2-5)}" y="${f(y-3)}" width="${f(ш+10)}" height="5" rx="2.5" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".7"/>
      <circle cx="${f(x-ш/2-5)}" cy="${f(y-0.5)}" r="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/><circle cx="${f(x+ш/2+5)}" cy="${f(y-0.5)}" r="3" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
      <g>${ДВИЖ&&о.качка!==false?`<animateTransform attributeName="transform" type="skewX" values="0;1.6;0;-1.6;0" dur="5s" repeatCount="indefinite"/>`:''}
        <path d="M${f(x-ш/2)} ${f(y+2)} H${f(x+ш/2)} V${f(y+в)} Q${f(x+ш/4)} ${f(y+в+5)} ${f(x)} ${f(y+в)} Q${f(x-ш/4)} ${f(y+в-5)} ${f(x-ш/2)} ${f(y+в)} Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>
        <path d="M${f(x-ш*0.22)} ${f(y+4)} Q${f(x-ш*0.26)} ${f(y+в*0.5)} ${f(x-ш*0.2)} ${f(y+в-3)} M${f(x+ш*0.24)} ${f(y+4)} Q${f(x+ш*0.2)} ${f(y+в*0.5)} ${f(x+ш*0.26)} ${f(y+в)}" stroke="${ц[1]}" stroke-width="1.4" fill="none" opacity=".5"/>
        <rect x="${f(x-ш/2+3)}" y="${f(y+5)}" width="${f(ш-6)}" height="${f(в-10)}" fill="none" stroke="#f0c850" stroke-width="1.2" opacity=".85"/>
        ${Array.from({length:Math.floor(ш/5)},(_,k)=>`<line x1="${f(x-ш/2+2.5+k*5)}" y1="${f(y+в-1)}" x2="${f(x-ш/2+2.5+k*5)}" y2="${f(y+в+6)}" stroke="#f0c850" stroke-width="1.3"/>`).join('')}
        ${о.тело||''}
      </g>
    </g>`;
  }

  /* ---------- высотка университета: ступенчатая башня со шпилем и звездой, боковые крылья
     с башенками, ряды окон, часы, деревья у подножия. (x,y) — середина низа ---------- */
  function высотка(x,y,м,опц){
    const о=опц||{};
    const окна=(x0,y0,w,h,шаг,вш)=>{ let s2=''; for(let yy=y0+4;yy<y0+h-3;yy+=(вш||7)) for(let xx=x0+3;xx<x0+w-3;xx+=(шаг||5)) s2+=`<rect x="${f(xx)}" y="${f(yy)}" width="2" height="3.4" fill="${((xx*7+yy*3)|0)%5?'#5a6a86':'#ffe9a0'}"/>`; return s2; };
    const блок=(x0,y0,w,h)=>`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="${x0+w*0.62}" y="${y0}" width="${w*0.38}" height="${h}" fill="#8a7a5a" opacity=".22"/>
      <rect x="${x0-1.5}" y="${y0-2.5}" width="${w+3}" height="3" fill="#f6efe0" stroke="${ОБВОД}" stroke-width=".5"/>${окна(x0,y0,w,h)}`;
    const шпиль=(cx,y0,h)=>`<path d="M${cx-3} ${y0} L${cx} ${y0-h} L${cx+3} ${y0} Z" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="0" cy="1" rx="104" ry="5" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      ${блок(-100,-34,44,34)}${блок(56,-34,44,34)}
      ${блок(-84,-66,18,32)}${блок(66,-66,18,32)}${шпиль(-75,-68,18)}${шпиль(75,-68,18)}
      ${блок(-56,-52,112,52)}
      ${блок(-34,-96,68,44)}
      ${блок(-22,-136,44,40)}
      ${блок(-13,-160,26,24)}
      <circle cx="0" cy="-148" r="6" fill="#fffaf0" stroke="${ОБВОД}" stroke-width=".8"/><path d="M0 -148 V-152 M0 -148 H3" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="-7" y="-172" width="14" height="12" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-5 -172 L0 -214 L5 -172 Z" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M0 -224 l2 5 l5 0 l-4 3.4 l1.6 5 l-4.6 -3 l-4.6 3 l1.6 -5 l-4 -3.4 l5 0 z" fill="#ffd24a" stroke="#8a5a10" stroke-width=".6">${о.звезда===false?'':анЛин('opacity','1;0.6;1','2.4s')}</path>
      <rect x="-9" y="-22" width="18" height="22" rx="1" fill="#4a3420" stroke="${ОБВОД}" stroke-width=".7"/>
      ${[-46,-34,34,46].map(cx=>`<rect x="${cx-1.6}" y="-50" width="3.2" height="50" fill="url(#рм-колонна)"/>`).join('')}
      <rect x="-62" y="-4" width="124" height="4" fill="#f6efe0" stroke="${ОБВОД}" stroke-width=".5"/>
      ${[-112,-92,-70,70,92,112].map((cx,k)=>`<rect x="${cx-1.2}" y="-10" width="2.4" height="10" fill="#6a4a2a"/><circle cx="${cx}" cy="${-15-(k%2)*2}" r="${7+(k%2)}" fill="${k%2?'#4f8a4a':'#3f7a44'}" stroke="#1e3a24" stroke-width=".6"/><circle cx="${cx-2}" cy="${-18-(k%2)*2}" r="3" fill="#7ab06a" opacity=".8"/>`).join('')}
    </g>`;
  }

  /* ---------- плотина ГЭС: бетонная стена с контрфорсами, водосбросы с падающей водой, пена,
     дорога по гребню с фонарями (опц.огни — сколько горит), здание станции. (x,y) — левый низ ---------- */
  function плотина(x,y,ш,в,опц){
    const о=опц||{}, n=о.сбросов||4, огни=о.огни==null?0:о.огни, L=о.фонарей||4, верх=y-в, шаг=ш/(n+1);
    const сбросы=Array.from({length:n},(_,k)=>{ const cx=x+шаг*(k+1), w=шаг*0.42;
      return `<rect x="${f(cx-w/2)}" y="${f(верх+14)}" width="${f(w)}" height="${f(в-14)}" fill="#bfe4f8"/>
        <rect x="${f(cx-w/2)}" y="${f(верх+14)}" width="${f(w*0.3)}" height="${f(в-14)}" fill="#fff" opacity=".45"/>
        ${[0.25,0.5,0.75].map((t,q)=>`<line x1="${f(cx-w/2+w*t)}" y1="${f(верх+14)}" x2="${f(cx-w/2+w*t)}" y2="${f(y)}" stroke="#fff" stroke-width="1.6" stroke-dasharray="7 9" opacity=".9" data-декор="1">${анЛин('stroke-dashoffset','16;0',(0.5+q*0.12).toFixed(2)+'s')}</line>`).join('')}
        <rect x="${f(cx-w/2-2)}" y="${f(верх+8)}" width="${f(w+4)}" height="7" rx="2" fill="#5a6470" stroke="${ОБВОД}" stroke-width=".6"/>
        <ellipse cx="${f(cx)}" cy="${f(y+1)}" rx="${f(w*0.8)}" ry="5" fill="#fff" opacity=".85" data-декор="1">${анЛин('rx',`${f(w*0.6)};${f(w*0.95)};${f(w*0.6)}`,'1.3s')}</ellipse>`; }).join('');
    const опоры=Array.from({length:n+1},(_,k)=>{ const cx=x+шаг*(k+0.5);
      return `<path d="M${f(cx-5)} ${f(верх+14)} L${f(cx-9)} ${f(y)} H${f(cx+9)} L${f(cx+5)} ${f(верх+14)} Z" fill="#aab2ba" stroke="${ОБВОД}" stroke-width=".6"/><path d="M${f(cx)} ${f(верх+14)} L${f(cx+2)} ${f(y)} H${f(cx+9)} L${f(cx+5)} ${f(верх+14)} Z" fill="#6a7480" opacity=".5"/>`; }).join('');
    const фонари=Array.from({length:L},(_,k)=>{ const cx=x+ш*(k+0.5)/L, на=k<огни;
      return `<rect x="${f(cx-1)}" y="${f(верх-20)}" width="2" height="20" fill="#3a4450"/>
        ${на?`<circle cx="${f(cx)}" cy="${f(верх-23)}" r="13" fill="url(#рм-сияние)" data-декор="1">${анЛин('r','11;15;11','2s')}</circle>`:''}
        <circle cx="${f(cx)}" cy="${f(верх-23)}" r="4.4" fill="${на?'#ffe680':'#6a747e'}" stroke="${ОБВОД}" stroke-width=".8"/>`; }).join('');
    return `<g>
      <rect x="${f(x)}" y="${f(верх+6)}" width="${f(ш)}" height="${f(в-6)}" fill="#c4ccd4" stroke="${ОБВОД}" stroke-width="1"/>
      ${[0.3,0.55,0.8].map(t=>`<line x1="${f(x)}" y1="${f(верх+в*t)}" x2="${f(x+ш)}" y2="${f(верх+в*t)}" stroke="#8a949e" stroke-width=".6" opacity=".7"/>`).join('')}
      ${сбросы}${опоры}
      <rect x="${f(x-2)}" y="${f(верх)}" width="${f(ш+4)}" height="9" fill="#d8dee4" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="${f(x-2)}" y="${f(верх)}" width="${f(ш+4)}" height="2.4" fill="#fff" opacity=".6"/>
      ${Array.from({length:Math.floor(ш/10)},(_,k)=>`<line x1="${f(x+k*10+5)}" y1="${f(верх-5)}" x2="${f(x+k*10+5)}" y2="${f(верх)}" stroke="#3a4450" stroke-width=".8"/>`).join('')}
      <line x1="${f(x)}" y1="${f(верх-5)}" x2="${f(x+ш)}" y2="${f(верх-5)}" stroke="#3a4450" stroke-width="1"/>
      ${фонари}
    </g>`;
  }

  /* ---------- чертёж на песке: бороздка с тенью и светлой кромкой. d — путь;
     опц.рисуется — линия проводится один раз; опц.задержка, опц.толщ, опц.цвет ---------- */
  function бороздка(d,опц){
    const о=опц||{}, w=о.толщ||2.6, рис=о.рисуется&&ДВИЖ;
    const ан=рис?`<animate attributeName="stroke-dashoffset" from="1" to="0" begin="${f(о.задержка||0)}s" dur="${f(о.длит||0.9)}s" fill="freeze"/>`:'';
    const доп=рис?' pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"':'';
    return `<g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="${d}" stroke="#fff6d8" stroke-width="${f(w*0.55)}" opacity=".8" transform="translate(1 1.6)"${доп}>${ан}</path>
      <path d="${d}" stroke="${о.цвет||'#946c38'}" stroke-width="${f(w)}"${доп}>${ан}</path></g>`;
  }
  function кругПесок(cx,cy,r,опц){
    return бороздка(`M${f(cx-r)} ${f(cy)} a${f(r)} ${f(r)} 0 1 1 ${f(2*r)} 0 a${f(r)} ${f(r)} 0 1 1 ${f(-2*r)} 0`,опц);
  }
  /* ---------- прибой: вода от верха кадра до фронта y, пенная кромка дышит ---------- */
  function прибой(y,ш,опц){
    const о=опц||{}, верх=о.верх||0;
    let фронт=`M${ш+42} ${y}`; for(let x=ш+42;x>-42;x-=42) фронт+=` q-10.5 9 -21 0 t-21 0`;
    return `<g data-декор="1">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;-8 5;0 0" dur="3.4s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"/>`:''}
      <path d="${фронт} V${верх} H${ш+42} Z" fill="#e8d2a0" opacity=".55" transform="translate(0 9)"/>
      <path d="${фронт} V${верх} H${ш+42} Z" fill="url(#рм-море)"/>
      <path d="${фронт}" stroke="#bfe6fa" stroke-width="9" fill="none" opacity=".55" transform="translate(0 -5)"/>
      <path d="${фронт}" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round"/>
      <path d="${фронт}" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6" stroke-dasharray="10 14" transform="translate(6 -13)"/>
      ${Array.from({length:12},(_,k)=>`<circle cx="${(k*31+9)%ш}" cy="${f(y+2+(k%3)*2.4)}" r="${f(1+(k%3)*0.5)}" fill="#fff" opacity=".85"/>`).join('')}
    </g>`;
  }
  /* ---------- остракон: глиняный черепок для записи; (x,y) — центр, вид 0..2 — форма излома;
     опц.цвет — заливка поверх глины, опц.трещина ---------- */
  function черепок(x,y,м,вид,опц){
    const о=опц||{};
    const формы=['M-46 -14 L-30 -22 L8 -20 L40 -24 L48 -6 L44 16 L10 22 L-24 18 L-44 20 L-50 2 Z',
                 'M-48 -18 L-10 -22 L30 -18 L50 -10 L46 14 L20 22 L-18 20 L-46 14 Z',
                 'M-44 -20 L-4 -18 L26 -24 L48 -14 L50 12 L28 20 L-10 24 L-40 16 L-50 -4 Z'];
    const p=формы[(вид||0)%3];
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <path d="${p}" fill="#231a12" opacity=".3" transform="translate(3 4)" filter="url(#рм-мягко)"/>
      <path d="${p}" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="${p}" fill="${о.цвет||'#f4d8b0'}" opacity="${о.цвет?0.78:0.5}" transform="scale(.9)"/>
      <path d="M-38 -12 Q0 -17 40 -13" stroke="#fff" stroke-width="1.6" fill="none" opacity=".35"/>
      ${о.трещина?`<path d="M-8 -20 l6 12 l-7 9 l8 10 l-4 10" stroke="${ОБВОД}" stroke-width="1.4" fill="none"/>`:''}
    </g>`;
  }

  /* ---------- Мирто, девочка из Сиракуз: белый хитон с оранжевой каймой и поясом, тёмные волосы
     в узле с лентой, сандалии. поза: 'стоит' | 'машет' | 'ведёт' (рука вперёд, держит повод).
     Высота ~112 от подошв до макушки, как у юнги ---------- */
  function девочка(x,y,м,опц){
    const о=опц||{}, кл=ид('хит'), поза=о.поза||'стоит';
    const хитон='M-13 -76 Q0 -82 13 -76 L20 -15 Q0 -9 -20 -15 Z';
    const рука=(d,кисть)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="6" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="6" stroke-linecap="round" fill="none" opacity=".1"/>
      <circle cx="${кисть[0]}" cy="${кисть[1]}" r="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    const рукаЛ = поза==='машет' ? `<g>${крутить('0 -12 -72;-18 -12 -72;0 -12 -72','1.1s')}${рука('M-12 -72 q-14 -8 -18 -24',[-30,-97])}</g>` : рука('M-12 -72 q-8 14 -6 28',[-18,-43]);
    const рукаП = поза==='ведёт' ? рука('M12 -72 q12 8 24 4',[37,-68]) : рука('M12 -72 q8 14 6 28',[18,-43]);
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="18" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-9" y="-17" width="6" height="14" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="3" y="-17" width="6" height="14" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-12 -2 q0 -4 6 -4 q5 0 5 4 z M1 -2 q0 -4 6 -4 q5 0 5 4 z" fill="#8a5a2e" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-9 -8 h6 M3 -8 h6" stroke="#8a5a2e" stroke-width="1.4"/>
      <clipPath id="${кл}"><path d="${хитон}"/></clipPath>
      ${рукаЛ}
      <path d="${хитон}" fill="#fdf6ea" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})">
        <rect x="-22" y="-84" width="44" height="76" fill="url(#рм-складка)"/>
        <path d="M-6 -50 Q-8 -30 -10 -12 M4 -50 Q5 -30 8 -12 M-14 -48 Q-17 -30 -18 -14" stroke="#c8b898" stroke-width="1" fill="none"/>
        <path d="M-22 -19 Q0 -13 22 -19" stroke="#e07a2a" stroke-width="4.4" fill="none"/>
        <path d="M-22 -19 Q0 -13 22 -19" stroke="#fff4c0" stroke-width="1" fill="none" stroke-dasharray="2.4 2.4"/>
      </g>
      <path d="M-15 -54 Q0 -49 15 -54" stroke="#e07a2a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
      <path d="M2 -52 q3 8 1 14" stroke="#e07a2a" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M-10 -78 Q0 -70 10 -78" stroke="#c8b898" stroke-width="1.2" fill="none"/>
      <circle cx="-11" cy="-75" r="2.2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/><circle cx="11" cy="-75" r="2.2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
      ${рукаП}
      <rect x="-3.2" y="-83" width="6.4" height="6" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -95)">
        <circle cx="-5" cy="-17" r="7" fill="#3a2418" stroke="${ОБВОД}" stroke-width=".9"/>
        <path d="M-14 2 q-5 9 -1 17 M14 2 q5 9 1 17" stroke="#3a2418" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="-13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="13.5" ry="14.5" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-14 -1 q-3 -16 12 -17 q15 -2 17 11 q0 4 -1 7 q-3 -9 -9 -11 q-8 5 -19 10 z" fill="#3a2418" stroke="${ОБВОД}" stroke-width=".9"/>
        <path d="M-6 -13 q5 -4 12 -2" stroke="#7a5a40" stroke-width="1.2" fill="none" opacity=".8"/>
        <path d="M-13 -8 q13 -9 27 -2" stroke="#e07a2a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        ${лицо(Object.assign({глаза:'#5a3a1e'},о))}
      </g>
    </g>`;
  }

  /* ---------- ослик: серая шерсть, светлые брюхо и морда, длинные уши, тёмный «крест» на спине,
     красный недоуздок. поза: 'стоит' | 'идёт' (ноги шагают) | 'лежит' (прилёг) | 'упрямится'
     (мотает головой). опц.поклажа — попона и корзина с амфорами; опц.влево. (x,y) — середина у копыт ---------- */
  function ослик(x,y,м,опц){
    const о=опц||{}, кл=ид('осёл'), поза=о.поза||'стоит', леж=поза==='лежит', идёт=поза==='идёт'&&ДВИЖ;
    const нога=(nx,тём,фаза)=>`<g>${идёт?`<animateTransform attributeName="transform" type="rotate" values="${фаза?13:-13} ${nx+3.5} -34;${фаза?-13:13} ${nx+3.5} -34;${фаза?13:-13} ${nx+3.5} -34" dur="0.7s" repeatCount="indefinite"/>`:''}
      <rect x="${nx}" y="-38" width="7" height="34" rx="3" fill="${тём?'#6e665e':`url(#${кл})`}" stroke="${ОБВОД}" stroke-width=".9"/>
      <rect x="${nx-0.5}" y="-6" width="8" height="6" rx="2" fill="#2e2620" stroke="${ОБВОД}" stroke-width=".7"/></g>`;
    const ноги1 = леж ? '' : нога(-22,true,0)+нога(20,true,1);
    const ноги2 = леж ? `<ellipse cx="-18" cy="-5" rx="13" ry="5" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width=".9"/><ellipse cx="18" cy="-4" rx="13" ry="4.6" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width=".9"/>
        <rect x="26" y="-7" width="8" height="5" rx="2" fill="#2e2620"/><rect x="-10" y="-8" width="8" height="5" rx="2" fill="#2e2620"/>` : нога(-30,false,1)+нога(12,false,0);
    const голова=`<g>${ДВИЖ?(поза==='упрямится'?`<animateTransform attributeName="transform" type="rotate" values="-7 28 -60;7 28 -60;-7 28 -60" dur="0.5s" repeatCount="indefinite"/>`:`<animateTransform attributeName="transform" type="rotate" values="0 28 -60;3 28 -60;0 28 -60" dur="3.6s" repeatCount="indefinite"/>`):''}
        <path d="M10 -54 Q20 -68 30 -80 L46 -70 Q41 -54 31 -45 Q21 -40 12 -44 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>
        <path d="M14 -56 Q22 -72 31 -83" stroke="#3a3028" stroke-width="4.4" fill="none" stroke-dasharray="2.2 1.8"/>
        <path d="M42 -84 Q42 -108 50 -108 Q54 -96 49 -82 Z" fill="#7a726a" stroke="${ОБВОД}" stroke-width=".9"/>
        <g transform="rotate(16 42 -74)">
          <ellipse cx="43" cy="-75" rx="15" ry="10.5" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>
          <ellipse cx="55" cy="-74" rx="8.4" ry="8" fill="#ece4d6" stroke="${ОБВОД}" stroke-width="1"/>
          <ellipse cx="59" cy="-76" rx="1.3" ry="1.8" fill="#3a3028"/>
          <path d="M52 -69 q4 2.4 8 0" stroke="${ОБВОД}" stroke-width="1" fill="none" stroke-linecap="round"/>
          <path d="M47 -85 L48 -64" stroke="#b8321e" stroke-width="2.2"/><path d="M47.5 -84 Q38 -88 30 -82" stroke="#b8321e" stroke-width="2" fill="none"/>
          <circle cx="48" cy="-65" r="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".5"/>
          <ellipse cx="39" cy="-79" rx="3.4" ry="3.8" fill="#fff" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="39.8" cy="-78.6" r="2.2" fill="#2a1a0e"/><circle cx="39" cy="-79.6" r=".8" fill="#fff"/>
          <path d="M35 -84 q4 -2.4 8 0" stroke="#3a3028" stroke-width="1.2" fill="none" stroke-linecap="round"/>
        </g>
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 34 -82;-8 34 -82;0 34 -82;0 34 -82" keyTimes="0;0.08;0.16;1" dur="3.2s" repeatCount="indefinite"/>`:''}
          <path d="M31 -82 Q26 -108 35 -111 Q42 -98 39 -81 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
          <path d="M33 -86 Q31 -102 35 -106 Q38 -98 36 -86 Z" fill="#d8a8a0"/></g>
      </g>`;
    const поклажа=о.поклажа?`<path d="M-22 -60 Q-2 -66 16 -60 L18 -40 Q-2 -35 -24 -40 Z" fill="#b8321e" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-22 -43 Q-2 -38 17 -43" stroke="#f0c850" stroke-width="2" fill="none" stroke-dasharray="3 2"/>
      ${[-12,-3,6].map(ax=>`<rect x="${ax-2}" y="-64" width="4" height="9" rx="1.5" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width=".6"/><rect x="${ax-3.2}" y="-66" width="6.4" height="2.6" rx="1" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width=".5"/>`).join('')}
      <path d="M-19 -56 H13 L9 -30 H-15 Z" fill="#c8a058" stroke="${ОБВОД}" stroke-width="1"/>
      ${[-50,-44,-38].map(by=>`<line x1="-18" y1="${by}" x2="12" y2="${by}" stroke="#7a5a2a" stroke-width=".8"/>`).join('')}
      ${[-12,-6,0,6].map(bx=>`<line x1="${bx}" y1="-56" x2="${bx*0.85-0.5}" y2="-30" stroke="#7a5a2a" stroke-width=".8"/>`).join('')}
      <rect x="-20" y="-58" width="34" height="4" rx="2" fill="#a8803c" stroke="${ОБВОД}" stroke-width=".7"/>`:'';
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <linearGradient id="${кл}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8b0a6"/><stop offset=".6" stop-color="#9a9288"/><stop offset="1" stop-color="#746c64"/></linearGradient>
      <ellipse cx="2" cy="1" rx="${леж?46:40}" ry="4.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${ноги1}
      <g${леж?' transform="translate(0 22)"':''}>
        <path d="M-32 -48 Q-44 -42 -42 -26" stroke="#8a8278" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-42" cy="-23" rx="3.4" ry="5.4" fill="#3a3028"/>
        <ellipse cx="-3" cy="-44" rx="33" ry="17" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
        <ellipse cx="-3" cy="-35" rx="25" ry="7.4" fill="#e4dccf" opacity=".9"/>
        <path d="M-32 -54 Q-2 -63 22 -56" stroke="#4a4038" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M14 -59 q1 8 -2 14" stroke="#4a4038" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M-26 -56 Q-4 -62 14 -58" stroke="#fff" stroke-width="1.6" fill="none" opacity=".3"/>
        ${поклажа}
        ${леж?'':''}${голова}
      </g>
      ${ноги2}
    </g>`;
  }

  /* ---------- сова: бурое оперение, светлая грудка с пестринами, «уши», жёлтые глаза, которые
     моргают, голова чуть склоняется. опц.летит — крылья расправлены и машут; опц.ветвь — оливковая
     веточка в лапе. (x,y) — лапы (или низ тела в полёте) ---------- */
  function сова(x,y,м,опц){
    const о=опц||{}, кл=ид('сова'), лет=!!о.летит;
    const крыло=(зн)=> лет
      ? `<g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 ${зн*12} -28;${-зн*26} ${зн*12} -28;0 ${зн*12} -28" dur="0.5s" repeatCount="indefinite"/>`:''}
          <path d="M${зн*12} -34 Q${зн*40} -52 ${зн*60} -32 Q${зн*50} -28 ${зн*48} -20 Q${зн*40} -24 ${зн*36} -14 Q${зн*26} -22 ${зн*12} -14 Z" fill="#6a4a24" stroke="${ОБВОД}" stroke-width="1"/>
          <path d="M${зн*20} -32 Q${зн*36} -40 ${зн*50} -30 M${зн*22} -24 Q${зн*32} -30 ${зн*42} -22" stroke="#c8a060" stroke-width="1.2" fill="none"/></g>`
      : `<path d="M${зн*14} -38 Q${зн*25} -22 ${зн*14} -3 Q${зн*7} -16 ${зн*11} -36 Z" fill="#6a4a24" stroke="${ОБВОД}" stroke-width="1"/>
         <path d="M${зн*15} -28 q${зн*3} 8 ${зн*0} 16" stroke="#c8a060" stroke-width="1" fill="none"/>`;
    const глаз=(ex)=>`<circle cx="${ex}" cy="-46" r="9" fill="#f4e6c4" stroke="${ОБВОД}" stroke-width=".8"/>
      <ellipse cx="${ex}" cy="-46" rx="6.2" ry="6.2" fill="#ffd24a" stroke="${ОБВОД}" stroke-width=".8">${ДВИЖ?`<animate attributeName="ry" values="6.2;6.2;0.6;6.2" keyTimes="0;0.9;0.95;1" dur="4.4s" repeatCount="indefinite"/>`:''}</ellipse>
      <ellipse cx="${ex}" cy="-46" rx="3.2" ry="3.2" fill="#1a120a">${ДВИЖ?`<animate attributeName="ry" values="3.2;3.2;0.3;3.2" keyTimes="0;0.9;0.95;1" dur="4.4s" repeatCount="indefinite"/>`:''}</ellipse>
      <circle cx="${ex-1.4}" cy="-47.6" r="1.1" fill="#fff"/>`;
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <radialGradient id="${кл}" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="#c89a5a"/><stop offset="1" stop-color="#6e4a22"/></radialGradient>
      ${лет?'':`<ellipse cx="1" cy="1" rx="16" ry="3" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>`}
      ${крыло(-1)}${крыло(1)}
      <ellipse cx="0" cy="-22" rx="17" ry="22" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>
      <ellipse cx="0" cy="-17" rx="11" ry="15" fill="#ecd8ac"/>
      ${[[-5,-24],[1,-24],[6,-23],[-3,-17],[3,-17],[-6,-11],[0,-10],[5,-11]].map(([fx,fy])=>`<path d="M${fx-2} ${fy} l2 3 l2 -3" stroke="#8a6232" stroke-width="1.1" fill="none" stroke-linecap="round"/>`).join('')}
      ${лет?'':`<path d="M-7 -2 l-3 4 M-7 -2 v5 M-7 -2 l3 4 M7 -2 l-3 4 M7 -2 v5 M7 -2 l3 4" stroke="#e89a2a" stroke-width="1.8" stroke-linecap="round"/>`}
      ${о.ветвь?`<path d="M8 0 Q20 -8 28 -22" stroke="#5a7a3a" stroke-width="1.6" fill="none"/>${[[14,-5],[19,-11],[24,-17],[28,-23]].map(([lx,ly],k)=>`<ellipse cx="${lx}" cy="${ly}" rx="5" ry="2" fill="${k%2?'#7aa04a':'#5a8a3a'}" stroke="#2e4a20" stroke-width=".5" transform="rotate(${k%2?-70:-10} ${lx} ${ly})"/>`).join('')}<circle cx="22" cy="-9" r="2" fill="#3a2a4a"/>`:''}
      <g>${ДВИЖ&&!лет?`<animateTransform attributeName="transform" type="rotate" values="0 0 -36;7 0 -36;0 0 -36;-5 0 -36;0 0 -36" dur="6s" repeatCount="indefinite"/>`:''}
        <path d="M-17 -52 L-20 -68 L-7 -58 Z M17 -52 L20 -68 L7 -58 Z" fill="#6a4a24" stroke="${ОБВОД}" stroke-width="1" stroke-linejoin="round"/>
        <ellipse cx="0" cy="-46" rx="19.5" ry="15.5" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>
        ${глаз(-8.4)}${глаз(8.4)}
        <path d="M-3 -44 L0 -36 L3 -44 Z" fill="#e89a2a" stroke="${ОБВОД}" stroke-width=".8" stroke-linejoin="round"/>
        <path d="M-6 -59 Q0 -55 6 -59" stroke="#c89a5a" stroke-width="1.4" fill="none"/>
      </g>
    </g>`;
  }

  /* ---------- белёный домик: стена со светом и тенью, черепичная крыша, окно с синими ставнями,
     горшок с цветком, дверь. опц.дверь: 0 — закрыта, 0.35 — приоткрыта, 1 — настежь.
     (x,y) — середина низа ---------- */
  function домик(x,y,м,опц){
    const о=опц||{}, д=о.дверь||0, w=20*(1-д*0.85);
    return `<g transform="translate(${x} ${y}) scale(${м})">
      <ellipse cx="4" cy="1" rx="50" ry="4.4" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      <rect x="-44" y="-58" width="88" height="58" fill="#fbf5e6" stroke="${ОБВОД}" stroke-width="1.2"/>
      <rect x="18" y="-58" width="26" height="58" fill="#c8b898" opacity=".45"/>
      <rect x="-44" y="-8" width="88" height="8" fill="#d8c8a4" opacity=".7"/>
      <path d="M-50 -58 L-40 -76 H40 L50 -58 Z" fill="#c8603a" stroke="${ОБВОД}" stroke-width="1.1"/>
      ${Array.from({length:9},(_,k)=>`<path d="M${-44+k*10} -58 l2.4 -18" stroke="#8a3a1a" stroke-width=".8" opacity=".7"/>`).join('')}
      <path d="M-48 -62 H48" stroke="#e8865a" stroke-width="1.6" opacity=".8"/>
      <rect x="-12" y="-38" width="24" height="38" fill="#e8dcc0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-10" y="-36" width="20" height="36" fill="#1e140a"/>
      ${д>0&&о.внутри?`<g>${о.внутри}</g>`:''}
      ${д>0?`<rect x="${f(-10+w)}" y="-36" width="${f(20-w)}" height="36" fill="#ffd890" opacity=".35"/>`:''}
      <path d="M-10 -36 L${f(-10+w)} ${f(-36+д*3)} V${f(-д*2)} L-10 0 Z" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".9"/>
      ${w>7?`<line x1="${f(-10+w/2)}" y1="${f(-35+д*1.5)}" x2="${f(-10+w/2)}" y2="-1" stroke="${ОБВОД}" stroke-width=".6" opacity=".5"/><circle cx="${f(-10+w-3)}" cy="-18" r="1.4" fill="url(#рм-латунь)"/>`:''}
      <rect x="-36" y="-44" width="16" height="16" fill="#3a5a7a" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-28 -44 v16 M-36 -36 h16" stroke="#fbf5e6" stroke-width="1.2"/>
      <rect x="-41" y="-45" width="5" height="18" fill="#3a6ab8" stroke="${ОБВОД}" stroke-width=".6"/><rect x="-20" y="-45" width="5" height="18" fill="#3a6ab8" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M26 -6 h10 l-2 6 h-6 z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M31 -6 q-4 -8 -1 -14 M31 -6 q4 -6 2 -12" stroke="#4a8a3a" stroke-width="1.4" fill="none"/>
      <circle cx="30" cy="-21" r="3" fill="#e0457a"/><circle cx="34" cy="-18" r="2.6" fill="#f08a3a"/>
    </g>`;
  }

  /* ---------- язык пламени: три слоя, дрожит; (x,y) — основание, сила 0..1.6 ---------- */
  function пламя(x,y,сила){
    const k=Math.max(0,сила==null?1:сила);
    if(k<=0.05) return `<g transform="translate(${f(x)} ${f(y)})" data-декор="1"><path d="M0 -2 q-5 -8 0 -16 q5 -8 0 -16" stroke="#8a8a8a" stroke-width="2" fill="none" opacity=".6" stroke-linecap="round">${анЛин('opacity','0.6;0.15;0.6','2.4s')}</path></g>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(k)})">
      <circle cx="0" cy="-14" r="26" fill="url(#рм-сияние)" opacity=".85" data-декор="1">${анЛин('r','23;29;23','1.1s')}</circle>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="scale" values="1 1;0.92 1.1;1.06 0.94;1 1" dur="0.7s" repeatCount="indefinite"/>`:''}
        <path d="M0 0 Q-13 -8 -9 -20 Q-7 -27 -2 -30 Q-3 -22 2 -20 Q0 -32 8 -40 Q7 -30 12 -22 Q15 -10 0 0 Z" fill="#f0642a" stroke="#a82a0e" stroke-width=".9" stroke-linejoin="round"/>
        <path d="M0 -1 Q-8 -8 -5 -17 Q-3 -22 1 -24 Q1 -18 5 -18 Q5 -24 7 -28 Q10 -18 9 -12 Q8 -5 0 -1 Z" fill="#ffb02a"/>
        <path d="M1 -2 Q-4 -7 -2 -13 Q1 -16 3 -14 Q6 -10 1 -2 Z" fill="#fff2a0"/>
      </g></g>`;
  }
  /* ---------- факел: деревянная рукоять, бронзовая чаша, пламя; опц.кольцо — бронзовое кольцо
     с надписью на рукояти. (x,y) — низ рукояти ---------- */
  function факел(x,y,м,сила,опц){
    const о=опц||{};
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <path d="M-2.4 0 L-3.6 -26 H3.6 L2.4 0 Z" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-7 -34 Q0 -30 7 -34 L4 -25 H-4 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="-7.6" y="-36.4" width="15.2" height="3.4" rx="1.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
      ${о.кольцо?`<rect x="-4.6" y="-17" width="9.2" height="6" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>`:''}
      ${пламя(0,-36,сила==null?1:сила)}
    </g>`;
  }
  /* ---------- Никон, бегун-факелоносец: короткий алый хитон с золотой каймой, белая повязка
     победителя, сандалии с ремешками, в поднятой руке факел. поза: 'стоит' | 'бежит'.
     опц.сила — пламя факела (0 — погас), опц.факел:false — без факела, опц.кольцо. Высота ~112 ---------- */
  function бегун(x,y,м,опц){
    const о=опц||{}, кл=ид('бегун'), беж=(о.поза||'стоит')==='бежит';
    const кожа=(d,w)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".1"/>`;
    const ступня=(fx,fy,угол)=>`<g transform="translate(${fx} ${fy}) rotate(${угол})"><path d="M-5 0 q0 -5 6 -5 q6 0 7 5 z" fill="#8a5a2e" stroke="${ОБВОД}" stroke-width=".9"/></g>`;
    const ноги = беж
      ? `${кожа('M-4 -42 L-17 -27 L-30 -20',7)}${ступня(-32,-16,-40)}${кожа('M4 -42 L13 -24 L8 -5',7)}${ступня(9,-1,0)}<path d="M9 -14 l6 -2 M10 -9 l6 -1" stroke="#8a5a2e" stroke-width="1.2"/>`
      : `${кожа('M-6 -42 L-7 -5',7)}${ступня(-7,-1,0)}${кожа('M6 -42 L7 -5',7)}${ступня(8,-1,0)}<path d="M-10 -12 h6 M4 -12 h6 M-10 -7 h6 M4 -7 h6" stroke="#8a5a2e" stroke-width="1.2"/>`;
    const хитон='M-14 -76 Q0 -82 14 -76 L18 -40 Q0 -34 -18 -40 Z';
    const рукаЛ = беж ? кожа('M-12 -72 L-24 -62 L-20 -50',6)+`<circle cx="-20" cy="-49" r="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`
                      : кожа('M-12 -72 q-8 14 -6 28',6)+`<circle cx="-18" cy="-43" r="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    const сФакелом=о.факел!==false;
    const рукаП = сФакелом ? `${факел(27,-88,0.78,о.сила==null?1:о.сила,{кольцо:о.кольцо})}${кожа('M12 -72 L24 -78 L27 -96',6)}<circle cx="27" cy="-97" r="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`
                           : кожа('M12 -72 q8 14 6 28',6)+`<circle cx="18" cy="-43" r="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="-4" cy="1" rx="${беж?26:18}" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <g>${беж&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="0.5s" repeatCount="indefinite"/>`:''}
        <g${беж?' transform="rotate(8 0 -40)"':''}>
        ${ноги}
        <clipPath id="${кл}"><path d="${хитон}"/></clipPath>
        ${рукаЛ}
        <path d="${хитон}" fill="${о.хитон||'#c8402a'}" stroke="${ОБВОД}" stroke-width="1.3"/>
        <g clip-path="url(#${кл})"><rect x="-20" y="-84" width="40" height="52" fill="url(#рм-складка)"/>
          <path d="M-5 -56 Q-7 -46 -8 -38 M5 -56 Q6 -46 8 -38" stroke="#2a1a12" stroke-width="1" fill="none" opacity=".45"/>
          <path d="M-20 -43 Q0 -37 20 -43" stroke="#f0c850" stroke-width="3.4" fill="none"/></g>
        <path d="M-15 -58 Q0 -54 15 -58" stroke="#fffaf0" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M-10 -78 Q0 -69 10 -78" stroke="#2a1a12" stroke-width="1.2" fill="none" opacity=".6"/>
        ${рукаП}
        <rect x="-3.4" y="-83" width="6.8" height="6" fill="url(#рм-кожа)"/>
        <g transform="translate(0 -95)">
          <ellipse cx="-13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
          <ellipse cx="0" cy="0" rx="13.5" ry="14.5" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
          <path d="M-14 -2 q-3 -15 11 -17 q14 -3 17 9 q1 4 0 8 q-3 -7 -7 -8 q-3 3 -7 1 q-4 3 -8 1 q-3 1 -6 6 z" fill="${о.волосы||'#5a3a1e'}" stroke="${ОБВОД}" stroke-width=".9"/>
          ${[[-8,-13],[-2,-16],[5,-15],[10,-11]].map(([hx,hy])=>`<path d="M${hx} ${hy} q3 -3 5 0" stroke="#8a6238" stroke-width="1.2" fill="none"/>`).join('')}
          <path d="M-13.4 -7 q13 -8 27 -1" stroke="#fffaf0" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M-13 -6 q-6 2 -8 9 M-13 -5 q-3 5 -3 11" stroke="#fffaf0" stroke-width="2" fill="none" stroke-linecap="round"/>
          ${лицо(Object.assign({глаза:'#4a3a26'},о))}
        </g></g>
      </g>
    </g>`;
  }

  /* ---------- коза Зоя: белая, рога назад, бородка, розовое вымя, бубенчик; жуёт.
     опц.влево; (x,y) — середина у копыт ---------- */
  function коза(x,y,м,опц){
    const о=опц||{};
    const нога=(nx,тём)=>`<rect x="${nx}" y="-26" width="4.6" height="24" rx="2" fill="${тём?'#d0c8b8':'#fbf8f0'}" stroke="${ОБВОД}" stroke-width=".8"/><rect x="${nx-0.4}" y="-4" width="5.4" height="4" rx="1.4" fill="#3a3028"/>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="30" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${нога(-17,true)}${нога(13,true)}
      <path d="M-25 -40 q-7 -6 -4 -12" stroke="#fbf8f0" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-25 -40 q-7 -6 -4 -12" stroke="${ОБВОД}" stroke-width=".8" fill="none" opacity=".5"/>
      <ellipse cx="-2" cy="-34" rx="25" ry="13" fill="#fbf8f0" stroke="${ОБВОД}" stroke-width="1.1"/>
      <ellipse cx="-2" cy="-28" rx="19" ry="5" fill="#e0d8c8" opacity=".8"/>
      <path d="M-18 -42 q6 -4 12 -2 M-4 -45 q6 -3 12 0" stroke="#d8d0c0" stroke-width="1.2" fill="none"/>
      <ellipse cx="-13" cy="-21" rx="7" ry="5.4" fill="#f4b0a8" stroke="${ОБВОД}" stroke-width=".8"/><path d="M-16 -17 v3 M-11 -17 v3" stroke="#d8867a" stroke-width="1.6" stroke-linecap="round"/>
      ${нога(-24,false)}${нога(7,false)}
      <path d="M14 -40 Q20 -52 26 -58 L36 -52 Q30 -42 22 -32 Z" fill="#fbf8f0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M21 -40 q6 3 10 -2" stroke="#b8321e" stroke-width="2.4" fill="none"/><circle cx="26" cy="-37" r="2.6" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".6"/>
      <path d="M27 -66 Q18 -82 8 -80 Q16 -76 21 -64 Z" fill="#c8b890" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M31 -66 Q26 -84 16 -86 Q24 -80 27 -65 Z" fill="#e0d2a8" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M24 -62 Q14 -64 12 -58 Q18 -56 25 -58 Z" fill="#f4e8e0" stroke="${ОБВОД}" stroke-width=".8"/>
      <g transform="rotate(14 32 -58)">
        <ellipse cx="33" cy="-59" rx="11" ry="8" fill="#fbf8f0" stroke="${ОБВОД}" stroke-width="1"/>
        <ellipse cx="42" cy="-57" rx="5.6" ry="5" fill="#f4e0d8" stroke="${ОБВОД}" stroke-width=".9"/>
        <circle cx="45" cy="-58" r=".9" fill="#3a3028"/>
        <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 1.6;0 0" dur="0.8s" repeatCount="indefinite"/>`:''}<path d="M38 -53 q4 2.4 7 0" stroke="${ОБВОД}" stroke-width="1" fill="none" stroke-linecap="round"/>
          <path d="M37 -51 q1 9 -2 13 q-2 -5 -2 -12 z" fill="#f0ece4" stroke="${ОБВОД}" stroke-width=".7"/></g>
        <ellipse cx="31" cy="-62" rx="3" ry="2.6" fill="#ffd24a" stroke="${ОБВОД}" stroke-width=".7"/><rect x="29.2" y="-62.8" width="3.6" height="1.6" rx=".8" fill="#1a120a"/>
      </g>
    </g>`;
  }

  /* ---------- сеятель, дед Деметрий: соломенная шляпа, короткая седая борода, бурый хитон до колен,
     сума через плечо; рука разбрасывает зёрна. опц.сеет:false — рука опущена. Высота ~112 ---------- */
  function сеятель(x,y,м,опц){
    const о=опц||{}, кл=ид('сеятель'), сеет=о.сеет!==false;
    const тело='M-16 -78 Q0 -84 16 -78 L20 -30 Q0 -24 -20 -30 Z';
    const кожа=(d)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="6.4" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="6.4" stroke-linecap="round" fill="none" opacity=".12"/>`;
    const зёрна=сеет&&ДВИЖ?Array.from({length:6},(_,k)=>`<circle r="1.5" fill="#c89a3a" stroke="#7a5a1a" stroke-width=".4" opacity="0"><animateMotion path="M36 -66 Q${52+k*5} ${-86+k*4} ${58+k*7} ${-6}" dur="1.6s" begin="${(k*0.26).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="1.6s" begin="${(k*0.26).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')
      : сеет?[[46,-40],[54,-24],[62,-10],[50,-8]].map(([sx,sy])=>`<circle cx="${sx}" cy="${sy}" r="1.5" fill="#c89a3a"/>`).join(''):'';
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="20" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-10" y="-32" width="7" height="29" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="3" y="-32" width="7" height="29" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-13 -2 q0 -5 7 -5 q6 0 6 5 z M1 -2 q0 -5 7 -5 q6 0 6 5 z" fill="#6a4a2a" stroke="${ОБВОД}" stroke-width=".9"/>
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      ${кожа('M-14 -74 q-9 14 -5 26')}<circle cx="-19" cy="-47" r="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="${тело}" fill="#a87a4a" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})"><rect x="-22" y="-86" width="44" height="64" fill="url(#рм-складка)"/>
        <path d="M-6 -60 Q-8 -44 -10 -30 M6 -60 Q8 -44 11 -30" stroke="#6a4a24" stroke-width="1" fill="none"/></g>
      <path d="M-15 -78 L14 -50" stroke="#6a4a2a" stroke-width="3"/>
      <path d="M4 -58 q14 -4 18 8 q-2 14 -14 14 q-10 -4 -4 -22 z" fill="#d8c08a" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M8 -54 q8 -2 12 4" stroke="#a88a4a" stroke-width="1" fill="none"/>
      <path d="M-17 -56 Q0 -51 17 -56" stroke="#5a3a1e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <g>${сеет&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 14 -74;-26 14 -74;0 14 -74" dur="1.6s" repeatCount="indefinite"/>`:''}
        ${кожа(сеет?'M14 -74 q12 0 22 8':'M14 -74 q9 14 5 26')}<circle cx="${сеет?37:19}" cy="${сеет?-65:-47}" r="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/></g>
      ${зёрна}
      <rect x="-3.6" y="-85" width="7.2" height="6" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -97)">
        <ellipse cx="0" cy="0" rx="13.5" ry="14.5" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-12 3 q-1 13 12 15 q13 -2 12 -15 q-5 7 -12 7 q-7 0 -12 -7 z" fill="#f0ece4" stroke="${ОБВОД}" stroke-width=".9"/>
        ${лицо(Object.assign({глаза:'#5a4a3a'},о))}
        <path d="M-6 6.4 q3 -2.4 6 0 q3 -2.4 6 0" stroke="#d8d2c6" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <ellipse cx="0" cy="-10" rx="25" ry="5.4" fill="#e8c878" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-12 -11 Q-10 -25 0 -26 Q10 -25 12 -11 Z" fill="#f0d48a" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-12 -12 Q0 -8 12 -12" stroke="#a0200e" stroke-width="2.4" fill="none"/>
        <path d="M-22 -10 q10 3 20 2 M4 -8 q10 0 18 -2" stroke="#b89a4a" stroke-width=".8" fill="none"/>
      </g>
    </g>`;
  }

  /* ---------- клепсидра, водяные часы: верхний глиняный сосуд с носиком на бронзовой треноге, капли,
     нижний стеклянный цилиндр с рисками; уровень 0..1 — сколько воды осталось ВВЕРХУ (времени).
     (x,y) — середина низа ---------- */
  function клепсидра(x,y,м,уровень){
    const u=Math.max(0,Math.min(1,уровень==null?1:уровень)), низ=1-u;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <ellipse cx="0" cy="1" rx="26" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-20 0 L-12 -58 M20 0 L12 -58 M0 -4 V-54" stroke="#7a4a20" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="-16" y="-60" width="32" height="4" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
      <path d="M-15 -60 Q-20 -76 -13 -88 H13 Q20 -76 15 -60 Z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-15" y="-92" width="30" height="5" rx="2" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-12 -${f(62+24*u)} H12 L14 -62 H-14 Z" fill="#5aa8e0" opacity=".85"/>
      <path d="M-13 -74 q13 -4 26 0" stroke="#2a1a0a" stroke-width="1.6" fill="none" opacity=".5"/>
      <path d="M-2 -60 h4 l-1 5 h-2 z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".5"/>
      ${u>0.02?`<circle cx="0" cy="-52" r="1.7" fill="#8ccaf0" data-декор="1">${ДВИЖ?`<animate attributeName="cy" values="-54;-${f(8+30*низ)}" dur="0.9s" repeatCount="indefinite"/>`:''}</circle>`:''}
      <rect x="-11" y="-40" width="22" height="38" rx="3" fill="#dff2ff" opacity=".35" stroke="#8ab0c8" stroke-width="1.1"/>
      <rect x="-10" y="${f(-3-34*низ)}" width="20" height="${f(34*низ)}" rx="2" fill="#5aa8e0" opacity=".85"/>
      ${[0.25,0.5,0.75].map(t=>`<line x1="5" y1="${f(-3-34*t)}" x2="10" y2="${f(-3-34*t)}" stroke="#3a5a7a" stroke-width=".9"/>`).join('')}
      <rect x="-8.6" y="-38" width="3" height="32" rx="1.5" fill="#fff" opacity=".4"/>
      <rect x="-13" y="-3" width="26" height="4" rx="2" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".7"/>
    </g>`;
  }

  /* ---------- жертвенник с чашей огня: мраморный постамент, бронзовая чаша; сила — пламя
     (0 — только дымок). (x,y) — середина низа ---------- */
  function жертвенник(x,y,м,сила){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <ellipse cx="2" cy="1" rx="26" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-20" y="-8" width="40" height="8" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-14 -8 L-11 -44 H11 L14 -8 Z" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M4 -44 L6 -8 H14 L11 -44 Z" fill="#8a7a5a" opacity=".25"/>
      <path d="M-8 -34 h16 M-8 -28 h16" stroke="#a89a7c" stroke-width=".8"/>
      <rect x="-16" y="-49" width="32" height="6" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
      <path d="M-20 -58 Q0 -46 20 -58 L14 -49 H-14 Z" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-21" y="-61" width="42" height="4" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".7"/>
      ${пламя(0,-60,сила==null?1.3:сила)}
    </g>`;
  }

  /* ---------- плод с рынка: 'арбуз' | 'дыня' | 'лимон' | 'яблоко' | 'сыр' | 'хлеб' | 'тыква' | 'апельсин'.
     (x,y) — центр, r — полуширина. опц.разрезан — две половинки срезом к зрителю;
     опц.режется — половинки разъезжаются один раз ---------- */
  function плод(вид,x,y,r,опц){
    const о=опц||{}, кл=ид('плод');
    const В={
      арбуз:{ц:['#5aa04a','#1e5a24'],мякоть:'#e8453a',корка:'#2e7a34',бел:'#e8f4d0',rx:1.15,ry:0.9},
      дыня:{ц:['#f4dc7a','#c89a2a'],мякоть:'#f8c878',корка:'#d8b040',бел:'#fbe8b0',rx:1.2,ry:0.85},
      лимон:{ц:['#fff07a','#d8b020'],мякоть:'#fbf0a0',корка:'#e8c830',бел:'#fffbe0',rx:1.15,ry:0.82},
      яблоко:{ц:['#f07a5a','#a82a1a'],мякоть:'#fbf6e0',корка:'#c8402a',бел:'#fbf6e0',rx:1,ry:0.95},
      сыр:{ц:['#f8dc7a','#d8a83a'],мякоть:'#f4d060',корка:'#c8922a',бел:'#f4d060',rx:1.2,ry:0.62},
      хлеб:{ц:['#d8a058','#8a5a24'],мякоть:'#f4e6c0',корка:'#9a6a2e',бел:'#f4e6c0',rx:1.2,ry:0.7},
      тыква:{ц:['#f09a3a','#b85a14'],мякоть:'#f8b858',корка:'#c86a1a',бел:'#fbd890',rx:1.2,ry:0.9},
      апельсин:{ц:['#ffb040','#d8701a'],мякоть:'#ffc060',корка:'#e8801a',бел:'#fff0d0',rx:1,ry:1}
    }[вид]||{ц:['#ccc','#888'],мякоть:'#eee',корка:'#888',бел:'#fff',rx:1,ry:1};
    const rx=r*В.rx, ry=r*В.ry;
    const тень=`<ellipse cx="2" cy="${f(ry*0.98)}" rx="${f(rx*0.9)}" ry="${f(r*0.16)}" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>`;
    const целый=()=>{ let дет='';
      if(вид==='арбуз') дет=[-0.6,-0.2,0.2,0.6].map(t=>`<path d="M${f(rx*t)} ${f(-ry*Math.sqrt(1-t*t))} Q${f(rx*t*1.3)} 0 ${f(rx*t)} ${f(ry*Math.sqrt(1-t*t))}" stroke="#1e4a20" stroke-width="${f(r*0.12)}" fill="none" opacity=".75"/>`).join('');
      if(вид==='дыня') дет=[-0.5,0,0.5].map(t=>`<path d="M${f(-rx*0.9)} ${f(ry*t*0.8)} Q0 ${f(ry*t*1.3)} ${f(rx*0.9)} ${f(ry*t*0.8)}" stroke="#b88a2a" stroke-width=".9" fill="none" opacity=".6"/>`).join('')+`<circle cx="${f(rx)}" cy="0" r="${f(r*0.1)}" fill="#8a6a2a"/>`;
      if(вид==='лимон') дет=`<path d="M${f(-rx)} 0 q${f(-r*0.2)} ${f(-r*0.06)} ${f(-r*0.24)} 0 M${f(rx)} 0 q${f(r*0.2)} ${f(-r*0.06)} ${f(r*0.24)} 0" stroke="#d8b020" stroke-width="${f(r*0.22)}" stroke-linecap="round"/>`;
      if(вид==='яблоко') дет=`<path d="M0 ${f(-ry*0.9)} q2 ${f(-r*0.4)} 5 ${f(-r*0.55)}" stroke="#5a3410" stroke-width="2" fill="none"/><ellipse cx="${f(r*0.5)}" cy="${f(-ry*1.15)}" rx="${f(r*0.4)}" ry="${f(r*0.16)}" fill="#6ab04a" stroke="${ОБВОД}" stroke-width=".6" transform="rotate(-20 ${f(r*0.5)} ${f(-ry*1.15)})"/>`;
      if(вид==='сыр') дет=`<path d="M${f(-rx)} ${f(-ry*0.2)} Q0 ${f(ry*0.5)} ${f(rx)} ${f(-ry*0.2)}" stroke="#c8922a" stroke-width="1" fill="none"/>${[[-0.4,0.3],[0.2,0.5],[0.55,0.2]].map(([a,b])=>`<ellipse cx="${f(rx*a)}" cy="${f(ry*b)}" rx="${f(r*0.1)}" ry="${f(r*0.07)}" fill="#c8922a" opacity=".7"/>`).join('')}`;
      if(вид==='хлеб') дет=[-0.4,0,0.4].map(t=>`<path d="M${f(rx*t-r*0.18)} ${f(-ry*0.55)} l${f(r*0.36)} ${f(ry*0.5)}" stroke="#f4dcae" stroke-width="${f(r*0.12)}" stroke-linecap="round"/>`).join('');
      if(вид==='тыква') дет=[-0.5,0,0.5].map(t=>`<path d="M${f(rx*t)} ${f(-ry*0.9)} Q${f(rx*t*1.5)} 0 ${f(rx*t)} ${f(ry*0.9)}" stroke="#a84a10" stroke-width="1.2" fill="none" opacity=".7"/>`).join('')+`<rect x="${f(-r*0.1)}" y="${f(-ry*1.2)}" width="${f(r*0.2)}" height="${f(r*0.34)}" rx="2" fill="#5a7a3a" stroke="${ОБВОД}" stroke-width=".6"/>`;
      if(вид==='апельсин') дет=`<circle cx="0" cy="${f(-ry*0.92)}" r="${f(r*0.1)}" fill="#5a7a3a"/>`;
      return `<ellipse cx="0" cy="0" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1"/>${дет}
        <ellipse cx="${f(-rx*0.4)}" cy="${f(-ry*0.45)}" rx="${f(rx*0.2)}" ry="${f(ry*0.14)}" fill="#fff" opacity=".45" transform="rotate(-24 ${f(-rx*0.4)} ${f(-ry*0.45)})"/>`; };
    const срез=(зн)=>{ const qx=rx*0.62, qy=ry*0.96; let дет='';
      if(вид==='арбуз') дет=[[-0.3,-0.2],[0.2,-0.35],[0.35,0.2],[-0.15,0.35],[0,0]].map(([a,b])=>`<ellipse cx="${f(qx*a)}" cy="${f(qy*b)}" rx="${f(r*0.06)}" ry="${f(r*0.1)}" fill="#2a1a12"/>`).join('');
      if(вид==='дыня'||вид==='тыква') дет=`<ellipse cx="0" cy="0" rx="${f(qx*0.4)}" ry="${f(qy*0.5)}" fill="#fbe8b0" stroke="#d8a040" stroke-width=".8"/>${[[-0.12,-0.2],[0.12,0],[-0.1,0.22]].map(([a,b])=>`<ellipse cx="${f(qx*a)}" cy="${f(qy*b)}" rx="${f(r*0.05)}" ry="${f(r*0.09)}" fill="#e8c070"/>`).join('')}`;
      if(вид==='лимон'||вид==='апельсин') дет=Array.from({length:8},(_,k)=>{ const a=k*Math.PI/4; return `<line x1="0" y1="0" x2="${f(qx*0.8*Math.cos(a))}" y2="${f(qy*0.8*Math.sin(a))}" stroke="${В.бел}" stroke-width="1.2"/>`; }).join('')+`<circle r="${f(r*0.08)}" fill="${В.бел}"/>`;
      if(вид==='яблоко') дет=`<path d="M0 ${f(-qy*0.35)} q${f(qx*0.4)} ${f(qy*0.35)} 0 ${f(qy*0.7)} q${f(-qx*0.4)} ${f(-qy*0.35)} 0 ${f(-qy*0.7)}z" fill="#f0e6b8" stroke="#c8b070" stroke-width=".7"/><ellipse cx="${f(-qx*0.08)}" cy="0" rx="${f(r*0.05)}" ry="${f(r*0.1)}" fill="#5a3414"/><ellipse cx="${f(qx*0.1)}" cy="${f(qy*0.1)}" rx="${f(r*0.05)}" ry="${f(r*0.1)}" fill="#5a3414"/>`;
      if(вид==='сыр') дет=[[-0.3,-0.2],[0.25,0.1],[-0.05,0.4],[0.3,-0.4]].map(([a,b],k)=>`<ellipse cx="${f(qx*a)}" cy="${f(qy*b)}" rx="${f(r*(0.1+k%2*0.04))}" ry="${f(r*0.08)}" fill="#d8a83a"/>`).join('');
      if(вид==='хлеб') дет=[[-0.3,-0.2],[0.2,0.2],[0,-0.4],[-0.1,0.4],[0.35,-0.2]].map(([a,b])=>`<circle cx="${f(qx*a)}" cy="${f(qy*b)}" r="${f(r*0.05)}" fill="#e0c890"/>`).join('');
      return `<g transform="translate(${f(зн*rx*0.72)} 0) rotate(${зн*8})">
        <ellipse cx="2" cy="${f(qy*0.98)}" rx="${f(qx*0.9)}" ry="${f(r*0.14)}" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
        <ellipse cx="${f(зн*r*0.14)}" cy="0" rx="${f(qx)}" ry="${f(qy)}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
        <ellipse cx="0" cy="0" rx="${f(qx)}" ry="${f(qy)}" fill="${В.корка}" stroke="${ОБВОД}" stroke-width="1"/>
        <ellipse cx="0" cy="0" rx="${f(qx*0.88)}" ry="${f(qy*0.9)}" fill="${В.бел}"/>
        <ellipse cx="0" cy="0" rx="${f(qx*(вид==='арбуз'?0.78:0.84))}" ry="${f(qy*(вид==='арбуз'?0.8:0.86))}" fill="${В.мякоть}"/>
        ${дет}</g>`; };
    const едет=(зн)=>о.режется&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" from="${f(-зн*rx*0.7)} 0" to="0 0" dur="0.6s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.7 0.3 1"/>`:'';
    return `<g transform="translate(${f(x)} ${f(y)})">
      <radialGradient id="${кл}" cx="0.35" cy="0.3" r="0.85"><stop offset="0" stop-color="${В.ц[0]}"/><stop offset="1" stop-color="${В.ц[1]}"/></radialGradient>
      ${о.разрезан?`<g>${едет(-1)}${срез(-1)}</g><g>${едет(1)}${срез(1)}</g>`:тень+целый()}
    </g>`;
  }
  /* ---------- нож: бронзовый клинок, деревянная рукоять; (x,y) — конец рукояти, угол — поворот ---------- */
  function нож(x,y,м,угол){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${угол||0}) scale(${м})">
      <rect x="0" y="-3" width="16" height="6" rx="2.4" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="5" cy="0" r="1" fill="url(#рм-латунь)"/><circle cx="11" cy="0" r="1" fill="url(#рм-латунь)"/>
      <path d="M16 -3.4 H40 Q48 -2 50 3.4 H16 Z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M18 -1.6 H40" stroke="#fff" stroke-width="1" opacity=".6"/>
    </g>`;
  }
  /* ---------- торговец Главк: плотный, чёрная курчавая борода, зелёный хитон, кожаный фартук.
     поза: 'стоит' | 'режет' (в руке нож) | 'сердит' (руки в боки, брови сдвинуты). Высота ~116 ---------- */
  function торговец(x,y,м,опц){
    const о=опц||{}, кл=ид('торг'), поза=о.поза||'стоит';
    const тело='M-22 -80 Q0 -88 22 -80 Q30 -50 26 -24 Q0 -17 -26 -24 Q-30 -50 -22 -80 Z';
    const кожа=(d)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".12"/>`;
    const кисть=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="4.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    const рукаЛ = поза==='сердит' ? кожа('M-20 -74 L-34 -58 L-24 -46')+кисть(-24,-45) : кожа('M-20 -74 q-10 14 -8 30')+кисть(-28,-43);
    const рукаП = поза==='сердит' ? кожа('M20 -74 L34 -58 L24 -46')+кисть(24,-45)
      : поза==='режет' ? `<g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 20 -74;14 20 -74;0 20 -74" dur="1s" repeatCount="indefinite"/>`:''}${нож(40,-62,0.8,28)}${кожа('M20 -74 q12 2 22 12')}${кисть(42,-62)}</g>`
      : кожа('M20 -74 q10 14 8 30')+кисть(28,-43);
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="26" ry="3.8" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-13" y="-26" width="9" height="23" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="4" y="-26" width="9" height="23" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-17 -2 q0 -6 9 -6 q7 0 7 6 z M1 -2 q0 -6 9 -6 q7 0 7 6 z" fill="#6a4a2a" stroke="${ОБВОД}" stroke-width=".9"/>
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      ${рукаЛ}
      <path d="${тело}" fill="#4a8a5a" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})"><rect x="-30" y="-90" width="60" height="76" fill="url(#рм-складка)"/>
        <path d="M-15 -64 L15 -64 L19 -20 L-19 -20 Z" fill="#a8703a" stroke="${ОБВОД}" stroke-width="1"/>
        <path d="M-12 -60 H12" stroke="#7a4a20" stroke-width="1" stroke-dasharray="2 2"/>
        <rect x="-8" y="-44" width="16" height="11" rx="2" fill="none" stroke="#7a4a20" stroke-width="1"/></g>
      <path d="M-15 -64 L-10 -82 M15 -64 L10 -82" stroke="#a8703a" stroke-width="3"/>
      ${рукаП}
      <rect x="-4.4" y="-88" width="8.8" height="7" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -101)">
        <ellipse cx="-15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="15" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="15" ry="15.5" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-14 2 q-2 17 14 19 q16 -2 14 -19 q-5 8 -14 8 q-9 0 -14 -8 z" fill="#2a2018" stroke="${ОБВОД}" stroke-width=".9"/>
        ${[[-8,14],[0,17],[8,14],[-4,10],[5,10]].map(([bx,by])=>`<path d="M${bx-2} ${by} q2 -3 4 0" stroke="#5a4a3a" stroke-width="1.1" fill="none"/>`).join('')}
        ${лицо(Object.assign({глаза:'#3a2a1a',рот:поза==='сердит'?'ровно':undefined},о))}
        ${поза==='сердит'?`<path d="M-9 -8 l7 3 M9 -8 l-7 3" stroke="#2a2018" stroke-width="2.2" stroke-linecap="round"/>`:''}
        <path d="M-6 7 q3 -3 6 0 q3 -3 6 0" stroke="#2a2018" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M-15 -4 q-1 -13 15 -13 q16 0 15 13 q-4 -6 -8 -6 q-3 -3 -7 -1 q-4 -2 -7 1 q-4 0 -8 6 z" fill="#2a2018" stroke="${ОБВОД}" stroke-width=".9"/>
        <path d="M-15 -6 q15 -7 30 0" stroke="#e8e0d0" stroke-width="2.4" fill="none"/>
      </g>
    </g>`;
  }

  /* ---------- кусок сыра: жёлтый клин с дырками; (x,y) — центр ---------- */
  function сырок(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})"><path d="M-9 4 L9 -5 L9 5 L-9 6 Z" fill="#f4d060" stroke="${ОБВОД}" stroke-width=".8" stroke-linejoin="round"/>
      <path d="M-9 4 L9 -5 L4 -7 Z" fill="#fbe48a" stroke="${ОБВОД}" stroke-width=".8" stroke-linejoin="round"/>
      <circle cx="3" cy="2" r="1.5" fill="#d8a83a"/><circle cx="-3" cy="4" r="1" fill="#d8a83a"/><circle cx="6.5" cy="-1" r="1" fill="#d8a83a"/></g>`;
  }
  /* ---------- лиса Лика: рыжая, белые грудка и кончик хвоста, тёмные лапы и кончики ушей, хитрый
     прищур. поза: 'сидит' | 'стоит' | 'крадётся'. опц.сыр — сыр в зубах; опц.хитрость 0..2 — улыбка
     шире, прищур сильнее; опц.влево. (x,y) — середина у лап ---------- */
  function лиса(x,y,м,опц){
    const о=опц||{}, кл=ид('лиса'), поза=о.поза||'сидит', хит=о.хитрость||0;
    const голова=(hx,hy,угол)=>`<g transform="translate(${hx} ${hy}) rotate(${угол||0})">
      <path d="M-9 -9 L-13 -27 L-1 -15 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1" stroke-linejoin="round"/><path d="M-10.5 -16 L-12.6 -26 L-6 -19 Z" fill="#2a1a12"/>
      <path d="M3 -13 L5 -30 L13 -13 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1" stroke-linejoin="round"/><path d="M5.6 -20 L5.4 -29 L9.6 -20 Z" fill="#2a1a12"/>
      <path d="M-13 -6 Q-12 -17 2 -17 Q14 -16 17 -8 L31 -1 Q32 2 28 4 Q14 9 4 9 Q-10 9 -13 -6 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1" stroke-linejoin="round"/>
      <path d="M-11 0 Q-4 9 6 9 Q16 8 28 4 Q31 2 30 0 Q18 3 10 1 Q0 -1 -11 0 Z" fill="#fbf6ea"/>
      <ellipse cx="30" cy="0" rx="2.8" ry="2.2" fill="#1a120a"/>
      <path d="M12 ${f(4.4)} Q${f(20)} ${f(7+хит*1.6)} 27 ${f(4)}" stroke="${ОБВОД}" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="scale" values="1 1;1 1;1 0.15;1 1" keyTimes="0;0.9;0.95;1" dur="4.6s" repeatCount="indefinite" additive="sum"/>`:''}
        <ellipse cx="8" cy="-6" rx="3.6" ry="${f(3.2-хит*0.9)}" fill="#fff6c0" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="9" cy="-6" rx="1.3" ry="${f(2.6-хит*0.8)}" fill="#1a120a"/><circle cx="8.2" cy="-7" r=".7" fill="#fff"/></g>
      <path d="M3 -${f(10+хит)} L13 -${f(9-хит*1.2)}" stroke="#7a3410" stroke-width="1.4" stroke-linecap="round"/>
      ${о.сыр?сырок(30,6,1.1):''}
    </g>`;
    const хвост=(d,d2)=>`<path d="${d}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.1" stroke-linejoin="round"/><path d="${d2}" fill="#fbf6ea" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/>`;
    const лапа=(lx,h,тём)=>`<rect x="${lx}" y="${-h}" width="5" height="${h}" rx="2.2" fill="${тём?'#2a1a12':'#3a2418'}" stroke="${ОБВОД}" stroke-width=".7"/>`;
    let тело='';
    if(поза==='сидит'){
      тело=`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 -14 -6;8 -14 -6;0 -14 -6" dur="2.8s" repeatCount="indefinite"/>`:''}${хвост('M-12 -8 Q-40 -10 -40 -30 Q-38 -46 -26 -44 Q-30 -30 -18 -22 Q-8 -18 -8 -8 Z','M-40 -30 Q-38 -46 -26 -44 Q-29 -36 -27 -30 Q-34 -34 -40 -30 Z')}</g>
        <path d="M-14 0 Q-20 -22 -8 -40 Q2 -50 10 -44 Q18 -30 14 0 Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M2 -44 Q14 -34 12 -14 Q6 -8 0 -16 Q-2 -32 2 -44 Z" fill="#fbf6ea"/>
        ${лапа(3,20,false)}${лапа(9,20,true)}
        <ellipse cx="-8" cy="-2" rx="9" ry="4" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width=".9"/><rect x="-6" y="-4" width="8" height="4.4" rx="2" fill="#3a2418"/>
        ${голова(4,-52,-6)}`;
    } else {
      const низко=поза==='крадётся', by=низко?-17:-26, h=низко?13:22;
      тело=`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 -26 ${by};-7 -26 ${by};0 -26 ${by}" dur="2.4s" repeatCount="indefinite"/>`:''}${хвост(`M-24 ${by-4} Q-48 ${by-18} -58 ${by-6} Q-62 ${by+6} -50 ${by+8} Q-36 ${by+10} -24 ${by+4} Z`,`M-58 ${by-6} Q-62 ${by+6} -50 ${by+8} Q-52 ${by+2} -48 ${by-4} Q-54 ${by-8} -58 ${by-6} Z`)}</g>
        ${лапа(-20,h,true)}${лапа(12,h,true)}
        <ellipse cx="-2" cy="${by}" rx="27" ry="${низко?9:10.5}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
        <ellipse cx="0" cy="${by+5}" rx="19" ry="4.4" fill="#fbf6ea" opacity=".9"/>
        ${лапа(-26,h,false)}${лапа(18,h,false)}
        <path d="M16 ${by-8} Q24 ${by-16} 26 ${by-20} L34 ${by-12} Q28 ${by-2} 22 ${by+4} Z" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1"/>
        ${голова(30,by-(низко?12:22),низко?10:0)}`;
    }
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <linearGradient id="${кл}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f08a3a"/><stop offset="1" stop-color="#c8581a"/></linearGradient>
      <ellipse cx="0" cy="1" rx="${поза==='сидит'?22:32}" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${тело}
    </g>`;
  }
  /* ---------- ворона: серое тело, чёрные голова, крылья и хвост, крепкий клюв. опц.сыр — сыр в клюве;
     опц.каркает — клюв раскрыт; опц.влево. (x,y) — лапы ---------- */
  function ворона(x,y,м,опц){
    const о=опц||{};
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <path d="M-8 -2 l-3 4 M-8 -2 v5 M-8 -2 l3 4 M2 -2 l-3 4 M2 -2 v5 M2 -2 l3 4" stroke="#2a2a2a" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-8 -12 v10 M2 -12 v10" stroke="#2a2a2a" stroke-width="2"/>
      <path d="M-20 -22 L-42 -12 L-38 -20 L-44 -22 L-22 -30 Z" fill="#1e1e22" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/>
      <ellipse cx="-4" cy="-24" rx="19" ry="13" fill="#8a8a92" stroke="${ОБВОД}" stroke-width="1.1"/>
      <ellipse cx="0" cy="-19" rx="12" ry="6" fill="#a8a8b0" opacity=".8"/>
      <path d="M-20 -28 Q-6 -40 10 -30 Q4 -16 -14 -16 Q-22 -20 -20 -28 Z" fill="#1e1e22" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-14 -24 Q-4 -28 6 -26 M-12 -20 Q-4 -23 2 -22" stroke="#4a4a54" stroke-width="1.1" fill="none"/>
      <g>${ДВИЖ&&!о.каркает?`<animateTransform attributeName="transform" type="rotate" values="0 10 -36;6 10 -36;0 10 -36" dur="3.4s" repeatCount="indefinite"/>`:''}
        <circle cx="12" cy="-38" r="11" fill="#1e1e22" stroke="${ОБВОД}" stroke-width="1.1"/>
        ${о.каркает
          ? `<g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 20 -38;-14 20 -38;0 20 -38" dur="0.6s" repeatCount="indefinite"/>`:''}<path d="M20 -42 L38 -46 L22 -37 Z" fill="#2e2e34" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/></g>
             <path d="M20 -35 L36 -31 L22 -33 Z" fill="#2e2e34" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/><path d="M22 -38 L30 -37 L22 -35 Z" fill="#c8402a"/>`
          : `<path d="M20 -42 L38 -37 L21 -33 Z" fill="#2e2e34" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/><path d="M22 -37.4 L34 -37" stroke="#5a5a64" stroke-width=".8"/>`}
        ${о.сыр&&!о.каркает?сырок(38,-33,1.15):''}
        <circle cx="15" cy="-41" r="3.2" fill="#fff" stroke="${ОБВОД}" stroke-width=".6"/><circle cx="16" cy="-41" r="1.7" fill="#1a120a"/><circle cx="15.4" cy="-41.8" r=".6" fill="#fff"/>
      </g>
    </g>`;
  }
  /* ---------- следы лап: цепочка отпечатков от (x1,y1) к (x2,y2); n — сколько; опц.цвет;
     опц.проявить — следы появляются один за другим ---------- */
  function следы(x1,y1,x2,y2,n,опц){
    const о=опц||{}, угол=Math.atan2(y2-y1,x2-x1)*180/Math.PI+90, ц=о.цвет||'#8a6238';
    return `<g data-декор="1">${Array.from({length:n},(_,k)=>{ const t=n>1?k/(n-1):0, px=x1+(x2-x1)*t, py=y1+(y2-y1)*t, бок=(k%2?1:-1)*4;
      const nx=-Math.sin((угол-90)*Math.PI/180)*бок, ny=Math.cos((угол-90)*Math.PI/180)*бок;
      return `<g transform="translate(${f(px+nx)} ${f(py+ny)}) rotate(${f(угол)}) scale(${о.м||1})"${о.проявить&&ДВИЖ?' opacity="0"':''}>${о.проявить&&ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${f(k*0.18)}s" dur="0.25s" fill="freeze"/>`:''}
        <ellipse cx="0" cy="2" rx="3" ry="2.6" fill="${ц}"/>${[[-3.4,-1.6],[-1.2,-3.6],[1.2,-3.6],[3.4,-1.6]].map(([tx,ty])=>`<ellipse cx="${tx}" cy="${ty}" rx="1.2" ry="1.6" fill="${ц}"/>`).join('')}</g>`; }).join('')}</g>`;
  }

  /* ---------- бронзовый диск для метания; (x,y) — центр ---------- */
  function диск(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})"><ellipse cx="0" cy="0" rx="11" ry="4.6" fill="url(#рм-бронза)" stroke="${ОБВОД}" stroke-width=".9"/><ellipse cx="0" cy="-1" rx="7" ry="2.2" fill="none" stroke="#f8dcb0" stroke-width=".8" opacity=".7"/></g>`;
  }
  /* ---------- силач Милон: огромные плечи, лысина и усы, шкура через плечо, широкий пояс.
     поза: 'стоит' | 'поднял' — держит над головой камень; опц.камень 0..2 — размер камня.
     Высота ~118 (с камнем выше) ---------- */
  function силач(x,y,м,опц){
    const о=опц||{}, кл=ид('силач'), поднял=(о.поза||'стоит')==='поднял', к=о.камень||0, rk=15+к*6;
    const тело='M-30 -84 Q0 -94 30 -84 Q34 -62 22 -40 Q0 -34 -22 -40 Q-34 -62 -30 -84 Z';
    const рука=(d,w)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".12"/>`;
    const кулак=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="6.4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".9"/>`;
    const руки = поднял
      ? `${рука('M-27 -80 L-36 -104 L-24 -124',13)}${кулак(-24,-126)}${рука('M27 -80 L36 -104 L24 -124',13)}${кулак(24,-126)}
         <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="1.6s" repeatCount="indefinite"/>`:''}
           <path d="M${-rk-10} -132 Q${-rk-14} ${-150-rk} 0 ${-152-rk*1.3} Q${rk+14} ${-150-rk} ${rk+10} -132 Q0 -124 ${-rk-10} -132 Z" fill="url(#рм-скала)" stroke="${ОБВОД}" stroke-width="1.2"/>
           <path d="M${-rk} ${-142-rk*0.5} l${rk*0.6} -6 M${rk*0.2} ${-140-rk} l${rk*0.5} 8" stroke="${ОБВОД}" stroke-width="1" opacity=".5"/></g>`
      : `${рука('M-27 -80 L-40 -62 L-34 -46',13)}${кулак(-34,-44)}${рука('M27 -80 L40 -62 L34 -46',13)}${кулак(34,-44)}`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="30" ry="4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-15 -40 L-17 -5 h13 L-2 -32 L2 -32 L4 -5 h13 L15 -40 Z" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M-20 -3 q0 -7 10 -7 q8 0 8 7 z M2 -3 q0 -7 10 -7 q8 0 8 7 z" fill="#6a4a2a" stroke="${ОБВОД}" stroke-width=".9"/>
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      <path d="${тело}" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})">
        <path d="M-34 -92 L10 -38 L36 -38 L36 -60 L-8 -96 Z" fill="#d8a040" stroke="${ОБВОД}" stroke-width="1"/>
        ${[[-14,-74],[-2,-60],[10,-48],[-20,-84],[18,-56],[4,-70]].map(([sx,sy])=>`<ellipse cx="${sx}" cy="${sy}" rx="3" ry="2.2" fill="#5a3414" transform="rotate(40 ${sx} ${sy})"/>`).join('')}
        <path d="M-12 -70 q-6 4 -12 0 M0 -62 v14" stroke="#c89a7a" stroke-width="1.2" fill="none" opacity=".7"/></g>
      <path d="M-23 -44 Q0 -36 23 -44 L22 -34 Q0 -27 -22 -34 Z" fill="#7a4a20" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="-6" y="-42" width="12" height="10" rx="2" fill="url(#рм-латунь)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-22 -36 Q0 -28 22 -36 L20 -22 Q0 -16 -20 -22 Z" fill="#a0402a" stroke="${ОБВОД}" stroke-width="1"/>
      ${руки}
      <rect x="-6" y="-94" width="12" height="8" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -106)">
        <ellipse cx="-14.5" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="14.5" cy="1" rx="3" ry="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="14.5" ry="15" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <ellipse cx="-4" cy="-9" rx="5" ry="2.4" fill="#fff" opacity=".4"/>
        ${лицо(Object.assign({глаза:'#3a2a1a'},о))}
        <path d="M-10 6 Q-5 2 0 6 Q5 2 10 6 Q6 10 0 8 Q-6 10 -10 6 Z" fill="#3a2418" stroke="${ОБВОД}" stroke-width=".7"/>
        <path d="M-9 -8 q4 -3 8 -1 M1 -9 q4 -2 8 1" stroke="#3a2418" stroke-width="2" fill="none" stroke-linecap="round"/>
      </g>
    </g>`;
  }
  /* ---------- стадион: небо, каменные ряды со зрителями, песчаная дорожка с разметкой.
     y0 — верх дорожки; опц.дорожек — число линий ---------- */
  function стадион(ш,Н,y0,опц){
    const о=опц||{}, ряды=4, в=(y0-40)/ряды, n=о.дорожек||0;
    const зрит=(ry,k)=>Array.from({length:Math.floor(ш/13)},(_,i)=>{ const zx=6+i*13+(k%2)*6; return `<circle cx="${zx}" cy="${f(ry-5)}" r="3.6" fill="${['#e8c8a0','#d8b088','#f0d4b0'][(i+k)%3]}"/><rect x="${zx-4}" y="${f(ry-2)}" width="8" height="6" rx="2" fill="${['#c8402a','#2a6ab8','#e8e0d0','#4a8a5a','#e0a030','#8a44aa'][(i*7+k*3)%6]}"/>`; }).join('');
    return `<g data-декор="1">${небо(ш,44,{облака:о.облака||[[70,20,0.45,6],[260,16,0.4,-5]]})}
      ${Array.from({length:ряды},(_,k)=>{ const ry=40+k*в; return `<rect x="0" y="${f(ry)}" width="${ш}" height="${f(в)}" fill="${k%2?'#e0d4b8':'#d2c4a4'}" stroke="#a89a7c" stroke-width=".6"/>${зрит(ry+в-2,k)}`; }).join('')}
      <rect x="0" y="${f(y0-5)}" width="${ш}" height="6" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
      <rect x="0" y="${y0}" width="${ш}" height="${Н-y0}" fill="url(#рм-песок)"/>
      ${Array.from({length:n},(_,k)=>`<line x1="0" y1="${f(y0+(Н-y0)*(k+1)/(n+1))}" x2="${ш}" y2="${f(y0+(Н-y0)*(k+1)/(n+1))}" stroke="#fff" stroke-width="1.4" stroke-dasharray="10 8" opacity=".7"/>`).join('')}
    </g>`;
  }
  /* ---------- пьедестал: три мраморные ступени — I в центре, II слева, III справа.
     (x,y) — середина низа; ш — ширина одной ступени ---------- */
  function пьедестал(x,y,ш,опц){
    const о=опц||{}, в=[о.в1||66,о.в2||46,о.в3||30];
    const ступень=(sx,h,цифра,цв)=>`<rect x="${f(sx-ш/2)}" y="${f(y-h)}" width="${ш}" height="${h}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width="1.1"/>
      <rect x="${f(sx+ш*0.22)}" y="${f(y-h)}" width="${f(ш*0.28)}" height="${h}" fill="#8a7a5a" opacity=".18"/>
      <rect x="${f(sx-ш/2-2)}" y="${f(y-h-4)}" width="${ш+4}" height="5" fill="#f6efe0" stroke="${ОБВОД}" stroke-width=".8"/>
      <circle cx="${f(sx)}" cy="${f(y-h/2+2)}" r="${f(Math.min(10,h*0.3))}" fill="${цв}" stroke="${ОБВОД}" stroke-width=".9"/>
      <text x="${f(sx)}" y="${f(y-h/2+6)}" text-anchor="middle" font-size="${f(Math.min(11,h*0.34))}" font-weight="bold" fill="#3a2008" font-family="Georgia,serif">${цифра}</text>`;
    return `<g><ellipse cx="${f(x+4)}" cy="${f(y+2)}" rx="${f(ш*1.6)}" ry="4.4" fill="#231a12" opacity=".3" filter="url(#рм-мягко)"/>
      ${ступень(x-ш,в[1],'II','#d8d8e0')}${ступень(x+ш,в[2],'III','#d8a070')}${ступень(x,в[0],'I','#ffd24a')}</g>`;
  }

  /* ---------- молоток: деревянная рукоять, железный боёк; (x,y) — конец рукояти ---------- */
  function молоток(x,y,м,угол){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${угол||0}) scale(${м})">
      <rect x="-2.4" y="-30" width="4.8" height="30" rx="2" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-11 -38 H9 L13 -34 V-30 H-11 Z" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".9" stroke-linejoin="round"/>
      <rect x="-9" y="-36.6" width="16" height="1.6" fill="#fff" opacity=".5"/>
    </g>`;
  }
  /* ---------- плотник Ксанф: бурая рабочая туника на одно плечо, пояс с инструментом, короткая
     русая борода, повязка. поза: 'стоит' | 'бьёт' — машет молотком. опц.влево. Высота ~114 ---------- */
  function плотник(x,y,м,опц){
    const о=опц||{}, кл=ид('плот'), бьёт=(о.поза||'стоит')==='бьёт';
    const тело='M-17 -78 Q0 -85 17 -78 L20 -34 Q0 -28 -20 -34 Z';
    const кожа=(d)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".12"/>`;
    const кисть=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="4.4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="21" ry="3.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <rect x="-11" y="-36" width="8" height="33" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="3" y="-36" width="8" height="33" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-14 -2 q0 -5 8 -5 q6 0 6 5 z M1 -2 q0 -5 8 -5 q6 0 6 5 z" fill="#6a4a2a" stroke="${ОБВОД}" stroke-width=".9"/>
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      ${кожа('M-15 -74 q-9 14 -6 28')}${кисть(-21,-45)}
      <path d="${тело}" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})">
        <path d="M-22 -60 L8 -88 L24 -88 L24 -26 L-24 -26 Z" fill="#8a6a44" stroke="${ОБВОД}" stroke-width="1"/>
        <rect x="-22" y="-88" width="46" height="64" fill="url(#рм-складка)"/>
        <path d="M-4 -56 Q-6 -44 -8 -32 M8 -60 Q9 -46 12 -32" stroke="#5a4020" stroke-width="1" fill="none"/></g>
      <path d="M-19 -54 Q0 -49 20 -54" stroke="#4a3018" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <rect x="-13" y="-54" width="4" height="13" rx="1.4" fill="url(#рм-железо)" stroke="${ОБВОД}" stroke-width=".6"/><rect x="-7" y="-52" width="3" height="10" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".5"/>
      <g>${бьёт&&ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 15 -74;-34 15 -74;12 15 -74;0 15 -74" keyTimes="0;0.4;0.6;1" dur="0.9s" repeatCount="indefinite"/>`:''}
        ${молоток(32,-92,0.9,28)}${кожа('M15 -74 L28 -82 L32 -94')}${кисть(32,-94)}</g>
      <rect x="-3.8" y="-85" width="7.6" height="6" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -98)">
        <ellipse cx="-14" cy="1" rx="2.9" ry="3.9" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="14" cy="1" rx="2.9" ry="3.9" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="14" ry="15" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-13 3 q-1 14 13 15 q14 -1 13 -15 q-5 7 -13 7 q-8 0 -13 -7 z" fill="#a87a4a" stroke="${ОБВОД}" stroke-width=".9"/>
        ${лицо(Object.assign({глаза:'#4a5a3a'},о))}
        <path d="M-6 6.4 q3 -2.6 6 0 q3 -2.6 6 0" stroke="#8a6238" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M-14 -3 q-2 -14 12 -15 q14 -2 16 11 q-4 -7 -10 -7 q-4 3 -9 1 q-5 1 -9 10 z" fill="#a87a4a" stroke="${ОБВОД}" stroke-width=".9"/>
        <path d="M-13.6 -6 q14 -8 27.6 -1" stroke="#c8402a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>
    </g>`;
  }
  /* ---------- Борей, северный ветер: сизая туча с лицом — надутые щёки, сдвинутые брови, губы
     трубочкой. опц.дует — струи ветра летят вправо; опц.спит — глаза закрыты, над ним «z».
     опц.влево. (x,y) — центр ---------- */
  function борей(x,y,м,опц){
    const о=опц||{}, кл=ид('борей');
    const струи=о.дует?Array.from({length:5},(_,k)=>`<path d="M${44+k%2*6} ${-8+k*6} q${30+k*4} ${-6+k*3} ${70+k*8} ${k*4-6}" stroke="#e8f4ff" stroke-width="${2.4-k*0.2}" fill="none" stroke-linecap="round" stroke-dasharray="14 10" opacity=".85">${анЛин('stroke-dashoffset','24;0',(0.5+k*0.08).toFixed(2)+'s')}</path>`).join(''):'';
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${о.влево?-м:м} ${м})" data-декор="1">
      <radialGradient id="${кл}" cx="0.4" cy="0.3" r="0.9"><stop offset="0" stop-color="#eef4fa"/><stop offset="1" stop-color="#8a9cb4"/></radialGradient>
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="3s" repeatCount="indefinite"/>`:''}
        <path d="M-46 8 q-14 -4 -8 -18 q-2 -16 16 -16 q6 -14 24 -10 q14 -12 28 0 q18 -2 18 16 q10 6 4 18 q-2 10 -16 10 h-52 q-12 0 -14 0 z" fill="url(#${кл})" stroke="#4a5a70" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M-30 -22 q8 -10 20 -6 M2 -30 q10 -6 20 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
        <ellipse cx="-16" cy="4" rx="9" ry="7" fill="#f4b8b0" opacity=".6"/><ellipse cx="22" cy="2" rx="${о.дует?11:8}" ry="${о.дует?9:6}" fill="#f4b8b0" opacity=".7"/>
        ${о.спит?`<path d="M-16 -8 q5 4 10 0 M6 -10 q5 4 10 0" stroke="#33405a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <text x="34" y="-34" font-size="13" font-weight="bold" fill="#e8f4ff" font-family="Georgia,serif">z<tspan dy="-7" font-size="10">z</tspan></text>`
          :`<ellipse cx="-11" cy="-8" rx="4.4" ry="5" fill="#fff" stroke="#33405a" stroke-width=".8"/><circle cx="-9.6" cy="-7.4" r="2.4" fill="#1e2a40"/><circle cx="-10.4" cy="-8.4" r=".8" fill="#fff"/>
            <ellipse cx="11" cy="-10" rx="4.4" ry="5" fill="#fff" stroke="#33405a" stroke-width=".8"/><circle cx="12.4" cy="-9.4" r="2.4" fill="#1e2a40"/><circle cx="11.6" cy="-10.4" r=".8" fill="#fff"/>
            <path d="M-18 -17 l11 3 M18 -19 l-11 3" stroke="#33405a" stroke-width="2.4" stroke-linecap="round"/>`}
        ${о.дует?`<ellipse cx="38" cy="4" rx="4.4" ry="5.4" fill="#5a3a4a" stroke="#33405a" stroke-width="1"/>`:`<path d="M-2 8 q6 ${о.спит?2:4} 12 0" stroke="#33405a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`}
      </g>
      ${струи}
    </g>`;
  }
  /* ---------- окно: деревянная рама с переплётом, стёкла с бликами, оловянная задвижка, подоконник.
     (x,y) — центр; опц.свет — 'стекло' | 'рама' | 'задвижка' подсвечивает часть ---------- */
  function окно(x,y,ш,в,опц){
    const о=опц||{}, л=x-ш/2, вр=y-в/2, рам=Math.max(7,ш*0.08), св=о.свет;
    const блик=(bx,by,w,h)=>`<path d="M${f(bx+w*0.15)} ${f(by+h*0.75)} L${f(bx+w*0.55)} ${f(by+h*0.12)} h${f(w*0.14)} L${f(bx+w*0.29)} ${f(by+h*0.75)} Z" fill="#fff" opacity=".45"/>`;
    const пв=(ш-рам*3)/2, пh=(в-рам*3)/2;
    const стёкла=[[л+рам,вр+рам],[л+рам*2+пв,вр+рам],[л+рам,вр+рам*2+пh],[л+рам*2+пв,вр+рам*2+пh]].map(([gx,gy])=>`<rect x="${f(gx)}" y="${f(gy)}" width="${f(пв)}" height="${f(пh)}" fill="${св==='стекло'?'#d8f4ff':'#a8d4ec'}" stroke="${св==='стекло'?'#ffd76a':'#5a8aa8'}" stroke-width="${св==='стекло'?2.4:0.8}"/>${блик(gx,gy,пв,пh)}`).join('');
    return `<g>
      <rect x="${f(л-4)}" y="${f(вр-4)}" width="${f(ш+8)}" height="${f(в+8)}" fill="#0b1c2a" opacity=".25" filter="url(#рм-мягко)"/>
      <rect x="${f(л)}" y="${f(вр)}" width="${ш}" height="${в}" fill="url(#рм-доска)" stroke="${св==='рама'?'#ffd76a':ОБВОД}" stroke-width="${св==='рама'?3:1.3}"/>
      ${стёкла}
      <path d="M${f(л+3)} ${f(вр+3)} H${f(л+ш-3)}" stroke="#f0c890" stroke-width="1.4" opacity=".6"/>
      <rect x="${f(л-8)}" y="${f(вр+в)}" width="${f(ш+16)}" height="8" rx="2" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width="1"/>
      <g><rect x="${f(x-рам*0.9)}" y="${f(y-5)}" width="${f(рам*1.8)}" height="10" rx="2" fill="#c8ccd4" stroke="${св==='задвижка'?'#ffd76a':ОБВОД}" stroke-width="${св==='задвижка'?2.6:0.9}"/>
        <rect x="${f(x-1.6)}" y="${f(y-10)}" width="3.2" height="10" rx="1.4" fill="#e0e4ea" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="${f(x)}" cy="${f(y-11)}" r="2.6" fill="#e8ecf0" stroke="${ОБВОД}" stroke-width=".7"/></g>
    </g>`;
  }

  /* ---------- бык из стада Гелиоса: масть 'белый' | 'чёрный' | 'рыжий' | 'пёстрый'; мощная холка,
     рога, кисточка хвоста. поза: 'стоит' | 'идёт'. опц.номер — бирка на боку; опц.влево.
     (x,y) — середина у копыт; ширина ~110, высота ~84 ---------- */
  function бык(x,y,м,опц){
    const о=опц||{}, кл=ид('бык'), масть=о.масть||'рыжий', идёт=о.поза==='идёт'&&ДВИЖ;
    const Ц={белый:['#fdfaf2','#d4ccbc','#b8b0a0'],чёрный:['#5a5462','#26222c','#15121a'],рыжий:['#e09a58','#a85a24','#7a3a12'],пёстрый:['#fdfaf2','#d4ccbc','#b8b0a0']}[масть]||['#e09a58','#a85a24','#7a3a12'];
    const тело='M-42 -52 Q-22 -62 8 -58 Q26 -68 40 -54 Q48 -36 38 -24 Q0 -15 -36 -22 Q-48 -36 -42 -52 Z';
    const нога=(nx,тём,фаза)=>`<g>${идёт?`<animateTransform attributeName="transform" type="rotate" values="${фаза?11:-11} ${nx+4} -26;${фаза?-11:11} ${nx+4} -26;${фаза?11:-11} ${nx+4} -26" dur="0.8s" repeatCount="indefinite"/>`:''}
      <rect x="${nx}" y="-30" width="8.4" height="27" rx="3" fill="${тём?Ц[2]:`url(#${кл})`}" stroke="${ОБВОД}" stroke-width=".9"/><rect x="${nx-0.6}" y="-6" width="9.6" height="6" rx="2" fill="#2a2018" stroke="${ОБВОД}" stroke-width=".7"/></g>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <linearGradient id="${кл}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Ц[0]}"/><stop offset="1" stop-color="${Ц[1]}"/></linearGradient>
      <clipPath id="${кл}к"><path d="${тело}"/></clipPath>
      <ellipse cx="2" cy="1" rx="46" ry="4.6" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      ${нога(-26,true,0)}${нога(22,true,1)}
      <path d="M-42 -50 Q-54 -42 -50 -20" stroke="${Ц[1]}" stroke-width="3.4" fill="none" stroke-linecap="round"/><ellipse cx="-50" cy="-17" rx="3.4" ry="5.6" fill="#2a2018"/>
      <path d="${тело}" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${масть==='пёстрый'?`<g clip-path="url(#${кл}к)">${[[-24,-46,13,9],[6,-30,11,8],[24,-54,9,7],[-38,-28,8,6]].map(([px,py,rx,ry])=>`<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" fill="#8a5a2e"/>`).join('')}</g>`:''}
      <path d="M-30 -56 Q-6 -62 10 -58" stroke="#fff" stroke-width="2" fill="none" opacity="${масть==='чёрный'?0.2:0.4}"/>
      <path d="M26 -30 Q32 -22 28 -14" stroke="${Ц[1]}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
      ${нога(-34,false,1)}${нога(14,false,0)}
      ${о.номер!=null?`<circle cx="-6" cy="-40" r="9" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/><text x="-6" y="-35.6" text-anchor="middle" font-size="12" font-weight="bold" fill="#2e2416" font-family="Georgia,serif" transform="${о.влево?'translate(-12 0) scale(-1 1)':''}">${о.номер}</text>`:''}
      <g>${ДВИЖ?`<animateTransform attributeName="transform" type="rotate" values="0 36 -50;4 36 -50;0 36 -50" dur="3.4s" repeatCount="indefinite"/>`:''}
        <path d="M38 -62 Q30 -80 42 -84" stroke="#f4ecd8" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M38 -62 Q30 -80 42 -84" stroke="${ОБВОД}" stroke-width=".8" fill="none" opacity=".5"/>
        <ellipse cx="50" cy="-50" rx="15" ry="12.5" fill="url(#${кл})" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M52 -63 Q62 -80 52 -86" stroke="#f4ecd8" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="M52 -63 Q62 -80 52 -86" stroke="${ОБВОД}" stroke-width=".8" fill="none" opacity=".5"/>
        <ellipse cx="38" cy="-56" rx="6" ry="3.4" fill="${Ц[1]}" stroke="${ОБВОД}" stroke-width=".8" transform="rotate(-24 38 -56)"/>
        <ellipse cx="61" cy="-43" rx="8.4" ry="7" fill="#f0c8b8" stroke="${ОБВОД}" stroke-width="1"/>
        <ellipse cx="63" cy="-44" rx="1.4" ry="2" fill="#5a3028"/><ellipse cx="58" cy="-45" rx="1.2" ry="1.8" fill="#5a3028"/>
        <path d="M57 -38 q4 2 7 0" stroke="${ОБВОД}" stroke-width="1" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="-54" rx="3.4" ry="3.8" fill="#fff" stroke="${ОБВОД}" stroke-width=".7"/><circle cx="51" cy="-53.6" r="2.2" fill="#1a120a"/><circle cx="50.2" cy="-54.6" r=".8" fill="#fff"/>
        <path d="M45 -59 q5 -3 9 0" stroke="${Ц[2]}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </g>
    </g>`;
  }
  /* ---------- пастух Дафнис: мальчик в овечьей безрукавке поверх короткой туники, светлые кудри,
     посох с крюком, свирель за поясом. поза: 'стоит' | 'считает' — показывает рукой.
     опц.влево. Высота ~112 ---------- */
  function пастух(x,y,м,опц){
    const о=опц||{}, кл=ид('паст'), считает=о.поза==='считает';
    const тело='M-15 -76 Q0 -82 15 -76 L18 -38 Q0 -32 -18 -38 Z';
    const кожа=(d)=>`<path d="${d}" stroke="url(#рм-кожа)" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${ОБВОД}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".12"/>`;
    const кисть=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="4" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>`;
    return `<g transform="translate(${x} ${y}) scale(${о.влево?-м:м} ${м})">
      <ellipse cx="0" cy="1" rx="19" ry="3.4" fill="#231a12" opacity=".35" filter="url(#рм-мягко)"/>
      <path d="M-22 0 L-24 -100 Q-24 -112 -14 -110" stroke="#8a5a2e" stroke-width="3.6" fill="none" stroke-linecap="round"/>
      <rect x="-10" y="-40" width="7" height="37" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="3" y="-40" width="7" height="37" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".8"/>
      <path d="M-13 -2 q0 -5 7 -5 q6 0 6 5 z M1 -2 q0 -5 7 -5 q6 0 6 5 z" fill="#8a5a2e" stroke="${ОБВОД}" stroke-width=".9"/>
      <clipPath id="${кл}"><path d="${тело}"/></clipPath>
      ${кожа('M-13 -72 L-22 -60')}${кисть(-23,-58)}
      <path d="${тело}" fill="#e8dcc0" stroke="${ОБВОД}" stroke-width="1.3"/>
      <g clip-path="url(#${кл})"><rect x="-20" y="-84" width="40" height="52" fill="url(#рм-складка)"/></g>
      <path d="M-16 -78 Q-6 -82 -3 -76 L-5 -46 Q-12 -42 -17 -46 Z M16 -78 Q6 -82 3 -76 L5 -46 Q12 -42 17 -46 Z" fill="#f6f0e2" stroke="${ОБВОД}" stroke-width="1"/>
      ${[[-12,-70],[-9,-60],[-13,-52],[12,-70],[9,-60],[13,-52]].map(([wx,wy])=>`<path d="M${wx-3} ${wy} q3 -4 6 0" stroke="#c8bca0" stroke-width="1.2" fill="none"/>`).join('')}
      <path d="M-17 -48 Q0 -43 17 -48" stroke="#7a4a20" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g transform="translate(8 -46) rotate(14)">${[0,1,2,3].map(k=>`<rect x="${k*2.6}" y="0" width="2.4" height="${12-k*2}" rx="1" fill="#d8b868" stroke="${ОБВОД}" stroke-width=".4"/>`).join('')}</g>
      ${считает?`<g>${крутить('0 13 -72;-8 13 -72;0 13 -72','1.4s')}${кожа('M13 -72 L30 -76 L40 -84')}${кисть(41,-85)}</g>`:кожа('M13 -72 q8 12 6 26')+кисть(19,-45)}
      <rect x="-3.4" y="-83" width="6.8" height="6" fill="url(#рм-кожа)"/>
      <g transform="translate(0 -95)">
        <ellipse cx="-13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/><ellipse cx="13.5" cy="1" rx="2.8" ry="3.8" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width=".7"/>
        <ellipse cx="0" cy="0" rx="13.5" ry="14.5" fill="url(#рм-кожа)" stroke="${ОБВОД}" stroke-width="1.2"/>
        <path d="M-14 -1 q-4 -16 12 -18 q16 -2 17 12 q-2 5 -2 6 q-3 -8 -8 -9 q-3 3 -7 1 q-4 3 -8 1 q-2 2 -4 8 z" fill="#d8b060" stroke="${ОБВОД}" stroke-width=".9"/>
        ${[[-9,-13],[-3,-17],[4,-16],[10,-12],[-12,-7],[13,-6]].map(([hx,hy])=>`<circle cx="${hx}" cy="${hy}" r="3" fill="#e8c878" stroke="#a8803c" stroke-width=".6"/>`).join('')}
        ${лицо(Object.assign({глаза:'#4a6a8a'},о))}
      </g>
    </g>`;
  }
  /* ---------- абак: счётная доска с тремя желобками (сотни, десятки, единицы), в каждом —
     камешки по цифре числа. (x,y) — левый верх; число 0..999 ---------- */
  function абак(x,y,ш,в,число){
    const n=Math.max(0,Math.min(999,число|0)), ц=[Math.floor(n/100),Math.floor(n/10)%10,n%10], кш=(ш-16)/3;
    return `<g>
      <rect x="${f(x+3)}" y="${f(y+4)}" width="${ш}" height="${в}" rx="5" fill="#0b1c2a" opacity=".3" filter="url(#рм-мягко)"/>
      <rect x="${f(x)}" y="${f(y)}" width="${ш}" height="${в}" rx="5" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width="1.3"/>
      ${ц.map((d,k)=>{ const cx=x+8+кш*k+кш/2, верх=y+20, шаг=Math.min(12,(в-30)/5);
        return `<rect x="${f(cx-кш/2+3)}" y="${f(верх)}" width="${f(кш-6)}" height="${f(в-27)}" rx="4" fill="#5a3414" opacity=".5" stroke="#3a2008" stroke-width=".8"/>
          <text x="${f(cx)}" y="${f(y+14)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff4d8" font-family="Georgia,serif">${['сотни','десятки','единицы'][k]}</text>
          ${Array.from({length:d},(_,i)=>{ const px=cx+(i%2?1:-1)*Math.min(8,кш*0.2), py=y+в-12-Math.floor(i/2)*шаг-(i%2?0:0);
            return `<ellipse cx="${f(px)}" cy="${f(py)}" rx="5.4" ry="4.6" fill="url(#рм-камень)" stroke="${ОБВОД}" stroke-width=".8"/><ellipse cx="${f(px-1.6)}" cy="${f(py-1.4)}" rx="1.8" ry="1.2" fill="#fff" opacity=".6"/>`; }).join('')}`; }).join('')}
    </g>`;
  }
  /* ---------- изгородь загона: столбы и две жерди; (x,y) — левый низ ---------- */
  function изгородь(x,y,ш,в){
    const n=Math.max(2,Math.round(ш/34));
    return `<g>${Array.from({length:n+1},(_,k)=>`<rect x="${f(x+k*ш/n-3)}" y="${f(y-в)}" width="6" height="${в}" rx="2" fill="url(#рм-мачта)" stroke="${ОБВОД}" stroke-width=".7"/>`).join('')}
      <rect x="${f(x-4)}" y="${f(y-в*0.82)}" width="${f(ш+8)}" height="5" rx="2.4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".7"/>
      <rect x="${f(x-4)}" y="${f(y-в*0.42)}" width="${f(ш+8)}" height="5" rx="2.4" fill="url(#рм-доска)" stroke="${ОБВОД}" stroke-width=".7"/></g>`;
  }

  window.РМ = {ДВИЖ, defs, небо, солнце, облако, море, берег, утёс, лодка, парусник, юнга, капитан, чайка,
    сундук, бочка, якорь, бухта, краб, морзвезда, ёрш, весло, маяк, лист, доски, качать, крутить,
    флаг, прилавок, мяч, лента, яблоко, рыбка, дельфин, бутылка, фрегат, роза, какаду, карта, штурман,
    боцман, ящик, стрела, фонарь, трюмы, трюмыОтсеки, пристань, склад, штурвал, рында, доска,
    шторм, молния, дождь, всплеск, вал, каюта, перо, туман, сиракузы, радуга,
    портик, стела, амфора, весы, гиря, полкаСвитков, свиток, город, архимед, венец, слиток, ванна, сосуд,
    крепость, галера, катапульта, коготь, восковая, винт, лира, ведро, листок, кольцо, театр,
    пиршество, гусли, сосна, белка, кольчуга, кафтан,
    трон, меч, гусь, конь, медведь, баклуши, воин, сфера, цветы, амфораМузей, витрина, подснежник, этна,
    снегопад, акведук, стапель, сиракузия, полиспаст, плащ, палатка,
    знамя, высотка, плотина,
    бороздка, кругПесок, прибой, черепок,
    девочка, ослик, сова, домик,
    пламя, факел, бегун, коза, сеятель, клепсидра, жертвенник,
    плод, нож, торговец,
    сырок, лиса, ворона, следы,
    диск, силач, стадион, пьедестал,
    молоток, плотник, борей, окно,
    бык, пастух, абак, изгородь};
})();
