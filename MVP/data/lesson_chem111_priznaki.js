/* ============ ХИМИЯ · УРОК 111 · «ПРИЗНАКИ ХИМИЧЕСКИХ РЕАКЦИЙ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–54 (манера NOBOOK). Карточка 111 из банка подменяется этой записью
   (VISKW[111]). Рисунки — MVP/data/ris_lab.js (window.РЛ): колба с шариком, голубой осадок,
   крахмал с йодом, вспышка магния, газоотводная трубка и известковая вода, гвозди в пробирках.

   ОПЫТЫ.
   1) Четыре признака: сода в шарике + уксус (газ надувает шарик), медный купорос + щёлочь
      (голубой осадок), крахмальный клейстер + йод (тёмно-синий цвет), горение магния (свет и тепло).
   2) Физическое или химическое: восемь явлений — лёд, гвоздь, кипение, молоко, сахар, свеча,
      проволока, яблоко.
   3) Какой газ даёт сода с уксусом: горящая лучинка гаснет, известковая вода мутнеет — CO₂.
   4) Ржавление за неделю: гвоздь в сухой пробирке, в воде и в солёной воде.

   ТЕОРИЯ: химическая реакция — превращение одних веществ в другие. Признаки: газ, осадок,
   изменение цвета или запаха, выделение тепла и света. При физических явлениях вещество остаётся
   прежним — меняется форма или состояние. На уровне частиц: при реакции из старых частиц
   получаются новые (2Mg + O₂ → 2MgO), при таянии льда молекулы H₂O остаются теми же. */
