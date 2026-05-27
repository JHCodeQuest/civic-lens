import { type ReactNode } from "react"

interface LearnSectionProps {
  id: string
  title: string
  children: ReactNode
}

export default function LearnSection({ id, title, children }: LearnSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-sm border border-govuk-border bg-white p-5 sm:p-7 dark:border-govuk-border dark:bg-[#1a1a1a]"
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="mb-4 text-xl font-bold text-govuk-black dark:text-white"
      >
        <a href={`#${id}`} className="text-inherit no-underline hover:text-govuk-blue dark:hover:text-govuk-blue">
          {title}
        </a>
      </h2>
      <div className="space-y-3 leading-relaxed text-govuk-black dark:text-gray-300">
        {children}
      </div>
    </section>
  )
}
