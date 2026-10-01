/* ============ ХИМИЯ · УРОК 53 · «ВОДА — РАСТВОРИТЕЛЬ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–52 (манера NOBOOK), «ещё качественнее». Карточка 53 из банка
   подменяется этой записью (VISKW[53]). Рисунки — MVP/data/ris_lab.js (window.РЛ).

   ОПЫТЫ.
   1) Что растворяется в воде: поваренная соль, сахар, медный купорос (синий раствор), мел
      (муть, затем осадок), речной песок (сразу оседает), подсолнечное масло (не смешивается,
      всплывает слоем). Предскажи — проверь — таблица.
   2) Насыщенный раствор и кристаллизация калийной селитры KNO₃: 100 г воды, термометр
      20 °C, селитру порциями по 10 г — при 20 °C растворяется лишь ~32 г, остальное на дне
      (насыщенный раствор); нагрев на электроплитке до 60 °C — растворяется до 110 г;
      досыпаем до 100 г; остужаем до 20 °C — выпадают игольчатые кристаллы: 100 − 32 = 68 г.
   3) Кривые растворимости KNO₃ и NaCl по табличным данным (у селитры круто растёт,
      у соли почти не меняется).
   4) Газы: холодная и тёплая газировка — при нагревании газы растворяются хуже
      (летом рыбам не хватает кислорода в тёплой воде).

   ТЕОРИЯ (8 класс): вода — универсальный растворитель; растворимость — масса вещества,
   которая может раствориться в 100 г воды при данной температуре; насыщенный раствор —
   больше вещества при этой температуре не растворяется; растворимость большинства
   твёрдых веществ с нагреванием растёт, газов — падает; m(р-ра) = m(в-ва) + m(воды).
   Данные растворимости (г на 100 г воды): KNO₃ 0 °C — 13, 20 — 32, 40 — 64, 60 — 110,
   80 — 169, 100 — 246; NaCl 0 °C — 35,7, 20 — 36,0, 40 — 36,6, 60 — 37,3, 80 — 38,4, 100 — 39,8. */
