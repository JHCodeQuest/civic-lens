"use client"

import { useState } from "react"
import TermTooltip from "@/components/ui/TermTooltip"
import PlainEnglish, { PlainEnglishProvider, PlainEnglishToggle } from "@/components/ui/PlainEnglish"

type Level = "beginner" | "intermediate" | "detailed"

const levels: { key: Level; label: string }[] = [
  { key: "beginner", label: "Beginner" },
  { key: "intermediate", label: "Intermediate" },
  { key: "detailed", label: "Detailed" },
]

const sections: { title: string; level: Level; content: React.JSX.Element }[] = [
  {
    title: "The UK Parliament",
    level: "beginner",
    content: (
      <>
        <p>
          The UK Parliament is the supreme legislative body of the United Kingdom. It is{" "}
          <TermTooltip term="bicameral" definition="Having two chambers — the House of Commons and the House of Lords."><PlainEnglish complex="bicameral" simple="two-chamber" /></TermTooltip>, consisting of two chambers: the House of Commons (elected) and the
          House of Lords (appointed). The monarch is the third component, granting <TermTooltip term="Royal Assent" /> to bills.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-semibold">House of Commons</h3>
        <p>
          650 MPs are elected through the <TermTooltip term="First Past the Post" /> system, each representing a{" "}
          <TermTooltip term="constituency" definition="A geographical area represented by an MP in Parliament.">constituency</TermTooltip>. The party with the most seats typically forms the government, with
          its leader becoming Prime Minister.
        </p>
        <h3 className="mb-2 mt-6 text-lg font-semibold">House of Lords</h3>
        <p>
          The upper chamber <PlainEnglish complex="scrutinises" simple="carefully examines" /> legislation proposed by the Commons. It includes
          life peers, hereditary peers, and Lords Spiritual. The Lords can amend and delay
          bills but cannot permanently block them.
        </p>
      </>
    ),
  },
  {
    title: "How General Elections Work",
    level: "beginner",
    content: (
      <>
        <p>
          General elections must be held at least every five years. The UK is divided into
          650 <TermTooltip term="constituency" definition="A geographical area represented by an MP in Parliament.">constituencies</TermTooltip>, each electing one MP. Voters mark an X next to their preferred
          candidate, and the candidate with the most votes wins (<TermTooltip term="First Past the Post" />).
        </p>
        <p className="mt-4">
          After the election, the monarch invites the leader of the largest party to form a
          government. If no party wins a majority, a <TermTooltip term="Hung Parliament"><PlainEnglish complex="hung parliament" simple="situation where no party wins overall control" /></TermTooltip> occurs, potentially
          leading to a <TermTooltip term="Coalition Government"><PlainEnglish complex="coalition" simple="government made of two or more parties" /></TermTooltip> or <TermTooltip term="Minority Government"><PlainEnglish complex="minority government" simple="government that governs without a majority" /></TermTooltip>.
        </p>
      </>
    ),
  },
  {
    title: "First Past the Post (FPTP)",
    level: "intermediate",
    content: (
      <>
        <p>
          FPTP is the electoral system used for UK general elections. Key characteristics:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
          <li>Each voter has one vote in their local <TermTooltip term="constituency" definition="A geographical area represented by an MP in Parliament.">constituency</TermTooltip></li>
          <li>The candidate with the most votes wins, regardless of vote share</li>
          <li>There is no requirement to win 50% or more of the vote</li>
          <li>Parties can win a majority of seats without a majority of votes nationally</li>
        </ul>
        <p className="mt-4">
          FPTP tends to produce strong single-party governments but can leave many voters
          unrepresented. Smaller parties like the Greens and Liberal Democrats often win a
          smaller share of seats than their vote share would suggest.
        </p>
      </>
    ),
  },
  {
    title: "Devolution",
    level: "intermediate",
    content: (
      <>
        <p>
          Since 1997, legislative powers have been <TermTooltip term="Devolution"><PlainEnglish complex="devolved" simple="transferred" /></TermTooltip> to Scotland, Wales, and
          Northern Ireland. Each nation has its own legislature and government handling
          domestic policy areas such as health, education, and transport.
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
          <li>
            <strong>Scottish Parliament</strong> — Holyrood, Edinburgh. Has wide-ranging
            powers including income tax rates and bands.
          </li>
          <li>
            <strong>Senedd Cymru (Welsh Parliament)</strong> — Cardiff Bay. Controls
            health, education, and local government.
          </li>
          <li>
            <strong>Northern Ireland Assembly</strong> — Stormont, Belfast. Operates under
            power-sharing rules between unionist and nationalist parties.
          </li>
        </ul>
        <p className="mt-4">
          The UK Parliament at Westminster retains control over reserved matters: defence,
          foreign affairs, immigration, and overall economic policy. This is known as the{" "}
          <TermTooltip term="West Lothian Question" definition="The constitutional anomaly where MPs from Scotland, Wales, and NI can vote on English-only matters but English MPs cannot vote on devolved matters.">West Lothian Question</TermTooltip> — Scottish, Welsh, and NI MPs can vote on English-only
          matters but not vice versa.
        </p>
      </>
    ),
  },
  {
    title: "The Role of the Monarch",
    level: "beginner",
    content: (
      <>
        <p>
          The British monarch (currently King Charles III) is the head of state but
          exercises a largely ceremonial role. Key constitutional functions include:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-gray-700">
          <li>Appointing the Prime Minister (the leader of the largest party)</li>
          <li>Granting <TermTooltip term="Royal Assent" /> to bills (making them law)</li>
          <li>Opening and proroguing Parliament</li>
          <li>Serving as head of the armed forces and the Church of England</li>
        </ul>
        <p className="mt-4">
          By convention, the monarch acts on the advice of government ministers and does
          not involve themselves in political decisions. This principle is known as the
          monarch remaining politically neutral.
        </p>
      </>
    ),
  },
  {
    title: "How a Bill Becomes Law",
    level: "detailed",
    content: (
      <>
        <p>
          A bill passes through several stages in both Houses before becoming law:
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1 text-gray-700">
          <li>
            <strong>First Reading</strong> — The bill is introduced, no debate.
          </li>
          <li>
            <strong>Second Reading</strong> — MPs debate the general principles.
          </li>
          <li>
            <strong>Committee Stage</strong> — Detailed line-by-line examination.
          </li>
          <li>
            <strong>Report Stage</strong> — Further amendments can be made.
          </li>
          <li>
            <strong>Third Reading</strong> — Final debate and vote.
          </li>
          <li>
            <strong>Lords Stages</strong> — The same process repeats in the House of Lords.
          </li>
          <li>
            <strong><TermTooltip term="Royal Assent" /></strong> — The monarch formally approves the bill, making
            it an Act of Parliament.
          </li>
        </ol>
      </>
    ),
  },
]

const levelOrder: Level[] = ["beginner", "intermediate", "detailed"]

export default function LearnPage() {
  const [selected, setSelected] = useState<Level>("beginner")

  const visible = sections.filter(
    (s) => levelOrder.indexOf(s.level) <= levelOrder.indexOf(selected),
  )

  return (
    <PlainEnglishProvider>
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">Learn About UK Politics</h1>
      <p className="mb-6 text-gray-600">
        An educational guide to how the UK political system works — from Parliament and
        elections to <TermTooltip term="Devolution" /> and law-making.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {levels.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
              selected === key
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
        <span className="mx-2 text-gray-300">|</span>
        <PlainEnglishToggle />
      </div>

      <div className="space-y-10">
        {visible.map(({ title, content }) => (
          <section key={title}>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
            <div className="space-y-3 leading-relaxed text-gray-700">{content}</div>
          </section>
        ))}
      </div>
    </main>
    </PlainEnglishProvider>
  )
}
