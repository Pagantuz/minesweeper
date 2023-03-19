import { Button, ConfigProvider } from 'antd';
import { ROUTES } from 'constants/routes';
import { useGameStore } from 'modules/GameModule/store';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const StartButton: React.FC = () => {
  const result = useGameStore((state) => state.result);
  const generateGame = useGameStore((state) => state.generateGame);
  const setUsername = useGameStore((state) => state.setUsername);

  const navigate = useNavigate();

  const smile = result === 'win' ? '😎' : result === 'lose' ? '🙁' : '🙂';

  const handleLeftClick = () => {
    generateGame();
  };

  const handleRightClick = () => {
    setUsername(undefined);
    navigate(ROUTES.INDEX, { replace: true });
  };

  return (
    <div className={styles.button}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffff60',
            fontSize: 24,
            colorText: '#ffff60'
          }
        }}>
        <Button
          block
          onClick={handleLeftClick}
          onContextMenu={handleRightClick}>
          {smile}
        </Button>
      </ConfigProvider>
    </div>
  );
};

export { StartButton };
