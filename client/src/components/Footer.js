import React from 'react';

import appStyles from '../App.css';
import styles from './Footer.css';

const Footer = (props) => {
  return(
    <div className={styles.container}>
      <div className={appStyles.borders}>
        <div className={styles.subContainer}> This is a footer </div>
      </div>
    </div>
  );
};

export default Footer;