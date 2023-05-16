import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { User } from 'src/users/user.decorator';
import { TDateInterval } from 'src/common/types/dateInterval';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  @UseGuards(AccessTokenGuard)
  create(@Body() createTaskDto: CreateTaskDto, @User() userId: string) {
    return this.tasksService.createTaskForUser(createTaskDto, userId);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  getAll(@User() userId: string) {
    return this.tasksService.findTasksForUser(userId);
  }

  @Get('unplanned')
  @UseGuards(AccessTokenGuard)
  getUnplannedTasks(@User() userId: string) {
    return this.tasksService.findUnplannedTasksForUser(userId);
  }

  @Get('getTasksByDate')
  @UseGuards(AccessTokenGuard)
  getTasksByDate(
    @Query('from') from: string,
    @Query('to') to: string,
    @User() userId: string,
  ) {
    const dateInterval: TDateInterval = {
      from: new Date(from),
      to: new Date(to),
    };

    return this.tasksService.findTaskByDate(dateInterval, userId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  getTask(@Param('id') id: string) {
    return this.tasksService.findTaskById(+id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string, @User() userId: string) {
    return this.tasksService.remove(id, userId);
  }

  @Post('distribute')
  @UseGuards(AccessTokenGuard)
  distribute(@User() userId: string, @Body() taskIds: string[]) {
    return this.tasksService.distributeTasks(userId, taskIds);
  }
}
