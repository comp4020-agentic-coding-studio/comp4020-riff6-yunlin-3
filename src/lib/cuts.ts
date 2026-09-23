// The site's own Commonplace Book of Cuts --- the same log the course's
// first assessment asks students to keep, kept by the site about itself.
//
// An entry earns its place by being a cut this site actually made, at a
// place a reader can go and check. The course's marking rubric for the
// student version is explicit that range and specificity beat volume, and
// its content rules forbid padding, so this list stays short and true
// rather than filled out to look impressive.

export interface Cut {
  id: string;
  /** When the cut was made, not when it was written up. */
  noticed: string;
  /** Where a reader can go and see the absence for themselves. */
  where: string;
  missing: string;
  cost: string;
  bought: string;
}

export const cuts: Cut[] = [
  {
    id: "404-boilerplate",
    noticed: "2026-09-23",
    where: "The 404 page",
    missing:
      "The reassuring boilerplate sentence a generic error page uses instead of naming its own gap.",
    cost: "A slightly colder landing for someone who arrived here by accident.",
    bought:
      "A 404 page that argues Via Negativa's claim instead of only teaching it.",
  },
  {
    id: "404-hero",
    noticed: "2026-09-23",
    where: "The 404 page",
    missing:
      "The full-bleed hero photograph, inherited from the home page, that sat above the error message.",
    cost:
      "The error page no longer matches the visual rhythm every other page on the site keeps.",
    bought:
      "An error page that stops presenting itself as a destination, and a much lighter one for a reader who did not mean to be here.",
  },
  {
    id: "404-second-exit",
    noticed: "2026-09-23",
    where: "The 404 page",
    missing:
      "A second closing sentence that repeated the offer of a way out, one line after the first.",
    cost: "Readers who skim past the first exit are not offered another.",
    bought:
      "The page stops apologising twice, which is what made the original read like every other error page.",
  },
];

export const cutById = (id: string): Cut => {
  const cut = cuts.find((entry) => entry.id === id);
  if (!cut) throw new Error(`No cut logged under the id "${id}"`);
  return cut;
};
