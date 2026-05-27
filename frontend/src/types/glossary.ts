export type GlossaryCategory =
  | "parliament"
  | "elections"
  | "government"
  | "voting"
  | "parties"
  | "other"

export type GlossaryDifficulty = "beginner" | "intermediate"

export interface GlossaryEntry {
  term: string
  definition: string
  category: GlossaryCategory
  difficulty: GlossaryDifficulty
  example?: string
  relatedTerms?: string[]
}
