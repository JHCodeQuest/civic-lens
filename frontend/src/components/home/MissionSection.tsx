const values = [
  {
    title: "Accessibility",
    description:
      "Political education should not require a degree. Every concept on this site is explained in plain language, with tooltips and reading modes to meet you where you are.",
  },
  {
    title: "Transparency",
    description:
      "All content is open source. You can see exactly where the information comes from, suggest corrections, and verify everything yourself. No algorithms, no tracking, no sponsors.",
  },
  {
    title: "Political Education",
    description:
      "Understanding how Parliament works, what parties believe, and what your vote means is the foundation of democracy. This site collects what matters in one place.",
  },
  {
    title: "Reducing Confusion",
    description:
      "From hung parliaments to devolution — political jargon shuts people out. This project exists to replace confusion with clarity, one term at a time.",
  },
]

export default function MissionSection() {
  return (
    <section className="border-t border-govuk-border bg-govuk-light-grey px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-2xl font-bold text-govuk-black sm:text-3xl">Our Mission</h2>
        <p className="mb-8 max-w-3xl text-govuk-secondary-text">
          UK politics can feel opaque. This project cuts through that by providing clear,
          factual explanations of how the political system works — so you can participate
          with confidence.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map(({ title, description }) => (
            <div
              key={title}
              className="rounded-sm border border-govuk-border bg-white p-4 sm:p-6"
            >
              <h3 className="mb-2 text-lg font-semibold text-govuk-black">{title}</h3>
              <p className="text-sm leading-relaxed text-govuk-secondary-text">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
