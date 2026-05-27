"use client"

import { useState, useEffect, useCallback } from "react"
import type { PollDataPoint } from "@/types/poll"
import { getPollingTrend, getLatestPolling } from "@/services/politics-api"

interface UsePollingDataResult {
  trendData: PollDataPoint[]
  latestData: PollDataPoint[]
  loading: boolean
  error: string | null
  refetch: () => void
}

function getDefaultRange(): { start: string; end: string } {
  const end = new Date()
  const start = new Date()
  start.setMonth(start.getMonth() - 6)
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

export function usePollingData(
  range?: { start: string; end: string },
): UsePollingDataResult {
  const [trendData, setTrendData] = useState<PollDataPoint[]>([])
  const [latestData, setLatestData] = useState<PollDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const r = range || getDefaultRange()

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [trend, latest] = await Promise.all([
        getPollingTrend({ start: r.start, end: r.end }),
        getLatestPolling(),
      ])
      setTrendData(trend)
      setLatestData(latest)
    } catch {
      setError("Polling data unavailable. Start the backend API to see live data.")
      setTrendData([])
      setLatestData([])
    } finally {
      setLoading(false)
    }
  }, [r.start, r.end])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { trendData, latestData, loading, error, refetch: fetch }
}
