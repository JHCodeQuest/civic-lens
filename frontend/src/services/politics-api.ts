import { fetchFromApi } from "@/lib/api"
import type { PollDataPoint } from "@/types/poll"
import type { ConstituencyDetail, ElectionResultItem, PredictionResult } from "@/types/constituency"
import type { NationalSummary, RegionSummary } from "@/types/election"
import type { PartyHistoryItem, PartyConstituencyItem } from "@/types/party"

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

export async function getConstituencies(): Promise<ConstituencyDetail[]> {
  return fetchFromApi("/constituencies")
}

export async function getConstituency(id: string, year?: number): Promise<ConstituencyDetail> {
  const params = year ? `?year=${year}` : ""
  return fetchFromApi(`/constituencies/${id}${params}`)
}

export async function getConstituencyResults(id: string, year?: number): Promise<ElectionResultItem[]> {
  const params = year ? `?year=${year}` : ""
  return fetchFromApi(`/constituencies/${id}/results${params}`)
}

export async function getConstituencyPrediction(id: string): Promise<PredictionResult> {
  return fetchFromApi(`/constituencies/${id}/prediction`)
}

export async function getParties(): Promise<Party[]> {
  return fetchFromApi("/parties")
}

export async function getPollingTrend(opts?: { start?: string; end?: string }): Promise<PollDataPoint[]> {
  const params = new URLSearchParams()
  if (opts?.start) params.set("start", opts.start)
  if (opts?.end) params.set("end", opts.end)
  const qs = params.toString()
  return fetchFromApi(`/polling${qs ? `?${qs}` : ""}`)
}

export async function getLatestPolling(): Promise<PollDataPoint[]> {
  return fetchFromApi("/polling/latest")
}

export async function getElectionSummary(year: number): Promise<NationalSummary> {
  return fetchFromApi(`/elections/${year}/summary`)
}

export async function getRegionBreakdown(year: number): Promise<RegionSummary[]> {
  return fetchFromApi(`/elections/${year}/regions`)
}

export async function getPartyBySlug(slug: string): Promise<Party> {
  return fetchFromApi(`/parties/by-slug/${slug}`)
}

export async function getPartyHistory(partyId: string): Promise<PartyHistoryItem[]> {
  return fetchFromApi(`/parties/${partyId}/history`)
}

export async function getPartyConstituencies(partyId: string, year?: number): Promise<PartyConstituencyItem[]> {
  const params = year ? `?year=${year}` : ""
  return fetchFromApi(`/parties/${partyId}/constituencies${params}`)
}
