/* ============ ХИМИЯ · УРОК 42 · «ГАЗЫ: МОЛЯРНЫЙ ОБЪЁМ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–41 (манера NOBOOK), «ещё внимательнее и качественнее».
   Карточка 42 из банка подменяется этой записью (VISKW[42]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ): аналитические весы со стеклянным боксом
   (0,001 г), стеклянный шар 1 л с краном, ручной вакуумный насос, газовые баллоны по
   российской маркировке (водород — тёмно-зелёный с красной надписью, кислород —
   голубой с чёрной, углекислота — чёрный с жёлтой), кристаллизатор с водой, перевёрнутый
   мерный цилиндр (сбор газа вытеснением воды), штатив с лапкой, газоотводная трубка,
   пузырьки, куб 22,4 л с ребром 28,2 см рядом с баскетбольным мячом, манометр и
   термометр-циферблат (н. у.: 0 °C, 101,3 кПа).

   ДЕТАЛИ. Литр газа взвешивают в откачанном шаре: сначала насос, потом весы с TARE,
   затем газ из баллона; плотности при н. у.: H₂ 0,090 г/л, O₂ 1,429 г/л, CO₂ 1,964 г/л;
   M : ρ у всех ≈ 22,4 л/моль — молярный объём выводится из опыта, а не берётся на веру.
   Водород из цинка: 0,65 г Zn = 0,01 моль → 224 мл H₂ при н. у.; газ собирают над водой в
   перевёрнутый цилиндр; соляная кислота — осторожно. Замечание: при 20 °C моль газа
   занимает около 24 л — 22,4 л только при нормальных условиях.

   ТЕОРИЯ (8 класс): в газе расстояния между молекулами много больше их размеров; закон
   Авогадро (1811): в равных объёмах разных газов при одинаковых условиях — одинаковое
   число молекул; молярный объём Vm = V : n = 22,4 л/моль при н. у.; V = Vm · n; n = V : Vm;
   m = n · M. */
