/* ============ ХИМИЯ · УРОК 112 · «БЕЗОПАСНОСТЬ НА КУХНЕ И В ЛАБОРАТОРИИ» · ДОПУСК В ЛАБОРАТОРИЮ ============
   По образцу уроков 39–111 (манера NOBOOK), с «допуском»: ученик собирает отметки и в конце
   получает пропуск со штампом «ДОПУЩЕН». Карточка 112 из банка подменяется этой записью (VISKW[112]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ): лаборант в полный рост (халат, очки, перчатки,
   волосы, шарф), знаки опасности, спиртовка с колпачком, спички, держатель, кран.

   ШАГИ.
   1) Экипировка: одеть лаборанта — халат, очки, перчатки, собрать волосы, снять шарф.
   2) Найди 6 нарушений на лабораторном столе: еда, склянка без этикетки, спиртовка от спиртовки,
      тетрадь у огня, пролитая кислота, колба с трещиной (и четыре «ловушки», где всё правильно).
   3) Спиртовка по шагам: снять колпачок, зажечь спичкой, верхняя часть пламени, пробирка
      в держателе отверстием от людей, погасить колпачком.
   4) Нюхать, пробовать, трогать: пары — ладонью к себе; на вкус — никогда; брать — шпателем.
   5) Знаки опасности на бытовой химии: огнеопасно, едкое, ядовито, вредно.
   6) Если что-то случилось: кислота на коже, брызги в глаз, горит спирт, осколки, ожог.
   7) Допуск со штампом. */
