import * as React from 'react';

import connector, { IPropsFromState } from '../../commonConnectors/self';
import { PLAYER_ROLE } from '../../../../types/player';
import MobileSeerPhaseNonSeerView from './NonSeer';
import MobileSeerPhaseSeerView from './Seer';

type TProps = IPropsFromState;

export const MobileSeerPhaseView = (props: TProps): JSX.Element =>
  props.self.attributes.role === PLAYER_ROLE.SEER &&
  props.self.attributes.alive ? (
    <MobileSeerPhaseSeerView />
  ) : (
    <MobileSeerPhaseNonSeerView />
  );

export default connector(MobileSeerPhaseView);
