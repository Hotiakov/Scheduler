import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PreferredTaskTime } from 'shared/types/preferredTaskTime';
import { RepeatSchedule } from 'shared/types/repeatability';
import { createTask } from '../services/createTask';
import { removeTask } from '../services/removeTask';
import { updateTask } from '../services/updateTask';

import { CreateTaskSchema, UpdateTaskProps } from '../types/createTaskSchema';

const initialState: CreateTaskSchema = {
    name: '',
    importance: 1,
    duration: new Date(0, 0, 0, 1, 0),
    color: '#aabaca',
    isLoading: false,
    repeatability: {
      time: null,
      type: 'specific',
      days: []
    }
};

const createTaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
      resetForm: (state) => {
        return initialState;
      },
      resetFormSetting: (state) => {
        return {
          ...state,
          repeatability: initialState.repeatability,
          deadline: null,
          preferredTaskTime: null,
          importance: initialState.importance,
        }
      },
      setTaskForm: (state, action: PayloadAction<UpdateTaskProps>) => {
        return {
          ...action.payload,
          isLoading: false,
        }
      },
      setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
      },
      setDuration: (state, action: PayloadAction<Date>) => {
        state.duration = action.payload;
      },
      setColor: (state, action: PayloadAction<string>) => {
        state.color = action.payload;
      },
      setDescription: (state, action: PayloadAction<string>) => {
        state.description = action.payload;
      },
      setImportance: (state, action: PayloadAction<number>) => {
        state.importance = action.payload;
      },
      setPreferredTaskTime: (state, action: PayloadAction<PreferredTaskTime>) => {
        state.preferredTaskTime = action.payload;
      },
      setDeadline: (state, action: PayloadAction<Date>) => {
        state.deadline = action.payload;
      },
      setRepeatability: (state, action: PayloadAction<RepeatSchedule>) => {
        state.repeatability = action.payload;
      }
    },

    extraReducers: (builder) => {
      builder
        .addCase(createTask.pending, (state) => {
          state.error = undefined;
          state.isLoading = true;
        })
        .addCase(createTask.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(createTask.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })

        .addCase(updateTask.pending, (state) => {
          state.error = undefined;
          state.isLoading = true;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(updateTask.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        })

        .addCase(removeTask.pending, (state) => {
          state.error = undefined;
          state.isLoading = true;
        })
        .addCase(removeTask.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(removeTask.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    },

});

export const { actions: createTaskActions } = createTaskSlice;
export const { reducer: createTaskReducer } = createTaskSlice;
