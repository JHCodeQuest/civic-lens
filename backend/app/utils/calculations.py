"""Scoring for the voter advice tool.

Two independent axes, deliberately never collapsed into a single opaque number:

  * alignment — how closely a party's positions match the user's stated views
  * viability — whether that party can plausibly win the user's seat

They are combined only in `recommend()`, and only using a weight the *user*
chooses. How much tactical voting ought to matter is a contested moral question;
this module must not answer it on the user's behalf.

Every function here is pure. A silent error in this file changes what someone
does in a polling booth, so it carries mandatory test coverage.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum

# A stance runs from -2 (strongly disagree) to +2 (strongly agree).
POSITION_MIN = -2
POSITION_MAX = 2

# Widest possible gap between a user position and a party stance, used to
# normalise agreement into 0..1.
MAX_DISTANCE = POSITION_MAX - POSITION_MIN

# 0 = "don't care", 2 = "this decides my vote".
IMPORTANCE_MIN = 0
IMPORTANCE_MAX = 2

# Minimum statements a user must answer before a recommendation is offered.
MIN_ANSWERS_FOR_RECOMMENDATION = 10

# Combined scores closer than this are reported as a tie rather than a winner.
TIE_THRESHOLD = 2.0


class NoRecommendation(str, Enum):
    """Why the engine declined to name a party."""

    UNKNOWN_CONSTITUENCY = "unknown_constituency"
    NO_CANDIDATE_DATA = "no_candidate_data"
    TOO_FEW_ANSWERS = "too_few_answers"
    NO_SCOREABLE_PARTIES = "no_scoreable_parties"
    TIE = "tie"


@dataclass(frozen=True)
class UserResponse:
    statement_id: str
    position: int
    importance: int

    def __post_init__(self) -> None:
        if not POSITION_MIN <= self.position <= POSITION_MAX:
            raise ValueError(
                f"position must be {POSITION_MIN}..{POSITION_MAX}, got {self.position}"
            )
        if not IMPORTANCE_MIN <= self.importance <= IMPORTANCE_MAX:
            raise ValueError(
                f"importance must be {IMPORTANCE_MIN}..{IMPORTANCE_MAX}, got {self.importance}"
            )


@dataclass(frozen=True)
class StatementAgreement:
    """One statement's contribution, kept so the UI can show *where* you differ."""

    statement_id: str
    user_position: int
    party_stance: int | None
    importance: int
    agreement: float | None  # None when the party has no clear position


@dataclass(frozen=True)
class AlignmentResult:
    party_id: str
    score: float | None  # 0..100, or None when nothing could be compared
    counted: int  # statements that contributed to the score
    unpositioned: int  # skipped: party has no clear position
    unweighted: int  # skipped: user marked importance 0
    breakdown: list[StatementAgreement] = field(default_factory=list)


def agreement(user_position: int, party_stance: int) -> float:
    """1.0 for identical positions, 0.0 for maximally opposed."""
    return 1.0 - abs(user_position - party_stance) / MAX_DISTANCE


def alignment_score(
    party_id: str,
    responses: list[UserResponse],
    stances: dict[str, int | None],
) -> AlignmentResult:
    """Weighted agreement between a user and one party.

    `stances` maps statement_id to a stance, where None means the party has no
    clear position. Those are excluded from the denominator rather than treated
    as neutral — scoring an absent position as agreement would reward vagueness.

    Statements the user rated importance 0 are likewise excluded. If nothing is
    left to compare, `score` is None: that is meaningfully different from 0.0,
    which would claim total disagreement.
    """
    breakdown: list[StatementAgreement] = []
    weighted_sum = 0.0
    total_weight = 0
    counted = 0
    unpositioned = 0
    unweighted = 0

    for response in responses:
        if response.statement_id not in stances:
            continue

        stance = stances[response.statement_id]

        if stance is None:
            unpositioned += 1
            breakdown.append(
                StatementAgreement(
                    statement_id=response.statement_id,
                    user_position=response.position,
                    party_stance=None,
                    importance=response.importance,
                    agreement=None,
                )
            )
            continue

        if not POSITION_MIN <= stance <= POSITION_MAX:
            raise ValueError(
                f"stance for {response.statement_id} must be "
                f"{POSITION_MIN}..{POSITION_MAX}, got {stance}"
            )

        item_agreement = agreement(response.position, stance)
        breakdown.append(
            StatementAgreement(
                statement_id=response.statement_id,
                user_position=response.position,
                party_stance=stance,
                importance=response.importance,
                agreement=item_agreement,
            )
        )

        if response.importance == 0:
            unweighted += 1
            continue

        weighted_sum += item_agreement * response.importance
        total_weight += response.importance
        counted += 1

    score = None if total_weight == 0 else (weighted_sum / total_weight) * 100.0

    return AlignmentResult(
        party_id=party_id,
        score=score,
        counted=counted,
        unpositioned=unpositioned,
        unweighted=unweighted,
        breakdown=breakdown,
    )


# --- Viability -------------------------------------------------------------
#
# How far behind the seat's winner a party finished last time. A party this many
# points or more behind is treated as out of contention. This single constant is
# the whole model, which is the point: it has to be explainable in one sentence
# on the methodology page.
CONTENTION_SPREAD = 20.0

