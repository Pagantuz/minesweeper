import React from 'react';
import { Navigate, Outlet, useMatch } from 'react-router-dom';

type StartPageProps = {
  url: string;
};

const StartPage: React.FC<StartPageProps> = ({ url }) => {
  const match = useMatch('/');

  if (match !== null) {
    return <Navigate to={url} replace />;
  }

  return <Outlet />;
};

export { StartPage };
