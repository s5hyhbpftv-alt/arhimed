# -*- coding: utf-8 -*-
"""Превращает вырезанные контуры карт в JS-строки для vis_ru.js.

Вход: moscow_paths.json, zones_paths.json.
Выход: map_js.txt — фрагмент кода с константами MOSCOW / ZONES.
"""
import json, re, math

def scale_path(d, s, ox, oy, prec=1):
    body = d[1:-1]
    out = []
    for pair in body.split(' '):
        x, y = pair.split(',')
        out.append(f'{round(float(x)*s+ox, prec)},{round(float(y)*s+oy, prec)}')
    return 'M' + ' '.join(out) + 'Z'

def emit(name, paths_by_key, tx, header):
    lines = [header, f'  const {name}={{']
    for k, arr in paths_by_key.items():
        ds = [scale_path(d, *tx) for d in arr]
        lines.append(f"    '{k}':['" + "','".join(ds) + "'],")
    lines.append('  };')
    return '\n'.join(lines)

# ---------------------------------------------------------------- Москва
m = json.load(open('moscow_paths.json'))
W, H = 360, 428
BX0, BY0, BW, BH = 86, 11, 265, 319        # bbox содержимого карты в растре
s = 330.0 / BW
ox = (W - BW*s) / 2.0
oy = 14.0
tx_m = (s, ox - BX0*s, oy - BY0*s)
MP = {k: v for k, v in m['paths'].items()}

def T(pt):
    return (round((pt[0]-BX0)*s+ox, 1), round((pt[1]-BY0)*s+oy, 1))

labels = {1:(271,119), 2:(252,81), 3:(274,81), 4:(306,100), 5:(305,143),
          6:(281,171), 7:(256,156), 8:(236,134), 9:(230,92), 10:(173,24),
          11:(228,197), 12:(176,277)}
names = {'ВАО':(306,113), 'ЗАО':(237,147), 'ЮАО':(281,184)}

out = []
out.append(emit('MOSCOW', MP, tx_m,
    f'''/* ---- Карта Москвы: контуры 12 округов, векторизованные из демоварианта
   (deploy/615/emb/p4_0.jpeg — вырез карты из school1517.ru/adt/20260910.pdf).
   Порядок, номера и взаимное положение округов — как в файле; это настоящие
   очертания, а не упрощённый силуэт. Система координат: viewBox 0 0 {W} {H}. ---- */'''))
out.append('  const MOSCOW_LABEL={')
for k, v in labels.items():
    x, y = T(v)
    out.append(f"    {k}:[{x},{y}],")
out.append('  };')
out.append('  const MOSCOW_NAME=[')
for k, v in names.items():
    x, y = T(v)
    out.append(f"    ['{k}',{x},{y}],")
out.append('  ];')
out.append(f'  const MOSCOW_H={H};')

# ---------------------------------------------------------------- Пояса
z = json.load(open('zones_paths.json'))
ZP = z['paths']
# bbox цветных областей в растре (регион был (20,370)-(420,625))
xs, ys = [], []
for arr in ZP.values():
    for d in arr:
        for pair in d[1:-1].split(' '):
            x, y = pair.split(',')
            xs.append(float(x)); ys.append(float(y))
zx0, zx1, zy0, zy1 = min(xs), max(xs), min(ys), max(ys)
ZW, ZH = zx1-zx0, zy1-zy0
W2 = 360
s2 = 344.0/ZW
ox2 = (W2 - ZW*s2)/2.0
oy2 = 76.0                                  # место под заголовок
tx_z = (s2, ox2 - zx0*s2, oy2 - zy0*s2)
out.append(emit('ZONES', ZP, tx_z,
    f'''/* ---- Карта часовых поясов Дальневосточного федерального округа:
   контуры векторизованы из демоварианта (deploy/615/emb/p2_1.jpeg).
   Пять поясов теми же цветами, что в файле. ---- */'''))

def TZ(pt):
    return (round((pt[0]-zx0)*s2+ox2, 1), round((pt[1]-zy0)*s2+oy2, 1))

zlabels = {'МСК+5':(40,165),'МСК+6':(100,100),'МСК+7':(155,82),'МСК+8':(208,99),'МСК+9':(292,99)}
zcities = {'Якутск':(105,128),'Магадан':(216,140),'Анадырь':(296,120),
           'Улан-Удэ':(26,200),'Чита':(60,200),'Благовещенск':(115,210),
           'Хабаровск':(180,208),'Владивосток':(118,245),'Южно-Сахалинск':(238,228),
           'Петропавловск-Камчатский':(236,193)}
out.append('  const ZONES_LABEL=[')
for k, v in zlabels.items():
    x, y = TZ(v)
    out.append(f"    ['{k}',{x},{y}],")
out.append('  ];')
out.append('  const ZONES_CITY=[')
for k, v in zcities.items():
    x, y = TZ(v)
    out.append(f"    ['{k}',{x},{y}],")
out.append('  ];')
out.append(f'  const ZONES_H={round(ZH*s2+oy2+16)};')

open('map_js.txt', 'w').write('\n'.join(out) + '\n')
print('строк', len(out))
print('москва: масштаб', round(s, 4), 'сдвиг', round(ox, 1), round(oy, 1), 'высота', H)
print('пояса: масштаб', round(s2, 4), 'bbox растра', round(zx0), round(zy0), round(zx1), round(zy1))
print('пояса высота', round(ZH*s2+oy2+16))
