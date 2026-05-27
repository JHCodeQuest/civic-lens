from datetime import date, timedelta
from random import Random
from sqlalchemy.orm import Session

from app.models.election_result import ElectionResult
from app.models.prediction import Prediction
from app.models.poll import Poll
from app.database.db import engine, Base, SessionLocal


PARTIES_DATA = [
    {"name": "Labour", "colour": "#DC241f", "abbreviation": "LAB", "leader": "Keir Starmer", "founded": 1900, "position": "Centre-left"},
    {"name": "Conservative", "colour": "#0087DC", "abbreviation": "CON", "leader": "Rishi Sunak", "founded": 1834, "position": "Centre-right"},
    {"name": "Liberal Democrat", "colour": "#FAA61A", "abbreviation": "LD", "leader": "Ed Davey", "founded": 1988, "position": "Centre"},
    {"name": "Green Party", "colour": "#02A95B", "abbreviation": "GRN", "leader": "Carla Denyer & Adrian Ramsay", "founded": 1990, "position": "Left-wing"},
    {"name": "SNP", "colour": "#FDF38E", "abbreviation": "SNP", "leader": "John Swinney", "founded": 1934, "position": "Centre-left"},
    {"name": "Plaid Cymru", "colour": "#008142", "abbreviation": "PC", "leader": "Rhun ap Iorwerth", "founded": 1925, "position": "Centre-left"},
    {"name": "Reform UK", "colour": "#12B6CF", "abbreviation": "REF", "leader": "Nigel Farage", "founded": 2018, "position": "Right-wing"},
    {"name": "DUP", "colour": "#D46A4C", "abbreviation": "DUP", "leader": "Gavin Robinson", "founded": 1971, "position": "Right-wing"},
    {"name": "Sinn Féin", "colour": "#326760", "abbreviation": "SF", "leader": "Mary Lou McDonald", "founded": 1905, "position": "Left-wing"},
    {"name": "SDLP", "colour": "#2AA82C", "abbreviation": "SDLP", "leader": "Colum Eastwood", "founded": 1970, "position": "Centre-left"},
    {"name": "UUP", "colour": "#48A5EE", "abbreviation": "UUP", "leader": "Doug Beattie", "founded": 1905, "position": "Centre-right"},
    {"name": "Alliance", "colour": "#F6CB2F", "abbreviation": "APNI", "leader": "Naomi Long", "founded": 1970, "position": "Centre"},
]

GB_PARTIES = ["Labour", "Conservative", "Liberal Democrat", "Green Party", "SNP", "Plaid Cymru", "Reform UK"]
NI_PARTIES = ["DUP", "Sinn Féin", "SDLP", "UUP", "Alliance"]

DEV_SOURCE = "DEV Data (synthetic)"

# seats: name, region, country, type
CONSTITUENCIES_DATA = [
    # East Midlands
    {"name": "Leicester South", "region": "East Midlands", "country": "England", "type": "labour"},
    {"name": "Rushcliffe", "region": "East Midlands", "country": "England", "type": "conservative"},
    {"name": "Nottingham North and Kimberley", "region": "East Midlands", "country": "England", "type": "labour"},
    # East of England
    {"name": "Cambridge", "region": "East of England", "country": "England", "type": "labour"},
    {"name": "South Suffolk", "region": "East of England", "country": "England", "type": "conservative"},
    {"name": "Norwich North", "region": "East of England", "country": "England", "type": "marginal"},
    # London
    {"name": "Holborn and St Pancras", "region": "London", "country": "England", "type": "labour"},
    {"name": "Cities of London and Westminster", "region": "London", "country": "England", "type": "conservative"},
    {"name": "Bermondsey and Old Southwark", "region": "London", "country": "England", "type": "labour"},
    {"name": "Richmond Park", "region": "London", "country": "England", "type": "libdem"},
    # North East
    {"name": "Newcastle upon Tyne Central", "region": "North East", "country": "England", "type": "labour"},
    {"name": "Stockton West", "region": "North East", "country": "England", "type": "conservative"},
    # North West
    {"name": "Manchester Central", "region": "North West", "country": "England", "type": "labour"},
    {"name": "Liverpool Riverside", "region": "North West", "country": "England", "type": "labour"},
    {"name": "South Ribble", "region": "North West", "country": "England", "type": "marginal"},
    # South East
    {"name": "Oxford East", "region": "South East", "country": "England", "type": "labour"},
    {"name": "Surrey Heath", "region": "South East", "country": "England", "type": "conservative"},
    {"name": "Winchester", "region": "South East", "country": "England", "type": "libdem"},
    # South West
    {"name": "Bristol Central", "region": "South West", "country": "England", "type": "labour"},
    {"name": "North Devon", "region": "South West", "country": "England", "type": "conservative"},
    {"name": "St Ives", "region": "South West", "country": "England", "type": "marginal"},
    # West Midlands
    {"name": "Birmingham Ladywood", "region": "West Midlands", "country": "England", "type": "labour"},
    {"name": "Meriden and Solihull East", "region": "West Midlands", "country": "England", "type": "conservative"},
    {"name": "Worcester", "region": "West Midlands", "country": "England", "type": "marginal"},
    # Yorkshire and the Humber
    {"name": "Richmond and Northallerton", "region": "Yorkshire and the Humber", "country": "England", "type": "conservative"},
    {"name": "Kingston upon Hull West and Haltemprice", "region": "Yorkshire and the Humber", "country": "England", "type": "marginal"},
    {"name": "Sheffield Heeley", "region": "Yorkshire and the Humber", "country": "England", "type": "labour"},
    # Scotland
    {"name": "Aberdeen South", "region": "Scotland", "country": "Scotland", "type": "snp"},
    {"name": "Edinburgh South", "region": "Scotland", "country": "Scotland", "type": "labour"},
    {"name": "Glasgow North", "region": "Scotland", "country": "Scotland", "type": "snp"},
    # Wales
    {"name": "Cardiff West", "region": "Wales", "country": "Wales", "type": "labour"},
    {"name": "Ynys Môn", "region": "Wales", "country": "Wales", "type": "plaid"},
    # Northern Ireland
    {"name": "Belfast North", "region": "Northern Ireland", "country": "Northern Ireland", "type": "ni_dup"},
    {"name": "Belfast South and Mid Down", "region": "Northern Ireland", "country": "Northern Ireland", "type": "ni_sdlp"},
]

