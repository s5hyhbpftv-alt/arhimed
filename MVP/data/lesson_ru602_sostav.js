/* ============ РУССКИЙ ЯЗЫК · УРОК 602 · «СОСТАВ СЛОВА: ИЗ ЧЕГО СОСТОИТ СЛОВО» · НОВАЯ ВЕРСИЯ ============
   5 класс, морфемика (Ладыженская, 5 класс). Урок переделан по просьбе владельца: вместо
   схем из плашек — сюжет и рисованные сцены из общей библиотеки MVP/data/ris_more.js.
   НОВЫЕ ГЕРОИ: ювелир Агафон (ювелир) и сорока-воровка Клепта (сорока); самоцветы (бусина)
   и верстак мастера (верстак). Прежние рисовальщики 602 в vis_ru.js (visB602 и обёртка
   RU602FRAME) не удалены: этот файл перекрывает их через VISKW[602] и WAVE_B[602] и
   заменяет запись урока в ARH_LESSONS.

   СЮЖЕТ. «Мастерская Агафона». В Сиракузах живёт ювелир, который собирает слова, как
   ожерелья из самоцветов. У каждого камня своя порода: сапфир — приставка (перед корнем),
   изумруд — корень (общий у всей родни), янтарь — суффикс (после корня), рубин —
   окончание в застёжке-рамке (его меняют, чтобы слово сцепилось с соседями). Если в
   застёжке пусто — это нулевое окончание. Нить без застёжки — основа. Сорока Клепта
   таскает камни и путает родню, а девочка Мирто помогает мастеру.

   РУКАМИ: четыре камня «пришкольного»; родня изумруда «лес» среди ловушек (лестница,
   лесть, лиса); ослик и приставки приход/уход/переход/вход; суффиксы дом→домик,
   лес→лесник, кот→котёнок; окончание сцепляет слова (амфора, амфору, амфорой); пустая
   застёжка «лес»; снятая застёжка — основа; разбор «подснежника» по шагам; родня или
   формы; игра «Заказ Агафона» — десять слов, три ошибки — мастерская закрыта.

   ТРЕНАЖЁРЫ НОВОГО ВИДА: что за камень подсвечен; родня или формы; найди корень
   (круг из восьми, серия, звёзды).

   ПРОВЕРЕНО ПО ПРОГРАММЕ 5 КЛАССА (Ладыженская): морфема — наименьшая значимая часть
   слова; корень — общая часть однокоренных слов; приставка — перед корнем, суффикс —
   после корня, служат для образования слов; окончание — изменяемая часть, служит для
   связи слов, бывает нулевым (стол, лес); основа — часть слова без окончания; разбор
   начинают с окончания; однокоренные слова и формы одного слова различают. Глаголы в
   неопределённой форме в разборе не берём, чтобы не спорить о -ть. */
