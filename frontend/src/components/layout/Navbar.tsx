"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { SITE_NAME, NAV_ITEMS } from "@/lib/constants"
import type { NavItem } from "@/lib/constants"
import { cn } from "@/lib/utils"
import SearchBar from "@/components/layout/SearchBar"

interface NavbarProps {
  className?: string
  items?: NavItem[]
}

export default function Navbar({ className, items = NAV_ITEMS }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [animating, setAnimating] = useState<"enter" | "leave" | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true)
    }
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  const handleToggle = useCallback(() => {
    if (open) {
      setAnimating("leave")
      setTimeout(() => {
        setOpen(false)
        setAnimating(null)
        buttonRef.current?.focus()
      }, 150)
    } else {
      setOpen(true)
      requestAnimationFrame(() => setAnimating("enter"))
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleToggle()
      }
    },
    [open, handleToggle],
  )

  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        handleToggle()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, handleToggle])

  return (
    <>
      <a
        href="#main-content"
        className="fixed -translate-x-full rounded-br bg-govuk-blue px-4 py-2 text-sm font-medium text-white transition focus:translate-x-0 focus:outline-none focus-visible:z-50 focus-visible:ring-4 focus-visible:ring-govuk-yellow"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-govuk-border bg-white/90 backdrop-blur-md transition-colors dark:border-govuk-border dark:bg-[#0b0c0c]/90",
          className,
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              "text-lg font-bold tracking-tight text-govuk-black no-underline transition-colors",
              "dark:text-white",
            )}
          >
            {SITE_NAME}
          </Link>

          <nav aria-label="Main navigation" className="hidden sm:block">
            <ul className="flex list-none items-center gap-1" role="list">
              {items.map(({ href, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "relative rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors",
                        "text-govuk-secondary-text hover:bg-govuk-light-grey hover:text-govuk-black",
                        "dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
                        isActive &&
                          "text-govuk-blue dark:text-govuk-blue",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 h-0.5 w-4/5 -translate-x-1/2 rounded-full bg-govuk-blue dark:bg-govuk-blue" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <SearchBar />

            <button
              onClick={() => setDark(!dark)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
                "text-govuk-secondary-text hover:bg-govuk-light-grey hover:text-govuk-black",
                "dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
              )}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button
              ref={buttonRef}
              onClick={handleToggle}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md transition-colors sm:hidden",
                "text-govuk-black hover:bg-govuk-light-grey",
                "dark:text-white dark:hover:bg-white/10",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            ref={menuRef}
            onKeyDown={handleKeyDown}
            style={{
              animation:
                animating === "enter"
                  ? "slide-down 0.15s ease-out forwards"
                  : animating === "leave"
                    ? "slide-up 0.15s ease-in forwards"
                    : undefined,
            }}
            className={cn(
              "border-t border-govuk-border sm:hidden",
              "dark:border-govuk-border dark:bg-[#0b0c0c]",
            )}
          >
            <SearchBar compact={false} />
            <nav aria-label="Mobile navigation">
              <ul className="flex list-none flex-col gap-1 px-4 pb-4 pt-2" role="list">
                {items.map(({ href, label }) => {
                  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => {
                          setAnimating("leave")
                          setTimeout(() => {
                            setOpen(false)
                            setAnimating(null)
                          }, 150)
                        }}
                        className={cn(
                          "block rounded-md px-3 py-3 text-base font-medium no-underline transition-colors",
                          "text-govuk-secondary-text hover:bg-govuk-light-grey hover:text-govuk-black",
                          "dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white",
                          isActive &&
                            "bg-govuk-light-grey text-govuk-blue dark:bg-white/10 dark:text-govuk-blue",
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
