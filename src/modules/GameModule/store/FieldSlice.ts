import { StateCreator } from 'zustand';
import { TCell } from '../types/Cell';
import { forEachNeighbor } from '../utils/forEachNeighbor';
import { generateFinishedField } from '../utils/generateFinishedField';
import { generateMines } from '../utils/generateMines';
import { generateNumbers } from '../utils/generateNumbers';
import { generateOpenCells } from '../utils/generateOpenCells';
import { getNextIcon } from '../utils/getNextIcon';
import { sleep } from '../utils/wait';
import { GameSlice } from './GameSlice';

type FieldSlice = {
  cells: TCell[][];
  isGenerated: boolean;
  openCellsCount: number;
  generateField: (startCell: TCell) => void;
  updateCell: (
    rowIndex: number,
    colIndex: number,
    newData: Partial<TCell>
  ) => void;
  changeCellIcon: (rowIndex: number, colIndex: number) => void;
  openCell: (rowIndex: number, colIndex: number) => void;
  openCellZone: (rowIndex: number, colIndex: number) => void;
  openMines: () => void;
  incrementOpenCellsByCount: (count: number) => void;
  openNeighborCells: (rowIndex: number, colIndex: number) => void;
};

const createFieldSlice: StateCreator<
  GameSlice & FieldSlice,
  [],
  [],
  FieldSlice
> = (set, get) => ({
  openCellsCount: 0,
  cells: [],
  isGenerated: false,

  incrementOpenCellsByCount: (count) => {
    set((state) => ({ openCellsCount: state.openCellsCount + count }));
    const {
      openCellsCount,
      mines,
      size: [rows, cols],
      winGame
    } = get();

    const emptyCellsCount = rows * cols - mines;

    if (openCellsCount === emptyCellsCount) {
      winGame();
    }
  },

  changeCellIcon: (rowIndex: number, colIndex: number) => {
    const {
      startGame,
      status,
      decrementFlags,
      incrementFlags,
      cells,
      updateCell
    } = get();

    if (status === 'over') {
      return;
    }

    if (status !== 'in progress') {
      startGame();
    }

    const prevIcon = cells[rowIndex][colIndex].icon;
    const nextIcon = getNextIcon(prevIcon);
    updateCell(rowIndex, colIndex, { icon: nextIcon });

    if (nextIcon === 'flag') {
      incrementFlags();
    }

    if (nextIcon !== 'flag' && prevIcon === 'flag') {
      decrementFlags();
    }
  },

  openCell: (rowIndex, colIndex) => {
    const {
      status,
      updateCell,
      loseGame,
      startGame,
      openCellZone,
      cells,
      isGenerated,
      generateField
    } = get();
    const cell = cells[rowIndex][colIndex];

    if (status === 'over') {
      return;
    }

    if (cell.icon) {
      return;
    }

    if (status === 'not started') {
      startGame();
    }

    if (!isGenerated) {
      generateField(cell);
    }

    if (cell.type === 'mine') {
      updateCell(rowIndex, colIndex, {
        status: 'open',
        background: '#ff0000bd'
      });
      loseGame();
      return;
    }

    openCellZone(rowIndex, colIndex);
  },

  openCellZone: (rowIndex, colIndex) => {
    const { cells, decrementFlagsByCount, incrementOpenCellsByCount } = get();

    const openCells = generateOpenCells(cells, rowIndex, colIndex);
    const newCells: TCell[][] = [];
    let deletedFlagsCount = 0;

    cells.forEach((row) => {
      const newRow: TCell[] = [];
      row.forEach((cell) => {
        if (openCells.has(cell.id)) {
          if (cell.icon === 'flag') {
            deletedFlagsCount++;
          }
          newRow.push({ ...cell, status: 'open', icon: undefined });
        } else {
          newRow.push(cell);
        }
      });
      newCells.push(newRow);
    });

    set({ cells: newCells });
    incrementOpenCellsByCount(openCells.size);
    decrementFlagsByCount(deletedFlagsCount);
  },

  openNeighborCells: (rowIndex, colIndex) => {
    const { size, openCell, cells, status, updateCell } = get();
    const cell = cells[rowIndex][colIndex];

    if (status === 'over') {
      return;
    }

    if (cell.type !== 'number') {
      return;
    }

    const flaggedCells: TCell[] = [];
    const emptyCells: TCell[] = [];

    const callback = (rowIndex: number, colIndex: number) => {
      const cell = cells[rowIndex][colIndex];
      if (cell.icon === 'flag') {
        flaggedCells.push(cell);
      } else {
        emptyCells.push(cell);
      }
    };

    forEachNeighbor(rowIndex, colIndex, ...size, callback);

    if (flaggedCells.length !== cell.value) {
      return;
    }

    const wrongFlaggedCells = flaggedCells.filter(
      (cell) => cell.type !== 'mine'
    );

    wrongFlaggedCells.forEach((cell) => {
      updateCell(cell.rowIndex, cell.colIndex, {
        ...cell,
        background: '#FF002030'
      });
    });

    emptyCells.forEach(({ rowIndex, colIndex }) => {
      openCell(rowIndex, colIndex);
    });
  },

  updateCell: (rowIndex, colIndex, newData) => {
    set((state) => ({
      cells: state.cells.map((row, index) =>
        index !== rowIndex
          ? row
          : row.map((cell, index) =>
              index !== colIndex ? cell : { ...cell, ...newData }
            )
      )
    }));
  },

  generateField: (startCell) => {
    const {
      cells,
      mines,
      size: [rows, columns]
    } = get();
    const mineMap = generateMines(mines, rows, columns, startCell!);
    const numberMap = generateNumbers(mineMap, rows, columns);

    const field = generateFinishedField(cells, mineMap, numberMap);

    set({ cells: field, isGenerated: true });
  },

  openMines: async () => {
    const sleepTime = 1000;
    const { cells, updateCell } = get();
    const mineCells = cells.reduce<TCell[]>((acc, row) => {
      row.forEach((cell) => {
        if (cell.type === 'mine') {
          acc.push(cell);
        }
      });
      return acc;
    }, []);

    for (const cell of mineCells) {
      const { status, mines } = get();
      if (status === 'not started') {
        break;
      }

      const { rowIndex, colIndex } = cell;
      updateCell(rowIndex, colIndex, { status: 'open' });
      await sleep(sleepTime / mines);
    }
  }
});

export { createFieldSlice };
export type { FieldSlice };
