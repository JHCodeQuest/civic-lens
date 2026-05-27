import type { PartyHistoryItem, PartyConstituencyItem } from "@/types/party"
import { parties } from "@/data/parties"
import { getDevConstituencies } from "@/data/constituencies"

export const IS_DEV_DATA = true
export const DEV_BANNER = "Party detail data shown for demonstration purposes"

const DEV_HISTORY: Record<string, PartyHistoryItem[]> = {
  labour: [
    { year: 2024, seats: 18, voteShare: 36.2, totalVotes: 612000 },
    { year: 2019, seats: 12, voteShare: 28.5, totalVotes: 481000 },
  ],
  conservative: [
    { year: 2024, seats: 8, voteShare: 23.5, totalVotes: 398000 },
    { year: 2019, seats: 20, voteShare: 35.2, totalVotes: 594000 },
  ],
  "liberal-democrat": [
    { year: 2024, seats: 3, voteShare: 12.8, totalVotes: 216000 },
    { year: 2019, seats: 1, voteShare: 10.5, totalVotes: 177000 },
  ],
  "green-party": [
    { year: 2024, seats: 0, voteShare: 6.5, totalVotes: 110000 },
    { year: 2019, seats: 0, voteShare: 4.2, totalVotes: 71000 },
  ],
  snp: [
    { year: 2024, seats: 2, voteShare: 3.5, totalVotes: 59000 },
    { year: 2019, seats: 3, voteShare: 4.8, totalVotes: 81000 },
  ],
  "plaid-cymru": [
    { year: 2024, seats: 1, voteShare: 0.8, totalVotes: 13500 },
    { year: 2019, seats: 1, voteShare: 0.8, totalVotes: 13500 },
  ],
  "reform-uk": [
    { year: 2024, seats: 0, voteShare: 14.2, totalVotes: 240000 },
    { year: 2019, seats: 0, voteShare: 7.5, totalVotes: 127000 },
  ],
  dup: [
    { year: 2024, seats: 1, voteShare: 1.2, totalVotes: 20300 },
    { year: 2019, seats: 2, voteShare: 2.1, totalVotes: 35500 },
  ],
  "sinn-fein": [
    { year: 2024, seats: 0, voteShare: 0.9, totalVotes: 15200 },
    { year: 2019, seats: 0, voteShare: 0.9, totalVotes: 15200 },
  ],
  sdlp: [
    { year: 2024, seats: 1, voteShare: 0.5, totalVotes: 8500 },
    { year: 2019, seats: 0, voteShare: 0.4, totalVotes: 6800 },
  ],
  uup: [
    { year: 2024, seats: 0, voteShare: 0.4, totalVotes: 6800 },
    { year: 2019, seats: 1, voteShare: 1.2, totalVotes: 20300 },
  ],
  alliance: [
    { year: 2024, seats: 0, voteShare: 0.8, totalVotes: 13500 },
    { year: 2019, seats: 0, voteShare: 0.6, totalVotes: 10100 },
  ],
}

const LARGEST_PARTIES = ["labour", "conservative", "liberal-democrat", "snp", "plaid-cymru", "dup", "sdlp"]

const DEV_CONSTITUENCIES: Record<string, PartyConstituencyItem[]> = {}
for (const p of parties) {
  const slug = p.slug
  if (LARGEST_PARTIES.includes(slug)) {
    const pc = getDevConstituencies().filter((c) => c.winner2024 === p.name)
    DEV_CONSTITUENCIES[slug] = pc.map((c) => ({
      id: c.id,
      name: c.name,
      region: c.region,
      winner: true,
      majority: c.majority2024,
    }))
  } else {
    DEV_CONSTITUENCIES[slug] = []
  }
}

export function getDevPartyHistory(slug: string): PartyHistoryItem[] {
  return DEV_HISTORY[slug] || []
}

export function getDevPartyConstituencies(slug: string): PartyConstituencyItem[] {
  return DEV_CONSTITUENCIES[slug] || []
}
