import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(user: User) {
    return this.taskRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async createTask(dto: CreateTaskDto, user: User) {
    const task = this.taskRepository.create({
      ...dto,
      user,
    });
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto, user: User) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) {
      throw new NotFoundException('tarea no encontrada');
    }
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

 async deleteTask(id: number, user: User) {
  const result = await this.taskRepository.delete({ id, user });
  if (result.affected === 0) {
    throw new NotFoundException('tarea no encontrada');
  }
  return { message: 'Tarea eliminada' };
}

}