# Winner's margin over second place, at or below which a seat is called marginal.
MARGINAL_THRESHOLD = 5.0


@dataclass(frozen=True)
class ViabilityResult:
    party_id: str
    score: float  # 0..100
    party_share: float
    leader_share: float
    gap: float  # points behind the winner
    is_marginal: bool  # seat was close last time, so the past is a weak guide


def viability_scores(shares: dict[str, float]) -> dict[str, ViabilityResult]:
    """Score each party's chance of winning a seat, from the last result there.

    `shares` maps party_id to vote share (percent) at the most recent election in
    that constituency. Parties absent from the mapping have no track record in the
    seat and are simply not scored — the caller decides what that means.

    This is deliberately backward-looking and crude. `is_marginal` is the honesty
    valve: in a close seat the previous result is a poor predictor, and the UI is
    expected to say so rather than present these numbers as forecasts.
    """
    if not shares:
        return {}

    leader_share = max(shares.values())
    ordered = sorted(shares.values(), reverse=True)
    margin = ordered[0] - ordered[1] if len(ordered) > 1 else ordered[0]
    is_marginal = margin <= MARGINAL_THRESHOLD

    results: dict[str, ViabilityResult] = {}
    for party_id, share in shares.items():
        gap = leader_share - share
        score = max(0.0, 1.0 - gap / CONTENTION_SPREAD) * 100.0
        results[party_id] = ViabilityResult(
            party_id=party_id,
            score=score,
            party_share=share,
            leader_share=leader_share,
            gap=gap,
            is_marginal=is_marginal,
        )
    return results


# --- Recommendation --------------------------------------------------------


@dataclass(frozen=True)
class ScoredParty:
    party_id: str
    alignment: float
    viability: float
    combined: float


@dataclass(frozen=True)
class Recommendation:
    """A recommendation, or a documented refusal to make one."""

    party_id: str | None
    reason: NoRecommendation | None
    tactical_weight: float
    ranked: list[ScoredParty] = field(default_factory=list)
    tied: list[str] = field(default_factory=list)

    @property
    def is_recommendation(self) -> bool:
        return self.party_id is not None


def combined_score(alignment: float, viability: float, tactical_weight: float) -> float:
    """Blend the two axes using the weight the user chose.

    Linear rather than anything cleverer, because it has to be explainable:
    at 0 the recommendation ignores who can win; at 1 it ignores what you believe.
    """
    return (1.0 - tactical_weight) * alignment + tactical_weight * viability


def recommend(
    alignments: list[AlignmentResult],
    viabilities: dict[str, ViabilityResult],
    *,
    tactical_weight: float,
    answered: int,
    constituency_known: bool,
    standing_party_ids: set[str] | None,
) -> Recommendation:
    """Name a party to vote for, or explain why we won't.

    The refusals are not edge cases to be tidied away later — they are the
    feature. A tool that always produces an answer produces confident nonsense
    when a postcode is unrecognised or a party isn't on the ballot.

    `standing_party_ids` of None means candidate data was unavailable, which is
    different from an empty set (nobody is standing).
    """
    if not 0.0 <= tactical_weight <= 1.0:
        raise ValueError(f"tactical_weight must be 0.0..1.0, got {tactical_weight}")

    def refuse(reason: NoRecommendation, ranked=None, tied=None) -> Recommendation:
        return Recommendation(
            party_id=None,
            reason=reason,
            tactical_weight=tactical_weight,
            ranked=ranked or [],
            tied=tied or [],
        )

    if not constituency_known:
        return refuse(NoRecommendation.UNKNOWN_CONSTITUENCY)

    if standing_party_ids is None:
        return refuse(NoRecommendation.NO_CANDIDATE_DATA)

    if answered < MIN_ANSWERS_FOR_RECOMMENDATION:
        return refuse(NoRecommendation.TOO_FEW_ANSWERS)

    ranked: list[ScoredParty] = []
    for result in alignments:
        # Only parties actually on this ballot are eligible, and only those we
        # could score at all.
        if result.score is None or result.party_id not in standing_party_ids:
            continue
        # A party standing with no prior result in the seat has no track record
        # here, which is a viability of zero rather than missing data.
        viability = viabilities.get(result.party_id)
        viability_score = viability.score if viability else 0.0
        ranked.append(
            ScoredParty(
                party_id=result.party_id,
                alignment=result.score,
                viability=viability_score,
                combined=combined_score(result.score, viability_score, tactical_weight),
            )
        )

    if not ranked:
        return refuse(NoRecommendation.NO_SCOREABLE_PARTIES)

    ranked.sort(key=lambda p: p.combined, reverse=True)

    if len(ranked) > 1 and ranked[0].combined - ranked[1].combined < TIE_THRESHOLD:
        tied = [p.party_id for p in ranked if ranked[0].combined - p.combined < TIE_THRESHOLD]
        return refuse(NoRecommendation.TIE, ranked=ranked, tied=tied)

    return Recommendation(
        party_id=ranked[0].party_id,
        reason=None,
        tactical_weight=tactical_weight,
        ranked=ranked,
    )
