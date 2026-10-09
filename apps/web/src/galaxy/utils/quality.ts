import type { QualityLevel, QualitySettings } from "@/galaxy/config";
import { QUALITY_SETTINGS } from "@/galaxy/config";

export function detectQuality(starCount: number, cores = navigator.hardwareConcurrency ?? 4, memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4): QualityLevel {
  if (starCount > 2_500 || cores <= 4 || memory <= 4) return "low";
  if (cores <= 6 || memory <= 8) return "medium";
  return "high";
}

export function resolveQuality(mode: "auto" | QualityLevel, starCount: number): { level: QualityLevel; settings: QualitySettings } {
  const level = mode === "auto" ? detectQuality(starCount) : mode;
  return { level, settings: QUALITY_SETTINGS[level] };
}
