export const ROWS = 8;
export const COLS = 10;
export const TOTAL_SEATS = ROWS * COLS;
export const RESERVED_RATIO = 0.3;
export const TICKET_PRICE = 12;

const ROW_LABELS = "ABCDEFGH".split("");

export type SeatId = string;

export function seatId(row: number, col: number): SeatId {
  return `${ROW_LABELS[row]}${col + 1}`;
}

function createSeededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i);
  }

  return () => {
    hash = Math.imul(hash ^ (hash >>> 15), 1 | hash);
    hash ^= hash + Math.imul(hash ^ (hash >>> 7), 61 | hash);
    return ((hash ^ (hash >>> 14)) >>> 0) / 4294967296;
  };
}

export function getReservedSeats(movieId: string, showtime: string): Set<SeatId> {
  const random = createSeededRandom(`${movieId}:${showtime}`);
  const indices = Array.from({ length: TOTAL_SEATS }, (_, index) => index);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const reservedCount = Math.round(TOTAL_SEATS * RESERVED_RATIO);
  const reserved = new Set<SeatId>();

  for (let i = 0; i < reservedCount; i++) {
    const index = indices[i];
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    reserved.add(seatId(row, col));
  }

  return reserved;
}

export function getAllSeatIds(): SeatId[] {
  const seats: SeatId[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      seats.push(seatId(row, col));
    }
  }
  return seats;
}
