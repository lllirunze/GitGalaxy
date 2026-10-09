export type GalaxyPosition = readonly [x: number, y: number, z: number];

export interface GalaxyStar {
  id: number;
  position: { x: number; y: number; z: number };
  appearance: { radius: number; color: string; glowIntensity: number };
  repository: {
    fullName: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    topics: string[];
    updatedAt: string;
    galaxyScore: number;
  };
}

export interface UniverseData {
  version: "1.0.0";
  generatedAt: string;
  total: number;
  stars: GalaxyStar[];
}

export interface DemoRepository {
  id: number;
  fullName: string;
  description: string;
  language: "TypeScript" | "JavaScript" | "Python" | "Rust" | "Go" | "Other";
  stars: number;
  forks: number;
  color: string;
  radius: number;
  position: GalaxyPosition;
}
