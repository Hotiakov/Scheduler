import { createSlice } from '@reduxjs/toolkit';
import { signUpByUsername } from '../services/signUpByUsername';
import { SignUpSchema } from '../types/signUpSchema';

const initialState: SignUpSchema = {
    isLoading: false,
};

const signUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(signUpByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(signUpByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },

});

export const { actions: signUpAction } = signUpSlice;
export const { reducer: signUpReducer } = signUpSlice;
