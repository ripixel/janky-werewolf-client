import * as React from 'react';

import DesktopNoPhaseView from '../../Desktop/NoPhase';

interface IProps {
  phaseName?: string;
}

export const DesktopViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    default:
      return <DesktopNoPhaseView />;
  }
};

export default DesktopViewController;
