"use client"

interface ElectionYearSelectorProps {
  selectedYear: number
  onChange: (year: number) => void
}

export default function ElectionYearSelector({ selectedYear, onChange }: ElectionYearSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="election-year" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Election year:
      </label>
      <select
        id="election-year"
        value={selectedYear}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1d70b8]"
      >
        <option value={2024}>2024</option>
        <option value={2019}>2019</option>
      </select>
    </div>
  )
}
