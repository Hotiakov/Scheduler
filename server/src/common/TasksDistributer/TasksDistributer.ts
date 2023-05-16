import { ITask } from 'src/tasks/schemas/task.schema';
import { TDateInterval } from '../types/dateInterval';
import { Day, DaysArray } from '../types/repeatability';

class Individual {
  schedule: ITask[]; // Расписание задач
  fitness: number;
  constructor(schedule: ITask[]) {
    this.schedule = schedule;
    this.fitness = 0;
  }
}

export class TaskScheduler {
  private dayInterval: TDateInterval;
  private elitismRatio: number;
  private populationSize: number;
  constructor(dayInterval: TDateInterval, populationSize: number) {
    this.dayInterval = dayInterval;
    this.populationSize = populationSize;
  }
  generateInitialPopulation(
    existingSchedule: ITask[],
    newTasks: ITask[],
    size: number,
  ): ITask[][] {
    const population: ITask[][] = [];

    for (let i = 0; i < size; i++) {
      const schedule: ITask[] = [];

      // Добавляем задачи из существующего расписания в новое расписание
      for (const task of existingSchedule) {
        schedule.push(task);
      }

      // Добавляем новые задачи в новое расписание
      for (const task of newTasks) {
        const validTimes = this.getValidTaskTimes(schedule, task);
        if (validTimes.length > 0) {
          const randomIndex = Math.floor(Math.random() * validTimes.length);
          const startTime = validTimes[randomIndex];
          task.repeatability = {
            type: 'specific',
            days: [startTime],
            time: startTime,
          };
          schedule.push(task);
        }
      }

      schedule.sort((a, b) => this.compareTaskTimes(a, b));
      population.push(schedule);
    }

    return population;
  }

  getValidTaskTimes(schedule: ITask[], task: ITask): Date[] {
    const validTimes: Date[] = [];

    const dayStart = this.dayInterval.from;
    const dayEnd = this.dayInterval.to;

    const currentDate = new Date(dayStart.getTime());
    const lastValidDate = this.getLastValidDate(task.repeatability);

    while (currentDate <= lastValidDate) {
      const startTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        task.repeatability.time.getHours(),
        task.repeatability.time.getMinutes(),
      );

      const endTime = new Date(startTime.getTime() + task.duration.getTime());

      if (endTime <= dayEnd) {
        validTimes.push(startTime);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return validTimes;
  }
  getTaskEndTime(task: ITask): Date {
    const repeatability = task.repeatability;
    if (repeatability.type === 'weekly') {
      const lastValidDate = this.getLastValidDate(
        repeatability.time,
        task.duration,
        repeatability.days,
      );
      return new Date(lastValidDate.getTime() + task.duration.getTime());
    } else if (repeatability.type === 'specific') {
      const lastValidDate = this.getLastValidDate(
        repeatability.time,
        task.duration,
        repeatability.days,
      );
      return new Date(lastValidDate.getTime() + task.duration.getTime());
    }
  }

  compareTaskTimes(task1: ITask, task2: ITask): number {
    if (task1.preferredTaskTime && task2.preferredTaskTime) {
      if (task1.preferredTaskTime.before && task2.preferredTaskTime.before) {
        return (
          task1.preferredTaskTime.before.getTime() -
          task2.preferredTaskTime.before.getTime()
        );
      }
      if (task1.preferredTaskTime.after && task2.preferredTaskTime.after) {
        return (
          task1.preferredTaskTime.after.getTime() -
          task2.preferredTaskTime.after.getTime()
        );
      }
    }

    return 0;
  }

  calculateFitness(individual: Individual): number {
    let fitness = 0;

    for (let i = 0; i < individual.schedule.length; i++) {
      const task = individual.schedule[i];
      const startTime = task.repeatability.time;
      const endTime = new Date(startTime.getTime() + task.duration.getTime());

      // Проверка выполнения дедлайна
      if (task.deadline && endTime > task.deadline) {
        fitness -= 100; // Штраф за невыполнение дедлайна
      }

      // Проверка приоритета задачи
      fitness += task.importance;

      // Проверка непараллельности задач
      const previousTask = individual.schedule[i - 1];
      if (previousTask) {
        const previousEndTime = new Date(
          previousTask.repeatability.time.getTime() +
            previousTask.duration.getTime(),
        );
        if (startTime < previousEndTime) {
          fitness -= 50; // Штраф за параллельное выполнение задач
        }
      }

      // Проверка доступного времени для выполнения задачи
      const validTimes = this.getValidTaskTimes(individual.schedule, task);
      if (!validTimes.includes(startTime)) {
        fitness -= 50; // Штраф за недоступное время начала задачи
      }

      // Учет предпочтений пользователя по времени
      if (
        task.preferredTaskTime &&
        ((task.preferredTaskTime.before &&
          startTime > task.preferredTaskTime.before) ||
          (task.preferredTaskTime.after &&
            startTime < task.preferredTaskTime.after))
      ) {
        fitness -= 20; // Штраф за нарушение предпочтений времени
      }
    }

    return fitness;
  }

  createNextGeneration(currentPopulation: Individual[]): Individual[] {
    const nextGeneration: Individual[] = [];

    // Elitism: сохраняем лучшие особи из текущей популяции в следующее поколение
    const elitismCount = Math.round(
      this.elitismRatio * currentPopulation.length,
    );
    const eliteIndividuals = currentPopulation.slice(0, elitismCount);
    nextGeneration.push(...eliteIndividuals);

    // Оператор селекции и скрещивания
    while (nextGeneration.length < this.populationSize) {
      const parents = this.selectParents(currentPopulation);
      const offspring = this.crossover(parents[0], parents[1]);
      nextGeneration.push(offspring);
    }

    // Оператор мутации
    for (let i = elitismCount; i < nextGeneration.length; i++) {
      nextGeneration[i] = this.mutate(nextGeneration[i]);
    }

    return nextGeneration;
  }

  mutate(individual: Individual): Individual {
    const mutatedIndividual: Individual = {
      schedule: [...individual.schedule],
      fitness: 0,
    };

    for (let i = 0; i < mutatedIndividual.schedule.length; i++) {
      if (Math.random() < this.mutationRate) {
        const task = mutatedIndividual.schedule[i];
        const validTimes = this.getValidTaskTimes(
          mutatedIndividual.schedule,
          task,
        );
        if (validTimes.length > 0) {
          const randomValidTimeIndex = Math.floor(
            Math.random() * validTimes.length,
          );
          task.repeatability.time = validTimes[randomValidTimeIndex];
        }
      }
    }

    return mutatedIndividual;
  }
}