(function(){
  'use strict';

  const ID = 42;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'авогадро', имя:'Опыт 1: литр трёх газов', итог:'Vm = 22,4 л'},
    {ключ:'водород',  имя:'Опыт 2: водород из цинка', итог:'224 мл'},
    {ключ:'марафон',  имя:'Проверка: марафон',       итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Выяснить, сколько места занимает <b>1 моль газа</b>, вывести молярный объём из опыта и научиться считать объёмы газов в реакциях.'],
    ['Принцип','В газе молекулы далеко друг от друга — расстояния между ними в десятки раз больше самих молекул. Поэтому объём газа зависит от <b>числа молекул</b>, а не от того, какие это молекулы (<b>закон Авогадро</b>, 1811). При <b>нормальных условиях</b> (0 °C, 101,3 кПа) 1 моль любого газа занимает <b>22,4 л</b>.'],
    ['Оборудование','<b>Приборы:</b> аналитические весы (0,001 г), стеклянный шар 1 л с краном, вакуумный насос, газовые баллоны, штатив с лапкой, пробирка с газоотводной трубкой, кристаллизатор, мерный цилиндр 250 мл.<br><b>Реактивы:</b> водород H₂, кислород O₂, углекислый газ CO₂, гранулы цинка Zn, соляная кислота HCl (разбавленная).'],
    ['Ход работы','1. Взвесить по 1 л трёх газов, найти M : ρ.<br>2. Рассмотреть куб 22,4 л.<br>3. Получить водород из цинка и собрать его над водой.<br>4. Сравнить объём с расчётом.'],
    ['Безопасность','<b>Водород горюч</b>, с воздухом даёт гремучую смесь: рядом не должно быть огня. Баллоны закрепляют и не роняют. <b>Соляная кислота</b> едкая — очки и перчатки; при попадании смыть водой. Газы не нюхают, а если нужно — лёгким движением руки направляют к себе.']
  ];
  const ГАЗЫ = [
    {к:'H2',  ф:'H₂',  имя:'водород',     M:2,  ρ:0.090, пок:'0.090', бал:'балH2'},
    {к:'O2',  ф:'O₂',  имя:'кислород',    M:32, ρ:1.429, пок:'1.429', бал:'балO2'},
    {к:'CO2', ф:'CO₂', имя:'углекислый газ', M:44, ρ:1.964, пок:'1.964', бал:'балCO2'}
  ];
  const ШАГИ1 = [
    {т:'Поставь на стол аналитические весы.',                 что:'анВесы'},
    {т:'Откачай насосом воздух из стеклянного шара.',         что:'насос'},
    {т:'Поставь пустой шар на весы.',                          что:'шарКолба'},
    {т:'Нажми TARE — масса шара вычтется.',                   что:'TARE'},
    {т:'Наполни шар газом из баллона и взвесь: водород, кислород и углекислый газ.', что:'газы'},
    {т:'Раздели молярную массу на массу литра: M : ρ.',       что:'деление'}
  ];
  const ЛОТОК1 = [['анВесы','Аналит. весы'],['насос','Насос'],['шарКолба','Шар 1 л'],['балH2','Баллон H₂'],['балO2','Баллон O₂'],['балCO2','Баллон CO₂'],['весы','Весы 0,1 г'],['цилиндр','Цилиндр']];
  const ШАГИ2 = [
    {т:'Закрепи в штативе пробирку.',                                   что:'штатив'},
    {т:'Поставь кристаллизатор с водой.',                               что:'кристаллизатор'},
    {т:'Наполни цилиндр водой и переверни его в кристаллизатор.',       что:'перевернуть'},
    {т:'Положи в пробирку 0,65 г цинка.',                               что:'цинк'},
    {т:'Прилей соляную кислоту — осторожно, в очках!',                  что:'кислота'},
    {т:'Закрой пробирку пробкой с трубкой, конец трубки — под цилиндр.', что:'трубка'},
    {т:'Дождись конца реакции и сними показание.',                      что:'ждать'},
    {т:'Рассчитай объём водорода и сравни с опытом.',                   что:'расчёт'}
  ];
  const ЛОТОК2 = [['штатив','Штатив'],['кристаллизатор','Кристаллизатор'],['цинк','Цинк'],['кислота','HCl'],['спиртовка','Спиртовка'],['весы','Весы'],['колба','Колба'],['очки','Очки']];
  const МАРАФОН = [
    {q:'Какой объём занимают 2 моль кислорода при н. у.?', вар:['11,2 л','22,4 л','44,8 л'], в:2, р:'22,4 · 2 = 44,8 л.'},
    {q:'Сколько моль в 11,2 л азота (н. у.)?', вар:['0,5 моль','2 моль','11,2 моль'], в:0, р:'11,2 : 22,4 = 0,5 моль.'},
    {q:'1 моль водорода и 1 моль CO₂ при н. у. занимают…', вар:['разные объёмы','одинаковый объём','объём зависит от массы'], в:1, р:'Закон Авогадро: по 22,4 л.'},
    {q:'Масса 22,4 л кислорода при н. у.?', вар:['16 г','32 г','22,4 г'], в:1, р:'1 моль O₂ — 32 г.'},
    {q:'Что такое нормальные условия?', вар:['20 °C и 100 кПа','0 °C и 101,3 кПа','100 °C и 1 атм'], в:1, р:'Н. у.: 0 °C (273 К) и 101,3 кПа.'},
    {q:'Какой объём займут 0,1 моль CO₂ (н. у.)?', вар:['2,24 л','22,4 л','0,224 л'], в:0, р:'22,4 · 0,1 = 2,24 л.'},
    {q:'Масса 5,6 л водорода (н. у.)?', вар:['0,5 г','1 г','2 г'], в:0, р:'5,6 : 22,4 = 0,25 моль; 0,25 · 2 = 0,5 г.'},
    {q:'Сколько литров H₂ даст 1 моль цинка (Zn + 2HCl → ZnCl₂ + H₂)?', вар:['11,2 л','22,4 л','44,8 л'], в:1, р:'1 моль Zn → 1 моль H₂ → 22,4 л.'},
    {q:'Почему объём газа не зависит от вида молекул?', вар:['молекулы газа одинаковые','расстояния между молекулами много больше их размеров','газ ничего не весит'], в:1, р:'Объём газа — это в основном «пустота» между молекулами.'},
    {q:'Сколько моль в 67,2 л газа (н. у.)?', вар:['2 моль','3 моль','6,72 моль'], в:1, р:'67,2 : 22,4 = 3 моль.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const ч = (v) => String(Math.round(v*1000)/1000).replace('.',',');
  const ИМЯР = {H2:'водорода',O2:'кислорода',CO2:'углекислого газа',N2:'азота',CH4:'метана',NH3:'аммиака',He:'гелия',Cl2:'хлора'};
  const ФОР = {H2:'H₂',O2:'O₂',CO2:'CO₂',N2:'N₂',CH4:'CH₄',NH3:'NH₃',He:'He',Cl2:'Cl₂'};
  const MМ = {H2:2,O2:32,CO2:44,N2:28,CH4:16,NH3:17,He:4,Cl2:71};
  const П1 = поМесту([['O2',2],['H2',0.5],['N2',3],['CO2',0.1],['CH4',4],['He',0.25],['NH3',1.5],['Cl2',0.2],['O2',5],['H2',10],['N2',0.5],['CO2',2],['CH4',0.01],['He',3],['NH3',0.4],['Cl2',1]]
    .map(([г,n])=>{ const V=22.4*n, н=22.4/n; return {q:'Какой объём займут '+ч(n)+' моль '+ИМЯР[г]+' при н. у.?', г:г, n:n, V:V, ок:ч(V)+' л', нет:ч(Math.abs(н-V)<0.001?V*2:н)+' л', раз:'V = Vm · n = 22,4 · '+ч(n)+' = '+ч(V)+' л. Вид газа неважен.'}; }));
  const П2 = поМесту([[44.8,'O2'],[11.2,'N2'],[5.6,'H2'],[67.2,'CO2'],[2.24,'He'],[112,'CH4'],[33.6,'NH3'],[4.48,'Cl2'],[22.4,'O2'],[1.12,'H2'],[89.6,'N2'],[0.224,'CO2'],[16.8,'He'],[6.72,'CH4'],[8.96,'NH3'],[56,'Cl2']]
    .map(([V,г])=>{ const n=V/22.4, н=22.4/V; return {q:'Сколько моль в '+ч(V)+' л '+ИМЯР[г]+' (н. у.)?', г:г, V:V, n:n, ок:ч(n)+' моль', нет:ч(Math.abs(н-n)<0.001?n*2:н)+' моль', раз:'n = V : Vm = '+ч(V)+' : 22,4 = '+ч(n)+' моль.'}; }));
  const П3 = поМесту([[22.4,'O2'],[11.2,'H2'],[44.8,'N2'],[5.6,'CO2'],[2.24,'CH4'],[33.6,'He'],[11.2,'NH3'],[4.48,'Cl2'],[67.2,'H2'],[1.12,'O2'],[22.4,'CO2'],[5.6,'N2'],[44.8,'CH4'],[11.2,'He'],[2.24,'NH3'],[22.4,'Cl2']]
    .map(([V,г])=>{ const n=V/22.4, m=n*MМ[г], н=V*MМ[г]; return {q:'Какова масса '+ч(V)+' л '+ИМЯР[г]+' ('+ФОР[г]+', M = '+MМ[г]+' г/моль) при н. у.?', г:г, V:V, m:m, ок:ч(m)+' г', нет:ч(н)+' г', раз:'n = '+ч(V)+' : 22,4 = '+ч(n)+' моль; m = n · M = '+ч(n)+' · '+MМ[г]+' = '+ч(m)+' г.'}; }));

  const CSS=`
  #lvis .s6.l42n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l42n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l42n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l42n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l42n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l42n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l42n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l42n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l42n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l42n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l42n table.итоги td{white-space:normal!important}
  #lvis .s6.l42n table.итоги td:first-child{width:46%}
  #lvis .s6.l42n table.итоги{table-layout:fixed}
  #lvis .s6.l42n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l42n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l42n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l42n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l42n .ask button{text-align:left}
  #lvis .s6.l42n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l42n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l42n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l42n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l42n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l42n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l42n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l42n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l42n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l42n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l42n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l42n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l42n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l42n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l42n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l42n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l42n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l42n .плитка span{text-align:center}
  #lvis .s6.l42n .плитка:active{transform:scale(.96)}
  #lvis .s6.l42n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l42n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l42n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l42n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l42n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l42n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l42n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l42n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l42n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l42n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l42n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l42n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l42n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l42n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l42n{gap:14px}
  #lvis .s6.l42n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l42n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l42n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l42n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l42n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l42n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l42n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l42n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l42n .карт .текст b{color:${GOLD}}
  #lvis .s6.l42n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l42n .правило b{color:${GOLD}}
  #lvis .s6.l42n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l42n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l42n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l42n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l42n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l42n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l42n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l42n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l42n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l42n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l42n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l42n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l42n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l42n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l42n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l42n .буйки button.мимо{border-color:${RED};animation:l42nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l42nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l42n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l42n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l42n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l42n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l42n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l42n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l42n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l42n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l42n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l42n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l42n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l42n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l42n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l42n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l42n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l42n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l42n .уровни .точка.сейчас{background:${GOLD};animation:l42ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l42ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l42n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l42n{-webkit-text-size-adjust:100%}
  #lvis .s6.l42n [data-anim]{animation:l42nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l42nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l42n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l42n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l42n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l42n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l42n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l42n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l42n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l42n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l42n [data-anim]{animation:none!important}
    #lvis .s6.l42n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l42n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l42n-style');
      if(!s){ s=document.createElement('style'); s.id='l42n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r42Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c42-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c42-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c42-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c42-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c42-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c42-плиты)"/>
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
  const ФОРМ = (html,метка0) => A(5,'карт','<span class="метка">'+(метка0||'Формула')+'</span><div class="текст" style="font-size:22px;text-align:center;font-family:\'Helvetica Neue\',Arial,sans-serif">'+html+'</div>');
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки) => `<div class="лоток" data-anim style="--i:4">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  const нуПанель = (x,y) => { const Л=L_(); return Л.циферблат(x,y,18,.5,'давление','101,3 кПа')+Л.циферблат(x+48,y,18,.25,'температура','0 °C'); };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=240, y0=182, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.анВесы(56,y0+14,90,{показ:''}) + Л.шарКолба(56,Л.анВерх(y0+14,90),0.46,{}) + Л.баллон(130,y0+14,0.7,'H2') + Л.баллон(162,y0+14,0.7,'O2') + Л.баллон(194,y0+14,0.7,'CO2') +
      Л.кристаллизатор(280,y0+14,76,30,{внутри:Л.цилиндрВверхДном(280,y0+8,20,110,0,250)});
    const поверх = метка(96,16,'Молярный объём газов',ЗЛ,{кегль:12}) + нуПанель(222,40) + Л.имяПрибора(56,y0+30,'аналит. весы')+Л.имяПрибора(162,y0+30,'баллоны')+Л.имяПрибора(280,y0+30,'сбор газа');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Газы: молярный объём') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r42вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок — особенно «Безопасность»: водород горюч.') :
        ОТВЕТЫ('',['0 °C и 101,3 кПа','20 °C и 100 кПа'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что такое нормальные условия (н. у.)?') :
          РАЗБОР(ок,['Верно: 0 °C (273 К) и давление 101,3 кПа (1 атм).','20 °C — это «комнатные» условия. Нормальные: <b>0 °C и 101,3 кПа</b>.'][в]))) +
      (ок ? ПРАВИЛО('Объёмы газов сравнивают при одинаковых условиях. Стандарт — <b>н. у.: 0 °C, 101,3 кПа</b>.') : '');
  }

  /* 2. Микромир: твёрдое, жидкое, газ */
  function F2(s){
    const Н=230, y0=190, Л=L_(), к=s.агр2==null?0:s.агр2, вид=s.вида2||{0:true}, все=[0,1,2].every(i=>вид[i]), в=s.ответ2, ок=в===0;
    const лупа = (cx,cy,r,тип) => { const кл='c42-агр'+тип; let t='';
      if(тип===0){ for(let i=-3;i<=3;i++) for(let j=-4;j<=4;j++) t+=`<g transform="translate(${cx+i*r*0.42+(j%2?r*0.21:0)} ${cy+j*r*0.24})">${Л.молекула(0,0,0.5,'H2O',{})}</g>`; }
      else if(тип===1){ for(let k=0;k<26;k++) t+=`<g transform="translate(${cx+((k*37)%100-50)/100*r*1.7} ${cy+((k*53)%100-50)/100*r*1.7}) rotate(${k*47})">${Л.молекула(0,0,0.5,'H2O',{})}${Л.ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${k%3-1} ${k%2};0 0" dur="${0.6+(k%4)*0.2}s" repeatCount="indefinite" additive="sum"/>`:''}</g>`; }
      else { for(let k=0;k<5;k++) t+=`<g transform="translate(${cx+((k*41)%100-50)/100*r*1.5} ${cy+((k*67)%100-50)/100*r*1.5})"><g>${Л.ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${(k%2?1:-1)*r*0.3} ${(k%3-1)*r*0.25};0 0" dur="${1.2+k*0.3}s" repeatCount="indefinite"/>`:''}${Л.молекула(0,0,0.75,'H2O',{})}</g></g>`; }
      return `<clipPath id="${кл}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="#0e1a24"/><g clip-path="url(#${кл})">${t}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#рл-сталь)" stroke-width="${r*0.1}"/>`; };
    const пр = к===0 ? Л.часовое(168,y0+14,70,'соль',8) : к===1 ? Л.стакан(168,y0+14,56,64,{уровень:.4,объём:100}) : Л.колба(168,y0+14,0.8,{уровень:0,пробка:true});
    const поверх = лупа(168,86,62,к) + метка(168,16,['лёд: молекулы вплотную, в решётке','вода: вплотную, но подвижны','пар: далеко друг от друга, летают'][к],[СН,ЗЕ,ЗЛ][к],{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Почему газы особенные') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(3,minmax(0,1fr))">${['лёд','вода','пар'].map((x,i)=>BTN(3,к===i?'вкл':'',x,'r42агр('+i+')')).join('')}</div>` +
      ТЕОРИЯ('газ','В газе расстояния между молекулами <b>в десятки раз больше</b> самих молекул. Поэтому объём газа почти целиком — «пустота», и он зависит от <b>числа молекул</b>, а не от их размера и массы.') +
      (все ? ДИВО('18 г воды — это 18 мл, столовая ложка. А 18 г водяного пара при н. у. заняли бы <b>22,4 л</b> — в 1244 раза больше! Молекулы те же, только разлетелись.') : '') +
      (!все ? СКАЗ('Сравни','Посмотри в лупу на лёд, воду и пар.') :
        ОТВЕТЫ('',['от числа молекул','от размера и массы молекул'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','От чего в основном зависит объём газа?') :
          РАЗБОР(ок,['Верно: молекулы газа далеко друг от друга, и их собственный размер почти не важен.','Размер молекул в газе почти не влияет: между ними огромные промежутки. Важно <b>число молекул</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Закон Авогадро</b> (1811): в равных объёмах разных газов при одинаковых условиях содержится <b>одинаковое число молекул</b>.') : '');
  }

  /* 3. Опыт 1: взвешиваем литр газа */
  function F3(s){
    const Н=250, y0=190, Л=L_(), ш=Math.min(s.о1||0,ШАГИ1.length), отз=s.о1отз, таб=s.таб1||{}, тек=s.газ1, готово=ш>=ШАГИ1.length;
    const ч0=Л.анВерх(y0+14,120);
    const показ = ш<3?'':ш===3?'142.518':(тек?ГАЗЫ.find(x=>x.к===тек).пок:'0.000');
    const пр = (ш>=1?Л.анВесы(92,y0+14,120,{показ:показ}):'') + (ш>=3?Л.шарКолба(92,ч0,0.56,{газ:тек||(ш>=2?null:'воздух'),открыт:!!тек}):ш===2?Л.шарКолба(92,y0+14,0.56,{газ:'воздух'}):'') +
      (ш===2?Л.насос(40,y0+14,0.8):'') + Л.баллон(206,y0+14,0.78,'H2') + Л.баллон(248,y0+14,0.78,'O2') + Л.баллон(290,y0+14,0.78,'CO2');
    const поверх = (ш===0?метка(150,Н/2-50,'начни с лотка приборов',null,{кегль:11}):'') + (ш>=4?нуПанель(210,40):'') +
      (тек?метка(92,16,'1 л '+ГАЗЫ.find(x=>x.к===тек).ф+' = '+чис(ГАЗЫ.find(x=>x.к===тек).пок)+' г',ЗЕ,{кегль:12}):'');
    const ДЕЙ=ШАГИ1[Math.min(ш,ШАГИ1.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='TARE') кнопки=`<div class="ask">${BTN(5,'','Нажать TARE',"r42о1('TARE')")}</div>`;
      if(ДЕЙ==='деление') кнопки=`<div class="ask три">${['1,43 л','22,4 л','45,7 л'].map((t0,j)=>BTN(5+j,'',t0,"r42о1('д"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК1.forEach(([что])=>{ const i=ШАГИ1.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; if(/^бал/.test(что)&&таб[что.slice(3)]) отм[что]='done'; });
    const таблица = '<table class="итоги"><tr><th>Газ</th><th>M</th><th>1 л, г</th><th>M : ρ</th></tr>'+ГАЗЫ.map(g=>таб[g.к]?`<tr><td>${g.ф}</td><td>${g.M}</td><td>${чис(g.пок)}</td><td>${ш>=ШАГИ1.length?чис((g.M/g.ρ).toFixed(1))+' л':'?'}</td></tr>`:`<tr class="пусто"><td>${g.ф}</td><td>${g.M}</td><td>—</td><td>—</td></tr>`).join('')+'</table>';
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1 · шаг '+Math.min(ш+1,ШАГИ1.length)+' из '+ШАГИ1.length,'Взвешиваем литр газа') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ1[ш].т+(ДЕЙ==='деление'?'<br><b>32 : 1,429 = ?</b> (для кислорода)':'')+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК1,'r42о1',отм)) +
      A(8,'карт','<span class="метка">Журнал измерений (н. у.)</span>'+таблица) +
      СПИСОК('Ход опыта',ШАГИ1.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('молярный объём','У всех трёх газов M : ρ ≈ <b>22,4 л/моль</b> — 1 моль любого газа при н. у. занимает 22,4 л. Это <b>молярный объём</b> Vm. Мы не взяли число из учебника, а получили его сами — на весах.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r42о1сброс()")}</div>` : '');
  }

  /* 4. Молярный объём: куб 22,4 л */
  function F4(s){
    const Н=250, y0=200, Л=L_(), к=s.к4==null?1:s.к4, вид=s.видк4||{1:true}, все=Object.keys(вид).length>=3, в=s.ответ4, ок=в===0;
    const Г=[{к:'H2',ф:'H₂',M:2},{к:'O2',ф:'O₂',M:32},{к:'CO2',ф:'CO₂',M:44},{к:'N2',ф:'N₂',M:28}][к];
    const пр = Л.мячБ(232,y0-2,16) + Л.склянка(292,y0+14,30,60,{уровень:.7,этикетка:['1,5 л']});
    const поверх = Л.куб(30,y0+14,130,Г.к,'ребро 28,2 см') + нуПанель(252,40) + метка(100,16,'1 моль '+Г.ф+' = 22,4 л = '+Г.M+' г',ЗЕ,{кегль:12}) +
      Л.имяПрибора(232,y0+30,'мяч ≈ 7 л') + Л.имяПрибора(292,y0+30,'бутылка 1,5 л');
    return ЖУРНАЛ(s) + ШАПКА('Молярный объём','Сколько места у 1 моль газа') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${['H₂','O₂','CO₂','N₂'].map((x,i)=>BTN(3,к===i?'вкл':'',x,'r42к('+i+')')).join('')}</div>` +
      ФОРМ('Vm = V : n = 22,4 л/моль<br><span style="font-size:16px;color:#9aa3ad">при н. у.: 0 °C, 101,3 кПа</span>') +
      ДИВО('22,4 л — это куб с ребром 28,2 см: примерно три баскетбольных мяча или 15 полуторалитровых бутылок. При комнатной температуре (20 °C) газ расширяется, и моль занимает уже около <b>24 л</b>.') +
      (!все ? СКАЗ('Выбери газ','Посмотри на куб с разными газами: объём один, масса разная.') :
        ОТВЕТЫ('',['22,4 л — у любого газа','зависит от газа'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Какой объём занимает 1 моль газа при н. у.?') :
          РАЗБОР(ок,['Верно: и водород, и углекислый газ — по 22,4 л. А массы разные: 2 г и 44 г.','Объём одинаковый — это и есть закон Авогадро. Разная только <b>масса</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>V = Vm · n</b>, <b>n = V : Vm</b>, Vm = 22,4 л/моль (н. у.).') : '');
  }

  /* 5. Опыт 2: водород из цинка */
  function F5(s){
    const Н=260, y0=204, Л=L_(), ш=Math.min(s.о2||0,ШАГИ2.length), отз=s.о2отз, готово=ш>=ШАГИ2.length;
    const мл = ш>=7?224:ш===6?(s.о2идёт?120:0):0, идёт=ш===6&&s.о2идёт;
    const цилX=270, цилНиз=y0+8;
    const пр = (ш>=1?Л.штатив(104,y0+14,170,y0-70,50):'') +
      (ш>=2?Л.кристаллизатор(270,y0+14,96,36,{внутри:ш>=3?Л.цилиндрВверхДном(цилX,цилНиз,26,176,мл,250):''}):'') +
      (ш>=1?Л.пробирка(156,y0-18,0.95,{уровень:ш>=5?0.34:0,цвет:'hsla(60,20%,90%,.4)',угол:0}):'') +
      (ш>=4?`<g>${Л.кристаллы(156,y0-24,8,5,'железо',ш>=7?4:10,3)}</g>`:'') +
      (ш>=5&&ш<7&&(ш<6||идёт)?Л.пузыри(156,y0-24,y0-48,8):'') +
      (ш>=6?`<path d="M150 ${y0-104} h12 l-1.5 10 h-9 Z" fill="#8a3a2a"/>`+Л.трубка(`M156 ${y0-104} V${y0-122} Q156 ${y0-132} 170 ${y0-132} H212 Q222 ${y0-132} 222 ${y0-120} V${y0} Q222 ${y0+6} 230 ${y0+6} H${цилX-8} Q${цилX-2} ${y0+6} ${цилX-2} ${y0}`):'') +
      (идёт?Л.пузыри(цилX-4,y0-2,цилНиз-176+4+(176-8)*мл/250,6):'');
    const поверх = (ш===0?метка(168,Н/2-50,'соберём прибор для получения газа',null,{кегль:11}):'') +
      (ш>=5?метка(150,16,'Zn + 2HCl → ZnCl₂ + H₂↑',СН,{кегль:12}):'') + (ш>=6?метка(196,46,'газа: '+мл+' мл',мл===224?ЗЕ:ЗЛ,{кегль:11}):'') +
      (ш>=6?нуПанель(26,58):'');
    const ДЕЙ=ШАГИ2[Math.min(ш,ШАГИ2.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='перевернуть') кнопки=`<div class="ask">${BTN(5,'','Наполнить цилиндр и перевернуть',"r42о2('перевернуть')")}</div>`;
      if(ДЕЙ==='трубка') кнопки=`<div class="ask">${BTN(5,'','Закрыть пробкой, трубку под цилиндр',"r42о2('трубка')")}</div>`;
      if(ДЕЙ==='ждать') кнопки=`<div class="ask">${BTN(5,'',s.о2идёт?'Реакция закончилась — снять показание':'Наблюдать реакцию',"r42о2('ждать')")}</div>`;
      if(ДЕЙ==='расчёт') кнопки=`<div class="ask три">${['22,4 мл','224 мл','2240 мл'].map((t0,j)=>BTN(5+j,'',t0,"r42о2('р"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК2.forEach(([что])=>{ const i=ШАГИ2.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2 · шаг '+Math.min(ш+1,ШАГИ2.length)+' из '+ШАГИ2.length,'Сколько водорода даст цинк') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача'+(ДЕЙ==='кислота'?' опасно':''),'<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ2[ш].т+(ДЕЙ==='расчёт'?'<br>n(Zn) = 0,65 : 65 = 0,01 моль → n(H₂) = 0,01 моль → V = ?':'')+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК2,'r42о2',отм)) +
      СПИСОК('Ход опыта',ШАГИ2.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('вывод опыта 2','0,65 г цинка — это 0,01 моль. По уравнению 1 моль Zn даёт 1 моль H₂, значит, водорода 0,01 моль, и при н. у. он займёт <b>0,01 · 22,4 = 0,224 л = 224 мл</b>. Опыт совпал с расчётом. Газ собирали <b>вытеснением воды</b>: водород почти не растворяется в воде.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r42о2сброс()")}</div>` : '');
  }

  /* 6. Треугольник формул */
  function F6(s){
    const Н=210, y0=176, Л=L_(), к=s.т6==null?0:s.т6, в=s.ответ6, ок=в===0;
    const Ф=[['V','Vm · n','объём = молярный объём × количество'],['n','V : Vm','количество = объём : 22,4'],['m','n · M','масса = количество × молярная масса']][к];
    const тр = `<path d="M110 22 L178 132 H42 Z" fill="rgba(12,14,18,.85)" stroke="#6a7480" stroke-width="1.2"/><path d="M70 88 H150 M110 88 V132" stroke="#8a939b" stroke-width="1.6"/>
      <text x="110" y="74" text-anchor="middle" font-size="26" font-weight="bold" font-style="italic" fill="#8fe0b0" font-family="Georgia,serif" opacity="${к===0?0.25:1}">V</text>
      <text x="80" y="122" text-anchor="middle" font-size="22" font-weight="bold" font-style="italic" fill="#7fb8ff" font-family="Georgia,serif">Vm</text>
      <text x="140" y="122" text-anchor="middle" font-size="24" font-weight="bold" font-style="italic" fill="#ff8a6a" font-family="Georgia,serif" opacity="${к===1?0.25:1}">n</text>`;
    const пр = Л.баллон(240,y0+14,0.7,'O2') + Л.шарКолба(296,y0+14,0.5,{газ:'O2'});
    return ЖУРНАЛ(s) + ШАПКА('Расчёты','Формулы для газов') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,тр+метка(250,18,Ф[0]+' = '+Ф[1],ЗЛ,{кегль:14})),Н)}</div>` +
      `<div class="ask три">${['найти V','найти n','найти m'].map((t0,i)=>BTN(3+i,к===i?'hit':'',t0,'r42т('+i+')')).join('')}</div>` +
      ФОРМ(Ф[0]+' = '+Ф[1]+'<br><span style="font-size:16px;color:#9aa3ad">'+Ф[2]+'</span>') +
      A(6,'карт','<span class="метка">Пример</span><div class="текст">Какую массу имеют 5,6 л кислорода (н. у.)?<br>n = 5,6 : 22,4 = <b>0,25 моль</b>; m = 0,25 · 32 = <b>8 г</b>.</div>') +
      ОТВЕТЫ('пара',['33,6 л','15 л'],0,в,6) +
      (в==null ? СКАЗ('Вопрос','Какой объём займут 1,5 моль азота при н. у.?') :
        РАЗБОР(ок,['Верно: 22,4 · 1,5 = 33,6 л.','22,4 : 1,5 ≈ 15 — делили вместо умножения. V = Vm · n = 22,4 · 1,5 = <b>33,6 л</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>V = 22,4 · n</b> · <b>n = V : 22,4</b> · <b>m = n · M</b> (для газов при н. у.).') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=210, y0=176, Л=L_();
    const пр = Л.баллон(40,y0+14,0.7,'H2') + Л.баллон(76,y0+14,0.7,'O2') + Л.баллон(112,y0+14,0.7,'CO2');
    const поверх = Л.куб(150,y0+14,110,'O2','22,4 л') + нуПанель(40,52) + метка(90,8,'1 моль газа = 22,4 л',ЗЕ,{кегль:12});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• В газе молекулы далеко друг от друга — объём зависит от их <b>числа</b>.<br>• <b>Закон Авогадро</b>: равные объёмы газов при одинаковых условиях — равное число молекул.<br>• При <b>н. у.</b> (0 °C, 101,3 кПа) 1 моль любого газа = <b>22,4 л</b>.<br>• <b>V = 22,4 · n</b>, <b>n = V : 22,4</b>, <b>m = n · M</b>.<br>• Газы, плохо растворимые в воде, собирают вытеснением воды.</div>') +
      ПРАВИЛО('<b>Один моль любого газа при н. у. — 22,4 л. Разная только масса.</b>');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.шарКолба(222+i*42,y0+14,0.44,{газ:i<3-ош?['H2','O2','CO2'][i]:null})).join('') + Л.анВесы(84,y0+14,96,{показ:'1.429'});
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(84,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(264,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Объёмы газов ты считаешь уверенно.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r42заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r42мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. V = 22,4 · n; n = V : 22,4; m = n · M.')) : '')) +
      (все ? ПРАВИЛО('<b>Vm = 22,4 л/моль</b> (н. у.)') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Объём 1 моль газа при н. у.?', варианты:[{т:'22,4 л',ок:true},{т:'1 л',ок:false}], разбор:'Молярный объём — 22,4 л/моль.' },
    { вопрос:'Объём 2 моль водорода (н. у.)?', варианты:[{т:'11,2 л',ок:false},{т:'44,8 л',ок:true}], разбор:'22,4 · 2 = 44,8 л.' },
    { вопрос:'Сколько моль в 11,2 л газа (н. у.)?', варианты:[{т:'0,5 моль',ок:true},{т:'2 моль',ок:false}], разбор:'11,2 : 22,4 = 0,5.' },
    { вопрос:'Масса 22,4 л углекислого газа?', варианты:[{т:'22,4 г',ок:false},{т:'44 г',ок:true}], разбор:'1 моль CO₂ = 44 г.' },
    { вопрос:'Равные объёмы разных газов при одинаковых условиях содержат…', варианты:[{т:'равное число молекул',ок:true},{т:'равную массу',ок:false}], разбор:'Закон Авогадро.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r42Reset()")}</div>` +
        ПРАВИЛО('<b>V = 22,4 · n</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r42Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const БАЛ = {H2:'H2',O2:'O2',CO2:'CO2',N2:'N2',CH4:'CO2',NH3:'N2',He:'He',Cl2:'N2'};
  const Т = {
    т1:{ имя:'Объём по количеству', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.баллон(60,y0+14,0.7,БАЛ[з.г]),Л.куб(130,y0+2,Math.min(92,36+з.n*16),з.г,отв?з.ок:'V = ?')+метка(70,12,ч(з.n)+' моль '+ФОР[з.г],ЗЛ,{кегль:12})+(ст.серия>=3?метка(290,12,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Количество по объёму', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.баллон(60,y0+14,0.7,БАЛ[з.г])+Л.кристаллизатор(250,y0+14,90,32,{внутри:Л.цилиндрВверхДном(250,y0+8,24,120,120,250)}),метка(120,12,ч(з.V)+' л '+ФОР[з.г]+(отв?' → '+з.ок:''),СН,{кегль:12})+(ст.серия>=3?метка(290,44,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Масса газа', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.анВесы(110,y0+14,110,{показ:отв?з.m.toFixed(3):'0.000'})+Л.шарКолба(110,Л.анВерх(y0+14,110),0.5,{газ:['H2','O2','CO2'].includes(з.г)?з.г:'воздух'})+Л.баллон(260,y0+14,0.7,БАЛ[з.г]),метка(200,12,ч(з.V)+' л '+ФОР[з.г]+', M = '+MМ[з.г],КР,{кегль:11})+(ст.серия>=3?метка(60,44,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие газы.':'В новом круге газы другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r42Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r42T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r42TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L42 = {
    id: ID, title: 'Газы: молярный объём', ico: '🎈',
    src: 'Химия · 5–6 класс · Газы', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Микромир: лёд, вода, пар — почему газы особенные.',
      'Опыт 1: взвешиваем литр трёх газов, выводим 22,4 л.',
      'Молярный объём: куб 22,4 л.',
      'Опыт 2: водород из цинка, сбор над водой.',
      'Расчёты: V = 22,4 · n.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: объём по количеству.',
      'Тренажёр 2: количество по объёму.',
      'Тренажёр 3: масса газа.'
    ],
    check: { q: 'Какой объём занимает 1 моль газа при нормальных условиях? (в л)', choices: ['22,4','11,2','44,8','24'], ans: 0, exp: 'Молярный объём газа при н. у. — 22,4 л.' },
    tasks: [
      { q: 'Какой объём займут 2 моль газа при н. у.? (в л)', kind: 'unit', ans: 44.8, tol: 0.05, hints: ['V = 22,4 · n.', '22,4 · 2 = 44,8.'], sol: 'V = 22,4 · 2 = 44,8 л.' },
      { q: 'Какой объём займут 0,5 моль газа при н. у.? (в л)', kind: 'unit', ans: 11.2, tol: 0.05, hints: ['22,4 · 0,5.', '11,2.'], sol: 'V = 22,4 · 0,5 = 11,2 л.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.анВесы){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L42.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Микромир',3:'Опыт 1',4:'Молярный объём',5:'Опыт 2',6:'Расчёты',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l42n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Молярный объём'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r42Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r42вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r42агр=(i)=>{ const s=S(); s.агр2=i; const в=Object.assign({0:true},s.вида2||{}); в[i]=true; s.вида2=в; chRender(0); };
  window.r42к=(i)=>{ const s=S(); s.к4=i; const в=Object.assign({1:true},s.видк4||{}); в[i]=true; s.видк4=в; chRender(0); };
  window.r42т=(i)=>{ const s=S(); s.т6=i; chRender(0); };
  const ИМЯ = {анВесы:'аналитические весы',насос:'насос',шарКолба:'шар',балH2:'баллон водорода',балO2:'баллон кислорода',балCO2:'баллон углекислого газа',весы:'технические весы',цилиндр:'цилиндр',
    штатив:'штатив',кристаллизатор:'кристаллизатор',цинк:'цинк',кислота:'кислоту',спиртовка:'спиртовку',колба:'колбу',очки:'очки'};
  window.r42о1=(что)=>{ const s=S(); const ш=s.о1||0; if(ш>=ШАГИ1.length) return; const нужно=ШАГИ1[ш].что;
    const вперёд=(т)=>{ s.о1=ш+1; s.о1отз={ок:true,т:т}; if(s.о1>=ШАГИ1.length) s.дело_авогадро=true; chRender(0); };
    if(что===нужно&&['анВесы','насос','шарКолба','TARE'].includes(нужно))
      return вперёд({анВесы:'Аналитические весы на столе. Дверцы бокса закрывают при взвешивании — сквозняк мешает точности.',насос:'Воздух откачан: в шаре почти пусто, кран закрыт.',шарКолба:'Пустой шар на весах: 142,518 г — это масса стекла.',TARE:'TARE: масса шара вычтена, 0,000 г.'}[нужно]);
    if(нужно==='шарКолба'&&что==='насос'){ s.о1отз={ок:false,т:'Воздух уже откачан. Теперь поставь пустой шар на весы.'}; chRender(0); return; }
    if(нужно==='газы'&&/^бал/.test(что)){ const к=что.slice(3), g=ГАЗЫ.find(x=>x.к===к); const т=Object.assign({},s.таб1||{}); т[к]=true; s.таб1=т; s.газ1=к;
      s.о1отз={ок:true,т:'Открыли кран баллона: шар наполнен при н. у., 1 л '+g.ф+' весит <b>'+чис(g.пок)+' г</b>. Записали в журнал. Перед следующим газом шар снова откачаем.'};
      if(ГАЗЫ.every(x=>т[x.к])){ s.о1=ш+1; }
      chRender(0); return; }
    if(нужно==='газы'&&(что==='шарКолба'||что==='насос')){ s.о1отз={ok:false,ок:false,т:'Шар уже на весах. Выбери баллон с газом.'}; chRender(0); return; }
    if(нужно==='деление'&&/^д\d$/.test(что)){ const j=+что[1]; if(j===1) return вперёд('Верно: 32 : 1,429 ≈ 22,4 л. Проверим остальные: 2 : 0,090 ≈ 22,4 и 44 : 1,964 ≈ 22,4. У всех газов одно и то же!');
      s.о1отз={ок:false,т:j===0?'1,43 — это масса литра. Раздели молярную массу 32 на 1,429.':'Проверь деление: 32 : 1,429 ≈ 22,4.'}; chRender(0); return; }
    if(что==='весы'){ s.о1отз={ок:false,т:'Технические весы (0,1 г) не почувствуют литр водорода — он весит 0,09 г. Нужны аналитические (0,001 г).'}; chRender(0); return; }
    s.о1отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ1[ш].т}; chRender(0); };
  window.r42о1сброс=()=>{ const s=S(); s.о1=0; s.о1отз=null; s.таб1={}; s.газ1=null; chRender(0); };
  window.r42о2=(что)=>{ const s=S(); const ш=s.о2||0; if(ш>=ШАГИ2.length) return; const нужно=ШАГИ2[ш].что;
    const вперёд=(т)=>{ s.о2=ш+1; s.о2отз={ок:true,т:т}; if(s.о2>=ШАГИ2.length) s.дело_водород=true; chRender(0); };
    if(что==='спиртовка'){ s.о2отз={ок:false,т:'Никакого огня! Водород с воздухом образует гремучую смесь. Спиртовку уберём.'}; chRender(0); return; }
    if(что===нужно&&['штатив','кристаллизатор','перевернуть','цинк','кислота','трубка'].includes(нужно))
      return вперёд({штатив:'Пробирка закреплена в лапке штатива — у верхней трети.',кристаллизатор:'Кристаллизатор с водой на столе.',перевернуть:'Цилиндр полон воды и опрокинут: вода не выливается — её держит атмосферное давление.',
        цинк:'В пробирке 0,65 г гранул цинка — это 0,01 моль (65 г/моль).',кислота:'Кислота прилита — пошли пузырьки водорода! Скорее закрывай.',трубка:'Пробка с трубкой на месте, конец трубки под цилиндром.'}[нужно]);
    if(нужно==='ждать'&&что==='ждать'){ if(!s.о2идёт){ s.о2идёт=true; s.о2отз={ок:true,т:'Пузырьки поднимаются в цилиндр и вытесняют воду — уровень воды в цилиндре опускается.'}; chRender(0); return; }
      return вперёд('Цинк растворился, пузырьков нет. Газа в цилиндре — 224 мл (н. у.).'); }
    if(нужно==='расчёт'&&/^р\d$/.test(что)){ const j=+что[1]; if(j===1) return вперёд('Верно: V = 0,01 · 22,4 = 0,224 л = 224 мл — ровно столько, сколько в цилиндре!');
      s.о2отз={ок:false,т:j===0?'22,4 мл — это 0,001 моль. У нас 0,01 моль: 0,01 · 22,4 л = 0,224 л.':'2240 мл = 2,24 л — это 0,1 моль. У нас 0,01 моль.'}; chRender(0); return; }
    if(нужно==='кислота'&&что==='очки'){ s.о2отз={ок:true,т:'Правильно — очки надеты. Теперь прилей кислоту.'}; s.о2очки=true; chRender(0); return; }
    s.о2отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ2[ш].т}; chRender(0); };
  window.r42о2сброс=()=>{ const s=S(); s.о2=0; s.о2отз=null; s.о2идёт=false; chRender(0); };
  window.r42мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r42заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r42Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r42Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r42T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r42TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r42Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L42,{__планПорядок:arr[м].__планПорядок}); else arr.push(L42); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU42={render:render, L:L42};
})();
