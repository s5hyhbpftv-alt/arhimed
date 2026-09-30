/* ============ ХИМИЯ · УРОК 40 · «МАССОВАЯ ДОЛЯ РАСТВОРА» · ВИРТУАЛЬНАЯ ПРАКТИЧЕСКАЯ ============
   Сделан по образцу урока 39 (манера NOBOOK) с вниманием к мелочам, по просьбе владельца.
   Карточка 40 из банка подменяется этой записью, рисовальщик — VISKW[40].
   Рисунки — MVP/data/ris_lab.js (window.РЛ): студия, весы, лодочка, шпатель, стакан,
   мерный цилиндр, пипетка, стеклянная палочка, склянка с притёртой пробкой и этикеткой,
   вставка «мениск крупно» с глазом наблюдателя, выпаривание на треножнике над
   спиртовкой, круговая диаграмма состава, лупа «микромир» (ионы Na⁺ и Cl⁻ среди
   молекул воды; кристалл NaCl).

   МЕЛОЧИ, О КОТОРЫХ ЗАБОТИМСЯ (как в настоящей практической работе 8 класса):
   • расчёт до опыта — без него практикум не начинается;
   • лодочку ставят на весы и обнуляют TARE до того, как сыпать соль;
   • соль досыпают по 0,1 г, перебор — отсыпать шпателем;
   • воду не взвешивают, а отмеряют цилиндром (плотность 1 г/мл); почти до метки
     наливают из стакана, последние миллилитры — пипеткой;
   • объём читают по НИЖНЕМУ краю мениска, глаз — на уровне мениска;
   • мешают стеклянной палочкой до полного растворения;
   • раствор переливают в склянку и подписывают: вещество, ω, масса, дата;
   • техника безопасности: халат, очки, не пробовать на вкус, рассыпанное не в банку.
   Опыт 2 — «предскажи и проверь»: долить воду, досыпать соль, выпарить воду,
   отлить половину (ловушка: доля не меняется).

   ТЕОРИЯ: раствор = растворитель + растворённое вещество; ω = m(в-ва) : m(р-ра)·100 %;
   m(в-ва) = ω·m(р-ра); m(р-ра) = m(в-ва) + m(воды); V(воды) = m(воды) : ρ, ρ = 1 г/мл. */
