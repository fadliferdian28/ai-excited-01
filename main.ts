import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const source = join(repoRoot, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

let size: number;
try {
  size = statSync(source).size;
} catch {
  console.error(`error: source image not found: ${source}`);
  process.exit(1);
}
if (size === 0) {
  console.error(`error: source image is empty: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
console.log(`wrote ${dest} (${size} bytes)`);
