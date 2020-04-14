import * as React from 'react';

import { ILayoutProps } from '..';

import styles from './styles.scss';

export const MobileLayout = (props: ILayoutProps): JSX.Element => (
  <div className={styles.layout}>
    <div className={styles.header}>
      <h1>Janky Werewolf</h1>
    </div>
    <div className={styles.content}>{props.children}</div>
  </div>
);

export default MobileLayout;
