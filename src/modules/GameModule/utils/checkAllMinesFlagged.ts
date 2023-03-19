import { TCell } from '../types/Cell';

const checkAllMinesFlagged = (cells: TCell[][]) => {
  return cells.every((row) => {
    return row.every((cell) => {
      if (cell.type !== 'mine') {
        return true;
      }

      return cell.icon === 'flag';
    });
  });
};

export { checkAllMinesFlagged };
