"use client"

interface ConstituencyFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  region: string | null
  onRegionChange: (r: string | null) => void
  country: string | null
  onCountryChange: (c: string | null) => void
  regions: string[]
  totalCount: number
  filteredCount: number
}

const COUNTRIES = [
  { value: null, label: "All countries" },
  { value: "England", label: "England" },
  { value: "Scotland", label: "Scotland" },
  { value: "Wales", label: "Wales" },
  { value: "Northern Ireland", label: "Northern Ireland" },
]

export default function ConstituencyFilters({
  search, onSearchChange,
  region, onRegionChange,
  country, onCountryChange,
  regions, totalCount, filteredCount,
}: ConstituencyFiltersProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="sr-only" htmlFor="const-search">Search constituencies</label>
          <input
            id="const-search"
            type="text"
            placeholder="Search constituencies..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d70b8] focus:border-transparent"
          />
        </div>

        <select
          value={country || ""}
          onChange={(e) => onCountryChange(e.target.value || null)}
          className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1d70b8]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.label} value={c.value || ""}>{c.label}</option>
          ))}
        </select>

        <select
          value={region || ""}
          onChange={(e) => onRegionChange(e.target.value || null)}
          className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1d70b8]"
        >
          <option value="">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Showing {filteredCount} of {totalCount} constituencies
      </p>
    </div>
  )
}
