import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { Role } from '../enum/role.enum';
import { IUser } from 'src/user/user.inteface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'ROLES_KEY',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IUser = request.user;
    const latestUser = await this.userService.findOne(user.id);
    const hasRole = requiredRoles.indexOf(latestUser.roles) > -1;
    let hasPermission = false;
    if (hasRole) {
      hasPermission = true;
    }

    return latestUser && hasPermission;
  }
}
