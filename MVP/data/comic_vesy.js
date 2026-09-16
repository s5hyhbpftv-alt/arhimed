/* ============ ЛИСТ 255 · «ВЕСЫ И ЗНАКИ» · живой комикс для 1–2 класса ============

   Тема: сравнение чисел и знаки >, <, = («больше», «меньше», «столько же»).
   В плане 1 класса (петерсон_1-9.md) это идёт сразу после состава числа:
   «числа 1–9 (состав); 0 и 10; сравнение, знаки». В приложении этой темы не
   было: комиксы 300–311 начинаются с перехода через десяток, а сравнение
   встречается только мельком внутри других уроков.

   ГЛАВНОЕ РЕШЕНИЕ КАРТИНОК: знак — это не закорючка, которую надо запомнить
   («клювик смотрит на меньшее»), а ПОВЕДЕНИЕ весов. Ребёнок видит: та чашка,
   где больше, опускается; знак раскрывается в её сторону. Когда знак выведен
   из движения, его не надо заучивать — он читается из картинки. Поэтому весы
   нарисованы в каждом кадре и наклоняются по-настоящему: угол наклона и высота
   чашек считаются из чисел, а не рисуются наугад.

   Второе решение: сравнение опирается на уже пройденный домик числа 10.
   Числа больше десяти сравниваются без счёта — «в левой корзине десяток,
   в правой десяток и ещё три: значит, правая больше». Это ровно тот приём,
   который нужен на сложении с переходом через десяток.

   Интерактив у каждого кадра свой, а не один приём десять раз:
     пустые весы     — потрогать, положить предметы и увидеть наклон;
     две корзины     — выбрать знак из трёх кнопок;
     состав десятка  — числа больше десяти, знак выводится из десятка;
     поровну         — случай, когда весы стоят ровно и знак «=»;
     скорость        — четыре пары подряд, счётчик пройденных;
     свой пример     — собрать свои числа и проверить себя.
*/
(function(){
  const ID = 255;
  const ДОМ = 'v255';

  /* ─────────── состояние ─────────── */
  function память(){
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[ДОМ]) CHS[ДОМ] = { кадр: 0, чашки: {}, ответы: {}, пройдено: 0, свои: [] };
    return CHS[ДОМ];
  }
  function шаг(){
    const п = память();
    const изLV = (typeof LV !== 'undefined' && typeof LV.step === 'number') ? LV.step : 0;
    if (изLV !== п.кадр) { п.кадр = изLV; }
    return Math.max(0, Math.min(КАДРЫ.length - 1, изLV));
  }
  /* Состояние кадра должно нести ВСЕ поля, которые читают кадры: раньше здесь
     лежали только чашки, и второй кадр падал на «reading '1'», потому что
     ответы[1] уходили в undefined. Пустой innerHTML выглядел как «кадр не
     нарисовался» — искать пришлось через перехват console.error. */
  function сост(i){
    const п = память();
    if (!п.чашки[i]) п.чашки[i] = { слева: [], справа: [], пусто: 0, ответы: {}, ряд: 0, быстро: 0, быстрыеОтветы: {}, свои: [] };
    return п.чашки[i];
  }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };

  /* ─────────── свои символы ───────────
     сим() живёт внутри движка комиксов (MVP/js/comic.js) и снаружи недоступна,
     поэтому предметы для чашек рисуем здесь сами, в той же манере: плоская
     заливка, тёмная обводка, точка (0,0) — низ предмета. */
  function предмет(вид, x, y, s, цв){
    const м = 'translate(' + x + ',' + y + ') scale(' + (s == null ? 1 : s) + ')';
    const ф = {
      яблоко: '<path d="M0 -2 C-11 -13 -18 -4 -14 5 C-11 13 -4 17 0 12 C4 17 11 13 14 5 C18 -4 11 -13 0 -2 Z" fill="' + (цв || '#c9433a') + '" stroke="#7c3326" stroke-width="1.4"/>' +
        '<path d="M0 -4 C0 -9 2 -12 5 -14" stroke="#6b4520" stroke-width="2.2" fill="none" stroke-linecap="round"/>',
      морковь: '<path d="M0 0 C5 6 7 16 0 23 C-7 16 -5 6 0 0 Z" fill="#e2803a" stroke="#8a4a1c" stroke-width="1.3"/>' +
        '<path d="M-4 -4 C-10 -10 -13 -18 -10 -23 M0 -6 C0 -12 2 -18 4 -23 M4 -4 C9 -10 14 -15 15 -21" stroke="#4e7f2f" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
      гриб: '<rect x="-3" y="-10" width="6" height="10" rx="2" fill="#f0e2c4" stroke="#8a6d4a" stroke-width="1.2"/>' +
        '<path d="M-11 -9 C-11 -19 11 -19 11 -9 Z" fill="#c65b4a" stroke="#7c3326" stroke-width="1.4"/>' +
        '<circle cx="-4" cy="-13" r="1.8" fill="#f6efe0"/><circle cx="3" cy="-12" r="1.4" fill="#f6efe0"/>',
      камень: '<path d="M-8 0 C-10 -7 -4 -11 2 -10 C8 -9 10 -4 9 0 Z" fill="' + (цв || '#9aa0a8') + '" stroke="#6b7078" stroke-width="1.3"/>'
    };
    return ф[вид] ? '<g transform="' + м + '">' + ф[вид] + '</g>' : '';
  }

  /* ─────────── знак, выведенный из чисел ─────────── */
  function знак(а, б){ return а > б ? '>' : (а < б ? '<' : '='); }
  function словами(а, б){
    if (а > б) return а + ' больше, чем ' + б;
    if (а < б) return а + ' меньше, чем ' + б;
    return а + ' и ' + б + ' — поровну';
  }

  /* ─────────── ёжик Пых (тот же герой, что в листе 253) ─────────── */
  function ёжик(настроение){
    const глаза = настроение === 'рад'
      ? '<path d="M30 30 q5 -6 10 0" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>'+
        '<path d="M50 30 q5 -6 10 0" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="35" cy="30" r="3.4" fill="#2b2118"/><circle cx="55" cy="30" r="3.4" fill="#2b2118"/>';
    const рот = настроение === 'рад'
      ? '<path d="M33 44 q12 11 24 0" stroke="#2b2118" stroke-width="2.8" fill="none" stroke-linecap="round"/>'
      : '<path d="M35 46 q10 4 20 0" stroke="#2b2118" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    return `<svg viewBox="0 0 90 80" width="76" height="68" aria-hidden="true">
      <ellipse cx="45" cy="72" rx="26" ry="4" fill="rgba(0,0,0,.14)"/>
      <path d="M45 8 L74 40 C74 58 60 68 45 68 C30 68 16 58 16 40 Z" fill="#a97a52" stroke="#2b2118" stroke-width="2.6"/>
      <path d="M45 12 L45 66 M30 18 L52 62 M60 18 L38 62 M22 30 L66 30" stroke="#8a5f3c" stroke-width="1.8" opacity=".55"/>
      <circle cx="45" cy="42" r="20" fill="#f0c9a4" stroke="#2b2118" stroke-width="2.4"/>
      <path d="M28 34 q8 -6 16 -2 M46 32 q8 -4 16 2" stroke="#2b2118" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      ${глаза}
      <ellipse cx="45" cy="41" rx="6" ry="5" fill="#3a2c20"/>
      <circle cx="43" cy="39" r="1.6" fill="#fff"/>
      ${рот}
    </svg>`;
  }

  /* ─────────── весы: наклон считается из чисел ─────────── */
  /* Чашка, где больше, опускается вниз; знак раскрывается в её сторону.
     Наклон ограничен 9 градусами, иначе коромысло выглядит сломанным. */
  function весы(а, б, видФигуры, размер){
    const разница = а - б;
    const угол = Math.max(-9, Math.min(9, разница * 1.6));
    const x1 = 70, x2 = 250, yцентр = 96, плечо = 90;
    const y1 = yцентр + Math.sin(угол * Math.PI / 180) * плечо;
    const y2 = yцентр - Math.sin(угол * Math.PI / 180) * плечо;
    const s = размер == null ? 1 : размер;
    const насыпать = (x, y, n, вид) => {
      let out = '';
      for (let i = 0; i < n; i++){
        const к = i % 4, р = Math.floor(i / 4);
        out += предмет(видФигуры, x - 24 + к * 16, y + 6 - р * 13, s * 0.62, ['#c9433a', '#e8c34a', '#7fb45c'][(i + р) % 3]);
      }
      return out;
    };
    const видно = (n) => Math.min(n, 12);
    return `<g>
      <!-- стойка -->
      <path d="M160 190 L160 118" stroke="#6b4a2a" stroke-width="9" stroke-linecap="round"/>
      <path d="M120 190 L200 190" stroke="#6b4a2a" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="160" cy="194" rx="62" ry="7" fill="rgba(0,0,0,.16)"/>
      <!-- коромысло: поворачивается на угол из чисел -->
      <g transform="rotate(${угол.toFixed(2)} 160 ${yцентр})">
        <path d="M${x1} ${yцентр} L${x2} ${yцентр}" stroke="#8a6a3a" stroke-width="8" stroke-linecap="round"/>
        <circle cx="160" cy="${yцентр}" r="7" fill="#d9a441" stroke="#6b4a2a" stroke-width="2.4"/>
      </g>
      <!-- чашки висят вертикально, на своей высоте -->
      <path d="M${x1} ${y1} L${x1} ${y1 + 20}" stroke="#6b4a2a" stroke-width="2.4"/>
      <path d="M${x1 - 34} ${y1 + 20} L${x1 + 34} ${y1 + 20} L${x1 + 26} ${y1 + 44} L${x1 - 26} ${y1 + 44} Z"
            fill="#c9a476" stroke="#6b4a2a" stroke-width="2.6"/>
      ${насыпать(x1, y1 + 24, видно(а), видФигуры)}
      <path d="M${x2} ${y2} L${x2} ${y2 + 20}" stroke="#6b4a2a" stroke-width="2.4"/>
      <path d="M${x2 - 34} ${y2 + 20} L${x2 + 34} ${y2 + 20} L${x2 + 26} ${y2 + 44} L${x2 - 26} ${y2 + 44} Z"
            fill="#c9a476" stroke="#6b4a2a" stroke-width="2.6"/>
      ${насыпать(x2, y2 + 24, видно(б), видФигуры)}
      <!-- подписи чисел под чашками -->
      <text x="${x1}" y="${y1 + 66}" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold"
            fill="#f6ecd2" stroke="#1c2b22" stroke-width="4" paint-order="stroke" stroke-linejoin="round">${а}</text>
      <text x="${x2}" y="${y2 + 66}" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="bold"
            fill="#f6ecd2" stroke="#1c2b22" stroke-width="4" paint-order="stroke" stroke-linejoin="round">${б}</text>
    </g>`;
  }

  /* Знак-«клювик»: рисуется отдельно и крупно, чтобы читался на телефоне. */
  function знакКрупно(з, цв, сторона){
    const ш = сторона || 54;
    if (з === '=') return `<g><path d="M-14 -7 L14 -7 M-14 7 L14 7" stroke="${цв}" stroke-width="6" stroke-linecap="round" transform="translate(${ш/2},${ш/2})"/></g>`;
    const точка = з === '>' ? [[14,-14],[14,14],[-14,0]] : [[-14,-14],[-14,14],[14,0]];
    return `<path d="M${точка[0][0]+ш/2} ${точка[0][1]+ш/2} L${точка[1][0]+ш/2} ${точка[1][1]+ш/2} L${точка[2][0]+ш/2} ${точка[2][1]+ш/2} Z"
      fill="none" stroke="${цв}" stroke-width="6" stroke-linejoin="round"/>`;
  }

  /* ─────────── кнопки выбора знака ─────────── */
  function кнопки(i, верно, st){
    const выбрано = st.ответы[i];
    return ['>', '<', '='].map(з => {
      const класс = выбрано == null ? '' : (з === верно ? ' верно' : (з === выбрано ? ' мимо' : ''));
      return `<button class="зн${класс}" onclick="В255.выбрать(${i},'${з}')" ${выбрано != null ? 'disabled' : ''}>${з}</button>`;
    }).join('');
  }

  /* ─────────── кадры ─────────── */
  const КАДРЫ = [
    /* 0 · знакомство с весами */
    {
      t: 'Весы показывают, где больше',
      say: 'Привет! Я Пых. Это весы. Клади предметы — и сразу видно, где больше.',
      делать: 'Нажми на чашку, чтобы положить орешки, и посмотри, что будет.',
      готов: st => (st.пусто || 0) < 2,
      рисуй(i, st){
        const слева = (st.пусто || 0) >= 1 ? 3 : 0;
        const справа = (st.пусто || 0) >= 2 ? 6 : 0;
        return `<div class="сцена" onclick="В255.положить(${i})">
          ${весыSVG(слева, справа, 'камень', 1.05)}
          ${st.пусто >= 2 ? `<p class="вывод">Там, где шесть, чашка опустилась. Значит, шесть больше.</p>` : ''}
        </div>`;
      }
    },
    /* 1 · выбрать знак */
    {
      t: 'Какой знак поставить?',
      say: 'На левой чашке 4 яблока, на правой 7. Какой знак между ними?',
      делать: 'Выбери знак — весы наклонятся сами.',
      готов: st => st.ответы[1] != null,
      рисуй(i, st){
        const ответ = st.ответы[1];
        return `<div class="сцена">
          ${весыSVG(4, 7, 'яблоко', 1.15, ответ)}
          <div class="знаки">${кнопки(1, '>', st)}</div>
          ${ответ != null ? `<p class="вывод">${ответ === '>' ? 'Верно! Четыре меньше семи — знак раскрылся в сторону семи.' : 'Смотри: правая чашка ниже. Значит, семь больше, а четыре меньше.'}</p>` : ''}
        </div>`;
      }
    },
    /* 2 · без счёта, через десяток */
    {
      t: 'Можно не считать',
      say: 'В левой корзине десяток, в правой десяток и ещё три. Где больше?',
      делать: 'Считать не нужно: сравни десятки. Выбери знак.',
      готов: st => st.ответы[2] != null,
      рисуй(i, st){
        const ответ = st.ответы[2];
        return `<div class="сцена">
          <div class="корзины">
            <div class="корзина"><span class="десяток">10</span><span class="подпись">десяток</span></div>
            <div class="знак-место">${ответ == null ? '<span class="вопрос">?</span>' : `<span class="открыт">${ответ}</span>`}</div>
            <div class="корзина"><span class="десяток">10</span><span class="плюс">+ 3</span><span class="подпись">десяток и три</span></div>
          </div>
          <div class="знаки">${кнопки(2, '<', st)}</div>
          ${ответ != null ? `<p class="вывод">Десятки одинаковые, а справа есть ещё три. Значит, справа больше: 10 &lt; 13.</p>` : ''}
        </div>`;
      }
    },
    /* 3 · поровну */
    {
      t: 'А если поровну?',
      say: 'Слева пять морковок и справа пять. Что покажут весы?',
      делать: 'Выбери знак. Смотри на чашки внимательно.',
      готов: st => st.ответы[3] != null,
      рисуй(i, st){
        const ответ = st.ответы[3];
        return `<div class="сцена">
          ${весыSVG(5, 5, 'морковь', 1.15, ответ)}
          <div class="знаки">${кнопки(3, '=', st)}</div>
          ${ответ != null ? `<p class="вывод">Чашки на одной высоте — число слева равно числу справа. Это знак «равно»: 5 = 5.</p>` : ''}
        </div>`;
      }
    },
    /* 4 · два знака рядом, чтобы не путать */
    {
      t: 'Клювик смотрит на меньшее',
      say: 'У знака «больше» и «меньше» один секрет: он всегда раскрывается в сторону большего числа.',
      делать: 'Сравни: где больше — там и раскрывается.',
      готов: st => (st.ряд || 0) >= 3,
      рисуй(i, st){
        const ряды = [[6, 2], [3, 8], [7, 7]];
        return `<div class="сцена">
          <div class="ряды">${ряды.map(([а, б], к) => `
            <div class="ряд ${(st.ряд || 0) > к ? 'открыт' : ''}">
              <span class="число">${а}</span>
              <span class="место">${(st.ряд || 0) > к ? знак(а, б) : '?'}</span>
              <span class="число">${б}</span>
            </div>`).join('')}</div>
          <p class="подсказка">Нажимай по одному: ${(st.ряд || 0)} из 3 открыто.</p>
          <button class="кнопка" onclick="В255.открыть(${i})" ${(st.ряд || 0) >= 3 ? 'disabled' : ''}>Открыть следующий</button>
          ${(st.ряд || 0) >= 3 ? `<p class="вывод">Все три: 6 &gt; 2, 3 &lt; 8, 7 = 7. Знак всегда раскрыт в сторону большего.</p>` : ''}
        </div>`;
      }
    },
    /* 5 · скорость: четыре пары, у каждой свой ряд кнопок.
       Первый заход ставил 12 кнопок в один блок — они переносились и
       выходили за пределы кадра на 56 px. Теперь у каждой пары свой ряд. */
    {
      t: 'Быстро!',
      say: 'Четыре пары подряд. Выбирай знак в каждой строке.',
      делать: 'Нажми знак в каждой строке — счёт внизу.',
      готов: st => (st.быстро || 0) >= 4,
      рисуй(i, st){
        const пары = [[5, 9], [8, 2], [6, 6], [4, 7]];
        const отв = st.быстрыеОтветы || {};
        const верно = пары.filter(([а, б], к) => отв[к] === знак(а, б)).length;
        return `<div class="сцена">
          <div class="быстро">${пары.map(([а, б], к) => `
            <div class="пара ${отв[к] ? 'готова' : ''}">
              <span class="число">${а}</span>
              <span class="место">${отв[к] || '?'}</span>
              <span class="число">${б}</span>
              <span class="мини">${['>', '<', '='].map(з => `<button class="знак-малый ${отв[к] ? (отв[к] === з ? (з === знак(а, б) ? 'верно' : 'мимо') : '') : ''}"
                onclick="В255.быстро(${i},${к},'${з}')" ${отв[к] ? 'disabled' : ''}>${з.replace('<', '&lt;')}</button>`).join('')}</span>
            </div>`).join('')}</div>
          <p class="подсказка">Верно ${верно} из 4.</p>
          ${(st.быстро || 0) >= 4 ? `<p class="вывод">Разбор: 5 &lt; 9, 8 &gt; 2, 6 = 6, 4 &lt; 7. Везде знак раскрыт в сторону большего числа.</p>` : ''}
        </div>`;
      }
    },
    /* 6 · свои числа */
    {
      t: 'Придумай свои',
      say: 'Собери свои числа на весах и посмотри, какой знак получится.',
      делать: 'Нажимай «+» на чашках — весы наклонятся.',
      готов: st => (st.свои || []).length >= 2,
      рисуй(i, st){
        const а = (st.свои || [])[0] || 0, б = (st.свои || [])[1] || 0;
        return `<div class="сцена">
          ${весыSVG(а, б, 'гриб', 1.05)}
          <div class="правлю">
            <div class="блок"><span>Левая</span>
              <button class="кнопка" onclick="В255.своё(${i},0,-1)">−</button>
              <b>${а}</b>
              <button class="кнопка" onclick="В255.своё(${i},0,1)">+</button></div>
            <div class="блок"><span>Правая</span>
              <button class="кнопка" onclick="В255.своё(${i},1,-1)">−</button>
              <b>${б}</b>
              <button class="кнопка" onclick="В255.своё(${i},1,1)">+</button></div>
          </div>
          ${(st.свои || []).length >= 2 ? `<p class="вывод">${словами(а, б)}. Значит, знак: <b>${знак(а, б)}</b></p>` : ''}
        </div>`;
      }
    },
    /* 7 · что запомнить */
    {
      t: 'Что запомнить',
      say: 'Знак раскрывается в сторону большего числа. Весы опускают ту чашку, где больше.',
      делать: '',
      готов: () => true,
      рисуй(){
        return `<div class="сцена">
          <div class="памятка">
            <div class="строка"><b>5 &gt; 3</b><span>пять больше трёх</span></div>
            <div class="строка"><b>3 &lt; 5</b><span>три меньше пяти</span></div>
            <div class="строка"><b>4 = 4</b><span>четыре равно четырём</span></div>
          </div>
          <p class="вывод">Клювик смотрит на меньшее число, а раскрывается к большему. Перепутать нельзя: посмотри, какая чашка ниже.</p>
        </div>`;
      }
    }
  ];

  /* ─────────── весы с наклоном и знаком (общий рисовальщик) ─────────── */
  function весыSVG(а, б, видФигуры, размер, ответ){
    const з = знак(а, б);
    const показать = ответ == null ? null : з;
    return `<svg viewBox="0 0 320 210" class="весы" preserveAspectRatio="xMidYMid meet">
      ${весы(а, б, видФигуры, размер)}
      ${показать ? `<g transform="translate(160,180)"><g transform="translate(-27,-27)">${знакКрупно(показать, '#5f9a6a')}</g></g>` : ''}
    </svg>`;
  }

  /* ─────────── взаимодействие ─────────── */
  window.В255 = {
    положить(i){ const st = сост(i); st.пусто = Math.min(2, (st.пусто || 0) + 1); перерисовать(); },
    выбрать(i, з){ const st = сост(i); if (st.ответы[i] == null) st.ответы[i] = з; перерисовать(); },
    открыть(i){ const st = сост(i); st.ряд = Math.min(3, (st.ряд || 0) + 1); перерисовать(); },
    быстро(i, к, з){ const st = сост(i); st.быстрыеОтветы = st.быстрыеОтветы || {};
      if (!st.быстрыеОтветы[к]) st.быстрыеОтветы[к] = з;
      st.быстро = Object.keys(st.быстрыеОтветы).length; перерисовать(); },
    своё(i, к, д){ const st = сост(i); st.свои = st.свои || [0, 0];
      st.свои[к] = Math.max(0, Math.min(12, st.свои[к] + д)); перерисовать(); }
  };

  /* ─────────── стиль (только внутри этого листа) ─────────── */
  function стиль(){
    if (document.getElementById('s255')) return;
    const с = document.createElement('style');
    с.id = 's255';
    с.textContent = `
      .${ДОМ}{ display:flex; flex-direction:column; gap:12px; }
      .${ДОМ} .реплика{ display:flex; gap:10px; align-items:flex-start; }
      .${ДОМ} .реплика p{ margin:0; font-size:17px; line-height:1.5; }
      .${ДОМ} .сцена{ display:flex; flex-direction:column; gap:10px; align-items:center; }
      .${ДОМ} .весы{ width:100%; max-width:340px; height:auto; display:block; }
      .${ДОМ} .вывод{ margin:0; font-size:16px; line-height:1.5; color:#2b2118; background:rgba(217,164,65,.14);
        border-left:4px solid #d9a441; border-radius:8px; padding:9px 12px; text-align:left; width:100%; }
      .${ДОМ} .знаки{ display:flex; gap:12px; }
      .${ДОМ} .зн{ width:64px; height:56px; font-size:26px; font-weight:bold; font-family:Georgia,serif;
        border:2px solid #6b4a2a; border-radius:12px; background:#fdf6e0; color:#2b2118; cursor:pointer; }
      .${ДОМ} .зн.верно{ background:#dff0d8; border-color:#5f9a6a; }
      .${ДОМ} .зн.мимо{ background:#f7dcd8; border-color:#c9433a; }
      .${ДОМ} .знак-малый{ width:46px; height:44px; font-size:20px; font-weight:bold; font-family:Georgia,serif;
        border:2px solid #6b4a2a; border-radius:10px; background:#fdf6e0; cursor:pointer; }
      .${ДОМ} .кнопка{ min-height:44px; padding:8px 16px; font-size:16px; font-family:Georgia,serif;
        border:2px solid #6b4a2a; border-radius:10px; background:#fdf6e0; cursor:pointer; }
      .${ДОМ} .подсказка{ margin:0; color:#6b5a44; font-size:15px; }
      .${ДОМ} .ряды{ display:flex; flex-direction:column; gap:8px; width:100%; max-width:300px; }
      .${ДОМ} .ряд{ display:flex; align-items:center; justify-content:space-between; gap:10px;
        background:#fdf6e0; border:2px solid #d9c9a8; border-radius:12px; padding:8px 14px; }
      .${ДОМ} .ряд.открыт{ border-color:#5f9a6a; background:#f2f8ee; }
      .${ДОМ} .число{ font-size:24px; font-weight:bold; font-family:Georgia,serif; }
      .${ДОМ} .место{ font-size:26px; font-weight:bold; color:#a3762a; min-width:34px; text-align:center; }
      .${ДОМ} .быстро{ display:flex; flex-direction:column; gap:8px; width:100%; max-width:330px; }
      .${ДОМ} .пара{ display:flex; align-items:center; gap:8px; background:#fdf6e0;
        border:2px solid #d9c9a8; border-radius:10px; padding:6px 10px; width:100%; box-sizing:border-box; }
      .${ДОМ} .мини{ display:flex; gap:6px; margin-left:auto; }
      .${ДОМ} .знак-малый.верно{ background:#dff0d8; border-color:#5f9a6a; }
      .${ДОМ} .знак-малый.мимо{ background:#f7dcd8; border-color:#c9433a; }
      .${ДОМ} .пара.готова{ border-color:#5f9a6a; }
      .${ДОМ} .корзины{ display:flex; align-items:center; gap:12px; }
      .${ДОМ} .корзина{ display:flex; flex-direction:column; align-items:center; gap:2px;
        background:#fdf6e0; border:2px solid #d9c9a8; border-radius:14px; padding:10px 14px; }
      .${ДОМ} .десяток{ font-size:26px; font-weight:bold; font-family:Georgia,serif; }
      .${ДОМ} .плюс{ font-size:18px; color:#5f9a6a; }
      .${ДОМ} .подпись{ font-size:13px; color:#6b5a44; }
      .${ДОМ} .знак-место{ font-size:30px; font-weight:bold; color:#a3762a; min-width:40px; text-align:center; }
      .${ДОМ} .правлю{ display:flex; gap:16px; flex-wrap:wrap; justify-content:center; }
      .${ДОМ} .блок{ display:flex; align-items:center; gap:8px; font-size:16px; }
      .${ДОМ} .памятка{ display:flex; flex-direction:column; gap:8px; width:100%; max-width:320px; }
      /* Цвет задаём ЯВНО: оболочка приложения красит текст в светлый (#e8e0cc),
         и на светлой карточке «5 > 3» получалось почти невидимым. Контраст
         проверяется замером, а не на глаз: #2b2118 на #fdf6e0 — 14.6:1. */
      .${ДОМ} .строка{ display:flex; justify-content:space-between; align-items:baseline; gap:12px;
        background:#fdf6e0; border:2px solid #d9c9a8; border-radius:12px; padding:10px 14px; }
      .${ДОМ} .строка b{ font-size:24px; font-family:Georgia,serif; color:#2b2118; }
      .${ДОМ} .строка span{ font-size:14px; color:#4a3a26; }
      .${ДОМ} .число, .${ДОМ} .место, .${ДОМ} .десяток, .${ДОМ} .плюс, .${ДОМ} .знак-место{ color:#2b2118; }
      .${ДОМ} .зн, .${ДОМ} .знак-малый, .${ДОМ} .кнопка{ color:#2b2118; }
      .${ДОМ} .подсказка{ color:#4a3a26; }
      @media (max-width:360px){ .${ДОМ} .реплика p{ font-size:16px; } .${ДОМ} .зн{ width:56px; } }
      @media (prefers-reduced-motion:reduce){ .${ДОМ} *{ transition:none !important; animation:none !important; } }
    `;
    document.head.appendChild(с);
  }

  /* ─────────── отрисовка кадра ─────────── */
  function рисовать(el){
    стиль();
    const i = шаг(), к = КАДРЫ[i], st = сост(i);
    const готов = к.готов(st);
    el.innerHTML = `<div class="${ДОМ}">
      <div class="реплика">${ёжик(готов ? 'рад' : 'думает')}<p>${к.say}</p></div>
      ${к.рисуй(i, st)}
      ${готов || !к.делать ? '' : `<p class="подсказка">${к.делать}</p>`}
    </div>`;
  }

  /* ─────────── регистрация ─────────── */
  window.WAVE_B = window.WAVE_B || {};
  window.WAVE_B[ID] = function(el){
    try { рисовать(el); }
    catch(e){ el.innerHTML = ''; try{ console.error('лист ' + ID + ':', e); }catch(_){} }
  };

  if (window.ARH_LESSONS && !window.ARH_LESSONS.some(x => x.id === ID)){
    window.ARH_LESSONS.push({
      id: ID, title: 'Весы и знаки: больше, меньше, столько же', ico: '⚖️',
      src: 'Начальная школа · 1–2 класс · Сравнение чисел и знаки >, <, =',
      subj: 'jun',
      explain: КАДРЫ.map((к, i) => (i + 1) + '. ' + к.t),
      check: {
        q: 'На весах слева 6 грибов, справа 9. Какой знак между ними?',
        choices: ['6 > 9', '6 < 9', '6 = 9', 'сравнить нельзя'],
        ans: 1,
        exp: 'Правая чашка опустилась: девять больше шести. Знак раскрывается в сторону большего числа, значит 6 < 9.'
      },
      tasks: [
        {q:'Что больше: 7 или 4?', kind:'choice', choices:['7','4','они равны','нельзя узнать'], ans:0, tol:0,
         hints:['Где больше предметов, та чашка ниже.','Семь больше четырёх.'], sol:'7'},
        {q:'Поставь знак: 5 … 5', kind:'choice', choices:['>','<','=','ничего'], ans:2, tol:0,
         hints:['Слева и справа одно и то же число.','Весы стоят ровно — это знак «равно».'], sol:'='},
        {q:'В левой корзине десяток, в правой десяток и ещё два. Где больше?', kind:'choice',
         choices:['слева','справа','поровну','нельзя узнать'], ans:1, tol:0,
         hints:['Десятки одинаковые — сравни то, что сверху.','Справа есть ещё два: 12 больше 10.'], sol:'справа'}
      ]
    });
  }
})();
