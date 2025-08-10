import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req ,Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    return this.tasksService.findOne(id, req.user);
  }

  @Post()
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.tasksService.createTask(dto, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req
  ) {
    return this.tasksService.updateTask(id, updateTaskDto, req.user);
  }
@Delete(':id')
remove(@Param('id') id: number, @Request() req) {
  return this.tasksService.deleteTask(id, req.user);
}
}
