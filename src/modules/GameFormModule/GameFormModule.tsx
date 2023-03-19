import React from 'react';
import { GameForm } from './components/Form';
import { FormContainer } from './components/FormContainer';

const GameFormModule: React.FC = () => {
  return (
    <FormContainer>
      <GameForm />
    </FormContainer>
  );
};

export { GameFormModule };
