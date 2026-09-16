/* ============ КОМИКС-РАЗВИЛКА · «У кого больше» · 1–2 класс ============
   Новый движок для младшей школы. Чем он отличается от прежнего комикса
   (MVP/js/comic.js): там ребёнок читает кадры и жмёт «дальше» — это книжка.
   Здесь у ребёнка есть ВЫБОР, и выбор меняет историю: ошибся — история
   поворачивает туда, где ошибку разбирают, и возвращает в сюжет. Ребёнок
   не «провалил задание», а пережил приключение.

   Что внутри движка:
   • страницы-кадры: картинка, реплика в облачке, подпись;
   • развилки: две-три кнопки, каждая ведёт на свою страницу;
   • ЖИВАЯ СЦЕНА сравнения: картинка перестраивается — предметы встают в
     пары, лишние обводятся, и видно, где больше, без счёта;
   • в конце — «разворот истории»: все выборы ребёнка на одном экране.

   Формат данных (window.NCOMIC_BOOK): см. объект книги ниже по файлу. */
/* ============ КНИГА: «У кого больше» ============ */
window.NCOMIC_BOOK = {
  id: 254,
  title: 'У кого больше: сравниваем без счёта',
  ico: '🥕',
  src: 'Начальная школа · 1–2 класс · Сравнение: больше, меньше, столько же',
  book: 'Комикс-развилка · сравнение',
  pages: [
    /* 1. завязка */
    { art: 'garden', hold: [{ name: 'Батюшка', kind: 'farmer', emo: 'smile' }, { name: 'Настя', kind: 'girl', emo: 'smile' }],
      who: { name: 'Батюшка', kind: 'farmer', emo: 'smile' },
      t: 'Настенька и две грядки',
      cap: 'Утро в саду. Настя рвёт морковь — но только с первой грядки.',
      say: 'Настя, я посадил морковь на двух грядках. С первой уже собрали, на второй ещё растёт. Где моркови больше?' },

    /* 2. развилка: как сравнивать */
    { ask: 'Как узнать, где моркови больше, если считать долго?',
      opts: [
        { t: 'Сосчитать обе грядки и сравнить числа', goto: 2, sound: 'no',
          note: 'Считать можно, но долго и легко ошибиться. Есть способ быстрее и надёжнее.' },
        { t: 'Разложить морковь парами: одной грядке — из другой', goto: 3, sound: 'ok',
          note: 'Верно! Пары показывают, где останется лишняя морковь. Считать не нужно.' }
      ] },

    /* 3. объяснение способа */
    { art: 'pairs', who: { name: 'Батюшка', kind: 'farmer', emo: 'think' },
      t: 'Ставим в пары',
      cap: 'Берём по одной морковке с каждой грядки и кладём рядом.',
      say: 'Каждой морковке с первой грядки ищем пару на второй. Всем хватило пары — значит поровну. Где-то осталась без пары — там больше.',
      thinking: 'Пара нашлась у всех? Кучки одинаковые. Осталась лишняя? В той кучке больше.' },

    /* 4. правило, нарисованное на трёх парах предметов */
    { art: 'rule', who: { name: 'Настя', kind: 'girl', emo: 'wow' },
      t: 'Три слова: больше, меньше, столько же',
      cap: 'Это и есть сравнение.',
      thinking: 'Всем нашлась пара — столько же. Остались лишние — больше. Лишние у другого — меньше. Считать не пришлось!' },

    /* 5. развилка-ловушка */
    { ask: 'Морковки лежат на грядках разной длины. Что это значит?',
      opts: [
        { t: 'На длинной грядке моркови больше', goto: 5, sound: 'no',
          note: 'Длина обманывает: морковь может лежать редко, а на короткой — густо.' },
        { t: 'По длине грядки сравнивать нельзя', goto: 6, sound: 'ok',
          note: 'Верно. Сравниваем сами предметы, а не место, где они лежат.' }
      ] },

    /* 6. разбор ловушки */
    { art: 'two-baskets', who: { name: 'Батюшка', kind: 'farmer', emo: 'sad' },
      t: 'Ловушка: длина обманывает',
      cap: 'Первая грядка длиннее — и всё равно моркови на ней меньше.',
      say: 'Вот первая грядка: длинная, а морковь лежит редко — четыре штуки. На второй, короткой, — шесть, они лежат близко. По длине не угадаешь!',
      thinking: 'Сравниваем предметы, а не место. Длинная грядка не значит «больше моркови».' },

    /* 7. живое сравнение */
    { art: 'compare', t: 'А теперь посмотри сам',
      cap: 'Первая грядка — 4 морковки. Вторая — 6 морковок. Где больше?',
      a: { label: 'первая', n: 4, icon: 'carrot' },
      b: { label: 'вторая', n: 6, icon: 'carrot' },
      answer: 'b', auto: false,
      explain: 'Ставим в пары: четырём морковкам первой грядки нашлась пара на второй, а две остались без пары. Значит, на второй грядке больше — и это видно, считать не нужно.',
      thinking: 'Нажми ответ — картинка сама перестроится.' },

    /* 8. поровну */
    { art: 'compare', t: 'А если так?',
      cap: 'Первая грядка — 5 морковок, вторая — 5 морковок.',
      a: { label: 'первая', n: 5, icon: 'carrot' },
      b: { label: 'вторая', n: 5, icon: 'carrot' },
      answer: 'equal', auto: true,
      explain: 'У каждой морковки нашлась пара, лишних нет. Значит, кучки одинаковые — про такие говорят «столько же».',
      thinking: 'Поровну — это когда лишних нет ни там, ни там.' },

    /* 9. смена сюжета: грибы */
    { art: 'compare', t: 'Настя идёт за грибами',
      cap: 'В корзине у Насти 7 грибов, у Батюшки 5.',
      a: { label: 'Настя', n: 7, icon: 'mushroom' },
      b: { label: 'Батюшка', n: 5, icon: 'mushroom' },
      answer: 'a', auto: false,
      explain: 'Пяти грибам Батюшки нашлась пара в корзине Насти, а два остались без пары. Лишние там, где больше: у Насти.',
      thinking: 'Чья корзина больше? Поставь грибы в пары.' },

    /* 10. развилка-проверка */
    { ask: 'Настя говорит: «У меня 7 грибов, у тебя 5 — значит, у меня больше». Как проверить без счёта?',
      opts: [
        { t: 'Положить грибы парами и посмотреть, где останутся лишние', goto: 11, sound: 'ok',
          note: 'Именно так. Пары — самый быстрый способ сравнить, если считать не хочется.' },
        { t: 'Посмотреть, чья корзина тяжелее', goto: 12, sound: 'no',
          note: 'Вес обманчив: грибы разного размера и с водой. Надёжнее сравнивать сами грибы парами.' }
      ] },

    /* 11. поворот: верный путь */
    { art: 'yard', hold: [{ name: 'Настя', kind: 'girl', emo: 'wow' }],
      who: { name: 'Настя', kind: 'girl', emo: 'wow' },
      t: 'Настя раскладывает грибы',
      cap: 'Она выложила свои грибы в ряд и к каждому положила гриб Батюшки.',
      say: 'Смотри: пяти грибам нашлась пара, а два моих остались без пары. Значит, у меня больше — совсем без счёта!',
      thinking: 'Есть лишние — там больше. Лишних нет — значит столько же.' },

    /* 12. поворот: разбор ошибки */
    { art: 'yard', hold: [{ name: 'Батюшка', kind: 'farmer', emo: 'think' }],
      who: { name: 'Батюшка', kind: 'farmer', emo: 'think' },
      t: 'А если взвесить?',
      cap: 'Батюшка взвесил корзины — и они оказались почти одинаковыми.',
      say: 'Вот вес и обманул: у Насти грибы мелкие и сухие, у меня крупный и мокрый. Вес не говорит, чего больше. А пары говорят всегда.',
      thinking: 'Сравниваем то, что считаем, а не то, сколько оно весит.' },

    /* 13. разворот истории */
    { art: 'story', t: 'Разворот истории',
      thinking: 'Твои решения — на щите: зелёная галка значит «верно», красный крестик — «здесь история повернула на разбор ошибки».' },

    /* 14. итог */
    { art: 'final', who: { name: 'Батюшка', kind: 'farmer', emo: 'smile' },
      t: 'Что мы сегодня поняли',
      cap: 'Три слова, которыми пользуются математики.',
      say: 'Спасибо, Настенька! Теперь мы знаем: сравниваем сами предметы, а не место, где они лежат.' }
  ],

  check: {
    q: 'В одной вазе 6 яблок, в другой 4. Что верно?',
    choices: ['поровну', 'в первой больше', 'во второй больше', 'нельзя сравнить'],
    ans: 1,
    exp: 'Четырём яблокам второй вазы нашлась пара в первой, а два остались без пары. Лишние там, где больше: в первой вазе.'
  },

  tasks: [
    { q: 'У Ани 5 флажков, у Пети 3. У кого больше?', kind: 'choice',
      choices: ['у Ани', 'у Пети', 'поровну'], ans: 0, tol: 0,
      hints: ['Положи флажки парами: Аня — Петя, Аня — Петя…', 'У Пети флажки кончились, а у Ани остались лишние.'],
      sol: 'Трём флажкам Пети нашлась пара у Ани, два остались лишние — значит, у Ани больше.' },
    { q: 'Мама дала Лиде 4 ореха и брату 4 ореха. Как сказать про орехи одним словом?', kind: 'choice',
      choices: ['больше', 'меньше', 'поровну'], ans: 2, tol: 0,
      hints: ['Разложи орехи парами.', 'Всем орехам нашлась пара — лишних нет.'],
      sol: 'Каждому ореху нашлась пара, лишних нет — значит, орехов поровну (столько же).' }
  ]
};

