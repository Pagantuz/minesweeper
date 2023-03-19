import React from 'react';
import { Field } from './components';
import { GameContainer } from './components/GameContainer';
import { Header } from './components/Header';

const GameModule: React.FC = () => {
  return (
    <GameContainer>
      <Header />
      <Field />
    </GameContainer>
  );
};

export { GameModule };
