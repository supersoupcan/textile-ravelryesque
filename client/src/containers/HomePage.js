import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import Page from '../components/Page';

class HomePage extends Component{
  render(){
    return(
      <Page
        title="Sign In" 
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
        <h3>Main Page</h3>
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
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(HomePage);