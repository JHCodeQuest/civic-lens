"use client"

import { useState } from "react"
import { glossary } from "@/data/glossary"

const glossaryMap = new Map(glossary.map((g) => [g.term.toLowerCase(), g.definition]))

interface TermTooltipProps {
  term: string
  definition?: string
  children?: React.ReactNode
}

export default function TermTooltip({ term, definition, children }: TermTooltipProps) {
  const [show, setShow] = useState(false)

  const key = term.toLowerCase()
  const resolved =
    definition ??
    glossaryMap.get(key) ??
    glossary.find((g) => g.term.toLowerCase().startsWith(key))?.definition

  if (!resolved) return <>{children ?? term}</>

  return (
    <span
      className="relative cursor-help border-b border-dotted border-gray-400"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children ?? term}
      {show && (
        <span className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-lg">
          {resolved}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white" />
        </span>
      )}
    </span>
  )
}
