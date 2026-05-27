"use client"

interface PollingFiltersProps {
  selectedParties: string[]
  onPartiesChange: (parties: string[]) => void
  dateRange: "1M" | "3M" | "6M" | "ALL"
  onDateRangeChange: (range: "1M" | "3M" | "6M" | "ALL") => void
  allParties: string[]
}

const DATE_PRESETS = [
  { label: "1M", value: "1M" as const },
  { label: "3M", value: "3M" as const },
  { label: "6M", value: "6M" as const },
  { label: "All", value: "ALL" as const },
]

const PARTY_COLORS: Record<string, string> = {
  Labour: "#DC241f",
  Conservative: "#0087DC",
  "Liberal Democrat": "#FAA61A",
  "Green Party": "#02A95B",
  "Reform UK": "#12B6CF",
  SNP: "#FDF38E",
  "Plaid Cymru": "#008142",
}

const DEFAULT_PARTIES = ["Labour", "Conservative", "Liberal Democrat", "Green Party", "Reform UK", "SNP", "Plaid Cymru"]

export default function PollingFilters({
  selectedParties,
  onPartiesChange,
  dateRange,
  onDateRangeChange,
  allParties,
}: PollingFiltersProps) {
  const parties = allParties.length > 0 ? allParties : DEFAULT_PARTIES

  const toggleParty = (name: string) => {
    if (selectedParties.includes(name)) {
      if (selectedParties.length === 1) return
      onPartiesChange(selectedParties.filter((p) => p !== name))
    } else {
      onPartiesChange([...selectedParties, name])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Date range:
        </span>
        {DATE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onDateRangeChange(preset.value)}
            className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
              dateRange === preset.value
                ? "bg-[#1d70b8] text-white border-[#1d70b8]"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            {preset.label}
          </button>
        ))}

        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-4">
          Parties:
        </span>

        <button
          onClick={() => onPartiesChange(["Labour", "Conservative"])}
          className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors ${
            selectedParties.length === 2 &&
            selectedParties.includes("Labour") &&
            selectedParties.includes("Conservative")
              ? "bg-gray-200 dark:bg-gray-600 border-gray-400 dark:border-gray-500"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Main parties
        </button>

        <button
          onClick={() => onPartiesChange([...parties])}
          className={`px-2.5 py-1.5 text-xs rounded-md border transition-colors ${
            selectedParties.length === parties.length
              ? "bg-gray-200 dark:bg-gray-600 border-gray-400 dark:border-gray-500"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          All parties
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {parties.map((name) => {
          const isSelected = selectedParties.includes(name)
          const color = PARTY_COLORS[name] || "#666"
          return (
            <button
              key={name}
              onClick={() => toggleParty(name)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isSelected
                  ? "text-white border-transparent"
                  : "text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={{
                backgroundColor: isSelected ? color : undefined,
              }}
            >
              <span
                className={`w-2 h-2 rounded-full ${isSelected ? "bg-white/80" : ""}`}
                style={{ backgroundColor: isSelected ? undefined : color }}
              />
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
