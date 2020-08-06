const { getConfig } = require('./config');
// const { detectLoaders, getNumOptimizationLoadersInstalled, appendLoaders } = require('./loaders');

const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { makeExecutableSchema } = require('graphql-tools');
const { runGraphqlMarkdown } = require('@okgrow/graphql-markdown');
const app = express();

let loaded = false;

/**
 * Configure webpack and next.js to handle and optimize images with this plugin.
 *
 * @param {object} nextConfig - configuration, see the readme for possible values
 * @param {object} nextComposePlugins - additional information when loaded with next-compose-plugins
 * @returns {object}
 */
const withFilesParser = (nextConfig = {}, nextComposePlugins = {}) => {
  const { documentRoot } = getConfig(nextConfig);

  return Object.assign({}, nextConfig, {
    async webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }
      options = Object.assign({
        contentRoot: path.join(documentRoot)
      }, options)

      // return enrichedConfig;
      config.module.rules.push({
        test: /\.md/i,
        use: 'raw-loader',
      });

      console.log('a');

      if (!loaded) {
        await (async () => {
          try {
            const {
              typeDefs,
              resolvers,
              fileCount, // num of files processed
            } = await runGraphqlMarkdown(options);

            console.log(resolvers)
            console.log(
              `Loaded \n${fileCount} ContentItems into our in memory DB!`,
            );

            const schema = makeExecutableSchema({
              typeDefs: typeDefs,
              resolvers: resolvers,
            });

            app.use(
              '/graphiql',
              graphqlHTTP({
                schema,
                graphiql: true,
              }),
            );


            // Start the server after all data has loaded.
            app.listen(4000);
            console.log('Server Started! http://localhost:4000/graphiql');
          } catch (error) {
            console.error('[runGraphqlMarkdown]', error);
          }
          loaded = true;
        })();
      }


      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  });
};

module.exports = withFilesParser;
