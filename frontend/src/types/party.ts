export type Region = "England" | "Scotland" | "Wales" | "Northern Ireland"

export interface Party {
  id?: string
  slug: string
  name: string
  leader: string
  position: string
  summary: string
  description: string
  region: Region
  priorities: string[]
  founded: number
  color: string
  colourSecondary: string | null
  abbreviation: string
  seats?: number
  voteShare?: number
}

export interface PartyHistoryItem {
  year: number
  seats: number
  voteShare: number | null
  totalVotes: number
}

export interface PartyConstituencyItem {
  id: string
  name: string
  region: string
  winner: boolean
  majority: number | null
}
