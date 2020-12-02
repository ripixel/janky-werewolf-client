import { connect } from 'react-redux';

import { Player, PLAYER_ROLE } from '../../../../types/player';
import { State } from '../../../../store/reducers';

export interface PropsFromState {
  players: Player[];
}

export const mapStateToProps = (state: State): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    players: state.game.players
      .filter(
        (player) =>
          player.attributes.role !== PLAYER_ROLE.MODERATOR &&
          player.name !== state.user.name
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      ),
  };
};

export default connect(mapStateToProps);
