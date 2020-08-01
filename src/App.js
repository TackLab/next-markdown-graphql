import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const GraphiQL = lazy(() => import('./pages/Graphiql'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/___graphql" component={GraphiQL}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
