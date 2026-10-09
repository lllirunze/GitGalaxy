import { z } from "zod";
import type { DemoRepository, GalaxyStar, UniverseData } from "@/types/galaxy";

const universeSchema = z.object({
  version: z.literal("1.0.0"),
  generatedAt: z.string().datetime(),
  total: z.number().int().nonnegative(),
  stars: z.array(z.object({
    id: z.number().int().positive(),
    position: z.object({ x: z.number().finite(), y: z.number().finite(), z: z.number().finite() }),
    appearance: z.object({ radius: z.number().positive(), color: z.string().regex(/^#[0-9a-fA-F]{6}$/), glowIntensity: z.number().min(0).max(1) }),
    repository: z.object({
      fullName: z.string().min(1), description: z.string(), url: z.url(), stars: z.number().int().nonnegative(),
      forks: z.number().int().nonnegative(), language: z.string().nullable(), topics: z.array(z.string()),
      updatedAt: z.string().datetime(), galaxyScore: z.number().min(0).max(100),
    }),
  })),
}).superRefine((data, context) => {
  if (data.total !== data.stars.length) context.addIssue({ code: "custom", message: "Universe total does not match star count" });
});

function demoToGalaxyStar(repository: DemoRepository): GalaxyStar {
  const [x, y, z] = repository.position;
  return {
    id: repository.id,
    position: { x, y, z },
    appearance: { radius: repository.radius, color: repository.color, glowIntensity: .5 },
    repository: { fullName: repository.fullName, description: repository.description, url: "https://github.com", stars: repository.stars, forks: repository.forks, language: repository.language, topics: [], updatedAt: new Date(0).toISOString(), galaxyScore: 0 },
  };
}

export async function loadUniverse(): Promise<UniverseData> {
  const response = await fetch(`${import.meta.env.BASE_URL}data/universe.json`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Universe data request failed with ${response.status}`);
  return universeSchema.parse(await response.json()) as UniverseData;
}

export function demoUniverse(stars: DemoRepository[]): UniverseData {
  return { version: "1.0.0", generatedAt: new Date(0).toISOString(), total: stars.length, stars: stars.map(demoToGalaxyStar) };
}
