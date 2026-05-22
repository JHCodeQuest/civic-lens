interface GlossaryCardProps {
  term: string
  definition: string
}

export default function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-5 transition hover:border-gray-900 hover:shadow-md">
      <h3 className="mb-2 text-base font-semibold">{term}</h3>
      <p className="text-sm leading-relaxed text-gray-700">{definition}</p>
    </div>
  )
}
