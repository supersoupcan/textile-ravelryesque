import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import Form from './Form';
import Page from '../components/Page';

class CreateUserPage extends Component{
  render(){
    return(
      <Page>
        <h3>Create Account</h3>
        <Form
          submitAction={(args) => this.props.apiActionCreator('users', 'create', [args])}
          submitString={"Create Account"}
          formInputs={[
            {
              name : "username",
              title : "Username",
              type : "text" 
            },{
              name : "password",
              title : "Password",
              type : "password" 
            }
          ]}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiActionCreator : (endpoint, operation, args) => {
      dispatch(apiActionCreator(endpoint, operation, args));
    }
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(CreateUserPage);
