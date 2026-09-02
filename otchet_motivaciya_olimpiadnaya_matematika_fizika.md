# Мотивация школьников 10–17 лет в олимпиадной математике и физике: веб-исследование и рекомендации для интерактивной платформы

*Отчёт аналитика EdTech / педагогики. Подготовлен на основе веб-исследования (web_search, русско- и англоязычные источники), март-апрель 2025. Все ключевые утверждения сопровождаются ссылками (раздел 4).*

---

## 1. Ключевые находки по пунктам

### 1.1. Геймификация в STEM-образовании: что доказано, что спорно

**Доказано (умеренные, но устойчивые эффекты):**
- Свежий систематический обзор + мета-анализ по математике (Educational Psychology Review, 2025, Faísca et al.) подтверждает: геймификация значимо повышает **вовлечённость и мотивацию** в математике в средней школе и вузе, но эффект на *академические результаты* меньше и неоднороден. То есть геймификация — это прежде всего **механизм удержания**, а не сам по себе метод обучения. [Источник](https://link.springer.com/article/10.1007/s10648-025-10108-1)
- Мета-анализ геймификации обучения (Sailer, 2020, Educational Psychology Review) показывает умеренное позитивное влияние на **учебные результаты** (g ≈ 0.49 для когнитивных результатов в ранних обзорах, в более строгих — слабее), с сильной вариацией по дизайну. [Источник](https://eric.ed.gov/?id=EJ1245270)
- Из отдельных элементов сильнее всего работают **points, badges и leaderboards** — но *в сочетании* и при правильном контексте: исследования OSLM (Open Student Learning Model) показывают, что сильнейший эффект на мотивацию дают элементы, связанные с **видимым прогрессом и компетентностью** (points, badges, leaderboards, progress bars), а не с наградой как таковой. [Источник](https://link.springer.com/article/10.1186/s40561-022-00195-w)
- **Интервенции только с badges** дают больший эффект, чем только leaderboards (корейский обзор), — бейджи «безопаснее», чем публичные рейтинги. [Источник](https://www.koreascience.or.kr/article/JAKO202230853598218.pdf)

**Спорно / критично:**
- **Leaderboards — зона риска.** Мета-анализы фиксируют, что для слабых учеников публичные рейтинги **снижают мотивацию** (демотивация от «невозможной» позиции в таблице). Относительные лидерборды (по «близкому кругу»/одноклассникам) вовлекают лучше, чем абсолютные (глобальные). [Источник](https://hub.hku.hk/bitstream/10722/368255/1/content.pdf)
- Есть прямая критика: «Gamification is not Working: Why?» — когда механики декоративны (косметические очки и бейджи без смысла), эффект исчезает или становится отрицательным. [Источник](https://sage.cnpereading.com/doi/10.1177/15554120241228125)
- **Эффект привыкания:** исследования устойчивости (sustainability of gamified engagement) показывают, что внешние награды дают всплеск вовлечённости на 2–6 недель, затем спад; без внутренней ценности (интерес к задачам, рост мастерства) удержание падает. [Источник](https://www.mdpi.com/2227-7102/16/8/1200/xml)
- **Overjustification effect:** tangible-награды за выполненную задачу снижают внутреннюю мотивацию (эффект сверхоправдания), особенно у детей, которые и так любят предмет. [Источник](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1876544/full)

**Практический вывод:** геймификация работает как *обёртка* для практики и удержания, но не заменяет хорошо подобранные задачи и обратную связь; публичная соревновательность должна быть настраиваемой (opt-in) и «щадящей» для слабых.

---

### 1.2. Адаптивное обучение и spaced repetition для математики

**Spaced repetition (распределённая практика):**
- Мета-анализ (White Rose, 2024–2025, Murray et al.): распределённая практика vs массированная в математике даёт **g = 0.28** (в целом, 27 исследований), причём для изолированного материала **g = 0.43**, а внутри курса **g = 0.24**. Эффект реальный, но **меньше, чем в других предметах** (для языка g ≈ 0.4–0.6). [Источник](https://eprints.whiterose.ac.uk/id/eprint/229807/)
- **Retrieval practice (тестирование vs перечитывание) в математике: g = 0.18, но 95% ДИ пересекает ноль** — в математике эффект тестирования *не доказан надёжно*; он сильнее для фактов и процедур, слабее для переноса и олимпиадных задач. Это важно: для олимпиадной математики «вспоминание формул» — лишь малая часть.
- Конкретный кейс: spaced recall в курсе precalculus значимо снижает забывание фундаментальных понятий. [Источник](https://link.springer.com/content/pdf/10.1007/s11251-024-09680-w)

**Адаптивное обучение:**
- Мета-анализы адаптивных технологий по математике дают умеренные положительные эффекты, но **сильно зависят от качества внедрения** (implementation fidelity) и **SES-контекста** — эффект выше там, где учитель/платформа реально использует данные, а не «включает и забывает». [Источник](https://edunity.publikasikupublisher.com/index.php/Edunity/article/view/470)
- Сравнение адаптивной системы vs традиционного учительского обучения (Yarnall et al.): адаптивное не хуже, а иногда лучше, когда у учеников есть автономия в темпе; но «чистая» адаптивность без человеческого/содержательного компонента даёт скромные результаты. [Источник](https://eric.ed.gov/?id=EJ1381588)
- Для олимпиадной математики адаптивность полезна не как «подстраивание сложности под скуку» (это ведёт к потолку), а как **диагностика пробелов в технике** (алгебра, комбинаторика, теория чисел) с последующим точечным ремедиационным пакетом. Потолок должен задаваться сложностью задач, а не системой.

---

### 1.3. ИИ-тьюторы (Khanmigo, ChatGPT как репетитор)

**Ключевое исследование — Khanmigo, 2-летний кластерный RCT, 18 школ Теннесси (NBER Working Paper 35620, 2025/2026):**
- Случайно назначенные ученики, использовавшие Khan Academy + Khanmigo (режим «коучинг, а не подсказки») в ежедневных remedial-занятиях по математике: прирост **+1.3 процентильных ранга за семестр**, или **0.06–0.08 SD за учебный год**; полный год активного участия — **0.14 SD**.
- **Критично:** это сопоставимо с обычной практикой Khan Academy *без ИИ*. Главная находка — **проблема вовлечённости, а не качества модели**: 96% учеников хотя бы раз попробовали Khanmigo, но медианный ученик писал ему только в ~1/3 дней практики и лишь в 17% сессий, где допустил ошибку; сообщения в основном — «голые ответы» или клики по подсказкам. Вывод авторов: «узкое место — вовлечённость; обещание ИИ-тьюторов сбудется, только если заставить детей им пользоваться». [Источник](https://www.nber.org/papers/w35620) | [Обсуждение](https://www.winssolutions.org/khanmigo-ai-tutoring-two-year-trial/) | [Axios](https://www.axios.com/2024/08/15/ai-tutors-learning-education-khan-academy-wharton)
- Есть параллельный результат: 12-летние, получив доступ к ИИ-тьютору, часто его **игнорируют** (Futurism о том же эксперименте). [Источник](https://futurism.com/future-society/12-year-olds-access-ai-tutor-ignored)

**Положительные кейсы:**
- ChatGPT-сгенерированные подсказки дают учебный прирост, **эквивалентный подсказкам, написанным человеком-тьютором**, на математических навыках (сравнительное исследование). [Источник](https://www.mendeley.com/catalogue/a78572d8-9cee-34c8-8d38-33fce72c94dc/)
- Khan Academy отчитывается о кейсах школ (например, Enid High School, Оклахома), где AI-тьютор + учитель дали рост результатов; Khanmigo постоянно дорабатывается (режимы «не давать ответ», scaffolding). [Источник](https://blog.khanacademy.org/how-enid-high-school-transformed-their-math-classrooms-with-ai-a-case-study/) | [Блог Khan Academy](https://blog.khanacademy.org/how-khan-academy-is-building-a-better-ai-tutor-our-most-recent-learnings/)

**Ограничения (важно для олимпиадного уровня):**
- **Галлюцинации и ошибки в олимпиадных задачах**: LLM-генераторы решений математики «высокого уровня» (олимпиадные, конкурсные задачи) допускают логические ошибки чаще, чем в школьных задачах; нужна валидация решений (символьная/формальная проверка, человек-эксперт).
- **Списывание / shortcut-поведение**: если ИИ выдаёт ответы, ученики используют их как «костыль»; Khanmigo-режим «coach, not answer» — правильный паттерн, но (по RCT) ученики всё равно пытаются вытянуть ответы.
- **Эффект «доступа ≠ использования»**: доступ к ИИ-тьютору без мотивации и рутины не меняет результатов (главный урок NBER-исследования).

---

### 1.4. Интерактивные симуляции (PhET) и виртуальные лаборатории в физике

- Мета-анализы PhET в физике показывают **значимое положительное влияние на учебные результаты**, особенно на **понимание концепций и навыки решения задач** (по сравнению с лекцией/текстом). [Источник](https://www.semanticscholar.org/paper/Meta-Analysis-of-the-Effectiveness-of-PhET-in-Fadillah-Alawyah/6bd3ac4760a9e54221846550dab98502b33090f7) | [IEEE 2025: «PhET Interactive Simulations Significantly Improve Student Learning Outcomes»](https://ieeexplore.ieee.org/document/11425541)
- Мета-анализ влияния PhET-симуляций на рабочие листы/выполнение заданий в старшей школе — также положительный. [Источник](https://www.semanticscholar.org/paper/A-meta-analysis-of-the-effects-of-using-PhET-on-of-Chotimah-Festiyed/49d5bc12a4c496432f39b641ddef2cced21486f0)
- **Важная оговорка из литературы:** симуляции улучшают понимание, когда связаны с **направленными вопросами/гипотезами** (discovery learning + scaffolding); «свободная игра» в симуляции без задания даёт слабый эффект. Гибрид «PBL + симуляция + deep learning» усиливает навыки решения задач. [Источник](https://journal.unismuh.ac.id/index.php/jpf/article/view/18862)
- Для олимпиадной физики симуляции полезны для **интуиции** (механика, электричество, оптика): визуализация процессов, недоступных реальному эксперименту, развивает физическое мышление, которое потом формализуется в задачах. Это поддерживает концепцию «физическая интуиция → строгое решение».

---

### 1.5. Что мотивирует школьников и родителей

**Школьников (по исследованиям мотивации):**
- **Компетентность (видимый рост мастерства)** — сильнейший мотиватор: прогресс-бары, «уровни мастерства», разблокировка сложности. [Источник](https://link.springer.com/article/10.1186/s40561-022-00195-w)
- **Автономия** (выбор задач, темпа, пути) — ключ к внутренней мотивации по теории самодетерминации (SDT); связанность (социальная) — третья потребность SDT. [Источник](https://openurl.ebsco.com/EPDB%3Agcd%3A2%3A18890082/detailv2?sid=ebsco%3Aebsco.com%3ARS&id=ebsco%3Adoi%3A10.33711%2Fyyuefd.1624548)
- **Соревновательность** мотивирует часть детей (обычно сильных), но отталкивает другую часть; оптимально — «соревнование с собой» (личные рекорды) + опциональные турниры. Позитивный эффект олимпиадной подготовки на мотивацию и достижения подтверждён (Golle, Trautwein et al., Zeitschrift für Erziehungswissenschaft 2022 — «Getting fit for the Mathematical Olympiad»). [Источник](https://publikationen.reutlingen-university.de/frontdoor/index/index/searchtype/authorsearch/author/Golle%2C+Jessika/start/0/rows/10/sortfield/year/sortorder/asc/languagefq/eng/author_facetfq/Trautwein%2C+Ulrich/docId/3818)
- **Сторителлинг/нарратив** повышает вовлечённость, но эффект на знания скромнее; сильнее всего нарратив работает как «рамка смысла» (зачем мне эта задача). [Источник](https://digitalcommons.pepperdine.edu/etd/1660/)
- **Визуализация прогресса** (streaks, календари, графики) — доказанный драйвер привычки (см. Duolingo, п. 1.7).

**Родителей (что заставляет покупать):**
- **Видимые результаты и прозрачность прогресса** — главный фактор выбора образовательного приложения: родители выбирают сервисы, где можно проверить, что ребёнок реально учится (данные опросов и исследований выбора приложений: «Why this app? How parents choose educational apps»). [Источник](https://eric.ed.gov/?id=EJ1350629) | [KenResearch опрос](https://www.kenresearch.com/survey/after-school-coaching-app-preference-outcome-transparency-decision-survey)
- **Безопасность и доверие** (нет контента «мимо», контроль, приватность) — критично для платных подписок; исследование о том, как чёрные семьи США выбирают проверяемые инструменты обучения — общий паттерн доверия. [Источник](https://parenthood.cloud/why-black-families-choose-learning-tools-they-can-verify-bui)
- **Статус/амбиции:** родители, вкладывающиеся в репетиторство и олимпиады, мотивированы социальным сравнением и образовательными амбициями; вложения в частные занятия растут с образовательным уровнем родителей (немецкое исследование parental investment in private tutoring). [Источник](https://link.springer.com/content/pdf/10.1007/s35834-024-00433-w)
- Российские родители в отзывах об онлайн-школах чаще всего ценят **результаты (баллы/олимпиады) и удобство**, а главные претензии — отсутствие индивидуального внимания и непрозрачность. [Источник](https://www.isras.org/index.php?page_id=2722&id=14919&printmode)

---

### 1.6. Психология: страх ошибки, growth mindset, flow

- **Growth mindset (Dweck):** интервенции по развивающему мышлению дают **малые, но реальные эффекты** в математике (особенно для слабых учеников и при «национально-масштабном» внедрении — Yeager et al., 2019: ~0.10 SD в среднем, выше для слабых); при этом эффект сильно зависит от качества подачи и **контекста школы** — «пустые аффирмации» не работают. [Источник](https://digitalcommons.usf.edu/etd/11098/) | [Иранское исследование в духе Yeager](https://jep.atu.ac.ir/article_15266_32bfa95ef7d16b3bfac55a7b305874ca.pdf)
- **Flow (Csikszentmihalyi):** поток возникает при **балансе сложности задачи и навыков** + ясных целях + мгновенной обратной связи. В математике поток — «оптимальный опыт» в классе, когда задачи «на пределе, но решаемы»; это точное описание хорошей олимпиадной задачи. [Источник](https://ask.orkg.org/item/132453565/) | [Frontiers 2026](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1814423/xml)
- **Страх ошибки / математическая тревожность:** тревожность снижает рабочую память и результаты; вмешательства, сочетающие growth mindset + тренировку рабочей памяти + обучение решению текстовых задач, значимо помогают «рискованным» третьеклассникам с высокой тревожностью. [Источник](https://repositories.lib.utexas.edu/items/e38f79bd-e0ee-46db-bc4a-137770860fbb/full)
- **Культура ошибки (error culture):** классы/платформы, где ошибка — часть процесса (а не повод для стыда), снижают отчуждение и повышают вовлечённость; реконцептуализация ошибок как учебных событий — рекомендация на уровне целых систем. [Источник](https://public-pages-files-2025.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1634054/pdf)
- **Productive failure (Kapur):** если дать ученикам *попробовать* решить задачу до объяснения, обучение глубже, даже если попытки неудачны; «продуктивный провал» — доказанный механизм (Cognitive Science, 2014). Для олимпиадной математики это центральный принцип: сначала борьба, потом разбор. [Источник](https://onlinelibrary.wiley.com/doi/10.1111/cogs.12107) | [ERIC: Productive Failure in Mathematical Problem Solving](https://eric.ed.gov/?id=EJ901889)

---

### 1.7. Успешные проекты с необычными механиками — почему зацепили

- **Duolingo** — эталон удержания: streaks (серии), push-уведомления, «лиги» (опциональная конкуренция), юмор, визуализация прогресса. Исследования подтверждают: геймифицированный дизайн поддерживает вовлечённость, особенно **streaks и видимая ежедневная рутина**; компания отчитывается о росте DAU/MAU и retention как о прямом результате игровых механик (письма акционерам 2024–2025: retention растёт после внедрения новых игровых функций). [Источник](https://investors.duolingo.com/static-files/b4694341-5544-41d5-9cad-b236ce8a7bed) | [Исследование дизайна Duolingo](https://ju.diva-portal.org/smash/record.jsf?pid=diva2%3A1866808)
- **Prodigy Math** — RPG-обёртка (квесты, питомцы, битвы) вокруг математической практики; десятки миллионов пользователей. Исследования (включая блоги самой компании) отмечают: игра повышает вовлечённость в практику, но **навык растёт, только если математический контент не заслонён игрой** (риск «играть ради игры»). [Источник](https://www.prodigygame.com/main-en/blog/parent-math-anxiety-math-apps)
- **DragonBox Algebra** — дети (5–12 лет) осваивают базовую алгебру за **~1–1.5 часа игры** (официальный отчёт WeWantToKnow, 2013–2014; Forbes: «42 minutes»); механика: абстракция операций через предметы → перенос на символы. Классический пример «механика учит, а не награждает». [Источник](http://wewanttoknow.com/wp-content/uploads/2014/05/EN-AlgebraChallengeReport.pdf) | [Forbes](https://www.forbes.com/sites/jordanshapiro/2013/07/01/it-only-takes-about-42-minutes-to-learn-algebra-with-video-games/)
- **Brilliant** — интерактивные «решай-шаг-за-шагом» задачи с мгновенной проверкой и визуализацией; зацепил взрослую аудиторию (не школьников) минимализмом, сложностью «на вырост» и мгновенной обратной связью; критика — поверхностность для «рекреационной» математики без глубины. [Источник](https://brilliant.org/help/why-brilliant/reddit-reviews/) | [Обсуждение](https://en.wikipedia.org/wiki/Wikipedia:Reference_desk/Archives/Mathematics/2025_March_11)
- **3Blue1Brown** (Grant Sanderson) — визуализация математики (анимации, «manim»); миллионы подписчиков: работает **эстетика понимания** (увидеть смысл формулы), сторителлинг от проблемы к решению. Урок для платформы: визуальная подача делает абстракцию «осязаемой». [Источник](https://tagteam.harvard.edu/hub_feeds/3896/feed_items/8522382/content) | [Интервью](https://iaps.info/2025/01/22/exploring-the-path-of-3blue1brown-a-conversation-with-grant-sanderson/)
- **Veritasium** (Derek Muller) — научно-популярные видео, строящиеся на **заблуждениях зрителя** («вы уверены? а вот нет»): конфронтация с ошибкой = запоминание; Veritasium — один из самых цитируемых STEM-каналов. Урок: **намеренные «ловушки» и разбор типичных ошибок** — мощный мотиватор и механизм понимания. [Источник](http://everything-pr.com/veritasium-derek-muller-stem-creator-citation-share)
- **Physics Girl / Khan Academy Physics** — короткие «вау»-эксперименты + объяснение; вовлекают через любопытство (curiosity gap), затем формализация. [Источник](https://uq.pressbooks.pub/science-communication/chapter/the-curiosity-gap/)

---

### 1.8. Тренды 2024–2025

- **AI-генерация задач и персонализация:** LLM-генерация практики «под стандарты» и уровень ученика — активно развивается (примеры: AI-powered SAT Math платформа, MathBuddies для 3 класса, запуск «Panlong» — первого массового ИИ-математического тьютора для школ в Китае, май 2024). [Источник](https://ieeexplore.ieee.org/document/11100414) | [Источник](https://www.ischool.berkeley.edu/projects/2025/mathbuddies-ai-powered-standard-aligned-practice-problems-grade-3-mathematics) | [CCNU Panlong](https://english.ccnu.edu.cn/info/1002/2002.htm)
- **«Социальное» обучение:** онлайн-доски обсуждений, совместное решение задач, peer-сравнение — растущий сегмент; совместное решение задач развивает мышление высшего порядка (систематический обзор 2025). [Источник](https://www.sciencedirect.com/science/article/pii/S1871187125002494)
- **Микро-обучение (microlearning):** короткие модули (5–15 мин) эффективны для удержания и достройки компетенций; для математики — «микро-модули» по одной технике/идее (примеры: модуль по тригонометрии для 9 класса). [Источник](https://ouci.dntb.gov.ua/en/works/7AJdLbw4/) | [Scientific Reports 2025: MIND-модель microlearning+AI](https://link.springer.com/article/10.1038/s41598-025-24910-y)
- **Рост рынка персонализированных платформ обучения** (Personalized Learning Experience Platforms) — прогнозы устойчивого роста до 2032. [Источник](https://www.giiresearch.com/report/smrc1880461-personalized-learning-experience-platforms-market.html)
- **AI-тьюторы 24/7** (ChatGPT, Wolfram GPT, Tutor Me GPT) как «репетитор на кармане» — эксперименты показывают способность вести диалог по инженерной/математической тематике, но с оговорками о точности. [Источник](https://www.aimspress.com/article/id/696f51baba35de1737b69ccb)
- **Тренд на «геймификацию + ИИ» в гибридных моделях** и **внимание к нежелательным последствиям ИИ в образовании** (unintended consequences, SRI/Университет Торонто, Hamsa Bastani). [Источник](https://srinstitute.utoronto.ca/events-archive/seminar-2025-hasma-bastani)

---

## 2. Вывод: топ-10 проверенных механик для платформы олимпиадной математики и физики

1. **«Продуктивный провал» (productive failure):** сначала дать ученику решать трудную задачу самому, потом — разбор. Доказано (Kapur): глубина понимания растёт от попытки, даже неудачной. Это ядро олимпиадного обучения.
2. **Flow-подбор сложности:** автоматическая «лестница» задач на грани возможностей (решаемо, но с усилием) + мгновенная обратная связь и ясная цель каждого шага. Поток = оптимальный опыт и удержание.
3. **Распределённая практика (spaced repetition) с умной диагностикой:** повторение ключевых техник через растущие интервалы (g = 0.28–0.43 в математике) + адаптивная ремедиация пробелов по темам (алгебра/комбинаторика/геометрия/теор. чисел; механика/электричество/оптика).
4. **Визуализация прогресса и «мастерство», а не баллы:** прогресс-бары по навыкам, «уровни мастерства», персональные рекорды (соревнование с собой) — сильнейший мотиватор компетентности; безопаснее публичных рейтингов.
5. **Опциональные, «щадящие» соревнования:** лиги/турниры с настройкой (opt-in, группы по уровню, относительные лидерборды «близкого круга»), а не абсолютные глобальные таблицы, которые демотивируют слабых.
6. **Сторителлинг как «рамка смысла»:** сюжетные квесты (почему решаем эту задачу: экспедиция, расследование, миссия) — повышают вовлечённость; контент задач при этом остаётся настоящим олимпиадным (не «обёртка важнее математики»).
7. **Намеренные «ловушки» и разбор типичных ошибок** (механика Veritasium/DragonBox): «А ты уверен? Вот типичная ловушка» — ошибка превращается в событие обучения, снижается страх ошибки.
8. **ИИ-тьютор в режиме «коуч, не подсказка»** (модель Khanmigo), но с **обязательными рутинами вовлечения**: задания-вызовы, где ученик обязан сформулировать вопрос ИИ; иначе доступ ≠ использование (главный урок NBER-RCT). Плюс валидация олимпиадных решений экспертом/символьной проверкой против галлюцинаций.
9. **Интерактивные симуляции для физической интуиции** (модель PhET): направленные эксперименты-гипотезы перед формальным решением задач — симуляция + вопрос («что изменится, если...»), а не свободная игра.
10. **Микро-модули + streaks-рутина (модель Duolingo):** короткие ежедневные «тренировки по одной идее» (5–15 мин) с серией дней и мягкими напоминаниями — формирует привычку; для родителей — прозрачный дашборд прогресса и результатов.

---

## 3. Топ-5 анти-паттернов (что отпугивает детей и родителей)

1. **Абсолютные публичные лидерборды для всех.** Показ «ты 500-й из 500» убивает мотивацию слабых и средних учеников; соревновательность должна быть опциональной и уровненной. (Мета-анализы: leaderboards демотивируют слабых; относительные — лучше абсолютных.)
2. **Декоративная геймификация без смысла** (косметические очки/бейджи «за всё подряд», не связанные с мастерством) и **перекос «игра ради игры»** (как в Prodigy, когда математика тонет в RPG): вызывает привыкание, потом спад; награды за тривиальные действия дают overjustification effect — снижение внутренней мотивации.
3. **ИИ, который выдаёт ответы** («списывалка») и **ИИ-тьютор без механизма вовлечения**: если ребёнок может вытянуть ответ за 5 секунд, он не думает; если тьютор доступен, но им никто не пользуется (96% попробовали, медианно ~1/3 дней) — деньги и обещания не работают.
4. **Непрозрачность для родителей** (нет дашборда: что выучил, где пробелы, сколько занимался) и **отсутствие контроля/безопасности** — главные причины отказа от подписки и негативных отзывов; родители покупают «видимые результаты и доверие», а не «весёлые анимации».
5. **Потолок «адаптивности вниз» и бесконечные лёгкие задачи**: система, которая снижает сложность при неудаче, учит ребёнка не бороться; страх ошибки усиливается, если ошибка наказывается (потеря очков/статуса), а не разбирается. Олимпиадная математика = умение переживать неудачу попытки, это надо проектировать, а не прятать.

---

## 4. Источники (URL + аннотация)

**Геймификация:**
- [Gamification on Mathematics Engagement and Motivation in Secondary School and Higher Education: A Systematic Review and Meta-Analysis (Educational Psychology Review, 2025)](https://link.springer.com/article/10.1007/s10648-025-10108-1) — свежий систематический обзор+мета-анализ: геймификация повышает вовлечённость/мотивацию в математике; эффект на достижения меньше.
- [The Gamification of Learning: A Meta-Analysis (Sailer, EPR, 2020)](https://eric.ed.gov/?id=EJ1245270) — классический мета-анализ эффектов геймификации на обучение, умеренные позитивные эффекты с вариацией по дизайну.
- [Effect of OSLM features and gamification motivators on motivation in DGBL (Smart Learning Environments, 2022)](https://link.springer.com/article/10.1186/s40561-022-00195-w) — points/badges/leaderboards/progress — сильнейшие мотиваторы; связь с компетентностью.
- [Корейский обзор: badges-only > leaderboards-only](https://www.koreascience.or.kr/article/JAKO202230853598218.pdf) — бейджи «безопаснее» публичных рейтингов.
- [Gamification is not Working: Why? (Games and Culture, SAGE)](https://sage.cnpereading.com/doi/10.1177/15554120241228125) — критика декоративной геймификации.
- [From Points to Progress: SLR on gamification in distance education (MDPI Education Sciences, 2025)](https://www.mdpi.com/2227-7102/16/8/1200/xml) — устойчивость вовлечённости и ограничения.
- [AI-driven gamification and overjustification effect (Frontiers in Computer Science)](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2026.1876544/full) — эффект сверхоправдания внешних наград.
- [Относительные vs абсолютные лидерборды (HKU)](https://hub.hku.hk/bitstream/10722/368255/1/content.pdf) — относительные лидерборды вовлекают лучше.
- [Narrative gamification: почему badges/leaderboards недостаточно (AWorld)](https://www.aworld.org/blog/gamification-engagement/narrative-gamification-why-badges-and-leaderboards-are-no-longer-enough/) — обзорный материал о нарративной геймификации.
- [Влияние сторителлинга на опыт студентов в геймифицированном классе (Pepperdine)](https://digitalcommons.pepperdine.edu/etd/1660/) — нарратив повышает вовлечённость.

**Spacing / адаптивное обучение:**
- [A Meta-analytic Review of the Effectiveness of Spacing and Retrieval Practice for Mathematics Learning (White Rose, 2024)](https://eprints.whiterose.ac.uk/id/eprint/229807/) — g=0.28 spacing, 0.43 изолированный материал, retrieval g=0.18 (недостоверен).
- [Spaced recall reduces forgetting in precalculus (Springer, 2024)](https://link.springer.com/content/pdf/10.1007/s11251-024-09680-w) — интервальное повторение снижает забывание.
- [Meta-Analysis of Adaptive Learning Technologies and Mathematics Achievement (Edunity, 2024)](https://edunity.publikasikupublisher.com/index.php/Edunity/article/view/470) — эффекты зависят от качества внедрения и SES.
- [When Adaptive Learning Is Effective Learning (ERIC, Yarnall et al.)](https://eric.ed.gov/?id=EJ1381588) — адаптивное vs учительское обучение, условия эффективности.
- [Retrieval Practice Consistently Benefits Student Learning (Agarwal et al., 2021)](https://notes.andymatuschak.org/zV1xNteVY4otyHP5gCcanVN) — систематический обзор retrieval practice в школах (для контраста с математикой).

**ИИ-тьюторы:**
- [One Click Away: AI Tutoring with Khanmigo in a Two-Year School Experiment (NBER WP 35620)](https://www.nber.org/papers/w35620) — ключевой RCT: +1.3 процентильных ранга/семестр, 0.06–0.08 SD; главный вывод — вовлечённость, не качество модели.
- [Khanmigo AI tutoring study finds small maths gains (обзор исследования)](https://www.winssolutions.org/khanmigo-ai-tutoring-two-year-trial/) — краткое изложение NBER-результатов.
- [AI tutors are no substitute for human teachers (Axios, 2024)](https://www.axios.com/2024/08/15/ai-tutors-learning-education-khan-academy-wharton) — журналистский разбор Khanmigo-исследования.
- [12-Year-Olds Given an AI Tutor Ignored It (Futurism)](https://futurism.com/future-society/12-year-olds-access-ai-tutor-ignored) — иллюстрация проблемы вовлечения.
- [ChatGPT-generated help equivalent to human tutor-authored help in math (Mendeley/исследование)](https://www.mendeley.com/catalogue/a78572d8-9cee-34c8-8d38-33fce72c94dc/) — ИИ-подсказки не хуже человеческих.
- [How Khan Academy Is Building a Better AI Tutor (блог Khan Academy)](https://blog.khanacademy.org/how-khan-academy-is-building-a-better-ai-tutor-our-most-recent-learnings/) — практика разработки Khanmigo.
- [Enid High School AI case study (Khan Academy blog)](https://blog.khanacademy.org/how-enid-high-school-transformed-their-math-classrooms-with-ai-a-case-study/) — школьный кейс.
- [GenAI 24x7 Tutor: ChatGPT, Wolfram GPT, Tutor Me GPT (AIMS)](https://www.aimspress.com/article/id/696f51baba35de1737b69ccb) — возможности и ограничения ИИ-тьюторов по математике.
- [SRI Seminar: Hamsa Bastani о непреднамеренных последствиях ИИ в образовании](https://srinstitute.utoronto.ca/events-archive/seminar-2025-hasma-bastani) — риски ИИ-инструментов.

**Симуляции / PhET:**
- [Meta-Analysis of the Effectiveness of PhET Simulations in Physics Education (Semantic Scholar)](https://www.semanticscholar.org/paper/Meta-Analysis-of-the-Effectiveness-of-PhET-in-Fadillah-Alawyah/6bd3ac4760a9e54221846550dab98502b33090f7) — мета-анализ положительного влияния PhET.
- [PhET Interactive Simulations Significantly Improve Student Learning Outcomes (IEEE, 2025)](https://ieeexplore.ieee.org/document/11425541) — подтверждение эффекта.
- [Meta-analysis: PhET + worksheets (Chotimah, Festiyed)](https://www.semanticscholar.org/paper/A-meta-analysis-of-the-effects-of-using-PhET-on-of-Chotimah-Festiyed/49d5bc12a4c496432f39b641ddef2cced21486f0) — симуляции + направленные задания.
- [PBL + Deep Learning + PhET для решения задач (Jurnal Pendidikan Fisika)](https://journal.unismuh.ac.id/index.php/jpf/article/view/18862) — гибридные подходы усиливают навыки.
- [PhET-симуляции в обучении физике (SciELO, португ.)](https://www.scielo.br/j/rbef/a/HHCwMGhjGmS8rcDB3qrhmbg/abstract/?format=html&lang=en) — мета-анализ использования PhET.

**Мотивация школьников и родителей:**
- [OSLM/геймификация: точки зрения учеников (см. выше)](https://link.springer.com/article/10.1186/s40561-022-00195-w)
- [SDT и геймификация: связь с внутренней мотивацией](https://openurl.ebsco.com/EPDB%3Agcd%3A2%3A18890082/detailv2?sid=ebsco%3Aebsco.com%3ARS&id=ebsco%3Adoi%3A10.33711%2Fyyuefd.1624548)
- [Why This App? How Parents Choose Good Educational Apps (ERIC)](https://eric.ed.gov/?id=EJ1350629) — критерии выбора приложений родителями.
- [Why this app: user ratings and app store rankings impact parents' choice (ScienceDirect, 2025)](https://www.sciencedirect.com/science/article/pii/S0360131525001782/pdfft) — роль рейтингов и отзывов в выборе родителей.
- [KenResearch: After-School Coaching App Preference & Outcome Transparency Survey](https://www.kenresearch.com/survey/after-school-coaching-app-preference-outcome-transparency-decision-survey) — прозрачность результатов при выборе приложения.
- [How Black Families Build Trust in Digital Education](https://parenthood.cloud/why-black-families-choose-learning-tools-they-can-verify-bui) — доверие и проверяемость инструментов.
- [Parental investment in private tutoring in Germany (Springer, 2024)](https://link.springer.com/content/pdf/10.1007/s35834-024-00433-w) — мотивы родителей вкладываться в репетиторство.
- [Proshkova: Parental Reviews of Online Schools (Россия, 2024)](https://www.isras.org/index.php?page_id=2722&id=14919&printmode) — что ценят и критикуют российские родители онлайн-школ.

**Психология:**
- [Mathematics and Growth Mindset: Systematic Review and Meta-Analysis (USF)](https://digitalcommons.usf.edu/etd/11098/) — эффекты mindset-интервенций в математике.
- [Yeager-style RCT (иранский аналог, ATU)](https://jep.atu.ac.ir/article_15266_32bfa95ef7d16b3bfac55a7b305874ca.pdf) — эффекты развивающего мышления на оценки по математике.
- [Occasioning flow in the mathematics classroom (ORKG)](https://ask.orkg.org/item/132453565/) — поток в математическом классе.
- [Flow как оптимальное состояние (Frontiers in Education, 2026)](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1814423/xml) — поток, вовлечённость, баланс сложности.
- [Growth mindset + рабочая память + word problems для тревожных учеников (UT Austin)](https://repositories.lib.utexas.edu/items/e38f79bd-e0ee-46db-bc4a-137770860fbb/full) — вмешательства против математической тревожности.
- [Error culture и школьное отчуждение (Frontiers in Psychology, 2025)](https://public-pages-files-2025.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1634054/pdf) — культура ошибки и вовлечённость.
- [Productive Failure in Learning Math (Kapur, Cognitive Science, 2014)](https://onlinelibrary.wiley.com/doi/10.1111/cogs.12107) — продуктивный провал в математике.
- [Productive Failure in Mathematical Problem Solving (ERIC)](https://eric.ed.gov/?id=EJ901889) — дополнительный источник по PF.

**Проекты:**
- [DragonBox Algebra Challenge Report (WeWantToKnow, 2014)](http://wewanttoknow.com/wp-content/uploads/2014/05/EN-AlgebraChallengeReport.pdf) — алгебра за ~1–1.5 часа игры.
- [Forbes: It Only Takes 42 Minutes to Learn Algebra With Video Games (2013)](https://www.forbes.com/sites/jordanshapiro/2013/07/01/it-only-takes-about-42-minutes-to-learn-algebra-with-video-games/) — журналистский разбор DragonBox.
- [Duolingo Shareholder Letter 2024 (retention и игровые механики)](https://investors.duolingo.com/static-files/b4694341-5544-41d5-9cad-b236ce8a7bed) — данные об удержании.
- [The Influence of Duolingo's Gamified Design Elements (Jönköping University)](https://ju.diva-portal.org/smash/record.jsf?pid=diva2%3A1866808) — исследование элементов дизайна Duolingo.
- [Prodigy: What the Research Says About Math Learning Apps](https://www.prodigygame.com/main-en/blog/parent-math-anxiety-math-apps) — обзор исследований и позиция Prodigy.
- [Brilliant: Reddit reviews](https://brilliant.org/help/why-brilliant/reddit-reviews/) — восприятие аудиторией.
- [Wikipedia discussion: Brilliant — engaging or superficial?](https://en.wikipedia.org/wiki/Wikipedia:Reference_desk/Archives/Mathematics/2025_March_11) — критика глубины Brilliant.
- [3Blue1Brown обзор (Harvard)](https://tagteam.harvard.edu/hub_feeds/3896/feed_items/8522382/content) и [интервью с Grant Sanderson (IAPS, 2025)](https://iaps.info/2025/01/22/exploring-the-path-of-3blue1brown-a-conversation-with-grant-sanderson/) — почему визуализация работает.
- [Veritasium: How Derek Muller Built the Most-Cited STEM Channel](http://everything-pr.com/veritasium-derek-muller-stem-creator-citation-share) — механика «конфронтации с заблуждением».
- [The Curiosity Gap (Science Communication 2.0)](https://uq.pressbooks.pub/science-communication/chapter/the-curiosity-gap/) — любопытство как драйвер (Physics Girl и др.).

**Олимпиадная подготовка:**
- [Getting fit for the Mathematical Olympiad: positive effects on achievement and motivation? (Golle, Trautwein et al., 2022)](https://publikationen.reutlingen-university.de/frontdoor/index/index/searchtype/authorsearch/author/Golle%2C+Jessika/start/0/rows/10/sortfield/year/sortorder/asc/languagefq/eng/author_facetfq/Trautwein%2C+Ulrich/docId/3818) — олимпиадная подготовка повышает достижения и мотивацию.
- [Роль интерактивных образовательных приложений в развитии навыков решения математических задач (КиберЛенинка)](https://cyberleninka.ru/article/n/rol-interaktivnyh-obrazovatelnyh-prilozheniy-v-razvitii-navykov-resheniya-matematicheskih-zadach-u-tretieklassnikov) — русскоязычный обзор по интерактивным приложениям.
- [Онлайн-кружок «Олмат» по олимпиадной математике](https://olmath.ru/mathonline) — пример российского сервиса олимпиадной математики (рыночный ориентир).

**Тренды 2024–2025:**
- [AI-Powered SAT Math Practice Platform (IEEE, 2025)](https://ieeexplore.ieee.org/document/11100414) — LLM-генерация практики.
- [MathBuddies: AI-Powered Practice Problems (UC Berkeley, 2025)](https://www.ischool.berkeley.edu/projects/2025/mathbuddies-ai-powered-standard-aligned-practice-problems-grade-3-mathematics) — генерация задач под стандарты.
- [CCNU Launches AI Math Tutor «Panlong» (2024)](https://english.ccnu.edu.cn/info/1002/2002.htm) — первый массовый ИИ-тьютор для школ Китая.
- [How collaborative problem solving promotes higher-order thinking (ScienceDirect, 2025)](https://www.sciencedirect.com/science/article/pii/S1871187125002494) — совместное решение задач.
- [Micro Learning-based Module for Grade 9 Trigonometry](https://ouci.dntb.gov.ua/en/works/7AJdLbw4/) — микро-обучение в математике.
- [The MIND model: microlearning + AI (Scientific Reports, 2025)](https://link.springer.com/article/10.1038/s41598-025-24910-y) — микро-обучение с ИИ.
- [Personalized Learning Experience Platforms Market Forecasts to 2032](https://www.giiresearch.com/report/smrc1880461-personalized-learning-experience-platforms-market.html) — рост рынка персонализации.
- [AskEdTech Global Sentiment Survey 2025: AI в образовании](https://askedtech.com/knowledge-archive/6808a94e3198b32ee59fd48a) — настроения рынка по ИИ.
- [Developing math talent worldwide: evidence from a global RCT (Agarwal & Gaule, IZA DP 18381)](https://www.iza.org/index.php/publications/dp18381) — глобальный RCT по выявлению/развитию математического таланта (контекст олимпиадного движения).
