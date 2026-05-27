"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import type { PartyHistoryItem } from "@/types/party"

interface PartyElectionHistoryProps {
  history: PartyHistoryItem[]
  partyColor: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{d.year}</p>
      <p className="text-gray-600 dark:text-gray-400">{d.seats} seats</p>
      {d.voteShare != null && <p className="text-gray-500 dark:text-gray-500 text-xs">{d.voteShare}% vote share</p>}
      <p className="text-gray-500 dark:text-gray-500 text-xs">{d.totalVotes.toLocaleString()} total votes</p>
    </div>
  )
}

export default function PartyElectionHistory({ history, partyColor }: PartyElectionHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Election History</h2>
        <p className="text-sm text-gray-400 dark:text-gray-600">No election history data available.</p>
      </div>
    )
  }

  const data = [...history].sort((a, b) => a.year - b.year)

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Election History</h2>
      <ResponsiveContainer width="100%" height={Math.max(180, data.length * 60)}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 40, left: 0, bottom: 4 }} barSize={28} barCategoryGap={10}>
          <CartesianGrid horizontal={false} vertical={true} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} tickLine={false} />
          <YAxis
            type="category"
            dataKey="year"
            tick={{ fontSize: 13, fill: "#374151", fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            width={40}
            tickFormatter={(v) => String(v)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="seats" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.year} fill={partyColor} />
            ))}
            <LabelList dataKey="seats" position="right" style={{ fontSize: 12, fill: "#6b7280", fontWeight: 600 }} formatter={(v: any) => `${v} seats`} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
