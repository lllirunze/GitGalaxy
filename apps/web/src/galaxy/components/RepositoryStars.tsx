import { useMemo, useState } from "react";
import { Instance, Instances } from "@react-three/drei";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { GalaxyStar } from "@/types/galaxy";

export function RepositoryStars({ stars }: { stars: GalaxyStar[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const selectedStar = useMemo(() => stars.find((star) => star.id === selectedStarId), [selectedStarId, stars]);
  const hoveredStar = useMemo(() => stars.find((star) => star.id === hoveredId), [hoveredId, stars]);

  return <group rotation={[.08, -.2, -.06]}>
    <Instances limit={stars.length} range={stars.length}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
      {stars.map((star) => <Instance key={star.id} position={[star.position.x, star.position.y, star.position.z]} scale={star.appearance.radius} color={star.appearance.color}
        onPointerMove={(event) => { event.stopPropagation(); setHoveredId(star.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHoveredId(null); document.body.style.cursor = "default"; }}
        onClick={(event) => { event.stopPropagation(); selectStar(star.id); }} />)}
    </Instances>
    {selectedStar && <mesh position={[selectedStar.position.x, selectedStar.position.y, selectedStar.position.z]}><sphereGeometry args={[selectedStar.appearance.radius * 2.4, 20, 20]} /><meshBasicMaterial color={selectedStar.appearance.color} transparent opacity={.08} depthWrite={false} toneMapped={false} /></mesh>}
    {hoveredStar && hoveredId !== selectedStarId && <mesh position={[hoveredStar.position.x, hoveredStar.position.y, hoveredStar.position.z]}><sphereGeometry args={[hoveredStar.appearance.radius * 1.7, 14, 14]} /><meshBasicMaterial color={hoveredStar.appearance.color} transparent opacity={.09} depthWrite={false} toneMapped={false} /></mesh>}
  </group>;
}
