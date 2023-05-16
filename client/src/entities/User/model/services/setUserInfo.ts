import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { User } from 'entities/User';
import { $api } from 'shared/config/axiosConfig/axiosConfig';

export const setUserInfo = createAsyncThunk<User>(
    'user/getUserInfo',
    async (_, thunkAPI) => {
        try {
            const response: AxiosResponse<User> = await $api.get<User>('/users/info', );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue('Error');
        }
    },
);
