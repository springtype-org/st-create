import { existsSync } from "fs";
import { deletePathOrFile } from "st-rm-rf";
import { resolve } from "path";

// automating CLI input
process.argv[2] = "create";
process.argv[3] = "-c";
process.argv[4] = "component";
process.argv[5] = "-t";
process.argv[6] = "default";
process.argv[7] = "-n";
process.argv[8] = "testfixture";

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