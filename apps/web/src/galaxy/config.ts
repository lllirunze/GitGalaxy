export const GALAXY_CONFIG = {
  demoStarCount: 180,
  backgroundStarCount: 3200,
  camera: { initialPosition: [0, 14, 142] as const, minDistance: 18, maxDistance: 240 },
  starFieldRadius: 22,
} as const;

export type QualityLevel = "low" | "medium" | "high";

export interface QualitySettings {
  dpr: [number, number];
  backgroundStars: number;
  nebulaParticles: number;
  antialias: boolean;
}

export const QUALITY_SETTINGS: Record<QualityLevel, QualitySettings> = {
  low: { dpr: [1, 1], backgroundStars: 900, nebulaParticles: 0, antialias: false },
  medium: { dpr: [1, 1.35], backgroundStars: 1_800, nebulaParticles: 90, antialias: true },
  high: { dpr: [1, 1.75], backgroundStars: GALAXY_CONFIG.backgroundStarCount, nebulaParticles: 220, antialias: true },
};

export const LANGUAGE_COLORS = {
  TypeScript: "#6da8ff", JavaScript: "#f6db6d", Python: "#79d6aa",
  Rust: "#e8a47d", Go: "#67d6e5", Other: "#bdc6d7",
} as const;
