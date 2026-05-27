"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import ConstituencyResultChart from "@/components/constituency/ConstituencyResultChart"
import ElectionYearSelector from "@/components/constituency/ElectionYearSelector"
import { useConstituencyDetail } from "@/hooks/useConstituencyData"
import { formatNumber } from "@/lib/utils"

interface ConstituencyDetailViewProps {
  id: string
}

const PARTY_COLORS: Record<string, string> = {
  Labour: "#DC241f",
  Conservative: "#0087DC",
  "Liberal Democrat": "#FAA61A",
  "Green Party": "#02A95B",
  SNP: "#FDF38E",
  "Plaid Cymru": "#008142",
  "Reform UK": "#12B6CF",
  DUP: "#D46A4C",
  "Sinn Féin": "#326760",
  SDLP: "#2AA82C",
  UUP: "#48A5EE",
  Alliance: "#F6CB2F",
}

export default function ConstituencyDetailView({ id }: ConstituencyDetailViewProps) {
  const { constituency, results, prediction, loading, error, isDevData, refetch } = useConstituencyDetail(id)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  const availableYears = useMemo(() => {
    const y = new Set(results.map((r) => r.year))
    return [...y].sort()
  }, [results])

  const filteredResults = useMemo(() => {
    if (!selectedYear) return results
    return results.filter((r) => r.year === selectedYear)
  }, [results, selectedYear])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Back link */}
        <Link
          href="/constituencies"
          className="inline-flex items-center text-sm text-[#1d70b8] hover:text-[#003078] transition-colors"
        >
          &larr; Back to Constituency Explorer
        </Link>

        {/* DEV banner */}
        {isDevData && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            Constituency data shown for demonstration purposes
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
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
        {!loading && !error && constituency && (
          <>
            {/* Header */}
            <section>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {constituency.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {constituency.region}{constituency.country ? ` · ${constituency.country}` : ""}
                {constituency.electorate ? ` · Electorate: ${constituency.electorate}` : ""}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PARTY_COLORS[constituency.winner || ""] || "#6b7280" }}
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {constituency.winner || "Unknown"}
                  </span>
                </div>
                {constituency.majority != null && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Majority: {formatNumber(constituency.majority)}
                  </span>
                )}
              </div>
            </section>

            {/* Results Chart */}
            <section className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <ElectionYearSelector
                years={availableYears}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
              />
              <div className="mt-4">
                <ConstituencyResultChart results={filteredResults} />
              </div>
            </section>

            {/* Results Table */}
            <section className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full results {selectedYear ? `(${selectedYear})` : "(all years)"}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Party</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Year</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Votes</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Share</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600 dark:text-gray-400">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults
                      .sort((a, b) => b.year - a.year || (a.position ?? 99) - (b.position ?? 99))
                      .map((r, i) => (
                        <tr key={`${r.year}-${r.partyName}-${i}`} className="border-t border-gray-100 dark:border-gray-800">
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: r.partyColour || "#6b7280" }}
                              />
                              <span className="text-gray-900 dark:text-white">{r.partyName}</span>
                            </div>
                          </td>
                          <td className="text-right px-4 py-2 text-gray-500 dark:text-gray-400">{r.year}</td>
                          <td className="text-right px-4 py-2 text-gray-900 dark:text-white font-medium tabular-nums">
                            {formatNumber(r.votes)}
                          </td>
                          <td className="text-right px-4 py-2 text-gray-700 dark:text-gray-300 tabular-nums">
                            {r.share != null ? `${r.share}%` : "-"}
                          </td>
                          <td className="text-right px-4 py-2">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                              r.position === 1
                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                : "text-gray-500 dark:text-gray-400"
                            }`}>
                              {r.position}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Prediction */}
            {prediction && (
              <section className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Prediction</h2>
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PARTY_COLORS[prediction.predictedWinnerName] || "#6b7280" }}
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {prediction.predictedWinnerName} hold
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {prediction.confidence}% confidence
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Model: {prediction.modelUsed.replace(/_/g, " ")}
                  </span>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
