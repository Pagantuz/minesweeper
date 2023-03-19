import { useLeaderboardStore } from 'modules/LeaderListModule';
import { StateCreator } from 'zustand';
import { TDifficulty, TGameStatus } from '../types/Game';
import { checkAllMinesFlagged } from '../utils/checkAllMinesFlagged';
import { generateEmptyField } from '../utils/generateEmptyField';
import { getMinesCountByDifficulty } from '../utils/getMinesCountByDifficulty';
import { getSizeByDifficulty } from '../utils/getSizeByDifficulty';
import { FieldSlice } from './FieldSlice';

type GameSlice = {
  status: TGameStatus;
  difficulty: TDifficulty;
  username?: string;
  size: [number, number];
  time: number;
  score: number;
  mines: number;
  flags: number;
  result?: 'win' | 'lose';
  generateGame: () => void;
  startGame: () => void;
  loseGame: () => void;
  winGame: () => void;
  updateScore: () => void;
  setDifficulty: (difficulty: Exclude<TDifficulty, 'custom'>) => void;
  setCustomDifficulty: (
    size: GameSlice['size'],
    mines: GameSlice['mines']
  ) => void;
  incrementTime: () => void;
  incrementFlags: () => void;
  decrementFlags: () => void;
  decrementFlagsByCount: (count: number) => void;
  setUsername: (username: string | undefined) => void;
};

const createGameSlice: StateCreator<
  GameSlice & FieldSlice,
  [],
  [],
  GameSlice
> = (set, get) => ({
  status: 'not started',
  difficulty: 'hard',
  size: [99, 99],
  time: 0,
  mines: 400,
  flags: 0,
  score: 10,

  startGame: () => {
    const { status } = get();

    if (status === 'in progress') {
      return;
    }

    set({ status: 'in progress' });
  },

  loseGame: () => {
    const { status, openMines } = get();
    if (status === 'in progress') {
      openMines();
      set({ status: 'over', result: 'lose' });
    }
  },

  winGame: () => {
    const { status, time, username, difficulty } = get();
    const { addBoardData } = useLeaderboardStore.getState();

    if (status === 'in progress') {
      set({ status: 'over', result: 'win' });
      if (difficulty !== 'custom') {
        addBoardData(difficulty, username!, time);
      }
    }
  },

  updateScore: () => {
    const { cells, isGenerated } = get();
    set((state) => ({ score: state.mines - state.flags }));
    const { score, winGame } = get();

    if (!isGenerated) {
      return;
    }

    if (score === 0) {
      const isAllMinesFlagged = checkAllMinesFlagged(cells);
      if (isAllMinesFlagged) {
        winGame();
      }
    }
  },

  incrementTime: () => {
    set((state) => ({ time: state.time + 1 }));
  },

  incrementFlags: () => {
    const { updateScore } = get();
    set((state) => ({ flags: state.flags + 1 }));
    updateScore();
  },

  decrementFlags: () => {
    const { updateScore } = get();
    set((state) => ({ flags: state.flags - 1 }));
    updateScore();
  },

  decrementFlagsByCount: (count) => {
    const { updateScore } = get();
    set((state) => ({ flags: state.flags - count }));
    updateScore();
  },

  generateGame: () => {
    const { size, updateScore } = get();
    const [rows, columns] = size;

    const field = generateEmptyField(rows, columns);

    set({
      cells: field,
      status: 'not started',
      flags: 0,
      time: 0,
      isGenerated: false,
      openCellsCount: 0,
      result: undefined
    });

    updateScore();
  },

  setDifficulty: (difficulty) => {
    const size = getSizeByDifficulty(difficulty);
    const mines = getMinesCountByDifficulty(difficulty);
    set({ difficulty, size, mines });
  },

  setCustomDifficulty: (size, mines) => {
    set({ difficulty: 'custom', size, mines });
  },

  setUsername: (username) => {
    set({ username });
  }
});

export { createGameSlice };
export type { GameSlice };
