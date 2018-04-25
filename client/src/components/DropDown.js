import React, { Component } from 'react';

import styles from './DropDown.css';
import { Link } from 'react-router-dom';

import FA from 'react-fontawesome';

export class DropDown extends Component{
  constructor(props){
    super(props);
    this.state = {
      active : false
    };
  }
  render(){
    return(
      <div className={styles.dropDown}>
        <div
          className={styles.dropDownBtn}
          onClick={() => this.setState({active : !this.state.active})}
        >
          <div className={styles.childrenHolder}>
            <div className={styles.children}>
              {this.props.children}
            </div>
            <FA
              className={styles.children}
              name='angle-down'
              rotate={this.state.active ? null : 180}
            />
          </div>
        </div>
        {this.state.active && 
          <div className={styles.dropDownContent}>
            {this.props.items.map((item, index) => {
              return(
                <div 
                  key={item.title + index}
                  className={styles.dropDownItem}
                >
                  {(item.type === 'link') && 
                    <Link
                      style={{textAlign: "right"}}
                      to={item.to}
                    >
                      {item.title}
                    </Link>
                  }
                  {(item.type === 'function') && 
                    <div
                      onClick={() => item.onClick()}
                    >
                      <a>{item.title}</a>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}