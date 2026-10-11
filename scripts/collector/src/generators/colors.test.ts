import assert from "node:assert/strict";
import test from "node:test";
import { repositoryLanguageColor } from "./colors.ts";

test("repositoryLanguageColor keeps documented colors and makes every other language deterministic", () => {
  assert.equal(repositoryLanguageColor("TypeScript"), "#3178C6");
  assert.match(repositoryLanguageColor("Zig"), /^#[0-9a-f]{6}$/i);
  assert.equal(repositoryLanguageColor("Zig"), repositoryLanguageColor("Zig"));
  assert.equal(repositoryLanguageColor(null), "#B8C0CC");
});
