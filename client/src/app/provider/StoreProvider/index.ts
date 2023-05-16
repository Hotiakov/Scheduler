import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore } from './config/store';
import type { StateSchema } from './config/StateSchema';
import { AppDispatch } from './config/store';

export {
    StoreProvider,
    createReduxStore,
    StateSchema
};    
export type { AppDispatch };
