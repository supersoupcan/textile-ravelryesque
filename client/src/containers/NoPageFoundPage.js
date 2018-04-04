import React, { Component } from 'react';

import Page from '../components/Page';

export default class NoPageFoundPage extends Component{
  render(){
    console.log('hey');
    return(
      <Page>
        <h3>No Page Found</h3>
      </Page>
    );
  }
}