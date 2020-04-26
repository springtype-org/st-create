import { Command } from "commander";
import { Category } from "../definition/category";
import { createComponent } from "../subcommand/component/function/create-component";
import { createProject } from "../subcommand/project/function/createProject";
import { enumToArray } from "./enum-to-array";

const inquirer = require("inquirer");

export default function registerCreateCommand(program: Command) {
  program
    .command("create [category] [template] [name]")
    .alias("c")
    .option("-c, --category <category>", "component | project")
    .option("-t, --template <template>", "default | ionic-app | ... | ./my/templates/foo")
    .option("-n, --name <name>", "my-component")
    .description("Generates components and projects from templates")
    .action(async (category: string, template: string, name: string) => {
      const opts = program.opts();

      category = opts.category || category;
      template = opts.template || template;
      name = opts.name || name;

      if (typeof name !== "string") name = undefined;

      const categories = enumToArray(Category);

      if (category && categories.indexOf(category.toLowerCase()) === -1) {
        console.log(`[!!] Error: The category ${category} doesn't exist. Exiting.`);
        process.exit(1);
      }

      if (!category) {
        const choice: { category: Category } = await inquirer["prompt"]([
          {
            type: "list",
            choices: categories,
            name: "category",
            default: "component",
            message: "Please select a category",
            filter: function (val: string) {
              return val.toLowerCase();
            },
          },
        ]);
        category = choice.category;
      }

      const projectPath = process.cwd();

      switch (category) {
        case Category.SERVICE:
          await createComponent(projectPath, template, name, 'service');
          break;
        case Category.COMPONENT:
          await createComponent(projectPath, template, name, 'component');
          break;
        case Category.PROJECT:
          await createProject(projectPath, template, name);
          break;
      }
    });
}
