"use client"

import { Suspense } from "react"
import SearchPageResults from "@/components/search/SearchResults"

function LoadingFallback() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-12 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchPageResults />
    </Suspense>
  )
}
