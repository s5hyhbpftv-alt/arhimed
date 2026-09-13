# -*- coding: utf-8 -*-
"""Карты 615: растр из демоварианта → настоящие контуры SVG.

Метод: пиксель относится к ближайшему цвету палитры округа (разделение
Вороного по цвету), затем по каждому округу берутся связные области,
дыры от подписей заливаются, контур упрощается и сглаживается.

Запуск: PYTHONPATH=../../.py-libs python3 extract_maps.py
Пишет: moscow_paths.json, zones_paths.json и отладочные PNG рядом.
"""
import numpy as np, cv2, json, sys
from PIL import Image, ImageDraw

MOSCOW_SRC = 'emb/p4_0.jpeg'
MOSCOW_REGION = (0, 325, 0, 456)
# цвет каждого округа снят с самого растра (модальная точка внутри области)
MOSCOW_PALETTE = {
    1: (167, 205, 94),  2: (227, 155, 96),  3: (66, 162, 185),
    4: (207, 104, 89),  5: (232, 163, 191), 6: (233, 174, 114),
    7: (125, 204, 211), 8: (123, 107, 152), 9: (248, 219, 179),
    10: (140, 179, 96), 11: (233, 200, 129), 12: (84, 162, 148),
}
MOSCOW_DRAW = {
    1: '#a7cd5e', 2: '#e39b60', 3: '#42a2b9', 4: '#cf6859', 5: '#e8a3bf',
    6: '#e9ae72', 7: '#7dccd3', 8: '#7b6b98', 9: '#f8dbb3', 10: '#8cb360',
    11: '#e9c881', 12: '#54a294',
}

def load(path):
    return np.array(Image.open(path).convert('RGB')).astype(np.int32)

def classify(rgb, palette, tol=58):
    """ближайший цвет палитры; -1 — фон, текст, линии, белые разделители"""
    h, w, _ = rgb.shape
    keys = list(palette.keys())
    cols = np.array([palette[k] for k in keys], np.int32)
    flat = rgb.reshape(-1, 3)
    d = np.linalg.norm(flat[:, None, :] - cols[None, :, :], axis=2)
    idx = d.argmin(axis=1)
    mind = d.min(axis=1)
    idx[mind > tol] = -1
    lab = idx.reshape(h, w)
    # фон: почти белое и почти серое (не цветная заливка карты)
    mx = rgb.max(axis=2); mn = rgb.min(axis=2)
    bg = (mn > 195) & ((mx - mn) < 32)
    lab[bg] = -1
    return {k: (lab == i) for i, k in enumerate(keys)}

def fill_holes(mask):
    m = (mask.astype(np.uint8)) * 255
    cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    out = np.zeros_like(m)
    cv2.drawContours(out, cnts, -1, 255, -1)
    return out > 0

def largest(mask, min_area=40, keep=4):
    m = (mask.astype(np.uint8)) * 255
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(m, 8)
    items = [(stats[i][4], i) for i in range(1, n) if stats[i][4] >= min_area]
    items.sort(key=lambda t: -t[0])
    return [lab == i for _, i in items[:keep]]

def chaikin(pts, iters=1):
    pts = np.array(pts, float)
    for _ in range(iters):
        out = []
        n = len(pts)
        for i in range(n):
            p, q = pts[i], pts[(i + 1) % n]
            out.append(0.75 * p + 0.25 * q)
            out.append(0.25 * p + 0.75 * q)
        pts = np.array(out)
    return pts

def path_of(mask, eps=1.2, smooth=1, min_area=40):
    m = (fill_holes(mask).astype(np.uint8)) * 255
    cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    res = []
    for c in cnts:
        if cv2.contourArea(c) < min_area:
            continue
        ap = cv2.approxPolyDP(c, eps, True).reshape(-1, 2).astype(float)
        if len(ap) < 3:
            continue
        ap = chaikin(ap, smooth) if smooth else ap
        d = 'M' + ' '.join(f'{x:.1f},{y:.1f}' for x, y in ap) + 'Z'
        res.append((float(cv2.contourArea(c)), d))
    res.sort(key=lambda t: -t[0])
    return res

def build_moscow(eps=1.3, smooth=1):
    y0, y1, x0, x1 = MOSCOW_REGION
    rgb = load(MOSCOW_SRC)[y0:y1, x0:x1]
    cls = classify(rgb, MOSCOW_PALETTE)
    out, dbg = {}, Image.new('RGB', (rgb.shape[1], rgb.shape[0]), (255, 255, 255))
    dr = ImageDraw.Draw(dbg)
    for k in MOSCOW_PALETTE:
        paths = []
        for cm in largest(cls[k], 40, keep=4):
            paths += path_of(cm, eps=eps, smooth=smooth)
        paths.sort(key=lambda t: -t[0])
        out[k] = [d for _, d in paths]
        for _, d in paths:
            pts = [tuple(map(float, p.split(','))) for p in d[1:-1].split(' ')]
            dr.polygon(pts, fill=MOSCOW_DRAW[k], outline=(20, 20, 20))
        print(f'округ {k:2d}: областей {len(paths)}, цвет {MOSCOW_PALETTE[k]}')
    dbg.save('debug_moscow.png')
    json.dump({'paths': {str(k): v for k, v in out.items()}, 'w': rgb.shape[1], 'h': rgb.shape[0]},
              open('moscow_paths.json', 'w'), ensure_ascii=False)
    return out

ZONES_SRC = 'emb/p2_1.jpeg'
ZONES_REGION = (370, 625, 20, 420)
ZONES_PALETTE = {
    'МСК+5': (247, 168, 216),
    'МСК+6': (0, 228, 168),
    'МСК+7': (252, 156, 48),
    'МСК+8': (168, 216, 48),
    'МСК+9': (0, 180, 216),
}
ZONES_DRAW = {'МСК+5': '#f7a8d8', 'МСК+6': '#00e4a8', 'МСК+7': '#fc9c30',
              'МСК+8': '#a8d830', 'МСК+9': '#00b4d8'}

def build_zones(eps=1.1, smooth=1, keep=8):
    y0, y1, x0, x1 = ZONES_REGION
    rgb = load(ZONES_SRC)[y0:y1, x0:x1]
    cls = classify(rgb, ZONES_PALETTE, tol=70)
    out, dbg = {}, Image.new('RGB', (rgb.shape[1], rgb.shape[0]), (255, 255, 255))
    dr = ImageDraw.Draw(dbg)
    for k in ZONES_PALETTE:
        paths = []
        for cm in largest(cls[k], 60, keep=keep):
            paths += path_of(cm, eps=eps, smooth=smooth, min_area=60)
        paths.sort(key=lambda t: -t[0])
        out[k] = [d for _, d in paths]
        for _, d in paths:
            pts = [tuple(map(float, p.split(','))) for p in d[1:-1].split(' ')]
            dr.polygon(pts, fill=ZONES_DRAW[k], outline=(20, 20, 20))
        print(f'пояс {k}: областей {len(paths)}')
    dbg.save('debug_zones.png')
    json.dump({'paths': out, 'w': rgb.shape[1], 'h': rgb.shape[0]},
              open('zones_paths.json', 'w'), ensure_ascii=False)
    return out

if __name__ == '__main__':
    what = sys.argv[1] if len(sys.argv) > 1 else 'both'
    if what in ('both', 'moscow'):
        build_moscow()
    if what in ('both', 'zones'):
        build_zones()
