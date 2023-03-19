import { Button, Tabs } from 'antd';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from 'UI/Head';
import { DataTable } from './components/DataTable';
import { LeaderListContainer } from './components/LeaderListContainer';
import { useLeaderboardStore } from './store';

const LeaderListModule: React.FC = () => {
  const easyData = useLeaderboardStore((state) => state.easy);
  const mediumData = useLeaderboardStore((state) => state.medium);
  const hardData = useLeaderboardStore((state) => state.hard);
  const seedData = useLeaderboardStore((state) => state.seedData);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!easyData.length && !mediumData.length && !hardData.length) {
      seedData();
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <LeaderListContainer>
      <Head title='Таблица лидеров' />
      <Button
        size='large'
        type='primary'
        style={{ alignSelf: 'end' }}
        onClick={goBack}>
        Вернуться к настройкам
      </Button>
      <Tabs defaultActiveKey='easy'>
        <Tabs.TabPane key='easy' tabKey='easy' tab='Легкая сложность'>
          <DataTable data={easyData} />
        </Tabs.TabPane>
        <Tabs.TabPane key='medium' tabKey='medium' tab='Средняя сложность'>
          <DataTable data={mediumData} />
        </Tabs.TabPane>
        <Tabs.TabPane key='hard' tabKey='hard' tab='Тяжелая сложность'>
          <DataTable data={hardData} />
        </Tabs.TabPane>
      </Tabs>
    </LeaderListContainer>
  );
};

export { LeaderListModule };
