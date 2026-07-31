import ConstituencyDetailView from "@/components/constituency/ConstituencyDetailView"
import { getDevConstituencies } from "@/data/constituencies"

// Routes are keyed by slug, not by database id — the API returns UUIDs that
// cannot be known at build time, so linking by id would 404 in the export.
export function generateStaticParams() {
  return getDevConstituencies().map((c) => ({ id: c.slug }))
}

// Next 16: `params` is a Promise and must be awaited before use.
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ConstituencyDetailView id={id} />
}
