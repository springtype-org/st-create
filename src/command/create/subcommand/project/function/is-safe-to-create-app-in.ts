const chalk = require("chalk");
import { readdirSync } from "fs";
import { join } from "path";
import { deletePathOrFile } from "st-rm-rf";
import { filesAllowedToResistInAppDir } from "../definition/files-allowed-to-resist-in-app-dir";
import { logFiles } from "../definition/logFiles";

export const isSafeToCreateAppIn = async (rootPath: string, name: string) => {
  console.log();
  const conflicts = readdirSync(rootPath)
    .filter((file: string) => !filesAllowedToResistInAppDir.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter((file: string) => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter((file: string) => !logFiles.some(pattern => file.indexOf(pattern) === 0));

  if (conflicts.length > 0) {
    console.log(`The directory ${chalk.green(name)} contains files that could conflict:`);
    console.log();
    for (const file of conflicts) {
      console.log(`  ${file}`);
    }
    console.log();
    console.log("Either try using a new directory name, or remove the files listed above.");

    return false;
  }

  // Remove any remnant files from a previous installation
  const currentFiles = readdirSync(join(rootPath));
  for (let i = 0; i < currentFiles.length; i++) {
    const file = currentFiles[i];
    if (logFiles.find((errorLogFilePattern: string) => file.indexOf(errorLogFilePattern) === 0)) {
      await deletePathOrFile(join(rootPath, file));
    }
  }
  return true;
};
