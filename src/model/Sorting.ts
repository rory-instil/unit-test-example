export type Direction = "asc" | "desc";

export interface Sorting {
  column: string;
  direction: Direction;
}

export function toggleSorting(sorting: Sorting, column: string): Sorting {
  let direction = sorting.column === column ? toggleDirection(sorting.direction) : 'asc';

  return {
    column,
    direction
  }
}

function toggleDirection(direction: Direction): Direction {
  return direction === 'asc' ? 'desc' : 'asc';
}
