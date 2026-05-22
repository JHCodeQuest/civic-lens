const terms = [
  {
    term: "First Past the Post (FPTP)",
    definition: "The electoral system used for UK general elections. The candidate with the most votes in each constituency wins, even if they don't secure a majority of votes cast.",
  },
  {
    term: "Hung Parliament",
    definition: "When no single party wins a majority of seats (at least 326) in the House of Commons. This can lead to a coalition government or a minority government.",
  },
  {
    term: "Coalition Government",
    definition: "A government formed by two or more parties working together, usually because no single party won a majority of seats in a general election.",
  },
  {
    term: "Minority Government",
    definition: "A government formed by the largest party without a majority, relying on confidence-and-supply agreements or ad-hoc support from other parties to pass legislation.",
  },
  {
    term: "Whip",
    definition: "A party official responsible for ensuring that MPs attend and vote according to the party line. The 'whip' also refers to the weekly instructions sent to MPs about upcoming votes.",
  },
  {
    term: "Backbencher",
    definition: "An MP who does not hold a ministerial or shadow ministerial position and sits on the backbenches of the House of Commons.",
  },
  {
    term: "Frontbencher",
    definition: "An MP who holds a ministerial position in government or a shadow ministerial position in opposition, sitting on the front benches of the House of Commons.",
  },
  {
    term: "Prime Minister's Questions (PMQs)",
    definition: "A weekly session in the House of Commons where the Prime Minister answers questions from MPs. Typically held every Wednesday at midday.",
  },
  {
    term: "King's Speech",
    definition: "A speech delivered by the monarch at the State Opening of Parliament, outlining the government's legislative agenda for the upcoming session.",
  },
  {
    term: "Select Committee",
    definition: "A cross-party committee of MPs that scrutinises the work of a specific government department, examining policy, spending, and administration.",
  },
  {
    term: "Public Bill",
    definition: "A bill that proposes changes to the general law of the land, introduced by a government minister or a backbench MP.",
  },
  {
    term: "Royal Assent",
    definition: "The final stage of the legislative process where the monarch formally approves a bill, making it an Act of Parliament and part of law.",
  },
  {
    term: "Devolution",
    definition: "The transfer of legislative powers from the UK Parliament to national parliaments and assemblies in Scotland, Wales, and Northern Ireland.",
  },
  {
    term: "Mandate",
    definition: "The authority granted by voters to a party or government to implement its manifesto commitments after winning an election.",
  },
  {
    term: "Swing",
    definition: "A measure of voter movement between parties. Calculated as the average of the percentage change in vote share for two parties (e.g., the swing from Conservative to Labour).",
  },
  {
    term: "Marginal Seat",
    definition: "A constituency where the winning candidate's majority is small, making it likely to change hands at the next election. Key targets for opposition parties.",
  },
  {
    term: "Safe Seat",
    definition: "A constituency where the winning party holds a large majority and is highly unlikely to lose at a general election.",
  },
  {
    term: "Recall Petition",
    definition: "A mechanism allowing constituents to force a by-election if their MP is convicted of an offence or suspended from the House. Triggered when 10% of eligible voters sign.",
  },
]

export default function GlossaryPage() {
  return (
    <main>
      <h1>Glossary of UK Political Terms</h1>
      <p>
        A reference guide to the key terms and concepts used in UK politics, from
        electoral systems to parliamentary procedure.
      </p>

      <dl>
        {terms.map(({ term, definition }) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  )
}
