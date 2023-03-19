import { TCell } from '../types/Cell';
import { forEachNeighbor } from './forEachNeighbor';

const generateOpenCells = (
  cells: TCell[][],
  rowIndex: number,
  colIndex: number
) => {
  const queue: [number, number][] = [[rowIndex, colIndex]];
  const openedCells = new Map<string, TCell>();

  while (queue.length) {
    const [currentRow, currentCol] = queue.shift()!;
    const cell = cells[currentRow][currentCol];

    if (
      cell.status === 'open' ||
      cell.background ||
      cell.type === 'mine' ||
      openedCells.has(cell.id)
    ) {
      continue;
    }

    openedCells.set(cell.id, cell);

    const callback = (rowIndex: number, colIndex: number) => {
      queue.push([rowIndex, colIndex]);
    };

    if (cell.type === 'empty') {
      forEachNeighbor(
        currentRow,
        currentCol,
        cells.length,
        cells[0].length,
        callback
      );
    }
  }

  return openedCells;
};

export { generateOpenCells };
