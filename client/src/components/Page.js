import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import appStyles from '../App.css';
import styles from './Page.css';

import NavBar from '../containers/NavBar';
import Footer from './Footer';

export default class Page extends Component{
  constructor(props){
    super(props);
    
    this.state={
      title : this.props.title
    };
  }
  
  changeTitle(newTitle){
    this.setState({
      title : newTitle
    });
  }
  
  render(){
    const propsToPass = (() => {
      let props = Object.assign({}, {changeTitle : this.changeTitle}, this.props);
      delete props["children"];
      return props;
    })();
    
    return(
      <div style={{height: "100%"}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <link rel="icon" href={require('../favicon.ico')} type="image/x-icon" />
        </Helmet>
        <div className={styles.container}>
          <div className={styles.content}>
            <NavBar 
              auth={this.props.auth}
              logout={() => this.props.apiActionCreator('auth', 'logout', [])}
            />
            <div className={appStyles.borders}>
              {
                React.cloneElement(
                  this.props.children,
                  propsToPass
                )
              }
            </div>
          </div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  auth : PropTypes.object.isRequired,
  apiActionCreator : PropTypes.func.isRequired,
  title : PropTypes.string.isRequired
};