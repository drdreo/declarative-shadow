

process.env.BROWSER_STACK_USERNAME = "USERNAME";
process.env.BROWSER_STACK_ACCESS_KEY = "ACCESSKEY";

/* eslint-disable import/no-extraneous-dependencies */
const merge = require("deepmerge");
const {bsSettings} = require("@open-wc/testing-karma-bs");
const createBaseConfig = require("./karma.conf.js");



module.exports = config => {
    config.set(
        merge(bsSettings(config), createBaseConfig(config), {
            browserStack: {
                project: "shadow-root"
            }
        })
    );

    return config;
};
