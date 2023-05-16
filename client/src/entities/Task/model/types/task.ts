import { PreferredTaskTime } from "shared/types/preferredTaskTime";
import { RepeatSchedule } from "shared/types/repeatability";

export interface ITask {
  _id: string;
  name: string;
  duration: Date;
  color: string;
  description?: string;
  preferredTaskTime?: PreferredTaskTime;
  deadline?: Date;
  repeatability?: RepeatSchedule;
}

export interface TaskSchema {
  tasks: ITask[];
  currentTask: ITask | null;
  taskModalOpen?: boolean;
  isLoading: boolean;
  error?: string;
}