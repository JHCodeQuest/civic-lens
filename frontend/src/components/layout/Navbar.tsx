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
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex h-14 items-center justify-between bg-gray-900 px-6 text-white">
      <Link href="/" className="text-lg font-bold text-white no-underline">
        {SITE_NAME}
      </Link>

      <ul className="flex list-none gap-6">
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "text-sm text-gray-400 no-underline transition-colors hover:text-white",
                pathname === href && "font-semibold text-white",
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
