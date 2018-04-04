import React from 'react';

import appStyles from '../App.css';
import styles from './Page.css';

import NavBar from '../containers/NavBar';
import Footer from './Footer';

const Page = (props) => {
  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <NavBar />
        <div className={appStyles.borders}>
          {props.children}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Page;