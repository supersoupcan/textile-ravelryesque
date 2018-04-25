import React, { Component } from 'react';

import { DropDown } from '../components/DropDown';
import { SearchBar } from '../components/SearchBar';

import appStyles from '../App.css';
import styles from './NavBar.css';

import FA from 'react-fontawesome';



import { S3Resource } from '../api';

import { Link } from 'react-router-dom';

export default class NavBar extends Component{
  render(){
    return(
      <div className={styles.container}>
        <div className={appStyles.borders}>
          <div className={styles.subContainer}>
            <div className={styles.leftItemGroup}>
              <Link className={styles.item} to="/">
                (Logo)
              </Link>
              <Link className={styles.item} to="/" >
                Patterns
              </Link>
              <div className={styles.searchBarItem}> 
                <SearchBar />
              </div>
            </div>
            {!this.props.auth.authenticated ?
              <div className={styles.itemGroup}>
                <Link className={styles.item} to="/signIn">
                  Sign In
                </Link>
                <div className={styles.item}> or </div>
                <Link className={styles.item} to="/create/user">
                  Create an Account
                </Link>
                
              </div>
              :
              <div className={styles.itemGroup}>
                <div className={styles.item}>
                  <DropDown
                    items={[
                      {
                        type : 'link',
                        title : "Create Pattern",
                        to : "/create/pattern",
                      },
                    ]}
                  >
                    <FA
                      className={styles.pictureItem}
                      name="gears"
                      size="2x"
                    />
                  </DropDown>
                </div>
                <div className={styles.items}>
                  <DropDown
                    items={[
                      {
                        type : 'link',
                        title : "Your Profile",
                        to : "/users/" + this.props.auth.profile._id,
                      },
                      {
                        type : 'function',
                        onClick : (() => this.props.logout()),
                        title : "Logout"
                      }
                    ]}
                  >
                    <img 
                      src={S3Resource(this.props.auth.profile.imageKey)}
                      className={styles.pictureItem}
                    />
                  </DropDown>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

/*
() => {
    <div
    className={styles.item}
    onClick={() => this.props.logout()}
  >
    Logout
  </div>
  

}
*/