(function(){
  'use strict';

  const ID = 112;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'ошибки',    имя:'Найди 6 нарушений',     итог:'6 из 6'},
    {ключ:'спиртовка', имя:'Работа со спиртовкой',  итог:'5 шагов'},
    {ключ:'марафон',   имя:'Проверка: марафон',     итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Получить <b>допуск в лабораторию</b>: узнать, как одеться, как обращаться с огнём и веществами, что означают знаки опасности и что делать, если что-то случилось.'],
    ['Принцип','Три «не»: <b>не пробуй</b> на вкус, <b>не нюхай</b>, поднося к лицу, <b>не смешивай</b> незнакомые вещества. Всё, что неясно, — спроси учителя. Дома те же правила действуют для бытовой химии.'],
    ['Защита','<b>Халат</b> бережёт одежду и кожу, <b>очки</b> — глаза, <b>перчатки</b> — руки. Длинные волосы собирают, шарфы и свисающие украшения снимают: они могут загореться или упасть в реактив.'],
    ['Ход работы','1. Экипировка.<br>2. Найти нарушения на лабораторном столе.<br>3. Поработать со спиртовкой.<br>4. Научиться нюхать и брать вещества.<br>5. Разобрать знаки опасности.<br>6. Первая помощь.<br>7. Получить допуск.'],
    ['Аптечка','Кислота или щёлочь на коже — <b>смыть большим количеством воды</b>. В глаз — промывать водой не меньше 10 минут. Ожог — холодная вода. Пожар — накрыть плотной тканью или песком. <b>Обо всём сразу сказать учителю.</b>']
  ];
  const ЭКИП = [
    {к:'халат',    имя:'Халат',          т:'Халат надет — он защитит одежду и кожу от брызг.'},
    {к:'очки',     имя:'Очки',           т:'Защитные очки на месте. Глаза — самое уязвимое.'},
    {к:'перчатки', имя:'Перчатки',       т:'Перчатки надеты: кожа рук закрыта от реактивов.'},
    {к:'резинка',  имя:'Собрать волосы', т:'Волосы собраны: они не загорятся у спиртовки и не окунутся в пробирку.'},
    {к:'шарф',     имя:'Снять шарф',     т:'Шарф снят: свисающий конец мог бы попасть в пламя.'}
  ];
  const НАРУШЕНИЯ = [
    {к:'A', ф:'Еда и чай на лабораторном столе', почему:'В лаборатории не едят и не пьют: вещество может попасть в еду.'},
    {к:'B', ф:'Склянка без этикетки',             почему:'Неподписанное вещество — неизвестное. Им пользоваться нельзя.'},
    {к:'C', ф:'Спиртовку зажигают от другой',      почему:'Спирт выльется и вспыхнет. Спиртовку зажигают только спичкой.'},
    {к:'D', ф:'Тетрадь у самого огня',            почему:'Бумага загорится. Горючее держат подальше от пламени.'},
    {к:'E', ф:'Опрокинутая склянка, лужа кислоты', почему:'Пролитую кислоту руками не трогают — сразу зовут учителя.'},
    {к:'F', ф:'Колба с трещиной',                 почему:'Треснувшая посуда лопнет при нагревании. Её сдают учителю.'}
  ];
  const ЛОВУШКИ = {
    x1:'Штатив с пробирками стоит ровно — всё правильно.',
    x2:'Очки лежат на полке и ждут опыта — здесь порядок.',
    x3:'Банки подписаны и закрыты — так и должно быть.',
    x4:'Огнетушитель на виду — это правильно.'
  };
  const ШАГИ4 = [
    {т:'Сними колпачок со спиртовки.',                                       что:'колпачок'},
    {т:'Зажги фитиль.',                                                      что:'спички'},
    {т:'В какой части пламени нагревают пробирку?',                          что:'зона'},
    {т:'Закрепи пробирку в держателе и нагрей. Отверстие — в сторону от людей.', что:'держатель'},
    {т:'Опыт окончен. Погаси спиртовку.',                                    что:'колпачок'}
  ];
  const СЕНСОРЫ = [
    {к:'нюхать',   имя:'Нюхать',    q:'Нужно узнать запах жидкости в колбе. Как?', вар:['поднести колбу к носу и вдохнуть','направить пары ладонью к себе'], в:1,
      р:['Резкий вдох обжигает нос и горло. Пары направляют к себе <b>движением ладони</b>.','Верно: лёгкое движение ладони — и запах слышен, а пары не ударят в нос.']},
    {к:'пробовать',имя:'Пробовать', q:'Белый порошок похож на сахар. Можно попробовать?', вар:['чуть-чуть можно','нельзя ничего пробовать'], в:1,
      р:['В лаборатории <b>ничего не пробуют</b>: похожий на сахар порошок может оказаться ядом.','Верно: в лаборатории на вкус не пробуют ничего — даже то, что похоже на сахар.']},
    {к:'трогать',  имя:'Трогать',   q:'Как взять немного вещества из банки?', вар:['пальцами','шпателем или ложечкой'], в:1,
      р:['Пальцами нельзя: вещество может разъесть кожу, а с кожи попасть в реактив.','Верно: вещества берут <b>шпателем</b> или ложечкой и сразу закрывают банку.']}
  ];
  const ЗНАКИ = ['огонь','едкое','череп','!'];
  const ЗНАКИ_ИМЯ = ['огнеопасно','едкое','ядовито','вредно'];
  const ТОВАРЫ = [
    {ф:'Жидкость для розжига', вид:'канистра', зн:0, почему:'Горючая жидкость: хранить и открывать подальше от огня.'},
    {ф:'Средство для труб',    вид:'бутылка',  зн:1, почему:'Внутри едкая щёлочь — разъедает кожу и глаза.'},
    {ф:'Средство от крыс',     вид:'пакет',    зн:2, почему:'Яд. Хранить отдельно от еды, подальше от малышей и животных.'},
    {ф:'Стиральный порошок',   вид:'коробка',  зн:3, почему:'Раздражает глаза и кожу, опасен, если попадёт внутрь.'},
    {ф:'Освежитель-аэрозоль',  вид:'баллон',   зн:0, почему:'Баллон под давлением и горит: не нагревать, не распылять у огня.'},
    {ф:'Уксусная эссенция',    вид:'склянка',  зн:1, почему:'70 % уксусной кислоты: обжигает кожу и горло. Разводят только по рецепту.'}
  ];
  const СЛУЧАИ = [
    {ф:'Кислота попала на руку',      сц:'кран',    вар:['вытереть салфеткой','смыть большим количеством воды','намазать кремом'], в:1, р:'Сразу под струю воды на несколько минут, потом сказать учителю.'},
    {ф:'Брызги попали в глаз',        сц:'глаз',    вар:['потереть глаз рукой','промыть водой и сказать учителю','подождать, само пройдёт'], в:1, р:'Промывать долго — не меньше 10 минут — и обязательно к врачу.'},
    {ф:'Загорелся пролитый спирт',    сц:'огонь',   вар:['накрыть плотной тканью','раздувать, чтобы погас','убежать из класса'], в:0, р:'Без воздуха огонь гаснет. Учитель накроет пламя покрывалом или засыплет песком.'},
    {ф:'Разбилась пробирка',          сц:'осколки', вар:['собрать осколки руками','не трогать и позвать учителя','смахнуть под стол'], в:1, р:'Осколки сметают щёткой на совок. Руками — никогда.'},
    {ф:'Обжёг палец о горячую колбу', сц:'ожог',    вар:['подержать под холодной водой','помазать маслом','приложить лёд из морозилки'], в:0, р:'Прохладная вода 10–15 минут. Масло держит жар в коже, а лёд обмораживает.'}
  ];
  const МАРАФОН = [
    {q:'Можно ли пробовать вещества на вкус в лаборатории?', вар:['только сахар','нельзя никогда','если они чистые'], в:1, р:'В лаборатории ничего не пробуют.'},
    {q:'Как правильно нюхать вещество?', вар:['поднести к носу и вдохнуть','направить пары ладонью к себе','сунуть нос в колбу'], в:1, р:'Пары направляют к себе движением ладони.'},
    {q:'Как погасить спиртовку?', вар:['задуть','накрыть колпачком','залить водой'], в:1, р:'Колпачок перекрывает доступ воздуха.'},
    {q:'От чего зажигают спиртовку?', вар:['от спички','от другой спиртовки','от свечи'], в:0, р:'Только спичкой — от другой спиртовки прольётся горящий спирт.'},
    {q:'В какой части пламени нагревают?', вар:['в нижней','в средней','в верхней'], в:2, р:'Верхняя часть пламени — самая горячая.'},
    {q:'Куда направляют отверстие нагреваемой пробирки?', вар:['на себя','на соседа','в сторону от людей'], в:2, р:'Жидкость может выплеснуться — только в сторону от людей.'},
    {q:'На столе пролита кислота. Что делать?', вар:['вытереть бумагой','сразу позвать учителя','продолжить работу'], в:1, р:'Пролитое вещество убирает взрослый.'},
    {q:'Знак с черепом означает…', вар:['огнеопасно','ядовито','едкое'], в:1, р:'Череп со скрещёнными костями — яд.'},
    {q:'Отбеливатель смешали с кислотным средством для туалета. Что будет?', вар:['ничего','выделится ядовитый хлор','получится вода'], в:1, р:'Бытовую химию никогда не смешивают: выделяется ядовитый хлор.'},
    {q:'Зачем собирают длинные волосы?', вар:['чтобы не мешали писать','чтобы не загорелись и не попали в реактив','так красивее'], в:1, р:'Волосы легко вспыхивают у спиртовки.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = [['Надеть очки перед опытом',0],['Попробовать соль на вкус',1],['Перекусить за лабораторным столом',1],['Направить пары к носу ладонью',0],['Зажечь спиртовку спичкой',0],['Задуть спиртовку',1],
    ['Взять горячую колбу прихваткой',0],['Смешать незнакомые жидкости',1],['Перелить средство для труб в бутылку из-под сока',1],['Работать в халате и перчатках',0],['Нагревать пробирку в держателе',0],['Брать вещество шпателем',0],
    ['Собирать осколки руками',1],['Заглядывать в пробирку при нагревании',1],['Хранить бытовую химию отдельно от еды',0],['Работать с распущенными длинными волосами',1]]
    .map(([ф,н])=>({q:'«'+ф+'» — можно или нельзя?', ф:ф, вар:['можно','нельзя'], в:н, раз:н?'Нельзя: это опасно для тебя и для соседей.':'Можно: так и требуют правила безопасности.'}));
  const П2 = поМесту([['Бензин',0,2],['Уксусная эссенция',1,3],['Крысиный яд',2,0],['Стиральный порошок',3,1],['Ацетон',0,1],['Средство для труб',1,0],['Средство от насекомых',2,3],['Освежитель-аэрозоль',0,2],
    ['Кислота для аккумулятора',1,2],['Жидкость для снятия лака',0,3],['Отбеливатель',1,0],['Средство от тараканов',2,1],['Медицинский спирт',0,1],['Капсулы для стирки',3,2],['Средство для духовки',1,3],['Жидкость для розжига',0,2]]
    .map(([ф,а,б])=>({q:'Какой знак на упаковке: «'+ф+'»?', ф:ф, зн:а, ок:ЗНАКИ_ИМЯ[а], нет:ЗНАКИ_ИМЯ[б], раз:'Знак «'+ЗНАКИ_ИМЯ[а]+'». '+['Горит — подальше от огня.','Разъедает кожу — работать в перчатках.','Яд — хранить отдельно от еды.','Раздражает кожу и глаза — осторожно.'][а]})));
  const П3 = поМесту([['Кислота на коже','смыть большим количеством воды','вытереть салфеткой'],['Брызги в глазу','промыть водой, сказать учителю','потереть глаз'],['Горит пролитый спирт','накрыть плотной тканью','раздувать'],
    ['Разбилась пробирка','не трогать, позвать учителя','собрать руками'],['Обжёгся о горячую колбу','холодная вода 10 минут','помазать маслом'],['Резкий запах в классе','отойти, проветрить, сказать учителю','понюхать ещё раз'],
    ['Загорелась тетрадь','накрыть и позвать учителя','махать ей'],['Пролита щёлочь на столе','сказать учителю','вытереть рукавом'],['Порезался стеклом','промыть, пластырь, сказать учителю','не обращать внимания'],
    ['Закружилась голова от паров','выйти на свежий воздух','продолжить опыт'],['Опрокинулась горящая спиртовка','отойти и позвать учителя','поднять её рукой'],['Склянка без надписи','не открывать, отдать учителю','понюхать, что там'],
    ['Реактив пролился на одежду','снять одежду, промыть кожу','подождать, само высохнет'],['Дома пахнет газом','открыть окна, не включать свет, звать взрослых','зажечь спичку и проверить'],
    ['Вспыхнуло масло на сковороде','накрыть крышкой','залить водой'],['Малыш открыл бытовую химию','убрать её повыше и позвать взрослых','разрешить поиграть']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Что делать?', ф:ф, ок:ок, нет:нет, раз:'Правильно: '+ок+'. И всегда — сказать взрослому.'})));

  const CSS=`
  #lvis .s6.l112n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l112n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l112n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l112n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l112n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l112n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l112n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l112n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l112n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l112n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l112n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l112n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l112n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l112n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l112n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l112n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l112n table.итоги td{white-space:normal!important}
  #lvis .s6.l112n table.итоги td:first-child{width:46%}
  #lvis .s6.l112n table.итоги{table-layout:fixed}
  #lvis .s6.l112n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l112n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l112n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l112n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l112n .ask button{text-align:left}
  #lvis .s6.l112n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l112n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l112n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l112n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l112n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l112n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l112n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l112n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l112n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l112n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l112n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l112n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l112n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l112n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l112n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l112n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l112n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l112n .плитка span{text-align:center}
  #lvis .s6.l112n .плитка:active{transform:scale(.96)}
  #lvis .s6.l112n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l112n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l112n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l112n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l112n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l112n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l112n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l112n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l112n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l112n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l112n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l112n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l112n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l112n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l112n{gap:14px}
  #lvis .s6.l112n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l112n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l112n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l112n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l112n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l112n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l112n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l112n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l112n .карт .текст b{color:${GOLD}}
  #lvis .s6.l112n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l112n .правило b{color:${GOLD}}
  #lvis .s6.l112n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l112n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l112n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l112n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l112n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l112n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l112n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l112n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l112n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l112n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l112n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l112n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l112n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l112n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l112n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l112n .буйки button.мимо{border-color:${RED};animation:l112nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l112nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l112n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l112n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l112n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l112n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l112n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l112n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l112n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l112n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l112n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l112n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l112n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l112n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l112n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l112n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l112n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l112n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l112n .уровни .точка.сейчас{background:${GOLD};animation:l112ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l112ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l112n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l112n{-webkit-text-size-adjust:100%}
  #lvis .s6.l112n [data-anim]{animation:l112nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l112nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l112n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l112n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l112n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l112n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l112n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l112n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l112n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l112n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l112n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l112n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l112n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l112n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l112n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l112n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l112n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l112n .акт span.до{background:#24402c}
  #lvis .s6.l112n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l112n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l112n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l112n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l112n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l112n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l112n .две-колонки li{margin:2px 0}
  #lvis .s6.l112n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l112n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l112n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l112n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l112n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l112n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l112n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l112n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l112n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l112n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l112n ul.памятка li{margin:3px 0}
  #lvis .s6.l112n .pic svg rect[onclick]{cursor:pointer}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l112n [data-anim]{animation:none!important}
    #lvis .s6.l112n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l112n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l112n-style');
      if(!s){ s=document.createElement('style'); s.id='l112n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r112Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c112-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c112-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c112-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c112-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c112-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c112-плиты)"/>
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
  const свгЖ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; };
  const тА = (x,y,t0,к,цв,якорь,жирн) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" ${жирн===false?'':'font-weight="bold"'} fill="${цв}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  /* лоток с собственными значками: [что, имя, тело-svg 64×64] */
  const ПЛИТКИ = (плитки,обработчик,отметки,колонок) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя,тело])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')"><svg viewBox="0 0 64 64" aria-hidden="true">${L_().defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${тело}</svg><span>${имя}</span></button>`).join('')}</div>`;
  const ДВ = () => L_().ДВИЖ;
  const КОЖА = '#f2c8a0';
  const мини = (вид,р) => `<svg viewBox="-34 -34 68 68" aria-hidden="true" class="зн">${L_().знак(0,0,р||30,вид)}</svg>`;

  /* ---------- значки лотков ---------- */
  const З = {
    халат: `<path d="M20 14 L28 12 L32 22 L36 12 L44 14 L52 32 L45 34 L44 56 H20 L19 34 L12 32 Z" fill="#f4f6f8" stroke="#c8ccd0"/><path d="M28 12 L32 24 L36 12" stroke="#9aa0a8" fill="none"/><path d="M32 24 V56" stroke="#d8dce0"/><circle cx="34" cy="34" r="1.4" fill="#9aa0a8"/><circle cx="34" cy="44" r="1.4" fill="#9aa0a8"/>`,
    очки: () => L_().очки(32,40,0.85),
    перчатки: () => L_().перчатки(32,54,0.75),
    резинка: `<path d="M18 40 Q16 20 32 18 Q48 20 46 40" fill="#6a3a1a"/><circle cx="32" cy="16" r="7" fill="#6a3a1a"/><rect x="26" y="20" width="12" height="4" rx="2" fill="#e85a9a"/><circle cx="32" cy="44" r="12" fill="${КОЖА}"/><circle cx="28" cy="43" r="1.4" fill="#2a2a2a"/><circle cx="36" cy="43" r="1.4" fill="#2a2a2a"/>`,
    шарф: `<path d="M14 22 Q32 32 50 22 L50 30 Q32 40 14 30 Z" fill="#d83a3a"/><path d="M36 32 L42 54 L34 56 L30 34 Z" fill="#c82a2a"/><path d="M36 56 v4 M39 55 v4" stroke="#d83a3a" stroke-width="1.4"/>`,
    бутерброд: `<rect x="12" y="36" width="40" height="10" rx="4" fill="#d8a868"/><rect x="10" y="31" width="44" height="6" rx="3" fill="#f4d060"/><path d="M12 31 q6 -5 12 0 q6 -5 12 0 q6 -5 12 0" fill="#7ac84a"/><rect x="12" y="22" width="40" height="9" rx="4" fill="#e8b878"/>`,
    колпачок: () => L_().колпачок(32,50,2.4),
    спички: () => L_().коробок(32,52,1.1)+L_().спичка(20,30,-15,false),
    спиртовка: () => L_().спиртовка(32,58,0.85,false),
    держатель: () => `<g transform="scale(.7)">${L_().держатель(70,24,-45)}</g>`,
    вода: () => L_().стакан(32,56,36,40,{уровень:.6,деления:false}),
    дуть: `<ellipse cx="14" cy="32" rx="6" ry="8" fill="#e88a8a"/><ellipse cx="14" cy="32" rx="2.4" ry="3.6" fill="#8a2a2a"/><path d="M24 26 H44 Q52 26 52 20 Q52 14 46 14" stroke="#bfe6fa" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M24 36 H50 Q56 36 56 42 Q56 48 50 48" stroke="#bfe6fa" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M24 31 H38" stroke="#bfe6fa" stroke-width="2" stroke-linecap="round" opacity=".7"/>`
  };
  const зн = (к) => typeof З[к]==='function' ? З[к]() : З[к];

  /* ---------- рисунки сцен ---------- */
  const кружка = (x,y) => `<g><path d="M${x-11} ${y-26} h22 v20 q0 6 -6 6 h-10 q-6 0 -6 -6 Z" fill="#e8e4dc"/><path d="M${x+11} ${y-20} q8 0 8 6 q0 6 -8 6" stroke="#e8e4dc" stroke-width="3" fill="none"/><ellipse cx="${x}" cy="${y-26}" rx="11" ry="2.4" fill="#7a4a2a"/><rect x="${x-11}" y="${y-18}" width="22" height="3" fill="#c8402a" opacity=".7"/>
    ${[0,1].map(k=>`<path d="M${x-4+k*7} ${y-30} q-4 -6 0 -12 q4 -6 0 -12" stroke="#fff" stroke-width="1.4" fill="none" opacity=".35"/>`).join('')}</g>`;
  const бутерброд = (x,y) => `<g><rect x="${x-16}" y="${y-8}" width="32" height="8" rx="3" fill="#d8a868"/><path d="M${x-16} ${y-8} q4 -4 8 0 q4 -4 8 0 q4 -4 8 0 q4 -4 8 0" fill="#7ac84a"/><rect x="${x-17}" y="${y-13}" width="34" height="5" rx="2.4" fill="#f4d060"/><rect x="${x-16}" y="${y-20}" width="32" height="7" rx="3" fill="#e8b878"/></g>`;
  const огнетушитель = (x,y) => `<g><rect x="${x-4}" y="${y-6}" width="8" height="4" fill="#5a6068"/><rect x="${x-11}" y="${y}" width="22" height="64" rx="8" fill="#d82a2a"/><rect x="${x-8}" y="${y+4}" width="4" height="54" rx="2" fill="#fff" opacity=".3"/>
    <rect x="${x-11}" y="${y+22}" width="22" height="16" fill="#f4f2ec"/><text x="${x}" y="${y+33}" text-anchor="middle" font-size="5" font-weight="bold" fill="#c82a2a" font-family="Arial">ОУ-2</text>
    <path d="M${x} ${y-4} h-12 q-6 0 -6 8 v30" stroke="#2a2a2a" stroke-width="2.4" fill="none"/><path d="M${x-4} ${y-10} h12 l2 4 h-14 Z" fill="#2a2a2a"/></g>`;
  const тетрадь = (x,y) => `<g transform="rotate(-8 ${x} ${y})"><rect x="${x-9}" y="${y-52}" width="20" height="52" rx="1.5" fill="#2a6ab8"/><rect x="${x-9}" y="${y-52}" width="3" height="52" fill="#1a4a88"/><rect x="${x-4}" y="${y-44}" width="12" height="9" fill="#f4f2ec"/><path d="M${x+11} ${y-50} q3 1 2 6 v40" stroke="#f4f2ec" stroke-width="1.6" fill="none"/></g>`;
  const рукаГолая = (x,y,м,угол,пятно) => `<g transform="translate(${x} ${y}) rotate(${угол||0}) scale(${м||1})">
      <path d="M-6 -8 Q-2 -12 6 -10 L40 -12 Q52 -12 60 -6 L60 10 Q48 14 38 12 L6 10 Q-4 10 -6 4 Z" fill="${КОЖА}"/><path d="M-6 -6 Q-12 -4 -10 2 Q-8 6 -2 4" fill="${КОЖА}"/>
      ${[-7,-2,3,8].map(yy=>`<path d="M8 ${yy} Q2 ${yy+1} 0 ${yy+2}" stroke="#c8906a" stroke-width="1" fill="none"/>`).join('')}
      <rect x="58" y="-9" width="22" height="20" rx="4" fill="#3a8a8a"/>
      ${пятно?`<ellipse cx="30" cy="0" rx="10" ry="6" fill="#e86a5a" opacity=".55"/>`:''}</g>`;
  const профиль = (x,y) => `<g><path d="M${x-10} ${y+52} Q${x-22} ${y+64} ${x-30} ${y+100} H${x+60} Q${x+50} ${y+64} ${x+30} ${y+52} Z" fill="#3a8a8a"/><rect x="${x-2}" y="${y+26}" width="24" height="30" fill="${КОЖА}"/>
      <path d="M${x-26} ${y-6} Q${x-26} ${y-38} ${x+6} ${y-40} Q${x+40} ${y-40} ${x+40} ${y-4} Q${x+40} ${y+26} ${x+14} ${y+34} Q${x-14} ${y+36} ${x-20} ${y+20} L${x-24} ${y+14} Q${x-30} ${y+12} ${x-28} ${y+6} L${x-34} ${y+2} Q${x-36} ${y-2} ${x-28} ${y-4} Z" fill="${КОЖА}"/>
      <path d="M${x-26} ${y-10} Q${x-24} ${y-42} ${x+8} ${y-44} Q${x+44} ${y-42} ${x+44} ${y-6} Q${x+44} ${y+16} ${x+34} ${y+24} Q${x+30} ${y-6} ${x+14} ${y-14} Q${x-4} ${y-22} ${x-26} ${y-10} Z" fill="#6a3a1a"/>
      <circle cx="${x-14}" cy="${y-4}" r="2.4" fill="#2a2a2a"/><path d="M${x-22} ${y+18} q4 2 8 0" stroke="#9a4a3a" stroke-width="1.6" fill="none"/><ellipse cx="${x+18}" cy="${y+4}" rx="5" ry="7" fill="#e8b890"/></g>`;
  const пары = (x,y,к_лицу) => Array.from({length:3},(_,k)=>{ const d = к_лицу ? `M${x-6+k*6} ${y} q${10+k*4} -8 ${30+k*10} -14 q20 -4 ${40+k*6} 6` : `M${x-6+k*6} ${y} q-6 -10 0 -20 q6 -10 0 -20`;
    return `<path d="${d}" stroke="#d8f0c8" stroke-width="2" fill="none" opacity=".45">${ДВ()?`<animate attributeName="opacity" values=".1;.5;.1" dur="${1.4+k*0.3}s" repeatCount="indefinite"/>`:''}</path>`; }).join('');
  const запрет = (x,y,r,внутри) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>${внутри}<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#d81e1e" stroke-width="${r*0.16}"/><path d="M${x-r*0.7} ${y-r*0.7} L${x+r*0.7} ${y+r*0.7}" stroke="#d81e1e" stroke-width="${r*0.16}"/></g>`;
  const губы = (x,y) => `<path d="M${x-16} ${y} Q${x-8} ${y-9} ${x} ${y-4} Q${x+8} ${y-9} ${x+16} ${y} Q${x} ${y+12} ${x-16} ${y} Z" fill="#c8504a"/><path d="M${x-16} ${y} Q${x} ${y+3} ${x+16} ${y}" stroke="#7a2a2a" stroke-width="1.4" fill="none"/>`;
  const пламяЛужа = (x,y,ш) => `<ellipse cx="${x}" cy="${y-2}" rx="${ш/2}" ry="5" fill="hsla(198,40%,80%,.4)"/>` + Array.from({length:5},(_,k)=>{ const px=x-ш/2+10+k*(ш-20)/4, h=22+(k%3)*12;
    return `<path d="M${px-7} ${y-2} Q${px-10} ${y-h*0.5} ${px} ${y-h} Q${px+10} ${y-h*0.5} ${px+7} ${y-2} Z" fill="${k%2?'#ffb640':'#ff8a2a'}" opacity=".9">${ДВ()?`<animate attributeName="d" values="M${px-7} ${y-2} Q${px-10} ${y-h*0.5} ${px} ${y-h} Q${px+10} ${y-h*0.5} ${px+7} ${y-2} Z;M${px-7} ${y-2} Q${px-8} ${y-h*0.55} ${px+2} ${y-h-5} Q${px+11} ${y-h*0.5} ${px+7} ${y-2} Z;M${px-7} ${y-2} Q${px-10} ${y-h*0.5} ${px} ${y-h} Q${px+10} ${y-h*0.5} ${px+7} ${y-2} Z" dur="${(0.5+k*0.1).toFixed(2)}s" repeatCount="indefinite"/>`:''}</path>`; }).join('') +
    `<ellipse cx="${x}" cy="${y-16}" rx="${ш/2+10}" ry="26" fill="url(#рл-огонь)" opacity=".4"/>`;
  const осколки = (x,y) => [[-30,-4,20],[-12,-2,-30],[6,-5,50],[24,-3,-10],[38,-2,70],[-40,-2,-60]].map(([dx,dy,у])=>`<path d="M${x+dx} ${y+dy} l8 -10 l5 9 Z" transform="rotate(${у} ${x+dx} ${y+dy})" fill="url(#рл-стекло)" stroke="#bfe6fa" stroke-width=".8"/>`).join('') +
    `<path d="M${x-6} ${y-4} a8 8 0 0 1 16 0" stroke="#bfe6fa" stroke-width="1.2" fill="none"/>`;
  const совок = (x,y) => `<g><path d="M${x} ${y} L${x+40} ${y} L${x+44} ${y-14} L${x+4} ${y-14} Z" fill="#3a8ae8"/><rect x="${x+44}" y="${y-12}" width="34" height="5" rx="2" fill="#2a6ab8"/></g>
    <g transform="rotate(-30 ${x-20} ${y-10})"><rect x="${x-60}" y="${y-14}" width="44" height="6" rx="2" fill="url(#рл-доска)"/><rect x="${x-18}" y="${y-18}" width="14" height="14" rx="2" fill="#d8b47a"/>${Array.from({length:6},(_,k)=>`<path d="M${x-4} ${y-17+k*2.6} h8" stroke="#8a6a3a" stroke-width="1.2"/>`).join('')}</g>`;
  const глаз = (x,y,красный) => `<g><path d="M${x-62} ${y} Q${x} ${y-50} ${x+62} ${y} Q${x} ${y+50} ${x-62} ${y} Z" fill="#fbf8f4" stroke="#c8906a" stroke-width="3"/>
      ${красный?`<path d="M${x-50} ${y-2} q12 -4 18 4 M${x+48} ${y+4} q-12 4 -20 -4 M${x-44} ${y+10} q10 0 14 -6" stroke="#e85a4a" stroke-width="1.2" fill="none"/>`:''}
      <circle cx="${x}" cy="${y}" r="22" fill="#3a8ae8"/><circle cx="${x}" cy="${y}" r="10" fill="#1a1a1a"/><circle cx="${x-7}" cy="${y-8}" r="4" fill="#fff" opacity=".9"/>
      ${Array.from({length:7},(_,k)=>`<path d="M${x-42+k*14} ${y-28+Math.abs(k-3)*5} l${(k-3)*2} -10" stroke="#3a2a1a" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>`;
  /* упаковки бытовой химии: (x,у) — низ середины; знак — индекс или null (ромб «?») */
  const упаковка = (вид,x,у,имя,знакИ) => { const Л=L_();
    const ромб = (cx,cy,р) => знакИ==null ? `<path d="M${cx} ${cy-р} L${cx+р} ${cy} L${cx} ${cy+р} L${cx-р} ${cy} Z" fill="#fff" stroke="#9aa0a8" stroke-width="2" stroke-dasharray="3 2"/>${тА(cx,cy+4,'?',11,'#6a7480')}` : Л.знак(cx,cy,р,ЗНАКИ[знакИ]);
    const подп = (cy,ц) => String(имя).split(' ').reduce((a,w)=>{ const п=a[a.length-1]; if(п&&(п+' '+w).length<=11) a[a.length-1]=п+' '+w; else a.push(w); return a; },[]).slice(0,3).map((стр,i)=>тА(x,cy+i*9,стр,8,ц||'#2e2416')).join('');
    if(вид==='канистра') return `<g>${Л.тень(x,у,80,.45)}<path d="M${x-30} ${у-92} v-12 h30 v12" stroke="#c85a1a" stroke-width="6" fill="none"/><rect x="${x-36}" y="${у-92}" width="72" height="92" rx="8" fill="#e8742a"/><rect x="${x-32}" y="${у-88}" width="6" height="80" rx="3" fill="#fff" opacity=".25"/><rect x="${x+14}" y="${у-104}" width="16" height="12" rx="2" fill="#2a2a2a"/>
      <rect x="${x-26}" y="${у-76}" width="52" height="62" rx="3" fill="#fdfbf4"/>${подп(у-64)}${ромб(x,у-30,13)}</g>`;
    if(вид==='бутылка') return `<g>${Л.тень(x,у,56,.45)}<path d="M${x-24} ${у-6} Q${x-24} ${у} ${x-18} ${у} H${x+18} Q${x+24} ${у} ${x+24} ${у-6} V${у-94} Q${x+24} ${у-108} ${x+9} ${у-112} V${у-122} H${x-9} V${у-112} Q${x-24} ${у-108} ${x-24} ${у-94} Z" fill="#6a3ab8"/>
      <rect x="${x-20}" y="${у-100}" width="5" height="90" rx="2.5" fill="#fff" opacity=".25"/><rect x="${x-11}" y="${у-136}" width="22" height="16" rx="2" fill="#f4f6f8"/>${[0,1,2,3,4].map(k=>`<path d="M${x-8+k*4} ${у-134} v12" stroke="#c8ccd0"/>`).join('')}
      <rect x="${x-19}" y="${у-84}" width="38" height="68" rx="3" fill="#fdfbf4"/>${подп(у-72)}${ромб(x,у-32,12)}</g>`;
    if(вид==='пакет') return `<g>${Л.тень(x,у,74,.45)}<path d="M${x-34} ${у} V${у-92} ${Array.from({length:9},(_,k)=>`L${x-34+(k+0.5)*68/9} ${у-(k%2?92:98)}`).join(' ')} L${x+34} ${у-92} V${у} Z" fill="#7a8a5a"/><rect x="${x-30}" y="${у-86}" width="5" height="80" fill="#fff" opacity=".2"/>
      <rect x="${x-26}" y="${у-78}" width="52" height="64" rx="3" fill="#f6f2e0"/>${подп(у-66)}${ромб(x,у-30,13)}</g>`;
    if(вид==='коробка') return `<g>${Л.тень(x,у,84,.45)}<path d="M${x-38} ${у-92} L${x-26} ${у-102} H${x+48} L${x+38} ${у-92} Z" fill="#5aa0f0"/><path d="M${x+38} ${у-92} L${x+48} ${у-102} V${у-10} L${x+38} ${у} Z" fill="#1a5ab8"/><rect x="${x-38}" y="${у-92}" width="76" height="92" fill="#2a7ae8"/>
      ${[[-28,-80,6],[-20,-70,4],[26,-82,5],[30,-20,4],[-30,-14,5]].map(([dx,dy,r])=>`<circle cx="${x+dx}" cy="${у+dy}" r="${r}" fill="#fff" opacity=".5"/>`).join('')}
      <rect x="${x-26}" y="${у-74}" width="52" height="60" rx="3" fill="#fdfbf4"/>${подп(у-62)}${ромб(x,у-28,12)}</g>`;
    if(вид==='баллон') return `<g>${Л.тень(x,у,46,.45)}<rect x="${x-20}" y="${у-104}" width="40" height="104" rx="5" fill="#e85a9a"/><rect x="${x-16}" y="${у-100}" width="6" height="96" rx="3" fill="#fff" opacity=".3"/><path d="M${x-20} ${у-104} Q${x} ${у-118} ${x+20} ${у-104} Z" fill="#c8c8d0"/><rect x="${x-5}" y="${у-124}" width="10" height="10" rx="2" fill="#2a2a2a"/>
      <rect x="${x-17}" y="${у-86}" width="34" height="66" rx="3" fill="#fdfbf4"/>${подп(у-74)}${ромб(x,у-34,11)}</g>`;
    return Л.склянка(x,у,52,108,{уровень:.6,цвет:'hsla(48,30%,88%,.5)',этикетка:['эссенция','70%'],полоса:'#c8402a'}) + ромб(x,у-14,10);
  };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=246, y0=200, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.лаборант(72,y0+14,0.8,{халат:true,очки:true,перчатки:true,волосы:'собраны'}) + Л.спиртовка(196,y0+14,1,false) + Л.коробок(244,y0+14,1) + Л.спичка(232,y0+4,-8,false) + огнетушитель(304,y0-50);
    const поверх = ЗНАКИ.map((з,i)=>Л.знак(150+i*44,62,19,з)).join('') + метка(214,12,'Допуск в лабораторию',ЗЛ,{кегль:12});
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Безопасность на кухне и в лаборатории') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r112вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок — это инструктаж перед допуском.') :
        ОТВЕТЫ('',['спросить учителя','попробовать понемногу'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что делать, если не знаешь, как обращаться с веществом?') :
          РАЗБОР(ок,['Верно: всё неясное — сначала у учителя.','«Понемногу» не спасает: капля едкого вещества уже обожжёт. Сначала <b>спроси учителя</b>.'][в]))) +
      (ок ? ПРАВИЛО('Не знаешь — <b>не делай</b>, а спроси.') : '');
  }

  /* 2. Экипировка */
  function F2(s){
    const Н=292, y0=250, Л=L_(), э=s.э2||{}, отз=s.отз2, все=ЭКИП.every(x=>э[x.к]);
    const вид = {халат:!!э.халат, очки:!!э.очки, перчатки:!!э.перчатки, волосы:э.резинка?'собраны':'распущены', шарф:!э.шарф};
    const пр = Л.лаборант(108,y0+14,1.24,вид);
    const панель = `<rect x="210" y="34" width="118" height="${ЭКИП.length*30+40}" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/>` + тА(269,56,'ЧЕК-ЛИСТ',10,'#9aa3ad') +
      ЭКИП.map((x,i)=>{ const y=82+i*30, ок=!!э[x.к];
        return `<circle cx="226" cy="${y-4}" r="8" fill="${ок?'#3a9a5a':'none'}" stroke="${ок?'#8fd1a8':'#6a7480'}" stroke-width="1.4"/>${ок?`<path d="M222 ${y-4} l3 3 l5 -6" stroke="#fff" stroke-width="1.8" fill="none"/>`:''}`+
          тА(240,y,x.имя.toLowerCase(),10,ок?'#e8f4ec':'#9aa3ad','start'); }).join('');
    const поверх = панель + (все ? метка(108,4,'готов к опыту!',ЗЕ,{кегль:11}) : '');
    const плитки = [['халат','Халат',зн('халат')],['очки','Очки',зн('очки')],['перчатки','Перчатки',зн('перчатки')],['резинка','Резинка',зн('резинка')],['шарф','Снять шарф',зн('шарф')],['бутерброд','Бутерброд',зн('бутерброд')]];
    const отм={}; ЭКИП.forEach(x=>{ if(э[x.к]) отм[x.к]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Экипировка лаборанта') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? '' : A(3,'карт задача','<span class="метка">Задание</span><div class="текст">Подготовь лаборанта к опыту: выбирай на лотке, что надеть и что снять.</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      ПЛИТКИ(плитки,'r112э',отм,3) +
      (все ? ТЕОРИЯ('спецодежда','<b>Халат</b> — из плотной хлопковой ткани и застёгнут: синтетика плавится от огня. <b>Очки</b> надевают, даже если опыт делает сосед. <b>Перчатки</b> — когда работают с едкими веществами. Длинные волосы, шарфы и шнурки от капюшона — первое, что попадает в пламя.') +
        ДИВО('Профессиональные химики работают в очках всегда, даже когда просто моют посуду: брызгам всё равно, опасный опыт или нет.') +
        ПРАВИЛО('Халат, очки, перчатки, волосы собраны — и только потом опыт.') : '');
  }

  /* 3. Найди 6 нарушений */
  const ЗОНЫ = {A:[12,198,76,52],B:[88,176,38,74],C:[128,160,76,90],D:[208,186,30,64],E:[234,210,98,42],F:[30,38,60,58],x1:[100,30,58,66],x3:[180,52,62,44],x2:[250,68,48,28],x4:[286,100,42,88]};
  function F3(s){
    const Н=286, y0=232, у=y0+14, Л=L_(), н=s.н3||{}, л=s.л3||{}, отз=s.отз3, найдено=НАРУШЕНИЯ.filter(x=>н[x.к]).length, все=найдено>=НАРУШЕНИЯ.length, подск=s.подск3;
    const полка = `<rect x="12" y="94" width="312" height="7" rx="2" fill="url(#рл-доска)"/><path d="M40 101 v10 h10 Z M296 101 v10 h-10 Z" fill="#8a5a2a"/>`;
    const трещина = `<path d="M58 66 l5 6 l-4 5 l6 7 l-3 4" stroke="#fff" stroke-width="1.4" fill="none" opacity=".95"/><path d="M58 66 l5 6 l-4 5 l6 7 l-3 4" stroke="#2a3038" stroke-width=".5" fill="none" transform="translate(.8 .4)"/>`;
    const стена = полка + Л.колба(62,94,0.55,{уровень:.35,цвет:'hsla(198,40%,85%,.4)'}) + трещина +
      Л.штативПробирок(128,94,18,[{уровень:.4,цвет:'hsla(120,40%,60%,.6)'},{уровень:.5,цвет:'hsla(30,80%,60%,.6)'},{уровень:.3}],0.6) +
      Л.банка(196,94,24,34,{содержимое:'соль',надпись:['NaCl'],мал:true}) + Л.банка(226,94,24,34,{содержимое:'медь',надпись:['Cu'],мал:true}) + Л.очки(274,90,0.7) + огнетушитель(306,112);
    const наклонная = `<g transform="translate(144 212) rotate(40)">${Л.спиртовка(0,0,1,false,true)}</g>` +
      `<path d="M171 184 Q168 178 172 170 Q176 178 173 184 Z" fill="#ffb640" opacity=".9"/>` +
      [0,1,2].map(k=>`<circle cx="${166+k*3}" cy="${196+k*8}" r="${1.8-k*0.3}" fill="hsla(198,60%,80%,.85)">${ДВ()?`<animate attributeName="cy" values="194;${у-2}" dur="${0.8+k*0.2}s" begin="${k*0.25}s" repeatCount="indefinite"/>`:''}</circle>`).join('') +
      `<ellipse cx="168" cy="${у-1}" rx="12" ry="2" fill="hsla(198,60%,80%,.5)"/>`;
    const лежащая = `<g transform="translate(324 240) rotate(-90)">${Л.склянка(0,0,24,52,{уровень:.35,этикетка:['HCl'],полоса:'#c8402a'})}</g>` +
      `<ellipse cx="258" cy="${у-2}" rx="26" ry="4.4" fill="hsla(55,60%,80%,.55)"/><ellipse cx="252" cy="${у-3}" rx="10" ry="1.6" fill="#fff" opacity=".4"/>`;
    const стол = кружка(30,у) + бутерброд(64,у) + Л.склянка(106,у,30,58,{уровень:.5,цвет:'hsla(60,40%,80%,.5)'}) + тА(106,у-14,'?',14,'#ff9a6a') +
      наклонная + Л.спиртовка(188,у,1,true) + тетрадь(224,у) + лежащая;
    const кольцо = (к,ц,номер) => { const [x,y,w,h]=ЗОНЫ[к], cx=x+w/2, cy=y+h/2, r=Math.max(w,h)/2+2;
      return `<ellipse cx="${cx}" cy="${cy}" rx="${w/2+6}" ry="${h/2+6}" fill="none" stroke="${ц}" stroke-width="2.4"/>`+(номер?`<circle cx="${cx+w/2+2}" cy="${cy-h/2-2}" r="8" fill="${ц}"/>${тА(cx+w/2+2,cy-h/2+1.5,номер,10,'#fff')}`:''); };
    const зоны = Object.keys(ЗОНЫ).map(к=>{ const [x,y,w,h]=ЗОНЫ[к]; return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r112н('${к}')"/>`; }).join('');
    const отметки = НАРУШЕНИЯ.map((x,i)=>н[x.к]?кольцо(x.к,'#ff5a4a',String(НАРУШЕНИЯ.filter((y,j)=>j<=i&&н[y.к]).length)):'').join('') +
      Object.keys(ЛОВУШКИ).map(к=>л[к]?кольцо(к,'#8fd1a8',''):'').join('') +
      (подск&&!все&&!н[подск]?`<g>${кольцо(подск,'#ffd76a','')}${ДВ()?'':''}</g>`:'');
    const поверх = отметки + метка(168,4,все?'все 6 нарушений найдены!':'нарушений найдено: '+найдено+' из 6',все?ЗЕ:КР,{кегль:11}) + зоны;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Найди 6 нарушений') +
      `<div class="pic тёмная">${свгЖ(сцена(Н,y0,стена+стол,поверх),Н)}</div>` +
      (все ? '' : A(3,'карт задача','<span class="метка">Задание</span><div class="текст">Нажимай на рисунке туда, где нарушены правила. Осторожно: кое-где всё в порядке.</div>') +
        `<div class="ask">${BTN(4,'','Подсказка: где искать?',"r112подск()")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      A(8,'карт','<span class="метка">Протокол · '+найдено+' из 6</span><table class="итоги узкая два"><tr><th>Нарушение</th><th>почему опасно</th></tr>'+
        НАРУШЕНИЯ.map(x=>н[x.к]?`<tr><td>${x.ф}</td><td>${x.почему}</td></tr>`:`<tr class="пусто"><td>?</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('порядок на столе','На лабораторном столе только то, что нужно для опыта. Все склянки подписаны и закрыты. Горючее — подальше от огня. Посуду перед опытом осматривают: трещина, скол — и колба отправляется к учителю.') +
        ПРАВИЛО('Еды нет, этикетки есть, бумага далеко от огня, посуда целая, пролитое — учителю.') : '');
  }

  /* 4. Спиртовка */
  function F4(s){
    const Н=272, y0=214, у=y0+14, Л=L_(), ш=Math.min(s.о4||0,ШАГИ4.length), отз=s.о4отз, готово=ш>=ШАГИ4.length;
    const горит = ш>=2&&ш<5;
    const пр = Л.спиртовка(100,у,1.5,горит,ш>=1&&ш<5) + (ш>=1&&ш<5?Л.колпачок(150,у,1.4):'') + Л.коробок(196,у,1.1) + (ш>=3?Л.спичка(176,у-3,4,false):'');
    const зоны = ш>=2&&ш<5 ? `<path d="M272 196 Q236 146 272 46 Q308 146 272 196 Z" fill="#ffb640" opacity=".9"/><path d="M272 196 Q250 156 272 100 Q294 156 272 196 Z" fill="#ffd890"/><path d="M272 196 Q260 172 272 144 Q284 172 272 196 Z" fill="#7ab8ff" opacity=".85"/>
      <rect x="266" y="196" width="12" height="8" fill="#f4ecd8"/>` +
      [[72,'верхняя — самая горячая',ш>=3],[124,'средняя',false],[176,'нижняя — холодная',false]].map(([y,t0,гор])=>`<path d="M228 ${y-4} H${y===72?262:y===124?262:266}" stroke="${гор?'#ffd76a':'#6a7480'}" stroke-width="1"/>`+тА(224,y,t0,9,гор?'#ffd76a':'#c8ced6','end')).join('') +
      тА(272,226,'зоны пламени',9,'#9aa3ad') : '';
    const спичкаГорит = ш===2 ? Л.спичка(112,у-58,200,true) : '';
    const пробирка = ш===4 ? Л.пробирка(100,у-90,0.9,{угол:55,уровень:.35,цвет:'hsla(200,60%,70%,.6)'}) + Л.держатель(131,у-112,210) +
      `<path d="M168 ${у-136} l14 -10" stroke="#8fd1a8" stroke-width="2"/><path d="M178 ${у-148} l5 2 l-1 5" stroke="#8fd1a8" stroke-width="2" fill="none"/>` + метка(150,30,'отверстие — от людей',ЗЕ,{кегль:9}) : '';
    const поверх = зоны + спичкаГорит + пробирка +
      метка(ш===4?150:100,4,готово?'спиртовка погашена колпачком':ш===0?'спиртовка закрыта колпачком':ш===1?'колпачок снят':горит?'горит':'',готово?ЗЕ:ЗЛ,{кегль:11});
    const ДЕЙ=ШАГИ4[Math.min(ш,ШАГИ4.length-1)].что;
    const кнопки = !готово&&ДЕЙ==='зона' ? `<div class="ask три">${['нижняя','средняя','верхняя'].map((t0,j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r112о4('з"+j+"')")).join('')}</div>` : '';
    const плитки=[['колпачок','Колпачок',зн('колпачок')],['спички','Спички',зн('спички')],['спиртовка','Другая спиртовка',зн('спиртовка')],['держатель','Держатель',зн('держатель')],['вода','Стакан воды',зн('вода')],['дуть','Задуть',зн('дуть')]];
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3 · '+Math.min(ш+1,ШАГИ4.length)+' из '+ШАГИ4.length,'Спиртовка: зажечь и погасить') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+'</span><div class="текст">'+ШАГИ4[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') + кнопки +
      (готово ? '' : ПЛИТКИ(плитки,'r112о4',{},3)) +
      СПИСОК('Порядок работы',ШАГИ4.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('пламя','Пламя спиртовки неоднородно: внизу у фитиля — <b>холодная</b> зона с несгоревшими парами спирта, вверху — <b>самая горячая</b>. Пробирку держат в держателе, сначала прогревают целиком, потом — в верхней части пламени. Гасят только <b>колпачком</b>: он перекрывает воздух, и пламя гаснет.') +
        ДИВО('Почему нельзя задувать? Пламя может «проскочить» внутрь, к парам спирта, — и спиртовка вспыхнет. Колпачок к тому же не даёт спирту испаряться — завтра фитиль снова загорится с первой спички.') +
        `<div class="ask">${BTN(10,'','Повторить с начала',"r112о4сброс()")}</div>` +
        ПРАВИЛО('Зажигают <b>спичкой</b>, гасят <b>колпачком</b>, греют в <b>верхней</b> части пламени.') : '');
  }

  /* 5. Нюхать, пробовать, трогать */
  function F5(s){
    const Н=246, y0=200, у=y0+14, Л=L_(), к=s.с5||0, С=СЕНСОРЫ[к], сд=s.сд5||{}, ок=!!сд[С.к], отз=s.отз5, все=СЕНСОРЫ.every(x=>сд[x.к]);
    let пр='', поверх='';
    if(к===0){
      пр = Л.колба(96,у,1.1,{уровень:.4,цвет:'hsla(60,60%,75%,.5)'}) + профиль(262,104);
      поверх = пары(96,у-100,ок) + (ок ? `<g>${ДВ()?`<animateTransform attributeName="transform" type="rotate" values="-8 140 110;10 140 110;-8 140 110" dur="1.2s" repeatCount="indefinite"/>`:''}${рукаГолая(140,96,0.8,200)}</g>` + метка(96,4,'ладонью — к себе',ЗЕ,{кегль:11}) : метка(96,4,'как узнать запах?',ЗЛ,{кегль:11}));
    } else if(к===1){
      пр = Л.часовое(96,у,90,'пусто') + `<ellipse cx="96" cy="${у-7}" rx="24" ry="6" fill="#fbfaf6"/><ellipse cx="92" cy="${у-10}" rx="12" ry="3" fill="#ffffff"/>` + профиль(262,104);
      поверх = (ок ? запрет(170,92,34,губы(170,94)) + метка(170,4,'на вкус — никогда',КР,{кегль:11}) : метка(96,4,'похоже на сахар…',ЗЛ,{кегль:11}) + тА(96,у-30,'?',22,'#ff9a6a'));
    } else {
      пр = Л.банка(84,у,48,64,{содержимое:'соль',надпись:['NaCl']}) + Л.часовое(232,у,84,'пусто') + (ок?`<ellipse cx="232" cy="${у-7}" rx="14" ry="6" fill="#fbfaf6"/><ellipse cx="228" cy="${у-10}" rx="7" ry="3" fill="#ffffff"/>`:'');
      поверх = (ок ? Л.шпатель(118,у-88,64,12,{горка:'соль'}) + Л.перчатки(300,у,0.6) + метка(160,4,'шпателем — и банку закрыть',ЗЕ,{кегль:11}) : метка(160,4,'как взять вещество?',ЗЛ,{кегль:11}));
    }
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Нюхать, пробовать, трогать') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд мелко" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${СЕНСОРЫ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${сд[x.к]?' был':''}" onclick="r112с(${i})">${сд[x.к]?'✓ ':''}${x.имя}</button>`).join('')}</div>` +
      A(4,'карт задача','<span class="метка">'+С.имя+'</span><div class="текст">'+С.q+'</div>') +
      `<div class="ask">${С.вар.map((t0,j)=>BTN(5+j,ок&&j===С.в?'hit':(отз&&!отз.ок&&отз.j===j?'miss':''),t0,"r112со("+j+")")).join('')}</div>` +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (все ? ТЕОРИЯ('органы чувств','В лаборатории глаза, нос, язык и руки — не инструменты. Нос — только «издалека», движением ладони. Язык — никогда. Руки — только в перчатках и с инструментом: шпателем, ложечкой, пинцетом, щипцами.') +
        ДИВО('Знаменитый химик XIX века Роберт Бунзен потерял глаз при взрыве в лаборатории. Защитных очков тогда ещё не было — их стали носить именно после таких историй.') +
        ПРАВИЛО('Нюхать — <b>ладонью</b>. Пробовать — <b>никогда</b>. Брать — <b>шпателем</b>.') : '');
  }

  /* 6. Знаки опасности */
  function F6(s){
    const Н=250, y0=206, у=y0+14, Л=L_(), к=s.т6, сд=s.сд6||{}, отз=s.отз6, все=ТОВАРЫ.every((x,i)=>сд[i]);
    const Т=к==null?null:ТОВАРЫ[к], ок=Т&&сд[к];
    const пр = Т ? упаковка(Т.вид,104,у,Т.ф,ок?Т.зн:null) : ТОВАРЫ.slice(0,4).map((x,i)=>`<g transform="translate(${54+i*76} ${у}) scale(.62) translate(${-54-i*76} ${-у})">${упаковка(x.вид,54+i*76,у,x.ф,null)}</g>`).join('');
    const поверх = !Т ? метка(168,4,'бытовая химия: какие знаки на упаковках?',ЗЛ,{кегль:11}) :
      (ок ? Л.знак(250,104,52,ЗНАКИ[Т.зн]) + метка(250,170,ЗНАКИ_ИМЯ[Т.зн],КР,{кегль:12}) :
        `<path d="M250 52 L302 104 L250 156 L198 104 Z" fill="none" stroke="#9aa0a8" stroke-width="3" stroke-dasharray="6 5"/>`+тА(250,116,'?',34,'#9aa0a8')) + метка(168,4,Т.ф,ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Знаки опасности') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))">${ТОВАРЫ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${сд[i]?' был':''}" onclick="r112т(${i})">${сд[i]?'✓ ':''}${x.ф}</button>`).join('')}</div>` +
      (Т&&!ок ? A(5,'карт задача','<span class="метка">Какой знак?</span><div class="текст">Что должно быть нарисовано на упаковке «'+Т.ф+'»?</div>') +
        `<div class="ask пара знаки">${ЗНАКИ.map((з,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',мини(з)+'<span>'+ЗНАКИ_ИМЯ[j]+'</span>',"r112зн("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !Т ? СКАЗ('Задание','Выбирай упаковки по одной и подбирай им знак опасности.') : '') +
      A(8,'карт','<span class="метка">Таблица знаков · '+ТОВАРЫ.filter((x,i)=>сд[i]).length+' из 6</span><table class="итоги узкая два"><tr><th>Упаковка</th><th>знак</th></tr>'+
        ТОВАРЫ.map((x,i)=>сд[i]?`<tr><td>${x.ф}</td><td><span class="зн-мал">${мини(ЗНАКИ[x.зн])}</span>${ЗНАКИ_ИМЯ[x.зн]}</td></tr>`:`<tr class="пусто"><td>${x.ф}</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('знаки','Ромб с красной каймой — международный знак опасности. <b>Пламя</b> — горит. <b>Пробирки и рука</b> — разъедает кожу и металл. <b>Череп</b> — яд. <b>Восклицательный знак</b> — вредно, раздражает. Бытовую химию хранят в родной упаковке, отдельно от еды и повыше от малышей.') +
        ДИВО('Самая опасная «кухонная» ошибка — смешать <b>отбеливатель</b> с <b>кислотным средством для туалета</b>. Выделяется ядовитый газ <b>хлор</b>. Поэтому средства для уборки никогда не смешивают, даже «чтобы чище было».') +
        ПРАВИЛО('Видишь ромб с красной каймой — читай знак и обращайся осторожно. Разные средства <b>не смешивай</b>.') : '');
  }

  /* 7. Если что-то случилось */
  function F7(s){
    const Н=236, y0=196, у=y0+14, Л=L_(), n=Math.min(s.сл7||0,СЛУЧАИ.length-1), ок=!!s.ок7, отз=s.отз7, готовых=n+(ок?1:0), все=готовых>=СЛУЧАИ.length, С=СЛУЧАИ[n];
    let пр='', поверх='';
    if(С.сц==='кран'){ пр = рукаГолая(ок?118:96,ок?150:у-14,1.1,0,!ок) + (ок?'':[0,1,2].map(k=>`<circle cx="${130+k*10}" cy="${у-26-k*2}" r="2.4" fill="#e8e070"/>`).join('')); поверх = Л.кран(160,72,1.1,ок,68); }
    else if(С.сц==='глаз'){ пр=''; поверх = глаз(150,118,!ок) + (ок?Л.кран(176,34,0.9,true,48)+[0,1,2,3].map(k=>`<circle cx="${140+k*8}" cy="${88-k*3}" r="2" fill="hsla(198,80%,80%,.8)"/>`).join(''):''); }
    else if(С.сц==='огонь'){ пр = ок ? `<path d="M80 ${у} Q90 ${у-34} 168 ${у-38} Q246 ${у-34} 256 ${у} Z" fill="#7a6a5a"/><path d="M96 ${у-12} Q168 ${у-30} 240 ${у-12}" stroke="#9a8a7a" stroke-width="2" fill="none"/>` : пламяЛужа(168,у,150);
      поверх = ок ? [0,1,2].map(k=>`<path d="M${130+k*36} ${у-40} q-6 -10 0 -20 q6 -10 0 -20" stroke="#9aa0a6" stroke-width="2" fill="none" opacity=".4"/>`).join('') + Л.спиртовка(290,у,0.9,false) : `<g transform="translate(296 ${у-6}) rotate(80)">${Л.спиртовка(0,0,0.9,false,true)}</g>`; }
    else if(С.сц==='осколки'){ пр = осколки(150,у) + (ок?совок(200,у):''); поверх=''; }
    else { пр = Л.колба(70,у,0.9,{уровень:.4,цвет:'hsla(20,60%,70%,.5)'}) + рукаГолая(ок?204:120,ок?160:у-14,1,0,!ок); поверх = [0,1,2].map(k=>`<path d="M${58+k*12} ${у-90} q-5 -8 0 -16 q5 -8 0 -16" stroke="#ff9a6a" stroke-width="1.6" fill="none" opacity=".6"/>`).join('') + (ок?Л.кран(240,72,1,true,74):''); }
    поверх += метка(168,4,(n+1)+' из 5 · '+С.ф,ок?ЗЕ:КР,{кегль:11});
    const сп = (а) => СЛУЧАИ.filter((x,k)=>k<готовых).map(x=>'<li><b>'+x.ф+'</b> — '+x.вар[x.в]+'</li>').join('');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 6','Если что-то случилось') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(СЛУЧАИ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Случай '+(n+1)+' из 5</span><div class="текст">'+С.ф+'. Что делать?</div>') +
        `<div class="ask">${С.вар.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r112сл("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий случай →',"r112слдальше()")}</div>` : '') +
      (готовых ? A(8,'карт','<span class="метка">Памятка · '+готовых+' из 5</span><ul class="памятка">'+сп()+'</ul>') : '') +
      (все ? ТЕОРИЯ('первая помощь','Почти при любой беде в лаборатории помогает <b>вода</b> — много и сразу: она смывает кислоту и щёлочь, остужает ожог. Огонь гасят, <b>перекрывая воздух</b>. И главное правило: <b>сразу сказать учителю</b>, даже если кажется, что ничего страшного.') +
        ПРАВИЛО('Вода — смыть и остудить. Ткань или песок — потушить. Учитель — всегда.') : '');
  }

  /* 8. Допуск */
  const ЧЕК = (s) => [
    ['спецодежда', ЭКИП.every(x=>(s.э2||{})[x.к])],
    ['6 нарушений найдены', !!s.дело_ошибки],
    ['спиртовка', !!s.дело_спиртовка],
    ['нюхать, пробовать, трогать', СЕНСОРЫ.every(x=>(s.сд5||{})[x.к])],
    ['знаки опасности', ТОВАРЫ.every((x,i)=>(s.сд6||{})[i])],
    ['первая помощь', !!s.помощь7]
  ];
  function F8(s){
    const Н=300, y0=286, Л=L_(), чек=ЧЕК(s), есть=чек.filter(x=>x[1]).length, все=есть===чек.length, штамп=все&&!!s.штамп8;
    const имя = (window.DB&&DB.profile&&DB.profile.name) ? String(DB.profile.name).slice(0,22) : 'юный химик';
    const карта = `<rect x="16" y="12" width="304" height="272" rx="12" fill="#f6efe0" stroke="#c89a2a" stroke-width="2.4"/><rect x="24" y="20" width="288" height="256" rx="8" fill="none" stroke="#c89a2a" stroke-width=".8" stroke-dasharray="3 3"/>
      <text x="168" y="50" text-anchor="middle" font-size="22" font-weight="bold" fill="#6a1a10" font-family="Georgia,serif" letter-spacing="3">ДОПУСК</text>
      <text x="168" y="68" text-anchor="middle" font-size="11" fill="#6a5a40" font-family="Georgia,serif">в химическую лабораторию</text>
      <path d="M60 78 H276" stroke="#c89a2a" stroke-width=".8"/>
      <text x="168" y="96" text-anchor="middle" font-size="12" fill="#2e2416" font-family="Georgia,serif">выдан: <tspan font-weight="bold">${esc(имя)}</tspan></text>` +
      Л.лаборант(78,268,0.82,{халат:true,очки:true,перчатки:true,волосы:'собраны'}) +
      чек.map(([t0,ок],i)=>{ const y=118+i*20; return `<circle cx="146" cy="${y-4}" r="7" fill="${ок?'#3a9a5a':'none'}" stroke="${ок?'#3a9a5a':'#b8a888'}" stroke-width="1.4"/>${ок?`<path d="M142.5 ${y-4} l2.6 2.6 l4.4 -5" stroke="#fff" stroke-width="1.6" fill="none"/>`:''}`+
        `<text x="160" y="${y}" font-size="11" fill="${ок?'#2e2416':'#9a8a6a'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; }).join('');
    const печать = штамп ? `<g transform="translate(268 250) rotate(-14) scale(.84)">${ДВ()?`<animateTransform attributeName="transform" type="scale" additive="sum" values="1.8;1" dur=".35s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".23 1 .32 1"/>`:''}
        <circle r="38" fill="none" stroke="#c8202a" stroke-width="3"/><circle r="31" fill="none" stroke="#c8202a" stroke-width="1.2"/>
        <text y="4" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#c8202a" font-family="'Helvetica Neue',Arial,sans-serif" letter-spacing="1">ДОПУЩЕН</text>
        <text y="-14" text-anchor="middle" font-size="6.5" fill="#c8202a" font-family="Arial" letter-spacing="1">★ АРХИМЕД ★</text><text y="20" text-anchor="middle" font-size="6.5" fill="#c8202a" font-family="Arial">урок 112</text></g>`
      : тА(250,250,все?'нажми «Получить допуск»':'осталось: '+(чек.length-есть),10,'#9a8a6a');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 7','Допуск в лабораторию') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+карта+печать,Н)}</div>` +
      (все ? (штамп ? РАЗБОР(true,'Допуск получен! Теперь ты знаешь главные правила лаборатории и кухни.') : `<div class="ask">${BTN(4,'hit','Получить допуск',"r112штамп()")}</div>`)
        : СКАЗ('Допуск','Чтобы получить штамп, пройди все шаги урока: '+чек.filter(x=>!x[1]).map(x=>x[0]).join(', ')+'.')) +
      A(5,'карт теория','<span class="метка">Главные правила</span><div class="текст" style="font-size:18px">'+
        '• Халат, очки, перчатки; волосы собраны.<br>• Ничего не пробовать на вкус, нюхать — ладонью.<br>• Вещества брать шпателем, склянки подписаны и закрыты.<br>• Спиртовку зажигать спичкой, гасить колпачком.<br>• Бытовую химию не смешивать и хранить отдельно от еды.<br>• Случилось что-то — вода и сразу учитель.</div>') +
      ПРАВИЛО('Безопасность — это не страх, а <b>привычка</b>.');
  }

  /* 9. Марафон */
  function F9(s){
    const Н=200, y0=156, Л=L_(), м9=s.мар9||{}, n=Math.min(м9.n||0,МАРАФОН.length), ош=Math.min(м9.ош||0,3), отв=s.отв9, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.спиртовка(236+i*36,y0+14,0.7,i<3-ош)).join('') + Л.лаборант(60,y0+14,0.66,{халат:true,очки:true,перчатки:true,волосы:'собраны'});
    const поверх = все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(272,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Правила безопасности ты знаешь назубок.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r112заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r112мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни шаги урока.')) : '')) +
      (все ? ПРАВИЛО('Не знаешь — спроси. Случилось — вода и учитель.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Чего нельзя делать в лаборатории?', варианты:[{т:'надевать перчатки',ок:false},{т:'пробовать вещества на вкус',ок:true}], разбор:'Вещества могут быть ядовитыми.' },
    { вопрос:'На столе пролита кислота. Что нужно сделать?', варианты:[{т:'сразу позвать взрослого',ок:true},{т:'вытереть бумагой',ок:false}], разбор:'Пролитое убирает взрослый.' },
    { вопрос:'Как правильно погасить спиртовку?', варианты:[{т:'задуть',ок:false},{т:'накрыть колпачком',ок:true}], разбор:'Колпачок перекрывает доступ воздуха.' },
    { вопрос:'Горячую колбу берут…', варианты:[{т:'прихваткой или держателем',ок:true},{т:'голыми руками, но быстро',ок:false}], разбор:'Стекло долго остаётся горячим.' },
    { вопрос:'Можно ли смешать два средства для уборки?', варианты:[{т:'да, будет чище',ок:false},{т:'нет, может выделиться яд',ок:true}], разбор:'Например, хлор из отбеливателя и кислоты.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r112Reset()")}</div>` +
        ПРАВИЛО('Не пробуй, не нюхай прямо, не смешивай.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r112Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const строки = (t0,макс) => String(t0).split(' ').reduce((a,w)=>{ const п=a[a.length-1]; if(п!=null&&(п+' '+w).length<=макс) a[a.length-1]=п+' '+w; else a.push(w); return a; },[]);
  const Т = {
    т1:{ имя:'Можно или нельзя', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=184, y0=160, отв=ст.ответ!=null, ок0=отв&&з.в===0, нет0=отв&&з.в===1;
        const стр=строки(з.ф,30);
        return свгЛ(сцена(Н,y0,'',стр.map((t0,i)=>тА(168,24+i*16,t0,13,'#f2f5f8')).join('')+
          `<g opacity="${нет0?.35:1}"><circle cx="96" cy="112" r="34" fill="${ок0?'rgba(58,154,90,.35)':'rgba(12,14,18,.7)'}" stroke="#3a9a5a" stroke-width="${ок0?3:1.4}"/><path d="M80 112 l11 11 l20 -24" stroke="#8fd1a8" stroke-width="5" fill="none" stroke-linecap="round"/></g>`+
          `<g opacity="${ок0?.35:1}"><circle cx="240" cy="112" r="34" fill="${нет0?'rgba(216,30,30,.3)':'rgba(12,14,18,.7)'}" stroke="#d81e1e" stroke-width="${нет0?3:1.4}"/><path d="M216 88 L264 136" stroke="#ff6a5a" stroke-width="5" stroke-linecap="round"/></g>`+
          тА(96,166,'можно',11,ок0?'#8fd1a8':'#6a7480')+тА(240,166,'нельзя',11,нет0?'#ff8a7a':'#6a7480')+(ст.серия>=3?метка(168,96,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Знак опасности', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=196, y0=170, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.склянка(96,y0+14,56,104,{уровень:.55,цвет:'hsla(40,40%,80%,.5)',этикетка:строки(з.ф,10).slice(0,3)}),
          (отв?Л.знак(236,96,48,ЗНАКИ[з.зн])+метка(236,150,ЗНАКИ_ИМЯ[з.зн],КР,{кегль:10}):`<path d="M236 48 L284 96 L236 144 L188 96 Z" fill="none" stroke="#9aa0a8" stroke-width="3" stroke-dasharray="6 5"/>`+тА(236,108,'?',32,'#9aa0a8'))+
          (ст.серия>=3?метка(96,6,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Что делать', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=184, y0=160, отв=ст.ответ!=null, стр=строки(отв?з.ок:'',34);
        return свгЛ(сцена(Н,y0,Л.кран(306,40,0.6,отв,40)+огнетушитель(26,96),
          `<rect x="50" y="26" width="236" height="${отв?96:60}" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/>`+тА(168,52,з.ф,15,'#ffd76a')+
          (отв?стр.map((t0,i)=>тА(168,78+i*16,t0,12,'#8fe0b0')).join(''):тА(168,74,'что делать?',12,'#9aa3ad'))+(ст.серия>=3?метка(168,134,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r112Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r112T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r112TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L112 = {
    id: ID, title: 'Безопасность на кухне и в лаборатории', ico: '⚠️',
    src: 'Химия · 5–6 класс · Безопасность', subj: 'chem',
    explain: [
      'Карточка работы: инструктаж перед допуском.',
      'Экипировка: одень лаборанта для опыта.',
      'Найди 6 нарушений на лабораторном столе.',
      'Спиртовка: зажечь, нагреть, погасить.',
      'Нюхать, пробовать, трогать.',
      'Знаки опасности на бытовой химии.',
      'Если что-то случилось: первая помощь.',
      'Допуск в лабораторию.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: можно или нельзя.',
      'Тренажёр 2: знак опасности.',
      'Тренажёр 3: что делать.'
    ],
    check: { q: 'Чего нельзя делать в лаборатории?', choices: ['Мыть посуду','Пробовать вещества на вкус','Читать инструкцию','Надевать перчатки'], ans: 1, exp: 'Вещества могут быть ядовитыми — пробовать их на вкус нельзя.' },
    tasks: [
      { q: 'На столе пролита кислота. Что нужно сделать?', kind: 'choice', choices: ['Вытереть бумагой','Сразу позвать взрослого','Попробовать её на вкус','Продолжить работу'], ans: 1, tol: 0, hints: ['Кислота едкая и опасная.', 'Пролитое вещество убирает взрослый.'], sol: 'Пролитую кислоту убирает взрослый.' },
      { q: 'Как правильно погасить спиртовку?', kind: 'choice', choices: ['Задуть её','Накрыть колпачком','Залить водой','Помахать рукой'], ans: 1, tol: 0, hints: ['Дуть на спиртовку опасно.', 'Колпачок перекрывает доступ воздуха.'], sol: 'Спиртовку гасят колпачком — пламя гаснет без доступа кислорода.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.лаборант){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L112.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Инструктаж',2:'Экипировка',3:'Найди нарушения',4:'Спиртовка',5:'Органы чувств',6:'Знаки опасности',7:'Первая помощь',8:'Допуск',9:'Проверка',10:'Практика',
      11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l112n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Безопасность'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r112Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r112вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r112э=(что)=>{ const s=S(); const э=Object.assign({},s.э2||{});
    if(что==='бутерброд'){ s.отз2={ок:false,т:'Еду в лабораторию не берут: вещество с рук или со стола может попасть в бутерброд.'}; chRender(0); return; }
    const Э=ЭКИП.find(x=>x.к===что); if(!Э) return;
    if(э[что]){ s.отз2={ок:true,т:Э.имя+' — уже готово.'}; chRender(0); return; }
    if(что==='перчатки'&&!э.халат){ s.отз2={ок:false,т:'Сначала халат: перчатки надевают последними, чтобы не испачкать их, застёгивая пуговицы.'}; chRender(0); return; }
    э[что]=true; s.э2=э; s.отз2={ок:true,т:Э.т+(ЭКИП.every(x=>э[x.к])?' Лаборант готов к опыту!':'')}; chRender(0); };
  window.r112н=(к)=>{ const s=S(); const н=Object.assign({},s.н3||{});
    if(ЛОВУШКИ[к]){ const л=Object.assign({},s.л3||{}); л[к]=true; s.л3=л; s.отз3={ок:false,т:ЛОВУШКИ[к]+' Ищи нарушения дальше.'}; chRender(0); return; }
    const Н=НАРУШЕНИЯ.find(x=>x.к===к); if(!Н) return;
    if(н[к]){ s.отз3={ок:true,т:'Это нарушение уже в протоколе: '+Н.ф.toLowerCase()+'.'}; chRender(0); return; }
    н[к]=true; s.н3=н; s.подск3=null; const все=НАРУШЕНИЯ.every(x=>н[x.к]); if(все) s.дело_ошибки=true;
    s.отз3={ок:true,т:'<b>'+Н.ф+'.</b> '+Н.почему+(все?' Все шесть найдены!':'')}; chRender(0); };
  window.r112подск=()=>{ const s=S(); const н=s.н3||{}; const сл=НАРУШЕНИЯ.find(x=>!н[x.к]); if(!сл) return; s.подск3=сл.к; s.отз3={ок:false,т:'Посмотри туда, где жёлтая рамка.'}; chRender(0); };
  const ИМЯ4 = {колпачок:'колпачок',спички:'спички',спиртовка:'другую спиртовку',держатель:'держатель',вода:'воду',дуть:'«задуть»'};
  window.r112о4=(что)=>{ const s=S(); const ш=s.о4||0; if(ш>=ШАГИ4.length) return; const нужно=ШАГИ4[ш].что;
    const вперёд=(т)=>{ s.о4=ш+1; s.о4отз={ок:true,т:т}; if(s.о4>=ШАГИ4.length) s.дело_спиртовка=true; chRender(0); };
    const отказ=(т)=>{ s.о4отз={ок:false,т:т}; chRender(0); };
    if(ш===0&&что==='колпачок') return вперёд('Колпачок снят и лежит рядом — он ещё понадобится.');
    if(ш===1&&что==='спички') return вперёд('Чиркнули спичкой — фитиль загорелся. Спичку гасим и кладём в стакан для мусора.');
    if(ш===1&&что==='спиртовка') return отказ('Никогда не зажигай спиртовку от другой спиртовки: спирт прольётся и вспыхнет.');
    if(ш===2&&/^з\d$/.test(что)){ if(что==='з2') return вперёд('Верно: верхняя часть пламени — самая горячая.');
      s.о4отз={ок:false,j:+что[1],т:что==='з0'?'Внизу, у фитиля, пары спирта ещё не сгорели — там холоднее всего.':'Средняя часть горячая, но верхняя — ещё горячее.'}; chRender(0); return; }
    if(ш===3&&что==='держатель') return вперёд('Пробирка в держателе, отверстием от людей. Сначала прогреваем её целиком, потом — в верхней части пламени.');
    if(ш===4&&что==='колпачок') return вперёд('Колпачок перекрыл воздух — пламя погасло. Спиртовка закрыта и готова к следующему опыту.');
    if(что==='дуть') return отказ('Задувать нельзя: пламя может проскочить внутрь, к парам спирта.');
    if(что==='вода') return отказ('Водой спиртовку не гасят: можно разбить горячее стекло и расплескать горящий спирт.');
    if(что==='спиртовка') return отказ('Вторая спиртовка не нужна — работаем с одной.');
    return отказ('Сейчас это не нужно. Шаг '+(ш+1)+': '+ШАГИ4[ш].т); };
  window.r112о4сброс=()=>{ const s=S(); s.о4=0; s.о4отз=null; chRender(0); };
  window.r112с=(i)=>{ const s=S(); if(!СЕНСОРЫ[i]) return; s.с5=i; s.отз5=null; chRender(0); };
  window.r112со=(j)=>{ const s=S(); const С=СЕНСОРЫ[s.с5||0]; const сд=Object.assign({},s.сд5||{});
    if(j===С.в){ сд[С.к]=true; s.сд5=сд; s.отз5={ок:true,т:С.р[1]}; } else s.отз5={ок:false,j:j,т:С.р[0]}; chRender(0); };
  window.r112т=(i)=>{ const s=S(); if(!ТОВАРЫ[i]) return; s.т6=i; s.отз6=null; chRender(0); };
  window.r112зн=(j)=>{ const s=S(); const Т=ТОВАРЫ[s.т6]; if(!Т) return;
    if(j===Т.зн){ const с=Object.assign({},s.сд6||{}); с[s.т6]=true; s.сд6=с; s.отз6={ок:true,т:'Знак «'+ЗНАКИ_ИМЯ[j]+'». '+Т.почему}; }
    else s.отз6={ок:false,j:j,т:'Подумай, чем опасно «'+Т.ф.toLowerCase()+'»: '+['горит?','разъедает кожу?','это яд?','раздражает кожу и глаза?'][Т.зн]};
    chRender(0); };
  window.r112сл=(j)=>{ const s=S(); const n=s.сл7||0; if(s.ок7) return; const С=СЛУЧАИ[n];
    if(j===С.в){ s.ок7=true; if(n>=СЛУЧАИ.length-1) s.помощь7=true; s.отз7={ок:true,т:С.р}; } else s.отз7={ок:false,j:j,т:'Так можно сделать хуже. '+С.р};
    chRender(0); };
  window.r112слдальше=()=>{ const s=S(); if(!s.ок7||(s.сл7||0)>=СЛУЧАИ.length-1) return; s.сл7=Math.min((s.сл7||0)+1,СЛУЧАИ.length-1); s.ок7=false; s.отз7=null; chRender(0); };
  window.r112штамп=()=>{ const s=S(); if(ЧЕК(s).every(x=>x[1])) s.штамп8=true; chRender(0); };
  window.r112мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар9||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв9={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв9={i:м.n,ок:false,j:j}; }
    s.мар9=м; chRender(0); };
  window.r112заново=()=>{ const s=S(); s.мар9={n:0,ош:0}; s.отв9=null; chRender(0); };
  window.r112Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r112Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r112T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r112TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r112Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L112,{__планПорядок:arr[м].__планПорядок}); else arr.push(L112); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU112={render:render, L:L112};
})();
