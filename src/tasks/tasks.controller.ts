import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

// Controller unique responsability is to simply recive request, give it
// to whathever needed to achieve the goal, and send the response

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  // using @Body decorator will take all request parameter and assign to body
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // in that way, nestjs will look for both properties, 'title' and 'description
  // and assign to the correspondent variable
  @Post()
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    // instead of using the way above, declaring title and description
    // and passing through a lot of places, we can do as follow
    @Body() createTaskDto: CreateTaskDto,
  ): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
