import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminApp from './../AdminApp';

const App = () => (
  <div>
    <Route path='/admin' component={AdminApp}/>
  </div>
);

export default App;
