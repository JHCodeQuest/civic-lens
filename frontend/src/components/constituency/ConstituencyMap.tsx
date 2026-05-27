"use client"

import { UK_REGIONS } from "@/data/uk-regions"
import type { ConstituencyDetail } from "@/types/constituency"

interface ConstituencyMapProps {
  constituencies: ConstituencyDetail[]
  selectedRegion: string | null
  onRegionSelect: (region: string | null) => void
}

const PARTY_COLORS: Record<string, string> = {
  Labour: "#DC241f",
  Conservative: "#0087DC",
  "Liberal Democrat": "#FAA61A",
  "Green Party": "#02A95B",
  SNP: "#FDF38E",
  "Plaid Cymru": "#008142",
  "Reform UK": "#12B6CF",
  DUP: "#D46A4C",
  "Sinn Féin": "#326760",
  SDLP: "#2AA82C",
  UUP: "#48A5EE",
  Alliance: "#F6CB2F",
}

function getRegionWinner(region: string, constituencies: ConstituencyDetail[]): string | null {
  const seats = constituencies.filter((c) => c.region === region)
  if (seats.length === 0) return null
  const counts: Record<string, number> = {}
  for (const s of seats) {
    const w = s.winner || "Unknown"
    counts[w] = (counts[w] || 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export default function ConstituencyMap({ constituencies, selectedRegion, onRegionSelect }: ConstituencyMapProps) {
  const viewBox = "0 0 400 400"

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        UK Regions
        {selectedRegion && (
          <button
            onClick={() => onRegionSelect(null)}
            className="ml-2 text-xs text-[#1d70b8] hover:underline"
          >
            Clear filter
          </button>
        )}
      </h3>
      <svg
        viewBox={viewBox}
        className="w-full max-w-md mx-auto"
        role="img"
        aria-label="UK regions map"
      >
        {UK_REGIONS.map((region) => {
          const winner = getRegionWinner(region.id, constituencies)
          const fillColor = winner ? PARTY_COLORS[winner] || "#ccc" : "#e5e7eb"
          const isSelected = selectedRegion === region.id
          const hasSeats = constituencies.some((c) => c.region === region.id)

          return (
            <g key={region.id}>
              <path
                d={region.path}
                fill={isSelected ? fillColor : hasSeats ? fillColor : "#f3f4f6"}
                stroke={isSelected ? "#1d70b8" : "#d1d5db"}
                strokeWidth={isSelected ? 2.5 : 1}
                className="transition-all cursor-pointer hover:opacity-80"
                onClick={() => onRegionSelect(isSelected ? null : region.id)}
              />
              <text
                x={region.cx}
                y={region.cy}
                textAnchor="middle"
                fontSize="8"
                fill={isSelected ? "white" : "#6b7280"}
                className="pointer-events-none select-none"
                style={{ fontWeight: isSelected ? 600 : 400 }}
              >
                {region.label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {Object.entries(PARTY_COLORS).slice(0, 7).map(([party, color]) => (
          <span key={party} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
            {party}
          </span>
        ))}
      </div>
    </div>
  )
}
