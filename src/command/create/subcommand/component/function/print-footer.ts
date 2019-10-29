const chalk = require("chalk");

export const printFooter = (documentationUrl: string, componentPath: string, issueUrl: string, donateUrl: string) => {
  console.log("");
  console.log(chalk.green(`Created component in: ${componentPath}`));
  console.log("");
  console.log("If you are unfamiliar with SpringType, please head on to: 👩‍💻👨‍💻");
  console.log(`${chalk.green(documentationUrl)}`);
  console.log("");
  console.log("We hope you'll have the same fun using it as we had creating it! 🤩");
  console.log();
  console.log("But if you think else, if it seems to be counter-intuitive or buggy atm 🧐, ");
  console.log("please file an issue 💩 so we can improve SpringType asap:");
  console.log(`${chalk.green(issueUrl)}`);
  console.log();
  console.log(chalk.yellow("🚀 We are highly motivated to deliver a *stellar* developer experience! 🚀"));
  console.log();
  console.log(`${chalk.magenta(chalk.bold("💰 Love SpringType? Please become a Patreon and help SpringType spread... :) 💰"))}`);
  console.log(`💰 ${chalk.cyan(chalk.bold(donateUrl))} 💰`);
  console.log("");
};
