"use client"

import { useRef, useState } from "react"
import { glossary } from "@/data/glossary"

const glossaryMap = new Map(glossary.map((g) => [g.term.toLowerCase(), g.definition]))

interface TermTooltipProps {
  term: string
  definition?: string
  children?: React.ReactNode
}

function calcAlign(el: HTMLElement): "center" | "left" | "right" {
  const rect = el.getBoundingClientRect()
  const tooltipWidth = 256
  const offset = tooltipWidth / 2
  if (rect.left - offset < 8) return "left"
  if (rect.right + offset > window.innerWidth - 8) return "right"
  return "center"
}

export default function TermTooltip({ term, definition, children }: TermTooltipProps) {
  const [show, setShow] = useState(false)
  const [align, setAlign] = useState<"center" | "left" | "right">("center")
  const spanRef = useRef<HTMLSpanElement>(null)

  const key = term.toLowerCase()
  const resolved =
    definition ??
    glossaryMap.get(key) ??
    glossary.find((g) => g.term.toLowerCase().startsWith(key))?.definition

  if (!resolved) return <>{children ?? term}</>

  const handleEnter = () => {
    if (spanRef.current) setAlign(calcAlign(spanRef.current))
    setShow(true)
  }

  const positionClass =
    align === "left"
      ? "left-0 -translate-x-0"
      : align === "right"
        ? "right-0 translate-x-0"
        : "left-1/2 -translate-x-1/2"

  const arrowClass =
    align === "left"
      ? "left-4"
      : align === "right"
        ? "right-4"
        : "left-1/2 -translate-x-1/2"

  return (
    <span
      ref={spanRef}
      className="relative cursor-help border-b border-dotted border-gray-400"
      onMouseEnter={handleEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children ?? term}
      {show && (
        <span
          className={`absolute bottom-full z-10 mb-2 w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-lg ${positionClass}`}
        >
          {resolved}
          <span
            className={`absolute top-full border-4 border-transparent border-t-white ${arrowClass}`}
          />
        </span>
      )}
    </span>
  )
}
