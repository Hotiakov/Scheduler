import { Schema } from 'mongoose';

type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type Holiday = 'Sunday' | 'Saturday';
export type Day = Weekday | Holiday;
export const DaysArray: Day[] = [
  'Saturday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Sunday',
];

export type RepeatSchedule =
  | { type: 'weekly'; days: Day[]; time: Date }
  | { type: 'specific'; days: Date[]; time: Date };

const RepeatScheduleSchema = new Schema(
  {
    type: { type: String, required: true, enum: ['weekly', 'specific'] },
    days: [Schema.Types.Mixed],
    time: { type: Date, required: true },
  },
  { _id: false },
);

export { RepeatScheduleSchema };
