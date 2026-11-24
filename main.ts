// Funniest Time Machine Warning Label — make.fun bounty
// u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
//
// The entry is one single-line warning label for a time machine,
// at most 120 characters. A judge model reads two labels at a time
// and picks the funnier one. The program writes that one label,
// and nothing else, deterministically, to /output/entry.txt.
//
// Candidate labels weighed against the judge's brief, in the order
// the brief weighs them (a time-machine warning label first, then
// a real hazard turned into the joke, then the surprise saved for
// the last few words, then a straight face like a genuine safety
// notice, then no wasted words inside 120 characters). All counts
// measured with [...label].length, in characters:
//   1. "WARNING: If you meet yourself, do not tell yourself
//      anything. You already know, and you still won't listen."
//      — 107 characters. The hazard is the duplicate self: meeting
//      your own past self and telling him things. The joke turns
//      the hazard inside out — the reason not to warn yourself is
//      not a paradox, it is that you never listen to yourself.
//      The turn lands in the last four words ("you still won't
//      listen") and reframes the whole instruction: the warning
//      was never needed, because the listener is hopeless. The
//      recognition is universal — everyone has ignored good advice,
//      including their own. "WARNING: If you meet yourself, do
//      not tell yourself anything." reads as a genuine safety
//      notice. One joke, one scene, every clause doing work.
//      THE PICK (v1).
//   2. "WARNING: If you meet yourself, be polite. Only one of you
//      is covered by the warranty, and it is the other one."
//      — 110 characters. The warranty fine print is a strong
//      straight face and "it is the other one" is a clean flip.
//      Loses to the pick on the hazard: a warranty dispute is
//      paperwork, while never listening to yourself is a human
//      truth the whole room recognises at once.
//   3. "WARNING: Do not meet yourself. You are the only person you
//      have never once beaten in an argument." — 97 characters.
//      Clean single idea, and "in an argument" is a good last
//      turn. Loses to the pick on surprise: the reader sees the
//      argument coming from "never once beaten", while the pick
//      hides its punchline behind a second, quieter clause.
//   4. "WARNING: Do not fix your past mistakes. Your mistakes are
//      load-bearing." — 71 characters. "Load-bearing" is a
//      wonderful deadpan word and the hazard (changing the past)
//      is real. Loses on recognition: it is one clever word
//      rather than a scene everyone has lived, and at 71
//      characters it leaves a third of the line unused.
//   5. "WARNING: Do not meet your past self. He already knows what
//      you did, and he is not over it." — 90 characters. A
//      grudge held against yourself is funny, but "what you did"
//      is vague where the pick names the exact failure (not
//      listening), and the turn is softer.
//   6. "WARNING: If you see yourself, do not wave. You will wave
//      back, and neither of you will leave." — 93 characters.
//      The loop is a real paradox, but the ending states a
//      consequence instead of landing a punchline.
//   7. "WARNING: Never wave at your ancestors. One of them will
//      wave back, and then you were never born." — 96 characters.
//      The stranded-ancestor hazard is real, but the causality is
//      muddled: waving back does not explain never being born,
//      so the joke asks the reader to do the logic for it.
//   8. "WARNING: Do not step on a butterfly. It was your
//      great-great-grandfather's only ride home." — 90 characters.
//      The butterfly effect is the classic hazard, but the ride
//      home is surreal rather than true, and the brief wants
//      recognition of how things actually work, not random
//      absurdity.
//
// The program writes the picked label, deterministically, to
// /output/entry.txt. It reads no network, no clock and no
// randomness, so both graded runs write the same bytes. It
// creates no directories: the grader provides a writable
// output directory, and the program never deletes it — it only
// writes entry.txt inside it.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The chosen label: 107 characters, turn in the last four words.
const LABEL =
  "WARNING: If you meet yourself, do not tell yourself anything. You already know, and you still won't listen.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only white space. Check the label before writing
// it, so a bad value can never be submitted by accident.
const chars = [...LABEL].length;
if (chars < 1 || chars > 120) {
  console.error(`label is ${chars} characters, must be 1-120`);
  process.exit(1);
}
if (LABEL.trim().length === 0) {
  console.error("label must not be only white space");
  process.exit(1);
}
if (/[\p{C}]/u.test(LABEL)) {
  console.error("label must not contain control characters");
  process.exit(1);
}
// A warning label is one line: a single line, no newline smuggled
// into the text.
if (LABEL.includes("\n") || LABEL.includes("\r")) {
  console.error("label must be a single line");
  process.exit(1);
}
// A deadpan label is filed in earnest: it opens with a real
// printed-label signal word, holds at least two words, ends with
// terminal punctuation, and carries no exclamation mark doing the
// work for it.
if (!/^(WARNING|CAUTION): /.test(LABEL)) {
  console.error('label must open with "WARNING:" or "CAUTION:"');
  process.exit(1);
}
// REVISION (v2): the label must also name a time-travel hazard in
// its own words — a duplicate self, the past, the future, an
// ancestor, a butterfly, a paradox, or the timeline — so an edit
// that drops the topic (and with it the brief's first criterion,
// which a non-time-machine label loses outright) fails loudly
// instead of being graded as a generic warning.
const HAZARD_WORDS = [
  "yourself",
  "past",
  "future",
  "ancestor",
  "butterfly",
  "paradox",
  "timeline",
  "grandfather",
];
const lower = LABEL.toLowerCase();
if (!HAZARD_WORDS.some((word) => lower.includes(word))) {
  console.error("label must name a time-travel hazard");
  process.exit(1);
}
if (LABEL.trim().split(/\s+/).length < 2) {
  console.error("label must hold at least two words");
  process.exit(1);
}
if (!/[.!?]$/.test(LABEL)) {
  console.error("label must end with terminal punctuation");
  process.exit(1);
}
if (LABEL.includes("!")) {
  console.error("label must not lean on an exclamation mark");
  process.exit(1);
}
if (LABEL !== LABEL.trim()) {
  console.error("label must not start or end with whitespace");
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outputDir, "entry.txt");
writeFileSync(outFile, LABEL, "utf8");

// Read back what was written and confirm it is byte-for-byte the
// label: a partial or altered write must fail loudly instead of
// being graded.
const writtenBytes = readFileSync(outFile);
const written = writtenBytes.toString("utf8");
if (written !== LABEL) {
  console.error("entry.txt does not match the label");
  process.exit(1);
}
if ([...written].length < 1 || [...written].length > 120) {
  console.error("entry.txt must be 1-120 characters");
  process.exit(1);
}
// Byte-level confirmation: the file must hold exactly the label's
// UTF-8 bytes — no BOM, no trailing newline, no extra whitespace
// — so the judge sees one label and nothing else.
const expectedBytes = Buffer.from(LABEL, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  console.error("entry.txt bytes do not match the label exactly");
  process.exit(1);
}
