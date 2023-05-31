import { ITask } from 'src/tasks/schemas/task.schema';

export function compareDates(date1: Date, date2: Date): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
}

export function compareTaskTimes(task1: ITask, task2: ITask): number {
  const t1 = task1.repeatability?.time;

  const t2 = task2.repeatability?.time;
  return compareTimes(t1, t2);
}

export function compareTimes(time1: Date, time2: Date) {
  const t1 = time1.getHours() * 60 + time1.getMinutes();
  const t2 = time2.getHours() * 60 + time2.getMinutes();

  if (t1 < t2) return -1;
  else if (t1 > t2) return 1;
  return 0;
}

export function diffDates(time1: Date, time2: Date) {
  const t1 = new Date(0);
  t1.setHours(time1.getUTCHours(), time1.getMinutes(), 0, 0);
  const t2 = new Date(0);
  t2.setHours(time2.getUTCHours(), time2.getMinutes(), 0, 0);
  const diff = new Date(0);
  diff.setHours(
    t2.getHours() - t1.getHours(),
    t2.getMinutes() - t1.getMinutes(),
  );
  return diff;
}

export function addDuration(time: Date, duration: Date) {
  const result = new Date(0);
  result.setHours(time.getHours() + duration.getHours());
  result.setMinutes(time.getMinutes() + duration.getMinutes());
  return result;
}

export function generateRandomPermutation(array: any[]) {
  const length = array.length;
  const arrayToSort = [...array];
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayToSort[i], arrayToSort[j]] = [arrayToSort[j], arrayToSort[i]];
  }
  return arrayToSort;
}

export function getRandomDate(startDate: Date, endDate: Date): Date {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const randomTimestamp = getRandomInt(startTimestamp, endTimestamp);
  return new Date(randomTimestamp);
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
