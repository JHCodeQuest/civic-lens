"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, Legend } from "recharts"
import type { NationalSummary } from "@/types/election"

interface VoteShareComparisonProps {
  current: NationalSummary
  previous: NationalSummary | null
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-gray-600 dark:text-gray-400">
          {entry.name}: {entry.value}%
        </p>
      ))}
      {d.delta != null && (
        <p className={`text-xs mt-1 ${d.delta >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          Change: {d.delta >= 0 ? "+" : ""}{d.delta}pp
        </p>
      )}
    </div>
  )
}

export default function VoteShareComparison({ current, previous }: VoteShareComparisonProps) {
  const prevMap = new Map(previous?.parties.map((p) => [p.partyName, p.voteShare]) || [])

  const currentParties = current.parties.filter((p) => (p.voteShare ?? 0) > 1)

  const data = currentParties.map((p) => ({
    partyName: p.partyName,
    colour: p.partyColour || "#6b7280",
    current: p.voteShare ?? 0,
    previous: prevMap.get(p.partyName) ?? 0,
    delta: p.voteShare != null && prevMap.has(p.partyName)
      ? Math.round((p.voteShare - (prevMap.get(p.partyName) ?? 0)) * 10) / 10
      : null,
  }))

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-600 text-sm">
        No vote share data available
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Vote Share Comparison
      </h3>
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 50)}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, left: 0, bottom: 4 }} barSize={12} barCategoryGap={8}>
          <CartesianGrid horizontal={false} vertical={true} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            domain={[0, 50]}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="partyName"
            tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={24}
            iconType="square"
            formatter={(value: string) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
          />
          {previous && (
            <Bar dataKey="previous" name={`${previous.year}`} radius={[0, 2, 2, 0]} opacity={0.5}>
              {data.map((entry) => (
                <Cell key={`prev-${entry.partyName}`} fill={entry.colour} />
              ))}
            </Bar>
          )}
          <Bar dataKey="current" name={`${current.year}`} radius={[0, 3, 3, 0]}>
            {data.map((entry) => (
              <Cell key={`curr-${entry.partyName}`} fill={entry.colour} />
            ))}
            <LabelList
              dataKey="current"
              position="right"
              formatter={(v: any) => `${v}%`}
              style={{ fontSize: 10, fill: "#6b7280", fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
