const chalk = require("chalk");

export const validateComponentName = (componentName: string): boolean | string => {
  const forbiddenFirstCharacters = /[a-z0-9-]/g;

  let containsIrregularCharacter = false;

  if (forbiddenFirstCharacters.test(componentName[0])) {
    containsIrregularCharacter = true;
  }

  if (containsIrregularCharacter) {
    return `${chalk.red(`The component '${chalk.green(componentName)}' has invalid characters.\n` + `A component name should NOT start with a number, lower case character or dash.\n\n`)}`;
  }
  return true;
};
