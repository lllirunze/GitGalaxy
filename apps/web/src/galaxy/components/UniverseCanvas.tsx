import { Canvas } from "@react-three/fiber";
import { GALAXY_CONFIG } from "@/galaxy/config";
import { CameraController } from "@/galaxy/controls/CameraController";
import { RepositoryStars } from "@/galaxy/components/RepositoryStars";
import type { GalaxyStar } from "@/types/galaxy";
import type { QualitySettings } from "@/galaxy/config";
import { SpaceEnvironment } from "@/galaxy/components/SpaceEnvironment";

export function UniverseCanvas({ onReady, stars, quality }: { onReady: () => void; stars: GalaxyStar[]; quality: QualitySettings }) {
  return <Canvas className="universe-canvas" camera={{ position: [...GALAXY_CONFIG.camera.initialPosition], fov: 52, near: .1, far: 260 }} dpr={quality.dpr} gl={{ antialias: quality.antialias, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.setClearColor("#02040b", 0); onReady(); }}>
    <fog attach="fog" args={["#02040b", 42, 105]} />
    <ambientLight intensity={.25} />
    <SpaceEnvironment quality={quality} />
    <RepositoryStars stars={stars} />
    <CameraController stars={stars} />
  </Canvas>;
}
