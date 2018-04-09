import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';
import { Redirect } from 'react-router-dom';

import Page from '../components/Page';
import Form from './Form';

class SignInPage extends Component{
  render(){
    if(this.props.auth.authenticated){
      return(<Redirect to="/" />);
    }
    return(
      <Page 
        title="Sign In" 
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
        <h3>Sign In</h3>
        <Form
          messages={this.props.auth.messages}
          resetMessages={() => this.props.resetMessages('auth')}
          submitAction={(args) => this.props.apiActionCreator('auth', 'login', [args])}
          submitString={"Sign In"}
          formInputs={[
            {
              name : "username",
              title : "Username",
              type : "text",
              validation : [],
            },
            {
              name : "password",
              title : "Password",
              type : "password",
              validation : [],
            }
          ]}
        >
        </Form>
      </Page>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth : state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiActionCreator : (endpoint, operation, args) => {
      dispatch(apiActionCreator(endpoint, operation, args));
    },
    resetMessages : (reducerName) => {
      dispatch({type : reducerName.toUpperCase() + "_RESET_MESSAGES"});
    }
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(SignInPage);