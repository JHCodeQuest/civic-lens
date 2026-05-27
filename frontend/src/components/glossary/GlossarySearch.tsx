interface GlossarySearchProps {
  query: string
  onQueryChange: (value: string) => void
  resultCount: number
}

export default function GlossarySearch({ query, onQueryChange, resultCount }: GlossarySearchProps) {
  return (
    <div className="mb-6">
      <label htmlFor="glossary-search" className="sr-only">Search glossary terms</label>
      <div className="relative max-w-md">
        <input
          id="glossary-search"
          type="search"
          placeholder="Search terms and definitions..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded-sm border-2 border-govuk-border bg-white px-3 py-2 pl-9 text-sm focus:border-govuk-black focus:outline-none dark:border-govuk-border dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-gray-500"
        />

        <svg
          className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-govuk-secondary-text dark:text-gray-400"
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

        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded p-1 text-govuk-secondary-text hover:bg-govuk-light-grey dark:text-gray-400 dark:hover:bg-white/10"
            aria-label="Clear search"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <p className="mt-2 text-sm text-govuk-secondary-text dark:text-gray-400">
        {resultCount} {resultCount === 1 ? "term" : "terms"} found
      </p>
    </div>
  )
}
