import { Suspense, useState } from "react";
import { motion } from "motion/react";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { SceneStatus } from "@/components/layout/SceneStatus";
import { TopBar } from "@/components/layout/TopBar";
import { RepositoryPreview } from "@/components/discovery/RepositoryPreview";
import { UniverseCanvas } from "@/galaxy/components/UniverseCanvas";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { useGalaxyStore } from "@/stores/useGalaxyStore";
import "./App.css";

function App() {
  const supportsWebGL = useWebGLSupport();
  const [sceneReady, setSceneReady] = useState(false);
  const selectedStarId = useGalaxyStore((state) => state.selectedStarId);

  return (
    <main className="app-shell">
      <div className="cosmic-noise" aria-hidden="true" />
      <TopBar />
      <section className="universe-stage" aria-label="GitGalaxy 三维宇宙">
        {supportsWebGL ? (
          <ErrorBoundary>
            <Suspense fallback={<SceneStatus message="正在构建星图" />}>
              <UniverseCanvas onReady={() => setSceneReady(true)} />
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
        <p className="intro-description">每一颗恒星都将代表一个值得探索的开源项目。现在展示的是第一阶段的确定性模拟星图。</p>
      </motion.section>

      <div className="scene-legend" aria-label="场景图例">
        <span><i className="legend-dot legend-dot--blue" />TypeScript</span>
        <span><i className="legend-dot legend-dot--gold" />JavaScript</span>
        <span><i className="legend-dot legend-dot--green" />Python</span>
      </div>
      <div className="interaction-hint" aria-hidden="true"><span className="mouse-icon" />拖动旋转 · 滚轮缩放 · 点击恒星</div>
      {selectedStarId !== null && <RepositoryPreview />}
    </main>
  );
}

export default App;
