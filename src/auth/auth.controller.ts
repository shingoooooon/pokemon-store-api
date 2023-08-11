import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { ApiBody } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne(loginDto.email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    const authUser = await this.authService.getAuthUser(request);

    return authUser;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
}
