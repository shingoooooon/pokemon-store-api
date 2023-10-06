import { QueryRunner, TableForeignKey, TableIndex } from 'typeorm';
import { TableForeignKeyOptions } from 'typeorm/schema-builder/options/TableForeignKeyOptions';
import { TableIndexOptions } from 'typeorm/schema-builder/options/TableIndexOptions';

export async function createForeignKey(
  queryRunner: QueryRunner,
  tableName: string,
  options: TableForeignKeyOptions,
) {
  await queryRunner.createForeignKey(tableName, new TableForeignKey(options));
}

export async function dropForeignKey(
  queryRunner: QueryRunner,
  tableName: string,
  options: TableForeignKeyOptions,
) {
  await queryRunner.dropForeignKey(tableName, new TableForeignKey(options));
}

export async function createIndex(
  queryRunner: QueryRunner,
  tableName: string,
  options: TableIndexOptions,
) {
  await queryRunner.createIndex(tableName, new TableIndex(options));
}

export async function dropIndex(
  queryRunner: QueryRunner,
  tableName: string,
  options: TableIndexOptions,
) {
  await queryRunner.dropIndex(tableName, new TableIndex(options));
}

export function getTableName(tableName: string) {
  return `${process.env.DB_ENTITY_PREFIX || ''}${tableName}`;
}
