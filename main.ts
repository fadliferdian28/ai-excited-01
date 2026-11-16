// The Hug That Broke the Bottle — ai-excited-01 entrypoint.
//
// The entry is a single image the repository already holds (entry.png, a
// JPEG of a giant octopus bursting out of a shattered ship-in-a-bottle).
// This program's only job is to place those exact bytes at
// <output>/entry.png, deterministically, twice in a row.
//
// Output directory: $MAKEFUN_OUTPUT_DIR when set (the local check runs it
// with MAKEFUN_OUTPUT_DIR=out), otherwise /output, the grader's directory.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const source = join(repoDir, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly if the copy is ever short: a truncated image would fail
// the gate, and a silent partial write is worse than a loud error.
const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: ${written} of ${expected} bytes`);
}

console.log(`wrote ${target} (${written} bytes)`);
