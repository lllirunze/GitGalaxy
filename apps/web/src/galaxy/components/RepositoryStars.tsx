import { useMemo, useState } from "react";
import { Instance, Instances } from "@react-three/drei";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { DemoRepository } from "@/types/galaxy";

export function RepositoryStars({ stars }: { stars: DemoRepository[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const selectedStar = useMemo(() => stars.find((star) => star.id === selectedStarId), [selectedStarId, stars]);
  const hoveredStar = useMemo(() => stars.find((star) => star.id === hoveredId), [hoveredId, stars]);

  return <group rotation={[.08, -.2, -.06]}>
    <Instances limit={stars.length} range={stars.length}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
      {stars.map((star) => <Instance key={star.id} position={[...star.position]} scale={star.radius} color={star.color}
        onPointerMove={(event) => { event.stopPropagation(); setHoveredId(star.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHoveredId(null); document.body.style.cursor = "default"; }}
        onClick={(event) => { event.stopPropagation(); selectStar(star.id); }} />)}
    </Instances>
    {selectedStar && <mesh position={[...selectedStar.position]}><sphereGeometry args={[selectedStar.radius * 2.4, 20, 20]} /><meshBasicMaterial color={selectedStar.color} transparent opacity={.08} depthWrite={false} toneMapped={false} /></mesh>}
    {hoveredStar && hoveredId !== selectedStarId && <mesh position={[...hoveredStar.position]}><sphereGeometry args={[hoveredStar.radius * 1.7, 14, 14]} /><meshBasicMaterial color={hoveredStar.color} transparent opacity={.09} depthWrite={false} toneMapped={false} /></mesh>}
  </group>;
}
