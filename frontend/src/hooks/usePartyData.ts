"use client"

import { useState, useEffect, useCallback } from "react"
import type { Party, PartyHistoryItem, PartyConstituencyItem } from "@/types/party"
import { getPartyBySlug, getPartyHistory, getPartyConstituencies } from "@/services/politics-api"
import { getPartyBySlug as getDevParty } from "@/data/parties"
import { getDevPartyHistory, getDevPartyConstituencies, IS_DEV_DATA } from "@/data/party-detail"

interface UsePartyDataResult {
  party: Party | null
  history: PartyHistoryItem[]
  constituencies: PartyConstituencyItem[]
  loading: boolean
  error: string | null
  isDevData: boolean
  refetch: () => void
}

export function usePartyData(slug: string): UsePartyDataResult {
  const [party, setParty] = useState<Party | null>(null)
  const [history, setHistory] = useState<PartyHistoryItem[]>([])
  const [constituencies, setConstituencies] = useState<PartyConstituencyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const p = await getPartyBySlug(slug)

      let h: PartyHistoryItem[] = []
      let c: PartyConstituencyItem[] = []
      try {
        ;[h, c] = await Promise.all([
          getPartyHistory(p.id),
          getPartyConstituencies(p.id),
        ])
      } catch {}

      setParty(p as unknown as Party)
      setHistory(h)
      setConstituencies(c)
    } catch {
      if (IS_DEV_DATA) {
        const dev = getDevParty(slug)
        if (dev) {
          setParty(dev)
          setHistory(getDevPartyHistory(slug))
          setConstituencies(getDevPartyConstituencies(slug))
        } else {
          setError("Party not found")
        }
      } else {
        setError("Unable to load party data")
      }
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetch() }, [fetch])

  return { party, history, constituencies, loading, error, isDevData: IS_DEV_DATA, refetch: fetch }
}
