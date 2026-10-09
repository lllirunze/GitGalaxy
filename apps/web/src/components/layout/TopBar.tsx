import { useGalaxyStore } from "@/stores/useGalaxyStore";

export function TopBar({ source }: { source: "live" | "demo" }) {
  const resetCamera = useGalaxyStore((state) => state.resetCamera);
  const label = source === "live" ? "LIVE UNIVERSE" : "DEMO UNIVERSE";
  return <header className="topbar"><a className="brand" href="/" aria-label="GitGalaxy 首页"><span className="brand-mark" aria-hidden="true" />GitGalaxy</a><div className="topbar-actions"><div className="status-pill" aria-label="当前数据状态"><i className="status-dot" />{label}</div><button className="topbar-button" type="button" onClick={resetCamera}><span>RESET VIEW</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11a8 8 0 1 1 2.34 5.66M4 16v-5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div></header>;
}
