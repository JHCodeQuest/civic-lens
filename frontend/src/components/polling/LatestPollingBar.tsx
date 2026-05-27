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
import type { PollDataPoint } from "@/types/poll"

interface LatestPollingBarProps {
  data: PollDataPoint[]
}

const PARTY_COLORS: Record<string, string> = {
  Labour: "#DC241f",
  Conservative: "#0087DC",
  "Liberal Democrat": "#FAA61A",
  "Green Party": "#02A95B",
  "Reform UK": "#12B6CF",
  SNP: "#FDF38E",
  "Plaid Cymru": "#008142",
}

function formatDate(d: string): string {
  const date = new Date(d + "T00:00:00")
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{d.partyName}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {d.percentage}% &middot; {formatDate(d.date)}
      </p>
      {d.sampleSize && (
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
          Sample: {d.sampleSize.toLocaleString()} &middot; {d.pollingCompany}
        </p>
      )}
    </div>
  )
}

export default function LatestPollingBar({ data }: LatestPollingBarProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 dark:text-gray-600 text-sm">
        No polling data available
      </div>
    )
  }

  const sorted = [...data].sort((a, b) => b.percentage - a.percentage)

  return (
    <ResponsiveContainer width="100%" height={Math.max(240, sorted.length * 36)}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 4, right: 48, left: 0, bottom: 4 }}
        barSize={24}
        barCategoryGap={8}
      >
        <CartesianGrid
          horizontal={false}
          vertical={true}
          strokeDasharray="3 3"
          stroke="#e5e7eb"
        />
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
        <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
          {sorted.map((entry) => (
            <Cell
              key={entry.partyId}
              fill={PARTY_COLORS[entry.partyName] || entry.partyColour || "#666"}
            />
          ))}
          <LabelList
            dataKey="percentage"
            position="right"
            formatter={(v: any) => `${v}%`}
            style={{ fontSize: 12, fill: "#6b7280", fontWeight: 500 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
