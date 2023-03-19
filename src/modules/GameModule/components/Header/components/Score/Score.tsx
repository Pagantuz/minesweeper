import { useGameStore } from 'modules/GameModule/store';
import React from 'react';
import { DigitalDisplay } from 'UI/DigitalDisplay';
import styles from './styles.module.css';

const Score: React.FC = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div className={styles.score}>
      <DigitalDisplay number={score} length={3} min={-99} max={999} />
    </div>
  );
};

export { Score };
