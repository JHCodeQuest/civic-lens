"use client"

import { useState } from "react"
import { useElectionData } from "@/hooks/useElectionData"
import { DEV_BANNER } from "@/data/elections"
import ElectionYearSelector from "@/components/election/ElectionYearSelector"
import NationalResultCards from "@/components/election/NationalResultCards"
import SeatDistributionChart from "@/components/election/SeatDistributionChart"
import VoteShareComparison from "@/components/election/VoteShareComparison"
import RegionBreakdownTable from "@/components/election/RegionBreakdownTable"
import ElectionMap from "@/components/election/ElectionMap"

export default function ElectionsPage() {
  const [selectedYear, setSelectedYear] = useState(2024)
  const { summary, previousSummary, regionBreakdown, loading, error, isDevData } = useElectionData(selectedYear)

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-govuk-black dark:text-white">Election Results</h1>
      <p className="mb-6 text-govuk-secondary-text dark:text-gray-400">
        Explore UK general election results and how they compare over time.
      </p>

      {isDevData && summary && (
        <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-700 dark:text-amber-300">
          {DEV_BANNER}
        </div>
      )}

      <div className="mb-6">
        <ElectionYearSelector selectedYear={selectedYear} onChange={setSelectedYear} />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-48">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-govuk-blue border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && summary && (
        <>
          <section className="mb-8">
            <NationalResultCards summary={summary} />
          </section>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <SeatDistributionChart parties={summary.parties} />
            <ElectionMap regions={regionBreakdown} />
          </div>

          <section className="mb-8">
            <VoteShareComparison current={summary} previous={previousSummary} />
          </section>

          <section className="mb-12">
            <RegionBreakdownTable regions={regionBreakdown} />
          </section>
        </>
      )}

      {!loading && !error && !summary && (
        <div className="text-center text-sm text-gray-400 dark:text-gray-600 py-12">
          No election data available for {selectedYear}.
        </div>
      )}

      <details className="group rounded-lg border border-gray-200 dark:border-gray-800">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-govuk-blue dark:text-govuk-blue list-none flex items-center gap-2 before:hidden">
          How UK elections work
          <svg className="ml-auto h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-4 text-sm text-gray-700 dark:text-gray-300">
          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">When Elections Happen</h3>
            <p>General elections must be held at least every five years. The Prime Minister asks the monarch to dissolve Parliament, triggering a five-week campaign period. Voting always takes place on a Thursday.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Constituencies</h3>
            <p>The UK is divided into 650 constituencies, each electing one MP. Constituency boundaries are reviewed periodically by independent boundary commissions to keep populations roughly equal.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">First Past the Post</h3>
            <p>In each constituency, voters mark one candidate. The candidate with the most votes wins — there is no requirement to reach 50%. This is called First Past the Post (FPTP).</p>
            <p className="mt-1">FPTP tends to produce single-party governments but can leave many voters unrepresented. Smaller parties often win a smaller share of seats than their national vote share would suggest.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">After the Vote</h3>
            <p>Once results are in, the monarch invites the leader of the party with the most seats to form a government. If no party wins a majority (at least 326 seats), the result is a hung parliament — leading to either a coalition government or a minority government.</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Voter ID</h3>
            <p>Since 2024, voters in England must show photo ID at polling stations. Accepted forms include a passport, driving licence, or a free Voter Authority Certificate. No ID is needed for postal or proxy votes.</p>
          </section>
        </div>
      </details>
    </main>
  )
}