# Seat type → base vote share distribution per party
SEAT_PROFILES = {
    "labour": {
        "Labour": 52, "Conservative": 22, "Liberal Democrat": 9, "Green Party": 5, "Reform UK": 8, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "conservative": {
        "Labour": 26, "Conservative": 48, "Liberal Democrat": 10, "Green Party": 4, "Reform UK": 10, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "marginal": {
        "Labour": 36, "Conservative": 35, "Liberal Democrat": 11, "Green Party": 5, "Reform UK": 11, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "libdem": {
        "Labour": 18, "Conservative": 30, "Liberal Democrat": 37, "Green Party": 5, "Reform UK": 8, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "snp": {
        "Labour": 15, "Conservative": 12, "Liberal Democrat": 8, "Green Party": 3, "Reform UK": 4, "SNP": 56, "Plaid Cymru": 0,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "plaid": {
        "Labour": 30, "Conservative": 18, "Liberal Democrat": 6, "Green Party": 3, "Reform UK": 5, "SNP": 0, "Plaid Cymru": 36,
        "DUP": 0, "Sinn Féin": 0, "SDLP": 0, "UUP": 0, "Alliance": 0,
    },
    "ni_dup": {
        "Labour": 0, "Conservative": 0, "Liberal Democrat": 0, "Green Party": 2, "Reform UK": 0, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 48, "Sinn Féin": 32, "SDLP": 8, "UUP": 6, "Alliance": 4,
    },
    "ni_sdlp": {
        "Labour": 0, "Conservative": 0, "Liberal Democrat": 0, "Green Party": 2, "Reform UK": 0, "SNP": 0, "Plaid Cymru": 0,
        "DUP": 22, "Sinn Féin": 20, "SDLP": 38, "UUP": 10, "Alliance": 8,
    },
}

# Swing from 2019 to 2024 per party (national trend applied to all seats)
SWING_2019_TO_2024 = {
    "Labour": +8.0,
    "Conservative": -12.0,
    "Liberal Democrat": +2.0,
    "Green Party": +2.5,
    "Reform UK": +6.0,
    "SNP": -3.0,
    "Plaid Cymru": +0.5,
    "DUP": -5.0,
    "Sinn Féin": +4.0,
    "SDLP": +1.0,
    "UUP": -2.0,
    "Alliance": +3.0,
}

PREDICTIONS_DATA: list[dict] = []


def _seed_parties(db: Session) -> dict[str, str]:
    from app.repositories.party_repo import PartyRepository
    repo = PartyRepository(db)
    party_map: dict[str, str] = {}
    for data in PARTIES_DATA:
        existing = repo.get_by_name(data["name"])
        if existing:
            party_map[data["name"]] = existing.id
            continue
        party = repo.create(**data)
        party_map[data["name"]] = party.id
    return party_map


def _seed_constituencies(db: Session, rng: Random) -> dict[str, str]:
    from app.repositories.constituency_repo import ConstituencyRepository
    repo = ConstituencyRepository(db)
    const_map: dict[str, str] = {}
    for data in CONSTITUENCIES_DATA:
        existing = repo.get_by_name(data["name"])
        if existing:
            const_map[data["name"]] = existing.id
            continue
        c = repo.create(name=data["name"], region=data["region"], country=data["country"], electorate=f"{rng.randint(65000, 85000)}")
        const_map[data["name"]] = c.id
    return const_map


def _seed_election_results(
    db: Session, party_map: dict[str, str], const_map: dict[str, str], rng: Random,
) -> None:
    repo = type("Repo", (), {})()
    repo.db = db
    from app.repositories.election_result_repo import ElectionResultRepository
    er_repo = ElectionResultRepository(db)

    existing = er_repo.list_all()
    if existing:
        return

    count = 0
    for const_data in CONSTITUENCIES_DATA:
        const_id = const_map[const_data["name"]]
        profile = SEAT_PROFILES[const_data["type"]]
        total_electorate = rng.randint(65000, 85000)

        for year, swing_mult in [(2024, 0), (2019, -1)]:
            parties_in_seat = [p for p, v in profile.items() if v > 0]
            raw_shares: dict[str, float] = {}

            for pname in parties_in_seat:
                base = profile[pname]
                if year == 2019:
                    swing = SWING_2019_TO_2024.get(pname, 0)
                    base = max(1.0, base - swing)
                raw_shares[pname] = base + rng.uniform(-3.0, 3.0)

            total = sum(raw_shares.values())
            normalised = {p: round(v / total * 100, 1) for p, v in raw_shares.items()}

            # Ensure sum = 100
            diff = 100.0 - sum(normalised.values())
            if diff != 0:
                top = max(normalised, key=normalised.__getitem__)
                normalised[top] = round(normalised[top] + diff, 1)

            turnout_pct = rng.uniform(55, 72)
            turnout_votes = int(total_electorate * turnout_pct / 100)
            remaining = turnout_votes

            sorted_parties = sorted(normalised.items(), key=lambda x: -x[1])
            for pos, (pname, share) in enumerate(sorted_parties, 1):
                votes = int(turnout_votes * share / 100)
                if pos == len(sorted_parties):
                    votes = remaining
                remaining -= votes

                er_repo.create(
                    constituency_id=const_id,
                    party_id=party_map[pname],
                    year=year,
                    votes=votes,
                    share=share,
                    change=None,
                    position=pos,
                    source=DEV_SOURCE,
                )
                count += 1

            # Register predictions for marginal seats in 2024
            if const_data["type"] == "marginal" and year == 2024:
                winner_pname = sorted_parties[0][0]
                runner_up = sorted_parties[1][0]
                winner_share = sorted_parties[0][1]
                runner_share = sorted_parties[1][1]
                confidence = round(50 + (winner_share - runner_share) * 1.5, 1)

                prediction = Prediction(
                    constituency_id=const_id,
                    predicted_winner_id=party_map[winner_pname],
                    predicted_winner_name=winner_pname,
                    confidence=min(confidence, 95),
                    model_used="uniform_swing",
                    prediction_date=date(2026, 1, 15),
                    notes=DEV_SOURCE,
                )
                db.add(prediction)

    print(f"  Seeded {count} election results")


def _seed_polls(db: Session, party_map: dict[str, str]) -> None:
    from app.repositories.poll_repo import PollRepository
    repo = PollRepository(db)

    existing = repo.list_all()
    if existing:
        return

    rng = Random(42)

    base_centres = {
        "Labour": 30.5,
        "Conservative": 23.0,
        "Reform UK": 17.5,
        "Liberal Democrat": 12.0,
        "Green Party": 7.0,
        "SNP": 3.5,
        "Plaid Cymru": 0.8,
    }

    start = date(2025, 11, 26)
    polling_companies = ["YouGov", "Ipsos", "Opinium", "Savanta", "Redfield & Wilton"]

    poll_dates: list[date] = []
    d = start
    while d <= date.today():
        poll_dates.append(d)
        d += timedelta(days=7)

    for poll_date in poll_dates:
        company = rng.choice(polling_companies)
        for party_name in GB_PARTIES:
            centre = base_centres[party_name]
            noise = rng.uniform(-1.8, 1.8)
            percentage = round(max(0.1, centre + noise), 1)
            sample = rng.choice([1000, 1200, 1500, 2000])

            repo.create(
                party_id=party_map[party_name],
                date=poll_date,
                percentage=percentage,
                sample_size=sample,
                source=DEV_SOURCE,
                polling_company=company,
            )

    print(f"  Seeded {len(poll_dates) * len(GB_PARTIES)} poll records across {len(poll_dates)} weeks")


def seed_all(db: Session | None = None) -> None:
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()

    rng = Random(42)

    try:
        party_map = _seed_parties(db)
        const_map = _seed_constituencies(db, rng)
        _seed_election_results(db, party_map, const_map, rng)
        _seed_polls(db, party_map)
        db.commit()
        print(f"Seed complete: {len(party_map)} parties, {len(const_map)} constituencies, results + polls seeded")
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
