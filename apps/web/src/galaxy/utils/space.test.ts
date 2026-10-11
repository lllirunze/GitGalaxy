import { describe, expect, it } from "vitest";
import { DENSITY_SPREAD_MULTIPLIER, getGalaxySpaceScale, getRenderedStarPosition, scalePosition } from "./space";

describe("galaxy space scaling", () => {
  it("uses a deliberate volume expansion at the 100-repository reference", () => {
    expect(getGalaxySpaceScale(100)).toBe(DENSITY_SPREAD_MULTIPLIER);
  });

  it("uses cubic scaling to preserve three-dimensional density", () => {
    expect(getGalaxySpaceScale(1_000)).toBeCloseTo(Math.cbrt(10) * DENSITY_SPREAD_MULTIPLIER);
    expect(getGalaxySpaceScale(5_000)).toBeCloseTo(Math.cbrt(50) * DENSITY_SPREAD_MULTIPLIER);
  });

  it("scales positions without mutating their source values", () => {
    const position = { x: 2, y: -3, z: 4 };
    expect(scalePosition(position, 2)).toEqual({ x: 4, y: -6, z: 8 });
    expect(position).toEqual({ x: 2, y: -3, z: 4 });
  });

  it("uses the same rotation for a camera target as the rendered star field", () => {
    expect(getRenderedStarPosition({ x: 0, y: 0, z: 0 })).toEqual({ x: 0, y: 0, z: 0 });
    const rendered = getRenderedStarPosition({ x: 3, y: -5, z: 7 });
    expect(rendered.x).toBeCloseTo(1.250380052835501);
    expect(rendered.y).toBeCloseTo(-5.74539268962781);
    expect(rendered.z).toBeCloseTo(6.958951973209933);
  });
});
