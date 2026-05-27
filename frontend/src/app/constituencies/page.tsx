"use client"

import { useState, useMemo } from "react"
import ConstituencyMap from "@/components/constituency/ConstituencyMap"
import ConstituencyCard from "@/components/constituency/ConstituencyCard"
import ConstituencyFilters from "@/components/constituency/ConstituencyFilters"
import { useConstituencyList } from "@/hooks/useConstituencyData"

export default function ConstituenciesPage() {
  const { data: constituencies, loading, error, isDevData, refetch } = useConstituencyList()

  const [search, setSearch] = useState("")
  const [region, setRegion] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [mapRegion, setMapRegion] = useState<string | null>(null)

  const regions = useMemo(() => {
    const r = new Set(constituencies.map((c) => c.region))
    return [...r].sort()
  }, [constituencies])

  const filtered = useMemo(() => {
    const activeRegion = mapRegion || region
    return constituencies.filter((c) => {
      if (search) {
        const q = search.toLowerCase()
        if (!c.name.toLowerCase().includes(q)) return false
      }
      if (activeRegion && c.region !== activeRegion) return false
      if (country && c.country !== country) return false
      return true
    })
  }, [constituencies, search, region, country, mapRegion])

  const handleRegionChange = (r: string | null) => {
    setRegion(r)
    setMapRegion(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Constituency Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Browse all UK constituencies to see election results, party performance,
            and historical voting data. Use the map to explore by region.
          </p>
        </section>

        {/* DEV banner */}
        {isDevData && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            Constituency data shown for demonstration purposes
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16 space-y-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
            <button onClick={refetch} className="px-4 py-2 text-sm bg-[#1d70b8] text-white rounded-md hover:bg-[#1a5fa0] transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ConstituencyFilters
                  search={search}
                  onSearchChange={setSearch}
                  region={region}
                  onRegionChange={handleRegionChange}
                  country={country}
                  onCountryChange={setCountry}
                  regions={regions}
                  totalCount={constituencies.length}
                  filteredCount={filtered.length}
                />
              </div>
              <div>
                <ConstituencyMap
                  constituencies={constituencies}
                  selectedRegion={mapRegion || region}
                  onRegionSelect={(r) => {
                    setMapRegion(r)
                    setRegion(null)
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((c) => (
                <ConstituencyCard key={c.id} constituency={c} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600 text-sm">
                No constituencies match your search criteria
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
