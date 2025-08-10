import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity({name: 'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email:string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
