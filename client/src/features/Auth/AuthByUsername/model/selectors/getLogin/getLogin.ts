import { StateSchema } from 'app/provider/StoreProvider';

export const getLogin = (state: StateSchema) => state?.loginForm;
