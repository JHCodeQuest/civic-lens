import type { PollDataPoint } from "@/types/poll"
import { PARTY_COLORS } from "@/lib/constants"

export const IS_DEV_DATA = true

export const DEV_BANNER = "Polling data shown for demonstration purposes"

const SRC = "DEV Data (synthetic)"

// Mirrors the backend seed (backend/app/database/seed.py) so the static site
// and the API-backed site show the same shape of data.
const BASE_CENTRES: Record<string, number> = {
  Labour: 30.5,
  Conservative: 23.0,
  "Reform UK": 17.5,
  "Liberal Democrat": 12.0,
  "Green Party": 7.0,
  SNP: 3.5,
  "Plaid Cymru": 0.8,
}

const POLLING_COMPANIES = ["YouGov", "Ipsos", "Opinium", "Savanta", "Redfield & Wilton"]

const WEEKS = 52

// Deterministic PRNG (mulberry32) — keeps the series stable across renders so
// the chart doesn't jitter on every re-fetch.
function seeded(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildPolls(): PollDataPoint[] {
  const rng = seeded(42)
  const points: PollDataPoint[] = []
  const partyNames = Object.keys(BASE_CENTRES)

  // Weekly polls ending today, so the 1M/3M/6M range filters all have data.
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let w = WEEKS - 1; w >= 0; w--) {
    const d = new Date(today)
    d.setDate(d.getDate() - w * 7)
    const dateStr = d.toISOString().slice(0, 10)
    const company = POLLING_COMPANIES[Math.floor(rng() * POLLING_COMPANIES.length)]

    for (const partyName of partyNames) {
      const centre = BASE_CENTRES[partyName]
      const noise = rng() * 3.6 - 1.8
      points.push({
        id: `dev-${dateStr}-${partyName}`,
        partyId: `dev-${partyName.toLowerCase().replace(/\s+/g, "-")}`,
        partyName,
        partyColour: PARTY_COLORS[partyName] || "#6b7280",
        date: dateStr,
        percentage: Math.round(Math.max(0.1, centre + noise) * 10) / 10,
        sampleSize: [1000, 1200, 1500, 2000][Math.floor(rng() * 4)],
        source: SRC,
        pollingCompany: company,
      })
    }
  }

  return points
}

let cached: PollDataPoint[] | null = null

function allPolls(): PollDataPoint[] {
  if (!cached) cached = buildPolls()
  return cached
}

export function getDevPollingTrend(range?: { start: string; end: string }): PollDataPoint[] {
  const polls = allPolls()
  if (!range) return polls
  return polls.filter((p) => p.date >= range.start && p.date <= range.end)
}

export function getDevLatestPolling(): PollDataPoint[] {
  const polls = allPolls()
  if (polls.length === 0) return []
  const latestDate = polls.reduce((max, p) => (p.date > max ? p.date : max), polls[0].date)
  return polls.filter((p) => p.date === latestDate)
}
