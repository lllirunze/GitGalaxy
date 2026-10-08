import { resolve } from "node:path";

function integer(name: string, fallback: number, minimum: number, maximum: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < minimum || value > maximum) {
    throw new Error(`${name} must be an integer between ${minimum} and ${maximum}`);
  }
  return value;
}

export interface CollectorConfig {
  token: string;
  target: number;
  minStars: number;
  output: string;
  requestDelayMs: number;
  maxRetries: number;
}

export function loadConfig(): CollectorConfig {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) throw new Error("GITHUB_TOKEN is required. Copy .env.example to .env and set it locally.");
  return {
    token,
    target: integer("COLLECTOR_TARGET", 100, 1, 5_000),
    minStars: integer("COLLECTOR_MIN_STARS", 2_000, 1, 10_000_000),
    output: resolve(process.cwd(), process.env.COLLECTOR_OUTPUT || "apps/web/public/data/universe.json"),
    requestDelayMs: integer("COLLECTOR_REQUEST_DELAY_MS", 2_100, 100, 30_000),
    maxRetries: integer("COLLECTOR_MAX_RETRIES", 3, 0, 8),
  };
}
