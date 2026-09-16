/* ============ ЛИСТ 253 · «ДОМИК ЧИСЛА 10» · живой комикс для 1–2 класса ============

   Свой движок, не общий комикс приложения. Почему свой.

   В обычном комиксе герои разговаривают, а ребёнок читает и жмёт «дальше».
   Для первоклассника это мимо: он ещё читает по слогам, и текст — не помощь,
   а препятствие. Здесь наоборот: в каждом кадре ребёнок ТРОГАЕТ предметы, и
   математика происходит у него в руках. Слов на кадр — одна короткая строка
   крупными буквами, всё остальное показывает картинка.

   Тема выбрана не случайно. Состав числа 10 — то, на чём стоит вся первая
   математика: переход через десяток, сложение до 20, вычитание с занятием.
   Кто знает пары к десяти наизусть, дальше идёт свободно; кто не знает —
   считает на пальцах до четвёртого класса.

   ГЛАВНОЕ РЕШЕНИЕ КАРТИНОК: десяток в каждом кадре — НОВЫЙ ПРЕДМЕТ.
   Первый заход рисовал домик подряд в пяти кадрах, и урок выглядел как одна
   картинка с разными числами. Теперь: пальцы, домик, гирлянда, звёзды,
   свиток, два домика рядом, ночное небо, домик с орехами, грядка, свиток.
   Так у ребёнка складывается не «запомнил эту картинку», а «десять бывает
   любым — важно, как оно делится».

   Устройство: сначала ребёнок открывает правило руками (зажигает окна и
   видит, что светлых и тёмных всегда вместе десять), потом называет пары,
   потом видит, зачем это нужно — в живом примере 8 + 5.

   Интерактив у каждого кадра свой, а не один приём десять раз:
     пальцы      — пересчитать, касаясь;
     окна        — свободная игра, правило видно внизу;
     число       — выбрать ответ крупной кнопкой;
     лестница    — заполнить пропуски в списке пар;
     зеркало     — сравнить две записи;
     молния      — четыре быстрых ответа подряд;
     орехи       — перенести ровно столько, сколько нужно.

   Кегли, контраст и цели касания — по правилам проекта: не меньше 44 px на
   палец первоклассника, контраст текста не ниже 4,5:1, всякое движение
   выключается при prefers-reduced-motion. */
