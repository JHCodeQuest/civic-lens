export const regions = ["England", "Scotland", "Wales", "Northern Ireland"] as const

export type Region = (typeof regions)[number]

export const parties: { name: string; leader: string; ideology: string; description: string; region: Region }[] = [
  {
    name: "Labour",
    leader: "Keir Starmer",
    ideology: "Centre-left",
    description: "Focuses on public services, workers' rights, and social justice.",
    region: "England",
  },
  {
    name: "Conservative",
    leader: "Kemi Badenoch",
    ideology: "Centre-right",
    description: "Focuses on lower taxation, free markets, and national sovereignty.",
    region: "England",
  },
  {
    name: "Liberal Democrat",
    leader: "Ed Davey",
    ideology: "Centrist",
    description: "Advocates for civil liberties, electoral reform, and environmentalism.",
    region: "England",
  },
  {
    name: "Green Party",
    leader: "Carla Denyer & Adrian Ramsay",
    ideology: "Left-wing",
    description: "Focuses on climate action, social justice, and grassroots democracy.",
    region: "England",
  },
  {
    name: "ReformUK",
    leader: "Nigel Farage",
    ideology: "Right-wing populist",
    description: "Campaigns for lower immigration, tax cuts, and reform of public institutions.",
    region: "England",
  },
  {
    name: "SNP",
    leader: "John Swinney",
    ideology: "Centre-left",
    description: "Campaigns for Scottish independence and progressive domestic policies.",
    region: "Scotland",
  },
  {
    name: "Plaid Cymru",
    leader: "Rhun ap Iorwerth",
    ideology: "Centre-left",
    description: "Advocates for Welsh independence and the protection of the Welsh language.",
    region: "Wales",
  },
  {
    name: "DUP",
    leader: "Gavin Robinson",
    ideology: "Right-wing",
    description: "A unionist party in Northern Ireland, socially conservative and Eurosceptic.",
    region: "Northern Ireland",
  },
  {
    name: "SinnFéin",
    leader: "Mary Lou McDonald",
    ideology: "Left-wing",
    description: "An Irish republican party advocating for a united Ireland.",
    region: "Northern Ireland",
  },
  {
    name: "SDLP",
    leader: "Colum Eastwood",
    ideology: "Centre-left",
    description: "An Irish nationalist party supporting a united Ireland through peaceful means.",
    region: "Northern Ireland",
  },
  {
    name: "UUP",
    leader: "Mike Nesbitt",
    ideology: "Centre-right",
    description: "A unionist party in Northern Ireland committed to constitutional politics.",
    region: "Northern Ireland",
  },
  {
    name: "Alliance",
    leader: "Naomi Long",
    ideology: "Centrist",
    description: "A cross-community party in Northern Ireland, neither nationalist nor unionist.",
    region: "Northern Ireland",
  },
]
