interface SceneStatusProps { message: string; detail?: string }

export function SceneStatus({ message, detail }: SceneStatusProps) {
  return <div className="scene-status" role="status" aria-live="polite"><div className="loader-orbit" aria-hidden="true" /><strong>{message}</strong>{detail && <p>{detail}</p>}</div>;
}
