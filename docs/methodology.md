# Methodology

How Civic Lens produces a voting recommendation, and what it deliberately refuses to do.

This page is part of the product, not internal documentation. A tool that recommends how to
vote owes its users a full account of how it reached that recommendation.

> **Status: not shippable.** The scoring engine is built and tested, but no real party
> stance dataset exists yet, and the constituency data is still synthetic. Nothing in this
> document describes a live recommendation, because there isn't one. See *Current status*.

## Two scores, never merged silently

A recommendation combines two things that are genuinely different in kind:

**Alignment** — how closely a party's positions match your stated views.
For each statement you answer, agreement is `1 − |your position − party stance| / 4`, giving
1.0 for an exact match and 0.0 for opposite ends of the scale. Each statement is weighted by
how much you said it matters (0, 1 or 2), and the result is normalised to 0–100.

**Viability** — whether that party can plausibly win in your constituency.
Based on how far behind the winner they finished at the last election there. A party 20 or
more points behind is treated as out of contention. Seats where the winner's margin was 5
points or less are flagged as marginal, because in a close seat the previous result is a weak
guide to the next one.

**The combination is yours to set.** `score = (1 − λ) · alignment + λ · viability`, where λ is
the "vote my values ↔ vote tactically" control. At 0 the recommendation ignores who can win.
At 1 it ignores what you believe.

This is the most important design decision here. How much tactical voting *ought* to matter is
a contested moral question, and the tool must not answer it on your behalf. Making λ a visible,
adjustable input is what makes recommending a vote defensible rather than presumptuous.

## What is excluded from scoring, and why

**Statements you rate "doesn't matter to me"** carry zero weight and are dropped entirely.

**Positions a party hasn't taken** are excluded from the calculation, not scored as neutral.
Scoring an absent position as partial agreement would reward vagueness — a party that says
nothing would score better than one that takes a position you disagree with. Where this
happens you'll see it labelled, rather than silently folded into the number.

If nothing is left to compare, no score is produced. That is reported as "no score", which is
not the same as scoring zero.

## When we refuse to recommend

The tool declines to name a party when:

| Condition | Why |
|---|---|
| Constituency unknown | Under first-past-the-post, advice without a seat is meaningless |
| Candidate data unavailable | We can't recommend a party that may not be on your ballot |
| Fewer than 10 statements answered | Too little signal to justify a recommendation |
| No party could be scored | Nothing to rank |
| Top two within 2 points | Presented as a genuine tie, not a manufactured winner |

These refusals are a feature. A tool that always produces an answer produces confident
nonsense when the data doesn't support one.

A party is only ever recommended if it is **actually standing in your constituency**.

## Sourcing

Every party stance carries a source URL, a source type (`manifesto`, `voting_record`, or
`public_statement`), a date, and a verbatim quote. These are required fields at both the
schema and database level — an unsourced stance cannot be stored. "No clear position" is
itself a recorded, sourced judgement, not an absence of data.

Stances are versioned by election cycle, because a position is only meaningful relative to the
manifesto it was drawn from.

## Bias, and where it actually lives

**Statement selection is the main bias vector** — considerably more than the scoring maths.
Which issues make the list determines the outcome more than any formula. The scoring is
deliberately simple and fully published here precisely so that scrutiny can focus on the
statement set, which is where judgement is genuinely being exercised.

The test suite includes an adversarial check: a voter who answers as a committed partisan of
each party in turn must be matched to that party. A failure means the statement set is skewed
against whichever party the engine failed to match.

**If you think a position is coded wrongly, please challenge it.** Open an issue at
https://github.com/JHCodeQuest/civic-lens/issues with the statement, the party, and a source.

## Privacy

Your answers stay in your browser. The quiz and alignment scoring run entirely client-side,
answers are held in `localStorage`, and no request carries them anywhere.

## Known limitations

- **Northern Ireland** has a distinct party system, and abstentionism means a winning candidate
  may not take their seat — materially relevant to a recommendation. NI is not yet modelled
  correctly and must not be silently mis-modelled.
- **Viability is backward-looking**, derived from the last result in the seat. It is not a
  forecast and does not incorporate current polling or boundary changes.
- **Westminster general elections only.** Devolved and local elections use different voting
  systems (STV, AMS) that this FPTP-based viability model does not describe.
- **Positions decay.** The stance dataset needs an owner and a refresh cadence, or it silently
  becomes wrong.

## Current status

Built and tested: the alignment engine, the viability model, the recommendation and refusal
logic, and the stance data model with its sourcing constraints. 100 unit tests, including the
adversarial skew check.

Not yet built: the real stance dataset, real constituency results for all 650 seats (the
current data is synthetic and clearly labelled as such in the UI), candidate data, and the
quiz interface.
