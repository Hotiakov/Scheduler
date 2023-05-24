import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ScheduleSchema } from 'entities/Shedule';
import { getTasksByDate, ITask } from 'entities/Task';
import { getUnplannedTasks } from 'entities/Task/model/services/getUnplannedTask';
import { $api } from 'shared/config/axiosConfig/axiosConfig';

export const distributeTask = createAsyncThunk<ITask[], string[], {state: {schedule: ScheduleSchema}}>(
  'task/distribute',
  async (tasks, thunkAPI) => {
    try {
      const response: AxiosResponse<ITask[]> = await $api.post<ITask[]>('/tasks/distribute', tasks);
      if (!response.data) {
        throw new Error();
      }
      const {schedule} = thunkAPI.getState();
      if(schedule.type === 'unplanned'){
        thunkAPI.dispatch(getUnplannedTasks());
      } else {
        thunkAPI.dispatch(getTasksByDate(schedule.currentDateInterval));
      }
      return response.data;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue('Error');
    }
  },
);
