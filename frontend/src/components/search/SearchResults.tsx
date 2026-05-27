"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useGlobalSearch } from "@/hooks/useGlobalSearch"
import { cn } from "@/lib/utils"

const typeLabels: Record<string, string> = {
  glossary: "Glossary",
  party: "Party",
  constituency: "Constituency",
  learn: "Learn",
  election: "Election",
}

const typeColours: Record<string, string> = {
  glossary:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  party:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  constituency:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  learn:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  election:
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const typeOrder = [
  "glossary",
  "party",
  "constituency",
  "learn",
  "election",
] as const

export default function SearchPageResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const { grouped, totalCount } = useGlobalSearch(query, 0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const hasResults = totalCount > 0

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-govuk-black dark:text-white">
        Search
      </h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            placeholder="Search glossary, parties, constituencies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-3 pl-11 text-base focus:border-govuk-blue focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500"
          />
          <svg
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {!query.trim() && (
        <p className="py-16 text-center text-gray-400 dark:text-gray-600">
          Start typing to search across all pages
        </p>
      )}

      {query.trim() && !hasResults && (
        <div className="space-y-2 py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            Try a different search term, like &ldquo;Parliament&rdquo;,
            &ldquo;Labour&rdquo;, or &ldquo;MP&rdquo;
          </p>
        </div>
      )}

      {hasResults && (
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          {totalCount} {totalCount === 1 ? "result" : "results"} for
          &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="space-y-8">
        {typeOrder.map((type) => {
          const items = grouped[type]
          if (items.length === 0) return null
          return (
            <section key={type}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-govuk-black dark:text-white">
                <span
                  className={cn(
                    "inline-block rounded px-2 py-0.5 text-xs font-medium",
                    typeColours[type],
                  )}
                >
                  {typeLabels[type]}
                </span>
                <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                  {items.length}
                </span>
              </h2>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={`${type}-${i}`}>
                    <Link
                      href={item.href}
                      className="block rounded-md border border-gray-200 bg-white p-4 transition-colors hover:border-govuk-blue hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-govuk-blue"
                    >
                      <span className="text-sm font-medium text-govuk-blue dark:text-govuk-blue">
                        {item.title}
                      </span>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
