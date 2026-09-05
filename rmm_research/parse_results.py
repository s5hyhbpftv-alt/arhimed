import sys, re, urllib.request

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'})
    return urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore')

for year in [2020, 2021, 2023, 2024, 2025]:
    url = f"https://rmms.lbi.ro/rmm{year}/index.php?id=results_math"
    try:
        t = fetch(url)
    except Exception as e:
        print(year, "fetch error", e); continue
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', t, flags=re.S)
    data = []
    for r in rows:
        cells = [re.sub(r'<[^>]+>', '', c).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, flags=re.S)]
        cells = [re.sub(r'\s+', ' ', c) for c in cells]
        if len(cells) >= 9 and re.fullmatch(r'\d+', cells[0]) and all(re.fullmatch(r'\d+', x) for x in cells[3:9]):
            data.append(cells)
    if not data:
        print(year, "no numeric rows"); continue
    n = len(data)
    print(f"=== RMM {year}: {n} contestants ===")
    for p in range(6):
        scores = [int(row[3+p]) for row in data]
        avg = sum(scores)/n
        full = sum(1 for s in scores if s == 7)
        zero = sum(1 for s in scores if s == 0)
        nonfull_nonzero = sum(1 for s in scores if 0 < s < 7)
        print(f"  P{p+1}: avg={avg:.2f}  full(7)={full}  partial={nonfull_nonzero}  zero={zero}")
    totals = [int(row[9]) for row in data]
    print(f"  top3 total: {sorted(totals, reverse=True)[:3]}, max possible 42")
