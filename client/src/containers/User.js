import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { S3Resource, api } from '../api';
import axios from 'axios';


export default class User extends Component{
  constructor(props){
    super(props);
    
    let accountData;
    const isMyAccount = (() => {
      if(this.props.authenticated){
        if(this.props.match.params.id === this.props.auth.profile.id){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    })();
    
    if(isMyAccount){
      accountData={
        isMyAccount : false,
        data : this.props.auth.profilem
      };
    }else{
      accountData={
        isMyAccount : true,
        data : null
      };
    }
    this.state = Object.assign({}, { accountData }, { error : false});
  }

  async componentDidMount(){
    if(!this.isMyAccount){
      try{
        const response = await api.users.read(this.props.match.params.id);
        this.setState({
          data : response.data
        });
      }
      catch(err){
        console.log(err);
        //REDIRECT to ERROR PAGE
        this.setState({error : true});
      }
    }
  }
 
  render(){
    return(
      <div>
        {this.props.title}
      </div>
    );
  }
}

User.propTypes = {
  id : PropTypes.string,
  data : PropTypes.object
}