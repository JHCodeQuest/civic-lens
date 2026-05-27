import PartyDetailView from "@/components/politics/PartyDetailView"
import { parties } from "@/data/parties"

export function generateStaticParams() {
  return parties.map((p) => ({ id: p.slug }))
}

export default function PartyDetailPage({ params }: { params: { id: string } }) {
  return <PartyDetailView slug={params.id} />
}
