/* ============ МАТЕМАТИКА · УРОК 1034 · «ЗАДАЧИ НА ДРОБИ» ============
   5 класс. Сюжет: в классе 30 учеников, две трети — девочки.

   СВЕРКА С ПЕТЕРСОНОМ (5 класс): «нахождение части от целого», «нахождение
   целого по его части», «задачи на дроби». Источники:
   план-1-9/петерсон_1-9.md, план-1-9/углублённая_5-9.md.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ РАСЧЁТОМ (часть и обратная задача):
     2/3 от 30 = 20        и обратно: 2/3 = 20 → 30
     3/4 от 12 = 9         и обратно: 3/4 = 9  → 12
     5/6 от 60 = 50        и обратно: 5/6 = 50 → 60
     4/5 от 45 = 36        и обратно: 4/5 = 36 → 45
     7/10 от 200 = 140     и обратно: 7/10 = 140 → 200
     2/5 от 15 = 6;  3/8 от 32 = 12
     класс 30: 30 : 3 = 10 (одна треть), 10 · 2 = 20 девочек, мальчиков 10
     час 60 минут: 60 : 6 = 10, 10 · 5 = 50 минут

   ЭТАЛОН (846, 1010, 377 … 1000): движение в кадре — сама математика.
     кадр 2  класс ДЕЛИТСЯ на три равные части: ряды разъезжаются, одна
             треть подсвечивается и даёт 10, две трети — 20;
     кадр 3  ПОЛОСА делится делениями, затем 2/3 заполняется по клеткам,
             счёт идёт 10 → 20;
     кадр 4  ОБРАТНАЯ ЗАДАЧА: известны две части, третья ДОСТРАИВАЕТСЯ,
             и только потом появляется целое 30;
     кадр 6  РАЗВИЛКА: вопрос идёт по стрелке к одной из двух формул —
             смотря что дано: целое или часть;
     кадр 7  верёвка делится на четыре части, три подсвечиваются;
     кадр 8  ЧАСОВАЯ ШКАЛА: круг делится на шесть секторов по 10 минут,
             пять секторов заполняются.

   РИСУНОК по deploy/РИСОВАНИЕ_ФИГУР.md: плоские заливки, обводка #33291e,
   пара теней, свет сверху-слева, одна линия земли, эмодзи нет.

   СТАНДАРТ deploy/АНИМАЦИЯ_УРОКОВ.md: состояние всегда видимо (не ниже 0.3),
   текст не масштабируется, keyTimes строго в [0;1], prefers-reduced-motion
   выключает SMIL полностью, ничего не выходит за край кадра.
   Подписи держим короткими: длинная строка при 12–14 px не влезает в кадр
   336 единиц — это проверено замером на уроке 1010. */
