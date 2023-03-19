import { TDifficulty } from 'modules/GameModule';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TBoardData } from '../types/BoardData';
import { easyFakeData, hardFakeData, mediumFakeData } from './fakeData';

type LeaderBoardStore = Record<Exclude<TDifficulty, 'custom'>, TBoardData[]> & {
  addBoardData: (
    difficulty: Exclude<TDifficulty, 'custom'>,
    username: string,
    time: number
  ) => void;
  seedData: () => void;
};

const useLeaderboardStore = create<LeaderBoardStore>()(
  persist(
    (set, get) => ({
      easy: [],
      medium: [],
      hard: [],

      addBoardData: (difficulty, username, time) => {
        const list = get()[difficulty];
        const userScore = list.find((data) => username === data.username);
        if (userScore) {
          set((state) => ({
            [difficulty]: state[difficulty]
              .map<TBoardData>((data) =>
                data.username === username && data.time > time
                  ? { username, time }
                  : data
              )
              .sort((a, b) => a.time - b.time)
          }));
        } else {
          set((state) => ({
            [difficulty]: [...state[difficulty], { username, time }].sort(
              (a, b) => a.time - b.time
            )
          }));
        }
      },

      seedData: () => {
        set({ easy: easyFakeData, medium: mediumFakeData, hard: hardFakeData });
      }
    }),
    {
      name: 'leaderboard',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export { useLeaderboardStore };
