/* ============ ПУТЬ НАЧАЛЬНОЙ ШКОЛЫ: свой маршрут каждому классу ============

   Зачем файл. На вкладке «Путь» первоклассник и четвероклассник видели один и
   тот же экран: кольцо процентов, остров «Начальная школа» и плоский список
   задач, где больше половины строк — словарные слова подряд. Уроки своего
   класса (30–48 штук) в путь не попадали вовсе: маршрут строился только по
   банку задач.

   Что сделано. У каждого класса свой мир и своя ФОРМА маршрута — не перекраска
   одного шаблона:

     1 класс · «Двор Пыха»      — тропинка из камушков, шаги выложены змейкой;
     2 класс · «Сотня»          — кирпичная кладка, ряд за рядом, в перевязку;
     3 класс · «Дорога и время» — мерная лента с верстовыми столбами;
     4 класс · «Курс за горизонт» — ломаная курса, узлы идут галсами.

   Шаги маршрута — настоящее содержимое класса: уроки в порядке плана обучения
   (MVP/data/plan_order.js) и задачи банка, привязанные к своей теме. Темы,
   которые ещё готовятся (soon), стоят в конце отдельной полосой «впереди» —
   ребёнок видит горизонт, но шаг не активен.

   Экран старого «Пути» (острова и переключатели) никуда не делся: он остался
   под маршрутом, чтобы ничего не потерялось.

   Значки нарисованы здесь же, SVG: эмодзи в роли иконок в новом экране не
   используются (стандарт проекта, раздел 9). */
