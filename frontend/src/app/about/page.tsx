import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-govuk-black dark:text-white">About</h1>
      <p className="mb-10 text-govuk-secondary-text dark:text-gray-400">
        Why this project exists and how it works.
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Mission</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          This app exists for one reason: to help me understand UK politics well enough
          to cast an informed vote at the next general election.
        </p>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          UK politics can feel opaque — between arcane parliamentary procedure, a
          first-past-the-post voting system, and parties that span four nations, it is
          hard to know where to start. This project distils what I have learned into
          a single place: how Parliament works, what parties stand for, and what the
          terminology actually means.
        </p>
        <p className="leading-relaxed text-govuk-black dark:text-gray-300">
          Every citizen deserves to walk into a polling station and understand what
          their vote means. That is the goal here.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Transparency</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          All content is written openly — you can see exactly what information is
          presented and suggest corrections. There are no algorithms, no tracking,
          and no sponsors. The party descriptions are factual summaries of each
          party&apos;s own stated positions, not endorsements.
        </p>
        <p className="leading-relaxed text-govuk-black dark:text-gray-300">
          The full source code is available on{" "}
          <Link
            href="https://github.com/JHCodeQuest/civic-lens"
            className="text-govuk-blue hover:underline dark:text-govuk-blue"
          >
            GitHub
          </Link>
          . If something is wrong or misleading, open an issue or pull request.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Data Sources</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          Party information is compiled from official party websites, manifestos, and
          publicly available records. Electoral system descriptions are based on the
          official UK Parliament website and the Electoral Commission.
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-govuk-secondary-text dark:text-gray-400">
          <li>
            <Link
              href="https://www.parliament.uk/"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              UK Parliament
            </Link>
          </li>
          <li>
            <Link
              href="https://www.electoralcommission.org.uk/"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              Electoral Commission
            </Link>
          </li>
          <li>
            <Link
              href="https://www.ons.gov.uk/"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              Office for National Statistics
            </Link>
          </li>
          <li>Official party websites and published manifestos</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-govuk-black dark:text-white">Voting Resources</h2>
        <p className="mb-3 leading-relaxed text-govuk-black dark:text-gray-300">
          Ready to vote? Make sure you are registered before the deadline. Check your
          polling station and bring accepted photo ID (introduced for 2024 elections
          onwards in England).
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-govuk-secondary-text dark:text-gray-400">
          <li>
            <Link
              href="https://www.gov.uk/register-to-vote"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              Register to vote (GOV.UK)
            </Link>
          </li>
          <li>
            <Link
              href="https://www.gov.uk/get-on-electoral-register"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              Check your electoral registration
            </Link>
          </li>
          <li>
            <Link
              href="https://wheredoivote.co.uk/"
              className="text-govuk-blue hover:underline dark:text-govuk-blue"
            >
              Find your polling station
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
