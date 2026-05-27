"use client"

import type { NationalSummary } from "@/types/election"
import { formatNumber } from "@/lib/utils"

interface NationalResultCardsProps {
  summary: NationalSummary
}

export default function NationalResultCards({ summary }: NationalResultCardsProps) {
  const needed = Math.floor(summary.totalSeats / 2) + 1

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card label="Total Seats" value={formatNumber(summary.totalSeats)} />
      <Card
        label="Majority Party"
        value={summary.majorityParty || "Hung Parliament"}
        sub={summary.majorityParty ? `${summary.majoritySeats} seats (need ${needed})` : `No party reached ${needed} seats`}
        color={summary.majorityParty ? "text-govuk-blue" : "text-amber-600 dark:text-amber-400"}
      />
      <Card
        label="Seats for Majority"
        value={formatNumber(needed)}
        sub={`out of ${formatNumber(summary.totalSeats)}`}
      />
      <Card
        label="Parties Winning Seats"
        value={formatNumber(summary.parties.filter((p) => p.seats > 0).length)}
        sub={`of ${summary.parties.length}`}
      />

      <div className="sm:col-span-2 lg:col-span-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Party Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-4 text-gray-600 dark:text-gray-400 font-medium">Party</th>
                <th className="text-right py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">Seats</th>
                <th className="text-right py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">Vote Share</th>
                <th className="text-right py-2 pl-4 text-gray-600 dark:text-gray-400 font-medium">Seat Change</th>
              </tr>
            </thead>
            <tbody>
              {summary.parties.filter((p) => p.seats > 0 || (p.voteShare ?? 0) > 1).map((party) => (
                <tr key={party.partyName} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: party.partyColour || "#ccc" }}
                      />
                      <span className="font-medium text-gray-900 dark:text-gray-100">{party.partyName}</span>
                    </span>
                  </td>
                  <td className="text-right py-2 px-4 tabular-nums text-gray-900 dark:text-gray-100 font-medium">
                    {party.seats}
                  </td>
                  <td className="text-right py-2 px-4 tabular-nums text-gray-600 dark:text-gray-400">
                    {party.voteShare != null ? `${party.voteShare}%` : "-"}
                  </td>
                  <td className="text-right py-2 pl-4 tabular-nums">
                    {party.change != null ? (
                      <span className={party.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                        {party.change >= 0 ? "+" : ""}{party.change}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Card({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color || "text-gray-900 dark:text-gray-100"}`}>{value}</p>
      {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}
