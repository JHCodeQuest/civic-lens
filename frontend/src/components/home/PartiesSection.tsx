import Link from "next/link"
import { PARTY_COLORS } from "@/lib/constants"
import { slugify } from "@/lib/utils"

const featuredParties = [
  { name: "Labour", color: PARTY_COLORS.Labour },
  { name: "Conservative", color: PARTY_COLORS.Conservative },
  { name: "Liberal Democrat", color: PARTY_COLORS["Liberal Democrat"] },
  { name: "SNP", color: PARTY_COLORS.SNP },
  { name: "Green Party", color: PARTY_COLORS["Green Party"] },
  { name: "ReformUK", color: PARTY_COLORS.ReformUK },
]

export default function PartiesSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">
        Featured Parties
      </h2>
      <p className="mb-8 text-govuk-secondary-text">
        The major political parties represented in the UK Parliament. Click to learn more
        about each party&apos;s position.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featuredParties.map(({ name, color }) => (
          <Link
            key={name}
            href={`/parties#${slugify(name)}`}
            className="flex items-center gap-3 rounded-sm border border-govuk-border bg-white px-4 py-3 text-govuk-black no-underline transition hover:border-l-govuk-blue hover:bg-govuk-light-grey border-l-4"
          >
            <span
              className="inline-block h-4 w-4 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-medium">{name}</span>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/parties"
          className="inline-block rounded border-2 border-govuk-blue bg-white px-6 py-3 font-semibold text-govuk-blue no-underline transition hover:bg-blue-50"
        >
          View All Parties
        </Link>
      </div>
    </section>
  )
}
