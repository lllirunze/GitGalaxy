import { motion } from "motion/react";
import { DEMO_STARS } from "@/galaxy/data/demoStars";
import { useGalaxyStore } from "@/stores/useGalaxyStore";

export function RepositoryPreview() {
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const repository = DEMO_STARS.find((star) => star.id === selectedStarId);
  if (!repository) return null;
  return <motion.aside className="repository-preview" initial={{ opacity: 0, x: 18, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} aria-label={`${repository.fullName} 项目信息`}>
    <button className="close-button" type="button" onClick={() => selectStar(null)} aria-label="关闭项目信息">×</button>
    <p className="preview-label">SIMULATED REPOSITORY</p><h2>{repository.fullName}</h2><p>{repository.description}</p>
    <div className="preview-meta"><span>★ {repository.stars.toLocaleString()}</span><span>⑂ {repository.forks.toLocaleString()}</span><span style={{ color: repository.color }}>{repository.language}</span></div>
  </motion.aside>;
}
