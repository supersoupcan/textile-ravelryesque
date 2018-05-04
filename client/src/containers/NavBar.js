import React, { Component } from 'react';

import { DropDown } from '../components/DropDown';
import { SearchBar } from '../components/SearchBar';

import appStyles from '../App.css';
import styles from './NavBar.css';

import FA from 'react-fontawesome';
import { S3Resource } from '../api';

import { Link } from 'react-router-dom';

export default class NavBar extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      activeDropBox : ''
    };
  }
  
  openDropDown(id){
    if(this.state.activeDropBox === id){
      this.setState({
        activeDropBox : ''
      });
    }else{
      this.setState({
        activeDropBox : id
      });
    }
  }
  
  render(){
    return(
      <div className={styles.container}>
        <div className={appStyles.borders}>
          <div className={styles.subContainer}>
            <div className={styles.leftItemGroup}>
              <Link className={styles.itemLeft} to="/">
                (Logo)
              </Link>
              <div className={styles.searchBarItem}> 
                <SearchBar 
                  dropDownId='searchType'
                  activeDropBox={this.state.activeDropBox}
                  openDropDown={(id) => this.openDropDown(id)}
                  searchTypes={[
                    {
                      value : "all",
                      label : "All"
                    },
                    {
                      value : "patterns",
                      label : "Patterns"
                    },
                    {
                      value : "users",
                      label: 'Users'
                    }
                  ]}
                />
              </div>
            </div>
            {!this.props.auth.authenticated ?
              <div className={styles.itemGroup}>
                <Link className={styles.item} to="/signIn">
                  Sign In
                </Link>
                <div className={styles.item}> or </div>
                <Link className={styles.itemRight} to="/create/user">
                  Create an Account
                </Link>
                
              </div>
              :
              <div className={styles.itemGroup}>
                <div className={styles.item}>
                  <DropDown
                    id='stuff'
                    alertParent={(id) => this.openDropDown(id)}
                    activeDropBox={this.state.activeDropBox}
                    items={[
                      {
                        type : 'link',
                        label : "Create Pattern",
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
                <div className={styles.itemsRight}>
                  <DropDown
                    left="true"
                    id='profile'
                    alertParent={(id) => this.openDropDown(id)}
                    activeDropBox={this.state.activeDropBox}
                    items={[
                      {
                        type : 'link',
                        label : "Your Profile",
                        to : "/users/" + this.props.auth.profile._id,
                      },
                      {
                        type : 'function',
                        onClick : (() => this.props.logout()),
                        label : "Logout"
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