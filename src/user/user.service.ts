import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { IUser } from './user.inteface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: IUser): Promise<any> {
    const user = await this.userRepository.save(data);
    return user;
  }

  async findOne(id: number): Promise<IUser> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  async deleteOne(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async updateOne(id: number, user: IUser): Promise<any> {
    return this.userRepository.update(id, user);
  }

  // async findOne(identifier: string | number): Promise<UserEntity | undefined> {
  //   const where =
  //     typeof identifier === 'number'
  //       ? { id: identifier }
  //       : { email: identifier };
  //   return this.userRepository.findOne({ where });
  // }
}
