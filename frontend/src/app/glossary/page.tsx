"use client"

import { useState } from "react"
import { glossary } from "@/data/glossary"
import GlossaryCard from "@/components/politics/GlossaryCard"

export default function GlossaryPage() {
  const [query, setQuery] = useState("")

  const filtered = glossary.filter(
    ({ term, definition }) =>
      term.toLowerCase().includes(query.toLowerCase()) ||
      definition.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">Glossary of UK Political Terms</h1>
      <p className="mb-6 text-govuk-secondary-text">
        A reference guide to the key terms and concepts used in UK politics, from
        electoral systems to parliamentary procedure.
      </p>

      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full max-w-md rounded-sm border-2 border-govuk-border px-3 py-2 text-sm focus:border-govuk-black focus:outline-none"
      />

      <div className="grid gap-4">
        {filtered.map(({ term, definition }) => (
          <GlossaryCard key={term} term={term} definition={definition} />
        ))}
        {filtered.length === 0 && <p className="text-govuk-secondary-text">No terms match your search.</p>}
      </div>
    </main>
  )
}
