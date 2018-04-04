import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import CreateUserPage from './containers/CreateUserPage';
import SignInPage from './containers/SignInPage';
import NoPageFoundPage from'./containers/NoPageFoundPage';

import HomePage from './containers/HomePage';

export default class App extends Component {
  render(){
    return(
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signIn" component={SignInPage}/>
        <Route exact path="/newAccount" component={CreateUserPage}/>
        <Route path="*" component={NoPageFoundPage} />
      </Switch>
    );
  }
}