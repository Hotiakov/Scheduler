import { IDateInterval } from "shared/types/dateInterval";

export enum ScheduleTypes{
  DAY='day',
  WEEK='week',
  MONTH='month',
  UNPLANNED='unplanned'
}

export interface ScheduleSchema{
  currentDateInterval: IDateInterval;
  type: ScheduleTypes,
};