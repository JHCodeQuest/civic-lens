"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PlainEnglishContextType {
  enabled: boolean
  toggle: () => void
}

const PlainEnglishContext = createContext<PlainEnglishContextType>({
  enabled: false,
  toggle: () => {},
})

export function PlainEnglishProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  return (
    <PlainEnglishContext.Provider value={{ enabled, toggle: () => setEnabled((v) => !v) }}>
      {children}
    </PlainEnglishContext.Provider>
  )
}

export function usePlainEnglish() {
  return useContext(PlainEnglishContext)
}

export function PlainEnglishToggle() {
  const { enabled, toggle } = usePlainEnglish()
  return (
    <button
      onClick={toggle}
      className={`rounded px-4 py-2 text-sm font-medium transition ${
        enabled
          ? "bg-govuk-blue text-white"
          : "border-2 border-govuk-blue bg-white text-govuk-blue hover:bg-blue-50"
      }`}
    >
      Plain English {enabled ? "ON" : "OFF"}
    </button>
  )
}

interface PlainEnglishProps {
  complex: string
  simple: string
}

export default function PlainEnglish({ complex, simple }: PlainEnglishProps) {
  const { enabled } = usePlainEnglish()
  return <>{enabled ? simple : complex}</>
}
