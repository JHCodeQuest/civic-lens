import { PARTY_COLORS } from "@/lib/constants"

const parties = [
  {
    name: "Conservative Party",
    founded: 1834,
    slogan: "Tories",
    description:
      "The centre-right party, traditionally supporting free markets, low taxes, and a strong national defence. Currently the main opposition party in the UK. Historically one of the two major parties in British politics.",
  },
  {
    name: "Labour Party",
    founded: 1900,
    slogan: "Labour",
    description:
      "The centre-left party, founded by trade unions and socialist societies. Supports workers' rights, public services, and social justice. Currently the governing party of the United Kingdom.",
  },
  {
    name: "Liberal Democrats",
    founded: 1988,
    slogan: "Lib Dems",
    description:
      "A centrist party formed from the merger of the Liberal Party and the Social Democratic Party. Advocates for civil liberties, electoral reform (proportional representation), and environmentalism.",
  },
  {
    name: "Green Party",
    founded: 1990,
    slogan: "Greens",
    description:
      "An environmentalist party focused on climate action, social justice, and grassroots democracy. Advocates for a Green New Deal and transforming the economy to be ecologically sustainable.",
  },
  {
    name: "Scottish National Party",
    founded: 1934,
    slogan: "SNP",
    description:
      "A centre-left Scottish nationalist party campaigning for Scottish independence. Dominant in Scottish politics since 2007, winning the majority of Scottish seats at Westminster.",
  },
  {
    name: "Plaid Cymru",
    founded: 1925,
    slogan: "Party of Wales",
    description:
      "A Welsh nationalist party advocating for Welsh independence and the protection of the Welsh language. Centre-left and pro-European, with strong support in Welsh-speaking areas of north and west Wales.",
  },
  {
    name: "Reform UK",
    founded: 2018,
    slogan: "Reform",
    description:
      "A right-wing populist party formed from the Brexit Party. Campaigns for lower immigration, tax cuts, and reform of public institutions. Aims to challenge the traditional Conservative vote.",
  },
  {
    name: "Democratic Unionist Party",
    founded: 1971,
    slogan: "DUP",
    description:
      "A unionist party in Northern Ireland, socially conservative and Eurosceptic. The largest unionist party and advocates for Northern Ireland remaining part of the UK.",
  },
  {
    name: "Sinn Féin",
    founded: 1905,
    slogan: "Sinn Féin",
    description:
      "An Irish republican party advocating for a united Ireland. Left-wing and abstentionist — Sinn Féin MPs do not take their seats in the UK Parliament. Currently the largest nationalist party in Northern Ireland.",
  },
  {
    name: "Social Democratic and Labour Party",
    founded: 1970,
    slogan: "SDLP",
    description:
      "A centre-left Irish nationalist party in Northern Ireland. Supports a united Ireland through peaceful and constitutional means. Distinct from Sinn Féin in its rejection of abstentionism.",
  },
  {
    name: "Ulster Unionist Party",
    founded: 1905,
    slogan: "UUP",
    description:
      "A unionist party in Northern Ireland, historically the dominant unionist party. Centre-right and committed to Northern Ireland's place in the UK through constitutional politics.",
  },
  {
    name: "Alliance Party",
    founded: 1970,
    slogan: "Alliance",
    description:
      "A centrist, cross-community party in Northern Ireland. Neither nationalist nor unionist — advocates for shared governance and reconciliation. Strongly pro-European.",
  },
]

export default function PartiesPage() {
  return (
    <main>
      <h1>UK Political Parties</h1>
      <p>
        An overview of the main political parties across the United Kingdom, including
        parties from Scotland, Wales, and Northern Ireland.
      </p>

      <div>
        {parties.map((party) => (
          <div key={party.name}>
            <h2>
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
              <span style={{ fontSize: "0.9rem", color: "#666", marginLeft: 8 }}>
                ({party.slogan})
              </span>
            </h2>
            <p>
              Founded {party.founded} &middot; {party.slogan}
            </p>
            <p>{party.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