(function(){
  'use strict';

  const ID = 253;
  const ДОМ = 'жк';                      /* префикс классов, чтобы ничего не задеть */

  /* ─────────────────── стили ─────────────────── */
  const СТИЛЬ = `
  #lvis .${ДОМ}{
    --ночь:#16264a; --ночь-2:#24406b; --вечер:#3b2f52;
    --окно:#2b3f63; --свет:#ffd15c; --свет-2:#ffb43f;
    --дерево:#8a5c35; --дерево-2:#6f4526; --бревно:#a06b3d;
    --крыша:#9c4f38; --крыша-2:#7d3c29; --контур:#3a2515;
    --лист:#fff6e4; --чернила:#2a2118; --тихо:#6b5b45;
    --верно:#2f6b46; --мимо:#b4472f; --кожа:#f2cca6; --кожа-2:#e0b189;
    font-family:Georgia,'Times New Roman',serif; color:var(--чернила);
    display:flex; flex-direction:column; gap:14px; padding:2px;
  }
  #lvis .${ДОМ} *{box-sizing:border-box}
  /* Браузер на телефоне рисует свою подсветку по нажатой кнопке. У SVG-цели
     она вылезает прямоугольником поверх рисунка — гасим. Заодно убираем
     выделение текста при долгом нажатии и задержку двойного тапа. */
  #lvis .${ДОМ} button,
  #lvis .${ДОМ} .палец-цель,
  #lvis .${ДОМ} .лампа-цель{
    -webkit-tap-highlight-color:transparent;
    -webkit-touch-callout:none;
    user-select:none; -webkit-user-select:none;
    touch-action:manipulation;
  }

  /* реплика ёжика: одна короткая строка, крупно */
  #lvis .${ДОМ} .реплика{
    display:flex; align-items:flex-start; gap:12px;
    background:var(--лист); border:2px solid var(--контур); border-radius:18px;
    padding:14px 16px; box-shadow:0 3px 0 rgba(58,37,21,.2);
  }
  #lvis .${ДОМ} .реплика .ёж{flex:0 0 52px}
  #lvis .${ДОМ} .реплика p{margin:0; font-size:20px; line-height:1.35; font-weight:bold}

  /* сцена: у каждого кадра своё небо */
  #lvis .${ДОМ} .сцена{
    position:relative;
    border:2px solid var(--контур); border-radius:18px; padding:14px 12px 12px;
    display:flex; flex-direction:column; align-items:center; gap:10px;
    background:linear-gradient(180deg,var(--ночь) 0%,var(--ночь-2) 70%,#2f5137 100%);
  }
  #lvis .${ДОМ} .сцена.днём{background:linear-gradient(180deg,#a8ddf2 0%,#d9eec4 72%,#8fc07a 100%)}
  #lvis .${ДОМ} .сцена.вечер{background:linear-gradient(180deg,#432f57 0%,#8a4a4f 62%,#c9743f 100%)}
  #lvis .${ДОМ} .сцена.бумага{background:linear-gradient(180deg,#f6e7c8 0%,#efd9b0 100%)}
  #lvis .${ДОМ} .небо{position:absolute; inset:0; pointer-events:none;
    clip-path:inset(0 round 16px)}
  #lvis .${ДОМ} .поверх{position:relative; z-index:1; width:100%;
    display:flex; flex-direction:column; align-items:center; gap:10px}

  /* ── руки ── */
  /* Руки стоят рядом: так их и держат, когда считают. Ширина пальца тогда
     упирается в арифметику экрана — десять пальцев поперёк телефона дают
     около 27 px на палец, шире не сделать. Цель при этом высокая (за сто
     точек), а промах попадает в соседний палец, который тоже надо сосчитать,
     так что ошибиться нечем. */
  #lvis .${ДОМ} .руки{display:flex; gap:4px; width:100%; justify-content:center; align-items:flex-end}
  #lvis .${ДОМ} .рука{flex:1 1 0; min-width:0; max-width:180px; display:block}
  /* Сосчитанный палец пригибается к ладони — так и считают на пальцах.
     Сжимаем по вертикали от основания: капсула уходит в костяшку. */
  #lvis .${ДОМ} .палец-фигура{transform-box:view-box}
  #lvis .${ДОМ} .палец-фигура.загнут{transform:scaleY(.06); opacity:0}
  /* Большой прячется в кулак: ужимаем и гасим, иначе у края ладони
     остаётся след его контура. */
  #lvis .${ДОМ} .палец-фигура.загнут-б{transform:scale(.16); opacity:0}
  #lvis .${ДОМ} .палец-фигура{transition:transform 300ms cubic-bezier(.22,.9,.24,1),
    opacity 220ms ease}
  @media (prefers-reduced-motion: reduce){
    #lvis .${ДОМ} .палец-фигура{transition:none}
  }
  #lvis .${ДОМ} .палец-цель{cursor:pointer; fill:transparent; transition:fill 140ms ease}
  #lvis .${ДОМ} .палец-цель:focus{outline:none}
  /* Обводка у SVG рисуется прямоугольником вокруг элемента и перечёркивает
     руку. Подсвечиваем сам палец заливкой — видно, куда попал, и ничего
     лишнего не вылезает. */
  #lvis .${ДОМ} .палец-цель:focus-visible{outline:none; fill:rgba(255,255,255,.4)}
  #lvis .${ДОМ} .палец-цель:active{fill:rgba(255,255,255,.3)}
  #lvis .${ДОМ} .палец-форма{fill:var(--кожа); stroke:var(--контур); stroke-width:4;
    transition:fill 240ms ease}
  #lvis .${ДОМ} .сосчитан .палец-форма{fill:var(--свет)}

  /* ── домик ── */
  #lvis .${ДОМ} .домик{width:100%; max-width:286px; position:relative}
  #lvis .${ДОМ} .крыша{width:100%; display:block; margin-bottom:-2px}
  #lvis .${ДОМ} .стены{
    background:
      repeating-linear-gradient(180deg,
        rgba(0,0,0,.09) 0 2px, rgba(255,255,255,.05) 2px 26px),
      linear-gradient(180deg,var(--дерево) 0%,var(--дерево-2) 100%);
    border:4px solid var(--контур); border-top:none; border-radius:0 0 10px 10px;
    padding:14px 14px 10px;
    display:grid; grid-template-columns:1fr 1fr; gap:11px;
  }
  #lvis .${ДОМ} .окно{
    appearance:none; position:relative; padding:0; cursor:pointer;
    min-height:48px; border:4px solid var(--контур); border-radius:7px;
    background:linear-gradient(180deg,#3a5279,var(--окно));
    transition:background 260ms ease, box-shadow 260ms ease, transform 120ms ease;
  }
  #lvis .${ДОМ} .окно::before,
  #lvis .${ДОМ} .окно::after{
    content:''; position:absolute; background:var(--контур); opacity:.85;
  }
  #lvis .${ДОМ} .окно::before{left:50%; top:2px; bottom:2px; width:3px; margin-left:-1.5px}
  #lvis .${ДОМ} .окно::after{top:50%; left:2px; right:2px; height:3px; margin-top:-1.5px}
  #lvis .${ДОМ} .окно{box-shadow:0 5px 0 #57351c}
  #lvis .${ДОМ} .окно.горит{
    background:
      radial-gradient(ellipse 60% 40% at 50% 100%, rgba(180,110,40,.35), transparent 70%),
      radial-gradient(circle at 50% 38%, #fff6d4, var(--свет) 56%, var(--свет-2));
    box-shadow:0 5px 0 #57351c, 0 0 0 3px rgba(255,209,92,.3), 0 0 26px 6px rgba(255,180,63,.6);
  }
  #lvis .${ДОМ} .окно:active:not(:disabled){transform:scale(.94)}
  #lvis .${ДОМ} .окно:focus-visible{outline:3px solid #fff; outline-offset:3px}
  #lvis .${ДОМ} .дверь{width:100%; max-width:286px; display:block; margin-top:-4px}

  /* ── гирлянда ── */
  #lvis .${ДОМ} .гирлянда{position:relative; width:100%; max-width:320px; aspect-ratio:320/196}
  #lvis .${ДОМ} .шнур{position:absolute; inset:0; width:100%; height:100%}
  #lvis .${ДОМ} .шнур{width:100%; height:100%; display:block}
  #lvis .${ДОМ} .шнур .колба{fill:#33496f; stroke:var(--контур); stroke-width:3.5;
    transition:fill 240ms ease}
  #lvis .${ДОМ} .шнур .горит .колба{fill:url(#жарко); filter:drop-shadow(0 0 7px rgba(255,190,80,.9))}
  #lvis .${ДОМ} .лампа-цель{fill:transparent; cursor:pointer; transition:fill 140ms ease}
  #lvis .${ДОМ} .лампа-цель:focus{outline:none}
  #lvis .${ДОМ} .лампа-цель:focus-visible{outline:none; fill:rgba(255,255,255,.35)}

  /* ── звёзды ── */
  #lvis .${ДОМ} .звёзды{
    width:100%; max-width:320px; display:grid; grid-template-columns:repeat(5,1fr);
    gap:10px 6px; padding:10px 4px;
  }
  #lvis .${ДОМ} .звезда{
    appearance:none; padding:0; height:58px; background:none; border:none;
    cursor:pointer; color:#40598a; transition:color 260ms ease;
  }
  #lvis .${ДОМ} .звезда:nth-child(n+6){margin-top:6px}
  #lvis .${ДОМ} .звезда svg{width:100%; height:100%; display:block; fill:currentColor;
    stroke:var(--контур); stroke-width:3; stroke-linejoin:round}
  #lvis .${ДОМ} .звезда.горит{color:var(--свет); filter:drop-shadow(0 0 8px rgba(255,209,92,.8))}
  #lvis .${ДОМ} .звезда:focus-visible{outline:3px solid #fff; outline-offset:2px; border-radius:50%}

  /* ── грядка ── */
  #lvis .${ДОМ} .грядка{
    width:100%; max-width:320px; display:grid; grid-template-columns:repeat(5,1fr);
    gap:8px; padding:12px 10px 16px;
    background:linear-gradient(180deg,#6b4a2c 0%,#4e351e 100%);
    border:4px solid var(--контур); border-radius:14px;
  }
  #lvis .${ДОМ} .лунка{
    appearance:none; padding:0; background:none; border:none; cursor:pointer;
    height:66px; color:#3d2a17; transition:color 240ms ease;
  }
  #lvis .${ДОМ} .лунка svg{width:100%; height:100%; display:block}
  #lvis .${ДОМ} .лунка .росток{opacity:0; transition:opacity 260ms ease}
  #lvis .${ДОМ} .лунка.горит .росток{opacity:1}

  /* счётная строка */
  #lvis .${ДОМ} .счёт{
    display:flex; align-items:center; justify-content:center; gap:10px; flex-wrap:wrap;
    font-size:22px; color:#fff6e4; margin:0; text-align:center;
  }
  #lvis .${ДОМ} .счёт b{font-size:30px; font-weight:bold}
  #lvis .${ДОМ} .табло{
    display:inline-flex; align-items:center; justify-content:center;
    min-width:84px; padding:6px 18px; border-radius:16px;
    background:var(--лист); border:3px solid var(--контур);
    box-shadow:0 4px 0 rgba(58,37,21,.3);
    font-size:42px; font-weight:bold; color:var(--чернила);
    font-variant-numeric:tabular-nums;
  }
  #lvis .${ДОМ} .счёт .жёлт{color:var(--свет)}
  #lvis .${ДОМ} .счёт .синь{color:#a8c8f0}
  #lvis .${ДОМ} .счёт .итог{color:#fff; border-top:2px solid rgba(255,255,255,.35);
    padding-top:6px; width:100%}
  /* На светлой сцене кремовые буквы не видны — берём чернила. */
  #lvis .${ДОМ} .сцена.днём .счёт, #lvis .${ДОМ} .сцена.бумага .счёт{color:var(--чернила)}
  #lvis .${ДОМ} .сцена.днём .счёт .жёлт, #lvis .${ДОМ} .сцена.бумага .счёт .жёлт{color:#9a6b12}
  #lvis .${ДОМ} .сцена.днём .счёт .синь, #lvis .${ДОМ} .сцена.бумага .счёт .синь{color:#245188}
  #lvis .${ДОМ} .сцена.днём .счёт .итог, #lvis .${ДОМ} .сцена.бумага .счёт .итог{
    color:var(--чернила); border-top-color:rgba(42,33,24,.3)}

  /* крупные кнопки-числа */
  #lvis .${ДОМ} .числа{display:flex; gap:10px; flex-wrap:wrap; justify-content:center}
  #lvis .${ДОМ} .число{
    appearance:none; min-width:64px; min-height:64px; padding:0 10px;
    font-family:inherit; font-size:30px; font-weight:bold; color:var(--чернила);
    background:linear-gradient(180deg,#fffdf4,var(--лист));
    border:3px solid var(--контур); border-radius:14px;
    cursor:pointer; box-shadow:0 4px 0 rgba(58,37,21,.3);
    transition:transform 120ms ease, background 200ms ease;
  }
  #lvis .${ДОМ} .число:active{transform:translateY(4px); box-shadow:none}
  #lvis .${ДОМ} .число.верно{background:#bde5cb; border-color:var(--верно); color:var(--верно)}
  #lvis .${ДОМ} .число.мимо{background:#f3cfc6; border-color:var(--мимо); color:var(--мимо)}
  #lvis .${ДОМ} .число:focus-visible{outline:3px solid var(--контур); outline-offset:3px}

  /* лестница пар — свиток */
  #lvis .${ДОМ} .лестница{display:flex; flex-direction:column; gap:7px; width:100%; max-width:300px}
  #lvis .${ДОМ} .ступень{
    display:flex; align-items:center; justify-content:center; gap:8px;
    background:var(--лист); border:2px solid var(--контур); border-radius:12px;
    padding:7px 10px; font-size:23px; font-weight:bold;
    box-shadow:0 2px 0 rgba(58,37,21,.18);
  }
  #lvis .${ДОМ} .ступень.решена{background:#bde5cb; border-color:var(--верно)}
  #lvis .${ДОМ} .дырка{
    appearance:none; min-width:56px; min-height:56px; font-family:inherit;
    font-size:26px; font-weight:bold; background:#fff; color:var(--тихо);
    border:3px dashed var(--контур); border-radius:12px; cursor:pointer;
  }
  #lvis .${ДОМ} .дырка.занята{border-style:solid; background:#bde5cb; color:var(--верно);
    display:inline-flex; align-items:center; justify-content:center}
  #lvis .${ДОМ} .дырка.выбран{border-color:var(--верно); background:#fff8d8; border-style:solid}

  /* орехи в лапке */
  #lvis .${ДОМ} .лапка{
    display:grid; grid-template-columns:repeat(3,56px); gap:10px;
    justify-content:center; max-width:300px;
  }
  #lvis .${ДОМ} .орех{
    appearance:none; width:56px; height:56px; padding:0; background:none;
    border:none; cursor:pointer; transition:transform 180ms ease, opacity 240ms ease;
  }
  #lvis .${ДОМ} .орех svg{width:100%; height:100%; display:block}
  #lvis .${ДОМ} .орех:active{transform:scale(.9)}
  #lvis .${ДОМ} .орех.улетел{opacity:.2; transform:scale(.72); pointer-events:none}
  #lvis .${ДОМ} .орех:focus-visible{outline:3px solid #fff; outline-offset:2px; border-radius:50%}

  /* подсказка снизу и итог */
  #lvis .${ДОМ} .что-делать{
    font-size:17px; color:#f2ead6; text-align:center; margin:0;
    background:rgba(42,33,24,.45); border-radius:10px; padding:8px 12px;
  }
  #lvis .${ДОМ} .готово{
    display:flex; align-items:center; gap:10px; justify-content:center;
    background:#bde5cb; border:2px solid var(--верно); border-radius:14px;
    padding:12px 14px; font-size:19px; font-weight:bold; color:var(--верно); margin:0;
  }
  #lvis .${ДОМ} .памятка{display:flex; flex-direction:column; gap:8px; width:100%; max-width:300px}
  #lvis .${ДОМ} .памятка div{
    background:var(--лист); border:2px solid var(--контур); border-radius:12px;
    padding:10px 6px; text-align:center; font-size:21px; font-weight:bold;
    box-shadow:0 2px 0 rgba(58,37,21,.18);
  }

  /* На узком экране зазоры съедают ширину лунок и пальцев: ужимаем их,
     чтобы цель касания не падала ниже сорока пяти пикселей. */
  @media (max-width:370px){
    #lvis .${ДОМ} .грядка{gap:6px; padding:10px 6px 14px}
    #lvis .${ДОМ} .сцена{padding:12px 6px 10px}
    #lvis .${ДОМ} .лапка{grid-template-columns:repeat(3,52px); gap:8px}
    #lvis .${ДОМ} .орех{width:52px; height:52px}
  }

  @media (prefers-reduced-motion: reduce){
    #lvis .${ДОМ} *{transition:none !important; animation:none !important}
  }
  `;


  function стиль(){
    if (document.getElementById(ДОМ + '-стиль')) return;
    const s = document.createElement('style');
    s.id = ДОМ + '-стиль'; s.textContent = СТИЛЬ;
    document.head.appendChild(s);
  }

  /* ─────────────────── состояние ─────────────────── */
  function пам(){
    const к = (typeof lidKey === 'function') ? lidKey(ID) : String(ID);
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[к]) CHS[к] = {};
    if (!CHS[к].ж) CHS[к].ж = {};
    return CHS[к].ж;
  }
  function шаг(){ return Math.max(0, Math.min(КАДРЫ.length - 1, (typeof LV !== 'undefined' && LV.step) || 0)); }
  function сост(i){ const п = пам(); if (!п[i]) п[i] = {}; return п[i]; }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };

  /* ═══════════════════ РИСУНКИ ═══════════════════
     Каждый десяток — свой предмет. Один и тот же домик в пяти кадрах подряд
     превращает урок в одну картинку с разными числами; ребёнок запоминает
     картинку, а не приём. Поэтому: руки, окна, лампочки, звёзды, лунки. */

  /* ── ёжик Пых ──────────────────────────────────────────────────────────
     Прежний был заштрихованный овал: короткие чёрточки поверх гладкого
     эллипса читались как полосатая картошка. У настоящего ежа колючки —
     это не штриховка, а МАНТИЯ с зубчатым краем, поверх которой видны
     только мордочка, ухо и лапки. ── */
  const ёжик = (настроение) => {
    /* Зубцы мантии: по дуге, радиус чередуется — впадина и остриё. */
    const cx = 28, cy = 46, N = 15;
    let зубцы = '';
    for (let k = 0; k <= N; k++){
      const a = (196 - k * 188 / N) * Math.PI / 180;
      const r = (k % 2 === 0) ? 20 : 28;
      const x = cx + r * Math.cos(a), y = cy - r * Math.sin(a);
      зубцы += (k === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1);
    }
    зубцы += ` L${cx + 20},${cy + 6} L${cx - 20},${cy + 6} Z`;
    const рот = настроение === 'рад' ? 'M53,44 q-4,4 -8,1'
              : настроение === 'думает' ? 'M52,45 h-7' : 'M52,46 q-4,-3 -8,0';
    return `<svg class="ёж" viewBox="0 6 70 54" width="52" height="40" role="img" aria-label="Ёжик Пых">
      <!-- тело и мордочка одним клином -->
      <path d="M8,44 C8,30 20,25 32,26 C44,27 54,31 62,38 C66,41 66,43 62,46
               C54,52 42,55 30,55 C16,55 8,51 8,44 Z"
            fill="#e8cfae" stroke="#4a3220" stroke-width="2.6" stroke-linejoin="round"/>
      <!-- колючая мантия -->
      <path d="${зубцы}" fill="#7a5a3e" stroke="#4a3220" stroke-width="2.4" stroke-linejoin="round"/>
      <g stroke="#4a3220" stroke-width="1.5" opacity=".45" fill="none">
        <path d="M18,42 l-4,-9"/><path d="M26,40 l-1,-10"/><path d="M34,40 l3,-9"/><path d="M42,42 l5,-8"/>
      </g>
      <!-- ухо у края мантии -->
      <ellipse cx="44" cy="33" rx="4.6" ry="4.2" fill="#d7b48d" stroke="#4a3220" stroke-width="2.2"/>
      <!-- глаз и нос -->
      <circle cx="52" cy="38" r="2.9" fill="#2a2118"/>
      <circle cx="53" cy="37" r="1" fill="#fff"/>
      <ellipse cx="63" cy="42" rx="3.4" ry="2.8" fill="#2a2118"/>
      <path d="${рот}" stroke="#2a2118" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <!-- лапки -->
      <ellipse cx="22" cy="55" rx="5" ry="3" fill="#c9a882" stroke="#4a3220" stroke-width="2.2"/>
      <ellipse cx="42" cy="55" rx="5" ry="3" fill="#c9a882" stroke="#4a3220" stroke-width="2.2"/>
    </svg>`;
  };

  /* ── ночное небо: луна, облачко, звёздочки ── */
  const небо = (звёзд) => {
    let s = '';
    const точки = [[24,26],[62,15],[104,34],[150,18],[196,30],[236,14],[278,28],[306,44],[44,58],[268,62]];
    for (let i = 0; i < Math.min(звёзд, точки.length); i++){
      const [x,y] = точки[i], r = 1.4 + (i % 3) * .6;
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6e4" opacity="${.5 + (i%3)*.2}"/>`;
    }
    s += `<g opacity=".95">
      <circle cx="292" cy="30" r="20" fill="#fff3cf"/>
      <circle cx="283" cy="24" r="4" fill="#efe0b8"/>
      <circle cx="298" cy="38" r="3" fill="#efe0b8"/>
      <circle cx="296" cy="22" r="2.2" fill="#efe0b8"/>
    </g>`;
    return `<svg class="небо" viewBox="0 0 330 120" preserveAspectRatio="none">${s}</svg>`;
  };

  /* ── РУКА. Настоящая кисть: четыре пальца и большой сбоку.
        Цель касания шире самого пальца — палец первоклассника попадает
        не в контур, а примерно; прозрачная накладка это прощает. ── */
  /* ── РУКА ──────────────────────────────────────────────────────────────
     Рисунок свой, целиком. Раньше здесь была производная работа от Twemoji,
     и она тянула за собой лицензию CC BY с обязательным указанием авторства
     в продукте. Теперь этой привязки нет.

     Чтобы «своё» не означало «хуже», рука построена не на глаз, а по
     правилам, по которым кисть и рисуют:
       · ладонь близка к квадрату и чуть шире у костяшек, чем у запястья;
       · кончики и основания идут ДУГАМИ: средний палец выше всех, от него
         остальные опускаются — ровный частокол читается как гребёнка;
       · палец ближе к прямоугольнику, чем к кругу, и сужается к кончику;
       · большой крепится широким основанием сбоку ладони, а не встык;
       · пропорции детские: пальцы короче ладони, кисть пухлая, костей не
         видно — вместо костяшек мягкие бугорки.

     Собрана из частей, а не одним контуром: согнуть кусок единого силуэта
     нельзя, а сосчитанный палец здесь загибается. Порядок важен — сначала
     пальцы, потом ладонь поверх них: основания уходят ей под край, и
     согнутый палец прячется в костяшку без шва.
     ── */
  const рука = (шагНомер, сосчитаны, сдвиг, зеркало) => {
    const К = 'var(--контур)';
    /* Кончики идут дугой: средний выше всех, мизинец ниже всех.
       Основания — своей дугой, чуть более пологой. */
    const П = [ {cx: 6.6,  ш: 5.2, кон: 9.8, осн: 20.8},   /* мизинец      */
                {cx: 12.3, ш: 5.6, кон: 4.2, осн: 20.0},   /* безымянный   */
                {cx: 18.0, ш: 5.8, кон: 1.6, осн: 19.6},   /* средний      */
                {cx: 23.5, ш: 5.4, кон: 5.0, осн: 21.8} ]; /* указательный */
    const загнут = n => сосчитаны.indexOf(сдвиг + n) >= 0;

    /* Палец сужается к кончику: у основания шире, чем у ногтя. */
    const палец = (п, i) => {
      const шк = п.ш * .84, r = шк / 2;
      const d = `M${п.cx - п.ш/2},${п.осн}
                 C${п.cx - п.ш/2},${п.осн - (п.осн - п.кон) * .45}
                  ${п.cx - r},${п.кон + r * 2.4} ${п.cx - r},${п.кон + r}
                 A${r},${r} 0 0 1 ${п.cx + r},${п.кон + r}
                 C${п.cx + r},${п.кон + r * 2.4}
                  ${п.cx + п.ш/2},${п.осн - (п.осн - п.кон) * .45} ${п.cx + п.ш/2},${п.осн} Z`;
      return `<g class="палец-фигура${загнут(i) ? ' загнут' : ''}"
                 style="transform-origin:${п.cx}px ${п.осн}px">
        <path d="${d}" fill="var(--кожа)" stroke="${К}" stroke-width=".9"
              stroke-linejoin="round" stroke-linecap="round"/></g>`;
    };

    /* Большой: широкое основание у бугра ладони, короче остальных. */
    const большой = () => `<g class="палец-фигура${загнут(4) ? ' загнут-б' : ''}"
        style="transform-origin:26.4px 28.6px">
      <path d="M25.0,28.8 C23.0,24.4 26.8,18.0 30.2,16.8
               C33.5,15.6 35.7,17.9 34.6,21.0
               C33.5,24.1 30.0,28.4 27.8,29.8
               C26.5,30.6 25.6,30.2 25.0,28.8 Z"
            fill="var(--кожа)" stroke="${К}" stroke-width=".9"
            stroke-linejoin="round" stroke-linecap="round"/></g>`;

    /* Ладонь: верх идёт костяшками — под каждым пальцем свой бугорок,
       справа бугор под большой палец, запястье широкое и округлое. */
    const ладонь = `M2.7,20.2
      Q2.9,17.8 6.6,17.6 Q10.0,17.8 10.3,19.6
      Q11.6,17.2 12.3,17.0 Q15.0,17.2 15.5,19.0
      Q17.0,16.4 18.0,16.2 Q20.1,16.4 21.1,18.6
      Q22.4,17.6 23.5,17.8 Q25.1,18.2 25.5,21.2
      C25.9,23.6 26.3,24.8 26.7,25.8
      C29.3,27.0 30.5,29.2 29.9,31.6
      C28.9,35.4 23.6,37.6 17.4,37.6
      C10.8,37.6 5.2,35.2 3.4,31.0
      C2.4,28.4 2.3,23.4 2.7,20.2 Z`;

    const цели =
      П.map((п, i) => `<rect class="палец-цель" x="${п.cx - п.ш/2 - 1.2}" y="${п.кон - 1.4}"
        width="${п.ш + 2.4}" height="${п.осн - п.кон + 1}" rx="1.4" role="button" tabindex="0"
        aria-label="Палец ${сдвиг + i + 1}" onclick="ЖК10.палец(${шагНомер},${сдвиг + i})"/>`).join('') +
      `<polygon class="палец-цель" points="24.4,29.6 24.0,22.4 29.0,15.6 35.8,16.4 35.8,23.2 28.4,31.2"
        role="button" tabindex="0" aria-label="Палец ${сдвиг + 5}"
        onclick="ЖК10.палец(${шагНомер},${сдвиг + 4})"/>`;

    const пов = зеркало ? ' transform="scale(-1,1) translate(-36,0)"' : '';
    return `<svg class="рука" viewBox="-0.8 -1 37.6 40" role="group" aria-label="Рука, пять пальцев">
      <g${пов}>
        ${П.map(палец).join('')}
        ${большой()}
        <path d="${ладонь}" fill="var(--кожа)" stroke="${К}" stroke-width=".9"
              stroke-linejoin="round" stroke-linecap="round"/>
        ${цели}
      </g></svg>`;
  };

  /* ── ДОМИК: крыша с черепицей, труба с дымком, десять окон с крестовиной ── */
  const крыша = () => {
    /* Черепица рядами внахлёст: ряд смещён на половину плитки, как кладут
       настоящую. Один треугольник с парой линий крышей не выглядит. */
    let плитка = '';
    const РЯДЫ = [[96, 26], [76, 22], [58, 18], [42, 15], [28, 12]];
    РЯДЫ.forEach(([y, в], р) => {
      /* Скат: от конька (143,22) до карниза (2,104) и (284,104). */
      const полу = (y - 22) / 82 * 141;
      const ш = 26, сдвиг = (р % 2) * ш / 2;
      const отступ = в * 141 / 82 + 5;            /* запас под наклон ската */
      const лев = 143 - полу + отступ, прав = 143 + полу - отступ;
      for (let x = лев + сдвиг; x + ш - 3 <= прав; x += ш){
        плитка += `<path d="M${x},${y} h${ш - 3} v${-в} a${(ш-3)/2},${в*.7} 0 0 0 ${-(ш-3)},0 z"
          fill="rgba(255,255,255,.06)" stroke="#3a2515" stroke-width="1.6" opacity=".7"/>`;
      }
    });
    return `<svg class="крыша" viewBox="0 -30 286 140" role="presentation">
      <defs>
        <linearGradient id="чер" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#b86042"/><stop offset="1" stop-color="#733526"/>
        </linearGradient>
        <clipPath id="скат"><path d="M2,104 L143,22 L284,104 Z"/></clipPath>
      </defs>
      <!-- труба кирпичом, с дымком -->
      <g opacity=".8" fill="none" stroke="#e6dcc6" stroke-width="4.5" stroke-linecap="round">
        <path d="M226,6 q-10,-9 -2,-17 q8,-8 0,-16"/>
      </g>
      <rect x="212" y="14" width="26" height="76" fill="#8a4a3a" stroke="#3a2515" stroke-width="4"/>
      <g stroke="#3a2515" stroke-width="1.6" opacity=".45">
        <path d="M212,26 H238"/><path d="M212,38 H238"/><path d="M212,50 H238"/><path d="M212,62 H238"/>
        <path d="M225,14 V26"/><path d="M219,26 V38"/><path d="M231,26 V38"/>
        <path d="M225,38 V50"/><path d="M219,50 V62"/><path d="M231,50 V62"/>
      </g>
      <rect x="208" y="8" width="34" height="11" rx="2" fill="#a05a44" stroke="#3a2515" stroke-width="4"/>
      <!-- скат со свесом за стены -->
      <path d="M2,104 L143,22 L284,104 Z" fill="url(#чер)" stroke="#3a2515" stroke-width="5" stroke-linejoin="round"/>
      <g clip-path="url(#скат)">${плитка}</g>
      <!-- конёк -->
      <path d="M143,22 L143,26" stroke="#3a2515" stroke-width="5"/>
      <path d="M128,32 L143,23 L158,32" fill="#a05a44" stroke="#3a2515" stroke-width="4" stroke-linejoin="round"/>
      <!-- карниз: тень под свесом -->
      <path d="M2,104 H284" stroke="#3a2515" stroke-width="6" stroke-linecap="round"/>
      <path d="M8,98 H278" stroke="rgba(0,0,0,.25)" stroke-width="5"/>
      <!-- табличка с числом -->
      <circle cx="143" cy="76" r="24" fill="#fff6e4" stroke="#3a2515" stroke-width="4"/>
      <circle cx="143" cy="76" r="19" fill="none" stroke="#c9a04a" stroke-width="2.4"/>
      <text x="143" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="28"
            font-weight="bold" fill="#2a2118">10</text>
    </svg>`;
  };

  const дверь = () => `<svg class="дверь" viewBox="0 0 286 96" role="presentation">
    <!-- тёплое пятно света от окон: по нему видно, что в доме живут -->
    <ellipse cx="143" cy="68" rx="141" ry="22" fill="rgba(255,196,96,.16)"/>
    <ellipse cx="143" cy="68" rx="104" ry="16" fill="rgba(255,206,120,.16)"/>
    <!-- цоколь камнем -->
    <rect x="0" y="0" width="286" height="18" fill="#6b6257" stroke="#3a2515" stroke-width="4"/>
    <g stroke="#3a2515" stroke-width="1.6" opacity=".42">
      <path d="M38,0 V18"/><path d="M92,0 V18"/><path d="M143,0 V18"/><path d="M194,0 V18"/><path d="M248,0 V18"/>
    </g>
    <!-- земля -->
    <path d="M0,24 Q60,18 143,20 Q226,22 286,18 L286,96 L0,96 Z" fill="#2f5137"/>
    <path d="M0,24 Q60,18 143,20 Q226,22 286,18" fill="none" stroke="#24412b" stroke-width="3"/>
    <!-- дверь с косяком, филёнками и ступенькой -->
    <rect x="108" y="6" width="70" height="50" rx="4" fill="#5d3a20" stroke="#3a2515" stroke-width="4"/>
    <rect x="115" y="12" width="56" height="44" rx="3" fill="#8a5c35" stroke="#3a2515" stroke-width="3"/>
    <rect x="122" y="18" width="42" height="14" rx="2" fill="none" stroke="#3a2515" stroke-width="2.2" opacity=".5"/>
    <rect x="122" y="36" width="42" height="14" rx="2" fill="none" stroke="#3a2515" stroke-width="2.2" opacity=".5"/>
    <circle cx="164" cy="36" r="3.6" fill="#ffd15c" stroke="#3a2515" stroke-width="2"/>
    <rect x="98" y="54" width="90" height="9" rx="3" fill="#6b6257" stroke="#3a2515" stroke-width="3.5"/>
    <!-- фонарь у двери -->
    <path d="M192,10 v8" stroke="#3a2515" stroke-width="3"/>
    <path d="M186,18 h12 l-2,13 h-8 z" fill="#ffd15c" stroke="#3a2515" stroke-width="3" stroke-linejoin="round"/>
    <!-- палисадник -->
    <g stroke="#3a2515" stroke-width="3" fill="#a06b3d">
      ${[8,28,48,68].map(x=>`<path d="M${x},34 h11 v30 h-11 z"/>`).join('')}
      ${[206,226,246,266].map(x=>`<path d="M${x},34 h11 v30 h-11 z"/>`).join('')}
      <path d="M6,42 H83" stroke-width="3.5"/><path d="M6,54 H83" stroke-width="3.5"/>
      <path d="M204,42 H281" stroke-width="3.5"/><path d="M204,54 H281" stroke-width="3.5"/>
    </g>
    <!-- кустики -->
    <g stroke="#24412b" stroke-width="3">
      <ellipse cx="92" cy="62" rx="15" ry="11" fill="#3f6b43"/>
      <ellipse cx="200" cy="64" rx="13" ry="10" fill="#3f6b43"/>
    </g>
  </svg>`;

  const домик = (горят, кликабельно, шагНомер) =>
    `<div class="домик">` + крыша() + `<div class="стены">` +
    Array.from({length:10}, (_,i) =>
      `<button type="button" class="окно${горят.indexOf(i)>=0?' горит':''}"
        ${кликабельно?`onclick="ЖК10.окно(${шагНомер},${i})"`:'disabled'}
        aria-label="Окно ${i+1}${горят.indexOf(i)>=0?', горит':', тёмное'}"></button>`).join('') +
    `</div>` + дверь() + `</div>`;

  /* маленький домик для кадра-зеркала */
  const домишко = (сколько) =>
    `<div style="width:124px">
      <svg viewBox="0 0 124 44" style="display:block;width:100%">
        <path d="M3,42 L62,8 L121,42 Z" fill="#9c4f38" stroke="#3a2515" stroke-width="4" stroke-linejoin="round"/>
      </svg>
      <div class="стены" style="gap:6px;padding:8px;border-width:3px">` +
      Array.from({length:10},(_,j)=>
        `<span class="окно${j<сколько?' горит':''}" style="display:block;min-height:22px;border-width:3px"></span>`).join('') +
      `</div>
    </div>`;

  /* ── ГИРЛЯНДА: провод провисает, на нём десять лампочек ── */
  const гирлянда = (горят, кликабельно, шагНомер) => {
    /* Провод и лампочки — один рисунок: лампы висят НА проводе, и разделять
       их на две картинки неправильно и по смыслу, и по проверке. Цели
       касания лежат прозрачными кнопками поверх. */
    const X0 = 16, X1 = 304, СЕР = (X0 + X1) / 2, Ш = 320, В = 196;
    const провис = (низ) => `M${X0},18 Q${СЕР},${18 + (низ - 18) * 2} ${X1},18`;
    const Y = (t, низ) => 18 + (низ - 18) * 4 * t * (1 - t);
    const ряды = [[0, 56], [5, 122]];
    let колбы = '', цели = '';
    ряды.forEach(([смещ, низ]) => {
      for (let k = 0; k < 5; k++){
        const t = (k + .5) / 5, i = смещ + k, есть = горят.indexOf(i) >= 0;
        const x = X0 + (X1 - X0) * t, y = Y(t, низ);
        колбы += `<g transform="translate(${x - 17},${y})" class="${есть ? 'горит' : ''}">
          <rect x="10" y="0" width="14" height="10" rx="2" fill="#6f4526" stroke="#3a2515" stroke-width="3"/>
          <path class="колба" d="M17,10 q12,0 12,15 q0,17 -12,26 q-12,-9 -12,-26 q0,-15 12,-15 z"/>
        </g>`;
        if (кликабельно)
          цели += `<rect class="лампа-цель" x="${x - 25}" y="${y - 4}" width="50" height="58" rx="10"
            role="button" tabindex="0" aria-label="Лампочка ${i+1}${есть?', горит':', тёмная'}"
            onclick="ЖК10.окно(${шагНомер},${i})"/>`;
      }
    });
    return `<div class="гирлянда">
      <svg class="шнур" viewBox="0 0 ${Ш} ${В}">
        <defs><radialGradient id="жарко"><stop offset="0" stop-color="#fff4cd"/>
          <stop offset="1" stop-color="#ffb43f"/></radialGradient></defs>
        <path d="${провис(56)}" fill="none" stroke="#3a2515" stroke-width="5"/>
        <path d="${провис(122)}" fill="none" stroke="#3a2515" stroke-width="5"/>
        ${колбы}${цели}
      </svg></div>`;
  };

  /* ── ЗВЁЗДЫ: два ряда по пять. Россыпь наугад ставила звёзды внахлёст и
        уводила центр рисунка к краю кадра; сетка и ровнее, и честнее. ── */
  const звёзды = (горят, кликабельно, шагНомер) => {
    const луч = 'M28,4 L34.6,20.6 L52,21.6 L38.4,32.8 L43,49.6 L28,40 L13,49.6 L17.6,32.8 L4,21.6 L21.4,20.6 Z';
    return `<div class="звёзды">` + Array.from({length:10},(_,i)=>{
      const есть = горят.indexOf(i) >= 0;
      return `<button type="button" class="звезда${есть?' горит':''}"
        ${кликабельно?`onclick="ЖК10.окно(${шагНомер},${i})"`:'disabled'}
        aria-label="Звезда ${i+1}${есть?', горит':', тусклая'}">
        <svg viewBox="0 0 56 56"><path d="${луч}"/></svg></button>`;
    }).join('') + `</div>`;
  };

  /* ── ГРЯДКА: десять лунок, в занятых растёт морковка ── */
  const грядка = (занято, кликабельно, шагНомер) =>
    `<div class="грядка">` + Array.from({length:10},(_,i)=>{
      const есть = i < занято;
      return `<button type="button" class="лунка${есть?' горит':''}"
        ${кликабельно?`onclick="ЖК10.окно(${шагНомер},${i})"`:'disabled'}
        aria-label="Лунка ${i+1}${есть?', занята':', пустая'}">
        <svg viewBox="0 0 46 72">
          <ellipse cx="23" cy="58" rx="16" ry="7" fill="#33210f" opacity=".85"/>
          <ellipse cx="23" cy="56" rx="13" ry="5" fill="#6b4a2c" opacity=".7"/>
          <g class="росток">
            <!-- ботва: пять перьев из одной точки -->
            <path d="M23,30 C16,22 10,16 6,8 C14,12 20,20 23,30 Z" fill="#4f8f3a" stroke="#2c5a20" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M23,30 C19,20 17,12 17,3 C23,10 25,20 23,30 Z" fill="#5ea343" stroke="#2c5a20" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M23,30 C25,20 28,11 33,4 C34,14 29,23 23,30 Z" fill="#4f8f3a" stroke="#2c5a20" stroke-width="2.2" stroke-linejoin="round"/>
            <path d="M23,30 C29,23 35,18 41,14 C37,23 30,29 23,30 Z" fill="#69b04b" stroke="#2c5a20" stroke-width="2.2" stroke-linejoin="round"/>
            <!-- корень: плечо и сбег на остриё -->
            <path d="M23,30 C30,30 33,34 32,40 L25,60 Q23,64 21,60 L14,40 C13,34 16,30 23,30 Z"
                  fill="#e2802c" stroke="#8a4a15" stroke-width="2.6" stroke-linejoin="round"/>
            <g stroke="#a85a18" stroke-width="1.6" opacity=".7" fill="none">
              <path d="M16,38 q7,3 14,0"/><path d="M17.5,45 q5.5,2.6 11,0"/><path d="M19,52 q4,2 8,0"/>
            </g>
            <path d="M19,33 q4,-2 8,0" stroke="rgba(255,255,255,.4)" stroke-width="2.4" fill="none"/>
          </g>
        </svg></button>`;
    }).join('') + `</div>`;

  /* ── морковка для грядки: в корзинке у морковной грядки должна лежать
        морковка, а не орех ── */
  const морковка = (улетел, шагНомер, надо, n) =>
    `<button type="button" class="орех${улетел?' улетел':''}"
       onclick="ЖК10.орех(${шагНомер},${надо})" aria-label="Морковка ${n}">
      <svg viewBox="0 0 56 56">
        <path d="M28,20 C21,13 15,9 10,4 C18,6 25,12 28,20 Z" fill="#4f8f3a" stroke="#2c5a20" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M28,20 C24,12 22,7 22,1 C28,6 30,13 28,20 Z" fill="#5ea343" stroke="#2c5a20" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M28,20 C31,12 34,6 39,1 C40,9 35,16 28,20 Z" fill="#4f8f3a" stroke="#2c5a20" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M28,20 C34,15 41,11 47,9 C43,16 36,20 28,20 Z" fill="#69b04b" stroke="#2c5a20" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M28,20 C36,20 40,25 38,32 L31,50 Q28,55 25,50 L18,32 C16,25 20,20 28,20 Z"
              fill="#e2802c" stroke="#8a4a15" stroke-width="3" stroke-linejoin="round"/>
        <g stroke="#a85a18" stroke-width="1.8" opacity=".7" fill="none">
          <path d="M20,29 q8,3.4 16,0"/><path d="M22,37 q6,3 12,0"/><path d="M24,44 q4,2.4 8,0"/>
        </g>
        <path d="M23,24 q5,-2.4 10,0" stroke="rgba(255,255,255,.42)" stroke-width="2.8" fill="none"/>
      </svg></button>`;

  /* ── ОРЕХ ── */
  const орех = (улетел, шагНомер, надо, n) =>
    `<button type="button" class="орех${улетел?' улетел':''}"
       onclick="ЖК10.орех(${шагНомер},${надо})" aria-label="Орешек ${n}">
      <svg viewBox="0 0 56 56">
        <path d="M28,4 q20,0 20,22 q0,20 -20,28 q-20,-8 -20,-28 q0,-22 20,-22 z"
              fill="#c98a45" stroke="#6b4423" stroke-width="4"/>
        <path d="M28,6 v46" stroke="#6b4423" stroke-width="3" opacity=".6"/>
        <path d="M14,24 q14,6 28,0" stroke="#6b4423" stroke-width="3" fill="none" opacity=".45"/>
        <ellipse cx="20" cy="18" rx="5" ry="7" fill="#e3ab72" opacity=".55"/>
      </svg></button>`;

  const числа = (список, выбран, верный, шагНомер, ключ, мимо) =>
    `<div class="числа">` + список.map(n => {
      let кл = '';
      if (выбран != null) кл = (n === верный) ? ' верно' : (n === выбран ? ' мимо' : '');
      else if (мимо != null && n === мимо) кл = ' мимо';   /* промах, но выбор не закрыт */
      return `<button type="button" class="число${кл}" ${выбран!=null?'disabled':''}
        onclick="ЖК10.число(${шагНомер},'${ключ}',${n})">${n}</button>`;
    }).join('') + `</div>`;

  const готово = (текст) => `<p class="готово"><span aria-hidden="true">✓</span>${текст}</p>`;


  /* ─────────────────── кадры ───────────────────
     Десяток в каждом кадре — новый предмет, но задача одна и та же.
     Это и снимает повторы, и учит приёму, а не картинке. */
  const КАДРЫ = [
  /* 0 · РУКИ */ {
    t:'Десять пальцев',
    say:'Привет! Я Пых. Посчитаем вместе — загибай пальцы по одному.',
    рисуй(i, st){
      const с = st.пальцы || [];
      return `<div class="сцена днём"><div class="поверх">
        <div class="руки">${рука(i, с, 0, true)}${рука(i, с, 5, false)}</div>
        <p class="счёт"><span class="табло">${с.length}</span></p>
      </div></div>` + (с.length===10 ? готово('Десять! Оба кулака — и ровно столько окон в моём домике.') : '');
    },
    готов: st => (st.пальцы||[]).length === 10,
    делать:'Загни каждый палец — нажми на него'
  },
  /* 1 · ДОМИК, свободная игра */ {
    t:'Домик числа 10',
    say:'В домике десять окон. Зажигай какие хочешь и смотри вниз.',
    рисуй(i, st){
      const г = st.окна || [];
      return `<div class="сцена">${небо(10)}<div class="поверх">
        ${домик(г, true, i)}
        <p class="счёт">
          <span class="жёлт">горит <b>${г.length}</b></span>
          <span class="синь">темно <b>${10-г.length}</b></span>
          <span class="итог">вместе всегда <b>10</b></span>
        </p>
      </div></div>` + (st.видел ? готово('Как ни зажигай — светлых и тёмных вместе десять.') : '');
    },
    готов: st => !!st.видел,
    делать:'Попробуй зажечь по-разному — хотя бы три раза'
  },
  /* 2 · ГИРЛЯНДА */ {
    t:'Сколько тёмных?',
    say:'Ёлочная гирлянда. Шесть лампочек горят. Сколько тёмных?',
    рисуй(i, st){
      return `<div class="сцена вечер"><div class="поверх">
        ${гирлянда([0,1,2,3,4,5], false, i)}
      </div></div>`
        + числа([2,3,4,5], st.ответ, 4, i, 'ответ')
        + (st.ответ===4 ? готово('Верно! 6 и 4 — это десять. Лампочек столько же, сколько окон.') : '');
    },
    готов: st => st.ответ === 4,
    делать:'Выбери число'
  },
  /* 3 · ЗВЁЗДЫ */ {
    t:'Собери пару',
    say:'Семь звёздочек уже зажглись. Сколько ещё должно зажечься?',
    рисуй(i, st){
      return `<div class="сцена"><div class="поверх">
        ${звёзды([0,1,2,3,4,5,6], false, i)}
      </div></div>`
        + числа([2,3,4,5], st.ответ, 3, i, 'ответ')
        + (st.ответ===3 ? готово('Да! 7 и 3 — это десять. И тут десяток, только звёздный.') : '');
    },
    готов: st => st.ответ === 3,
    делать:'Выбери число'
  },
  /* 4 · СВИТОК: лестница пар */ {
    t:'Лестница пар',
    say:'Вот все пары к десяти. Трёх чисел не хватает — поставь их.',
    рисуй(i, st){
      const пары = [[1,9],[2,8],[3,7],[4,6],[5,5],[6,4],[7,3],[8,2],[9,1]];
      const дырки = {2:7, 5:4, 7:2};
      const пост = st.пост || {};
      return `<div class="сцена бумага"><div class="поверх"><div class="лестница">` + пары.map(([a,b],j)=>{
        if (дырки[j] === undefined)
          return `<div class="ступень">${a} <span>и</span> ${b}</div>`;
        const занято = пост[j] === дырки[j];
        if (занято)
          return `<div class="ступень решена">${a} <span>и</span>
            <span class="дырка занята" aria-label="${дырки[j]}">${дырки[j]}</span></div>`;
        const выбран = st.выбираю === j;
        return `<div class="ступень">${a} <span>и</span>
          <button type="button" class="дырка${выбран?' выбран':''}"
            onclick="ЖК10.дырка(${i},${j})" aria-label="Пропуск в паре ${a} и ...">?</button></div>`;
      }).join('') + `</div></div></div>`
      + (st.выбираю != null ? числа([2,3,4,5,6,7,8], null, null, i, 'дырка', st.мимо) : '')
      + (Object.keys(пост).length===3 ? готово('Все девять пар собраны. Это и есть состав числа 10.') : '');
    },
    готов: st => Object.keys(st.пост||{}).length === 3,
    делать:'Нажми на пропуск, потом на число'
  },
  /* 5 · ДВА ДОМИКА */ {
    t:'Зеркало',
    say:'Слева три окна и семь. Справа семь и три. Домик полон в обоих?',
    рисуй(i, st){
      return `<div class="сцена"><div class="поверх"
          style="flex-direction:row;justify-content:center;gap:14px;align-items:flex-start">
        ${домишко(3)}${домишко(7)}
      </div></div>`
      + числа([0,1], st.ответ, 1, i, 'зеркало').replace('>0<','>нет<').replace('>1<','>да<')
      + (st.ответ===1 ? готово('Да. 3 и 7 — то же самое, что 7 и 3. Пары можно переворачивать.') : '');
    },
    готов: st => st.ответ === 1,
    делать:'Ответь: да или нет'
  },
  /* 6 · МОЛНИЯ */ {
    t:'Молния',
    say:'Быстро! Сколько не хватает до десяти?',
    рисуй(i, st){
      const вопросы = [8,5,2,9];
      const ряд = st.ряд || 0, п = st.пройдено || [];
      if (ряд >= вопросы.length)
        return `<div class="сцена">${небо(10)}<div class="поверх">
            <p class="счёт" style="font-size:24px"><b class="жёлт">${вопросы.map(a=>a+' и '+(10-a)).join('  ·  ')}</b></p>
          </div></div>` + готово('Четыре пары подряд. Ты их уже помнишь!');
      const a = вопросы[ряд];
      return `<div class="сцена">${небо(10)}<div class="поверх">
          <p class="счёт" style="font-size:38px"><b class="жёлт">${a}</b> <span>и ?</span></p>
          <p class="счёт" style="font-size:16px">пройдено ${п.length} из 4</p>
        </div></div>`
        + числа([10-a===1?2:1, 10-a, 10-a===8?7:8, 5].filter((v,k,arr)=>arr.indexOf(v)===k).sort((x,y)=>x-y),
                null, null, i, 'молния', st.выбран);
    },
    готов: st => (st.пройдено||[]).length === 4,
    делать:'Четыре вопроса подряд'
  },
  /* 7 · ДОМИК И ОРЕХИ — возврат к домику осмысленный: это его развязка */ {
    t:'Зачем это нужно: 8 и ещё 5',
    say:'В домике горит восемь. У меня пять орешков. Сколько станет всего?',
    рисуй(i, st){
      const п = st.перенесено || 0;
      const горят = Array.from({length:8+п},(_,j)=>j);
      return `<div class="сцена">${небо(9)}<div class="поверх">
        ${домик(горят, false, i)}
        <div class="лапка">` + Array.from({length:5},(_,j)=>орех(j<п, i, 2, j+1)).join('') + `</div>
        <p class="счёт"><span class="жёлт">в домике <b>${8+п}</b></span>
          <span class="синь">в лапке <b>${5-п}</b></span></p>
      </div></div>`
      + (п>=2 ? готово('Домик полон — это 10. В лапке осталось 3. Десять и ещё три — тринадцать!') : '');
    },
    готов: st => (st.перенесено||0) >= 2,
    делать:'Дополни домик до десяти'
  },
  /* 8 · ГРЯДКА */ {
    t:'Теперь сам: 7 и ещё 6',
    say:'На грядке семь морковок, в корзинке шесть. Заполни грядку.',
    рисуй(i, st){
      const п = st.перенесено || 0;
      return `<div class="сцена днём"><div class="поверх">
        ${грядка(7+п, false, i)}
        <div class="лапка">` + Array.from({length:6},(_,j)=>морковка(j<п, i, 3, j+1)).join('') + `</div>
        <p class="счёт"><span class="жёлт">на грядке <b>${7+п}</b></span>
          <span class="синь">в корзинке <b>${6-п}</b></span></p>
      </div></div>`
      + (п>=3 ? числа([12,13,14,15], st.ответ, 13, i, 'ответ') : '')
      + (st.ответ===13 ? готово('Верно! 7 и 6 — это тринадцать.') : '');
    },
    готов: st => st.ответ === 13,
    делать:'Сначала заполни грядку, потом выбери ответ'
  },
  /* 9 · ПАМЯТКА */ {
    t:'Что запомнить',
    say:'Вот все пары к десяти. Знаешь их — считаешь быстро.',
    рисуй(){
      const пары = [[1,9],[2,8],[3,7],[4,6],[5,5]];
      return `<div class="сцена бумага"><div class="поверх"><div class="памятка">` +
        пары.map(([a,b])=>`<div>${a} и ${b}</div>`).join('') +
        `<div style="background:#bde5cb;border-color:#2f6b46;color:#2f6b46">и наоборот: 9 и 1, 8 и 2…</div>` +
        `</div></div></div>`;
    },
    готов: () => true,
    делать:'Прочитай вслух — и запомнится само'
  }
  ];

  /* ─────────────────── обработчики касаний ─────────────────── */
  window.ЖК10 = {
    палец(i, j){
      const st = сост(i); st.пальцы = st.пальцы || [];
      if (st.пальцы.indexOf(j) < 0) st.пальцы.push(j);
      перерисовать();
    },
    окно(i, j){
      const st = сост(i); st.окна = st.окна || [];
      const k = st.окна.indexOf(j);
      if (k < 0) st.окна.push(j); else st.окна.splice(k, 1);
      /* «Видел правило» — не по числу нажатий, а по числу РАЗНЫХ картинок:
         ребёнок должен увидеть, что сумма держится при любом раскладе. */
      st.виды = st.виды || [];
      const вид = st.окна.length;
      if (st.виды.indexOf(вид) < 0) st.виды.push(вид);
      if (st.виды.length >= 3) st.видел = true;
      перерисовать();
    },
    число(i, ключ, n){
      const st = сост(i);
      if (ключ === 'дырка'){
        if (st.выбираю == null) return;
        const нужно = {2:7, 5:4, 7:2}[st.выбираю];
        if (n === нужно){ st.пост = st.пост || {}; st.пост[st.выбираю] = n; st.выбираю = null; st.мимо = null; }
        else st.мимо = n;                       /* промах показываем, а не глотаем */
        перерисовать(); return;
      }
      if (ключ === 'молния'){
        const вопросы = [8,5,2,9], ряд = st.ряд || 0;
        if (n === 10 - вопросы[ряд]){
          st.пройдено = st.пройдено || []; st.пройдено.push(ряд);
          st.ряд = ряд + 1; st.выбран = null;
        } else st.выбран = n;
        перерисовать(); return;
      }
      if (ключ === 'зеркало' || ключ === 'ответ'){ st.ответ = n; перерисовать(); return; }
    },
    дырка(i, j){ const st = сост(i); st.выбираю = j; перерисовать(); },
    орех(i, надо){
      const st = сост(i); st.перенесено = Math.min(надо, (st.перенесено || 0) + 1);
      перерисовать();
    }
  };

  /* ─────────────────── отрисовка кадра ─────────────────── */
  function рисовать(el){
    стиль();
    const i = шаг(), к = КАДРЫ[i], st = сост(i);
    const настроение = к.готов(st) ? 'рад' : 'думает';
    el.innerHTML = `<div class="${ДОМ}">
      <div class="реплика">${ёжик(настроение)}<p>${к.say}</p></div>
      ${к.рисуй(i, st)}
      ${к.готов(st) ? '' : `<p class="что-делать">${к.делать}</p>`}
    </div>`;
  }

  /* ─────────────────── регистрация ─────────────────── */
  window.WAVE_B = window.WAVE_B || {};
  window.WAVE_B[ID] = function(el){
    try { рисовать(el); }
    catch(e){ el.innerHTML = ''; try{ console.error('лист ' + ID + ':', e); }catch(_){ } }
  };

  if (window.ARH_LESSONS && !window.ARH_LESSONS.some(x => x.id === ID)){
    window.ARH_LESSONS.push({
      id: ID, title: 'Домик числа 10', ico: '🏠',
      src: 'Начальная школа · 1–2 класс · Состав числа 10',
      subj: 'jun',
      explain: КАДРЫ.map((к, i) => (i + 1) + '. ' + к.t),
      check: {
        q: 'В домике горит 6 окон. Сколько тёмных?',
        choices: ['3', '4', '5', '6'],
        ans: 1,
        exp: 'Окон всего десять. Шесть горят, значит тёмных 10 − 6 = 4. Светлые и тёмные вместе всегда дают десять.'
      },
      tasks: [
        {q:'Сколько не хватает до десяти, если уже есть 8?', kind:'unit', ans:2, tol:0,
         hints:['Представь домик: восемь окон уже горят.','Сколько окон осталось тёмных?','8 и 2 — это десять.'], sol:'2'},
        {q:'Чему равно 9 + 4?', kind:'unit', ans:13, tol:0,
         hints:['Сначала дополни девять до десяти.','Возьми из четвёрки один: 9 и 1 — это десять.','Осталось 3: десять и ещё три — тринадцать.'], sol:'13'}
      ]
    });
  }
})();
