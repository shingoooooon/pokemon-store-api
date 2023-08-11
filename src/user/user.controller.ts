import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { User } from './user.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    return this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}
