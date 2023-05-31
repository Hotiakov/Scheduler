import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { setUserInfo } from "entities/User/model/services/setUserInfo";
import { $api } from "shared/config/axiosConfig/axiosConfig";
import { USER_ACCESSTOKEN_KEY } from "shared/const/localStorage";
import { AccessToken } from "shared/types/accessToken";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<AccessToken, LoginByUsernameProps>("auth/signin", async ({ username, password }, thunkAPI) => {
  try {
    const response: AxiosResponse<AccessToken> | AxiosError = await $api.post<AccessToken>("/auth/signin", {
      username,
      password,
    });
    if (!response.data) {
      throw new Error();
    }
    localStorage.setItem(USER_ACCESSTOKEN_KEY, JSON.stringify(response.data.accessToken));
    thunkAPI.dispatch(setUserInfo());
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.error);
  }
});
