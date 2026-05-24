import Link from "next/link"
import { glossary } from "@/data/glossary"

const previewTerms = [
  "Constituency",
  "First Past the Post (FPTP)",
  "Hung Parliament",
  "Devolution",
]

export default function GlossaryPreview() {
  const preview = glossary.filter((g) => previewTerms.includes(g.term))

  return (
    <section className="border-t border-govuk-border bg-govuk-light-grey px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">
          Political Glossary
        </h2>
        <p className="mb-8 text-govuk-secondary-text">
          Quick definitions of essential terms to help you follow political discussions
          with confidence.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {preview.map(({ term, definition }) => (
            <div
              key={term}
              className="rounded-sm border border-govuk-border bg-white p-4 sm:p-5 border-l-4"
            >
              <h3 className="mb-2 text-base font-semibold text-govuk-black">{term}</h3>
              <p className="text-sm leading-relaxed text-govuk-black">{definition}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/glossary"
            className="inline-block rounded border-2 border-govuk-blue bg-white px-6 py-3 font-semibold text-govuk-blue no-underline transition hover:bg-blue-50"
          >
            View Full Glossary
          </Link>
        </div>
      </div>
    </section>
  )
}
