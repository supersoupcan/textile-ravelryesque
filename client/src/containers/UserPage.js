import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import User from '../containers/User';

import { Redirect } from 'react-router-dom';

import Page from '../components/Page';

class UserPage extends Component{
  render(){
    if(!this.props.auth.authenticated){
      return( <Redirect to="/" /> );
    }
    return(
      <Page
        title={this.props.auth.profile.username + "'s Profile"}
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
        <User
          data={this.props.auth.profile}
        />
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
    resetErrors : () => {
      dispatch({type : "RESET_ERRORS"});
    }
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(UserPage);