import { readdirSync, statSync } from 'fs';
import { sep } from 'path';
import { copyAndConcreteFile } from '../../../function/copy-and-concrete-file';

const getFiles = (dir: string, fileDiscoveredCb: (filePath: string) => void) => {
  const files = readdirSync(dir);
  for (const i in files) {
    const path = dir + sep + files[i];
    if (statSync(path).isDirectory()) {
      getFiles(path, fileDiscoveredCb);
    } else {
      fileDiscoveredCb(path);
    }
  }
};

export const copyTemplate = (projectPath: string, templateFolderPath: string, concreteName: string): boolean => {
  console.log();
  console.log('Creating files:');
  getFiles(templateFolderPath, (filePath: string) =>
    copyAndConcreteFile({
      filePath,
      templateFolderPath,
      projectPath,
      concreteName,
    }),
  );
  return true;
};
