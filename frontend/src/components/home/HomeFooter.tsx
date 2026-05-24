import Link from "next/link"

const footerSections = [
  {
    title: "Explore",
    links: [
      { href: "/learn", label: "Learn" },
      { href: "/glossary", label: "Glossary" },
      { href: "/parties", label: "Parties" },
      { href: "/elections", label: "Elections" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About Civic Lens" },
      { href: "/about", label: "Data Sources" },
      { href: "/about", label: "Voting Resources" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "https://www.parliament.uk/", label: "UK Parliament" },
      {
        href: "https://www.electoralcommission.org.uk/",
        label: "Electoral Commission",
      },
      { href: "https://www.gov.uk/register-to-vote", label: "Register to Vote" },
    ],
  },
]

export default function HomeFooter() {
  return (
    <section className="border-t border-govuk-border bg-govuk-black px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-govuk-border">
                {title}
              </h3>
              <ul className="list-none space-y-2">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/80 no-underline transition hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-govuk-border pt-6 text-center text-sm text-govuk-border">
          <p>
            &copy; {new Date().getFullYear()} Civic Lens. All content is for educational
            purposes and politically neutral.
          </p>
        </div>
      </div>
    </section>
  )
}
