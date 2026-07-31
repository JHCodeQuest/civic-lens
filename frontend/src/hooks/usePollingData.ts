"use client"

import { useState, useEffect, useCallback } from "react"
import type { PollDataPoint } from "@/types/poll"
import { getPollingTrend, getLatestPolling } from "@/services/politics-api"
import { getDevPollingTrend, getDevLatestPolling, IS_DEV_DATA } from "@/data/polling"

interface UsePollingDataResult {
  trendData: PollDataPoint[]
  latestData: PollDataPoint[]
  loading: boolean
  error: string | null
  isDevData: boolean
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
  // True only when the static fallback was actually used.
  const [isDevData, setIsDevData] = useState(false)

  const { start, end } = range || getDefaultRange()

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [trend, latest] = await Promise.all([
        getPollingTrend({ start, end }),
        getLatestPolling(),
      ])
      setTrendData(trend)
      setLatestData(latest)
      setIsDevData(false)
    } catch {
      if (IS_DEV_DATA) {
        setTrendData(getDevPollingTrend({ start, end }))
        setLatestData(getDevLatestPolling())
        setIsDevData(true)
      } else {
        setError("Polling data unavailable. Start the backend API to see live data.")
        setTrendData([])
        setLatestData([])
      }
    } finally {
      setLoading(false)
    }
  }, [start, end])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { trendData, latestData, loading, error, isDevData, refetch: fetch }
}
