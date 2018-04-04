import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import Page from '../components/Page';
import Form from './Form';

class SignInPage extends Component{
  render(){
    return(
      <Page>
        <h3>Sign In</h3>
        <Form
          submitAction={(args) => this.props.apiActionCreator('auth', 'login', [args])}
          submitString={"Sign In"}
          formInputs={[
            {
              name : "username",
              title : "Username",
              type : "text",
            },
            {
              name : "password",
              title : "Password",
              type : "password" 
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
    }
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(SignInPage);