import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import { Redirect } from 'react-router-dom';
import Form from './Form';
import Page from '../components/Page';

class CreateListingPage extends Component{
  render(){
    if(!this.props.auth.authenticated){
      return(<Redirect to="/" />);
    }
    return(
      <Page 
        title="New Pattern"
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
        <h3>New Pattern</h3>
        <Form
          messages={this.props.messages}
          submitAction={(args) => this.props.apiActionCreator('patterns', 'create', [args])}
          submitString={"Create New Pattern"}
          formInputs={[
            {
              name : "title",
              title : "Title",
              type : "text",
              validation : [{
                type: "LENGTH",
                errMessage : "needs to be filled in",
                match : (length) => (length !== 0)
              }]
            },
            {
              name : "images",
              type : "file",
              title : "Upload Images",
              accept : ".jpg, .jpeg, .png",
              multiple : true,
              validation : []
            }
          ]}
        />
      </Page>
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
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(CreateListingPage);
