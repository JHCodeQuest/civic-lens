import Link from "next/link"
import type { ConstituencyDetail } from "@/types/constituency"
import { formatNumber } from "@/lib/utils"

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

interface ConstituencyCardProps {
  constituency: ConstituencyDetail
}

export default function ConstituencyCard({ constituency }: ConstituencyCardProps) {
  const winner = constituency.winner || "Unknown"
  const colour = PARTY_COLORS[winner] || "#6b7280"
  const isSinnFein = winner === "Sinn Féin"
  const isSNP = winner === "SNP"

  return (
    <Link
      href={`/constituencies/${constituency.id}`}
      className="block bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:border-[#1d70b8] hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-3">
        <span
          className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ring-1 ring-gray-300 dark:ring-gray-600"
          style={{ backgroundColor: colour }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {constituency.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {constituency.region}{constituency.country ? ` · ${constituency.country}` : ""}
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-medium text-white"
              style={{ backgroundColor: colour }}
            >
              {isSNP ? "SNP" : winner}
            </span>
            {constituency.majority != null && (
              <span className="text-gray-500 dark:text-gray-400">
                Maj: {formatNumber(constituency.majority)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
