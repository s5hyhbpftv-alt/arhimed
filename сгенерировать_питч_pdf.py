#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Генератор PDF-питча «АРХИМЕД» v2 — премиальный дизайн.
Шрифтовая пара PT Serif (заголовки) + Montserrat (текст), авторская графика:
воронка TAM/SAM/SOM, диаграмма LTV/CAC, таймлайн, карточки, тёмные акцентные слайды."""
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.graphics.shapes import Drawing, String
from reportlab.graphics.charts.barcharts import VerticalBarChart
import textwrap

W, H = 13.333 * 72, 7.5 * 72   # 16:9, 960x540 pt
M = 62

F = '/Users/mihaildrozdov/Documents/DPsek/шрифты/'
pdfmetrics.registerFont(TTFont('PT-Bold', F + 'PTSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('PT-Reg',  F + 'PTSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('M-Reg',   F + 'Montserrat-Regular.ttf'))
pdfmetrics.registerFont(TTFont('M-Med',   F + 'Montserrat-Medium.ttf'))
pdfmetrics.registerFont(TTFont('M-Semi',  F + 'Montserrat-SemiBold.ttf'))
pdfmetrics.registerFont(TTFont('M-Bold',  F + 'Montserrat-Bold.ttf'))

NIGHT   = HexColor('#131E36')
NIGHT2  = HexColor('#22335A')
NIGHT3  = HexColor('#1B2A4A')
INK     = HexColor('#292117')
BRONZE  = HexColor('#B08D57')
BRONZE_D= HexColor('#8A6C3F')
TERRA   = HexColor('#C96F4A')
OLIVE   = HexColor('#5F7A3A')
MARBLE  = HexColor('#F8F3E8')
MARBLE2 = HexColor('#EDE2CD')
CREAM   = HexColor('#FDF6E3')
GLOW    = HexColor('#7FD1FF')
GOLD    = HexColor('#D9A441')
MUTED   = HexColor('#8C7D63')
PAPER   = HexColor('#EFE6D2')

def wrap(s, w):
    return textwrap.wrap(s, width=w, break_long_words=True, break_on_hyphens=False)

def meander(c, x, y, w, col=BRONZE):
    c.setStrokeColor(col); c.setLineWidth(1.6)
    xx = x
    while xx < x + w:
        c.line(xx, y, xx + 8, y); c.line(xx + 13, y, xx + 21, y); xx += 25

def footer(c, n, dark=False):
    col = HexColor('#9FB2CC') if dark else MUTED
    c.setFillColor(col); c.setFont('M-Reg', 8)
    c.drawString(M, 15, 'АРХИМЕД · игровая вселенная олимпиадной математики, физики и химии')
    c.drawRightString(W - M, 15, f'{n:02d} / 12 · конфиденциально')

def bg_light(c):
    c.setFillColor(MARBLE); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(BRONZE); c.rect(0, 0, 6, H, fill=1, stroke=0)
    c.setFillColor(PAPER); c.rect(W - 6, 0, 6, H, fill=1, stroke=0)

def bg_dark(c):
    c.setFillColor(NIGHT); c.rect(0, 0, W, H, fill=1, stroke=0)
    for i in range(30):  # мягкое свечение сверху
        a = 0.055 * (1 - i / 30)
        c.setFillColor(HexColor('#2E4E8C')); c.setFillAlpha(a)
        c.ellipse(W * 0.26, H * 0.52, W * 0.76, H * 0.98, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setFillColor(BRONZE); c.rect(0, 0, W, 5, fill=1, stroke=0)
    c.setFillColor(HexColor('#0C1428')); c.rect(0, H - 4, W, 4, fill=1, stroke=0)

def kicker(c, text, x, y, dark=False):
    c.setFillColor(OLIVE if not dark else GLOW)
    c.setFont('M-Semi', 10); c.drawString(x, y, text.upper())
    c.setFillColor(BRONZE if not dark else HexColor('#5E7FA8'))
    c.rect(x, y - 4, 24, 2.2, fill=1, stroke=0)

def claim(c, text, x, y, size=22, dark=False):
    c.setFillColor(TERRA if not dark else HexColor('#F2E6C9'))
    c.setFont('PT-Bold', size)
    for ln in wrap(text, 56):
        c.drawString(x, y, ln); y -= size + 5
    return y

def bullets(c, items, x, y, gap=17, size=12, dark=False, w=96):
    col = INK if not dark else HexColor('#D8E2F2')
    c.setFont('M-Med', size)
    for b in items:
        lines = wrap(b, w)
        for i, ln in enumerate(lines):
            if i == 0:
                c.setFillColor(BRONZE if not dark else GLOW)
                c.rect(x, y + 3, 5, 5, fill=1, stroke=0)
            c.setFillColor(col)
            c.drawString(x + 13, y, ln)
            y -= gap if i == 0 else gap - 6
        y -= 3
    return y

def talkbox(c, text, y, x=M, ww=None, dark=False):
    ww = ww or (W - 2 * M)
    tlines = wrap(text, 98)
    bh = len(tlines) * 13.5 + 22
    if y - bh < 24:  # защита от выхода за нижний край
        y = 24 + bh
    c.setFillColor(CREAM if not dark else NIGHT2)
    c.roundRect(x, y - bh, ww, bh, 6, fill=1, stroke=0)
    c.setStrokeColor(OLIVE if not dark else GLOW); c.setLineWidth(1)
    c.roundRect(x, y - bh, ww, bh, 6, fill=0, stroke=1)
    c.setFillColor(OLIVE if not dark else GLOW); c.setFont('M-Bold', 8.5)
    c.drawString(x + 14, y - 15, 'ГОВОРИТЬ')
    c.setFillColor(INK if not dark else HexColor('#D8E2F2')); c.setFont('M-Med', 10.5)
    yy = y - 31
    for ln in tlines:
        c.drawString(x + 14, yy, ln); yy -= 13.5
    return y - bh

def big_stat(c, value, label, x, y, size=30):
    c.setFillColor(GOLD); c.setFont('PT-Bold', size)
    c.drawString(x, y, value)
    c.setFillColor(MUTED); c.setFont('M-Med', 9.5)
    yy = y - 14
    for ln in wrap(label, 30):
        c.drawString(x, yy, ln); yy -= 12

def chips(c, items, x, y, size=9.5, gapx=7):
    xx = x
    for it in items:
        w = pdfmetrics.stringWidth(it, 'M-Med', size) + 24
        c.setFillColor(NIGHT3); c.roundRect(xx, y - 13, w, 17, 9, fill=1, stroke=0)
        c.setFillColor(HexColor('#D8E2F2')); c.setFont('M-Med', size)
        c.drawString(xx + 12, y - 3.5, it)
        xx += w + gapx

def unit_chart_drawing():
    d = Drawing(340, 195)
    bc = VerticalBarChart()
    bc.x = 26; bc.y = 34; bc.width = 280; bc.height = 125
    bc.data = [[3950], [1300]]
    bc.categoryAxis.categoryNames = ['LTV, ₽', 'CAC, ₽']
    bc.categoryAxis.labels.fontName = 'M-Med'; bc.categoryAxis.labels.fontSize = 9
    bc.categoryAxis.labels.fillColor = INK
    bc.valueAxis.valueMin = 0; bc.valueAxis.valueMax = 4400
    bc.valueAxis.labels.fontName = 'M-Reg'; bc.valueAxis.labels.fontSize = 8
    bc.valueAxis.labels.fillColor = MUTED
    bc.bars[0].fillColor = OLIVE; bc.bars[1].fillColor = TERRA
    bc.bars[0].strokeWidth = 0; bc.bars[1].strokeWidth = 0
    d.add(bc)
    d.add(String(26, 12, 'LTV = 3 950 ₽ (5 мес) · CAC = 1 300 ₽ · LTV/CAC ≈ 3 · payback 1,6 мес',
                 fontName='M-Semi', fontSize=9, fillColor=INK))
    return d

def slide_break(c):
    c.showPage()

# ============================================================ 1. ТИТУЛ
def s_title(c):
    bg_dark(c)
    meander(c, M, H - 66, 120, HexColor('#5E7FA8'))
    c.setFillColor(HexColor('#9FB2CC')); c.setFont('M-Semi', 11)
    c.drawString(M, H - 98, 'ПИТЧ ДЛЯ ИНВЕСТОРОВ И ПАРТНЁРОВ · 2026')
    c.setFillColor(HexColor('#F2E6C9')); c.setFont('PT-Bold', 66)
    c.drawString(M, H - 188, 'АРХИМЕД')
    c.setFillColor(GLOW); c.setFont('M-Med', 15)
    c.drawString(M, H - 220, 'Игровая вселенная олимпиадной математики, физики и химии')
    c.setFillColor(NIGHT3); c.roundRect(M, H - 302, W - 2 * M, 44, 8, fill=1, stroke=0)
    c.setStrokeColor(BRONZE); c.setLineWidth(1)
    c.roundRect(M, H - 302, W - 2 * M, 44, 8, fill=0, stroke=1)
    c.setFillColor(GOLD); c.setFont('M-Semi', 12.5)
    c.drawCentredString(W / 2, H - 279, 'Duolingo × AoPS × PhET × сериал × ИИ-тьютор  +  родительский кабинет')
    c.setFillColor(HexColor('#F2E6C9')); c.setFont('PT-Reg', 17)
    c.drawString(M, H - 356, '«Сначала попробуй. Потом поймёшь.»')
    c.setFillColor(HexColor('#A8B8CC')); c.setFont('M-Med', 11)
    for i, ln in enumerate(wrap('Школьник 10–17 лет — «Исследователь», пробудивший древний интеллект Архимеда. '
                               'Каждая олимпиадная тема — остров с историей; каждая задача — суперсила героя.', 98)):
        c.drawString(M, H - 392 - i * 16, ln)
    c.setFillColor(GOLD); c.setFont('M-Bold', 12)
    c.drawString(M, 58, '«Продукт для двоих»: ребёнок играет — родитель видит прогресс и прогноз олимпиадных результатов')
    footer(c, 1, dark=True)
    slide_break(c)

# ============================================================ 2. ПРОБЛЕМА
def s_problem(c):
    bg_light(c)
    kicker(c, 'Проблема', M, H - 68)
    y = claim(c, '24,8 млн участников ВсОШ — и ни одной системы подготовки', M, H - 116)
    y -= 16
    big_stat(c, '24,8 млн', 'участников школьного этапа ВсОШ', M, y, 32)
    big_stat(c, '~8 тыс.', 'доходят до финала', M + 250, y, 32)
    big_stat(c, '0', 'систем подготовки в РФ', M + 500, y, 32)
    y -= 88
    y = bullets(c, [
        'Боли детей: задачи не по уровню · нет пути «от новичка до олимпиады» · выгорание · страх провала',
        'Боли родителей: нет дашбордов прогресса · репетитор-лотерея (710–1 300 ₽/урок) · регионы без доступа',
        'Формат устарел: «видео + ДЗ»; геймификации олимпиадного уровня нет ни у одного РФ-игрока',
    ], M, y, gap=18)
    talkbox(c, 'Дело не в способностях: нет системы, ребёнок выгорает, а в регионах нет даже репетитора. '
               'Экспериментальные туры онлайн не тренирует никто — «полная беспомощность участников», — говорят жюри ВсОШ.', y - 14)
    footer(c, 2)
    slide_break(c)

# ============================================================ 3. РЕШЕНИЕ
def s_solution(c):
    bg_light(c)
    kicker(c, 'Решение', M, H - 68)
    y = claim(c, 'Duolingo × AoPS × PhET × сериал × ИИ — плюс дашборд родителя, которого нет ни у кого', M, H - 116)
    y -= 12
    cards = [
        ('🎮', 'Адаптивный тренажёр', 'Инварианты, графы, комбинаторика. Аналогов Alcumus на русском нет.'),
        ('⚗', 'Виртуальная лаборатория', 'Физика + химия: честные измерения, погрешности, протоколы туров ВсОШ.'),
        ('🧠', 'ИИ-Архимед', 'Наводящие вопросы вместо ответов. Стиль объяснения — под ученика.'),
    ]
    cw = (W - 2 * M - 2 * 16) / 3
    for i, (ico, t, dsc) in enumerate(cards):
        x = M + i * (cw + 16)
        c.setFillColor(CREAM); c.roundRect(x, y - 104, cw, 104, 10, fill=1, stroke=0)
        c.setStrokeColor(BRONZE); c.setLineWidth(1); c.roundRect(x, y - 104, cw, 104, 10, fill=0, stroke=1)
        c.setFillColor(BRONZE_D); c.setFont('M-Bold', 11)
        c.drawString(x + 14, y - 22, ico + '  ' + t)
        c.setFillColor(INK); c.setFont('M-Reg', 9.5)
        yy = y - 42
        for ln in wrap(dsc, 32):
            c.drawString(x + 14, yy, ln); yy -= 13
    y -= 132
    y = bullets(c, [
        'Адаптивная генерация задач — «списывать нечего и не у кого»',
        'Формула закрывает 4 детские и 3 родительские боли из топ-10',
    ], M, y, gap=17)
    talkbox(c, 'Мы не делаем ещё одну онлайн-школу. Мы собираем доказанные механики мира и заворачиваем их '
               'в сюжетный сериал с ИИ-наставником — плюс прозрачный кабинет родителя.', y - 10)
    footer(c, 3)
    slide_break(c)

# ============================================================ 4. ПРОДУКТ
def s_product(c):
    bg_light(c)
    kicker(c, 'Продукт · демо', M, H - 68)
    y = claim(c, 'Пять минут в продукте: ты спасаешь Сиракузы комбинаторикой', M, H - 116)
    y -= 14
    y = bullets(c, [
        'Остров «Сиракузы»: задачи вшиты в сюжет — «рассчитай угол зеркал, подожги флот»',
        'Микро-петля 5–15 мин: задание → 3–5 задач с подсказками-лестницей → «Решение Архимеда»',
        'Лаборатория: рычаги, блоки, маятники — как на экспериментальных турах ВсОШ',
        'Дуэли 1v1 (Эло) · командные турниры · олимпиадный симулятор · «Семейная олимпиада»',
        'ХИМИЯ: «Лаборатория Лавуазье» и «Остров Менделеева» — стехиометрия, титрование, периодичность',
    ], M, y, gap=17)
    y -= 14
    c.setFillColor(NIGHT2); c.roundRect(M, y - 44, W - 2 * M, 44, 8, fill=1, stroke=0)
    c.setFillColor(HexColor('#D8E2F2')); c.setFont('M-Semi', 9.5)
    c.drawString(M + 16, y - 16, 'РЕЖИМЫ')
    chips(c, ['Квесты', 'Тренажёр приёмов', 'Дуэли 1v1', 'Турниры', 'Лаборатория',
              'Олимп. симулятор', 'Семейная олимпиада', 'Химия (Бета)'], M + 78, y - 10, size=9)
    y -= 66
    talkbox(c, 'Ребёнок решает задачи и не замечает, что учится. В конце сезона — репетиция реального тура '
               'ВсОШ с таймером и протоколом.', y - 8)
    footer(c, 4)
    slide_break(c)

# ============================================================ 5. MOAT
def s_moat(c):
    bg_light(c)
    kicker(c, 'Уникальность · moat', M, H - 68)
    y = claim(c, 'Восемь механик, которые не скопировать за выходные', M, H - 116)
    y -= 20
    mechs = [
        'Сократический ИИ-Архимед — наводящие вопросы, не ответы',
        'Адаптивная генерация задач с верификатором',
        'Навыки-«суперсилы»: «Инвариант», «Оценка + пример»',
        'Сюжетные задачи + «Решение Архимеда»',
        'Честная лаборатория: расчёты и погрешности',
        'Прогноз результатов на этапах ВсОШ',
        'Защита от выгорания: лимиты, без публичных таблиц',
        'Химия и физика в одной вселенной',
    ]
    cw = (W - 2 * M - 14) / 2
    for i, m in enumerate(mechs):
        col = i % 2; row = i // 2
        x = M + col * (cw + 14); yy = y - row * 74
        c.setFillColor(CREAM); c.roundRect(x, yy - 66, cw, 66, 9, fill=1, stroke=0)
        c.setStrokeColor(BRONZE); c.setLineWidth(1); c.roundRect(x, yy - 66, cw, 66, 9, fill=0, stroke=1)
        c.setFillColor(TERRA); c.setFont('PT-Bold', 24)
        c.drawString(x + 14, yy - 24, str(i + 1))
        c.setFillColor(INK); c.setFont('M-Med', 9.5)
        for j, ln in enumerate(wrap(m, 44)):
            c.drawString(x + 42, yy - 22 - j * 13, ln)
    y -= 4 * 74 + 6
    talkbox(c, 'Восемь механик, которых нет ни у кого на русском. Прогноз результатов — то, за что '
               'родители платят репетиторам годами вслепую.', y - 6)
    footer(c, 5)
    slide_break(c)

# ============================================================ 6. ДОКАЗАТЕЛЬНАЯ БАЗА
def s_evidence(c):
    bg_light(c)
    kicker(c, 'Доказательная база', M, H - 68)
    y = claim(c, 'Каждая механика опирается на исследование, а не на интуицию', M, H - 116)
    y -= 30
    stats = [
        ('+0.37σ', 'адаптивная практика за 4,5 мес · Mindspark, RCT'),
        ('g = 0.28–0.43', 'spaced repetition в математике · White Rose'),
        ('d ≈ 0.6–1.0', 'симуляции с направленными вопросами · PhET'),
        ('+1.3 пп', 'ИИ-тьютор «коуч» · Khanmigo (NBER): доступ ≠ использование'),
    ]
    cw = (W - 2 * M - 3 * 14) / 4
    for i, (v, l) in enumerate(stats):
        x = M + i * (cw + 14)
        c.setFillColor(CREAM); c.roundRect(x, y - 92, cw, 92, 10, fill=1, stroke=0)
        c.setStrokeColor(BRONZE); c.setLineWidth(1); c.roundRect(x, y - 92, cw, 92, 10, fill=0, stroke=1)
        c.setFillColor(GOLD); c.setFont('PT-Bold', 22)
        c.drawString(x + 14, y - 28, v)
        c.setFillColor(INK); c.setFont('M-Reg', 8.5)
        yy = y - 48
        for ln in wrap(l, 30):
            c.drawString(x + 14, yy, ln); yy -= 11.5
    y -= 124
    y = bullets(c, [
        'Продуктивный провал (Kapur, 2014): сначала попытка, потом разбор — ядро олимпиадного обучения',
        'Анти-паттерны, которые мы не повторяем: публичные лидерборды, ИИ-«списывалка», «адаптивность вниз»',
    ], M, y, gap=17)
    talkbox(c, 'Мы знаем, чего НЕ делать: публичных таблиц, которые убивают слабых, и ИИ, который выдаёт '
               'ответы. И знаем, что работает — на цифрах RCT.', y - 10)
    footer(c, 6)
    slide_break(c)

# ============================================================ 7. РЫНОК (воронка)
def s_market(c):
    bg_light(c)
    kicker(c, 'Рынок', M, H - 68)
    y = claim(c, 'TAM $150–200 млрд. SAM ~2–3 млн готовящихся. SOM — наша', M, H - 116)
    y -= 30
    cx = M + 168
    tiers = [
        (330, '$150–200 млрд', 'TAM · мировой EdTech · AI +30% CAGR', HexColor('#2C3E6B')),
        (252, '~2–3 млн', 'SAM · школьники РФ, системно готовящиеся', HexColor('#3E5C8C')),
        (174, '80–100 тыс. MAU', 'SOM · целевые активные к 12 мес', HexColor('#C96F4A')),
    ]
    yy = y
    for w_, v, l, col in tiers:
        h_ = 60
        c.setFillColor(col); c.roundRect(cx - w_ / 2, yy - h_, w_, h_, 8, fill=1, stroke=0)
        c.setFillColor(HexColor('#FFFFFF')); c.setFont('PT-Bold', 16)
        c.drawCentredString(cx, yy - 22, v)
        c.setFillColor(HexColor('#E8EEF8')); c.setFont('M-Med', 8)
        c.drawCentredString(cx, yy - 38, l)
        yy -= h_ - 16
    yy -= 16
    y = bullets(c, [
        'Репетитор — 710–1 300 ₽/урок; «Атриум» — 34 900–65 000 ₽/сезон',
        'Химия: финал ВсОШ-2025 — 38 победителей; сборная РФ берёт золото IChO',
        'Сигналы: Сириус.Курсы 340 тыс. учеников, Учи.ру 18+ млн, Фоксфорд 3,5 млн',
    ], W / 2 + 24, y, gap=17, w=44)
    talkbox(c, 'Рынок огромный и пустой одновременно. Один урок репетитора стоит дороже нашего месячного '
               'доступа. Химия — ещё один платёжеспособный сегмент.', y - 8, x=W / 2 + 24, ww=(W - 2 * M) / 2 + 20)
    footer(c, 7)
    slide_break(c)

# ============================================================ 8. КОНКУРЕНТЫ
def s_competitors(c):
    bg_light(c)
    kicker(c, 'Конкуренты', M, H - 68)
    y = claim(c, 'Все играют в разные игры. Пустая клетка — наша', M, H - 116)
    y -= 28
    rows = [
        ('ЦПМ', 'гос. оператор ВсОШ, офлайн', 'только Москва · нет ИИ и дашборда'),
        ('«Атриум»', 'онлайн-школа, химия/биология', 'нет ИИ, лабораторий, геймификации'),
        ('Фоксфорд · Школково · Умскул', 'ЕГЭ-центричны', 'олимпиада — линейка курсов'),
        ('AoPS / Brilliant', 'мировые эталоны', 'только английский · без сюжета'),
        ('Учи.ру', '18+ млн учеников', 'базовый школьный уровень'),
        ('АРХИМЕД', 'сюжет + ИИ + лаборатория + дашборд', 'первая олимпиадная вселенная на русском'),
    ]
    colw = [152, 258, 302]
    x0 = M; yh = 23
    c.setFillColor(BRONZE_D); c.setFont('M-Bold', 9)
    for i, hh in enumerate(['Игрок', 'Формат', 'Ключевая дыра / наше место']):
        c.drawString(x0 + sum(colw[:i]) + 8, y - 6, hh)
    y -= yh + 6
    for a, b, d in rows:
        is_us = (a == 'АРХИМЕД')
        c.setFillColor(CREAM if not is_us else NIGHT2)
        c.roundRect(x0, y - yh, sum(colw), yh, 4, fill=1, stroke=0)
        if is_us:
            c.setStrokeColor(GOLD); c.setLineWidth(1.5)
            c.roundRect(x0, y - yh, sum(colw), yh, 4, fill=0, stroke=1)
        c.setFillColor(GOLD if is_us else INK); c.setFont('M-Bold' if is_us else 'M-Semi', 9)
        c.drawString(x0 + 8, y - 7, a)
        c.setFillColor(HexColor('#D8E2F2') if is_us else INK); c.setFont('M-Reg', 8.5)
        c.drawString(x0 + colw[0] + 8, y - 7, b)
        c.drawString(x0 + colw[0] + colw[1] + 8, y - 7, d)
        y -= yh
    y -= 14
    talkbox(c, 'Государство — офлайн и для Москвы, онлайн-школы — под ЕГЭ, мировые звёзды — на английском. '
               'Не воюем с ЦПМ: он наш бенчмарк и партнёр. Мы закрываем регионы и «непрошедших отбор».', y - 6)
    footer(c, 8)
    slide_break(c)

# ============================================================ 9. БИЗНЕС-МОДЕЛЬ
def s_business(c):
    bg_light(c)
    kicker(c, 'Бизнес-модель · unit-экономика', M, H - 68)
    y = claim(c, 'Родители платят 1 300 ₽ за один урок. Мы отдаём месяц за 790 ₽', M, H - 116)
    y -= 26
    d = unit_chart_drawing()
    d.wrapOn(c, 340, 195); d.drawOn(c, M + 6, y - 205)
    big_stat(c, '790 ₽', 'подписка «Исследователь» / мес', M + 390, y - 6, 28)
    big_stat(c, '6%', 'конверсия freemium → платящие', M + 390, y - 74, 28)
    big_stat(c, '≈ 3', 'LTV/CAC · безубыточность ~месяц 12', M + 390, y - 142, 28)
    y -= 218
    y = bullets(c, [
        'B2B: лицензии школам от 150 ₽/ученик/мес · гранты («Талант и успех», Потанин)',
        'ХИМИЯ — upsell-модуль: тариф «Лаборатория Лавуазье», усиление B2B для химклассов',
        'Бесплатный год призёрам ВсОШ — виральность и доверие',
    ], M, y, gap=16)
    talkbox(c, '790 ₽ против 1 300 ₽ за один урок репетитора. При конверсии 6% и LTV ~3 950 ₽ мы выходим '
               'в ноль на 4–6 тыс. платящих — это 5% от целевых 100 тыс. MAU.', y - 10)
    footer(c, 9)
    slide_break(c)

# ============================================================ 10. ROADMAP
def s_roadmap(c):
    bg_light(c)
    kicker(c, 'Roadmap', M, H - 68)
    y = claim(c, 'Через 10 месяцев — релиз. Через 12 — точка безубыточности', M, H - 116)
    y -= 44
    phases = [
        ('MVP', '3–4 мес', '2 острова · 100–150 задач · лаборатория · дуэли · кабинет родителя'),
        ('Бета', '+2–3 мес', 'ИИ-Архимед · адаптивная генерация · турниры · ХИМИЯ'),
        ('Релиз', '+3 мес', '6 островов · симулятор · прогноз · мобильные'),
        ('Масштаб', 'далее', 'B2B и регионы · EN-версия · партнёрства'),
    ]
    cw = (W - 2 * M - 3 * 18) / 4
    for i, (t, d, dsc) in enumerate(phases):
        x = M + i * (cw + 18)
        c.setFillColor(NIGHT2); c.roundRect(x, y - 106, cw, 106, 9, fill=1, stroke=0)
        c.setFillColor(HexColor('#F2E6C9')); c.setFont('PT-Bold', 17)
        c.drawString(x + 14, y - 22, t)
        c.setFillColor(GOLD); c.setFont('M-Bold', 9.5)
        c.drawString(x + 14, y - 40, d)
        c.setFillColor(HexColor('#D8E2F2')); c.setFont('M-Reg', 8.5)
        yy = y - 58
        for ln in wrap(dsc, 28):
            c.drawString(x + 14, yy, ln); yy -= 12
        if i < 3:
            c.setFillColor(BRONZE); c.setFont('M-Bold', 15)
            c.drawString(x + cw + 1, y - 30, '→')
    y -= 138
    y = bullets(c, [
        'Критерии: D30 ≥ 25% · NPS ≥ 40 · сессия ≥ 15 мин · 3 пилотных кружка',
        'Контент: 500 задач/мес на плато (банк + авторские + ИИ с верификатором)',
    ], M, y, gap=17)
    talkbox(c, 'У каждого этапа — измеримый критерий успеха. MVP — за 3–4 месяца, химия — в Бете, '
               'полная вселенная — через 9–10 месяцев.', y - 10)
    footer(c, 10)
    slide_break(c)

# ============================================================ 11. КОМАНДА
def s_team(c):
    bg_light(c)
    kicker(c, 'Команда', M, H - 68)
    y = claim(c, '7–8 человек, чтобы переписать олимпиадную подготовку', M, H - 116)
    y -= 28
    c.setFillColor(CREAM); c.roundRect(M, y - 168, W - 2 * M, 168, 10, fill=1, stroke=0)
    c.setStrokeColor(BRONZE); c.setLineWidth(1); c.roundRect(M, y - 168, W - 2 * M, 168, 10, fill=0, stroke=1)
    c.setFillColor(BRONZE_D); c.setFont('M-Bold', 10.5)
    c.drawString(M + 18, y - 22, 'ЯДРО')
    chips(c, ['Продакт / геймдизайнер', 'Методолог-олимпиадник', 'ИИ-инженер', 'Full-stack ×2',
              'Дизайнер', 'Контент-редактор'], M + 18, y - 42, size=10)
    c.setFillColor(TERRA); c.setFont('M-Bold', 10.5)
    c.drawString(M + 18, y - 70, 'ХИМИЯ (БЕТА)')
    chips(c, ['Методолог-химик', 'Химический верификатор'], M + 18, y - 90, size=10)
    c.setFillColor(OLIVE); c.setFont('M-Bold', 10.5)
    c.drawString(M + 18, y - 118, 'ФРИЛАНС')
    chips(c, ['Художник-аниматор', 'Звук', 'Методолог-физик'], M + 18, y - 138, size=10)
    c.setFillColor(MUTED); c.setFont('M-Reg', 9)
    c.drawString(M + 18, y - 158, 'Один контент-пайплайн масштабируется на предметы, острова и языки')
    y -= 194
    big_stat(c, '7–10 млн ₽', 'бюджет до релиза: команда 8 чел × ~9 мес + инфраструктура + контент', M, y, 26)
    big_stat(c, '1 → N', 'контент-ядро на все острова и EN-версию', M + 330, y, 26)
    y -= 78
    talkbox(c, 'Компактное продуктовое ядро, которое масштабируется на новые предметы, регионы и языки '
               'без роста команды в разы.', y - 8)
    footer(c, 11)
    slide_break(c)

# ============================================================ 12. ЗАПРОС
def s_ask(c):
    bg_dark(c)
    kicker(c, 'Запрос', M, H - 68, dark=True)
    c.setFillColor(HexColor('#F2E6C9')); c.setFont('PT-Bold', 54)
    c.drawString(M, H - 158, '20 млн ₽')
    c.setFillColor(HexColor('#D8E2F2')); c.setFont('M-Med', 15)
    c.drawString(M, H - 190, 'на 12–18 месяцев — первый олимпиадный EdTech-продукт РФ')
    meander(c, M, H - 208, 300, HexColor('#5E7FA8'))
    y = H - 246
    items = [
        ('7–10 млн ₽', 'разработка до релиза: MVP → Бета → Релиз'),
        ('5–8 млн ₽', 'аквизиция первых платящих (CAC < 1 300 ₽)'),
        ('2–4 млн ₽', 'химический модуль и B2B-пилоты в 3+ регионах'),
        ('1–2 млн ₽', 'подушка безопасности'),
    ]
    for v, l in items:
        c.setFillColor(NIGHT3); c.roundRect(M, y - 32, W - 2 * M, 32, 6, fill=1, stroke=0)
        c.setStrokeColor(HexColor('#3A4F7C')); c.setLineWidth(1)
        c.roundRect(M, y - 32, W - 2 * M, 32, 6, fill=0, stroke=1)
        c.setFillColor(GOLD); c.setFont('M-Bold', 11.5)
        c.drawString(M + 16, y - 11, v)
        c.setFillColor(HexColor('#D8E2F2')); c.setFont('M-Med', 10.5)
        c.drawString(M + 150, y - 11, l)
        y -= 40
    y -= 12
    c.setFillColor(HexColor('#A8B8CC')); c.setFont('M-Med', 10.5)
    for ln in wrap('Метрики через 12 мес: 80–100 тыс. MAU · 4–6 тыс. платящих · D30 ≥ 25% · '
                   '≥15% пользователей выходят на региональный этап ВсОШ · пилоты в 3+ регионах', 106):
        c.drawString(M, y, ln); y -= 15
    c.setFillColor(GLOW); c.setFont('PT-Bold', 16.5)
    c.drawString(M, y - 12, 'Инвестируйте в поколение, которое научится решать задачи, — а не списывать.')
    footer(c, 12, dark=True)
    slide_break(c)

# ============================================================
def build(path):
    c = canvas.Canvas(path, pagesize=(W, H))
    c.setTitle('АРХИМЕД — питч для инвесторов')
    c.setAuthor('Проект АРХИМЕД')
    s_title(c); s_problem(c); s_solution(c); s_product(c); s_moat(c); s_evidence(c)
    s_market(c); s_competitors(c); s_business(c); s_roadmap(c); s_team(c); s_ask(c)
    c.save()
    print('OK:', path)

if __name__ == '__main__':
    build('/Users/mihaildrozdov/Documents/DPsek/ПИТЧ_АРХИМЕД.pdf')
