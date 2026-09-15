#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Проверка олимпиадных туров (deploy/ТУР_*.md и ТУР_*.json).

Что проверяет машинно, без чтения источника:
  1. JSON разбирается, схема на месте (tour, источник, макс_балл, время_минут, tasks).
  2. Сумма points равна макс_балл; у каждой задачи points > 0 и есть подсказки.
  3. id задач: префикс совпадает с именем файла (tour14-chem9-* у ТУР_ХИМИЯ_9),
     нумерация 1..N без дыр и повторов.
  4. У каждой задачи есть все обязательные поля, непустые answer/hints/sol/trap,
     diff — целое 1..5.
  5. Баллы задач совпадают с баллами, которые видны в таблице «Как устроен тур»,
     и их сумма равна строке «Всего» в .md.
  6. Названия шагов в .md и .json — с точностью до служебной приставки
     («Дело 1.», «Печать II.», «Лист 3.», «I.», «1.»).
  7. Название сюжета из «tour» стоит в заголовке .md.
  8. Незаполненные места и следы черновика (TODO, ???, <...>, lorem).

Чего не проверяет: правильность самих ответов и совпадение с источником.
Это проверяет человек и отдельный разбор: гейт ловит только расхождения
между документом и данными и неполноту.

Запуск:  python3 qa_tour.py                 # все туры
         python3 qa_tour.py ТУР_ФИЗИКА_7
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DEPLOY = os.path.join(ROOT, "deploy")

REQUIRED_TOP = ("tour", "источник", "макс_балл", "время_минут", "tasks")
REQUIRED_TASK = ("id", "island", "theme", "rule", "title", "diff", "story", "q",
                 "type", "answer", "points", "hints", "sol", "trap")
PREFIX = {"ТУР_РУССКИЙ": "rus", "ТУР_ИНФОРМАТИКА": "inf", "ТУР_ХИМИЯ": "chem",
          "ТУР_ФИЗИКА": "phys", "ТУР_МАТЕМАТИКА": "math"}

# «Дело 1. », «Печать II. », «Лист 3. », «Пост 2. », «Ящик 1. », «Шаг IV. »,
# «I. », «1. » — служебная приставка, она не часть названия шага
STRIP_PREFIX = re.compile(
    r"^(?:дело|печать|лист|пост|ящик|шаг|этап|тур|глава|часть|пункт|проверка)"
    r"\s*[IVXХ\d]+\s*[.):]\s*|^[IVXХ]+\s*[.):]\s*|^\d+\s*[.)]\s*",
    re.IGNORECASE)

problems = []
checks = 0


def bad(msg):
    problems.append(msg)


def ok():
    global checks
    checks += 1


def norm(name):
    return STRIP_PREFIX.sub("", str(name)).strip().strip("*").strip().lower()


def md_tables(md):
    """Строки таблицы шагов с баллами: (все текстовые ячейки, число баллов).

    Таблица шагов — это первый связный блок таблицы, у которого есть строка-
    разделитель и хотя бы одна строка, кончающаяся числом. Такой признак
    отличает её от таблиц данных: в них строка-разделитель тоже есть, но
    числа в правой колонке нет (шкала баллов «18–20 | результат» числом не
    кончается, а перечень слов со номерами строку-разделитель имеет, зато
    в шапке числа нет и число-в-правой-колонке встречается лишь иногда).
    Формат самой таблицы у туров разный («шаг | что найти | баллы» или
    «шаг | что решаем | баллы»), поэтому запоминаем весь набор ячеек строки.
    """
    groups, cur, prev = [], [], None
    for idx, line in enumerate(md.splitlines()):
        if not line.startswith("|"):
            continue
        if prev is not None and idx != prev + 1:
            groups.append(cur)
            cur = []
        cur.append(line)
        prev = idx
    if cur:
        groups.append(cur)

    best = []
    for g in groups:
        has_sep = any(re.fullmatch(r"\|[\s\-:|]+\|", l.strip()) for l in g)
        numeric = []
        for line in g:
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            m = re.fullmatch(r"\*{0,2}(\d+)\*{0,2}", cells[-1]) if cells else None
            if m and not re.search(r"бонус", line, re.IGNORECASE):
                numeric.append(([c for c in cells[:-1]
                                 if c and not re.fullmatch(r"[-: ]+", c)],
                                int(m.group(1))))
        if has_sep and len(numeric) > len(best):
            best = numeric
    return best


