import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDateInterval } from 'shared/types/dateInterval';
import { ScheduleSchema, ScheduleTypes } from '../types/schedule';

const initialState: ScheduleSchema = {
  currentDateInterval: {
    from: undefined,
    to: undefined,
  },
  type:  ScheduleTypes.DAY,
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
      setSchedule: (state, action:  PayloadAction<ScheduleSchema>) => {
        state = action.payload
      },
      setScheduleDateInterval: (state, action: PayloadAction<IDateInterval>) => {
        state.currentDateInterval = action.payload;
      },
      setScheduleType: (state, action:  PayloadAction<ScheduleTypes>) => {
        state.type = action.payload
      },
    }

});

export const { actions: scheduleActions } = scheduleSlice;
export const { reducer: scheduleReducer } = scheduleSlice;
