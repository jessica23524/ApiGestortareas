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
    // Carga automáticamente el archivo .env y lo hace global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Conexión a la base de datos
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5433', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'jessica',
      database: process.env.DB_NAME || 'tareas',
      entities: [Task, User],
      synchronize: true, // en producción puedes poner false
    }),

    TasksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
