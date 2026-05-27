import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { NAV_ITEMS } from "@/lib/constants"

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
  other: {
    "theme-color": "#1d70b8",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-govuk-black transition-colors dark:bg-[#0b0c0c] dark:text-white">
        <Navbar />
        <div id="main-content" className="flex-1">{children}</div>
        <footer className="border-t border-govuk-border bg-white px-6 py-10 text-center text-sm text-govuk-secondary-text transition-colors dark:bg-[#0b0c0c] dark:text-gray-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} Civic Lens</p>
          <nav aria-label="Footer navigation">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-x-4 gap-y-1 p-0">
              {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-govuk-blue underline-offset-2 hover:underline dark:text-govuk-blue">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  )
}
