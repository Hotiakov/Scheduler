import { StateSchema } from "app/provider/StoreProvider";

export const getTasks = (state: StateSchema) => state.task.tasks;

export const getCurrentTask = (state: StateSchema) => state.task.currentTask;

export const getTaskModalOpen = (state: StateSchema) => state.task.taskModalOpen;