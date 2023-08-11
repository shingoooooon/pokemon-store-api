import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<any> {
    const user = await this.userRepository.save(data);

    const { password, ...result } = user;

    return result;
  }

  async findOne(identifier: string | number): Promise<User | undefined> {
    const where =
      typeof identifier === 'number'
        ? { id: identifier }
        : { email: identifier };
    return this.userRepository.findOne({ where });
  }
}
