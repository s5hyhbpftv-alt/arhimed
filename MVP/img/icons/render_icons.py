#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Эмалевые иконки АРХИМЕД: ученик (компас) и родитель (щит)."""
from __future__ import annotations
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
SIZE = 1024
CX = CY = SIZE / 2

DEEP = np.array([11, 23, 18], dtype=np.float64)
DEEP_COOL = np.array([10, 20, 24], dtype=np.float64)
LIFT = np.array([36, 68, 50], dtype=np.float64)
LIFT_COOL = np.array([32, 56, 70], dtype=np.float64)
BRASS_L = np.array([247, 224, 160], dtype=np.float64)
BRASS = np.array([217, 164, 65], dtype=np.float64)
BRASS_D = np.array([138, 96, 32], dtype=np.float64)
IVORY = np.array([232, 224, 204], dtype=np.float64)
INK = np.array([8, 14, 12], dtype=np.float64)


def lerp(a, b, t):
    t = np.clip(t, 0, 1)
    return a + (b - a) * t[..., None] if np.ndim(t) else a + (b - a) * t


def brass(t):
    """Металл: свет сверху, тёмная кромка снизу. t 0..1 сверху вниз."""
    t = np.clip(np.asarray(t, dtype=np.float64), 0, 1)
    scalar = t.ndim == 0
    if scalar:
        if float(t) < 0.45:
            return lerp(BRASS_L, BRASS, float(t) / 0.45)
        return lerp(BRASS, BRASS_D, (float(t) - 0.45) / 0.55)
    out = np.empty(t.shape + (3,), dtype=np.float64)
    m = t < 0.45
    out[m] = BRASS_L + (BRASS - BRASS_L) * (t[m] / 0.45)[..., None]
    out[~m] = BRASS + (BRASS_D - BRASS) * ((t[~m] - 0.45) / 0.55)[..., None]
    return out


def canvas(cool=False):
    y, x = np.ogrid[:SIZE, :SIZE]
    dx = (x - CX) / SIZE
    dy = (y - CY) / SIZE
    r = np.sqrt(dx * dx + dy * dy)
    # блик сверху-слева, как на эмали
    lift = np.exp(-((dx + 0.16) ** 2 + (dy + 0.22) ** 2) / 0.22)
    base = DEEP_COOL if cool else DEEP
    hi = LIFT_COOL if cool else LIFT
    rgb = base + (hi - base) * lift[..., None]
    # лёгкое золотое дыхание в центре
    gold = np.exp(-(r ** 2) / 0.18)
    rgb = rgb + (BRASS - rgb) * (gold * 0.07)[..., None]
    img = np.clip(rgb, 0, 255).astype(np.uint8)
    return Image.fromarray(img, "RGB")


def paste_rgba(base, overlay):
    return Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")


def layer(size=SIZE):
    return Image.new("RGBA", (size, size), (0, 0, 0, 0))


