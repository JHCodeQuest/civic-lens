"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { PollDataPoint } from "@/types/poll"

interface PollingTrendChartProps {
  data: PollDataPoint[]
  selectedParties: string[]
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

function formatDateShort(d: string): string {
  const date = new Date(d + "T00:00:00")
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  return `${day}-${month}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
        {formatDate(label)}
      </p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 py-0.5">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 dark:text-gray-400">{entry.name}:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {entry.value}%
          </span>
        </div>
      ))}
    </div>
  )
}

export default function PollingTrendChart({
  data,
  selectedParties,
}: PollingTrendChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-400 dark:text-gray-600 text-sm">
        No polling data available for the selected filters
      </div>
    )
  }

  const dates = [...new Set(data.map((d) => d.date))].sort()
  const visibleParties = selectedParties.filter(
    (p) => data.some((d) => d.partyName === p),
  )

  const chartData = dates.map((date) => {
    const point: Record<string, any> = { date }
    for (const party of visibleParties) {
      const entry = data.find((d) => d.date === date && d.partyName === party)
      point[party] = entry?.percentage ?? null
    }
    return point
  })

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDateShort}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#d1d5db" }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={[0, 50]}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={{ stroke: "#d1d5db" }}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          iconType="circle"
          iconSize={8}
        />
        {visibleParties.map((party) => (
          <Line
            key={party}
            type="monotone"
            dataKey={party}
            stroke={PARTY_COLORS[party] || "#666"}
            strokeWidth={party === "Labour" || party === "Conservative" ? 2.5 : 1.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 1 }}
            connectNulls
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
