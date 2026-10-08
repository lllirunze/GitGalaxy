import { useEffect, useRef, type ElementRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { GALAXY_CONFIG } from "@/galaxy/config";
import { useGalaxyStore } from "@/stores/useGalaxyStore";

export function CameraController() {
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  const cameraResetKey = useGalaxyStore((state) => state.cameraResetKey);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const { camera } = useThree();

  useEffect(() => {
    if (cameraResetKey === 0) return;
    camera.position.set(...GALAXY_CONFIG.camera.initialPosition);
    controlsRef.current?.reset();
    selectStar(null);
  }, [camera, cameraResetKey, selectStar]);

  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={.055} enablePan={false} minDistance={GALAXY_CONFIG.camera.minDistance} maxDistance={GALAXY_CONFIG.camera.maxDistance} rotateSpeed={.55} zoomSpeed={.7} autoRotate autoRotateSpeed={.12} />;
}
