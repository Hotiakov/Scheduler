import { StateSchema } from "app/provider/StoreProvider";


export const getDistributeTaskIds = (state: StateSchema) => {
  return state.distributeTask.taskIds;
};

export const getDistributeTaskLoading = (state: StateSchema) => {
  return state.distributeTask.isLoading;
};

export const getDistributeTaskError = (state: StateSchema) => {
  return state.distributeTask.error;
};