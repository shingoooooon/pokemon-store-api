import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './request/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { Request } from 'express';
import { IUser } from './user.inteface';
import { LoginDto } from 'src/auth/request/login.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<IUser[]> {
    return this.userService.findAll();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    return this.userService.deleteOne(Number(id));
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() user: IUser): Promise<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @Put(':id/role')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: IUser,
  ): Promise<any> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.userService.login(loginDto);
  }
}
