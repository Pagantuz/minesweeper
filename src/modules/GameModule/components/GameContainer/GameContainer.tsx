import React from 'react';
import styles from './styles.module.css';

type GameContainerProps = {
  children: React.ReactNode;
};

const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  const preventMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.background}>
      <div
        className={styles['shadow-wrapper']}
        onMouseDown={preventMouseDown}
        onContextMenu={preventMouseDown}>
        <div className={styles.wrapper}>
          {childrenArray.map((child, index) => (
            <div key={index} className={styles.container}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { GameContainer };
