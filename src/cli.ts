#!/usr/bin/env node

import envinfo from 'envinfo';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import registerCreateCommand from './command/create/function/register-create-command';
import { printHeader } from './function/print-header';

const chalk = require('chalk');
const { createCommand } = require('commander');

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'));

// always print the header first
printHeader();

const program = createCommand(packageJson.name)
  .version(packageJson.version)
  .option('-t, --template <template>', 'default | guide | ... | ./my/templates/foo')
  .option('-d, --descriptor <descriptor>', 'my-component')
  .option('--info', 'print environment debug info')
  .allowUnknownOption()
  .on('--help', () => {
    console.log();
    console.log('    If you have any problems, do not hesitate to file an issue:');
    console.log(`      ${chalk.cyan(packageJson.bugs.url)}`);
    console.log();
  });

(async () => {
  await registerCreateCommand(program);

  program.parse(process.argv);

  if (program.info) {
    console.log(chalk.bold('\nEnvironment Info:'));

    console.log(
      await envinfo.run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'npm', 'Yarn'],
          Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
          npmPackages: ['springtype'],
          npmGlobalPackages: ['st-create'],
        },
        {
          duplicates: true,
          showNotFound: true,
        },
      ),
    );
  }
})();
