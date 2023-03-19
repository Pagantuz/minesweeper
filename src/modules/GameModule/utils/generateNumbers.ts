import { coordinatesToString } from './coordinatesToString';
import { forEachNeighbor } from './forEachNeighbor';

const generateNumbers = (
  mineMap: Map<string, { rowIndex: number; colIndex: number }>,
  rows: number,
  columns: number
) => {
  const numberMap = new Map<string, number>();

  const callback = (rowIndex: number, colIndex: number) => {
    const coordinates = coordinatesToString(rowIndex, colIndex);

    const mineCount = numberMap.get(coordinates);

    if (!mineCount) {
      numberMap.set(coordinates, 1);
    } else {
      numberMap.set(coordinates, mineCount + 1);
    }
  };

  mineMap.forEach(({ rowIndex, colIndex }) => {
    forEachNeighbor(rowIndex, colIndex, rows, columns, callback);
  });

  return numberMap;
};

export { generateNumbers };
