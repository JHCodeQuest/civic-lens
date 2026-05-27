import type { ReactNode } from "react"
import TermTooltip from "@/components/ui/TermTooltip"
import PlainEnglish from "@/components/ui/PlainEnglish"

export interface LearnTopic {
  id: string
  title: string
  content: ReactNode
  searchText: string
}

export const learnTopics: LearnTopic[] = [
  {
    id: "what-is-parliament",
    title: "What is Parliament?",
    searchText: "Parliament is the group of people who make and change laws for the United Kingdom. It has three parts: the House of Commons, the House of Lords, and the monarch. Parliament makes laws, debates issues, checks the work of government, and approves public spending.",
    content: (
      <>
        <p>
          Parliament is the group of people who make and change laws for the United Kingdom.
          It meets at the Palace of Westminster in London — the building with Big Ben.
        </p>
        <p>
          The UK Parliament has three parts:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>The House of Commons</strong> — 650 elected <TermTooltip term="MP (Member of Parliament)">MPs</TermTooltip> who debate and vote on laws
          </li>
          <li>
            <strong>The House of Lords</strong> — appointed members who review and suggest changes to proposed laws
          </li>
          <li>
            <strong>The monarch</strong> (currently King Charles III) — gives final approval to bills (called <TermTooltip term="Royal Assent" />)
          </li>
        </ul>
        <p>
          Parliament's main jobs are: making laws, debating important issues, checking the work of the government,
          and approving how public money is spent. Together, the two chambers create a system of checks and balances.
        </p>
        <p>
          The term <TermTooltip term="Parliament" /> can also refer to the period between general elections — a
          <PlainEnglish complex="parliamentary term" simple="session" /> usually lasts up to five years.
        </p>
        <p className="rounded-sm bg-govuk-light-grey p-3 text-sm dark:bg-white/5">
          <strong>Key point:</strong> Parliament is different from the government. The government runs the country day-to-day.
          Parliament holds the government to account.
        </p>
      </>
    ),
  },
  {
    id: "house-of-commons",
    title: "What is the House of Commons?",
    searchText: "The House of Commons is the elected chamber of Parliament with 650 MPs who debate and vote on laws. The party with the most seats forms the government. PMQs happens every Wednesday. The Speaker keeps order during debates.",
    content: (
      <>
        <p>
          The House of Commons is the <PlainEnglish complex="primary" simple="main" /> chamber of Parliament.
          It is the only part that is directly elected by voters, which makes it the most powerful chamber.
        </p>
        <p>
          It has 650 <TermTooltip term="MP (Member of Parliament)">Members of Parliament (MPs)</TermTooltip>, each elected to represent a <TermTooltip term="constituency">constituency</TermTooltip>.
          The political party that wins the most seats in a general election usually forms the government,
          and its leader becomes <TermTooltip term="Prime Minister">Prime Minister</TermTooltip>.
        </p>
        <p>
          Key things that happen in the Commons:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>Laws are proposed, debated, and voted on</li>
          <li><TermTooltip term="Prime Minister's Questions (PMQs)">PMQs</TermTooltip> happens every Wednesday — the PM answers questions from MPs</li>
          <li>Ministers are held to account by <PlainEnglish complex="scrutiny" simple="questioning" /> from other MPs</li>
          <li>Government spending is debated and approved</li>
        </ul>
        <p>
          The Speaker of the House keeps order during debates and makes sure all MPs get a fair chance to speak.
          The current Speaker is Sir Lindsay Hoyle.
        </p>
      </>
    ),
  },
  {
    id: "house-of-lords",
    title: "What is the House of Lords?",
    searchText: "The House of Lords is the unelected second chamber of Parliament that reviews laws passed by the Commons. Members are appointed as life peers, lords spiritual, or hereditary peers. They can amend and delay bills but cannot block them permanently.",
    content: (
      <>
        <p>
          The House of Lords is the <PlainEnglish complex="upper chamber" simple="second chamber" /> of Parliament. Unlike the Commons, its members
          are not elected — they are appointed or inherit their position. It acts as a
          <PlainEnglish complex="revising chamber" simple="review chamber" />, checking laws passed by the Commons and suggesting improvements.
        </p>
        <p>
          The Lords has around 800 members, including:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Life peers</strong> — appointed for their expertise in areas like science, business, or public service
          </li>
          <li>
            <strong>Lords Spiritual</strong> — senior bishops of the Church of England
          </li>
          <li>
            <strong>Hereditary peers</strong> — a small number who inherited their title (mostly abolished in 1999)
          </li>
        </ul>
        <p>
          The Lords can <TermTooltip term="amend" definition="To change or modify a proposed law by adding, removing, or editing specific parts.">amend</TermTooltip> (change) bills and delay them for up to a year, but they cannot block them permanently.
          The Commons has the final say because it is elected. This is called <TermTooltip term="Parliament">parliamentary sovereignty</TermTooltip>.
        </p>
        <p className="rounded-sm bg-govuk-light-grey p-3 text-sm dark:bg-white/5">
          <strong>Why have an unelected chamber?</strong> The Lords provides expertise and independent review without
          being influenced by election cycles. Critics argue it is undemocratic and should be reformed or replaced.
        </p>
      </>
    ),
  },
  {
    id: "what-is-an-mp",
    title: "What does an MP do?",
    searchText: "An MP is a Member of Parliament elected by voters in a constituency to represent them in the House of Commons. MPs debate and vote on laws, help local constituents with issues, hold the government to account, and serve on committees. Most belong to a political party and follow the whip.",
    content: (
      <>
        <p>
          An MP (Member of Parliament) is someone elected by voters in a local area to represent them
          in the House of Commons. There are 650 MPs — one for each <TermTooltip term="constituency">constituency</TermTooltip> in the UK.
        </p>
        <p>
          An MP's main roles are:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Representing their constituency</strong> — helping local people with issues like housing,
            benefits, or healthcare (called <PlainEnglish complex="casework" simple="helping individuals with their problems" />)
          </li>
          <li>
            <strong>Debating and voting on laws</strong> — attending Parliament to discuss proposed legislation
          </li>
          <li>
            <strong>Holding the government to account</strong> — asking questions in debates and committee meetings
          </li>
          <li>
            <strong>Helping shape policy</strong> — serving on committees that examine bills in detail
          </li>
        </ul>
        <p>
          MPs split their time between London (when Parliament is sitting) and their constituency,
          where they hold <TermTooltip term="surgery" definition="A regular meeting where constituents can speak to their MP in person about issues or concerns.">surgeries</TermTooltip> — local drop-in sessions where constituents can raise concerns in person.
        </p>
        <p>
          Most MPs belong to a political party and are expected to vote with their party (called
          following the <TermTooltip term="Whip">whip</TermTooltip>). MPs who vote against their party are said to <PlainEnglish complex="rebel" simple="vote against their party" />.
        </p>
      </>
    ),
  },
  {
    id: "what-is-a-constituency",
    title: "What is a constituency?",
    searchText: "A constituency is a local voting area that elects one MP to Parliament. There are 650 constituencies across the UK, each with roughly 70,000 to 80,000 voters. Types include safe seats and marginal seats. Boundaries are reviewed periodically by independent commissions.",
    content: (
      <>
        <p>
          A constituency is a local area that elects one MP to represent it in Parliament.
          Think of it as a <PlainEnglish complex="electoral district" simple="voting area" /> — every part of the UK belongs to exactly one constituency.
        </p>
        <p>
          There are 650 constituencies across the UK, each containing roughly the same number of voters
          (around 70,000 to 80,000 people). Independent boundary commissions review the boundaries
          every few years to keep populations balanced.
        </p>
        <p>
          Types of constituencies:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong><TermTooltip term="Safe Seat">Safe seats</TermTooltip></strong> — the same party wins every election by a large margin
          </li>
          <li>
            <strong><TermTooltip term="Marginal Seat">Marginal seats</TermTooltip></strong> — the winning margin is small, so the seat could change party at the next election
          </li>
        </ul>
        <p>
          The name of your constituency depends on where you live. You can find out your constituency
          and who your MP is on the UK Parliament website.
        </p>
        <p className="rounded-sm bg-govuk-light-grey p-3 text-sm dark:bg-white/5">
          <strong>Fun fact:</strong> The largest constituency by area is Ross, Skye and Lochaber in Scotland.
          The smallest is Islington North in London.
        </p>
      </>
    ),
  },
  {
    id: "polling-and-opinion",
    title: "Polling and Opinion",
    searchText: "Opinion polls measure how people intend to vote. Companies like YouGov, Ipsos, and Opinium survey representative samples. Polls have a margin of error around 3%. Trends matter more than individual polls. The polling page shows national figures and interactive charts.",
    content: (
      <>
        <p>
          Opinion polls are surveys that measure how people intend to vote. Polling companies
          like YouGov, Ipsos, and Opinium regularly ask a representative sample of the public
          who they would vote for if there were a general election tomorrow.
        </p>
        <p>
          Polls give a snapshot of public opinion, but they are not predictions. A poll with a
          sample of 1,000 people typically has a margin of error of around 3%. This means the
          true figure could be 3% higher or lower than what the poll reports.
        </p>
        <p>
          Key things to understand about polling:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Sample size matters</strong> — larger samples give more reliable results
          </li>
          <li>
            <strong>Different companies</strong> may show slightly different results due to methodology
          </li>
          <li>
            <strong>Trends matter more</strong> than individual polls — look at changes over time
          </li>
          <li>
            <strong>Don&apos;t knows</strong> are usually excluded from voting intention figures
          </li>
        </ul>
        <p>
          Our <a href="/polling" className="text-[#1d70b8] underline hover:text-[#003078] transition-colors">polling page</a> shows the latest national figures and how they have
          changed over time, with interactive charts you can explore.
        </p>
        <p className="rounded-sm bg-govuk-light-grey p-3 text-sm dark:bg-white/5">
          <strong>Remember:</strong> Polls are a useful guide, but they can get things wrong.
          The 2015 and 2017 general elections both surprised the pollsters.
        </p>
      </>
    ),
  },
  {
    id: "how-elections-work",
    title: "How do UK elections work?",
    searchText: "General elections are held at least every five years. Voters choose their local MP using First Past the Post. The candidate with the most votes wins. The party with the most MPs forms the government. A majority government needs 326 or more seats. Hung parliaments can lead to coalitions or minority governments.",
    content: (
      <>
        <p>
          General elections are when the whole country votes to choose their local MP, which
          determines which party forms the government. Elections must be held at least every five years,
          though the Prime Minister can call one earlier.
        </p>
        <p>
          The election process step-by-step:
        </p>
        <ol className="list-inside list-decimal space-y-1">
          <li>The Prime Minister asks the monarch to dissolve (end) Parliament</li>
          <li>A five-week campaign period follows — parties publish their <TermTooltip term="Manifesto">manifestos</TermTooltip></li>
          <li>Voting day is always a Thursday</li>
          <li>Each voter marks one candidate in their local constituency</li>
          <li>
            The candidate with the most votes wins — this is called <TermTooltip term="First Past the Post (FPTP)">First Past the Post</TermTooltip>
          </li>
          <li>The party with the most MPs is invited to form the government</li>
        </ol>
        <p>
          If one party wins more than half the seats (326 or more), it forms a <TermTooltip term="Majority Government">majority government</TermTooltip>.
          If no party reaches 326 seats, the result is a <TermTooltip term="Hung Parliament">hung parliament</TermTooltip>,
          which can lead to a <TermTooltip term="Coalition">coalition</TermTooltip> or <TermTooltip term="Minority Government">minority government</TermTooltip>.
        </p>
        <p>
          Since 2024, voters in England must show photo ID at polling stations. Accepted forms include
          a passport, driving licence, or a free Voter Authority Certificate.
        </p>
        <p className="rounded-sm bg-govuk-light-grey p-3 text-sm dark:bg-white/5">
          <strong>Key point:</strong> You do not vote for the Prime Minister directly. You vote for your local MP.
          The PM is the leader of the party that wins the most seats.
        </p>
      </>
    ),
  },
]
