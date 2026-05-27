"use client"

import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useGlobalSearch } from "@/hooks/useGlobalSearch"
import { cn } from "@/lib/utils"
import type { SearchItem } from "@/lib/search"

interface SearchBarProps {
  compact?: boolean
}

const typeLabels: Record<string, string> = {
  glossary: "Glossary",
  party: "Party",
  constituency: "Constituency",
  learn: "Learn",
  election: "Election",
}

export default function SearchBar({ compact = true }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { grouped, totalCount } = useGlobalSearch(query)

  const dropdownItems = useMemo(() => {
    const items: (SearchItem & { typeKey: string })[] = []
    const types = ["glossary", "party", "constituency", "learn", "election"] as const
    for (const t of types) {
      for (const item of grouped[t].slice(0, 3)) {
        items.push({ ...item, typeKey: t })
      }
    }
    return items
  }, [grouped])

  useEffect(() => {
    setShowDropdown(false)
    setExpanded(false)
    setQuery("")
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
        if (compact) setExpanded(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [compact])

  useEffect(() => {
    if (query.trim()) {
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [query])

  useEffect(() => {
    setSelectedIdx(-1)
  }, [dropdownItems.length])

  const navigateToSearch = useCallback(() => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowDropdown(false)
      setExpanded(false)
      setQuery("")
    }
  }, [query, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigateToSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowDropdown(false)
      if (compact) setExpanded(false)
      inputRef.current?.blur()
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIdx((i) => Math.min(i + 1, dropdownItems.length))
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIdx((i) => Math.max(i - 1, -1))
      return
    }
    if (e.key === "Enter") {
      if (selectedIdx >= 0 && selectedIdx < dropdownItems.length) {
        e.preventDefault()
        router.push(dropdownItems[selectedIdx].href)
        setShowDropdown(false)
        setExpanded(false)
        setQuery("")
      } else {
        handleSubmit(e)
      }
      return
    }
  }

  const showDropdownContent = showDropdown && query.trim()

  const input = (
    <input
      ref={inputRef}
      type="search"
      placeholder="Search..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      onFocus={() => query.trim() && setShowDropdown(true)}
      className={cn(
        "rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm placeholder-gray-400 focus:border-govuk-blue focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500",
        compact ? "w-48" : "w-full",
      )}
      autoFocus={!compact}
    />
  )

  const dropdown = showDropdownContent && (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-1 w-80 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900",
        !compact && "relative mt-0 w-full rounded-none border-0 border-t shadow-none",
      )}
    >
      <div className="max-h-80 overflow-y-auto py-2">
        {dropdownItems.length === 0 && (
          <p className="px-3 py-4 text-center text-sm text-gray-400">No results</p>
        )}
        {(() => {
          let lastType = ""
          return dropdownItems.map((item, i) => {
            const showHeader = item.typeKey !== lastType
            lastType = item.typeKey
            const isSelected = i === selectedIdx
            return (
              <div key={`${item.typeKey}-${item.href}`}>
                {showHeader && (
                  <p className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {typeLabels[item.typeKey]}
                  </p>
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm transition-colors",
                    isSelected
                      ? "bg-govuk-blue/10 text-govuk-blue dark:bg-govuk-blue/20"
                      : "hover:bg-gray-50 dark:hover:bg-white/5",
                  )}
                  onClick={() => {
                    setShowDropdown(false)
                    setExpanded(false)
                    setQuery("")
                  }}
                >
                  <span className="font-medium text-govuk-black dark:text-white">
                    {item.title}
                  </span>
                  <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                </Link>
              </div>
            )
          })
        })()}
      </div>
      {totalCount > 0 && (
        <button
          onClick={navigateToSearch}
          className={cn(
            "w-full border-t border-gray-200 px-3 py-2 text-left text-sm font-medium text-govuk-blue transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-white/5",
            selectedIdx === dropdownItems.length && "bg-govuk-blue/10 dark:bg-govuk-blue/20",
          )}
        >
          See all {totalCount} results →
        </button>
      )}
    </div>
  )

  if (!compact) {
    return (
      <div ref={containerRef} className="px-4 pb-2 pt-4">
        <form onSubmit={handleSubmit}>{input}</form>
        {dropdown}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative flex items-center">
      {expanded ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-1">
          {input}
          <button
            type="button"
            onClick={() => {
              setExpanded(false)
              setQuery("")
              setShowDropdown(false)
            }}
            className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close search"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>
      ) : (
        <button
          onClick={() => {
            setExpanded(true)
            setTimeout(() => inputRef.current?.focus(), 50)
          }}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
            "text-govuk-secondary-text hover:bg-govuk-light-grey hover:text-govuk-black",
            "dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
          )}
          aria-label="Open search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
      {dropdown}
    </div>
  )
}
