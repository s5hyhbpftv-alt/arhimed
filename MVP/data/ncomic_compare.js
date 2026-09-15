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

    /* 4. правило словами */
    { art: 'none', who: { name: 'Настя', kind: 'girl', emo: 'wow' },
      t: 'Три слова: больше, меньше, столько же',
      cap: 'Это и есть сравнение.',
      say: 'Столько же — каждой нашлась пара. Больше — есть лишние без пары. Меньше — лишние нашлись в другой кучке. И считать не пришлось!' },

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
      thinking: 'Вот все твои решения. Красная точка — там, где история повернула на разбор ошибки.' },

    /* 14. итог */
    { art: 'none', who: { name: 'Батюшка', kind: 'farmer', emo: 'smile' },
      t: 'Что мы сегодня поняли',
      cap: 'Три слова, которыми пользуются математики.',
      say: 'Столько же — всем предметам нашлась пара. Больше — остались лишние. Меньше — лишние нашлись у другого. Длина, вес и место не помогают: сравниваем сами предметы.' }
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
      <path d="M0 0 C7 8 9 22 0 32 C-9 22 -7 8 0 0 Z" fill="#e2803a" stroke="#8a4a1c" stroke-width="1.4"/>
      <path d="M-6 -6 C-14 -14 -18 -26 -14 -34" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M0 -8 C0 -18 2 -28 6 -34" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M6 -6 C13 -14 20 -22 22 -30" stroke="#4e7f2f" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>`;
  const гриб = (x, y, s) => `<g transform="translate(${x},${y}) scale(${s})">
      <rect x="-4" y="0" width="8" height="18" rx="3" fill="#f0e2c4" stroke="#8a6d4a" stroke-width="1.4"/>
      <path d="M-16 2 C-16 -12 16 -12 16 2 Z" fill="#c65b4a" stroke="#7c3326" stroke-width="1.6"/>
      <circle cx="-6" cy="-4" r="2.4" fill="#f6efe0"/><circle cx="5" cy="-2" r="2" fill="#f6efe0"/>
    </g>`;
  const предметы = { carrot: морковь, mushroom: гриб };

  /* ── фоны ─────────────────────────────────────────────────────────── */
  function фон(scene, земляЗадана){
    const земля = земляЗадана || 240, низ = земля + 200;
    if (scene === 'yard') return `
      <rect x="0" y="0" width="360" height="${земля}" fill="#bfe0ef"/>
      <circle cx="310" cy="42" r="24" fill="#ffd76a"/>
      <ellipse cx="80" cy="48" rx="34" ry="15" fill="#eaf3fa"/>
      <rect x="0" y="${земля}" width="360" height="${низ - земля}" fill="#8fae62"/>
      <path d="M244 ${земля} L244 ${земля - 62} L322 ${земля - 62} L322 ${земля} Z" fill="#c98a5a" stroke="#7c5230" stroke-width="2.6"/>
      <path d="M236 ${земля - 62} L283 ${земля - 94} L330 ${земля - 62} Z" fill="#a8503c" stroke="#7c3326" stroke-width="2.6"/>
      <rect x="270" y="${земля - 40}" width="26" height="40" fill="#8a5a3a" stroke="#5e3a24" stroke-width="2"/>`;
    return `
      <rect x="0" y="0" width="360" height="${земля}" fill="#bfe0ef"/>
      <circle cx="308" cy="38" r="22" fill="#ffd76a"/>
      <ellipse cx="70" cy="46" rx="34" ry="15" fill="#eaf3fa"/>
      <ellipse cx="112" cy="52" rx="24" ry="11" fill="#eaf3fa"/>
      <rect x="0" y="${земля}" width="360" height="${низ - земля}" fill="#8fae62"/>
      <path d="M28 ${земля} C28 ${земля - 40} 34 ${земля - 64} 44 ${земля - 82}" stroke="#6f8f4a" stroke-width="3" fill="none"/>
      <path d="M328 ${земля} C328 ${земля - 34} 322 ${земля - 58} 312 ${земля - 74}" stroke="#6f8f4a" stroke-width="3" fill="none"/>`;
  }

  /* ── живая сцена сравнения ────────────────────────────────────────── */
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
    if (kind === 'two-baskets') return `<svg viewBox="0 0 360 150" width="100%" style="display:block">
      <rect x="0" y="0" width="360" height="150" rx="10" fill="#fdf6e0"/>
      <rect x="26" y="52" width="150" height="12" rx="5" fill="#8a6a45"/>
      ${[0, 1, 2, 3].map(i => морковь(48 + i * 33, 44, 0.62)).join('')}
      <text x="101" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#6b5b45">длинная: 4</text>
      <rect x="196" y="52" width="130" height="12" rx="5" fill="#8a6a45"/>
      ${[0, 1, 2, 3, 4, 5].map(i => морковь(212 + i * 21, 44, 0.62)).join('')}
      <text x="261" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="#6b5b45">короткая: 6</text>
      <text x="180" y="126" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="#9c2f22">длиннее — не значит больше</text>
    </svg>`;
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

  function рисовать(el){
    injectCss();
    const st = состояние();
    const страницы = КНИГА.pages;
    const n = Math.max(0, Math.min(страницы.length - 1, st.page));
    const p = страницы[n];
    const части = [];

    const точки = страницы.map((x, i) => {
      const выбор = st.выборы.find(v => v.page === i);
      const cls = выбор ? (выбор.ok ? 'dot on' : 'dot no') : (i === n ? 'dot on' : 'dot');
      return `<span class="${cls}"></span>`;
    }).join('');
    части.push(`<div class="top"><span class="book">${КНИГА.book}</span><span>${точки}</span></div>`);

    if (p.art === 'compare'){
      const показывать = st.живые[n] || p.auto;
      части.push(`<div class="frame"><svg viewBox="0 0 360 ${показывать ? 420 : 360}" width="100%">${сценаСравнения(p, показывать)}</svg></div>`);
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
        части.push(`<div class="opts">${ответы.map((o, i) =>
          `<button class="opt" onclick="ncbСравнить(${i})"><span class="k">${i + 1}</span><span>${o.t}</span></button>`).join('')}</div>`);
      } else {
        части.push(`<div class="opts">${ответы.map((o, i) => {
          const верно = o.v === p.answer;
          const выбран = был.ответ === o.v;
          return `<button class="opt ${верно ? 'right' : (выбран ? 'wrong' : '')}" disabled>
            <span class="k">${верно ? '✓' : i + 1}</span><span>${o.t}</span></button>`;
        }).join('')}</div>`);
        части.push(`<div class="turn"><h3>${был.ok ? 'Верно' : 'Смотри внимательнее'}</h3><p>${p.explain || ''}</p></div>`);
        части.push(`<button class="next" onclick="ncbДальше()">Дальше →</button>`);
      }
      el.innerHTML = `<div class="ncb"><div class="sheet">${части.join('')}</div></div>`;
      return;
    }

    if (p.art === 'story'){
      части.push(`<h2>${p.t}</h2>`);
      const строки = st.выборы.map((v, i) => {
        const страница = страницы[v.page];
        const вопрос = страница.ask || страница.t || 'Выбор';
        return `<div class="srow"><span class="mark">${v.ok ? '✅' : '🔎'}</span>
          <span class="txt">${i + 1}. <b>${вопрос}</b><br>${v.выбор}<br><i>${v.пояснение || ''}</i></span></div>`;
      }).join('');
      части.push(`<div class="story">${строки || '<p class="cap">Выборов пока не было.</p>'}</div>`);
      if (st.выборы.length) части.push(`<div class="score">Верных выборов: ${st.верных} из ${st.выборы.length}</div>`);
      if (p.thinking) части.push(`<div class="thinking">${p.thinking}</div>`);
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
      const рост = ширина * 130 / 120;
      const x0 = (360 - (N * шаг - (шаг - ширина))) / 2;
      const фигурки = (p.hold || []).map((ч, i) => {
        const повернуть = (i % 2 === 1);
        const x = x0 + i * шаг, y = земля - рост;
        return `<g transform="translate(${x},${y})${повернуть ? ` translate(${ширина},0) scale(-1,1)` : ''}">
          <svg x="0" y="0" width="${ширина}" height="${рост}" viewBox="0 0 120 130" preserveAspectRatio="xMidYMax meet">${(лица[ч.kind] || лица.farmer)(ч.emo || 'smile')}</svg>
        </g>`;
      }).join('');
      части.push(`<div class="frame"><svg viewBox="0 0 360 340" width="100%">${фон(p.art)}${фигурки}</svg></div>`);
    } else if (p.art && p.art !== 'none'){
      части.push(`<div class="frame">${врезка(p.art)}</div>`);
    }
    if (p.t) части.push(`<h2>${p.t}</h2>`);
    if (p.cap) части.push(`<p class="cap">${p.cap}</p>`);
    if (p.thinking) части.push(`<div class="thinking">${p.thinking}</div>`);
    if (p.say){
      части.push(`<div class="say">
        <div class="face">${(лица[(p.who && p.who.kind) || 'farmer'])((p.who && p.who.emo) || 'smile')}</div>
        <div class="bubble"><span class="who">${(p.who && p.who.name) || 'Батюшка'}</span>${p.say}</div>
      </div>`);
    }
    if (p.ask){
      части.push(`<div class="opts">${p.opts.map((o, i) =>
        `<button class="opt" onclick="ncbВыбор(${i})"><span class="k">${i + 1}</span><span>${o.t}</span></button>`).join('')}</div>`);
    } else {
      части.push(`<button class="next" onclick="ncbДальше()">Дальше →</button>`);
    }
    el.innerHTML = `<div class="ncb"><div class="sheet">${части.join('')}</div></div>`;
  }

  function перерисовать(){
    const el = document.getElementById('lvis');
    if (el) рисовать(el);
  }
  window.ncbДальше = function(){
    const st = состояние();
    if (st.page < КНИГА.pages.length - 1) st.page++;
    перерисовать();
  };
  window.ncbСначала = function(){
    const st = состояние();
    st.page = 0; st.верных = 0; st.выборы = []; st.живые = {};
    перерисовать();
  };
  window.ncbВыбор = function(i){
    const st = состояние();
    const p = КНИГА.pages[st.page];
    const o = (p.opts || [])[i];
    if (!o) return;
    const ok = o.sound === 'ok';
    st.выборы.push({ page: st.page, ok, выбор: o.t, пояснение: o.note || '', вопрос: p.ask });
    if (ok) st.верных++;
    st.page = (typeof o.goto === 'number') ? o.goto : st.page + 1;
    перерисовать();
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
