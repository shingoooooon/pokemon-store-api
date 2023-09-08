import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enum/role.enum';

export class CreateUserDto {
  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly email!: string;

  @ApiProperty()
  readonly password!: string;
}
