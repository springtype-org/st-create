import { Dirent, readdirSync } from "fs";

export const getTemplatesFromFolder = (templateFolderPath: string): Array<string> => {
  return readdirSync(templateFolderPath, { withFileTypes: true })
    .filter((directoryEntry: Dirent) => directoryEntry.isDirectory())
    .map((directoryEntry: Dirent) => directoryEntry.name);
};
