"use client"

import { useState, useMemo } from "react"
import PollingTrendChart from "@/components/polling/PollingTrendChart"
import LatestPollingBar from "@/components/polling/LatestPollingBar"
import PollingFilters from "@/components/polling/PollingFilters"
import { usePollingData } from "@/hooks/usePollingData"
import type { PollDataPoint } from "@/types/poll"

function getDateRange(range: "1M" | "3M" | "6M" | "ALL"): { start: string; end: string } | null {
  if (range === "ALL") return null
  const end = new Date()
  const start = new Date()
  const months = { "1M": 1, "3M": 3, "6M": 6 }[range]
  start.setMonth(start.getMonth() - months)
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

export default function PollingPage() {
  const [selectedParties, setSelectedParties] = useState<string[]>([
    "Labour",
    "Conservative",
  ])
  const [dateRange, setDateRange] = useState<"1M" | "3M" | "6M" | "ALL">("6M")

  const range = getDateRange(dateRange)
  const { trendData, latestData, loading, error, refetch } = usePollingData(range ?? undefined)

  const allParties = useMemo(() => {
    const names = new Set<string>()
    for (const d of trendData) names.add(d.partyName)
    return [...names].sort()
  }, [trendData])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Hero */}
        <section>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Polling &amp; Opinion Polls
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Opinion polls measure public support for political parties between elections.
            They are conducted by polling companies who interview a representative sample
            of the public and ask how they would vote. While polls give a useful snapshot
            of public opinion, they have a margin of error and can vary between companies.
          </p>
        </section>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse space-y-4 w-full max-w-lg">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mx-auto" />
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-16 space-y-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 text-sm bg-[#1d70b8] text-white rounded-md hover:bg-[#1a5fa0] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Latest Bar Chart */}
        {!loading && !error && (
          <section className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Latest National Polling
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Most recent poll figures for each party
            </p>
            <LatestPollingBar data={latestData} />
          </section>
        )}

        {/* Trend Chart */}
        {!loading && !error && (
          <section className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Polling Trends Over Time
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Track how public support has changed. Select parties to compare.
            </p>

            <PollingFilters
              selectedParties={selectedParties}
              onPartiesChange={setSelectedParties}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              allParties={allParties}
            />

            <div className="mt-6">
              <PollingTrendChart
                data={trendData}
                selectedParties={selectedParties}
              />
            </div>
          </section>
        )}

        {/* Methodology */}
        {!loading && !error && (
          <section className="text-sm text-gray-500 dark:text-gray-500 space-y-2 border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">
              About the data
            </h3>
            <p>
              Polling data is aggregated from multiple sources including YouGov,
              Ipsos, Opinium, Savanta, and Redfield &amp; Wilton. Each poll has a
              sample size and margin of error. Figures shown are voting intention
              among all adults (excluding don&apos;t knows and won&apos;t votes
              unless otherwise stated).
            </p>
            <p>
              Data is updated regularly as new polls are published. Historical
              trends help show the direction of public opinion but should not be
              taken as predictions of election outcomes.
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
