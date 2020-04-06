import * as React from 'react';

import DesktopNoPhaseView from '../../Desktop/NoPhase';

interface IProps {
  phaseName?: string;
}

export const DesktopViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    default:
      return (
        // eslint disable temporary until connected up to dispatch
        <DesktopNoPhaseView
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
          onCreateVillageClick={(_villageName: string): void => {}}
        />
      );
  }
};

export default DesktopViewController;
