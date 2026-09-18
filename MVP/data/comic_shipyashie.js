/* ============ ЛИСТ 632 · «ЖИ-ШИ, ЧА-ЩА, ЧУ-ЩУ» · живой комикс для 1–2 класса ====

   ЗАЧЕМ ЭТОТ УРОК УСТРОЕН ИМЕННО ТАК

   Правило про шипящие обычно дают как три строчки для заучивания: «жи-ши пиши
   с буквой и». Строчки запоминаются, а рука всё равно пишет «машына», потому
   что ребёнок не знает, ПОЧЕМУ так. Причина простая и её видно:

     Ж и Ш — всегда твёрдые. Буква Ы нужна, чтобы согласный звучал твёрдо,
             а этим двум твёрдость и так не отнять — значит Ы не нужна.
     Ч и Щ — всегда мягкие. Буквы Я и Ю нужны, чтобы смягчить, а этих двух
             смягчать не надо — значит пишем А и У.

   Поэтому урок начинается не с правила, а с ПРОВЕРКИ ЗВУКА руками: ребёнок
   нажимает на букву и видит, твёрдая она или мягкая. Правило выводится из
   того, что он сам потрогал, — и только потом называется.

   КАЖДЫЙ КАДР — СВОЯ КАРТИНКА И СВОЙ ПРИЁМ. Это правило урока 253, и здесь
   оно то же. Девять кадров — девять разных действий:

     мастерская  — нажать на каждую букву и услышать, твёрдая она или мягкая;
     две таблички— выбрать, какая гласная встанет после Ж;
     поляна      — найти предметы, в названии которых живёт ЖИ или ШИ;
     четыре буквы— убрать те, что после Ч и Щ не пишутся;
     карточки    — поймать слова с ошибкой;
     пропуски    — вставить буквосочетание в слово;
     молния      — четыре быстрых выбора подряд;
     три записи  — одно слово, три написания, одно верное;
     памятка     — три строки и скороговорка.

   Ни один кадр не повторяет предыдущий приём подряд, и ни один не уводит
   ребёнка из приложения: ни скачиваний, ни чужих сервисов, ни ссылок.

   СЛОВА ПОДОБРАНЫ ТАК, ЧТОБЫ ЛОВУШКА БЫЛА ЧЕСТНОЙ. В кадре поиска лишние
   предметы — не «роза» и «гриб», в которых шипящих нет вовсе, а «жук», «шар»
   и «жаба»: буква та же самая, а буквосочетание другое. Ребёнок вынужден
   смотреть на пару букв, а не на одну.

   Рисунки свои. Пых — картинка владельца (MVP/img/pykh.png), как в уроках
   256 и 257; под ней вектор на случай офлайна.
   ============================================================================ */
