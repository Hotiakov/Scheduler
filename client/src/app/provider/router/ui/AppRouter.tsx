import { CircularProgress } from '@mui/material';
import { User } from 'entities/User';
import { FC, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { ProtectedRoute } from './ProtectedRoute';

interface AppRouterProps{
    user: User
}

const AppRouter: FC<AppRouterProps> = ({user}) => (
    <Suspense fallback={<CircularProgress />}>
        <Routes>
            {
                routeConfig.map(({ element, path }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            path !== '/' 
                            ? (<ProtectedRoute user={user}>
                                    <div className="page-wrapper">
                                        {element}
                                    </div>
                                </ProtectedRoute>) 
                            : (<div className="page-wrapper">    
                                {element}
                            </div>)
                        )}
                    />
                ))
            }
        </Routes>
    </Suspense>
);
export default AppRouter;
