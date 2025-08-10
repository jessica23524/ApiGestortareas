import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.PGPORT || process.env.DB_PORT || '5433', 10),
      username: process.env.PGUSER || process.env.DB_USER || 'postgres',
      password: process.env.PGPASSWORD || process.env.DB_PASSWORD || 'jessica',
      database: process.env.PGDATABASE || process.env.DB_NAME || 'tareas',
      entities: [Task, User],
      synchronize: true,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),

    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
