import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './request/login.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/user/user.inteface';
import { UserService } from 'src/user/user.service';
import { TokenResDto } from './response/token-res.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateJWT(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }

  async login(user: IUser) {
    const response = new TokenResDto();
    const token = await this.generateJWT(user);
    return { ...response, accessToken: token };
  }

  async logout(user: { rjwt: string }): Promise<{ token: string }> {
    // TODO revoke token
    return { token: '' };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    const isValidated = await this.comparePasswords(
      loginDto.password,
      user.password,
    );
    if (isValidated) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException();
    }
  }
}