(function(){
  'use strict';

  const ID = 111;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'признаки', имя:'Опыт 1: четыре признака',   итог:'4 из 4'},
    {ключ:'явления',  имя:'Опыт 2: физика или химия',  итог:'8 из 8'},
    {ключ:'марафон',  имя:'Проверка: марафон',         итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться отличать химические явления от физических и узнавать химическую реакцию по её признакам.'],
    ['Принцип','<b>Химическая реакция</b> — превращение одних веществ в другие, новые. О ней говорят <b>признаки</b>: выделение газа, выпадение осадка, изменение цвета или запаха, выделение тепла и света. При <b>физических</b> явлениях вещество остаётся тем же — меняется только форма или состояние.'],
    ['Оборудование','<b>Приборы:</b> колбы, воздушный шарик, стаканы, пробирки, пипетка, спиртовка, тигельные щипцы, лучинка, пробка с газоотводной трубкой.<br><b>Реактивы:</b> питьевая сода, уксус, раствор медного купороса, раствор щёлочи, крахмальный клейстер, йод, магниевая лента, известковая вода, железные гвозди, поваренная соль.'],
    ['Ход работы','1. Провести четыре реакции и найти у каждой признак.<br>2. Разделить восемь явлений на физические и химические.<br>3. Узнать газ, который выделяет сода с уксусом.<br>4. Неделю наблюдать, как ржавеют гвозди.<br>5. Сделать вывод.'],
    ['Безопасность','Щёлочь и медный купорос <b>едкие и ядовитые</b>: очки и перчатки. На вспышку магния <b>не смотреть</b> прямо — она слепит. Горящие предметы держат щипцами над огнеупорной подставкой. Ничего не пробовать на вкус.']
  ];
  const ПРИЗНАКИ = ['выделение газа','выпадение осадка','изменение цвета','свет и тепло'];
  const РЕАКЦИИ = [
    {к:'газ',    имя:'Сода + уксус',            кор:'сода + уксус',      дей:'Поднять шарик — сода высыпется в уксус', набл:'шипение, пузырьки, шарик надувается', пр:0, прод:'углекислый газ'},
    {к:'осадок', имя:'Купорос + щёлочь',        кор:'купорос + щёлочь',  дей:'Прилить раствор щёлочи',                 набл:'выпали голубые хлопья',                пр:1, прод:'гидроксид меди'},
    {к:'цвет',   имя:'Крахмал + йод',           кор:'крахмал + йод',     дей:'Капнуть йод в клейстер',                 набл:'клейстер стал тёмно-синим',            пр:2, прод:'синее соединение'},
    {к:'свет',   имя:'Горение магния',          кор:'магний в пламени',  дей:'Внести магниевую ленту в пламя',         набл:'ослепительная вспышка, жар, белый порошок', пр:3, прод:'оксид магния'}
  ];
  const ЯВЛЕНИЯ = [
    {ф:'Тает лёд',               хим:0, почему:'Лёд и вода — одно вещество H₂O, изменилось только состояние.'},
    {ф:'Ржавеет гвоздь',         хим:1, почему:'Появилось новое бурое вещество — ржавчина.'},
    {ф:'Кипит вода',             хим:0, почему:'Пузыри — это пар, та же вода. Остынет — снова станет водой.'},
    {ф:'Скисает молоко',         хим:1, почему:'Появились новые вещества: кислый вкус и запах, хлопья.'},
    {ф:'Растворяется сахар',     хим:0, почему:'Сахар остался сахаром: выпари воду — и он вернётся.'},
    {ф:'Горит свеча',            хим:1, почему:'Свет и тепло, а воск превращается в углекислый газ и воду.'},
    {ф:'Гнут проволоку',         хим:0, почему:'Медь осталась медью — изменилась только форма.'},
    {ф:'Темнеет срез яблока',    хим:1, почему:'Изменился цвет: вещества яблока реагируют с кислородом воздуха.'}
  ];
  const ШАГИ5 = [
    {т:'Насыпь в колбу питьевую соду.',                                    что:'сода'},
    {т:'Влей в колбу уксус.',                                               что:'уксус'},
    {т:'Внеси в горлышко колбы горящую лучинку.',                           что:'лучинка'},
    {т:'Лучинка погасла. Что это говорит о газе?',                          что:'вопрос'},
    {т:'Закрой колбу пробкой с трубкой и пропусти газ через известковую воду.', что:'известковая'},
    {т:'Известковая вода помутнела. Какой это газ?',                       что:'газ'}
  ];
  const ДНИ = [0,3,7];
  const РЖА = {0:[0,0,0], 3:[0,.35,.6], 7:[.04,.65,1]};
  const ГВОЗДИ = [{ф:'сухо', подп:'сухо'},{ф:'вода', подп:'вода'},{ф:'солёная вода', подп:'вода + соль'}];
  const МАРАФОН = [
    {q:'Что такое химическая реакция?', вар:['превращение одних веществ в другие','изменение формы тела','переход из твёрдого в жидкое'], в:0, р:'При реакции получаются новые вещества.'},
    {q:'Сода + уксус. Признак реакции?', вар:['газ','осадок','свет'], в:0, р:'Шипение и пузырьки — выделяется углекислый газ.'},
    {q:'Купорос + щёлочь: голубые хлопья — это…', вар:['осадок','газ','пена'], в:0, р:'Нерастворимое вещество выпадает осадком.'},
    {q:'Какое явление физическое?', вар:['ржавление','кипение воды','горение'], в:1, р:'Пар — та же вода.'},
    {q:'Какое явление химическое?', вар:['таяние снега','скисание молока','сгибание проволоки'], в:1, р:'В скисшем молоке новые вещества.'},
    {q:'Горящая лучинка в углекислом газе…', вар:['гаснет','вспыхивает','хлопает'], в:0, р:'CO₂ не поддерживает горения.'},
    {q:'Йод + крахмал дают цвет…', вар:['тёмно-синий','красный','зелёный'], в:0, р:'Йод — индикатор на крахмал.'},
    {q:'Где гвоздь ржавеет быстрее?', вар:['в сухом','в воде','в солёной воде'], в:2, р:'Соль ускоряет ржавление.'},
    {q:'Вода закипела — пузырьки. Это реакция?', вар:['да, выделяется газ','нет, это пар той же воды','да, вода горит'], в:1, р:'Признак есть, а нового вещества нет — явление физическое.'},
    {q:'Известковая вода помутнела. Через неё прошёл…', вар:['углекислый газ','кислород','водород'], в:0, р:'CO₂ даёт с известковой водой белый осадок — мел.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['Сода с лимонным соком шипит','выделение газа','выпадение осадка'],['Купорос + щёлочь: голубые хлопья','выпадение осадка','выделение газа'],
    ['Йод на срезе картофеля синеет','изменение цвета','выпадение осадка'],['Вспыхивает спичка','свет и тепло','изменение цвета'],
    ['Известковая вода от выдоха мутнеет','выпадение осадка','свет и тепло'],['Разрезанное яблоко темнеет','изменение цвета','выделение газа'],
    ['Шипучая таблетка в воде','выделение газа','выпадение осадка'],['Горит бенгальский огонь','свет и тепло','выпадение осадка'],
    ['Медная монета зеленеет','изменение цвета','свет и тепло'],['Дрожжевое тесто поднимается','выделение газа','изменение цвета'],
    ['Горит магниевая лента','свет и тепло','выделение газа'],['В чайнике выросла накипь','выпадение осадка','свет и тепло'],
    ['Скорлупа в уксусе в пузырьках','выделение газа','изменение цвета'],['Серебряная ложка потемнела','изменение цвета','выделение газа'],
    ['Горит газ на плите','свет и тепло','выпадение осадка'],['Мыльная вода + ф/ф — малиновая','изменение цвета','свет и тепло']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Какой признак реакции?', ф:ф, ок:ок, нет:нет, пр:ПРИЗНАКИ.indexOf(ок), раз:'Признак — '+ок+'. Значит, образовалось новое вещество.'})));
  const П2 = [['Тает мороженое',0],['Гниют листья',1],['Высыхает лужа',0],['Жарится яичница',1],['Замерзает вода',0],['Ржавеет велосипед',1],['Пилят доску',0],['Горят дрова',1],
    ['Растворяется соль',0],['Бродит сок',1],['Плавится шоколад',0],['Скисает молоко',1],['Куют подкову',0],['Пригорает каша',1],['Образуется иней',0],['Гасят соду уксусом',1]]
    .map(([ф,х])=>({q:'«'+ф+'» — какое это явление?', ф:ф, вар:['физическое','химическое'], в:х, раз:х?'Образуется новое вещество — явление химическое.':'Вещество осталось тем же, изменились форма или состояние — явление физическое.'}));
  const П3 = поМесту([['Горит магний','оксид магния','вода'],['Ржавеет железо','ржавчина','сталь'],['Сода + уксус','углекислый газ','кислород'],['Купорос + щёлочь','голубой осадок','медь'],
    ['Горит свеча','углекислый газ и вода','жидкий воск'],['Тает лёд','нового вещества нет','новое вещество — вода'],['Скисает молоко','простокваша','сливки'],['Кипит вода','нового вещества нет','водород'],
    ['Горит природный газ','углекислый газ и вода','сажа и кислород'],['CO₂ + известковая вода','мел (белый осадок)','соль'],['Сахар нагрели до карамели','карамель — новое вещество','тот же сахар'],['Сгорели дрова','зола, CO₂ и вода','опилки'],
    ['Подгорел хлеб','уголь (чёрная корка)','мука'],['Растворили сахар в чае','нового вещества нет','новое вещество'],['Йод + крахмал','синее соединение','йод и крахмал без изменений'],['Расплавили воск','нового вещества нет','парафиновый газ']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Что получилось?', ф:ф, ок:ок, нет:нет, раз:'Ответ: '+ок+'. Химическое явление даёт новое вещество, физическое — нет.'})));

  const CSS=`
  #lvis .s6.l111n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l111n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l111n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l111n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l111n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l111n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l111n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l111n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l111n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l111n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l111n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l111n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l111n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l111n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l111n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l111n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l111n table.итоги td{white-space:normal!important}
  #lvis .s6.l111n table.итоги td:first-child{width:46%}
  #lvis .s6.l111n table.итоги{table-layout:fixed}
  #lvis .s6.l111n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l111n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l111n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l111n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l111n .ask button{text-align:left}
  #lvis .s6.l111n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l111n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l111n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l111n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l111n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l111n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l111n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l111n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l111n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l111n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l111n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l111n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l111n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l111n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l111n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l111n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l111n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l111n .плитка span{text-align:center}
  #lvis .s6.l111n .плитка:active{transform:scale(.96)}
  #lvis .s6.l111n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l111n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l111n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l111n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l111n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l111n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l111n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l111n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l111n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l111n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l111n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l111n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l111n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l111n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l111n{gap:14px}
  #lvis .s6.l111n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l111n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l111n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l111n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l111n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l111n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l111n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l111n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l111n .карт .текст b{color:${GOLD}}
  #lvis .s6.l111n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l111n .правило b{color:${GOLD}}
  #lvis .s6.l111n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l111n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l111n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l111n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l111n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l111n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l111n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l111n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l111n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l111n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l111n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l111n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l111n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l111n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l111n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l111n .буйки button.мимо{border-color:${RED};animation:l111nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l111nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l111n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l111n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l111n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l111n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l111n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l111n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l111n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l111n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l111n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l111n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l111n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l111n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l111n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l111n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l111n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l111n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l111n .уровни .точка.сейчас{background:${GOLD};animation:l111ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l111ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l111n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l111n{-webkit-text-size-adjust:100%}
  #lvis .s6.l111n [data-anim]{animation:l111nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l111nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l111n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l111n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l111n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l111n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l111n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l111n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l111n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l111n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l111n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l111n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l111n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l111n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l111n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l111n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l111n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l111n .акт span.до{background:#24402c}
  #lvis .s6.l111n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l111n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l111n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l111n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l111n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l111n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l111n .две-колонки li{margin:2px 0}
  #lvis .s6.l111n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l111n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l111n .ряд button.был{border-color:rgba(143,209,168,.6)}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l111n [data-anim]{animation:none!important}
    #lvis .s6.l111n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l111n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l111n-style');
      if(!s){ s=document.createElement('style'); s.id='l111n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r111Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c111-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c111-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c111-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c111-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c111-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c111-плиты)"/>
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
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки,колонок) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  const КУПОРОС = 'hsla(203,85%,52%,.62)';
  const СИНИЙ = 'hsla(236,75%,16%,.97)';
  const КЛЕЙСТЕР = 'hsla(40,25%,94%,.72)';
  const ЦВ_ПР = ['#7fd1ff','#8fb8ff','#c89aff','#ffd76a'];
  const ДВ = () => L_().ДВИЖ;

  /* ---------- предметы сцены ---------- */
  /* колба с уксусом и шариком с содой: 0 — шарик висит, 1 — сода в уксусе */
  const колбаШарик = (x,y,м,пошло) => L_().колба(x,y,м,{уровень:.3,цвет:'hsla(198,40%,88%,.4)',пузырьки:пошло,шарик:пошло?1:.12,дуется:пошло,осадок:пошло?{цвет:'#f4f2ec',h:3}:null}) +
    (пошло?'':`<g transform="translate(${x} ${y}) scale(${м})"><path d="M-10 -96 Q-30 -88 -34 -70 Q-36 -58 -26 -56 Q-16 -58 -16 -72 Q-14 -86 -8 -94 Z" fill="#c8402a" opacity=".9"/><ellipse cx="-27" cy="-62" rx="5" ry="3" fill="#f4f2ec" opacity=".8"/></g>`);
  const колбаОсадок = (x,y,м,пошло) => L_().колба(x,y,м,{уровень:.45,цвет:пошло?'hsla(203,60%,70%,.4)':КУПОРОС,осадок:пошло?{цвет:'#4a9af0',h:10,падает:true}:null});
  const клейстер = (x,y,ш,в,пошло) => L_().стакан(x,y,ш,в,{уровень:.55,объём:250,цвет:пошло?СИНИЙ:КЛЕЙСТЕР,муть:пошло?0:26,мутьЦвет:['#ffffff','#f4f0e8','#ffffff']});
  const картошка = (x,y,пошло) => `<g><ellipse cx="${x}" cy="${y-6}" rx="28" ry="9" fill="#c8a060"/><ellipse cx="${x}" cy="${y-9}" rx="26" ry="7.5" fill="#f4e6b8"/>
    <ellipse cx="${x-6}" cy="${y-10}" rx="10" ry="2.6" fill="#fff" opacity=".35"/>${пошло?`<ellipse cx="${x+4}" cy="${y-9}" rx="9" ry="3.6" fill="#1a1440" opacity=".9"/><ellipse cx="${x+4}" cy="${y-9}" rx="12" ry="4.6" fill="#2a2470" opacity=".45"/>`:''}</g>`;
  const магний = (пошло,y0) => { const Л=L_();
    return Л.спиртовка(206,y0+14,1.1,true) + (пошло ? Л.щипцы(150,y0-46,0,{горит:true}) : Л.щипцы(110,y0-70,-14,{})); };
  const сценаРеакции = (i,пошло,y0) => { const Л=L_();
    if(i===0) return колбаШарик(130,y0+14,1.15,пошло) + Л.склянка(282,y0+14,36,64,{уровень:.4,цвет:'hsla(198,40%,88%,.35)',этикетка:['уксус'],полоса:'#c8402a'});
    if(i===1) return колбаОсадок(130,y0+14,1.2,пошло) + Л.склянка(282,y0+14,36,64,{уровень:пошло?.3:.6,этикетка:['NaOH']}) + (пошло?'':Л.пипетка(130,y0-104,0.9,true));
    if(i===2) return клейстер(130,y0+14,92,100,пошло) + Л.склянка(282,y0+14,34,60,{уровень:.5,цвет:'hsla(25,85%,30%,.9)',этикетка:['йод']}) + картошка(226,y0+14,пошло) + Л.пипетка(130,y0-92,0.9,!пошло);
    return магний(пошло,y0);
  };
  /* гвоздь в пробирке: cx — ось, низ — дно штатива */
  const гвоздь = (cx,низ,ржа,лежит) => { const верх=низ-82, дно=низ-14;
    return `<g><path d="M${cx-1.8} ${верх+4} V${дно-6} L${cx} ${дно} L${cx+1.8} ${дно-6} V${верх+4} Z" fill="url(#рл-сталь)" stroke="#5a6068" stroke-width=".4"/>
      <ellipse cx="${cx}" cy="${верх+3}" rx="5" ry="1.8" fill="#9aa0a8" stroke="#5a6068" stroke-width=".5"/>
      ${ржа>0?`<path d="M${cx-1.9} ${верх+5} V${дно-6} L${cx} ${дно} L${cx+1.9} ${дно-6} V${верх+5} Z" fill="#8a3a14" opacity="${(ржа*0.85).toFixed(2)}"/>`+
        Array.from({length:Math.round(4+ржа*10)},(_,k)=>`<circle cx="${(cx-1.6+((k*7)%4)*0.9).toFixed(1)}" cy="${(дно-8-((k*13)%Math.max(10,(дно-верх-12)*Math.min(1,ржа+0.2)))).toFixed(1)}" r="${(0.8+(k%3)*0.5).toFixed(1)}" fill="#c86a28" opacity=".9"/>`).join('')+
        (ржа>.5&&!лежит?`<ellipse cx="${cx}" cy="${низ-16.5}" rx="5" ry="1.6" fill="#a8541e" opacity="${(ржа*0.8).toFixed(2)}"/>`:''):''}</g>`; };
  const льдинки = (x,y) => [[-22,0,-8],[4,-3,12],[20,2,-4]].map(([dx,dy,у])=>`<g transform="translate(${x+dx} ${y+dy}) rotate(${у})"><rect x="-10" y="-9" width="20" height="17" rx="3.5" fill="hsla(195,70%,92%,.78)" stroke="#fff" stroke-width=".9"/><path d="M-7 -6 h8" stroke="#fff" stroke-width="1.6" opacity=".8"/><path d="M-6 3 l10 -8" stroke="#bfe6fa" stroke-width=".7"/></g>`).join('');
  const пар = (x,y,n) => ДВ() ? Array.from({length:n},(_,k)=>`<path d="M${x-14+k*14} ${y} q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="2" fill="none" opacity=".3"><animate attributeName="opacity" values=".05;.4;.05" dur="${1.4+k*0.3}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 6;0 -6" dur="${1.4+k*0.3}s" repeatCount="indefinite"/></path>`).join('')
    : Array.from({length:n},(_,k)=>`<path d="M${x-14+k*14} ${y} q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="2" fill="none" opacity=".3"/>`).join('');
  const пузырьки = (x,yНиз,yВерх,ш,n) => Array.from({length:n},(_,k)=>{ const px=x-ш/2+((k*29)%ш), r=1.2+(k%3)*0.7;
    return `<circle cx="${px}" cy="${yНиз}" r="${r}" fill="none" stroke="#fff" stroke-width=".8" opacity=".85">${ДВ()?`<animate attributeName="cy" values="${yНиз};${yВерх}" dur="${(0.8+(k%4)*0.25).toFixed(2)}s" begin="${((k%5)*0.15).toFixed(2)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('');
  const яблоко = (x,y,бурое) => `<g transform="translate(${x} ${y})"><path d="M-30 -2 Q-32 -34 0 -34 Q32 -34 30 -2 Z" fill="#c8302a"/><path d="M-27 -3 Q-28 -30 0 -30 Q28 -30 27 -3 Z" fill="${бурое?'#c8945a':'#fbf2d4'}"/>
    ${бурое?`<ellipse cx="-8" cy="-14" rx="12" ry="7" fill="#a8703a" opacity=".7"/><ellipse cx="10" cy="-20" rx="9" ry="5" fill="#9a6230" opacity=".6"/>`:''}
    <ellipse cx="-4" cy="-16" rx="2" ry="3.4" fill="#4a2a10"/><ellipse cx="4" cy="-16" rx="2" ry="3.4" fill="#4a2a10"/><path d="M0 -34 q2 -8 6 -10" stroke="#5a3a1a" stroke-width="2" fill="none"/><path d="M6 -42 q8 -4 12 2 q-8 4 -12 -2" fill="#4a9a3a"/></g>`;
  const проволока = (x,y) => `<g><path d="M${x-80} ${y-8} H${x-40} Q${x-20} ${y-8} ${x-20} ${y-28} Q${x-20} ${y-52} ${x} ${y-52} Q${x+22} ${y-52} ${x+22} ${y-30} Q${x+22} ${y-14} ${x+8} ${y-14} Q${x-4} ${y-14} ${x-4} ${y-28} Q${x-4} ${y-38} ${x+6} ${y-38}" stroke="#8a4a1a" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M${x-80} ${y-8} H${x-40} Q${x-20} ${y-8} ${x-20} ${y-28} Q${x-20} ${y-52} ${x} ${y-52} Q${x+22} ${y-52} ${x+22} ${y-30} Q${x+22} ${y-14} ${x+8} ${y-14} Q${x-4} ${y-14} ${x-4} ${y-28} Q${x-4} ${y-38} ${x+6} ${y-38}" stroke="#e8964a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M${x-78} ${y-9} H${x-42}" stroke="#ffd0a0" stroke-width="1" opacity=".8"/><path d="M${x+40} ${y-6} H${x+96}" stroke="#8a4a1a" stroke-width="5" stroke-linecap="round"/><path d="M${x+40} ${y-6} H${x+96}" stroke="#e8964a" stroke-width="2.6" stroke-linecap="round"/></g>`;
  const сценаЯвления = (i,y0) => { const Л=L_(), у=y0+14;
    if(i===0) return Л.стакан(150,у,92,96,{уровень:.4,объём:250}) + льдинки(150,у-42);
    if(i===1) return `<g transform="translate(84 ${у-26}) rotate(90) scale(1.8)">${гвоздь(0,46,0)}</g><g transform="translate(244 ${у-26}) rotate(90) scale(1.8)">${гвоздь(0,46,1,true)}</g>` +
      тА(84,у+10,'новый',10,'#c8ced6') + тА(244,у+10,'через месяц',10,'#c8ced6');
    if(i===2){ const yС=у-120*0.18-4; return Л.плитка(150,у,120,{вкл:true,ручка:.9}) + Л.стакан(150,yС,74,86,{уровень:.6,объём:250}) + пузырьки(150,yС-8,yС-46,56,14) + пар(150,yС-90,3); }
    if(i===3) return Л.стакан(150,у,84,96,{уровень:.62,объём:250,цвет:'hsla(45,40%,97%,.96)',муть:46,мутьЦвет:['#fffef8','#e8e0c8','#d8ceb0'],осадок:7});
    if(i===4) return Л.стакан(150,у,84,96,{уровень:.55,объём:250,крупинки:ДВ()?14:0,вид:'сахар',таять:true,палочка:true,мешать:true,цвет:Л.цвет('сахар',.06)});
    if(i===5) return Л.свеча(150,у,1.3,true);
    if(i===6) return проволока(150,у);
    return яблоко(110,у,false) + яблоко(226,у,true) + тА(110,у+12,'сразу',9,'#c8ced6') + тА(226,у+12,'через 20 минут',9,'#c8ced6');
  };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=246, y0=196, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = колбаШарик(62,y0+14,0.82,true) + колбаОсадок(150,y0+14,0.85,true) + клейстер(240,y0+14,58,66,true) + Л.очки(304,y0+6,0.8);
    const поверх = метка(196,14,'Признаки химических реакций',ЗЛ,{кегль:12}) + Л.пипетка(240,y0-56,0.7,true) +
      Л.имяПрибора(62,y0+30,'газ')+Л.имяПрибора(150,y0+30,'осадок')+Л.имяПрибора(240,y0+30,'цвет');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Признаки химических реакций') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r111вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['получается новое вещество','меняется форма или состояние'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Чем химическое явление отличается от физического?') :
          РАЗБОР(ок,['Верно: при химической реакции одни вещества превращаются в другие.','Это как раз физическое явление: лёд растаял — вода осталась водой. При химическом получается <b>новое вещество</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Химическая реакция</b> — превращение одних веществ в другие, новые.') : '');
  }

  /* 2. Опыт 1: четыре признака */
  function F2(s){
    const Н=252, y0=198, к=s.р2, пош=s.пош2||{}, сд=s.сд2||{}, отз=s.отз2, все=РЕАКЦИИ.every(x=>сд[x.к]);
    const Р=к==null?null:РЕАКЦИИ[к], пошло=Р&&пош[Р.к];
    const пр = Р ? сценаРеакции(к,пошло,y0) : колбаШарик(80,y0+14,0.9,false) + колбаОсадок(176,y0+14,0.9,false) + клейстер(266,y0+14,60,70,false);
    const поверх = !Р ? метка(168,14,'выбери реакцию',ЗЛ,{кегль:11}) :
      метка(к===3?120:220,14,пошло?Р.набл:Р.имя,пошло?ЦВ_ПР[Р.пр]:ЗЛ,{кегль:пошло&&Р.набл.length>30?9:11}) +
      (к===3&&пошло?метка(110,46,'не смотри прямо на вспышку!',КР,{кегль:9}):'') +
      (к===0&&!пошло?метка(250,104,'сода — в шарике',null,{кегль:9}):'');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Четыре признака реакции') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))">${РЕАКЦИИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${сд[x.к]?' был':''}" onclick="r111р(${i})">${сд[x.к]?'✓ ':''}${x.имя}</button>`).join('')}</div>` +
      (Р&&!пошло ? `<div class="ask">${BTN(5,'',Р.дей,"r111пуск()")}</div>` : '') +
      (Р&&пошло&&!сд[Р.к] ? A(5,'карт задача','<span class="метка">Что заметно?</span><div class="текст">Какой признак химической реакции ты видишь?</div>')+
        `<div class="ask пара">${ПРИЗНАКИ.map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r111пр("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !Р ? СКАЗ('Опыт','Четыре пары веществ. Выбери пару, проведи реакцию и найди её признак.') : '') +
      A(8,'карт','<span class="метка">Таблица наблюдений · '+РЕАКЦИИ.filter(x=>сд[x.к]).length+' из 4</span><table class="итоги узкая"><tr><th>Реакция</th><th>что видно</th><th>признак</th></tr>'+
        РЕАКЦИИ.map(x=>сд[x.к]?`<tr><td>${x.кор}</td><td>${x.набл}</td><td><span class="капля" style="background:${ЦВ_ПР[x.пр]}"></span>${ПРИЗНАКИ[x.пр]}</td></tr>`:`<tr class="пусто"><td>${x.кор}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('признаки','Во всех четырёх опытах появились <b>новые вещества</b>: углекислый газ, голубой гидроксид меди, синее соединение йода с крахмалом, белый оксид магния. Их выдают признаки: <b>газ, осадок, цвет, свет и тепло</b>. Бывает и <b>запах</b> — так пахнет тухлое яйцо или подгоревшая каша.') +
        ДИВО('Йод — «детектор крахмала». Капни йод на срез картофеля или на хлеб — синее пятно. А на кусочек сыра — пятна не будет: крахмала в нём нет.') +
        ПРАВИЛО('Признаки реакции: <b>газ</b>, <b>осадок</b>, <b>изменение цвета или запаха</b>, <b>свет и тепло</b>.') : '');
  }

  /* 3. Микромир: физическое и химическое */
  function F3(s){
    const Н=236, y0=222, Л=L_(), м=s.м3||0, ст=!!(s.ст3||{})[м], вид=s.вид3||{}, обе=вид[0]&&вид[1], в=s.ответ3, ок=в===0;
    let поверх='';
    if(м===0){
      const пос = ст ? [[40,70],[110,150],[70,190],[160,60],[200,170],[250,90],[290,160],[230,200],[130,95]] : Array.from({length:9},(_,i)=>[124+(i%3)*44,80+Math.floor(i/3)*44]);
      поверх = пос.map(([x,y],i)=>`<g transform="rotate(${ст?(i*47)%360:0} ${x} ${y})">${Л.молекула(x,y,0.95,'H2O',{подписи:true})}</g>`).join('') +
        (ст?'':`<rect x="96" y="54" width="144" height="134" rx="8" fill="none" stroke="#bfe6fa" stroke-width="1" stroke-dasharray="4 4" opacity=".5"/>`) +
        метка(168,4,ст?'вода: те же молекулы H₂O, только свободнее':'лёд: молекулы H₂O стоят рядами',ст?СН:ЗЛ,{кегль:11});
    } else {
      поверх = (ст ? Л.молекула(110,120,1.1,'MgO',{подписи:true}) + Л.молекула(226,120,1.1,'MgO',{подписи:true}) + тА(168,196,'2 MgO — оксид магния, новое вещество',10,'#8fd1a8')
        : Л.молекула(70,110,1.1,'Mg',{подписи:true}) + Л.молекула(70,170,1.1,'Mg',{подписи:true}) + Л.молекула(250,140,1.1,'O2',{подписи:true}) + тА(70,206,'2 Mg',10,'#c8ced6') + тА(250,180,'O₂',10,'#c8ced6')) +
        метка(168,4,'2Mg + O₂ → 2MgO',ст?ЗЕ:ЗЛ,{кегль:12});
    }
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Что происходит с частицами') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))">${['лёд тает','магний горит'].map((t0,i)=>BTN(3,м===i?'вкл':'',t0,'r111м('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,'',ст?'Вернуть как было':(м===0?'Нагреть лёд →':'Поджечь магний →'),"r111мст()")}</div>` +
      ТЕОРИЯ('частицы',м===0?'Лёд тает — молекулы <b>H₂O</b> покидают свои места и движутся свободнее. Но каждая молекула осталась той же: два атома водорода и атом кислорода. <b>Нового вещества нет</b> — явление физическое.':'Магний горит — атомы <b>Mg</b> соединяются с атомами кислорода. Получаются частицы <b>MgO</b>, каких раньше не было: это новое вещество — белый порошок оксида магния. Явление химическое.') +
      (!обе ? СКАЗ('Микромир','Посмотри оба случая: «лёд тает» и «магний горит».') :
        ОТВЕТЫ('',['из старых частиц получаются новые','частицы просто движутся быстрее'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Чем химическая реакция отличается на уровне частиц?') :
          РАЗБОР(ок,['Верно: атомы меняют партнёров и образуют новые частицы.','Так бывает и при таянии льда — это физика. При реакции из атомов собираются <b>новые частицы</b>.'][в]))) +
      (ок ? ПРАВИЛО('Атомы при реакции не исчезают — они <b>перестраиваются</b> в новые частицы.') : '');
  }

  /* 4. Опыт 2: физическое или химическое */
  function F4(s){
    const Н=230, y0=184, n=Math.min(s.я4||0,ЯВЛЕНИЯ.length), отз=s.отз4, все=n>=ЯВЛЕНИЯ.length;
    const i=Math.min(n,ЯВЛЕНИЯ.length-1), Я=ЯВЛЕНИЯ[i], показ=все?7:i;
    const поверх = метка(168,10,все?'все 8 явлений разобраны':(i+1)+' из 8 · '+Я.ф,все?ЗЕ:ЗЛ,{кегль:12}) +
      (отз&&отз.ок&&!все?'':'');
    const кол = (х) => ЯВЛЕНИЯ.filter((x,k)=>k<n&&x.хим===х).map(x=>'<li>'+x.ф+'</li>').join('')||'<li class="пусто">—</li>';
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Физика или химия?') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,сценаЯвления(показ,y0),поверх),Н)}</div>` +
      ТОЧКИ(ЯВЛЕНИЯ.length,все?-1:n,n) +
      (все ? '' : A(3,'карт задача','<span class="метка">Явление '+(i+1)+' из 8</span><div class="текст">«'+Я.ф+'». Какое это явление?</div>') +
        `<div class="ask пара">${['физическое','химическое'].map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r111я("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      A(8,'карт','<span class="метка">Сортировка · '+n+' из 8</span><div class="две-колонки"><div><b>Физические</b><ul>'+кол(0)+'</ul></div><div><b>Химические</b><ul>'+кол(1)+'</ul></div></div>') +
      (все ? ТЕОРИЯ('явления','<b>Физические явления</b> меняют форму, размер или состояние: лёд тает, вода кипит, проволока гнётся, сахар растворяется. <b>Химические явления</b> — реакции: появляются новые вещества, и это выдают признаки — бурый цвет ржавчины, кислый запах молока, свет свечи.') +
        ПРАВИЛО('Спроси себя: <b>осталось ли вещество тем же?</b> Да — физика. Нет — химия.') : '');
  }

  /* 5. Опыт 3: какой газ выделяет сода с уксусом */
  function F5(s){
    const Н=266, y0=210, Л=L_(), ш=Math.min(s.о5||0,ШАГИ5.length), отз=s.о5отз, готово=ш>=ШАГИ5.length;
    const у=y0+14, м=1.15, xК=96, xС=256;
    const муть = ш>=5;
    const пр = Л.колба(xК,у,м,{уровень:ш>=2?.3:0,цвет:'hsla(198,40%,88%,.4)',пузырьки:ш>=2,осадок:ш>=1?{цвет:'#f4f2ec',h:ш>=2?2:4}:null,пробка:ш>=5}) +
      Л.стакан(xС,у,70,84,{уровень:.6,объём:250,цвет:муть?'hsla(40,15%,94%,.85)':'hsla(198,30%,90%,.42)',муть:муть?90:0,мутьЦвет:['#ffffff','#f4f2ec','#e8e4da']});
    const трубка = ш>=5 ? Л.трубка(`M${xК} ${у-100*м} V${у-140} Q${xК} ${у-150} ${xК+10} ${у-150} H${xС-10} Q${xС} ${у-150} ${xС} ${у-140} V${у-16}`) + пузырьки(xС,у-16,у-48,20,8) : '';
    const лучинка = ш===3||ш===4 ? Л.лучинка(xК+2,у-112,-58,'нет') + `<path d="M${xК} ${у-118} q-6 -10 0 -20 q6 -10 0 -20" stroke="#9aa0a6" stroke-width="1.6" fill="none" opacity=".45"/>` : '';
    const поверх = трубка + лучинка +
      (ш===0?метка(168,14,'колба, сода, уксус — и что за газ?',ЗЛ,{кегль:11}):'') +
      (ш===2?метка(190,14,'шипит! выделяется газ',СН,{кегль:11}):'') +
      (ш===3||ш===4?метка(196,14,'лучинка погасла',КР,{кегль:11}):'') +
      (ш>=5?метка(168,10,'известковая вода помутнела',ЗЕ,{кегль:11}):'') +
      Л.имяПрибора(xС,у+12,'известковая вода');
    const ДЕЙ=ШАГИ5[Math.min(ш,ШАГИ5.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='вопрос') кнопки=`<div class="ask">${['газ не поддерживает горения','это кислород'].map((t0,j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r111о5('в"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='газ') кнопки=`<div class="ask три">${['CO₂','O₂','H₂'].map((t0,j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r111о5('г"+j+"')")).join('')}</div>`;
    }
    const ЛОТОК5=[['сода','Сода'],['уксус','Уксус'],['лучинка','Лучинка'],['известковая','Известк. вода'],['спиртовка','Спиртовка'],['йод','Йод'],['кислота','HCl'],['пипетка','Пипетка']];
    const отм={}; ЛОТОК5.forEach(([что])=>{ const i=ШАГИ5.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3 · шаг '+Math.min(ш+1,ШАГИ5.length)+' из '+ШАГИ5.length,'Какой газ выделяется') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ5[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК5,'r111о5',отм)) +
      СПИСОК('Ход опыта',ШАГИ5.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('углекислый газ','Сода с уксусом дают <b>углекислый газ CO₂</b>. Он не горит и не поддерживает горения — лучинка гаснет. С известковой водой CO₂ образует нерастворимый <b>мел</b> — вода мутнеет. Так одна реакция помогает узнать продукт другой.') +
        ДИВО('Подуй через трубочку в известковую воду — она тоже помутнеет. В выдыхаемом воздухе углекислого газа в 100 раз больше, чем во вдыхаемом.') +
        ПРАВИЛО('<b>CO₂</b> узнают по помутнению известковой воды. Горящая лучинка в нём гаснет.') : '');
  }

  /* 6. Ржавление за неделю */
  function F6(s){
    const Н=252, y0=198, Л=L_(), д=s.д6==null?0:s.д6, вид=s.вид6||{0:true}, увидел=вид[7], в=s.ответ6, ок=в===2, р=РЖА[д];
    const у=y0+14, xs=[88,150,212], низ=у-10;
    const гвозди = xs.map((x,i)=>гвоздь(x,низ+12,р[i])).join('');
    const грануляты = Array.from({length:9},(_,k)=>`<circle cx="${xs[0]-5+(k%3)*5}" cy="${низ-8-Math.floor(k/3)*4}" r="2.4" fill="#f4f2ec" stroke="#c8c4b8" stroke-width=".4"/>`).join('');
    const пр = гвозди + Л.штативПробирок(150,у,62,[{уровень:0,подпись:'сухо'},{уровень:.62,подпись:'вода'},{уровень:.62,цвет:д===7?'hsla(30,60%,60%,.5)':Л.цвет('вода'),подпись:'вода + соль'}],1) + грануляты;
    const поверх = метка(168,10,д===0?'день 0: три новых гвоздя':'прошло дней: '+д,д===0?ЗЛ:КР,{кегль:12}) +
      (д>0?xs.map((x,i)=>метка(x,i===1?44:72,['почти нет','ржавчина','много ржавчины'][Math.min(2,Math.floor(р[i]*2.9))]||'',['#9aa3ad','#c86a28','#e86a3a'][i],{кегль:9})).join(''):'');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 4','Ржавление за неделю') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ДНИ.map(дд=>BTN(3,д===дд?'вкл':'',дд===0?'начало':дд+' дней','r111д('+дд+')')).join('')}</div>` +
      СКАЗ('Опыт','Три гвоздя: в сухой пробирке (белые гранулы впитывают влагу), в воде и в солёной воде. Листай дни.') +
      (!увидел ? '' : ОТВЕТЫ('три',['сухо','вода','соль'],2,в,6) +
        (в==null ? СКАЗ('Вопрос','Где гвоздь заржавел сильнее всего?') :
          РАЗБОР(ок,['Без воды железо почти не ржавеет.','В воде ржавеет, но соль ускоряет ржавление ещё сильнее.','Верно: в солёной воде ржавчины больше всего.'][в]))) +
      (ок ? ТЕОРИЯ('ржавчина','Ржавчина — <b>новое вещество</b>: железо соединяется с кислородом и водой. Признак реакции — <b>изменение цвета</b>: серебристый гвоздь становится бурым. Без воды реакция почти не идёт, а соль её ускоряет — поэтому машины быстрее ржавеют там, где зимой посыпают дороги солью.') +
        ДИВО('Эйфелеву башню перекрашивают примерно раз в семь лет — уходит около <b>60 тонн краски</b>. Краска не пускает к железу воду и кислород.') +
        ПРАВИЛО('Железо ржавеет от <b>воды и кислорода</b>; краска, масло и сухость защищают его.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=218, y0=178, Л=L_();
    const пр = колбаШарик(48,y0+14,0.7,true) + колбаОсадок(122,y0+14,0.72,true) + клейстер(196,y0+14,50,58,true) + Л.свеча(272,y0+14,0.9,true);
    const поверх = метка(168,10,'газ · осадок · цвет · свет и тепло',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Химическая реакция</b> — превращение одних веществ в другие.<br>• Её признаки: <b>газ</b>, <b>осадок</b>, <b>изменение цвета или запаха</b>, <b>свет и тепло</b>.<br>• При <b>физических</b> явлениях вещество остаётся прежним: лёд, пар, гнутая проволока.<br>• Один признак ещё не доказательство: пузыри кипящей воды — это пар.<br>• Газ из соды с уксусом — CO₂: гасит лучинку, мутит известковую воду.</div>') +
      ПРАВИЛО('<b>Новое вещество</b> — значит, химия. Признаки помогают его заметить.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.штативПробирок(268,y0+14,30,[0,1,2].map(i=>({уровень:.45,цвет:i<3-ош?СИНИЙ:'hsla(0,0%,60%,.2)'})),0.8) + колбаОсадок(90,y0+14,0.85,true);
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(268,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Теперь химическую реакцию ты узнаешь по признакам.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r111заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r111мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Новое вещество — химическое явление.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какой признак показывает, что идёт химическая реакция?', варианты:[{т:'выделение газа',ок:true},{т:'таяние льда',ок:false}], разбор:'Газ — новое вещество.' },
    { вопрос:'Скисание молока — это…', варианты:[{т:'физическое явление',ок:false},{т:'химическая реакция',ок:true}], разбор:'Образуются новые вещества.' },
    { вопрос:'Кипение воды — это…', варианты:[{т:'физическое явление',ок:true},{т:'химическая реакция',ок:false}], разбор:'Пар — та же вода.' },
    { вопрос:'Ржавление, таяние снега, скисание молока. Сколько химических реакций?', варианты:[{т:'1',ок:false},{т:'2',ок:true}], разбор:'Ржавление и скисание.' },
    { вопрос:'Купорос + щёлочь: голубые хлопья. Признак?', варианты:[{т:'осадок',ок:true},{т:'газ',ок:false}], разбор:'Выпал нерастворимый осадок.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r111Reset()")}</div>` +
        ПРАВИЛО('Газ · осадок · цвет · свет и тепло');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r111Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const доска = (Н,текст,цв,к) => `<rect x="16" y="30" width="304" height="${Н-96}" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/><text x="168" y="${30+(Н-96)/2+6}" text-anchor="middle" font-size="${к||17}" font-weight="bold" fill="${цв||'#f2f5f8'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(текст)}</text>`;
  const Т = {
    т1:{ имя:'Какой признак', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=196, y0=164, отв=ст.ответ!=null;
        const пр = !отв ? колбаОсадок(168,y0+14,0.9,false).replace(КУПОРОС,'hsla(198,40%,88%,.35)') :
          з.пр===0 ? колбаШарик(168,y0+14,0.8,true) : з.пр===1 ? колбаОсадок(168,y0+14,0.9,true) : з.пр===2 ? клейстер(168,y0+14,70,78,true) : L_().свеча(168,y0+14,1.1,true);
        return свгЛ(сцена(Н,y0,пр,метка(168,8,з.ф,ЗЛ,{кегль:з.ф.length>28?10:11})+(отв?метка(268,60,ПРИЗНАКИ[з.пр],ЦВ_ПР[з.пр],{кегль:9}):'')+(ст.серия>=3?метка(60,60,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Физика или химия', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=176, y0=150, отв=ст.ответ!=null;
        const пилюля = (x,t0,ц,горит) => `<rect x="${x-62}" y="78" width="124" height="44" rx="22" fill="${горит?ц:'rgba(12,14,18,.7)'}" fill-opacity="${горит?.28:1}" stroke="${ц}" stroke-width="${горит?2.4:1.2}"/>${тА(x,105,t0,14,горит?'#fff':'#9aa3ad')}`;
        return свгЛ(сцена(Н,y0,'',метка(168,20,з.ф,ЗЛ,{кегль:13})+пилюля(88,'физическое','#7fd1ff',отв&&з.в===0)+пилюля(248,'химическое','#ffb06a',отв&&з.в===1)+(ст.серия>=3?метка(270,130,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Что получилось', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=196, y0=172, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,колбаОсадок(40,y0+14,0.5,true)+Л.свеча(300,y0+14,0.7,true),
          доска(160,отв?з.ф+' → '+з.ок:з.ф+' → ?',отв?'#8fe0b0':'#f2f5f8',(з.ф+з.ок).length>34?12:15)+(ст.серия>=3?метка(270,6,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r111Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r111T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r111TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L111 = {
    id: ID, title: 'Признаки химических реакций', ico: '💥',
    src: 'Химия · 5–6 класс · Химические реакции', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: четыре реакции — газ, осадок, цвет, свет и тепло.',
      'Микромир: лёд тает, магний горит.',
      'Опыт 2: физическое или химическое — восемь явлений.',
      'Опыт 3: какой газ дают сода и уксус.',
      'Опыт 4: ржавление за неделю.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: какой признак.',
      'Тренажёр 2: физика или химия.',
      'Тренажёр 3: что получилось.'
    ],
    check: { q: 'Какой признак показывает, что идёт химическая реакция?', choices: ['Выделение газа','Таяние льда','Кипение воды','Растворение сахара'], ans: 0, exp: 'Газ — новое вещество; таяние, кипение и растворение меняют только состояние вещества.' },
    tasks: [
      { q: 'Почему скисание молока относят к химическим реакциям?', kind: 'choice', choices: ['Меняется только форма','Образуются новые вещества','Оно только нагревается','Ничего не происходит'], ans: 1, tol: 0, hints: ['При химической реакции получаются новые вещества.', 'В скисшем молоке появляются новые вещества с кислым вкусом.'], sol: 'Скисание даёт новые вещества — это химическая реакция.' },
      { q: 'Ржавление железа, таяние снега, скисание молока. Сколько здесь химических реакций?', kind: 'unit', ans: 2, tol: 0, hints: ['Таяние снега: вода остаётся водой.', 'Ржавление и скисание образуют новые вещества.', '2 реакции.'], sol: 'Химических реакций 2: ржавление железа и скисание молока.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.штативПробирок){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L111.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Микромир',4:'Опыт 2',5:'Опыт 3',6:'Опыт 4',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l111n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Признаки химических реакций'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r111Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r111вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r111р=(i)=>{ const s=S(); if(!РЕАКЦИИ[i]) return; s.р2=i; s.отз2=null; chRender(0); };
  window.r111пуск=()=>{ const s=S(); const Р=РЕАКЦИИ[s.р2]; if(!Р) return; const п=Object.assign({},s.пош2||{}); п[Р.к]=true; s.пош2=п;
    s.отз2={ок:true,т:Р.имя+': '+Р.набл+'.'}; chRender(0); };
  window.r111пр=(j)=>{ const s=S(); const Р=РЕАКЦИИ[s.р2]; if(!Р||!(s.пош2||{})[Р.к]) return;
    if(j===Р.пр){ const с=Object.assign({},s.сд2||{}); с[Р.к]=true; s.сд2=с; const все=РЕАКЦИИ.every(x=>с[x.к]); if(все) s.дело_признаки=true;
      s.отз2={ок:true,т:'Верно: '+ПРИЗНАКИ[j]+'. Новое вещество — '+Р.прод+'.'+(все?' Все четыре признака найдены!':' Выбери следующую пару.')}; }
    else s.отз2={ок:false,j:j,т:['Газа здесь не видно — пузырьков нет.','Осадка нет — на дне ничего не появилось.','Посмотри на цвет: он почти не изменился.','Пламени и вспышки здесь нет.'][j]+' Посмотри на сцену ещё раз.'};
    chRender(0); };
  window.r111м=(i)=>{ const s=S(); s.м3=i; const в=Object.assign({},s.вид3||{}); в[i]=true; s.вид3=в; chRender(0); };
  window.r111мст=()=>{ const s=S(); const м=s.м3||0; const ст=Object.assign({},s.ст3||{}); ст[м]=!ст[м]; s.ст3=ст; const в=Object.assign({},s.вид3||{}); в[м]=true; s.вид3=в; chRender(0); };
  window.r111я=(j)=>{ const s=S(); const n=s.я4||0; if(n>=ЯВЛЕНИЯ.length) return; const Я=ЯВЛЕНИЯ[n];
    if(j===Я.хим){ s.я4=n+1; if(s.я4>=ЯВЛЕНИЯ.length) s.дело_явления=true; s.отз4={ок:true,т:'«'+Я.ф+'» — '+(Я.хим?'химическое':'физическое')+'. '+Я.почему}; }
    else s.отз4={ок:false,j:j,т:Я.хим?'Подумай: вещество осталось прежним? Здесь появляется новое вещество.':'Нового вещества здесь не появилось. '+Я.почему};
    chRender(0); };
  const ИМЯ5 = {сода:'соду',уксус:'уксус',лучинка:'лучинку',известковая:'известковую воду',спиртовка:'спиртовку',йод:'йод',кислота:'кислоту',пипетка:'пипетку'};
  window.r111о5=(что)=>{ const s=S(); const ш=s.о5||0; if(ш>=ШАГИ5.length) return; const нужно=ШАГИ5[ш].что;
    const вперёд=(т)=>{ s.о5=ш+1; s.о5отз={ок:true,т:т}; chRender(0); };
    if(что===нужно&&нужно==='сода') return вперёд('В колбе — две ложки питьевой соды.');
    if(что===нужно&&нужно==='уксус') return вперёд('Зашипело! Поднимаются пузырьки газа.');
    if(что===нужно&&нужно==='лучинка') return вперёд('Горящая лучинка в горлышке колбы сразу погасла.');
    if(нужно==='вопрос'&&/^в\d$/.test(что)){ if(что==='в0') return вперёд('Верно: газ не поддерживает горения. В кислороде лучинка, наоборот, вспыхнула бы ярче.');
      s.о5отз={ок:false,j:1,т:'В кислороде лучинка горела бы ещё ярче. А здесь она погасла — газ горения <b>не поддерживает</b>.'}; chRender(0); return; }
    if(что===нужно&&нужно==='известковая') return вперёд('Газ идёт по трубке в известковую воду — она мутнеет, как молоко.');
    if(нужно==='газ'&&/^г\d$/.test(что)){ if(что==='г0') return вперёд('Верно: это углекислый газ CO₂ — он гасит огонь и мутит известковую воду.');
      s.о5отз={ок:false,j:+что[1],т:что==='г1'?'Кислород поддерживает горение — лучинка не погасла бы.':'Водород горит с хлопком, а известковую воду не мутит.'}; chRender(0); return; }
    if(что==='спиртовка'){ s.о5отз={ок:false,т:'Нагревать не нужно — сода с уксусом реагирует сама.'}; chRender(0); return; }
    if(что==='йод'){ s.о5отз={ок:false,т:'Йод — проба на крахмал, а мы ищем газ.'}; chRender(0); return; }
    s.о5отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ5[что]?'Отложи '+ИМЯ5[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ5[ш].т}; chRender(0); };
  window.r111д=(д)=>{ const s=S(); if(!ДНИ.includes(д)) return; s.д6=д; const в=Object.assign({0:true},s.вид6||{}); в[д]=true; s.вид6=в; chRender(0); };
  window.r111мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r111заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r111Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r111Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r111T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r111TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r111Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L111,{__планПорядок:arr[м].__планПорядок}); else arr.push(L111); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU111={render:render, L:L111};
})();
