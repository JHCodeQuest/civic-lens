import type { GlossaryEntry, GlossaryCategory } from "@/types/glossary"

const categoryLabels: Record<GlossaryCategory, string> = {
  parliament: "Parliament",
  elections: "Elections",
  government: "Government",
  voting: "Voting",
  parties: "Parties",
  other: "Other",
}

const categoryColors: Record<GlossaryCategory, string> = {
  parliament: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  elections: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  government: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  voting: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  parties: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
}

const difficultyLabel: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
}

interface GlossaryCardProps {
  entry: GlossaryEntry
}

export default function GlossaryCard({ entry }: GlossaryCardProps) {
  const { term, definition, category, difficulty, example, relatedTerms } = entry
  const slug = term.toLowerCase().replace(/\s+/g, "-")

  return (
    <article className="rounded-sm border border-govuk-border bg-white p-4 transition hover:border-l-govuk-blue sm:p-5 border-l-4 dark:border-govuk-border dark:bg-[#1a1a1a]" aria-labelledby={`glossary-${slug}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 id={`glossary-${slug}`} className="text-base font-semibold text-govuk-black dark:text-white">{term}</h3>
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${categoryColors[category]}`}>
          {categoryLabels[category]}
        </span>
        <span className="rounded bg-govuk-light-grey px-2 py-0.5 text-xs text-govuk-secondary-text dark:bg-white/10 dark:text-gray-400">
          {difficultyLabel[difficulty]}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-govuk-black dark:text-gray-300">{definition}</p>

      {example && (
        <p className="mt-2 text-sm italic text-govuk-secondary-text dark:text-gray-400">
          Example: {example}
        </p>
      )}

      {relatedTerms && relatedTerms.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {relatedTerms.map((related) => (
            <span
              key={related}
              className="rounded-sm bg-govuk-light-grey px-2 py-0.5 text-xs text-govuk-secondary-text dark:bg-white/10 dark:text-gray-400"
            >
              {related}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}
