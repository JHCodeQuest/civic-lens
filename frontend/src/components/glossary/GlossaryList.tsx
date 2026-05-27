import type { GlossaryEntry } from "@/types/glossary"
import GlossaryCard from "./GlossaryCard"

interface GlossaryListProps {
  entries: GlossaryEntry[]
}

export default function GlossaryList({ entries }: GlossaryListProps) {
  if (entries.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-govuk-border p-12 text-center dark:border-govuk-border">
        <p className="text-govuk-secondary-text dark:text-gray-400">
          No terms match your search. Try a different keyword.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <GlossaryCard key={entry.term} entry={entry} />
      ))}
    </div>
  )
}
