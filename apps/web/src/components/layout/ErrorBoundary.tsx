import { Component, type ErrorInfo, type ReactNode } from "react";
import { SceneStatus } from "@/components/layout/SceneStatus";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("GitGalaxy scene failed to render", error, info.componentStack); }
  render() { return this.state.hasError ? <SceneStatus message="星图渲染失败" detail="请刷新页面重试，或检查浏览器硬件加速设置。" /> : this.props.children; }
}
