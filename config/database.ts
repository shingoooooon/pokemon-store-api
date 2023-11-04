import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DB_CONNECTION as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
}));
