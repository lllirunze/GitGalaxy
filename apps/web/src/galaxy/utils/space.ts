import type { GalaxyStar } from "@/types/galaxy";
import { GALAXY_CONFIG, STAR_FIELD_ROTATION } from "@/galaxy/config";

export const DENSITY_REFERENCE_COUNT = 100;
// Expands the rendered volume by almost 2× while retaining the same count-based scaling curve.
export const DENSITY_SPREAD_MULTIPLIER = 1.25;

export function getGalaxySpaceScale(repositoryCount: number) {
  const countScale = !Number.isFinite(repositoryCount) || repositoryCount <= DENSITY_REFERENCE_COUNT
    ? 1
    : Math.cbrt(repositoryCount / DENSITY_REFERENCE_COUNT);
  return countScale * DENSITY_SPREAD_MULTIPLIER;
}

export function scalePosition(position: GalaxyStar["position"], scale: number): GalaxyStar["position"] {
  return { x: position.x * scale, y: position.y * scale, z: position.z * scale };
}

export function getRenderedStarPosition(position: GalaxyStar["position"]): GalaxyStar["position"] {
  const [rotationX, rotationY, rotationZ] = STAR_FIELD_ROTATION;
  const cosX = Math.cos(rotationX), sinX = Math.sin(rotationX);
  const cosY = Math.cos(rotationY), sinY = Math.sin(rotationY);
  const cosZ = Math.cos(rotationZ), sinZ = Math.sin(rotationZ);
  return {
    x: cosY * cosZ * position.x - cosY * sinZ * position.y + sinY * position.z,
    y: (cosX * sinZ + sinX * sinY * cosZ) * position.x + (cosX * cosZ - sinX * sinY * sinZ) * position.y - sinX * cosY * position.z,
    z: (sinX * sinZ - cosX * sinY * cosZ) * position.x + (sinX * cosZ + cosX * sinY * sinZ) * position.y + cosX * cosY * position.z,
  };
}

export function getGalaxyViewSettings(spaceScale: number) {
  const [x, y, z] = GALAXY_CONFIG.camera.initialPosition;
  // Keep the initial view a little closer than the expanded world to make the field feel less dense.
  const initialCameraScale = spaceScale / DENSITY_SPREAD_MULTIPLIER;
  return {
    initialCameraPosition: [x * initialCameraScale, y * initialCameraScale, z * initialCameraScale] as const,
    minCameraDistance: GALAXY_CONFIG.camera.minDistance,
    maxCameraDistance: GALAXY_CONFIG.camera.maxDistance * spaceScale,
    farPlane: 260 * spaceScale,
    fogNear: 42 * spaceScale,
    fogFar: 105 * spaceScale,
  };
}
