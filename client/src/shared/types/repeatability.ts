type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
type Holiday = 'Sunday' | 'Saturday';
export type Day = Weekday | Holiday;

export type RepeatSchedule =
  | { type: 'weekly'; days: Day[]; time: Date }
  | { type: 'specific'; days: Date[]; time: Date };