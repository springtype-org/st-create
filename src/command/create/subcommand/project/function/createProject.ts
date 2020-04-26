const chalk = require("chalk");
import { existsSync, readFileSync } from "fs";
import * as inquirer from "inquirer";
import { join, resolve, sep } from "path";
import { donationUrl } from "../../../../../definition/donation-url";
import { getTemplatesFromFolder } from "../../../../../function/get-templates";
import { copyTemplate } from "../../../action/copy-template";
import { installModules } from "../action/install-modules";
import { startApp } from "../action/start-app";
import { createProjectFolder } from "./create-project-folder";
import { printFooter } from "./print-footer";
import { validateProjectDirectoryInput } from "./validate-project-directory-input";

const DEFAULT_PROJECT_TEMPLATE_TYPE = "default";

const transformPackageDependenciesToStrings = (packageJson: any, key: string): Array<string> => {
  const dependencies: Array<string> = [];
  for (let dependencyName in packageJson[key]) {
    dependencies.push(`${dependencyName}@${packageJson[key][dependencyName]}`);
  }
  return dependencies;
};

export async function createProject(cwd: string, template: string, projectName: string) {
  const templateFolderPath = resolve(__dirname, "../../../../../template/project");
  const templates = getTemplatesFromFolder(templateFolderPath);

  if (template && template.indexOf(sep) === -1 && templates.indexOf(template.toLowerCase()) === -1) {
    console.log(`[!!] Error: The template ${template} doesn't exist. Exiting.`);
    process.exit(1);
  }

  if (!template) {
    const templateFolderChoice: { template: string } = await inquirer["prompt"]([
      {
        type: "list",
        choices: templates,
        name: "template",
        default: DEFAULT_PROJECT_TEMPLATE_TYPE,
        message: "Please select a template",
        filter: (val: string) => {
          return val.toLowerCase();
        },
      },
    ]);
    template = templateFolderChoice.template;
  }

  const selectedTemplateFolderPath = template.indexOf(sep) === -1 ? join(templateFolderPath, template) : template;

  if (!projectName) {
    //get project directory name
    const choiceProjectName = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: `Please specify the App name (e.g. ${chalk.cyan("MyApp")}):`,
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
        type: "confirm",
        default: false,
        name: "answer",
        message: `The chosen directory already exists. Are you sure that you want to override it?`,
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
  const packageJSON: { dependencies: any; devDependencies: any } = JSON.parse(readFileSync(join(selectedTemplateFolderPath, "package.json"), { encoding: "utf8" }));

  const dependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, "dependencies");
  const devDependenciesAsString: Array<string> = transformPackageDependenciesToStrings(packageJSON, "devDependencies");

  if (!copyTemplate(projectPath, selectedTemplateFolderPath, projectName)) {
    return false;
  }

  if (!(await installModules(projectPath, dependenciesAsString, devDependenciesAsString))) {
    return false;
  }

  const packageJson: { homepage: string; bugs: { url: string } } = JSON.parse(readFileSync(resolve(__dirname, "../../../../../package.json"), { encoding: "utf8" }));

  printFooter(packageJson.homepage, projectPath, packageJson.bugs.url, donationUrl);

  if (!(await startApp(projectPath))) {
    return false;
  }
}
