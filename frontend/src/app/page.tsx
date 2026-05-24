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

const whatItDoes = [
  {
    title: "Learn Political Terminology",
    description: "Browse clear definitions of essential UK political terms.",
    href: "/glossary",
  },
  {
    title: "Explore Political Parties",
    description: "See what each party stands for, who leads it, and where it sits on the political spectrum.",
    href: "/parties",
  },
  {
    title: "Understand Elections",
    description: "Learn how general elections work, from calling a vote to forming a government.",
    href: "/elections",
  },
]

export default function Home() {
  return (
    <>
      <section className="border-b border-govuk-border bg-gray-50 px-6 py-20 text-center sm:py-28">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-govuk-black sm:text-5xl">
          Understanding UK Politics
        </h1>
        <p className="mx-auto mb-3 max-w-2xl text-lg text-gray-600">
          Helping people understand UK politics through simple explanations, data, and
          interactive tools.
        </p>
        <p className="mx-auto mb-8 max-w-xl text-sm text-gray-500">
          Built for anyone who wants to cast an informed vote — no political science degree
          required.
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
        <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">What You Can Do</h2>
        <p className="mb-8 text-gray-600">
          Three ways to get started.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {whatItDoes.map(({ title, description, href }) => (
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
      </section>

      <section className="border-t border-govuk-border bg-gray-50 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">Why This Exists</h2>
          <p className="mb-8 text-gray-600">
            UK politics can feel opaque. This project tries to cut through that.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-govuk-border bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold text-govuk-black">Accessibility</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Political education should not require a degree. Every concept on this site is
                explained in plain language, with tooltips and reading modes to meet you where
                you are.
              </p>
            </div>
            <div className="rounded-sm border border-govuk-border bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold text-govuk-black">Transparency</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                All content is open source. You can see exactly where the information comes
                from, suggest corrections, and verify everything yourself. No algorithms, no
                tracking, no sponsors.
              </p>
            </div>
            <div className="rounded-sm border border-govuk-border bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold text-govuk-black">Political Education</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Understanding how Parliament works, what parties believe, and what your vote
                means is the foundation of democracy. This site collects what matters in one
                place.
              </p>
            </div>
            <div className="rounded-sm border border-govuk-border bg-white p-6">
              <h3 className="mb-2 text-lg font-semibold text-govuk-black">Reducing Confusion</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                From hung parliaments to devolution — political jargon shuts people out.
                This project exists to replace confusion with clarity, one term at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">Featured Parties</h2>
        <p className="mb-8 text-gray-600">
          The major political parties represented in the UK Parliament. Click one to jump to
          its profile.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredParties.map(({ name, color }) => (
            <Link
              key={name}
              href={`/parties#${slugify(name)}`}
              className="flex items-center gap-3 rounded-sm border border-govuk-border bg-white px-4 py-3 text-govuk-black no-underline transition hover:border-govuk-blue"
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
          <span className="mx-2">&middot;</span>
          <Link href="/elections" className="text-govuk-blue underline-offset-2 hover:underline">
            Elections
          </Link>
        </p>
      </footer>
    </>
  )
}
