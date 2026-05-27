"use client"

import { useState, useEffect, useMemo } from "react"
import { search, type SearchItem } from "@/lib/search"

export interface GroupedResults {
  glossary: SearchItem[]
  party: SearchItem[]
  constituency: SearchItem[]
  learn: SearchItem[]
  election: SearchItem[]
}

const emptyGroup: GroupedResults = {
  glossary: [],
  party: [],
  constituency: [],
  learn: [],
  election: [],
}

export function useGlobalSearch(query: string, debounceMs = 200) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), debounceMs)
    return () => clearTimeout(timer)
  }, [query, debounceMs])

  const results = useMemo(() => search(debouncedQuery), [debouncedQuery])

  const grouped = useMemo<GroupedResults>(() => {
    if (results.length === 0) return emptyGroup
    const g: GroupedResults = {
      glossary: [],
      party: [],
      constituency: [],
      learn: [],
      election: [],
    }
    for (const item of results) {
      g[item.type].push(item)
    }
    return g
  }, [results])

  return {
    results,
    grouped,
    totalCount: results.length,
    debouncedQuery,
  }
}
