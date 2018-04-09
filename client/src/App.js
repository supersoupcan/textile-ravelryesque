import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { apiActionCreator } from './api';

import CreateUserPage from './containers/CreateUserPage';
import SignInPage from './containers/SignInPage';
import NoPageFoundPage from'./containers/NoPageFoundPage';
import UserPage from './containers/UserPage';

import HomePage from './containers/HomePage';

class App extends Component {
  componentDidMount(){
    this.props.apiActionCreator('auth', 'check', []);
  }
  render(){
    return(
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signIn" component={SignInPage}/>
        <Route exact path="/createUser" component={CreateUserPage}/>
        <Route exact path="/users/:userId" component={UserPage}/>
        <Route path="*" component={NoPageFoundPage} />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    apiActionCreator : (endpoint, operation, args) => {
      dispatch(apiActionCreator(endpoint, operation, args));
    },
  };
};

export default connect(state => ({}), mapDispatchToProps)(App);