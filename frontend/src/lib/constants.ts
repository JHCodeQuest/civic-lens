export const PARTY_COLORS: Record<string, string> = {
  Conservative: "#0087DC",
  Labour: "#DC241f",
  "Liberal Democrat": "#FAA61A",
  "Green Party": "#02A95B",
  SNP: "#FDF38E",
  "Plaid Cymru": "#008142",
  ReformUK: "#12B6CF",
  DUP: "#D46A4C",
  SinnFéin: "#326760",
  SDLP: "#2AA82C",
  UUP: "#48A5EE",
  Alliance: "#F6CB2F",
}

export const SITE_NAME = "Civic Lens"

export interface NavItem {
  href: string
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/glossary", label: "Glossary" },
  { href: "/parties", label: "Parties" },
  { href: "/elections", label: "Elections" },
  { href: "/about", label: "About" },
]
