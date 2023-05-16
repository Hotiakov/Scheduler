import {ITask, TaskSchema} from './model/types/task';
import { tasksActions, tasksReducer } from './model/slice/taskSlice';
import { getTaskById } from './model/services/getTaskById';
import { getTasksByDate } from './model/services/getTasksByDate';
import { getTasks } from './model/selectors/getTasks';
import { filterTasksByDate } from './model/utils/filterTasksByDate';

export type {ITask, TaskSchema};

export {
  tasksActions,
  tasksReducer,
  getTaskById,
  getTasksByDate,
  getTasks,
  filterTasksByDate
};
