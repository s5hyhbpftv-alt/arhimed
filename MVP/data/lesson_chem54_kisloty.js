/* ============ ХИМИЯ · УРОК 54 · «МЕТАЛЛЫ И КИСЛОТЫ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–53 (манера NOBOOK), «ещё лучше». Карточка 54 из банка подменяется
   этой записью (VISKW[54]). Рисунки — MVP/data/ris_lab.js (window.РЛ): штатив с пробирками,
   пипетка, склянки индикаторов, гранулы цинка, магниевая лента, железные опилки, медная
   пластинка, пузырьки разной силы, спиртовка, «хлопок» водорода, модели HCl, ZnCl₂, H₂.

   ОПЫТЫ.
   1) Индикаторы: лакмус, метиловый оранжевый, фенолфталеин в кислоте (HCl), воде и щёлочи
      (NaOH) — таблица 3 × 3 с цветами.
   2) Кухонные кислоты и основания с лакмусом: лимонный сок, уксус, газировка — кислые;
      раствор соды и мыла — щелочные; вода — нейтральная (пробовать на вкус нельзя!).
   3) Металлы в соляной кислоте: магний бурно (пробирка горячая), цинк заметно, железо
      медленно, медь не реагирует — ряд активности Бекетова, медь стоит после водорода.
   4) Распознавание водорода: собрать в пробирку вверх дном (он легче воздуха), поднести к
      пламени: глухой хлопок — чистый водород, лающий — смесь с воздухом.

   ТЕОРИЯ (8 класс): кислоты — сложные вещества из атомов водорода и кислотного остатка;
   индикаторы меняют цвет: лакмус — красный в кислоте, синий в щёлочи, фиолетовый в воде;
   метилоранж — розовый / жёлтый / оранжевый; фенолфталеин бесцветен в кислоте и воде,
   малиновый в щёлочи. Металлы, стоящие в ряду активности до водорода, вытесняют его из
   кислот: Zn + 2HCl → ZnCl₂ + H₂↑ (реакция замещения). Правило разбавления: «сначала
   вода, потом кислота». При попадании кислоты на кожу — промыть большим количеством воды. */
