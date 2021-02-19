import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, resolve } from 'path';
import { isProgramCodeFile } from './human-readable-files';
import { kebabToCamelCase } from './kebab-to-camel-case';
import { camelToKebabCase } from './camel-to-kebab-case';

const chalk = require('chalk');

const TEMPLATE_LOWER_REGEX = /templatename/g;
const TEMPLATE_LOWER_UPPER_REGEX = /templateName/g;
const TEMPLATE_UPPER_REGEX = /TemplateName/g;

export interface CopyRenameReplaceFileOptions {
  filePath: string;
  templateFolderPath: string;
  projectPath: string;
  concreteName: string;
}

export const copyAndConcreteFile = (options: CopyRenameReplaceFileOptions) => {
  const lcfirst = (s: string) => s.replace(/^\w/, (c) => c.toLocaleLowerCase());

  let fileName = relative(options.templateFolderPath, options.filePath)
    .replace(TEMPLATE_UPPER_REGEX, options.concreteName)
    .replace(TEMPLATE_LOWER_REGEX, options.concreteName)
    .replace(TEMPLATE_LOWER_UPPER_REGEX, lcfirst(options.concreteName))
    .replace(options.concreteName, camelToKebabCase(options.concreteName).toLocaleLowerCase());

  if (fileName[0] === '-') fileName = fileName.substring(1);

  const newFilePath = join(options.projectPath, fileName);
  mkdirSync(resolve(newFilePath, '..'), { recursive: true });

  // whitelist
  if (isProgramCodeFile(options.filePath)) {
    const programCode = readFileSync(options.filePath, { encoding: 'utf8' })
      .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
      .replace(TEMPLATE_LOWER_UPPER_REGEX, lcfirst(options.concreteName))
      .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

    writeFileSync(newFilePath, programCode);
  } else {
    copyFileSync(options.filePath, newFilePath);
  }

  console.log(`- ${chalk.cyan(fileName)}`);
};
