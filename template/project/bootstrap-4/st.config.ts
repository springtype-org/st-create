import { setConfig } from "st-start";

setConfig({
    entryPoint: 'src/index.tsx',
    indexHTMLTemplate: 'src/index.html',
    staticStyleEntryPoints: {
        'src/bootstrap.scss': 'dist/bootstrap.css'
    },
})