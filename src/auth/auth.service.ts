import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './request/login.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/user/user.inteface';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJWT(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  // async login(loginDto: LoginDto, response: Response): Promise<void> {
  //   const user = await this.userService.findOne(loginDto.email);

  //   if (!user) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   if (!(await bcrypt.compare(loginDto.password, user.password))) {
  //     throw new BadRequestException('invalid credentials');
  //   }

  //   const jwt = await this.jwtService.signAsync({ id: user.id });

  //   response.cookie('jwt', jwt, { httpOnly: true });
  // }

  // async getAuthUser(request: Request): Promise<any> {
  //   try {
  //     const cookie = request.cookies['jwt'];
  //     const data = await this.jwtService.verifyAsync(cookie);

  //     if (!data) {
  //       throw new UnauthorizedException();
  //     }

  //     const user = await this.userService.findOne(data['id']);

  //     const { password, ...result } = user;

  //     return result;
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  // }
}
