const path = require('path');
const { runGraphqlMarkdown } = require('@okgrow/graphql-markdown');
const { ApolloServer } = require('apollo-server');

// eslint-disable-next-line consistent-return
const runGraphqlServer = async ({ options, documentRoot, runExpressServer }) => {
  // eslint-disable-next-line no-param-reassign
  options = Object.assign({
    contentRoot: path.join(documentRoot),
  }, options);

  try {
    const {
      typeDefs,
      resolvers,
      fileCount,
    } = await runGraphqlMarkdown(options);

    // eslint-disable-next-line no-console
    console.log(`Loaded \n${fileCount} ContentItems into our in memory DB!`);

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    if (runExpressServer) {
      server.listen().then(({ url }) => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at ${url}`);
      });
    }

    return { typeDefs, resolvers };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[runGraphqlMarkdown]', error);
  }
};

module.exports = {
  runGraphqlServer,
};
