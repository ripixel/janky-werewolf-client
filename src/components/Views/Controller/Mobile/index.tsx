import * as React from 'react';

import MobileNoPhaseView from '../../Mobile/NoPhase';

interface IProps {
  phaseName?: string;
}

export const MobileViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    default:
      return <MobileNoPhaseView />;
  }
};

export default MobileViewController;
