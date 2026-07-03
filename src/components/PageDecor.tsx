/**
 * The fixed background of every page (DESIGN.md -> Texture): one large
 * engraved plate (the signature element), two depths of broadsheet
 * print-through, halftone corner fields, a faded postmark, frame corner
 * stars, and the bottom frame fleuron. Pure decoration — pointer-events
 * none, hidden from the a11y tree, fully static (no per-frame cost).
 */

type GhostBlock = {
  kind: "headline" | "body" | "brief" | "ad";
  text: string;
};

const GHOST_EDITION: GhostBlock[] = [
  // -- headlines ------------------------------------------------------
  { kind: "headline", text: "The Off-by-One Bandit Still at Large." },
  { kind: "headline", text: "Indentation Scandal Rocks the Capital." },
  { kind: "headline", text: "Mutable Default Haunts Respectable Family." },
  { kind: "headline", text: "Float Arithmetic Declared 'Nearly Exact'." },
  { kind: "headline", text: "Late Witness Repeats Final Number Only." },
  { kind: "headline", text: "Banker's Rounding: Honest Practice or Swindle?" },
  { kind: "headline", text: "Semicolon Suspect Released; Insufficient Evidence." },
  { kind: "headline", text: "Global Variable Escapes Custody Again." },
  { kind: "headline", text: "'NoneType' Object Has No Alibi." },
  { kind: "headline", text: "Infinite Loop Enters Third Day; Families Keep Vigil." },
  { kind: "headline", text: "Copy-Paste Ring Broken Up in Night Raid." },
  { kind: "headline", text: "Stack Overflow at the Opera House." },
  { kind: "headline", text: "Recursion Inquiry Refers Itself to Recursion Inquiry." },
  { kind: "headline", text: "Two Equals Signs Found Where One Would Do." },
  { kind: "headline", text: "Merge Conflict Settled Out of Court." },
  { kind: "headline", text: "The Missing Bracket: Reward Doubled." },
  { kind: "headline", text: "Race Condition at the Derby; Stewards Baffled." },
  { kind: "headline", text: "Import Duty Evaded by Standard Library." },
  { kind: "headline", text: "Whitespace Trial Adjourned Indefinitely." },
  { kind: "headline", text: "Comment Found Lying; Code Tells the Truth." },
  { kind: "headline", text: "Print Statement Confesses to Everything." },
  { kind: "headline", text: "Cache Declared Stale; Bakery Denies Involvement." },
  // -- longer items ---------------------------------------------------
  {
    kind: "body",
    text: "Constables report the scoundrel struck again on Tuesday, relieving an honest loop of its final iteration. Witnesses describe a range of suspicious behaviour, beginning at one and stopping, as ever, a single step short of justice.",
  },
  {
    kind: "body",
    text: "A return statement, found four spaces deeper than its station, has brought a promising function to an early end. The bureau reminds householders that a block is known by the company it keeps.",
  },
  {
    kind: "body",
    text: "The bag, sworn empty at the time of definition, was discovered upon inspection to contain the belongings of every previous caller. Physicians pronounce the list shared and the household inconsolable.",
  },
  {
    kind: "body",
    text: "The Treasury confirms that one tenth and two tenths, taken together, amount to very slightly more than three tenths, and that gentlemen comparing sums with the equals sign do so at their own peril.",
  },
  {
    kind: "body",
    text: "All three witnesses, questioned separately and at length, gave the same account, being the last one anybody told them. Counsel for the defence blames the closure; the closure declines to comment until called.",
  },
  {
    kind: "body",
    text: "A halfpenny, rounded to the nearest even farthing, has divided the town. The accountant maintains the books balance; the schoolchildren maintain otherwise, and have the ledgers to prove it.",
  },
  {
    kind: "body",
    text: "The management begs to remind subscribers that the evidence is printed exactly as the machine produced it, without correction, ornament, or mercy, and that no re-enactment has been attempted.",
  },
  {
    kind: "body",
    text: "Two threads were observed entering the counting-house by the same door at the same instant. Neither will say who wrote last. The ledger, for its part, records a number nobody remembers writing.",
  },
  {
    kind: "body",
    text: "The defendant insisted throughout that it had worked on his machine. The court has ordered the machine produced. The machine, at the time of going to press, could not be reached for comment.",
  },
  {
    kind: "body",
    text: "Inspectors called to the scene found the variable global, the scope polluted, and the neighbours moving out. A cordon has been established around the module while sanitation proceeds.",
  },
  // -- briefs ---------------------------------------------------------
  { kind: "brief", text: "It worked yesterday. — A Reader." },
  { kind: "brief", text: "☞ Have you tried reading the error?" },
  { kind: "brief", text: "The loop ran once. Once." },
  { kind: "brief", text: "☞ No theories before evidence." },
  { kind: "brief", text: "Off by one, again." },
  { kind: "brief", text: "The bug was in the other file." },
  // -- classified boxes -----------------------------------------------
  {
    kind: "ad",
    text: "WANTED — one semicolon, last seen fleeing a KeyError. Reward offered. Apply within, care of the compositor.",
  },
  {
    kind: "ad",
    text: "FOR SALE — gently-used recursion, some stack overflow. Previous owner did not read the manual and has emigrated.",
  },
  {
    kind: "ad",
    text: "TO LET — one unused variable, never touched, quiet neighbourhood. Enquire at the sign of the None.",
  },
];

