import PartyDetailView from "@/components/politics/PartyDetailView"
import { parties } from "@/data/parties"

export function generateStaticParams() {
  return parties.map((p) => ({ id: p.slug }))
}

// Next 16: `params` is a Promise and must be awaited before use.
export default async function PartyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PartyDetailView slug={id} />
}
