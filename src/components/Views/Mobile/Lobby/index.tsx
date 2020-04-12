import * as React from 'react';

import MobileLobbyPlayerView from './Player';
import MobileLobbyModeratorView from './Moderator';

import connector, { IPropsFromState } from '../../commonConnectors/self';
import { PLAYER_ROLE } from '../../../../types/player';

type TProps = IPropsFromState;

export const MobileLobbyView = (props: TProps): JSX.Element =>
  props.self.attributes.role === PLAYER_ROLE.MODERATOR ? (
    <MobileLobbyModeratorView />
  ) : (
    <MobileLobbyPlayerView />
  );

export default connector(MobileLobbyView);
