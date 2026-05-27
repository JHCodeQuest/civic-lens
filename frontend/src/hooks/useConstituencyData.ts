"use client"

import { useState, useEffect, useCallback } from "react"
import type { ConstituencyDetail, ElectionResultItem, PredictionResult } from "@/types/constituency"
import { getConstituencies, getConstituency, getConstituencyResults, getConstituencyPrediction } from "@/services/politics-api"
import { getDevConstituencies, getDevConstituency, IS_DEV_DATA } from "@/data/constituencies"

interface UseConstituencyListResult {
  data: ConstituencyDetail[]
  loading: boolean
  error: string | null
  isDevData: boolean
  refetch: () => void
}

export function useConstituencyList(): UseConstituencyListResult {
  const [data, setData] = useState<ConstituencyDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getConstituencies()
      setData(result)
    } catch {
      if (IS_DEV_DATA) {
        setData(getDevConstituencies() as unknown as ConstituencyDetail[])
      } else {
        setError("Unable to load constituency data")
        setData([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, isDevData: IS_DEV_DATA, refetch: fetch }
}

interface UseConstituencyDetailResult {
  constituency: ConstituencyDetail | null
  results: ElectionResultItem[]
  prediction: PredictionResult | null
  loading: boolean
  error: string | null
  isDevData: boolean
  refetch: () => void
}

export function useConstituencyDetail(id: string): UseConstituencyDetailResult {
  const [constituency, setConstituency] = useState<ConstituencyDetail | null>(null)
  const [results, setResults] = useState<ElectionResultItem[]>([])
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [c, r, p] = await Promise.all([
        getConstituency(id),
        getConstituencyResults(id),
        getConstituencyPrediction(id).catch(() => null),
      ])
      setConstituency(c)
      setResults(r)
      setPrediction(p)
    } catch {
      if (IS_DEV_DATA) {
        const dev = getDevConstituency(id)
        if (dev) {
          setConstituency({
            id: dev.id, name: dev.name, region: dev.region, country: dev.country,
            winner: dev.winner2024, winningPartyId: "", majority: dev.majority2024,
            electorate: null, createdAt: "", updatedAt: "",
          })
          setResults([...dev.results2024, ...dev.results2019])
          setPrediction(dev.prediction)
        } else {
          setError("Constituency not found")
        }
      } else {
        setError("Unable to load constituency details")
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetch() }, [fetch])

  return { constituency, results, prediction, loading, error, isDevData: IS_DEV_DATA, refetch: fetch }
}
