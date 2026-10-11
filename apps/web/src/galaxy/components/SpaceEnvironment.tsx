import { Sparkles, Stars } from "@react-three/drei";
import type { QualitySettings } from "@/galaxy/config";

export function SpaceEnvironment({ quality, spaceScale }: { quality: QualitySettings; spaceScale: number }) {
  return <>
    <Stars radius={132 * spaceScale} depth={82 * spaceScale} count={quality.backgroundStars} factor={2.7} saturation={.12} fade speed={.17} />
    {quality.nebulaParticles > 0 && <group>
      <Sparkles count={quality.nebulaParticles} scale={[150 * spaceScale, 48 * spaceScale, 135 * spaceScale]} size={2.8} speed={.1} opacity={.38} color="#557ecc" noise={1.1} position={[0, 0, -24 * spaceScale]} />
      <Sparkles count={Math.floor(quality.nebulaParticles * .45)} scale={[105 * spaceScale, 25 * spaceScale, 95 * spaceScale]} size={3.6} speed={.08} opacity={.22} color="#9d71cf" noise={1.8} position={[23 * spaceScale, 7 * spaceScale, -12 * spaceScale]} />
    </group>}
  </>;
}
