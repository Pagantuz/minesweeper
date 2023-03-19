import { ConfigProvider, Divider, Typography } from 'antd';
import { useIsMobile } from 'modules/GameModule/hooks/useIsMobile';
import React from 'react';

type HeadProps = {
  title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
  const isMobile = useIsMobile();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorderSecondary: 'rgb(71, 72, 182)',
          fontFamily: 'Inter, sans-serif',
          fontSize: 32,
          colorText: 'rgb(71, 72, 182)'
        }
      }}>
      {!isMobile ? (
        <Divider
          style={{ fontWeight: 800, marginBottom: 48 }}
          orientation='left'>
          {title.toUpperCase()}
        </Divider>
      ) : (
        <Typography.Paragraph strong>
          {title.toUpperCase()}
        </Typography.Paragraph>
      )}
    </ConfigProvider>
  );
};

export { Head };
