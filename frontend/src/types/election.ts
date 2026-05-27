export interface PartySummary {
  partyName: string
  partyColour: string | null
  seats: number
  voteShare: number | null
  change: number | null
}

export interface NationalSummary {
  year: number
  totalSeats: number
  parties: PartySummary[]
  majorityParty: string | null
  majoritySeats: number | null
}

export interface RegionSummary {
  region: string
  winningParty: string
  winningPartyColour: string | null
  seats: number
  totalConstituencies: number
}
