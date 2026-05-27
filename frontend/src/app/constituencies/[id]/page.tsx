import ConstituencyDetailView from "@/components/constituency/ConstituencyDetailView"
import { getDevConstituencies } from "@/data/constituencies"

export function generateStaticParams() {
  return getDevConstituencies().map((c) => ({ id: c.id }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <ConstituencyDetailView id={params.id} />
}
