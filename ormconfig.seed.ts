import database from './config/database';

module.exports = {
  ...database(),
  entities: ['src/**/*.entity.ts'],
  factories: ['db/factories/**/*.ts'],
  seeds: [],
};
