"use client"

import { useState, useEffect, useCallback } from "react"
import type { NationalSummary, RegionSummary } from "@/types/election"
import { getElectionSummary, getRegionBreakdown } from "@/services/politics-api"
import { getDevNationalSummary, getDevRegionBreakdown, IS_DEV_DATA } from "@/data/elections"

interface UseElectionDataResult {
  summary: NationalSummary | null
  previousSummary: NationalSummary | null
  regionBreakdown: RegionSummary[]
  loading: boolean
  error: string | null
  isDevData: boolean
  refetch: () => void
}

export function useElectionData(year: number): UseElectionDataResult {
  const [summary, setSummary] = useState<NationalSummary | null>(null)
  const [previousSummary, setPreviousSummary] = useState<NationalSummary | null>(null)
  const [regionBreakdown, setRegionBreakdown] = useState<RegionSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const previousYear = year === 2024 ? 2019 : 2024

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [s, ps, r] = await Promise.all([
        getElectionSummary(year),
        getElectionSummary(previousYear).catch(() => null),
        getRegionBreakdown(year),
      ])
      setSummary(s)
      setPreviousSummary(ps)
      setRegionBreakdown(r)
    } catch {
      if (IS_DEV_DATA) {
        setSummary(getDevNationalSummary(year))
        setPreviousSummary(getDevNationalSummary(previousYear))
        setRegionBreakdown(getDevRegionBreakdown(year))
      } else {
        setError("Unable to load election data")
        setSummary(null)
        setPreviousSummary(null)
        setRegionBreakdown([])
      }
    } finally {
      setLoading(false)
    }
  }, [year, previousYear])

  useEffect(() => { fetch() }, [fetch])

  return { summary, previousSummary, regionBreakdown, loading, error, isDevData: IS_DEV_DATA, refetch: fetch }
}
