"use client"

import { UK_REGIONS } from "@/data/uk-regions"
import type { RegionSummary } from "@/types/election"
import { PARTY_COLORS } from "@/lib/constants"

interface ElectionMapProps {
  regions: RegionSummary[]
}

export default function ElectionMap({ regions }: ElectionMapProps) {
  const regionMap = new Map(regions.map((r) => [r.region, r]))
  const viewBox = "0 0 400 400"

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">UK Regions by Winner</h3>
      <svg viewBox={viewBox} className="w-full max-w-md mx-auto" role="img" aria-label="UK regions map by winning party">
        {UK_REGIONS.map((region) => {
          const r = regionMap.get(region.id)
          const fillColor = r?.winningPartyColour || PARTY_COLORS[r?.winningParty || ""] || "#e5e7eb"
          const hasData = !!r

          return (
            <g key={region.id}>
              <path
                d={region.path}
                fill={hasData ? fillColor : "#f3f4f6"}
                stroke="#d1d5db"
                strokeWidth={1}
                className="transition-all hover:opacity-80"
              />
              <text
                x={region.cx}
                y={region.cy}
                textAnchor="middle"
                fontSize="8"
                fill={hasData ? "white" : "#9ca3af"}
                className="pointer-events-none select-none"
                style={{ fontWeight: 600, textShadow: hasData ? "0 1px 2px rgba(0,0,0,0.3)" : "none" }}
              >
                {region.label}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {Array.from(new Set(regions.map((r) => r.winningParty))).map((party) => (
          <span key={party} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: PARTY_COLORS[party] || "#ccc" }} />
            {party}
          </span>
        ))}
      </div>
    </div>
  )
}
