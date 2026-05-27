"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
  id: string
  title: string
}

interface LearnNavProps {
  items: NavItem[]
}

export default function LearnNav({ items }: LearnNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav aria-label="Topics in this page">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded-sm border border-govuk-border px-4 py-3 text-left text-sm font-medium transition",
          "text-govuk-black hover:bg-govuk-light-grey",
          "dark:text-white dark:hover:bg-white/10",
          "lg:hidden",
        )}
        aria-expanded={open}
        aria-controls="learn-nav-list"
      >
        <span>Topics</span>
        <svg
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        id="learn-nav-list"
        className={cn(
          "list-none space-y-1",
          open ? "mt-2 block" : "hidden",
          "lg:block",
        )}
      >
        {items.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-sm px-3 py-2 text-sm no-underline transition",
                "text-govuk-secondary-text hover:bg-govuk-light-grey hover:text-govuk-black",
                "dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
