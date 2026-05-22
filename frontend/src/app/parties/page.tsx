import { parties, regions } from "@/data/parties"
import PartyCard from "@/components/politics/PartyCard"

export default function PartiesPage() {
  const grouped = regions.map((region) => ({
    region,
    items: parties.filter((p) => p.region === region),
  }))

  return (
    <main>
      <h1>UK Political Parties</h1>
      <p>
        An overview of the main political parties across the United Kingdom, including
        parties from Scotland, Wales, and Northern Ireland.
      </p>

      <nav>
        {grouped.map(({ region }) => (
          <a key={region} href={`#${region}`} style={{ marginRight: 16 }}>
            {region}
          </a>
        ))}
      </nav>

      {grouped.map(({ region, items }) => (
        <section key={region}>
          <h2 id={region}>
            <a href={`#${region}`} style={{ textDecoration: "none", color: "inherit" }}>
              {region}
            </a>
          </h2>
          {items.map((party) => (
            <PartyCard key={party.name} {...party} />
          ))}
        </section>
      ))}
    </main>
  )
}
