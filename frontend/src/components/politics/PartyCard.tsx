import type { Party } from "@/types/party"
import { slugify } from "@/lib/utils"

interface PartyCardProps {
  party: Party
  showRegion?: boolean
}

export default function PartyCard({ party, showRegion = false }: PartyCardProps) {
  const { name, leader, position, summary, region, priorities, founded, color } = party
  const slug = slugify(name)

  return (
    <article
      id={slug}
      className="rounded-sm border border-govuk-border bg-white p-4 transition hover:border-l-govuk-blue sm:p-5 border-l-4 dark:border-govuk-border dark:bg-[#1a1a1a]"
      aria-labelledby={`${slug}-name`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          id={`${slug}-name`}
          className="flex items-center gap-2 text-lg font-semibold text-govuk-black dark:text-white"
        >
          <span
            className="inline-block h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {name}
        </h3>

        {showRegion && (
          <span className="shrink-0 rounded-sm bg-govuk-light-grey px-2 py-0.5 text-xs text-govuk-secondary-text dark:bg-white/10 dark:text-gray-400">
            {region}
          </span>
        )}
      </div>

      <div className="mb-3 space-y-1 text-sm text-govuk-secondary-text dark:text-gray-400">
        <p>
          <span className="font-medium text-govuk-black dark:text-white">Leader:</span> {leader}
        </p>
        <p>
          <span className="font-medium text-govuk-black dark:text-white">Position:</span> {position}
        </p>
        <p>
          <span className="font-medium text-govuk-black dark:text-white">Founded:</span> {founded}
        </p>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-govuk-black dark:text-gray-300">
        {summary}
      </p>

      <div>
        <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-govuk-secondary-text dark:text-gray-400">
          Key priorities
        </p>
        <ul className="list-inside list-disc space-y-0.5 text-sm text-govuk-black dark:text-gray-300">
          {priorities.map((priority) => (
            <li key={priority}>{priority}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}
