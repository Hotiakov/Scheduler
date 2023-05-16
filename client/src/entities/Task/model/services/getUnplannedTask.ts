import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "shared/config/axiosConfig/axiosConfig";
import { ITask } from "../types/task";

export const getUnplannedTasks = createAsyncThunk<ITask[]>(
  'tasks/getUnplanned',
  async (_, thunkAPI) => {
    try {
      const response: AxiosResponse<ITask[]> = await $api.get<ITask[]>(`/tasks/unplanned`);
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