def grouped_points(tasks, rows):
    """Сгруппировать подшаги таблицы в баллы задач.

    Часть туров расписывает задачу несколькими подшагами: в .json у задачи
    один балл, а в таблице .md — несколько строк, сумма которых равна ему.
    Идём по строкам слева направо и набираем подшаги, пока сумма не совпадёт
    с баллом очередной задачи. Возвращаем список баллов задач или None.
    """
    out, acc = [], 0
    idx = 0
    for words, p in rows:
        # строка-заголовок группы («Смена 1. Дорога на гидропост — 11 баллов»)
        # не подшаг, а название группы: она не входит в сумму подшагов
        if len(words) < 2 and re.search(r"\d+\s*балл", words[0] if words else ""):
            continue
        # строка «Всего» — итог, в сумму подшагов не входит
        if any("всего" in w.lower() for w in words):
            continue
        acc += p
        if idx < len(tasks) and acc == tasks[idx]["points"]:
            out.append(acc)
            idx += 1
            acc = 0
    if idx == len(tasks) and acc == 0:
        return out
    return None


def check_tour(stem):
    md_path = os.path.join(DEPLOY, stem + ".md")
    js_path = os.path.join(DEPLOY, stem + ".json")
    for p in (md_path, js_path):
        if not os.path.exists(p):
            bad(f"{stem}: нет файла {os.path.relpath(p, ROOT)}")
            return
    try:
        d = json.load(open(js_path, encoding="utf-8"))
    except Exception as e:
        bad(f"{stem}: JSON не разбирается — {e}")
        return
    md = open(md_path, encoding="utf-8").read()

    if any(k not in d for k in REQUIRED_TOP):
        for k in REQUIRED_TOP:
            if k not in d:
                bad(f"{stem}: в JSON нет поля «{k}»")
        return
    ok()

    tasks = d["tasks"]
    if not isinstance(tasks, list) or not tasks:
        bad(f"{stem}: tasks пуст")
        return
    total = 0
    for t in tasks:
        tid = t.get("id", "?")
        for k in REQUIRED_TASK:
            if k not in t:
                bad(f"{stem}/{tid}: нет поля «{k}»")
                continue
            v = t[k]
            if k == "diff":
                if not isinstance(v, int) or not 1 <= v <= 5:
                    bad(f"{stem}/{tid}: diff={v!r}, нужно целое 1..5")
            elif k in ("answer", "hints"):
                # answer бывает числом (индекс верного варианта), в том числе 0,
                # поэтому «пусто» — это None, "", [], {} и только они
                if v is None or (isinstance(v, (str, list, dict)) and len(v) == 0):
                    bad(f"{stem}/{tid}: поле «{k}» пустое")
            elif isinstance(v, str) and not v.strip():
                bad(f"{stem}/{tid}: поле «{k}» пустое")
        if not isinstance(t.get("points"), int) or t["points"] <= 0:
            bad(f"{stem}/{tid}: points={t.get('points')!r}")
        else:
            total += t["points"]
        if isinstance(t.get("hints"), list) and len(t["hints"]) < 2:
            bad(f"{stem}/{tid}: подсказок меньше двух")
    ok()

    if total != d["макс_балл"]:
        bad(f"{stem}: сумма points {total} ≠ макс_балл {d['макс_балл']}")
    else:
        ok()

    m = re.match(r"ТУР_([А-ЯЁ]+)_(\d+)", stem)
    if not m:
        bad(f"{stem}: имя файла не разобрать как ТУР_<ПРЕДМЕТ>_<КЛАСС>")
    elif PREFIX.get("ТУР_" + m.group(1)) is None:
        bad(f"{stem}: неизвестный предмет «{m.group(1)}»")
    else:
        key = "ТУР_" + m.group(1)
        want = re.compile(r"^tour\d+-" + PREFIX[key] + m.group(2) + r"-(\d+)$")
        nums = []
        for t in tasks:
            mm = want.match(str(t.get("id")))
            if not mm:
                bad(f"{stem}: id «{t.get('id')}» не по шаблону tour<N>-"
                    f"{PREFIX[key]}{m.group(2)}-<номер>")
            else:
                nums.append(int(mm.group(1)))
        if nums and sorted(nums) != list(range(1, len(nums) + 1)):
            bad(f"{stem}: нумерация id {sorted(nums)}, ожидалось 1..{len(nums)}")
        else:
            ok()

    # баллы шагов: в таблице «Как устроен тур» должны стоять те же числа.
    # Формат таблицы у туров разный, поэтому сверяем мультимножества баллов.
    # Строку «Всего» исключаем: она равна максимуму, и без этого исключения
    # максимум попал бы в набор дважды.
    rows = md_tables(md)
    js_points = [t["points"] for t in tasks]
    md_points = [p for _, p in rows if p != d["макс_балл"]]
    if not md_points:
        # у самого первого тура (5 класс) таблицы шагов нет вовсе: баллы стоят
        # в заголовках разделов. Проверяем их так.
        heads = re.findall(r"^##+ .+?\((\d+) балл", md, re.MULTILINE)
        if sorted(int(x) for x in heads) == sorted(js_points):
            ok()
        else:
            bad(f"{stem}: в .md не нашлась таблица шагов с баллами, "
                f"а баллы в заголовках {heads} ≠ в .json {js_points}")
    elif sorted(md_points) == sorted(js_points):
        ok()
    elif grouped_points(tasks, rows) == js_points:
        # таблица разбита на подшаги: у задачи в .json один балл, а в .md
        # несколько строк-подшагов, которые в сумме дают этот балл
        ok()
    else:
        bad(f"{stem}: баллы шагов в .md {sorted(md_points)} ≠ в .json {sorted(js_points)}")

    # названия шагов: у части туров таблица устроена как «шаг | что решаем»,
    # а название шага стоит над таблицей или в строке-заголовке группы.
    # Поэтому ищем характерное слово названия в подписях с баллами и в строках
    # таблицы, а не только в самой таблице.
    haystack = " ".join(norm(c) for words, _ in rows for c in words)
    haystack += " " + " ".join(norm(l) for l in md.splitlines() if "балл" in l.lower())
    missing = []
    for t in tasks:
        words = [w for w in re.findall(r"[а-яёА-ЯЁ]{6,}", str(t["title"])) if norm(w)]
        if words and not any(norm(w) in haystack for w in words):
            missing.append(t["title"])
    if missing and md_points:
        bad(f"{stem}: названий шагов нет в таблице .md: {missing[:3]}")
    else:
        ok()

    # заголовок .md и сюжет
    first = md.lstrip().splitlines()[0] if md.strip() else ""
    if not first.startswith("# "):
        bad(f"{stem}: .md не начинается с заголовка первого уровня")
    else:
        ok()
    plot = re.search(r"«([^»]+)»", d["tour"])
    if plot and plot.group(1).lower() not in first.lower():
        bad(f"{stem}: название сюжета «{plot.group(1)}» не стоит в заголовке .md")
    else:
        ok()
    mx = re.search(r"\*\*Всего\*\*\s*\|\s*\*\*(\d+)\*\*", md)
    if mx and int(mx.group(1)) != d["макс_балл"]:
        bad(f"{stem}: строка «Всего» в .md ({mx.group(1)}) ≠ макс_балл ({d['макс_балл']})")
    else:
        ok()

    for pat, why in ((r"TODO|FIXME|XXX", "черновой маркер"),
                     (r"\?\?\?|…\?|<[а-яА-Я ]+>", "пустое место"),
                     (r"lorem", "рыба-текст")):
        if re.search(pat, md):
            bad(f"{stem}: в .md найдено «{why}» ({pat})")
        else:
            ok()
    if "Чужие подборки целиком не публикуем" not in md:
        bad(f"{stem}: в .md нет правовой оговорки")
    else:
        ok()

    # путевой каркас документа: у тура должна быть таблица шагов с баллами
    # или раздел «Как устроен тур» — и раздел с итоговой шкалой
    heads = re.findall(r"^##\s+(.+)$", md, re.MULTILINE)
    if not md_points and not any("как устроен тур" in h.lower() for h in heads):
        bad(f"{stem}: в .md нет ни таблицы шагов с баллами, ни раздела «Как устроен тур»")
    else:
        ok()
    if not any("итог" in h.lower() or "шкала" in h.lower() for h in heads):
        bad(f"{stem}: в .md нет раздела с итоговой шкалой")
    else:
        ok()


def main():
    names = sys.argv[1:]
    if not names:
        names = sorted(f[:-5] for f in os.listdir(DEPLOY)
                       if f.startswith("ТУР_") and f.endswith(".json"))
    for stem in names:
        check_tour(stem)
    print(f"Туров проверено: {len(names)}")
    print(f"Проверок пройдено: {checks}")
    if problems:
        print(f"\nНАЙДЕНО {len(problems)}:")
        for p in problems:
            print("  ·", p)
        return 1
    print("Расхождений нет.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
