import { StateSchema } from 'app/provider/StoreProvider';

export const getUserInfo = (state: StateSchema) => state?.user.userInfo;
export const getUserDayInterval = (state: StateSchema) => state.user?.userInfo?.dayInterval;
export const getUserUsername = (state: StateSchema) => state.user?.userInfo?.username;
export const getUserIsLoading = (state: StateSchema) => state.user.isLoading;

export const getUserError = (state: StateSchema) => state.user.error;