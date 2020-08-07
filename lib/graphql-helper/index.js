const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { runGraphqlMarkdown } = require('@okgrow/graphql-markdown');

const { ApolloServer } = require('apollo-server');

const runGraphqlServer = async ({
    options,
    documentRoot
  }) => {

    options = Object.assign({
        contentRoot: path.join(documentRoot)
    }, options)

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

      const server = new ApolloServer({
        typeDefs,
        resolvers,
      });

      server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
      });
    } catch (error) {
    console.error('[runGraphqlMarkdown]', error);
    }
  };

module.exports = {
    runGraphqlServer,
};
