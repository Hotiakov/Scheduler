import {
  RandomScheduleGenerator,
  TimeSlot,
  updateTimeSlots,
} from '../TimeSlotsGenerator/TimeSlotsGenerator';
import { TDateInterval } from '../types/dateInterval';
import { ITask } from 'src/tasks/schemas/task.schema';
import { addDuration, compareDates, compareTimes } from '../helpers';

class Individual {
  schedule: ITask[]; // Расписание задач
  fitness: number;
  slots: TimeSlot[];
  constructor(schedule: ITask[], fitness: number, slots: TimeSlot[]) {
    this.schedule = schedule;
    this.fitness = fitness;
    this.slots = slots;
  }
}

export class TaskScheduler {
  private dayInterval: TDateInterval;
  private mutationRatio: number;
  private selectionRate: number;
  private populationSize: number;
  private existingSchedule: ITask[];
  private newTasks: ITask[];
  private timeSlots: TimeSlot[];
  constructor(
    dayInterval: TDateInterval,
    existingSchedule: ITask[],
    newTasks: ITask[],
    populationSize = 100,
    mutationRatio = 0.1,
    selectionRate = 0.2,
  ) {
    this.dayInterval = dayInterval;
    this.populationSize = populationSize;
    this.mutationRatio = mutationRatio;
    this.selectionRate = selectionRate;
    this.existingSchedule = existingSchedule;
    this.newTasks = newTasks;
  }

  generateBestSchedule(): ITask[] {
    const population = this.generateInitialPopulation();
    let generation = 0;
    let bestSchedule: ITask[] = null;
    let bestFitness = 0;
    while (generation < 100) {
      for (let i = 0; i < this.populationSize; i++) {
        const parent1 = this.selection(population);
        const parent2 = this.selection(population);
        const child = this.crossover(parent1, parent2);
        const mutatedChild = this.mutate(child);
        mutatedChild.fitness = this.calculateFitness(mutatedChild.schedule);
        if (mutatedChild.fitness > bestFitness) {
          bestFitness = mutatedChild.fitness;
          bestSchedule = [...mutatedChild.schedule];
        }
      }
      generation++;
    }
    bestSchedule = bestSchedule.map((item) => {
      return {
        ...item,
        isInShedule: true,
      };
    });
    return bestSchedule;
  }

  generateInitialPopulation(): Individual[] {
    const population: Individual[] = [];
    const individGenerator = new RandomScheduleGenerator(
      this.existingSchedule,
      this.newTasks,
      this.dayInterval,
    );
    this.timeSlots = individGenerator.freeTimeSlots;
    for (let i = 0; i < this.populationSize; i++) {
      const schedule = individGenerator.generateRandomSchedule();
      const fitness = this.calculateFitness(schedule.schedule);
      population.push(
        new Individual(schedule.schedule, fitness, schedule.slots),
      );
    }
    return population;
  }

  calculateFitness(newDistributedTasks: ITask[], isLogged = false): number {
    let fitness = 0;
    for (let i = 0; i < newDistributedTasks.length; i++) {
      const task = newDistributedTasks[i];
      const startTime = task.repeatability.time;
      const endDate = new Date(task.repeatability.days[0]);
      const endTime = addDuration(startTime, task.duration);
      endDate.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
      // Проверка выполнения дедлайна
      if (task.deadline && endDate > task.deadline) {
        fitness -= 100; // Штраф за невыполнение дедлайна
      }

      // Проверка приоритета задачи
      fitness += task.importance * 10;
      // Учет предпочтений пользователя по времени
      if (task.preferredTaskTime) {
        const { before, after } = task.preferredTaskTime;
        if (before && startTime > before) {
          fitness -= 10;
        }
        if (after && startTime < after) {
          fitness -= 10;
        }
      }
    }
    //Добавляем штраф за каждую нераспределенную задачу
    fitness -= (this.newTasks.length - newDistributedTasks.length) * 10;
    return fitness;
  }

  private selection(population: Individual[]): Individual {
    const sortedPopulation = population.sort((a, b) => b.fitness - a.fitness);
    const selected = sortedPopulation.slice(
      0,
      Math.ceil(this.selectionRate * population.length),
    );
    return selected[Math.floor(Math.random() * selected.length)];
  }

  private crossover(p1: Individual, p2: Individual): Individual {
    const child: ITask[] = [];
    const parent1 = p1.schedule;
    const parent2 = p2.schedule;
    const mainParent = parent1.length >= parent2.length ? parent1 : parent2;
    const secondaryParent =
      parent1.length >= parent2.length ? parent2 : parent1;
    const crossoverPoint = Math.floor(Math.random() * mainParent.length);
    const timeSlots: TimeSlot[] = [...this.timeSlots];
    for (let i = 0; i < mainParent.length; i++) {
      const task = mainParent[i];
      const task2 = secondaryParent.find((item) => item._id === task._id);
      let resultTask: ITask;
      if (i < crossoverPoint) {
        resultTask = task;
      } else {
        resultTask = task2 ?? task;
      }
      const index = timeSlots.findIndex((item) => {
        return (
          compareDates(resultTask.repeatability.days[0] as Date, item.day) &&
          compareTimes(resultTask.repeatability.time, item.startTime) !== -1 &&
          compareTimes(
            addDuration(resultTask.repeatability.time, resultTask.duration),
            addDuration(item.startTime, item.duration),
          ) !== 1
        );
      });
      if (index === -1) {
        child.push(resultTask);
        continue;
      }
      updateTimeSlots(
        timeSlots,
        index,
        resultTask.duration,
        resultTask.repeatability.time,
      );
      child.push(resultTask);
    }
    const fitness = this.calculateFitness(child);
    return new Individual(child, fitness, timeSlots);
  }

  private mutate(individ: Individual): Individual {
    const { schedule, slots } = individ;
    for (let i = 0; i < schedule.length; i++) {
      if (Math.random() < this.mutationRatio) {
        const task = schedule[i];
        const availibleTimeSlots = slots.filter(
          (item) => compareTimes(task.duration, item.duration) !== 1,
        );
        const newStartTime = Math.floor(
          Math.random() * availibleTimeSlots.length,
        );
        if (newStartTime) {
          const taskDate = availibleTimeSlots[newStartTime];
          slots.push({
            id: task.repeatability.time.getTime() + task.duration.getTime(),
            startTime: task.repeatability.time,
            duration: task.duration,
            day: task.repeatability.days[0] as Date,
          });
          schedule[i].repeatability = {
            type: 'specific',
            days: [taskDate.day],
            time: taskDate.startTime,
          };
          const initialIndex = slots.findIndex(
            (item) => item.id === availibleTimeSlots[newStartTime].id,
          );
          updateTimeSlots(
            slots,
            initialIndex,
            task.duration,
            task.repeatability.time,
          );
        }
      }
    }

    return individ;
  }
}
