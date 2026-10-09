import { useGalaxyStore } from "@/stores/useGalaxyStore";

export function QualityControl({ effectiveQuality }: { effectiveQuality: "low" | "medium" | "high" }) {
  const quality = useGalaxyStore((state) => state.quality);
  const setQuality = useGalaxyStore((state) => state.setQuality);
  const choices = ["auto", "low", "medium", "high"] as const;

  return <div className="quality-control" aria-label="画质设置"><span>QUALITY {quality === "auto" ? `· ${effectiveQuality.toUpperCase()}` : ""}</span><div>{choices.map((choice) => <button key={choice} type="button" className={quality === choice ? "is-active" : ""} onClick={() => setQuality(choice)}>{choice === "auto" ? "Auto" : choice[0].toUpperCase()}</button>)}</div></div>;
}
