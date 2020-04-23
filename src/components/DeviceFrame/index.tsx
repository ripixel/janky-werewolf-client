import * as React from 'react';

import IFrameXFrame from './iphone-x';
import GalaxyNote8 from './galaxy-note-8';

import styles from './styles.scss';
import './devices.min.css';

interface IProps {
  device: 'iphone-x' | 'galaxy-note-8';
  backgroundImg: string;
}

export const DeviceFrame = (props: IProps): JSX.Element => {
  let deviceFrame: JSX.Element;
  switch (props.device) {
    case 'galaxy-note-8':
      deviceFrame = <GalaxyNote8 screenBg={props.backgroundImg} />;
      break;
    default:
      deviceFrame = <IFrameXFrame screenBg={props.backgroundImg} />;
  }

  return <div className={styles.deviceFrame}>{deviceFrame}</div>;
};

export default DeviceFrame;
