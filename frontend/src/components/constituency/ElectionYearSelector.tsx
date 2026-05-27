"use client"

interface ElectionYearSelectorProps {
  years: number[]
  selectedYear: number | null
  onYearChange: (year: number | null) => void
}

export default function ElectionYearSelector({
  years,
  selectedYear,
  onYearChange,
}: ElectionYearSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Election results:
      </span>
      <div className="flex gap-1">
        {years.sort((a, b) => b - a).map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year === selectedYear ? null : year)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              selectedYear === year
                ? "bg-[#1d70b8] text-white border-[#1d70b8]"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  )
}
