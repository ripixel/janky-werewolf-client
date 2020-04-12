import * as React from 'react';

import { PHASE_NAME } from '../../../../types/phase';
import MobileNoPhaseView from '../../Mobile/NoPhase';
import MobileLobbyView from '../../Mobile/Lobby';
import MobileDayView from '../../Mobile/Day';
import MobileWerewolfPhaseView from '../../Mobile/Werewolf';
import MobileSeerPhaseView from '../../Mobile/Seer';
import MobileEndView from '../../Mobile/End';

interface IProps {
  phaseName?: string;
}

export const MobileViewController = (props: IProps): JSX.Element => {
  switch (props.phaseName) {
    case PHASE_NAME.END:
      return <MobileEndView />;
    case PHASE_NAME.WEREWOLF:
      return <MobileWerewolfPhaseView />;
    case PHASE_NAME.SEER:
      return <MobileSeerPhaseView />;
    case PHASE_NAME.DAY:
      return <MobileDayView />;
    case PHASE_NAME.LOBBY:
      return <MobileLobbyView />;
    default:
      return <MobileNoPhaseView />;
  }
};

export default MobileViewController;