(function(){
  'use strict';

  const ID = 602;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  /* порода камня для каждой морфемы — одинаковая во всём уроке */
  const ЦВ = {'приставка':'#2a6ad8','корень':'#1f9a5a','суффикс':'#e0a020','окончание':'#c8325a'};
  const КАМ = {'приставка':'сапфир','корень':'изумруд','суффикс':'янтарь','окончание':'рубин'};
  const ТИПЫ = ['приставка','корень','суффикс','окончание'];

  const ДЕЛА = [
    {ключ:'камни',  имя:'Узнать четыре камня', итог:'4 из 4'},
    {ключ:'родня',  имя:'Собрать родню «леса»', итог:'5 из 5'},
    {ключ:'заказ',  имя:'Выполнить заказ',     итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  /* запись слова: 'при-п|школь-к|н-с|ый-о'; пустое окончание — '-о' */
  const КОД = {п:'приставка',к:'корень',с:'суффикс',о:'окончание'};
  const СЛ = (w) => w.split('|').map(x=>{ const i=x.lastIndexOf('-'); return {t:x.slice(0,i), тип:КОД[x.slice(i+1)]}; });
  const ЦЕЛОЕ = (ч) => ч.map(x=>x.t).join('');

  const КАМНИ1 = [
    {t:'при',  тип:'приставка', д:'стоит перед корнем и уточняет: «при школе»'},
    {t:'школь',тип:'корень',    д:'главный смысл, общий с роднёй: школа, школьник'},
    {t:'н',    тип:'суффикс',   д:'стоит после корня и делает из «школы» признак'},
    {t:'ый',   тип:'окончание', д:'меняется: пришкольный, пришкольная, пришкольного'}
  ];
  const РОДНЯ = [
    {w:'лесной',    ок:true,  ч:'лес-к|н-с|ой-о'},
    {w:'лестница',  ок:false, р:'«лестница» — от «лезть», к лесу отношения нет'},
    {w:'лесник',    ок:true,  ч:'лес-к|ник-с|-о'},
    {w:'лесть',     ок:false, р:'«лесть» — хитрая похвала, это не лесная родня'},
    {w:'перелесок', ок:true,  ч:'пере-п|лес-к|ок-с|-о'},
    {w:'лиса',      ок:false, р:'у «лисы» корень «лис», а не «лес»'},
    {w:'лесок',     ок:true,  ч:'лес-к|ок-с|-о'},
    {w:'лесистый',  ок:true,  ч:'лес-к|ист-с|ый-о'}
  ];
  const ПРИСТ = [
    {w:'приход', ч:'при-п|ход-к|-о',  д:'ослик приходит к дому'},
    {w:'уход',   ч:'у-п|ход-к|-о',    д:'ослик уходит прочь'},
    {w:'переход',ч:'пере-п|ход-к|-о', д:'ослик переходит через мост'},
    {w:'вход',   ч:'в-п|ход-к|-о',    д:'ослик входит в дверь'}
  ];
  const СУФ = [
    {без:'дом-к|-о', с:'дом-к|ик-с|-о',        что:'маленький дом'},
    {без:'лес-к|-о', с:'лес-к|ник-с|-о',       что:'человек, который бережёт лес'},
    {без:'кот-к|-о', с:'кот-к|ёнок-с|-о',      что:'детёныш кошки'}
  ];
  const ОКОНЧ = [
    {фраза:['Вот амфор','.'],             в:0, р:'Вот (что?) амфора — окончание -а.'},
    {фраза:['Мирто несёт амфор','.'],     в:1, р:'Несёт (что?) амфору — окончание -у.'},
    {фраза:['Мирто любуется амфор','.'],  в:2, р:'Любуется (чем?) амфорой — окончание -ой.'}
  ];
  const ОКВАР = ['а','у','ой'];
  const ЛЕС = [
    {ч:'лес-к|-о',  фраза:'Вот лес.',        пад:'кто? что? — окончания не слышно'},
    {ч:'лес-к|а-о', фраза:'Нет леса.',       пад:'кого? чего? — окончание -а'},
    {ч:'лес-к|у-о', фраза:'Иду к лесу.',     пад:'кому? чему? — окончание -у'},
    {ч:'лес-к|ом-о',фраза:'Любуюсь лесом.',  пад:'кем? чем? — окончание -ом'}
  ];
  const ПАРЫ9 = [['лес','леса',1],['лес','лесник',0],['дом','домик',0],['дом','дома',1],['книга','книжный',0],['книга','книгу',1]];
  const ЗАКАЗ = [
    {ч:'пере-п|ход-к|-о',         и:0},
    {ч:'лес-к|ник-с|-о',          и:1},
    {ч:'амфор-к|у-о',             и:1},
    {ч:'под-п|снеж-к|ник-с|-о',   и:1},
    {ч:'стол-к|-о',               и:1},
    {ч:'дом-к|ик-с|-о',           и:1},
    {ч:'при-п|бреж-к|н-с|ый-о',   и:0},
    {ч:'за-п|пис-к|к-с|а-о',      и:1},
    {ч:'мор-к|ск-с|ой-о',         и:2},
    {ч:'рыб-к|ак-с|-о',           и:1}
  ].map(x=>({ч:СЛ(x.ч), и:x.и}));

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const СОСЕД = {'приставка':'суффикс','корень':'приставка','суффикс':'окончание','окончание':'суффикс'};
  const П1 = [['при-п|ход-к|-о',0],['лес-к|ник-с|-о',1],['книг-к|а-о',1],['под-п|снеж-к|ник-с|-о',1],['дом-к|ик-с|-о',1],['вод-к|а-о',0],
    ['за-п|пис-к|к-с|а-о',2],['рыб-к|ак-с|-о',1],['пере-п|лёт-к|-о',0],['гор-к|ы-о',1],['при-п|бреж-к|н-с|ый-о',3],['стол-к|-о',1],
    ['мор-к|ск-с|ой-о',1],['лес-к|ок-с|-о',1],['по-п|лёт-к|-о',0],['снеж-к|ок-с|-о',0]]
    .map(([w,и],i)=>{ const ч=СЛ(w), ок=ч[и].тип, нет=СОСЕД[ок], м=МЕСТО(i);
      return {q:'«'+ЦЕЛОЕ(ч)+'» — что за камень подсвечен?', ч:ч, и:и, вар:м?[нет,ок]:[ок,нет], в:м,
        раз:(ч[и].t?'«'+ч[и].t+'» — ':'Пустая застёжка — ')+ок+(ч[и].t?'':' (нулевое)')+'.'}; });
  const П2 = [['лес','леса',1],['лес','лесник',0],['дом','домик',0],['дом','дома',1],['книга','книжный',0],['книга','книгу',1],['вода','водой',1],['вода','водяной',0],
    ['снег','снежок',0],['снег','снега',1],['гора','горы',1],['гора','горный',0],['море','морской',0],['море','моря',1],['рыба','рыбу',1],['рыба','рыбак',0]]
    .map(([a,b,ф])=>({q:'«'+a+'» и «'+b+'» — это…', a:a, b:b, вар:['родственные слова','формы одного слова'], в:ф,
      раз:ф?'Смысл тот же, меняется только окончание — формы одного слова.':'Корень общий, а смысл новый — это разные, родственные слова.'}));
  const П3 = [['подводный','вод','под','под-п|вод-к|н-с|ый-о'],['пригородный','город','при','при-п|город-к|н-с|ый-о'],['лесник','лес','ник','лес-к|ник-с|-о'],
    ['перелёт','лёт','пере','пере-п|лёт-к|-о'],['снежок','снеж','ок','снеж-к|ок-с|-о'],['рыбак','рыб','ак','рыб-к|ак-с|-о'],['домик','дом','ик','дом-к|ик-с|-о'],
    ['морской','мор','ск','мор-к|ск-с|ой-о'],['горный','гор','н','гор-к|н-с|ый-о'],['водяной','вод','ян','вод-к|ян-с|ой-о'],['прибрежный','бреж','при','при-п|бреж-к|н-с|ый-о'],
    ['подснежник','снеж','под','под-п|снеж-к|ник-с|-о'],['листок','лист','ок','лист-к|ок-с|-о'],['полёт','лёт','по','по-п|лёт-к|-о']]
    .map(([w,ок,нет,ч],i)=>({q:'Найди корень в слове «'+w+'»', w:w, ч:СЛ(ч), вар:МЕСТО(i+3)?[нет,ок]:[ок,нет], в:МЕСТО(i+3), раз:'Корень «'+ок+'» — он общий у родни.'}));

  const CSS=`
  #lvis .s6.l602n .ряд button.был{opacity:.55;text-decoration:line-through;border-color:#e86a5a}
  #lvis .s6.l602n{gap:14px}
  #lvis .s6.l602n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l602n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l602n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l602n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l602n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l602n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l602n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l602n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l602n .карт .текст b{color:${GOLD}}
  #lvis .s6.l602n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l602n .правило b{color:${GOLD}}
  #lvis .s6.l602n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l602n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l602n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l602n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l602n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l602n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l602n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l602n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l602n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l602n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l602n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l602n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l602n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l602n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l602n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l602n .буйки button.мимо{border-color:${RED};animation:l602nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l602nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l602n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l602n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l602n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l602n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l602n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l602n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l602n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l602n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l602n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l602n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l602n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l602n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l602n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l602n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l602n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l602n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l602n .уровни .точка.сейчас{background:${GOLD};animation:l602ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l602ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l602n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l602n{-webkit-text-size-adjust:100%}
  #lvis .s6.l602n [data-anim]{animation:l602nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l602nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l602n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l602n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l602n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l602n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l602n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l602n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l602n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l602n [data-anim]{animation:none!important}
    #lvis .s6.l602n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l602n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l602n-style');
      if(!s){ s=document.createElement('style'); s.id='l602n-style'; document.head.appendChild(s); }
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
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Судовой журнал</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,f) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r602Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Мастерская Агафона</span><b class="${всё?'готово':''}">${
        всё?'заказ выполнен':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c602-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c602-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c602-бархат" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3c7c"/><stop offset="1" stop-color="#121c46"/></linearGradient>
      <linearGradient id="c602-стена" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2cca2"/><stop offset="1" stop-color="#b8946a"/></linearGradient>
      <radialGradient id="c602-луч" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6c0" stop-opacity=".85"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.64+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c602-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c602-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c602-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c602-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  const бирка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||14, ш=String(t0).length*к*0.64+20, в=к+13;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<g filter="url(#c602-тень)"><rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="${о.фон||'#fffaf0'}" stroke="${цвет||ОБВОД}" stroke-width="${цвет?2.2:1}"/></g>${т(x,y+в/2+к*0.35,t0,к,о.цветТ||ЧЕРНИЛА,true)}`; };

  /* ---------- ожерелье-слово: камни по морфемам на золотой нити ----------
     ч — части [{t,тип}], (cx,y) — центр нити; опц: кегль, значки (знаки разбора), основа,
     выдел (номер камня под лучом лампы), до (сколько камней показать), знак (набор типов,
     для которых рисовать значок), снято (окончание снято с нити) */
  const размерКамня = (ч,к) => ч.map(x=>x.t?Math.max(к*1.7,x.t.length*к*0.62+к*1.2):к*1.5);
  function ожерелье(ч,cx,y,опц){
    const о=опц||{}, к=о.кегль||17, в=к+17, зазор=Math.round(к*0.35), М=Р();
    const ш=размерКамня(ч,к), всего=ш.reduce((a,b)=>a+b,0)+зазор*(ч.length-1);
    let x=cx-всего/2; const X=ш.map(w=>{ const c=x+w/2; x+=w+зазор; return c; });
    const x0=cx-всего/2, x1=cx+всего/2, до=о.до==null?ч.length:о.до;
    const знак=(тип)=> о.значки || (о.знак&&о.знак[тип]);
    const линия=(d)=>`<path d="${d}" stroke="#1a1208" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><path d="${d}" stroke="#ffe9a0" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    let нить=о.безЗамка?`<path d="M${(x0-10).toFixed(1)} ${y} H${(x1+10).toFixed(1)}" stroke="url(#рм-латунь)" stroke-width="2.4" fill="none" stroke-dasharray="3.4 1.6"/>`:`<path d="M${(x0-18).toFixed(1)} ${y-в*0.7} Q${(x0-20).toFixed(1)} ${y} ${x0.toFixed(1)} ${y} H${x1.toFixed(1)} Q${(x1+20).toFixed(1)} ${y} ${(x1+18).toFixed(1)} ${y-в*0.7}" stroke="url(#рм-латунь)" stroke-width="2.6" fill="none" stroke-dasharray="3.4 1.6"/>
      <circle cx="${(x0-18).toFixed(1)}" cy="${(y-в*0.7-3).toFixed(1)}" r="3.4" fill="none" stroke="url(#рм-латунь)" stroke-width="2"/><circle cx="${(x1+18).toFixed(1)}" cy="${(y-в*0.7-3).toFixed(1)}" r="3.4" fill="none" stroke="url(#рм-латунь)" stroke-width="2"/>`;
    const камни=ч.map((ч0,i)=>{ if(i>=до) return '';
      const cxi=X[i], wi=ш[i], сн=о.снято&&ч0.тип==='окончание';
      const дx=сн?(x1+14-cxi+wi/2):0, дy=сн?в*0.9:0;
      const свет=о.выдел===i;
      let г='';
      if(свет) г+=`<ellipse cx="${cxi.toFixed(1)}" cy="${y}" rx="${(wi*0.75+10).toFixed(1)}" ry="${(в*0.95).toFixed(1)}" fill="url(#c602-луч)">${анЛин('opacity','1;.55;1','1.6s')}</ellipse>`;
      if(!ч0.t) г+=`<rect x="${(cxi-wi/2).toFixed(1)}" y="${(y-в/2).toFixed(1)}" width="${wi.toFixed(1)}" height="${в}" rx="4" fill="rgba(10,14,30,.55)" stroke="url(#рм-латунь)" stroke-width="3"/>
          <rect x="${(cxi-wi/2).toFixed(1)}" y="${(y-в/2).toFixed(1)}" width="${wi.toFixed(1)}" height="${в}" rx="4" fill="none" stroke="#6a4a10" stroke-width=".7"/>`;
      else г+=М.бусина(cxi,y,wi,в,ЦВ[ч0.тип],{тускло:о.тускло&&о.тускло[i]})+
        `<text x="${cxi.toFixed(1)}" y="${(y+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="#fff" stroke="#10131c" stroke-width="${(к*0.2).toFixed(1)}" paint-order="stroke" stroke-linejoin="round" font-family="Georgia,serif">${esc(ч0.t)}</text>`;
      if(свет) г+=`<rect x="${(cxi-wi/2-4).toFixed(1)}" y="${(y-в/2-4).toFixed(1)}" width="${(wi+8).toFixed(1)}" height="${в+8}" rx="${(в/2+4).toFixed(1)}" fill="none" stroke="#fff4b0" stroke-width="2.4" stroke-dasharray="5 4">${анЛин('stroke-dashoffset','0;18','1.2s')}</rect>`;
      /* знаки морфемного разбора */
      const л=cxi-wi/2, п=cxi+wi/2, в0=y-в/2-5;
      if(знак(ч0.тип)){
        if(ч0.тип==='приставка') г+=линия(`M${(л+1).toFixed(1)} ${в0} H${(п-1).toFixed(1)} V${в0+8}`);
        if(ч0.тип==='корень') г+=линия(`M${(л+2).toFixed(1)} ${в0+2} Q${cxi.toFixed(1)} ${в0-16} ${(п-2).toFixed(1)} ${в0+2}`);
        if(ч0.тип==='суффикс') г+=линия(`M${(л+2).toFixed(1)} ${в0+2} L${cxi.toFixed(1)} ${в0-10} L${(п-2).toFixed(1)} ${в0+2}`);
        if(ч0.тип==='окончание') г+=`<rect x="${(л-3).toFixed(1)}" y="${(y-в/2-3).toFixed(1)}" width="${(wi+6).toFixed(1)}" height="${в+6}" rx="3" fill="none" stroke="#1a1208" stroke-width="4.6" opacity=".7"/><rect x="${(л-3).toFixed(1)}" y="${(y-в/2-3).toFixed(1)}" width="${(wi+6).toFixed(1)}" height="${в+6}" rx="3" fill="none" stroke="#ffe9a0" stroke-width="2.4"/>`;
      }
      return дx||дy ? `<g transform="translate(${дx.toFixed(1)} ${дy.toFixed(1)}) rotate(14 ${cxi.toFixed(1)} ${y})">${г}</g>` : г; }).join('');
    let основа='';
    if(о.основа){ const посл=ч.map(x=>x.тип).lastIndexOf('окончание'); const кон=посл>=0?X[посл]-ш[посл]/2-зазор/2:x1; const yy=y+в/2+7;
      основа=линия(`M${(x0+1).toFixed(1)} ${yy-7} V${yy} H${(кон).toFixed(1)} V${yy-7}`); }
    return нить+камни+основа;
  }
  /* ширина ожерелья — чтобы уместить в кадре */
  const ширина = (ч,к) => размерКамня(ч,к).reduce((a,b)=>a+b,0)+Math.round(к*0.35)*(ч.length-1)+40;

  /* бархатный лоток под ожерелье */
  const бархат = (x,y,ш,в) => `<g filter="url(#c602-тень)"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="10" fill="url(#c602-бархат)" stroke="#c8a040" stroke-width="2"/></g>
    <rect x="${x+5}" y="${y+5}" width="${ш-10}" height="${в-10}" rx="7" fill="none" stroke="#e8c870" stroke-width=".8" stroke-dasharray="2 3" opacity=".7"/>`;

  /* мастерская: оштукатуренная стена с кладкой, арочное окно на море, полка, дощатый пол */
  const мастерская = (Н,y0,опц) => { const М=Р(), о=опц||{};
    return `<rect width="336" height="${y0}" fill="url(#c602-стена)"/>
      ${Array.from({length:Math.ceil(y0/26)},(_,r)=>`<path d="M0 ${r*26+26} H336" stroke="#9a7648" stroke-width=".7" opacity=".35"/>${Array.from({length:7},(_,k)=>`<path d="M${(k*56+(r%2)*28).toFixed(0)} ${r*26} v26" stroke="#9a7648" stroke-width=".7" opacity=".3"/>`).join('')}`).join('')}
      ${о.окно===false?'':`<clipPath id="c602-арка"><path d="M252 ${y0-44} V40 Q252 14 284 14 Q316 14 316 40 V${y0-44} Z"/></clipPath>
        <g clip-path="url(#c602-арка)"><g transform="translate(248 10)">${М.небо(72,y0-40,о.вечер?{закат:true,солнце:[40,y0-70,9],облака:[]}:{облака:[[30,22,0.28,0]]})}${М.море(y0-80,30,72,о.вечер?{дорожка:40}:{})}</g></g>
        <path d="M252 ${y0-44} V40 Q252 14 284 14 Q316 14 316 40 V${y0-44}" fill="none" stroke="#e8dcc0" stroke-width="7"/><path d="M252 ${y0-44} V40 Q252 14 284 14 Q316 14 316 40 V${y0-44}" fill="none" stroke="${ОБВОД}" stroke-width="1"/>
        <rect x="244" y="${y0-46}" width="80" height="8" rx="2" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>`}
      ${о.полка===false?'':`<rect x="10" y="${y0-92}" width="96" height="6" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".8"/>${М.амфора(30,y0-92,0.5)}${М.амфора(62,y0-92,0.42)}${М.амфора(88,y0-92,0.36)}`}
      ${М.доски(0,y0,336,Н-y0)}<rect x="0" y="${y0-4}" width="336" height="6" fill="url(#рм-доскатём)" stroke="${ОБВОД}" stroke-width=".6"/>
      ${о.вечер?`<rect width="336" height="${Н}" fill="#ff9a50" opacity=".1"/>`:''}
      <circle cx="${о.лампаX||120}" cy="${y0-30}" r="90" fill="url(#c602-лампа)"/>`; };

  /* дорога у моря для приставок */
  const дорога = (Н) => { const М=Р();
    return `${М.небо(336,Н,{облака:[[60,26,0.5,6],[230,40,0.4,-6]]})}
      <path d="M0 ${Н-110} Q90 ${Н-140} 180 ${Н-118} Q270 ${Н-100} 336 ${Н-124} V${Н} H0 Z" fill="url(#рм-холмдаль)"/>
      <path d="M0 ${Н-80} Q168 ${Н-96} 336 ${Н-82} V${Н} H0 Z" fill="url(#рм-холм)"/>
      <path d="M126 ${Н-80} Q150 ${Н-40} 136 ${Н} H176 Q188 ${Н-42} 168 ${Н-82} Z" fill="#5aa0c8" stroke="#3a7aa0" stroke-width="1"/>
      <path d="M0 ${Н-34} Q80 ${Н-44} 168 ${Н-40} Q260 ${Н-36} 336 ${Н-46} L336 ${Н-24} Q250 ${Н-16} 168 ${Н-22} Q80 ${Н-24} 0 ${Н-14} Z" fill="#d8bc88" stroke="#a88a58" stroke-width=".8"/>`; };
  const мостик = (Н) => `<path d="M118 ${Н-36} Q152 ${Н-58} 188 ${Н-36}" stroke="#6a4020" stroke-width="9" fill="none"/><path d="M118 ${Н-36} Q152 ${Н-58} 188 ${Н-36}" stroke="url(#рм-доска)" stroke-width="6" fill="none"/>
    ${[124,138,152,166,180].map(x=>`<path d="M${x} ${Н-40-(x>140&&x<170?12:6)} v-14" stroke="#6a4020" stroke-width="2"/>`).join('')}<path d="M122 ${Н-54} Q152 ${Н-78} 184 ${Н-54}" stroke="#6a4020" stroke-width="2.4" fill="none"/>`;

  /* ================= КАДРЫ ================= */

  /* 1. Мастерская Агафона: четыре камня */
  function F1(s){
    const Н=316, М=Р(), вид=s.вид1||{}, к=s.к1, все=КАМНИ1.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const с=к==null?null:КАМНИ1[к];
    const знак={}; КАМНИ1.forEach((x,i)=>{ if(вид[i]) знак[x.тип]=true; });
    return ЖУРНАЛ(s) +
      ЗАДАЧА('В Сиракузах, в мастерской у самого моря, работает ювелир <b>Агафон</b>. Он собирает слова, как ожерелья: из самоцветов разной породы. «Вот слово <b>пришкольный</b>, — говорит он Мирто. — В нём четыре камня. Нажми каждый — узнаешь, как его зовут».') +
      `<div class="pic">${свг(`
        ${мастерская(Н,196,{лампаX:140,полка:false})}
        ${бархат(12,20,240,92)}
        ${ожерелье(СЛ('при-п|школь-к|н-с|ый-о'),132,70,{кегль:16,знак:знак,выдел:к})}
        ${с?бирка(132,122,с.тип+' — '+КАМ[с.тип],ЦВ[с.тип],{кегль:13})+т(168,180,с.д,10.5,'#fff4c0',true,'middle','#1a1208'):''}
        ${М.сорока(292,150,0.6,{})}
        ${М.верстак(90,244,170,60,{})}
        ${М.ювелир(62,Н-12,0.82,{поза:к==null?'лупа':'указывает'})}
        ${М.девочка(286,Н-12,0.74,{поза:все?'машет':'стоит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${КАМНИ1.map((x,i)=>BTN(3+i,к===i?'вкл':'',x.t,'r602камень('+i+')')).join('')}</div>` +
      (!все ? СКАЗ('Камни','Узнано камней: <b>'+КАМНИ1.filter((x,i)=>вид[i]).length+' из 4</b>. Над каждым узнанным камнем появляется его знак.') :
        ОТВЕТЫ('',['морфемы — самые маленькие части слова со смыслом','буквы и слоги'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Как называются эти камни-части слова?') :
          РАЗБОР(ок,['Верно: приставка, корень, суффикс и окончание — это <b>морфемы</b>. Каждая несёт свою долю смысла.',
            'Буквы и слоги смысла не несут: «шко» ничего не значит. А <b>морфема</b> — самая маленькая часть слова со смыслом.'][в]))) +
      (ок ? ПРАВИЛО('<b>Морфема</b> — наименьшая значимая часть слова. Главные морфемы: <b>приставка</b>, <b>корень</b>, <b>суффикс</b>, <b>окончание</b>.') : '');
  }

  /* 2. Изумруд-корень: родня «леса» */
  function F2(s){
    const Н=326, М=Р(), р=s.род2||{}, отв=s.отв2, найдено=РОДНЯ.filter((x,i)=>x.ок&&р[i]), все=найдено.length>=5, в=s.ответ2, ок=в===0;
    const пос=отв!=null?РОДНЯ[отв]:null;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Самый ценный камень — <b>изумруд-корень</b>. В нём главный смысл, и он общий у всей родни. Агафон собирает шкатулку слов с изумрудом <b>«лес»</b>. Но сорока Клепта подбросила подделки — слова, которые только похожи. Найди пять настоящих родственников.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,250,{окно:false,полка:false,лампаX:170})}
        ${бархат(14,12,308,230)}
        ${т(168,36,'шкатулка слов с корнем «лес»',12,'#ffe9a0',true)}
        ${найдено.map((x,k)=>ожерелье(СЛ(x.ч),168,72+k*38,{кегль:12,безЗамка:true,знак:{'корень':true}})).join('')}
        ${найдено.length===0?т(168,120,'пока пусто',13,'#8a9ac8',true):''}
        ${пос&&!пос.ок?`${М.сорока(290,Н-18,0.62,{поза:'сидит',влево:true})}${бирка(200,Н-70,'подделка: '+пос.w,RED,{кегль:12})}`:М.сорока(290,Н-18,0.62,{влево:true})}
        ${М.ювелир(48,Н-10,0.62,{поза:'лупа'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(2,minmax(0,1fr))">${РОДНЯ.map((x,i)=>BTN(3,р[i]?(x.ок?'вкл':'был'):'','<span style="font-size:17px">'+x.w+'</span>','r602родня('+i+')')).join('')}</div>` +
      (пос ? (пос.ок ? РАЗБОР(true,'«'+пос.w+'» — родственник: в нём тот же изумруд «лес».') : РАЗБОР(false,'Подделка! '+пос.р+'.')) : '') +
      (!все ? СКАЗ('Шкатулка','Найдено родственников: <b>'+найдено.length+' из 5</b>. Подсказка: у родни общий не только звук, но и <b>смысл</b>.') :
        ОТВЕТЫ('',['общая часть родственных слов, в ней главный смысл','первая часть любого слова'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','Так что же такое корень?') :
          РАЗБОР(ок,['Верно: корень — общая часть однокоренных слов. Лес, лесник, перелесок — одна родня.',
            'Первой может стоять приставка: <b>пере</b>лесок. Корень — это общая часть родственных слов.'][в]))) +
      (ок ? ПРАВИЛО('<b>Корень</b> — общая часть родственных (однокоренных) слов. Чтобы найти корень, подбери родню: <b>лес</b> — <b>лес</b>ник — пере<b>лес</b>ок. Похожие по звуку слова без общего смысла — не родня.') : '');
  }

  /* 3. Сапфир-приставка: ослик у дома */
  function F3(s){
    const Н=300, М=Р(), к=s.п3==null?0:s.п3, вид=s.видп3||{}, все=ПРИСТ.every((x,i)=>вид[i]||i===0&&s.п3==null&&false), в=s.ответ3, ок=в===0;
    const видАлл=ПРИСТ.every((x,i)=>вид[i]);
    const П=ПРИСТ[к];
    const ослик = к===0 ? М.ослик(236,Н-26,0.6,{поза:'идёт',поклажа:true})
      : к===1 ? М.ослик(56,Н-22,0.6,{поза:'идёт',поклажа:true,влево:true})
      : к===2 ? `<g transform="translate(0 -18)">${М.ослик(152,Н-36,0.52,{поза:'идёт',поклажа:true})}</g>`
      : М.ослик(280,Н-30,0.5,{поза:'стоит',поклажа:true});
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Перед корнем Агафон ставит <b>сапфир-приставку</b>. Она уточняет смысл. Корень «ход» один, а приставка ведёт ослика по-разному. Выбери слово — и посмотри, куда отправится ослик.') +
      `<div class="pic">${свг(`
        ${дорога(Н)}
        ${М.домик(300,Н-36,0.62,{дверь:к===3?1:0})}
        ${мостик(Н)}
        ${ослик}
        ${бархат(58,14,220,70)}
        ${ожерелье(СЛ(П.ч),168,54,{кегль:18,знак:{'приставка':true}})}
        ${бирка(168,94,П.д,ЦВ['приставка'],{кегль:12})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${ПРИСТ.map((x,i)=>BTN(3+i,к===i?'вкл':'',x.w,'r602прист('+i+')')).join('')}</div>` +
      (!видАлл ? СКАЗ('Попробуй','Выбери все четыре слова. Корень не меняется — меняется только сапфир.') :
        ОТВЕТЫ('пара',['перед корнем','после корня'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Где стоит приставка?') :
          РАЗБОР(ок,['Верно: при-, у-, пере-, в- стоят <b>перед корнем</b> и меняют смысл: приход, уход, переход, вход.',
            'После корня стоит суффикс. Приставка — <b>перед</b> корнем: <b>пере</b>ход.'][в]))) +
      (ок ? ПРАВИЛО('<b>Приставка</b> стоит перед корнем и служит для образования новых слов: ход → <b>при</b>ход, <b>у</b>ход, <b>пере</b>ход. Знак приставки — уголок над ней.') : '');
  }

  /* 4. Янтарь-суффикс */
  function F4(s){
    const Н=300, М=Р(), к=s.с4==null?0:s.с4, с=!!s.суф4, вид=s.видс4||{}, все=[0,1,2].every(i=>вид[i]), в=s.ответ4, ок=в===0;
    const Р4=СУФ[к], ч=СЛ(с?Р4.с:Р4.без);
    let сцена='';
    if(к===0) сцена = с ? М.домик(168,Н-24,0.5,{})+М.кот(236,Н-22,0.5,{}) : М.домик(168,Н-20,1.12,{});
    if(к===1) сцена = [44,96,250,300].map((x,i)=>М.сосна(x,Н-20-(i%2)*6,0.9+(i%2)*0.1)).join('') + (с?М.пастух(170,Н-14,0.78,{}):'');
    if(к===2) сцена = с ? М.кот(140,Н-24,0.9,{})+`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="1s" repeatCount="indefinite"/>`:''}${М.кот(214,Н-24,0.42,{поза:'прыгает'})}</g>` : М.кот(168,Н-24,1.05,{});
    return ЖУРНАЛ(s) +
      ЗАДАЧА('После корня Агафон вплетает <b>янтарь-суффикс</b>. Он тоже делает новое слово: маленький предмет, человека по делу, детёныша. Выбери слово и добавь янтарь.') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{облака:[[60,26,0.5,6]]})}
        <path d="M0 ${Н-80} Q168 ${Н-100} 336 ${Н-80} V${Н} H0 Z" fill="url(#рм-холм)"/>
        ${сцена}
        ${бархат(68,14,200,70)}
        ${ожерелье(ч,168,54,{кегль:18,знак:{'суффикс':true}})}
        ${бирка(168,94,с?Р4.что:'без янтаря — просто «'+ЦЕЛОЕ(ч)+'»',с?ЦВ['суффикс']:null,{кегль:12})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(3,minmax(0,1fr))">${СУФ.map((x,i)=>BTN(3+i,к===i?'вкл':'',ЦЕЛОЕ(СЛ(x.без)),'r602суфВыбор('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(6,'',с?'Снять янтарь':'Добавить янтарь-суффикс',"r602суф()")}</div>` +
      (!все ? СКАЗ('Попробуй','Добавь суффикс ко всем трём словам.') :
        ОТВЕТЫ('пара',['после корня','перед корнем'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Где стоит суффикс?') :
          РАЗБОР(ок,['Верно: дом<b>ик</b>, лес<b>ник</b>, кот<b>ёнок</b> — суффикс стоит <b>после корня</b>.',
            'Перед корнем стоит приставка. Суффикс — <b>после</b>: дом<b>ик</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Суффикс</b> стоит после корня и служит для образования новых слов: дом → дом<b>ик</b>, лес → лес<b>ник</b>. Знак суффикса — «крышечка» над ним.') : '');
  }

  /* 5. Рубин-окончание сцепляет слова */
  function F5(s){
    const Н=300, М=Р(), n=Math.min(s.ок5||0,ОКОНЧ.length), отв=s.отв5, все=n>=ОКОНЧ.length, в=s.ответ5, ок=в===0;
    const о=ОКОНЧ[Math.min(n,ОКОНЧ.length-1)];
    const показ = все ? ОКОНЧ[2] : о, выбр = все ? 2 : (отв&&отв.ок===false ? отв.j : null);
    const ч = [{t:'амфор',тип:'корень'},{t:выбр==null?'?':ОКВАР[выбр],тип:'окончание'}];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Последний камень — <b>рубин-окончание</b> в застёжке. Его Агафон меняет чаще всех: окончание сцепляет слово с соседями. Сорока Клепта утащила рубин из слова «амфора». Вставь в каждую фразу нужный.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,200,{лампаX:190})}
        ${бархат(24,14,200,70)}
        ${ожерелье(ч,124,54,{кегль:18,знак:{'окончание':true}})}
        ${М.сорока(290,150,0.62,{поза:'сидит',бусина:все?null:ЦВ['окончание'],влево:true})}
        <rect x="118" y="214" width="84" height="10" rx="2" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/><rect x="130" y="224" width="60" height="${Н-236}" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".8"/>
        ${М.амфора(160,214,1.1)}
        ${М.девочка(60,Н-12,0.8,{поза:n>=1?'ведёт':'стоит'})}
        ${бирка(168,98,все?'амфора · амфору · амфорой':показ.фраза[0]+(выбр==null?'…':ОКВАР[выбр]+показ.фраза[1]),все?GREEN:GOLD,{кегль:13})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask три">${ОКВАР.map((x,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'','<span style="font-size:22px;font-family:Georgia,serif">-'+x+'</span>','r602ок('+j+')')).join('')}</div>`) +
      (!все ? (отв ? (отв.ок ? РАЗБОР(true,ОКОНЧ[отв.i].р) : РАЗБОР(false,'Не сцепилось. Задай вопрос к слову: '+о.фраза[0]+'…?')) : СКАЗ('Фраза '+(n+1)+' из 3','Прочитай фразу вслух с каждым рубином — какой звучит правильно?')) :
        ОТВЕТЫ('',['изменяемая часть слова, она связывает слова','неизменная часть, в ней главный смысл'],0,в,5) +
        (в==null ? СКАЗ('Вопрос','Что же такое окончание?') :
          РАЗБОР(ок,['Верно: амфор<b>а</b>, амфор<b>у</b>, амфор<b>ой</b> — окончание меняется и сцепляет слово с другими.',
            'Главный смысл — в корне, а он не менялся. <b>Окончание</b> — изменяемая часть, она связывает слова.'][в]))) +
      (ок ? ПРАВИЛО('<b>Окончание</b> — изменяемая часть слова. Оно служит для <b>связи слов</b> в предложении и новых слов не образует. Знак окончания — рамка-застёжка.') : '');
  }

  /* 6. Пустая застёжка: нулевое окончание */
  function F6(s){
    const Н=290, М=Р(), к=s.л6==null?0:s.л6, вид=s.видл6||{}, все=[0,1,2,3].every(i=>вид[i]), в=s.ответ6, ок=в===0;
    const Л=ЛЕС[к];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Мирто принесла слово <b>лес</b> и удивилась: «В застёжке пусто! Сорока украла?» Агафон смеётся: «Нет, застёжка есть — просто камень в ней невидимый. Смотри, что будет, когда слово начнёт меняться».') +
      `<div class="pic">${свг(`
        ${М.небо(336,Н,{облака:[[70,30,0.5,6]]})}
        <path d="M0 ${Н-90} Q168 ${Н-110} 336 ${Н-90} V${Н} H0 Z" fill="url(#рм-холм)"/>
        ${[30,80,130,210,260,310].map((x,i)=>М.сосна(x,Н-34-(i%2)*10,0.72+(i%3)*0.08)).join('')}
        ${бархат(88,14,160,70)}
        ${ожерелье(СЛ(Л.ч),168,54,{кегль:18,знак:{'окончание':true}})}
        ${бирка(168,94,Л.фраза,к===0?GOLD:ЦВ['окончание'],{кегль:15})}
        ${т(168,142,Л.пад,11,'#fff4c0',true,'middle','#14221a')}
        ${М.девочка(60,Н-8,0.66,{поза:'стоит'})}${М.ювелир(276,Н-8,0.64,{поза:'указывает',влево:true})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${ЛЕС.map((x,i)=>BTN(3+i,к===i?'вкл':'',ЦЕЛОЕ(СЛ(x.ч)),'r602лес('+i+')')).join('')}</div>` +
      (!все ? СКАЗ('Попробуй','Измени слово во всех четырёх фразах.') :
        ОТВЕТЫ('пара',['есть — нулевое','нет совсем'],0,в,6) +
        (в==null ? СКАЗ('Вопрос','Есть ли окончание у слова «лес»?') :
          РАЗБОР(ок,['Верно: леса, лесу, лесом — окончание появляется. Значит, в «лес» оно тоже есть, только <b>нулевое</b>.',
            'Сравни: лес<b>а</b>, лес<b>у</b>, лес<b>ом</b>. Место для окончания есть всегда — в «лес» оно <b>нулевое</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Нулевое окончание</b> не слышно и не видно, но оно есть: лес□, стол□, дом□. Его находят, изменяя слово: лес — лес<b>а</b>. Обозначают пустой рамкой.') : '');
  }

  /* 7. Основа: нить без застёжки */
  function F7(s){
    const Н=290, М=Р(), сн=!!s.сн7, в=s.ответ7, ок=в===0;
    return ЖУРНАЛ(s) +
      ЗАДАЧА('«Сними застёжку, — просит Агафон. — Что останется на нити, то и есть <b>основа</b>: слово без окончания». Нажми и посмотри на «пришкольный».') +
      `<div class="pic">${свг(`
        ${мастерская(Н,196,{лампаX:170})}
        ${бархат(12,14,312,100)}
        ${ожерелье(СЛ('при-п|школь-к|н-с|ый-о'),сн?136:168,60,{кегль:18,основа:сн,снято:сн})}
        ${бирка(168,126,сн?'основа: пришкольн-':'пришкольный',сн?GOLD:null,{кегль:14})}
        ${М.верстак(100,236,150,54,{})}
        ${М.ювелир(56,Н-10,0.74,{поза:'указывает'})}${М.сорока(292,190,0.56,{влево:true,бусина:сн?ЦВ['окончание']:null})}
        ${рамка(Н)}
      `,Н)}</div>` +
      `<div class="ask">${BTN(4,'',сн?'Вернуть застёжку':'Снять застёжку-окончание',"r602снять()")}</div>` +
      ОТВЕТЫ('пара',['лесник','лес'],0,в,7) +
      (в==null ? СКАЗ('Вопрос','Какая основа у слова «<b>лесник</b>»? Подумай про окончание.') :
        РАЗБОР(ок,['Верно: у «лесник» окончание нулевое (лесник<b>а</b>, лесник<b>у</b>), значит, основа — всё слово: <b>лесник</b>.',
          '«Лес» — это корень. Основа — всё без окончания, а оно у «лесник» нулевое. Основа — <b>лесник</b>.'][в])) +
      (ок ? ПРАВИЛО('<b>Основа</b> — часть слова без окончания: пришкольн|ый. Если окончание нулевое, основа равна всему слову: лесник□. Основу подчёркивают снизу.') : '');
  }

  /* 8. Разбор подснежника по шагам */
  function F8(s){
    const Н=300, М=Р(), ш=Math.min(s.ш8||0,4), в=s.ответ8, ок=в===0;
    const ч=СЛ('под-п|снеж-к|ник-с|-о');
    const знак={}; if(ш>=1) знак['окончание']=true; if(ш>=3) знак['корень']=true; if(ш>=4){ знак['приставка']=true; знак['суффикс']=true; }
    const ШАГИ=['Слово целиком: подснежник.','Шаг 1 · окончание: подснежник<b>и</b> — значит, в «подснежник» оно нулевое.',
      'Шаг 2 · основа: всё слово без окончания — подснежник.','Шаг 3 · корень: снег, снежный, снежок — корень <b>снеж</b>.',
      'Шаг 4 · что осталось: <b>под</b>- перед корнем — приставка, -<b>ник</b> после — суффикс.'];
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Весной Мирто принесла подснежники. «Разберём слово по составу, — говорит Агафон. — Но по порядку, иначе камни рассыплются». Иди по шагам.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,200,{лампаX:150})}
        ${бархат(18,14,300,100)}
        ${ожерелье(ч,168,64,{кегль:18,знак:знак,основа:ш>=2,тускло:ш===0?null:{}})}
        ${бирка(168,124,['слово целиком','1 · окончание','2 · основа','3 · корень','4 · приставка и суффикс'][ш],GOLD,{кегль:13})}
        ${М.верстак(110,232,180,58,{лампа:false})}
        <path d="M186 232 h28 l-4 -20 h-20 z" fill="url(#рм-глина)" stroke="${ОБВОД}" stroke-width="1"/>
        ${М.подснежник(192,214,0.6)}${М.подснежник(206,214,0.5)}
        ${М.ювелир(62,Н-10,0.76,{поза:'лупа'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      A(3,'карт','<span class="метка">Разбор</span><div class="текст">'+ШАГИ[ш]+'</div>') +
      `<div class="ask">${BTN(4,'',ш<4?'Следующий шаг →':'Разобрать заново',ш<4?"r602шаг()":"r602шагСначала()")}</div>` +
      (ш<4 ? '' :
        ОТВЕТЫ('пара',['с окончания','с приставки'],0,в,8) +
        (в==null ? СКАЗ('Вопрос','С чего начинают разбор по составу?') :
          РАЗБОР(ок,['Верно: сначала <b>окончание</b> (измени слово), потом основа, корень, и только потом приставка и суффикс.',
            'Если начать с приставки, легко ошибиться: в «подснежник» и «подушка» начало похоже. Начинают с <b>окончания</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Порядок разбора</b>: 1) окончание — измени слово; 2) основа — всё без окончания; 3) корень — подбери родню; 4) приставка и суффикс — что осталось до и после корня.') : '');
  }

  /* 9. Родня или формы */
  function F9(s){
    const Н=280, М=Р(), n=Math.min(s.пар9||0,ПАРЫ9.length), отв=s.отв9, все=n>=ПАРЫ9.length, в=s.ответ9, ок=в===0;
    const п=ПАРЫ9[Math.min(n,ПАРЫ9.length-1)];
    const лев=ПАРЫ9.slice(0,n).filter(x=>!x[2]), прав=ПАРЫ9.slice(0,n).filter(x=>x[2]);
    return ЖУРНАЛ(s) +
      ЗАДАЧА('Клепта смешала два лотка. В левом Агафон держит <b>родственные слова</b> — у них общий корень, но смысл новый. В правом — <b>формы одного слова</b>: меняется только окончание. Разложи пары обратно.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,190,{окно:false,полка:false})}
        ${бархат(10,14,152,150)}${бархат(174,14,152,150)}
        ${т(86,36,'родственные слова',12,'#8fe0b0',true)}${т(250,36,'формы одного слова',12,'#ffb0c0',true)}
        ${лев.map((x,k)=>т(86,64+k*26,x[0]+' — '+x[1],14,'#fff4d8',true)).join('')}
        ${прав.map((x,k)=>т(250,64+k*26,x[0]+' — '+x[1],14,'#fff4d8',true)).join('')}
        ${все?'':`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="1.4s" repeatCount="indefinite"/>`:''}${М.сорока(214,Н-22,0.66,{поза:'летит'})}</g>${бирка(96,Н-66,п[0]+' — '+п[1],GOLD,{кегль:16})}`}
        ${все?М.ювелир(168,Н-8,0.66,{поза:'указывает'}):''}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? '' : `<div class="ask пара">${['родственные','формы слова'].map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',t0,'r602пара('+j+')')).join('')}</div>`) +
      (отв&&!все ? (отв.ок ? РАЗБОР(true,'Верно: «'+ПАРЫ9[отв.i][0]+' — '+ПАРЫ9[отв.i][1]+'» — '+(ПАРЫ9[отв.i][2]?'меняется только окончание.':'появился суффикс, смысл новый.'))
        : РАЗБОР(false,'Сравни смысл: '+п[0]+' и '+п[1]+'. Если смысл тот же, а меняется только конец — это формы.')) : '') +
      (все ? РАЗБОР(true,'Лотки разобраны. Лес — леса: одно слово в разных формах. Лес — лесник: два разных слова одной родни.') +
        ОТВЕТЫ('пара',['формы одного слова','родственные слова'],0,в,9) +
        (в==null ? СКАЗ('Вопрос','«Гора» и «горы» — это…') :
          РАЗБОР(ок,['Верно: изменилось только окончание — это <b>формы</b> одного слова.','Суффикса нет, смысл тот же, меняется только окончание — это <b>формы</b> одного слова.'][в]))
        : (отв ? '' : СКАЗ('Пара '+(n+1)+' из '+ПАРЫ9.length,'Изменился только конец — или появился новый камень?'))) +
      (ок ? ПРАВИЛО('<b>Формы одного слова</b> отличаются только окончанием: гора — горы — горой. <b>Однокоренные слова</b> — разные слова с общим корнем: гора — горный — пригорок.') : '');
  }

  /* 10. Игра «Заказ Агафона» */
  function F10(s){
    const Н=300, М=Р(), з10=s.заказ10||{}, n=Math.min(з10.n||0,ЗАКАЗ.length), ош=Math.min(з10.ош||0,3), отв=s.отв10, все=n>=ЗАКАЗ.length, закрыт=ош>=3&&!все;
    const з=ЗАКАЗ[Math.min(n,ЗАКАЗ.length-1)], тип=з.ч[з.и].тип;
    const посл=отв&&отв.ок?ЗАКАЗ[отв.i]:null;
    return ЖУРНАЛ(s) +
      ЗАДАЧА(закрыт ? 'Три ошибки — Агафон гасит лампу: «На сегодня мастерская закрыта. Отдохни — и начнём заказ заново».'
        : 'Вечер. Богатый купец заказал десять ожерелий. Агафон наводит луч лампы на один камень — назови его породу. Три ошибки — мастерская закроется.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,200,{вечер:true,лампаX:200,окно:false})}
        ${бархат(18,40,300,84)}
        ${все?т(168,90,'заказ выполнен!',20,'#8fe0b0',true):закрыт?т(168,90,'мастерская закрыта',18,'#ff9a8a',true):ожерелье(з.ч,168,84,{кегль:19,выдел:з.и})}
        ${все ? подпись(120,30,'десять из десяти!',GREEN,12.5) : закрыт ? '' : подпись(92,30,'ожерелье '+(n+1)+' из 10',GOLD,12)}
        ${все||закрыт?'':[0,1,2].map(i=>`<circle cx="${262+i*18}" cy="24" r="6.4" fill="${i<3-ош?'#ffd76a':'#5a4a3a'}" stroke="${ОБВОД}" stroke-width=".9"/>${i<3-ош?`<circle cx="${262+i*18}" cy="24" r="11" fill="url(#c602-лампа)"/>`:''}`).join('')}
        ${М.верстак(96,236,170,56,{лампа:!закрыт})}
        ${М.ювелир(52,Н-10,0.74,{поза:все?'указывает':'лупа'})}
        ${М.сорока(296,Н-14,0.56,{влево:true,поза:все?'летит':'сидит'})}
        ${рамка(Н)}
      `,Н)}</div>` +
      (все ? РАЗБОР(true,'Все десять ожерелий готовы. Сапфир — перед корнем, изумруд — общий у родни, янтарь — после корня, рубин — в застёжке, даже если она пустая.')
        : закрыт ? РАЗБОР(false,'Подсказка: в слове «'+ЦЕЛОЕ(з.ч)+'» подсвечен камень — '+тип+'.') + `<div class="ask">${BTN(4,'','Открыть мастерскую заново',"r602заново()")}</div>`
        : `<div class="ряд" style="grid-template-columns:repeat(2,minmax(0,1fr))">${ТИПЫ.map((t0,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'вкл':'',t0,'r602заказ('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,'Верно: в «'+ЦЕЛОЕ(посл.ч)+'» это '+посл.ч[посл.и].тип+(посл.ч[посл.и].t?' «'+посл.ч[посл.и].t+'»':' (нулевое)')+'.')
                         : РАЗБОР(false,'Не та порода. Где стоит камень: перед корнем, после него или в застёжке на конце?'))
               : СКАЗ('Подсказка','Смотри, где стоит камень, и вспомни родню слова.'))) +
      (все ? ПРАВИЛО('Приставка — <b>перед корнем</b>, суффикс — <b>после корня</b>, окончание — <b>изменяемый конец</b>, корень — <b>общий у родни</b>.') : '');
  }

  /* 11. Итог: витрина на закате */
  function F11(s){
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ)), Н=340, М=Р();
    return ЖУРНАЛ(s) +
      ЗАДАЧА(всё
        ? 'Закат над Сиракузами. Агафон выставил лучшее ожерелье в витрину. Клепта вернула все камни и теперь сидит на вывеске — сторожит. «Слово — как ожерелье, — говорит мастер. — Знаешь камни — соберёшь любое».'
        : 'Заказ ещё не выполнен — вернись к делам в списке. Вот что получится в конце.') +
      `<div class="pic">${свг(`
        ${мастерская(Н,210,{вечер:true,лампаX:170})}
        ${бархат(18,20,300,82)}
        ${ожерелье(СЛ('под-п|снеж-к|ник-с|-о'),168,66,{кегль:19,значки:true,основа:true})}
        ${М.сорока(300,138,0.52,{влево:true})}
        ${М.ювелир(46,248,0.62,{поза:'указывает'})}${М.девочка(290,248,0.6,{поза:'машет'})}
        ${[['сапфир — приставка, перед корнем',ЦВ['приставка']],['изумруд — корень, общий у родни','#4ac080'],['янтарь — суффикс, после корня',GOLD],['рубин — окончание, связывает слова','#ff8aa8']].map(([t0,ц],i)=>`<g opacity="${ДВИЖ?0:1}">${ДВИЖ?`<animate attributeName="opacity" from="0" to="1" begin="${(0.4+i*0.45).toFixed(1)}s" dur="0.6s" fill="freeze"/>`:''}${подпись(168,262+i*22,t0,ц,10.5)}</g>`).join('')}
        ${рамка(Н)}
      `,Н)}</div>` +
      СКАЗ('Итог','Слово состоит из <b>морфем</b>. <b>Корень</b> — общая часть родни. <b>Приставка</b> — перед корнем, <b>суффикс</b> — после; они образуют новые слова. <b>Окончание</b> — изменяемая часть, связывает слова, бывает нулевым. <b>Основа</b> — слово без окончания. Разбор начинают с окончания.') +
      ПРАВИЛО('<b>Измени слово — найдёшь окончание. Подбери родню — найдёшь корень.</b>');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Корень — это…', варианты:[{т:'общая часть родственных слов',ок:true},{т:'первая часть слова',ок:false}], разбор:'Лес, лесник, перелесок — общий корень «лес».' },
    { вопрос:'Где стоит суффикс?', варианты:[{т:'перед корнем',ок:false},{т:'после корня',ок:true}], разбор:'Дом-ик: суффикс после корня.' },
    { вопрос:'Окончание в слове «стол»…', варианты:[{т:'нулевое',ок:true},{т:'его нет',ок:false}], разбор:'Стол — стола: окончание есть, в «стол» оно нулевое.' },
    { вопрос:'Основа слова «лесной» —', варианты:[{т:'лесной',ок:false},{т:'лесн-',ок:true}], разбор:'Основа — всё без окончания -ой.' },
    { вопрос:'«Гора» и «горы» — это…', варианты:[{т:'формы одного слова',ок:true},{т:'однокоренные слова',ок:false}], разбор:'Меняется только окончание.' }
  ];
  function F12(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра в мастерской.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r602Reset()")}</div>` +
        ПРАВИЛО('<b>Измени слово — найдёшь окончание. Подбери родню — найдёшь корень.</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r602Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const Т = {
    т1:{ имя:'Что за камень', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const М=Р(), Н=180, отв=ст.ответ!=null;
        return свг(`${мастерская(Н,120,{окно:false,полка:false,лампаX:168})}${бархат(18,16,300,84)}
        ${ожерелье(з.ч,168,60,{кегль:19,выдел:з.и,знак:отв?{[з.ч[з.и].тип]:true}:null})}
        ${отв?бирка(168,110,з.ч[з.и].тип+' — '+КАМ[з.ч[з.и].тип],ЦВ[з.ч[з.и].тип],{кегль:12}):''}
        ${М.сорока(300,Н-6,0.46,{влево:true,поза:отв&&ст.ответ!==з.в?'летит':'сидит'})}${ст.серия>=3?подпись(60,Н-14,'серия: '+ст.серия,GREEN,11):''}${рамка(Н)}`,Н); } },
    т2:{ имя:'Родня или формы', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const М=Р(), Н=180, отв=ст.ответ!=null;
        return свг(`${мастерская(Н,124,{окно:false,полка:false,лампаX:168})}${бархат(18,16,300,90)}
        ${т(100,70,з.a,24,'#fff4d8',true)}${т(168,70,отв?(з.в?'≈':'⟶'):'?',22,отв?(з.в?'#ffb0c0':'#8fe0b0'):GOLD,true)}${т(236,70,з.b,24,'#fff4d8',true)}
        ${отв?т(168,96,з.в?'одно слово, разные формы':'разные слова, общий корень',12,з.в?'#ffb0c0':'#8fe0b0',true):''}
        ${М.ювелир(34,Н-4,0.5,{поза:'лупа'})}${ст.серия>=3?подпись(260,Н-14,'серия: '+ст.серия,GREEN,11):''}${рамка(Н)}`,Н); } },
    т3:{ имя:'Найди корень', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const М=Р(), Н=180, отв=ст.ответ!=null;
        return свг(`${мастерская(Н,124,{окно:false,полка:false,лампаX:168})}${бархат(18,16,300,90)}
        ${отв?ожерелье(з.ч,168,64,{кегль:18,знак:{'корень':true}}):т(168,74,з.w,30,'#fff4d8',true)}
        ${М.девочка(300,Н-4,0.5,{поза:отв&&ст.ответ===з.в?'машет':'стоит'})}${ст.серия>=3?подпись(70,Н-14,'серия: '+ст.серия,GREEN,11):''}${рамка(Н)}`,Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие слова.':'В новом круге слова другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r602Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px;font-family:Georgia,serif">'+в+'</span>', "r602T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r602TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L602 = {
    id: ID,
    title: 'Состав слова: из чего состоит слово',
    ico: '🧩',
    src: 'Русский язык · 5–6 класс · Состав слова', subj: 'rus',
    explain: [
      'Мастерская Агафона: четыре камня слова.',
      'Корень — изумруд, общий у родни.',
      'Приставка — сапфир перед корнем.',
      'Суффикс — янтарь после корня.',
      'Окончание — рубин, сцепляет слова.',
      'Пустая застёжка: нулевое окончание.',
      'Основа — нить без застёжки.',
      'Разбор по составу по шагам.',
      'Родня или формы одного слова.',
      'Заказ Агафона: десять ожерелий, три ошибки — мастерская закрыта.',
      'Итог: ожерелье в витрине.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: что за камень.',
      'Тренажёр 2: родня или формы.',
      'Тренажёр 3: найди корень.'
    ],
    check: { q: 'Какая часть слова стоит перед корнем?', choices: ['суффикс', 'приставка', 'окончание'], ans: 1,
      exp: 'Приставка стоит перед корнем: приход, уход, переход.' },
    tasks: [
      { q: 'Найди корень в слове «пришкольный»', kind: 'choice', choices: ['школь', 'при', 'ый'], ans: 0,
        hints: ['Убери приставку при- и окончание -ый.', 'Подбери родню: школа, школьник.', 'Общая часть — школь.'], sol: 'школь' },
      { q: 'Сколько морфем в слове «домики»: дом-ик-и?', kind: 'unit', ans: 3, tol: 0,
        hints: ['Считай корень, суффикс и окончание.', 'дом + ик + и.'], sol: '3' }
    ]
  };

  function render(el){
    if(!window.РМ || !window.РМ.ювелир){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L602.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10,F11,F12];
    const сцена = f<=12 ? Ф[f-1](s) : тренажёр(s,'т'+(f-12),f-12);
    const ЗАГОЛОВКИ={1:'Мастерская Агафона',2:'Изумруд-корень',3:'Сапфир-приставка',4:'Янтарь-суффикс',5:'Рубин-окончание',
      6:'Пустая застёжка',7:'Нить без застёжки',8:'Разбор по шагам',9:'Родня или формы',10:'Заказ Агафона',11:'Ожерелье в витрине',
      12:'Практика',13:'Тренажёр 1',14:'Тренажёр 2',15:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l602n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Состав слова'}</h2>${сцена}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r602Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r602камень=(i)=>{ const s=S(); s.к1=i; const в=Object.assign({},s.вид1||{}); в[i]=true; s.вид1=в; if(КАМНИ1.every((x,j)=>в[j])) s.дело_камни=true; chRender(0); };
  window.r602родня=(i)=>{ const s=S(); const р=Object.assign({},s.род2||{}); р[i]=true; s.род2=р; s.отв2=i;
    if(РОДНЯ.filter((x,j)=>x.ок&&р[j]).length>=5) s.дело_родня=true; chRender(0); };
  window.r602прист=(i)=>{ const s=S(); s.п3=i; const в=Object.assign({0:true},s.видп3||{}); в[i]=true; s.видп3=в; chRender(0); };
  window.r602суфВыбор=(i)=>{ const s=S(); s.с4=i; s.суф4=false; chRender(0); };
  window.r602суф=()=>{ const s=S(); s.суф4=!s.суф4; if(s.суф4){ const в=Object.assign({},s.видс4||{}); в[s.с4||0]=true; s.видс4=в; } chRender(0); };
  window.r602ок=(j)=>{ const s=S(); const n=s.ок5||0; if(n>=ОКОНЧ.length) return;
    if(ОКОНЧ[n].в===j){ s.ок5=n+1; s.отв5={i:n,ок:true}; } else s.отв5={i:n,ок:false,j:j};
    chRender(0); };
  window.r602лес=(i)=>{ const s=S(); s.л6=i; const в=Object.assign({0:true},s.видл6||{}); в[i]=true; s.видл6=в; chRender(0); };
  window.r602снять=()=>{ const s=S(); s.сн7=!s.сн7; chRender(0); };
  window.r602шаг=()=>{ const s=S(); s.ш8=Math.min(4,(s.ш8||0)+1); chRender(0); };
  window.r602шагСначала=()=>{ const s=S(); s.ш8=0; chRender(0); };
  window.r602пара=(j)=>{ const s=S(); const n=s.пар9||0; if(n>=ПАРЫ9.length) return;
    if(ПАРЫ9[n][2]===j){ s.пар9=n+1; s.отв9={i:n,ок:true}; } else s.отв9={i:n,ок:false,j:j};
    chRender(0); };
  window.r602заказ=(j)=>{ const s=S(); const з=Object.assign({n:0,ош:0},s.заказ10||{}); if(з.n>=ЗАКАЗ.length||з.ош>=3) return;
    const x=ЗАКАЗ[з.n];
    if(x.ч[x.и].тип===ТИПЫ[j]){ s.отв10={i:з.n,ок:true}; з.n++; if(з.n>=ЗАКАЗ.length) s.дело_заказ=true; }
    else { з.ош++; s.отв10={i:з.n,ок:false,j:j}; }
    s.заказ10=з; chRender(0); };
  window.r602заново=()=>{ const s=S(); s.заказ10={n:0,ош:0}; s.отв10=null; chRender(0); };
  window.r602Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r602Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r602T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r602TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r602Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L602,{__планПорядок:arr[м].__планПорядок}); else arr.push(L602); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU602NEW={render:render, L:L602};
})();
