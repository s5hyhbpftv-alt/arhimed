/* ============ ХИМИЯ · УРОК 52 · «КИСЛОРОД И ГОРЕНИЕ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–42 (манера NOBOOK), «ещё лучше». Карточка 52 из банка подменяется
   этой записью (VISKW[52]). Рисунки — MVP/data/ris_lab.js (window.РЛ).

   ГЛАВНЫЙ ОПЫТ — получение кислорода разложением перманганата калия, как в школьной
   практической работе, со всеми мелочами: прибор на штативе, проверка герметичности
   (обхватить пробирку ладонью — из трубки идут пузырьки), вата у отверстия пробирки,
   пробирка закреплена горлом чуть вниз (конденсат не стечёт на горячее дно), газосборник
   с водой вверх дном в кристаллизаторе, сначала прогревают всю пробирку, первые пузырьки
   (воздух) пропускают, собирают при ровном потоке, закрывают пластинкой под водой,
   СНАЧАЛА выводят трубку из воды и только потом гасят спиртовку (иначе вода втянется и
   пробирка лопнет), проверка тлеющей лучинкой — вспыхивает.
   Опыт 2 — горение угля, серы и железа на воздухе и в кислороде (ложечка для сжигания,
   на дно склянки для железа — немного воды или песка, чтобы окалина не разбила стекло;
   сернистый газ — с резким запахом, опыт под тягой). Треугольник огня и тушение пожара
   (масло на сковороде — крышкой, не водой; электроприбор — обесточить).

   ТЕОРИЯ (8 класс): кислород — бесцветный газ без запаха, немного тяжелее воздуха
   (1,43 г/л против 1,29 г/л), мало растворим в воде; в воздухе ~21 % по объёму. Получение:
   2KMnO₄ →(t) K₂MnO₄ + MnO₂ + O₂↑. Горение — реакция с кислородом с выделением теплоты
   и света; условия: горючее, кислород, температура воспламенения. C + O₂ → CO₂;
   S + O₂ → SO₂; 3Fe + 2O₂ → Fe₃O₄; CH₄ + 2O₂ → CO₂ + 2H₂O. */
