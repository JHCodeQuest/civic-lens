"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/parties", label: "Parties" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-14 items-center justify-between border-b border-govuk-border bg-white px-6">
      <Link href="/" className="text-lg font-bold text-govuk-black no-underline">
        {SITE_NAME}
      </Link>

      <ul className="flex list-none gap-6">
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "text-sm text-govuk-blue no-underline underline-offset-4 transition-colors hover:underline",
                pathname === href && "font-semibold underline",
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
