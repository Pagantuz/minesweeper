import { useIsMobile } from 'hooks/useIsMobile';
import { TCell } from 'modules/GameModule/types/Cell';
import React from 'react';
import { ClosedCell } from './ClosedCell';
import { OpenCell } from './OpenCell';

type CellProps = {
  cellData: TCell;
  style: React.CSSProperties;
};

const Cell: React.FC<CellProps> = React.memo(({ cellData, style }) => {
  return cellData.status === 'closed' ? (
    <ClosedCell {...cellData} style={style} />
  ) : (
    <OpenCell {...cellData} style={style} />
  );
});

export { Cell };
