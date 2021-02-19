import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import * as inquirer from 'inquirer';
import { join, resolve } from 'path';
import { donationUrl } from '../../../../../definition/donation-url';
import { copyTemplate } from '../../../action/copy-template';
import { installModules } from '../action/install-modules';
import { cloneRepository } from './clone-repository';
import { createProjectFolder } from './create-project-folder';
import { printFooter } from './print-footer';
import { validateProjectDirectoryInput } from './validate-project-directory-input';

const chalk = require('chalk');

const transformPackageDependenciesToStrings = (packageJson: any, key: string): Array<string> => {
  const dependencies: Array<string> = [];
  for (const dependencyName in packageJson[key]) {
    dependencies.push(`${dependencyName}@${packageJson[key][dependencyName]}`);
  }
  return dependencies;
};

export async function createProject(cwd: string, template: string, projectName: string) {
  if (!template) {
    console.log(
      '[!!] Error: No template argument provided. Make sure you provide -t $templateFolderOrGitUrl. Exiting.',
    );
    process.exit(1);
  }

  const isGitRepo = template.startsWith('http');

  if (isGitRepo) {
    template = await cloneRepository(template);
  } else if (!existsSync(template)) {
    console.log(`[!!] Error: The template ${template} doesn't exist. Exiting.`);
    process.exit(1);
  }

  if (!projectName) {
    // get project directory name
    const choiceProjectName = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: `Please specify the App name (e.g. ${chalk.cyan('MyApp')}):`,
        validate: validateProjectDirectoryInput,
      },
    ]);
    projectName = choiceProjectName.projectName;
  }

  const projectPathName = projectName.toLowerCase();
  const root = resolve(projectPathName);
  const folderAlreadyExist = existsSync(root);

  if (folderAlreadyExist) {
    const shouldOverride = await inquirer.prompt([
      {
        type: 'confirm',
        default: false,
        name: 'answer',
        message: 'The chosen directory already exists. Are you sure that you want to override it?',
      },
    ]);

    if (!shouldOverride.answer) {
      return false;
    }
  }

  const projectPath = join(cwd, projectPathName);

  if (!createProjectFolder(projectPath, projectPathName, folderAlreadyExist)) {
    return false;
  }
  const packageJSON: { dependencies: any; devDependencies: any } = JSON.parse(
    readFileSync(join(template, 'package.json'), { encoding: 'utf8' }),
  );

  const dependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, 'dependencies');
  const devDependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, 'devDependencies');

  if (!copyTemplate(projectPath, template, projectName)) {
    return false;
  }

  if (isGitRepo) {
    execSync(`rm -rf ${template}`, {
      stdio: 'inherit',
    });
  }

  if (!(await installModules(projectPath, dependenciesAsString, devDependenciesAsString))) {
    return false;
  }

  const packageJson: { homepage: string; bugs: { url: string } } = JSON.parse(
    readFileSync(resolve(__dirname, '../../../../../package.json'), { encoding: 'utf8' }),
  );

  printFooter(packageJson.homepage, projectPath, packageJson.bugs.url, donationUrl);
}
