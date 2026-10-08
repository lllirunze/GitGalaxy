const LANGUAGES = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Java", "C++", "C#", "Swift", "Kotlin"];

export function buildSearchQueries(minStars: number) {
  const global = [
    `stars:>=50000`,
    `stars:20000..49999`,
    `stars:10000..19999`,
    `stars:5000..9999`,
    `stars:${minStars}..4999`,
  ];
  const byLanguage = LANGUAGES.map((language) => `language:${JSON.stringify(language)} stars:>=${minStars}`);
  return [...global, ...byLanguage].map((query) => `${query} archived:false fork:false`);
}
