import { PreferredTaskTime } from 'src/common/types/preferredTaskTime';
import { RepeatSchedule } from 'src/common/types/repeatability';

export class CreateTaskDto {
  readonly name: string;
  readonly duration: Date;
  readonly description?: string;
  readonly color?: string;
  readonly preferredTaskTime?: PreferredTaskTime;
  readonly deadline?: Date;
  readonly repeatability?: RepeatSchedule;
}
