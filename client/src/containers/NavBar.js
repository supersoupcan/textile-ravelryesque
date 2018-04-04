import React, { Component } from 'react';

import appStyles from '../App.css';
import styles from './NavBar.css';

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
            <div className={styles.itemGroup}>
              <Link className={styles.item} to="/newAccount">
                Create Account
              </Link>
              <Link className={styles.item} to="/signIn">
                SignIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}