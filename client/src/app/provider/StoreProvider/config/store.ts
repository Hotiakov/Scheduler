import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { scheduleReducer } from 'entities/Shedule';
import { tasksReducer } from 'entities/Task';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/Auth/AuthByUsername';
import { signUpReducer } from 'features/Auth/SignUpByUsername';
import { createTaskReducer } from 'features/CreateTask';
import { distributeReducer } from 'features/DistributeTask';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        user: userReducer,
        loginForm: loginReducer,
        signUpForm: signUpReducer,
        createTaskForm: createTaskReducer,
        task: tasksReducer,
        schedule: scheduleReducer,
        distributeTask: distributeReducer,
    };

    return configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];