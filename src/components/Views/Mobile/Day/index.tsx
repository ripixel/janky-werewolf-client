import * as React from 'react';

import connector, { IPropsFromState } from '../../commonConnectors/self';
import { PLAYER_ROLE } from '../../../../types/player';
import MobileDayModeratorView from './Moderator';
import MobileDayPlayerView from './Player';

type TProps = IPropsFromState;

export const MobileDayView = (props: TProps): JSX.Element =>
  props.self.attributes.role === PLAYER_ROLE.MODERATOR ? (
    <MobileDayModeratorView />
  ) : (
    <MobileDayPlayerView self={props.self} />
  );

export default connector(MobileDayView);
