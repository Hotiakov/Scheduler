import { CircularProgress } from '@mui/material';
import { FC } from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import cls from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={classNames(cls.loader)}>
      <CircularProgress />
    </div>
  );
}