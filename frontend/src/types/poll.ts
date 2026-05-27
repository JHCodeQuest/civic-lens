export interface PollDataPoint {
  id: string
  partyId: string
  partyName: string
  partyColour: string
  date: string
  percentage: number
  sampleSize: number | null
  source: string | null
  pollingCompany: string | null
}

export interface PollFilterState {
  selectedParties: string[]
  dateRange: "1M" | "3M" | "6M" | "ALL"
}
