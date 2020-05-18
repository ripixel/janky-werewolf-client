import * as React from 'react';

import connector, { IPropsFromState } from '../../commonConnectors/self';
import { PLAYER_ROLE } from '../../../../types/player';
import MobileBodyguardPhaseNonBodyguardView from './NonBodyguard';
import MobileBodyguardPhaseBodyguardView from './Bodyguard';

type TProps = IPropsFromState;

export const MobileBodyguardPhaseView = (props: TProps): JSX.Element =>
  props.self.attributes.role === PLAYER_ROLE.BODYGUARD &&
  props.self.attributes.alive ? (
    <MobileBodyguardPhaseBodyguardView />
  ) : (
    <MobileBodyguardPhaseNonBodyguardView />
  );

export default connector(MobileBodyguardPhaseView);
