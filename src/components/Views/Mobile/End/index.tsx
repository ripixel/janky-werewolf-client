import * as React from 'react';

import connector, { IPropsFromState } from './connector';

export const MobileEndView = (props: IPropsFromState): JSX.Element => (
  <React.Fragment>
    <h2>{props.winner} Team Won!</h2>
  </React.Fragment>
);

export default connector(MobileEndView);
