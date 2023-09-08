import { Role } from 'src/auth/enum/role.enum';

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  roles?: Role;
}
