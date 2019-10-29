import { concatErrors } from "../../../../../function/concat-errors";

const spawn = require("cross-spawn");

export const startApp = async (root: string) => {
  await new Promise((resolve, reject) => {
    process.chdir(root);
    console.log();
    console.log("Starting ...");

    const child = spawn("yarn", ["start"], { stdio: "inherit" });

    child.on("close", (code: number) => {
      if (code !== 0) {
        concatErrors(["npm exited with error code: " + code]);
        reject(code);
      } else {
        resolve();
      }
    });
  });
  return true;
};
