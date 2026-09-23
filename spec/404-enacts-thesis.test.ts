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
});
