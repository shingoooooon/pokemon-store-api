import { DefaultMigration } from './default.migration';

export class TimestampSoftDeleteMigration extends DefaultMigration {
  public defaultColumns = [
    {
      name: 'createdAt',
      type: 'datetime',
      isNullable: true,
      isCreateDate: true,
      default: 'CURRENT_TIMESTAMP',
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      isUpdateDate: true,
      default: 'CURRENT_TIMESTAMP',
    },
    {
      name: 'deletedAt',
      type: 'datetime',
      isNullable: true,
    },
  ];
}
