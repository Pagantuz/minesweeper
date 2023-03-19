import { TCell } from '../types/Cell';
import { coordinatesToString } from './coordinatesToString';

const generateEmptyField = (rows: number, columns: number): TCell[][] => {
  const field: TCell[][] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row: TCell[] = [];
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const coordinates = coordinatesToString(rowIndex, colIndex);

      const cell: TCell = {
        rowIndex,
        colIndex,
        id: coordinates,
        status: 'closed',
        type: 'empty'
      };

      row.push(cell);
    }
    field.push(row);
  }
  return field;
};

export { generateEmptyField };
