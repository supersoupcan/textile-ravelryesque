import React, { Component } from 'react';

export default class HomePage extends Component{
  render(){
    return(
      <h3>{this.props.title}</h3>
    );
  }
}