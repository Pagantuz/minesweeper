import React from 'react';
import { VariableSizeGrid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useGameStore } from 'modules/GameModule/store';
import { Cell } from './components/Cell';
import { useIsMobile } from 'modules/GameModule/hooks/useIsMobile';

const Field: React.FC = () => {
  const cells = useGameStore((state) => state.cells);
  const [rows, columns] = useGameStore((state) => state.size);

  const isMobile = useIsMobile();

  const rowHeight = !isMobile ? 24 : 32;
  const columnWidth = !isMobile ? 24 : 32;

  return (
    <div
      style={{
        width: columns * columnWidth,
        height: rows * rowHeight,
        maxWidth: isMobile ? '100%' : 24 * 32,
        maxHeight: isMobile ? 'calc(100vh - 116px)' : 'calc(100vh - 132px)'
      }}>
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeGrid
            columnCount={columns}
            rowCount={rows}
            columnWidth={() => columnWidth}
            rowHeight={() => rowHeight}
            height={height}
            width={width}>
            {({ style, rowIndex, columnIndex }) => (
              <Cell
                key={cells[rowIndex][columnIndex].id}
                cellData={cells[rowIndex][columnIndex]}
                style={style}
              />
            )}
          </VariableSizeGrid>
        )}
      </AutoSizer>
    </div>
  );
};

export { Field };
