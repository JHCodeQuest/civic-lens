import { learnTopics } from "@/data/learn"
import LearnSection from "@/components/learn/LearnSection"
import LearnNav from "@/components/learn/LearnNav"
import { PlainEnglishProvider, PlainEnglishToggle } from "@/components/ui/PlainEnglish"

const navItems = learnTopics.map(({ id, title }) => ({ id, title }))

export default function LearnPage() {
  return (
    <PlainEnglishProvider>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-govuk-black dark:text-white">
            Learn About UK Politics
          </h1>
          <p className="text-govuk-secondary-text dark:text-gray-400">
            A beginner-friendly guide to how UK politics works — from Parliament and elections
            to MPs and constituencies.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-8">
          <aside className="mb-6 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <LearnNav items={navItems} />

              <div className="mt-4 hidden lg:block">
                <PlainEnglishToggle />
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex justify-end lg:hidden">
              <PlainEnglishToggle />
            </div>

            <div className="space-y-6">
              {learnTopics.map(({ id, title, content }) => (
                <LearnSection key={id} id={id} title={title}>
                  {content}
                </LearnSection>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PlainEnglishProvider>
  )
}
