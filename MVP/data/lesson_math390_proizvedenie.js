/* ====== МАТЕМАТИКА · УРОК 390 · «ПРАВИЛО ПРОИЗВЕДЕНИЯ: ЗАДАЧИ» ==================
   5–6 класс, олимпиадная комбинаторика. Переделан с нуля по эталону 1022
   (deploy/ЭТАЛОН_УРОКА.md) с богатыми рисунками (память: рисунки — сцена из
   сюжета). Прежние версии (vis_wk.js visW390 — 24 кадра текста про рубашки и
   галстуки, vis_bw.js) остаются в общих файлах; этот файл регистрируется
   поверх них.

   СЮЖЕТ — ИЗ ИСТОРИИ. 212 год до н. э., римский флот Марцелла стоит у стен
   Сиракуз, город держится машинами Архимеда. Ночью Архимед отправляет
   помощника — ребёнка — с донесением на маяк. По дороге всё решает счёт
   вариантов: сколько сигналов дают флаг и фонарь, сколько путей через город,
   сколько кодов у замка сундука с чертежом и успеет ли римский лазутчик
   перебрать их до рассвета, сколькими способами расставить зеркала на башнях.
   Ход квеста — «Донесение Архимеда» из трёх дел.

   ГЛАВНАЯ ОШИБКА ТЕМЫ — сложить вместо умножить — видна последствием: на
   дереве сигналов 12 листьев, а не 7; маршрутов 24, а не 3 + 2 + 4 = 9. Вторая
   ловушка — «и» против «или»: к башне ИЛИ морем, ИЛИ по стене — складываем.
   Третья — повторы и порядок: пароль и отзыв (5 · 4, а не 5 · 5 и не пополам),
   пары на вылазку (4 · 3 : 2), код без нуля и повторов (9 · 8 · 7).

   РУКАМИ: флаг и фонарь на башне — дерево подсвечивает свою ветку; улицы на
   карте тапом — маршрут собирается; диски замка крутятся; слова пароля;
   зеркала по башням — под башнями видно, сколько зеркал осталось на выбор.

   ВСЕ ЧИСЛА ПРОВЕРЕНЫ:
     сигналы 4 · 3 = 12 (ловушка 4 + 3 = 7);
     маршруты 3 · 2 · 4 = 24 (ловушка 3 + 2 + 4 = 9);
     морем ИЛИ стеной: 2 + 3 = 5 (ловушка 2 · 3 = 6);
     замок: 10 · 10 · 10 = 1 000 (ловушки 3 · 10 = 30, 999 — забыт 000);
       1 код за 3 с: 1 000 кодов = 3 000 с = 50 мин; четыре диска —
       10 000 кодов = 30 000 с = 500 мин = 8 ч 20 мин — до рассвета (8 ч) не успеть;
     пароль и отзыв — разные слова из 5, порядок важен: 5 · 4 = 20
       (ловушки 5 · 5 = 25, 20 : 2 = 10);
     4 зеркала на 4 башни: 4 · 3 · 2 · 1 = 24 (ловушки 4 · 4 = 16, 4+3+2+1 = 10);
     двое на вылазку из 4: 4 · 3 : 2 = 6 (ловушка 12);
     код из трёх разных цифр 1–9: 9 · 8 · 7 = 504 (ловушки 9³ = 729, 1 000).

   АНИМАЦИЯ по deploy/АНИМАЦИЯ_УРОКОВ.md; в каждом кадре есть <animate>, сдвиги
   animateTransform — с невидимым «заводом». Без движения каждый рисунок
   показывает конечное состояние. */
