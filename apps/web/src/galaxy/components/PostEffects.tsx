import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import type { QualityLevel } from "@/galaxy/config";

export function PostEffects({ quality }: { quality: QualityLevel }) {
  if (quality === "low") return null;

  return <EffectComposer enableNormalPass={false} multisampling={quality === "high" ? 4 : 0}>
    {quality === "high" && <Bloom luminanceThreshold={.18} luminanceSmoothing={.85} intensity={.58} mipmapBlur />}
    <Noise opacity={quality === "high" ? .022 : .012} premultiply />
    <Vignette offset={.28} darkness={quality === "high" ? .72 : .48} eskil={false} />
  </EffectComposer>;
}
