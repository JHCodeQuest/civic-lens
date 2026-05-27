"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"
import type { ElectionResultItem } from "@/types/constituency"

interface ConstituencyResultChartProps {
  results: ElectionResultItem[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{d.partyName}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {d.share != null ? `${d.share}%` : `${d.votes.toLocaleString()} votes`}
      </p>
      <p className="text-gray-500 dark:text-gray-500 text-xs mt-0.5">
        {d.votes.toLocaleString()} votes &middot; {d.position === 1 ? "Winner" : `#${d.position}`}
      </p>
    </div>
  )
}

export default function ConstituencyResultChart({ results }: ConstituencyResultChartProps) {
  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-600 text-sm">
        No results available
      </div>
    )
  }

  const data = [...results]
    .sort((a, b) => (b.share ?? 0) - (a.share ?? 0))
    .filter((r) => r.share != null && r.share > 0)

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 32)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 4, right: 48, left: 0, bottom: 4 }}
        barSize={20}
        barCategoryGap={6}
      >
        <CartesianGrid
          horizontal={false}
          vertical={true}
          strokeDasharray="3 3"
          stroke="#e5e7eb"
        />
        <XAxis
          type="number"
          domain={[0, 60]}
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
          width={100}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="share" radius={[0, 4, 4, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.partyId || entry.partyName}
              fill={entry.partyColour || "#6b7280"}
            />
          ))}
          <LabelList
            dataKey="share"
            position="right"
            formatter={(v: any) => `${v}%`}
            style={{ fontSize: 11, fill: "#6b7280", fontWeight: 500 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
