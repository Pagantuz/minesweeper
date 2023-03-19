import React from 'react';
import { FaBomb } from 'react-icons/fa';
import Icon from '@ant-design/icons';
import styles from './styles.module.css';
import { TCell } from 'modules/GameModule/types/Cell';
import { useGameStore } from 'modules/GameModule/store';

type OpenCellProps = TCell & { style: React.CSSProperties };

const OpenCell: React.FC<OpenCellProps> = ({
  rowIndex,
  colIndex,
  type,
  value,
  background,
  style
}) => {
  const openNeighborCells = useGameStore((state) => state.openNeighborCells);
  const pressTime = React.useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 1) {
      return;
    }
    if (type !== 'number') {
      return;
    }
    pressTime.current = Date.now();
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button !== 1) {
      return;
    }
    if (type !== 'number') {
      return;
    }

    const releaseTime = Date.now();

    if (releaseTime - pressTime.current < 1000) {
      openNeighborCells(rowIndex, colIndex);
    }
  };

  return (
    <div
      style={{ ...style, background }}
      className={`${styles.cell} ${styles.open}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      {type === 'number' ? (
        <span className={styles[`number${value}`]}>{value}</span>
      ) : type === 'mine' ? (
        <span>
          <Icon component={FaBomb} />
        </span>
      ) : (
        <span />
      )}
    </div>
  );
};

export { OpenCell };
