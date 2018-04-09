import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import Page from '../components/Page';

class SignInPage extends Component{
  render(){
    return(
      <Page
        title={this.props.auth.profile.username + "'s Profile"}
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
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

export default connect(mapStateToProps,  mapDispatchToProps)(SignInPage);