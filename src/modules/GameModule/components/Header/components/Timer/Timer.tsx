import { useGameStore } from 'modules/GameModule/store';
import React from 'react';
import { DigitalDisplay } from 'UI/DigitalDisplay';
import styles from './styles.module.css';

const Timer: React.FC = () => {
  const time = useGameStore((state) => state.time);
  const incrementTime = useGameStore((state) => state.incrementTime);
  const status = useGameStore((state) => state.status);

  React.useEffect(() => {
    if (status !== 'in progress') {
      return;
    }

    const interval = setInterval(() => {
      incrementTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <div className={styles.timer}>
      <DigitalDisplay number={time} length={4} min={0} max={9999} />
    </div>
  );
};

export { Timer };
