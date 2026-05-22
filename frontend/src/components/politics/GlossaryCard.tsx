interface GlossaryCardProps {
  term: string
  definition: string
}

export default function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div className="rounded-sm border border-govuk-border bg-white p-5 transition hover:border-govuk-blue">
      <h3 className="mb-2 text-base font-semibold text-govuk-black">{term}</h3>
      <p className="text-sm leading-relaxed text-gray-700">{definition}</p>
    </div>
  )
}
