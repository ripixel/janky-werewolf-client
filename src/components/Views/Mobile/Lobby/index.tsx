import * as React from 'react';

import MobileLobbyPlayerView from './Player';
import MobileLobbyModeratorView from './Moderator';

import connector, { IPropsFromState } from './connector';

type TProps = IPropsFromState;

export const MobileLobbyView = (props: TProps): JSX.Element =>
  props.isModerator ? <MobileLobbyModeratorView /> : <MobileLobbyPlayerView />;

export default connector(MobileLobbyView);
