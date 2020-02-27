

process.env.BROWSER_STACK_USERNAME = "drdreo1";
process.env.BROWSER_STACK_ACCESS_KEY = "YNZDx8z1XVhtQRBLo5dd";

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
