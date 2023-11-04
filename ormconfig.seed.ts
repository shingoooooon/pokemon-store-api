import database from './config/database';

module.exports = {
  ...database(),
  entities: ['app/**/*.entity.ts'],
  factories: ['db/factories/**/*.ts'],
  seeds: [],
};