(function(){
  'use strict';

  const ID = 40;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'практикум',    имя:'Практическая: 50 г 10 %', итог:'склянка подписана'},
    {ключ:'концентрация', имя:'Опыт 2: меняем долю',     итог:'4 из 4'},
    {ключ:'марафон',      имя:'Проверка: марафон',      итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Приготовить <b>50 г раствора поваренной соли с массовой долей 10 %</b> и научиться рассчитывать массовую долю вещества в растворе.'],
    ['Принцип','<b>Раствор</b> — однородная смесь растворителя (воды) и растворённого вещества. <b>Массовая доля</b> ω = m(в-ва) : m(р-ра) · 100 %. Масса раствора — это вещество и вода вместе. Воду удобнее не взвешивать, а отмерять цилиндром: плотность воды <b>1 г/мл</b>, значит 45 г воды — это 45 мл.'],
    ['Оборудование','<b>Приборы:</b> электронные весы (0,1 г), лодочка для взвешивания, шпатель, химический стакан 100 мл, мерный цилиндр 100 мл, пипетка, стеклянная палочка, склянка с этикеткой.<br><b>Реактивы:</b> хлорид натрия NaCl, дистиллированная вода.'],
    ['Ход работы','1. Рассчитать массы соли и воды.<br>2. Взвесить соль.<br>3. Отмерить воду.<br>4. Растворить соль.<br>5. Перелить раствор в склянку и подписать.'],
    ['Безопасность','Работай в <b>халате и очках</b>. Реактивы <b>не пробуют на вкус</b> — даже соль. Рассыпанное вещество не ссыпают обратно в банку. Стекло ставь дальше от края стола. После работы вымой руки.']
  ];
  const РАСЧЁТ = [
    {q:'m(NaCl) = ω · m(р-ра) = 0,1 · 50 г = ?', вар:['0,5 г','5 г','10 г'], в:1, р:'0,1 · 50 = 5 г соли.', ош:'10 % = 0,1. Умножь 0,1 на 50 г.'},
    {q:'m(воды) = m(р-ра) − m(NaCl) = 50 − 5 = ?', вар:['45 г','50 г','55 г'], в:0, р:'50 − 5 = 45 г воды.', ош:'50 г — это весь раствор. Вода — это раствор без соли.'},
    {q:'V(воды) = m : ρ = 45 г : 1 г/мл = ?', вар:['4,5 мл','450 мл','45 мл'], в:2, р:'45 г воды занимают 45 мл.', ош:'Плотность воды 1 г/мл: сколько граммов, столько и миллилитров.'}
  ];
  /* практикум: шаги; что — плитка лотка или действие */
  const ШАГИ = [
    {т:'Поставь на стол электронные весы.',                       что:'весы'},
    {т:'Включи весы кнопкой ON.',                                 что:'ON'},
    {т:'Поставь на чашу весов лодочку для взвешивания.',          что:'лодочка'},
    {т:'Нажми TARE — масса лодочки вычтется.',                    что:'TARE'},
    {т:'Шпателем насыпь NaCl ровно 5,0 г.',                       что:'насыпать'},
    {т:'Пересыпь соль из лодочки в химический стакан.',           что:'стакан'},
    {т:'Налей воду в цилиндр почти до метки — до 40 мл.',          что:'налить'},
    {т:'Пипеткой доведи уровень до 45 мл.',                       что:'пипетка'},
    {т:'Проверь объём: как смотреть на мениск?',                  что:'мениск'},
    {т:'Влей воду из цилиндра в стакан с солью.',                 что:'влить'},
    {т:'Размешай стеклянной палочкой до полного растворения.',    что:'палочка'},
    {т:'Перелей раствор в склянку и наклей этикетку.',            что:'склянка'}
  ];
  const ЛОТОК = [['весы','Весы'],['лодочка','Лодочка'],['шпатель','Шпатель'],['соль','NaCl'],['стакан','Стакан'],['цилиндр','Цилиндр'],
    ['пипетка','Пипетка'],['палочка','Палочка'],['склянка','Склянка'],['спиртовка','Спиртовка'],['колба','Колба'],['очки','Очки']];
  const ИМЯ = {весы:'весы',лодочка:'лодочку',шпатель:'шпатель',соль:'банку NaCl',стакан:'стакан',цилиндр:'цилиндр',пипетка:'пипетку',палочка:'палочку',склянка:'склянку',спиртовка:'спиртовку',колба:'колбу',очки:'очки'};
  const ВЗГЛЯД = ['по нижнему краю мениска, глаз на его уровне','сверху, заглянув в цилиндр','снизу, присев под стол'];
  /* опыт 2: из 50 г 10 %-ного раствора (5 г соли + 45 г воды) */
  const СЛУЧАИ = [
    {что:'Долили 50 г воды',      m:5,  M:100, w:'5 %',   вар:['10 %','5 %','20 %'],      в:1, р:'Соли столько же (5 г), а раствора 100 г: 5 : 100 = 5 %. Разбавили — доля уменьшилась.'},
    {что:'Досыпали 5 г соли',      m:10, M:55,  w:'≈18,2 %',вар:['≈18,2 %','20 %','15 %'], в:0, р:'Соли 10 г, раствора 50 + 5 = 55 г: 10 : 55 ≈ 0,182 = 18,2 %. Не 20 % — масса раствора тоже выросла!'},
    {что:'Выпарили 25 г воды',     m:5,  M:25,  w:'20 %',  вар:['5 %','10 %','20 %'],      в:2, р:'Соль не испаряется: 5 г в 25 г раствора = 20 %. Упаривание — доля растёт.'},
    {что:'Отлили половину раствора',m:2.5,M:25, w:'10 %',  вар:['5 %','10 %','20 %'],      в:1, р:'Отлили и соль, и воду поровну: 2,5 : 25 = 10 %. Доля не изменилась — раствор однороден!'}
  ];
  const МАРАФОН = [
    {q:'10 г соли в 200 г раствора. Массовая доля?', вар:['5 %','10 %','20 %'], в:0, р:'10 : 200 = 0,05 = 5 %.'},
    {q:'Сколько соли нужно для 80 г 15 %-ного раствора?', вар:['15 г','12 г','68 г'], в:1, р:'0,15 · 80 = 12 г.'},
    {q:'Сколько воды нужно для 200 г 5 %-ного раствора?', вар:['10 г','195 г','190 г'], в:2, р:'Соли 0,05 · 200 = 10 г, воды 200 − 10 = 190 г.'},
    {q:'20 г сахара растворили в 80 г воды. ω(сахара)?', вар:['20 %','25 %','80 %'], в:0, р:'Раствора 100 г: 20 : 100 = 20 %.'},
    {q:'Объём 36 г воды?', вар:['3,6 мл','36 мл','360 мл'], в:1, р:'Плотность воды 1 г/мл: 36 мл.'},
    {q:'Из 100 г 20 %-ного раствора выпарили 50 г воды. ω?', вар:['10 %','20 %','40 %'], в:2, р:'Соли 20 г, раствора 50 г: 40 %.'},
    {q:'К 100 г 10 %-ного раствора долили 100 г воды. ω?', вар:['5 %','10 %','20 %'], в:0, р:'10 г соли в 200 г раствора — 5 %.'},
    {q:'Отлили треть раствора. Массовая доля…', вар:['уменьшилась','не изменилась','выросла'], в:1, р:'Раствор однороден — доля та же.'},
    {q:'Объём по мерному цилиндру читают…', вар:['по нижнему краю мениска','по верхнему краю','как удобно'], в:0, р:'Для воды — по нижнему краю вогнутого мениска, глаз на его уровне.'},
    {q:'Сколько соли в 250 г 4 %-ного раствора?', вар:['4 г','10 г','25 г'], в:1, р:'0,04 · 250 = 10 г.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const чис0 = (v) => String(Math.round(v*100)/100).replace('.',',');
  const П1 = поМесту([[10,50],[20,100],[5,25],[15,60],[30,120],[8,40],[12,48],[50,200],[9,90],[40,160],[6,30],[25,100],[18,90],[7,70],[45,180],[16,80]]
    .map(([m,M])=>{ const w=Math.round(m/M*100), н=Math.round(m/(M-m)*100);
      return {q:m+' г соли в '+M+' г раствора. Массовая доля?', m:m, M:M, w:w, ок:w+' %', нет:(н===w?w*2:н)+' %', раз:'ω = '+m+' : '+M+' · 100 % = '+w+' %. Делят на массу всего раствора, а не воды.'}; }));
  const П2 = поМесту([[10,200],[5,100],[20,150],[25,80],[15,200],[2,500],[30,50],[40,250],[12,100],[8,300],[35,200],[4,250],[6,50],[45,200],[1,1000],[25,400]]
    .map(([w,M])=>{ const m=w*M/100, вода=M-m;
      return {q:'Сколько воды нужно для '+M+' г '+w+' %-ного раствора?', w:w, M:M, m:m, ок:чис0(вода)+' г', нет:чис0(m)+' г', раз:'Соли '+String(w/100).replace('.',',')+' · '+M+' = '+чис0(m)+' г, воды '+M+' − '+чис0(m)+' = '+чис0(вода)+' г.'}; }));
  const ВАР3 = ['увеличится','уменьшится','не изменится'];
  const П3 = [['Долили воды',1,'вода'],['Досыпали соли и растворили',0,'соль'],['Выпарили часть воды',0,'пар'],['Отлили половину раствора',2,'отлить'],
    ['Добавили ещё такого же раствора',2,'отлить'],['Разбавили водой вдвое',1,'вода'],['Вода частично испарилась на солнце',0,'пар'],['Перелили раствор в другой стакан',2,'отлить'],
    ['Растворили ещё немного сахара',0,'соль'],['Смешали с чистой водой',1,'вода'],['Раствор постоял, ничего не делали',2,'отлить'],['Прокипятили и упарили',0,'пар'],
    ['Добавили кристаллик соли',0,'соль'],['Разлили по двум склянкам',2,'отлить'],['Долили дистиллированной воды',1,'вода'],['Взяли пипеткой пробу',2,'отлить']]
    .map(([ф,в,вид])=>({q:ф+'. Массовая доля соли…', ф:ф, вид:вид, вар:ВАР3, в:в, раз:в===0?'Вещества стало больше или воды меньше — доля растёт.':в===1?'Вещество то же, раствора больше — доля падает.':'Раствор однороден: часть его имеет ту же долю. Ничего не добавили и не выпарили — доля та же.'}));

  const CSS=`
  #lvis .s6.l40n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l40n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l40n table.итоги td{white-space:normal!important}
  #lvis .s6.l40n table.итоги td:first-child{width:46%}
  #lvis .s6.l40n table.итоги{table-layout:fixed}
  #lvis .s6.l40n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l40n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l40n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l40n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l40n .ask button{text-align:left}
  #lvis .s6.l40n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l40n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l40n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l40n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l40n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l40n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l40n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l40n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l40n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l40n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l40n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l40n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l40n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l40n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l40n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l40n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l40n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l40n .плитка span{text-align:center}
  #lvis .s6.l40n .плитка:active{transform:scale(.96)}
  #lvis .s6.l40n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l40n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l40n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l40n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l40n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l40n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l40n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l40n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l40n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l40n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l40n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l40n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l40n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l40n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l40n{gap:14px}
  #lvis .s6.l40n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l40n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l40n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l40n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l40n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l40n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l40n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l40n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l40n .карт .текст b{color:${GOLD}}
  #lvis .s6.l40n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l40n .правило b{color:${GOLD}}
  #lvis .s6.l40n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l40n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l40n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l40n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l40n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l40n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l40n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l40n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l40n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l40n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l40n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l40n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l40n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l40n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l40n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l40n .буйки button.мимо{border-color:${RED};animation:l40nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l40nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l40n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l40n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l40n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l40n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l40n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l40n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l40n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l40n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l40n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l40n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l40n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l40n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l40n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l40n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l40n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l40n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l40n .уровни .точка.сейчас{background:${GOLD};animation:l40ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l40ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l40n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l40n{-webkit-text-size-adjust:100%}
  #lvis .s6.l40n [data-anim]{animation:l40nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l40nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l40n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l40n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l40n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l40n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l40n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l40n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l40n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l40n [data-anim]{animation:none!important}
    #lvis .s6.l40n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l40n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l40n-style');
      if(!s){ s=document.createElement('style'); s.id='l40n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r40Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Практическая работа</span><b class="${всё?'готово':''}">${
        всё?'работа сдана':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
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
      <filter id="c40-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c40-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c40-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c40-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c40-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c40-плиты)"/>
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
  const ФОРМ = (html,метка0) => A(5,'карт','<span class="метка">'+(метка0||'Формула')+'</span><div class="текст" style="font-size:22px;text-align:center;font-family:Georgia,serif">'+html+'</div>');
  const СПИСОК = (заг,список,текущий) => A(9,'шаги-опыта','<div class="шаги-заг">'+заг+'</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  const ЛОТОК_ = (плитки,обработчик,отметки) => `<div class="лоток" data-anim style="--i:4">${плитки.map(([что,имя])=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;
  /* панель состава раствора: диаграмма и подписи — как «данные» в виртуальной лаборатории */
  const состав = (cx,cy,m,M) => { const Л=L_(), д=M?m/M:0;
    return `<rect x="${cx-64}" y="${cy-40}" width="128" height="80" rx="10" fill="rgba(12,14,18,.82)" stroke="#4a525c" stroke-width="1"/>
      ${Л.диаграмма(cx-32,cy,26,д)}
      <rect x="${cx+2}" y="${cy-22}" width="8" height="8" rx="2" fill="#f0f2f4"/><text x="${cx+14}" y="${cy-15}" font-size="9" fill="#e8ecf0" font-family="Arial,sans-serif">соль ${чис(Math.round(m*10)/10)} г</text>
      <rect x="${cx+2}" y="${cy-6}" width="8" height="8" rx="2" fill="#3a8ac8"/><text x="${cx+14}" y="${cy+1}" font-size="9" fill="#e8ecf0" font-family="Arial,sans-serif">вода ${чис(Math.round((M-m)*10)/10)} г</text>
      <text x="${cx+2}" y="${cy+22}" font-size="11" font-weight="bold" fill="#ffd76a" font-family="Arial,sans-serif">ω = ${чис(Math.round(д*1000)/10)} %</text>`; };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка практической работы */
  function F1(s){
    const Н=230, y0=172, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ч=Л.весыВерх(y0+14,96);
    const пр = Л.весы(56,y0+14,96,{показ:''}) + Л.лодочка(56,ч,36,{горка:0}) + Л.банка(122,y0+12,26,38,{содержимое:'соль',надпись:['NaCl'],мал:true}) +
      Л.стакан(166,y0+14,40,48,{уровень:0,объём:100}) + Л.цилиндр(214,y0+14,16,100,{мл:0}) + Л.склянка(262,y0+14,30,56,{этикетка:['    ']}) +
      Л.палочка(282,y0+26,322,y0+20) + Л.очки(304,y0+14,0.5);
    const поверх = метка(168,18,'Практическая работа: раствор NaCl, ω = 10 %',ЗЛ,{кегль:11}) +
      Л.имяПрибора(56,y0+30,'весы')+Л.имяПрибора(166,y0+30,'стакан')+Л.имяПрибора(214,y0+30,'цилиндр')+Л.имяПрибора(262,y0+30,'склянка');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Приготовление раствора') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r40вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок — особенно «Безопасность».') :
        ОТВЕТЫ('',['вещество и растворитель вместе','только растворённое вещество'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Масса раствора — это масса…') :
          РАЗБОР(ок,['Верно: m(р-ра) = m(в-ва) + m(воды). 5 г соли + 45 г воды = 50 г раствора.',
            'Масса вещества — только часть. Раствор весит столько, сколько <b>вещество и вода вместе</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>m(р-ра) = m(в-ва) + m(воды)</b>. <b>ω = m(в-ва) : m(р-ра) · 100 %</b>.') : '');
  }

  /* 2. Раствор под лупой */
  function F2(s){
    const Н=240, y0=182, Л=L_(), р=!!s.мех2, в=s.ответ2, ок=в===0;
    const пр = Л.стакан(150,y0+14,76,92,{уровень:.55,объём:100,крупинки:р&&!Л.ДВИЖ?0:(р?16:16),вид:'соль',таять:р,палочка:р,мешать:р,цвет:Л.цвет('соль',р?.1:0)}) + Л.банка(40,y0+12,34,50,{содержимое:'соль',надпись:['NaCl']});
    const поверх = Л.лупа(270,74,46,р?'раствор':'соль',{подпись:р?'ионы Na⁺ и Cl⁻ среди молекул воды':'кристалл NaCl'}) + (р?состав(72,100,5,50):'') +
      метка(150,18,р?'соль растворилась — её не видно':'соль на дне стакана',р?ЗЕ:ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Что происходит при растворении') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ask">${BTN(3,р?'hit':'',р?'Соль растворилась':'Размешать палочкой',р?'':"r40мех()")}</div>` +
      ТЕОРИЯ('раствор','Кристалл соли состоит из ионов Na⁺ и Cl⁻. В воде молекулы H₂O растаскивают кристалл по одному иону, и ионы равномерно распределяются по всему объёму. Поэтому раствор <b>однородный и прозрачный</b>, а любая его капля имеет <b>ту же массовую долю</b>.') +
      (!р ? СКАЗ('Опыт','Размешай соль в воде и посмотри в лупу.') :
        ОТВЕТЫ('',['распалась на ионы и равномерно распределилась','исчезла, её больше нет'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','Куда делась соль после растворения?') :
          РАЗБОР(ок,['Верно: соль никуда не делась — её масса вошла в массу раствора, ионы разошлись по всему объёму.',
            'Соль не исчезает: весы покажут, что масса раствора = соль + вода. Просто ионы слишком малы, чтобы их видеть.'][в]))) +
      (ок ? ПРАВИЛО('Раствор однороден: в <b>любой</b> его части массовая доля одинакова.') : '');
  }

  /* 3. Расчёт перед опытом */
  function F3(s){
    const Н=210, y0=160, Л=L_(), n=Math.min(s.расч||0,3), отз=s.отз3, все=n>=3;
    const ч=Л.весыВерх(y0+14,110);
    const пр = Л.весы(80,y0+14,110,{показ:n>=1?'5.0':'0.0'}) + Л.лодочка(80,ч,44,{горка:n>=1?5:0}) + Л.цилиндр(200,y0+14,20,110,{мл:n>=3?45:0}) + Л.склянка(282,y0+14,40,72,{этикетка:['NaCl','ω = 10 %','50 г']});
    const поверх = (n>=1?метка(80,18,'соль: 5 г',ЗЛ,{кегль:12}):'') + (n>=2?метка(200,18,'вода: 45 г',СН,{кегль:12}):'') + (n>=3?метка(116,52,'45 г воды = 45 мл',СН,{кегль:11}):'');
    const з=РАСЧЁТ[Math.min(n,2)];
    return ЖУРНАЛ(s) + ШАПКА('Шаг 0','Расчёт перед опытом') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      СПИСОК('Лабораторный журнал · расчёт',РАСЧЁТ.map((x,i)=>i<n?x.q.replace(/\?$/,x.вар[x.в]):x.q),n) +
      (все ? '' : A(5,'карт задача','<span class="метка">Посчитай</span><div class="текст">'+з.q+'</div>') + `<div class="ask три">${з.вар.map((v,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',v,'r40расч('+j+')')).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (все ? ПРАВИЛО('Расчёт готов: <b>5 г NaCl</b> и <b>45 мл воды</b>. Без расчёта к весам не подходят.') : '');
  }

  /* 4. Практическая работа */
  function F4(s){
    const Н=240, y0=182, Л=L_(), ш=Math.min(s.пр||0,ШАГИ.length), м=s.прм||0, мл=s.прмл||0, отз=s.прОтз, готово=ш>=ШАГИ.length, расч=(s.расч||0)>=3;
    if(!расч) return ЖУРНАЛ(s) + ШАПКА('Практическая работа','Раствор NaCl, ω = 10 %') +
      РАЗБОР(false,'Сначала расчёт! Вернись на шаг назад и посчитай, сколько соли и воды нужно. Без расчёта практическую не начинают.') +
      `<div class="ask">${BTN(3,'','← К расчёту',"LV.step--;chRender(0)")}</div>`;
    const ч=Л.весыВерх(y0+14,110), вСтакане=ш>=6, воВоде=ш>=10, размешано=ш>=11;
    const табло = ш<2?'':ш===2?'0.0':ш===3?'2.1':ш<6?м.toFixed(1):'0.0';
    const пр = (ш>=1&&ш<6?Л.весы(62,y0+14,110,{показ:табло}):'') + (ш>=3&&ш<6?Л.лодочка(62,ч,44,{горка:м>0?Math.min(7,1.5+м):0}):'') +
      (ш>=6&&!готово?Л.стакан(ш>=10?150:200,y0+14,60,72,{уровень:воВоде?0.62:0,объём:100,крупинки:вСтакане&&!(размешано&&!Л.ДВИЖ)?14:0,вид:'соль',таять:размешано,палочка:ш===11||размешано&&!готово,мешать:ш===11||размешано,цвет:Л.цвет('соль',размешано?0.1:0)}):'') +
      (ш>=6&&ш<10?Л.цилиндр(274,y0+14,26,150,{мл:мл}):'') + (ш===7&&s.прПип?Л.пипетка(298,y0-110,0.8,true):'') +
      (готово?Л.склянка(170,y0+14,50,90,{уровень:.62,цвет:Л.цвет('соль',.1),этикетка:['NaCl','ω = 10 %','50 г · 1 окт.'],полоса:'#2a6ab8'}):'') +
      (ш<6?Л.банка(292,y0+12,40,60,{содержимое:'соль',надпись:['NaCl','натрия хлорид']}):Л.палочка(270,y0+24,322,y0+16));
    const поверх = (ш===0?метка(168,Н/2-40,'стол пуст — возьми прибор из лотка',null,{кегль:11}):'') +
      (ш>=4&&ш<6?метка(62,18,'на весах: '+чис(м.toFixed(1))+' г из 5,0 г',м===5?ЗЕ:ЗЛ,{кегль:11}):'') +
      (ш>=6&&ш<10?метка(200,18,'в цилиндре: '+мл+' мл из 45',мл===45?ЗЕ:СН,{кегль:11}):'') +
      (ш>=7&&ш<=9&&мл>0?(()=>{ const yУр=y0+14-6-(150-16)*мл/100; return `<path d="M130 96 L${274-14} ${yУр.toFixed(1)}" stroke="#ffd76a" stroke-width="1" stroke-dasharray="3 3" opacity=".8"/><rect x="${274-15}" y="${(yУр-5).toFixed(1)}" width="30" height="10" fill="none" stroke="#ffd76a" stroke-width="1" rx="2"/>`+Л.мениск(84,96,50,мл,{глаз:ш===9&&s.прВзгляд===0}); })():'') +
      (готово?Л.лупа(60,64,38,'раствор',{подпись:'ω = 10 % в каждой капле'})+состав(272,66,5,50):'');
    const ДЕЙ = ШАГИ[Math.min(ш,ШАГИ.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙ==='ON') кнопки=`<div class="ask">${BTN(5,'','Нажать ON',"r40пр('ON')")}</div>`;
      if(ДЕЙ==='TARE') кнопки=`<div class="ask">${BTN(5,'','Нажать TARE',"r40пр('TARE')")}</div>`;
      if(ДЕЙ==='насыпать') кнопки=`<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${[[1,'+1 г'],[0.5,'+0,5 г'],[0.1,'+0,1 г'],[-0.5,'−0,5 г']].map(([d,t0],j)=>BTN(5+j,'',t0,"r40пр('+"+d+"')")).join('')}</div>`;
      if(ДЕЙ==='налить') кнопки=`<div class="ask">${BTN(5,'','Налить воду до ~40 мл',"r40пр('налить')")}</div>`;
      if(ДЕЙ==='пипетка'&&s.прПип) кнопки=`<div class="ряд" style="grid-template-columns:repeat(2,minmax(0,1fr))">${BTN(5,'','+1 мл (капнуть)',"r40пр('+мл')")}${BTN(6,'','−1 мл (отобрать)',"r40пр('-мл')")}</div>`;
      if(ДЕЙ==='мениск') кнопки=`<div class="ask">${ВЗГЛЯД.map((t0,j)=>BTN(5+j,'','Смотреть '+t0,"r40пр('взгляд"+j+"')")).join('')}</div>`;
      if(ДЕЙ==='влить') кнопки=`<div class="ask">${BTN(5,'','Влить воду в стакан',"r40пр('влить')")}</div>`;
    }
    const отм={}; ЛОТОК.forEach(([что])=>{ const idx=ШАГИ.findIndex(x=>x.что===что); if(idx>=0&&idx<ш) отм[что]='done'; });
    return ЖУРНАЛ(s) + ШАПКА('Практическая работа · шаг '+Math.min(ш+1,ШАГИ.length)+' из '+ШАГИ.length,'Раствор NaCl, ω = 10 %') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+' из '+ШАГИ.length+'</span><div class="текст">'+ШАГИ[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      кнопки +
      (готово ? '' : ЛОТОК_(ЛОТОК,'r40пр',отм)) +
      СПИСОК('Ход работы',ШАГИ.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('вывод','Мы приготовили <b>50 г</b> раствора: 5 г NaCl + 45 г (45 мл) воды. Массовая доля соли ω = 5 : 50 · 100 % = <b>10 %</b> — в любой капле. На склянке: вещество, доля, масса и дата.') +
        `<div class="ask">${BTN(8,'','Повторить работу',"r40прСброс()")}</div>` : '');
  }

  /* 5. Опыт 2: меняем долю — предскажи и проверь */
  function F5(s){
    const Н=240, y0=182, Л=L_(), к=s.сл5, сдел=s.сдел5||{}, отз=s.отз5, все=СЛУЧАИ.every((x,i)=>сдел[i]), в=s.ответ5, ок=в===0;
    const С=к==null?null:СЛУЧАИ[к], видно=С&&сдел[к];
    let пр='', поверх='';
    const склянка0 = (ур) => Л.склянка(150,y0+14,50,90,{уровень:ур,цвет:Л.цвет('соль',.1),этикетка:['NaCl','ω = ?','']});
    if(!С) пр = склянка0(.62);
    else if(к===0) пр = Л.стакан(110,y0+14,70,88,{уровень:видно?0.8:0.42,объём:250,палочка:видно,мешать:видно,цвет:Л.цвет('соль',видно?.05:.1)}) + Л.цилиндр(236,y0+14,22,124,{мл:видно?0:50}) + (видно&&Л.ДВИЖ?'':'');
    else if(к===1) пр = Л.стакан(130,y0+14,70,88,{уровень:.44,объём:250,крупинки:видно&&!Л.ДВИЖ?0:(видно?12:0),вид:'соль',таять:видно,палочка:видно,мешать:видно,цвет:Л.цвет('соль',видно?.18:.1)}) + Л.лодочка(250,y0+14,44,{горка:видно?0:6}) + Л.шпатель(226,y0+18,40,-10,{});
    else if(к===2) пр = Л.выпаривание(150,y0+14,1.15,true,видно?0.3:0.7) + Л.банка(290,y0+12,32,48,{стекло:'янтарь',надпись:['спирт']});
    else пр = Л.стакан(104,y0+14,64,80,{уровень:видно?0.26:0.52,объём:250,цвет:Л.цвет('соль',.1)}) + (видно?Л.стакан(222,y0+14,64,80,{уровень:0.26,объём:250,цвет:Л.цвет('соль',.1)}):'');
    поверх = (С?метка(168,16,С.что,ЗЛ,{кегль:12}):метка(168,16,'исходный: 50 г, 5 г соли, ω = 10 %',ЗЛ,{кегль:11})) + (видно?состав(270,86,С.m,С.M):С?'':состав(270,86,5,50));
    const отм={}; СЛУЧАИ.forEach((x,i)=>{ отм['с'+i]=сдел[i]?'done':''; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Меняем массовую долю') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(2,minmax(0,1fr))">${СЛУЧАИ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(сдел[i]?' был0':''),(сдел[i]?'✓ ':'')+x.что,'r40сл('+i+')')).join('')}</div>` +
      (С&&!видно ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">Было 50 г раствора с 5 г соли (10 %). '+С.что.toLowerCase()+'. Какой станет ω?</div>')+`<div class="ask три">${С.вар.map((v,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',v,'r40пред('+j+')')).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !С ? СКАЗ('Опыт','Выбери, что сделать с раствором. Сначала предскажи результат — потом проверим.') : '') +
      A(8,'карт','<span class="метка">Таблица наблюдений · '+СЛУЧАИ.filter((x,i)=>сдел[i]).length+' из 4</span><table class="итоги"><tr><th>Действие</th><th>соль</th><th>раствор</th><th>ω</th></tr>'+
        СЛУЧАИ.map((x,i)=>сдел[i]?`<tr><td>${x.что}</td><td>${чис(x.m)} г</td><td>${x.M} г</td><td>${x.w}</td></tr>`:`<tr class="пусто"><td>${x.что}</td><td>—</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (!все ? '' :
        ОТВЕТЫ('',['не изменится','уменьшится вдвое'],0,в,5) +
        (в==null ? СКАЗ('Вопрос','Из склянки отлили в пробирку пробу раствора. Какова массовая доля в пробирке?') :
          РАЗБОР(ок,['Верно: раствор однороден, проба имеет ту же долю — 10 %.','Отлили и соль, и воду в той же пропорции. Доля та же — <b>10 %</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Разбавили</b> — ω падает. <b>Досыпали вещество</b> или <b>упарили воду</b> — ω растёт. <b>Отлили часть</b> — ω не меняется.') : '');
  }

  /* 6. Наблюдения и вывод */
  function F6(s){
    const Н=220, y0=166, Л=L_();
    const пр = Л.склянка(60,y0+14,40,72,{уровень:.62,цвет:Л.цвет('соль',.05),этикетка:['NaCl','5 %']}) + Л.склянка(130,y0+14,40,72,{уровень:.62,цвет:Л.цвет('соль',.1),этикетка:['NaCl','10 %'],полоса:'#3a9a5a'}) +
      Л.склянка(200,y0+14,40,72,{уровень:.62,цвет:Л.цвет('соль',.2),этикетка:['NaCl','20 %'],полоса:'#c8402a'}) + Л.цилиндр(270,y0+14,20,110,{мл:45});
    const поверх = Л.мениск(216,58,34,45,{глаз:true});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>ω = m(в-ва) : m(р-ра) · 100 %</b>.<br>• <b>m(в-ва) = ω · m(р-ра)</b>; <b>m(воды) = m(р-ра) − m(в-ва)</b>.<br>• Воду отмеряют цилиндром: <b>1 г = 1 мл</b>; читают по нижнему краю мениска.<br>• Разбавили — ω ↓; досыпали или упарили — ω ↑; отлили часть — ω та же.<br>• На склянке пишут вещество, ω, массу и дату.</div>') +
      ПРАВИЛО('<b>Делим всегда на массу всего раствора, а не воды.</b>');
  }

  /* 7. Проверка: марафон */
  function F7(s){
    const Н=210, y0=162, Л=L_(), м7=s.мар7||{}, n=Math.min(м7.n||0,МАРАФОН.length), ош=Math.min(м7.ош||0,3), отв=s.отв7, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.склянка(214+i*44,y0+14,32,58,{уровень:.6,цвет:i<3-ош?Л.цвет('купорос',.1):'hsla(0,0%,60%,.2)'})).join('') + Л.стакан(84,y0+14,64,74,{уровень:.1+0.6*n/10,объём:250,цвет:Л.цвет('соль',.1)});
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(84,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(258,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Массовую долю ты считаешь и готовишь растворы как лаборант.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r40заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r40мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. ω = m(в-ва) : m(р-ра); m(в-ва) = ω · m(р-ра).')) : '')) +
      (все ? ПРАВИЛО('<b>ω = m(в-ва) : m(р-ра) · 100 %</b>') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'10 г соли в 100 г раствора. Массовая доля?', варианты:[{т:'10 %',ок:true},{т:'11 %',ок:false}], разбор:'10 : 100 = 10 %.' },
    { вопрос:'Сколько соли в 50 г 10 %-ного раствора?', варианты:[{т:'10 г',ок:false},{т:'5 г',ок:true}], разбор:'0,1 · 50 = 5 г.' },
    { вопрос:'Сколько воды в 50 г 10 %-ного раствора?', варианты:[{т:'45 г',ок:true},{т:'50 г',ок:false}], разбор:'50 − 5 = 45 г.' },
    { вопрос:'Объём по цилиндру читают по…', варианты:[{т:'верхнему краю мениска',ок:false},{т:'нижнему краю мениска',ок:true}], разбор:'Глаз на уровне нижнего края мениска.' },
    { вопрос:'Раствор разбавили водой. ω…', варианты:[{т:'уменьшилась',ок:true},{т:'не изменилась',ок:false}], разбор:'Соли столько же, раствора больше.' }
  ];
  function F8(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r40Reset()")}</div>` +
        ПРАВИЛО('<b>ω = m(в-ва) : m(р-ра) · 100 %</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r40Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const Т = {
    т1:{ имя:'Массовая доля', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=140, отв=ст.ответ!=null, ч=Л.весыВерх(y0+14,110);
        const пр=Л.весы(80,y0+14,110,{показ:з.M.toFixed(1)})+Л.стакан(80,ч,48,50,{уровень:.55,объём:100,цвет:Л.цвет('соль',з.m/з.M)});
        return свгЛ(сцена(Н,y0,пр,метка(80,12,з.m+' г соли в '+з.M+' г',ЗЛ,{кегль:11})+(отв?состав(262,80,з.m,з.M):'')+(ст.серия>=3?метка(262,14,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Сколько воды', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=140, отв=ст.ответ!=null;
        const пр=Л.цилиндр(90,y0+14,24,124,{мл:отв?Math.min(100,(з.M-з.m)*100/Math.max(100,з.M)):0})+Л.склянка(200,y0+14,44,78,{уровень:отв?.6:0,цвет:Л.цвет('соль',з.w/100),этикетка:['NaCl',з.w+' %',з.M+' г']});
        return свгЛ(сцена(Н,y0,пр,(ст.серия>=3?метка(290,14,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')+(отв?метка(90,12,'воды '+чис0(з.M-з.m)+' г',СН,{кегль:11}):'')),Н); } },
    т3:{ имя:'Что станет с долей', пул:П3, класс:'три',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=140, отв=ст.ответ!=null;
        const пр = з.вид==='пар'?Л.выпаривание(150,y0+14,0.95,true,.5) : з.вид==='соль'?Л.стакан(130,y0+14,60,74,{уровень:.5,объём:250,крупинки:10,вид:'соль',цвет:Л.цвет('соль',.1)})+Л.шпатель(210,y0+18,40,-10,{горка:'соль'})
          : з.вид==='вода'?Л.стакан(120,y0+14,60,74,{уровень:.5,объём:250,цвет:Л.цвет('соль',.1)})+Л.цилиндр(220,y0+14,20,110,{мл:50}) : Л.стакан(110,y0+14,56,70,{уровень:.5,объём:250,цвет:Л.цвет('соль',.1)})+Л.стакан(220,y0+14,56,70,{уровень:.25,объём:250,цвет:Л.цвет('соль',.1)});
        return свгЛ(сцена(Н,y0,пр,метка(168,12,з.ф,ЗЛ,{кегль:11})+(ст.серия>=3?метка(290,44,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие задачи.':'В новом круге задачи другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r40Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px;font-family:Georgia,serif">'+в+'</span>', "r40T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r40TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L40 = {
    id: ID, title: 'Массовая доля раствора', ico: '🥤',
    src: 'Химия · 5–6 класс · Растворы', subj: 'chem',
    explain: [
      'Карточка практической работы: цель, принцип, оборудование, ход, безопасность.',
      'Микромир: что происходит при растворении.',
      'Расчёт перед опытом: соль и вода.',
      'Практическая работа: 50 г раствора с ω = 10 %.',
      'Опыт 2: меняем массовую долю — предскажи и проверь.',
      'Наблюдения и вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: массовая доля.',
      'Тренажёр 2: сколько воды.',
      'Тренажёр 3: что станет с долей.'
    ],
    check: { q: 'В 100 г раствора 10 г соли. Массовая доля соли? (в %)', choices: ['1','10','90','100'], ans: 1, exp: 'ω = 10 : 100 · 100% = 10%.' },
    tasks: [
      { q: 'В 200 г раствора 20 г сахара. Массовая доля? (в %)', kind: 'unit', ans: 10, tol: 0, hints: ['20 : 200 · 100%.', '0,1 · 100 = 10.'], sol: 'ω = 20:200·100% = 10%.' },
      { q: 'Сколько соли в 50 г 10%-го раствора? (в г)', kind: 'unit', ans: 5, tol: 0, hints: ['m = ω · m(раствора).', '0,1 · 50 = 5.'], sol: 'm = 0,1 · 50 = 5 г.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.склянка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L40.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8];
    const сцена0 = f<=8 ? Ф[f-1](s) : тренажёр(s,'т'+(f-8),f-8);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Микромир',3:'Расчёт',4:'Готовим раствор',5:'Меняем долю',6:'Вывод',7:'Проверка',8:'Практика',
      9:'Тренажёр 1',10:'Тренажёр 2',11:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l40n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Массовая доля'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r40Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r40вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r40мех=()=>{ const s=S(); s.мех2=true; chRender(0); };
  window.r40расч=(j)=>{ const s=S(); const n=s.расч||0; if(n>=3) return; const з=РАСЧЁТ[n];
    if(j===з.в){ s.расч=n+1; s.отз3={ок:true,т:з.р}; } else s.отз3={ок:false,j:j,т:з.ош}; chRender(0); };
  const окр = (v) => Math.round(v*10)/10;
  window.r40пр=(что)=>{ const s=S(); const ш=s.пр||0; if(ш>=ШАГИ.length||(s.расч||0)<3) return; const нужно=ШАГИ[ш].что;
    const вперёд=(т)=>{ s.пр=ш+1; s.прОтз={ок:true,т:т}; if(s.пр>=ШАГИ.length){ s.дело_практикум=true; s.прОтз={ок:true,т:'Работа выполнена: 50 г раствора NaCl с массовой долей 10 % разлиты в склянку и подписаны.'}; } chRender(0); };
    if(нужно==='налить'&&(что==='налить'||что==='цилиндр')){ s.прмл=40; что='налить'; }
    if(нужно==='влить'&&что==='цилиндр') что='влить';
    if(что===нужно&&!['насыпать','пипетка','мениск'].includes(нужно)){
      return вперёд({весы:'Весы на столе.',ON:'Весы включены: 0.0 г.',лодочка:'Лодочка на чаше: весы показывают её массу 2,1 г.',TARE:'TARE: масса лодочки вычтена, снова 0.0 г.',
        стакан:'Соль пересыпана в стакан. Лодочка пуста — ни крупинки не потеряно.',налить:'В цилиндре 40 мл: до метки осталось немного — дальше только пипеткой.',
        влить:'Вода влита в стакан. Соль пока лежит на дне.',палочка:'Кристаллы растворились: раствор прозрачный и однородный.',склянка:'Этикетка: NaCl, ω = 10 %, 50 г, дата.'}[нужно]||''); }
    if(нужно==='насыпать'){
      if(/^\+/.test(что)){ const d=+что.slice(1); s.прм=Math.max(0,окр((s.прм||0)+d));
        if(s.прм===5) return вперёд('Ровно 5,0 г соли.');
        s.прОтз = s.прм>5 ? {ок:false,т:'Перебор: '+чис(s.прм)+' г. Отсыпь лишнее шпателем (−0,5 г) — не в банку, а в отходы.'} : null; chRender(0); return; }
      if(что==='шпатель'||что==='соль'){ s.прОтз={ок:false,т:'Шпатель уже в руке — насыпай кнопками +1 / +0,5 / +0,1 г.'}; chRender(0); return; } }
    if(нужно==='пипетка'){
      if(что==='пипетка'){ s.прПип=true; s.прОтз={ок:true,т:'Пипетка в руке: капай по 1 мл, следи за мениском.'}; chRender(0); return; }
      if(s.прПип&&(что==='+мл'||что==='-мл')){ s.прмл=Math.max(30,Math.min(60,(s.прмл||40)+(что==='+мл'?1:-1)));
        if(s.прмл===45) return вперёд('Ровно 45 мл — нижний край мениска на метке.');
        s.прОтз = s.прмл>45 ? {ок:false,т:'Перелил: '+s.прмл+' мл. Отбери пипеткой лишнее (−1 мл).'} : null; chRender(0); return; } }
    if(нужно==='мениск'&&/^взгляд\d$/.test(что)){ const j=+что.slice(6); s.прВзгляд=j;
      if(j===0) return вперёд('Верно: глаз на уровне мениска, отсчёт по нижнему краю — ровно 45 мл.');
      s.прОтз={ок:false,т:j===1?'Сверху уровень кажется ниже, чем на самом деле — ошибка параллакса. Глаз должен быть на уровне мениска.':'Снизу уровень кажется выше. Глаз — ровно на уровне нижнего края мениска.'}; chRender(0); return; }
    if(что===нужно) return;
    s.прОтз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Отложи '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ[ш].т}; chRender(0); };
  window.r40прСброс=()=>{ const s=S(); s.пр=0; s.прм=0; s.прмл=0; s.прПип=false; s.прВзгляд=null; s.прОтз=null; chRender(0); };
  window.r40сл=(i)=>{ const s=S(); s.сл5=i; s.отз5=null; chRender(0); };
  window.r40пред=(j)=>{ const s=S(); const i=s.сл5; if(i==null) return; const С=СЛУЧАИ[i];
    if(j===С.в){ const с=Object.assign({},s.сдел5||{}); с[i]=true; s.сдел5=с; s.отз5={ок:true,т:С.р}; if(СЛУЧАИ.every((x,k)=>с[k])) s.дело_концентрация=true; }
    else s.отз5={ок:false,j:j,т:'Проверь: сколько стало соли и сколько всего раствора? ω = соль : раствор.'};
    chRender(0); };
  window.r40мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар7||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв7={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв7={i:м.n,ок:false,j:j}; }
    s.мар7=м; chRender(0); };
  window.r40заново=()=>{ const s=S(); s.мар7={n:0,ош:0}; s.отв7=null; chRender(0); };
  window.r40Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r40Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r40T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r40TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r40Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L40,{__планПорядок:arr[м].__планПорядок}); else arr.push(L40); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU40={render:render, L:L40};
})();
