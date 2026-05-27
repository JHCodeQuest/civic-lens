import Link from "next/link"

export default function LearningSection() {
  return (
    <section className="bg-gradient-to-br from-govuk-dark-blue to-govuk-blue px-4 py-16 text-center text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Learn Politics Simply</h2>
        <p className="mb-4 text-lg leading-relaxed text-white/90">
          No jargon. No bias. Just clear explanations designed for beginners.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-white/85">
          Our learning content is organised by reading level so you can start where you
          feel comfortable. Use the Plain English toggle to simplify complex terms, and
          hover over underlined words for instant definitions.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href="/learn"
            className="inline-block rounded-md border-2 border-transparent bg-white px-8 py-3 font-semibold text-govuk-blue no-underline transition hover:bg-govuk-yellow hover:text-govuk-black"
          >
            Start Learning
          </Link>
          <Link
            href="/glossary"
            className="inline-block rounded-md border-2 border-white bg-transparent px-8 py-3 font-semibold text-white no-underline transition hover:bg-white hover:text-govuk-blue"
          >
            Browse Glossary
          </Link>
        </div>
      </div>
    </section>
  )
}
