import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './request/create-user.dto';
import { IUser } from './user.inteface';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/profileimages',
        filename: (req, file, cb) => {
          const fileName: string =
            path.parse(file.originalname).name.replace(/\s/, '') + uuidv4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<object> {
    return { imagePath: file.path };
  }
}
