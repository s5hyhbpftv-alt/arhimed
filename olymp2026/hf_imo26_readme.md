---
pretty_name: IMO 2026 Problems
language:
- en
tags:
- mathematics
- olympiad
- theorem-proving
configs:
- config_name: default
  data_files:
  - split: train
    path: data/train.jsonl
dataset_info:
  features:
  - name: id
    dtype: int64
  - name: day
    dtype: int64
  - name: problem
    dtype: string
  splits:
  - name: train
    num_examples: 6
---

# IMO 2026 Problems

The six IMO 2026 problem statements, indexed from `0` through `5` in contest order.
IDs `0`–`2` are from Day 1, and IDs `3`–`5` are from Day 2.

## Schema

- `id`: zero-based problem identifier (`0` corresponds to Problem 1).
- `day`: contest day (`1` or `2`).
- `problem`: complete English problem statement.

## Source

Extracted from the problem statements in SignalPilot Labs' AutoFyn IMO 2026 results:
https://github.com/SignalPilot-Labs/AutoFyn/tree/production/results/imo-2026

Official IMO 2026 edition page:
https://www.imo-official.org/editions/2026/
