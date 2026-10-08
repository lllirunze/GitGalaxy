import type { Repository } from "../types.ts";

export function selectDiverse(repositories: Repository[], target: number) {
  const groups = new Map<string, Repository[]>();
  for (const repository of repositories) {
    const key = repository.language ?? "Other";
    const group = groups.get(key) ?? [];
    group.push(repository);
    groups.set(key, group);
  }
  const selected: Repository[] = [];
  const selectedIds = new Set<number>();
  const languageTarget = Math.min(target, Math.floor(target * .75));
  const queues = [...groups.values()].sort((a, b) => b.length - a.length);
  while (selected.length < languageTarget && queues.some((queue) => queue.length > 0)) {
    for (const queue of queues) {
      const repository = queue.shift();
      if (repository && selected.length < languageTarget) {
        selected.push(repository);
        selectedIds.add(repository.id);
      }
    }
  }
  for (const repository of repositories) {
    if (selected.length >= target) break;
    if (!selectedIds.has(repository.id)) selected.push(repository);
  }
  return selected.sort((a, b) => b.galaxyScore - a.galaxyScore);
}
