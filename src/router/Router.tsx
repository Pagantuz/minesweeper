import { useGameStore } from 'modules/GameModule';
import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';

const Router: React.FC = () => {
  const username = useGameStore((state) => state.username);
  const router = createHashRouter(username ? privateRoutes : publicRoutes);

  return <RouterProvider router={router} />;
};

export { Router };
