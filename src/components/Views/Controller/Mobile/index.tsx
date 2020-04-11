import * as React from 'react';

import MobileNoPhaseView from '../../Mobile/NoPhase';
import MobileLobbyView from '../../Mobile/Lobby';
import { PHASE_NAME } from '../../../../types/phase';

interface IProps {
  phaseName?: string;
}

export const MobileViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    case PHASE_NAME.LOBBY:
      return <MobileLobbyView />;
    default:
      return <MobileNoPhaseView />;
  }
};

export default MobileViewController;
