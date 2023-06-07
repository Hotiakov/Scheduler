import { ITask } from "../types/task";
import { compareDateOnly } from "shared/lib/compareDateOnly/compareDateOnly";

export const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const filterTasksByDate = (date: Date, tasks: ITask[]) => {
  const day = weekDay[date.getDay()];
  const result = tasks.filter(({repeatability}) => {
    const {type, days} =  repeatability || {};
    return days?.some(item => type === 'specific' ? compareDateOnly(date, new Date(item as Date)) : item === day);
  });
  return result.sort((item1, item2) => {
    const time1 = new Date(item1.repeatability.time);
    const time2 = new Date(item2.repeatability.time);
    return new Date(0,0,0,time1.getHours(),time1.getMinutes()).getTime() - new Date(0,0,0,time2.getHours(),time2.getMinutes()).getTime();
  });
}