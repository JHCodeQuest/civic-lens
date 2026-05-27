from datetime import date, timedelta
from random import Random
from sqlalchemy.orm import Session

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

CONSTITUENCIES_DATA = [
    {"name": "Holborn and St Pancras", "region": "London", "country": "England"},
    {"name": "Richmond and Northallerton", "region": "Yorkshire and the Humber", "country": "England"},
    {"name": "Kingston upon Hull West and Haltemprice", "region": "Yorkshire and the Humber", "country": "England"},
    {"name": "Aberdeen South", "region": "Scotland", "country": "Scotland"},
    {"name": "Cardiff West", "region": "Wales", "country": "Wales"},
    {"name": "Belfast North", "region": "Northern Ireland", "country": "Northern Ireland"},
    {"name": "Birmingham Ladywood", "region": "West Midlands", "country": "England"},
    {"name": "Manchester Central", "region": "North West", "country": "England"},
    {"name": "Cities of London and Westminster", "region": "London", "country": "England"},
    {"name": "Edinburgh South", "region": "Scotland", "country": "Scotland"},
]

GB_PARTIES = ["Labour", "Conservative", "Liberal Democrat", "Green Party", "SNP", "Plaid Cymru", "Reform UK"]


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


def _seed_constituencies(db: Session) -> None:
    from app.repositories.constituency_repo import ConstituencyRepository
    repo = ConstituencyRepository(db)

    for data in CONSTITUENCIES_DATA:
        existing = repo.get_by_name(data["name"])
        if existing:
            continue
        repo.create(**data)


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

    # 6 months of weekly polls starting 26 Nov 2025
    start = date(2025, 11, 26)
    polling_companies = ["YouGov", "Ipsos", "Opinium", "Savanta", "Redfield & Wilton"]
    source = "Various"

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
                source=source,
                polling_company=company,
            )

    print(f"  Seeded {len(poll_dates) * len(GB_PARTIES)} poll records across {len(poll_dates)} weeks")


def seed_all(db: Session | None = None) -> None:
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()

    try:
        party_map = _seed_parties(db)
        _seed_constituencies(db)
        _seed_polls(db, party_map)
        db.commit()
        print(f"Seed complete: {len(party_map)} parties, {len(CONSTITUENCIES_DATA)} constituencies, polls seeded")
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_all()
