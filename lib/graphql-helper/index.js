const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { makeExecutableSchema } = require('graphql-tools');
const { runGraphqlMarkdown } = require('@okgrow/graphql-markdown');

const app = express();

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
  };
  
module.exports = {
    runGraphqlServer,
};
  