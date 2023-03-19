import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Space
} from 'antd';
import { ROUTES } from 'constants/routes';
import { TFormValues } from 'modules/GameFormModule/types/FormValues';
import { rules } from 'modules/GameFormModule/utils/generateRules';
import { TDifficulty, useGameStore } from 'modules/GameModule';
import { useIsMobile } from 'modules/GameModule/hooks/useIsMobile';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Head } from 'UI/Head';
import styles from './styles.module.css';

const GameForm: React.FC = () => {
  const [selectDifficulty, setSelectDifficulty] = React.useState<TDifficulty>();
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const setUsername = useGameStore((state) => state.setUsername);
  const setCustomDifficulty = useGameStore(
    (state) => state.setCustomDifficulty
  );
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const generateGame = useGameStore((state) => state.generateGame);

  const isMobile = useIsMobile();

  const onFinish = (values: TFormValues) => {
    if (values.difficulty === 'custom') {
      const isTooManyMines = values.mines >= values.rows * values.columns;
      if (isTooManyMines) {
        api.error({
          description:
            'Количество мин не может быть больше или равно количеству ячеек',
          message: 'Произошла ошибка'
        });
        return;
      }

      setCustomDifficulty([values.rows, values.columns], values.mines);
    } else {
      setDifficulty(values.difficulty);
    }
    setUsername(values.username);
    generateGame();
    navigate(ROUTES.GAME, { replace: true });
  };

  const goToLeaderboard = () => {
    navigate(ROUTES.LEADERBOARD);
  };

  const isCustom = selectDifficulty === 'custom';

  return (
    <div className={styles.container}>
      {contextHolder}
      <Head title='Сапёр' />
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name='game-form'
        onFinish={onFinish}>
        <Form.Item
          name='username'
          label='Имя пользователя'
          rules={[
            rules.required(),
            rules.min('Минимум 4 символа', 4),
            rules.max('Максимум 10 символов', 10)
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name='difficulty'
          label='Сложность'
          rules={[rules.required()]}>
          <Select onChange={setSelectDifficulty}>
            <Select.Option key='easy' value='easy'>
              Лёгкая
            </Select.Option>
            <Select.Option key='medium' value='medium'>
              Средняя
            </Select.Option>
            <Select.Option key='hard' value='hard'>
              Тяжелая
            </Select.Option>
            <Select.Option key='custom' value='custom'>
              Пользовательская
            </Select.Option>
          </Select>
        </Form.Item>
        {isCustom && (
          <>
            <Form.Item
              name='mines'
              label='Количество мин'
              rules={[rules.required()]}>
              <InputNumber min={1} max={999} />
            </Form.Item>
            <Form.Item
              name='rows'
              label='Высота поля'
              rules={[rules.required()]}>
              <InputNumber min={8} max={99} />
            </Form.Item>
            <Form.Item
              name='columns'
              label='Ширина поля'
              rules={[rules.required()]}>
              <InputNumber min={8} max={99} />
            </Form.Item>
          </>
        )}
        <Form.Item
          wrapperCol={
            isMobile ? { offset: 0, span: 8 } : { offset: 8, span: 8 }
          }>
          <Space>
            <Button block type='primary' htmlType='submit'>
              Начать игру
            </Button>
            <Button block type='default' onClick={goToLeaderboard}>
              На страницу лидеров
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export { GameForm };
