#!/ usr/bin/env node
import 'reflect-metadata';

import { ConfigCommand } from 'typeorm-seeding/dist/commands/config.command';
import * as yargs from 'yargs';

import { SeedCommand } from './seed.command';

// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  // .demandOption(['type'])
  .option('env', {
    required: true,
    alias: 'e',
    type: 'string',
    description: 'Run with environment',
  })
  .command(new ConfigCommand())
  .command(new SeedCommand()).argv;
