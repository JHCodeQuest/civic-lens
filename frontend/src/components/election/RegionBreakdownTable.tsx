"use client"

import type { RegionSummary } from "@/types/election"

interface RegionBreakdownTableProps {
  regions: RegionSummary[]
}

export default function RegionBreakdownTable({ regions }: RegionBreakdownTableProps) {
  if (regions.length === 0) {
    return (
      <div className="text-center text-sm text-gray-400 dark:text-gray-600 py-8">
        No region data available
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 p-4 pb-0">Region Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Region</th>
              <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Winning Party</th>
              <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Seats Won</th>
              <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">Total Seats</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((r) => (
              <tr key={r.region} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                <td className="py-2.5 px-4 font-medium text-gray-900 dark:text-gray-100">{r.region}</td>
                <td className="py-2.5 px-4">
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                      style={{ backgroundColor: r.winningPartyColour || "#ccc" }}
                    />
                    <span className="text-gray-900 dark:text-gray-100">{r.winningParty}</span>
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">
                  {r.seats}
                </td>
                <td className="py-2.5 px-4 text-right tabular-nums text-gray-600 dark:text-gray-400">
                  {r.totalConstituencies}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
