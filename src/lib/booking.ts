export function generateBookingId(): string {
  const segment = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LUM-${segment}-${random}`;
}

export function createQrPattern(seed: string, size = 11): boolean[][] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i);
  }

  const grid: boolean[][] = [];

  for (let row = 0; row < size; row++) {
    const cells: boolean[] = [];
    for (let col = 0; col < size; col++) {
      const inFinder =
        (row < 3 && col < 3) ||
        (row < 3 && col >= size - 3) ||
        (row >= size - 3 && col < 3);

      if (inFinder) {
        const localRow = row < 3 ? row : row - (size - 3);
        const localCol = col < 3 ? col : col - (size - 3);
        const outer = localRow === 0 || localRow === 2 || localCol === 0 || localCol === 2;
        const inner = localRow === 1 && localCol === 1;
        cells.push(outer || inner);
      } else {
        hash = Math.imul(hash ^ (hash >>> 13), 1 | hash);
        cells.push((hash & 1) === 1);
      }
    }
    grid.push(cells);
  }

  return grid;
}
