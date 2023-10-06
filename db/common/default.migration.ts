import { QueryRunner, Table, TableColumn } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

import { BaseMigration } from './base.migration';

export abstract class DefaultMigration extends BaseMigration {
  public columns: TableColumnOptions[] = [];
  public defaultColumns: TableColumnOptions[] = [];

  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.beforeUp(queryRunner);
    if (this.columns.length && this.tableName) {
      const tableColumns = [...this.columns, ...this.defaultColumns].map(
        (column) => new TableColumn(column),
      );
      const table = new Table({
        name: this._getTableName(),
        columns: tableColumns,
      });
      await queryRunner.createTable(table);
    }
    await this._createForeignKey(queryRunner);
    await this._createIndex(queryRunner);
    await this.afterUp(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.beforeDown(queryRunner);
    await this._dropIndex(queryRunner);
    await this._dropForeignKey(queryRunner);
    await queryRunner.dropTable(this._getTableName());
    await this.afterDown(queryRunner);
  }
}
