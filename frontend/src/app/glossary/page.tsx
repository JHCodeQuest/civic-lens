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
      <p className="mb-6 text-gray-600">
        A reference guide to the key terms and concepts used in UK politics, from
        electoral systems to parliamentary procedure.
      </p>

      <input
        type="search"
        placeholder="Search terms..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 w-full max-w-md rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
      />

      <div className="grid gap-4">
        {filtered.map(({ term, definition }) => (
          <GlossaryCard key={term} term={term} definition={definition} />
        ))}
        {filtered.length === 0 && <p className="text-gray-500">No terms match your search.</p>}
      </div>
    </main>
  )
}
