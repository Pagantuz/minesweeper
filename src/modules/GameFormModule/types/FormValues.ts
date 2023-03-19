import { TDifficulty } from 'modules/GameModule';

type TDefaultValues = {
  username: string;
  difficulty: Exclude<TDifficulty, 'custom'>;
};

type TCustomValues = {
  username: string;
  difficulty: Extract<TDifficulty, 'custom'>;
  mines: number;
  rows: number;
  columns: number;
};

type TFormValues = TDefaultValues | TCustomValues;

export type { TFormValues };
