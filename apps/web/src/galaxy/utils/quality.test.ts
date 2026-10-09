import { describe, expect, it } from "vitest";
import { detectQuality, resolveQuality } from "@/galaxy/utils/quality";

describe("quality selection", () => {
  it("protects constrained devices", () => {
    expect(detectQuality(100, 4, 8)).toBe("low");
    expect(detectQuality(5_000, 12, 16)).toBe("low");
  });

  it("keeps capable devices at high quality", () => {
    expect(detectQuality(100, 12, 16)).toBe("high");
    expect(resolveQuality("medium", 100).level).toBe("medium");
  });
});
