const { getCustomConfig } = require('./config');
const { runGraphqlServer } = require('./graphql-helper');
const { setConfig } = require('next/config');

let loaded = false;

/**
 * Configure webpack and next.js to handle and optimize images with this plugin.
 *
 * @param {object} nextConfig - configuration, see the readme for possible values
 * @param {object} nextComposePlugins - additional information when loaded with next-compose-plugins
 * @returns {object}
 */
const withFilesParser = (nextConfig = {}, nextComposePlugins = {}) => {

  const { documentRoot, runExpressServer } = getCustomConfig(nextConfig);

  return Object.assign({}, nextConfig, {
    async webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
            'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }

      if (!loaded) {
        const {
          typeDefs, resolvers
        } = await runGraphqlServer({options, documentRoot, runExpressServer});

        // return typeDefs and resolvers to be used with publicRuntimeConfig in pages.
        setConfig({
          ...nextConfig,
          publicRuntimeConfig: {
            typeDefs,
            resolvers
          }
        });

        loaded = true;
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config;
    },
  });
};

module.exports = withFilesParser;
