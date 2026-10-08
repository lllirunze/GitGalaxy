export type GalaxyPosition = readonly [x: number, y: number, z: number];

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
