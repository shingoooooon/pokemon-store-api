import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { IUser } from './user.inteface';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/request/login.dto';
import { CreateUserDto } from './request/create-user.dto';
import { Role } from 'src/auth/enum/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash: string = await this.authService.hashPassword(
      createUserDto.password,
    );

    const user = new UserEntity();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.roles = Role.USER;
    user.password = passwordHash;

    const newUser: IUser = await this.userRepository.save(user);
    if (newUser) {
      const { password, ...result } = newUser;
      return result;
    } else {
      throw new BadRequestException();
    }
  }

  async findOne(identifier: string | number): Promise<IUser> {
    const where =
      typeof identifier === 'number'
        ? { id: identifier }
        : { email: identifier };
    const user: IUser = await this.userRepository.findOne({ where });

    if (where['id']) {
      const { password, ...result } = user;
      return result;
    } else {
      return user;
    }
  }

  async findAll(): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.find();
    users.forEach(function (v) {
      delete v.password;
    });
    return users;
  }

  deleteOne(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  updateOne(id: number, user: IUser): Promise<any> {
    if (user.email || user.password || user.roles) {
      throw new BadRequestException();
    }
    return this.userRepository.update(id, user);
  }

  updateRoleOfUser(id: number, user: IUser): Promise<any> {
    return this.userRepository.update(id, user);
  }
}
