import { Command } from "commander";
import { Category } from "../definition/category";
import { createComponent } from "../subcommand/component/function/create-component";
import { createProject } from "../subcommand/project/function/createProject";
import { enumToArray } from "./enum-to-array";

const inquirer = require("inquirer");

export default function registerCreateCommand(program: Command) {
  program
    .command("create [category] [template] [desiredName]")
    .alias("c")
    .option("-c, --category <category>", "component | project")
    .option("-t, --template <template>", "scratch | ionic-app | ... | ./my/templates/foo")
    .option("-n, --name <desiredName>", "my-component")
    .description("Generates components and projects from templates")
    .action(async (category: string, template: string, desiredName: string) => {
      const opts = program.opts();

      category = opts.category || category;
      template = opts.template || template;
      desiredName = opts.desiredName || desiredName;

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
            filter: function(val: string) {
              return val.toLowerCase();
            },
          },
        ]);
        category = choice.category;
      }

      const projectPath = process.cwd();

      switch (category) {
        case Category.COMPONENT:
          await createComponent(projectPath, template, desiredName);
          break;
        case Category.PROJECT:
          await createProject(projectPath, template, desiredName);
          break;
      }
    });
}
