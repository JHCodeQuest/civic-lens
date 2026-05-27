export interface ConstituencySummary {
  id: string
  name: string
  region: string
  country: string | null
  winner: string | null
  winningPartyId: string | null
  majority: number | null
}

export interface ConstituencyDetail extends ConstituencySummary {
  electorate: string | null
  createdAt: string
  updatedAt: string
}

export interface ElectionResultItem {
  id: string
  constituencyId: string
  partyId: string
  partyName: string
  partyColour: string | null
  year: number
  votes: number
  share: number | null
  change: number | null
  position: number | null
  source: string | null
}

export interface PredictionResult {
  id: string
  constituencyId: string
  predictedWinnerName: string
  predictedWinnerId: string | null
  confidence: number
  modelUsed: string
  constituencyName: string | null
  notes: string | null
}

export interface DevConstituency {
  id: string
  name: string
  region: string
  country: string
  type: string
  winner2024: string
  winner2019: string
  majority2024: number
  majority2019: number
  results2024: ElectionResultItem[]
  results2019: ElectionResultItem[]
  prediction: PredictionResult | null
}
