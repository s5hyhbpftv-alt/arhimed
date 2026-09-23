/* ============ МАТЕМАТИКА · 6 КЛАСС · 647 · «ОТРИЦАТЕЛЬНЫЕ ЧИСЛА: СРАВНЕНИЕ, МОДУЛЬ, КООРДИНАТНАЯ ПРЯМАЯ» ============

   Зачем этот лист. В программе Петерсона для 6 класса тема «отрицательные
   числа: сравнение, модуль, координатная прямая» — обязательный раздел, и он
   стоит рядом с уже сделанными 193 (проценты), 194 (части и отношения),
   195 (длина окружности), 196 (площадь круга), 197 (углы), 198 (параллельные),
   199 (уравнения с переносом). В приложении такого урока не было: поиск по
   MVP/data и MVP/js по словам «отрицательн», «модуль», «противоположн»
   находит только справочную строчку 376 (модуль 24 — про часы) и черновики
   407–408 про модуль для 7 класса. Полноценного урока про отрицательные числа
   в полке «Математика» не было — этот лист его закрывает.

   Номер 647 проверен дважды: grep по MVP/data и MVP/js не находит ни одного
   листа с таким номером, а замер по window.ARH_LESSONS в живом приложении
   показывает, что заняты 601–646 (601–620 русский, 621–642 Мишутка, 643–646
   Мастерские Сиракуз), а 647 свободен. Запись регистрируется ЗАМЕНОЙ по id,
   а если её ещё нет — добавлением в конец (см. конец файла).

   Устройство урока — как у 193–199: движок приложения сам рисует кадр
   объяснения, вопрос «проверь себя» и карточку задачи, а этот файл даёт
   объект урока (title, src, explain, check, tasks) и свой отрисовщик
   window.VISKW[647] с состоянием в CHS[l647] — ровно как visW193..visW199
   в MVP/data/vis_wk.js. Свой CSS носит префикс otk- и id otk647css, свои
   глобальные функции — префикс visW647, в чужие файлы не влезаем.
   group НЕ ставим: это школьная линия, полка «Математика», subj:'math',
   src говорит «6 класс».

   Содержание (12 кадров = 8 заданий темы + 4 итоговых):
     1  что такое отрицательное число: долг, мороз, глубина, отметка ниже нуля
     2  координатная прямая: начало отсчёта, единичный отрезок, знак точки
     3  чем левее — тем меньше: −7 и −2
     4  как сравнить два числа по шагам (нумерованный алгоритм)
     5  второй способ — через модуль: у кого модуль больше, тот левее
     6  модуль — это расстояние от нуля: |−5| и |5|
     7  противоположные числа: одинаковый модуль, разные знаки
     8  расстояние между точками прямой и порядок по возрастанию
     9  частая ошибка, «как проверить себя», «почему это так»
     10 тренажёр: расположи числа на прямой
     11 шпаргалка: весь ход в пяти строках
     12 проверь себя (устно) — перед тестом движка
   Дальше движок ведёт «проверь себя» (3 варианта) и две задачи:
     • |−12| (unit, ответ 12)   • наименьшее из −9, −3, 0, 4 (choice, ответ −9)
   Тренажёры внутри кадров 5, 11 и 12 проверяются сами и считают счёт
   «верно · ошибок · всего» в состоянии кадра.

   Разборы — полный ход, а не «неверно»: в каждом кадре нумерованные шаги,
   таблица или координатная прямая с пошаговой отметкой точек, в кадре 9 —
   «частая ошибка», «как проверить себя», «второй способ (модуль)» и
   «почему это так» (почему левее значит меньше).

   Палитра проекта: фон #0b1712, золото #d9a441, текст #e8e0cc,
   приглушённое #cbb89a, зелёный #8fd1a8, красный #e86a5a.
   Контраст к фону #0b1712: #e8e0cc — 13,9 : 1, #d9a441 — 8,2 : 1,
   #cbb89a — 9,5 : 1, #8fd1a8 — 8,9 : 1, #e86a5a — 5,6 : 1 (все выше 4,5 : 1).

   Кегли внутри SVG — только по шкале проекта: 12 · 14 · 16 · 20 · 24.
   Холст 340 единиц: на телефоне 390 px рисунок ложится в 338–362 px, то есть
   масштаб ≈ 1,0–1,06, и 14 единиц читаются как 14–15 px, 16 — как 16–17 px.
   Эмодзи внутри SVG нет: стрелки, дуги, деления, столбики и термометр
   нарисованы линиями, путями, прямоугольниками и кругами.
   Анимация — только смысловая (точка появляется, дуга прочерчивается), и
   только на фигурах, не на тексте; prefers-reduced-motion её выключает.
*/
(function(){
  'use strict';

  /* ---------- палитра проекта ---------- */
  const BG='#0b1712', GOLD='#d9a441', IVORY='#e8e0cc', MUTE='#cbb89a',
        GREEN='#8fd1a8', RED='#e86a5a', CYAN='#7fd1ff';
  const LINE='rgba(217,164,65,.62)', HAIR='rgba(217,164,65,.22)',
        CARD='rgba(16,31,24,.72)', CARD_B='#3d5c49';
  const F="Georgia,'Times New Roman',serif";

  /* Ширина строки. Оценка «по числу знаков» здесь не годится: замер в браузере
     показал, что кириллица в Georgia шире латиницы (327 единиц против
     предсказанных 226 на одну и ту же фразу). Поэтому меряем НАСТОЯЩИМ
     измерителем: canvas.measureText с тем же семейством и кеглем даёт ту же
     ширину, что и SVG getComputedTextLength. Функция держит кеш и, если
     canvas недоступен, откатывается на грубую оценку. */
  let ИЗМ=null;
  function измеритель(){
    if(ИЗМ!==null) return ИЗМ;
    try{
      const c=document.createElement('canvas');
      const ctx=c.getContext('2d');
      ИЗМ=ctx?(ш,size,жир)=>{ ctx.font=(жир?'bold ':'')+size+'px '+F; return ctx.measureText(String(ш)).width; }:false;
    }catch(e){ ИЗМ=false; }
    return ИЗМ;
  }
  /* жирная строка шире обычной: мерить её обычной — значит вылезти из плашки */
  const шир=(ш,size,жир)=>{ const m=измеритель(); return m?m(ш,size,жир):String(ш).length*size*(жир?0.9:0.83); };
  /* подобрать наибольший кегль из шкалы, при котором строка влезает в w */
  const под=(ш,w,size,жир)=>{ size=size||16; for(const s2 of [size,14,12]) if(шир(ш,s2,жир)<=w) return s2; return 12; };
  /* txw — одна строка с подбором кегля под ширину w */
  const txw=(x,y,ш,w,size,fill,anchor,жир)=>tx(x,y,ш,под(ш,w,size,жир),fill,anchor,жир);
  /* txl — абзац: переносим по словам, подбирая кегль под ширину w.
     Нужен там, где фраза длиннее холста: вместо обрезки — вторая строка. */
  function txl(x,y,ш,w,size,fill,жир){
    const тек=String(ш);
    const кегль=под(тек,w,size,жир);
    if(шир(тек,кегль,жир)<=w) return tx(x,y,тек,кегль,fill,'middle',жир);
    const слова=тек.split(' ');
    const строки=[]; let текущая='';
    for(const с of слова){
      const проба=текущая?текущая+' '+с:с;
      if(шир(проба,кегль,жир)<=w||!текущая) текущая=проба;
      else { строки.push(текущая); текущая=с; }
    }
    if(текущая) строки.push(текущая);
    const шаг=Math.round(кегль*1.3);
    return строки.map((стр,i)=>tx(x,y+i*шаг,стр,кегль,fill,'middle',жир)).join('');
  }

  /* ---------- свой CSS: только классы otk- ---------- */
  (function(){
    if(window.__otk647css) return; window.__otk647css=1;
    const st=document.createElement('style');
    st.id='otk647css';
    st.textContent=
      '#lvis .otk-frame{background:linear-gradient(180deg,rgba(21,44,33,.94),rgba(11,23,18,.97));'
      +'border:1px solid '+CARD_B+';border-radius:20px;padding:12px 12px 14px;max-width:352px;'
      +'margin:0 auto;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,.35);}'
      +'#lvis .otk-col{display:flex;flex-direction:column;gap:8px;align-items:center;}'
      +'#lvis .otk-big{font-size:20px;color:'+GOLD+';font-family:'+F+';line-height:1.2;text-align:center;padding:0 4px;}'
      +'#lvis .otk-sml{color:'+IVORY+';font-size:16px;line-height:1.5;max-width:310px;text-align:center;margin:0 auto;}'
      +'#lvis .otk-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;align-items:stretch;width:100%;}'
      +'#lvis .otk-btn{min-height:46px;min-width:88px;padding:11px 16px;font-size:16px;border-radius:12px;'
      +'border:1px solid '+CARD_B+';background:rgba(255,255,255,.07);color:'+IVORY+';cursor:pointer;'
      +'font-family:'+F+';font-weight:bold;transition:transform .12s ease,border-color .18s ease,background .18s ease;}'
      +'#lvis .otk-btn:active{transform:translateY(2px);}'
      +'#lvis .otk-btn:focus-visible{outline:2px solid rgba(217,164,65,.75);outline-offset:2px;}'
      +'#lvis .otk-hero{width:100%;}'
      +'#lvis .otk-note{font-size:16px;line-height:1.5;color:'+IVORY+';text-align:left;max-width:322px;'
      +'background:'+CARD+';border:1px solid '+HAIR+';border-left:3px solid '+GOLD+';border-radius:10px;padding:9px 11px;}'
      +'#lvis .otk-in{animation:otkIn .34s cubic-bezier(.22,.9,.24,1) both;}'
      +'@keyframes otkIn{0%{transform:translateY(8px);opacity:0}100%{transform:none;opacity:1}}'
      +'#lvis .otk-draw{animation:otkDraw .9s cubic-bezier(.22,.9,.24,1) both;}'
      +'@keyframes otkDraw{0%{stroke-dashoffset:340}100%{stroke-dashoffset:0}}'
      +'#lvis .otk-pop{animation:otkPop .42s cubic-bezier(.22,.9,.24,1) both;transform-box:fill-box;transform-origin:center;}'
      +'@keyframes otkPop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}'
      +'@media (prefers-reduced-motion: reduce){#lvis .otk-in,#lvis .otk-draw,#lvis .otk-pop{animation:none !important;}}';
    document.head.appendChild(st);
  })();

  /* ---------- холст и помощники рисунка ----------
     Холст 320 единиц. На телефоне 390 px карточка кадра даёт рисунку 322 px,
     то есть масштаб 1,006: 16 единиц кегля читаются как 16 px, 12 единиц —
     как 12 px. Ни одна подпись не выходит за холст и не наезжает на соседнюю:
     координаты подобраны так, чтобы даже самая длинная строка (14 единиц)
     укладывалась в 285 px из 292 доступных. */
  const W=320;
  const sv=(h,inner)=>`<svg viewBox="0 0 ${W} ${h}" width="100%" style="display:block;max-width:100%;font-variant-numeric:tabular-nums" role="img">${inner}</svg>`;
  const tx=(x,y,s,size,fill,anchor,w)=>`<text x="${x}" y="${y}" text-anchor="${anchor||'middle'}" font-family="${F}" font-size="${size||16}" fill="${fill||IVORY}"${w?' font-weight="bold"':''}>${s}</text>`;
  const rc=(x,y,w,h,fill,stroke,rx,sw)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?6:rx}" fill="${fill||'none'}"${stroke?` stroke="${stroke}" stroke-width="${sw||1.2}"`:''}/>`;
  const ln=(x1,y1,x2,y2,stroke,sw,dash)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw||1.4}"${dash?` stroke-dasharray="${dash}"`:''}/>`;
  /* дуга «расстояние» между двумя пиксельными координатами A и B */
  const arc=(A,B,y,stroke,sw)=>`<path d="M ${A} ${y} A ${(Math.abs(B-A)/2).toFixed(1)} ${(Math.abs(B-A)/2).toFixed(1)} 0 0 1 ${B} ${y}" fill="none" stroke="${stroke}" stroke-width="${sw||2}" stroke-linecap="round"/>`;
  const dot=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r||4.5}" fill="${fill||GOLD}" stroke="${BG}" stroke-width="1.4"/>`;

  /* ---------- координатная прямая ----------
     Раскладка одного чертежа (сверху вниз), чтобы ничего не пересекалось:
        y−26 … y−10   подписи точек (16 единиц)
        y−6  … y+6    деления
        y+20 … y+32   числа под делениями (12 единиц)
        y+34 … y+58   дуги расстояний
        y+56 … y+70   подписи расстояний (14 единиц)
     Подписи точек стоят НАД прямой, числа и дуги — ПОД ней. */
  function line(o){
    o=o||{};
    const lo=o.lo==null?-8:o.lo, hi=o.hi==null?8:o.hi;
    const x0=22, x1=298, y=(o.y==null?64:o.y);
    const P=v=>x0+(v-lo)/(hi-lo)*(x1-x0);
    let s='';
    for(let v=lo;v<=hi;v++){
      const x=P(v), zero=(v===0);
      s+=ln(x,y-6,x,y+6,zero?GOLD:LINE,zero?2:1.2);
      s+=tx(x,y+29,String(v).replace('-','\u2212'),12,zero?GOLD:MUTE,undefined,zero);
    }
    s+=`<path d="M ${x1} ${y} l -9 -4.5 v 9 z" fill="${LINE}"/>`;
    s+=ln(x0-4,y,x1,y,LINE,2);
    if(o.edges!==false){
      s+=tx(x0+2,y+44,o.left||'меньше',14,RED,'start',1);
      s+=tx(x1-2,y+44,o.right||'больше',14,GREEN,'end',1);
    }
    return {s:s,P:P,y:y,lo:lo,hi:hi};
  }
  /* точка: связка, кружок и подпись над прямой */
  function pt(L,v,label,color){
    const x=L.P(v), ly=L.y-26;
    return ln(x,L.y-6,x,ly+5,color||GOLD,1.2)
      +dot(x,L.y,4.5,color||GOLD)
      +tx(x,ly,String(label!=null?label:v).replace('-','\u2212'),16,color||GOLD,undefined,1);
  }
  /* дуга расстояния между координатами a и b с подписью по центру */
  function darc(L,a,b,label,color){
    const A=L.P(a), B=L.P(b), mid=(A+B)/2, y=L.y+34;
    return arc(A,B,y,color||GOLD,2)
      +tx(mid,y+22,label,14,color||GOLD,undefined,1);
  }
  const bg=(h,inner)=>sv(h,
    rc(0,0,W,h,BG,'',0,0)
    +rc(3,3,W-6,h-6,'none',HAIR,10,1.2)
    +inner);

  /* ---------- кадры ---------- */

  /* 1 · что такое отрицательное число: таблица примеров */
  function f1(){
    let inner=txw(160,24,'величина ушла вниз от нуля',284,20,GOLD,undefined,1);
    const rows=[
      ['долг 300 рублей','\u2212300',RED,'меньше нуля'],
      ['мороз 15 градусов','\u221215',CYAN,'ниже нуля на 15'],
      ['глубина 40 метров','\u221240',GREEN,'ниже уровня воды'],
      ['высота 40 метров','+40',GOLD,'выше уровня воды']
    ];
    rows.forEach((r,i)=>{
      const y=34+i*42;
      inner+=rc(12,y,296,36,'rgba(255,255,255,.04)',CARD_B,9,1.2);
      inner+=tx(22,y+23,r[0],14,IVORY,'start');
      inner+=tx(296,y+24,r[1],20,r[2],'end',1);
    });
    inner+=rc(12,208,296,34,'rgba(217,164,65,.10)',GOLD,10,1.4);
    inner+=txw(160,230,'знак \u2212 показывает: величина ниже нуля',270,14,GOLD,undefined,1);
    /* подпись назначения каждого числа — отдельной строкой ниже, без наложений */
    inner+=txw(160,258,'долг и мороз, глубина \u2014 всё это отрицательные числа',286,12,MUTE);
    return bg(274,inner);
  }

  /* 2 · координатная прямая */
  function f2(st){
    const go=st.go||0;
    const L=line({lo:-8,hi:8,y:84,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'координатная прямая',290,20,GOLD,undefined,1);
    inner+=txw(160,42,'начало отсчёта 0, единичный отрезок',290,14,IVORY);
    const pts=[[0,'O',GOLD],[-5,'A',CYAN],[3,'B',GREEN]];
    pts.forEach((p,i)=>{
      if(go>=i+1){
        inner+=`<g class="otk-pop" style="animation-delay:${(0.1*i).toFixed(2)}s">${pt(L,p[0],p[1],p[2])}</g>`;
      }
    });
    inner+=rc(12,148,296,30,CARD,HAIR,10,1.2);
    inner+=txw(160,168,go>=3?'A(\u22125), O(0), B(3) \u2014 так записывают координаты':'нажимай кнопку \u2014 точки встают по шагам',284,14,go>=3?GOLD:MUTE,undefined,1);
    inner+=rc(12,186,296,56,'rgba(143,209,168,.08)',GREEN,10,1.2);
    inner+=tx(160,207,'слева от нуля \u2014 отрицательные числа,',14,IVORY);
    inner+=tx(160,227,'справа от нуля \u2014 положительные',14,IVORY);
    return bg(252,inner);
  }

  /* 3 · чем левее — тем меньше */
  function f3(st){
    const go=st.go||0;
    const L=line({lo:-8,hi:8,y:84,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'\u22127 и \u22122: кто меньше?',290,20,GOLD,undefined,1);
        inner+=`<g class="otk-pop">${pt(L,-7,'\u22127',RED)}</g>`;
    inner+=`<g class="otk-pop" style="animation-delay:.12s">${pt(L,-2,'\u22122',GREEN)}</g>`;
    if(go>=1){
      inner+=ln(L.P(-7),L.y+48,L.P(-2),L.y+48,GOLD,2);
      inner+=`<path d="M ${L.P(-2)} ${L.y+48} l -10 -5 v 10 z" fill="${GOLD}"/>`;
      inner+=tx((L.P(-7)+L.P(-2))/2,L.y+66,'направо \u2014 числа растут',12,GOLD,undefined,1);
      inner+=rc(12,168,296,32,'rgba(143,209,168,.12)',GREEN,10,1.4);
      inner+=tx(160,189,'\u22127 левее, значит \u22127 < \u22122',16,GREEN,undefined,1);
    } else {
      inner+=rc(12,168,296,32,CARD,HAIR,10,1.2);
      inner+=txw(160,189,'посмотри: какая точка стоит левее?',286,14,MUTE);
    }
    inner+=rc(12,206,296,44,'rgba(217,164,65,.08)',GOLD,10,1.2);
    inner+=tx(160,226,'у отрицательных чисел всё наоборот:',14,IVORY);
    inner+=tx(160,246,'7 > 2, но \u22127 < \u22122',14,GOLD,undefined,1);
    return bg(262,inner);
  }

  /* 4 · алгоритм сравнения по шагам */
  function f4(st){
    const go=st.go||0;
    const steps=[
      'Отмечаем оба числа на прямой.',
      'Ищем, какое из них стоит ЛЕВЕЕ.',
      'То, что левее, и есть меньшее.',
      'Записываем знак: \u22127 < \u22122.'
    ];
    let inner=txw(160,26,'как сравнить два числа',290,20,GOLD,undefined,1);
    steps.forEach((s,i)=>{
      const y=40+i*38, on=go>i;
      inner+=rc(12,y,296,32,on?'rgba(217,164,65,.10)':CARD,on?GOLD:CARD_B,8,on?1.5:1.2);
      inner+=tx(30,y+21,String(i+1),16,on?GOLD:MUTE,undefined,1);
      inner+=tx(48,y+21,s,14,on?IVORY:MUTE,'start');
    });
    if(go>=4){
      inner+=rc(12,196,296,34,'rgba(143,209,168,.12)',GREEN,10,1.4);
      inner+=txw(160,218,'\u22127 < \u22122: левее \u2014 значит меньше',286,14,GREEN,undefined,1);
    } else {
      inner+=txw(160,218,'нажимай «шаг» \u2014 правило собирается по частям',300,14,MUTE);
    }
    return bg(240,inner);
  }

  /* 5 · правило без прямой: сравниваем модули */
  function f5(st){
    const go=st.go||0;
    const L=line({lo:-9,hi:9,y:78,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'второй способ \u2014 модуль',290,20,GOLD,undefined,1);
    inner+=pt(L,-7,'\u22127',RED);
    inner+=pt(L,-2,'\u22122',GREEN);
    inner+=rc(12,126,296,32,CARD,HAIR,10,1.2);
    inner+=tx(105,147,'|\u22127| = 7',16,RED,undefined,1);
    inner+=tx(215,147,'|\u22122| = 2',16,GREEN,undefined,1);
    if(go>=1){
      inner+=rc(12,168,296,56,'rgba(232,106,90,.10)',RED,10,1.4);
      inner+=tx(160,190,'у кого модуль БОЛЬШЕ',16,RED,undefined,1);
      inner+=tx(160,212,'тот ЛЕВЕЕ и потому МЕНЬШЕ',16,RED,undefined,1);
    } else {
      inner+=rc(12,168,296,56,CARD,HAIR,10,1.2);
      inner+=tx(160,190,'оба числа отрицательные:',14,IVORY);
      inner+=tx(160,210,'сравниваем расстояния от нуля',14,IVORY);
    }
    inner+=txw(160,248,'7 > 2, поэтому \u22127 < \u22122',286,16,GOLD,undefined,1);
    return bg(264,inner);
  }

  /* 6 · модуль — расстояние от нуля */
  function f6(st){
    const go=st.go||0;
    const L=line({lo:-6,hi:6,y:78,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'модуль \u2014 это расстояние от нуля',290,20,GOLD,undefined,1);
    inner+=pt(L,-5,'\u22125',CYAN);
    inner+=pt(L,5,'+5',CYAN);
    inner+=`<g class="otk-draw" style="stroke-dasharray:340">${darc(L,-5,0,'5',GOLD)}</g>`;
    inner+=`<g class="otk-draw" style="stroke-dasharray:340;animation-delay:.15s">${darc(L,0,5,'5',GOLD)}</g>`;
    inner+=rc(12,146,296,36,CARD,HAIR,10,1.2);
    inner+=tx(160,170,'|\u22125| = 5     и     |5| = 5',20,GOLD,undefined,1);
    if(go>=1){
      inner+=rc(12,190,296,52,'rgba(143,209,168,.10)',GREEN,10,1.4);
      inner+=tx(160,212,'модуль \u2014 расстояние, оно неотрицательно',14,IVORY);
      inner+=tx(160,232,'|0| = 0: ноль стоит на месте',14,GREEN,undefined,1);
    } else {
      inner+=txw(160,214,'нажми «показать» \u2014 увидишь оба расстояния',290,14,MUTE);
    }
    return bg(254,inner);
  }

  /* 7 · противоположные числа */
  function f7(st){
    const go=st.go||0;
    const L=line({lo:-6,hi:6,y:78,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'противоположные числа',290,20,GOLD,undefined,1);
    inner+=pt(L,-3,'\u22123',GREEN);
    inner+=pt(L,3,'+3',GREEN);
    inner+=`<g class="otk-draw" style="stroke-dasharray:340">${darc(L,-3,0,'3',GOLD)}</g>`;
    inner+=`<g class="otk-draw" style="stroke-dasharray:340;animation-delay:.15s">${darc(L,0,3,'3',GOLD)}</g>`;
    inner+=rc(12,146,296,36,CARD,HAIR,10,1.2);
    inner+=tx(160,170,'|\u22123| = |3| = 3',16,GOLD,undefined,1);
    if(go>=1){
      inner+=rc(12,190,296,52,'rgba(143,209,168,.10)',GREEN,10,1.4);
      inner+=tx(160,212,'одинаковое расстояние от нуля,',14,IVORY);
      inner+=tx(160,232,'но по разные стороны: \u22123 \u2194 3',14,GREEN,undefined,1);
    } else {
      inner+=txw(160,214,'нажми «показать» \u2014 увидишь обе дуги',290,14,MUTE);
    }
    inner+=txw(160,258,'\u22125 \u2194 5,  \u22127 \u2194 7 \u2014 модули равны, знаки разные',286,12,MUTE);
    return bg(272,inner);
  }

  /* 8 · расстояние между точками и порядок по возрастанию */
  function f8(st){
    const go=st.go||0;
    const L=line({lo:-10,hi:6,y:80,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'расстояние между точками',290,20,GOLD,undefined,1);
    if(go<1){
      inner+=pt(L,-6,'A',CYAN);
      inner+=pt(L,-1,'B',CYAN);
      inner+=`<g class="otk-draw" style="stroke-dasharray:340">${darc(L,-6,-1,'5',GOLD)}</g>`;
      inner+=rc(12,164,296,34,CARD,HAIR,10,1.2);
      inner+=tx(160,186,'AB = |\u22121 \u2212 (\u22126)| = |5| = 5',16,GOLD,undefined,1);
      inner+=rc(12,206,296,48,'rgba(217,164,65,.08)',GOLD,10,1.2);
      inner+=tx(160,226,'из большего вычитаем меньшее,',14,IVORY);
      inner+=tx(160,246,'поэтому расстояние неотрицательно',14,IVORY);
      return bg(264,inner);
    }
    const vals=[[-9,'\u22129',RED],[-3,'\u22123',GOLD],[0,'0',GOLD],[4,'+4',GOLD]];
    const ys=[162,136,110,84];
    inner+=tx(160,44,'по возрастанию \u2014 слева направо',14,IVORY);
    vals.forEach((v,i)=>{
      if(go>=i+1){
        inner+=`<g class="otk-pop" style="animation-delay:${(0.1*i).toFixed(2)}s">`;
        inner+=tx(L.P(v[0]),ys[i],v[1],16,v[2],undefined,1);
        inner+=ln(L.P(v[0]),ys[i]+6,L.P(v[0]),L.y-6,v[2]===RED?RED:CYAN,1.2);
        inner+=`</g>`;
      }
    });
    if(go>=4){
      inner+=rc(12,176,296,34,'rgba(143,209,168,.12)',GREEN,10,1.4);
      inner+=tx(160,198,'\u22129 < \u22123 < 0 < +4',16,GREEN,undefined,1);
    } else {
      inner+=txw(160,198,'нажимай «шаг» \u2014 числа встают по порядку',296,14,MUTE);
    }
    inner+=txw(160,232,'сначала самое левое число, в конце самое правое',290,14,IVORY);
    return bg(248,inner);
  }

  /* 9 · частая ошибка, проверка себя, второй способ, почему это так */
  function f9(){
    const L=line({lo:-8,hi:4,y:236,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'частая ошибка',290,20,GOLD,undefined,1);
    inner+=rc(12,40,296,44,'rgba(232,106,90,.12)',RED,10,1.4);
    inner+=tx(22,62,'1. «7 больше 2, значит \u22127 больше \u22122»',14,RED,'start');
    inner+=tx(22,78,'так думать нельзя: минус меняет смысл',14,IVORY,'start');
    inner+=rc(12,92,296,44,'rgba(143,209,168,.12)',GREEN,10,1.4);
    inner+=tx(22,114,'2. верно: \u22127 < \u22122, потому что \u22127 левее',14,GREEN,'start');
    inner+=tx(22,130,'второй способ: |\u22127| = 7 > 2 = |\u22122|',14,IVORY,'start');
    inner+=rc(12,140,296,34,'rgba(217,164,65,.08)',GOLD,10,1.2);
    inner+=tx(160,158,'почему левее значит меньше:',14,GOLD,undefined,1);
    inner+=tx(160,176,'вправо числа растут',14,GOLD,undefined,1);
    inner+=pt(L,-7,'\u22127',RED);
    inner+=pt(L,-2,'\u22122',GREEN);
    inner+=rc(12,304,296,32,'rgba(143,209,168,.10)',GREEN,10,1.2);
    inner+=txw(160,325,'как проверить себя: найди, кто левее',288,14,GREEN,undefined,1);
    inner+=txw(160,347,'второй способ: сравни модули',288,14,IVORY);
    return bg(364,inner);
  }

  /* 5 · тренажёр: сравни −7 и −2 (разбор — полный ход, а не «неверно») */
  function f5t(st){
    const answered=(st.pick!=null);
    const L=line({lo:-8,hi:4,y:104,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'тренажёр: сравни \u22127 и \u22122',290,20,GOLD,undefined,1);
    inner+=rc(12,34,296,30,CARD,HAIR,9,1.2);
    inner+=tx(160,54,'какое из чисел \u22127 и \u22122 меньше?',14,IVORY,undefined,1);
    inner+=pt(L,-7,'\u22127',RED);
    inner+=pt(L,-2,'\u22122',GREEN);
    if(answered){
      const ok=(st.pick===0);
      inner+=rc(12,164,296,68,ok?'rgba(143,209,168,.12)':'rgba(232,106,90,.12)',ok?GREEN:RED,10,1.4);
      inner+=tx(160,186,ok?'верно: \u22127 < \u22122':'полный ход: \u22127 стоит левее \u22122',14,ok?GREEN:RED,undefined,1);
      inner+=tx(160,208,'по модулям: |\u22127| = 7 > |\u22122| = 2',14,IVORY,undefined,1);
      inner+=tx(160,226,'модуль больше \u2014 число левее и меньше',14,GOLD,undefined,1);
    } else {
      inner+=txw(160,196,'нажми ответ \u2014 покажу полный ход',286,14,MUTE);
    }
    inner+=tx(160,254,'верно: '+(st.ok||0)+' \u00b7 ошибок: '+(st.bad||0)+' \u00b7 всего: 3',12,MUTE);
    return bg(268,inner);
  }

  /* 10 · тренажёр: число на прямой (свой счёт верно/ошибок)
     Разбор полный в обоих случаях: и при верном ответе, и при ошибке на
     прямой отмечаются все три числа — видно, кто левее и почему он меньше. */
  function f10(st){
    const q=PUT[(st.tr||0)%PUT.length];
    const L=line({lo:-8,hi:4,y:124,edges:false});
    let inner=L.s;
    inner+=txw(160,24,'тренажёр: прямая и числа',290,20,GOLD,undefined,1);
    inner+=rc(12,32,296,30,CARD,HAIR,9,1.2);
    inner+=txl(160,50,q.t,286,14,IVORY,1);
    if(st.pick!=null){
      const ok=(st.pick===q.a);
      inner+=rc(12,68,296,30,ok?'rgba(143,209,168,.12)':'rgba(232,106,90,.12)',ok?GREEN:RED,9,1.4);
      inner+=tx(160,88,ok?'верно!':'полный ход:',14,ok?GREEN:RED,undefined,1);
      inner+=pt(L,q.hi,String(q.hi).replace('-','\u2212'),ok?GREEN:GOLD);
      inner+=pt(L,-2,'\u22122',ok?GREEN:GOLD);
      inner+=pt(L,2,'2',ok?GREEN:GOLD);
    } else {
      inner+=txw(160,88,'выбери число и посмотри, куда оно встанет',286,12,MUTE);
    }
    inner+=txw(160,196,'левее значит меньше',284,14,GOLD,undefined,1);
    inner+=tx(160,226,'верно: '+(st.ok||0)+' \u00b7 ошибок: '+(st.bad||0)+' \u00b7 всего: '+PUT.length,12,MUTE);
    return bg(240,inner);
  }

  /* 11 · шпаргалка */
  function f11(st){
    const go=st.go||0;
    const rows=[
      ['левее \u2014 меньше','\u22127 < \u22122'],
      ['модуль \u2014 расстояние','|\u22125| = 5'],
      ['противоположные','\u22123 и 3'],
      ['расстояние','AB = 5'],
      ['по возрастанию','\u22129 < \u22123 < 0 < 4']
    ];
    let inner=txw(160,26,'шпаргалка: весь ход',290,20,GOLD,undefined,1);
    rows.forEach((r,i)=>{
      const y=40+i*36, on=go>i;
      inner+=rc(12,y,296,30,on?'rgba(217,164,65,.10)':CARD,on?GOLD:CARD_B,8,on?1.4:1.2);
      inner+=tx(22,y+20,r[0],14,on?IVORY:MUTE,'start');
      inner+=tx(298,y+20,r[1],14,on?GOLD:MUTE,'end',1);
    });
    if(go>=5){
      inner+=rc(12,228,296,34,'rgba(143,209,168,.12)',GREEN,10,1.4);
      inner+=txw(160,250,'проверка одна: посмотри на прямую',286,14,GREEN,undefined,1);
    } else {
      inner+=txw(160,250,'нажимай «строка» \u2014 собираем шпаргалку',290,14,MUTE);
    }
    return bg(274,inner);
  }

  /* 12 · проверь себя устно */
  function f12(){
    let inner=txw(160,26,'\u22127 и \u22122 \u2014 что меньше?',290,20,GOLD,undefined,1);
    inner+=rc(12,42,296,40,CARD,HAIR,10,1.2);
    inner+=txw(160,68,'отметь оба числа на прямой и найди левое',286,14,IVORY);
    inner+=rc(12,94,296,50,'rgba(217,164,65,.10)',GOLD,10,1.4);
    inner+=tx(160,114,'|\u22125| = 5   \u00b7   |5| = 5',16,GOLD,undefined,1);
    inner+=tx(160,134,'\u22123 \u2194 3 \u2014 противоположные',12,IVORY);
    inner+=rc(12,156,296,58,'rgba(143,209,168,.08)',GREEN,10,1.2);
    inner+=txw(160,180,'порядок по возрастанию читаем слева направо',286,13,IVORY);
    inner+=tx(160,204,'\u22129 < \u22123 < 0 < +4',16,GREEN,undefined,1);
    return bg(226,inner);
  }

  /* ---------- тренажёрные вопросы внутри кадров ----------
     PUT стоит ДО первого вызова отрисовщика: const в temporal dead zone,
     и обращение к нему из кадра до объявления уронило бы кадр 10. */
  const PUT=[
    {t:'какое число самое левое?',o:['\u22126','\u22122','2'],a:0,hi:-6},
    {t:'какое число стоит между \u22123 и \u22121?',o:['\u22122','\u22124','0'],a:0,hi:-2}
  ];

  /* ---------- объект урока ---------- */
  const L647={
    id:647, title:'Отрицательные числа: сравнение, модуль, координатная прямая', ico:'\u2212',
    src:'Математика \u00b7 6 класс \u00b7 Отрицательные числа', subj:'math',
    explain:[
      /* 1 */ 'Отрицательные числа появились там, где обычных чисел не хватает. Долг 300 рублей, мороз 15 градусов, глубина 40 метров, отметка ниже нуля \u2014 всё это меньше нуля, и записывают это со знаком минус: \u2212300, \u221215, \u221240. Положительные числа пишут со знаком плюс, но плюс обычно не ставят.',
      /* 2 */ 'Возьмём прямую, отметим начало отсчёта \u2014 точку O с координатой 0, выберем единичный отрезок и направление вправо. Справа от нуля положительные числа, слева отрицательные. Такая прямая называется координатной. Точка A(\u22125) стоит на 5 делений влево от нуля, точка B(3) \u2014 на 3 деления вправо.',
      /* 3 */ 'Как сравнить \u22127 и \u22122? Отметим оба числа на координатной прямой: \u22127 стоит левее, \u22122 правее. Мы идём по прямой слева направо, и числа при этом растут. Значит, то число, которое лежит ЛЕВЕЕ, меньше. Поэтому \u22127 < \u22122, хотя 7 и больше 2.',
      /* 4 */ 'Как сравнить два числа по шагам: 1) отметить оба на координатной прямой; 2) найти, какое стоит левее; 3) левее \u2014 значит меньше; 4) записать знак: \u22127 < \u22122. Для положительных чисел правило то же самое: 2 < 7, потому что 2 левее.',
      /* 5 */ 'Второй способ \u2014 через модуль, то есть через расстояние. Если оба числа отрицательные, сравниваем их расстояния от нуля: у кого расстояние БОЛЬШЕ, тот ушёл дальше влево и потому МЕНЬШЕ. |\u22127| = 7, |\u22122| = 2; 7 > 2, значит \u22127 < \u22122. Получается наоборот по сравнению с обычными числами: 7 > 2, а \u22127 < \u22122.',
      /* 6 */ 'Модуль числа \u2014 это расстояние от этого числа до нуля. Расстояние не бывает отрицательным, поэтому модуль никогда не отрицателен. От \u22125 до нуля 5 единиц, и от +5 до нуля тоже 5 единиц, значит |\u22125| = 5 и |5| = 5. Модуль нуля равен нулю: |0| = 0 \u2014 ноль стоит на месте.',
      /* 7 */ 'Противоположные числа \u2014 это числа, которые стоят на одинаковом расстоянии от нуля, но по разные стороны. У них одинаковый модуль и разные знаки: \u22123 и 3, \u22125 и 5, \u22127 и 7. На прямой они симметричны относительно нуля. Противоположное число получается сменой знака.',
      /* 8 */ 'Расстояние между двумя точками прямой считают так: из большего числа вычитаем меньшее. Расстояние между A(\u22126) и B(\u22121): AB = |\u22121 \u2212 (\u22126)| = |5| = 5. А чтобы расставить числа по возрастанию, читаем прямую слева направо: \u22129 < \u22123 < 0 < +4 \u2014 наименьшее число самое левое, наибольшее самое правое.',
      /* 9 · итог 1 */ 'Частая ошибка: думать, что \u22127 больше \u22122, потому что 7 больше 2. Так думать нельзя: знак минус меняет всё. Как проверить себя \u2014 посмотреть на координатную прямую и найти, кто левее. \u22127 левее, поэтому \u22127 < \u22122. А по модулям наоборот: |\u22127| = 7 > 2 = |\u22122|.',
      /* 10 · тренажёр */ 'Тренажёр-прямая: вот \u22126, \u22122 и 2. Куда встанет каждое число? Единичный отрезок одинаковый, поэтому \u22126 уходит на 6 делений влево, \u22122 \u2014 на 2 влево, а 2 \u2014 на 2 вправо. Нажми на верное число и проверь себя по прямой.',
      /* 11 · итог 2 */ 'Почему это так: на координатной прямой направление вправо выбрано как «больше», поэтому движение направо увеличивает число, а налево уменьшает. Отсюда сразу два следствия: левее \u2014 меньше, и у двух отрицательных чисел больше тот, чей модуль меньше. Шпаргалка: левее \u2014 меньше; модуль \u2014 расстояние от нуля; противоположные \u2014 равные модули и разные знаки; расстояние \u2014 большее минус меньшее; по возрастанию \u2014 слева направо.',
      /* 12 · проверь себя устно */ 'Проверь себя устно: \u22127 и \u22122 \u2014 что меньше? Отметь оба числа на прямой, найди левое и назови ответ. Потом проверь расстояние: |\u22125| = 5 и |5| = 5, и вспомни, что \u22123 и 3 \u2014 противоположные. Ответь на вопрос ниже и жми «Понял! Проверю себя».'
    ],
    check:{ q:'Сравни \u22127 и \u22122. Какое число меньше?', choices:['\u22127','\u22122','Они равны'], ans:0,
      exp:'На координатной прямой \u22127 стоит левее \u22122, а левее \u2014 значит меньше. Проверка через модуль: |\u22127| = 7 > 2 = |\u22122|, поэтому \u22127 < \u22122.'},
    tasks:[
      { q:'Чему равен модуль числа \u221212? Введи число.', kind:'unit', ans:12, tol:0,
        hints:['Модуль \u2014 расстояние от числа до нуля, а расстояние неотрицательно.',
               'От \u221212 до нуля ровно 12 единиц.',
               'Значит, |\u221212| = 12.'],
        trap:'Модуль \u2014 это расстояние, оно не бывает отрицательным. Посчитай, сколько единиц от \u221212 до нуля.',
        sol:'|\u221212| = 12: от \u221212 до нуля 12 единиц.' },
      { q:'Какое число наименьшее: \u22129, \u22123, 0 или 4?', kind:'choice', choices:['\u22129','\u22123','0','4'], ans:0, tol:0,
        hints:['Наименьшее число стоит на прямой левее всех остальных.',
               'Левее всех \u2014 \u22129.',
               'Проверка по модулям: |\u22129| = 9 > |\u22123| = 3, поэтому \u22129 < \u22123.'],
        trap:'Сравнивай не цифры, а положение на прямой: левее \u2014 меньше.',
        sol:'\u22129 < \u22123 < 0 < 4, наименьшее \u2014 \u22129.' }
    ]
  };

  /* ---------- отрисовщик кадров ---------- */
  function visW647(el){
    const step=(typeof LV!=='undefined'&&LV.step)||0;
    const lk=(typeof lidKey==='function')?lidKey(647):'l647';
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    const st=CHS[lk];
    /* смена кадра: состояние кадра начинается заново, общий счёт живёт */
    if(st._at!==step){ st._at=step; st.go=0; st.pick=null; st.counted=false; }

    let head='', body='', note='', buttons='';
    const btn=(t,fn)=>`<button class="otk-btn" onclick="${fn}">${t}</button>`;
    const row=(...b)=>`<div class="otk-row">${b.filter(Boolean).join('')}</div>`;
    const hero=(svg)=>`<div class="otk-hero">${svg}</div>`;
    const opts=(list,lk2)=>row(list.map((o,i)=>btn(o,`visW647Pick('${lk2}',${i})`)).join(''));

    if(step===0){
      head='Что такое отрицательное число';
      note='Отрицательное число МЕНЬШЕ нуля: оно показывает, на сколько величина ушла вниз от нуля. Записывают его со знаком минус: \u2212300, \u221215, \u221240.';
      body=hero(f1());
    } else if(step===1){
      head='Координатная прямая';
      note='На прямой есть начало отсчёта 0, единичный отрезок и направление вправо. Отмечай точки по шагам и смотри, где они встают.';
      body=hero(f2(st));
      buttons=(st.go||0)<3
        ? row(btn((st.go||0)===0?'отметить O(0)':'отметить следующую точку',`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===2){
      head='Чем левее \u2014 тем меньше';
      note='Сравниваем \u22127 и \u22122 по прямой: кто стоит левее, тот и меньше.';
      body=hero(f3(st));
      buttons=(st.go||0)<1
        ? row(btn('показать сравнение',`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===3){
      head='Как сравнить два числа';
      note='Четыре шага, которые работают для любых двух чисел на прямой.';
      body=hero(f4(st));
      buttons=(st.go||0)<4
        ? row(btn('шаг '+((st.go||0)+1),`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===4){
      head='Тренажёр: сравни \u22127 и \u22122';
      body=hero(f5t(st));
      buttons=st.pick==null
        ? opts(['\u22127','\u22122','равны'],lk)
        : (st.pick===0
            ? row(btn('к правилу без прямой',`visW647Go('${lk}')`),btn('ещё раз',`visW647Act('${lk}','re')`))
            : opts(['\u22127','\u22122','равны'],lk));
    } else if(step===5){
      head='Правило без прямой';
      note='Если оба числа отрицательные, сравниваем их модули: у кого модуль больше, тот левее и потому меньше.';
      body=hero(f5(st));
      buttons=(st.go||0)<2
        ? row(btn((st.go||0)===0?'правило':'пример',`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===6){
      head='Модуль \u2014 это расстояние';
      note='Модуль числа \u2014 расстояние от этого числа до нуля. Расстояние неотрицательно, поэтому и модуль неотрицателен.';
      body=hero(f6(st));
      buttons=(st.go||0)<1?row(btn('показать',`visW647Go('${lk}')`)):row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===7){
      head='Противоположные числа';
      note='Противоположные числа стоят на одинаковом расстоянии от нуля по разные стороны: модули равны, знаки разные.';
      body=hero(f7(st));
      buttons=(st.go||0)<1?row(btn('показать',`visW647Go('${lk}')`)):row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===8){
      head='Расстояние и порядок по возрастанию';
      note='Расстояние между точками \u2014 это большее минус меньшее. Порядок по возрастанию читаем по прямой слева направо.';
      body=hero(f8(st));
      buttons=(st.go||0)<4
        ? row(btn((st.go||0)===0?'показать расстояние AB':'поставить '+((st.go||0)+1)+'-е число',`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else if(step===9){
      head='Частая ошибка и как проверить себя';
      note='Ошибка: думать, что \u22127 больше \u22122, потому что 7 больше 2. Проверка: посмотреть на прямой, кто левее. Второй способ: сравнить модули. Почему левее значит меньше: вправо числа растут.';
      body=hero(f9());
    } else if(step===10){
      head='Тренажёр: числа на прямой';
      note='Ставь числа по одному: \u22126 уходит на 6 делений влево, \u22122 \u2014 на 2 влево, 2 \u2014 на 2 вправо.';
      body=hero(f10(st));
      const Q=PUT[(st.tr||0)%PUT.length];
      buttons=st.pick==null
        ? opts(Q.o,lk)
        : (st.pick===Q.a
            ? row(btn('ещё вопрос',`visW647Act('${lk}','next')`))
            : opts(Q.o,lk));
    } else if(step===11){
      head='Шпаргалка';
      note='Пять строк, в которых весь урок: положение на прямой, модуль, противоположные числа, расстояние и порядок.';
      body=hero(f11(st));
      buttons=(st.go||0)<5
        ? row(btn('строка '+((st.go||0)+1),`visW647Go('${lk}')`))
        : row(btn('сброс',`visW647Act('${lk}','rst')`));
    } else {
      head='Проверь себя';
      note='Скажи ответ вслух, потом ответь в тесте ниже: сравнение, модуль и порядок по возрастанию.';
      body=hero(f12());
    }

    el.innerHTML=`<div class="otk-frame"><div class="otk-col">`
      +`<div class="otk-big">${head}</div>`
      +body
      +(note?`<div class="otk-note">${note}</div>`:'')
      +buttons
      +`</div></div>`;
  }

  /* ---------- действия ---------- */
  function stOf(lk){ if(typeof CHS==='undefined') window.CHS={}; if(!CHS[lk]) CHS[lk]={}; return CHS[lk]; }
  function redraw(){ if(typeof chRender==='function') chRender(0); }
  window.visW647Go=function(lk){ const st=stOf(lk); st.go=(st.go||0)+1; redraw(); };
  window.visW647Act=function(lk,act){
    const st=stOf(lk);
    if(act==='next'){ st.tr=(st.tr||0)+1; st.pick=null; st.counted=false; }
    if(act==='re'){ st.pick=null; st.counted=false; }
    if(act==='rst'){ CHS[lk]={_at:st._at,ok:st.ok||0,bad:st.bad||0,tr:st.tr||0,counted:false}; }
    redraw();
  };
  window.visW647Pick=function(lk,i){
    const st=stOf(lk);
    const step=(typeof LV!=='undefined'&&LV.step)||0;
    const right=(step===4)?0:PUT[(st.tr||0)%PUT.length].a;
    st.pick=i;
    if(!st.counted){
      st.counted=true;
      if(i===right){ st.ok=(st.ok||0)+1; } else { st.bad=(st.bad||0)+1; }
    }
    redraw();
  };

  /* ---------- регистрация ---------- */
  window.VISKW=window.VISKW||{};
  window.VISKW[647]=visW647;
  (function(){
    if(!window.ARH_LESSONS) return;
    for(let i=0;i<window.ARH_LESSONS.length;i++){
      if(window.ARH_LESSONS[i] && window.ARH_LESSONS[i].id===647){ window.ARH_LESSONS[i]=L647; return; }
    }
    window.ARH_LESSONS.push(L647);
  })();
})();
