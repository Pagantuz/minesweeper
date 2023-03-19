import { RouteObject } from 'react-router-dom';
import React from 'react';
import { ROUTES } from 'constants/routes';
import { Spinner } from 'UI/Spinner';

const FormPage = React.lazy(() => import('pages/FormPage'));
const GamePage = React.lazy(() => import('pages/GamePage'));
const LeaderboardPage = React.lazy(() => import('pages/LeaderboardPage'));
const StartPage = React.lazy(() => import('pages/StartPage'));
const NotFoundPage = React.lazy(() => import('pages/NotFoundPage'));

const publicRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <React.Suspense fallback={<Spinner />}>
        <StartPage url={ROUTES.FORM} />
      </React.Suspense>
    )
  },
  {
    path: ROUTES.FORM,
    element: (
      <React.Suspense fallback={<Spinner />}>
        <FormPage />
      </React.Suspense>
    )
  },
  {
    path: ROUTES.LEADERBOARD,
    element: (
      <React.Suspense fallback={<Spinner />}>
        <LeaderboardPage />
      </React.Suspense>
    )
  },
  {
    path: '*',
    element: (
      <React.Suspense fallback={<Spinner />}>
        <NotFoundPage homeRoute={ROUTES.INDEX} />
      </React.Suspense>
    )
  }
];

const privateRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <React.Suspense fallback={<Spinner />}>
        <StartPage url={ROUTES.GAME} />
      </React.Suspense>
    )
  },
  {
    path: ROUTES.GAME,
    element: (
      <React.Suspense fallback={<Spinner />}>
        <GamePage />
      </React.Suspense>
    )
  },
  {
    path: '*',
    element: (
      <React.Suspense fallback={<Spinner />}>
        <NotFoundPage homeRoute={ROUTES.INDEX} />
      </React.Suspense>
    )
  }
];

export { publicRoutes, privateRoutes };
