import type { GitHubRepository, Repository } from "../types.ts";

export function isEligible(repository: GitHubRepository, minStars: number) {
  return repository.stargazers_count >= minStars && !repository.archived && !repository.disabled && !repository.fork && Boolean(repository.description?.trim());
}

export function normalizeRepository(repository: GitHubRepository): Repository {
  return {
    id: repository.id,
    owner: repository.owner.login,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description?.trim() || "",
    url: repository.html_url,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    language: repository.language,
    topics: repository.topics ?? [],
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    galaxyScore: 0,
  };
}

export function deduplicate(repositories: GitHubRepository[]) {
  return [...new Map(repositories.map((repository) => [repository.id, repository])).values()];
}
