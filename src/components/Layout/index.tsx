import React from 'react';

import styles from './styles.scss';

import favicon from '../../../public/assets/favicon.png';

export const Layout: React.FC = (props) => (
  <div className={styles.layout}>
    <div className={styles.header}>
      <h1>
        <img src={favicon} /> Janky Werewolf
      </h1>
    </div>
    <div className={styles.content}>
      <p className={styles.version}>{process.env.VERSION}</p>
      {props.children}
    </div>
  </div>
);

export default Layout;
