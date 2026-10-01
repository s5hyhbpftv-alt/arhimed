/* ============ ХИМИЯ · УРОК 41 · «УРАВНЕНИЯ РЕАКЦИЙ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–40 (манера NOBOOK), по просьбе владельца — «ещё лучшим качеством
   и максимальной детализацией». Карточка 41 из банка подменяется этой записью (VISKW[41]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ): студия, весы, колба с пробкой и вложенной
   пробиркой (опыт Ломоносова–Лавуазье), осадок гидроксида меди, колба с пузырьками и
   раздувающимся шариком, спиртовка, тигельные щипцы с магниевой лентой и вспышкой,
   модели молекул «шары и палочки» (H₂, O₂, H₂O, N₂, NH₃, CH₄, CO₂, Mg, MgO).

   ДЕТАЛИ. Весы с табло до и после реакции; в закрытой колбе масса не меняется, в
   открытой — «теряется» ровно масса улетевшего CO₂ (1,8 г), а с шариком снова сохраняется;
   стрелки ↓ (осадок) и ↑ (газ) в уравнениях; конструктор уравнений со счётчиком атомов
   каждого элемента слева и справа и моделями молекул в нужном количестве; проверка, что
   коэффициенты наименьшие; в опыте с магнием сначала очки и предупреждение не смотреть
   на вспышку; микромир реакции 2H₂ + O₂ → 2H₂O в три стадии (молекулы → атомы → новые
   молекулы) со счётчиком атомов.

   ТЕОРИЯ (8 класс): химическая реакция — превращение одних веществ в другие, атомы не
   исчезают и не появляются, а перегруппировываются; закон сохранения массы веществ
   (М. В. Ломоносов 1748/1756, А. Лавуазье 1789); уравнение реакции: слева реагенты, справа
   продукты; коэффициент — перед формулой, индекс — внутри формулы; коэффициенты
   подбирают так, чтобы атомов каждого элемента слева и справа было поровну, и берут
   наименьшие. Индексы менять нельзя — получится другое вещество. */
