# next-markdown-graphql
> This is a tool to integrate markdown content into graphql to be used with next.js framework

[![NPM](https://img.shields.io/npm/v/next-markdown-graphql.svg)](https://www.npmjs.com/package/next-markdown-graphql) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save next-markdown-graphql
```

## Options

| Options  | Description | Default value |
| ------------- | ------------- | ------------- |
| documentRoot  | With this option you can specify the location of the markdown files to be loaded.  | None |
| runExpressServer  | If `True` GraphiQL runs in an express server. This can be accessed in [http://localhost:4000/](http://localhost:4000/)  | false |

## How to use it

In a next-config.js file add

```javascript
const withFilesParser = require('next-markdown-graphql');
module.exports = withFilesParser({
  documentRoot: 'path/to/markdown/files',
  runExpressServer: true
});
```

If runExpressServer is false, you can create a component in `pages/` and call the GraphiQL from the same nextjs server
 
- Just create a file in pages (e.g: `pages/api/graphql-data.js`) and add the following piece of code

```javascript
import { ApolloServer } from "apollo-server-micro";
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();

const typeDefs = publicRuntimeConfig.typeDefs;

const resolvers = publicRuntimeConfig.resolvers;

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: "/api/graphql-data" });

export default handler;
```

Then, you can access something like [localhost:3000/api/graphql-data](localhost:3000/api/graphql-data)

## Valid markdown data example

This is an example of valid markdown data field. 

In this case we have a product entity with 4 fields. Check we added an id field (this is mandatory in order to prevent errors)
```
---
id: 1
price: 1500
title: 'Product name'
description: 'Product Description'
---
```

## Issues

For any issue or suggestion please fell free to open an issue at [https://github.com/TackLab/next-markdown-graphql.git/issues](https://github.com/TackLab/next-markdown-graphql.git/issues)

## License

MIT © [tacklab](https://github.com/tacklab)
