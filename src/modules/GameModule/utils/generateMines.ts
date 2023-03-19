import { TCell } from '../types/Cell';
import { coordinatesToString } from './coordinatesToString';
import { forEachNeighbor } from './forEachNeighbor';

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

    //Определение расстояния до первой нажатой ячейки
    const dx = Math.abs(startCell.rowIndex - rowIndex);
    const dy = Math.abs(startCell.colIndex - colIndex);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const isTooClose = dist < 3;

    //Наличие бомб в соседних ячейках
    let isNearExistMine;
    forEachNeighbor(rowIndex, colIndex, rows, columns, (row, col) => {
      const coordinates = coordinatesToString(row, col);
      if (mineSet.has(coordinates)) {
        isNearExistMine = true;
      }
    });

    if (
      !mineSet.has(minePosition) &&
      !isStartCell &&
      !isNearExistMine &&
      !isTooClose
    ) {
      mineSet.set(minePosition, { rowIndex, colIndex });
    }
  }

  return mineSet;
};

export { generateMines };
