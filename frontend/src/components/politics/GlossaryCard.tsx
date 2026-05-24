interface GlossaryCardProps {
  term: string
  definition: string
}

export default function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div className="rounded-sm border border-govuk-border bg-white p-4 transition hover:border-l-govuk-blue sm:p-5 border-l-4">
      <h3 className="mb-2 text-base font-semibold text-govuk-black">{term}</h3>
      <p className="text-sm leading-relaxed text-govuk-black">{definition}</p>
    </div>
  )
}
