import React from 'react';

import { Route, Redirect, Switch } from 'react-router';

import Posts from './containers/Posts/Posts';
import Setting from './containers/Setting';

import './App.css';

import Layout from './components/Laoyut/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Redirect from='/' to='/posts' exact/>
          <Route path="/posts" exact component={Posts} />
          <Route path="/settings" exact component={Setting} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
