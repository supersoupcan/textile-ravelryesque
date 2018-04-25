import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { S3Resource } from '../api';

import axios from 'axios';


export default class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      user : this.props.data
    };
  };
  
  async componentDidMount(){
    if(!this.props.data){
      try{
        const user = await axios.get('/users/' + this.props.id);
        this.setState({user});
      }
      catch(err){
        console.log(err);
      }
    }
  }
  
  render(){
    if(this.state.user){
      return(
        <div>
          <img 
            src={S3Resource(this.state.user.imageKey)}
          />
          <div>{this.state.user.username}</div>
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }
  }
}

User.propTypes = {
  id : PropTypes.string,
  data : PropTypes.object
}