(function(){
  'use strict';

  const ID = 53;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'растворимость', имя:'Опыт 1: шесть веществ',      итог:'6 из 6'},
    {ключ:'насыщенный',    имя:'Опыт 2: насыщенный раствор', итог:'кристаллы выпали'},
    {ключ:'марафон',       имя:'Проверка: марафон',          итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Выяснить, какие вещества растворяются в воде, что такое <b>насыщенный раствор</b> и как растворимость зависит от <b>температуры</b>.'],
    ['Принцип','Вода растворяет больше веществ, чем любая другая жидкость. <b>Растворимость</b> — сколько граммов вещества может раствориться в <b>100 г воды</b> при данной температуре. Когда больше не растворяется — раствор <b>насыщенный</b>. Твёрдые вещества при нагревании обычно растворяются лучше, газы — хуже.'],
    ['Оборудование','<b>Приборы:</b> химические стаканы, стеклянная палочка, электроплитка, термометр, мерный цилиндр, шпатель, весы.<br><b>Вещества:</b> поваренная соль NaCl, сахар, медный купорос CuSO₄, мел CaCO₃, песок, подсолнечное масло, калийная селитра KNO₃, газированная вода.'],
    ['Ход работы','1. Проверить растворимость шести веществ.<br>2. Приготовить насыщенный раствор селитры, нагреть и охладить его.<br>3. Прочитать кривые растворимости.<br>4. Сравнить газировку холодную и тёплую.'],
    ['Безопасность','Электроплитка и стакан на ней <b>горячие</b> — бери стакан прихваткой или щипцами. Медный купорос ядовит — не пробовать, мыть руки. Мешать только стеклянной палочкой, не термометром — он хрупкий.']
  ];
  const ВЕЩ = [
    {к:'соль',    имя:'соль NaCl',      ок:0, итог:'хорошо растворяется',    вид:'прозрачный раствор'},
    {к:'сахар',   имя:'сахар',          ок:0, итог:'хорошо растворяется',    вид:'прозрачный раствор'},
    {к:'купорос', имя:'медный купорос', ок:0, итог:'растворяется',           вид:'синий прозрачный раствор'},
    {к:'мел',     имя:'мел CaCO₃',      ок:1, итог:'практически нерастворим', вид:'белая муть, потом осадок'},
    {к:'песок',   имя:'песок',          ок:1, итог:'нерастворим',            вид:'сразу оседает на дно'},
    {к:'масло',   имя:'масло',          ок:1, итог:'не смешивается',         вид:'всплывает жёлтым слоем'}
  ];
  /* опыт 2 */
  const ШАГИ2 = [
    {т:'Налей в стакан 100 г (100 мл) воды.',                       что:'стакан'},
    {т:'Опусти в стакан термометр.',                                 что:'термометр'},
    {т:'Добавляй селитру KNO₃ порциями по 10 г и размешивай.',       что:'сыпать'},
    {т:'Какой раствор получился?',                                   что:'вопрос'},
    {т:'Поставь стакан на электроплитку и нагрей до 60 °C.',         что:'плитка'},
    {т:'Досыпь селитру до 100 г.',                                   что:'досыпать'},
    {т:'Выключи плитку и дай раствору остыть до 20 °C.',             что:'остудить'},
    {т:'Сколько селитры выпало в осадок?',                           что:'сколько'}
  ];
  const ЛОТОК2 = [['стакан','Стакан'],['термометр','Термометр'],['селитра','KNO₃'],['плитка','Плитка'],['спиртовка','Спиртовка'],['колба','Колба'],['цилиндр','Цилиндр'],['весы','Весы']];
  const РАСТ = {KNO3:[[0,13],[20,32],[40,64],[60,110],[80,169],[100,246]], NaCl:[[0,35.7],[20,36],[40,36.6],[60,37.3],[80,38.4],[100,39.8]]};
  const растворимость = (в,t) => { const т=РАСТ[в]; for(let i=1;i<т.length;i++) if(t<=т[i][0]){ const [t0,s0]=т[i-1],[t1,s1]=т[i]; return s0+(s1-s0)*(t-t0)/(t1-t0); } return т[т.length-1][1]; };
  const МАРАФОН = [
    {q:'Что такое растворимость?', вар:['масса вещества в 100 г воды при данной t','объём раствора','скорость растворения'], в:0, р:'Растворимость — сколько граммов вещества растворится в 100 г воды при данной температуре.'},
    {q:'В растворе на дне остались нерастворившиеся кристаллы. Раствор…', вар:['ненасыщенный','насыщенный','разбавленный'], в:1, р:'Больше не растворяется — раствор насыщенный.'},
    {q:'Как растворимость KNO₃ зависит от температуры?', вар:['растёт','падает','не меняется'], в:0, р:'При 20 °C — 32 г, при 60 °C — 110 г.'},
    {q:'Как растворимость газов зависит от температуры?', вар:['растёт','падает','не меняется'], в:1, р:'Тёплая газировка выдыхается быстрее.'},
    {q:'В 300 г воды растворили 100 г сахара. Масса раствора?', вар:['200 г','300 г','400 г'], в:2, р:'300 + 100 = 400 г.'},
    {q:'Растворимость NaCl при 20 °C — 36 г. Сколько соли растворится в 50 г воды?', вар:['18 г','36 г','72 г'], в:0, р:'Вдвое меньше воды — вдвое меньше соли: 18 г.'},
    {q:'Насыщенный при 60 °C раствор KNO₃ охладили до 20 °C. Что произойдёт?', вар:['ничего','выпадут кристаллы','раствор закипит'], в:1, р:'Растворимость упала — лишнее выпадает кристаллами.'},
    {q:'Какое вещество НЕ растворяется в воде?', вар:['сахар','мел','поваренная соль'], в:1, р:'Мел почти нерастворим — даёт муть и осадок.'},
    {q:'Почему летом в прудах бывает замор рыбы?', вар:['в тёплой воде меньше кислорода','рыбам жарко','вода испаряется'], в:0, р:'Газы в тёплой воде растворяются хуже.'},
    {q:'В 100 г воды при 20 °C насыпали 40 г KNO₃ (растворимость 32 г). Сколько осталось на дне?', вар:['0 г','8 г','32 г'], в:1, р:'40 − 32 = 8 г не растворились.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = [['поваренная соль',0],['речной песок',1],['сахар',0],['мел',1],['медный купорос',0],['подсолнечное масло',1],['спирт',0],['кусочек стекла',1],['лимонная кислота',0],['железные опилки',1],['уксусная кислота',0],['парафин',1],
    ['питьевая сода',0],['уголь',1],['марганцовка (KMnO₄)',0],['сера',1]]
    .map(([ф,в])=>({q:'«'+ф+'» в воде — растворяется?', ф:ф, вар:['растворяется','не растворяется'], в:в, раз:в?'Частицы остаются видны: оседают, всплывают или не смешиваются.':'Вещество распадается на мельчайшие частицы — получается прозрачный раствор.'}));
  const ч = (v) => String(Math.round(v)).replace('.',',');
  const П2 = поМесту([[20,'KNO3'],[60,'KNO3'],[40,'KNO3'],[80,'KNO3'],[0,'KNO3'],[100,'KNO3'],[20,'NaCl'],[80,'NaCl'],[60,'KNO3'],[40,'KNO3'],[20,'KNO3'],[100,'NaCl'],[0,'NaCl'],[80,'KNO3'],[100,'KNO3'],[0,'KNO3']]
    .map(([t,в],i)=>{ const ok=растворимость(в,t), н=в==='KNO3'?растворимость('NaCl',t):растворимость('KNO3',t);
      return {q:'Сколько '+(в==='KNO3'?'KNO₃':'NaCl')+' растворится в 100 г воды при '+t+' °C?', t:t, вещ:в, ок:ч(ok)+' г', нет:ч(Math.abs(н-ok)<2?ok*2:н)+' г', раз:'По кривой растворимости '+(в==='KNO3'?'KNO₃':'NaCl')+' при '+t+' °C — около '+ч(ok)+' г на 100 г воды.'}; }));
  const П3 = поМесту([['В 300 г воды растворили 100 г сахара. Масса раствора?','400 г','200 г'],['В 150 г воды — 50 г соли. Масса раствора?','200 г','100 г'],
    ['100 г воды, 40 г KNO₃ при 20 °C (растворимость 32 г). Сколько на дне?','8 г','40 г'],['Растворимость NaCl 36 г. Сколько растворится в 200 г воды?','72 г','36 г'],
    ['В 80 г воды растворили 20 г соли. Масса раствора?','100 г','60 г'],['100 г воды и 20 г KNO₃ при 20 °C. Раствор…','ненасыщенный','насыщенный'],
    ['100 г воды и 50 г KNO₃ при 20 °C. Раствор…','насыщенный','ненасыщенный'],['Растворимость сахара 204 г. Сколько растворится в 50 г воды?','102 г','204 г'],
    ['Насыщенный при 80 °C раствор 169 г KNO₃ охладили до 20 °C (32 г). Сколько выпадет?','137 г','32 г'],['Масса раствора 250 г, соли 50 г. Сколько воды?','200 г','300 г'],
    ['Растворимость NaCl 36 г. Сколько растворится в 25 г воды?','9 г','36 г'],['В 1 кг воды растворили 0,5 кг сахара. Масса раствора?','1,5 кг','0,5 кг'],
    ['100 г воды при 60 °C, растворимость KNO₃ 110 г. Насыпали 100 г. Раствор…','ненасыщенный','насыщенный'],['В 200 г воды растворили 30 г соды. Масса раствора?','230 г','170 г'],
    ['Растворимость KNO₃ при 40 °C 64 г. Сколько растворится в 50 г воды?','32 г','64 г'],['Масса раствора 120 г, воды 100 г. Сколько вещества?','20 г','220 г']]
    .map(([q,ок,нет])=>({q:q, ок:ок, нет:нет, раз:'Ответ: '+ок+'. Масса раствора = вещество + вода; растворимость дана на 100 г воды.'})));

  const CSS=`
  #lvis .s6.l53n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l53n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l53n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l53n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l53n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l53n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l53n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l53n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l53n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l53n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l53n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l53n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l53n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l53n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l53n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l53n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l53n table.итоги td{white-space:normal!important}
  #lvis .s6.l53n table.итоги td:first-child{width:46%}
  #lvis .s6.l53n table.итоги{table-layout:fixed}
  #lvis .s6.l53n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l53n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l53n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l53n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l53n .ask button{text-align:left}
  #lvis .s6.l53n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l53n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l53n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l53n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l53n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l53n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l53n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l53n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l53n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l53n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l53n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l53n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l53n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l53n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l53n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l53n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l53n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l53n .плитка span{text-align:center}
  #lvis .s6.l53n .плитка:active{transform:scale(.96)}
  #lvis .s6.l53n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l53n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l53n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l53n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l53n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l53n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l53n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l53n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l53n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l53n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l53n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l53n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l53n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l53n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l53n{gap:14px}
  #lvis .s6.l53n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l53n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l53n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l53n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l53n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l53n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l53n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l53n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l53n .карт .текст b{color:${GOLD}}
  #lvis .s6.l53n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l53n .правило b{color:${GOLD}}
  #lvis .s6.l53n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l53n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l53n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l53n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l53n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l53n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l53n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l53n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l53n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l53n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l53n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l53n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l53n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l53n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l53n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l53n .буйки button.мимо{border-color:${RED};animation:l53nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l53nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l53n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l53n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l53n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l53n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l53n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l53n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l53n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l53n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l53n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l53n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l53n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l53n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l53n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l53n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l53n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l53n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l53n .уровни .точка.сейчас{background:${GOLD};animation:l53ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l53ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l53n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l53n{-webkit-text-size-adjust:100%}
  #lvis .s6.l53n [data-anim]{animation:l53nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l53nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l53n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l53n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l53n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l53n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l53n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l53n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l53n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l53n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l53n [data-anim]{animation:none!important}
    #lvis .s6.l53n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l53n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l53n-style');
      if(!s){ s=document.createElement('style'); s.id='l53n-style'; document.head.appendChild(s); }
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
  const BTN = (i,cls,html,on) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" onclick="${on}">${html}</button>`;
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Задание</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,f) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r53Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Практическая работа</span><b class="${всё?'готово':''}">${
        всё?'опыты выполнены':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}<span>${есть?д.итог:'—'}</span></li>`;
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
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.45;0.45;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const сдвигРаз = (из,в,длит,задержка) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" from="${из}" to="${в}" dur="${длит}" begin="${(задержка||0).toFixed(2)}s"
       fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  /* слово с выделенным окончанием */
  const тОк = (x,y,осн,ок,кегль,цвет,цветОк,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль}" font-weight="bold" fill="${цвет}" font-family="Georgia,'Times New Roman',serif">${esc(осн)}<tspan fill="${цветОк}">${esc(ок)}</tspan></text>`;
  const Р = () => window.РМ;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c53-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c53-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.64+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c53-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c53-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c53-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c53-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');


  const L_ = () => window.РЛ;
  const чис = (v) => String(v).replace('.',',');
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return Л.студия(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
  const свгЛ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; };
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ФОРМ = (html,метка0) => A(5,'карт','<span class="метка">'+(метка0||'Формула')+'</span><div class="текст" style="font-size:21px;text-align:center;font-family:\'Helvetica Neue\',Arial,sans-serif">'+html+'</div>');
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки,колонок) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  /* стакан с веществом по виду: как оно ведёт себя в воде */
  const стаканВещ = (x,y,ш,в,вид,размешано) => { const Л=L_();
    if(!вид) return Л.стакан(x,y,ш,в,{уровень:.55,объём:250});
    if(вид==='соль'||вид==='сахар') return Л.стакан(x,y,ш,в,{уровень:.55,объём:250,крупинки:размешано&&!Л.ДВИЖ?0:14,вид:вид==='сахар'?'сахар':'соль',таять:размешано,палочка:размешано,мешать:размешано,цвет:Л.цвет(вид,.06)});
    if(вид==='купорос') return Л.стакан(x,y,ш,в,{уровень:.55,объём:250,крупинки:размешано&&!Л.ДВИЖ?0:12,вид:'купорос',таять:размешано,палочка:размешано,мешать:размешано,цвет:размешано?Л.цвет('купорос',.08):Л.цвет('вода')});
    if(вид==='мел') return Л.стакан(x,y,ш,в,{уровень:.55,объём:250,муть:размешано?70:0,мутьЦвет:['#f4f2ec','#e8e4da','#ffffff'],осадок:3,осадокВид:'мел',палочка:размешано,мешать:размешано,цвет:размешано?'hsla(40,20%,92%,.55)':Л.цвет('вода')});
    if(вид==='песок') return Л.стакан(x,y,ш,в,{уровень:.55,объём:250,осадок:5,палочка:размешано,мешать:размешано});
    return Л.стакан(x,y,ш,в,{уровень:.55,объём:250,слой:размешано?8:5,палочка:размешано,мешать:размешано});
  };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=230, y0=176, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = стаканВещ(48,y0+14,52,62,'купорос',true) + стаканВещ(110,y0+14,52,62,'масло',false) + стаканВещ(172,y0+14,52,62,'мел',true) +
      Л.плитка(262,y0+14,96,{вкл:true,ручка:.7}) + Л.стакан(262,y0+14-96*0.18-4,58,64,{уровень:.5,объём:250,крупинки:10,вид:'селитра'});
    const поверх = Л.термометр(268,y0-20,96,60) + метка(168,14,'Вода — растворитель',ЗЛ,{кегль:12}) +
      Л.имяПрибора(110,y0+30,'растворимость')+Л.имяПрибора(262,y0+30,'насыщенный раствор');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Вода — растворитель') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r53вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['на 100 г воды при данной температуре','на 1 литр раствора'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Растворимость указывают в граммах вещества…') :
          РАЗБОР(ок,['Верно: растворимость — масса вещества, которая растворяется в 100 г воды при определённой температуре.','Растворимость всегда дают <b>на 100 г воды</b> и обязательно указывают температуру.'][в]))) +
      (ок ? ПРАВИЛО('<b>Растворимость</b> — сколько граммов вещества растворяется в <b>100 г воды</b> при данной температуре.') : '');
  }

  /* 2. Опыт 1: что растворяется */
  function F2(s){
    const Н=240, y0=186, Л=L_(), к=s.в2, сдел=s.сдел2||{}, отз=s.отз2, все=ВЕЩ.every(x=>сдел[x.к]);
    const В=к==null?null:ВЕЩ[к], размешано=В&&сдел[В.к];
    const пр = стаканВещ(150,y0+14,90,104,В?В.к:null,размешано) + (В?Л.значок?'':'':'') + Л.палочка(250,y0+24,320,y0+16);
    const поверх = метка(150,16,В?(размешано?В.имя+': '+В.вид:В.имя+' в воде — размешай и посмотри'):'выбери вещество',размешано?(В.ок?КР:ЗЕ):ЗЛ,{кегль:11}) +
      (размешано&&В.к==='соль'?Л.лупа(282,86,40,'раствор',{подпись:'ионы Na⁺ и Cl⁻ среди воды'}):'') + (размешано&&В.к==='сахар'?Л.лупа(282,86,40,'сироп',{подпись:'молекулы сахара среди воды'}):'') + (размешано&&В.к==='купорос'?Л.лупа(282,86,40,'раствор',{подпись:'ионы Cu²⁺ и SO₄²⁻ среди воды'}).split('Na⁺').join('Cu²⁺').split('Cl⁻').join('SO₄²⁻').split('#b87aff').join('#5aa8ff').split('#4a1a8a').join('#1a4a9a').split('#6ad84a').join('#e8d84a').split('#1a6a10').join('#8a7a10'):'') +
      (размешано&&В.к==='масло'?метка(270,96,'масло легче воды',СН,{кегль:10}):'') + (размешано&&В.к==='мел'?метка(270,96,'муть оседает',СН,{кегль:10}):'');
    const отм={}; ВЕЩ.forEach(x=>{ отм[x.к]=сдел[x.к]?'done':''; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Что растворяется в воде') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ЛОТОК_(ВЕЩ.map(x=>[x.к,{соль:'соль',сахар:'сахар',купорос:'купорос',мел:'мел',песок:'песок',масло:'масло'}[x.к]]),'r53в',отм,3) +
      (В&&!размешано ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">'+В.имя[0].toUpperCase()+В.имя.slice(1)+' размешали в воде. Растворится?</div>')+`<div class="ask пара">${['растворится','не растворится'].map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r53пред("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !В ? СКАЗ('Опыт','Выбери вещество, предскажи и проверь.') : '') +
      A(8,'карт','<span class="метка">Таблица наблюдений · '+ВЕЩ.filter(x=>сдел[x.к]).length+' из 6</span><table class="итоги узкая"><tr><th>Вещество</th><th>что видно</th><th>вывод</th></tr>'+
        ВЕЩ.map(x=>сдел[x.к]?`<tr><td>${x.имя}</td><td>${x.вид}</td><td>${x.итог}</td></tr>`:`<tr class="пусто"><td>${x.имя}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('растворимость','По растворимости вещества делят на <b>растворимые</b> (соль, сахар, купорос), <b>малорастворимые</b> (гипс) и <b>практически нерастворимые</b> (мел, песок). Масло с водой не смешивается — оно легче и всплывает. Абсолютно нерастворимых веществ нет: даже стекло чуть-чуть растворяется.') +
        ПРАВИЛО('Раствор прозрачен и однороден. Муть, осадок или слой — признаки того, что вещество не растворилось.') : '');
  }

  /* 3. Опыт 2: насыщенный раствор и кристаллизация */
  function F3(s){
    const Н=262, y0=200, Л=L_(), ш=Math.min(s.о2||0,ШАГИ2.length), отз=s.о2отз, готово=ш>=ШАГИ2.length;
    const м=s.о2м||0, t=s.о2t||20, на=ш>=5, раств=Math.min(м,растворимость('KNO3',t)), осадок=Math.max(0,м-раств), остыл=ш>=7;
    const плитка=ш>=5?Л.плитка(150,y0+14,120,{вкл:t>20&&!остыл,ручка:t>20&&!остыл?.8:0}):'';
    const yСт = ш>=5?y0+14-120*0.18-4:y0+14;
    const стакан = ш>=1?Л.стакан(150,yСт,74,86,{уровень:.55,объём:250,крупинки:осадок>0?Math.min(30,8+Math.round(осадок/3)):0,вид:'селитра',палочка:ш===2,мешать:ш===2,цвет:'hsla(200,40%,85%,.35)'}):'';
    const пр = плитка + стакан + Л.банка(300,y0+12,34,50,{содержимое:'селитра',надпись:['KNO₃','селитра']});
    const поверх = (ш>=2?Л.термометр(160,yСт-6,96,t):'') + (ш===0?метка(168,Н/2-50,'начни со стакана',null,{кегль:11}):'') +
      (ш>=2?метка(64,16,'t = '+Math.round(t)+' °C',t>20?КР:СН,{кегль:12}):'') + (ш>=3?метка(240,16,'KNO₃: '+м+' г',ЗЛ,{кегль:12}):'') +
      (осадок>0?метка(240,46,'на дне: '+Math.round(осадок)+' г',КР,{кегль:10}):'') + (готово?метка(80,46,'кристаллы KNO₃',ЗЕ,{кегль:11}):'');
    const ДЕЙ=ШАГИ2[Math.min(ш,ШАГИ2.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='сыпать') кнопки=`<div class="ask">${BTN(5,'','+10 г селитры и размешать',"r53о2('+10')")}</div>`;
      if(ДЕЙ==='вопрос') кнопки=`<div class="ask пара">${['насыщенный','ненасыщенный'].map((t0,j)=>BTN(5+j,'',t0,"r53о2('в"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='плитка'&&s.о2плитка) кнопки=`<div class="ask">${BTN(5,'','Включить и нагреть до 60 °C',"r53о2('нагреть')")}</div>`;
      if(ДЕЙ==='досыпать') кнопки=`<div class="ask">${BTN(5,'','+20 г селитры',"r53о2('+20')")}</div>`;
      if(ДЕЙ==='остудить') кнопки=`<div class="ask">${BTN(5,'','Выключить плитку и остудить до 20 °C',"r53о2('остудить')")}</div>`;
      if(ДЕЙ==='сколько') кнопки=`<div class="ask три">${['32 г','68 г','100 г'].map((t0,j)=>BTN(5+j,'',t0,"r53о2('с"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК2.forEach(([что])=>{ const i=ШАГИ2.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2 · шаг '+Math.min(ш+1,ШАГИ2.length)+' из '+ШАГИ2.length,'Насыщенный раствор селитры') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ2[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК2,'r53о2',отм)) +
      A(8,'карт','<span class="метка">Журнал опыта</span><table class="итоги"><tr><th>t, °C</th><th>KNO₃ всего</th><th>растворилось</th><th>на дне</th></tr><tr><td>'+Math.round(t)+'</td><td>'+м+' г</td><td>'+Math.round(раств)+' г</td><td>'+Math.round(осадок)+' г</td></tr></table>') +
      СПИСОК('Ход опыта',ШАГИ2.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('кристаллизация','При 20 °C в 100 г воды растворяется только ~32 г KNO₃ — раствор стал <b>насыщенным</b>. При 60 °C растворимость выросла до 110 г — растворились все 100 г. При охлаждении растворимость снова упала до 32 г, и <b>68 г</b> выпали красивыми игольчатыми кристаллами. Так очищают вещества — <b>перекристаллизацией</b>.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r53о2сброс()")}</div>` : '');
  }

  /* 4. Кривые растворимости */
  function F4(s){
    const Н=250, y0=240, Л=L_(), t=s.t4==null?20:s.t4, вид=s.видt4||{20:true}, все=Object.keys(вид).length>=3, в=s.ответ4, ок=в===0;
    const X=(tt)=>44+tt*2.7, Y=(г)=>214-г*0.75;
    const сетка = Array.from({length:6},(_,k)=>`<path d="M${X(k*20)} 22 V214" stroke="#3a4048" stroke-width=".6"/><text x="${X(k*20)}" y="226" text-anchor="middle" font-size="8" fill="#9aa3ad" font-family="Arial">${k*20}</text>`).join('') +
      Array.from({length:6},(_,k)=>`<path d="M44 ${Y(k*50)} H314" stroke="#3a4048" stroke-width=".6"/><text x="40" y="${Y(k*50)+3}" text-anchor="end" font-size="8" fill="#9aa3ad" font-family="Arial">${k*50}</text>`).join('') +
      `<text x="179" y="238" text-anchor="middle" font-size="9" fill="#c8ced6" font-family="Arial">температура, °C</text><text x="12" y="118" text-anchor="middle" font-size="9" fill="#c8ced6" font-family="Arial" transform="rotate(-90 12 118)">г на 100 г воды</text>`;
    const кривая=(в0,ц)=>`<path d="${РАСТ[в0].map(([tt,г],i)=>(i?'L':'M')+X(tt)+' '+Y(г)).join(' ')}" stroke="${ц}" stroke-width="2.6" fill="none" stroke-linejoin="round"/>`+РАСТ[в0].map(([tt,г])=>`<circle cx="${X(tt)}" cy="${Y(г)}" r="2.4" fill="${ц}"/>`).join('');
    const к=растворимость('KNO3',t), н=растворимость('NaCl',t);
    const поверх = `<rect x="34" y="16" width="290" height="206" rx="6" fill="rgba(12,14,18,.6)" stroke="#4a525c"/>` + сетка + кривая('KNO3','#ff9a6a') + кривая('NaCl','#7fd1ff') +
      `<path d="M${X(t)} 22 V214" stroke="#ffd76a" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="${X(t)}" cy="${Y(к)}" r="4.4" fill="#ffd76a"/><circle cx="${X(t)}" cy="${Y(н)}" r="4.4" fill="#ffd76a"/>` +
      `<text x="${X(80)-8}" y="${Y(169)-6}" text-anchor="end" font-size="10" font-weight="bold" fill="#ff9a6a" font-family="Arial">KNO₃</text><text x="${X(100)-6}" y="${Y(39.8)-6}" text-anchor="end" font-size="10" font-weight="bold" fill="#7fd1ff" font-family="Arial">NaCl</text>` +
      метка(196,22,t+' °C: KNO₃ '+Math.round(к)+' г · NaCl '+чис(Math.round(н*10)/10)+' г',ЗЛ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Кривые растворимости','Как растворимость зависит от t') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(5,minmax(0,1fr))">${[0,20,40,60,80].map(tt=>BTN(3,t===tt?'вкл':'',tt+' °C','r53t('+tt+')')).join('')}</div>` +
      ТЕОРИЯ('кривая растворимости','По кривой находят растворимость при любой температуре. У <b>KNO₃</b> она резко растёт: 13 г при 0 °C и 169 г при 80 °C. У <b>NaCl</b> почти не меняется: 36–38 г. Поэтому селитру очищают перекристаллизацией, а соль получают выпариванием.') +
      (!все ? СКАЗ('Читай график','Выбери хотя бы три температуры.') :
        ОТВЕТЫ('пара',['около 110 г','около 37 г'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Сколько KNO₃ растворится в 100 г воды при 60 °C?') :
          РАЗБОР(ок,['Верно: при 60 °C кривая KNO₃ проходит через 110 г.','37 г — это поваренная соль (голубая кривая). Селитра — оранжевая: ~110 г.'][в]))) +
      (ок ? ПРАВИЛО('Растворимость большинства <b>твёрдых</b> веществ с нагреванием <b>растёт</b>.') : '');
  }

  /* 5. Газы в воде */
  function F5(s){
    const Н=230, y0=196, Л=L_(), откр=!!s.откр5, в=s.ответ5, ок=в===0;
    const пр = Л.газировка(100,y0+14,1.4,{пузыри:откр?0.3:0}) + Л.газировка(236,y0+14,1.4,{пузыри:откр?1:0,тёплая:true});
    const поверх = метка(100,16,откр?'холодная: пузырьков мало':'холодная, +5 °C',СН,{кегль:11}) + метка(236,46,откр?'тёплая: бурно выдыхается':'тёплая, +30 °C',КР,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Газы в воде','Холодная и тёплая газировка') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ask">${BTN(3,откр?'hit':'',откр?'Бутылки открыты':'Открыть обе бутылки',откр?'':"r53откр()")}</div>` +
      (откр ? ТЕОРИЯ('газы','В газировке растворён <b>углекислый газ CO₂</b>. С нагреванием растворимость газов <b>падает</b>: из тёплой воды газ уходит бурно. Обратная зависимость, чем у большинства твёрдых веществ.') +
        ДИВО('Летом в мелких прудах бывает <b>замор рыбы</b>: тёплая вода удерживает меньше кислорода. А в холодных реках Севера кислорода много — там живут лососи и форель.') +
        ОТВЕТЫ('пара',['уменьшается','увеличивается'],0,в,5) +
        (в==null ? СКАЗ('Вопрос','Как растворимость газов меняется при нагревании?') :
          РАЗБОР(ок,['Верно: тёплая вода удерживает меньше газа.','Наоборот: из тёплой газировки газ уходит быстрее — растворимость <b>уменьшается</b>.'][в])) : СКАЗ('Опыт','Открой бутылки и сравни.')) +
      (ок ? ПРАВИЛО('Растворимость <b>газов</b> с нагреванием <b>уменьшается</b>.') : '');
  }

  /* 6. Расчёты */
  function F6(s){
    const Н=210, y0=176, Л=L_(), в=s.ответ6, ок=в===0, в2=s.ответ6б, ок2=в2===0;
    const пр = Л.стакан(80,y0+14,64,74,{уровень:.55,объём:250,цвет:Л.цвет('сахар',.1)}) + Л.весы(220,y0+14,120,{показ:'400.0'});
    const поверх = метка(80,16,'300 г воды + 100 г сахара',ЗЛ,{кегль:11}) + метка(220,46,'раствор: 400 г',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Расчёты','Масса раствора и растворимость') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ФОРМ('m(раствора) = m(вещества) + m(воды)<br><span style="font-size:16px;color:#9aa3ad">300 г + 100 г = 400 г</span>') +
      ОТВЕТЫ('пара',['200 г','100 г'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','В 150 г воды растворили 50 г соли. Масса раствора?') :
        РАЗБОР(ок,['Верно: 150 + 50 = 200 г.','Масса раствора — это вода и соль вместе: 150 + 50 = <b>200 г</b>.'][в])) +
      (ок ? ОТВЕТЫ('пара',['18 г','36 г'],0,в2,'6б') + (в2==null ? СКАЗ('Вопрос','Растворимость NaCl при 20 °C — 36 г на 100 г воды. Сколько соли растворится в 50 г воды?') :
        РАЗБОР(ок2,['Верно: воды вдвое меньше — и соли вдвое меньше: 18 г.','36 г — на 100 г воды. В 50 г — вдвое меньше: <b>18 г</b>.'][в2])) : '') +
      (ок&&ок2 ? ПРАВИЛО('Растворимость дана <b>на 100 г воды</b> — для другой массы воды считаем пропорцией.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=210, y0=176, Л=L_();
    const пр = стаканВещ(50,y0+14,48,58,'купорос',true) + стаканВещ(108,y0+14,48,58,'масло',true) + Л.плитка(220,y0+14,90,{вкл:false}) + Л.стакан(220,y0+14-90*0.18-4,50,56,{уровень:.5,объём:250,крупинки:24,вид:'селитра'}) + Л.газировка(300,y0+14,0.9,{пузыри:.4});
    const поверх = метка(168,12,'вода растворяет многое, но не всё',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Вода — самый распространённый <b>растворитель</b>.<br>• <b>Растворимость</b> — сколько граммов вещества растворится в 100 г воды при данной t.<br>• <b>Насыщенный</b> раствор — больше не растворяется; лишнее остаётся на дне.<br>• Твёрдые вещества при нагревании обычно растворяются лучше, газы — хуже.<br>• m(раствора) = m(вещества) + m(воды).</div>') +
      ПРАВИЛО('<b>Нагрели — растворилось больше; остудили — выпали кристаллы.</b>');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.стакан(228+i*40,y0+14,30,36,{уровень:.55,объём:100,цвет:i<3-ош?Л.цвет('купорос',.08):'hsla(0,0%,60%,.2)'})).join('') + Л.стакан(84,y0+14,64,74,{уровень:.55,объём:250,крупинки:16,вид:'селитра'});
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(120,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(268,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! О растворах и растворимости ты знаешь главное.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r53заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r53мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Растворимость — на 100 г воды при данной температуре.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'В 300 г воды растворили 100 г сахара. Масса раствора?', варианты:[{т:'400 г',ок:true},{т:'200 г',ок:false}], разбор:'300 + 100 = 400 г.' },
    { вопрос:'Что хорошо растворяется в воде?', варианты:[{т:'песок',ок:false},{т:'сахар',ок:true}], разбор:'Сахар даёт прозрачный раствор.' },
    { вопрос:'На дне остались кристаллы. Раствор…', варианты:[{т:'насыщенный',ок:true},{т:'ненасыщенный',ок:false}], разбор:'Больше не растворяется.' },
    { вопрос:'Горячая вода растворяет сахара…', варианты:[{т:'меньше',ок:false},{т:'больше',ок:true}], разбор:'Растворимость твёрдых веществ растёт с t.' },
    { вопрос:'Газы при нагревании растворяются…', варианты:[{т:'хуже',ок:true},{т:'лучше',ок:false}], разбор:'Тёплая газировка выдыхается.' }
  ];
  function F9(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r53Reset()")}</div>` +
        ПРАВИЛО('m(р-ра) = m(в-ва) + m(воды)');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r53Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const доска = (Н,текст,цв) => `<rect x="16" y="30" width="304" height="${Н-96}" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/><text x="168" y="${30+(Н-96)/2+7}" text-anchor="middle" font-size="18" font-weight="bold" fill="${цв||'#f2f5f8'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(текст)}</text>`;
  const Т = {
    т1:{ имя:'Растворяется ли', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=148, отв=ст.ответ!=null;
        const вид = отв ? (з.в?'песок':'соль') : null;
        return свгЛ(сцена(Н,y0,стаканВещ(80,y0+14,60,68,вид,отв)+Л.палочка(240,y0+24,310,y0+16),метка(200,30,з.ф,ЗЛ,{кегль:12})+(ст.серия>=3?метка(270,70,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Кривая растворимости', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=172, отв=ст.ответ!=null;
        const X=(tt)=>40+tt*2.8, Y=(г)=>160-г*0.55;
        const кр=(в0,ц)=>`<path d="${РАСТ[в0].map(([tt,г],i)=>(i?'L':'M')+X(tt)+' '+Y(г)).join(' ')}" stroke="${ц}" stroke-width="2.2" fill="none"/>`;
        const г=растворимость(з.вещ,з.t);
        return свгЛ(сцена(Н,y0,'',`<rect x="30" y="14" width="296" height="152" rx="6" fill="rgba(12,14,18,.6)" stroke="#4a525c"/>`+[0,20,40,60,80,100].map(tt=>`<text x="${X(tt)}" y="174" text-anchor="middle" font-size="8" fill="#9aa3ad" font-family="Arial">${tt}</text>`).join('')+кр('KNO3','#ff9a6a')+кр('NaCl','#7fd1ff')+
          `<path d="M${X(з.t)} 18 V160" stroke="#ffd76a" stroke-dasharray="4 3"/>`+(отв?`<circle cx="${X(з.t)}" cy="${Y(г)}" r="4" fill="#ffd76a"/>`:'')+(ст.серия>=3?метка(270,20,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Растворы: расчёт', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=170, y0=146, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.стакан(56,y0+14,48,56,{уровень:.5,объём:250,крупинки:отв?0:10,вид:'селитра'})+Л.весы(280,y0+14,90,{показ:отв?'OK':'0.0'}),доска(Н,отв?'Ответ: '+з.ок:'Посчитай',отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие задания.':'В новом круге задания другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r53Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r53T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r53TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L53 = {
    id: ID, title: 'Вода — растворитель', ico: '💧',
    src: 'Химия · 5–6 класс · Растворы', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: что растворяется в воде.',
      'Опыт 2: насыщенный раствор и кристаллизация селитры.',
      'Кривые растворимости.',
      'Газы в воде: холодная и тёплая газировка.',
      'Расчёты: масса раствора и растворимость.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: растворяется ли.',
      'Тренажёр 2: кривая растворимости.',
      'Тренажёр 3: расчёты.'
    ],
    check: { q: 'В 300 г воды растворили 100 г сахара. Масса раствора? (в г)', choices: ['200','300','400','100'], ans: 2, exp: '300 + 100 = 400 г.' },
    tasks: [
      { q: 'В 150 г воды растворили 50 г соли. Масса раствора? (в г)', kind: 'unit', ans: 200, tol: 0, hints: ['Сложи воду и соль.', '150 + 50 = 200.'], sol: '150 + 50 = 200 г.' },
      { q: 'Что из этого хорошо растворяется в воде?', kind: 'choice', choices: ['Песок','Сахар','Масло','Железо'], ans: 1, tol: 0, hints: ['Песок оседает, масло всплывает.', 'Сахар исчезает в воде.'], sol: 'Сахар растворяется в воде.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.плитка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L53.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Опыт 2',4:'Кривые растворимости',5:'Газы в воде',6:'Расчёты',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l53n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Вода — растворитель'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r53Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r53вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r53в=(вид)=>{ const s=S(); s.в2=ВЕЩ.findIndex(x=>x.к===вид); s.отз2=null; chRender(0); };
  window.r53пред=(j)=>{ const s=S(); const В=ВЕЩ[s.в2]; if(!В) return;
    if(j===В.ок){ const с=Object.assign({},s.сдел2||{}); с[В.к]=true; s.сдел2=с; s.отз2={ок:true,т:В.имя+': '+В.вид+' — '+В.итог+'.'}; if(ВЕЩ.every(x=>с[x.к])) s.дело_растворимость=true; }
    else s.отз2={ок:false,j:j,т:В.ок?'Посмотри внимательнее: частицы '+В.имя+' не исчезают — '+В.вид+'.':'Размешай подольше: '+В.имя+' исчезает, раствор прозрачный — вещество растворилось.'};
    chRender(0); };
  const ИМЯ = {стакан:'стакан',термометр:'термометр',селитра:'селитру',плитка:'плитку',спиртовка:'спиртовку',колба:'колбу',цилиндр:'цилиндр',весы:'весы'};
  window.r53о2=(что)=>{ const s=S(); const ш=s.о2||0; if(ш>=ШАГИ2.length) return; const нужно=ШАГИ2[ш].что;
    const вперёд=(т)=>{ s.о2=ш+1; s.о2отз={ок:true,т:т}; if(s.о2>=ШАГИ2.length) s.дело_насыщенный=true; chRender(0); };
    if(что===нужно&&['стакан','термометр'].includes(нужно)) return вперёд({стакан:'В стакане 100 мл воды — это 100 г.',термометр:'Термометр в стакане: 20 °C. Мешать будем палочкой, а не термометром.'}[нужно]);
    if(нужно==='сыпать'&&что==='+10'){ s.о2м=(s.о2м||0)+10; const м=s.о2м;
      if(м<40){ s.о2отз={ок:true,т:'Добавлено '+м+' г — всё растворилось.'}; chRender(0); return; }
      return вперёд('Добавлено 40 г, но 8 г лежат на дне и не растворяются, сколько ни мешай.'); }
    if(нужно==='сыпать'&&что==='селитра'){ s.о2отз={ок:false,т:'Селитра уже рядом — добавляй её кнопкой «+10 г».'}; chRender(0); return; }
    if(нужно==='вопрос'&&/^в\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: при 20 °C больше не растворяется — раствор насыщенный (в 100 г воды ~32 г KNO₃).');
      s.о2отз={ок:false,т:'На дне лежат кристаллы, которые не растворяются, — значит, раствор уже насыщенный.'}; chRender(0); return; }
    if(нужно==='плитка'&&что==='плитка'){ s.о2плитка=true; s.о2отз={ок:true,т:'Стакан на плитке. Теперь включи её.'}; chRender(0); return; }
    if(нужно==='плитка'&&что==='спиртовка'){ s.о2отз={ок:false,т:'Можно и спиртовкой с треножником, но удобнее и безопаснее электроплиткой с регулятором.'}; chRender(0); return; }
    if(нужно==='плитка'&&что==='нагреть'){ s.о2t=60; return вперёд('60 °C: кристаллы на дне растворились! Растворимость KNO₃ при 60 °C — 110 г.'); }
    if(нужно==='досыпать'&&что==='+20'){ s.о2м=(s.о2м||0)+20; if(s.о2м<100){ s.о2отз={ок:true,т:'Всего '+s.о2м+' г — при 60 °C всё растворяется.'}; chRender(0); return; }
      return вперёд('100 г селитры растворились в 100 г горячей воды!'); }
    if(нужно==='остудить'&&что==='остудить'){ s.о2t=20; return вперёд('Раствор остыл до 20 °C — из него выросли длинные игольчатые кристаллы KNO₃.'); }
    if(нужно==='сколько'&&/^с\d$/.test(что)){ const j=+что[1]; if(j===1) return вперёд('Верно: при 20 °C растворимо только 32 г, значит, 100 − 32 = 68 г выпали в осадок.');
      s.о2отз={ок:false,т:j===0?'32 г — это сколько осталось в растворе. Выпало: 100 − 32.':'Выпало не всё: 32 г при 20 °C остаются растворёнными. 100 − 32 = ?'}; chRender(0); return; }
    s.о2отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ2[ш].т}; chRender(0); };
  window.r53о2сброс=()=>{ const s=S(); s.о2=0; s.о2м=0; s.о2t=20; s.о2плитка=false; s.о2отз=null; chRender(0); };
  window.r53t=(t)=>{ const s=S(); s.t4=t; const в=Object.assign({20:true},s.видt4||{}); в[t]=true; s.видt4=в; chRender(0); };
  window.r53откр=()=>{ const s=S(); s.откр5=true; chRender(0); };
  window.r53мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r53заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r53Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r53Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r53T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r53TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r53Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L53,{__планПорядок:arr[м].__планПорядок}); else arr.push(L53); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU53={render:render, L:L53};
})();
