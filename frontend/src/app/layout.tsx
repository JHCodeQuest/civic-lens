import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: {
    default: "Civic Lens — Understanding UK Politics",
    template: "%s — Civic Lens",
  },
  description:
    "Helping people understand UK politics through simple explanations, data, and interactive tools. Learn about Parliament, elections, parties, and political terminology.",
  icons: {
    icon: "/favicon.svg",
  },
}

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/parties", label: "Parties" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
  { href: "/elections", label: "Elections" },
] as const

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-govuk-black">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-govuk-border bg-white px-6 py-10 text-center text-sm text-govuk-secondary-text">
          <p className="mb-2">&copy; {new Date().getFullYear()} Civic Lens</p>
          <p>
            {FOOTER_LINKS.map(({ href, label }, i) => (
              <span key={href}>
                {i > 0 && <span className="mx-2">&middot;</span>}
                <Link href={href} className="text-govuk-blue underline-offset-2 hover:underline">
                  {label}
                </Link>
              </span>
            ))}
          </p>
        </footer>
      </body>
    </html>
  )
}
