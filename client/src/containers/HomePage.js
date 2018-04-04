import React, { Component } from 'react';

import { connect } from 'react-redux';

import Page from '../components/Page';

class HomePage extends Component{
  render(){
    return(
      <Page>
        <h3>Main Page</h3>
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
    
  };
};

export default connect(mapStateToProps,  mapDispatchToProps)(HomePage);