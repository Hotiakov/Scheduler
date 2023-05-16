import { FC } from 'react';
import { classNames } from 'shared/lib/classnames/classnames';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
   className?: string;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    return (
        <div className={classNames(cls.notfoundpage, {}, [className as string])}>
            <h1 className={cls.title}>Page Not Found</h1>
        </div>
    );
};

export default NotFoundPage;
