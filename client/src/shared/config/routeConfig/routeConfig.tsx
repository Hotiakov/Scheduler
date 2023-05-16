import { AuthPage } from 'pages/AuthPage';
import { DayPage } from 'pages/DayPage';
import { WeekPage } from 'pages/WeekPage';
import { MonthPage } from 'pages/MonthPage';
import { UnplannedPage } from 'pages/UnplannedPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
    WEEK = 'week',
    AUTH = 'auth',
    MONTH = 'month',
    DAY = 'day',
    UNPLANNED = 'unplanned',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/',
    [AppRoutes.DAY]: '/day',
    [AppRoutes.WEEK]: '/week',
    [AppRoutes.MONTH]: '/month',
    [AppRoutes.UNPLANNED]: '/unplanned',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: RouteProps[] = [
    {
      path: RoutePath.auth,
      element: <AuthPage />,
    },
    {
      path: RoutePath.day,
      element: <DayPage />,
    },
    {
      path: RoutePath.week,
      element: <WeekPage />,
    },
    {
      path: RoutePath.month,
      element: <MonthPage />,
    },
    {
      path: RoutePath.unplanned,
      element: <UnplannedPage />,
    },
    {
      path: RoutePath.not_found,
      element: <NotFoundPage />,
    },
];