(function(){
  'use strict';

  const ID = 52;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'кислород', имя:'Опыт 1: получить кислород', итог:'лучинка вспыхнула'},
    {ключ:'горение',  имя:'Опыт 2: горение в кислороде', итог:'3 из 3'},
    {ключ:'марафон',  имя:'Проверка: марафон',         итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Получить кислород в лаборатории, собрать его, доказать, что это кислород, и сравнить горение веществ на воздухе и в чистом кислороде.'],
    ['Принцип','При нагревании перманганат калия разлагается с выделением кислорода: <b>2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑</b>. Кислород мало растворим в воде — его собирают <b>вытеснением воды</b>. Кислород поддерживает горение: тлеющая лучинка в нём <b>вспыхивает</b>. В чистом кислороде вещества горят ярче, чем на воздухе, где его лишь 21 %.'],
    ['Оборудование','<b>Приборы:</b> штатив с лапкой, пробирка с пробкой и газоотводной трубкой, спиртовка, кристаллизатор, газосборник, стеклянная пластинка, вата, лучинка, ложечка для сжигания.<br><b>Реактивы:</b> перманганат калия KMnO₄, уголь, сера, стальная проволока.'],
    ['Ход работы','1. Собрать прибор и проверить его на герметичность.<br>2. Получить кислород и собрать его над водой.<br>3. Доказать, что это кислород.<br>4. Сжечь уголь, серу и железо в кислороде.<br>5. Записать уравнения.'],
    ['Безопасность','Спиртовку зажигают спичкой, а не от другой спиртовки; гасят колпачком. Пробирку сначала прогревают целиком. <b>Сначала вынуть трубку из воды, потом гасить огонь</b> — иначе вода втянется в горячую пробирку и она лопнет. Сернистый газ ядовит — опыт с серой только под тягой. Горячее стекло выглядит как холодное — не трогай руками.']
  ];
  /* опыт 1 */
  const ШАГИ1 = [
    {т:'Закрепи пробирку в лапке штатива.',                                         что:'штатив'},
    {т:'Проверь прибор на герметичность: конец трубки — в воду, обхвати пробирку ладонью.', что:'герметичность'},
    {т:'Насыпь в пробирку перманганат калия KMnO₄.',                                 что:'kmno4'},
    {т:'Положи у отверстия пробирки комочек ваты.',                                  что:'вата'},
    {т:'Как закрепить пробирку?',                                                    что:'наклон'},
    {т:'Поставь газосборник, заполненный водой, вверх дном в кристаллизатор.',       что:'газосборник'},
    {т:'Зажги спиртовку: сначала прогрей всю пробирку, потом нагревай вещество.',    что:'спиртовка'},
    {т:'Когда подводить трубку под газосборник?',                                    что:'сбор'},
    {т:'Газосборник полон — закрой его пластинкой под водой и вынь.',               что:'пластинка'},
    {т:'Что сделать сначала?',                                                       что:'порядок'},
    {т:'Докажи, что собран кислород.',                                               что:'лучинка'}
  ];
  const ЛОТОК1 = [['штатив','Штатив'],['kmno4','KMnO₄'],['вата','Вата'],['газосборник','Газосборник'],['спиртовка','Спиртовка'],['пластинка','Пластинка'],['лучинка','Лучинка'],['свеча','Свеча']];
  /* опыт 2 */
  const ВЕЩ = [
    {к:'уголь',  имя:'уголь',   воздух:'тлеет красным',         кисл:'ярко раскаляется, белое свечение', прод:'CO₂',   ур:'C + O₂ → CO₂',       вар:['ярко раскаляется','гаснет','плавится'],  в:0},
    {к:'сера',   имя:'сера',    воздух:'бледное синее пламя',   кисл:'яркое сине-фиолетовое пламя',     прод:'SO₂',   ур:'S + O₂ → SO₂',       вар:['гаснет','синее пламя ярче','белый дым'],  в:1},
    {к:'железо', имя:'железо',  воздух:'не горит, только краснеет', кисл:'горит, разбрасывая искры',   прод:'Fe₃O₄', ур:'3Fe + 2O₂ → Fe₃O₄', вар:['не горит','плавится без искр','горит, разбрасывая искры'], в:2}
  ];
  const ТУШЕНИЕ = [
    {ф:'На сковороде вспыхнуло масло.',            вар:['накрыть крышкой','залить водой'],          в:0, р:'Крышка перекроет кислород. Вода на горящем масле мгновенно вскипает и разбрызгивает огонь!'},
    {ф:'Загорелся включённый электрочайник.',      вар:['полить водой','обесточить и накрыть'],     в:1, р:'Сначала отключить ток. Вода проводит ток — можно получить удар.'},
    {ф:'После похода нужно потушить костёр.',      вар:['залить водой и засыпать землёй','уйти — сам погаснет'], в:0, р:'Вода охлаждает, земля перекрывает кислород. Тлеющие угли могут разгореться снова.'},
    {ф:'На человеке загорелась одежда.',           вар:['бежать за помощью','накрыть плотной тканью, повалить и катать'], в:1, р:'Бег раздувает пламя. Плотная ткань и катание перекрывают доступ кислорода.'}
  ];
  const МИКРО = [
    {ур:'C + O₂ → CO₂',          слева:[['C',1],['O2',1]],   справа:[['CO2',1]]},
    {ур:'S + O₂ → SO₂',          слева:[['S',1],['O2',1]],   справа:[['SO2',1]]},
    {ур:'CH₄ + 2O₂ → CO₂ + 2H₂O', слева:[['CH4',1],['O2',2]], справа:[['CO2',1],['H2O',2]]}
  ];
  const МАРАФОН = [
    {q:'Сколько кислорода в воздухе (по объёму)?', вар:['78 %','21 %','1 %'], в:1, р:'Азота около 78 %, кислорода около 21 %.'},
    {q:'Как доказать, что в сосуде кислород?', вар:['известковой водой','тлеющей лучинкой','на вкус'], в:1, р:'Тлеющая лучинка в кислороде вспыхивает.'},
    {q:'Почему кислород можно собирать над водой?', вар:['он тяжелее воды','он мало растворим в воде','он реагирует с водой'], в:1, р:'Кислород плохо растворяется в воде и вытесняет её.'},
    {q:'Что делают сначала по окончании опыта?', вар:['гасят спиртовку','вынимают трубку из воды','снимают пробку'], в:1, р:'Иначе вода втянется в горячую пробирку.'},
    {q:'C + O₂ → ?', вар:['CO₂','CO₃','C₂O'], в:0, р:'Углерод сгорает в углекислый газ.'},
    {q:'3Fe + ?O₂ → Fe₃O₄', вар:['1','2','4'], в:1, р:'Справа 4 атома O — нужно 2 молекулы O₂.'},
    {q:'Что НЕ является условием горения?', вар:['кислород','горючее','вода'], в:2, р:'Нужны горючее, кислород и температура воспламенения.'},
    {q:'Горит масло на сковороде. Как тушить?', вар:['водой','крышкой','вентилятором'], в:1, р:'Крышка перекрывает кислород; вода разбрызгает горящее масло.'},
    {q:'CH₄ + 2O₂ → CO₂ + ?H₂O', вар:['1','2','4'], в:1, р:'Слева 4 атома H — справа 2 молекулы H₂O.'},
    {q:'Зачем пробирку с KMnO₄ закрепляют горлом чуть вниз?', вар:['чтобы быстрее грелась','чтобы вода не стекла на горячее дно','так красивее'], в:1, р:'Капли конденсата стекают к горлу, а не на раскалённое стекло.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['углерод C','CO₂','CO₃'],['сера S','SO₂','SO₄'],['магний Mg','MgO','MgO₂'],['водород H₂','H₂O','H₂O₂'],['метан CH₄','CO₂ и H₂O','C и H₂'],['фосфор P','P₂O₅','PO'],['железо Fe','Fe₃O₄','Fe₂'],['кальций Ca','CaO','CaO₂'],
    ['алюминий Al','Al₂O₃','AlO'],['цинк Zn','ZnO','Zn₂O'],['уголь C','CO₂','CH₄'],['водород H₂','H₂O','O₃'],['сера S','SO₂','H₂S'],['метан CH₄','CO₂ и H₂O','CO₂ и H₂'],['магний Mg','MgO','Mg(OH)₂'],['фосфор P','P₂O₅','H₃PO₄']]
    .map(([в0,ок,нет])=>({q:'Что получится при горении: '+в0+' в кислороде?', в0:в0, ок:ок, нет:нет, раз:'Продукт горения простого вещества — его оксид: '+ок+'.'})));
  const УСЛ = ['кислород','температуру','горючее'];
  const П2 = [['Свечу накрыли стаканом.',0],['Костёр залили водой.',1],['Перекрыли газ в плите.',2],['Горящее масло накрыли крышкой.',0],['Лесной пожар окопали канавой.',2],['Огонь засыпали песком.',0],
    ['Горячие угли облили водой.',1],['Задули спичку.',1],['Убрали дрова от огня.',2],['Сковороду накрыли мокрым полотенцем.',0],['Перекрыли кран спиртовки колпачком.',0],['Пожарные охлаждают стену водой.',1],
    ['Выкрутили фитиль из керосинки.',2],['Огнетушитель выпустил пену.',0],['Свечу опустили в банку с углекислым газом.',0],['Отсекли поток бензина к пламени.',2]]
    .map(([ф,в])=>({q:ф+' Какое условие горения устранили?', ф:ф, вар:УСЛ, в:в, раз:в===0?'Перекрыли доступ кислорода.':в===1?'Охладили ниже температуры воспламенения.':'Убрали горючее вещество.'}));
  const П3 = поМесту([['?C + O₂ → CO₂','1','2'],['S + ?O₂ → SO₂','1','2'],['?Mg + O₂ → 2MgO','2','1'],['2H₂ + ?O₂ → 2H₂O','1','2'],['CH₄ + ?O₂ → CO₂ + 2H₂O','2','1'],['4P + ?O₂ → 2P₂O₅','5','4'],['3Fe + ?O₂ → Fe₃O₄','2','3'],['?Ca + O₂ → 2CaO','2','1'],
    ['4Al + ?O₂ → 2Al₂O₃','3','2'],['?Zn + O₂ → 2ZnO','2','1'],['2KMnO₄ → K₂MnO₄ + MnO₂ + ?O₂','1','2'],['?H₂ + O₂ → 2H₂O','2','1'],['C + O₂ → ?CO₂','1','2'],['2Cu + O₂ → ?CuO','2','1'],['?P + 5O₂ → 2P₂O₅','4','2'],['CH₄ + 2O₂ → CO₂ + ?H₂O','2','4']]
    .map(([у,ок,нет])=>({q:'Коэффициент вместо «?»: '+у, у:у, ок:ок, нет:нет, раз:'Ответ '+ок+': атомов каждого элемента слева и справа поровну.'})));

  const CSS=`
  #lvis .s6.l52n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l52n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l52n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l52n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l52n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l52n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l52n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l52n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l52n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l52n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l52n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l52n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l52n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l52n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l52n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l52n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l52n table.итоги td{white-space:normal!important}
  #lvis .s6.l52n table.итоги td:first-child{width:46%}
  #lvis .s6.l52n table.итоги{table-layout:fixed}
  #lvis .s6.l52n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l52n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l52n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l52n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l52n .ask button{text-align:left}
  #lvis .s6.l52n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l52n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l52n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l52n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l52n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l52n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l52n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l52n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l52n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l52n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l52n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l52n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l52n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l52n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l52n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l52n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l52n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l52n .плитка span{text-align:center}
  #lvis .s6.l52n .плитка:active{transform:scale(.96)}
  #lvis .s6.l52n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l52n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l52n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l52n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l52n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l52n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l52n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l52n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l52n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l52n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l52n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l52n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l52n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l52n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l52n{gap:14px}
  #lvis .s6.l52n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l52n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l52n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l52n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l52n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l52n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l52n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l52n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l52n .карт .текст b{color:${GOLD}}
  #lvis .s6.l52n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l52n .правило b{color:${GOLD}}
  #lvis .s6.l52n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l52n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l52n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l52n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l52n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l52n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l52n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l52n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l52n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l52n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l52n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l52n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l52n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l52n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l52n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l52n .буйки button.мимо{border-color:${RED};animation:l52nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l52nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l52n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l52n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l52n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l52n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l52n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l52n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l52n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l52n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l52n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l52n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l52n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l52n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l52n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l52n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l52n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l52n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l52n .уровни .точка.сейчас{background:${GOLD};animation:l52ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l52ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l52n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l52n{-webkit-text-size-adjust:100%}
  #lvis .s6.l52n [data-anim]{animation:l52nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l52nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l52n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l52n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l52n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l52n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l52n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l52n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l52n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l52n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l52n [data-anim]{animation:none!important}
    #lvis .s6.l52n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l52n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l52n-style');
      if(!s){ s=document.createElement('style'); s.id='l52n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r52Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c52-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c52-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c52-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c52-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c52-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c52-плиты)"/>
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

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=240, y0=186, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.штатив(24,y0+14,120,y0-58,56) + Л.пробиркаKMnO4(48,y0-58,6,{вата:true,пробка:true}) + Л.спиртовка(72,y0+14,0.8,false) +
      Л.кристаллизатор(250,y0+14,100,36,{внутри:Л.газосборник(258,y0+6,30,72,{вода:1,безТени:true})}) + Л.банка(316,y0+12,24,36,{стекло:'янтарь',надпись:['KMnO₄'],мал:true});
    const поверх = Л.трубка(`M146 ${y0-49} H184 Q194 ${y0-49} 194 ${y0-38} V${y0+4} Q194 ${y0+8} 202 ${y0+8} H252 V${y0+2}`) + метка(168,16,'Кислород: получение и горение',ЗЛ,{кегль:12}) +
      Л.лучинка(150,96,-24,'тлеет') + Л.имяПрибора(60,y0+30,'прибор на штативе') + Л.имяПрибора(250,y0+30,'сбор над водой');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Кислород и горение') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r52вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок — в «Безопасности» правило, которое спасает пробирку.') :
        ОТВЕТЫ('',['сначала вынуть трубку из воды, потом гасить спиртовку','сначала погасить спиртовку, потом вынуть трубку'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Как правильно закончить опыт с получением газа над водой?') :
          РАЗБОР(ок,['Верно: если сначала погасить огонь, пробирка остынет, давление в ней упадёт и вода втянется в горячее стекло — оно лопнет.',
            'Опасно! Пробирка остынет, вода втянется по трубке в горячее стекло — пробирка лопнет. Сначала трубку из воды.'][в]))) +
      (ок ? ПРАВИЛО('<b>Сначала трубка из воды — потом огонь гасим.</b>') : '');
  }

  /* 2. Свойства кислорода и способы сбора */
  function F2(s){
    const Н=240, y0=190, Л=L_(), в=s.ответ2, ок=в===0, в2=s.ответ2б, ок2=в2===0, воздух=!!s.возд2;
    const пр = Л.кристаллизатор(70,y0+14,96,34,{внутри:Л.газосборник(70,y0+6,30,70,{газ:'O2',вода:.15,безТени:true})}) +
      Л.газосборник(200,y0+14,34,74,{газ:'O2',пластинка:false});
    const поверх = (ок?Л.лучинка(214,y0-82,-30,'горит'):Л.лучинка(214,y0-82,-30,'тлеет')) +
      метка(70,16,'вытеснение воды',СН,{кегль:11}) + метка(214,16,'вытеснение воздуха',ЗЕ,{кегль:11}) +
      (воздух?`<g transform="translate(286 120)">${Л.диаграмма(0,0,30,0.21,'#7fd1ff').replace('#3a8ac8','#5a6a8a')}</g>`+метка(286,160,'O₂ 21 %, N₂ 78 %',СН,{кегль:10}):'');
    return ЖУРНАЛ(s) + ШАПКА('Свойства кислорода','Как его собирают') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТЕОРИЯ('кислород','Кислород O₂ — <b>бесцветный газ без запаха и вкуса</b>, немного <b>тяжелее воздуха</b> (1 л — 1,43 г, воздух — 1,29 г) и <b>мало растворим в воде</b>. Поэтому его собирают двумя способами: <b>вытеснением воды</b> и <b>вытеснением воздуха</b>.') +
      `<div class="ask">${BTN(5,воздух?'hit':'',воздух?'Состав воздуха: O₂ 21 %, N₂ 78 %, прочие 1 %':'Показать состав воздуха',"r52возд()")}</div>` +
      ОТВЕТЫ('',['горлом вверх — кислород тяжелее воздуха','горлом вниз'],0,в,2) +
      (в==null ? СКАЗ('Вопрос','Как держать сосуд при сборе кислорода вытеснением воздуха?') :
        РАЗБОР(ок,['Верно: тяжёлый кислород опускается на дно и вытесняет воздух вверх. Наполнение проверяют тлеющей лучинкой у отверстия — она вспыхивает.',
          'Горлом вниз собирают лёгкие газы (водород). Кислород тяжелее воздуха — сосуд держат <b>горлом вверх</b>.'][в])) +
      (ок ? ОТВЕТЫ('пара',['тлеющей лучинкой','горящей спичкой в воду'],0,в2,'2б') + (в2==null?'':РАЗБОР(ок2,['Верно: в кислороде тлеющая лучинка вспыхивает ярким пламенем.','Узнают тлеющей лучинкой — она вспыхивает.'][в2])) : '') +
      (ок&&ок2 ? ПРАВИЛО('Кислород собирают <b>вытеснением воды</b> или <b>воздуха</b> (сосуд горлом вверх). Распознают <b>тлеющей лучинкой</b> — вспыхивает.') : '');
  }

  /* 3. Опыт 1: получение кислорода */
  function F3(s){
    const Н=262, y0=200, Л=L_(), ш=Math.min(s.о1||0,ШАГИ1.length), отз=s.о1отз, готово=ш>=ШАГИ1.length;
    const трX=150, трY=y0-62, наклон=ш>=5?6:0, горит=ш>=7&&ш<10, собрано=ш>=8, вынут=ш>=9;
    const устьеY=трY+(наклон?9:0);
    const в=собрано?(s.о1пузыри?0.08:1):1;
    const пр = (ш>=1?Л.штатив(28,y0+14,130,трY-6,60):'') +
      (ш>=1?Л.пробиркаKMnO4(60,трY,наклон,{вещество:ш>=3,вата:ш>=4,пробка:ш>=1,пары:горит,остаток:ш>=10}):'') +
      (ш>=7||s.о1лампа?Л.спиртовка(84,y0+14,0.85,горит):'') +
      (ш===1?Л.стакан(208,y0+14,46,54,{уровень:.6,объём:100}):'') +
      (ш>=6?Л.кристаллизатор(262,y0+14,104,38,{внутри:вынут?'':Л.газосборник(270,y0+6,30,78,{газ:'O2',вода:в,безТени:true})}):'') +
      (вынут?Л.газосборник(312,y0+14,30,78,{газ:'O2',пластинка:!готово}) : '');
    const трубкаД = ш===1 ? `M158 ${устьеY} H198 Q206 ${устьеY} 206 ${устьеY+10} V${y0}` :
      ш>=6&&ш<10 ? `M158 ${устьеY} H196 Q206 ${устьеY} 206 ${устьеY+10} V${y0+4} Q206 ${y0+8} 214 ${y0+8} H${собрано?266:236} V${y0+(собрано?2:6)}` :
      ш>=2 ? `M158 ${устьеY} H190 Q200 ${устьеY} 200 ${устьеY+12} V${y0-10}` : '';
    const поверх = (трубкаД?Л.трубка(трубкаД):'') +
      (ш===1&&s.о1рука?Л.пузыри(206,y0+4,y0-20,5)+метка(208,16,'пузырьки есть — прибор герметичен',ЗЕ,{кегль:10}):'') +
      (ш===0?метка(168,Н/2-50,'начни со штатива',null,{кегль:11}):'') +
      (горит?метка(120,16,'2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑',СН,{кегль:11}):'') +
      (горит&&собрано?Л.пузыри(266,y0+6,y0-60,6):'') + (ш===8&&!собрано?Л.пузыри(236,y0+6,y0-12,4):'') +
      (ш===10?метка(220,16,'вода втянется, если погасить раньше!',КР,{кегль:10}):'') +
      (готово?Л.лучинка(326,y0-70,-120,'горит')+метка(250,16,'лучинка вспыхнула — это кислород!',ЗЕ,{кегль:11}):'');
    const ДЕЙ=ШАГИ1[Math.min(ш,ШАГИ1.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='герметичность') кнопки=`<div class="ask">${BTN(5,'','Обхватить пробирку ладонью',"r52о1('рука')")}</div>`;
      if(ДЕЙ==='наклон') кнопки=`<div class="ask три">${['горлом слегка вниз','горлом вверх','вертикально'].map((t0,j)=>BTN(5+j,'',t0,"r52о1('н"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='сбор') кнопки=`<div class="ask">${['сразу, как пошли первые пузырьки','когда пузырьки пойдут ровно и часто'].map((t0,j)=>BTN(5+j,'',t0,"r52о1('с"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='порядок') кнопки=`<div class="ask">${['вынуть трубку из воды','погасить спиртовку'].map((t0,j)=>BTN(5+j,'',t0,"r52о1('п"+j+"')")).join('')}</div>`;
    }
    const отм={}; ЛОТОК1.forEach(([что])=>{ const i=ШАГИ1.findIndex(x=>x.что===что); if(i>=0&&i<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1 · шаг '+Math.min(ш+1,ШАГИ1.length)+' из '+ШАГИ1.length,'Получение кислорода') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача'+(ДЕЙ==='порядок'?' опасно':''),'<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ1[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК1,'r52о1',отм)) +
      СПИСОК('Ход опыта',ШАГИ1.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('вывод опыта 1','При нагревании перманганат калия разложился: <b>2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑</b>. Кислород собрали вытеснением воды — он в ней мало растворим. Тлеющая лучинка в нём вспыхнула: кислород <b>поддерживает горение</b>. В пробирке остался тёмный порошок — смесь K₂MnO₄ и MnO₂.') +
        `<div class="ask">${BTN(10,'','Повторить опыт',"r52о1сброс()")}</div>` : '');
  }

  /* 4. Опыт 2: горение в кислороде */
  function F4(s){
    const Н=250, y0=196, Л=L_(), к=s.в4, сдел=s.сдел4||{}, фаза=s.ф4||0, отз=s.о2отз, все=ВЕЩ.every(x=>сдел[x.к]);
    const В=к==null?null:ВЕЩ[к];
    const дно = В&&В.к==='железо' ? `<rect x="166" y="${y0+4}" width="44" height="8" fill="${L_().цвет('вода')}"/>` : '';
    const пр = Л.газосборник(188,y0+14,48,100,{газ:'O2',внутри:дно+(В&&фаза>=2?Л.ложечка(188,y0-40,В.к,true,true):'')}) +
      Л.спиртовка(66,y0+14,0.9,!!В&&фаза===1) + (В&&фаза===1?'':'') + Л.банка(300,y0+12,30,44,{содержимое:'железо',надпись:['C · S · Fe'],мал:true});
    const поверх = (В&&фаза===1?Л.ложечка(66,y0-46,В.к,true,false):'') + (В&&фаза===0?Л.ложечка(120,y0-10,В.к,false,false):'') +
      (В?метка(188,16,фаза===0?В.имя+': сначала на воздухе':фаза===1?'на воздухе: '+В.воздух:'в кислороде: '+В.кисл,фаза===2?ЗЕ:ЗЛ,{кегль:10}):метка(168,16,'склянка с кислородом',СН,{кегль:11})) +
      (В&&В.к==='сера'?метка(300,62,'под тягой!',КР,{кегль:10}):'') + (В&&В.к==='железо'?метка(270,96,'на дне — вода',СН,{кегль:9}):'');
    const отм={}; ВЕЩ.forEach(x=>{ отм[x.к]=сдел[x.к]?'done':''; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Горение на воздухе и в кислороде') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="лоток" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ВЕЩ.map((x,i)=>`<button type="button" class="плитка ${отм[x.к]}${к===i?' вкл':''}" onclick="r52в(${i})"><svg viewBox="0 0 64 64" aria-hidden="true">${Л.defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${Л.часовое(32,48,50,x.к,9)}</svg><span>${x.имя}</span></button>`).join('')}</div>` +
      (В&&фаза===0 ? `<div class="ask">${BTN(5,'','Поджечь в пламени спиртовки',"r52ф()")}</div>` : '') +
      (В&&фаза===1 ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">На воздухе '+В.имя+' '+В.воздух+'. Что будет в чистом кислороде?</div>')+`<div class="ask три">${В.вар.map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r52пред("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !В ? СКАЗ('Опыт','Выбери вещество на ложечке для сжигания.') : '') +
      A(8,'карт','<span class="метка">Таблица наблюдений · '+ВЕЩ.filter(x=>сдел[x.к]).length+' из 3</span><table class="итоги узкая"><tr><th>Вещество</th><th>воздух</th><th>кислород</th><th>продукт</th></tr>'+
        ВЕЩ.map(x=>сдел[x.к]?`<tr><td>${x.имя}</td><td>${x.воздух}</td><td>${x.кисл}</td><td>${x.прод}</td></tr>`:`<tr class="пусто"><td>${x.имя}</td><td>—</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('уравнения','<b>C + O₂ → CO₂</b> · <b>S + O₂ → SO₂</b> · <b>3Fe + 2O₂ → Fe₃O₄</b> (железная окалина). В кислороде горение ярче: молекул O₂ у вещества в 5 раз больше, чем на воздухе.') +
        ДИВО('Зачем на дно склянки наливают воду, когда сжигают железо? Раскалённые капли окалины падают вниз — без воды или песка они расплавили бы и разбили стекло.') : '') +
      (все ? ПРАВИЛО('<b>Горение</b> — реакция вещества с кислородом с выделением теплоты и света. В чистом кислороде вещества горят <b>ярче</b>, чем на воздухе.') : '');
  }

  /* 5. Микромир горения */
  function F5(s){
    const Н=230, y0=206, Л=L_(), к=s.м5==null?0:s.м5, ст=Math.min((s.мст5||{})[к]||0,1), в=s.ответ5, ок=в===0;
    const Р=МИКРО[к];
    const ряд=(список,x0)=>{ let out='', y=60; список.forEach(([м,n])=>{ for(let i=0;i<n;i++){ out+=Л.молекула(x0+(i%2)*56,y+Math.floor(i/2)*0+(i)*0,1,м,{подписи:true}); y+=0; } y+=70; }); return out; };
    const лево = Р.слева.map(([м,n],i)=>Array.from({length:n},(_,j)=>Л.молекула(60+j*60,70+i*80,1.05,м,{подписи:true})).join('')).join('');
    const право = Р.справа.map(([м,n],i)=>Array.from({length:n},(_,j)=>Л.молекула(220+j*60,70+i*80,1.05,м,{подписи:true})).join('')).join('');
    const поверх = (ст===0?лево:право) + `<path d="M150 112 H184 M178 106 L186 112 L178 118" stroke="${ст?'#8fd1a8':'#6a7480'}" stroke-width="2.4" fill="none"/>` + метка(168,Н-36,Р.ур,ЗЕ,{кегль:13});
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Что происходит при горении') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(3,minmax(0,1fr))">${МИКРО.map((x,i)=>BTN(3,к===i?'вкл':'',['уголь','сера','метан'][i],'r52м('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,'',ст===0?'Сжечь →':'Вернуть исходные молекулы',"r52мст()")}</div>` +
      ТЕОРИЯ('горение','При горении молекулы кислорода соединяются с горючим веществом: получаются <b>оксиды</b> — CO₂, SO₂, H₂O. Атомы не исчезают: углерод из угля и метана уходит в воздух в составе углекислого газа.') +
      ОТВЕТЫ('пара',['CO₂ и H₂O','C и H₂'],0,в,5) +
      (в==null ? СКАЗ('Вопрос','Что получается при полном сгорании метана (природного газа)?') :
        РАЗБОР(ок,['Верно: CH₄ + 2O₂ → CO₂ + 2H₂O — углекислый газ и вода.','Метан соединяется с кислородом: получаются <b>CO₂ и H₂O</b>.'][в])) +
      (ок ? ПРАВИЛО('Продукты полного горения веществ из углерода и водорода — <b>CO₂ и H₂O</b>.') : '');
  }

  /* 6. Треугольник огня и тушение */
  function F6(s){
    const Н=230, y0=196, Л=L_(), вкл=Object.assign({г:1,к:1,т:1},s.тр6||{}), горит=вкл.г&&вкл.к&&вкл.т, n=Math.min(s.туш6||0,ТУШЕНИЕ.length), отз=s.отз6, все=n>=ТУШЕНИЕ.length;
    const пр = Л.свеча(270,y0+14,1.1,горит&&!(!вкл.к),!вкл.к) + (!вкл.т?`<path d="M240 ${y0-110} q20 -6 40 4" stroke="#7fd1ff" stroke-width="3" fill="none" stroke-dasharray="3 4"/>`:'') + (!вкл.г?'':'');
    const поверх = Л.треугольникОгня(110,110,62,вкл) + метка(270,16,горит?'горит':'погасла',горит?ЗЛ:СН,{кегль:12}) + (!вкл.г?метка(270,y0-20,'фитиль убран',null,{кегль:9}):'');
    const з=ТУШЕНИЕ[Math.min(n,ТУШЕНИЕ.length-1)];
    return ЖУРНАЛ(s) + ШАПКА('Треугольник огня','Условия горения и тушение') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,!вкл.г?Л.свеча(270,y0+14,1.1,false,false).replace('<path d="M0 -40 V-46"','<path d="M0 -40 V-40"'):пр,поверх),Н)}</div>` +
      `<div class="ask три">${[['к','накрыть стаканом'],['т','охладить водой'],['г','убрать горючее']].map(([кл,t0],i)=>BTN(3+i,вкл[кл]?'':'hit',(вкл[кл]?'':'✓ ')+t0,"r52тр('"+кл+"')")).join('')}</div>` +
      ТЕОРИЯ('условия горения','Для горения нужны три условия: <b>горючее вещество</b>, <b>кислород</b> и <b>температура воспламенения</b>. Убери любое — огонь погаснет. На этом основано тушение: накрыть (нет кислорода), охладить водой (нет температуры), убрать горючее.') +
      (все ? РАЗБОР(true,'Все четыре случая разобраны.') :
        A(8,'карт задача','<span class="метка">Пожар · '+(n+1)+' из 4</span><div class="текст">'+з.ф+' Как тушить?</div>') +
        `<div class="ask">${з.вар.map((t0,j)=>BTN(9+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r52туш("+j+")")).join('')}</div>` +
        (отз ? РАЗБОР(отз.ок,отз.т) : '')) +
      (все ? ПРАВИЛО('Горящее <b>масло</b> и <b>электроприборы</b> водой не тушат. Огонь гасят, убирая одно из условий: кислород, температуру или горючее.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=210, y0=176, Л=L_();
    const пр = Л.газосборник(60,y0+14,40,80,{газ:'O2',пластинка:true}) + Л.свеча(140,y0+14,0.9,true) + Л.газосборник(220,y0+14,40,80,{газ:'O2',внутри:Л.ложечка(220,y0-30,'сера',true,true)}) + Л.спиртовка(296,y0+14,0.8,true);
    const поверх = Л.лучинка(80,y0-90,-40,'горит') + метка(168,12,'кислород поддерживает горение',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Кислород получают разложением KMnO₄: <b>2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑</b>.<br>• Собирают вытеснением воды или воздуха (горлом вверх); узнают тлеющей лучинкой.<br>• Горение — реакция с кислородом с теплотой и светом; продукты — оксиды.<br>• Условия горения: горючее, кислород, температура. Убери одно — огонь погаснет.<br>• Сначала трубку из воды, потом гасим огонь.</div>') +
      ПРАВИЛО('<b>Нет кислорода — нет огня.</b>');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.свеча(228+i*40,y0+14,0.8,i<3-ош)).join('') + Л.газосборник(84,y0+14,40,80,{газ:'O2'});
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(120,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(268,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! О кислороде и горении ты знаешь главное.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r52заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r52мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Горючее + кислород + температура = огонь.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Какой газ поддерживает горение?', варианты:[{т:'кислород',ок:true},{т:'азот',ок:false}], разбор:'Кислород.' },
    { вопрос:'Чем распознают кислород?', варианты:[{т:'известковой водой',ок:false},{т:'тлеющей лучинкой',ок:true}], разбор:'Лучинка вспыхивает.' },
    { вопрос:'C + O₂ → ?', варианты:[{т:'CO₂',ок:true},{т:'CH₄',ок:false}], разбор:'Углекислый газ.' },
    { вопрос:'Горит масло на сковороде. Что делать?', варианты:[{т:'залить водой',ок:false},{т:'накрыть крышкой',ок:true}], разбор:'Перекрыть кислород.' },
    { вопрос:'Кислород собирают вытеснением воды, потому что он…', варианты:[{т:'мало растворим в воде',ок:true},{т:'тяжелее воды',ок:false}], разбор:'Плохо растворяется — вытесняет воду.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r52Reset()")}</div>` +
        ПРАВИЛО('<b>Нет кислорода — нет огня.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r52Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const доска = (Н,текст,цв) => `<rect x="16" y="34" width="304" height="${Н-104}" rx="10" fill="rgba(12,14,18,.7)" stroke="#4a525c"/><text x="168" y="${34+(Н-104)/2+8}" text-anchor="middle" font-size="22" font-weight="bold" fill="${цв||'#f2f5f8'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(текст)}</text>`;
  const Т = {
    т1:{ имя:'Продукт горения', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.газосборник(40,y0+14,30,60,{газ:'O2'})+Л.спиртовка(296,y0+14,0.7,true),доска(Н,з.в0+(отв?' → '+з.ок:''),отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Что устранили', пул:П2, класс:'три',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=150, отв=ст.ответ!=null;
        const вкл={г:1,к:1,т:1}; if(отв) вкл[['к','т','г'][з.в]]=0;
        return свгЛ(сцена(Н,y0,Л.свеча(270,y0+14,1,!отв,отв&&з.в===0),Л.треугольникОгня(110,88,52,вкл)+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Уравняй горение', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.газосборник(40,y0+14,30,60,{газ:'O2'})+Л.свеча(296,y0+14,0.7,true),доска(Н,отв?з.у.replace('?',з.ок):з.у,отв?'#8fe0b0':'#f2f5f8')+(ст.серия>=3?метка(270,10,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r52Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r52T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r52TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L52 = {
    id: ID, title: 'Кислород и горение', ico: '🔥',
    src: 'Химия · 5–6 класс · Реакции', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Свойства кислорода и способы его сбора.',
      'Опыт 1: получение кислорода из перманганата калия.',
      'Опыт 2: горение угля, серы и железа в кислороде.',
      'Микромир: что происходит при горении.',
      'Треугольник огня и тушение пожара.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: продукт горения.',
      'Тренажёр 2: что устранили.',
      'Тренажёр 3: уравняй горение.'
    ],
    check: { q: 'Что обязательно нужно для горения?', choices: ['Кислород','Азот','Вода','Стекло'], ans: 0, exp: 'Горение — реакция с кислородом.' },
    tasks: [
      { q: 'В реакции CH₄ + 2O₂ → CO₂ + ?H₂O. Коэффициент перед водой?', kind: 'unit', ans: 2, tol: 0, hints: ['Слева 4 водорода.', 'В H₂O два водорода.', '4 : 2 = 2.'], sol: 'CH₄ + 2O₂ → CO₂ + 2H₂O.' },
      { q: 'Какой газ поддерживает горение?', kind: 'choice', choices: ['Углекислый газ','Кислород','Азот','Водород'], ans: 1, tol: 0, hints: ['Без него огонь гаснет.', 'Кислород.'], sol: 'Горение поддерживает кислород.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.ложечка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L52.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Свойства кислорода',3:'Опыт 1',4:'Опыт 2',5:'Микромир',6:'Треугольник огня',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l52n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Кислород'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r52Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r52вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r52возд=()=>{ const s=S(); s.возд2=true; chRender(0); };
  const ИМЯ = {штатив:'штатив',kmno4:'KMnO₄',вата:'вату',газосборник:'газосборник',спиртовка:'спиртовку',пластинка:'пластинку',лучинка:'лучинку',свеча:'свечу'};
  window.r52о1=(что)=>{ const s=S(); const ш=s.о1||0; if(ш>=ШАГИ1.length) return; const нужно=ШАГИ1[ш].что;
    const вперёд=(т)=>{ s.о1=ш+1; s.о1отз={ок:true,т:т}; if(s.о1>=ШАГИ1.length) s.дело_кислород=true; chRender(0); };
    if(что===нужно&&['штатив','kmno4','вата','газосборник','пластинка','лучинка'].includes(нужно))
      return вперёд({штатив:'Пробирка закреплена в лапке штатива — ближе к отверстию.',kmno4:'Насыпали немного KMnO₄ — тёмно-фиолетовые кристаллы на дне.',вата:'Вата у отверстия не пустит частицы KMnO₄ в газоотводную трубку.',
        газосборник:'Газосборник полон воды и стоит вверх дном в кристаллизаторе — воздух в него не попал.',пластинка:'Под водой газосборник закрыт стеклянной пластинкой и вынут.',лучинка:'Тлеющая лучинка в газосборнике ярко вспыхнула — это кислород!'}[нужно]);
    if(нужно==='герметичность'&&что==='рука'){ if(!s.о1рука){ s.о1рука=true; s.о1отз={ок:true,т:'Ладонь нагрела воздух в пробирке — он расширился, и из трубки вышли пузырьки. Прибор герметичен.'}; chRender(0); return; }
      return вперёд('Проверка пройдена: прибор не пропускает воздух.'); }
    if(нужно==='наклон'&&/^н\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: горлом чуть вниз — капли воды стекут к отверстию, а не на раскалённое дно, и пробирка не треснет.');
      s.о1отз={ок:false,т:j===1?'Горлом вверх капли конденсата стекут на горячее дно — стекло треснет.':'Вертикально неудобно греть и тоже опасно: вода стечёт на дно. Горлом слегка вниз.'}; chRender(0); return; }
    if(нужно==='спиртовка'&&что==='спиртовка'){ s.о1лампа=true; return вперёд('Спиртовка зажжена спичкой. Пробирку прогрели целиком, теперь пламя — под веществом. Пошли пузырьки.'); }
    if(нужно==='сбор'&&/^с\d$/.test(что)){ const j=+что[1]; if(j===1){ s.о1пузыри=true; return вперёд('Верно: первые пузырьки — воздух из пробирки. Когда поток стал ровным, трубку подвели под газосборник: кислород вытесняет воду.'); }
      s.о1отз={ок:false,т:'Первые пузырьки — это воздух, который был в пробирке. Его пропускают, иначе кислород будет с примесью воздуха.'}; chRender(0); return; }
    if(нужно==='порядок'&&/^п\d$/.test(что)){ const j=+что[1]; if(j===0) return вперёд('Верно: трубка вынута из воды, и только потом колпачком погашена спиртовка.');
      s.о1отз={ок:false,т:'Стоп! Если погасить огонь, газ в пробирке остынет, давление упадёт — вода из кристаллизатора по трубке втянется в горячую пробирку, и она лопнет.'}; chRender(0); return; }
    if(нужно==='лучинка'&&что==='свеча'){ s.о1отз={ок:false,т:'Горящая свеча тоже вспыхнет, но классическая проба — тлеющая лучинка: она загорается только в кислороде.'}; chRender(0); return; }
    if(что==='спиртовка'&&ш<6){ s.о1отз={ок:false,т:'Рано зажигать огонь: прибор ещё не собран.'}; chRender(0); return; }
    s.о1отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ1[ш].т}; chRender(0); };
  window.r52о1сброс=()=>{ const s=S(); s.о1=0; s.о1отз=null; s.о1рука=false; s.о1пузыри=false; s.о1лампа=false; chRender(0); };
  window.r52в=(i)=>{ const s=S(); s.в4=i; s.ф4=(s.сдел4||{})[ВЕЩ[i].к]?2:0; s.о2отз=null; chRender(0); };
  window.r52ф=()=>{ const s=S(); if(s.в4==null) return; s.ф4=1; s.о2отз=null; chRender(0); };
  window.r52пред=(j)=>{ const s=S(); const В=ВЕЩ[s.в4]; if(!В) return;
    if(j===В.в){ s.ф4=2; const с=Object.assign({},s.сдел4||{}); с[В.к]=true; s.сдел4=с; s.о2отз={ок:true,т:'В кислороде '+В.имя+': '+В.кисл+'. Продукт — '+В.прод+'. '+В.ур+'.'}; if(ВЕЩ.every(x=>с[x.к])) s.дело_горение=true; }
    else s.о2отз={ок:false,j:j,т:'В кислороде горение не слабее, а ярче: молекул O₂ рядом с веществом в 5 раз больше, чем на воздухе.'};
    chRender(0); };
  window.r52м=(i)=>{ const s=S(); s.м5=i; chRender(0); };
  window.r52мст=()=>{ const s=S(); const к=s.м5||0; const м=Object.assign({},s.мст5||{}); м[к]=м[к]?0:1; s.мст5=м; chRender(0); };
  window.r52тр=(кл)=>{ const s=S(); const т=Object.assign({г:1,к:1,т:1},s.тр6||{}); т[кл]=т[кл]?0:1; s.тр6=т; chRender(0); };
  window.r52туш=(j)=>{ const s=S(); const n=s.туш6||0; if(n>=ТУШЕНИЕ.length) return; const з=ТУШЕНИЕ[n];
    if(j===з.в){ s.туш6=n+1; s.отз6={ок:true,т:з.р}; } else s.отз6={ок:false,j:j,т:з.р}; chRender(0); };
  window.r52мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r52заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r52Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r52Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r52T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r52TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r52Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L52,{__планПорядок:arr[м].__планПорядок}); else arr.push(L52); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU52={render:render, L:L52};
})();
