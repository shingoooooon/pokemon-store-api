import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Request } from 'express';
import { IUser } from './user.inteface';
import { LoginDto } from 'src/auth/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: IUser): Promise<IUser> {
    return this.userService.create(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(Number(id));
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() user: IUser) {
    return this.userService.updateOne(Number(id), user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  // @Post('register')
  // @ApiBody({ type: CreateUserDto })
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

  //   return this.userService.create({
  //     ...createUserDto,
  //     password: hashedPassword,
  //   });
  // }
}
