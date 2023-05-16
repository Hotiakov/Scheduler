import { FC } from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import cls from './PageError.module.scss';
import Button from '@mui/material/Button';

interface PageErrorProps {
   className?: string;
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div className={classNames(cls.pageerror, {}, [className as string])}>
            <h1>Something went wrong</h1>
            <Button variant='outlined' onClick={reloadPage}>
                Reload Page
            </Button>
        </div>
    );
};
