import type { GalaxyStar } from "@/types/galaxy";

const DEFAULT_OTHER_COLOR = "#B8C0CC";

const KNOWN_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Python: "#4CAF50", Rust: "#DEA584",
  Go: "#00ADD8", Java: "#E76F51", "C++": "#9B5DE5", "C#": "#68217A",
  Swift: "#FA7343", Kotlin: "#B125EA",
};

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = hue / 60;
  const secondary = chroma * (1 - Math.abs(segment % 2 - 1));
  const [red, green, blue] = segment < 1 ? [chroma, secondary, 0] : segment < 2 ? [secondary, chroma, 0] : segment < 3 ? [0, chroma, secondary] : segment < 4 ? [0, secondary, chroma] : segment < 5 ? [secondary, 0, chroma] : [chroma, 0, secondary];
  const offset = lightness - chroma / 2;
  return `#${[red, green, blue].map((channel) => Math.round((channel + offset) * 255).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function generatedLanguageColor(language: string) {
  return hslToHex(hash(language) % 360, .62, .62);
}

export function displayLanguageColor(language: string | null, sourceColor: string) {
  if (!language) return sourceColor;
  if (sourceColor.toUpperCase() !== DEFAULT_OTHER_COLOR) return sourceColor;
  return KNOWN_LANGUAGE_COLORS[language] ?? generatedLanguageColor(language);
}

export interface LanguageLegendEntry {
  language: string;
  color: string;
  count: number;
}

export function buildLanguageLegend(stars: GalaxyStar[]): LanguageLegendEntry[] {
  const entries = new Map<string, LanguageLegendEntry>();
  for (const star of stars) {
    const language = star.repository.language ?? "Other";
    const existing = entries.get(language);
    if (existing) existing.count += 1;
    else entries.set(language, { language, count: 1, color: displayLanguageColor(star.repository.language, star.appearance.color) });
  }
  return [...entries.values()].sort((left, right) => right.count - left.count || left.language.localeCompare(right.language));
}

export function filterStarsByLanguage(stars: GalaxyStar[], hiddenLanguages: readonly string[]) {
  const hidden = new Set(hiddenLanguages);
  return stars.filter((star) => !hidden.has(star.repository.language ?? "Other"));
}
