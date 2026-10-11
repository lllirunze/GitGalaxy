const KNOWN_LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F7DF1E", Python: "#4CAF50", Rust: "#DEA584",
  Go: "#00ADD8", Java: "#E76F51", "C++": "#9B5DE5", "C#": "#68217A",
  Swift: "#FA7343", Kotlin: "#B125EA",
};

function hash(value: string) {
  let result = 2166136261;
  for (const character of value) result = Math.imul(result ^ character.charCodeAt(0), 16777619);
  return result >>> 0;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const segment = hue / 60;
  const secondary = chroma * (1 - Math.abs(segment % 2 - 1));
  const [red, green, blue] = segment < 1 ? [chroma, secondary, 0] : segment < 2 ? [secondary, chroma, 0] : segment < 3 ? [0, chroma, secondary] : segment < 4 ? [0, secondary, chroma] : segment < 5 ? [secondary, 0, chroma] : [chroma, 0, secondary];
  const match = lightness - chroma / 2;
  return `#${[red, green, blue].map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function repositoryLanguageColor(language: string | null) {
  if (!language) return "#B8C0CC";
  if (KNOWN_LANGUAGE_COLORS[language]) return KNOWN_LANGUAGE_COLORS[language];
  return hslToHex(hash(language) % 360, .62, .62);
}
