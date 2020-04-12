import { connect } from 'react-redux';

import { IPlayer, PLAYER_ROLE } from '../../../../../../types/player';
import { IState } from '../../../../../../store/reducers';

export interface IPropsFromState {
  villageName: string;
  lobbyId: string;
  moderator?: IPlayer;
  players: IPlayer[];
}

export const mapStateToProps = (state: IState): IPropsFromState => {
  if (!state.game) {
    throw new Error('No game yet initialised!');
  }

  return {
    villageName: state.game.villageName,
    lobbyId: state.game.lobbyId,
    moderator: state.game.players.find(
      (player) => player.attributes.role === PLAYER_ROLE.MODERATOR
    ),
    players: state.game.players.filter(
      (player) => player.attributes.role !== PLAYER_ROLE.MODERATOR
    ),
  };
};

export default connect(mapStateToProps);
