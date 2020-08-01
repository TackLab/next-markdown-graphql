import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GraphiQL from './pages/Graphiql';

export const NextMarkdownGraphQL = () => {
  return (
  <Router>
     <Suspense fallback={<div>Loading...</div>}>
       <Switch>
         <Route path="/___graphql" component={GraphiQL}/>
       </Switch>
     </Suspense>
  </Router>
  )
};
