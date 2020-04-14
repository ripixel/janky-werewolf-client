import * as React from 'react';
import { IPlayer } from '../../../../../types/player';

interface IProps {
  self: IPlayer;
}

export const MobileDayPlayerView = (props: IProps): JSX.Element => (
  <React.Fragment>
    {props.self.attributes.alive ? (
      <p>Talk, and suggest a lynching maybe?</p>
    ) : (
      <p>You are dead! So shhhh! Ghosts can&apos;t talk!</p>
    )}
  </React.Fragment>
);

export default MobileDayPlayerView;
