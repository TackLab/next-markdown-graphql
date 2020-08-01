import * as React from "react";

import GraphiQL from "graphiql";

import "graphiql/graphiql.min.css";

import "../assets/index.css";

const URL = "https://swapi-graphql.netlify.com/.netlify/functions/index";

function graphQLFetcher(graphQLParams) {
  return fetch(URL, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams)
  }).then(response => response.json());
}

const defaultQuery = `
{
  allFilms {
    edges {
      node {
        id
        title
        producers
        episodeID
        created
      }
    }
  }
}
`;

const App = () => (
  <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />
);

export default App;
