import { Rule } from 'antd/es/form';

const rules: Record<string, (message?: string, ...args: any[]) => Rule> = {
  required: (message = 'Обязательно для заполнения') => ({
    required: true,
    message: message
  }),
  max: (message = 'Слишком много', max) => ({
    max,
    message
  }),
  min: (message = 'Слишком мало', min) => ({
    min,
    message
  })
};

export { rules };
