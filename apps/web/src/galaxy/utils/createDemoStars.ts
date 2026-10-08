import { GALAXY_CONFIG, LANGUAGE_COLORS } from "@/galaxy/config";
import type { DemoRepository } from "@/types/galaxy";

const NAMES = ["nebula/runtime", "orbit/core", "lumen/ui", "pulsar/query", "nova/engine", "atlas/sdk", "comet/data", "zenith/cli", "aurora/web", "cosmos/tools"] as const;
const LANGUAGES = ["TypeScript", "JavaScript", "Python", "Rust", "Go", "Other"] as const;

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createDemoStars(count = GALAXY_CONFIG.demoStarCount): DemoRepository[] {
  const random = mulberry32(20261008);
  return Array.from({ length: count }, (_, index) => {
    const distance = 4 + Math.pow(random(), 0.68) * GALAXY_CONFIG.starFieldRadius;
    const angle = random() * Math.PI * 2;
    const elevation = (random() - 0.5) * 0.7;
    const language = LANGUAGES[Math.floor(random() * LANGUAGES.length)];
    const stars = Math.floor(2_000 + Math.pow(random(), 2.2) * 180_000);
    return {
      id: index + 1,
      fullName: `${NAMES[index % NAMES.length]}-${String(index + 1).padStart(3, "0")}`,
      description: "第一阶段使用的确定性模拟项目，用于验证空间分布、选择交互和批量渲染。",
      language, stars,
      forks: Math.floor(stars * (0.05 + random() * 0.2)),
      color: LANGUAGE_COLORS[language],
      radius: 0.08 + Math.log10(stars) * 0.045,
      position: [Math.cos(angle) * distance, Math.sin(elevation) * distance * 0.75, Math.sin(angle) * distance],
    };
  });
}
