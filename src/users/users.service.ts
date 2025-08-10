import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

async findByEmail(email: string): Promise<User | null> {
  return this.usersRepo.findOne({
    where: { email },
    select: ['id', 'email', 'password'] 
  });
}



  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

    async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }
}
