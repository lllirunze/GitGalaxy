import { useEffect, useState } from "react";
import { DEMO_STARS } from "@/galaxy/data/demoStars";
import { demoUniverse, loadUniverse } from "@/galaxy/data/universe";
import type { UniverseData } from "@/types/galaxy";

export interface UniverseState {
  universe: UniverseData;
  source: "live" | "demo";
  isLoading: boolean;
  error: string | null;
}

const fallbackUniverse = demoUniverse(DEMO_STARS);

export function useUniverseData(): UniverseState {
  const [state, setState] = useState<UniverseState>({ universe: fallbackUniverse, source: "demo", isLoading: true, error: null });
  useEffect(() => {
    let active = true;
    loadUniverse()
      .then((universe) => { if (active) setState({ universe, source: "live", isLoading: false, error: null }); })
      .catch((error: unknown) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : "Unknown data loading error";
        setState({ universe: fallbackUniverse, source: "demo", isLoading: false, error: message });
      });
    return () => { active = false; };
  }, []);
  return state;
}
