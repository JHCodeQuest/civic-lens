"use client"

import { useState } from "react"
import { glossary } from "@/data/glossary"
import GlossarySearch from "@/components/glossary/GlossarySearch"
import GlossaryList from "@/components/glossary/GlossaryList"

export default function GlossaryPage() {
  const [query, setQuery] = useState("")

  const filtered = glossary.filter((entry) => {
    const search = query.toLowerCase()
    return (
      entry.term.toLowerCase().includes(search) ||
      entry.definition.toLowerCase().includes(search) ||
      entry.category.toLowerCase().includes(search)
    )
  })

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-govuk-black dark:text-white">
        Glossary of UK Political Terms
      </h1>
      <p className="mb-6 text-govuk-secondary-text dark:text-gray-400">
        A reference guide to the key terms and concepts used in UK politics, from
        electoral systems to parliamentary procedure.
      </p>

      <GlossarySearch
        query={query}
        onQueryChange={setQuery}
        resultCount={filtered.length}
      />

      <GlossaryList entries={filtered} />
    </main>
  )
}
