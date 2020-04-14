import * as React from 'react';

import { PHASE_NAME } from '../../../../types/phase';
import MobileNoPhaseView from '../../Mobile/NoPhase';
import MobileLobbyView from '../../Mobile/Lobby';
import MobileDayView from '../../Mobile/Day';
import MobileWerewolfPhaseView from '../../Mobile/Werewolf';
import MobileSeerPhaseView from '../../Mobile/Seer';
import MobileEndView from '../../Mobile/End';
import PlayerWrapper from '../../../PlayerWrapper';

interface IProps {
  phaseName?: string;
}

export const MobileViewController = (props: IProps): JSX.Element => {
  let view = <MobileNoPhaseView />;
  switch (props.phaseName) {
    case PHASE_NAME.END:
      view = <MobileEndView />;
      break;
    case PHASE_NAME.WEREWOLF:
      view = <MobileWerewolfPhaseView />;
      break;
    case PHASE_NAME.SEER:
      view = <MobileSeerPhaseView />;
      break;
    case PHASE_NAME.DAY:
      view = <MobileDayView />;
      break;
    case PHASE_NAME.LOBBY:
      view = <MobileLobbyView />;
      break;
    default:
      // do nothing;
      break;
  }

  if (!props.phaseName || props.phaseName === PHASE_NAME.LOBBY) {
    // don't wrap in PlayerWrapper for no phase or Lobby phase
    return view;
  }

  return <PlayerWrapper>{view}</PlayerWrapper>;
};

export default MobileViewController;
