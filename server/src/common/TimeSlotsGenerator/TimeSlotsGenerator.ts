import { ITask } from 'src/tasks/schemas/task.schema';
import {
  compareDates,
  compareTaskTimes,
  diffDates,
  compareTimes,
  addDuration,
  generateRandomPermutation,
  getRandomInt,
} from '../helpers';
import { TDateInterval } from '../types/dateInterval';
import { Day, DaysArray } from '../types/repeatability';

export interface TimeSlot {
  id: number;
  startTime: Date;
  duration: Date;
  day: Date;
}

export interface Individual {
  slots: TimeSlot[];
  schedule: ITask[];
}

export interface SortedWeeklyTasks {
  Monday: ITask[];
  Tuesday: ITask[];
  Wednesday: ITask[];
  Thursday: ITask[];
  Friday: ITask[];
  Sunday: ITask[];
  Saturday: ITask[];
}

export function updateTimeSlots(
  slots: TimeSlot[],
  index: number,
  duration: Date,
  time: Date,
) {
  const endTime = addDuration(time, duration);
  const slotEndsTime = addDuration(
    slots[index].startTime,
    slots[index].duration,
  );
  const durationBefore = diffDates(slots[index].startTime, time);
  const durationAfter = diffDates(endTime, slotEndsTime);
  if (durationAfter.getTime() !== 0) {
    slots.push({
      id: slots[index].day.getTime() + endTime.getTime(),
      day: slots[index].day,
      startTime: endTime,
      duration: durationAfter,
    });
  }
  if (durationBefore.getTime() === -10800000) {
    slots.splice(index, 1);
  } else {
    slots[index] = {
      ...slots[index],
      duration: durationBefore,
    };
  }
}

export class RandomScheduleGenerator {
  public freeTimeSlots: TimeSlot[];
  private currentSchedule: ITask[];
  private undistirbutedTasks: ITask[];
  private dayInterval: TDateInterval;
  private sortedWeeklyTasks: SortedWeeklyTasks;

  constructor(
    currentSchedule: ITask[],
    undistirbutedTasks: ITask[],
    dayInterval: TDateInterval,
  ) {
    this.freeTimeSlots = [];
    this.currentSchedule = currentSchedule;
    this.undistirbutedTasks = undistirbutedTasks;
    this.dayInterval = dayInterval;
    this.sortedWeeklyTasks = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Sunday: [],
      Saturday: [],
    };
    this.generateInitialTimeSlots();
  }

  private sortWeeklyTasksByDate() {
    const weeklyTasks = this.currentSchedule.filter(
      (task) => task.repeatability.type === 'weekly',
    );
    for (const task of weeklyTasks) {
      (task.repeatability.days as Day[]).forEach((item: Day) => {
        this.sortedWeeklyTasks[item].push(task);
      });
    }
  }

  private getSpecificTasksByDate(day: Date) {
    return this.currentSchedule.filter(
      (task) =>
        task.repeatability.type === 'specific' &&
        (task.repeatability.days as Date[]).some((item) =>
          compareDates(item, day),
        ),
    );
  }

  private generateInitialTimeSlots() {
    const currentDate = new Date();
    currentDate.setHours(this.dayInterval.from.getHours());
    currentDate.setMinutes(this.dayInterval.from.getMinutes());

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setHours(this.dayInterval.to.getHours());
    endDate.setMinutes(this.dayInterval.to.getMinutes());

    this.sortWeeklyTasksByDate();

    //Иттерируемся по дням, начиная с сегодняшнего дня и заканчиваю днем через три месяца
    for (let day = currentDate; day < endDate; day.setDate(day.getDate() + 1)) {
      const currentDayRepeatableTask: ITask[] =
        this.sortedWeeklyTasks[DaysArray[day.getDay()]]; //получаем еженедельные задачи, соответствующие текущему дню
      const currentDaySpecificTask = this.getSpecificTasksByDate(day);
      const currentDayTasks = [
        ...currentDayRepeatableTask,
        ...currentDaySpecificTask,
      ].sort(compareTaskTimes);
      if (!currentDayTasks.length) {
        this.freeTimeSlots.push({
          id: day.getTime() + this.dayInterval.from.getTime(),
          day: new Date(day),
          startTime: new Date(this.dayInterval.from),
          duration: diffDates(this.dayInterval.from, this.dayInterval.to),
        });
        continue;
      }
      if (
        compareTimes(
          currentDayTasks[0].repeatability?.time,
          this.dayInterval.from,
        )
      ) {
        this.freeTimeSlots.push({
          id: day.getTime() + this.dayInterval.from.getTime(),
          day: new Date(day),
          startTime: new Date(this.dayInterval.from),
          duration: diffDates(
            this.dayInterval.from,
            currentDayTasks[0].repeatability?.time,
          ),
        });
      }
      for (let i = 0; i < currentDayTasks.length; i++) {
        const task = currentDayTasks[i];
        const next = currentDayTasks[i + 1];
        const taskEndTime = addDuration(task.repeatability.time, task.duration);
        if (next && !compareTimes(taskEndTime, next.repeatability.time)) {
          continue;
        }
        this.freeTimeSlots.push({
          id: day.getTime() + task.repeatability.time.getTime(),
          day: new Date(day),
          startTime: new Date(taskEndTime),
          duration: diffDates(
            taskEndTime,
            next?.repeatability.time || this.dayInterval.to,
          ),
        });
      }
    }
  }

  public generateRandomSchedule(): Individual {
    const availibleTimeSlots = [...this.freeTimeSlots];
    const schedule = [];

    generateRandomPermutation(this.undistirbutedTasks).forEach(
      (task: ITask) => {
        const slotsForTask = availibleTimeSlots.filter(
          (item) => compareTimes(item.duration, task.duration) !== -1,
        );
        if (slotsForTask.length) {
          const randomIndex = Math.floor(Math.random() * slotsForTask.length);
          const taskDate = slotsForTask[randomIndex];
          const endSlotTime = addDuration(
            taskDate.startTime,
            taskDate.duration,
          );
          const randomHour = getRandomInt(
            taskDate.startTime.getHours(),
            endSlotTime.getHours() - task.duration.getHours(),
          );
          let randomMinute;
          if (!compareTimes(taskDate.duration, task.duration)) {
            randomMinute = 0;
          } else {
            randomMinute =
              Math.round(
                getRandomInt(
                  randomHour === taskDate.startTime.getHours()
                    ? taskDate.startTime.getMinutes()
                    : 0,
                  60,
                ) / 5,
              ) * 5;
          }
          const time = new Date(0);
          time.setHours(randomHour, randomMinute);
          task.repeatability = {
            type: 'specific',
            days: [taskDate.day],
            time: time,
          };
          schedule.push(task);
          const initialIndex = availibleTimeSlots.findIndex(
            (item) => item.id === slotsForTask[randomIndex].id,
          );
          updateTimeSlots(
            availibleTimeSlots,
            initialIndex,
            task.duration,
            time,
          );
        }
      },
    );
    return {
      schedule,
      slots: availibleTimeSlots,
    };
  }
}
