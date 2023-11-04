import { QueryRunner } from 'typeorm';

import { BaseMigration } from './base.migration';

export abstract class ConstraintMigration extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await this.beforeUp(queryRunner);
    await this._createForeignKey(queryRunner);
    await this._createIndex(queryRunner);
    await this.afterUp(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await this.beforeDown(queryRunner);
    await this._dropIndex(queryRunner);
    await this._dropForeignKey(queryRunner);
    await this.afterDown(queryRunner);
  }
}
