"use client"

import type { Party } from "@/types/party"
import Link from "next/link"

interface PartyHeaderProps {
  party: Party
}

export default function PartyHeader({ party }: PartyHeaderProps) {
  return (
    <div className="mb-6">
      <Link href="/parties" className="text-sm text-govuk-blue hover:underline mb-2 inline-block">
        &larr; Back to all parties
      </Link>
      <div className="flex items-start gap-4">
        <span
          className="mt-1 h-12 w-12 rounded-full inline-block flex-shrink-0 border-2 border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: party.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-govuk-black dark:text-white">{party.name}</h1>
            {party.abbreviation && (
              <span className="rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400">
                {party.abbreviation}
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
            {party.leader && (
              <span>Leader: <strong className="text-gray-900 dark:text-gray-200">{party.leader}</strong></span>
            )}
            {party.position && (
              <span>Position: <strong className="text-gray-900 dark:text-gray-200">{party.position}</strong></span>
            )}
            {party.founded && (
              <span>Founded: <strong className="text-gray-900 dark:text-gray-200">{party.founded}</strong></span>
            )}
            {party.region && (
              <span>Region: <strong className="text-gray-900 dark:text-gray-200">{party.region}</strong></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
