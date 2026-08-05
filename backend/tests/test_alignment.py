import pytest

from app.utils.calculations import (
    MAX_DISTANCE,
    UserResponse,
    agreement,
    alignment_score,
)


def r(statement_id: str, position: int, importance: int = 1) -> UserResponse:
    return UserResponse(statement_id=statement_id, position=position, importance=importance)


class TestAgreement:
    def test_identical_positions_agree_fully(self):
        for p in range(-2, 3):
            assert agreement(p, p) == 1.0

    def test_maximally_opposed_positions_agree_not_at_all(self):
        assert agreement(-2, 2) == 0.0
        assert agreement(2, -2) == 0.0

    def test_is_symmetric(self):
        for u in range(-2, 3):
            for p in range(-2, 3):
                assert agreement(u, p) == agreement(p, u)

    def test_decreases_monotonically_with_distance(self):
        scores = [agreement(2, p) for p in range(2, -3, -1)]
        assert scores == sorted(scores, reverse=True)

    def test_one_step_apart_scores_by_max_distance(self):
        assert agreement(0, 1) == 1.0 - 1 / MAX_DISTANCE


class TestAlignmentScore:
    def test_perfect_agreement_scores_100(self):
        responses = [r("a", 2), r("b", -1), r("c", 0)]
        stances = {"a": 2, "b": -1, "c": 0}
        assert alignment_score("p", responses, stances).score == 100.0

    def test_perfect_disagreement_scores_zero(self):
        responses = [r("a", 2), r("b", -2)]
        stances = {"a": -2, "b": 2}
        assert alignment_score("p", responses, stances).score == 0.0

    def test_importance_weights_the_result(self):
        # Agrees fully on the statement they care about, opposed on one they don't.
        responses = [r("a", 2, importance=2), r("b", 2, importance=1)]
        stances = {"a": 2, "b": -2}
        # (1.0*2 + 0.0*1) / 3 = 0.666...
        assert alignment_score("p", responses, stances).score == pytest.approx(66.667, abs=0.01)

    def test_reversing_the_weights_reverses_the_lean(self):
        responses = [r("a", 2, importance=1), r("b", 2, importance=2)]
        stances = {"a": 2, "b": -2}
        assert alignment_score("p", responses, stances).score == pytest.approx(33.333, abs=0.01)

    def test_zero_importance_is_excluded_entirely(self):
        responses = [r("a", 2, importance=1), r("b", 2, importance=0)]
        stances = {"a": 2, "b": -2}  # b is maximally opposed but must not count
        result = alignment_score("p", responses, stances)
        assert result.score == 100.0
        assert result.unweighted == 1
        assert result.counted == 1

    def test_no_clear_position_is_excluded_not_treated_as_neutral(self):
        responses = [r("a", 2), r("b", 2)]
        stances = {"a": 2, "b": None}
        result = alignment_score("p", responses, stances)
        # Treating None as neutral (0) would give 75.0 — vagueness must not score.
        assert result.score == 100.0
        assert result.unpositioned == 1
        assert result.counted == 1

    def test_statements_the_party_has_no_entry_for_are_ignored(self):
        responses = [r("a", 2), r("unknown", -2)]
        stances = {"a": 2}
        result = alignment_score("p", responses, stances)
        assert result.score == 100.0
        assert result.counted == 1
        assert len(result.breakdown) == 1

    def test_score_is_none_when_nothing_can_be_compared(self):
        assert alignment_score("p", [], {}).score is None

    def test_score_is_none_when_all_answers_are_zero_importance(self):
        responses = [r("a", 2, importance=0)]
        result = alignment_score("p", responses, {"a": 2})
        # None means "no opinion expressed", which is not the same as 0.0.
        assert result.score is None

    def test_score_is_none_when_party_has_no_positions_at_all(self):
        responses = [r("a", 2), r("b", -1)]
        result = alignment_score("p", responses, {"a": None, "b": None})
        assert result.score is None
        assert result.unpositioned == 2

    def test_breakdown_records_every_comparable_statement(self):
        responses = [r("a", 2), r("b", -2), r("c", 0)]
        stances = {"a": 2, "b": 2, "c": None}
        breakdown = alignment_score("p", responses, stances).breakdown
        assert [b.statement_id for b in breakdown] == ["a", "b", "c"]
        assert breakdown[0].agreement == 1.0
        assert breakdown[1].agreement == 0.0
        assert breakdown[2].agreement is None

    def test_breakdown_surfaces_strongest_disagreement(self):
        responses = [r("a", 2), r("b", 2), r("c", 2)]
        stances = {"a": 2, "b": 0, "c": -2}
        breakdown = alignment_score("p", responses, stances).breakdown
        assert min(breakdown, key=lambda b: b.agreement).statement_id == "c"

    def test_score_never_leaves_zero_to_one_hundred(self):
        for u in range(-2, 3):
            for s in range(-2, 3):
                score = alignment_score("p", [r("a", u)], {"a": s}).score
                assert 0.0 <= score <= 100.0


class TestValidation:
    @pytest.mark.parametrize("position", [-3, 3, 100])
    def test_rejects_out_of_range_position(self, position):
        with pytest.raises(ValueError, match="position must be"):
            UserResponse(statement_id="a", position=position, importance=1)

    @pytest.mark.parametrize("importance", [-1, 3])
    def test_rejects_out_of_range_importance(self, importance):
        with pytest.raises(ValueError, match="importance must be"):
            UserResponse(statement_id="a", position=0, importance=importance)

    def test_rejects_out_of_range_party_stance(self):
        with pytest.raises(ValueError, match="stance for a must be"):
            alignment_score("p", [r("a", 0)], {"a": 5})
