import { writeFile } from 'jsonfile';
import { join } from 'path';

import tsconfig from '../tsconfig.json';

const content = tsconfig;
content.compilerOptions.outDir = '.tmp';
Object.assign(content, { include: ['app/**/*'] });

const filePath = join(process.cwd(), 'tsconfig.build.json');
writeFile(filePath, content, { spaces: 2 }, (err) => {
  if (err === null) {
    process.exit(0);
  } else {
    console.error('Failed to generate the tsconfig.build.json', err);
    process.exit(1);
  }
});
