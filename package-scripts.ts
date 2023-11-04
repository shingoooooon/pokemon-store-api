/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { series } from 'nps-utils';

function runFast(path: string) {
  return `ts-node-transpile-only ${path}`;
}

function runFast2(path: string) {
  return `ts-node -r tsconfig-paths/register ${path}`;
}

function banner(name: string) {
  return {
    hiddenFromHelp: true,
    silent: true,
    description: `Shows ${name} banners to the console`,
    script: runFast(`./cli/banner.ts ${name}`),
  };
}

module.exports = {
  scripts: {
    default: 'nest start',
    /**
     * Creates the needed configuration files
     */
    config: {
      script: series(runFast('./cli/tsconfig.ts')),
      hiddenFromHelp: true,
    },
    /**
     * Database scripts
     */
    db: {
      migrate: {
        script: series(
          'nps banner.migrate',
          runFast('./node_modules/typeorm/cli.js --d=ormconfig migration:run'),
        ),
        description: 'Migrates the database to newest version available',
      },
      revert: {
        script: series(
          'nps banner.revert',
          runFast('./node_modules/typeorm/cli.js migration:revert'),
        ),
        description: 'Downgrades the database',
      },
      show: {
        script: runFast(
          './node_modules/typeorm/cli.js --d=ormconfig migration:show',
        ),
        description: 'Shows the migrations of the database',
      },
      drop: {
        script: runFast(
          './node_modules/typeorm/cli.js --d=ormconfig schema:drop',
        ),
        description: 'Drops the schema of the database',
      },
      log: {
        script: runFast(
          './node_modules/typeorm/cli.js --d=ormconfig schema:log',
        ),
        description: 'Logs the schema of the database',
      },
      sync: {
        script: runFast(
          './node_modules/typeorm/cli.js --d=ormconfig schema:sync',
        ),
        description: 'Syncs the schema of the database',
      },
      seed: {
        script: series(
          'nps banner.seed',
          runFast2('./cli/seed.cli.ts --d=ormconfig seed'),
        ),
        description: 'Seeds generated records into the database',
      },
      setup: {
        script: series(
          'nps db.drop',
          'nps db.migrate',
          // 'nps db.seed'
          // better to run seed by specify environment manually to avoid unexpected result.
        ),
        description: 'Recreates the database with seeded data',
      },
    },
    /**
     * This creates pretty banner to the terminal
     */
    banner: {
      migrate: banner('migrate'),
      seed: banner('seed'),
      revert: banner('revert'),
      clean: banner('clean'),
    },
  },
};
