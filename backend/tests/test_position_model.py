from datetime import date

import pytest
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError

from app.models.position import PartyStance, PolicyArea, Statement
from app.schemas.position import PartyStanceCreate

VALID_SOURCE = {
    "source_url": "https://example.org/manifesto#nhs",
    "source_type": "manifesto",
    "source_date": date(2024, 6, 1),
    "quote": "We will increase NHS funding in real terms every year.",
}


def stance_payload(**overrides):
    payload = {
        "statement_id": "s1",
        "party_id": "p1",
        "cycle": "2024-general",
        "stance": 2,
        **VALID_SOURCE,
    }
    payload.update(overrides)
    return payload


class TestSourcingIsEnforced:
    """An unsourced stance is an opinion, and this tool recommends how to vote."""

    @pytest.mark.parametrize("missing", ["source_url", "source_type", "source_date", "quote"])
    def test_stance_without_a_source_is_rejected(self, missing):
        payload = stance_payload()
        del payload[missing]
        with pytest.raises(ValidationError):
            PartyStanceCreate(**payload)

    def test_relative_source_url_is_rejected(self):
        with pytest.raises(ValidationError, match="absolute http"):
            PartyStanceCreate(**stance_payload(source_url="/manifesto.pdf"))

    def test_placeholder_quote_is_rejected(self):
        with pytest.raises(ValidationError, match="substantive excerpt"):
            PartyStanceCreate(**stance_payload(quote="TODO"))

    def test_invented_source_type_is_rejected(self):
        with pytest.raises(ValidationError):
            PartyStanceCreate(**stance_payload(source_type="vibes"))

    @pytest.mark.parametrize("source_type", ["manifesto", "voting_record", "public_statement"])
    def test_accepts_the_three_permitted_source_types(self, source_type):
        assert PartyStanceCreate(**stance_payload(source_type=source_type)).source_type == source_type


class TestStanceRange:
    @pytest.mark.parametrize("stance", [-2, -1, 0, 1, 2])
    def test_accepts_the_full_scale(self, stance):
        assert PartyStanceCreate(**stance_payload(stance=stance)).stance == stance

    @pytest.mark.parametrize("stance", [-3, 3])
    def test_rejects_out_of_range_stance(self, stance):
        with pytest.raises(ValidationError):
            PartyStanceCreate(**stance_payload(stance=stance))

    def test_no_clear_position_is_allowed_and_still_needs_a_source(self):
        # A party can decline to take a position, but we must show why we think so.
        parsed = PartyStanceCreate(**stance_payload(stance=None))
        assert parsed.stance is None
        assert parsed.source_url


class TestPersistence:
    def _seed_statement(self, db):
        area = PolicyArea(id="a1", name="Health", sort_order=1)
        statement = Statement(id="s1", area_id="a1", text="NHS funding should rise.", cycle="2024-general")
        db.add_all([area, statement])
        db.commit()

    def test_stance_round_trips(self, db):
        self._seed_statement(db)
        db.add(PartyStance(id="x1", statement_id="s1", party_id="p1", cycle="2024-general", stance=2, **VALID_SOURCE))
        db.commit()

        saved = db.query(PartyStance).one()
        assert saved.stance == 2
        assert saved.source_type == "manifesto"

    def test_one_stance_per_party_per_statement_per_cycle(self, db):
        self._seed_statement(db)
        db.add(PartyStance(id="x1", statement_id="s1", party_id="p1", cycle="2024-general", stance=2, **VALID_SOURCE))
        db.commit()

        db.add(PartyStance(id="x2", statement_id="s1", party_id="p1", cycle="2024-general", stance=-2, **VALID_SOURCE))
        with pytest.raises(IntegrityError):
            db.commit()

    def test_the_same_party_may_hold_different_stances_in_different_cycles(self, db):
        self._seed_statement(db)
        db.add_all([
            PartyStance(id="x1", statement_id="s1", party_id="p1", cycle="2024-general", stance=2, **VALID_SOURCE),
            PartyStance(id="x2", statement_id="s1", party_id="p1", cycle="2029-general", stance=-1, **VALID_SOURCE),
        ])
        db.commit()
        assert db.query(PartyStance).count() == 2

    def test_database_rejects_a_stance_with_no_source_url(self, db):
        self._seed_statement(db)
        source = {k: v for k, v in VALID_SOURCE.items() if k != "source_url"}
        db.add(PartyStance(id="x1", statement_id="s1", party_id="p1", cycle="2024-general", stance=1, **source))
        with pytest.raises(IntegrityError):
            db.commit()
