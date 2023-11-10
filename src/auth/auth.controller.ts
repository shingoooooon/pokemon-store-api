import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './request/login.dto';
import { JwtAuthGuard } from './guards/jwt-guards';
import { LoginResDto } from './response/login-res.dto';
import { Auth, AuthJwt } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResDto> {
    const user = await this.authService.validateUser(loginDto);
    const token = await this.authService.login(user);
    return { user, token };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Auth()
  logout(@AuthJwt() user: { rjwt: string }): Promise<{ token: string }> {
    return this.authService.logout(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
