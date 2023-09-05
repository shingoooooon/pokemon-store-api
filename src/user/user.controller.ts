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
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './user.inteface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() user: IUser) {
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