def glow(mask_l, color, blur, alpha=0.55):
    """mask_l — L mode, белое светится."""
    g = mask_l.filter(ImageFilter.GaussianBlur(blur))
    arr = np.array(g).astype(np.float64) / 255.0
    out = np.zeros((SIZE, SIZE, 4), dtype=np.uint8)
    out[..., 0] = color[0]
    out[..., 1] = color[1]
    out[..., 2] = color[2]
    out[..., 3] = np.clip(arr * alpha * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def ring(draw, r_out, r_in, col, width_extra=0):
    bbox_o = [CX - r_out, CY - r_out, CX + r_out, CY + r_out]
    bbox_i = [CX - r_in, CY - r_in, CX + r_in, CY + r_in]
    draw.ellipse(bbox_o, outline=col, width=max(1, int(r_out - r_in) + width_extra))


def metallic_ring(img, r_mid, thick):
    """Кольцо с градиентом латуни и внутренней тенью."""
    y, x = np.ogrid[:SIZE, :SIZE]
    dx = x - CX
    dy = y - CY
    r = np.sqrt(dx * dx + dy * dy)
    half = thick / 2
    dist = np.abs(r - r_mid)
    edge = np.clip(1 - dist / half, 0, 1)
    # мягкий край
    edge = np.where(dist < half - 1.2, 1.0, edge)
    # свет сверху
    ny = (dy / (r + 1e-6) + 1) / 2  # 0 сверху, 1 снизу
    col = brass(ny)
    # кромка чуть светлее
    rim = np.exp(-((dist - half + 2) ** 2) / 8)
    col = col + (BRASS_L - col) * (rim * 0.45)[..., None]
    # внутренняя канавка
    inner = np.exp(-((r - (r_mid - half * 0.55)) ** 2) / 10)
    col = col * (1 - 0.22 * inner)[..., None]
    arr = np.array(img).astype(np.float64)
    a = (edge ** 1.1)[..., None]
    arr = arr * (1 - a) + col * a
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def diamond(cx, cy, length, width, angle, inner=0.08):
    """Ромб компаса: острый кнаружи, не доходит до центра."""
    rad = math.radians(angle)
    ux, uy = math.sin(rad), -math.cos(rad)
    vx, vy = math.cos(rad), math.sin(rad)
    tip = (cx + ux * length, cy + uy * length)
    base = (cx + ux * length * inner, cy + uy * length * inner)
    left = (cx + vx * width + ux * length * 0.18, cy + vy * width + uy * length * 0.18)
    right = (cx - vx * width + ux * length * 0.18, cy - vy * width + uy * length * 0.18)
    return [tip, left, base, right]


def draw_compass_points(draw, scale=1.0, cx=None, cy=None, reach=292):
    cx = CX if cx is None else cx
    cy = CY if cy is None else cy
    length = reach * scale
    width = 26 * scale
    for ang in (0, 90, 180, 270):
        L = length * (1.08 if ang == 0 else 1.0)
        pts = diamond(cx, cy, L, width * (1.08 if ang == 0 else 1.0), ang, inner=0.40)
        tip, left, base, right = pts
        # светлая грань
        draw.polygon([tip, left, base], fill=tuple(int(c) for c in BRASS_L) + (255,))
        # тёмная грань
        draw.polygon([tip, right, base], fill=tuple(int(c) for c in BRASS_D) + (255,))
        # тонкая светлая ось
        draw.line([tip, base], fill=tuple(int(c) for c in BRASS_L) + (180,), width=2)


def spiral_points(turns=1.55, a=36, b=6.4, n=280, cx=None, cy=None):
    cx = CX if cx is None else cx
    cy = CY if cy is None else cy
    pts = []
    tmax = turns * 2 * math.pi
    for i in range(n):
        t = tmax * i / (n - 1)
        r = a + b * t
        x = cx + r * math.cos(t - math.pi / 2)
        y = cy + r * math.sin(t - math.pi / 2)
        pts.append((x, y))
    return pts


def draw_spiral(draw, width=9):
    pts = spiral_points()
    # тень
    shadow = [(x + 1.6, y + 2.2) for x, y in pts]
    draw.line(shadow, fill=(60, 40, 12, 110), width=width + 2, joint="curve")
    draw.line(pts, fill=tuple(int(c) for c in BRASS) + (255,), width=width, joint="curve")
    # светлая кромка
    draw.line(pts, fill=tuple(int(c) for c in BRASS_L) + (160,), width=max(3, width - 4), joint="curve")


def ticks(draw, r, n=72, long_every=6):
    for i in range(n):
        ang = math.radians(i * 360 / n)
        long = (i % long_every == 0)
        inner = r - (18 if long else 10)
        outer = r + (2 if long else 0)
        x1 = CX + inner * math.sin(ang)
        y1 = CY - inner * math.cos(ang)
        x2 = CX + outer * math.sin(ang)
        y2 = CY - outer * math.cos(ang)
        col = tuple(int(c) for c in (BRASS_L if long else BRASS)) + (230 if long else 170,)
        draw.line([(x1, y1), (x2, y2)], fill=col, width=3 if long else 2)


def cabochon(draw, r=34):
    bbox = [CX - r, CY - r, CX + r, CY + r]
    draw.ellipse(bbox, fill=tuple(int(c) for c in BRASS) + (255,))
    draw.ellipse([CX - r + 4, CY - r + 4, CX + r - 4, CY + r - 4],
                 fill=tuple(int(c) for c in BRASS_D) + (255,))
    draw.ellipse([CX - r + 9, CY - r + 9, CX + r - 9, CY + r - 9],
                 fill=tuple(int(c) for c in BRASS_L) + (255,))
    # блик
    draw.ellipse([CX - r * 0.35, CY - r * 0.55, CX + r * 0.05, CY - r * 0.08],
                 fill=(255, 248, 220, 200))


def heater_shield(scale=1.0):
    """Классический heater: плоский верх, острый низ."""
    w, h = 310 * scale, 390 * scale
    top, bot = CY - h * 0.62, CY + h * 0.58
    left, right = CX - w, CX + w
    # верхние углы слегка скруглены — аппроксимация
    pts = []
    # верх слева направо
    for i in range(12):
        t = i / 11
        x = left + 36 * scale + (2 * w - 72 * scale) * t
        y = top
        pts.append((x, y))
    # правый верхний угол
    for i in range(8):
        t = i / 7
        ang = -math.pi / 2 + t * math.pi / 2
        pts.append((right - 36 * scale + 36 * scale * math.cos(ang) * 0 + (right - 18 * scale) * 0,
                    top + 28 * scale * (1 - math.cos(t * math.pi / 2))))
    # пересоберём аккуратнее через кубические безье
    return bezier_shield(w, h)


def bezier(p0, p1, p2, p3, n=24):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        x = u ** 3 * p0[0] + 3 * u ** 2 * t * p1[0] + 3 * u * t ** 2 * p2[0] + t ** 3 * p3[0]
        y = u ** 3 * p0[1] + 3 * u ** 2 * t * p1[1] + 3 * u * t ** 2 * p2[1] + t ** 3 * p3[1]
        pts.append((x, y))
    return pts


def bezier_shield(w=318, h=400):
    top = CY - h * 0.56
    bot = CY + h * 0.64
    left, right = CX - w, CX + w
    r = 52
    pts = []
    pts += bezier((left + r, top), (left + r * 0.35, top), (left, top + r * 0.35), (left, top + r), 14)
    pts += bezier((left, top + r), (left, CY + 70), (left + w * 0.18, bot - 70), (CX, bot), 32)
    pts += bezier((CX, bot), (right - w * 0.18, bot - 70), (right, CY + 70), (right, top + r), 32)
    pts += bezier((right, top + r), (right, top + r * 0.35), (right - r * 0.35, top), (right - r, top), 14)
    pts += bezier((right - r, top), (CX, top - 2), (CX, top - 2), (left + r, top), 16)
    return pts


def fill_poly_aa(img, pts, color, outline=None, width=1):
    ov = layer()
    d = ImageDraw.Draw(ov)
    d.polygon(pts, fill=color, outline=outline)
    return paste_rgba(img, ov)


def student_icon():
    img = canvas(cool=False)
    # золотое свечение под компасом
    mask = Image.new("L", (SIZE, SIZE), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([CX - 360, CY - 360, CX + 360, CY + 360], fill=255)
    img = paste_rgba(img, glow(mask, BRASS, 48, 0.28))

    ov = layer()
    d = ImageDraw.Draw(ov)
    # внутренний диск
    d.ellipse([CX - 268, CY - 268, CX + 268, CY + 268], fill=(14, 28, 22, 230))
    img = paste_rgba(img, ov)
    img = metallic_ring(img, 348, 46)
    img = metallic_ring(img, 300, 8)

    ov = layer()
    d = ImageDraw.Draw(ov)
    ticks(d, 318)
    draw_spiral(d, width=7)
    draw_compass_points(d, scale=1.0, reach=300)
    cabochon(d, 30)
    img = paste_rgba(img, ov)

    # тонкая внешняя обводка-монета
    ov = layer()
    d = ImageDraw.Draw(ov)
    d.ellipse([CX - 392, CY - 392, CX + 392, CY + 392], outline=tuple(int(c) for c in BRASS_L) + (70,), width=3)
    img = paste_rgba(img, ov)
    return img


def parent_icon():
    img = canvas(cool=True)
    shield = bezier_shield()
    # тень щита
    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).polygon(shield, fill=255)
    sh = glow(mask, (0, 0, 0), 22, 0.55)
    # сдвиг тени вниз
    sh2 = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    sh2.paste(sh, (0, 10), sh)
    img = paste_rgba(img, sh2)
    img = paste_rgba(img, glow(mask, BRASS, 36, 0.32))

    # заливка щита
    img = fill_poly_aa(img, shield, (14, 26, 32, 245))

    # латунная кромка: несколько обводок
    ov = layer()
    d = ImageDraw.Draw(ov)
    d.line(shield, fill=tuple(int(c) for c in BRASS) + (255,), width=28, joint="curve")
    d.line(shield, fill=tuple(int(c) for c in BRASS_L) + (180,), width=12, joint="curve")
    img = paste_rgba(img, ov)

    # внутренний щит (чуть меньше)
    inner = bezier_shield(w=268, h=340)
    img = fill_poly_aa(img, inner, (10, 20, 24, 255))

    # мини-компас внутри щита — родство с иконкой ученика
    ov = layer()
    d = ImageDraw.Draw(ov)
    cy = CY - 12
    rr = 124
    d.ellipse([CX - rr, cy - rr, CX + rr, cy + rr],
              outline=tuple(int(c) for c in BRASS) + (255,), width=11)
    d.ellipse([CX - rr + 16, cy - rr + 16, CX + rr - 16, cy + rr - 16],
              outline=tuple(int(c) for c in BRASS_D) + (200,), width=3)
    draw_compass_points(d, scale=0.62, cx=CX, cy=cy, reach=168)
    d.ellipse([CX - 22, cy - 22, CX + 22, cy + 22], fill=tuple(int(c) for c in BRASS) + (255,))
    d.ellipse([CX - 12, cy - 12, CX + 12, cy + 12], fill=tuple(int(c) for c in BRASS_L) + (255,))
    d.ellipse([CX - 8, cy - 14, CX + 2, cy - 4], fill=(255, 248, 220, 210))

    # три точки семьи под компасом
    by = CY + 178
    for dx in (-30, 0, 30):
        d.ellipse([CX + dx - 9, by - 9, CX + dx + 9, by + 9], fill=tuple(int(c) for c in BRASS_L) + (235,))
        d.ellipse([CX + dx - 4, by - 6, CX + dx + 2, by - 1], fill=(255, 248, 220, 160))
    img = paste_rgba(img, ov)
    return img


def down(img, size):
    return img.resize((size, size), Image.Resampling.LANCZOS)


def save_set(img, stem):
    img.save(HERE / f"{stem}-1024.png", "PNG", optimize=True)
    for s in (512, 192, 180, 32):
        down(img, s).save(HERE / f"{stem}-{s}.png", "PNG", optimize=True)
    # maskable = тот же полный квадрат (заливка до края, знак в 80%)
    down(img, 512).save(HERE / f"{stem}-512-maskable.png", "PNG", optimize=True)
    down(img, 180).save(HERE / f"{stem}-apple.png", "PNG", optimize=True)


def write_favicons():
    (HERE / "favicon-student.svg").write_text("""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0b1712"/>
  <circle cx="16" cy="16" r="11.2" fill="none" stroke="#d9a441" stroke-width="2.2"/>
  <path fill="#f3d58a" d="M16 4.2l1.9 10.4L16 27.8l-1.9-13.2z"/>
  <path fill="#d9a441" d="M4.2 16l10.4-1.9L27.8 16l-13.2 1.9z"/>
  <circle cx="16" cy="16" r="2.4" fill="#f3d58a"/>
</svg>
""", encoding="utf-8")
    (HERE / "favicon-parent.svg").write_text("""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0c161a"/>
  <path fill="#d9a441" d="M7.2 5.6h17.6c.7 0 1.2.5 1.2 1.2v8.6c0 5.2-3.7 8.8-10 10.8-6.3-2-10-5.6-10-10.8V6.8c0-.7.5-1.2 1.2-1.2z"/>
  <path fill="#0c161a" d="M9.2 7.6h13.6v7.6c0 4.2-2.8 7.1-6.8 8.7-4-1.6-6.8-4.5-6.8-8.7V7.6z"/>
  <path fill="#f3d58a" d="M16 10.2l1.2 5.2L16 21.4l-1.2-6z"/>
  <path fill="#d9a441" d="M11.4 15.4l4.6-1.2 4.6 1.2-4.6 1.2z"/>
  <circle cx="16" cy="15.4" r="1.6" fill="#f3d58a"/>
</svg>
""", encoding="utf-8")


def write_masters():
    """Полные SVG — те же знаки, что на PNG, для favicon и шапки."""
    (HERE / "student.svg").write_text("""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="34%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#244632"/>
      <stop offset="100%" stop-color="#0b1712"/>
    </radialGradient>
    <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7e0a0"/>
      <stop offset="45%" stop-color="#d9a441"/>
      <stop offset="100%" stop-color="#8a6020"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d9a441" stop-opacity=".28"/>
      <stop offset="100%" stop-color="#d9a441" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <circle cx="512" cy="512" r="400" fill="url(#glow)"/>
  <circle cx="512" cy="512" r="268" fill="#0e1c16"/>
  <circle cx="512" cy="512" r="348" fill="none" stroke="url(#brass)" stroke-width="46"/>
  <circle cx="512" cy="512" r="300" fill="none" stroke="#8a6020" stroke-width="6"/>
  <g stroke="#d9a441" stroke-linecap="round">
    <!-- метки компаса: 12 длинных -->
    <g stroke-width="4" stroke="#f3d58a">
      <line x1="512" y1="176" x2="512" y2="196"/><line x1="512" y1="828" x2="512" y2="848"/>
      <line x1="176" y1="512" x2="196" y2="512"/><line x1="828" y1="512" x2="848" y2="512"/>
    </g>
  </g>
  <polygon fill="#f7e0a0" points="512,188 536,512 512,836 488,512"/>
  <polygon fill="#d9a441" points="188,512 512,488 836,512 512,536"/>
  <polygon fill="#c49238" points="300,300 512,500 512,524 324,324"/>
  <polygon fill="#c49238" points="724,300 524,512 500,512 700,324"/>
  <polygon fill="#c49238" points="724,724 512,524 512,500 700,700"/>
  <polygon fill="#c49238" points="300,724 500,512 524,512 324,700"/>
  <path fill="none" stroke="#d9a441" stroke-width="10" stroke-linecap="round"
        d="M512,490 C520,470 548,462 568,478 C590,496 586,532 562,548 C530,568 488,552 478,516 C466,470 502,430 548,424 C608,416 656,466 658,528 C660,606 588,666 512,666 C412,666 338,580 338,486 C338,362 450,274 576,274"/>
  <circle cx="512" cy="512" r="32" fill="url(#brass)"/>
  <circle cx="512" cy="512" r="18" fill="#f7e0a0"/>
  <ellipse cx="502" cy="500" rx="8" ry="6" fill="#fff8dc" opacity=".85"/>
</svg>
""", encoding="utf-8")
    (HERE / "parent.svg").write_text("""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bgp" cx="34%" cy="28%" r="72%">
      <stop offset="0%" stop-color="#203848"/>
      <stop offset="100%" stop-color="#0c161a"/>
    </radialGradient>
    <linearGradient id="brassp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f7e0a0"/>
      <stop offset="45%" stop-color="#d9a441"/>
      <stop offset="100%" stop-color="#8a6020"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bgp)"/>
  <path fill="#0e1a20" stroke="url(#brassp)" stroke-width="28"
        d="M210,220 C210,188 232,168 264,168 H760 C792,168 814,188 814,220
           V500 C814,700 680,820 512,888 C344,820 210,700 210,500 Z"/>
  <path fill="#0a1418"
        d="M258,228 C258,214 270,204 286,204 H738 C754,204 766,214 766,228
           V498 C766,672 654,778 512,836 C370,778 258,672 258,498 Z"/>
  <circle cx="512" cy="494" r="118" fill="none" stroke="#d9a441" stroke-width="10"/>
  <polygon fill="#f7e0a0" points="512,398 528,494 512,590 496,494"/>
  <polygon fill="#d9a441" points="416,494 512,478 608,494 512,510"/>
  <circle cx="512" cy="494" r="18" fill="#f7e0a0"/>
  <circle cx="484" cy="682" r="8" fill="#f7e0a0"/>
  <circle cx="512" cy="682" r="8" fill="#f7e0a0"/>
  <circle cx="540" cy="682" r="8" fill="#f7e0a0"/>
</svg>
""", encoding="utf-8")


def main():
    print("рисую ученика…")
    s = student_icon()
    print("рисую родителя…")
    p = parent_icon()
    save_set(s, "student")
    save_set(p, "parent")
    write_favicons()
    write_masters()
    # превью рядом — для проверки
    preview = Image.new("RGB", (512 * 2 + 48, 512 + 32), (20, 28, 24))
    preview.paste(down(s, 512), (16, 16))
    preview.paste(down(p, 512), (512 + 32, 16))
    preview.save(HERE / "preview-pair.png", "PNG")
    print("готово:", HERE)


if __name__ == "__main__":
    main()
