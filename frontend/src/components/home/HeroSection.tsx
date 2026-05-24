import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-govuk-blue to-govuk-dark-blue px-4 py-16 text-center text-white sm:py-28">
      <h1 className="mx-auto mb-4 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Understanding UK Politics
      </h1>
      <p className="mx-auto mb-3 max-w-2xl text-lg text-white/90 sm:text-xl">
        Helping people understand UK politics through simple explanations, data, and
        interactive tools.
      </p>
      <p className="mx-auto mb-8 max-w-xl text-sm text-white/75">
        Built for anyone who wants to cast an informed vote — no political science degree
        required.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/learn"
          className="inline-block rounded-md border-2 border-transparent bg-white px-8 py-3 font-semibold text-govuk-blue no-underline transition hover:bg-govuk-yellow hover:text-govuk-black"
        >
          Start Learning
        </Link>
        <Link
          href="/parties"
          className="inline-block rounded-md border-2 border-white bg-transparent px-8 py-3 font-semibold text-white no-underline transition hover:bg-white hover:text-govuk-blue"
        >
          Browse Parties
        </Link>
      </div>
    </section>
  )
}
