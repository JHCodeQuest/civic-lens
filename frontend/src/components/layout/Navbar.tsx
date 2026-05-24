"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/glossary", label: "Glossary" },
  { href: "/parties", label: "Parties" },
  { href: "/elections", label: "Elections" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="border-b border-govuk-border bg-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-govuk-black no-underline">
          {SITE_NAME}
        </Link>

        <ul className="hidden list-none gap-6 sm:flex">
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

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded text-govuk-black hover:bg-gray-100 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-govuk-border sm:hidden">
          <ul className="flex list-none flex-col gap-1 px-4 pb-4 pt-2">
            {NAV_ITEMS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded px-3 py-3 text-base text-govuk-blue no-underline hover:bg-gray-50",
                    pathname === href && "bg-gray-50 font-semibold",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
