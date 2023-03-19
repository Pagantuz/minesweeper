import { TCell } from '../types/Cell';
import { coordinatesToString } from './coordinatesToString';

const generateMines = (
  mines: number,
  rows: number,
  columns: number,
  startCell: TCell
) => {
  const mineSet = new Map<string, { rowIndex: number; colIndex: number }>();

  while (mineSet.size < mines) {
    const rowIndex = Math.floor(Math.random() * rows);
    const colIndex = Math.floor(Math.random() * columns);

    const minePosition = coordinatesToString(rowIndex, colIndex);

    const isStartCell = startCell.id === minePosition;

    if (!mineSet.has(minePosition) && !isStartCell) {
      mineSet.set(minePosition, { rowIndex, colIndex });
    }
  }

  return mineSet;
};

export { generateMines };
