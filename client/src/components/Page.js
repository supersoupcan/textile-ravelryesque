import React from 'react';

import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';
import appStyles from '../App.css';
import styles from './Page.css';

import NavBar from '../containers/NavBar';
import Footer from './Footer';

const Page = (props) => {
  return(
    <div style={{height: "100%"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <link rel="icon" href={require('../favicon.ico')} type="image/x-icon" />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.content}>
          <NavBar 
            auth={props.auth}
            logout={props.logout}
          />
          <div className={appStyles.borders}>
            {props.children}
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

Page.propTypes = {
  auth : PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired,
  title : PropTypes.string.isRequired
};

export default Page;