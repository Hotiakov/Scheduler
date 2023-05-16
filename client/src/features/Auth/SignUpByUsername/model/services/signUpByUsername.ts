import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { userActions } from 'entities/User';
import { setUserInfo } from 'entities/User/model/services/setUserInfo';
import { $api } from 'shared/config/axiosConfig/axiosConfig';
import { USER_ACCESSTOKEN_KEY } from 'shared/const/localStorage';
import { AccessToken } from 'shared/types/accessToken';
import { IDateInterval } from 'shared/types/dateInterval';

interface SignUpByUsernameProps{
    username: string;
    password: string;
    dayInterval: IDateInterval;
}

export const signUpByUsername = createAsyncThunk<AccessToken, SignUpByUsernameProps>(
    'auth/signup',
    async ({ username, password, dayInterval }, thunkAPI) => {
        try {
            const response: AxiosResponse<AccessToken> = await $api.post<AccessToken>('/auth/signup', {
                username,
                password,
                dayInterval,
            });
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_ACCESSTOKEN_KEY, JSON.stringify(response.data.accessToken));
            thunkAPI.dispatch(setUserInfo());
            return response.data;
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue('Error');
        }
    },
);
