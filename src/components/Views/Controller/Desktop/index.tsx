import * as React from 'react';

import DesktopNoPhaseView from '../../Desktop/NoPhase';
import DesktopLobbyView from '../../Desktop/Lobby';
import { PHASE_NAME } from '../../../../types/phase';

interface IProps {
  phaseName?: string;
}

export const DesktopViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    case PHASE_NAME.LOBBY:
      return <DesktopLobbyView />;
    default:
      return <DesktopNoPhaseView />;
  }
};

export default DesktopViewController;
