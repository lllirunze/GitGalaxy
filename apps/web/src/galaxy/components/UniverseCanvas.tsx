import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { GALAXY_CONFIG } from "@/galaxy/config";
import { CameraController } from "@/galaxy/controls/CameraController";
import { RepositoryStars } from "@/galaxy/components/RepositoryStars";
import type { GalaxyStar } from "@/types/galaxy";

export function UniverseCanvas({ onReady, stars }: { onReady: () => void; stars: GalaxyStar[] }) {
  return <Canvas className="universe-canvas" camera={{ position: [...GALAXY_CONFIG.camera.initialPosition], fov: 52, near: .1, far: 180 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => { gl.setClearColor("#02040b", 0); onReady(); }}>
    <fog attach="fog" args={["#02040b", 42, 105]} />
    <ambientLight intensity={.25} />
    <Stars radius={72} depth={42} count={GALAXY_CONFIG.backgroundStarCount} factor={2.5} saturation={.1} fade speed={.22} />
    <RepositoryStars stars={stars} />
    <CameraController stars={stars} />
  </Canvas>;
}
