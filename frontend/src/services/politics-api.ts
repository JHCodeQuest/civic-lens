import { fetchFromApi } from "@/lib/api"
import type { PollDataPoint } from "@/types/poll"

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

export async function getConstituencies(): Promise<Constituency[]> {
  return fetchFromApi("/constituencies")
}

export async function getParties(): Promise<Party[]> {
  return fetchFromApi("/parties")
}

export async function getPollingTrend(opts?: {
  start?: string
  end?: string
}): Promise<PollDataPoint[]> {
  const params = new URLSearchParams()
  if (opts?.start) params.set("start", opts.start)
  if (opts?.end) params.set("end", opts.end)
  const qs = params.toString()
  return fetchFromApi(`/polling${qs ? `?${qs}` : ""}`)
}

export async function getLatestPolling(): Promise<PollDataPoint[]> {
  return fetchFromApi("/polling/latest")
}
