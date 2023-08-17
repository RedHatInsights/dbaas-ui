const { resolve } = require("path");
const config = require("@redhat-cloud-services/frontend-components-config");
const commonPlugins = require("./plugins");

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, "../"),
  debug: true,
  deployment: process.env.BETA ? "beta/apps" : "apps",
  useProxy: true,
  appUrl: process.env.BETA
    ? "/preview/application-services/trusted-content"
    : "/application-services/trusted-content",
  env: process.env.BETA ? "stage-beta" : "stage-stable",
  standalone: Boolean(process.env.STANDALONE),
  definePlugin: {
    TRUSTIFICATION_URL: JSON.stringify(
      process.env.BETA
        ? "https://staging.trustification.dev"
        : "https://trustification.dev"
    ),
  },
});
plugins.push(...commonPlugins);

module.exports = {
  ...webpackConfig,
  plugins,
};
