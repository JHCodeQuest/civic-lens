import { PARTY_COLORS } from "@/lib/constants"
import { parties, regions } from "@/data/parties"

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
            <div key={party.name}>
              <h3>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: PARTY_COLORS[party.name] ?? "#999",
                    marginRight: 8,
                    verticalAlign: "middle",
                  }}
                />
                {party.name}
              </h3>
              <p>
                <strong>Leader:</strong> {party.leader} &middot;{" "}
                <strong>Ideology:</strong> {party.ideology}
              </p>
              <p>{party.description}</p>
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}
