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
      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
        enabled
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
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
