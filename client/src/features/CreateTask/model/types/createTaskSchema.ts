import { PreferredTaskTime } from "shared/types/preferredTaskTime";
import { RepeatSchedule } from "shared/types/repeatability";

export interface CreateTaskProps {
  name: string;
  duration: Date;
  importance?: number;
  description?: string;
  color?: string;
  preferredTaskTime?: PreferredTaskTime;
  deadline?: Date;
  repeatability?: RepeatSchedule;
}

export interface CreateTaskSchema extends CreateTaskProps {
  isLoading: boolean;
  error?: string;
}

export interface UpdateTaskProps extends CreateTaskProps {
  _id: string,
}