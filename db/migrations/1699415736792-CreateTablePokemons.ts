import { TimestampSoftDeleteMigration } from '../common';
import { TableColumnOptions } from 'typeorm';

export class CreateTablePokemons1699415736792 extends TimestampSoftDeleteMigration {
  public tableName = 'pokemons';
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
      name: 'price',
      type: 'varchar',
    },
    {
      name: 'description',
      type: 'varchar',
    },
    {
      name: 'imgPath',
      type: 'varchar',
    },
    {
      name: 'type1',
      type: 'varchar',
    },
    {
      name: 'type2',
      type: 'varchar',
    },
  ];
}
