import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { GalaxyStar } from "@/types/galaxy";

const RESULT_LIMIT = 8;

function matches(star: GalaxyStar, query: string) {
  const haystack = [star.repository.fullName, star.repository.description, star.repository.language ?? "", ...star.repository.topics].join(" ").toLocaleLowerCase();
  return haystack.includes(query);
}

export function SearchPanel({ stars }: { stars: GalaxyStar[] }) {
  const setSearchOpen = useGalaxyStore((state) => state.setSearchOpen);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return stars.slice(0, RESULT_LIMIT);
    return stars.filter((star) => matches(star, normalized)).slice(0, RESULT_LIMIT);
  }, [query, stars]);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);
  const choose = (star: GalaxyStar | undefined) => {
    if (!star) return;
    selectStar(star.id);
    setSearchOpen(false);
  };

  return <motion.div className="search-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onMouseDown={() => setSearchOpen(false)}>
    <motion.section className="search-panel" initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="搜索 GitHub 项目">
      <div className="search-input-wrap"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => { if (event.key === "Escape") setSearchOpen(false); if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, results.length - 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); } if (event.key === "Enter") choose(results[activeIndex]); }} placeholder="Search repositories, languages, or topics" aria-label="搜索项目" /></div>
      <div className="search-results" role="listbox" aria-label="搜索结果">{results.length ? results.map((star, index) => <button key={star.id} type="button" className={index === activeIndex ? "search-result is-active" : "search-result"} onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(star)} role="option" aria-selected={index === activeIndex}><i style={{ background: star.appearance.color }} /><span className="result-copy"><strong>{star.repository.fullName}</strong><small>{star.repository.language ?? "Other"} · ★ {star.repository.stars.toLocaleString()}</small></span><span aria-hidden="true">↗</span></button>) : <p className="search-empty">没有找到匹配的已收录项目。</p>}</div>
      <footer className="search-footer"><span><kbd>↑↓</kbd> Navigate</span><span><kbd>↵</kbd> Focus</span><span><kbd>Esc</kbd> Close</span></footer>
    </motion.section>
  </motion.div>;
}
