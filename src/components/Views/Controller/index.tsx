import * as React from 'react';

import DesktopViewController from './Desktop';
import MobileViewController from './Mobile';

import connector, { IPropsFromState } from './connector';

type TProps = IPropsFromState & {
  isMobile: boolean;
};

export const ViewController = (props: TProps): JSX.Element => {
  return props.isMobile ? (
    <MobileViewController phaseName={props.phaseName} />
  ) : (
    <DesktopViewController phaseName={props.phaseName} />
  );
};

export default connector(ViewController);
