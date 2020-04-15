import { connect } from 'react-redux';

import { IState } from '../../../../../store/reducers';
import { IPlayer } from '../../../../../types/player';

export interface IPropsFromState {
  self: IPlayer;
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  const self = state.game.players.find(
    (player) => player.name === state.user.name
  );

  if (!self) {
    throw new Error('Could not find self in player list - something funky!');
  }

  return {
    self,
  };
};

export default connect(mapStateToProps);
