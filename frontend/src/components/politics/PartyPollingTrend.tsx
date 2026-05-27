"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { usePollingData } from "@/hooks/usePollingData"
import { PARTY_COLORS } from "@/lib/constants"

interface PartyPollingTrendProps {
  partyName: string
}

function formatDate(d: string) {
  const parts = d.split("-")
  return `${parts[2]}-${parts[1]}-${parts[0]}`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">{formatDate(label)}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-gray-600 dark:text-gray-400">
          <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: entry.color }} />
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

export default function PartyPollingTrend({ partyName }: PartyPollingTrendProps) {
  const { trendData, loading, error } = usePollingData()

  if (loading) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Polling Trend</h2>
        <div className="flex items-center justify-center h-32 text-xs text-gray-400">Loading...</div>
      </div>
    )
  }

  if (error) {
    return null
  }

  const color = PARTY_COLORS[partyName] || "#6b7280"

  const data = trendData
    .filter((d) => d.partyName === partyName)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((d) => ({
      date: d.date,
      percentage: d.percentage,
    }))

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Polling Trend</h2>
        <p className="text-sm text-gray-400 dark:text-gray-600">No polling data available for this party.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Polling Trend</h2>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
            tickFormatter={(v) => formatDate(v)}
          />
          <YAxis
            domain={[0, "auto"]}
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="percentage"
            name={partyName}
            stroke={color}
            strokeWidth={2}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
