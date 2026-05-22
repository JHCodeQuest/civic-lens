import Link from "next/link"

const sections = [
  {
    href: "/learn",
    title: "Learn",
    description: "Explore how the UK political system works — Parliament, elections, devolution, and law-making.",
  },
  {
    href: "/parties",
    title: "Parties",
    description: "Browse UK political parties from across the country, their histories, and positions.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    description: "Look up key political terms and concepts used in British politics.",
  },
]

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="py-12 text-center sm:py-16">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">UK Politics App</h1>
        <p className="mx-auto max-w-2xl text-gray-600">
          Your guide to understanding UK politics — from Parliament and elections to
          political parties and key terminology.
        </p>
      </div>

      <div className="grid gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="block rounded-lg border border-gray-200 p-6 no-underline transition hover:border-gray-900 hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
