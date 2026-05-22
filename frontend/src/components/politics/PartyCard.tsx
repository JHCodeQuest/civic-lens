import { PARTY_COLORS } from "@/lib/constants"
import styles from "./PartyCard.module.css"

interface PartyCardProps {
  name: string
  leader: string
  ideology: string
  description: string
}

export default function PartyCard({ name, leader, ideology, description }: PartyCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>
        <span
          className={styles.dot}
          style={{ backgroundColor: PARTY_COLORS[name] ?? "#999" }}
        />
        {name}
      </h3>
      <p className={styles.meta}>
        <strong>Leader:</strong> {leader} &middot; <strong>Ideology:</strong> {ideology}
      </p>
      <p className={styles.summary}>{description}</p>
    </div>
  )
}
