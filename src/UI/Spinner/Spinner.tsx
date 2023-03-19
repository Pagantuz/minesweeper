import { ConfigProvider, Spin, Typography } from 'antd';
import React from 'react';
import styles from './styles.module.css';

const Spinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <ConfigProvider
        theme={{
          token: {
            colorText: '#5D5FEF',
            fontFamily: 'Inter, sans-serif',
            fontSize: 16
          }
        }}>
        <Spin size='large' />
        <Typography.Text strong>LOADING</Typography.Text>
      </ConfigProvider>
    </div>
  );
};

export { Spinner };
