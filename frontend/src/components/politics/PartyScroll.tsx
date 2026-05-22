"use client"

import { useEffect } from "react"

export default function PartyScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])
  return null
}
