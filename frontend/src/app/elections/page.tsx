import Link from "next/link"

export default function ElectionsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-govuk-black dark:text-white">Elections</h1>
      <p className="mb-8 text-govuk-secondary-text dark:text-gray-400">
        How UK general elections work — from calling a vote to forming a government.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">When Elections Happen</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          General elections must be held at least every five years. The Prime Minister asks the
          monarch to dissolve Parliament, triggering a five-week campaign period. Voting always
          takes place on a Thursday.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Constituencies</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          The UK is divided into 650 constituencies, each electing one MP. Constituency
          boundaries are reviewed periodically by independent boundary commissions to keep
          populations roughly equal.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">First Past the Post</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          In each constituency, voters mark one candidate. The candidate with the most votes
          wins — there is no requirement to reach 50%. This is called First Past the Post
          (FPTP).
        </p>
        <p className="leading-relaxed text-govuk-black dark:text-gray-300">
          FPTP tends to produce single-party governments but can leave many voters
          unrepresented. Smaller parties often win a smaller share of seats than their
          national vote share would suggest.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">After the Vote</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          Once results are in, the monarch invites the leader of the party with the most
          seats to form a government. If no party wins a majority (at least 326 seats), the
          result is a hung parliament — leading to either a coalition government or a
          minority government.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Voter ID</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          Since 2024, voters in England must show photo ID at polling stations. Accepted forms
          include a passport, driving licence, or a free Voter Authority Certificate. No ID is
          needed for postal or proxy votes.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Get Ready to Vote</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-govuk-black dark:text-gray-300">
          <li>
            <Link
              href="https://www.gov.uk/register-to-vote"
              className="text-govuk-blue hover:underline"
            >
              Register to vote
            </Link>{" "}
            — you need to be on the electoral roll before the deadline
          </li>
          <li>
            <Link
              href="https://wheredoivote.co.uk/"
              className="text-govuk-blue hover:underline"
            >
              Find your polling station
            </Link>
          </li>
          <li>
            <Link
              href="https://www.gov.uk/voter-id"
              className="text-govuk-blue hover:underline"
            >
              Check accepted photo ID
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
