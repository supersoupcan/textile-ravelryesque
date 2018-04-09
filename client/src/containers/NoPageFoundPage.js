import React, { Component } from 'react';

import { connect } from 'react-redux';
import { apiActionCreator } from '../api';

import Page from '../components/Page';

class NoPageFoundPage extends Component{
  render(){
    return(
      <Page 
        title="404 Not Found" 
        auth={this.props.auth}
        logout={() => this.props.apiActionCreator('auth', 'logout', [])}
      >
        <h3>No Page Found</h3>
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

export default connect(mapStateToProps,  mapDispatchToProps)(NoPageFoundPage);