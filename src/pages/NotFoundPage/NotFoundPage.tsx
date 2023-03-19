import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type NotFoundPageProps = {
  homeRoute: string;
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ homeRoute }) => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(homeRoute);
  };
  return (
    <div>
      <Result
        status='404'
        title='404'
        subTitle='Страница не найдена'
        extra={
          <Button type='primary' onClick={goHome}>
            Вернуться
          </Button>
        }
      />
    </div>
  );
};

export { NotFoundPage };
