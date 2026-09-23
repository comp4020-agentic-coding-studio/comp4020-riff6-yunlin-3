import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// Via Negativa's own 404 page was generic boilerplate --- the one page on the
// site that is *literally* an omission, describing itself with the same
// copy any course site would use. This riff makes it practice what the
// course teaches: a named cut, with a cost and a benefit, right on the page
// a reader lands on by accident.
const html = readFileSync(resolve("dist/404.html"), "utf8");

describe("the 404 page enacts the course's own thesis", () => {
  it("renders a visible redaction, not just prose about redaction", () => {
    expect(html).toMatch(/class="[^"]*redaction[^"]*"/);
  });

  it("names the specific thing left out, and what it cost and bought", () => {
    expect(html).toMatch(/what.{0,20}s missing/i);
    expect(html).toMatch(/what it cost/i);
    expect(html).toMatch(/what it bought/i);
  });

  // Cutting the inherited hero image also cut the theme's only <h1>, so the
  // page now carries its heading itself --- a cut should cost what it says
  // it costs, and not quietly take the page's semantics with it.
  it("keeps exactly one top-level heading after the hero image was cut", () => {
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
    expect(html).not.toMatch(/at-hero-image/);
  });

  it("makes the reveal a real decision, not something that arrives for free", () => {
    // native <details>/<summary>, closed by default --- no `open` attribute,
    // so the note only reaches the reader who chooses to look under the cut.
    const details = html.match(/<details class="redaction"[^>]*>/);
    expect(details, "the cut is not a <details> disclosure").not.toBeNull();
    expect(details![0]).not.toMatch(/\bopen\b/);
    expect(html).toMatch(/<summary class="redaction-bar"/);
  });
});
