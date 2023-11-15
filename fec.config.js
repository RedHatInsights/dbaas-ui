module.exports = {
    appUrl: '/application-services/trusted-content',
    debug: true,
    useProxy: true,
    proxyVerbose: true,
    /**
     * Change to false after your app is registered in configuration files
     */
    interceptChromeConfig: false,
    /**
     * Add additional webpack plugins
     */
    plugins: [],
    hotReload: true,
    moduleFederation: {
      exclude: ['react-router-dom'],
      shared: [{ 'react-router-dom': { singleton: true, version: '*' } }],
    },
  };
  