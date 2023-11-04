import { config } from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import database from './config/database';

// module.exports = {
//   ...database(),
//   entities: ['dist/**/*.entity.ts'],
//   migrations: ['db/migrations/*.ts'],
//   cli: {
//     migrationsDir: 'db/migrations',
//   },
// };

config();

export default new DataSource({
  ...database(),
  entities: ['dist/**/*.entity.ts'],
  migrations: ['db/migrations/*.ts'],
});

// export default new DataSource({
//   ...(database() as DataSourceOptions),
//   entities: [],
//   subscribers: [],
//   migrations: ['db/migrations/*.ts'],
// });
