const chalk = require("chalk");
import { readFileSync } from "fs";
import * as inquirer from "inquirer";
import { join, resolve, sep } from "path";
import { donationUrl } from "../../../../../definition/donation-url";
import { getTemplatesFromFolder } from "../../../../../function/get-templates";
import { copyTemplate } from "../../../action/copy-template";
import { printFooter } from "./print-footer";
import { validateClassName } from "./validate-class-name";

const DEFAULT_COMPONENT_TEMPLATE_TYPE = "default";

export async function createComponent(cwd: string, template: string, className: string, subPath: string) {
  const templateFolderPath = resolve(__dirname, "../../../../../template/" + subPath);
  const templates = getTemplatesFromFolder(templateFolderPath);

  if (template && template.indexOf(sep) === -1 && templates.indexOf(template.toLowerCase()) === -1) {
    console.log(`[!!] Error: The template ${template} doesn't exist. Exiting.`);
    process.exit(1);
  }

  if (!template) {
    const templateFolderChoice: { template: string } = await inquirer.prompt([
      {
        type: "list",
        choices: templates,
        name: "template",
        default: DEFAULT_COMPONENT_TEMPLATE_TYPE,
        message: "Please select a template",
        filter: (val: string) => {
          return val.toLowerCase();
        },
      },
    ]);
    template = templateFolderChoice.template;
  }

  // support for custom template paths
  const selectedTemplateFolderPath = template.indexOf(sep) === -1 ? join(templateFolderPath, template) : template;

  if (!className) {
    const choiceComponentClassName = await inquirer.prompt([
      {
        type: "input",
        name: "className",
        message: `Please specify the class name (e.g. ${chalk.cyan("MyClass")}):`,
        validate: validateClassName,
      },
    ]);
    className = choiceComponentClassName.className;
  }

  if (!copyTemplate(cwd, selectedTemplateFolderPath, className)) {
    return false;
  }

  const packageJson: { homepage: string; bugs: { url: string } } = JSON.parse(readFileSync(resolve(__dirname, "../../../../../package.json"), { encoding: "utf8" }));

  printFooter(packageJson.homepage, cwd, packageJson.bugs.url, donationUrl);
}
