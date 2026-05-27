export type Region = "England" | "Scotland" | "Wales" | "Northern Ireland"

export interface Party {
  name: string
  leader: string
  position: string
  summary: string
  region: Region
  priorities: string[]
  founded: number
  color: string
}
