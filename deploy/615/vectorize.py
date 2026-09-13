# -*- coding: utf-8 -*-
"""Векторизация карт из демоварианта: растр → контуры SVG.

Источник: deploy/615/emb/p4_0.jpeg (карта Москвы, 12 округов) и
deploy/615/emb/p2_1.jpeg (карта часовых поясов Дальневосточного округа).
Метод: цветовая сегментация → заливка дыр от подписей → контуры cv2 →
упрощение approxPolyDP → путь SVG в собственной системе координат.
"""
import sys, json, math
import numpy as np
import cv2
from PIL import Image

def load(path):
    return np.array(Image.open(path).convert('RGB')).astype(np.int16)

def kmeans_colors(a, mask, k=14, seed=3):
    px = a[mask].astype(np.float32)
    crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 40, 0.5)
    rng = np.random.RandomState(seed)
    _, lab, cen = cv2.kmeans(px, k, None, crit, 6, cv2.KMEANS_PP_CENTERS)
    counts = np.bincount(lab.ravel(), minlength=k)
    return cen, counts

def classify(a, colors, tol=60):
    """ближайший цвет из палитры"""
    h, w, _ = a.shape
    flat = a.reshape(-1, 3).astype(np.int32)
    d = np.linalg.norm(flat[:, None, :] - np.array(colors)[None, :, :].astype(np.int32), axis=2)
    idx = d.argmin(axis=1)
    mind = d.min(axis=1)
    idx[mind > tol] = -1
    return idx.reshape(h, w)

def contour_to_path(cnt, eps, scale, ox, oy, prec=1):
    ap = cv2.approxPolyDP(cnt, eps, True).reshape(-1, 2)
    if len(ap) < 3:
        return None, 0
    pts = []
    for x, y in ap:
        pts.append((round((x - ox) * scale, prec), round((y - oy) * scale, prec)))
    d = 'M' + ' '.join(f'{p[0]},{p[1]}' for p in pts) + 'Z'
    return d, len(ap)

def mask_to_paths(mask, eps=1.2, scale=1.0, ox=0.0, oy=0.0, min_area=25, kernel=5):
    m = (mask.astype(np.uint8)) * 255
    if kernel:
        k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel, kernel))
        m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k)
        m = cv2.morphologyEx(m, cv2.MORPH_OPEN, k)
    cnts, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    out = []
    for c in cnts:
        if cv2.contourArea(c) < min_area:
            continue
        d, n = contour_to_path(c, eps, scale, ox, oy)
        if d:
            out.append((cv2.contourArea(c), d, n))
    out.sort(key=lambda t: -t[0])
    return out

def report(name, paths, limit=6):
    print(f'--- {name}: контуров {len(paths)}')
    for a, d, n in paths[:limit]:
        print(f'    площадь {a:8.1f} точек {n:4d} длина {len(d):5d}')
    return paths
