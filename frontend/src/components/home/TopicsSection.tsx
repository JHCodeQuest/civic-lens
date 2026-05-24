import Link from "next/link"

const topics = [
  {
    title: "The UK Parliament",
    description:
      "How the House of Commons, House of Lords, and monarch work together to govern the country.",
    href: "/learn",
  },
  {
    title: "General Elections",
    description:
      "How elections work — from calling a vote to forming a government — explained step by step.",
    href: "/learn",
  },
  {
    title: "First Past the Post",
    description:
      "Understanding the voting system used in UK general elections and how it affects representation.",
    href: "/learn",
  },
  {
    title: "Devolution",
    description:
      "How power is shared between Westminster and the nations of Scotland, Wales, and Northern Ireland.",
    href: "/learn",
  },
  {
    title: "How Laws Are Made",
    description:
      "The journey of a bill through Parliament — from first reading to royal assent.",
    href: "/learn",
  },
  {
    title: "Key Political Terms",
    description:
      "Clear definitions of essential UK political terminology, from backbenchers to by-elections.",
    href: "/glossary",
  },
]

export default function TopicsSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">
        Featured Learning Topics
      </h2>
      <p className="mb-8 text-govuk-secondary-text">
        Start with these key topics to build your understanding of UK politics from the
        ground up.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map(({ title, description, href }) => (
          <Link
            key={title}
            href={href}
            className="rounded-sm border border-govuk-border bg-white p-4 no-underline transition hover:border-l-govuk-blue hover:bg-govuk-light-grey sm:p-6 border-l-4"
          >
            <h3 className="mb-2 text-lg font-semibold text-govuk-black">{title}</h3>
            <p className="text-sm leading-relaxed text-govuk-secondary-text">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
