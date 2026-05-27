"use client"

import { usePartyData } from "@/hooks/usePartyData"
import { DEV_BANNER } from "@/data/party-detail"
import PartyHeader from "@/components/politics/PartyHeader"
import PartyDescription from "@/components/politics/PartyDescription"
import PartyPriorities from "@/components/politics/PartyPriorities"
import PartyElectionHistory from "@/components/politics/PartyElectionHistory"
import PartyPollingTrend from "@/components/politics/PartyPollingTrend"
import PartyConstituencies from "@/components/politics/PartyConstituencies"
import Link from "next/link"

interface PartyDetailViewProps {
  slug: string
}

export default function PartyDetailView({ slug }: PartyDetailViewProps) {
  const { party, history, constituencies, loading, error, isDevData } = usePartyData(slug)

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-48">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-govuk-blue border-t-transparent" />
        </div>
      </main>
    )
  }

  if (error || !party) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error || "Party not found"}
        </div>
        <Link href="/parties" className="mt-4 inline-block text-sm text-govuk-blue hover:underline">
          &larr; Back to all parties
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {isDevData && (
        <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-700 dark:text-amber-300">
          {DEV_BANNER}
        </div>
      )}

      <PartyHeader party={party} />

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <PartyDescription party={party} />
        <PartyPriorities priorities={party.priorities} />
      </div>

      <section className="mb-8">
        <PartyElectionHistory history={history} partyColor={party.color} />
      </section>

      <section className="mb-8">
        <PartyPollingTrend partyName={party.name} />
      </section>

      <section className="mb-8">
        <PartyConstituencies constituencies={constituencies} />
      </section>
    </main>
  )
}
