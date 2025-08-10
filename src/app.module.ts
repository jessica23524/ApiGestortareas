import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; // <--- importar aquí
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'jessica',
      database: 'tareas',
      entities: [Task, User],
      synchronize: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule, // <--- agregar aquí
  ],
})
export class AppModule {}

