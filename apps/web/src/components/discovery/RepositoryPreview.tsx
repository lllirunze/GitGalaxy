import { motion } from "motion/react";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { GalaxyStar } from "@/types/galaxy";

export function RepositoryPreview({ stars, source }: { stars: GalaxyStar[]; source: "live" | "demo" }) {
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const star = stars.find((candidate) => candidate.id === selectedStarId);
  if (!star) return null;
  const { repository } = star;
  return <motion.aside className="repository-preview" initial={{ opacity: 0, x: 18, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} aria-label={`${repository.fullName} 项目信息`}>
    <button className="close-button" type="button" onClick={() => selectStar(null)} aria-label="关闭项目信息">×</button>
    <p className="preview-label">{source === "live" ? "GITHUB REPOSITORY" : "SIMULATED REPOSITORY"}</p><h2>{repository.fullName}</h2><p>{repository.description}</p>
    <div className="preview-meta"><span>★ {repository.stars.toLocaleString()}</span><span>⑂ {repository.forks.toLocaleString()}</span><span style={{ color: star.appearance.color }}>{repository.language ?? "Other"}</span></div>
    <div className="preview-topics">{repository.topics.slice(0, 4).map((topic) => <span key={topic}>{topic}</span>)}</div>
    {source === "live" && <a className="repository-link" href={repository.url} target="_blank" rel="noreferrer">Open on GitHub <span aria-hidden="true">↗</span></a>}
  </motion.aside>;
}
