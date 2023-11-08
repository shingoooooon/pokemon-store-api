import { readFileSync } from 'jsonfile';
import { PokemonEntity } from 'src/pokemon/entities/pokemon.entity';
import type { DataSource } from 'typeorm';
import type { Factory, Seeder } from 'typeorm-seeding';

export class Insert002Pokemon implements Seeder {
  public async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const data = readFileSync('./db/data/pokemon.example.json');

      if (!data) {
        return;
      }

      const repo = dataSource.getRepository(PokemonEntity);
      await repo.save(data);
    } catch (error) {
      console.info(error);
      // TODO
    }
  }
}
