import { describe, expect, it } from "vitest";
import { buildLanguageLegend, displayLanguageColor, filterStarsByLanguage, generatedLanguageColor } from "./languages";

describe("language display helpers", () => {
  it("gives an unknown language a deterministic non-default color", () => {
    expect(generatedLanguageColor("Elixir")).toBe(generatedLanguageColor("Elixir"));
    expect(displayLanguageColor("Elixir", "#B8C0CC")).not.toBe("#B8C0CC");
  });

  it("groups every language and preserves the color shown by stars", () => {
    const entries = buildLanguageLegend([
      { id: 1, position: { x: 0, y: 0, z: 0 }, appearance: { radius: 1, color: "#3178C6", glowIntensity: .5 }, repository: { fullName: "a/a", description: "a", url: "https://github.com/a/a", stars: 1, forks: 1, language: "TypeScript", topics: [], updatedAt: "2026-01-01T00:00:00.000Z", galaxyScore: 1 } },
      { id: 2, position: { x: 0, y: 0, z: 0 }, appearance: { radius: 1, color: "#B8C0CC", glowIntensity: .5 }, repository: { fullName: "b/b", description: "b", url: "https://github.com/b/b", stars: 1, forks: 1, language: "Elixir", topics: [], updatedAt: "2026-01-01T00:00:00.000Z", galaxyScore: 1 } },
      { id: 3, position: { x: 0, y: 0, z: 0 }, appearance: { radius: 1, color: "#B8C0CC", glowIntensity: .5 }, repository: { fullName: "c/c", description: "c", url: "https://github.com/c/c", stars: 1, forks: 1, language: "Elixir", topics: [], updatedAt: "2026-01-01T00:00:00.000Z", galaxyScore: 1 } },
      { id: 4, position: { x: 0, y: 0, z: 0 }, appearance: { radius: 1, color: "#B8C0CC", glowIntensity: .5 }, repository: { fullName: "d/d", description: "d", url: "https://github.com/d/d", stars: 1, forks: 1, language: null, topics: [], updatedAt: "2026-01-01T00:00:00.000Z", galaxyScore: 1 } },
    ]);
    expect(entries).toEqual(expect.arrayContaining([
      { language: "Elixir", count: 2, color: generatedLanguageColor("Elixir") },
      { language: "TypeScript", count: 1, color: "#3178C6" },
      { language: "Other", count: 1, color: "#B8C0CC" },
    ]));
  });

  it("hides only the languages deselected in the legend", () => {
    const stars = [
      { id: 1, repository: { language: "TypeScript" } },
      { id: 2, repository: { language: "Python" } },
      { id: 3, repository: { language: null } },
    ] as GalaxyStar[];
    expect(filterStarsByLanguage(stars, ["Python", "Other"]).map((star) => star.id)).toEqual([1]);
  });
});