(function(){
  'use strict';

  const ID = 632;
  const ДОМ = 'шип';                     /* префикс классов, чтобы ничего не задеть */

  /* ─────────────────── стили ─────────────────── */
  const СТИЛЬ = `
  #lvis .${ДОМ}{
    --лист:#f6e7c8; --лист-2:#efd9b0; --чернила:#2a2118; --тихо:#6b5b45;
    --камень:#5a6b80; --камень-2:#41505f; --камень-свет:#8ea1b6;
    --мох:#6f9350; --мох-2:#53713a; --мох-свет:#a8c98a;
    --верно:#2f6b46; --верно-фон:#d8ecdd; --мимо:#a83f28; --мимо-фон:#f6ddd5;
    --рамка:#3a2515;
    font-family:Georgia,'Times New Roman',serif; color:var(--чернила);
    display:flex; flex-direction:column; gap:14px; padding:2px;
  }
  #lvis .${ДОМ} *{box-sizing:border-box}
  /* Телефон рисует свою подсветку по нажатой кнопке и ждёт второго тапа.
     Гасим и то и другое — иначе по рисунку ползёт серый прямоугольник. */
  #lvis .${ДОМ} button{
    -webkit-tap-highlight-color:transparent; -webkit-touch-callout:none;
    user-select:none; -webkit-user-select:none; touch-action:manipulation;
    font-family:inherit; color:inherit;
  }

  /* реплика Пыха: одна короткая строка крупными буквами */
  #lvis .${ДОМ} .реплика{
    display:flex; align-items:flex-start; gap:12px;
    background:var(--лист); border:2px solid var(--рамка); border-radius:18px;
    padding:14px 16px; box-shadow:0 3px 0 rgba(58,37,21,.2);
  }
  #lvis .${ДОМ} .реплика p{margin:0; font-size:20px; line-height:1.35; font-weight:bold}
  #lvis .${ДОМ} .пых{position:relative; display:inline-block; width:58px; height:72px; flex:none}
  #lvis .${ДОМ} .пых img{position:absolute; inset:0; width:100%; height:100%;
    object-fit:contain; z-index:2}
  #lvis .${ДОМ} .пых-запас{position:absolute; inset:0; display:block; z-index:1}
  #lvis .${ДОМ} .пых-запас svg{width:100%; height:100%}

  /* сцена: у каждого кадра свой фон */
  #lvis .${ДОМ} .сцена{
    position:relative; overflow:hidden;
    border:2px solid var(--рамка); border-radius:18px; padding:16px 12px 14px;
    display:flex; flex-direction:column; align-items:center; gap:12px;
    background:linear-gradient(180deg,var(--лист) 0%,var(--лист-2) 100%);
  }
  #lvis .${ДОМ} .сцена.мастерская{
    background:linear-gradient(180deg,#3d4a5c 0%,#4f5f72 62%,#6b5a44 100%); color:#f6e7c8}
  #lvis .${ДОМ} .сцена.поляна{
    background:linear-gradient(180deg,#bfe3f2 0%,#dcefc6 62%,#9ac47c 100%)}
  #lvis .${ДОМ} .сцена.вечер{
    background:linear-gradient(180deg,#4a3a5e 0%,#8a5468 60%,#c9763f 100%); color:#fff6e4}

  /* ── плитки букв: камень (твёрдые) и мох (мягкие) ── */
  #lvis .${ДОМ} .буквы{display:flex; flex-wrap:wrap; gap:12px; justify-content:center}
  #lvis .${ДОМ} .плитка{
    appearance:none; width:66px; height:66px; padding:0; border-radius:14px;
    border:3px solid var(--рамка); cursor:pointer;
    font-size:34px; font-weight:bold; line-height:1;
    display:flex; align-items:center; justify-content:center;
    transition:transform 200ms cubic-bezier(.22,.9,.24,1), box-shadow 200ms ease;
  }
  #lvis .${ДОМ} .плитка.камень{background:var(--камень); color:#fff;
    box-shadow:0 5px 0 var(--камень-2)}
  #lvis .${ДОМ} .плитка.мох{background:var(--мох); color:#fff;
    box-shadow:0 5px 0 var(--мох-2)}
  /* Гласные красим отдельно. Камень и мох — это про твёрдость согласного;
     покрасить ими А, Я, У, Ю значит соврать ребёнку прямо в цвете. */
  #lvis .${ДОМ} .плитка.гласная{background:#c8922c; color:#2a2118;
    box-shadow:0 5px 0 #9a6d1d}
  #lvis .${ДОМ} .плитка.гласная:active{transform:translateY(2px); box-shadow:0 3px 0 #9a6d1d}
  /* Твёрдая буква на нажатие не поддаётся — только вздрагивает.
     Мягкая проминается: это и есть разница, которую ребёнок должен увидеть. */
  #lvis .${ДОМ} .плитка.камень:active{transform:translateY(2px); box-shadow:0 3px 0 var(--камень-2)}
  #lvis .${ДОМ} .плитка.мох:active{transform:scaleY(.72) translateY(6px); box-shadow:0 1px 0 var(--мох-2)}
  #lvis .${ДОМ} .плитка.проверена{outline:3px solid #ffd15c; outline-offset:3px}
  #lvis .${ДОМ} .плитка:focus-visible{outline:3px solid #ffd15c; outline-offset:3px}
  #lvis .${ДОМ} .ярлык{
    display:flex; flex-wrap:wrap; gap:10px; justify-content:center;
    font-size:15px; font-weight:bold;
  }
  #lvis .${ДОМ} .ярлык span{
    background:rgba(255,255,255,.9); color:var(--чернила);
    border:2px solid var(--рамка); border-radius:999px; padding:4px 12px;
  }

  /* ── таблички: два написания рядом ── */
  #lvis .${ДОМ} .таблички{display:flex; gap:14px; flex-wrap:wrap; justify-content:center}
  #lvis .${ДОМ} .табличка{
    appearance:none; min-width:112px; min-height:74px; padding:10px 18px;
    background:#fffaf0; border:3px solid var(--рамка); border-radius:16px;
    font-size:32px; font-weight:bold; cursor:pointer;
    box-shadow:0 4px 0 rgba(58,37,21,.28);
    transition:transform 140ms ease;
  }
  #lvis .${ДОМ} .табличка:active{transform:translateY(3px); box-shadow:0 1px 0 rgba(58,37,21,.28)}
  #lvis .${ДОМ} .табличка.верно{background:var(--верно-фон); border-color:var(--верно); color:var(--верно)}
  #lvis .${ДОМ} .табличка.мимо{background:var(--мимо-фон); border-color:var(--мимо); color:var(--мимо)}
  #lvis .${ДОМ} .табличка:disabled{cursor:default}

  /* ── поляна: предметы для поиска ── */
  #lvis .${ДОМ} .предметы{
    display:grid; grid-template-columns:repeat(3,1fr); gap:10px;
    width:100%; max-width:330px;
  }
  #lvis .${ДОМ} .предмет{
    appearance:none; padding:6px 2px 4px; background:rgba(255,255,255,.72);
    border:3px solid var(--рамка); border-radius:14px; cursor:pointer;
    display:flex; flex-direction:column; align-items:center; gap:2px;
    transition:transform 160ms ease, background 200ms ease, border-color 200ms ease;
  }
  #lvis .${ДОМ} .предмет svg{width:100%; height:auto; display:block; max-width:76px}
  #lvis .${ДОМ} .предмет b{font-size:15px; letter-spacing:.3px}
  #lvis .${ДОМ} .предмет:active{transform:scale(.94)}
  #lvis .${ДОМ} .предмет.нашёл{background:var(--верно-фон); border-color:var(--верно)}
  #lvis .${ДОМ} .предмет.нашёл b{color:var(--верно)}
  #lvis .${ДОМ} .предмет.мимо{background:var(--мимо-фон); border-color:var(--мимо)}
  #lvis .${ДОМ} .предмет.мимо b{color:var(--мимо)}
  #lvis .${ДОМ} .предмет:focus-visible{outline:3px solid #ffd15c; outline-offset:2px}
  /* Подсветка найденного буквосочетания прямо в подписи: ребёнок видит не
     «слово верное», а ГДЕ именно оно верное. */
  #lvis .${ДОМ} .предмет .мет{background:#ffd15c; border-radius:4px; padding:0 2px}

  /* ── карточки со словами ── */
  #lvis .${ДОМ} .карточки{display:flex; flex-wrap:wrap; gap:10px; justify-content:center}
  #lvis .${ДОМ} .карточка{
    appearance:none; min-height:52px; padding:10px 16px;
    background:#fffaf0; border:3px solid var(--рамка); border-radius:14px;
    font-size:22px; cursor:pointer; box-shadow:0 3px 0 rgba(58,37,21,.24);
    transition:transform 140ms ease;
  }
  #lvis .${ДОМ} .карточка:active{transform:translateY(2px)}
  #lvis .${ДОМ} .карточка.поймал{background:var(--мимо-фон); border-color:var(--мимо);
    color:var(--мимо); text-decoration:line-through}
  #lvis .${ДОМ} .карточка.чисто{background:var(--верно-фон); border-color:var(--верно); color:var(--верно)}
  #lvis .${ДОМ} .карточка:focus-visible{outline:3px solid #ffd15c; outline-offset:2px}

  /* ── слова с пропуском ── */
  #lvis .${ДОМ} .слова{display:flex; flex-direction:column; gap:8px; width:100%; max-width:300px}
  #lvis .${ДОМ} .слово{
    appearance:none; width:100%; min-height:52px; padding:8px 14px;
    background:#fffaf0; border:3px solid var(--рамка); border-radius:14px;
    font-size:24px; cursor:pointer; text-align:center; letter-spacing:.5px;
  }
  #lvis .${ДОМ} .слово .дыра{
    display:inline-block; min-width:56px; border-bottom:4px solid var(--тихо);
    color:var(--тихо);
  }
  #lvis .${ДОМ} .слово.выбран{border-color:#c8922c; background:#fff3d6}
  #lvis .${ДОМ} .слово.готово{background:var(--верно-фон); border-color:var(--верно); cursor:default}
  #lvis .${ДОМ} .слово.готово .дыра{border-bottom-color:var(--верно); color:var(--верно); font-weight:bold}
  #lvis .${ДОМ} .слово:focus-visible{outline:3px solid #ffd15c; outline-offset:2px}
  #lvis .${ДОМ} .слоги{display:flex; flex-wrap:wrap; gap:8px; justify-content:center}
  #lvis .${ДОМ} .слог{
    appearance:none; min-width:60px; min-height:48px; padding:8px 12px;
    background:#e8d9b8; border:3px solid var(--рамка); border-radius:12px;
    font-size:22px; font-weight:bold; cursor:pointer;
  }
  #lvis .${ДОМ} .слог:active{transform:translateY(2px)}
  #lvis .${ДОМ} .слог.мимо{background:var(--мимо-фон); border-color:var(--мимо); color:var(--мимо)}
  #lvis .${ДОМ} .слог:focus-visible{outline:3px solid #ffd15c; outline-offset:2px}

  /* ── памятка ── */
  #lvis .${ДОМ} .памятка{display:flex; flex-direction:column; gap:10px; width:100%; max-width:300px}
  #lvis .${ДОМ} .памятка div{
    background:#fffaf0; border:3px solid var(--рамка); border-radius:14px;
    padding:12px 14px; font-size:21px; font-weight:bold; text-align:center;
  }
  /* Строка должна умещаться в одну: «ЖИ, ШИ — с буквой И», перенесённое так,
     что И уезжает на вторую строку, читается как отдельное слово. */
  #lvis .${ДОМ} .памятка div b{color:var(--верно); font-size:24px}
  #lvis .${ДОМ} .скороговорка{
    background:var(--верно-фон); border:3px solid var(--верно); border-radius:14px;
    padding:12px 16px; font-size:19px; line-height:1.45; text-align:center;
    max-width:320px; color:var(--чернила);
  }

  /* ── общее: счёт, подсказка, итог ── */
  #lvis .${ДОМ} .счёт{
    margin:0; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;
    font-size:17px; font-weight:bold;
  }
  #lvis .${ДОМ} .счёт b{font-size:22px}
  #lvis .${ДОМ} .что-делать{
    margin:0; font-size:17px; text-align:center; color:var(--тихо); font-weight:bold;
  }
  #lvis .${ДОМ} .готово{
    margin:0; display:flex; gap:10px; align-items:flex-start;
    background:var(--верно-фон); border:3px solid var(--верно); border-radius:14px;
    padding:12px 14px; font-size:18px; line-height:1.4; font-weight:bold; color:var(--чернила);
  }
  #lvis .${ДОМ} .готово span{color:var(--верно); font-size:22px; line-height:1.1}

  @media (max-width:360px){
    #lvis .${ДОМ} .реплика p{font-size:18px}
    #lvis .${ДОМ} .плитка{width:60px; height:60px; font-size:30px}
    #lvis .${ДОМ} .табличка{min-width:98px; font-size:28px}
    #lvis .${ДОМ} .предметы{max-width:100%; gap:8px}
    #lvis .${ДОМ} .предмет b{font-size:14px}
    #lvis .${ДОМ} .карточка{font-size:20px; padding:10px 12px}
    #lvis .${ДОМ} .слово{font-size:21px}
  }
  @media (prefers-reduced-motion: reduce){
    #lvis .${ДОМ} .плитка, #lvis .${ДОМ} .табличка,
    #lvis .${ДОМ} .предмет{transition:none}
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
    if (!CHS[к].ш) CHS[к].ш = {};
    return CHS[к].ш;
  }
  function шаг(){ return Math.max(0, Math.min(КАДРЫ.length - 1, (typeof LV !== 'undefined' && LV.step) || 0)); }
  function сост(i){ const п = пам(); if (!п[i]) п[i] = {}; return п[i]; }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };

  /* ═══════════════════ РИСУНКИ ═══════════════════ */

  /* ── Пых: картинка владельца, под ней вектор на случай офлайна ── */
  const пых = (настроение) => {
    const рот = настроение === 'рад'
      ? '<path d="M34 50 q11 7 22 0" stroke="#2b2118" stroke-width="2.8" fill="none" stroke-linecap="round"/>'
      : '<path d="M36 51 q9 3 18 0" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    return `<span class="пых">
      <img src="img/pykh.png" alt="" onerror="this.style.display='none'">
      <span class="пых-запас"><svg viewBox="0 0 90 80" aria-label="Ёжик Пых">
        <ellipse cx="45" cy="74" rx="26" ry="4" fill="rgba(0,0,0,.16)"/>
        <path d="M45 8 L74 40 C74 58 60 70 45 70 C30 70 16 58 16 40 Z"
              fill="#a97a52" stroke="#2b2118" stroke-width="2.6"/>
        <path d="M45 12 L45 66 M30 18 L52 62 M60 18 L38 62 M22 30 L66 30"
              stroke="#8a5f3c" stroke-width="1.8" opacity=".55"/>
        <circle cx="45" cy="44" r="20" fill="#f0c9a4" stroke="#2b2118" stroke-width="2.4"/>
        <circle cx="37" cy="40" r="3" fill="#2b2118"/><circle cx="53" cy="40" r="3" fill="#2b2118"/>
        <ellipse cx="45" cy="47" rx="5" ry="4" fill="#3a2c20"/>
        ${рот}
      </svg></span></span>`;
  };

  /* ── предметы поляны ──────────────────────────────────────────────────
     Шесть рисунков в общей рамке 80×72. Три нужных (жи/ши) и три ловушки:
     в ловушках та же буква Ж или Ш, но другая пара — «жук», «шар», «жаба».
     Ловушка из слова без шипящих ничему не учит: ребёнок отбрасывает его,
     не глядя на буквосочетание. ── */
  const РИС = {
    лыжи: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <g stroke="#3a2515" stroke-width="3" stroke-linejoin="round">
        <path d="M22,64 L30,16 q2,-8 8,-8 q-4,6 -3,12 L34,64 Z" fill="#c8452f"/>
        <path d="M44,64 L52,16 q2,-8 8,-8 q-4,6 -3,12 L56,64 Z" fill="#e0703f"/>
      </g>
      <path d="M14,26 L26,40 M66,26 L54,40" stroke="#5a6b80" stroke-width="4" stroke-linecap="round"/>
      <circle cx="13" cy="24" r="4" fill="#5a6b80"/><circle cx="67" cy="24" r="4" fill="#5a6b80"/>
      <path d="M24,44 h12 M46,44 h12" stroke="#3a2515" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    шишка: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <path d="M40,6 q6,4 6,10 l-1,3" stroke="#4f7a33" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <g fill="#a2703f" stroke="#4a3018" stroke-width="2.4" stroke-linejoin="round">
        <path d="M40,14 q13,3 13,15 q0,20 -13,37 q-13,-17 -13,-37 q0,-12 13,-15 Z"/>
      </g>
      <g fill="#c08a4f" stroke="#4a3018" stroke-width="2">
        <ellipse cx="40" cy="26" rx="8" ry="5"/>
        <ellipse cx="31" cy="36" rx="7" ry="5"/><ellipse cx="49" cy="36" rx="7" ry="5"/>
        <ellipse cx="40" cy="40" rx="8" ry="5"/>
        <ellipse cx="33" cy="50" rx="6" ry="4.6"/><ellipse cx="47" cy="50" rx="6" ry="4.6"/>
        <ellipse cx="40" cy="55" rx="6" ry="4.4"/>
      </g>
    </svg>`,
    мыши: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <g stroke="#3a2515" stroke-width="2.6" stroke-linejoin="round">
        <path d="M60,58 q12,-2 12,-12" stroke="#8d8d93" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="20" cy="30" r="7" fill="#b9b9bf"/>
        <path d="M14,58 q-4,-18 12,-20 q16,-2 20,12 q2,8 -6,8 Z" fill="#a8a8af"/>
        <circle cx="52" cy="34" r="7" fill="#b9b9bf"/>
        <path d="M34,60 q0,-16 16,-16 q16,0 16,14 q0,4 -6,4 Z" fill="#c2c2c8"/>
      </g>
      <circle cx="24" cy="40" r="2.2" fill="#2a2118"/>
      <circle cx="56" cy="46" r="2.2" fill="#2a2118"/>
      <circle cx="18" cy="44" r="2.6" fill="#e0879a"/>
      <circle cx="50" cy="50" r="2.6" fill="#e0879a"/>
    </svg>`,
    жук: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <g stroke="#2a2118" stroke-width="2.6" stroke-linecap="round">
        <path d="M22,28 L8,18 M22,40 L6,40 M24,52 L10,62"/>
        <path d="M58,28 L72,18 M58,40 L74,40 M56,52 L70,62"/>
      </g>
      <!-- Красное тело в чёрную крапинку ребёнок называет божьей коровкой, а не
           жуком, и подпись начинает спорить с картинкой. Поэтому обычный жук:
           бронзовые надкрылья, без пятен. -->
      <ellipse cx="40" cy="44" rx="20" ry="24" fill="#8a6234" stroke="#2a2118" stroke-width="3"/>
      <path d="M40,22 v44" stroke="#2a2118" stroke-width="3"/>
      <path d="M26,34 q6,10 4,26 M54,34 q-6,10 -4,26" stroke="#6b4a24"
            stroke-width="2.4" fill="none" opacity=".8"/>
      <ellipse cx="31" cy="34" rx="5" ry="8" fill="#a67c47" opacity=".6" transform="rotate(-14 31 34)"/>
      <circle cx="40" cy="18" r="10" fill="#3a2f28" stroke="#2a2118" stroke-width="2.6"/>
      <path d="M35,10 L30,3 M45,10 L50,3" stroke="#2a2118" stroke-width="2.6" stroke-linecap="round"/>
    </svg>`,
    шар: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <path d="M40,50 q6,12 -4,22" stroke="#6b5b45" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="40" cy="28" rx="22" ry="25" fill="#e05a7a" stroke="#2a2118" stroke-width="3"/>
      <path d="M36,48 l4,6 l4,-6 Z" fill="#e05a7a" stroke="#2a2118" stroke-width="2.6" stroke-linejoin="round"/>
      <ellipse cx="31" cy="18" rx="6" ry="8" fill="#fff" opacity=".45" transform="rotate(-20 31 18)"/>
    </svg>`,
    жаба: `<svg viewBox="0 0 80 72" aria-hidden="true">
      <g stroke="#2a2118" stroke-width="2.8" stroke-linejoin="round">
        <ellipse cx="18" cy="56" rx="11" ry="7" fill="#4f8f3a"/>
        <ellipse cx="62" cy="56" rx="11" ry="7" fill="#4f8f3a"/>
        <ellipse cx="40" cy="44" rx="25" ry="20" fill="#5ea343"/>
        <circle cx="27" cy="24" r="10" fill="#6fb84f"/>
        <circle cx="53" cy="24" r="10" fill="#6fb84f"/>
      </g>
      <circle cx="27" cy="24" r="4.6" fill="#2a2118"/><circle cx="53" cy="24" r="4.6" fill="#2a2118"/>
      <circle cx="28.6" cy="22" r="1.6" fill="#fff"/><circle cx="54.6" cy="22" r="1.6" fill="#fff"/>
      <path d="M28,48 q12,9 24,0" stroke="#2a2118" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      <circle cx="26" cy="54" r="2.4" fill="#3f7a2c"/><circle cx="52" cy="56" r="2.4" fill="#3f7a2c"/>
    </svg>`
  };

  /* Подпись предмета с подсветкой буквосочетания: «лы[жи]», «[ши]шка».
     Показываем метку только после того, как ребёнок нажал, — иначе подсказка
     стоит на экране заранее и искать нечего. */
  const подпись = (слово, мет, видно) => {
    if (!видно || !мет) return слово;
    const i = слово.indexOf(мет);
    if (i < 0) return слово;
    return слово.slice(0, i) + '<span class="мет">' + мет + '</span>' + слово.slice(i + мет.length);
  };

  const готово = (текст) => `<p class="готово"><span aria-hidden="true">✓</span>${текст}</p>`;

  /* ─────────────────── кадры ─────────────────── */
  const КАДРЫ = [

  /* 0 · МАСТЕРСКАЯ: проверка звука на твёрдость ─────────────────────────
     Главный кадр урока. Правило здесь ещё не названо: ребёнок сначала
     трогает буквы и видит, что две не поддаются, а две проминаются. */
  {
    t:'Твёрдые и мягкие',
    say:'Потрогай эти четыре буквы. Две твёрдые как камень, две мягкие как мох.',
    рисуй(i, st){
      const пр = st.проверено || [];
      const БУКВЫ = [
        {б:'Ж', вид:'камень', как:'Ж — всегда твёрдый'},
        {б:'Ш', вид:'камень', как:'Ш — всегда твёрдый'},
        {б:'Ч', вид:'мох',    как:'Ч — всегда мягкий'},
        {б:'Щ', вид:'мох',    как:'Щ — всегда мягкий'}
      ];
      return `<div class="сцена мастерская"><div class="буквы">` +
        БУКВЫ.map((к,j)=>
          `<button type="button" class="плитка ${к.вид}${пр.indexOf(j)>=0?' проверена':''}"
             onclick="ЖЧ.буква(${i},${j})" aria-label="Буква ${к.б}">${к.б}</button>`).join('') +
        `</div><p class="ярлык">` +
        БУКВЫ.map((к,j)=> пр.indexOf(j)>=0 ? `<span>${к.как}</span>` : '').join('') +
        `</p><p class="счёт"><span>потрогал <b>${пр.length}</b> из <b>4</b></span></p></div>`
        + (пр.length===4 ? готово('Ж и Ш твёрдые всегда. Ч и Щ мягкие всегда. Ни одного исключения — и на этом держится всё правило.') : '');
    },
    готов: st => (st.проверено||[]).length === 4,
    делать:'Нажми на каждую букву'
  },

  /* 1 · ДВЕ ТАБЛИЧКИ: почему после Ж и Ш пишем И ─────────────────────── */
  {
    t:'Почему ЖИ, а не ЖЫ',
    say:'Буква Ы нужна, чтобы согласный звучал твёрдо. А Ж и так твёрдый.',
    рисуй(i, st){
      const в = st.выбор;
      const ВАР = ['ЖЫ','ЖИ'];
      return `<div class="сцена"><div class="таблички">` +
        ВАР.map((т,j)=>{
          let кл='';
          if (в!=null) кл = (j===1) ? ' верно' : (j===в ? ' мимо' : '');
          return `<button type="button" class="табличка${кл}" ${в!=null?'disabled':''}
            onclick="ЖЧ.выбор(${i},${j},1)">${т}</button>`;
        }).join('') +
        `</div></div>`
        + (в===1 ? готово('Ы ему не нужна — твёрже уже некуда. Поэтому договорились писать И: ЖИ и ШИ.') : '')
        + (в===0 ? готово('Почти. Ы делает согласный твёрдым, а Ж твёрдый и без неё — значит Ы тут лишняя. Нажми ЖИ.') : '');
    },
    готов: st => st.выбор === 1,
    делать:'Выбери, как пишется'
  },

  /* 2 · ПОЛЯНА: найти предметы с ЖИ и ШИ ─────────────────────────────── */
  {
    t:'Найди ЖИ и ШИ',
    say:'На поляне шесть находок. В трёх спрятались ЖИ или ШИ — нажми на них.',
    рисуй(i, st){
      const наш = st.нашёл || [], пром = st.промах || [];
      const П = [
        {к:'лыжи',  слово:'лыжи',  мет:'жи'},
        {к:'шишка', слово:'шишка', мет:'ши'},
        {к:'жук',   слово:'жук',   мет:null},
        {к:'мыши',  слово:'мыши',  мет:'ши'},
        {к:'шар',   слово:'шар',   мет:null},
        {к:'жаба',  слово:'жаба',  мет:null}
      ];
      return `<div class="сцена поляна"><div class="предметы">` +
        П.map((п,j)=>{
          const есть = наш.indexOf(j)>=0, мимо = пром.indexOf(j)>=0;
          return `<button type="button" class="предмет${есть?' нашёл':''}${мимо?' мимо':''}"
            onclick="ЖЧ.предмет(${i},${j},${п.мет?1:0})" aria-label="${п.слово}">
            ${РИС[п.к]}<b>${подпись(п.слово, п.мет, есть)}</b></button>`;
        }).join('') +
        `</div><p class="счёт"><span>нашёл <b>${наш.length}</b> из <b>3</b></span></p></div>`
        + (наш.length===3 ? готово('Лыжи, шишка, мыши. А жук, шар и жаба — обманки: буква та же, а пара другая. Смотреть надо на две буквы сразу.') : '');
    },
    готов: st => (st.нашёл||[]).length === 3,
    делать:'Нажми на три находки'
  },

  /* 3 · ЧЕТЫРЕ БУКВЫ: что не пишется после Ч и Щ ─────────────────────── */
  {
    t:'Почему ЧА, а не ЧЯ',
    say:'Я и Ю смягчают согласный. А Ч и Щ мягкие сами. Убери лишние буквы.',
    рисуй(i, st){
      const уб = st.убрал || [];
      /* Лишние — Я и Ю: смягчать мягкое незачем. Остаются А и У. */
      const БУКВЫ = [
        {б:'А', лишняя:false}, {б:'Я', лишняя:true},
        {б:'У', лишняя:false}, {б:'Ю', лишняя:true}
      ];
      return `<div class="сцена вечер"><div class="буквы">` +
        БУКВЫ.map((к,j)=>{
          if (уб.indexOf(j)>=0) return '';
          return `<button type="button" class="плитка гласная"
            onclick="ЖЧ.убрать(${i},${j},${к.лишняя?1:0})" aria-label="Буква ${к.б}">${к.б}</button>`;
        }).join('') +
        `</div><p class="счёт"><span>убрал <b>${уб.length}</b> из <b>2</b></span></p>` +
        (st.мимо ? `<p class="ярлык"><span>Эта буква нужна: ЧА и ЧУ пишутся именно так</span></p>` : '') +
        `</div>`
        + (уб.length===2 ? готово('Остались А и У. Значит: ЧА и ЩА пишем с А, ЧУ и ЩУ пишем с У.') : '');
    },
    готов: st => (st.убрал||[]).length === 2,
    делать:'Убери те, что после Ч и Щ не пишутся'
  },

  /* 4 · КАРТОЧКИ: поймать слова с ошибкой ────────────────────────────── */
  {
    t:'Поймай ошибку',
    say:'Шесть слов, в трёх ошибка. Нажми на неправильные.',
    рисуй(i, st){
      const пой = st.поймал || [], чист = st.чисто || [];
      const СЛОВА = [
        {с:'чаща',   ош:false}, {с:'чясы',  ош:true},
        {с:'щука',   ош:false}, {с:'щявель',ош:true},
        {с:'чудо',   ош:false}, {с:'чюлан', ош:true}
      ];
      return `<div class="сцена"><div class="карточки">` +
        СЛОВА.map((к,j)=>{
          const п = пой.indexOf(j)>=0, ч = чист.indexOf(j)>=0;
          return `<button type="button" class="карточка${п?' поймал':''}${ч?' чисто':''}"
            onclick="ЖЧ.ошибка(${i},${j},${к.ош?1:0})">${к.с}</button>`;
        }).join('') +
        `</div><p class="счёт"><span>поймал <b>${пой.length}</b> из <b>3</b></span></p></div>`
        + (пой.length===3 ? готово('Верно: чясы, щявель, чюлан. Надо было писать часы, щавель, чулан — после Ч и Щ буквы Я и Ю не ставим.') : '');
    },
    готов: st => (st.поймал||[]).length === 3,
    делать:'Нажми на три слова с ошибкой'
  },

  /* 5 · ПРОПУСКИ: вставить буквосочетание ────────────────────────────── */
  {
    t:'Вставь пару',
    say:'Четыре слова потеряли по две буквы. Нажми на пропуск, потом на пару.',
    рисуй(i, st){
      const пост = st.пост || {};
      const СЛОВА = [
        {до:'ма', после:'на', надо:'ши'},   /* машина */
        {до:'',   после:'сы', надо:'ча'},   /* часы   */
        {до:'',   после:'до', надо:'чу'},   /* чудо   */
        {до:'ро', после:'',   надо:'ща'}    /* роща   */
      ];
      const ПАРЫ = ['жи','ши','ча','ща','чу','щу'];
      const готовы = Object.keys(пост).length;
      return `<div class="сцена"><div class="слова">` +
        СЛОВА.map((к,j)=>{
          const есть = пост[j];
          /* Пустой пропуск — это подчёркивание, а не два знака подчёркивания
             поверх него: «__» и линия накладывались друг на друга. */
          const дыра = есть ? `<span class="дыра">${есть}</span>` : `<span class="дыра">&nbsp;</span>`;
          const кл = есть ? ' готово' : (st.выбираю===j ? ' выбран' : '');
          return `<button type="button" class="слово${кл}" ${есть?'disabled':''}
            onclick="ЖЧ.дыра(${i},${j})">${к.до}${дыра}${к.после}</button>`;
        }).join('') +
        `</div>` +
        (готовы<4 ? `<div class="слоги">` + ПАРЫ.map(п=>
          `<button type="button" class="слог${st.мимо===п?' мимо':''}"
             onclick="ЖЧ.пара(${i},'${п}')">${п}</button>`).join('') + `</div>` : '') +
        `<p class="счёт"><span>собрано <b>${готовы}</b> из <b>4</b></span></p></div>`
        + (готовы===4 ? готово('Машина, часы, чудо, роща. Каждый раз пара выбиралась не на слух, а по правилу.') : '');
    },
    готов: st => Object.keys(st.пост||{}).length === 4,
    делать:'Сначала пропуск, потом пара'
  },

  /* 6 · МОЛНИЯ: четыре быстрых выбора ────────────────────────────────── */
  {
    t:'Молния',
    say:'Быстро! Где написано правильно?',
    рисуй(i, st){
      const ВОПР = [
        ['жыраф','жираф',1], ['чашка','чяшка',0],
        ['щюка','щука',1],   ['шишка','шышка',0]
      ];
      const ряд = st.ряд || 0, прой = st.пройдено || [];
      if (ряд >= ВОПР.length){
        return `<div class="сцена вечер"><p class="счёт"><span>пройдено <b>4</b> из <b>4</b></span></p></div>`
          + готово('Жираф, чашка, щука, шишка. Четыре подряд без запинки — правило уже в руке.');
      }
      const [а, б, верный] = ВОПР[ряд];
      return `<div class="сцена вечер"><div class="таблички">` +
        [а,б].map((т,j)=>{
          const кл = (st.выбран===j && j!==верный) ? ' мимо' : '';
          return `<button type="button" class="табличка${кл}" onclick="ЖЧ.молния(${i},${j},${верный})">${т}</button>`;
        }).join('') +
        `</div><p class="счёт"><span>пройдено <b>${прой.length}</b> из <b>4</b></span></p></div>`;
    },
    готов: st => (st.пройдено||[]).length === 4,
    делать:'Четыре вопроса подряд'
  },

  /* 7 · ТРИ ЗАПИСИ: одно слово, одно верное написание ──────────────────
     Слово выбрано так, чтобы обе ловушки проверяли ИМЕННО то, чему учил
     урок: «чащу» = ЧА и ЩУ. Первый заход брал «чайник», и вторая ловушка
     («чайнык») висела на правиле, которого в уроке не было, — проверять
     ребёнка на неизученном нечестно. */
  {
    t:'Теперь сам',
    say:'Пых ушёл в густую… Одно слово, три записи. Верная только одна.',
    рисуй(i, st){
      const ВАР = ['чящу','чащю','чащу'];
      const в = st.ответ;
      return `<div class="сцена"><div class="карточки">` +
        ВАР.map((т,j)=>{
          let кл='';
          if (в!=null) кл = (j===2) ? ' чисто' : (j===в ? ' поймал' : '');
          return `<button type="button" class="карточка${кл}" ${в!=null?'disabled':''}
            onclick="ЖЧ.ответ(${i},${j})">${т}</button>`;
        }).join('') + `</div></div>`
        + (в===2 ? готово('Чащу. Два правила в одном слове: ЧА — с буквой А, ЩУ — с буквой У. Ни Я, ни Ю тут не нужны: Ч и Щ мягкие сами.') : '')
        + (в!=null && в!==2 ? готово('Не она. Ч и Щ мягкие всегда, смягчать их нечем — значит ни Я, ни Ю. Верно: чащу.') : '');
    },
    готов: st => st.ответ === 2,
    делать:'Выбери верную запись'
  },

  /* 8 · ПАМЯТКА ──────────────────────────────────────────────────────── */
  {
    t:'Что запомнить',
    say:'Три строчки. Прочитай вслух — так они и остаются в голове.',
    рисуй(){
      return `<div class="сцена"><div class="памятка">
          <div>ЖИ, ШИ — с буквой <b>И</b></div>
          <div>ЧА, ЩА — с буквой <b>А</b></div>
          <div>ЧУ, ЩУ — с буквой <b>У</b></div>
        </div>
        <p class="скороговорка">Жи-ши — мыши и стрижи.<br>
        Ча-ща — чаща и свеча.<br>
        Чу-щу — чудо и ищу.</p>
      </div>`;
    },
    готов: () => true,
    делать:'Прочитай вслух — и запомнится само'
  }
  ];

  /* ─────────────────── обработчики касаний ─────────────────── */
  window.ЖЧ = {
    буква(i, j){
      const st = сост(i); st.проверено = st.проверено || [];
      if (st.проверено.indexOf(j) < 0) st.проверено.push(j);
      перерисовать();
    },
    выбор(i, j){ const st = сост(i); st.выбор = j; перерисовать(); },
    предмет(i, j, нужный){
      const st = сост(i);
      st.нашёл = st.нашёл || []; st.промах = st.промах || [];
      if (нужный){
        if (st.нашёл.indexOf(j) < 0) st.нашёл.push(j);
      } else {
        /* Промах показываем, а не глотаем: ребёнок должен увидеть, что
           «жук» — это Ж без И, и что обманка сработала именно на этом. */
        if (st.промах.indexOf(j) < 0) st.промах.push(j);
      }
      перерисовать();
    },
    убрать(i, j, лишняя){
      const st = сост(i);
      if (лишняя){
        st.убрал = st.убрал || [];
        if (st.убрал.indexOf(j) < 0) st.убрал.push(j);
        st.мимо = false;
      } else st.мимо = true;
      перерисовать();
    },
    ошибка(i, j, есть){
      const st = сост(i);
      st.поймал = st.поймал || []; st.чисто = st.чисто || [];
      if (есть){ if (st.поймал.indexOf(j) < 0) st.поймал.push(j); }
      else { if (st.чисто.indexOf(j) < 0) st.чисто.push(j); }
      перерисовать();
    },
    дыра(i, j){ const st = сост(i); st.выбираю = j; st.мимо = null; перерисовать(); },
    пара(i, п){
      const st = сост(i);
      if (st.выбираю == null) return;
      const НАДО = ['ши','ча','чу','ща'];
      if (п === НАДО[st.выбираю]){
        st.пост = st.пост || {}; st.пост[st.выбираю] = п;
        st.выбираю = null; st.мимо = null;
      } else st.мимо = п;
      перерисовать();
    },
    молния(i, j, верный){
      const st = сост(i);
      if (j === верный){
        st.пройдено = st.пройдено || []; st.пройдено.push(st.ряд || 0);
        st.ряд = (st.ряд || 0) + 1; st.выбран = null;
      } else st.выбран = j;
      перерисовать();
    },
    ответ(i, j){ const st = сост(i); st.ответ = j; перерисовать(); }
  };

  /* ─────────────────── отрисовка кадра ─────────────────── */
  function рисовать(el){
    стиль();
    const i = шаг(), к = КАДРЫ[i], st = сост(i);
    const настроение = к.готов(st) ? 'рад' : 'думает';
    el.innerHTML = `<div class="${ДОМ}">
      <div class="реплика">${пых(настроение)}<p>${к.say}</p></div>
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
      id: ID, title: 'Шипящие: жи-ши, ча-ща, чу-щу', ico: '🐍',
      src: 'Начальная школа · 1–2 класс · Русский язык · Орфограмма',
      subj: 'rus',
      explain: КАДРЫ.map((к, i) => (i + 1) + '. ' + к.t),
      check: {
        q: 'Почему после Ж и Ш не пишут Ы?',
        choices: [
          'Потому что Ы — редкая буква',
          'Потому что Ж и Ш всегда твёрдые, и делать их твёрдыми уже не нужно',
          'Потому что Ы не бывает в начале слова',
          'Потому что после Ы трудно читать'
        ],
        ans: 1,
        exp: 'Буква Ы нужна, чтобы согласный перед ней звучал твёрдо. Звуки [ж] и [ш] твёрдые всегда, в подсказке они не нуждаются — поэтому пишем И: жираф, шишка, мыши.'
      },
      /* Вид задач — только 'unit' (числовой ввод) и 'choice' (варианты):
         другого движок не умеет, а на 'kind' без choices падает
         в renderLessonView при входе в задачи. Здесь обе задачи про буквы,
         поэтому 'choice'. */
      tasks: [
        {q:'В слове «ч..сы» какая пара букв на месте пропуска?', kind:'choice',
         choices:['ча','чя','ща','чю'], ans:0, tol:0,
         hints:['Звук [ч] всегда мягкий.','Буква Я нужна, чтобы смягчить согласный. А [ч] уже мягкий.','Значит смягчать нечего: пишем ЧА.'], sol:'ча'},
        {q:'В слове «ш..шка» какая пара букв пропущена?', kind:'choice',
         choices:['ши','шы','щы','шя'], ans:0, tol:0,
         hints:['Звук [ш] всегда твёрдый.','Буква Ы делает согласный твёрдым, но [ш] твёрдый и так.','Пишем ШИ: шишка.'], sol:'ши'},
        {q:'Сколько слов с ошибкой: чаща, чясы, щука, чюлан?', kind:'unit', ans:2, tol:0,
         hints:['Проверь каждое: что стоит после Ч и Щ.','После Ч и Щ не пишут Я и Ю.','Ошибки в «чясы» и «чюлан» — их две.'], sol:'2'}
      ]
    });
  }
})();
