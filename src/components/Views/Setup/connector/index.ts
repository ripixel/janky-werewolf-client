import { connect } from 'react-redux';

import { Player, PLAYER_ROLE } from '../../../../types/player';
import { State } from '../../../../store/reducers';

export interface PropsFromState {
  villageName: string;
  lobbyId: string;
  moderator?: Player;
  players: Player[];
}

export const mapStateToProps = (state: State): PropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    villageName: state.game.villageName,
    lobbyId: state.game.lobbyId,
    moderator: state.game.players.find(
      (player) => player.attributes.role === PLAYER_ROLE.MODERATOR
    ),
    players: state.game.players
      .filter((player) => player.attributes.role !== PLAYER_ROLE.MODERATOR)
      .sort((a, b) =>
        a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
      ),
  };
};

export default connect(mapStateToProps);
