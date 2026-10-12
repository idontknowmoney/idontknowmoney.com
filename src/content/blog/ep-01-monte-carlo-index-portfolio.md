---
title: 'Episode title'
description: 'What I tried, and what the data said.'
pubDate: 2026-01-01
episode: 1
season: 1
topic: Portfolio
code: https://github.com/idontknowmoney/portfolio-lab
minutes: 10
draft: true
---

"Invest your money!", "Invest in the S&P 500!", "Don't leave your money sitting in cash!", ... You've probably heard this kind of advice before on social media or from friends. Ok, but why? What are the numbers behind these statements? If I start putting money into a portfolio, I want to know how much risk I'm taking and how much I can realistically expect to get back. So before learning anything else about investing, I decided to simulate a simple portfolio and see what the data says.

The catch is that the honest answer isn't a single number. Markets don't return 7% every year, so instead of one future I generated 10,000 of them from what markets have actually done in the past. This episode is about how I built the simulation, everything I had to fix to make it honest, and what the numbers looked like at the end.

## The setup

Before getting to any results, here's what I simulated and how the simulation works.

### The portfolio

<!-- 70/20/10 MSCI World / EM IMI / Europe, €200 a month, 10 years, starting from zero, never rebalanced. Make clear it’s an example, not a recommendation.

Config table -->

Since I wanted to be able to alternate between different portfolios to experiment, I built the tool as a Jupyter notebook which picks up the portfolio configuration from a YAML file. The configuration includes the asset allocation, monthly contribution, and simulation length, etc. To keep it simple, I use a portfolio of only three ETFs:

| Fund | What it holds | ISIN | Ticker | Share of each contribution |
| --- | --- | --- | --- | --- |
| iShares Core MSCI World UCITS ETF (Acc) | Large and mid caps across 23 developed countries | IE00B4L5Y983 | EUNL.DE | 70% |
| iShares MSCI Europe UCITS ETF (Acc) | Large and mid caps across developed European countries | IE00BKM4GZ66 | IS3N.DE | 20% |
| iShares Emerging Markets UCITS ETF (Acc) | Large, mid and small caps across emerging markets | IE00BKM4GZ66 | IS3N.DE | 10% |

> **What's an ETF?**
>
> An ETF (exchange-traded fund) is a basket of many companies' shares that you buy as a single product on a stock exchange, just like you'd buy one share. An *index* ETF doesn't try to pick winners: it simply copies an index, a list of companies chosen by fixed rules. The MSCI World, for example, holds over a thousand large and mid-sized companies from developed countries. So one purchase spreads your money across all of them.
>
> A few terms you'll see in the table:
>
> - **ISIN**: the fund's unique ID, the same on every exchange. **Ticker**: its short code on one particular exchange.
> - **Accumulating (Acc)**: dividends are reinvested inside the fund instead of being paid out to you.

The plan is the most boring one possible: let's say I start from 0 € and put 200 € into this portfolio every month for 10 years. I don't touch it, I don't rebalance it, I just let it sit there. I run the simulation 10,000 times to see what could happen.

| Setting | Value |
| --- | --- |
| Monthly contribution | 200 € |
| Horizon | 10 years |
| Starting balance | 0 € |
| Simulated futures | 10,000 |

### How to simulate future that hasn't happened

<!-- The block bootstrap in plain words: cut history into 3-month chunks, shuffle them into 10,000 possible decades. Explain why chunks and not single months (crashes come in streaks). Include a short snippet of the simulate() loop.

simulate.py, Simulation cell -->

I can't know what markets will do over the next ten years. But I do have about twenty years of what they did do, month by month. So the idea is to use the past as a menu: build each possible future by picking pieces of real history at random.

The simplest version picks 120 random months (12 months * 10 years) and chains them together. The problem is that markets have memory, at least in the short term. Crashes don't come as one bad month surrounded by good ones; they come in streaks. For instance, in the 2008 crisis the market fell month after month. Should you shuffle single months, then those streaks disappear, and the future looks calmer than the past ever was.

So instead I pick **blocks** of consecutive months. This is called a *block bootstrap*:

