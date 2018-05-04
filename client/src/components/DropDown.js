import React, { Component } from 'react';

import styles from './DropDown.css';
import { Link } from 'react-router-dom';

import FA from 'react-fontawesome';

import PropTypes from 'prop-types';

export class DropDown extends Component{
  render(){
    const active = this.props.activeDropBox === this.props.id;
    return(
      <div className={styles.dropDown}>
        <div
          className={styles.dropDownBtn}
          onClick={() => this.props.alertParent(this.props.id)}
        >
          <div className={styles.childrenHolder}>
            <div className={styles.children}>
              {this.props.children}
            </div>
            <FA
              className={styles.children}
              name='angle-down'
              rotate={active ? null : 180}
            />
          </div>
        </div>
        { active && 
          <div className={this.props.left ? styles.dropDownContent : styles.left}>
            {this.props.items.map((item, index) => {
              return(
                <div 
                  key={item.label + index}
                  className={styles.dropDownItem}
                >
                  {(item.type === 'link') && 
                    <Link
                      style={{textAlign: "right"}}
                      to={item.to}
                    >
                      {item.label}
                    </Link>
                  }
                  {(item.type === 'function') && 
                    <div
                      onClick={() => item.onClick()}
                    >
                      <a>{item.label}</a>
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

DropDown.propTypes = {
  items : PropTypes.arrayOf(PropTypes.shape({
    type : PropTypes.string.isRequired,
    onClick : PropTypes.func,
    to : PropTypes.string,
  })),
  alertParent : PropTypes.func.isRequired,
  id : PropTypes.string.isRequired,
  activeDropBox : PropTypes.string.isRequired,
};