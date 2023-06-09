import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TaskScheduler } from 'src/common/TasksScheduler/TasksScheduler';
// import { TasksDistributer } from 'src/common/TasksDistributer/TasksDistributer';
import { TDateInterval } from 'src/common/types/dateInterval';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask, Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  // private tasksDistributer: TasksDistributer;

  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    // this.tasksDistributer = new TasksDistributer();
  }

  async createTaskForUser(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    const isInShedule =
      !!createTaskDto.repeatability.time && !!createTaskDto.duration;
    if (!isInShedule) {
      createTaskDto = {
        ...createTaskDto,
        repeatability: null,
      };
    }
    const newTask = new this.taskModel({
      ...createTaskDto,
      isInShedule,
      user: userId,
    });
    const savedTask = await newTask.save();

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { tasks: savedTask._id },
    });

    return savedTask;
  }

  async findTasksForUser(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ user: userId });
  }

  async findUnplannedTasksForUser(userId: string): Promise<Task[]> {
    return await this.taskModel.find({ user: userId, isInShedule: false });
  }

  async findTaskById(taskId: number): Promise<Task> {
    return await this.taskModel.findById(taskId);
  }

  async findTaskByDate(
    dateInterval: TDateInterval,
    userId: string,
  ): Promise<Task[]> {
    return await this.taskModel.find({
      user: userId,
      $or: [
        {
          'repeatability.type': 'specific',
          'repeatability.days': {
            $elemMatch: {
              $gte: dateInterval.from,
              $lte: dateInterval.to,
            },
          },
        },
        {
          'repeatability.type': 'specific',
          'repeatability.days': {
            $elemMatch: {
              $gte: dateInterval.from.toISOString(),
              $lte: dateInterval.to.toISOString(),
            },
          },
        },
        {
          'repeatability.type': 'weekly',
        },
      ],
    });
  }

  async update(
    taskId: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return await this.taskModel.findOneAndUpdate(
      { _id: taskId },
      updateTaskDto,
      { new: true },
    );
  }

  async remove(taskId: string, userId: string): Promise<Task> {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { tasks: taskId },
    });
    return await this.taskModel.findOneAndDelete({ _id: taskId, user: userId });
  }

  async bulkUpdate(items: ITask[]): Promise<void> {
    const operations: mongoose.mongo.AnyBulkWriteOperation<ITask>[] = items.map(
      (item: ITask) => {
        if (!item._id) {
          throw new Error(
            'ID должен быть указан для каждого обновляемого элемента',
          );
        }
        return {
          updateOne: {
            filter: { _id: item._id },
            update: item,
          },
        };
      },
    );
    await this.taskModel.bulkWrite(operations);
  }

  async distributeTasks(userId: string, taskIds: string[]) {
    const undistirbutedTasks: ITask[] = await this.taskModel
      .find({
        user: userId,
        _id: { $in: taskIds },
        isInShedule: false,
      })
      .lean();
    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 3);
    const dateInterval: TDateInterval = {
      from: today,
      to: endDate,
    };
    const distirbutedTasks: ITask[] = await this.findTaskByDate(
      dateInterval,
      userId,
    );
    const { dayInterval } = await this.userModel.findById<UserDocument>(userId);
    const scheduler = new TaskScheduler(
      dayInterval,
      distirbutedTasks,
      undistirbutedTasks,
    );
    const schedule: ITask[] = scheduler.generateBestSchedule() as ITask[];
    await this.bulkUpdate(schedule);
    return schedule;
  }
}
