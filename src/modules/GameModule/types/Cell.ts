type TCell = {
  id: string;
  status: 'open' | 'closed';
  type: 'empty' | 'number' | 'mine';
  rowIndex: number;
  colIndex: number;
  value?: number;
  icon?: undefined | 'flag' | 'question';
  background?: string;
};

export type { TCell };
