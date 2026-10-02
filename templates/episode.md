---
# Copy this file to src/content/blog/ep-NN-short-slug.md (the file name becomes the URL:
# /posts/ep-NN-short-slug/). Delete these comments once you've filled it in.

# Sentence case. Written as a confession or a result, not a pitch.
title: 'Episode title'

# The honest hook: what you tried and what surprised you. One or two sentences, no promised returns.
# Shown on cards and as the standfirst under the title.
description: 'What I tried, and what the data said.'

# Publication date, YYYY-MM-DD.
pubDate: 2026-01-01

# Set only when you revise the post later.
# updatedDate: 2026-01-15

# Two-digit episodes start at 00. Keep the number unique.
episode: 5
season: 1

# One of: Meta, Simulation, Portfolio, Data, Pipeline, Valuation (see TOPICS in src/consts.ts).
topic: Data

# Optional. Link to the code for this episode.
# code: https://github.com/idontknowmoney/idontknowmoney.com

# Optional. The single sentence the reader should leave with. Shown in a highlighted box at the end.
# takeaway: 'One sentence.'

# Optional. Overrides the reading time estimated from the word count.
# minutes: 8

# true: visible in `pnpm dev` only. Change to false (or delete the line) to publish.
draft: true
---

Open with the question or the mistake, in the first person and in plain sentences. Educational, not
advice: no buy or sell recommendations and no promised returns.

## The setup

What you built and why. Show the work.

```python
import numpy as np

# Keep snippets short and runnable. Comments are shown in muted ink.
rng = np.random.default_rng(42)
returns = rng.normal(0.005, 0.04, size=(10_000, 360))
```

## What the data said

The result, including the part that surprised or embarrassed you.

## What I'd do differently

What you still don't know. This is the "(Yet)".
