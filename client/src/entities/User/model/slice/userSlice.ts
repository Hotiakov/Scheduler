import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';
import { USER_ACCESSTOKEN_KEY } from 'shared/const/localStorage';
import { setUserInfo } from '../services/setUserInfo';
import dayjs from 'dayjs';


const initialState: UserSchema = { 
    userInfo: null,
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem(USER_ACCESSTOKEN_KEY);
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserInfo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(setUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userInfo = action.payload;
                const {from, to} = action.payload.dayInterval;
                state.userInfo.dayDuration = dayjs(
                    dayjs(to).diff(from)
                );
            })
            .addCase(setUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
