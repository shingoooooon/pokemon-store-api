import * as chalk from 'chalk';
import { config } from 'dotenv';
import { get } from 'lodash';
import * as ora from 'ora';
import {
  configureConnection,
  createConnection,
  getConnectionOptions,
  importSeed,
  runSeeder,
} from 'typeorm-seeding';
import { SeedCommand as BaseSeedCommand } from 'typeorm-seeding/dist/commands/seed.command';
import { SeederConstructor } from 'typeorm-seeding/dist/types';
import { importFiles, loadFiles } from 'typeorm-seeding/dist/utils/file.util';
import * as yargs from 'yargs';

interface SeedingOptions {
  factories: string[];
  seeds: string[];
}

config();
const seedsPath = {
  dev: ['db/seeds/dev/**/*.ts'],
  stg: ['db/seeds/stg/**/*.ts'],
  prod: ['db/seeds/prod/**/*.ts'],
};

function panic(spinner: ora.Ora, error: Error, message: string) {
  spinner.fail(message);
  console.error(error);
  process.exit(1);
}

export class SeedCommand extends BaseSeedCommand {
  constructor() {
    super();
  }

  async handler(args: yargs.Arguments) {
    if (['dev', 'stg', 'prod'].indexOf(<string>args.env) === -1) {
      throw new Error('Invalid -env or -e. Option: dev, stg, prod');
    }

    if (process.env.APP_STAGE !== args.env) {
      throw new Error('Option: --env or -e must be the same as APP_STAG.');
    }

    args.configName = 'ormconfig.seed.ts';
    const log = console.log;
    log('🌱  ' + chalk.bold('TypeORM Seeding v0.0.1'));
    const spinner = ora('Loading ormconfig').start();
    const configureOption = {
      root: args.root as string,
      configName: args.configName as string,
      connection: args.connection as string,
    };

    // Get TypeORM config file
    let option: SeedingOptions = { factories: [], seeds: [] };
    try {
      configureConnection(configureOption);
      option = await getConnectionOptions();
      option.seeds = get(seedsPath, (args.env || args.e) as string, []);
      option.seeds.push('db/seeds/common/**/*.ts');
      spinner.succeed('ORM Config loaded');
    } catch (error: any) {
      panic(spinner, error as Error, 'Could not load the config file!');
    }
    // Find all factories and seed with help of the config
    spinner.start('Import Factories');
    const factoryFiles = loadFiles(option.factories);
    try {
      await importFiles(factoryFiles);
      spinner.succeed('Factories are imported');
    } catch (error: any) {
      panic(spinner, error as Error, 'Could not import factories!');
    }

    // Show seeds in the console
    spinner.start('Importing Seeders');
    let seedFiles = loadFiles(option.seeds);
    seedFiles = seedFiles.filter((item) => item.indexOf('.example') === -1);
    let seedFileObjects: any[] = [];
    try {
      seedFileObjects = await Promise.all(seedFiles.map(importSeed));
      seedFileObjects = seedFileObjects.filter(
        (seedFileObject) =>
          args.seed === undefined || args.seed === seedFileObject.name,
      );
      spinner.succeed('Seeders are imported');
    } catch (error) {
      panic(spinner, error as Error, 'Could not import seeders!');
    }

    // Get database connection and pass it to the seeder
    spinner.start('Connecting to the database');
    try {
      await createConnection();
      spinner.succeed('Database connected');
    } catch (error: any) {
      panic(
        spinner,
        error as Error,
        'Database connection failed! Check your typeORM config file.',
      );
    }

    // Run seeds
    for (const seedFileObject of seedFileObjects) {
      spinner.start(`Executing ${seedFileObject.name} Seeder`);
      try {
        await runSeeder(seedFileObject as SeederConstructor);
        spinner.succeed(`Seeder ${seedFileObject.name} executed`);
      } catch (error) {
        spinner.fail(`Could not run the seed ${seedFileObject.name}!`);
        console.error(error);
        process.exit(1);
      }
    }

    log('👍 ', chalk.gray.underline('Finished Seeding'));
    process.exit(0);
  }
}
