const chalk = require('chalk');

export const validateClassName = (className: string): boolean | string => {
  const forbiddenFirstCharacters = /[a-z0-9-]/g;

  let containsIrregularCharacter = false;

  if (forbiddenFirstCharacters.test(className[0])) {
    containsIrregularCharacter = true;
  }

  if (containsIrregularCharacter) {
    return `${chalk.red(
      `The class '${chalk.green(className)}' has invalid characters.\n` +
        'A class name should start uppercase but should NOT start with a number or dash.\n\n',
    )}`;
  }
  return true;
};
