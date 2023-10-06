import { TimestampSoftDeleteMigration } from 'db/common/timestamp-soft-delete.migration';
import { Role } from 'src/auth/enum/role.enum';
import { TableColumnOptions } from 'typeorm';

export class CreateTableUsers1696557853037 extends TimestampSoftDeleteMigration {
  public tableName = 'users';
  public columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int',
      isPrimary: true,
      isGenerated: true,
      isUnique: true,
      generationStrategy: 'increment',
    },
    {
      name: 'name',
      type: 'varchar',
    },
    {
      name: 'email',
      type: 'varchar',
    },
    {
      name: 'password',
      type: 'varchar',
    },
    {
      name: 'roles',
      type: 'enum',
      enum: Object.values(Role),
      default: `'${Role.ADMIN}'`,
    },
  ];
}
