import { useEffect, useMemo, useRef, type ElementRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { GalaxyStar } from "@/types/galaxy";
import type { getGalaxyViewSettings } from "@/galaxy/utils/space";
import { getRenderedStarPosition } from "@/galaxy/utils/space";

type GalaxyViewSettings = ReturnType<typeof getGalaxyViewSettings>;

export function CameraController({ stars, view }: { stars: GalaxyStar[]; view: GalaxyViewSettings }) {
  const controlsRef = useRef<ElementRef<typeof OrbitControls>>(null);
  const cameraResetKey = useGalaxyStore((state) => state.cameraResetKey);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectedStar = stars.find((star) => star.id === selectedStarId);
  const selectedPosition = useMemo(() => selectedStar ? getRenderedStarPosition(selectedStar.position) : null, [selectedStar]);

  useFrame((state, delta) => {
    if (!selectedPosition || !controlsRef.current) return;
    const { x, y, z } = selectedPosition;
    const smoothing = 1 - Math.exp(-delta * 3.5);
    const target = controlsRef.current.target;
    target.x += (x - target.x) * smoothing;
    target.y += (y - target.y) * smoothing;
    target.z += (z - target.z) * smoothing;
    state.camera.position.x += (x + 14 - state.camera.position.x) * smoothing;
    state.camera.position.y += (y + 8 - state.camera.position.y) * smoothing;
    state.camera.position.z += (z + 22 - state.camera.position.z) * smoothing;
    controlsRef.current.update();
  });

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.object.position.set(...view.initialCameraPosition);
    controls.target.set(0, 0, 0);
    controls.update();
    if (cameraResetKey === 0) return;
    selectStar(null);
  }, [cameraResetKey, selectStar, view]);

  return <OrbitControls ref={controlsRef} makeDefault enableDamping dampingFactor={.055} enablePan={false} minDistance={view.minCameraDistance} maxDistance={view.maxCameraDistance} rotateSpeed={.55} zoomSpeed={.7} autoRotate autoRotateSpeed={.12} />;
}
