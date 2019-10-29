import chalk from "chalk";
import { readFileSync } from "fs";
import * as inquirer from "inquirer";
import { join, resolve, sep } from "path";
import { donationUrl } from "../../../../../definition/donation-url";
import { getTemplatesFromFolder } from "../../../../../function/get-templates";
import { copyTemplate } from "../../../action/copy-template";
import { printFooter } from "./print-footer";
import { validateComponentName } from "./validate-component-name";

const DEFAULT_COMPONENT_TEMPLATE_TYPE = "scratch";

export async function createComponent(cwd: string, template: string, componentName: string) {
  const templateFolderPath = resolve(__dirname, "../../../../../template/component");
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

  if (!componentName) {
    // get Web Component tag name
    const choiceComponentTagName = await inquirer.prompt([
      {
        type: "input",
        name: "componentName",
        message: `Please specify the component tag name (e.g. ${chalk.cyan("MySideMenu")}):`,
        validate: validateComponentName,
      },
    ]);
    componentName = choiceComponentTagName.componentName;
  }

  if (!copyTemplate(cwd, selectedTemplateFolderPath, componentName)) {
    return false;
  }

  const packageJson: { homepage: string; bugs: { url: string } } = JSON.parse(readFileSync(resolve(__dirname, "../../../../../package.json"), { encoding: "utf8" }));

  printFooter(packageJson.homepage, cwd, packageJson.bugs.url, donationUrl);
}
