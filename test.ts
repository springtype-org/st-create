import { existsSync } from "fs";
import { deletePathOrFile } from "st-rm-rf";
import { resolve } from "path";

// automating CLI input
process.argv[2] = "-c";
process.argv[3] = "component";
process.argv[4] = "-t";
process.argv[5] = "default";
process.argv[6] = "-d";
process.argv[7] = "testfixture";

const cwd = process.cwd();

// execute CLI
require('./dist/cli');

setTimeout(() => {

    const ok = existsSync(resolve(cwd, './testfixture/testfixture.tsx'));

    deletePathOrFile(resolve(cwd, './testfixture'));

    if (!ok) {
        console.log('[!!] Project has not been created.');
        process.exit(1);
    } else {
        console.log('[OK] Test success.');
        process.exit(0);
    }
}, 1000)