1. Pick a random starting month in the history and take it plus the next two: a 3-month block.
2. Repeat until there are 120 months (40 blocks).
3. That's one possible decade. Do it 10,000 times.

One of those futures might start with the spring of 2009, jump to the end of 2017, then land on the COVID crash of early 2020. Each block is a real stretch of market history; only the order is new.

One more detail matters: each month is taken *for all three funds at once*. If I picked them separately, emerging markets could boom while the rest of the world crashes in the same simulated month. Keeping whole months together keeps the funds moving together the way they really do.

Each simulated month then does two things: put in €200 (split as I described before), and grow everything by that month's returns. In code:

```python
rng = np.random.default_rng(seed)
n_blocks = -(-n_months // block_size)  # 120 months / 3 = 40 blocks (rounded up)

# A random starting month for every block of every path...
starts = rng.integers(0, n_hist_months - block_size + 1, size=(n_paths, n_blocks))
# ...expanded into block_size consecutive months
month_idx = (starts[:, :, None] + np.arange(block_size)).reshape(n_paths, -1)[:, :n_months]

V = np.tile(initial_values, (n_paths, 1)).astype(float)  # one row per future, one column per fund
contribution = monthly_contribution * contribution_weights  # €200 → €140 / €40 / €20

for t in range(n_months):
    V += contribution                          # pay in at the start of the month
    V *= 1 + monthly_returns[month_idx[:, t]]  # then grow by that month's real returns
```

There's no loop over the 10,000 futures: NumPy moves all of them forward one month at a time, so the whole simulation runs in about a second.

Why 3 months? It's a trade-off. Longer blocks keep more of the real streaks, but there are fewer distinct ways to combine them, so the futures start to look like copies of the past. Three months is a compromise, and I'll come back to what it might be hiding.

## My first answer was too good

<!-- The ETF-only run: data starts in 2014, so there’s no 2008 in it. Median about €43.7k, 0.9% chance of ending below what you put in. The twist: the data is mostly one long bull market.

history_window, “ETFs only” row -->

## Puttin 2008 back in

<!-- Before each ETF existed, use a similar older fund (SPY/EFA, EEM, VGK) converted to EUR. The data now starts in 2005: 259 months instead of 148.

history_window (extended), proxy text -->

### Are the standins any good?

<!-- Correlation 0.96–0.97. Be upfront: the World stand-in beats the real ETF by about 1.2%/yr, and 111 of the 259 months use proxy data for at least one asset.

proxy_quality table -->

### Short vs longg history

<!-- The comparison table: P(loss) goes from 0.9% → 4.1%, P5 from 28.9k → 24.6k. This is the main point of the post.

“Short vs extended history” table -->

## Ten thousand futures

<!-- The main result: median about €39k from €24k put in, the middle 90% between €24.6k and €60.4k. How to read a fan chart. The histogram’s long right tail: a few very good futures, most around the middle.

Results table, fan chart, histogram -->

## A euro in 2036 isn't a euro today

<!-- Inflation at 2%: median about €32k in today’s euros against €21.8k contributed (also in today’s euros). P(loss) 4.1% → 8.6%, and 15.7% at 4% inflation. Explain why each payment is adjusted for the year it’s made.

Real fan chart, inflation sensitivity table -->

## Same returns, different order

<!-- Sequence risk: one 10-year slice of history replayed in different orders ends anywhere from €26.8k to €49.3k. Say which period the crash comes from (2008). Without monthly contributions the order wouldn’t matter at all.

Sequence-risk table and chart -->

## The portfolio drifts on its own

<!-- Without rebalancing, emerging markets starts at 20% and ends anywhere from 14% to 26.5%. Your portfolio slowly turns into whatever happened to do well. Keep this section short.

Weights table and chart -->

## How much I trust these numbers

<!-- The returns-cut table (−4%/yr → 16.1% P(loss)) plus an honest list of limits: stand-in funds, a fixed inflation rate, 3-month chunks, the past isn’t the future, no taxes or fees.

Haircut table -->

## What I still don't know

<!-- The “(Yet)” from the template: rebalancing, real historical inflation, and teasing Episode 2 (why does Markowitz say to put almost everything in one ETF?). Link the notebook. -->
