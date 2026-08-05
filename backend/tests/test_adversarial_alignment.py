"""Skew detection: a committed partisan must be matched to their own party.

Right now this exercises the *engine* against a synthetic stance matrix. Once a
real, sourced stance dataset exists, point `stance_matrix()` at it — the same
assertions then become a check on the *dataset*, and a failure means the
statement set is skewed against whichever party the engine failed to match.

That is the single most valuable test in this suite: statement selection is the
main bias vector in a voter advice tool, far more than the scoring maths.
"""

import pytest

from app.utils.calculations import UserResponse, alignment_score

# Synthetic, for engine validation only. Not political data, not sourced, and
# deliberately not shippable — see docs/methodology.md for the real thing.
PARTIES = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]
STATEMENTS = [f"s{i}" for i in range(20)]


def _stance(party_index: int, statement_index: int) -> int:
    """Deterministic pseudo-random stance in -2..+2.

    A linear formula modulo the 5-point scale would make parties five apart
    identical, which silently defeats the point of the fixture.
    """
    h = (party_index + 1) * 2654435761 + (statement_index + 1) * 40503
    h ^= h >> 13
    return (h % 5) - 2


def stance_matrix() -> dict[str, dict[str, int | None]]:
    """Give every party a distinct, deterministic stance profile."""
    return {
        party: {
            statement: _stance(party_index, statement_index)
            for statement_index, statement in enumerate(STATEMENTS)
        }
        for party_index, party in enumerate(PARTIES)
    }


def test_fixture_gives_every_party_a_distinct_profile():
    """Guards the fixture itself — identical profiles would mask real skew."""
    profiles = [tuple(sorted(s.items())) for s in stance_matrix().values()]
    assert len(set(profiles)) == len(PARTIES)


def partisan_responses(stances: dict[str, int | None]) -> list[UserResponse]:
    """A voter who agrees completely with one party, and cares about everything."""
    return [
        UserResponse(statement_id=statement_id, position=stance, importance=2)
        for statement_id, stance in stances.items()
        if stance is not None
    ]


def rank(responses: list[UserResponse], matrix) -> list[tuple[str, float]]:
    scored = [
        (party, alignment_score(party, responses, stances).score)
        for party, stances in matrix.items()
    ]
    return sorted(
        [(p, s) for p, s in scored if s is not None], key=lambda x: x[1], reverse=True
    )


@pytest.mark.parametrize("party", PARTIES)
def test_a_partisan_is_matched_to_their_own_party(party):
    matrix = stance_matrix()
    ranked = rank(partisan_responses(matrix[party]), matrix)

    top_score = ranked[0][1]
    winners = [p for p, s in ranked if s == top_score]

    assert party in winners, (
        f"a committed {party} voter was matched to {ranked[0][0]} instead — "
        "the statement set is skewed against this party"
    )


@pytest.mark.parametrize("party", PARTIES)
def test_a_partisan_scores_a_perfect_match_with_their_own_party(party):
    matrix = stance_matrix()
    assert alignment_score(party, partisan_responses(matrix[party]), matrix[party]).score == 100.0


def test_every_party_is_reachable_by_some_voter():
    """No party should be unmatchable regardless of how someone answers.

    Tie-aware on purpose: two parties with identical stances legitimately both
    top the ranking, and picking one arbitrarily would report a false failure.
    """
    matrix = stance_matrix()
    reached: set[str] = set()
    for party in PARTIES:
        ranked = rank(partisan_responses(matrix[party]), matrix)
        top_score = ranked[0][1]
        reached.update(p for p, s in ranked if s == top_score)

    unreachable = set(PARTIES) - reached
    assert not unreachable, f"no set of answers can ever match: {sorted(unreachable)}"


def test_an_opposite_partisan_does_not_top_the_ranking():
    matrix = stance_matrix()
    inverted = [
        UserResponse(statement_id=sid, position=-stance, importance=2)
        for sid, stance in matrix["a"].items()
        if stance is not None
    ]
    assert rank(inverted, matrix)[0][0] != "a"
