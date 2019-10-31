#!/usr/bin/env node

import chalk from "chalk";
import * as commander from "commander";
import envinfo from "envinfo";
import { readFileSync } from "fs";
import { resolve } from "path";
import registerCreateCommand from "./command/create/function/register-create-command";
import { printHeader } from "./function/print-header";

const packageJson = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf8"));

// always print the header first
printHeader();

if (process.argv.length === 2) {
  // default action
  process.argv[2] = "create";
}

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .option("-c, --category <category>", "component | project")
  .option("-t, --template <template>", "scratch | ionic-app | ... | ./my/templates/foo")
  .option("-n, --name <name>", "my-component")
  .option("--info", "print environment debug info")
  .allowUnknownOption()
  .on("--help", () => {
    console.log();
    console.log(`    If you have any problems, do not hesitate to file an issue:`);
    console.log(`      ${chalk.cyan(packageJson.bugs.url)}`);
    console.log();
  });

(async () => {
  await registerCreateCommand(program);

  program.parse(process.argv);

  if (program.info) {
    console.log(chalk.bold("\nEnvironment Info:"));

    console.log(
      await envinfo.run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "npm", "Yarn"],
          Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
          npmPackages: ["springtype"],
          npmGlobalPackages: ["st-create"],
        },
        {
          duplicates: true,
          showNotFound: true,
        },
      ),
    );
  }
})();
