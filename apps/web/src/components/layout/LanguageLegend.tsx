import { useMemo, useState } from "react";
import { buildLanguageLegend } from "@/galaxy/utils/languages";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import type { GalaxyStar } from "@/types/galaxy";

const PREVIEW_COUNT = 3;

export function LanguageLegend({ stars }: { stars: GalaxyStar[] }) {
  const [isExpanded, setExpanded] = useState(false);
  const languages = useMemo(() => buildLanguageLegend(stars), [stars]);
  const hiddenLanguages = useGalaxyStore((state) => state.hiddenLanguages);
  const toggleLanguageVisibility = useGalaxyStore((state) => state.toggleLanguageVisibility);
  const showAllLanguages = useGalaxyStore((state) => state.showAllLanguages);
  const hideAllLanguages = useGalaxyStore((state) => state.hideAllLanguages);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const selectStar = useGalaxyStore((state) => state.selectStar);
  const visibleLanguages = isExpanded ? languages : languages.slice(0, PREVIEW_COUNT);
  const visibleLanguageCount = languages.filter((entry) => !hiddenLanguages.includes(entry.language)).length;
  const allLanguages = languages.map((entry) => entry.language);

  return <section className={`language-legend${isExpanded ? " is-expanded" : ""}`} aria-label="编程语言颜色图例">
    <header className="language-legend__header"><span>Languages</span><small>{visibleLanguageCount}/{languages.length} visible</small></header>
    <div className="language-legend__entries" role="list">
      {visibleLanguages.map((entry) => {
        const isVisible = !hiddenLanguages.includes(entry.language);
        return <label key={entry.language} role="listitem" title={`${entry.language}: ${entry.count.toLocaleString()} projects`} className={isVisible ? "is-visible" : ""}>
          <input type="checkbox" checked={isVisible} onChange={() => {
            if (isVisible && stars.some((star) => star.id === selectedStarId && (star.repository.language ?? "Other") === entry.language)) selectStar(null);
            toggleLanguageVisibility(entry.language);
          }} aria-label={`显示 ${entry.language} 项目`} />
          <i style={{ background: entry.color, boxShadow: `0 0 8px ${entry.color}` }} /><strong>{entry.language}</strong><small>{entry.count.toLocaleString()}</small>
        </label>;
      })}
    </div>
    <footer className="language-legend__actions">
      <button type="button" className="language-legend__toggle" onClick={() => setExpanded((expanded) => !expanded)} aria-expanded={isExpanded}>{isExpanded ? "Show less" : `Show all · ${languages.length}`}</button>
      {hiddenLanguages.length ? <button type="button" className="language-legend__quick-action" onClick={showAllLanguages}>Select all</button> : <button type="button" className="language-legend__quick-action" onClick={() => { selectStar(null); hideAllLanguages(allLanguages); }}>Hide all</button>}
    </footer>
  </section>;
}
