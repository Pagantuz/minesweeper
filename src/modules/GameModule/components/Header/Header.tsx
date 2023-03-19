import React from 'react';
import { Score } from './components/Score';
import { StartButton } from './components/StartButton';
import { Timer } from './components/Timer';
import styles from './styles.module.css';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Score />
      <StartButton />
      <Timer />
    </div>
  );
};

export { Header };
