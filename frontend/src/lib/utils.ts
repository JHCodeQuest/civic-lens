export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n)
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`
}
