import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5D5FEF',
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          colorText: '#111827',
          colorPrimaryBgHover: '#111827'
        }
      }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
