#!/usr/bin/env python3
"""Школьная физика: плотность, Паскаль, Ом. g = 10, как в задачниках."""
from __future__ import annotations

G = 10.0  # Н/кг, школьное
G_SI = 9.81


def density(m: float, V: float) -> dict:
    V = float(V) or 1e-12
    rho = float(m) / V
    return {
        "m": float(m),
        "V": float(V),
        "rho": round(rho, 4),
        "unit": "g/cm3",
        "water": 1.0,
        "floats": rho < 1.0,
        "sinks": rho > 1.0,
        "suspends": abs(rho - 1.0) < 1e-9,
    }


def float_state(rho: float, rho_liq: float = 1.0) -> dict:
    rho = float(rho)
    rho_liq = float(rho_liq) or 1.0
    if rho >= rho_liq:
        return {"frac": 1.0, "sink": True, "note": "тонет"}
    if rho <= 0:
        return {"frac": 0.0, "sink": False, "note": "на поверхности"}
    return {"frac": round(rho / rho_liq, 4), "sink": False, "note": "плавает"}


def pascal(rho: float, h: float, g: float = G) -> dict:
    p = float(rho) * float(g) * float(h)
    return {
        "rho": float(rho),
        "h": float(h),
        "g": float(g),
        "Pa": round(p, 2),
        "kPa": round(p / 1000.0, 4),
    }


def jet(fill_m: float, hole_from_bottom: float, fall_m: float = 0.04, n: int = 18) -> dict:
    """Скорость из Торичелли v=√(2gh). Дальность за одинаковое падение fall_m —
    так школьный опыт «нижняя бьёт дальше» совпадает с физикой скорости."""
    depth = float(fill_m) - float(hole_from_bottom)
    if depth <= 0:
        return {"v": 0.0, "range": 0.0, "pts": []}
    v = (2.0 * G_SI * depth) ** 0.5
    t = (2.0 * float(fall_m) / G_SI) ** 0.5
    rng = v * t
    pts = []
    for i in range(n):
        ti = t * i / (n - 1)
        x = v * ti
        y = float(fall_m) - 0.5 * G_SI * ti * ti
        pts.append([round(x, 4), round(max(0.0, y), 4)])
    return {"v": round(v, 4), "range": round(rng, 4), "depth": round(depth, 4), "pts": pts}


def ohm(U: float, R: float) -> dict:
    R = float(R) or 1e-12
    I = float(U) / R
    return {
        "U": float(U),
        "R": float(R),
        "I": round(I, 4),
        "P": round(I * I * float(R), 4),
        "period": round(max(0.28, min(2.4, 2.0 / max(0.25, I))), 3),
    }


def series_ph(rho: float, hmax: float = 10.0, n: int = 11) -> list:
    out = []
    for i in range(n):
        h = hmax * i / (n - 1)
        out.append([round(h, 3), round(pascal(rho, h)["kPa"], 3)])
    return out


def series_iu(R: float, umax: float = 24.0, n: int = 13) -> list:
    out = []
    for i in range(n):
        U = umax * i / (n - 1)
        out.append([round(U, 3), round(ohm(U, R)["I"], 4)])
    return out


def series_ir(U: float, rmax: float = 24.0, n: int = 12) -> list:
    out = []
    for i in range(1, n + 1):
        R = rmax * i / n
        out.append([round(R, 3), round(ohm(U, R)["I"], 4)])
    return out


def series_frac(n: int = 17) -> list:
    out = []
    for i in range(n):
        rho = 0.2 + 1.6 * i / (n - 1)
        st = float_state(rho, 1.0)
        out.append([round(rho, 3), st["frac"], 1 if st["sink"] else 0])
    return out


def bottle_jets(fill: float = 0.18) -> list:
    holes = [0.15, 0.10, 0.05]
    return [{"y": y, **jet(fill, y)} for y in holes]


def handle(kind: str, q: dict) -> dict:
    if kind == "density":
        return density(float(q.get("m", 6)), float(q.get("V", 3)))
    if kind == "float":
        return float_state(float(q.get("rho", 0.9)), float(q.get("liq", 1)))
    if kind == "pascal":
        return pascal(float(q.get("rho", 1000)), float(q.get("h", 5)))
    if kind == "ohm":
        return ohm(float(q.get("U", 12)), float(q.get("R", 6)))
    if kind == "jet":
        return jet(float(q.get("fill", 0.18)), float(q.get("hole", 0.05)))
    return {"error": "unknown"}
