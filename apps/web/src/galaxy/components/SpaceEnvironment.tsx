import { Sparkles, Stars } from "@react-three/drei";
import type { QualitySettings } from "@/galaxy/config";

export function SpaceEnvironment({ quality }: { quality: QualitySettings }) {
  return <>
    <Stars radius={132} depth={82} count={quality.backgroundStars} factor={2.7} saturation={.12} fade speed={.17} />
    {quality.nebulaParticles > 0 && <group>
      <Sparkles count={quality.nebulaParticles} scale={[150, 48, 135]} size={2.8} speed={.1} opacity={.38} color="#557ecc" noise={1.1} position={[0, 0, -24]} />
      <Sparkles count={Math.floor(quality.nebulaParticles * .45)} scale={[105, 25, 95]} size={3.6} speed={.08} opacity={.22} color="#9d71cf" noise={1.8} position={[23, 7, -12]} />
    </group>}
  </>;
}