(function(){
  'use strict';

  const ID = 390;
  const GOLD='#ffd76a', GREEN='#8fe0b0', RED='#ff8a78', ЛУНА='#dfe8ff', ОГОНЬ='#ffb35c';
  const ИНК='#f5efe2', МУТ='#b3b8cf', ЛИНИЯ='#4d5680', ОБВОД='#0b0e1a';
  const ФЛАГИ = [{имя:'красный',ц:'#e0503c'},{имя:'синий',ц:'#4f86e0'},{имя:'зелёный',ц:'#4fb071'},{имя:'золотой',ц:'#e8b84a'}];
  const ФОНАРИ = ['вверху','посередине','внизу'];

  const ДЕЛА = [
    {ключ:'сигналы', имя:'Сосчитать сигналы башни',     итог:'12'},
    {ключ:'маршрут', имя:'Сосчитать пути к маяку',       итог:'24'},
    {ключ:'замок',   имя:'Запереть чертёж до рассвета',  итог:'10 000 кодов'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const CSS=`
  #lvis .s6.l390{gap:14px}
  #lvis .s6.l390 .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l390 .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l390 .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#232845,#151a30);border:1.5px solid var(--line)}
  #lvis .s6.l390 .карт.задача{border-color:${GOLD}}
  #lvis .s6.l390 .карт.верно{border-color:${GREEN}}
  #lvis .s6.l390 .карт.ошибка{border-color:${RED}}
  #lvis .s6.l390 .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l390 .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l390 .карт .текст b{color:${GOLD}}
  #lvis .s6.l390 .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l390 .правило b{color:${GOLD}}
  #lvis .s6.l390 .лист{width:100%;padding:12px 14px;border-radius:16px;
    background:linear-gradient(180deg,rgba(255,179,92,.14),rgba(255,179,92,.04));
    border:1.5px solid rgba(255,179,92,.5);display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l390 .лист .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l390 .лист .шапка b{font-size:20px;letter-spacing:0;text-transform:none;color:${ОГОНЬ}}
  #lvis .s6.l390 .лист .шапка b.готово{color:${GREEN}}
  #lvis .s6.l390 .лист ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l390 .лист li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:${МУТ}}
  #lvis .s6.l390 .лист li i{flex:0 0 22px;width:22px;height:22px;border-radius:7px;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;
    border:1.5px solid rgba(255,255,255,.22);color:var(--mut)}
  #lvis .s6.l390 .лист li.есть{color:${ИНК}}
  #lvis .s6.l390 .лист li.есть i{border-color:${GREEN};color:${GREEN};background:rgba(143,224,176,.14)}
  #lvis .s6.l390 .лист li span{margin-left:auto;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--mut);font-size:14px}
  #lvis .s6.l390 .лист li.есть span{color:${GREEN}}

  #lvis .s6.l390 .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l390 .ряд.к2{grid-template-columns:repeat(2,1fr)}
  #lvis .s6.l390 .ряд.к3{grid-template-columns:repeat(3,1fr)}
  #lvis .s6.l390 .ряд.к4{grid-template-columns:repeat(4,1fr)}
  #lvis .s6.l390 .ряд.к5{grid-template-columns:repeat(5,1fr)}
  #lvis .s6.l390 .ряд button{min-height:52px;padding:6px 4px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-weight:700;
    border:1.5px solid rgba(255,179,92,.5);background:rgba(255,179,92,.12);color:${ИНК};line-height:1.15;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;font-variant-numeric:tabular-nums;
    overflow-wrap:anywhere;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l390 .ряд button:active{transform:translateY(2px);background:rgba(255,179,92,.26)}
  #lvis .s6.l390 .ряд button:disabled{opacity:.3;cursor:not-allowed}
  #lvis .s6.l390 .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.2);color:${GOLD}}
  #lvis .s6.l390 .ряд button i{display:block;width:18px;height:18px;border-radius:5px;margin:0 auto 3px;border:1px solid rgba(0,0,0,.4)}

  #lvis .s6.l390 .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l390 .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:16px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l390 .ask button:active{transform:translateY(2px)}
  #lvis .s6.l390 .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l390 .ask button.miss{border-color:var(--no)}
  #lvis .s6.l390 .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-variant-numeric:tabular-nums;font-size:18px}
  #lvis .s6.l390 .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-variant-numeric:tabular-nums;font-size:20px}

  #lvis .s6.l390 .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l390 .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09);
    transition:background 200ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l390 .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l390 .уровни .точка.сейчас{background:${GOLD};animation:l390dot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l390dot{0%,100%{opacity:1}50%{opacity:.6}}
  #lvis .s6.l390 .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l390{-webkit-text-size-adjust:100%}
  #lvis .s6.l390 [data-anim]{animation:l390rise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l390rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l390 [data-anim]{animation:none!important}
    #lvis .s6.l390 .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l390 button{transition:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l390-style');
      if(!s){ s=document.createElement('style'); s.id='l390-style'; document.head.appendChild(s); }
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
  const BTN = (i,cls,html,on,выкл) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" onclick="${on}"${выкл?' disabled':''}>${html}</button>`;
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Донесение</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,обр) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(4+к, в===к?(к===верный?'hit':'miss'):'', v, обр+"("+к+")")).join('')}</div>`;

  const ЛИСТ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'лист',
      `<div class="шапка"><span>Донесение Архимеда</span><b class="${всё?'готово':''}">${
        всё?'доставлено':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}
           <span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const КРИВАЯ = '0.23 1 0.32 1';
  const сплайны = (n) => Array.from({length:n},()=>КРИВАЯ).join(';');
  const анК = (имя,значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const ЗАВОД = `<rect width="0" height="0" fill="none"><animate attributeName="x" values="0;0" dur="1s" repeatCount="indefinite"/></rect>`;
  const анСдвиг = (значения,длит,keyTimes) =>
    ДВИЖ ? `<animateTransform attributeName="transform" type="translate" values="${значения}" dur="${длит}"
              repeatCount="indefinite" calcMode="spline" keyTimes="${keyTimes}"
              keySplines="${сплайны(keyTimes.split(';').length-1)}"/>${ЗАВОД}` : '';
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.55;0.55;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  const тыс = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ');

  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <linearGradient id="c390-ночь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b1030"/><stop offset="0.6" stop-color="#1b2352"/><stop offset="1" stop-color="#2a2d5a"/>
      </linearGradient>
      <linearGradient id="c390-рассвет" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2b3a74"/><stop offset="0.55" stop-color="#c7708a"/><stop offset="1" stop-color="#ffc98a"/>
      </linearGradient>
      <linearGradient id="c390-море" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#23365f"/><stop offset="1" stop-color="#0a1428"/>
      </linearGradient>
      <radialGradient id="c390-луна" cx="0.4" cy="0.4" r="0.6">
        <stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="#dfe6ff"/><stop offset="1" stop-color="#aeb9e6"/>
      </radialGradient>
      <radialGradient id="c390-ореол" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#dfe8ff" stop-opacity=".45"/><stop offset="1" stop-color="#dfe8ff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c390-пламя" cx="0.5" cy="0.6" r="0.5">
        <stop offset="0" stop-color="#fff6c8"/><stop offset="0.4" stop-color="#ffb35c"/><stop offset="1" stop-color="#ff6a3c" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c390-камень" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8b8398"/><stop offset="1" stop-color="#4a4459"/>
      </linearGradient>
      <linearGradient id="c390-стена" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5d566e"/><stop offset="1" stop-color="#2f2a3d"/>
      </linearGradient>
      <linearGradient id="c390-дерево" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8a5a31"/><stop offset="0.5" stop-color="#6d4424"/><stop offset="1" stop-color="#4a2c15"/>
      </linearGradient>
      <linearGradient id="c390-бронза" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f2cf85"/><stop offset="0.45" stop-color="#c08a3c"/><stop offset="1" stop-color="#6a4515"/>
      </linearGradient>
      <radialGradient id="c390-зеркало" cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stop-color="#fffbe8"/><stop offset="0.5" stop-color="#e8c56a"/><stop offset="1" stop-color="#8a5f1c"/>
      </radialGradient>
      <linearGradient id="c390-пергамент" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4e6c6"/><stop offset="1" stop-color="#d8bf8a"/>
      </linearGradient>
      <linearGradient id="c390-луч" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff1b8" stop-opacity=".85"/><stop offset="1" stop-color="#fff1b8" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="c390-галера" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a2a22"/><stop offset="1" stop-color="#2a120e"/>
      </linearGradient>
      <filter id="c390-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.8" flood-color="#000" flood-opacity=".55"/>
      </filter>
    </defs>`;

  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const небо = (в,луна) => `<rect x="0" y="0" width="336" height="${в}" fill="url(#c390-ночь)"/>
    ${[[22,18],[64,40],[110,14],[150,34],[196,20],[236,46],[288,16],[318,38],[40,62],[270,70]].map((з,i)=>
      `<circle cx="${з[0]}" cy="${з[1]}" r="${i%3?0.9:1.4}" fill="#fff" opacity=".75">${анЛин('opacity','0.75;0.2;0.75',(2.1+i*0.33).toFixed(2)+'s')}</circle>`).join('')}
    ${луна?`<circle cx="${луна[0]}" cy="${луна[1]}" r="34" fill="url(#c390-ореол)"/>
      <circle cx="${луна[0]}" cy="${луна[1]}" r="14" fill="url(#c390-луна)"/>
      <circle cx="${луна[0]-4}" cy="${луна[1]-3}" r="2.4" fill="#c9d2f0" opacity=".6"/>
      <circle cx="${луна[0]+5}" cy="${луна[1]+4}" r="1.6" fill="#c9d2f0" opacity=".6"/>`:''}`;
  const море = (y,в,луна) => `<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c390-море)"/>
    ${луна?`<path d="M${луна-18} ${y+4} h36 M${луна-12} ${y+12} h24 M${луна-22} ${y+22} h44 M${луна-8} ${y+32} h16" stroke="#dfe8ff" stroke-width="1.6" opacity=".55">
      ${анЛин('opacity','0.55;0.25;0.55','3s')}</path>`:''}
    ${[0,1,2,3].map(i=>`<path d="M${-30+i*17} ${y+8+i*11} q30 -3 60 0 t60 0 t60 0 t60 0 t60 0 t60 0" fill="none"
      stroke="#9fb6ff" stroke-width="1" opacity="${(0.35-i*0.06).toFixed(2)}" stroke-dasharray="14 20">
      ${анЛин('stroke-dashoffset','0;-34',(3.4+i*0.5).toFixed(1)+'s')}</path>`).join('')}`;
  /* зубчатая стена с башнями; факелы мерцают */
  const стена = (y,в,башни) => {
    let s=`<rect x="0" y="${y}" width="336" height="${в-y}" fill="url(#c390-стена)"/>`;
    for(let x=0;x<336;x+=16) s+=`<rect x="${x}" y="${y-8}" width="10" height="9" fill="url(#c390-стена)"/>`;
    for(let r=0;r<3;r++) for(let x=(r%2)*12;x<336;x+=24) s+=`<rect x="${x}" y="${y+6+r*12}" width="23" height="11" fill="none" stroke="#24202f" stroke-width=".8" opacity=".6"/>`;
    (башни||[]).forEach((б,i)=>{
      s+=`<g filter="url(#c390-тень)"><rect x="${б-16}" y="${y-44}" width="32" height="46" fill="url(#c390-камень)" stroke="${ОБВОД}" stroke-width="1"/>
        ${[0,1,2].map(к=>`<rect x="${б-16+к*12}" y="${y-52}" width="8" height="9" fill="url(#c390-камень)"/>`).join('')}
        <rect x="${б-4}" y="${y-30}" width="8" height="12" rx="4" fill="#1a1422"/></g>`;
      s+=факел(б+20,y-18,i);
    });
    return s;
  };
  const факел = (x,y,i) => `<g><line x1="${x}" y1="${y}" x2="${x}" y2="${y+12}" stroke="#4a2c15" stroke-width="2.4"/>
    <ellipse cx="${x}" cy="${y-4}" rx="5" ry="8" fill="url(#c390-пламя)">${анЛин('ry','8;10;7;8',(0.9+(i||0)*0.17).toFixed(2)+'s')}</ellipse>
    <circle cx="${x}" cy="${y-2}" r="16" fill="url(#c390-пламя)" opacity=".25">${анЛин('opacity','0.25;0.4;0.2;0.25',(1.1+(i||0)*0.2).toFixed(2)+'s')}</circle></g>`;
  const галера = (x,y,м,налево) => `<g transform="translate(${x} ${y}) scale(${(налево?-1:1)*(м||1)} ${м||1})">
    <path d="M-46 0 q10 12 46 12 q34 0 46 -10 l6 -8 q-6 2 -10 6 z" fill="url(#c390-галера)" stroke="${ОБВОД}" stroke-width="1"/>
    ${[-34,-24,-14,-4,6,16,26].map(ox=>`<line x1="${ox}" y1="8" x2="${ox-8}" y2="22" stroke="#2a120e" stroke-width="1.6"/>`).join('')}
    <line x1="0" y1="0" x2="0" y2="-38" stroke="#2a120e" stroke-width="2.2"/>
    <path d="M-20 -34 h40 v22 h-40 z" fill="#7a2e26" stroke="${ОБВОД}" stroke-width=".8"/>
    <path d="M-6 -30 l6 6 l6 -6 M-6 -20 l6 6 l6 -6" fill="none" stroke="#e8b84a" stroke-width="1.4"/>
  </g>`;
  const гонец = (x,y) => `<g transform="translate(${x} ${y})" filter="url(#c390-тень)">
    <circle cx="0" cy="-26" r="6" fill="#e9c29a"/>
    <path d="M-6 -28 q6 -8 12 0" fill="#3a2410"/>
    <path d="M-7 -19 h14 l3 18 h-20 z" fill="#c8683e"/>
    <path d="M-5 -1 l-3 12 M5 -1 l3 12" stroke="#3a2410" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="7" y="-17" width="10" height="4" rx="2" fill="url(#c390-пергамент)" stroke="#8a6a3a" stroke-width=".6"/>
  </g>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.66+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c390-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(11,14,26,.9)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };

  /* ================= КАДРЫ ================= */

  /* 1. Ночь осады */
  function F1(s){
    const Н=286;
    return ЛИСТ(s) +
      ЗАДАЧА('212 год до нашей эры. У стен Сиракуз — римский флот Марцелла. Город держится машинами Архимеда. Ночью Архимед зовёт тебя: «Донеси это на маяк. По дороге тебе придётся <b>считать варианты</b> — сигналы, пути, коды. Ошибёшься в счёте — нас переиграют».') +
      `<div class="pic">${свг(`
        ${небо(Н,[270,52])}
        ${море(150,Н,270)}
        <g>${анСдвиг('0 0;-10 2;0 0','9s','0;0.5;1')}${галера(236,168,0.9)}</g>
        <g>${анСдвиг('0 0;8 -2;0 0','11s','0;0.5;1')}${галера(310,184,0.7)}</g>
        ${стена(222,Н,[40,120])}
        ${гонец(178,212)}
        ${подпись(168,28,'Сиракузы в осаде',GOLD,16)}
        ${подпись(168,Н-14,'донесение — на маяк до рассвета',ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Главный приём','Если выбор делают по шагам — сначала одно, <b>и</b> потом другое, — варианты <b>умножают</b>: для каждого первого выбора годится любой второй.') +
      ПРАВИЛО('Шаг за шагом — <b>умножаем</b> число вариантов каждого шага.');
  }

  /* 2. Сигналы башни: дерево возможностей */
  function F2(s){
    const Н=276, ф=s.флаг2, фн=s.фонарь2, в=s.ответ2;
    const видели = s.видели2||[];
    const корень=[250,52], уз=(i)=>[196+i*36,110], лист=(i,j)=>[196+i*36+(j-1)*11,178];
    let дерево=`<circle cx="${корень[0]}" cy="${корень[1]}" r="6" fill="${GOLD}"/>`;
    ФЛАГИ.forEach((фл,i)=>{
      const [x,y]=уз(i), вкл=ф===i;
      дерево+=`<line x1="${корень[0]}" y1="${корень[1]}" x2="${x}" y2="${y}" stroke="${вкл?GOLD:'rgba(255,255,255,.3)'}" stroke-width="${вкл?2.6:1.2}"/>`;
      [0,1,2].forEach(j=>{
        const [lx,ly]=лист(i,j), этот=вкл&&фн===j, был=видели.includes(i+'-'+j);
        дерево+=`<line x1="${x}" y1="${y}" x2="${lx}" y2="${ly}" stroke="${этот?GOLD:'rgba(255,255,255,.25)'}" stroke-width="${этот?2.4:1}"/>
          <circle cx="${lx}" cy="${ly}" r="${этот?5:3.6}" fill="${этот?GOLD:(был?фл.ц:'rgba(255,255,255,.35)')}">${этот?анЛин('r','5;6.5;5','1.2s'):''}</circle>`;
      });
      дерево+=`<circle cx="${x}" cy="${y}" r="8" fill="${фл.ц}" stroke="${вкл?GOLD:ОБВОД}" stroke-width="${вкл?2.2:1}"/>`;
    });
    const башня = `<g filter="url(#c390-тень)">
      <rect x="44" y="96" width="46" height="150" fill="url(#c390-камень)" stroke="${ОБВОД}" stroke-width="1"/>
      ${[0,1,2].map(к=>`<rect x="${44+к*17}" y="86" width="12" height="11" fill="url(#c390-камень)"/>`).join('')}
      <line x1="67" y1="86" x2="67" y2="30" stroke="#3b2413" stroke-width="3"/>
      ${ф!=null?`<path d="M68 32 q20 -4 34 6 q-14 8 -34 6 z" fill="${ФЛАГИ[ф].ц}" stroke="${ОБВОД}" stroke-width=".8">
          ${анЛин('d','M68 32 q20 -4 34 6 q-14 8 -34 6 z;M68 32 q18 4 34 4 q-16 4 -34 8 z;M68 32 q20 -4 34 6 q-14 8 -34 6 z','1.8s')}</path>`:''}
      ${[0,1,2].map(j=>`<g><line x1="90" y1="${120+j*38}" x2="104" y2="${120+j*38}" stroke="#3b2413" stroke-width="2"/>
        <rect x="100" y="${122+j*38}" width="10" height="14" rx="2" fill="${фн===j?'#ffcf6a':'#2a2433'}" stroke="${ОБВОД}" stroke-width=".8"/>
        ${фн===j?`<circle cx="105" cy="${129+j*38}" r="16" fill="url(#c390-пламя)" opacity=".7">${анЛин('opacity','0.7;0.45;0.7','1.3s')}</circle>`:''}</g>`).join('')}
    </g>`;
    const разборы = ['7 = 4 + 3 — так считают, если выбирают <b>или</b> флаг, <b>или</b> фонарь. А на башне горят оба сразу: к каждому флагу — любой из 3 фонарей.',
      'Дерево: 4 ветки флагов, от каждой по 3 фонаря — <b>4 · 3 = 12</b> листьев, 12 разных сигналов.',
      '4 — это только флаги. Но при каждом флаге фонарь можно повесить ещё тремя способами.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Первая башня. Защитники подают сигналы: <b>флаг</b> одного из 4 цветов и <b>фонарь</b> на одной из 3 высот. Собери сигнал кнопками и посмотри, какая ветка дерева загорится.') +
      `<div class="pic">${свг(`
        ${небо(Н)}
        ${башня}
        <rect x="174" y="30" width="150" height="176" rx="12" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.14)"/>
        ${т(250,24,'дерево сигналов',12,МУТ)}
        ${дерево}
        ${т(250,198,'листьев: '+(в===1?'4 · 3 = 12':'?'),12,в===1?GREEN:МУТ,true)}
        ${подпись(168,Н-14, ф!=null&&фн!=null ? ФЛАГИ[ф].имя+' флаг, фонарь '+ФОНАРИ[фн] : 'выбери флаг и фонарь', ф!=null&&фн!=null?GOLD:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд к4">${ФЛАГИ.map((фл,i)=>BTN(3,ф===i?'вкл':'',`<i style="background:${фл.ц}"></i>${фл.имя}`,"r390Флаг("+i+")")).join('')}</div>` +
      `<div class="ряд к3">${ФОНАРИ.map((п,j)=>BTN(4,фн===j?'вкл':'','фонарь '+п,"r390Фонарь("+j+")")).join('')}</div>` +
      ОТВЕТЫ('три',['7','12','4'],1,в,'r390Отв2') +
      (в==null ? СКАЗ('Вопрос','Сколько разных сигналов может подать башня?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>Дерево возможностей</b>: ветки первого шага, от каждой — ветки второго. Листья = произведение.') : '');
  }

  /* 3. Пути через ночной город */
  const УЗЛЫ = [[38,150,'Мастерская'],[126,150,'Агора'],[214,150,'Порт'],[300,150,'Маяк']];
  const УЛИЦЫ = [[-46,0,46],[-34,34],[-66,-22,22,66]];   /* изгиб каждой улицы на отрезке */
  const улица = (отр,изгиб) => { const a=УЗЛЫ[отр], b=УЗЛЫ[отр+1]; return `M${a[0]} ${a[1]} Q${(a[0]+b[0])/2} ${a[1]+2*изгиб} ${b[0]} ${b[1]}`; };
  function F3(s){
    const Н=290, путь=s.путь3||[null,null,null], в=s.ответ3;
    const собран = путь.every(п=>п!=null);
    const номер = собран ? путь[0]*8+путь[1]*4+путь[2]+1 : null;
    let улицы='', мишени='';
    УЛИЦЫ.forEach((изгибы,отр)=>изгибы.forEach((изг,к)=>{
      const вкл = путь[отр]===к, d=улица(отр,изг);
      улицы+=`<path d="${d}" fill="none" stroke="#6d5a3a" stroke-width="7" stroke-linecap="round" opacity=".55"/>
        <path d="${d}" fill="none" stroke="${вкл?GOLD:'#c9ad76'}" stroke-width="${вкл?4:2}" stroke-linecap="round"
          ${вкл?'stroke-dasharray="8 6"':''}>${вкл?анЛин('stroke-dashoffset','0;-28','1s'):''}</path>`;
      мишени+=`<path d="${d}" fill="none" stroke="rgba(255,255,255,.001)" stroke-width="34" stroke-linecap="round"
        style="cursor:pointer" pointer-events="stroke" onclick="r390Улица(${отр},${к})"/>`;
    }));
    const дома = [[70,70],[170,60],[256,76]].map((д,i)=>`<g opacity=".55">
      <rect x="${д[0]-9}" y="${д[1]-7}" width="18" height="12" fill="#b99a64"/><path d="M${д[0]-11} ${д[1]-7} L${д[0]} ${д[1]-15} L${д[0]+11} ${д[1]-7} Z" fill="#9a7a48"/></g>`).join('');
    const узлы = УЗЛЫ.map((у,i)=>`<g filter="url(#c390-тень)"><circle cx="${у[0]}" cy="${у[1]}" r="12" fill="${i===3?'#ffcf6a':'#6d4424'}" stroke="${ОБВОД}" stroke-width="1.2"/>
      ${т(у[0],у[1]+5,String.fromCharCode(1040+i),13,i===3?'#3a2410':ИНК,true)}</g>
`).join('');
    const счёт = УЛИЦЫ.map((u,i)=>т((УЗЛЫ[i][0]+УЗЛЫ[i+1][0])/2, 42, u.length+' '+(u.length===1?'улица':(u.length<5?'улицы':'улиц')),12,'#6a4b22',true)).join('');
    const разборы = ['3 + 2 + 4 = 9 — так вышло бы, если бы все улицы вели прямо к маяку. Но путь идёт <b>через</b> Агору и Порт: каждая из 3 первых улиц продолжается любой из 2, а та — любой из 4.',
      '<b>3 · 2 · 4 = 24</b>: на каждом шаге число путей умножается на число улиц этого шага.',
      '4 — это только улицы последнего шага. До Порта уже 3 · 2 = 6 разных путей, и каждый продолжается 4 улицами.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Город ночью. От мастерской Архимеда до маяка — через Агору и Порт. Римские лазутчики стерегут улицы, поэтому гонцы каждый раз идут разным путём. <b>Проложи путь</b>: тапни по улице на каждом отрезке.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="#1a1530"/>
        <g filter="url(#c390-тень)"><rect x="8" y="16" width="320" height="${Н-44}" rx="10" fill="url(#c390-пергамент)"/></g>
        ${дома}${счёт}
        ${т(168,Н-58,'А — мастерская · Б — агора · В — порт · Г — маяк',12,'#4a3218',true)}
        <g pointer-events="none">${улицы}${узлы}
          ${собран?`<g>${анСдвиг('0 0;0 -3;0 0','1.4s','0;0.5;1')}${гонец(300,128)}</g>`:''}</g>
        ${мишени}
        <g transform="translate(300 52)" opacity=".7"><circle r="13" fill="none" stroke="#6a4b22"/><path d="M0 -13 L3 0 L0 13 L-3 0 Z" fill="#6a4b22"/>${т(0,-16,'С',10,'#6a4b22',true)}</g>
        ${подпись(168,Н-10, собран?'твой путь № '+номер+(в===1?' из 24':''):'выбери улицу на каждом отрезке', собран?GOLD:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['9','24','4'],1,в,'r390Отв3') +
      (в==null ? СКАЗ('Вопрос','Сколько всего разных путей от мастерской до маяка?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Шагов больше двух — <b>перемножаем все</b>: 3 · 2 · 4.') : '');
  }

  /* 4. «И» или «ИЛИ» */
  function F4(s){
    const Н=258, в=s.ответ4;
    const лодки = [0,1].map(i=>`<g>${анСдвиг('0 0;0 -2;0 0',(2.6+i*0.4).toFixed(1)+'s','0;0.5;1')}<g transform="translate(${48+i*56} 214)" filter="url(#c390-тень)">
      <path d="M-20 0 q20 12 40 0 z" fill="url(#c390-дерево)" stroke="${ОБВОД}" stroke-width=".8"/>
      <line x1="0" y1="0" x2="0" y2="-22" stroke="#3b2413" stroke-width="1.6"/><path d="M1 -20 l12 10 h-12 z" fill="#f4ead2"/></g></g>`).join('');
    const лестницы = [0,1,2].map(i=>`<g transform="translate(${214+i*34} 110)">
      <line x1="-6" y1="0" x2="-6" y2="80" stroke="#8a5a31" stroke-width="2.4"/><line x1="6" y1="0" x2="6" y2="80" stroke="#8a5a31" stroke-width="2.4"/>
      ${[0,1,2,3,4,5].map(к=>`<line x1="-6" y1="${8+к*13}" x2="6" y2="${8+к*13}" stroke="#8a5a31" stroke-width="1.6"/>`).join('')}</g>`).join('');
    const разборы = ['2 · 3 = 6 — так было бы, если бы нужно было и плыть, <b>и</b> потом лезть. А тут выбирают <b>один</b> способ: или морем, или по стене.',
      'Или одна из 2 лодок, или одна из 3 лестниц: способов <b>2 + 3 = 5</b>. Выбор «или» — складываем.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Дальше — к сигнальной башне на мысу. Туда можно добраться <b>или</b> морем — есть 2 лодки, <b>или</b> по стене — есть 3 лестницы. Сколько всего способов?') +
      `<div class="pic">${свг(`
        ${небо(Н,[60,40])}
        ${море(196,Н,60)}
        <rect x="190" y="96" width="146" height="${Н-96}" fill="url(#c390-стена)"/>
        ${[0,1,2,3,4,5,6,7,8].map(к=>`<rect x="${190+к*16}" y="88" width="10" height="9" fill="url(#c390-стена)"/>`).join('')}
        ${лестницы}${лодки}
        ${т(76,186,'2 лодки',14,ЛУНА,true,undefined,'#0b1030')}
        ${т(248,84,'3 лестницы',14,ОГОНЬ,true,undefined,'#0b1030')}
        ${т(168,150,'ИЛИ',20,GOLD,true,undefined,'#0b1030')}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('пара',['6','5'],1,в,'r390Отв4') +
      (в==null ? СКАЗ('Вопрос','Сколько способов добраться до башни?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>«И»</b> (одно и потом другое) — умножаем. <b>«ИЛИ»</b> (что-то одно) — складываем.') : '');
  }

  /* 5. Замок сундука с чертежом */
  function F5(s){
    const Н=282, диски=s.диски5||[0,0,0,0], четыре=!!s.четвёртый5, в=s.ответ5, в2=s.ответ5б;
    const n = четыре?4:3, ш=46, x0=168-n*ш/2;
    const колёса = Array.from({length:n},(_,к)=>`<g filter="url(#c390-тень)">
      <rect x="${x0+к*ш+3}" y="112" width="${ш-6}" height="74" rx="8" fill="url(#c390-бронза)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${x0+к*ш+9}" y="118" width="${ш-18}" height="62" rx="5" fill="#2a1a0c"/>
      ${/* соседние цифры колеса — выше и ниже, не касаясь крупной */''}
      ${т(x0+к*ш+ш/2,131,String((диски[к]+9)%10),12,'#7a5a2a')}
      ${т(x0+к*ш+ш/2,158,String(диски[к]),24,GOLD,true)}
      ${т(x0+к*ш+ш/2,176,String((диски[к]+1)%10),12,'#7a5a2a')}</g>`).join('');
    const часы = `<g transform="translate(306 150)" filter="url(#c390-тень)">
      <path d="M-14 -34 h28 M-14 34 h28" stroke="#8a5a31" stroke-width="4" stroke-linecap="round"/>
      <path d="M-11 -32 q0 22 11 32 q-11 10 -11 32 h22 q0 -22 -11 -32 q11 -10 11 -32 z" fill="rgba(223,232,255,.18)" stroke="#cfd8f5" stroke-width="1.2"/>
      <path d="M-8 -28 h16 l-8 26 z" fill="#e8c56a">${анЛин('opacity','1;0.35;1','4s')}</path>
      <path d="M-8 30 h16 l-8 -12 z" fill="#e8c56a"/>
      <line x1="0" y1="-2" x2="0" y2="20" stroke="#e8c56a" stroke-width="1.4" stroke-dasharray="2 3">${анЛин('stroke-dashoffset','0;-10','0.6s')}</line>
    </g>`;
    const лазутчик = `<g transform="translate(24 190)" filter="url(#c390-тень)" opacity=".9">
      <path d="M-14 0 q0 -30 14 -34 q14 4 14 34 z" fill="#2a1f2e"/>
      <circle cx="0" cy="-38" r="8" fill="#2a1f2e"/><path d="M-4 -40 h8" stroke="#ffcf6a" stroke-width="1.6"/>
    </g>`;
    const разборы = ['3 · 10 = 30 — так считают, если бы каждый диск крутили отдельно. Но диски работают <b>вместе</b>: к каждой цифре первого — любая второго, к каждой паре — любая третьего.',
      'Каждый диск — 10 цифр, и они выбираются вместе: <b>10 · 10 · 10 = 1 000</b> кодов, от 000 до 999.',
      'От 000 до 999 — это 1 000 кодов, а не 999: <b>000 — тоже код</b>.'];
    const разборы2 = ['Новый диск не прибавляет 10 кодов, а <b>умножает</b> их число на 10: 1 000 · 10 = 10 000.',
      '<b>10 000</b> кодов по 3 секунды — 30 000 секунд, это 8 часов 20 минут. До рассвета 8 часов — лазутчик <b>не успеет</b>.'];
    return ЛИСТ(s) +
      ЗАДАЧА(!четыре
        ? 'В башне — сундук с чертежом «железной лапы», которая опрокидывает римские корабли. На замке три диска с цифрами от 0 до 9. Лазутчик пробует <b>один код за 3 секунды</b>. Покрути диски — сколько всего кодов ему перебирать?'
        : 'Архимед приделал к замку <b>четвёртый диск</b>. До рассвета 8 часов. Успеет ли лазутчик перебрать все коды?') +
      `<div class="pic">${свг(`
        ${небо(Н)}
        <rect x="0" y="206" width="336" height="${Н-206}" fill="#231c2c"/>
        ${лазутчик}
        <g filter="url(#c390-тень)">
          <path d="M${x0-26} 104 q0 -34 ${n*ш/2+26} -40 q${n*ш/2+26} 6 ${n*ш/2+26} 40 z" fill="url(#c390-дерево)" stroke="${ОБВОД}" stroke-width="1.2"/>
          <rect x="${x0-26}" y="104" width="${n*ш+52}" height="94" rx="6" fill="url(#c390-дерево)" stroke="${ОБВОД}" stroke-width="1.2"/>
          <rect x="${x0-26}" y="100" width="${n*ш+52}" height="10" fill="url(#c390-бронза)"/>
          <rect x="${x0-26}" y="188" width="${n*ш+52}" height="10" fill="url(#c390-бронза)"/>
        </g>
        ${колёса}
        ${часы}
        ${т(306,200,'1 код',12,МУТ,true)}${т(306,214,'за 3 с',12,МУТ,true)}
        ${подпись(168,Н-14, в===1 ? (четыре ? (в2===1?'10 000 · 3 с = 8 ч 20 мин':'кодов: 1 000 · 10 = ?') : '10 · 10 · 10 = 1 000 кодов = 50 минут') : 'код: '+диски.slice(0,n).join(''), в===1?GREEN:GOLD,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд к${n}">${Array.from({length:n},(_,к)=>BTN(3,'','диск '+(к+1)+' ▲',"r390Диск("+к+")")).join('')}</div>` +
      (!четыре
        ? ОТВЕТЫ('три',['30','1 000','999'],1,в,'r390Отв5') +
          (в==null ? СКАЗ('Вопрос','Сколько разных кодов у замка с тремя дисками?')
           : РАЗБОР(в===1, разборы[в]) + (в===1 ? СКАЗ('Опасно','1 000 кодов по 3 секунды — всего <b>50 минут</b>. До рассвета лазутчик откроет сундук! Архимед берётся за инструмент…') +
               `<div class="ask">${BTN(10,'','Добавить четвёртый диск →',"r390Четвёртый()")}</div>` : ''))
        : ОТВЕТЫ('',['Успеет: кодов станет 1 010','Не успеет: кодов 10 000 — это 8 ч 20 мин'],1,в2,'r390Отв5б') +
          (в2==null ? СКАЗ('Вопрос','Сколько кодов теперь и хватит ли лазутчику ночи?') : РАЗБОР(в2===1, разборы2[в2]))) +
      (в2===1 ? ПРАВИЛО('Каждый новый выбор <b>умножает</b> число вариантов: диск — ×10.') : '');
  }

  /* 6. Пароль и отзыв */
  const СЛОВА = ['сова','лира','дельфин','колонна','амфора'];
  function F6(s){
    const Н=250, п=s.пароль6, о=s.отзыв6, в=s.ответ6, мимо=s.мимо6;
    const табличка = (x,заг,слово,цвет) => `<g filter="url(#c390-тень)">
      <rect x="${x}" y="116" width="104" height="70" rx="8" fill="url(#c390-дерево)" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${x+8}" y="124" width="88" height="54" rx="4" fill="#3a2a1a"/>
      ${т(x+52,142,заг,12,МУТ,true)}
      ${т(x+52,168,слово||'…',16,слово?цвет:'#6a5a4a',true)}</g>`;
    const стражник = `<g transform="translate(168 150)" filter="url(#c390-тень)">
      <path d="M-14 36 v-34 q14 -10 28 0 v34 z" fill="#7a2e26"/>
      <circle cx="0" cy="-10" r="9" fill="#e9c29a"/>
      <path d="M-11 -12 q11 -18 22 0 z" fill="url(#c390-бронза)"/><path d="M0 -26 q8 -6 14 2" fill="none" stroke="#c0392b" stroke-width="3"/>
      <ellipse cx="-18" cy="14" rx="9" ry="14" fill="url(#c390-бронза)" stroke="${ОБВОД}" stroke-width=".8"/>
      <line x1="16" y1="-20" x2="16" y2="40" stroke="#8a5a31" stroke-width="2.4"/><path d="M13 -22 l3 -8 l3 8 z" fill="#cfd8f5"/>
    </g>`;
    const разборы = ['5 · 5 = 25 считает и пары «сова — сова». Но отзыв обязан <b>отличаться</b> от пароля: на второе место остаётся 4 слова.',
      'Пароль — любое из 5 слов, отзыв — любое из 4 оставшихся: <b>5 · 4 = 20</b>.',
      '20 : 2 = 10 — так считают, если порядок не важен. А тут «сова — лира» и «лира — сова» — <b>разные</b> пары: пароль говорит часовой, отзыв — ты.'];
    return ЛИСТ(s) +
      ЗАДАЧА('У ворот порта — часовой. Он говорит <b>пароль</b>, ты отвечаешь <b>отзывом</b>. Оба слова из пяти: сова, лира, дельфин, колонна, амфора, — и они должны быть <b>разными</b>. Составь пару.') +
      `<div class="pic">${свг(`
        ${небо(Н,[300,40])}
        <rect x="0" y="196" width="336" height="${Н-196}" fill="#231c2c"/>
        <path d="M104 196 V96 q64 -60 128 0 V196" fill="none" stroke="url(#c390-камень)" stroke-width="14"/>
        ${факел(92,120,0)}${факел(244,120,2)}
        ${табличка(8,'пароль',п!=null?СЛОВА[п]:null,GOLD)}
        ${стражник}
        ${табличка(224,'отзыв',о!=null?СЛОВА[о]:null,GREEN)}
        ${подпись(168,Н-14, п!=null&&о!=null ? 'на пароль — 5 слов, на отзыв — 4' : 'выбери пароль, потом отзыв', ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд к5">${СЛОВА.map((сл,i)=>BTN(3,(п===i||о===i)?'вкл':'',сл,"r390Слово("+i+")")).join('')}</div>` +
      (мимо ? РАЗБОР(false,'Слово «'+СЛОВА[п]+'» уже стало паролем — отзыв должен быть <b>другим</b>. Выбери из оставшихся четырёх.') : '') +
      ОТВЕТЫ('три',['25','20','10'],1,в,'r390Отв6') +
      (в==null ? СКАЗ('Вопрос','Сколько разных пар «пароль — отзыв» можно составить?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('<b>Без повторов</b> каждый следующий выбор — на один меньше: 5 · 4.') : '');
  }

  /* 7. Зеркала на башнях */
  const ЗЕРКАЛА = ['А','Б','В','Г'];
  function F7(s){
    const Н=276, стоят=s.зеркала7||[], в=s.ответ7, все=стоят.length===4;
    const башни = [56,128,200,272];
    let рис='';
    башни.forEach((x,i)=>{
      const з = стоят[i];
      рис+=`<g filter="url(#c390-тень)"><rect x="${x-18}" y="120" width="36" height="96" fill="url(#c390-камень)" stroke="${ОБВОД}" stroke-width="1"/>
        ${[0,1,2].map(к=>`<rect x="${x-18+к*13}" y="112" width="10" height="9" fill="url(#c390-камень)"/>`).join('')}</g>`;
      if(з!=null) рис+=`<g filter="url(#c390-тень)"><circle cx="${x}" cy="96" r="16" fill="url(#c390-зеркало)" stroke="#6a4515" stroke-width="1.4"/>
          ${т(x,101,ЗЕРКАЛА[з],14,'#3a2410',true)}</g>`;
      else рис+=`<circle cx="${x}" cy="96" r="16" fill="none" stroke="${МУТ}" stroke-width="1.4" stroke-dasharray="4 4"/>`;
      /* сколько зеркал было на выбор для этой башни */
      const выбор = 4-i, виден = i<=стоят.length;
      if(виден) рис+=т(x,238,String(выбор),20,i<стоят.length?GOLD:ИНК,true);
      if(i<3 && i<стоят.length) рис+=т(x+36,238,'·',20,МУТ,true);
    });
    const луч = все ? `<path d="M56 96 L336 60 L336 132 Z" fill="url(#c390-луч)" opacity=".7">${анЛин('opacity','0.7;0.35;0.7','1.6s')}</path>
      <g>${анСдвиг('0 0;40 4;40 4','5s','0;0.6;1')}${галера(300,80,0.55,true)}</g>` : `${галера(300,80,0.55,true)}`;
    const разборы = ['4 · 4 = 16 — так было бы, если бы одно зеркало могло стоять сразу на двух башнях. Но поставленное зеркало <b>уходит</b>: выбор каждый раз на одно меньше.',
      '4 + 3 + 2 + 1 = 10 — складывать нельзя: для <b>каждого</b> зеркала на первой башне есть 3 на вторую, для каждой такой пары — 2 на третью.',
      'На первую башню — 4 зеркала, на вторую — 3 оставшихся, потом 2, потом 1: <b>4 · 3 · 2 · 1 = 24</b>. Это называют <b>перестановками</b>, коротко 4! («четыре факториал»).'];
    return ЛИСТ(s) +
      ЗАДАЧА('Рассветает. На стене четыре башни, у Архимеда четыре бронзовых зеркала — А, Б, В и Г. Зеркала пускают солнечных зайчиков, слепящих римских кормчих. <b>Расставь зеркала по башням</b> слева направо и следи, из скольких выбираешь каждый раз.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c390-рассвет)"/>
        <circle cx="20" cy="70" r="30" fill="url(#c390-пламя)" opacity=".8">${анЛин('r','28;32;28','5s')}</circle>
        ${море(56,110)}
        ${луч}
        <rect x="0" y="210" width="336" height="${Н-210}" fill="url(#c390-стена)"/>
        ${рис}
        ${т(168,262,все?'4 · 3 · 2 · 1':'зеркал на выбор для каждой башни',12,все?GOLD:ИНК,true,undefined,'#2f2a3d')}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд к4">${ЗЕРКАЛА.map((з,i)=>BTN(3,стоят.includes(i)?'вкл':'','зеркало '+з,"r390Зеркало("+i+")",стоят.includes(i))).join('')}</div>` +
      (стоят.length ? `<div class="ask">${BTN(4,'','Снять зеркала',"r390Сброс7()")}</div>` : '') +
      ОТВЕТЫ('три',['16','10','24'],2,в,'r390Отв7') +
      (в==null ? СКАЗ('Вопрос','Сколькими способами можно расставить 4 зеркала на 4 башни?') : РАЗБОР(в===2, разборы[в])) +
      (в===2 ? ПРАВИЛО('<b>Перестановки</b> n предметов: n · (n − 1) · … · 1 = n!') : '');
  }

  /* 8. Вылазка: порядок не важен */
  const ВОИНЫ = ['Дион','Никий','Ламах','Феон'];
  function F8(s){
    const Н=276, в=s.ответ8;
    const cx=168, cy=122, R=70;
    const место = (i) => [cx+R*Math.cos(-Math.PI/2+i*Math.PI/2), cy+R*Math.sin(-Math.PI/2+i*Math.PI/2)];
    const пары=[]; for(let i=0;i<4;i++) for(let j=i+1;j<4;j++) пары.push([i,j]);
    const хорды = пары.map((п,к)=>{ const a=место(п[0]), b=место(п[1]);
      return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${GOLD}" stroke-width="2.4" stroke-linecap="round" opacity=".9">
        ${анК('opacity','0.15;0.15;0.95;0.95','7s','0;'+кт(0.06+к*0.12)+';'+кт(0.12+к*0.12)+';1')}</line>`; }).join('');
    const воины = ВОИНЫ.map((и,i)=>{ const [x,y]=место(i); return `<g filter="url(#c390-тень)">
      <circle cx="${x}" cy="${y}" r="20" fill="#2a2440" stroke="${МУТ}" stroke-width="1.2"/>
      <circle cx="${x}" cy="${y-5}" r="6" fill="#e9c29a"/><path d="M${x-7} ${y-6} q7 -12 14 0 z" fill="url(#c390-бронза)"/>
      <path d="M${x-8} ${y+12} q8 -12 16 0" fill="#7a2e26"/></g>
      ${т(x+(i===1?44:(i===3?-44:0)),y+(i===0?-26:(i===2?36:5)),и,12,ИНК,true,undefined,'#0b1030')}`; }).join('');
    const разборы = ['4 · 3 = 12 считает каждую пару <b>дважды</b>: «Дион и Никий» и «Никий и Дион» — один и тот же отряд. Поэтому 12 : 2 = 6.',
      'Первого — из 4, второго — из 3: 4 · 3 = 12 упорядоченных пар, и каждая посчитана дважды. <b>12 : 2 = 6</b> — ровно 6 отрезков на рисунке.',
      '8 = 4 · 2 — так не считают: каждый воин может идти в паре с любым из трёх других.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Архимед выбирает <b>двоих</b> из четырёх воинов, чтобы ночью поджечь римский таран. Кто первый, кто второй — неважно, важно лишь, кто идёт. Сколько разных пар?') +
      `<div class="pic">${свг(`
        ${небо(Н,[300,36])}
        ${факел(40,210,1)}${факел(296,210,3)}
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="1" stroke-dasharray="3 6"/>
        ${хорды}${воины}
        ${подпись(168,Н-12, в===1?'пар 4 · 3 : 2 = 6':'каждый отрезок — одна пара', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['12','6','8'],1,в,'r390Отв8') +
      (в==null ? СКАЗ('Вопрос','Сколько разных пар можно выбрать из четырёх воинов?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Если <b>порядок не важен</b>, произведение делят на число перестановок выбранных: 4 · 3 : 2.') : '');
  }

  /* 9. Код лазутчика: без нуля и без повторов */
  function F9(s){
    const Н=252, в=s.ответ9;
    const ячейка = (x,к,текст,н) => `<g filter="url(#c390-тень)">
      <rect x="${x}" y="86" width="64" height="74" rx="8" fill="url(#c390-пергамент)" stroke="#a7834b" stroke-width="1.2"/>
      ${т(x+32,124,к,28,'#3a2410',true)}
      ${т(x+32,146,текст,12,'#6a4b22')}
      <g>${анК('opacity','0.2;0.2;1;1','6s','0;'+кт(0.1+н*0.22)+';'+кт(0.18+н*0.22)+';1')}${т(x+32,184,н===0?'9':(н===1?'8':'7'),20,GOLD,true)}</g></g>`;
    const разборы = ['9 · 9 · 9 = 729 разрешает повторы: код 777 тоже посчитан. А цифры <b>разные</b> — каждая следующая выбирается из оставшихся.',
      'Первая — любая из 9 (нуля нет), вторая — из 8 оставшихся, третья — из 7: <b>9 · 8 · 7 = 504</b>.',
      '1 000 — это все коды от 000 до 999. Но нуля в коде нет, и цифры не повторяются — вариантов намного меньше.'];
    return ЛИСТ(s) +
      ЗАДАЧА('Перехвачена записка римлян: код их ворот — три <b>разные</b> цифры, и <b>нуля среди них нет</b>. Сколько кодов придётся проверить нашим разведчикам?') +
      `<div class="pic">${свг(`
        ${небо(Н)}
        <g filter="url(#c390-тень)"><path d="M40 40 h256 v10 q-128 10 -256 0 z" fill="url(#c390-пергамент)"/></g>
        ${т(168,34,'SPQR · код ворот',12,'#e8d2a0',true)}
        ${ячейка(52,'?','1-я цифра',0)}${ячейка(136,'?','2-я',1)}${ячейка(220,'?','3-я',2)}
        ${т(120,184,'·',20,МУТ,true)}${т(204,184,'·',20,МУТ,true)}
        ${т(168,206,'вариантов на каждое место',12,МУТ)}
        ${подпись(168,Н-12, в===1?'9 · 8 · 7 = 504':'нет нуля, цифры не повторяются', в===1?GREEN:ИНК,12)}
        ${рамка(Н)}
      `,Н)}</div>` +
      ОТВЕТЫ('три',['729','504','1 000'],1,в,'r390Отв9') +
      (в==null ? СКАЗ('Вопрос','Сколько таких кодов?') : РАЗБОР(в===1, разборы[в])) +
      (в===1 ? ПРАВИЛО('Сначала реши, <b>сколько вариантов на каждое место</b> с учётом всех условий, потом перемножь.') : '');
  }

  /* 10. Рассвет */
  function F10(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=276;
    return ЛИСТ(s) +
      ЗАДАЧА(всё
        ? 'Рассвет. Донесение на маяке, чертёж заперт, сигналы и пути сосчитаны. Римские галеры отходят от стен — в этот раз Сиракузы выстояли. Архимед кивает: «Ты считал, как настоящий механик».'
        : 'Рассвет близко, а в донесении ещё не всё — вернись и доделай. Вот что ты уже умеешь.') +
      `<div class="pic">${свг(`
        <rect x="0" y="0" width="336" height="${Н}" fill="url(#c390-рассвет)"/>
        <circle cx="168" cy="150" r="46" fill="url(#c390-пламя)" opacity=".9">${анЛин('r','44;50;44','6s')}</circle>
        ${море(150,Н)}
        <g>${анСдвиг('0 0;60 0;60 0','9s','0;0.8;1')}${галера(250,176,0.7,false)}</g>
        <g>${анСдвиг('0 0;50 0;50 0','11s','0;0.8;1')}${галера(300,200,0.5,false)}</g>
        <g filter="url(#c390-тень)">
          <path d="M20 250 L30 110 L50 110 L60 250 Z" fill="url(#c390-камень)" stroke="${ОБВОД}" stroke-width="1"/>
          <rect x="26" y="96" width="28" height="16" fill="#433c52"/><path d="M24 96 L40 80 L56 96 Z" fill="#2f2a3d"/>
        </g>
        <circle cx="40" cy="104" r="22" fill="url(#c390-пламя)">${анЛин('opacity','1;0.7;1','1.4s')}</circle>
        ${гонец(84,246)}
        <g>${проявить('8s',0.1,0.2)}${подпись(210,40,'«и» — умножаем',GOLD,12)}</g>
        <g>${проявить('8s',0.25,0.35)}${подпись(210,68,'«или» — складываем',GOLD,12)}</g>
        <g>${проявить('8s',0.4,0.5)}${подпись(210,96,'без повторов — на один меньше',GOLD,12)}</g>
        <g>${проявить('8s',0.55,0.65)}${подпись(210,124,'порядок не важен — делим',GOLD,12)}</g>
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Выбор по шагам — <b>умножаем</b> (дерево возможностей). Один из нескольких способов — <b>складываем</b>. Без повторов каждый следующий выбор <b>на один меньше</b>; все по порядку — <b>n!</b>. Если порядок не важен — <b>делим</b> на число перестановок.') +
      ПРАВИЛО('Считая варианты, сначала спроси: <b>«и» или «или»? важен ли порядок? можно ли повторять?</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'3 шлема и 4 щита. Сколько разных наборов «шлем + щит»?',
      варианты:[{т:'7',ок:false},{т:'12',ок:true}], разбор:'К каждому шлему — любой из 4 щитов: 3 · 4 = 12.' },
    { вопрос:'К башне ведут 2 лестницы, от башни к воротам — 3 тропы. Сколько путей от стены до ворот через башню?',
      варианты:[{т:'6',ок:true},{т:'5',ок:false}], разбор:'Лестница И потом тропа — умножаем: 2 · 3 = 6.' },
    { вопрос:'Сколько двузначных чисел из цифр 1, 2, 3, если цифры можно повторять?',
      варианты:[{т:'6',ок:false},{т:'9',ок:true}], разбор:'Первая — любая из 3, вторая — любая из 3: 3 · 3 = 9 (11, 12, 13, 21, …).' },
    { вопрос:'Сколькими способами 3 гонца могут встать в ряд?',
      варианты:[{т:'6',ок:true},{т:'9',ок:false}], разбор:'3 · 2 · 1 = 6: на первое место трое, на второе двое, на третье один.' },
    { вопрос:'Из 5 воинов выбирают двоих в дозор, порядок не важен. Сколько способов?',
      варианты:[{т:'20',ок:false},{т:'10',ок:true}], разбор:'5 · 4 = 20 упорядоченных пар, каждая посчитана дважды: 20 : 2 = 10.' }
  ];

  function F11(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r390Reset()")}</div>` +
        ПРАВИЛО('<b>«И» — умножаем, «или» — складываем.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r390Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ ================= */
  const Т1 = { имя:'Умножай варианты', задания:[
    {q:'5 туник и 2 плаща. Сколько разных нарядов «туника + плащ»?', в:0, варианты:['10','7'], раз:'К каждой из 5 туник — любой из 2 плащей: 5 · 2 = 10.'},
    {q:'2 дороги до реки и 3 брода через неё. Сколько путей на тот берег?', в:1, варианты:['5','6'], раз:'Дорога И потом брод: 2 · 3 = 6.'},
    {q:'Код из 2 цифр от 0 до 9, повторять можно. Сколько кодов?', в:0, варианты:['100','20'], раз:'10 · 10 = 100: от 00 до 99.'},
    {q:'3 цвета флага и 3 положения фонаря. Сколько сигналов?', в:1, варианты:['6','9'], раз:'3 · 3 = 9. 6 = 3 + 3 — ошибка «сложил».'}
  ]};
  const Т2 = { имя:'«И» или «ИЛИ»', задания:[
    {q:'До маяка — ИЛИ на одной из 2 лодок, ИЛИ по одной из 4 троп. Сколько способов?', в:1, варианты:['8','6'], раз:'Выбирают что-то одно — складываем: 2 + 4 = 6.'},
    {q:'Суп (3 вида) И второе (4 вида). Сколько разных обедов?', в:0, варианты:['12','7'], раз:'Суп и потом второе — умножаем: 3 · 4 = 12.'},
    {q:'Взять одну вещь: один из 5 свитков или одну из 3 табличек. Сколько способов?', в:0, варианты:['8','15'], раз:'Одна вещь — складываем: 5 + 3 = 8.'},
    {q:'Шлем (2 вида) И щит (5 видов). Сколько вариантов?', в:1, варианты:['7','10'], раз:'Шлем и щит вместе — умножаем: 2 · 5 = 10.'}
  ]};
  const Т3 = { имя:'Порядок и повторы', задания:[
    {q:'Трёхзначные коды из цифр 1–9 без повторов. Сколько?', в:0, варианты:['504','729'], раз:'9 · 8 · 7 = 504. 729 = 9 · 9 · 9 — с повторами.'},
    {q:'Сколькими способами 4 свитка встанут на полку?', в:1, варианты:['16','24'], раз:'4 · 3 · 2 · 1 = 24.'},
    {q:'Из 6 воинов выбрать двоих, порядок не важен. Сколько способов?', в:0, варианты:['15','30'], раз:'6 · 5 = 30 упорядоченных, каждая пара дважды: 30 : 2 = 15.'},
    {q:'Сколько всего трёхзначных чисел (первая цифра не 0)?', в:1, варианты:['1 000','900'], раз:'9 · 10 · 10 = 900: на первое место 9 цифр, на остальные по 10.'}
  ]};

  function тренажёр(s,ключ,набор,номер){
    const шаг = (s[ключ+'Шаг']||0) % набор.задания.length;
    const з = набор.задания[шаг];
    const ответ = s[ключ+'Ответ'];
    const верно = s[ключ+'Верно']||0, ошибки = s[ключ+'Ошибки']||0;
    return ТОЧКИ(набор.задания.length,шаг,шаг) +
      A(1,'score','Тренажёр '+номер+' · '+набор.имя+' · верно '+верно+', ошибок '+ошибки) +
      ЗАДАЧА(з.q) +
      `<div class="ask пара">` +
      з.варианты.map((в,к)=>BTN(3+к,
        ответ===к ? (к===з.в?'hit':'miss') : (ответ!=null&&к===з.в?'hit':''),
        в, "r390T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ответ!=null
        ? РАЗБОР(ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'','Следующее задание →',"r390TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= СБОРКА ================= */
  const L390 = {
    id: ID,
    title: 'Правило произведения: задачи',
    ico: '🧵',
    src: 'Математика · 5–6 класс · Олимп-5: комбинаторика',
    subj: 'math',
    explain: [
      '212 год до нашей эры. Римский флот осаждает Сиракузы. Архимед отправляет тебя с донесением на маяк, и по дороге придётся считать варианты. Главный приём: если выбор делают по шагам, число вариантов умножают.',
      'Сигналы башни: флаг одного из 4 цветов и фонарь на одной из 3 высот. На дереве возможностей от каждого флага идут 3 ветки фонарей — листьев 4 · 3 = 12. Не 4 + 3!',
      'Путь от мастерской до маяка идёт через Агору и Порт: 3 улицы, потом 2, потом 4. Каждый путь продолжается любой улицей следующего отрезка — путей 3 · 2 · 4 = 24.',
      'К башне можно добраться или морем — 2 лодки, или по стене — 3 лестницы. Выбирают что-то одно, поэтому складывают: 2 + 3 = 5. «И» — умножаем, «или» — складываем.',
      'Замок сундука: три диска по 10 цифр — 10 · 10 · 10 = 1 000 кодов, лазутчик переберёт их за 50 минут. Четвёртый диск умножает число кодов на 10: 10 000 кодов — 8 часов 20 минут, до рассвета не успеть.',
      'Пароль и отзыв — два разных слова из пяти, и порядок важен. На пароль 5 слов, на отзыв остаётся 4: 5 · 4 = 20 пар.',
      'Четыре зеркала на четыре башни: на первую выбираем из 4, на вторую из 3, потом из 2 и из 1. Всего 4 · 3 · 2 · 1 = 24 — это перестановки, 4!.',
      'Двое из четырёх на вылазку, порядок не важен. 4 · 3 = 12 считает каждую пару дважды, поэтому пар 12 : 2 = 6 — ровно 6 отрезков между воинами.',
      'Код римских ворот: три разные цифры без нуля. На первое место 9 цифр, на второе 8, на третье 7: 9 · 8 · 7 = 504.',
      'Рассвет, римляне отходят. Итог: «и» — умножаем, «или» — складываем, без повторов каждый выбор на один меньше, если порядок не важен — делим.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: умножай варианты.',
      'Тренажёр 2: «и» или «или».',
      'Тренажёр 3: порядок и повторы.'
    ],
    check: {
      q: 'Флаг одного из 4 цветов и фонарь на одной из 3 высот. Сколько разных сигналов?',
      choices: ['7','12','4','3'],
      ans: 1,
      exp: 'К каждому флагу — любой из 3 фонарей: 4 · 3 = 12.'
    },
    tasks: [
      { q:'4 рубашки и 3 галстука. Сколько комплектов «рубашка + галстук»?', kind:'unit', ans:12, tol:0,
        hints:['К каждой рубашке — любой галстук.','4 · 3.'], sol:'4 · 3 = 12.' },
      { q:'Сколько трёхзначных кодов из цифр 1–9, если цифры не повторяются?', kind:'unit', ans:504, tol:0,
        hints:['На первое место 9 цифр.','Потом 8, потом 7.'], sol:'9 · 8 · 7 = 504.' },
      { q:'К башне можно доплыть на одной из 2 лодок или подняться по одной из 3 лестниц. Сколько способов?', kind:'choice',
        choices:['5','6'], ans:0,
        hints:['Выбирают один способ.','«Или» — складываем.'], sol:'2 + 3 = 5.' }
    ]
  };

  function render(el){
    css();
    const s = S();
    const step = Math.max(0, Math.min(L390.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
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
    else if(f===12) сцена=тренажёр(s,'т1',Т1,1);
    else if(f===13) сцена=тренажёр(s,'т2',Т2,2);
    else сцена=тренажёр(s,'т3',Т3,3);

    const ЗАГОЛОВКИ={
      1:'Сиракузы в осаде', 2:'Сигналы башни', 3:'Пути через город', 4:'Морем или стеной',
      5:'Замок сундука', 6:'Пароль и отзыв', 7:'Зеркала Архимеда', 8:'Двое на вылазку',
      9:'Код римских ворот', 10:'Рассвет', 11:'Практика',
      12:'Тренажёр 1', 13:'Тренажёр 2', 14:'Тренажёр 3'
    };
    el.innerHTML = `<div class="s6 l390" data-frame="${f}">
        <h2>${ЗАГОЛОВКИ[f]||'Правило произведения'}</h2>
        ${сцена}
      </div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  const отметить2 = (s) => { if(s.флаг2!=null && s.фонарь2!=null){ const к=s.флаг2+'-'+s.фонарь2; s.видели2=(s.видели2||[]).filter(x=>x!==к).concat([к]); } };
  window.r390Флаг=(i)=>{ const s=S(); s.флаг2=i; отметить2(s); chRender(0); };
  window.r390Фонарь=(j)=>{ const s=S(); s.фонарь2=j; отметить2(s); chRender(0); };
  window.r390Отв2=(к)=>{ const s=S(); s.ответ2=к; if(к===1) s.дело_сигналы=true; chRender(0); };
  window.r390Улица=(отр,к)=>{ const s=S(); const п=s.путь3||[null,null,null]; п[отр]=к; s.путь3=п; chRender(0); };
  window.r390Отв3=(к)=>{ const s=S(); s.ответ3=к; if(к===1) s.дело_маршрут=true; chRender(0); };
  window.r390Отв4=(к)=>{ S().ответ4=к; chRender(0); };
  window.r390Диск=(к)=>{ const s=S(); const д=s.диски5||[0,0,0,0]; д[к]=(д[к]+1)%10; s.диски5=д; chRender(0); };
  window.r390Отв5=(к)=>{ S().ответ5=к; chRender(0); };
  window.r390Четвёртый=()=>{ S().четвёртый5=true; chRender(0); };
  window.r390Отв5б=(к)=>{ const s=S(); s.ответ5б=к; if(к===1) s.дело_замок=true; chRender(0); };
  window.r390Слово=(i)=>{ const s=S(); s.мимо6=false;
    if(s.пароль6==null || (s.пароль6!=null && s.отзыв6!=null)){ s.пароль6=i; s.отзыв6=null; }
    else if(i===s.пароль6){ s.мимо6=true; }
    else s.отзыв6=i;
    chRender(0); };
  window.r390Отв6=(к)=>{ S().ответ6=к; chRender(0); };
  window.r390Зеркало=(i)=>{ const s=S(); const з=s.зеркала7||[]; if(з.includes(i)||з.length>=4) return; з.push(i); s.зеркала7=з; chRender(0); };
  window.r390Сброс7=()=>{ S().зеркала7=[]; chRender(0); };
  window.r390Отв7=(к)=>{ S().ответ7=к; chRender(0); };
  window.r390Отв8=(к)=>{ S().ответ8=к; chRender(0); };
  window.r390Отв9=(к)=>{ S().ответ9=к; chRender(0); };
  window.r390Pick=(уровень,вариант)=>{
    const s=S();
    s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1;
    chRender(0);
  };
  window.r390Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r390T=(ключ,вариант)=>{
    const s=S();
    if(s[ключ+'Ответ']!=null) return;
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    const шаг=(s[ключ+'Шаг']||0)%набор.задания.length;
    const з=набор.задания[шаг];
    s[ключ+'Ответ']=вариант;
    if(вариант===з.в) s[ключ+'Верно']=(s[ключ+'Верно']||0)+1; else s[ключ+'Ошибки']=(s[ключ+'Ошибки']||0)+1;
    chRender(0);
  };
  window.r390TNext=(ключ)=>{
    const s=S();
    const набор = ключ==='т1'?Т1:(ключ==='т2'?Т2:Т3);
    s[ключ+'Шаг']=((s[ключ+'Шаг']||0)+1)%набор.задания.length;
    s[ключ+'Ответ']=null;
    chRender(0);
  };

  /* прежние уроки 390 (vis_wk.js, vis_bw.js) регистрируются раньше — этот
     файл подключён после них и перерегистрируется ещё раз на load */
  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){
        const место=arr.findIndex(L=>L && L.id===ID);
        if(место>=0) arr[место]=L390; else arr.push(L390);
      }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.MA390={render:render, L:L390};
})();
