import React from 'react';

import LobbyPlayerView from './Player';
import LobbyModeratorView from './Moderator';

import connector, { IPropsFromState } from '../commonConnectors/self';
import { PLAYER_ROLE } from '../../../types/player';

type TProps = IPropsFromState;

export const LobbyView: React.FC<TProps> = (props) =>
  props.self.attributes.role === PLAYER_ROLE.MODERATOR ? (
    <LobbyModeratorView />
  ) : (
    <LobbyPlayerView />
  );

export default connector(LobbyView);
