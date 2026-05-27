import type { DevConstituency, ElectionResultItem, PredictionResult } from "@/types/constituency"

export const IS_DEV_DATA = true

export const DEV_BANNER = "Constituency data shown for demonstration purposes"

const p = (partyName: string, partyColour: string) => ({ partyName, partyColour })

const PARTIES = {
  LAB: p("Labour", "#DC241f"),
  CON: p("Conservative", "#0087DC"),
  LD: p("Liberal Democrat", "#FAA61A"),
  GRN: p("Green Party", "#02A95B"),
  SNP: p("SNP", "#FDF38E"),
  PC: p("Plaid Cymru", "#008142"),
  REF: p("Reform UK", "#12B6CF"),
  DUP: p("DUP", "#D46A4C"),
  SF: p("Sinn Féin", "#326760"),
  SDLP: p("SDLP", "#2AA82C"),
  UUP: p("UUP", "#48A5EE"),
  ALL: p("Alliance", "#F6CB2F"),
}

const SRC = "DEV Data (synthetic)"

function r(
  party: typeof PARTIES[keyof typeof PARTIES],
  year: number,
  votes: number,
  share: number,
  position: number,
): ElectionResultItem {
  return {
    id: `dev-${party.partyName}-${year}`,
    constituencyId: "",
    partyId: "",
    partyName: party.partyName,
    partyColour: party.partyColour,
    year,
    votes,
    share,
    change: null,
    position,
    source: SRC,
  }
}

function genResults(
  seats: number,
  year: number,
  ...partyVotes: [typeof PARTIES[keyof typeof PARTIES], number][]
): ElectionResultItem[] {
  const total = partyVotes.reduce((s, [, v]) => s + v, 0)
  return partyVotes.map(([party, votes], i) =>
    r(party, year, votes, Math.round((votes / total) * 1000) / 10, i + 1),
  )
}

