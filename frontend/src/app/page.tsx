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

const learnTopics = [
  {
    title: "How Parliament Works",
    description: "Understand the roles of the House of Commons, House of Lords, and the monarch.",
    href: "/learn",
  },
  {
    title: "Elections & Voting",
    description: "Learn about general elections, FPTP, and how constituencies work.",
    href: "/learn",
  },
  {
    title: "Key Political Terms",
    description: "Browse definitions of essential UK political terminology.",
    href: "/glossary",
  },
]

export default function Home() {
  return (
    <>
      <section className="border-b border-govuk-border bg-gray-50 px-6 py-20 text-center sm:py-24">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-govuk-black sm:text-5xl">
          Understanding UK Politics
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Your guide to Parliament, elections, political parties, and the key
          ideas that shape British democracy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/learn"
            className="inline-block rounded border-2 border-transparent bg-govuk-blue px-6 py-3 font-semibold text-white no-underline hover:brightness-110"
          >
            Start Learning
          </Link>
          <Link
            href="/parties"
            className="inline-block rounded border-2 border-govuk-blue bg-white px-6 py-3 font-semibold text-govuk-blue no-underline hover:bg-blue-50"
          >
            Browse Parties
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">Featured Parties</h2>
        <p className="mb-8 text-gray-600">
          The major political parties represented in the UK Parliament.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredParties.map(({ name, color }) => (
            <Link
              key={name}
              href={`/parties#${slugify(name)}`}
              className="flex items-center gap-3 rounded-sm border border-govuk-border bg-white px-4 py-3 no-underline text-govuk-black transition hover:border-govuk-blue"
            >
              <span
                className="inline-block h-4 w-4 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-govuk-border bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">Learn Politics</h2>
          <p className="mb-8 text-gray-600">
            Explore educational content about the UK political system.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {learnTopics.map(({ title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="rounded-sm border border-govuk-border bg-white p-6 no-underline transition hover:border-govuk-blue"
              >
                <h3 className="mb-2 text-lg font-semibold text-govuk-black">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-govuk-border bg-white px-6 py-10 text-center text-sm text-gray-600">
        <p className="mb-2">&copy; {new Date().getFullYear()} UK Politics App</p>
        <p>
          <Link href="/" className="text-govuk-blue underline-offset-2 hover:underline">
            Home
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/learn" className="text-govuk-blue underline-offset-2 hover:underline">
            Learn
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/parties" className="text-govuk-blue underline-offset-2 hover:underline">
            Parties
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/glossary" className="text-govuk-blue underline-offset-2 hover:underline">
            Glossary
          </Link>
          <span className="mx-2">&middot;</span>
          <Link href="/about" className="text-govuk-blue underline-offset-2 hover:underline">
            About
          </Link>
        </p>
      </footer>
    </>
  )
}
