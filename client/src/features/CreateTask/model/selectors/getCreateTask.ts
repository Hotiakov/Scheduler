import { StateSchema } from "app/provider/StoreProvider";

export const getCreateTaskForm = (state: StateSchema) => {
  return state.createTaskForm;
}