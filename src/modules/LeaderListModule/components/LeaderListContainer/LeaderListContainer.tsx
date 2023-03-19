import React from 'react';
import styles from './styles.module.css';

type LeaderListContainerProps = {
  children: React.ReactNode;
};

const LeaderListContainer: React.FC<LeaderListContainerProps> = ({
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export { LeaderListContainer };
