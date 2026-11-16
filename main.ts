import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const source = join(import.meta.dirname, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outputDir, "entry.png");

let sourceSize;
try {
  sourceSize = statSync(source).size;
} catch {
  console.error(`error: source image not found at ${source}`);
  process.exit(1);
}
if (sourceSize === 0) {
  console.error(`error: source image at ${source} is empty`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, target);

console.log(`wrote ${target} (${sourceSize} bytes)`);
