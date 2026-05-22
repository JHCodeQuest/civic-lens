import { PARTY_COLORS } from "@/lib/constants"

interface PartyCardProps {
  name: string
  leader: string
  ideology: string
  description: string
}

export default function PartyCard({ name, leader, ideology, description }: PartyCardProps) {
  return (
    <div className="rounded-sm border border-govuk-border bg-white p-5 transition hover:border-govuk-blue">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-govuk-black">
        <span
          className="inline-block h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: PARTY_COLORS[name] ?? "#999" }}
        />
        {name}
      </h3>
      <p className="mb-2 text-sm text-gray-600">
        <strong>Leader:</strong> {leader} &middot; <strong>Ideology:</strong> {ideology}
      </p>
      <p className="text-sm leading-relaxed text-gray-700">{description}</p>
    </div>
  )
}