(function(){
  'use strict';

  const ID = 54;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'индикаторы', имя:'Опыт 1: три индикатора',   итог:'9 пробирок'},
    {ключ:'активность', имя:'Опыт 2: металлы в кислоте', итог:'4 из 4'},
    {ключ:'марафон',    имя:'Проверка: марафон',         итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться распознавать кислоты индикаторами и выяснить, какие металлы реагируют с кислотами и что при этом выделяется.'],
    ['Принцип','<b>Индикаторы</b> — вещества, которые меняют цвет в кислоте и щёлочи. Металлы, стоящие в <b>ряду активности</b> до водорода, вытесняют его из кислот: <b>Zn + 2HCl → ZnCl₂ + H₂↑</b>. Чем левее металл в ряду, тем бурнее реакция. Медь стоит после водорода и с соляной кислотой не реагирует.'],
    ['Оборудование','<b>Приборы:</b> штатив для пробирок, пробирки, пипетки, спиртовка, держатель.<br><b>Реактивы:</b> разбавленная соляная кислота HCl, раствор NaOH, вода; индикаторы — лакмус, метиловый оранжевый, фенолфталеин; магний, цинк, железо, медь; лимонный сок, уксус, газировка, сода, мыло.'],
    ['Ход работы','1. Испытать три индикатора в кислоте, воде и щёлочи.<br>2. Проверить лакмусом кухонные вещества.<br>3. Опустить четыре металла в соляную кислоту.<br>4. Распознать водород.<br>5. Записать уравнения.'],
    ['Безопасность','Кислоты и щёлочи <b>едкие</b>: халат, очки, перчатки. Реактивы <b>не пробуют на вкус</b>, даже кухонные. При разбавлении — <b>сначала вода, потом кислота</b>. Попало на кожу — сразу смыть большим количеством воды. Водород горюч: рядом с пробиркой, где идёт реакция, огонь не держать.']
  ];
  const СРЕДЫ = ['HCl','H₂O','NaOH'];
  const ИНД = [
    {к:'лакмус',       имя:'лакмус',          цв:['hsla(350,80%,52%,.88)','hsla(282,45%,45%,.88)','hsla(225,70%,50%,.88)'], сл:['красный','фиолетовый','синий'], вопр:'В какой пробирке лакмус покраснел?', вар:['в кислоте HCl','в воде','в щёлочи NaOH'], в:0},
    {к:'метилоранж',   имя:'метилоранж',      цв:['hsla(345,85%,62%,.88)','hsla(28,92%,55%,.88)','hsla(50,95%,55%,.88)'], сл:['розовый','оранжевый','жёлтый'],  вопр:'Метилоранж в щёлочи…', вар:['розовый','оранжевый','жёлтый'], в:2},
    {к:'фенолфталеин', имя:'фенолфталеин',    цв:['hsla(200,20%,90%,.35)','hsla(200,20%,90%,.35)','hsla(322,85%,55%,.9)'], сл:['бесцветный','бесцветный','малиновый'], вопр:'Фенолфталеин в кислоте…', вар:['малиновый','бесцветный','синий'], в:1}
  ];
  const КУХНЯ = [
    {ф:'лимонный сок', ср:0}, {ф:'уксус', ср:0}, {ф:'газировка', ср:0}, {ф:'вода', ср:1}, {ф:'раствор соды', ср:2}, {ф:'мыльный раствор', ср:2}
  ];
  const МЕТАЛЛЫ = [
    {к:'Mg', имя:'магний', пуз:1,   набл:'бурно шипит, пробирка горячая', ур:'Mg + 2HCl → MgCl₂ + H₂↑'},
    {к:'Zn', имя:'цинк',   пуз:.55, набл:'заметно выделяются пузырьки',   ур:'Zn + 2HCl → ZnCl₂ + H₂↑'},
    {к:'Fe', имя:'железо', пуз:.2,  набл:'медленно, редкие пузырьки',     ур:'Fe + 2HCl → FeCl₂ + H₂↑'},
    {к:'Cu', имя:'медь',   пуз:0,   набл:'ничего не происходит',          ур:'Cu + HCl → реакции нет'}
  ];
  const ШАГИ5 = [
    {т:'Возьми чистую пробирку, чтобы поймать газ.',                       что:'пробирка'},
    {т:'Как держать пробирку над пробиркой с цинком и кислотой?',            что:'вопрос'},
    {т:'Зажги спиртовку.',                                                   что:'спиртовка'},
    {т:'Закрой пробирку пальцем, поднеси к пламени и открой.',              что:'поднести'},
    {т:'Раздался глухой хлопок «пах». Что это значит?',                      что:'звук'}
  ];
  const РЯД = ['K','Ca','Na','Mg','Al','Zn','Fe','Ni','Sn','Pb','H₂','Cu','Hg','Ag','Pt','Au'];
  const МАРАФОН = [
    {q:'Лакмус в кислоте…', вар:['синий','красный','фиолетовый'], в:1, р:'Кислота окрашивает лакмус в красный.'},
    {q:'Фенолфталеин в щёлочи…', вар:['бесцветный','малиновый','жёлтый'], в:1, р:'Щёлочь — малиновый цвет фенолфталеина.'},
    {q:'Какой газ выделяется при реакции цинка с соляной кислотой?', вар:['кислород','водород','хлор'], в:1, р:'Zn + 2HCl → ZnCl₂ + H₂↑.'},
    {q:'Какой металл НЕ реагирует с соляной кислотой?', вар:['цинк','магний','медь'], в:2, р:'Медь стоит в ряду активности после водорода.'},
    {q:'Mg + 2HCl → MgCl₂ + ?', вар:['H₂','O₂','Cl₂'], в:0, р:'Металл вытесняет водород.'},
    {q:'Кто бурнее реагирует с кислотой?', вар:['железо','магний','медь'], в:1, р:'Магний левее в ряду активности.'},
    {q:'Как разбавлять кислоту?', вар:['воду в кислоту','кислоту в воду','как удобно'], в:1, р:'Сначала вода, потом кислота — иначе брызги.'},
    {q:'Глухой хлопок у пробирки с водородом значит…', вар:['водород чистый','смесь с воздухом','это кислород'], в:0, р:'Лающий звук — смесь с воздухом, глухой — чистый водород.'},
    {q:'Метилоранж в кислоте…', вар:['розовый','жёлтый','оранжевый'], в:0, р:'Кислота — розовый, щёлочь — жёлтый, вода — оранжевый.'},
    {q:'Кислота попала на руку. Первым делом…', вар:['вытереть салфеткой','смыть большим количеством воды','намазать кремом'], в:1, р:'Сразу смыть водой, затем слабым раствором соды.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([[0,0],[0,2],[1,0],[1,2],[2,0],[2,2],[0,1],[1,1],[2,1],[0,0],[1,2],[2,2],[0,2],[1,0],[2,0],[0,1]]
    .map(([и,ср])=>{ const И=ИНД[и], ок=И.сл[ср], опп=И.сл[2-ср], нет=опп!==ок?опп:И.сл.find(c=>c!==ок);
      return {q:'Какого цвета '+И.имя+' в '+['кислоте','воде','щёлочи'][ср]+'?', и:и, ср:ср, ок:ок, нет:нет, раз:И.имя[0].toUpperCase()+И.имя.slice(1)+': кислота — '+И.сл[0]+', вода — '+И.сл[1]+', щёлочь — '+И.сл[2]+'.'}; }));
  const П2 = [['магний',0],['медь',1],['цинк',0],['серебро',1],['железо',0],['золото',1],['алюминий',0],['ртуть',1],['олово',0],['платина',1],['свинец',0],['медь',1],['кальций',0],['серебро',1],['цинк',0],['золото',1]]
    .map(([ф,н])=>({q:ф[0].toUpperCase()+ф.slice(1)+' + соляная кислота — пойдёт реакция?', ф:ф, вар:['да, выделится водород','нет'], в:н, раз:н?'Металл стоит в ряду активности после водорода — водород не вытесняет.':'Металл стоит в ряду активности до водорода — вытесняет его из кислоты.'}));
  const П3 = поМесту([['Mg + 2HCl → MgCl₂ + ?','H₂','O₂'],['Zn + 2HCl → ZnCl₂ + ?','H₂','Cl₂'],['Fe + 2HCl → ? + H₂','FeCl₂','FeO'],['? + 2HCl → ZnCl₂ + H₂','Zn','Cu'],
    ['Zn + ?HCl → ZnCl₂ + H₂','2','1'],['Mg + ?HCl → MgCl₂ + H₂','2','3'],['2Al + 6HCl → 2AlCl₃ + ?H₂','3','6'],['Fe + 2HCl → FeCl₂ + ?','H₂','H₂O'],
    ['Zn + H₂SO₄ → ZnSO₄ + ?','H₂','SO₂'],['Mg + H₂SO₄ → ? + H₂','MgSO₄','MgO'],['Cu + HCl → ?','реакции нет','CuCl₂ + H₂'],['Ca + 2HCl → CaCl₂ + ?','H₂','O₂'],
    ['? + H₂SO₄ → FeSO₄ + H₂','Fe','Ag'],['Zn + 2HCl → ? + H₂','ZnCl₂','ZnCl'],['Ag + HCl → ?','реакции нет','AgCl + H₂'],['Mg + 2HCl → ? + H₂','MgCl₂','MgCl']]
    .map(([у,ок,нет])=>({q:'Что вместо «?»: '+у, у:у, ок:ок, нет:нет, раз:'Ответ: '+ок+'. Металл до водорода вытесняет H₂ и образует соль; медь и серебро — после водорода.'})));

  const CSS=`
  #lvis .s6.l54n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l54n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l54n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l54n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l54n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l54n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l54n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l54n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l54n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l54n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l54n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l54n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l54n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l54n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l54n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l54n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l54n table.итоги td{white-space:normal!important}
  #lvis .s6.l54n table.итоги td:first-child{width:46%}
  #lvis .s6.l54n table.итоги{table-layout:fixed}
  #lvis .s6.l54n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l54n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l54n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l54n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l54n .ask button{text-align:left}
  #lvis .s6.l54n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l54n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l54n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l54n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l54n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l54n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l54n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l54n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l54n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l54n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l54n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l54n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l54n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l54n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l54n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l54n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l54n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l54n .плитка span{text-align:center}
  #lvis .s6.l54n .плитка:active{transform:scale(.96)}
  #lvis .s6.l54n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l54n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l54n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l54n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l54n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l54n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l54n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l54n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l54n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l54n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l54n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l54n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l54n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l54n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l54n{gap:14px}
  #lvis .s6.l54n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l54n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l54n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l54n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l54n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l54n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l54n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l54n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l54n .карт .текст b{color:${GOLD}}
  #lvis .s6.l54n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l54n .правило b{color:${GOLD}}
  #lvis .s6.l54n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l54n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l54n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l54n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l54n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l54n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l54n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l54n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l54n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l54n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l54n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l54n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l54n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l54n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l54n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l54n .буйки button.мимо{border-color:${RED};animation:l54nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l54nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l54n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l54n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l54n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l54n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l54n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l54n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l54n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l54n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l54n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l54n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l54n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l54n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l54n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l54n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l54n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l54n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l54n .уровни .точка.сейчас{background:${GOLD};animation:l54ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l54ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l54n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l54n{-webkit-text-size-adjust:100%}
  #lvis .s6.l54n [data-anim]{animation:l54nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l54nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l54n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l54n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l54n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l54n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l54n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l54n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l54n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l54n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l54n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l54n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l54n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l54n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l54n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l54n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l54n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l54n .акт span.до{background:#24402c}
  #lvis .s6.l54n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l54n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l54n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l54n [data-anim]{animation:none!important}
    #lvis .s6.l54n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l54n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l54n-style');
      if(!s){ s=document.createElement('style'); s.id='l54n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r54Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c54-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c54-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c54-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c54-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c54-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c54-плиты)"/>
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
  const тА = (x,y,t0,к,цв,якорь) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ФОРМ = (html,метка0) => A(5,'карт','<span class="метка">'+(метка0||'Уравнение')+'</span><div class="текст" style="font-size:21px;text-align:center;font-family:\'Helvetica Neue\',Arial,sans-serif">'+html+'</div>');
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки,колонок) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  const капля = (ц) => `<span class="капля" style="background:${ц}"></span>`;
  const БЕСЦВ = 'hsla(198,60%,80%,.28)';
  const КИСЛОТА = 'hsla(198,60%,78%,.36)';
  /* ряд активности строкой; отметка — символ, который подсветить */
  const РЯД_ = (отметка) => A(5,'карт','<span class="метка">Ряд активности металлов (Н. Н. Бекетов)</span><div class="акт">'+
    РЯД.map(x=>`<span class="${x==='H₂'?'вод':РЯД.indexOf(x)<РЯД.indexOf('H₂')?'до':'после'}${x===отметка?' вкл':''}">${x}</span>`).join('')+
    '</div><div class="акт-подпись"><span>← вытесняют водород из кислот</span><span>не вытесняют →</span></div>');

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=236, y0=184, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.штативПробирок(98,y0+14,40,[{уровень:.45,цвет:ИНД[0].цв[0],подпись:'HCl'},{уровень:.45,цвет:ИНД[0].цв[1],подпись:'H₂O'},{уровень:.45,цвет:ИНД[0].цв[2],подпись:'NaOH'}],1) +
      Л.склянка(196,y0+14,30,56,{уровень:.5,цвет:ИНД[0].цв[1],этикетка:['лакмус']}) + Л.склянка(232,y0+14,30,56,{уровень:.5,цвет:ИНД[1].цв[1],этикетка:['м/о']}) +
      Л.склянка(268,y0+14,30,56,{уровень:.5,цвет:'hsla(200,20%,90%,.5)',этикетка:['ф/ф']}) + Л.очки(308,y0+6,0.8);
    const поверх = метка(168,14,'Металлы и кислоты',ЗЛ,{кегль:12}) + Л.пипетка(140,y0-76,0.8,true);
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Металлы и кислоты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r54вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['по цвету индикатора','на вкус — кислое же'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Как в лаборатории узнают, что в пробирке кислота?') :
          РАЗБОР(ок,['Верно: индикатор меняет цвет — и пробовать ничего не нужно.','<b>Никогда!</b> В лаборатории ничего не пробуют на вкус: соляная кислота обжигает. Кислоту узнают <b>по цвету индикатора</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Индикатор</b> — «разведчик»: меняет цвет и сообщает, кислота в пробирке, щёлочь или вода.') : '');
  }

  /* 2. Опыт 1: три индикатора */
  function F2(s){
    const Н=250, y0=196, Л=L_(), к=s.и2, кап=s.кап2||{}, сд=s.сд2||{}, отз=s.отз2, все=ИНД.every(x=>сд[x.к]);
    const И=к==null?null:ИНД[к], капнул=И&&кап[И.к];
    const трубки = СРЕДЫ.map((ср,i)=>({уровень:.5,цвет:капнул?И.цв[i]:БЕСЦВ,подпись:ср}));
    const пр = Л.штативПробирок(150,y0+14,62,трубки,1) + (И?Л.склянка(298,y0+14,36,64,{уровень:.5,цвет:И.к==='фенолфталеин'?'hsla(200,20%,90%,.5)':И.цв[1],этикетка:[И.имя]}):'');
    const xs=[88,150,212];
    const поверх = (!И ? метка(150,16,'выбери индикатор на лотке',ЗЛ,{кегль:11}) :
      !капнул ? Л.пипетка(150,100,0.9,true) + метка(150,10,'капни '+И.имя+' в три пробирки',ЗЛ,{кегль:11}) :
        Л.пипетка(300,y0-60,0.7,false) + xs.map((x,i)=>метка(x,i===1?58:86,И.сл[i],i===0?КР:i===1?'#9a7ad8':СН,{кегль:9})).join('') +
        метка(150,14,И.имя,ЗЛ,{кегль:11}));
    const отм={}; ИНД.forEach(x=>{ отм[x.к]=сд[x.к]?'done':''; });
    const кл = И ? (И.вар.some(v=>v.length>9)?'':'три') : '';
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Три индикатора') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ЛОТОК_(ИНД.map(x=>[x.к,{лакмус:'лакмус',метилоранж:'метилоранж',фенолфталеин:'фенолфталеин'}[x.к]]),'r54и',отм,3) +
      (И&&!капнул ? `<div class="ask">${BTN(5,'','Капнуть '+И.имя+' в каждую пробирку',"r54кап()")}</div>` : '') +
      (И&&капнул&&!сд[И.к] ? A(5,'карт задача','<span class="метка">Вопрос</span><div class="текст">'+И.вопр+'</div>')+`<div class="ask ${кл}">${И.вар.map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r54ио("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !И ? СКАЗ('Опыт','В пробирках — соляная кислота, вода и раствор щёлочи. Все три прозрачны: на вид не отличить. Выбери индикатор.') : '') +
      A(8,'карт','<span class="метка">Таблица цветов · '+ИНД.filter(x=>сд[x.к]).length+' из 3</span><table class="итоги цвета"><tr><th>Индикатор</th><th>кислота</th><th>вода</th><th>щёлочь</th></tr>'+
        ИНД.map(x=>сд[x.к]?`<tr><td>${{лакмус:'лакмус',метилоранж:'метил­оранж',фенолфталеин:'фенол­фталеин'}[x.к]}</td>${x.сл.map((c,i)=>`<td>${капля(x.цв[i])}${c}</td>`).join('')}</tr>`
          :`<tr class="пусто"><td>${x.имя}</td><td>—</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('индикаторы','<b>Кислоты</b> — сложные вещества из атомов водорода и кислотного остатка: HCl, H₂SO₄, HNO₃. В растворе они меняют цвет индикаторов: <b>лакмус краснеет</b>, <b>метилоранж розовеет</b>. Фенолфталеин кислоту «не замечает» — он бесцветен, зато в щёлочи становится малиновым.') +
        ДИВО('Лакмус добывают из лишайников. Ещё в XVI веке им красили ткани, а химики заметили, что от кислоты краска краснеет. Отсюда выражение «лакмусовая бумажка» — проверка, которая сразу всё показывает.') +
        ПРАВИЛО('Кислота: лакмус — <b>красный</b>, метилоранж — <b>розовый</b>, фенолфталеин — <b>бесцветный</b>.') : '');
  }

  /* 3. Кухонные кислоты и лакмусовая бумажка */
  const кухПредмет = (i,x,y) => { const Л=L_();
    if(i===0) return `<g><ellipse cx="${x}" cy="${y-14}" rx="26" ry="16" fill="#f2c81e"/><ellipse cx="${x-6}" cy="${y-20}" rx="12" ry="5" fill="#fff6a0" opacity=".55"/><path d="M${x-27} ${y-14} q-5 -1 -6 0 M${x+27} ${y-14} q5 -1 6 0" stroke="#d8a810" stroke-width="3" stroke-linecap="round"/>`+
      `<g transform="translate(${x+30} ${y-8})"><circle r="15" fill="#f8e070" stroke="#e8c020" stroke-width="2"/>${[0,1,2,3,4,5].map(k=>`<path d="M0 0 L${(12*Math.cos(k*Math.PI/3)).toFixed(1)} ${(12*Math.sin(k*Math.PI/3)).toFixed(1)}" stroke="#fffbe0" stroke-width="1.4"/>`).join('')}</g></g>`;
    if(i===1) return Л.склянка(x,y,34,74,{уровень:.75,цвет:'hsla(198,40%,88%,.35)',этикетка:['уксус','9%'],полоса:'#c8402a'});
    if(i===2) return Л.газировка(x,y,1.0,{пузыри:.5});
    if(i===3) return Л.склянка(x,y,34,74,{уровень:.75,этикетка:['вода']});
    if(i===4) return Л.банка(x,y,40,54,{содержимое:'соль',надпись:['сода','NaHCO₃']});
    return `<g><rect x="${x-26}" y="${y-22}" width="52" height="22" rx="8" fill="#f4b8c8"/><rect x="${x-22}" y="${y-20}" width="44" height="6" rx="3" fill="#fff" opacity=".35"/><text x="${x}" y="${y-7}" text-anchor="middle" font-size="9" font-weight="bold" fill="#b86a80" font-family="Arial">МЫЛО</text></g>`;
  };
  const кухЖидкость = (i) => ['hsla(55,85%,78%,.55)','hsla(198,40%,88%,.35)','hsla(30,60%,40%,.55)',L_().цвет('вода'),'hsla(200,15%,92%,.5)','hsla(330,30%,92%,.55)'][i];
  function F3(s){
    const Н=250, y0=196, Л=L_(), к=s.к3, сд=s.сд3||{}, отз=s.отз3, все=КУХНЯ.every((x,i)=>сд[i]);
    const В=к==null?null:КУХНЯ[к], готово=В&&сд[к], ЛАК=ИНД[0];
    const yЖ = y0+14-104*0.5;
    const полоска = В ? `<g><rect x="146" y="${y0-110}" width="11" height="${110+14-10}" rx="1.5" fill="${ЛАК.цв[1]}" opacity=".9"/>`+
      (готово?`<rect x="146" y="${yЖ.toFixed(1)}" width="11" height="${(y0+4-yЖ).toFixed(1)}" fill="${ЛАК.цв[В.ср]}"/>`:'')+
      `<rect x="146" y="${y0-110}" width="11" height="${110+14-10}" rx="1.5" fill="none" stroke="#e8e0f0" stroke-opacity=".5"/><rect x="147.5" y="${y0-108}" width="2" height="${110+14-14}" fill="#fff" opacity=".25"/></g>` : '';
    const пр = (В ? Л.стакан(130,y0+14,90,104,{уровень:.5,объём:250,цвет:кухЖидкость(к),муть:к===5?50:к===4?16:0,мутьЦвет:['#ffffff','#f0e8f0','#ffffff']}) + полоска : Л.стакан(130,y0+14,90,104,{уровень:0,объём:250})) +
      (В ? кухПредмет(к,270,y0+14) : '');
    const поверх = !В ? метка(168,16,'выбери, что проверить лакмусом',ЗЛ,{кегль:11}) :
      метка(130,16,готово?В.ф+': '+ЛАК.сл[В.ср]:В.ф+' + лакмусовая бумажка',готово?(['#e86a7a','#b89ae8','#6a9aff'][В.ср]):ЗЛ,{кегль:11}) +
      (готово?метка(270,46,['кислая среда','нейтральная','щелочная среда'][В.ср],['#e86a7a','#b89ae8','#6a9aff'][В.ср],{кегль:10}):'');
    return ЖУРНАЛ(s) + ШАПКА('Кухонная химия','Лакмус против продуктов') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${КУХНЯ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${сд[i]?' был':''}" onclick="r54к(${i})">${сд[i]?'✓ ':''}${x.ф}</button>`).join('')}</div>` +
      (В&&!готово ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">Каким станет лакмус в жидкости «'+В.ф+'»?</div>')+`<div class="ask три">${['красным','фиолет.','синим'].map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r54цв("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !В ? СКАЗ('Опыт','Кислоты есть и на кухне. Проверим их лакмусовой бумажкой — пробовать на вкус в лаборатории <b>нельзя</b>, даже лимон.') : '') +
      A(8,'карт','<span class="метка">Таблица · '+КУХНЯ.filter((x,i)=>сд[i]).length+' из 6</span><table class="итоги узкая"><tr><th>Вещество</th><th>лакмус</th><th>среда</th></tr>'+
        КУХНЯ.map((x,i)=>сд[i]?`<tr><td>${x.ф}</td><td>${капля(ЛАК.цв[x.ср])}${ЛАК.сл[x.ср]}</td><td>${['кислая','нейтральная','щелочная'][x.ср]}</td></tr>`:`<tr class="пусто"><td>${x.ф}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('кислоты вокруг нас','В лимоне — <b>лимонная</b> кислота, в уксусе — <b>уксусная</b>, в газировке — <b>угольная</b> (CO₂ в воде), в кефире — <b>молочная</b>, в желудке — <b>соляная</b>. Мыло и раствор соды — <b>щелочные</b>: лакмус синеет.') +
        ДИВО('Индикатор можно сделать дома из <b>краснокочанной капусты</b>: её фиолетовый отвар краснеет от лимонного сока и зеленеет от соды.') +
        ПРАВИЛО('Кислый вкус — признак кислоты, но в лаборатории вкус <b>никогда</b> не проверяют: только индикатором.') : '');
  }

  /* 4. Опыт 2: металлы в соляной кислоте */
  function F4(s){
    const Н=266, y0=206, Л=L_(), ш=Math.min(s.о4||0,2), мет=s.мет4||{}, отз=s.о4отз, все=МЕТАЛЛЫ.every(x=>мет[x.к]), в=s.ответ4, ок=в===0, конец=все&&ок;
    const xs=[75,125,175,225];
    const трубки = ш<1 ? null : МЕТАЛЛЫ.map(x=>({уровень:ш>=2?.45:0, цвет:мет[x.к]&&x.к==='Fe'?'hsla(95,45%,70%,.45)':КИСЛОТА, металл:мет[x.к]?x.к:null, пузыри:мет[x.к]?x.пуз:0, подпись:x.к}));
    const жар = мет.Mg ? `<rect x="${xs[0]-13}" y="${y0+14-96}" width="26" height="86" rx="13" fill="#ff5a28" opacity=".16"/>` : '';
    const пр = жар + (трубки?Л.штативПробирок(150,y0+14,50,трубки,1):'') + Л.склянка(296,y0+14,36,66,{уровень:ш>=2?.35:.6,этикетка:['HCl','10%']});
    const пар = мет.Mg&&Л.ДВИЖ ? [0,1,2].map(k=>`<path d="M${xs[0]-6+k*6} ${y0+14-100} q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="1" fill="none" opacity=".35"><animate attributeName="opacity" values=".1;.45;.1" dur="${1.2+k*0.3}s" repeatCount="indefinite"/></path>`).join('') : '';
    const столбы = ш>=2 ? `<path d="M50 116 H250" stroke="#4a525c" stroke-width="1"/>` + МЕТАЛЛЫ.map((x,i)=>!мет[x.к]?'':
      `<rect x="${xs[i]-9}" y="${(116-60*x.пуз).toFixed(1)}" width="18" height="${(60*x.пуз).toFixed(1)}" rx="2" fill="${['#ff8a5a','#ffd76a','#c8e070','#6a7480'][i]}" opacity=".9"/>`+
      тА(xs[i],(110-60*x.пуз).toFixed(1),['бурно','заметно','медленно','нет'][i],9,['#ff8a5a','#ffd76a','#c8e070','#9aa3ad'][i])).join('') +
      (Object.keys(мет).length?тА(150,34,'выделение водорода',9,'#c8ced6'):'') : '';
    const поверх = пар + столбы + (ш===0?метка(150,40,'начни со штатива',null,{кегль:11}):'') + (мет.Mg?тА(xs[0],y0+46,'горячая!',8,'#ff8a5a'):'') +
      (конец?метка(150,4,'Mg > Zn > Fe > Cu',ЗЕ,{кегль:11}):'');
    const ЛОТОК4=[['штативП','Штатив'],['кислота','HCl'],['Mg','Магний'],['Zn','Цинк'],['Fe','Железо'],['Cu','Медь'],['спиртовка','Спиртовка'],['лакмус','Лакмус']];
    const отм={}; if(ш>=1) отм.штативП='done'; if(ш>=2) отм.кислота='done'; МЕТАЛЛЫ.forEach(x=>{ if(мет[x.к]) отм[x.к]='done'; });
    const шагТ = ш===0?'Поставь штатив с четырьмя чистыми пробирками.':ш===1?'Налей в каждую пробирку соляную кислоту (на 2–3 см).':!все?'Опусти в пробирки по кусочку металла: магний, цинк, железо, медь.':'Сравни, как идут реакции.';
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Металлы в соляной кислоте') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (!все ? A(3,'карт задача','<span class="метка">Шаг '+(ш<2?ш+1:3)+' из 4</span><div class="текст">'+шагТ+'</div>') : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (!все ? ЛОТОК_(ЛОТОК4,'r54о4',отм) : '') +
      A(8,'карт','<span class="метка">Наблюдения · '+МЕТАЛЛЫ.filter(x=>мет[x.к]).length+' из 4</span><table class="итоги узкая"><tr><th>Металл</th><th>что видно</th><th>уравнение</th></tr>'+
        МЕТАЛЛЫ.map(x=>мет[x.к]?`<tr><td>${x.имя}</td><td>${x.набл}</td><td>${x.ур}</td></tr>`:`<tr class="пусто"><td>${x.имя}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      СПИСОК('Ход опыта',['Штатив с пробирками','Соляная кислота','Четыре металла','Ряд активности'],все?(ок?4:3):ш<2?ш:2) +
      (все ? ОТВЕТЫ('',['Mg > Zn > Fe > Cu','Cu > Fe > Zn > Mg','Zn > Mg > Cu > Fe'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Расставь металлы по активности — от самого бурного к самому спокойному.') :
          РАЗБОР(ок,['Верно! Ровно в таком порядке они стоят в ряду активности Бекетова.','Посмотри на столбики пузырьков: магний бурлит сильнее всех, медь молчит.','Цинк бурлит слабее магния, а медь не реагирует вовсе — она последняя.'][в])) : '') +
      (конец ? РЯД_('Cu') + ТЕОРИЯ('реакция замещения','Металл, стоящий в ряду активности <b>до водорода</b>, вытесняет водород из кислоты: <b>Zn + 2HCl → ZnCl₂ + H₂↑</b>. Атом цинка занимает место атомов водорода — это <b>реакция замещения</b>. Чем левее металл, тем бурнее реакция. Медь, серебро и золото стоят <b>после водорода</b> — с соляной кислотой не реагируют.') +
        ДИВО('Ряд активности составил русский химик <b>Николай Бекетов</b> в 1865 году. Он опускал металлы в растворы солей и кислот и смотрел, кто кого вытесняет — почти так же, как ты сейчас.') +
        ПРАВИЛО('Металл <b>до H₂</b> + кислота → соль + <b>водород↑</b>. Металл после H₂ — реакции нет.') : '');
  }

  /* 5. Как узнать водород */
  function F5(s){
    const Н=262, y0=206, Л=L_(), ш=Math.min(s.о5||0,ШАГИ5.length), отз=s.о5отз, готово=ш>=ШАГИ5.length, смесь=!!s.смесь5;
    const у=y0+14, верхП=у-10-84;
    const пр = Л.штативПробирок(84,у,40,[{уровень:.45,цвет:КИСЛОТА,металл:'Zn',пузыри:.6,подпись:'Zn + HCl'}],1) +
      Л.спиртовка(256,у,1,ш>=3) + (ш===1?Л.пробирка(170,у,1,{}):'');
    const перевёрнутая = (x,yУст) => Л.пробирка(x,yУст,1,{угол:180}) + тА(x,yУст+30,'H₂',10,'#bfe6fa');
    const поверх = (ш>=2&&ш<4 ? перевёрнутая(84,верхП-88) : '') +
      (ш>=4 ? перевёрнутая(238,у-62-84+2) + Л.хлопок(244,у-62,!смесь) : '') +
      (ш===0?метка(168,16,'газ из пробирки с цинком нужно поймать',ЗЛ,{кегль:11}):'') +
      (ш>=2&&ш<4?метка(220,40,'водород собирается вверху',СН,{кегль:10}):'') +
      (ш>=4?метка(120,16,смесь?'лающий хлопок: смесь с воздухом':'глухой хлопок: чистый водород',смесь?КР:ЗЕ,{кегль:11}):'');
    const ДЕЙ=ШАГИ5[Math.min(ш,ШАГИ5.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='вопрос') кнопки=`<div class="ask пара">${['отверстием вниз','отверстием вверх'].map((t0,j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r54о5('в"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='поднести') кнопки=`<div class="ask">${BTN(5,'','Закрыть пальцем, поднести к пламени, открыть',"r54о5('поднести')")}</div>`;
      if(ДЕЙ==='звук') кнопки=`<div class="ask пара">${['водород чистый','смесь с воздухом'].map((t0,j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r54о5('з"+j+"')")).join('')}</div>`;
    }
    const ЛОТОК5=[['пробирка','Пробирка'],['спиртовка','Спиртовка'],['лучинка','Лучинка'],['колба','Колба']];
    const отм={}; ЛОТОК5.forEach(([что])=>{ const i=ШАГИ5.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3 · шаг '+Math.min(ш+1,ШАГИ5.length)+' из '+ШАГИ5.length,'Как узнать водород') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ5[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК5,'r54о5',отм)) +
      СПИСОК('Ход опыта',ШАГИ5.map(x=>x.т),ш) +
      (готово ? `<div class="ask">${BTN(9,смесь?'':'hit',смесь?'Повторить с чистым водородом':'А если собрать водород не до конца?',"r54смесь()")}</div>` +
        ТЕОРИЯ('водород','<b>Водород H₂</b> — самый лёгкий газ: в 14,5 раза легче воздуха. Поэтому его собирают в пробирку, перевёрнутую <b>вверх дном</b>. Водород горит: <b>2H₂ + O₂ → 2H₂O</b>. Чистый сгорает спокойно — <b>глухой хлопок</b>. Смесь с воздухом взрывается — <b>лающий звук</b>. Так проверяют водород на чистоту, прежде чем поджигать.') +
        ДИВО('Раньше водородом наполняли дирижабли. В 1937 году огромный «Гинденбург» вспыхнул за полминуты. С тех пор воздушные шары и дирижабли наполняют негорючим <b>гелием</b>.') +
        ПРАВИЛО('Водород узнают по <b>хлопку</b> у пламени. Тлеющая лучинка — проба на <b>кислород</b>.') : '');
  }

  /* 6. Микромир: Zn + 2HCl */
  function F6(s){
    const Н=236, y0=222, Л=L_(), ст=s.мст6?1:0, в=s.ответ6, ок=в===0;
    const лево = Л.молекула(70,72,1.1,'Zn',{подписи:true}) + Л.молекула(46,150,1.1,'HCl',{подписи:true}) + Л.молекула(98,186,1.1,'HCl',{подписи:true});
    const право = Л.молекула(250,72,1.1,'ZnCl2',{подписи:true}) + Л.молекула(250,160,1.1,'H2',{подписи:true});
    const поверх = (ст===0 ? лево : право + `<g opacity=".25">${лево}</g>`) +
      `<path d="M150 118 H184 M178 112 L186 118 L178 124" stroke="${ст?'#8fd1a8':'#6a7480'}" stroke-width="2.4" fill="none"/>` +
      тА(70,108,ст?'':'цинк Zn',10,'#c8ced6') + тА(76,218,ст?'':'2 HCl',10,'#c8ced6') +
      (ст?тА(250,108,'хлорид цинка',10,'#c8ced6')+тА(250,190,'водород ↑',10,'#bfe6fa'):'') +
      метка(168,4,'Zn + 2HCl → ZnCl₂ + H₂↑',ст?ЗЕ:ЗЛ,{кегль:12});
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Что происходит в пробирке') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ask">${BTN(3,'',ст===0?'Запустить реакцию →':'Вернуть исходные частицы',"r54мст()")}</div>` +
      A(4,'карт','<span class="метка">Счётчик атомов</span><table class="итоги счётчик"><tr><th>Атом</th><th>до реакции</th><th>после</th></tr>'+
        [['Zn','1','1'],['H','2 (в 2 HCl)','2 (в H₂)'],['Cl','2 (в 2 HCl)','2 (в ZnCl₂)']].map(([а,д,п])=>`<tr><td><b>${а}</b></td><td>${д}</td><td>${ст?п+' ✓':'?'}</td></tr>`).join('')+'</table>') +
      ТЕОРИЯ('замещение','Атом цинка «отбирает» хлор у двух молекул HCl: получается соль <b>хлорид цинка ZnCl₂</b>, а освободившиеся атомы водорода соединяются в молекулу <b>H₂</b> — она и поднимается пузырьком. Число атомов каждого вида до и после реакции одинаково.') +
      (ст ? ОТВЕТЫ('',['чтобы хватило атомов хлора на ZnCl₂','так короче записывать'],0,в,6) +
        (в==null ? СКАЗ('Вопрос','Зачем перед HCl стоит коэффициент 2?') :
          РАЗБОР(ок,['Верно: в ZnCl₂ два атома хлора, а в одной молекуле HCl — один. Нужны две молекулы.','Коэффициент уравнивает атомы: в ZnCl₂ два атома Cl — значит, нужно <b>две</b> молекулы HCl.'][в])) : СКАЗ('Микромир','Запусти реакцию и посмотри, куда переходят атомы.')) +
      (ок ? ПРАВИЛО('Металл + кислота → <b>соль</b> + <b>водород</b>. Атомы не исчезают — они меняют партнёров.') : '');
  }

  /* 7. Безопасность: сначала вода, потом кислота */
  function F7(s){
    const Н=236, y0=196, Л=L_(), ч=s.ч7, ок0=ч===0, в=s.ответ7, ок=в===1;
    const пр = Л.стакан(214,y0+14,84,96,{уровень:.5,объём:250,цвет:Л.цвет('вода')}) +
      (ч==null?Л.склянка(96,y0+14,40,80,{уровень:.6,цвет:'hsla(48,30%,88%,.5)',этикетка:['H₂SO₄','конц.'],полоса:'#c8402a'}):'');
    const наклон = `<g transform="translate(150 ${y0-64}) rotate(-62)">${Л.склянка(0,40,34,70,{уровень:.4,цвет:'hsla(48,30%,88%,.5)',этикетка:['H₂SO₄'],полоса:'#c8402a'})}</g>`;
    const брызги = Array.from({length:9},(_,k)=>`<circle cx="${190+((k*37)%60)}" cy="${y0-60-((k*23)%40)}" r="${1.6+(k%3)}" fill="#e8f4ff" opacity=".85">${Л.ДВИЖ?`<animate attributeName="cy" values="${y0-40};${y0-80-((k*23)%40)};${y0-40}" dur="${0.8+(k%4)*0.15}s" repeatCount="indefinite"/>`:''}</circle>`).join('');
    const поверх = ч==null ? метка(168,16,'серная кислота и вода',ЗЛ,{кегль:11}) :
      ок0 ? наклон + Л.струя(186,y0-44,206,y0-30,'hsla(48,30%,90%,.8)') + Л.палочка(240,y0-60,226,y0+4) + метка(150,10,'кислоту — в воду, тонкой струйкой',ЗЕ,{кегль:11}) + метка(240,40,'тепло, спокойно',СН,{кегль:10})
        : брызги + метка(150,10,'вода закипает — брызги кислоты!',КР,{кегль:11}) + Л.склянка(96,y0+14,40,80,{уровень:.6,цвет:'hsla(48,30%,88%,.5)',этикетка:['H₂SO₄','конц.'],полоса:'#c8402a'});
    return ЖУРНАЛ(s) + ШАПКА('Безопасность','Как разбавлять кислоту') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(3,'карт задача','<span class="метка">Выбор</span><div class="текст">Нужно разбавить концентрированную серную кислоту. Что во что наливать?</div>') +
      `<div class="ask пара">${['кислоту в воду','воду в кислоту'].map((t0,j)=>BTN(4+j,ч===j?(j===0?'hit':'miss'):'',t0,"r54ч("+j+")")).join('')}</div>` +
      (ч==null ? '' : РАЗБОР(ок0, ок0?'Верно. Кислоту льют <b>тонкой струйкой в воду</b>, помешивая. Тепло рассеивается в большом объёме воды.':'Опасно! Вода легче кислоты и остаётся сверху: от сильного нагрева она мгновенно закипает и разбрызгивает кислоту.')) +
      (ок0 ? ТЕОРИЯ('правило','При смешивании серной кислоты с водой выделяется <b>много теплоты</b>. Если лить воду в кислоту, первые капли закипают прямо на поверхности. Поэтому химики запоминают: <b>«Сначала вода, потом кислота — иначе случится большая беда»</b>.') +
        ОТВЕТЫ('',['вытереть салфеткой','смыть большим количеством воды','смазать кремом'],1,в,7) +
        (в==null ? СКАЗ('Первая помощь','Капля кислоты попала на руку. Что делать сразу?') :
          РАЗБОР(ок,['Салфетка размажет кислоту по коже. Нужно <b>смыть большим количеством воды</b>.','Верно: обильно промыть водой, затем слабым раствором питьевой соды и сказать учителю.','Крем удержит кислоту на коже. Сначала — <b>много воды</b>.'][в])) : '') +
      (ок ? ПРАВИЛО('<b>Сначала вода, потом кислота.</b> Попала на кожу — смыть большим количеством воды.') : '');
  }

  /* 8. Вывод */
  function F8(s){
    const Н=214, y0=176, Л=L_();
    const пр = Л.штативПробирок(110,y0+14,40,МЕТАЛЛЫ.map(x=>({уровень:.45,цвет:x.к==='Fe'?'hsla(95,45%,70%,.45)':КИСЛОТА,металл:x.к,пузыри:x.пуз,подпись:x.к})),0.9) +
      Л.штативПробирок(268,y0+14,32,ИНД.map((x)=>({уровень:.45,цвет:x.цв[0]})),0.9);
    const поверх = метка(168,12,'кислота: индикатор + металл до H₂',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Кислоты узнают по <b>индикаторам</b>: лакмус — красный, метилоранж — розовый, фенолфталеин — бесцветный.<br>• Металлы <b>до водорода</b> в ряду активности вытесняют его из кислот: Mg + 2HCl → MgCl₂ + H₂↑.<br>• Чем левее металл, тем бурнее реакция; медь не реагирует.<br>• Водород узнают по <b>хлопку</b> у пламени.<br>• Сначала вода, потом кислота.</div>') +
      ПРАВИЛО('<b>Металл + кислота → соль + водород</b> — если металл стоит в ряду до H₂.');
  }

  /* 9. Марафон */
  function F9(s){
    const Н=200, y0=156, Л=L_(), м9=s.мар9||{}, n=Math.min(м9.n||0,МАРАФОН.length), ош=Math.min(м9.ош||0,3), отв=s.отв9, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.штативПробирок(268,y0+14,30,[0,1,2].map(i=>({уровень:.45,цвет:i<3-ош?ИНД[0].цв[0]:'hsla(0,0%,60%,.2)'})),0.8) +
      Л.штативПробирок(90,y0+14,40,[{уровень:.45,цвет:КИСЛОТА,металл:'Zn',пузыри:.6}],1);
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(150,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(268,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Индикаторы, ряд активности и водород — всё на месте.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r54заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r54мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Металл до H₂ + кислота → соль + водород.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какой газ выделяется при реакции цинка с соляной кислотой?', варианты:[{т:'водород',ок:true},{т:'кислород',ок:false}], разбор:'Zn + 2HCl → ZnCl₂ + H₂↑.' },
    { вопрос:'Лакмус в кислоте становится…', варианты:[{т:'синим',ок:false},{т:'красным',ок:true}], разбор:'Кислота — красный лакмус.' },
    { вопрос:'Mg + 2HCl → MgCl₂ + ?', варианты:[{т:'H₂',ок:true},{т:'Cl₂',ок:false}], разбор:'Магний вытесняет водород.' },
    { вопрос:'Медь опустили в соляную кислоту. Что будет?', варианты:[{т:'бурная реакция',ок:false},{т:'ничего',ок:true}], разбор:'Медь стоит после водорода.' },
    { вопрос:'Как разбавлять кислоту?', варианты:[{т:'кислоту в воду',ок:true},{т:'воду в кислоту',ок:false}], разбор:'Сначала вода, потом кислота.' }
  ];
  function F10(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r54Reset()")}</div>` +
        ПРАВИЛО('Металл до H₂ + кислота → соль + H₂↑');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r54Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const доска = (Н,текст,цв) => `<rect x="16" y="30" width="304" height="${Н-96}" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/><text x="168" y="${30+(Н-96)/2+7}" text-anchor="middle" font-size="18" font-weight="bold" fill="${цв||'#f2f5f8'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(текст)}</text>`;
  const МЕТ_СИМ = {магний:'Mg',медь:'Cu',цинк:'Zn',серебро:'Ag',железо:'Fe',золото:'Au',алюминий:'Al',ртуть:'Hg',олово:'Sn',платина:'Pt',свинец:'Pb',кальций:'Ca'};
  const рядСВГ = (y,отм,показ) => { const ш=19.5, x0=168-ш*РЯД.length/2;
    return РЯД.map((x,i)=>{ const до=i<РЯД.indexOf('H₂'), в=x==='H₂', сам=x===отм&&показ;
      return `<rect x="${(x0+i*ш+1).toFixed(1)}" y="${y}" width="${ш-2}" height="22" rx="4" fill="${сам?'#ffd76a':в?'#2a4a6a':до?'#2a3a2e':'#3a2e2a'}" stroke="${x===отм?'#ffd76a':'#4a525c'}"/>`+
        тА((x0+i*ш+ш/2).toFixed(1),y+15,x,x.length>2?8:9,сам?'#1a1c1f':в?'#bfe6fa':'#e8ecf0'); }).join(''); };
  const Т = {
    т1:{ имя:'Цвет индикатора', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=148, отв=ст.ответ!=null, И=ИНД[з.и];
        return свгЛ(сцена(Н,y0,Л.штативПробирок(100,y0+14,40,[{уровень:.5,цвет:отв?И.цв[з.ср]:БЕСЦВ,подпись:СРЕДЫ[з.ср]}],1)+Л.склянка(250,y0+14,40,66,{уровень:.5,цвет:И.к==='фенолфталеин'?'hsla(200,20%,90%,.5)':И.цв[1],этикетка:[И.имя]}),
          метка(200,20,И.имя+' + '+['кислота','вода','щёлочь'][з.ср],ЗЛ,{кегль:11})+(ст.серия>=3?метка(270,52,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Ряд активности', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=190, y0=158, отв=ст.ответ!=null, сим=МЕТ_СИМ[з.ф], да=з.в===0;
        return свгЛ(сцена(Н,y0,Л.штативПробирок(168,y0+14,40,[{уровень:.45,цвет:КИСЛОТА,металл:{Mg:'Mg',Zn:'Zn',Fe:'Fe',Cu:'Cu'}[сим]||(да?'Zn':'Cu'),пузыри:отв&&да?.6:0,подпись:сим+' + HCl'}],1),
          рядСВГ(14,сим,отв)+(ст.серия>=3?метка(270,48,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Уравнения', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=190, y0=166, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.штативПробирок(40,y0+14,30,[{уровень:.45,цвет:КИСЛОТА,металл:'Mg',пузыри:.8}],0.7)+Л.склянка(300,y0+14,26,44,{уровень:.5,этикетка:['HCl']}),
          доска(160,отв?з.у.replace('?',з.ок):з.у,отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,6,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r54Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r54T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r54TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L54 = {
    id: ID, title: 'Металлы и кислоты', ico: '⚡',
    src: 'Химия · 5–6 класс · Реакции', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: три индикатора в кислоте, воде и щёлочи.',
      'Кухонная химия: лакмус против продуктов.',
      'Опыт 2: магний, цинк, железо и медь в соляной кислоте.',
      'Опыт 3: как узнать водород.',
      'Микромир: Zn + 2HCl → ZnCl₂ + H₂.',
      'Безопасность: сначала вода, потом кислота.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: цвет индикатора.',
      'Тренажёр 2: ряд активности.',
      'Тренажёр 3: уравнения.'
    ],
    check: { q: 'Какой газ выделяется при реакции цинка с кислотой?', choices: ['Кислород','Водород','Углекислый газ','Азот'], ans: 1, exp: 'Zn + 2HCl → ZnCl₂ + H₂↑ — выделяется водород.' },
    tasks: [
      { q: 'Mg + 2HCl → MgCl₂ + ?', kind: 'choice', choices: ['H₂','O₂','Cl₂','H₂O'], ans: 0, tol: 0, hints: ['Магний вытесняет из кислоты…', '…водород.'], sol: 'Mg + 2HCl → MgCl₂ + H₂↑.' },
      { q: 'Лакмус в кислоте становится…', kind: 'choice', choices: ['Синим','Красным','Фиолетовым','Жёлтым'], ans: 1, tol: 0, hints: ['Вспомни пробирку с HCl.', 'Кислота — красный.'], sol: 'В кислоте лакмус красный.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.штативПробирок){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L54.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Кухонная химия',4:'Опыт 2',5:'Опыт 3',6:'Микромир',7:'Безопасность',8:'Вывод',9:'Проверка',10:'Практика',
      11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l54n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Металлы и кислоты'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r54Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к;
    if(f===4&&к===0&&МЕТАЛЛЫ.every(x=>(s.мет4||{})[x.к])) s.дело_активность=true; chRender(0); };
  window.r54вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r54и=(к)=>{ const s=S(); const i=ИНД.findIndex(x=>x.к===к); if(i<0) return; s.и2=i; s.отз2=null; chRender(0); };
  window.r54кап=()=>{ const s=S(); const И=ИНД[s.и2]; if(!И) return; const к=Object.assign({},s.кап2||{}); к[И.к]=true; s.кап2=к;
    s.отз2={ок:true,т:'Капнули '+И.имя+': в кислоте — '+И.сл[0]+', в воде — '+И.сл[1]+', в щёлочи — '+И.сл[2]+'.'}; chRender(0); };
  window.r54ио=(j)=>{ const s=S(); const И=ИНД[s.и2]; if(!И||!(s.кап2||{})[И.к]) return;
    if(j===И.в){ const с=Object.assign({},s.сд2||{}); с[И.к]=true; s.сд2=с; s.отз2={ок:true,т:'Верно. '+И.имя[0].toUpperCase()+И.имя.slice(1)+' записан в таблицу.'+(ИНД.every(x=>с[x.к])?' Все три индикатора испытаны!':' Возьми следующий индикатор.')}; if(ИНД.every(x=>с[x.к])) s.дело_индикаторы=true; }
    else s.отз2={ок:false,j:j,т:'Посмотри на пробирки ещё раз: цвет подписан над каждой.'};
    chRender(0); };
  window.r54к=(i)=>{ const s=S(); s.к3=i; s.отз3=null; chRender(0); };
  window.r54цв=(j)=>{ const s=S(); const В=КУХНЯ[s.к3]; if(!В) return;
    if(j===В.ср){ const с=Object.assign({},s.сд3||{}); с[s.к3]=true; s.сд3=с; s.отз3={ок:true,т:['«'+В.ф+'» — кислая среда: лакмус покраснел.','Вода нейтральна: лакмус остался фиолетовым.','«'+В.ф+'» — щелочная среда: лакмус посинел.'][В.ср]}; }
    else s.отз3={ок:false,j:j,т:В.ср===0?'Подумай о вкусе: «'+В.ф+'» кислый — значит, там кислота.':В.ср===1?'Чистая вода не кислая и не щелочная.':'Мыло и сода — не кислоты, а щелочные вещества.'};
    chRender(0); };
  const ИМЯ4 = {Mg:'магний',Zn:'цинк',Fe:'железо',Cu:'медь'};
  window.r54о4=(что)=>{ const s=S(); const ш=s.о4||0, мет=Object.assign({},s.мет4||{});
    const отказ=(т)=>{ s.о4отз={ок:false,т:т}; chRender(0); };
    if(ш===0){ if(что==='штативП'){ s.о4=1; s.о4отз={ок:true,т:'Штатив с четырьмя пробирками на столе.'}; chRender(0); return; }
      return отказ(ИМЯ4[что]?'Сначала нужны пробирки: поставь штатив.':'Сначала поставь штатив с пробирками.'); }
    if(ш===1){ if(что==='кислота'){ s.о4=2; s.о4отз={ок:true,т:'В каждой пробирке — разбавленная соляная кислота. Она бесцветная, как вода.'}; chRender(0); return; }
      return отказ(ИМЯ4[что]?'Металл в пустой пробирке ни с чем не прореагирует. Сначала налей кислоту.':'Сначала налей в пробирки соляную кислоту.'); }
    const М=МЕТАЛЛЫ.find(x=>x.к===что);
    if(М){ if(мет[М.к]) return отказ(М.имя[0].toUpperCase()+М.имя.slice(1)+' уже в пробирке. Возьми другой металл.');
      мет[М.к]=true; s.мет4=мет; s.о4отз={ок:true,т:М.имя[0].toUpperCase()+М.имя.slice(1)+': '+М.набл+'.'}; chRender(0); return; }
    if(что==='спиртовка') return отказ('Нагревать не нужно: металлы реагируют с кислотой и так. Магний ещё и сам разогреет пробирку.');
    if(что==='лакмус') return отказ('Что в пробирках кислота, мы уже знаем. Сейчас опускаем металлы.');
    return отказ('Это уже на месте. Опусти в пробирки металлы.'); };
  const ИМЯ5 = {пробирка:'пробирку',спиртовка:'спиртовку',лучинка:'лучинку',колба:'колбу'};
  window.r54о5=(что)=>{ const s=S(); const ш=s.о5||0; if(ш>=ШАГИ5.length) return; const нужно=ШАГИ5[ш].что;
    const вперёд=(т)=>{ s.о5=ш+1; s.о5отз={ок:true,т:т}; chRender(0); };
    if(что===нужно&&нужно==='пробирка') return вперёд('Чистая сухая пробирка в руке.');
    if(нужно==='вопрос'&&/^в\d$/.test(что)){ if(что==='в0') return вперёд('Верно: водород легче воздуха — он поднимается вверх и вытесняет воздух из перевёрнутой пробирки.');
      s.о5отз={ок:false,j:1,т:'Водород в 14,5 раза легче воздуха: из пробирки отверстием вверх он просто улетит.'}; chRender(0); return; }
    if(что===нужно&&нужно==='спиртовка') return вперёд('Спиртовка горит. Пробирку с водородом держим подальше от реакции.');
    if(нужно==='поднести'&&что==='поднести') return вперёд('Пах! Короткий глухой хлопок у отверстия.');
    if(нужно==='звук'&&/^з\d$/.test(что)){ if(что==='з0'){ s.смесь5=false; return вперёд('Верно: глухой хлопок — водород чистый. Лающий звук был бы, если бы в пробирке осталось много воздуха.'); }
      s.о5отз={ок:false,j:1,т:'Смесь с воздухом даёт резкий <b>лающий</b> звук. Глухое «пах» — признак чистого водорода.'}; chRender(0); return; }
    if(что==='лучинка'){ s.о5отз={ок:false,т:'Тлеющая лучинка — проба на <b>кислород</b>. Водород узнают иначе — по хлопку у пламени.'}; chRender(0); return; }
    s.о5отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ5[что]?'Отложи '+ИМЯ5[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ5[ш].т}; chRender(0); };
  window.r54смесь=()=>{ const s=S(); s.смесь5=!s.смесь5; chRender(0); };
  window.r54мст=()=>{ const s=S(); s.мст6=!s.мст6; chRender(0); };
  window.r54ч=(j)=>{ const s=S(); s.ч7=j; chRender(0); };
  window.r54мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар9||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв9={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв9={i:м.n,ок:false,j:j}; }
    s.мар9=м; chRender(0); };
  window.r54заново=()=>{ const s=S(); s.мар9={n:0,ош:0}; s.отв9=null; chRender(0); };
  window.r54Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r54Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r54T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r54TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r54Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L54,{__планПорядок:arr[м].__планПорядок}); else arr.push(L54); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU54={render:render, L:L54};
})();
