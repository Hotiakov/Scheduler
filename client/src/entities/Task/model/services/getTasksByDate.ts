import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "shared/config/axiosConfig/axiosConfig";
import { IDateInterval } from "shared/types/dateInterval";
import { ITask } from "../types/task";

export const getTasksByDate = createAsyncThunk<ITask[], IDateInterval>(
  'tasks/getTasksByDate',
  async ({from, to}, thunkAPI) => {
    try {
      const response: AxiosResponse<ITask[]> = await $api.get<ITask[]>('/tasks/getTasksByDate', {
        params: {
          from,
          to
        }
      });
      if(!response.data){
        throw new Error();
      }
      return response.data;
    } catch(e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  }
)