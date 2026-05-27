"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import type { PartySummary } from "@/types/election"

interface SeatDistributionChartProps {
  parties: PartySummary[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{d.partyName}</p>
      <p className="text-gray-600 dark:text-gray-400">{d.seats} seats</p>
      {d.voteShare != null && (
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">{d.voteShare}% vote share</p>
      )}
    </div>
  )
}

export default function SeatDistributionChart({ parties }: SeatDistributionChartProps) {
  const data = [...parties]
    .filter((p) => p.seats > 0)
    .sort((a, b) => b.seats - a.seats)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-600 text-sm">
        No seat data available
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Seat Distribution</h3>
      <ResponsiveContainer width="100%" height={Math.max(180, data.length * 40)}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 36, left: 0, bottom: 4 }} barSize={22} barCategoryGap={6}>
          <CartesianGrid horizontal={false} vertical={true} strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} tickLine={false} />
          <YAxis
            type="category"
            dataKey="partyName"
            tick={{ fontSize: 12, fill: "#374151", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            width={110}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="seats" radius={[0, 4, 4, 0]}>
            {data.map((entry) => (
              <Cell key={entry.partyName} fill={entry.partyColour || "#6b7280"} />
            ))}
            <LabelList dataKey="seats" position="right" style={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
