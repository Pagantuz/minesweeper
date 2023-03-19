import { TCell } from '../types/Cell';

const generateFinishedField = (
  cells: TCell[][],
  mineMap: Map<string, { colIndex: number; rowIndex: number }>,
  numberMap: Map<string, number>
) => {
  return cells.map((row) =>
    row.map<TCell>((cell) => {
      const isHasMine = mineMap.has(cell.id);
      const number = numberMap.get(cell.id);
      if (isHasMine) {
        return { ...cell, type: 'mine' };
      }

      if (number) {
        return { ...cell, type: 'number', value: number };
      }

      return cell;
    })
  );
};

export { generateFinishedField };
