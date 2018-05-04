import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import Form from './Form';

export default class CreateUserPage extends Component{
  render(){
    if(this.props.auth.authenticated){
      return(<Redirect to="/" />);
    }
    return(
      <Form
        messages={this.props.messages}
        submitAction={(args) => this.props.apiActionCreator('users', 'create', [args])}
        submitString={"Create Account"}
        formInputs={[
          {
            name : "username",
            title : "Username",
            type : "text",
            validation : [{
              type: "LENGTH",
              errMessage : "needs to be filled in",
              match : (length) => (length !== 0)
            },
            {
              type: "LENGTH",
              errMessage : "cannot be more than 48 characters long",
              match : (length) => length < 48
            }]
            ,
          },{
            name : "email",
            title : "Email",
            type : "text",
            validation : [{
              type : "REGEX",
              match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              errMessage : "not a valid email address"
            }]
          },
          {
            name : "password",
            title : "Password",
            type : "password",
            validation : [
              {
                type: "LENGTH",
                errMessage : "needs to be 8 or more characters long",
                match : (length) => length >= 8
              },{
                type : "LENGTH",
                errMessage : "cannot be more than 48 characters long",
                match : (length) => length <= 48
              },
              {
                type : "REGEX",
                errMessage : "needs an uppercase letter",
                match : /(?=.*[A-Z])/
              },{
                type : "REGEX",
                errMessage : "needs a lowercase letter",
                match : /(?=.*[a-z])/
              },{
                type : "REGEX",
                errMessage : " needs a number or special character $@$!%*?&",
                match : /(?=.*[\d$@$!%*?&])/
              },
            ]
          }
        ]}
      />
    );
  }
}
