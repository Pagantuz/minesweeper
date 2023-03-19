import { TDifficulty } from '../types/Game';

const getSizeByDifficulty = (
  difficulty: Exclude<TDifficulty, 'custom'>
): [number, number] => {
  if (difficulty === 'easy') {
    return [8, 8];
  }

  if (difficulty === 'medium') {
    return [16, 16];
  }

  if (difficulty === 'hard') {
    return [16, 32];
  }

  const _exhaustiveCheck: never = difficulty;
  return _exhaustiveCheck;
};

export { getSizeByDifficulty };
