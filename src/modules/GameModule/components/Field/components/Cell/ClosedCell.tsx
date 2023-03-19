import { MdFlag, MdQuestionMark } from 'react-icons/md';
import Icon from '@ant-design/icons';
import React from 'react';
import styles from './styles.module.css';
import { useGameStore } from 'modules/GameModule/store';
import { TCell } from 'modules/GameModule/types/Cell';

type ClosedCellProps = TCell & { style: React.CSSProperties };

const ClosedCell: React.FC<ClosedCellProps> = ({
  rowIndex,
  colIndex,
  icon,
  background,
  style
}) => {
  const changeCellIcon = useGameStore((state) => state.changeCellIcon);
  const openCell = useGameStore((state) => state.openCell);
  const touchTime = React.useRef(0);

  const handleLeftClick = () => {
    openCell(rowIndex, colIndex);
  };

  const handleRightClick = () => {
    changeCellIcon(rowIndex, colIndex);
  };

  return (
    <div
      style={{ ...style, background }}
      className={`${styles.cell} ${styles.closed}`}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}>
      <span>
        {icon && (
          <Icon
            className={`${styles.icon} ${styles[icon]}`}
            component={icon === 'flag' ? MdFlag : MdQuestionMark}
          />
        )}
      </span>
    </div>
  );
};

export { ClosedCell };