(function(){
  'use strict';

  const ID = 1034;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ЛИЛ='#c9a6f2';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';

  const CSS=`
  #lvis .s6.l1034{gap:14px}
  #lvis .s6.l1034 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l1034 .pic svg{display:block;width:100%;height:auto}
  #lvis .s6.l1034 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l1034 .карт.вопрос{border-color:${GOLD}}
  #lvis .s6.l1034 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l1034 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l1034 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l1034 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l1034 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l1034 .правило b{color:${GOLD}}
  #lvis .s6.l1034 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l1034 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1034 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l1034 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l1034 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l1034 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l1034 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1034 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l1034 .уровни .точка.сейчас{background:${GOLD};animation:l1034dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l1034dot{0%,100%{opacity:1}50%{opacity:.45}}
  #lvis .s6.l1034 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l1034{-webkit-text-size-adjust:100%}
  #lvis .s6.l1034 [data-anim]{animation:l1034rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l1034rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (max-width:370px){ #lvis .s6.l1034 .ask button{flex:1 1 100%} }
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l1034 [data-anim]{animation:none!important}
    #lvis .s6.l1034 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l1034 .ask button{transition:none}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l1034-style');
      if(!s){ s=document.createElement('style'); s.id='l1034-style'; document.head.appendChild(s); }
      if(s.textContent!==CSS) s.textContent=CSS;
    }catch(e){}
  }

  const S = () => {
    const lk = (typeof lidKey==='function') ? lidKey(ID) : String(ID);
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    return CHS[lk];
  };
  const A = (i,cls,html) => `<div data-anim style="--i:${i}" class="${cls||''}">${html}</div>`;
  const BTN = (i,cls,html,on,off) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" ${off?'disabled':''} onclick="${on}">${html}</button>`;
  const ВОПРОС = (текст) => A(2,'карт вопрос','<span class="метка">Вопрос</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор ошибки')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const ЖДЁТ = () => A(9,'карт','<span class="метка">Ответ</span><div class="текст">Выбери один из вариантов выше — разбор появится здесь.</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const ан = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const анТ = (значения,длит,доп) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const анД = (путь,длит,доп) =>
    ДВИЖ ? `<animateMotion dur="${длит}" repeatCount="indefinite" path="${путь}" ${доп||''}/>` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  /* Кривая проекта: cubic-bezier(.23, 1, .32, 1) — в SMIL это keySplines.
     Линейные переходы заменяем на плавные: движение перестаёт «дёргаться». */
  const КРИВАЯ = '0.23 1 0.32 1';
  const сплайны = (n) => Array.from({length:n},()=>КРИВАЯ).join(';');
  const анК = (имя,значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const анТК = (значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const светит = (длит,нач) => ан('opacity','1;0.45;1',длит, нач!=null?'begin="'+нач+'s"':'');
  const проявить = (длит,доля,конец) => ан('opacity','0.3;0.3;1;1',длит,
    'keyTimes="0;'+кт(доля)+';'+кт(конец)+';1"');
  /* деление растёт из середины полосы — как в уроке 830 */
  const делится = (x,y0,y1,нач,цвет) =>
    `<line x1="${x}" y1="${((y0+y1)/2).toFixed(1)}" x2="${x}" y2="${((y0+y1)/2).toFixed(1)}"
       stroke="${цвет||ИНК}" stroke-width="1.6">
      ${ан('y1',((y0+y1)/2)+';'+((y0+y1)/2)+';'+y0+';'+y0,'10s','keyTimes="0;'+кт(нач)+';'+кт(нач+0.06)+';1"')}
      ${ан('y2',((y0+y1)/2)+';'+((y0+y1)/2)+';'+y1+';'+y1,'10s','keyTimes="0;'+кт(нач)+';'+кт(нач+0.06)+';1"')}
    </line>`;

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;

  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c1034-стена" x1="0" y1="0" x2="0" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#2a3f33"/><stop offset="0.5" stop-color="#1e3128"/>
        <stop offset="1" stop-color="#111c15"/>
      </linearGradient>
      <!-- МАТЕРИАЛЫ: кожа, волосы, ткань, металл, стекло, бумага, канат -->
      <radialGradient id="c1034-кожа" cx="0.38" cy="0.3" r="0.78" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#ffe0c4"/><stop offset="0.45" stop-color="#f4c9a3"/>
        <stop offset="0.85" stop-color="#d9a87e"/><stop offset="1" stop-color="#b98a63"/>
      </radialGradient>
      <linearGradient id="c1034-волосы" x1="0" y1="0" x2="0.4" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#7a5b3a"/><stop offset="0.5" stop-color="#5a4028"/>
        <stop offset="1" stop-color="#3a2a1a"/>
      </linearGradient>
      <linearGradient id="c1034-ткань1" x1="0" y1="0" x2="0.25" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#cfe9fa"/><stop offset="0.4" stop-color="#8ec2e2"/>
        <stop offset="1" stop-color="#3f7fa6"/>
      </linearGradient>
      <linearGradient id="c1034-ткань2" x1="0" y1="0" x2="0.25" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#ffe9a8"/><stop offset="0.42" stop-color="#e7c25c"/>
        <stop offset="1" stop-color="#a87c1c"/>
      </linearGradient>
      <linearGradient id="c1034-ткань3" x1="0" y1="0" x2="0.25" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#c7efd8"/><stop offset="0.42" stop-color="#8fd1a8"/>
        <stop offset="1" stop-color="#3f7a5c"/>
      </linearGradient>
      <linearGradient id="c1034-металл" x1="0" y1="0" x2="1" y2="0" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#6d7a86"/><stop offset="0.18" stop-color="#e8eef4"/>
        <stop offset="0.42" stop-color="#9fb0bd"/><stop offset="0.68" stop-color="#5c6874"/>
        <stop offset="0.88" stop-color="#cfd8e0"/><stop offset="1" stop-color="#4a545e"/>
      </linearGradient>
      <linearGradient id="c1034-стекло" x1="0" y1="0" x2="0.3" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#eaf6ff" stop-opacity=".75"/>
        <stop offset="0.45" stop-color="#bcdcf2" stop-opacity=".35"/>
        <stop offset="1" stop-color="#6f9dbb" stop-opacity=".25"/>
      </linearGradient>
      <linearGradient id="c1034-бумага" x1="0" y1="0" x2="0.2" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#fdfaf1"/><stop offset="0.55" stop-color="#f2ead6"/>
        <stop offset="1" stop-color="#d9cfb4"/>
      </linearGradient>
      <linearGradient id="c1034-канат" x1="0" y1="0" x2="0" y2="1" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#f0dfae"/><stop offset="0.35" stop-color="#d8bd80"/>
        <stop offset="0.7" stop-color="#ab8a4c"/><stop offset="1" stop-color="#6f5626"/>
      </linearGradient>
      <radialGradient id="c1034-шар" cx="0.36" cy="0.3" r="0.8" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#ffffff" stop-opacity=".9"/>
        <stop offset="0.14" stop-color="#ffe9a8"/><stop offset="0.5" stop-color="#dcae43"/>
        <stop offset="0.86" stop-color="#7a5a12"/><stop offset="1" stop-color="#4a3607"/>
      </radialGradient>
      <linearGradient id="c1034-цилиндр" x1="0" y1="0" x2="1" y2="0" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#5f7d92"/><stop offset="0.16" stop-color="#dff0fb"/>
        <stop offset="0.46" stop-color="#8fb8d0"/><stop offset="0.8" stop-color="#4a6b83"/>
        <stop offset="1" stop-color="#324a5c"/>
      </linearGradient>
      <radialGradient id="c1034-луч" cx="0.5" cy="0.15" r="0.85" color-interpolation="linearRGB">
        <stop offset="0" stop-color="#fff6d8" stop-opacity=".5"/>
        <stop offset="1" stop-color="#fff6d8" stop-opacity="0"/>
      </radialGradient>
      <!-- СВЕТ И ТЕНИ: мягкая отбрасываемая, плотная контактная, блеск -->
      <filter id="c1034-тень" x="-80%" y="-80%" width="260%" height="260%" color-interpolation-filters="linearRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4.4" result="р"/>
        <feOffset in="р" dx="4" dy="6" result="с"/>
        <feFlood flood-color="#08171f" flood-opacity="0.42" result="ц"/>
        <feComposite in="ц" in2="с" operator="in"/>
      </filter>
      <filter id="c1034-контакт" x="-80%" y="-160%" width="260%" height="420%" color-interpolation-filters="linearRGB">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.7" result="р"/>
        <feOffset in="р" dx="0" dy="1" result="с"/>
        <feFlood flood-color="#1d1508" flood-opacity="0.45" result="ц"/>
        <feComposite in="ц" in2="с" operator="in"/>
      </filter>
      <filter id="c1034-мягко" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="linearRGB">
        <feGaussianBlur stdDeviation="1.1"/>
      </filter>
      <filter id="c1034-шум" x="0" y="0" width="100%" height="100%" color-interpolation-filters="linearRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" result="ш"/>
        <feColorMatrix in="ш" type="saturate" values="0"/>
      </filter>
      <pattern id="c1034-витки" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
        <rect width="9" height="9" fill="none"/>
        <line x1="0" y1="0" x2="0" y2="9" stroke="rgba(90,70,30,.55)" stroke-width="2.4"/>
      </pattern>
    </defs>`;

  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота||250}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;

  const фон = (высота) =>
    `<rect x="0" y="0" width="336" height="${высота}" fill="url(#c1034-стена)"/>
     <rect x="0" y="0" width="336" height="${высота}" filter="url(#c1034-шум)" opacity="0.05"/>
     <rect x="0" y="0" width="336" height="${высота}" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;

  const карта = (x,y,ш,в,текст,кегль,цвет,нач,заливка) => `<g>
    <rect x="${x+2}" y="${y+3}" width="${ш}" height="${в}" rx="8" fill="#0b1c2a" opacity=".28" filter="url(#c1034-тень)"/>
    <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="8" fill="${заливка||'rgba(255,255,255,.05)'}"
      stroke="${цвет||ЛИНИЯ}" stroke-width="1.6">${нач!=null?проявить('11s',нач,нач+0.06):''}</rect>
    ${т(x+ш/2,y+в/2+(кегль||16)*0.36,текст,кегль||16,цвет||ИНК,true)}
  </g>`;

  /* УЧЕНИК: девочка или мальчик — они РАЗЛИЧАЮТСЯ и УЛЫБАЮТСЯ.
     Девочка: длинные волосы по плечам, бант, юбка-трапеция, румянец.
     Мальчик: короткая стрижка, брюки. У обоих улыбка, блики в глазах,
     тёплая кожа, ткань с мягким светом и тень на полу. */
  const ученик = (x,y,цвет,нач,пол,м) => {
    const R=26, кожа='url(#c1034-кожа)', волосы='url(#c1034-волосы)', ткань='url(#c1034-'+цвет+')';
    const девочка = пол!=='м';
    return `<g transform="translate(${x} ${y}) scale(${м||1}) translate(${-x} ${-y})">${нач!=null?проявить('12s',нач,нач+0.04):''}
      <ellipse cx="${x}" cy="${y+2}" rx="${R*0.42}" ry="3.4" fill="#08171f" opacity=".4" filter="url(#c1034-тень)"/>
      <ellipse cx="${x}" cy="${y+0.5}" rx="${R*0.3}" ry="2" fill="#1d1508" opacity=".5" filter="url(#c1034-контакт)"/>
      ${девочка
        ? `<path d="M${x-8} ${y-13.5} l16 0 l3.4 13.5 l-22.8 0 Z" fill="${ткань}" stroke="${ОБВОД}" stroke-width="1.1"/>`
        : `<path d="M${x-5.4} ${y-14} h10.8 l1.4 12 h-13.6 Z" fill="${ткань}" stroke="${ОБВОД}" stroke-width="1.1"/>`}
      <ellipse cx="${x-3.4}" cy="${y-0.6}" rx="3.2" ry="1.5" fill="#2b2f38"/>
      <ellipse cx="${x+3.4}" cy="${y-0.6}" rx="3.2" ry="1.5" fill="#2b2f38"/>
      <path d="M${x-7.6} ${y-34} q7.6 -2.6 15.2 0 l1.6 21 q-9.2 2.2 -18.4 0 Z"
        fill="${ткань}" stroke="${ОБВОД}" stroke-width="1.2"/>
      <path d="M${x-5.6} ${y-32.6} q5.6 -1.6 11.2 0" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
      <path d="M${x-7.6} ${y-30} q-3.4 8 -2.4 15" fill="none" stroke="${ткань}" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M${x+7.6} ${y-30} q3.4 8 2.4 15" fill="none" stroke="${ткань}" stroke-width="4.2" stroke-linecap="round"/>
      <circle cx="${x-10.4}" cy="${y-14.6}" r="2.6" fill="${кожа}" stroke="${ОБВОД}" stroke-width="1"/>
      <circle cx="${x+10.4}" cy="${y-14.6}" r="2.6" fill="${кожа}" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${x-2.2}" y="${y-40}" width="4.4" height="6" rx="2" fill="#d9a87e"/>
      ${девочка?`<path d="M${x-7.4} ${y-47} q-3.6 10 -2.4 18 q3 -3 4.4 -9 Z" fill="${волосы}" stroke="${ОБВОД}" stroke-width="0.9"/>
        <path d="M${x+7.4} ${y-47} q3.6 10 2.4 18 q-3 -3 -4.4 -9 Z" fill="${волосы}" stroke="${ОБВОД}" stroke-width="0.9"/>`:''}
      <circle cx="${x}" cy="${y-46}" r="7" fill="${кожа}" stroke="${ОБВОД}" stroke-width="1.1"/>
      <path d="M${x-7.2} ${y-47.6} q7.2 ${девочка?-6.6:-5.4} 14.4 0 q-3 -2 -7.2 -2 q-4.2 0 -7.2 2 Z"
        fill="${волосы}" stroke="${ОБВОД}" stroke-width="0.9"/>
      <ellipse cx="${x-2.6}" cy="${y-50.6}" rx="3.2" ry="1.5" fill="rgba(255,255,255,.28)"/>
      ${девочка?`<g>
        <path d="M${x+6.4} ${y-50.4} l4.4 -2.4 l0 4.8 Z" fill="#e2607f" stroke="#a33a55" stroke-width="0.7"/>
        <path d="M${x+6.4} ${y-50.4} l4.4 2.4 l0 -4.8 Z" fill="#e2607f" stroke="#a33a55" stroke-width="0.7"/>
        <circle cx="${x+6.4}" cy="${y-50.4}" r="1.2" fill="#f7a8bd" stroke="#a33a55" stroke-width="0.6"/>
      </g>`:''}
      <circle cx="${x-2.4}" cy="${y-46.4}" r="1.15" fill="#2a1d12"/>
      <circle cx="${x+2.4}" cy="${y-46.4}" r="1.15" fill="#2a1d12"/>
      <circle cx="${x-2.8}" cy="${y-46.8}" r="0.42" fill="#fff"/>
      <circle cx="${x+2}" cy="${y-46.8}" r="0.42" fill="#fff"/>
      ${девочка?`<path d="M${x-3.6} ${y-47.9} q1.6 -0.7 2.6 0" fill="none" stroke="#2a1d12" stroke-width="0.6"/>
        <path d="M${x+1} ${y-47.9} q1.6 -0.7 2.6 0" fill="none" stroke="#2a1d12" stroke-width="0.6"/>`:''}
      <ellipse cx="${x-4.4}" cy="${y-43.6}" rx="1.7" ry="1" fill="#e88b7a" opacity=".45"/>
      <ellipse cx="${x+4.4}" cy="${y-43.6}" rx="1.7" ry="1" fill="#e88b7a" opacity=".45"/>
      <path d="M${x-2.8} ${y-42.3} q2.8 2.7 5.6 0" fill="none" stroke="#8a4a34" stroke-width="1.1" stroke-linecap="round"/>
    </g>`;
  };

  /* ПРЕДМЕТЫ: шар, цилиндр, бумажная карточка — с материалом и парой теней */
  const шар = (x,y,r) => `<g>
    <ellipse cx="${x+3}" cy="${y+r+3}" rx="${r*1.05}" ry="${r*0.24}" fill="#08171f" opacity=".38" filter="url(#c1034-тень)"/>
    <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c1034-шар)"/>
    <ellipse cx="${x+r*0.3}" cy="${y+r*0.42}" rx="${r*0.42}" ry="${r*0.24}" fill="#fef3c7" opacity=".18"/>
    <circle cx="${x-r*0.34}" cy="${y-r*0.38}" r="${r*0.16}" fill="#fff" opacity=".85" filter="url(#c1034-мягко)"/>
  </g>`;

  const цилиндр = (x,земля,r,h) => {
    const верх=земля-h;
    return `<g>
      <ellipse cx="${x+5}" cy="${земля+5}" rx="${r*1.25}" ry="${r*0.3}" fill="#08171f" opacity=".34" filter="url(#c1034-тень)"/>
      <ellipse cx="${x}" cy="${земля+1}" rx="${r*0.95}" ry="${r*0.2}" fill="#1d1508" opacity=".45" filter="url(#c1034-контакт)"/>
      <path d="M${x-r} ${верх} L${x-r} ${земля} A${r} ${r*0.3} 0 0 0 ${x+r} ${земля} L${x+r} ${верх} Z" fill="url(#c1034-цилиндр)"/>
      <path d="M${x-r*0.72} ${верх+6} L${x-r*0.72} ${земля-6}" stroke="rgba(255,255,255,.45)" stroke-width="${r*0.16}" filter="url(#c1034-мягко)"/>
      <ellipse cx="${x}" cy="${верх}" rx="${r}" ry="${r*0.3}" fill="url(#c1034-металл)"/>
      <ellipse cx="${x}" cy="${верх}" rx="${r*0.7}" ry="${r*0.2}" fill="rgba(255,255,255,.22)"/>
      <ellipse cx="${x}" cy="${верх}" rx="${r}" ry="${r*0.3}" fill="none" stroke="rgba(20,35,28,.5)" stroke-width="1"/>
    </g>`;
  };

  const бумага = (x,y,ш,в,нач,поворот) => `<g transform="rotate(${поворот||0} ${x+ш/2} ${y+в/2})">
    <rect x="${x+3}" y="${y+4}" width="${ш}" height="${в}" rx="6" fill="#08171f" opacity=".38" filter="url(#c1034-тень)"/>
    <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="6" fill="url(#c1034-бумага)" stroke="rgba(90,72,40,.5)" stroke-width="1">
      ${нач!=null?проявить('12s',нач,нач+0.05):''}</rect>
    <rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="6" fill="none" filter="url(#c1034-шум)" opacity=".08"/>
    <line x1="${x+5}" y1="${y+5}" x2="${x+ш-5}" y2="${y+5}" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>
  </g>`;

  /* СТЕКЛО: панель с бликом и мягкой тенью — общий примитив */

  /* ================= КАДРЫ ================= */

  /* 1. Класс из 30: девочки и мальчики вперемешку, все улыбаются */
  function F1(s){
    const в = s.класс;
    /* 20 девочек и 10 мальчиков: пол задаётся по индексу так, чтобы ряды
       перемешались — состав видно, но посчитать часть сразу нелегко */
    /* пол по клетке: мальчик там, где (ряд + место) даёт остаток 2 — так
       получается ровно 10 мальчиков, разбросанных по всем трём рядам */
    const пол = (ряд,место) => (((ряд+место)%3)===2 ? 'м' : 'д');
    const цвет = (ряд,место) => пол(ряд,место)==='м' ? 'ткань1' : (((ряд+место)%2) ? 'ткань2' : 'ткань3');
    return ВОПРОС('В классе 30 учеников, две трети — девочки. Сколько девочек?') +
      `<div class="pic">${свг(`
        ${фон(252)}
        ${т(168,24,'Класс: 30 учеников',14,GOLD,true)}
        <rect x="18" y="40" width="300" height="142" rx="10" fill="rgba(255,255,255,.03)" stroke="${ЛИНИЯ}" stroke-width="1.2"/>
        ${Array.from({length:30},(_,i)=>{
          const место=i%10, ряд=Math.floor(i/10);
          return ученик(38+место*29,116+ряд*32,цвет(ряд,место),i*0.02,пол(ряд,место),0.5);
        }).join('')}
        <g>${проявить('12s',0.62,0.72)}
          ${т(168,206,'мальчики и девочки перемешаны',14,МУТ)}
          ${т(168,236,'сколько девочек?',16,GOLD,true)}</g>
      `,252)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='двадцать'?'hit':(в?'miss':''), '20: две трети от 30', "r1034Класс('двадцать')")}
        ${BTN(4, в==='шестьдесят'?'miss':'', '60: умножили 30 на 2', "r1034Класс('шестьдесят')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='двадцать',
        в==='двадцать' ? 'Верно: 30 : 3 = 10 — это одна треть, а две трети в два раза больше: 20.'
                       : 'Нет: 30 · 2 = 60 больше всего класса. Сначала делят на 3, потом умножают на 2.') : ЖДЁТ()) +
      ПРАВИЛО('Часть от числа: <b>сначала делим на знаменатель</b>, потом умножаем на числитель.');
  }

  /* 2. Класс строится по рядам: две трети — девочки, одна треть — мальчики.
     Фигуры ЕДУТ на свои места по кривой проекта. */
  function F2(s){
    const в = s.делим;
    const пол = (i) => (i%3===2 ? 'м' : 'д');
    const цвет = (i) => (i%3===2 ? 'ткань1' : (i%3===0 ? 'ткань2' : 'ткань3'));
    return ВОПРОС('Сколько учеников в одной трети класса?') +
      `<div class="pic">${свг(`
        ${фон(260)}
        ${т(168,24,'Строим класс по рядам',14,GOLD,true)}
        <rect x="18" y="40" width="300" height="146" rx="10" fill="rgba(255,255,255,.03)" stroke="${ЛИНИЯ}" stroke-width="1.2"/>
        ${Array.from({length:30},(_,i)=>{
          const цельКл=i%10, цельРяд=Math.floor(i/10);
          const истКл=Math.floor(i/3), истРяд=i%3;
          const dx=(истКл-цельКл)*29, dy=(истРяд-цельРяд)*32;
          return `<g>${анТК('0 0;0 0;'+dx+' '+dy+';'+dx+' '+dy+';0 0','13s',
              '0;'+кт(0.06+i*0.008)+';'+кт(0.4+i*0.008)+';0.9;1')}
            ${ученик(38+цельКл*29,116+цельРяд*32,цвет(i),0,пол(i),0.5)}</g>`;
        }).join('')}
        <g>${проявить('13s',0.5,0.6)}
          ${т(168,206,'две трети — девочки: 10 · 2 = 20',16,GOLD,true)}
          ${т(168,234,'одна треть — мальчики: 10',16,GREEN,true)}</g>
      `,260)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='десять'?'hit':(в?'miss':''), '10: 30 : 3 = 10', "r1034Делим('десять')")}
        ${BTN(4, в==='пятнадцать'?'miss':'', '15: половина класса', "r1034Делим('пятнадцать')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='десять',
        в==='десять' ? 'Верно: класс разделился на три равные части по 10 человек — это и есть одна треть.'
                     : 'Нет: половина — это 15. Треть находят делением на 3: 30 : 3 = 10.') : ЖДЁТ()) +
      ПРАВИЛО('Знаменатель показывает, <b>на сколько равных частей</b> делят целое.');
  }

  /* 3. Полоса-лента: ткань с мягким светом, делится на три части */
  function F3(s){
    const в = s.полоса;
    const x0=22, ш=292, часть=ш/3, y0=62, h=38;
    return ВОПРОС('Полоса изображает 30. Сколько составят две трети полосы?') +
      `<div class="pic">${свг(`
        ${фон(252)}
        ${т(168,24,'Делим полосу на три равные части',14,GOLD,true)}
        <ellipse cx="${x0+ш/2}" cy="${y0+h+8}" rx="${ш*0.52}" ry="9" fill="#08171f" opacity=".36" filter="url(#c1034-тень)"/>
        <rect x="${x0}" y="${y0}" width="${ш}" height="${h}" rx="7" fill="url(#c1034-ткань1)" stroke="rgba(30,50,70,.6)" stroke-width="1.2"/>
        ${[0,1,2].map(i=>`<rect x="${(x0+i*часть+2).toFixed(1)}" y="${y0+2}" width="${(часть-4).toFixed(1)}" height="${h-4}" rx="5"
          fill="${i<2?'url(#c1034-ткань2)':'url(#c1034-ткань3)'}">
          ${анК('opacity','0.3;0.3;1;1','12s','0;'+кт(0.34+i*0.09)+';'+кт(0.44+i*0.09)+';1')}</rect>
          <path d="M${(x0+(i+0.5)*часть).toFixed(1)} ${y0+4} v${h-8}" stroke="rgba(255,255,255,.22)" stroke-width="7" filter="url(#c1034-мягко)"/>
          ${т((x0+(i+0.5)*часть).toFixed(1),y0+h+30,'10',16,i<2?GOLD:МУТ,true)}`).join('')}
        ${делится(x0+часть,y0-6,y0+h+6,0.08,GOLD)}${делится(x0+2*часть,y0-6,y0+h+6,0.16,GOLD)}
        ${т(x0+часть,y0-14,'2/3',14,GOLD,true)}
        ${т(x0+2.5*часть,y0-14,'1/3',14,МУТ,true)}
        <line x1="${x0}" y1="${y0+h-2}" x2="${x0+ш}" y2="${y0+h-2}" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
        <g>${проявить('12s',0.54,0.64)}
          ${т(168,150,'30 : 3 = 10 — одна часть',16,ИНК,true)}
          ${т(168,180,'10 · 2 = 20 — две части',20,GOLD,true)}</g>
        <g>${проявить('12s',0.74,0.84)}
          ${бумага(24,206,288,34,0,-0.6)}
          ${т(168,228,'30 : 3 · 2 = 20',16,'#2b2110',true)}</g>
      `,252)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='двадцать'?'hit':(в?'miss':''), '20: 30 : 3 = 10, затем 10 · 2 = 20', "r1034Полоса('двадцать')")}
        ${BTN(4, в==='двадцать один'?'miss':'', '21: если считать по клеткам', "r1034Полоса('двадцать один')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='двадцать',
        в==='двадцать' ? 'Верно: полоса делится ровно на три части по 10 — две такие части дают 20.'
                       : 'Нет: клеток на полосе нет, есть три равные части по 10. Две части — это 20.') : ЖДЁТ()) +
      ПРАВИЛО('Знаменатель задаёт число частей: <b>30 : 3 · 2 = 20</b>.');
  }

  /* 4. Обратная задача: бумажные листы, третья часть достраивается */
  function F4(s){
    const в = s.обратно;
    return ВОПРОС('Две трети класса — это 20 человек. Сколько учеников во всём классе?') +
      `<div class="pic">${свг(`
        ${фон(258)}
        ${т(168,24,'Известна часть — ищем целое',14,GOLD,true)}
        ${[0,1,2].map(i=>{
          const x=26+i*94;
          const известна=i<2;
          return `<g>
            ${бумага(x,52,86,58,известна?0.06+i*0.05:0.62,i===1?1.2:(i===2?-1.2:0))}
            ${т(x+43,90,известна?'20':'?',24,известна?'#2b2110':МУТ,true)}
            ${т(x+43,132,'треть '+(i+1),12,МУТ)}</g>`;
        }).join('')}
        <g>${проявить('12s',0.34,0.44)}
          ${т(168,166,'две трети — 20 человек',16,ИНК,true)}
          ${т(168,196,'20 : 2 = 10 — одна треть',16,GREEN,true)}
          ${т(168,226,'10 · 3 = 30 — весь класс',20,GOLD,true)}</g>
      `,258)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='тридцать'?'hit':(в?'miss':''), '30: 20 : 2 = 10, затем 10 · 3 = 30', "r1034Обр('тридцать')")}
        ${BTN(4, в==='тринадцать'?'miss':'', '13: к 20 прибавили треть', "r1034Обр('тринадцать')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='тридцать',
        в==='тридцать' ? 'Верно: часть делим на числитель — получаем одну треть, потом умножаем на знаменатель: 20 : 2 · 3 = 30.'
                       : 'Нет: прибавлять ничего не нужно. Делим 20 на 2 (узнаём одну треть) и умножаем на 3.') : ЖДЁТ()) +
      ПРАВИЛО('Число по его части: <b>часть : числитель · знаменатель</b>.');
  }

  /* 5. Два действия: стеклянные панели формул */
  function F5(s){
    const в = s.формулы;
    const стекло = (x,y,ш,в0,текст,кегль,цвет,нач) => `<g>
      <rect x="${x+3}" y="${y+4}" width="${ш}" height="${в0}" rx="9" fill="#08171f" opacity=".35" filter="url(#c1034-тень)"/>
      <rect x="${x}" y="${y}" width="${ш}" height="${в0}" rx="9" fill="url(#c1034-стекло)" stroke="rgba(190,225,245,.55)" stroke-width="1.3">
        ${нач!=null?проявить('12s',нач,нач+0.06):''}</rect>
      <line x1="${x+4}" y1="${y+4}" x2="${x+ш-4}" y2="${y+4}" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>
      ${т(x+ш/2,y+в0/2+кегль*0.36,текст,кегль,цвет||ИНК,true)}
    </g>`;
    return ВОПРОС('Что делать, если известна часть, а нужно целое?') +
      `<div class="pic">${свг(`
        ${фон(240)}
        ${т(168,24,'Два действия — два случая',14,GOLD,true)}
        ${стекло(18,44,300,48,'дано целое → целое : зн · ч = часть',14,GREEN,0.05)}
        ${стекло(18,108,300,48,'дана часть → часть : ч · зн = целое',14,GOLD,0.26)}
        <g>${проявить('12s',0.5,0.6)}
          ${бумага(20,172,140,42,0,0.8)}
          ${т(90,199,'2/3 от 30 = 20',14,'#2b2110',true)}
          ${бумага(176,172,140,42,0,-0.8)}
          ${т(246,199,'20 это 2/3 → 30',14,'#2b2110',true)}
          ${т(168,232,'в обеих задачах одни и те же числа',12,МУТ)}</g>
      `,240)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='делить'?'hit':(в?'miss':''), 'Разделить часть на числитель и умножить на знаменатель', "r1034Фор('делить')")}
        ${BTN(4, в==='умножать'?'miss':'', 'Умножить часть на числитель', "r1034Фор('умножать')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='делить',
        в==='делить' ? 'Верно: 20 : 2 = 10 — одна часть, 10 · 3 = 30 — целое. Порядок действий обратный первому случаю.'
                     : 'Нет: умножение на числитель даст 40 — это больше целого. Нужно делить на числитель и умножать на знаменатель.') : ЖДЁТ()) +
      ПРАВИЛО('Прямая задача — <b>делим на знаменатель</b>, обратная — <b>делим на числитель</b>.');
  }

  /* 6. Развилка: металлический бегунок идёт по плавной кривой */
  function F6(s){
    const в = s.развилка;
    return ВОПРОС('В задаче сказано: «четыре пятых класса — это 20 человек». Что дано?') +
      `<div class="pic">${свг(`
        ${фон(248)}
        ${т(168,24,'Смотрим, что дано',14,GOLD,true)}
        ${бумага(120,38,96,34,0.04,-1)}
        ${т(168,60,'задача',14,'#2b2110',true)}
        <path d="M168 74 L168 94" stroke="${ЛИНИЯ}" stroke-width="2">${проявить('12s',0.18,0.26)}</path>
        <path d="M168 94 C168 112 84 104 84 122" fill="none" stroke="${ЛИНИЯ}" stroke-width="2">${проявить('12s',0.28,0.36)}</path>
        <path d="M168 94 C168 112 252 104 252 122" fill="none" stroke="${ЛИНИЯ}" stroke-width="2">${проявить('12s',0.28,0.36)}</path>
        <g>${проявить('12s',0.4,0.48)}
          <rect x="18" y="122" width="132" height="44" rx="9" fill="url(#c1034-стекло)" stroke="rgba(190,225,245,.5)" stroke-width="1.2"/>
          ${т(84,150,'дано целое → умножаем',12,GREEN,true)}
          <rect x="186" y="122" width="132" height="44" rx="9" fill="url(#c1034-стекло)" stroke="rgba(255,215,106,.6)" stroke-width="1.3"/>
          ${т(252,150,'дана часть → делим',12,GOLD,true)}</g>
        <g>${анД('M0 0 C0 20 84 12 84 56','9s')}
          <circle cx="168" cy="94" r="8" fill="url(#c1034-металл)" stroke="rgba(20,35,28,.6)" stroke-width="1.2"/>
          <circle cx="165.4" cy="91.4" r="2.4" fill="#fff" opacity=".8"/>
        </g>
        <g>${проявить('12s',0.62,0.72)}
          ${бумага(52,180,232,38,0,-0.7)}
          ${т(168,205,'дана часть 20 — идём вправо',14,'#2b2110',true)}
          ${т(168,238,'значит ищем целое: 20 : 4 · 5 = 25',16,GREEN,true)}</g>
      `,248)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='часть'?'hit':(в?'miss':''), 'Дана часть, ищем целое — будем делить', "r1034Разв('часть')")}
        ${BTN(4, в==='целое'?'miss':'', 'Дано целое — будем умножать', "r1034Разв('целое')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='часть',
        в==='часть' ? 'Верно: 20 — это часть, значит целое ищем обратным действием: 20 : 4 · 5 = 25.'
                    : 'Нет: целое тут неизвестно. Известна часть — 20 человек, значит делим на числитель.') : ЖДЁТ()) +
      ПРАВИЛО('Сначала определи, <b>что дано</b>: целое или часть.');
  }

  /* 7. Верёвка: витой канат, делится на четыре части */
  function F7(s){
    const в = s.верёвка;
    const x0=24, ш=288, часть=ш/4, y0=66, h=30;
    return ВОПРОС('Верёвка 12 м. Сколько составят три четверти?') +
      `<div class="pic">${свг(`
        ${фон(258)}
        ${т(168,24,'Верёвка 12 м на четыре части',14,GOLD,true)}
        <ellipse cx="${x0+ш/2}" cy="${y0+h+10}" rx="${ш*0.52}" ry="8" fill="#08171f" opacity=".34" filter="url(#c1034-тень)"/>
        <rect x="${x0}" y="${y0}" width="${ш}" height="${h}" rx="${h/2}" fill="url(#c1034-канат)"/>
        <rect x="${x0}" y="${y0}" width="${ш}" height="${h}" rx="${h/2}" fill="url(#c1034-витки)" opacity=".5"/>
        <rect x="${x0+4}" y="${y0+3}" width="${ш-8}" height="6" rx="3" fill="rgba(255,255,255,.25)" filter="url(#c1034-мягко)"/>
        ${[1,2,3].map(i=>делится(x0+i*часть,y0-8,y0+h+8,0.06+i*0.05,GOLD)).join('')}
        ${[0,1,2].map(i=>`<rect x="${(x0+i*часть+3).toFixed(1)}" y="${y0-4}" width="${(часть-6).toFixed(1)}" height="${h+8}" rx="6"
          fill="rgba(255,215,106,.22)" stroke="none">
          ${анК('opacity','0.3;0.3;0.9;0.9','12s','0;'+кт(0.3+i*0.07)+';'+кт(0.4+i*0.07)+';1')}</rect>`).join('')}
        <rect x="${x0}" y="${y0}" width="${ш}" height="${h}" rx="${h/2}" fill="none" stroke="rgba(60,45,15,.55)" stroke-width="1.2"/>
        ${т(x0+1.5*часть,y0-18,'3/4',14,GOLD,true)}
        ${т(x0+3.5*часть,y0-18,'1/4',14,МУТ,true)}
        <g>${проявить('12s',0.5,0.6)}
          ${т(168,140,'12 : 4 = 3 — одна четверть',16,ИНК,true)}
          ${т(168,170,'3 · 3 = 9 — три четверти',20,GOLD,true)}
          ${т(168,198,'осталось 3 м',12,МУТ)}</g>
        <g>${проявить('12s',0.7,0.8)}
          ${бумага(24,214,288,32,0,-0.6)}
          ${т(168,236,'обратно: 9 : 3 · 4 = 12',14,'#2b2110',true)}</g>
      `,258)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='девять'?'hit':(в?'miss':''), '9 м: 12 : 4 · 3 = 9', "r1034Вер('девять')")}
        ${BTN(4, в==='четыре'?'miss':'', '4 м: одна часть верёвки', "r1034Вер('четыре')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='девять',
        в==='девять' ? 'Верно: одна четверть — 3 м, значит три четверти — 9 м. Обратная задача сойдётся: 9 : 3 · 4 = 12.'
                    : 'Нет: 4 — это число частей, а не метры. Одна четверть равна 3 м, три четверти — 9 м.') : ЖДЁТ()) +
      ПРАВИЛО('Доли длины считают так же: <b>12 : 4 · 3 = 9</b>.');
  }

  /* 8. Часы: металлический корпус, стекло, шесть секторов по 10 минут */
  function F8(s){
    const в = s.часы;
    const цx=110, цy=124, r=68;
    return ВОПРОС('Сколько минут в пяти шестых часа?') +
      `<div class="pic">${свг(`
        ${фон(258)}
        ${т(168,24,'Час — это шесть по десять минут',14,GOLD,true)}
        <ellipse cx="${цx+5}" cy="${цy+8}" rx="${r*1.1}" ry="${r*0.32}" fill="#08171f" opacity=".36" filter="url(#c1034-тень)"/>
        <circle cx="${цx}" cy="${цy}" r="${r+9}" fill="url(#c1034-металл)"/>
        <circle cx="${цx}" cy="${цy}" r="${r+4}" fill="#f4f7fa" opacity=".9"/>
        ${Array.from({length:6},(_,i)=>{
          const а1=(-90+i*60)*Math.PI/180, а2=(-90+(i+1)*60)*Math.PI/180;
          const x1=цx+Math.cos(а1)*r, y1=цy+Math.sin(а1)*r;
          const x2=цx+Math.cos(а2)*r, y2=цy+Math.sin(а2)*r;
          return `<path d="M${цx} ${цy} L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z"
            fill="${i<5?'url(#c1034-ткань2)':'rgba(120,140,130,.35)'}">
            ${анК('opacity','0.3;0.3;1;1','12s','0;'+кт(0.14+i*0.06)+';'+кт(0.24+i*0.06)+';1')}</path>`;
        }).join('')}
        ${Array.from({length:12},(_,i)=>{
          const а=(-90+i*30)*Math.PI/180;
          return `<line x1="${(цx+Math.cos(а)*(r-7)).toFixed(1)}" y1="${(цy+Math.sin(а)*(r-7)).toFixed(1)}"
            x2="${(цx+Math.cos(а)*r).toFixed(1)}" y2="${(цy+Math.sin(а)*r).toFixed(1)}" stroke="rgba(40,55,45,.6)" stroke-width="${i%3===0?2:1}"/>`;
        }).join('')}
        <circle cx="${цx}" cy="${цy}" r="${r}" fill="url(#c1034-стекло)"/>
        <ellipse cx="${цx-r*0.3}" cy="${цy-r*0.42}" rx="${r*0.5}" ry="${r*0.26}" fill="#fff" opacity=".22" filter="url(#c1034-мягко)"/>
        <circle cx="${цx}" cy="${цy}" r="5" fill="url(#c1034-металл)" stroke="rgba(20,35,28,.5)" stroke-width="1"/>
        ${т(цx,цy-16,'60',20,'#2b2110',true)}
        <g>${проявить('12s',0.6,0.7)}
          ${т(250,100,'одна часть',12,МУТ)}
          ${т(250,124,'10 минут',14,GREEN,true)}
          ${т(250,156,'пять частей',12,МУТ)}
          ${т(250,180,'50 минут',16,GOLD,true)}</g>
        ${т(168,238,'60 : 6 · 5 = 50 минут; остаётся 10 минут',14,ИНК,true)}
      `,258)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='пятьдесят'?'hit':(в?'miss':''), '50 минут: 60 : 6 · 5 = 50', "r1034Час('пятьдесят')")}
        ${BTN(4, в==='пять'?'miss':'', '5 минут: ведь пять шестых', "r1034Час('пять')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='пятьдесят',
        в==='пятьдесят' ? 'Верно: час делим на 6 частей — по 10 минут, берём 5 частей: 50 минут.'
                        : 'Нет: пять — это число частей. Каждая часть равна 10 минутам, значит 50.') : ЖДЁТ()) +
      ПРАВИЛО('5/6 часа = <b>60 : 6 · 5 = 50</b> минут.');
  }

  /* 9. Покупка: монеты-шары и десять долей по 20 */
  function F9(s){
    const в = s.покупка;
    return ВОПРОС('В задаче 7/10 от 200 рублей. Что нужно сделать первым?') +
      `<div class="pic">${свг(`
        ${фон(240)}
        ${т(168,24,'7/10 от 200 рублей',14,GOLD,true)}
        ${бумага(20,44,296,44,0.04,0.5)}
        ${т(168,72,'200 : 10 = 20 — одна десятая',16,'#2b2110',true)}
        <g>${проявить('12s',0.3,0.4)}
          ${бумага(20,100,296,44,0,-0.5)}
          ${т(168,128,'20 · 7 = 140 — семь десятых',20,'#2b2110',true)}</g>
        ${Array.from({length:10},(_,i)=>i<7
          ? шар(34+i*30,178,12)
          : `<circle cx="${34+i*30}" cy="178" r="11" fill="rgba(255,255,255,.06)" stroke="${ЛИНИЯ}" stroke-width="1.2"/>
             <text x="${34+i*30}" y="182" text-anchor="middle" font-size="12" fill="${МУТ}" font-family="Georgia,serif">?</text>`).join('')}
        <g>${проявить('12s',0.76,0.86)}
          ${т(168,222,'семь монет по 20 — это 140',12,МУТ)}</g>
      `,240)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='делить'?'hit':(в?'miss':''), 'Разделить 200 на 10, потом умножить на 7', "r1034Пок('делить')")}
        ${BTN(4, в==='умножить'?'miss':'', 'Умножить 200 на 7', "r1034Пок('умножить')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='делить',
        в==='делить' ? 'Верно: 200 : 10 = 20, затем 20 · 7 = 140. Сначала узнаём одну десятую.'
                     : 'Нет: 200 · 7 = 1400 — это больше целого. Сначала делим на знаменатель.') : ЖДЁТ()) +
      ПРАВИЛО('7/10 от 200: <b>200 : 10 · 7 = 140</b>.');
  }

  /* 10. Сводка на бумажном листе */
  function F10(s){
    const в = s.сводка;
    const строки=[['2/3 от 30','30 : 3 · 2 = 20','часть'],
                  ['20 — это 2/3','20 : 2 · 3 = 30','целое'],
                  ['3/4 от 12','12 : 4 · 3 = 9','часть'],
                  ['9 — это 3/4','9 : 3 · 4 = 12','целое']];
    return ВОПРОС('В задаче «12 : 4 · 3» что мы ищем?') +
      `<div class="pic">${свг(`
        ${фон(258)}
        ${т(168,24,'Два типа задач',14,GOLD,true)}
        ${бумага(14,38,308,196,0.05,0)}
        ${строки.map(([дано,действие,что],i)=>{
          const y=52+i*44;
          return `<g>
            <line x1="22" y1="${y+32}" x2="314" y2="${y+32}" stroke="rgba(120,100,60,.28)" stroke-width="1"/>
            <g>${анК('opacity','0.3;0.3;1;1','12s','0;'+кт(0.05*i)+';'+кт(0.05*i+0.05)+';1')}
              ${т(76,y+24,дано,14,'#2b2110',true)}
              ${т(182,y+24,действие,14,'#6a4a10',true)}
              ${т(290,y+24,что,12,что==='часть'?'#2f6b4a':'#8a5a10',true)}</g>
          </g>`;
        }).join('')}
        <g>${проявить('12s',0.62,0.72)}
          ${т(168,250,'действие выбирают по тому, что дано',12,МУТ)}</g>
      `,258)}</div>` +
      `<div class="ask">
        ${BTN(3, в==='часть'?'hit':(в?'miss':''), 'Часть: делим 12 на 4 и умножаем на 3', "r1034Свод('часть')")}
        ${BTN(4, в==='целое'?'miss':'', 'Целое: делим 12 на 3 и умножаем на 4', "r1034Свод('целое')")}
      </div>` +
      (в!=null ? РАЗБОР(в==='часть',
        в==='часть' ? 'Верно: делим на знаменатель (4) и умножаем на числитель (3) — так находят часть, здесь 9.'
                    : 'Нет: деление на числитель (3) — это обратная задача, когда часть уже известна. Тут ищут часть: 12 : 4 · 3 = 9.') : ЖДЁТ()) +
      ПРАВИЛО('Делим на знаменатель — ищем часть; делим на числитель — ищем целое.');
  }

  /* 11. Практика */
  const УРОВНИ=[
    { вопрос:'2/3 от 30 — это сколько?', варианты:[
        {т:'20', ок:true,  почему:'30 : 3 = 10, 10 · 2 = 20.'},
        {т:'45', ок:false, почему:'45 больше целого: умножать на 3 нельзя.'}]},
    { вопрос:'3/4 от 12 — это сколько?', варианты:[
        {т:'9', ок:true,  почему:'12 : 4 = 3, 3 · 3 = 9.'},
        {т:'16', ок:false, почему:'16 больше 12 — так часть не считают.'}]},
    { вопрос:'2/5 числа равны 6. Чему равно всё число?', варианты:[
        {т:'15', ок:true,  почему:'6 : 2 = 3 — одна пятая, 3 · 5 = 15.'},
        {т:'12', ок:false, почему:'12 — это 6 · 2, но так находят не целое.'}]},
    { вопрос:'5/6 часа — сколько минут?', варианты:[
        {т:'50', ок:true,  почему:'60 : 6 · 5 = 50.'},
        {т:'72', ок:false, почему:'72 больше часа.'}]},
    { вопрос:'Три четверти верёвки равны 9 м. Какова вся верёвка?', варианты:[
        {т:'12 м', ок:true,  почему:'9 : 3 = 3 — четверть, 3 · 4 = 12.'},
        {т:'6,75 м', ок:false, почему:'Это 9 · 3/4 — так часть не находят.'}]}
  ];
  function F11(s){
    const пройдено = s.практика||0;
    const готово = пройдено>=УРОВНИ.length;
    const и = Math.min(пройдено, УРОВНИ.length-1);
    if(готово){
      return ТОЧКИ(УРОВНИ.length, и, пройдено) +
        ВОПРОС('Все пять уровней пройдены. Что помогало?') +
        РАЗБОР(true,'Главное — понять, что дано: целое или часть. От этого зависит, делим мы на знаменатель или на числитель.') +
        `<div class="ask">${BTN(4,'','пройти заново','r1034Reset()')}</div>`;
    }
    const ур=УРОВНИ[и];
    const выбран = (s.практикаУровень===и) ? s.практикаВыбор : null;
    return ТОЧКИ(УРОВНИ.length, и, пройдено) +
      A(2,'cap','Уровень '+(и+1)+' из '+УРОВНИ.length) +
      ВОПРОС(ур.вопрос) +
      '<div class="ask">' + ур.варианты.map((в,к)=>
        BTN(3+к, выбран===к?(в.ок?'hit':'miss'):'', в.т, `r1034Pick(${и},${к})`)).join('') + '</div>' +
      (выбран!=null ? РАЗБОР(ур.варианты[выбран].ок, ур.варианты[выбран].почему) : ЖДЁТ()) +
      ПРАВИЛО('Ищем часть — <b>делим на знаменатель</b>; ищем целое — <b>делим на числитель</b>.');
  }

  /* 12–14. Три тренажёра */
  const Т1={
    имя:'Тренажёр 1 · часть от числа',
    задания:[
      { ф:'2/3 от 30', о:['20','45','10'], в:0, р:'30 : 3 · 2 = 20.' },
      { ф:'3/4 от 12', о:['9','16','4'], в:0, р:'12 : 4 · 3 = 9.' },
      { ф:'7/10 от 200', о:['140','70','1400'], в:0, р:'200 : 10 · 7 = 140.' },
      { ф:'2/5 от 15', о:['6','30','5'], в:0, р:'15 : 5 · 2 = 6.' }
    ]
  };
  const Т2={
    имя:'Тренажёр 2 · число по части',
    задания:[
      { ф:'2/3 числа равны 20. Чему равно число?', о:['30','13','40'], в:0, р:'20 : 2 · 3 = 30.' },
      { ф:'3/4 числа равны 9. Чему равно число?', о:['12','6,75','27'], в:0, р:'9 : 3 · 4 = 12.' },
      { ф:'5/6 часа — сколько минут?', о:['50','72','5'], в:0, р:'60 : 6 · 5 = 50.' },
      { ф:'4/5 числа равны 36. Чему равно число?', о:['45','28,8','180'], в:0, р:'36 : 4 · 5 = 45.' }
    ]
  };
  const Т3={
    имя:'Тренажёр 3 · смешанные задачи',
    задания:[
      { ф:'В классе 30 человек, 2/3 — девочки. Сколько девочек?', о:['20','10','45'], в:0, р:'30 : 3 · 2 = 20.' },
      { ф:'Три четверти верёвки — 9 м. Какая длина всей?', о:['12 м','6,75 м','36 м'], в:0, р:'9 : 3 · 4 = 12.' },
      { ф:'4/5 числа равны 36. Что делаем первым?', о:['36 : 4','36 · 5','36 · 4'], в:0, р:'Делим на числитель: 36 : 4 = 9.' },
      { ф:'2/5 числа — это 6. Чему равно число?', о:['15','12','2,4'], в:0, р:'6 : 2 · 5 = 15.' }
    ]
  };

  function тренер(набор, ключ, состояние, шаг){
    const з=набор.задания[шаг % набор.задания.length];
    const отв=состояние[ключ+'Ответ'], готово=отв!=null, верно=отв===з.в;
    const точки=Array.from({length:набор.задания.length},(_,к)=>
      `<span class="точка ${к<шаг?'пройдено':(к===шаг?'сейчас':'')}"></span>`).join('');
    return A(0,'уровни',точки) +
      A(2,'карт вопрос','<span class="метка">'+набор.имя+'</span><div class="текст">'+з.ф+'</div>') +
      A(3,'cap','Уровень '+(шаг+1)+' из '+набор.задания.length) +
      '<div class="ask">' + з.о.map((о,к)=>
        BTN(4+к, готово&&к===з.в?'hit':(готово&&к===отв?'miss':''), о, `r1034T('${ключ}',${к})`)).join('') + '</div>' +
      (готово ? РАЗБОР(верно, з.р) : ЖДЁТ()) +
      `<p class="score">верно: ${состояние[ключ+'Верно']||0} · ошибок: ${состояние[ключ+'Ошибки']||0} · всего: ${набор.задания.length}</p>` +
      (готово ? `<div class="ask">${BTN(5,'','следующий вопрос',`r1034TNext('${ключ}')`)}</div>` : '');
  }
  function F12(s){ return тренер(Т1,'т1',s,s.т1Шаг||0); }
  function F13(s){ return тренер(Т2,'т2',s,s.т2Шаг||0); }
  function F14(s){ return тренер(Т3,'т3',s,s.т3Шаг||0); }

  const L1034={
    id: ID, title:'Задачи на дроби', ico:'🍰',
    src:'Математика · 5 класс · Дроби', subj:'math',
    explain: [
      'В классе 30 учеников, и две трети из них — девочки. Сколько это человек? Такие задачи называют задачами на дроби: в них известно целое, а найти нужно его часть. Есть и обратные задачи: известно, сколько составляет часть, а найти надо целое — например, сказано, что две трети класса равны 20 человекам, и надо узнать, сколько учеников всего.',

      'Разберём прямую задачу. Дробь 2/3 говорит: целое разделили на три равные части и взяли две. Значит, сначала находим одну часть: 30 : 3 = 10. Затем берём две такие части: 10 · 2 = 20. Получается 2/3 от 30 равны 20. Частая ошибка — сразу умножать на 2 и получать 60, а это больше всего класса. Как проверить себя: часть всегда меньше целого.',

      'Посмотрим на полосе. Целое — 30 — удобно изобразить полосой, разделённой на три равные части. Одна часть равна 10, две части — 20. Клетки на рисунке нужны только для сравнения: важно делить полосу именно на три части, как показывает знаменатель. Частая ошибка — делить на десять клеток и считать не те части. Как проверить себя: знаменатель подсказывает число частей.',

      'Теперь обратная задача. Известно, что 2/3 класса — это 20 человек. Сколько учеников всего? Раз две части равны 20, одна часть равна 20 : 2 = 10. Всего таких частей три, значит 10 · 3 = 30. Проверка: 2/3 от 30 действительно равны 20. Частая ошибка — прибавлять к 20 ещё треть вместо того, чтобы разделить. Как проверить себя: подставь ответ в прямую задачу.',

      'Сравним два случая. Если дано целое, а ищем часть, делим на знаменатель и умножаем на числитель: 30 : 3 · 2 = 20. Если дана часть, а ищем целое, порядок обратный: делим на числитель и умножаем на знаменатель: 20 : 2 · 3 = 30. В обеих задачах участвуют одни и те же числа, меняется только порядок действий. Частая ошибка — перепутать, на что делить. Как проверить себя: спроси, что дано.',

      'Перед решением полезно определить, что дано в задаче. Если сказано «две трети класса — девочки, сколько девочек?», дано целое, и мы ищем часть. Если сказано «две трети класса — это 20 человек, сколько всего?», дана часть, и мы ищем целое. От этого зависит действие. Частая ошибка — начинать считать, не разобравшись в условии. Как проверить себя: подчеркни, что известно.',

      'Проверим на длине. Верёвка 12 метров. Три четверти — это сколько? Знаменатель 4, значит делим на 4: 12 : 4 = 3 метра — одна четверть. Берём три части: 3 · 3 = 9 метров. Обратная задача: известно, что три четверти верёвки равны 9 метрам, тогда одна четверть 9 : 3 = 3 метра, а вся верёвка 3 · 4 = 12 метров. Частая ошибка — путать метры и число частей. Как проверить себя: одна четверть должна быть меньше трёх четвертей.',

      'Ещё пример со временем. Час содержит 60 минут. Пять шестых часа — это сколько? Делим 60 на 6 частей: 60 : 6 = 10 минут — одна часть. Берём пять частей: 10 · 5 = 50 минут. Остаётся 10 минут. Частая ошибка — ответить «5 минут», перепутав число частей с их размером. Как проверить себя: подумай, сколько минут в одной части.',

      'Разберём задачу про деньги. Требуется найти 7/10 от 200 рублей. Сначала одна десятая: 200 : 10 = 20 рублей. Затем семь десятых: 20 · 7 = 140 рублей. На рисунке это семь клеток из десяти. Частая ошибка — умножить 200 на 7 и получить 1400. Как проверить себя: сравни ответ с целым: 140 меньше 200.',

      'Соберём оба случая вместе. Ищем часть: делим на знаменатель, умножаем на числитель. Ищем целое: делим на числитель, умножаем на знаменатель. В обоих случаях помогает проверка: подставь найденное число в прямую задачу и посмотри, сходится ли. Частая ошибка — запомнить одно действие и применять его всегда. Как проверить себя: прочитай вопрос и найди, что дано.',

      'Пройти практику: пять уровней про часть от числа, число по его части, часы и верёвку. Дальше ждут три тренажёра: часть от числа, число по части и смешанные задачи.',

      'Первый тренажёр — часть от числа: делим на знаменатель и умножаем на числитель.',

      'Второй тренажёр — число по его части: порядок обратный, делим на числитель и умножаем на знаменатель.',

      'Третий тренажёр — смешанные задачи: сначала определи, что дано, и только потом считай.'
    ],
    check: {
      q:'2/3 от 30 — это сколько?',
      choices:['20','45','10'],
      ans:0,
      exp:'30 : 3 = 10 — одна треть, 10 · 2 = 20 — две трети.'
    },
    tasks: [
      { q:'3/4 от 12 — это сколько?', kind:'choice',
        choices:['9','16'], ans:0,
        hints:['12 : 4 — одна четверть.','3 · 3 = 9.'],
        sol:'9.' },
      { q:'2/3 числа равны 20. Чему равно число?', kind:'choice',
        choices:['30','13'], ans:0,
        hints:['20 : 2 — одна треть.','10 · 3 = 30.'],
        sol:'30.' },
      { q:'5/6 часа — сколько минут?', kind:'choice',
        choices:['50','5'], ans:0,
        hints:['60 : 6 = 10 минут в одной части.','10 · 5 = 50.'],
        sol:'50 минут.' },
      { q:'Три четверти верёвки равны 9 м. Какова вся верёвка?', kind:'choice',
        choices:['12 м','6,75 м'], ans:0,
        hints:['9 : 3 — одна четверть.','3 · 4 = 12.'],
        sol:'12 м.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L1034.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    let сцена='';
    if(f===1) сцена=F1(s);
    else if(f===2) сцена=F2(s);
    else if(f===3) сцена=F3(s);
    else if(f===4) сцена=F4(s);
    else if(f===5) сцена=F5(s);
    else if(f===6) сцена=F6(s);
    else if(f===7) сцена=F7(s);
    else if(f===8) сцена=F8(s);
    else if(f===9) сцена=F9(s);
    else if(f===10) сцена=F10(s);
    else if(f===11) сцена=F11(s);
    else if(f===12) сцена=F12(s);
    else if(f===13) сцена=F13(s);
    else сцена=F14(s);

    const ЗАГОЛОВКИ={
      1:['Класс','30 учеников и две трети'],
      2:['Делим на части','Одна треть — это 10'],
      3:['Полоса','30 : 3 · 2 = 20'],
      4:['Обратная задача','Часть известна'],
      5:['Два действия','Прямая и обратная'],
      6:['Что дано','Развилка решения'],
      7:['Верёвка','Три четверти от 12 м'],
      8:['Часы','Пять шестых часа'],
      9:['Покупка','Семь десятых от 200'],
      10:['Сводка','Четыре задачи'],
      11:['Практика','Пять уровней'],
      12:['Тренажёр 1','Часть от числа'],
      13:['Тренажёр 2','Число по части'],
      14:['Тренажёр 3','Смешанные задачи']
    };
    const з=ЗАГОЛОВКИ[f]||['Задачи на дроби','Часть и целое'];
    el.innerHTML = `<div class="s6 l1034" data-frame="${f}">
        <h2>${з[1]}</h2>
        ${сцена}
      </div>`;
  }

  window.r1034Класс=(к)=>{ S().класс=к; chRender(0); };
  window.r1034Делим=(к)=>{ S().делим=к; chRender(0); };
  window.r1034Полоса=(к)=>{ S().полоса=к; chRender(0); };
  window.r1034Обр=(к)=>{ S().обратно=к; chRender(0); };
  window.r1034Фор=(к)=>{ S().формулы=к; chRender(0); };
  window.r1034Разв=(к)=>{ S().развилка=к; chRender(0); };
  window.r1034Вер=(к)=>{ S().верёвка=к; chRender(0); };
  window.r1034Час=(к)=>{ S().часы=к; chRender(0); };
  window.r1034Пок=(к)=>{ S().покупка=к; chRender(0); };
  window.r1034Свод=(к)=>{ S().сводка=к; chRender(0); };
  window.r1034Pick=(уровень,вариант)=>{
    const s=S();
    s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1;
    chRender(0);
  };
  window.r1034Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r1034T=(ключ,вариант)=>{
    const s=S();
    if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const шаг=s[ключ+'Шаг']||0;
    const з=набор.задания[шаг % набор.задания.length];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0);
  };
  window.r1034TNext=(ключ)=>{
    const s=S();
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length;
    s[ключ+'Ответ']=null;
    chRender(0);
  };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){
        const место=arr.findIndex(L=>L && L.id===ID);
        if(место>=0) arr[место]=L1034; else arr.push(L1034);
      }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA1034={render:render, L:L1034};
})();
