import { ITask } from 'src/tasks/schemas/task.schema';
import { getRandomDate, getRandomInt } from '../helpers';
import { TaskScheduler } from '../TasksScheduler/TasksScheduler';

export const existingTasks = [
  {
    _id: '64801a0ca2facff4820bffde',
    name: 'Понедельник',
    duration: new Date('1970-01-01T00:15:00.000Z'),
    importance: 1,
    color: '#aabaca',
    preferredTaskTime: null,
    deadline: null,
    repeatability: {
      type: 'weekly',
      days: ['Monday'],
      time: new Date('2023-06-07T06:00:00.896Z'),
    },
    isInShedule: true,
    user: '648019dfa2facff4820bffd8',
  },
  {
    _id: '64801e66a2facff4820c0035',
    name: 'Понедельник, вторник',
    duration: new Date('1970-01-01T01:00:00.000Z'),
    importance: 1,
    color: '#aabaca',
    preferredTaskTime: null,
    deadline: null,
    repeatability: {
      type: 'weekly',
      days: ['Monday', 'Tuesday'],
      time: new Date('2023-06-07T14:00:00.949Z'),
    },
    isInShedule: true,
    user: '648019dfa2facff4820bffd8',
  },
  {
    _id: '64801e93a2facff4820c0039',
    name: 'Вторник, пятница',
    duration: new Date('1969-12-31T23:30:00.000Z'),
    importance: 1,
    color: '#aabaca',
    preferredTaskTime: null,
    deadline: null,
    repeatability: {
      type: 'weekly',
      days: ['Tuesday', 'Friday'],
      time: new Date('2023-06-07T05:00:00.017Z'),
    },
    isInShedule: true,
    user: '648019dfa2facff4820bffd8',
  },
  {
    _id: '64802140a2facff4820c0046',
    name: 'Четверг, суббота',
    duration: new Date('1970-01-01T01:15:00.000Z'),
    importance: 1,
    color: '#aabaca',
    preferredTaskTime: null,
    deadline: null,
    repeatability: {
      type: 'weekly',
      days: ['Thursday', 'Saturday'],
      time: new Date('2023-06-07T06:10:00.350Z'),
    },
    isInShedule: true,
    user: '648019dfa2facff4820bffd8',
  },
];

export const taskForGeneration = {
  _id: '',
  name: 'Распределить',
  duration: new Date('1970-01-01T21:00:00.000Z'),
  importance: 5,
  color: '#aabaca',
  preferredTaskTime: null,
  deadline: null,
  repeatability: null,
  isInShedule: false,
  user: '648019dfa2facff4820bffd8',
};

export const test = () => {
  const p = 100,
    k = 100,
    n = 30,
    dayInterval = {
      from: new Date('2023-06-06T21:00:00.206Z'),
      to: new Date('2023-06-07T20:59:59.206Z'),
    };
  const tasksForDistribution = [];
  for (let i = 0; i < n; i++) {
    let day = new Date();
    const prefChance = getRandomInt(0, 3);
    const preferredTaskTime = {
      ...(prefChance !== 1 ? { after: new Date(day.setHours(10)) } : {}),
      ...(prefChance !== 0 ? { before: new Date(day.setHours(17)) } : {}),
    };
    day = new Date();
    const endDay = new Date();
    endDay.setMonth(endDay.getMonth() + 3);
    const deadline = new Date(getRandomDate(day, endDay));
    tasksForDistribution.push({
      ...taskForGeneration,
      _id: i,
      preferredTaskTime: preferredTaskTime,
      deadline: deadline,
    });
  }

  const tasksDistributer = new TaskScheduler(
    dayInterval,
    existingTasks as ITask[],
    tasksForDistribution,
    p,
    k,
  );

  tasksDistributer.testOperation();
};
