import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { $api } from "shared/config/axiosConfig/axiosConfig";
import { ITask } from "../types/task";

export const getTaskById = createAsyncThunk<ITask, string>(
  'tasks/getById',
  async (id, thunkAPI) => {
    try {
      const response: AxiosResponse<ITask> = await $api.get<ITask>(`/tasks/${id}`);
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