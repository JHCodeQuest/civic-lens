import pytest

from app.utils.calculations import (
    MIN_ANSWERS_FOR_RECOMMENDATION,
    AlignmentResult,
    NoRecommendation,
    combined_score,
    recommend,
    viability_scores,
)


def alignment(party_id: str, score: float | None) -> AlignmentResult:
    return AlignmentResult(
        party_id=party_id, score=score, counted=12, unpositioned=0, unweighted=0
    )


def call(alignments, viabilities=None, **overrides):
    kwargs = {
        "tactical_weight": 0.0,
        "answered": MIN_ANSWERS_FOR_RECOMMENDATION,
        "constituency_known": True,
        "standing_party_ids": {a.party_id for a in alignments},
    }
    kwargs.update(overrides)
    return recommend(alignments, viabilities or {}, **kwargs)


class TestViability:
    def test_seat_winner_scores_full_viability(self):
        scores = viability_scores({"lab": 45.0, "con": 30.0, "ld": 10.0})
        assert scores["lab"].score == 100.0

    def test_score_falls_as_the_gap_to_the_winner_grows(self):
        scores = viability_scores({"lab": 45.0, "con": 35.0, "grn": 5.0})
        assert scores["con"].score == pytest.approx(50.0)  # 10 behind, spread 20
        assert scores["grn"].score == 0.0  # 40 behind, clamped

    def test_hopeless_parties_never_go_negative(self):
        scores = viability_scores({"lab": 70.0, "grn": 1.0})
        assert scores["grn"].score == 0.0

    def test_close_seat_is_flagged_marginal(self):
        scores = viability_scores({"lab": 35.2, "con": 34.0, "ref": 20.0})
        assert scores["lab"].is_marginal is True

    def test_safe_seat_is_not_flagged_marginal(self):
        scores = viability_scores({"lab": 55.0, "con": 25.0})
        assert scores["lab"].is_marginal is False

    def test_runner_up_in_a_marginal_is_highly_viable(self):
        marginal = viability_scores({"lab": 35.0, "con": 34.0})
        safe = viability_scores({"lab": 55.0, "con": 25.0})
        assert marginal["con"].score > safe["con"].score

    def test_records_the_gap_for_display(self):
        scores = viability_scores({"lab": 45.0, "con": 30.0})
        assert scores["con"].gap == pytest.approx(15.0)

    def test_empty_seat_data_yields_nothing(self):
        assert viability_scores({}) == {}


class TestCombinedScore:
    def test_zero_weight_ignores_viability_entirely(self):
        assert combined_score(alignment=80.0, viability=0.0, tactical_weight=0.0) == 80.0

    def test_full_weight_ignores_alignment_entirely(self):
        assert combined_score(alignment=80.0, viability=10.0, tactical_weight=1.0) == 10.0

    def test_balanced_weight_averages_the_two(self):
        assert combined_score(alignment=80.0, viability=20.0, tactical_weight=0.5) == 50.0

    def test_rejects_weight_outside_zero_to_one(self):
        with pytest.raises(ValueError, match="tactical_weight"):
            call([alignment("lab", 80.0)], tactical_weight=1.5)


class TestGatingRules:
    """The refusals are the feature, not edge cases."""

    def test_refuses_without_a_known_constituency(self):
        result = call([alignment("lab", 90.0)], constituency_known=False)
        assert result.is_recommendation is False
        assert result.reason is NoRecommendation.UNKNOWN_CONSTITUENCY

    def test_refuses_when_candidate_data_is_unavailable(self):
        result = call([alignment("lab", 90.0)], standing_party_ids=None)
        assert result.reason is NoRecommendation.NO_CANDIDATE_DATA

    def test_no_candidates_standing_is_distinct_from_missing_data(self):
        result = call([alignment("lab", 90.0)], standing_party_ids=set())
        assert result.reason is NoRecommendation.NO_SCOREABLE_PARTIES

    def test_refuses_when_too_few_statements_answered(self):
        result = call(
            [alignment("lab", 90.0)], answered=MIN_ANSWERS_FOR_RECOMMENDATION - 1
        )
        assert result.reason is NoRecommendation.TOO_FEW_ANSWERS

    def test_refuses_when_no_party_could_be_scored(self):
        result = call([alignment("lab", None), alignment("con", None)])
        assert result.reason is NoRecommendation.NO_SCOREABLE_PARTIES

    def test_never_recommends_a_party_not_on_the_ballot(self):
        # Plaid top the alignment but are not standing in this seat.
        result = call(
            [alignment("plaid", 95.0), alignment("lab", 60.0)],
            standing_party_ids={"lab"},
        )
        assert result.party_id == "lab"
        assert [p.party_id for p in result.ranked] == ["lab"]


class TestTieHandling:
    def test_near_identical_scores_are_reported_as_a_tie(self):
        result = call([alignment("lab", 80.0), alignment("con", 79.0)])
        assert result.is_recommendation is False
        assert result.reason is NoRecommendation.TIE
        assert set(result.tied) == {"lab", "con"}

    def test_a_tie_still_returns_the_ranking(self):
        result = call([alignment("lab", 80.0), alignment("con", 79.0)])
        assert [p.party_id for p in result.ranked] == ["lab", "con"]

    def test_a_clear_gap_produces_a_recommendation(self):
        result = call([alignment("lab", 80.0), alignment("con", 60.0)])
        assert result.party_id == "lab"
        assert result.reason is None

    def test_a_single_scoreable_party_is_not_a_tie(self):
        result = call([alignment("lab", 80.0)])
        assert result.party_id == "lab"

    def test_three_way_tie_lists_all_three(self):
        result = call(
            [alignment("lab", 80.0), alignment("con", 79.5), alignment("ld", 79.0)]
        )
        assert len(result.tied) == 3


class TestTacticalWeightChangesTheAnswer:
    """The whole point of the lambda control: the user's trade-off, not ours."""

    alignments = [alignment("grn", 90.0), alignment("lab", 65.0)]
    seat = viability_scores({"lab": 40.0, "con": 38.0, "grn": 5.0})

    def test_voting_your_values_picks_the_closest_match(self):
        result = call(self.alignments, self.seat, tactical_weight=0.0)
        assert result.party_id == "grn"

    def test_voting_tactically_picks_the_contender(self):
        result = call(self.alignments, self.seat, tactical_weight=1.0)
        assert result.party_id == "lab"

    def test_ranking_exposes_both_axes_separately(self):
        result = call(self.alignments, self.seat, tactical_weight=0.5)
        by_party = {p.party_id: p for p in result.ranked}
        # Alignment and viability stay individually inspectable — never collapsed.
        assert by_party["grn"].alignment == 90.0
        assert by_party["grn"].viability == 0.0
        assert by_party["lab"].viability == 100.0

    def test_party_standing_with_no_local_history_scores_zero_viability(self):
        result = call([alignment("new", 90.0)], self.seat, tactical_weight=1.0)
        assert result.ranked[0].viability == 0.0
