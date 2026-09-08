# EonMath at IMO 2026

IMO 2026 was held in Shanghai on July 15–16, 2026. This repository contains
Lean 4 formalizations and complete solutions for all six problems, together
with reader-facing mathematical proofs.

The formal statements are sourced from [Axiom Math's IMO 2026 repository](https://github.com/AxiomMath/IMO2026).

Each problem lives under `IMO2026/<code>/`:

- `problem.lean` — the formal statement, with proof bodies left as `sorry`.
- `solution.lean` — the complete, machine-checked Lean proof.
- `solution.pdf` — a reader-facing presentation of the mathematical solution.

## Problems

1. **2026 Q1**: [[statement]](IMO2026/Q1/problem.lean) [[formal solution]](IMO2026/Q1/solution.lean) [[PDF solution]](IMO2026/Q1/solution.pdf) (455 lines).
2. **2026 Q2**: [[statement]](IMO2026/Q2/problem.lean) [[formal solution]](IMO2026/Q2/solution.lean) [[PDF solution]](IMO2026/Q2/solution.pdf) (1193 lines).
3. **2026 Q3**: [[statement]](IMO2026/Q3/problem.lean) [[formal solution]](IMO2026/Q3/solution.lean) [[PDF solution]](IMO2026/Q3/solution.pdf) (2983 lines).
4. **2026 Q4**: [[statement]](IMO2026/Q4/problem.lean) [[formal solution]](IMO2026/Q4/solution.lean) [[PDF solution]](IMO2026/Q4/solution.pdf) (402 lines).
5. **2026 Q5**: [[statement]](IMO2026/Q5/problem.lean) [[formal solution]](IMO2026/Q5/solution.lean) [[PDF solution]](IMO2026/Q5/solution.pdf) (449 lines).
6. **2026 Q6**: [[statement]](IMO2026/Q6/problem.lean) [[formal solution]](IMO2026/Q6/solution.lean) [[PDF solution]](IMO2026/Q6/solution.pdf) (634 lines).

## Details

| Problem | Natural-language proof (minutes) | Formal proof (minutes) | Total (minutes) |
|---|---:|---:|---:|
| Q1 | 45.83 | 28.30 | 74.13 |
| Q2 | 97.33 | 147.25 | 244.58 |
| Q3 | 145.47 | 160.33 | 305.80 |
| Q4 | 41.73 | 18.85 | 60.58 |
| Q5 | 117.18 | 24.47 | 141.65 |
| Q6 | 327.62 | 24.07 | 351.68 |
| **Total** | **775.17** | **403.27** | **1178.43** |

All proof runs were conducted in a sandbox with network access and web search disabled.

## Building

The project uses Lean `v4.29.0` and Mathlib `v4.29.0`.

```bash
lake exe cache get
lake build
```

## Verification

Every `solution.lean` is `sorry`-free and `admit`-free. The files end with
`#print axioms` commands, which produced the following results:

| Problem | Results checked | `#print axioms` output |
|---|---|---|
| Q1 | `statement_a_termination`, `statement_a_unique_large`, `statement_b_invariance`, `terminal_value_eq_Mval`, `Mval_gt_one` | `[propext, Classical.choice, Quot.sound]` |
| Q2 | `main_theorem` | `[propext, Classical.choice, Quot.sound]` |
| Q3 | `LiuBangXiangYu.V_eq`, `LiuBangXiangYu.lower_bound`, `LiuBangXiangYu.upper_bound` | `[propext, Classical.choice, Quot.sound]` |
| Q4 | `TriangleGame.main_theorem` | `[propext, Classical.choice, Quot.sound]` |
| Q5 | `main_theorem` | `[propext, Classical.choice, Quot.sound]` |
| Q6 | `main_theorem` | `[propext, Classical.choice, Quot.sound]` |

Thus, none of the solutions uses `sorryAx` or any custom axiom. The three axioms
shown above are standard foundational axioms used by Lean and Mathlib.