const MOCK_CONSTITUENCIES: DevConstituency[] = [
  // East Midlands
  {
    id: "dev-leicester-south", name: "Leicester South", region: "East Midlands", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 12453, majority2019: 9876,
    results2024: genResults(72000, 2024, [PARTIES.LAB, 28500], [PARTIES.CON, 16047], [PARTIES.LD, 8200], [PARTIES.GRN, 4100], [PARTIES.REF, 7200]),
    results2019: genResults(72000, 2019, [PARTIES.LAB, 26500], [PARTIES.CON, 16624], [PARTIES.LD, 9800], [PARTIES.GRN, 2800], [PARTIES.REF, 2100]),
    prediction: null,
  },
  {
    id: "dev-rushcliffe", name: "Rushcliffe", region: "East Midlands", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 8421, majority2019: 12340,
    results2024: genResults(73000, 2024, [PARTIES.CON, 25800], [PARTIES.LAB, 17379], [PARTIES.LD, 9200], [PARTIES.GRN, 3100], [PARTIES.REF, 8400]),
    results2019: genResults(73000, 2019, [PARTIES.CON, 31200], [PARTIES.LAB, 18860], [PARTIES.LD, 11200], [PARTIES.GRN, 2100], [PARTIES.REF, 3400]),
    prediction: null,
  },
  {
    id: "dev-nottingham-north", name: "Nottingham North and Kimberley", region: "East Midlands", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 11200, majority2019: 8020,
    results2024: genResults(68000, 2024, [PARTIES.LAB, 24500], [PARTIES.CON, 13300], [PARTIES.LD, 4900], [PARTIES.GRN, 3500], [PARTIES.REF, 8900]),
    results2019: genResults(68000, 2019, [PARTIES.LAB, 22500], [PARTIES.CON, 14480], [PARTIES.LD, 5500], [PARTIES.GRN, 2200], [PARTIES.REF, 2800]),
    prediction: null,
  },
  // East of England
  {
    id: "dev-cambridge", name: "Cambridge", region: "East of England", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 9800, majority2019: 5600,
    results2024: genResults(71000, 2024, [PARTIES.LAB, 26000], [PARTIES.CON, 16200], [PARTIES.LD, 13200], [PARTIES.GRN, 5100], [PARTIES.REF, 5400]),
    results2019: genResults(71000, 2019, [PARTIES.LAB, 23500], [PARTIES.CON, 17900], [PARTIES.LD, 14500], [PARTIES.GRN, 3800], [PARTIES.REF, 1700]),
    prediction: null,
  },
  {
    id: "dev-south-suffolk", name: "South Suffolk", region: "East of England", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 7200, majority2019: 14500,
    results2024: genResults(75000, 2024, [PARTIES.CON, 26500], [PARTIES.LAB, 19300], [PARTIES.LD, 10100], [PARTIES.GRN, 3400], [PARTIES.REF, 8700]),
    results2019: genResults(75000, 2019, [PARTIES.CON, 32200], [PARTIES.LAB, 17700], [PARTIES.LD, 13000], [PARTIES.GRN, 2800], [PARTIES.REF, 3200]),
    prediction: null,
  },
  {
    id: "dev-norwich-north", name: "Norwich North", region: "East of England", country: "England", type: "marginal",
    winner2024: "Labour", winner2019: "Conservative", majority2024: 1450, majority2019: 3210,
    results2024: genResults(67000, 2024, [PARTIES.LAB, 21200], [PARTIES.CON, 19750], [PARTIES.LD, 6800], [PARTIES.GRN, 3600], [PARTIES.REF, 8300]),
    results2019: genResults(67000, 2019, [PARTIES.CON, 22800], [PARTIES.LAB, 19590], [PARTIES.LD, 7400], [PARTIES.GRN, 2100], [PARTIES.REF, 3100]),
    prediction: { id: "dev-pred-norwich-n", constituencyId: "dev-norwich-north", predictedWinnerName: "Labour", predictedWinnerId: "", confidence: 58, modelUsed: "uniform_swing", constituencyName: "Norwich North", notes: SRC },
  },
  // London
  {
    id: "dev-holborn", name: "Holborn and St Pancras", region: "London", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 18500, majority2019: 14200,
    results2024: genResults(75000, 2024, [PARTIES.LAB, 34500], [PARTIES.CON, 16000], [PARTIES.LD, 10200], [PARTIES.GRN, 6200], [PARTIES.REF, 5100]),
    results2019: genResults(75000, 2019, [PARTIES.LAB, 31500], [PARTIES.CON, 17300], [PARTIES.LD, 13500], [PARTIES.GRN, 5100], [PARTIES.REF, 1600]),
    prediction: null,
  },
  {
    id: "dev-cities-london", name: "Cities of London and Westminster", region: "London", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 5800, majority2019: 9200,
    results2024: genResults(73000, 2024, [PARTIES.CON, 23500], [PARTIES.LAB, 17700], [PARTIES.LD, 14100], [PARTIES.GRN, 4800], [PARTIES.REF, 7200]),
    results2019: genResults(73000, 2019, [PARTIES.CON, 27500], [PARTIES.LAB, 18300], [PARTIES.LD, 16200], [PARTIES.GRN, 3500], [PARTIES.REF, 2700]),
    prediction: null,
  },
  {
    id: "dev-bermondsey", name: "Bermondsey and Old Southwark", region: "London", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 15600, majority2019: 8900,
    results2024: genResults(78000, 2024, [PARTIES.LAB, 33800], [PARTIES.CON, 18200], [PARTIES.LD, 11200], [PARTIES.GRN, 7400], [PARTIES.REF, 5200]),
    results2019: genResults(78000, 2019, [PARTIES.LAB, 29400], [PARTIES.CON, 20500], [PARTIES.LD, 14800], [PARTIES.GRN, 4800], [PARTIES.REF, 1800]),
    prediction: null,
  },
  {
    id: "dev-richmond-park", name: "Richmond Park", region: "London", country: "England", type: "libdem",
    winner2024: "Liberal Democrat", winner2019: "Liberal Democrat", majority2024: 10500, majority2019: 7800,
    results2024: genResults(75000, 2024, [PARTIES.LD, 27200], [PARTIES.CON, 16700], [PARTIES.LAB, 14200], [PARTIES.GRN, 6800], [PARTIES.REF, 6100]),
    results2019: genResults(75000, 2019, [PARTIES.LD, 25800], [PARTIES.CON, 18000], [PARTIES.LAB, 16800], [PARTIES.GRN, 4500], [PARTIES.REF, 2100]),
    prediction: null,
  },
  // North East
  {
    id: "dev-newcastle", name: "Newcastle upon Tyne Central", region: "North East", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 16700, majority2019: 11200,
    results2024: genResults(65000, 2024, [PARTIES.LAB, 28200], [PARTIES.CON, 11500], [PARTIES.LD, 5800], [PARTIES.GRN, 4800], [PARTIES.REF, 9100]),
    results2019: genResults(65000, 2019, [PARTIES.LAB, 26800], [PARTIES.CON, 15600], [PARTIES.LD, 7200], [PARTIES.GRN, 3100], [PARTIES.REF, 2800]),
    prediction: null,
  },
  {
    id: "dev-stockton", name: "Stockton West", region: "North East", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 8900, majority2019: 13100,
    results2024: genResults(70000, 2024, [PARTIES.CON, 24800], [PARTIES.LAB, 15900], [PARTIES.LD, 5100], [PARTIES.GRN, 2700], [PARTIES.REF, 11000]),
    results2019: genResults(70000, 2019, [PARTIES.CON, 30100], [PARTIES.LAB, 17000], [PARTIES.LD, 6800], [PARTIES.GRN, 2100], [PARTIES.REF, 4200]),
    prediction: null,
  },
  // North West
  {
    id: "dev-manchester", name: "Manchester Central", region: "North West", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 22400, majority2019: 17500,
    results2024: genResults(72000, 2024, [PARTIES.LAB, 36500], [PARTIES.CON, 14100], [PARTIES.LD, 7200], [PARTIES.GRN, 5800], [PARTIES.REF, 5100]),
    results2019: genResults(72000, 2019, [PARTIES.LAB, 33800], [PARTIES.CON, 16300], [PARTIES.LD, 8500], [PARTIES.GRN, 4100], [PARTIES.REF, 1800]),
    prediction: null,
  },
  {
    id: "dev-liverpool", name: "Liverpool Riverside", region: "North West", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 25900, majority2019: 21200,
    results2024: genResults(68000, 2024, [PARTIES.LAB, 37800], [PARTIES.CON, 11900], [PARTIES.LD, 5900], [PARTIES.GRN, 5400], [PARTIES.REF, 4200]),
    results2019: genResults(68000, 2019, [PARTIES.LAB, 35200], [PARTIES.CON, 14000], [PARTIES.LD, 7200], [PARTIES.GRN, 3800], [PARTIES.REF, 1400]),
    prediction: null,
  },
  {
    id: "dev-south-ribble", name: "South Ribble", region: "North West", country: "England", type: "marginal",
    winner2024: "Labour", winner2019: "Conservative", majority2024: 820, majority2019: 4210,
    results2024: genResults(75000, 2024, [PARTIES.LAB, 19800], [PARTIES.CON, 18980], [PARTIES.LD, 5200], [PARTIES.GRN, 3400], [PARTIES.REF, 12600]),
    results2019: genResults(75000, 2019, [PARTIES.CON, 24200], [PARTIES.LAB, 19990], [PARTIES.LD, 6800], [PARTIES.GRN, 2200], [PARTIES.REF, 4800]),
    prediction: { id: "dev-pred-s-ribble", constituencyId: "dev-south-ribble", predictedWinnerName: "Labour", predictedWinnerId: "", confidence: 52, modelUsed: "uniform_swing", constituencyName: "South Ribble", notes: SRC },
  },
  // South East
  {
    id: "dev-oxford-east", name: "Oxford East", region: "South East", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 14100, majority2019: 9800,
    results2024: genResults(72000, 2024, [PARTIES.LAB, 29400], [PARTIES.CON, 15300], [PARTIES.LD, 9600], [PARTIES.GRN, 5800], [PARTIES.REF, 5900]),
    results2019: genResults(72000, 2019, [PARTIES.LAB, 26800], [PARTIES.CON, 17000], [PARTIES.LD, 11500], [PARTIES.GRN, 4100], [PARTIES.REF, 1700]),
    prediction: null,
  },
  {
    id: "dev-surrey-heath", name: "Surrey Heath", region: "South East", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 6200, majority2019: 15700,
    results2024: genResults(76000, 2024, [PARTIES.CON, 24100], [PARTIES.LAB, 17900], [PARTIES.LD, 11100], [PARTIES.GRN, 3200], [PARTIES.REF, 10100]),
    results2019: genResults(76000, 2019, [PARTIES.CON, 32100], [PARTIES.LAB, 16400], [PARTIES.LD, 14000], [PARTIES.GRN, 2400], [PARTIES.REF, 3500]),
    prediction: null,
  },
  {
    id: "dev-winchester", name: "Winchester", region: "South East", country: "England", type: "libdem",
    winner2024: "Liberal Democrat", winner2019: "Liberal Democrat", majority2024: 11200, majority2019: 8600,
    results2024: genResults(74000, 2024, [PARTIES.LD, 28100], [PARTIES.CON, 16900], [PARTIES.LAB, 13800], [PARTIES.GRN, 4200], [PARTIES.REF, 5800]),
    results2019: genResults(74000, 2019, [PARTIES.LD, 26500], [PARTIES.CON, 17900], [PARTIES.LAB, 15500], [PARTIES.GRN, 3100], [PARTIES.REF, 2100]),
    prediction: null,
  },
  // South West
  {
    id: "dev-bristol-central", name: "Bristol Central", region: "South West", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 15200, majority2019: 10400,
    results2024: genResults(71000, 2024, [PARTIES.LAB, 30200], [PARTIES.CON, 15000], [PARTIES.LD, 9800], [PARTIES.GRN, 6200], [PARTIES.REF, 6100]),
    results2019: genResults(71000, 2019, [PARTIES.LAB, 27500], [PARTIES.CON, 17100], [PARTIES.LD, 11200], [PARTIES.GRN, 4100], [PARTIES.REF, 1900]),
    prediction: null,
  },
  {
    id: "dev-north-devon", name: "North Devon", region: "South West", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 7800, majority2019: 12800,
    results2024: genResults(73000, 2024, [PARTIES.CON, 25100], [PARTIES.LAB, 17300], [PARTIES.LD, 13200], [PARTIES.GRN, 3400], [PARTIES.REF, 8100]),
    results2019: genResults(73000, 2019, [PARTIES.CON, 30200], [PARTIES.LAB, 17400], [PARTIES.LD, 14100], [PARTIES.GRN, 2500], [PARTIES.REF, 2800]),
    prediction: null,
  },
  {
    id: "dev-st-ives", name: "St Ives", region: "South West", country: "England", type: "marginal",
    winner2024: "Labour", winner2019: "Conservative", majority2024: 2150, majority2019: 5100,
    results2024: genResults(68000, 2024, [PARTIES.LAB, 20600], [PARTIES.CON, 18450], [PARTIES.LD, 11200], [PARTIES.GRN, 2800], [PARTIES.REF, 7800]),
    results2019: genResults(68000, 2019, [PARTIES.CON, 23300], [PARTIES.LAB, 18200], [PARTIES.LD, 13100], [PARTIES.GRN, 2100], [PARTIES.REF, 3100]),
    prediction: { id: "dev-pred-st-ives", constituencyId: "dev-st-ives", predictedWinnerName: "Labour", predictedWinnerId: "", confidence: 55, modelUsed: "uniform_swing", constituencyName: "St Ives", notes: SRC },
  },
  // West Midlands
  {
    id: "dev-birmingham", name: "Birmingham Ladywood", region: "West Midlands", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 19800, majority2019: 15600,
    results2024: genResults(69000, 2024, [PARTIES.LAB, 32200], [PARTIES.CON, 12400], [PARTIES.LD, 6100], [PARTIES.GRN, 5200], [PARTIES.REF, 7600]),
    results2019: genResults(69000, 2019, [PARTIES.LAB, 29800], [PARTIES.CON, 14200], [PARTIES.LD, 7800], [PARTIES.GRN, 3500], [PARTIES.REF, 2800]),
    prediction: null,
  },
  {
    id: "dev-meriden", name: "Meriden and Solihull East", region: "West Midlands", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 7800, majority2019: 15200,
    results2024: genResults(76000, 2024, [PARTIES.CON, 26100], [PARTIES.LAB, 18300], [PARTIES.LD, 7200], [PARTIES.GRN, 3100], [PARTIES.REF, 10200]),
    results2019: genResults(76000, 2019, [PARTIES.CON, 32100], [PARTIES.LAB, 16900], [PARTIES.LD, 9500], [PARTIES.GRN, 2200], [PARTIES.REF, 3800]),
    prediction: null,
  },
  {
    id: "dev-worcester", name: "Worcester", region: "West Midlands", country: "England", type: "marginal",
    winner2024: "Labour", winner2019: "Conservative", majority2024: 1800, majority2019: 4200,
    results2024: genResults(71000, 2024, [PARTIES.LAB, 21600], [PARTIES.CON, 19800], [PARTIES.LD, 5800], [PARTIES.GRN, 3200], [PARTIES.REF, 10900]),
    results2019: genResults(71000, 2019, [PARTIES.CON, 24100], [PARTIES.LAB, 19900], [PARTIES.LD, 7200], [PARTIES.GRN, 2100], [PARTIES.REF, 4100]),
    prediction: { id: "dev-pred-worcester", constituencyId: "dev-worcester", predictedWinnerName: "Labour", predictedWinnerId: "", confidence: 60, modelUsed: "uniform_swing", constituencyName: "Worcester", notes: SRC },
  },
  // Yorkshire and the Humber
  {
    id: "dev-richmond-yorks", name: "Richmond and Northallerton", region: "Yorkshire and the Humber", country: "England", type: "conservative",
    winner2024: "Conservative", winner2019: "Conservative", majority2024: 15200, majority2019: 22800,
    results2024: genResults(75000, 2024, [PARTIES.CON, 29800], [PARTIES.LAB, 14600], [PARTIES.LD, 7200], [PARTIES.GRN, 3100], [PARTIES.REF, 10200]),
    results2019: genResults(75000, 2019, [PARTIES.CON, 37200], [PARTIES.LAB, 14400], [PARTIES.LD, 9800], [PARTIES.GRN, 2100], [PARTIES.REF, 3500]),
    prediction: null,
  },
  {
    id: "dev-hull-west", name: "Kingston upon Hull West and Haltemprice", region: "Yorkshire and the Humber", country: "England", type: "marginal",
    winner2024: "Labour", winner2019: "Conservative", majority2024: 1350, majority2019: 3400,
    results2024: genResults(66000, 2024, [PARTIES.LAB, 19500], [PARTIES.CON, 18150], [PARTIES.LD, 4800], [PARTIES.GRN, 3200], [PARTIES.REF, 10500]),
    results2019: genResults(66000, 2019, [PARTIES.CON, 22100], [PARTIES.LAB, 18700], [PARTIES.LD, 5800], [PARTIES.GRN, 1900], [PARTIES.REF, 3800]),
    prediction: { id: "dev-pred-hull-w", constituencyId: "dev-hull-west", predictedWinnerName: "Labour", predictedWinnerId: "", confidence: 56, modelUsed: "uniform_swing", constituencyName: "Kingston upon Hull West and Haltemprice", notes: SRC },
  },
  {
    id: "dev-sheffield", name: "Sheffield Heeley", region: "Yorkshire and the Humber", country: "England", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 13900, majority2019: 9500,
    results2024: genResults(69000, 2024, [PARTIES.LAB, 27500], [PARTIES.CON, 13600], [PARTIES.LD, 7400], [PARTIES.GRN, 5200], [PARTIES.REF, 8200]),
    results2019: genResults(69000, 2019, [PARTIES.LAB, 24800], [PARTIES.CON, 15300], [PARTIES.LD, 9100], [PARTIES.GRN, 3500], [PARTIES.REF, 2400]),
    prediction: null,
  },
  // Scotland
  {
    id: "dev-aberdeen-south", name: "Aberdeen South", region: "Scotland", country: "Scotland", type: "snp",
    winner2024: "SNP", winner2019: "SNP", majority2024: 9200, majority2019: 12500,
    results2024: genResults(71000, 2024, [PARTIES.SNP, 29800], [PARTIES.LAB, 20600], [PARTIES.CON, 10100], [PARTIES.LD, 4800], [PARTIES.GRN, 2800]),
    results2019: genResults(71000, 2019, [PARTIES.SNP, 32100], [PARTIES.CON, 19600], [PARTIES.LAB, 15200], [PARTIES.LD, 5100], [PARTIES.GRN, 2000]),
    prediction: null,
  },
  {
    id: "dev-edinburgh-south", name: "Edinburgh South", region: "Scotland", country: "Scotland", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 12500, majority2019: 8800,
    results2024: genResults(73000, 2024, [PARTIES.LAB, 28500], [PARTIES.SNP, 16000], [PARTIES.CON, 12100], [PARTIES.LD, 6800], [PARTIES.GRN, 4200]),
    results2019: genResults(73000, 2019, [PARTIES.LAB, 26100], [PARTIES.SNP, 17300], [PARTIES.CON, 14800], [PARTIES.LD, 8200], [PARTIES.GRN, 3100]),
    prediction: null,
  },
  {
    id: "dev-glasgow-north", name: "Glasgow North", region: "Scotland", country: "Scotland", type: "snp",
    winner2024: "SNP", winner2019: "SNP", majority2024: 8100, majority2019: 10500,
    results2024: genResults(65000, 2024, [PARTIES.SNP, 24500], [PARTIES.LAB, 16400], [PARTIES.CON, 6800], [PARTIES.GRN, 5800], [PARTIES.LD, 3500]),
    results2019: genResults(65000, 2019, [PARTIES.SNP, 27100], [PARTIES.LAB, 16600], [PARTIES.CON, 9200], [PARTIES.GRN, 3500], [PARTIES.LD, 4200]),
    prediction: null,
  },
  // Wales
  {
    id: "dev-cardiff-west", name: "Cardiff West", region: "Wales", country: "Wales", type: "labour",
    winner2024: "Labour", winner2019: "Labour", majority2024: 13200, majority2019: 9800,
    results2024: genResults(70000, 2024, [PARTIES.LAB, 28400], [PARTIES.CON, 15200], [PARTIES.PC, 8200], [PARTIES.LD, 5400], [PARTIES.REF, 6800], [PARTIES.GRN, 3200]),
    results2019: genResults(70000, 2019, [PARTIES.LAB, 26100], [PARTIES.CON, 16300], [PARTIES.PC, 10500], [PARTIES.LD, 6800], [PARTIES.REF, 3100], [PARTIES.GRN, 2100]),
    prediction: null,
  },
  {
    id: "dev-ynys-mon", name: "Ynys Môn", region: "Wales", country: "Wales", type: "plaid",
    winner2024: "Plaid Cymru", winner2019: "Plaid Cymru", majority2024: 5800, majority2019: 4100,
    results2024: genResults(55000, 2024, [PARTIES.PC, 18500], [PARTIES.LAB, 12700], [PARTIES.CON, 9800], [PARTIES.REF, 4800], [PARTIES.LD, 3200], [PARTIES.GRN, 2100]),
    results2019: genResults(55000, 2019, [PARTIES.PC, 17200], [PARTIES.LAB, 13100], [PARTIES.CON, 11200], [PARTIES.LD, 3800], [PARTIES.REF, 3500], [PARTIES.GRN, 1400]),
    prediction: null,
  },
  // Northern Ireland
  {
    id: "dev-belfast-north", name: "Belfast North", region: "Northern Ireland", country: "Northern Ireland", type: "ni_dup",
    winner2024: "DUP", winner2019: "DUP", majority2024: 4200, majority2019: 6100,
    results2024: genResults(65000, 2024, [PARTIES.DUP, 18200], [PARTIES.SF, 14000], [PARTIES.SDLP, 8200], [PARTIES.ALL, 7200], [PARTIES.UUP, 5800], [PARTIES.GRN, 2800]),
    results2019: genResults(65000, 2019, [PARTIES.DUP, 20100], [PARTIES.SF, 14000], [PARTIES.UUP, 8100], [PARTIES.SDLP, 7200], [PARTIES.ALL, 5800], [PARTIES.GRN, 1800]),
    prediction: null,
  },
  {
    id: "dev-belfast-south", name: "Belfast South and Mid Down", region: "Northern Ireland", country: "Northern Ireland", type: "ni_sdlp",
    winner2024: "SDLP", winner2019: "SDLP", majority2024: 3800, majority2019: 2900,
    results2024: genResults(70000, 2024, [PARTIES.SDLP, 18200], [PARTIES.DUP, 14400], [PARTIES.SF, 12800], [PARTIES.ALL, 10500], [PARTIES.UUP, 7200], [PARTIES.GRN, 3100]),
    results2019: genResults(70000, 2019, [PARTIES.SDLP, 17200], [PARTIES.DUP, 14300], [PARTIES.SF, 13100], [PARTIES.ALL, 9800], [PARTIES.UUP, 8100], [PARTIES.GRN, 2100]),
    prediction: null,
  },
]

export function getDevConstituencies(): DevConstituency[] {
  return MOCK_CONSTITUENCIES
}

export function getDevConstituency(id: string): DevConstituency | undefined {
  return MOCK_CONSTITUENCIES.find((c) => c.id === id)
}
