import { fetchFromApi } from "@/lib/api"

export interface Constituency {
  id: string
  name: string
  region: string
  winner: string
  majority: number
}

export interface Party {
  id: string
  name: string
  seats: number
  voteShare: number
}

export interface PollingData {
  date: string
  party: string
  percentage: number
}

export async function getConstituencies(): Promise<Constituency[]> {
  return fetchFromApi("/constituencies")
}

export async function getParties(): Promise<Party[]> {
  return fetchFromApi("/parties")
}

export async function getPolling(): Promise<PollingData[]> {
  return fetchFromApi("/polling")
}
