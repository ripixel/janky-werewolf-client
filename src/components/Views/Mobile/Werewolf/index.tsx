import * as React from 'react';

import connector, { IPropsFromState } from '../../commonConnectors/self';
import { PLAYER_ROLE } from '../../../../types/player';
import MobileWerewolfPhaseNonWerewolfView from './NonWerewolf';
import MobileWerewolfPhaseWerewolfView from './Werewolf';

type TProps = IPropsFromState;

export const MobileWerewolfPhaseView = (props: TProps): JSX.Element =>
  props.self.attributes.role === PLAYER_ROLE.WEREWOLF &&
  props.self.attributes.alive ? (
    <MobileWerewolfPhaseWerewolfView />
  ) : (
    <MobileWerewolfPhaseNonWerewolfView />
  );

export default connector(MobileWerewolfPhaseView);
