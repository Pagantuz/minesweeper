import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createFieldSlice, FieldSlice } from './FieldSlice';
import { createGameSlice, GameSlice } from './GameSlice';

const useGameStore = create<GameSlice & FieldSlice>()(
  persist(
    (...a) => ({
      ...createGameSlice(...a),
      ...createFieldSlice(...a)
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export { useGameStore };