(function(){
  'use strict';

  const ID = 41;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'сохранение', имя:'Опыт 1: масса до и после', итог:'m₁ = m₂'},
    {ключ:'уравнять',   имя:'Уравнять 4 реакции',      итог:'4 из 4'},
    {ключ:'марафон',    имя:'Проверка: марафон',       итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Убедиться, что в химической реакции <b>масса веществ сохраняется</b>, и научиться записывать реакции <b>уравнениями</b> с коэффициентами.'],
    ['Принцип','При реакции атомы не исчезают и не появляются — они только <b>перегруппировываются</b> в новые молекулы. Поэтому масса веществ до реакции равна массе после (закон сохранения массы: <b>Ломоносов</b>, 1748; <b>Лавуазье</b>, 1789). В уравнении реакции атомов каждого элемента слева и справа должно быть <b>поровну</b>.'],
    ['Оборудование','<b>Приборы:</b> электронные весы, коническая колба с пробкой, пробирка, колба с воздушным шариком, спиртовка, тигельные щипцы, защитные очки.<br><b>Реактивы:</b> раствор сульфата меди(II) CuSO₄, раствор гидроксида натрия NaOH, питьевая сода, уксус, магниевая лента.'],
    ['Ход работы','1. Взвесить закрытую колбу до и после реакции.<br>2. Повторить в открытой колбе и в колбе с шариком.<br>3. Рассмотреть реакцию в микромире.<br>4. Уравнять четыре реакции.<br>5. Сжечь магний и записать уравнение.'],
    ['Безопасность','Раствор <b>NaOH едкий</b>: работай в перчатках и очках, при попадании на кожу — смыть большим количеством воды. Горящий магний даёт <b>ослепительную вспышку</b>: не смотри прямо, держи ленту щипцами над столом, вдали от лица.']
  ];
  /* состав молекул — для счётчика атомов */
  const СОСТАВ = {H2:{H:2},O2:{O:2},H2O:{H:2,O:1},N2:{N:2},NH3:{N:1,H:3},CH4:{C:1,H:4},CO2:{C:1,O:2},Mg:{Mg:1},MgO:{Mg:1,O:1}};
  const ФОРМ = {H2:'H₂',O2:'O₂',H2O:'H₂O',N2:'N₂',NH3:'NH₃',CH4:'CH₄',CO2:'CO₂',Mg:'Mg',MgO:'MgO'};
  const УРАВНЕНИЯ = [
    {имя:'Горение водорода',  слева:['H2','O2'],   справа:['H2O'],        ответ:[2,1,2]},
    {имя:'Синтез аммиака',    слева:['N2','H2'],   справа:['NH3'],        ответ:[1,3,2]},
    {имя:'Горение метана',    слева:['CH4','O2'],  справа:['CO2','H2O'],  ответ:[1,2,1,2]},
    {имя:'Горение магния',    слева:['Mg','O2'],   справа:['MgO'],        ответ:[2,1,2]}
  ];
  /* опыт 1: закрытая колба */
  const ШАГИ1 = [
    {т:'Поставь на стол электронные весы.', что:'весы'},
    {т:'Включи весы кнопкой ON.', что:'ON'},
    {т:'Поставь на весы колбу: в ней раствор CuSO₄, внутри — пробирка с NaOH; колба закрыта пробкой.', что:'колбаЗ'},
    {т:'Запиши массу до реакции m₁.', что:'m1'},
    {т:'Наклони колбу, чтобы растворы смешались.', что:'наклон'},
    {т:'Что появилось в колбе?', что:'наблюдение'},
    {т:'Запиши массу после реакции m₂.', что:'m2'},
    {т:'Сравни m₁ и m₂.', что:'сравнить'}
  ];
  const ЛОТОК1 = [['весы','Весы'],['колбаЗ','Колба с пробкой'],['пробирка','Пробирка'],['спиртовка','Спиртовка'],['цилиндр','Цилиндр'],['стакан','Стакан'],['шпатель','Шпатель'],['очки','Очки']];
  /* опыт 3: горение магния */
  const ШАГИ3 = [
    {т:'Надень защитные очки.', что:'очки'},
    {т:'Поставь на стол спиртовку.', что:'спиртовка'},
    {т:'Зажги спиртовку (сними колпачок, поднеси спичку).', что:'зажечь'},
    {т:'Возьми магниевую ленту тигельными щипцами.', что:'щипцы'},
    {т:'Внеси ленту в пламя — не смотри прямо на вспышку!', что:'внести'},
    {т:'Что осталось от ленты?', что:'наблюдение'},
    {т:'Расставь коэффициенты: ?Mg + O₂ → ?MgO', что:'уравнение'}
  ];
  const ЛОТОК3 = [['очки','Очки'],['спиртовка','Спиртовка'],['щипцы','Щипцы + Mg'],['весы','Весы'],['колба','Колба'],['пробирка','Пробирка'],['шпатель','Шпатель'],['цилиндр','Цилиндр']];
  const МАРАФОН = [
    {q:'2H₂ + O₂ → ?H₂O. Коэффициент перед водой?', вар:['1','2','4'], в:1, р:'Слева 4 атома H — справа нужно 2 молекулы H₂O.'},
    {q:'N₂ + ?H₂ → 2NH₃. Коэффициент перед водородом?', вар:['2','3','6'], в:1, р:'Справа 2·3 = 6 атомов H, в H₂ по 2 атома: 6 : 2 = 3.'},
    {q:'Что меняют при уравнивании?', вар:['индексы','коэффициенты','формулы'], в:1, р:'Только коэффициенты. Индексы менять нельзя — получится другое вещество.'},
    {q:'Сколько атомов кислорода в 3H₂O?', вар:['1','3','6'], в:1, р:'В каждой молекуле 1 атом O, молекул три.'},
    {q:'В закрытой колбе прошла реакция. Масса…', вар:['увеличилась','уменьшилась','не изменилась'], в:2, р:'Закон сохранения массы: атомы только перегруппировались.'},
    {q:'CH₄ + ?O₂ → CO₂ + 2H₂O. Коэффициент перед O₂?', вар:['1','2','4'], в:1, р:'Справа O: 2 + 2·1 = 4 атома, в O₂ по 2: 4 : 2 = 2.'},
    {q:'Что показывает стрелка ↓ после формулы?', вар:['газ','осадок','нагревание'], в:1, р:'↓ — вещество выпадает в осадок, ↑ — выделяется газ.'},
    {q:'2Mg + O₂ → 2MgO. Сколько атомов Mg справа?', вар:['1','2','4'], в:1, р:'2MgO — две формульные единицы по одному Mg.'},
    {q:'Кто открыл закон сохранения массы?', вар:['Менделеев','Ломоносов и Лавуазье','Авогадро'], в:1, р:'Ломоносов (1748) и независимо Лавуазье (1789).'},
    {q:'4P + ?O₂ → 2P₂O₅. Коэффициент перед O₂?', вар:['5','10','2'], в:0, р:'Справа 2·5 = 10 атомов O, в O₂ по 2: 10 : 2 = 5.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['2H₂ + O₂ → ?H₂O','2','1','4 атома H слева → 2H₂O'],['N₂ + ?H₂ → 2NH₃','3','6','6 атомов H справа, по 2 в H₂'],['?Mg + O₂ → 2MgO','2','1','2 атома Mg справа'],
    ['CH₄ + ?O₂ → CO₂ + 2H₂O','2','3','справа 4 атома O, по 2 в O₂'],['2Na + Cl₂ → ?NaCl','2','1','2 атома Na слева'],['?Al + 3O₂ → 2Al₂O₃','4','2','справа 2·2 = 4 атома Al'],
    ['C + O₂ → ?CO₂','1','2','один атом C — одна молекула CO₂'],['2H₂O₂ → 2H₂O + ?O₂','1','2','слева 4 атома O, в 2H₂O — 2, остаётся 2 = одна O₂'],['Fe + S → ?FeS','1','2','по одному атому Fe и S'],
    ['?Fe + 3Cl₂ → 2FeCl₃','2','3','справа 2 атома Fe'],['Zn + ?HCl → ZnCl₂ + H₂','2','1','справа 2 атома Cl и 2 атома H'],['4P + ?O₂ → 2P₂O₅','5','10','справа 10 атомов O, по 2 в O₂'],
    ['CaCO₃ → CaO + ?CO₂','1','2','углерод один'],['2KClO₃ → 2KCl + ?O₂','3','6','слева 6 атомов O, по 2 в O₂'],['?H₂ + O₂ → 2H₂O','2','4','справа 4 атома H, по 2 в H₂'],['N₂ + O₂ → ?NO','2','1','слева 2 атома N']]
    .map(([у,ок,нет,р])=>({q:'Какой коэффициент вместо «?»: '+у, у:у, ок:ок, нет:нет, раз:'Коэффициент '+ок+': '+р+'.'})));
  const П2 = [['2H₂ + O₂ → 2H₂O',0],['H₂ + O₂ → H₂O',1],['N₂ + 3H₂ → 2NH₃',0],['N₂ + H₂ → 2NH₃',1],['2Mg + O₂ → 2MgO',0],['Mg + O₂ → MgO',1],['CH₄ + 2O₂ → CO₂ + 2H₂O',0],['CH₄ + O₂ → CO₂ + H₂O',1],
    ['2Na + Cl₂ → 2NaCl',0],['Na + Cl₂ → NaCl',1],['C + O₂ → CO₂',0],['4Al + 3O₂ → 2Al₂O₃',0],['Al + O₂ → Al₂O₃',1],['Zn + 2HCl → ZnCl₂ + H₂',0],['Zn + HCl → ZnCl₂ + H₂',1],['2H₂O₂ → 2H₂O + O₂',0]]
    .map(([у,н])=>({q:'Уравнение «'+у+'» уравнено?', у:у, вар:['уравнено','не уравнено'], в:н, раз:н?'Посчитай атомы каждого элемента слева и справа — где-то их не поровну.':'Атомов каждого элемента слева и справа поровну.'}));
  const П3 = поМесту([['3H₂SO₄','O',12,7],['2H₂O','H',4,2],['5O₂','O',10,5],['4NH₃','H',12,7],['2CO₂','O',4,2],['3CH₄','H',12,7],['2Al₂O₃','Al',4,2],['3MgO','O',3,1],
    ['2Fe₂O₃','O',6,5],['4H₂O','O',4,1],['3Cl₂','Cl',6,3],['2NaCl','Na',2,1],['5H₂','H',10,7],['2P₂O₅','P',4,2],['3CaCO₃','O',9,6],['6H₂O','H',12,8]]
    .map(([ф,эл,ок,нет])=>({q:'Сколько атомов '+эл+' в записи «'+ф+'»?', ф:ф, эл:эл, ок:String(ок), нет:String(нет), раз:'Коэффициент умножает всю формулу: '+ф+' → атомов '+эл+': '+ок+'.'})));

  const CSS=`
  #lvis .s6.l41n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l41n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l41n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l41n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l41n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l41n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l41n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l41n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l41n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l41n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l41n table.итоги td{white-space:normal!important}
  #lvis .s6.l41n table.итоги td:first-child{width:46%}
  #lvis .s6.l41n table.итоги{table-layout:fixed}
  #lvis .s6.l41n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l41n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l41n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l41n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l41n .ask button{text-align:left}
  #lvis .s6.l41n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l41n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l41n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l41n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l41n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l41n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l41n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l41n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l41n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l41n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l41n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l41n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l41n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l41n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l41n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l41n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l41n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l41n .плитка span{text-align:center}
  #lvis .s6.l41n .плитка:active{transform:scale(.96)}
  #lvis .s6.l41n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l41n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l41n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l41n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l41n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l41n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l41n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l41n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l41n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l41n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l41n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l41n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l41n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l41n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l41n{gap:14px}
  #lvis .s6.l41n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l41n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l41n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l41n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l41n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l41n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l41n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l41n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l41n .карт .текст b{color:${GOLD}}
  #lvis .s6.l41n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l41n .правило b{color:${GOLD}}
  #lvis .s6.l41n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l41n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l41n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l41n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l41n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l41n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l41n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l41n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l41n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l41n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l41n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l41n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l41n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l41n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l41n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l41n .буйки button.мимо{border-color:${RED};animation:l41nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l41nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l41n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l41n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l41n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l41n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l41n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l41n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l41n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l41n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l41n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l41n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l41n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l41n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l41n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l41n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l41n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l41n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l41n .уровни .точка.сейчас{background:${GOLD};animation:l41ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l41ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l41n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l41n{-webkit-text-size-adjust:100%}
  #lvis .s6.l41n [data-anim]{animation:l41nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l41nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l41n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l41n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l41n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l41n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l41n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l41n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l41n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l41n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l41n [data-anim]{animation:none!important}
    #lvis .s6.l41n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l41n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l41n-style');
      if(!s){ s=document.createElement('style'); s.id='l41n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r41Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Практическая работа</span><b class="${всё?'готово':''}">${
        всё?'реакции уравнены':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c41-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c41-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c41-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c41-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c41-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c41-плиты)"/>
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
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки) => `<div class="лоток" data-anim style="--i:4">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  /* уравнение в строку с коэффициентами (1 не пишут) */
  const уравнение = (у,к,знак) => { const к0=(i)=>к[i]===1?'':к[i]; const л=у.слева.map((x,i)=>к0(i)+ФОРМ[x]).join(' + '), п=у.справа.map((x,i)=>к0(у.слева.length+i)+ФОРМ[x]).join(' + '); return л+' '+(знак||'→')+' '+п; };
  /* ширина модели молекулы при масштабе 1 */
  const ШИР = {H2:30,O2:46,H2O:52,N2:44,NH3:52,CH4:54,CO2:76,Mg:28,MgO:56};
  /* ряд одинаковых молекул: n штук, по 3 в строке */
  const ряд = (вид,n,x0,y,м) => { const Л=L_(), w=ШИР[вид]*м+4, вряд=Math.max(1,Math.min(3,Math.floor(124/w))); let s='';
    for(let i=0;i<n;i++){ const r=Math.floor(i/вряд), c=i%вряд; s+=Л.молекула(x0+c*w+w/2,y+r*34*м,м,вид,{подписи:true}); } return s; };
  /* счёт атомов стороны */
  const счёт = (список,коэф) => { const с={}; список.forEach((x,i)=>{ Object.entries(СОСТАВ[x]).forEach(([e,n])=>{ с[e]=(с[e]||0)+n*коэф[i]; }); }); return с; };
  const нод = (a,b) => b?нод(b,a%b):a;
  /* таблица счётчика атомов */
  const СЧЁТЧИК = (л,п) => { const эл=[...new Set([...Object.keys(л),...Object.keys(п)])];
    return A(5,'карт','<span class="метка">Счётчик атомов</span><table class="итоги счётчик"><tr><th>Элемент</th><th>слева</th><th>справа</th><th></th></tr>'+
      эл.map(e=>{ const ok=(л[e]||0)===(п[e]||0); return `<tr class="${ok?'ок':'нет'}"><td><b>${e}</b></td><td>${л[e]||0}</td><td>${п[e]||0}</td><td>${ok?'✓':'✗'}</td></tr>`; }).join('')+'</table>'); };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка опыта */
  function F1(s){
    const Н=230, y0=172, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ч=Л.весыВерх(y0+14,96);
    const пр = Л.весы(56,y0+14,96,{показ:''}) + Л.колба(56,ч,0.62,{уровень:.4,цвет:Л.цвет('купорос',.12),пробка:true,пробирка:{цвет:'hsla(0,0%,95%,.4)'}}) +
      Л.колба(146,y0+14,0.6,{уровень:.3,цвет:'hsla(40,40%,88%,.45)',шарик:.25}) + Л.спиртовка(214,y0+14,0.8,false) + Л.пробирка(254,y0+14,0.7,{уровень:.35,цвет:'hsla(0,0%,96%,.5)'}) + Л.очки(300,y0+14,0.55);
    const поверх = метка(168,18,'Уравнения реакций и закон сохранения массы',ЗЛ,{кегль:11}) + Л.щипцы(250,104,-12,{}) +
      Л.имяПрибора(56,y0+30,'весы')+Л.имяПрибора(146,y0+30,'колба с шариком')+Л.имяПрибора(214,y0+30,'спиртовка');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Уравнения реакций') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r41вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок — особенно «Безопасность».') :
        ОТВЕТЫ('',['перегруппировываются в новые молекулы','исчезают, а вместо них появляются новые'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что происходит с атомами во время реакции?') :
          РАЗБОР(ок,['Верно: атомы остаются теми же, меняется только то, как они соединены.',
            'Атомы не исчезают и не рождаются — иначе масса менялась бы. Они <b>перегруппировываются</b>.'][в]))) +
      (ок ? ПРАВИЛО('При реакции атомы <b>перегруппировываются</b>: число атомов каждого элемента не меняется.') : '');
  }

  /* 2. Опыт 1: закрытая колба на весах */
  function F2(s){
    const Н=240, y0=182, Л=L_(), ш=Math.min(s.о1||0,ШАГИ1.length), отз=s.о1отз, готово=ш>=ШАГИ1.length;
    const ч=Л.весыВерх(y0+14,130), смешано=ш>=5;
    const пр = (ш>=1?Л.весы(118,y0+14,130,{показ:ш<2?'':ш===2?'0.0':'152.4'}):'') +
      (ш>=3?`<g transform="rotate(${ш===5&&s.о1наклон?-18:0} 118 ${ч})">${Л.колба(118,ч,0.92,{уровень:.4,цвет:Л.цвет('купорос',смешано?.05:.12),пробка:true,пробирка:{цвет:смешано?'hsla(200,40%,80%,.3)':'hsla(0,0%,96%,.5)',наклон:смешано?40:14},осадок:смешано?{цвет:'#5aa8e8',h:7,падает:true}:null})}</g>`:'') +
      Л.банка(262,y0+12,34,50,{содержимое:'купорос',надпись:['CuSO₄','сульфат меди']}) + Л.банка(306,y0+12,26,44,{стекло:'янтарь',надпись:['NaOH'],полоса:'#c8402a'});
    const m1=s.о1m1, m2=s.о1m2;
    const поверх = (ш===0?метка(150,Н/2-40,'стол пуст — возьми прибор из лотка',null,{кегль:11}):'') +
      (m1?метка(270,56,'m₁ = 152,4 г',ЗЛ,{кегль:12}):'') + (m2?метка(270,86,'m₂ = 152,4 г',ЗЕ,{кегль:12}):'') +
      (смешано?метка(168,16,'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',СН,{кегль:10}):'');
    const ДЕЙ=ШАГИ1[Math.min(ш,ШАГИ1.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='ON') кнопки=`<div class="ask">${BTN(5,'','Нажать ON',"r41о1('ON')")}</div>`;
      if(ДЕЙ==='m1') кнопки=`<div class="ask">${BTN(5,'','Записать m₁ = 152,4 г',"r41о1('m1')")}</div>`;
      if(ДЕЙ==='наклон') кнопки=`<div class="ask">${BTN(5,'','Наклонить колбу',"r41о1('наклон')")}</div>`;
      if(ДЕЙ==='наблюдение') кнопки=`<div class="ask три">${['голубой осадок','пузырьки газа','ничего'].map((t0,j)=>BTN(5+j,'',t0,"r41о1('н"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='m2') кнопки=`<div class="ask">${BTN(5,'','Записать m₂',"r41о1('m2')")}</div>`;
      if(ДЕЙ==='сравнить') кнопки=`<div class="ask три">${['m₂ = m₁','m₂ > m₁','m₂ < m₁'].map((t0,j)=>BTN(5+j,'',t0,"r41о1('с"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК1.forEach(([что])=>{ const i=ШАГИ1.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1 · шаг '+Math.min(ш+1,ШАГИ1.length)+' из '+ШАГИ1.length,'Масса до и после реакции') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ1[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК1,'r41о1',отм)) +
      A(8,'карт','<span class="метка">Журнал измерений</span><table class="итоги"><tr><th>Момент</th><th>Масса</th></tr><tr><td>до реакции, m₁</td><td>'+(m1?'152,4 г':'—')+'</td></tr><tr><td>после реакции, m₂</td><td>'+(m2?'152,4 г':'—')+'</td></tr></table>') +
      СПИСОК('Ход опыта',ШАГИ1.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('закон сохранения массы','Масса веществ, вступивших в реакцию, равна массе веществ, образовавшихся в результате её. Открыт <b>М. В. Ломоносовым</b> (1748, опыты 1756) и независимо <b>А. Лавуазье</b> (1789). Выпал голубой осадок Cu(OH)₂ — новое вещество, но атомов меди, серы, кислорода, водорода и натрия ровно столько же.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r41о1сброс()")}</div>` : '');
  }

  /* 3. Опыт 2: открытая колба и колба с шариком */
  function F3(s){
    const Н=240, y0=182, Л=L_(), ст=s.о2||0, в=s.ответ3, ок=в===0, вопр=s.ответ3б;
    const ч=Л.весыВерх(y0+14,120);
    const откр=ст===1, шар=ст>=2;
    const пр = Л.весы(110,y0+14,120,{показ:ст===0?'150.0':откр?'148.2':'150.0'}) +
      Л.колба(110,ч,0.9,{уровень:.34,цвет:'hsla(40,40%,88%,.45)',пузырьки:ст>0,шарик:шар?0.85:null,дуется:шар}) +
      Л.банка(250,y0+12,32,46,{содержимое:'сахар',надпись:['NaHCO₃','сода']}) + Л.склянка(296,y0+14,30,58,{уровень:.5,цвет:'hsla(40,40%,88%,.45)',этикетка:['уксус']});
    const поверх = метка(110,16,ст===0?'сода ещё не всыпана: 150,0 г':откр?'открытая колба: 148,2 г':'колба с шариком: 150,0 г',ст===1?КР:ЗЕ,{кегль:11}) +
      (откр&&Л.ДВИЖ?[0,1,2,3].map(k=>`<circle cx="${110+(k-1.5)*8}" cy="${ч-90}" r="3" fill="none" stroke="#dfe8f0" stroke-width=".8" opacity="0"><animate attributeName="opacity" values="0;.8;0" dur="1.6s" begin="${k*0.4}s" repeatCount="indefinite"/><animate attributeName="cy" values="${ч-90};${ч-150}" dur="1.6s" begin="${k*0.4}s" repeatCount="indefinite"/></circle>`).join('')+метка(200,70,'CO₂↑ уходит в воздух',КР,{кегль:10}):'') +
      (шар?метка(214,70,'CO₂ остался в шарике',ЗЕ,{кегль:10}):'');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Куда «пропадает» масса?') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(3,'карт','<span class="метка">Реакция</span><div class="текст" style="font-size:17px">сода + уксусная кислота → ацетат натрия + вода + <b>углекислый газ↑</b><br><span style="font-size:15px;color:#9aa3ad">NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑</span></div>') +
      (ст===0 ? `<div class="ask">${BTN(4,'','Всыпать соду в открытую колбу',"r41о2()")}</div>` : '') +
      (ст===1 ? ОТВЕТЫ('',['углекислый газ улетел в воздух','часть вещества исчезла'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Масса уменьшилась на 1,8 г. Почему?') :
          РАЗБОР(ок,['Верно: газ CO₂ вышел из колбы и унёс свою массу — 1,8 г. Ничего не исчезло.','Вещества не исчезают. Масса ушла вместе с газом CO₂ — видишь пузырьки?'][в])) +
        (ок ? `<div class="ask">${BTN(6,'','Повторить: надеть на колбу шарик',"r41о2()")}</div>` : '') : '') +
      (ст>=2 ? РАЗБОР(true,'Шарик раздулся — газ пойман, и весы снова показывают 150,0 г. Закон сохранения массы выполняется, если учесть <b>все</b> вещества, и газы тоже.') +
        ДИВО('Лавуазье проводил опыты в запаянных сосудах и взвешивал их до и после нагревания — поэтому масса у него «сходилась», а у предшественников, работавших в открытых сосудах, «пропадала».') : '') +
      (ст>=2 ? ПРАВИЛО('Если масса «пропала» — ищи газ ↑, который ушёл из сосуда. В закрытом сосуде масса веществ до и после реакции одинакова.') : '');
  }

  /* 4. Микромир реакции */
  function F4(s){
    const Н=230, y0=196, Л=L_(), ст=Math.min(s.мм4||0,2), в=s.ответ4, ок=в===0;
    let мол='';
    if(ст===0) мол = Л.молекула(70,70,1.1,'H2',{подписи:true})+Л.молекула(70,130,1.1,'H2',{подписи:true})+Л.молекула(200,100,1.1,'O2',{подписи:true});
    if(ст===1) мол = [[50,60,'H'],[96,82,'H'],[60,140,'H'],[110,150,'H'],[190,80,'O'],[240,130,'O']].map(([x,y,e])=>{ const [c1,c2,r]=Л.АТОМ[e]; return `<g>${Л.ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${(x%7)-3} ${(y%5)-2};0 0" dur="${0.5+(x%4)*0.15}s" repeatCount="indefinite"/>`:''}<circle cx="${x}" cy="${y}" r="${r*1.6}" fill="${c1}" stroke="${c2}" stroke-width="2.4"/><circle cx="${x-r*0.5}" cy="${y-r*0.5}" r="${r*0.5}" fill="#fff" opacity=".55"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="14" font-weight="bold" fill="${e==='H'?'#333':'#fff'}" font-family="Arial">${e}</text></g>`; }).join('') +
      `<path d="M150 40 l6 12 -8 0 8 14" stroke="#ffe86a" stroke-width="2.4" fill="none"/>`;
    if(ст===2) мол = Л.молекула(100,90,1.2,'H2O',{подписи:true})+Л.молекула(230,110,1.2,'H2O',{подписи:true});
    const ПОД=['2H₂ + O₂ — исходные молекулы','связи рвутся — атомы свободны','новые связи — 2H₂O'];
    const поверх = мол + метка(168,14,ПОД[ст],[СН,ЗЛ,ЗЕ][ст],{кегль:12}) + метка(168,Н-50,'H: 4 → 4 · O: 2 → 2',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Что происходит с атомами') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      A(3,'карт','<span class="метка">Стадия '+(ст+1)+' из 3</span><div class="текст">'+['Две молекулы водорода H₂ и одна молекула кислорода O₂.','От искры связи в молекулах рвутся: 4 атома H и 2 атома O свободны.','Атомы соединились по-новому: получились 2 молекулы воды H₂O. Атомов столько же!'][ст]+'</div>') +
      (ст<2 ? `<div class="ask">${BTN(4,'',['Поднести искру →','Дать атомам соединиться →'][ст],"r41мм()")}</div>` :
        ОТВЕТЫ('пара',['4 и 4','2 и 4'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Сколько атомов водорода было и сколько стало?') :
          РАЗБОР(ок,['Верно: 4 атома H было (2 молекулы по 2) и 4 стало (2 молекулы H₂O по 2).','Посчитай: 2H₂ — это 2·2 = 4 атома, и в 2H₂O тоже 2·2 = 4.'][в]))) +
      (ст>=2 ? ДИВО('Смесь водорода с кислородом называют <b>гремучим газом</b>: от искры она взрывается. Поэтому водород перед поджиганием всегда проверяют на чистоту — в школе этот опыт показывает только учитель.') : '') +
      (ок ? ПРАВИЛО('Уравнение <b>2H₂ + O₂ → 2H₂O</b>: <b>коэффициент</b> 2 — число молекул, <b>индекс</b> ₂ — число атомов в молекуле.') : '');
  }

  /* 5. Конструктор уравнений */
  function F5(s){
    const Н=266, y0=242, Л=L_(), к=s.ур5==null?0:s.ур5, реш=s.реш5||{}, У=УРАВНЕНИЯ[к];
    const все=[...У.слева,...У.справа], коэф=(s['к5_'+к]||все.map(()=>1)).slice();
    const л=счёт(У.слева,коэф.slice(0,У.слева.length)), п=счёт(У.справа,коэф.slice(У.слева.length));
    const ровно=Object.keys({...л,...п}).every(e=>(л[e]||0)===(п[e]||0)), наим=коэф.reduce((a,b)=>нод(a,b))===1;
    const м=1;
    const сторона=(список,смещ,x0)=>список.map((вид,i)=>{ const y=список.length===1?90:44+i*96; return `<text x="${x0}" y="${y+7}" text-anchor="end" font-size="22" font-weight="bold" fill="#ffd76a" font-family="'Helvetica Neue',Arial,sans-serif">${коэф[смещ+i]}</text>`+ряд(вид,коэф[смещ+i],x0+4,y,м); }).join('');
    const поверх = сторона(У.слева,0,26) + `<path d="M160 104 H184 M178 98 L186 104 L178 110" stroke="${ровно?'#8fd1a8':'#9aa3ad'}" stroke-width="2.4" fill="none"/>` + сторона(У.справа,У.слева.length,206) +
      метка(168,Н-38,уравнение(У,коэф,ровно?'=':'→'),ровно&&наим?ЗЕ:ровно?ЗЛ:КР,{кегль:13});
    return ЖУРНАЛ(s) + ШАПКА('Конструктор · '+(к+1)+' из 4',У.имя) +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${УРАВНЕНИЯ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(реш[i]?' был0':''),(реш[i]?'✓ ':'')+(i+1),'r41ур('+i+')')).join('')}</div>` +
      `<div class="коэф" data-anim style="--i:4">${все.map((вид,i)=>`<div class="коэф-яч"><button type="button" onclick="r41к(${i},-1)">−</button><b>${коэф[i]}</b><button type="button" onclick="r41к(${i},1)">+</button><span>${ФОРМ[вид]}</span></div>`).join('')}</div>` +
      СЧЁТЧИК(л,п) +
      (ровно&&наим ? РАЗБОР(true,'Уравнено: '+уравнение(У,коэф,'=')+'. Атомов каждого элемента слева и справа поровну, коэффициенты наименьшие.') :
        ровно ? РАЗБОР(false,'Атомы сошлись, но коэффициенты можно сократить — их все можно разделить на '+коэф.reduce((a,b)=>нод(a,b))+'. Берут наименьшие.') :
        СКАЗ('Подсказка','Меняй только коэффициенты (большие цифры). Индексы внутри формулы трогать нельзя — получится другое вещество. Начни с элемента, которого меньше всего.')) +
      (Object.keys(реш).length>=4 ? ПРАВИЛО('<b>Алгоритм:</b> 1) посчитай атомы каждого элемента слева и справа; 2) подбери коэффициенты, начиная с элемента, который встречается реже; 3) кислород и водород — в конце; 4) проверь все элементы и сократи, если можно.') : '');
  }

  /* 6. Опыт 3: горение магния */
  function F6(s){
    const Н=240, y0=182, Л=L_(), ш=Math.min(s.о3||0,ШАГИ3.length), отз=s.о3отз, готово=ш>=ШАГИ3.length;
    const горит=ш>=3, вспышка=ш===5, зола=ш>=5;
    const пр = (ш>=2?Л.спиртовка(150,y0+14,1.1,горит):'') + (ш>=1?'':'') + Л.банка(290,y0+12,32,46,{содержимое:'железо',надпись:['Mg','лента']}) + (зола?Л.часовое(60,y0+14,50,'соль',6):'');
    const поверх = (ш===0?метка(168,Н/2-40,'сначала — защитные очки',КР,{кегль:12}):'') + (ш>=1?Л.очки(40,34,0.6):'') +
      (ш>=4?(вспышка?`<g>${Л.щипцы(110,112,-10,{зола:true})}</g><g>${Л.ДВИЖ?`<animate attributeName="opacity" values="1;1;0" keyTimes="0;.7;1" dur="4s" fill="freeze"/>`:''}${Л.ДВИЖ?Л.щипцы(110,112,-10,{горит:true}):''}</g>`:Л.щипцы(ш>=6?110:40,ш>=6?112:150,ш>=6?-10:-20,{зола:зола})):'') +
      (вспышка&&Л.ДВИЖ?`<rect width="336" height="${Н}" fill="#fff" opacity="0"><animate attributeName="opacity" values=".05;.22;.08;.18;.04;0" dur="3s" fill="freeze"/></rect>`+метка(250,16,'не смотри прямо на вспышку!',КР,{кегль:10}):'') +
      (зола?метка(60,y0-30,'MgO — белый порошок',ЗЕ,{кегль:10}):'') + (готово?метка(210,16,'2Mg + O₂ → 2MgO',ЗЕ,{кегль:13}):'');
    const ДЕЙ=ШАГИ3[Math.min(ш,ШАГИ3.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='зажечь') кнопки=`<div class="ask">${BTN(5,'','Зажечь спиртовку',"r41о3('зажечь')")}</div>`;
      if(ДЕЙ==='внести') кнопки=`<div class="ask">${BTN(5,'','Внести ленту в пламя',"r41о3('внести')")}</div>`;
      if(ДЕЙ==='наблюдение') кнопки=`<div class="ask три">${['белый порошок','чёрная сажа','капли воды'].map((t0,j)=>BTN(5+j,'',t0,"r41о3('н"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='уравнение') кнопки=`<div class="ask три">${['2Mg + O₂ → 2MgO','Mg + O₂ → MgO','Mg + O₂ → MgO₂'].map((t0,j)=>BTN(5+j,'',t0,"r41о3('у"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК3.forEach(([что])=>{ const i=ШАГИ3.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3 · шаг '+Math.min(ш+1,ШАГИ3.length)+' из '+ШАГИ3.length,'Горение магния') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача'+(ДЕЙ==='внести'?' опасно':''),'<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ3[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК3,'r41о3',отм)) +
      СПИСОК('Ход опыта',ШАГИ3.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('горение магния','Магний соединяется с кислородом воздуха: <b>2Mg + O₂ → 2MgO</b>. Слева 2 атома Mg и 2 атома O, справа — тоже. Индекс в MgO менять нельзя: MgO₂ — это уже другое вещество. Вспышка такая яркая, что магний раньше использовали фотографы.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r41о3сброс()")}</div>` : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=210, y0=176, Л=L_();
    const поверх = Л.молекула(60,70,1,'H2',{подписи:true})+Л.молекула(60,120,1,'H2',{подписи:true})+Л.молекула(130,95,1,'O2',{подписи:true}) +
      `<path d="M172 95 H200 M194 89 L202 95 L194 101" stroke="#8fd1a8" stroke-width="2.4" fill="none"/>` + Л.молекула(250,70,1.1,'H2O',{подписи:true})+Л.молекула(250,130,1.1,'H2O',{подписи:true}) +
      метка(168,14,'2H₂ + O₂ → 2H₂O',ЗЕ,{кегль:14});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Масса веществ до реакции равна массе после — <b>закон сохранения массы</b>.<br>• Если масса «ушла» — ушёл газ ↑; осадок отмечают ↓.<br>• Уравнение: реагенты → продукты; атомов каждого элемента поровну.<br>• <b>Коэффициент</b> — число молекул, <b>индекс</b> — атомов в молекуле; менять можно только коэффициенты.<br>• Коэффициенты берут <b>наименьшие</b>; 1 не пишут.</div>') +
      ПРАВИЛО('<b>Сколько атомов было — столько и стало: они только перестроились.</b>');
  }

  /* 8. Проверка: марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.колба(220+i*42,y0+14,0.5,{уровень:.5,цвет:i<3-ош?Л.цвет('купорос',.1):'hsla(0,0%,60%,.2)',пробка:true})).join('') + Л.весы(84,y0+14,110,{показ:'152.4'});
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(84,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(262,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Уравнения ты расставляешь как химик.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r41заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r41мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Посчитай атомы каждого элемента слева и справа.')) : '')) +
      (все ? ПРАВИЛО('Меняем только <b>коэффициенты</b>; атомов каждого элемента слева и справа <b>поровну</b>.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'2H₂ + O₂ → ?H₂O', варианты:[{т:'2',ок:true},{т:'1',ок:false}], разбор:'4 атома H слева → 2H₂O.' },
    { вопрос:'Что можно менять при уравнивании?', варианты:[{т:'индексы',ок:false},{т:'коэффициенты',ок:true}], разбор:'Индексы задают вещество — их не трогают.' },
    { вопрос:'Сколько атомов H в 3H₂O?', варианты:[{т:'6',ок:true},{т:'5',ок:false}], разбор:'3 · 2 = 6.' },
    { вопрос:'В открытой колбе выделился газ. Весы покажут…', варианты:[{т:'столько же',ок:false},{т:'меньше',ок:true}], разбор:'Газ ушёл и унёс свою массу.' },
    { вопрос:'?Mg + O₂ → 2MgO', варианты:[{т:'2',ок:true},{т:'1',ок:false}], разбор:'2 атома Mg справа.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r41Reset()")}</div>` +
        ПРАВИЛО('Атомов каждого элемента слева и справа — поровну.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r41Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const доска = (Н,текст,цв) => { const Л=L_(); return `<rect x="16" y="40" width="304" height="${Н-110}" rx="10" fill="rgba(12,14,18,.7)" stroke="#4a525c"/>`+`<text x="168" y="${40+(Н-110)/2+8}" text-anchor="middle" font-size="24" font-weight="bold" fill="${цв||'#f2f5f8'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(текст)}</text>`; };
  const Т = {
    т1:{ имя:'Найди коэффициент', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.колба(40,y0+14,0.44,{уровень:.4,пробка:true})+Л.колба(296,y0+14,0.44,{уровень:.4,цвет:Л.цвет('купорос',.1)}),доска(Н,отв?з.у.replace('?',з.ок):з.у,отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Уравнено ли', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.весы(60,y0+14,90,{показ:'152.4'})+Л.колба(296,y0+14,0.44,{уровень:.4,пробка:true}),доска(Н,з.у,отв?(з.в?'#ff9a8a':'#8fe0b0'):'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Сколько атомов', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.пробирка(40,y0+14,0.6,{уровень:.4})+Л.пробирка(296,y0+14,0.6,{уровень:.4,цвет:Л.цвет('купорос',.08)}),доска(Н,з.ф+(отв?'  →  '+з.ок+' '+з.эл:''),отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие реакции.':'В новом круге реакции другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r41Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px;font-family:Georgia,serif">'+в+'</span>', "r41T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r41TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L41 = {
    id: ID, title: 'Уравнения реакций', ico: '⚗️',
    src: 'Химия · 5–6 класс · Реакции', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: масса закрытой колбы до и после реакции.',
      'Опыт 2: открытая колба и колба с шариком.',
      'Микромир: атомы перегруппировываются.',
      'Конструктор: уравниваем четыре реакции.',
      'Опыт 3: горение магния.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: найди коэффициент.',
      'Тренажёр 2: уравнено ли.',
      'Тренажёр 3: сколько атомов.'
    ],
    check: { q: 'В реакции 2H₂ + O₂ → ?H₂O. Какой коэффициент перед водой?', choices: ['1','2','3','4'], ans: 1, exp: '4 атома водорода слева → 2 молекулы воды.' },
    tasks: [
      { q: 'В реакции 2H₂O₂ → 2H₂O + ?O₂. Коэффициент перед кислородом?', kind: 'unit', ans: 1, tol: 0, hints: ['Слева 4 кислорода (2·2).', 'В 2H₂O — 2 кислорода.', 'Осталось 2 — это 1 молекула O₂.'], sol: '2H₂O₂ → 2H₂O + O₂.' },
      { q: 'В реакции N₂ + ?H₂ → 2NH₃. Коэффициент перед водородом?', kind: 'unit', ans: 3, tol: 0, hints: ['Справа 6 атомов водорода (2·3).', 'Молекула H₂ даёт 2 атома.', '6 : 2 = 3.'], sol: 'N₂ + 3H₂ → 2NH₃.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.щипцы){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L41.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Опыт 2',4:'Микромир',5:'Конструктор уравнений',6:'Опыт 3',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l41n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Уравнения реакций'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r41Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r41вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  const ИМЯ = {весы:'весы',колбаЗ:'колбу',пробирка:'пробирку',спиртовка:'спиртовку',цилиндр:'цилиндр',стакан:'стакан',шпатель:'шпатель',очки:'очки',щипцы:'щипцы',колба:'колбу'};
  window.r41о1=(что)=>{ const s=S(); const ш=s.о1||0; if(ш>=ШАГИ1.length) return; const нужно=ШАГИ1[ш].что;
    const вперёд=(т)=>{ s.о1=ш+1; s.о1отз={ок:true,т:т}; if(s.о1>=ШАГИ1.length){ s.дело_сохранение=true; } chRender(0); };
    if(что===нужно&&['весы','ON','колбаЗ','m1','m2'].includes(нужно)){
      if(нужно==='m1') s.о1m1=true; if(нужно==='m2') s.о1m2=true;
      return вперёд({весы:'Весы на столе.',ON:'Весы включены: 0.0 г.',колбаЗ:'Колба на весах: 152,4 г. Растворы пока не смешаны — пробирка стоит внутри.',m1:'Записано: m₁ = 152,4 г.',m2:'Записано: m₂ = 152,4 г.'}[нужно]); }
    if(нужно==='наклон'&&что==='наклон'){ s.о1наклон=true; return вперёд('Растворы смешались: CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄.'); }
    if(нужно==='наблюдение'&&/^н\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: выпал голубой студенистый осадок гидроксида меди(II) Cu(OH)₂ — признак реакции. В уравнении его отмечают стрелкой ↓.');
      s.о1отз={ок:false,т:j===1?'Пузырьков нет — газ здесь не выделяется. Присмотрись к мути на дне.':'Что-то появилось: голубые хлопья на дне.'}; chRender(0); return; }
    if(нужно==='сравнить'&&/^с\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: m₂ = m₁ = 152,4 г. Новое вещество появилось, а масса не изменилась.');
      s.о1отз={ок:false,т:'Посмотри в журнал: обе записи — 152,4 г. Колба закрыта, ничего не ушло и не пришло.'}; chRender(0); return; }
    if(что==='колбаЗ'&&нужно==='весы'){ s.о1отз={ok:false,ок:false,т:'Сначала поставь весы — колбу ставят на включённые весы.'}; chRender(0); return; }
    s.о1отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ1[ш].т}; chRender(0); };
  window.r41о1сброс=()=>{ const s=S(); s.о1=0; s.о1отз=null; s.о1m1=false; s.о1m2=false; s.о1наклон=false; chRender(0); };
  window.r41о2=()=>{ const s=S(); s.о2=Math.min(2,(s.о2||0)+1); chRender(0); };
  window.r41мм=()=>{ const s=S(); s.мм4=Math.min(2,(s.мм4||0)+1); chRender(0); };
  window.r41ур=(i)=>{ const s=S(); s.ур5=i; chRender(0); };
  window.r41к=(i,d)=>{ const s=S(); const к=s.ур5||0, У=УРАВНЕНИЯ[к], все=[...У.слева,...У.справа]; const коэф=(s['к5_'+к]||все.map(()=>1)).slice();
    коэф[i]=Math.max(1,Math.min(6,коэф[i]+d)); s['к5_'+к]=коэф;
    const л=счёт(У.слева,коэф.slice(0,У.слева.length)), п=счёт(У.справа,коэф.slice(У.слева.length));
    const ровно=Object.keys({...л,...п}).every(e=>(л[e]||0)===(п[e]||0)), наим=коэф.reduce((a,b)=>нод(a,b))===1;
    const реш=Object.assign({},s.реш5||{}); if(ровно&&наим) реш[к]=true; s.реш5=реш; if(УРАВНЕНИЯ.every((x,j)=>реш[j])) s.дело_уравнять=true;
    chRender(0); };
  window.r41о3=(что)=>{ const s=S(); const ш=s.о3||0; if(ш>=ШАГИ3.length) return; const нужно=ШАГИ3[ш].что;
    const вперёд=(т)=>{ s.о3=ш+1; s.о3отз={ок:true,т:т}; chRender(0); };
    if(что===нужно&&['очки','спиртовка','зажечь','щипцы','внести'].includes(нужно))
      return вперёд({очки:'Очки надеты — теперь можно работать с огнём.',спиртовка:'Спиртовка на столе, колпачок закрыт.',зажечь:'Спиртовка горит. Колпачок положи рядом — им гасят пламя.',щипцы:'Лента зажата щипцами за самый край.',внести:'Магний вспыхнул ослепительно-белым пламенем, поднимается белый дымок.'}[нужно]);
    if(нужно==='очки'&&(что==='спиртовка'||что==='щипцы')){ s.о3отз={ок:false,т:'Стоп! Сначала защитные очки — с огнём без них не работают.'}; chRender(0); return; }
    if(нужно==='наблюдение'&&/^н\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: осталась белая хрупкая «зола» — оксид магния MgO. Это новое вещество.');
      s.о3отз={ок:false,т:j===1?'Сажа — это углерод, а в магниевой ленте его нет. Посмотри на щипцы: там белый порошок.':'Воды здесь не образуется: в реакции нет водорода.'}; chRender(0); return; }
    if(нужно==='уравнение'&&/^у\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: 2Mg + O₂ → 2MgO. По 2 атома Mg и O слева и справа.');
      s.о3отз={ок:false,т:j===1?'Посчитай кислород: слева в O₂ два атома, справа в MgO один. Нужно 2MgO, а значит, и 2Mg.':'MgO₂ — такого вещества нет. Индекс менять нельзя, только коэффициенты.'}; chRender(0); return; }
    s.о3отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ3[ш].т}; chRender(0); };
  window.r41о3сброс=()=>{ const s=S(); s.о3=0; s.о3отз=null; chRender(0); };
  window.r41мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r41заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r41Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r41Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r41T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r41TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r41Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L41,{__планПорядок:arr[м].__планПорядок}); else arr.push(L41); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU41={render:render, L:L41};
})();