(function(){
  'use strict';

  /* ---------- миры классов ---------- */
  /* rgb акцента задаётся числами: он же идёт в rgba() для подложек. */
  const МИРЫ = {
    1: {
      ключ:'dvor', форма:'тропа',
      имя:'Двор Пыха',
      под:'тропинка из камушков: считаем, складываем, сравниваем',
      акцент:'#ffd076', акцентRGB:'255,208,118',
      спутник:{имя:'Пых', img:'img/pykh.png'},
      зовёт:'Идём по камушкам. Каждый камушек — одно дело: послушать Архимеда или решить задачку.',
      привал:'Камушков пройдено'
    },
    2: {
      ключ:'sotnya', форма:'кладка',
      имя:'Сотня',
      под:'стена из десятков: разряды, столбик, умножение',
      акцент:'#e8a86a', акцентRGB:'232,168,106',
      спутник:{имя:'Архимед', img:'img/arch_smile.jpg'},
      зовёт:'Сотня складывается из десятков, а стена — из кирпичей. Каждый урок и каждая задача кладут свой кирпич.',
      привал:'Кирпичей уложено'
    },
    3: {
      ключ:'doroga', форма:'лента',
      имя:'Дорога и время',
      под:'мерная лента: умножение, формулы пути и стоимости, площадь',
      акцент:'#7fd1c3', акцентRGB:'127,209,195',
      спутник:{имя:'Архимед', img:'img/arch_think.jpg'},
      зовёт:'Дорога меряется столбами, задача — шагами рассуждения. Считаем, сколько уже пройдено.',
      привал:'Столбов пройдено'
    },
    4: {
      ключ:'kurs', форма:'курс',
      имя:'Курс за горизонт',
      под:'прокладка курса: дроби, проценты, движение, углы',
      акцент:'#9db7ff', акцентRGB:'157,183,255',
      спутник:{имя:'Архимед', img:'img/arch_wow.jpg'},
      зовёт:'Курс прокладывают по узлам: от одного поворота к другому. Каждый узел — тема, которую ты берёшь.',
      привал:'Узлов пройдено'
    }
  };

  /* ---------- этапы: по каким словам темы урока собирается участок ----------
     Ключевые слова берутся из настоящих подписей уроков (поле src) и тем задач,
     а не выдуманы: список сверен замером по банкам 21.09.2026. */
  const ЭТАПЫ = {
    1: [
      {имя:'Утро во дворе',     цель:'сколько тут всего',            уроки:['Состав','Счёт до 10','счёт до','состав числа'], задачи:['Счёт до 10','Считаем предметы','Состав числа']},
      {имя:'Кладовая Пыха',     цель:'прибавляем и убавляем',        уроки:['Сложение','вычитан','сложени'],                 задачи:['Простые задачи']},
      {имя:'Весы у крыльца',    цель:'больше, меньше, поровну',      уроки:['Сравн'],                                        задачи:['Сравнение']},
      {имя:'Второй десяток',    цель:'числа 11–20',                  уроки:['Нумерац','десятки','Числов'],                   задачи:['Счёт до 20']},
      {имя:'Мерки и линии',     цель:'см, кг, литр и фигуры',        уроки:['Длина','Геомет','Выраже','Уравне','1–2 класс'],  задачи:[]},
      {имя:'Слова на память',   цель:'пишем без ошибок',             уроки:['Словарн','Русск'],                              задачи:['Словарные слова']},
      {имя:'Смекалка',          цель:'задачи на подумать',           уроки:['Логика','Олимп'],                               задачи:[]}
    ],
    2: [
      {имя:'Фундамент',         цель:'разряды: десятки и единицы',   уроки:['Нумерац','разряд'],                             задачи:[]},
      {имя:'Ряд за рядом',      цель:'складываем и вычитаем в столбик', уроки:['Письмен','Сложение','вычитан'],              задачи:['Сложение до 100']},
      {имя:'Арка умножения',    цель:'умножение, деление, скобки',   уроки:['Умноже','Делени','Порядок','Свойств','Внетабл'], задачи:['Умножение']},
      {имя:'Мерки и часы',      цель:'длина, масса, время',          уроки:['Длина','время','2–3 класс'],                    задачи:['Длина и измерения']},
      {имя:'Разминка первого десятка', цель:'то, что уже умеешь',    уроки:['1–2 класс','комикс'],                           задачи:[]},
      {имя:'Слова на память',   цель:'пишем без ошибок',             уроки:['Словарн','Русск'],                              задачи:['Словарные слова']}
    ],
    3: [
      {имя:'Верстовые столбы',  цель:'многозначные числа и разряды', уроки:['Числа до м','Действия с','Письменные'],          задачи:[]},
      {имя:'Таблица как шаг',   цель:'умножение наизусть',           уроки:['умножени','Внетабличное деление','3 класс'],     задачи:['Таблица умножения']},
      {имя:'Формулы дороги',    цель:'s = v · t и цена · количество', уроки:['Формулы','Уравнения','Сравнение чис'],          задачи:[]},
      {имя:'Мерная лента',      цель:'периметр, площадь, величины',  уроки:['Единицы','Периметр','Симметрия','3–4 класс'],    задачи:['Задачи и периметр','Площадь']},
      {имя:'Доли',              цель:'часть от целого',              уроки:['Дол','част'],                                    задачи:['Доли']},
      {имя:'Логика в пути',     цель:'множества, высказывания, перебор', уроки:['Множества','Логика','Олимп'],                задачи:[]},
      {имя:'Слова в дорогу',    цель:'пишем без ошибок',             уроки:['Словарн','Русск'],                               задачи:['Словарные слова']}
    ],
    4: [
      {имя:'Дроби',             цель:'правильные, неправильные, смешанные', уроки:['Дроби','Смешанные','Действия с','Доли'],  задачи:['Доли и задачи']},
      {имя:'Проценты',          цель:'процент от числа и обратно',   уроки:['Процент'],                                       задачи:[]},
      {имя:'Движение',          цель:'навстречу, вдогонку, работа',  уроки:['Одновремен','Движение','Работа','Координат'],     задачи:['Площадь и путь','Время']},
      {имя:'Углы и карта',      цель:'площадь, углы, транспортир',   уроки:['Площадь','Углы','Измерение','3–4 класс'],         задачи:[]},
      {имя:'Штурманская',       цель:'олимпиадные приёмы',           уроки:['Олимп','Мастерские'],                             задачи:[]},
      {имя:'Слова в дорогу',    цель:'пишем без ошибок',             уроки:['Словарн','Русск'],                                задачи:['Словарные слова']}
    ]
  };

  /* ---------- значки этапов: рисованные, по смыслу мира ---------- */
  function значок(форма, i){
    const s = 'stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"';
    const набор = {
      тропа: [
        `<circle cx="12" cy="12" r="7" ${s}/><circle cx="12" cy="12" r="2.4" ${s}/>`,                 /* солнце */
        `<path d="M4 15h16M6 15V9l6-4 6 4v6" ${s}/>`,                                                  /* кладовая */
        `<path d="M12 4v13M6 9l-2.5 5a3 3 0 0 0 5 0L6 9zm12 0l-2.5 5a3 3 0 0 0 5 0L18 9zM8 19h8" ${s}/>`, /* весы */
        `<path d="M4 18h16M7 18V8m5 10V5m5 13v-7" ${s}/>`,                                             /* десятки */
        `<path d="M3 8h18M3 8v8h18V8M8 8v4m4-4v4m4-4v4" ${s}/>`,                                       /* линейка */
        `<path d="M6 4h9l4 4v12H6zM15 4v4h4M9 12h7M9 16h5" ${s}/>`,                                    /* лист слов */
        `<path d="M12 4l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.3l5-.7z" ${s}/>`            /* звезда-смекалка */
      ],
      кладка: [
        `<path d="M3 17h18M3 17v-4h18v4M7 13V9h10v4M10 9V5h4v4" ${s}/>`,
        `<path d="M4 6h16M4 12h16M4 18h16M9 6v6m6-6v6M6 12v6m12-6v6" ${s}/>`,
        `<path d="M5 19V11a7 7 0 0 1 14 0v8M9 19v-8a3 3 0 0 1 6 0v8" ${s}/>`,
        `<circle cx="12" cy="12" r="8" ${s}/><path d="M12 7v5l3 2" ${s}/>`,
        `<path d="M5 12h14M9 8l-4 4 4 4m6-8l4 4-4 4" ${s}/>`,
        `<path d="M6 4h9l4 4v12H6zM15 4v4h4M9 12h7M9 16h5" ${s}/>`
      ],
      лента: [
        `<path d="M4 19V5m0 14h16M8 19V9m4 10v-6m4 6V7" ${s}/>`,
        `<path d="M4 8h16M4 12h16M4 16h16M8 4v16m8-16v16" ${s}/>`,
        `<path d="M4 17l5-6 4 3 7-8" ${s}/><path d="M16 6h4v4" ${s}/>`,
        `<path d="M3 9h18v6H3zM7 9v6m5-6v6m5-6v6" ${s}/>`,
        `<circle cx="12" cy="12" r="8" ${s}/><path d="M12 4a8 8 0 0 1 0 16z" ${s}/>`,
        `<path d="M6 6h5v5H6zM13 13h5v5h-5zM11 8.5h7M8.5 11v7" ${s}/>`,
        `<path d="M6 4h9l4 4v12H6zM15 4v4h4M9 12h7M9 16h5" ${s}/>`
      ],
      курс: [
        `<circle cx="12" cy="12" r="8" ${s}/><path d="M12 4v16M4 12h16" ${s}/>`,
        `<path d="M5 19L19 5M7 6h3v3M14 15h3v3" ${s}/>`,
        `<path d="M3 16h4l3-7 3 12 3-9 2 4h3" ${s}/>`,
        `<path d="M12 3v9l6 4" ${s}/><path d="M4 12a8 8 0 1 0 8-8" ${s}/>`,
        `<path d="M6 7h4v4H6zM14 13h4v4h-4zM10 9h4M8 11v2h8" ${s}/>`,
        `<path d="M6 4h9l4 4v12H6zM15 4v4h4M9 12h7M9 16h5" ${s}/>`
      ]
    };
    const л = набор[форма] || набор.тропа;
    return `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${л[i % л.length]}</svg>`;
  }

  /* ---------- сбор маршрута ---------- */
  function классУченика(){
    try{ return String((DB.profile && DB.profile.klass) || '').trim(); }catch(e){ return ''; }
  }
  function младший(){ return /^[1-4]$/.test(классУченика()); }

  function урокГотов(L){ try{ return !!(DB.lessons && DB.lessons[L.id] && DB.lessons[L.id].done); }catch(e){ return false; } }
  function задачаГотова(t){ try{ return !!(DB.tasks && DB.tasks[t.id] && DB.tasks[t.id].done); }catch(e){ return false; } }

  /* Тема задачи без пометки класса: «1 класс · Счёт до 10» → «Счёт до 10» */
  function темаЗадачи(t){
    return String((t && t.theme) || '').replace(/^\s*\d{1,2}(\s*[-–—]\s*\d{1,2})?\s*(класс|кл)\.?\s*·\s*/i, '').trim();
  }
  function совпало(строка, слова){
    const s = String(строка || '').toLowerCase();
    return (слова || []).some(w => s.indexOf(String(w).toLowerCase()) >= 0);
  }

  /* Уроки класса в порядке плана обучения; заглушки «готовится» отдельно. */
  function урокиКласса(){
    let пул = [];
    try{ пул = (typeof lessonPool === 'function' ? lessonPool() : (window.ARH_LESSONS || [])).slice(); }catch(e){ пул = []; }
    const номер = L => (L && L.__планПорядок != null) ? L.__планПорядок : 1e9;
    пул.sort((a,b)=> номер(a)-номер(b) || (a.id||0)-(b.id||0));
    return {готовые: пул.filter(L=>!L.soon), скоро: пул.filter(L=>L.soon)};
  }

  /* Задачи начальной школы своего класса — независимо от переключателя «весь мир»:
     маршрут класса не должен раздуваться задачами пятиклассника. */
  function задачиКласса(){
    const k = +классУченика();
    const все = (window.ARH_TASKS || []).filter(t => t && t.island === 'Начальная школа');
    return все.filter(t => {
      const r = (typeof taskClassRange === 'function') ? taskClassRange(t) : [1,4];
      return !(r[1] < k || r[0] > k);
    });
  }

  /* Маршрут: этапы, внутри — уроки по плану, следом задачи своей темы.
     Урок и задача идут вперемешку по смыслу: сначала объясни — потом реши. */
  function маршрут(){
    const k = +классУченика();
    const план = ЭТАПЫ[k] || ЭТАПЫ[1];
    const {готовые, скоро} = урокиКласса();
    const задачи = задачиКласса();
    const взятыйУрок = {}, взятаяЗадача = {};
    const этапы = план.map(function(э){
      const шаги = [];
      готовые.forEach(function(L){
        if(взятыйУрок[L.id]) return;
        if(!совпало(L.src + ' · ' + L.title, э.уроки)) return;
        взятыйУрок[L.id] = 1;
        шаги.push({вид:'урок', id:L.id, имя:L.title, под:'урок', готово:урокГотов(L)});
      });
      задачи.forEach(function(t){
        if(взятаяЗадача[t.id]) return;
        if(!(э.задачи || []).some(th => темаЗадачи(t) === th)) return;
        взятаяЗадача[t.id] = 1;
        шаги.push({вид:'задача', id:t.id, имя:t.title, под:'задача · ур. ' + (t.diff||1), готово:задачаГотова(t)});
      });
      return {имя:э.имя, цель:э.цель, шаги:шаги};
    }).filter(э => э.шаги.length);

    /* Ничего не теряем: уроки и задачи, не попавшие ни в один этап, собираются
       в последний участок. Без него правка плана молча прятала бы содержимое. */
    const остаток = [];
    готовые.forEach(L=>{ if(!взятыйУрок[L.id]) остаток.push({вид:'урок', id:L.id, имя:L.title, под:'урок', готово:урокГотов(L)}); });
    задачи.forEach(t=>{ if(!взятаяЗадача[t.id]) остаток.push({вид:'задача', id:t.id, имя:t.title, под:'задача · ур. ' + (t.diff||1), готово:задачаГотова(t)}); });
    if(остаток.length) этапы.push({имя:'Ещё по дороге', цель:'то, что тоже открыто твоему классу', шаги:остаток});

    return {этапы:этапы, скоро:скоро};
  }

  /* ---------- стили ---------- */
  function jpCss(){
    if(document.getElementById('jpCss')) return;
    const st = document.createElement('style');
    st.id = 'jpCss';
    st.textContent = `
  .jp{--jp-a:#ffd076;--jp-arg:255,208,118;font-family:Georgia,'Times New Roman',serif;
      -webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
  .jp *{box-sizing:border-box}

  /* ── шапка мира ── */
  /* Фигура спутника стоит СВОЕЙ колонкой, а не поверх текста: при абсолютном
     положении она срезала заголовок «Сотня» и «Курс за горизонт». */
  .jp-top{display:flex;align-items:flex-start;gap:12px;border-radius:20px;padding:18px;margin:0 0 16px;
     background:linear-gradient(160deg,rgba(var(--jp-arg),.16),rgba(0,0,0,.18) 62%),#1b2c23;
     border:1px solid rgba(var(--jp-arg),.34)}
  .jp-top .jp-tb{flex:1;min-width:0}
  .jp-top h2{margin:0;font-size:32px;line-height:1.15;letter-spacing:-.02em;color:#fff6e4;text-wrap:balance}
  .jp-top p{margin:6px 0 0;font-size:16px;line-height:1.5;color:#dcd0b6;max-width:34ch;text-wrap:pretty}
  .jp-top .jp-cls{display:inline-block;margin:0 0 8px;font-size:14px;line-height:1.2;color:var(--jp-a);
     border:1px solid rgba(var(--jp-arg),.45);border-radius:99px;padding:4px 12px}
  .jp-top .jp-fig{flex:0 0 84px;width:84px;height:84px;border-radius:50%;object-fit:cover;
     border:1px solid rgba(var(--jp-arg),.3);box-shadow:0 8px 18px rgba(0,0,0,.4)}

  /* ── строка привала: сколько пройдено ── */
  .jp-band{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:0 0 8px;padding:0 2px}
  .jp-band b{font-size:24px;color:#fff6e4;font-variant-numeric:tabular-nums}
  .jp-band span{font-size:14px;color:#c3b393}
  .jp-rail{height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin:0 2px 20px}
  /* Полоса растёт масштабом, а не шириной: анимация width дёргает раскладку. */
  .jp-rail i{display:block;height:100%;width:100%;border-radius:99px;transform-origin:left center;
     transform:scaleX(var(--w,0));
     background:linear-gradient(90deg,rgba(var(--jp-arg),.6),var(--jp-a));
     transition:transform 520ms cubic-bezier(.23,1,.32,1)}

  /* ── сегодняшний шаг ── */
  .jp-now{display:flex;align-items:center;gap:14px;width:100%;text-align:left;margin:0 0 22px;padding:16px;
     border-radius:18px;border:1px solid rgba(var(--jp-arg),.5);background:rgba(var(--jp-arg),.13);
     color:inherit;font:inherit;cursor:pointer;
     transition:transform 140ms cubic-bezier(.23,1,.32,1),box-shadow 140ms cubic-bezier(.23,1,.32,1)}
  .jp-now:active{transform:translateY(2px)}
  .jp-now .n-ic{flex:0 0 48px;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;
     background:var(--jp-a);color:#132019}
  .jp-now .n-b{min-width:0;flex:1}
  .jp-now .n-k{display:block;font-size:14px;line-height:1.2;color:#d9c9a6}
  .jp-now .n-t{display:block;font-size:20px;line-height:1.25;color:#fff6e4;margin-top:2px}
  .jp-now .n-arr{flex:0 0 auto;color:var(--jp-a);font-size:24px}

  /* ── этап ── */
  .jp-stage{margin:0 0 26px}
  .jp-sh{display:flex;align-items:center;gap:10px;margin:0 2px 12px}
  .jp-sh .s-ic{flex:0 0 32px;width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;
     color:var(--jp-a);background:rgba(var(--jp-arg),.14);border:1px solid rgba(var(--jp-arg),.3)}
  .jp-sh .s-t{flex:1;min-width:0}
  .jp-sh .s-t b{display:block;font-size:20px;line-height:1.2;color:#fff6e4}
  .jp-sh .s-t span{display:block;font-size:14px;line-height:1.35;color:#bdae90}
  .jp-sh .s-n{flex:0 0 auto;font-size:14px;color:#c3b393;font-variant-numeric:tabular-nums}
  .jp-sh.as-btn{width:100%;min-height:56px;padding:8px 10px 8px 2px;border:0;background:none;color:inherit;font:inherit;
     cursor:pointer;text-align:left;border-radius:12px;transition:background 140ms cubic-bezier(.23,1,.32,1)}
  .jp-sh.as-btn:active{background:rgba(255,255,255,.05)}
  .jp-sh .s-chev{flex:0 0 auto;width:24px;text-align:center;color:var(--jp-a);font-size:14px}
  .jp-stage.closed{margin-bottom:8px}
  .jp-stage.closed .jp-sh{margin-bottom:0;opacity:.82}
  .jp-more{display:block;width:100%;min-height:48px;margin-top:12px;padding:12px;border-radius:12px;
     border:1px dashed rgba(var(--jp-arg),.4);background:none;color:var(--jp-a);font:inherit;font-size:16px;cursor:pointer;
     transition:background 140ms cubic-bezier(.23,1,.32,1)}
  .jp-more:active{background:rgba(var(--jp-arg),.1)}

  /* ── общий вид шага ── */
  .jp-step{position:relative;display:block;width:100%;text-align:left;border:0;background:none;color:inherit;
     font:inherit;cursor:pointer;padding:0}
  .jp-step .st-t{display:block;font-size:16px;line-height:1.35;color:#f2e9d6;text-wrap:pretty}
  .jp-step .st-m{display:block;font-size:14px;line-height:1.3;color:#a99a7e}
  .jp-step.done .st-t{color:#a9bda9}
  .jp-step.next .st-t{color:#fff6e4}

  /* ═══ 1 класс · тропинка из камушков ═══ */
  .jp-trail{position:relative;padding:4px 0 4px}
  .jp-trail .tr-line{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}
  .jp-trail .tr-line path{fill:none;stroke:rgba(var(--jp-arg),.28);stroke-width:3;stroke-linecap:round;stroke-dasharray:2 10}
  .jp-trail .jp-step{display:flex;align-items:center;gap:14px;min-height:76px;padding:6px 0}
  .jp-trail .jp-step.side-r{flex-direction:row-reverse;text-align:right}
  .jp-trail .jp-step.side-r .st-b{text-align:right}
  .jp-trail .st-stone{flex:0 0 62px;width:62px;height:62px;border-radius:50%;display:flex;align-items:center;justify-content:center;
     font-size:24px;color:#ffeccb;background:radial-gradient(circle at 34% 30%,#3a5244,#25392e 72%);
     border:2px solid rgba(var(--jp-arg),.4);box-shadow:0 6px 14px rgba(0,0,0,.4);font-variant-numeric:tabular-nums}
  .jp-trail .jp-step.done .st-stone{background:radial-gradient(circle at 34% 30%,#4a6b52,#2c4434 72%);border-color:rgba(143,209,168,.6);color:#c8e9cf}
  .jp-trail .jp-step.next .st-stone{background:radial-gradient(circle at 34% 30%,var(--jp-a),#c8912f 78%);color:#20180a;border-color:#ffeab0;
     box-shadow:0 8px 20px rgba(var(--jp-arg),.4)}
  .jp-trail .st-b{min-width:0;flex:1}

  /* ═══ 2 класс · кирпичная кладка ═══ */
  .jp-wall{display:flex;flex-direction:column;gap:6px}
  /* width:auto обязателен: у .jp-step ширина 100 %, и смещение ряда в перевязку
     добавлялось к полной ширине — экран уезжал вбок на 18 px. */
  .jp-wall .jp-step{width:auto;display:flex;align-items:center;gap:12px;min-height:56px;padding:10px 14px;border-radius:6px;
     background:linear-gradient(180deg,rgba(var(--jp-arg),.13),rgba(0,0,0,.14));
     border:1px solid rgba(var(--jp-arg),.26);border-bottom-width:3px}
  .jp-wall .jp-step:nth-child(odd){margin-right:26px}
  .jp-wall .jp-step:nth-child(even){margin-left:26px}
  .jp-wall .jp-step.done{background:linear-gradient(180deg,rgba(143,209,168,.14),rgba(0,0,0,.14));border-color:rgba(143,209,168,.4)}
  .jp-wall .jp-step.next{background:linear-gradient(180deg,rgba(var(--jp-arg),.3),rgba(var(--jp-arg),.12));border-color:var(--jp-a)}
  .jp-wall .st-n{flex:0 0 auto;font-size:14px;color:#cbb89a;font-variant-numeric:tabular-nums;min-width:26px}
  .jp-wall .jp-step.next .st-n{color:#20180a;background:var(--jp-a);border-radius:5px;text-align:center;padding:2px 0}
  .jp-wall .st-b{min-width:0;flex:1}

  /* ═══ 3 класс · мерная лента с верстовыми столбами ═══
     Номер стоит ВНУТРИ столба: раньше цифра лежала поверх ленты и не читалась. */
  .jp-road{position:relative;padding-left:52px}
  .jp-road::before{content:'';position:absolute;left:15px;top:10px;bottom:10px;width:4px;border-radius:99px;
     background:repeating-linear-gradient(180deg,rgba(var(--jp-arg),.42) 0 12px,rgba(255,255,255,.06) 12px 26px)}
  .jp-road .jp-step{position:relative;display:flex;align-items:center;gap:12px;min-height:64px;padding:8px 0}
  .jp-road .st-post{position:absolute;left:-52px;width:34px;display:flex;align-items:center;justify-content:center}
  .jp-road .st-post b{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
     font-size:14px;font-weight:400;color:#dcd0b6;background:#22352b;border:2px solid rgba(var(--jp-arg),.5);
     font-variant-numeric:tabular-nums}
  .jp-road .jp-step.done .st-post b{background:#28432f;border-color:rgba(143,209,168,.65);color:#a7d7b6}
  .jp-road .jp-step.next .st-post b{background:var(--jp-a);border-color:#fff1cd;color:#10201c;
     box-shadow:0 0 0 5px rgba(var(--jp-arg),.2)}
  .jp-road .st-b{min-width:0;flex:1;padding:10px 14px;border-radius:12px;
     background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
  .jp-road .jp-step.next .st-b{background:rgba(var(--jp-arg),.14);border-color:rgba(var(--jp-arg),.5)}
  .jp-road .jp-step.done .st-b{background:rgba(143,209,168,.08);border-color:rgba(143,209,168,.22)}

  /* ═══ 4 класс · курс по карте ═══
     Ломаная идёт своей колонкой слева: поверх подписей штрихи читались как сор. */
  .jp-course{position:relative;padding-left:58px}
  .jp-course .cs-line{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}
  .jp-course .cs-line path{fill:none;stroke:rgba(var(--jp-arg),.34);stroke-width:1.5;stroke-dasharray:5 6}
  .jp-course .jp-step{position:relative;display:flex;align-items:center;gap:12px;min-height:66px;padding:8px 0}
  .jp-course .st-node{position:absolute;left:-58px;flex:0 0 46px;width:46px;height:46px;display:flex;align-items:center;justify-content:center}
  .jp-course .jp-step.gal-r .st-node{left:-40px}
  .jp-course .st-node::before{content:'';position:absolute;inset:8px;transform:rotate(45deg);border-radius:4px;
     border:1.5px solid rgba(var(--jp-arg),.5);background:#22352b}
  .jp-course .st-node em{position:relative;font-style:normal;font-size:14px;color:#dcd0b6;font-variant-numeric:tabular-nums}
  .jp-course .jp-step.done .st-node::before{border-color:rgba(143,209,168,.6);background:#25412f}
  .jp-course .jp-step.done .st-node em{color:#a7d7b6}
  .jp-course .jp-step.next .st-node::before{border-color:#fff1cd;background:var(--jp-a);
     box-shadow:0 0 0 5px rgba(var(--jp-arg),.18)}
  .jp-course .jp-step.next .st-node em{color:#1b1407}
  .jp-course .st-b{min-width:0;flex:1}

  /* ── горизонт: темы, которые готовятся ── */
  .jp-soon{margin:6px 0 24px;padding:16px;border-radius:16px;border:1px dashed rgba(255,255,255,.18);
     background:rgba(255,255,255,.03)}
  .jp-soon b{display:block;font-size:20px;line-height:1.2;color:#e6dbc2;margin-bottom:4px}
  .jp-soon p{margin:0 0 12px;font-size:14px;line-height:1.45;color:#a99a7e}
  .jp-soon ul{margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:8px}
  .jp-soon li{font-size:14px;line-height:1.2;color:#c8bca2;border:1px solid rgba(255,255,255,.14);
     border-radius:99px;padding:6px 12px}

  /* ── слово спутника ── */
  .jp-say{display:flex;gap:14px;align-items:flex-start;margin:0 0 22px;padding:16px;border-radius:18px;
     background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.09)}
  .jp-say img{flex:0 0 52px;width:52px;height:52px;border-radius:50%;object-fit:cover}
  .jp-say .sy-b b{display:block;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:var(--jp-a);margin-bottom:4px}
  .jp-say .sy-b p{margin:0;font-size:16px;line-height:1.5;color:#e7dcc6;max-width:38ch;text-wrap:pretty}

  .jp-h{margin:26px 2px 10px;font-size:20px;line-height:1.2;color:#ffd76a}

  @media (prefers-reduced-motion: reduce){
    .jp-rail i,.jp-now,.jp-sh.as-btn,.jp-more{transition:none}
  }
  `;
    document.head.appendChild(st);
  }

  /* ---------- отрисовка шагов по форме мира ---------- */
  function шагHTML(ш, i, форма, следующий){
    const кл = 'jp-step' + (ш.готово ? ' done' : '') + (следующий ? ' next' : '');
    const дело = ш.вид === 'урок' ? ("go('lesson-" + ш.id + "')") : ("go('task-" + ш.id + "')");
    const имя = (typeof esc === 'function' ? esc(ш.имя) : ш.имя);
    const под = ш.готово ? 'пройдено' : ш.под;
    const н = i + 1;
    if(форма === 'тропа'){
      const сторона = (i % 2) ? ' side-r' : '';
      return `<button type="button" class="${кл}${сторона}" onclick="${дело}">
        <span class="st-stone">${ш.готово ? '✓' : н}</span>
        <span class="st-b"><span class="st-t">${имя}</span><span class="st-m">${под}</span></span>
      </button>`;
    }
    if(форма === 'кладка'){
      return `<button type="button" class="${кл}" onclick="${дело}">
        <span class="st-n">${ш.готово ? '✓' : н}</span>
        <span class="st-b"><span class="st-t">${имя}</span><span class="st-m">${под}</span></span>
      </button>`;
    }
    if(форма === 'лента'){
      return `<button type="button" class="${кл}" onclick="${дело}">
        <span class="st-post"><i></i><b>${н}</b></span>
        <span class="st-b"><span class="st-t">${имя}</span><span class="st-m">${под}</span></span>
      </button>`;
    }
    /* курс: узлы идут галсами — чётные ближе к линии, нечётные дальше,
       поэтому ломаная читается как настоящая прокладка курса. */
    const галс = (i % 2) ? ' gal-r' : '';
    return `<button type="button" class="${кл}${галс}" onclick="${дело}">
      <span class="st-node"><em>${ш.готово ? '✓' : н}</em></span>
      <span class="st-b"><span class="st-t">${имя}</span><span class="st-m">${под}</span></span>
    </button>`;
  }

  /* Раскрыт участок, на котором ребёнок стоит; остальные свёрнуты в строку.
     Иначе маршрут первоклассника — стена в 14 000 px: 72 шага подряд. */
  if(typeof window.JP === 'undefined') window.JP = {открыт:null, целиком:{}};
  window.jpStage = function(ключ){
    window.JP.открыт = (window.JP.открыт === ключ) ? '' : ключ;
    renderPathJunior();
  };
  window.jpMore = function(ключ){
    window.JP.целиком[ключ] = !window.JP.целиком[ключ];
    renderPathJunior();
  };

  const ШАГОВ_СРАЗУ = 8;

  function этапHTML(э, форма, индекс, раскрыт, следующийId){
    const готово = э.шаги.filter(ш=>ш.готово).length;
    const ключ = 'э'+индекс;
    if(!раскрыт){
      return `<section class="jp-stage closed">
        <button type="button" class="jp-sh as-btn" onclick="jpStage('${ключ}')" aria-expanded="false">
          <span class="s-ic">${значок(форма, индекс)}</span>
          <span class="s-t"><b>${typeof esc==='function'?esc(э.имя):э.имя}</b><span>${typeof esc==='function'?esc(э.цель):э.цель}</span></span>
          <span class="s-n">${готово}/${э.шаги.length}</span>
          <span class="s-chev">▸</span>
        </button>
      </section>`;
    }
    const целиком = !!window.JP.целиком[ключ];
    const видимые = целиком ? э.шаги : э.шаги.slice(0, ШАГОВ_СРАЗУ);
    let n = 0;
    const шаги = видимые.map(function(ш){
      const это = (следующийId && ш.вид + '-' + ш.id === следующийId);
      return шагHTML(ш, n++, форма, это);
    }).join('');
    const ещё = э.шаги.length - видимые.length;
    const кнопкаЕщё = (ещё > 0 || целиком)
      ? `<button type="button" class="jp-more" onclick="jpMore('${ключ}')">${целиком ? 'свернуть участок' : 'ещё ' + ещё + ' ' + склон(ещё,'шаг','шага','шагов')}</button>`
      : '';
    const обёртка = форма === 'тропа' ? 'jp-trail'
                  : форма === 'кладка' ? 'jp-wall'
                  : форма === 'лента' ? 'jp-road' : 'jp-course';
    /* Тропинка и курс ведут линию за шагами: она рисуется по числу шагов. */
    /* Линия тропинки и курса рисуется ПОСЛЕ вставки, по настоящим координатам
       камушков и узлов (провестиЛинии): шаги разной высоты — подпись бывает
       в одну строку и в две, — и растянутый viewBox проходил мимо. */
    const линия = (форма === 'тропа') ? '<svg class="tr-line" aria-hidden="true"><path d=""/></svg>'
                : (форма === 'курс')  ? '<svg class="cs-line" aria-hidden="true"><path d=""/></svg>'
                : '';
    return `<section class="jp-stage">
      <button type="button" class="jp-sh as-btn open" onclick="jpStage('${ключ}')" aria-expanded="true">
        <span class="s-ic">${значок(форма, индекс)}</span>
        <span class="s-t"><b>${typeof esc==='function'?esc(э.имя):э.имя}</b><span>${typeof esc==='function'?esc(э.цель):э.цель}</span></span>
        <span class="s-n">${готово}/${э.шаги.length}</span>
        <span class="s-chev">▾</span>
      </button>
      <div class="${обёртка}">${линия}${шаги}</div>
      ${кнопкаЕщё}
    </section>`;
  }

  /* Тропинка соединяет камушки мягкой змейкой, курс — прямыми галсами.
     Координаты берутся у настоящих элементов, поэтому линия не зависит от
     того, в одну строку подпись шага или в две. */
  function провестиЛинии(корень){
    (корень.querySelectorAll('.jp-trail') || []).forEach(function(блок){
      начертить(блок, '.st-stone', блок.querySelector('.tr-line'), true);
    });
    (корень.querySelectorAll('.jp-course') || []).forEach(function(блок){
      начертить(блок, '.st-node', блок.querySelector('.cs-line'), false);
    });
  }
  function начертить(блок, селектор, svg, мягко){
    if(!svg) return;
    const рамка = блок.getBoundingClientRect();
    const узлы = [].map.call(блок.querySelectorAll(селектор), function(э){
      const r = э.getBoundingClientRect();
      return {x: r.left - рамка.left + r.width/2, y: r.top - рамка.top + r.height/2};
    });
    svg.setAttribute('viewBox', '0 0 ' + Math.round(рамка.width) + ' ' + Math.round(рамка.height));
    svg.setAttribute('preserveAspectRatio', 'none');
    const путь = svg.querySelector('path');
    if(узлы.length < 2){ путь.setAttribute('d',''); return; }
    let d = 'M ' + узлы[0].x.toFixed(1) + ' ' + узлы[0].y.toFixed(1);
    for(let i=1;i<узлы.length;i++){
      const a = узлы[i-1], б = узлы[i];
      if(мягко){
        const сер = (a.y + б.y)/2;
        d += ' C ' + a.x.toFixed(1) + ' ' + сер.toFixed(1) + ', ' + б.x.toFixed(1) + ' ' + сер.toFixed(1)
           + ', ' + б.x.toFixed(1) + ' ' + б.y.toFixed(1);
      } else {
        d += ' L ' + б.x.toFixed(1) + ' ' + б.y.toFixed(1);
      }
    }
    путь.setAttribute('d', d);
  }

  /* ---------- экран ---------- */
  function renderPathJunior(){
    jpCss();
    const k = +классУченика();
    const мир = МИРЫ[k] || МИРЫ[1];
    const {этапы, скоро} = маршрут();
    const все = etapyШаги(этапы);
    const сделано = все.filter(ш=>ш.готово).length;
    const pct = все.length ? Math.round(сделано/все.length*100) : 0;
    const следующий = все.find(ш=>!ш.готово) || null;
    const следId = следующий ? следующий.вид + '-' + следующий.id : null;
    const имя = (function(){ try{ return String((DB.profile&&DB.profile.name)||'').trim(); }catch(e){ return ''; } })();
    const esc2 = s => (typeof esc === 'function' ? esc(s) : String(s));

    const шапка = `<header class="jp-top">
        <div class="jp-tb">
          <span class="jp-cls">${k} класс${имя?' · '+esc2(имя):''}</span>
          <h2>${esc2(мир.имя)}</h2>
          <p>${esc2(мир.под)}</p>
        </div>
        ${мир.спутник.img?`<img class="jp-fig" src="${мир.спутник.img}" alt="" width="84" height="84" decoding="async">`:''}
      </header>`;

    const полоса = `<div class="jp-band"><b>${сделано} из ${все.length}</b><span>${esc2(мир.привал.toLowerCase())} · ${pct}%</span></div>
      <div class="jp-rail"><i style="--w:${(pct/100).toFixed(3)}"></i></div>`;

    const сейчас = следующий
      ? `<button type="button" class="jp-now" onclick="go('${следующий.вид==='урок'?'lesson-':'task-'}${следующий.id}')">
           <span class="n-ic">${значокДействия(следующий.вид)}</span>
           <span class="n-b"><span class="n-k">${следующий.вид==='урок'?'следующий урок':'следующая задача'}</span>
             <span class="n-t">${esc2(следующий.имя)}</span></span>
           <span class="n-arr">→</span>
         </button>`
      : `<button type="button" class="jp-now" onclick="go('library')">
           <span class="n-ic">${значокДействия('урок')}</span>
           <span class="n-b"><span class="n-k">весь маршрут пройден</span>
             <span class="n-t">Выбрать задачу в банке</span></span>
           <span class="n-arr">→</span>
         </button>`;

    const слово = `<div class="jp-say">
        <img src="${мир.спутник.img}" alt="" width="52" height="52" decoding="async">
        <div class="sy-b"><b>${esc2(мир.спутник.имя)}</b><p>${esc2(мир.зовёт)}</p></div>
      </div>`;

    /* Раскрыт тот участок, где стоит ребёнок, — пока он сам не открыл другой. */
    const текущий = следующий
      ? этапы.findIndex(э=>э.шаги.some(ш=>ш.вид+'-'+ш.id === следId))
      : 0;
    const выбран = (window.JP && window.JP.открыт != null)
      ? window.JP.открыт
      : 'э' + Math.max(0, текущий);
    const участки = этапы.map((э,i)=>этапHTML(э, мир.форма, i, ('э'+i) === выбран, следId)).join('');

    const горизонт = скоро.length
      ? `<div class="jp-soon"><b>Впереди</b>
          <p>${скоро.length} ${склон(скоро.length,'тема','темы','тем')} твоего класса Архимед ещё пишет. Их видно, но открыть пока нельзя.</p>
          <ul>${скоро.slice(0,8).map(L=>`<li>${esc2(L.title)}</li>`).join('')}
          ${скоро.length>8?`<li>и ещё ${скоро.length-8}</li>`:''}</ul></div>`
      : '';

    const s = document.getElementById('screen');
    s.innerHTML = `<div class="jp" style="--jp-a:${мир.акцент};--jp-arg:${мир.акцентRGB}">
        ${шапка}${полоса}${сейчас}${слово}${участки}${горизонт}
      </div>`;

    /* Острова и переключатели старого «Пути» остаются ниже: ребёнок может
       открыть весь мир и увидеть банк задач, как раньше. */
    if(typeof window.pathTailHTML === 'function'){
      s.insertAdjacentHTML('beforeend', window.pathTailHTML());
    }
    requestAnimationFrame(function(){ try{ провестиЛинии(s); }catch(e){} });
    if(typeof hud === 'function') hud();
  }

  function etapyШаги(этапы){
    const все = [];
    этапы.forEach(э=>э.шаги.forEach(ш=>все.push(ш)));
    return все;
  }
  function склон(n, one, few, many){
    const m10 = Math.abs(n)%10, m100 = Math.abs(n)%100;
    if(m10===1 && m100!==11) return one;
    if(m10>=2 && m10<=4 && (m100<10 || m100>=20)) return few;
    return many;
  }
  function значокДействия(вид){
    const s = 'stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"';
    return вид === 'урок'
      ? `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5zM19 18v3H6.5" ${s}/></svg>`
      : `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><circle cx="12" cy="12" r="8" ${s}/><path d="M12 8v4l3 2" ${s}/></svg>`;
  }

  window.renderPathJunior = renderPathJunior;
  window.junRouteReady = младший;
})();
