import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraController } from "@/galaxy/controls/CameraController";
import { RepositoryStars } from "@/galaxy/components/RepositoryStars";
import type { GalaxyStar } from "@/types/galaxy";
import type { QualitySettings } from "@/galaxy/config";
import { SpaceEnvironment } from "@/galaxy/components/SpaceEnvironment";
import { PostEffects } from "@/galaxy/components/PostEffects";
import type { QualityLevel } from "@/galaxy/config";
import { displayLanguageColor, filterStarsByLanguage } from "@/galaxy/utils/languages";
import { getGalaxySpaceScale, getGalaxyViewSettings, scalePosition } from "@/galaxy/utils/space";
import { useGalaxyStore } from "@/stores/useGalaxyStore";

export function UniverseCanvas({ onReady, stars, quality, qualityLevel }: { onReady: () => void; stars: GalaxyStar[]; quality: QualitySettings; qualityLevel: QualityLevel }) {
  const hiddenLanguages = useGalaxyStore((state) => state.hiddenLanguages);
  const spaceScale = useMemo(() => getGalaxySpaceScale(stars.length), [stars.length]);
  const view = useMemo(() => getGalaxyViewSettings(spaceScale), [spaceScale]);
  const visualStars = useMemo(() => filterStarsByLanguage(stars, hiddenLanguages).map((star) => ({
    ...star,
    position: scalePosition(star.position, spaceScale),
    appearance: { ...star.appearance, color: displayLanguageColor(star.repository.language, star.appearance.color) },
  })), [hiddenLanguages, spaceScale, stars]);

  return <Canvas className="universe-canvas" camera={{ position: view.initialCameraPosition, fov: 52, near: .1, far: view.farPlane }} dpr={quality.dpr} gl={{ antialias: quality.antialias, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.setClearColor("#02040b", 0); onReady(); }}>
    <fog attach="fog" args={["#02040b", view.fogNear, view.fogFar]} />
    <ambientLight intensity={.25} />
    <SpaceEnvironment quality={quality} spaceScale={spaceScale} />
    <RepositoryStars stars={visualStars} />
    <CameraController stars={visualStars} view={view} />
    <PostEffects quality={qualityLevel} />
  </Canvas>;
}
