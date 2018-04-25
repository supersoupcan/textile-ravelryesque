import React, { Component } from 'react';

import styles from './SearchBar.css';
import FA from 'react-fontawesome';


export class SearchBar extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <input placeholder={'Search...'} className={styles.item}/>
          <div className={styles.searchButton}>
            <FA 
              name='search'
            />
          </div>
        </div>
      </div>
    );
  }
}