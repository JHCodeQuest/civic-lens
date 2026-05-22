import { parties, regions } from "@/data/parties"
import PartyCard from "@/components/politics/PartyCard"
import PartyScroll from "@/components/politics/PartyScroll"
import { slugify } from "@/lib/utils"

export default function PartiesPage() {
  const grouped = regions.map((region) => ({
    region,
    items: parties.filter((p) => p.region === region),
  }))

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <PartyScroll />
      <h1 className="mb-2 text-3xl font-bold">UK Political Parties</h1>
      <p className="mb-6 text-gray-600">
        An overview of the main political parties across the United Kingdom, including
        parties from Scotland, Wales, and Northern Ireland.
      </p>

      <nav className="mb-8">
        {grouped.map(({ region }) => (
          <a
            key={region}
            href={`#${region}`}
            className="mr-4 text-sm text-govuk-blue hover:underline"
          >
            {region}
          </a>
        ))}
      </nav>

      <div className="grid gap-5">
        {grouped.map(({ region, items }) => (
          <section key={region}>
            <h2
              id={region}
              className="mb-4 mt-8 scroll-mt-20 text-2xl font-bold text-govuk-black first:mt-0"
            >
              <a href={`#${region}`} className="text-inherit no-underline">
                {region}
              </a>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((party) => (
                <div key={party.name} id={slugify(party.name)}>
                  <PartyCard {...party} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
