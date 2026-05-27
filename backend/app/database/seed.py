from datetime import date, timedelta
from random import Random
from sqlalchemy.orm import Session

from app.models.election_result import ElectionResult
from app.models.prediction import Prediction
from app.models.poll import Poll
from app.database.db import engine, Base, SessionLocal


PARTIES_DATA: list[dict] = [
    {"name": "Labour", "colour": "#DC241f", "colour_secondary": "#E87D7A", "abbreviation": "LAB", "leader": "Keir Starmer", "founded": 1900, "position": "Centre-left", "region": "England",
     "description": "The Labour Party is a centre-left political party that emphasises public services, workers' rights, and social equality. Founded by trade unions and socialist societies, it has been one of the UK's two major parties since the early 20th century.",
     "summary": "A centre-left party focused on public services, workers' rights, and social equality. Founded in 1900 by trade unions and socialist societies.",
     "priorities": '["Economic growth and stability", "NHS investment and reform", "Green energy transition", "Workers\' rights and fair pay", "Housing and infrastructure"]'},
    {"name": "Conservative", "colour": "#0087DC", "colour_secondary": "#66B2E8", "abbreviation": "CON", "leader": "Kemi Badenoch", "founded": 1834, "position": "Centre-right", "region": "England",
     "description": "The Conservative and Unionist Party, commonly known as the Tories, is a centre-right party that emphasises lower taxes, free markets, and national sovereignty. It is the oldest political party in the UK and traditionally the party of the right.",
     "summary": "A centre-right party emphasising lower taxes, free markets, and national sovereignty. The oldest political party in the UK, founded in 1834.",
     "priorities": '["Lower taxes and deregulation", "Strong national defence", "Controlled immigration", "Brexit opportunities", "Education standards"]'},
    {"name": "Liberal Democrat", "colour": "#FAA61A", "colour_secondary": "#FCCC6E", "abbreviation": "LD", "leader": "Ed Davey", "founded": 1988, "position": "Centre", "region": "England",
     "description": "The Liberal Democrats are a centrist party that supports civil liberties, electoral reform, and environmental protection. Formed in 1988 from the merger of the Liberal Party and the Social Democratic Party.",
     "summary": "A centrist party supporting civil liberties, electoral reform, and environmental protection. Formed in 1988 from the Liberal-SDP merger.",
     "priorities": '["Electoral reform (proportional representation)", "Climate action", "Investment in health and social care", "Civil liberties protections", "Free childcare and education"]'},
    {"name": "Green Party", "colour": "#02A95B", "colour_secondary": "#4DCB8A", "abbreviation": "GRN", "leader": "Carla Denyer & Adrian Ramsay", "founded": 1990, "position": "Left-wing", "region": "England",
     "description": "The Green Party of England and Wales prioritises climate action, social justice, and grassroots democracy. It campaigns for a transition to an environmentally sustainable economy and public ownership of key services.",
     "summary": "A left-wing party prioritising climate action, social justice, and grassroots democracy. Campaigns for an environmentally sustainable economy.",
     "priorities": '["Net-zero carbon emissions by 2030", "Public ownership of key services", "Universal basic income", "Housing as a human right", "Renewable energy investment"]'},
    {"name": "SNP", "colour": "#FDF38E", "colour_secondary": "#FEF8C4", "abbreviation": "SNP", "leader": "John Swinney", "founded": 1934, "position": "Centre-left", "region": "Scotland",
     "description": "The Scottish National Party seeks Scottish independence and supports progressive policies on health, education, and social welfare. It has been the largest party in the Scottish Parliament since 2007 and dominates Scottish Westminster seats.",
     "summary": "A centre-left party seeking Scottish independence. The largest party in Scotland since 2007, with a focus on health, education, and social welfare.",
     "priorities": '["Scottish independence", "NHS and social care funding", "Child poverty reduction", "Free tuition and education", "Renewable energy leadership"]'},
    {"name": "Plaid Cymru", "colour": "#008142", "colour_secondary": "#4DAA75", "abbreviation": "PC", "leader": "Rhun ap Iorwerth", "founded": 1925, "position": "Centre-left", "region": "Wales",
     "description": "Plaid Cymru — the Party of Wales — seeks Welsh independence and supports protection of the Welsh language. It is strongest in Welsh-speaking areas of north and west Wales and advocates for fair funding for Wales.",
     "summary": "A centre-left Welsh nationalist party seeking independence and protecting the Welsh language. Strongest in Welsh-speaking north and west Wales.",
     "priorities": '["Welsh independence", "Welsh language preservation", "Fair funding for Wales", "Green jobs and energy", "Affordable housing"]'},
    {"name": "Reform UK", "colour": "#12B6CF", "colour_secondary": "#6AD0E2", "abbreviation": "REF", "leader": "Nigel Farage", "founded": 2018, "position": "Right-wing", "region": "England",
     "description": "Reform UK is a right-wing populist party that supports lower immigration, tax reductions, and changes to public institutions. Formed in 2018 from the Brexit Party, it advocates for significant reform of the UK political system.",
     "summary": "A right-wing populist party supporting lower immigration, tax cuts, and institutional reform. Formed from the Brexit Party in 2018.",
     "priorities": '["Immigration reduction", "Tax cuts and deregulation", "NHS reform", "House of Lords abolition", "Energy independence"]'},
    {"name": "DUP", "colour": "#D46A4C", "colour_secondary": "#E49E89", "abbreviation": "DUP", "leader": "Gavin Robinson", "founded": 1971, "position": "Right-wing", "region": "Northern Ireland",
     "description": "The Democratic Unionist Party is a unionist party that wants Northern Ireland to remain part of the UK. It emphasises traditional social values and is strongly Eurosceptic.",
     "summary": "A right-wing unionist party committed to Northern Ireland remaining in the UK. Emphasises traditional social values and Euroscepticism.",
     "priorities": '["Union with Great Britain", "Traditional social values", "Northern Ireland economy", "Opposition to the Northern Ireland Protocol", "Strong defence and security"]'},
    {"name": "Sinn Féin", "colour": "#326760", "colour_secondary": "#6E9994", "abbreviation": "SF", "leader": "Mary Lou McDonald", "founded": 1905, "position": "Left-wing", "region": "Northern Ireland",
     "description": "Sinn Féin is an Irish republican party that seeks a united Ireland. It follows a policy of abstentionism — its MPs do not take their seats in the UK Parliament. It is the largest nationalist party in Northern Ireland.",
     "summary": "A left-wing Irish republican party seeking a united Ireland. Follows abstentionism — MPs do not take their Westminster seats.",
     "priorities": '["Irish reunification", "Social housing investment", "Healthcare reform", "All-Ireland economy", "Irish language rights"]'},
    {"name": "SDLP", "colour": "#2AA82C", "colour_secondary": "#6CC26D", "abbreviation": "SDLP", "leader": "Colum Eastwood", "founded": 1970, "position": "Centre-left", "region": "Northern Ireland",
     "description": "The Social Democratic and Labour Party is an Irish nationalist party that pursues a united Ireland through constitutional and democratic means. It rejects abstentionism and fully participates in UK parliamentary democracy.",
     "summary": "A centre-left Irish nationalist party pursuing a united Ireland through peaceful, constitutional means. Rejects abstentionism.",
     "priorities": '["Irish reunification (peaceful)", "Good Friday Agreement", "Public services investment", "Cross-community cooperation", "Economic development"]'},
    {"name": "UUP", "colour": "#48A5EE", "colour_secondary": "#82C1F3", "abbreviation": "UUP", "leader": "Mike Nesbitt", "founded": 1905, "position": "Centre-right", "region": "Northern Ireland",
     "description": "The Ulster Unionist Party is a unionist party that wants Northern Ireland to remain in the UK. Historically the dominant unionist party, it operates within constitutional politics and supports power-sharing.",
     "summary": "A centre-right unionist party supporting Northern Ireland in the UK. Historically dominant, it backs constitutional politics and power-sharing.",
     "priorities": '["Union with Great Britain", "Power-sharing stability", "Economic development", "Health service reform", "Education investment"]'},
    {"name": "Alliance", "colour": "#F6CB2F", "colour_secondary": "#F9DD70", "abbreviation": "APNI", "leader": "Naomi Long", "founded": 1970, "position": "Centre", "region": "Northern Ireland",
     "description": "The Alliance Party of Northern Ireland is a cross-community party that defines itself as neither nationalist nor unionist. It supports shared governance and reconciliation, and has grown significantly in recent elections.",
     "summary": "A centrist cross-community party in Northern Ireland, neither nationalist nor unionist. Supports shared governance and reconciliation.",
     "priorities": '["Cross-community reconciliation", "Education investment", "Environmental sustainability", "Progressive social policies", "Economic reform"]'},
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
    from app.repositories.election_result_repo import ElectionResultRepository
    er_repo = ElectionResultRepository(db)

    existing = er_repo.list_all()
    if existing:
        return

    count = 0
    shares_2019: dict[tuple[str, str], float] = {}

    for const_data in CONSTITUENCIES_DATA:
        const_id = const_map[const_data["name"]]
        profile = SEAT_PROFILES[const_data["type"]]
        total_electorate = rng.randint(65000, 85000)

        for year in (2019, 2024):
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

            diff = 100.0 - sum(normalised.values())
            if diff != 0:
                top = max(normalised, key=normalised.__getitem__)
                normalised[top] = round(normalised[top] + diff, 1)

            turnout_pct = rng.uniform(55, 72)
            turnout_votes = int(total_electorate * turnout_pct / 100)
            remaining = turnout_votes

            sorted_parties = sorted(normalised.items(), key=lambda x: -x[1])

            if year == 2019:
                for pname, share in sorted_parties:
                    shares_2019[(const_id, party_map[pname])] = share

            for pos, (pname, share) in enumerate(sorted_parties, 1):
                votes = int(turnout_votes * share / 100)
                if pos == len(sorted_parties):
                    votes = remaining
                remaining -= votes

                change = None
                if year == 2024:
                    prev_share = shares_2019.get((const_id, party_map[pname]))
                    if prev_share is not None:
                        change = round(share - prev_share, 1)

                er_repo.create(
                    constituency_id=const_id,
                    party_id=party_map[pname],
                    year=year,
                    votes=votes,
                    share=share,
                    change=change,
                    position=pos,
                    source=DEV_SOURCE,
                )
                count += 1

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
