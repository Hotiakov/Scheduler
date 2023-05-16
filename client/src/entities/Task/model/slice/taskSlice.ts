import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask, TaskSchema } from '../types/task';
import { getTaskById } from '../services/getTaskById';
import { getTasksByDate } from '../services/getTasksByDate';
import { getUnplannedTasks } from '../services/getUnplannedTask';


const initialState: TaskSchema = { 
    currentTask: null,
    tasks: [],
    isLoading: false,
    taskModalOpen: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<ITask>) => {
      state.currentTask = action.payload;
    },
    setTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.taskModalOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskById.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getTasksByDate.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getTasksByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasksByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getUnplannedTasks.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getUnplannedTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getUnplannedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { actions: tasksActions } = tasksSlice;
export const { reducer: tasksReducer } = tasksSlice;
