function hash32(value: string, seed: number) {
  let hash = 2166136261 ^ seed;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

export function stablePosition(repositoryId: number) {
  const key = String(repositoryId);
  const radius = 8 + Math.pow(hash32(key, 1), .7) * 92;
  const azimuth = hash32(key, 2) * Math.PI * 2;
  const z = hash32(key, 3) * 2 - 1;
  const planar = Math.sqrt(1 - z * z);
  return {
    x: Number((Math.cos(azimuth) * planar * radius).toFixed(5)),
    y: Number((z * radius * .58).toFixed(5)),
    z: Number((Math.sin(azimuth) * planar * radius).toFixed(5)),
  };
}
