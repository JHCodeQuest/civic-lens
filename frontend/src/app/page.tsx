import Link from "next/link"
import styles from "./page.module.css"

const sections = [
  {
    href: "/learn",
    title: "Learn",
    description: "Explore how the UK political system works — Parliament, elections, devolution, and law-making.",
  },
  {
    href: "/parties",
    title: "Parties",
    description: "Browse UK political parties from across the country, their histories, and positions.",
  },
  {
    href: "/glossary",
    title: "Glossary",
    description: "Look up key political terms and concepts used in British politics.",
  },
]

export default function Home() {
  return (
    <main>
      <div className={styles.hero}>
        <h1>UK Politics App</h1>
        <p>
          Your guide to understanding UK politics — from Parliament and elections to
          political parties and key terminology.
        </p>
      </div>

      <div className={styles.grid}>
        {sections.map(({ href, title, description }) => (
          <Link key={href} href={href} className={styles.card}>
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
