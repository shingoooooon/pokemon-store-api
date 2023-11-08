import { readFileSync } from 'jsonfile';
import { UserEntity } from '../../../src/user/user.entity';
import type { DataSource } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';

export class Insert001Users implements Seeder {
  public async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const data = readFileSync('./db/data/user.example.json');

      if (!data) {
        return;
      }

      const repo = dataSource.getRepository(UserEntity);
      await repo.save(data);
    } catch (error) {
      console.info(error);
      // TODO
    }
  }
}
