import { useMemo } from "react";

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl")));
  } catch { return false; }
}

export function useWebGLSupport() { return useMemo(() => canUseWebGL(), []); }
