// Everyday Things, Two Lines, Longer Run
// make.fun competition: u-suga-everyday-things-two-lines-longer-run-f8734479
//
// The program writes exactly two lines to /output/entry.txt:
//   Line 1 — one vivid sentence explaining one everyday thing (an escalator)
//             to a 10-year-old, built on a single concrete analogy.
//   Line 2 — one sentence saying what the analogy maps and what it leaves out.
//
// The text is a fixed constant: no randomness, no clock, no network, no
// environment reads, so every run produces byte-identical output.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE_1 =
  "An escalator is a staircase that learned to walk, carrying you upstairs while your feet just stand and watch.";

const LINE_2 =
  "It maps steps rising one after another beneath you, but leaves out that real stairs never move and never get tired the way your legs do.";

const ENTRY = `${LINE_1}\n${LINE_2}\n`;

// Gate self-check (mirrors the sealed scorer): UTF-8 text, 1-400 chars,
// not only whitespace, exactly two lines.
const body = ENTRY.replace(/\n$/, "");
const lines = body.split("\n");
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} outside gate 1-400`);
}
if (lines.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${lines.length}`);
}
if (body.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
for (const line of lines) {
  if (line.trim().length === 0) {
    throw new Error("entry contains an empty line");
  }
  if (line !== line.trim()) {
    throw new Error("entry line has leading or trailing whitespace");
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
