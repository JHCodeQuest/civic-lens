"use client"

import type { Party } from "@/types/party"

interface PartyDescriptionProps {
  party: Party
}

export default function PartyDescription({ party }: PartyDescriptionProps) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">About</h2>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{party.description}</p>
    </div>
  )
}
