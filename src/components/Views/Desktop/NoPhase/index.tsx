import * as React from 'react';

import DeviceFrame from '../../../DeviceFrame';

import ssMod from '../../../../../public/assets/ss_mod.png';
import ssWw from '../../../../../public/assets/ss_ww.png';

import styles from './styles.scss';

export const DesktopNoPhaseView = (): JSX.Element => (
  <div>
    <h2>Can you survive the night?</h2>
    <p>
      Janky Werewolf is a browser-based implementation of the amazing Ultimate
      Werewolf card game.
    </p>
    <p>
      Gather your friends, and open this page on your mobile phones to start
      playing!
    </p>
    <div className={styles.devices}>
      <DeviceFrame device='iphone-x' backgroundImg={ssMod} />
      <DeviceFrame device='galaxy-note-8' backgroundImg={ssWw} />
    </div>
  </div>
);

export default DesktopNoPhaseView;
