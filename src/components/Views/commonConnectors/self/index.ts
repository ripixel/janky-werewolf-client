import { connect } from 'react-redux';

import { State } from '../../../../store/reducers';
import { Player } from '../../../../types/player';

export interface PropsFromState {
  self: Player;
}

export const mapStateToProps = (state: State): PropsFromState => {
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
