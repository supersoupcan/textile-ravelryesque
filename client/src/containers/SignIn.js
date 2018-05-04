import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';
import { Redirect } from 'react-router-dom';

import Form from './Form';

class SignIn extends Component{
  render(){
    if(this.props.auth.authenticated){
      return(<Redirect to="/" />);
    }
    return(
      <Form
        messages={this.props.messages}
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
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    auth : state.auth,
    messages : state.messages
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

export default connect(mapStateToProps,  mapDispatchToProps)(SignIn);