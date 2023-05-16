import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { distributeTask } from '../services/distributeTask';
import { DistributeTaskSchema } from '../types/distributeTaskSchema';

interface setDistributeProps {
  taskId: string;
  checked: boolean;
}

const initialState: DistributeTaskSchema = {
    isLoading: false,
    taskIds: [],
};

const distributeTaskSlice = createSlice({
    name: 'distributeTask',
    initialState,
    reducers: {
      setDistributeTask: (state, action: PayloadAction<setDistributeProps>) => {
        if(action.payload.checked){
          state.taskIds.push(action.payload.taskId);
        } else {
          state.taskIds = state.taskIds.filter(item => item !== action.payload.taskId);
        }
      },
      resetTaskIds: (state) => {
        return initialState;
      }
    },

    extraReducers: (builder) => {
        builder
          .addCase(distributeTask.pending, (state) => {
              state.error = undefined;
              state.isLoading = true;
          })
          .addCase(distributeTask.fulfilled, (state, action) => {
              state.isLoading = false;
              state.taskIds = [];
          })
          .addCase(distributeTask.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.payload as string;
          });
    },

});

export const { actions: distributeAction } = distributeTaskSlice;
export const { reducer: distributeReducer } = distributeTaskSlice;
