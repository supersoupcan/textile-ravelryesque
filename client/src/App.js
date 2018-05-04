import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { apiActionCreator } from './api';

import Page from './components/Page';

import Home from './containers/Home';
import CreatePattern from './containers/CreatePattern';
import CreateUser from './containers/CreateUser';
import SignIn from './containers/SignIn';
import User from './containers/User';
import NoPageFound from './containers/NoPageFound';

class App extends Component {
  componentDidMount(){
    this.props.apiActionCreator('auth', 'check', []);
  }
  
  createPage(title, children){
    return(
      () => (
        <Page 
          title={title}
          auth={this.props.auth}
          apiActionCreator={this.props.apiActionCreator}
        >
          { children }
        </Page>
      )
    );
  }
  
  render(){
    return(
      <Switch>
        <Route 
          exact path="/"
          render={(props) => this.createPage("Home", <Home {...props} />)()}
        />
        <Route 
          exact path="/signIn"
          render={(props) => this.createPage("Sign In", <SignIn {...props} />)()}
        />
        <Route 
          exact path="/create/pattern"
          render={(props) => this.createPage("Create Pattern", <CreatePattern {...props} />)()}
        />
          <Route 
          exact path="/create/account"
          render={(props) => this.createPage("Create Account", <CreateUser {...props} />)()}
        />
        <Route 
          exact path="/users/:id/"
          render={(props) => this.createPage("Account", <User {...props} />)()}
        />
        <Route 
          exact path="/404"
          render={(props) => this.createPage("404", <NoPageFound {...props} />)()}
        />
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

const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    messages : state.messages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
<Route 
            exact path="/signIn" 
            render={this.createPage("SignIn", <SignIn />)}
          />
          <Route 
            exact path="/create/pattern" 
            render={this.createPage("Create Pattern", <CreatePattern />)}
          />
          <Route 
            exact path="/create/user"
            render={this.createPage("Create User", <CreateUser/>)}
          />
          <Route
            exact path="/users/:userId" 
            render={this.createPage("User", <User />)}
          />
          <Route 
            path="*" 
            render={this.createPage("404", <NoPageFound />)}
          />
*/