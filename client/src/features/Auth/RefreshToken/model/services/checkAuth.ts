import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userActions } from "entities/User";
import { setUserInfo } from "entities/User/model/services/setUserInfo";
import { AccessToken } from "shared/types/accessToken";

export const checkAuth = createAsyncThunk<AccessToken, null>(
  'auth/refresh',
  async (_, thunkAPI) => {
      try {
          const response = await axios.get<AccessToken>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true});
          if(!response.data){
            thunkAPI.dispatch(userActions.logout());
            throw new Error();
          }
          localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN_KEY, response.data.accessToken);
          thunkAPI.dispatch(setUserInfo());
          return response.data;
      } catch (e) {
          console.error(e);
          thunkAPI.dispatch(userActions.logout());
          return thunkAPI.rejectWithValue('Error');
      }
  },
);