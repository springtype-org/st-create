import chalk from "chalk";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, relative, resolve } from "path";
import { isProgramCodeFile } from "./human-readable-files";
import { kebabToCamelCase } from "./kebab-to-camel-case";

const TEMPLATE_LOWER_REGEX = /templatename/g;
const TEMPLATE_UPPER_REGEX = /TemplateName/g;

export interface CopyRenameReplaceFileOptions {
  filePath: string;
  templateFolderPath: string;
  projectPath: string;
  concreteName: string;
}

export const copyAndConcreteFile = (options: CopyRenameReplaceFileOptions) => {
  const fileName = relative(options.templateFolderPath, options.filePath)
    .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
    .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

  const newFilePath = join(options.projectPath, fileName);
  mkdirSync(resolve(newFilePath, ".."), { recursive: true });

  // whitelist
  if (isProgramCodeFile(options.filePath)) {
    const programCode = readFileSync(options.filePath, { encoding: "utf8" })
      .replace(TEMPLATE_LOWER_REGEX, options.concreteName.toLocaleLowerCase())
      .replace(TEMPLATE_UPPER_REGEX, kebabToCamelCase(options.concreteName));

    writeFileSync(newFilePath, programCode);
  } else {
    copyFileSync(options.filePath, newFilePath);
  }

  console.log(`- ${chalk.cyan(fileName)}`);
};
