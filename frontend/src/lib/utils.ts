export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n)
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`
}
