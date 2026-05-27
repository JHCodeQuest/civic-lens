"use client"

import type { PartyConstituencyItem } from "@/types/party"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"

interface PartyConstituenciesProps {
  constituencies: PartyConstituencyItem[]
}

export default function PartyConstituencies({ constituencies }: PartyConstituenciesProps) {
  if (constituencies.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Constituencies Won</h2>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          This party did not win any constituencies in the most recent election.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Constituencies Won ({constituencies.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 pr-4 text-gray-600 dark:text-gray-400 font-medium">Constituency</th>
              <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">Region</th>
              <th className="text-right py-2 pl-4 text-gray-600 dark:text-gray-400 font-medium">Majority</th>
            </tr>
          </thead>
          <tbody>
            {constituencies.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                <td className="py-2 pr-4">
                  <Link href={`/constituencies/${c.id}`} className="text-govuk-blue hover:underline font-medium">
                    {c.name}
                  </Link>
                </td>
                <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{c.region}</td>
                <td className="py-2 pl-4 text-right tabular-nums text-gray-900 dark:text-gray-100">
                  {c.majority != null ? formatNumber(c.majority) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
