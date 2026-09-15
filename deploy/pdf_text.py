import sys, pymupdf
for p in sys.argv[1:]:
    d = pymupdf.open(p)
    print(f"\n{'='*70}\nFILE: {p}  ({len(d)} pages)\n{'='*70}")
    for i, page in enumerate(d):
        print(f"\n--- page {i+1} ---")
        print(page.get_text())
