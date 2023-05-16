import { createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "entities/User";
import { $api } from "shared/config/axiosConfig/axiosConfig";

export const logout = createAsyncThunk<null, null>(
  'auth/logout',
  async (_, thunkAPI) => {
      try {
          const response = await $api.get('/auth/logout');
          if(response.status !== 200){
            throw new Error();
          }
          thunkAPI.dispatch(userActions.logout());
          return response.data;
      } catch (e) {
          console.error(e);
          return thunkAPI.rejectWithValue('Error');
      }
  },
);