import React, { Component } from 'react';

import styles from './SearchBar.css';
import FA from 'react-fontawesome';

import { DropDown } from './DropDown';

export class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected : 'All'
    };
  }
  
  handleSelectItem(item){
    this.props.openDropDown(this.props.dropDownId);
    this.setState({
      selected : item.label
    });
  }
  
  render(){
    const items = this.props.searchTypes.map(item => ({
      type : "function",
      label : item.label,
      onClick: () => {this.handleSelectItem(item)}
    }))
    
    return(
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.searchSelect}>
            <DropDown
              id={this.props.dropDownId}
              alertParent={(id) => this.props.openDropDown(id)}
              activeDropBox={this.props.activeDropBox}
              items={items}
            >
              {this.state.selected}
            </DropDown>
          </div>
          <input placeholder={'Search...'} className={styles.searchField} />
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