import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { ScheduleSchema } from "entities/Shedule";
import { $api } from "shared/config/axiosConfig/axiosConfig";
import { IDateInterval } from "shared/types/dateInterval";
import { Day } from "shared/types/repeatability";
import { ITask } from "../types/task";
import { weekDay } from "../utils/filterTasksByDate";

export const getTasksByDate = createAsyncThunk<ITask[], IDateInterval, {state: {schedule: ScheduleSchema}}>(
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
      const {schedule} = thunkAPI.getState();
      if(schedule.type === 'day'){
        const currentWeekDay = weekDay[from.getDay()] as Day;
        return response.data.filter(item => item.repeatability.type === 'weekly'
            ? (item.repeatability.days as Day[]).includes(currentWeekDay)
            : item);
      }
      return response.data;
    } catch(e) {
      console.log(e);
      return thunkAPI.rejectWithValue('Error');
    }
  }
)