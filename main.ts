import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Moon finally answers back: one line, spoken as the Moon to everyone
// who has ever stared up at it, wished on it, howled at it, or made it a
// late-night promise. First person, because the Moon is the one talking;
// the turn lands on the last clause — after four billion years of
// listening, nobody has ever wished anything back for the Moon.
const LINE =
  "I have heard four billion years of wishes, howls and 2 a.m. promises \u2014 and not one of you has ever wished me a good night back.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 240) {
    throw new Error(`line must be 1-240 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  // No control characters (other than the newline check above, which is
  // already rejected as a multi-line entry).
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("line must not contain control characters");
  }
}

validate(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${LINE.length} characters)`);
