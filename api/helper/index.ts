export function uuid (): string {
  return (Math.random() * 1_000_000).toFixed(0);
}