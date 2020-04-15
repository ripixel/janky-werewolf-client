import { connect } from 'react-redux';

import { IState } from '../../../store/reducers';
import { IPlayer, PLAYER_ROLE } from '../../../types/player';

export interface IPropsFromState {
  self: IPlayer;
  players: IPlayer[];
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
    players: state.game.players
      .filter(
        (player) =>
          player.name !== self.name &&
          player.attributes.role !== PLAYER_ROLE.MODERATOR
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      ),
  };
};

export default connect(mapStateToProps);
