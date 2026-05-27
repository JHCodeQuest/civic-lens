import { glossary } from "@/data/glossary"
import { parties } from "@/data/parties"
import { getDevConstituencies } from "@/data/constituencies"
import { learnTopics } from "@/data/learn"
import { getDevRegionBreakdown } from "@/data/elections"
import { slugify } from "./utils"

export interface SearchItem {
  type: "glossary" | "party" | "constituency" | "learn" | "election"
  title: string
  description: string
  href: string
  keywords: string[]
}

function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = []

  for (const entry of glossary) {
    items.push({
      type: "glossary",
      title: entry.term,
      description: entry.definition,
      href: `/glossary#${slugify(entry.term)}`,
      keywords: [
        entry.term,
        entry.definition,
        entry.category,
        ...(entry.example ? [entry.example] : []),
        ...(entry.relatedTerms ?? []),
      ],
    })
  }

  for (const party of parties) {
    items.push({
      type: "party",
      title: party.name,
      description: party.summary,
      href: `/parties/${party.slug}`,
      keywords: [
        party.name,
        party.leader,
        party.summary,
        party.description,
        party.position,
        party.abbreviation,
        ...party.priorities,
      ],
    })
  }

  for (const c of getDevConstituencies()) {
    items.push({
      type: "constituency",
      title: c.name,
      description: `${c.region} — ${c.winner2024} hold`,
      href: `/constituencies/${c.id}`,
      keywords: [c.name, c.region, c.country, c.winner2024, c.winner2019, c.type],
    })
  }

  for (const topic of learnTopics) {
    const keywords = [topic.title]
    if (topic.searchText) {
      keywords.push(topic.searchText)
    }
    items.push({
      type: "learn",
      title: topic.title,
      description: topic.searchText
        ? topic.searchText.slice(0, 120) + (topic.searchText.length > 120 ? "…" : "")
        : "",
      href: `/learn#${topic.id}`,
      keywords,
    })
  }

  for (const year of [2024, 2019] as const) {
    for (const r of getDevRegionBreakdown(year)) {
      items.push({
        type: "election",
        title: `${year} — ${r.region}`,
        description: `${r.winningParty} won ${r.seats} of ${r.totalConstituencies} seats`,
        href: `/elections?year=${year}`,
        keywords: [r.region, r.winningParty, String(year)],
      })
    }
  }

  return items
}

const searchIndex = buildSearchIndex()

export function search(query: string): SearchItem[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return searchIndex.filter((item) =>
    item.keywords.some((kw) => kw.toLowerCase().includes(q)),
  )
}
