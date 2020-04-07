import * as React from 'react';

import MobileNoPhaseView from '../../Mobile/NoPhase';

interface IProps {
  phaseName?: string;
}

export const MobileViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    default:
      return (
        // eslint disable temporary until connected up to dispatch
        <MobileNoPhaseView
          onJoinVillageClick={(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _playerName: string,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _gameCode: string
            // eslint-disable-next-line @typescript-eslint/no-empty-function
          ): void => {}}
        />
      );
  }
};

export default MobileViewController;
