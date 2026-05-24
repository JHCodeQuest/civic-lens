export const regions = ["England", "Scotland", "Wales", "Northern Ireland"] as const

export type Region = (typeof regions)[number]

export const parties: { name: string; leader: string; ideology: string; description: string; region: Region }[] = [
  {
    name: "Labour",
    leader: "Keir Starmer",
    ideology: "Centre-left",
    description: "Emphasises public services, workers' rights, and social equality. Founded by trade unions and socialist societies in 1900.",
    region: "England",
  },
  {
    name: "Conservative",
    leader: "Kemi Badenoch",
    ideology: "Centre-right",
    description: "Emphasises lower taxes, free markets, and national sovereignty. Traditionally the party of the right in British politics.",
    region: "England",
  },
  {
    name: "Liberal Democrat",
    leader: "Ed Davey",
    ideology: "Centrist",
    description: "Supports civil liberties, electoral reform, and environmental protection. Formed in 1988 from the merger of the Liberal Party and the SDP.",
    region: "England",
  },
  {
    name: "Green Party",
    leader: "Carla Denyer & Adrian Ramsay",
    ideology: "Left-wing",
    description: "Prioritises climate action, social justice, and grassroots democracy. Campaigns for a transition to an environmentally sustainable economy.",
    region: "England",
  },
  {
    name: "ReformUK",
    leader: "Nigel Farage",
    ideology: "Right-wing populist",
    description: "Supports lower immigration, tax reductions, and changes to public institutions. Formed in 2018 from the Brexit Party.",
    region: "England",
  },
  {
    name: "SNP",
    leader: "John Swinney",
    ideology: "Centre-left",
    description: "Seeks Scottish independence and supports policies on health, education, and social welfare. The largest party in Scotland since 2007.",
    region: "Scotland",
  },
  {
    name: "Plaid Cymru",
    leader: "Rhun ap Iorwerth",
    ideology: "Centre-left",
    description: "Seeks Welsh independence and supports protection of the Welsh language. Strongest in Welsh-speaking areas of north and west Wales.",
    region: "Wales",
  },
  {
    name: "DUP",
    leader: "Gavin Robinson",
    ideology: "Right-wing",
    description: "A unionist party that wants Northern Ireland to remain part of the UK. Emphasises traditional social values and is Eurosceptic.",
    region: "Northern Ireland",
  },
  {
    name: "Sinn Féin",
    leader: "Mary Lou McDonald",
    ideology: "Left-wing",
    description: "An Irish republican party that seeks a united Ireland. Follows a policy of abstentionism — its MPs do not take their seats in the UK Parliament.",
    region: "Northern Ireland",
  },
  {
    name: "SDLP",
    leader: "Colum Eastwood",
    ideology: "Centre-left",
    description: "An Irish nationalist party that pursues a united Ireland through constitutional and democratic means. Distinct from Sinn Féin in its rejection of abstentionism.",
    region: "Northern Ireland",
  },
  {
    name: "UUP",
    leader: "Mike Nesbitt",
    ideology: "Centre-right",
    description: "A unionist party that wants Northern Ireland to remain in the UK. Historically the dominant unionist party, it operates within constitutional politics.",
    region: "Northern Ireland",
  },
  {
    name: "Alliance",
    leader: "Naomi Long",
    ideology: "Centrist",
    description: "A cross-community party that defines itself as neither nationalist nor unionist. Supports shared governance and reconciliation in Northern Ireland.",
    region: "Northern Ireland",
  },
]
