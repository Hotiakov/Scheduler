import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ITask } from 'entities/Task';
import { $api } from 'shared/config/axiosConfig/axiosConfig';
import { DistributeTaskProps } from '../types/distributeTaskSchema';

export const distributeTask = createAsyncThunk<ITask[], string[]>(
  'task/distribute',
  async (tasks, thunkAPI) => {
    try {
      const response: AxiosResponse<ITask[]> = await $api.post<ITask[]>('/tasks/distribute', tasks);
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
