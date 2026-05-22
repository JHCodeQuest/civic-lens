const sections = [
  {
    title: "The UK Parliament",
    content: (
      <>
        <p>
          The UK Parliament is the supreme legislative body of the United Kingdom. It is
          bicameral, consisting of two chambers: the House of Commons (elected) and the
          House of Lords (appointed). The monarch is the third component, granting Royal
          Assent to bills.
        </p>
        <h3>House of Commons</h3>
        <p>
          650 MPs are elected through the First Past the Post system, each representing a
          constituency. The party with the most seats typically forms the government, with
          its leader becoming Prime Minister.
        </p>
        <h3>House of Lords</h3>
        <p>
          The upper chamber scrutinises legislation proposed by the Commons. It includes
          life peers, hereditary peers, and Lords Spiritual. The Lords can amend and delay
          bills but cannot permanently block them.
        </p>
      </>
    ),
  },
  {
    title: "How General Elections Work",
    content: (
      <>
        <p>
          General elections must be held at least every five years. The UK is divided into
          650 constituencies, each electing one MP. Voters mark an X next to their preferred
          candidate, and the candidate with the most votes wins (First Past the Post).
        </p>
        <p>
          After the election, the monarch invites the leader of the largest party to form a
          government. If no party wins a majority, a hung parliament occurs, potentially
          leading to a coalition or minority government.
        </p>
      </>
    ),
  },
  {
    title: "First Past the Post (FPTP)",
    content: (
      <>
        <p>
          FPTP is the electoral system used for UK general elections. Key characteristics:
        </p>
        <ul>
          <li>Each voter has one vote in their local constituency</li>
          <li>The candidate with the most votes wins, regardless of vote share</li>
          <li>There is no requirement to win 50% or more of the vote</li>
          <li>Parties can win a majority of seats without a majority of votes nationally</li>
        </ul>
        <p>
          FPTP tends to produce strong single-party governments but can leave many voters
          unrepresented. Smaller parties like the Greens and Liberal Democrats often win a
          smaller share of seats than their vote share would suggest.
        </p>
      </>
    ),
  },
  {
    title: "Devolution",
    content: (
      <>
        <p>
          Since 1997, legislative powers have been devolved to Scotland, Wales, and
          Northern Ireland. Each nation has its own legislature and government handling
          domestic policy areas such as health, education, and transport.
        </p>
        <ul>
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
        <p>
          The UK Parliament at Westminster retains control over reserved matters: defence,
          foreign affairs, immigration, and overall economic policy. This is known as the
          West Lothian Question — Scottish, Welsh, and NI MPs can vote on English-only
          matters but not vice versa.
        </p>
      </>
    ),
  },
  {
    title: "The Role of the Monarch",
    content: (
      <>
        <p>
          The British monarch (currently King Charles III) is the head of state but
          exercises a largely ceremonial role. Key constitutional functions include:
        </p>
        <ul>
          <li>Appointing the Prime Minister (the leader of the largest party)</li>
          <li>Granting Royal Assent to bills (making them law)</li>
          <li>Opening and proroguing Parliament</li>
          <li>Serving as head of the armed forces and the Church of England</li>
        </ul>
        <p>
          By convention, the monarch acts on the advice of government ministers and does
          not involve themself in political decisions. This principle is known as the
          monarch remaining politically neutral.
        </p>
      </>
    ),
  },
  {
    title: "How a Bill Becomes Law",
    content: (
      <>
        <p>
          A bill passes through several stages in both Houses before becoming law:
        </p>
        <ol>
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
            <strong>Royal Assent</strong> — The monarch formally approves the bill, making
            it an Act of Parliament.
          </li>
        </ol>
      </>
    ),
  },
]

export default function LearnPage() {
  return (
    <main>
      <h1>Learn About UK Politics</h1>
      <p>
        An educational guide to how the UK political system works — from Parliament and
        elections to devolution and law-making.
      </p>

      <div>
        {sections.map(({ title, content }) => (
          <section key={title}>
            <h2>{title}</h2>
            {content}
          </section>
        ))}
      </div>
    </main>
  )
}
