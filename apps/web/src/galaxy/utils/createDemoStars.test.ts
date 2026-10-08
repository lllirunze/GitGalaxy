import { describe, expect, it } from "vitest";
import { createDemoStars } from "@/galaxy/utils/createDemoStars";

describe("createDemoStars", () => {
  it("creates the requested number of unique repositories", () => {
    const stars = createDemoStars(100);
    expect(stars).toHaveLength(100);
    expect(new Set(stars.map((star) => star.id)).size).toBe(100);
  });

  it("returns stable coordinates for the same input", () => {
    expect(createDemoStars(10)).toEqual(createDemoStars(10));
  });

  it("keeps visual values within safe positive ranges", () => {
    for (const star of createDemoStars(100)) {
      expect(star.radius).toBeGreaterThan(0);
      expect(star.stars).toBeGreaterThanOrEqual(2_000);
      expect(star.position).toHaveLength(3);
    }
  });
});
