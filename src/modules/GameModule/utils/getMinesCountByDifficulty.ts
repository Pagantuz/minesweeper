import { TDifficulty } from '../types/Game';

const getMinesCountByDifficulty = (
  difficulty: Exclude<TDifficulty, 'custom'>
): number => {
  if (difficulty === 'easy') {
    return 10;
  }

  if (difficulty === 'medium') {
    return 40;
  }

  if (difficulty === 'hard') {
    return 99;
  }

  const _exhaustiveCheck: never = difficulty;
  return _exhaustiveCheck;
};

export { getMinesCountByDifficulty };
