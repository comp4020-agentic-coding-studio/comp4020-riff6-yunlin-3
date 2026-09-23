import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The theme emits its own <h1> only for a page carrying a hero image, so a
// page configured with `heroTitle` alone silently ships with no top-level
// heading at all --- which is how three index pages came to have none. The
// build's axe pass does not catch it, because a missing h1 is a
// best-practice failure rather than a WCAG one. This does.
const pages = globSync("**/*.html", { cwd: resolve("dist") }).sort();

describe("every page announces itself", () => {
  it("found pages to check", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it.each(pages)("%s has exactly one top-level heading", (page) => {
    const html = readFileSync(resolve("dist", page), "utf8");
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });
});
