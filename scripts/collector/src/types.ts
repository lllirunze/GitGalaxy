export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
}

export interface Repository {
  id: number;
  owner: string;
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  galaxyScore: number;
}

export interface GalaxyStar {
  id: number;
  position: { x: number; y: number; z: number };
  appearance: { radius: number; color: string; glowIntensity: number };
  repository: Omit<Repository, "id" | "owner" | "name" | "createdAt" | "pushedAt" | "galaxyScore"> & {
    galaxyScore: number;
  };
}

export interface UniverseData {
  version: "1.0.0";
  generatedAt: string;
  total: number;
  stars: GalaxyStar[];
}
