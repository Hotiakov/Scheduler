import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ScheduleSchema } from 'entities/Shedule';
import { getTasksByDate, ITask } from 'entities/Task';
import { $api } from 'shared/config/axiosConfig/axiosConfig';

export const removeTask = createAsyncThunk<ITask, string, {state: {schedule: ScheduleSchema}}>(
  'task/delete',
  async (taskId, thunkAPI) => {
    try {
      const response = await $api.delete(`/tasks/${taskId}`);
      if (!response.data) {
        throw new Error();
      }
      const {schedule} = thunkAPI.getState();
      thunkAPI.dispatch(getTasksByDate(schedule.currentDateInterval));
      return response.data;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);
