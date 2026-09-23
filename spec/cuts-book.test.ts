import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { cuts } from "../src/lib/cuts";

// The site keeps the same log its first assessment asks students to keep.
// These tests hold the site to that assessment's own spec: every entry
// dated, every entry naming a specific locatable place, and every entry
// arguing both sides of the trade rather than just asserting a cut.
const html = readFileSync(resolve("dist/cuts/index.html"), "utf8");

describe("the site's commonplace book of cuts", () => {
  it("logs at least one cut, under unique ids", () => {
    expect(cuts.length).toBeGreaterThan(0);
    expect(new Set(cuts.map((cut) => cut.id)).size).toBe(cuts.length);
  });

  it("dates every entry, and places it somewhere checkable", () => {
    for (const cut of cuts) {
      expect(cut.noticed, `${cut.id} is undated`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(cut.where.trim(), `${cut.id} names no location`).not.toBe("");
    }
  });

  it("argues both sides of every cut, not just the absence", () => {
    for (const cut of cuts) {
      expect(cut.missing.trim(), `${cut.id} does not name what is missing`).not.toBe("");
      expect(cut.cost.trim(), `${cut.id} does not say what it cost`).not.toBe("");
      expect(cut.bought.trim(), `${cut.id} does not say what it bought`).not.toBe("");
    }
  });

  // The theme only emits its own <h1> for a page carrying a hero image, so a
  // page that cuts the image has to carry its heading in the body instead.
  it("gives the book exactly one top-level heading", () => {
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it("publishes every logged cut in the book", () => {
    for (const cut of cuts) {
      expect(html, `${cut.id} is logged but never rendered`).toContain(cut.missing);
    }
  });
});
