const path = require('path');
const { runGraphqlMarkdown } = require('@okgrow/graphql-markdown');
const { ApolloServer } = require('apollo-server');

const runGraphqlServer = async ({options, documentRoot, runExpressServer}) => {

    options = Object.assign({
        contentRoot: path.join(documentRoot)
    }, options);

    try {
        const {
            typeDefs,
            resolvers,
            fileCount,
        } = await runGraphqlMarkdown(options);

        console.log(`Loaded \n${fileCount} ContentItems into our in memory DB!`);

        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        if (runExpressServer) {
            server.listen().then(({ url }) => {
                console.log(`🚀 Server ready at ${url}`);
            });
        }

        return {typeDefs: typeDefs, resolvers: resolvers}

    } catch (error) {
        console.error('[runGraphqlMarkdown]', error);
    }
};

module.exports = {
    runGraphqlServer,
};
