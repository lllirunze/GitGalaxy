import assert from "node:assert/strict";
import test from "node:test";
import { stablePosition } from "./coordinates.ts";

test("stablePosition is deterministic and finite", () => {
  assert.deepEqual(stablePosition(1024), stablePosition(1024));
  assert.ok(Object.values(stablePosition(1024)).every(Number.isFinite));
});

test("different ids receive different positions", () => {
  assert.notDeepEqual(stablePosition(1), stablePosition(2));
});
