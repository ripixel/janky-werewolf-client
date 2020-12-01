import React from 'react';

import connector, { IPropsFromState } from '../commonConnectors/self';
import { PLAYER_ROLE } from '../../../types/player';
import WerewolfPhaseNonWerewolfView from './NonWerewolf';
import WerewolfPhaseWerewolfView from './Werewolf';

type TProps = IPropsFromState;

export const WerewolfPhaseView: React.FC<TProps> = (props) =>
  props.self.attributes.role === PLAYER_ROLE.WEREWOLF &&
  props.self.attributes.alive ? (
    <WerewolfPhaseWerewolfView />
  ) : (
    <WerewolfPhaseNonWerewolfView />
  );

export default connector(WerewolfPhaseView);
