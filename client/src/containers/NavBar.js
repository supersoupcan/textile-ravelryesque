import React, { Component } from 'react';

import appStyles from '../App.css';
import styles from './NavBar.css';
import { Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default class NavBar extends Component{
  render(){
    return(
      <div className={styles.container}>
        <div className={appStyles.borders}>
          <div className={styles.subContainer}>
            <div className={styles.itemGroup}>
              <Link className={styles.item} to="/">
                Home
              </Link>
            </div>
            {!this.props.auth.authenticated ?
              <div className={styles.itemGroup}>

                <Link className={styles.item} to="/signIn">
                  Sign In
                </Link>
                <div className={styles.item}> or </div>
                <Link className={styles.item} to="/createUser">
                  Create an Account
                </Link>
                
              </div>
              :
              <div className={styles.itemGroup}>
                <Link 
                  className={styles.item}
                  to={"/users/" + this.props.auth.profile._id}
                >
                  {this.props.auth.profile.username}
                </Link>
                <div
                  className={styles.item}
                  onClick={() => this.props.logout()}
                >
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}