/* ============ ДВИЖОК КОМИКСА-РАЗВИЛКИ ============ */
(function(){
  const GOLD = '#ffd76a', GREEN = '#8fd1a8', MUT = '#cbb89a';
  const КНИГА = window.NCOMIC_BOOK;
  if (!КНИГА) return;
  const ID = КНИГА.id;
  /* Книга доступна проверкам: тест обходит обе ветки развилок и должен знать,
     какой вариант верный, а не угадывать по позиции кнопки. */
  window['NCOMIC_' + ID] = КНИГА;

  /* ── персонажи рисуются кодом, картинок не грузим ─────────────────── */
  const лица = {
    farmer: (emo) => `<svg viewBox="0 0 120 130">
      <ellipse cx="60" cy="125" rx="30" ry="4.5" fill="rgba(0,0,0,.16)"/>
      <path d="M30 128 C26 96 40 82 60 82 C80 82 94 96 90 128 Z" fill="#6f8f5a" stroke="#33291e" stroke-width="2.4"/>
      <path d="M48 84 L60 100 L72 84" fill="none" stroke="#4f6b3f" stroke-width="2.6"/>
      <circle cx="60" cy="52" r="30" fill="#f0c49b" stroke="#33291e" stroke-width="2.4"/>
      <path d="M30 46 C30 22 44 12 60 12 C76 12 90 22 90 46 C84 30 74 24 60 24 C46 24 36 30 30 46 Z" fill="#c9d6bd" stroke="#33291e" stroke-width="2.2"/>
      <ellipse cx="38" cy="42" rx="8" ry="6" fill="#f4d5b4" stroke="#33291e" stroke-width="1.6"/>
      <ellipse cx="82" cy="42" rx="8" ry="6" fill="#f4d5b4" stroke="#33291e" stroke-width="1.6"/>
      <circle cx="50" cy="52" r="3.4" fill="#33291e"/><circle cx="70" cy="52" r="3.4" fill="#33291e"/>
      <circle cx="51" cy="50" r="1.1" fill="#fff"/><circle cx="71" cy="50" r="1.1" fill="#fff"/>
      ${emo === 'sad' ? '<path d="M52 74 Q60 66 68 74" stroke="#8a5a3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : emo === 'wow' ? '<ellipse cx="60" cy="70" rx="6" ry="5" fill="#8a5a3a"/>'
        : emo === 'think' ? '<path d="M54 70 Q60 66 66 70" stroke="#8a5a3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : '<path d="M52 68 Q60 76 68 68" stroke="#8a5a3a" stroke-width="2.8" fill="none" stroke-linecap="round"/>'}
    </svg>`,
    girl: (emo) => `<svg viewBox="0 0 120 130">
      <ellipse cx="60" cy="125" rx="30" ry="4.5" fill="rgba(0,0,0,.16)"/>
      <path d="M32 128 C28 98 42 84 60 84 C78 84 92 98 88 128 Z" fill="#c96f8a" stroke="#33291e" stroke-width="2.4"/>
      <circle cx="60" cy="54" r="30" fill="#f6cda6" stroke="#33291e" stroke-width="2.4"/>
      <path d="M28 54 C26 24 42 12 60 12 C78 12 94 24 92 54 C88 34 76 26 60 26 C44 26 32 34 28 54 Z" fill="#8a5a3a" stroke="#33291e" stroke-width="2.2"/>
      <path d="M26 54 C20 76 26 92 34 96 C30 78 32 62 36 54 Z" fill="#8a5a3a" stroke="#33291e" stroke-width="2"/>
      <path d="M94 54 C100 76 94 92 86 96 C90 78 88 62 84 54 Z" fill="#8a5a3a" stroke="#33291e" stroke-width="2"/>
      <circle cx="50" cy="54" r="3.6" fill="#33291e"/><circle cx="70" cy="54" r="3.6" fill="#33291e"/>
      <circle cx="51" cy="52" r="1.2" fill="#fff"/><circle cx="71" cy="52" r="1.2" fill="#fff"/>
      <circle cx="42" cy="64" r="4.5" fill="rgba(230,140,150,.55)"/><circle cx="78" cy="64" r="4.5" fill="rgba(230,140,150,.55)"/>
      ${emo === 'wow' ? '<ellipse cx="60" cy="72" rx="6" ry="5" fill="#8a3b33"/>'
        : '<path d="M53 70 Q60 78 67 70" stroke="#8a3b33" stroke-width="2.8" fill="none" stroke-linecap="round"/>'}
    </svg>`
  };

  /* ── предметы ─────────────────────────────────────────────────────── */
  const морковь = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M0 0 C4.5 -10 7 -22 5 -32 C1 -40 -3 -40 -6 -32 C-10 -22 -6 -10 0 0 Z" fill="#e2803a" stroke="#8a4a1c" stroke-width="1.4"/>
      <path d="M-4 -29 C-5 -34 -3 -38 -1 -40" stroke="#c96a2c" stroke-width="1" fill="none" opacity=".7"/>
      <path d="M-5 -33 C-11 -41 -15 -50 -13 -57" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M1 -35 C2 -45 4 -52 8 -58" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M6 -32 C12 -39 17 -46 19 -53" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>`;
  const гриб = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
      <rect x="-4" y="0" width="8" height="18" rx="3" fill="#f0e2c4" stroke="#8a6d4a" stroke-width="1.4"/>
      <path d="M-16 2 C-16 -12 16 -12 16 2 Z" fill="#c65b4a" stroke="#7c3326" stroke-width="1.6"/>
      <circle cx="-6" cy="-4" r="2.4" fill="#f6efe0"/><circle cx="5" cy="-2" r="2" fill="#f6efe0"/>
    </g>`;
  const предметы = { carrot: морковь, mushroom: гриб };

  /* ── вспомогательное для сцен ─────────────────────────────────────── */
  /* Фигура в кадре: коробка берётся СТРОГО той же пропорции, что и её
     viewBox, — при чужой пропорции `meet` вписывает фигуру по ширине,
     коробка оказывается выше фигуры и низ уезжает под землю. */
  const ростФигуры = (ш) => ш * 130 / 120;
  const фигура = (ч, x, линия, ш, лицом) => `<g transform="translate(${x},${(линия - ростФигуры(ш)).toFixed(1)})">
      <svg x="0" y="0" width="${ш}" height="${ростФигуры(ш).toFixed(1)}" viewBox="0 0 120 130" preserveAspectRatio="xMidYMax meet">${(лица[ч.kind] || лица.farmer)(ч.emo || 'smile')}</svg>
    </g>`;
  const фигураВлево = (ч, x, линия, ш) => `<g transform="translate(${x},${(линия - ростФигуры(ш)).toFixed(1)}) translate(${ш},0) scale(-1,1)">
      <svg x="0" y="0" width="${ш}" height="${ростФигуры(ш).toFixed(1)}" viewBox="0 0 120 130" preserveAspectRatio="xMidYMax meet">${(лица[ч.kind] || лица.farmer)(ч.emo || 'smile')}</svg>
    </g>`;
  /* Морковка «лёжа» (или приподнятая): хвостик вправо, ботва вправо-вверх.
     Стоящая морковка в ряду грядки читается как частокол, лежащая — как
     грядка. Тело 34×14 при масштабе 1: оранжевое видно и над доской. */
  const морковьЛежит = (x, y, s, цв) => `<g transform="translate(${x},${y}) scale(${s})">
      <path d="M0 0 C12 5 26 7 34 3 C24 13 10 14 0 11 Z" fill="${цв || '#e2803a'}" stroke="#8a4a1c" stroke-width="1.6"/>
      <path d="M33 2 C39 -4 43 -10 44 -15" stroke="#4e7f2f" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M33 4 C40 2 46 0 50 -4" stroke="#4e7f2f" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    </g>`;
  /* Грибы и морковки в корзинах заметно мельче грядковых: иначе семь штук
     не помещаются между героями и залезают на них. */
  const грибМелкий = (x, y, s) => `<g transform="translate(${x},${y})">
      <rect x="-2.6" y="0" width="5.2" height="11" rx="2" fill="#f0e2c4" stroke="#8a6d4a" stroke-width="1.1"/>
      <path d="M-11 1 C-11 -8 11 -8 11 1 Z" fill="#c65b4a" stroke="#7c3326" stroke-width="1.3"/>
      <circle cx="-4" cy="-3" r="1.6" fill="#f6efe0"/><circle cx="3.4" cy="-1.4" r="1.3" fill="#f6efe0"/>
    </g>`;

  const ТЕКСТ = 'font-family="Georgia,\'Times New Roman\',serif"';
  const ОБВОД = (ш) => `stroke="#2f4a1f" stroke-width="${ш}" paint-order="stroke" stroke-linejoin="round"`;

  /* ── фоны ─────────────────────────────────────────────────────────── */
  function фон(scene, земляЗадана, высотаЗадана){
    const земля = земляЗадана || 240, низ = высотаЗадана || (земля + 200);
    if (scene === 'yard') return `
      <rect x="0" y="0" width="360" height="${земля}" fill="#bfe0ef"/>
      <circle cx="310" cy="42" r="24" fill="#ffd76a"/>
      <ellipse cx="80" cy="48" rx="34" ry="15" fill="#eaf3fa"/>
      <rect x="0" y="${земля}" width="360" height="${низ - земля}" fill="#8fae62"/>
      <path d="M296 ${земля} L296 ${земля - 40} L352 ${земля - 40} L352 ${земля} Z" fill="#c98a5a" stroke="#7c5230" stroke-width="2.6"/>
      <path d="M288 ${земля - 40} L324 ${земля - 64} L360 ${земля - 40} Z" fill="#a8503c" stroke="#7c3326" stroke-width="2.6"/>
      <rect x="312" y="${земля - 27}" width="20" height="27" fill="#8a5a3a" stroke="#5e3a24" stroke-width="2"/>`;
    return `
      <rect x="0" y="0" width="360" height="${земля}" fill="#bfe0ef"/>
      <circle cx="308" cy="38" r="22" fill="#ffd76a"/>
      <ellipse cx="70" cy="46" rx="34" ry="15" fill="#eaf3fa"/>
      <ellipse cx="112" cy="52" rx="24" ry="11" fill="#eaf3fa"/>
      <rect x="0" y="${земля}" width="360" height="${низ - земля}" fill="#8fae62"/>
      <path d="M28 ${земля} C28 ${земля - 40} 34 ${земля - 64} 44 ${земля - 82}" stroke="#6f8f4a" stroke-width="3" fill="none"/>
      <path d="M328 ${земля} C328 ${земля - 34} 322 ${земля - 58} 312 ${земля - 74}" stroke="#6f8f4a" stroke-width="3" fill="none"/>`;
  }

  /* ============ СЦЕНЫ СТРАНИЦ-РАЗВИЛОК (индексы 1, 4, 9) ============
     До правки развилка была голым вопросом: две кнопки на пустом фоне, ни
     героев, ни предмета выбора. Ребёнок 6–7 лет терял нить: непонятно, где
     он и что сравнивает. Теперь у каждой развилки своя сцена: сад или двор,
     оба героя и ТОТ САМЫЙ предмет, о котором спрашивают.
     Кадр короткий (360×178) намеренно: под облачком с вопросом и кнопками
     должно остаться место на экране 390×640, иначе сцена уходит под сгиб. */
  const ВЫСОТА_РАЗВИЛКИ = 178;
  /* Сцена разворота истории ниже: решение рисуется планшетом в рост героя, и
     при высоте развилки внизу оставалось пустое поле травы. */
  const ВЫСОТА_РАЗВОРОТА = 118;
  const ЛИНИЯ_РАЗВОРОТА = 104;
  /* Сцена-итог выше: герои прощаются в полный рост, а на столбе висят три
     плашки с правилами. */
  const ВЫСОТА_ИТОГА = 210;
  const ЛИНИЯ_ИТОГА = 110;

  /* Подпись с числами поверх травы: тёмная обводка держит контраст. */
  const подписьРазвилки = (x, y, t, р) => `<text x="${x}" y="${y}" text-anchor="middle" ${ТЕКСТ}
      font-size="${р || 14}" font-weight="bold" fill="#fdf6e0" ${ОБВОД(4)}>${t}</text>`;

  /* Общее обрамление сцены развилки: небо и земля по краям фигур.
     Линия земли на 78 — не выше: грядки и корзины поднимаются вверх, а под
     фигурами должен остаться кусок травы, иначе они стоят на самой кромке
     кадра. Кадр низкий намеренно: под ним ещё облачко с вопросом и кнопки,
     и на экране 390×640 всё вместе должно попадать в поле зрения. */
  const ЛИНИЯ_РАЗВИЛКИ = 78;
  const рамаРазвилки = (scene) => `${фон(scene === 'yard' ? 'yard' : 'garden', ЛИНИЯ_РАЗВИЛКИ, ВЫСОТА_РАЗВИЛКИ)}
      <line x1="0" y1="${ЛИНИЯ_РАЗВИЛКИ}" x2="360" y2="${ЛИНИЯ_РАЗВИЛКИ}" stroke="#4a7a33" stroke-width="2"/>`;

  /* Ветка первая: две грядки, на левой 4 морковки, на правой 6.
     Морковки СТОЯТ на грядке: у лежащей на боку была видна одна ботва, и
     грядка читалась как трава. Стоящая морковка показывает и оранжевое
     тело, и ботву — то, что ребёнок и должен сравнивать. */
  function сценаГрядок(){
    const доска = (x, ш) => `<rect x="${x}" y="66" width="${ш}" height="10" rx="5"
        fill="#a9773f" stroke="#6f4a24" stroke-width="1.8"/>`;
    const грядка = (n, x, шаг, s, ш, y) => {
      let out = '';
      for (let i = 0; i < n; i++) out += морковь(x + i * шаг, y || 61, s);
      return out + доска(x - 14, ш);
    };
    return рамаРазвилки('garden') +
      грядка(4, 42, 32, 0.72, 136, 54) +
      грядка(6, 180, 28, 0.64, 172, 54) +
      `<line x1="163" y1="24" x2="163" y2="86" stroke="#6f4a24" stroke-width="2" stroke-dasharray="5 5"/>` +
      подписьРазвилки(88, 94, 'первая: 4', 14) +
      подписьРазвилки(258, 94, 'вторая: 6', 14);
  }

  /* Ветка вторая: длинная грядка с редкой морковкой и короткая с густой. */
  function сценаЛовушки(){
    const доска = (x, ш) => `<rect x="${x}" y="66" width="${ш}" height="10" rx="5"
        fill="#a9773f" stroke="#6f4a24" stroke-width="1.8"/>`;
    const грядка = (n, x, шаг, s, ш, y) => {
      let out = '';
      for (let i = 0; i < n; i++) out += морковь(x + i * шаг, y || 61, s);
      return out + доска(x - 14, ш);
    };
    /* Длинная грядка — редкая морковка, короткая — густая: длина есть, а
       моркови на короткой больше. Это и есть ловушка страницы. */
    return рамаРазвилки('garden') +
      грядка(4, 40, 44, 0.76, 164, 54) +
      грядка(5, 218, 28, 0.62, 138, 54) +
      подписьРазвилки(97, 94, 'длинная: 4', 14) +
      подписьРазвилки(273, 94, 'короткая: 5', 14);
  }

  /* Ветка третья: корзина Насти и корзина Батюшки, 7 и 5 грибов.
     Грибы стоят кучками на земле и обведены кольцами у лишних, а корзины
     лежат рядом — так видно и «сколько», и «у кого больше». */
  function сценаКорзин(){
    const корзина = (x, цв) => `<g>
      <path d="M${x - 24} 66 L${x + 24} 66 L${x + 17} 79 L${x - 17} 79 Z"
        fill="${цв}" stroke="#7c5230" stroke-width="2.2"/>
      <path d="M${x - 22} 72 L${x + 22} 72" stroke="#8a6a45" stroke-width="1.4"/>
      <path d="M${x - 20} 66 C${x - 16} 53 ${x + 16} 53 ${x + 20} 66"
        fill="none" stroke="#7c5230" stroke-width="2"/>
    </g>`;
    const грибыРяд = (n, x, y, меньш) => {
      let out = '';
      for (let i = 0; i < n; i++){
        out += грибМелкий(x + i * 19, y, 1.05);
        if (i >= меньш) out += `<circle cx="${x + i * 19}" cy="${y - 4}" r="12.5"
          fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-dasharray="4 3"/>`;
      }
      return out;
    };
    /* У Насти 7 грибов — два ряда, два верхних обведены: они и есть
       «больше». У Батюшки 5 — один ряд, кольца нет. */
    return рамаРазвилки('yard') +
      грибыРяд(4, 16, 46, 4) + грибыРяд(3, 16, 64, 0) +
      корзина(56, '#c98a5a') +
      грибыРяд(5, 206, 64, 0) +
      корзина(252, '#a8503c') +
      подписьРазвилки(56, 96, 'Настя: 7', 13) + подписьРазвилки(252, 96, 'Батюшка: 5', 13);
  }

  /* ── сцена разворота истории (индекс 12) ────────────────────────────
     Список решений был просто строками текста. Теперь решения показаны
     дощечками на щите — верное отмечено зелёной галкой, ошибочное
     крестиком, — а рядом стоят герои и держат щит. */
  function сценаРазворота(очередь){
    const метки = (очередь || []).slice(0, 3).map(v => !!v);
    /* Рамка разворота ниже развилки, поэтому у неё своя линия земли: иначе
       под планшетом оставалось пустое поле травы в половину кадра. */
    const земля = ЛИНИЯ_РАЗВОРОТА, высота = ВЫСОТА_РАЗВОРОТА;
    const фонСцены = `${фон('garden', земля, высота)}
      <line x1="0" y1="${земля}" x2="360" y2="${земля}" stroke="#4a7a33" stroke-width="2"/>`;
    /* Планшет: одна доска на все три решения, слоты нарисованы заранее, а
       сверху кладутся отметки — верное зелёной галкой, ошибочное красным
       крестиком. Доска стоит НА линии земли и не выше героев. */
    const доска = (i) => {
      const y = 56 + i * 15;
      if (i >= метки.length) return '';
      const ок = метки[i];
      return `<g>
        <rect x="145" y="${y}" width="70" height="13" rx="4" fill="#fdf6e0" stroke="#7c5230" stroke-width="1.6"/>
        <path d="${ок ? `M${155} ${y + 7} l3.5 4 l8 -9` : `M${156} ${y + 2.5} l9 9 M${165} ${y + 2.5} l-9 9`}"
          stroke="${ок ? '#2f6b46' : '#a8503c'}" stroke-width="2.2" fill="none"
          stroke-linecap="round" stroke-linejoin="round"/>
      </g>`;
    };
    const щит = `<g>
      <rect x="176" y="92" width="8" height="12" fill="#8a5a3a" stroke="#5e3a24" stroke-width="1.8"/>
      <rect x="138" y="50" width="84" height="48" rx="7" fill="#c98a5a" stroke="#7c5230" stroke-width="2.4"/>
      ${[0, 1, 2].map(i => `<rect x="145" y="${56 + i * 15}" width="70" height="13" rx="4"
        fill="#fdf6e0" stroke="#7c5230" stroke-width="1.6" opacity=".4"/>`).join('')}
      ${[0, 1, 2].map(доска).join('')}
    </g>`;
    return фонСцены +
      `<circle cx="52" cy="14" r="13" fill="#ffd76a"/>` +
      фигура({ kind: 'farmer', emo: 'think' }, 16, земля, 74) +
      фигураВлево({ kind: 'girl', emo: 'wow' }, 270, земля, 74) +
      щит;
  }

  /* ── сцена-итог (индекс 13): герои прощаются, три правила на щите ──
     Правила — три плашки на столбе между героями. Раньше они стояли
     справа и наезжали на лица: подписи теперь внутри плашек, а облачка
     прощания подняты в небо и стоят над головами фигур. */
  function сценаИтога(){
    const земля = ЛИНИЯ_ИТОГА, высота = ВЫСОТА_ИТОГА;
    const знак = (y, т) => `<g>
      <rect x="136" y="${y}" width="88" height="22" rx="5" fill="#fdf6e0" stroke="#7c5230" stroke-width="1.8"/>
      <text x="180" y="${y + 16}" text-anchor="middle" ${ТЕКСТ} font-size="14"
        font-weight="bold" fill="#2a2118">${т}</text>
    </g>`;
    /* Облачка прощания стоят НА ТРАВЕ у ног героев: в небе они наезжали
       на плашки правил, а плашки — на лица. */
    const облачко = (x, y, т) => `<g>
      <rect x="${x}" y="${y}" width="62" height="28" rx="11" fill="#fdf6e0" stroke="#c9b48a" stroke-width="1.6"/>
      <text x="${x + 31}" y="${y + 19}" text-anchor="middle" ${ТЕКСТ} font-size="15" font-weight="bold" fill="#2a2118">${т}</text>
    </g>`;
    return `${фон('garden', земля, высота)}
      <line x1="0" y1="${земля}" x2="360" y2="${земля}" stroke="#4a7a33" stroke-width="2"/>` +
      `<circle cx="52" cy="18" r="14" fill="#ffd76a"/>` +
      /* столб с тремя плашками стоит на линии земли и растёт вверх */
      `<rect x="175" y="92" width="10" height="18" fill="#8a5a3a" stroke="#5e3a24" stroke-width="2"/>` +
      `<rect x="128" y="14" width="104" height="80" rx="8" fill="#c98a5a" stroke="#7c5230" stroke-width="2.4"/>` +
      знак(20, 'столько же') + знак(46, 'больше') + знак(72, 'меньше') +
      фигура({ kind: 'farmer', emo: 'smile' }, 8, земля, 118) +
      фигураВлево({ kind: 'girl', emo: 'smile' }, 246, земля, 118) +
      облачко(6, 118, 'Пока!') + облачко(292, 118, 'Пока!') +
      `<text x="180" y="${высота - 6}" text-anchor="middle" ${ТЕКСТ} font-size="10"
        fill="#fdf6e0" ${ОБВОД(3)}>Сравниваем предметы — не длину, не вес и не место</text>`;
  }

  /* ── врезка-правило (индекс 3): три пары предметов ─────────────────
     Было `art:'none'` — правило только словами. Ребёнку 6–7 лет правило без
     предмета не правило: рисуем три случая и к каждому живую пару.
     Каждый случай — своя строка: (а) каждой нашлась пара, (б) осталась
     лишняя, (в) лишняя у другого. Подписи стоят НАД предметами: под ними
     линия земли, и текст наезжал на грибы. */
  function врезкаПравило(){
    const надзаголовок = (x, y, t, цв) => `<text x="${x}" y="${y}" ${ТЕКСТ}
      font-size="15" font-weight="bold" fill="${цв}">${t}</text>`;
    const пояснение = (y, t, цв, x) => `<text x="${x || 262}" y="${y}" text-anchor="middle"
      ${ТЕКСТ} font-size="13" font-weight="bold" fill="${цв}">${t}</text>`;
    /* Грибы стоят НА линии земли каждой строки: шляпка выше, ножка у самой
       травы. Раньше ножка уходила под линию, и гриб «сидел» в траве. */
    const грибы = (n, x, y, s, меньш) => {
      let out = '';
      for (let i = 0; i < n; i++){
        out += грибМелкий(x + i * 24, y - 11 * s, s);
        if (меньш != null && i >= меньш) out += `<circle cx="${x + i * 24}" cy="${y - 22 * s}"
          r="${13 * s}" fill="none" stroke="#c9902a" stroke-width="2.6" stroke-dasharray="4 3"/>`;
      }
      return out;
    };
    /* Пунктирная нитка «пара — паре»: одной нашлась пара у другой. */
    const нитка = (x0, x1, y) => `<path d="M${x0} ${y} L${x1} ${y}" stroke="#8a6a45"
      stroke-width="2" stroke-dasharray="5 4"/>`;
    return `<svg viewBox="0 0 360 250" width="100%" style="display:block">
      <rect x="0" y="0" width="360" height="250" rx="12" fill="#fdf6e0"/>
      <rect x="6" y="6" width="348" height="76" rx="10" fill="#ffffff" stroke="#3c6b26" stroke-width="2"/>
      <rect x="6" y="86" width="348" height="76" rx="10" fill="#ffffff" stroke="#a8503c" stroke-width="2"/>
      <rect x="6" y="166" width="348" height="76" rx="10" fill="#ffffff" stroke="#2f5f8a" stroke-width="2"/>

      ${надзаголовок(18, 26, 'Столько же', '#3c6b26')}
      <line x1="18" y1="66" x2="342" y2="66" stroke="#6aa34e" stroke-width="2"/>
      ${грибы(4, 32, 66, 0.9)}
      ${нитка(40, 140, 66)}
      ${грибы(4, 152, 66, 0.9)}
      ${пояснение(26, 'лишних нет', '#3c6b26')}

      ${надзаголовок(18, 106, 'Больше', '#a8503c')}
      <line x1="18" y1="146" x2="342" y2="146" stroke="#6aa34e" stroke-width="2"/>
      ${грибы(4, 32, 146, 0.9)}
      ${нитка(40, 140, 146)}
      ${грибы(5, 152, 146, 0.9, 4)}
      ${пояснение(106, 'осталась лишняя', '#a8503c')}

      ${надзаголовок(18, 186, 'Меньше', '#2f5f8a')}
      <line x1="18" y1="226" x2="342" y2="226" stroke="#6aa34e" stroke-width="2"/>
      ${грибы(5, 32, 226, 0.9, 4)}
      ${нитка(40, 140, 226)}
      ${грибы(4, 152, 226, 0.9)}
      ${пояснение(186, 'лишняя у другого', '#2f5f8a')}
    </svg>`;
  }

  /* ── сцена живого сравнения ────────────────────────────────────────── */
  function сценаСравнения(d, пары){
    const рисуй = предметы[d.icon] || морковь;
    /* Раскладка «в кучке»: до РЯД_МАКС в ряд, остаток переносится выше.
       Раньше в режиме пар все предметы получали одну и ту же координату и
       рисовались друг поверх друга — вместо семи грибов был один. */
    const шаг = 46, РЯД_МАКС = 3, МАСШТАБ = 0.95;
    const ВЫСОТА_РЯДА = 40;
    const рядов = (n) => Math.max(1, Math.ceil(n / РЯД_МАКС));
    /* Кольцо должно сесть на тот же предмет, что нарисован: ряд считаем по
       ОБЩЕЙ сетке, а не по числу рядов самой кучки — иначе кольцо уезжало на
       два ряда вниз и висело в траве. */
    const место = (i, x0) => ({
      x: x0 + (i % РЯД_МАКС) * шаг,
      y: низ - Math.floor(i / РЯД_МАКС) * ВЫСОТА_РЯДА,
      стр: Math.floor(i / РЯД_МАКС)
    });
    const сажай = (кучка, x0) => {
      const R = рядов(кучка.n);
      let s = '';
      for (let i = 0; i < кучка.n; i++){
        const x = x0 + (i % РЯД_МАКС) * шаг;
        const стр = Math.floor(i / РЯД_МАКС);
        const y = низ - (R - 1 - стр) * ВЫСОТА_РЯДА;
        s += рисуй(x, y, МАСШТАБ);
      }
      return s;
    };
    /* Пока вывода нет, полотно короче: иначе внизу остаётся зияющее поле.
       Место под вывод дорисовывается вместе с ним. */
    /* Запас сверху: при трёх рядах верхний ряд уходил за верх кадра. */
    const земля = пары ? 340 : 280;
    const низ = земля - (пары ? 72 : 62);
    let s = фон('garden', земля);
    s += сажай(d.a, 34);
    s += сажай(d.b, 220);
    /* Подписи кладём ниже всех кучков, но ВЫШЕ линии земли: там под ними
       тёмно-зелёная земля, а на земле светлый текст давал контраст 1.6:1.
       Обводка держит читаемость на любом фоне. */
    const подпись = (x, текст) => `<text x="${x}" y="${пары ? 376 : 330}" text-anchor="middle" font-family="Georgia,serif"
      font-size="20" font-weight="bold" fill="#fdf6e0" stroke="#2f4a1f" stroke-width="5"
      paint-order="stroke" stroke-linejoin="round">${текст}</text>`;
    s += подпись(82, d.a.label + ': ' + d.a.n);
    s += подпись(272, d.b.label + ': ' + d.b.n);
    if (пары){
      const большеСлева = d.a.n > d.b.n;
      const лишних = Math.abs(d.a.n - d.b.n);
      for (let i = 0; i < лишних; i++){
        const idx = Math.min(d.a.n, d.b.n) + i;
        const м = место(idx, большеСлева ? 34 : 220);
        s += `<circle cx="${м.x + 4}" cy="${м.y + 36}" r="16" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-dasharray="4 3"/>`;
      }
      const вывод = d.answer === 'equal' ? 'поровну — лишних нет'
        : (d.answer === 'a' ? d.a.label + ' больше' : d.b.label + ' больше');
      s += `<text x="180" y="404" text-anchor="middle" font-family="Georgia,serif" font-size="24"
        font-weight="bold" fill="${GOLD}" stroke="#2f4a1f" stroke-width="6" paint-order="stroke"
        stroke-linejoin="round">${вывод}</text>`;
    }
    return s;
  }

  function врезка(kind){
    if (kind === 'pairs') return `<svg viewBox="0 0 360 200" width="100%" style="display:block">
      <rect x="0" y="0" width="360" height="200" rx="10" fill="#fdf6e0"/>
      ${[0, 1, 2, 3].map(i => `${морковь(64, 52 + i * 30, 0.62)}
        <path d="M86 ${74 + i * 30} L206 ${74 + i * 30}" stroke="#8a6a45" stroke-width="2" stroke-dasharray="5 4"/>
        ${морковь(212, 52 + i * 30, 0.62)}`).join('')}
      <text x="180" y="192" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="#6b5b45">каждой нашлась пара</text>
    </svg>`;
    /* Ловушка «длина обманывает»: та же пара грядок, что на развилке, но
       числа видны прямо на них. Раньше здесь была пустая заглушка в 40
       единиц — страница разбора показывала пустой экран. */
    if (kind === 'two-baskets'){
      const доска = (x, ш) => `<rect x="${x}" y="66" width="${ш}" height="9" rx="4"
        fill="#a9773f" stroke="#6f4a24" stroke-width="1.6"/>`;
      const грядка = (n, x, шаг, sc, ш) => {
        let out = '';
        for (let i = 0; i < n; i++) out += морковь(x + i * шаг, 61, sc);
        return out + доска(x - 10, ш);
      };
      return `<svg viewBox="0 0 360 116" width="100%" style="display:block">
        <rect x="0" y="0" width="360" height="116" rx="10" fill="#fdf6e0"/>
        ${грядка(4, 40, 42, 0.6, 142)}
        ${грядка(6, 196, 26, 0.54, 154)}
        <line x1="163" y1="14" x2="163" y2="56" stroke="#6f4a24" stroke-width="2" stroke-dasharray="5 5"/>
        <line x1="14" y1="80" x2="346" y2="80" stroke="#6aa34e" stroke-width="2"/>
        <text x="80" y="102" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#6b5b45">длинная: 4</text>
        <text x="272" y="102" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#6b5b45">короткая: 6</text>
      </svg>`;
    }
    return `<svg viewBox="0 0 360 40" width="100%" style="display:block"></svg>`;
  }

  const CSS = `
  #lvis .ncb{box-sizing:border-box;width:100%;max-width:560px;margin:0 auto;font-family:Georgia,'Times New Roman',serif;color:#f6efe0}
  #lvis .ncb *{box-sizing:border-box}
  #lvis .ncb .sheet{display:flex;flex-direction:column;gap:14px;width:100%}
  #lvis .ncb .top{display:flex;align-items:baseline;justify-content:space-between;gap:10px;
    border-bottom:1.5px solid rgba(255,215,106,.28);padding-bottom:8px}
  #lvis .ncb .book{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:${MUT}}
  #lvis .ncb .dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:rgba(255,215,106,.28);margin-left:6px}
  #lvis .ncb .dot.on{background:${GOLD}}
  #lvis .ncb .dot.no{background:#e8917c}
  #lvis .ncb .frame{border:1.5px solid rgba(255,215,106,.28);border-radius:14px;overflow:hidden;
    background:linear-gradient(180deg,#22362c,#17261e)}
  #lvis .ncb .frame svg{display:block;width:100%;height:auto}
  #lvis .ncb .say{display:flex;gap:12px;align-items:flex-start}
  #lvis .ncb .face{flex:0 0 76px;width:76px;height:84px}
  #lvis .ncb .bubble{flex:1 1 auto;min-width:0;position:relative;background:#fdf6e0;color:#2a2118;
    border-radius:14px;padding:12px 14px;font-size:17px;line-height:1.5}
  #lvis .ncb .bubble::before{content:'';position:absolute;left:-9px;top:22px;width:0;height:0;
    border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:10px solid #fdf6e0}
  #lvis .ncb .who{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#8a6a1f;margin-bottom:4px}
  #lvis .ncb h2{font-size:20px;line-height:1.2;margin:0;color:#f6efe0}
  #lvis .ncb .cap{font-size:15px;line-height:1.45;color:${MUT};margin:0}
  #lvis .ncb .thinking{border:1.5px dashed rgba(255,215,106,.45);border-radius:12px;padding:12px 14px;
    font-size:17px;line-height:1.5;color:${GOLD};background:rgba(255,215,106,.06);text-align:center}
  #lvis .ncb .opts{display:flex;flex-direction:column;gap:10px}
  #lvis .ncb .opt{display:flex;align-items:center;gap:12px;width:100%;min-height:56px;text-align:left;
    padding:12px 14px;border-radius:12px;border:1.5px solid rgba(255,215,106,.35);background:rgba(255,253,247,.94);
    color:#2a2118;font-family:Georgia,serif;font-size:17px;line-height:1.35;cursor:pointer;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),border-color 140ms,background 140ms}
  #lvis .ncb .opt:hover{border-color:${GOLD}}
  #lvis .ncb .opt:active{transform:translateY(2px)}
  #lvis .ncb .opt:disabled{cursor:default}
  #lvis .ncb .opt .k{flex:none;width:32px;height:32px;border-radius:50%;border:1.5px solid #b9a67f;
    display:flex;align-items:center;justify-content:center;font-size:16px;color:#6b5b45}
  #lvis .ncb .opt.right{border-color:#2f6b46;background:#eef6ef}
  #lvis .ncb .opt.right .k{border-color:#2f6b46;color:#2f6b46}
  #lvis .ncb .opt.wrong{border-color:#9c2f22;background:#fbeeec}
  #lvis .ncb .opt.wrong .k{border-color:#9c2f22;color:#9c2f22}
  #lvis .ncb .next{width:100%;min-height:52px;padding:12px 16px;border-radius:12px;cursor:pointer;
    border:1.5px solid rgba(255,215,106,.5);background:linear-gradient(180deg,#ffd76a,#e2b23f);
    color:#20180a;font-family:Georgia,serif;font-size:17px;font-weight:600;
    transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .ncb .next:active{transform:translateY(2px)}
  #lvis .ncb .turn{border-top:1.5px solid rgba(255,215,106,.28);padding-top:12px}
  #lvis .ncb .turn h3{margin:0 0 8px;font-size:18px;color:${GOLD}}
  #lvis .ncb .turn p{margin:0;font-size:16px;line-height:1.55;color:#f6efe0}
  #lvis .ncb .score{font-size:16px;color:${GOLD};text-align:center}
  #lvis .ncb .story{display:flex;flex-direction:column;gap:10px}
  #lvis .ncb .srow{display:flex;gap:10px;align-items:flex-start;border:1.5px solid rgba(255,215,106,.28);
    border-radius:12px;padding:10px 12px;background:rgba(255,255,255,.04)}
  #lvis .ncb .srow .mark{flex:none;font-size:18px}
  #lvis .ncb .srow .txt{font-size:16px;line-height:1.45}
  #lvis .ncb .srow .txt b{color:${GOLD}}
  #lvis .ncb .srow .txt i{font-style:normal;color:${MUT}}
  #lvis .ncb .sheet.fork{gap:10px}
  #lvis .ncb .sheet.fork .top{padding-bottom:6px}
  #lvis .ncb .sheet.fork h2{font-size:19px}
  #lvis .ncb .sheet.fork .opts{gap:8px}
  #lvis .ncb .sheet.fork .opt{min-height:52px;padding:8px 12px;gap:10px;font-size:16px;line-height:1.25}
  #lvis .ncb .sheet.fork .bubble{padding:10px 12px;font-size:16px;line-height:1.4}
  #lvis .ncb .sheet.fork .say{gap:10px}
  #lvis .ncb .sheet.fork .face{flex:0 0 58px;width:58px;height:64px}
  /* значок-предмет на кнопке выбора: ребёнок видит, чем один вариант
     отличается от другого, ещё до нажатия */
  #lvis .ncb .opt .ic{flex:none;width:46px;height:40px;border-radius:9px;
    background:rgba(180,150,90,.16);border:1px solid rgba(120,95,45,.35);
    display:flex;align-items:center;justify-content:center}
  #lvis .ncb .opt .ic svg{display:block}
  #lvis .ncb .opt .tx{flex:1 1 auto;min-width:0}
  /* карточка решения на развороте истории */
  #lvis .ncb .dcard{display:flex;gap:10px;align-items:flex-start;border-radius:12px;
    border:1.5px solid rgba(255,215,106,.3);background:rgba(255,255,255,.05);padding:10px 12px}
  #lvis .ncb .dcard.ok{border-color:#8fd1a8;background:rgba(143,209,168,.12)}
  #lvis .ncb .dcard.no{border-color:#e8917c;background:rgba(232,145,124,.12)}
  #lvis .ncb .dcard .mark{flex:none;width:26px;height:26px;border-radius:50%;display:flex;
    align-items:center;justify-content:center;font-size:15px;font-weight:700;
    background:rgba(255,215,106,.16);border:1.5px solid rgba(255,215,106,.5);color:${GOLD}}
  #lvis .ncb .dcard.ok .mark{background:rgba(143,209,168,.2);border-color:#8fd1a8;color:#d6f3e2}
  #lvis .ncb .dcard.no .mark{background:rgba(232,145,124,.2);border-color:#e8917c;color:#ffe2da}
  #lvis .ncb .dcard .qs{font-size:12px;letter-spacing:.06em;color:${MUT};line-height:1.3}
  #lvis .ncb .dcard .ch{font-size:16px;line-height:1.3;margin:3px 0 0}
  #lvis .ncb .dcard .vd{font-size:13px;line-height:1.35;color:${MUT};margin:4px 0 0}
  #lvis .ncb .dcard.ok .vd{color:#cdeedb}
  #lvis .ncb .dcard.no .vd{color:#ffd9d0}
  @media (prefers-reduced-motion:reduce){#lvis .ncb *{transition:none!important;animation:none!important}}
  @media (max-width:360px){#lvis .ncb .face{flex:0 0 62px;width:62px;height:70px}
    #lvis .ncb .bubble{font-size:16px}#lvis .ncb .opt{font-size:16px}}
  `;

  function injectCss(){
    if (document.getElementById('ncb-css')) return;
    const s = document.createElement('style');
    s.id = 'ncb-css'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function ключ(){ return 'ncb' + ID; }
  function состояние(){
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[ключ()]) CHS[ключ()] = { page: 0, верных: 0, выборы: [], живые: {} };
    return CHS[ключ()];
  }

  /* ── связь с приложением ────────────────────────────────────────────
     Приложение листает урок своим счётчиком LV.step (нижние кнопки
     «Дальше ▶» / «◀ Назад» и lvStep), а движок рисовал страницу из своего
     CHS[...].page. Счётчики были не связаны: ребёнок жал нижнюю «Дальше» —
     кадр стоял на первой странице, а точки и номер шага уезжали вперёд.
     Теперь оба счётчика идут вместе: рисовать() берёт страницу из LV.step,
     а свои переходы движок пишет и в состояние, и в LV.step. */
  const шагов = () => КНИГА.pages.length;
  function шаг(){ return (typeof LV !== 'undefined' && LV && typeof LV.step === 'number') ? LV.step : null; }
  /* Поставить страницу n: обновляет состояние и LV.step. */
  function страница(n){
    const st = состояние();
    const к = Math.max(0, Math.min(шагов() - 1, n | 0));
    st.page = к;
    if (typeof LV !== 'undefined' && LV) LV.step = к;
    return к;
  }
  /* Перерисовать кадр после смены страницы своим переходом: если открыт
     экран урока — через renderLessonView (точки и номер шага сверху тоже
     обновятся), а если движок рисуют напрямую — просто перерисовать. */
  function перейти(n){
    страница(n);
    if (typeof LV !== 'undefined' && LV && LV.phase === 'explain' && typeof renderLessonView === 'function'){
      renderLessonView();
      return;
    }
    перерисовать();
  }

  function рисовать(el){
    injectCss();
    const st = состояние();
    const страницы = КНИГА.pages;
    /* Страницу берём из LV.step: это счётчик приложения, и именно его
       двигают нижние кнопки урока. Состояние подтягиваем под него. */
    const с = шаг();
    if (с !== null){
      const к = Math.max(0, Math.min(страницы.length - 1, с));
      if (st.page !== к) st.page = к;
    }
    const n = Math.max(0, Math.min(страницы.length - 1, st.page));
    const p = страницы[n];
    const части = [];
    /* Высота кадра у страниц разная: у сравнения полотно выше, у развилки
       низкое — под ним ещё облачко с вопросом и кнопки. */
    let рамка = 340;

    const точки = страницы.map((x, i) => {
      const выбор = st.выборы.find(v => v.page === i);
      const cls = выбор ? (выбор.ok ? 'dot on' : 'dot no') : (i === n ? 'dot on' : 'dot');
      return `<span class="${cls}"></span>`;
    }).join('');
    части.push(`<div class="top"><span class="book">${КНИГА.book}</span><span>${точки}</span></div>`);

    if (p.art === 'compare'){
      const показывать = st.живые[n] || p.auto;
      рамка = показывать ? 420 : 360;
      части.push(`<div class="frame"><svg viewBox="0 0 360 ${рамка}" width="100%">${сценаСравнения(p, показывать)}</svg></div>`);
      if (p.t) части.push(`<h2>${p.t}</h2>`);
      if (p.cap) части.push(`<p class="cap">${p.cap}</p>`);
      if (p.thinking) части.push(`<div class="thinking">${p.thinking}</div>`);
      const ответы = [
        { t: p.a.label + ' больше', v: 'a' },
        { t: p.b.label + ' больше', v: 'b' },
        { t: 'их поровну', v: 'equal' }
      ];
      const был = st.выборы.find(v => v.page === n);
      if (!был){
        /* На кнопке — та же кучка, что нарисована в кадре: ребёнок видит
           оба варианта и понимает, чем рискует, ещё до нажатия. */
        части.push(`<div class="opts">${ответы.map((o, i) =>
          `<button class="opt" onclick="ncbСравнить(${i})"><span class="k">${i + 1}</span><span class="tx">${o.t}</span></button>`).join('')}</div>`);
      } else {
        части.push(`<div class="opts">${ответы.map((o, i) => {
          const верно = o.v === p.answer;
          const выбран = был.ответ === o.v;
          return `<button class="opt ${верно ? 'right' : (выбран ? 'wrong' : '')}" disabled>
            <span class="k">${верно ? '✓' : i + 1}</span><span class="tx">${o.t}</span></button>`;
        }).join('')}</div>`);
        части.push(`<div class="turn"><h3>${был.ok ? 'Верно' : 'Смотри внимательнее'}</h3><p>${p.explain || ''}</p></div>`);
        части.push(`<button class="next" onclick="ncbДальше()">Дальше →</button>`);
      }
      el.innerHTML = `<div class="ncb"><div class="sheet">${части.join('')}</div></div>`;
      return;
    }

    /* ===== СТРАНИЦА-РАЗВИЛКА =====
       Сцена + оба героя + предмет выбора, вопрос в облачке, кнопки ПОД сценой.
       До правки здесь был только вопрос и кнопки: ни рисунка, ни героев. */
    if (p.ask){
      const живёт = !!st.живые[n];
      рамка = ВЫСОТА_РАЗВИЛКИ;
      const сцена = n === 1 ? сценаГрядок()
        : n === 4 ? сценаЛовушки()
        : n === 9 ? сценаКорзин()
        : `${фон(p.art === 'yard' ? 'yard' : 'garden', 130, ВЫСОТА_РАЗВИЛКИ)}<line x1="0" y1="130" x2="360" y2="130" stroke="#4a7a33" stroke-width="2"/>`;
      части.push(`<div class="frame"><svg viewBox="0 0 360 ${рамка}" width="100%">${сцена}</svg></div>`);
      if (p.t) части.push(`<h2>${p.t}</h2>`);
      const был = st.выборы.find(v => v.page === n);
      if (был){
        части.push(`<div class="opts">${p.opts.map((o, i) => {
          const верно = o.sound === 'ok';
          const выбран = был.выбор === o.t;
          return `<button class="opt ${верно ? 'right' : (выбран ? 'wrong' : '')}" disabled>
            <span class="k">${верно ? '✓' : '✕'}</span><span class="tx">${o.t}</span></button>`;
        }).join('')}</div>`);
        части.push(`<div class="turn"><h3>${был.ok ? 'Верно' : 'Смотри внимательнее'}</h3>
          <p>${был.пояснение || (был.ok ? 'Так и есть.' : 'Попробуй ещё раз.')}</p></div>`);
        части.push(`<button class="next" onclick="ncbДальше()">Дальше →</button>`);
      } else {
        части.push(`<div class="say"><div class="face">${(лица[(p.who && p.who.kind) || 'farmer'])((p.who && p.who.emo) || 'think')}</div>
          <div class="bubble"><span class="who">${(p.who && p.who.name) || 'Батюшка'}</span>${p.ask}</div></div>`);
        части.push(`<div class="opts">${p.opts.map((o, i) =>
          `<button class="opt" onclick="ncbВыбор(${i})"><span class="k">${i + 1}</span><span class="tx">${o.t}</span></button>`).join('')}</div>`);
      }
      el.innerHTML = `<div class="ncb"><div class="sheet fork">${части.join('')}</div></div>`;
      return;
    }

    if (p.art === 'story'){
      /* Разворот истории: сцена с героями сверху, а решения ребёнка —
         карточками с пометкой верно/ошибочно. До правки это был пустой
         экран со списком строк. */
      const выборы = st.выборы;
      const ряд = st.живые;
      const карточка = (v, i) => {
        const страница = страницы[v.page];
        const вопрос = страница.ask || страница.t || 'Выбор';
        return `<div class="dcard ${v.ok ? 'ok' : 'no'}">
          <span class="mark">${v.ok ? '✓' : '✕'}</span>
          <span class="tx"><span class="qs">${i + 1}. ${вопрос}</span>
            <p class="ch">Ты выбрал: ${v.выбор}</p>
            <p class="vd">${v.ok ? 'Верно. ' : 'Ошибка. '}${v.пояснение || ''}</p></span></div>`;
      };
      const карточки = выборы.map(карточка).join('');
      const итог = выборы.length
        ? `<div class="score">Верных выборов: ${st.верных} из ${выборы.length}</div>`
        : `<p class="cap">Ты ещё не сделал ни одного выбора — история прошла без поворотов.</p>`;
      const картинка = `<div class="frame"><svg viewBox="0 0 360 ${ВЫСОТА_РАЗВОРОТА}" width="100%">${сценаРазворота(выборы.map(v => v.ok))}</svg></div>`;
      if (p.t) части.push(`<h2>${p.t}</h2>`);
      /* Сначала рисунок, потом решения: без рисунка разворот пустой. */
      части.push(картинка);
      if (p.thinking) части.push(`<div class="thinking">${p.thinking}</div>`);
      if (карточки) части.push(`<div class="story">${карточки}</div>`);
      части.push(итог);
      части.push(`<button class="next" onclick="ncbСначала()">Прочитать комикс заново ↺</button>`);
      el.innerHTML = `<div class="ncb"><div class="sheet">${части.join('')}</div></div>`;
      return;
    }

    if (p.art === 'garden' || p.art === 'yard'){
      /* Фигуры привязаны за НИЗ: transform-origin внизу группы, поэтому
         translateY задаёт ровно положение подошв, и посадка не зависит от
         внутренних размеров позы. Раньше считал сдвиг «на бумаге» — не
         сходилось: вложенный svg с width:100% внутри группы ведёт себя не
         как обычная система координат, и фигуры уезжали под землю. */
      /* Поза нарисована в своих координатах 120x130, подошвы — на y=128.
         Коробку берём СТРОГО той же пропорции: при другой пропорции meet
         вписывает фигуру по ширине, коробка выше фигуры, и низ уезжает. */
      const земля = 240, N = (p.hold || []).length || 1;
      const ширина = N > 2 ? 96 : 116, шаг = N > 2 ? 106 : 124;
      /* Высоту кадра считаем от земли: у развилки земля ниже, чем у
         «садовой» сцены, и полотно должно кончаться под фигурами, а не
         оставлять внизу зияющее поле травы. */
      const рост = ширина * 130 / 120;
      const полотно = p.земля ? p.земля + 46 : 340;
      const линия = p.земля || земля;
      const x0 = (360 - (N * шаг - (шаг - ширина))) / 2;
      const фигурки = (p.hold || []).map((ч, i) => {
        const повернуть = (i % 2 === 1);
        const x = x0 + i * шаг, y = линия - рост;
        return `<g transform="translate(${x},${y})${повернуть ? ` translate(${ширина},0) scale(-1,1)` : ''}">
          <svg x="0" y="0" width="${ширина}" height="${рост}" viewBox="0 0 120 130" preserveAspectRatio="xMidYMax meet">${(лица[ч.kind] || лица.farmer)(ч.emo || 'smile')}</svg>
        </g>`;
      }).join('');
      рамка = полотно;
      части.push(`<div class="frame"><svg viewBox="0 0 360 ${полотно}" width="100%">${фон(p.art, линия, полотно)}${фигурки}</svg></div>`);
    } else if (p.art === 'rule'){
      рамка = 250;
      части.push(`<div class="frame" style="background:#fdf6e0">${врезкаПравило()}</div>`);
    } else if (p.art === 'final'){
      рамка = ВЫСОТА_ИТОГА;
      части.push(`<div class="frame"><svg viewBox="0 0 360 ${рамка}" width="100%">${сценаИтога()}</svg></div>`);
    } else if (p.art && p.art !== 'none'){
      части.push(`<div class="frame">${врезка(p.art)}</div>`);
    }
    if (p.t) части.push(`<h2>${p.t}</h2>`);
    if (p.cap) части.push(`<p class="cap">${p.cap}</p>`);
    if (p.thinking) части.push(`<div class="thinking">${p.thinking}</div>`);
    /* У страницы-правила рисунок сам показывает и «столько же», и «больше»,
       и «меньше» — реплика голосом только повторяла бы подписи в трёх
       строках и вытесняла кнопку «Дальше» за нижний край. */
    const правило = (p.art === 'rule');
    if (p.say && !правило){
      части.push(`<div class="say">
        <div class="face">${(лица[(p.who && p.who.kind) || 'farmer'])((p.who && p.who.emo) || 'smile')}</div>
        <div class="bubble"><span class="who">${(p.who && p.who.name) || 'Батюшка'}</span>${p.say}</div>
      </div>`);
    }
    if (p.ask){
      части.push(`<div class="opts">${p.opts.map((o, i) =>
        `<button class="opt" onclick="ncbВыбор(${i})"><span class="k">${i + 1}</span><span>${o.t}</span></button>`).join('')}</div>`);
    } else {
      /* На последней странице своя кнопка ведёт к проверке — как нижняя
         кнопка приложения на предыдущих шагах. */
      const последняя = (n === страницы.length - 1);
      части.push(`<button class="next" onclick="${последняя ? 'ncbКонец()' : 'ncbДальше()'}">${
        последняя ? 'Понял! Проверю себя →' : 'Дальше →'}</button>`);
    }
    el.innerHTML = `<div class="ncb"><div class="sheet">${части.join('')}</div></div>`;
  }

  function перерисовать(){
    const el = document.getElementById('lvis');
    if (el) рисовать(el);
  }
  window.ncbДальше = function(){
    const st = состояние();
    if (st.page >= шагов() - 1){
      window.ncbКонец();
      return;
    }
    перейти(st.page + 1);
  };
  /* Комикс кончился — отдаём уроку его собственный переход: приложение само
     переведёт экран к проверке, и счётчики останутся согласованными. */
  window.ncbКонец = function(){
    if (typeof lvToCheck === 'function' && typeof LV !== 'undefined' && LV && LV.phase === 'explain'){
      lvToCheck();
      return;
    }
    перерисовать();
  };
  window.ncbСначала = function(){
    const st = состояние();
    st.верных = 0; st.выборы = []; st.живые = {};
    перейти(0);
    if (typeof window.scrollTo === 'function') window.scrollTo(0, 0);
  };
  window.ncbВыбор = function(i){
    const st = состояние();
    const p = КНИГА.pages[st.page];
    const o = (p.opts || [])[i];
    if (!o) return;
    const ok = o.sound === 'ok';
    st.выборы.push({ page: st.page, ok, выбор: o.t, пояснение: o.note || '', вопрос: p.ask });
    if (ok) st.верных++;
    /* Развилка ведёт не на соседнюю страницу, а на свою: у верного выбора
       это страница поворота, у неверного — разбор ошибки. Именно поэтому
       переход задаёт goto, а не +1. */
    перейти((typeof o.goto === 'number') ? o.goto : st.page + 1);
  };
  window.ncbСравнить = function(i){
    const st = состояние();
    const p = КНИГА.pages[st.page];
    if (st.выборы.some(v => v.page === st.page)) return;
    const ответ = ['a', 'b', 'equal'][i];
    const ok = ответ === p.answer;
    st.выборы.push({
      page: st.page, ok, ответ,
      выбор: (i === 0 ? p.a.label + ' больше' : i === 1 ? p.b.label + ' больше' : 'их поровну'),
      пояснение: p.explain || ''
    });
    if (ok) st.верных++;
    st.живые[st.page] = true;
    /* Здесь страница не меняется — меняется только картинка: кучки встают
       в пары, лишние обводятся. Рисуем тот же кадр заново. */
    перерисовать();
  };

  window.WAVE_B = window.WAVE_B || {};
  window.WAVE_B[ID] = function(el){ рисовать(el); };
  if (window.ARH_LESSONS && !window.ARH_LESSONS.some(x => x.id === ID)){
    window.ARH_LESSONS.push({
      id: ID, title: КНИГА.title, ico: КНИГА.ico, src: КНИГА.src, subj: 'jun',
      explain: КНИГА.pages.map((p, i) => (i + 1) + '. ' + (p.t || p.ask || 'Кадр')),
      check: КНИГА.check, tasks: КНИГА.tasks
    });
  }
})();
