import { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { SceneStatus } from "@/components/layout/SceneStatus";
import { TopBar } from "@/components/layout/TopBar";
import { QualityControl } from "@/components/layout/QualityControl";
import { RepositoryPreview } from "@/components/discovery/RepositoryPreview";
import { SearchPanel } from "@/components/discovery/SearchPanel";
import { UniverseCanvas } from "@/galaxy/components/UniverseCanvas";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { useUniverseData } from "@/hooks/useUniverseData";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import { resolveQuality } from "@/galaxy/utils/quality";
import "./App.css";

function App() {
  const supportsWebGL = useWebGLSupport();
  const { universe, source, isLoading, error } = useUniverseData();
  const [sceneReady, setSceneReady] = useState(false);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);
  const isSearchOpen = useGalaxyStore((state) => state.isSearchOpen);
  const setSearchOpen = useGalaxyStore((state) => state.setSearchOpen);
  const qualityMode = useGalaxyStore((state) => state.quality);
  const quality = useMemo(() => resolveQuality(qualityMode, universe.total), [qualityMode, universe.total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape" && isSearchOpen) setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  return (
    <main className="app-shell">
      <div className="cosmic-noise" aria-hidden="true" />
      <TopBar source={source} />
      <section className="universe-stage" aria-label="GitGalaxy 三维宇宙">
        {supportsWebGL ? (
          <ErrorBoundary>
            <Suspense fallback={<SceneStatus message="正在构建星图" />}>
              <UniverseCanvas onReady={() => setSceneReady(true)} stars={universe.stars} quality={quality.settings} qualityLevel={quality.level} />
            </Suspense>
            {!sceneReady && <SceneStatus message="正在点亮开源宇宙" />}
          </ErrorBoundary>
        ) : (
          <SceneStatus message="当前设备无法启动 WebGL" detail="请启用浏览器硬件加速，或使用最新版 Chrome、Edge、Firefox 或 Safari。" />
        )}
      </section>

      <motion.section className="intro-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15 }} aria-labelledby="intro-title">
        <p className="eyebrow">OPEN SOURCE OBSERVATORY</p>
        <h1 id="intro-title">Explore the code<span>beyond the list.</span></h1>
        <p className="intro-description">{isLoading ? "正在载入开源项目星图。" : source === "live" ? `当前星图包含 ${universe.total.toLocaleString()} 个来自 GitHub 的开源项目。` : "未找到有效的项目数据，当前展示确定性模拟星图。"}</p>
      </motion.section>

      <div className="scene-legend" aria-label="场景图例">
        <span><i className="legend-dot legend-dot--blue" />TypeScript</span>
        <span><i className="legend-dot legend-dot--gold" />JavaScript</span>
        <span><i className="legend-dot legend-dot--green" />Python</span>
      </div>
      <div className="interaction-hint" aria-hidden="true"><span className="mouse-icon" />拖动旋转 · 滚轮缩放 · 点击恒星</div>
      <QualityControl effectiveQuality={quality.level} />
      {error && <p className="data-warning" role="status">数据加载失败，已切换为模拟星图。</p>}
      {isSearchOpen && <SearchPanel stars={universe.stars} />}
      {selectedStarId !== null && <RepositoryPreview stars={universe.stars} source={source} />}
    </main>
  );
}

export default App;
