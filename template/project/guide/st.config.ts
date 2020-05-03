import { setConfig } from "st-start";

setConfig({

    env: 'staging',

    environments: {
        // maps the environment "staging" to the development build mode
        // this allows to differenciate between environment settings and build modes
        staging: "development"
    },

    proxy: {
        // maps HTTP requests targetting /user to an arbitrary endpoint
        '/meow': { 
            target: 'https://aws.random.cat',
            secure: false
        }
    }
});