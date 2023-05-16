import { ITask } from 'src/tasks/schemas/task.schema';
import { TDateInterval } from '../types/dateInterval';

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

export function findFreeTimeSlots(
  dayInterval: TDateInterval,
  existingSchedule: ITask[],
): TimeSlot[] {
  const { from, to } = dayInterval;

  // Сортируем существующее расписание по времени начала задачи
  const sortedSchedule = existingSchedule.sort(
    (a, b) => getTaskStartTime(a).getTime() - getTaskStartTime(b).getTime(),
  );

  const freeTimeSlots: TimeSlot[] = [];

  let currentEndTime = from;

  // Перебираем задачи в существующем расписании
  for (const task of sortedSchedule) {
    const taskStartTime = getTaskStartTime(task);
    const taskEndTime = addTimeToDate(taskStartTime, task.duration);

    // Проверяем, если есть свободный промежуток между текущим окончанием и началом задачи
    if (taskStartTime > currentEndTime) {
      freeTimeSlots.push({ startTime: currentEndTime, endTime: taskStartTime });
    }

    // Обновляем текущее окончание времени
    if (taskEndTime > currentEndTime) {
      currentEndTime = taskEndTime;
    }
  }

  // Проверяем, если есть свободный промежуток между последней задачей и окончанием рабочего дня
  if (to > currentEndTime) {
    freeTimeSlots.push({ startTime: currentEndTime, endTime: to });
  }

  return freeTimeSlots;
}

function getTaskStartTime(task: ITask): Date {
  if (task.repeatability.type === 'weekly') {
    const currentDate = new Date();
    const taskTime = new Date(task.repeatability.time);
    taskTime.setFullYear(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    return taskTime;
  } else if (task.repeatability.type === 'specific') {
    return task.repeatability.time;
  }

  return new Date();
}

function addTimeToDate(date: Date, time: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds(),
  );
  return newDate;
}