/**
 * Deterministic seeded shuffle (LCG): the same sequence on server and
 * client, but a different one per layer — the composition never
 * visibly repeats. Math.random would cause a hydration mismatch.
 */
function ghostSequence(seed: number, passes: number): GhostBlock[] {
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const out: GhostBlock[] = [];
  for (let p = 0; p < passes; p++) {
    const pool = [...GHOST_EDITION];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    out.push(...pool);
  }
  return out;
}

function splitColumns(blocks: GhostBlock[], count: number): GhostBlock[][] {
  const columns: GhostBlock[][] = Array.from({ length: count }, () => []);
  blocks.forEach((block, i) => columns[i % count].push(block));
  return columns;
}

const GHOST_REAR = splitColumns(ghostSequence(0x1890, 4), 5);
const GHOST_FRONT = splitColumns(ghostSequence(0xc0de, 6), 7);

const KIND_CLASS: Record<GhostBlock["kind"], string | undefined> = {
  headline: "ghost-headline",
  body: undefined,
  brief: "ghost-brief",
  ad: "ghost-ad",
};

function GhostLayer({
  columns,
  layerClass,
}: {
  columns: GhostBlock[][];
  layerClass: string;
}) {
  return (
    <div className={`ghost-layer ${layerClass}`}>
      {columns.map((column, c) => (
        <div key={c} className="ghost-col">
          {column.map((block, i) => {
            // every so often a headline took the red plate
            const red =
              block.kind === "headline" && (c * 31 + i * 7) % 11 === 3;
            const classes = [KIND_CLASS[block.kind], red ? "ghost-red" : null]
              .filter(Boolean)
              .join(" ");
            return (
              <p key={i} className={classes || undefined}>
                {block.text}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/**
 * The counterweight plate: a dusted fingerprint whorl — the evidence
 * the glass found. Concentric interrupted rings, engraving stroke.
 */
function PrintPlate() {
  return (
    <svg viewBox="0 0 200 250" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="100" cy="125" rx="14" ry="20" strokeDasharray="40 9" />
      <ellipse cx="100" cy="125" rx="26" ry="36" strokeDasharray="24 8 38 10" />
      <ellipse cx="100" cy="125" rx="38" ry="52" strokeDasharray="46 12 28 8" />
      <ellipse cx="100" cy="125" rx="50" ry="68" strokeDasharray="22 9 52 13" />
      <ellipse cx="100" cy="125" rx="62" ry="84" strokeDasharray="58 14 30 9" />
      <ellipse cx="100" cy="125" rx="74" ry="100" strokeDasharray="26 10 60 15" />
      <ellipse cx="100" cy="125" rx="86" ry="116" strokeDasharray="64 16 34 11" />
      <path d="M86 110 Q100 98 114 112" opacity="0.7" />
      <path d="M88 138 Q102 150 116 136" opacity="0.7" />
    </svg>
  );
}

export default function PageDecor() {
  return (
    <div aria-hidden>
      <GhostLayer columns={GHOST_REAR} layerClass="ghost-rear" />
      <GhostLayer columns={GHOST_FRONT} layerClass="ghost-front" />

      <span className="print-plate hidden sm:block">
        <PrintPlate />
      </span>

      <span className="halftone-corner halftone-tl" />
      <span className="halftone-corner halftone-br" />
      <span className="postmark hidden md:flex">
        <span className="postmark-text">
          Daily
          <br />
          Edition
          <br />
          Post Paid
        </span>
      </span>

      <span className="frame-corner frame-corner-tl">✦</span>
      <span className="frame-corner frame-corner-tr">✦</span>
      <span className="frame-corner frame-corner-bl">✦</span>
      <span className="frame-corner frame-corner-br">✦</span>
      <span className="frame-fleuron-bottom">❦</span>
    </div>
  );
}
