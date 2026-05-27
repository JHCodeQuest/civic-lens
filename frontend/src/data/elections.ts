import type { NationalSummary, PartySummary, RegionSummary } from "@/types/election"
import { PARTY_COLORS } from "@/lib/constants"

export const IS_DEV_DATA = true

export const DEV_BANNER = "Election data shown for demonstration purposes"

const SRC = "DEV Data (synthetic)"

const p = (partyName: string) => ({
  partyName,
  partyColour: PARTY_COLORS[partyName] || null,
})

const DEV_NATIONAL: Record<number, NationalSummary> = {
  2024: {
    year: 2024,
    totalSeats: 35,
    parties: [
      { ...p("Labour"), seats: 18, voteShare: 34.2, change: 6 },
      { ...p("Conservative"), seats: 8, voteShare: 23.5, change: -12 },
      { ...p("Liberal Democrat"), seats: 3, voteShare: 12.8, change: 2 },
      { ...p("SNP"), seats: 2, voteShare: 3.5, change: -1 },
      { ...p("Reform UK"), seats: 0, voteShare: 14.2, change: 7 },
      { ...p("Green Party"), seats: 0, voteShare: 6.5, change: 2 },
      { ...p("Plaid Cymru"), seats: 1, voteShare: 0.8, change: 0 },
      { ...p("DUP"), seats: 1, voteShare: 1.2, change: -1 },
      { ...p("Sinn Féin"), seats: 0, voteShare: 0.9, change: 0 },
      { ...p("SDLP"), seats: 1, voteShare: 0.5, change: 0 },
      { ...p("UUP"), seats: 0, voteShare: 0.4, change: -1 },
      { ...p("Alliance"), seats: 0, voteShare: 0.8, change: 0 },
    ],
    majorityParty: "Labour",
    majoritySeats: 18,
  },
  2019: {
    year: 2019,
    totalSeats: 35,
    parties: [
      { ...p("Conservative"), seats: 20, voteShare: 35.5, change: null },
      { ...p("Labour"), seats: 12, voteShare: 28.2, change: null },
      { ...p("Liberal Democrat"), seats: 1, voteShare: 10.8, change: null },
      { ...p("SNP"), seats: 3, voteShare: 4.5, change: null },
      { ...p("Reform UK"), seats: 0, voteShare: 7.2, change: null },
      { ...p("Green Party"), seats: 0, voteShare: 4.5, change: null },
      { ...p("Plaid Cymru"), seats: 1, voteShare: 0.8, change: null },
      { ...p("DUP"), seats: 2, voteShare: 2.2, change: null },
      { ...p("Sinn Féin"), seats: 0, voteShare: 0.9, change: null },
      { ...p("SDLP"), seats: 0, voteShare: 0.5, change: null },
      { ...p("UUP"), seats: 1, voteShare: 1.4, change: null },
      { ...p("Alliance"), seats: 0, voteShare: 0.8, change: null },
    ],
    majorityParty: "Conservative",
    majoritySeats: 20,
  },
}

const DEV_REGIONS: Record<number, RegionSummary[]> = {
  2024: [
    { region: "East Midlands", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 3 },
    { region: "East of England", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 3 },
    { region: "London", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 3, totalConstituencies: 4 },
    { region: "North East", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 2 },
    { region: "North West", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 3, totalConstituencies: 3 },
    { region: "Northern Ireland", winningParty: "DUP", winningPartyColour: PARTY_COLORS.DUP, seats: 1, totalConstituencies: 2 },
    { region: "Scotland", winningParty: "SNP", winningPartyColour: PARTY_COLORS.SNP, seats: 2, totalConstituencies: 3 },
    { region: "South East", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "South West", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "Wales", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 1, totalConstituencies: 2 },
    { region: "West Midlands", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 3 },
    { region: "Yorkshire and the Humber", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 3 },
  ],
  2019: [
    { region: "East Midlands", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "East of England", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "London", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 3, totalConstituencies: 4 },
    { region: "North East", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 2, totalConstituencies: 2 },
    { region: "North West", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 3, totalConstituencies: 3 },
    { region: "Northern Ireland", winningParty: "DUP", winningPartyColour: PARTY_COLORS.DUP, seats: 1, totalConstituencies: 2 },
    { region: "Scotland", winningParty: "SNP", winningPartyColour: PARTY_COLORS.SNP, seats: 2, totalConstituencies: 3 },
    { region: "South East", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "South West", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "Wales", winningParty: "Labour", winningPartyColour: PARTY_COLORS.Labour, seats: 1, totalConstituencies: 2 },
    { region: "West Midlands", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
    { region: "Yorkshire and the Humber", winningParty: "Conservative", winningPartyColour: PARTY_COLORS.Conservative, seats: 2, totalConstituencies: 3 },
  ],
}

export function getDevNationalSummary(year: number): NationalSummary | null {
  return DEV_NATIONAL[year] || null
}

export function getDevRegionBreakdown(year: number): RegionSummary[] {
  return DEV_REGIONS[year] || []
}
