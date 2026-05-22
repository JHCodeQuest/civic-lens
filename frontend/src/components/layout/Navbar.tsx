"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SITE_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"
import styles from "./Navbar.module.css"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/parties", label: "Parties" },
  { href: "/glossary", label: "Glossary" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>
        {SITE_NAME}
      </Link>

      <ul className={styles.links}>
        {NAV_ITEMS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                styles.link,
                pathname === href && styles.linkActive,
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
