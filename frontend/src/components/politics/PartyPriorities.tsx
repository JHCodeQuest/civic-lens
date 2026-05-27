"use client"

interface PartyPrioritiesProps {
  priorities: string[]
}

export default function PartyPriorities({ priorities }: PartyPrioritiesProps) {
  if (!priorities || priorities.length === 0) return null

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Priorities</h2>
      <ul className="space-y-2">
        {priorities.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-govuk-blue flex-shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
