import { mkdirSync } from 'fs';
import { isSafeToCreateAppIn } from './is-safe-to-create-app-in';

const chalk = require('chalk');

export const createProjectFolder = (
  projectPath: string,
  projectName: string,
  folderAlreadyExist: boolean = false,
): boolean => {
  if (!folderAlreadyExist) {
    mkdirSync(projectPath);
  }

  if (!isSafeToCreateAppIn(projectPath, projectName)) {
    return false;
  }

  console.log(`Creating a new SpringType project in ${chalk.green(projectPath)}.`);

  return true;
};
