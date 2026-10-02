export function getRandomItems(arr, count) {
  if (!Array.isArray(arr) || arr.length === 0) return [];

  const n = count === undefined ? arr.length : Math.floor(count);
  if (!Number.isFinite(n) || n <= 0) return [];

  const take = Math.min(n, arr.length);
  const copy = arr.slice();

  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, take);
}
